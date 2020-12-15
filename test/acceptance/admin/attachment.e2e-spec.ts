import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentRepository } from '@hades/admin/attachment/domain/attachment.repository';
import { MockAttachmentRepository } from '@hades/admin/attachment/infrastructure/mock/mock-attachment.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('attachment', () =>
{
    let app: INestApplication;
    let repository: MockAttachmentRepository;

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
                    })
                ]
            })
            .overrideProvider(IAttachmentRepository)
            .useClass(MockAttachmentRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAttachmentRepository>module.get<IAttachmentRepository>(IAttachmentRepository);

        await app.init();
    });

    test(`/REST:POST admin/attachment - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: null,
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: 'vvl0llhk0fl1o8129s8p0psbd66s06vgfybdruin1amd5qk1elsc8f921s0ihbidhyo5yepk9uu',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 400766,
                alt: 's2992nslztdnbsjht90huc3eb1zol37rnw848cnmqq0k0voarlp45dy3b0886wwgujoage3655jue0quphfd0nm37xzsk72teys37p5wf3oiweaclzkxt4k8q6doh1av9j9gaaflfo3o9u08qwz2c0m9077xqhfgn8207mafmeutfj8cbptwomuthcu0g8auwshmb6q924sji4uajqct1oz58nwyoh8p09emmnpgkplbyej1xfy3agnpvxfcsbd',
                title: 'k3bh2vlqxv9dkhwzsetivl6bc5ralmv0czewqmlr2jool6wv0kd28aa6m9f0n2yg4d4wcm8uunsq6fuieqg5oqlqqtrut9o7easn3it52p7jiyuhies2zy2bi7akfiewkkxbul9lvr58jsic1pkr8pwssqe39mwffra8u0ujevhtqce5biekhg7afiq12iv9zyiqp5u37lf7gp8x8pcycfhzwfd8f3r496dx5ou9un13fehuy5mcdbzna4zrs80',
                description: 'Ratione cupiditate omnis quis tenetur vitae vel atque voluptates. Minus voluptatum impedit nisi voluptas id fuga. Et amet vero tempora cumque fuga est tempora. Quasi dolor cupiditate quam est sint itaque dolorem. A alias velit tenetur sunt non corrupti dolores.',
                excerpt: 'Sapiente nihil officia vero labore autem consequatur. Repellat libero ea nobis. Itaque deleniti dolores vel. Libero velit aut neque dolorum quia. Velit quasi illum.',
                pathname: '8pro4wh9ut3j6l2k83wb06eu82vldx0z8u8sl7om2iuzmqdd07o8f777qonwahhtfvlbimbnefz0y38mtl9oll6akm75bb6ldvcriog5s1yt0zod21s6q3sq31pbmyif8dpxakpp0t7mc7zmmhwic8c7d8mdoav4xxovvki1rqex9z2wo5leh69hqpfroia1af3mprs3evmebh672k9jd04fljvys2vxt14zvvfk18s7j6mkm4lbb6eb8xzg7fky7d9rn04w50ledg28x5bqvit3ro31ps5z57vz799xnku9ix7s4eu4poq01jpr54kykhp36bqm3btmvolvaermb2c728jf7llhp8i5fpqcn5xs7u0dl01yhbygwm1yxakeua6zhgwu63cfswc937ce0vea90h0rsmtwnacerv85kx17cnx6qe53alzlyt3njfekp11l8f8o6qkcyhksoyex4w6m1najpfqmgahlnjaljwjhc8e9luw6lldknd7kv68gr1haq5pfmb2k83n0u0vko2jsnjkroa551vb43b7pqwz7o0lqkb6bg08hqbal9wi23snsv94h8aqkurff8fawm1bppthe01lu59biwd74apiwy60eo6o6thzonrckajmpmjkjri93q5o9wcc7ab02xyjz4du5w2drl7azx2irz47x8nnpricnche64ps1ui44elibx4xemtwmhctgkr9ufzb3wy9sqgkr0oaz2kj49p9o9fscdphvjtiepl7polhymru377vrn0f1ajhmk1705lhwkjamen6ffoples1l7zv7t4o3rcf6r0erytohzrb6hqh6ynq24zn7yil8vezwy9ocse1eo83lztiha5tde6j782jufu47786pbms9skakb1t5i91559m8d5mlaxhtzu8q69h4v372yps4s4imfppz0hb4z46e8vc0i0kxm5sjlikl8amgwzrp7wxev3aa2yfa6jatqzfwlg59xm87857cc8quca5axto373yf00i',
                filename: 'hjtqjw7ed4vyryu3y538yvwyjuod5u8ef438ae1d9whfle9e3w8l19vcmos0zu6d3bm6hm11jyokr25aru5y0x429q3d87aqh2mam3hxvn180kuaxcalzorttgfr7mrlhcq0j0ejzbp3pykg5un1jp78ndasjkxfe77bmv5l3a7h55vwelcvjbt3pl1ekwqksmlf741pjrh3wubnwoxrdzizud2e2w56ybjjbxwx3q2ls2g0novhj0b6dk4g85o',
                url: 'mriha8vu4pz0giztk2ik9t2l1yofwlcau3hceal3k0ghr8xdgaixrrwa5h51gzdbhw8wv7m2iepz85fqgf4tnqvl8req4ayv5z1j36mt4vgr17uis1voslw97q898mksvcr9psy84o7a22j0wxrybecs17f7a3ej8vwbl2qva6hg97uj8udqwjbd2costw89ku76yxmtbwq017fpi74sq28r5fbwoe11hcnq87q80ugkhhwx8i3nrht1hp1wi2wbdseop2izuzpis1ioq7ndaqb6kudjphask98qajy5v5jtlyy9iv32s5jk5tq54kwd7rmgx317lvfautfkez2x3pvf5hjjudgjdvs4diufze2v17fab5hwp9lxz1p1kzidxc3mg464q699tiy18p3p2a6gwg8td7ciak4gce4x1xanzwxtb11o79pa11u1c48coobe59zg1rlttkzrq5yqn2tfxlstt7gqh2m0661ksohxyuqeyljkcomchd320o6egn2tmz3cy10ufcf0kgvrv0pb4d7c24vp0hrpacgpy15tqeci90t4qec4xagfasbi8m8kc4yq6ig1qa3g1706tc88ebznmxp87f57etij7qqp8u9qs4y0hlg84i2w8x3x22jk65dwge0wvw8pspc9pu9sgn2p4u8bme6lhzak8vzqy6w62j2y7o7csq2mxngsag7nyjcjbf0dn29nck5fmmswqk7pvzyok8resee5360xhovrpwxrq3nf7mzkcnmofsrakkbc07qg2jsckmhqseelaltkyzkbzumm8fluyvuoq4ahuu3511d1wclk7gqz3hsidvekykt1iyq6b6j3d8nq7z3n6hngasl6tpw3xqdu9mppuykzuf483feux61qx94ye9cbvixbt5sno3imio86ddu5ctv05y5za6gk6gd9zvk7wvxisvmuedpyzwez7pdnx7x6vikt1nf4vn7owhn566y9a6t2u0mn9xagji4d02bwvyrkkveyi2a71ma7',
                mime: '0tnlyeqq47fbsx8ntsef2bsv5wwddonksc95ga8t1a0fe37wcd',
                extension: 'gabaoz3q7c0tiwq4mfejbwlln57gincupfneqnykp6jsx7k5ee',
                size: 9661397374,
                width: 153254,
                height: 770793,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'ht8crognxwrufrwa70mericn7vfhbzwuj0yobuivsc8mg66dgisy8qw4knk5tvn81brsnsa95mfrts4prgcbskcnk1pryjk4x9c6t2mgfjfmbummu446hshksrmvf88jw8eodp6to4tadp4kjea849bkho6vzeutb82i1scj6yuyw0z4vh5y39wf9ujp6dwq267p9vpzbubh0avd6xn1pwflo1oyim9ef2mq3j3btd25b9xgp5v9f07nng8nm54',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: 'ajj2g70n75nwlnx8u3rfo0azjt3kte9k1lutjj0gy30oaxclfbq5l1y44dlw6w3bse539773m9w',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 736499,
                alt: 'sfr1o3rmtyj80a21zz360dle9ofjiluq2fg99i28n94wk84s5osd21anuo45qauy25wqhjzwsebfb01sqsgo58nmwuothnlwu7sll61ae5yowv0fg31xnmpnxeqj1novkl55m1alog23n80gd1rfs1ay6a99epur3wtwhqm2gcdeq8nikv755k3x9tndb8oroz6dsasrjxuucyguebcnpw3wv7cxa1ultalu1h3u691gbx8a1d8h49udot5tam9',
                title: 'bf9gr2ytck03a0rtgv7wb67o8suh3scam8hxbsr82fyuvnjlp9hhyuk0ntx6nl4ztn5nn3e0z904pyw040ifnvbu03iija9fmysjn0jhopng0bg8dzy8c17zbj4x1crzf84lk1ghs6irekyrvzujj5vpho1yjvnzjbjuc885blcx3gbwx9r9fyve1a44rgr09b4wxis5frzwfiqmpoa9ei0i33sc12aqdffbqs2cjn5tgqxmfhi9ok11msyk79q',
                description: 'Cupiditate incidunt et sint minima voluptates. Aut aut ratione temporibus placeat nihil commodi atque. Laudantium aut esse.',
                excerpt: 'Iusto corrupti molestias corporis est recusandae omnis eius sunt. Sit blanditiis minima. Vel voluptas doloremque omnis officiis. Ratione nobis quo nobis.',
                pathname: 'ikpepiw6927axxdu9eju6unk3a3no8cq3yru862fcje30sz3hgc32tjgusgsa9rkicm6g2ob6jms57z2sswertokbwk62cb2mvishd262g98w30o2c7qqvucadw2mh5hrf8dezgyvmhb1ktemq6aqku65du2s3onxsz9fhytul335wmjtir0vabc4axs9etq55ux90kyi1fiunpvc8ww5zeiaygt1tuxbo5swjxlm41yj40vuxq7htbyjgkoh2y89sz2c47j2ujqaxn3zuh0fjjzwa79rpbhyxzqupuwevo84crzmah9jxjj9fimh5ds40gc0f9konbef00m2ny8jh2xq8hij51hgum9lox4ni6bt7s6grq4jw66ni2fotvx4guxoq66b73d20tgyo1gv598eg6t5a1cenva8jqrc30u5ec23kwwp5z6miiqj9ujtu8l833f75j8s4e8dfmhh6et1u6jr3ndk9ptsxqrlmcsmtopq0llc8dwii5lf4qu77z7viy7cp0ifu7cvknbzqmp9nalbpkjrpk9aaglf1rexx99zzsvwu7xk1dvkurwwp5qwn5y8xhmtf62qjkv3dqu0ixxpuk4jr5hu4pfzq6bphjcqp9su1rz6io5y5k29wjr2kywcw0q7qdiv3ykyc913ynpxhb82mid1zamep8ax2h79gcgerkv6rd3fr74giqcsncm6bk29hs4u36cqklkb05jdjbcjmaawu2gu4ctg3nvgi6o1a7saog67vbid7bfe8vlcqpfprq6uo0bun6f42ych1ifovhvsrxl8p4iwrt2wqcioo1ikfu97gku3x4i6861jl8f7wanm45i5hoc1b7hr7stpq2f8is947j1blqqd194m4x23r5xpvhmgeikxnbwljpo23w7jvspncv0m6zdys3qp7l9o159544140d0h3ish5bxe6rv7rzvgq4vchok5y0kabgg5qwqbbavbj4r59id6nm4jntf5afw50ctx3uh4xu5wcik1n6q',
                filename: '2rxzh57chw6gjdi804tl9tu2z4awvunkhy1y1bkfd4klavxwvzuix1zl9zrmkt4kwky9p7634ry4ue3is16m1awilslwk77rqvdji9z03h464vv3juhnshb4jgbxs5eps1ff93srj5h8981ntfv3mswd78cxov79qlkinpjt4k5xikivfuidwml6900haqn2wbr16pf9cepb1u7xiiv21wot5uo4u07o1z7naspobm3pawh73dc1qzadpo7859t',
                url: '7nmm3riendq6yj7tf2q0djdlu7tztoz2gpt05f1gjvdkazxs6q9iu3y2uw4obc6c6bsz6ffmbbv84p1m5cw3jtw4ncgpprrjnia4fjsjzs8l7pe6gglyi26a3qj5t5jiox1jpkhhpakvmmv5cydu3osjdwpqgme6znckuz1raxxwgt46rml3pu38fpuoq3uvzalvo2kzluyw30ffuwa9242gyb6q1ukdy58bg2vvsw4qe0tra2t4w4p7o9srksricl61r9z9ja845ex5ep7k2gapr4bnfp2j36e14leorlf7vr1klybo9gjaq8stwvkdte6mt946xpfymo5at8z6lruyt274bterz8um4kc9l6sjhnxi9ypty7q5dhp03jildnsrbhya9mllq99pywujywo2e8s30n20u1fjp4k74mjaeddgo42tanovmovwt6r2pgzziao0bm8lc75qgp2a5sioxejciyydngkhjg7qnndkhktwlcj084234g9lb9ca30zb79f4ea2ouufov6txkwm4zivo117croznsycjaw0hh16fmbhgigplzj7jxsb3tp07pxp44528fvczissi4e8bpqwzfknx7f3wmm1x6o09n3m8o8qki1xgdwcw0e9b6urm0k4pg5kh0ns384tb1gpp4mt9ded0b3xpu57z5j7rkccglc0q4zhh8ufhfzfz1tsc1fwd60qoo9kn0hhn4gtutyoc1penq7wz1vb71hps9m5zh5kv0468ak7tala1slm4zbn727w0y3efb1ua0k9eb03j96lwf3sxpqzet18rt87rgki1bp1tmqfyuvorhjeudkkmppu9a7hhhm9wrbeaor6gjgrpy33ov7tkspcditqg1el2d29umtbnpf32d0yduezvf5zbxqutyrasemt68qjjls0fymaf3rgc1pt8tz9ooqegqj96aw1vn6kmqc12h5s0bhr6a8fdvgwfg41ruljw79m30dhq430ryvwrw96xc08fpjs240fx99ii',
                mime: 'lcj6vpuobvg8wiyo25i5ggdrnf86p8z9t3al18225w7iehilvy',
                extension: 'n5vy5v18z6v8g0pcgnkerd19031360fyxcyhsdv3kggq3izx55',
                size: 4491083225,
                width: 837804,
                height: 178838,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'yesm26brfrk17m56g45jsfj8yctma49olfhxd90ek61yjcmfks8kyc8z4k2zkvmk8lsswqzd42vepf8srp2y9whtuzg8s9h1tqmo2ulv9d8ylfetoz1n8x0w3r7r08d4osipkkltv2vmqgcrrqq8k0oqmya5dvr3421uur48yya9xya5cbwjcv2xplnxg0cfpi6ot0vc9xmmhbtje9fc9jskptn70fu631usfvz741x597zbx9xyad05ypegqfu',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: null,
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: 'r28z51k1bn4155h98w1rcr57vb1s4iilat6exi9v74zgglehqitr19hnogpka49sjcdl0xc5up1',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 243678,
                alt: 'ibam1mi5zwnkj96wydbimv6ldtt2v6npyxris3vu66cx7rk06zbrrzvrz9bata4v7nmnzju0vovxd5ucxcxt38amuyqdul3w0eg4swc865e82f70ivdgrwudpi6dc2ng3q776c25cypl8wbxbqmtzvxg67rdov5n4deu5n09s05kt2mxbnh9c5ntfjz2tc5w05bwhvsbnh8q2l3z8tszdx9lvz5m92u3om44axlde20uqco16lz28wmdze1t30e',
                title: 'hdgewtly23zerisaezov8fmnwe0cs5frq0rkuqgzfb42de57bowa3ooekz349e0clsw3rm9fyl1u0jtol20qwae8ksaaiaus6o630yoa5m7z6r5mgr3d9gwg28ad7l5pqtgn0wmrwvm27yie7xg4g21fm1flu3h04ywdfzp75qm0oqi27v19511921kce3zs5m0xrl0gpl16tieqa7xdv5iz187pzg7pljhuauxno48m2igpbtqz2bgj4scaf1y',
                description: 'Cupiditate adipisci amet at iusto illum et incidunt omnis. Officiis et molestias cum. Ipsam sint quae enim accusantium maiores ut et possimus.',
                excerpt: 'Libero ut est ut aut id. Beatae ut molestiae. Fuga aut officiis maxime officia dolores est magni et. Ut autem assumenda mollitia placeat quisquam sit dolorem.',
                pathname: 'h30m98p4edkd13acgr2nk7vejha06u3sar8cdmim0ddcgzerj9w9po9268omkrqx6riw8e3meafwkfkige344kriji5dkjuj7puo813peqqkp4wogzyqh8k90wk53f5c3tuxdi1xaadhwhfu3834zyf5b8gdeauue5i06isud41a9ouxikwjiw580d48yy7tylpz29xgg3cuejibmxe26kvecr3bmdlj45016xodh5dco6bjcxs5pcgqjky4ufcqitlv2uhaxyinniyx5drj2krqp56ccdge4p9u2njmoef847x7z1fsg4s3wy105k3qltfszjmnpaj2tg9loy040kyf5b3pc02fyn6eaoxkyzjr1t346obh36xozr89cp5rwtthruhvn2vomikzv5g5krrwcgmbcfywkbozcvhxrhoo1sqwk77lbg040fyrxidi1hyw6ygbmq0caa6s3opm101epdhr13hm07qk0gl4p25rs7mlwrrauq3b04d09yt9pxw3v2uvz91aoj60go6us371on36yi2wixh1e4vxx4kfvt9ls8mggk6p9ibj6seiusomqu3endpykb272sutgvpi97t9cicusggc3hgqnfma6aiye0i62t3x7i6w6ero05s025wfpspxv27php1q1smieim4zp0zcgq7ln6xqgcc4j72fcg4u1i7ox7jmrcym9mwdz2atqfuba8hmot3f9gc2l7pfa263z9jt0v5g7j5vtcd4a3x7qyi7bwgj7ig888n867he6xkns6kxoq84w4w23d59ovbjcn1k8ogncaq84jmcf22qiibnnb2iy4fr5wjk8yshfqcstipgj8kt592s2uav5mwg9962tr3q1dqtr4j2zvnmbwphazzyxrfoi8rftt6g5q93ryx2iapabrf16tgnza8um23egzd6zxzvap8ab1rzgbichhlpnwlyog2685q6szpu34u6143nmksrlihmnid4bbbrqxkg5zm6g3607chy1hzvminnqkv',
                filename: 'pihxujyta7d6rs6isaamo0osyp3t1imotzqrk3vx2tb6tyf1i1gi1f7g5wiygqmk1dl1wx6d7edroh61tmn54zb3t0t5d4dshkue1khi1ml1qwhm3k7o3v0g9ep3k3s82v3tfkl8f19bj41yn2gwauobyfxuyan2chpwm8hbxgmmyice2a38xlk1rgn32yiltg0y2ccqgog95mx53stjrnegw70p27714wt38uen9sy9wir2d1q0ptaxeu8c2hg',
                url: '7rzjeywci50ansyvj1gren9ymh8itvgvbf93m36h8xgpbbij39rh1pk7teci5yslwm4jw2re5n9qab00yu6pyrlg3wezd04ipxneujlcn43wamqlauqhb1b7d3xjmvwc1wm954xrgg8ynvy4aj2ileit0ny2ax0avd4e070xmnfzhxei3669rnrr7r5wqjvmh69j25u8ml9xh3n4vg6dc0jo4l875ny9v4uazeqxksp76rgvyok08q5wx54fw0hn59uvwg29x1h4d0qakbfsb229i681hvxg1uxf9h05jnza67ejqoujij5qm1ij90c9wv3f7h0jveog5smfbeumhb7bwdomy4fznd1bpporytphtdylu8humltb3daomtuv3ugwoebdu0vt2iq1pyl0j4zljrjarojwn2ui3cea3mva6n8numh9elt8ji5vkg6r6vtzjuwk6zllptdvaqurgoogt6qq3s5ews9xpgiysxwmj4fx4fqk50rz1nrc4hsx4ivy546d7m1quw714aq2zcam644ly4h1op5qtyqlgprhhcbn564zhvmixsdw3pdjuktwaqa2nz9b7wdly490ng7na8c5mdkh13vu8yce49nz1jytx6kqhs1nizrqeetq302ipm348h5dxrimeprp8mscdc4fmtdvtb6nfg5l3f2ip0013so759oul5tuvm70x68rp7x1v12q7u60x5cfqk2shrlhnsoarv2ldyhuhpz7qtzcaymu80nkryvlc6flh0l05sf19d6yqigqct0blw3yv588o3us6mwp99hi7sl1f4sqkd4eb746csj1zfr48vgezwuf2lnvwk9d9yrcrhpygcf6ihnutzvexxshr8labza6tlobbphz6t1vpyceobxpmazsx0magw6ndu46gklgs9e6o7nvyv8tjuqc8agc30jblz44wrh4vlk7tdx95uezjgw9uvq33nxtkulkuf7ywyq8tmrbpirdjxnkzjdipmj2jxwnacwg0zci1inv',
                mime: 'sq29jqmgcx8avoir8am4ws7wxbf1luyqqxjxwr8rdc19ivp5o6',
                extension: 'vd6jj5snru1zptiid36k8o600yal4ctdnf6icz6eh4jmniiqot',
                size: 7668083740,
                width: 807688,
                height: 123525,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'j9kzl41j5hxfzcxpuz8kjqpksanuyzby9w5tzs0g6b47sfxz4qbd4a1g16usmly1349hudv12woyrckkqkecbai3n1r0mx062kv34fpdtzeghobdx139njqpkzyi84ew3ckwzm10gca5u5q7ch0d1pyo5378p1v3sf4obhsgutca8jg0y3e18zvie3j8n8ad7557epuha5sly31aukb6auxkiy0jiq08h7hmibpfjshjrnljwjeuycqm9kv9jfg',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: 'ene2jhw6rf5xqn3g85kkk3t2hi3mp5ufdvmhzr0jnd2h69t07pnzpour0jotyiwlxtehjpsikpm',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 423008,
                alt: 'cg7qfigymakssqjqgfwvwvm5zo7vrvhr92enn9vah7jzwubk0ttseqokr09y840b9rtwnkgnhejrdmhoetisp3kkga9iuewrryrpwwyk84gcvciz3hh3dbiwu3wlxr33baa4patepzd15gbjwevnztkm2g8zaahxmfs18h1rizxs0zue30ozguxyb636mtemay3mi7cgdjd2uoyogrchmikxh94i09vxdo3iuf5parw3xwqobz0084s5b7ou8bg',
                title: 'j8wnjp3iz6mrd6ar0qafossctgm1wi1l68q6pyrswt87lptsq57k6pnvxwei9yawho7tw2ttz3xf7be4yq1rl6651fw4fs771mv4inhaewulwdcwh7yywqyy16mqwjgg3yqwuqogf32i9juxvgb3ai8cmlf849dhjwbhuov2wb5hr6wagwslfhdumo9fxu5p9ptx0coev0yp2hhqz0navodtcnw1q02lq7ptk7vjjhvzvwa5ttnr2guxxm0ussj',
                description: 'Ipsa aut consequatur itaque sapiente veritatis. Quod praesentium autem sed esse aspernatur et nisi ipsam. Reiciendis ducimus dignissimos qui illo est rem consequatur. Et id veniam reprehenderit tempora. Esse alias est maiores qui nam facere.',
                excerpt: 'Ut aut amet architecto minima fuga. Voluptatibus est aut at. Aspernatur occaecati sint sequi pariatur sint et possimus consequatur. Reiciendis nulla molestiae illo ex in similique et inventore et.',
                pathname: '7ytp5m5blol9c1ijk6zlwm2jgu33r5e1c98b084u8v7bdu8o1jwb3rpj3pgz2tadftkkannksdfmqmgwd8ql6d8pi1n9005n5fqejwdghp42a22od7wpt72ttuhvrv73dsxi353vgwq8fvi1wh5hlr4ubwkqcmlzwth3f18425buog6w5y8ssvx4mdtnqs3p9ic0fhp3ogebzzihokz9jlar1clbvvvvwqhs3zk4rmqohe9fpwufu6w12goqjjblenuafk9ev5flmmaw9hul1sqap6zsowps6ysmb3d4xaswrrti7mqvearj6n56ckculnw6rlvuqqqh79pg2tg4fodh94yljz380m4trgqo696p8tnvh1frhor5ruvt6u8osic84jhuyg0ol52yjcrougbbr418jdmnpq2k9e74e6qme42q2bd60x9mht8795zisnvos28kaq136mxe3vpzk4jwk1d8giltwqybu7bocpdnxebd34ntvz43ktap0z2stdhvh9fw7rwz0wihvhqympyll4812si4nawpwkmlojs92ty8ta9fhejtpt5r8t0g8y5k7uj6fcnv8yv3wkl88tcw4p40qdo3ks0zpqkpt0mbb4rpezssx93xu6s5dkf2m1xyjjs8ccakc98f51lf47cslv0m3oh2kct2hyfaxoxlv3bchjapcc0qw7zze6ri7gp0922kk7o9jev5eycp3h9paf0wwp22ipzqhckjxkn33vn465082f0q38gcz3f4crbgwneh896grn5paiva021n6remaqq9kw88tai53kzornwscd1th96fp089lrsvo3rgvvvu2qx07q8q7er49px1xmi6b5rsw5mulwbjq3th6r4y4c85rw879v78ufldqt0ezkwe3097fc4l3e2l654p4l2odg6qfvf2haayngnfqs51fj938v6vq32kiysb73314jzjfy1zj4egy09ruitmakdw82vsl2bm99v6xf70or9agdn0ziz3hvede07n',
                filename: 'us1ea94mzblulbzz8ppbgwi1pxqpqld9b180of50629iscr5tlz8cjhhj4nknmrlnogg3fm1h1ryuoy2s3r1d6fwzm0i4fr1cl8asiukbhmrn25cf3gos2wdzqk8c2akfj6r8ett0sqgkzmgl9oahf2b5mnxzich3ricjlhi8f4tcg01ed3umfd459hubfqp6etdjvgdiku14gq7v11ajbi4f01grn5auzgg0vbk5vze8rlap8e621x9t8x3jjn',
                url: 'jpnm9id8oldg5g8j8qr7eheprh85jroekji9882rgwbbcb8hoofqw8idu4kwucaegydw9cs4g2dfrmgfx3ga6jgl5ja1ouvysidjn2v4renuhxwkvxrnhcw5bew2hzw3sjjaqdf2odb5fpuxcy4baspf7swpqwhed8zzayseu3twmj35ezlec03oomi9b7s0jmad4p5rkmll9yjmj4tjbgfx2jcfmx8jb3b7tcyn52e0gf7gwd12dz91q4sy8fy51vd27s18evfq94xmzvd263y0l3bo25zwjpx2e0f2tj5d7a10fl4g0r834prchdtx5qd99d37vdvktkvprngc287qwvsjcrl1it60a2sgxlnyc5rxwtui8j9mu2t9ll5xv4uq7mvksidg536s6iajcae7smytutr1ar099gmf18b3oyenv3m4xrov6tt1zyxvue7wce69zvtqrlvpi4y0n2hwv0nxktz2k2maxii2l26akjcv38sir9yiz3ugrd4nsf1tr7rfj1v9rrqgr7lto40ihdf94q7okydh8k8avyyy8dqjjnvamiobinxpsgahhw8ty1pxfq59gxlf2hfy31c2357uv7yv4k2nobseea4995l1d11udjwml58j4skixqjg514kbey2viswz4v0oqa55pug8jnei6dky9868djz37f9m76xqe1m2njez15g1kkn6422yi8zwiodswnmbl6mvrzczta1rnchfarpc17876vhikiffqmth4zkspyfieoyltc5bnls0sti2ytnzu8a2vd54cq5mjnfxvg2eaieamo0vmx6m5cahx6nybo0g899pv7q5z4t7g5fgkus91cz583rtfu2ux8403d5kb4ujz4jtlq0b4p59gx0nmgbjuhnx64h23cj7ieprurvtuam5jidiquexnsh1d6ft3w8rc5tnvghf6sae80drzgunss44aoekew81xdls11yxhrtrs1z1ie39x6rig6cpjbmpqm0y4zfb3lq1hiurud5',
                mime: '0z6fylel2aasoi9os58314x6jl0wjyc2drgzv7pyw5j9yiobl1',
                extension: 'beig8zh557d2dquaxd2y49om740ppt7b7jb4of6jizirddso80',
                size: 8225293408,
                width: 851544,
                height: 461069,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'f418pqp7ge5r4fftlh6p0jr3pu294rntlsnxrayxfhbrz4foklrv8exgb1l7ikcq1a4be80ooif79ce4k6p2f7tldweutzyrv62aiu1p0jm88c7sahk77dotbbxrbsf561hfbii9pwhnfco9sd8kjmruqcgxxw27aoou0506w427oraro34bfanlz3fqd5t8wfmhh5wfrxqhkbixvjd4dz66zb6fq6meufwuqarygsrbf397s17ncz42m02y0jm',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: null,
                attachableModel: 'kc93mwaqhvubw3g9z78z7rkrsciehv9t0w3sxa0cfbh5b11z2j7p0xrgnxmoxftwatqm8rdzogy',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 821640,
                alt: 'n00o4dxj2xy7l5oevp5opsqr7ltt59ytq9jcyh82gpklm2orh6h27fnym22n6s77w7595f1tos1e4u1whh65htx6jqterchtd1ez8u8mtupr97ey10zctxz3fk3fkdkv8p30plqhvumhd04g4chawnjsu7rlp2p0urs646fsfj3y3h5eg3ble3romh42veic4gsfaf72y0c9l8raemb2rsjowngato7qzj79tq0roegzd2t0ryb7abvo3mxqv5d',
                title: 'nmpxd62wvhypogjiek9of3rwok5y4tjb90yraos7cv2dg0cxaze5mxhab6lkuw47cm04ni9kn07a7k6mqxsm7cssvwlv3y8ear6i1xoy46k636ubmatyhpg3j6vxpqhcornnb3ixzvlvvn1xuzh0nyujxcmpjxv0g9vwjz0214ielccfyfky0pasm251ljm19c3ep336ql3g25o8ywkt84iz3ukxcxw9eij1jemslw8fg0te74ehdfippk7wra0',
                description: 'Explicabo ratione nostrum vitae ratione voluptates. Tempore quia quia quo aut provident et quibusdam. Soluta vel aut magni eveniet vitae eum. Eaque sint qui voluptatem nihil dolorem maxime. Sit nam iusto maiores atque maxime omnis repellat dolores est. Eos animi nisi eum cumque rerum repudiandae.',
                excerpt: 'Vel ullam quam adipisci necessitatibus quo asperiores. Ad incidunt omnis ipsa non. Ea in earum voluptas. Autem officiis dolores iste dolor in enim occaecati. Est deleniti totam sint harum velit in error quia. Et aliquid facere.',
                pathname: '72pt9qqx2srwv1fr5kscdmm4q7i2kjf0rt2aj0us2f0s1pgfvaatmjc6bwutbn47rfcl22tw952vjgvwpr8dten8url0dxbiq6yav8dflnb1y54iml0kabm03crfdfn81ib95638hm4t3h8wjazlmzuf5jtl4afp2poi92z4m3ez5e1037a3r4klp6y4vqv1cvn0eaplwvce04ukcfqteyf9hb3se8rjqvghhf7mahe38tlfze67gbenzsk72yt5wjja1bmvvgz8d27uz12t2wt9c89z0at2uch0bslnxcgh2oqf3za8zc289ekza7rwo3awgb02sb9acybyrxbub2airc3j7kb9cxfm8k95ke0ydtas9jrj13gyfs279t8le1p37rine1ysvs00x2lnfa0tou7ngjci4n97eajslhun4mu9jsssjagecpx4wg5grzi9ae28baar20naxnzxctie0nx2eg16a1l5y0dlql5gkf5t79s3bgj1imh655j23ehe7hr1j6n62urbba79ju4ndpzb92xe4jpwumi0h4l49dutwmif0iqfre77di6qifc0sxrs3f3zmue5lqklmcyytuzvs7nsnpt6tx4qwlq0pfs9iwbe8o2nll4nyullaru0duy6c83sehgptc1l0dpq0p0tromj4htaig2f21f3bckucgmlozwzsqn7he1f2mrwf1lm0u7c8gvpt9uk2228dnzk1szwzviv4h23b7emv7jd9zyam75x64qonmv28xrolkwce0eu30fprg1nvrvzrfbof1xu9de7dlyh322h515iqcqqp75i0oqvhlnalyvdgou3vux6yifeveweberpjna2kswuesgd4l6lwnh6umgl5iwe4mx3jv39u5oow6d57elyxye9gz57q9hmrb76os515dvy1zhgekm1cyp9jmroc5rzmvbr20d38oiokq7r63l96tchnghcvwvbg6clbf6vl4dfh8a3lujwqpd9qx713h7xnbxvtcq0kqhy',
                filename: '5ujesxguzj0d1cjat0b7jezp3pugqpu52b3uelbja7zu5l3g57c2ab8wli6lw2trssjp82wekuzutpy330wlrpxrpfdkg3mnynbifsun6vurrj32rq4r8k3i34fk3d22hxhs63dqzrmypvoxgev43fz7l8c73tys9oyfa3p413fyp48gf7ha7j1qxicmjxi281oetjhwgui0te2mv0kr3ofrx46amw4do1kevl2mwyu24pai5smvrde95xn6csg',
                url: '29uvnt1f81q3nr8hxt5bibmzh3hnzg88g33ypltovaiwl7j4zat5yz7pd5r7u83u9jjuclc0a9m3f95tw88ny8sjemra4wrbwzo6burcopsa91i0dcdvodojwmekur4dn2j7r3ca7stul3wdmnpnhtknwl24vpa3wszdkbfdkkzgh1buy5ss4j9ey9uvyja0v6i6bhm1058ecm3xosbyd4k42dofghkiisb6fjz3ps4unqg5q84gpxgovf9gkok0xs3nyvtcrmk66db7zopv7cmzxpoz3itv73vlq285x86pg1m9vr06rou9weo2jcy7qqnv7rt4wohv62j26xja111gjzez3blod770mflrgfb0169xo5jzws250p078cw4s4oi7y2vgemtkt1k9qv7y2fz6oruu6w8grh1t16b3s1rfc8uo3esur35t611x7az7z5cbrv9vlhegi17r0w22g9xyg5y2h7hi4vak7qolttt3pq066gr6jfs99agldnl84j4xdfcm1jc76njb1olrigtd90fdtwxkjz4z920lfacaxax7vhhenc60j59m8axk0hxiqtdt916pk2fabp7crm3yva5aufj1vercaz7qd6onbhcrwve02qjesbyqenpo0u85esyxcdzcx5o8ynp7l6em3dzawaycuugs5num7dfcq74gf3wgpr5odlsol0gz2pocuc6kx1xv3hvl1l0ixy5afa8kz84n7n040rbskxcv8qmmhvzaizfoi1swneei2pisn1z4vkiw6gvrdkzsrwnxgjo3aap3ro91gn4zvs6lp9cbfmkff7lda4kuvjdo709pqliwzzv4ilyhkac3kz0ypffo0uqbulundxp2gdmveiarq6gr3jbvw68qd6kqduzfc8wxeoi5axe6ym18i0mt59gn38r72aku0rh4n781yr8ks1eol3cl6bioxq82k70y4gej0ebb959re0pzo93jeucixxmcfst2is1fwvjyc00lefz31imd5s10cqv',
                mime: '5zdcd4eek8j5cm7jkwjcciarcen46b7eb2q7hcfbxl9r0ekm8y',
                extension: 'lgq17w6hca6l9spuo4fbduwfjhgtbb5nuqf1fubndnmx1svq9m',
                size: 7107337381,
                width: 621362,
                height: 782006,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'h5ryjxb1viaemrn45tsso8gg0y64kzvxuzx6bw10ed57d4p1r1dhca5l9ykwxph7u1gbfxy4aur53ee3999ny6kht1ludlybwuw6fydotufbvj2002gta6jp5alm29h5c8y5rsni03d76gwz3otjrjjfhedvrr56bai44sa3hxf3fycjicf1flvhylmrceyh00xznhkoio4gpr7e42m7as68f9gw02g3esuycks2xfdkazslnr3oh7mp4d6ab86',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                
                attachableModel: 'kgcji61dmeqjj22qf82wwixvv1nigg44dmjulblq7tcb4x5aeq2z3akwa41qq2j9k4h1gqtg38h',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 628712,
                alt: '4132x09yo7te7jqkxndzu2kxsyfm541pc7r8afnttedwm0g0f5g1inc6b6u76iq5p26onmef60my067l56vqkfc1nkd2o5onjy8ifadnbhpqg1o6icmkqlztrkf0hckn7n8yq5rko0tzd6rzb7yve5m11kl6r6tv16ers1pwqviv6yfy6x1ekzb19w27olesdl3ac6azqh6wrkvoaht8akjoiogx2ka3i7monbxygpopb5iro4sp7hnb0kbra0a',
                title: '5kytkxgo0t8iyuf6ouldz1u13qtn41vuw9vrr5ijzqjovc1ady8sxx90s1dgo8isoj3xa56mal6zmxzpxze8o16efwd8nrzk8jin9fbn38tjtc8ummw0beyyvjc1vyaijxmmgn8ytzvkzkop6g7hhf7lqkprokhn0stz6hnx40n4pmpsvmzk7euub5zmj8cb5rtma365ri8w6rn31x6dip7mf2m4wj2x2zs7r10dj3z5qrae8och8stczf04iju',
                description: 'Earum aut quia expedita. Sit sit itaque omnis dolorum voluptas dolores. Magni commodi sint deserunt corporis explicabo et.',
                excerpt: 'Tenetur id et doloribus rerum ipsum. Eaque dolores quo nemo. Qui adipisci eveniet vero possimus veritatis. Facilis aut eos. Mollitia voluptatum aperiam et.',
                pathname: 'wortsihu54jjp6qg6pnmfbguewh83479g3gl46m4dx87gdoiopmgx4y0sxw12suyz65gph64ucu7sjopdaptsg0twngip8ngbowkb8fcgunfwgwdp6ubofib39rjc427rpetj8p4h8esyrcxomly8miwls2r8uwsqj7amccxvcp08xbbmr0ds13mlr0jfcbxemi6i2onrzjxfdfmt5hcu9c5zoha2gp7fwqhgp5kzwmfzkilwwsac4j9q18nxifkio8itbe7k2sdevz8ncpi3bs714gcdivxhvvi3fc2bjh79qapznp4a73vpdswg4rems4m0iuuoz3rna1bdwtaoc5tpo15cl0ol0rgfr37od1sff6tmpclx9ewbu2t1l3e9t25vhm22mlmtlunnv0utub6sjsvs5qzwx47cpiwqfbcn5we3j57epg1binzd17wbhro03tl7fey4ljo9ugfue45ovhw4o0rnrihazjr7rckjx3n3bp7rlgxd34k1amno55neur76hhiozb7ovhy7r5ma3zn1xl6hqmjgljkbocykls1yvdiuhhg92e56w7vrn842h5wozajgcijwvpv9mnlwk23tio8ix2psea51o3q0nzk3lhozv4bvpvnp4sum8fdlbb3xa6q2vjzh2k0tcr0w0dp0eg8aidyevn8znwqnt1q3c1psa1x473k43dds7gsoybcxs9trs5sn21sqrgpd1z75i2jrqr21r13k937dursq447rj9mmd5oun4mzi00v04wo346ho415s2qz3ukb54e6e0ibiyfmeoj0oaakpuaho0qm8j6mys7czihzr0ti0n36w5odnpwx1bwbwnltovwof857y4fykvwvgqb07jwd7glve22mwr4ayar84w25edrr07l36y3zchzsx85bs80hl7pdq91t8sky0ute63l7tcb7ukonlqg1a6whbrsfh11edqifp7r2lh5wynmmh4m3qovahmrgt7p3ljsp31v9d2kaqexm4ylnda4',
                filename: 'v6xv8t65aoymm1ssc1ivg1p5atuopi907703fvlbeg36ta6pml79ojjtxvgs06zz8n5zmr12cb97qnrxe321v7twz9wvyoyhqxlwsgvbf47nq4xmejnpwm8hvvi1k6emsx9e0fueixfu0kl6wexh5k10nb2v4i92fo37xictfta8occ8l2pbqp8fad1r1b39657nnrozy1eeux7751f2twb52rqgq91dwtk3nlprly4b4o8sbjpskmu3wqfcmhj',
                url: 'cy1pjikgkckq4f5ho2coo142dn522sktb58v60vq2vawoo3mxt5qouexdoro9t8w3myq59u3jqp5k9v738mj400asvuyelr2vfwu5uf2vnhdsrtyymdyqhczcinq54p0xrlpmune756yhhet4byj7rgc7wd76nhdbyp7v5994nu1f2q1flbnt9ith15firmgcpxwgwyzkgk3ydi1z9ldeagwzb627mfckfjakow7bmoiypbpzmjtla73phs01hespdbc70xa1glfyyzjq529gjlk92uh4q96drg0xu6ubuqgb0d6jmi6csaycvk0nxflpzw76np4mckq7ljvurwe02yfsha3ln11z3bo5q7cddejrvfzoj1h2aojclas1b08oilv8x9bt8czshjy8jir32v3vwxtkk1d5dqobrx5td0avmbazkcrmd88p8uv67fakiozqh5y6i9fgijb4cmpnw63owkny7ds7j12jna8w36e5mr0rinogwldteto6xn6kzlqzcvz4cp21cpp80udsvev3jo8o91w575t0v0m4duc43wd236amzdqqqjjvtznzjqrzy8ui8ghyo4zepe5g6o0j6lbmso4l5c79nyy8qxy8z4sqedtnjlrqmip20dd1xbct3kb2zj6ph4qoaig33c9djfbitz523ahe4sjxfkusjr0fk0fldt9hthzf1g6c4llnn4ds4787xq3fdbou4828vhzvbzx6ygizkwh5v7lvdpby8avuvt7q10bbhaskgkaudk5p4ovhmu87ec8dqpx8492nyjov8h08hbta2zniuxbmk3w9jjlc4gtvjf8onktrqavqia49rcf8p2w5ue7wif9e207pab2cq08rp076kxxjezr600h30yjnvsqp7hihv279dkbtsour3y59246ky9fxamcu3ea1i43ei244nofgl06lx5koqrlgnemj75u0x919622dgnctuu8pxqyk8tsgxi6iparo4dwhuun6p4012t8jobxocp7ivnc',
                mime: 'f91gowu9pm7zkxp4gqv8u66s98epmx0hvom52oz5u6dawcod9w',
                extension: '1krd3vx5jhtxywzxwvqpnrskyd18kvxzyiyq7zgo5hbhtz1f4v',
                size: 8881796414,
                width: 718443,
                height: 540162,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: '80ewldreh6eigdbfpp5mplxk1hi11mzse0jle1yfrbkfetrmumqrfm2pakq0mzhwr8cr3y9wuswvx0981szkmb62131cdscduar57ol6oxyy46jmaolhqrxcr5e0v2tt5gix7wwst8gu85lc65vx5mks8f7psha1y7s68ry2xfohs3yelv1ygq8gjfcqbjgukran1iu2gduh8pt8ia1vop7hxyrhj9ii0aa5cdg7pmgx8n1mxmpvmy82u7x0k2t',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: null,
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 223197,
                alt: 'a1x01hkip5414tpbwvucb77pwkk3dlyjji1b7esa96t5u7zyeew8j0b8kui69c65b37ufgi9p4zl6czxd7dp0u7pvr148v6ul2x4qbekvx2azev5ew9fmvy5k4bij7cfog5jsmhumbxkllqyw6p5i0uh18wy3bbmwxgwp4jj8xwc1prbefm927ka3dsjt99mvx9rk9tdqk2f96453y19j5saa0k38k6el1re3m3de6mor8lvc61u2iqyuju9891',
                title: 'd4f6x7v67ybqfvfss9p4nyd7rd0oxrhbgr75fuftw3wybke2eu2bwetcp1fp0uc1w7k5tyj0hlnpnausig79s45p06hkkps2j64yknrdwwkb9qqllqcu3s7neez6k51td80gfvwt3wno9jo1crav01d55tkjr4oi0fpsnq8c0ydokjueqpvsdre08ua2fmme7003p9foy5mdllfynp5tekx5lhgizlz7csocmrkx91ct7iouda52xrn9zd8t26z',
                description: 'Error illum nemo recusandae perspiciatis. Enim aut nisi commodi molestias rerum adipisci aut nam ad. Vel quis nihil est atque aperiam delectus maiores.',
                excerpt: 'Delectus qui aut earum perferendis excepturi corrupti et error. Qui consequatur eius ducimus sit ea suscipit corrupti in nemo. Et minima placeat perferendis tempora necessitatibus iusto. Error consectetur inventore cum consequuntur suscipit eos maiores. Adipisci consequatur est vero dolorem magni ipsum qui. Eum quibusdam animi nostrum quod voluptas modi.',
                pathname: 'r3iyfeklsszugqmp9z4d8an5sg6pijdwo4t3e1onr2pk1j11dei9xnxkcqi7nltmkh4m2nc0l5g8qx3i2mraexn2wwcpuyh5v44lefp6vkwkewzgk7qxu5wo6a175g9cbpyb9jhu68hnbk4jh07c7xi3qse8pr8ay9nlxtcdmavz4r86z3gxsyywqsavasz9gx1rt650c5thb0jp7imcn39dchpyfp7pnnn2cemt9ldv5w8fj8md77zp7yxb4qkm5s2jp1evrhrr58edyw17seto7y56gmnxym9pp0v5u1myk8b622oy6cg0qz3ndsvens3r095a1h8qvbbrqz1gjxirn06s8p9tawn5c97l69zyc7l26ywrfxxll7kac61blsnedh7942qaxc8509qf4i38065v0tpf8vprlwwejy4wd9jvr35k0owmjes0ido87vf9ime3zpy7l8ej7gty9yyjkja2cgzuliqov5woqqxkjmspc7ou9pa7s5h5844sxcly5c1w6o8m0fhtdiio8x0vcmfzce5gs1kipeiliyozkj25vgd2tzl4g83c431eaica72uf1wy3b7bqxp40k78wzrjhti0tw6os34bn4v2ipltalwct3k5wevacke0erotc1lwpmbg86x7trp7eazae5uwjxca1ijualnpgju6r7ln088uclmh95eb3pubfyy8o4vnk0z04wp5ucl77zrtt22gf3asqtbicto28induq6gcxk40lgq5cmlcs4scnrsdoqhyctpm8yv6ck5ewjsm19l7slt200c6qk5512byq9bv5cgghqv88vi6ykvi7mgspw8xewv9w8kh992qqb5akqu597qx3g49koq5z3cdduk6hi5vcx5hodmtg7xs0vsaw57emgtidjsii2k7rmpth48db5pjd8krli2n9thzcqn00mbxoip9gm7jzl7amr0yc4woak0mwjfh8vsop47cg3pvdl230ebrychpel852hxzaaut9zxerc167ee3',
                filename: 'eex5cpnxj4sa0pv3lvmkgnt67d3tiy9802tyib54j7nvbdhd8zqyj0nztxfubhx4tp4eha4k4y80hblekucq2epge97lssygda913kt40gijfsba9pt53b0hjykqejwdafuzi5vmdc85z1j8xtnx4ran7tamfeab1mumqulsi33gwmuj0t0zu7m1phoml6ml6r6fexp3rb8mrbn814x960wo2psbol4akvjd8r3l8df0yaqtlv2fsdzm5gnrqbn',
                url: '4xggxgublel6fzkd2nz44j2jhargdx7i5owpa671w35j2uw5dnyywlwe6yc2i7beq800clre9x4g8eg6an9vsvvrnzqzd3ewkam8vmbrlc0tg56rgwk2udy6131g3fz1u0qislnlvwgtfhtbulzx4ytpeh5j5qvfc3f3rekzdmvfrn98y4dcj78gborvkisemhkzbw3egk0ck8eyi2c1yikofum9pfozis20r8r4qfyxtf0poowxjcwzqwqpnbr1u1s006aq6ky2hctj0wnvg1ld7uk80ocvnuviocdmc6u1om1xdee0e8q895gk2ikphogn9apzpww5y89dy8kv6wyleswl66wxeiyar86wblgrfopwwtv3dzr1b1gnlbwrvzfm4ip1yx5oidpvo0glze5fnhmap09pvigskdnpy2e98kc4a9u50jzcgr1qgia7a3enxfazmsc63rxczk1r27687k63fmrn50ntsymhfq7bfr1ylbj55dm5ovihrv1tf58hb01zp6rf33zyt189tkm49mv67rb4kpeaceagebx5g7yr4o3uxvfzdqyndtyzd445njfnndukz69538mlt8v8hficlhmq9yi7lhtwlx1hrlthctgho6yxore85vgg5a2a64pkld21pb3bm0gjub8459tpabu8kn53d0cetezo0w7pjltkcs7v3kbzs682qqqrjw72uoacmhp0rbhjktaoeo9kzm8d6l57pyj7lcrcno5vfq9zt6z4k3vq6n084hjdrt8o9f2ku3j9xjhvgtb982jb763hevanxkf9sub5hq86zaatc9y9jdnn7ti6eyf0ollr6kukihc3uwifbv1vt9mw9vzi5axdvmlxvzv1epvb67n104sd0k1bryscfvqpvcgv16ugzwdybae3nkdb4itz6ji9b591b04r0ro23g55n0x7va87kjhezl0bbeyv2axhnfvkrmr91usweac3ih68bj18hthok8n9b7yu8hvkipwhpd9alfhnmncr',
                mime: 'xmchuz3t5973pk2ml706wpa9hrlymypx9o4gekol7ogjp1oqga',
                extension: 'lt6qbyj6mwxolny8k6ilnl1owocth5k6ny9t26ulwh1jizjhpj',
                size: 1714660956,
                width: 889273,
                height: 808526,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'lwdtqopoc1qty6cm34v2cfxqoa6zrkelysww5zvax54i6j97h4l2y5i1dmkxrqhhnj6l2h2ix5na4vonhu61l0krtwkjl9o9e774mczn6nc0tb9g0lkgeqqe1lfryg6rebltnqi6wpjwh8yrqtjsermazyxa894yw0isdke92n8s9p277cnfwcq97zk7wbqlozq95yapcds5yjku8awx4hdbwc9mkuw3dywnbqrvfweuiraiucvefsei4xg7ajz',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 308061,
                alt: 'ycv53s1nfy5wrs6d8glt225qdvh175do2wsmxtho5mxc2npm2o7pbu801r5a04s0eochr8tsq28pvxobiphcmypoxpewg6jzbmi8flzwnk54sfatxewkfdn9k9upewwvwde9j0zlljp6uzpls2okq2lhp3u5g8bb0ehinnufr3b47ogtxdq9xarfbcw1538a0v11k8s74bnv5pffrax2fetiolqcq0w3uwkkqzio6hxgqki9yer4a41g6i2y193',
                title: 'y9ukfe8fgstj4bzkttvtwzbb5w4y7fulzjqac9cfbttrzc28cs0zguwbpbwbzfslpmgvo8b6x4o39muoj8ykhb5xc2kidwpyb48p2flm74k1f13kqw8qx3fn7zwq048vf8vc45da4k88p59gboq534a1z12e8gt25wtxrpctl0k38956q8k8eayj1kp0czyhkvgb3as26cd13br7p5unfh7jys0ahkyc1u93g9l6znr97r874ftn2x1wf0ej6nn',
                description: 'Neque voluptas voluptas a in mollitia quo. Cum nobis recusandae voluptatem aut. Est sapiente minus et est id quos adipisci et. Eum amet aperiam recusandae et amet quibusdam nesciunt.',
                excerpt: 'Rerum amet quasi. Vitae excepturi ea repellat iusto atque ad laborum enim illum. Delectus totam veritatis. Distinctio nam alias blanditiis sint esse. Occaecati incidunt voluptatem inventore at doloribus. Facere fugiat minus.',
                pathname: '54h9c51robshbx6t32p8f0s180mm7vplddchy65ile02s20liwssyve65ircsgwg49wohvkkxlkoua9p4l0cj1svd21mxfzafmktzmrc1hiajf3z9vlarq4vflik3aat90448r7bvj9lj8c2jqttf949jdwovdk3ctqxd0pxnhajsfqy2375qffc2lunqiig9s75o3hvp4l16w7tumvgcrs5sxitnhw6m7neabixllp0tb9mnenm797h3w9oubnx46g9p4znf7ls6y3265ggrqk01bpgz0dftf3iwa8dy53isynm2ngk5cyrzos9xvcm6hyxoou8haoqnr0ig2m7lbrn9xycpl8amcvw5kix1b2hhnrq62qcuyu6qcgq7zqxtkkv76ixzbwkiz49xtsauxrym2de1qewffdjw905xb27mp165iecs5a16u746msqulj5dplknxsocqnd64t1lovzvzoqyi884jsuc4pp0f4j5dkshgph8j3h8iigg0401knsagbruvnbvp6xkai0q0jk719ob09jx3d382v9q0l2z35utlyls6up6zvvtzshjmtrgr6hac17yzcvwcelw3mo1xap45ueq9e8x0wyt2hfuw9x6swt5z6ot3hd495stfh7hw3816wx0rfz4he9yj98fppflpqt7urmapnku5hc7zjnf0owobv4tkix9n9lp19knffa5b864qf7drmfc18mra4iiqwgq51668zd043dxesr5dwd59g9p6adq6sqdrjv2rneddxijhy8d036zv1ms20vprrklsf8wbo5vtu9r71owsgs7uqwlowfm7lwjk9p2iq9auatak7y0e5iorcsisbkby9u3ui1nqrlazmo2liay2wkt0v48o6txsjfd0s7v2tns7ltdtv5ybq3jjy3d6xfr8j6q32e3ku61tey669dllva9y8rlena5jieqoapuj1wnsd4l9x6zcz5g8ldapojympfng0o4338yswsxvm0leltq4c8upyssgg6',
                filename: '0318799moo0v7eb4niw5dp8isiecwnn20lmnoobvzlegr4okmjkwp46crcg4575vt134389djgmea951vhcaxvvfhdpz0vrbqj9lqpzwyfb8c8z76wxs7nr9ik24ooe0inp7b21316hem4byevwyxi59ehne2n9efnhl0ozicet1d6vhh1wqc0mavbk6830xymyfxd0abnttv6nrnm2zq4idlqagvkdjj0qaqp5rno3hxt8d5ckp1wyap5kspoi',
                url: '4j9nfe4pf42u836wzz6hxocwlged5yox8bif5f0lnuunqfc6qlznvkqa4ak4qdj2sqdx4xcdmfhwc2c5hpf5t55c2c0aczrveiljtebdzwvvnzc0z4a28ftoc41cu2rk51x9sqwbf0vlla1je12qxzvv5jrx6r2yxnypk4yeqr22ly3simdxr34ozcedqzbwzrz322gvh5sune2h4kwt8qltgzq4dk26eeglg90vzwv0comappce2dosev2l1m2c4951ada3xb18cveldfs8v5781vk4jc640vefsbmw6xdlghjizjqubjfoqmncxxtypke0i31ubtz4vmfs7e42yirco2qebbrgn2pogg714e05644jiaq90wf6wp9vxc70eg3r7hq9l2urxqm5yh9uu7w2wbnfrvl3me458jr6dky7qguw5uk8tlr1pkaovh0yt4ewj75m03mumza6g1rscm91hizheqwb06abxwq7csexdu0v8vp5r60gqqj7aizx6uqfrj4l45i6dge639zsyiy3w1l4b7bqbnjtj0dem9cijy75lnhxo3f0idu8fd7x9b0ejwcgqucwid0sp1mvnaqx3hg4ysq9slvpvvbqnjdfrhuvvhs5oybe2klyxvkbe2myjff0zymo3b3e3a7daat4e1dsmli10xt5hexduc4fzz5ngti72d2sk30k4854gc6a8922cbfujb1w7tl7lkgfsfiig0ldnxg2p5bdhc5m3gvdc8j1cwzjh5rck7xmvd05hjj244qou3vgratrc5pn37m45by3lx5irry8bpx94xdrod6xf177512x5ban3n7cn6ot9qjmvohtod3gd5kmij7hsv9s6a1a74zhdd1q8dbk4kcrjfq1u4hlid49w7c6fgpbicf56se51w3umbd8hdtf98l23zr28bj0ostoswdretzs5yfzqri7lclk3t2eqbhzjf77almlyjmkl68fj1r1px0384axq6uz04hz4xszpieqlcvv5us7pvet',
                mime: '5vt34kg3ga70o8sq4l9vy5tz848gyfyhicsjb3mz5c55h3ta7w',
                extension: '9e1ixhu6q9e9fc6hjqadai5fkffnrdwak3kte73vb05pxe8720',
                size: 3497753189,
                width: 923981,
                height: 512665,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'ndyn0y6cfp60ncfue16p3yhvwjpg4nwpv76yp3pxxqvsuh6wx7f9uywrohojgait0xdde5reeqnpqqiefgh7kffwcx3y2qhyytzc88xc9jcpg1t6mf2m1hlithl53kjakyerlj9hh6h3qwcflxw63q5e4edxxzpwgvsnzuxyk5g8xlmoz9v0fg8oacg6v0w8l6ubmb3r6rjx5omgisbqmc4gdo864naq5rxwlr48t0kwwgdvllorpvpcqekjkq3',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: 'pihrnmtdhywapogv3oih9a0qw66lhqmgknfbyozbtnj5cv0vz1z27irludq81qnqu8sj5hou4z7',
                attachableId: null,
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 232905,
                alt: 'va093j2ohwg6uqr30gubb1z9p14ecr3usyfiufnaicirpdvzb2gpu4arce9zgmwnqyt9m5trl2robecpmdmna698e98mpkbtv91i2rtad3gbgqh1nrx95wfqh6tbbr8x0h1l1stb8njruzrusqq7bm5w2q0yxz1edhbouhsqoeza7tcb24p3l5qsqwxom6vauacfz6x4la77labeq7o55nnqav39e8yzsilhvnxja8ke8uf8p309hzf8hkclva1',
                title: 'p2npqxaoanxv3g21lsd0v30vlvc8eqtcfc6rwwqlm7p8t9zb3aphwrdomyaq6treaxpm4t1nq3g01uti4tsmcvvlle3cjitds1o7yxxxsvybi2noaulj3r6vo3ogwccnussinp5q5x4asqyjmveffeky4h8hoe6s2v5al0qyx3eyqpijxalezd2kw5k8m489oatdlpiny95p8418fyrolpc83pqxkfkrmfn4azgi5rv47quqb66pr7vzgn8xc7u',
                description: 'Sed minus magni officiis accusamus iure enim. Laborum modi voluptatem iusto occaecati. Culpa quidem quia est voluptatibus error aut. Quidem similique commodi et aut rerum vel laudantium architecto. Eos cumque possimus voluptatem officia ullam facilis dolorem assumenda ut.',
                excerpt: 'Nemo quam laboriosam id labore aut cupiditate aperiam rerum ut. Culpa saepe dicta et est dolorum odio tempore officiis nihil. Consectetur ab nemo accusamus assumenda reprehenderit vero. Voluptas eligendi consequuntur qui voluptatem non.',
                pathname: 'xdxfo4pe7eo2ob4ygl00p9z6d5hsnq9lrnzwmvu1y7anijowf43ulsqmb1h4v784kdds80urzke6e4ak0to1xri4bsknbw7hgjcsxg502h5mtwjonljo7nnqh0g7l9fs2pf71busiknlifqnoxqqhv1qwfg8xovdgnwj1hfqpcz1ii2e9oe9o4mh4lyahozde16b0halkma3ihn3fpv7fhrrbg9sqcae6737blg9te9mr8kwtb9h1m28y6dg589s9cv67fkewz0ct9yh0c329meu73jqahfuc6i2odi5thuyfk26e15n72voqcn8gn260xtgmi4vcyt30npii9t9kbnj3lfq98bkmbkv4qir0ly10iaew3ln56xm2ex3j6xbc042lq85ccvfielq1iz5aegziratvvn82vsnts7sqvtny4ri4jf94fqa8vqqq4oydvh3qjnjntfak2bksf0f9p94d2leuvhj5vnljupm984g7zq3zbmdto9rog0blmoo8visobcal9q2air282lc6oklak1bkchh384vykj4k7hi7nrpo9ptxt9lumsdqjj1ef9l7o9ww1c5eywrl1bbg565q583pvey9o8kjd5eny4mlifiajt8r53ij2uc4j8vos7z1m4x6kjuf4xr97fe5kb6ydigwtjppl62rizq2b2b7v1fa7zltjgj9vs1zqdf3ugwrgdg4w41t280thoh5727k8asmv75xcu6540vrw4kvknhl6dp8ho90nbytus4cqdhw3c1ybptx7tkk65exe62y9swaw9veqpievz59774xr2qwab7f227he734yql5ew5xslxnd6ziwehicnhxiraizp8vpvm4gpdcrzn3hreqzq41jy8mvbogtqiwh47a5s8l0xnm8u7rxw5o0h7psbiu93dfhah0i4jxu7j5ttbl0pc86mkp7wba9kkireja960b1ag0lr7osztx7vhchifsxrwmnufqkb72o0iu192xtvm3348ouw71tgrklri',
                filename: 'b47c5j3wpgazbzmnt4kkhx3drdx2htsvtngr83y73gw7c5a6ecopmu4bwoxyjuw5pciwwq6f559vlop9eyzx26j69qi5q143f5mic7nreh3y3t0dr5d6yt4nbidy5qp5swza2zp7c33p3fsdd2l2p9f883ytvolnx2uktgd07954g5ptqwjlmw8ivkykz23mq0vt3vzlwu00b44stdgqc0lzxdory9bs34fqijnj2h1mn47vkpe0u668cemmsy9',
                url: '5kopujary5cj0bgv5rt9d2zqjf8791yxo08df6sggr53kf0py3rs1i3ky7evbsyjaawt63ml7hyepe93v2suahndv2dbrvjvtlmw1nu5v05lci11a38zrz8xxhqzffufvztudpxxyhzgpn3toljuqkpwxrl5wndnop6flcqfyg1nzzkumuz07i9ua52o2n7d5rq7kw5rd2js4f89c15p9vlsq22zeiiiu1lgyreg7dxhayvoaupzbntjdv386q0skucjoqfvkz0xxzjy7jc3xjr8k6yygkbp8mul8mis81owcb5uih29cp1soqssbp0hwxxg0o041hkj4us7tqxkabafb1kubg34y3ji3m03piyddxwjw7o1izgiw23s6jq42kqk3kf8neuheiswgs1e54g5e4xl5pud8vwvnmtrwq88a4d0k9gtbi60ji8afj6bgiv2wl21ryb8e0gwtsztqhynabnyg0qonxslppvm3lhtvdr1jcpzgavhkfdh1zeo6lu1ctzt9dehwcl5d170x0wonkx9qamxozwggqt22lt3bdhi52k5q60s8vb4rnqle3xckjg2jioepivggwhx08fbaxppft5ppwlfkduw7vdqksklp346t4nf36536hlhf1swfxhosa8oihstk5h7pts68knf3vyiu2fz70mdf2y7c36xz22tlc4xksk1uevrdi8e70zzcq9djydjeia01kfssqidkp0l54fz3p2uh0p40lo96k5gwinidqhwklgb5iuvx8i6uedvrysdxwe43365pcoltu8j5wrwcu92z2a7hplmelm1t9rx3wpt4xx3lahacif6yaxp6gixdbvjwjhujikfw2g9tt8512s36rwj5zv9dhou6iiyfby9x4gz7lg8y1febbtz6ahf1w9nwm0ldke5lvintyq26ypzq676whzf4xh7yomls8ubil1pdq1u0x3km38go9860yjgh58oji0l1dh0mefz4hdow7ryqyrb6akwjmmuexk78v55',
                mime: 't8hzo2z3crcoqyyzqv57m2hlkyavixzy2c9afs0jkig0rf2rhm',
                extension: 'o3g7udk4hhuokqyp7efzpytuulwxkyqfgqifvvxqxxv73yb8vj',
                size: 8643029194,
                width: 829662,
                height: 505816,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: '38lfbwzf5mgebdyr5q3j4nsi9buvcfooa6uqfykf1zv4e0fnhmsxyt5w9cs17zuxd1gekvw0yqpftys4f3l2p1gipfixnwtrphbxxo7t3xkx5hvbhjnxcwkedg9dmmby7e8yfdzoah93t7sy6lpuyqy4vm4j8lym5rquqz0g3lgdhz8ctlrnxfmndbi20sqo9voii6z93gxfdc97tzpb4ab0bhkj8vozfdfa4fsmgj89funr924d47jkn0jg4ik',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: 'ztr5yg8lvzp9emn9q3gf2mecr7jwglhzue2r4rb9286q4yjhk7jk1mw0d6ao0rzmp1r1c557cqd',
                
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 789607,
                alt: 'u1jby5f6nwt281eeubr30xhqp9m1mjphrezkmw8ped6vhr5u1gay4x56w7qvb0vdf8d9pg8uy5zrsu6kauo3e1f64mr106glsyn85anrknf1ygzckohem4krfs4a2bz5iy858qk292am17hnpcratlc2acik6ya5wd9ctvntcv69h3a5r7ssz8ul2ncjdhqqyv1k02412yrigb30duhr5tbe6jq7u2gpx8b4ixxud1fx19h4oxxyd6lasgh0l12',
                title: '257rxshgxz779jrl7mfnzbjfyendj07kmn1ue6f9hbjfpinzgtwytedxdnkers3nzcbowy4if7az0ikx6k20mu3hkrqlp290m4jb0aw77bx9hlt25l8ihf7wuzuhqv3tdw2y6o0k6a206cw4ti2t813zghglg63kmgylwu0396wektl3ux0mezznn6t1mdhnahe76q9jrjmjcgzx7zij0nc8ta81gxctx7qkqqmv4vayd2hze19ou8pvjjayy6e',
                description: 'Qui magnam commodi possimus fugit. Rerum distinctio minus ea. Porro voluptas dignissimos nesciunt molestias reprehenderit facilis. Rerum deleniti aut distinctio ducimus. Consequatur quia velit adipisci impedit culpa officiis. Molestias aliquam sunt sint possimus corporis aut.',
                excerpt: 'Ea fugit sed non aut magni dolore occaecati ab. Est dolorum qui sit. In error ut. Ea et veniam alias qui dignissimos omnis eum odit. Sit dolores ea quibusdam error asperiores repellendus voluptas beatae.',
                pathname: 'k0ejnkxovvaj7rssfs9mwymhja0b1ajjz5c7p0tg8ev0wzsqdq6f6dvqll7by2xll09yu00il5tancol5np92q08dz3t3ua1oagz72vgsjuv95o3za8mv0tna5a6xgegxvy0shpjtcstyp820hpr6burswt1zm3rgdc8mcpspwemn61e416ich0k11gar3nrxoyfy6kc15e0vk70q8izy1tgzsmof9sd7c6e6pj8ddn44mmrfa4hv4o7hk2fzi5kn6tyc74nj7zs18elt4fbhl4nt0j60e3nhbh90igz9ahk80x891f537rj7uxstf73y74hw5i1e1wem6uovq323jujkyleb9g46y2hhcldjuswqiwh22zhmbij945216awoyhd31cza3l3lask3l225bczxjw0wzpkhkmji2hefsr2mn8068sxgiiqva1z1lrakon3j2noijv9vdqp5kc11e51dzal97or5u3wqtpc3fgkev3u7iy6hqtz3t6jqy9hegxkd7sd3xw151soirvvx0gdxogz6yb816nnq9ycn66qpswe48m768479dhbwwu5fbhs32cvbczb987frguue0pjn6knvi59a2n224fd9zxxk61zdc1o0hc68tq9om97l4e61xea2yyrzfhzzie9i3714b11leaiijs89mm3ywdj3gu7knyhnanvk7ye3jvstwuh881h8qspwst688od351m21imw5j0v3dn2d0o9ed3478z4uzzg7t9fpneels7b3b7gckqx50w7nxwtjon1k4xl21f27iryricilvd6noc22kxem4ewsyhoi46j9ktgrli34h4o2hyetkje4621mqh3mrwihd9t7bx7w2sjrbhc272al9r4dd0llimsunqndgw7arltyi71ij1jrle8x6wngge50qd6yh3cj08486z06tl2mxlj51ziw8whw3go3bg1eicu7yimzdx299ykq7ogbt0jih0vmkipygk7b3igue75a9i0en1dr7lx51s',
                filename: 'grrwalsb3db209v1ode4zq6y7679mqwd2bgxz1e9mj01fd3o17wq780mpxw0db9g9l0l5v5wq1prfdl58jx6azxcq0mz6kgbuprlvaknx16xw53hxo7izpmpwgsi3nwa3fbn8c4l5e55xz3x5g6339whvl8p9o9dau51nx0zf2g7qvprn6ee60bwf8b7od3vdqg8kgd411v10nw79dw1v4au1hjad5b6l39758714yftmgspnpo945kqdpwb4yc',
                url: 'tsgd0ey2t9s761kuow76lkf0zpu3shr6al72y78wd88sh2xqladj7cyc7re8qk9f0k2rmldui948iskorjpccsi98ega4fqj9q53w2ugilr2cpea2dtw6rfzxo02cabr4tu7742lxokij4gj7gw8yz4p8q9jjsn9z127f8oxej7ziv7tqevwlfobss1egjwxezm3xfeilatszum9j3renr9x3aa33p8z1aajxyrug1ay4k71kkralsn9prz0f90zs7n1d08oqm47u3bcfkdc560pke9oz50jmz3dd3qh05ugw85i9946e3u2f6vgdkbqapbb0c7etdd2hqt85e9w6o6irsu3keubcudad7znehdy2ew3qvwxdablykflo8o8n7obe373x3k0wy0bsn0r1o3tqxy337xvqehcuouiz96q7uv2nj9l1r0szvr0tjg0zyt66oni6olv1yxub6kaigo4afogjlnb541qbngaad5x9chn5bjm4ml1l1xusxrmdtjqnbi7ly2i78hjihvoeerj7xok0a31vwf7pj83up7dfdm3u5in9ljw0cf1ppaw2xdpbh5ee2ggapj4crqbdrfxakm278mdlygpg8t4elntbz097wpavlf7zi0rkxdzubu282b21s9to2qy4yj524c69nk93ep9t2pv0wvbrjt8cdxogvzn1un3dn2c271rjqbip147wouigl7nmqvzefaq6zm0o7ingc5n240kpe4fnpceyf1p2q89ob3090j25wujq1watszpbs01p30vpvhmfd24yhrbgx26n4b8m1yiciv150gti3h6u9p3c67zpt6j1fb8g19v4nfu7qmazyhd9u22mh6tqt29m9wi06gk7lc93p8ow7er7kwpfd5qosvxsyhckfr5xza5f1lsheoxevcnk2ioghyi0be74p857xd0tbnx4f47j3p0sy8rezawg3e8jplgjwy58qvdhr0o1elwkwb8kouh7s0wnfdpik4uwq1c3k4koi3qttsi',
                mime: 'x22f5zkbf6mka89m78z5g6mz6w08jtp94kklzr4wgbgyumttcz',
                extension: 'rx5suraxt9lpfr5qyqlw3uqrb6d36t1lzmxi3rwdc9bcawumnb',
                size: 9396662134,
                width: 127952,
                height: 161077,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'z5tln5ceqhjy0e821u4mbyi04y7jqbgpa6x6jk81oltza3lrg3shos3ri9bptnv74atu55ase1l07i9rsb1nkbtaecwi7v3gzpo84zlhnbtimy4aygfknj0x41w3zd71lovysd02ymqa13x2e3kmrtin6jkkpv9o2d87to2w5r6yrdmu9doz0oq0t6ee37ewzcz4h90iv4o44iiuslscjjg6e10j9bvjl8mx4pj5kvteun8qdzibvejtky3u1me',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: '2u4c8hgth4nb1ata5dstov8b1nztkv0dkumc95rxrf9tfi8bqcgqfsm79jvm7147jehkca4e9fo',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 800855,
                alt: 'tv2mj303mqnsqoo59qhfv90tyqkk2cgyxsbrejbskuocni4p1uawyh4g26r5vbvqvspvmyex2uiygiqymiblf47mw6qhb24g4evymqsd8a4f8gydp51wkjz7rcnuc61owhy47s8kbkj7slrd2g4qtqcm0ev2svf5fxvyn39jlp82nmakz39e6ag5g10kepvj6jq7929wmz93qhxpovr14bb7oi614vjj7yhezo7s6tpvl4x0g20par09um3hcpd',
                title: 'zia392wl5io7vxmba0mqmyx4ngq44mlflli2e9vmhyva4qyiwt93cxnwizfyp63acn98wppp9dvk1w7pe19e2enww6dtm0zsjt2p86va35905f9v6obgjokp03iyaolkalygnz2boi4shg0c780lauus1tsbu501thwlljtpzu74z2zqgvdm65xvpm54t95sq7eu9jcg7nwuewfeq1f5dakzdcocwh9tw330kx9psoyz37pvwh5jsh7m6rqa927',
                description: 'Sint deserunt ut voluptatem atque minus. Aut id totam ea dignissimos rerum. Est at dolor praesentium excepturi consequatur reprehenderit reiciendis occaecati magni. Velit officiis officia possimus nemo maiores ipsum dolor architecto dolore. Possimus ut ratione et unde eligendi eum deleniti alias voluptatem. Architecto sunt libero quia minima eum fugiat suscipit adipisci.',
                excerpt: 'Ipsum dolor error aut occaecati ex animi. Et quia dicta nulla labore suscipit accusamus. Omnis asperiores impedit. Ut cupiditate ut voluptate aut odio quia. Modi accusamus possimus. Hic aut ut alias temporibus sequi quod nisi.',
                pathname: null,
                filename: 'cc9hsadux2femmcq8x7grnazgqrapfdu5cmfxtpl9q3q88jp7yosu6y3ogwrg41922822hpmbqrch112epxqimfarwez15gqprdbwje6eskh4ivzm8eeakak1z647pn1sie55o6mla2gkoa5ydanwx7v4h7mqz8h57gkaonrtdvksajbxfz5pon9zmyor6h2a9gl5eu3m86j049xoyc0jgyle7pj09uzwiwj9d5ac0usl7v152p9xvxu703c645',
                url: 'jzfodafgkowa8gydhwcgzvv26io805puetev2orindbsnrr5ij92x25319va4ni2lgxggdxi7put3mi5bddw6qnqeciasj6jk3hegbbviapu77ow8ryb72qjng4vwzeilf80fa4pbn8y1v6oycn5uo4fnosep4wdlmp11fkhqzhohrnvnfc7g6u2lps7ney8uaxxggfxapap7xpz14xez56713yncnkad92j3mk8pc9xvh6bc0e2r77z3ox33tdovm48u1l3x837kalspz92f27ij9ydpqj049x13zn66vujhsng4pepkiq59klzb1jr1zuldl1ckuhnpxfs9ug3fzox2q7edy16hkdfh6evst7lu7ei6bei35mnlsb08i9ic0elftnggubdl7j21j6grfqdwvfsf4c3z7suhpwhk7lrqvd9nkqy9w0tbhz768nmkjt6lsx9evix72ztvtcskmlykhx6y8gt6m7szvs1cc8n87gjx9tvjzu1092s589ti0soe4c23xq4h3qkb1fklfkf4cd6ym27atvez1rz0ep9qhe2hzcb42m1hw1o30klpjd4oqt43ko74lf26ussqgzelrqxy0uxmc8dd4ua77bvicedbkeoveg74y09lxtcnl19h9jidcsh7xya2abiyambodiusqukxowsec1z4hlhcpd9j0vbqd6rrxo6vo3vul4ks5b8dxksza7lubo21bxxd6csm6hhemfhph5i67mjwjm7owgbkum48nt5gk02n66ujg0s73yqnuyvrt92t9l141zyomnru4y9dkb3yzdzfgorcwmx8x6xmp20fkh52o3aw0b16cl4gulej6oh97fl5xmaniq2sgqaloelnj917ajq01rm3fmlr2qkvt9x18zk75knmf6yz46cgzi7z0upu4njngtqa008cc8w0lbinyhni6z9jcd9tuvccm6kpx1q83ecbpnomi0ue5t787dlrj7a8lfw6e599cnyndlyes47k5bijbm66bgzwvrk',
                mime: 'sgrh8qiwx2outmi5ibr6meltodi3kgb4fag04n03c3rz2sm0gk',
                extension: 'uik66q4mnhmtop0jynd59xgpj9wfc2zpbu9s348lbmo333vin2',
                size: 9744253712,
                width: 408472,
                height: 772247,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'a11dw7892o2xk53e18mho4sdnpbbi3gujf4zw8t6q8yyp2k3zol49zuswc5ople7ifmpnd3xkfx74i8ebcmqy0bzjqwfcv2olsrc6vci0jdhl97ijlcie0pwl1h9cwvw3frtkli6e377dvus0unakv9wmdkxq0yytl0u68uu22dsdmr8rpy0ax0pyqnhzosxspqpcc8ec9k27jdg2mwdrief0o149u30uh4rgkmp9gulig2w18tz8c2nh2npxih',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: 's2fvp24j1gcy37h62bzrpq0nf7gztxcb6wxutq1ywygi0b0mic9aqbvvfj4mghid47yojqp0pn2',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 506199,
                alt: '7c8x7wrqzyy6eu0q8v0aulzyxws3tb96uyvdg8n53mwsvqaxhvqb1yspsrrj35qepuubn5h87uq9ieap20tcw9i7doff0vsmah4bbyitv4wi7q7b9gxhm1j8b9hrtfdojkiuu39rpymxnhk64yj9kl9zqcdtgc6dsto6zlxvsrpirbfto7p76njteb4llewcw9037z7ns8pfruklnjcykufce6io5zr83inbnqs6wdpudkhrd4fvxhhv10jkpiy',
                title: 'yose99q9j1j836y6bcpq1ucoij90d69i8ev3159e5337l8vd4338c22mtwc87f0ha2qnlfdt00o8uir8y6zbwgnvxrqb8ktksptoe58iraywgssuatv2wmr4ba6xno9q0vmuzinzwfjiev5spe6s2hp8zetzxo6pact2bqtci00z1yxotpuxayls9fq5vdmpzps9tbqqdfm95nhxdaq43e9tnfrsod1os2yz3tk6r8r0iasnefl63j25i2yycgz',
                description: 'Impedit non aut quisquam velit consequuntur dicta ea corrupti. Est sed cupiditate sapiente maiores id. Animi illum rerum. Recusandae ipsum quia. Corporis sapiente illum non aspernatur sint corporis adipisci voluptas sunt.',
                excerpt: 'Et et maiores eum quidem asperiores. Qui delectus ea maiores enim recusandae ea vero officia enim. Hic eligendi quibusdam eum animi molestias. Magni nihil omnis commodi temporibus molestiae. Cupiditate in molestiae dolorem deleniti.',
                
                filename: 'bz9alyogahd7t8qul5q9qn95884ye1s8ahil9f49rihxxuwfjl9e016ja0n7u5ai3cadp460ko74i1sxqp474ua5cyfqrqs293tye1fxcjbm2splyxk8qwldevyxecgcuzvljfblsfvv3ht3b6uffjz2kdlsmdn5opc0g8ol5g7waobt39xsx5t5res8t0coi87sfz671q72ph749bleaatzsvp2anx5cm2ywqfx61pd8z9llczxnwgfhqor1gr',
                url: 'z8yx4sz77epqwgysref4xsiupjadwtystrsiogazvjyblihdd2bigdh6i2u57orth5ypgl0b9xd6tsfl6tkzh68k7h5vqjy5bd9nzgn4d1c8fsfmlfd9esf9j313nmnmayzw1f9o7xlstx1xg9efyzt62ghu9tb97dyexs7oo7r7yqxhs2mriagvwkfaov6s28l3f6ekqb6xitg2i5bm9mko8phxytql6vbonajq7lp6xq4n3zljsa1yliz2zdl7kgn1451g8v360flbpvo4cc8p40onb5ehjyxp9gdtlx1p7qhwvk3yu9apc32i313lmyxbpuou70yeis5pmh4i96wwiskfqzv8i2fmi2rx472wsusvpcgv2gpm6hqjrusry8c68vq824tc5sma8zf7r6n2ecuur8oxc98yrogm58pmcxm7ws226r3ugih6uvkoumc9qypk41f2d8zodz2z60yzuzkskqtoot2uwlbn3ltv3xd03odmxznkpujqrppq5nr3xpsqpf5fjzq4m3aow2gpobdt2u5xbmxsrge13efdun099whhvioar5ykovn4ycztjiln8tdxmalifypy5tnm0ai0rl13jksxp3ding94oeqzg991dmt3lpcw8ski4d9qa5plel5g70z3nm85qlmngej2ri3p8ergne7a61zo2rb15u9fc97l0uhb3yrm4f9j0gu2kcvaiwu3oamsvje8gnwuzwqrgk705lcmkq4lxrxhadpzraxxai3y4nvfalt1esvttmvqqqgbjujiegxifmt5kapyim6mrjgu7uyt5zpjflb8vh4h6tvdgwz4cllkatvowun8lj0uzbxtcl99s3grpssr5qttr74en4x5r63ty3q2ic4j6uggsgglc5x6zd2odj0pbkjk7n1hif7xlry1n2ccamg8rxux8kok0plui0qpymnnucpwm4f0m1x8zxttdmupaznj0f6eu5s9ckqrx262g7f9w3h2x5y6c4endvjx9wkii6yckkmc',
                mime: 'w8r7p78f9fdurt0ynznmewk3186z62l8hk3fagp4svcdyedn2n',
                extension: 'a9teyuoujn3yzrhsjik4ac9c6hiymahlz95gw13pqdgvxqjl7t',
                size: 8634589404,
                width: 590925,
                height: 987955,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: '31ufa9i0cz2yfyeufide2l74ik7riv0iqy13k31tsuw15e3ldm3tdrjlqocmtq5jk7bfor24nsvxkhwnrw1ee7z91st4ptlcr55ufy1mqeccouzmz7tfq5phz2ma1jlgpev2nblmlfsooxhzowhrrq460d74z5hcardbty7c3n6qib60595e8u0xiur7dabzcdqdkzt0fa1e5u9kcgiv114fihfuddxcuie8o61xqnrhgxgrjzz9mhkqf9fwl3y',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: 'zdb387tbr07l9urikpqroysy07rjukagycltozp6ykmng67aug6afz6qsyl1jsxxfn3wyrqm6ig',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 910355,
                alt: 'yggvrn3ye37ovt5gyqf6clkw9ifldfc18rpmr3oeryifsbllszhdfd7ocissuq7uj0juz5cfyjcjez9yzh48121m43tmoth3zij1umu0vcm0z35fpgujbcd1hij0hg1wtus4p0ywsn1jc1qud38q7y63turkkq7rv3ekp1junw57xl78ys8i8sojqccx29v45igcn69y28ygbrbcp05sznm0h344k4t5hycxs8x920b48ufadsz74rzx0yrx5hx',
                title: 'gbsxhynpn7u93miuvgq29v09q94rnsfi1iy2sitlbyp976qsymqcnna396brpwlziihgyfzapcd7ma5mir6rrf3tvgafi9rjrgn7upn5oqi2rxfdxyj3z91rryx8ezn7dp5wmxuhcqpbc3kzvj1ush41moc7oncfegf9dh7bvcirvdlb00dsar63f6rag1butqplu1g4fb4pz1vqw2ct47wyvu7h74oxbz1yu1s4c3g2799lnmp31vvy68cvfba',
                description: 'Numquam sed et eos laborum fuga. Accusamus optio consequuntur in quidem ut. Sit suscipit aperiam magni similique eaque suscipit sit velit.',
                excerpt: 'Voluptatum asperiores quo assumenda laborum eaque. Assumenda excepturi reprehenderit perspiciatis maxime rerum. Et reiciendis magnam maiores. Error id tempore rerum.',
                pathname: '9ju2jal8kxmdc2txuhxz2o75wzmv1rztepgt2ichz0e1egrbmnssd2iu1vm2wi8krrfamxfrs6ndnen9fl5ucsyats0pnet1xyg5r3t8nhmixmr2q0e5xfqi2psulq58bkduwat8pe70hy8wm4zlnag48g84wzohduhz0vuormu92pydoxgnaks8eupcsklussyoqg2guy17ets0ztznwnhvf9yxstx4nukkzo62iz7woxh3puol0rke49awn2pl5mpe243dzyp6e47yan95plc1p7kilugwonfxpsdkgzzjap4diwrxptqway2tte36ogf9sll3eup7eir48cq3d8rbqpmpalypgq2ra6hbq2m2v0qdmn1lgxkce6267r4lqkk4ijzbsukl1xw5otetjo9uyptm7n2xiznkv8x39n7e9d5l1vlaogprhf151owrjv832nz4bxsog9judwnhchoj8mdqkpvzxvad7h2zml406v3zo8fd5chfq098vk7jvhjx7exmq3s2v3iolpgvftv47tboudcym3rbknhnm6spu0lat5gbwyxfgblvbeoyze4wsqve4n1cx2agf838heru7orcvcivk8aktadc58mvi53beny7041vjaec9h57rzvucx3rqfehba622yo4ql4zzxn72jzg7iw7fgt0g5pmg4wb6u5yvr7ieqh3nw49k4maaaqj4r51cem0bdrri2elrasgtnz6xrbnxo88xp14y2x1d7fmlx9mpjfbr5buhx0iqspigo8shuyidie5dt0oh27u4lvruodionu7ngx9p0wtttoeqhgfxrgjwpnl6i1sj022jo57ny9p4lfyoj6rjwydxjbtlyf5wrds6cife69yeqw4ecbkctbwg6mr1ze5kxnhiqozk48i34puxwcp5mq2ocor30vyjo36xb1pwkm1g5682z5qayb1jwudqgnu2qq5mnti4cb07aamci0dmvehm2bk8wh7too39xjfbf9w3c6kqka52jmz3adf',
                filename: null,
                url: '2rdazzfne08dx608z4vf51ug7m0z1c6fblzgqerah55572s77k9z7a0areosjgx6owkuu7g3wypc67usvqyyp2q3jb706p6al4bb1bwxea4lkw0n5pcpwjmq7hmk0aw5qxcr825x2mc39uzutdi3mmft2h3ntt44b7mqsmghbyr0xgr9kngbyampfotkvgbzcvk8w047094yfikqp81c76earch1ebtpyv55siqvefnuevmyzp87o21x07drig8dps952modgfjmglk2va7fb6jjjgh42tf68fi3jxfcehmigc0m3cgaltbzxe86xy1k4wun1jg5gmlqi8qd973pbqe0lram35oo9f6layu4mjx2fzz6d6xhnxa24w9lfqt3cvweedpfhwywtjdic9x1vo6f4fpqrs3501onmzqadqpojvp6c8eoab6huasclkeciiciz4eka3ntgbt6438hj4h2mbx4sa17d0atblnnb1k1tcz4wz2dbc19ailkgk9koa0h6umdgna95euk6lxet7aeqj6y0e3l3wcz12j4b1zonw120pk3qfirj9mn6po6a3yxy1pqdq54cr27gnjlbbhl0k21r1jl5nanfv8imls2cm7i1f5u1rvjg8cvgvsx5klos0jc2r0cwebq1wj6t43j8cb45u5jhend5ycaimh167s7m4ff9t3uu16mnt1ahouoj4dobrn4s0ybrg4r9soq3tp4ea4l7wkspwqry3s5sl4zf872zsjz7h7tuop70v8q0y90sv14hrjq40qk0uuyoaumrcnshp428e185962p4gtv5bclkanvy0b0c96qcqy6por73eawv1cls9npz1qv1s7t1lxv7mbr8h18uqv4tkmcllb2sqo4hxnzg6v72saev4059hslpjwmcocj5n6mnajto9esw2wc0rd9ko691vie8kdgyyfy53k143zbxlby3zrro22bwuydc3t7hxelnrtptzx07f4cujmy64231fvgoou29prb5g1wubr',
                mime: 'zp7855tm4n291z7s07cz150kwcphwtgxu1bifioeqeepkf2y4e',
                extension: 'a3k19s5cccoymyzmtqotnxmdx3em5wsjiat6x910oro17wyg4o',
                size: 7712105369,
                width: 298869,
                height: 885942,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'wsecn3n9p7ltwu5xkx9qzcnfuc2t21qx314rphwitjg2o26nky5s1qfce8iccwwperqcjixluocu7c2qgi11375ldcy5ojm1oe3yrw8r5i0deeer86mupxdjss4w27h79ebn0f5tjdg0t1pj1h2kld588na6v0xrsjmzelc03obkef1sz5ris117r5a0sz765ugz1zgp9hmszhvb28d8s2ba0pflxzpap0rn43s5dobu8eg57nshn3p8ks72vcf',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: 'jacknatpfihdh4qjz78jtussuhgez10eps8sundqr7mfdvbmqivv1rjd6zuglm1d29b089nxs76',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 967042,
                alt: 'jzpsjovrgzs5sbui4s1fj9ic45h4uz12v3zb29zjevjt6qsen1qzf66o5oqz7ugdmo41bg3gwoxnocvloi9s3yrad59yntwb7u2ug7bk2glzap3x5zlu7f7hxbkv7syeu3b601rddkzqvw93539aiz36lndyks65tqjm28wae7um4tiom7shl72al58npuusfocz791h9jdt0wfiqhvau87cgtl6y6cmxlwpn8uj7f8rfnw4ib3cp3or6pwrakq',
                title: 'g7gz4c0ncv3xrvwp5ihzzzley8gfe6jit86bnn10u5pwc2zf1nknyvnqvlcn0y2j5w1bfx07m8svfm6si48ko012jrxe5xv51mk1ey5l9diy2wsfd3wsl86e7x453ar7dmtfo8pjeiz7ra8mitvhbyabsmarol7qbonju97om48x5e9l6zwc0z2mwcli82k9v7phnzaq7xwol7ai15tvb7cyfktgbvumq6a5pgqvahi59o77i0n3p0fdhngewq0',
                description: 'Consequatur earum illo voluptatem ut autem aut. Rerum molestiae dolorem voluptas eius maxime repudiandae sint officia. Voluptas sed aut rerum et quo. Dolorum omnis odio soluta.',
                excerpt: 'Consectetur aut autem quisquam nihil consequatur iste quibusdam doloribus quibusdam. Laboriosam quia nihil maxime sequi sed iusto consequatur eaque dolores. Inventore voluptas quae iusto aliquam et est. Aut nobis voluptatem. Est fuga alias voluptates odio id. Voluptatum unde dignissimos porro.',
                pathname: 'rauzn5vb328zezd66anxsactjvs1zyvi7cgg7jxhciy7i11p0nvj8gmcb2gid15j4rj5t8f82ark8u33xd7y8gioutlgb6hcd41o0upctw4zawpa6flc1dtrhcrl2w96an8njae8nbv4h4asiuzyuhprdf436inpgq1gt1hnd1ohhidccrvzmhhjyd4b2vrzxgbdkrpxtxdxf5e7z81jmovjkkv2it4gx9d7w65dx5au6e0depokrw98cxjk1f5iwk0tnxvbhus4psn72epvthy87kam58i4zcj78kj15zbqsp2iwdr35hivno0c90ggejq4no1m808aipqp9rqqwhoeyhi06r4uh8574y6yinykag123y5rvu7jcyh1unxs8ogducj8drxmhybozap2g5g0aavpvasf86ee2h08ag5vvk3qny4s1a4uqqm73juhui6ckgmjlygy98upm9nrl2k5iwo8j6zw8i9xyf8vk6214957hkcjm9xxyujygivca52bricqko9fos935vv67trd08pitftn0sslh0hteqegtfsdyxcrh9ichqpslffcw43h0o6bfb2d2al0nvropqoqwk59v1byjtbwdj87o1krfy3k4mb3fu527ykwy822t9ch9pkuwsc9j93gwza4z9gjsvltsipr0u2s8ytwo80xmurgmh93i7vcexuevfkfe19qme73xv5aj1p8v7skbugpntgppiptj98l5p9w6plbtkk0se25bfsijk17eis3o9pk8gyps3om1i8jksu4w9gmp1miifoupwoafd0iddye480jhdeuw4oun1pu8627cbbdlqdjyrt17t59h5u66xvqhj113pov7armzda0w8tqlbcquteg8dvf3xkizz4okisyb7rwuar3k3rraijb8iw086zddzewqsw9djx7tdng38p416ps5whr54cn7xvfk5bs1oz5apgwmmcoe3yyv7gmkjur0od5ac3otp28wv5f0hynukxlo6eim2kzx7jp',
                
                url: '98j05qzquu4022nmadqtw04kkk7fukg6qg3ncp79e98fbvrr47ndq1ixv6uwnm0eba0pnmrfjm90j973xqie4yiedx7e4iv0bk4eaxglrztzk13q1q148e071f1d36wzcu0fvowmhme85dcivpxcyzd7jcdmhg8ggsmjccnlv6zkt2dnf6qrnfabmk3p3xnuao2ms1s37pbqrvh72jnp0whk2ofhu0a8xlyyctrtfl2u5v90fmxyagdyjdyfjum15k863g4deflxqqinqi671ma958xwj09co4lydglug6gav4gs36unmn6tkhrm836zd2a9mj1jv3fj6i5rci9x8reskce59k3tccr1902sriuvju6lm881ub9qs99vsbgok5uv02hyyq2dxpkj4klt83ojitmqip0fo4zv2gqllqgwndj3mhy5nyijnmx6nyc9a356rsxuwwniaj8k9lovagsoflltej082xq47nvh5we9zk4mtvzty1u9jecljqviquvy2i4o8kepc4n0j9nqal2pcshj6qtevobeefa2msz5m5aec5jjebzntbwo807a8zijxuau9xyg6okkh1lz3htj7d0ftun7xlmxd5rgvxh7uim00kf5x3vh5v35aobf8n5ald3elmg1wro6mx0ae1r32f0mc6oe4ii8yrfrmfl1za0sn3ngyu2z4t0z62ktl6oylpfuqbd7sgsba48w3jicm5p280dnwa3tfeh4rhh50fpgybn8468069ie7c66u19mk8mrl2ltaf0q5fue6e1x88nlyfbpyft58vdgulj5hkprs2peiyuo6xl4q76tsnvznul0sblujw0j5uy37wbngf0bbtjgvx8p4v3dtl8w9eayv6u0s9xy1l9qn4ik745kbp16wcw633thc9a9h4a090kfi5xhbo5lzjzkh57vyd9zalmxtn01sbhtjneb235nbwoavidc6h44ttlgmp5cm9lu5mfvy3q7f6sr9fnxqymxrkjtplrstby4x475',
                mime: 'xyod51ibpee41ccjxcv8kjk13mp9daabfng63o1tsqxfytiv7x',
                extension: 'ra32hy64z7aj7on94s078y81jbobjmrcmm7kwhh6fu66ug350o',
                size: 2446577549,
                width: 304557,
                height: 743567,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'bcrnf9mjei2s9el2m7pjaw2nssmye96a8jsh2d2eji4qzlhbqdq9liv31y4m2lkq2bevtbzbedoqvkeuh56e6tmjvq4xmp4eyrzb2gu4yk10h6fkqlhqr8sk8562exe8v0dekbye0666jcx9hmgajgquorsxudgenzs6tnfntmtf6ao336rtw3xv4vsoyg0haektnufvlmro6cn97wbrgs7wdbr6tjk8rd8eong5s8q4z6j52xbvg2jwy07zko4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: '44o3gl0dx6o6cqvsrgn6qqorfnkjss2hwpy5xc8w8l0ee2m53pd3kl8u3oowips9b7phmkvkpzp',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 329373,
                alt: '5wwfwtehg782q9qzo5b2hzpmxxx5vrxw6312aym7pgqkj2ktcmn3m78fhyf6ibpnj4gx7br0b2994tawb4dmi4al1q7wt6x7r7di5o3vwynnlqxi5w3gi9omllbgi3cr35dc2mfpnvzknevi25nl0g5he4f6133wusa75tsvklyh726h4w5o9uac6gjpv9jy69r8nl7qkhe1x5nm2ksx3qyi0e01uifdrghj85iu9d1z2j5cap9b5v6b9m5wkcc',
                title: '894uda1d8uz5mi0q4sjd7isgx0wysmva899le16p9es364583eaj2m6q8xtjhk7i0t28uv6v5gx9kbo73bz4vejgbflvnzowyvt16r355h7by7inb9upccrcg9wlk7seu8jr7ugnlhyjyzysildgslf1uhkwu3bko2tzxpx8w0ovq467dayng4gmpc9h8e4172z1wz7uxs92tbl1klmolm59koy4zw7c7iemobqgneilwxy3229679cwc3z73p9',
                description: 'Similique aut quia quisquam ad qui enim sunt dolor. Possimus quibusdam eaque beatae aspernatur. Deleniti non libero autem expedita.',
                excerpt: 'Dolores error adipisci omnis velit et illo quasi quam. Aut voluptas delectus est aut rem accusamus. Id rerum reprehenderit recusandae eveniet enim. Quis id atque hic amet.',
                pathname: '2jd8ap6ucvrqueikx7hi0ewgcvsscgna8maiwv2nkoqdlwsfx41k36009atlk0ph2ifpmp8m7pfpvhv859h9mkwdwmladetxp3m41pwl5w7297ula99nd07cxbq8u2rk1918zv0h3jn3a620bdkaipywe1j4g9wiegf12iay2m5ga1mxx7wxih4tuqpxxdvn3adiyjiaort95a8r55tnwltzhly2t8kkl9h7nj6yf23zo9gx4pito1tt463xeahj7f8wfpz9bpexyf73eaigaepfg8f4dds4d1l10x8meebg1suikfkag3yrcincr509brtqokch8xe6399jkbymec99dahcepa63180wb93t102es5rdnmedvkndforvu2dx0gfd7f3ucccmq7aw5jqsmfij5zs003wrjsx13sfyo0nkdlgghlvhwvleoro8jyf67wdny6kehnzks4s9wfs27jaaf8z3u6kcgnvgqxz2yqath00wag4wg2pvbemxbqjcqsmtzihd0kg57ygiudpiov82oko8d1mmprqxz47p182uyxdlwnreec1r9ncbesowhrwo5igcuyqtv3jotl0ed476sib463sxgmgrxkokvmys9v6c5u9dsbfy11m6gvho4ooir45kirn8ispwgoknwrhitiqkqrcf97ptsm1y9obsk4vrn1ei8na0a604o37plf3ztz1fs4y8x1bktzp7dihft1ohyd9y7swhe0xmre24z652l8ei5hsn7jxlrmphy9x5cjwqnb82pm571clv9vcy3mkslqwzqr9azs53nk7avqy1hn7yrxweuwg33mdngrryr5m7rom696aet512pcm2cyfgvz6nnqfnwxiiw0eyh4eety4cod9z9m7yoec0pq4disznpeyb7fc6dl4hby0kvfcfrmrmowz88lcuvo53zqe73s1ri8aszwxbsrwk1rubxy770mlbg8tiw072o43tqod7qhhd02yhctamug1vhggvkbw01mwv1y5ejsc',
                filename: 'bkv6pvn1bzheqhsd9dxlfb8kct95wgz0jnrt97kxt9irm9tu699cslxbpysmkuvm0pkvoqs2w2sc6nk5jhd2va1t5ee11inof8yawsk0p9c9lmcyx8gujg33i3egv6wsavrbur29pym2h8funxuq6ixqv0s03fet4tkjstlrhjpg90tv44z6640u7l1e12r81sykjg6i7mtlib7qterizsk27s7b2d2hbug6txl1z0vd8qrhem2y4t6yo8fv2ce',
                url: null,
                mime: '8lcmiveahx78eahtf0ut8yafov41h0703ozhdvbeb7shr9qp01',
                extension: 'm02wf5olo5em6f5ci1jyf35kv4u4mpqd4gfv3329uxynuxvhio',
                size: 8081690815,
                width: 316447,
                height: 562807,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'u8lpw5l9wnv5sfegysml3wf3n34hkf7rmf152xc4lgbkglij17g4t0sfyem35epdrsql62ehirolt5lqz2skayvxnifanc3eirc6f1zoq8975xsjsigh4mnudqm4vwkfky0eze6w3jaw0cthifqttn5i32r5u9yzlo4n1fwe21yd34urq8bo5jzhfpv9pglestz6ab6v5xldz7q7pgwj4mi4lz3xy6m739o9zzjpd4g7a77bwps6wus4i5z4eaq',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: '0dhgu4pnxa60599om0re1uo6tz915srivkte8938vbmwe6zwpvcpsnp4nxctf4mzq3iaunovfy8',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 455779,
                alt: '9cs6o9mj2sajtepd6ffpqwzq2pws1gkkozxwizv71vkdhfl48k6a8hsvq0pjl4i966obhv2ljsx5wyek30cfhd2a135y4z78io7ub0p8fuz6b8nhie6vaskvtquaap0xr3tijlnu2pzfam4eod6vr8igkydbvfr87z824xmh5opuauo4s9xust3opvckltlhtbrtylsn4c74fx2axlad99pyn10n45agpmi65yj5dwboo8mcnnush0weqn32m4b',
                title: 'hsz0owoewe42rqy4hefnveydj54re38t2gu98g41kfmk45qih1x5g0rrbgp53vn12r9tfm3ky37rkhwtgdjlu8ixwerohvo2sfabebauhiifyrdq9eykoa8qw3hv8kv8wz6zxcj4xl0jx2ixx2hdh1a4w5ro72n5zl8py6dar5hfzl64ygkg2jyy2s3ug3wv03wh14njsw0v9rsv44a5e183u8a59ynrg9cgl7ljxmspcnq0dtrvnjcxvidmmyp',
                description: 'Nulla consequatur eius odio. Soluta et ea autem iure. Dolor ipsam voluptatem ea accusantium. Et quaerat nesciunt ipsum ipsa vitae quos nulla delectus necessitatibus. Et eos consequatur. Laudantium ducimus qui earum.',
                excerpt: 'Ipsa velit officia animi consectetur sit in cum sint occaecati. Ipsam esse reiciendis nemo eaque quas est ipsam. Accusamus ab magnam. Voluptatem esse harum esse illo et. Qui qui et nihil optio error necessitatibus ut omnis. Dolorem placeat labore.',
                pathname: '29xdsn4ig07om0hf24gcfv4r26fx1tetm5blt28qpalod3iq7ejwm2uetolwnti07gss34hryc4141vnt0sbl946rtsbamkfwqt72o72j7nbb5e8v2w4bgnl3976bkrojdgcio96gk7em1lw8tfy2crdkbtc36plhhbbnss4imhokf8lyft8y0mbbxu2q0j78nhhs2wdptozvzzzb8mjf6xulk5dttnld6vyg47iou7lwibdwzji7qa2lx968483gokzoiid0cu3s6rbxg7rdta1fxgm32my8xt2ixfhbvlra2wz55771nhrcbln0f01eefmig4rmuv56hzdb761y5yc5o6gink90gxkpbd8z7pxj8im8loqzjuz34mhaueekdbzld5bwe4yvx5dqru3yc1g6q1apwm9s1qsnwjbtvntwwp1dul6my21fjayan45inbuwp8faa0a002fp2fagzle7e8upd7ngge1qbggsp0stwx5gjyycdr4zg2vr3qkmf8uz786t6eauebclei1q7fhbph96y2r9qifwr5fa8uk5fuzy35eqxvd42u1lvkovbikvyfm7bqkdnpr918bvl5smrabee1l150mmbrcehtlek8n037rdc57k842o2omu6qcb3ysl2c2b63nwdu77m39wu0uq5fwj7cjffmyez4xwgthmyz0rcnds652sq3xyabqdtebjliadncwed17kup4difbwld7agn5jtsj8exqc1a5b1xe2fb2r6z2he3hqe979tsns77dcq5pigdlww9z1xtafvrgd3fspi3sms2mb5vj0cw2w9n4ov1g2zbhr61rbnajip98tk8fi7yqh0u53p5qyl2600ilohhtrvfvswlqsrn02c9t0c6d8awax2wh691ab737njxv3so53a1wvnxvqq9ghihgq6b4lons5gy89rrccashegbt624v56ewo81aik7c14kyzkc6iwl5gmb315rvukkb5d0csruln9ikgh6n2xrmo8pii563',
                filename: 'fmhq51025tbivdtbuo8ylx9ozj99v94fqra6syoc0ct9ocqyimcc170beypi9mchitslrk1flm9eo99tc6g7i4i29tpjfjj8wi75h3b6u45hr3n2w0wfthxv1n59xfcxj1qs1tflkjl73we617sgrq78r5j7s39hpw4trwxgr2axh3euxdb2amypg3m3ragak1ii08olj4qx553po3l6difdbm75r931vv6zksjjefl646vtrndk75pq176ooor',
                
                mime: 'zkpgy30uvhorbg503nc27xtpwhl72httrcs4a4ntp62bu51rru',
                extension: '5wd5lee3anz0oingdrgjtsh1ceha506j8dpu6slxy24e477qui',
                size: 4110180939,
                width: 642278,
                height: 611562,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'h4dd3cj87wxwswwf5ewlvc9ubw08n1iw2t3k37hh2hh6v6lvakmwjj73k6ura9vb8pz7ojmkw0f8bd6jaasu90xe0baci28y0k6omrrsho7yn11paa4q8tfbbe1d313df2eo66gz8l5w4t9u3edx3l16he72z34imnl60z6mtj1bxuk1ep6k5vyi3s0ryatpzcg397mh281vhlbf7bhdeorwduo9rivkx5s8smy9yif5tx7q2mnekortu06ot2y',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: '7dfkrdn4rv017vplyf4kqr95nu3e0mhyxhmhvwi1noumxpyvbu77lq10yc1u7w4qqsvv9qdzooi',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 441321,
                alt: 'azu0dv4d4ecrdnmgrlu9l7nfgzfnno2dqhueh6yjhz0czzaw2207ngpx4fp64t0omkugl8n81tw6tdvdjw13crddxup2bu3ipnum2ki7ydlto4yh0v82c1ml9k2leqx15hpor2emmy6es91y3f266wrq8xlxp25n2xto23qdp7t9eh6psskirlk84hnkujqsbr6ivzpwajw97d1tasovty1j1l4j2p1kwj8uf9yyn9jsgr4l13qsf82lmfu7hzd',
                title: '3j6scf6ew053vgoqf2wlqufwb05s9rnatukk2vv7vusvjxveywbz6dx8nyc1cm7ge93f3gyqg4siz4gnno5mw3388s18ihmvjh1j29osyegjc79qluhvocpdblchjif5uk27t5xn1qy4dfjrf5evlxbcggiljg5n85a4oi4c5rg9ximfqtcz8w484rz593flf8399v4a2n0tty4jockxz7sc0vjb449awquqa4xgjut432hidp3j6di5wdg1ztr',
                description: 'Molestiae autem error est odit quaerat non debitis quos. Pariatur temporibus officia dolor dolorum est. Odio temporibus cumque culpa commodi.',
                excerpt: 'Qui sit magnam repellendus. Tempore ea tempore quasi. Alias dolor et ad voluptate nemo voluptatem.',
                pathname: 'n2b1nhyl3kb6fswuo841e08r3zy8jdp06n4hrwzy6s7idd7aql4yg2mjqzrusx0lh25iqbhldl0bdaeijq2to929511abx34xhvwc7a47o1vxg6pvop7il60sqb3kbllile5dd6l9vdty6wvwdgl5hmofgg3lu5i3et5culcrzhruidyt8vv7qfhiki7fpistd0w86lfnvquxuj1co9gc6vhb6eiu8pc8pg61zgd9frufajz0xe46b4ew6ec4xl1q8mofnso4y6c0k4e5rt5sigb9wqph2ugrjgywbymefpo3njymetzdqkqsoz5jamw6rkwop3643ehv3p724jdesqs5br5tr5a594c1nmozxkjws7dfp9xwq33t3rqyijsgtx7d5jhhi988n8um0xtj90yjdelxunmaz0j56eyd0323p6oiphjaf4lyhefikflchqdgjef27zelk4joa7e5pdzn58vdcq88lg7h90516ybp8odgilhbln4d86bdbg5wd4iy6afdu1hkuccc9oamzyththhk9oop894heghi2a3xu0m7jtspiv0ih6ys5vjqdnuyon8wx1x7rff0lourd7kaonnbvflm4altuaqb46w9weyhpcggian4d73u8hlkzi72otlc11zlvwvdhddndt7nz6qic0r6bojaqapyzr3y2vmlv82z3v6i6qv8am1ow5elhplyq17w46d79neu9z8yx02b8iyi9yngebyu78nbwnlgpns2ov44bhnya0necwrvrsu10b466hwct0nlzrhg1gqbbrju0qc0l9qhir5rpyhhxfvx6y73ewr5va01luq3mdnosv1rio5pel9b55f89451hfktkz0sg6xk667b47juv6ykhrz94amad8itlghryy26h1em9zgbbcp8w4jfyn40kqamg63c2vtyvf7bsk561305mi22by2rs0e98rdeeriushzu66yl0tc4ynmnrc1mctz0pb0vok2dq47pbvdsipc002t5wm6f3rg',
                filename: 'hkisl9yjcar83yhki1ukflzbb1quvlroehesky1o379mjwhf2q2cjsvlhiq30pyvoyqnlrt9cxhxmct5qa6oulqoyde3dhr5jj1hzutbocww59vdkvoarxdmouzrxscwx3zns87l1oklp9dam8eld0rs9vju4b25c8c229sj09pikhjvmb8i16mwf66p52lqhrqzvk5b06zh7xk1bh4gcb9oc66kch5ekbr6ow4b1cllnx468ueotudtvia54jh',
                url: '89qfo4jlith73q8yte8c14t4g7ioohxit0xidunz81vw67ppedz129klmg6cpq7sdtm7oaorp8qjqo0g8akqhr1y9cqzbjixvg24x26ukw5x419zsxp7iq3llo5d8rtiautf1x25hdftwocj3nmhftjfg3lr8o53l84mod9jp4eba20i3gkfx19mu9gb1ntjdkef98v1gay5ef7upkdeok9p6yeakekfvqba9zw0qaodasqizwuofgue080xl3q91r08eb1r1hqx73i9djzulgkldncplmrzo7ixd16vcb32iepv4orclssxya04c57ymqutchu9fw803j11ji6el0dqq9v77c4pj3cokhtq9cppw9bcxcq2hamqt2kescd7rltlp5ta2tz8iyib1en8b0mm3o1wpbcsfrh8004l9y8b3hr9t2r3dvfpr613r2rokg0xmhxiuz3bse97krxp0a8pvlbstnys8kjco6q2tl6oxlv0aryg5ynoulstrm89ob5rb5se8dav06vtkozww8jugi9jxbsi7xevonpb9eciqbe6w9b3b2viiy43y851es3enjgaskpy4z7mtffpq45h2tz74hq1sn3kes4a0pyu842zrnfskf7483tyoz24evo120tl8mf1vkm9lmynprnvg4oo0pksly95v1aoye7pod9e3togkcjv6cvt704lmg7kaxucab6rg8ervcgaz813rpac36el50cx7cgcr1dpyfp7bsw2kamohujttxzpnfjphgu0x3dv48c03ebd6kk50ax66h4w7957o1oc19u6j7v37fkyk0k6fd68ctkww5d2g6bvrqtc31jm3zgg6kjqepfu9h2m06bpfo3p9x1t994wwupwffgf7w72cr8of9d7om6o57tug9d915r1wd5z6pc3izyoq87imo5f0jttk4hytqnogh9kdr660xvsqxvz3vj3kc249vt9zj1kyg5ousprgnzg2srjv4jqtu9sfu5uem00jnn5mq79wzqi',
                mime: null,
                extension: 'sjjqa259h87fli939ebamvnmf6uybuvpallric6l94ypmukvtn',
                size: 5357304918,
                width: 671625,
                height: 193408,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'nqop77pgtf63yasl2lhajhn8h3inxhzlxslz6kavprurwshcnsdf3d5lhdec2mbbkaaxet0wrd2iaxoszkx2ig63lkw1y3klzq4tos6r120omzkavpvrxik0zsnpgsvqec7n3ywej6ayug1ch087uxb0zwz0bchigv5f8lyqowg7j1e1dz43a5dcqzjjs72qhadzc4myt4xsazeehm7ng3fffj1nqf6zv574eem4f5oarv86ff5ec81tpp82g6z',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: '67rhhd434ka0t0g9zxs6g5ddfjrzrchu2zrrs8875cozxwnl4axq09jgc3s2nttso1ujzya8c8s',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 216153,
                alt: 'jodjp2whdqqo1yey8fo8oohar6h055dlv19hlfka4n7uhlx8fc8vko5dfpcma1mfefjghtd600q32yai2cx2g6gymi93l2een0njeyu4w3jkooyl993zaixg7mgcghdtpp7n4w8gaav4gkh50iommtbd1qejn8rbi2ahb2q8zw1a01j7xxgmtqt46jgk86zv7kyvmcalmfev6qgf7i3aq8d211k1c1twmbzx5mylsh2uhd6cyzc0qjls1wweoks',
                title: '3zkqv8gi8wqikq1t54m6wdm5ga2rs5g97qiynruaasttnfsswfm0vad3o3wakuss6tf1p9sx2fyb1cpgu56miosrrafvyybsy36vw9tlvlsuzcszbrio42cximjay16vaer6mull2ghl7w52s6qb4rdv2x40zhjv4im9b6n7xs2i0vk27vy2xmz13zu8husal0sdbbu5vm9zb9899owkxw69bi87iuy4j7d73jill103xsio67oh2xr2e9i397b',
                description: 'Impedit sapiente ut voluptatibus sunt. Deleniti rem neque iure sit molestias. Cumque quibusdam error quam impedit eum voluptatum sed libero.',
                excerpt: 'Est quo non. Totam soluta laboriosam eos consequuntur. Sint numquam veniam dignissimos sit porro. Blanditiis odio et. Dolor aut quibusdam. Facilis consequuntur et ipsum alias et.',
                pathname: '53a0wdzm1g0y3jmj62jq8b1yijzm0qd5fy6z4t12fxq61x83iamnqxnppg3dizxvyev63yhlv2v3g0vbfrck7ivxawealuf2h60d1rz3xavq2ncgwju5nwz22cwkje2251fuyd77mrrgo0dxakpcpknpc5dypbbdju42i97iry064hx2au7zowuxujaa5t4dwqebkci673mx4e6dlm3npe23amot6t20i3kouf4k37ihuz0i2wffpiilr3txtcotodc4gmjcey7sak4t3wliexsachyraa40tqfyehq0koflg3k5n923d1p31ud75w9y8r8dunizkapstz2a5jm36h783lqg4cb422w5d660uik8r5vv0by0xqvnqjdwsif0800fiwuqy5hjuwovr7e8l69t0156nytdday587t7om78gx0r0zj3lz3hghvfmb287lxzm84mtivyylwmqtgmvwatm1162bvdya9zuz9jdol0rkmwxhkih8xl7ecr5qtrl4l0q9sihpw190g67wlciojgesehvcv6ylosun6jp2s1tinnwe7uu7e80c7doe544dwnytmn8emo5pyw78u3rcs8t0g0c6panv6a15nazgxro8glmni8wj1qtayv5ssmm819qs3brrdd7y2et3yuogdzixowknmd5x7dydpdagl2vyadg31vos1s6heo005068cn6qs4n5xqgbd110fjp81xsqf9wcolna75lultkl0in5cj2qx4wv5zda0z19eljt7mbebjt6opuwrtlblz7bm8lgxbw32c7n0ixdjv9mq5do6pwxnk1stu6oikh75r2nb03xt9tjwam6c9sz22n1j4oaxhvqa2c0sk1o8dz7820znfzl60m3l2yf4ebndw0uocvjqkqm51vhakm3cgggsxk9rb7b8eba95fgkrqsjkpdadreog6408hmn4re8nl0ffso9soza32brvi2bilwratwu3cgkalln3bdwy7rbb8rp7aevs96dgcmw1g7uw',
                filename: 'jmr9n4itm92xyszcb6dic2jiv9p867jgkg32j9b1vfg7r4bsgjwb1yzi2ca0pbs61065lp5kb74o5u3stj0oqocdq3iozvobc6qsran1pzp9guwztuqqzkujqta43pv7s18eyrqdorio8dztqkbvk9mmbg9gqtqz1tmevlx2cvvfv9fhkw35p7j70ftkl1lna7kunsen161shhz7iyiq66rttadmw8cqyhla0zip4qd60ylpn3f8wkzkz0ac7fq',
                url: 'jkw20bu9m3ojmklq6ngcmmti5gunm6ar46ccx3gqqmkgp7l6kurpcmcz6vpi5shg21se4ocygq0ealstoy1azqgd4vcfwge8e92tihljqk5thftz9ilwhap1ae95m3oqjr914w4mfdwj2fsy1kkd46o8yovqfhwbn6q7q6f50htv5oir4by0nd8dxtbhnjn6mfcdvjncuxvxb9rq4che6gbnlgy5e9nf6e5ad2jdei55wnsnhlv39pm3u65n9aoaekwn43ob7jcdruz9qtp1xmc3tfnd9jjz4eyps5f1q80j0h7ovgwvtpbrkpgt2vykarzum0j1anhm4fusqsak90xhv470axfipgbvb0v6ce2gx78uwbgrwzw459olqaow8sfogw0jvub9d8vt7oaa24hf2afxtpbc5a2agrongos749e67j2luhvb2r5w0sbryjuj30mm4e38ryare9mgd9r1chmhvaq1gk3swzvc52t2zfxbzlavv2sawmjwk67sy11v1aqbfa5vek1m86qmoebi1fa3j2zzplqukugf545r93mhfxibadat198slkz4kmbug8ttpdi3o0hv28rjygevqwejhvri9qwe8cwtkm5p29f2scbk2utn9gnolgpdzsrguy0y484drwrusvd8pgf76a9ekk6z7kfsxgpdx4uqrr2qxk8czsfeuwxgfk44anyu8xjq8pje9tc96k0271bzvkvv39105inajl9fewsm1j42p5qgch91uchxhhewamiggugzntytcyap0w6pf5coicbayg338xm31dqo92ci8veiadcut5j88pfejosvyb9xpqt5m0nbt3dx1svotjkojmbqhwv34ku4bixjszvwbj0s2qsysmko8qcqjwmilt64rbvyeqtqe1py0l68emg2rvonbrvya6l7lodwwm6vi0ea5qmpg8gt3s6tqgoq7gcyyiitvwpfd3ji688u61apx04veve3lfmbwfku1157r9wy40uixoyo9qwx9pc8',
                
                extension: '8t9twtqgrcsuq929g9pgqgetx56z5dk4gtot15favun65drs24',
                size: 8014572008,
                width: 958289,
                height: 716342,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'nfv9ciil0939z0u94omgef7o0yji15o6agagfqn8cq0gocuh6s0l561xo5irm10m4tn1fq04exlgzx6a36auziaepqr640se8uogmt2xuk5qpt2i0wng9grii4r0lyfhz6wccjm2v15yst9r40qwpnoa3fggsmxztn58eno9hto7tpbrh5h74b6cnkrjlteg0i6p8bafr124n4aggq1hvvbcvighyx1hffo3i4dwhnshl5yfsgjirnlukrfrarn',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: '0zn7qob7r5c2nsqutoloogl9o5izzhrz5yy2psrgkd2b2vy5k9ufsb5ea4prlbufop5zogyly1h',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 581112,
                alt: 'dlzshhma7b9kzminz2c7s19zxvnqnf3j7377vqwqd5u9wfcnss9edoajdvr6xmxhm1wqgb9g5edvd480obdg99cwrc1plrcgnwi28nasjgrjtmxqpxlta4hrm9ixch9ffosaqfe5mxb8rz366gxg603sgq2fgxy4ypyd9isdjyz8cdtavl3g00y3kf05bu18gqpagwi7b0di4g2pcl9ovwqvfzli5yl221htvtrv3hk6id2xixfkje3sclyefk2',
                title: '0mq36dxmn6s5ugsjfjfkixqu99062etuzync5xx2j1t9ccpakbj6zefen708iqub4ibd429sajna03ac68tbx9vpm35pewr4dumlidglfzjo79lh4q89mjr1gci386rst1c9y7hsth8g0ahktq5dpx01zyavbe3qn6gbhrtvcj52513anpjxbepgq4g9hgwiboavpdrszvse22loqr3zv73zahg36r8m6qy1lvu3u8al41fjgxugz9s4lty8enl',
                description: 'Quas quo tempora optio quo animi et ut est. Sunt corrupti dolores et quia qui. Recusandae id et qui ut aliquid. Soluta optio aperiam rerum at ut. Natus molestiae omnis occaecati aliquid natus consectetur.',
                excerpt: 'Sed labore assumenda eaque optio quos. Laudantium quas possimus illum voluptatem suscipit placeat et sint molestiae. Impedit qui eos quae quia amet facere exercitationem non beatae. Tempore laborum cum placeat. Velit rerum culpa in. Illo aspernatur aut ut necessitatibus animi molestias.',
                pathname: 'vn3vdwth0xcrmvox09bs6rohibagkm4gu4s6ep5urjapibrm7xq41g8eiebdefyid0mh2iln1w6hk21wrfbofd1c3ghmrz5vc9m7ttjhdtd70e3605r250ee6veylhtzl074w6pr6f11ogllipioypbngh1f2myvueukz2zdildr1bbsbp473yc3p0a3ycnwlvrmyhx0xg5s4fp7ionztfmht67zf8onf5egpcvtut7w5wk753itfs20n8x1kv0x057hb5gyi8xunavaw55dvcv08gkogdlw8wy5aozaha15h8ngrr6d5o1donyujg4t0oxiva2tgr3e043wwl9c2sb49fgcwrd540xn6b38obo4u0l04905hemflq6ie3fih05t7x2uiskelbiq4z8pvsd1k2s59wklvx4el0p8i4hbeuiwxqdhiwo8lfycsudh6yik2xrcmd28p3x5bs6rv2fy6ub1i144aly3zsd2u2apz6yvyzqoat78xsslq29174w5bn7j40b6g21e04x42l1tijk3371s0sw0nqamnjs0sscosphn30idcvhpl8fl8tetvycd298e1vilbn87oeah8psozy6s6fhyzyuo856urzvpho15wpujyxivghyf7da9i6cqimcrt3wazvl90dnfle3frp40x1mdvzwkqkfuy4pj45shj41v00wn4fcmevk8nb0z1mbocf29ktocbrq61op42ukek24s8q5z4gwklhcv4zmyd445auw4f0x49plmyki50i6ciny2deuwdd0j63m4d0r2y3qikb33tdvu45m8cisc45qysef9qgughvmn6kvuyvlmepci727h8pwzad62m97ze3zf8s1hnwhbiw3otfddbzu5t9ina8w8y54ytvpshn3yg2suw9onrv4nqvx12x9ymjlon2o4lyq462ol883g40dmbjlvve29aadhook2p4gwpaxynywi6huliwhfsdrc584y3sxkcke0jzpr5fv6vy03wiznpcfd',
                filename: 'a23kksfy27it9ssm7rs8lq9n9i8l4ny3m7ldkq8golwc18hby7o1r7u29rgoli2k1lsqxr1yj8wtdsu4ewnnz7pygm592zqnxwvynq4ax5vz8lx4s0m2no1tkge6d0wyxk290fcfw10i2dxm9e3ambr1ecw95adud2quarnu91x80uxhsy464fhn0i78uz97ql398la6ubk9nbm62gqmddsyqdvn899spgnejsge7fbnhdcbr1z9qnu07k2y0bh',
                url: '25i1v45dup1adfgil967frsrr5967umxrpw77kbm5xs3by6xnp5n152fscj80nkezzr7jlzlxliarpi26igmntj834vlo7z69sk9nmxp016to4nl0wz0ri5hdl0jb4wk5autiszbbxkuzyzcs5qbr7y8ga6rw31unemte2mxrzi701465zqxnrtm9qwzwrmblciodojac5nzgj7zaeifrml7ddgxo20gvmg5id6lsp5t21emm9a17629s167xgo3g06jl48kxmkhtkp9fwlsq90lfauvhc9wgtdoy32md4n4caekgma69qlrwwctqlncfpvnebalvuowaantsd0120jh291jj6nrcyuv0kmx6rzz0mt56djdd32c1ef9j41katxpmrkzu8phw4qdskki4aatdzineh5fo78opurrr2vsncaw7cfjeakl84b3w2116ygccwnkf6qa1u7b8c59eug34d0fm5n290cpsqfr10j3ctjhozekmk475kvbkarzzhjhwlh5mfxcnrciznn6vk9hd4v7vxfpaa7iw825eeej4wtdw2pvp2xsxv683h4jb44ss9jckv6m0td5mfj3s3wvjb1lkhdt9sulc0m0irihza0hqd0naeio9366p4kejae5k8oo1htc2zzh7kqi124iwl22hu4k664fxlm86kt3zohipxuov7ivwcqqzx6o2ppcv5xvmqidwhg4r11crrqu0rty93364391js6ay0n8r34mqz9z6s4shdd8gc39gdqzo887o1dqbv774oau025209lwmfj35vnchoee0j8ewckh9wlkyey2r8fwyeozlfnm8egyv44p4njesa2d9qa1igvh8x65en5op6knrl3y6hs1u9344kdfdjeuki8sblzgl074onr5x0u0lsxfsh51hjstmriwe3w5tktofjvug55wkm0v7or1kjkxy83t7bzc921hes5qe2m7dp2ziwxjw7une3l7b8pft7pk4r7e4ea07m9hv469f9vjd042',
                mime: 'j1ukpsn1ww3kwwksoeb8qqabxos1kxpoe6xf1ttiypain23jpk',
                extension: 'vfbvroi8jl4zxx97ggsgmbubh1eoiu3fx2pxxv0pm0ncadmwkz',
                size: null,
                width: 957808,
                height: 118171,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: '568r4smo2mrg7patkp6xp8wqonuyxd7ybvfjdbubbjq45o73g6macatbpp0meo54d93s2y9k22rkwb740v6hjcrkrz3n1d4rl95pfepvg3zpupqedaf4utwa35hv0za20upv98s3jjv3flrn2k9x9j6lvg93foixtijsgcuisb0o742gyh9bcoeyya5m2u3dtbd623ts0lm4y5k5f2wdn4y1pnj3huyh7ifwoh4hu3zeflf3ngngux6pwczcpnh',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: 'xtv43kb2yynu3fcn52e0ggem41rjk8g5pizrs5hshtn3de6mhqc5vyzqaeaxe3nf8lle5s4vlsu',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 300647,
                alt: 'jjmagy7d9do4mev3h2m04yrgp8u7rszztwb0v7x3a98fm7fsv1dd1qktoy56r4vcgkczu04081q5irqubahrfqjwm0ptan76d5ffknmwf1q2r2wkq8m6i9gikzve119jxoa22up465vrp264vh7g6kkatnckcax68ngtqcnfsg868fnx4dqx3i8lr2o6nm2cmc63cv3byrxlpbks37nmofype79h21ohycd2whalnutd0fmx3iiv2t3yl3hwwam',
                title: 'o8krefwtnvvkrb42j09grohzhmj05jpcmn7r0pq5e31fzvvjpuhaghxv8d6cwlsushl5jhepanqth2n85ah208su2i3r5bw1stt713j64tts4fv0ix1rbb9127whdlyfmkb99qpf3zn717eqc08f7xcem69ob1y78xelzmfr6b1c8qkckvgjzq4vzkvj84fsc1cu49zvi6j75f1notgeys57n3kmdm6wlk1w0fe9lp58f1ijzjsdoogdg5boz3f',
                description: 'Perspiciatis quis sequi perspiciatis corrupti commodi. Similique qui quisquam nihil quam voluptas impedit eum. Corporis placeat excepturi magnam adipisci dolorem odio. Officiis necessitatibus reiciendis sit earum esse adipisci veritatis. Quae repellendus soluta a recusandae ea eum magni mollitia.',
                excerpt: 'Voluptas eos accusantium nulla quos cupiditate vitae. At ullam recusandae aut labore qui itaque sit. Ut impedit voluptatem.',
                pathname: 'brj2om34r92r1dqtm7qf0qbyv7c2ntw9qd8wo4qsnr1q31gbpl158f5u6z8crvaj0oebqi594h6hy0p74amxm6sgv25op0azxcx4y7u7p0lxcbw0k19l8iyudlr37cejpnv7tprcc3pd2wy3lc25qrryfft3lh6nmgi0nxm4hrts8xtj1lafo7diulhtpgt81gnhizgv7vyowt5p422pgtaihrg2ve9gaksltokqwce96gl4kb12tpymz2y0k14do94ktyf0kzr364spci7912l00q4p1wmdfd8glewdixihi5co5aki0lkast74sopscyi5p9n6xwd4dxkndfye62605q4m2l5okhxfw0aapodu80zgwjabk5yddkv52voxludcip4qich9k06r4scwidfyr4m482djj3i6wxn26qm7t01r9vy8liren9cbjdfdh7djk8f329w226vmv6hrukgb2786znvegkk57yqz5akkf79734dzec2fgur9060985g32uv8c9rptm5m4gsqdflkp5x1186qet6qqdh7j8d02pjxfdpbk9blv3r11kwiofbf6fx71uek0upzhcp0nuym9e9aknm5ewjmyzdjmazitf8qv4ok91onp2yci6inu9kvwjar2qwbxvob3cjq1h6pfgx8amhw43w2d84pu2mqgzdlng5l7vig0dcvyjvlbth8z8iw24l48dd330yepllcreze4jwi8drgmcegp8wpsoid8a7nb0onpr3bohrvbvquw9upg5flqnxqdsqq7mkvharssx5cmix01qqthj6n0pd8qxbhpromj9xmh9pyu9i3am33rreri9i1n2ihtzo7hqt1b8i24hpwzrxd2ii7xqp05s7pcjoi2nehsgh0uznztwp6noxa2alvpfc2zwlwlym9wfytxbwtn6zxhuy5rqohdib4ldkxt05bw64lmzail3ir4dk54523qglooiitf7h8oorcdt4bj8xmvgh6qeo02u6ts1izkxozohzc',
                filename: 'kesmuvsq6xitgkv86fkh6z8j8i5v2gg5rwgpi8ipi8fdsuq671yf2s8zblt0tw6axdh94mbgpru5y1l3fskp63r1v5ktubcrr5my0s47bk5s2vey30tu295vrz8bon83u48txnmc8z5eiphrht4dsbn0vnabfnb6nnm6v72114pcqrgyhyxwxrh1ebm5ljahrb480yy0ftd4co38lwbplrr9nvukzfnvl3b13aj6ldjf4pjws8s0873j486xais',
                url: 'b02ntdw8gcbwehfs4h8npfh7v4bs24d3ungorq3wnfgfjpgtocz6xakrm6ocd4zrwh37lciggq4n2b3476h278trkdlmwf36bsgri0tpuxfmwhbtlm74mr64ox874rknz5pcnwlhskhjltie0sejgaki3tsfy3o0y4ojpifcj0psxsbiq3kqw1txrq6zikre0r0ywsy73fpisjgngfcgoa7vp28gv93eunaqdlkizqz41jr7f817txxvlsh1cdhe8tepdkhve14ddjw4voj23pee6k23a0v0w9bjrgmz80qlxhnfv3zw9o14nszump87ai49xucdi26g969t2zn51nuzb04mx09g7vdvn1mm9a1pxpdd91yu7ik8xt2nq803vzcivr05zmhmauee1ho25lsgxao5n8hgurpul41cgulq8gq8bhjqsmz55kef6drx4zfueb6t1cyfeoitxmtxc71s4rp6u1ao8t5zzhyl3u4jcyu3e2uv1t3qhbaqn3bonk1771610bgn5j5mazjx9t89a8pq1i9b0nsw5n06mqtcccm53c0sxvgh00xuxt0lv3rn6zdu2f21003hscw4b9ftlvjgwp0wggnpmicwxvkcutn0ts7ffcfqzbx0h5scbh6lxwheb9hpdw0opi6ir4kloikx75avsiv16vz6u8ctoxkuaevgaaelre7esbyp0i5ijxdndntdnw94bmx2lnosy4iv9thijg61q3od1fdosbul8xurr43vo53gkz4y66wgnua7te3miw96ohqnyrgu7a9f83uo5u7yll8ohkj1getk5plnhq96w3v71tflqt5zgbdkpcu0016xgz7dbl4sjgmzwpadx5trowl4ok7oc3i7g3mlere4brcvap7fspzrz9r611xzya05oalgeqgzabje5gh3bapbylilszgrb2vza9j2e1n4x792q3r6sv22b29nus0f78n3zfk80y5c3b9fdin5qc7h226rzgpo5v6w98lpebcb1wfrdlpt',
                mime: '65mapcc8py6arklc18ffdft1pc8shw5tgswby30mtvx4yhnzdw',
                extension: 'jnmcv5fbc20ux45mc2hivby2tmiz30g71og36om2bum4lo48su',
                
                width: 443576,
                height: 437806,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'e17nnnv2nuriy124wsqylscayvpledclh5tv9bdevzfgv6mu67ncscsboy9wt343l6x61ojtngkwmn8r74a5c4ulw8n9vczmkyahum3s710glaijsfa991kzy0jnuuzv6akz4pc0rel0xw9zrqnxq0icw1chtb69t5locgibmligjebxc9tiosrixia7t11yxbbjt8g8py0ofweoxhn8fqo57prc82gldwyaeswyigkqo3uyv9wh5yexut52mjm',
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
            .send({
                id: '3t5f88ru5n0btakqogoos47yg452siyesx98o',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: '0ave1opv7s40w2pckoyqrm8cy7ft8esh4n6norc80f70yj72hcbtwh7tcs7sdmtjixi5sv8igfg',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 775222,
                alt: 'ek5y03bxn43y6d5ge2rzfs3q2bkzeffdlrfg8rg3y72ets4mixprnz2bg0xl0rnh6d086uyjj1zxl0et62uz5org2012i79hiia7baz5zln4dhxfvqk278vyhz6j14n7vwqop53pbw3rupx8k2lsjbxhh4i5qakgtlkrf5viag5pb3s75r1wwybikfbjowxnuym0d0338yqiobycrpplgg79kwieukp3wwm5sw73svfcciz6yyiea258n5jcnfm',
                title: 'z582cpomiikakbg2twiiaxvy469abz6ayk4merbg67usmxfdh4myte9hcjo9ceoftmvtjc69tlca3wkbcsex5fk20u5knmaqfcb9bncrdr02a9ichrezaox4szq4drb15qqxlpmy2ksdgy504zhm1s4kb37xy3hqs9fnq9dvo8qhd3kvvl2hr29b2numolob4e3rn0575h1cqdpxvmip18c6ehe4bijvt1u1im3ppuexnbjz5xw5qnhi95yjed8',
                description: 'Voluptatem corporis asperiores ut laborum atque minima corrupti sequi nostrum. Fuga amet sed non sunt explicabo quasi minima ea. Est voluptatem aut nulla porro non. Ipsa quo temporibus eum sapiente dolorem temporibus ea deleniti temporibus.',
                excerpt: 'Nulla ut enim quod ipsa illum ducimus iste sint. Architecto fuga est voluptate explicabo est. Accusamus dolorem est unde neque. Sunt aut minus rem ut necessitatibus possimus. Culpa sit expedita quis. Sapiente aliquid sed.',
                pathname: 'c3r7xtdlbzuvs2bini8vbrx5rokjeh3t8n71xayy9v1t1wd75h82wfizywrd2gziyn6g7w1rpoyy9qltf1m9xv6l6by58qrj6fy5x75hkbshi0gh9atrkn9aul5x5ms563w8x2xwt5zvbia4xi6ewsl7a1dnrrnqmmp7czjtt4otjs7ujdeur0wr6krwdyu6vsmnv9m7gxl4hdra7m2js0d2ipcfearrm71qmzuqdgvk6kbj6rsv4kqt19y6xsux6s9lnub1er2k6psyrzig5ar4ycv9h4p6wpzh9smqqkilbzcxght2c5q4zyo3vv1hb08k8l2kyu2bzlf8ro988qy1a54fxtp1pqvtef40sislfuisf3wyp0prxr3ezfy0zluomnoey6d9vpmx4jx7w2m2587o3jn1s5l0j3zji8i8c5o7jx9wnwsbiw8zjxvd1ae7k333brpf6rsqgmpi0ywiq62mb8t8d9dbny3lgcz8pqnhx1ksfm4yd6z5am5ips9n7vir26x8zsor9ae3qjzisy129w9rl57mukd9sxke4drwiedjmzjvo8gu3gysqog2yo7iz80a1wubmgibr7bskja4vvb7dkl93l2ugnxgm4ge9zhbyk8ajlyl7kmo60vd6fh3fm9v46kp2wxrqlaf5z8bj30ri7mk4skq0l6cnvxmlrysvncxl6mjpgceo1hlop7wsfym6yny518lj2efdsyazej6abpbi087xm1bqlwju06rbdvegst7jxv1fbj3u4qyi3zyhhmx5fazgham092igkf8isohp6ca8av883jynrcrjvh47skoa2sb2gk26d4c5s81m5t56szl6lixdb8d44j95ysp8ei5134f5ngj76ggnx2jcni9wzty60o8cazlyw1j3w994kbbksv10rofd134qm2sz9ncjcvwnqfnis754kt0c1y1a66gp76n3wzme6xoiukpdsow4nn9qlmotnafkkjutvoy564wqkeip536qa1ily42ingn',
                filename: 'beylz22ow153avlf8o15bpez4etdzcixlv9rt10aap7ht2ekykqqrcybzmdoil1iif8p528dyx6d3g80liqeo4ds4ruvhafy3zh0vsgn3vuttqr1ju5zu6rn15gprvelt3qhrz9rhl9zmgcn7nv40aarfad3lwxm8r0dqo2ehjpx2pw10z33ebihec2wpnx9hzusvjmbq0e0zmvns428bq4w3zvopjg2nyd56gf87gb8hghraacoicgfss2h876',
                url: 'zgxchksfexniqb7wq6k0wr1z0qf2dqwxczlbaixe2eazaccgv0pmobt3dhhhmus9ygih57havn98f5d55c0y0av5v3yl6y16gp5m791p1tymurbdf1axq9p7ttxscl6xqxrgx2jsrf86qjqted948t076thbw1gzke0uxx4k8tfnf1zwgyt6ugaghe1kqkposooil37j421zbtk8rdury0e63zi7p6993pq8rr8lac7ej74quqt5g88hh4c8vcwt6bw3h7b33q0y8jtbqk5y9kpi7st1w4l1v47am1eoppqizz61aektey29zx9588xksdwfpc0uah113tbaog6fzrtgw37zf4inohc5cribr5908cupqt7n13cry6vmlllwqv5kwtw9m8jvbbkfe7fhsh4c0nvuwxck44qb0zj1j5bpj7ywtkn7htcy77rpb0rns9i1ibnwp5959n3moaifqlgz3q0zn1j0yzibz3qh4djrj0icpu4qw2oyoqgs8gry4fm9vsphy9453suo8cu9mi7i53xmyf957w8663hbukzcw6x72kdl7aftt6ak0mbhfuhyt32615n2v7k9c62m2kf8ifgqplim3rw252p4nz0eiidnn3tte5jn3mt92jxx06k3dmx8raifobfvumrsjum7w79he30h4nmu67nvcgqwg24qtiip90u3ofdzej6bfg6ipkdcfres8jn8ag0jp7ku1f61ivjigv314eaaeuyr9viag1urwak1yecav02krn3ukqu2syatpl2eambkf8i8wbbsewdbjcymcgqe5sesxgymqernzbb8cfi6ay8kxy7dx7z3tq08mhhl2zx03hsm83acqmi8zlywm29gtiz8rca94drkbayk9jz26t96ittqhl5sbjggowqsa3fkxyh1c0vc3b2dj4ryqno42czr0zh0p2z6i5benhb9zvij63lgwz8x0m6tg18qtkecskobx69rruvrunnzfph0v9rf2o481h58krwvydadrr3i',
                mime: 'shawh0esiotgj3z645cm09df56kh6k3tnajvljtbnpxw1uy35m',
                extension: 'oojwjgv4ylsz3jekkev8qoshes5tkl6javsn44k99n6jdle3rf',
                size: 9616526006,
                width: 525315,
                height: 272843,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'q4bupkyi31mqpt0pwl6xtxhblealjolrqyutc6dyvngflu87fgruc737gjnr1p0w30316qr4p9xb37c7r2i6pabumucqqxiete1m562nta0tagfuljbu5gfkrhr2zekds10egij5pimpy9ji8am9qzv9dw9b29z83bed5yd1hlf38c4foictbb7f9csibq5ltc26jdng2ztrx7j94pjelwctni61os67qdslv5i3wlab2et9akcvr41sub7krpj',
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
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'lt09gjqouwl23tznntdztqb2c4y4153xsed7x',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: '9yh7li2i61ef9dok930t5ax19ymr66c0vhe6sldeb24hxn959goev9fa45g1kj86n30mlsshdl3',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 802577,
                alt: '9dxganai38dvex24sxrt1gqhgmtpk3pwdagjm2ysdesetp8vv60x79qqvp4l7b7myxd87dnt8js4poombmq9e37s4z8qwovd0ky0vcm5n7zc9v9kn6dc6sc0rgzbkbehdy60ba2z8stzr6tsbcexozdowykf6krlf9ywm92rbmp0kixiq3yj55agg1brgp2qd25avaojmfwoh8a5hejzwukyis9uh1zvh1tyuihts7ie9xf1o4yufinblz6v3ji',
                title: 'a53k0g9nrpl9k9lttf2jxczawddxe9a9wtnk928pdfr70yidrs7hevwcuzy2q8gkygny5vfce3fo2qtqqdruvqkcslv3s1ev618mjpl70otx3cegrnlb278sj9r1uk0e8g6mv57pujb3kl00cw5tywpq7k483ztmq25hgdng33sikk9zh3rji6e2qi33dw5iiy4xagrjwjefvwxqq5ht6x27b9rjplpsjxro0pmepjwtq0k6cx88kwcfpml0tqb',
                description: 'Explicabo cumque adipisci iusto neque omnis in maxime ducimus qui. Id ab odio veniam totam quas voluptatem ut. Consequatur earum earum et atque officiis. Pariatur quam veniam suscipit fugit accusantium veritatis distinctio aperiam molestiae. Ut odio facilis explicabo incidunt velit est. Nihil adipisci quaerat suscipit sunt tenetur sequi debitis sit ut.',
                excerpt: 'Nulla quas aliquam nostrum vel harum. Numquam in autem quae atque sit quam nisi nam. Totam laboriosam fuga consectetur autem vitae qui sit quia quidem. Temporibus quis deleniti rerum quo voluptatum.',
                pathname: '4if6xyycbhku6tso2nejolnufsem3dxoyymhea3n8q27webmrqyrwvuzimgez3qd94w1c4g2l6q8sgn36y87rf1s9qlc85n9oq6ay5518n41c0tthi01xvwpqkst6kbq9f3vnbswdez387k1e5ae88ul52h97gtbudqvrb9qls11yvkynjq9mlyy4eeerzs8cnhovl6d52eromo2uao747t0idkjo3jnnwqwi2jbg57j36fgtfor3tj9xo6qcx32p0gji0v4jql5877p98hjuqjpud9jbq5qie5tpi5w2ic84cjavvjxcdei3fmq8699ugvvubr62gnv0dsf6vgsnoz2dwn3syu7to3q6pnsjb6kzpzcvke9v27p61g50xna1lsklbi3537gsbb1uxpvhsqpchpw3y5i1azb27yvjwqi4bwmir76wkwmq1ngumdcpg1uzd6kfkiwwq3y6gj4fy4npaq8zmi6vm0aosku0npbu8w3f9otimax2eqylgdu60mcyw19uurjyvqyht9m8vr54flu5dk2antm3im7ydlsiehxvgqd0yn4yxru0g96nxszv8ekfzuo0pkrx1wxr1cbcpu3e9xd9809shuizrmokaxmpmlm90kczvko4gt150vgqxqaohbigtkcd70ydx6az5dft0pbif3lzupjk29qfo5plhrqtjj9te00aaw8pqdmp5hfvlxdq71szusl8n2ycgy2lhq063rv7be0lamjl26uf9d975ttrk2199lvp9qo9cyc34x9tvqpuv6u6yf69zkoagxwwab4zq3vmzzbgzcjke79bjlqdyse1oqtnva0glc7qrng7dfrel6jou36q4m7ayu5dj68jx6syjqp17dzgq5obn11lwc211cqbgjv2fxgatt52e2yic0hmy6ma5u9xy2t4y57s8x0jayuvli3hsa297zqiz7tth6i9qgza3dylbxd39513htxwe1yx1oht4iqk92xdfl1io6v9dgqvt3whfse6t2np92c',
                filename: 'fwn9kiio9xb0gxskq8pimggbcb4qxccucqe8ru2qtk9uk8opezhx9bj8gg7guvn3hsxegxj295hnj95kggyb5p3mag4rpwky54c8bjnwxdsz9nh0siiwgbk1yiyadjp4wtqiqi5lma8fjmqtu0400nfoxegwer0t9z13skvcxx8ka8xl6qx0hexpr5n58nimlecb35qycf3nweoeewt2zlp0eu2ckm0wy6wqnbebdx8l1clgiye29urokc5tc97',
                url: 'ps7ls96266qoc0ldo9gfj94ls0aq94ktlzipt5ruosai23q1nlu0nk49uvq83skvr9dqihp5unuxq24ny567nzoq8bq0okolt6xwj40hxsxood4aa2xyzv96bzr0wtw3sbgd2qm44jqhj5569ygcurvzi2s5c6oa94ssa8uy5aylgg9lswo1bvd044ppwd44mz4hi9qneag767dmxcy1hb4q4mkpkc3by834e2koefsj3r79z091c9zlhhp1ulqakgv9lx5mqeyf6tr03ct15z2rlljlaqfjqrz4ai589n2j6jfh7ycbblnnx0x9jk9tsrccdgkh8e79qybqjofsie6pcdh1zyltnepnxxajxryie02komivex67hdj2mtbfi2akse35zij3p8977ab4fo72bnik996wyzl7a2rn3z84auqwz3bbjs8d6nb40csf381kv4rftur83es7nbcz1ytgy6by1dxxxo2225od6hlgdljemx0thlyydnyj9yv5ezp75hho792x3cs1fr8uzyrrkmmvpsdim4l4utsnfpfg24gi4gwat1rr6t4098774a0p3tmsbvt7jc76k918gvbn0xxnwns2gbwd6in4kt653fkva6a2331qsnjxbbsjnbido8a88o3eshffbvixgqrad6s5b7pohdbuyged8ew2mgbfgdf5u2dz23xjbo5d7yejp4g54t9qj9tkc2188r7lhi8gwfcuenh2wosvnfk8cb2jr9kwlhzm8s9p2ys94uyywmkvnre9ty56hukntiyrfcort6dxpmjr8vbxmz6o9j01pute0rbf1t2n2jq3dalqhjed0buqebsox63q8wpxy8uu69vyx5vj8i99o9dbhwifz8jbpjljxj94vq4wqd29wciv8q2yrct19s2wvfw7b4be6f3gft9nak568r19za9udystmpi8rqya98tmrb848daqw0ipb612ogni1lkbawik11fc0h6425bvav8w5ztys182xbq9ivtv53qv',
                mime: '34vf92sof2qmxbzba1p2q84omelit6n8bs02iugh61fqsddjs2',
                extension: 'ilx814421a12zk1q75kf63qjbfumssmepbyicculpehcijfctq',
                size: 6850275854,
                width: 174685,
                height: 956275,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'rh1x5hhm79dq1bgq0scksiww5x5nvdnhpm45qcsyii5usnmy8eq02o9c9h9wwwtvpe1684wyjlyyck3d6k37qim09qbwl0aqwjklwmtshhhaww1jn18fgj7fyiqek7qekouql4asiyvpa96q5bjjn7pg0o7d6ybclqqxf1k84ehc4qbvjonfoq15g3we4qip0zt7v97y6s414cnd3orbmeptmkqbk8cj7xqo3nmhqg1iu4o9su0yh2br9f2hehx',
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
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'ypp6c87fcs6w7qw3h6uew9jro1eigtofeozgc',
                attachableModel: '7nspf6s7dshgugyztp9xyoukhtvzz1in3ofp6tvf1dbcudcjeieehvycq6xx6a40zho3kp1svz3',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 101825,
                alt: 'wmxlsbqpe6amcz9v19xw5yzzwjy270y2ypo9wj2bc563zq0i8kk0v5kbanznnsu36lhp7r14qhq5lzavzsz4jmqypuakcej5h9wyyyav3aakasxp4664n96mz9wbovt6zn02sa0vb75fokrotrq17yu4hs36je3zbnp0jsx1q35ugyazsr3unim9e2rt6a9pk9s63wyq09h408zlr3633xt3hvde4ntqoob5bm8w5yz4o9z34hh1az8auj0pofp',
                title: 'zem9by529qzchad4nac96dryn4ble9skr582jvil6noevppiahfmxx7kdvhndf3tnonsezfgksg2s7t1mkgcqpzny7r5qyp4oyqi1g4nj6t50go3dqubh2osqaf0daoit1dfv4cdhwgagjd6meafiyecyg8u3xx8ag79vq358a2qvphbnvb8q36ghva1ut6bbqc1lmk3wibjv6l1fin4nl8thgarcszg951hnm1es728jyo73ltjecmb7wtz03p',
                description: 'Fuga incidunt facere sit et odio rerum ut laboriosam. Quaerat et aut perferendis modi expedita sed. Explicabo labore omnis. Pariatur quaerat aut aut cupiditate dolorem ipsam porro sunt. Amet delectus veritatis voluptatum molestias aliquam occaecati voluptatum. Itaque dolores nulla inventore mollitia iure aliquam veniam.',
                excerpt: 'Nihil et eos. Quisquam nihil rem sed similique est labore. Consectetur voluptate qui porro.',
                pathname: 'gk770k0lmpgp8wa71v6l55o6whp0w0celk6gtuq7ebv89ssk9yx98cxmv7n3j97amzupaxdp2p4c5068tthwf0bj9dwwowmsstphn0g6eeh2d2mf31vero1gyfd3uncjyez9bmnc6bxtbdu2c8ldmw7x2d5gnc0p0pf584e8k8seb6oaunxfc9fcbwyt2zgukkbyuzizpolsaq1xa58cu2myvsllighh6r6dlp1gol57q6tgk53htw1qktwk8so4wj18drz6t7ez6ys4hh3n8wo62s03i7j122gh9jzyt4uei9k908euyz6n3sppxh6w7yxrefulcnhs2s72cs2czlsp5al215xtsy84s5vg8c0h9nwp4s7ffctmge0u62fgv2shpxn6h57t92sx6k618vow3vrr2w9dalc6ykw5u0ojpphxzc2cyeskwsqgbwvmvdnrrb2892biz7g4ahn1jv7o9wsw16sle48kwl9du060yyc8nqyrfnbm5raowxglnlnxjniwykq890ffh4pzghassbtcpo4xp5w749bhwghxjol8k2c2e4ad0838eg821rh3vs7e3a0jcjtzzh223kd4kssz38gctl5vz1k0pw0xaqtrri2jmkrwwa7pilnvlr4jy4eeo7gub8h4dvp3o9hb798adjk5nmhcttqdwsjqclt8wld811h28o32hze9k0cma9bjyi2uzwtedosamilyfqszwy3tysk6ditynilbfga1mwrgp0r5zgwyqkaf8n7njn5c4la4ckhd89ej16pcsvify4fnmgo5m34dqv4noh2nc6op4gwfpf3bo1z24ndh83rkko9yddm30541v2ifszwx1idg3x3fzyll4bkrixmwso60i6klr39i835qkbi9cbbw4xfag6rghlf55adyvtjdlmdrrrfd6l3ar5samrgcgd4kz7f1ew5vtfbd4auz8j71krt3c39z7q0dode5cjjyjv4v3jeqvmjdeymgmhrw7zfxm4ukvhwqdjtj',
                filename: 'j45tsk9gvdoiyaj5v8105v64dcku2fbyqr4uatdaoiefbvrb2jfz76s6rk3uxd6c1lierhvwfmvrbm91wa1h102biuo3eobuqp0305bgul091uf6x1xh9xul6wimel3czg4g4cfc8z7bednoqu1np2lwxiy94gg7xoj836qxtvuj1zkn9c9rxk84nqvu2925yn5mxonbq7mo5z7h4ful1ssbhrp3qbrwjsaaz1ocibnz5h1gpcpw9tprx5piqje',
                url: 'cybdckreuaf8vk0mwq0s0jnv3k8v6dqat36jdffo3jg23etdazm8khg0vxcz7p86mv3dghrmu7lvjfb4p7zkhfp0sv27p6s6l0egjve45ktoh79nrw27rgiyuyyat15uynfg58a794v3c5ypb874gjk8wrubeorag87kzd1ju3pvc7fglncys7upuayl99crtpvki1ym4jwoydl3mt6u4zyt733g3qn9fvyn7i0n9sko6cjhlul2ql8y6h3j7el7dnm4faul0nsj7z1ae0e68e7hggi3ogx5i70du6h2pak5h7kjxkkenjl4yhps9muteik1bd00r6q3m65t13gl0r34mghp7yps1bg6na0aym3asn5g8060yr0ix6iewz13kmmzrqs2vzd3fc8nr64cp8viz97kot70hhnobd3cs1bgaut0150pjd0lnm2hs55yrzs4xr590ssugomj2feh6fo14cdtf4n4vmoekenfu8trm290l2gt2himtpr3z1251bq5rksz6f5omk6nhsos9razrcw61mjh4tp4tmzwgwdv7lizm4n9vqoeb80y46tgntjx41w86sz5ap3t88qdqf4xup73i5ek4ujayjve79i600eludq4zefyrkx4oyldre4or06xrdy1xfzqsppsdlmphy74ctdbeg20bad1j65ceez7r3tm9rdegddt6h8cu182e5rsfqrnou1te6yy1qd40p0v78un75b7eof5kqgn6fyk68cwq13rct3bqkerc3wirrfoys97m2a7duwn7q70s3sio08tunhsj4enb1z3xq1pjbzz785yicmurx7nnvinrticed3mxmzcracbscq2nzk36dah1u0zoojd0xr5xkeqceenqb6pxioy2na6235nwl1w3d9s29e8kxfhdlj79gub4v44h9o6di2u132mc4s644b69xra5cvhsnnboysu4bjiln46a1o8m7l066r495h1w3m7vnru6hu4yx21a20kw9vl4bxh7xxocv6y',
                mime: 'oft6x4b3lhe9hclkxzyjtmimqwthzvm1rx6aotsiiojhs180fg',
                extension: 'i2uybi9ijl088do9nc1cdbo70yt9u7kta2wkqnsd3s63ixs3v3',
                size: 8697167389,
                width: 698227,
                height: 780268,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: '8ud9ue0a20pew373bdr7qpda918g4ip2mzbjao8fykmqae6mn2cr64ojfy9wufapjl9vd5i1g3myo6w4gicb5c1wzrpsfhl77n60nj4o7hqlo2p5d4fg05m0umskvim1dmuj5gh8iy0qwb1lmdtugpz4u013uena9949b0b7xxmy1w41o7jogsitfv64qof8u3pigt3eegmul83uo0ucg7jiw1ptl4df7top9zkw7ch1pjnabm9cr3i3gp28tca',
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
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: 'zftdmqviwmvzopfqsxlikxlvz84x4gjstsf4big5vg9lm3e6wu31gkldxd8iivv5e3ptuwxnwxl',
                attachableId: 'b6wolrvxxvnb1fuffunod0podhhqnptx1hdza',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 586650,
                alt: 'f5bb4om504q5zkiml6kuivzyox8g2rigl1iekq46r4usrkgt3yvu6pdqrqqdlomy8gy9kx6rwxmca5do2re21qw7oim0otp607zqagh2sby7z792igy2jqc8xey55f3nq37c24jq5hmup11zp3xmy0d9l2z4gzcy4nj123qju7ysxsr8ab0p3h2cviv8tj1x7hu1kfvr7dpwoqwjd41f6krk2kjc8kspotimcxpmb715ychqvvgdp8ng2ok6tvv',
                title: '1vtumhuuucjf90wjti03n9vxi7zk61ti2o50pk8dlfp8535zynhr2tm9g2e42t7qwez6hqt5hmigl9aqxrrcmezgi9td8s02uibl1yccoid7r8dyojqrt11tzkgmywhqo3rpirla8xlubkrq4ztydljn9694xht589iofnqpjyfsj8ub7u9uu9q7c4thvhpoarx9npt06eng0fyv3sa9ujdjgy8fwq0ba2sejr5lo7ck458xtznec7j9t4awkul',
                description: 'Fuga quia nihil deserunt id excepturi perspiciatis at nihil provident. Accusantium est iste omnis blanditiis. Est nobis ut molestiae asperiores aut aut recusandae laborum. Qui et quidem illum omnis error voluptas ratione. Aliquid reprehenderit voluptatem laborum dolorum veniam asperiores similique. Fuga et ut voluptas ab non quidem cupiditate mollitia.',
                excerpt: 'Repellendus voluptatem voluptas sunt tempore non rerum voluptatem maiores et. Sint voluptates impedit aspernatur. Et exercitationem animi et et quae et vitae deleniti nihil. Sapiente qui vel beatae doloremque. Aut ea dolores in quam architecto officiis dolorem est.',
                pathname: '4vrm9fjdencumgjm5hsgo19u3olwnh7p4iu05wwkl96sl7d4otv59fnocqscd728venwfbul08rvzb2jog7dvxvgttf89muk50rywci8r1drwbs3q3eo7jddl9l4ac8h6go0xjr9v57lrdz8ryxj6eorifozyrsmeb1fdhtt9teghte9l5j45xyu5j27juqk1z6pgy4gpoow34za6ip2i6kvctw38hixrpny66yd6dgvd8s7naxv0pjgolbxtgyjanf710tbf503d4c0tvrzpxgweg4gmp3j1jvjwgc0ahtvov2pip4hi804smxulm264de9e5ug3ay9poy4qstsafibxhu6bg567rq79x17338x1x2kg7huhyqziyh014iahia98x6p5wxsttit3r8vhz8lp0iqy1eq8woup5skmafwa29re5193m2vytzfwljrvaxomkig5ij1lhm9ve1iry8zk3e5h5i595swy87re6emraxigzg8f310qv1j8w5e8k0qjy36427dtzexrcr8dtx4x24ys7kqczrfpo48xwhadd6h5q140dzznjnddabbvpn6jam094fsv97emtkj9x885ptluagzuz1cifao56y3nq4lsiw220imzkb3g3j8lar7y1vl3pisgm4ckrxfo7ozgbp7czz5lrssxfeopo7lkyvobkj65m0bk8cvbedsca60g9469o5b89zhlb6jg55wcibtr4a6mu9wlqp0ejn5lrp4irdzgo2gy6lq9t4g4bvv871c25nre1pc1g8hnf5x9shcaaq0len91ceof94hvo1olb8xccgrsy7dov0i9ktg5pvfgxw4idsh5oz7ln7mdyeb3bra921ng6osqyye43s3vvdylhthiybcm3fu38iz4hyjms1482rf2l4qviyt2i751u9qij8wmqt1fr0h8ld5u7nnm1xeofy4xlajhagx04729cf08ggvhirpcaq6pc9ia9sl8ys1pmumxweh7z1mfawyoddskwvep5is',
                filename: 'y069a4y4r41v3mu738jaywwyciyf2nofhk2mi1xq88lbuljuam7abbuik06glvxhnccqcd9hehfqex2d545sb3fltbn45p998zgms3ze8vfc8x5u0peiex0cd19crm8mvmoo58r4objvha77ndft106qs4rucau52pm1k6yr887qcyiwg4k3dei4cg1z0nxaw8zdh5vy74jl1apnpd7feg7clddv7ioid2xh362c9smvdksaay9heo794aqrxdg',
                url: 'o23fmdmdyvo1v5ocpxchhsewttsj6zufo8jf8evjfioah35el1pjqm2jwuzbyd9kouthvufsi1a9k49glun9emu68yfhnch1rprgzf6jsv6lct5c8kpaxbihv10jwc1j6l7txzpb5lvqoe4v1e13q7x7bkvqzq8a2b2vxph4wa8xx2z46gppwxzbqh6szp5ctg3ssezaync9fx7y1c6om5raimn1v4snyvn8gyrz7zdlsy8prxo63e2v8f2x4aakm6yqy977h22sk8fm4j625srwxb9mfsyw1ik11wczb5ova05spels7mqpr08ahn6nqgy6ildbkibmxrgp1wz30ny7isuqcfst0t4hcu8xt7n0i4gyr88aqzh41yry0xbmfh9e583nmddjg2y8em26rjb7j7w2sem8pwjv4f48m407tt74d4t4zzolqqq8duorjrpzeb8vcetakyp7y315t0aycp3a0ghjk822yv23s94y85wqty7w4bic47haluaz4ken0h2hwy4cry6yeztz2i577nxvg5ynr5sr7donaqvx20m5ehcoq55rvdj9rdhhj6pgs0e99hqbw58sze3m3z23b3cwpdluqkxyq39va8lvacsh3pq516a5ry7wn461mucy1k3086hxgo22u8g5zytvpz417f5samtm3jesxy6es5xsa0d10moqquw30e7zwm4vl1jqi4f820yv2le598ktcbk3kkt1av061h4pvsp9w1e7tztivvy1mmr734a7nidbtcat5dpfom5fjgqaibmw36rwy7e0yglqeb43fgzhulpilkiffvzbzrn3qm26tt6mvu6aoxwzf2q94fx8ql1u4oviqlh5xy3aps1kk8aeudkzagdpo5vazhs86jaxrdo8p6tixof0uejgnzde8vuegx6x5qm82wu8eczbvoqighoi1x6q8uxoq63yt63vsnhep83urimeciuowj7mj17uw4m1q1yx5828qg3d5po6eykxd04mylzio74i70a8',
                mime: 'uus78qjgper6akm8gsr8epqo71n18dj12i9ej1s2e6oqh3z4cn',
                extension: 'u3yt27kdg5nk5foq3udnb55zmri9l9fco8cy4oyhrzy85do8ha',
                size: 2125467153,
                width: 577643,
                height: 886395,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: '3bapj64zvvhc9rrnz2emlgsg2rc28iwt4osxwao0b44gkpp6j9f8fmq7p81y33kck6ezjae7axqluxdszfz2wepcoz25ttls8vxwar8pkec2m6mhd2il08ztuz23ex5kofq3mdgjw99lwm7hv8mc91u4dxvslrp07bhk8sf49ur63780baop25dker0kyod1g9s8dvzwrzdhxz8mfrp076psv5316ez5ath9al8ngycc52srn3th5w2bptqs226',
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
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: 'q43irqsgc23smsqg2qm5ys80w7dfeau1iirqj6adgo00zto812aa9lntahmytn8na4puxxurqrg',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: 'd7rokvrabfizhamtxni2i9j4b0ntokmhw6x5r',
                sort: 427492,
                alt: 'z5ip46fo1b4yeo3l6ke7ognv5m0fm5tpwai210fs4202m1hb1uue441ktug2mmrm44ny5knjbnlsist6rkxocy3tzijwu92szl0cqtv165was4s6eqi42p7knkmmnxpjl0h1xru7plkj8h2obpoacans7hbazl7svb081cl8uuq61ssnid4mqzmmqmsnbn1x29g6ci507o7w9em362btwnli2aixl9hhif47h9ovfljqzpnm6q2ebtcd48kfdo7',
                title: 'neh5wyuc1fhi50q93fgonkuj3wi01limsg7dn1zkf3sh49e3jmslchc3s0jwy1k1wtfbgp0v8lehetixv2npf8dht3xhy7img5g4f6gqbmfqnbwkk5kwqh2iylvodx51wz7hv46u8apk57p6egqenzdk0l7e3lp4c90yieorc4jfovar8lrf1fhz3ox1p5ndb9sdine5oc4kw3sr0q192yslranhhw9vjl6revuopgrr8uj2v912utujw4zqbmw',
                description: 'Sint suscipit rerum possimus hic ad culpa excepturi quo. Maxime reiciendis magni ut eligendi aut dolor ab sit velit. Non odio et est qui qui. Esse adipisci iure animi ipsa.',
                excerpt: 'Amet ducimus sunt aut sapiente. Dolor nobis qui accusantium. Veniam aut laudantium quidem corrupti iusto et. Amet sunt veritatis dolores et est et.',
                pathname: 'hcckhtxkn63oe5tei1f0mk9kyp6pk1ulq3oknzwsbf6sf35ow6ohnsxzpzfgbggb3itl71ogblhy4v2m05wsg8i6r49wfbqujgn6jp58t86s4e1t9jpocsx32y59wwrv4wz93wjnt8gnek7m8biqm3xjasz8qflfyn1o1ir2klsnv7hlf841bq20layunu9n2damgnqf9b6ueiq77u0it84k49izf8ey1fuikh583v8muwvwrwst5pzyfvnyf7r8od7q4cjfs93pg3cftcrgagbxfikuwpou44ev4spcuyhc76h8ezlyx1ozy9s7c0voqqxhbvrwaq35dxyi7wyeyggfoe3skqug5bimswhfwv20vttgsmmnmjqhb6sw8qna05kc6qdwq3t2af2fsrq47yd94h413otntc00gdm0qqtovvbsflb4pcu6v1o8qg0vdndo4q4jag88lseffx61reqqvxkyl8glkpk1ug9o8uosphbtyr54t4repr9sfxa4sof9eymnbk59t8me6x7pnsxfa03wsmeil5xw6n1ujvgfoqm2hf9codq1rlocm5323oqhftl2p0fch7s94hljazasgpdd84hmsmle6mulpbctsx7ik11ygvjzg839cyrrqyxp0p3ly5pg4qgmomij53kr4t063o2oayyrnfx5po2sqiethqu2fq192doraxht0zhx8ykyzlohf6taf5m6a2xnuamqygcnyuo4ei77pvweskwzo69dnkj65azh99xgafiudsfdjw02ms4foxn2f6x5lpwoyfwwuyp9ywp705fcf8tz27uoch3bc1zemba0n7h8bfyacubwa9mi3rswskygo7i2g3kj679ux0lvxpqudhl7p0qwd4w2jia7up8xml577be14ghyxol4e6rzmwuiu9mco5umxuvpczvpcib5glvxypv3t85zvz5mfinp3672685b19ttmyqn0advw79gn3bxelnnlwzfl9x07rui5odjv67d6z1s6axccign',
                filename: 'o19u8ii3ntumhow8ov65sr640m1poblrdjwj2dskrse9rxjusrcqouecbtf4upsiji5zq1voy65qzqi9v21ziex3e5wtybsza3bd14unifl3v9n457fj2boa5rho8z99beaxvbv2brzspi2dqw6wvr07p84dqhzi3tafs3pvnxnr1ydt4kvil1edwta8eurcykm0stdopw5vprwb8654kc8jda08z8ua1acgmqnn6d4djm58bu85tohe19kgknu',
                url: 'qrurw4adm1poa86virqksfu6zjgrmzysekh6r1qvqoutfxk2vxy4knt13k7ow4rcph7uw8995ba380e8rs592rtbs894mbvwxc2wegh5jzjbgareyvw77dfss7ihwss6v3dlxl4h7ycyrvy6g0aep0fre5dqfwq2vx983xxtddz009vce07wn0j1196mq09grydmqxo6m1uc77w6h04cipsvdm12w2qp5q9n0rtxzli8298cfykm6j83bz36lbjflfgtryb3dt9vptp9vpduteb31w53h3sad2u04cjwrjoez7uxv25wy9oxwebf8p06bdy380zt2c5p9b2sijgkyt7ct2670k0bcwg40xm3modzp17v830iuftog6ia2alj9fca57si3bbp0jgi3oclqwtaoglk5vq7wrhh71ht4o7pkq9cmb0q26m2lmduajc8vmic735l7d9vpk1g3gxgm0qy24u9cn4dgmchauw34r00anzna2s7ae447dflim7axzmp55y3zxe3do6owt9i1v5e00e86my8lw3aa7vz68otwv8rrkyaxzt5u1i1834td339jngsg2e8epulcah7qkpwos2vmjk1zikk80t4a2q8xi7r4bwjvucolg8k2b5d6i515fa861dlaz5ucxwxmtlh29ufbkz8czvl8xm39gjgcc5ao3neb3fxs6q783y75gmsp4bml48ks3kce4yar9xdtxumw1hfc0iv6d970cfonggswd2eor2eoaegcygdqysqr39x3l2fb3l6vjsjwiwhhj8fa0jfvkqsqfo7et4wjhg6vvw3dcy6kdksk3wydkhj5n1ahpnii9g2jq0hbsu2dmeqp4z4ysqs33gem63lpnuv37lj9kddye302pycb442212ih2v5w8itwy3ljs0xr88ui5n88r15r18m9yrd57b6o34fi9uscfbpszclv8cp7atnxl03x6pptaeorkd1cqo8k2ok4nrpagj5h3ftkl6u3n9iaqej84n080b4',
                mime: 'c30d6o19zv7phj8g5uplfix9nclc9y3skdq5v9pq9vnuh01wjc',
                extension: 'xy6w1xgc0iq8mx55w3suuasqf5o91upvhe1ul8uyrrlez5ie56',
                size: 8381719581,
                width: 532513,
                height: 627739,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'igjgxuuoayyek8e1880n5xuq4dq1z65dyfouce5v4ir1sjuhaxff5u7nafavodx44a84asbxms4xdp1wqgod1paun4qv8fo9qb3co9vg4l0cs6fvgrz87mm6q4doypzealepyv9l1f850l1vt9meikfbbvluv2vx30bimzq6q4jwu6l06fsnq2lyernpowzy9rqgt8nki11kds7g5om5yk0jeh5rfecudgomsp4yb34aribua6lubq4e1u7wae8',
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
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: 'yop3rigifk2ejjhhjpcb6fi3n3wc7gxw0tvxjrdkt9wmkpb49bkskt952swsvgho4ytg2wf4i6w',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 491543,
                alt: '0992qflavq2n2j6sz4zsmx8qfc95lgb8rbuii1bo4qwbl7cvtxmbwq4dqxmgesj8wyurld2wsqlh4gd8p7hy1mlkj5apqybtwkbi65ap9lrwg12ypczk2sl0ajzboinm0pf8kujnesow1v05dk9xdnz3vw7gc3dcvpzh0qnxc4lzcbmny0iv4b9a2a84s0yd18a8mxg4fh08wcdeenx1xxqgnkprre8fvxfe29ar7o2zgnub4txns6gnzx23k0o',
                title: 'klep4sq1pnccu5jdq80xkknk3o6csa6zayo3v7xlcbg0i7fwh9aesyd4wcdfzcawwp0tggo885t1vxyw7vc9p63mcyvopov66kaspu7oftcnzyr7g0bal15ux9op8qht4zub6ckgly2724peeedgmd9628hbjxnspcq3ej9fktagvuakw497jiiva6c30jc49vgoylk0jwq6mueiafatz8uk4gg5e56sr605t5jlziy8jutzckpdiq1d0ep2fyy',
                description: 'Praesentium tempora voluptatibus non sequi optio ea id laborum. Aut tempore nostrum aut in sunt qui voluptas cum qui. Qui facere sit. Illo dolore neque. Quia molestias quod aut quae perspiciatis.',
                excerpt: 'Natus minima dolorem magni exercitationem voluptatum. Culpa quisquam suscipit labore nostrum consequatur aliquam qui. Iusto quaerat amet eos quisquam assumenda explicabo et.',
                pathname: 'g1awbs5a7kt89jqm21sb809stgamlpr85ve9jjgne60ucmjcfj9kg6nsaknov2uwq4nld9by9zephtbs0gjk820s9lacm3y5q1hzareae7wp16pgjc3y1ga601tc18estaoy2m3p429c95dyb27vaw0zwq73hpomt5vkvxt7taukgmxb5v0wcnm3xhslqr8om32111uxrmnoe4s1hpu22vpo0sxnefuztdvtfoggbc0v6v7fv757sic86adbhr3sb2rm4thxkep3afl7y1gf5rnohohr8o1g8hwf2kqry3aexqa4wc2e2tnc2x338tacdmoa9ucoyhjhd6sxn5l0yd5wdvy1u6vt2t3dk2ykmxqrlfc3ueed2ohkzmyjzr2i08fbp3a5p6pnydg5zuhso6p16bbb4jjgyqydovnd2qqmw02oiyan66pxxvsgsmm1k158a6v44rk8nkpj886wmleox7klu2crw1fh1a68txizi698nyyqgs4cn0w8ha4clhkinr4spey9y8qn1059wj9d55q69tuiaksbcoy0qgtvkafdtz9avz74m5tvwsxt1hfxfp5um4n8b01cpq9v0dv50ald3u9y0887gev54ilgzqioiehai1a0kdushofc8uf3d7suo9xij8jwbj5h0961lcjtytaqt1uqaaxrc8mgs7pz391w59fob6qan6ocnyayhiuq5h9thpujazpu4faq82tx080dgq2hoenwk4l5te55y1u0vvex3kfglaakejykl26h4pw98xg4cp379xxrrybpsecq6vsjq8orva0m0q9fb7c74o9ekg6r3c6jrpi6lmb58gafh9omq1crw5qgth8phicp154nj5lip459ca0n0rzi003jw2im56420z4um7e3vsphiv98iminfzp1ktc4ysjhxg8b036pamo6s7ox2lb7l4jbwxnjtoiuxld2e6qvjxma3aru0tjyd0mxf4mmfdjoxynwsopch7fmpy7gunvo4e5bjdfb1vni',
                filename: 'a5prpvcnyc6xp62h2d0v44l5ubun3g6c9g0oe25vpociuzakpfmbw8f5n656c4gqwbi2f4tg7eqg3bicwhqj7i76grqluki5y1wb6ojwgaiolfqvij17zfc8auaq2nx7ubb9yly5o8urypu0i6bre2twrn8rebwdlp0wnvglguvzsfd7rorwxaaq663ntlcs0f4rcg9a51s6tigwftmv6wpzgp4hrnq00k1m4lop9xl4l7fqv0wh5y8374qhpx1',
                url: '5t223yq7atyrmdmqazz3i02gsvk1jh1h5khnjswyqxm3usm6ha6hspga4y775ll9q16yzej3pijcap42hn48awi25oaw4t3fp3llh5pnz4tus8yt0ghctfnyio8ccmo5io77vzksu0joqwk03j9fzc6g7qcsy86vu2aviezucj3d6l0yp1ywjbk4lc2jogc9gmpawsrf4gy29u3r0zvo10cpjue5mye8n02upffqd92rlcwebhu9j9ixsp9ygk0hbc6z7qclqvwaz3xo0km5stjkrhf3tp5mum7c1cxkafd1vgtv9fatp292f52p64a1tcz7e3zd1jae5p7yzdixiuidk65cw5ax76b0m320wpbunaa5wna568dephjmwwi2ryeo4xgitqvb7vhn9xu2cmyso2mz3cp4nl7ylon3adlv2kkq69819cobgrj5bik451a76osylr7bn90311yc5e8klr6sldtoepo2pqzlxd0xt9fypdm5uxb6teukke4ucnr3udby3w9e8alqg3xo1ahlr93d2j28fab0rru9kfqc7x1k2w00gv43ojmam5bjzzrfsvlgqlo0wc0ym5quvtwffddi2a3dspgr5b40mas8nb0ferd3rlq7lrsqz706dqdjp7rgxbz80uquut8cbs0v1xre1yv9durvl030fzpi503vutxce03xizv9c40q3git0d3m368hsqukold4bltgq6aaozazgk403z5a6qav5ifwwxd1rfk8oz4xrm71sivfzo1yph6t97pnefl6h7woxrpu8mpc1smovdr9cux4lhzcq8btdbh7xyzzk89ui6qcqm0vixo2e2bmx10wppvefgzu136pfimdlzz9zake2v4bslr2onrhbmzbe6osqaa0gzyues2p4fm9fa7od38r7zwtw6u9ic02zw6wxr0lfufpu02a5fyl24wxb1w6o46a5b37tl58wkfp4xu9ule0541w5xmt2gzkdwwke76ie3iq0zyb44ds6lu454te',
                mime: '70j5plxk1jxckhl9xirysv3d1mlr7k0hd2muvwzbqazvqvdhub',
                extension: '15ack4v0z6w1335xviqrqq0ifku6l3zlon3vkdlx9byr1mim28',
                size: 8436727226,
                width: 706128,
                height: 492371,
                libraryId: 'v740gaa2tipsynpisckjas56jct9qqlotah7g',
                libraryFilename: 'ydoa7j8k5ezh7px2iv3g1n7n7ik3ln1rgbxh4orxuyleo8u98yr1a1gydbigk9u0keyfw5xn45sp89h73ory2xspp52ce5mqa4bcqqrtdw4lvv4ftrk1qzynaw96oz170s1cjujftu3bufhd8cyo8pgpruksfeakp26f3vurnoice1ivjc9e7q0xqf68mn01hettiqc8du8vztrwujslcwdh1ah15vghipa5v1x6z7viqkxed7llj2c9b1fafse',
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
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: '7jyg6fs0rwzsl7rcis878d4hkd59m0hw6sk6p7dxf1ulxku90eexmm8xsyvvtroby1cflnuonsvt',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 545858,
                alt: 'p0de6lzaialsiwq476g18u3hc9dpefoa6evad8d34pc2t64fzvdm0ji72vcqrszbv0cl3ostpitui8gau1pvn8uc0mqs07e4kgl526hk3s5235les6f1y7u178xvz20zbice1hxrr7vzv9px9819z10lfqy8997pn8pi85ln6udsufhp8buwqc4fc9hk4lse942j0m6lsz6j0my66mge250b13cqe1007aqzj3wnb4edssq6ylw1p0fnporcs1g',
                title: 'f71j7wgpjk1gxxihakyx9uw61ba6qnqhkui5gy9nbcl6r011vsg9kscd7tc5p9ut5wm6mfhamfrowcuq595zwjxasngtqujetuqr9a4r5zk41iodzlnrvmuogp0ykqvj2qoyxq2dbuwfmljtsmaynxns3wj5i77khle3ktdun4dl97cx5oijejqjkaq3n0h4zt64shxyp4wkqnqpuh2qmwrzcl0oumf7uhgz1osags5rspwzkluy66ll8xmt6cr',
                description: 'Mollitia tempora aut est soluta consequuntur qui impedit cupiditate provident. Minima necessitatibus quo enim totam quisquam modi qui. Quidem debitis totam consequatur vel.',
                excerpt: 'Est odit quod non non molestias cumque. Et ab labore rem. Molestias repellat commodi vitae. Vero quia facilis fugiat debitis odio pariatur et. Aliquid occaecati vel illo tempore facere ab.',
                pathname: '8e63prz53r4mgsj9zu87z3vq12nv46eru0jofxe0v8m524383oh8xz76kd700l01mxpb3veclu86qx4c06q21k8oey1we2ux8qyqobnjuqjlqtox3zjbmguz3s20x5qevfurh6v5bck5t1nrz78vnwc9lrlovs3o5cjo86bc6kzfb4j3wvephhd2h7a1p0im8tu01drm82d1fppeqiha23fj5nk5qhqnjinfnmk7av7yklsvh0vahnrr3gvjjvymic1f5knxwkwd6pzxvoi62qr3hiiaz3nuve3taz2adltyo6fhyh9r10860uts9i24oxzl6ljfzqh05uu00o0ozn2n00vlax660z8svcj2orc2xk58ehn6b8hkud4d05fq0biasu22uor73qggma0de7jvpu3cmgau76c8c4wvi1p5owuu9u4v5pxp7i6g86lxtzqmkd6ktoke0hgxov3lty248mg83el7furiq0o9fr90rt4zggctvg45ojb5phvvqqqy6gmg8tm37p8d2dwdl4h8buevna3bzvylkyw0uiah2abkqnu5xe2v9vn3bq37bxgyb8h24drdkj1li1pjqqjxfx37bmzyjfqizxnio0yxvi2cs6nc4mmdocar7sy3dkjv98je23n2ud8any8w76pnykkn840tzbhesund4uoldxldxux9njh2ickmowldta8kyr4ew9eebqovznhymgnthovk50zw42j5op953dw97f3dvu32lcvz2xnut2gllvoj8qkmj1vbnqsa6mr4fpk2q3fr3ll10o2kiq9ctxs3bzm5o9zi5b3tz5ij1sk5h988v76as9yf11cpu326zcdphm6mt4nc3o4y86uy3hs4zt7kcy8hxv0b2kxwu6n9x8lizwu66w7ohduvaqonhyrol7h5jxdormtyc28brf4yu1tmn2etc4ck9nkqwgtrj7tj86g7erosshgkuvqzv4iqquy4w13jj5hsp5p464jxgat9khjf3np28kk67n46',
                filename: 'g8pb6kp10c78cmonx1x1i0tkhtka2vhgoxb12gmvdrw9c2l1vuq2lh6yppcw84veg3hrdj9mth1oo03twq21ffk5n11br60jsmg6nql0mnsgby32wt46y2mtjc4wsznn0d8umm2c9g33i9hrfgfh0uoaxmzmvlfyxhhig87p2204xmk27lpa7ycxotd8j7expg25ak4mc1qimpi18ydh0hpqk2hbffxir86656cuhx8ido5wg8c13p85n567qb3',
                url: 'teggwl90q8d11ts9jxrp4sveneih3g5j7af54de81hfps6exvj2ey4cyinu4390sfht31zh1utexl08tt7f59pufb3xxu8ikuqxviboj60e8eul225b177ahytyy612ie5yu6cukdknmsg2i7h4ppjqcrox5u9mpomyxqvdu3kmk0swqjaxt6hx4s8tfza2bws1xw28k1nj53ofa3tuamn4446szkd2yrja2bnhaorp5xa37l53x4ozsk5ud1m62f6vanzt5jlq11odw6x7jjm5om955wms06jwktxo43y6auv1662c21bhmj1vp0vbmxgfg91ij4mkuqads85t096xoopy0dtw66vi2hs6k2mc3z21p1jg7vwd0891mczu5d98dgo2jixxakg4i4ti2hnfbe25yf9xcmw82er0o3xbs80zo3ga6xhvjhn9pq2ec0e1d68e42f01889bm9rm7e3fko8g82n8cbw0q1edrhxz7h096nmllyciw6crm1azwp3wi9bg2hu79aq2yxastu1enx1g71whhxd1ygl9qk1fr6amth8043c9ydmrdh1x1o57og12btqlo0zk6for4yf5wxzfw1d12vedvh9et46gwdb42y22ejd6fbdat3u7vc57zo8bt1lepi5dkyu7wo8qwq55kwolvy4bytbzs1wv4bffpgw67smyskv60px8bgu8vsogc9a7os852zpx54jxfzgf6xzxzlxg6k0tl45rzfixssbbm1xm0qxb8hqt0dn37qauii4wl745xmrgyo26n2dakcg3kv2eb10lxouu0pg08pu8h53klmtz39v0ahw22zxgpunz01z2ek52a8rxwwybv64l4625atagqxuaylm6a2awy8ovkbryfjw593k8vqlugzsyjqp50bqyt8odn2u1g75ry49kzdd6cbiy679urun0x60n9cyubl2inbx0ydivkeed3v5x31a0pur6bxf7w2qkr5nucbvlb6yac6ky6vi9z8dw30qx2etp',
                mime: '6ua7mc693o6jxbw5gni5r4ew46mxtnq5cv7nf0t602f7giz2e7',
                extension: 'qla4h58vstytfljvwx8twmnhigi0atwycnmais1vai7gpw7o4v',
                size: 8917588049,
                width: 747921,
                height: 194147,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: '2ca32aojzj4kilgkebp0lxwuvtvfuc3chwn6l6msj031fqjuqf8qu7kvse9vt4by60p4nphuk5srk64i0w1obmw693ucedzog011132ck7qshdoycu9sog73nfovx6ah79qb57vcq8g66nrogpui05e32eop18lursvhy9fefztrxedlh78evo9v8t6dzu3ul53pdcpgeoyfeb3r66s6rvj7f0ftaad549760ukz85ynhidguwjefkqhqi2buq7',
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
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: '88whi6fs2dmmpmpbouoc6l8w04klezgdja7et40ykhe6bhfyvntam61yai3gsdh2ctoa7m6ub47',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 9448849,
                alt: 'ityryd49xq7ufepebu5qps4aarvfwmv7u09x5y53281bvt5j8iwwsoqh9kqhy66agljaco5hdxad71u7a08va42lnawge0fm5suwytwrg01ip4wk5mmqgk19vw84x505lw16rikzf2dfy93jckyfcfxyz9zg6zop9wk5mhkczkugqindysaq3fcfrae1raxrb5x5frg4gg7q8nqctruviw7ogqb4c7l5jevjoggai3m2axa3629b05bepu1u7e0',
                title: 'ugz3nkvou58yj9xmkrn8qd4srtbjd0xleo5su27hzy6k0zodf7jlrnyl66z2uws0atqorpyyaqewop1micqj8pegppfr6sy2m95xy0vr3o14rdj05bl9bkxlpjmons5f4vit7b49bn10r5g8tjq95afpcjbomienztg3k8y0sy9e3dqoa1l5fmu528js09jyggf1wivt1o6dmtxkfsou76juhbdhcb4wlfjnda1gcozks8hgmrpt0v467nr1ln4',
                description: 'Voluptatum incidunt consectetur. Aut et ipsum maiores alias quae laborum molestias a. Consequuntur unde quidem reiciendis cum consequatur et. Minima dolor ratione neque.',
                excerpt: 'Debitis ut corrupti atque odio odit omnis. Qui saepe omnis. Impedit qui eos adipisci corporis. Velit quo assumenda.',
                pathname: '72zpirzcl4kllmks7gyjz7rgnr58wbm39nnoce4ync2jfk6ctyyd3konasqsuiy3it00h112ybv5q85yozjxgr2k8xwwm1undmxel5wa0x06mbzbatam8s8rm39udhcw11bxiek6hswhwpvkezrzi395hdt5wdwbi0lyrrx9b4pqemwjm87vlh84mxxticfdv2xy1iu1e7w5mpv86lh3mlbumtvs67u7slu69h63sk4d2zn308zhcox9mli2s4nxz5r8z9c8qlcpx85574d9bsk1hrvih95vav4ut48ck097nmcebmj134n976jvv9l5noxnvzj7lrxgvss12jamlrr4f513tgv8jy5ncbq6u75obuevvawrtfm4kn8c75cwnum2qm8jtbhta80q87e3x4f1n2zsgdqlnxotpa1mngekk827gqfj8td46b1tw6kmvv6ea60avynizcvkd3vtwxlijo9u213fq97lq9s0o4m5nv83t8v6ok8qnt4i3498csd74kjwk3sjuu4h6snkjkhouuc0kw77krsd7v4ivwyzzo69tgzvwiv29tctfpw07454oaz6ktgr8f2hdo7jkb617u5ltujmk9hil1slhqucz7h01gntvms2f1tq0q8txnm6yn2j4044t1m6u9shsb7k9otz7sxioyvbh75exvfcf8uqhjrljkl5mac459qt63jyw2pfcmcph0fktoktxr1tgc1l9e7i2no8upou5jfbt5rpikt7amlr4392plg7rfbllylg84yvlrkd21r4xfl9lqbt08reetx5ylhj6x7cycml9l5f3b8vo39uquoy5uvgmcah9nsbzcmaj6iu19r6ligygcyptfovddj2s965m42y6tcqlduzowz9tckpfiyrqdy0vamiimg9oe5wg057ml3673tj8h93sae9pl021josggtdocvehprou4ob0ykbl5j1y7cqsfcrqwqqdoz1yqsc1lsflagr5r1zzx2b0edk9pba7cyz7jld8juw',
                filename: 'f9em7lvvu5ie6e7qz8b27wwk6vroo92puxa1tnbdhweozksyxj3ufnkbgggsrr57nbo603rqgeqoyxt1jc1c1dssr71v8ewnvxf0oixcmcfd9f0vwadlzh80s8bun7uisjcxa3gedy8yyw0hp0z6874hokv7ivzrgwq7jobduth65kw2p8r9mmimd3vylymqf3gg0z6oalycqgfl5rogc42mnl0wukgsekqv8q45syzeknvywqn02b6ngta5tks',
                url: 'yqfg0b3v608fe8h3lih54jmz23hdpftbnwiz7jhfs43lh19u715h82hyv31wlscgfn8j1dc4jin95vg512qm5ki442iwk06y05m996jd1nqj8eyxl1obrp4911abix0eshixu12udkk9ac3gq6f0x2auauegsz9htmdn655spl1da03si4bh0i3x7ox1r52h7lrkvqxgyhft0a3sj1r4gdlvxd5b5uvtcmbp5rufhp1zq6ibt53jqkbdla0hjhfyu1bs48uiby6um8fc3337ruo5dnsb1j3e3la3wym1e8miymnmhr1rgcf74b820r1ncy794v34mxm9x9vdkn7hx2chuk6k834xrj4qfptbtlzznd62sluqv1z55vtk921l2pi1wijxf70nyuji0978rbwaxerj7b7jcq37o2g2e8uhhmkw8cuzxxxk93s7odxd7hms31k1umtvtltmeesqgo8ogddlu5n4qdtmclmdf64wvdk53e4jojdcl3lag3yef9oatvwgiwuoc0fqv5a2oa5jhfhrberseord3yvogq3w100glpmbwm588ocglh8z8r18unh5tnoujwu4l27f80m6rtmzz842ia3zr55at6ink74igla1arloovi5jekvahempsu9ec647992xmwtaymxzz570e4zrt1lagwuc0nlpnnaa3kbqocqsykqit2u6mfyi3nuxfwfi7iapxyyme8f0smbv0fn0even3j4m0qge98h8gm2z8tc5i7g98le4417du4r5t9ixlqe0xikbj3ifta0a5y2xojtf3beeeve4mrns8n0okwu9cwie6mk4u3kyjn8y3qv7bxhehu16z947qvxkjb8ac6dyc0fbnvqs1wlucktmg0p3ag1ldoscbcv8ja4g2tnn6zlihiu2zcct58fg88xb0pzdxq8kyvdi6n8150fialycrfre7xzbu4i4pga9gmwru1tpnm0pe58wh0gsd808aq6cr5dhed78sn4mfa5vsmwtp0maxlw',
                mime: 'l9jd6cwfjafttg01mswgpj8lepd5q6aibl7d105ameodz0h12t',
                extension: 'ydzmvlmkuu3wjhxcuwqohmkuyud71y8z1f1otnn69s9q9ghjcq',
                size: 8291908304,
                width: 417427,
                height: 111470,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'iackup0zic0nck1jus469om0my7nmg3zbuksqywrpz059q95b038632i5z94yeo2l3wj8kccegm28bnh41unu5qzskbnffdl76fvefsm2wqees5ld3fe665q1jcv6itmhpmu3ptll99rvc27vtma62uo2qk5hjnm3n871qwdwy309htof7hsfmbibowarir5bbk7yg0gw8nk8sg88anptef2vxenkwpfamd9mir9zhwzxtjuoebm48m5geb9rtc',
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
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: 'y9u1e5gsidpnrxyqd7x4kiybzo73dmtwqybndsg20rp3s40kz9upqbevt90hjlq5uvdnl7974sj',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 450766,
                alt: 'rnatoztia9j0aj9iwr1j3i98lykye43h5k9ivpt3po5rzldd3y0yvj3k33qmxvmglrg4wv6ns0hhj22iyo20wqhxuvhs9ka7044x834qw2xddr4uyxiho9ie4u0mcyy6jszn12voqbgsmdgv4so83iwf8z7z1zm73pa680yxpzo7s5ap401vcb1g9lhfdcau8me74td4jgirvdgwkuf0hhox387bjsuxygba7wdm9hp3gmhze6u255o405krh7w8',
                title: 'o5e0hy69tl5a9y7tqnsj63asfbr4qr2l8gqcmkrlaxlpd38gulwcdy71lmwg5iif38beimue2b5b8vaj3aezbfs4al9ua3kssed8ye6jiyov3zernm1j94ql51ep6tzfk0ekl76pc3ub8esds8oveiwqlnm7uyv9zb3k5u75b390nfk15pam3tspyqefapspggv40gfsr1r3dewzzmd1rahe0sy9cgz2vmiv5st454wrbvtgnqb1h7o1g317rzy',
                description: 'Necessitatibus rem veniam nam aut laboriosam. Quaerat rerum quo dolorem ipsa. Occaecati eius perferendis dolores quod suscipit. In natus voluptatem quis voluptatem rerum quis ullam ullam.',
                excerpt: 'Voluptatem ut natus. Quae nihil in rerum inventore architecto eum pariatur recusandae. Ad id molestiae aut sit et. Est asperiores doloremque nesciunt. Suscipit consequatur non tempore asperiores minima ut eos qui. Sit provident excepturi rerum molestiae in dolorum possimus.',
                pathname: '3uv7mra2iyjsizj3y1m2yw56dxhcljo7b0pfxkb5zne2ihk8pcn19kfxx5dhrfuwri6byq1ro5ojtz0bru74qf4by9t6l32kj5rwzjgf9pcrscmofejpyz1kwg9eawezyzyzqkroxbkmpxw8a3ht3dwk0vy8ekix5obvgf2ryvbf4zhbbl94gm2tqbvtbis6eecew671athpinm4qyhexrwqk5nxe2e9zrsean98c2yaxqxp4d4bgmkdwrdjxcn1mrcnqnj2oy8vpnokz6sr6gz8ypf00l6j8y1zejoh6mubhgaaaxomnzj8rn0vbtzkxrwoi3ckd3fj8o6tgwe6y6wy2sp2qhpz5gu4d08oj6j0bb5zwd0bqhelbov58hlil55gmxc0r2dpdsqqdlp3a5fubs286wfsb9d1hh9uq01y396fao9xbz6rzyxphwhbhzp9de893gu34dzum5e6r74mqzldge5buundw7dm3g86o5qe983umuqhuunlmp3hoqawn673nuwvrnzyt2lguerwhqgtpsicrrh4gp0iybo5dcyysrscg395lpl4t4ytylaijtzexwnvv6r2zkfjxme3rk49yulxstjfqponguaxdhr28l1geqbbrwheinp7myexng3gsxv6ec6moecg1c501jv1awnb6dqmd0o8c9vdudzp836fevesh7aze9uckon3fio6mnlxresmtaoxjvobo5lbuv4qhtkhl4l5om9567tunzmeqq1o8rgc9vyl0wis5112i677o2ahuv6vovcz4uqgik20x8xarn8we9r39l3qwbynqsoyxhtj7n86iwpcpn98ozkxlrki4o9c9uwlmczq9wtf7aqg0kv07qa71gjay87si37uh2y9qa7e8jds93ajeqzpvntuyx83lt79rvikg0q9jhccksvjsqy6wsx3q1bq61sh9p78yust1gcjqa71uxti8jv7npl3m5xfm56ff2idua0l40vauryvxm2lomgwtcws2d0uxt1b',
                filename: 'azkf8ga1hlwmao7nt59n9owmzs0m47cqq7tmf5hzzbdqto7t2jrc4r48mao9ee22dbryflfu0f34866c1rsah2c31zul9ey6ubxkn5znrmlsdar6ebvnk8s9ybqqrsg75t3kvmbj12vglqp5j9b0h22jslhzoejwas2uvbir0dj6q1sjql4laq175qlm298adpk75zmq7zxy2b33dm5udg47vk9n8q9r6lme92tfq9e59q2wwhkmxujn075xkln',
                url: 'ypou9f9qqxq81t5igudyv8rx81c9msyz9el0s9hul1fmlewcpyy564kp0femtex4ub3w6ley08ohfmwb5dxo6fmz4idgrh415h68diaf0jsh8i0ve5jq6wzotpfj0wx1kcnx46mnzb5hx9hfbm1nek6iyd1i7mcso1zlnnkir45fitdv8i8u4a32ukghfbta7r638tm0u4lgjltal4gih67oshw4axtruwh7uiorh6ff1mc9tc0rildra7x31xyu2u33c1xbv4ezn766shhri9lv0ig2tkezkif09xqxodtas01yy45qfbviplwcqpyha8das2lhb4z4x16b19z29328hs0iblyp6fb3l1orjrpxqxjzzussq6zb29lbnwb8fnuavf5h259hkhcewlauexm16e5uvfgym7ipt5mkroriucfq8ymdhxfxkhhju7ml95qkgmx28ys1ep5ksxz7xnlzqs9jvn2bxvbzivo18adl8oo1nvfi8p04iuosjmqotsbyoqyapghtmzevdrc9yqd0hu9ecrd54uhkjm5d6z2ry5pa5ajew8ufc4117ywgliharnip24x4ocevv5k3b7xjd8ry88z3wprbb3ohbu3ij5514arrw6p4p03pk3gu6jfabibi467d7igzftthdsryzerkrv4sad8uoykdmycnnl3hhcngexg5wovdafvpfpd9f42j36sdw48uvotsgeobzp3w2tnqoz509q0yts5kz8ffn5fuc3oa7k46i3hwktsb8phclceqpi7wvjm03rfrezbizmles1x8124vvinvr12wffdvh996v5x0rz6dku7n26fkiwe4u97d05ukjn9qxczdri0x86fjc6m1fvhb8gl3tnfgeejmrowxsyj38soljwrurjsc0juk9gqefyjgtaj695x4aqici1da320m0v0r827152850ff7637kzhq03y7n36fahov69f0w5wzx5729vqc668j2kwtwjc3ma3cfbp02v88gzzk5lf72',
                mime: '9ckz4ga6v98srbzec03lnzdgu6p9xh1absc7510thv6l1osvl1',
                extension: 'tvweqad5tev8dak6nd6bgz963bmetb5stroqe5zyaayuhi87um',
                size: 6544440376,
                width: 541475,
                height: 558740,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'i1c19vnz34augvswt8g4ymdj4k4vrsds5g78z5rqpit036jvg9rskpsg1dviehxr08nicgs9nlz7bh8rqh6ekgadwxz682gbawo5ba4477lvv5h4hq7xgsd1z6wn8ou3r5jpnl58r9eeu1b4gkham8tjjl1ppfdx712ug7flogwj1zqlrfa745ga0nclkyhkckz1kbynosil7l9gi1yv8vwfvmt709b23gujb9nhqw48das1dzgukz5phi16jxv',
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
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: 'a0ewt7qj7p1x2uyn4lmyssarkecpbzeg9cc3puw9s4md08hgo9bmzapmcvvfnqnzjhym227wggj',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 555238,
                alt: 'kcgcrzfywciat4vhg2gjp45abhnm4oug7r9dj8qecy6fxekcnvqxt9rl6k315r4g63vfursbcwudit4uhg2px8uzunhmt911jazet8k9o6a2quwtv5xvp0vvvs0vxm6fyrscc0yqjs90w36bebwih6cozg9crpsuaqdqwa83i6wusv7mdzyw0btj029oe3krow8a79ln7dawsae0f75z5brmvzzag1n1k2d5nkm5khmpbg93auobjn9bsk5m1mo',
                title: 'mqwx3lazkvq6xiu2vamgxj5nksgqx725lps5mq5s30x0ax7jv9lw84298hmnjxrjprbv6by3cispj3r1idt4acbe6wjtg62ffp69c4zcrbw8npx8uc31hsy732vnu4rjuyh6cmsrjg0585wchdt81k3sb1j2nl2fureuuoscewpcmrzroluzt0iuxkkjb4qjrxbz2z78jspz7ioscpvpky6o3knao70ylmxr0z8ms7rra5eqvv77zlb28fqufne9',
                description: 'Error reprehenderit exercitationem dolorem. Quo sapiente maxime architecto rerum ut laudantium. Et non iste temporibus. Expedita deleniti recusandae ducimus odio molestiae non. Voluptas est voluptas facilis repudiandae facilis beatae quo sed. Sapiente maxime et consectetur reprehenderit.',
                excerpt: 'Unde voluptas et quia exercitationem nostrum molestias dolor. Qui numquam blanditiis. Consectetur sed sunt quas dolorem dolore consequatur qui possimus nulla. Magnam labore quos repudiandae fugiat natus. Illum id voluptas rem beatae quo est.',
                pathname: 'lvzx9fvdwzlneojv1wn6s9845dbtk5wavhvee0m3udlvineeu9b27p8o87fiu8ehi4dn2gvjj1tspa6jtbc32n4fhoxovclvmjwd5r4v1lz81q29f5xj4ia7tpuxv67juidccp8q2aqux1jb33s4payn9xtonmktayp9djr1p2qo7nsek55n08cenzj8eq7sozgnnld73tr2gzt8bf0j6qq2ouj8is9zox4c8eyxdfauo41ur68n2ncw7zqo88g67qy81gokql54cciiscz59kzlf9gawte4foswx30v0p1q9inovxb6apoxbwn0q33iqjq9mi92hebj240lpbetczelv6nym2opxubtn6c857ttws374p140ab4fkjc33trjk6ey4qhkjmefi16ialfinhnlyyockdmcvqy9yrv2ve4ssfuww6pu7cknte7uynh9e5nddp3ucjgdaukeeo26n2xgrclkb9fi2qak1anjxfs6e1kjb3w0clkkidjh3z1asjmjizgedhlzhsr863ybpi4l16549j561a627irt3q8hz9q1y4tny7k111h5t2g9xz5nf7fpq2x5knx3870wsc23020m4y15f4cak3ca78m6cdyhn4xksefvtbqt3mjp8xt497ditizz6f3swmmv8rktes2re3n5swjvaozoe3le9zjh7189gn1fz3smjo3ml658e70aojgon85d52b6yjjjo5840l3p4b5rfj7uy8s37lfh9og6gbxo47d6t1jxaxor3pir6uwp48fxe52g5yxmfnxclmc4lfd7jyk68agxmc5l856eiy8geyr2j6mlnvch2czqellikaf6kutagutmjygeco1gj9kxx5twzxr0qwz4q7147yz2p9scd69qqdjraxn1nq1fe6pco8d7guvlp2hg1obt81djuhvhx2viuumrdqw01wpl96zi5k4epb2lylqi9nr4c3bfnta2pmdiq20npwu7ddns1tqawtnbk7vtd1ifff9toi7ogqp',
                filename: 'ap11d37ul5yo39pajqlvr5ccgyq3zqgemaocex8ka623hb7pzb66uho46b4wglb20qua716c8nzhxszsmlm61zfadqhvpsi0dewsqfhx72evahmecdbhi282ir2wygpezaupal8skbn72sgivav45uv1cok57lpk8ybovz4qet441ilsgzik4b0z7evfhgt7nt1e9vai1f78vwaqmu7kd9t7pfpzmw69sjp7rpw95ek64y7u08rxq5q68kwsrqg',
                url: 'cogu1s5q3xwa270ixjo9iftssikw5ghsrx9lmp9tvdb2gg1ebcy92yzvugjupz2z7seqvggd6gn8pba78qsn4pzws7f60gjku70en82ouxe1qdsgmh21stku2i51ahlcv9mz9de4lgwymkzl8ak83nd03rlrcdh7fzbnb0uybwnuiqdoeodtrpuvujzjsoouhyc9yjxnitnkap08oahmqedffrh4ziv57nzlwemsoxt2hknzeqr1jxgepje6myr6wdxvjopvf0yu6g0ou88o9sbv9u19y23ws6pjerxlsgyyacu8icdpi75p008vzq1ny874zapfguflnggt2u5qojr2wp52mhxaofwlcj15umquec5qho7buw07mrp4cgktaf18cc1sbokwcbra3ibfqi3i3cylsn1nl7ua4okf0toyajpojrdnl6br14648y25gn8lay02lcifhcw9ngdea1kke2qp8qzb5fp8hbvqtvgm5uvplrdnu3a42zf7qfgql4ymnshab1aagpz54sf80gnqgalhlyzqk8d9c04b1l89j737g9z8wyq8ext163dvo5tbujhxjp4rpg2n9ajxob0hf0rl27yt6vczetexitxllwklw9jr7geo9cqs4zgoj35j2oxxsmo7qpxla1glzqyydwlfidupi0jfmex24vzasp5dpe0ncwazcj80ejdcrxrcskvzdnaicplzj4e4w9sdj19pa0q28zwbotg1f6b8lw02ei2n0x6rpavz0od4969nsdrzepc3zoatr8itefcx26tipt8gsxj30by1gq0zi4pw4p29oqqju73qtblx2i3hv8kh8zytnbwn7ngp89qt1d1u2hstahge6j65mbif9r91byys15hro5kdrn99h95ng6bgb07q45uc9lg7fjin1wax30fwttkmm114mw7wdmvze1klpehsdu3ht5r4sz9t5rl7ji65cp7suy3c33r6nwuf46ewvb4oaldnp4f4sh8huheucxfvkhr3ze2r',
                mime: 'nazp498aicmpq4jezo307yfzwqkwmtx2n66ctl8t9to8cw557k',
                extension: 'zc4clsiu8ps4vj6oc8m1nzaevlf2r0tanfxi2s1oj3mjv06gl1',
                size: 6892116521,
                width: 887782,
                height: 755451,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: '67ipzyb6p2msb7q4xh6dujt0pd1y7hosi9ac6f9cfkvu8yrni1b527pdme4mhlc0uetyz7rgk1nkpqu4zi8ofc3gt55520scrfuhnm5ob03u3zkrbof20yoblpcqghsvyn7f23g85ks57x5z6vfy95g6pc22p8kvntbn1b9hzhx8oiqrc92628698abvsbwb1mxgnlhjqvujf41nq4c5ixsdhke4gldkmjwhe6aas9uvcuqnqttherpiwaw7bvy',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentTitle is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: '1cckf9p9z40i1vmype0liahrokq5r422s44syuyo07pbkwhslhp6fx96484xlfegoaulvin8mhe',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 955167,
                alt: '5ncnwoa3p7d0vabv491mv8a6pjfz210etx3r2v6zwrubaicac5z96tt1baefqvoxcmbx9r4d4jeb39g8jazvtj6yx5dzr4i9xbvidkoxi5y3p8bjhe1p0g06xq2f8z1ze4vgiql893g407jp7lk2ufji4xorey402ktsl0wq3avc35pbless6t7b9pw02hj42bhpd9yfjz2ym2k2oztwpqw7ospokl42bi45t9cl2hrre0tu9o2vlfqdoimpa6q',
                title: 'fa5nz3vdmydtgo9ip69g1hja158448n6w3bggpr8kxhikxry46jf12s6rhje8gohksiqp89umu5fqfq9dohozsakq88jh8ii0bkta8tukndvtwi9idjetx1tsct7hz4nhhctudk3k5wpt9zprh06fpmy6wo3dgd42bblze9dvjkswo8fnyazksr4axufey9bfjyapttdbzrdwcddwdn3goua64kxk1wlcxypt97wdt6c1wop0hcinw4og0nz8ce',
                description: 'Qui nam iusto ratione commodi. Provident in fuga quos. Asperiores sed id nesciunt illo ipsam voluptas. Facilis autem illum quidem aut tempora illum expedita. Nulla nostrum eos.',
                excerpt: 'Labore delectus mollitia dolore rerum aut et sit. Repellat repudiandae eius magni voluptatem sit sapiente non ut. Quae consectetur sunt sint nam quas voluptatibus quisquam. Error aliquid quia consequatur voluptatem. Totam error omnis ut sint non blanditiis.',
                pathname: 'llmvbh3v9u1bsmi9xw7sw8r7xeo1hjsxh3mtc957x9qb08l7nj0zu3fcsp0ql36a62mp7gsascdcoc4hbtso9e3iw6z8o1q3dpf742daxybliculh4p73izw8ojxan285ltddza03c3isz6wbhdxu8t3w90zw2ss8t4pcn4jupyyywty3wqx2fntq4gmp6nntolqm2ddckfl0g1gosdaz0kqid1w2fhepekrd6f2edo9urko2075h6y815e7apetd2s790bfndtn631hsduhes7ziu9hk1p8cxvujnp9udvdz4szny5x63j9lgo04jbzunuw3gtngto7rq7p8cyem04mhxow4tfhvha5d9uo36syxgyws1j6047sitwo6ljftepdjteysen428dsc2avttiyfnm4qtuze24n8stitnfp4umsj3oamo59hiyh08obwxatvxt3pb5xeiw5ujphifjoyc0eahlbn58y5wa0ofwmpjk4gh2dzjnl3m4cb2yumwrclnl7u3x3hv2aq1cl6zmf3p3ata7qf5qyp814liznr3p4k5rsu5r6iv87pvv0shk4ashaxuq2b5asgjr9ae5pp3c1z6s5im0dp5kq0bo197bkqttfshd9px1zl7r33ip2deso3x980sne20igfo16bxd6yghomj25iybzzre66zqduysoz13xancorqoexyh3rrfov7gr2mvcckr2jznrbnzzd48895xp5bp7m3kojsxdu6ntn7gs95epfoywqc4hd0celwtnrya5kg7rqs9pzalzr85mx6m3ih5rmhihlfmt04kr8ov7nfidvwodl065rscjj2ryzaackkpqau8n951mja2vsq0t83m9wir2qb85xkkg8x0bhi61adzzbdjfnv4vkvn6morfvft7pi63dscf2mphbqqnkfdzegrodwzfjtchyouk3tgch8nhdcvc0d229n6lkt0b2ydgphrqdslg6thmo0s6h9x5frue7hxidyl7kdsm490wjmg51',
                filename: '091wlkh5prveyps3f4mi9crvvjcaseyou5tkx9kje9s990b2lye0lacdvy1975s1dypyrjepu2d0nkfcmvae6k8bdw8uxq0zb5q0zhpeefhyud7aqot76v8zme213v2n6ova8bsfed9rdomzlpl696wcfm27usbwll3zj0sr872u6e6q3nc6ab1057r13zhn63fd2dyneqarhgimugusvma4g9no92doc00zev6gku2i6dwud1klb2a68ek17b6',
                url: 'ijwr81ewvrq6zn6ox07fyy79fnmeg17kfqdowjzkj3rzbdsk8k8us0edv12tn6gpc2v9y856j34riwqvwqcuj0fi53vme14urm7yysouc8h02c2il8vk4kpx6unnk8el951yom8bjvhq3bldt0f0fld9wweekffnyw9lkz3902zumzxgzzbmbzvo45eotpb7zb1tar97aov2q13uqcdjuq0xaedwwym4jlai6mgw4zfpwitmu3i048bp0nydpkukrmm0hdabs2p9hvblw15psn2vkhc4c5d934wpj7sxncem4vge9o8a1nc4h2a8l54557um5tt3qjth15s83k7c4phzbxs0f8ol88jc0vruxr7m7hx20653ogzc4bvlrepldfc58ngak3n54pp0r0ntc3jxryd0j26wrd1i4tavcdhx5by1mem3vow96iblqhfdc7020plc43ojzji1m2fp1moy1v0rrkacpbj0jcrxpjvoval0jsc66au1x3ykno77ktzx4dl8sioaz5ai9x594yklv43hrcef7kubak7dnyz5z494py7cje29tdzy1nezf7z5wbirq3aqsgfp92d26i83rg8gbk1motam0kc81015igpjkmavtuc578cisyw2qhtcm21rcmfzcstmsvzz6fuxoferov2wixksikkbawiwmnnb6dfxdvhx57jkohl8adal010k13ww5384p2rfshr15ney7uijqb4m4fzx3pbnigniq1efyo4j7a7aboq7s47az5sctw8f5upimsgvh8thf13ssy00pxirpygvmhj4nuskp0jde0ygl6upvrdreswc75woi551qc2r0h87zmjnieyviyoxidw3xtz2bnu2f9572w1rylhreeqh2sc2z75o07jsph74i7vd0hp40on2kdnczpko5ah6ty6otmuyoy0o9vcgi7m8lnegf8461oxgigov52sccc57cdw0q9bsr7vzmed3gq5e4xo34coilynky9plqlfm9oy4qo15',
                mime: 'y8r776jyrrgtwc640mtpru7azegiwvq0v5zqvqh6v3um3k6b5k',
                extension: 'h5vrfc4id7d2aeg3eraenv23h5uj879s8fzpuw9je5cqzova1x',
                size: 8514042916,
                width: 810249,
                height: 422359,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: '8rgupjyj0gxy8x1pe2o7kiq79ld59j40b00tmfgt8w9ba8adn5efxhcpn5o7xmuvd1nvnsed79pr3rppl1woc5ecxnkalqdiz0g487ckwjzki53c0vsnacpm6bdflkxc87q42lpcaqrb126djurgufjooyqzqjlfmgi3tgffz9jpf5bg1o2c02bff46a7cpxqxzi37jhvjvi6lh03410jj4d6e6uhcxaq6qfi3mjuf6cq4wimnfrqpvv0vq27wz',
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
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: 'dyior2ozgnln20ecshvrljwmtil4tghi73ixq2q9pt3cadc4xsipbkl3mrboxr2xxsyu5apfqdy',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 740046,
                alt: 'jasw4k7nkd4an2a5gehw6drim318ajjxw7w1hhq5fsnh5b4o5fkbgthaheu57eghduect5svb66koe8f3y06hy4rw1mco85o4jfegbajion6jge2qazien8m7nielf626n5gmysm0qx1o4t50oykgif2f012dmczqn07cku2g2ep5zwz3rox50eg4atvocaz7k2g63w5cj37w3zhh8swjijfdw7iqyxlpvwmnxjs9opl9xrwwvnv2w5y4gha0hv',
                title: 'ayph6tzsjhj74fv9y0cx2ztxqj688095ljzxnma1257729fy659sqnecct6rn5qdil8d899fcwl1jphhxm3b1acewda099su7p9bi6notbk1ot2lkbg8cen96k9d5pi2eimguvwbwdbk7t37aiaeeof5j6fh4n6te6hga6r8b2zo9f2a1h5mema6083e44povaluo5mteu00qyt80wg1txj0tzggrjtvf4qwbv0rziuq09cpf8wppyl59ky9c0q',
                description: 'Suscipit non dolores harum deserunt non ipsam et. Reprehenderit commodi distinctio voluptate. Saepe voluptatem hic libero. Sunt amet doloremque illo atque et. Quidem voluptas ut est iste consequatur.',
                excerpt: 'Quia ex autem qui ratione aperiam saepe inventore libero et. Et voluptatum sunt sed quam quo labore alias doloribus quibusdam. Cum quo unde totam et tenetur harum. Incidunt quibusdam fuga quo fuga consequatur est facilis voluptas sequi. Numquam doloremque quia tenetur. Quidem a perferendis qui sint velit sit.',
                pathname: 'rc569oqch9ru7e53da95vo99tff8qcl4nj3c3cr7z584ebwhlnwtualb3w0ct3jh1x5gntob5n5396pi18lcllairz42kritunuoy93vrrhagmjl2xvgsx16usw2mevmoka7fbvs8mml1f2ba3r6bmt8fk6l2k8vv0dstro1huz3dt8ksbdbqxy8wbuziagyi6emkpcapt3p28435fhb6ywh4tkutauqb9l54kye08x9nmf915pjq6cald8l3zj2t4v5hxnemlyh901mod3roauvn1w8fdgl1yl4czhnvwboi9fmacr2rxgylodc4dkvlj0mtq3guno0f47ngoc79j4yamoedubqg8vkuqyknsni6agi1g5ce9syprhitfjcj8g4lc3f7cb10k7skgyspmf30fyee4ee0lbhq20u2jluzei5lz5cy649cnfdak17rfqxdzlvvfuemt4vqtr2u4fi3qnlzu9f1r81ef8kkg2j9jllv95d1hglc27hjyo22t75g5hge7zvvqhjg6bl7eucb3n4vj6dgnumlyldnjxsh9lps6pr56yyzax3j489tevjxvid0e4ly7t0iuyqtqn35dcog436ow1x42yodifdefqg0h4vmd5rvp8fnjotx8jddir2mm21z4mj3voslgvwozyz9jkdt2omoymuaut9hxofvpkf5x4qjrmda1et6r5ykpogobzjgkj6k9p5ixa4x1a1epk6t7c45v5chlm7o1gmjylwimkdvx8lep1arc3xaatfo9yxtlif26y32xk03hyn6nizla9zw0t9jhlybxml80i2tuc6tcv4iymdlzj4uvbkq67iqnxpyqs8ys9rsfk7nr99balohypc4nz0pgse5d5n9h1u4r4rytmfoblvafr18lx5rrqbe24exsbicdc7sf4qisisxjb8gm9asipg80l20uv0xx50h1kj5h59ygcgp2ygyxv46it1u1okfr1v0d7ukt8ggwlst12mdhg3ik8hn9dp47uh7o0a',
                filename: '60p02hnto96ce7j8uikfw35b4ec87b23vk9f4yucofoopfk9d6qken1eiun55z1wdaba2n2zpon4rkf3oh687wptfdq5abzlrxdoir58ck8w8ol7123rhdu0ua7wg2ssie12d9iait5g19if0rx62vld3803vwiv6ipumh2i3ihkm718isms3la9amr3k0vaicnlo90jmbamqztmqnvid1xk21rhrud37bt58jwnozn1u7nbtmmvcgu33grr8pam',
                url: '177maisykmwtchurw1zytm3nfp2kbuau3f0ragouzlln5vx9vz30ihumqr30c789uplljr8fje5pfbs7o61i8k2sl2n3m0bzglujkfpjk90csbivjtkt9snoarhhsdk329vibdh6qg0pvr9rxoxjpsw72em73la7vboopsg0esezi99zdhd7qyaya3i9k75g47kec1kt326dac87eb2evgr8kbdplb2k2qhex8uj2h7lt7reub54chyrm62utnz1jrw60hj0vgyarbpi3luy4meo9sjyvbzpoc44s22yyx6iwyj1mwrfnnqze2o2b8wnhdojs9mq3o59n7oiuy8r3qpzf7mq6hsjbfz894anap8i2dwokfkh71tyi26viby82fgj829orpiacmcqjyuyp1ct06kxfqvqqbzq2a7wkmxala1h5kj0cfssdm97k7wky4hvdchg2gsyd2sfdgyhw94y4jb803e7dkhz2oaowsrm3mjzv38pq0exlbp7sbmgtrkr41m907mooz78nhgbivw53xtibajegs8jkxd6dix5cw16p8yesw8ru2ts292l028kfkvygb3p5jgttbgizqi9rpkcf47euk2whj7fh08oo5f070vw2p7kq8pe5bk36rqs60bbfrt1x03szt0mu433znnbynk2ka1e40don9xwu02zq1vwt1coox9bcf6ksqv8fihzuyfj54lony4me7m95xf4o0ni3893v6qyimcwt4w7jsspqk729clhcfl00xevzlx8m2qrh7812y5m7q5kcc5xb3naaaxuzyq5wzjl6j2sfvgrj767901id37bwmpl17d16pnxjyp03o5e0hdmk0c6hi7242t4tb9oc20y18uk8xe4sqrefagrkijuc4ktftya5jg717k2z1zuh137w5e1qxwqz535srzjfg0c16dly0gk13ad780g4pquosa287daqq5s58cfkk305kcfytrp3pos5cm7oytn55gogxn78g4ou94emm5uh585',
                mime: 'p2bda1fyee2a3lrw47nqtie1mugao91zwbns60evc7cci76j42',
                extension: 'suqql7ewm2do5ks6drjrdjtgjvj0fi50gvyhj4ljzhi24bivvq',
                size: 7690227860,
                width: 179327,
                height: 114871,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'l620szjvi5ngd40g91oa877etgwt4oop3ycrkcdmbomtl1ie30u4csn65fevrrxqoas016skulas7ewxxynplzrupl7tiav9kv8idaw66syh4tujccie5urxcrujy6jzvqyzmkzohpfm4koi781mehwxmjaqstx8darmvg4wycrrt4feaq4hn413c9qatpllrunsq4n03h8qziezly4965xvtuoxab4lvfevdp1hypxztffdqlh36nl2qemzpfm',
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
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: 'yyapvn4ab75jizx8mu7egypms1tvb81zsb1hvfp0546uh8tictsvu48avgtl8qqz9wuewq8yhdk',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 110434,
                alt: 'vjadrqecxxc0n4r58y2di05tfqdcgdrpw8ocgfizupfim5w1ikahvwweygo3agvrebvy987ejgw3ruaisb6cg7jv4iqx4m765mgoww9roi41hqp1r43soycip2g849r5t9ov692s8e1ln3gm7wgmuislugnwt0xuhoripmam8erumqswgndlom8psnmh5hmyvtjp9fklwpm4q4ojvpkn4zk8tji8liiencu539vdzvlaf0bmit881aa5u0ohh2s',
                title: 'zfdxacrpbu8t856xd7f1qhic8ftj6kx8t3txkfq2qgpz2icuf27zbfh9aaftv3bsecaznyhr2kuyxhr8zxucf5kjk981coj3hvduigymy8yzdtrvgd2j9ezid8hkx3qg745tskajb58truukmranyj8tj8t3uljjreo71to099xmlxw8lw4droaoelcp2yebmdzpg3czkhxwgko0vn73ynh2n4k71e55md3xzmubmx3o9s2a2u8wh3v8bs06f1n',
                description: 'In saepe dignissimos. Explicabo aut optio quod. Soluta officiis illum nesciunt animi aut. Voluptas architecto dolor facere exercitationem similique voluptatum. Dolor enim rerum voluptates repudiandae quod amet.',
                excerpt: 'Omnis voluptates in. Quos porro adipisci voluptatibus voluptate ea ut. Repudiandae ut pariatur cum quo ut perspiciatis vitae dicta impedit.',
                pathname: 'sawj8fi2x765z9sgesz1bd2mh1iytjtqb2o34dh0x7vto8rywl5lmcipb9rcnj6a95806rrmrxx7zzj18phxdg86glxp5v8j9tdinob3cfuq4f579m8lr4yseducnwj9nx6a9v8zv6m2i89n594k4p2ubaltioyfval48a43z2t7v83kqsb0y2vfj84i2rwxbbymwiymzieg4ufgceskiy27egfjsik3q3g4d758x60jmunil4k49kurt2fpdtqtapee5vbwjxnctvh8hew3ow99byga1fmdz05n9e6yfhl1bthm784fbeqljxxzpja6li8znesazcmab4spfa8hu140hrt23fstcq8tf2w3zec8dpajy55gd0wpw6f7x88el47kge40cxqau7ue1sm3p1oa7x64lz1mvxa46y2j4j8f6ok0nmicd4of9dyyuks1g67akla0l9u8fxm4oyb4cm9xjrpeoz04wpdifsofdej4ix5klbje1ms1hws1kmz2n23elkeiz207yy5rowtarvtpe129unu7bi7zfd9q5149xenv4tei7heanwmhvx3gm6364nauoe7bkkntvsmw2crnb63cw3a24av79jjjlg12hhamufcpvotnqcl4t83dqp5rxyizc22makmzqws64pc9w6ee8nkm86vsl3dkvzqntb6l29qh78k4dkakj9w6eiy4nll8ms5ao8hf1a5hdw5skc8so5lrxta8lnilmtfka0td2ybwywww82rxo816ksc5su5zflmw8lbbsclkhoahlbq4bvzzhb3knhgz3qnv6ed87vwmlwh5okxhrsr0vg5lcib20e3qg86z58uw33wqztnzvo2mqvciq334doog36q6y0hxklpiypy5ml8vp4mrrfht0qs8nhnufji9o5y1z69myl9zsb9wjfsyc3o97ye4ea4ky95m0i4rr3te1p04l23in38cco4jpc0i181z2cdcceck0cnszhufnhoed2t0viggvct00bcbokp7',
                filename: '1h8xs3i0c74vagfl0rqg91vvzhaos6aq2fwcvxypybji0dflc3xfpcit1qkkmep5xlifuhh4tbbf02c4vlc1wbrkhg8pvc9qz65q4j9vwik851ujuk12sa77e2gvmbtuycx8albkambyzmivlvwcrjht29cxjlpr8cpkqjkltvtia24j8vfgmk5iaxis91t0u36quy5s6a49c72rpnei3xue995efqus9co84nz19jq8sp77fumo9flis2pbx39',
                url: 'pyeqdmcz63o8lk9e2955sjv7llny2ir77vfgfhh7spoccoal27k737vtg7rkqymt0lbh58ezrmqenj2waghlpi7cgqumutumxm86369mrvch9kbm3desck7b2jsfrshzblx3r013vvop86ehc3s95begnnj4litji1qihc4xh2bn8tbygdijtyqw8gj63xwg9oonxzk9ehrpgo838djxv85i5dgmjiljtrs75w23f547etaialj90qnjyykqhtoz6c30rvmg93g9z8lu7uuuafjax2t68gf8rjfihez82cx69juv516cmj33axouclgox3nf4dhenhpn6ngoa4rq4g4cqebvhqcl0iyvs9xvf69x8bh9l6f7np81anat6tynpmmtg02y9s3w8e9lk40kcz0bkxw2apsk9npl77esnezaf85nktxbof5no3wse0srm3t0vnvjtys8jwzubpsto414qzhp8czvf3xv1l3dfq1ycqlc5l3e464rn9lo7v0gxd976lkjl8cx5uzc88ruyuerx2p37felbjfvf8crf9b5zfkbjp70u24iputyst6h54n2xgmt5agnewsly1led7xnwgsdv425iofkzhnrql4i3w01jeak4qgnkc5ui2hxp3kdprkkb00fvutawbzlzjx3lumnm1zrsf9uahucmuvqlol3tzm789kacp3w9c1pa6jws0bvhrx7uzdnpuyp9o66hcpl835dvxb6ww4smqbwczmnz78f529es7pqkwlllda417tywk9bbz7ddsj7q8fm5divwnpfcgayu54wvq36nyku00oexw9rfg90ke6zots3ivncgk09d8hb0slv4p1d5vsnkvq45uog9e9419chz1sxbl0rw5szccxlkk2trw59enfjrwbxaqi15af2uhdvjaknnvntpnpyzw312crrmksuf2g0vc3g3l8p96tqzjiyimhfajor2b97v3wtghnuyhvfp56wrsiu4e6tc8ij7p2bludw708lbn4qdh9la',
                mime: 'kvbmfrbziphiiru4ddh4bk97fsf4djonnwmk19h7m1byif1trq',
                extension: 't37vgfdypovc5cl0mjvntx01usiaw8cbyl2cbndpldolysezvh',
                size: 7658749890,
                width: 869482,
                height: 895886,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'ibi1fuvi6xvhitaprfo4njqgt9wmcv0dsrhsesgkwtt2hrl73ejqn7k6nvi8vcb2lch01lm0tppvsuvah8wnwz5226b2gopskskxig9rpgsdaswfe1fao8081aql7njp35rycq5t6c8ghlkh84uby2vd0ap2ryebqy9et9u9ancz14n2ruo6vf58gyd79mhzur9pjeeflx1sc3301voaql3x5evw55hjjd94jcaw8kjljn9oa3ely0ccc1zmt1q',
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
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: 'lmh2t7m7wluy9e0nmnjvwfj0z50g1kzh7lw6yq93cn9su80l3id0q4s3cqfzn86xi7mhdxcvvxf',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 925398,
                alt: 'l1digvvxp0s50gvm5f596wv4ehbvz6z2ugjr55ydj4jodtjhm4a2uzorf9dzqeqmce3ds4rxpnbxqzgykuxo543cx3mnn4tc6fl8x30ra46av2o602i4evjihc7qgplctiytk4q3pxrvsn725kpsx1e9nkzo10rk8q3qqhwtijy0j7psl8l02muq3dpykoywqb4tk5o3kmstdhet6hda91l82zjpp2xrqz97ycj9oqt4i3u4kj2fp5mjeiuv2dg',
                title: 'dd6a0c01lknvtiv2yrofvedqoazq3mpk9urmx4kek7npciqtzu3iog5r9jh8nwhjo65kj307v5j1hq3prak6o1aivoirex8bp6hbmzfidkj6798zinoehbfivhqjmeaxtzez5vzzy3hzn6l6aeetkpz5fiuas53yillyaxbkwopd7k9ti0pqpdw29df3hd00uig7kyag7c3dhbdzpz83zd7pca0t5qwftfrzzugzsqry7zbodn8sf3avkuu943k',
                description: 'Cum vel ex error non qui nostrum beatae commodi. Fugiat quibusdam voluptatem placeat beatae libero est temporibus. Ut cumque enim neque. Esse autem est cumque rerum autem ut molestiae dolorem consequatur.',
                excerpt: 'Modi atque voluptatem explicabo qui enim omnis ipsa quas. Ipsa labore voluptatem iste blanditiis molestias. Ratione possimus non animi voluptas omnis aut.',
                pathname: 'k990a4tah7lys61p5fryallf4qsjulpcczqqgclq66vtv62bcocwtlog3xj485qnkamvhah823fdgritnqpuv76u2ze72elfoik1xz7jeip8vchrfqd1m87pxswqbsovmm54tobpbnq3avd94rbjiilz1b5arvw8ruhz4gb42ybqs8h3nc2lf055x7u8ulvpcchp13mfmsmkvyex6rgdjj9g7zuaiz0vbohlmw1rs2dgrvit26xet11e2wpfklk57goff7f2x008x5vo3jgufoc9s8biww1calmrgdo9e5f8zsuy2qkzpcqprzmxq9c2vwgv25ol0uxorz9y5wh09yz4spsqovngy3pryhy5p3jalnud4weqtf7bgd4pi53glx1oyzr5lp1ndifhv7larlnc24ktry5k7nh83vjndczdepyqrwaghq7cgz1ua76uasu5h3fyspoesj3t98esreybfdwq4l369s3vwrghbsutg91umra9canrx4rs5tg7m4ezllbcz730vqqch9cqaep1q44v4w1ry4eo6gu7b9sqm4eavre4hj26ol0nvids0gef6d1rl2fsaf2wjqp9s8tqyazrzprqbbwdq4h6fq3lkfmnm7cafiwmfb639b8w14ghh8m1a862w8fcigseu8ie2642x0vv4djr30kzlhs2u13qsa8rs8wlud5metsdds64a65iae3dlfuefdx6xtoem03dyaqwib702gghy5890pelx333gxshrvgadp7tfxngn9qxgbk07cxlb24q7xu4yfwjgtt9j1zgs53jvzrw7ieuq9swo39k44bm206pg846okhkrr21b7xwhdewumlg6hq10cl8rnfrd9rxxyoade0nzlh8kjp57yhrd5weklzi5d9wnptfj1ny1a3o4p6wk7rmc8rkyqdng16z982me0c0uvb2hq2m8ldnr6lb01qyv4e6ue77mk691r7nu6n5slt7ppv3mg01v8o9060p90wzxn7j9p48632yu3m9',
                filename: 'w551qe57gkiyz2gxxtr41rwlo1e9icvaq3opvr54bwou0zzfzfnwpd6r2htx0vlp1h4fu5q2kjjgp6kx67veg59poryexfl8haipay3svxgaxk42g5jlaa83t35ci1uhqqmei3f81p0j9a5taisfb7145ql89eabpjhxyzzjqdvut0nsxg4tiw71ndg4gsrb5ufuap6u51r1j9l0q8xbbowu0dki4dhz8wd5diaddn7xgt1q196q4lfme47btre',
                url: 'v8gczhoc8jfnfreuvtmlypbf5y39l2ac80hj2686of9n00krwn22e074m3wq17um3ennhcp8nii6xyz5qdifoih4h9znk5deyrbfp017hks6aml3f3cw34wq1hg96fhscwbgz2nxs1xzznsf3bvqnydymyhoop55qwg4cplqf5yx6zsdi5xt6a1fvp407z231g56fl4f0bda9bssytxczn1zoxxohxscg93snykm9i58ceft1iedbww26m4jhjf2qnpek3z5d2wxof3rgnivomywiqt9dmabxc7nz4atwc9tytbegttlc0yva21njbcuj0e5o5dm1k1hob617nme7jisz3z1mng4eiz821kj20853oorffafvmea1aei9qp8wjg8qk5ti5kogxi3t52qb2lgortm53ff3rpgumrfx5y9kvy1uy6mhibm7ieci7vl6hadsidzunpz811jwqti95yov7y9fgseeerm9d18ooo038vz8ghnhyojp20tq7cr89a6byg4repw90f6dvhnu9t7oqe56egzku85vtn3nersck7a967xi3i1hfo363bwyurjhf7ewl49y9ep5ywld2a8189nas31yew6ajzpepnf8kmy7yg30e1cmo8ky52b6wshy99w3r61nnxncx6hgw2ac5j8gbg8swvod0vv0nef3o71oe820bpvwroebku11kepw7g8jpxemzprf7p98fdmiyd3ht1iqbub9hnejbg2za7uda3g7joye5fvuied3vwlb0qgi9drc78xkehm1vhuncyk52huqyrzuxbeewwbpicrhb1a0qyky024gzcmlwmc77zprdq396ksxjsmdozefg9m4vkllvw7k3dvkpmbbeokmqvh0lvgfgmbx9t7pazyvtz3lzd0q2yoqj8mdj9py8ga8r21zpu78oolw8pb2zdi6md48e70yryup7q5rjmxvpxtnh3m9afhpyvnq7u90uycplyvn5huovl8hogr02ej2lialbyaphy6midp',
                mime: 'ndevhav8vc3w0lxd0thbaubo1i93kvy6h1jq0f6v5uhi6i3aew7',
                extension: 'c8pipd9podgk98eeo8yqe12w8t85ioqbjctyibojxuqsavopn3',
                size: 7197010815,
                width: 338364,
                height: 272879,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'rei339783d2kbvahqmolsfbl89bhl6q6nw8xnxxfybasle3w6luikj4bcmbp7yku5u5lw4k1d2xz1eky76ctl1sqh2dd38llyidaf4bsv7j6dc0xmbm5ooi0upf4uyd0z665gsi1bf3mt00w2dqwchzvdi4wt1jdb5vm4dv66pd8jvcbkhr7pn2kpvcvrg66ilsqeeaowdf9trsf8hzcoar0tie7kf2lay2uw18yu8zwdeuh0cmyw9kz8kn8wkq',
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
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: 'hujz18tqpl3jidyavv88o0yz2tzx6a4300n3nvrahcg060jjmtsqs5usdn8tj665yjqnxhru9ox',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 360867,
                alt: 's0xdez5up7kb6p1uru98iniztzjxw4wgjbamkb71lc8ac2rf75d9rp136j40tfcsbs1xf6swsltwop252eecrkbozw1ze3k36qiij90ei0k4mige64nz6xy2diwogjjhfo9djve27s9w5bs0k1dr7jhl5a0gwnjuib49qfntybum3looboub4eimqb8btl9r5xt10gdevnzpsqu1i3h8j1v4qu72bf1oiqvxqddtycb4rjckgqh05zt19bt82zm',
                title: 'r97cnwju65wz5xugs0qge0xpmwg8ckwagh9hqkaw86p92atxwk0rhjbfbzx7589cd3pkvrla00ro4q7zckgaqm24ri8urhbf2c8b72fey0ccsk64gdmwwlar5fmwbbq10egoggbd99ptn3hca6we6xq23dfv89ovbvurpgk6phw7jvgwae1jmw8rh2ks7enl11g5kl4lv608mp0ny1krcm2lc46jfi172vyf2f79sr816nmt1fdm3b4f8bwneao',
                description: 'Quaerat fugit dolorum quia quis illum sint et sunt. Voluptatem dicta occaecati. Eius rerum et velit nihil ipsum sapiente reprehenderit. Ad autem hic fugit delectus aliquam unde hic. Qui incidunt vel asperiores eum voluptas et iste. Nisi aut officiis provident molestiae.',
                excerpt: 'Sit rerum et soluta eaque cumque reprehenderit et. Ut reiciendis adipisci qui praesentium voluptas corrupti sint sed eos. Id assumenda earum fugiat sed eum id autem. Amet ut velit a hic aut est dolores fuga.',
                pathname: 'kz9v0ztk6ntorkpwnsm73q0g6yahdood6e2s02xpvgh06d5tkvp6oob0qaq9fl4ium9o3n3qcm7nstri9vlmos0cjlhjf5zqg3e61438zyfvvz4oizin2ho20umduoci9s57cwt83z153brra7fk2s40wygy90iwhx5thnjmje5j3hxb76uftgnchzeoi5grnb40otsql1tojqbkifysyl4txrkzf0x2em78bzk7uk4nsbttdj83lqx96rabkl0bqskjjexx7xp1t5ilp5owarnr6r15fe77uwa4gi3x9ry0m4dvb6h02a4k17fets1jt373szrztbpwhvq7febmi86zfw3nsvh3iakcorfun7tcx2ctppu0idvaief4ri6gxw3cbiimx4i34qwicsn33y5gczx4qep3fsl2hfrm8bm97gcsz85mmnf0bytl5brb8vdd1op5sx4d6atnult0lkvt0ll54rdd8cs8j9gknpzz92ivpse7qve52kf1opkyzaloi4j26fa9cpp5qw8c8jnbrca3qd78uocoxsql3nk44ai8rmnjfzyr8pt8pqc3lmamr4zpqt1gvfbkdnz169temq1yqu9we3jxen3i07r3fq1mqql994y91zgm83p0w7a2653euoai0r6xovw9lj0poyz6vxa2mb28752qqcj5cqd5j9jgc5vgaocq016loqipfa6czbll84s3bm2amdzimi4z9py96mxwbx60ksxg90mrd9jy3zxckhdbc7r53ghfr74s4ti492jvrq34zi7ktvf057olkuvk68fn1muxn8ng2m93ln0pgb5tp9ky8037qbl1fmy376sxaed7brrfvzbf5oks9fo6144dtu9it5r6v1efswvbev89cbxq8wgzdiagi5e3pebqhaa1z5njg03s8tjb08tp9iamjnmzzunvsle2t2cymy9jng0rvkdijckj5licq2n69e0m4bqvv81xpfj5aohtcgmas4dz0rk1qx7sdw8cakybsqjc',
                filename: '5h5wgygb9z0hjaff370v5gczaj4ksfjdff1o832ufwyge3r0v4iwgzghvwb5fo3vktbhyb9px3quu7mkme5tw5fey6wndfq6fn1bqry6r5ufgc1kk5xnh9i20vh86996ab60llu4g67ut4rksi5w0mjwfpmx9uhspfg7tmdeg5w6xar3fb7gtjs4f6r0kowoois2peqzetfi5ih8557hazmwjqsh7iuaa2nckn2x4qdlkobaq3t418dpfjycc59',
                url: 'k3f5vlmeet0ehw1jisgqifu2j3wjxzu7eduzct8dcfg8ioqsqoy3u26ekjqs63aan3x7kylrz61o84kw6kpmvulg0rz477p1l6v4s7kcub6zqfp33mb0614iazoz3bl4vsmqa2gwh2r481lyy3ulpopgh5q1xx255i42tyneafqthv3ofkulglza5fdlku4dv6vogw5b6mpui0q1uf98mejn0x2vna5tbaerfw71unc3u14k5dx2rymisqyo9xv2qg8mv2l8wns59ihxs44c2ofun3hzzi8z4mwedbjmpp98zyg8jx1rebpns1agy2w7oqf62z6j6m1rlmctj2s3u0ypolqkoi4a2w376uni0wcg3bh6grzz99ae4atk0kdszq9o6bl1jfn4mj0u3skytsxeau1mvczifyi11b09pgx6lqh16ovgra17zivfmxh5wx9zurt92own85sfp8zzypqd9xa9zk74vhl5jgz623ktvqh1sn5dcd8z0taw5s60gxqfeljy58i38r96ekgckwlx3yx7e7dya3wc8di4nficjrxaalpylh4ukrthuqt1s5z6cyb9lnrebaqscd9zx1sobg99teli23np2zh5dg2si7o8qd31u8ey5tidfmy5oez8a4b4r7etltr0h5ycfuk11667bumpncm1zjivhzhvibj9p62nyigvm73cs6g1z3kn26sanb4nb45vxzetkpuezin7p2goppr570cqiz8iboe3bc50xtmm5ot4usuwe1qmp41ho6k8h2xovctoqvtaph1ggmemnl7e95475a7gaa8ec0b55j7fv6r6pwr3e6e4jpji42irs8jogrepe2hwanwlw4bs3q3qyv8m0ka8shrqofri2919zz7gniy9tx1jkf5cy0cewxnsxhatwtpt5i70ilfxfd4lbo1ly4ac9cmu9hpxzdzrc69wlxikjosj1r5g86xrp7q1np3mlcedu0cmbrkpx56cra23sdo2gurd216s13kfnnzzqw9j',
                mime: '7251br42i3g6xjt3gtetrt8n6c32ttspjeyy8tiu1ry9c6yzlz',
                extension: 'z68hcpmk1x8g0dpzdfs0s4e12fmlhwhj653voo1cc54n0t1qyxq',
                size: 7892329539,
                width: 948404,
                height: 364243,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'khkco0vf02m701esvrlxe3n27dt88b7z92673n0exyk8aizu1uesqo7qotlcvvnrsdow3ivkacphcsndzwsljx5xvzwd7ss4bw6biqeanj7w6r0lxn32460uo2b48ub25fd9mn6jq4luftkzktpycvuebq1hkthln49zmtj7kgrgyqixt4wihbcaaz2fytdx9qq5otssijo7818o90jji31q7ii3cxu3d5en1svdu5gimh5whaitvnob6pwiae5',
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
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: 'l4iw61dyqensebpmgtpvk63ctu3kqrxz42zw9mu1t9q6kqimqoww581oxyi01nl1753seowdtwb',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 512383,
                alt: 'k92i1sekfmz9wxm2000rsdgo93n954orkhi14vh4q6yzpzawq5zdf05y462y2d4dnu0zfy02deambt3r5oebo6qh7vw9zns9dwwcmqa6f5q350xfy4pqc8qpbicl4vtwcvyqyem6ibypy3tp92nla6csbzfwuiee7qy037r6b8ffbvhfg4264okzvp0v1eip36m4p62uz4n4ll6z94o6yp5ypezfd8bsbmfn2f2uhl8hy5majtgqjepxtmo4vfe',
                title: 'nvufcg2seu6jchrwgum62zlmedo1poyjymi2r8myruelfkh7u7ztfqnzes1ecqs1uno876jxgcodzsanqqj3fp5bs3ibxrjz595rsddyd2qgr4rjyevu7qotpmnbiyarlguzxpndwerzm3jced9x34tc3y7lsi3gmsb8ga0fofehpfg2d2ap4e5xknyqvtomr9bmlk4tvkwc0s0pj6uitlzg6dazwmqwsw6aj5pkxuuzm0phxk2azeotilk8bl6',
                description: 'Illum sit id assumenda et ad. Qui iste a et. Repudiandae debitis unde sit iusto iure laboriosam totam nesciunt ut. Quam aut dolores. Aut et praesentium necessitatibus nulla cum. Commodi corrupti sunt facilis quo necessitatibus aspernatur possimus ipsam ut.',
                excerpt: 'Quis in voluptatem quod nihil repellat. Temporibus laboriosam nisi sunt quia placeat cum sed fuga accusamus. Iusto et velit. Sit est dolore sit.',
                pathname: 'uqfk4puqd85uzdld77rj35r7kozkp50z2lxr13lalvuy991eg1eq5pfx8oif40fx9b7kkg4alcqbnx290rh5g5tpanet5ya5wcd07h5ambbhl2s4q75qu2l23j5ekdr2bnu6hcfs0ohg56b971a0bbhiqi0507qrsw33s72nannfzzfp1nbolxgmxtp7zczrib0o24owrf8mbvpa5p1tgpiz8dguxuuq21lhjzxudx9l7exykaf8hzevrmcr7t6dtyo3in8huejhj7nfm3g99u6wkcy3ldfzfoy9x9g19j99234sexhbf06i89pe8m1230607uww41ty2yneerxwymyzmkhzrvx25ieh0wqnxwphan8fwvn446tfu9ofoiyip1ybbocs2irmldp88kpwxgsn0y47k2iue9c7jha6d626l13cxerxoa3tszvdsh9ndoitt0zugza1wb2erqfgiwxehyehzvoa8fjutpxwgflcuq5e35yrjhw1r33ltkg21u98aj5fzo30pxhay0gm7ocvlxbcm4p1be9j1jteqh8t0z8py67layhkgw8xpmm4lzqum877ysqi5z1y4bwkmzrsvjp7vvl30e17qd0w13bfi6y7jiv3u45ay81a5xl2z0fla5pie9g95eq5soeql5q1qhwzlr33awl31qzr0z3mb6h8zxu4qz4l3ozrophc8ir8ps9v5tfwvdnmpi2alljp8d1une6i4efm7wuwf733jv7630fmkqyrtm4p9bkutrdhdxigum4fsgwzzvvj63txjsplzappmllz0kpi5qho2temzijs38g236o5hz5r1gjqhfq8zuj1jjf3k45wbpz5aog5bm6jh5jpwcti4ixa9i7j7bcsw1zatnfrjjk902pbai7oicqz4zgq1usi9ycnxpfgmvh81zgbs8yp490mx88va65dlpybucqd9jai6h3z5r0js8vf0wq8a9jfkyyudm2aut3t3ur6fuj7t9u2g5t77jg6fzs5ughwurdj',
                filename: '5pyh57k8njcm6gywm8rjyqoexxxevlm9kr9ztcefyp4qat0nr1bq1tkdh7dmi1gsievs8t3j4tdevrifkq70chujdmnn2px4ocin30kh5k9rso9r0c6oc43t7wzkq1onc3co2zl7daod10g1b4k4hvc57ohgg29ky9fjrrqcfgwduvq33ijntbyvbfn97sa7jbehu8vgtdhoowuued92phv5d9d0kfsbdsten2l9w7fljtq12wcvxlvuo63hlml',
                url: 'n7rwhso7c0uhtrkjrkr9i505xnml9wk2kw49zkcbv54o8gx3nfyj7ub8jjsc4yx8fx92d18gndmrycp80w765y0fwyc15cdq34fgx5t9wu3e3d788hl0oebbcun75l4ruqlmyvtz8r34nlxpu7df2sx9l1ckwcy03eqy0s66s0peq1eldvgoemypv66f8axf1gv8k82rlhvuqe223ri6ig4vqf3pqfyfav1fga03d966zy9n556vurbkrmuzxky9but1sfh8wqw0gqiwytr1lbc7mk6lqxzdrnh22q0hs7wenptznqi8n2vft9j1ha4pi4n8yvwgy4n5x0z7npstjneuwgy3p7jqt8ctkljgt5vhkokykqkaz97lzru7hhsyjhbypx8mum7u1hb52snabrfoj7jusu0vbnj0ysvl9edywcigmuo13c32q0j64g46k78yatyz7h3d9y8efh0rgdhukrs18oggdlxifl10ehc6kaft8qchqt5hx3ph6ou2qunmeowr49umrriqx8dy9vrfpfbaw9copzkhow4gpl59ph789fssj23g0nptg5th9b0yvewd8pylhd2foavmfa0l6r3u7soeuzimd8311qltx8c5cq8xh3z4ezeubplqm01sku9095syr21c38ymj01sqbgjpq0yyilh93l46dy72gwcwvknqdo3or3afb1867u12bn0wavspg18bha34rqt7kpdyg9a0rwihevsdzoi60m1yikbtaopwgtry4u1rqtgdmbjlbbvhvq3o99npc028b7czfis0881339otgffbiuifzaqk98y8c16vodm39ch61ezwuhl2a1upa0wpi6bcgmvc8si0nxc4ujki2cp0yo3lt1q1kaa1n0o1a2snqdvvodyfybk25937lmfqn5acuvwreolhvf2h88o9tku0sfksykykxhg7wbi60tr7wko3fxn2l1qjhxu6jbh39x4p22eg5cntwyefrc6b6mnd3x382sez1fy518cdhcw',
                mime: 'dmzxzubnjf7h4ff1cfk3p4013hfhar8ivzp2s9lpxyij9xyd26',
                extension: 'hy3twyxtlhh2sczq21faz020h50e3nvxy67rkcb62g1dx33yi3',
                size: 89811037520,
                width: 432548,
                height: 159420,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'wlp3fyvf1eug9g5y9v09ed3mobim0c4jw1scahmdmllalxuna5wwqifu25a9pmaz69h5z4e8zsdrm4wo0w8fvteuhifp1g5sban5eegh46xao6goye38eyqk1fys2g8r9uyoco6ceh9pwpgwvi4sg5sp6dmxxkzy9l4lp0xrxqglac3qk5lw560yqsihmfiy71ann71gqabc62nif3b7akqtbk1gpdjbqajgzm42j9v60hlkradcvarni2jc8ei',
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
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: '32igh5t0d4pg8uvrmjqvb6a1sb744be4mvdz4o40tq05h0k75xij3b7dg73lzh6rhu8fihbqt2y',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 958590,
                alt: 'tywgf2ci7kevwx1t0kvuw38uxva767uce3671qoay20pjv7t80x9ogmjfob16gtyj2hf4nkhk76fhkc9pwyzxi5jl8102c3210imjfz0akl3luuv9w57717zo4axiceyljlkumiihivf66s2nfw6q4qx45l05v1b946735pusjywhaidqghbokejl5xrm80b0ozqbg8zm0mdu1blv47k2la1sh7pxlpxif7i76lo6mo66lm3lbe0u10n4tvdz3h',
                title: '78ryheqrk54xyf9jjegf9nqfiq7xak6pqzjvk0wdo3gl7tyj3f45g9jyuzexkq6o44bvbc9f6dzoxh7ibb3bjvay2a74dbvyu45q2nonr1yj24b2rr8p3llunt2gbqv0jzuj65e3nhwgp5t43nxdwewctraulg08kq8bjejvolcvtsldok863kyakekkpxicq5ndwsnh0t3lzs24k5y5cgmejwqv202c9qk8nm21cvnnlp3ivgpjvopgsjedmji',
                description: 'Cupiditate quia est voluptates sint. Et qui sed voluptatem enim. Voluptatem dolores nihil. Voluptas vitae cupiditate quia officiis. Voluptas non non quaerat facilis. Laboriosam magnam quos expedita nulla.',
                excerpt: 'Provident dolore cupiditate reiciendis odit voluptate consequatur in qui. Distinctio est dolore totam et tempora eligendi rerum aperiam. Excepturi dolores qui ut sunt molestiae vitae eveniet quia. Animi commodi qui veniam ducimus voluptate exercitationem rerum aut. Harum nisi beatae et autem autem. Ad qui reiciendis.',
                pathname: '2desn07svn5e488hqegh7yhx6xie3ul230bjuqog3wgp3odgmi0n3ws4b9e6v98ce87dcaehuwyhr7ynrorautykju0a2crnim3gwhvphgcfpfws0tzvxzvenhezc0x61qzcgcown95jcogqzsnqc5h8p9cfno949ngagpvt1l0jbrsb7dnj6njtd563ttknm8foizm36wxao1xu5kku5rydy6ub4ama1tjttg35eg8ai2gb6cguu2i1ecot9llv5vbrvt843a3lf7d146vmc5kdoopuuyvj7s4vjsmhpqxonxhtaxk48ibv06vc2aqhfx939azbv6rcleht670vywto9dh8fuuarnqqgky13r3gnjic86wt00sut97nlietdinhdq98b666ocyh98jny1l78xumx9bt9otw7afst56dsp7awedctj6wo04ywbhrjg74pmpzx396vyaotft4aegshh12cxfavwx850ebfs86sgcn3mjknqhycljn33p4saavvaykr7ao08op3vumuai78pb5xsva6vpls82uuto73pxehroc4odgox16kyo85on8xphf1vuhnqkwzoiepqnq3ej05t67nfphz2ggmombs8fyplfapzbxk7q8xvwr9ve70c1mazneakv3rhsnfpyjy22c5j7fretbsmb3codgtkyxec602gg4zndxyux4qq59obzibgu79sfavumxeyt1f7pssxrk03t9hj6p95xot7eohfocqzswokj3xetko2wxn4go3e3bhysvlzf15h0p0fhlnr1m16wk2f6bwf6ps2y6ce10h55vf76lmp3khez4rvl5jz0556if9fx7wgktf3qklrb25v99w50l3shac88o4umf47dpr3u7srkuevyflffdgaoc36867cnnzuf4dro6huu7k9qqfacyb01guiff2hyf0r23dtk1x157pbjanfw1qzu0km5xj83gsfn66scklxx0yiphfch6a7bxe1va1rqheslxrc4ain3t',
                filename: 'jatzp5re8w7y57rovoyb35jq297isr2nla3ekz9nmvl5eqeucp7y830h7ux2heu2vf1suf3tmugcrka8v4a4wk4pg61qw65hm0mg3bfwikb4wabtcesln7mf99romrnb4lsyda3yt5f0pufv217i8xni87vbbituorhb8tlyy4u2oj8u4m2maj5tysh0pzmpockodgxvurbo8mmqux3yuyvc33q3tya2tlejr5l4ulc5x0vdfirlvn54n94x11o',
                url: '7s35t10filvqwopa7ss1d44zfgw17qtr8clegildmufq5nqjnkz61j67tc1a7frx4ckj4dm3k9qep9fk4uayby4s7u2ud1j302xp9c6io3bjkl67m6hwjid0x1fztu8qr4ns2kw7rtvu9oz6ernh3wp36pfx49i89fq2c1iwctwa0g1l6flmxxrt0py71h0wse452xy66xk95een0q8f3vr3xh7br10yc2r9fb49ij241wyzpmocbwzd30q88hhq98c3mihoxx9wccsc7igzmnqem26tvpdxdk6f0klcnx2bzjfwit4iri67v65a6eku3jw3yxywtiflj8fr3bugbnlo23gpiay6ywdqtt3rmqixf2coamkqm2q62b6wjkdb45fsw9by03o5877so0dfzlgqkhuf8v7ynseqsir8t18gy303a5jrsfrqgxu3suil6rmmy5coy1q5ujt3c3lxhl7ps6hzt30bzxsse651n0b5dejgxr4cgwcjpii5v7gc7gryd81wyjsh7wdl76n4d5n33ecq5dnwm1dixj3cquk7j665fwktubks04crgvl6y8loftc7uxnp1yeq5loeft2eaaszwmca914df49mmwlh9h3eir1towc20ien4m3gymkegwar9gkzbg9z51g46guy47up8ugg1r6a35cxgs7co8ab99zd07340msa14kfnqvbky0vgaeurrgc5plxsslieinieh7dca8ozxf3kgvv82xn7mcpnvby4ko8t9bot6bkqh00rnq6g3dmgeag8h9ncnm7joqkzyib4cz0k76rw6oihm40v8ir3w3k4lc1al3heg42czdnggtvso681k4zw6p483jzrphctb43vwtowuyvj6lhl9208tyg6in1hj9ukj7nbli8l54afkbekfcdgl3el2jxl4vlj5k7v526jpggssfc0x3jq7vcz8ogjm3e0icfduzsu0jfsttg8k7f1n2xfqxkdlnf57gcuzq47c8070ufp5pq0hy58zer',
                mime: '8xrow0pndhbegwhuc7k69h5fwtxbxgoxzlubqi79qhwa7l1bnh',
                extension: '1uuliv419kq2y7dtiy7q55fabz0pm2jodwglkxjq3n9or1ftjv',
                size: 8526319478,
                width: 9045646,
                height: 818177,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'ttm4pc76hbs89quqcfwkex0ei1qc7k087j0y3ta28yjn36584fpwoevvvqi8z1a3e81wb0v1yce782a3hv5sxc0yqmk2c4fwtjw6taafpapht7tgu21yh2kzasf6r3l1s7kry8ww6d9uz6g8ckz6vxa0bvsh8uv4mechwrz4hrn8wya9ylmepyzishdlkjlgwt0cucg68ggeg45gk4ue1dsocimaesnpkywrktevfazqv3354wgrgpsn2ydg7r3',
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
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: 'qpzlmhbm1wxk97t9yq95yvtnake81plh5frxuklubqeq7o4l4g1kqtvsomk3f137jgl6ik9wdfd',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 772035,
                alt: 'qadyvinlf1heaofad11aw1c6c6o6k7pq6zko54btisu6vhcj4idv3cnltk0qxxe6qvxy0jwe1dgwu2nuxxddahn089vb6s3yfpgmb4h8sfqqih6zngz6lltrbrfa9u150ucdmqpoyqo4hz5yicqglz3j5r5zop3z25c19xa5ygtm7zy75bfg40awhzqc5u1hesgb6cmgoxeokoi6j2xnyupzhta8ps9fxxil3gqnj0z4m19wc5jxja108bzhjx9',
                title: 'kfxntpihtapfk9dv3mggd14d5n7vhhud81dyg7nhjtzr079fwk8lfymqt3j0rpa53kmfmxwl48ok7a888mqnok3vw2iffryho233peqtgcqxyeumi8yxdf7ci47c2rgl7nvcr9yw4fmkcaebzzms76h55qz7vksilte9bwxtwqeexc9tgsf9j4adakwtnlu1bicr8xwfdimzjz7fw0ggolfabejx90hhpa2a88w0im2kdoioz89io5fu4tr84un',
                description: 'Recusandae repudiandae omnis adipisci eum ipsam. Atque qui dolor quae. Porro voluptatem voluptate nihil eveniet ducimus quo.',
                excerpt: 'Omnis quis quam cumque beatae qui nostrum. Aut voluptatem architecto consequatur rem sit laudantium. Corporis nobis reiciendis. Et ut et consequatur ut dolores. Non repellendus repellat minus. Impedit quia voluptatem.',
                pathname: 'tjxg9jhkir0htjrgc8bee6hquvx5lhvxss6z8ky5920x1vq74jc5wlms71gp2z6nyx1rs81y2s4itmxw5bpgry5ycfhf7528ho67vdw4qxibanj6uy5o5qom1k7q2iozbezxo9c863y4u2bd6qshlta7c95lcvchrdfse9903a2nz2rawv7ntnge9i6cjw0f541t6t5mwaw5tlzkey9ll7c0rjjqsxreo55jdys7zvq1xtcjj8wpgze49rm98ssuh55bqilpmww3b0wvhzmviv2h4eypqp98j8lzonv8xwk1a4v0idhysbi4jcimtp0lz5smteoqn8tjuskfqgs79tv4qzut7arldr61f94xok48iol6da75z0kj3m6nl3q86c8ot5ci6w91x6acnj8cc8r8bq04nj9mrii1zhdcbwjywhis5pvrwxnmzrxjr07h0eohfithhi9u00ql57eq943saegxbpcrqyxzf2lm8px5grdr1ul19vpp5i0mu4j4eflh3j474xlutwj14wa1hops5qp7ykwpxygv4y94e712e2vrvmrlewdv307rd8qa4yn9ck6mnqdrggett3rpmtzy9629qozo74urrgbo1j8t9dq4swtkhrldut75xhmt6bsv1g2as1evxwzi6znyj3rov59b9jsb2020lja6dpwtdd205d9ui6gfy5hz5t3tr6i8znln4eb1nmnp9ge3q8wzcs56qfx0nxq5iskwlwts58maxzbb8xtexjr2di6k1io0wz7vfsj045pzoc8mr3c6inp5p6iquf28lfp8u4ffsr5wfqh5iuognr592ywaebo4ikoh9una6ue9t1hdld37mu4im41giu69mx6fyptn70wuimc916uzlceekros76lm3n4l7j5qeu5t1l8dehmjcv0k1mwm2t6yrh9crsg8dhrg2cjnvnwck0o5lr80lxnshkpkrisma5jd1yiy02ogynun9ordp7b04nc343zzg9c42w5vzeomm1grlumd',
                filename: '9s0xvtmvor7ppwjuyayj9biv0mol03iliagxeejm885u65qtixt5eazzbvs3q6y1omg3k2fmqjwy5fi4ad8oepz7ya0lxbev7gqhn3rqs0qwckr2nncmdagrl74udwbqsv6rfaei6p8q53siqkx4awqr7ci2d2ozfuuyn72qtdq58bwltyejewntzfr1hztgkicsugu371auqfr6x8okimppxy777ypdirdrhzytuzaiuuu69v44a0bkbwen5pl',
                url: 'lqgm9j0nvsxjdqplluf0pk8mglb9vtkpw7dtu6k5lx59e3cgs1msesux6q0g146n8qjtswxabzpusuqz58wwz8xuxnfn1havg1wuq8w3kabxo1yz3m7ev2n85l0kxb09m2qmfeklgrdkcscua85kyrcx9wig69y1sbbdpgspu5tikh2ytvppx8dyx81ohplmn0aahmio16sccty8993fhlk9q7bnhqgx7qosqq1afbmjqyqz4cr5q0a15efgnmda5worxhmq2mizmsd9amq8yqojc04m5r48hq3lvx2k0hsqgj8w2v7ng7bkszbpf7hakuzdrqa9dedttuw7v1f1jlt7evgi6x1csq4979cslrhsnxnuxw9q9bt6gpxyn5pcx9dn6ikrx37eheexdsh4s2skyphisyer83j8xjmmjtq6fyf0oauwcuzafw9mq64j1m1tacqb9tjj36x1uyv7wn1zp3vxca2qvslksmlgsto06anxabveewm30so95w6kub61hjx74x1y9c7ob3vpba5yss4uagt4wk74vo1a7uadwg37agh1b56kfbn1caaruwql6hqpqx7x7orwl9y9oz58wocmxmajrumegbrfp2covoc69af86vlykv7zj4dffu8mhtl8t1prm45jnz6zekd03cz11e6yig1io7xa1n1uxpdx49qrsbu2qo069h2rroppivmuety7lvq0hiwtzgefydmcxabih4qeo0gpa634tbkyh44dfo5m9c344rzaxkcx9dwzpzx2sduyv38eqzpdz89kioba2brel8i37pplbs9283ty423trt5fevk75e1ejyw5ujaqw3zpzjbdxjcrro6tmxbjzpvh9bgz3ei6n9ptw07irvyjwdzqu68o3ihoya98ecylwii1fvg3r3t5tzimcso7joszq2f4nl0ksgs69tnq5a7ndvhjs34dqhei6gqi5p65a0eezoet22x07t21o9fuckl1rytb8oep1pksttpcgrfnrvgezi1h',
                mime: 'txzph6ppcpyud3apxmegzcz592q2mdp2zbsh35tfjnynj096co',
                extension: '6opjj9gvbxq4842ou6ipjvwfohe9yibwqmaqa08zgzwp3qhf7b',
                size: 2343493104,
                width: 377847,
                height: 5868348,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'pph3132g29auw9vthcd0ba7niwwkc9b3f3zoxag8g7vlcgm6vqmz66ia1j0s2mnblankjqnzolf8eex2g4rewlm7chkln4bavvhzegud7s8y5nzcozpkedx7hyu3t44cy7ordyxleq354vnus1r8vfpznb2en9e1rl5lye11l3tou6ovbpe5o79z7c9dvktmk1lsjdx46pamlthjlvwv7m94f9ual0z07ta6hsl95jfklq6hngt2wwhop3x2s85',
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
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: 'cog0fg7woiy8hdls76goghrhurul5lhatvlai27tafeiemm5c8ps8eqqypw7w4e7945glw8a2cv',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 386001,
                alt: 'w78xuruxtnvdrn76xoj1yvkkw3qv06bfd2z2w6vfkfh7tdxbctajke5tqklon7j8ms1uz7rsyxapcwj50uzrfbxybjbkjwmrvhnbtctqrzi129doak56k0z9ajl7hsv1aealmm55vnwo4c7ycxveguc3iaip4il9jxdpjt42h5ysdltywwyk3lhdev9s9dqyi66p4ruklb660zlp6wm6qlds8zel55wa9385vo2vbg01v57qcypdj0mjz98o15j',
                title: '4upkiu34zepkt59hh8zxy9tyt8u21vu2cchk0a50ihsz6n4ovc6jtaddwacifncirvjed716h53728nnt6ck2pc1pg39jqi55cy0npaui20necvtxxdvpz659s1dmh81daf2hc0o2plhoa02a8yiz6r2af9jwaq24i9davfcpys3w3pl6zwjm16ip2k0t0e796o8qzcz4jmrzhrn3djdlig0u8dg8qzkerym20vnlgefv8g61lujyq8ymv3nv16',
                description: 'Delectus rem eaque exercitationem. Beatae itaque consectetur omnis fuga fugit autem quia eveniet aut. Aut molestiae amet. Eos deserunt quasi cumque tempora ut sequi eos quos.',
                excerpt: 'Est quaerat est ut unde facilis amet. Voluptas aut veniam qui non vitae. Aliquam asperiores ut facilis nisi iure reprehenderit et ut.',
                pathname: 'syib349im9nag1fwy8t2ukwwoledpjp0p40kki34ls51lfr6lgjzlkualkngvtdf7t3hn8mdx8co4fz5l10u1boxum1hsv9o7ux12chdp7hcj4wtzodi3zk8p9zkq0i7s0h77fkedmzhmotvlk308hyrq3nj9hc2r9r4isho6nd8s7pyd0vd7vube1hmxf7nl1v1smocgoer91l6nozyylvoj4ar4cbrxp67fhdxy0dy133f4rtth0k310mwn6qqqk13dea8wydu8xotdemsg7zt8mdt1gee7ohndahck8q4btdewaergxr2s5tt27o6dgn85h033xor08drzfqtcrkeupiiiliue42zreldtqze4yq3p85hsjh14js4tkp5pj7wl1eob0d4rcneovpu3lwg2z0uhjk7f4h0vh6sqghrs404dz1zhinwxzcbi2ysnuypo5g91knhppe56azmnvopq65q4kpzp28anywz1p8tfbhkedw3zquv4wrjvwwz43p9cncc5mv2s5n5q925xawk6ciovjio4npcdz524yu6nqdoy8scynea6miic622bf3tcobunb1cpokh5c7l27hbf84o0pate3j787v22hcga8r503dwcdntcujt2657nqiyz5eqdpuixw6k849s4audf9aw2dq2oc20t3bs1vskuuvymcxwwc2g2e5l7d4f0v5333hrvsli3sh4lfx5ur0cx9xq3f84uv49yuncnout6hqw81vhgeq8mt82p7uodaqhc2gnmiynjmzwe5yt03x5lakqmp2ahzqj088sxvmcfxcdbs5f9z0gj880q8bszlw60o3ljdw70q78z6d92xqmx1kijrnld2jqc9ngsocwyr5fk3ujzayiqmq2m8efttt8krmbbznfltcrgdjeo0fukcfxzonnubpp0z9uwmrsjrrca8tczwrgfqoeojq9fgczyg09nxrnxr6k4lrj56sjuztt47ljn1ao2po5r6vcgdk5j9nxrngklkirdzv7',
                filename: 'zdswt3ggm06euhfcl0w13snmt3c96mng10x0hg5y0a33gvzmje14r3lvocj99lte8aaap8rsmbi1ue3v3uedu45dgssvd1i7alqhtxt3tquxdz7ckh7sj52maeyheaq1d1fawlujlxuf1vgq6d1jvydz9q12h9ja7gvk4182i6y7dqffx1tplis6tjuf3fehe6lx3yftg4gq5bz5w7n524kddqkvc2jsba6826uqfps87nilpfwt9ehnlg461rl',
                url: 'px538uoshnt9akad2w8ctkvu0yn36mcw0l5ajbkx3rl0hacht3d3doamc872zmjcwmdb4wi4oxe7laiyq42xu64dvo88pdzllbgj1v90fnq9ht2f1985xpssxligiupqprhqw89e6b1m98hgz6lugsbnzw15ebkq0w8dbxdqxkbs77lrrutiof6emag8nnpelc7xt58702g93xns3vnjivi4ll0kt6xjg96awhzqg0br1hblas0637mhdzc43gv9vnj92at68v7let4c1jx96yx6mdkp8j681u3nzbzwd4lqjq6tdau46guoibvfplv3ug1jvobwedpf2rpclg5mipir4ldwoi7brqb1uapoh76fmwa9uq4jzdsytjhfx605mltg0n1yt0xrzr3v2qgveerh5rsp3iw3xos1f1o2vifn1dsbfmm32i68st7xxiy6h7rau4wdx0x1xupbaszzwhjcv7qe8m44c9y6puv9zqbh3554ek2d1fyojyo1hku5gumqwwn5q80h088zoi6jcb24vfu9gsmsr6woelbz0h7kl3z0a9l8k5ve16o35fg8ua9h801p7udox69ziliftbf2ilj42qmt8rs0vme7auzvyxstvph8hdt84hodrv138rf2i07z644ls0ylgwghj9mmk9b1yiwuvtoyvrgnz9jy14radepa4nevuefv1s0n12n9djcmyvq3y4wpvjuljrtfi3b68cpzap5ugs5p3scqgjq3ojb7958ta08xckayyoj6e8ceivbaffco0ehw6ootaezgzobuqb442pw51cc78cyh9vh81ms8lodqvikalj454pjmv0496vnopt1y267m8ukyjpsd94xcqhkelx26a2411n66phkikyv2t3siy0fdt56hlu61e3rowzqmmxsv0majonkavprita0jpddmkit4kfhn4rtijl14zyq16ka0bi8govq5sq9kbnau05dulhpgc6wiw5lso34xmn8uy7vdap7urcjlz9oryh3l',
                mime: '1oq4uofubr6hzc4subudk7kvbtxcnztq2avb5sk1jy1usd7rch',
                extension: 'wwt4w7ehuoqe9qzrmmuvor5eb3lze7qa6bjxa9mjgqa3fpbqxm',
                size: 9835874978,
                width: 621277,
                height: 616858,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'jc7clo3ehtrsx0e41eufni45uxd25ylz0q3pd9qk0spv5vkvugiq1osaovs9606mf766ulyqk49e7qplraebwymzllfpnf81druxcgbcs2ze80a2t08ylxe3juys49jtv3n3enw8ip91tnwah33fek7jsbx0ww3ypepnmv80hqgu9csa2ovhiek87n06grlvn7qm5qc3h2t4zj3gx1h2v13qxf2kvl8dt7stuima4iocz15jk3ez8xltz7vj1h7n',
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
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: 'wap09xd9kbzntbhsaxxb5qyplsj26r7nofnn1vul65c55oyird07ofkttny6q8wtu9pyl354t58',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 156902,
                alt: 'dj4ass8upxtwgoz0ymsuk2d91o6l7kgr9b9ddc21ry58l1zx8lt1pv8eibqulcyzqv6vsx1ku0hwqhbx5nlos7xad2lmlfyesdomlcktwe7m9jbwzlpqllo9wz4so1jgfm2ahov1bjo08iduezn5rtl56cgw3yfafg5duuax5w4rjikj3u0yqkuwwrex02kndhxsxx4f0piv8kuvhczjvqcjha6fzddf0isuxwsbr2h2h238ttby4gzk3tlcn4h',
                title: 'nky1f0p9p7epu3ju38jnlitobdu25esad4li65u2qjgtnsrcnfjkerg9uncspftbromhfj2s54hog79o85yw8wmuvzkbpuk6vf3i5kzf49lv8tdbrvyz7ar9hszzlx98836y4e19jji9t8928l7sq9pp0w1zensjpqgztn5x0kkkrmeukhy6837wogocqgnoslmete07zoq2hluhb34wbw5jh1ozo4zje437uvtm4o4qyddpunqx6glm8av6jdn',
                description: 'Eos labore doloremque ea. Consequatur error et consequatur iusto vel. Qui at cupiditate ipsam accusantium.',
                excerpt: 'Cum eius dolorem autem. A esse vel. Aut placeat ut. Et consectetur natus velit nihil aut sed autem repellendus.',
                pathname: '4xtnx2eq0vxrdrdozfzbv70pun8mj8xlzf87djwae3yrrfrvdi2qxemlv1s4s879d32bbfxhgxk426egegexgi6idrqxiokjg0fmr55mg0agztkn4mjzk9e3fbmop3kohdts9gu3hyb7xomhljcwyi3cdc2kjvtxsifcmulz4958wr7gr88y0cqzjj2l33c4up3utxsqepsktkt6vsx6x967c5naf0vbhvjpmxr8uukb7sfmhw4wzb0eyzzrrud8jtcdphhgjpl4drouzmjl0sxreidigoyz0gse6fuc0c7j67cmbh80vx2ya363r4nqiudcfw4ayzd4q0tvvs3uqmb8637mzxkjgtt57rs2g8unjhargzb7dlrzp8bjqua7am3y2ystxzu9gre56lyur8rrd4kynrx9pbrlijqbmpfj0a19s0ghis5un3nt9g5w96s8at621b9bzk903usq11ds72uyl15bvbweyppb9tqxhp5i7sy5mva9lx11l2ciu9hiofrrbylo1bc0qbyjhm689of9b76uuuqz8cub9wtfd99aa7c59c9nh8yiqn1zt3glgan4iz4hf8bs9hro7fk7r0s8h76l4vojsukatb0yhu66kncmq54qanow5uwt556as0ph7f8gbficu6b1f1187zl9hlake3cwzw19ftj9afhq762pnzzzcnbz69ufzwtixpyonotg2rlyiw4lnav93lvcjdwh71khcp2yhx142072ia7ewl8ttvpeaxayigkvd3q5h4ethfhrvl06p20qanc0t40tuxeffglmnmm0r2ltzhafmk5jc3r0127qevo67fu6mbulv830ws6ebuunjktaqmxe0uitdam519p2wanyfcgkhmn2yvqp4g9s5tq8t34deygaduhfean4nyyd15sy6pytqvx6mnot2uezz6eom5zo5261wjczmugsk9h0wqtad2cx9y8xox563o4wwwlkg3lfo934icvjsjys0dm8sygcekrkyb936ib9',
                filename: 'xe54e88k5a1k0kii81o3ggvpabfano41ieqx3dyere25djoixflyq6ti099734ew3pupj4igbiiyiygu8wwz0jlyg1r1n062uenqy8ac7o15g63peo7g6jgui090b67sgdxeytof5fnk95750y68wuyc0bjb90ie4gxwg3pe36cvw34owzxiwmwey5blbd82md2cnr6g88yt644klmsp2vec10ymt0bw11j6kku61367twddl6z34rd33zq2l35',
                url: 're4p3jfjh72nx3gzron4a9sn3gypf8wjjvyhnx2dsq35e3nae0htlhvvjnyxy743uam5ftoeyck2d2j6t4832akqdmy8yjbjx0ulr234rae3uu6w67d7gqth3nt1hc866qdlfqey0uhz4d34zs2o6cb0zc0zcc06djrlyxd26niehwa2sf08k0o6eotg8vfzcmljxgw44zzdn2dlpbw8kv15crk3j771xzvd8ddnl3r6t9ofqw521jf6kc5ll8j8vn7qlsidpesad4wj5qnn9iewdh10sjiov9knso9tnvem0ulefmpndb7cn7n4kyz6jnzr9gopbmbiv4g1ruje7iemxeefmq7rsgxauzt93yy8zcixg3irls2wip02x1ho8e88dfd12w00425pztaesmjs8h11z6npzeaogl4onbm9o2kzjv89xkaqmbout6f60jcbdgbodp48svcgag6klm07mftrj2025sf0tr2gexy304ow0vckpe53rc76ax47j2xcha41vg5l64exo3ffoz6wud6tx2mbupoygezvbo8qzjo9ijkx4qexyo8nb4bg927y6meg5npqgmx486diodgzlihf16vc3v31ofhqgt2qr5mbyhhmgfnufp40nibqfqj6tsuxn8g1h9ufo1lau5b1i5bie16eff1tpls0woa8kiruj936v8q8dkcyy7mjyf2gd5x0bjsdcaizv300bzzh1bqiriyplftjaky494qqdp9co24wmyui0fylj3utq48fwez4vzdead0jvgvvo7yc8ohy8dmoti12h4sas0vji71fg4elbnnbt69ael3iq4j20po1t8xua5m46rsi1ml619973166gjzumkxlr5xjx8xphvnjv5msgkvfktdd9cytjiwgx81orxinp7ke6quab5zt6l5t9jgrhdm8aqq4m2v1b622hs64sk6vmu5m85xkm37zb9ijrh2w7nrvihvt3buxi4np1ocncdg7tfbx28hmyqrvenpvq5dnaxvi',
                mime: '7j25cygjn6ttxeicvaydjljhpxxw0bbl4cfziytohnyfjfihfj',
                extension: 'cgopfp5erow8cndq0fodl6unmx1ip70rnjhmduh0nw9s6ufgcd',
                size: -9,
                width: 331355,
                height: 542679,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: '3agu3wsylivoev0wzuub7tiiqpztb7eeqlx9ulfb1vt4r1b5kvta4nsawbq4o1zae73wyifyu0y4in4j3860euwhknttjznhh417ir0azakl5ny92sk64wbql70hmzyahjyb04xy5tw7bdy0d4ptzhmhunquv4f6wuxuglmatz9txnvrvybbtsavofp40n7r9j5hzequizml2im2y989cmlnz2wtv0s4os8o8jqhyfv1ff1a41g68kinblzot5b',
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
            .send({
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: 'h2nvr7tyu0ngzxvpwtdaukkochymae1kwb0f3mg3v62c09497jnzm6xcq8er6nrcbqh5hca0qus',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 487960,
                alt: 'oym8alyti6ac696wmg2l5xbe9r6zvf4uahrqt0h9l7wr2og9lrko0wxoesoja7csi6bn8xon7971k5hcaa1gnkjg1rav1mx5hccnlzkhb52zeq6jnry7yg4bwsp39kmwluo1o417ian939x4mfughldglzutszqqi2ez263qdskr4xvucxfu4u0i4qd4q0cu5b92ste30ebnzvfgbuma6lgzb3t9vkao7uwv1l52pbpry3sp8gtyaxs0ecasz8j',
                title: '15jrdb41dd5j5c60uuecwjinm0e2akgogq2e1ixdulkveohzmppnepkefp1ogdpv2dkg8h1axcgvr00jw0f49zh3ggb9sxptygk0lu1hzgq2tidqiwei69gvet8d2qgn98gixie8yq6w9rc8f3irpfj7wwotjn0ga9w5oq75e6j13yu77qzbqft5p9d357vb3biyiwyowb7lpxcvntdxk77yf5k5ujv39wkvu1stilvakwud5e01m9gjznb86wr',
                description: 'Cumque qui saepe fuga vero eum. Commodi id veritatis minus ut nesciunt animi corporis est reprehenderit. Suscipit quo quia quasi porro perspiciatis.',
                excerpt: 'Et nisi ratione. Delectus dolor ex quisquam officiis iure. Ipsum eveniet rerum modi est.',
                pathname: 'rm6drwrby4r0yqtm6qro85k63jdqn2gu2zx56s49rn97i59g8co8hu1fco3ng2cr4trjr9wl5zvayvleuuya2cc8p8dtg25zg3howopdgo3qodey2usqvenabtddbxv0p7jmdvdgwjloxuuh0ilvk8iv4l73y9yzob1njjfhegdjsqp4m0td3e3runcjwhcvmbbbu4nff5eiw94d0gxkgd4f65tm7jmuy94uq0ml6n42amyue7hamxrcbzze795ttewq1wojiep64c5sqad3reaxujrtg1lvjz4l372cu8eml6q3ew25comfkolp8a23fq87nb0l0fflc4c2smnwpz05jei9vg7cx0j40gz28waf3t2basl5bc1lrt33o0xbrjztdug2jgdstqfoiw9dzjlei9tctb5tlm723psf64sbjq48tdiisw1rf5l019tcddcqqcywkj0rmom70yvacg3p91ngxe57p9iqxfvukj8y0by42qeffc5lo9jkoc1099gsduej8rwz4wk8evok360dejkqh245cfsgo6eou6lr0vqncchxmgy53fjnxonrazmj9l8lmi282nncm3tqm6ktdx9qa84003kz6mnkzcay3za8184kb9pwrj03s3vnojhunou6h51dpxwt6rjsys0yiy5ws928ighewriob9jj0ijq776mxddezj42tjjmuszteptojjrcxhbchqo85g5a7juaoymaw9n8t45qtp5cd6pxjcr2k6v7d17rvh3mrb4kyx5h1jcmdobg2zg3cowatkfouzs0cbi9wsbiml57f0m5jv7z4p694hi629wb7vaaphmk63b7gklsetx524damnckne7ei35d1k4kh3qc0txokeunvcsvkw1k4kg9xh1g16kjhutioi9ca69wodkopp30dhd2l4sm3cx8ylmsqy1aeweiriixvy6etqjrx98o6dxwjetvc7000fuef134lrbfu7fdxa0n2hkqpcthw1ofofobs0tt0eaypsm4',
                filename: '8h3easpi98tpo80zfvh0yw39fvt7szcnybhrr7mtffywzewzjs1fhgv8u77mh6r14rwptnvrveroghumkk215wi05tg0dbki7hoso8cys4aebbvmtde85nsyhxg3haxqgejd5vpifo0oo67it1s7j78cxhrdt486zkjdcj1a99wqv5zli1cny4lstin8w6gg1rnncrag5m53jgkpb8r9z5hm6o0pseo2sfbro2ii8hx5jnq5v276g2zpqx41hb2',
                url: 'ntk5vvdxqp4o2xoqlcm5cfb9qbxppbxiklbw1y5sjxewagxvk8zwn12eygl44bmsm02nmargwwkolwmv0t7ugobxgqmcv91yzlb8hx67zmnpc359rs9e5kwbyunf0176u2a8bq1pjeed6t43f1ugj0860twpg8cbrul53a9yalak0vx486gt7ujlrswcihjen1k5i318v44jbm7mv0bmnswt6df3lnlai09cag12nkybknhv44fodtmvm07uc0gihj22mfqp4gwexhq4vti284bu7fk7lvjmk98or6n2muuuxx6ssjmpbecgey7yxj16k3xykvt1615bq09e5ln6o0d19zd0v1h3qrgho051mwrz36r9wif99pouvg7ansxxsxwppzjr84n358s9803wxpej0tn1300t4nyipzplb4102jivwngrle0mumqwtdqrreoyuticq21yj8uelosyeiewfht4neu1wczlfcdrjztquu8pssymenm6v4umegm2vm4yv4r150lmb08j3er3ptbdq216e5kuwy3rrzpkajwbi45kbdg3tco0r75udc8vxkklfqv348o1x5lmh8av7om8jtl8xv0jj4bjqu1q663u377k3mlykh4x4hi4mrity2p85f9pik4rz13tzdfx0ikdwzwcifxddvytk18fg7dz4p4j5xx72vnk7301jfwqsth9dq4qalczpr9hvsgpygvlp5q5bpmooqavd99d79lhgbei2huf143f6fioxud13oqg5ryzqkt184exbvjqn2ouo4nbelh5vq3muv7x17y2lggk69zfbdc42s2favxcuaak30iytvagc4im2ugvmvptnvl9uggvzrwvxtt97oygt2hn7plo4jvufxdpnhj877kkpfuu9t4j8uoevxobco5y3888k5bhhaqo8eb8k6fqakid73860sbqxpczdi38a0nkrgajxv6gylzbwewuduta85pmay1lj8x0ny35v8t86y6pwh2mjr3s55t9uwba',
                mime: 'rc4d56ir0yo71y13o39drplicyyzw5g68uaxjbjz4aueduf3gn',
                extension: 'pa8dze5q7naj36dxntwnqyof7ifo62jzlv6l1fidm3yj8tvs85',
                size: 9541367878,
                width: 200919,
                height: 605946,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: '540amplpnm9yaqgkgoxd7u8yy6yjp5zrshbo8tpo8g0sov02f9w3pjvg0nwhax1ro168l9wb605pwbg23i8o2rq44tcf5qquh2tdtckncwaelf3f5hwjpyrrqjvppa9b2h6s0e2diwd0kf07ewq6dk5e7bxdwf4sgp2hglsahbgqc92m11hq55sb08ihqmalulsmzvfb9was9a77c6dcazpouxq8v5jwpbulio90ykpwpe7xyeybmsnzljaaspk',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachments/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachments/paginate')
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

    test(`/REST:GET admin/attachment - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '5ff68520-9c76-4a32-a64e-4a7864989984'
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
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'dff52f59-450f-4535-8e8b-de43e056d279'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'dff52f59-450f-4535-8e8b-de43e056d279'));
    });

    test(`/REST:GET admin/attachment/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/e44cd086-b55a-42d0-99ff-45911c2c96f8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/attachment/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/dff52f59-450f-4535-8e8b-de43e056d279')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'dff52f59-450f-4535-8e8b-de43e056d279'));
    });

    test(`/REST:GET admin/attachments`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachments')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/attachment - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                
                id: '3b9da73e-5056-442f-92a2-cfa49955148f',
                commonId: '5ca0d8df-38b2-449d-9799-d37e92103fb9',
                langId: 'efadc1b5-ce9a-40d3-9a0b-c4cc943620d2',
                attachableModel: '93mbtdiue9caa2tjixj49y7bzsbh8kqrlw088bcxmu90hfj25war5287ky6g2jxl2c5bvlsofi0',
                attachableId: 'a503fd79-a595-4fea-9a2a-ffccf4c33ed8',
                familyId: '046f43da-8016-4de4-8d6c-bd0d8f92a85a',
                sort: 718310,
                alt: '9ovsm1fjbhc90vnwrc5x9b6bg1mmi4bau03x4h9q8dkrt8s2wqalqmaw3u55tp9rji99vijmkwmm595lbc7ve8kicqxuvz1wn3w6icjy6cb371ba376gm1wf2cbtn1w8tkwivrzoqk1eddfrddags9gxnpsr4lj1mixw3fbztx22ypml1hmvkorze1jh50egoev34fa9i5ihlcmr7d0705rx0gmjrmcfr5mi0pawzx2yk44qsgwbrhghz6ckgyi',
                title: 'z7ius7zb3cqktf5272z911mbqrh5hoqb8rwzqr0jhwq3h1sfm73hocvpuxs4nn0jb4oo90p3824kns4cdxqkuvks98z98i5e8cj89gfhftk6x4fqyqt5wzwsjz42h9crqcwhsnbsgdinckkh476phwg6k40nth97ehkjp8db6pei64rmzazxhnc7t68qih3ebd6rlrugab2efn1k8dltaxgtnnqcp4g3b2xvpi2pivj8mqq7kuyg41ixu674ig7',
                description: 'Quos accusamus ut aut consequatur autem labore voluptatem aspernatur delectus. Voluptate sed nam quia sapiente et dicta magni sit. Voluptatum omnis enim omnis. Quo provident ipsum culpa porro natus eum sunt. Consequatur aliquid velit quo.',
                excerpt: 'Et ut earum tenetur odio enim explicabo voluptas temporibus. Et nisi consequatur ea voluptatem. Provident voluptas quod quidem. Quasi dolor et maxime nihil quidem.',
                pathname: 'wv0soucmgtu0r7lgqod8amhvddttdrj792ok1gc9ipw46qre79twohnvjmvdp1l4959770ybgd3c53coebku0kw2jc0bgadiwb4t69wbqxuwibhsupwaa6yqduyuaojm3kv5tt24dfrhwuqb3rpcwxeobh95jnr76uvl9kaas31irtpnn8rxz2h6cffjft1o1410xjem8sxc05m31whnkppt56wsv4awtl1z54mqy2i5fpa45btnj3f3o31031cln7d1nmjilu1tz4ww4av27wtyl4oeb4rs1ko4qj2sqhnjurfwo3ep8aptxi53nlrmu2nj9g3ekkavg9lkwrec4fnsm82beuvb61wqc4jyn1rvu9ff4ekxlsphhqqlh82b0t2zvdu2au642q48f6vnoo2n7w1jwxuxvvjktjzs16s63ls85ntp8z5nc0log41apu8hfbygepeozurquhsotesps7k9cegxwydwu19xa4k4gtqa0nvjqitcn2o4445kme9htbfdw9k58sebv8wjfhwfl3s52msn0xeeto892734gmj4g30eifxl1ncwk6brl4dvlrirp4igd878fuve7nv14e6ta3yns4qkyrm3vlkaktmlltsa9umg6y6dx5v37hc4bhju0wr0czj6z7z9ne0xi4cbh8ws4ro0zqllpul3e04hkeskgp60pj64o28psr0aoy30ufzgnum9kqnywopkmm9ynq5pbvpat36428qnsy2280phpvyuo4dh5elkuw7xauhx23idfl41ispabbiqkkxsmd0kmgr3ckpcevvwhj8di5a5awv2rp8wt08ku13f1wy0y9dqlgwcleptpyvmbbc494y7jwvqxf1n0lahvgs3sbi0x1o0xk5ird0orppgyusqxnmljdz5j94g7pt20b141gerc0nvgr5tgead60t015ldydsg81q8s4lj5xpc4h1h7sg9nc8qgxhro5gp7cj0ikdg2oc9vda8k033c0dk78bxu50lnm1u0cvu',
                filename: 'rhs4tk1xzzmg4p08s9topkbjjiq8ev4xkkolyuef4ajiez9udza41jrgdsmkmi4gcgwb0keyhpilr67tsubov26yit307fsl2p5g8q42nzjmh6iq5y9fyiaiytyaj6jgu2qrnrva6gp7jvcyoji0como4sxe9z2q4x7zp4wrews1b96hrgds1p5y29as2q1kn1ibbavbaua4j8rpxm0uqae1imhzs0n1beimqp08citnkuabcxrxx9yisi4u8k1',
                url: 'sbwxnpk5o66cq8ylkrm3ayslny0fpb47gpiywe207hl5rllsyp2v5xnfcv4yi44pf9k3y2xtwmby6vnuotelj90whbki9j5xvcrv2z9p40ydzqixf34b5dimg5e7c11binagdyc51grjqppqmhqly10a9eqmczcxrjz79xsse21qusa9pqkvzqt5qqluubl661b2qpa9i8j0bql9a80crwbp4feg676j9jnuko33owv12ybfnxn93eqtaynk92cnshj12pub89tn58q7iyopwle1ggq4pp3j8d6jqbrrftinpwtbxfmgvw8wffu49bju2l9seevbdnfnsn3inrxfe6fln4951h4zx2pl7yy5axapl5x5muuhxh6xaxwrtun8a6rpaftvpbnv8tyh2uez877zhp8y120ex0sx1s74qymirvn3c09yuyvtvoio4jx3ppplswvfzyqrfv3v9jtjpi09m9txec6ve5xfbzru8v0dhbuw1cf76g47j2888mj9sgvw7mqxkqjy5swumg0a8biy0qadgr1zpkyebwblp0p6pfxykpcytd04ss1uw5eczpsgi8ilvcz2cvlnyopgp97bs3magjxgio3oay28u8mh2vin6586pvs659n8y492ec32rhn0pxb7q3j2aqhqyhiq6eqks0dwdvtqz1dzsyveu97051ao77vze951gx6dx9ugnlbcak9e62q82cxjzfa4kv5lu8c14x641a8geh3k8yix44cgfi96csr6tr56k1c9fs7qzxqfh9qb672paj9yzyuw3a5et61qfkkyhd4stfxjc2hprzqgdltpf21mec1lk16b6vj246t3qqcgghv1w1fl5eilszqwd8tcjp7orae269j0sglhc9bxoxyu2qklkrbx64z7f1d2bj3zdxrrql6o987cuqq8p1sbbuqv9bu19zkg7zr1bcmces8ea3xws3bay9dv1s9k7pt9be9q3zojs9hxpcuiklpxet0crmzoqi4vx2yh3gip3674',
                mime: 'tsv6k33y7l5acrw7rev8p3hw9yl5o2mtgp0t2a9492laxxh40t',
                extension: 'ymeunrn2hzb4w6v064dovd80dwdy7za345abyj0of5l0as98m0',
                size: 3273239063,
                width: 333054,
                height: 795527,
                libraryId: '4bc92691-8816-45ce-96f8-044a8240b31f',
                libraryFilename: 'l1p25ic41lu7h5xfygg8fu6o0r837vcm0bphosxmvvad4jd81ubj5n94tymixythg2jdpqkoidjryr9tanyf3xgjl0w41tyevj3rkstp2bq4ij47su7yfbo982bsgb6kvzb1e1cj91ubmtnidkyaoqu5nq3ird5qrgaz1vkaxk9xycjoj08jq4nmio2xxlydk3hbabpvzl13dxghvfo3swqs2ba93cutqdp0yayszvmsif7sqpwblioukjlmzz9',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                
                id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                attachableModel: 'r0myb8c5x9dh72xcu59hiubya6lyv6dhpdrkiji40j4he9sjld0kgcwpvkl9ynqrq02zmk4wj7b',
                attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                sort: 409249,
                alt: '4b20njlpdm3ss646oehihhfz1vu4n0uyiyt6v3x3wx51guo7v1nj7fiiab79940aibtc4tx40529jsvke5qg2kn3c9km3o9dp7wpxxr5pzs9x12tinw13989r0lhly95go1bfmxsenasj2tbg07mf154orexaf6ks2xuwgvaw32lv0z3dflyqe78929hcrqwltfwv0qbk7wui50k8znbfls7n2wewho38lir90m2m969r3c2v2dpnpwsfw41cbe',
                title: 'p6gc2s9x19ym4b2cgarqbriokwo55mfsz2wqt2n4al96hi74xa84z52diwb6sdn91e7vdbfy7jfgozumuup2ztt8g11hwgtx2pwpv2qmdwim0ddwuuklkh7s4iod2os9pclse0oraz34kou9ms64jw1ak8hsewkydo65wxdnn1gna0f8qrjz2b5mrahqrb82ilxh2p9391jgewvc34tt6766ph0o7oiblikmk1d6b7ghy0j7b2kgo5d0oej63iz',
                description: 'Omnis ipsum id quia rerum distinctio neque et placeat nemo. Nobis est ut nihil itaque aspernatur. Est rerum et aut vel dolorum eligendi hic eos.',
                excerpt: 'Dolorem numquam aut. Ex facilis ab nulla et alias recusandae beatae eveniet. Ad et ut veritatis perspiciatis vero doloribus excepturi velit.',
                pathname: 'kq3ov9ofm4rxo6e9z19e0kfsk7rytyo6u70dvv9k0dv8mfbrazlak491pv1ittjfta9b2vel4gsmig907xbxpscqlx6nqkgahpu6gwlfppmt2t8ko3u7n8b6wy4no1pqufx7lhfm5x75xjx7gzwyfskhcm4k3vjmd0q3efii0c3uockl1ew744gvh51kqkwn3r1o944ow9p44igzxch91rb9hf4g0eejl06hn2rq7h6gs6gg2rwp8mjs0py3gnjqf0vx19q886f42ib5hpp6xlzgkv7bs353lv8s3l1qimf21dvkdsrhkd05e5vfyz2wfii5ijac3fz1bpaqheh8rc8lr3rujjhpel7u3vgor23adt6dsq14e58zz3xkrwg8ti1hyla1vicqyugvsi1m3boz1ak1tibk404sl9ghfopjf8rmkt88wktvlnbbmkxnqqrc1xzm0bj0hmfa43l60bbmhazjxjnymkoaj1un7ovoo8o46q3woslw4oprl2kww0nur0omadne1q9zuheugorbg6hppjxtf8g95oufhgf27iyt13ck8ro1er5c5spwwgrcspvj5u1agmxsh128shy9ire9x2w56wxwxiyycod69tex2cfjaozg1op95z1erclco1ntzoc6l9zc1qmjnf4i0tl7uqcip3p7kx9442uihqdx4u12fq3z2bwbmpzp19yb8ygwu5xn4dnotars8avqvu24wxw3d4qzm58vnpr0gx1qck5f2hmoljcecenodie5kn3itf988vzlr8bcihdwfc95e7pcmg2dvursg009bwb7ukdzlnjqbw8f8zdjbrdq9rzrqjxxt6he5k8s9s7r23zspz1xf4wbjszttakwgyrcnop9a3cg9e06suxgjom05efcd6qmwt73a8grgzqlu3q4clk6iiijuwhpl5rkueq46dvsur20t41wk36ff35u0t24suk5wdxzhq70nn8lcj2402oy8xau6rffrtj3w64tshxlqysqd1hawsvs',
                filename: '3okkxp3rs7hcs3fs4jmjbef7rx266iomqgtjaz6dlypgci1r22ze9fobs2kal06qo2ef89otypr47dot2hk0er0v2kxtie3262n77aem7uai952okhsmsaf02664pryu78zp9l94l48ot0nns9nml4lejs4n334vgxqozyyrz5spcjr3j0qrko0zhzxkqgjh4a8e4xl4tovv0kafgvb21ltioavoaitcigspfrbjkwa8mxtuoa2f5fkmu8c8sde',
                url: 'f6w68ke618ahm2evvosicmyn08zf9d10gczz1fivgxdyb32zvg33unfgwb1nmulzu68cb69pb6y6ey1im4dpystg3tcmx81mbfwt92qxpkxx04mopsg4xgs5eutddrqj2l98hplv99brooo11kvd97vh9177j2ai3aduzy3b11qpmp7ovbepxzy8gsio9gko1ot3mea747jwf5o25nn37dydjitg3tj3ze5avk4rcp1h46mmifbkkvqwxmmmsew3hkzdhveqtami51wq9ek7n57twdmiimh0g6slh6df3u5fnr02ugc8gc8vyhuscwhugt9q5n40umhn1aysg270iqxv2uzyvm68wy1ba9flvveg98jkej6wc319gv9vin58v0eh6lfhoazr3vttac1zdljz30ig8an8vvws378vs9xxsprwy81wr6w1o8v5tyhfa3azhiiv8c08e2czvx6977tft0i3yiz78g5mkn2gx5vpcmr4ydxapk9ii9ygtbd0mv08et8rnxd8okm5y1dweb0ee6b29i6y4wxrfil9pzfn4i30bvpa9npfj4le1yxwidhtlkohyukl0wqxljev1gjfuotptrxkdf3oi2av17unul9u0f7rba7n1jgdh6jnn5wezeeiktwpj63d1sjsqri8jyrnocndt3ndkde5hv3nhjveqm6r2doiqw8mfnrcj973uqwxwps1sipzo24h595tedrcweqtx1bd252oyw7u3f8sxgnek6nfkfy36v4gdqk33inh7fakvm5whqqyu4wlz6eaub9aktfslaozptz04oe75kbs5c6wjpchz2ouxofw4ra4z5zsfcg1pqcbgwvsng8jy40l8dw955t34sjha7fqn2wwyxv8dn9ib8zvme2ru0fmxvbgjuv4hnocnazu4b138qvrqrqs0s7r64l5hzbi0uvjqhifyskp33a3fbf4mttoc1cnvy5j40557soavb2jxjz3j48tjf2bg85ssoiwxphx4mvnk55cr1ro',
                mime: '65xfsldip4oa1zklzageelqofsfdforvl2kfr4cm1bs8fp6nue',
                extension: 'u3i196ly75s2bgoza1489n8kh3pm0vrzx0avmmkrm862hxwq6g',
                size: 1549750511,
                width: 570730,
                height: 161812,
                libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                libraryFilename: 'iw3tk1yupjmtwm1dr81gdieeqtsyk478tll3m3zcqrapatnfnewnjefohgik6wn87oskq7t91g4p1uxvaozcymbvw7y5bq0c7aux8ft6ka13naodn74rz7girhxr3jp3i9mc5vcs75xxqb7t9mmycxc0n42meypg3huft3uhcbmyqyc8p36rbppds0b1dfib7nkrkmcja5tbdbg488pyvwb72z9ignrvmyhcwcqp6f3ox4xvo785txla20stx36',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'dff52f59-450f-4535-8e8b-de43e056d279'));
    });

    test(`/REST:DELETE admin/attachment/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/ac869547-b7c3-4aa1-9173-7c110a493681')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/dff52f59-450f-4535-8e8b-de43e056d279')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateAttachment - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                        id: '9fe14e10-92db-49e0-8872-e8f8e466dc39',
                        commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                        langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                        attachableModel: '89p2ebeypk1a5zy5aru4pize6rrvbdmt1aicyg8dbdp8wppo541p1jya428ej9optdxxei3llcf',
                        attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                        familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                        sort: 297255,
                        alt: '0mdkskhmrr2x2rhcy5n5jpou4iaovogj2n1v2lq4fyku5cm82goznh947w2g9tsfq31nwcvsmrzzh03uhgdrw92m9eaylza42rwz05bl8138id8ppkhgke3we4sle9qd0gfhb9hmxt9j7dmn98565v3a67o3zmk5db1ryvhz84qy4qhdey0iwhgmibkvpku2frlcc9ht2p9i54pb84gjzd5igg5zvbakwcf47lkcd5o3qlgw8igpuj6vn0s9ol6',
                        title: 'njcbqi9478f4nr3mr3mm1y1so0htk0upxcgy00doikx5nb84gzrdft4apdr75gxsml3734y37qoz5w0hh3aa1c01muie1lxndg7ayc7zl7r4425drxv2jgyxioa1vuoh2vzt44mo4hvtwuziegoael2e6rvcjvd772276qvo29dpnr4974bs0fc1vqkmnumecpzi4lxrjs2w88gdgtwspyb4chk440ijukc4udvq9ofa1zh7jyyrco0mm2xvf1c',
                        description: 'Odio dolorum quia. Ullam enim voluptatibus porro et deserunt accusantium. Molestias molestias incidunt doloremque laboriosam soluta tempora reiciendis iste consequatur. Nam quod commodi nostrum numquam dignissimos. Consequatur nesciunt quo excepturi quisquam. Repudiandae neque animi.',
                        excerpt: 'Quia accusantium accusamus commodi qui ipsum impedit sunt. Alias illum rerum dolorem facilis nihil aut et. Non dolores et maxime necessitatibus. Delectus enim voluptas et voluptatem et.',
                        pathname: 'iak8ahlq0kt9kx1mnvvopiczxin6jg9ox9vsmewm9afncm29d1kkm8g59x47rinmnz21wzd9l9nceabfaoml7bi9wq83m32q9gmqxo9ojvrps7d5x1rhgj5xbn1f7wakqr9aycotyjo63is4azcha53mkmyew1vt9q57t0r13nudoo32ujqaeytpunq7uidwl6rcufbzf9lavyqoxcxuc3i17ouw0ct5qn23zcwnqf73q914uoo5y9cr9d17y4fxoqeol1jgezplatwddd80avh846gd0bbnnlugjlm2pkomhbyrc5lb3jmg123i4ajwxfzdfodg7y5qhvmjk603bu5zsvqnyzrdffw1adief23zyhk8unwq9d0sf5dconzqf1ntwgz2mhm2ob7tb2p94yoo41buv2jn47uw6vs2tzvyf8ycvm9kqrmwyef9hw7915ust9sf3aaqtioaz6h43xvunsku4jicfttjxqijanvjufa037t8wkb2c0grogu5baxslr4by2gyyb3iu47byvzocnlfksp4t65hje69dohrex5whhbonnzh1qjyi5qh7nl6ar3ne0e5o53y9tkcd44ubprn3ojwltxccybcu8zan3jjxcfif4nh61vwiwkzuw5nrqlnwlm2jmd9wl5vpz9ruwcn6evfll5elloex6qx2v5ll2fmm6ybl746fsn3mq11h1fmldoa1ebwjo21nhd348tscxjf3254vj7eqdejncpc7x63w9lize15ecx98jf2bhp77kgk85u72x8459wbmoxtl26hz1ggipj2r3n53bm9qszl7k687t93i0f9vyzengu0qdoxrcq787fjvr1vpageil1g5fjjddd18q4ofg6890y1q1266uebc8kk053iouik0wcot87njasqao42mdsbfgdsi20o0sfmenm3tcge8b6p4kiqhno627nsqa54w2fpt5gkocywlow25ee9fkijgok326qarfq5gx7lno300wanwuk6qv3qehbx',
                        filename: 'q1rcljqxkikib4yb86zfzbz6rwmh3qytwgga09y561edi90deyqkskswri1282fnbk3gthxqrrpgngllw4e1way6n6luq83uibf5w63vchv33byyo3tbdiqo7i3e9vqx1a493ew399bzxjjg96eugw0hubcic5ja3l1tsxpslz16kjnre6gpysp6ua46kbbbyryho3jjdyyslrs8go8g2o9336ihw4lldz6k7r44giqt2vj1krpy3tlcz5sx8z7',
                        url: 'x3wl0tta3m3cqo0fsu6waw7ycng788qu44tw75l8dw3lzpxhujrohhe8ni47no5r7qlzk4auynq5u6lckjhvjb6cdyyu7ujp0xrsff0veu7gmd5if4cm2dm9athwjm74tv4n9hbummwlfrnld2vbr3pmqk5906yszu6zbxmbh8b97e3bbicr311xtl8ylzs5h5jlgu66nvvx6i6oo1eoboycddup77rxri1ud1k9p4taqitdh5o70v4h4xqfmprn54ohg892ki417pgti7a8ntxttltt9hiid8cbzy4621f7s3pp8esy7aukrgg2xox5dd0nkujpccymi1rnqdbcm20g0e4xkfo0swkymrfmwynrlzl8almphq61gs7lxsnaa17j60rlizn10ivd5i62883ewhsltquyct5f7u3s2aaktc8psmnfdasyay86xvqx2cvkujhhp7rajp9oxb7d1pwobbei826wcos44nosgimpxa61vwjiom13aiiyjduhbeqwd7xjdh0t2vqppf4zjzav4sq0ut43gn7qli668213rqc4uhlrk06f0zhd321tmnf52bq4egvefntr37mzkr997ecin6fo7agr9usyw78xobvnxygzd0n8c6oqw6qch119x0ob72z99ssyah07lhca9ympodjoz59lrx2q7d8iw76zubdhmnn7c4k8lfn9ebeg0zqlbhfgr1xdhioqa0cipqkn5l4n2nzomkg6o20tfy59a6ogzx7w6rlmvqhux2noan1r8shs8rle47ez40ngim3s0nj18ieufwe3rt2fqrbo9d90bzz96988ynxq33bdhl1pa62f3mthzajxho7mprx2d7qkw9y7q5vtmfntbr58nq352i02zuo1ttkjhd3h4wgh8at4bxq1pyyl0fyobik9f2dei2usaouuo59j535zue62avjbr49yxibueal189z9hqb40fahqgokzjux34dm6xpzgoar2dzgmxrrs5mcd96pcdeowmj9clvd',
                        mime: 'dddceskr2lk3j0ypum66vfvz4at993krq6jj0xw377tglgo7qa',
                        extension: '4p95mmrjsdc3dai3ik0w1464i9uforaie43vadiqxzema6q42b',
                        size: 7914348523,
                        width: 324460,
                        height: 735910,
                        libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                        libraryFilename: 'pjord0qk3ngo8zx9a3yv4zooajb14akvnuitd15xd2x4pmz2idgglmmir6w3x1pdzfi48pzum7qf0pexvaibcrwy9wpfjmhw6qgoj0bj8090gp6tnanb3m7b1ompnj9xtrhrfc4qtmtlxftqe0jdvhvwzfrgs931z5e1gny3r7t3c0q05l08oz59aaepkmtios88q5qptn3rpq7e50ss2l1dgtmyccowf2ibflgf9sj4bkd4tkkrk0qezw25snv',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachment).toHaveProperty('id', '9fe14e10-92db-49e0-8872-e8f8e466dc39');
            });
    });

    test(`/GraphQL adminPaginateAttachments`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            id: 'f905199b-c4cb-47ac-8669-c042c695fe53'
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
                            id: 'dff52f59-450f-4535-8e8b-de43e056d279'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachment.id).toStrictEqual('dff52f59-450f-4535-8e8b-de43e056d279');
            });
    });

    test(`/GraphQL adminFindAttachmentById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: '1ca3b24f-910c-44b3-a883-40e2fa9a7b0b'
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
                    id: 'dff52f59-450f-4535-8e8b-de43e056d279'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentById.id).toStrictEqual('dff52f59-450f-4535-8e8b-de43e056d279');
            });
    });

    test(`/GraphQL adminGetAttachments`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                        
                        id: '874e1dd8-0287-4a2a-92d1-eb92c0161b9a',
                        commonId: 'ea04e843-2a97-4d73-b278-57b99bcb2fe4',
                        langId: 'cf8f6b9b-faf6-436b-9f30-d96b4ea0838a',
                        attachableModel: '4m7h8dzxvhxu0te16f8lrk9vq0dimm9q3rcy0aka5r8oww89ef4w9myc46kg4qczb7yxk5xnfy1',
                        attachableId: '05b520c9-0296-4aa3-aec5-74efba3f6185',
                        familyId: '58429295-f9b8-4833-a25a-1318d83a61be',
                        sort: 738231,
                        alt: '96i4a3rze8oswj929rz5i4l9q0ujr93zr1m1ptjgbinnnmnauf85pufmv9zf6vnia109vaiquxabup2o1hgnfvsu4nq081zx9v37uf81m469wzz3m14iokk3sf09c7rykqwpna8t465iuz8wunrpggu05y1yby48zr7u6ub01alnsk0wetinxb5honnig463eypeiu7h390rv6snfevt5ej3abg1z6kyvuzj3vrvi2lnp0jee32uyjeogxvzv4j',
                        title: 'kcolkmf607hpflbl9ynwihx2ueug2u0fw5s4p1x0fnrveq14difo5agttb3g6vhsvhmp5tujnbbfcojknwn12og48znmm5qxzwwtxm8x8c63nncci5l17q9rb0om5wonawwi2om1ub8mmmdsfnh6eqfk01bdc530i2iz7hrm17vaqj9uuw7v546v463lsz09sh0n52ienk8x8z00zyva1usnndgz9jqqckskftyx7bda7pimbs7jqmv2205o7po',
                        description: 'Laudantium soluta aspernatur et sunt velit eum corporis et. Esse in voluptatum eligendi maiores atque molestias sit quasi. Praesentium minima sed necessitatibus dolores iste. Commodi dolorem tenetur amet repudiandae nemo qui excepturi.',
                        excerpt: 'Minus repellat quos repellat laudantium. Velit qui et tempora omnis aut deserunt nulla. Ex tempore repellendus ex sed iste reiciendis quaerat.',
                        pathname: '1rmt2q7bwt9gxlpbk0ia4g0t67ibjihyor19l5hmoyauba00n70j5k7puh4zijsjp85omo81otmadnzzmdom4evzuy85h8ikowacl942u5i27khdkbdczvrd2h6n3waomvnmhpw1y31jspora1rul7bix5l0qg8met6xlkqb5glhdwh2mdd3i31rx1fmg50ygvrruy1u9vtwzmx2u6hynwymehexwj1640el59sl2x66v9opouzxwjytvbbzjgtxai7tr3y0eaceuw5q3dat2ixtn1x0oavj4bko0ys8xie5rv9ob89gas7d5lb8wswmisolddne99cqo8ajhmfa20phh03kkv3kzq7cxs9gljovd41ggp6sakyy3qop14ybsm2lsyq2251alb512mw4re4xkliiwbz752kf61sw1qngbzlmbxdaq72mqmc51e4df8hcvu53vgyur13h8h4pr3kpxj4c6xb4e6y2c3pkfnhj0v6g0b1zje35bowfddpgjt1bs8dxnq1upbobfn0cqjz8cto8wobefhs5dojc8jxqnldk3z8aklgmcz1zghduhrjbtcjiwvfykrlzorwrzmair95y1eo7ie1cyqt3z1exdek8w2zgt71disxtphletr7gpmw01vmccequg9cqyswfvq32apcovo83yq6z6dmw6ak6dnodposm14u8fxdk81lj84sbbp14iwi3ojpbfa5kd3qcs40anmy6lcsebkpyzns11aae5y85scawzc98fi2u0t1vclmp98shtspdooi7udytwpyan5ncqtdi548n2x8t8nrctjkzfhxjc6fcbrk82cilsy0w5tz75btajafklmcot78rzltpjye3utrdx5gv81bac7ce7100ejcc58yj9q8v4q6e925ggbjvn563h1h4zyduno5p2g0u3hun1q296znb6bxw13mdzk2qisvq4bbvqging00e82rkcobvxgypstx71tr5i12ssjrnw2jelklas4a08i7iz2ch',
                        filename: 'm6qwfhdptnsp5fdg22djwvwdujw809mtymjslfuqkbay91irn4fom4uwz24v7ypuybj5ljsq70lnrg6kp2gni00yfsqrhe5tb5gmw71ajgjqgw1hdoqwhnxryo1et9wb2df3m1u2niul18cnkfkchx0vwuhgo9yqmsnxsmk0ltrnr9wcsun7kgps1xdvqch5aap5ah00ozmdc7huimzwxcdnxqoil0q3qtobhvlurfdplzz13ka84u8hy4mxehc',
                        url: 'hjx24jexf3wzh3rkpbzqoan23tn1sx56ds49jsnk66sn73pfh8o1h2v4f2rbpjsj2jykqo7a5hee77lwu2jf1etq536q3gn6nqtwdwsqfmaaxiqsbgy1dlz1k7qxjgzowd6zupwomcstchih230b3n08cszhqujddbmzf7sfjucutzrauk1qtuxftwws4cfnff5y8uo5l1mpgalrttox6qw7kpvis5bkyz82gtt9209twzhk9h4uig5bq85zq1ly0qdmqtyocf9ktbm1vco12kvfwzr5qyvmtle98pvodddehoj29pmn8kcswh2nvvgy497wkxqkjsrsocbix1sxcq0n3jfh48mnlorx3tb87ejnur9k4zfsw7b8v5vihlfpajzno9j2h527swms2lscqi8nx1hm1mf42r6svgkvi3nuv2753r3lqn50en325zx2lkq2nii3zvfludvf2p6oq4327fsmidpoin1y5qter1k6usejjvmh8nk0z1yr84f17f906azbh9zf0ktsnwkpqbyxnldd6i3t05exj9pnji73uu60gyxwqj7v31lmv06e1z09gvxr6dz323df7i97aenw8p696zdsxj92vsui2imxp1p867yln48i7a9x10xysjodb86posberg3fvx4iwhdi1yprg8gk3j1jlmqtjltrye9qwomvcjdy7s3jmmr2rai9ccoee18mip5ql7zu3t1s9ddcfkkbzpwfgr2gqvv6wiaueh406ycz972tr7x9rvz7qnhx3xc3lxws6ugcyqd91uvl2myjztl5pa56cpldo8u24rj1kq78zluqrnmsol7gooa90fh2y6eoua8olnahagebovvftp7rma5c9d1v48u1z6rprvyhmedu7nlpgkf6ort5f1vpn9746losxjmfwmh3s4wihb7wgw5eyuj7hxzq1qygkx16qqdsz5y86m897c5k8h79azs9ox22trio0pgo8xvmj2egolw9pinp7av8u368nix8l4pk4x8p',
                        mime: 't3pc6pxg10toc6csgg0609c55i9enzn9dlmgqzj2oqy7nnvo25',
                        extension: '9rki3jc1cfx1yw0gp0cqi29l4mdj1ib30fljbh8jgna6c91wr3',
                        size: 2100776560,
                        width: 297788,
                        height: 904281,
                        libraryId: 'a3f5e268-f63e-4e1b-92ae-2e5fc740c863',
                        libraryFilename: 'emy82hr4rkrjb2q12ipe2sqvjhobyztmu6wigscwfl1gua7vswvxvwhf5f1fd1bxhpvnrjwlnkf9anncqzcta1zxfx4zrdtyweluq6lvypwm06bwl5sdfuwecdbulbzdsx8u82ijjk9rhlb4q5luat2zc23apzzyjjkmjtrhv2yd19pctm44htxobtoun5icn4wdvvop482eggjksib0b4vjec6qk0b03hrq4smnms80qewwazjlw42mgmo300i',
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
                        
                        id: 'dff52f59-450f-4535-8e8b-de43e056d279',
                        commonId: 'af1677ff-76e4-404c-8753-6a31d61c523c',
                        langId: 'c5f9a89f-f9a1-40c2-ae9e-bd0b518e7f90',
                        attachableModel: '2zb2deujs2xqno059s9202qdduy9eaexb621rs5b696besqiuf3qnxse5edm7sjha50nkylrlg8',
                        attachableId: 'd41be0fd-10c0-419b-b336-af296de35253',
                        familyId: '95e2f804-334e-4c4c-97f4-654380b29d84',
                        sort: 688578,
                        alt: '6lgpx568lwdxbhwrjzk4qwqcmt5v94rf3s77m3oobrk3na7m0084321em13h1xc93x51ixrkxzytefg2orhbobw0pq1osn0mdjixmfutl7cafriq4wgifj9mrdk0rzvmqwdo7tsz5lt0juvqggdkqj41aph69ynfs4rkenxdknm3x9ugmdh831wmxoaxkgamnfq1gsbv5x2l3w07sf4bvx733thf6u65xavhy6sk8m3jkznaqf7u7dnqj775y6i',
                        title: 'k8cutyywrh3r6noac8q44gy9yxydo4xvwkz7kl2nzurhkrc4fdi8kkng6zxiy38re2bk1yzu28u3zhchis1kbrk3n3685rvy249sleyhv7fm2p5tcg5xztzmq3tnb5lvpnwa1j0tu7g0ava3lbd9r7rzm8sgoymph0pq43lr1lx82dvzxfj1p3kypkdww4slcjy8vxgycz9w7qpm0jhur52csbnlejr4g4ocuo0yr6i4o0e5y96r52fssu9f25j',
                        description: 'Cum iusto nobis autem et sit minus quos rerum quaerat. Ut quis corporis nobis. Non neque asperiores provident voluptates.',
                        excerpt: 'Aut ad molestias. Ad illo in magni esse necessitatibus et asperiores quis. Sint quas a repellendus saepe alias porro soluta. Et pariatur facilis id officia ducimus voluptas qui nostrum id. Voluptatibus nihil totam. Aut delectus maiores iste qui ipsa nesciunt sit perferendis.',
                        pathname: 'qgvz9k5u01c6lnz0oiq7dex1sjwr5t3sehhclpousqsbrd3bepmgcs4k7d5858pib5smngvah1rqw3enqv778tan6dgrl8b4378jjoez7uy3yey40smnxhxn26mk620wshqwa2hgqy64zou0w96rdhn6ha2sde891b4nsovjpglc9mj0w37pc4ha8cgfbqldyazrjqa72ebf4mjv0clpq3xhtlc5mv01t80uhs3bv034k3isq6v2bbtooam4bqlpord1rrnwal462z1qigaequetxmggicxd2l9qv5eqzzof887zggk0saw1tle87ubobqsw8mx9fboheq0hnn3km75tpwbjffquujn1vsjti3dj6h6cersw5vajzt6pifnz1r7afqcw1ra1oxpo0xh0w35xl194ztbztial8nqezi15uijwhs4kwbdn54q67vhhhmnl517chtyr44rh5yg1zockazdfy87wa14l9jdmu6pw6athbgpt0lo7js2po7r1dk42bqh4te9ithrfd8yrtetq7he2p1fp3m612istkdpnr9v90trbcaoxf4891231358vl3wijfujzq1hvo2mpcwc035weuk5dnliwq4vpj9jg6ty5ij1dvebyha3c9uraw28bp6n0slh084ek8ebnjwou95lq7zlulh8w31js06h3or8td1jvr3xqo3yp060o4dva2t2n5puskr19pf8za9wc9gvu6d386zcut7dt2xp1n1w954hxckjs585hte0c2pf8owlpps8z0y287aysqk31frsgh0buxy9l62l1enpbvatf6ekgrqb4tejfit9yf06mm9mi9ttdu0on0htvi5gagxth5qnmun9766eiiz89wbf6sh39ru1jsuwdj16t2qmh2kwudarx5qjf9hhwa8pfydrkjkogflmefppb818zm8cfczoqg8eeup4mzyd4omh9cpakcu7cr5g3siqyg4v341jr2862ga3oju5usyswri01ogawbhlj8eajx74',
                        filename: 'voiiwopjflnel7fouhzr44pczj18amrcy1i1v6qe6hmvsr3u5cgsyggvs180xloxym3gk56q1e4d14vcodkf6s8cksjto2wr5r6kkc9zu3mh51z6vbb6zuouddmd4bbhmoth4rmsnj91736jmhmnok8ytx3ppva9d9sceum1qbomvipu09v2q6krkko2tud0mp8c0ikegl85pssyxltmr5n4kaofz05n407beqz133nxbv7kblyc3sjei9jxdgt',
                        url: 'nf0io21cjdu00h85uywp9kt2ltynh24yf6klapc9q8n6k6vtb8f6ywxrb541pli0j9rs0bleeuiyq6do1lyeqoqcazrao2rbp0glkeooqfv4otteazeuwxsrk3cjnfzx5tc8iw5mo8ydm5x7m00zlfcdwn22c5oyfmib1haeb6fpkhp56ck893eikpr0edcmerctqlqoaiehcd3c1wq4kie1h1ddngyfd2dc5polmk0pmg0uuzvua75c1v18h9odfkudh75wcoelwcty6bmzznkmayult1ut6vmwh84edn9ne0n8x2dh9sf2cbcnc2txidcq3nk3f0cytmt4o32pug8i3q5olkfqxkhoixllxcikivmdjo89zvjad9h0jf5icwi4prisxj7dqmqce8zlqtyhfeo38d8662r9bbyw09zot160wnk9e1qcqlc0u84sa4q1j7nwqk39mpna4jym5b60d8s9tjswsp3vgpio98vdi2zvm0p5if0fz6397fhud89gi8uboz2brd3jvk1gz3o5siw37in2ty7ibxfal23i4jc0t1t7zdgqddp339udwyucs0z9h2my2zma441p7d7t6ptafgl7r8mm0xevuokvsvz5zflwmf85s541l8fyrsdg15b7x9s94gt0dme6kxs95002hgosbuxpxm6et5nh2m2gmpmdpuwr45rzohs5nwd5tkgc5c72nvmbvq34r0qap7mdcpbbq0gbrwl4ecb1ecy7qhgp4th0eyi20leeg4albpqus6ezm9ckrqbp5isozsr4b75f9qzqq8p1gscvqmyyk0ft2wea2pt8d8mm207s2s7azf1bqtq0qtpk5wwq5hab0im3z0q2dn5tgebiodcfl7ufchv40supbvicxe7tjntck65rirewhdre0malv9uxko0mv7ixhuf8g1ohn4574s5z1yqngf4bs9bbubnr5uuqior0otwnh9n0iqcypgwkq3pizya92mm019c1jigrhc2zl7tl1ehfu7ic',
                        mime: 's4a0zs89ofo809rvco0ii9mmh76m4qt0k64gysby7gzs1kv6gq',
                        extension: 'ukpsik61low4c6yq50fxlbj8nni4oc6plm9zw3bg0094o5n9l8',
                        size: 5208349684,
                        width: 247246,
                        height: 447455,
                        libraryId: 'fc9719cf-a509-4868-be8d-182b1d2ea520',
                        libraryFilename: '0aqna0ohda3656eczi87gynoryezahti3wam686nb87h84m4nh270nzu9xj8q298r7hfhlso9wngia1whd0qcn3b35ms2mv3gjjsa4lsepntmlvp64ogq8080sfbbcl4c0qxx89d3czgzvrhwvp5suek52tqme3dlz43g4lfflb9dbk3hhaoitqxapgno896bqf1gzv6mz2rhqlt5tosq6riya10de6nwatg4wexkww27pcas15yob1hx7pjvlk',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachment.id).toStrictEqual('dff52f59-450f-4535-8e8b-de43e056d279');
            });
    });

    test(`/GraphQL adminDeleteAttachmentById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: '339c1afd-978e-433a-8438-3584530d09d7'
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
                    id: 'dff52f59-450f-4535-8e8b-de43e056d279'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentById.id).toStrictEqual('dff52f59-450f-4535-8e8b-de43e056d279');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});