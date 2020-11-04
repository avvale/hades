import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelRepository } from '@hades/cci/channel/domain/channel.repository';
import { MockChannelRepository } from '@hades/cci/channel/infrastructure/mock/mock-channel.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
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
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
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

    test(`/REST:POST cci/channel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: null,
                hash: '842p4yw9kd0n89frs70iv7mi27txkxaxehg6sq2x',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'vv7eyayrpy15kw94cpx5gz0g9che8yfhxs15kmp99b2yhbpq7e',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'atnhl1ylzmvw1ppwsyr0',
                party: 'wmdj0bd49r4wpi7lzozt30j8oqt52627bxfd2ll36ji97q486ea69lz7izanp4uoodlm5yu4mroma3xzy1sh3c5h2f7kw5o3z2ttdp2ggty2ymkzm145owhutvith0t1q8kdqg7yhgvdyscm9mk1hgsksgdfe8zc',
                component: 'nmxn576x7plb3l5lxxtcsv7p8xej262vcls51bdtewcvlywe5yjq2gcfsp9hhvbma1l8f90urlqac1dv8332yuef91zllrw9j2t1nyeb6r5isf0s8blze5ud38k2xeng7l4b3x8j30q34dufypwk2zy5p1yi0zmq',
                name: 'uof1epko7h4ongve4mvmqbj3hn8hhov4l1d7msn83ferwieayojm6rb3bzon3whriiq89zvhf6da30c8g4ucnwhqcfzx2ewqls0y96y0aiy6lrp6u6w1fwgkpl2296lu8z5au6uoc5pi56gpsjtx55arucg4d3ee',
                flowHash: 'ahe3oiuufopnrgj2sxn409fezmjy8k2wizxuhhnk',
                flowParty: '4oojfanypd3ob8hb3mpqglw1rg0iyo97putkfpd2899bhgl92sx3336dqp1hhiqnumyzvprp11tq58thbd1ni8jhy4chlrqdgg28362vkb6cqs6a91scxk4ra4yggwry3dk0k3i8d1u4zz54c5esdoq7o01gtu9o',
                flowReceiverParty: 'j3hnori5dtd1jn1i96cblz9i6d3355xq0afl49mijdd4osrxd5wfot0eft1ywyoph7khcoa6sz3h4l3dbrgodsylykgis3dazzb0fjls3f3mlwxmpjat4a6h5vlqhhcizav2xbqxn8k1rzjxh0884iex3icp9yyv',
                flowComponent: 'qi01wgl1iwbspcu92vht5sh24qnrjaqgm6rp8zr3y7383ylvei13tvypl5muaqxyc0iixn0g0b1rp394e0rsapyh4ahaj273evcv6yhs9kw1o4csh70frn6wqtihha5bqm9p0dyezctq1c5ii132qkac3plxaaca',
                flowReceiverComponent: 'og46ri8qetzyfhw829pdr4814nixr0353i7vpzok9cjhhbnofmwz4hdbr6hjmstlyhph7li4iljpntsvpgjhdsbdb81pnm0q9s2d6aa1vh8g4bf0xfxll25sy0t42c4xprj89g719pxj1b3zut9awjil9zhn555k',
                flowInterfaceName: 'e1m0mfui9hk6lz72v76jpy7v7lmlq6zad8m1w445ikywvdjs4kej46gg2zrn3jrkigmxixn1xwfjip3m2xpob9zskcauvpmly64h3r5c0xbua31xup0ibde52alzk77fqvket3ux5la9spjlp3v71v3l1pdhosxv',
                flowInterfaceNamespace: 'r51ljok1w1s4wao1n3a8clsws7gw18zt1aqzj90ltt0yw78ndjwy2f410582u52m6tgj0zb2fx31wtdk5v3bvzlc0i487e0pgj4i9tvdehh1p6yd0nyu7a7azduvwr3lfpqz3k3hm6s1zoiwwkz7bvtrvoqjbw84',
                version: '9itdjhqoahwhlarl557o',
                adapterType: 'nkm9thn0ba7xufpj5nrhvlkyo4tjmo1u2qi1nbdyhrtwrot5efwavvzfwrjt',
                direction: 'RECEIVER',
                transportProtocol: '84bl1pwzsigboq897ebxvdvomk5vtlnta8dy37y7hlbhrv2ge0f3xjbaohkj',
                messageProtocol: 'e5gk4wiy3h5a13ybwfqr58aih2jyw65tg5fzskephznlo06u8fbkkn0t07kp',
                adapterEngineName: 't4ugj08x7msu9j0rklxe3z6mmr59vgapoiyp9kk1n2ubzkmxquil86lhgzozir2btp2xhn32kf7pqhjox1ecbejp2l0cfesfsxie14phbqjcvfnpkqiu0p9unj0ceo8c3okc5gyug0zi53oo7mg5d1yy5fu329k7',
                url: 'le101x500rmy4req81va2hmoqfw2gt8zyqfb8xhp8niw4x0rnvcenzg2hb3sngo329qb0qdechas31bdixdp0fiulkvtrflnhk7l2sn0n3pxfypn06q2cdnnxsc9ze96y6v54d138ith5j2uls6dzup1cv2ubozuujm8mqgq7rj7wo0822gifinhpie0bzxhngsufvepdg32d1etgdynx8a4nyirfkspuclnaydzc5ntfgp30mmim0xbuzr50hag7fmuk31gilxl1dl2j0ma5jnsj08o9fetk68z3l83k9yo01rg8r1jwjspr1gw74vu',
                username: '6qpgwflnppe7c0ct6rgk85ssclim33hh7k9xnmj1ayhfq1kqfpc3yxcwnzpa',
                remoteHost: '0ti586pdkb9d44iri1pibfhjs1ca52c5f2iuvsn1qccojez2ztu8am0f1tkb4b0rmi2fo0aoyy23thsubmbcj9ikwlyt83foy02x9pmwc1m03zc6qum95jpdeybg5o7utvtt2hjvh1d76xv2g514r7rn4h0w98ot',
                remotePort: 4515213529,
                directory: '9yzr2qaiixfyxgbryioqbnespv2g32lnu4g1cjwg9dy8p6gjff089wekqrgezz5rsruxtkmosgyvnjmqvo2yel1x8dk58g67i3es27l5ljy1dci9jham2l0cransy9zbq9vhyqfdb5l8orqvqu95txq6yyud2g5hfqpiysaiz69u4jbipj2h4qjy4fhllqdtnut39irwcl7i4fifo2fjsr7etisdqbjez0l4zzyaz9eof7gatrbxvbzkds8d8oqdw890u4k19p0ecqvnnsebt8onznq2s4mumywx9nluspwfpe8rzyqockzb75f9w37shbtss0t7uy23x693qyapq79hwl27mxd2f4tvyvc8cof6uiizthacgpqqfbrsy44nttqau3bvy9teassp0wzul66o62bpoa2109tapnmycltmxmmillw52xfusoexu7a0vvbv55351pu7a4uxpwq3gyllq41u93cib4483vcye2lbimwo7eysy8ny9vntkxt3z7g4xh7v5c63sjnnyftsnvq6eut27023pb3yee5mti23s2nkln38p2lxsq4wiud3npjb3ehbgdl7a9ck1tedte84z09zgig5bhd9h0swsttwbnb37ccg2har5lg3irfglzymh09w43vmlxbaze04s3n8eixm87ha39czfivxsm2ep455207mm64yrck70ibbipc6soyb9o363clf74l0b0an5ov8rbcqopnyqfl1uye1kcot5rxa02asu7swcqwng0udi1rs69dkoh0lhu0t1maswl91gfhgva64362j90wl5trzala4sm06lasfvno02b0l8c6vy3pprt7wb43dr2755zrilbpyyrx76p5aa0lr6jvmrikimvyj1x02auomjuq48x9g3f56norrxulve1f5rd5zlsmpzw3vygh8zv7qge6irln96sjzl28efshg10xeaei3osmw8xpbrhpoqogfnmhf8r5vzvyf118sesb2bhwql35q87jw9mir2hra',
                fileSchema: 'hkxid0pz459ekhkmum6ovbowlps7uou3y3rfmi05zlnr28eqza4lf4dobix9jtvr56m4q7ma5h1ris82o0hp4ejk8bnjwkv4iq1uz1pli4u1nq7253spfws7oz51g1gwvyeu9olhqka6clrsuv5hc5nkllf2gohzqvsndxs9ex55ibfgeqspaeg0b95gggpcboww9mk8c11m8yhfwm0lpab8w81odxe18dzzywwpr7pslpyl0hqebi5pmgs0eh5iq7gi23imr240zfudg0l9q2k823xp2grgrwt73wcxnbevxip0vh3btw93fyzwecmv93x1vdkky4i482033smrylhdgspua8efcmzrjoyljba32gmk2fxv3dcrfyppffu2m6ww53wqx3kidc5yvs207fgxqa99vy0qfrqnzu28j8fasx1xtlwvg4ozzxjg0ytruvmthzv8iuafm6ttovble9kmc2vq3usd1od130u71yrikyldvctym8dei3b42at9vorwoim13p3550mkjztpuqhcl3x8x23jb49yzcgi1g2kneheg47psxob66de32wn4264r9mp800xdl12hurelrkvp43ywi3ms4faceywu5p5ec3orayjhjliitu48mlw58z35su8kwoen31zsp7skhe7vnxusp4xt3y758e58annjazb3qdtq8guvqxe4rqqocxxwxem7rhn3dvogdgjn5ij16pkzd5m1pwk0rajlys4e7uhcnq7hjum6pkbzrclmri0ndoyicrfc8om8uvvxhv5os6tops1wbzwb0bkg7qytondzqvyhpxqoxorxct1tpb9ztnktkclmicshndhmusvronl2vdcyusgkin31gwrk8xnv6gb58xxtn2257i21qeu6dxqlv9a62qxjwv54p4wq8eekxkdkojzi9fg5922pm6cjmcv2zzadvf703c0y9h1g5n64wwkfgwb64rhdaurpaisxtjdr8g2fe6vcbg86tjvukleznh38rnrckl0',
                proxyHost: 'm0ybjp5en97je8w79ehx3s817uqat0h7i3x8pasyrohvuva59f0tafwazznt',
                proxyPort: 9341145812,
                destination: 'mif9c05z1vcz18reasj8eg3tte34hks4h0s4bq9trrktcbr6kzmk5x7zpt9yn8xf4857rtiud5mtqfpx6yg4minah3m5zmnbfkjulny013591ziph1gr00omunkrw4ajwsu6o1zrcwn5u3nj0bzyzcraou7fjc1a',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'kgktjw0r72che2yp4psljeh2gv93e2hdzjng5a960s25jc0fymksforgmbqq4w27wtpp765o8p9dmco731qy6cb5z54pjpcgvpwlexay1kvbfype2angm6otvg1wmx8inm2uh7rn7xc0t5xez7tqpnekryfcgaqs',
                responsibleUserAccountName: '1tm9g082y1n56qnqdepf',
                lastChangeUserAccount: 'z2w3yeyou6u36mos94mk',
                lastChangedAt: '2020-11-04 15:12:17',
                riInterfaceName: '5rnaeogw70i9etadt25qdgrfnbxhli067yqau6ah682niyuhu5r9q69tv8awtfdztilecng66ftu4w8la5t4qidhjbrq4w94o6af5ttu0nq23qb2fsydeq1bzbjaelvf71qi0fd78t8548kxrqlnq655b17aql0m',
                riInterfaceNamespace: '4vgxwos0j5eob7th34v69fv8v4rpezeihcz5d6qwiy3g2dgda5inlrc7drqtdz2d3gb8lfsjqdtfkkxwiocg661up6acyleqi7vggvokm3xxskej7o4p4sbudyrs3yehvf9e72sxrf2mr2tpevl515bnxdxyvzw5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                
                hash: 'yv9prn8ig7rg92i8eut71j8vzeflzo76w98u5f0z',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'foyenn1428k2on40kf3wxertpsih9k80t5n1sxrz0wmi85gbfn',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'hgv2qmm8giw84uaj8jyt',
                party: 'o24r1rz46i89ozkw3gqtx711qnocz4jcrbwacjpadwvfpmvvzkq0szimnpugj3vftjdbz7uph4g9a4zqwzd24rbsvi3n14p57igvkit59f6hra6auatuxuzsmemvgciypinzq64wx9pia8xtgjexw9zit27fc4dp',
                component: 'clmukyay2c8hbp6wx0vrx2xj6s45ohd9xjppvdqr60ysr4vqoo37skdpgflzy0iha0tavq3gt1nuj2dq43jqx1xxm80igon23n3cc4k8is1khzlugiuyx1k3vcgxhmxhrrexp57rqkz2jupetuvv7h47l3gtegun',
                name: 'zaao4jfscuqstl7rzpy6ts8g35j1v4j8tv06rlqih5oq5n9skqy9pqxhg5n1loqouk82zalor0se3e23q395c0seauc3ddacm60kw76vrqxvz4jc7n8r3qclhzg2n6dmlfo7jt5yv9izxp5rimwopr2vpa4lsco1',
                flowHash: '7rzbu4uvxzpjudl3dyruys6266hsm9xuyiy4ubm7',
                flowParty: 'cgnjwaiqp3iooa6304y1pxeryeyxe9mpoynmm6i7dzd56ete6u85m1tgdchiu2s2xwo317f5igyct3p4ctb6z2bglegkykk9wno605dxqiusgt0smj7xhchp7qcr9bp602lctuzqie006swtw9lyd236fg5dv9if',
                flowReceiverParty: 'iracs4ea2oiknzt8nykxz0qi46cn1jjv1n6hrleagcydkpn14ynkv4cx4c96xohtla2d2o69dlfd8r0ep6hp61dp9l6rqo2l1gn3ttrejcu7d3vsokfnfqg4s7fcmuxeg3m5uwz3s2npuzgwd5zf4lkgfoutdszq',
                flowComponent: 'anxy56p6313axn2yx1muq48s0djzht2qo0hxfi2i76goyfbuszfzn36v2t89diythnna4kwzlu7ybev89sp7jo6476vfafmbjvi4jcyb5n00jy3wrbu2akiuooosu1z0csihtr0an5joyjrdrdayfrfo8jt0butw',
                flowReceiverComponent: 'wzv3rnqxv0gtxyfvv7ql08oauzk1mk7szsut9qvmshrbhyh3xblnhoql1xu0lfh5y4k75lg84xv7fc2ng0gcijnczs7lxyxvdxmnengf8lh1q5t2gz0mmjsn1aof3l2bln6wz6kysp6wbjudenz5bjtfw5vwnlqv',
                flowInterfaceName: 'paaxhlh5w51l73iljkluuvjdmk0r9xhr15qap39tdu1e4dx7v7ezcya9m5w5grv8us080g27b9q2j80u3lf47lle7cwnkrocxdasnhbnimnenb9z4bjx8hheo6jo8fxnb7qti9xwfqgivkggc8ewf0pxb1hoyzc9',
                flowInterfaceNamespace: 'rakup5jp6bvvjb88y1rug0xc0r49byklyd4h91hozgkto1omtzqojgw9pw96hx6kv3y90zuop34eqcfna2qypj9kccw9zvtbhv2ic0sygzgsmubkml1p2tjrpoaq6idq11iu3ki0l70z98pew2nxmaehtu0zreox',
                version: 'fzubriv8cudqe85cf88f',
                adapterType: '6r4zneanaxyuxcup6srkfn6xgr7ev3n86dccco31pw2x2amf88lo1r9ubcl2',
                direction: 'SENDER',
                transportProtocol: 'xn994bdt37ar5pyulg5rjhza7eede6qe3o9486rebtnh0z3rw3px7me1u59h',
                messageProtocol: 'jawh1c3zxo5s1p09bf05h1ka0bhryl84m0t66m2gtya5999q04l1mtygcq6e',
                adapterEngineName: 'vlylpvnb2jlxylwynvplokoo1sopln13tsjuhrhr2xi7wj0j9y85lc2f4jvoax87k73isp6dsvi3nl2lx2oddoqyh2vanjnb90gqoy1hia84jlwb0gwuqgcv3f86omci5nuxh5mqowxaosl5ukzlei0af5dxlkzd',
                url: 'mvc9tyab35lfap035dlh11ep56vyo61mrd7ntvievi9lj2nhye9s495v7apb2hx2p2jp3yfo7ozqmrfxqnirm5h4k28jumw92lpk3vz6fyxudunrvmwwjwlsyrmochlqi7xraco9wcjneeltirwh2qzc2az4li3p5mlnik4kl1t108daymmmwkw2ymn00k21v4f7m11i14w29v5tmv59cf913oovdq7eyqi1tvaddmtrtze7bng0u7zvo5779la52mkh5k6cdssdccboiy7832l230nqs1yz49qmyf5il7kydcxrwa7safg9e10yq0km',
                username: '6xvan95duf9b2t5cgacl63vt9ya8p9f7c53jukjx4urzj18uiahsz7ynmj55',
                remoteHost: 'ktmjxx197476d49vy0di3b0c3oifq27l422cptn8c93wag6g4bv0savs2pxqtbed916v59fdd95o35klmjdex1hyhznalnwszm7qnd4o63fmaqsorm8n0s8ugnujej3xbveae5h8xoiv80bbp8111oomv3hacv70',
                remotePort: 4397430301,
                directory: 'e9ihq6pge953ck8fsyxfobovvbjpmlnlkt5izdcz0dg82zqkkkrcw3g8fe192vcvam0lw6ww2vck4pgu8ybe9cz6jqn7nt6y56e9iev2dkjs9tf9uv5d1rucjxsu9d2m6qvghb935xe9c19zqqdw99yjiuo47rm1uc3py5fy2r3o70clfl8s2dcx7rcnfac7v1mcv90v32g9029gbu9inyye69hnv6pjv2usney2tkcl2wlo9pkzrkfry5a2uyubboddrqpd4f1pvaj4tjyk32e9wp1yydo22zqrt65bdkxbwryqj1urv0ocqrga6p67ty4w65qribm4hy45lywbjyzchgdpev5gn8avymby0y3cyr735wnxwcciv0gvjqgar4o29134frl3trgr4j2y6eof1el3a19tbla7eouckqayezamj3zfvgw1brr7h26577tp1nfttrwir7whc4wv43rgblf6k1bydn6swnrde4brvd4chu1llrgivzkfdxpj8kzqu063zthqi1z3hehfw9gyt09zl0blz7o8dofg81sq32ray6wulwu21dfm0wa3hn170rbgulg16ccwxvo7s7zb9ocvm537g98tj3d0eql0fjkam7lh6ytw0dpkzywsipxwbyfj83kg7b5nm19fkwr17oo7mpr1atxiz5dyueyowxhg3vqiwyb7icet39o4yej4tteez5am1or9dajo6v26dsdjf6asghi52li2olp9jdieoql2dwp1xwz12w6pwycgsvh0ikcmpgbp5mse42s5qxgag2984f2cyxdzv1c02bn5dsmd4kdoe9wa389ihbcr3kk2t7g2u3comh7k6svuxvg8wigesdtxg6mcnrr1rjkn8imdaepwhukgrbozpxbd8bhg1fkkjlvaess6hfc64jw4p34d8ekfsrzyf5fgxph1a6fr45infi6vb0eyo3bvu45f5auqbznlp90ts0l3cwrvzbkszomk6bjfqzdpp6atsgje6lpziw1yvdmt',
                fileSchema: 'b5xdj0fj8mjwm9ep04g1c03csjl723f2oz2dggus5eoaybvkswnrzv74r2o2i0y6q7mpxwh13w6rpc7itouwp4wercz3t2l9z0xoqupm4mrm0sgwib421g964ocu3680td14bzblx1eeyqn77b86n8dutai9qs43qygxd735l17b4mytzbyyapvulmfwo0ryl5ltzqmm5hkdtqa2hrzfcee1hyejeki7rf8nub74gwrm453ez2lwtoxo8y4s5sectb4503uor5w6ng0juc456hphrwjdejfs95s7auvzw5ao8pad86g60t4d4a3766g034afwi96gqicgy8bgj3e2jy5xfdpx8zpt3o9uwl3i59v2fx2d5sd5z5cn6xaw83ca4qcnilbkfac4rbrk8tl0w6ejxaq5kouhk0vzkyrrwga2rtryt139hronbxtt46h6uv6ztgi0ozg1igbycd4xjh5rrtgv08z1sqsimxlsqm7w3flohj1599qva1f7le8jaxvi6wj7zwwljgbnz8tsrfj1quo1fymuur13jem3mgtznmkrkzrk1seti4fdut12d9l6rqo3h6o53fhz59umtrmv82lhe4w2z71aur5omio0tearh21n3neaazb78netfnjfzex8usrhsldfrw0gmxlc34t807qcq4k6a50mok2z35kq84agcdavc8iefkwugj4eiecmxnvhdzm81x8uxkws2qd2syd48tu5m1wpp8hvuvzpxxuj4cvf1qdlxgmeinvw4wdochm19gw599k8n7ywmmovivpx1t7lzklx8h6fmvq4n7yg9ere52acjkbyy30ubqybaniblkokhmkldxx9tayyygsgay5ilno4dgvu009e2bmqak7tj298rk0do0de5jkzg7dmp943p0x0s52z1276jgrtbjkdpc7yn68mleaq3h1f9t9zx1kcgiuuzmmdd3xz9k373jnr03dw63gu3wup0y3xpz56vlf7110v56jbmju6h22un0lpxtj',
                proxyHost: 'c7hvvk8hvuyg7ocs5ljbi4knmzr3ebmii253civmf4jcgey6bm7ntwgy92h2',
                proxyPort: 2272104039,
                destination: '27fdvajp05uvuysa271k6bqi46itg5rz0iuilhcuw6y600zgjjlrqulpn0k2vweb0w7uwfis243aj5944xou2hj2zoi12dzprbe2sf0bcem5lgwic48g2x9obcah6ball3wjjiirsig376ja7lk1z6efs85y4l14',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'r0sht1kgv1x6kbase72rsgkgcjyepari25hs1y4ji0yz61129h55pynts7qy253iw3acvv0p0iqn4icn7y48es5og4qdmrz5ii8rfx47jh6tdwjeeg5jq2z9o3oqip406jrwotzkzxmb80w8b3kuzli2x5rwkjvp',
                responsibleUserAccountName: 'a5s3bs14wtbuat8g8lbe',
                lastChangeUserAccount: 'sfphpwa37m7yuo08z9nc',
                lastChangedAt: '2020-11-03 23:21:06',
                riInterfaceName: 'yoedyyebghff3xqpdcae0l9swnku5b3a9wyer2dmgjbpiy740xiu9e8a7d5d4pmrskl1jmqg6t2us5o1h8kw66hshzk6wk0jxmd520k1jj486drtsig658l1q9hnxd28y9vwykmyv281lci4qkny90azoro19z4h',
                riInterfaceNamespace: '734m6s46abt9arbgdsijddg6d0go1axqh4j9ebhxetgxfsfgxplxhjga6pms2dc6vxszxhusbcayknxd7d8zx0sg1hqlggje34o337gmkd6wcwvtxcw50jog6zt49vzv3ks8fvhgzhecs6wh0biveldxyglikc8o',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: null,
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: '0miq3rn7wtznxjhzh4u7pj30dggevf7kjldw8ex11d75m395s4',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'pq39d20zswn5a3jvdy0w',
                party: 'rbavdjt87cve3kgkmvc34wioo3fvdwa3lpokkmx5pkcykkwdm83mdkacd490l37zuh1x36tle5rceleijgcwqb0ha3j223kgfrwpqhibbbpec1zpg1wnzzo25r57na8pggjbr8y2yj44fpc5gnid0veh4tpst8d2',
                component: 'v0xrv0g2h33ece9bld3az4g1botwydpuvbzre1126o6p91ecv9gvnxg9i4zl45funhfqw7uhdpop78qqksihyt0nt5pa8l1xit1dqb52wzt96nc4wcie4964xgppxvtkdsvz7hc1zk99zb5m5t8cxtqhqppobuso',
                name: 'nihhmdn6l70g28bedcb21ax2fg2p27bhtoflitsp8a00cz6mqwe8hw2adwqr8z5nccjaccewffj1nlujiy40cejv9p5sgpc4zwsqilz695v0ljlevw3l72bvhtdtlkfl45tyd48h1b608w7jfkvgjzz3ryeiarm0',
                flowHash: 'c0ukn6jl3d8ibz3upd6yt2qrjc04btn0ge76dokc',
                flowParty: '8dli21ai4jp21e3rnelisyj13hh2im0au1zmmoj1zfdfcjnrxcyqsck1wxww9kg7musst9ty9g83ijideml66e5bbtmhry2dncpnl0tcu5z6jg9c1g30owweqgkk3adl6g5pkwirh30u107ua47dospzqgl92bep',
                flowReceiverParty: 'wca36ks9lbfcap9exru4r0ebs87fmwiv2sbh54rnfvzu2bbg1q6zgq8n3516smmb4ao0stt317yof6cecwyituao6c3mhbmlxvm4l25n6eimjcb0yb0q4zkubevowk73vbpxt40dy9nl755b1w0oig3h446c5jrc',
                flowComponent: '6tp3jd2bukswmyqqjuvz59egu7bkoks9xsug4xwn4vll9wxg04hwp5qb1qjsy2iv30ui1e0tn493wi5yh8kmt2rgaq46o32xtvqafbkfoqkjiyqi0kiuc7j5jg7ty6xgnrbnwagqozuxl7gevl9t3j1v5gj4ylch',
                flowReceiverComponent: '3z1uqep408qwfsk3pewxi8q2ff55x9ndqmshgu60xtnnmufupq6im8xvoephlbx0dmhbj1130lohzmgz7fgg9tvopppojo5p18xnpqyik64kkpqte3ihqgvrpvdwzrsmq7471x69u53wf7p7k5jky6l3b5kybhph',
                flowInterfaceName: 'bbivqk4759gnqtm0pn51p66ia6yk1eljbh7559vyh120l6cnhknxpjxuldbignqym2zv108jviynfx6iv6ny2ifihe8te6le9gcyx2p49t3ou4pr2ebk9jbifzi5pdrvl2wi1u9p9fovz85twcr26nogn5isbg9b',
                flowInterfaceNamespace: '9opr3hhhpp7lhpzioz845j85x1yq0bk5qg2a22pswgnvtl3dgebg6fzq1oz7cci0zfqgdx2j6qh4cq4cpnuysk6im6cuczs2yszkrnwl3qze18om5jnkhtnacwrhzfa9xfxnwnes8pyuqxebd4x27wu9d5urr9mf',
                version: 'm3urk6oiawixcqqqigv2',
                adapterType: 'lqijgm1wla1zcy9atlsj13nwxv9lqgzzjpvs3x5h71z9qfp2qip8chixlmcj',
                direction: 'RECEIVER',
                transportProtocol: 'm6xl217dlujzl5ehb5q6jc9jw6spiobx3smc1j9zrki8rbhzftvv1jov9xjc',
                messageProtocol: 'd9mnkx3vhwxohm7gqsfjbba52dkyok2r8ayteg3ul8o6hqk53zvo5xvfegya',
                adapterEngineName: '0ppqejfbci8sxscqbllh9bu8rzbgsjas69xotmayk5owimeslgmcird8fiosjhwl1lo35t37cw2cl6voa1u3gxmgttz2gsyvvafqxaqjeecwt53jfrfh38ogo69oywwivwee349cy4s6yc954ejmgej4xm6vdfk0',
                url: 'ztgykqmp3moh49qv5b8fs8cvyrq1jxg7dhj207ihtx1knauphjfbjlbqaq44oc7fxzovc91nuoa8yq8jw9r3vcvczmfgr98sx79jtbdh3iud0r820zwqomlyzhnphxy7r71srbpo5z8lkxx6gfxdownl8dkzp9m2cq9xx8hdffinvel1cjn1ozlvretid1l8zpqsr8moclwsqavxiumxahle5ujr0bj17redhpyw6kjan0hpmle0y58tajq9conieamvcynnoczvbd18f3rkgy67mr2tp888us3wrc1j2av8c82mmrk7ne40xkhc3quy',
                username: 'v291qz6zwpzzdbh2bgx8dfvo40e4fiaj44ku4k39wgcysmc0664splvg0h0l',
                remoteHost: 'iks5euj1ngwrr2c17qlop46ye86xvqztfc2ugm7dajwqmkc9bboibgf6414mopx9t7q4efipcliygrsu1vzo0zlxddpxmql8fsd0ah0zhfevkld5okfq5498185ycifwuukdljcvaxllfc6e3r8u5vu40hn3n2ks',
                remotePort: 9651544499,
                directory: 'x6cdtdm49tr8pi28whqof07w0uai9pyqyin2989qqtp5lx2q0nyj1bqsoxmo3nid740cephnx4dfxw56xcbacz2va327sfghl9qowjcqr1f44plhewrcgldb0qg6ak6c4buwbigkek0gfaugy6xeca2jnwpoa2ttm0zgek8x3ncaxwf06k6fk5fb8pssxokwe31evj2hhjbjotgq9tju03u4tsoekigf27urjcu9asf5mcs7c224gplaereandjf7c8ky4sviq0g7m27lx3qtj1rxcpjgjhay5jcfnh26jl0ovjuxqzqdhhv6lqnie0jvc6einubq6uzf6qw76lw82jszl6ak33f9c25c786cisb9tem3sdz6hzcvdrb9ldyy9s1v60j3ybnu9v6aix65twqe11lydqlnb4kke4604560e0ds9i9sgr62ao5b9nwpn56d6rre79xg3pygj3uiew8mnxg5j63ozot9a1gc2v3su4yza8w3n1dbzz752ayhbg5dykrb7msxx1zoj0kmaf757nkkldl8e1s3i2lng4vq4biyrax28j6zb40ug3mp3cbwtr6byefxfxi0un4kcnjm074z29vr4m1qhh53zt1fwfeqh6ztg6i7f86csth3i119vgr0qxykt0zfmlf8xh3ubf7q27mz5t0o17vftn9nv63mrlofsurq8351vf8j1lgnu66mrrn3k1kg586qkmm6c5uepmt4b047ot2ohs35zucfjtmgdgegj4y0guq201pr6g5tg5pxltskh2x229736hpvwdbpz277shw6ykmrqsf0n4goop3xk72dyjkqz2kxl4k9bfmin09320de1jkrc4wjvpz4f69es0ha8e7lpvunkdlcumjha739dg7v4g03z64fwhn0lhi7i14tyhi6yaimhm2lt8vk6o9h0f1p0w9vr7iuovvtpqnkie71ukxcnd4ncgwtay6kvh6pvwaioggadezmp84odjdkd8brqb78odfyj76cvjc688q',
                fileSchema: 'dksb32rqzbr2fzwqs2lbjspu5hxeixqsdh6w9vi26zd5vf7zrglrzhghhdxlp49us6kj3y2ypn4f0780tvgtvaja7cm9sax4i3liujpymc3i101fe8uh5fqayy0m0u0edzxqhmm0rre4trobplttoe1f53k3w6yukmy0j0dvweillrrtqyc2krxxa1ws56k6i1em35ulaqb6bhvtsa90lka836aam1vay1m86lr51itrptwnv1vivrxbv5nlfvtwwqjpq0qnkp3gcnd9zflm6j2bw58p4nsuqbk1gywlmxtyv2unfrq1beb5b3by54tfbl01gnq7bhkpewjxw0k4pfr1hxhbpk82o9uuobzoas82u1nplhvy1m05rge1nhwxipsvnzxaermrm0kwtfdvcc8ajrjv1jngb7ifi1nu7scf6ierijhjmxsuyd1gvpugcyqf8sxzzsrpgb13elr34240z0qjejjez4kckb0bw5umdze799150n6gp8jeojkcv0j8a3bc6j1xkn48tiijiv8sz3vbx5b3xfwl49eks7rg32vfmw3dd61mokmun5n874ecv4zpb9p3z2ka4ldxohvphow8t4k0lglrethdzydm9u3akrneao4sy9jxuea3zyyefxhv26vwpoxg3e4cyhs6bolp8u0hk3au88n26yxtmi7ejtd37sefs3gip22ni0bxibiul6ldafpd2eiai3v9h93knwwqwc2t2ceqjjjh9mvlduso9xmm2fj7gwynzgkkef9kissuiibw7ryh8gtb1w314rdszrb0yp8b4enr0bd0g9mwuisn61ur5yl3kpcbi8z9u4lngdxgr0jdu8yksshsw7jlgj4zzdp6c5fohsz32444ns08jbbxo0cjegc6bkb0wloeh6jy1a37k3pp0yh5zjcq6wytvc98iu2mqr3l2yw8ok9nkffbgk4d88p0aybuibypg3e45hs76nq5wj73rvl4b8ck01wy870ufsj9i85h9x1qcuablbyg',
                proxyHost: 'mo354lqw2d1v13z7jzm52z09uc65k7kd5vkrdo2xws6p9e72hi8cau5jt2um',
                proxyPort: 5616783354,
                destination: '0nmvofkhnsm9976yqncpjm8e2ugfq2rxuxyvb9lwez7dy6ncs22zo21nekz379k068ns5uqd07vvai3x7vxkzs5fexfpm41ukeinu4uhvbwuo60yyb4gfp7ji4jga95xsk0tqilh3tz3gwqb92rjnwj8j5frcyq6',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ro8l2htlugt7bq63ri9wq9exrxe4k7qquj5quw0dk3uguz4qs4ecqixlaz6n5s0ix5fpzg0uc7cj5ze20zyb0k2l36xbhrw10ai3r7mr2cp2aui0cn0oyuykybzg56up8yu0op65t3ocpzf3str9om4eg7dcpk8u',
                responsibleUserAccountName: '5zk7wi8xm09kjo0x29r8',
                lastChangeUserAccount: '9z6o2fpdotsjlxq1tkei',
                lastChangedAt: '2020-11-03 22:27:42',
                riInterfaceName: 'bsuovathe9gvdknt3adgvn1q63csd91c998ihchyto2do5mjmpivmrbpq6ve16eotbkmhqow35tjk7rqgjhbe2qpdbkiyzgwyaq71g4r44lp72qosvj4d539cjmyrlr13cgn5wmiak185lxehxzu9her4wntwks4',
                riInterfaceNamespace: 'fjthxm04nh80omnaobxl2unxqq6s0pv96uk54qe0trnhv5twvb5osim015dicg7x3ipj4tmc9xa6gs6k5y1k8i3yje159x7ie0zgtdqe9ud35422copdb13vc2hc15bnma6j1vhp7v4il62qzwiu51yvtaxhm2x1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'msl5n4fdgy1n1gixlf49el0rhmjzqnkysp8hcbp23iremjvvvl',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'jm56rse79fyb7eud91br',
                party: 'jyvdbu0qbsl1cjm96e3piujr24pqptw308cmgxiscflu04o0jjm5rlif2v7lmct27ui926dxoz096gitkmwu5ifgfzw7nafkgtzqg15djzhl9cyn4hcwcc4slpz5gkpadnyhd83hkkjjo258z8dbzmp4jenedkd6',
                component: 'karymv0dm3f5omlxi0np8vj5e8r3mq69o1kjxqa9pzgruhk1a7rztmqmzcck17bfadvur7o4bwor79qndfelxqoi0zj6j1xr9nkgmzlqf8cz87v0pl6m5s4lod93zy5u7dfr264r1q6a4hkeqh0z5193tcdviarl',
                name: '0hxe5bqfmen757g0r55kz3do0hykezko2nxdtanfozr2el0eziswcm7u2xlpox36qowaotnuhyee3alz3ixh85jgkjrwvcfc2v88wka3ciofalped0sf0ulczcqfp4lecseb6nfjdebg4yzf0coewsdgfhnfapuc',
                flowHash: '4jid31curiewgr7zbowf20pmeo6ees9ir7ntdh73',
                flowParty: 'f50zmncwtirarx4ehbsjt6r58j5q7f2ztd63scpot19vsip217dupk90fx236so6ezdcje8jpvzuheykpzd0x57xm8kwnvsrpzdq2mtve4ml2ys8qq0wb94u2rm5249egla7hks0dozw019y61l59utqqr3kea6m',
                flowReceiverParty: 'd64u42c68hs7xcjp67y62ngbbimol6srzk85qnn1upoc8yve6gr0tf1yiqq6fmdc4dn0aeb3p9i2eiiyzivirzqnuryzdrc7yc1pparzeh9e0i5s9fiw1pxfp433ycbufojersoaexhpq9lj0tqnustozy3orvcr',
                flowComponent: '2w0e6qa7oi3eges9h2umfkdxtvtpkq9uw97j46b7l423mwy6kwwbs57r1ix6u72bcjrh0ckvokrne24wa3aiogv5jgizni1nemozzhf4f5o7y862uad64zdmcv2tw8j3quvnpwmov9tnpzgdrtf3e29h9mlahc7b',
                flowReceiverComponent: 'p6sjh2y6vjbmkbooaqbbk4evjux15b3xcakr4glz7liddgi0n5t3e4s3871gbmagx9gazyh2586a8apcchd9uj7udvf8lfrbu5p8pvwk3qwypi78pi3poo52c2nda0gbxceju8wb1rpc3hqqbv1ui7ezdg204o1h',
                flowInterfaceName: 'wg6j921jpoindgjuokhveti97tk6ibodegrzn2dbcthnvswgthwkf3cu29wdtbemfpddskhdhck62o95vle80exuwioclbw2wind2bnlbfd0to601vu1545vtp6wtuurwfeg78ij8l1u7kjbpw5rrtp1eoba80pv',
                flowInterfaceNamespace: '8vv9q26m9czazd19p95rs0hvlsep7aiebj85cbda2wuxdufme3imxuxdofgldg2x1cppnbbs4q4alua3izps6dr1umj8ju8w83hoeoe7qqirqdgebpz1wtljtb2xdeaoiqjy26mfg2zxoipp0nki1y0qffb5bxx8',
                version: 'vn83p84r68jn8t0xco6l',
                adapterType: 'xl7lzg0jjgey8h127nydbnhchx87b2075p44z2ggpr7pcghhq8il4mux9e3h',
                direction: 'SENDER',
                transportProtocol: 'p7tisjuexu634c9nm3v5sxt71lbmv420sj4crw2qjjkczu8vlrzzs20ckb4z',
                messageProtocol: '014qaawsra6hob0pmrk1ycwgtnoakjifc32d7xu4m4tq2bp8ysdw744n0wqw',
                adapterEngineName: 'lptl8289xka1rs129ucx3lrp5by2qchw6tl18zxnhlb559kzbbd0kyecbqb18x8ohtagp3inie8fnu238s5egeygzigv9x2clc3yd3y6wxai3yhs4prx639rbnq3c7x1tfqb6ugnzn8fr3me88puduzzysx4in66',
                url: '30wyy0jts3biic1f6h0xtr6ua9j86i7d2k5v0z9jhe9xr4pxvmjf91801f9otutycsb16auelpnd7nj9s705iguantoc01sn6r4rlydns4oqtmf7yvpw7aauuxobpc1lofvkvcg7jn4pp2p2tzsyoiig5ytn2d24d1ldnxolpyn7e35yf08nxaz91dc4rm0vgphuiv8k3d91ih8jspg7ogryzqksdva92f5uiovtk3l1bo8d8335f87s0n2bqf61m9u0fisuier26sij9jttuujzg32ky97su7w68sl3js3bv4xt8qqrgsavyq0i2dpn',
                username: '9eboa82nk0glhqxplsf5qdmubrkg60hdbe420c35jm5irumezgcrwo3yu42s',
                remoteHost: 'cz6l5njjnyi4dft1nji16ov6h2bpu760tfh76dg5hqof98p3axpkzl2thk332yena8f889elqu99d79935y65wa8epg5dys4jbked1xhx6l289mbju07d8orfc49epa6qq7b8bkraj4yt4w62ylyr891daa1uk5x',
                remotePort: 7659127488,
                directory: 'hmk4hy0byvgm6dhuq6bougfe5afzfskjy7oc6ayrura7hu7kupng074umd5ohosn5xgq76ty3m864t5c809dcb7uuy1kq6buwhbnfvkb8kb5c0h9whayk8phjzf7vw1606n2hmpr0x8p9ga8wqcnifg9ra96qwc1h33xsg7pkxxkqwp46t32uyczpffb8cgzryx15ggin1m543ts65ot9mx79kqltcf0xhskmp58gwcbnyplp162zmiyn8aprnjkxj6anjia6dqsf2gwtwgir73njf4lygap7xtxnss5416591s6a2npxbz5mfxr3dhei2427y2tesj6rg498tygzwpf7g97x8uxqhtsj399f5wb3enmul4zn5w6ro63gublmoxwnw37rkyg0unn98809nffn303dc2qamgvc11nc7omnefvwubyf6i99c2skcw1vmuz8wwe71633s2mgx77z1477b2lo7ibvfyuvuuafynph8993kve2wzjcdwoxpb91u3mtrt94btela0t0kza4o3ubtp1s4jx0ypdpzd3yryt0epcsfcbrbc786hlar02i92iqizhz9hj5avg4052qldu1mcrlga4q3sxb8s1gcjucgvrzbrvkvrwj3qx8fxoqelh7q7pky5a9sds8faekypq0o6acsaoacnvdpfxoya393c9fdvi3m4bf3v44sr4vhrhz68qubto48mcmjutabr4igxdyvch3ggyplnti4xlqoigwgdvt1p22gehw05ygzhoo94g2ajqaxrhvzgrhs99we9qkxv97o21smdqj5tvoqqikk7969b0ytpnwogwlr6xhjo03xfwll3jylhww5t356othnaw7exo7dx8fvbjgmnp9cjjp9c918hf9ght3t6wwa4zcq9yqltvtsbha17j17mg4b3jaaqe80q6gureks1ydol5pwvkt457u3bq9w7708atfdsp9z2rso8n06jct405uupytstozjrfr3hc78ujrekg532ibfces9iz',
                fileSchema: '868r5vusjn1msgxnqv28ojk62qgfprvtqtmz2fb6ztjpi83ys9fsr45zebsftq5r00znevdd0ondohsbent1a1m5fc0g7zucz294lr4pc4xjb041pcit0jhyzegqadv8xv94491njabun99htno555wsz1wywukn8oro6uysm52l83rkxmz561fsg9i1b20yz0crvoo6quqgt766zviwxrom3brlb0slz4xtetq6n1sex71ssynwbxqmq0rkwfeuklnqdtrjsdv7hfyw19am7hea2boacqwr8tgo643yt2vqs4igxhdtnmsgb9b8gkakz6jfpp5d2so3ar5vv11q90ildlky6449ykyuabjta5gbenub56wca1nve1yxvff2zewjh6smxark45h1dwysbi9bpv8kwkzm8a7d8qm90zvzwp1g8ealj96e3gw3mc2vx6l0e3fd8b1nxrbk8tl04ux6axvil8j58e985uftamwf99samj1mkh6c6112jj21mztqqn8y26akcwxkidu7gclxn6dtshbmqgc8kxq2ojtfovl77ubvi8ymuxouk2s15ouzbp7bfh2hqgmz4wpx4a03oe3j8tfou56xypa6htkgsec66q4s783b788yibyo1x8uic1jkfios0q3ced10rsf8z0srnl9h6apcjpn7enh87491tb15vlsvlzk0zulf1z83o32iqpguctlxk961jk13u92jsn17hc4l1fpoe30xy9w7c1a5e8n5dex6sp6gawd3m9m6ojgxn6mwomaw53muh8toypw2qgez1edfb4wwu76y6j7u22i1v77topz23wudzpz5dhndx5okvmwuvezjyn5phkpp4whdfejo8x0puuq59fcim2bajb6rl0m1pkgv7nf7a6sdfxtr2mb7iw9zg5ngdna5xalx4mb8ohm9qbgm6zxqcxirtj93wjopnzzrtvs698mdsgydchi9e2bcavzh0m2vubye33jhuu2y57umkv4d2uwc5t0ye0e',
                proxyHost: '2a38ocryppju0dpze6md72kzrha1tfmphlth1gd2nkgawc2dhvt1kdkvag2e',
                proxyPort: 2426257103,
                destination: 'vgi540bwd338ypifldhatt5s9h7r9vy6sezhnrnwlwmeu2aojronu8fkpjn3r7e80ihyvjvwzu1j9xvaoxyp2emjcw5rk5kbzzm3foaamb6qid1aqc90wlo86r3ecynh2fyteno5gbdrj7mcjbey7cot74vvlj44',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'b51qojinholigacbz255wks4zats2g1xhh0swh8n9oo8carkm492797yyyuax92ghgigda9bwen0e5ne78kjf8y3ip5ulouyjsek9ipc26sfk0vy5d33faib1hmjsdxt4e8o2fhccqpllyfl5a8h7siipoxjpwq9',
                responsibleUserAccountName: 'eaji42mewvpw2kvktie6',
                lastChangeUserAccount: 'vjit55s0iotiwerqg38e',
                lastChangedAt: '2020-11-03 21:10:33',
                riInterfaceName: '9via1v4c3edk46k5e59ct7fg42ke9iz1v9r0xt6a3x6ebr02hit97j9wtjpn616tlkcz9rsqmo74lm5s1x1wsfcc1wndt5m3csez2js4rsgbkjeaapbltm90a9by12x67i24rn5xas34n2eg67y401gdee6y1cq8',
                riInterfaceNamespace: '0d53uvfyd2zvwb4grwcd40f5zuyp2f9kowj8agy34oh2jo0nvlznppeikga89enzy0r6j6fg1nj9a9shyq8tfxvozhyvszzy601bkcdz2xqrz1ug9jnfwdr92y3odibpsa6ss2oumhdaca7p5kz74ad2asig5fq6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'z2kmbhybxwrx3e81i8n51ok744gg7l41pfhiruxv',
                tenantId: null,
                tenantCode: '22yvlse1pfo9mf0cb2ng0codueult6cmhg5hw79rzsmuljow6r',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'vrjo4qh33sjywusoqhmq',
                party: 'iy2swmx6e2k3gnfxzb25r1iezjgv1i192adop68k5bnpnlwuperidmq6zvwlr6q6s6f5nl1z17kdwrlwyf6vmkm8r6y8nxvlcpkvjhi8m8cgvjyl2dfhx60ii8vuspnfllg7w1w53ejq7vpoifubhze1jmaf0fwv',
                component: '969mjampx0f4rpu6bzznyn11mfu54x1eyivjvdvulcbzew39xw3gxp943t4l1y7eithjytd0y5sbjvl19rzonfq0e841awax5f6wcwvv80u1u62banfxh8ty7cemtxvrdvytznml02w0gpxwk13qlq10hvx82k1o',
                name: 'eclbcwkdkv9t6oxze0ixch57vbqxpgk9md3q5r8e1j49jz9w5k23j57ns2utuffq1skii3aj068ii5t86br1wkfbvqh5p7exggjnwyonutvcf2hv3denw3z7pscquk861uy1yn250iifcde1bz31izexzavgmilj',
                flowHash: '83kodjnjurm6yvjap9nhtvyv0ktdmiqugsbnccur',
                flowParty: 'baxe3qpe50de2jeub8a4nkyt638siqvx92owizc8k3fl7mayfhkhgw91efkbl8wt56sc7ct2aio2pgf0v7k4pq8fr1v6fqh2uv9vwhbizjrb2ly0jkjc96l45tert7kkpcibt1e6hkr1mmfr2md7bvtxk8klt2fu',
                flowReceiverParty: 'uyjeie40hea16q7uckvl46u3siuct1c5bhxga2qliwnahg47fuj4512phdo0xfyxqy7zefls9cnm4lun9fhp0j7bbrl2mv1ljf9g9ttpyh1s0exx2b6ewt1ov8m5zz3kgzji02zbl8l74cyux1c5q5rvn2kftqbn',
                flowComponent: '4p46g38n1tl2q28kcxodhqy9lplxcsn421zwsa39p2y84y67j38qb2ztgebni469m9iz406y1mp41aghm804kx84swnno3r585833yfxd3r34nuj3cx3wvkfcbbjelvaz5juksc0anp52iz9mmzowyhfr0wq237h',
                flowReceiverComponent: '1zv631kaiefs9eymqhwrfan03qc6gos49cspvy2upjqnouv2qu0pu2fbwd74lmr8dsc9ksmxwergwq3bu4w94dkz54mm83e7okn2i4zff5ba4spdqnncj0z6x2j81gsj2ggbc3otu0rikszw07mcom4vq4shwo6e',
                flowInterfaceName: 'dbpi4dcn1y06yspki188v5cuuhta3sw1hwlex8r9m4uc9gmdn1qwl7nhg6p46083144f8ulgwn1m50x37s6w2bvmzt9iubfajhbwkho6e5ndg3gza767dfc5cpu2cz1w6f4cubpttac6mj2nd29inh5afm8wb65q',
                flowInterfaceNamespace: '9jajbgp75whigckaq1775e5dmy055pcn9a3ozb72uhcir5avx25f4iqvrs1ta3dpgpp4vqievv2l969h7tfugxncdl89kf5cubsqr1o8jzhb55eojymxsxzavc48u8t1a6tl76i2tfan1p2m53o0s8pdz2ktjet3',
                version: '2mjnd8c86sda6ybqsuri',
                adapterType: 'jma67obrendpb05tb8hypl6qri1j1yokrmcp3gs89h7qeqq0c52bwwke0wbx',
                direction: 'RECEIVER',
                transportProtocol: 'py28jvek0k62rium40hjcusdbasp1r5vvx66qx188qzap4re1j9v7dsrm3zs',
                messageProtocol: 'y85arwwpoxhrh715q6rbp369phcdihu4nxtyj2lt3wa8i73h2b81nj5gcu3h',
                adapterEngineName: 'iu3qvooaubd49jfbiztbwky060dmej6yxh59mmuhuatylfiqbppsxshccl7wpukqwjtp50d2ynfa2o3zs8h45lj7r5psj30x9pbjgjetafe1h66oixmq8dhmfhf1i3heztq67h90wi3dem3j97vnjdemch4mkq47',
                url: 'dbwoijskwi17awb5unzwkf8fgamugvsr7jbn4udtbcajoargiy9pdmi7gilxp1pyek2iraha2c2vr9djtv3b2lce50inals4az2j5y9x1m1a3dam3k2675ei80kx0qmwkfkgcqe81gnu2td979dejikjejsbdccdxf0pxswbebmv96ewt0oey6h29fh4wu7k5501dewmfmutevu3cnpbtkal1cqe624u359n1tvsd0m6qx6ekpyokqalmv61w86paclrungzphdpierd6j2wzw4p54x2o66nceyb2stvipi07po9n3tyefz5i6bzy1zh',
                username: 'ppu0gtjfkl5hwauf88ip49dlp64tsfaym2x8omdx5xs2rp1i87yyveyq9w3r',
                remoteHost: '1pydspn2mp2qx67h181n0d0vcaqslvfm1h8r00hkepa0437yj8faqodr0i66vevw70rgg3bwnzx0fdbzt167pylyhl4asne9lr2ll83mtsx8rapi0ecjw7uo8gycka29rhgfsjppu1rnbkfr9i243cfat1zeblis',
                remotePort: 9061666135,
                directory: '9pqcpiq2onv4oegtbnuot2bfw5327s7fie1wsf4nj3uvfajy97nbo7ojtahdwy8kv4yuppfao0xi1swq71mlgfl4q7rchmmdfj80b0mneqa8now1erotkko8d8ghb0grq0n72599bnuxjsd31kfvlp50bwm8kxv1f4m68e8n6emhlln28dtig1aeltvbsgeryz8fphfsob819dw5lwb4q0wfgau0fowwbd7q4cd9199a8b1rkeqmen4rdrv957e227nj5b09t92cmklhy4uocpuwch67ucpa3857nsxrszb0mzj6s96ra0ou7eq0gaty9epn8aarbmctfz25z8qqf54e0uw5gor0j4jn7xspesu3v6q9uaxbuu9o94mhtdwk9yygizjqm7qkgh6i7qcjn9ogacwgxaq0656cvu04xs68jnu0gd38bisrhgxkexu43mejy7wgv2o1pmg8ta40r8d8olsvp73d10z5p8a7va4e81eid9yuxd41yaj6csznmi2kzxsli39cymrugn7cn2td6bknojm98u00eqc4qwkr2eyyhbsper8tvk34uhd9pisnurzdu6dxobm1k4biwwt6jp7ry36168co5dppmp4tg74ahjm5x2z8dxx0t9d14qtvahs5dunkt2a77fiu93xd09a5e7dsos45yr8tuqnja54m3a5mrd4tpgss5gmutuktb8rntr31dboz3s2kq9sc2iba434i27zft53nyliixu9856dxba4b9efyejluyvxryy9lr7pg78fturrx59g9mo0zyg2w4hqytg8mrhjhrwg9pz7cpgfkb3keop8qtskbnk9yn8qh7wifhhsg9ul363rxgtf75tj1drgg1swj5jbelj7x0s5lks90gpqq82byto4k0bqv4vkv8fjm2jemg44srwscui9dt6wxtu5ijj45bous53pkoja6qzs588fmixlxz6wk657yu65ah5g2ckhpgpbus5iv9uuh67uoqpnq6edxpqy6507mg96z',
                fileSchema: 'rr4uwyb8mt2jkuqmmlxfp12s30v920kztluicl7a5jbsrkr1fziun081ejtesd154mxrgxe1dvgp2vg2vyhccqyru4cp949279ni2yg1aslqyhghbxnxda8ewtoj4q78ud6yqkl9nbklo7w1sppx4jv59y8ghg4flsibniq3w9025ny5lekb8l0zz0b3768z2bvxlo9vpwoy8nezurvdn75rrxdvpivtuiirfxtucxqn2t7jqy7ci1u0353v04n7mugbl82pccik3154ovwdc0h2r8vuk454d9bhtqxf8oectjfwea80vprsjxd5c5hc88uocbmja7d6q1n7vg9ord5tdx4gtfebfgv3dlxoputepv6wb83q6ihzp8v750ot2i2cb207ntjqva11nnxlxhev1t109as7yfntw8mnuqsopdrejpdksqlv74rq3wdd31ukbwmwzw2ftrrkckya3jkmvfxxdlr9j6ni0qzzs3dl45cr6ss7apes9lqqb7br5f1g4b71461ljsua0d3xqvr6ripq431cke2pm9mye48ebpnyu6mheh0z5qhifqazxr3o7shmyvsrpisj61u6mpe18j11liymhsvjccy1j81ovfqos0rgcgvmhncu6udpxmx3j4qk1blaq1gli7k9phi91nc5cvkdx7t2nn2xerz9gcc8fbr1752zq7zpz077aml0e0wcp5725g8iy52pqlz6ep2y1i1vjapfwxco49puazz8i4vtykvijyr3nu0rplovaurj9y36tr13tmcgvqd5k0mznjh5917uqt2tgal4zd5wrgskgiir4quctl95tvecqqcjakd4ie0ss6xho34j65cq8t5cwnc08sdlkvqeisrzami3rwfwupbcjkd27ruk159viwnzshbpix9oce0ejjc9d36bg5f5txvhjb3wp1gsk74xi382dlgo0d0rzheox13qop8cvpgzynj8p7lrzsuwn5pwhhmy3fiug901r3j1s3pbobb3tp8ka3wy',
                proxyHost: 'i08i3gywki7cib8s0w5b3ry4yyl6i39qotauyi1fl8a99wrhughy5mi4lxl6',
                proxyPort: 1722162338,
                destination: 'guuj3p5m7b9dei6g7wpxub0re8b9g3nzcknxacf76b48juk3lym81rlrjq8zpbrmhrhj7acn8pn14zz2hegzglyequukvgn4qlzu8f7t87iwcuw3el7pvlmj3r9mwvex30gi1iqcxfp9jdf96kynovjwki3usbfu',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'nlyyy1d4e63fo5tzggidvas34cwbcqfotdtilrdf9vpm21jssmyx7j7w8ic87frpcu119zhk3m23rgsvf4z6urazesi2f9ceyr4s2uu227p0yaun9qnjggxh43hsylge68zejty8v34n80dkb2ywrl7lqmwirsmw',
                responsibleUserAccountName: 'gp822ls864fw7outa4aa',
                lastChangeUserAccount: 'cd8c7xlzs3wksiyq651p',
                lastChangedAt: '2020-11-04 14:14:57',
                riInterfaceName: 'whf8c9ppd7dw69wz599btd92ynaantdlizlcj61swx67bces122d9cnikbochh1uqzr4n9vp0muvpqgc6cm4ycjopgf69wys4gqe3i68rpvkxkii5h5ptt0jttjhbx3d6dtj63xyw7g2gnbztujz71cc7pv3954m',
                riInterfaceNamespace: 'xxcrvswgkn932of0wriciokz2fmvy2h14duxmfao69yohppk5euogy59zgkccock8syp85t090vrv4ojeqxbylfvl5zq8fsxwess9ln3bhsxr79xhlemgi61cfxhmqcjcze7bd34k5k1t76ikcagisd7i2ordl9p',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: '9uf1bl91vocbc1p87vtn25wyx752g9lqvo4to12r',
                
                tenantCode: 'fqn4q9diic6oucluvwq7ud6aacyzy62y5ii1pr3zkf6tj4cq0y',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'x5w567kgu3onpwtnklb4',
                party: 'z4iy3l248850sitq0f2qpimmpb5oxo4c7e273sev6wvtw34p2zss3o12pi29x0y5ifajfdf79witsd5jrzn0xmghw5b36u12kkf7piiecx8xxytvulveylzye06tdjon0th2vn46k0qt3oyybwfbb77pecuq58w1',
                component: 'c8qtvaumg4hoq4dly87nql07vtm2g49mfoug96n4i43197hvt1yuaxj05mbesoud4406cgpnumf8jtutyj9wcyqp3rvf6jfsywkywdy5v8g22qvk5tciq7coli0508n7g3gzr8my1pg1inx5ylyias43sv3jtx7j',
                name: 'rnkj4s6i861nnw199wflf29o0rkv3vbddq2jben4mhrwtbxgqwkbn7vehlzmpvzj2fzm8bitn050u938v9n919uh4yuebps92ikgbhoxll55k3gkv4lecwafi0xk4mg1qogtec9duognj1jzrfdydxgabn9oo5ul',
                flowHash: '3kahf35wet46bn0h5bnwggnmpvc0uzacb1zx382l',
                flowParty: 'ey6bc93x2epuvr0boqtr7ilihfi1pwxcxcxk1v9ftpd3sa94vldgsvyuyf7hlmegtryte4n12cxzmau71lo1f3kh9wdnt4bo50ixhwp0deq7m704gez0w6t8mhao1m11hyojclfckhl9gsl69c03bs9a01z78j42',
                flowReceiverParty: '0stubvg9shuwg9m8g014vrrqmjlbfptaty15xq2puebwh3ttm8c72o6g4uat1xplko51bnwb839narzfwgrsyyplrt689awa9ldae7q9n3786tdd40iu1t214biya38x5g3lv00usmeo1i76qg96tktmflhjmg54',
                flowComponent: 'fclmbzzv4ygannua32zw99n7fv5b4wfd20n4hf4ajynmfyn4yz9rchp3uaja3xxx4ii925wyrjcw97ca0fpxojxl252gerr2rsrsj52dbb7oymejbzzqmsifx3k45qqhmmbtm05o7kj72ttrbneu6zi4a2uf6n82',
                flowReceiverComponent: '0cq6ux71y5b2q4awke2sv647no8jznb3rnfdolk6zah8wr3r6uia6o7liqasvj2q478f7okcwj1ne2no9lvkwkxkqqsoeye3vgo7tvds5owp46uoyetit4ppxns9qap6kuyvy5ailmxulfb06selh3dh0dppe5tj',
                flowInterfaceName: 'ed5pvlxs9m5o7h3yky1eug4az0k2ubuj73qw7hfbmvflpa31sn6w03sfwk5pz34xkmbxdxa9hqjkkoizfvuolrl6gdo1fw8ylgmzj6zcgrwi07tog8yuvxvz037gpz7tkqbk8d9e7euujqwi9d37db48k3y923ds',
                flowInterfaceNamespace: 'm1y252ku4mq2zyq7k5okdt4jzyr9v7vp8jl14b1xq6kjtylumnqnnvgnzjxvkx9kvyr591qimovqs2obq16kn7ek19sz879rbse3ux64q861jfzhv0c4n7pc8p5mduamiq3qwt7o0qoakx6u5dawzikhltbzu8s6',
                version: 'dsmgo2006topef075oob',
                adapterType: 'u4sahasva7g1oe1102k6mrqk3hvym3b7zoecspb5w5ri2xk6cgrxg7u8372r',
                direction: 'RECEIVER',
                transportProtocol: '3vuaxv6soxt7umwouni4v31t3fmie1uly6guraro5mrldpc8fsvdhqm6s9n4',
                messageProtocol: 'a50vu0zdiwhaksjfpr92hvqg19wuzv9i7brm4ueums6fipikcwrfujaegozm',
                adapterEngineName: 'clsasdtedzn2owaqqz1yjen4f7ibm301sn4y344za574yrusr6kzt0no5xwl0e7eg2h9haq4sgg9jsb0d8dgqfkmakgvt5b9yzjvg43nk2dx6o403b8j2hy9cond3e3k3pquynofbq42pki0ynymcgb3lwlgsr5j',
                url: 'k173xz3k9v50e8gtddp5g7wyyan6h5e74otlxipbkdpmg24jfvazeke49h3pa4eza9jbnvl3op1cgj6fhjzjgf46mmdrikieeklb00jciljrtx6hz4ncu4iz8iimu3ilxgkuzimy9q1jfcqdd4ot2rzch3ai4z57k2k7phqax3gfgf7ritb7smihoeek0nmsvy9dgtle5e3do3a9gc8gfo2ewitjr2fm2ful5vey5ql8z12y8cdqti93gf6khagnipaztp9vst8yp8pi2ouhy0xs17b36jwqjqnxw95u8hkq3ulh91ysh0164b3cbzlv',
                username: 'bc4gs39le626hf2nc0x1i9ogac4zmh14gr3lo02n0zgxqvs2ujlbyiqp74bj',
                remoteHost: 's9oveowo5e7ljzpod4cqumvu198cmnuw2o94goe4rl9a9c623dvfl2c0bclrp3du5ddmwahcyjs15gjyskh69vby83jqijid67y4462can7opaey3sso5rwq3j09a9rjrwbea18u6f041kjisypy2bku20fm383v',
                remotePort: 8045510764,
                directory: '5wv18lcvan02q2gvg70qq0thl7dqww8t8lynrcw2dhgofxtltf4hj6f6k7dij1zlbgcev1vtzythat3bhxh7n37kst7i884da55p9tm3awy9o53v8n9whp3rvyitq9pwr1mz125oc4gsyz6m9gz5njhagkmtx9zwzaqppuqciqd5gvsw2mqpksra1qw3ayhzaub8t10vmslr0tbxrdb8xttb6nmqleuq1747iiqseni3tuiqml19qbwe0vspx9syxvrusgvwgnq63n7oognwz9p3uh8jhjgzuiv55dlh9tbrhy7zb9wtgfk52e671bmuhsoy3bqbt3x0skqx0dygzh7ut5akjf0w96vzwz74xj64qtldr3z6g0hsp5iv38s7oy1izclve17ctbpsxbullmfibgiei9dyizg84owc9gm6qfqg25yayv3un7puimp7uvl4nzjjf6e6ilnie3gjvd0iybqttvh9hi6vpv5umljoum1kdba8ky5nrm0wqpmuy2zh54cz1ff6hdffj4i57tsann0snaptma2qnvbt5e9kpqx6h9ixwtxwnssskooyqyuwcnmsu5olpthhqqn3rtsha4vw9xytrjhl3ocklx16dkot7r8wytlais21ffextukgsvlr8wlf7vh3humsz1ykmjhj5yfl5wc5rxfgd3va9hoql6xretxzwuj9lvt96qsn0o0torx5z58o8l3hi4zmgsc8jpxreds5gzj92w6nvjt2c2awf295b7yjw4u9s21mqekybf9zdu6nkgs6k68qw3qt2nlofbtnaeogjdzkx4zfsaiyeu10f78zd2oa3ef48u07o3er20chtv422svho5gcvmr4vcp0ivtl6653gf5coit1rox33rw3lcdcppi6gx5hzc3071lqil2bcgyy8rtoskqg5z48e1c7gklarjb8tde3ip7xipxlgandc34sxl3nkdjdvo7p7yra1gps604huaiuscdrw2atbx91xyje95tdd5bp438ya6wa',
                fileSchema: 'ep3ic7hk9twh2wew5fh0n7ifwmvqnewikokicjbz7pxmcc4vymo6rxtz29n6iw6ymvqvog4yt20bw7e7eo2wx7ds1fodh9hqxden23hrpvz1i93cgkpifpold5fziekwg42fj6nkzdt2udnlf81x9s9vwji9zwl6bcdr7fd9seyjn3fj9gd2pw6yu2f46z2g3clrb8wm9j4slbj62erryt58k2rrw7ae9luhcjpw4amjczwak8gsydfqeyqxtq7gjk7rt7kh7j5txohbqkqxf1ehwsnl6iidt6cwvbb3ft3ej8xytohce6rfkgwmdyue2vocy9nfc93t85sm95j5vrnd1zpjn7fbw6ntzhv9hbt9vmj8engvw1pgaxqs2p31e98vu5cnmuhn93gibphhwdwvjrgykl2ious47bg5iqk3sfhwm2oeqie36jhbboebfwykebrwh6gdoqdp63t1s4agr00ucxlf4kaodzymu3cyo8tjdr3c3ubzg1gsmo4u46y4qaf6etphj2bz78hmdn20qvhby1xibdbxle729ni1tpwkckpw9vyf7svmrmvfmk63qjddm9o1aa8tah721qsvebyrdw6n58gqbvmt75uw8nr0403wt7dqfcmnqaevhtvusr1c0wtxj3q562zvuejcqxoefay47f6nivgnmyb5jxu9pz93w4nrzulz2w15mvaegv7i850fn4p38orel8yk52v2gbjcfp4g0lpmh703tw928bpdhii0upugjk4ovh7w025ushvnmtz5cjjzshwg2js1tkcvr94nbxv4s9f6dz0rak1dv4gdn2alm671wz284netdvph3h67vrns7y9klhj9guldg8dfacvbjcy3woacbywrvwtj43w2hzeejb0wg305m4419ccl1uig5a1f0sbjzt6vidqs2dmjjtpc818blz49jw1clp40aymfw6cbafcuqq9bqn81r39oc4hxp3t2b80q04qtq9p1dy05rntlq63fske8mpupq9pc',
                proxyHost: '0whrymtzv8bp43v4b6vgjkwj839wbq4c4e68uzk0orbrqszxn7pd8uep0p2n',
                proxyPort: 2462700212,
                destination: 'rojj8g96bx6gdieufegt8glvwv012rlc45pjyvkqpg68ftmj4iui15kstnu3cx66lqbl6848841zqq2oo2vs36qyb0nb4lghvtx9ifzekkdaii64b7dje1exoz2kxm2ab5dpg8bww8jw5u1avp9dn8gfrui0jguu',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '6xoew54go07k0v8ouxs2lxr6ygfirjipg2gzolheyh0bug2og6vs82wg9ihcr3xys3df7jbs74yc041c77fsxr1fr8ped12wmfru9bjfkvamap5y7kp7k4sxaz6tg302pktzlyz8ao86afpr63icaoyi8a4736v6',
                responsibleUserAccountName: 'w9k7bfftswlmiqubm9wu',
                lastChangeUserAccount: 't6g835spafj79y24a2zo',
                lastChangedAt: '2020-11-03 23:23:46',
                riInterfaceName: '48ptl6ohywiul9i4ham5k3kzw2lb84drljst08jc847ctdwywh9jd229155zmdu1nis4r0zydrdgsxxfztryioj4su4gr4r7mbobcjghuzwcnj5hc5droq3e6n319ev3ikz60503uliph6xjiy2dr0s1tadracjm',
                riInterfaceNamespace: 'l2tv98k5niieqe898cmnhlblx28tbi6zz2qprfqmqvq3e269xkvf0orqkx0fl61ghlxvxjt9495a2h12tjc83f7mifdr5qfmlceulveo670u3rhqndxnt9pw3z36zmuejbgecz8vad9dg8furjntl11fcqdvaz2d',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'loenh1vqutfnbxix6felrcjw8xzjs6cnw5d4jazf',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: null,
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'xyy1qdk0ffu4g8u6r5mu',
                party: 'brvyxzcuomtymgjjh1nggg0dwpgpgv2ewctrqcjl43incctd06dz6hz0wbadh1e3ujg1xz4lr492zpy1rdrnvtnsp8uif0furzer8bdjl23k5irhls980qp0l18b0bzojlf94afwriajmjeviahy6h65yz3e03sa',
                component: '6vesmnc0r03ajle0as3uu5wjfr8pzp1v8c1u1745bk1uqabm2kblveu4hn1fjl4rxlbx8un3q2cbu0mqmnkwmdrttn2enims0pryhp5a0pu3u29z0iycpq0wyou5h9hvguy3hekqf2exvv8namh2q0y88cf763z1',
                name: '5ovoysg64ey5wgghey3islpuza5q3hl36z3b9dp5benhqsiq2mcgj4mp6jpqfc2b4v46pgcaqawlwytkd5ypa6pwtitxmvtj3tx7wu9e0l5hznf2292pts4dbut62d3wirb66nnlxqerppaae15d6t871vtyuf3i',
                flowHash: 'fart4frglbkbzuhir7ozqtbshmn0ou69ho156h3j',
                flowParty: 'k6u6hrrvg9pq1xtm5j4kyh84wrr0di1egag33wc2qdxlatownz9xbh68gecyljquwvhh2sbyzwas05sjbncd07j76zdi2gs4k9dlx092i3ah79extqsebgz8ff7bzb739jxitgybtqv2yq5lwplaqxd7mvwaqlwx',
                flowReceiverParty: 'glbmbax15yk1xdgeou9gdjx4u2zkb6s2prdv839z9ctj3m691u8n6jb9xqnqfyyxnkjj5pmukhes1uyaty5buy14kczvzde4ao5zf59si0hcvxua94tgdvx6dd84qlouvs8sx6fxc2a3h8or78psjt5zrawjyv7b',
                flowComponent: 's8hok0kk1k95g1evutwg6t9ehwp1kbipqycxqlj90olwnk04aln8hltwci5buqnbbb6qp8lpf3lno5rjk1m4ntlh8513jterk07m0ou90nn0emgscqzt0i351u8j9pla73tjq9y5l33pe5lrztcdjbctae2dehww',
                flowReceiverComponent: 'ba52md1dgx3s19ml2btqo2ys9ljxg8tonzvcelcyefz1gx6n85zn4ioy5ab2pcr5rih750il207mk8ijsbi8anms3c3qsphmkumyjyo65ya853ifpir4pqirrzpq7et3cqfu0n0lyaftclu4gp1vouzvtqbq8mco',
                flowInterfaceName: '5sacar1mlxbkahljx8xhvj8v8xmpbeexvlhojuh06ttyktgmpnwnxjagtday1g4ix55529giutrwthy6trftdk6wzf558gy0ifdx45sd4zqizqpfmbvveok8zhs1zpt18l8gacdqy5is95lm7oy2q7nkoyhxfvs9',
                flowInterfaceNamespace: '9lqwmmeb4oab8k1g6emgyk1q0iotq0d2y4c655jhj87gmja8bo3yk2ph7jtszl2hkdf60wpn0el4rz6o5pgfjunjb88znc7vzj2x19jywoymj8h6i9gmo79nerlwzqm8o659cvha58t5w7nwfsp4u6p631s7anhb',
                version: 'ax9vz7hxupm1lqr2ot01',
                adapterType: '67uv2fwoyna62a8ossn82lsdpkc7wd0s8pn24stlypq8438c71qrmeauzl4c',
                direction: 'SENDER',
                transportProtocol: 'g8i8xkfcjs8wnpoxzhfqewla29l3o5cddq24yrbeaop2rqzndz82tyry6jva',
                messageProtocol: 'cjf0abce354ncg1pnt6jyc61bgq6qun943k4l2vdybaoa6emc5dtjvzxzw1x',
                adapterEngineName: 'e9d2brswqechoex55hwg15to2knrhrn2fuaql0k42kfintni7goya11eomfostp1igoj5vrrgd2t36xi7e9iiwxpho0buaujyk0iat9soksk6q6lup322qwjrlmjx8veqj28hjpi4kjeeli31ce9r568scnvp6fr',
                url: 'wmi2d1ptjg766k6adtlpe7e5oo3781605qsaih1jdkommqy6je04yzqo26688kf4ss0tfn2dkeuv36j1ik1v4k8snuru2hsg2kvsfq286se6f5xm9s3qzmf1j833idrrwij1un0xovpn1017j3svfzw48fasacfyo5xttp4bkbcog2cauamyxcht70g21zxeab2ngg2i10728ze1x5bcv5o6ap9618nb5j3srwpm4b7czssnoztpwm48li20otfkvekcr9yo7pnbitt3b09vkpghfv3mubn6nv5cg4wbo7t3qfe1zf73cmdra2nk7fd5',
                username: 'e0aznmqfa8r3yf48ogg4fjczxv7jqmp54v1233h87p90f7jfre3toagbh3lp',
                remoteHost: '2lpivfs29zexy0mqiysgma1m3nrgxsjas6qws002kjc3xrboe4t0246ai9ng96eiviir0jneijlwj8v11b87jllo8rak9rmo1mecm6kfsjw1gt65da3j3ih4fwf43u5njbg655t6naeb9tfbrv9x67ap1db0c824',
                remotePort: 6993324726,
                directory: 'nfbmzms2w5pi3g9jsgyxrqvf2wiy1oghvwnam3ybdsvvi6hqbm85073lobaque632mnaic7epa8hgb48z26prbko3nclum1qw9tofrhk4hkoklgxgt5vurcdg8uuvtewb11e1r2ixbp9gnb0w34yz1djdv2gw9l5mddwuz8zw56es4mvcnn5mto4uvmr2e4pw8hwpf9tvxy6oowenjxds6tdzddjz1jv4ylvubpmihr39x3sizu9say6ih5c91977op7tb8bpulh3id49ttuvhifq0j617lmi3sa2g8023mlimykrq4ez9daqjnjmtu6phwmw7w1hh1xemctscgxob82q6bsrw4re1qon35ijx7noe1xd7um5cxn8pt8dohokiw1n2e1cqe7lpuapfmq64x3hu1x1vwbysbu8c8k1lx69zkpc6ccd4v7nnqy1rvjb4ksnbooudrpra2mw7jfbj9jkttqs4was8qazb7y6nbj9aj6obuxqebyhg74zqk05mt1cmt0ooem6aygc460c0oxvwcslp8g4mzud617loajk2s1bmcj6fhs8fwekx6q3wjee1rtyssetfhjc34c5pzfvn0seuzlh1vyu6zkj298af84jr5f81tqxn1nijn3mksns8s0q5t4gnykteh4t4v50agthiw71l7vp6j6lhsgzmq3d3fparw0b8dwnx2294t5dgate5x9iq8d1u3jht1onbjzke49mn8opd8khbjayxvbutbc1h0tprg2md3mwfk9cwua99d322f2ckbvl99y4cixqhsoz90jmppb72y48o8at0ssvbopqbxmezwksjrtjiqs5v3kbt7tfx50pz1lv9x31zt1276uxrb2ixpr9vxw766t8moqdpaiuetqfpowq1uv2kx6cjofjw5hdv3iadx0jy3kbp7zlaaykxqgrar6nlft8mwpulimhj0s540nvk3i103rbewd2jp8ku4ta9pfjw0reu4uocrzz9bfhxmeahl36w0r8jk1uzve',
                fileSchema: '12rpu6b45e6tkybaookruf7h9k7lmye2xv5r3p5t08ksyrukvj86vcxspj81raj2is90ti89jk3xs6i0xxg5k379dxwoan6x7v6dxxfgnjtign2wx8mrjcpksvg035gjsgaeqfof6haar5qiygav9our50j5ur1ktwdva98tmcywtyuqt52kamqy06uq6eve5ycj6utq3aednfysa6e4rahb2w2lmf1vuhd04oxh8dueiod4zo5ux7hebvo3jfqs6gjlzmcoee0wtvkl44ghrv169tjmc9anpl4z3r66vqvl3gf5sill91u3esgsn8qjq3zgzbvmtavlc6r3gat5tdrhzwzb81gydbpjrunqeu9735rf8ugymtgpjnifm2w7yotqkx6s9liphpeuvf80il2o5nizs90p2yt1tfufofdqfugeeu6qzmmrqhuu9qda1i9qyb4wh6f39hbdgzq2xd7dfc1ybxqe1d4ime51fkqy8aih7rl3fmqpyupjmh5bltm52q7ot13212k9z1dvxwc7x008j7armk2i39yedkdixiqn5f0p0us6p8k91s05wan43ojh398y66j68mc72umfuv1vkdgorrf7pi0ze065pyofd39zd5atngjzlewbccz77ep8whjiqp90ladcucbytkh7of2xyipdh9rrjb0xrh522v38lxe436kaytk1vp16q5dr4xr6fq9dn20ib9p2f0ue6by37ebtlz5pxw2jad0kjvqpvzmrfib3v92hd9f9eytk05uxt7fb6s5j1lyyfbkerzs76koekks5v8yrbm8gwgo6b62hypyyndcwlvdu0ayim8ue98325d0jxv3g1ymfpaqlz1aw3bm9vzwh8gxdx2ehymqyth2ckyeqvn8g5yhfw9jpf3v8o886bxvq603eme1j1ep0o6bzj2qw6ksw9574p7wsyk6lm0x4wr53fi94beyi05fgn2hr9uujd7p0rjfubowmaw48fz3lov0v4xzpxxv0kjg66mfq',
                proxyHost: 'mtay07pksmj7xg26jdfkey2b13mu1y67pmvektabs2enq7xwzoy3x8pka8ec',
                proxyPort: 1663103207,
                destination: '87p02bzo0rd8m75vistealyjlrczdpkjeh76hoxaij39nj1xd5dpua0h9mkz8hr1n17pxk01vmpgx2ytfj7tder6n85tvm1y8y0dckbd13etm7bych220glvhwpjjvw4s08rx9biwc8blznza4yc0tvcflqj0nn6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'efchvto4u5i7hef0o9r3x388p5h6wltir7y63j9inqt06j8l3o9l4kcbl2gszcvtlerbzysnst1t44vn74jwvdugzog9khakr5mmy2f322gmgbt17d0cqzw5togapmlra3dqsppnnw7i6es7krseauauxbhg90mo',
                responsibleUserAccountName: 'e6u5wbrs6anwzgs5r53e',
                lastChangeUserAccount: '8wzcdwtlzn83ytgevjlu',
                lastChangedAt: '2020-11-04 10:57:28',
                riInterfaceName: 'akk8xa2lyg5u6satlulrm9zapwyfyzqniviihz34pu2ri51dej5v3v9m9zwingkjhf51547eo9ahol3kkf4lupuuourrtjeoyxy4g4rtytjlzxhfxdefgwyoh0yr3tif6dktik4wmtfyndll7qhpx9h4axfatl4y',
                riInterfaceNamespace: 'b25ltviwmz0spb447w42ps73lwl1qp1vjazh998vylxru71o9z4778xl25gu0qm7m38kg9l6wc7l74m6t5ef280k2jbzoec8xyqbaqdr570enqgd2jhq4awdnv2u9lnb7kclr50a0xb5kww1dwoapsluxsmj3uex',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: '34dscash6jq41pfi2dxhljq1vhhf2x6da0k7n49g',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'wpzjvdtilstk6x9z8nr4',
                party: 'djtx7vl42vjxabvym6h1ar00twyi9ub5evdvnl70gw3r4qs4e8qc9543tledhh7sxok8lvsqviul4goo5cl9129sql04az56exax66g4rk3h2qeuk1c4c07zd5j79drpymoz0johmqmadvsfs2vjcu8sxxvrbqda',
                component: '6tgsp14exrmprvudg24o3amydy3bc50m04848n5pz56yeqggrr2ysg29cmalg8p9bjah7z0xpooa29z32npec806gebc9hfg62wk2xdxyamc2vhjwfx9jhtszez6pplirqbas2yke9fuf9a0ybxrj1fmhvp5xht0',
                name: 'k5relhwmjgtjsm25i8ktxcngq1nyalgcej6q10k540b79yfwihbat92cxntcpnht0om2t65uhbg6y3ft2z6fr1t0jc7wrjmgcwie6b9wufuo3vafsf159mfxhkcgcfbjvz0db0ixxcylgku6lg5peglj0x8l1wh0',
                flowHash: 'o0wsf5086rva7yknj4anferygwuv1829zmkt31uu',
                flowParty: 'lnnjrt4lw37tj8kt8sjq5zm8fgwofm7pkqyrsoil6do5mwmu1ehi91icsrmc81mgj3legyixv73gswazqoea1bg59tqq088lu4c26gj5natmfjfu71azwtuodts2z0hewjjfz6vj5u11rk1oq24c7gzeely85koq',
                flowReceiverParty: '6z76ropooa43z4k4gnnh7vwg18rryt0y5qw7cvflqulv610ngt47huo9q3qqyl54785rphq23i5mgh7upsaxw07apwoveztac3xixa9tsrexr9vzeoi682r43uhv1gaodeww953db2htpku66n3fmliyx5w9pguk',
                flowComponent: '5j0dr44m5imta037k0tfyev2bfrnxjh7dc1cnc8rqpg3qmxv01mq0jbpnpsif9so349d3tst97p2dj7wgykiztosrdrbxhs5jygriv0fvwodi56jtnur5dt7v087aqgjxiycg804pmbfw855huw03r7e7bmovcuz',
                flowReceiverComponent: 'qwx8bn3gcseb7lhueljjctt4trqq9hp196buh8mu5auzxawcd9w67w8g0awnwgwx3k37e0rygt6gbvl7sdx9vk9fzam7xqkvd5hjj3xbrw5bzhvcsfapycxwmr5k0q32vamohw5t88p1ogq91fcw7d7hrzha0o40',
                flowInterfaceName: 'yipqi52fwvxu6uhb4ojf4i6f8ik8c778hdzuqbdktyqwwdtejt3bcy7fjv4n1cl2bxjtpozhr57p3q3i2bcfzsd6lm02okfd3db6nr2q5j4a7cnhdueuxyuzst126rhqtb0uq2dw8dlfj88vu5rll1coxrwravqm',
                flowInterfaceNamespace: '1w7q9r1ocmvg4utwogpwiq1g6s9zl15dpk6ar9xoed1e3lwmx014y8o6935k785alq6a2ksxws461ps9764ng6vjkwmtky89weros7xl70mt85141ylfezvq9xvv220d4j06z9cznb4b45wxioxiurmnjnhxitt1',
                version: 'fehh9vnw2974r1v21iz7',
                adapterType: 'y1ivlzv2s31wwvhbbu5twhli1dc6j1rgbnbbm87ila034tfvo1av1iygmg11',
                direction: 'SENDER',
                transportProtocol: '16u9dy1lovcvtmvyk6nk85s1yoywl5igty7ygwoy753ch303xfny7lv68co3',
                messageProtocol: '85m8tcwmcsclniuex4wl02c3391bmb8nsjs0vvnp5or4k35d20nkzf2kvuhb',
                adapterEngineName: 'ybavjqdinavk4qmduog1mwkdbnmxjv5vmoznh1of9zlfu8pjousgus1dmzmk0j8erp7pp3on7i4q19gdmn6tuy5t94xm25banvcl0ri2dx696n25zkughga49ar62f76u2xlfr4jewlkzm6ovkh2qufgmtp49yie',
                url: 'ib7fksict46c311ctbwaekougwa7bd5dgxr83jec1n61z17j71y4ihq065lcsotnxbzrfxpptv1i55itnjt1ycr3s8ksul9g3uxmx09az97f66j632wg9pdyjf228lof1tx52izzhxy8b45t8987nneml1g5803i0pdnvlvf9gepoweiw6p6wgu559nxdx9qwcwvze963nxa54stxlsnlrdgoqbgd9roldjuif918a08xho2u9w3bfu71g73k2ecbw5kuuquttxyr7akdq5mkm8395n0cf5hq02mwrlgot3jj6bnhtyfglz5zr75pi6l',
                username: 'd8bfgvlxlpi2kfq9eiiiafwtciynkeaocd6j4rzpin5qo7le4bogm3jrfvt3',
                remoteHost: 'q03y9ylq1t9za1dh334hkfft0vsatpfo7pkmd9yktuivy7voj6xe7gvbqr7ssyskyiwrxwfe08vjavr4zobu1ruy5pg7u6uejjb3x4otktos8h5j95d3hm796tyo7eizs64097ewa1g2g05llype8koohf0fgwez',
                remotePort: 8630272428,
                directory: '9i65wxx3exo9kg2dum3sdvqugradcw84rpwnh5eongiezkzszvx6bhwka1eisho7m6r0lzgmkp3aag71o6569w76ysj61p82qj2lqftb1r83gu1whoh8iugt4yseqafh3p63j3jg7rqzszxfaqj8nnjsfmjg3gnh3ikgj3d8uxp8efzx3kis45jvt6vsldnw9s15zmnc6cusupdkpfo89f6y3vbai5jy6d31t6z6ujmm2bx11iykix93qkwtztquf8tj22j670edih3sziwcwy549tov5mdhp0783dcia62c9f8gvb20tzpxq2u3399z8149tlk7bapjwyparolgf19fzkg2fn6w1dl9vbwgdk2lamm6nz7jt3cecmnna31s57tmhkauk7aai38jncxh3q5dhkz62eflaa4wjyd59pciv3ecvvxcbkx6iavy738rab9d3bofr3vsu2l9u9vkycvcxg5z9e2hrhgrw86rjqe4isf2w9lz119pt1v2rza9l2xpi56p9utp4im2xg3ngpnyz56qc5x7kndn5z1rcebhcjeumy8b96f7830w4cmvu1cea6eqd1l33i31sbluxht3fh65c73svgiqnpx9vway04m40y8ap22aamjig5tyuro4z6kbkh6dy2gaoue9gtcplgwlzyt5x227my3ofl3xg890cvaklqcc9jc1odl7tirn4arm8azmzbe88uj1b9q0wsx24vjqp4gmmesybsslsxs10646fbjqxerdus51gb638vgag84gxf9l513q1rdnhyvid5z1q5d7fe6o8aig4094bowjdab97prjduxu3pmtdanx1onq1ymmkk0valjxuqf9041q9hlgqi6gplrbk9wwt15453e6q0yg6t2b1hbqahjlm7ozgcwyehdb8rdzj3khzzt6jdidbnqbnvuw40iyti091j9wvs26w7ov1jz3f76v1g9xm3vumpbimzxpgeexrqwl5d7u9sgkskqghihsfzckzllxqh06wtk2',
                fileSchema: 'tapzswoanxiuo6wfex200mlhlalvadk6op4tmtn9086448a8oknmdr033ood0v1c40s0g4pasy4fy2yjkivkudwtf7gv5q3qjggshperdmda33aiwx59pufmiwdqppkj74fsr8akc55bcywt7hz26qjpkkipc6lttvoc5qmxt6y0cx16baq6rgxykr12aekg6uebiflp9zcvhwsmxtzsqzg4k9cgqzshuwvztbr1bxe2lw5ww2s8jdodks6wgohoa6qm1suljqzevnrzy4y89kf3bzo3cdwudnwcmne5eionsb809r8mvnecowh0awgpw1hg9zeduyjgizeip9fl2t165chign3z5dhp8ebbwu5811zhw7qqq56x4l6ar74m9ba3qzbhdj60do6kwqy32449v13f4dlt0rhsmh0outsavxi0abic4jkuq7q2wcsph2sho548xyyrsjpjmizr385byfptus6wxzf21p44epd8x25i5pdfrz8sizfl9vm7vi1qyj26yvgj5712burmgmz4jpy3rpzpt3hcm59z52mcql3dmsl4biag0jsziz1xv1wn6opgxyaeacgfaplnpinz571bdmhbmlml4ih875o8lgsjtjm7rq7315gnw11w6sb5a2uennlhe8bwqfabi1xfwn4p0pwqsgkdc1n9dlfsp82lwppr9205nvqrcm5uxxwxugus9w5jaw5cb7772qa5lewlcj33glivwzmjuszjhd8f3dsw592uv32ocrtwzsthcmlmed84fi42a7v7x3tgdyysj6movddhn89izxqz0r1hejmw7u65p5aubwuhnis21s3ddbh80p5b8f1upb34p58h5xy5crzhs28jcllhvy9s4ush32qg9bmltldp5gvt18wllzi86yuwjjj50vgcyeud99umxkvzkmr5yt2s8j9zlgb8a5jqm3tl3pssk97gaw3z5obrsrwo0frbq3zaitxycv42n1q4crsytgckatp9ts5c4uxr1m2erzes',
                proxyHost: 'g1jj9a6w1v1u639ctutiqosl2f4n74lhx4w5vp3feu6nvtb5324iyzn0939i',
                proxyPort: 8251061225,
                destination: 'ugh2e8s5luqh4f78t6jaw1t92qo0e0nmrzpw5tcw194awqh74t47vjtot9ubve227q0n29p1w48t4dfwoep046zpz5knwhcuiuofml1fks6p507v27slvqs3ly7frxr5vd69pc128t9jef8yx2ka8lv70te7h3wl',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ewzfz7afviez563pq1e44h5m5c62rp58wutf0fup5a8fygv33ymukok1ov9miqtqpc38l6xuwgayl2nm33kv8oyspeuvmtazligq18dkdr64936ufj9f8jn8v4fuop4fexw89lan9c1a8vars2znt3r8a18x2bwt',
                responsibleUserAccountName: '8gv4iu47m33ro1lbftkk',
                lastChangeUserAccount: 'yy4suxrvfebzm0ist50k',
                lastChangedAt: '2020-11-04 08:33:45',
                riInterfaceName: '15q8p6a92z4u1qfaz0t1ejbcf3wg3oewo5ar2vjgiytri5z36g7amycxtgx9j4gn44wyvgqp2gt7otjsm5oursjen7mivmjqk0n0qdxrwtd8gma8c7a1jahstyj2mp35c6gsu7wr71ec9xawxlvxm1mvhuuo5x3z',
                riInterfaceNamespace: 'np8u1p81kv0og8x6gjmigm4n16du8ro4yf69qxt6q0rkpvfnfchsbk5aterkedchhlu7k9cw6w2afkro88ycc3iypgy75tf3bbahzv63wc7h00o77by93odo4xyut7ywuwlrma0y40rll11e96srd3ji96pwgr3m',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'vpxupoot8ip1290kkwumaqmwg1xx65r2seaxy1rt',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: '0s66vfgz0czpn8qzmtnkqxq92ddqnofx7skghs2c2rs1tyzp13',
                systemId: null,
                systemName: 'ifypamhx0nzl55y3rd4a',
                party: 'io7nmc0jv0enln064rmuqoeqlxr9k2h8hltm751mlkiffvxeo4u7slhc5q0gjkh2kjkbpns11bvkvsc0nuufpclj85msrjlsjkvpe3z6wro0lfe3lvdgcx52y8f7firbyzhkf61343qndyn4dqkoe2dyzqjm7pem',
                component: 'b97qcf11zcjz2qm38fe6lb1uftz1gye71b5cstq4k4vwny5x8kze4jx4pgwnp6z2my3hv2ur6g3182xyd0k692da9wpy81qdn0ho7j925lqrpumnnas9rn0intdfjps7u0w3babor5wlw1kn4om5853it452s2qh',
                name: 'elarw5x7hmof9fq0qx0dsjv54kmu0d8jeo0x2ssczqbh5opyvhfpghuo6ujda52r22ag28isrxqtxjt0axhpoh4i72f9nfhx8f4nh36evm08xhmgm686h4wxq74tz6d881e70dyots46gp92zohtbdz56iyghz9m',
                flowHash: 'fmdc6w0lj7cfmgj6kfxg04l9n0kya0ay2uptvpkg',
                flowParty: 'ljzx1s47wh7wl3irtwj9ab43f44bdlus4m7trxxs1mtm2ucv3xizv6o242qha73pe3as6fj1isfbuvz5bjj2iv0i84azq2839nk2a2d4yvowrv201eu2fjm2iljgq68lj9tkfffrq9upjb3rls8q4y6w2ozy7ia2',
                flowReceiverParty: 'pcp9rwt8pmde9iu8x2f14ulsvylywq0tez57xtwuoee7n3bz34b0ccgyjnxevv86a087w669uwh91vne4jwg0ycen39q2sdto78la7k365anvrs1s97l3ogjs4ahglkxjk0y35tn4n7gqgso1t56hqk99rhd6ovm',
                flowComponent: 'qlhhabpx8dklpcfmapa3v8o2ycmc9usingp2mkm1wm757oiyz3sea69wv3dk2yb95ud2pbq1534l42xqdge2ktmpu5vjlovha0x7xqxf2pxplisj95rmr3salsf93h5spye9x81h4l0dswmkwuyxk011rnizsgol',
                flowReceiverComponent: 'vg8zxpc3qipv9xo11l0hj0nfl3mgxfacyut6q4gy9bok44itz6ep0fstclh4vzpk7jdlodr0b3yerdtm59lblohytybo8vn3cpd8x9k7asfkyurlv1h8t9fdm2drfl4cwmx0gsg9zuvx07rjzo87malptnj0vsub',
                flowInterfaceName: 'pcggf6w4c84xkv7umzjbp02phz1xk7jyi76epy7drpeldkr8azjmpme3pzbrg9ogy3ynt0ebnowbc5ltkaa7cauldgtrqg84qo4kwi7lj2hvfvsnq7fhxp0xjfo19ijxmjvliultrcz0zfxz6w5h97k78xptk9be',
                flowInterfaceNamespace: '9n27gr1xskp9gd99k6t4k2cdrhgg0p9es5yc4iktyr45pvadxvcf8h5wcv54g49y53nhmxhvjkvy0qzufdgfsjeneft5mbus9ejs7z1dsqc031tnahairrt2pp23eg46jbi0mlig0j5dmxknxzha17h0hhnhsp52',
                version: '79mr3hewmiwylgbae523',
                adapterType: 'fcbedylhq23dkc81ecxsqmayth6k6nx01jnqf9ecslq0nwe8mw3p3sbck2ak',
                direction: 'RECEIVER',
                transportProtocol: 'mdrsut2zir34aoryz78bu4c40bue4qj2s7mmxgvhntcga2phsbjsqte1njl4',
                messageProtocol: 'o9mdnjdyhl170eha9mn11tbk9ugmbtfa8mottnbc18eqbhvq2oqwxe4v4yaw',
                adapterEngineName: '2h1h299r4fobwt0ohxwlbbm81lhh8btfxllmv13q9lasaul8079o6b1878g03vyd04nm38hsexe7hjqblkh6dzpheb3013pxb4eoz2hsq8ynu5wnyu6ulrinbvzg70ocbpwdx6hnzzd5u8hv74fmhy2xkwrasvdc',
                url: 'llip1zkddxq3xsr6h26tgsrv2szymdstekdt6thmcy6p5n8ww16hy32vhs0srh9a4thmqobwrzil6n4s3xiv1h4ay54jnlw3vsrq20frx3rdbzr873anjbvtq8pzw8a0orwx6t389b2kg4g167ytmxj51xffbcm8iuh1xzsz43bflakmzcbmnt4qvo6wec3lta9limi7p6har9hgbl4d1dikngxy26n81xwdpb15ronuxrxpi9a8tnbqmsz5v7fs51tb3msy1zv2rmh16fx6r84ecdulv7e7hw1dsa1xzci8zqc87gob049j9upuu1uh',
                username: 'he7y8ofyzvj0sbckbroavuyos8gldgcbjhjt7ub5egfa70by9ia32nsm0m74',
                remoteHost: 'ghw5vmt8jvv5prk00drxzqkxxfeht2kuvp6ofm38s9fonao4ml6jl7s90e0mcidob60ljhtauocb7j02jftglj65mjkxfq4bsbsixe7v0c7jhclbe7mxhrmy2jn3ub9w0o5uuir8zp41a6k9p62rcytw1dpuqne9',
                remotePort: 2866137098,
                directory: 'glrseazkpbcfe30grclxkennnqkcym45ir3mps17oxht9j6nq6sk9pvgbacjam2entejx4tii58sgfhryloptn6vyuli9bruz511swpqj4hxwvmfafuzgzsexwhuc6dkmxhmnv5y32y1a1sfd8ul2u762ibrqm5uau4yc322luva5x76ca00y76rlhi8vibr64zwwkyiwvfhnxqlm7bz1b9ausctv71fmu5clit2bi9awbc1pevqla133qhil5nlq00xocvrfac187zc7tqbq80issys46xyllylh7yfmvgtm5gsm3vbw9r4xdbhsrld4fif5cdnjuo51z7iidg8af9e6av85rrgbzety5jnyzou149qya84ixum91jc7mrgujjwquqwk5z6m5hsww36rj9cjwzf7rewgbxut8yweq2y1gd95kkkkupib77wk4rlm808237698rad4ilytx7npjm178uoo38kmzwwq6q1c0lqw16hoqk98fyy6cea9q46e1rgtdw9dtszh49bc9eiff8tqe4qswevqotx07zfoitdqhlbvwql5na26vsvgj1jf49573zb9ih0ij34ey8j0plof32w02mio5eipsx4qybthcy7oyyzmx8jkhmyi682q14fj1okzrvc090djr2yea2k9xbd4d16wcogxjvhgw3937k00fym29i91lmmaoctijll8ugl43f9ujcozndpn7ct8gkzhnsiwgqlop75m6s6p2rbr9d1l3whbzq2wu4jjmu6wnt81d1p3tof80kqzv4dssloi3xfgef22wu1wr540ha4z4gcy1nxqc4391q4yrp5b0eln8g818iwngex6mpynqfl473o92zo33baalkyjwi5iou57mi74iqp4ja76l56gxbf3nynhmeissauvjrrxnbdl5dv0mbrj8dhypj20jb7ns4qk8tdygub6zfhj09yj5n9a535jmbykj9pkmv2vlplxvou1zt2l2xkjmz9gmufa7vz1wnvlxpcf91',
                fileSchema: 'yzft5z5smdagw26nobuw6zxy4h7apudjfurg1ea8y9olxtz7arvjejmqa0oce3kw4yv597wafohol2jrp5eqdwnzkx9owrxf7jyanhyz8wnht7af60apj5fxgmq6rx0k1zwfalmgvrvhclgx9q51omg282b3s0eohyp6nj8jknttte2vw5rvy2vkktgc4yq0hyn3tyu7umcax3golzie3s84zh4ivmdqqsse85sxqgoid1cefat9oa90dg546z1t9lkjncllxea6setv2uzgyhel4gkim5we5j4w0kkpl0i32ony3c42d4i30f6kxcho7mynwt8m1hb9v43nnh7werhvw661l189kzqwb5cdyhecji4gczcllg3lhwz0uvtvgzpl6pxzu95mldt9nnoizp71zzb704u1hy89l6oo85nn27thsv60ylfsq4h9vkidckw3x96pyikhs7n82vpve0oed45zfjdzm5zv1vp4x9lcakxklvrozfuwv9l5q9mvpi7adqsaf743nu0lsiubo8tv3op0ilcy5gaji4eqp54agvf6ozcrli3id8olqeg7a1hrkdr32we7haanlvjfsx85km37dj3gpgagve8m7g8br75cm2zqqy8ndjhejan4ac9aexnr36ucj8l06rdry205oipjx118fsxxrwqb5j5unq68cb6u3lf9ret2xmvmx8b0lpi596jycxl6lorrfy2knltiwi9ouwktbwwr8ktn32rzvh1gca8qry3t7stfifkhmbl3dnygxx7yems52t99sxg9i22jag7b4wyewqyx1bcaab1cmrs3nuj1vodr0hy2ppy0znnnb6veyulgekvimzgqua4xys58cyl8hs3emh0jidlbm6zol5ebhqup0qvjdylbklwmrdetr0m28171j6jnrbe5cztx2fu3ulmiz16d10suebg6vyixwhj3nqc8n33g0bg2rc7qnfqviq3j53z1c40jsd58sc2g3gvwl1dgrwaehwpftmv5u0t2',
                proxyHost: '9xulp87m1q9ae9332c62jbjxxgny7lwnbx2fioj450xfyb9t5cely8wx9fbx',
                proxyPort: 4605312100,
                destination: '2qx5m0vcpbcs7qju5nuvjaws3t01gxo4qoacucef0ms8np77jytp14l0m7jva4c5fwol3r11q7c2jzco0cw0yvbabpsaukhnnxyjo5hzd9kzuhpdn43duie2qks0c8jn0ly0xm1zhxdbbyvpd0n4vm2czzkdgf2c',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'juuqo6354yeymieg4ic7qpfvw1h177npiz1jmetxh1xyouaug0144e614pqrkdv04ifuy8tv8z8lpz4qpmucpd9e6xmr5j6841qols2a5mpjdy3tox00oitdlgyuu0ziqp0bbvbyjymhwmuk9sgfhdxp32v5x23i',
                responsibleUserAccountName: 'gv4vfgtge5gxxlwk2km4',
                lastChangeUserAccount: '13hjdkwzaiexvdwh9ixh',
                lastChangedAt: '2020-11-04 03:19:27',
                riInterfaceName: 'tyvdjwsf0bnx1ymgyvotqat7pugi4b1jxiej8wuzzsutg4k6sj0z0k5nzzkto8uewty9tdcl59r6i2ttx3vhzssj8csempm8px6jb5crf1ay6gq0kuiqb996rbudh8titrcvcgydr17zuxt0uakn3ttshf5n5is6',
                riInterfaceNamespace: 'j9zleft64crd3ovhf77khnlm7ot7vo8z1dtygij5b7p7b50i200455o3f05rp32ilr2ayxbyb9vrz948q5gk9bbkip7z43qi5dqih5pu1l20satnj6210yuhpc95avm5a2w9del2tjfub8nzo8clavalvrtg6lrd',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: '7x8hm8745xb6omgoaqgiiupz6rkyks38qc2jxkbv',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: '124ku3oisvxnqe40a74x74wra9k3v58g2at9ei4c92ni48hztk',
                
                systemName: 'jg7xv1hbw0nucsxy93j2',
                party: '60c05vw7m0jzvn2e3veq3d87sk7o7ogso406e4i2neilasyr36l4tflleowywrcyoeh6ll8expx5nor2ibqnhup0k5ij2dxep768j56o0a83cptfv23j1nze7lbc4s241wjvzjv1kd88penxvg6ousmtfmbva9ko',
                component: 'l2hmm9jhlz444adaktjxdavzz27mjarq99slu96ddyapu0jie0wrt119i0t2cslaswtnaijerjwlufxl6ilpxtjrp62zog94ibf8i8c6vpirhkch6uj5cbtie1cq15axafakzwseio19z5fkf241eqmv1fl5p7dw',
                name: '7es6sohj6pp0j466s9pllv6b63ezz2qe2oehza4gmrevnzbsjqnhldwwfpxf99usjs00m6kynie5lzvj3nn9p94ao1wr6lbvmp21xr3hu8y8rc9rpo0o93iojxvsyja86i28g14vafckkmzo7u304q9f3cu4n08x',
                flowHash: 'a4nbw3a88yrapwrhuq6qz1w63l70hi20ugl6kro6',
                flowParty: 'ougjo15rfuxvye0sca3jqesx2u25t2eo2llbs12dc63hnr2oxlmfuo0ulav3231h92dgpk8bx9939wqq58np7dgoofif7125w0w3tv1re3ynxw4qk8ymz8vp6ne8lpz4ym2fddos2ppza77bh5gwzw8l32syli09',
                flowReceiverParty: '19ej94eu7hiqu2pgxdgeklscoz4874kn4093xt75xtwntlicabyyuz6ulbvv7x0sc3a7p1ji1mh9apsttcdxzsce3ggj37tssvzyze3tgqq7sod4x93exn3h0ulfjyn3p7b4du1zr40hsst5eslj48do2733bbyv',
                flowComponent: '8mgobkqv8tqbo9a4rcqwwe6ujcza5dx8kwaortt6l61tqlmcy05rwqwqha81f27qposaen7u5k4l2iq6zcg4xz6omahzox1645kk8jt5xpmn4itagtsmzcc4fb4b7grwzx4ucxj2xttrvt9qijbxf2h9cej4iqpq',
                flowReceiverComponent: 'f55mjzppbs75fyl3x28jpvukl9urs7w4w99ysizrrqyueq5oodklmy6bmwx0p32450ios0ju3q7f44cwkdwybyu1204o2so5fwklukkngle2zowsq3exwi2a7lslnkh6aovsfoi2ldo59tm5p0nkot9cxdqfsmsb',
                flowInterfaceName: '9vyfm64ur012e5q7ytcdqcvuu37pegacgvu902to8mjqe4ewsktao1teqa7egvll7a48wcxs1l614dmruekoqndwcgzc7l0tp2r933putvt3fyr43ha1omnvwrvozv6ycu0uzur6gtkdeajohbaszt6nm6ke6it0',
                flowInterfaceNamespace: 'j2q328lw8t7nlzmi3d3bnx0fbe6uu0h6fmx8ih8be4926yqr276vt20l7fsh2fq499wt5vzlie21dywvarcjr0w41zm3gx9wqfespxllb606pkiqplw9pvnjyht2osk4ja0qyg0i5u4sz73tjs7obl7hqwfae5q0',
                version: 'pbhwa2qhu6kfzekrsdio',
                adapterType: 'h1fihxiienb8p3mrjx6zopcba79k3hyi0qjt96row4yd4s3ftw4dtkbgftr9',
                direction: 'RECEIVER',
                transportProtocol: '6aw3646o4yxgptg57in8bpngciml1eqles0x8e2rwl8rzjlm3a5ue04yugxk',
                messageProtocol: 'wgqj06vw1ttkzsq7gwpkyupnmdd5zfm4umnlmmtxnqzbv7s1b5oa1dw5xsg1',
                adapterEngineName: 'dyh21x5l661qhouqiplkrgv5uathzg837knhkqkizg24ojufni6uynps620t7swa8st25lxcdlq8hkzfu9kyhcabqu2dllm4lcpbz1nd2acu7wrb39tuvk58u5zbugiqu6b5h24gru7zlo1ldc93ynrl793xrq67',
                url: '3z038kgursra5om447ck9cgs4t4e2u3k594fr38i6o1a9mz3tq762b42bhu1s49ujv36i456igm1gvdnpfz3clyyz8nm45skrgtlkdpyfqxabvbl8u3d1637stdlqsbmhc4qde5rzeojx4e6bu3dkz24k6unnr734wn35mhkbc0cigzc6al3qery11gxfj795jeumarysydkr3insu1z77nqbihsxef02d6xrnrqxmgqh382r1fgr4snvt5z5frffl3dzhgdmgqhshqtsz2rwdqaiuvk67ezbjwhrco6igkp0i4girz64r915b7crmtt',
                username: 'j3ia8p4j9y8in2doiv3tt1vixz1dtl5d20he2ofpag9d2stiyenq81sdr1a0',
                remoteHost: 'byf3p4ltoa59nog1pjc40sa80ilk69ctp4jtc5omhakvt9wxybuvkcctc36s3qifhfkfzra8mu9u000vffgcxa8x76jia9c7uwxdi79xfe7h2e444frk3r0ww7uquotejn19xqi6ecp7lbyelwtebommb62iy1r0',
                remotePort: 4018017554,
                directory: 'oqxcroytq5r1jcmqejoj63kvjr9d0lm3q0boycwwt6ef8tabh27zsetho1e5mvu1i49ld5ue50gktwr0ltj69w7z6znfzqylkdhwab37z2sfg3ste3xzbt7e0qdhrjz8zug3icnmyn2n1s49e2roph72ah21i71vuzyr1m4h7m2ikdkzpkbou34rmpzzkh1jmuuic28dg3zzqn9yxudkat9lgniqvu3qwwq20i6pvkmzq2u45p5lt7cn60kjaml08eo3gsmjbxwx3bclxz8mp5fnchevfouzcf3w11fsqni8w103kcxoevpabx6jxtl3ivj4aldb2yolugnify5mia8qcyddvz8lmxdixdsft6y6a82gw3709ens6nax6l463bb1c4y45ledu0k2iumt0rizpxeo1ir6eaxg17q8t6yb0lmzfe1blxi43loof8ysf96bnt3r4wsic00ntfvssguxqpapcwo4lxucgfu60g64qdpnerud4d1ra33pqfmm6xlwn4p3t21a6okp2s3f3xcsja6yv18fbhhajqrru8ipfb6ztr23spibwh5uxpujughrpyrthh4mwew6719d7yzutxbs5bk0nvvz3ipoilk5usr5leabfr0z0h72mkxk552fo5gzbaorgl3ei1funj5wfm08n58hlv69ldbjx9g500k3tzprro65bpyl7xkqq2op2eii67ba33towb5e0socmlyqitvafhr0s7qe0jtx2glda6zgtcqu2qcf2jx1wdj9rczoznhzrfig7kb3607cogtww8s9stv6vhmli2u1nck7cucq6v0mjnahmvft8zhl6iv13mthzo6p4ng197a028n4mbr532kejoy65166dw6ojvgwal8ne27owwmn8uip4sb7acf9tjq6zaj8g9dp4ebl8fkvrf2ggyvf123lr1mowajjl4fs4ztrya7hfy37ut28dvc1lao2xm28jyniq07wby4b6p6ksw40waabfbqoicgfnpmp8xh2roxs',
                fileSchema: 'ntaroqe8wcfqw9tq19optk4j6j85d67fu85ym73yxtu2h9migdp6pfnpr568lzuk1dsr7oejpf7jtqt2lktls6b3jfwzoifizrzff7vvo35puwoxxzgttrjis0d9j2ydwmgtvkqrwgy4rr1lij6nc3uuqvk7p9ejfxowi6i2qb9six8sq7c7169ph4eglp8ov5rw048gy5tlduljv0y86swaenhnuk3wbpslytvcd9njnggi9s5y0tfa6e1fvas94xtfmtrab2zawjv5i4n3upc83bdfgbmogf0cbleh3alsgp0h7uizv7x3f2a5l0s9lsu969p0me7ed47x9o1y1rr88dk2c8vwfjygdv7b9uxcr8yt4t37asl0lmuphaq2ws9oi4mrdkrc1t2twsccb98a54qyguhwdwjk7ob4dr4ow1igwscf285eie1qteuf1j4qlm3wa8bz4qsi8275qtlc75nbiqym5drbz9kf7niexsbpoyyur9c59nxk5hq0lacrvoqw6lumoqsagncikquasw9a3dffllsfjy3usckq97vczi7fan9uzsf9z25yjk5gvrbci3yk7ccrxtw5m5w7w918qxsk3h5swc4r2uuhrl64p1zo48tgq5hhoybds379mxjfjdex45eodhxhgj9j2n4p82gdymplfiedv1uljhkanssumb64wazfuf9s8u6blgq8oqf6ke5okt65waxfxcha4mtkv8hrvc9cch5snf60ketf88n0vet4uu2esan28cgo7gxgb12veb51vm0dy46onf4265b599m1ycgxsfibrvu4my148i9q85n4n5vxfy3merupykhenpgof5k6657u4s4j9y6tq90mlc8kl4wjfl5qbfisy63euyqi8q7kh4avcno1vr05aiog2cfxds44x1d7kzh1spm98wbopib5cvk14w8i40yk0euqglt5a8pi4orhbbrpnsjdg6modvchpfkki5kg6kpxrk2pe3kt3xqjca2hewlaleyc',
                proxyHost: '4vni0m6js8lwmhfpfxiytfb1u00fwrkomwxa16ecp0ibns0pxsqb0bq0qs8w',
                proxyPort: 2280276963,
                destination: 'vxbz7mor0fozdc7xoa3p1lc35hzmp3lnz8o4um2it6egweu8tmzkeekweo3hqrt0xrc11p8vfc8wvmebpzr1mth2w03fgqbnjkswxl0wuaovalso7f78lv0s5vr1pj6whhzanaczpxsfbtekr23gm4jf24uqd2th',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '6a9ytr94wj4agiptc9434zvdzc81q5rtpc3rjga8s4duzi8ms644tkwiv0xzhvwhj2d92b5fey9i6xzfmwg50jlx1f2b3vagbtwuotuzzb0dhkakua5uuat2svdk0c9szrod2c1c32swtskom0g6cfi4nbcz4msg',
                responsibleUserAccountName: '8o3skesj45g2mjh78xiz',
                lastChangeUserAccount: 'fkduhnw0hgoseuo8eyes',
                lastChangedAt: '2020-11-04 15:23:15',
                riInterfaceName: 'rd1xn9czlp33usr8opjf93kf5uma3krt723p5w213efw93d1mgmn6sbb7s9kh7gm763h1smwfa0axqh1fiem1qajpdohovx3dgwx6khhub8espbd25ckrb4abixl1194oftrjhnlq852g89qcmepdp4vkjw27v5e',
                riInterfaceNamespace: 'pcwkuvicrufgyvh0535n8fjltnllpbzh6rn3baqkhcucaji3zn29iylf0nw1c0788abyj25hbcwdxmv67thf8e57iga0x4x1m3r6prf6n9t4pzbocrligauqce0ftkue10vqzyvkbrop1optslwh9fn2vnovmtlu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'eojfkbnglu8v5hkp6kqvn4t89zh3l2d7a1ypqkxh',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: '7kzwtqpn8ldshmsy91u1qw1jnryiinm3u7hkol3bolln3av22f',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: null,
                party: 'bu8mfh96yli7oouopx89anlzh39oljibtqshvjqyy2endqnl0k6lvkxzbcy10apvmjzkeqvev4dg2bcvxl592f6nlk53hxbphrjs4zlz8zxp8jl4q493ccyfyfvh4rav2g1ic273l11c1dqwaz3kygpea8qgxh6f',
                component: 'gofhqy0kz42dwdglnhuvqoj5z659vbz54ml7jqi4hisnvdvkt826olbtbxj2tgn2cb97cocutzcwhcayw2f01lggpod4rp6sql9vi713ixc4izromdz7ns450sewa0oy5yvds59jljp1xgmo7ehhediqa4b44tlt',
                name: 'bq166rp3srmifnvyk1gpn9hsadg2vxumqxrza98zux7n6zoerrjup8eut9edwlo2oeq46gy9k1hezwtquiy0v744kw6a8a4e3k1tb6nsg59d3s68manbf70q613fgerrf0u46fz6bo68v8h9muksrg9fj2q6hn93',
                flowHash: 'egj23memodf2agtb958sbytomv93o6sjy2m909rj',
                flowParty: 'did0t811mto4va9u37mkzdeb2ie7qnpynl091q9rouwiz05y0zkjuazzucg04ng81zf6x06i4b35tsptj5r5cp3c11h51ac16fwlfypmxympr5u2goly6po5yv9lizkeyz9x4z047f4s69r0jisjr7rv2sksemju',
                flowReceiverParty: 'lldxih6qprjk5nwjtrluk3umendm1i6bytjfn7jto702dh85bkmwtqrtb7gi92cn262d99hqhd3ybk7vgkrr5cyjhwogk335gfdn9n1yd5y47ele0vs72ceg8z8sz4teidjmhzzq0dtzpu4a08vdv688qhbvs3wg',
                flowComponent: 'qrbz7epg04g5egqdefs9thc514av9pyhltvhqi8msk1p7tt36q4hsigdsionsubc1h293m29mdfi1kbfweo9az5h66bx5368q9ze8oon5idc4x2p2i7oplon48a1evl5yf68mdwler909xeqc0isdrjscihs23hw',
                flowReceiverComponent: '37vtoe5pve9xkyghmkzb9j8hhse3tgsfw5bw6ewjap6agm1srmpcjw9dxtvo2sxw53crbhbefeyjqgfb6p4weto6qyul2lzypx1tiuqh1d4x25kwd17z4uq9feukvr68witj09u0h2gjor2f22356ji4x4bnavpw',
                flowInterfaceName: 'qt8040u7ta3fnkhsnqfvwta77bf9eqkddewy96h82nmrl71kfnpkywwobx4qvp6yn6qor1w0xh6rlrq82rxnqikelyrq8i16lf59k71x1rplclr407rmkkaasj15r57epifsn4avhj41lyffumfz1poxqzy8e1yq',
                flowInterfaceNamespace: '2ieywd0vw34t6arp2bbvc0p2f5dwdchidehr25fqrb23l6tkc6w0i3q5b273mq7qbxn40y4zeh2khyoiu1ppxzwg9vixsa0dubg7neh8itoz5cjcrrwxwbbr23f5bqm2f10e4symwe0f88agik6bccxalcgk6e89',
                version: 'beb46asqxdp2gexj0kkz',
                adapterType: 'svtjcgvktcitv1lxf97hlkupltni58ozzfk6399l2d5htvsrvwgl02b94n68',
                direction: 'RECEIVER',
                transportProtocol: 'miikra8cvrpvartd0cslbtb1she2nx8a4itnygpeamfvurfslckfnd6aodap',
                messageProtocol: 'ug4mcbi5m7av54gl15g0vkl92ia0ingp91fszfyjjt8weudal7jqpl5q30uy',
                adapterEngineName: 'hhb6udiyw68rl7dtx8k0pcixls7pbpu550z21x1cah767luausr5jgfo34qazkyktto5k5onjnmrsi5tpgyq2gf6v0k6hbf3956re9mr9i62v5mta5g92bipwaoregi80rls1i450ufyrg2cpt5vkv535u6wv7pa',
                url: '801f304kppotr4f6b1jq9uyjxviaf4xh1pfhw7qcm729h4nhw3r4ltrt5ltf58t4vupo9jgt9ojgk3hoflfd0me7p21htvaxd9ya0j230cl6y0w90vx17lwub1rzy3ecr2rqfoqj3xilhifzkz18iwn8rw5hmzv92qjhy509f1l2vv3vyk6ijmddqu6nte8ledibw097kh47vabysimnrjpgg72v0j6afz2eflhssro5f3iny8p8wtl74iivvq05hs2yyo834unr9rmz6jvyv1l682gkoh3kc89lm1x5dlmmy8p9j41qxo26jjgsgif2',
                username: 'zmb5u2h8698xxi457oi7xcgx9dfq03eb8ca3ty53qqa8596njj5ffikhal05',
                remoteHost: 'tpavgr2lxqr4y9lvs9mcu02379wm3zyjn5x5l5y8k19pzu8mk5bi0kr0qilf0dkxrfupae5r3c2r7hsejuki2da3j8ms01d8o8b3torg1yv6p93rolmqyk5vksi6hngokjwrh9rkbnx0ag5s6sfudk42tocbkxmt',
                remotePort: 2271509733,
                directory: 'jivnmrc2771wm0ze195y0fjphpqdvwg19pjgmnmkjqt7t4yftu1rdrepbu0vrecdwqq5ivbekb2erdgfy6r4buibviptt0heew5gnmcv9oivnw3vaio4aca1kn4o7ltu90kr5la9u2yj9bq0tpkk3a18xevg1b65ospjfhxjvezi1bodzrzpf4d7xdqg2qx3do7czqy4ijls4wgxzaugxlh175nd9wq8qc55eb4qocrv8dik5nd76iyn9o05gm4o4qbh71uma4udsmnmqtj7keb25i58abkxs3w6on2tf18nxjnel8w96fbpma22vpmojjtgq0b95k8o0bb6vo8rhd9y6bbra1rxu70s7sdatno0symrspkt9xkbnqddehi6w60w018r9holrel5vqni464egfnaojlg5of6ax0w5my2scd5yh4lqpvyfg0xjz1loj88woazbt80moaz6z4frq9wos0kc7k2f1ypzsa5db3lwyswh4b9nly4agqrtblwpvpzlc1pfwfpnhy322lc6tbhmstg5r361daurff3fbqrdf03amtbl5fyaat2eg44strbz4cgdhxwbejpjq80yg1riojl3c2xnohut37txabu17e3iwfztdr53vjxsjll0bi17kklocu46bpia3j2bq0queb9cquhxz15y1przy0o5u9014gjlgur8jg96l7fij4bny3ld7036lgfwe4xm7q82wwl1zic6yqxxj0wk5ttgbl6u6igfueoudsj5b1w208ilrf5or972tjvi4rhq0x5lpx7br48fvt919zo0jy33kzaujdlztrau69mpjdyk47gzhubqlwyo0xbvsfsmj409k6kvkhwtrn1d3u5r00yqne0noy4l2eq220jpsckyg8n2er7w1yv5g478dd5o8wms40dmopmz2yngd4mct1qnal2b9h56xv14rruqc8x32yo6wy34arphg6m10pzgy4mus7b8bd6k2yyt306ndn83r0buu9tlmtgdasgdv86',
                fileSchema: 'jc36swcnom429k73enqbkmu99losfk4bxzsb2ivyehk28pucyr4b8595gmpct0gup7tbuhkn7jjpw015fqhtknfzsg5tx8j2bpp23iqsnsetsg84izgfasi6mxs0wymuhj8v2tqk7pw84owd60stvt3ile8f3fqr3m731syj5e2yooosktxfpttbv2t8npy2jk7rwm2kf5xj33ptswjqah43u2j88lt6pqc7cjqzdyh2ivpei12l5izblm9xz8oizcfgb8xc09ithi8t91r4b8ef1or38262c1bunkadcee2f7nohmjre99vnkzfxk91gx2i3xgzx3k4w9vigydk7jecfdl2pj8sw6jz2q86m3356vevyo0dyh9fx2ip5g72dz2g705xx6ndrzs8hz8dwp9ofbx6cj5feci3wnps2bsch5qyh8d63gnj3km7lsex47ipemfpcvo6qjcrfc64l85n27at1woo264som90f9r3tn66k4maccwvyy419xd57auz13e1c1ufxn8d68kebrhc0kypfvygy3g5cpm4rks9jdvbn9et5xss401mdhoxdlpfa52g5auu5wdezbex2l5a5c1oexwf6hn4692f0ybe555fw1iunldlvbjvzdr6kr7dj6ndmux647nl3wv8dsj3i6xargbnelxq46hqk8e7nuen8vaok4j3qx3n7cv3h10vmgpm9tbkilrhhmkdvxsqjg63z1jtsq90h8edkbwmkofat1vempsfmk6n9skmh7qjibbwuyqsc3xldw9yujj3k01e830cmo3p220e3oop900uj4eabwlz678t8kajrihxgo25my2665nbav0s7b7a2s4hnhdibsfmug2b41ue34ox3n1mkzvnroltfqxng04qj1fthqg9qf6zdobyxjgh7jbea5oy8kw3qmmu6bik26y30ewmabyvbkcxqen6gdbv5d2tx2aols8ypilyhomz4ggguj5y3ofiq0pbfw73q12ce3q5dy7ekuprqu1r',
                proxyHost: '2sfwnzq12lpb9js0io99qfayntxo1kmb2bh0pb8jeefcaapf9yt1ppoiug2q',
                proxyPort: 2736541861,
                destination: '8qjx98t3j2b7favujhb2liau201htk8ajdplt51be5ixwc514wfi9e50yc9wrrarol75h3z0zcmlxeqt9t5ku3muf57ipa6fvx5gcdb5amgd2000dsk4aei7e65a3ac6qs4vtitjwmbd35npk5f95afyx549med0',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'y3tyeftri1tcm2e5ydwzsmuw60mbtmayspkx9gswpwz39qdd5y19904qiwb4krfdear1tc3br1wdjdhbtosdlb07gu2wgzygbjdilosmaf3sozqup5hefit4974rs1xrxknwq2v0id4xwm6b990zossd625kkhl8',
                responsibleUserAccountName: 'qjpayo2v3acga9d31kv9',
                lastChangeUserAccount: 'fdczh23ifoyyog6slkin',
                lastChangedAt: '2020-11-04 15:20:09',
                riInterfaceName: 'a2samozh41dp2ovxxo2ac06aca1jalsro3nanhbq1fkch9zvfthffk6ws3vlhwkhu8zv4vpqs19apo0dnq95wled6frhedqzx0u9y2bmpbyydmlldcj1ndzdznvtaw5hgcapldnisp9cr5cggxud5io7ltl9atmr',
                riInterfaceNamespace: '7kzfkb6xnb5p9y6icl7ufqsydeofpqh1rrhijwxjs9ke0nnpvt9m6blzkgftqj1nm1jzfwarpo78z4u68lvnqug48vor9jezw42hn7u6yfkk3qohfv2lbih0kdyrf1vmg5m7mwnc3zxzlow239sdy8bq1z7st2dr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'ze8ewosfcb84lu4lejyd9o1ev4ebjhpsyq93pu8n',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'uucr6itp6bdbakaubqxddsxm73ys8tgtowqf7vclhsmcaaqrh0',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                
                party: 'xt3xexqgo8iycaxaxd0n5lgeuw19h55ng51qey6e1pmfju3035x5jyjj9ixm8tg2dxjgaqxbqwpowm90qhperg5tfind6ir5r50etav3pcwedfjudkipjt1euspuu55gczhv1smzbrbxv623w9jo41iopnosh8ju',
                component: '37fdjgqma3k6kpq71pssqmtxil3wvu9bazwrpxuqw5mt9wmfjsiewcw3rjzqvijkrlkwd16392h30i21lpczl3bnfcut6mu934x11s75yfv25vvqo6eg2py0qzz9ui79f4hvsd298g64ujtao5x3wf4xb03ouw0d',
                name: 'wjwkdw8d45pwrz3nazyar6wn4ksydyo70xqhmk66he20n8oqaluw5y8hf1ofxborng4zo6kduybmilortdutllp6ya9bwcqd56xg353gu45wzj8pbiqzw5fzvlubydq9wio05ddm9qe1qtbi6lcunpjao25v9xf1',
                flowHash: 'mtafpda6flkejv793ltgulv83g7mua25a7k7qkis',
                flowParty: '3lkzkyxeke4f6l85bmqts402mhej1568890hgfyomyaeg01z84qorn1wzsh5114kv5qbeiq3612wcnjkljih7vh8dci1s6mnoselvjoos2aqiznsdejgkvzbin0dxtjx36wotsmwuqhctbdhlw2dmjqysb2x0moj',
                flowReceiverParty: 'zsy2rvy9bn4z1relxedsrrejqlyf90v3nwcu727dp2s8os58dwpplwnarsa6tqnf5nnnyr1hpusa3fi81kwwpemy5sk06sndb61swj0i9wjcwpqep85qwok00k7xkvqdioowzlmttxjciyztcc05fqwmg21cn4tu',
                flowComponent: '60815961dn7wf8pswtnphbgoxgp9gmm6kccfox334p0r9kuci97l6cshivo4t3rwzxc21hwzsyre0qeuuj8966814lh3kys4mcvsnsbhembduvzm5omofrqmmkudf50fu04o3tiad5wco5ehtdspd0y6lg8rigkk',
                flowReceiverComponent: '6omtllw8s8ilus0r6zunepuxejwfcqn724p4d8xpkef2i3r2rl7yi29dwe2ltjr3a3xeldnh8kuvxuf2jnb7hfznhpstxau737vt55sbrjr3bxue968sdm2jgxsqsoftmtufkc3tjrs38u88zv7wyzngsszy2eai',
                flowInterfaceName: '4yyea7whb3q6nr9zfr4rm9ei3447jw3ys7ip57g5p33b5cuzvczk37gwd7l4pqeomfl1x16mkyk9r0ekk3kacrpj3kydjejxlaji266hocm0reejmsnaz6vf64242vg5v0r69gruxf6xcju5dp2t4irlcrdaqwxv',
                flowInterfaceNamespace: '82osdnj2l5bw8b2tc7h87xv0tscys74ee1a2du8hhn0yxzxyof0zar2g85dkor20linf1ketvlc84t6gv0yl9z3ghofuu378of4sc1q1h6v3qaklx12zxaoj9vgsgj7rqoqt4vsujexmjwl8uhbmmpf7o4ba8rxe',
                version: 'yuq9uhauppfuqryji843',
                adapterType: '4v0ks9ijhy5x4d6uxot9a5qwt0epfsdd4owoguhh17ko97g0krn81xs6cit7',
                direction: 'RECEIVER',
                transportProtocol: 'fa3b6z4spwbkidjd7gzttqzfzk6v2skc9hc4mc7k674dq4tppez7leslw0az',
                messageProtocol: 'r964werxhjc362yojhbwhprdg01syj3ibywsf2un822pdfcd2h9otmbmmchd',
                adapterEngineName: '5axhm472rolzfdw3mwo9z9e9udlw50d3nxbmwzpzpara4jtcmtnravsj9js2883jtu75mgwa8ir6027435jj9stblf440l6g949fvxwu2dx3aahe00z8mlchl5yi9cu5vqg5v508h1i5c0qsnjfqapjbwx5rkrqb',
                url: 'p5a71ktwm7i7n0pds098lophq64lx96uoeiyh3y8po2rn1u18tse5c7ru7n35t4wtqpl5s8x488pavlwp7eoj51qefdcmio1wl93ldsej9yjzr8z8egw0xqc3rckllg4y5fv2tszikc16vsyldzczg0gff9l2g90uux85yfm6usizcenj7tcoziqlubanzlfiucdfzzebdpzkl00i7su41qklm1geptovk2h94aztc9o835oteg99qt5b4wdet8z37nb248o8sldeqzy2yj3vqlb5awjy5q1tr6yxxsvpw4dhx15tohexjl8o568k3kq',
                username: 'hndufe5spqoe35p2fa5ixpbimksmwoyy02kjebbos44icl8kqor1po879p7q',
                remoteHost: '3e2rf36d8jw2qtsop9mke4gmbm2z7ay86lm9477adly3glnpr7qu6liftguzptaxm94hy3e0j5ioclmsoiydtiqdvdkhwwhedkjveu7tplqz4fnxxaft7adhippg40vayyxgvs7m7ynci6bktzrto85ikalxic66',
                remotePort: 2661450332,
                directory: '3bc14dhtkjd66qbhzsauu580z4tpjofz8og32xh9l12sys61vb09pp1t706iunb3eiutgfgtyocvwtbeo3jgiguqojqypmgjyjbfuqs3rpcst327mbzikit29xshuqtbsevutl2qf28rtasi9rz6yi6nrn50cm1cpkla5hbdg76w3j66xg2dr2ogfvhaql7bjlr05pyjoior7kpxxohi8dsj98xnpn2gaph78n2hhum6wyvw8zmthhvd6jesrv5z2vedzkwgq4hlpdt9muphpe1jsklehf1ohofqd46p14902eux3txbp44cou24zvxv8l93f5rk9dsimdbttdnskvjp9rez8yr2nay02i3f25ge7lq4jnm8skssrakdmsohty6ooshfjje0mjstqv8lojfsjfgxbvbuq4lswngv3j4byrb6k6xxx3509tr6s8tvko4vt8vof4k41mcuusv88lrz1lh8p8rtja36nm3swv5vzomusc2f0hat47s7opwoe7l2g2olh142v63869jdcgc9lbe3qm76frwedqztvqex47ocd9gixkryjfy49y7veqn07tp3148k9z4qqhzj4qamc8ux200yntj9ixu5fla2nxfsggibdq9u2s7d5vp0gpgdn0p2ka47le1v0bdd7fecx1wsxvqbtcfitnnc7rem7q96o4cjmvtrikepko4c5khvd9j7lav4wune5hvvmnu673q02c2v5acer5l505e0uin5nw2uqaog52rycet0rkzsub8k9f4cd6m2zh5uk5cx72nrb12wgrtnbcfcqdiskby0t8hslrp2qwk0kf8xn1za85wjr2lmocjedvpgbdbtz2a33rvwlhbhlau0yncls2s9jq2g8s9l5ns5ekgpjiei67tt9shzerj7qrvj6p69cbkmwwvllz6ay7x9zjxsulrk0evyk993174r3dkgqsyd6y0aiub77gha69ik52i7g1xv44g0oi900elphoaqkp8gxn4446wmrazjoptw',
                fileSchema: '7tx6w9voudcb93kknai43ibvoxytj138paxn7ikqadzis6fepq3nr48ud38gmjflh89e5nflbqzja6n6di73nszn14sn6sqz4rt9vwk85vscqbddj5vsp9r08rwkhhth81r7x1h0qdbo8vh9xcxhk2ig9f4vho9kkwl2z8el32fgnxxz6gvua1j1sfcv242uo6prp3hk4mfqudjr7w2160cjongjqnpz15zwkjar00aq40noutnd5dsbv5t9p2rp4fuudyuj0irazd9vzr45gw0glng3u6nde5o4jr17h2qd4s5s4zvk1a9298pt2x0zfjyl3wx87ahzd53xk0dic594332aascfs135f4ars1li2wno9esgk55ykcavmfaujt0im3qyxpcfmv07basrx3jcel57ooree8c53prxx3mvckmqqsjpyy0tzz4jch0hyuk4xl9k5s43iy9ii5u2i67xrzxz3t6kof75nb0d2229qt00m5z0a9ioz23vk152y035s8syhcfzgol16xfvdn8u4yyv2vs93quvi0awa7892ctjlzxskzws83sq2m9246gy6l0me8yvj4659mrid5pd7lpbbkvqnl5o69guvybf9wnp4603pspefwpv3aqsdw4yngwmdbgq8e7o8g6m6owkh0pms2n5rarmmb5s7s0lg2j928u1fmvvfp45zy7zrbmi0uriz6q5k4cz04wf7fw9d29x2ss4yha4ehczb6r9omfs9ngb1unz7j4ni3y5k38l6pqip4o9dyde64as0dnyq6s0o08tb9txidu8ov7d94yroq0o3f1vqy5oxwkzqwg1u3dsx6dz1luwo2jv0wo46mc62o7fujr3lbpckj6mhn1y56pc1ztgpnojko47wufmt8rrzsp0too95zw3v3rr8mkbb9wlglb7ylxlj5jcgekosgovgw3yzakk7v9693jkzo7ghjwt8b68g89hzelezr6yty9p70jf7oznyf4gp6we80t7sogm62d97m4t',
                proxyHost: '84o46z872wh2my8ayyblpqcn0u4q85ikmcnlsyf6exoxuzi5cmxlot4kwl7g',
                proxyPort: 5932713943,
                destination: 'hk5viqmgbpw4cixzfxadpd54w61br8nvtdqgibahwcqlycwdu5cjoq4rvuicy341ieyp6i94a7at3xaajplcsdf0nc5qwbcjsqv241mch8yqqiywllp7huf4fw00phy0qmzbquab33cgivlxx4o8nize9vaepll9',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '4mvilfc8pxzl7sv2mr201xk4wznfvnmomkp3y2ia48uu4ywch2ssv75nu36jvytriszd39z8i22e5fomug244f39q0t56sjx8476epxjmjo4kkqcf5q65uhqo5uhf9n2n2lgug0mv6udlb0lfodkoumob1a8fh64',
                responsibleUserAccountName: 'f8z779895yywlvhoi80j',
                lastChangeUserAccount: '8a6d8no0n2q51vurqhgj',
                lastChangedAt: '2020-11-03 23:27:02',
                riInterfaceName: 'aw5k7a06pury3phu3juwfo6h9lx5emzm4vvb24fq3rnsh04q6frrvs39445tawce2u665eznlfgqjeycnv793zkxjrn4azk6imbne5mrg6uytc9f730xl4k3ye2l7b05hxa2ltxo0xv3f81m4qy4krii1ldn09rm',
                riInterfaceNamespace: 'h7zrrq1m55mtaqwk5ywgxjviisolfi577pgf4kapp8sthfgban931tjkbolbiqixvf5jx7q2282l4knkfi43sv0waqx7eqzhgvz4dyqf7j4b2ysbxtt4p3bmbtg6wzenvik1mtq525zjhlv509ktrghjwlmrdi29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: '6sujqwm1454pwrz2g6mg41epmpk3yqf9oox2fmsc',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'hjjoyj9bzorrl1ptynk1tgb5f04zabjasj0rgujh9414lsy2vj',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: '3ltevdoq0f4tkf2qeg3m',
                party: 'ul3clof1ynua8syej07d2qu0rhqz7c7ko3r80k5lmcv99e98y086sfbqi5h46ewi3p27hxavfa5ah408dpzycz14sw3sqcnricxfn62rwl292q0zjta63ufvnidi46x1vb0tt0elvsj389h32pi6916ngz694xvu',
                component: null,
                name: 'lwxwwnq8n790cp9i5onm5lsz16yhwh2enjst56jxmgk6knhwql7zxmbjbg0ru3k69i1txrcow96eqo8opz7ks4g1164e2226acqs8fzunev71shi1evrry4wn2aksvddh64euks8n0uoulrj8zu7q2fz76xnahgp',
                flowHash: 'bevnl1ejy9r4wp9xtp4bzfgo512hiusz5af64nsn',
                flowParty: 'q9osvr74xzlln9xukf43bojnnwje0hopha5hfsbghfnxi0xx2e17kdnj0hi6jd7yxgnraivvov8yw4u3qdmgh0liwv8ld3q6xx1udvp5y48056eiphekdv6gl1c8n62tyqmqomah9rinlvslola3i7vse2mjuee1',
                flowReceiverParty: 'utn1qw8sukogkps5mkkg2tkb3li0v9nwqapc9nseilo0par2nv41sr716g7stnwq7l6a0g4t32ce0lei0q7gjsvkkyi3v9klui1isth1go5e3530i2r2f4udq6d7zh4xrgvcq1a4heyaqfelbprucgwwryytq81w',
                flowComponent: '8ltsvi1e2i5aya4kz4klwwsc9921hq2q4bt9nrmu39ne7u8v81cw9q26hwzw0li4xets1e0h2f7scy4pz8gugtvsuui15xkn2xj3hy4uk1dn9bbry00h65y738j4fyuiwmitqgalayi2pnst6ummlbcbrtf18cau',
                flowReceiverComponent: 'us2oz2gcncpwq1xtepi4wf153j6xkhf8zm89he6a0at80oax3wfmh9jidotl0kcvdiwk68kjmp4qpr8by3fkc82fzb09tkqrrlhzusec2w1tiwnu3qkag31u9y012uxjdl10n91e9b5rwaox5e0os9ue9zky4wut',
                flowInterfaceName: 'na1xs25h5fwynyx3y1d3pbirtw3pvwnprccd3hsy0b6emk00siiojt39g3xoyr8mk3hw9xskomh4wxmc884lq8y5lcut8p3k96j4utm4e5gj7jw98ppd2y6s29xi3xjmbhs8dgorp9gqbzrgll0fxzg0a9gh195x',
                flowInterfaceNamespace: 'ixkmg80ff930hnba8ui46r52fh1kgidto1yza3jpkverqv2sev5k72mdvruakrid7kdhs4e7pl06dj2giadb8uu9kemwohl5b6xaj85q921jbcp5luijer0vlwgppsokv9tcuiw46pca1obhiyum0qqtvxl8gnni',
                version: 'rd0broehgbgcvh6jevlx',
                adapterType: '53rt3prv6mcht3qqdqgek4ellhxs9yfxcjexoxtktr841ntv9crmugz4gtvu',
                direction: 'SENDER',
                transportProtocol: 'ypvinj3s3ixs3l918bf0b30yoy55gznqnjl3ubrqiu1mx6bhe79a6z4c9lek',
                messageProtocol: 'tacobtmw63yf2hddipeu6mndon4hmwlgd6mawn2u8ijem78t37xtiec1cm9p',
                adapterEngineName: 'aa941vmk0y87dn9f85ml5nrht9cxs2gwhl7vtt1rv77kg3cn0u4qbmii7nzisrijlog57srltxt6re5oga2oxc0caoc5hkrzd78q0a79dtrkx543gy8g2cw5v3ulyxiyxcho1ok0pqu9nvrqe5f9mxy2jit56zzx',
                url: '6mo0f34yojn7o1pm73eluigtwckyxz0z9vcaahlr12rm9u5i0k3avz1bdy97fafsujxg90s8iqhcusj5lgery7zvytd47h0upgilmpw3rl6dz70e6abo0lzu0oxnjo4sn9pcwexs0g8eq9cxndt2ag8rsm615nqmtzj0kyvvxgvfv2gvyxswzme8v89n4gndp97aswz91fyq40sav6vkvopphc3l6yj9lqyjzbfexwnv5qr67064j1reao6dmwz5jl3o2sxywnb4n5ibbs43t626zg54r1vytegvleng15w26ugyfg4vpdf4cld8kr4d',
                username: 'm5h15884zpkhjazoauyfs82iju53xaqbdsfarebdybvexmajl1p6oryrztm7',
                remoteHost: 'jicbl8zvy2rda1juetwh1d3db2qoy1qgnkeyrrqnz2tcney62ycoawcugyieb42cb0n00j7w232m7two37ae5q47qij9q4ksvcpwkx8msfnc33wmeg26q4jqzqv9ex4o0qmh0kg8jx1gwyx9ashcfk9qyy80zhts',
                remotePort: 4985453998,
                directory: 'wsdrpr2adtubd63nuj1dkgnjcireay1leyyxdp8yhr4ix2oovyxn66mngdho0w8wc6j5gjv93s19nvj2fv8mqup6i4l4gema9khrtju5sp768e3bqutsexi9a8w5w8oal44zo8vs8kgmc5cp6ivsvc6mwk9plwpglxhc0ayjfpw89z04tw5lggawg8sdbkm3p437yjpwq08af8noqkwijqmpxr0fp4xfvbb17fzz870d9zqg8mzd2qem8hfreivqdo0t5mhv8e24mbd5jcce28u7gt43yhpxw4a1z3kjb7hvmydzlztf11d8ej2ov20414w9ehva4ptqq99n4jxxgtpuql9b2fd8cyl6gai2hqqoyvvkqsagptaygxag208xdqzpc4asli801ufyumw9y1ruq6xcfwgqhfor5i9js5u5hcoxpdu32ylsw2dv7x6qapywccy7as9kmc74b2vlviapf2epky3twf1s0otaapxmb2d640htd76iacs2fufres6zztk9e18ixzsj7i1w3b7py8200519bsaydgl411jbz7i95alef4h96ckiy2u0o4hilvnqrz3vgdroh0tab1pfa4dt5b2rtnec1lrdxaegwhkvvvy0o1xcbpumdq1ga6vbybmwsclu7m5xt4r0sln5xm8wj8uu50ndp87obhpflsx0ejq0md9chzlfxur2jpxoy08iexpu3nen0uavy3nd1ipzqcxkk6mjlcrjhrzydbxlpjna6f0o725gty2l2xebzzvf18cidm9l0g3zxgzlcod82hu5jhekxttpmst4w5e7urhndy1a0yoqboik29n581el471hxhk6ok49jz20n99y119sc0707vxa679iqpbsrny5r7zkjweqwx3ksnh34n36mh99eeu5ygfl6s0atcso2tzpe0juogk2f1awc1ug1vnlaee1lnb8dor6ld7sikb86pem6ohq34bos61uaxjx9ftndbkxehr2hoerg43unozp2sx0rtqzewtg',
                fileSchema: 'pkmqq5kgi3kqna013mfyxo82u4ks1af26y0z9wrf9l98ulqyrvcxk2bmn1nmln1ujtjmrwi7etee9tv3dwdv6c71ft208tj48d2vo2yk2t8ixo1jisuudla7nv0e73hkbiudu5ie9irn7jrnepp9yeev6bgym20ry27f0u14rj8js976xyjwd4e5sgfe5d0tp3vpuecf8hfib3taz6acajtjyb7a5ve9km3t900q899m19erc234v50tz047zrhyi24te15b6akwz82lg46wd6uqvxbamcph2962eo3o51yz0of2qp8ubioktdwm7fykhnoa4pdfvikw4n0g54ua8xpv72ojt1d98n03ci3mkcujz8a9lz5j54f7u4ndbhrxmfbhjas20lu8gj13aauzqfdsrtiakksg7s9djuyckobtsvnjmggup1dj6rfu8w9lxdlc53nf1iscferq9ujl9gvqtbrs55cn9vgpwmlgcuqc3utf6ptvkf5o3clso4l9ek0qx0re1e2hjqinadmgyow9r6nqlc16uje3phns4hdfp3vk6un1n55t71rdsmtioxc51vpy8qw6vgyjc93ota7sbrpwa35psbquhzs7e0qvroabdkvsm0invyren8kmjgp5kpsdzkv8k9zd7k32f4qo056pb07wuvm0k4jib2gh8bw7nzjo9j4mp465yxf80wzcf7iobkelmkp2o212opwvxqcju4r0yu36qhruygdygfr4s77qg38ozz6mgzwdhlfiikhaaujfhnoa9dqs2jzlvodd6hh4y456c958yfj1r8g4700b5de78lzz82r8666h0f0oskygcwvlzx94vxz26m2zxvqz3jsuco4u841ut7zfz2u9d18c772r10glsododc34te5p054zor8bp2tgqb66alf95g32cxnzqqfsn26rhk1njcyr2s9ps7smcd273p895bqdw70nmdc0y495tth6h03fvu9w2ot1iv0seicqcdcq3hc3uttnh8nb',
                proxyHost: '3talxik6o0hald6c12r4ikpm1datb8xm55o5fzequbqs7v8zkvzyymzen3kw',
                proxyPort: 8658555020,
                destination: 'czgsz1t61ejorvt3234066g61hikxhm01jrh0eoct4p15ziek4g5tnk340n8t5bdvudim0m02lkahw0ao2mx5emmmiafbkbnz23wmshzxo18j8k63xsw2t3sjxerp93olbkun2u56rfbl8h84i6c7mzraleh30qf',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'xd0nax9zfoupwqmyatjjtpizggtkfyjnw27oiwrs7i5nzqc65txp6o4k62numikhspkcs4xxtp46mine680wl2h4uc39pqdvypwagxlxmvvaxl3h3ukvo7ooi8ssrgr1qqwyfe0yjkh674i695x5g5pociuwxgtn',
                responsibleUserAccountName: 'z2k3fp48k2yyeu7yrij4',
                lastChangeUserAccount: 'bajpz4aiu6o6gr4xqita',
                lastChangedAt: '2020-11-04 01:36:27',
                riInterfaceName: '2uq9v6keogjtuyhser7a1b8nxqczca83hiqetssc9f0jut6p17yn1itgvlidpmvcm85x2u73p9ccg8xukley07keh51gnkjm52ywsnp48xb40o8n46sxtfzalb4g919q048n7qkmfeirrum1du6oujjm3xq89ipn',
                riInterfaceNamespace: 'hd2quw7omfv63go7mnxkf7sjuwj4l3vj2lygu3ot7igq1qm5vndc24hxf56v51abl44bq5znkqwsuhfqyjenyjnzkqfjokpevb78tasb64cbf4te72l3vlgux5gm5iornuss7rtu9u2fssykevo0z2pm971atyz0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'wkn4atry0nnr5k4blss9eqbz26etpg46zcgb7a99',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'dpzzrnwo4teql3s6oeazsm00ltnsjendad344ujebxwa6zjj86',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'fakanp7b7082xki7383q',
                party: 'be7pysfqjrfe4tqlqgj6lvqs0jd4ikt2hnz1phzsp06j2zq3c3x9fzz5enjhyepx95xy1tff7rh713svyktpwfrxkvphx9nhe0l67assuufrknz4tplda3w19c4dvqs9zuxco5hikcdva41we58364no45a73th2',
                
                name: 'ohsjtnjrsgrxh4s7iuni2o3qz77ketnhvej917cv5ln557w8n8pkne5f4z8myc8cg148gg9w9bibdxjn2i9isyetce878vqteobcbzfkwrfvraqdgcwzkiqsuyvbpx9fznvl1rbh0we24tx0aypkk9t3fwbt0ca6',
                flowHash: 'glp54ezaep66rzlkjmzko2z6x2onc8wxhqg9lu8z',
                flowParty: 'kcp4n1x6782xm51tbzqpjzh4zmkbtm0l69pv8ow55je09pg9ok49rv0z9a960wasud2qc832i1e2bjeh87zdt2828t2zkq09ky7sievfhe8nnajehsdctdu2klhv1xui379lc8zexou6e9h3unaypxav8tnztuiy',
                flowReceiverParty: 'q3jqe19jea814z5y0acfeyea0n48hkxp7of3dbfurp74nzwukdawl4tll1iav3i28gjtbiin0ttnuu8vkxzeazq63ub78103gz6f5myc26q1qknmqc3g7l1cpnk7woc16789m8fki387t55ov17uvppgaw49s82j',
                flowComponent: 'yckikxasjyu9grtzunz1d9crdcbloj46eut3o6ocqwy1l89skemjdw7lr7yn8pr7cyu1mpnki95szvjlb8anj32gv92h9sp32nkq0n0l6pb53ezg0qgiybyll421mytphp7jtd6gvy58wd31g9dhnnbph4wh64gk',
                flowReceiverComponent: 'sazwojafdartd4qyhhvhntn3aqjkhluyarxycg6loq0j8dsw1wue4ti3ueejuhc9lxwro2gbmfpb32socfy0adft3pthgmsf5lpykubj8nqt6m9m36tjb69gum93lpq5wtdbmisa2dxlngeh0213j1emaixtpy69',
                flowInterfaceName: '214iuzifgvaz057kc4o0q9ugpmn2znnhou716lgu1e7ipobjdg2z1x34qfxzz65avlwlxn57jd9oa3ipspdudxcmqgzm8i0fa2dd9t887mck79ca7xzp88r1s95k7ueaogsr6i729k84gxjeqmmoswd539mzu5ie',
                flowInterfaceNamespace: '8vaw4qgl68c5n3ulx15zuoybr1gqirj05lf6qgjdtnayq68c51v99o7brfyg0q3avgmunm3d6p7p7ly34ubxg88yoc006umelw6evaugrd9ulyvmkhmjjeiz9uvvppqn0yb5vfwz2mxdq3dblcqur8zj9sylf6iv',
                version: 'tggt7fwv56vpwcqo37hs',
                adapterType: 'l9qf6z7wwc4fv0u2o2104ee5p7uw6dohe8zanb67rm0r6pa1zasrvhy6nj9x',
                direction: 'RECEIVER',
                transportProtocol: 'ksxw30cbyf1owtyn0f8xirk51g5wketna091gmowx11t0x6n5xkx9moewxxc',
                messageProtocol: 'bvh0tawnaibaw6f46yojdbsmwb49va3sgmfdqi3nvcj2vvt8m27feb3nnogv',
                adapterEngineName: 'zuo3mnc99191gfwab81hdhso9cihn2ndnwqqojg7ihqvvmiaf6l0neuw8go6uqo75em2iml0ylcd69srwi8madx33913xvjm1ktlfb3yemxtg7odba62yr9pt8bkypag9kdccvhk9z9k32zqfmmjsqf38evhwpyr',
                url: 'exbg7cwyta4trlo1lx8x2dx2o41rvjbax2pux4jz48l80fez0ocfzu9tw9cqg43lc541y5zuf7aiu8y6b3362qlqs18zwh98kc3qh8r5qjswmftosdn95t9ud9u0ekk7jdn1wqymp5jyulzw33yj2ki2xi08t0avt9ktt3la077ot3npvr3vxnjfztz7v7hxw3vn7hva6zjyoyke6kfl7m6f96l41ka1jzis3d21ss94llib78t4y4ops140g9ymtekbmxifp65l4upn50553kedirxpilz5k3ksrblw88bqn9pnl4dz63e2ayigksr1',
                username: 'teau4idmxmp0hwdf8abuq91dq2v8w9culhkha49r5yn9wf04ikqz7ilcwkx1',
                remoteHost: 'rr6ejg35ntgtt1nwefncijbr2cke6mvoxeqc1psjzea12ftsy1yy9jysz1tztw20483ppuzp83j96j3xdrmxnsbsub5f9ikd8g57n19nngyje59nda6hcbhivp1d7vxxn8x9hia39i7ubu1zevd4tn509a5wdt0e',
                remotePort: 7782615144,
                directory: 'olgc6j0et0ykeqmo6weue3htu4jzfo8vofsqqbgxytw3z46m2ssa286hehwqrrgvan8e4o4nn9n2vjyfrcra6nn87vku17h8sdlcap8q56y4c4t88eswa213vf5gwj20qifbnc65z9t226wwp80jw1ibkhoqxc6qlcl1qhhenhrj80emljsuiofglks7cm4bv7u5niapngq9uplp1s1d14094wi32q0r145k4wir3p2gewvlerqh65ojs77izygt11kts1f2ondo43ehdakuhibrn0bzj5dkelds1avwxqe32qco5qo4xkvbc3b6uiwk6m081qxvde3wj3ajqe3qxeh2dlxo0hsnfh3jahvictx6pugdcax5k8ku2gl05lul1rd2vgo1cjcat215rfm6ov1dz4axszsggma97zm68lrn0v7r7jbhhl9dzkow9732kwy4jiow8v678op768jtqm291x57hglkmwsml6b3pyq1xj715b8nhiwk30yghez1ehvyslds3ekgvgc6j73hl3010zws3fbtfidv7erm1hn2sost3yban3n51nwwia94pq8vqn8qvd0ebantjiewdhed3f4grdn9bzbkhyxw68mpdngx2sdqolm4l9fvhincyrghpec0h9muxx0kan0mr5ydnleef7drzpb5hk6p21w30awpkcj7gnynj58cc09vcpe1in1o8l6ckoiruhp8sg33mfw18axtzuaitza2tgtu7utu6ujh0p4fu6zbe4p2ciqmoax2a19tzccruf37m43o85vkyrbns1tiua2mrffqbdj8c1mixo5n0vgyhuagp988rgogpnyn4qb4fo39vziybeay4ines5nqjkvwhwyuc9u3jy6oejj6udqfhx53xu3jxf4zvq5jla670ar7v72lhakll5d6i1oh4p8m2228e2ke0b85fboarwyqgfo0281m5gh0y5w3k71t44gq6q4cwkxea1n5q719e2reqruegsgg6tgmygjq4xp472ut',
                fileSchema: 'xlo8lwn9qykhousppcggccc1rapa4kcz646yb9uxf5tf5xvgf5n7mhplucnpefyw95ij2ww0z1cithvif0dcnx7r5eol47wxqhsenuaqlydvwp8g0jb8cj5eff3554wqp5tn21mofwzhk27ctjz77hy9hsavdkv4nemd0m17jf7mc84u3r3zjczz7c8iz7hv0mwaexo10co459hxcvc8aavlccmny4whqyrsdz24w0ul0q8vpma7y4qs1rsxzbuagbhrzdkqri7w4yo3pt6h4tl3c499jx186wxshc5mwo7n2560dwyauihrzrkwkms608bndlkgvidv3lwjy2ixnecendtje88e1fslbdgq3krm18j9eubmm0126ngntj7iotvreiwcw9ls5u8b8dbtw23l2wf8ksb9rh3y41xdht8vjm6t0chdd9zpvvmfw9y18nu25ci7h7j8k2t8bxowxqqzwjq5tjn9jwgd9pjbq1gzsv754nmeitxfxvpeekb2kutiwd0qdsbhiuxbjiuexgq3rg47icydxg2xx32jdglzq3nzt71u5hwo9h9zydmhvrbym6icvetjnnphem1vflekeygcnkqgw85cnm0s6js6msq7f3q7100sxbucr9rbmudd8gfiaz7p0gum930yhmx0plfkjw3z5f17au5vg9soob0g8mmg6vkbb6k20zatq0iaqqb5wv0w2srzijhwj0l9ffk2btz0x7xz8lh9axpkh0n8bzmktceryfhba8u39mo12fxudf3c5jgl6uq8cgq02b2dqawsrekpptxzqwctzv1djgeq16mvbszo9oury5loeyc7th3dz9oho4aqr7jhbh41kudefqh3vk6hzjrflmj0k8gd2tkj92hno4ees9maii5uv0i8uv9v533wgoh1rsdyfsat3xi8en2zz5qtq1ikg7u6r9tirtygoiszkkrqksctkdqy6mqg724idhhluii8ba4w7z8bzs01t5p7qafkz87ug66yullae7qt',
                proxyHost: 'q3s5xzfgjdwdtktpetkjn01c9mnkzdzf2qzkw785aaot8p1axamgxcbyzyh0',
                proxyPort: 3550456903,
                destination: 'bxk2m290qn4ohdf72w601c34ymtihnszvxx280r7rvfshyvpauqp9e3p1h6gtgqxc5ffpu42h2g832hwb676auew01f2hcyrqcqxn8rfnpbk6qtizwynxsi6z8an481xk1mh38qldsbit3ww3fdn4kmoz5a9fvgt',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'tko70xj4cvtilfbc35cxaytwrfqw3r4onq0dsrc5xem9kbj25tiqyq2sau6kylw7c122rg5nep7k1achf9mqf3llcs50q11eer5jcgzchcye3zqyq71io2m3qprs3kkk7ppc3hh3ahaxbxlepttl8gljeqmwl1bp',
                responsibleUserAccountName: '9ja9bcuvp2bg7lehq0bx',
                lastChangeUserAccount: 'xmn878b6l7790e0zt0jb',
                lastChangedAt: '2020-11-04 07:07:09',
                riInterfaceName: 'i5t5kawn7pk6ycd8utp2vc2q4g0q5kydlynsg01a1hu7eno50rum88rkex3zewihmq1n30czbr01ke2ig75dthwrjiteeee8dtb2syzdvwic10xiuk3mf8ep43c4zfzh5tkpdxlywcne0aco23tzow8vgjg5dhdf',
                riInterfaceNamespace: 's9ijewcqq5ypfzqj7zavvfy2xlz2qj2ct7i38l9bcakffd0luttoqo64nrgk7rc91ytmd51bhz9ctref2y7wt8aj88fuhbl185rpdha5kbz1folf5w31jyhixd2t4m4n6kvplncxv3khvoy8oy3eu2r47abpspqh',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'alwq99yfy7hhpyeih4dtn82m24xfx99umq1sczu1',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: '9c5i95m13bpk70lid35zs3fwk6ax81so6nm50pm5c9hp165kib',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'c5niya8fnul65bvkt7mu',
                party: 'eyt7fl1z3qc78lzpngdbh6sxmw9ln8hncfvdfu0gvte7qfmsnwviqkymqu8j4ls9p406dqv9aueukwk0cgpk6tpt4rgk2m0ixfukilq7fb9exwbusloamee5ull2h0warflyqgz00xwjar8l43iku2alm98nrrfe',
                component: 'eb0lqclwp6t4pg9vmvghcrgkcewgl8hzhiws5csto1wi63hmyvjavk9vf2ddfg5a101dqsy8kyv6q4coln6lw0sjj69vrvr6zutbv3l7dmbb3eu36qd6y0zytr3xq8qekmtjspwv9qek3oibh301ehqonvrbv444',
                name: null,
                flowHash: 'oo8st2c6uzl5sf33s9bael8iqix00iqpimaqyjll',
                flowParty: 'gh5f7r22ovjxe1ya3kj2esqp587fk7fi42w8q0si4k6eauki0opmo5o278g97tbz9nqckfkzk8nfvm33x0z61l4tcvyuzq4ei2egdxilxzm5v8ot4i8il1toa5cid7orrj6527aogv5in28pmtgm0gw5q7do29v0',
                flowReceiverParty: 'h9b02w4iajonxn7fr1t2zoyqe3t0wviodkod7vrguadpsn1fptl2l01ilj3tfoquz8v89rcfz68eb620wn0h0ku3r55khvhqgewu8zu8ln1v40zarxpo3866l81neyg9r19orbx5y6k85zgpbixug6yhyyjrl2v3',
                flowComponent: 'iirlbdubxebawz3uwr8cejqrllg5v7097y77rgu8azgf61jlo0v8jxuu2jwq7ahjoj2dxzsy1423uwwbml85qm1f6o93kjws7xlkahidq215wlx04bgxmts531welxsp38lmfgbgixhfno1nkzz4w3w9uz7pknhi',
                flowReceiverComponent: '265w1extsc2w3mgbiexzljy9smzfg8f597vhutwwwgspb6v5b569x0tf37oa60u41yjdxjf5rsca6m3yo83nodnrw36zh6le31quzm4bmjuauhzced01ba154i2dlc3r73cjk5p61wa6pauls5d6cfqxvenqf1it',
                flowInterfaceName: 'o3mbrni75fzdrsuhe038la3fh4v6rull2vntp4z8gdastb3huck9a2wwjlzrzgzb9u6yh9bhfkyoj8f015zc8pxjprxf281qrqbktkrt5dmaevhwessmkakdzy14mfzs2si3bexyy2mahvwk3rkjhpjm8dw498mw',
                flowInterfaceNamespace: 'tznwni182doiqjirr2nx6z15t4z3e6aiojkkfp3ihcup2zpu88i92cv6i60dszckl9683l4qxa6d3h05dpeb1c8q9rnh6vffc1jctaon2u3exeuui88ofr2fkb1zi2s31u9n9g8n6g10qi1ftqdbrwigkpb04hsj',
                version: 'mfdoq52tys9ixtcob545',
                adapterType: '4i1xc28nxzbfs13meemx711no14unoko5oapdd9c6q03qslt6z74on5t55mt',
                direction: 'SENDER',
                transportProtocol: 'lfhjlaqf2ehcrskqildy69azi1e180iqj8hkww08ktau9308vqyveharxdyz',
                messageProtocol: '6g6xyb0pbehv42z3hz6jo9fpa14pxjguv69yp5jusu8wfdu7v60t3zyfaac8',
                adapterEngineName: 't17qy1v3yv1hb50zb6xk7ilbzb8sc9ag8c3oz9bkcr8o4u923zow29ntnjl5mix2itovijafqzbmvrga1h94m41yyesfsddg99pj6x9bud69jc27at6eds3uoq1qvgc925puxoefegwy924zwl8m971pg5fvhp2a',
                url: 'nzgmigudm3rlq64mz1zfzey5jn88je84ymnkzg3cbv93tugynf2h5h21rsebckncqhprgrbhnkv5c3vyqtgljoodimbjwn0dfagrbgzqa9ch6c86666kmhde5ieykpwnx4ssy8s48xi8rcwweo88l85w97jztwxy46ry8t7nfeez6tnr4jgp59pm03ngaxva8e2e41nnie14corgpcizqblipirqv428skqj5pffus9a6hnrf5wgmq8xvax6zgktsjey0m1hu5kvfvwrp4o5l5x5ldkmzva0lg1hu330bebjxbh7entp7t169zkre2al',
                username: 'culztb1hadvl3rsggnw1qxmbn4n236eaw6uofnl0g6up3smxh5xnmh0fyn12',
                remoteHost: 'iogkv1vc0kcc9qqim4ewy22jx9vl1jab7zqv144a63xtszv77kehs6j8bd23yhb9mqmi4h37tce7p3iyjwjony0y6pn8gvbqz9xqsej7t2o9beodg9bjk5mj48cqwio4he7d3nfmo1mm9739jff12f84ldfd6ymy',
                remotePort: 8055262698,
                directory: '161grmrm1yn8upmlp6nm31emlriv06rbuqg7zqlsdxudbot3hk3198vcd9a1r3stqztaqx0jy6hqluvtcx8c75ovoab8tpjhk7aedqe67ptk3srzoma72uiqnz7jh4i5sv5ue8cbkd17d5qrwfx5qr0f8ycdi37a55lb3cp119gnegnitzftko50m3c4pc0xdjuf1m89pu6qei19s6b8718e56l8fsk7xy99cgjrpoqkacga9g7gbvjfm9hm0e5dqmp990o919ut2mclbro1x5awcvjenow9lzkr550znvlrmzv1nnea408mhr36nyz9xce9pczebg8z8142bnxuzrfl7u6ufejsrua8aks2e75mr71vmmq4sv4t0c5gjwbunzchqs52zooy752aa0wd07n04izimxmo9bb8ckh6bbbtemc6p6a146j00febnjsxp9pzwiu96tdurqo2ii250dbrknipayyoqouwz23tmbsh0oq1gbkfzyvmkejo0f2o37m15pvlyaww7wdgwtoev9dlz7qcdx2iozbu7vetjtfa5rygy73kxu0uts1wt1hqea68r65bioj372tvk9w0nxq2k00700d7m6vagpgegicjkoijipjmc2vknadtxzugzr6wnzgmubxj4xbmhq1ko5ws44dap3dg3sgipf2uufmqx5v9n1nm6wrscnqbhh10egodlar3p251oysgxijvpsxbpbybm0obhpqok9uhz3mim41b34gsx9gqmgpnho9rsgz2mj4ackyo9cr1kg84gu1t1j4w0l50m6zx0s8e0fnrgcv80rb9v87f995bstftyajewu29np8vjcq5uy3q20meqidnbthdh8scd9ri621oxscyjgbgwrsect0jfbvsca7boayvim6e8ky5gptzrc8t0apwie23ka8eiz77z5fl13jxoyxv2q4a5vwttiegmqqgcccsta9o1rwq4v9t654puz2ytfd3lx4xj10iq8fcv2yjwk1ktw3mw9cm19jr',
                fileSchema: '789zcchhyrvaue3aqev9lsmf4qprq6mn4jfovbgi7nps2yetxkyb2qmwdp5xd7i9uf15yjzigq9pp1lcdxuboe5km75jgw6hh3kmuapd1edugu5mnnlb8bk25hlg0m5q1w0gb30oa6aeb8fgwqx2qznvvquzi15eb7rukx0snfxzzl6icj8aaxjpev1jjp9qfk41ut4rpywa3yvdqbz3ypmbfi1jp0fs7nwr1jtlxk2ajqgs2o7nempinlreh2gf55iq7qo377yxwp79awtba9pe16jtlpaqkwxpdurbqfqm91epoiuzfwjus2bddmyh7rjgeo62ewiporiqver6y9smrdinlt770f04pm4n9qvnwlvk8r8wjkz8ff3umh44sydfcdmj34rxb3u3m6jm8jrhpmlwcd7w6jxg1no1p6suxpiy74qe7jleg3b3xqe74pdcrnvpg1lui1b0r05xr4r6vb0082zho6kcn0v0hmktfgbvfxwp3rnez8xxm7dyahw0b4e0irqzs5ab3qoiftxcloar4p97npl0dssu7gv4fojm0k0pjxbst31wgbfzzibcmz9vnbfz1x20se3wwj3gm9ukfs9kk1w5y73qhn7ruxuefon1riznv2q0mhahqgmfr9v86g93a9br1qj32ryqh796xw4l7v48hp3y63px9312psh3u5tpzk11fl7024ieuumwhwvf2xueulrw7ciz3tc4wn5czy1x29vo9ayjc9l9lpc7zlj2kkaft46zbboxvc94jq8o517aklq8xil62u1pc1l3l4zr26csm1jhlinm51emivimcez57a57bbomadamio1llk5j73050hglwsc1r62gk94znya1rf3kb13ifhsx3qf7b8plhxjlya05uzen6rjl1p20rfjlnxavm0yh0ltsrterzb4rdtstwi7msp5qlbw81i7qzzetmh8439wkbttdn401tftkrlvhkonhpqw8rbykbaefg2cx7m6w932pvi81e7jtge7p',
                proxyHost: 'qf87mu5tzh5g8k0y22puy3sn1u7tj15351ldj82lf76e4iytdgifmj42tml4',
                proxyPort: 4263170508,
                destination: 'p64b4q8hb36uubibbsio0dy2xn5565oi2cstd4w3q96qeywx4l4m33qsunz10xzl5uxj60p7yd818ikdkbx1l5b0ksno7vjc9sku31at7w4dcwxubdmg9v3nowzoix6ef4ffmnnr0i1advdk8uyo08rc3alqg7of',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'j4m9tlmz9hb22sue3zy1n2pjpqq9lm8a10enz296ddcmmhtqftxhuxf6k65r97gy9mfg1s9rk9hmq6n8brbkptdqk4w0cqxks0f110iqwe4f297tvl233i0h953ft8kfomtx54hrsbu1nn66tnz8m2x93yhc8wl5',
                responsibleUserAccountName: 'ylpf1bcqlovkhdw6m8jp',
                lastChangeUserAccount: '6vczs10427noy44be09i',
                lastChangedAt: '2020-11-04 17:30:20',
                riInterfaceName: 'trkpr5023z37yewfvg5h4viz4v5t8a4cxfs53a6ac46haljdr932bd3xdyodxzwhe7udr8rh40tsrr1401xhj3cwlld0u2ssbwm6ujh71ix7jayzksiko5w8sah8ffzm56xt37z1sijvw2hpu1k8ylatjgqi3w4i',
                riInterfaceNamespace: 'dygo5ibftnk7bnk6b12h16x43sazvch8plk2sfg1qh3rj83czvu599om3d0pnocmjajedsx0elt3xpy6q8ob24ufcaswbjzjlmbbz15vfcsdsa2glo4yg3ya51tn3dwohusmz3k9n4rwib06u80vv1m6cludltbc',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'ft920jdkwcnma13p0p167jvnvwb4wgfw3biltzm7',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'rgo252l8zjekbxx5zmiqlvm5maeuwz4tuqxyr4mrf92cgxa4zx',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'gj76rcirheu4ivpziycm',
                party: '8uspkb81zl09hrnzrwqrih3peyi2h1gxp1anf2e78h10alyysehv6lzp5z4r7xodv8hrr4pkr34yegf2e3lyrv6fpnu6hg1mik1lea65z5un3p7og4307ydmjndzlzv38g2v2t43dkc4k9pkjb1jmw72jty8a29k',
                component: 'l2wa3vro1o02vscq6x2szdltdpa1xekef0xcegjzp5rmu1faxgvfj4fzy1p1v8b3j6wv6ldhsvnpc2q361sa8me3atjdl1gjj5ww2uw2nno4xr6o9zycqy4exsgstncpg1niylnnr6j7npn2cwu0bauilh9j1b58',
                
                flowHash: 'oaycs9gdvo2qscf904esdwtvn4x9ao5ijrrsebv5',
                flowParty: 'l0iwtevb8tgotoqrkvlqh83oyjkjspcpc8ual3omwzf3f9gjxhns61x5fz50wnzxzkzbwp9dczq5gb8p2bnhnyo1dkpvv76gri0b2nqd158v8016k8aj7w5zaxr8byk9nhcabxs8atqeqni0wc2mow97wlef3419',
                flowReceiverParty: 'nav7kswsxe2exf5rcl54zt2f1h70i9u0m2ko0ocx0b1zh53xu4l6js6knyf9m0ez7t1wgpb5r5i7toqxoiiakdk6ta1x2xqho23qcogg0llpra0ey9owegakdpyg7wfgyd2qh7u0iu01i1vgk3nklhd6to6nq1md',
                flowComponent: 'ryellympdxx4r6zxjg5dno1wmn6eqshxx8z5mb68g66um21ou0040zq71idmxbk1n2f8qhqtnzwoccchev2j5wzfoa1jg6vny9hja2hy7bizpag26aqyvqnq5axo7qbvjp064akyrxn0pt7egk1cbk4s78ypgy0f',
                flowReceiverComponent: 'ygzg0bdza4fzievwge2ty10zrbdey8jalj9rsjtyzljyg4bf6qw0j9nz3lqpbauovj5g6vl174i410ceykdsoql98dg0u4kzre3it8uorx3429ffurcw6vg768uqurqrn4ufq8id33zqenjiln44xdfv6u5feoaz',
                flowInterfaceName: 'vz5kdyll6suxphfyuk6j6c8bs9n2h3wbbp613u576zg00124x0arvntztnrxq6k4mhbnb5ojtcfgqbhh3y41d2ek2koe15vituzr67nx3vapwxkmox4e35qrmjerjyo1luqhtiaqsdkrxnrs7vgasm9nxhxkg0k2',
                flowInterfaceNamespace: 'mcgxp4x2ps78u4mu1vv0c1fl169x66khczym9p9rxzxavhoc9t8dho76ie5sg8ehn0v9qjbsna1s0xq8xu74l14gz6c6ef9qzypldhw6oqhfcdd5spnwqz6str3y78dge9m1atmkakgd272fqzop4bu6e2s9t6cl',
                version: 'tobx80pcrniqmed19y32',
                adapterType: 'ykf069qbelkdvdvys46uztuxjve85m1cg780vr1gv72jy5ljea0vy410i6mc',
                direction: 'RECEIVER',
                transportProtocol: '9yc6g5jb0t1a09gffz4zwslh8pxju9z89ubnyiwilx82p5y0634bnh43izyn',
                messageProtocol: 'vw77ehfulg8gy8cmn3qx76j386wfkdn3ihs59z8trh17rx7oghfewp2vu5ah',
                adapterEngineName: 'r1j7g9s6ivvdkfi061r242he52uksgq0hfisvny32j7ldo9b1kzajcdbgn09o5hx7fhbe04kv9giufw9kw90r11noaltrv4se5cskdmgu89mp0xynay1ypvf0vmu5s65hk7718uja6ywnhyf4m3279gl8jwillxi',
                url: '5yifn5d4al280ipickrx5f2ev0dwbxqq00xunuilp3cxf5af1dbhklu0b5sa7m5eckpm351rhiq8u8zx94fvmvz0pgb7t2okuvhq10dmd434cs7yhbxdj35rkzly8rjl76unu8co4nf7532dif8mo7z8lp9mjid5eowjkzxp8tgcwso98zpin3ama6mmfv5si0x7vq9k5zuh072hh5qscuvohu0cotwsq9tqted34wuw2npkskch3wwz7q70i5l6wx1sd8prwi40v6xsvaq84ezyg0keo6s49l44xj9o33psvbybte710oy6vrkbvtg5',
                username: 'i37p1ku42316ey73cxc8q4wd2q53ydrcq5h1jccoaysfy52hpmf3adhumdpn',
                remoteHost: 'nr4fb06nt9egqchwq921ubgdr3dila4lpyreblkzi84vqwfqjghbx17wv9celiwu8wj4dolvqwfb58x6dnuc2khwbja1qhih4ku19w1gm6hmf89hx0hnesjd31mvju7xn6wyvuic3rcjzl47m4yfi9d6esgbk5jp',
                remotePort: 8479550701,
                directory: 'qykcircx78pc2l6ii3yh21m27pk8xztknoihj1ubrv5vtlbbjqfp8ydkca489vkk796turilbx7290l3ebdb674jdnon8bxjeqrtsor2ad0cogj0xq0yvdj1ecgdqblgsysckhad1c4dr3vg4kjkiha0wewoec4wg61f29a971pw9knrxrymt9axdm90n4hgm2drkklarzt40151947kf8avgd4csmukb7szranr8wslinhfjomaiz8u29516bzukibqwcixf23wwkhg8lze3j4z62jqvsicmtgznv0no9eps169r8veo623garf2oe709wikk7sj4dwq4s43bjejdamy4kl9w1pb0onomcnunpiurhebj1hetn7muenwg4s1j01s4szr6lluvkl4pg4o0a09jnxlcpoyt9350u8orez4lorqzljw76w0df8h6yypcnpi3ur0sxk05it67a3ox0ftlyp8iw8st4tf4q362gqn0gdibm8oxweiezk0myqo7fdd4c051b85irdg66z8eh0y8f3vr7ca4wbjghnaqhsqoi8zxcktfdwarr1ymququ9zh4nc75k2yl7m2epataxz86kgtkvh8ehev6kdgyi92d20nq1bfjfgf4rq7m4e4hyqlgoti9bflihi6u08bvpdtmy48c3dgukq8h20las5jrac8dsjn58pqa4459wajb4pb2jvkk7efs9ozta7iyllaiiph2ru1j9ahc3wcqh2o1yyfhh2lc0gvqfcrpsltgmsmt36n4nu1wsewn9g14pciy35xsqn65mvj3o0cf1x4s74t0vwr2yna3zgiytxlsgy5lfg9ntjijy5ic8hq7i81phkme2lbxxvapnzu97fn16cngsxhmevinud7au4lbhqrwnml3f586hnzqwlil42mjalt5gb23agksy21jip0eq48zxp61inyv7kmuu2sqtvgobrbrqcykj9xz866hz9k8ym8glgfzaovoxil3utj07ieys3n3vfuz3oqyeo',
                fileSchema: 'aq7mui49k53hy9lrke0hf9mdy69xy2368wax634lqwcyvop3k9jkja94kxuoryncamn4lc3njng6jt59u9yphpkjgev1dazf779x43vm0bwjufclvuzgapzlqkivp61z7osmeiwv8shjuyul8o52uc1ss8ip0luf830yfb9neq3407laj6clhr40dnwd8qcwlqu4vyf6aze5f5avl5pu5ac1ikllbsxe6ywjplycsrhbn46cfitp0gyl54dfe8c33gjpiolw1n3jqe3sj82kj2fy8qm7iqe85sekojnlyco3z1xkqt9inmvhygst8w5ashvb3yqqern096xlf8n08tckwfk7x5yold33zdpr87irgsfv5nzlqwyphubqya87tfc9cd448zp2mrbtfn59qa5hjnow8htmw9mwspvn48bv2w5s9ghm7ltfymf72nnaxfa6imz5pkhrqhr8vcicnpo1646w4lszpiax2km5zcv95800if8kmjy0xp9uyxftvx1d0rzx55py2rqjc64xlcchrr2nf5kulni9x6b9680cd5tddl0vonfttoez7uwppe3crg3atbsivkxoy77ex22gckeiodzl5n6ty3qsr9mbx6jdeax6bbnr0jx502ca309ihgionibclr57kyms3wv1j8tt4lnku2dvuw0ol5ee8sr2dew4ahr207ej9owpscjhp2qel2p2j2dx6a4psqtliawhmbvp2dv2lmm9vekbf88i4edjeqn7grgxkl5g46wswoj3vpwzwc8262y5iajm5jtnmu03uc8eg1faaaf0xyhhinoe6p75xg8mpckp91no0alohbl9gev950xb75qam8dhsan3r1wz85f3co0pdk6grqqrg5t0v56xnu19cpuhi0nzfae4l9s6pcojnugt0ufmc4tb68lxxg6l5ku6t23snzw7vl250z57tykgnwbywcbcw5cp1dvfent0ex02bzlyn6c0h09amib454zw4gq3mmz2t6vapggw0y56',
                proxyHost: 'mdf30nsvwvuks4z9x106dum0279q7da0lfop9kwds0z0z4eayoyr1138glby',
                proxyPort: 9287166446,
                destination: 'xkwaxdrsp9xfdqe5f1nuccfwtc3ca4fq6ikm5ndcslhxe4uz4357bw67mq9bp82bntv1wj6fszzj2tlbynmaxax23fbatab1nt9r03koukh3aujfitne9r2zzq4y0wfyom49q0f0gxdgk7jmo5hmkc1a8f55dt8o',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ydg0czfbr2y0fyp3058w7bar8rozf2dcpjy43rza4gqwpjd8qxmliuhy2npnv832xo5kg0dyjxg1ds1a89dflwo4s7ol2scvr9oz2ipgxbvsni31vmz6qsymg9x95ixd0d9bcpu45tnpa9aqb3gu6vpkpnduxxb9',
                responsibleUserAccountName: '60ecmlulfkbh7eg8ufk4',
                lastChangeUserAccount: '5vmpq6ja5d5zkrpk213w',
                lastChangedAt: '2020-11-04 09:19:18',
                riInterfaceName: 'n7yhbh32jli3mbt7ruzoisncm29yptjx454a9pld7czdg3fnq5tdxwn2anjgd3ymv0gwiph4tpqst06lje2ksg65gc2vy4qjhzzwvly2nfqh1h17c8dxdwe99skoqf6k4jbht1kurdg4ehtf7uyrtslkpeq1vq6x',
                riInterfaceNamespace: 'xeyifsm56os26gxxd1nteffu3fg0q6v714leof1z06ohgnuh18zia6x8rt508a6wfk687xw20trpqzt1vb2x89meay4gdh4e3v26if5bk08x7zo33a79b45cyn362qz0ayk1paxtvh10sn9cuhrx85uwak1cstb8',
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
            .send({
                id: 'iiztl1pkd2npei8vyr3zx8s54c3h5mdkohlq8',
                hash: 'zptpkadf9zemikbsxwq8zqo0v6ps4z8rlmt72zol',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: '9297wx2ndgp3fm6eul4unr90hwqctkv6viio4qm5pgiehnub1x',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: '0ou2lbg9rioffdy81lwg',
                party: '8975snhwgoekpyemrlpfhlukpdukr67he7t5j5g6v7i5fi9slh3xp02d0jslew1og2eeaesq2v7sxbz3w85ls0d5u3578rj53l36h7boea9t0rdon0mbnbterc4jigw4a1scqjuuzmmxqkovpppez9wmt89no5ql',
                component: '6qn6igz5egt322um7dxxwk6vx95ye87q3s6h9n64p572ay2ajq2s0uvx9h93lxnxi8oja6qcyoj00u4v4zgu7sqtwp854l7qm01xt8t0zgku7va95dk7n5o7tatqhg4almnra6uia6voft3bzbfugcels50a8h6v',
                name: '9dfn3bvuai53pm1osm1kwj5ayfgn9b2pvghrjt628y2iphd0na93y5e0p5cwoe0w1t4t7byyuyxxuya6rwd2h6dw7wucceuckh8b47yk4jwqfr4a1acm9e42wi68jzyzjx4515azh1fkw4ltfet65qjemn0ks9ra',
                flowHash: 'vffghocvlqafgswtlu1emn5vsh535xddwl0234ts',
                flowParty: 'l1htk5r4wt4dsiy7da56cq38dkz0r8pzmwabjikb75lxf03evp9uu2865qbjb6c3v2ekmkrrdvfsthli2sh4olqx6eqfsao6mijx031mhplm5s2513su89xy4ps6e9w89s3diureucz9boylron8hzoccsjxtknu',
                flowReceiverParty: 'wzymabojjsh75vsn95l66rb8fzvs8e7w844r0r1m4c248nk91ut6k4useedc8htbapw8ogwx7fdn10huaw6h0bsvjvmeelyht3kvm0hp2hzu5ybf0riwi89y2ev0d6x7gcxon6chb4znlk12co4w4i1y5g9k4eds',
                flowComponent: 'sock4ifgn5572ms0v9vgqqtp12e85qx8u987hcv245dnq54dmpkkhtzesrb3uh0811ufob8hfli7sjnf1ulb9ofvhkg7h8iw5rfhe8eow4y1lx61cjixdtx5lbrffmokel01yl25x76oq44omu2j3zn4vjd4xwwl',
                flowReceiverComponent: 'cb6mha4yzy5znlclr5jslpuwizm4urpbfer1fqy6b4jxwzs5osfgwntm7hll7krxwrqe48lqwpmcz3i7i8tlpq7f3l8gfotouqd4fux9bbyelap279c7jre353hkgyw9su6je15h95nzmzki8b15x2qrxu4kzbkg',
                flowInterfaceName: 'dvs2uw46untjz83549r6j0i9bwk3qza6to6hzhbtgvf539eu4mo92gwa4299yom00xsdpmgv3wwbxtwoo5mjolqkjgn2q2nmeconglfjevk5ar5ml64hy6c1ql151i4gvu8zxvg5v2ang88l0n6qgv3x9qw5f5bf',
                flowInterfaceNamespace: '9degop2iyboytkex27jgvqqxga6vmzfi1p2qm3xy3xloty0j7iuj5agt166hkwgy83m3a0tqw903svhluu6plck98uoxuhqlm5j0xan5ru9wlv80jhhjzi52frtrccs2dbb3sqjj80q5b2na9nmeghmnz6ramr50',
                version: '8yyf6sfroayayoszpgcp',
                adapterType: '90v93wdu0jhhodobhzmeph88xvccv1a3zcbifgu8utj7y0k0mi6evslszgv7',
                direction: 'SENDER',
                transportProtocol: '0f2vqigbnfkoung8husi4v9h3tjp1b327lyk397yvjddj39fvrv58vo4qnl7',
                messageProtocol: 'v4uspsbczl9e9xceift8tlotfocagyzl1x2kbor90i8bfwfkwvwkq0g0farl',
                adapterEngineName: 'r2uj06kzjthjxj5p9xjzykgr5olzwvgpg2stz0lhd4mm9bb8gcg4pi0u1ch2g3q6yky5p2fk5gfbtoswua2czdhpc81lskzrnj3getqccw6it8jtnezpaazl5xxjbhqr3jq955xqoa4655f82itgo5sr3cg105e6',
                url: '1hcx91oxc7bxfvm5d60mh00o2n3fwlb2tf8zli1wdlivzs0k0ygkvut7bvhyqa1uixnexrfa5a959lf4w0eoqjzqg8dtg3xilpbu6ycnw6jxq8q0d8i2p92d5az7nwd9ysrmesx8dhigfuftup3w7n50epktnc8xblrcmcpsv48c8lqfv3gmlvxexyu9krisd6hvvwtpflm8tb8dyeqqcoh1a4ug9fphc59u9ey5glmektz19dq9fmtuq6td77jxs1lnlginxlrsbx8h43nk5525run07sxpm3r8jqc85lz233zweayyat9ix1fsg7lh',
                username: 'pukwferxnr2qu674wk9dc6dcmhhkk4irpwsv1b7hixf55ddtpwg8ypgjybop',
                remoteHost: 'q3ntp6jp8wtji774rqznafoxqj1fuh030qxlclwt1fd5wp0dsqhzi5r4gn4ejojnv7w6zlef9cb4vwf9w5242fk4aaqws68t3lje34zgqrjtlby9iuhxmujafkyjik5hrd112nz3wijxqcu12aiaybtxc80s4maw',
                remotePort: 5148310891,
                directory: 'druwu9c2aete811vswwu5i7o3ormttkzrvjybqjh4miyedvpgmx5vbkh12e3t4dx7tv61v9846lz1aadyqs7f0jhlkb8yjay0hkn4xo0o75xjjmgdqywuzy9wgy3ln0b9fkkw665egekzy9li31zki8uqy1uj75kywpkcv3vnp5zb6se7zosfogr4r69dkgqngcl17v3v2otfx6a0z1gz4w8vmdxi9iccc2uk8sd4jtbzjnc9bj2kibhdaf1fl3gnsf2vcyzoghnkrmlse382e51i8pc6h9nyyhk8e0ugn5vnrgvmui2afpbofrk7a3oc0z3evi1tskdowe84mcnmhi4osoz9kqgznpytdpyvk6twb7r3s14rxuhy0omt34xlcbuw8hcxycg68fkjfxbsgmq93iem0lvx8fcod4rfa2q3q31xb3sa7lyzuacg79eb8030zf6rtxi2d2rostkas881yxs3xf4y41srcjlcxwfgxqz88727w3pq68griea3p57ne4221ka5nat7tb6g26d1xjc0rtxnfesxpdv5ni6nc2tk69zuupte234aeh37bx0mpt9t4aardd4sscwt14c3p6a7z745d35xm1rewfze5ofucv8h1c32loopfphh3oehj4dzb6xea0ytbged2vmrv2qnb5gqvsgpz6d9pomndjb7rs8x6mro5ji7bxqajoljhegf2gjtc42rvhdw0mzf10i037kefm112gxldcbsik7bbiw6x5df1uze7w58yet39678gx0g9eh2897ieugdotq34ug8oow9nuztunuxhez25v811gfkxpsc1ts7wqfg99xp3mckd0ksnqk99kvs1mhglejqb3a6qsqyniu180dxm32vbyryqr4fu7rerg1eqmhckipehkp1q66epuuldp2do1lfxmxaqsqoefw3amuvqnb4c3spsf94yuxwx69xhww0ou7y3fm0dwxhh0pqdiyv7havszchzujnb4ce5vjg1luq7ywl9363mpw',
                fileSchema: 'qy2s85z1im59cjjk8z7k15jrdpt1lsxk02x0qv5mt4mekz9w3b9v1m5l3mvi3kvbeq9v9zpderlmrg9b1069d0n5q56r4w9ioxr7kjj7p8k9wooqua43w890rnoe3wqwz7mhpja6xiqduodqvagdkx8z9nc2cmpf2lsfoyondmxkao05iftwmv2xfb6vytkvsospmej8ou12du2g2cz3fbfqimoxpjppzrca1tvg44wyf51nknrg19dxlddj1h8lhurjpd8dusxud9a69bl6vhjg6l4e3679affvcn174a3lzchhrdsnc4x9h86dzaxm5yjwd7no64vjwf63qest1t4xlx9x9yg5ybpi9t3iqukyswm0wxsi9nnh5vxyywhgzs85kyhb70m0wg1kx0nxqc7hrxxykk63mlie8gajq1uj08n3ly15afq96trjyjtb07auiha9a9u5apzf76gzehqhw64oqvvll8e82k3h990mqbhiuyiq7evr9n0psoqtdvl6zog8vvymo1klsfjpmgkcqa3yhty9d9mkeidori3jz4mvc6rgsogo5754formipe4jlyfjeno83l9un9lbt9hjk2s54eq8ig6crp8y7mx7pzekejo6z7ki0injhgbwkwqqt35dxtniv3adp3trhu7rsr7b6zkawfkgrtymwi8bia7lnfelbg4yizuv9g89hpkxzms710synb2nnyumzres2a3niwv1sujwotpbddid7vbc0yj0anactk3odo12fjl3m4vlv74wlfd6lxurl2636nwm6tkhsnpd55xob4e2zdanq1yf4fn1gr5r9g5hacuz86dm1doc2h9s6eoh3hf95k6smky2j5u1qructat00ndb2srep86siuf17sv8tpgv22p6w6f15qxio3lf6664r7ikax9zhms7moz3v0vqcahb42ulwsa449kx26oo72v2xm1hv39i59g3c68000y71ja636prbu9fjhne8zy38cq19rdo0los3sgcsa5',
                proxyHost: '3h9i9e99cutj2zb38dg8ai4epk95ko0ddpzj9i7eif1wih62jb7u0tty2fsl',
                proxyPort: 1835036025,
                destination: '06nbn4xjuinoxljqrfch735nh234glh8wxk5mdqkf44k5o03th6arzczsbuxmung2i86dywjh1ju8hviwtcbozhqb6l8tvoycthih6k9kdc6859dvxcnylam47msom1c23wa5vsogngekhe763842w874ajil0ql',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'a63nqoutdi3bry4e9a8gtusozh6vff8gg4osjc1evab32ahq5ffajybi7r21qezfahx3yl3n9okog4dj3vicbyogbbp2xmn4nll81uf0opm73puweigxq1uh3gqr99uch84q7fay2hn1sw6vgxynmb2v8wgh6yo9',
                responsibleUserAccountName: '7gasyhsxa3nxee6gj65f',
                lastChangeUserAccount: 'm40e06lawi5izf9x6x9o',
                lastChangedAt: '2020-11-04 12:12:40',
                riInterfaceName: '9kypxtgqoa60bo41mikm0mhz8n0vzus9qm6laktg0awd69ykb5flteui5tbyij7bcpdwksy0egaldvrirz6sa9240cnxnoxoq90gqo1242slo50e80jbgf6dbfr126ta0x31lp6r9bpm7wpykaroxmy3pvdu95a2',
                riInterfaceNamespace: 'x9vjgwufwi4yftasrstmjtfzdhtmobtc6i5ot2j8r4693vqoi2wi8x5gf1bp0bp13lbwx4b8vm17tk9c65youadh7gwm2kws6hxf2dhk9prg8o3mrvycvd17hyyrcml1z0e8po503a0noe3its8y22vfwpy62unu',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'xr0womiey8x3gesnz4nsmfccq46btih0oiiryktoc',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'xuosso6gd1mh4ci0i21qbt3xo0kbfig40xik8axr3m5qi8udfv',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: '4zpiftie2mf7iplgb7uy',
                party: '8wm0up18ucz81w2qmketqwbzy3oofzqoicscatrt5ugtv3ebcmt7qkupkdrmr5gipu0hl6lilzvjsek5rdas73jo1t7wgdfkn61da3wqznrf2uibhztw47m2esqysnl3bq4pig6i3kahqqzg5ysit89jjbvrp58c',
                component: 'bnviqzi0t0vo3thrj2bxskusfuwle0xlo3nlc90pe4g7drcvw6k2xj8olnyx3ix4rwwr5k2b61821cnbmxzyodxkzdkcbyzhiv1g0ulhkv7wsur16xyx7ze5lpsqesevwwb2oznfl3fsc6tp3rclebts60257ier',
                name: 'einlynogeecq6llqvwmt48nwr7flck88076ktgbvu5ij23nhy0h4ltof0wdz2tvko5nimu223e7yke42pbef38js2sdq2m9xcgty0jkkw9wnlheantg8yzecqgvea3njsfsz37czshs6ntfkdpsx4resd84bkw4y',
                flowHash: '85t5t1plpxgrg6cc9pr0ainbxwv6m29elvh6907r',
                flowParty: '3g2umnjhanoa4vluo861x1lo1e8j6la4wvlkp9gfzsz1n9i4fkxiylwmthtnavbmds19fn9e2ixob12313zfmpi4l2wbep4tgwvykpjcsvo3r7y6eom5ndjs8l7g9hxvoy6ku7otstb3mu69niq3ov5smzjyd180',
                flowReceiverParty: '2x7ckpyr6iho5jv7ujeb97l1st1rpleqbqx7w8j3x9k27us37meiin5hd7dhuijkx3l5wlahvql84d2mipsayuzionm4ct8gzz4xpoke766hkplycmn9vc72blqbrov6foauy8be3qnk1jyqbr6kzptx1w5wg5xr',
                flowComponent: 'z26i866qc7mda2lbkyabrstwjz010ecrqwlagrcvho1bzt0kx12hiyw2ox2s5b8zd63x4yddnpri1lyk8rghw5zvmm0p66ab3jhy0s5dsr2apsh2uy8dctxgigelr5geih5xgjkmreryxcf1dv126uzsqz0dusv0',
                flowReceiverComponent: 'oz030osim5o33e337fsh6m8cs74x99d0iu9b47qw3xi7ggusa60nq469f8qowba8k6j90bheaovi0lvxl0wotfmms41398oqhki66zax7y11w6fw8em6bd7ol7qaop0k04akk1yil4j95tpsvgj0sh3kvhqj4fn3',
                flowInterfaceName: '4ogimcx2qi9cgk01svm0qy68nu7zgvnjm8hlog2cqejlll8vtfiq5a46kskaxn5n4vmfrrm4us8w2f4r25tlifql1t24nhyuphx3tio4l50zt6hbiftewryjxk71ecfb27wm5ttxtijfirx91lug9q8zbyou3pzr',
                flowInterfaceNamespace: '4n7q6hu7x4l16qr2xybjjaqpevgxdsmg7coaoaroe6f1y153u9g1p37nnflzhwtdzrl1rihmfhgmmmaust41di50ukkej6yz4wu9lb5jq12ysbslthnh7rfczgkodyplogwd5c6e1114gia86zxbf644sj1l6bv6',
                version: 'iwqety91g4g7bhot3929',
                adapterType: 'j7vot5fbyorjx6jgkt54j0qrapndbxa68xwhj7nvg5rqmopo0xlrltmpjg5h',
                direction: 'RECEIVER',
                transportProtocol: 'cyri13kp9xb11f3el4a89as30p6pnrn5y3qy2p71ksjlgzwvqewub62a4qd3',
                messageProtocol: 'vu3nfavjf5jg5m3e858ea58arlfs2fj8jwegpyy5r4li1o1db9w42kt986d7',
                adapterEngineName: 'lt2vpgxwvryrti3t87rkyxuvvrpqgzj27t80fo55ecr4gzmjrxwzs53sx706y2wtog90ulz6frfwva62jorjsdefq7y2ggc2lh75vvxnug4vpgv1xwwkos0t5fs3s2dr4yhluwfq4ns4vgz9j026efrtwhgdl4iy',
                url: 'r2f7r195hgczo54uu3alqbicxximzhz2x0nqgonsc2es0jdzenwsu2vvzpc813ihi9yq154vzvc2iq9wxwhgyxtnuixp4roiccb3wtbq65798n2bkqn5mkgq14929mat2hlii1stnfqmmxkgqb8pe8erpeez9yb6ke80d8174rhidg2t2ucy4szpqll1pbu08mc1rgerqupd120b33ga940tvzrit4wgxh1zdzvjcmrir7mryvcz0yzgvj4zo2as7sdmcfdg19n33igrhuhipaav3xaklh8p0orodca0yhier1c1q62gbx3r0dxl1ope',
                username: '2h2lmb8luk5ivpu33e61wzo98g88v2r1msrblae4i8clkpgqfa2wy7kpt2be',
                remoteHost: 'nzk9ajiepe8kt6mbop9tzrt5l510aae1qyaxq37caby7jew1149qwg6opvd12nipjpwjusgvfelzpcrcudq497xtbvib8u93xo4atog43v8kk7zmnqidtzvjfu1baqr7984yri4udeb9gwc2g55g02a5cwboco67',
                remotePort: 4340467610,
                directory: 'eoesvpj699zclmm3p7q5ckb7b122e4t274ok0rap0n98a0xvpnr0qfsb0i6p7kcs9zhjg0cgtwt0olf6739diwruw8nk2v9xcyrkyc7625azxpolnerurdegcaokg8awwarkowon331l31zwca5g628iwilixx0bugxxmigph2j6c9i83d5t2umbkmjqz5bh2astg64t36or0t3x4olf0n18j02r4i4rv9d2mlbe8zsoq8xm6ixjrmcjdzqfzw3ufg2yz7e33s72rvglo3t0zs08nibuv4s40wny71hnm5xm6m0gzqnxkr5kbrforgt21ierp3e2t00g5c468egu7i59vqdrgmp7n67nuc65yutac8wsklrsgq6ue7bqtbdagm35ukd8lm2lvszivdza8wd4mnhm6tqtq2c77ydvkzj38oo5bkazu3usg88wgzcodojhg81nsglv4nrvq78ed65zjzizx5pkj9tumzllhai84fs96coxsgucz0nywqu8m1bs4alwq0hrb3gq5mj9d0fbyg1w9p8ypjium3zhw3ldya2hklxe8k29xlf2vlp4xshdo58prk8zsutb5rfr0gdpg8dzrp0imops1abax1xxt6of14bodh5latqtrwjf3pia0la5edtnrh0ifef0oh20sgf2oop5ixyqnisn6vhc4mz7ag4jqh52z4tlkpkhhhsi42m2sdryx61hyu1x0i945gjngfbbsc0izvf5a0xakel3ipsa5stejtm8lfin5mv5o8jrnl298lixislszlnkujb8mnc9uh6m00pwmeoz1lql0ntrd160nqk8lj7gasj14gumcwm8uwxlbvynfi0wvh5h46ovztc2j3419sp2wq580h0dyggvqk3dophtcdbvsyghdgd46m0gs4ekf3e6avqogyuvxkymob16t2efaonkqci94pai96n49ngzxk4r9g12aq7y438ldnfvyp7mbeomhr6traagqp2alnds0geyvu62r7okxkmiagrm',
                fileSchema: '064xinjwv8irfpzym4cs7xl0wovyeq8osbvino7stdaxy2by99y6a7976dhpedorzresuofznkla1x5qmp1c96a1m8v1e8wovv3d1i0uqy88fad6lql0lmw4pty0haqerx3tyxgzxeuiu3ds0lt34dsemkfhhuz6nyzv8vq1jmbatjbyc5mue4xemyjf8vb8rxqehos54u5sbhiijohihpsjc2pwohg0gjl2ul9y27axv91g24g3amrhbnjvrqb94k7jkaro2vu6tdrcfv8xuet8yxgcnx019z3ctrr4vo33ckut0h44w153z7cny7yhyknd72ku0ttsp4j2ix3echamh80al9gtgq1vf6xmt7xwehhltu1dlcor0wja5fzanz0fb1lddvp6wqb2oxrwkdqx8cqllp4cxayco6alzukca3kruhs40cmypo9zzx19o3fy0qzoi70cbj7wqc6vjowvbiwi1l6vt8tstknh3h8t6c5pgsyex07zwthe585bvkoiw1sca6c02zvp8g1g58kpss5rvqk6nkaw82m9g9nasbk1bj4cc7fm4ojtwxvk1mcboh19r03a41rngqjq8hod85r6vmenq10uzftavzx6hn2bx3kwhqj96zfe35ox6sben4g1oviqf90dyeux0tyzj99zxsw7csq6u30pnzlxac0e3daj1eq1nwin6culpv8g6pmajg86j1c59akar7ivtyevyclhrgrbjkjmbuv5rul5zlvankqvwpksy8k2yn5818omxcp3ftjnkpyjh6iznhop90io3q0qg1f44gjxw4owau2fzmxn9gev7w7jfuqsxx4f4q062fz4953imz5duabqay2ewaafleujc2utretzptpbpc0kusulxdnoko699hr4b2sxj26gnhs6pltqqucxx814snm68jw52tgcxtbqwwyvfy22vb27fpiyzgfy9zqeropdg554o764l68pct5t5qy9checij440unr4zl5fbwfxr8hac4iv6lm',
                proxyHost: 'rmedtn58lvaes36lf6m7qdj8d7yn03j0x8zc8czu0j40bf9s0jeovopljvrd',
                proxyPort: 9980253589,
                destination: 'gv4tsttn9lr5nvmxm1xo8he452bnp8kmh0kbjufnl9v8w6bav4g4ry6rwq90mdlun5snq4itw7wcb39fi7wjro4nzrjnd51mqqivz3ncaoeciv1twdr96zk21pjuwazhkheys8xh2aurjoevj78f49pnomtzzoew',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ihyvg2fmeaeoxd30zxaki1bhf9hpjh03avwo6h6sjaxxk3j0k5ftvo2j8vo3u81sujez1hmhts6rw21zvxsvyuw8wy2eaiwc4ddtg2o6qwkq7pywe9khrgy5fscn4r1u1id6l8wo53prvtlp7gfy2smcq1sghxcc',
                responsibleUserAccountName: 'eo9q5ysdhdjqe6ec2d7i',
                lastChangeUserAccount: '48r4q94gz1n83s79els8',
                lastChangedAt: '2020-11-04 16:27:25',
                riInterfaceName: 'zqj4ye006j0iourf9ydddfnw3o7cfcnph91mu3hbzc1bo7oeupz1qhui61kdsg5orsw39rwaapbsx2nye7iuh0v1w3evcfacuz1299brgx1tju5322sroabw79t154a4m259d43m8f7hf29zfkm02ybki7rkfmij',
                riInterfaceNamespace: 'ehxtohde2dai3beetwztij7glm5fxdc2u2rxwkhcsup7ublyvooj02nvd813prwkbdnutk5wnvjvwrpzke3jh79hze3rzlkmkgm0btvfg37hhqb12w2lk3hahymsw8ri4d55ezjs0kntaiums8peml0yn3amnmvp',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'dekb3c3w9f6gay5pfz1heyh7ep903w6h8j998s7u',
                tenantId: 'cw0zwdokaj9k8dgfxb4qhc6izuwe56cc7dw72',
                tenantCode: '0kskty24q1xjg7o3gw56gipn27avsz9fp7edi23op4j1wnpuy9',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'shbce2x8imbo6h0hu1z8',
                party: 'y6hs78x70krlm69c8h20habdb5h4q7503pur1b9j715qsx03yh47w4g7vewvev2wmtqf44q15uwvztdguwz2ff6zw478quszsih2hwqlf1ydioctg14gy5vgx8gw665vrd18fj42ddbqfdbpko54bzbgai5vns4a',
                component: 'lxkzg7hkqw2artjp69b91ukcpfwsqz08b2txy25l0lo19s03n0n0r0i44zkczd3o18qt4qlxm1wkztt7rgo5le8zq47stpq57r9uuhr5vgohpdkl4ps6xjl127twjfv4agf2gfku9i7jk89toc2i4baos5pcy0bq',
                name: 'gea1m14m21cjdgr0u8rtpviwz9266wffr3wzt05iykwdzottxc0ycvp8dc5w5s1svjy2vf0zyrvu0bg8bc3inq1i2sxvhmwcyuqw78fbgfbcivsau3crqp3ordmruyogs1m44yhtr5ihawk4425hhisyv6ndcw4r',
                flowHash: 'cpk0vvaeglxwfjfhhzkj69nf326h80cw72lve663',
                flowParty: 'vms2bqbnkaphl1a998o4957ua7m0fd1oxgitr70jhid9gik4tgb0se1tam8pxed5cdkb3h1te93te4gmreun4mav6z7rrkwnedhhkg9zulq3urn2zjrec6cowrwpcglkaalky96p7oswb5rxmqbzsk2ngyd76u4q',
                flowReceiverParty: 'sbx9z4kldrw8arub7bw09f8q9swf8zjg4nuz53ktprgjg4lowma73ps3tsksp1fdkqszth3b0fal6uww546e6zq6hwentbf1k1prx0l1dxjmto3mhwrvcbs29umxkqzew6y543kclfh2myonkredr7j3k9z7aydu',
                flowComponent: '9471wds50rhofmge1ffuisj7aotz6vwu48pbf0v8yivdb5fwqq2un04xaz3viwf6b2scz4h9q1imyqu9wctwhy1eqfny6e5if43q90tgv020ppltrixp3np93cnl6xh2f9jdkspycvvrk2sfee2fbqwjssmr22ad',
                flowReceiverComponent: 'u5g8jhbbabsjfmg1881gp7xifc3vmf10m1tgjng051ggawzfufl6sc5xl5nb2r48z5pwaxragsozdklvzs2yhq832w319w4io2z2h629v23vx1ep6kvn42ppdqgeksnaxbaotlugd7pntvmezfhww9al4032caql',
                flowInterfaceName: 'vqvvhn2sznjsv8wh13k7m5vsxyay4ouh3wzoxky4gv2rtb7fhw3stnlmq2pio3vsg6qb87w27fhql15wxfm1d86t20m8llbuw120bg1f9wqoewa6x2a64qx1icgx0d8s9h5id2x7m9r2lfsvog770zro497gpshe',
                flowInterfaceNamespace: '3ixg4ad140sqaqyg5rrenrq2092zr5m1d4s3tiyhtgi783quzm0vx52j77vw2w3jw4fhf5onsu71mxekl99hbm185annovay1hhwmhcv50dohse6xvv91aolmemw3lpj9dwh3z5n1ogla55jy9httr5pvp2p26ve',
                version: '07xdo52qd5lz8gmxuocm',
                adapterType: 'ubmqsdwjtt8is317hx2b8rt33i3doadceocgmnrkno3b59a8lukaziicxtll',
                direction: 'SENDER',
                transportProtocol: '0f1400jpwar7t8w4ibwpdzju1vlwjl7zvr1aau7zlo2whk1c6nsim8ifqf8d',
                messageProtocol: '59sq82r4m5im0aq0ooogopg13bhe2dx352im3e3d3hvp85v4demrclecvzd2',
                adapterEngineName: '043gl1lyreiootmztjorthx1hg6fpo1dbiopgweoesvot1v1l1lbbyt84k89qlv1sogrxhle6v00zcsaz9yg18zcuwkgimrxbpd7c0aci43i0p02yvt0x3phctysxr9pzxwzqoj3qau809chx3fy2w592qpetob3',
                url: 'ucwkhhlcbw09lj9avlx5vrh1b4qrx8sxlwrf91np3sduk5rx8f5fhnmlqizz2xg47rf52ymefg7xs7ttsfevqjhc691xsiqb0zbzbwu9vcpe0pg6q4bkkm8r3m7zy1df0yu8sqd38tdopr4mpslq8duxf94btasrk2tabktun1old2ckg32jj2fh6kanoym27oxmydopepi9ory5rd5q1ex5psppqhxgqo80q6i8uyhoqygkt73xotkzklzczdmevxn3mt3nkp8eoa9ad3g0vrnjkrbuwys0xg0vhz4texpcn8pfjd1pdy9391ab4xu0',
                username: '3appgl1op9e426989d8ylwv66w105k2mbgcbm81viaht6jjt6wbjv2y9qwwp',
                remoteHost: 'xmxl0lv6ttsnoo1z7ub1t3wvmjo8zfo2yutzzp39fe4npqfpbj8e7d18s4qz6anqpvn8rpepeivnh5880nrw3wnmolodrav9buif504s6q0wwmdcetww1kwb8lba8stavw3khpytcknk0dlohyqve8xvnnfesaol',
                remotePort: 1039245567,
                directory: 'dpwho282hlicm0pxkl6yciryp557bpul19s7tzcjjydm3s4dmgscm74i4su8gwojt2lgutw2vas0yzlz5qb9mrk7seromcxcg2ekvq8p9wy8hlmx24obg88loja85o7ya5fh5kke1gcu4hyka9y834o07oyoe1ebmzsg1ilpmw52kzjjbvma6pwtmee3thxh9jy6wapvuthrrkopwm1k6y24lbwkn1mhxpzhrep4ahb6jigibgh6qri0bsdcgwap4uf1r9o27e4hdl8pu65u9r9s4am9n9ewin4b60uhrahlweqcgd5smxy16jpigx5m60mqqk7q2dvh4cz7jf6pgc5x1qk7enl07e30difq6gfcajd5dxew0ns0812hupto0s4ddsnrceot66wn9ibj2dwoxgkxidnmh7lxt3ago7z21azu38g36899yujfftfj7t8jf0miyxyovrmchcg7jt4akwr30600zv6ybukbxg3evve1qys7bpp8qd6omm27rzdo7kbbepxwg6m1391uzctlq2rpgtucaia70htemz7l4xnr2srqmy88dvm7iqv73i114irlr24sd6anb58je9dchpz3zd09gtkt46erfm0o7iyz0l6sjurzf9j1vpc6faej7k3n73ioje8awnavkd3er1oos2d5anhw9h6yjm02oa2bwqqdyyxn1lxcynth9xn8r1ai0l11bsv5m047z9kflf4f3bi9nzciu7j0qodkmj7x1umhf1mc5oo0cdhexc8hpv9mk8xzqfupwqoanvfr73t35r6lqh21rh7eaf7zz8he1orkp3p7h29glhxjjz3gu0oyt02pipjr8bbo8uy1r3xvsbxg3i4yo873q6ct1hpkusxoa7lw684j4pbtar2gjs89dralnfidi5rddtxh4nkt3nr4motqa5dg935g4uvaxo678tnf67v3rlc01wb8vtjkepycu19syyyyddpib5oyrnklrsbfao41d2e3fg354yr4sm6ojba8axwa',
                fileSchema: 'hrl749fi7l85fwrorb3uqdc2ok6tqlhiqiodwd1y5he7fvrav6dzg8q7lzbbrpa8qfqmbcm0g0rvvlu7kxf13vyipf2t6gxyfxdghmf62dctmps4fq3m69mb3ztlka4krqaa3z521m17nuxryudcye51ozidmljg6ss9fz9bffd3rvo09hg1lkl4ih28s4xkzq6ubmjf0o8i0k8jsfm6lr2izupp17sgee7hazjdct1zhvm7l7p4owrbp896koqxsk5zv416wm10bwn5p4o6thvj8x87kt0i4xl55j9zdrhth4bmeanwnmotqln3yyjv6jh4fg0nqzke8q2if4oksvagym7jl3gysjay3qv6b26exn7pjq67p22e43gngeskgw6y3ui87xhjgyes3l1i8klch0tvc793gly08rvvs65c5c693nhng54ymd52sc3v3r7dtic9dqvleaz3e446lsj6s8to1s7nlu7znrie1gqlu2dkz7tdgpgpn30epz7vq794256jt9mo8qan6oxrhy0c0hh4srw0yzusrxrd7iv1vlw3h82zk8adhkmp5tzzug2lmfssq82hdssbsqlg5r62raedtrapsxhhbv2x0xxlpgaktiucrbqtd8xqkc43np0r4orkm2on4pi7oo01qrlq57cv351tjqtrokv1iib008lyoxfbrrokd853d2wj26q6g62q94q6noqkijq4oyf5qicmxkne18n8i7x4puno49tcuqsu6mdb9n93t5zdlkwcidx8ti0p3wdycw4lyp4j84wmkzx5ay39pt9yd9jkvjgrsvnl28bpb6b1ykir2wo4kswgxrz8t8rzclhsrgy7d6ufmsu6p0rep5i7d8t1gbs64z4fct10sd2fz8tz4d7tx6femun5p8cw77ylmsnr9n4hkqk207m02c64c3fv4jsto8f61ng49yjfigumnl6ne4bvukdnx67f1oazzoenaeqzg5e3t20ci2al06r4td2q6wayl878ryemc1ri',
                proxyHost: 'osg38a8fxkf8aqsq49igil9eiohlwdwjwutihvlo0jk1vvbjot9w9q21cp48',
                proxyPort: 8694659525,
                destination: 'f8vos5u37ooh8sz0lk8yf7vtprfru2fsxw0sxpvxbrqyua5sek9nab6t6c5461aiu9uruim1io9cfd86jjhfdb9gsd8niib5amn2rmna2h9uqtr417bzfrf2b79b79sxjkutmbksae5cdbxnp4fp9482d27ffl8n',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '8nbrtpps76mej9uwy77maxzejhs1jftlgc6qy7rth968pl1yoszmihe4x8j8650zlyjrv2du0tznt464bjhuq62bk8kv1netpsqyuydak1k5eqzjkldk63qtv4yzsdk6yaexaxvdydorj0gabhlc1nwp62bih8m0',
                responsibleUserAccountName: '3nx1ty5c0fxesjcfyw40',
                lastChangeUserAccount: 'cpggy3bbvyzow1dkwgy9',
                lastChangedAt: '2020-11-04 02:14:22',
                riInterfaceName: '9q5z7g8ftciqtkoqjgkl9dpbh7n79j5mm82pu3a39ixflsidkjt3xsi8mwk4ig7ro1z9nts4ju82bi8cv9jg7pbbwy9s9lhv99yasd017b2c63khvbth0ehnb7x2ybb2t8bjpwgigivf5rv8339sngy4gkdnfw8p',
                riInterfaceNamespace: 'x3j5n0mashwpig7p0yjp5oc1rluvodmky4sewrbcgox29ri6haosspelrp1kex6lgo9e9jha3rye3l554pfphv5bmp1juqogyi39ivqxa3sl2fstvr9llou83hxld7hgpm9b62wez28in1elcm377fgzt4dc0rwk',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'yix7z1die25fv6028pt27ona9t2igovh8j066fs7',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: '1i2idlkbmez5223n1rswtxep453k0sahd1qxsdku8p2chcnf5e',
                systemId: 'x9zgt5wgacks3brl87z81dn14us1as28tvb6d',
                systemName: 'fbdu2h9pe4a300740k2t',
                party: '5nrbjfr1ellxv0isny7ntffw60qtw18wwqul6fstf4125lkxker6flgjreef16ethps91ell63tgrp020wwewpszmyhvuzjzuw8qzy5cpzgb0ngodb0cjpb7h91o3zzz3rwouyykunqtqn9uho6yifljcjupiof4',
                component: 'ighpxhalwmgjcqh9or6p5bfeue3hfz9xue2z3w7fecgbenb7d4wmf7b22hk35ph7ul8f04i3tz8bke4fa3wei4byjfwdspa7zd4fm3y2ty8zm0k3c577cmxkt49hnvmxtm5361aoxsq0g5oq5zxsahl2qcu68uwi',
                name: '1cfb0sofz62hcbau2ks9acipu5aiae96ly3vx6smye3np3k9xizreq75in5dqftxgieu5ycqy1oldj30ihxpd2ss9tblles1oajtogushrlkp5rmnxceuiuxjtfmyss94hs2pe4xmm7ggq3oqbfto2gjuvn2jvu5',
                flowHash: 'pqtpenjibvlspcczr5cbyx45qv2rmztxgdyf5rp8',
                flowParty: 'fo4jma05m6lxwnk2z2unilydik7iq91q25wzxuobnb8l1g371dytt1jgruu3lsz15u79cxy5mm7own59fwtiof0c0rd6xwkie50lhvtl039i2y1o2jgpdjsswwgzvsibebqe5nc5tb7uyqh9xp9u2sbhadpfh5gu',
                flowReceiverParty: 'fpxl2c48p6a7z5ekqj9ct0zei9q6tq3eh126eug7vontzmh1soe5lqxmgxnuq19ufuxu1fodtwe95aly0rr4s1hm3z5xyh82pg64dvx93omemxtayoodu022tybp2pv4eflq3lainlay1irda4npzoxzn4c95ssp',
                flowComponent: '8oph8qjkh7yuiwsiqwq92sacbh7t6gflalslzsxh16axereksh5sny83ma4q619cm4c44llj6wiaz7v2q7dx3zz5w0cfhjb2htzz8avu4pq8v3xl31hjrejbqdbkgm6foupg55xkfyuxq126l84uqxv1o5npdexq',
                flowReceiverComponent: 'xnmgieqrvjs5d57pcayx0m694bv7k5nanozggkku4ut1s1bgrg5bqmrv7503ut33r7o6mf3axtlnmayurne74kru6l45eg2gow6iak3p5rm5niq05f40kbhb6enpjmwuy41re6pcdgiods43xdq3miww4am52km6',
                flowInterfaceName: 'ohb9epcodgjjujlea9ky54k1arvi3yioyqcrn30sq9gm7voyqninmunx8oh3sdkkwmxo1rclecvrdztvbxa8kg0drahwzda85nrt7r86wc8ywzxmxcnwqc1esm9si6jgixyb17z7sxm0x3qgsefwkjuuxe6n24rb',
                flowInterfaceNamespace: 'j50049lyvpg3k9y939rdv6i4p6vkl0so3ca29r1510k6o6tedy0ba6mn92zw2n847h1pxto5ddmwuzg3bp3r03uhxoo4d3mwis2xl34nwinbxdhqtf0s90aqe2evwu71tjmyo0la74pxph4qidvxwcw4gangvxm4',
                version: '4lfydgmwepk97wjce1fc',
                adapterType: 'kg5b16uv0z3iyxk2gxyzxk5v9vav8r3oqwey42hzvuw89q58tjb92r9pwdw4',
                direction: 'SENDER',
                transportProtocol: 'a0mp3paq41uxo1zgosee5lnqbc3qe2lo8k0tkvqivcvh02brjlm0k1dibsso',
                messageProtocol: 'ullipa6pode4b3d3imcug29mo7t6izsu43oa7mkux8g4heefudbt7met8o3z',
                adapterEngineName: 'asyzcekl03idzp1epakr5pxexv5g98jqfsmdclsyuymq2m37obari9xmj30t5mvw032p290sefeoo828rcfxh3gfvh2ajpkyyb6osry2ek3riu9z6hv8z33hytwzydclk7mxtcum6drvo17tvv6sczlgpnnop85g',
                url: 'aqkcq75jex4oaseegg66nivok00bb7rd65pnt83mqibgadq075pq1g5mkrvx1zj79bqc1ml0fzf3kz7dsxwdc38lfoshu1pjz9y7cvisifh4cmq1ufbsqknn09n082co2yamtzr7p7q0yhi0lo7cimlm64w7mr1ijwwf0rzggx9e1lvjx9sxg39x7l08cjdk4ztk2tgh3z6c3fm2yogdmbb39v933czgq14y4uevsd83n0dy2xds1zunpb9p0uejtwnki9dtn4x7yqh31zkelzb9n8sdnykyo5ymdlpoo9afphrqz5rl0sourumojj12',
                username: '8y8iuwy4o2tdz5yht4z2pdwsjl5esd1guylv8lqv0lui6ml7tgjqxle39zif',
                remoteHost: '4rlowoic3rzid45kqyd4nz37n356nz2pinlmpwoqugvflmjuw8s4l20fhak9zry5plx0hmzac0wdksdqsstnf2z0kspn78nhedjts5p2wfk6fjcdcb67u5mc61v7g9jz546fk9s7d03mo0hqu4w7e4memslomlrr',
                remotePort: 9219833459,
                directory: 'h3eij03ux46f9g108or9ii9k7iiifqeinsdef0ogktn6aqyx56r2bklt4mic4ehf4v190etmrvrjjkc3bfsr0nzzemw1ldq4uajj3e4u7x9q9lb7h92ntms72t74gwux1ii5k01d2n04ponk8xec762x3f6tkbzkof0os5h7zvul95a0weg6yvgk3plk76if81f32ofmr1cwsck96ofarqar1hjb6w4kjinj8v6y2qlid3fz73p1hy47q52sdnumxupadi81qabso49lhah4xs7rm5dxmxzsve2tv8h9j4ah0l7g096isfy0fxsk8x9e5ymn7aohbh1okykbg3bkuw7y8qrynem9vuctq1bg94g2a9wx5a0y7f1t171vcpyhhdqt7gql2oa0s1oomy45bz553i5kpk9px6t0cpqle0hsnewjg73niu5yz010832fokpvjlga5fzhhh32f6663q6256sjmqa1hxcapkl06tizzj447yp9i9119wg601hup2tci0qutkofm4o30jqd91c934pzmqgz1ydpadombcz0p1ao2qcqbfc3elltjia5plb05e9iaumuynl414z5tk5t2twzviikjh4810v9zjlwdz3z6v9fc4idpmvneot5i21kim8wupss15hucv7w3g1rzqbvjy1s8ck9o5va8m4qbilg8tiebbasr5is6sk4cjqcynmwa4ug25cd8wnrr3i4grv61xfymlp02zuvtjabim18xyia93a7lnpa4igqrasrdgdbrcu4381jideopdewa6p6hpk4noj0riuratkjqtspanvdx1wv78p3qb4tdho8g73372dxeqbu617r55mye34nngd1yqbrmmg3x2vhcgk2x79bwflgaqgljx7seb8mw2aejwltwusnytx42gpg25rv9q4zemqtzbzhbdr825d60co1qob8m0swpivn2ife3rtxusbmw3ky4y55q0s7foxosgx5qckuoxpb8uv1rqz8o30zijl45bxsnjok',
                fileSchema: 'v54ml88gz7oi3nvuwtsb9bg05h3a2il1vl32w0214d03csqruhzchqlbhdcin2prdcjhjmqs1o6qvo5wmwzrdwurvmswi962cylh86etv6rx7gp5afwnyplcerfxhuyxh69c4a8mpwbou0gcl1bsrg2u5ea8q42p9ovu5qx8w2tld8b5qspccp48ipyerxk6nvfm0fkkmiw61nxnti5dm7hw4q811khj6t0enfjf6i6kbuyac0h5cqime8vk7a84hmfibrobbt21uzz56ejqwym4y2xmsy3ajmzy44wvjvq4yad0g3rcvlq1pozo06uw65ybpcpssix8u5j9qypqs5u7z29iv6h7jh9ybpxdeqbyu7x3tmkrjosvb2kmwti595ypa1tzzmdcdruwekn2ktz8fje9mwrakbg7g4ubza59uumfrl187mw432vg20lgoavcnlks3kqo1uclxtulzka1569a1mvedut1j84bjwe21lt3i8xq9ygilju7gofenzjwn96exwdcu7rrtb55hu96lur2jtc9qwf23r5ip6sokmuu89zzqirfq6saiybvvyig4hkevxda2odoqfy3jspiagc9mmtw3354dimwmdm5gvpxm8efp0yxk888jay03ufkizw6sry5m5fpvin0buqyyf6kkce3flfom6ae99pa9dem9cabzr7wqpk7vo07zvfd7zuptbzgjektxohz5bd9wtvjjvsvi70toi21i13vlswg7broxyl5w3kv73r5cjaifp3kehnbjoy6thfi9xb3ja4tyb67xnrkcu1wpr4rqi8nchj0h22ppukpphdu2kf41cfg1lcz84300smyv0q2liso5aceilsa90ciw290dpi6mdtv4k7felc1422y8juuac7zmfe8l4ykw61lpncijf6aud6msswt3kjwltk8qzkkn41zixhy4w0aqsgdfh53apitnsyvyhmtbaxn5f5bwiohfrg1qxunapjlw2e8gl2vjm6cuokyoo6d2jcw',
                proxyHost: 'upopynw77p2gylnnihfp5s27essim7kn1g0xhm3ieiovtrbdev9bua1elvvq',
                proxyPort: 8154659417,
                destination: 'y9s1r4es1y3hhyeaf6wbmvkj91dszzrjvy5f8w28zo5lf69hlvj38ken65hcxkpbfx1brvxazwraq1e9svlwozobqxlgusy069dxnwwzvf7o8dtf26m2lp1jy0dvhap39viihn05d3yrmkvvj201y189b4f0rt3u',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'mjlgfbvz0xwtw1c8hog7t9xs6vtyuhtjbohldnweqzslphczf4q5rjpdur45t5mrpgxyctipy39q4jy13r3mocy3v8fbula3pctxyxe4hg32c9mvjroxtwl1sak6ntucayl169hlhkv9j75d9ps2z4euf6d9v9s8',
                responsibleUserAccountName: '64fplqwlbfk9ywzxis8o',
                lastChangeUserAccount: 'iaofnz4vbhmleyan92vu',
                lastChangedAt: '2020-11-04 12:42:08',
                riInterfaceName: 'k6ecavtp8cmtz0s06f13cubbee5mvmxmflmae1ymem0h3p82hukwgajxwasxol4t40ivh7e68qs7h2k2s12uaqp1k7m6esg94h2i7was04xqvnprion25t3n94uetrfv1vuz0a1l69w6hqmxh1104dvhnlx2xbrh',
                riInterfaceNamespace: 'fyit3xi39lb62877msntxst3ne24uivv28a28sxo00u5qb74jz34ptt643hgoqeu5lp4qjufs8yn8glsfwr3b4ogv9bdidn3v6p16r182d6badinqf4x2c71belz4tlhkgi9btkvys3a05yek4o6r9inkiiinx3u',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'xjuwni9zuqaqqq7xcp9i6g5kx0fg6f8ch2m64upc',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: '86asvbbmotml3iyktragjw1sp67s9b5xmg3mv1r2uxk9gw03gx',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: '9ykcxh3gc17an9y1ymsv',
                party: '4jiwfsaoq6thq00ofi70smw08bkiticvqaroi2950flp12wmznx6awflc4xel6kff0bkh592nw0x1ad2bkpzhzg5z6prrzm8qp3jhrtikdmx7qhl5wfiizc0r8wsaqyxpi8hr3uvkzxznugpml452b42028lojrq',
                component: 'j6i5ttbdrmd02r8r5335g7c0afj439z11ln90etolp83p3ckg79ajtg7cotoqvkzbia4fdjg2j63zj7eih5f7995uxh8jpsnz6z3qleumij6zo0um3arzhmgsj4bgufe6apfvss5pung3zge0s1uw1fl95wr9t83',
                name: 'fzcizdch0685thx9jpfffd75t393vtrnp1haxs8kjgh4cs7j8el7o1lvxkz05r6llb6er397qqmzorn19d6lei5qbobyk3x462alh06ovh3r17lr7f2fwwof8k3xpk24gry60dhba1lfkws8jke5yz3tokeusqko',
                flowHash: '9cv4pxsiw829qoves7hz36kn7yb3jv5s39y4sbuov',
                flowParty: 'ku5m7dqg8ojffpb66gqsnvdam00flelb3b0x3kc3um3i52uhto7cnvyqr7ardw9udtu08ybmjc8f7nmienbeyhpvhgexs3pp5t6ihokeaecez4j96s62ftptctcm0q9kbg2sf4m2884hq49hr6k91ie5iurcuzea',
                flowReceiverParty: 'z18llmp829qainwly4ichy6dwgm3cpgp168mw01psmh1a52xzsem299t36rlb3enegc7jfpz65t0qzef27re2090rqvpmu53fryz3rb2pdg14d3bnpwhyq2mac2szzfg52nj3czj7hmrzz9hxy1kxij4tay35k5f',
                flowComponent: 'mhzrlrhb36wq9rlblxsxf5whfqszevasr3eewkgx3adtvmy5g87pvla9kdhpa6jy61usg2z6ynzkgaw37xk0w5tyef9jkaap8tkrd16cajkwd98fnp7vhngakcqyg0enc3pq1qfh3e3lwlvcnivkgn1okjka3c2i',
                flowReceiverComponent: 'n4y0q6x7r4ugx9f23762w18tu1a76raqknoqvqpwy77cgrhyw4tcvt32xc9e9irn1uvkxmr8r70f0lzeph770nzaiagzhb2gqh6dv4wm55m6my6rvv4fucl0nvac2j21mrtvhdfsbdy31784h2l4eeqj2eqgdadv',
                flowInterfaceName: 'tvv50ff9lvypjcic436nv9lz53v2pjojiicts45gep70eliukxl2sdq8sukhz4w6434ng28c184b0xqvy20neonwgxos2rvyjv92v1sjuwcai636zgipfmwt0p79yiotqnhlsem80hn46c5jxtf6kofdvdqup658',
                flowInterfaceNamespace: 'f8qztqag1061k9paka80v1py287zu2yzwkdslbemo1b4jaf4g1ib8ucui3lvvbivwefjwhbdrc6bxrcsjot5csibehicwob1fxbjvjehcgk0sfcdw3xz69shdrbmqbvsfb4lpkfkqmbhd1f1aehbzfcna2to91ym',
                version: 'e2kvkh5noqkbglde2nzo',
                adapterType: '08vgbqhiex4218li0l87ujvq050iep2rjp7objjqqkw7oje2d52jq9drp43v',
                direction: 'RECEIVER',
                transportProtocol: 'iiedh9njyoxlx0ze9f1p3l7t7ydcydwhynvf297cs39n2s3v0nkssac5kp6t',
                messageProtocol: '8dy30db90f8h4lbo8xozacxju8lk2gtw013w1p1jk0hbcdsvdz7i6fwzanbj',
                adapterEngineName: 'x48qxbai0ntf5a7gj61ga2od6wnvz7r519xakoehm136z8t31t3v1ycke7n7ivhy9dz94lb51rbuzloi9kevq1qgl0wzidlvdw8rvrsfdc5n7ojg2uyg4b7taw93ctia2wzv2m400siesnt1m07npwxf4w1mx2im',
                url: 'p16x685czbypv8a2cgqjy72dd25o7usshi3pek2ned4bsk878kus3b1ej5wj7kyjodylyrybdfzc95wsgyk3oo61x4gklc46uji77igxody5yyg2h2xg43lsz2oh6ze98xe68kkqurohjtmckju7hm386eq5utaut46avnxrsxagwq5x4xw8hox1zj8rh492pd0pnvmqhtuku16gsahukyi3v1xh0gosjeznk0mexzddm6gdl54159bqwkdk31u2idzg6zjbrxv7ja09z56b3hpamp1r59xf6mbz7bts63ubqgxica6maben98uqkume',
                username: 'rdyu817ebg7tqw1jgooi0d2kb3okp54m636hmr26j2zd7caqjtfokwat1kfs',
                remoteHost: 'i7f33wflowjzgu9tl3l4v2ik94dso1rc7u6e4b2qq2yfvy5azofniehqf76k31e76hin6y9w7dv34swm1r1ccmwijm9uncuh77sgq7unx6znfg77eaf4ugruwk2unjya5hfugmabe8d7it6mabzmnta191kqeqp4',
                remotePort: 1105724074,
                directory: '43x77wby5qdoe0fbqmhhinvk7ea491of680fd8obfy1hh7glt5usaeatvqnf7ln2874fd2pwdkbmucodr8y29jbkfetcvevmf33epznaimgug3dhnw1bm1040opgs33p1v1njfnsfpxtre620h4m3ppa1y7z7rte5o9vq409tz5kh9ymveq7wlek18bj11488zg6127axgmlp5hqc2r52cvfzlnb7k8s844we6k9k43hr3pwxbd505do49v6beafeltbpvmp6nolrxcubswnrsllqann6rx25pgrre2y9iik4h81mrj9960ngrfq3ptk2lprej4crza2my4hmjqjmbuqbboltyqdmjrp1f34d187n3h9i5qz8ap0nrzabeuvcbxvdrul3ogdqjnym2l1kiyiocsm7h3bo16iyimio6efry1yku8pqzorksi8yz2xe5glcwnnz8g0bfx3ps9gpejydpzlmm04cc7wn6cujhx1jmon4eqvc9kx75zvbpxkyr40qgo5gbsxnretd0ias68xmpy1lviidfwcmnqu02k3nlk9s0qij8myfrflwi3dicqrjv5ogdsudh76axeclyymrgccwobylmhduix9ztcetl5f6o0ed5e1sw669z5pvc40fe1ei5a4uc4ey7zz0b2k3bj3133nsey4urqryyrow0fof0qcrrel312nk9i4xybt91evym8vw5vytkcw0wxqiy9adjeo07cytoaioe3mc51fgpk4g64u9yxx5ogp7w5s0l91ot015e9rwxsr8m5b06s1ja3yo1wqgmgrcj9hk1tet87nw1wctmclglxk8d1b3xslxu6ukn0fgzd3d2g95crwbom83vomy6ofkzcqnd9uq33rkh50075n9szwczvzcpwonpi7vqu4gy5p6bp0l3n6pebf2dimmcuom6yj6cgw4zwdw0uynom423mnzyij82xqzvcylzzgdk1tqnzn649rvgseuf3nv9gfwslr0kt1kcuawlx3pkmf8m04',
                fileSchema: 'ue0jzdbuscxmtmz9yakr1f2nu72znun7iy0hsxxthikslfht6pg6in3vznfrbhucocjko2brr0o5e3ql0n84wiflo4o1et9vmc4wiqw19lojtfkfox0z8k6rphfccbytwd3x7mtt80k2ctrlsffyhk1rqeqbksa64t2qr0f4ncqexv0plf0mkutbgf76q16pjn2h8949u38mmhrgfbxf65ogcms3lspeeas3g6xdeksb0j8c92e0dxy3p523620yyd3jxf8thcp6s2fbzphdm895vivbvih55jbzbbkpn8nrx01vx1tzcpm52i01vj19e39cdxoxntxmkkltixd08swhommeme6uoxi71cbmqpwqean3a8hp6v73t0ruqak36ibsh8nw2su7pscb8k7hkz73snihrijbpocp8eauqgzpnqdaxhinlcofwedxlu651qlpwni6lybrzbek3nufx1cpmdpahc0wolcgkqfu4tsbsx27kdr0eofximau7hnn5f9s3angbj2hz5t7f2ae40dax9mrux3p6b4mqv4lyc9w7vzf6vx2scx9sahp680n4g73s01vs657ck4ud5e5bfz4kjzdlhzi82xw4jtya3ggakkcet2oh1n8bsu2v1u1qf7zfxk44ggufmnnc9ejhl93egf83old5rsumcugn93k95kaf1ripe96aau6f72yy2kq6uhno23cx7gjt3baa7if3l3upo1mpxw2qdo5as4rnfwezxi7g8uq0iapesim04pe3d1133ekca1okdbgfszehuzulqh97wfczxuloi7si6t3poyo99dzfqsmx62r3n3u8wbpcvwx7vgcjdy34vvdrrma11nz4437vfyba1ysjy6cplxrea73iygjgrv61dheody4sqfgh59xbejudd1srd70jlwsst0i4oljj2e4q40t2ji3b2nkf3dmr391bakd3rzclealw3e3lhzxy9yx379x7q3k0e879q9pev8c35uiegg7fs1rl5a5w01x',
                proxyHost: 'ackgivlvkhyq20rnnlupk5ik6iy2ms2n8f7gqzd7erux93jkstxna2i2yy7b',
                proxyPort: 2108418837,
                destination: 'oe2rg4vdhwcdale5skq8cyx92mtmxqs9l1ivv46h50g30wjoajaupwg8e0tp0ujpdeae9jnj1sh5c4ol0mgv8tov0end9f9364ra6qis72rx36dxy1mbvvuv7z0lsttuf6ktl5wer673tlqjbq3edtlhaunh4c2f',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'xnin8tjpm90nvm8rnb297zbg9o7kgu6l2wrf9yyp2qt00n6hme5lwo8b1rmnkvguuqhioxuugu8ydalrpunwwyyonnppenxnv9pajiydmwzucj30igwv7nxm1djulkwsmbvea0cty2bij0tvy4hy006j4e34xx5i',
                responsibleUserAccountName: 'x1sgtv47o8y3epuob6kw',
                lastChangeUserAccount: 'ltgxafqpx04eqqvx15uf',
                lastChangedAt: '2020-11-04 17:08:37',
                riInterfaceName: 'dj4re8h459dflf3myspbugu29ewzb7rvzbbd4b7y9j6f2tlc63nocex8ewudu4f7upgvmfbvet98ck469zdfzyoms28ge47dajtx52s4b3pczhcs1a790nri1zf38tekyrdxe78uy9x7frp5bxqrcylbg3u45sn7',
                riInterfaceNamespace: 'c57w500dt1fqt78q1k6u73z5hs9c0v032bi0ycegvspup6hh7l3wdiyzg7rqm7e4hheomac4tggg0eyngu9nvuokj3iih2u8dx6qhawvjw7bjn23w4pjkg0t6ckni2mxg3dwkdwy73bpzv8o4gjbduk67opetnc7',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: '6n9dzlvk8tkrx20qj7geg2zjuyyr9qbw6mnc43d7',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'c3v1hqjesjdv6668gfy1l4z7gcy14n3ozozwoav762kl3wq5mg2',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'z3y2pay4mwbar0y019d7',
                party: 't23psrqrney148scfmdcwb1h4ttfg8jnc1efwsh5aoe030m10lyps7f4g6zu0z3u1csmvu3qwocz49kt8toulwolghkt2u7osftz7qbrqqspu3360b1293xt62ky4g66ffixiaqot1kbk44mr1vu4jsoiypo6uu7',
                component: '7tgqz0ampmkopjdw1wxeor6s4yy5ie11jjb2yl6h9va2y93wr3i790ggh43979j3ctxwunu3y8uoh8cinzpz0yqxbjfsavpx3d4o5cezms6xqermqri4is087b6o0kb8bukz40gvqj4vk2ug1eizyshz68wbllyj',
                name: 'j4aw3n8wq8sd7epwdxqfa8zf4ril6qv6myylfqjqf0p3a1spwksv4n9gpmeuhbsz1r9jjbw4nnb6d29bj3rcmxg9v5hs230ybrkkvptj87gfja5w1ufcw1olgn9cpr55raoccyod9o8ec8ow67cci96xe9evwo59',
                flowHash: 'vk0ddaihkhlzvfdlq8hxvlidompazmtgbyu5lgri',
                flowParty: 'bmdq4l0066ne9yu33pifefpz8sq0md6ov0s6xpb9v8jk41rdj67m7yx1hf6zb1ocn5axu55z80lulaq1u7o65881264z16ogvfh6b7tk5ix0wnvbmc4ac2o7017g8i8e66s3iuw43a6l93rybw4zshg724t20huw',
                flowReceiverParty: '3w4qy7ae63yevrwd0n3o305yf11wwqtzrx5mom0xte4575264b3dd455r19fcd762xzdnq0svxz9gf70jes8d7lgxgip5df0ejun3w09nbqsnec51reqirak1mz0nguiw29d11jj8a2q817uwyw54fq8g948p7jt',
                flowComponent: '8u4ibmqojvl5opkp9fe1qxvfztw46ulcc64whmfz1vcbfhkp7dcmur8m6viprw1efmriapvaho79pmdohbvoqtcgxutsyfwmoeyd25jmnreoer2hgiesri3si509k0p9i8ronawys8ynw6r0v3r92tymipc8oom7',
                flowReceiverComponent: 'l13gmk4x5hby6rahpu0csz7yl4sgxixqsq9rvqjarc7qfmdg8q62r7jznz12yv1emhwun2rmp0y4xuqter5bc38dbpvpqv346nnw35yhzydp3w93wulkil5q2wq714nqq75cxbajxfu5rhrv44q48tazwu0x8l3p',
                flowInterfaceName: 'w09a87etaydhvv6co1iq4ov9d2n797nrg627ri4xm90er32qaiozsca8y6zv95ju8osma8qxmikk7s8ke9hbiaa7qdokmvjqqe4mw0bwpcevv5993rlymsjnj3cd7m2ps9bw8vsfc8csosld8ejpj1w6myxcaai2',
                flowInterfaceNamespace: 'u6g03xqikelpuwj5svgtqdg3yqkqitth7kadky5tjpkskd4vq44r1jb5417ml8jd54sl7884q9nvb3rx4oovw6i2o1w0l94fb4bh3y53ogpycgto7y5n47kej4day1czp94jlafjqtdfunfsshl8zmk7rrpf3bjx',
                version: '5nlmoc6yvusa67ipfcwt',
                adapterType: 'k9s3xub4lez4ne1yoerksketx6so3p5ugqygbjmt57g4m5nmoypthzbahai5',
                direction: 'RECEIVER',
                transportProtocol: 'ihhaxxo2fzvle6mase8qo9tcvmzvlkuollc2reo0grk538fi8w3wuu26xn6y',
                messageProtocol: 'l5qr09g0zs0086q9t7c18odampobmnxjt5ojv0vpy8kszw8ujxd8t9esjj0n',
                adapterEngineName: 's109u9rv97n0lvnkulri3irqbe1b31guoj49r8alrsizilli73nf629zkf8zkapk86zol8jgnuf57eumv1dgz9dtwyzvs5y5etox10jc3hpuu7msjil7i0gv7rjvk7cvmp2sbq0ncouy0s9y1yn228gxloftdzw8',
                url: 'h1cee63t0d1a1we6rrh7aqgk64avrcyiv0ywaace2y94st8t9ghqytlnfgk4zz3euw8u94hkbi8dq0ahxsrdp4nsr0rt5mt255kw1nsvewzvvohjdlep7x5u1edn42mx5gwweq7aqqvvl0r87zw7xcbp69igjq9qm2rswhukrk32kygrbyko4fzczja2d42qoccu3r1tf7vld5jgj2xxf7i5mmgef67sb5cfqq7x6jk79juxofykicwo1ndw5b1luc7f0ku9iz91n7eo46xty9mr73dlleo5gxr0un9tw0ld6zifyudys38w5j8f3z6s',
                username: 'gk1ov1da2hweppf6rppnd3zycm3h4lw876pta9qkbz3iobisbauym42w3lax',
                remoteHost: 'kw3cmo55m2xi5olzupo288sf4ix8sxhq1735xvxa5hgq3t4h8yf4wh090iikb5gl39in9jee1tos4agvwpxo00l0e55cwa27qsowavfr6xxffi6vqwno2ahckc7yfpli7pzpij7omg0he97z2ggwle1algi3kyvq',
                remotePort: 1298602565,
                directory: 'fyuyr5la0vawu0n7uykwwufgi3ycg7ghvbqltdvbyf8p06aczls40i1v1fjcfu1nxr62dljhl43csq9x3msbs4e3cyxbgbyrua2g60a7yb5nh2qwkk0l9s8vargs3z6xwgded4yc9ijg5eybzmmrrpg3h9s7bvdw6cx74xd5igh3dol6azgv8vrma7pplp4ftu9vnpsufzjps2l5hbrhyluvc7ysthss7lt3vfnjcposyd3li583o1xbnzv7dabmrcxvg7tsxnfu0chj8idqhyg07tlxtwrrwmyjhyumwociweczza3znfziq7g38dzif9dod2c8cv9t92hxl7vdpxbq1fr4tgz1g6qocijdi6z1py41dmy1dygneyftxk4qgionhz819blfn0lmqrjt4jsfoesc1seqoz2362j373hlsgz0la2rkgcu74n0um1qrrmr5ra99r2kvd67arff8xu0ys4ekxkgxinp9fcsj97jx9ozsehmoas41331i1yl1vwtzv6yimmlly55x245i74tuu1ppnix0lvukuzv3agz0oeyc6fod4fckhi0f7hn6oufb9b9sa9jwly3uxv6mbwtx3vmplgc6lxgur6edlao60wc7eeqaibe0dje5wkazufqzuc9zt28txp471uchlm3zh1y72ecwxogky1p07lx4aon9rk5zylo8wmqvcu9a81zp6ya54unz4aasb7y7rm3l6x2ym4ccyt8ilxuhrf0kisla2ksva88tru11vgagehfnduz91nj9964sa7n2okn1oc6rziliptl9vj4l08vm31gpsvwh0i3p6do24jm7suh05j30har0awj3ood9k9ax10ga0xl1b8aaft31rndue4eszcp7loigv1durg1sicaa4i728fih5ihnvdhorpqr0j64jwmfudh371960n2bxj1koff3o2cgpl2ciyccjv1i1rubxm59iabsw4rebl7a430b2da15afrel1eobh4bi8877mrs0u66qaneg5',
                fileSchema: 'qm80vn8vrs4pia4pmlcd6hu8k8qm9d1mta0wtqgk11uhjs2me44oowrvxo1hs7agm9wskxevnuf31dfqecfdyvvv780pt2njwc7ocxcycvqw8d40iano8s3vnkqa99ap4wvz8vo15kb192swpcg38c8r9bgbrsfxkht6i4u0j1ex0akdjucey5y9huufxjoaepp831d917hsy53ldiaeu4eazea4z562h3qvlf0317khl1m8c7nat15tcla6cpgxgko7qsp3k91xt8bbv06q453xbkkinayfz9fkhiw9drknad19e2h67h4ht6vtiglxguoesriz9zaifwlxyotukflqe658hrzygshcr26jvhecys7n95kufofp9u9nlvvvaoyx3qnjxb1mhk1lxi425tw3jl7aqszb9bj4r10usl5seagn2pikek5awyf0rz80c3pugg3muoce6491fa4axw3ryh3iidl9ld7kc38bnms96kn4e603xftxr676ug28wh281m07fpjnwyq4u36yc9p4ezpbx6d05bns1zlqw7q8c5aflk8vmo959a482gpugqnqa6mgut4i8clpkdhszur2159jtf2cqgnss8tqcg2b1gyb2jizxfil5own8v3uc0ezis4gc668167hjaio2owo16rr29pek4gswqdps60s2y78bjcr0vu9w8acn0lzk4auo3ym6yfpi58zl639dxflqw9apguxcl63c8su119sceabs1fx6ege1mu9fi32qzykmhsba27lnuppzt3l83yz7swukilirt29gftwsci364nkzin2wiaco6y4j9yux9jqwe97qgvqeq3f8crszur3mum2eeyuwk2dcmgf2ffzdvtopotx6nmlo9mmp8vc48nlcv90lf03ah5b4uehqjfo5li7hh1du2kxpgzxjhj5rxw4lpsnfz0fyrhibh6fwo7ds93uwaa3xptxxwlthu1nxhnw50v30ym9s1ereeukjo30tobi3hqf6xr04odb',
                proxyHost: 'pfmqz7xabggu0k30zkfqdto3ymjbw3sehw4gec0l29cf2yeay68sptzwrg9v',
                proxyPort: 5291065715,
                destination: '48lexcbmneysbzweeo8lojoye7supxlg05xj5jsqff96qvy5qxjglmaif3aupi4ussf4zf5kirgokvcr5zyvxmzsrl9jwb23ygxw9efxhkp75mwp3pv2umlexk2xhtx2l83g0a9hkpea5o0182k9j7tyi6ekvsud',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '21or7ouml92muecnup5arqxbvdtn6cej3uoxcd1sq35pvgyw2elcv5lnur29rwdd1kub90hxt3bi089o2grttw37mo8go42h8cm0l776pfs7uod21h7r4uxr7lhuvbdimgbccztpi4y3wdlcwf1mv1nljb9cb2rc',
                responsibleUserAccountName: 'gcxujet4jj9vaqbjzi64',
                lastChangeUserAccount: 'vayvqrr35cv5pzben5xp',
                lastChangedAt: '2020-11-04 09:41:10',
                riInterfaceName: 'cuv6om77pug70uyqlnopslpaqjy2ej1bpbwy7w2vwkxc0o7v0b5xc8fifxxfuhgzq1nj7xj7j3sx2mediyj35nctcprc68924tzhbkrppjyq6w1lfx1bmfdgqk1j8d3pcu0txksw4prm3oskuue9th47j8ymrf36',
                riInterfaceNamespace: '98ehqrc03kl0kenyp2sm14nuvlfg5r32n3xald962uxplljh4xf0pfdh17ps6yqvg7s7dfs6usq6xbigpplu6j6tx89kgv9xssvfdgmhcabwt7g5sq59g0kiwf47nh6x7w0pekelsgiummkles41jk0auuj2azd2',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'zdm7fdsqofvp89tveswoh1woccrwoaxoi4elfvdh',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'v7eag3cjg12waa1yw8my9ns2opihxujr9rzsec8jgrhbs3bwuw',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'j59g8mdknmioafair8m25',
                party: 'z4n8ib81bsxmrxhdw519ztn2beah9vagamwr7rxj7w98aek9qphz1nanetnexaby6zzld0iwnajvzcndqqjpe76w2qeoep9zim9rzbiwuoktgdl4x2gkq8be6m6bikehhs8thq8guwrh9t28hvusre4mljx5l124',
                component: 'znikmeanljpy2gu2nrz9kvo6xyv3o9vbtr7pox93h0vzug1ke935mx0sc5bnxa41wcu1fkf77hrzbmen4zthgzvyola5yp84xuv808dhd3h9yghfrd4ekceh696s8205smmsmnpth79ckyd07ynbneca70ypo4n7',
                name: 'm5v65vrwnocowvr78zfquq437l3o8gg1c4y87bneq4l9rcwoe8gmfel9wr9jsbi7s2p7ksrsgz4azl1fpvxh0jcd7injfxmdmno02ba58vd1n6b2mvwbsf3292owznbnhtqur455omtyy4ast7f1rfia2p0h3cfe',
                flowHash: 'zhioh8tkjy5mt3nygpxpxkmvpnobrpm1nx1xevsw',
                flowParty: 'ii40052s1w6jtk2kompiquvmpzmntb7ifv6tnq328fh4r9episga3j18laojjs2akayuylhx611ev08od5ymc0eje5ono5xwwyvluxphehxfuwqihs0sd6zkdi6u3a30poawyvup5unwddju57l3aex64acm94no',
                flowReceiverParty: 'pilriidnf113jfkc0bbxl7fcs7lity7rpykrqim4sj1b5w62c9q9xay2dhix6sgof6nkwbexq6srovon8hbh1ig6jby8i0ob068dx1h5gx4meh72pe5z3vf6lqf3wglzwbekr12jip2z2ruu4qwp1ippbfsox77v',
                flowComponent: 'sr94g06di2c8frzrkulzpxhfsdyvuonor4lajjzaghl1iwku1qyz841hn9k6azb7wol3p2bih8qxggfx7bs6y15bdcwhm1r85lro9397p90colt9x7fpjiptmbe24l0efv25wcjdvrx4pl847osf6bzuuu3dbju8',
                flowReceiverComponent: 'nvgmunuqwx90k04tqlo6d67ay1ncp56bzd2q19b3w8w7m54wiwqs52vxvpmvh3o5qkz18x8tf80jb3knoh6zdmciswrk6cgvsasecuy6wnokj8hldhcb8t40cnn9n5405namd3m20hde0nqr4nki8lzncb2jc28d',
                flowInterfaceName: 'akyj4tfdfyfv0tb9dfk02f6gu2900htjtqkdns0y0v4209xnxqhae06krj238xidkuet4wzx07qrgcpdfo2omzirvalurfk7fo53npecxaivh1d8gw9ubk3ettah502j02tqlij36d7jjk169013rz47kn2lbnvv',
                flowInterfaceNamespace: '8dny4n3ytdlmm7xksar343c48fannvx0dqqbb9hnawywsiq769449pu8870w8ro6qmtuwoe5j2arbk3wyl41qn4u8n3fknuvct4awsx7evmuh8r0vywelqi3yxa8vyqqnbkzczbn1nv58sxe73sk8uk0qlzn52jo',
                version: 'ferb9ct6tgzskeonibk1',
                adapterType: 'x60o6uaxhwbc15yvxz9k5y0bbklcv11k2ngy0fo7ebmgqfvd9ec2hq7fyqm4',
                direction: 'SENDER',
                transportProtocol: 'g0g6u7081y18cqrbmn9yfaixn0dovszqy8d9tsseabrxei22ib5j0on43mzc',
                messageProtocol: '0xlo9zlw5tyeq5w4n06o6aikcs3f2q7tmyf27pa4t5q8r245in68gqzzl5el',
                adapterEngineName: 'npmoribklf49qnpxzbgqig9p5a3ylj5572z1yvpg7k8jdl0mj3g92t472j19c52xblbip5fndeu6fvqob12j1ytditik8m1u28fn4ecwg9kbckficqxotiujco5zm95z0vvh9pw7cwcy8jg38hxpnj8phfekivii',
                url: 'rzmewvmw62yer105y3xuij91ds3dafjwubt20scdit28cazvstlgphzs020lsutxjaz3yt505rr40xewrw8m0pedj6d33qchjmvzamgisouyesszscyjkkj4xrgtbi0fsrt3wp4czo7dnrqng6e7veb9jyuwtjlvgmxs4i1wbp1x0kdvnirc7ht0w60xu5pf2biuaf6n0r9fghdotil91f6db8841viffi54x7m22c1wxowri51q4z2njg309bsalq5bskmhf16muvbtb8qi03tdpaqity0rslgmyspgjpf3z9s8ylsm1okolc4bdfw2',
                username: '7rd4hqjqmr943gjn37vf1ew5qr7mytqtxpff2o987gnme3ffnzpyhdgms8z2',
                remoteHost: 'p0wy9n9q6oxqo54jl1qc80l0uv6bu1cy5fzctgqv44uzuurzn4u0dh15y5x20dmg2wadbpq57q4uxx35ypzuzdbpjaas7ds1vw35fitpzw5upm740tsk9s5yjqjc6l7w7lo30holyyme6fdx2t0jsfrmrj7zg056',
                remotePort: 2489584800,
                directory: '1xd4pcl31fcuufxu85svd16et5813ca88jcozfsbdmj00lwmd0q9dkwmxxzup3hsbuq8ldhggj9guqj0b9e14u2zk1z18ns40obyi6wh2biea82yjrhklt2ju6smjgjf2277pt5q2d12981atd7zfrw9ea2nftu0xpbjy1617t3fj6i3ynhml2ma2ukdbx9egoxsak5xsrnd1knzah1nroirq0aj8k3781943tz90fwzr305espsm19ckvm89v74my2wmpbse1dyyc82p8d44alwcqqpstckgmh7y2xaksrftg39zgs7e7uudg75gqs7pml2pq3i5jw5uo5iv55yhlijf252i96kwa2n9ojvnvkpbl2jz25fqixf5d1nxmrzrrpgeflt06xqw40s8rqi8hnovvhyr7sx9lwjq5kle6o4e6slvhf0g8m9cicpr6gxcngi5aaqp0plcietewc982rk3020nbd7y04d950k4b8rhmeo2fei2tiz0nqd82oacmvzqv4smiz49acvnbwzlb9j5dxyqyhe7id12i9dszmss2dk7hhbg5p9czyir6yhsiov0x5o0w0o86j7bbtsbu87j6tq3yi64gkqvolqgqei2w9hvmoo141auo72xn427exlok99a098tam1oy14px83fys3bajmowsjl23my2oglalk5n2459evii0sc1js3b8hxyktddbyvfc41z5s1cbaofittkv7u9y512wuvxxqy93lv5gmy0xadibe495tvcbqps2fhbd6ais4s2b3b3x1x2ujv7plnoy5f22v9gvta70ly2blxjuox2indblofsgmiomfg31wg5lwzgomikrl3ud4dhj948mdbwh36relartxtc7laqabf7bwneunnggznh10jyqww05fhmhvz35boqvs7wxewqlgctpw0s1ul01lljm979odg96ju4khijz2n37n2d1t8y0mpoopddhtwkv5uxhg9f7fdyu5knsvwibk1ijghqgpx92cztbz',
                fileSchema: 'riid7fij6w7t9zv65skr9p4um87j8uuh2hdj5v6q874daly71e3un9jzi0a6cl2kmsm9xhx1zkhyvaay32xbetrskppa7934jua43px3v5glt7hnucuyij83snqjvyy43lnc6bjmhsjl4puv9my6jg7ercyn5pglxq1lq9sp1z19nx6dkfqm5smxxeg6dv8lu16bxamlw284g2xo2llflumo2xwcui97d1axgussg8ottlgsjjlj9bdypl8w15jta5chauypb8zbqfo1ohayafel4pmfbe5ob2awf0bx502zi2bx1esfnws6on6vn1oql68qlr5ksmrji0ni0a4cqrqonb7g97b5jccl44o250v4x9xctd8cfgnyrejzew4c5twv14q59vz875xjhq4jrlgl7zoe9imz4lafqmxo8fkpj5c2w9zm3g5yi9tjalbvgyomih03sjnrjygg8vmb4z24y8wmsv2utfyl5p0xs04aau1zry2b6ry675zkxbxi3amq5utvhs3dedbzxflotulswpzbybtzf0dthikbow2doiay3nwqlcb844zfr8navymipa1anmm8td026r44padokkvd987sq8hxc5362dvm273qzbyld8w4anxaa5af4jvtffzlx4ldpvv4lq3bq403v94yln7auyvs82eo6ew4dh8nugtfr77ykhlnwzifa3q95zewfncfhx8j4ez9k1ygujs8bvb3elpw213pbex9ixy0kf95np6w7x4rqy7guw6ws47j02p5k91fyqmqmjvl2j0onhmz6rjotfztouov25hg0fgf0iowhn7uzjoesxdaov3e8bc1me1e0b17v7obvl7jaq9vx5b523ow5wtbwzslrrbbma1jaftfm6br7me0rr5ffr0nqgv8l7t26xxij9oel1tfhlw6r9xw8u0t79tuvrgd2q01e5wiuywejlijnayelx3mprm7xfp1f8852593huopgt4nos98hldn4jtuwurs5gyfsjwh69cq',
                proxyHost: 'h9nq5liddq1mtihfg93a43cocpa2is221a1sonbs9kmz3ly5pepee6z9tweq',
                proxyPort: 7071914319,
                destination: '2f1kaxhn9osk3nmh52lidztdozvefvk6xq573nkg74zoot01ppo9p6p3dhtwv7kr0leucjjak3lzpwlpbhe7e9bmr3n9jxtdw0ake4k16rk77em0k3v2s2btkldgbr3vi6u4hcuf3862bfdocy915lzlgc991x37',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'e4omkrah3jgm4jckdt7bnvc3v91s92ixxkz1dk1nfu4t7vtqrzz3lbjy77qwbotx739gnlmwrb1jwgu2v4nn8thhfe2d68g0komxrev8l4q359ojnpxh0ra61szceg7ftfc5yz9aag1zxfetuz4a8awdzxcei1yb',
                responsibleUserAccountName: '41kw8lnu9yxue13op31s',
                lastChangeUserAccount: 'u7uutdodcozs1fw9qnyn',
                lastChangedAt: '2020-11-04 06:55:51',
                riInterfaceName: 'jli4hj0n4v90pjuh2bt5cygd7qwp56o12rsvbc3xpvm2ouqhjg49jx03phmhh5i18eu0k2wda4dz3jszhz6bqdf1n9zct96pk4sl1qa474eogcao9ffr5znt8ahg9et0gzu06jaljivrmaqcllc3lm3wiy4vzmz9',
                riInterfaceNamespace: 'y7quma22d0t385sl6n46be8didfx0xskg1c158g4h16a1mvyn7vy75eo2eqdinttm5fkee59r77415tn9ruohgsh58u3e070683yr70871c93o844np2ar04t50ko4qgexn1dy2j2rl1gnpeb46zb7dyouhp3op7',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 's807tybg922wtf1yza0n0uf7bz1y0zahdjyfj9nq',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'inskzsen1zsliz35rxzwh8w8h5cmtj1obbg8yctbl6m7jd031y',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'nkpvaqenbdiofe3p807e',
                party: '6aoxnl78ubqdv7qscanbwadv5ywlk90z2e6euw28ahpvcc91w8qxvrakytqabajaeuzl1bq84tt2w6phigk901olbc4nsd1jext17hro5y6ovzpebrecyyqsuxdgnxc6qkwdluiovgvymfm13ynnopuai03ohwd94',
                component: 'je6bo1n9r4vd36peeb2jajyourur1e4stm8qs3nfw9tdgt4wr762f33ezl4blrmpuscz3xfpvipqyczbuuj7hk915f71j7myedpdaunweljfax7szgvffmylrfw754fo6gch1idg8x2s4s148vm5e54jye82sgui',
                name: 'uzwg1yx025veu4vmw21504k9g8ragyucorls4r0n3tjn6jysqci3ot7g24yijenkzhc6u7kcsyds1aqg8x8iazcxdrmdvoiemsf6u34oe8jnbalxvmp4d28driwbuadwc7fqbpklnz963oa5z8a2t6vh58cu60md',
                flowHash: 's3j8x2yqohp4euhqlqb8tua729cfnwmm7351t3sq',
                flowParty: 'jnr4dwhq320p0a4kzqd2vmo2auajfdz4s0rsuht1iqzx9ixu7ku68befdqanrqbjc8zlkyfaoi6pqa8fyvrwi6u1ntxxfen2gfz6guxepwj4tvvw9ipr1yjjq4hi602z414xj5opoeqn713jarr23gbdrhbidbjc',
                flowReceiverParty: '9540k13nxrqeozaj3z1oc3t0cxhqmhrd4bcjxd0114sxq44wzd7rvahl40ihnbzcejxnnlifkj92h0d04y69jj95ojx7zzgi9nlxdd6f6b6b1rjy6czykhqqb6mrc6kwxjeah8lfesvo7nkmg3r1mm29juwpgg4t',
                flowComponent: 'rlul7lns8faidrz7to65p1mmv0eajbmyaasgwu00jsg9uga468r1y8rz9r9dfff2ed2xn2q2uoytmprqylsn5k1y88rldh2yiv2dzs8vgwupga9uk0y19xuvxxa8mv1d1jd8m3ew0nd6soe0agx3k03iagobhcjc',
                flowReceiverComponent: '8dags6amu7o034wh8f5c19pudtiwds5z32fkfh7whtekbxpd3rvu69velr8o150r8at2n60nup2lmhhsq6pbgka3c0smkf7itf7vn08ftjahppscy57aq5uql2r30r65c3ce5i8tdvrmifq8y2x59gbwvnvmjb9y',
                flowInterfaceName: '3sptxxf0536uy549gfb6kvjpbsk9tlyshltj3ex630yv2vifqqh6ndfifns7eqx2e9gu60vp6uq890hxyyf2hpm2swhqi1k87fexjf10c3ovatflhfe8u0egotzy4jjl9e1n9p7ts0g9oqovs3353sxrwj4ix4uy',
                flowInterfaceNamespace: 'btmehln2qztbnhhbfnmjr51ittjaehxgwufdhwf9e8advh8ec8f070mc76o2hf8yfdjuht4ms5c16wqpedlcm9xhs8kr40hapiziyi4drq7r38qzc18e7albxwafc63tpt9cqnxse2a03zr3z41mqsnct0fl8shh',
                version: 'mydoptceu7qtrghxvkxi',
                adapterType: 'mjfdjoenwtvp2qj80gpzi6ntdb3a3m7dq14h23r4y1yk5dagzvsoczlgfgh7',
                direction: 'RECEIVER',
                transportProtocol: 'kw8mdahikz95unndasooic9kdujvgqaoej0iiqe4k7xq0l965xn30av8wp7x',
                messageProtocol: 'jy1hlohxa07gskc0xxbhitivouwtdo0yoxcu3xwosi6sn85h13jjtghkce6x',
                adapterEngineName: 'sud3oiuyhm1u1az3umshxzx3qz0qeuovmgtdz9xq20a01qfjtc86ayf5lekducr4wvwbzcukllssclu4jjxgnsyl8c6yqewd1nly8m37bk4xp3vo47hq2o1ki5dholnozyqbvyofo2mnruvb0ny5mdveegxseyse',
                url: '4c1yb4tyapq1iwprv7p56fqe5jihrfl0ycpdndbprgygkzcgpvwvslc5b697o8g4816uh1krv0vowhwi3465jius8vwwixc9ofvyk32pj1rlfwkf1zi7sk66dgjcamqesajplj8f38lgtcnhsxe6ijc90gjeiabig1dcb8njywzr2mzfcs8jbuh240dr1l07xvzrybv9j2a7s3z0df8deoh3vjfdhbrkrllw20d5djkjce3rwkrkkmmgbz1nmh4oibm668aqusijj12ve3mbrotchwc6obi2kcbhfaud6mwy35g3fkbta255de8uhsnz',
                username: 'zubth8dd9qgyebc5sm9h8pqoasst5agisp0brveck1tg6u74vzcaluiqcfeb',
                remoteHost: 'w7x2iiprdjkktu9tpvdcf6u7m33nqtcc0rwk0m770ppkuvccgbc3vbkv3azfc2d7qm8meovbfco9z2ythfu1zuanonxghtmhu44us34e29x9s92k3806uivmcv1fzvk13yco2q42nqy36xdo8im7oe54pp8vgvia',
                remotePort: 7654381297,
                directory: 'jahhv7fkrxmfziu8paz91sbkk0n8iyrsfixz9s2wdnjrtp6gvznfxduxkzgti0i02x0b6s8hw4j6a5lchmf9ojvq6tyki0q55m0zl0bse0ki9z09ky1wpcush65f47ue800i4no5pwzo1jekpzejvtfu2myhjmyq807jsevvtffswl6bq0fu9w4r5me6dlkzv85a3zbc6o3w8vpja4swvin8017r5im7zg14odzvzkmzcubw42ojkl78qagtvaw66ogte9mf5w5expe8zenwmpay5frwb1fzu6mdpxgnflmpc12z5bdczree1qf8372y5ym4ptach4znpk4nohhacxw55d09m7yxmzk0xs41f9t5pab9q8cnb68tn5iz6lbhr5h43ewb2uvgwk3sgx3wan78xyfuegdxrb0f9ten1bjylsgrsu5wndwe4jiaujrdlmcufgvmv1krlv23o8to8e49kkcf7sctmyb9zp6enj3p3xiteqqutrtme0kba0wvwg9ufbhnwqk3xts3u8d9uopfu8i3op7hgaejbjwmpv7mntzsisll2gy8t83lwdn7vcjx1le7iz7ui342nqdr3ghfi0udly1q7a21jln4q2aa7wal5zhu0r8knnm7e1qqm0z4m99dfrutu6dvhvdplx3xy2ptmc2j5k2swex9rqwog64pt5u539lo2wxo0hez9qraz3dx4gu18958vcfwfc8t0sn5az04zu0f8gz6y5r256k0ks6vx31w4jjmlij40e86rqiy2emkgz8gaqqi92t4013w7xsl5tm22bvssnd9fcxtx89iyqc14muc6bp140lxtyaa6kt32k8syt6ob3se9jvvznhu38dpw1uivwgq2zt0n337xmv2s5qsfmlqe4a2nv06jvqqsx25h2w7n5n7zbf6pxq9ax4sgop7iklep9t50uk9rsi34p8t8hzq9ga0zkx62fyiv1w3e69om09z8z231qlhlwnka23k2kimepa1jz5bq7n3ab0x0zl8',
                fileSchema: 'xhvs1q5z4r8hu35a2cs3ydgffys4oj3n9esfcju3zadmqfixy165o2orerq8ywltfpol4c7smkkrb5ewliu933ug2hlu017v6jpd6gz1xl64miiaqhobjdqbzsg2gxheysv61avfqsjahrcshlctm9qik5sws2k5b1rdc5s34jtge6gacgyoo20o5e2jlmm8d5ypgdwz5ldr50264gaomubq92a0wyp0qdmshmjmxue320w8bbwoy6j598sqmks464y22bkvu3r8fy8w4d3kv6av1dgjt9x9zhqr8jz7ts4vb8h32srbcjtlg2at1qe1ch7yt4famo3id9oe1s3jloe0msrak1wp541qp2u0vg5jzfsoog0arqize3g77lbxz3pyh00u5ea5py4znqg214vsj5caf1f15a4wadbsrnd9jfnahk6sf9q8xzenmiflb2w9jowq9sx9w8yjb7071cd7k2k7md0jpv1xg30tey960mx9h4ub1qk5lhucx11ioqf06mmhamxi9m5siidcgrged3yrjykd2628wy32lncw2git81u5asxyrrsy43tp6413xeqr6anfvqcvqlmir1gvq1gzurrweqrqdo2bt2ia0sfoypdbfj7ywzrcdh8azpvivgfzbl6alafmfhsvofqji0eu8ufg0l0ayg8qs6w4vw7tuiqrdyy4g3ud148yb8qbr6x4juifrrffqm7lzyz13wwwr18hctmr1ahjwsrcmbgz520fryhxygdhkei8vk1onpac7jncydfagw7vbw60lw6735g2x2p3ucjda2y8lwv4ufoihadewn9z6pejp1wuzdnqvanp1n5oyw0nm66b4xbkpfe95v5alygefodn8ixlc7eqms2zkyq2v5juhz95c6nzhmfw4egzks85eh0cbkf7u91tnnag05ba173jp7kvf9wqm1lty2pg10mylhj0pktovbk7hbpmxw4y933f8k4ua6ekfhnf3h9ylugucyq5idlq1ynbt59g3ab0',
                proxyHost: 'qt96vwsfbbney99z42shurzeqb5ws3dumbmtc8orn6l1epsmt0c9r97zhae2',
                proxyPort: 9141538538,
                destination: '3y0p13vd0u6zvz07quewrd3512t5rl6sf4mrjf1o7auxovodxd77ap2xigh8gbz9yuc2y759fr66mbgiltau7b1wm9ri3z1993gfgf45kpzq3gngcmj797ajz6qvj67fsnymm05vactxl4zlwqvo0nr6j5sigspy',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'kv2enu3q0d08auue11zm0f7fzjolhpmr6eq2snr7my7h733egi9glkrq3yehc1g8b2qgcgjtb4nd01hzbsn5knhgy7rwvpcf5pudv1sk0wdnyvp7i6kz5rzpdwomac9aq0s9mj8as2d0xrdqk7fdmz5hyswkuwqr',
                responsibleUserAccountName: 'nzg8wslg2pl6673n191x',
                lastChangeUserAccount: 'qqelocvtopuqnvt9j81c',
                lastChangedAt: '2020-11-04 01:20:29',
                riInterfaceName: 'q5yfnkrq21tvr8lxe9874izizbc5uf6xazl5qhvp2tq75zatlavnnj7gwhcl98etzw1wvhbi8yr44n6drbtv9n03lst6x4hng0awtl0kbn2fbqdopnxpmmdaylooy8oi3plx0469pxr9r50qnayqgw5rp7fb1x30',
                riInterfaceNamespace: 'yileyv0ppe3kgpunkwytrqwh5ejuxs2aywpro3fyel726797bk09ns0c4391311bhm9idtmp4u7b3nnu69rc3inmwuw7cxsu3b0cofu4v3i44pziu2r5gwtyurtzs8gqxa8ncvcjelqcak8uobczri0jwv8s4h1m',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'b232v8cxc1xpbncsrp26e8h8wd5gf6d7h8sme9lf',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'hngmrkmjcwkiy5bg5dt2v3pxq9l226x9x9dkokdi53yi76hfcg',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'k4f9rp9fg6j14bep9k70',
                party: 'pgwf7m55nrl4acmbfyzoggyywp4rwx1wgskthwizqw44kjdk5kjzjjsn64n396xi27eb51s1tzlrml18xrbpphhsf7p9wn5vl3h3agyjn51tsmgvkqb6cp9d21al2wzoafizny26vfm9rvv3dmtedr08fnynvnb6',
                component: 'vvjhniuz2q8hpe9ar178tzp9q7tr01bewo1dlxw1xh5vbkcf74xnyzvmyn2uw8py8zzcw7jkrj2ncr6zn6rzmab4e6zpjptx64xbxcjy1qafk6145z3s85jzdszze90f641dsevjfdacvv1btebaguv38wptu26hk',
                name: 'h96usleevw67u10vqa4k274fjyz3yudn1dyznx18mlsxd19nuhdtrinrc2wv00vo4ubouic18sewmr4xlqpcmf374qj8rygwrhnagw4wlek0qstlzbrmbgp43sqtjgzpfnnd432k3zb2l7244recgi56ibn8bbt4',
                flowHash: 'q9ldcgwny5m8y9qt5ygoc7bc4xn12fxy1rjt1vlf',
                flowParty: 'j8elu3u77fvg8w63y7d3w8z4pk913751dtvtm7o30rv45qsblxcmyao41cut22fztz7t0i99hragz1xy0g9lfua8pziwp6ml1qmudbttlx5vo6jin53d097563ukp4uqthk15swtqyy2xu5zt94pb9de7mq6h1vm',
                flowReceiverParty: 'z1weqxsfot84yrvkxffqnote220l92jqyq2vzf2iv63ci7mna426hg75lql2f41rx1udxp4pvqzoo0tf9a8tdipdn4awiqau8ziqxppxc6tzcjvvih1cgqcn98rh0ld3yzpuo5h1dfqd6bcws98ufwy88qn3b4zq',
                flowComponent: 'smoh732sw9wp514ktw4flclg1mz9f2exolkmadpig115072sw46573z8s7gw8aqtwowsrig9bywqtp39xxsqwu4f2b3yvg1pdtbenku87tbv53upld533amizefpzo6l5vm3soyyx5j5ztn5k431w80ks2mycr9x',
                flowReceiverComponent: '6bxcz2s21fzuytcwebgcjjnbzv03pfz4kumk5ut70tpobh6d46kbf7lpb61jnbag9kper6kxtmqvfofmqgecig97pcszflpd1vbcrdwrknmvukihy1sxx96qzb5iehemwe3cmw4o3hx6qebop5msdmwhs221wcvv',
                flowInterfaceName: '0uzmlh4hn7fwo8tqzit84enqqw06im4fghpdw0bia1wztrjha82bb59h6741tl0x7kcggd9jkn6mhoygpw7zochwo1aqi6fk7j6ae48qevgb9smvxkubmpn0d9nr1naxmzb1an4z3dwef2sa82flcuona6s88usj',
                flowInterfaceNamespace: 'wqcbfpfo128614tg4xxw2vgv831hgwc5jc9yjsvql9oumdkcd5k1e4seoxn7gc9v8bqz7lvvarmtqnab2czchreo089utqqsnae03u6b0m0vke64lz7go1ylywzfvyy1onlop85ddd4w8vkwmozv60sn7ptafd0k',
                version: '98enw2mn1702b0fomfr6',
                adapterType: 'yes2z1ojpytpa2jyuj98xxfc4la2dxrgpbcr5dq9t41wnttwnk9xwwi286ml',
                direction: 'SENDER',
                transportProtocol: 'poqhuloae49bp6kkcl4r2ky199kgw45h31m1vroisqddcqvgfemxpdu5kvqe',
                messageProtocol: '4cg09gwa2r71cbwgelzz0uvbs7abm485cyrhthh96z1h8hf8y9lqc8niu573',
                adapterEngineName: 'wyxhscacmj4j0cltjsxn4o8tirlk343tc0qy2c2o9qkelm3wagyexctkuhnbf32vf0h0zvyupn7h791rsz5gtxfw0jctvmb2n0fc4d5phj9hzhj80auht0l9yvnw2iffvn9mqbl55donh390t23x0dvnmjqdl7rg',
                url: 'fyabhu3rxqv1w96bauphhoapj3l7qsd16xbuh3827f3hhs9az97v41c6ylxmhb2m6an8abbojswkddot5fvl0uqabu2wb6tflwj9duc5l92tkoiolmfbema2worncta3kufqum0bxd1avbhnlf46l9sxw2pxvg1dhwimo5pfhl3kim1x3t8wakcvotpj32zqbeb4fbelkxdnf6xhqakoqgpitflsfkngkftwskizvhjw1cui70ufggshqbka0wdnd99dplwnga5qu1s42lr5bwj115gluxjatm3be0xpdk5y2p1e547ed1ypmg481bqy',
                username: 'fwghno96vq0swnnqqkxeev1bi78mp8naktov7udwqslskzlzjh9gfjp6h9cc',
                remoteHost: 'b657qdl243jrlcvh4wdsn8tdxqcuy609b95hmpszjysemh4rlfor60tmexhxahqqdh9ih970uhmqv1s2fk95zldvzg8ejxdn5285awh23t5p0ek4cir8wqbphl6766r72q8k17hggnlnlp56crj0n2rcim1tamhi',
                remotePort: 2125179835,
                directory: 'js2x7m44u5nqw64bscfb0rseucvdlrbgmv0hug5lolfmij2tb5kx3j2hc4kublbm8jo75ku8nsv3keenrfuj0eumcen4u06d045w5611jtm8y7hgz03i11pvv6m5bv2u537h6a3zqwayndpf463aeuzp3zbbj26mrh94dnnew05ydhkhljwjlbwgm7jwh44v76fr7hovtqas5i89kkjf3gf7qtbi214769yntxiilzpk5ek0md61g13lh446xl1xrxdzadltciaqzytbikgbq3ohdx3oe1oiwb73bi99glel6shua41mijvtkkpgwui4fqu4o311qsyhz8mkdl1pfp45wzwfbmgd3olt094o0i7fuq4rkdit4j6kqabd5xqv1gbp4mb7a36cegfka1oe4qvi0b67sm5f9y7by0y5qp208kqc1emxwn0slg7g4r69cnhar2tyd9yqxy3c6ba18vr3bryparmz2fb294jwpqtxbklrdgz55ypyl93pjukkm76j68nuhis6g76ahj0n58zfk8wfnubjom4r3j5m4dnnpysy10fu43x1lttwy6jpuerwsn08ihau2jjvb9l7heyh3wvdl1j1vv10yadjbn4n2jodlcaxpvfev09mxv8gyyrae2cujiosntmelsb54oxnq87n5beb4zrnz8ng4pvdyk26ryvjt22j46lfvgamexmsos51jndiby82xvs281d762tir1bn61s5jihpc412n1i6ug4ptjyhp6oiedjhlvhm5zrgthgyoxmxaltcr45868w8g2uzsjv7xgdq2i6lqyfcjku9u5304zchuq903g4w8ubczqx1qm691dkajxtcu7se5zzyrjsjp1abn8w6ugw2xdwn44o169jym0aiuookyix2b9xhrqfe2k7ngqf0klqdamoebe8f3x31plbh7uq4c18x9u12itiwzso9o4os03aipao3mtyafbj4itv9iht7qsl4iw6mbunkyv9ciswcubiuqe4br5kbujc2',
                fileSchema: '1q8j82134eekq7k8vav0ka5fhms1q4ti8hy1w0gceggkf2s56exyuv0kyleanfrkd9u9kwgr4s9icdoa06gql1frt57pez8olfs31x6cb97n3obzft02knknfxf40e7r4anlbzja1zgma9uehoxcc8t503uhwpo575zkorv9ndp6tiiltdv9tv5n8y3f554z5w9sgseddfj2poqplfbtsa50a2tl5vxguzoue1e9ceavroo5zhskfp7vcpt39flmbwrnq12xloao3zz6er2nnx5bzeag70sxrfi5u7zsxut2anui5l9x0524t3h2jtp43qlfvy8rfdnb3o6ibtp8633cq61xk1wblnqlwvymlz1dr0cz7cs996dgsqlyyhqtwg572sf7gb4scvkzlwqq1jg2r9t8y7lklr20otfmeua7hpc7r4yagio4llcp31cw6gdxqm2pewjg63xpsqvstybsuujt3hookcihj06jbok9lsaxbxkczol0767xfog18y0swkhcpsg3qpjfgpw4fbzfoltx1vjvgwlwt2ls3hp8tojshwo4n0hxr7680f4luvu0kw57xnaj1uirdhxtjaz98kn16tezvmvmbl0x03k85xv3sv4a4y28mn9qjl2bt5ifemqtfvlh4w0ap0ee680z6x4x0zts439qdq98c0i9drlzbm5069qjn51s001y7b0t400guha352pnbntuer6n23g3u3v903jt6bbcs1umlyg2vuhbw8sqlub7r76lhqomoh3yd9shpos04394dwl7j5q94oqzj0o74zecbe1xy83krpt8e93fih3skfynzjpr7hwpnq2wr3npwszmcp74oamqbw3third5bqanig8vbxnhligexozudf2ucyhfk8ka0an6pocsstzka7hncosazsxxea0ymdv96e5r2orai6s1p3jcnho4pu7mc5lue2mejwmo4p1qbrrob45k4aowcyti4w6sip1w2u7eh8iu8gj4fu8regruv79cr3y',
                proxyHost: 'di0ig4n7df2b4lyghg2bum385w7sx9evaye1r7uyml4fqte2ibo6wja3vjdi',
                proxyPort: 7779690364,
                destination: 'm2mbewr1xfhwvizr1y0vnt38zyap8m7ze0j0ljai2m4rf14ftxn4lo881kx81t68c2hnld2t4ztgj037bwg4nuyloy6i7wpgxay0njsk3rlaw9bvtfrylifrea85kbovbq41miaxj2ykislv7wa2s8gw30k4zo81',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'axt77ocbdaw4ye51pzqhibp026tqbyveicb574dq0k617evzh9kvujf12xc22qsc6uh0r6dgwvgi13eflnyoo2vc89uvmcx3p92qzkwhb07bgmmh63w78youm1u027q9qhq9fyu0hc4t0g2zirs3k432e195zzdy',
                responsibleUserAccountName: 'lhi31079gy7zdyxt6oxs',
                lastChangeUserAccount: 'l6lm8am2aujoh65s1ugw',
                lastChangedAt: '2020-11-04 12:14:08',
                riInterfaceName: '53ijsg6n3vh1c53ri4lvam7sgma8v52zdowem1fb6q3qpk4qr8z9t22j0urpi23gql1zc7h78qztp4w6uh5jqn0gim5pgfm7qh51ct0scktwq7wcb272yuf181m2f238hd9a22fwm144vnkx9plhrq9cxd5ssqt0',
                riInterfaceNamespace: 'jxkxra1hqmhcqvxibyy941qxbwromh4hrwctmtkhzpuuhag1lv5binfcqebp92l3zxqt1181u66adtsh4oezyx76hvpz1i81gy0qyi7qk98tgplaocvt2amizr8ipbd32v3w6jrcoghcs5clrt83s7qjl8miwmxl',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: '97967aqpwlwcms19h59loswtqf1m3i6jl55zg0tt',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: '4z2smu4vo3o1cm732o9zmjaxlh7ujhn4fbdxsen1cpzd26j29f',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: '96yyf8la2l6k23gd2dbm',
                party: 'e9e745wo4pi0wsnuuh2qkyxvp3y612nezbz2sfhkx8biur4p7swm5ihhl81naxzrxp918sdgsg89sgt46lhngf0l8mkn4jv228re4b3u1rz7hsdje3ews8lthkabjjpzy44kok7qw8zma0769mxop8d3srzgku3e',
                component: '0r9opchbrr3ymtbh33rmgqfssm8pnm1w2xnil2kppnudwd74qgiogpsuii449yzkida13rluwy5tzrgpwzibp8zwl90akgxck1sv85n8xtnjjhpvt1xfxltognw7du33o6pgj1fqn47fpu2z33yey4n9om8a759v',
                name: 'g9hyxcz3b9pn4fg5n6573aeukw95iglthrqga200apk6lpvm36ft4fpa8adj72rulss65zmid6bn1o6s8s3adeza2am60rarbd0m0dolbxst1a586gyjki64mqe2ckh98my4612jjahppqnqtp2rpaao1a3jbe66k',
                flowHash: 'ass7rwqzv6reyrsxwkxux60u1gzetsdmeysxp449',
                flowParty: 'xq0hh0kd45usujg2ff99y7nsfczqnj9vz8916j2fv6c7fgqajf4wozskkfp1zeyt7n6h8b8o98c2h26e5juulyxvv5djbnemotfj0g7gego1san5uhcevw81t5v0jlsocuyk6v2kdu7pxxwkdibz1ql9k4qovwb2',
                flowReceiverParty: 'r5739b64tsfh3pogwsqgi5lwv517cnzhfjqie8gx7zo13xbah1kq86rd4tkad6tzda2258m4jzg3wj7fsbi9xllsigfsrm3dlxr4aafk3oq7m3yzqjyaeik0su1t70dn83rrlxj86nd82lijpj5u4jsjh18tetud',
                flowComponent: 'jx0avoygj69gox17uvxramlav7eyrh83lmjv8rs4j408i6jewrzilrtktqnvg05f2qa025op8f20m71nlc7m1w96cx41riaf6luxumxp0pjfjupdxib2mw6vtymvjiazfy7737k51yd3l60gwvpbdr7pl46xruu2',
                flowReceiverComponent: '9fyoi4ewask4h9phgid5gv0u0smc6knd9vfc2yf7a2kt1ab8rhhev8n1y5toi4pzr8x8eh2ebd5f0jc70a6129q17jqik1ao3wkgh1y4424krvripiqxenv5abv6v0grh4cknavhz24hx7uzve7zhjvo8ppxxylk',
                flowInterfaceName: 'cakrpxp2ml1acun4nba2b60ux8yr9efcq87dnwxslrx9shk59wpriqmus12vtleg8hiprsqbzu27c20gqcwvv59vln7d1nynzszgiadnvk4w85jg9zxgvsz8s589y2sc2f218ubimfku1o4xmsqfj8fxz1948535',
                flowInterfaceNamespace: '0ez71694ybylwwfocvonx5yasfj3qot8agmauebb9o0g82q5euaumt2l7e29s1rce8ydj23cje3fo124ebk5qvtsedbfm0ppcbxrcuuw93n39m9b3zjo21nuhjvak1ptcf6614ov05g0iogw181wy0mfb3jybmq3',
                version: 'dp8vrhhfhhvq0jthixli',
                adapterType: 'ujspecdvmm0mg5bffzxp6wpmevin32njn4np2goqqfnrhyi0txpm8yib1fcs',
                direction: 'SENDER',
                transportProtocol: 'bwenbveb92qjc79iz2r3gfz6vq67avgavs4wkcqdhg4rs6nzb96tjlvxdoj2',
                messageProtocol: 'pksfemdlkamw5tr3lyabbzaun1teken9okhmkyadbhu4ihv4e6mc38rqwp0k',
                adapterEngineName: '3tyti75suow9z2en56k6knxqtlvu074ccmqw4t5v0z4uw3g7bhskzn3bagd776jxe56smlgndrk32bs8ldjfd2zpuvkvngufrkzb1uwbdbu2ed83z083c24gj09isd73ivo5rffz1bbfegqmmbuu7gmn7adnquvk',
                url: 'matz57omhbv548va3izr5hbwk3mf4l2g9o6awaa0lt2cql23vqx79oyughe0htwz6nvx71zkmv2hg09vuns03cx169nmpwlnqm4hui4lgzt8i0zhaafwoka2gjlewr5d24n56159xyip4d3efx5w7ot5o9kc4hgxb8ncl3qy85oks4nzu2mlf6rlpcf91bgua2v9bvp5suafz0468wlnjjppv9h2m2mqr38ophqopdmk9sv7re6zqo1mm7iw0i7vswvvhmeax439mc600xrkv5stljdq3kqvjmlqzjpfbcfpfxtbb7p06y6rb68rww25',
                username: 't5xj2ikczeg2m8ybl2ydr5m1srhqubg9ks7nah4mgi8k8kaxwoh2hqm0bjw8',
                remoteHost: 'rtwu86j5lgrh7c4v0r33ycmgf2wusa20e2ktggxqi9pzqntois9cyt0ua29b29hmq002qgni07fdtk8tqh0m68rvzdvdfvl66in04a9mazmc4rhbb78k0p1di16rk5nyqq9n18t7zst6hvd53dsaskfyk2tixtgw',
                remotePort: 5066097158,
                directory: 'wgkpj5v55fn9060nhfajeljt33u41kob5kxyd6xhal0uti2qitd04ol5n27u0jkd1v28lltzfv0zta41x0b9da9qq6a0nwndwfcq0w5p4kylleudocrxci67ahinjx6z65z4epejpbnn7rzimhj1cyvxwxw9wmi1vt5t5fha1qs51cb2qp9ae9hldun4u3nz2zrlxyfvbws1lq958h48l1c2a0z0zfiovtgdxn89lvigzrnanv9ldrwlmc2ulh272kz34yii2ji2v6ms2tdcrvpejyp5cw59bjbigrkkxho7tu6tlx9f3uiy5wzhqp1rwwh5dcumyo29qgc0efmwsnsnd4hbfx91fq5h1poz7jnjoyztzfzsdtd8whbgsvxhalfpk4sbq14zrxa71jrpenk06nsm2c91vzrw8zqo9l2jni97yc4qqf85dn9rtee1fgblt9apvfxiv4l8ln5pet7ia9d4v4oke6eqioehys0z8jy7g8rshouijwx7a3jzh35d9v9nmfkkc782b0s4i2gotg03w44ylt4wunfo211w83afm17iy9trlld11wyz0diqat7pcbtnidc6k6iepifporocxckou6dfzd4j7vd4fkjoxq1dp7ub0jql1lzq3omnjnagkqxq7zzph78h2yi23e23fo6lnozzcf4nkuvu0s8fwx1miqyv8j3xvagp1jwiw5jct1o4lr2qhoxtf7g4fd8kxrwg60axikgnrvbi1ht2pho6xuz1el02q5dfsjesccuaohrkpqfo9g95omokcrq4pxrxw27k5gdgmu3sxkenajpucdwf1pk1gk571jdu0lek5fxglc7zoadlykepwv9zyxijah94wt245486w8fubj9c5q5n4wyer1dd8ta1b3v330kgbcan8xqr1wbrd5q575q7pe0eefv74low3holrvm7mhu5byfdpqwrvefahrdz0fxpd9yx2hq8dj1u8x57d2w12ju7uize2xecoitwvb7ix716jvdob32a',
                fileSchema: '1bl18e3opw561kd1g2sancrsdb08u02a3nq4fdgvg2g28lp0iqhivgwpq8jk9ga6tkkqcfbq0q2f72g74nj75g14o2p48rvm26zz82d2prhamrwk4k9ljvkx43jjp2w81vmom7q3d6wcf2ms0uoulimw1assr5pizj0n3x4aqtkcqwjr6dybmucxvh47d0ay9pnxiwb3yag6d9t49pe07266vkeyfd297g4y9g60x9vujobk3oong224l3t56fooapfre8klxqrwz1n4lq3o93badundbfkl4lpbobduck9u6oc0dbfwgbtdpimqy4712qok3kzja082zzmy7mg1yhylv7k1kcieraj2k3qvmomg6zvpz30lt4aurj029f9wevysmr0rxksiy88o2fhbyb39wqwu8snx891ka7z4y8fxr1pmkuonmul85t4qv5v7i91timg63xqy4yut5we253puyffq560hcxhni6727za5ei8ns8p1yvk3i02r2c4w3jyljf7bnwawfo7p38md7qalyt0mz2mk6niundwx8kwkg9ptjlwtm90iqzqcehm164pe60jprzi119v30ovc6bpzmnehe9aqvmmmbes1xcsnu8v8l1lcenuusfxerd0py2l566lp49lk5r9bsc0t90b0d50r7ms2sp0t6fo8b8ks2lbbovbqwnettpz6oh9zph1gund3l4wum118195xy3se10zzz7fqwuftavsg9564y8xw6k1nm64p9kggwb9oa78ryu6morm6h3owanruigme6bckn3m7yrwf10yheyh9kp5t3732wsc4k58mkn5jpx2aocc71hafmj8lx3ohs28hhhnwjz5tvbu0fe50qzk9jc50ui28621edir4pghh3ws8kp53ljt4q0ad161f85mbq6a5fyhvakog8s07y8hpjg3bosowkp1d2jwfvsl5eapg1m8l9hvyi9o9hqs4a0ao0t7yghb0plah5x0aggf29e77fh43nmg4kj98e07i',
                proxyHost: 'zi2x0u5m5r8fe9pump96siejacu3tnh77lo3naq0w7s1qy3y05qkq60oxmgt',
                proxyPort: 7294056887,
                destination: '72ukjg1kgydm0fcq7birtwa6sgoe5rle2nkuqy6nf0d0zo30r6nq3ti70fyi3fsm2fbr24iec4wm2laj065gtd5unz8iawc4f53s782l8dhd8ozor4cuqjyy2vsmwpuyxk5r12xmd7g78y0h0jcuwg1gr8xi4ihg',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'yf48d0dtyt5y6uj9vs2478zftiweq3bej4ek2ledzvhpphinxiu3pi04yxxqbaut4cznigv4jaaqifov34ih2x9nc39w1awcgt04hxyg5f7zm95fwytew7h54m05oid9bwqtgs2efygxqpqr7bgc4bp6dsi2j5x6',
                responsibleUserAccountName: '72bc6nin0uziyf60m9qk',
                lastChangeUserAccount: 'agz7t765diobnrhwm6pd',
                lastChangedAt: '2020-11-04 02:54:09',
                riInterfaceName: 'l1gajd19rlh7qc46qkxmadvjtlwwbblwaoqsblqz60gsaupxthwbdishln2itrpwwfi7z3a2e7279ohmmsk3l0antnyqz3jus7tq8ito1yhui0mc6lywz1t2h3i43jka78eshzyqyikp2avqiwgkxccb747iy3k3',
                riInterfaceNamespace: 'duv00lee8gih04r1ntqwuzkh4d311dlfs7s3f1tw7a1gb3r0z99rw8ze8r5m930zuv5xagwqlgraye830b6ewlin95nleornw96vwp0itw5pdq6295ud2yunts751lf6n32g1bo25cmw50mtezpnsn6nmy66qk27',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'bw7wqkhuekegfb0kyno2as3mgf7c00ixc42xeq31',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'pxnvn45n5ma5h3q7gs9bi9yw857iptjjp1ti0rk326r1w7oo0s',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: '0bml71vwc0b2yge9qlgs',
                party: 'fcp7c65g18wv7ebi9lshruzo6o4x9vhroftciyeb5bgsbv0c2l0v0x9jqmbgnba9n52yx5023oete40zak8f15e1jhpgww9pqdi598li8flfah7x775wyokuvxc6c69jv08m3r0vp3xyvyvj9zwgdi516soox04d',
                component: '60algwvp1fww33295exvrb0or6ao1pijnqeis0d7ypx8xzl1boh0enlcx3cv56gbm673aqhsydj7fnr74emn8lkj4f49913sjj03pdfwiew28tbljj2io8qckt3isi4jz1mrb5b3e0xbrwxsv89uiu8qjus2f6em',
                name: 'qmfxt53x9fhs3ywv1pn111c0do48mtxi0v5gl88qg1jsh5ym070w17b5jwijkm357i8t4ulpze0pklwyjtsnx0e2byaz0zsfeogmcndgw4wvl3h5hw2imjao1pcnih82zy9hcx88lp7vl242o0mqu9mp4ncswtse',
                flowHash: '7tfwfk6fgeit1lbj42stlm9cqrsrel46muzc6os1',
                flowParty: '6z7q7s8arkpb6qmeial2x46jb4bd1smfj8u68c9vfed9gutzjaaeeq0brggv6sihr5ybdt1jhavvqo2bp4xpvlakl6d3alxla66nhq0tlizovr7o9gxpuh27rrc3tzvhry9xp58573dv5obe84o8yj144pry6dw6l',
                flowReceiverParty: 'z1zp6zfem4dtxv5hm93ixh8aph9zspa0vhu6jeymltr9u0cy61tspzk2d0tcwvuv9sotfegaabqr6pqqd1q7dyylx6kmf0oejjq71sl9ho5o4ybcybu8qu6313335q5mkqw1dpxcb8rufvsyvxtaz4sdvm7yn9ju',
                flowComponent: '3zmaly95ynprhpx08aawsrxnaxsp9qisdx8flq0uun5pqso1y6183a6noou93mzveifkx5rbhhksd74o9pmjuccpdh92n40upmkm0csnnokv7agnlysj1h71q14m3w86mp47a8s8kcyzakyl087367jkhh58dx2j',
                flowReceiverComponent: '2l7rn5kpti9t7zcmvs0cnrqci2mx0u5f3oj7y2pu5thc64sefeijp43dqiryyp4cyexe0oqypfmo40p1s8dgnyvpf5hy5ddee17equdtu5ckptvts4xtnypbhlstwrylyyhkd4t7mby38qqf9u09s0hw84yxq7rn',
                flowInterfaceName: 'oqh0o9cejhc38goit9jgde3ajwhcqgpxuup2558bxjspq4v4kn7xfo3kaq0aoudgrjm1nrkxo14gynkee80dkwsuuvaory6wgvlr5kckc9lueavi7t955no9ahv2xmvgz5bm5zmihlzrwk9lmrg7iv1jvpnpvm3h',
                flowInterfaceNamespace: '4o0p7k5pyaaov30w0lshsmhss21u6h4h8k2r6gz8qpdj9moxmgqgzlx9lb50b3aj2v7jbles8fsa3yb8z5m1ujgbm7d5wv90xpo27xwrt0a3k1ac7ijh2c4ciypgnq39mmw5f2rq4t44bqq53om8amshi4m6a9ze',
                version: 'nkohq4gst7w3516om2lf',
                adapterType: 'st8uk1iqt6p7acxqu8hrw2rus0xqv8nb55js0ya6yei025hxoateasu536lx',
                direction: 'SENDER',
                transportProtocol: 'gsv22dv5i221fglu4j12wcplstj8xl65vcadyms4rtstpmqt4phvhxl3m4bj',
                messageProtocol: 'cdzk149gvrpuqc6jxkk5f54w066eo9lq9itfvlrjey4grz0b52hoqx3xlwin',
                adapterEngineName: 't8318e470wo3mr3x3ornajgc5ef9q040f7lbzju7dvqyucvg7rewk80ffuba4nddxxiteyjp665i4h18tvjjbqz6fm24s5zydthyb334mapsq1j6wm7bi27hzdq58qviy9ytdl4a65flrcrcj6n0qhue97s73b0m',
                url: '9856ejb19uhns4yqs9qjx07s487erdwptwpjn5t8dhy7m3ekcx1t4j89rwerb9nyf0xydbh3m2jn6cybdvboctbbam20kn10dbe9jli4b1vargcnkjoi4e49bxsjl130v6000fmaipdsvuajzwatlsrcxbdk8cefaban39h6v9ah2spnk8ou53i8w1x0vdbp3lxhmalx0wg0wtragntc3ozdzgrmmcgxgjcca2hvc3hswnp6gy6usyctrv17x8b074y1qih9my315552wfkcmko992yy5uv59pfwtpf2vklte31fz38yjh2hzx2ljh97',
                username: 'mxcyz287ouk5ezde9o7op0of51argyepljzqw3sxvr2a7ggrdhpr20k492v1',
                remoteHost: '2t688kqyexoq47z8q96j4uh741r1inpmdvqalp0qvpkybe0gqr49l4y7d151qw443z0edhsxfoqreaq2oxm3s88lceyik9fl81kn41cbuhpb1nsnuc1gqa930pp3pxzqxvkrt45yu6cvoxnwjvk1697aob8jjkrz',
                remotePort: 2393386799,
                directory: '9ykd0t7x9d2jno91za926yopira02il6j6gtb6qi4h665u64t5iowr12g72u8l9br56zxebxmnlkk65usjt69eokctnp9ii9xfdy2mhgzvh371lt0klmjhx4v6kst3cfxxu08suzru6x1d6bl6g5yy7lej0s3jaf2rw7u8w0ovf7ncdui92hck9ixnwdog10yg39bqt7snmvhedgvy8b0qlsoigypuuvaccuphfygkf6ny80ak8pnsl2b7xzsb1w7p75kpamejdnt04g6w9qbld8588i5txt1gigce2y1h8sqvf843ybom704uky9u561ppshbgly0rwyw1eyq45hd2y0bd83i9mszyy0i4162b1a3esmtzalb736v7hspza66s77uav6f14y7iofetj2ptnp4v3sz9zugryxxbq6f8e6vh9kqpjpvskfql70lmst51gibsbnleieebrhgk62qyfrfqzug5v4l57hhncadfp7fz70jos0nh1popc6qkjhrumir6exxm9u6px6i7mc1hturyb13pu394xx1ky8llcc82ed3fdbnp1lx8vl4toj4disqjg54jra3yuo13vwhel0zmxi9v7sdzdfb3vpmxnwks2kbzcuwzxbpquzeyofdooedtp7zqy5odn38nr3jq47ugwcuw38r9qx3aa9seq732rurlzzkp6xb9r73vftgdf3lqyqyhppcbl5fao9dcvac1d8bkge490wssr210jv5fur401ak1bgngu0kng2u4hweq4zp2ks681jusliynuvt1qgmuum7yqqpmg9s1z29rwf9xd687m7wuqlpy0q2q0z4uiclgd124vrhobd5kf1ogr96eynsbduxkgk1dm4q90ymv6va6buizpo901tvy84afejxdw6sb2rkfw0bcc0h1e2nzkdtmhi240oh67mwfvos6mp2f3sk25oepm7nehwga055qdingzhoqpxz8bskzwqorpdcs6ck7egqiufca3qh3z3khxj0wk2wo8',
                fileSchema: 'w5dh764l3opgma7pxeb82fcvfz66r6izyquomajt5es8r01dzes17mtpcgkwc9dy0ivzi6x5d1jssmu9u3jd4u81rnm915zdf35rtks2cgw7ixs0oqupeb5ws4z1x3vy4u93xzk9fgyuyrr9ji5bp90ber72lzamvksexz5or1j8bff55ebkqphqm8xssmruymz5fvc96c88gf15z859f6g0jylwcyzmgdi7bw79kctxoq22r2nwtyygqtcsm9hczhs9170umvh9p9kq8s91pgqiuskmy0gblcdwdbimo8g43t8pxu08hfmi714qb8oai8nor0asw4rhr27rhyast4dt40a645fmu2f6xyf2bnw16w3i5hmeuhtvno8zcjrfbyq6di3wetg6z1e48449pmttdh51x2xt4r3ffx2afxp2af4ws14hl5hic9vl7aml3bjjwsojxheok3mtlr77vjt8wlhcbc7awx8s2m3k0tvynvgmz7ji0utsq2cdb3u4xggycn3c5nat9rjct2b7cqxy74x6lp623s1zmn9kc2pl7fhi3bjm8cr9uflnf6hq5zz60qadt0h6gd3sgfqdcu3hl6sukacagc36qzgxhe43azz32xx0kxxevn7wra9el59gt35epnrywsfqv0zhjo1wbemvz84uwwcnc4drvd10av6wplqdkxg5mhqkrv0dmfwd4d5jzfk4vqyj1no73o676efa2rzkacs6eo8tdwau9rllu4kr6c3z9moslq87psah092hz187j086kq333egz89l65hxslwpou4dkwz7av4jjrz9hehzyr4od2go3pf8cu791yega1vyx0dyfzlpyapmri8s37je50zlpzxkti5vclr6bu154zaenu4ynyvs12upr465uj8uztdor5mq0ak4yb15h15nb7k461wxs7q1ugqcrq7oqgy0ioernzcwqp4tq2h8d4lmb31aijadlev6u0hhwds5squdhwdd3440erml7tsm2vhx5tpd7',
                proxyHost: 'i66fs0w1bzhvozdyd2liopt3v755mca3ep953jdgbp7bsk4bt5ex72xbp42a',
                proxyPort: 1275517563,
                destination: 'uzfuvofvo5o819wt5ulhi7rtwf85iyweayw9w9qav158lqwzx75h2b3rykirlwdv1k5yy1x184tb864gmhkybdnw8dm6w26rpuby5a5pkcb7dgwxsx9q9qs1ty75exujjlrxywinm2ew1yzaae6eteatjlw2bt26',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'q82fp3u9xvs8dfluvbycj4hk9ji01pazvsvjwc7xxr0mhw6rkkkxsvrj1aia9802ss5sub5dpfbx8d0w485x6oa38e7crj9bnhft6m9qgr8c5eiz42irwblvo84lmq3h1bccmnkwesl5v5w5h5y0vgao80pb1yvz',
                responsibleUserAccountName: 'ff5a0h1ctk4gqs819jxl',
                lastChangeUserAccount: 'y339yu3npzbb4zd2zfoe',
                lastChangedAt: '2020-11-04 04:49:52',
                riInterfaceName: '6lad4qbjeuqjdw973odxuhxjn1vs6mxfmhd7q7qwm9vmwsccynf32hvbrin6cfhufhtcv95h56wfbtaybdgy2u3ptn1nxiyuk6kis9oa9p3vr7gm0a5wpreufypuvf4szivjo0bnyzs6pxu7gnywdf541mjxj78g',
                riInterfaceNamespace: 'os0yvpcek7h5ihm1pd16tf9m687qw3qkkf89dsbjixxsd8o423xf3px7f75pz9u3m5f6yn8flw4zro00lab8d4dqs3ahfzbr6ov2tm3fm6u7nfntz8pum2uwt9jux8pavs1ph9372l2cd3devgj26ukayeu4ynlk',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'uc1r7gfau22fnpzsp3dmr824gng9ntqwfe78ndwq',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: '5ooyr84u8chei8bz5sy9fgom2ycmm0mvvdmbyzyoh58q47kqnj',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'uw1do7dndb7wh7h4n8te',
                party: 'fwl51zy16oc5iob9473nljb96bfvp9a9xrks4bxkro036yzsk4emm116ncg5fofzccahgr4pq0z197cinlxj941e3jxjpxbwqj67x08gd5flxs8hq19u7vxhui95yq4jrjpzhqv36rj09234mzdlhvubzcq7v3hm',
                component: 'p9ut64rsd02if0z9t7ukl2idhskakbb1a23sricgutcbppa569gty68x6gc4asplhg0f6qdbbro2dimz7ky2ibxxwki8o5ih5gr58ltgxh6qfzxk7c0z8w6evye6n56l0e2wlan06zy5w22xtndjpt4pbjvkbjdg',
                name: 'ae3acash5z5dk7jyb27d5p5zzwacedwcifp4jlo7v37mrqf5qdwknltpklwsuukyfknm33yy70quk7uuzux6af79798614d9mkofh7nhmuwp2hb8eakvnlirfvddwyj9nrm2zfhj0looaht0igrsh1in5lif1jik',
                flowHash: 'lmsvv2u4g47wjc2n0we1xoqm2z2n6zbdnw8hsz6g',
                flowParty: 'mbqeatkwlx8mewjnt3snnjwzs1ajbkbo0ny7w8571x511by7smcijldy6a2ulejkterr4mt81u0vvy9owp3atkeaiwwqd9m2qkmdiauez5469demtksd6nw1771kqe3n662m857tooukuh39pxjea3mgqfysgw4b',
                flowReceiverParty: '7a68wihg4onr2qel3nxxfddo9tnjibq8okhdndd2m6cu6665mxy56otxaol9xc0rwgakesoaixxj511ui5indg0tbkmacecznafmx6ugotjhiwx8ioh34at8q5nv0flup8npvlca05blrgz5gii130kolv6mo3tp1',
                flowComponent: 'wvvcf57u4mrwcjirqr0yj03hfj4mculsjwneahxo3hsc6ij21v8q1beq3u5bf5qkg5e8osszhorfl67otl38jmhsnz94u4lfyymrupv3g5hzzp1vmzkn4i1zf7l833to37415ybjasiksgv5fkw9wknja3d1dco5',
                flowReceiverComponent: 'k6r5rso1cmkercy4ny33z7sbzsg0mrx033k4gdgbt4j6xlfia8nkqavc579xztvdd0zkba7gqs826ej7madwr4438ztvfseemxpcsrw8grr6i42svpd2p0351l2dgwjintmgoij1z4m47r801msll545b2t9rt1u',
                flowInterfaceName: 'd5sllnam4go7p5hcg60nx52rb07yitx31vsqo566eqg47lhz66jjczx375wunzpe97ai6k86nxmo0qw5rk7hkkc5q2yh5qo36althpjdyurso1lyxabfjco2sn4w09wtb5288xtexc9njchgxgglomfi5qvtuyhv',
                flowInterfaceNamespace: 'bcji2kg0khhy9bmv2t28zptn05jazp11a8rfohwed8qaqoya6rgthbeh4p6eovhu8m90e8b99ro9rcxmsdxyk2i0mkx6go15y5hl0jc2x4dn42yiqj5upql0wvswuedyrygm7nm6regg141suxe1xe67b0gejlgj',
                version: '2eu78ugacu6jcxpikbx3',
                adapterType: 'bhqjj7bgi5844txxb140gasfz2bumsblgf5fjl3a2lkjzo0h2s2w69xs6bup',
                direction: 'SENDER',
                transportProtocol: 'ntvjmeyfnn6x25gp3wxas5nfm0zc26b84fpuxs6oysmccodm3d1fzmb5fw4v',
                messageProtocol: 'ayu0ipapq2llcvt05lxt9p0bs8djb0lm8hwca79yush3z5uyrsx9gz9blwsg',
                adapterEngineName: '2p29diny84j0xw5zs59jbxjvqwoldzhxj87y3b1x2ivlrlicmn5z3or53tib165m8lr78umx304iha4t3s87ohyj45laviadkml3jo6sj4oc7m30dqhhd3qvdcd5pnfj54pimreciyvkhne2fy6zk9sslhlvwh4i',
                url: 'yfujpfu2otvnm0h15f4w0u8m9aubulfj20xuypbp9v750dn2746i4o1ourqg0z5axw3x1jxa6gh58wfbrsfrony55x80zv7gg4tvgcek2x7rxyoof3e2gl2gjwwttnw4evxrmucaxvclpctbnn2ln29g3h5cl0h0alo1qnr1wdcslvf2j450981yai1awfvh5bpipshhlz7tibgz2qmjp9n5a9q7f3qe5jpz3v2wrnmtmfvr79867i6ce1ezemao54bugrizcjregccthth28z5vsuj7lys8v1uyasiiz3hqw537bz69ngx0zjtpa885',
                username: 'fx2vi6yd9eqqt77ec27laf2roepsaq09dow9vid4bd82lfxjk1poj1dtg9cz',
                remoteHost: 'a1sddlct47e1ri9en2sj0e2rk4nskwnt16kc85fl9fc92r7i1se0f7g7re6krzy9a1xmya2wzq53zjuwek006o75n9g7i7vv0mndwopqh46wyb4j2wrhmd7ps8g5hcxim7ppt50ji5czqyg5kqlyfm2n7cz6pnhm',
                remotePort: 8551937561,
                directory: 'tfktklblklxf8pp24rdmrcjg2pp98185p97t4fios9r8s1vh4iadktzkrclly3wicun3v5hvjrypn1li1drj3e0ym2j5u9jbbde5x8m29z76c3wujkj8h7qq63rzv1as84pby1yprrcwlhfbae0wxctrt45h7u709fmeroi2r6dcnqk0gaul72gid6h8u2udetfgpkmmaxxpbcvbbn8aga9u1vbp3jn18sjpujamzyj5jkubb256vloa3wvx7yng7tnv0d1sghq1tqviuatq8z2sbniacatz6r91z2acjolvzhhdhotfhll1wq1llpn0ww4ucyb5g9ksn7zxnt82kxqu0kq5ss582krp2tk3yjqlmxi5z4kerolkytpuzcwm2b3yrs1iubqcja9hdhcgex64ehwitypgufv6ty7s4kkbbmffj724z37d7gqmwwehd333lg1oqqoz7qyulkzva76ouuuevgaez43lwxcrv7l74agq6jvmvblmxh9f9fyqyzuziz60u7rfd5yrlmvt91ypf6zx5ny3yxz9lzwzz0z0qpsiklaulqrea4ykai2j035f5cs0px3mh5vkdhdm7jvr9abn5p1w3z5nndu9gh3u9ksp28nc81grgmhvne8lrt6s81dr3ytjx7il7rabh2gdfe4zdpbvxvmyi0ja9rehyb6j3q2nswvnemiilwannuqc28zfoa7jjv5s2rsi5ka07royn6ifwuv3bg1ikm0ysn0mgmfj1km0v3vxjfs43q1vrb8oq9vfwitjghm35lyool8jy1fkw4gfmrcg2rd64cuk4nj6dir4wi2i3bomcnq9owfs9s05oiy5zgra6d04bcg39fghgykatl5o94zo3sxcf0x55g8evgrp0k1vhmg16auinyj7965j7onxcau4pel0r02cbiepnuwgl090xwomtfh2jftd36lt2ux6brentwhruogboky7d8wfjq5vjbyflk3xukc4mo79hc3kprg7xd6jls1bw0xn0qdb',
                fileSchema: 'ikcepx23002gx6snh4bfmhw5xl09mee20bxp3qntp7fsf6nzo1d8gdzr4nuwcvnw92ua1nbwcpm4qcl8gn5ihrsksqe5ubfumyvzqnjhj4d3kbecqrmoutbl4lzeotapdw0jmye3bkgwlrfgtc3rnmiin04yaha5nq436rzwafhwczmca3nyb2aacot2oc7beeluaum91y8qeujsbmsdyeskl8692zcapozdbqb6xayftkp7qnshksikq5h3i7o6avhx3wdiiieu86e3uvvlhzhh0b2ayncb5d1pjgxmwawhhaedk4ln2yaw5ny6txr58jcnamkwf9grzmzp4i2ae87o3johjam1in8bfvnj3m81xpmg31ruk98dlypzvk2maoipcqb7zanl0u98sexq1rur9jbkel3571nm84t5ezg0vlf6pn9q5yogiumfwpnhp0aue1h1ivjjlpnxhhugrdn6aj4r9xce1uszfhi6s6exq2xxs30i6hdqabzy6yf9jlzmpubc6ybjzixb4mq8pswvhfpfclegjmrk87eejknu32h5jqcu3ezmsfoy3xbfamlsu4shqxtbxrvy14h6r47jdxgbv4visfv8ny91l69h47jh0bpc6vnmuewkwhy9rckur8eisad2nhbylxy8e2x6ln4emolsyaj82ermdoiff2ozsitgcu198ivn61h0xhlnkamukqcj0ep1f89vvaz8dn3k1k6aqkiixebzib8c6z2529ci3ikij31azl6hhp2a0n3ocd53xrtmmk5w9hilyvjpoveyl90x9xqj0w526943v4egm3xsfv1evo1i951rvxxbd8tb9nq73j5u4xrvobfadh1ky5kpsncqd8gy9vvn5380ky3jh10zlz4c49kbb4ny0061oxn7wfer6nblk3j6oxsxi9l7zgjcufoyjr4zm5lbzc99jnqm03sb4fxjzeg4404hcdwgp2iwdymj4jv2sxjbqgg8ry1nnpibnyvnqm2973lcvh7rxaqx',
                proxyHost: '5dyopocffwk3l7nrh10zr2owmudlezhpj66xdf6sq8gdlgfhy7cxjpxythwq',
                proxyPort: 2246940498,
                destination: 'meoi057sxy8xzucj6t5zc8wmmz864nuynjvbd1hn4yplfyyi98mcaf78kq6o1ph83vijutft6zqr7tlfve0fwzhh4sehl37w14urh4q45gsvff7y6sbx1h63ssl1uk9w31e5ketxam80l65ogzu6p4uue3d1cm39',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '60a925on8rfdechji3lg4nij904jtq1axscby7v0qycwzv1gs90l224phzusvetjee7oif933cchmbc1py4x50uolhcmvz2e0px3ucptsmozqq8ihwhzj4zi80vbheokrv9x1inpczj1h6bqgcyvpfnvd34jy8yz',
                responsibleUserAccountName: 'cenkfead3goqf5wtp6kt',
                lastChangeUserAccount: 'x6amfl4mytst26pgr35p',
                lastChangedAt: '2020-11-04 05:34:24',
                riInterfaceName: '2w8axf3ms06eib7fg0zya8ao97qzeweu8i0k067eao8lt8tz7j3t3w7j7f4jkkwfgf0seo2699i05ljzxpdiottu7xxvhzbhhd7xeetuw086gpx2tx23wyfvc2akobdww2gnochkmwbxo6phq7w8b72q0vogo31t',
                riInterfaceNamespace: 'fs0gdukai0ns2jdaob2qwc0uyrtoz9remnywfl8ooolgpa7ov5cnt75a64t7y6duqx84x91oxvbg3shnhj6bnvnmxcyjk6018z1w0v22hdtis3dy9z9wdg2cgdjrimg5n49aybqba04zcp1x4c02jut7bru8eopj',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'x15loyw2c2b8la7hnwz3b792h9xoly21go7nfcqn',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'yzhsgms60v0szgbrmwsjv2fxgeggy73gk1lj0y9ioer3y7kmzh',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'awdv8s9nn6b4ic3i8awz',
                party: 'i8oery694md54takr56vc9r62tmysk4r2ebyobu1i9gzdtyhvogprzfhmo8yobpszc3lvguevf8hc3r0hc6e6hnteoaiapr1qycd03zybv0zce8k02qsvj8nvjd0kxw1v5nuwi2860u74vwcfbttksguc4w2n1g2',
                component: '87f3mosdqfcjf35ipgx6pp2k9nlhly03034rot7xanj4b8xwn6co0liga6bl2hlursshbbde3xu946hr93ysrmkyikc1c2t91tdygzl00xui52jc47cru58nn4fcnxifgqvuxvimrmntcsc962i7z2ehdwc4815j',
                name: 'ipmwlw6zhlsiu4e6c5cg9q5v2l2g1e7io9o3ae7dvry2wp3pyq9rdfdt5htuiy22fvfwqnmenw3p7gri5eomcnywl1hbn9gcrfd01vrun10j0dkg4pojaied5tmjukz5d2dpedmp73kjkfb1i4h7i56m14w8dknb',
                flowHash: 'a4k3x65vhd985y6revkim0qa04in56nngw4invpr',
                flowParty: 'mtk0alakt0gs2yces2nn8plccbsdkw280uzfbdtfrevgjn31iwn2ldxd1vwhs24eaagw55iq92qfpgte20jqm6mmzt3pslek2igm3jkv5b0se3u5idx3uwa4nwpuhmag63gbwjbok6xeqney9osues7uq3p9mt7o',
                flowReceiverParty: '8fodgyocszc8h39muq62qe5s92nvmok2wtestpoc065ajfkl5nqml90vec40a4yiuyk5p88pkeuisqyxat2kkjwkyl9y2tj82lietg9f0bk6u2i7hxtrhqzcec4ttpjdi3ysx8unupfuqbdgjsaj4m3jzqxoh62h',
                flowComponent: 's72ikc03ol8dsdylbkci9h4u01b89nso1t3c9nywpiv76lwvnekq5vgtvbivcffhraft5wza8j0csek291yixixikn77xqv158kvtr9z5351gdyguwwe4hyk3r9h6qf5bbybztcemv2rxxfhu0jnqem86ozfzsahg',
                flowReceiverComponent: 'zovqdgzqr0rahwr6h9f8mxpn84pq4jmhipa8cnud705759n1yoi1u9dvt2ufrebrc9qolj05fbux86932968h419n1v2qh37gseq6shgse7bvmk6m8w07aj2b1qayj8k4tgsd7ysxy26yzuvt22nicffx28e1kzn',
                flowInterfaceName: '6alce09527jq51mquif5ww03ce5h3t1mmptp7ldoivzrg5fz83rzu2fkc6p7mer00uiyazxetyn9ppfn8ahdaszqrflq4yvwybcus4ly3bwqz306pjqq6e3gasjzbkzn5h8c9mjiwv342ic88m3wv55diltcdf9z',
                flowInterfaceNamespace: 'g4fgc8vql0v0tconatq4ilozza3b1g0asr3yw6t4svzaf1mnng9t7nlysx0wn74pt4us75fivvg7171p9hwgpcmmhthfwpi8olzkprp1rydhdxajzqvotf1xtz7q2axtym6ywg4qakrwkjfrazrz140vsz3a4nwl',
                version: '4c8eo6ex4ou83xnads0f',
                adapterType: 'fx86cm20mocb1vjma803f5ax7mdsqtjhnr6henbsgbbbgve8hs7n8n5qtu77',
                direction: 'SENDER',
                transportProtocol: '6tclbjt3c32ka2vxesosowp53qrko3dumm054127zp31kpwtrfaqxckzj91l',
                messageProtocol: '75yyk2z4s3l18peknxak7ubrrlyhlxer53zhfvr2wwrqk38nxaljo3xdit7s',
                adapterEngineName: 'b5xn3z1sj9s4udkhtf581bprlg29ceu4khtovjgj74n13j8om7g1y9bya4re73ycjdydnfz3ku50avoo83wanzyx7w0qvepds2ks99iue9m38zw5ozlyl14qdmq4034gq4n71ghuot2jssrdierlwrb2qvvslkrz',
                url: 'j8zmc486rnypr9bpxnpziraazqptdnvo4njwrkfohsizj2jgq38a02z92egnbbpjsyt1wnrmlxzypbqroqpd9in58cddc5gf5nxsm1dpwna7gkwze9jhrs8aijkngsbcuohl9djg9a818nnv1mnmqotwn099s2cq4sppv6d0ec956rycqmgx11xtids6rpyfgomy571kbxorx8a4jji6bsdjdorwc5qnzfya2r01s5u4555cqurvgba57rx4764ki7b9g205kcw48eerrldp51ct9hihmq35i0u1bmwmg9w2yw98r2029rkdh8lulhqf',
                username: '2m0cnz2bg5hg0lvb7vbnxd0yze30901602wt9xr9mj9aaqza7j29t31tveux',
                remoteHost: '6z8g0pceqh4rmew5fzodw1a1dodbx5ije1fbz37kdb5zljjzneovz8itrg5odvjo2jjsrosxihw0gxbng0slhztfti9hp8witriererl9ctuha6zpabxvskrzranjw4vsyqjezmsu94b5dlektwf82vpu0630hqo',
                remotePort: 9939510834,
                directory: 'rqwqcppf5fwgfhpi0gk9uynnnd2f2rxmqdhe4u65grpznqfjifguywhz4cn8dfdjdirxmckr3667obycuo2webbxavnq6qcyabthcxrknttkxrfwp355ig2keaxlev6md36725ty2jgo9pc9csu2hob3qdajkr3ge8xikurv0lz5x52pnw4bzij4a82eld92tygp3cwwjm7bnixgl5oexwfxy33if5uscg9n48ny1hbp6fv4rdqtcqk5c4y15i6fnqs5t1bdx28p84ugae772kffn7x3dy4cfkkghdueedy7rsm499u4lschagdcfdpoawe6rl9jhnihzurwolvys1pk6gkad6l9er7m1xjqm946ig0d6tktb0kb5za4s2k56r68lsbz20eyh7v6wlalc0rwz7taqp8dloxnqb7t1j6e03bjxzh324mq78989hoz8p3nf1nq8aersjk2cietdq50ckzfsyqha9wqe3c3fpoq6t9sc0dz9kp25cozk2savs137lyqxmkacffiv9ik1obc324jgrldcxjlixgqcfvskfn8t1xuzd9ou63z5bok9o1pigvukvesm3pmu3gctd7mccxcajakflqup29gb773ni4vvtod4guw4logp15u6zyfarzp456cmv2lzl7kv361795t4us53oqiu12tqqsh7aqce4tt56xc3ma6d0wuw08kap3nuq2oow8t0ayt6u047e7x5rqtgpn07xicb3x3leq9uv8tc0vtayo4iommqu693k9eejfuwtwtl23w4x0cgusxeh1kcp7yxvc7hhtkzzcdmfzwn5d6efqp16tfz8uygptawrucablhuevd3tdrqq67uwf6wr7xsir4ammewrwysres74t6kbz81j2t87wxod98bqxfummcwv3i4qmqqb3oyvvh12mz4gv9xtiy424ceg06pma7nrj1po05ap7fzgfmaxfjb9tw31jodypigrth7d519s8dlqii2pzmiy1b05psp6svm9jh1vxs',
                fileSchema: 'ezea79wce16e3cvstuye5zw3cuti3xv6h5f2koys8kuxxsmdzyltk74v3n9c8mk29pedx9avr46ep2yooi0xkpse1tsk093q0njikbt8rjimnzwscf3a75xekqs1p5o16esz2mue3ndm8kmxihk87eiskp02o29aal3wd0zyj46ejladlpmkvraw5p5djbmejc7d986qkqpgxu77dbejzsf8quyswydxk4zofnp3pze92259b3211zfvehf00uv4nb0t0nlsmwpy8f1ps7t34rkwr9z8by9vu3yijzxlut8eldssonxetu46w90wfsji6f7bsyl7hfrxq900h0xkrfbbse3l9s027kb8q6n6kh9o270p9kgc2w994sa4who7ihw4y1e5oegx94phro3mrxajg95f3tg25sp85uqs05mzbu3oqeur08ilwvbq8uqaoq6wfx5xblcs99pgtqa1c1tn4fl1ka2oro8zioa8smofy6v46q82rn9a7skfkwsy89ppbz3ysvwz1d5marwfkelk7mbymwpptpv4lc5ie67nnedbin3bd5z71emkdecmhqe9pbsc03rstsgj867ksd7si49c976gln6ykqvjlj1tisex7hew5sbm9lv677620hulydkbyoyocanppydfbk4oa397phfwn3t2vpftp3gcao9cm58a4smshxayuom6xcdo5wywlqt6v8bz20s8ili4t2jwdqch7notrbck1tmvv2x2nycenyoz8af9r8jv4l8njfm1qv3ybf2y0zsrzzvk91408z32vmhmch1f7r74bvvo2fstg3om7xnbz1vae13hy7d89l6bhctty2pmoj904n03u4lbli0s4e5kv4omppyrufs7mev2jp4sfcg17tas4z6691wqiadfzkm1m9c05rttg010zbmprj2bpv40oct6b1qdhp2kpi6tv854ywqrhgnmz4lit6ouk4y4j223pdiysjo6dmkdgze7wj05mthzk4k9fl7ui6cu9ug0',
                proxyHost: 'wck0zr8vyfv9qc30jrpt676ujhgbaoxsjqvdd6xg6jex0kw2748tsefy721j',
                proxyPort: 2540337350,
                destination: 'g3uezry548jtmsldds6pfyc3r49cs8fcnxvh7dilc53yz9g9wfiw6pzygf7206worcpttb2z42bml1zs57q48rg39v8p4ygw8jplcu303q8p0f0dwxwom10spk0fm3vlgpp0in88gu9a25c7kuw0ggubstr0ck4e',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'wes76efjaheixqtihkezxm4kejkgds0weskyp6m602bfq16wlnwlv47amwfgpdqavyzet7onfqzhq38xhns1kuhd9wqeje29ujrzlwn5suj1iil0cil87jas3xdt6p49rk032dslw4uwenaqmaerkyvlglbgnxvd',
                responsibleUserAccountName: '8hv79ra94s3vc2lxqxhq',
                lastChangeUserAccount: 'xwsadz8lhx852tm18b21',
                lastChangedAt: '2020-11-04 13:52:12',
                riInterfaceName: 'w89ukm2n0uj9ru8i1kdvkpv4v2ybz8fjjdo0smri37mm5l16kxxbdwne5e1rbfnfg303instw7sjrs646s2ylyvyxx6woouuk6omowo9wnqfbwpgofj3jlsb2pcv00lbowsv6ug2lvsun5sa27gk8m7kj9c1059i',
                riInterfaceNamespace: 'yfq07j8jjw1s3a9e09sazj21nw7v8a1obknvvd9btykrb45wa1odehypqi776hegiibzi0dmztntvreblzd7694wc37kprfsazivt3cvzbw6lykknyfqqoe4phclvqhagbs05y2jxypekmqjmsf0jvmyghuoh423',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'zirssjufp7h5j7lto5dxf1kfazhy9z84lhlm3ahj',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'y9b9tanu41i65ihl2632jdohuncc6fgiefol656rhmtkwm6ji4',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'ltco9or2bm7dvo923wzf',
                party: 'uw11ks4392kq4zvha99htu4fgipp0dmyxvlxw8yf61bhxiokuq14yi7badm24htos11eqisdf6g3i1gzjknbf5y8zjv61kvrjbbaazeb12xf03zi9vwv6jqqoxn1ut6gbgm0j7x925rav2r0rkp8m7hk23cpmd74',
                component: 'x1svmfy9zws5nmm9yk2x376k9oi98g8snc5vqmq17ec9s1sfhsy3j0z5l31e0evpapxp1n6ce0xwbjfhp7xl2mjmv0e7tj5wu6msw3biqpatu583zdyg441ktx4g86mtqwztydn3v2i25u2lyi93v7fwjelpaulk',
                name: 'gyezflflziuy1tpyw5o6i2ifdp0t7127dkggachxatv8y11v5kzxmms3ddajxnqfee7i5nw3yq07oywic0x8mp1ftv8dtpo6oesck7x1n42a95w27uuif5lfr3n487u50o012myhfe57g1mzf2ptb50rgkgstea3',
                flowHash: 'ccz20hx6nvi39pnhpa64hkkwgh9pehpt8shdz8d0',
                flowParty: '3g26bi969gro3apwe7kw3leaanx8pdf2sy2f09ldf98hdv1lc97ppjr0iomiulmpmfwt0bvsz3yei7y4dwuy7z4wc836fvptd3z924u43qjw2ikblg3tbhftxil3160fda4umhtkdszs0lq54xu8c4hr9zfdsx10',
                flowReceiverParty: 'm9kjkjvguk7830qpni7c1ym3cf737vaos2t742f6u3bautpjnod11kftbbbtyx3ata4365bav00sh1pdy3sjwuvcgg8dr77l4nueiyipkgkh6efe51fpei5r9b44rqrtndhzaphqrekpt8pcbb3ljjkrsrt2b3br',
                flowComponent: 'x6unjztm7mecdauqygwwldqkqj6ztwoxap65ikmmuw71tyg8t7tcpspijwroy8ftywaui72oaq41q8uq7j8rb8b5wqh3bfmrax0avded3c2ebdpbwxfpavuj9snt228i408fc24c04oz85blz9uvg6tzdunk49zw',
                flowReceiverComponent: 'yk932m2ny1tflssnbe6njwujr85hqjapz7eookmcyl37wto51wzw4iiao2kbzyqci20f2gfdy0gzj0xll9um39tu01r7y7036lpsma9vznetj3tt5a4803hiyu5c0iocambmip3kr0rv8uuvm3wg18u86fb5nh7xh',
                flowInterfaceName: 'yp4rioamvxrx3fqayeo7vho66pzvpn44a9pxzu3f7c1cztv98b7hkg0zfsj19wwwz27m2voojvlzjqcj2eci9bdstk1bo2q6hyl2d9asr0giebdnmv2kn2ahnmgg640q593fyj9oo2ht5pccj5vrgy6jghd65qj1',
                flowInterfaceNamespace: 'x4ur8m4ojc5r01u311ruznnbcyie7u4xr8gn2mr4v2h55kz0wpspsqe88824dltystge7v2wn2jm6mp7oe0uvgtnme2g6xbhn4zaqg55bze08ke6p9h5eedd0yhu02ctr7qj5ur5anr5mvdkgyzruk39uomcsgh8',
                version: 'bpu5i1sh9idbt0fh3jnz',
                adapterType: '0434l1hd0zj6pfp458xrq3zc5gg70rif6a4l6j8i79jr7ksolwrn07855kxh',
                direction: 'SENDER',
                transportProtocol: 'mem2xqzuonfsg1yf7og0lekuzuqyp261ssx3vjqxauo4iez6z84fwy2mhko1',
                messageProtocol: '6vu6l4jd26112227g9fpmb5atp9c94kzfv99xgjvzn2tsgn2s81zqgt6ldom',
                adapterEngineName: 'i958n6kxmv7qx15ngjsbxvfpo9765t9vhiiqypxhik0ujysweeocv36oxiv1v93csd3th5ywn9oc1yllv1ythpnkbt146qttxk66jd74041h1o2d8eui46t97b1mcf5giiz49h7954sqsmv5jjtf23kqm0ad8m6i',
                url: 'rflf4z4rps621jih7y0wkhe3acpf8vrkcxt3aqk5hxhel925zsfjv8lfw2k3evihlt6uh8b2fub2j60k53rq2aejo26bcmykybp19uhm8lakx8dex4fzzuf5q27oyvihhq90f6ugqppgld1rqdhfz4n09cdrylc9k49jnfk6j6y5aalcxnj8hcxd47c6zd0ner13pv0g2a04fur7st9y7nizvn9boogdk4nef56y2x5qkb8ujvh5nbf66eup5upbmp3mrz1wa4y4x8r2tangcm1zuhev4bl0mrm3xvlcwnd3w7ml1tj513at8eop1kjs',
                username: 'urwcxmiaepvyoswmssjn27i0skcrp8gac9uayy4m7guvurb68sgqh5wy51rr',
                remoteHost: 'uszu1cb09g328mzqfylf1szo11zo9ojb6o1bnk90c859otnoke6y73phxw74qfnrda151t3yyfh8e973brilpqhcu24nsjh3xpsdz9w4h93pqpnn9o3nmoxkylcd04bgk8snbtdujn6q1jem5a4txo7pslz22gbp',
                remotePort: 1902909616,
                directory: 'qn6k096cmj0d9t1s2dzdz1fl70dk95lp9rgap51t8nuuzcwup15c0lmcqny4sb3c5we1t7gajxc3cd4mpo74aqb0ygg1svpukok02syds9n8c7exx4h9xu7n8e4gyewoi9e0wyet638lt8f5ubw7mv22plc8um3jbiowi5fda7tgmccyd4hvumzwbp08at4kpi9tx2l537n8ggss3sh6w9kznnj879rnwyekx4mnpx0thgrycaxmr714ixwg6q7zkudeboo88q8b1m78eqkh0o281e3z0z1qfu3zccuao02idkf58v016r8v66jb644ytzfhyk9dh4jyh5pxap369re2p9bld2mexv4pqx4ld5xl66hj9spmvvqg2iflrfnwtuyqq1328ul4i55lqqn89eybzoqikn0v3v9naus98tmg3cdpqf6cz8n6py3hk1b2n9z8ual2b0k9pu51byzd3lx7wfikez9x483vl08vxw3n93oe01cxk7qsu4xgggx5p415xbn68hkj0qvfaqbpzf8ivoc9wofa7r5u03jw72g52dxney2o8pkdlgefo78yychen563bwe173tc7uauhtyx8bnspv0tq3abn8mzzc5ah8q0fqo7p0t8o3050x5edlgsflt9wq8n83mklj7fewf90bku1on5cl3ynd16sr7gk2zrlwc0a2bh5s2p2m58o0d89v8yjt3710tyt4rxldjbzlo38dx2txu8omfyo25sl16ztf9cenz8vrq7k662dxp8kct4xzfx6dnla0fy7mjnyo0p2yg5ulxannvsykra50hquo2hbcpureujmhcjh4ciohd2qkyz39zxbt4xf61e61ytw007mvf0qayxa9b2glwa5pnm13hg4f1yery8iy4igowuqc88zymueosyzxzgx1ei1vmb7eeio1olgnplugrjpf1yvmfhdcp9yd4x874fkucr137dghldo84xec7ic1qorhvzog0jr9sb9ay9ae94n9cwjx1nhwrz9gux',
                fileSchema: 'ovhcn5e5bs46fe0gc51rciw1r3mkrnaqg7eexhl4akuvvmomn3nyvb1asi3dec2mr882zp86i503xk660fc2atkxkarp4ad38yeyavx8e8ynzr4eu6u3egiurbv0a5pbn5prkpktnhxr4hszbljqyeuls2c1qzs2edmj91u3f8t9hgevgix0l50eq9prdtvgdzhqbl1fnmnrbrmuiljwcx421al2lhde87gajk84kicrtb5j4s8dvh2d7fhm3wf75ick94d86xkwu6r4fpmoa7oh0u4r7ccj6ksia8n3f8qvj47w35s9mqll3sf7nnrqpo8ufjgr4abv1uh1luuxd3ar51s5312g4seoc6sdqlap0p850fuy7rklne3j66tou8tp8xggni2fx51kxk8jscr27oaxontaefqjhi6kkmxdfnnv7n1zozunojczqw408vg1icn642xum77915v4qwp2xtw2ssc4bn2yxzay57p9t1apx4wrt4zevoyysjkrietvm0zw8k9rbh8bnu33vtyhzn2jv1vqur6t9tuzt42h57ir5f1wrrvpo9qe3kbcwyp0qj8vt60vwwgiilrj9byfz4e29ilhea8md98xahvap86hok41hy82x2rbgencm97mbb4onw19b1enz02afyudph1mfvvot2ewsz4akbzjlfzirau9xmgr5vbcdnaa1b7x1uy1eck9pf1oxk2adhu34hbg030u6pherq66r2oshb8zuowinv8ll99tz5ub0m8ehxfce1vjtd6fm5blhpk9yf4ytlltz1pt114jsrcvo23ixo0dij2546mhcahu8l115oc33vwa5bmx2evnwyjdebef7vsyhx4depl7utovw4zajvortcc7tzdkmz744yu4faygynqmqpelwrgrz6ib50wepyc2p0uil3wd76itvog2qk1joefmsjyke79me0aavheh9sfd0ey3fb29idva59s4tx84388tsw4k46a6d1duagl3gqcqszskswka',
                proxyHost: 'trtqz1x2inf3g3lfxc1tj6y4nwahjyf5336dtnflpgvoect9mea3onxojny1',
                proxyPort: 4522625222,
                destination: '3jkklwnv0f0ojm58tim7qejn7ccwwjhmsj4tpd66jxq5qcqabk19g0njn4yu8151z8n5d87xmbzu92to9zkkbca54im094pwnul7iefxadnksh99xz9cpsr4wr64spn20l6j9zqkubwfju3vm41yj2r9mzzsajsz',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'qj0gldmzt08q86mo7t3i4x0yi7cqkmjaqgv1kzkzgofhelm9aksvb1mowt93k5xu5q8yd9fb9speovdxcdmjneizu8cxcio94ost43u2nhaickqwwj7i1bitilfaucoicf0vm00z967flu0c100asruvtw2fww9q',
                responsibleUserAccountName: 'r9f5isw1my9h4lpf200f',
                lastChangeUserAccount: '7u3fqowelmja5yjzvoh3',
                lastChangedAt: '2020-11-04 14:27:36',
                riInterfaceName: 'xatcwhv3autnbbhlsx5b6inlixfv7its2hjtfwptzlpwyrtw1028h8ba1jic03r9n35e4stanvlff4pvdbgdgj7nchyw94xh98xmup31lqp4xdstg0dhzkciluttucfkokg8p3ph1yr7pmbl3i8wt70lbszl1aef',
                riInterfaceNamespace: 'nbrfrtm6czpwiywljb1og3ay1bkguaufyiq9jkxpm1a6jlihg8hao7z5ru7b4m9u5kzo64egjapfggn9jlw8e4kuaaw3pj6kjkel4dye1ristsyr6d4evsfcpfuzfdygfkb3tk3zh39q7ot4fvpv1mxsixmajip6',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: '9kdw4jsprc31or1ywlzum1dqm2pw673w5skrd8al',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 't5yvxkmyg1p719u9m1qapg66b41rvnavw0qxhnk3g0j55uqngp',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'e9v7dh4omhisprchnrut',
                party: '7b7thp32vstmf0jkyf6n5ydrqv2rpgktpiqkzmw8ogm90eqttugho8trqk4ftns5d811b60pt89bg5ortvhk0m2d5mc6t2k8nwazuem5s4idgqxhbe18vmhu9ig8arqzgnxfl80u1i1mt6l2mh24s152c2f6khwl',
                component: 'n6tp7olqyssyx5n7mfsog9esl6mktwyb49isxkqfg6r2t403hqu8cegh83u1ya0yb9f0o8naz374lg5bw57fh35czfl29ohr6sr00y9ivyes3nls2suqp1kze2wpays6xj546noj5bs4dhcx84w0m5m65d1tcmna',
                name: 'gcrapiv8vnfal5kcok1qtsvq5eumssvzasn7j8zhjl0l3e2qozqxv80ijlra8hku0mxapwgc5t3oxc8aq85wu2hgw1ffmj166x6apswj7vg86l95xfmzh0xkjphnjejyiaudtmqpkqqic70bp569zmp41sb0s6pm',
                flowHash: 'ujua8knl38qqzxlcbvg8m55l62mnhfozy83k8bpj',
                flowParty: '02g38pg30lt0klhrbt4zkici7dogpqifyr2rb1xvnwkxp7lvf26cchp23o0vruirwbyuozldu7dzdsdt0b5p1em4zr9jmfx3sotf6gtwnvbyk4gfysofgjlms1kk2eleq1r87jbjtgm5e9jfircnu7qblmst3fw3',
                flowReceiverParty: '09h65kqny03hqx67ls5l046qc6rifxqini3c60b9f3vcs6uwnybklyoo48skizi5a9y1a8xiux3tedq3dc33zu24t81cz9cl18duqvcwjw96fb10nddofldcc0u3x1mym5sqk8gn86c5gb6qaajt1m7qdsyzlcq7',
                flowComponent: '0anlxvkk16s271w704317x2jar4q4z9p15xiz5fp9b16vth278j44h7u58ut2tzuu4cxklof2t4b4fmpvl1eeiv6e35b4j3uo9kekl558xkuzcyxah2n1vn3mdwy5am7963ggck6crapsoxt11kb4mvrsa8jrf80',
                flowReceiverComponent: 'iheysfj5tqgwdzaqd5jex8m4y3xjaoc0kc3v8dcjvcpdfmvwyok5aaosw8g3cn1kbrur0g71ee93vr0pnmm5an9acet30d09j2y9pje29w8ouxzb0z8mgpnsp64ftdfm4741oherlus62htzkm7fs2n7kkzw80p8',
                flowInterfaceName: '04jz5k4bc3sktubeotyt06ylhxmy5sa8hmmn91i088e49kmtdlukrfaa562ld57qn92fsoh3modymj47htuknholt4aaits17n606xtv63stg78ytdv9400lgbscnyaagbgeqksxiixwoncoqolcsxglt2or9vb5g',
                flowInterfaceNamespace: 'abrqd8b18mgo0sugj9up9eqlqnovzocyhmdqegdkz2ikwwgdylbcnn78eq52h2cm9vumrhsrjl2qc2ayzw2cxugaoi2r2t5agne28qkouji4uyc6xyaiqc0dj2hz88g447fea63rfpoqua6mr46r5lhdnog61g9d',
                version: 'opztsoojg8fjaw8tz1qr',
                adapterType: 'fvvf2wabtgnlmt8nrokspybdd5lvll0om6tgn54cr8gqpz2kxxrquogjfgu0',
                direction: 'SENDER',
                transportProtocol: 's1wivy2arm3y02dkllvywhbkdl9i19q4ufwk5hsba13ojxsgesf7ek2ke43s',
                messageProtocol: 'uyffa5hp2gphjbmr5o5dyk3g6hh0e9ywu7k7kp2tfe77fy7gbv9tcdb9okah',
                adapterEngineName: '67jmluky2wl4kw3pekff7vkduqk6mp1g52rpu8ui8608rju5h31e4u597ojbk1xzso753flofulo4vio1iiojs1kxmlx2cuca6huv9q095r619fhuvmm5t2xc04oocmhv0reqm5rd5tdvoml5tagdjwjaoh1szl8',
                url: 'jdubv6lfyjt2vn8l25yylfph5ox35scuu5hyrbhics8fdoboy4b13ivnc4zqwx4bwq1gd9j3vef973wu7q5c7tn1ftjkxip00y555l4oh5i4dbmy8uvwk0zs37chrpwxkfsxzkt44ocbavwx2aivxnp2fbsi5ghuno9yvw8fqi0vmlk2k7cclid3jga0dpfr0db611q94uljzb0g8sc7gtmx5vspiq9b5n3miqyw4vkcrpm4e7pe7qemmpniuk5t63p8ldsd9mrahabdjqqs71xdqezac01xpzhudr6d7cywldd1cyskyol80yky60ox',
                username: 'qzkad8izcj0i2f86zf2xfwbakrcesw6lfw4jfkkpgc732wzx00qi1n6vtrtz',
                remoteHost: 'zsfy2jqcp2bxyv9vv1q3je2qwghzrsspi87xjzzilyw0gx224g07pilvs5mrnomo565la4jh13ahlr6u3uav5ga063er5adr9f3pdwf1eixysqvn3xk2qkxilr84j283lz54r98a7q84p9bgjv0dcyn76muuvb6f',
                remotePort: 5989973236,
                directory: 'r2f1zzogp3ingy80h7tubdy43oiyc9r4h69bder7zbhaucdvjluaolq3115q09mjuzetepj7y7wreibtfvoytulz8pie3ug00q6asdr8kc1peicwkb44avnvw11xv0f69klv3wxjz7exxkot0c2xvjes6v5qzl1f1dju85p4l0zeb0z252k6vu6g7mleoep22gt25sp4fox2atp63nnui5kn9k751cwh7dxym0lttsf8ns3cbfwsuoi5v8fuit7pqrs37t32kx632ave2048pql50fa2dyiqu1m11mqi7f4f6r7foow7guc3x55q3stka0swhm0gffjhs0f0dji4r7y56yurzxnq61ogz0z4vex9gwrwovujyvnxh1apatjc53qfnfiy474gvx5mimz6z1y61s2a4smms6bzlhmolpjgvvg7nfn56byxlk1jox1llsnktb35toj2upgtc1aemm98el25qf3x5rmkr8uj9zrmfbvpg2a021r69ew5m1jbi6k7riseyokcefvrsrus68gvebazpf60wzra4ofhw23u7hclzbnkfwe4g3t87itqm9u60sc3n2t5dl19z9z2jtmroiti0a1zr21qcc6a4v9tp1l9hv5hzwzbu9jjd325m249rxhpiwm3q8tkv4gie1jr1obuyfmdrabl9kzt2tl8puoyrhy2r2zgy16xq0z8j4qtl4da6eqdjyzsv2k8nh4xj5b82q3f0kvxo9ri0rz7hgpkdeuixb9xo1c91i8fdd73t8xzfiilvj9f83nsvfoomvgkrk6yez1d4tdvaiihsq7cg4o6lekup0gufcix7csr07mz0vca1okaofk28nh2qnqm8duqnvxgaeuodx40288qiyhfoie2h36vytyqcpk4p934783tgoqnvxra5ufagink083qftkzusmfykjr1aqoypsdkzsphyj37yhvnjkcwb3lee5mgzamuoobaekzyoan6ioka0stkne29u4lzpjw9xb2azzynn76htxw',
                fileSchema: '50t1fdulolges0nlw07679ibowhlkjuoz0uhtl0ek0elsbo2hkxdyzjjho7zrwyujinf4w3blc4w6a04uimqnmwe8fox4v7vkrr59qqx8kzc019tmhiuxef6wyzz4u2d3xpo4ctkhtg5j0n8i5s0r5kmvd7pzamtu57exg71i7a95p07iaekps2l5e7cfqs4onhkeibi5d3kbkuc0aktw80vu8clrd6ydmrwbdfran6af7u6z4w069dtx4tmj2t54elmbhhayjii8lqc29icubaxz2nxe0ivwslmo4p3w3idx9hrwmbs2p5mlfj2k3jwb36ae7t1mntodigb4lwrfrzilf5yz2ydn8agp1gjv7ymziqn89ldaem4ij48g6xjxetql9oo13e58zogsvb0ld9iz4akk6786rmjpor750d24x5acnjosgem21w70ws2tsdxg27d9zb7w4oo98mefsduq2yntvromb7pb0x8vq8enao5fwmrhhss9kgayo9fkyb86v0zw14ftpptkvkeomprik75xstim6gkpcud9y8dhyvxw2z39j6vu22bg0kxcq6bcu6pirttwli09x5l8xgk2354gz38988fc8bt1copv64fjd4978d5pdsxhy48imtjpbk231w7eflmhbm5d0s0f2zqkomimsf7w4fa383tow677q1yya7c4e0bp9vohslu0r9499pwiulnd722a1tmvqapxa4b51aghvqd66f9jydrhkkkf4w57kvvjuj4ly1lrgnc3glhwv5e4gk095wzrkeulucfzwpm05c3p0ywgxjkw6bwctfr6ckto3vt7yq1sd4545xw0y8381rtqavu8b872qrpp35kody4lam0x7xo2zm1ppn28zxrzdcp7ukm6r20b89a5elgo8da2zmx0vzh4ln3c25i3qtfvdie15dql2f8zedt76budiqq5u2jm8xyzz8rpdc0qmwenxljd44wzddhn9gw4vi4rinlluttf0o0j28e2amisnh7',
                proxyHost: '8v1pd5jzp66575yweklstxzhp0ncw8812nze7o9f6ppjc6cyxvc6u25486wu',
                proxyPort: 4535331163,
                destination: '4du9s75bl0d2luac0m1v9l5v7a8v2yxrxef4ce46tqvk74ewjtw2xqwudpmrqw0kmu9xzx3lyyevfkd3qq0kxtfn2szidysozcly2kjp2kf3yln28bzssucyf5fe3itn9yxxs2c5euqib0e0xfgx5whu82h3cse7',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '63l2i50zkpujhod7doe8u6u87rj4smxn2dq6r7shp82j5xr9198nuiphsznmftpofctuntwut70sejzmla45uymfvotqmxh4qdkc5gyhgd6rgdrc4n36kaoy0sde2irkrr5fx37jt86s4iynmrp4ohyuxk3vykyu',
                responsibleUserAccountName: 'kvd39titiua28sgksoiu',
                lastChangeUserAccount: 'pb1c8dchuhg9iuk2vt51',
                lastChangedAt: '2020-11-03 20:26:22',
                riInterfaceName: 'prhy0bgjpwgzomjssxff5nv7napp9dehz0dgtgtswpw9qenlc8pws46eve3uoev566amyshkmro8ftgekee4zbymra4xe510bp1wm71tje9452ogopt4byh105cqd9mvtfkmr9u0wwhy5c0d3wy2soet6l5agn0n',
                riInterfaceNamespace: 'ty2awrd9vmikt2yufdolrpnrre2junzmqkdxjarplm9dwwucyzvpw3ibqrpqymoq9xhpzyc4b6sb38et2p11v8970s72o7twq1opq2zeh782dfhzv06jpx1rkpalbiehzu7px5a2q5cw5w0ucf5sk386t228fq38',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: '4c1egkm6hlmdw4k9fq255a42bfqazus8ijugooe4',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'm2vovngo8czrvej04pdtib113rah6dktl65vws07z64sh3j1sq',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'a8qbnsd8jg2uo14xyvhg',
                party: '0lymdtgrqy8cn6j6yzycowjmfsfufqu6bvt7tw8hxzufyofmmdbjgao163q49bq27izq1ttxcsznka4x24jpf3v5jqlup8fy3460h1qmpsmnuv1cr34rzkok8szsecmvn2u4yf5pmgx4pb5ju77cw5e9bb3qh38m',
                component: '9dogx12nmo4bdvdos7zst2gzq44ge5x60272ykqpzld82wcb6boo26ws2a15s76c1hz7s7toqv6v41nr3q5xarda40mirk9psi4h81ky721zohcz617ga9b20bmj7tz3rrk2eygptbgu1z52ef20z1c9st7xeoiz',
                name: '6zozfssd2akxjk898gg2gmp10yc0mwbhx211c2qsvlw3y2g6z0j75ifcpvawevb5qcipwap6l9dhdzcd8zwjaragd1mavwrp971b4j407lzt7uoaz94wnth6w377i20y8xsbg2urq1m74ab30sswqme254zm4jjg',
                flowHash: 'd3z1f4w8opeujqo6z341jadzxdgyxyue53v0sszn',
                flowParty: 'jpgr512bcxn758jb3yexmsdhiijrjlqqw653mk3bbwien7knupxxulxlj5pl5kjhjmau9wqtjdgw3t1c0rdymzjzhmw9ssjpbgq63zv3svjkuwg3t05hkvdxvjljwcwkpf03o6rm4hds9x1x8wppequpcirioi61',
                flowReceiverParty: 'hw0kt8ac34zkn435xacw32gllu7zexczvgeyhvulqk2xxdosncnppbtboiwt4v1t7u7qklycjhvpbbq40d83mzcihx0s71vq4n9f7x5who78ks9xdfl6gp0wlzfa3m7m52v1zbbqv5haex2c7pvgli2vfe92quss',
                flowComponent: 'wigzwjnyb1pptw7zb65qb8s7sbk7i3pztat7evig76l42ew5s026h70glvqk5h3gxbwvag3zqwqpdd7aq794l3e8y2wygao36wheqsj56xdu5sng7ii9cx2wkb3q8my9uwvuraaita3wxvfhoyp3qgm4no6ym6po',
                flowReceiverComponent: 'ian02l0vw169cz60w9lk3yuceicda7wv1u743ag11ere369hz8wfhu14dij13g0sits12nxjg6bb1urxfdejk1qactt9kd9ni39wnhpglujwri7glmzx0qgqptur3kjw6199ax231a7b7wuhzp5a7d7tuvk9cees',
                flowInterfaceName: 'm3gkqmzjecu7fbqh7junlw1vqca5puhc1m5myg7zxe4jwxwpzwwcpkej3br2aic31uq8ewj7mr3w80p43gpk1x9as2bqqpbl8fv2gwlm1oknmetanrpcsfb4jjrzze4fadck43kq9ncy1xwzofym7e7al4ulkj29',
                flowInterfaceNamespace: '8ry9mc5a9xd2jbaf06ixd776qkmlt0qiui94m1q36p5jjnr5324pt2awtgdgbft2aa455lzuxn6mckithsjqbgyozol6gu2flxzfulzotldmj5x6wamgm4o84oi0um5leboimum72ulvm0crzpqht3581xjugueee',
                version: 'n2d57xgwaxu6rdndcw7p',
                adapterType: 'f047negncn235xat89e6uk2ku9zl1zhze0hyoy4280al7wvka5s1sylmwhav',
                direction: 'RECEIVER',
                transportProtocol: 'dl16mujpu2yhedg3saatiwv47ln9ej46o7cnlj96g762du16nqi7kt7ti9bv',
                messageProtocol: 'euzjryhpahxc3icnrnwknp6kowbp6o4tej4dye23abscv63s0otpx1nr8sl0',
                adapterEngineName: 'bk0nlxeus2bggpvdd9exhip0kqwlm4jtf7zia5elbcw2xnrfka6241ocw7vg732ycblbunyhyt40m356fvdnjxukrq8pipnuf15lvjygf090nxt9d1pzceglq0geg4me52ag1urwgmqkfov8mc35oxxzrtf4blbr',
                url: 'jj0yupq0pp0xsq8po9s7h0oba7ncv5e9oucb4ep8xg5q0d66b755au2hka7fhosbxxsou176s9hqldm7ycnxm5dqnucud14li6u1tv4tlpepxuzdm838x0e2tgbjdplsoa8jum7mt5rf6p78luftp8skji47ypunvhvb9j5w0gco72hlczqqphih50wb89bogvs5z2y1onvq5trpoz2a6xcvktepxb8xqjgmemui66eqs9q27mwi0dv6n91vtdhdcz5805lmndww8kyldn98qh4emybxvyhrgwl8w3xxcm7mv0xhhmh754nhy12pw7gj',
                username: 'x7jo0mj8bm7kpy6ovzea2ar5h4zsqfbeibpk424q167i6b1rxkj6fhgf3e84',
                remoteHost: '5wap6d3twi4zpn3z66918fpn68z5ke084os8b3cwjf3jjxv4woi0v7m8jm1z3kdh34gr0tpougintglmbmr6yras0sa74rih82rd8b4lrst4tivbjmtov5g6i4zupsc64srjcbnakma6pxoc3estwqp7wnxmhjbu',
                remotePort: 5571798270,
                directory: '5awxyn3oz8a2ggbqx3p31vgbss6cf9z850cf98otw9fv269i1gyj6gq18y9no8ao8yvgjzw336sq904kfbdoj3k68igjh4oa41ohrxbvi8prp2amzcqn3ru43ny8jwjg4sn3pwon8qw3fhbahj6gzs1nbkl8r9rldzi23baehqqwjstywr67on6cw93n9vbvrfb3ib9mpr1pqdj6lhfto4mlxzzk9ed6pf3yawnmvhz2hwtbbvzh4g9x5cbwhsxmn4fncwxhv7ofztzf3j0xhw5r57rg8yry3gd7i4tv0fcnizczsr9dbjbefed9787t137icrwzr15u7bukkzbzcrbkcumgykfcfvjaoymh1t2uu7ugg9ljcpsa02154plzn6ssybofnua99a58eolbm5f3u969fdgw7qwh8txstgn6gkugfjju7say9h0li46miwxb9osqk83680y8fqal9vz1dk6p28pdzlk9zxy8tfgzkobfmgd4oppxqhozwjzsobn1atxginrx42pufram7607xforp5d87lhelz57hscxu923atf2vbaf90hoh44wa3hs2tcptwgsxww3yg4txpe5fwks1xvytfzz5y8768cy9ylj9nft4x3tmuxt5lws2l480euhx7ecoksbocf05w3ccvc1ec626x51b71dj4xwd4d8u85imailu169j1laaju78k0u8sww17qgs51zjqi5rw9qh2i8s570dpmrx8s5zemoo6n02m8wa6ct72eq3xvbiv45t8r2aqpg95wqqwna9mk4btzqlcwc8y7ey3b7g27dy4foz6p78ik1s84g6njyj5qxg4ltwpqnqdc2swxzododwfzli9i9zqw9qzg2qf8lm31ixg4c2gsu1ringcm4b9cf5p6xyofanb7x5t4zoqktbbr9k36zpeko8j4lunca40t5egsljc9iwq81kbv6un69vatfag05mme05wemog98zz384dikdxfphftvij6ik51nycgp4blkdvap',
                fileSchema: 'ftlbn1qi4914vyo4z0v4c6lcr78oa6vhx7lhd4nw7a3ggyrl4s0adq8ji45x51ia9x8gpeilxidwjxnfmqkve8szelnxz679tygkn139b014tb6d498bwiebh6mg8iyavkxkaz1kys5i53q64vk1puwfa3s3t37g5enqin7v7j2hzrjdyalrgkt0od5hqpz0a9vmxfou6ed1oy9xuxh5e9e6qoxyao03vuk5p85w3nlz6gci6xg579r5ffwnnq8yjwhmfofyscxl5d64byud9k9cb4gwpgc3ukikfwo8ksd4ny68wx019bocwxzvm0v3n6gzqp8gukg7j9b1crhhc1px1dzzkljbf4mal6canv3mual1p9fiyt0auhd9ja9jxg98b5xoqhw1lizz861rwleanozqs4u9gi62db2mg5ucqc4m05xt8c4fzaalysa8sa21xfoe12ts8k545lc8m4hxcliow4w2q1al4aobitl0cu8utqp5hyltx0tcxga29uv7kytrcbq3ulq5yh2kmtdecuhjget602rgc6xd7o9ri19gypf3v97mdoy9hodkjexvanvf31gdng1nqlsvgz7glav3z1ayxoetwlq04f2lgl1pgva9fora45ahjmcmn5gal5omjhe5dprr02rwu3sslgq49wu238lmayw85yjeja6coc3dt6bdwxe5r9pocljqyb36zr15atdgllwe49c2gq0fu6l3i7zzzkvxbk521hrb1ryljrehbgu2wtexkhtc46hop7epfa54jie8rnmrs5j3fko75lmenxfjidg4lxhjqfdl1mtjzag37bceiui5bfng470sx1i0a7d40ds5dkj4jtz9oczuipe8uqeic6zputzlxpodklip614dzeto0xa0bl22qugswl6sqj8rzrf81tqnxyf34t8azocl9wipt5x83b00l57puyxnedtyx2twhr5s11kb8qqrdj0vgivh0kfuhrje1loeehsbrc8mag33gf8dsjjy1bix',
                proxyHost: 'pczf46msahzrm8o8h1hw9lhsbwlnb8mayhguiilp2b3whb03e483ab2ws1qy',
                proxyPort: 3777216384,
                destination: 'rfjwk8w0qvwgypzdhzpdoqgqpodqhkzhyhw44jciyc551qbckbmxt750pgmjpzdba3hcsj6ygkqolaqvh4zd4xpe9vf41u2a3wikdpyjlgqagyex3uyv5n4k6vtdsa3j3oohatsceng7dn8m5gzefi4tz6y6dg24',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'o67zmgs3mif5z7j96yz6nqm5wmept4bi4i0l4tiy393sirqhpxr7e64peh2cjh5xqshqjbwc12j6bs2zhb0cu027fm811q4q8j559ya1oedrzg5jnpj49uh4noa9o3zbrzyb6q9qsiq1gyqsuywgv8adaq3sa5tj',
                responsibleUserAccountName: 'ajr0ycdgz0hyqhkb3dj0',
                lastChangeUserAccount: '8zt26o2dd9bo8r256y23',
                lastChangedAt: '2020-11-03 21:52:29',
                riInterfaceName: 'eqkylxwmen8szgf4l1m74a2ky99b3bq9gsb8gmx5tfdnn401uje56a1nbsmp59xxsnk5exd5w3cd68bpnxujk1kpwe8d0n1q6b3ow2d6uziiibxpjim2vvj2phgc2oyxi6teokpssr9abbz2uply0fhac2chewf1',
                riInterfaceNamespace: '263wrx7w5jsd3cq7mv9il39tv1d7p5drrfe89hsoz65mrl0viikcdejtppwqtawxph3y3mejmq0z4du3lriyqcqhj5njlbt6o8s71ukctre37ved3xjtt8e8m95tjbsyoycmpbij5pwjinni58mcd4i6y4rg4nyu',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'v08e1v1sz1q0lwgmcydchtp4npmdrhu2hb3uorkf',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'gs5sb32bcriycakzzamafn5xnzuys8l4xlo0vr6r0t08i6zr48',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'cj9o0d6v23gyr3ez1h0r',
                party: '2magoandk2cnvr7c1blqjjiv4al3n8co4ezfj8vvocd2cwywmbaob9bnmg4kv7phw5kmpbc4u10cplubwxqw6ny3njcv12etrmlxvqcneskwa0ku1w8wrd32rjhz0tjekj5j9h309bsis6jjxf1q2gx5k517xn30',
                component: 'zt2n65s6md4zsjzxumt4arzz9lxm0us38tyvqgjy9r8mv2ndvx2ik2yxypvp6wfkycfou2an8j27nmx84gr9a8crv5wrcuzhv8gzi9ydgxfpv6ztjpknz4q4izvdzh6sfbsqtnhwg8ih3dlmo57whcjho935s1z8',
                name: 't7cjkt0pn5lz7wvyivkhr3lwft77haagsfmh62xzed32cf4uzewoxgb1mx8expl7nysuw4jr1zkud4ecw44isfcm6a4k4lpc62053d10m38lg1k1xnsooz0ff571vqp1prsy2r292j6ssrb56efh2irw5gbo8wjz',
                flowHash: 'u1t7qir9s70zs0kppm8w1dcnn5qndg70dwlgdeny',
                flowParty: 'dhb0ynpl3rhfonlmsptv0msk2ocgxviug7avkws3qbw3yo6oif9y95wx8jph6z4m0xo730fkjpbu8ykkasuiusmenv16h0yu1ilw7w17ap2s0mosssof2dbxkft67qaj5816sfq6w3qm7zpc5ptaso4t9mfi1hgk',
                flowReceiverParty: '0cp44zxaw1vobceak2hman7jscrv71iadrejkkfvlhon4wxmnvzju20xk4w0qutaemvqgvqer2957kuif217kcakr42pwj7t2khvdwyk4cb67m9nb1qgcx3j18qxnwzht2h86osrrr05h6cky01eurph7oh6ux76',
                flowComponent: 'cvw7x0wgjq9isrhgtnvnywla28ri63n528ydbmq4okjen7z4hzkzsmiqsuj790mkog1jsyipxicphgd0n1mueo73cx4dr12tn0hh8kspsmcbsrolfoa6cirl3ohaj6kge1vpdyhmx10asgjboxmttmc6fh1hx8nc',
                flowReceiverComponent: 'i0bp8f99vwvfkiz0h6pxnqgre3d40iacjgjdtic4sxua4yh7gibpj6evnv3xfx0fnrthlwtbproxannze1mmtt73mr5mtsa8ectg04dj2qe1lm12oilql2n6ghmgn58zw29b56ptumabvdi00zm4xz1mkkk08euz',
                flowInterfaceName: 'jxjhpxj6kgvuvmqcatcyu5n3e3wihfmtkmq71hs7o43bjae56p806uoeu6ex8xwm3gbh5kazmt67493lapwwz98vgz7waxjitz7q2n26ulhy862g4s8bhsaj4h6oouer7gis1mn5y9gpveskmx30sef62m89t59z',
                flowInterfaceNamespace: '4dsvn44cd05vhixa2qbfvc733uu7t9hw0cheu9jn1h8flcg04cciqiecj2gvef4eatal4uynwnr4cn5ezy2je2qlvy5itfdh252v78xt2nvbpnm1eybgvsqatxx64puxvreg3hqv5n2jhken37fmw2eddkqsalil',
                version: 'bym5ggseslebufooayxgi',
                adapterType: 'tdpwgp0equ3y53aqcu0ajnykt7c7n8wn5mnkv3bjhzwtxop6dib3et70imdl',
                direction: 'SENDER',
                transportProtocol: 'mtgajwq8js649j9ek7w99qno3506np006a1abelkypsejb094kqaxqpjoix7',
                messageProtocol: 'y74bcqp5ot7ehkg5gaw8negtz3k7oc64ihk0iqr36yymamnvo7b2hlkucy3q',
                adapterEngineName: 'f91t9g1yxvx0x9vzlhc15jspfbskffkntopodfo9fdwgpuqcnch1uuby656ew2ax2f3hmiin889k51s97uxio1yix68uc0r6ejfrpnwd9gb87c9h35b65zgy79vz04tvk9jqw7mmt39m09g8nedwwt1uoo1dl2ik',
                url: '4pzsp7q3nukh82tsc4nus8wrlvbdwtt6xa4ep2q2weyqrdheg6ju36q6t821dmxnp0en68qrsa4ubruwrypozh0rqq79pkd0fie8gin45hodfq2e2dh41jnra6n0oqngtx0qphqb0ccgi1b1aa18yofqqap5opw4jmit5et1h65x4hb4i3i463nfqg6fmk9s4bkp1r0lpwum5ahf87owevszb2sxsbf3yigeis51d7njupsvwdgxwevx6pe6itecsh6pl65kwgjw7wggazph90s078utn3ueqwloman9z7gzz4xs2kjzk1mhry83pp6h',
                username: 'z0cyzox1xz8kxbdupk2sd2idp67q83vqew0unbk91ntlkhtvn48eufry1v35',
                remoteHost: 'gx2cfxnjouo3m9caepi3drrtu3huvn3wdu85iev250wyw3zijg315o3ozqrge31y2jnz9orj9y0iazoyg9wjzue7p970g3rra46wumfq9cps4pkjcbiyn2j4ajz6o18jnu4zo1t0xs3a2zfmzrklsktbawmfts9e',
                remotePort: 9798339066,
                directory: 'ui61be3n39ex8oib8708hb8wgzkwd7g8tdctgzuts3h2ujagl0y77892v1og2k7rmxgjh81kwq138lnt9lgydml2rlofu7hmqrptk52g26is8v52b9m7qiu1vho575znrjb471vy4emlcifhaqbf67fkjgxsybadq1kbjbe1t1bxoaaxcvofw5ft69zlub31mmx21i1ai0v4x82cifmony7jeq5awgat68bm9hdy8u2kzcsk98tz10p1uz55lhdzcyj5thkvfwlj1ia1jkmbabya14ylt2m85bzylei81f38imbwojza7jtompfvmfwi3wj7untfbyryuk7d76f4u2f4ck9l04nx98cfunryfb3tifswxx1i1dllzjv7oeocngawci6qoh5kdkcphq1mkcde8zsgd0251ji028i9xmc5g3zda7kxhe17yjsriwws65nyp5tahyxvemx6we1yyslvfu2ahyhotpciy1vxm6g8z1hte6v3w0welm4oy3jyysbpc5t8z0zgn03mobe0rik2ytk7bqq02r27xh92v1m89wgt6sakqhz63inxzluofd3ums57q2umhmaqgdcmmkn0c6zfqeonpgi6qts79mxynovt5hryjhfv78r71jv0pguotk385zxudmivlky2mq34725z7lazsjcyn12xgd60mgl25blao11pxm61i16eafn4ux51b6drtnzva9w184741apvozi1e118blvks8ris12f6t0uez2yk5oo18ls3srnlpshvuuvs1yifci4mbmwtufzea9mgrgr15sg1u3xr1037xrvpj07ch3xxa225l6z64j7dx2wkgmgs4i11qaj75mv7eazd7lsvy6yg8ae7iwd84iwm6ogmexqv633rz1u6s7qu0osflyswkk2enop0xrcw825bwowwzv55ct0ijveha4rcm8p6tozwlzivg258wlb6iqw125y1h0erj2y8q55nnb5lsm24oaw1snzjitpc5lvoudcgs84ul76',
                fileSchema: 'rzsiahv6f1m6hlknu1d9hgs5cifugq0akz8re4tc9upwrndk34fy36o0marnvt4zwvo3bleruleoo8ckkhy6x2dtiqbitszo4jcv7vdtluksvm64syvw708ndkg3n1ko9mrox9t4hjecozld6bfoqdg4amm8v9lx0a12pd6v5y36tdpt9d96yq07n94ks4ftvyy7adfq12jaeno7uuaehlkjfmd5zbwfmv9j1tr8w69v5z7zjv7qeikgf9y0l6gwosrqabrfxt9k7pxlrichqc582xlw8j6crpt42dkkwbm4bspzhdo9rdrqpzlrxpy1hyfw6b3pv6r480jni5ellruqut2l5gff0e3m72vm20snfl5inlozsvjchhh54katy9par2vwwwif1v4jh9x624yeqg8bltyhtol22fhjzum5zaeu7dh2vgv8dcgrl4arbpos2ry3lmrv6se82m90gvummizqba4ljgd9e7i519wppm670mudfwp8vizw3lkbj7oxpaly0gi44ncwne528v18hsd4bhzi9tverbbw7dm9m77gxh61k4r2j6p1t8mo0o67cp9qlueie1bdbptcczd91ofcopuhl8h07vuih9gq7m06bkb8eqm4vs5bunnflwc8c7vxs0nvo28ixrkyjvug4biqflt834k3lo18mf80an1ugjn1brjyov0muklo985p0rwa9nfddarcqg0k7ewuk1iej0nldjf2w4wrpd5uegwe023brudkx9umgp2s07x6ew349i4ruudl8ym15jyv3yus7dpipihwdkm1vior2exye4i9qg37vr8vtx6xxom07408ph10y83xzi9ouxp2oiqllgi676kvv9ncv09sh82mlgunq7idj9egjcwllfzmm2qiwy56pomlpu2r0m80s78jigcxtbr82lyj7sjf8yvicrkrz7sczey2ylfu28waxu2drmfdvobwi3fb1qhs0fmgm1w63hdk5gqbybevjgmfy2kmdmzlb0tt7pcc',
                proxyHost: '1hmpwo54fnkfqhevhi4giahhn79hmq6mrdrpmlgl8dmby3110j3vixq5cg4e',
                proxyPort: 3569384595,
                destination: 'rqyncncvhi9ts1v7dkvwnbwnlor8emc71y4q545dc7ns40e7hsfz4ewv6y9lfebitmefr3py7tpbzyh5orz21gc3w01su40e0a5ibm51xjnw13kl305o4mczln90xh2oj84ov7ij1heyq7vg6aotyhma1yhj8ntu',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'qa9me4k9ci8ajkzcnx9fa7ohl7qe9kfoxo335ogwn4si0jn4g74z77jkx8kmwpqpdhtsv5r6diq770lc58rpeth7bo9b56emm2e69yb533jrudzw6bnjexq77x6drlsmjky6xnka6rbkcc84lzq340kt2xw6rnn1',
                responsibleUserAccountName: 'zbocas2ya3i3vcpusp3v',
                lastChangeUserAccount: 'gg8ogaoy1k04n5y0zhtx',
                lastChangedAt: '2020-11-04 05:52:43',
                riInterfaceName: 'yjmyl00ptb1vgnkgbzox28muyggt3g13olk51t4y7bpl6cso53ofq809qogfe0vce4ur20z79qc8r6b0egn7v34w0iawt87q00qsmidt4qh3ssaufpj1f28d3kd2vvu6bxb8cd8b993adm1ttavobew8rpugn5wq',
                riInterfaceNamespace: 'awnot8qz8zqlu9jc0ngso8ee0fi6oz53zai3z6n5ddwjajdzf7ty8yydxkeiccpjyo3upqz6my7nocu6tocpnbq8ljaro9g21b4cqdniakj0xhe7gikh4ludi7p49e589ewzl4s0t5laty8nvjjychlcpe886gpg',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: '6coor9rxbb1dnz8g7nzvllcruky3rear96oo6k3b',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'b1xwiyhq9ol4ccu0wbprcjyflnvtathb7h5kigjmc139l1m8t8',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'qc9em7ig9tbljwc92my1',
                party: 'q3sdlmqcd3mv72hp2ghb8ltwz8202ttnwdhxhpywkuacd3y8i3aw25cq1m1ll1c4zglk5jdg9wm3uiooa7ucto4b2fqkg0xur7hmo7vdizapms1am9okkerz7flze79qmean5beaysrux7ozlbk7snxop6vlf5o6',
                component: 'dodvlbbpj2z7n8x3uowr0n292t495jcxe8jjohat0cf4z1e54k8vk1xv6ml3ulcgee4cu93dko0nooykgigo98zyjo5dslkcvol50i4ehs5ir2odzduskvrtklbtdwuv0oravxbgau4oey9mm7ciqs6cqnzg6bbg',
                name: 'antebt11gkv3ejdpfyoshey5eby4q2thi2j90cb3jql2erodnybjjtpb3cx9ybf0b5gvnwowr0hsuyfy3pe8aa9z6ammi3fogaxlbquu3hhdqu9x3x74j18rd0p8o46zffgppurf197hfhlpleid497uttalh8so',
                flowHash: '2hn4mt3kdxdb63172a4kia47qww3bo0tsvzgwued',
                flowParty: 'jojvjsm17kearyxnhr1zr8561fxdg15duj0ud0106lnoev6pmqi83c3kcjvk9dnf1yo5c0qzgk4e6uol0esqhczbyv1iyt3lnnjutkf6q4m38vy3n5on1xp2bybuar95kkju9bh3zq7kx6nkd25wr31qhbcy50rn',
                flowReceiverParty: 'tzqgbtav1dldqlh30jr6xep6vre8h0ytcj69vvzmgsukm2igp1es8qdfgn5raxgp45c8i1x71z57bcm9h92cbtykatuj1b7mm1k61iupf9r3wk186nokm50waxec9rot2ehjfustfe7q5bzegsks365tpxd7x1gu',
                flowComponent: 'aly8vzz5zkpnq451dkd9kbathtr0e3qqz0jv7m1cemhxge3gpvjikrs1zhgi2fi2kq4a1ta341lo6v8xgaaj9mvru8rzz8br53l2l06i6d5f7hdc4csy415jbu55qyr8re8h13zwhqad867xu34m7n7wvtczb3i9',
                flowReceiverComponent: '9301am3m2tdttap8t3q7x1uik1ronz58zwfl98gg1c2ttf4vlzgt4quwfge0ggknbnjvohihbzr7fdduxou723ijxbvxd4hca2rvdgyimh2yhv3c8r6q039g1ci6q9hxen3lrkqree6n48m2tp3ibzwuj2y0qcn6',
                flowInterfaceName: 'mp1t8n98yhk4y6thvnnzgf62aj56kyfvg2vgyx4gjzliu6lzytzj4gcmenehbacbrknecwm1bppdke7rk70qlqcy813ptc8txxmuwynmo2tl67t0xnecvfaaf5xkin0bwztf41e5knjgnx1tij7bt1oyp1elo4hd',
                flowInterfaceNamespace: 'dun1yrb3v7t2jnw9ab5qux5n281ypuhc7at5dym3drgokr1sl352v2sajzt3rsem2kkc4zgoc5m8e1ra87kgb8bmbc5v1a70x29ppkt56qfzqidii12fdv6mx7wcfczqy694ysnuetx4ogf2ic2b56zaioz7auhz',
                version: 'ra7uaft4w2lvkunoufrf',
                adapterType: 'a1uwp6w0frply9f5hqfdcvoxswv484fboj28vfx49nb8wtvj9dv49qu9ddve2',
                direction: 'SENDER',
                transportProtocol: 'k5f1zo6klfhqzol9mp9xnwgzof0mbx12krfrwy6nphdjz168yapc76gbovji',
                messageProtocol: '0r8vyu0srr4p3v0nkhonc7t7x5kf1wl41vngz7lqmirlnyxu3papfe9t13rk',
                adapterEngineName: 'y6uh91vtd6tdrse1w9q8q375hfo14pmcgur1a8xrzc4qgsuwjt4allk18bgbfzjaf4zo177f73dt19v7k5zd18qsmtfww58fgwak2098gjcoyx8jhul3oea2bgxtf58391udd6geyeetsstmdgigslilvg4vpb7b',
                url: 'fnr1oz781losxnh2j1ozqjx6rzcq7q2nll3ju1q2ae8z6xz1ts05ixhxtdcmzyvj9wv02ghhqn3hb3rcp0id7600u957bxgstxqix49tpcw0kvdvm1vhpyp61irfv3qfmno0sd9zdywfv4tsmiggd0llue5fblgdq3bo2mo6t4bjo015t43rabb4p4fuh3lhopmwjejaisnwhdrx1o0cpi23xphg7vs5uej3bqu9a6uf515warefq3gd5kkr0urnz1n2rirq3q3q15v7qs7jvh49kcl7j8gcuxq5u2oa8esnvl01meoau14u8ro0afmr',
                username: '62jqu5eu4fjaojd4blzgczaus3m8cyejtbdow4bzyd0genxww0esmsvdntlz',
                remoteHost: '0ew1k1rmipf56vtkn4soz3c0r0wdr5t9zmfr8nccwxxmqrvk219m7dhinot64smlea2an2z4mom5g6v7gj9jcso8i3n9iqr1om52h1wppt1hrxibo0pw79v0elcovzvsnhpvko3n0p4rewskuv7ypsdyu5yd3qn0',
                remotePort: 6984789357,
                directory: 'atad4torvw1mgal419d9ebkcbdupidukukovfi7ge460fyhln12desmgwu6i2r1kh32e7xbbaepfijmmxwdhnuny98ud1861iutomdzlaigjzsloqga1mr45ys3lo0linn8lmwe11o4gpv5zkjh6ngjvc4xubufocneb771aevm67l44aalsmvmrhr0oqj3f89cu9t8wqqbyw4ooi014juhvcud84ga7fk5mb6z4w157o3j3hiqknh0pvid5w5uf3kksyx2am4ww5jnje39rn81q93wg2fbm6f35v5cu5rdzfityaacpdfsvn5oo31twvzm0ypvceemuwob7rr9hpsx6p4g8f52a8lu6jd7r41iioxs9erjxrv73y32en12f6gen88p7qmzq0ubpbz3hgmun2zbkbraubbgtvq94y4667dm1qnyuqkskr9uch31oav1i7vqy8k5mmol7dnem17rnety16rdbbty241i2hbeyqrnu7mkud12hyo4g4smiy4g2mbs0fzw5x3y0ryps76o8q9e4ewnhy6psvabqxj643bzdu8536n2m6b0r2kiz9sirscoqgd3vgts7ltiavq1g4g44u4ksd531d5v6wst4afhsdo8q24q03fpwlkkkeryo9rioum6uunp9640dwmq5cibr8phnt0howvd32zu0owvcq31m0h2pq1bssaxfxs2nl13kgnc9n501643eyv11aajg1nbgkhgqkxfeu4me0nhzstfjvtyjpfewdwvklez32uq4vu4jlnvxj96s1xvqaen482juydrbx8alili0jvvr6kjmdgd742vchywiqp5mjz0svpbk5u3axy6bp2oq1f0lv4mut6k2d5ihflnk88pbqaczyr09x14od77nb88q500j8sbhmp828tq0jxrivf66iz069hfak5np6oem7exa5ofs1pgtphgbbmimnsbuz3e9sob9nj86mde4c4u00ah8jc35t3hzjs4hczura0ywfmnai2nzulcua85r',
                fileSchema: 'e6ohl8g1fnp5ldtmz83kc77dytrcflgb7ploy7xcn5cljzxs92c1u1uqed5mi6ggqwiu7u7qrv0fqhhh1xvzvv4c4now29dy5io2pfwza9i1tdnl60czd8pbv1w8ppkhp2g66qwnyei6vxhck55ue1j0c7pp9cpvbiaofljq9hc7ieoipoxu1p4bql7ho2l21x6lktyin7t3adcrzpxl02gda8klv4xu34h54utywq8s3k6gvy066p9bfmys46g9zmgrrmvsb960r2qhjts2l0kvlahgkei8da7rhqzct8i3oa2uhdabjzbrm8r1w7lfpv2kup5zwpwa4fqkln9tia4w1rc0ulxwyqli5yp2aqkk8ht3jc5850slc3iqo4xbb0rr162s4ynjmkb78i1vswae2om2hurabkvaycobi8hpo60f2lqfc6ssnflwtzxb3s74vtdct6ik5fkz2k83t80qj5r9eli6efh8futgdgp170erbtlw0ye4z46f2po51ocwlcko5c3xuaw30s76t8gvtg7d5c34tw77iqezdr3z1dwr8p6sgvhpjz6pvazp8apxv5t66z8uuqrw26wmn8unoinkeiyp3q7w1ljf7dakpdb1jydwfpro6azx46oxq7jv5keohh1cj1sctf0ix9w75o221lmwejzp4hi85z3f39and1pkwuci60vcqhmtvo8cbfez86z4wvzqnqscma3nua15vkgr2upsii05mqysnfdjba1rp1q0wnuf5sk5wlxrgrxwp5j7ey6535jiucqlo4kf8zlui15mu83p1ztq9zi8tccyk0kfhfkousa353cehel6qdgx1tkvgc67txg1cirf5paz0flx95kpamtdcnlu60ajy1qj9gvo45h5hqr0qnewdmbzg6pwipovhqgdyi59i53vmco12ac711rtxdrknrl46ic1ng7i3i9d47uiyytgkz75qh4pwhowk6nofluan164uss238j1uf2ej2s44qz62jd7ey5poo42',
                proxyHost: 'j71nhb6nc60rd2i0orojv2hbes2tcpu3e9b3s0jv9kzrt9kfn0b5k72u0ucp',
                proxyPort: 5717263681,
                destination: '5fsxuhkzxqil3tazaakkbf0fhy4hed3faqnzef15al8xztded7aofj8crql7wd5aqmkxalzsu1q99aeho8dvlzv1qtx1lza57qtxxz724pt7encm6rwjrf6wstsfbr1xh4u8zac0exdnd8naj4uwbau43qybglgy',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'qxrwley4u52dz9ru2canbjyippbbjny6lx2qgpld4oz12lyyk0ih3o0bksgjvzf2qvusss4mrjahmsokqfkbsjyj8gc04ozczhy75upbdo9atal9nb5nslbxnfy09qinx7khb6ijnq3gsmiml11jmp1y8carcdac',
                responsibleUserAccountName: '3csvqe9ls9henvx8qn14',
                lastChangeUserAccount: 'wsov25lrouuy6remaotk',
                lastChangedAt: '2020-11-04 08:42:31',
                riInterfaceName: 'pwpjjanfaavqkhnbmzqj2tjl1jugf9si1tvj7cga7lwlqv19vgabqkojm4uygbcuwgvjsgrxim4err3c7tmi6q33keg4fkbaocjmv009z2wjbfbhyv7rgjhlbd9lezmb0yow6ahubjhnhodp9vye0dyx0r4hf64r',
                riInterfaceNamespace: '4u3mbth4gt7jgyq0jn9o0112q40pr4ta54fp57go0kfm8yna3eo0zm2a561anvcqpa3owmuswigk7nw3a8fcqz3yjygkwp4aco9f08pdicpcyoyadoa1g1yseh2qjnk766w3fczf2nuljwhkbcu1kpugqeg9pdq5',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'ps0cv8crg6diiziuhljtzxcsg109loihtndd2cpm',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: '7yxw9rngabzd91wz0k23tnuso3k6e1yqjqv8angg7trwpzso6q',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: '9xcdi5unwkayhil0txel',
                party: 'qg2c9a9kab0vhfuzy8bebxb87aa4epc5vb2xm2w11d4q9auagl78as53r6wel58okm6c4z1cqp2bxa5f4c2v0dlw54jqquwst6nn1mb90vsh26zy1veephwsupnkll3ebgmbfel44lohe8i8i1ztd2vkr14di4k8',
                component: '1vqmv6bjw9cw9o4r4uhegl8l0dwawes61lljazhup9r0ntinagrblvbkcqshj0yopax2fmwie8lclxdh6aflkyzuvyvjclo3feioval09v16ic23ygec09685p8wyo624yjce9qalifekhaywjjb0uisq0wvez05',
                name: 'fl1jupd50qdfccolcmfrkk7bjw955j5zzc89qgrlzr0lt1kmw137m6hrosxrm7ybf2g36mriticovgsbu6phx1muq8meksuo732uqr0sc3sd9rlycs7zx7epr46yrw372nhet8ui9rv6zp7mje6mzvflm9swgyup',
                flowHash: 'w3cz8qz3iwemv7jbp2tccqo54aeis89qez4zk64n',
                flowParty: 'l6tb1rdn9mhg5fjdj5hd07ubc2rbukb15ov7tpp9fon60xz7fab0l15ksirg6waupddl4vydhgk7icf60fknncbnpshj1su8bansbsbaxtfjkhzevliyifzdcnsolkipdmziqs4bd3bqurcpf2imfl613mywq9xg',
                flowReceiverParty: '1esb4eh9jwfjf0osz2ixg0h2v4wdxfm314kyrb8w2xjcfr1mus6xnormhab75j875dfkomg37eo05kkl69hys644l9rpuxk5zjm74mf1h6wshkvidu29bube8ad18o98zoqgq94f7k932hdeshlpor2hu2c9mig0',
                flowComponent: '5sjbdqesq8rt4ipciyifa0isk5p30avex8ludbypowfs9due2op0zam1fzjwvfip6p7zvq8g791da9mo8sry5ghsi8b5yms87lfwwb05v273vfss9pyd66lss9u8gl5q818ja87d9p2vyzyytua0xdgsub3f82if',
                flowReceiverComponent: 'r771ecmmg74p5cjv6prx2r50qlxxh0fimon770au9cgglkiyo3datm3ysg026o4xwifupviwmixnntyyor3ztlbv8aakhkoybu229njnb8r8ezljc6ctpe1kosijdgectiepyk62ibug25z115dfzx7b885a23dn',
                flowInterfaceName: '9bpej0vwy40xj8oc5hxmlgiac1im8vrjl826a5ryauqibmtibem6z336errrj7dbfgvft71qkatmhnt5sx4nufzvsoio6ah7rjojisc043mqi0qa2g2zceqdssg1zzokucv4c4prymqtotgd3h0n107nypsskr2s',
                flowInterfaceNamespace: 'pyjj191bcjlc5vg47oyk5th5b821m8ekn8w9e87gjzfc01mya5s13njzlwxcxm2yruz6qbomuway0x8ym2q7pkposqmeopy69bgoy32op3ns5uhr0qaagva2691w08706jua8y1hkdh9pyohnyc447cq5hw4507v',
                version: 'jj2ire06i8e87zlnhrmv',
                adapterType: 'bn66l5qfjg844odff05tdrb7l44cuoibj98n039q89rmr542tetapw3uzx9q',
                direction: 'SENDER',
                transportProtocol: 'oskunvx7kgjcw4ii25fbje7gtt0wxjt7xy2byawyqwdgfz51wvkx1sol0httc',
                messageProtocol: '6l75zz68rhmgn4nj5awxxae3zczg589dlk9a5zjsf9ki5qrwvw2n3czuyvo4',
                adapterEngineName: 'prkft1e53spfo6m5o5elzu9od83gb83g390l7qtopqrk19sztnhdf5ag9mrqxi6c3xgb8z7w50n79p9lfji33b7p6gsx13l525ssid6vwha30jkzhhtm9rojrqoqf5sr5uhfo4hrvamfseqa3z3up7snrpflr0n8',
                url: 'jr4xlhoxxe7d6l67ulstf348ylivyaifl6kchq6fxp95h0kqi5tuummdfmz85dave77pstqoq1byfayv26k1dznu7roixmj43jrn3evezxp5tljhfg9sdg6uwr0rphp3m4rzwwvax5495sxawfrnya4irynd6kty83p6b0biwua6qeg1n4rsk839zg840nr9ivezd5tpl0141i2uol801u1ht9xl733zfy24inwfraziyab7mhccevtuvhuuyp3zbwe3hmrwuwdq0y04fze4jdmcmf0z4w5t6x5c6aspstzlpcmtxmrm7zwkan8akf6l',
                username: 'daqznqowvb82rwrar4z2zppotbvpn468fb0ps6xp18a2s9yyjbv901mbczqr',
                remoteHost: '1kw2se2kqoixt9sr7y2kfedt1py9nx2maua98rmasm10m97qg49m8lkq3q6ohxpwhwzjjkvi8mk9joefcxgcu2lril4p2dbvc4eheybd82ql2iffxlbnq94nwjmvt1vxv3fu2sisrkmlfkam53bj4pp59znsphoe',
                remotePort: 7398297686,
                directory: 'lg4k2pys10miuo6etefbwhm1oskywpnp4zbo78fcxjtkm3q9iz97xm6di9kg8uxxc98ml7kj6kayjgfb23hul9g2vw6z49vsd5m50r2g5eynmk11vjjuu6uahkegooipd3lx1747oqmgqffk0k5t7s0anhj2k3pskl73h204ag8sydofo9q88y8lptzewiddw7h92tftzgkmiclrua4zz8880ni8lxvzpkqymkflehah7k4kfwsjwu4y3al0lgjb8z2lw3klrkvn3c28ss5tbweijp9x62c78mzqxacunicr3bjw6gi5bft0kmnnw43j7dnpqw3gk5nxtnjwz9icb0z40uf9bgx2sbm45j4i3gldae7fl8rxhubg4s5milg1qt7427iw19xxiebcs8idikkiheegz9t8gik7m182amepwwi1yvmg3ra73njryapfgue9fiz21oihjtobcce7w76n80vr8opoq3dikt9i5wa7j6y83liidmenadwjt5c4k4hw53t3a1rjtafzipanuqz529x566iahoos0z17dx21f61a3n0k5civ98enqui2ahjp7vt8jw9so0kacqcd5z69xomfk5p3dwfj293ixp2dkauwz1jlgnru81dw9ymeqhcy82px5rlge3te2jn81ubxub9wzff7m4sst2gdl7fk9i0cg7ntgpgwls6e49315kp1iq2vthuqi81q5fz3ps7hnxlbg143cqzu70nmv9oetm2qepynz3kfs08ktggnhz661d0bqy1syungfpy0ymdyfayo21kb4fvb8sgnadfd9xwcq8fl634utadnhaz69ak5qey7xmzia12hwc5q4mr7yueip6w8j1h462w6zipf61mrvzbc9cfpmf8apsspn760n6j7uopktckaw07bjt2fixkyovql58nt49qu8czh39n27zgwmsw0l6z3g6u14rtt1x256wywcayqe925ym67hsnud0hbvd9s6f12ztv9lqvkrghqui96fhkwu37w',
                fileSchema: '7y37e8n587xxkwq06c1gsw5cpeb4tqijia0g4xxig2b5ljcsn0aj7vqmxe0coat7szy7rsmrt5lvv85950rltrm397inltwcv5z9ukxov081rjp0p6xen92txslpl8h6ryfdm8wvqzvm5h10jm2npy6mzkuop3099tp3rx97tzsxwim216xu4ctt2v02hzubdg1p084k3vty88840mbip31v7aa5zygzqvoatm158ye9f8c7a82knzqb9wlk96v6uhh87s4o29wqbnlqpnu98z4iberba9ygd80wme8kwv6x3l6icd76yeu03eye5keev75x3t5qehmon9wvebzc1bbnkyg7a96gfkin3jb1wctuj5dhl7aj13obinoo7ojqigrjba98t68egb664i8oatz512lsh58kf038zpymsqg24vmps7jtj2pruh4w2fkngrwy7nndv7njnq85bwsofjjjr031hyc8l4s7ru0xvu7i1kaaob0b8dndckaed1cqkbmfttv58hzii4p7myktd1srv569xjplwjf6i6lmctsc2frkxqcr78buezhxzazgkk1glcum0obwrzt17a992gyns3gm71o4nhxgxgey76rxhgt0tx8blsh9lmshveft2z1jbv8wuxqoa6ehi1v2mzltnjpwo9zwdfjx9vuwcj7mgs7qoy26kk7xgidah9hg7ciozo15pij1hzkxg4jd8z3joa8x4rtvw6t7b955pyhl2dxhp8ggxkmjqkjttfhoejafqt04nwpz0q6fir5kuyi5prk2b12b2adw1d3ghs1240gkhkj71d6f4vgddrk12kfm0vb23y5h8oy94fgt14eezw7b8v8ggfvyxbpwmrhidubs6gso97gnropspkg89x1pgjo7wif8wu5g1fw46ab5965ir92nmuvixq2vrqtnlevzvt9oqsq80wxyejktzczq2gmmrke0awa3wail190ybc0jhabomo0r54tdwbnprh59gxeqzdbancvckzjr',
                proxyHost: 'xenpbta6zuanhmnhra69rh0nlbk9jqpurrrcb4g8r45f6rzeep01o54qiep2',
                proxyPort: 8402788577,
                destination: 'dv0012ugkyhhn8tpv919weqqn8hrxh6cc3ic8z0gzcc9mowtu29ulqf8t2z5sqg5voltrtm4ts2v97dwb4yaf8i2c3jyzbadpisl360bwitwj2qlvtzpf6tmb4eg7mfe0nquh4j1gl8xb35dxl0q7o180h98p3z0',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'drs8f2hbqfrz178yp05x6310114eb4kdbljwn96wlaakm8ugrnx0bf5nrg222jqwuvniuye3h7i4e7tj7oqmaa1lxl130eg0vomxkxkzfj9cw3v5lcd4589diqyjf3itf6hzx3pcj0ygznegvibhyilctdjjw3n4',
                responsibleUserAccountName: '1xscmdumjhfny5ngrazt',
                lastChangeUserAccount: 'yhfkl6mzihjt7zpawu66',
                lastChangedAt: '2020-11-04 07:17:53',
                riInterfaceName: 'kebk4489linkhthcnygxs2g693oz5wodmtxc6174urg0i525juvzoi9pqj1qs9r0oxjapaw1lawqr2kgr50rldbwppzw25bd77ntk86atc4ds0q3t1vpjr49b4xalorqlumpjkv1i0kxjmtw2ga5myjvq5pqkisj',
                riInterfaceNamespace: '1e43de89a8b02v9i0q93uaiev2g7krgqeqwmroxgh2yihb3v54434g469mhgi9cf77uitsq3lq385ii23tiez9ewrvwkol4pqmlp7iyvch135y16rss116v1n6j9x0f8vvc6vxzxdvx8xlerfnu466cx8bcwt51j',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'ki760wyabkpcrl2rx5yla3k5iwqwcxvgnzkj92zt',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: '4jl4otp3uwht2f3u3sf1ymnd5pxg6h62uur87hpustixob2rly',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'd5mssx57ccdt0qgu9vhw',
                party: 'vnljofk8yx7xlqxymb6k5iq37eqe4esq2z4ykntq9iuape3181ndd0tb89ftlloa9pk1ny7ojw2ig2yi6sa4ugakpzrmpogen9a39cq0soxci2xehv7tuds0qiwbyi506vif28xy1epuq01cqbpfa6gy86wbtwo1',
                component: 'nxgadxbuk55tuyas8yymkprt2b8mjyut04aza1jppyg2flagbtvcazr9bfxjntw2cq0a4y38l70b9dfcdbj6dgjeagxlh22onc4d14ypc1umahzqlzzm31x4dmw2ow09np2jwfa5ht6xt61bc1ara6tg6ey5eng0',
                name: 'pzh7ewu8hzobf86konp0xkd7wg8b76jv73kb4l0vf17xdz3dlt3ee0mlh9o0w9w88wqjilk0tzfdcg3b302wo54y5lxh2c3up84o90s7vy5yanpgyeavxx1svvhgae5stlcg26xr9he6n68ardmyiqg91aztvf0c',
                flowHash: 'oy8gggwktw6y3lthbmdomm4kdtmfuv8e461nks8h',
                flowParty: 'e4ets8q7h9vp6qh307muivh6140asnyskt0vztvb6dsgf9yzj9fc6x36gz2h9d0i2jk2vlknmajrwdeow6fxxouzw14eq143643g3samihb5kawd8oxex5xi07hpnk932xehjf0u3l3o6pikckqhbxduhd42kt2n',
                flowReceiverParty: 'i4rruep9q5gz2d41f4dy4ldgancw03qopfctyvef2i13rw6ac5faq9th78fo7vwfn4a0ny39d7v0jv7i3hwpyo3tyg4v792pxsopb0xg63c31a0jkwmhij98aamnw65p6k8smqpwdp40sbx1ruhgkpbtdas3uuvl',
                flowComponent: 'cgiyj7f0ahdvp8vdc7zqb03hcy6259zrghi069n0z512bqgz21ikw11qc8gll70p7te2tf3cllmtyyp2mpxcwo3eolyrbfginpmddq940848p9e5wl9s104gq5684plxy7f6z7vh1ozq5h67w825f3okxvy03lfk',
                flowReceiverComponent: 'nyi0brqykxwb8u8qn4xp1qkucz0309j417wrcfdgr93dpfy2cytx0s3pfw4co64kkniulnrb4gcr97z87jdzb8lz3ky04kpqwn28mtp2lx01vobud2y3x6dei58kte0bul4r3q6j94kenbnbws6q1amcbrrfkldc',
                flowInterfaceName: '1jbtm4lw8av0tzjh0icwms9h8ad5dapwjmgietrgq8veokkmum3vxbvgg4i84rrtb1gc9pf2ddqymv5q1777fow3hvcxmfvk5u26ow69yek38yrx5l4saia102d79dmuxo9ywjpcbgi1r0p2si3tzpeqdnnevsxb',
                flowInterfaceNamespace: 'lc9ox69ehcjdh8rnns08kdw9rh8n38qst9tepj9p4hotmtb8giadti27qd1h2esjjbq52xojkm0hyg33llvr5iay8ipumoy29nhhsb717v68s1zjgzek9ycqq1mboohdjrzpxw4tac99b6dlc7dot4bamp8gcg16',
                version: 'z5ehqqxw2709q9pitghn',
                adapterType: '3xqmtrgl244cg44nj40hj2sngunxgbdl4p1u9qw4kyb8wndvyuv9j7oerv73',
                direction: 'RECEIVER',
                transportProtocol: 'oblghaeosnkh89py6k820mu9pmv00shlztmfuqjm0lvwhlsi7q5gdhy4if1s',
                messageProtocol: 'dlle3qbz7n1p3iz2vp7z1d71qf5w40v9qplq4laazqxpeijo95i15p9auoziz',
                adapterEngineName: '78uadso3i2c4tqjgc49l0z1xjr18bq5wque7zg8wc3i7c1142rhwp3672ck0q6pinrtchrsno44r3b2afi4xqxsyw7ndov0b5293qpnrm2468t3mxm6om4f973kjmysbcm8l6fkdyuzo2msf7eg36uguz630g6y7',
                url: '09eoddcaz1r2oeawvti661jviavmbit1l7lhfaqbbi780y9w2a7tzzjxqa4p33cfwoomudmkz1q7vxaqv0gi87vl9skmkuzok9ujkvllibcx8isv182pts02kvhmyczs99vjn3ms3jr0f8fi26u4hmzfc4jwez5mcdko9qmolhghgic35bherdm81acesuwp38rkzb8ulrh8ljmxdcodlhp2c4sdovru41em7pjgxhmcd9ce53ih8b6aphi45rk1d7kcdu27bb8vo2e0m5yirfw1u7dnlr9tiapdxonfiy71espi8s1pwyf00qzozm3s',
                username: 'pfvttzuf0rrl9rmhju0t1e31oxg8ofg3wsfd048pua5s38wow81kgq05x7j3',
                remoteHost: 'au6hc4q30yexxoo2gt0tdi7c3e0r3gudfmkby8o86xd6py8jieutuy5ru3ost5zkyvyqr6cu77ews3vwg5khgdbn926p3vewdabt5ntyqo2nsv04pizfgrm5zmrn37pi5vjyv7m5z0ztlsh8p3oelrngoklm5u23',
                remotePort: 4348670345,
                directory: '20iw2awt95z1zbtwwf4swb5lzlnxsy7qnwmbfu8nbvrucg15hl05n6kn0mqagiqbguns1rk39e4y09k77nhtr8diynhsylyavgu1z6sp2kl0wac8en6indiz0xucylhiu5fqg8nh2e7sid2e24lijdna4h3adwm1we97spaz7ww5tojyxp6j16uo8fh2s714vmts13hd2pxgnouvni0g3kh2m2q5mazukbqgxj2ml4blwqzkvls3s7uh1uj8qzyrawayyecbv5ms8p1gfr0iz1127phn4bfafw5ld2f3rxmp39x8zrc8hga9ya7hx85a6vmi26hh0mo22y7zz7zyjnbkbuj3d0a2rkvhveep0i0elq1lc2it7gkivy5xqp1q0b3lgjix0aer8bk6mrix4gktrujmbnoa1vnq16di0asiz5mmevahiv1j5mg0i25vrp57nbpz2vhltd1nmovdwhb0xvgk20j5cc5beb574ufozoj7pyiggrfq1k62uhz8l86g1zn99ueez3c9e5fxjgt378yiadceo3op8v69rozf7xoqxopmgqa1dxse16t46bvw335qdn3g446k8u6h2vfyljwq4gxrubr6y12i8mdbw0p8z6wk5mt2o64b70o12bnldbnqv2dd7wwkw1i2vt5yb0z0tdep1e05smpdfumsp9c0m2p868sn93lgb9axr0zv46uuwrkxnef90coue7fcmc7835wwhyx3zmgqiel29yxvfkdubtd5fotgl3i5gxcysfgo0d80oj8kedeh9bavqiha4hn77xh2esipdwcu9aj9qoaygn7hhcd8tcoohcswal8bb4j15nshguir43t86a4ev5onx42zd2ucjy6lyrg5t8m19drk69ypfism1je4v7y7upprovzmgz9khb6d930xdzvyugp4tbbsnar80m27e9kkb9xiuks0r27jjplrofhsxu014qq5g2c4qk74tcw1dmkpile6xtl2apne4t4ecjacwoxwa300xlwp',
                fileSchema: 'r510ct69ltbcjh1spaqlnbdywv6ul1ohdvb6i8eqbgddx4niev9e2t36vffhgpm7duzblr3uwmlthvh6brlo4dderyfjfccatcd2qa8hgplyna3hh4uu4u6lth0hu4xkrpvon6aq7cex5un1eue51n7vd3u2hdc4o0qyky8139hmrflpislmapdvrayrh3k2ghi85t16nqnh0i330pa2l3uyqbojhc2zyq8augw9fl4mqistikfdozljzje694qyp9zd6pdwv2zk42f5u0h70s12nhyvrtpwzqk5tfveauknhcuab6pcir44andg2qq0onukjxmpvn3mfg6uf54p4juoe892vm73wlz95d0hpf3y2zvifm9lkjwznhpwmkx5uwh1adc8p3c35ho66f0pmotlzzpjy7ijyduojbu237qovqoyculypgjteljjwisy30mimyr6x9ptk7nsmz5ks7lgc0e7t1gqr1equuxgbpoq5il48hz1q04qr9c12g0oi7qwizfu6dz52vyyx2yh90lbodwwklibljximrt470rbtwijtlofag836uwqka0smv5bm1ws7b48w41romxopsfuybz1rf84drvr0wr02nm30qzj9as9ggyxnok239feyekw9s1wvpr7bu3cd5329l8j8utfmlfpexh54egihlc8ehwx35f2i3iinx74ibbe2uc35lymelc4gtnmw7p7hnpkmzv6w44avctsr63k42mwyxbcckssr5cx3z0wahr51rossczxisfngm9qdndpdph39j6t9ffycqlanjrtlkmfv5pb42k3g2i0q6jb4tat34mup65u52qsnw3e34wmkd62rvj7jefamh5if2y0c9bsfqmculmimxb5iz7wxag2u3c9ajunwl2dnnjt8t5g25trvko6klrtj3t0t19nivo30itadxfv8h3wkisufk6i4bg0w9e96df250ra3ia09qr5esuyzan1xqvvyuiv7jk1beguitb4cswpskuqdqe5',
                proxyHost: 'nujzcbf5t0npk2bq3uzsib2xw3g6ks7pdnr40r938phjk8b8oazy4gws8mk4',
                proxyPort: 8453065746,
                destination: '8ky8kp93o22g3nfa1uo2z1kgg1fu7povlfkvfmkks6ae1vw29u074ro2xo4kzfulla9uj8naedrszsszd8j0klqa6ogpvtp0u9o229bs1bym4dxnkkg9h61ewkdsho0uvecpc19e98cyfhfea4x6itgiyry37lgh',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'jxg3j1ta5k0ry8rg8792lfzavojjcxh3iv7fzne35h55yagoof33t06cbt0uusfcspmuynspyhugjjupfgjuehb11v8h6sca4uh7xuudbi9k08j1r53335y1l6cx3rsumq69wqx13efgbss0pl9yzfwjfy4li652',
                responsibleUserAccountName: 'h8s1iuiifks8rwzwhiiw',
                lastChangeUserAccount: 'jfg1qipawm539k6fka47',
                lastChangedAt: '2020-11-04 16:38:45',
                riInterfaceName: '8ya7tf9bij8wbtmofhp37rjfq5m62k0v0wiids70o12bsv8fmtk2v03ylwse0p0xbjsc45wrjrfu6g7i7pp8jsz2xiabe4moel27hb9rys8hl62rkzn7zy871r618yzoaq1lrybsi47hy8dkoujxgsdlr87sg4u1',
                riInterfaceNamespace: 'wkgt3dddw3os9val1almvevbufjy96ulnsc20yfzsktzm9dkhrfwatw9b5rya17s9yj5bf0mr7schx6zy2u2wb3dbbdjqttieerocxw5t1glu8bc95c1ob3x5egbx4szx4qw93i5jge17pzqzzd0cvufapkr94ci',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'i9ri4vbw0wxasqq05c0b9wm57kzlqkwzd7l1ppzo',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: '38m45130e1x8ij144wwndqh8s5lsk5li0zjtr3r89o6ijuu2rb',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'vrtk4uhiykkdq1sl8jb8',
                party: '4b1ljmaewzn5gghct72f6mid8cztf36zd0hl1rna9i1tuk4oyegxlme5qwra8lxrqf73xghjgun112p267705keyzrbfviflye0s5nzt87sa53r80332e3zi2qqlojmoa9iefjb6rwk6clvwm2hm0p9w11ymalum',
                component: 'nwdgzlw7ti3rue5ejzvmt21i4xzqzb143ujfcwcfr8jut3ojzgej4vowlfexxk591o0gk6drmky3tm7zghicughzskvsku1fmszbzd0xjgnosiraqfufqup342ntze7g9nopbm2ij27666qlfgerkhk4wuh0m0oi',
                name: '9p8ko3mpgvcq6vyfc9fvl1m3zqvbnsgfbbrroow0hsydgwbw6akeovdk32r344qftt1ej54ypqk22wv5xrll3v84vmtg9qgj11asuvzpf8r8tz53igi6icja0uw2v2ndftn8mfhxs6ro1mlsg0iw3znty64g0nib',
                flowHash: 'c3hxt5r5d4oemlq9684bpvol09zflms0m7jxiga8',
                flowParty: 'lb7uz96g8d9k8hxdzynt0gkcz8rr58hnv70cx6ccv80imdccp5v0tp11vvi4q93ckmr92n8sbyifqbmdo8ieks7a41l11f549abf8rbd0fcjite67igrei2s7nm9dfhnga2q1hn2ceol2delsmfa33h5ewh8fng6',
                flowReceiverParty: 'byom6x9rxrqhskbq391o26q1tuevca3omwbsomo53u1stsp1l2hxv96jm53o4vut7vfllidoasyp9c2l33zs8ndra5ix0xwic6twxx1zes2no60nw55iiqah8d0tpogf2jj3qw93foaubt0eatpmaniy078k3qpb',
                flowComponent: 'sqgmjjs509org0pmctxww123ra7rd4hn8hvpxauvqda480esp4u02t6prqqenlqw5q13ds783pr17clnpt85tuibhopq51dwymefoqyk46miesoi9qlw55v6craqlfm9cbizzzrfp6dopk8pulcwcdt3x1hjcbcx',
                flowReceiverComponent: 'wkgtmzs83qdqjvb7uglzifmstjppsw4fhnhdeuoxe1370neictizp5sgyu1p8zueiz9ez07xl4gzxttcg9ps998p71c18h3mrzqc8onkm0ronxrx8j4w0x71x5hipthfxfq8ns53a9dyt3cxo9fnpds617n42ez9',
                flowInterfaceName: 'a76e4e7yhmxrkux17xlf8skl805q1rg1fu0xu2w3uxzpjrajht04ld2a2dtn53jh86zpb3bl020exxufvegg2iyqdhvzuknf3vnf0iv9rj3zpcapexzky23wr82sdf5rdnp0cf3y1gau9s9drxqugorh1pr61qwk',
                flowInterfaceNamespace: '5ofb1h4tcqn8otoy6ttk4c08hskcu4b44wlmhzbeyj6ji2h91hr6x2qwryiieyhx10bbj25d2a8d0czfh55qg79e5wkekfsqkm6g9cfc3fx1vjz8m5c3f9tgakombk97ee2fltogmfbshluv1zspnabvoo1vi0tu',
                version: 'krub3z0jgwuil44g6lzy',
                adapterType: 'tsl2g95tsxtepyykonnukc17egi8i117y2iqoeu8yn2o9h2is69be69tz64x',
                direction: 'RECEIVER',
                transportProtocol: 'gb6jcg2sxdm38az6ytk1r4uf1eanomi1q5jvijkywm04coe8iathn39c0mnb',
                messageProtocol: 'e6oxzjyskqqfjt23pfw4mh1bojj4m0l095am7hhz4fskxbsi1zaka1jacf5c',
                adapterEngineName: '799aztgtmejxk6u8rd0xt2ozhyd49w1z3ceoivx14nkltqrlhtbggu6dmlvmq3k5ig3z9kqc0hw10qhm9q75cf5arh2syenhtc4u68jv3k9a9adex8nx4w5eysq8q8w9x2bxbcwqr2whj82od5k7xo28se4sbrdz9',
                url: 'rh4se7eens0h64kvpoehg2vjnbtk71jyr4dzjlhupnzyfpjsvlar119ai54t6qd8owlykt8r3e0jgbbuvp0k5mkx7b1wcssgg2racktseb3nc1a5uap0jdoix6ykgw9w3in7eys6f356ot0tat55inoi5trh2jcip5lgplgmq60g488smatk612gkpd611l9ecpw7qbclqlgtb34wv3dxlrkm7qfa17yl9merrh5zzchh06i47rnpdkyu728bqjvboexuamtkv81y0hpohzmuzxjzftw0c8ru67kwuuugt97pzl5ya778w3966fa56nd',
                username: 'cuk2b49fq08o1e2lg93ubuyu7m0zoi9x1w2wuhc6ur1wty687yzcdjrvx4t1',
                remoteHost: 'l07w9lp6zwxjvqpbekbtuovegkkj3vv03llnz3femdb9564wqj2duqcz0wmiok6907yapg94vmg87hx4u7qcr0slbwpno2jdppynyypboao334gtoeemsujjjry48eshbspzfxwkkoqr5ir2ylnlbkhqnfs40hig',
                remotePort: 8327706874,
                directory: '2f4wfxpcxrd6t744y6ehn8xyik39i0rrq6wg3aun6y6nsqhss3p686ipef9h2ui7delete1eozbvqc9xv3d5qhaanm63nli62bifms8ac43mj9x3ku2w567cd7tm0cai4c20qkubssdsp3puvdhjmg2wkgfl9mf8xhlrzy5dsk9buon2xzy40ziwzhh41ci5wheh14d3n8aw8moiwz7vdn1z4xdlbxq2uqxpj7hr2okcq1zr1akake8bml1km6k4ahk3u65pb0f14qv5tai6b4gsz9fd9tde9dj8lrjc8rc8art6vxuc6zrw3o7ggmmrh0a6ecg7xtkklakp5ascnjfs8oa7ofm4kx5hrltquy43zrdhlazmj92xpb2xh9ckeq4a340ujgu7886bxcja2kj0ahejfz84c49wayaydhin1u7nihd3pmrf6ms6rt9yevhjgqjeu614y31yqkl4nsufwrxnfdml5z4rs7o7zl3d5a74ivdya5y3hjp2bbemj5wnp5w1y6ooxy4d7d7yrfm9pf08zexls74weua7trks07tvs1ym0eqntmki872l86mqy3b92fbuml7d0b6o5gzuwniheeix0afdzdsb0s284q4tuwz742eo1i7mat188th08z1h386oub0yr3rf7dgyl1ci0icnz2agd3v0enfc1y4hmg9fe67uinrlxj7aqs5sdsgh25kyj25yul0e6em0tpxz2x0orbee9yh0ir4yh4vjpxymxkzzs3ykd295c1f4rvdlug2hrqt2he290v4cez1ibd5q1akirvv37ru09vsn5yo0b9x4epz351d030s9hnao5i2gxssmdtc0kehmhqeiwvbhnmsigm9cno5jy9omy4zlbuecijxuho775188zgxi4iuusbmpl20hiudk2e7g7jj1mjidlzs7eg7biyumqelzvy1l0o7zvtifwsy6ghu6impt1ktlzc5id3lxc9mr60p7nds66019cs5bh6rqws5dztrn5ueu6ddn',
                fileSchema: 'munqzm7ps7r233xr4xpfb0ltdrkmqozfruug6kdzukgrn9c8jbr2xogmk00kqrum8m6yenfe4h3ke7zefna1jsdy0mbfl9ja6s8smaaz7y23wp0t5fp3d26oyq02gtyoahrwddhi63pqcp5to3acgousjhwe2zg0cd5mddpq8b9oxpc1992oaz2dwike9ybh7s7t8jo2qslsouox1r3foaeipnk5bi59vqhp0q7p5mmn9qj3en3o2yy4qfrn7mw8qbftfvm2jp95hy90e6ilwbw1wheiynwapo9jnmhezip18qaoxiklrpy2kew2t0mn0tfjw5k5qv00xw7albmfujv9x8b9ik700rqz7ieoj7ua7631v0m70vc0inaferyq919xyj6h8dzaxu7gxw7zkje13lg7ofsqu7bqxs6rzfatao3wlybvntct7yy2cg3ip2x31oz8hco787jgvwhvyfm7lmjgv8zyjdrc5govq0pabfsv3e61n4xtwd7lw0tz0n212pmohocwiosg9npqtstvigpdc2qdftdpjcoynjvmd05i0lmnymajgnpupbm4g47j175glclqihf8xh1a5036wlvp2obf5elz8dqcsld2dw3gswtofzeatxwxldo5ohg44rvipq1gnuw2ijg8slnkw2yicyb0peo7gdx57hjs2r9npzjsf0paj9q6s9l0sccwe4h2oceqfzhls0a28avbyccicyjdtxbikgm9l7kj0l5f5k585f5z8wzn04w3tloae2rocp1vzxjkkera727hu6hv06yoqn8oq9ecbvny4y13pmbpzdr3rk6zqp86gbfn4ear4ji6pq4kq1dd57iu7h7i4mx6e27hyjubmdvdr6xddhjjddsa5srqyj7bt4t1uas0kihbdorg7rm4le1pp4hs0454t5adxre6225xx19wuk8q5tcmnum0s20utgczq59m7j7sv0cu2gk0qd0rkc2jiputosahzktmv0zdtwhlzpowthymfbhu1fs0',
                proxyHost: 'ppigwo0j1rwfeif0o7dki1xgvuae6gd2eoknk78nz2o1xnt1wh21c8xflzoa',
                proxyPort: 2289327241,
                destination: '84owgaoppagidb5ljz62gby0wmjvwbtq6huvdcwcnjroc7w1jrlouyl63mxcwzb051eb5z1xnr2i1q0f1c54h2b4envwin039akgj50b5ju26ho4m94jtan2tre1y9w6y84b2tgsjwzhsuk1w2tmdl7p3v33i0qq',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'agmft4c8r3c3eg8nnxzb9lys15vckoe7mqzcp6pbe22vte1myc7rd64z446p5jl0hyo7wsr3jpojsy2cspq8buqce73i49yrq3bevqupnfp51twovhr97q7c37bs4dkljkvyvnqoh46junz0ryane259hdgbvtjk',
                responsibleUserAccountName: 'o7evlop1nqhuql63thlj',
                lastChangeUserAccount: '5gfz9shws6rf4zilifx4',
                lastChangedAt: '2020-11-03 19:52:35',
                riInterfaceName: 'md8pv2kqo3pw5suys5ea0qlr6kukc7m6k1qr6gt2731ablvrmecey710rlx40celujcywje94dczuy1gx1ainhkrzz7w5nkxyvr7ayqy6h3ig2uk8bw1m7j42umddtvden6ue9gah92m6cct31g5ou5wcfo3cpvw',
                riInterfaceNamespace: 'jzfni2td7cec1grc1d6mfcsil0fjb1z2okytbgt3a52wigoz36i74ua9i1hm0aluqn84rljur9i0zm0wqqmh7eqs4uc5o35pu95ur9h3ykn9vjfta18j6ox868ltd42q4ddwiuppuxv6wq9yw0m9jqhibm1ieqcv',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'ok45z95dn3dw9ouz925w291215kfzs3ubkfsr7s3',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: '9g75h7tpvwldgqf7meqocoqecsqbd7l8ymgh066u4o0n80bl7u',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'tbp9l6sx8mhdgav2guu4',
                party: 'matvocjchuy92gnd5b0lrlaflnwnaybmiu7hf7ax3wxpeb9v1hrokqll7gjjukd94brc4v27gv1nhl6rdnud15wdgikr6fyccm7ksbsb4lyvc7uycl6vjrecmg1k948l9voyvu8ezv4a7b37g1h2b600qmo2qnm5',
                component: 'gdhtkgf7a7f41r6tbqpigd4r6uvgfawadf4vhppjjsuti3g4r33u1vawnhit0na6hptxesjgqekrvrnhhsa00equyraormhti4k5vbubkz6g1vx8yqrpvloa7sf2m7zok5qbhgstqmuaj6vk1n2drlwm2nx7ww5p',
                name: 'ccu0royv2x97t92i1anr9uuj3ex502w0upqcodjbv7lnerd1w6a50l0t2nyhng3yejrn9ywnrdtxy95nty3bxmtn6yltcfc837e5ojltt73opc2mlx9dgrn66g9pc5hmvjgi36ksucmzqan6994tf0c5zc3m3weq',
                flowHash: 'oi6nrcokmk53xjab1mtue68onfhmt8g69hbk5206',
                flowParty: '6wkh9m7ulvo179qkkycn2x0v5yue5fd693fd8vpvwtb2ms4wzgxc5tx4qzhjmw54mfimddw6aewb6hswugdgnk2dbaybaj40gkrg1xllwu9qjjtmajjcbzy8klmhvtg0fiph5qx1ep58fx97upanos78uyrfj7yn',
                flowReceiverParty: 'r96ns5n3pjas7zi3grzen14wvu4ovggomt566msuw6n725i4t1lhssb9d9o2v1z1gx5q8ge98sc0a4bxnn74ljmejgdh5eivdw5w1dt3nrhpvwpk2udpv5cer78gyzq9scbzpuwvaamh3u7fbdpgfzg966zbnrus',
                flowComponent: 'tf77rmyuq35bijpf7l1ufjz6n8o88pngm4rmf6dtsylc0p5angzkpr8f7agv612gz3tfabqyo9jbwrcnxh7e6qf042g1izds7iluag0x7vrrridcx8b1z9287zfnf91qakmppgk04kc0rx9z0acchvtktjvvcz0l',
                flowReceiverComponent: '39dipmt9qugn5ely35qo4yy7gdpy5nii6vxo6lymzn9068b3s269mx301b63u0fd92ny1cuk56dl3o6iy18qchaoh9hellyo5ievqlssa4r2zlfyb6bztlnddougfdnakrxggpchv70g57vue72dxg47lmfbjvak',
                flowInterfaceName: '3sw458gj27iqbcabgluum6chln3of0bztohz75h6t4hjgdp97b9pho6uso6c5vokzlzm3pnaic0ld351a7jd72ri1reo7lze8gq6wnidppuz70z0gb7jt5dqlgnh8rdg8okt8ig4r0ts22zm48mlg1d3n6jvl7b3',
                flowInterfaceNamespace: '2trtzpd38ta9qpvd1ksyzbqhv5ba2gdidd4un6orgvkekw40d588pe9obeep065h4e6cpx1s9wqmcjk92j9fb68hi15k2ybydkehv5yp60pd377xy9yfyms1mxoy980u8yl3fuae4v7bl29fnldvvf0o5tfcr85e',
                version: 'n3zv7skf814i65mwweep',
                adapterType: '30ksdgw7089uzvy9mm0erf0plockp52kceu3v220q2jztv7vlrmz5175etmh',
                direction: 'SENDER',
                transportProtocol: '7muod9kuoz1clijp7uaycg76b2363db9q564706x8rd5r0jpulxhthysfr0a',
                messageProtocol: '9em31x16hi3vo7xem9m691wspvuhvtjxzwsx9dxaabfhha6nyajvlwfvrpcf',
                adapterEngineName: 'bg88cik4lzb40p60x9ttyr5y0kfkd5g8wb0fqpxiovpa669saooaipqqd8xljvtfd8hj9il96nl0l5487o9arwnqo57noru3wbl2ywrr2p9byx1mzvbgplhh4e6stnzurcawihwrng6scx786aisljfsr3sjn7zh',
                url: 'zboic70fh32xropt7snf8x6xzfirtc2ikfgpnvt1cfadb7khbze2zhkw8gnsoesukm2ftm1us5m7ytj11d2m9yr13qnhdvleoarwyvadf2092g2rlbytuj5rl1o2efilq1clc0is9rpkp1b4j2011kg1dkw77u8fqosskwl6e4e5zhdt1nu3iyaqs9z9mljj6nyho0e0r40t56a773w1a9imi45wape3ocayg8vid76u3fln5rt5stje72c7guo6xizvxeaor7bvv7q2ycqkp48ouf1ew54skcc64oyp20bl50sizi7w7j7v7as7na8lb',
                username: 'itbop9cobba8v98vbov1yso1k7nz4mnnwbl2065g9al0m7670ww9mx3qp2st',
                remoteHost: 'gn1prv0vxp9yffvp4ukw3ly6ll97tajfi3ahzt6uwx83rzqbj79joae0nhqvgugvb6rzjyyl9f1as12o8j4uwjhtphe00lrzjrxavtl60azvtijje5yt02k2kxhfgho08jg4a3jb33itakyhwuvoz0td8zvagqjl',
                remotePort: 9565502251,
                directory: '2mdq9ketsk6x9bxrkk01v5mrgqvc92ohy4wcwkxqod2zzj6o9ckir2yibthd0t2s52gsku8ash60pe4gtywvazym0kc3y0zcd0wyjwan5abzc6708825mmk53jtmwm9t5jqoy8hlii55jd0sy9i6m3v7kpekra4gz4fro2d3ymrrqe5i76trunmkh1g6940w2il8pnpcdwn7fsx4q29pohlxob2svad1juzjs5jbel300hk7zkua3dkwrkdt41k821lzn05imdnmeczmw9llf8ft59odxmmahn5dh3tnssgun7baa9bhw179mwouoy5ohojri5ryuyr4i3pz1i29ry7y0i5t0mntbg19l7gktq0vvo2jx0pblrh18dtnxpz2pqlirwthhiv99gvudl7jle81jdke1alacd6d1vscc1i28gr7pvwzwet38mh4vkgytbpwb9r1ijf8hj0ik86pkh28sipl6ecanf92iyqwmqke38wp4roc89rjzt9bzaqk46f3oj9dgglk05omqmkqbenq4t0p0ar48q62c9kd80byl990dgxs1pkjcokn6m06lfeuuffprojctzw2zqj5fk3dypeq7wqpw0loijpkf81jpegpyrv5bixa7baf7ionhuc1huykrkvhtf7tzwbpcylfs4nlvud1a81q3f6b1y02k1z13r27wnhmrqjtjfqdkg4xdmhrvv79on6he12qqtb159zd4n8p8k5sbgd6oesx9hp7w5yj8dfqulvua1k542es5poz7bplgrcrsmputl5uidm3c1gwgafpnxfwrdvtw9yt88luojgsrwgh5pr6tvyje3viw6wb9k7gwrqvwul3481wioed0tn1ws9zp6y11kha8ilsruwjj82dyiid9nxdaa3wjd50yhrc77linl68hec79q0dz8mfglbhzbf4dt5nmquor9ri9bs2kt6tiu6at4qzj759a549gpsud1wz4zu56s1bacqw8jls9nornwtmh8pgfhhyfksbntf1',
                fileSchema: 'w51tcw6tcz8eflytlhdxex9hohxanqtf84w1q0g6whs5us0xcocx8kazwpy274g26ce01ea2uw7evkzukecb19pakyoceai9vs8k9xtm1kd2bkvc6kozu6rhjptr5vkxgxtbrfjg2a0vhfl5r9hpjnfctna6525gwy14gvzxwfsypdt8n3yin5luu8jro4xb0lpck6w5upgp14e5s8matx7wssanobjjwlwjnuvpeeb4rff6649p4yd3bblq9j6yl55xvp6ufnzlefswmnq55hohraqq3unl31gbxzub23tr0b3x8iqdsbwdbh6akaurf55z99pzhc18y2i65cbao9uhme8qtpm193mhzmbha13yocqb249y7inqc3kk2n0pgru7polnyxl0fcaa49297vrgvu9mg5ve6oka3v6qzevnfl28vy1bzldorvae30xz8j2577xhgns7tyu143x693nblmu2ztm1r20vj77oyy85y601gi71l8fqb2kv3klvpmz1hlov5qj2kkpk9mngxafjj5lmhj6s8ltcamrd0eu2ekrbgfyv5duakpumktpx6x514qk9qdpx49r7mz88xxuyiy5lwpx0o0n3m8wmqoa110lj3u4yacsz5hhyjh5yg5r35efi90mznfaz5tf29al5iqkaxkbmbxpooi0m6xxpaqgk3a3hkxpcugdgg1bwhneg78ijjq9942xcg4o51do4g6qyxmja5h8dotkbf603tv96vpqrkhbr9ozvhr8g93x7agea0sx6amrwbp74qi0n7lkipsd53t139zsu15ruhkx5tucyaou4xuipouc4md2ujoe9htyoun2qt98pngpiupcwechty82fqz9najyq0biisaxf0u67qaz9iflhe0enw5jwdcxh38a6vykgdpr9d2ioqvx8cfy0h974e2lxr7f622eusokm5zdg3any2l1wg5b65isk3iwk1d7ragr31s5x3bsr22ez4mjc9npquwtkvtxpfipmpfk3r919',
                proxyHost: 'yeolknrykncad0ljm8jpwfvum2l1z06pjnx0dbs39alxkfmn8dhz8izk2hem',
                proxyPort: 7755849468,
                destination: '2jpwew2zrk4wqmjdneb8fmgll69mgocriz6pqfkrs2s3y4ny5n4p1c516tviqykcr8cempnfs8z0otmiuih2jodzcbu5vd73su6ymrf4m0cjqpuauytjc9ommexagjpn9drq5ms2ren8p86bqw7bl47h218omzbg',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '1du9du4r9p45j9z11n8cgh6y4xaka1d1mzik3puuctzmaj6yzhjq6favpb2owmsvrz8a9uel53ynvvuf4hidtsmct201efc0s67fvfxr4uh59fsmy3f2m1kp5wiv7ipxc411fhtcvjjoa1a9n78520omkuakwra0',
                responsibleUserAccountName: 'lwppzbk9vt567nqjfo9g',
                lastChangeUserAccount: 'p71nfj62c495lbrvr3tk',
                lastChangedAt: '2020-11-04 17:49:28',
                riInterfaceName: 'b8od0zawgkcxlvop7nio8mwmy6s27lqgtsl8rfck8bb4w0dnplobqgd8nt8sy5zgyhqhxtm6vro6kiuqndnv8uekaw0gx0tgth1doj5mo78pvozfbw8vjewf0kmeu8yueeqlephg461tqnsr96rylclcgiallc6z',
                riInterfaceNamespace: 'cfbxci8r9uv8gel35l0z3wz584l5q3brpiprz07jj2btxitak99alap7vrgdfmbgdlx0p4rp6hgg7yomr2fqqx4wlgt67ylu6sg0bmt6ohatjew44rmqjw4ez28xln2ietw7h7m0y7riu94f6oi8xi8efzqamhp6',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'aynrnd50unjrmodyjxgb4ia6pik7bs02e9lzi2jz',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: '72s93injul25jpivqyhw8ym2nraxlp46brqgns6gr9aw5anr3v',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'jq4hz3w6qwinst8fsu6x',
                party: 'ked35vm0ts4din36g5bjh21o67v5d83xyu4mkgj297uf6i1adt7506rc76lvlehm6yvcktn23tihcgzulon32s2ihhxsvl9g4x6orgrymkz90pi30nzo3ao3iw6fk71609zi21pnf2mra7peuj7j4vcarbt16c0o',
                component: 'gwect0mlbfswqncihx5yej3wgviy2r1p4028y3xe0zqi648kiqv3czs73kkj1yteczpmzbsuzx28npdq0ty23ikf1zs9ieambkvf5o7u1mcoelfwfkz3ceh65o8dj5fjkhlvdyhkveartpe7ezx0bgkj74yreo0x',
                name: 'dwt1dwua9xxhcyp9hwy1l8bs4qwiuhzoi1i6ogj8mqhr36171szxh6ihpmkg8e5wje9p0semap6idprpvqyokt4mqpeanwdflk671ydbzqw3o95n7l922un5152vqilc6gf747pb9uluppfv69l7oeaq4cdz48o1',
                flowHash: 'fkydoliba4sxnx42iibz07sgqf5el9944ui46wzw',
                flowParty: '30yzvcnezc1bgztyt24tyccqs9pujvcmv7w1l2dfgh9rv1xhpkj69rkiq43e4h69rkwpa7twamryms2k9awqdq4v19g27cnmuwh5fhx6re28pmss0ece46sgf8t5gk3egjwmovyrp926nw4rdxwybvyyxi1epsuy',
                flowReceiverParty: 'gu5nk5ehu0wv2vfcolo3jz3ctf5rcknnpmlopnbxo6zvklde8jrzscgaycl2g9cj7lh79q0t5y6lounu3f7e8zbmhinb4xvrllxzvrchjtc257ht231tx8iezs16wpikml359lhpr6dz7bnxv2z628r6y3sl71im',
                flowComponent: '7vcrou1yp09i4i3xe382vkzgvx36b7c00eixodjb73s9n41noexaqpj1u04x6ts9nnn95ol53cwll6os3id07abghibz2veyn2uxmvnurouoh90adr6kngii3u48bkf2pfvscztsnxkdblnoc6v6jjqnvn7aa81o',
                flowReceiverComponent: 'd0y4whpdxm7vyns4rq60sgreuegc2wr082ftwfa6ur8lt7hiqjlx9tdyvbyxu226m2ha0onk6csh5s19ee3ir9c9qt9rz5h6vh61hpmst1wk76huy646bj089osv2tz5p9nlonmzpwl72coq2z68o7a8mbo6v5gc',
                flowInterfaceName: 'hbkg5uxw61dtynb4mn484m08ow1d9sxgh7coxj6d9cwqzfwku8n9n7vnz6er1z3xce5gkwcb4tucxae3sdmmh7tnfs584wtwz8r2ln88p9o8xg3qae8h81g6sw2qdays9jdlzjs7cegkxkhoycbj8d0f8jz77obc',
                flowInterfaceNamespace: '1jmm373m86qrkxtfngvnolq1wriqpxa7zrae5lcn9ai0hy0oy8b8dt37oauc0hb1i10ue0rheswg714svkp0go9777bffkkfcg4mpnzik89lkkd2j3j4fv62ck7olqhkk0s2oyw7vrf8ygqp5twcon8vzc47u3u9',
                version: 'tvhi6z9elzchqr4d8i8x',
                adapterType: 'hd6awfevl60ux1mrci9tvbqi1kirul3k6osshrhojjhgnhkp80m6o6n7okdu',
                direction: 'RECEIVER',
                transportProtocol: 'rpuvtoju34i0ijpc0ayqo4vmse6a4wpqceruvq63icuhbkcjrtolooatk4v7',
                messageProtocol: 'jpqxk27i2lue6pgjg4qq5mvetcnfp1urudx6xzge0mp3wxcp01q2rhoo6686',
                adapterEngineName: '5zpx1e8gw8yco773mt2qoupwdgtn17c9v6p172vragglbg3sdtc8kchvcxg2ouu93caokivbcvaacgxpi815m6rr8u2a6sf1oia21xq06xm7rkke9tg3ovf6yiq8jtcq32sp4mhyikct4sbuevdvi6k6rq7sgcwb',
                url: 'u3yrjperq7y98gq9kauup77d85aim6ozu8mpdj5elpfth7tgdq4pcorh9aigucf0w2is88bcrpotit7va5tfdmn049hrk1z32kyllbw0vfhkkgndwc80p6is08jtmdef1nhk0earuywrdb0fsjtfbzbto98hysy4hswsoof18u0iif20pipb216fqlc5q4ybiirv6x5n8i8k7cl6u9d083oi3a4uy2ho5tj9yc6vmpjg4w0es2kr24n6wwqqs1p92eqwtlowz4ubsnxfz9w8dfvkwhf4akb4580tk2eq6qqp0ginzprln7h2603bydn5',
                username: '5b4a84f3zifmk0kc1hh309j65m8wqm3q6uzl5z3032lndlbyrzpb2yxd5i2dz',
                remoteHost: 'c0vcp8bzu5y3xwh73281j2z3rxmxlakkyt17xxh0ddhu2fre8szx2u7caw88ivgxbkdnu12kd4ofnuy1n7p6def9j7pl5bbivljfpvnackjb4su0b15pswoocmf88cp4ivoqz369nwcyis7rh26kcpblr7rjtvx0',
                remotePort: 1907462781,
                directory: 'vz0qptvllrulmxhzlscnkc2kc8eg9snetivv1lzl20zit4v3v2gv0e2jfn5m3517xny8o3qrutsjx20gzs43j7vbovajpexg4bsev3o162j1vqbawgeoz9y0esy6cpwm7ccjz1nsbs6u3d49ugtk2hemjwk7a788answmvga86o5xhdnzjl3xx0fo2mzu5armvs5eujn2krdj28v9310dq4mc4nldcvzerljqxiial2jgl2vg3twmwbzce2yggm35w6azejd85u1psrv9qqfnxesc8w4cjj0lvvoe4yid93w8b7yrxuzijqsnbw8ef1kmhi3rskvqkp9sr44asjusuomp47xe4yzj97372npledgrw89ya7oj3mchpmd4gw0xr7ijqs7uumc6zrlaywrc4k90aqy5fskmjg8bevoexwpjba6tsut2mkjy3so4r2z7jgow2slm9q3ze6docx6gj9b7c1pdbttztakyfazjs2t9b1sqyv9qi8snvtquto06owrlwmkymrkw5jnpl4ygtmdrkcoj5x9yy7gco1d563x036zpw457jfbj1os3lbpecseocw5fh2swov9sn7dlxiua118qqstg5h6ug3h4ot1o4bx8f3jk4kzupu8wcxsvj3nsbriejv4da4tm5op222kpbdzfywwr3sf5zx77t0cgkwgwbqq8x0mb7d9nv48yh1ybhwqys4izea6ur6p4baf8ado09vqgcmmgnq8jeumob08a0dkqrkyqaemcvk7nqcx0xis8sstcqxngg3pl5c1gryhohxhdg4bf98j3s1odphwnz0d19g2t6monbrb5b2wg0mqlz012fb3jgio2n394gkxn8uuok53yia1290z21qp2c2x1c36626eldu8g2kfv3k6jglsz3jlhtq5t44poh2varbbxobt3knrroyuvjp930zckwn4bbsl5twy271v1i8m4sdcjlqflvkdr317ka164j2fxioyvg7seklbvdryf2jv89omkilzkfdb',
                fileSchema: '5oa099pgec9emxp6ue218a11fw0o427t4sfe1pypgh3m9i2z4a4yc1a9h2xx4vj32e9qv2z1r8bbp2z1c8ybm5li761ongxc2axtybhyt0qzn7mymz4h5frddthso3kp3ubdrb9u455pio7sw4iowv18pznhu5s77rjjq7kskdluorygshsyanqfhoybwarv4zl62ebv4f4g4f8lspa8rc5g498h9sypq6pofkvs4ah0bngn6tdiexe6liywhnrl0dztv81u39rrahyklg2oh7mm9gz5v1ul44t32o5keyz67cs6dincv1ilv9ndqqqtd2io86cpqrs8zjk4y6yf16p6jtuk0fzhptagbugq0gfk5syw17qidroio5wu2lpg8bbt8tedrhkc46g13nghudo3dah19cra1mkxbi7bgbk1ib72qwplkx3t1xrmur0rfz501iitfzrwwzdua0kwz0ilh019vbwlc5423xmlya8hddee7s2s26dxrlvku4od7sh60fq17eh7627w4y158cwdwrn0t6namg93ud0i5dpstffjrghqq4px1jkvnfvl5vdcltj034zach4wxsnp4zlvl1ctvbp26z6dff6mw0nl832u543jpr7xci37euwshm2thtumb5xfh4p9szwdiz8nbx0p7djv6hbdoj69xhrjhd4njtcp815uvh8cioz00q6snym6e8odlqmfufhdsdq7za7nhjz2dcwpu2gpp8acnesc4noonihfi8jndhdpjn3jx0zim5vylyswmxr37rzuxl8dp6wb6agahc6nov7leo9l7wt9xbvckh4niyggysch58j7f2coe7sg4hjx9xt4wqxofnbs21eb00hd4w9okmq5g04tobkzam0vvaqkog7cbmybu99c12101mqnzbiqz2mszuqjmyf6u8zazvempuiu0edtor33t979bzenqjlak1hrisqm96djhvunowohanumeakzce69utbpt4vos96fndpadqu5wrnrt927',
                proxyHost: 'i06xeil6bxs8wubg62598w4h70cs9zdhao5yv7h4tn99rc3qoe3ooi9x7ao5',
                proxyPort: 8298247278,
                destination: 'lq4tb7pyraskg6z82q5le0tha1mymih8dmgl6f9yrquty6p9v83tqu8nvgou0giv6eqin2gxjicm8j0tenuj77mkrkq92kinkhlnbddp5q4zp8m022s9jmfqahvns7qiwlyodghfwryj6g3pbhknh9ubfkrtbypj',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'td2mncaw0di5ps40y0n7coibys3zc4qegoe30wpz9okap7xzpaimfkw2qo7eaqsoprbrmtdrv71josl0ocm42smzu4x2i5st4acrnoeh7d5bow2tngvgqf3iact9ahw3npwgnfkitapdeozyzl4out8882v9uzjp',
                responsibleUserAccountName: 'uqhhi85bzjagz36gsnzt',
                lastChangeUserAccount: '7lihcyg36zdnv6vwhj6k',
                lastChangedAt: '2020-11-04 11:27:05',
                riInterfaceName: 'yychoqwfithq3hjeuiu61ufkvv7re5y1apdd27e11monqt43ore7hinkhumeiwcsnusr5xf4bvay03vazwp40exomv7o1ybauq4azwyu47j02wlxrx6t7ops8d8n325hghcb0e5sk0uolek6bfcnrzoz8ahfs695',
                riInterfaceNamespace: 'zwwhcspx4f8b0k1w524ju3ptek81c5sfq8qyf6gsv5l0gm1768gu3j0a4awbe2tcr68b04ftj7vibvpr06sv2q0orlq4wyha06wg9som9qjizwptm7wo0nqhqbyo4ncig4d1mydhoyu2kuevyc6v269ez029nxux',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'sspnwhyx884469ufwbr0uzikg21x3ilj6dnu2mgk',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'pdvlm5yd6mzjdsdnlzmu2h903efgfeookdpomwoj6c7zl1r48o',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: '1flrl3gz60bg1158zjk7',
                party: 'nte5821jykvxy6c2oc2y9r2ud3ruuic3l6suh8ra2rx8tmzn6s40vgqvn13zjpnf42c1l4kmyoh4ixobiz1m2sud5wyzgsptk8ovaw56ytg3m2x9hxxxa66z7ae8fguomsjiesrkh61nky99zotbzr2hz0ux7cni',
                component: '17lt7d9za7e07hh7hsxkzr46cqinzxy9adwj3aavsenvfvqbp4t8of746hcblqxxrnizdc9ag9ywlgo6x6ekka48w7em26cypv91lzhmyjcm6s3rse9adg46ts8xgfh4qgrn6zvtgcc32zpuyhqtkumg1ltde95m',
                name: 'bi0c964h1xdevevp9umhnl2duj9m52jg58x20ic2ngnvo4tpz0ru60v9fji6hpqz16lbey2qndhfn8ug8sasjh0308hkq1snox3n2ra59cnfa84vf4cxwrb9f7okc6dq1e9ovmfn4vs5sccr7h31wuass816jv1t',
                flowHash: 'i6xrs564cjsz5syin22ohfibwsup0quux80u5pcx',
                flowParty: 'it6lzye1zdleducwe5kof2y21h2p9h3o9sce821q9y87wuxgqp947eh3mye4ql4przqo3ihzrw0uev7grxb1u6ls9qdb8783p5l8h8y24gxemaul9m4st7nstcdnrtmzldeijulkt6pi8wqwbmaoetbeyxpkco1g',
                flowReceiverParty: 'vs2ma3rgujt1m1svvckcm4274v2n6wq3krupwksicudz0opsf232gl16d05f0natpmz1t6mnprj3t9houtw0ulgy90jwv7oi7e44w3iwp2qmovxx1sml6e6q3zw3kc3d440k79y7f6j6hw2zvxfegu17ixhpw6az',
                flowComponent: 'tfgqt3c4hl7fpxpt8wkaei0gwz7qzzyyl5q3934wudheh4y286v50bpo8i6xgm7ixy8jjwg6cqylimbmit7b3bd8grn59a27aih87nniy1uq6as3xit3ve4w05tudka2xiwclabstijlms5kr21imi4byyl57ust',
                flowReceiverComponent: 'botbpj2fpd74cmdhy0bxxl525wd9y9f6wgzv7hanu52353m7nxzqd0b60jgjgqlfu87pkxyrtl2r9i88qgvoiuv5u6yin1hsl0asf0hlx3a7dhvfc8sog41s94j8qlrnotaeclz0moxkjku9gs3b6rtw8rdd631m',
                flowInterfaceName: '4xgqwwo7f6smm5uv93qcw41x5yy088ov0idq6z3ymaj8xr8rzuctg0qr0oap91txisq8kowevyxwhpji27biluw93qx8q93ar72fo56du0jpfnhdj4vcvm904rxq3fqwnbw2d8fwd8qb7ixl2i1k07dqj0cwlglq',
                flowInterfaceNamespace: 'ztuh8k5bje5b4zc38lgeq9t329v2ew8yfe7pi4on29jt81ev8h1jayabp27c9q83e8vqz2vltejdgy3bk0bst7rxvv03opr5dkp24iaqkaeuyy2hh38igfyyos1szov2t1tq9r5g4zfxs7rsyfm4herb0v6yej7o',
                version: 'un0wgvhzjhd9ccjxjgre',
                adapterType: 'uxze2731ay5r90quts2din2tuh9dcbz9yvrvxid3t5yeu966zb35ccs512s0',
                direction: 'SENDER',
                transportProtocol: 'j2avond04oebc7b6x37yhmlbrx3m7vglazwmb344br009ta1501f0p8pf3x4',
                messageProtocol: 'xw0modbrx74hbtx4e70p2frwzts7n67u6yvlcxx7mzycb5uc3kcvy7kq87cb',
                adapterEngineName: 'dp13mlw7cccsb12w9uk7trcpsfpupwyc7exg5hqxchyazzzt67ebdk2w776peua7oln61bgl1oab1m2br1mrsqajjw6lh3co1c5kweivzqbf016n240zi842ohw9y5a985jky994uzzcxf3vb4487j9kqdbfq5rf',
                url: 'ob35h19ym2ebhkobeh4gdspnxvlb1dsze1zpoqhio1y106tufyk0ra01y98o4rltwx669dx19z8lncqrjfd25vlad38wwhd0rnyxob3p3utdfznf8voasi92zwsu5uici80mghziebsd679ekvlu31azignpirrbbsmqrzp1mk761czxlw21mj25tplyvs3qvh1pzy0rbqo0qaayg82m1s7h6sdbpyw4zmy33gjpifftfzvg9am9l97w3ftdjk64a7nxe8zon97ttdiubk3q59ip1ujfxa8718wvf7r39hxpl30uqexfuxnfob1vqkna',
                username: '4h710tv8dt7z7xv114zssbevbilt43pvze7jh9tjbys83ldw1k93x7o6stzj',
                remoteHost: 'jl60rwrf174xr0b5kd2kqtlic04deto23myxltnm07ssxavai6tmzl3l15lfydgke6ifssldb2vq4aix2b1ohd8sqhhru4me9mkbgod0mhxhyc8t6g2diuqgxyzvlgdqnzr7h0jlr3o4myhlpq4v4erlo74wcjbmn',
                remotePort: 7597083280,
                directory: '4t58mmeah0lodk5z4cyle66b79dd13nue9z050ig4wyqutrh8wimq3k5mtjwfwvpnuyncp5j1p6rkf89tclooyy2124sbxrq8f14lzorezokh66raiza2e29nuc56sv7el90nskh2r778idwdftvdocuqrwbl8zpwasmhohv5va084wt1gqb0wtyx0gg3mwzq7xhg8kpreirzkrsjwvrk368nmazl0sjr49oxnxazwpgc3mu9po0e6w8g5by9unu7adlgo8zgsfii21h7dj2mj0dbitgglo72r0xmscipkri2jkcghezt5hupzf3mwpld9z5686yt018dsx3ke8sa0qo4eaqj405xrskmf78vneb88lm2ic7p1i9430nip7ocp8n9nvdcmfgwnwc7rbtj29dqdhwmxki40wc5d5niinuxjrviaoxvwrwim9asfzq5wv3jvc0nog247der8b481hdi9b2q4uplv1ftt0zdpokgzujbwunp1nnle9ttf2yquau9megp14vtf8c2sb86qu604z874us3xfl4ph6blez9klecqyzv6hrkrtyomnjpfj9wvgi2dxuo9kz7y85v04j7422h0s0wic13ng5vre61y1mgxmt2835pyhszmmhprn7x09xt1wbu9jkbwfwagg7zyxgathphu6pyidpr34jd5hy18y9t1sk33pzpfe525xd2udvuky3n5hgognferhockryia5uxywgb7ucsc2f9sylxi17r2hzecuhtw64yi0fy6pg698aeba5jqbzglv1vdfot0wv78yenv6ye8esagyyjp2q178mtt7w27rjni0fa4cxezjfmvzdaa6p4me7kvmb1t7ovguxl4ql3l8exofnbp1tybra1rmkpzztcko1hdm3s7i2fa3x2ul52obgrumsjfeencxm8k30r6e8f8ge6ze9uacyhr02sasukxiuwmoosv70um8olngwp60gphdq8vvfb22jz2puyaz7lqgj41t7azvvv9beosne',
                fileSchema: '3b4lvbgeavdwo9sq9j536ijrn8j9wzbo9wmjbidukxi6hcjzmzki0ph3iliprxft7cjbjo6gmgglv16wtv1y3jveeeqqq1tjby7ifunv7bfxh0y7uxsob7w0ywz5f4rm1149jn5n81y1sl3qay0g93fcgd2ngvhtp9vsmjuswzik1ottbwhbaa6bjqnva0mmwand1vihzxt8qzybh2r6au73gluz0d5gb2tn4mx5jztve1ql86b0q379rqzsywanhps2cyvck8yyqnt27zadr181u2towjp43bkgkuaa9m8i6gj7eoeoql1pucpd1914ddkrhgd878k1piuwod1ojpvs5hl9t06e4iwon4cuctea90yg6u27vwpdxipmeeuczyz1fpampqyem8jxgmst2ptyk0e1yxx0upg3c1ylmt2z64z87x08pt2k2s8a3p8853jolr7al80pklw5s29s01zr87ft8ww4gyux06idiy6afdvciwcgk5ko90rn7i7ku3fx0r9xillqm2f6d0enkdrwxuwksi8cynkmzpb72mq8fn4jv3oe05afotbm19dew3btlim9gvw2ut96xcdrk5q1tzx8t2awncku3ykg3ox2xqfcdcxg3rjg9b1jw3in3jnza4ohdla9d5gdin75vhxftne6ty0gj5qzmpobmdf230kha64wpmfvhjdhh1quoietd25eztpzsyn09jvm9fqcxe0o0wkyo8mn57gvof9b9pngywgouixymr82y2u3pqsdgbo1xvqrgw7t0hzr1jpd2o4tfij74f12t6ajoj6z6uyptq67w34s41ke6kv6c3v4dtl3bvb87myilyos6rkpoasi54stbn51xv5mei30wcqp2sxor2nruxcxujylk8hotcij6xldvqd3esmyykl2z3n6txgd1clkdqehyhz0pvjyyogh9pw2638p29949m9hew4k0i24afi0xtxjnr0wm0pi7fcqk5rwlmayvqnekwymp9ef382xyls2kmyp',
                proxyHost: '6pmngtxe45qpqqr2xq5sp473wghld78rw9lbt3t06opgf8cjqb2nvvws50m9',
                proxyPort: 7236607881,
                destination: 'zf4cnckk6nay03g1skff40uu4ib3hks7pjf6e2grxk3fk98asccciippmbtku1rlzi9dquuvelglj572wc9y2mc21ei4kfbxu78ua7ds2urntt6zpnyhvwjs8v6ihogm4esf2qjc3r0rgxundxx0yc0brkpn8jrn',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'kwfvskb0o4yfanvadsf0jii9hx5h7s459mgw4wujmcjhn9xz5nq7se9pska6l8e2zvp91uw9sehhxiliz9e483a352ohj1u5hp3sq54dtuh6ujwaat7qzlineqabcfffmbqm5fa6norii9fw3iirvtjelyz6toep',
                responsibleUserAccountName: 'bxoyu5a0d8j6be3f8if0',
                lastChangeUserAccount: '0ic5g0susbguquifuwh4',
                lastChangedAt: '2020-11-04 09:19:40',
                riInterfaceName: 's78gtszciq31dc79xmk751l9i2grn3yittdx86tavpizg5gqqz3ykas0gaulvp0s8q4wrkxkzhknws90l1u42fekgj4zcezia6fu2gpv3qasq56tihtgjdmpkxler2jnpfkbru5u3nh71vrx8j1pi9zdyyfu0uab',
                riInterfaceNamespace: 'oek029he1xrf5ncizwnxqyv3iec339d1dwobls5qt6i2xsh2rrf0vqp97059xmg3xt4i8pwuju8sqyxh36asvj3xkb6dehppoq2zroztvkj3y1qpyc7b31ns7947mb009oujzsfo4jkt40hpf9wc5pjgljdcerq3',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'dqyey1ohi3vzhe5bfra1zw4kqq9r57lhgvs2e9hb',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'l3hvxt00plu73h2sfezxgzszhldx5tgeiouc33uy3q0w4hhuym',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: '8sf3zau5h443jf6yy0so',
                party: '31fs2ec0myxlk2f2rky3pf94o1tr7i4j808sk4y0xawe89nji6om4i5t0jnzmtgvssnhjno19v7kjj1r75tqoran5xiscfoimdpcv3p3npq2eg5wbv5nof4gykk46ybs8l21yrbceiyqvqkxixzwz649jzvrlwbz',
                component: 't5hdg5bdj07afu6bs007dwwflssy3jf13tz2gaz9xrirom7iwbwi7aw9ul6pg471xyr7f44a4rk3qufo4leunhe4y0t8ns7vd1vidgrc3hbv5bjp5auiv9yt7gcuzktbfme79jwsrp19h4no65i4sq9nrieifqso',
                name: 'krclksnkwhe9wjed4gdcak6tokr8nop94of82r1w3p0eq326du5sjzxekbazvrg4ce1tcvmeu54lqixlyqr96ljdb9oxfkn1e6qzvu7lje97poyq2rsxdl5os7i9z4fp0bxjw8sbkzcwfus0jktqkkvdm8z8n0ze',
                flowHash: 'bldbzgy1rhhygp1c4b8wsty3788gafkmf7i49wqa',
                flowParty: '3nq4dgfjkb0ygikne59ott15qi91zarky8k6ndnqqzx89eb6cazihatwbkbvc1cf71w0jo2wc4mj8ac50fsu1rhb4b1uyh3iyg36bdlnzddkn4uq3y8da8xbeo67zltrdbyb9le3tkqesp1uo9w3jh27905ei550',
                flowReceiverParty: 'zimh2oklnzxh8rm2mtwmatd1sneyviwtd48bner2uz5zcsibki6jp1goxndfx04s1pr9sj0wio063btlqmtpzjippiusjzgl7g8tym6ee84fyzisi8jqa9rwz489ycdpnhfcfpl0bp88l24efyex6zd0iwk9la48',
                flowComponent: 'wy8suuebqh5pv96hq1gq6rqh64r46kfu1igmdm04tzprxic4nof0drskvy068rr3ewwmihvgqogy0zyhl3md7k7bw4w2hx9u6w9qif2qfhxvmk2ew1yastkbl6bu7jwcwg2czg3i4u9hd7e1d4c2zkpikgrv7v23',
                flowReceiverComponent: 'wth4wb92zsdw8ypd4tgeeb5g4utln6l5vwp3ygn1jhfo349qmb5tvvay5nrnparv92qhdl4pp8w0s9fdrucumt3ac980xr0y0axn7lm83om091covi4ingwl2qmwt7q7l11t6ky0lrzm3vm109t38fpktxu64t4l',
                flowInterfaceName: '3a7va2wzmrnf22mditkllgxtyspgba8vz2xtz35i8la52ednu3i1mxyk1mrbnk0qz3dswyfux6wc024ixq89j3g45zc9vvgs0trbhzaqbcmtqc2ntc2c6peiytsf7lmupfhhzatfdt7opakbefayuoxj6zzrnywe',
                flowInterfaceNamespace: 'jlx0t9h2u1akswtrudxavej1sjs7vr15tyild0e35tleotfg3xbxidhmnzp00ea4ja1s9n9yek708avqmhy7brp3ppe7uee9lt9vctj1158he4yd6sxx19b5i1mbj9wl1bm6y50hp7y4mp607byzu5ndyxtpkzdd',
                version: 'rc3hs4ymy4iogr7ln9rr',
                adapterType: 'r9gfmuv0p1laikjbs48ppq9r575ooe1xuhdp905km8tsreo5wtykrebdhl7c',
                direction: 'RECEIVER',
                transportProtocol: 'aui9kwrh6ji891vsw5l6xqbszm4mwn1m51599ig9x5paq2gpsvy35jzsbdte',
                messageProtocol: 'w9v1dpae13iiqcry8swv6rfzoo1fmv0l8rffd2gdwjyq4m75g9oi3d436j1q',
                adapterEngineName: 'gh5r2fwi18u1gtllhi620te8pnc2xlrbtyhcmnejmn6u8ecvvxk0w7alzlk6splsrwal5xt7rq5hwe3ojqw2qcpaknvlwgryethlp37gu9pn54y4jxy4sqsfua1ay61se66qrcec42cxwndwdqm41r6ybv09oox8',
                url: '8i3585yo85vq03ds9my7ziw5vj7t9sqw9tyetyr8wm3ysio7mj0m18qvw3cxt9yjzkopvni1522aty4u9c60npwf7aqfub75tpibfm1r9vimwpcbhpl3oofyrkaeblt8k1sbmif1z3x6kvwbly7gritk39zm8waimu9h6zpid6iqz1kxan5wzjn7mz52mbh749saiq8pef9com5ak8to68c6nsr4qw04bwhmhx23z7jayvqyylcxr1aeqdlb8r2l3w2ny9y3o6qg9h5pmskmunit6kuu58so5pt9bujxc58djdmctlm07ovscf7wyrsj',
                username: '1agxfgnf8g1llnn6b3g24pl0sk9whsdmo7m96r81iqn6hjpgvq64ln03aac7',
                remoteHost: 'dxjrmjqij27qhuev2j125ejjxnt3qcvzkay80seo8jg9plzkb2ciywk79n2v28y98egkbhr7hxvsyramgnzym6b6whaorafjp6q2j6grl79yaaqc5vwouijofpvgckczyqab3qbpo999ibfkfk7s0t1mla0s620z',
                remotePort: 23101179059,
                directory: '5cjjynytttupt4wi2m651ski2cucefw07o45x0x1i1te6nca5rw1vsugthfr8hjv8drtte8llb42o8w1lkeszs4ayu5u1n6n1i38bf02rj9eut1hvivwlj3p3njljtcg7yv1xh7s7aitep2mx4hde6glzgubdtx1fjgtukywpirw5u295h0vl350h5nb9yr2mpm6h24h6quvm8t1bg2e2gm3r8n3vexhhez1phwnyh70we8q47zfpvscra7tkeb04wfo93cfvoklpcnd0v4i9krfins0g2uhj24m3r5k45qd7e95gdktbsqts7yg5imrsta6j1fp9s0tsfcf7wkw7uczbh9ssouwv237gvmwy03druif65gaam8480dn3r9lagmt19ev3hcxj23f4ubsv0ee8qatybiwwhqns0wbu8l427r4zipvjcdlu1p872idg1k9mbanmb736t745dukhqyf0fy0whibkc0v2f5osv39ngv4civgmro7ic5srabt44rg4twrubqnvyjg4hd12bngiyd693wmbet53f1nicmib90zu2ndu3kjo4njmowcjhks90vcv7iktqd5zm8r806ef2sg9tplj8sfl7u13zxm1p1o9cghsvqhakehnmbf00agu28tcqfjjpap6g14ztmkg7yj1dxjzud2dmva2zjoldcrmgxpo3n0krwqmu04toga90myhmkezfme2ikzjs16yulpysmxi91sca8o4y3xyl2vupss0ees5f16tys6iczm2gziydedlsf8b7iu4mkt2km79bgbg5c2ps54fdiyv7ebj3300hj9iqu74oyyjt30untvrqmd0wp023cl7rpuqv78p33n6dh5pet3a709lp7hk6060t0ricqghl2lo90yvj9g7lpcj6t4cp97z6myww6vcdxdaljfguuwbk6nng9pf87sbz9e01ssoo680j0eg41l05zrdx41asdp4n8vw8idv89qb0o30oj3zektag3ptpblj7j8tk4m2yac',
                fileSchema: 'vg31l0nyna2hcdnb46ilinj9hhq5dutjmbzeamwjgj12ko9cylfq8fbmobl50kyesva10e80g1yssmxoqjh3k0hx5asw49ulkiuljsfm7skem139iz8mtfmy4ke7pobhye1lhspc1ux9kzz0i9rt2ik5sdlnpbchf9sxw1mwlp018atqrpa6xognye45lh7mihblcnc0rq388by4sxvufc9efbc5mbkbd37vsn4t1fzq4blsuz07ombi8kse66c9jodqroa70vwah0nkclgxhweew7q8adsk3av7adyno3thec3ks2zfbsyibefzjsl9ramj1k5weys1sznqu1zwa667hl6ie1gngzquuaabsm190rpluh5nxrs13gbu1loxhdp6ehukxasf2745dm9ayh7vjh9r3u46kpvj0ritajx2cvvoar7yk0n0kejpbwni0m6cy6b74yqnrl8scjoepwq68awx5b4vy6p8hqb6xbb6en741djgnwwrxwgxdx6gshgvw27dwakgxz3uajuhi20a0dxa9r0twoqgftloh8h6thub38opmgb266nqwqo054b82nol4eifkf5rj1nfaiyjzxcwk4zwm02ji3wnsged335ugl6siqh1zkoq9wwiycxw0z025zhk0dh3jgsvdhcd1cbdlvv1pn2p6v9suf048g0szukin5jop156hbdhu5x7xwxxvp89k1o51mqt2fjp9hvo5tlit4m9yz92vpjnm1skyaqx6c4af0b62amnkvbdbjl1xoaj1u10ly3q3ojylz39vg2v3l47uooa4migv1ovb3u4bxdtu9eo5qpwzwppcp5852lu3cxm20mygc5h5nc7tmlyid75irzboah7771f4yrevyrkvfgo0dz0fqni5cyh7y1wvdit4thx55m8dv6z9r3yei12hzfpv1fm6uhxuy6t3lzzgns78iokdzt3j1x9q6wvxvndpszs7wqave47zllhbdgytru2aw3asrpy4yp3wubmnk3421nk',
                proxyHost: 'b5678fkz85ndl9gm9dknripv8h53rhabnyxdvo9o0uie9ajjl5nde3wvsib0',
                proxyPort: 1734208252,
                destination: 'ua56sf40222jkj1ld212ht4cimotgmv1kn2qadbvwnx493y2kbf1cwdn8c3ekrouycvqcsf3gune2nkjxjrtez432v8bskmh72ukyxmusjf6ki67uydn6uhlk6mzfwzroc3vzg1zlqr4i4354saeksuvzkmkln5s',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '407b3d7qipt3vjjqzcw7ner2s4j8dzna95w56p6opmk6yyrl356e34tw7sn42prkuuud983ucsypybn12ld3uhpycxgn2aw6foya46x9wa65dghqypu3mx1bxa9snfoyab61udauovu6t54pgw24swykv5eqrxud',
                responsibleUserAccountName: 'fqls066byahl8y7zyi0y',
                lastChangeUserAccount: 'nwimmepe8vtckjoariwx',
                lastChangedAt: '2020-11-04 09:42:55',
                riInterfaceName: 'kjxb1zuskbl7ru0ywpxctmkki6h5ax3s2ucn4sxw83yenrb0wjwlpfmm3f521rto0y6z2mrxxnoctt6t8qaq7dzo7qsfkssbc6m9udce9gnjs6n6kvvvbhlhedrppr3hr1bbxpn2ba7o7gu4che4wodoz049kecl',
                riInterfaceNamespace: 'mq7f7044pcg6i88r19k2zq1pmjg7oaimtsg9r6ij6ww78lkrvqgp0tulbp5r75cy62qmn676otm2ih09wu7b1s1er1ob4ti264q25irmrihy85balqjkguu5m17c5oeu3w01ecw6fpx4nbufnlaqug6d9400qt0x',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'tuwwchubvy1y1aop14duf0ovpkbihzsuzluc4u8l',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'cztua27grmswxpj4xqu8xul9usfprhwa8jk27iut615r0fg9w3',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'lp7ze9iisywrt2no0jlw',
                party: 'l1jf8kgkcqyw5c5rclo61v41xxr56tvkb3u9wwj0avp00a2m382e6vx31tceq03qpjvfle425grcpnbbubyjvatnyqvvqwt263iqo57755xmfxqr654b0k46jhgyqfk2u8990iqtd9h26kxgl09b280hlka35lz0',
                component: '47zxlhnfm9hec2sxk95x7v9egkx6kwv9onsqsrjq4plorq9n04p0sw3gdfyhcn3ubocds8l9ga6f2ayuzz7h8dla0tokdbjwvyxy8tmsnhc8yi76p9k57tr2igmgounz42055567gkmk75xh6hkwhg9nyojy7361',
                name: 'qcwd7dndc2p4qfg43jjt1uzg13lctndq6vh1d1c5i2d2tyuhrddv3j1rzl3omhzsevr33ajnac2d0rv76tv1i7okgc95c4tz2l4rhljjih6473qioesgxjp3yhw6q3fqzmz2f3lv04sfsr2cm3kz0sny17zli45v',
                flowHash: 'ubwu2hr9wt0jut02y48xc4wvcwd7ajz1p1b49j5p',
                flowParty: 'dueiin03vgclhiz56pd9zoicca8x64m36xckxqlgqm4s6v3ofw99uhw9rgzmmhjjkpldouffbccbr56s7ek08x8k3qtr08pis7zvahltiabcb56cfixhxeypoce82d90xcm3dbowic669y2v1us4ox60hc5t251b',
                flowReceiverParty: 'iachu2xb31mozsd2odj1r0jy23ebd9eynvsc0tblpyjce4b4uyqys5iz2sbgz62jjd15ah7o3sbqtvpvnqc9fyr1d07w5aav71k2qx4nr8b3rjckwq31v9rvobwrnf5g16cwndu7z4y45c13u7tfp2n5vpsul889',
                flowComponent: 'c3d2ljl6vm9qt9712sysnjpb3r8kg0bsi9tqrw1hre07hpbf7qelgsu97hnq5w2lkufcey7sob1iu1m7jd9zqa5u20b6jt9aihzlh742k3k49elbmtlkx4lbdw7fm6nlwldktd3utnk6224b5boird4af4zezv9j',
                flowReceiverComponent: 'e1do01c17w4ng8505inqc01stod9phrjd7mh83afv4tgn92tasocrn707wj8o24d00odh3eus82vqs3256vgoihbd1znsu38ccl2opeyeofu21yr7eveyo76swyfl2insih9nl82uu4jobfw0yaeew23qcq1aeda',
                flowInterfaceName: '4pddeh4ktkmc6zklj4e93iy3roluyiaohm6cgmzjpdlnqbahzrr51mf3nhr1nacmu84kkfjzpvok53w2d2ut1bpth2gabw0qcp3n6253a8umh9ptc3lau2i18gv06n1s58emkrhvf3lw5csa1n8p3u2hv2zfjzrp',
                flowInterfaceNamespace: 'bykgcu289133pex5ebrlc8o2n8k8zo1zvh41z1g7r024589bq1oqnmh94zx3ltky0z20pe13aev4f31g9cbz8xj80fkqorkvmakw1rd6cxfvua6kzfbid71w4mgvs1vbmqnbwhqxsz3taaahoxw46wu26kyp89vw',
                version: 'hh25hsnmy3k3wb2wf3qo',
                adapterType: 'c1t3kzvengap1r5km63vebnbdhuckz57lcfak55trw0t06dui4577i21ib3t',
                direction: 'RECEIVER',
                transportProtocol: 'cjq5dacq8g8jkvhdqxlc7drlscr3r8yci2mqm990han25o9or9lkimofbnls',
                messageProtocol: 'tc94cdn5u9rp3f0c60tt7k1f4qapv53stxflqesej3cd3ehl8r9z34p5m3at',
                adapterEngineName: 'l0d02qu3dl1smf74uex3tdefrjwvvpt40zq8yrx7ab2cts9tpwwybx55w627ziks093pqe5ruuxbi9xhyhaptegm350kseklb03v7psrxcho3gp55gfjnsu7d6awh4edsc7nzkmwsqi9xv2v85ogu4wtbzbu8saa',
                url: 'pkesbj05x6p3dsz36m1bcu1u9vzhnpbbr8yyiihwokdexicyynbrjvqgs7lnm7xfmp0a156qk2xuvr6yr9s7phbljqkxktj42g6t68u5lfz07m9r5hwr46xlymb86r1qir93zcc7w5kiw13b3dwx5o54fjk53cl4dkgctdwm5ks87fqn4wwy34sboovw3m5jxjhfd510t751oodjwuiewserce1bwj31mwdc9jcy3natbilk6b83qnpryu2uqucoqnxnns8nr70khv4tdfxiwdzdsntehkafhk6qfv3qpxz14trost7g9teo2hflk4ll',
                username: 'xcco6rdibvhbe1fml57unwzvet1zkdvomlkip4c4064bgrnjdppittbh9btg',
                remoteHost: 'w7kp7iz952p7fz2vndp1ay3os2b3sthgqsbe9eczr3yp5ew5mbeg969ksahsu0iuwq3rnhtofgb0m9fnkpscbtwb0dfacrb62baom8uojalkr0suj9jcn6kj8qojc1jxhrfdiq6cztwx517upjk3jvkf7blr72le',
                remotePort: 4760041145,
                directory: 'sbf9gnyyj9bp67o5u0de3hhlicgs3vhyukrvfevro0u2ipi08w6ui3ozxjmk6loj10a12ale6k1cdwxw6flq8u3c4mf601yqcxko8asxlcnzcvf6kmpefwuxbiluqrox687g5i3nwnt4j5b4enloglevkgk2am0bh1eyvui3iz3031a6gzs9313boazew4yumu1w57o2kdr68yg2soqh79slxryp7icl19l0wr7prp3y3gvtib5sgqmmqor5v46lsz43vp578s5rbh2mhckctbirlmc8m0x6txqpswloo35qkz5dxh2xbahdqzqq10kmks7r5dw7i1aze5s81mdx8w2a6geyzmtriw5qavg6211knt3itej5fcl2uvqfnemebd3cva8n1a39a3kn077lao8h6a7afyndut8fky6qljh4fpibwzgfqagblya3ka2fmzfhnu99ye6iri57z35ejyrnz3h95qwqm4pm7sc6ws03y25tpnuq169wz9zgbva66s6nsyns1o88kvg9k70i5cbko08kff0hsauvw6vmt3cvc9kfdzmj3wvzt2dwa0tme69f2z035ufj95dzypeaylfu8ujaql4e8otzom1fq78pzfk3zbuih433960001rb0kv9kjs2ekhx5jt0ovuztivfzlos8bieiizjs5c3r7c4rqo2xagdci2f12dpnlwswx9h0d2uvsjryrcpt4khnydbvr2kbpofsyvvap8gy1d8w6517ry7dd31sfhurng5ywpduz1yriw5qb21f858a1cctzhq3v79md66gwlccv9clvhehpz0tw7bpteyj0wliwd5mz4k6hn12zo58bc7supsq1l2p8xu7arhs0obkvy0n5fzqfovf3mrxczhu11an8ua4edrqsai0sb4i8hv3gneenepzg3nawadv5hcctckt2dcsr68uwe3rm2pmn88x3n48joll12skar5zjnd1xrwwp9m7j4nakodl27l3ure3xnfarqq8n5eeqdppeigm',
                fileSchema: 'h50zlln7n7i5auocf8erp1vnzuzjhd6dsiwyclald1fd21l8l6hw7ajyitopm2o5l69zgvpxprph576pax01kqsffwjtvl0p9acrz0dchc8qyt49uy03v637mfpf3k2vp18zvir6h12fnjzks5n5t2oomk2xvbqyv2i9v0s0rarb3qkjf43tu8plnd3n0hf398c3ef1ltqnx2m3li41rk2lftxpzhwucvfy95a5rhf7x1d7b52q2s8nxpsy3iq5bx427mn08z1krnfjgyphizw0oy1k242s3wv4xo7mozic4q6cf5sasyn9ayi6szrx3amefm5afgqcbmsysncysr7rcqy03nlocpb2ee4kuds3o7nse2rcr3lca4urqupnwuchjw7ns30fsf18jev452whp8plujcxs9651te75rpms6rrzxajt49z12rhvdwnf3bs4xvvxkduwu4tltjl7r0y1xhltn9bk3rmabo9oma1g1t526z0y47rtlc0ln5qnunh8wnvcqtrm07ohovxezo3zjxj6lyvm0yhhpabfzgazwc0tdk29l2sxmx2qhfikpk8igoelca4pdbi2evace2yxs61hx3hzkofaneqlr20dvpdwldh62pnz4fith1mh5r291j69yssym3hfryztpo4bo3fs1c2e0qdmxcis4gpro9ijo3i172xlinqhwcaflgbgmmbw3q1mgurn6xi7yms3l1d3nkqqziw8bc3yoy4gf2o1v5c8k89j6ltqi41wbtwu4300wkm5gtsrxspyiht9soz1sxvz8zwv8nq4vvos9atw2vv53ic3hgktuo6try5s2p33eqpyr3ry0evv2m8pcimbv6bmp9kg24cr9tsmjhizxrtdxg2gg4mpvn18v2wmojsd7xinml7u6bn8j7e6casyk9ateb6lpoceb3o8dtmfw40az6jfuiuwzm0jjgyn9qsbytxfc5c8fmzf6hnhf9lmdm40zsatel7a54463lg2ntpaofop732o3hxm',
                proxyHost: 'ynbh1meqvo1fvm1b8hzgskd7ibndmi51vodzbrv8lqjdurh3jivugjmx7sju',
                proxyPort: 6002809196,
                destination: 'coigi7bp7t1r81zoaykrnpx0nqgcp1t4s1yr6ac10mqjygsl0vr75yyc2dpzo3xqd85ua0axdol7ekrw2gmavnxn2yyjhfwy3x8vbof1ib0fsmnyks4qayv991r2098z4iowqbpj4y8n5ri5ikdgnxgxdhttdb0x',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'zr9mgezufycehrd7e1ykaha35nna02coqgbal2kdaomvkvay8681vs27v36suwfbjj0wqf06anam7d30hr9h5p1iiet9vmf6z9iaq4z0ouv3e0xe4h2f9w0vs3hh6io0j6u7pmvv7lvzzgcbppony81x8lfb3hio',
                responsibleUserAccountName: '0qmu9lcy5cx2k1v2b1rn',
                lastChangeUserAccount: 'zdpazujsrb2287rejyae',
                lastChangedAt: '2020-11-04 15:11:44',
                riInterfaceName: 't45h8qlefihl0eln5o570aebzbey4mfntbcii4axdm8t1lftvqrrc868ng673kf9ib79kv7znrppsxyvq3pu03cx0a45ifx7ei0ev7yv2s5ljcpcjkzdoqny4jrzk3tc39wnj0yqzxnnd4hg7e7teohtakm2p0w7',
                riInterfaceNamespace: '2v18plz19wm9smugdk806ziuizb60wwyzdqw3uo92ct4o9u3dohnyknnag5e2ag4tbipj54dz3f9xtvaq0koabntmfsh5o1e8gizbkeq1owa0i4k5243bnrw0jijw4umh2onygq94wop34owlmadr7sl7htp52rr',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'pftaocox1rcp3tlup2tyrg8syquye65g2ob114ss',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'age8v6edojy281kx1hfew4guy7w1uv0tugcf7lhmsxyt3t4qx8',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'g1ngkf4v6lpyn7fwt2er',
                party: 'uvsqds5g0scrr80zrdzvu48ykuy3f4rlhvy4t7clfvhx4g33vvx3ufxmr3lxqqq7z5a6uenjzbjgr701l5h0u5w9gvzlvibwftej18x15w2d3ld2uajc96lmp3d2e4ry38qsnhghf1co1kv4jesez615q1ym5pp0',
                component: '4h9fjhb2x1ho3277beux6e9oj0k7rn69jblu1fdr5ghp3esmcxlrm07gyznf7d3vywyzmfvtq0ufojvrr6zj781edo0g0gjxqq3m6nfcoljzudijhn58ddtbh0tium046wdxnbnb65jwcn0qvgfp8fvnia2gjdj8',
                name: 'ypy4pnzyvhli0mbjizgskz9r8pko73ajz939abvftn8ao98rwqtherhhahnr8ojnrloimspqflott8yibjvvncv5b58qylgoivd2jg6ire9ve4jrauo38pmy2t13x73wplphwfpoyt3ghs4sx8o44cy5hi0fy6gp',
                flowHash: '269i3vz860bfxoq4023pr1f5kvxd3qaz6k49745u',
                flowParty: 'nwplv33rokvk248wdendbdnfd3hsuelm0d3otiogs6zhh8rqpiuugck8di0c1lqzyhsk5azhqhn0xw9l2nnywjgw639yrt5bwh7sr3biv0gpwphjtjzju37id6ziuqsto3gyvzujsxwiocewej7uis3goizzf1gf',
                flowReceiverParty: 'xokdosc8b4jik6ymrphzwjt19snr6bbzof8ipdmz7yeunr0dz647i8eg0e56z0rp9ce38c3qu14qazy3jlw0nc3ubr2wm332tcjop8izjca87zlwrtaqlc8zfv1krte1w5ayt8q83f7v8j36rzd0go2d253mxfkp',
                flowComponent: '3zd28eaegv8yb8zvgf474pyovvgyk8mynjdd6jkwwz3meprqqpg0dd0ltx8v75tx363fxhmice1alz92tdgejteuljuwk9udv6d36lz6xh8nu71owcoa6e1jxurqnk922mz4ophvawix1i6cz2t7pwqorj8je61o',
                flowReceiverComponent: 'n4zww3z49s78dltqgbe72yrdcyj0bqlc23txdn5khqb6rsca6vwgs3uiwqkand2i4dxadnd9jiuclozgw62qw2l6fm6oru4saq2qym5lhd7rg1h4fb5dgz2rj64ns2nenc9fltgi3tsb665i4qz53kxspylzv70x',
                flowInterfaceName: 'pbe96h19mobve2zhh38oq4b5oh49tmhwwtcco448er9ca8m8zsqoljs1j30trzbbc1w0bg4cwd7292w229auu4z7preflk0v900ytp34jlur2wu8om56z8uoto74izis694ywf3xtrislmg3ooafpt0fqnqiw0mq',
                flowInterfaceNamespace: 'ja9maoauju0m627u80xbf2hpcvl20wo4scxljh6n0jsaobem23gbmb98vjhxowq7v229vsowxm0tuvy6ja9i7g0dc7aaj18fafu8osbxhrytt15s46g6rk6snoeeu83koj9jqmjx30tkjzthwbqpn4dykq17wcxz',
                version: '944zg1wa87cch04wps2x',
                adapterType: 'ji9bx12dphgjvg3npidypjec7f1jyqhqtrro1zpdt31qz6dpde7yqq5hxaxo',
                direction: 'SENDER',
                transportProtocol: '094hv3eepd8amuleht6cdjqqz70ayt4d9hretlytrj7aghslqv97zg0bw1om',
                messageProtocol: 'cfbqt3g0elxfrlvxh8kn5n13hsl9kiewzz4gh6armgix18ywk408kiw5d93u',
                adapterEngineName: 'hfx3xplzrzfs6ctxgslaepb5reg7o3a4ir51v47mdtdf94tinuq61bf7wdbm3lvqea8tussgwcqqlcdwvm2l2eyspox1waejcnxzyl2vo6vzda8l6fx9l2gt9junodcmvl3p8aedk1eod1ahls179lwpvsnm844n',
                url: '32htbt2738nvskbe84mo1rv3rlruhgaz4xytspyd6i8n5hb41dnpzviu24cdxnw3bme8iko44qge461vqztzw198isi0k7ww705ilhfylnidvr487saxyx8652ri5wmbbmjrd27idawsv54kaobtixbjq8nz7wm3bfs6nt8040mclr8mzq3oyn9odfwqdvq265b8qcncakch7rtyfv92tg2qrs1v23m0m9uwmz0nwz2249b08jq1engt3s3chuje29obddc1y5qv2agi3ypk9lo0mlaj2d2bgkb4mzfc1q56lt6hy3665g3z1pkifi0q',
                username: 'zoqts2l6ri1ubyzmdn3kiy0uojwotensfaebzjx4481bso1palgmvxtkf9m6',
                remoteHost: 'kpcij7ju4kzp5swjk1hpkgcwfcjra8312d8v04k7txokbuyry7nywz74udhwkvts8xu1bjmp3vcd56fef11ihq16gtf6xby8vnp0q4ngy0j1ise6b6z1mxcj4fuuk9y0ud3rcxmkf0dwi9xsw1uqktb5i2bh5o2l',
                remotePort: 2393118115,
                directory: '7iwoyck0rr95uc6v20mwgjhau92di0wfjk9ivh3uimp1g8jio86cw6svvfd89b6jnt1o8n72w8j0xef9ywhbww5mude5cjdqbwuud2dook6r53o6xtt04r0b94j000d5qewhq4ycz1lpbxf5sug88qaakf73rmhn6uxig9t7fqhui77195mbi0yg33w1sjvmfi9f2pyu9pytde7nsea9r9bqe4vcdcbquayyk8h0rquf1xtyow54l7zgy3byuihsp40x2wggpnq0371ke6o6iz5r6zy564pkin6h8fgluedb2qe6q4pnxx1oe0e4wxqdr90s0je5s3d6b9b3psksefuxxpr3mgyri3x1gtgwnzzymvs7sy7eob41q0wfen07pfedylenb01ln3rje5dhjy0fmpyv8sjcye1jx2utxh0mb7yaecycipb45dv6dqfs8brku2x67amd0cmc4xvsc5wjy8utqz7bicnqgmo14uvcpl93y0l9kj585dpc6e1jh3kk6nkzmxy8obycm03v1qhxd0ada4crvosvh72gaz1dmpbqrv2j1fahxyhm9ba4q55vo8e33ge9rks53jyokngdeghoe32skqsnk9xoxi35t6klcehf6n52ixyw9g59v4uuboh80hcucfsd5kfukxszpmnyg3fv5q4pv1hshqy5nqvhkgdkoqq0j7mt0r2h23ogysd0rq2elrzevutnhqbhxev4modz4oxj3xcqmbny4ufjyoxr5dbil1d2nyehks1x9olj62im5sznyondtbzlx8vbp7vh5b22ptvzkglrk341w6rvx1qruewajnkdv2epqhdorpf8ru1v1mh2bvu2rcwzcf9bt0y8k8mo2k5ynndy0b2saalufhetu4mx8pc2kzldme0q2fq0ifo9wwyjwowrwnmnkema8xmrixeekt2nvq970m3z99ld3ilz9e0wh9mvanswis1w26i8g28ofxob6qo3j38feldtv3y2tzigtdf1ldgyvlwjeyng',
                fileSchema: 's624nqaqjmkqoyqii4k2gga1uhyt90s9twj4x4t3r36er2nngopycot2gqlh2mvle1to97hzcqwy08s7reetztid9t616kdq7efbac388pigkheay97rdq54ii8c6k4pzrtxqkb5exhob86xygks5mbqy2ihi184ru9aoz1h7gowa4eyyrcru0lmauoo2bkhpx64ruetvaibz4h7oj7vycphjh4htkt0nsiityrq06g5lixky35mwv3k6dhg7o9d07f0gbo4t1ikfjft6r91g4b08ojyoanhk68rzs9u305ywze82owo4zuakup5y6h0hiwydyaodppllq9czik5xrqn3q8ux0axau4ff3etftw2n4xltpc49m10yxw9onacvuz97c7k535c8q6mf8edy8cczu1vioi5p27osg30zzu7jdi1yg0pv8a6wl225y3rpdkn7cj5r4ydhwqi1w2zuz7vt61wwpxr7irjlew5276nqz9zh912233iomb436yimt2rjw40u27k41qi80q8iybo0vkbi7tgwtmf26dhli58u8u9cpat5wz0vuhcqxvg5b62qn102m43q3156skx8j6m2teril7tg4d7b9d8uql8tfzn176o71kzkezvs1cepf0vtm24ttb1q2fmyd7h92k7xenjrovqztcc61so9xgk55slhtoxx3f8pdu8rvux91y5oksijtjv5mg454vgf41zp6zlu7d9e77fo2uxd5c76m8jdrl982qm22uesssr4ercfygehdcep9136163k4inuw2yy0ka8rp2pnxdtta152pmyakcphwumiw40oe556ta6slal07ocsady9ynw8ch746cmrefu7u4zyygu82zpnf5o1axqgk1iduydckyqcoq09g5latc6oaipfpvocldvomsabpyuhel41yfmxlrv3lkewwslftgywil1zivcc2w5vsb7we05drwov93yumve0eu3e6fp20r2oiju31s4ulxoai0e97prkb1iz9ni',
                proxyHost: 'ix7hpvp3w152sth0gs62njyr62jeexvgtaywwu7sypb0me0rhvhgzqngzjk4',
                proxyPort: 1517364241,
                destination: 'eltcts9wgude9val8kvpvefgnhv81nggdb284ujcy2evoe10pul76xkmz3rnuast6cav2sdcwuhhkatqcktb1juswhfv1b0vxzopu4gwyyf0ajbwb1av3y02nofiy601lq5151i4ln869q6eevi7azdq2yw3w4nd',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'xv0i3alzfz58omg49b9vw75ez4n9yboslu4apj0gwjwxf6dsjr62s1rlal13iq0se4kx8rb1bq280f672yh94gsgvcs7dlta2msq1yymxe2pzeodjejlno3n5pku9s18o55au2cqdlog60zuykk0hyzarza69lvs',
                responsibleUserAccountName: 'm9zvsf8xjyvco24zlmxk',
                lastChangeUserAccount: 'l2zqwif3szdl9glhewjw',
                lastChangedAt: '2020-11-04 18:09:22',
                riInterfaceName: 'ngmungsjpwvj0mrwmu6xbt47ikz286ldhkd5izy5cu3ezc6ydn60wep6zz7to0ppvx24sq5d2t2566anov1xrfdfihjklrw1kwmwt0yucqmq47qyasgwz6lpa7vv4puw9zf63gin1eqx4x52eo0pwmo7hqkodj1k',
                riInterfaceNamespace: 'l54a3e1nufksfyf9vroztet07ifw7ru5ppifpvs0acptwjiw9ge3ttw1e02ot35yufz1muou1ce92qsd57b0q6hk6n0pw63y9p3hdgd6dc30bmza32cnc0cymdelw2bfdmogtzyobhyxp70517qppxznrceeij0n',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'chn7smuie8tto91uj8eb6loyiszhxw0or7s08t5e',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'tzg81oiginrkvy603hiiz360f24n9lapzoqzxq13dosf3z3bjs',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'gp0p3qspcq85nvrqkqoa',
                party: 'xohnsrljbi9c2eoxcxg2elryoond8pm8e7gh67sndtwio5bqxkbnpb1w5iqapz8u0a4fkiiyq5hnl1s8g3pzlhbi2vuf65ffv41ue2xexpq9q07kuvbfw3yjpb09rd4fq8rhti0jq8pzdw0002gqa9s3ga38ppry',
                component: '0xbccsd74z3es2eo2sc8wf3zckq09d2gdz8j84iznn9tjv85qmjys0rsjhyx29vx251n4z1hopiec2sb5nf6ler32xa0ht1o9ql6648ej6trfaf0shbrjgojky1xfea3vlz7id0vguxcnhxl6hpos1mo0y1c2p19',
                name: '4ppattno452kkd54t66e3gm73e12l27363bdjtxo2x65yr2rd0559ywoxndtgmza54ago46tkfu7u9u9jiyp1cfgtcpnc8iau6zpjhapcnm9jfcybhzcm77gdcpvi6o74mevbtvosimp4ku0pz9tq7sd08oq9sgr',
                flowHash: 'up7x6uzkoak538tuj8iwxmlgjvfa99izxfbc00xc',
                flowParty: 'i7m2t2i1kmky06cnm7am4gvmpdx6u1khrd7p54ac7dwbcfce6roc3m58nply141tes6e9k40u8ji7b2ezecmcrlyun6j47ja2rmpxl405zqomyllyssxe4wrl8c9q0yr3z7tp73enw23kwxdwfjnetjperuvj7si',
                flowReceiverParty: '025j6ien2237j74wgqc6raec4jtcrp29xd32qc7yqb7qvhtajk53676armkrpotbn58grbo4ao53dnvkrn88laxvr0b64ob3tdm7gsj3uxuhrd9tb746txhmt1mkchr65zfkzw19kuaiafn8clbpdk6mknc3u8fk',
                flowComponent: '82hu8ztb7edp069avqkgjq03apl3s4yv31ifv2e51gkou22papqrzib79o1zzukzi580h0w8amb9gpf40beledn3hvhdjx49frcy806ri0smyrsudyrdbwe9rx64qu7hwb4ip5jh3fs52w085xtvl3n66bxdgji5',
                flowReceiverComponent: 'rxsg4g1fs3hwr3fkeki4ib4l3kwiljy2mbxonh4kgut28q9qlc8m5xpuyuh54wsmsa3he0v76ru9fvtx495m5xrraxc6wvjt9yhkitmgckm6mjzq33l9b6qvgppztvb887hnckapw5z3oh42f06thpsigjcgsxyq',
                flowInterfaceName: '8mf6zd4bji0pspuvnfya29jojkwfiy0ci1tmj5ofl8yqpkqhq6a8fyahogcgdll0g239wygdgodw2h1qxt1jj674f1a2fufpnbxhr7ml6zq5o5aqyhy3gi0d1xvb2ynbz794lkdlxuhitzpct630p5oln8hlnef4',
                flowInterfaceNamespace: 'w1cyno5yrlyig4z80ip9yzb1dxtnuqomydz2pmg8fs4bbaprf6b6lkos328dbzppgw8by0ht12ombop1olrbnbatjw69ygo2314evcownibhoohr1rxseuxdlh1z1ni74lymeh88ja5aqxnybi1g87eapvdeb3lo',
                version: 'jj49sdw22sq35mnp3uvl',
                adapterType: 's0gwx7o47ngwnsrowju0x85iavav1obnxypgn6ni5veb50l5aorhm69yikhc',
                direction: 'RECEIVER',
                transportProtocol: '8u8ljc3wj6lsmh7utjwco25jbozx7zxh62ascgsms3kvj2mp9itifhoswpzg',
                messageProtocol: 'r8ktymybq1bx1zljpvnbykj8wnlgmy1k61ei8doyc10c64hnqz48glgtxlg3',
                adapterEngineName: 'fkkhni9jejnpsq3hr3r0sprazb34pp2h00sjshfc7rijk7vyds5a5mqmv5ylauh2wyv7nu95okx2pc1cdywnwmnbl2nx6yt9aruos2i4fbwjsrn6fctqej2qmln4t1cjan8ubjjlaljw55dblp4zhmbeur9yq1yw',
                url: 'qk40kx7sq579iz3yohaf6huyyp40w8e6m3yml3x6jmopo86zrjxxrhf5wd2fn6iwlbsu6xuzilfdccozh1ufw5qup5nq0q6j2kzr3rpbyxxycvxfh96nhpttrri1hwcwb4jgd0xtzxrzgrfagx5ciq3j1f0pr4lnt2k8zo3ssnvp7g3ji715wdk1msacu0wutoiqeq647wm2q2balua4s8puf672v53x8yyio7ajeo264sgprdu2gux0qncpa9h8kgyraszluosqub5kxqglo78lg7qv7s54y106agaplx28zpeet45s02hmhieko558',
                username: 'ws8fvovtmlghmxv9zdjao9fgb7mxdcmpm5cy7djqdv2wj87ecav907t3y1vi',
                remoteHost: 'ybje29n398p7p39p9ecz4u9v7g084l0wk4vobsde99ioaj3o7srobsbhstsznumlm8jbg7h0wli3zdrxup15rjen0rbgun95c49vkrtvpbjlbhb7c054k94epbwlj1z471uun0p09pkc4bn8xo71kai7bfx9ys6n',
                remotePort: 5487327670,
                directory: 'hthurpef938r35pzadiqj2g0009oo7hivpte3ouo0w2ylrv90yv5q3hl8cpr4cgojdrgo28peipkfyrt2e0tt4nnx7m6d1cey3r8j5ywqiha63dq83jec9g11jdpkgs8csajic82bzxqsah7i6hvkxpwp1kvlc55gp1hf4bbjtj63cj67aoeco93elbl4vq4bgv9urqckonb1se2jagkgn74cu5o3iptw1e13k78xb8vpjdo0cmudd1ietuxroyez2ouoo9wlbk4jswopsvzw21lhvefqfn2tj3962m7d54pkfq630nkr60m2r8szhipi7gthx06pd5gzfw75bzc8hmigra49gbwt5v1nbh3fy83aumglzp3eoyhlaat6sqcjmv458ejp002j1nuuvrez8mfu6cirqgpbrl85kaz6e6air0fcu6e48xxn0ihmi2tzwzws07qsqi586s5v9ntd0310th6y9t0befbor2tb1i6wnjt7m9r6ox57cpn0l1qpbs4epi3zupr8wr1f7mougtr1sp9bykan20uecx922nme6510yznkn7xa7a1p1oc3pfj5v2gy2xxdsq8g6yaq4690iuywiwcqaqxbyr1mlxjozrdwi2kl1whwvkid3l35qh7fx6fotw2239tvb92lrlgr65vkm7ka8sbovruaptbh0p5030mkbd49mhux6wffbeuwypsbee0p860ywryoo9s7thrhmv4qwl75qqkz4zifirbj6eki9vxha33xe3sfero2ieqoqhx9vl6peem8m5l1bslbpg380s41qdbzhsn0rx9tcu8ww1it2aqkt8ftoqc1oetxu171qjdb9vtq3l8hf3duzc1qpd0og0jqfa7zjbjrc0kx5u7ehgan9b67dk3jm3zjm2vvc1hswenuj4mp1gbqopau6bx1x90hkmonxip34pxc375oe61zpttoqgno8690txu53twbouy7caazyi5oqyy6p2xmmripm1n4gpe2mfjz33mny110ao5',
                fileSchema: 'h5zu5cdgr45a4i9cdqxgfmlzk37fmc8pt7mooms2j09euznfio58dt4su12vnreacxw0b3knuhlrdrf2ljhdil7umc02bsfni0e7f8n6880n4wi5c6np3mzemdhmc12e8cqfzlthyhupe7ihn1qaueau5052wzousx472aa6a4t63msgfp82u295wsp0rj31wd6wy2752ncuwr5z5vtapt2mkytuzjvnfv139th8b8utgjefh29x9evgwyke91gghsbkv9d8pslyf8m8d26h1rhn6xixdpg9bzh80u29vplhtu7teypzmb7lvzptj5x3a3antv2wrkhmpqa36193zpq5rtf6o4h7qhj49mveivlc8hekz813id1rak15gn1vys0i4z6plie23661qzj8h2ven1xcii4iytdnaxiybwitdm3zz71ghpf6ruynfwgt8dmvdpzve1oi8l7o8yhia5s6ttqjuziq1q9y4h8gxkk9ux8zio8s4ucvekmnygroa1owov3qb6esvlb4euayzda9y85nv4w50yymr527p820s2o9gmifa218j9zccmopta442nyk1g0jyzxbbm0vqhehn2sfqmj37d6r8el3o0kjwqt93oyhe2clx0x4rkks4u9cfu62oni1jbwc2yn4llwjrrhecz1kkyuwovjuc4veq3csfo9vay36ttnijxf5jte0386851c3u5muouhzdd0quhcji30wqf6vsjbv4lrumvr8l6mcrqqi94h8z6hq5c74ibeh0hew76nocp4gmhnit5km6lf6uvxrsdgm8qz1ni8ad76ibljptlx1qijf029w5839okh7o2zqxoxjdxztk5qkyki7g30qe6nbcg6q3aoz8d24y0st7ablyu98rxeazx5d55ornlql4beuxxy4pldtf82m8bnb578541c5ose7n33tfgdubu5kxxsyvzoysdnkxxr5p1dy1hiz2yugf5andg399llte5dp16kohg7tukmp6v9w0zqkynn9',
                proxyHost: 'n98aa5t4p16n1zm71dsaipx37n5fwashcioz33dpqpn779f5p1llmvo4lvfnz',
                proxyPort: 2301164273,
                destination: 'vrvf56y2gldd9gfocwgr3bx3iyslxccvcwujxdqu8p7wkra73j1m20vcb5drv7dk418hs9374xw6tl85pfjr3ieq8cepmwe2lyww7ck8jeyexxe3midg5dbrb3eoqnmvgifhr8ztauj3vsilpha05imhg0sa05za',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ixtfnokdzlghfgelqp10jwjsm74efrm47qa1ja9vst9ym13rqbf9hmlav5lhrordwn8suj1g7enuior5xorimayn54pncm6bjojkp9ewl5k1lyx0zm12ky1rkjotbe3bro74ir2sgr2r6m8y1e1dauvvdf9848ld',
                responsibleUserAccountName: '1ivuolhcr8unxqx7duur',
                lastChangeUserAccount: '5u7ya09ogarc8f5unns5',
                lastChangedAt: '2020-11-04 00:47:44',
                riInterfaceName: 'lmumhw60xxd16tddq5s9lzc75jhwd94lv8v5xqep2nlsbfzkgttqfphsqpyt06jhfp3pv61l2oy9gvkeey9aei72chpbotomvbktgpgcljqszssqj20ihyk6nsy5by2sfm1nm7ycomous698fyk0rkkqu7ugs1ar',
                riInterfaceNamespace: 'iu509tzo0tkhboh1otfu038lmn6tbzwh87hxlwc4q3pz7fwaacjzx47ha358zjm3okfokzt2beoypvfdmaco62q5ararhpohf87ygqm1be4strywqnk2et9gzn6cg7qnv9j9zdu5sbkuywpn7gzgb70vsfktispb',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'tlndtcfk90z24stager5yhui8u32kuqfo2gojwkj',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: '9g4viroy2a5kjdzwkxsnbo59b9ys2frrbq98rwl7emtf4niwmf',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'hvcy6ezlw2zm1v3i535y',
                party: 'z3p7gd2y3xxk71fbrycy8vma2inw22wbemt3prkvtuu92as6hqdqky8xfrse1jsq3gwoh0leyazsx1rbdl1wknq9pwet91dhelxc0brvae07mslba5wzg0tm52uf4bxoqcj5rnbbapsu78kr7qx7ljp8sjaoo55l',
                component: 'px7yo2d01gpbx2w9sazljck08fn5n924rv3t8xra8vudyv189uxftino80if3rk762ydopv2dub53hm2lhcswnil8tejw2z5vjb6160taujrusa90c73lifftz957sytwqsjizksx7tiwtm2sonle1s2opqt9e03',
                name: '2czggd9dgfpm3gsri4v6kymhv6ssg61m6yge3vrdghzk5kfoscggpn3rwo28no89z63ovqndi71ft96hdgrkycjgl2zjzuo70x1ku3p9hybbjs3l1gkd6enbyzjla7lueoasypo5wgmck9kgfvtpsg8xwydthyvb',
                flowHash: 'hgj7n90lpu8yjn549cdbt0v6aldhl68s2uc6f63e',
                flowParty: 'zctg2s4do2zbm8ycmont8cm6fiic5sz1xiz1mntus35o6mvnca6fws4o6a5aq0ar08v84jteszoxsou3hgb5ivple4warllkr8s15lrvz3sbu53hiphi7jkqhbs32lzzuovhzgkk2ntei9hue5eyjiphojshm8nz',
                flowReceiverParty: 'n7e2qzhnkc2hmgr0sy395zuh9u5epe7vit2yq4v4yd5qg2fsrko4rw767xpcqjtzo2pl812926zlq4y1wt46d46pcze07shw0vv2jakcnjl4mkshhx7lcbjnzabpplm8ye4giwnux0laq0qx0w28skwkwyo8lk2k',
                flowComponent: '901nuti680nlz9v7hyolfz7fnczxwdr7i9w54ul2o49kgfgslknip08ekjfvku65cj518c359cvj3xxprhlr73dybt8d2a2dfq9ynm7v6l8d2z9lkl36kyboqcu85r9jn8itwnjpyrei3sz9dp81edzykqxdvx90',
                flowReceiverComponent: '3t8f14ivmfegg3nj92vovmkvmtq2x4qc5magy57g3qagbq3nooui92ngh8nqbpcci9ug8n3pnt0mueinfhom6qpvcyil31mfx21xkvddk3au3g6yaqgipabkdcuqq1nj19smqpfvqlg0ygmpucdc9l4pbux19uw0',
                flowInterfaceName: 'jes7dxp25d7f1pzy35c64edwc6tgu9zpjryanm58i02f27al32bfk5iuzqt2k9ir8v6m65yksjvv54jtcva88nqesgwn1tzwehmv4xtl1i8hh47823gnxfm3i39xa72qkkx3rb5bpb0czl0ezb2l3ostu01v81mt',
                flowInterfaceNamespace: 'uz6mtalb8mexn5sthtuu8wuw7edponx8i8qmui3se3wrnsrcy9d6luj1fdt7k95mrfzhkp59j48dbcfzai9kvlm2dt9pd5br595mvfxlvpaj6u4sqngbr0pj0gtjtay0pa9es395ejbwpflsafxbs7l1fs3f1dpi',
                version: 'lw7nroagqxmqaknu423a',
                adapterType: '25p2fgdcje1vsugs1p5jujj61sz7fwlqo12s7gbfffbxpcd2yyx7wy1vyd6v',
                direction: 'SENDER',
                transportProtocol: '7penv1o320qzt57uw10pqx2n4n6cr3bbjd6agdra0wv3yvsd983m2xlu3tbo',
                messageProtocol: 'jy646ax7nw0wr06p5uzxfoa1prn2iwk0gpvcy9k48d3gol5pmlwtlw5bjix7',
                adapterEngineName: '8rptrzfvye5y2z8yv6icyo1jjfz9zinapegadvw7uwdmwlt9twdpubm8ellrz0cqb7z09p4heh06xlmj9kikl34opkijlxqf3yswc9cybq15y5uka3rk93wdn1nowvdbldm3ibhaqfiq7ixl89z0uk9dh0dfy4oa',
                url: 'zd4xyh2g379numqa0hej2ga52wx66xeqcur1f3s5zr9qqq5e6108gxjsldwjaj6we5rxzmuub1b7oai6thvi0avadaqmfgbbv48pj7x5tgemq6uv2jqz3tmg89u0k2youvqb6v7m582f7syd6aadeumcz2aw7678r0uf8hxg678ls4w2adxdj3bocmpl3928fqp1f738zdzt0aye693i52skmfbboxb17t4nj3xvalypbo0075dmfsolpqvt54i6lj9jxaquqci5c1q89h0rnt5ajqsmzdnxoppry0is04vez3md5x9ohucfadb9o58o',
                username: 'kmvyqnuj9vopsvf7qyld2jf59belx9njhpqcillweuatj4xekmx15wuqzjkq',
                remoteHost: 'xkm8adn7ln9xmhr3ggrdet2y2sgpzquitceff7at36d07jnnax2bezhvtpgc1eay8m894ajna0uv7bak45m82wbduv1x2ycn3n6bqwss0x4ky165ijm9n7o5ix24s04md0rph85dr5wkzzlyytnlipfcju48mztu',
                remotePort: 9753760374,
                directory: 'ljn30tmr8suk429y2fh8bwr6jxr92f1gh73ydk0ld4cq59hzqfvbn976mrfuaux9tr4vkxg0sel3eo4agk0voxj2nw56y2bjke02sng6xl9i0igcikc5p3e8moznzis3to6a0nh4af0nzu0yz76xyvs2ciokpzszmkd25ezvt04mxj3cjqopk088d6wy0h9p5mg8jexle293upkoxos5q8mpw19nt47r8lcfw07k263jev7a0l8zxl3kx4zsek4f85y5o510rpqpu57n56pqnrj0k1lmet9p5k1d4iwc0yojznf2eb3igz9nenqns50sttzbwpj6astf2o7rohcrip65d11rsjxlw3guospcrp6kki71v3pxbzn2yoj7d2cl01qlyecfi3fkxxcowg68qa0gtry7ta3ar0byj7stlel1zqvftz0aizcj10x366mbu3j62mhcb4jvr1w9b88l96rkn02bntks878b8k32eavlec7f0j7los9t50i8jr01cddrunvz4u534s5i54t8farsirkt6j6hhgfue8vfbr66nvuelxj1aet1zj90irc645rs0w4gqy5aeae5vjy2l42vj1f6bvosemeb99ggrmjwkchmurzrvjzvyzow8ijfh9vshcscroj38knnnvnh7pf3k31o1il114li1wj9w5kjrq9g3onjsj970cjf1x4lsmlpfc0dg6rqb1qe9sryuns4dxc01c4zx9241iuewcrxfeeuyif1ap38jkkrqm13maum4acqfjtw8tysv39qliypz6qgwn613d453o08vojb5ex1bxmo6uj2sedobbo8zmno9w2szo7f0peizk6xfer4mx3q02h26qhzgw1kd60qj49710dxdyxvoh2aitg4bvpq8h182i7kzrc14m8t6km48uykji9qhqbslhj0vy27mmntxz30935p97gzo0znjchsicfnwntat00655fqgzxhhrt4ad4u69l8h0mg7eex9c3o8jt6al3sl8bjdjxb',
                fileSchema: 'gcbfruyzmxizbhoryd1319pwehowkws96nszckz3rla9anfgq601o1ljucfl015t9tsxphb5iplw3rb2jyigs6qcvu2ip1ovbev9je472cc6i6mtc3e9z6gx4q8mlpcsqlv5bapbsnnh4f59uxj0stp4ndl5l5fenxw4k2li4hmuuv4ivaiizbdft836kt4k9niez6r6edxh85ie2xdaqdvhfmxqa5fht9nytiw6qxze7dhxqcask0m4kbibdye23yyd9vdk001p3ja8r1uvqt694ikjcura9tqz8l3qgmmp7oli00ga5kyq7n8ukbefv0czl6ya7ko1eisedeidw98pve64q4zvyzdqup86l5jv2dcn4cwu22pbrr1shudpnqytpgcmt5wkfpz4i3yhtrixsnwia28q6y6lkfnddu4t8fc97usl2uae40knk6ewon1oknx37ussdi2pgburc4j9pl8p7ju647nhndmy3oywf876e51fr5b6kikhkaaw3vhh6cknq99xsg2pe9m9qfdwbw3dd3xd8ug2akm4o6xryshzrzgax12n3q53oh3oubglqts3nvgrgxqa2n29bcygxojrrqzu2jof42labeam3ymjvdl59550dafobuxmhnpl6v8capafqv3gzivjc67zo0tsyy57m4ctbp8uint9vj5letvl665ztneljjqhs8b8af9o7oatsmwyarxxxkrkktdnxz95wyass9cfzwclvjjct3a7v45eevyfpslwz2qwngo4ltby5kgw5o1kvc05hcwmv4yped6rfsya3a2kip1dbt6v2hnti67i698sw96k4qmwwgkzstt19mz2egbcbj40xinj798w7ugpf1xpyb86f4hl0t8psfv8rrc55d3ai7h3i6kxwsi09zesdzmxruvw8xbadr7vj5whrkst2p97pb58m23qxg09jot9j7hz8g9eu1zf2t5xj32habaffk9dcaxs7mlynpepewg4qqltgpflk0y18j6i2dha',
                proxyHost: 'fgqfrejdjrcjewmce68z5r5ce6a5w543ui4uweuseyxxi5ezzrpv4p1xqxwy',
                proxyPort: 80293380246,
                destination: 'u2cj31wds98i3kmh4fjsx8qp2mtlo01b4v5bxflunh0qp9fes273grz2s27c2t4e939psgnv7tz7636ar1kmggciqpz22wcrtl334seyjrxav2ny6qq9p9v7g5ddc59csuy0lm55kb32esicgs80z74ycd6iklpm',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'p8fwqos3be6t64wvl8lytxnx46ixe274srbyhkdmh3dl1ywbtd9zt4fwaa89q8q2vezb6myp8u3m030rvqdnsfw6b9yf263w5ps0qn3l3139clxvqw92n1rlzy9g8g96ouy6bh0o7z852pa04oosu6mbg05cnpox',
                responsibleUserAccountName: '0rxb30eda2wru7s2w8vf',
                lastChangeUserAccount: 'tr2h5wno62139xvu3fv8',
                lastChangedAt: '2020-11-04 04:45:31',
                riInterfaceName: '476q0rh9ww7hy68xq2zk7m93uo7o18x3v7bblzfpqy3taggzwp0w8tjwnkyodlicygys7gl3gh7homikhcv8cdeykj5y44xr89tl2btl3oad1w5kbfvh0emsi3j8z64p3p17zk7buyed31gdlkldaqi2x2ca0j5s',
                riInterfaceNamespace: '8hnqncxc083xcc684ebtp1kgjhev075jmapursialhrmfnta6x52pkkz02vwsilc1om1gr6yiwxm0hw2bprbngtr9r90fi8ildhsh74mzk5vz0bk9xltfy0pqvwy0ysznv7obu4mk3w7k52drxkpei3rdyq8ng9r',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'peva2epbg5da153nhjqy52h9amcbfd21ltb57rjl',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'eom9d1se5hav2uvjszseyeb9n2rh26wh3i2vs8echm5wd6pe4v',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: '5yfvi43qih9vx4bz573k',
                party: 'gosrj097gmrb6j58nf01dsgosgeg32lcomfcndby5402naordwtdwjbqg6gfxt6oce1yjfqc8ks4cvmo8g6u6f237bfnb3gkn90swkjaxyba08pv90fvxgw71mep5nffqvx9psrmxx6z3mpoobkbgeu3vndodg00',
                component: '7qcqfw2a1rm5rydif2lvib8l2xf8f4edpbzgmg3cdnl6e5cs3c7u9inpati3rqchfsim843xz994r01v3689gt23fbdkyen6pgxsz9z9cijcbhpsd0i2ng0a81er3zdvbn904ox446sxty01wbf8olo8wkiwfd71',
                name: '7gqjk9s5hkjc4eml3b3h2t9w1lnxqgq2qq9t7r6nnh5pevnmzgoh0gtyts8tnoz1r19m0901j3mynz4sdf8z7rapqbbx6ijw8naqivpo7e3pn75jmcapq1ayd2hees93jzzktv3vlcowzqtk4apygwyixnsrdcq3',
                flowHash: 's9146v9k8aa1ax03ko3s0mrpj0lb9zsfqdl7b12i',
                flowParty: 'dxoi5krp0xn9uaz9gmazuca8trimj40j8lown765wf855e1dhtpudelod9wzauy1xr8z3en98fo3cjhkdhpggrkrybgo86ralf64htdgvknv3r9bb61pfeki0y7jfqo3dxsnbnxuri2tlrrqub4vb7gy8v4hl4dh',
                flowReceiverParty: 'avsixaz1thzsb3ug5swdbdbfv42qjn4tr69jb91c1czqaxyw2x7kb204tinnm9jhn45w4iqp3sl0kxepfda01zxxj6ta4nl9pfg416ae43qav3wb0d31d1ngbjio7h1ski9i3nfd353q0kqyo2vvgg5kamccul0r',
                flowComponent: '90o0evqzkgi1zs63x6u5n2r9pxylnjuqlf6r7tpb62o4e5yk8k8c93dvjx2r9i7lbpn1wx22ib5knfv50kp71thtixn10wt6dxtxpnktuchwd2tjx82mgdggjxue97hz7diqg4exum5dxyr0ud0s72yplnq9psos',
                flowReceiverComponent: 'k9omxc4sn30o2dk6zx4x68vlwa3mxlqj6q53mni95qjj0dlnmo1akal7pzq9feee0p0fc5iog96z3k2nd5k019mb7qph14yhns0zldqvhjai1hqf1kjpj2269st95yqn66emqdqwtd6xla4kngrmca19d198nsir',
                flowInterfaceName: 'cy0vkb8lviopeeovlowfkn52zr7p7f5msll9d4h9hfvdd9k6n2pq93zysab5tvfw40e29rakfgimjbbc9ce5w4n1sqlnlkycnwshmof4cetjvsfgkcilt2p2l1ufuhf079z48ds3qdlefwmttdfs0b5k8ae9rqdc',
                flowInterfaceNamespace: '9onnnc8zd0ithy83hbu4ysyrinyhxqr9gfnh3hg1byjqp7jeslut5g1plko8sq9765t7ebnlpwyn3jcwqxhl3b2m53h01c475i2cdcevqjh46zzdfgjpfenqhs7x3mqt4gmzpkjahvlpytivyfu83donfuxulpla',
                version: 'vylw7wrq6q8pgm1qo85f',
                adapterType: 'qhgeaheixqf5e6wkgiyq6uozz5zpf8agywpd6c303gyl1m5uatb8cy9ud9z2',
                direction: 'RECEIVER',
                transportProtocol: 'pjt90xjtjjlmfnz2dquoqsfpwj09nn4yzz6ds0193wsfqw7076l59ph21wxn',
                messageProtocol: 'hjojef7sns172cjdba4jxfq3fkzauc3jovy32lldhpblw1it6jc9z4jeiygt',
                adapterEngineName: '5ydt26jg1csvul2yr9snclghf5tpko7ojydxw8zcbzdyb5kkcla4ne531xotbl2cq2p99rs4b5ekvzem609rmd1er0cfrejdmy87i4ve83zhw21wgw0shcth407jqk1luv77luvyrzrazggrqms092u1eyuxjz5c',
                url: 'y39ni0ito3ons9qle0zkpzj7ifwgf5cntyn7spwfoy1rxsjv5g4ajn8d9h4kw30mcdq5qv2gn2zprapmmks09kszl2klke9xotpfunq6r8kmvdoslolv1y8ezrofvd0nnrofcp8pbo6jj23gv7h92rboycl6u18jbh01d7cl5hqk1tdk26xolae60g6b8d2p69r3a37d1hjfpag09fnuifddvwpj5ut8z9zolvo0179jv452dtw9zn53ku2ra0pcij87c6xbupqeni45j1fetlcqwayxi7voj9fuzmq12zvd8cii71d1gq84dfwphkd7',
                username: 'fuqpj2gjmbefhf227fsk9rxlpxa5gyucy3vlky3u4ai1wmscbfa4rk3bkn6q',
                remoteHost: '779vt8w1wqt1hoqe3mjfuc53vebuaq1j1r5h6k5sl1x22zzc38wtwi8qw5zzgmincpddka8k503efv95hvx2ilcd08e0l29niswqjnj1pziv1htxtsf3vvp5vsha47mzdcil3fdtrxxtr5eiyh40nkf7gt2ioeqm',
                remotePort: 2479241389,
                directory: 'r4jvxmnv7rh4kmovdnqb6jxz7nsw2v93lhntvuhh73h6i3pgu2zugnnlscv8theculcxlwpnhwv2niijyftegj9lmubf8udq5qioiau4o80gcuvj8ldlc58d274mn0ja836yn0fgdj5b9lxsj6en64z8u6mwdb2ujb9ab01dfc1lzykl8cvtqb2f6skajl9m5r0gnm492ujcap95gzo8rbrgqgkoc5sq5e69o9sacn6c8gazrg0dzbyaic6dtme9svs387wzsegp4wep4hhtk5129ro4xp2itrxvm314pi30kqo6i9crdjra3zq1v31nxxj7a1cfshlurvu02m6vk98oj2v8zlqzxy1ziytpkyq2x55zhufmu4yp2iy5n3c6ri8qj4itfw50ced0phddl4ggqwjuoq0pr92wcsf77silk8dgb67vs0sl6q1w70mqu1n2cbwz9elh8k1k3ltdkfauha8aym6302ycmlxjqp4ybf4v870h4e2zwzqoklj1ojs5s02kj6zpvaujcjzd4f5v3fm3pop3umd657hywnamqzei5492v4u1befmcuu39j4d268g2szmc953yt0i2ebet86uzaj76wbqy20pmhuiu8ltmwkfhg285njjlovwrpiuk0qmdqieesxr78jgcdge5ybbnwtj93wfjpteol6zqb3o6yvtxch8f8yj4u2d3myl3xqocb7f8joq7o53u2cj7kxgbcp2n6k76086v3yqb08cqfmlut9orvvao6hcp5f09js45rr7s1ymld1ecwawdpedqo4t7pkb4uk2fizm389bc2atxbw5ndc46c35fauyk3kg5m6ztr6hpis6oeheir89h8svos0hevs41o0t7lqxoffazkdqbq9h5nulzq93xjyfrzhvdmxwhm1r00uk3uwj5yzn6r8006elb0pmgjmms4sykmmyekp68fig54e9vn9g44eyjdcsyjlyjouktz5e229avh6qx16gknlkt9gpw26tqnrm129npg2q',
                fileSchema: 'nicbpqmgzgf895sw9mt7rogfa5ls11utpgnrqqpc8f6a9ldu7snbvoyzk16o03e8j5p2jglqajcbr6ybg83xymmv47zvjvgjwdyba7qrk2pdvx6zv705pdxde7l35tsof4poacru4md450ivkiphjfq6lyjo0lb8tus3kfnjwqp3nk19d5vge65w5eekhn1uciwozh01b80kucpdhtjjn1t6exz7fwa8epy5c04hnrfxd7dtp0yv704lwv40u9kswp46wcb6ec816qzvd30ix0v7xtunvhqx8a2795yc2f6r9oqi4ey72bsz1d6bfs5bp03nueltxzdkm2l05s7ejk9hubsw9hte9xumdam6p8p1eb0f4o550bo374zp17x6zzgp29n9kssntp94tawnhmzky6cjlok9pss1zcmu2j7z5af45yvh8iyzedww9ndhrnjsng13y9xmpffx4mg1z336vzj7re4ubfwaodw6bm5p7gtes55qtg05jv15ohghji8gc727r610peutwdbgjfcpqovx2v0hpn2v882no3f6peo9nhw0xcjb248jq9bl7dczztb1aukphk7sw9mlqes11kofchniab1cuueeqjw8mgxf7dl7vyc9qun9s1ejr97zsa1z8kc9curcxygevu375tk0rgjc7ocr4icx6eiwiw66r299tnqbo244eel08dlr9rni5a2t05c26edm517tifqzlzikfzf58qq04ulc5k89e8p3xff24r31rldk3jn0zq493wsh7fwfnw1vfn5fqt574reomhitar2uiqr8pgeixf6hevxojdfd5008r4k86j6q0uxr0vd43bhqnye50jclbserazglabv9127t7fxlhm5sch2gl3gsv02ktju0h0v4mmxlgizqd7a4u4h63iv9z2djxsbxxdr5d8ev9eg33as4r7qt9q9bicbtjisbgj1zm09xgzihmwx655js65ub123cz3a1td7p84xa1eax85yyn1bqu6oz1qv5',
                proxyHost: 'eu651mc9xjkx5d3kvon4h4isxhyi8v30igkczoaeq5okrybs99z6faypi7ku',
                proxyPort: 2502089950,
                destination: '7vcntfgwivxlxgd6uw8z7gd59xydrfhcutk3pmwwxv3fmqkxxucwyy2gqf7t62mctqma1vlv6sp0k4xifqht21e0gmpuj8flprcmt6j3qccw8zceyd3zb73yk6slq743346mmuoxopwg3awa74rlzou6ifr7xgwnk',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ocf37d5nyre7ziq16tmlhsc19ewqnzxa6au7s4l56wzjgebyecmusievdd5vtixgdunfhx5tkfeuokmcyqjiwe7szrkkox21caxdzvewz4ngs54ghz3t86jzc1lqholp921xzpjni7yiwkxewfeg6dbt4dk5litn',
                responsibleUserAccountName: 'thjy0usmh2npop98umqm',
                lastChangeUserAccount: '1lvxs2r2oua000mzerou',
                lastChangedAt: '2020-11-04 03:18:39',
                riInterfaceName: 'z8ecc4ea4itdag255t3b771tc6stut4ollidzm0h9fxp1ioer8y3g5ictuat7ideblcptr49zlbpuu3ngcbnawfgvg6l1r6rkt0dpbs65awrcp7lp2bvi808bdgp9hvlwi34p9jswcvrc33fggmzv9iofjutfeje',
                riInterfaceNamespace: 'w85n7rxr0a4f0qz5b50m9p53t57bbjo4fe5slda663a6j8fbhjzl9j4xk4col7ntoxamahm0ju37t5ad4wx5lh5e28mxejmyr2cheyytqu0smm1h3r2rli34oqizmry2hvs7cdj25loxc7mtu5sjyz2y77osp7vw',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'jxo57dprvvzh8f4ivb1hycvwm5il4mx6ivucyge0',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: '3pltu4tn8hi02zfk62rnsyw2m222fjpphbi7sdab5qn3s8o0a1',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'xsvfawov16c7e9ct9sw7',
                party: 'jnygg59njhyp894gdrb96bk6p3qxoc4g0uak4xsi1vbnswi50t0mcacuo3omch6qqk4htqtuowt7a7uakmeqff81iw7m7ztnxpe999uqs8yo34fti0i10yxp6vfw8y7qdu974z7mqoyltkhqtn6fmf32i0sbwrsf',
                component: 'g5uci264btdbu19247eh3o8tss420uilhlc0bcuak54v9vao156i6y0det7ljue26f5akz6umoj4lvjmdbti90fxwrl1hysvqdc9sii9b7b6yzkn00h4b2m2xsfhv0ibd1xvdm27fp05ki4ee2x9cl9zr5pfpcs9',
                name: 'yb3kt45983tfyfe4bayabp96aiwyq0dnugrsoubcrkpxprkbee0z8udggvlrsfbsy4bdj8rdti094gm066aaw8s2n6c5cs8q2p5qmhm6ymp297mhbmyrnht60sc22k8ezx9a5b27to4y381kc3hgqwr1j27m7omu',
                flowHash: 'kv2n63xa9ng4tq6l5rgkqcre4zpsxiolie1fvc3k',
                flowParty: 'eq0zadkizd7mztphkwuxwciemolt7mbrljvucjxvkrw1pcgpke55tbwypewtqadyoghj4idmumr76z20mhnxv837nykhfkl71obfmdqkmp2r6yonv4bhi1nza4zx7uqfxzpfk1je07bud9a6font37ym3j47ojnf',
                flowReceiverParty: 'mtw3tz9ja7duc5mvyhn3y09sswkqy9dngxy4o7636oqvzyoco57we5la3cil8ffhtgwtg158nb37zlkhu8rv0238j0py4i0tyhfwg61rqzdimhjezdxdqqogbena8eh7tpmcpjog6ipo6qf5p8w79n23t0emo5og',
                flowComponent: '5ptxakjlmjhlpt52j91mkei4auvsrprvde5ccklhk0ji9b372nyvn1pb19mj2txm1ut6243bxky4t7xku63wr3iv7vaof7o3g5z5fkgi6mk7hlqr5ueuyp28457rma7jr692x8ju4ty6ju2qu18id6h3q8attrlo',
                flowReceiverComponent: 'kyy0mvvvoqfuihbb1mjr8xvz29yi3vjqbm5we1quva8y1729m71eh3ijfdbaqqdcrx00kli2kxcl5n9dqlklwzo80fv2u44lzt20pruy61r3cexkzf0vd3vxnfb02jy21s99t4ojdzjebe92c8mwdctzlrc9ir97',
                flowInterfaceName: 'cr2271cwp3b4inbmmn2n1kg44nuo2qvuhq59gk875g1mnb1riauoc05vd12nu6yxoul3impz8vsvxq4exq1eaeid75rt2i8yvh4dksph8mi08qsrkh3bo887nrtj64xvm30nt7su9ahsfps5wfj8dmck4p5sb2ns',
                flowInterfaceNamespace: '9w8hk0vluznozu9x5t8bf2vlchz5emj2xp76r6vqz4xf5ilk8ns9cscujqhfzj7u7o25u1mw8iv5bps9vcwecoewdz0ny29bvk8c5vk1739627t4rfbe3wkxzukkyldm94plg6uy4ws15qdtp70m7v8bz9oo2lya',
                version: 'tze0jb6wmm8rdzs61t52',
                adapterType: 'mruqgn5ytz66ltg531b1n8s0p3vf18b1lhhlaspll42fb4sssfhcjol8nl75',
                direction: 'SENDER',
                transportProtocol: 'drvb35lytjuqp1b217stz13g42yc2ys9r4wfd6hyyhkv480ye8rbrjrsx7pr',
                messageProtocol: 'tw63kbglnpsg81ycvjmqx1syf15m0lz9n23pzfgznyijz2mt0egr4mzqf4kk',
                adapterEngineName: 'g1nrmjf0mzkw08hwswjcet3wk4fnne8dvtsa1pwxrox805379e2efira7n63xs44it7q969cea65syz0m6pw2g0dd4b3hv97p5hno28ygtbaza94hq6qlnbb9xbp496j4hwqguon82h1fw951iyhnk5x8x1x6aie',
                url: 'v48zif0hnx7eayryh7evop2kp9wxjklmnjykikk8h5gl9ow82r82s2dhc96i3palmeiyf0vivbpigjy4biesd9yqgbcdj6a6xbocrlap0jangs9shw56hgu2fpy6oth8poeq6z3zb4mo61h5f6vbbglwcx366sqbehneanf4mc7ncnqiph399bhbo8vsnlep73nuxs06urgrbhru07fr344uso207pl379aaoqnzwu808veig0c0aaw6m8em1udtjjj4ab254qzg6k05pzh8n74mr3ydii8p6nq0w41ksuk3si4vd6cx5wdmnjgq02i8',
                username: 'wzj26mat6u7v28h2h4z9b6xha1j7z0hk3qjpaxql625lhwp51xuz6jjjnsva',
                remoteHost: 'a9ikkr5sh20yvwvl7kd67llnzxgppcfnt7djatawm5b5hz9pjp4cvndw1d1vjt6qii456o7pnqr110cl33dis3lcfj09y4hbwaitv4tl8c5p2npuuchsukzb28tf693574upx7fp5o4a9w4u09yfn83f9xnoo19j',
                remotePort: 4308090926,
                directory: 'r0a9favhyf1ih92zw6kp52cy5x52l4unonx079c2l6s1essno5aycbjbxx8e6b6dsd8bpcgje8po1jyen66ligidkyxrrve3532plkxiuialg3qyn2gnw2uvf4p6ovl9lpg98xzw8ovvo2673g7e33x4vlbq57ovllr2mvu1t4edb2vaqqm8a0ou7dgrxilnlzg8jbhc0ijibzzsavqa1dun4rjbpmxzocb3hqkzas50vbg652x0at0hznikwk74nbx6hyv6f7d1c3ov9lr3gxb79xy9974g40oq21sv65fyhfaon9n4scojfglibmpf6fv47atjsoahqp1qi2l87caehx9sulmtv5d1jrbe53aj18cvugupec0ug8j3kn3dvjr6pluzx3himxzvifblanl7w425mxym6o8jonfk5lsqgt0vs51jaz3gp8765ahcr4pb1wgdl44nmumr16gotcigtc8o4lsgeeum98alyjflbyhdmsmvz1nv6zfkboebscqnj8vype0681h4hl3jfvd2thn0ectfiumd3ixhvf9m0g0iirdtglk42lkzikrd623iepqdws3kfn7mazhf4bwcxv8yudejo9wu20rkjzwczyy9fc5gvvb7wmpgvri08asihnyr1zb1j5ohgl2ivoe1pt340u56qfidwb61fmrs03fvju4uwzvgi7l0vufteqivf8xz1o72i5t9r55by1jnytxutzg23zlj17egc23ugxddhhyi49f7vmy1urm0nx1lcjjq4t6gm8556b5isqox91x85q4okhy7stsqk1o28xzpusa5jyd1f7dr7akn2obe4f3mnialqh7l2niq16cild33l3ow9stbx0985k2hbmz8g25bhuojb9c8nk9hrbfji906w7hdvkutg1xipxiw3j7z6ze7py8243p33014f8sgvpy2wbx0ys2ag61ogyata93ic85k8iuw87ilsocpzkounxbwpbmg3otgn49gvyw5zoyicppr00yoyasb',
                fileSchema: 'jdr15sgh5xl43hv5n2rwiisjlryxd6oz13ui4nsoo9w6bwaf3w7ysgh2tvlmlqfrx4zrl7b6hwr0h8uceu8sgetrid6y5xxsl3kzbc7z4f569tdm0og9wxk8gffpkihs1h9tsuyurj4c2lxoe3g2ugsgfc5hyxvb55xvel9t799d36zlw02gab4nwukmo7ofmdy40ec56ki43xrg4id2ooi0ighcci7skfhq9cps6dcj24ru60gw1tyv167n1cpt0guba4z0zvsh8focp0k0m97h9hnzea8402z2lix2ttetff707r8e0h8ikaob2zbqo4yvmcgwnta42dre95uqfyw7i0m72ekbb8jqsjexqjq7yaxflr488hqktt7vzj76alk4gb52go8gzbje4y57fb6s9pyqrdze8tldefvoo1ura1xag3p8b9rjhqjwjjferuaydpeu0c0he11b6giz2rxvna02y2ud2k5mkgoao67av1el7kv2h22wq1y5r6m5yeh9fipcj0zdotz6gldzt04i4zgpheunp3fa0dgwa43c4x7p0u4uwyyc9i3udyjtpxszmcf844bl3l38c3eu3ps5v6j4ufbpadlniqszfb3e4ystg5p4imldvz7eudq6izx1v5tc8btqnn2vfu4xikdvd73mfcu9wb0kbkqum4pe7q4thwd34dgj95iyymgoww64y4l2g48ggyb6rbwcxgb9cvqg15qlo44lfdbwbliw81g4frp12mi2ajvpcmqhw5gae27baql5igogc9tzv398tys6qyfu9d3sdf8jfwjvnw31d9n2yn0i49j0ykwzk0lh7in5p02gwwn4zmore8ytr5hfcgsnxmsnicalw6odh9vo6scyz6g7s8nc31a5fe0w8n53s3dktxn758kenrzq1zgr5newe5j3ljpp09yhxhuyylmcr5aiel3tfa7o2dwnhl4omv9ervj8y71v0jigy28vcphertsw41j9hf0xk1w5ysgva52579j3thej',
                proxyHost: 'r5pnbkivrj24flaqzwput4a30668g2iptewockeuu4ewqw6cgbze3g54pyl7',
                proxyPort: 8334322257,
                destination: 'jfwnoijisuzj84jhtml7abhhueyvwc5o13e1bzd8htnh8f6t44g475wcyeh5qdeg0k2yxqlryqujl6vedux4z8nlmc1m8546cmp6qogwts5q8yq4tmybocl1j75altsfzunjut34tqc8dl6mmcidk06hlqgsdq5q',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '49pxtw9maedjfw4ukkktr3te2lbu6gcvo4ot1x6u1je7azvppkkjgj23bhgedebe7y4s37r4t71a4w9b125y6e8w30kcuhmdq47eqkwmc1m5r0t54bj8jgj1iooqui79ho653xpeu12bma1cctlle83a7zij7pq9d',
                responsibleUserAccountName: '2b4816uj3goia56aw8tq',
                lastChangeUserAccount: '91ghitqe3e9b0hvztvqi',
                lastChangedAt: '2020-11-04 13:03:35',
                riInterfaceName: 'c0kylgfq8b1sbs5yrnvnxnownjhww4839nhlr46bxdmv1sclttyfnhf8t4sfb5nqzrsp8q1ro6p48cpbgpgk4e0az4460evx1jb0e6ny86cgqgikfbp1o4p1qdpfmvkoq7suw7irriu0ypmjz1snaczk1fi5ot8e',
                riInterfaceNamespace: 'muzgh6pqehh5k6jxtgeq32aqmv8vzupg9y279jo7jhwdj734a3salc3ifrwrv5y3qc5qzkpddwn4f9izg4cudzjnsx91ijaythnlo9k9jq8b7eb7peywdl5c6hlt1h51x9glrsvyp8nm0oojuknkax4x2wnhdc6n',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'm04pm2ikssdxgviazu3za7mma0gxz8slzk40ira0',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: '7gr14gvlgkk4haa8x150d2rdd3fcma95mqjlwbqnd7eti6doqa',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'o21nib8qjkrmq7npxm56',
                party: '986fq3f4jy5jsvbq950vi8nfzjnuu0w3qoa01ju953q9fqvry4rondw3ujnh6t6hk9kyql6jo665kmyympu9zcbistco17d3hoswbz1qwibe656anw8v692f6cio2ncia29i2yo52r2fqw3zypsr7v02x2clztf4',
                component: '4ws8vd2h4xv0gkna1zdimjwhecdaf11no10pdglv8vhc9qz521feqj4nrm3h5n8qx66onkxbf3vgiijxbefsqfctzgj38ybpsdhsnm3j04tjhjf3peq6r053zdhibyr7n1lxsjelu0jw8qdoa74eilt9sx4swx7q',
                name: 'o1xgxv663bgtek5xmlrr0piqlywwab4rtcdf7plc33nlr4ovlk9wmb2w3g3snwc6vcq6l3ptafvts65iuv5ppi74d70m555bldjzpbb7hzlkc61ezlk87f2kbpxrpopvsy6on3pmg46mir6sb2keepqynlqx0vmw',
                flowHash: 'uutftqzf56b6a1y5u0qq8pl0yl25i94ndxxzbd5n',
                flowParty: 'kvj8z3mxrjtvo3qarxwiyysckb85sju2rtfnn8av0vrij6t7ax7oe68ipmcrb02bew38ha2gynczxyg0npk7k8m1d4gdlzhzf2f4lvv3i3iv2nagsh2crjbndiaw1qvtekdmk1m3ciziydjpe9sfab7ft30esnhw',
                flowReceiverParty: 'fjy654du1mbn7ql0z4lwr0ofoeinkwb049jzst75khcp2did8olrbchb4d5cizfbfdqoq9nb5bygoy6yvuzzqau97bhi9hv4ka843tcknmp8sximvrgn35elx97wz0e6srss6d0clexb7gvub8vk96gx8hrjzofp',
                flowComponent: 'gftze3ybtcyvz2ntimpda5kesj08twb2gfbzr5xzbj2mneecyww7lpu3ug7limmkw2z1w27mapz6g3lenw74m85dvcv3bnke4ws93tajhzyb9lrhhhhgnrwugpp3dlcf6r16r1wifv3hk83khhlzx18jd3211r69',
                flowReceiverComponent: 'jou32uvon4qk0x3x9ffwsa5jzasmnkyboaiy8893m0jff5o4etxxyvbmy7hjltfleiao6m2ouy2m1ft779jj5jlpk4j87o6s2far0brdf8nwesekncpkujvk85fmnyy46j05gg38t28n1dluvl9jif6fonrpcc45',
                flowInterfaceName: 'o0m45lcdh9ceddp0fouetds0y2glpeb4qp5wbkqg2np39czcde5rrt2r1l7iug6rxe4y637cnovpgvojo3ro7oazdraouwknt00d75q7m35mwdqnfycsdj4hujy4pslkqdgwvmw8i7855j1r7brhv9ttp2dfbmyb',
                flowInterfaceNamespace: 'vuo03gxbjd51cl0zwngk61cayi0zho9iz1x6w78009ov2j51a7cdq5dwpaslrrfg8d3aw2up1v776yx682gr639mq9g5ntl4s49rzbrpt42vhs956zznqe5g3rxkedhxqf32hfcusnk7v1hlfyok8iq8g8ozz77w',
                version: '4o2l4n6hh69ln97ke3fk',
                adapterType: 'yg25ah3x03zl4ljcyw9h4jl6i69193cg6drwq3nz56sh7rv5dlobyewi68os',
                direction: 'RECEIVER',
                transportProtocol: 'y0sa3dje78pf1egh1ewmmxt1no2w59e5h3orlmr0d82xpdfsk9wuhuycdhwb',
                messageProtocol: 'lvmpt0y3dt11qujui8e185ctecbugjkqswtg2fauloxf3hy3r987v6fsbq4f',
                adapterEngineName: 'aqzx1bzxqy42o5luyapxo8c61v80fco8xjxtk95y0vb8dj0nxr3f0wamsabm448exkx8qzi3usn9bfs6aa5q0ed62p9a8jzx6alcnsyknss2psi7sbhmtbdmqewf5xkjbtr7lrorm1olsmoifftbu36opt1aqyqe',
                url: 'cn3nbvr4nts0f8disg2icaojnxo9ujxauqge1pbskw0xb2c37oipr4aocytx4ydyjxf2nxq8ym7dwgyzw99kksa7klg0xxl7yv1ip2r1fkjm6bexkti1e8ka3q65lfrppyxi8wrupycaj9efwmorqnbbtt8i7pj352x5q0fxrkx0w3dbvxjishzn9ke3m2kkrju5fj2gbubzlp3x0q5nw9mqwyojeg25z8254zx1kw8iuspt65yoi1hp7vx97ni9tuboguwefkab27bq2dw1oyjlvzrdy12nxrvdvs5edriefcoj2oteh6y1k4ivlwh8',
                username: 'xi5zy2t0p673fmt5mto89k8282ijwx29wp5rspuql6xocvi7e9ialj9zoopq',
                remoteHost: '0fqfizwn4bv3hdn0n59k6fenb9kkwypjtsjlwrjfvemj7xw8lri6yc0bzzuwyags3wtgy4gilkggortv341qj6gzmvp15mtprohqm7he07alnw1x2fjhn4q4o9nz0227apemjqed3gm792skhd2kmmxrw1r2vn7p',
                remotePort: 8525269248,
                directory: '59mixiwynj8vakkavlpily2el0b2dsqm15oytco9avssjxz8tq45ae3qy00hq92baqz99p62ulpoj1w1f440bdk66jiddrjsr2ob33azoy1qccw7gjqnew4yf8xt0xyry1mmwo12kej92b2xvuvs2akaq21y0ulymcav7jmi8rq8smsp446cuyqdmvwzocm1kp5c8wd07edfwpwespfbp05wlomw6vwxehsqcfvf9ycm53kv9gy38kq9qiuz56fkk6adzvnqer6ohksay9g7rbo93sc12hbn5o3u7ucc5s3vtui8s0al2ypv6mc736ygk6fhjlljtu4njpoo5qxy7mebcnz6hygqwec6kzqop4vi1tn6m39jpa73a40b8xd8ck8dxrr8rgewevnn2ynpx8nvyqk7gzkv08jlbezawha52ldmg3mbtfu7gsl5oau9p329kyjdd0dr2uk72akoam4vgc9qq8amzfpvungmmr8u1hkhurblmvewzaq030eoc7ro2voz56aia825hae122z3vejyiuz7gfscjq3txpnmch2c3ha7qqs91mcter5kbt8wjiwpyz7ow9rpsfrh61wm62wln0t2mhrnysi91md7mws2wjocejbl0n6mz3qz1fxdn3p0l5frgkfgwcd2dcds0t8akalwmjgzqy2gdxjoqcli3d602ohvoyyh10djtg6ag0wu15vdl8qqkmpz814153dv1po19lgoqhx39k0zuvplmyq40ap3759zpltn2f5ketj314pd34xt8yzpitx7v705sopzz051crcq2xdbcomguoxm9xudcnnktpvc24pteznwaylilgiiycgbr1jv50wvs79f72jcgxoyn0r71o4diyeg2wh0j87rgvujrcle7vqtdi74sv8whcv7btlocnh63rd00aaeaeemcbnht8ycfeqlkcsqmnb7rwuitxunpvsa3k1tbzyp2vog6ou791fw9896y0dfx0v26njhctueuqsty2t6taopqs28',
                fileSchema: 'rp9ef3ezkm5a7g76qmfgjfvf2kyc2cecza4dmialqpdpswfjz9rp4ud4xehrwc2bq65gf7xsfxq9x9ixoxe9pouzjbvqnxyvv9k8znrtk64ednx2vw2c1me7ui5tvlhh19gn27rfscz90l6vfingffpb4twvpjtlcfmiroabjtltpkw1mawml06gir6t4zg3n1h9vex65xg88lyzce84jj3vmaf2yuboo0cd20bo821quycdj5b0pnnfmmd3xin4stnztgjwp2xpq7o1mek2j0rwtdzsyp25po7hsksp8w0q499r4rxksxx497j3xjorbperyjnn8h1k6lnkamx3rpogtyr0y70i54uk30me1b7sxs0ggk9rv3y22y0ttsjrgxxctbza5cn941tauthgssu2q4qy8mrtle1r23rmeilxlrq71wrkeh1nqo8mwydgm85yrjksl60xhw1nr8kvqxsh122vz3tavzn1cq3o2grb4r8rm5jzgqv74r2v9rwc2lo9sm7c2xuiqrdb10toaq9asd9tvhijz7kh49l9w8c32wt0uf0x4j87mrcfyak3rsba9jmiqs7a0kqaf9e7p3d7ig8uaiggxa5f1g5urc5j7idwghqlkkev0heg2bahxjhjhjs9ac1an67tkdvkxlh5hnc29865scl54ufrh5dh78jliorqsqv5b1n85tohkfj3fdq775s4d7sag0stnzqs4evql9pjahb2l1bx8tsfcdm8hiqxrxp4lp9xrg2d361sk9lbscbcdh971hjnhjvahu95s9gpuqan8eiakt4b1lgxjtgcc2wd8fwcsd7irliofpp38gncnbgpl962si581wskbvxqz0n3au2bh0sxp1vka19dodby9ux1dweg0o88jy1a3wuo6kgxpsqjj33en2fgk84j1m97sav4lehek0mddo0d68j86lyo0idx6f2z0coc09puf2n1jcuwlvnny2z6v0a2muksjdic9yblqdurli0dgjn8rr22p5fb',
                proxyHost: 'vjwew2t3ugnlmgvjva96y7p3voe4a7k6i588x3yvvbhx406r26xucq0yycqb',
                proxyPort: 1698150686,
                destination: 'grufzyyd6prbj2om3ac9nhen44ehsl1gvyoq4mu0615jp5ov1fkc4x93sh243p3p0cq6ws1z9wh899ic3py66qfzps12iqc6vm6a20xdmw4glwui2wbkqisovixvawzbc5b5yk4n61rxix33ic477jt5gici6ohn',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'mj5c0ykphy9c44roazhuwcs36k6v3oig0lutvve885b3xiavfhcgaf8c1fn071bttoiym0jdx84hd9e67z4euwu5oo43a0a82i1vyiu19aovkcdslxkze78jchtt3cypda9prkbnj2jjrh7kw8z82h10gssz648m',
                responsibleUserAccountName: 'unwk23lgkk3mtj034xadc',
                lastChangeUserAccount: 'xa1wz46em9xqseq6q429',
                lastChangedAt: '2020-11-04 10:17:17',
                riInterfaceName: 'nt91706lpiglcp36kkld8ucdh5htv4t3kmcijv7zs2wmeroe4yjmbn0a6v31ecs0ea4tezci8xi7y5sya3h70azcqpv1r84j41k6xha4doeipljv6b5b9xz1tuoun8tgnp7p8kqap58e799i1v8opmlvuz363f1p',
                riInterfaceNamespace: '58qcuawls3ptdp35vt50jn5mwz1sox2hv5dcn1av3k5ewtqz5h5dxpkjpbhhkmcasw9u689t6k92g27z3eyk0y32y0mhwxnqnc55gmtnu4z0tuz40lpkzno2ebt7a0a560jf9b3hn935ne69383izkczjoa8kupm',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'c6wk3u0i7q76nlyjm4n9j1zbjdqydi66i75lnytf',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'tl4idl12k5vxq2ogr2hhghcurr7gtctxyv51e1meabpg4af2yk',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'q0xg87rizpteen6zupr4',
                party: '61yft076qeri1w13i5eegi5h3a9q0q4mq3x8oquxsowjt14vrep37d4an3r1b8wa2e9ydmqwmuk01csy2ewv77iwjqyoxfzp643099rhmyj0if814lr3krcfc3t1x2i5bhhi1xvm4lcshg0tgy8oqt32y3ba8c94',
                component: 'st0lady3gievaxgoahzb6hftuv553abhzy35ovl9q9ixb8tefub0u572igz5g59nzwvzao4b9f9jjl7o5889v6qjyr7n5n69jenk0dgvbnogyhke6vc87wjugulngytzs0m86gdf3fogvt4hzcnjtrzco88zkdmn',
                name: 'do728bvw4n3scrdv4dd8tbm4hmb3wot22dpdoilj252lcjiz140w7o1w3nn1lr89f08tio1hgsxjkqi03h6wkbr060eos1icfd4wrwm5xuyot5vc6e41ys0ne0ia96gmx06pdt2fa8kunr1htin0vzcowzc9ss80',
                flowHash: '3kcienc8ojfkpb7t9ro9yi7dbpljf01atrb32b6z',
                flowParty: '2aut94y2w69yvkg3h5muh6ftjbegkqh0nfz5thyx7d875zw69e389vpyz8z5q9tl8qkfoxnxpw4xk7aktnh6laych55nc218pft8kroljtrin4bg5krukebqnse1fywqvn1dd9491uctscjgwiik6glsz19ztvki',
                flowReceiverParty: '00nrpqh8wkumfpr9cd2qarvlpxktv72jq532vrkkfxjrl9sl3ohugy2jqbi2eehyne41h547c3o6ski8hqckbgwwiezlp2te32mjhe0fozsshz56t1gun4frigovjbx6un8son7xfip9vublucsa4fnrrh42iwl9',
                flowComponent: 'qi0vp41ajyhxhmpwjqvmbt7qly3kyh44a9b6qr7ttlewakvxa4c1fxzhkhemwrketz7rs7uth69036mkjpl7ekzjgedswgn53madreea1xzoqgzpbf3vrqkau7los1cabdaxdtdm61y001suxdk6ed33cz948cxs',
                flowReceiverComponent: 'l1fou5h5xh17qjxe5q99sgj7t4ayhvy1k0pogb5i5md7k8zhgdpp81kqmgewmt13zdt4viivtcx3g0tongpsaa3b1bda9jh226s5csjcwsyhijotm1avq0eytsri7akmnsbxkcu4m33waaprxj5zz2ikvbfclp7m',
                flowInterfaceName: 'kzm1b25y7ekr1lrgdayz4j5lfpprvpw0h7edhib2tlx0lgvwll6ixkjr3tlbiw41xi4mi8f2fpzr0tbmsgv2s7pxayqhohcz9ettlshsi1ylrwb2ram5a78pob795lyjy6uawnaum5cv0xk0todye8rrfguojvcf',
                flowInterfaceNamespace: 'm247pes92jnj7hrkbbzd4u1iig5f5nq0v7t6gyek2xeai38o4uleh2cqty9lmxx914mki7oxc02s4a960ouvuud7ipr5q8ksy4ys7tx027ukbwryks2441hmqr3xznqtdyn39uaef7y70kt4jz2v6nlw7j8faybx',
                version: '9r57k4is7f73n441ucvl',
                adapterType: '4cua9omqtwjngpyqlspi6fdmyadkcmsrjq6e64pk4v6ze2ate3amm0hhx3j9',
                direction: 'SENDER',
                transportProtocol: 'vu7u3azu5csiyq213zr0tz1q4j20p8ifk5nto2bx868q31t9a18z5mvae001',
                messageProtocol: 'f83s1fthsh0ys6n4i2vs0nvt9uzwfj1uhhrywd1as8s0pdrfkv5jqhal6hmm',
                adapterEngineName: 'u4i6acdvjukcr5f546r4mpoy70efd6xiut43ts8roxl07fnytxbr71iprabwl2o3264gdc1xmm2m3gckj3wd1js2upt3269aw1ffsx073ihynvide9benzwe6en4gyjxroey2my34bt5qm0ug7gx7svl4e3lnvs4',
                url: '16bwp9sdcfrqdk0qi78f9j7m92t8xn7d2v8l0bx6gz342gn772ery4ikgbvecqisih8m4ag4i2su7b1695251ihfr9fau3fnubswpbny3h11u5nmoxrydciapk7hincjs8aranpuset21hx4o1lfs85gwk50rhuvbg92qsfio9bxlv1svxk79j9fmorjor0ipv2fwys1zgrjwwt722rebcays7767rflws2gqa56d5of1r8vpgwduhue0jcot00zxftr0q11fcxxt3jrz6psh4j49s0kgyxmvddbu2ib157ap2zopm4322zd0jxynhwj',
                username: 'oe2qf8klp6z0fk8if68rkniin82yceeo8nf00lp1am0q36vrtlmb7b2juiza',
                remoteHost: 'c7kb9zi00n03u5bidh3kfolfkby65fffzr7yry79kyapogzh9kfkktu3p5gi4mxoik5pjv1ogtfslf98gg2vxdcltyg547bxkvamqk1rthgngdvf2e50yllxtm33nlamgs2dqj5enolecckazuhvtn3o4btk0lio',
                remotePort: 7306031083,
                directory: 'x8bb5si4ewrrs4lcu81cxffvaf9lmaq6hh51zwshs7c3k35g1ioqxm323p4vmxt68jj2lno0ecw4gbj8na11n89vs2kqrw8i23gea3q2mm1daab0hu3knzdu4zz6duavvz2srb9ca6fk4m83cvlc79lcbhxniqek3r2jn85dlk6p9kkdw5sq7xp195p8pn2aai98bhumqa13l7wy9ahw5ftki7fnd77ntkwqeq506xh3pm3vdbeox5skgvod62xd5tszqjpe746d15yf3quul5phk48fvlcncw365o3c98x7kqqw0v0tg6hfb6kcbng6pi9lpnuyazu0eoihx45wg0oytdwbxbsom3nkby286jkmxstc911hyxc2derfiwpl55345wc3aq448kkbnmcf6z6k1cl6u244pxkxojeagx25ula90trrdsge7g3cavpsul5vgjcvnyazdq83m2bwatlu8kzsca7y53igrcmx0r6xmw14cmy0tv0f3fivpdvb2w0a3u28t4hostv937egd0be6j1zikz7wytmj0wyqztwr2cbnbd88ythnx7tgp71e196kpem4ue4g0iu6j85vww5svgydphupaw4kk546blxakmanml5bwvaj021xslb32u3pngbhfnfi2cx7x293gce11f9profs7pia48k8wonijlsgzwpzjatz5i5bbn80ut5b28meu0x08yzac7wy6rxqveyb8k4yn0dqff0lke5invnrsyzdjymvalrj3f6p7t8eep6vjr0mz1npim0pz43s0vzmo6wncksb2gk7xhqc7rxsyij0ktj960y5eipm24lk12g66ofro9lf1e12tmg5oo8oqqpr1d1g9ri5fqhizeknxiofc12ylob2g9hqlm2ahy9m0sj2rncd8qu4uxkzh4avrr3qophvlciz39vyq7yakg53yig9emigjeajd93s2fo2vus3utrv8he2wfenckrb3onhbhajmu2ekdakz7p1bpeg96stkxa0zoo',
                fileSchema: 'e331o2y2usvn1xeotekzodcnoh0sr8whgyv7b3pbrye5l3b358x95nhhsmtckcwlt49dr143v3sv25zsrp2wugt9ce42zg8n6xbbneteb6e7h0iwdzfz2u6ah8oz8zctf3kl30mejh3pw9o86nyt47lon2uznh6ab4rp05woqk8ofa2zt5gnr6n1lw5g4dkqtuj2ofilbit2y9r1hv3ka6rxvcm5fd893ix6sgy7u9iidn6r7pmf3rwr057prjyk6oat427j8qnyln1zzy529347oh0lywr0b0uz2ngleckjqz8g8cuoo87xj7dvcdz7f93gmrywefqiojjpgnmhomwed0xqjjfi6jkjkxufef9lgyesow31oymd51zkx2wrpcmwaakwylybdsmf40ch8du518xk3aakjeci43q4z46plply5crlfii16hdxl2r7dmrbzw8g5f7dfj4p7w3eh69t4wd10hk8vt5xjgchyemv9tr0edvp7lip4szzk79rido8efstvhmuw13b2cittjckka7nddndmnq2fixeu1qq1dckll5zrx1y3uf7j9zpbig8358j89tuf0bofzmdidd8hq5fozjoiswpn6kgfofryonj9llnbzxm7095tnfh2p13fmpvjdj0khh15qzwbyh6j94sd4zcvy2mvyk379qqlylrcwnut4e85th0msav9g55d3x0b2lcf87hpqpaubgvb3bvlo6r7ao4apm1l4uphsyfsejes6ko0s7huyatqv64us3zanwmyy6usbr71s45f3xw7r8djqecnao3w1zkhbq1joeqe0m25fi15bx5b6r3uvuh1ttuarxbk3m530iqs7xdwsd1pggrtflnb7qcrli7fzae0evvnukzijak5imb7hdwhpwkw1vajv9oj99f4o6qtkgz94nwcs6xtb6maq8j4m1h5ws9h101jkz18mm7dhebpg931t1cpcbqesfdnq1bvr3qojcsdvhh9w1mgxbkpwkxpdncblvbc8kr',
                proxyHost: 'nhefstndqufkjhbrtqdrci9n313absra1llmx0ojcq6fi1r33dz75g3fdbz8',
                proxyPort: 5246568450,
                destination: 'lcvmv9wwu458kcn8lufyupq8utzl2swcorcd8xbont85us3w1kenfl9r5wu6jeoukt6qd2w21q8hknwn22olzx80eq0fpu5dehincbyqr111ce7n4t27gidme6tdhzfg87jdb4cxioxsbfe2eo6kl6pjbct9ds0k',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'coqwfwash0rnzs03f9utluzuqftb8vybogtstue76cfkyp4mfmva7ijadewrazyl9xw4g1u22enpsu504rstss14g6ec3vwyr0av3nhw8w7cardecsn9wd1vogt19x6uzv34p5plf8kvihf84ubidn4goifr64ls',
                responsibleUserAccountName: '8igt5cg2uf9qatt3gbge',
                lastChangeUserAccount: 'i87ltfzd06z8yzp2ikf0k',
                lastChangedAt: '2020-11-04 12:49:51',
                riInterfaceName: 'wwes6w4jgp4ejn6rgvvw5zn1ol0pdeztjztpljoucc9pud68wv27g0bu3058czosuwltddxzsakrxlpqztthsx05tey2yxde6dgl46vk3f37zfnxq7htqrj1v58d4zm14n5d3t09xaqjmlhx9m3ch8x9x1laqvrf',
                riInterfaceNamespace: 'eyf69ulk1ey041adrcmlyj4fjtnpugaeyvo98rlpnb6dnvv67gljzz3abn0hh5k76t3hf10u8usfu1gux97swa53dzjmywcfn6bdb8uz7eo6irgtgbpiph8eqjyuk74y9btgjc8vdjaxwzanf7wj2xowor7lgxu0',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'el4g7nzhzpqq8n1b0hdrumsu84m32kigbvpqewn5',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'zm5ytc4wph0efkig5f3141h5t80wruu19rm3uhumidw21ay4pk',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'ndl3ualgdq0fl81dm9bj',
                party: 'muf9sxkk59sf837xfp9wncuqhpsaps2gcd2br114em1eyog0zot69tjzv0ucff869zpan2cv94pysxi7ycb9zkx6znuj2zbw5qyzj9jkg1xyku91qzofm5jikgzfhx93uedzycpiqwx5zcsyctu9csoyekqqhtlq',
                component: 'uduueqlp8cde6erpl568zzgqr1ydklf9xcap6bnjrijqvnfkpea5exknecc0kltvvq9opqsuhbh95lrd1tk2dwkdru2yhthfb365vsbmymysy8lcra45jl1vh2egf62mpdw2ado771uqcnsee85zakpilouqypmj',
                name: 'cerhfwhlgorsf31hql8gwkc965t5fmavv5vzmm0rr4bfdwxrel53klsbm4sb2p45y6qxng7hsnjzxyvpp7jtvdan1l0npsxy79bbbj3klntuhcglygu5od2iggm132w25z1pxvl5yzqnyrdcczb8m1zezzn7yibl',
                flowHash: 'h55zbra74y62d2veagulsb2zb3mmgn7mm5k4o2t2',
                flowParty: '6lx2eongl81hi87wvu3gnkssl53mxztyjs87nqucn4ysma85v3e0vu3wid4vb77t5da6uc4a5br3enqg7002tcwk82wk16n3mxwb300jbi6c84z4jl05vtv3xiwygg9y1gaol2mug5yk8s94jw5e019mflujpma3',
                flowReceiverParty: 'i8lvy1rr9uyv3l2lhi6t4hen4haagjk8921mtk0k1kdjz2pg3k30bv8pfmgh5bxyxd5rjna5bigu9bkt0s12zm2flrzehym2bnkxmlgsmzdmzw4px6g1ixi7xatd7r3fbn0say6lk905ha5ig9jnh0j92fbg1z7s',
                flowComponent: 'ohdspk6r2pdbsodha3sn6580pasj6qu8iim2jppjywr607yt439c41p38302d2isa7e39tg42ljl82h2rohlk78dih8ulh0t0e9xiqwz9rp01jwwzpbx0sld1jkdp6ju7zuuyhrqq788bm404lr6x1jx6vtmf452',
                flowReceiverComponent: 'g66lxu0mqjjv0xo72ns3s5xerpflfh5w600x50t9yak958nefm0kqmeml4wh9i32m7n7kbykskpdjknizr90v2b3lnl6691twscgs4dj4a1ccgpv5ta3v5lcsy51lutev562m5utg46jg6d9xhtv95ymdz7ml31z',
                flowInterfaceName: '3qpa7tdofbmc5418kyr2potkhsebvkqkqlg50t6rwg2ivp4zi8ovt3qm660j9o87rcl606naejihau4efgm94ouqrcz0si2r2i86oqttfcj4d5ke5rvhtyyms8g7c2snfmpst4k8mxshorzq01sbnswwuxb1e02x',
                flowInterfaceNamespace: 'ax9ts7illeturmj3wyghirvqlzvjm95o27di7thq8htvi3y2abksxshvy2kd0rqx6q4yzdo73c3dj9kmqivxcmolbhvcjdmuq9yxhnyayj3ejccybqcbxboo7hr3ved0g4r3z1kfiah9d9j4uffn48wvuntk7bfb',
                version: '0v3mnot2i5wv3weymo59',
                adapterType: '3f6yhh1kybh4ksa7tvw9w5sdw22mufixcebu20bgf88nogwqtq9njjc0h8k0',
                direction: 'SENDER',
                transportProtocol: 'x6bkvlp6cwedr1izc7v70wcnawmatec3zyb1rqltowrpbvv72oj4ffo0wnco',
                messageProtocol: 'ki0jlj77e0ssbg3zo7vumyqszpp2rsbro6mwmntpyp8bu8ffuurg245p9osl',
                adapterEngineName: 'yutws632hv0ho18074tsd5xhqc4m4dmi4mfaylqcsrfi1wvcxfr8pph7cv53dxdezlmsnjhlepk4yeho5ulv1w7j625u7hj86jtwsecon8whqrrxkmjm3i48powoo9dhe1pgnwfph6adm4iapb952ishezroanxl',
                url: '5j7shbexk02by7fsxpqrvuh6eu3iyss9kuwiam3o1n6ki48bjjxp3luiad518s77064ipccfw3kvu4h9nec6vv8nhhllf1rxty0cyijqtmojrpj2thuc42t6fplgkgxrwxhalo9a7wguh1vreinmwshbs8b1hat4ydfn93l6gzjateo8lb5fr9dq0n3uoygdkpjlgnuck7bb67aq8ydtloygmsnqjome2ogwja0rbi20vqctae7r3bbu3ux0inait3htbx04r7xgmeeelan7jlxlkkyjciq282fuzczjmmho03045843jnc8xhtjj3yv',
                username: 'u23bfu1vgvjeimmygiai1uhx50gnm39n2xu5e22n1yvqxmjmubxj7a2qmsl0',
                remoteHost: 'sk5yodaqw9zko1irmhaaa77b48xyji146ptf7f3ixkyshysng0prygzjratg16m3zs2vspx4l4hiz8hbr6gbxis2tvn3haipsz6ppbpmt4cppdl1syhdrtra41clebmu283xgiplwamjbz0t3iairudc8wwx1tzk',
                remotePort: 4260803170,
                directory: 'lfhbze7ejuwnyxp91937pdd6e21eebekzshq6exumfivtvq5jrmbi7yr3hr0a4c19p9soqssyapwav6w5xxz3yszeehznk12fs4w5ecug8mfcyddjyuq16lymwzzw38qis4mrxi6aml1zsisqyzy28d8nk0dxwpdbt0t179zijy96ym3gnf4tk7o6yssc07gbnsjlcknw9wwjsavkcr26h57l9wka8g8hli358pke1evssbvp1hecsa68xmqctx7k18m331pgql1bssyxihonvr4zdvngcj60k2am8ni7qsuvkbzmc22c7tgwa3474f7igl29fwym4esq0pk28ibgulkuapo2xgbccsrfosrkupjs8b8o29heyf0ubugmo08h6nev3a97yq7x95jte3azd7h73q4ejilx47jocp4vytzdk8kcsfuvwu43cguqqxxgf92d921fppbrjqm9r8b6svafatvvez85cubt9xk2oxvxiekrwqvbn4xbq0jd5dyb7tm5hugpt2n33hkxtvoj0w28np41nzijm3ppdq423j7wm8zehe8a1z24a7txuj8rtqv86idrxwx5op07clzcv4wzszg9kyqyvfvl5935dx13lb9q18dhldhzmxfn9dj5c4mfilu7k4c24nkzkn5px60rxblm47e5tbxff5wk9ivrx5bn9pvg04tj5rmatuxjwyb62jjme2c06xdf57pgmn067b65tmtnxy8qb4rhi3dtwn9qmig6uqa3chaujiuzoj0h7qe2mxdlyi6maz75s3qmimzw4sc19pp6lgrz0u6azcxm5wty46v5i80i1odqkbca7uh6nq3lhwpc7vfc76wof0cbslmdfhksswp5avy29trz9tba15r8pvoa9ezlyb213y2dk3mhjmhnp3upn3krpvlsmt2nj464m4d3zhj6xgbk2y70obwq4emtupx5iastuj6w1nzaz5j487gvmic2lsgn28n800voi5w2qzkbpc5mn8s7jb15bovttb7',
                fileSchema: 'cieg758op8ejfkost5yq2c33dze4nxdxi666bm5ru5t69k2453mjvdot7kn9zntrrere9s9rc3hbon7d4tsynj7jrwtxjwnvkkd94hem5b9hygg9wyj984u5vzteqfzlcdhbkx0jxc6g24tmg7j6i80z6ma2gyk4yg3f6dd5yeu0y7w7jq11ya5gjodivqnytvbmwjaaajek30ywtpmij5s7pans48huek5z8ephfgcwdgocffqqm7l4ybeil5ighejphn37q1ykfsnqyc9zh8xeoay7kirvtvz7eieem5xejirdk779jdbdqo3oi3pm9vu52ucbhhyjbygsc5a85ywt3zm3w8vad85w23dgzv5mwhy31cdd473kjbhbk9jbpyaw10g3mwgpgfa2v6l1gs60twwk7lodzslu9yyll6kyyuyyd7e4nhwauhewe10n27vfbxdy3jkbwt33r7hbkwqgaauc6ro1n6zcz8itselm6v6flhg4h38crr31jicdnucr3ppg2fsnnkjtiedgjljc1459zd368zdskwankmtkjl6axd9plqlxccwfizcx1pzrhdlu0lwniz2d5gzl31d7n04aax97ncb46sgy3czs93i8t9bodl2hanb3343q91jr3iy64ox2vfi2zr4k80qjf3csd0bb8ixz0cxai0lrterj4lbvm3tmyd961xniwql8fnej53gyf3o17lh6f8co829zy25jgyz8y8uzlo7a8ie84dg1bn0y7vtdszj1vbcnil0s2exwx2u9upx1l8wcjjrc2gx0j89ka4ba862e1itzggqp9mm9puq69anyqedd1b44rw38qredb45za82ildyjdcq73go7qtiz3qmmw0blzed2rxsme815f0um1r72p85wbck579p56lrka5custwws32kgektm45zihd9fm0943qm54y1qv5tluflmdi1rj4vozltouy4yufyubxz3taxk72dish5ganeypxe4o4xftkhaz6rhnkch4se',
                proxyHost: 'fh32d9w2jt793bc8mezto9i9woguls8yfoqwssg364rqiqlsna8e5oqkg814',
                proxyPort: 4299434443,
                destination: 'jg7kenstiabrbvfyui2b477xqktoqsalnh732ddirt6o4fzq5yxv8jfeyna8tohzqwkv6qb80qiyryk2g8zz4xanl2yk9t09vq9pojz8b22mws2ze728h0tfehdah23uqqnedcqtmipcvtinjg5tk59emgjvg1iv',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'du97o0bax74hbka9y8174k0nl9eo0j2yfv5bi0e0nuk02yx12vahv7vqzhdqmt3m48vkw92ez1e9n3wobie74m6efyx283qmc6gs8s0wkanr4f3rv051mg28ojgilmq11n3gm3756ov4re6nsnjbquebxcvbzhtb',
                responsibleUserAccountName: 'pvqrdwlfkndc564xhcpv',
                lastChangeUserAccount: 'a29s8whp3xusy93gor7v',
                lastChangedAt: '2020-11-04 08:18:25',
                riInterfaceName: '8xpvnkro2z2ohlcpjydtnysqltiy1yzah3m3goos3jrsbgexpgbvhnyqqun7ynlk80846pc5nmxfhaeiey2z1i9ks8qa5i235yy1cqygqpa3w5szogww12u6wq3rhu94itvcrv64re68tf6ltykybkpmxkc1vj89b',
                riInterfaceNamespace: 'pkc9wrrkyc8i1gz7nly2fl5o4ovl7dnwo5uj129dic8gpttn2qshpru6jwh1r3kw50a0v7nopklxdnnky7wwhjtqzttq1kbqbjwspow9wavzilty6d5p96hqpshph8qwy7ft9um8rrh4rab1yqx9elw5j4297j5v',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'fhdl5ujdpjxx37qypu7yqra3yhzts7qj5n5mdh75',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'lv4u71zuahitv2p7tvyl9r2gvls82oti0uqhwuf8v2xluzezu4',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'p0v1f5q1vf8m6w857wwv',
                party: 'fn1yym245romnczodhbbq0cjic4nplv41pvq1qyq22m3ckwbfh8i5tfohlktvi308oxuc97x0wv30na0zkglwe76bd6j3i12k0cctfhqn03bgqz06lfomx64v670rw4ne61blc8j3fl948q4z8h3qmsl0iqikdwd',
                component: 'ml0wt5mnvz4339orr54629qco3hyyck5d06e3ojjiqz4m921tb4y41rthryk9qrz18qaavmj9g7tttdbyyyc1teuurin6zjrgtgqrjdqnwhmtn2vglx5xs2x9sl6n8zlgu7dfavgda5n7nmf783chrjogdlxyov1',
                name: '44h4ulhz2bfnrxvy16x7xmvgg5mft03ltxmq8f0jujc1wo1jg23g6v8fi4ybda99yjpbr7fq29kk5wb6u22z9ves9307sybcrwymzq1nbhy8mevv9sf4fj1vpd9cbqweohr6pg64w88duqfiuy8lv3416eb853cd',
                flowHash: 'ld0dtj1g3d3ckbkrv76le4uoxcp3uepq1d0e9ua8',
                flowParty: 'zei050eqw26hrvev07t6bo0qkthwb6nagfvg7f1zi7unkdpzkynrynklc6v8sa2cl9rnpkp4ewjexm7uqv7pqa9fvr1krn2u4uzyfj93pq6rp7kejxgtxxgois3gf7ovww56jpr54qk7p5302h8k5rn4vtd27qtk',
                flowReceiverParty: 'm8lhufvooj9whjyahjn88vualkrusm6sdug83bvsbr5abhse4rheghpqk2z8f2cu6859acugw8zoe78wcra9g0izsfvk05psmpky15bij2c43trzdl3g4c6q4ne0e7uoybow99ow83ydkpbj5yimvutbt1s4e9wx',
                flowComponent: '8y5ncwxnhyewsu1we7i7arenzfy9nf7x6dodrdudcfa6woroa7tgzzgmaxw28ord2b97zn9kxqqoifdjuqbpraj3rpyi8fchuamvcnsiw0oxtaipefvts18ywy6d9bplielb0p4vg8u6eg5oa9qtzy57tyi1h958',
                flowReceiverComponent: 'h8hxfvmioh5eurbn1fw5vazfkgc1u7p5dme5yc4dd3mzpaaqmjbuwuruqy0645hggj2r7txbprs0fiy5cey21b5jnw3xapxvf2h58gwh01kgikwc9wroxre2xfbaufd2w24n299neotnfwz1bo6oqic2r43c3232',
                flowInterfaceName: 'llsn5g6810dromfmd0fpdgjxezvptud27ofbmuk4ekl6br39e80s62jm8bvk8f1iooj2tz6vny2p7jfjf9q2k2rjefvqd15es1dxaeomqd5ouzw8aln6ytpkgusjnp6cg6ygyp554qrf43i8nbp2i4paay5x1hjx',
                flowInterfaceNamespace: 'fc0wqnzakh0zcutelv9t67xo3xqemalq550669e5ymq7h5vp2hjnv39jy0bthfjmzlzncjnq4tkxcp1apatl6jvs302l7b5cgrm6hi1v7foo3fzu1og0pgjx9k1ytyqgu1y8hwaurao4n9y8lj2agn46dmul0zc2',
                version: 'm0kjo7wpd9d9cnh3el8v',
                adapterType: 'a87obvuuv401ealdlxr3cj88q9sdqgpc9uqhjont8wkwkcwgsi9u4usjipsp',
                direction: 'SENDER',
                transportProtocol: '33wmw6oxomkaz00cezs6arjbtnwcjw4muard7as0tugjcf2ig4xilx7hv5jd',
                messageProtocol: 'smrl3lbpovyyy1b6y9esjhj0tukytyqu8dx0cakccwuj7234n4tqszg2hiri',
                adapterEngineName: 'pklon6gjc48hgmyaoh4kym9haamwe86dg2i72cqacoc3vp7an5jxyeitfwe7nu0vccmfyruka7yj7ncx5d9m35rk7bwz77um5h8jugz92kdixe756ihkewdvx55kj5m0hgv0ababmkc95b3cutfecqss4wgfqwye',
                url: 'i6al8nx1a31e01rkk12vjesl314np1b610myydu2n2dkqs0upxh2iij9snk9kh5o1ttivpcci23kl6m8i0dkng7bqmo2ecqwut1u91suk2sactmkxgyg4bp3uo1orsz68yg84viwjxx0i4mlnahcwzid9g77fiynm70k0vno5r26lvzhiy5fxkf82bzm090i9kng28mdem2yw4w8nne305gzklaa3smmmmshdeobqq8t1wvrp3thydaehj3ayx8lnjetq2m3rxlxhdd855id0bffwbb5awc52180j3s7t6lv30bv1eioyr5x6l2fnhl9',
                username: 'n74aptagisi2tksac7rk71znu49fxnunj8uxdw7e4xxqahgqt6w4ogd5h3m2',
                remoteHost: '40z5uv857h64oa7atgen3wzxwsndbor3myqydhx5x0b9xnhnp1g4s1duu1qbl3pwgre6hso7xrs90ye4lfncw8oavynykgw1mehvwwjl776im6roto7vn5alia27fpp9algq5z2a0532gmbh40swrc6nlhnv4lbb',
                remotePort: 2902450894,
                directory: '5wcyo34fhakcwh8csoubbhhy382jfoni022lim8i53ci5s984yw4941mho291wsutscxb4xhhsqjojjyys45glyvxpzxhmjlnr444rzba89ro4pkg9lfrgjr9jl6m5oxkqht6288lw9xgpluvww1gbme5o7s8ifyikz2qc56141h5gh6g5zk3bpbuc60qessobl7m6j97q1r726t7aiw08yfzp32rv4pyl6j3j8txtutdy0h2wtf6zj9wo8kqdb6t9dqj73trqrcx023irg15tc5tjk8p1bqyxyn98ftuecmyhcro8kqt9l1vwj89elcpdrl8yxf7rdikrmue841c2rkgsuvj88lnzmgoe7kvm1u90ohc25at6uh7xhwd6bqp8gxmjqjm1dv4t3o5iyfp4fjlhdmyxofv4wbmrfk8c47ue5aovqq0xy8oixqkwtfcwo5da3ysut6gsyg85u0qyuizitwgugqq653fu6crvb8kx5mqq06w05557kk49m6hvu311qcmsdlgtidqu5679w3qb5umobvpeej87e1zh5bv0rkzatp3qh79s8g5ex4dtmpvpoccdqj9jqtvaxp8a9ie52yylbydosi8tdxknzjky0gv984rl73pce6tjsatjlwm9of3lqq996oioh5cugnjhd8949qhaqaxd0bqnf8wg987ktlk0b7fe5kjwc26qmepkp9m0xqoqhcw7zewtsda2abkswza75gj91epqtwc4jws6a30uqv4ho3boo13aqfykm813j8be4l405u7jre89d1ww7qj6yvi2dkjui8qiblt66t4wqa29zor41gd7dd1oa6lm4z3i6glromf5zptw85r9wi2hb3micmee6g4wd39wyq1sf5b0l17ctz7h3f1djtgwahtpc6ocg52ch232ey3cn8hmswgxelcaa5e4vtqvap65rovsh7l3m15n0iv1ky57r5ok9dwc49h18fc5du6w7mzg68ito9d00h52y9pa64zlicdpfjfqvc',
                fileSchema: 'zxta239zk2j4kdoy0wntlu01dn8fw70qewdbum7fwi8i9esd5bu8g52o59xbw2z23htkcujp7grdm5gnj97ol190butpeiq95yek3bdk3c0r74sw4c8m0816lzcnv8azc0oc44u51j8nt44rwxoddforclwa8ufdaey0787hu2ufr98qzf8v49n37oee4139uksje1k2a7jmggaa3qpq1kparvulq058rah4y3v74sc7mlsvmtfos62tlq477o04k2acsvhvzf52ud1rczj6obqgdpillkj6o5t66dzept9h1ofxigkopsa72xccvymkrff32bncjkl9f1s1vpe58nk50bqyl9kku1eerzk6rivipetops2xt6s190sp3vr3kn5gg18izrtano6q1hg43nscut2zhdqmcpcuxywg7ibmym309vncmghfnkdoj0dz9jtlbk99hz81kwx0dlvzar25j0hvx5fzd8hqy7c5isc0vu7uxty1zkikh4mar2mbs42n5svkuj37vag4px17ueo36r0lqk8o0hiso3nmnkxyjx694psxz24q4reyteddirg2t54dxj5x5edwb412dmcrlykouypskcrfu3lb8r2e1uymmu9nawbg9mes7avcm8mhni6t9ec4ji94i6u3ux02dlcm19n8pyzt65y4xdte0pb912hqvxw73ayenflu9vy5pxxb0rs4d79mfdhnnulwxtxbps8ojb5cr00vst2o2nxwembbi0b9ue22g4tgt8aiwy8l0sqvb9fmbl54m9wmo3p3b3v2buhn5p6kho0vbojyqfahj9vs8bvlde20hagi21qqsvtbkpiz1x555ffvkar4je0bf8117054e6rtw19zzy6ss2fw00p214y8a5oh0pd52b3hgj5loyex0otgp0y6q8h4gst9ibjcsim6195ikt97w62po2lsteqajrqfwss757fwieh9u55vv8vp6yg1v52o8p8sq4us6ihz40egtefjyrxr8utcp2pg',
                proxyHost: 'qsqt3m4nnupm4cdg3sez5qybgx8i9j7gkl0461jopbnw3p08tyh4j5vo8469',
                proxyPort: 7245279282,
                destination: 'p6blo1ck3swuqhfawvmph2srxwrbmqa7705295uwhwap5vs3bo9fhunm2zr3dfkjsc034iopzgkaph0ei1nrz1iz7thxz9tkmbh61mfkypc0cce3dj9tdtcn6lfiihlc1qsluwinxck4h834afv3pegiyb2m7znc',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'gsrfkvagfomt94ccy6x1pk6vobm96ixf1p3i7rwlxr0v4mp79ufhpivkrm5oeffb8s14m18alfmprtxkwygzltuvmo8dt0i9na05v0sqk5s1u5mm3xusblxxv2hm7uhrq7q7wi4e5b5hip5prlb0eqpn9kbr8d39',
                responsibleUserAccountName: 'wwpaz0xlolt5pk5lv0kr',
                lastChangeUserAccount: 'u8j4nzvjo8042cqqksi1',
                lastChangedAt: '2020-11-04 18:18:17',
                riInterfaceName: 'fwhf5wpzo00jimkyo7t980uh3bbmdtltykfrvp9wwhrlc8qxb23ral134yjwmuluxl6j13y2mu7htwce5dh4mgvgtpq6pnyrszey1ws9xjqtvvlq31780rwsau5pcnj0mtmgzxdpy1qjkx57vjjwu9ymn62lj2v6',
                riInterfaceNamespace: '4jvcgzhduzpv8slq1x06tlewsa6k3c6q47s2ri01sj0yzi4o1at72y3kp9b8ae6hnfhw6jabjk9uzlog5cnjo3bhy8ip5y8y6w2bx06h91xev0xaos4lucoc66c4ggstffhddb957jqya4g5q9aleyf7iirkeeqmh',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'vrdy0n8fph9ujx8i6jcbx0y6i26uo73h3blybs8s',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'gu9nhjy4ifzp2rx66wefzz3oy5qdojkuq35znio42x7loy6a68',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'yeh8engh2qdb4k3hkrgc',
                party: '3d5qqlg7dj180hkhalfmcpr0p0svf9b18y1ei15r6x56d6v117beu15unuxqfdzlzm3totyxbfnsbef3b6wy2qv7qzq5ex9418honnluivn55j2qj3v3sxqbfaiocvywf5cmiisg1wehzdbjewqmwatqnbjj9ylb',
                component: 'zilv8czum2uusxl5rh5dgs8qw5k8s1hgl8db3wvaga95xohxtnkdaw5snz56tj909hl1gqzl10jnip5eahvyviw6ntknxckkogi23sumc8lkirgd8v6ed1kfz1qp5jszrgnvtr73mr8d8h4g3agyeqe5ebxjyww5',
                name: 'otomwy9fsmvte8leuaknp1pzgl0uhyfg9nu0xsp4b14il29ttgrnscipqglv2t14gunou8x18sfrttvzw58sblf3uh6pmu0du8o42u2t0uvqjpe5lkax74s4d8ly0kd9ugpdo3ox52hcxv0auogbk847cnighpp4',
                flowHash: '79fh67kivbh7nlgeabujcde6w9fqvhw1e9z6u3yk',
                flowParty: 'v95n0r5z9vnzaxgzcpc9ylwx2qtevzlyc5ick8vk85xlzs8bk654n9wdf4eaqxo851n0p9kajqszx31ktcnqmexzdrcvcz9h0pr02wtyjjpxukfwcplsfh9wwvdobbnkqc1x9g6x2kgcebq1qxa2orseljhrpkne',
                flowReceiverParty: 'xwzq6p9xrfuzpt4dxfwu05iajilgrld5aoa9shn1zunf7ohrmdjwgxwsuht76wm8ipg7wybsjw51x54daahvf3qqq3q8kcu3d17ev8gx76mgww99lmrcjauqn4j22hyj5bczalwbwpki1ztghykfouck1k0czbrp',
                flowComponent: '5e234i5es5h67vljtpnj9dunwla448nzxpmszs6fkf7n65hvxryhpfok2kd9afk4rwwu83all1oyti8hiaimrewn8btk0ms1dw3gwz24x1guwq27w7dhey3l2j8jc1cfjxgv29cjvinh72zq4skuu60pebr7k3ew',
                flowReceiverComponent: '3se1s0knic3563ajs5ala0om0a86ycgrmqnht9j1iezz0f4hklfq3ayv5hv2cl1sajxk65noj1wtc5pmwm71uo2wqybhhc0zx93qbuu75wzs6huky3vtaeggm8a9v3qym8xp4t9f8fz23mcgqx5qb1xwgjaikwzq',
                flowInterfaceName: 'b3umsf1n42qxi6l9gxc6gcundk1cs2wcygvih24rw1a6gl1br2dibv58cud7pyfg94knsl0gugtl1wcywhf8eadgu2u13d3hu50vw3ajhz74hk0tbn3dh866o0rufvjq459d9o05tmq5xpzv2nmnf9fxoyadym5i',
                flowInterfaceNamespace: 'n328xkoik5t2ra92r93beau7aqri22ymhzww5hvzm2q8n13sk1ewxcsxqf7m5eueaa8ylwl9s5xg9xste1lk6iq9isdtlw2txg9hmr0yv0skeahx1iqww085jbx7yh7ltuls4u7ldew9z9ky1a669hf2iynkhynn',
                version: 'g797hxx27g1dzzhaasll',
                adapterType: 'mjyzbpu0dugnevvsjbh67n27df6b2z6ztnyki9sr3le3zyqup6vhgqzx9fr2',
                direction: 'SENDER',
                transportProtocol: '9usuzsi9nrrkd1qt8ea5j3rcbn0xx6t1z1diiasitwm2n8xdnc79lokkxgwd',
                messageProtocol: '1w5a3nto0whlg7p1hrvgid33rez2x1kutfmdvhjzlhskg6sdsjammu2cbyjy',
                adapterEngineName: 'fm1lmu215t7fs35jg1u41zdsjplkd99446v48f0mhkvl15dn11r95p2k3mjvw11l0egmhqmxadd5tnpjt61w3zvxldjod0x1pi8vruvyhi7k079wvnx8w6s92r42x45h4udaawmee4v306ujzugj2i4i491l0ez6',
                url: '2k0f8r78oactzrx2lpj8b1p5vwfpfpi5gtq8hoe14jgog2lspngkaba15923jt8khv8rsn0vkgocbj1y174luzgdtwkvj99z7d69blxj3ku1d8j4gltksb18mx2bbr2z49r74i9lm079ksness4lrbkw9l1zovlv7hwqwi8yujl99hvl7h4bw4u7fi4wt40yx2x0yahktpy646se550hx8xrj96vilz45prxqwd05o8jg65ikomorgkutf6x94sr2tt3i3zv2mbk2kdfgwn53zzq9o2ww9ofa5biove26w31pf7hwszz5ah3876slgla',
                username: 'p93vmammpsqs8ga4hy9v7ld9dqk4gsunz1cq2w3tb5m335klgd5wvkublzwb',
                remoteHost: 'bvvt2v5he2zcwajic5cts48ewq3darbglz0fnxjuydhsgqcn6eamebndxmkwfxl3lvjhr3184h5gjqva5evqe1cqv8azk5peocapq0344orw2kb5ym7hz75hmo3wo3df99le3hwgpiylat22aklu9x9japsua521',
                remotePort: -9,
                directory: '5be2vbkhg8yo1zp17eobrp3ocy8edbschlvyimbtt020jm2rjzj85ppvya0d8iwbe05c2hydi4aphok548ebrd6fviz6eeggjjijlprmm3gnijcew0bj4e2keg7vk21kwac8hz0vouf1hhkspt4d4z0zgoua7wbauvoqwq2yv28x87idzm151r30w6iecu0nn47sdp5zfk5c3ft520vhr430lz4y95tj0czzflzx7mcbyk1iljkdza99msq81igoj1yqcsysf37hhha8tzvwwt7ew41lpypisccmge3fxmzlu7hpaw17f8cx4cwt70wpgj6t066nhqinz279pp7ygfq9lm9ngo3b8qnv6jsj4e8mgljja8w71mtc5q1max3iwcju5dd1xmtalhkwdsl8y7jkdtqtnv3clxzu98fma4uynz26u4uevxrwgli0p60nb55ziv2woc0cfz658pywdhzgpfpnxbi1k2yug4dyyl21bdullohizgu9qqh24kdnauagkgx2r5prr874rpqaleo2ipyhi6kh1hkoa3913kh3lf8kr9x4ddfxn9zz7ywaepowiefrf81qm9jh6if5my4yyefifahl4ywaikeiwuvwuwg62kbebqhsnj9rma53h2rb693qx9et22r0rog05t6oa7it74yp3fg71tvn56e9oivx91d2dn89aofldob1sg43dt03flbhj5yrnv6sfefwtdztwueqzpg2mgqx9c5aduu0m0927hbtbm2u76ar3rdjk2hmkvihoi82ymdfr4m6z7b3hyxkybbwtpvh4czmxosbjhimcqrx2ntwvm32xkybunho3ogvvisqllllfu3rgzebihg7kj1691rgmofdqx2vdf5pkyz49rfuiehkji96xp0syljvfaz42pztrsro1ofbrq6jzfiwliri8ocahcsh8vjit9b8jh6tqdd4739itqb6wycszsfqq2amnjxp8tqczchf7gkhfs7fytzdnjkia1hapl1qcm0o9pra',
                fileSchema: 'vss99zimbv96lv5xf3pyg9pvg3bkow8dis8vf1xbsge7urwgwikqacrmkglni9ahmi335syq96fgfltmi0exjdzb2q835zg5sagvp70itzmfhdsts9xnpep4ehol8izalip29wxhfvczw4fttfx5ssbwno8jm8nmxma1zpqgjn6jusgrv08sowznclr7jhxkdwjplihul2wvj6kx5mbp6d9ygvpvzkeoegxegym180m1kjeh135bdnx2p4e5qex6kcw3mkdd9bsawrkbwdpdmbnl7np02oxzqvfyqdwvbccns0aft9pd78et8yt3ftl1xrzqilznb8nxgprq7idjl1187g9218no46y1mlzgw7p4tnkhzaecj2wqubw5dgdwyq50kozu13vz93ufzpkhhmh9hkm5u1wubcqyuuzfhuwzf08uhia95g38gw23xaacympgshfqlovmx5ia2x3kav2xxwswi5ku6s0joo2hcetl4p7n14myo495skr1r05jhjm2d5agsq2h7wn5x9czsod6nkzle2lg3o5g9x29khh60azk65qq10zbi7oof8sbovg6aohiqgjo02w1j984zlwd8wa5yic60hfqf7vgwhb6cd33e7lyxoopxdxn7pb8nz1qvsioi44429bibxpt35w1clz1jljge8apd51n9d2psurf4ppwf0az2tnngxydh18v2pjbv8n66ywcsl0900oq3rdfru12wk748q0j3ppss6nqfnkme6ll2exubaqa6b3svuu1cycbaawzzs4s903si1yo5qz1cse9zqqftrlsevw8ne100cre9bbix7b3pi27xeb8v9ez4fxgsffnkifmd1m6b9bs0db7fohwteerrxwzs3bzkyapobrg9fj645l19fq09zq2kg2gwqupj0krty4ategjh8ct7bdy2io0pf0l0ytkqen8p7eg5fa0kmpovv79n0axzqvcxrhogwi1cp5ah2ff1j9p4db2x4itb408adzl3znk7bmx55pf',
                proxyHost: 'tg5naephklb028de694ylv1pho9kqfujran3wu9s5yebt4fi14053n9v6ruv',
                proxyPort: 7309809986,
                destination: 'cryp6xvz9d447tfpc5rbfhoa5tslstmdk3xmofb6an7pfek77dyo9412tu405ve57bzp1aabv67gke4ddt2g9e9emavbpsvt8kf0669cchwyl8xgpbolkob95tnz5qw93qyb3j32usz6g3mufi2rm4uwv8d0tuu3',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7m7evsbsb6ozzrdnfc0qh92yz2kho2875hqvq3z3dzacuq9gn7h9m9006g08e8y9mqxenjkn04ru1juh5kpmybhgc3sefqukqqm8wikfk99xjbsn37azjjy1j67gi2uxm3bbicjgjoxf29hutabr1ktfnz8zkozp',
                responsibleUserAccountName: '7bjiosbbsubh5p7ooqfq',
                lastChangeUserAccount: 'hlm9wfsqneaov9s3cxgy',
                lastChangedAt: '2020-11-04 03:19:42',
                riInterfaceName: 'quubpbpkfimde20qms3azfhic7xff5q3ve87g54laz2xh5tc4kp9u09ei7mzg7jgc9k1tw08p6m238dmdamrxda4detk6ei26aomrjytow9rqtgc9dbji1gt7swhxiqeeh88qfl36l2oylm8qg63785w90ii7ovx',
                riInterfaceNamespace: 'sd9od6nly7s8bvfvfgwga0gjt0bzm112ckvew6cgv0foc4s0pr8zfuley2g6ku012ts3164nz5uvqkdpkht5fgyo8d85c0v1fkegdlkbn02e69yrjty78ggkko0eyxt1k706ofz6wgcuosnll4zuxyeraxpzqysk',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'tlmkkk0xz2jswbld99mnwc7py2xv3bw2duwrmfig',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'pr645rcbebz2cmyjqyvwqiiubjiybtbmwhmgemu39j2ft8hrf6',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'qti2s9e5c06br64ftby5',
                party: 'b7n3y3gi3ypy21tapw3onlg3mbbmcka4st0car8aq4hui4zfzee5pvj0s9tq53bkoox4qnsjti8dkptqmmykt1eykh8diyhg5kmcah3sz4motp7zz0l93jzj9ptmzcvp94dsc2lf04r5ic558ihk1ddvpsye9bjh',
                component: '5feqovybndnpgupnf1hbo969ay5pm7f6eoyqht4nyzatdzymdzl4omnv3ucs054zcalf8gvai97pkypf6o1ra36dzkstx1024b891ahpt0hc1y5yzm3azyw90qt3l6qol3v2jspcu2628zg9hna94mo4d5xzr2br',
                name: 'kj8p2m2b2ket0qcfzbneixs907pah1zqxbdbcqdiy1qlzmly5ggesm0re21ahuas2016eakkxtc1hybad0hh43hbxefszd1o76oivsxgyo65edh3qn98hd4canwg1hiq3o3ddj1rvycfsdxz6qv6pkks3y6gjgwd',
                flowHash: 'bymuoxp34vv9561gnu01b8ilgg1jmtcfa1pgtv8y',
                flowParty: '89l28dm9vvhicpgi7632cda2mhbplc0nu7wrxb91ozr3i3ddlckge4wjj3ifudg0btrdhrjddjlu6tq6qnoaxzzajllwzn6s4wo9jvs1o8f4o0b6o7t1z93amwva8fcgm8go4xboze1q33q2cvzs6jbahrbochcz',
                flowReceiverParty: 'zwhs2wmm8oqy9z2jc0x2rkziw6uduhob2jnwag0aw9aykoctwq3taz04yv12q4gdas5krveo9g0lrchza460eiuauxzpfwvhastr1xy4hda0ub9qiiopwwcc7rk2524r8y1dus029b66nx2weflqwl5ddkathelb',
                flowComponent: 'xptcwjqhop4iimwffbgpc0ra9ozf0abqeddm6yfmatzprz1b9crq71u2d17svg8nzll0wqze5f52jc9s6necevovaosxfdvihtks2f0y0dnknlb19gly9ooyd6cvznjtiymxy8ugs4cioset2xrmjo822njxgwgk',
                flowReceiverComponent: '6xpi8pavzx97tlie37c90f7tvwr84xd9j8wau5jxx7jwhy3vteqd5jupok5bqestrx78489rx6t841sbuyppvc3mvwgtfvk23jysv96ue22numiipncv9y7kdep4ny4ro4dl74jqao3fifs0w0btw3174lva1rb8',
                flowInterfaceName: '7gqtuzkpmq237rx66r8jroxv3xkjax69tym0ig1t252q5k1i3d08zaedb7ckhdbdo28f9lg9fk6xmupe2hmk626dn3ccz5f1u11g6i4k9y95thl6vr6xn5mlqqnu2v3farbyuwb2b3g48ok58ms0miqujeemargx',
                flowInterfaceNamespace: 'yrwpgergzt48ww9gv0wrbn4uwhgfqu8wrfm8fgkgr8i2qycxyjr73wlfm4hw2dqg1aq05xxvoooe8vcc0mbjbzlm07hi40u1gdkh2bdxeax0fmihwbm1yhgx5wngqt55lg8r3bwxgc30g3az1xdzy3opgwgwoy8f',
                version: 'lxoy0o8z6or2e245ua3m',
                adapterType: 'rh0gccmdh42t8ugayxmllrf9gk7pb12z22ycrpzfcgdcl725jdw92v406k2r',
                direction: 'RECEIVER',
                transportProtocol: '5i3m94axmy7k8vbl6iwiyh6wtzrfvx3dlnedbuopogqpe0buja5z7goe9o0j',
                messageProtocol: 'cyzvvrkcmk1kxsc6wbtisagkhbjqq8b956umgb49v2ypdr5qwl0zi2rxn6fs',
                adapterEngineName: 'chowjd2pvsut6vnhxo85ardtwkers8cinh06gksuz26f3qr0myxmfzbdm1lcfnm1mtyrr5gza94me5kqpoeazhqwdzx70zzl99isw32qwiz2uqtxmao42yxcbzbzvmdufe9jv3dk75xbkmdeqqlq7knf827bpuus',
                url: 'wm0zcufsu0f6aybog5sz3r04xamrq6x6uiee4vuafbmwhz2y1dx32y0pi2wir4mif4tzp49373jtbnn0g9ul9o3ubt8xexknjtzh1whjgw99usontw2bccmog2pa509bwjtnmxlf53dikf1o4r7v9qd3s9y2uxnfpvg51uv1b9zrhtgmtdvsby6dr2jjc98x1iezp620k4gu0qxbo598vejtql9su8vofvloyj5clo2712wtes4j6ylv3a0d1prj2wlrrn35k4wdmdl4ax3maduqh3peitdrn1i6slal05oaxu8ga72u0gqv7xrl1jx4',
                username: 'rpev9o5stccphoh9ifhqvi2tyb2hqnqlvp3bnulf15atd5nt3pn9b821grok',
                remoteHost: '7nvd5k8umh0x3k3avisxyb4xg1ijsc6uiyqtxy6akglglh12v5rk4768jc5t19x2jatb0x2pu92c48c6tze7pmz9ea0n85m22pti9fxldfnjocvm248hebdrzvso24bg4zfqltfh5hluzw4ue10cd7a93sua0lir',
                remotePort: 7738859245,
                directory: '01gxeswjevqelv8aig6j8yfntxx7wno5epgou4fsoxi2i88p7d5k0z1htk24b8437128c9neq3kckb56l12kazabs2x23ce8u7wx5li71ljmluk2rl7nxv10cs4nbrw7rpq6nw9khqdusrgfxn303yl9044xb9g17v4lqox39qs1lh7b78t3dc4etd750obnm6km5lwxaj262scc2owx0ldd65cbfv0j6i1ew9x6lyprupwuxylb3sxyt5g3jr73qn0e9bt9q0e54uxzys6oe4thhf73s7e2mxhifed88970qs3rtd75vxr13v3wrgqqml9aa4hvnjze1y694pzp86avg1mmw5j3viqsuywb51s97es7mteqv5d5j4un9xmx1pweguwanlned3mqog6k5om7cmv2e69oxl1r3g42qs746cw0pntieh0tiwavbuyqer497vkko2vhw2228etqjwzzp1avd5hsj8qoq9cgzdubgoqqz0jkbqdrzfxu8phlxs0zt1u8fn498377nz6tpfc4sxb3833mxlz4cgdehfr0ik77oktzj3nqcv3lk3df8q6315yrnnufc49ahbj3y8yahgvpliso0mwuvu1fdaazq2h454rh8ocooh0d81a2o3ga2by4zrmm8hx7qb95uyvl5doigfzalda9nutvmynr5gpvirqf457n4po14ku5ozlmwredgxshv8avmn4s630hp1qjqprlm4ljeix2alk2o1hqxcw5se334g909gwxctofl2tzzmkri6b25vd8vhb2us7eemokygwidlu07izz78jf8ob9lcb0peip3asxcooo0oycz8o7f5bx2j9pzsdufbhok1cg8zlki56tyo3ya9nmecvkcxabhpaxzrwlsnlruegsfi2sm7y9i72xnt4pqazj31jf2v513il230hqmh4nsmhmz95s7mdj3pq088iup3zv3eh3d0rh6m3sx6c7bria35bhv1oa1iz5np0yg7m19iu5bg0wc5egtjw6',
                fileSchema: '5nmq6ou8a5t0r9vasistu6ue9hfgvrn9hjlssh4v5m4xs6hcxujnewtmk24n12e4thkpyovd9emuvvm6olq5k1huq3kn3ffuk3tngz81w6lqo5ec1dp0bmjqhstoqtipgsu1ytgan06uoj9fixyk6yr51kpln4ied3wcdutlptxu81pxxkei8re4nkhe85jwcelbea11ngl3i5t6mdlu0brsd5nkxjhdp7565u2tzuwfsfrl2h1yhlnxf1owm0ymr7i6xec6mwdd679eu0y3uf4pmrjkkxj0bwpji7hvtpk0fpu9jc7226thjnmyfb0vjx028ovcy5js25nyy5mgqoosuxvn9mvje4yo28uwxaxk1w48mtflycf2prfvob0o0f15m5azl859tj9lszc7c8d6cvjr2cmeqxeecxksjxnrnll8phwmkmgudlgguewu6pmpo1bobprwg5w6q68konnb5x4kqire31oma4x4wnwqzvk89j0elekhx8t4t2b4sl72hla37yhsjy7crylec69aucv5njrvuk7e96am7pfn8wujlj67gxdgx88wtymll1wxiovij2eac840l6vfzklefagxojb39hpomqo2307fln1811p6e9ds6et0g6f7qdfknzvbswos06t0t63exmwvt9gysspof9ehqhduevgchitwpzddvwk9qkhco67fdak208u8ueq7h08vcyallgvnh33jtv5e8oy8ce35o4mverh03eym5omjtm6gzogxdxo7iww89w8j4n48iseqluqh83233a0q6vnti5xblyinjj67kvbltnu037b3cv6divjx3dkjg1i0jlflufgueepro60vbx2si51106kzwzbtgrwjhb5mbuluq9j0j6hbe3sivpxpf3nlt1pw78fsjwmu4o01kjo8afkeoy1ptnaz7mxpqfw56zuz7fqr2qmpwfy8u87np6i4pt7cduy44v8ov1ypp0usfilnk3xxkimr2e0vh4jyq7fhs60ep4hr',
                proxyHost: 'zg4zm66hechnz77hpe7qotm6pmlzxfhzfymnr4mduqc8qbrwpkzoqp9ryub8',
                proxyPort: -9,
                destination: 'f01gv362oge9nst1592316fi0ahd09mi960up7kb4o2b9sdycbqmu2u6dbzb94as7561evy3uuken9yh52ei2ziacwn2lj6u62p2xegdmnwg3rtldw9ljjzg8bsphwowogok4ct8o3ssqngg4csbx4b4zkstye7v',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '8sugbicib56bt58yi0g6evsxw3ggg4xvx30me02jeck3j354121ki40trzjzljutw3r23m9t9c36h73pbd093xjt1m4gd2s1nr7wfwpcu255z9vvng3zwrc9qc3qyxpoz4l5s7e5hhinynjrgz6q6ldd94hmw9df',
                responsibleUserAccountName: 'ig40hzzdfihq9w59p68a',
                lastChangeUserAccount: 'fi0n4hwixik48j9qcxc9',
                lastChangedAt: '2020-11-04 00:06:26',
                riInterfaceName: 'vva3zvb4ltxgimb35qja6ob45csimluc2lghl5sxqmfrjup79vnhkose50n7kd6duqeha41foh34imk1g3v8rlvn1sjjmqd97g5fpo5nxmwp0cby5gz2rid74dn319bgj1c6cbbafinwjjg9jclityi7nbo45xt0',
                riInterfaceNamespace: 'pfvwdd229blgag7kwn4qtl9mcraftc3madojc5ud3wenvi0b0tmnodcu9ieenl80prktc1vfunfk7kzgp62wvcr14kc1kya0tweh6mgfxlu8dkmj1yem8a3k4xt2gvfap6aa5ve12cs6n530i0ymp1x4d0w0up4i',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'wdaqzplh0ki9rxieziqzik4y38zypdxp3frh349c',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'ea7g79opmgwqo9dfbzmy8cbnfgtyu510lvy9ezwx31twv730f8',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: '2xuq5uzjjpji14n5kpe3',
                party: 'vg70jsj7usbekfvyfrgt1nxwbd98f5cvll5sjfyqa9dl3t1a2i5jshugffhjcaxb3qp0ljcnoywiaoybd3hsu3flzkqv3rpf9ikgccuffxzofjmli3oersz8m8prjges343q8rczxgtd6bt3ffxz49j732nirklx',
                component: 'aylv476sn1lq2gmxj98nst6turiqbkqq6dxgm93oxc2c0n4zkgjqxv0576foftlb8acxw698a7f93q790kcbj3d0i21jtoyubjff3fmufbhjy5mnikpkme5msl8928xps1mcna7il52yq8b9shu34fjcnvelxyg3',
                name: '91olt9etwh6ti9q94fp03d29l0bzreoai9q6ta7pmiq248qw90orch61h7so7t4n3xwil0t9ii2sne1l0rku7c0427g41zw37ox3iq5ygcqpf5fjsj7f37rw5agvsrv3yyol7bg4z64cf2gc92045w5w3lrbmcy6',
                flowHash: '8h0qqrkhnafi1zks57scok2ikwmrv1re0g3mtk3n',
                flowParty: '900a42dub43t92lhdvqxqufy4ey6jm4xp0dp2waumwlmq9j439h2y7vq5an7t1yrukrkqukynag4ybk8hkoffs2llm2p96q3741pi2rzx4ytrn331f2e9j005iqfdkvjbmxlerp2e0alu7spxgaiceujtjmf9bad',
                flowReceiverParty: 'pi89pms5wapalbu3cpnks4r0k3ctjgsb30k7uqqo4b9mkqkzq5n7dl2uv0oy925lmg4bzoqnaor03br6ylzz75te0wdttpoes8q82ciu4ckukku7olggp8snqxori7p4uq6kiy8zjzkjvom4gslynhhryfrsobyp',
                flowComponent: 'ohz4x7eycz6abhf8tmotufyj0oh91xxb2e3uwbmtzxqlxjo8viqchkbhh97ikwzbvby0yph18khtghcihj30typq8ybpptnnr79izh9xk52ln5d3omj1tyq1y9fxwyo9u9agtabju6xdr1slwa3f0fc9151opz67',
                flowReceiverComponent: 'eyev2ykch7r9jsbr9xbj3vzw42u2863j5ll6lclxyp6q970h38fiuait4b1yav3wvvbd7zqz6y3u4mv34iakzna42gchtwq5ofiwjv1fk0mvk5pa45vm7a0nqoxcqgre6zdxd35x8y04dzmm7mdcqy75r0m05r5j',
                flowInterfaceName: 'vs5ce7alvu8ec51hf60w808mjf49f5iaudd3pn46qqg50c537onp5npeqx2urgg9tohqfq2h6c6qiezqfnh64pdu7vjl1u39q6omtgy3begjxu3p4zdn7mbrq99wb1kqefcap6df8mryi2zvb80zp4yznez0rb44',
                flowInterfaceNamespace: 'r4b1vloc2h1rjaifmc0guqx6tzc83au6qp2s65tujn3m5tej9g6376w44fdx6i4g52b0bzcst1gzubvi2olur41t63z4mta64r25up5xg1fleldft1hkg1ovjrrg4ggzps89xs7z8981bdznn0tsw28321yxyt96',
                version: 'ymjzn4i2spp81lpf36yk',
                adapterType: 'ghresd4shkzfyjuz5qvn6ljvav96eniu7uwy61hvc3etybotlum9khysr4uz',
                direction: 'XXXX',
                transportProtocol: '7wxb3i5rvjondkre7l4d1byt7oxdk0o99xfacz84odun0sv4sglvfqdsse16',
                messageProtocol: 'bx8wa3aq0oate3fqv82r2us30dtqnwvu7oxjymh1ygnxf37yfassz2lxdy6g',
                adapterEngineName: 'eayyw38tm0sac4oqium0wkll94pk4snyt4pv9tcnei5doet1w0574ob5d0nedquyrhe1gtkupai38qnxrl9lqriooquhnimxc8eolfx9uc579uirmplvyk0bhifizqnorlbquunn0omhlflff51wgjsb8yh5e7ua',
                url: '7u25cq3mymzenxb8oljwxdzd767rkqbb7eqz5kl4ogab3jlxuffkmph5e2cgxqjslxeknl6cbwtqc40bsp1stpk3evnhobxyblxpbuzsgu8742zaliw2r2eeq2ho3td9wqhbjb3k2m930d5ch21318ugyfu8hsj1l9a2bp0kb2vul8m88odcmck5chpvudcuxjiy7c6kcqems88p284eg7wu3gjswi49t5x1zr5c67kdrfwpbo1h7y9ad11mp3winoj453cerxmb73q0jm1ji4kjf52urvlj1xkvmy0jjtn3dqsds3emeu6nb0i9uvzv',
                username: '31t2o3ibz53thtqx657b55qwx1fzqm7ybry6wc1ur4nr1ejg7d88m7jo0n71',
                remoteHost: '8strbrjxlxc3eg1z20uczv9t93k6ps1f92m1r73iei7i2lc6zyq4w09086ojju2bdkgb2y0ra0mkm8g3r28ubxwbc075tkwmn8ski5i6a9g15lbg09han4u2kal3r8n7swchcl9theepqttn1g39a9xz1wfdof4v',
                remotePort: 8388134000,
                directory: 'nme8kxqph41luadpj4vscsc7jfubwvthzq59tvyilnuh5svtjuawbweleu1clwxmue49j5ies18eqts8lwe1ost6xkcffrksvneu6pd09ukju06hz0na78roeoxpvzat492hce90asyh03at9u3dqnt0jok6so5rfoi9pxlnt8ecc2z036ov2bepwqf44d816xpgxb3woau59ks6djzjfdfqynye5f90dx698zqmujiwllkl0n3vsnh21sl64mvm2oz9jywyl4inwf35jc3xemf11m1n7rxz5pt0115iksxrfys7qrr8lrxiqjyq6x7h4vebesqjyrvj7svyu85unb8ygpj6ueleyuy6e65udul334j7injgtqlgal5dagw45hn5day0cz0qyni77pcthrc39pzfpqn5ecabutp4mmoi3wao2p6fib089qr8egpnwcw38fk3il6i3cxx3z17966x6qkfmxj9csperat9vg2j9leipeul2yc00b7iix3zpw0aj17x1gu0z2r9sd4jbcbyfqitzhp6kj3oyqhcwx5fm83xosiooze658zd446u9sxa04ow9f1s90a0byd8m1qz6uz850bhw32vmwfdezhkkh7vjdljveasm2mv7428hhbmkpzvs9o9mnwhly84id1wizsyr7vyqinivpis135hw3sn31dtor94bohxz7z31ztv2gmltckr2aifkrx1c4j786kh9debld99nsh2zogrsvbp00jfnbgh3fqx8lmzw4gg7zdzc5obdvyi0nit1x2rhj1k9hd7klkk8qyx79jlayt17zn4tekg51mv0j969k55e71c59l5tk8dhqb1jhbgo7l76nqksim5bzmbpybq113q1y124tibhvtnzqpyocptz9ucar1eb9f5h0y17cjic6d1e31rxn2pz3hfqzoorly3jq54l8swhcz8n1ka1anfcuepckqwl45f9aali9ho0cu9kf0rwr4ebiaqgl1dfe92ili1b5xbif2ts10j',
                fileSchema: 'wil5ruhz2e75sj1husccghwss7sf6t1nw3xb6b38vg2fypv43bag55pbah5lndpkbwl92br0hj82995akqp5vl3vwkllj6nlaiepu8a8svqa8am6bom1gu8pm4qrny7d141cjoykxp0l3ge0s666cjxiwg6o3i47f76xf6mizldzo3mc9mtu1eyz5iku2dqv3p2ge7mgbj2jqxx1yopjshi7anjwq2m9w4uirvzwxxo57fywsk93nhhbmkd6usd2tdhlh3zgrok1cw94y0njryntanwzk34xonpvoi4sek1hia27axk1oxbfnafc2dc3vk7l3jg9b055b9a246d6u5x0m5pzlu60lr8nspx56jnwyu5hsxgiksosbu8xdpx0tkk4walx8rnsa16hjxilh9387th5j2t5el6mhniw5obhkpit0r4ddn8rxcjgpbmjiz86pw0kjq68ixlwqufnrukkgeob80oxu3w12vhzalsg8mcz6wu36w3lps0qy00rzavxkub8zfpmkcczinalxcnw8jxlaozk6x1p7yxr9w9h7n3b6da77o7invzqy351sj1d50dwua6bkor7kael2c842cnkoh5uh1rq5a8otz5xqr9ia427kxu8ij66n4adf1n1eszvsqo4mgfog0ze37rb574obodhg2yon10qyh5nacb8d1walgar2toizixicyypkfrqvdhj06vlw7wl876v7ciy9yz104emvteneencr8ny1eej9vwu8x7uc2giwdj1keglqaav0jham53dy2qz1wbkok95inr2ais230poxdvqxfy7i6af99ewhlw6abi53ipb4qifhmq2up9od7sbkimi5w0vtwaeqq78xase12fpqt266qqozwdo5n8x9se3dvkpv0tyhbdljo3rx310ffseltk0zqqyucojnqgwj1prb42pvqtdko9lq8s6g8mzxgvelmrs0eitjyoxh3b0x0tv8mz7rcf9nf73bfnmvcez0hxf6bym32h3aog8',
                proxyHost: 'yoc3ampaq2rn9x37i3hl1rfmlactip9zlxs71so99j45ie0228fmhhiwmj9e',
                proxyPort: 5328075024,
                destination: 'h810rrvp7xipemzi791n3nrl7n9sukupnsuu2h06p0j6eh1hfgqnwm15sd6q4eune5dq9tgjcax7q29yjxdjci7ssy5jxrb8mjhesgjlx7bykoowkuh09y3ykfnw1qbqo9yci7gjrs21b77bhche0lawauizjhk8',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'fztblcm8gkaaxrk4fo6b0ws31gzmfgfiplz0o5orzs13a7g00iv4cl3o0ytbsk9pbdmjsf7mbydtuh241aqdeoxlqkob4cetlh5qcyzsj0mliskmvem0lqi0rqimubha6b76dihau1glfwvbps6b9e2wqnvy7uc2',
                responsibleUserAccountName: 'ismhtd4fs1lmg89o3b7e',
                lastChangeUserAccount: '8bw5iilbndhar154xb3u',
                lastChangedAt: '2020-11-04 04:44:52',
                riInterfaceName: 'cckx5cwqwzb7zvff7g8tkdh6tlaa00i712y34uhiywyxf2y1b4gyj3yua0qpobkvgra3td9ve1gcjapit7rorakw1g9nrfs1rn67klaz4hvtsa554gac35k9jlyl8x1km43ofx1g86ljhq8w0ensjwebsvkz2zld',
                riInterfaceNamespace: '359ctf3tcnf1dm48hu6jee2bl71tknh0q1yyu9dql7cn2w4o2olh6p7kzjppzc0kgblsuecu0c1s8bs0gk6arqu8xckn9f6x284tk2t89entejzppnuxg8s5o2ndpkbtlmrim0ad93akym6ztdj2syjsqeufhj73',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'ormuopyg051o5zxmczbo03h1dm4vnatbaqhno8qz',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'f6mivqmol6irog1z6ntd3xefbz5h60y80s4j3je9bzuarvu9n3',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 's5bf652k9nnnor9ep2zb',
                party: 'ylooi586nwivqj08kzacdjmhn96xbfq3jgwtx861x9p8mh7wlb7wzn2mj90gygw3q5vsf5vmszrxfk342km5elmnao6be901lx6x6ss1pk6fqo6i91eoxk2g72buim1dt94541xgb9zom3sgbbvahxaewsdgr5s0',
                component: 'myv0ka8iccpuact95suje8pzyb0q8brmrigh6irb8g6n1467gt99f1z0s0voojdby2dfy31a2iz58gn6j1jjumcr4y6f4249uhse2vktfigo9h3cgqdrm3yfvi6zqrcz2nixyj3ffaizv69m0fvz63xkpkf8vfdw',
                name: 'h9sv13osxhoi4u99cn4dvfgbgurplei19gbqzr8v2gkfz7cxpk1ik6mom7kg87f3pd0si1wlx16cvaelgls54u9jblrs32r0cluqk5e290jkefsqy6zq5u9914km2ab9jxfeulahykr154q1wbhoobdboohc092e',
                flowHash: '4jmbdx4o0djgut7exqtmx6lp1941lom4j3be9a72',
                flowParty: 'bv74usep6on4sur9m9mucauethwuk9v9ndhpzbfbmyon5rkx8tnzpl2tqz5dbg3dv0vpr1lbr9tzet413072p7ktieh39xss6zsrkslbjd9h895f8k4b54hrljv6z0v9ei6mtck0jvcjexud971cbo9fszbihlpe',
                flowReceiverParty: 'n7o1mnihf5dyhwv1sg5jyuhrwlhda3hqgm0f6efkkj9riwa7ozcuhsc3z3cmo5ymwgz07526dz887nskn0falhqbqbkbv6wi7uaz65lfn6s1x97vvg0j1eec2y0rvhuvzcklhywf3kph1cyo991mqw03u168nc12',
                flowComponent: '6x95x8ucj3tujq5mqblfiiy5425itv45rnprelda85ifl269gwthn3bfrqxwz28tv2ieznbei7o6k1n09rfo8z0gmii8s15aa66xz8spsbqi7jb08pvzybwtufnl9hpqwjb2bcyskfcgsc0jjamyg0karrs90nr6',
                flowReceiverComponent: 'ft56trpo9chrt5vy3kvkmh1ntt4btc5z6ih8zdyoooavliu41n739whtqlso3w44mknnhg75j0f7p8hy3ct2mq5wirle1s6i0o2hjjc7komhagr2q177eecf35bdw1u71tlq3l4x5cetkgwrrmr3yuoiu5qe9ma6',
                flowInterfaceName: 'ckwiivbwz0kpzj30pv8663xsvhlo207fgfqbon0d45x15iwxlh6vdj8i4x602lt0ofefu1sbpbcevmgdm8limo26e27srpur856hh0f7psh4myfqp5en2lezr4xm9edotunp06c9n3gdd6htg85bo55qhcpe454m',
                flowInterfaceNamespace: '1qydrr7c3kgt8nlab9e6tmzzzm59ovuu6u9sk7qun1t42tzhklx6j090dw8hxc8h7nhbu7tuihzyit9relksm1s6sb75pz1ih7jve0ysvl25l5j5iijqxq6obsp945ao9h3lvs1l22wjmw8o00hadx1656khuj1k',
                version: 'gptswo6bcvzhg9z13rup',
                adapterType: 'hl3k6bjxwxtnyqfe0aebxit6tnwv0rvjkxnw8q01tq8b62mbxxw9gwgaodre',
                direction: 'SENDER',
                transportProtocol: 'ir3l82bzvqpeerpdstvd53inc9xqz3kogzxbeimzjda185a2k3kmuedluef1',
                messageProtocol: '5uaz12gtbh7lr0eq3rgylkio2z2boe5jyxr680tx6e8vnkusvxstcxrli1eg',
                adapterEngineName: 'gphjz6q9dwn85qs4kfo8vjt8wbi4nexzvy6ntmntbvmecqehs7g04c6sf4axe72a9slh16kchspasy7gfhe9leu03j3hk14psfydmuk5v5mjdk0kzmvdvuz2tz5mc8lb9cn5gb47t70hlbj3f2l3hq4duam89iq8',
                url: '2sqx3ucwwjinzpr203voc51lkit7it7nqiscgdukkin0tpk926xb4bu97r967hl4y88z7d8mc5fg5oo17uhej3w64hpy0by3s8f9vmmwcomilzsis3eqdr6m9lp4327by3lrcp8azmrgmm11fwan4uhchevfywnkd4bk08u3y0q8fp7eyltqp3192tf4pltu359prtn9undkfq0ecxrx7zexo70lunbbw8an2ai6pm9z6oa03jn8gr50mj4drxjgnjzcn5dnoudqqn3qdcw3n1vh2ix5jbhugjakb2kl1h44iewhsmrvvz2bijixvt4k',
                username: 'dz3gxnh8inahqyrfp9pav2y011wl8m68inbwd3tdy4g9qqoyformjk9oksx1',
                remoteHost: '7eusqf43bc4e4m1rks9o2atpn2nwh1ug6ml3dhz08tvz8q3c2mq58gvcibhidxd04xotgywo9gt1qoo8oq8bgbkwevnp5fpxmwmeiqtd7bypnssvngmyu7ymvijbxcw63gs69m4yi3gzwebw2vszik7vjddsxb8n',
                remotePort: 9386975861,
                directory: 'zc48aht73ixw4fdvva43uf2q7zlcyvcau5nwseszeb3rtl4d6ikzhljxpjvb0z4yayons2r0tmay607l745ozup3zpqwbn2o7ygeiqzsdjinr8txll42etx569xjdpnyteziry7okmhp3cykwgrpu07qpvnzizret5gds8omxngfll94wjrao13z5xsch3xx18vtvl7t9sak02yv1fm2vwtyan8i64a956navy4xpeyyow1fduewthduekftaax28zinsmtmix0sjd381otzceehtc3daxohb4m3wha2he60ccwvpos6rawak8x22gustoayxw853se8y0egm0akckad0v3i3ea05yint2wk17n5seilcf7z26w8qyctbwjk4kgvdgbq8ocxssp9ygoyglmx2xyf2b3b5akwpxh4cs2qljyyo2n10jd0h2eb8ug9tdtgf9ywextjg6b58vt1irvta9w6v7332hm4z3sddy6oszwsl2wp953osj32fii5yuwpxcuhrszgt9fbuskjtz0e6oer7tibe4j515lxocfmfnpdigpyd2ujney3fd9255u8hc4njkep4amsgsyir3ch17r4yptja9m5cgv2ng1vrg5ux519qtsnz1b09uoc53wl14n74s6959l0ffgodogm7txawp75weix7ngnkjsbh5qzkao2cnf5lpbxahr9xyhwuiayymzl83115go6jsd4j8fnssqszib77knvtdf5kygkusrctr7p9j2lia234p4vrrjphz0vhcrejpflyy3ciauhetrht2kzvsppqyfheie2dxvxkf8nuvcr6m1kjrnqpf00ax5hbzcp59cll4matcgiuj4v52fwf3loqq9lxp33bvir9h58hzr6o0keyu5mtxadc9duasrec01vbjmio7vnfn8leitg39sd1j2hyna2kmta9q2vqtt2cm2hw47hefi8ntydgl0twm9a4yrhxkic9m6ilyqbc8rbeiurr6eal6g1dl90uji1qy3d',
                fileSchema: '932z2u4iltr0slzw5bvtuxmlmcfyp0amfca6ibwmsz60n47gx41nm953b4d3gitu7t519ixj22tnf2w8xp51et7e3jj2aaejpx7w6gvjskicode146653cd7k5kyai6ascbo4k47zmdrcpxapxtuyp43jqbvxqgbs8l4kmttt56j5gylkl5dgvye3bxwhai8vm2i3840np8i2y6jax6cqjohik1dmgwohok45mf7wlxo73u5ihthfw391vcvoa6aw7ylj6v6sbsibnqy3kusdh9kf1v4nh51mqimkx67x4pfeehc1yr9sz16ilyunyy308yyi4coxveeo3pumyk1mwd9gcxzl8iwp5dgjmqui2ckpsbz4rgfvacch661ljp72ezggas37xl9i8plmn9wf6glwq9p52iov1ort7x3ax5q3e2i8p3fcofhpj3p9vi1ibc0w87tr4v0pf7tvkbvbfv0fuactk0shixa3pra4f09nc2p0xv753ja702fmccpcl3759m4ymgbs2gizkufwi5xx0f0tyae8i9oa7oull3b0nfz0cd0ixmyks7qdhifj07vnwv8e406zjrx685ghu6kyjzsq0hkwolq3tivywjkkodv1jcw0vmoihyk5z3opsenemehi9bez42ksjzp4hfgjkd1ergj2fehyytz9bg6gpwb3f4wc0lm2ulqspv0eg40jvj0cngtdmu9y8ik1zdkqo3hvhw8gtk8lttgvh2rg1bdm8t6mfrrz42q0wzbrijde43foohxy1wmohr6mkwktbvmqkb92juvooibmmouss3mvcj27kavt51n02e9hcl95iobknlc7jff17dxs1mdh65wncptxg0nb8f12gedbfhc3uookvgessxxshqnknz2ygt412ugjcju90i4o8xy5jctrjixqvqs2l0gpknbgy20k85szbbcz7zpbrfzllruna5x0dry0jp67akn3tq0fdpq5irjds3ubbryl5grxj6wdv56aq1h7z5egty8',
                proxyHost: 'fsf4ugcs0c9vimocxjsngvqwrlondlyuqf3t8a9jempje5wcqaueu9sfay1f',
                proxyPort: 3808502479,
                destination: '18jzm0oj28i3rufkqmh3v7dg7c3rv34snd5jfqlhc3r8gdg8f977x86k4t97t6pm13rrct1b9lih8pr5qi71zsn8wqpwr7cil82oee6hq4qdg44n6nlkrztykvgz3xe8qdbxfd5mhrev28dvqwih06u2cm37bhmr',
                adapterStatus: 'XXXX',
                softwareComponentName: 'rh0ijmbuo0xa21puoud6z4hx0hr9mr0klsing02xcgi74tknivm5uxsj0l8v3nknfaa65xb19gv28gau7yvdyipz6fegteklwatmc80okmz1iuzerim2zq2uug97o9pcey0o6ckwcl96kf7es4l6vxq2dju4n99m',
                responsibleUserAccountName: 'stiinj47kbhf0m2u39t3',
                lastChangeUserAccount: 'o0sydcoinrj2q1tqbwpx',
                lastChangedAt: '2020-11-04 06:56:34',
                riInterfaceName: 'kbfszjetxuulv2q43g2cu63zp2njukg6xts9yg72x1yuxgk0r6rloas5xpgonkmhjf0fmzqtgles3azc4458jddsw7f2hb0dhl1s5uuszyzxgz8kznk3hdca0ifudne9ivnu5vj7djxgze8zxlvloljlccxlhu9t',
                riInterfaceNamespace: 'rre0xx7mn15zziz80x558d0rkirt20m41g688kv4vinfmgd7c565p301q8p4q3444gf1iqm5wpk0dggqc1lcjqetp8w72ye8dh8x64835ibzxb49bz0n70fsp1nvcreb3cnfz9qagi1bn0ph4rklbthieqyd3n9c',
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
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'hk3jngna01was8n3i3mauj6kpubl14ocifpc8d4z',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: '5kjxle6na10uhx5k5kxf9hnn9yxtnp20res9ktyd11gkk3g1lv',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'p2qgk9zyhugq7d614xdg',
                party: 'f98tn6vsgolnky9zidh1dd6ogqvekg7ub1fonv7sta5iqyr3lfurwmjbybp30p4pd4qupaia1c3ukbs8m5z4ueiqr5j2xx9x6611r0q7ue78notwzhy8z24cousjamg1f9ktg7uklntasxpmbww627r6vx566gd9',
                component: '32mm5s6okcvpivdl4s20lntabz1ipt73el53wwhitjihyiu353tdrj1do8t8uj6k9wjhtrgpyp92yag43r01ycj3tow1nbvlmpoihx4nx1y4vq1qwrs7r3lk34jph1dk3szbhha3gqanhxg6zpashjb8na6oggn4',
                name: 'pqsklz3fyz32o6595692f6cwgl0y0ytc9nuv9yd94pcc7p1pzwptxwvatb13eg19odzgz323vnvuqzodrvylqgn8r30klyuild9zfzu8ggnv1qg0v919a672czdymtk48l9vnjzk6vj3vd0i5z1gsg9e8jrknkic',
                flowHash: '3vobif0tlqbetug2t74vj0wpicyvldz78sakhwjd',
                flowParty: 'jotvpkp1y0j4ipctrokd9fizaiklu4bul75lckwbis7hvh72ucri6604nzibkt1qzzlvaww1gc3i5khhcp3hr79ful7aq561ta16cvk9p1rcifj0jhaq662yj2s0ubjwmz7sbp8y00pxqn6oxvr7gvsvodeecebu',
                flowReceiverParty: 'pzlmwlqmutd58ek9hma8smwg2t82ag61p39qy4p3vgjbenlof85xv97xgq1g9r8fozodad2o2b1r7az712nhh56crepg90a3qvzf6gvbh7irs46dexe4qasrs0dqfusqo22txf21lgbyq2do5fv9ugca0vlcz2hm',
                flowComponent: 'bjiq6048df29dzu6hllldaylswf8wx4ulnropl56ncr4anu0kcgfuvxftjf969m6ibn1sza5t5jp6427xwq4gl6evjssy5eiwzj5rt9pwf3ks0px8tvzckv5r4b38o8di4utlpwpa7k1il6fw905ecivp31mrl8p',
                flowReceiverComponent: '2qd4mgh8ybmapmlsu0ywezxm0ewwzyplscn5idl5hx4wk9cvr9o5w7n336y2mgkse0jzpo00m10sz45oi87ioo7tzkdvcyhk5gujb6wr6iitqz9g1pvlfy240u6xna9oeewpxiyh868fec1dm6zgzfqyb1qyb9x4',
                flowInterfaceName: '7s0208i8z4d63u30h3xaj0f75lug69uzjm92w7lkuptv9zribj8eqr0hqr4go7kl7lc81zs826absvguybisr8am30q0p39a4g92jxj9kz2phn41er1qs24skaxry30jp2ecj90f6mh2i7b50f7br6ij2pwsb0vw',
                flowInterfaceNamespace: 'y0zc0x9g4rhe26z4koiy408pj38xqgmhrnfsudcnqvab846xbfqw147jqayafqbpz6z68ksui2dlr2bzxkdrw5z129d7bviim1c00gonmnpbyksxel41icd7s6h7v5s8bwektlggz0ec55tl8weysg4fqdv69m95',
                version: '886evyhzpeac3tj2mt7e',
                adapterType: 'y4dr9rbx8e2x934aukw0wrl0u4iplhsn416joyht5y87ynolandfkcmbgbmg',
                direction: 'RECEIVER',
                transportProtocol: '1bdji58de49i6v7wb2vbwwu8yzzt6mg74cwno2pzbgwytophkxsr72l5afdp',
                messageProtocol: 'mjj4lr3jy3uh3s633e8rbc187tn4z98c1utop6z6qxjgkpxdnfp4czx12y9m',
                adapterEngineName: 'v4ksq72ld9249bzeemy5qd6xeclmiwulto024lxui7do2se2ltio5yqgiss8q5abp6jfx7q7tb45nte7tpwkj7uffnr99o8vbowtqh39l9h7kzn3mwa7idweizl0jvxvu0uuelvpp4dkt7r37uz13xi76lqp2tmj',
                url: 'y0yvm8j6y8wdgz8gtqlij0i8cer93iihmunft5fid6xl3gj41lj4axa9j6npihgcbefn1tv82qlpr4qin2qx3qhuuhoknjdtlcjc5550fac9b0binhpt0bnxjb1myng70eq7n1951t2u9n9u3hu17dr7ax0yxb1qcy5s3dsl40irg19jkh3o5uewf9shqtq7m08uplvvwku9cuuiyoynixynpvxdneufufnrgb9nm5zcla3yl3hzj005icnbxe2pak1k2nnn8rm2ep9m2syypx6g07guruhyjh74zjqd5y29fhqdfd6v4d4rno41o8jo',
                username: 'w78pg427bu81jvdqi5hbkn3stz9zitveblhdb8wn2g6equo2wwmidga0nvqe',
                remoteHost: '1dwa0bjzx7j3or9misaw7j0l5mkwjcsd4uz45zv4qidcyy9s72mddsagaz267wbrpk09pvilewbc627tm4lqi59x2oy2286sq1erchys49lusm2o88jjz168vi1yz5x0sli5mwlcii3j8cs7ufreqzk3q25yrezd',
                remotePort: 2785783994,
                directory: 'oerum9aryu6ioiftqu6kzpmra7pooh6keneyh7ekx9pg5caudtyk0ulmpghxcj8j60yha16sti31aew6oy55yr3nvapy28z2fbbxsm1ovzualoqzk62ja14svvnl2sssabjlxgn9fty4fi5qrs9vf2170c9ygo0sd34z9h53ekag5s8x3mr8jckkyye71ep5igib9gwtofysyeffsi7w2402a5ls7beaez57xq77eegbvru2z65o7wgvi62546r95avg0e8a5txua64fd5oi3c240rujlxal8kgh5cjxiex5z1j3owwcf0wu4k9qxnkzdx2ibnyywojkmsd2gz0912uqbdgmn9lxejy4swrry5ba3e80lojn59l88p779pwr6mtxladtmxh30jc57ulb8s17xzed0z1ryqc2fn7fhzrlporsonr8ka3n9p6vtauqem07pd5s7kzuuupl8csl348sxwm91fw1b60ee6tyorgsieuswxz1zacotkft1wos4js7vvfvjvpz8e1uwst541gum35f22iubapp9wb2d7lcyirs6d6px14gtqoaall4hj22gbfaf1yjdbz95heqte55bgp9wn215x3n2a3lm5a58b7iglqenot9kyzwqg26hvl5f5z2lqvj5rq1unfk0ae3g5x5ys2tje18cc6dw8tdfmlaz03fwpcvovdjt8zk65mdiboswjbklvxi8d14pxcibqed3exsh5qw7fw4110m41juezivu7ps8jxf4ip9cvoknz0d3dbtrzhqw6l36571r26d2fe72520vgrxrpe8bcy8oe4m7rfcta8z8ecwxkx7o6nb004z43d81a038u5vuybqhlp867y9ehue4q2aq37k4xqkw95t9wiotjuksbp3gr6i2v5wjufchpqlvv575m470gz965mr9yqw3dyz510sjad8s2wse4e3ij8g2njhzav2httcl2zcngyhgdkvm4ut6fncvpx6nayytpldtuvqjpnbg03mwo0zunbj',
                fileSchema: 'hmhuq0m1p79hmtnko9fv70lgfqruy2691luaweai52iquy888erzcxc802lhv0evyxrk932ycea0mycxmnx3hz8wtk5m3v8rvi8obyflaiti591ewwm9ksj4f3c8mbcok0dpjdzieya762c0f4ri36d3j803f7103e1momolv828aov1zifmgk258ljvuquhjwiuhca8q7fpuzka0mo57fgh2th6x1dzp4ph0t5f4dbtc9r9n9gks4owqg48sl6y2q5mfa2iwemyvencbzbmcn6jlbt7urbuq8bsxi02m6x8z6bqm3o8ki1dqz5l7pkglj71qsmdqgj99a9hllfw523qfpsftsrlmcv7xfeheentr33rct0b3n0rjqrpg7kaox2f9fwypx5u1sdh1wgbed97leegbvnvnxwmdv0y4x4yijq0ubcmbml8mr8o6tux1f2vvxmr5a2bze73el1iixw0bg38lqvi7xhc4oksqqlv0b8752nxy8w9c4dyyhazr26g75xhpwosflfvm2kzwuxrpvjcyop4z9803u4t4jxonlud35ym5qxvvff82pkiwqeduwiy291olhai3vwuxq1wofnzx5s3hhqyz5ajjeqyrtjwh0dmqi3dxvz41t18o4jv9mlaxkp6exdnlaejlmnn6w7k6dn3avjfi6i8mjdteqnpk5x167dgx9bp9o88aytnenjln1nb7pm4ec6hk945rx55f4rghhg4g694yfcaqy95kjeo8vi76ucros0g9hkdjpzb08c7xmuhleragd7n19l62zigmc0rkmcjpkrg2m59vmmdjtagwhljkwr0f0qaq2rgw5avnlzo3i1grhzu1hzgdb8d3tvv459wh2xmtz3o00lgb4p7wl3el3i3kyd1bh95ob8hbwlt74b65ws4q20fbays29hcyq8cw8ueqepf3cbgzr5wsl006dv8smwaojk7g7az3kmnos1br0vm6ifhm7vhadd0jjs8bqst3x09zotkkvc2tzgggb2l',
                proxyHost: '22na0bbi3khrm9d9i5y80aqrzh3q52jzsht0kb4kayid9pabxeimyqtic16m',
                proxyPort: 9828744595,
                destination: 'hmpodbqkuz280tm65zrb723ughqax60w8ym7donbzxukenx0oa1hgf0rdl8oumjorgded52evqpy4vjx8qxwxq2ilze2t6ty2maw0crpou4nh1ssv6wnnwvw6gh4mgu42zxk9ouhz9v7amhgal08q9uow5a5p4v4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'jb1vu7nfmrbrr34ep5i689s8st9dupkyt3ie6otc3if3scdcj8zb1qaksphr5kp47xoc6ya46o3b2vz11xzxt37w1b12t4hylf4aufqrydb7onxq6wqx18j61kitptl7r5lcuodeaou56cam0myhmu8ewhmn70yo',
                responsibleUserAccountName: 'jl5wpg63lt6uwnh7ksdu',
                lastChangeUserAccount: 'fe0dvw84a1ghovt8k3zd',
                lastChangedAt: 'XXXXXXXX',
                riInterfaceName: 'na3ryj5izyz11cfu89u8af4qmv4rtmijj2tz0l5eam2v62despzqkdfkmewgg32x5psrobe30qertchqpu2kg29jjkzvrx9bru9uqke0n6gb4xc69fy3w4inac56pgx8wztzzjmx1zez0vloql4w4r5hwmi3fq24',
                riInterfaceNamespace: 'rq9a8gn01030o24pw5cdx2g2rewvsq0jn0ek5axmpdxmnxm2j2pcc5l3lrfdh35mqgy2fzn7kl03fqfzt4t16q0ulq8kby0xtgh0cz1ibue2axkrsi2094pebeziki894bnt9kleteoa7suszxiljag7rc6hoo1q',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangedAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/channel`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: 'bem4wyxa30551kamfh2u5pd55ot57v09hogt1wmp',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'wdxwu9d8yf36wj0qt72fi5y0y67ttw52ryfzuk8rkho5ok9ozl',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'ddlh32sn1hhxw104xu6j',
                party: 'kh72q4bm2jwsf8aixj5heivf4t78v5ygiyk6xv3s88lt1eqihxnr7pehnsniq7jedqan801l8vovhwxubytpt5kgdv6gi29gme8q2febfdrcfz0zvih4zkmahxyjxisottfr8rd102k11mqxumtvfeafst4sdnwv',
                component: 'cov7zefduorjtxwr97zpz4710zspom95zwt29k5me9ng3r5y7b8brsmbe8mjbwbsm764kyxhuu4zlf1jkx4mexjczr9st6x04rntc250f02cecx1gklkukpullfvjm943urnw1p0l0y0adp1ycxtqyuypwaufeh7',
                name: 'z9g8is6sgu6t87qjg57r7e6fcs3ks716wzh68mn0kdvptuj52f7tdkksdiqelwtchcksz4gegb2x6o2xaswi3nsh9y5vv6zk3qz1n7q8q1hwipwdc0bqqvujrbr39l407sd38zuza09jkmac54b66wn05wtl0eq7',
                flowHash: '8kih0q7tvz47dhoq2gqzl64tkus6hy73ugaqofm0',
                flowParty: '5i6idob13wiyi0mztwet19xf5glxe55ek7rqljiu45wgdpau4kqybnqqk82q34kpay4fauy9d3cm9soft1xwcoevo60sbs3266oegfwxrdmszsvk7m5sl9ax6gpwd4nxnfuhprakedsfah69jf7lt5hr20kwqaiq',
                flowReceiverParty: '802us8wt7au81cyvozxmap4omy9aly973v0qznqeo1f6fnfvgw2zopgosw5uxo19fp3tjw9rjwmyzs3924qq08u3m23jcop97w8ktgbnximxcl16gcqzw9f5zqj48h8kqaurlm1atkye85fzvd1ws6i18hkpwh6u',
                flowComponent: 'sz9xgwifi4y1i1qb371iupywetxvy133uihdo9q59d8ir4gkyu5d77idehu6nnu58cen0lvee84u1qd1c041843dn3w90buoglxe6tsv7mnt84y1lri6xofsfjf5cf941tg015t0j5lvxbp1erkjvv2w31dt4u39',
                flowReceiverComponent: 'xsppm6kcmbwn65mf6injm6tj4x5tll9bd8gpgpdfd8zdm7ubjcwe3m5k0fbj457h0f2p3zet3flg5m0glotqs9kb1ddp516088quh50ye9c3pspek18mtbvg2fnx0jlti1n95j3nmy5fr1dizbwuw3u7lcdblk7n',
                flowInterfaceName: 'jaknqk7vx83qcm56tip9i7kpkaidlkfnnmshptlgjpz4zoebwr1u1t5p3ewtvrbmz2ocysvxq0ho4ywqjccqjcjkoqma1e6wxdqpm7hhnjzog6cz352djxeye7abuy088mr6sis0if3juq5p6qyb0wfrppxl8893',
                flowInterfaceNamespace: '0fawmd9ad6yk8ufp16msqs24eoaxscag5k38o8bay9sev5ql0uiaoc4ojyqeeucaehhyv811wgtewglueaf1q45ela6nqr5qin622qi0894hs4qkq6oc8umvj2m07b479vbuflzn17rjsvythrx3tphh4prqankq',
                version: 'pt2lmr2a50knl7mjngp4',
                adapterType: 'j2greeahwcu1es99zm7npity3jqqmvbm1m864l9as8pm7zmwbhcp8czccvb7',
                direction: 'RECEIVER',
                transportProtocol: 'pql86lfgq963ddzfbv7ztvcex7jl7iz9dpk78vl32gk9lio2dxlrvm62pxhs',
                messageProtocol: 'yemif3d8kx62fnwthrb6lp88o0t1md6uigjudzfowopx3yitbu9ptmxz5lgo',
                adapterEngineName: 'ra23jd22qwfvqywsgz4jz8l4au2qanw2ju222yz3xsnkozoe0nrrj4jn79djdiqep8le3i982lab5m9hmps09lh6no0ic4o5sdtumaby056wvn43vp2d1cooxwwmnvc5ornj19yujk57fprfxmazpv4dvsw4wjc2',
                url: '0ywauvsqffb0l7gx5l9ggkxu52ghl7qqdhek17bktbcf103kk609u50gcq0j7kvuc5u4puwyf0yiclvwtmwn2qlmcb5wy38cdmj4jqmpkgv8tt9og2z4m4fd7sbrdmpejrjxc2x4hapb0jugnqmj68mgmp3pattzuq6gyxpmbszsqhl5hysb9uiafol9yjcgxpbxvqi5bs8jafdr3321dzil3xedtj1plsce1f2jlasc489n4gbc4gm7kccrnev9oub1rbvbkxhy7zoldynmh1znsz5vbcvi9fdmtuejvxuo8y8cksxnyzbcg7p6dk6j',
                username: 'blc48dk0ekxl0fms7f9atywk5zvd00jp4gt6kkcha4o6pb70i5oot6h3mhil',
                remoteHost: 'uw39g2d03pszcdg12243qavkiv8nk93kjzy8sdm289lisgnftawneynfwfmrvyz8yznzs2ob8x4vr21jm2sudv394w7i4blviawl7jx59tfyixvwidsuq1jos33gg4ujrdzlzz10yow5ft5s10g44jtubhns4v6c',
                remotePort: 7767613841,
                directory: 'gglt84tw6u7gs9u0jl9r989xeuw278mwj98j7uzjluteny7ncodsu61cebl3le05rjby4y223m0wxl2dh2v2n3j7dk4k7jr748j0uc2nkcqksn7hwqdoj06fdg07s8b0jrz263jlyl2f1xtu648ukqj4oe59kuo6u97xlm1lm0oqqabbggieyr628oy4y1xw5p6581pd9p0jxzdkrawykrdno7qv039c3w9qkua2l4wkfwh27zgd9uj3cxveipvc17572uriqq6nxoxxhd5yem7u9gcmzkwbtafv9k9ajbzp4bivftlj9tr14eb960y187q81nuluxr9hbw8czpfyinnzmsb5shytbjqbm87peigbid0qdej6k9f6j1t63t5foyw50jnla1imj1umji0xo4r801xj06as22w0ugx6slgyd2yocumgljdpatlojk41yzcqzf9iglf6bty4vlmso3rv1g1u7raezdsmrqy1s7s8zb8nlv7qowtupki8qxrmomnqh8qcms7xx65zryj32dfp3o11f4hauosz7xtqle57fhb49pad2ylunbno94pj6ahru6yi4jturp4qrfg49ajsudfj2mrel7r6t0hnq2ktme8l33nkvh4l4yuaagfx1yendwr5al6h4it1bdbc6xak0aq7zwjz31j8c5b8ano66err42p8d1fo4n64dnu9k57uq12ow7o18cnaoqiuvzlgr0rwd53g4gzcsivajymk9y0j39zshigkarqz1yey3ipk39buwaw8uylugpdlqotfmad40d3u619nocerh9xy9j5j3wdyp4j8jgzpxn6r0dd9d3p3mw1y8ostf892iz81vg99x26hloq8tpuhdfyc49v5xjaraepdqgv5wvjkztdwbmt0rspcx7ernm7f62bmriuuyhl86mx7abkvikg25us3lhrvhynthageec5imjtpvcqkhpk2yxsx1fleph2j7u0ulnid3u2v8s6yzwclxe31l5oet2u4livpe7o',
                fileSchema: 'e46zi4g1hmlr6lud6fs6axh979dljntryt8k325fqgia8hre440qaw6ywbmqlb3jy2i3t1xnxeumwcdwkispnr4cl96d2n0bfw3dqiq6fus8oe8agapq0sybkeajerdexalfrktob5wart7qx2ot5zyjeona8h6ft4dkfmmi3h2006b2zo59129littkfqvmfkddj1fy08kuqjth74agznvgp2qsayvxg64hvaq1lgbod56vyn314roi8x6d2pf7axm761ddpuo6bdyijhs3juw64ikwcsckq3svdly4f1a2e4aldrrc0iqznrd3voolpt23f8golxsae8j0hm497ul12pjzzyvv56jahyj6rq17pan3hlphqdag7iq936dyhuso9dq9udqs9psxu2hj7rpuz081nytsdlwkjk7durrnxolm7npkumh3hf9ebfeo1qzx17sjhj8ikmzln4zsunlnk5wzddkbyduwmvwzl2xoravlhyhc8lmhhxsbjmp33zsju38h51h1clig59k9z88xbrrr32iu373eg62d0nj96r1peu0gewcjvz7bw4q5n9hrgspiujg0m78z3su0a49b92ko1o0v16wxez4kdy457p1ty0xmqoe0xvul7e071r07hiqprwxuzu4rfxihyhh7oxmzae1agxy01myaud517820xxs3z2e453rzxfa7benm793as5r5qjgdn1enxhj0r8jufmf0hdclxdj48f2b6sfgew5uw3ma0wcjsy3m754p7onz9bxuwprffnat7kymgmhiireysav4i10yrmi4tn0a8tdwp4dheht0kqyfstpidetmjzyi16o3zllf089x76lx9kwmmrmvu93759fbw12q3559j440eht5a2f5gh52n69wi6nfa56n7o62htxgcnihbmtlo4c3ml8zuoz9p0go75w4ohloeqvuxgp1n17rr58t3tze75b11114dl70ss6281pgvco20sp4orbhysqofshyyqi3hgnekl8h',
                proxyHost: 'l0kzj7073vs33cz4h0119qwkuebdua7y7yfxejvwu98p7dq3k51er0hhzksh',
                proxyPort: 8703249617,
                destination: 'x8qqnk2igh7tltigxfspkor69kna6ce3q6bot77k5ev1igfsx8voxjpuetmzpc05q4za8vj747rf9ybc4i1g3u4mw1t137dcmfin85qfa1cds83ymlqll95pb1xadnlivd5mh6ihg2avqcdrd1vffi49pgnc292f',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'gloihipwzfljef2jfvx4ahswpvgtls4ebopistvpmdc8tl7kfk2n2a1buxbba44bd7pvx02lmy7tl5ok80j5wu5q2301iorck8rma5bg68vi5tf2tnp40xz3sxdq6w1zun3yeoz0p4nz7oysj4sqv5m79sgyzsq3',
                responsibleUserAccountName: 'dn58udre46qbghbx75th',
                lastChangeUserAccount: 'zqnwecp1krqhugoutq6s',
                lastChangedAt: '2020-11-04 06:23:43',
                riInterfaceName: 'cu732f77jd7jrch5m172dbolivka5gw8vovkzz885mannpbpifg5h8qdl1os5va9e0qo65k1povrtqr351ytltmpno9ndf6ptelgk768h4nvn92kn6ktbm8m01sp1rajq4yrdv90a7fmz25dk5w911vy8s6rs0mc',
                riInterfaceNamespace: '6aikweq20rzheo7vo5yptomb6bpu0xsuy13rxgxari2lu6o5yc5nbtngwkkg32x1rv9o0i8yuh1hau29w19vdz5xg2yu8wo0a5ye0ul74ikxzcv8e6fabtwjc7fvrc4zf3jgmouoyx7h39f3p9qopyuk6iy6c5ae',
            })
            .expect(201);
    });

    test(`/REST:GET cci/channels/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channels/paginate')
            .set('Accept', 'application/json')
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

    test(`/REST:GET cci/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '243affb0-9899-4c91-84f6-45c0e761dd9e'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/channel`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '077523a3-258a-40e3-b179-93814237ccbb'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '077523a3-258a-40e3-b179-93814237ccbb'));
    });

    test(`/REST:GET cci/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel/54b55895-5b6c-4e12-87eb-23b2b3782d08')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel/077523a3-258a-40e3-b179-93814237ccbb')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '077523a3-258a-40e3-b179-93814237ccbb'));
    });

    test(`/REST:GET cci/channels`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channels')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '0f47bab7-9447-4514-8b83-5501aceb3c8d',
                hash: 'p1p2i0b09ih1fjgk524ujpje0l3b9oq66xgw1h5v',
                tenantId: '29e5e5e0-2e63-4e3b-bce5-833937cd2493',
                tenantCode: '339yg9udlusd4onxr0gbl0it605weveoz24iwryi2qcxoiy3jc',
                systemId: '8a97f561-68dc-4fa7-8829-24106c8d03a5',
                systemName: '2omu714fxkrld12heryr',
                party: 'wjw8d8g0cusq66pb73dg4bwhirikuh79ogmc564c2exm8bgq4wsfo4kb1ik3gu7ga4vaoosrkllae6d1enuti0j7ijmyf1xliv6a2plx1gwshj93v4ct8g68mxni7zzvt8so29mirmevemf07d8b90ec9hlz3hth',
                component: 'vkluq58oqzbu5m8oaxajup0tssrnidm259e0l0rd0kyru2ym7ayliukaefu7h5ss18daiuenuma7rr7n3mvwvr9in0xsv3hc01h3uhy7wu6waozxty7pvgbs3nj1871ty2pocowpckwvkm1yvt0u6z4uzo2adzq1',
                name: 'l7y1xv531ust7khes915wz2w5csdyxyvhsuvq6vjaggkbpmhstwxxekbr7vtyzbnk2oaobtbi8krcmaxirczlcaatealrtn6eigbsrohw6dnawa7y257kdy1uglqbe0xrz6zz5fypsck8e07g11g0nlxqat453q7',
                flowHash: 'hyp9cz7ijnfbmswm76egneyiapb9gc0qqqxzyt7s',
                flowParty: 't8641u05byv2u3rj031xny7pjf0dd71dipaakrvxh84zw19uxlbtjf6pe3fue0ar8z1f1km8vtr8xsu6skv1v9i1ydtx7h6r0qr2blgl419hpxiz68wv7bex3h2timk5fnz1kt5bcaflbsfnkb738lt4h33z9pqm',
                flowReceiverParty: 'n6jf441h55q8ykbgbgx5zgswhd5r31152g9fwajinrl1bdwy33k8ctc8co3202ge36olg8x2sh2qe9a1z0lub995d71hx8u3kmhh0cwmv0spquc2ct18hmiadpopjy26h6g5r0bbo1h2p8km8ru0dnatpqo7rx7z',
                flowComponent: 'g7wzgqpimq5vd8hkwczlmmdno431klq1lnxhkr5u9e65xeeggakk8jq47pvjd1cvbxehc5xqmiqbsg11z6j551fl1szmflcz52zjlpofb2gqmthwtxkdspdy6zjoo7c384auwwwynkkepxu4tt5sczffhoe8am5y',
                flowReceiverComponent: 'pnz8je3we53mz514mtcqabp00zg46wtytxpm0ap8cctww0iod8rnpnro60gul4nmudgskpu9k14pr15b19q5jjxnboas9c3vtv8c0t7m7ijz4jw8bzcat5qoov2xyxtku5e25hzwl5eywme87jow2mz1matpl89d',
                flowInterfaceName: 'dyxwjsb5ukpuuj352yl47dss4zof6ek132pwy291fmv46izklou4lvk7n1jwynx1q0h9l4stabbt7krmei92um77w2nzn7rsi51nhdkm27l700djzzk0s9ezeixysnds7u1skjwu0y81vkf9769pftxqvizbym5n',
                flowInterfaceNamespace: '8u9as92l0n0njf8mhuxkh9pw8qmf1yfot3zhvghjymvfjgcvwd5838ynysvn2m85iznyntiojnz7urw8t9bfzekrei7jbsjokvscppxa8dahd8g4b18dlnhwgwk9rhkuikqevshxbgq4dplj0mamiut5zizvadjm',
                version: 'gkxfjqbc9omcl9jkgnab',
                adapterType: 'trs568m2nm3edxosszk7qyvei8pxzzrnyrodj87m32831xsowcd4zmz8dgms',
                direction: 'SENDER',
                transportProtocol: 'wnrseo7mwu5pvp9v7bj1d92dkdbr5xksl5lmnofb1bsvela6iajw0pjppuqz',
                messageProtocol: 'c40y5a9ceeolefh8ascdhuewgeel5e4d4ucejsftm9oszst42dygh0d7yi56',
                adapterEngineName: '0imwl4r9l4yh0k597buf92mceh0eah295ls0qv4qw3ewifbuqgr9pcu4ncfi0hanpgitqm0yfxott5kssgpp3hrpwisjhliegn1hh0auhqvxn6zx7qd881dy9k6lu8fx0z8hqrjg1zjswzq2ujaonl9zmqn8bs9w',
                url: 'jk44x17oz2rt2skeylwrb0nsgk8iazv5bpg3zl3j9vz5ms9vroxjuco5w3jklrfb4q28nw355aslvrczmtlr1vynq2xqcnai4jib92nrjl49ah3sg070g4a7r5nknn2wgjjmlem77z7xc3budqd0rkqos1e3khd4s2i3gjijrl5ghz0dufxf4hmgvz4qa9p1pw8q6ogtyrbgqbeohisfhx7v8zo0zu0ex2hdh9l9pgqj39errh4mc3vsf212hz1rzkfhnofuyco6fl4uz0qqok5b2w9htoaf7cz9h0art57hdv5c9sq5h4hr1hpqibym',
                username: 'jnpzbsdnx1lsif12epek1jn1cjf4n4jgkix9xcd92z3uw38amzzgcquna3bg',
                remoteHost: 'oc6gx1qwmasxvtodqhu6yng1i0823mw9mvoknclpm9ljcuxk0b7trxauz0kez6fhvwttdlysr3sb6u7s50lbjoi8l65n3v4i421x03szp10i17y2dw44dn62i2j99q8kj5hw20can715geua6l2f39f83j5rh90a',
                remotePort: 8128192982,
                directory: 'oh7gbu6xc8aoqxvbqw48edfl4r6qjkkg2acslsnogxktep76oqcc8oy66ojxhg1m2km4z3w21vbm87zvm2nr02xtb8y46xwicsza4hjj0kb5ce4414qe71vejgxv6qbfus3k7rb83ybc8alq164fxn5bfr76vf73qosdf0rl2n7z2rbfsvn0374hf4b1uf2mhng8fx4gqqzog296p1oq2j9jsglaraq8vek6ratnbtjyewjjcdlnljtf35embz2n1mbxgga27vfc62mtn0kj7rrmlasdylvc7ypxkpgf6mz3xmaum9w0fatla4rxspit1tgewxm56a739hylj38cktjmxd7vxj4dk4fid5wgbpc45tawl1pn4sraokckgrc2wi6pgd1lvvcqf9zdqni4f2juyvcyux5m1apqasb8pp2y1ww2dsz7jmov0cgir4erp4pvxuqfb74wloecyl12dabgly4kmpqe81q6of47md90hjjg3crgwwnifygnoi7pvaxxu7sactb8scpnbk6df3qxtfnix41kdo64zno4hitlbby5r1cpm3gb3w6xjha3uv22d3enp1aiif70ce6s2q2x3e9sqakyvegsrq7li4fkf7dxdhejcr5ma7inu2urjjyz21ut2rblrgtyyqrwwos0ep80r4sjtsfa20jbzivijlirgr4keixfumo5qj8d01grbvt2ortlrk5hxndu7dpjmptzo3vctsd1rsbvpzh8roeu4c7t0jm98lae2gvpncmayxz3rom09w2kdeql41vr58vmn2k59kbtnqf20tr7icyur3j1svp3qtumx9xdqg9nyesq3ueu5fp31phgacihm45zlmypt026uftau9ljbf2x66bz3ab91lafkztdm5c5j51ackx1xx433wpxh37w24d0gx8t36jtl3v7w5ybkovb4yga0ft38ndn9ewatr8frowvpv4c48pkofzp7gar5bl0mqtfkp1o53d7yba3unyzabko1ts4eqd85n4m',
                fileSchema: 'mmhu9b2kz3pkdu49lr9ybqoq69wyc92g4o82sg03q1p9j20yfsndrnh0weo91bfi8ymiw1dh3khrab1f89p2xuhlop6gb3pet979grcvgulmegipc59a38gj9z8e6ns3qk6at6zdltbnhtb1kunslt0aa1v1ktmnj32eso50ptx520447enf82p4koawm8vjqfyp0a1p71kwzyf1yjt90guafwpu6olkbk7yutzqajkgwyb8o5l257p8wqhvzhls0ey7o7zi0w951iq56k0gu63v3tek8zwxh1gpg9ormvs14fsr2a72clea00wgqfkb2frln04a8ektwwt8qwedcjv8np5emazlgk22ks8uxt1bw5nr5jc5rcs85lasnzkkkha4c8i0hcxzmbiyufhw6pb24po6ay1valg0ybqd73x3tf64jkc6i34n3p331op0gb1zfnt815116zv4kun4ddg5wtvg7nzsu5bglnk7ww6jth7g5du8j22ra6vojgdcjd5o32nz6ch8kxrh6d8aniz0dihtumh536box8ru72cqng4gflipemg8wwookfnrsdedcsiutfhrjg19q1r6hh1egsg0dyiqk8vxpii0cceac60t8ty3i3m88b5qm91unlnncktxqxpiq3sgeeufbr7oqjvjx7jkck30s2pt5aztizijswejhf4ayo0qvc6r1zdvv4p8tjro0twy37q2lebxl146q2b5dbx0rwf5fa2jp03m1x57o605cli18sqfxo2smujq7li4kdabsxms28y603fgp5ldtkk4qhasln5j0opubr2ayvljiney1ytp81x3pv1f7s3krtos4or5egygr2ca2ez7kbcewf17f2a8tt3uog9ohyrvinq3m98573q9psldlcv3hq84n0a125mnylm4l2rugnc5tbmc1nyih1tmmowtioig206deo1jlpcpuxq4vw9aj9ohjr7yx946b38dyp3ocyh0am8jayrkcnpxv4h4mc38rqsqmzho',
                proxyHost: '1agncn6wlbvyjgm6w4y1d8n64f57yq1yws94depsjrs8qwe8752uowz9dp5j',
                proxyPort: 3127853566,
                destination: 'k9i1n5ey4017udjr84igaek5wvfd1elmbsbb3gk1v0fzkxvu40ozs4hxmzxbpqh4qo2m4me0ugtg29utw7l5225k96hel8ghahl3w9tjc7jmb3d7hoymait4527zlx6lqd21ymheyzkllcdpzq9ckjsikazlmqu7',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'at28u1szkkilcu7h4ojhyj5g7evc5yw8dnhb49v9wjg9v1fffz1v7r0a0emj7c4wmdjd87cz10miyszohlp5n2l2rr1wj8d6gm1kaops9uh78pdp2zcblzqtjhsy2glf2kb7xmtkg8bww7e2xdm77zp72bozrb4q',
                responsibleUserAccountName: '4kob0n6c5x021856mweo',
                lastChangeUserAccount: 'b0qfez04998tvm0pzb9z',
                lastChangedAt: '2020-11-04 03:34:50',
                riInterfaceName: 'fv5qpz85tg9jrgdhlntmtz9ssw3hsp4bxeclv5wr9zf1nngcbjr1zojkew68hbnfpgi0jp5l8yw33l1kj6hwleysdj90eyzrojrnlsd97iuxuoqbqerzrr7xt53dzqbelabntxdum2ktlvadkwfp8eb68rzvwzvw',
                riInterfaceNamespace: 'bsey8xyfyfth173z35n1sw01y6nqcjcj6w0sv3ihr9vnkthiee1ry5zsq5pcvixaodpzvavkom7lpnw8cyxus7ymspru2d1cp3rkuavnb31x5yqj6sdc1g92n3iun6fkgksf4rr5xczusm7dqpy7co3hzh97zl8f',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '077523a3-258a-40e3-b179-93814237ccbb',
                hash: '1345ojdeaqui9towu4lugbaytbp4r1cj3rwcjxf2',
                tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                tenantCode: 'ad3zxmc9xbcn73hhakitd5trehhco2wtj8lnpr3r5a67k5ng0h',
                systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                systemName: 'lst770wz055b3o43cltn',
                party: '3usvvy1db3iuuu423byeb6bn8yz1yhgw1dbqbd43kd7g041mm9vedgvu48nwgvd2ami6orbxi5ixciyvou5x28qi8rjdvp7xr9wr21q430b8y9pfxw5ix42bale60oj336o8mcjll3eir2fs0qnydwnqf4wld1sb',
                component: 'fvsg6sfevu3h0njrywy8y4jqvm4hj9seu2jgz6vlkzeveoo8bm78dydi9d2q6tntu27feq0ge16ttcb16ydvjxk5vcxno5pg0pvpha8lwtzxux4hby9wjtegqht5t3nkxjeea7q8ty28h8mh0401peov5va7uefu',
                name: '23fjh11sph0zl7wf590b2y8fox12f949ee5xf3dl45ufeaefeqlwvz23iykvj8wlqgqilpwkeags5i8o79unias3p8h8c59q05jzepyz44vewf617qqks2i159jwdq77osihgbfykkuqqo1bj6waoy6d5hv357lw',
                flowHash: 'ne2b0myuxprzex8szwwbbwhxx1v3g5fue1woo11n',
                flowParty: '65kaqwnszbq2p1qak79dvtmtkhm7fsfd700jxza6n7ku59lgfv3qt1ga6ks32umdxbcu8b7celkzpotjyhmws5abt7tqzf73103j0bsewv3yb8edcjznofcu4sdivyqs2vhx0j3dgux42jftqc6kcllensqw07j3',
                flowReceiverParty: 'xadfwkkv6yts775q7j6nvq0soiosg5vf8jaq106hfztntpzs8y1uapb5q5zdygchb0nqfnbjt4zfcf9k3dq9d1xzc10bqi696xzd63zs7d63g0ysmmnbtiqdq2lt6oz2p1ddloavyt701qejh8tjc2ielp4lvxcy',
                flowComponent: 'vdbk8e2l5lph5rjzjs6qfdwirkocfxe2vgaevso7cf4rp9wqmzs57f2o93y5551sn0sanm0f0645pduowm7d8d095r3yiad6ct3cndd90yygohpcbp3ku6y2xy2hpgjh4o3dd6wiep43sq5hm3tb2te9svi7rdag',
                flowReceiverComponent: 'pwv63t212ipbo13zodqkdb0h0ndn6e7rc7y231uekgf6s2t5ymz1izkwtrpvx4qzyn261pk6nze8x4zfed53xgi3vg54os0p0zonkakofe9aavsg4e22m1xh2xvoj3kykl54hjx6jztphz81w5vvogyskf172y4z',
                flowInterfaceName: 'uk0xpfgfmp5hrqzya6te0mnbjrh5yt9rohvgzg856tl012bgpf64fcevgy4e6qjwg1tvoyxx7w8ibmdgbqtu8rl0ppxuqj6trqpvwuvnoat5kltykmexrsi1j0fjxikrdn1q2pw6k7d30sddfs61xc3wehz9x9bv',
                flowInterfaceNamespace: 'vd0e6p80seoke5lnvocjctbg26ap4rqejw9hvafex8dnforxcma1xozs8quhpwzoruu1xwnbq6x3zm1mn4in8i4usiptsauffydr2ld301q7b41lxwbiy9h04c8gadskr1o4s2txq73rxvwokjuyj9k6jixwlgod',
                version: 'y2b5xb9n37ys7u9saxd4',
                adapterType: 'y5ede8sh8u8nb3du190ddhcd0zvrq80idalzsxiw4ane6vr6yqbb9ethxaxq',
                direction: 'SENDER',
                transportProtocol: 'jrh08q980uilytht45ndi97oeru0b46m8pgusqosev08cw85ryl5hcrx97oh',
                messageProtocol: 'ckyql5ye9k5ol3w3jmikenwbb2g6xtn9gmmz5aeqv11wybrlspofpzezp3tq',
                adapterEngineName: '01k6vat7om1koqci4b4tpf3aenuy7t5sg9wzisyghoygxhl4pl3rxsklylqk364gx3gdkeh39m6ld01fois54qvssozmfh12ys94yf63ta6d2loi75u47qka4sbd2hmvimfr6dfb8ac7p17sxq6t1k236io1pajm',
                url: 'etonu3mihvdlp9zgk4sw955lw4jhs02xhijytbet1i8vnzhne2cpgto841vreujwaoqouoaenq49qhoisad4n09i4csach77zx7exh5b4an8fc1sw84joe3ibhjnaiias5ygpw1qoyvzfaafrw0bg2nm6xsq7a0zqeuul5ulc9ig4csfth2iveylh7hklzfe4m3bk1eok8oymfh8maxydqb4ws2toeej8xctyr9crcrcg0oyx97pj8wnn5fn4wfcbdurl3xasj5ytr73ka7vln9x66lp052cyeo2xhs0q38otbgcfb5yv2enkv3osurt',
                username: 'q7gvbhzjvpx5t40d1yh70tsz2cl2tuevw3it642ep0ak0hv88avmd69mp3ij',
                remoteHost: '7ygalwp8o6sjuttcr7x1ahxi4e8vkmuiq5nv5b3u48v39zgvemnec81hwt510g2mulhkuzm6irg40zfyhm351efc94vda4og8pr6nbs13hi8de17ajdun5ncqt2dynhvynqx5cb0tq0hjqxh63dmes6vmv2lfaeo',
                remotePort: 9087016795,
                directory: 'gvo06ing6r6usu2gqrc0rt49uppn9andbfdgmtb842qkllap16rotmqc2s4dh8ijuckdr1jpx90byjml732pcpqybstakd9qbfh6dsw5wvzhdr412ni5zj236zr39jvt51h2uafo4ckdc3rcoqsy1osbe7xcdvfg5bzwcly8fv3z7stqb1yqa6o6466ywcjh3h6d3yb7lokdlaqw5lvlp6gg4a8lt1qr0ikyrsppt75wfpj1vokkgqsqq4bz19c0rxoc20czpcwqrld623gvfwdzvk5xgz3l33fy87ql48h7c7ot6idw3sol8ci3gzi3go9q2091pz0si4865mw2iieqswgw7n8k5lvcrgo3d10xbxvchsruc1ysky0yvaz07gy9dvud509eixfjx5q7mr2dhk6s9zuuu56q0kkitoq3184bqg3i08hn3xllknoib23wuvd0quc59xz4ehfrpbx28pwaqhmg7aumhsl1o3y0j3xigbhw2by7gxmh0tt5x6hgt3fjop50att25uh5c0ve9z2ktwfzl6ws2fgmpb1qnbmorxp4lrt9emadzqgx97ozimao5tg5kjk1cucytlu6isxdcs5rufv59qqlq2tpidebow1fkxvscmpcangddf3z67xt65p81rrzwsbbvu7xad9uijw9cvx0tlry8b6g24ony8doe83ydpzvwt7irwnjxsxja3v3qxks0wem26o2ta605zs8ke3kzugk7kyhwpoqvxidpqwj6wsfku226dpybwghyyp9fmwc1ay8ainkdyw219yq0lu1v34f08ma3obp9k5mlex0mjkoerfh52w58btb0pfi7aiexogfzkpdyqw2v3k0nvdqadhq5tb6sxecbvtqe4quyfjb1w3fa6xgdjfbeiibkm6a1o4lpxwqx79cmj01q540ow9vni5kxnmzldzouy3zliod32zukpldqw2c9niimocbun9b4ylov0k1ba4thfppz1jz21ms82lt8d2gsndbmc2dnq8m',
                fileSchema: '5759yu83mrnqhcnsnxnzb3u526kr4r2i8gwiev6gtnpi8xdupv36e0hrolj0mkzr86donu6geyttg3ea0362ash1m8yumj04hdthtdqri7po846dbzs3p4dr101tq1tafrt1fbpqtlagtlso7w55q5q7sjfmg292he0vsrablt3wx8f4qcu7pcccsjv9rq3lj9kqw8wmhgn9q786vk38adwior1d1vljnmcl1zqiedae4i96i9xpvu4h6ms0qtwpqpaa0ztftudx6217arn83j99fcdfa1pasysykx0ainxx1q1mxekoljisqtkigzxvr5d2x6c7w13shttjmdp6pirs2bcpwbhd4lninuqyvmqaa915gy82j34hc66d9ooky46h7z55lpzoou11bc6lm4jy5aubfwe6bqneo1833anr7rpfker0w9qyz13g3zuoeu6sgr5r9yjq6g7xakfahhj8kkkwo5wr52n9xqe3o27d83ivbsrabp31rv7d7afsalmnljydety5jkp7d5edmj83rzi0tilbk9neq1abtig1g84drm3uzm3qqaubem5h0e81t82zte11fwpapc7yapapc5ozfbnpvui3ke97evmt1f2p1nm893nk1ngxz5ataff1exd93lvqu6as6sqjtyghohvto9ur4qv12q4b3bd43xgmncycp6li1k5hrhmuvmvnjazjqrdpyufx8pve59ljkpk51okos18i8r92txdcgej601cf763b7jvadmblajebn36d37hpxfv6uo18hv40imm5jyuwu06v7rjqh72fwoewivc8t9lh2y7tc5y4tltbcz8obyum0d8ocy5128mnsfy0hfwzjw6k8vxa0bbddggu2ju22jn504qcn3cahf8zvht9xv9lk5utemehb5zn9nm0kq9ggivj795pw8bjj4ju6m86bw6w835uysytu1vd7deksylqy6rb4enlrutv5ktgv9wdgzyqqonhlc3m5nnsq8ljlw3j1l23kioz',
                proxyHost: 'y0yel72ow8fnha5aq1ai8ue9b3tbwrdfypm5glpz9udza420t6b5sicni3yp',
                proxyPort: 8167891422,
                destination: 'iloj2rzokgpxcrc99onjfy8uze2f94fkwyxzpi2m7e1df9272pxjkicjyn8q56iv6rvzqte8mnrcdh1spzjmf3jgg9uwbe8oiouzmyuq2zn137ven24j625w7dmznj377km3dla4gxntdg38egfrexc09wjligge',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '31imbfhwurjx8zbzxbca19uyqd89kvx3qlwkl4kca6r0fqfez1zjj64v538booy5j9yrf1rbxttngz4lqbf9pj67m1rn2543pcs4zlfin9tatymc0gnnra49xhyxmoczmlsoyc0fahe4jfgnr4gkhihonho5dlr7',
                responsibleUserAccountName: '7bsvu01559ubpnrieem5',
                lastChangeUserAccount: 'qedas2gjqasgzrqc1ex1',
                lastChangedAt: '2020-11-04 14:08:01',
                riInterfaceName: 'hpo8lpyusykbhkbx45p58k4algf4jcz3xtaf72dci7vqfu4upns3dzco2hmpe7j276qquy52fnmfib6kj70a1tcu5imm00kjheyikn3zfw1n2759tzh0jjros63mtknuo62cx7pn6k7j2231zqvlds0qr9n7ve62',
                riInterfaceNamespace: 'y9ffbydmid0kyvdlvk7wvfejionyadclh8zqcnh0jp6hr6x99wlk9qtamjufvy58hmmw8hnp8rlfwutm6y8kk6w57z1qrgi22wnngumu79bleevuwskblci4gj19w39cxxlzua5yhmps6hma4l67e30t0i6x60bx',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '077523a3-258a-40e3-b179-93814237ccbb'));
    });

    test(`/REST:DELETE cci/channel/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel/d2d77ab2-4da9-413a-9e5e-8f15b50d10b6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/channel/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel/077523a3-258a-40e3-b179-93814237ccbb')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateChannel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            createdAt
                            updatedAt
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

    test(`/GraphQL cciCreateChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'bc94afab-070f-41de-8cf1-b4499615e0e4',
                        hash: '08wx0irmvz6qazl5lwjw55pl9szgpd2jugrv9m7y',
                        tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                        tenantCode: 'dlrq2rh2uw94fy4l99fzq0fi1rb0ghnfudhmw0kfdz6wspwf61',
                        systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                        systemName: 'tbprjpolfmwykw26fftw',
                        party: 'a4ujdrnyhpdev0okzsa04f8h0zimtjnml7ioj5laq3k3m29srhcqna7vllcsec2jhg7a6c40k9zqzsqwvzwl6indtzq2qw2onyg3hvpdv9gdu7suhtffb45oo2ofbk6p6910xuszg53utxixp7nhn1zrk1wj6ip7',
                        component: 'c8tjov791g2rsg1ierhudoulj4qgfkhdzoqbe33lwcla3pxe3g7l3odmwaovtq0qqmjr5t8a2s4lagytki0mk2bwrynrn0euyriidycwtpz842jo2gqcm5kez7otoyhcmoja1yu391wozqstx9idqn1xs38pg3h1',
                        name: 'j9wwz7mn58qpyfwzulg2secllr79ahg5vcgtrvs7dhzk4wg7b2ouht00aaxofzy8xtosyb9qrlr8h6a2at5nq9scjrvucd853xo52ct50vao503jb8uz2k2hdl3iherh6wgqly5t02rwikfr0byqekvjv29aozhz',
                        flowHash: '98qbredh5kxmnakyfb1lg1qin310oj93h3mxsn0a',
                        flowParty: 'v01dsl59xya4hjoxnr4c8mcvsw79a0blxuqwuxcyh72zcs5ut92uy9romgusbymgz1fkzx1iuxyin6vur2d567a5t4ldl9fz96j2kbt8ct6kwki366kyqyr0du4wq7x9elx2uk51a78gysy9ar12xmoxvbylznkj',
                        flowReceiverParty: 'c9de9gxk54nw3uur6ph1aa0fziwoze3cgcr70qs4xpqs1t8jjbvk6tjml304gekjuyzgoqciv3ptgnmnarqbuke6qslqjnxnedswfaja5e8gn124ysznl1umhgempwpwz8wnl8oe126b3r2vro3zp7iidccptq8x',
                        flowComponent: 'wmptxu04oykb1d7usj6dkorpscylwesjfa8tpris3ck7bydlhovgl697yd3vp22whyxq0nfzdvdf9s9qz6ci7kfl82e74ed4qkk7txct078hw2av09g7cwwxc3fgreyrjuz85bhspujepob8shs2bpxwfwu1of8r',
                        flowReceiverComponent: 'mofv3tswil47f5nwio8qt4qscz1gjw5y27pwtysf31l5t5om46carvycuqb70nmbgxjwh6u5jz1nk8co7yhh0i39jhdqmiz80cx88wwp0h57k67dflx94kk70h5p5fmkxuul75mztasg5154o0ucnwrm67i40akf',
                        flowInterfaceName: '4aw8nf5erqtsxugtr3j081n9xga304td2om5n3wf3f4uk9up7wc46yilkh04ostln6pn3qgkh3wot0m68uafurecf32g0uaguqmdz7nljl5w5ictu0n6ok81p2k8v7hgfgnklbe6kxu2reehu037bbe4uglyila6',
                        flowInterfaceNamespace: 'gh0zm7gqxm8tbuirdhgloisut6n18hxljxb7rqeimf37hxtp5mvrmyy0dkc8cj184j9l1z8kerbzpkgipn2ztjh089wyflvi76nykjojasbvkdmezzassfxj1n7jdlc6n7iwrukapk9k0s0cx51akywucu3r1wsw',
                        version: '7pjxnv9pcs3u6vl5skar',
                        adapterType: 'orepgzivw3kd11tch4shn1de339r3cgyem5t0ykdqwydyvyut7ihijhtnf3x',
                        direction: 'RECEIVER',
                        transportProtocol: 'usxnb7e9cnna9c93uh9sw9v634c4bpim9ciwzweh35beanwd5j19lru9jxk0',
                        messageProtocol: 'j5bsrjfcxrw6rgz1baxb0p7hfyf1t2y6dji7lbvqkeq3ns41i1ykzbser5sl',
                        adapterEngineName: 'zg6zrxobdu94xu1vkuncif3kvrdtepic8zc6olzz65sg58eqbjtlzlid9avrviocqibyr7xm14bo22gfy3z65nk26yl0ww6i36ytbdd6y4397y435ruq2vae088z66i7077bw7jx4a5x7ugne6l2zxw16q5twuxs',
                        url: '8kevcmodioc70ix62x0dwi1mf92ljzeu56qk1f4r41mwi7dgtq8pgvxmnnaol1n9chxt1xyakhsozr79ht32z379fhanchgemy1u3ac0cz68srp4y4x6m7gge0wwwqkeqnuh6t7ky30i7xlpzmluoi73k4i5u1zuqpth78q97we5p3lpowbo3esx24v6qlqc9yshm7245eyisasqu82l52sfxu8ai6mcyvderpselozv48mmrovshuia96r3eft0et9oxd811izbg6zr0f1gpiuw8hr5botbmqd7yp3au3eozhsy14inz5zi7q11syt6',
                        username: 'iyqy5ttod77d7v595y4rxvg5o4c20fslk9rea8yrsdsbs6tch1nxehm59dx7',
                        remoteHost: 'h377sa8wts5s3stmrrfol1ptvy5ofii70q02tistbh2krd02gvsch5cdbla8z5uw55btguku11nalov4t324eb4pfqlozmlttmxfjg3376bo3drweayic8dk800ilbkg9di43ioaacja6f91nuprqem8kncnskyi',
                        remotePort: 5254059507,
                        directory: 'uiiq5n67vz5hs5zuo97hwkg8o45zrkz5djzpve7cveg7pmaxtwsikr9tem5zhm6vfu0yuwe3owpjbcudgeq3gpo5rzzn2k6zu9qgbwnbdomoktjdbnnb9yse79fqxlfv7sudj236iyrq2zmr5ysexu58l44b32k9bb6y58nwwdm0uckl3izv4ltn0xu2wcju7tt7oh165nxrd620068t180i23pvtaokkthxc4izygyy9m55a90j11r05wj34z1lqye9g61qsrju117agu6xoz4v7rybj1bgbrdzjfwzfxnc1dqr87drdm3bq3nut0xim4djjxs3qm1yrtjin5q2gqq4motimp2mo6l5yolhekgluh7ts0h1l87ojpg14pnr7tlq4jkmor6edd4n8lprob10kzo694z4t58i0jr6pmj3ves3x8y3s6kzbn80mihuip5dbvgacrl0n8l5g8tgnhedfi4kq7ehbgappzd4hey4gio06i4fk4pyyoxa79l0k4icc3tba6akmif4vsfiulsks4s0h9ywuzy3al5wu3znov7olj4sgw4jwzt6egd2ufmykrbhssvn8henas1ny0dlpucmohja5zk9duzfqk5y5tb3wtig3nyut3uoraga0wicldb07tg1ewilx1ccpdwpx5cctmo8evcz2i87ev8udb9a3oi0ytih2zrpxpzkt444iu80rqqu68my313ebpe4yrtrudoxy50lxm3a82mt0d2zlfdvzwondy3z4v2p5y6475e0jkfkj85hr4yy88awkda3msb0ur5j7hb256enlsdq8vb4zovxuv6a71qlkdml9f52eh6sl71foskdwuc9ytdcovt0d02delq4lly5c769ooutmytfru4qzaorbzxxmxl6l6asejydwaz5wvpuex6cmi8zikh452pktlnvehok8a0zxewk07alwx8r64ri90z4142p2s4wf7badveaec75swko4t67uogsma209hv3jv3eaumbu2ijl8y6',
                        fileSchema: 'gwphyf4oend8rfo2go37tx9gxem3m2vr172ragy9bal1xi4qazkdgirpxx1ubo18s05mokoqbjxcjcmwdbh016prwymxoqi9h2wcqzo1nbv1z2a6mvviktr0tcvrpbpz8cgqsfv1f38ydtbws7v8todcafevt0imnrnylrfl0giva05nr3kcuukncs2rodujm0dh5pbrz22zh6mm3djlcywhwye5bkjmebpwasbnkfskg968t6pwmkvgpxp4td5e1shoj7i5ipgstn4eq2o7t5pcxqsc34sx7ex2o0qejdcocs2b9qyrhabe52lqpslg6jeub6t5hcyjswajn83ia4j4kaopbkxrg5p29ryjra0tw94vkitthnbx0uvgv1dec945ebsz8fqecergwbwukb469bejilsn4eir721bz74p4btwve2o3hq9jwcqu4a8glaqfeadfve6f942tj76lbutyr4k1nd2j4hm9en3mv7a4y8yiou7sp0opjl0bu6741dse6ipsesp21yuqkw7r5opzwlsip2ty5cm82xqxn98c5qtt31hgs36w9g2s5yqotr639m0u13hwox1gx2sgw6nyxr5s2dt7ce1jkoxgp5xwfeq0bnogj9oq6ey53t142c1v2q67cumbottt8ji7qarlq6bodf8fd54gubk2acmmsi8d7linwzoqwmypruir1k6ibycems0s4kwe6t0fum7ivtnskj8x2b94stw0kelko7s6mjererymbeyq2jb3yympbx87k5pnqx3um0399e5ku4twt8cqcmi7vbnd928hizp75h7fn42f10lmxjq2ockem1pwo6ee8ghu2p6ednbhq9ho5csqaxda34umn5ua1o2329ua5pwkp5nm94e2sdssix0k3u47ycua3xat5ucracgtt18pupyzu1r27pmr7qh1iabgx5d8fhh0cn7mfne82kpn3wuna4v15xqp9y9c06q51miontrbxuv2udiev600aot2kscr3gu9uec',
                        proxyHost: '3oqr1uy7s54v27iuxo9idomrdwlk6o4vyxpx5kojv8euxzy09o1wn9t4x4kq',
                        proxyPort: 6666364523,
                        destination: 'efvm4pf30n05bt7z83meiwd9yi0l9hhsk9g8vd40cstyyty7zbqoocuvd9w9hsd298sztlmcfzw4syh7segqzgl83i8mgfr3pr3lzvnl15zmjblt1u3zmbe9wunihe7ukmi48l1yvfb7bzt7lz0lbwcfmc35jtoz',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'bkkgjj7cd8vihe4wof68zfd1jx8nbg7pb14inwmyevphxuy7o1rzkrzy0qtuac6yj63ubu2f0r65zfn3amv5kvvdyjds0c1jsgfq8cw01ajsplb0wp3zwx8ibhw10hhes8v9vg2ob4wfuewprd1vz61q82ryalhe',
                        responsibleUserAccountName: 'fcj7kn4sph9nxsi5i7tf',
                        lastChangeUserAccount: 'vmbok80qlqj33vrkonm2',
                        lastChangedAt: '2020-11-03 19:58:02',
                        riInterfaceName: 'e5dkrzvk37f03bf3fmedpk6h5283ycvwalqoy2dqzgt4vckov3v9sewhmupffpzju4gr5e78cla24jy0f6ryyxhvbz0msdn2w0p3o6bihkar098oo56mqlqqv8yh0plxt32h24u57fzcf629o54dvj990qxfv0ze',
                        riInterfaceNamespace: '4lc6p25707w989rj5t7kpozk6wn7aqdkf1sspttmnhv79py7ic4bf3isxv16iaunitqy0wq1holys033sjbheokputw3xd5zvx5egzipqp96gg02p9i5vpq83edva8y7833dapxcygzl1fohprpsqj7jzcxvbe6s',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateChannel).toHaveProperty('id', 'bc94afab-070f-41de-8cf1-b4499615e0e4');
            });
    });

    test(`/GraphQL cciPaginateChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                expect(res.body.data.cciPaginateChannels.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateChannels.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateChannels.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            id: '35eaaee2-ca21-4b0e-b861-d374e86543df'
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
                            id: '077523a3-258a-40e3-b179-93814237ccbb'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannel.id).toStrictEqual('077523a3-258a-40e3-b179-93814237ccbb');
            });
    });

    test(`/GraphQL cciFindChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: 'a1528226-f72b-430f-a06c-941d476207e4'
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
                    id: '077523a3-258a-40e3-b179-93814237ccbb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannelById.id).toStrictEqual('077523a3-258a-40e3-b179-93814237ccbb');
            });
    });

    test(`/GraphQL cciGetChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                        
                        id: '0dbbdcfd-b674-4d27-9154-d5d66aa17aae',
                        hash: 'id5muajegkk7ip7ud6qxj5sz4zvwygce2g9uweyw',
                        tenantId: '59e924ae-af8e-4d33-a1f4-a9a7adc901d2',
                        tenantCode: '9g2sq7vmcgoi8gjnbgpae397etzgc4ki9jbmvmq8gyc4o5vv25',
                        systemId: '3f14adfc-6684-4922-967d-d13571987cc7',
                        systemName: 'opeg836ih8y6z1thr9pg',
                        party: 'ck6b5ukuk3u6uvxt74opqiahyvlhg8f2wk6m0syzszbz7wxxvpzl9puk8ev4ijlla106v2w3walk91e2cw8vv3w3vjii0bc4b1lbiwbn1ne3p7lo45kmhgtp0u38lsl69wb0urj9lgh7jtwwx6z2gvlnxzwi35m6',
                        component: '856v9f6x3dr70ahezo0agnlq5zful0b80qbuntyvdzkivusdwhire75aak2enwu0zu4799p948vjpk4jtrluzzrzgv0f925wllqkfsx78tek4l4dytjs3crtmconehnpe5cucawucuq4gvuwwswfxsjzyig9vuf3',
                        name: 'dltuhsb07hks2dfwzjqjnfjnktkg837cwy7cgkpj383ctqxc3v3x5dn5h6xmx7xdm8355vfowt0vnjwsxmw51klcorj4q5vt4cekan41sabzajhxi1sssnmhlriff0lgmov3qpzpjee3c1kyuicd0bc32a2x4jjt',
                        flowHash: 'p4ryrwfrdb6srgpftuts24dg6rej61r442wiuhid',
                        flowParty: 'ghb8hgay2aheslr77oa0kwkdtk7rc0iib5zq155qyqju7ma8kpszgoyukar4e5ogye77e4596h7w0hdi0bpng169sv4qaul7j6wvk6qnmdcdoo0angahl4rw0jzo0xt4cgr52icmmrghwjvmoerg15ea0cu3vq5h',
                        flowReceiverParty: 'ytu288k8gpt8rxnnmgtyr1ijcql3brutlmiiqp5g2mmgt0ez3wbvvd311zt03oyo7dy7p4j9k86doxkow19bdjb1ep9zlgdcpriot4kbfo1o9zdaolhe5dc1mjhi8ibx37nb9sgapvlfuzpk543w6sixydn2cdh3',
                        flowComponent: '3twbdivb37sz2eff4zytjk8mc2ps3jpud907kecmr59qmjqby2fqapj3lzbktaopa5jcatlbwzukng0229ojp64mlyvtv1n5ksjw8i0ubjymn5j7rs535972zbmcrz57fhxvk3p3pfljo5l9241hskwqudy1y1fn',
                        flowReceiverComponent: '07di44zevwwqi410linusx5mzbw87i2axwo81vvd5iicwpksq1sdvd1u2mfplbqkwcv7qsbqarqwpb1bjuqra9qtzqr655pv5kft4c1vtbvqq52xjmry6ecrsok9c5ebxi1qm0g592jlxqto5cw3cd1iuqhw8uff',
                        flowInterfaceName: 'rjs4h2sadg173q0xxzpldzq08c8qpz0gz3q9zfpyqre4hmw2d9dpyv2oytf43j1s6y107xrrffhdco8h5x616vknwlpkjqw7pcfh9bvmpo1lw9k8i0zu10z65cew7xykwzorwz25lxqs7ipl4vvm9oautqgba2ly',
                        flowInterfaceNamespace: 'hyljdenkp6hmbvyxz3cxehgew9t8hamugiqt0mefduv638uovvskwbtpzj57hmk3t2w6kta6gvr1ozy7ohxv7crprd7ik46jek4c3yu6uxa2p2s12zcbd2s0rdjrq2c9ligkqkk14vzhdx6i2hz67yxqjvkbhsb3',
                        version: 'nftrf2mh31434jnjydw3',
                        adapterType: 'foaxbzaoqdqigfcn3ha59cy3o2bjtqsifylgr6kdt033px6g4ku4nsctr7y5',
                        direction: 'RECEIVER',
                        transportProtocol: 'qdocduay56ktt6rrktba37zoh3w1a8fbmdoikimt5itlamlin4dorkwdknek',
                        messageProtocol: 'jx16dc06dgdbnkazpd4fz6wqcm4mveyda6jg3mox8r8q14cb8xjnj1b24d1b',
                        adapterEngineName: 'h7x4lgak6y1rdgx9dat9vwb53y96g0ddz5tz2ejh42pcnp8wwpzwk8ol0dsbkf6ei9i1vc3cwriwv3svnpu8sa3p4xpxbje01jevf1wildkz7i5nn8nhtsbddwm4pdasoypyap0oamgwacagxw9xzzhjgtlkp2e9',
                        url: 'dj2so5n3tr6kjmwxkzhl530mbhkpu425nzuj211l3b1fkly1kaebsa94u3yiiibnppdqkoi81i0qnbzl23cafallq8a7a1ejb96s3ph5l2gr2o952cdt5hpll4s9otwy44e3fncewv89a7qnof1641f83iip8l53o3glndfr0ohys1dzqqs7fngxttdt0qbkemdrl3lth20ubfv37t8uruvkkfyuwoldukbwwpmxzwug8oaj5s4nzpu9mdncb7jao6c00i8t1uznp8t1lx2be5qvgh4ks2eprg1iotel3021v6iyfb2ts75xha77y6jn',
                        username: '2pgt0isdfns2yqm4u41s09q1roghyyw8wrsbfvgfjuoxpmr6ihyz9ctdehev',
                        remoteHost: 'e6kge146pmt5j5fvanx5bqhlmkt7m74uebe5tve43rlasqrwo6zm469ilgi0uodsplkk2yqs1bk1jo3zjkgivnjo10jo7y59vf4bo0tpci8szw9z6pve5ebjhi0bszwszvov2v7plq2smouxzqa04pa43zh32hvi',
                        remotePort: 2272236490,
                        directory: 'oagqb1c58db8idycxya2f9eus4omkta9ucjkuotp4gtvcghfbux8z0zbyoj2b7zvchb6bz3hzn7v0cuqpbxw3p7z5drr1r2eknqbsh1umlm89be55xt94ynnprgqfwt62qi6yxcuwg33nfjkcrn6yvlb1e4tlm08pwnyiewv5zjeqynwry6heygwoohgc5yw4o5udyq8kb5glbg7wk97o2w6c1uncslmnauxxwi242caz72ar7bw2dp4ty5f00ot0pgjdcgiye54yzsje74q14j0i0i79x56l90v0crx9hs63hja6b1p7k831rvvwsbfshmykj98yh79bjh6rhlqmq040y1p9ll6shc8vvcbhjsnpytfkclv79k2epdfvfky6lbj51mjslndtoiubiryz43nhq1m086xzfc5f6gb62b6uyyoit4dthgr16j0kf1b604flu3p6c0l6iyysyfuqfh7vcw0kpye7iqt74ykxfh5quqczjajwbmwfk7lkqv5qrbpcap8x4sgculroqoya9t8rtonufwf1xh42u8bosjz7dgdi351ksprw66lpje6976pgh0wfq4rzgp2nhwazchktxqucfa8vym6qaenvo563euwq21ht66n9ujbe1uz2qjfnjwtzcu1t51hkpzo052ezb0ooc3wrho5wdn4wjpy738blvv5w0burz06h7hrxlr2bzefhs3h5fakj5y4pfy3b05cnqih9vas6r1iqa57l9lqjp2l4nkymzvlrpbw5yedznd13m2e98nf1qzikh5kszea3xm8wvqf4b8s1ww6lgdya48o6bkc9h7om04ewgt7ga16m1xuwyetxwp6gdd39dtyrx2idqedz4arpu40c7fozdi2e8nwz2uihyr39iy8yadrj6giok7l06h9c1euzj4wq8hmsnbq1yr9fk11458hqohxqhgpefuycyntya2mwn0lcvhpnoal8tjfkmhl6k3g9g6v4ydte72e98t4evbtn8ddk53b5iiyw5jy',
                        fileSchema: 'hpatqgsdi0kvsag8x57lnmlmis2b9hedoy0v4i8bg416gmzizgx8vh3o8gs1vuk6ptm1qtzebz4ggq3sr93s7tq5wlrinqmfd0zf966zoy9pzx9r7zurbjuq4n111dguf3tkvmn7busuniocxe44i61a2lybzuq8bmn74x4o4yjh34it1y6l2owjqc4e4834y9eprfp2jyy14kwxknmq68y1iqecnzc93zofnc0yr2xyrpg170xcp9h1vsjtgmfukatqei7u6s4tbptb61ahoqaxknif8k8u41kkrfr3gtivdwelicv8n0365vbjts4z2mlab98rv5m76xnrfqlugxtu0fuvi0tik026g52dyhnv8x6corbmrxz5g3ri6hnn3wl6sqhtml33vds6bjegxogophuhclgnc8yza53z1wmo6njla3mda5a47ppc73jsa54unch74wncxhyn63ft86bzj2pjoclj44sxs13r8onul9ax1xzoj4z1f7um73d6apuythjhdo05l2vft4tpfb85nbe2j5rsjn05msgjq6h86xwuokpp2l9b7r77w3jizkupx34cntb8du5udwav705md5is739tgbzs4u8mzhep6krxicpmfkue8zn8xu48bjsmultskgnnegz1z1s4k1inqyvc3a8qbh07lpk9c3hhnxzvo7l2qdl0l0pv7ls3odemmpzalyo7vpklj210stylfke5mehcvgiv57cnkkfc8e18g7tctwme6esmvjgxcxzmehgdkdsz21bsiy1zce36bgu2qk4yagvgehefjmzupgelkez5xe71citst0of2yp5pz3hr068xfczlkvqrj86iwwwgxosuuiq9q26e9cf96fj2qdmyoiunjne1kj48gbl9lmxa6nef01rjtvgwyxgkaed8ldhtitmkgjdn5tulvdmp88v5imfmvpshpt5uls1exhidqfrdsln53oftkxoc7s7mr0smon8ax1biv9kk2zl7t4wpa613eklzrju',
                        proxyHost: 'ok0p1om3z4dd0udi9lry0oxfzcip5kilkebadku1l8vqgfk9jejdum1y6vjr',
                        proxyPort: 1419267457,
                        destination: 'urmetcrzntja3mitkh4lzzd6nd2d7zxzg8v78xj0dl919nggrl1rxyj68hchgyrxwixabgbjwyjm7ggv2gkzzr0iyquedgz3nxsoa8fn8j8djyd6injtkhhwvo44c3foklx4r9yi04fplosy8j6eox9kdgk5ofr4',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: '7hhtb6vwtb170f9g0hh11azi4a63i0xpk9gnf85xqipjl6bu7rtapyqz4xv4mea9srqzhmfqp0pu34fcmlm8azp5ttcag3bnvm1mvvv1xfgrdlaoxie27b5pp14bt90yh9tgu58mvarj0tez6z36khdg6z6cd5x5',
                        responsibleUserAccountName: 'sc0jinvnpbfnn9u3yuvs',
                        lastChangeUserAccount: 'zdzi99d5ig6pm4y4ew0l',
                        lastChangedAt: '2020-11-03 22:13:13',
                        riInterfaceName: '1df1m0ja4orztwy8m8j1isu2p9bxkpuri9856jncdjsuna60gpgqcbb4tresf2nsgxw8u46w5lwlz44wqvxucgtja5g0a4jpupsqntd1qlkwfspbddgb44w81kasuv5hvl5iufjt81g1domd162ddqnr2fibdbqp',
                        riInterfaceNamespace: 'iln3m4v0sgowdqaatwxwj2677vnbs0qlp7vir6ewki17wtvod988825heyqhtnait3bpnj9zxr9v1wpcjuiqsy11lk4dw1u5s091i0daozp4pr5w7tol311bknnca8xkbpffu5kpb3zsekq08v25paywu94ynu3x',
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
                        
                        id: '077523a3-258a-40e3-b179-93814237ccbb',
                        hash: 'gd8whqwvl8jza73ezpxy279ovvwje4b2h3zwbfts',
                        tenantId: 'b69cf5fa-27e4-44b6-b391-202ee590f4e3',
                        tenantCode: 'qn03wchzwh5ga701w62fjp907j91b44mz1ah2f7lvb7v1v3l4j',
                        systemId: 'd608d528-0826-48f8-8547-ec8b3d8a3fa0',
                        systemName: 'u9zsugyhjstp4uhkyn3i',
                        party: 'n0oglvvvc2cq5woctry2j3yeqcnjlvvstw2m990ap4hy24ssl3vq6pugkc389zwxxbr1d1chby09thbmy0c9cj84c95v4xnfbiuz97pzd2b57h9zmguzhi7kz8sarf81hn32gn3s77bz7pwxas4tvngr5sm2tfbb',
                        component: 'egdcflgio9c93h28m2tcxnyeo9m5tkmhrqw174aup6o515wnw1lus5wgxasawa7w9z8cqoyc29r0qim1p0xkax1romgv4wtv79a7crzkqs9p9c5w5eosirpfh233ui6m9jy3z2qu117zlap8ijkc7o1nct3i5eit',
                        name: 'od9htzq4jun2gxe2tbrdyl6vaa9x39gtfgkz4gghrt0bzna4e3mw3ek11ttte1t32o3a51kw8n4fq5n6hiirm6wmwrgi27ltuujtocm0hmlpzavlah12z48kxi1muaa0ih0lrib3oce1ms09feud9g5wewjwcmud',
                        flowHash: 'f6sjnptejmhfbhwfaggswdh39ngz6j1vetixqlox',
                        flowParty: 'cp10s2w69tntxamn7lpa9hgqoe1pnftfbywgj4lpev5r9suliz0owzl9z657tff1ukgd2iqmp5cggn1fgyzv74z08ewqkcpqxy0o10xwr5ojsmkw78ttrbu311mvzcv4tu3id80bcwphdn1xfpmg8kx6v8jadarq',
                        flowReceiverParty: 'uooc4okz683qv061d5pmr58afsx05hpy0jw2sy88msml202u08211n3jl4gre8y6em1lksfl0cz79m363njr8bk78t579ttrghjmpojvnxjrg3wfjo2m93oazf8tzk6mhdf7brgdgpqbpgu20wj2len3v405emck',
                        flowComponent: '9g58f97utigg4iwjg644nssjv7vj4nrtv2myzulfostr7bqt5b1b3zjy2ayx2ervsn7pmfigcrh19yohkcxv5r6n1hpoufvauidgw5l1zgsu2e1k3wa9a2m1ng9p5mv6gcieaon9cizyl34kej3bzvt99yu6k27z',
                        flowReceiverComponent: 'dgwdr6gz30lnbvrpkh1hg1w5v83x0q0y9pakk7foe90txp884y3ev5psvcd3t0vk6mhxm12lwxg87up9k5gxupe59xd1sn4tr86kzbjvezd3qjhc6myzme9tk0vpw672enplwb5ed549lq6oocbz6czpmhl2g7ea',
                        flowInterfaceName: 'y3nyrn7mffzcnfo3pdnzjjgcvxl343n8a802548mvl63juqyh3h40dezpfy0pm1yvrsdyxqcxu5chyhqdmqwfp3x5xnbx8yshsfyx4a14xi7rn15immvk8wmsb8574x7og27omloyg0o4cf3s2m0becu27jhws8d',
                        flowInterfaceNamespace: 'daw7k7gm0jt52bdyqyn590h2erjziw3d32bw5sixkpwpwun5x6ksq7ki7x1hj5drutlzilrxg2kw3hgih6zsd7hxirtadf8w9or4zzo8fq7c7iyijmr7eezyw6pl0ka5w3oadxzmdzoc6ci8p1a5qeuan73hjkpv',
                        version: 'db3hzpc00rfhvoau3vqt',
                        adapterType: 'snun8h32ulgovhkhr9wujzvh6p7mmqeejz3xdy4k1tdhatmutvqitenmsixt',
                        direction: 'RECEIVER',
                        transportProtocol: 'ji54iimt9oo27rzin7wb0qgjpan3xapr39fs1zv0y71cgcd3mnw0gpw2xiu8',
                        messageProtocol: 'ere5uajl37pjog4dl9v2euxh8ejb2ga3x0zgwz8yke8u3uamkxq46fjybmvs',
                        adapterEngineName: 'utu05r6u64gfy1gwpg455eied9x0hz1y3ltm92gkcxokwj4mbasvwni5wmoh8glzxkpciwz7lemdibd4cnorlhsfaxzws91mxmjd57tkcokdatijlyrnx5qfljoe3gwdk4cov3z06nn06xr7va5d5g7cqppuwvu4',
                        url: '77xwmpdyk8vewro87ehbcjy08oj2ah3zlihk8ykmr8bej6poxlrocqgs9xlfarsfoyits9t0latly59wmfywtwkzqzhak5snvouxwab3szsgjlusqpj0bcfle0tf29wq52yb3n9s81sxyc9ihy44x20z1sia1m9grxt6nqtcli64pren7am8xi446gs3u7bjzhq820ozc673csjhl1npwictcw6c1r9fo7jqe1y271nxkmcfynyssdo7pypbku98g16h3wz7l2ncas5b6siue19t23yinpy4uplnbdb9lo82hz3vuyr1bqpyk4h3ul3n',
                        username: '40m5rt6y65ns0bk9bggnf49vimj1a28d7l70v0gtersjdfy04mrn0igq94ut',
                        remoteHost: 's3m0eg6c699tj1k9nl8juldq0p21okik92tq30posyo6blyx69ayr9l3vco3cftxdy3sdeqgl39s7wbmlv1fmvpli96d93hjz1ka9mxfqcy4uojm1wg9dubn992rrc6upyltdghesax9kf6zwzfqy8dvgueqn3i3',
                        remotePort: 3391214271,
                        directory: 'ptkix0ilh5gdb3bk8cj5zdfes16acpttargknfgjetw7npqncwlfn21ycgblvnsaklmz796ej3gyv3lm2a1r8i26iv333zel31ojg1x1ij774saoltzoiuzwkdfejh49k903edpfc4ojkpcut3lx7kkbz4tncyowfjlb7tqdf517gt7lbge3thmx96kqm1t913tcjfrmf5iyorethmskk5g8fvvktyl0uf0lg7ab7ermvch6fqek8l5jnywz0xynpqic742mpds3yvj95be4m12wtdwmart96yzq3pnmk3zrrre957gzox4wsc4ksuu2iew59qqvecdupt5osjedk959kh0k2jkqn3udsijt6jwclouckin5cweu1vadno2gyb2yniznv2m8la62r5qd083us484oz0w53rn4h8g76dz2wfk93l0cze4a86wdk9u45yuzodgbl5ypxf85w064xt2lzz6xyge8hw5f5qlpx00fe3u0ca8uxdl6dh87xqohpd47fuyc5a9eviokmmkbi715wf25yoiq5oarwemiwydy0sknxrns7nwluc9p3pkml9resjtyxbt1hye1do5dep0aasbn0xg0bcwm9vcn7ep07ldhwv45b2b3p4kvaseun2st90pb8i9sq9ijzzyilh0spwhstw4imbmby8rs5l8fnbpmguoq8f49vxwvbs1mugjwc7ptw9uexcrqckhpzhd4jbaedph5vvxcqhggpw3bwmuxvrc8omjhmzvm3z3a69zlsxw41ma3ydn9866mv6bjujczv5k8kya2zd9k8k5t16deh3emuamyxe45p512bbsagudc16mjwrsxna8pf7tzq8m67w66qmzvgnebug1qg09mkzdeict3omg7f46auloi7sh247y37cowrfjm5ub5a1hkmgw64pmcfic31ty6uepz2e1bo3gl9wg58vrxoowpdt39hum8z6rbjav5vs2s9iqd61imoon181i4taub69wtmu1a0odh6szkwu8',
                        fileSchema: 'ye43vn80yvsewgc9f24fgvc0q721jjw9y0qglf8zf4fz10r59yq596yh131p1js13es5hfdylri4g9rhhx176xkz79gv786sdng9w49wtlry8tu91bfe5falsagycp0oaaiul7k6fd3c4a7qjajmwck05rivqpsahu4n9rsuma7rz94cqvf2gn620s8tpubcbk20kspe66vknnpzzd5ijrl1zkj6y0mssn7h5mzt8aaxozbj0uomq5hjzip853xhujy7v43tzivwgkol9gaztsqtr5aft066j5b5g805i7n5z9x0nqh8ml92uiw5cvhljdeshu8gar0165n5pbh8l2kxm1qvpp7y2vfr3f9aqj7rt2jg48cszelt84b0kcd6ifu56f2ncvvteflk3avps7a3qs783o95w2omu0ggqudj40xa74lmckagiamoap0vc1ykobmd6bnly0jxwreoozzay6uhcjn7l9jslcrji1asnhdahoc112zfu39abp8q8asmaj0eliydly0unacvbls2ab6df450hnib6fnk6ko1q8io82b5m4oys472fnschlhokrhghj53gofqholao3abb1ew6sdz9gb88go2onbyrwvn0hait6t4vhwzx5om947oq4d3p794w0zy05s9rbqe4u8tselny2huoq08vyjkykw89lxn3vvtmeqtxp0oeivf0e2w7ombz6duk7du4dex90yzhhwkcysv8nnyrr8ikgwcfz4lvfx7ju1xoybtgq14zs73g1at3f051v61d718byjpb3vwu1yn41d4l3cvym4dvspt0jeirp4f3uzv85lte6n8jqezgkm87yzk7xxxpbdul9rogtqf8lfb1ctp22jqs1j66vuearkptszmpm5e8a48rdf2phuyg3bpy2tci82umornihxgrkkgqubat577ey10aa0te1jvm5w3olzp5l2d6umero9x2jsfr7g37mey6c611tra13xt3rwionmy32si2b1dzqv9pjp5',
                        proxyHost: 'uqowkegmlpr3nttdz6isonyfbymu9sqsqzdk70nht32roxojam2vi7enhs4x',
                        proxyPort: 8166017254,
                        destination: '9bauxnl9nzy79ryvm2dnf23nn4vnv2fxr5nn44dpzqb8y2lvba5vhv8n9ylraa76a3jnh1nko6nqnbdbwc750jo8iazpx522yt2h2fz8pke7frlw07p9u9shjkftan05rzdwm7llvvmv2d234xz1f31ftdcb5kry',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: '3odqa463tt29fjwns4ycpkl2ys39s6w8iewu5op50zzomgl2edvgcv1vqyi6gvzwwvpqomln5l4m1za0hrigmui03iombeyvv3zzydu3h2m5vk8lhz7k8jq1ubtkva55dspn0n9a8wvrfh4kbd3t9yso3l1x4z3a',
                        responsibleUserAccountName: 'phgtu3e0phnln1c6x6na',
                        lastChangeUserAccount: 'a2kprbtcgya8g80q2b95',
                        lastChangedAt: '2020-11-03 20:20:45',
                        riInterfaceName: '24xz2dmgsv1djxu7gp8uyefoq374jl09fnub08jdh8mgvh5atv97mxfx3osf5ynwkn8bv8p8rggksxi9v4ujdxfu8r6j4ro5sw1qm1krg8ufd0epzfryfc12jb1l8n6ga9nl843o24e1qt14wgny1lex1hvcte2c',
                        riInterfaceNamespace: '2y96emigi5rlf8tiuay7x1mlgmv1tsja1fe8np0oklc93yro235qlovxiyh9gumzdf1mdi1davfmw2f2vrb9v3irdx2cn2gsi6kk1tfj0infxd5km7ap0nhebwptjd0iixcwiomidr0it4ue3rs7acpyufxup83e',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateChannel.id).toStrictEqual('077523a3-258a-40e3-b179-93814237ccbb');
            });
    });

    test(`/GraphQL cciDeleteChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: 'd6714d7c-458b-43e6-97ac-c7c0aa8f63ea'
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
                    id: '077523a3-258a-40e3-b179-93814237ccbb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteChannelById.id).toStrictEqual('077523a3-258a-40e3-b179-93814237ccbb');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});