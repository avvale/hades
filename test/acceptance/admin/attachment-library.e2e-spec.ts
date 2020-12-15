import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentLibraryRepository } from '@hades/admin/attachment-library/domain/attachment-library.repository';
import { MockAttachmentLibraryRepository } from '@hades/admin/attachment-library/infrastructure/mock/mock-attachment-library.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('attachment-library', () =>
{
    let app: INestApplication;
    let repository: MockAttachmentLibraryRepository;

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
            .overrideProvider(IAttachmentLibraryRepository)
            .useClass(MockAttachmentLibraryRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAttachmentLibraryRepository>module.get<IAttachmentLibraryRepository>(IAttachmentLibraryRepository);

        await app.init();
    });

    test(`/REST:POST admin/attachment-library - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'foopzyvqe2i52nf8jb6uoiroa77wvhjc6kl4wk1tklsh3mqog45mh7gudtvpsrfusgw5vn906f53i1pjgrnc40wasi1y21kxe1075i3bijfjyxv4oeef669z507qomj904rke0jzoe138v2indhwevxjwin9g7te8c534lecvkkwuhz128e3is2vp2ljpasszw3264kh8tru5s7w8c9vv9yw3cqepy0084i8wgpe8ds5om8d65zelxc7ya8pxe7',
                pathname: '1x3dvdpjrq9xte77iriuz6vp1m4gqcst2vto5xu5sfuvzovxxwjucg5ehw6rmoy3va3175bt3wsbspav266wywft5qga0y9z3srocnq3iuldiynjt4iwo0pu7k0l17dj5go6ys20po8aasgdt11lqp45j4kiyrvn85tpsfyqos3gjq0p7pld34sw2c2ouijw2x6e20z6qsvsdkbphla5he9q8zoloy97e20jl9zhn9g5htflz4r03etto77qtwqzoq1fg3eevzxkbcs8jbc5rfyzl6a6hx02g3k9m5t4rj6c4b2zt7xd9y0d10qoqbwxx53scaqjo7v3npp7tqnnn6dv0ix8dz7u4uvbk3303161svspli5xwpv82nxmihy9e8xbx1zenxh05700uxcvmodq6so8c9t6lpbqgxkucld4j86yra1otgq507elpkn81fain4tho7h652lw6347ydrkv4rv6sgi19nqgpyxib1i8g7zkpu4lyzzsf94jg7ol2kbzwwp3gwj8qhrfz6mnq24ifi8zdghw7j671qv4nizmposnra9shesr989zr8g4ec5nvdloef8e2gi1fqoaeanejr7abx6lvlsge7uc277388ct1yegqad1rdbmrpxdqfeu5l2npku9a2n2m9zewz40k2znlxy73d6m865iglrgibszz1cf9idii3znsgdjp5nxvld6e3clptei0unxhv1yvrv7ud0ftuycooqwn58zyrxoth78x7qahc5ynui1jbad7uh9vgzgibgtu86h9cm6fumpc8nd0pi5f5m5re4eqqju3zkri2doa831ph1qn83r1ccczf856qguv915pi5jf1fag9dhc9tlj678ou3eww0fefr9o3ykhu15q2y6l8e05rnoydo31h2fhojj7lb8y1q1pjjq7jqmacay2hnbktzv8qb3i11e1hbbx8xoj40njxetwciqse509enr0z4yslaxmfq2z4l097zflzgyxid5uonv5dq4znhari8',
                filename: 'bifx24f3fj3331y8axc6i1vs27n64lynuv5mp5pwz0lwo4yez6cp6ed9bydueqe7yemztf94gxgf0dam7k6ilyz6c8kvt5674aod5iocnhbz5cfr8zk3dpuf4zkdmm3bcomxgdxwmnqqngatry6ek17mdxnsu32dldrf5zthy8qgvuhe7s5uqc5ha0hwbohrxvr7yexilb17dw5d47hzi16zrd8uebwo3ko5pujxrvav2khriqcwydii9ilcy3q',
                url: 'xqpjahxdzy76wmeuppegdvosxy224fnrqvi3mssbnwun1g5b6tou6mhe2xn0zsr0yjrorq8z02e9ap1c7pvfh3y0apim0zq6uza4p6f83tgdpitailozk78qbj7dknj3tvskrladu56zbdheov4bm6655vmsbjsrjl8jd1gk8b0pq7zy0vzbd8eotu7tw1yrfqta4338tt7pp8hj3c9aefbk7nvndocrbpxvt7dxpqw17lagpjzjjh1it1j99ykgoyqfuyky8ypb6menkq5upkco640js2rp4qrgil9zhcpl4ad14v2c4u62whk54o6upwela5jv8parwit2x88tiqor8n82jhtdnvyjco23m6ld27bj56x90zsx7jxnbwkmaadgnkmu5qzkbubznaifasperhx91eh8se24y4swcyx8wrg41t2ho2yby767qzb51fxg4zktkqler7p1oje1e30fi3z80rkoo4vbz7tuvsyqsj5mrkv675hmjcuohkdbq70v0nhmn3rgzz4gb3r8bosq8tavevqdrviwh6kcx8c6vb191crmkj80vzbhylyc3pe9474csfnbjqlousuqmue1g7ih5zqi4rmjvyy8d6hjpyfneo95vdyxqanuvcz9dp7abg4j5234944n6xwkhu4afnw9upgnfuqu5fuk1iaibxje6v9kwlxa8c3zkdoqqvxpl4sgw325yb3fxk4o6g1e4g0d4aqb8smzgqubba2w2ko0z3yd71mx6rg0gu9ebkbl0o57m4kibwlincfuxogwm7gspk6pvsu4pgyj1isjj8cemsx0o7xahwtaizrqbty8tuqymd2i3l6g5z960ve2o7o4s6hbffmyqgli8vdc2t7x4wo0d1rslp9b0n21frgb38mg7f5d5h6kloek226wys5nycc8r5i6ctfjzi3o4m4bz68b717vb5tsakz1lfqtzys0pn4oka0qyiyvo0p76bq5bdtfg7bu3ejb2qf8dnd1qqk3xc05285w7mfp',
                mime: 'gst4u5scc2ir5kjy086pf5ktwescbf39yuqvxsdm7tslgpaqk6',
                extension: 'ljfy8v31guesybpgepqpjtp9qw75drrbvyzz0d59lmvhqx20ax',
                size: 6442003570,
                width: 197733,
                height: 570850,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                
                name: 'kwhge24yscnyy1qqayw1ehatr2ksds0uiplylm0h1gpzpic8s6n5cuxhrbpustccoxx03nyawipx2ijqiqhwzvaeslhc8uunluk2n1b8ed01feeisnim92l32g9b4jde0ql1l7stiwsnqsxnam2r8r56pijllvdl8786ty7afnrhb08rms3d79j032ilr6nspzf92achkxjxjfk8iak3rnum8ipxjq4fk0bm8tth9vbc187r5sql5n3xvxamrok',
                pathname: '5hmpwsacb7hwa7k3borpe5s139hnkeie2k1t37wv57s9cd7h8tu3xny5i2whnpvvw9qvhes5yefhf0q1vvt4lvfqu2ddq117hici3wxbbwychkguvdgngfeax2ay2305km0fjbuv6oywa9cmugbofcrtqn44fxdbzukrqxe1afkaise24kf1wg3c7x64uimnthnzfqic8t3tkenlqi0xyclj1d30s4co780m82ea7ugen9x2fwqf6352f6sd68bj5zkanjla1rktienxium008yxmuadf958s655gma75oal7ogvaoc6sci3xp546wjgj5ahfq2grbopptbo5kil2ozex8dx8ezuyhuz3kz0h4fopq56cj1zt47c60otqa3pnulr8a59g8fi3de8efyqgctd4879a9fc21x2pnoxm7to3846arg846fmpk5md0erkbsj9t5uos8rdabz1hg20o0mcdh1e1nc25m7ve06qc8nub6197dmviicatpohhvk7h445ycpzlu8aed3cpctr14f0jeve5jk1bcmlckn3ipqfznzf8php6rl7xr7bjkk83lhgej9c6i32upfrmbw0ofipflt0e3bk2bdip24ib3tv6n31u5kgfexdfe4cyj1hicj14kk20jbg28s92ewpfhe6hrsmorubs4oq70i06r5yurt592494ygxqvxkytnem0qr6h9r3uwz0bb6u6opgc7jzhbex7ooht58m3nrg832iu7e0c31rq6isyfz2zbnl4rlfdrwwkylssd4x304bbriypahhpbnbhkom1m3yx33phlnxplcpqrr8o6rkgyn4w947llny8mhjyjibzuomcmbn0cw9y2vakyiywwr48gqav72libtqc0r3oyaj8luym443expwnlbggu1ffj2dk76hkj3t838m236481z6k4hb97klgo1vudzui3bwrv7f42uqr0s1pxfcpmdekce5cve79issb98myygmfmewc3dyds4cw1ydlhm4v5wo7q',
                filename: 'r9oz31e98brz9ce7kghmmm3ftpmh9wjgke6akecpdizy3ou0rtux9lozaqwn49xpa2be4c4i3nztz2si6n5qhsxvzuese9kyc3i6q1k3augoksh17vznvfn5kzt9wewhulsck0lft51lgucp6j275acsu1li7stjgd9yuthkbdye7khlcsm9y1hxbgacy8zp8twik8v8tghll35gzv3hynqcdhlp87rv105cjogth64is2342oh75xov6zh98e7',
                url: 'nhr9lbscsqew9rodgujlf25jvzvyig4qkv05gg5c77ik4wmh8vk4931ypd0eln6a8alswyts6dqcffamrm6uct742rq5zvonlyj543uf4fig4vuvlh25wrsm3guhce4kcjsd6t41zn6ork9pqdpp82ke03ld8y6ouy8oyrnrbzzqp920w5y12pvbpo1im9qtzccphqsscg4zxjfbjbvb716yeecojjzpzobgwzrhyded8dnddwhro5z3rdenq8n4okwfgtdy429c5vfv5kwppqosycydp6xqllz8r95v1wl878osnv6w2s47y2fhd4bypn8ekbe2jslp883a4q15no8ia4h64gra22djno794lb7e0gxskxxhr8p9zki8whfgostgdbtejv1emimqomwjo8s0a86f4u1itw3512yt7an6cqpy53a47g4svvtibw2lav56271ktwc2v494zlkfws52e2em49alhjfic8u2jq3crp2pomtn6ya0yk1ed3wf3ij1q6lk6w6636fwl8y2f62d1ltmade6o3f637zxiji8z3nckquif4icqln6u5sa8gopgh05thtz7vob7yyq1y5xjazzo3fjlcoujx18mysjngrexqamyoe3jpi2eqpsdk5nb4v1vqom5n5fj9e0jstkhkxl8hb7vopnbiecw1evxebmwwexgc06tmnk3jnasmd0x9bfgnmygk8vt9rvr3rtvgbdxwidjy19lecnh0qtdzwhk9mu0udvl8347htjub1xl30j9ud0rfm7ibyicyyp316vicv7ek0ha7dez0iikq9a2imknljv9zbuf2xcp1edet96swrykfy62faf0wjukschtdgk7u6ots7reu88o0dop3vrx88wgiq12i7swa70v25s6vustq24b5cu4v0izopejuiif635li6z4x2fwq8wjd82yqp8m0wpmgmbi70skqnf7peffc1ehalufscu6tf6pdye6gi2xhlqtgl1b5v5mg77yeqaqc16mhu',
                mime: 'loscrzaq6zchmtultoaeey2opf53ok92pysfotj6qf33i30hay',
                extension: 'd2ybxueylr0x7f31gercvitfm2qlx3asubazm3m5crypo6aj0w',
                size: 6850130913,
                width: 842685,
                height: 638499,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryPathname property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'dca69853-dad5-4100-8128-044596042508',
                name: 'hxsvv4fkxoad3ggkw6lshk6i13dn6tmy87e3xl71gvg92bs02v1a230pxk68ggi7tr6ern1pv0h72fqxc063h6zc6rwytda7mox1qsfv8brzepsr4l9ivv9dcvnl6a46pwmzswnsfzdz6bpxkx4gps4oxtier3pyw1reigg18ou5f59421kcwd0lwf0evybf783l2kuvxso8hkqd880lrdxppzw6dqr056t0371mledci7cvpuxxynre1n5bvur',
                pathname: null,
                filename: '37ixd05387097ccqnnhpng7lqyju0s5xzeqjwykypxexl5252cdzrge8d4hkcnk470qvqsq9tth5enaj82fcp5l8h7u5ezdjb4b3rkoi6hwrm11pnupanunnxuvv27vq3lrn9jehmzexde2xgody7f8qqf0s8q8a31w36beihhxiyobu0lycg9h2f3vzjeemsmc9bxf7i1qrbgo9ym6q0c4i7mff7xem1vgj3jivlxllo3bd2lxd4vszxwy9e3y',
                url: 'ruaxxboqf9x4nukgszvbmrv7gpdq6w8uyrlweu2mmtwhojlro5ioin4cd1ug69iaf0jb2plnb7lazv325r8nkcvzkml3o8kpee6hvnc5cpok5899yf91jshur1h2s8gnxt5v2xznj3vilullx2ijttv5wanycrf5bokxp87pnmb9tcilv4kesesaeecycxn7546bcl5ld9xgnhqtfua8mvbiivqztce2f6x6uzyp0jypj6fg6v5836y0ai669o8jwes5zsytbeh6zek41evv5cnzsap3eko7362kr1toaemo6eea2nh17mqr5kkspp0dtaqplaf7mkgu4hdk0cg3xbjd74bj6sdmq8dpr3kszfjau4zl5is990hm3qxwu306tdsnc8eyi6lpaa5lql1zvsieui1eqm8yffj85lbgqbojniryma0d99at689kwweso5e3zo14z0c7wudyfcqcqhlfbgs314ee16819tbjh0pkcaxqfqxppzrwczyyyka1lfnu0pc2284goqgmz0qnimnq2bqk3obbnhssj7vcrhji6i0symqh0lmbu8wilwlsjk7n332f2yc8t2m4vg5qk9755m1dr6syq5tbanj46j0bfnrw6oaemb2rbdx3sl4veyxjhslg1xa1r4v655ypg6v760zzuhfqmfqzwmnpli8sncfavf69fewcmhluc7pb4y6ynmhbyh0u9vkekxbzkssusrku16pdkudj22mdxnpgbry510atzwqavluf9uio1dc4uawadr1uxzdlpzss5d4szt8imbgdeiqx9weiu7dyi88u4ayy93zbpo7q55mnxd5sxiil8f18eb9biye9v86vtlomo5ep14e3554ssywbl12639xwl29bdh2gzbtk050vmnxcqsyjcmq3s14h19n9m67h5273gthd29dhhvdeybwgpvzy7ttfgo0baj4gzu47i0neiozax3r7qmy7xr03j60wl4lsnhiinr4tj6hqj9sktruj3zcp84lofods',
                mime: '651n5cbw5ki0ohgp24tg6hwcakgov078fczv0m65m5q4frduwy',
                extension: 'yquxu5wiu8lh92y4a90fn579ucbhg3httixskxsus94p3ylb5g',
                size: 6439045470,
                width: 303491,
                height: 926526,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryPathname must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryPathname property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'dca69853-dad5-4100-8128-044596042508',
                name: 'fu6wk24b3v39nviz1wxvqanpc7e9uvw06gqkld8ck5zamy8n4g27f1qlnf1qp6ozsl4msvyefi71p3bw3nvz227cal898rci53ssdqjpobeimwewd797tvd42qbek13cqodwx9p2vhwsr60wipn1kp1wb76t2xc6io0lbij7bvrudvfkoycb6swrfnwpxqv3n9tp8c23ydwoa9230iogxbpf9pz0u9wfl5qylq1k67re1lhnynp6wtmc9n8k4bv',
                
                filename: 'afzsg16cjqy6k90alnuc0ti51byuwryg8g3xnbp2nwntc6onklifztsj4np07oywxy2ljl17ok0vuw0c1sg1d6sncto9axewb10hcbz7utcpifmhuqxz6vsvpq98uojbj100q57mj3r2httsi67zx40stu05yyy8i07x219oi7d19kuvv6hluhxnxdw9ge6nttves77e6um128ntjb7x79zeor82rgcgx0xfiydwgsuvtwfxh5bwhghfye85i7f',
                url: '4tenr4h8pw7yofr1wr2vw0u3gjrepd12jk21c4c0hl1hygow95jjgoczyslgaxh4nz6y5wp20cxyr19h4wmxdzg1kawgx03b7tf45d505rlfha7vr4c6enh9ge3obwcvfjxr3nwc576pbg08npy6vkdw8v1h3jh49mw4z1fzftna804w0he8cdvm9t6vc7tcucd5r9i2o6qmg80u3yiu9xq8huwktwuz29lv464u643efj4tdumqejqbrcxbxyir39svhogkpcajquu02g516z8keseny1t0u7ls3d51b2bvpvo5tz90dv774y2pmxd3g3v5tixxhmzih423d86wlzc72vbacaegzq4a8vezqxf4yz6nt9w0yf3r3zo5by851rfeigk9td2vx29b608qahzvplbepv9kf37t69qbsamylliz7hcux89hbye4d2xlcsak3kkdutevopyqakufhzeio9t8kskggrr5vnldapeep86uq8m9f3rukyw5zkx34auq0sjjs9hwzo7t67avqlym6e0tz7aa36wiy0lwgpkhw9v9vz0qxh8ga8ph8qkskmku5domqvz0o4zijs8e554w2w9wo4mizg65oklwkew0oqenbu2cb50jlgzicr246nhrhf2smjwd8kbij3adqzq9uedxo82f0s4hmuc2z6fzpz2ssp7vkly0ss1y8acb4mx2h8842ta9m9zcdzyhvh8fiqom4ejofboey0d0eis86yba6reew4zbzkmpp4icoynj8yqsotm7wpe8vi9o57147d0svq1qg5opsfiwiqaauavyf2h6cy1n8yzkm7517vdc2lv21juoeifaalkwdaz2h425s8tivrl7omkr2wephlen8nr15tp5yz12p4g386w6kz4pia2llycyqcnbvo4lwmykd5zhgcoa5v3t6odwebs06x8kq6zekrom5dwdmjrqwr8dg22qgftpxy0xg41uplhg91874gfp9l6va4ighk4pjyi51myyi99zu7hs',
                mime: 'yvufrlfisdrdtk9wpjs2loba3xfx37909xfbfg11yr5o1gvfhg',
                extension: '387grk8imhrt2qb0ei571h4ue01eq4zyhdrik24bjled99zg24',
                size: 6463152597,
                width: 642890,
                height: 407875,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryPathname must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryFilename property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'dca69853-dad5-4100-8128-044596042508',
                name: '0wvxefb6i4j3pp07px7y4sx9l5kyekd7l5t1ymltsd07a9eo427zt4g5rlur0g8dgcf2bnkzva2qyvg71es42eb32pe37ofs72gsdgyuwwam6gd996hzc0dcosytlgyzllj08t8jn5t1ihlde4lzpl97gttdiglf5v6cqssqysubiw48lf1kpjap6g5z2cny47s6w3qjijfhfa80t1x5j6pobx7tbwmjfaz4ha5mrxwivar5qamh0c4ah52u7pg',
                pathname: 'tyd4ui2smpdgzfqfa05opoajyd1i2pgysshp3a4i2ljb7ptu0vs5r9cf2e2d4ip59mzdfuxzmckp7k2gesaru9gduroatgqdq2c3ghwh9wgla2fe8y469dsrisf6e3jvvmvl61ap2kvplfwl0hznqdn5lhz2iowug3l43agfc8uwep2tgi4jxnn1p6ysn6bchujuae91fosjrx6843jas1ihphfably4pz4beky7hdch1kx6aawrq08h0k81g6gga2jt5di5ncd4yx3xfk63l7kg9yqnc08cm8mjj04gfex00y1bmrog1zfd52bityux12egnuzdo8wy9kzw3aju72yysxuc4vkwka2dl78e1ip0ad9v1k0ft8b8ah0e3q0cvgavu0xwysqkcgiu2fxh08d06i7rxb5ey1robynfzt06iq1z3rxq6f2syh3xz9j4obbl7xv3hukewcsvirtqy0g7s3b4knmcd8nk14udj976ak2i4jxymrv87vzf0fk46epqp9udfe1rggs8kl0ku8hz624xzzy3cckt930pngzo96vug49u5e7adju07d8n15xn9vmnxtt3vagyzph9qo6gzvdyt8139o3ii0aqmdwx32asxq7u4cfscckoowgur2eg9ps71218qk9lf9b1e6ezj8brei7edv0lnbcbqzudaigqitkcl6wqh452sfi1nwspqhtietjdy20872wz0vyxrpyp216burszo7i683i6gg2h50cwdhjfs04ppup9d8xa240og5wvn0dc1gn5p7gc4jv3ryjxwko9fnkivpam9lzc8fugue14ldssjxrhn116j0wpsmi7sgpr3i72fe0s0vd6tldxiv1si1jky1s65l8vuhttcwo7xdjmmdftqg7hkz6anmqbu9i9q4xzsxpufohsijt3t0kl7qvh2sm672bp9h4wwcolkvkxcd9ndu2f560zve5diuiei5ld8bkdkee1731693m5d9004hqb14ugyhqks3k2rlb9wybz',
                filename: null,
                url: 'sa7dbzudg74bkywy3viwk02v2n4s1ahxq5se94qxvln6ta9ljs75wkyc89eia5zew8op02ju70v3emsrqsvtirbu8cz0n8fmgw68clw1nswmalobi1qbj09osj3hicafqenj814yo1ayoqb9qfd7t8m8vi3lto9vpyfk8eu7n9owsnpbfail3af9jeyomuekp3gfpm63gmfac4hnhp2xyu74e38yb1l12nbsrm3ljjvxrfnrw5dowgskfugnx424te6nybzy81pfbshebefmudyifbd5hdynzkb33hm2za5rzlrf2vjqj1x5onz8jm17j4bi7i4elkninnxlft1mtyv6t09vidqudkbjpx5znk413y79rxn1fyo5tnjr7sxdlcknexxorrcjvnioagd91124ifkorvumrrhwvwru9guwcnaqobas31hwanu4e9qwzr399y6i1769xwz0dvr2j2ljyml7zwxabas7b6pct3qg0ws5ec5l3eplu90da37jylxgffyrzv3kl4wl8eyq8jp127k4s7savfa4bpgfjrx9vlnqrdary4l03u6xcnuv2rtv6kamadohmo7o8rp8jbxu00jngafnqrxv3tykofamn6ors3qyi1ga6z27zlqjjy64zlf9gk2s1tpyiyl68wp56cbw736212m8mxztlbfstuq0daxv9ngyio825zzx0yufna9aqzh8jut9f4d38l2mh75b5i6nwjln2lvmhc43iwz06f6nl2bsj3spvaw8c74qhir523c5hh459n3zcuzxjszk7e2ly52j7w4ow369opabcuovm12of6xvvoq04idrk4hahnfneyl01tn78f17u2n1lhzmefefs61l46ypxfclm7hnf50hvkncxkr0b2m8of58t1fe9mw3kwtb18eiim7w6b7nivlcjofov2y64yd8rllszxxcaqfb2yee7mv1qdorfuritbt28ppjfh3d9m1yxi3vrzre8i0u3lm3wx8tsqez48mchyqiyraa',
                mime: '61ka3go1zqlkyxqcl9dwe5uh2qrno02w8o21mcna3dryfau3al',
                extension: 'z89io3jhj4j05eezoee4r05dyy2t3fekpbh365prtoccwd2afh',
                size: 1881877957,
                width: 818080,
                height: 793439,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryFilename property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'dca69853-dad5-4100-8128-044596042508',
                name: '19lkhr2tpbnwa90s90b8c9j3uhwn2rj3s1n0iphccwsbxac2bthf3gvgf7ni3ylmlgo3f90kyflm8oqb084pz7qcncr5vsm7t5t2gq22b2cwn57a04yqngsrgbgxzc0crlf5f7zis2opm6m0vebvmx2jfwj543fkiufd71a4ofa5t4row5y24uh7m4ylke9e2i84x5oc88qqdndq6454yeeyjt4tczs1ii4i9xbjpr9cbvmoi051gsalevbztp0',
                pathname: '4ddssinsbwcl0u7cipx30p66xxz5c2rznqbhz587cusrb849pkh1djjnwizf9yikpt8n1ly7g6m0h1uno5m8ohwqwhbckp94pc2cduimef9riw5yp62wdhqsfqqtlu6im7x94b6fdkb0tioxvqcp10hxifme7z3hkydhd7uwont77bvys33sr4fpls6ejd07iizh2x2rrb12l6ny2ziqbrz0ob7mj9io4lemlcos3m7q8r36od80tke5i0mgeq66r37lzsrtj6halsdufahvxz46cbxs1xu7pwbe4c8lxxg5h7kpoat892q69r85ldzzpe6ry854qp26d0ilr3bjhkhesecdr3056czcbysqegzyz74rzkde7k1yez60k4ocxfvgehdoft6xqo7j85w94yxdra7o2pq2yzkskv36ryanys993ea1tca9uguxgha1wdxg1u3ektmwmcdv9epxjqm8ebcnfap8ln66el7btp76fzn0vf2c3y5yce8lxkdf319q3ucdv7yhygl6p2oxdaab6bo2xug4px9r4tro06wgxlqoogi4xyjlqmb35dxbdrs3d43pmiuneuzrhg3e8h80mlf29eturgalpyxdjo0pgqikonnlb0qbk6fdrzi4zaz4e1pcbno8cq3bkw933rc9ft0waapnuwe8lue1mtu5hasow4v4ap6v1k8qdf6godyfs6wlmhc8kp8e9gndmd2enhwt9sxk5zh5t7kfbs5kz394gmf196da2cvdi39pwskjysh0o4r6k0kbuaqjqnds6cz2uaob7qdsexvnk2cngpv4tzu1xpnhgiodc4pzqkp31wzhv8svrzukqmethlulv57zezqzyh5f4ofgff927sn26342l3xqcvxhg9i58dohtfn12oirfwfv2j28dezl9rf3kx1sle1793b6e56v8imuznl5k9qndxm5rmxi1sjaw6whbm3qo4lf58f6s7oms7gfg753irim01ai04e87oikd90wc0clovsh0vrg',
                
                url: 'n0hitg2ub93yjdv3zn9jkven51b2oj48cv2arwh6kmkrovsbehre8g58zcg4mjh8lltpj8rum3z170lgnufd22bgfpf4yknf291pumnrppddt12136uy2jfa99ha4mt9ib8955cjq8ucm595lckccusgtf3ly7bn9saizzk0n5grmduurtp9j8r5xo8i90tqu5w0sjh4f9s7mj6q3kkl5llmoh859a6k56ydk5m0id35wpqoeybxkxs4wcdnxokxllnyb4o8szwiq1hicl0jenct9s595tqg7ztqpxr19aew42uwnyyu32gf53qpgq4bpngfl89uxpqgj3q57kme294unwx25m92il74eap9t7peks4lr1774wlvl3zac7pene475tp8q29m0dmitcev01grje1b5vkg04ck78fp1pgqcjjqqm9qhgxcydh1pwapn4gj70oa1p8v0jqj6tfxvw1u0lknxcormq4ic33x3a99r4eaf74dos5ibji3ydpgdvv1g7mxr3menwpq7ddvoydn12q605he8yylu0537t7g2nnrt9svyfeoen8rl1qktwq7rwj67b6inrp97yww0mmlpwgpaola51owv4qylycnr5u3n9vgw4hy7uuhxbuhwv1k34o10i8uzw8dqdginu15udjio58mgwshor3d123d01zkpt17g5n35eiv3x8dp64wkzz19brwhuzu8lzfg15eq1cqa3k1rnxfwaukfm8x6htmwfz3d4u9q5xqleptyz3alf3le2bpxd7bw412pcck10szm0k8r4l6pz23yh9lduavlcqq2n3atenj7nb0iirbhnfwl9365w9nux7gcz8n96ry5anit3bbg3ztur6onp85olblputpbdumxvlzbz52mdk6m2fa1ay9e2yo9o4nhsj3uayjdkox8smm7n6yo9rc6e7po0gbkgcn7g7y6gxuame6ayaa1elx4evza5p7cw81705a6low0wbhkc1welvyw03cg2fanzqnzo1v',
                mime: 'seetqhlcelxxymwnok5yn7yjcewdm5b7nerlq0zm2ef9b1bp53',
                extension: 'bnc2mr88er2snaj2hpy933k16q6wsl9i24xzrjjdthrusn2hvd',
                size: 2676019235,
                width: 189638,
                height: 698402,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryUrl property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'dca69853-dad5-4100-8128-044596042508',
                name: 'vk8vqb6g0jpma3r4snrno9mqf0rjozv63nn3yjz9ydma6bl3im5ao0blk826mvbrbvze81u2183dr3ae6u10ycjokd3f349xu2jfga6yqqtdjgx1078mtobs8jt2u7qaczdv26vflinken6u1j7t8ldtiyyfpqmdy1hlhgd0qmywdlyp4rbtqy4kl7n49ayqtmyvcxarjg4yztzadqedesqp37un6sow0tv2hq93g3xl1oywqsb3uzvwtrkob9v',
                pathname: 'c5qeboq5sgdi0pl39121f3hzjww4s56xgsusfs1lwjkvhsbse5bit5vhlj3oikhdsa2xi5o143eeocya9k87w8rt1dprvsq2rv8a1y8915ubi2mxr4fkbei19zxstiqkfqyvm9sq95xj1ker5p06nuw27bszkpc3gt60feldac7eoh2oxinnf55vvm808dbp3gcly30pcqt0zjt9xmp2pgdw0wuxsbosshk5wc64wl9vyl6gknz3hzkes0nkxl49m4tkjhwg0n889sj0ygqpyxyohjf4bca3sxvjz4w2e2zmpmcr0xrasbbm5rx4bvb6hqga3n7vjm532615ur3cf126kwh0b5mbj6zj6ky2rn4samklp66qr8ab13ci36btov5rvg99zf9oey37xa0zqol3693e6w7z906rxjzs8oryudfm6ousm4vpjpuft7195utznv63puvnvdgi799yo1qx2wd2b0vdno0jsm368a5h8wfvuuccq2mvjxg4hpjbczz6hktwm5ygf6jd67b4veph5o4vk2vmbxf7qorj6259im5ym6lbodbtiab6gx9w2g8zh4b3dsa8y7d0l15oba4y9g8wbfq9kyeo2kub8b9hzup8mdfx07xm3b771p044yprd0bswxy71mvvy5tgw142w5dgukx31z5kus5ooofjckv8ugbe3jk94xr8hpj41y0pxkcsdis1mfrz86dlbm1u8kyyssfpueab1lhyu1pkxp8i2p9ko1wzt02gzgkriqsp0x8xw1y5o0ng1twewdhaa7u8wt21cnr31dcgoz1tly6jwkay6apqek6dre2c128763so6j26tmck9ybrf8xzw3rcm0427q4yu5p5b8jh1iq5yjqq0oxr44e2lj29odbw3ipigpsl53bbipp9ob77b1izm8de2dormddk6uprxu6apxu06b5yumh1xgfevvg03i3h7ka4unx2s8acfnscylel4li036zepgbk8vnxfhl082ka2ozvd584gw20',
                filename: 'qc1uske42yc5if6w8s0x0jjfl18ol31xyirqc7733dqcrvpfgw49lbgrzy8gmo39x57lpszlskoutcewscj9n873v1ipvdqx07ern5sd3w7f2glu77wz1nrttr60u28toe4zg4dsvtci2xriiq7ustj9tycy667qt8xcsur6utm9lao8cm2d904zlxtqabj3ghmdhy895nsb7vfbivrdnzx4md7v5yy9v2t3ek1827tbhovpoatz632botuzcos',
                url: null,
                mime: 'y2qszm5n2arxsbhciemhhqdxz9byomdwhxdjftwpa44r2tnb8f',
                extension: 'w4w93ojxb1pgox0wjamdg7oell7usuqgqxe307k46c0pj89zbf',
                size: 8505734275,
                width: 638974,
                height: 380474,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryUrl must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryUrl property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'dca69853-dad5-4100-8128-044596042508',
                name: '656nokg9k8xtmtvoen15n7gihyr5n25jok295oxfajkmsr97tfavvkdulav54m2tpixafbuwv0rnopuoltwirhl39tookughf5jx1vj3suw7jr0hgpsiqrzxcjdmj755h9f3ey5djsyxqq5i5x2qygy92wx0owu6c8v98cexeuy2r8zhaannujk2mtt8dyranwqfa2nhhcpqhptqy3y3d2crgik0y0bl4d61mcxw8cnk6iw146rps6fwryth80w',
                pathname: 'm9df7y30qr9j1z8x84trj77x2uxbldy9id36t1vdianjujiqctqyxeiye8z64f5yg2ul9nee9ktpsy4ve2emixa23opjdeztqzk33wqc6gsxs5e7re8m70yinqnysenx06unlrhwd7kh3zlvxexw6pz3kjsz0qq99a5ag65qwhxeiccpf30fn4bd8zr7krs9yog9vhngoravom9b9wyzty0tjgvjgymcj49gjtlmjb9r8461jzl4lnlpzxm11xm6s9hwgn68h62zbo61uckvly2uuph2busi8t12xpdksk8lfpn6i2hbm7o7vcymfwi3ycnm745hjper2d810k2l3nasl5gr5ju0g20dir6clkucxcyf1stf0j3zx8qv4vgw2u0w417f1stp0aa885ol7gfrb176swa5uyx3or7qa43yobbawrcdhm7ez5l9nwz5snp0k3i03nx85cge845xix34onzzq1j4d49d1eejr9hy8gkjnk6j0xg69x66m70pmtcqq3x9schjykvl4h23x7lpcbkne0x6wyvdnbidipt4fciuwb82dxgj6mkksbq7udtu31iwic1rvzstlloaiiyt4nlwopomxu3bdleu9qjufg7cl17vnkbfp70ecsds89w91ifwmopm8jcd79qzkyzk74l05z8edkav9gx72dbh9c5is3xm9ojnpjr51jc7thd5t4hvgveg66lk0q3ymcypt50abekd4el5f0v0w61gdmxpg8ac68nu1yn8bx4vgx50v1oqfi648kar4a5sdotuvlqdgon46mfpgebc33oamqvdvb3yaeoc0jubegshcwbbc2ic28bjyx2dmqy2n7rwohyxpt1y58iq8yylzqctsxldyg5d04xvffnkneq0g6h3uq4c5e39w9zkwdr08cvde7cd0ywxa2jg201yh179kiaf7jn5wtfeot7q1j5m2e1w2kltp8oauablneb9rmlvvr1hvzfvc677gdk5yv65hb6o81svbnok22o0jhns',
                filename: 'al6tv4fedsk1eszo73ly3drij7aeripg6xw1ajvddfypezc7fkmpgtw8rb9wy8rxutu86gv8rg37tvgneno0n0ryvmmxbds2xbsj32kyjhrtwive4ylan8ws6a8otpijhwssqykipraag41uagg2i56wxio1ezfoj7j1bo311hsezsdtsq20ygdrpm99fid17s7cre5qff26f7xcgyy3d5unttgjvxzjzzki5hxc3jaqye4i77cs7hlkvt73720',
                
                mime: 'c6sf2psaj2u7j0ft6nvyavfo9ix8mjwfou3momaznj7pkfr8i2',
                extension: '0rfyl0kn9rye7dz0y7mxa8izncna8nmr7fgl03uvi3ye68sjxk',
                size: 8981089101,
                width: 679001,
                height: 333401,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryUrl must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryMime property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'dca69853-dad5-4100-8128-044596042508',
                name: 'ejf47jv6xc724xk6ya8auh8gr51qguxxni2hhmjiam8mifm4memkegbhyzxdvla63i3kahlugsy6o93m0xr5tx2s30nlqxt9jzwz1otmw8corpjvrqeexrvkwjjb740vt763qtnb6illqpfuw38fj4kx6x7klgp63a0c9mh8pwjiiokf1wgqywld9ijw6a0r3lf8r51o1286pj6lb80v7pqabn63w4s989tk780tk3wx2iiefko65fnbooar13k',
                pathname: 'sws4p6l4uwcodg3uv26h8ftv47dyovxz50qor4ymkhnc6ux6gfeixnkohwvzurm322btfwx8axqebw8q0lqy5jy5lyrknruafzg2058bhv3r8v3nfps4gizgaii8rey57j2ohtqm0lmxcqcg71uoap6q9mjb68kzsk9aeuldifvid1fnz8050amptxd8m3e8117fxbiaigcppp8snz8k2o46u2vbqbdf3hv1oih9a3p6pv479gemlej6bzvjllk398l7j4z9x89f4coev5ffvcy0u12gqdtb8o5wim4v6fwqstx88tjklq7fd240c9m7h2yl7y4upje9it0ihxonmnsb5oubqp1dji29fq5cx6yiactp6pufsvcvl9f90t28afhwj3hbf48de3iu54cf0hiakqpqf5bq3xjjzcebsq0yrvnwawjpb9g3rkv0gtnu2n36w37quysd5m3vsazqc3fuotlplos62yx6txe13yoez3zkmjukupm3z7vfc0a3ga1hynf4srnpb6k9s35zk8qdxgeje71cx5kirh7nendrkc0ik4f38900a1c22r9p9vfqshy94pn7mm24f4h6o3y4zikehv49yrko69k3de7xagktd169576xcxs1b62sxkg8vplfujx7yx89sb42oyd0p6xwvas6kyb3q4zzskmmsrj2pusjnxjabyszl5p8tz4skoh8twwv5z0ju035x95wq7huvxfdtmxj6du483r05yruim2ojthaadiary0iv3zuub8193qzwiqf0lrxzgkcacofbfx8hyadm2xyb29dmt3fenv434r40mlmlwx0gsmhifyfmetxxpgm0yo4hzoclnbbnr6hrqsoatb99aihkp3e6xuhd2ar45309yyb06jz82nkcja5x2kyvt5v9lt2lz07nfps77ubudydmv2kzckgvtorthof0m2ztry1ljjr9k3glomdjnzzuojxe2cetqer2batjjgfunfxcz29k6q9vkv3meazdnd00tv8',
                filename: 'q1s2siivbjqk8az7p0kkryp05qhppb1tugb18uob40sw3wm8z0k8qr0srg1pqxl7ayg8t5lli9i4jyaer3f5hdlqgl4pa7fxy7v5fx4kjz4ceyayfq6lllr3rqyjbvglclgeo5vmzdsed3isrfo5lgtge658irgwcxnfrph9iwsr1c19qpzevipesucunoyo7fx0k3cvcplnu4jqaz3wt7wgh8i05104ar2cuoc7fq1t6uqiakgadaf6bo19gx1',
                url: 'cfq2hmsc52m0d6s5sob5y7ak4s12gpqa21rpkfrqa3s1r229u2nsmg91h2hg0urt0f94oa82d421rqyqyyt0g18rulcnzh3oon871fo3so95yf8oviiunc9x2st6ymahbnuscujxom9onyz1qi2aityp4mswjntb8qec2axlew3egcw7n4mz5ysl100ooislf4juxcci6nysfi44ee1yh2wqygo4mv6sddlvi5zzy3l7d78ldfare4ka6phkdmlexz56sjfb7unjpupeg0s80lg0a1m1eekz5i2cte72ge8ufnjf56w5nxnwt9q96rkbwnnxx4f77pmutofhksvn5n87vawu7og8qptwd60y8sgq0dl818gw1s368nhaefjzvm51l324mh57n53xqc9skgsagauu5c2lvwulo56mn38iqxm9xz15tsol3iy6snjipzp0nc93kzszum8su73e8przh4sox47900c44wuiz1nlq7d93roucy2sct6vb5v27upd241u910snmkds5sl5tk4jw15x6cvxmw6kghk1qnjci11j0bntu60vvlykflxvvfqvggw2726iccfq8wux7gotmv6ci09h815q8p5jd4gmarazhlc3euomfgtsawvs4udjt4cz2idhgl764yxonj4h2my8ax7010jd67dhuqipt10vtouy37595b4hoghnrm3meflwkhk616adjqxd4guvsj44m6bodszxmvmn68mbo7e83prl2ahkz7lqhz17ct6to28lfzmilr9kem7kmf211b7nwmlzkjwtwi83knhnh7bjdetf7humofrx2zy72m9lkqmxps6ymes5tkqr757ud52gomx7zkv68gr8ifsdk7lxlqm59lbvqxze1o6xomw0g95snyt38qn6ey06fgrhq3yojeg5afdih47fibcdvrvuam4bkf5ykcq9mgm8r0nz8lgst7mb7x0bczgrquy536i7t5b4lgqv0tz92poqz2nyq4w19f9rov9vg11',
                mime: null,
                extension: '8h7igisczcwhgbtvq4kmc6ardsatatrsfy4ymbnn72555klysb',
                size: 3078884578,
                width: 295672,
                height: 203230,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryMime must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryMime property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'dca69853-dad5-4100-8128-044596042508',
                name: 'yjessv5t7uyux16us7bjtmuhl939l344mdcmbroo1y60bpn3a59qyrta4wlezn70ac4b1feth3zucsbnpl3bskqamfyub0cz09m38j3ypfyxo9dekf3bb8msh0zv6pqvcvp7bsnl2622a8hazoctw0vttvhn3fdeclqj0fwb2dp6ku4ro97qz474zquwdjginpezgbmg582sllbavgc6e9ohvgyvo36xvflbbtxt0z4ir0zg6mgaun1qanx5y0r',
                pathname: 'ayebxp0l95intohiir27jqghxad6qmipjc0rqocls470dndfhoqdkloj03qwcws1wopyiblyjcgy51lg8c2t99z3m6w849urbi258zkzw5mnz3kv697i8rgyv9ozib9ltp3mv9cocjkq5cdpcla5bc2lyz0ocw8so8ljrjd2yurkwx87pjlux8kv7qck7cs7agto1k9cqvuqs2syelujrqw0vdro409mak1gi0jchkws409r5e7gykbwjgmyelviwifrhveixsmh0nhgixrewtk6q6wcvnhvchd6m65pxic998uq42j300q35578ans1vkemplqtuuuw66i6g8cuuz9ar5oia2cxyd25b4eedrk8tdvcs0u20s9md4ix366h8ua5d8kwgm8h5bsvmsjofzmgku1ii1jzmi1g33qmud2yo7rrxo16ng4rzp0ty5ss0smuk5nn4bp9zdplo8abtv7f1r8819no9wbrnvimbjplodpo0onhabjwgha0pdou2cjl8pgfwz84ad6vcjysowx6not97bxsqspnu20673rvf0wd82c7jl8gjnylgz6qulllyaadtswkkjs7mr0ao87mewonpfdkn3oeyyk8mmg3i5o5f326yzi2c3grbmmjvcx5bfczaoro7w29p3k2cq7lrganhr17gwoqf1iy4qhbcghuclkscyejn0u33asp56739ylegvq3d3tkrcz9qukbzm5nwx8t85weap1qvz2us5epnq9jdtj4980hsikf41361dub1vjkoze046dk8jfokhemq32kp8af0hl6kgiv99afznlldnv57tc284hv3rhcdr5oxgi5t84rmsatgwm4dst98h289wtk415kn8sjd4dn9op2acrnz8142gxlvrnttzux183h90ozoxqtbwdgnh62lqcnh0k6gvnrs5iphnktm0sjjcn8l1joty3zeceunbfslwii8rr1pm3dnihnfhgmk6pkvp9zfoz8xmtifs7knte9yfkdxugm0zwl',
                filename: 'rzcpb2f68d1258cj0eez25ctcpwybapi2lurvemarw2fb9ccc7bvx4pwfba81b65bwececv114ipat49x1gqspcjtw4iosdbiuss987i9knrhlzgdfhrvr7tft0lz3pk50yv4lc8resf9uqymf0fvkr5lac8o0gdb1dkvjy1wd7wofc2w5pibasxc26p4vzpczv8dfbfro0ku1uno2v8gmunqyilhwndjze27e3ihwcws6i5vyamosd2npel3ei',
                url: 'pqynm68g8o67m2fcs76r65mu0q316w7pippjt8bpp8xsflgeeegyqv1xafeaw5kdukwia610immgjvaaronekdmi5e60w94yp3tu88vu9jb9u8g1p77yyf6xzil3oamj53z2mmrjmxna4srvag9l86elhj7yb12lm01vvuw8xq1619hkvj6r7sd0qululh2q5ewsowxbcslia4jbkxgj3futfl38tgvlt5v1m5h4q38buj9kae1ijmryy8w592aew0u26cl0iy7xfa0438usf0nihspkkqn11la42h9xg5pn80gq5w367euhmq0bt0xujqky8s6aqftqjujpcnrdo0ik92pb3gc02c8qdq9fsiqjbnsecehmrvk4vw3ksvj5pktcqilqb181incmouhnjuh351ivw5r3baptpubztza4gv8khy1jmxtwidnzwfyorf3r8alo7x0uv2xt7wl5sxq4msewfypoyacx9tp1et7ldzfhkcdnksrx5ni12cy0l6tmhryh4z7qk98uvd46f0gf4lgc0nfwniyjdt4anhszsej0bym0iyz1hxkh59j9vxxjkkcb4ym509jo4idnjn1hvmplg6rcfi73mg1khcsexr0z42tat8xy8oiqvrxvrm0mrc3vjkyan8r0edkt6w8v4gj37gwh5dcoc2190am9d8ku909thwfkvampx685axjn05p2q005mzvxcpw8i5qzhw457mtjsozktrzt16qcpfibbof2b6y2vlz3cljlmq7hqpt8ttu12ffu6t2m278cg0o8ouu2ueeqfdoumxdfx4ov3z8ew5pqu2qegnkexogk05r6nq558erfrspw4csfdm7rhco968plsesj29uw6ssdn39ygsbvo5g479hb7x18omyadfcum5ove954s25fysq03nuw4a632mwux4k2a567jjj05vvzf4x9u127fhh5q0vig9nudlsyrdl8oify50gvlcnix1yyyre6hic3qdkmcwygz84t8mlrr05x',
                
                extension: '7f84lfel6thtz3mswrbt72vvyl8dzmvscem4xesqmu9pu56ado',
                size: 1117356474,
                width: 489088,
                height: 763990,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryMime must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibrarySize property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'dca69853-dad5-4100-8128-044596042508',
                name: 'ojypee810kmnl59u09xzn7h9vu4dheh2rytqi0m0f7ra8tg8sez8z5dyk17flzfscsjfky3k67cj3ujbuzcx96y7yf5u2eepc7cbfieg9z84i65w4j5ucu9vjypofo6sis21u8qhxfy79mled23xds7urr1zzw7u6bzg7gv4ao8yt1fammdb1uxbagtn7z39dw6lzn8bz0sbth1hgyz1hiv3bc2d14e9z79yclyoi73h9iexuwtyz76xy8v9vvc',
                pathname: 'sjlbwo79lomseqtw0x3pz2vdzg03eynhgvh3zgoht17qnbmxy9n41qiovsg2yr0dszj8vkebpxqzyqfpmrk47xm3r85q43uau0optanncpjn20uvrh31kyw4w6v8zla5sjvidjys98mn8m6hq2mecyx3q0sluurzyuc1j86s8nwsy8vpysnz5wpxvn6wj0uq9dlxijn3du3glpzqg2f8i2xjhhsb54dbple07kilym86v8sfea9jtdlnqsb12oznwasa3ncdxzb7yc92ydcahinptt4xlmiqtj11sf0r5brvkrurdxylcowwmqu9sxw9tlyc411vdzo9dw66x42xliysvj3irtdx2b667ognmeeq4ocxclgv7uml2ou4f8dh7bf51c1ustl08pj8lpv11gs5yq8kzznyzmwbuxij9qfwi9ymhw705r3bqnh7nl1ai2h1qfq3n5cyr3rzzl3dg64kxc8misji80dn7x48hl25sj5oaz047tkkmnv31i1hqyqs80bywqn9l0spz62jv5vum2f09dykus4czx6whe6vhl9x31myf3za52q43hbjfx6gl49ijun9hleej5wbyfs53bt9wk7a148yc7mng0v1zl2dng79chll3vde36qwgdzqb2xhliybkbhs6ciu1ejtm26qltsizybca3y543dkggcbo9485ftmnsperl8zzu10qcyl66g5oxd5phnm4n7da1aa9uip5gnmuff8x0317k26xrcchvyidzncd9vm0cjf8gs49g51e9wv12kt8uy92uoi9loa3i7k6tud17p4x7e8x2ys9u6n3ncpsz1dda1q3yfjpmxl6ulgjcp8q7u8wue149lfse81npam1f9xwcigbdr9hw8sbvtwehbmz2vnf3dlorxs903gm43ef0g5axggwmyqcxg7k36cjmcmiofas2hlpjsbadav6mzwc693t3u7i1psjkumk2rmb2tz2ciscy1bkj3hihwn4l8ssyepk7ibfhltapahrq75',
                filename: '9qjlsm6mg5ec0w29158lnhtqfft94f6q2eie74654v95jxlnk5w24kbcnpico46vct2rs5e3b65t24kuz8fp29l5uu8h4rylagnh58yqepzxremohycprefklfpig9mjz8msb8e0nttix2xxg0q8o5c9sxwxyl742hn8trz4d28l3ipiimknqdcngaub2zj8egnm4rd90xzbg08dqyekjvpojuaj2giu4mcohngmjcd4ri949oqtwhsr5fu9g8z',
                url: 'dgnrf60digkc84iozqmz272lmauu2qvhgs0ohe040ukqe3zda40ucze60l7t02xrhe4i44np30estnrndmmwybuh6q5egljowl7c7pywokacg1jzjya0h50aw07kkcg769vvcof9xjhwk5nuk5kglmfn6jy1dnd71y5ncxv1bojlpzhejyos19lrjmo0lxqfd5tgf7xhtyc15niwbl7wu10alasgu1cmh2svtjq4tv9ldalnj1pzqbckkj4idz2dy008ah3onhizaoy38m6i924y4180shsoida9vpsq91hmasgu5h8txebgpdnwfbu0702wlu0eulfe64gwnlpy6piejkf0lnid3uug65ptft51uwqeosgfygrjmmv2jxa3q6akgl9xwmd7iiph5jhfl2vvdp9rsrl7cp2wqa75z4holllma769tw6s7y1occsn9hmxfixfbhvg8vcbsqy2yxbayp6ebt6ud0clwe96df9tqqkvavo5icu6awtry2cpa897nkauagtex8p70o0crnux26lw0p4qjtef44rcg0s5c9tsqoga6uhm7b3dvtv1x97dt3176dpru7un97lh6bo9qz000hbd3u7stsnajft86amyh00llgiybozj8o2fju25ptlbxl1b2ag83amh0ffidj5qqp5w300eeh62bjrz4wya3hurr66kgxe1vmx16405s5a2xzak5wk44b4v1d5h0jgnr4mxf9e31mk91yy8cm3wo6gca37f68olp76vbuaej72evah7p7yy74tdy5so1toaziwn9r0vyk6j4t1psp296zcusnr3nvlc7zcpy7i1mm6ok5m0vsxgnvwumfkc8dcp6ehz38fpnsjdhashpff7ch4kbopt290zfovkrzfxh7p32at3oxb6yxqcrd4xypwsd10blzjr9xpxecchukjwgjnjwcrx0ypo15n1my2txwxcdli87gvh8fja068cd6kpzj57f2n0zhxq31pm89l5jqcw7xyhf5l6xw81',
                mime: 'iw4cq8e3a7zpl4z8qi35nro76ftupnswcgu1uf603ucph4uagr',
                extension: 'uew2twf3m3z0fpdlqxjn0hiojwns8tshiif4vslhrokx5j9hst',
                size: null,
                width: 322536,
                height: 924336,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibrarySize must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibrarySize property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'dca69853-dad5-4100-8128-044596042508',
                name: 'ngib06k7dvdynqhfcvswnb54mdmjz9pf3xv7pifihaiupl41qiga75jokrh9ioqkdknkw3jbxk17ub1cghuc7qwst26jai6yphy1rlwdh9fgw56z89qg88aiyj25pg3mw78h3i3292x8tof12xkcuodm79kow80bhk5hxbmc4t43ypy02nq8curkugykjo8kc3ifwmhqriu18q7y7dr1kkgyzw1i3gp8p1x3p2o4gz85nibp1hru8mo813hvnd2',
                pathname: 'egsizsr4xnk7ueishct3j9iza2pgc6s1289eeqt2lqsr9fwk5x3mngzdk04bxqrdr47rf30sojc3rietn7tvwcznyo6yqpul54hpbi8nsj2oolk20wnwkm38o0v80rj190i1g0lec9jxk4kl1ut8cr97eoxzyz4uyrtb4k21im49xois7hsk8i7ih68dv2ksdrl6npo9t30t8zbdvrkxt08b0tdkuml17l1xb17jc19im8ab90l6mmqutzox0h72byzow7cbi7sg2dhdk5q0bbzculmvz2bufkg59o8khw4c2wzoo4e4kvkyhej32rdvtkq95bs1d7nuzewpmd9a3stznxpr65k141pd104n3ligpjl6bh7eqjvotm4ux0wehyu4jq6hcb17j3zom5jndrmyoylmpslfd785z33wrxretau0g2uyup9rgesiwj6ertpk2uz4rd7qkvp6iiguc3584yqp3bekhqu5vujtf32uioc8qk6ebpyzg1zcgvx8uv1v48x7bioh17hawolfqig2rx0kj52ljd33yh48fjbx4mzrji1j6gbithe2lhbd3kyqjf6h04a2ynr3gdvpsq2dt884451k94nswmmklspgiqjxvxvjho8xswwrvr91waats5mc7jqb3soat2jf2p8f5wwwzpqoj05k2fe5hlzwljxa4vbk7ejvk7bkc534mgwnr275kvwwb5zta0dp59v32m8g660yobbhjfwg9d0sj3nkwy3awlml6a3cife1innlwus1eczw6e0x6jto61wfy0bg40w8flolljz2qyu3k9dyhsqr8gtot5o43imt3bb5t3yx02l4p7eweg7ia0x9bvc59l2yr92t4k8y9bof21ylannku6tua8rg6di52rtzldlie1p4hn5o5gqm0ux501x0zsprw44433vhw1hp581o6uxp9fuakrwr92vbk4qlyt58eeju4lu9iarv3csbl64n7glwjuj9andmxgo3voq1chd4vfdy7ghub49b',
                filename: 'i07aioj32y0pv9rug9dyo9a98k4uzm7fbrx5k4x34qgxojc8ccxiulx141nkmhtykyw47ujyz73vwo9y1c38axmqpah0b513r69iwjenbkx3v1xsgpjd5yyecjxqbhnqj4svvzlu8m0w99buxe94vcqfvy4jym7cpb8d738krq0mdzs0xshun2c957e70cbjojuxymegaruqihu8rddwjxvy15fyhq3a6voft6qlf9uevx7tqlx7ekz183npawt',
                url: '0ceerwp27t29nonbfnxxo6rv8n9kxxfd90gmgqhyqqi5x38mttcqbpusi2h40a7goe2xq6rezdrmfsgkykhsi75ghx79pjg1g9jhftfujjsuhml4w9d1xt9jdkpw8n2yfgm5yxaik5eju39y5m509z80os65kx2stett88qvh0d6s86y1aj0h711i0g9ie70oxqk6s6rliivdka6cv4bw1xnnly92i6v8jobm8t1o1do7htw5mum01ggrflsa3iw6nnzp3e6c8afqwr5szwguzc373vhrqmn6ujgpjcyugmivij80xpapg7z1i2bjyv3zw90uvg8pi4vzfdc0p2gwg2zmg40ymovxftar0t5jzaxb2sk375dct0fkojd637ozkylyrg5at9ufzqyfteoluvrl64f59p21no9okdlvihz2tpuvpfqymz46kc2ayghz5b8upw83wredqp9khingub85iig6gw7zyp6xjrg6dd542wcyrz0mbg57vk3nhzfyfjnxy3dyf5ec0uf1x6z54qz1pudfm0qw7rz7hyz2grwz63wbmm4525wb0svjiwa3fl6r0na9tq4wkey6ea0o529oe5tub4h58ts2zxrj6wqyyqnugd6kok7u746qkgfoj1bqqtzgnntm8cfocqyybnmjj6h4s3hkjax9xxczqqmfk340hxuklsl6ysxa260mnz78uo1khn0s7hep7xfm0d4xten89b2mladbnwj95savf8555w0p3awwjhudnsdii87tc3ou37sr4ijopw8yolznzafo80bbqtqj532jf7qsef3x869qbct50freb6ncuuk5s4jvm7uj1s0qe307w5gl4t94a6ojqfhzi0ki70xbrfq68nrzr6p9z1ufqr621dfid1sa0rm30iqksedp8pbc0wr7i5iz1nbpan579ivj5a6i8uh1atw9mo7sz86yyxtkqio24vwwsxg9qfs31qhx355z5pxkgrhn15tzdnf4nx6sqxo9erx3j3yu3cd',
                mime: 'p6j8yb39er5kxl7acasg3dllgsy7r7jvywlp5na89klayzkvst',
                extension: 'nn4516fqpkqwlylsmhuubv6bkk1y201p6nphyl4dor4li31rk6',
                
                width: 499426,
                height: 748487,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibrarySize must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'xoie95vx9lcghryh9jjx2gxaszyevbhax2662',
                name: '577whrjc43rhuu80h6snru6o4oc9txvxjgjog9qqrh5qzdi2on4lgm5h24lpkrx71jwdcnz1awg902g9xqjv60mij658ozo2y2ti439hokoe2yseo0fs4foq23krunlqkn6qnpdawdqerkaw1i1ixnrnbq5ns6vj5re2q3e1nwqzrn3vmavwmi9w8k00ftio3apu5igbynk5a1k4hq1u0gi7b0tmx65mawgxalz1f2z198gv2fgjnwml80izonw',
                pathname: 'yc8duflbu6sqrhy4r46ng1wzgraexu2tvu3ur4nmrb3bkabheszozjkh7idkh7mlbuv4013ipnnjn3l7eh4gnbv9tuqm7bvrzil52l5tzloxuf2wa5z78wp3ochnl4eo2sc92toejoudwwo553wb457din1win1sm4b08ps58pyq52bmra83pwume0x8puamdnlw7za8q21wfmw4mgar8ajveixhnulq265v67i7b3jsonu85fesduu5fd5mk8ptgm9l84deqw2rbm0lyjz9e0ng79h7p89e6pzkcbbhh9t7s5kd7c8uvx7647zwvzojw1imrw2c9ddfz2edxroib2n13crv0oz5ebn2qveqcsjsx3j5cfam059s0sjjol0fsd5usx61ymqu3n5qvgfe8y0cf66gnfbes5yie2j8vf2tdfir32mvnol5eed6ylnnhi7qvnj3xdhitp5m8ryan0t59fmsvmd7r8wm4siypm792x1ftvw1ns5091hmr6el53e5w0hyktxooq7y9hrx829xogjolp9dyk4u6isfjnzzhmk1iptnn5ik1o9w9ff6qll7mpqmr2g964r0yiejt206wkpscrmuw5qrlffde1b8t8ymxvqja5r2pcced82r89wgceelhg13s2v4pmpx0qbm7my6dcgg7lmqepc3m0ae0vzz5um4fdtc28errog2hik5lsq7qnwhsh3l5iczoylwij3sxlhlcsoretmluuom6r2koysvn53sl5kobuwss77tvg9fpu8mmj6nu64s9uewjil2c8xdv7cpmhnux3os1lf9zb5ogfqn03gwqqodiwo8xh3edwsws9kkk18z9ij9mysv0kjlt7fsqi271s6dh6igqs5fezfvowlvd5d0u239zyr29k0ktad0ac017q0lpx318ibaarxodqcx42386wh92o25h7jk89r8hvr49lewzrjeenmxh89bu9qasrkqrlxxkip3fd4hk7gt17siw0lu59ww5w7f0s6vjvz8',
                filename: 'w09wj6218ke5kq0uoq9t1xbtdapretgkfn02aitayfj7db38nt3gy1nnqx0nxop7ywsqr3ouyyzu9s55ptro0erecmcigkbf5hxdvoqspyk9rlxh0lznbp5xkwh65mxd85u8bm4jw3omdgmj29tj9yvjmbvcs0uai2k1fwl6p1p0got2xo4codau38qqg5icf499y2iry5j3f3s9gw7c84lkehy5rwlz4b51r9z8aprnqvsy3qt15anqz0spfxt',
                url: '50olq4sgihbtl4kev7si81xi5lkfh1j0uc4f1aigbh3lml11o2s4532wd54qux3gstkav1ozy0c3get6iypyvhzaxf6h0qgfh2sc8tjwj5pfd0y9amjyx8qp7c9jhd4k1mohz916we7v3el4rdtzmolzab5urlfnlx4x6eqtzujz4ad5u4tgcsoznznareitnjpi2jde0riu9wpdcbme2xaeo8jplfue8aacoudvyn69budb8skri6bdlen5bm05zrjjr3ij4xhspjxgva38hedk27yx3i86dh8ff7whwuiyql65rgi6swvg6y4bp5wgh30c2omyv9486mnrht0nhiyp1j9srshhxi1aealqejzahdsahlyhlls630e2rjclcoix5zm6ui2huutb8soc1r4y65derhovuvpd3gp6tw0d8dd30v2xtwicudmdh8vbin8rrmbtho7ugba0ny3upq30zx7w0zvp5i0r7fgmi135kkmxbkllebg0gqbhdk8p6p20wzld0ebi3tcyvwxaq10yoimeqnjrk7x1236uchmgjkrz5vy7maqcoxtbftfspihcasy2oldyqvzu8qdt59lfu51xupjlu6sbw1a8m5j95vpm22nj00bovgrqedmg4374d3vomrcushavsgwlrqctw5ehpiuauwkc9lojkoutumv0llrgnupv8jf3y4cj9sqncv4kw7g82ongwfyo8xib58s26jw9xew8vt0a08bcs2328y8no3zzhsy54codv9id4xb5569outsmzb3r34lufmz6jzvwm0s761wu7e75w0gaf8vql94mcu59ucvohj7ld2tojzmjm42lyjefyuvvz0d82izdg08us2350lo7s04ku5tcehifpvb45y0k5v3lzwgddvqjn94as71bzjbhfoywritzyzxl0stty5w88slynrrhh6oimbcimklln0q8zahf5lpb8flc708z48ivkk3iqevpqivbscrugri5y5eg3w02kxbzxjigo8sx',
                mime: 'yefqa5jquxg3fkg303aw1uub4bne0dlyuir85bzp5gsnzulb1l',
                extension: '6yy6h60t2wqdls8vsn53zn7ekb0vmv3z45bxsoeqgim0amd4pw',
                size: 5735506867,
                width: 747153,
                height: 993362,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'dca69853-dad5-4100-8128-044596042508',
                name: 'r23hydcu4hp6a9alld2fsm7swhqd9oo4x6d26pbncztm9uuigu34u3cyj7eg9ycawyr5ptak4n05o3jh7p540odhtshuon7bxul7smhlh0qpwboa4i4eolpj6qsomw2o0oggjg6kvv1qigchhvsaqdbp9kexgksf6lbbycjl5czuosetg6941r01ripvj2ss94sk0ohzkax821rx3b7lbwufntgr5cq858wvstegnr0kt2xriykolifsn7voubs1',
                pathname: 'mleteuq4jcjohr6zrqcm6qi79wgp8f24eh0yxo986v3hc3io7wlr66st3n9hbrwonb2drranke99onrq88nhecloqwijc3q8ca98h0syl9phchdvocnkhrh26k9erjlsklzgwi0mzmfisx0pnjau7sjus07rzjfukzg6ynwvneo4s0pac2dntts02q7ku6knj8uyvm01fszzxi4v1fxkhald6qh8eu8ld205xc3ja7vzz6do7w9j78crqxrll62tfx45usk4fh2hesl4xm7dwbk0bik97hsmza4a8ask0crl8rmx23pmsbrk0suvabfy9vja1a7v32iozzgqcabxh2zxacak89ga6kmaj3yi2381zodc411wvtbqi5u5yg793gim873os7p3krr7kulemnu5x6schhugb4xpw195z4hofua1wdiw0kl8dqs57bohfp4250xtbip0gezkqmf348tnn8quk373k51lgh5v5cc6ewtrgcgp92rs7ry5970vffc5tefpdnjok4kf1ie3w4d3g5y9bb6r2rn55c9h9wnvxnxwz1l9gabrr1hffhpvcn3wil705liqq4ugr0loy9qyvldvqo5ca4mz1b6upv9kxkaz030vjcxjwefnlev7dfy3zza6wpwdx3hhjb2pl37870p1og87f3zvnmy7ggeshg03xk45kq2ways3hagpc028q30rzhjvf4ww0btovs4bozpgx6rfmdi4j7938rgq5pckotvempt9i64iucewo7ijlphrfupa3ji9r3qa4lbgx4vnemz0qh1vgcsi48fq2la1hxrgptpygicrrbyyx0ujo94txvb5n30p3wcdqtmr72u1d8tvvzhqobrvuua9xl20wx8e0283uoqv5zu7qbmo044vkcd3b9wfi2go2yewlcpgsff11mp17w6gdnky0j301fo9l0akgi2cmhe0fp6s0uub3rf5pdq2vv3d9km0h28qeymz7n3wfbi30qb3ayi1vpw98a1e1v3coq1o',
                filename: 'we4w7p5lvy1bywqenjafzk1bkef9iqth9n2pd1qq63cydql7i8edf3zcems3hpmrs2vhw06iw3nzs6jchtskrmy6fo7h2pxyot8fjrdsuues4a536p4u9qnovge5bwladq6lb5v7ekqjxatqjezppmh7igjljes7han4s1azo7omaqe6pk9d8ci1dncox1i45nce3je8q6ehw19arjupm3f3do90vx9vaot0z3rb2tr4800rd1sdsdqh1chrpz0',
                url: 'izept7ivyokisrsi43jt278pbyuw91goeqr6wrzgghiagwyuxxbky0ua2arxsds2irbcm8bhyuip11q196zf5stzibqr4vo4vf622elc2of08mawrqzjy26gyuc47z359eqw25kxsjg16tgyswxx57nple2af4hdy0z1o57usaekm8y2p87a6bi9phuu1it3w3r62pzayzmdbnz2go8esgdjj498n0s1envyx51meqd2bjgv5bok50dp97s9csxtkimq2x53nrawbrw7z4s4vk0ik7l7pjgea635qty7x63ncjgghjz4yad2q6ix999nimt1dbx4s34ezk3a4mn5q3y7489gd88ih2fpw32pjmh8ubl0l3ms0wirwi7l0xehnvhdrinccyn98o1t5by2j7rx8vtblc5ob5wutrswln6j9xs0087mvbf74nda1y2sftrer89tqyx5pgh36ry0e0m6uja2rsizf6s2o5q5cx051jsitk3t0brb84l26wpggj1v0jrmex6m8736slrxsjh8eeckhs305zs5fq4t7nghpilukpaoyvj2kpw0dh2ixmbkl0a5u91sk8i2986gj5jluxzhuvuixst1uk6ucj0dspc2q9ai76tktaczybzcwlp3j8o7g5skp1lhlw1rnhegvz7d0rnf7505nbr1mgkr01fb2ozcbjgoljsa1z9z3huegdu6hi7w936par6078byplyxt8r2ectmkoqcvzrsd7du5nw24y7lwbwbs0xjwb20d5qwiw56zk690pnpxh54g2m6k6oy48fqonraguia2l27fqbzmdmqxjb3uejcuv9ap254iigoxr07frzml4ym3g6n8q8lx1woniybgb7zkbw4wf35zp0dader4129lah53gt7nc2lv5pv97y3hu1y0yyux9v3sntn9srwki1nou22ph2p6vx7vkho2kgln5c23wof2e5y7oii1g5h4aep56cer7wj5ndv1w4j4bum8pt1cwfas100tny89oul',
                mime: 'krafatwmwehzk88ynl4qtp5wevaqvten3idfjzuvnw4799q7nk',
                extension: '5fjko3p4s45u2q2k9m6r6zap3evnsbjxwtssb58r59feo6cf3s',
                size: 2111811417,
                width: 776748,
                height: 937469,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryPathname is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'dca69853-dad5-4100-8128-044596042508',
                name: '3orh6itq1rbpkkjz4xm0haao7y3ur6ti8fdd7mpxxkxfhijwi6nisdn24a6w97z3z5opir4xnix4jxnjo58zgntsqco1frm57vxqlfh0uiqt33vg4ilswmbx6umh4n3l8vbigaez4pt6axx7trowcpxefkwxsw3dc9pnk5l5wjs6jopuvenhu77iuz854fz9dgw46wonixlhkqpp1y5rd20xa0wnh9504k4idihsy4jpwigy35dztipgb6yzzlb',
                pathname: 'gfvmyr9ntutmjwasawn34ye7ulcohrvr606jhw59tqbitqg9b15w19d66jq3rorq57s55ehld36dhjk5hs7h17iufx2l79ebyb89rbssipivlpwvj2zr6vb2swox4voo47q59yvgs3re86s0993tb9lrnqbteykm2tfoy63ufgcj6kp1rme68bvcubfj5wmle9s4kp75o23p03i6wrsok7fo8bp7jlquppro059c04q4f48l3z3lq5jl3rwrfg35k6hxgxalt088akhrdw4hokruxliwumqp7gmj0giuca6lgrnptzvimk8j0myjjtez2o3iylk4wqtl4td7xmy6tp5b15cqw85du5mzs2v59qc4cbwje2x4f89pkc5n19xh6988cv0ff54zztfw3ehzuxhym0gjm5qthr5amedabgd3tz53t2bvxktik1viw8bblyewopskpvby6ym2yg9zcynai5hf726iomditaiafrtnjbp8q5goaamhxm3gl6tv52z8z10jpb1bshxgd84dydbu09s8oy2mthfpjdbx7v1jkak2notydw2g7lm30ep6na8v5a0ish3ll8girstp34blfqwx8vvs3s3rv9hlckvnu871zoqev088e5n0ld205u03028m0jt5uy6ug097is4rmtin42v6vg8e4n8793wsze4luvfcdd17ie7qqqbm1mnfqq0ebfgzpvf3w4uyvcyy7j5kpd6bo8obpalehpfcrgch903c7o8a1sdqihaz2pgo4xz8dt3yrmuqo1bm3g6jvm0f3m57xgcdd5jgllymh36a1w9kpjtcnh81jk0t99f8820o7ra7fksyyt6sk1kb1gzprljfyt99gk1m8x63r03cd5rx9xz4w60icex72pw9gwsawps1ryj5a3h8m6zsub21i0yz6mxc9lhpr73pjsfdggekrimxqjjk3jr4vmhxypmjgxupapf143lsjo3u9gxa9vblsfbb47q3ltaljxgv5o6kiu2bgk44bl1pw',
                filename: 'v5x4vyqtlhtsee7unwtjyiet5jgtrjfdnkfxz7p5w3wqc5zv0zxg8h4wolqs69tlv3xfenrccd575mpbvunmm73gmz8d9qxyc7yoa20vg7reoi00pgwqgbm1wf99b3eam12z9z1v8pkt9zj7u9tux3qdrqg6kckz2g5ypb5wytcew19l5ogfcvajvi6x6bh71uzcaqmrcbzyk10ld5fe0yltq1i7rh1s23v9g9dfrc38kpj7040ffqbwpvzw0jn',
                url: '593bxqd2i71vx4wem9owrggc0935dykdesrlgb7euus1t00f272k8kapfi96fubwkk2t9eznci1w6ax052gob8xqr9398es52y47bj47pzmp2rdqxeigp9q1rcp09xwglr439u0uwpqmmqjufd4r69sqsar58hock6v3pwidhmlsqmohq3t3jukus7o9r4jsjbz6xrs642ud827pi885n7e5xchouu0c4ez0nrgqw0zzxq3pu1lcskbiibke6uu2pfpwy34oa6rjncyalfyll8masfhplt6hc8d94gvqjp9lentbom8kzsfdcpcx77d9h0s2khw856yrxjv1a0tuwqyj4dpmimuqp0jpq1879cqu5hkkz6h857hb236cxquim0yprrmgqfl1l102giu5a5kfndjnlyqvsxt3qdl3wbz3mkox5gaovmff5y5shjtqbsltf1w8x6qsuxyxuicmlo6otzywvlskxtfaq8zs6zkejmtqtscbblbsfuc3mzinoh7u9q1r2prhuxorysnmq1uxbb2i9kch6strf1ztcfjwg5pc9ea2lsyx0wvrnw3qmtnjz8tfwwcsymc54jk1rqrg9itud7whfqouydteal4yutl4tijvbrpa41wihbrbcas8t451dkwskxdrsbju224pj5ly4oeallaxdsh1ysofzu3u0i42jchyd4dpgor3guortqgl95dfiz90nv24cwg35fv64dpgcel0zmdcspjb9y3vqf2oju4znbm63nymc5ji3tfzcb6rsw1fpl2185uo66ke1oku8wtr05kb82pbnmp39jp7qoynxux8e7wvrr3ucdlxhvdtc2ueidebqiw0cpmu0mg04vv3wcbq0libv8w65e43g44q7ahzzek37gv860u48h2nt7ftyw60ow6skixsks7x1bqln8gt8na0qg4p6p8zfbhfsjuiptdw0cclnvdeoh19c9dc5rixeb858w0l3mwpxg1w1m8mbd47eqslo5h8auifwklfwko8',
                mime: '3q0dcrhcbkilb4rcvk4s8kzrihaizy0gyohx348z6i2jsyewks',
                extension: 'e8glo6flnkosuyplcwhcp6kb17sgb6anm5dpk722wr1u85rvyf',
                size: 3295690286,
                width: 244503,
                height: 777399,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryPathname is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryFilename is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'dca69853-dad5-4100-8128-044596042508',
                name: '7qpqb666rouh2l82zfobtf2ffzgvekmim68g457800pvxskd47cz13h745x20u9a5aolf5sgjf74au2mngi5lkrslyrvzdvrk1p3neavzjyj6f6of8ygq8dvlhkb7nf9lq0r698i41tqz6pk37utudmisdqlsl6kq9ki67nvyzydn8q1x59uu9s7j8kh7gaks2rirsr5kbym3ew1660hxmb4kcpoqgwcmhhgvqywesukhu6246kihx14hc9a83u',
                pathname: 'zejhowosfdfajdb7oicrw4tgi89ubx8ytvdan05c4mo9nergadpjqis9py5btdpu1b39nt9alujwo0o39x95ocqk8kclku7l6ercaa97h8jwmcawkuka8fnhqrkfmc2xazni0ib5yhpffustjb2smbym8ngk9xzhrp88j7ex3xqxhrfyuc2825h5tml9nezqwwnb6okqt7qxyczrog9byo27habs5w6rq11gac3ahwwur4kr44kkolw6gd90zulkplihuk0x7cgoto7hcdtmk8gbijhxrg76p9yr5y6yzp476gwgpfh99r6e9ws9szdikuhwgys1v8x26p0y5n1ifibkplobqcv5xysmfhyyni9cylckm09fs6eyntjndn5hyrseni72ilw5js8x2tkq6td6zi56u6tkevv951s9jjb0j6mopft4vrq9t4jvps4n0bkl6ayldf9rs0atsup06vl7c0ctbi7juzauit52siyu62g7jn8iehql1w7tat3j0m1murshyy87tfm8sxyq04cfbw2me4v666b2aj8csm1biedt2043b98gczsrxxv6kn5r5fm1x0j24ctclgdvpj2m1ia8z2aqsclorm3k1vxzyrw2qnf55xgcv5cybgkh1oghi2hejsxg93qzxzq9twig96ozg44qzvhrcowun1kox74if7xtx268efun4j9ssqrlo3obnecnqhyucaulu83afkljitrxi2959avbzvf9kfxqubcnt3lg30nysozcv8cyallk6r8xct7j2iourgqmxlglqhf24s0e9a0mu1zdjrrnpo8nib7w58a01uo7l7hxkifmupzgioalz1qo9l5x74q5l1ay80yhoguxnhqqdrvj914qn1h9t71zsrfwef4ywwuztsqgtrsr62kttteeg8vab6xune5fkt5gifryzd4mgxxys8fewmzyegi2fjpo3axdtyzps0vqckd0ifchcvp1cwfgp7scmh3gpc2x1uz0kyara901ps0aodsv',
                filename: 'cage28pcwt0i65iyiat4isizjbyq1hzpdr3mmpc1epv58cm34ip2uarnkc5wh42siq0wbxeqlzo25dx9vzeyw3upmaur28781mq22kgln9d8464bdkgjefj3zlmiuuilr6lku5i4zezd1i6ezd2d488c03nlmqdcz40t2d909ysp2mqvzrq7puilgs9vz8h6x5ygrhnax4lw9vbaiuv8tlm6nvh1pg0r0i3gwvgu6b5l6qoloxhlpz07515k02ts',
                url: 'g3k9onotpyocqxfmpei06idxbg9v4k174jll965ji6poqlv7lguvzir5r4ouwbe8jzqqo7m55fz4utrx60bkpvpyy278ufkw5id9yvvfh7hz9atg20sbuewbb96t1p3zyw5ijw3u23kiycuunn7ao9ll2f79lexyibprajfmtnjobiafgwtm8g3f2lcrafm7in3t839nakquvy8fv45a6xs6rekbohtaz20ptyywkf65suermblkbbz2kyppb48dsmsgz4qk1jfjbfw53kikkhal1qzx91etn8ghiftiuj7uddhoqybh38evzf7ymk0u258bnhy8zy1kb9smaewrjctbp8l51bj2wnm50luosynzdodkdoir2dv6ykc3ftzvh4yywrbmt6cwf18y8ifngc69nji4z58925vz9cz4lgzbzoir36l3b0m7oefixu1m4zje6b4pef6jns6qqbwnpye7fga8mctz0x9m7ad1y347w21td8gy6t5q9p008gmjo317wesq29k7ki446aeljkjboian05ncjty452z2ta58ylmu8pypshqc78rurs438kdit205wqfa1la5juaq05mnod6jid8c5v1za94dn1r6owvez66a63jf0g68zdohc0u40eqx6p7aymlz2wj8i77z2jxu9x9teoist6l5e9r1kfvlqr1o05k44wo5namagq38b6nxykwvc0ius7wkm34mfmcjleajfs4sdds3fkk1ihzttawj2tyfa2n73sx26kmne97k759va0qcaubqlgie5ud98zq49hh6l5085p4d6288yotayjj2zawccncm95eqsod6l4jgsy4ikhsqhqzpn497bvknc49bo2lwcjpnob9yazmtynrnodp0gjmbetfc3224bxpsjuiwr5jl790nbkkqb17gkjzmq72tkg74pzizjjirft5oklkzhx7emhaalfrk0nspqsmhvxpk80lt2bdjix84rvxunxylpr2yvdrat48wfwsvj9gyc18n',
                mime: '58og7wxkkb47lamyly9ct0uyf0fc09mo5ufltr70iakqqljesb',
                extension: 'ooel9xn3hxv1yyt5mke6nek02ols1izkk5x11ukw8uuef7x130',
                size: 9472848399,
                width: 895511,
                height: 312853,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryUrl is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'dca69853-dad5-4100-8128-044596042508',
                name: 'dk8hnhbtwrhsiw7r9cntetv59vd5b57s5tl20dxmfl3031k1unnngfum5m58g4scg8eibdtcp0p1p7vu53yb21vxamzveu1n7repjq2bopso6i3b6vb9qdl402xs0ejx32rrveu3aab8ai8dyadipnz453dbg2myur2w0msc17ecmcosvvwl76eaqgbu5sq9ivuv3ao1ic5v41njahqvaakrvphsbmciyyjf44r03z3edxs7wqnljxtnv8s13s0',
                pathname: 'm3heqnxftjbbruxeem77eert9wzmgqm3r0hm3bc0fyl002xe0o6idw0l6u767fgswca0fsmimytf33j0pqv69z2h60f2l0s6xlxniuesgoqzmbdmaaesg479b9u8j7dxamgwysone6z4mrdmw5087zfchqm2oza4fr8wu1xpfm0bcnvc7fjax66muszj2y2nac7g07gwhn62b2qqeo6lp0hq9pj790w6hsxn52j1gjryznt4lyzkh1u4u0qcn4kmn7yebn7e24oyxen0c7o86c5mr2342l6j2ie5hwm7xqdv9fhypquo2jc7iuxmonqa4gzqaviqh8r2k3zvwaax2nnsb2ciltyldx3vabp6tul6dvkjuilntrtmqnk7f073tcnaoywh7v45twyrrmzacjhzwq0yaji5hb9y943huqxjbhy5q8igmygt1yt4wez2pxt0s7u1ilsb1nj8zzx0rkqjohmn7nva5k84wgmzlc533mnnrb4esdhgjgalew0r49f1m5fai8wheery6hgjy3qytoakvci8qk8b2o3j4gp7kjmpdrsa0b6m7l1vwo9uxmkr67xl5d1y2x2yqt7mh9rzwjvk9iplkwyp4iv4inp4ra4lr70litfmy4debx8t9txvsr3hhdknzsrultif6moitboklgwfjw6brysb9hvbs4znr05efomub5j3cr1h227dv4d8y74ellhxu1ttqn0ct0tevogwyb6q1rlfyuuos7doavl6vyrejgk7e44vd5ierozf3czgzlm2q5nmpe307h23hig9z03qnxaq5ywuxzzb4vu5zjbbgqcqjlys3q9se26n6n6go28glrmeb0fpf59jet0smz1pji84eq7ln3bzhtktxmsfqzt4i25bp1wxfrw1q64jc7of5lmzxdyar5s4h510l7a1y5gu0mf66ocoasv1w3zh2wkw7074nk67278lq0i7ug8bzbxl0dq1lheffym7feuvd2swwjd6od0alvivpw0mddfy8oj5',
                filename: 'jpntb880o0hvm03uf3iv2q8b8b34ex7x7xqccmc8s9flgkfy8vvax8qbl77m70urrf3wjadonp3bsailgzcao8kg7jdw1hll8gwan8fcj4hoj8g4wak1r04ui1vx2o9lfeuawa6vksfdwhlga9bp5z8k6ui4gug88xstuxllkzifo12tokuhf61y2svglh13lrbdez4m6g6wcrecu0htlh9dzqeg9ol7w7kac0djn4tto6o8d3151br8oczp07c',
                url: 'flo68aodcszf4nmelws2gyz0bd5qsuqgpkxd2gtpiz6r29rl9dravtt9jnnudvihqrywrwwiu15099jn10j6p8ho9o6j04nsfbzd4jdz27g9lrb3y68ugktwntccdql65hu1pc92uc3b80x9zpkm2z73imwrkdrtnfa96l63ekflz6yaultsn4qaiuuhttxt0nzlbof4maotl1qcfpwh3wyd9xvhhogv6djn87w63rxlva8fgk38skynmzc5do7ylyyt1dgli5yzag3119qs6i0ivy82ubz4gqmq6cvbfd76fxmx9u1iun5c53lt19qpsy66hvt7tjhsfsl861d6a7y0nva0vgu1s7rbtt30takpzqqz3mbczerzhe1waauz1yx5hadha0ea4df7wrnkmrdfjw3m6d657fjhb126a7dmpr6os71txdwsuampgcasxjh1wy18dw87zq1wbuy8dkhgf8ho3eo0z1ow67raqtbariuyikrco8v7j25457x8h3h8xotkoe5argvfqcfeuacohz8f4qnef1mrqmcgjqm894jcj973rinuj6hd2sf9duucgti17a2jq7ur6b0r7kt8lcr86vmt19y3dr5q3olqh1jgze29otm9o4c7sc2s3tg20ygtj62yx23n9s6ibbhj9zwylbo983ac4zn6nhhjow3wwaihym8ro9i31qntbs2ehtg8aiijelijiqd0dqau0hm9epwbzj0o5nbb3c9d71ihjvxuu6huqy7ak8hop1amllwcxs6gfa6iylmo997iheotf2drwljus20edy5us9fl2hx27n3t1jf2uo2zp0lc1gpp9t8sb0iko2nvrsmv65p7qn9u0jaksdot29cj48nu1xkcqvd7ceu5pdg3w3tg8ma1zwgt2wsfq1mix9zmtpwul47wd4f4kfqlaju5dkcrqntti3fx8n81wk6gmjjgybzzzuote9hw5v12eqhi74san1mluoit5uy07nw1qmjylbvxm9d3z3lf61cn4',
                mime: '4n4bul9g0xm1kqqbhs9odf0z8w0zyr2b82n6y35e0enxsd34h5',
                extension: 'a6gq3gm5csjzq0u7jqhqoqa0nj7f3qre9yho3wbmcs4hqwhse3',
                size: 9255474785,
                width: 669499,
                height: 106050,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryUrl is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryMime is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'dca69853-dad5-4100-8128-044596042508',
                name: 'plb7z0upvprbi41nsky1uvesh5xmixe9pxd9ozifzr6mwd37lbep239sqje4x4p500u0turburwlygu0b6snbnnn296mvukxqybu051vxt4yfnuy2wtnsksm6db3zzccgalkc5i3bfsutt3wazio1bgwup7u4cijwepo9aweu4kxd2apsqsh1z0inllez97x21nia7377qwf64jffwnr9ke9jqy6f2w2fgyllhcbxe5bs32hh4pfw8plpg8xebh',
                pathname: '1wemfkvhhrtjy8i3lk757soype5qiyqfvr2y31544eqa9ga6hlpayuqzc7ivfv2pt3hgoeyntj8kbpl56sta6e7czb68g9h6w2knsjmj775ms9981algv5erw9ncfhfacjbypvn7d3kv4s5tn2caasvx3ex8253ysa6h8zam6c4rsrmllg2rtx4sgbz580vyfv3hy7ggyktr02cpfqnjoo7n9szrj6onbijoj6jj7wkfvzgo2571g7gjzzez4xq2n6gmeghgdoxeq9lzck70qj9ij22xfroxmmfzrdfqolg3db6c6hre7sqrfpdlud9sp0vwkxjnuss0bexvn2rwc5sm6l9mwgpfvjpq6wnp5k975ose1euna6du24w68jqdf9t54imqjjc6491ngo0fh59lewbkokgjxlajvhmzphge2v3lotcbkguln22stvm57ao9lic0muopscsgzx48bzprqd5byhs7b9l9j2jyirmunyjbc5wl342r2cxhbqypvlgg7zso0l1gutbq0n6bfpd5qlazfxww2ba52awxxgreplj3xsre6rvzyx19e9k6l5wcx4scs6unlocc2ckd476ip69vsfu88dx07tp832x61tx6sezicc50bkjprnpg9u442kkdcwnzvv0lfgzij9um0h4pe7t8hc7h83lllcdp1m5bavkder71yjc4tt472i9hab6nkcaljcm4xzozaxpor29cboddy3nbg2wr5uz6t3xqyv9e349ukq3p9vbmi5o7cyn6ik4imksq2symj6o55cgwxkp1kan2wo27lab1qj7scqxyhf6bwith3k6jvzxc3gbh7q7p55zj9ccglv2y2voho6xojap6zpq3syse8rgote4bie4za1zrer9xwjds9tyuhnzruxepk741ww8rkaltwod1j567cszmvbqrcbwkrqbjmq1liu9v6ph8nhaxjjwy9moth9eludj0zer6vcvt6to929887p6283z2wu4t0f1yckt472wft7ck',
                filename: 'ny06uxz64ic7uac1je50505ermjs4m16pud49xr7ouh5dxuhixj9iqzdwj7qyr0vqbmfy0f0u96fw08a5kl6tgiynwknnlzem4czzk8l7bb161j43v6229k2v1ye9nk8lq06jra8i1k7ljmquaugd89njwno4p9703olh5ftolfpmii7r2po7hbt2z46bh8w5i00jbbwhhgx17me0ak3lmjz5vtnnxm3i8q7ugv8wu4uyc2cwys4otnb992ibtl',
                url: 'crz75fsvzs90wh1n1l3a9hya86uyll7ws6i46om0nfcbcrwfuvkgdim224ci96ukpcx9h6qgtx2a2jrn4xyfyp3gxjgnzd2lefrzisilbihqp7hvuxrp7m3yni0aeyb75gv7npve1wnbww1rumdctfoof47ip92nylvj2e6vr6h25nmw3kbtuhgk542hn5umwtcrax9oshhtrrbj7m5advp5fxz1xzlby787eautlcuh8ja8hmqq888b3kr1jciohldn4hgv5fse18gqddb6luwigrc2z8w2chcwpyyx5x3i3blyzaz1vefl1i5oxyknu3q3es0hxpt6c2yojh01g3dczg0x7sddoz97dxn3jevavzzxed3mofy2j4qb83qk55avhke2uanaip7vsvgay5214ye47zqzz5n5a1tm5svkksxmpq7wvore95mn4ea6yepop663ie196q93vcqhrp2ju9lmfvqtutnlk0xya7rclck3n7j02h23sd9tsnkz9bf2we3b4x4inxg5mkftpvjtdzeo7vhcfaidpzjrh0e6jpy436d4uxnj6rv3pha0cdp6icmdln39jikbexmxfm0yrog9cwn6hjp0r2sw0www8maapxoihmjh6gyf6lkwjia9dpldyivbjt5m0gi79tn5q5rmbul86malfe6jqgfpf76vr6a7v1dp6jhjrijmeetka8mrafqd493s5qqeyyr4xvpqjh9zax14zuk2hx3nawsu1lderestohszg40p9khwgh73ko7sxpa1ez0nougkbr233vw8gfe5udoajszauvdlyzuwyv66nt70ulh0e9lx6bnwvzk9j7eblrggd7j86sg9skjxhw87xwbepsyqygebabma510ysqac0wunl1voamaw05s3gb527tr5x7eqv9eo36uch42puxu30nmp1jkedeomfghqasew4m2qdgqpojz08r0e4ikl5kn8371jezc2qgoai65yd50wwixtedirmvsbjfbqfoibvb8u',
                mime: '4jy125uau0h3beqwa3wy8v5fj5bjxte9esgpcnookvhlu5ux207',
                extension: 'qhyrdw198hda33pwgcrb7bo2lj524uew1w71n8exnyc5g83k97',
                size: 7707996997,
                width: 208228,
                height: 433670,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryMime is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryExtension is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'dca69853-dad5-4100-8128-044596042508',
                name: '13q45nywbbxmerzya5ispisdqqyrzb31ktj1foaynhqfcrvkmu6f9e5flxvdxi2gdu4xeg43xwelpex0n6bpg7t2rue891gb6mo3hirknnrwo1qswczq3fimpt81coky4qvhdydhg94e7r1mfg382csydyx0hs3n9c58rq6lco10omt2paq7fqzyt6vtizuers1mkhpayh5glf6llh18fhckbqharzssn89gq9wz8evpqno2p56ekb2vbcxu1tk',
                pathname: 'ql7fr956x0ugboer93waw2sa0drgmx7jqbysvhzl8gd6f8yheqh5ela35fhyd9svf5xyqa13bpm10syryhgx7yoz6xppnxlot8y39vdz9lf11bjb6wfqqbshvafjgm0gj5w4m5zt16tqdfacv28iktefh0ls4e2y4drtj7xi0r9x7zny44osz1hm8zbn2zgcd0w4dzdwzdwkaipvlg3ksrc2uvjlvvx963e9ljzs6atfzk907g4ceoa2cqwo8922wv4pk6cxarzztcjt5o8scpce5tmxzzni5yxrzivor1r8ccpu3dfmpp6pch8k51sdtog2slywtdmq7jc0itrvl5a0f8z02113bzpdwiujwe8m2qd9zdpj1d5vy7j59y4n4y7pt2e8p5pefee33vr8nse0urernxdd295cqkfwy83hq58ymfbyzot0yxjzntfetbo7824aawt4p05g5th2ihrs5o1eroguy2cr6zf01262pag3vf7y1r30o4ra0gtxh1mlv9pw7f0adejz2mf4nqfxdcbhcoeytxjcghsnidy1kg9aby3g7oy8hotcpikpzp8eag1nev311gowxp3pa7xhojbx0eholfn4d4g9e580c6t8yp7e75wa5lii0ag84resqo3a9jgwy4erhmodzis4hqwyx2kx3q2znf6kgqt6bw9mi6quwsttdpgravaytk1wwkxkc73b02mq2h39zt5k34b5ywbhle0kbr559tykmybyznz2w076pcg15uegwtih17s45tck7i62iaxvu13l78eni0fwbagrf4fxls790pcyuvq45d54gfze5th5q88fkigxu11qll2oe7387g7yien8bc4omqhednmgo5z9p0rcktbh9ycnl597xpqim39xwhi39o85sltgmapur88gsk1esx1kc63enw3chh9vn957py1q2fera1n9gn32uv641t9no13ibv6fitwq7oj5h4zlzm65elworzk6x2jattbhev75q0r7t92b9x0j',
                filename: 'sk5l1ywjykd3tqoa9t313jn5in12jafk5o8v5qsxljzfniylimkasq488twsrhi3ud6rtdraltv0saybivtg03unyz1mpgh1canw5fewhuuv7a3p2q2iac6ers1uxe2sw3dd15qisqk6uxgysmumogb10ayhuwx9o0kpq3p569fri0y8bxldsmg7zqd5bl0gx8k3ym7uzde868u5tnrueo90k40qctzopkpmryacq9ync8hn39j2bfe3fmii5oh',
                url: 'ldlzbbur3ejquy3iwtxprtfrnbyaqibj5iqx0ozbx4drn6k3uiiytri0197l8cc6glygkgu1drvh6xan3hllqemy1d6u2kl1ytkrhg1u5fo0p1owzbk5qw9g7xx200kfn93680y9hhivl1qhbz429ob83gsd0t9fkbi90jy62w2ffh2hi1s2ltwo09cjo2bd9ia9ob6o87mapeauwf2w133tc5s11o3v0ikdjjhmxcm5ma860e3z2vzvfbd02e2772oy7zlsplrjv5rosap37zb3ym923b1y4jb5648bpzx7gpz9zel9mhr967l4v0t0h1eer5y0moyskh6mxt2gq8yopyvn9y53t3n8egw6717zkwwru2exvje8dp5ve7i88nbu61a4rqd7zs6xvlh3q47h7b7k1tinha1jfa8qfwn7uexdmdnv7zhrmqjhx2z5e600aeljin6vmg89m1nwgjmjt7m75wlpaqeip5c9287k8ywgs3r77wooyzl671bw34wlkhhss61xszshphwadkk319y237yibvybxnp96j5f6mbuk3sdxcdalst9kpbm27dwcua34lhjw2fv3v08ltz13g0rnuo9v9r4li9zstrqelvt255e9tvh3zcwx2pubulkb9whqoj1l2t9wa1tr9rdiy5znvydiwdr38gsj9xd22wh931qeguup1dpje5rndp5cdmrx5gmz0iujg3kpinz268v2z6d6015xf9erythvhluu0vrd71chr7a7khvsh4f0ln08nkaohbfkzy3oywdwu34eu4kno9mlfxkrne0hr4yczafm08r4868ksmkkcaiap49ijzs77gkuc0ijv3wmjalmqrtyqsuwtdd7ay8yrsvhm30ktyifg1jadpolhi1o1k1hkz8x8o9hqv6s60ajw4zp6p9s5c5ujyrzxs3xt9bd3xw7eukobp9btzkhsvi98t0cr54rnyl9apo3h8gt95jcteh9t342u66emqkenrp3t35le256nt1ieov',
                mime: 'o85xw1oq87ljl26vakvw0j5r66ib1q73pv2hatfpuuccyf0eka',
                extension: 'c2x7gz2q977z6m8hxv0j9xcmnm2227jfilerbgiodgvy60oh095',
                size: 1966561223,
                width: 812957,
                height: 546889,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryExtension is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibrarySize is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'dca69853-dad5-4100-8128-044596042508',
                name: 'z6kexltv2gqsq8buk55xjy7zo1gnburu5nrc5r5blg5kp50jk1ki4e8k086c1mzmhb0n1psdxi9bwlg5tclryzml3ly6binbquy61bv95sdey9ydlzv1zztekgagv43ko2tdlo95uhlgiyitb0jlezlnu99yht18dt2sxi27qfztorxwaqq0jvg7pdkwmzfon0k77b5idffxx6ydtbni1mj8ylo1xnsre6o7hfm03sk340xrtlnx1ujiozibuxm',
                pathname: 'kq5v5e5m14vd44ei2rcnrsqx1j17ys84c3a82vn8iwfz6u1zs567bvpx1a5hb4jyk21dwwrhqt207xtamizls9m75rblopnrgig85qm1gm25vd8sskflqwmspbaacu4vemnrnz8x5flm6ammbx42j5fx8mukl7d7quj5wcfg6k63d9vsy3y6ujix1jro6gqqso72yz2djd01enodkmyqutjz4ljy8lb7gl4aithjswjrlzcqg1u8gnn29qyqaepog3bjyawjpt85qhwg0ne342xvxte1bihd5sr2vwg84esa5s0dgxz9xh8fcjrpumjxsj5tligozpj2fnaugl2iz89z9f0uci3qwz7k6pxdrtyj4oefhxw9yuuyfrkpp1lzqhso8pbwo7w489mp3ilcmxxmczb8r5emxd5j6ea1fdqjiyuiu4nk7qu04iz5uyc8bapxwy50eafsxnv35nw9z2n3zbd7xbruptyikmtcrcnfjebgozbp8a1flk3ir2t9a4e47fns9ga9yqt3t73rt42bx9oz8ef9rcem53pgvb1v7j96tho868nx7j84sqcmw924dmsbpqp7jjrypkuwu4k0spra5kiq76fhpcwisf1oiv2izmiblpchml1m2hv4win9w2m3mchkw82z21637727492oyougoqxlcmqmk7ot9gdcm5rreivnagh8ym9333i968c6jogoy226smwdu22ueg5nyvn3zrt853g268b18kj8tg6fmg2pyp8lzwzx7d0amfjab7j7geskm1uwwv009frlc1fq464aigxvprf6ndakwk6qf8otlxtfz9omlbynxw2xwei57xln2jicd1gfmrrr213plh5gns39wc7qyspxq7xvbzkak9f56jkn4sevkhw39yk3dd6f1tk16qsoni7ljm0uak0m9qr6hfgdfyslcrq2yj4pyyyssicu4mu17543podre012r63p96l3zh33eskt5t1duqovn7uc6eymn5rjnxeiwoi2p1y1',
                filename: '37sixia4ukfud387cy8ve8ri2n93vewyl3ds40pmmpcyauwskrxa7skqm4dtdao92m3jyd6wc7vmale31eru61d9rkjef1ceadgw1xuvjcyunc99q2nlibkrk7ppeizgclxv089j42akwzqh8eyhd9eazoozb3r6bmtuoitcuprxwnorrk5sm99u8lsq90h0xv0fy7dqzs76bwxdn4mvj59cni3bspl8rk8osd2w98dpex8ihj3ee6dsq4c8xh1',
                url: 'fdnpq81lz7tkhgi72oxizvoou5yytkhkr4jj1z5wdcqxpu3lhllmvvsyrq9l5lbm5sl95q00lj3xxgthytlqcov004qfyoh7gdyqigfm1pkcj8v10lnjrdfkb4tlaytyci3vreyuprp5sa5m1mmnb2k3xg9ahpkgg8th7o3j4yuaodexzyhf8fsz2ikyei5k7uqogky4q4blf2kyz4oe4qm0sbb43aqfg1hasoft1h60yel4din8aqdee8okh41mw1km8nkodsa18ixpmyyca6sbx1aq8d06yannn5o8ixprr12jho37cwnvlw4tr6ehb4hxiw2g6dp3729726e3g0sfgvrkg1r5rbwbc930z5hvtvqa3jsujy4kja4vnr82i5liaopn9366hob3d4vpbxfwizwxxanhtao7yiogexx132ej7nho7w67g8awjpl7yl84nqkre4hik0do430iw6ucar10j3dxtpnmre99k5ne97z45q58vxhc7hpsiq78vnn1b895my6147fci1n1xa5v4hzskwzhbys8s5f2e1v42i5o5shcokxucg0xlvk0cga6m7ogsxcu4s3lezb1dq236d0vdel9pn5kxhtixpf2rqi1v8mj08wcqevge3wr98m66e99wqb6mw302m8dgojai4szyf8mjunatg6lnoar99fmo87djvnwfeessut44vx4jz2bttn272t3r0lu13brci02ohmmf2p2rses8wnlu7oqzsl9ueoz9pulcf4orqr1v212t5p3m7ie6zb5f62bccodnriu5ar8iyuvf8zjk0er25jqmpcekwsxp8tyhfa15s3hkskb2igf2jb1ca4rfhu2ymmvfxqc5pvoz2dv2h4ecbddnkanld3x2q0v6dfh6ae05k6puyxdd81dcl02o8pm97xjqqnzhagdtpuaql4m7ifyb90aek3ap9xo09p4h0rdsej1sh0jsbhiu4d3d6nvyyfk2go5scfu0irlkcjcuv6z6dpwnvt4yrdl',
                mime: 'e8of6j0grmi5of0cmw7qbt1cchmmu6fth3f7r08id0w7r4e9mn',
                extension: '91n4q5mcjrp3lu19jjlky2rs6tzzb26s7og1iynczyevgjf2lc',
                size: 10424107741,
                width: 284598,
                height: 577413,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibrarySize is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryWidth is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'dca69853-dad5-4100-8128-044596042508',
                name: 'juj3jjaqyw8jcr4yh86t8jci0tjntre9k7ev1t5lntv6dsdhbdoq56jbya4qx94ba0nt7ev3gaw3kory049agmnmiwzlh9irpxnmwjoik30s6zk52eq64wog4vzkd1ntuffzw9juebwph6a3rk4bh8gezns4fmfawx01qoc2w50pebtyt1ex9rfq7z4esdvmbjjl49egda3opdanugudtgtz5ers337zuh7hw4o3j11orumu5astpvxkg7rr9z8',
                pathname: '8dxpm1nxxxuno4o05hck140vclrepdcigp4041ziijsnegw7rq4pxbsoxf38pdbqxvgnm0easazydrvfnk7meacq2en6mllc9lzk9zgz34d8ragp4qcw31m3ogy7rvl5gj5snjtg6bs7uwptld31bs8pte5jiftxgqk4k8wlee7z905dofeuoj3f3yipdjnv3jr3zuy676nw4hq3izziqn8dibmg43w80buau8t4ft73fgqffnezpjoxkw64t7xtxbm9xh9061olra06kdpd3bn0km1p5gu8kynnfppdbxlyq2g3zps0ye7ooyy79c30tfbaynxg0s0f49pq6tjcgavibiipya2sbylfddu9mminmxteetcso3261psbprqp9qi2ld2aemmv2rk30t7lxdc3q0nx4z6071e2qp9ywgnqfkc8kvw0vsnhcnmg88t3yavl0fpia2ug2ghcthaqc7fvcufbeqrmujfen5mgo87vsxcnpilndfewr7m2troh6amjmttm2sy77e8ti0tew5w8bmmqlp1g6nbl2yhp23j7v3q2sxp0sbc9xl2kjs4zbzb4ju52isu81w2khrgo2hqo3bligt6z3fsm3yke8m1mwp78cm5fo9a5l7wrlul922y4wcoegg4rhytt02lawphhjkcydmuo2snnu37ktt5l32ncfhnvwq96gymdd8ed9k2vckbxl8vldomcbi4ngx5v2s6azd4m4fdzneu5fni4oq7b73te5ecobhtt6nfjcg9c4h9bbw9sdm2wfw4vkp8nkk77x29fhhy7wm5n6cmk073piucayhphoc40zmvrzjbc0e2u72mrcyg0kkycs25qz9840yn38l1dgsw1jjts71g9tmds68gempy0pk0tij6n0583py4y1jqz8glf8p036gglzhlxdj7a9288cev1f909dn9r0s7uhlb942cfh0h80e0i0d2ykifckjx4v9ihiun8yq8mhosnkme9cnfii8abcwtl8t0mozs05j1c',
                filename: 's9ku0zhl6oyrd6we9hqbz604iaa4hd1mqu0sx82p7liao5tl9l9pdnk6xcznz09lz2vlwn5d0wug2jxqdgquerefo5gywhna63t1ucf9nlyex0v9btmhee9sq85p14hxcfrzeusnz8j9rg5j3mvmysuzfo2u48mfe1yuipiw58sowhasq5qm4vbgi39k75rqvb4nsxd3d8d34lltgfmh55negnyvjejoa43r3eiadoakaydamp9h4whtw38m8my',
                url: 'hhvjvijajiizivvy6k548ip5xu6m4p4k7edntj4ajsah33jliptqklnw7wf8h42c9zk8oihc5d29mn7lijcl8eheai8ys5yexr8uoa4x8bwposw0aq0d8d3drlvhefhyyyich45jfjszd6d0ccd0m5o1ju9ehdah6hn62n97zc13or7cipoioqad4jdqtg3zrhzxzzsw14bzendpmkrx7aikv0ntjm8cv1ali2gwp0qqi5m2487cymtmuupu83fk9o6vslrl4llzaqrejzmvrovz0j0s4n40nsem2kn8dlt2pyfdl7pwavox8d1gp4i1i2mtckkrecrdq074w9kjhu1w5p0bj1n34yrvf2c05ghcy36ng2fyxx4tq05rc86t46xm2o6r0mtafiu034hec4a1weewxlvzg9m3v3uzgvooimwg4c5vho5yx3ahwxdmh9zcm4aji6bi6blmney186y5681onz0l7sukz4fmhwkszfh3a71sxi2khl9snpr0pg1zm3xbw5pz70fha3w1jbcs4lo9m3cedurxwocx6rv1e4mmgrfkh0wfj440mdtbb2502xxcb9ydsfs8hf3qcov7mmi1smpvzowe4kgmxy3dkd820j9pgh0nj8dnjlzdb8lnm22g3kmeh3svkatcot7v52ahwgxlnynp5690hqwieotrc0bb7ve9sb2dgmg5h0vxy554ctjr6oajj1486ahtein22sh7ijk9lq9eladuegudyztn5tdvku7y1zes9efvm3xc8p6vwtq636aawssc9wx2vdwc0akbflxfwmiymkt90cekfm6jv0v1seyg107ecthne1kslhff4jtttqe2lv029bsfxofg8pvx0qoo8c3pe7vpo25x1w8xzyocb6w8onnk4h0ijcc0xb8d0otm4uaqw5xdk4wic18r12vsx6ge7snatp0kgm2jyjm5e9vibld7h62ujj2x3amzor12jzwfodogxvcea52913c5y4n7zi6xa6ocu3pt7r3n',
                mime: 'm1sj37wwqrh4qzsvytn628o4qik3eghimtsfwei95fgkkv73pl',
                extension: 'zhib1rkbb7dbtlrgstaxn6x9gr1fyjgmbfscb03vsjmlhy4s2q',
                size: 9423588307,
                width: 4095555,
                height: 540880,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryWidth is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryHeight is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'dca69853-dad5-4100-8128-044596042508',
                name: '0hihhs5p8rc8u0c52y574wg2e7nvh5us8yta788fg94nvygug58ix80t92owbdqk0fuo6uonxpoap44ukf6nvck35g1hkuzvorproyz1ik9vqpnlofd55znosseqa81m2cchbux3z5l95b8fug2e59hzg63zsuor4r51bdr7kqw81117p7k3w2ijg8ubje7usffud3y0h3kkxz7e33569y9m05tgfyte2jclkark4o6947tc785mrw0mg0sfrfa',
                pathname: 'gk8jsmyatyk3ct3pxqrwz65sw0s99s9gppt9k3ol7t6ay8optt39z8ik9mmm1h18nt1huptyqpjizt84nj5x5bo1u5c98daju9olby307ltm6qyxam0ejayk13quoyitkmkzcfl74g0v71fmrngkgd840tuson97m9gmmidd3sp77f8nkjwsq58r3gjvol0bahygx8wgblaorvmhp6idkmeshrcliaek9k1el2anokq5rresd5tbwiin6kwp68qllo3rq31ipnz9dolkkqpbxqbhb6243a832kwxq7eng21u2wvwffz1y626aakhst9bcf5cyu8h4taho1tb7bg0vnk0sdcfqys6o29b39omtr129a2ul2gl4potj2bfp4qid9r3w5tscu8ftcp9iujz74r3tg4ua63l66106drb28gxulcz1a20lyzbu4e2ozwfp3nb20kvrf7ndx5wt4rn2kef1qypltyjof1liwcxceff0c4aajgm70aje7rs0prfmqztt01zvvx8bwrmlw04e2zczyuo45xfr80ft24jpwh5t7s267feuuec6pn5p95uby8c8udfa6uo5m8yuczsj2azc324ephy0knwi47i3v8o3gguizh9pgcyk188oldlpnv4klcpkiphl1cc5vmqq2fuljpar8ymd5ij8imbkrij8txaskkpquigac5gkwg4q9pri5z8sn5g3w22ri356o00sr29xxarpfpzgqkyedaaiuw8m5kg6bspmn38ijcxfwni9kkjuzw8hoxis4wbhnv4ycjz0xjikl9abyb29bmtexnwi893vpjv93z7chawf2yz6jor5pdv6tzl9ne55zxxe2mehvrterkpkmyfgn7sl2qo9hzfyrjxgdgwfm7wsfhu8rtawocdcjl2n4nyqey4docfqwm0q95zp6cn36fscwlhb8w2ap2dcqm66fv0m1qj4clvz9s9i6zeyo2goffj8bpwq1d0735jpbll1hor9n3bpt078ssuv3lmy2s3',
                filename: '5b1730kqksu4gjhuq8sdxi8hk2lr9btnv72gbz4yt86yc5dnsdh295cfv29cd35ppzixljnqg4gctp4el3eo8hqygxw1b8ftkuw875yq7smzci0cgp4gkvr9j51ardrxcqz0lcimtmg59h0ruf9oky3mgrxyf4ca2h8v5vkyxwruvv5g9fjmcnw9s6oswipvbg6fcrhfa9du3vegu7e28p6mjw91zojx8xai02l9okzw1jjhg3xwl02pxgzjdv4',
                url: 'xnjsb6vvxuzy0sjoqya99n92afbwtr8sc1mygh15wm63dd5ij89ldxtzs8cab7yguol8hvy9kx6vephau7iymk3qkadho2dqclcoh2xzs1iw5xt8fr2001qjjxcy0sfcxciqzaxfuqap07y3fwiqjodd4dzs57ze57zulsrg5uzxlbx3zhi57cevqim6md50tx57stbkqrq10d5ken2ltamnju7g7f6hgxvz3a235xbbeyia17rce3dvafh0ygfell16csbyo8sfqt0j8xe2mnxawdmyweeogu3c73fi2v67svy8bqn0j48dwudzfwb8per6k1gj4guyu1mvuf2rqltq0kh1uosasf9hbk3l6riv777vjoev78012unfe1ibk8042sh2y86hys0p5hy7v4rvqxdc04klaq5tzmr2u47vjp680io61ianergy4ejmw0fnpkz5dses7x01xysg7ywv3kv9bz7aj66adwqio6w8ibuwkumzbas8iolmj5fjv0rpnz8l0jli947dkts7q8ee0ork7cz8ufcon0l5axqiz0u0v90tjp2c525xfx35oa3ule5ca0413odwy2z6qnrok6p5moy0sib7s5z34prf1y13emzdwix1z1rqjdxfqedqz2rczmx2obnu5x9frwfx9147wswwickk9oyvh86rg6y78mskhmyg0r4t53k12c48tvc0526nh8rrqlq9fs9rld2xl5x1tjatk5fj0yjciiupp53hnfdw71majy0b5c70l4ut3p8s0xxbc5adb3r6m01yw0m78ght6gxceqbj2ot27nt7k8oivezml43rc4agz6kplad8xdxjehuvxun0hz0zt931j8syf4eqjq3iziz1j3zd7krsnw4gpb3tfuxz41hg6lsblsksorn4ky7ezp13jao5h45wa3osmf08ijmqimo0im1ubwae4lsx2fl9j7ry135eqps7c4ecloc6xpplr82awrli6svszcpb9a25ztxq6xcrjfnyfq7v',
                mime: 'a7iswg4s1bwqb0f8r1stwd9e4ai4a1ku6pwesm3v5kjjld7mir',
                extension: '109wcqvn97howgn33ofuuniozuy3n63p3l0dhfa7cifnsh3ucu',
                size: 6638915858,
                width: 229917,
                height: 4497555,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryHeight is too large, has a maximum length of 6');
            });
    });
    

    

    

    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibrarySize must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'dca69853-dad5-4100-8128-044596042508',
                name: 'etticbak2glp1pdjcixat4fonak0250foodyaiz0syvvx6w8bqymsqrf5752g7ghr2btadt8eamq1y2uogxctac5yly034jgjln34mxsgtiz5w9prlrpmy6hexr8jr76m14lrwxetphykyjer60m8njh0lwal8esdxdrx779wpat2ldghjogpn82as5eq0tkv795s666nzu87id4vt6e7qcyuxsy3073pmy8aimjag77nj6eq655qqyjk498i38',
                pathname: 'vox38uksosq1b2t34cji5lbq2uxjpt3vg7iaguhqx1lc1qwuxitywmuzvusyaxtxeknckj6czzfdgrs4my7e0cqzjd0o1chu0hvsnkcj6qclrrlaqevo8v73723l06gpmcwgcw2v4amgwpr9g6yeosuafpvk10z0txic4d68c6d7snyvs3vq20zikntf91q61p57lzkjog50js8a35ep8pb3lt27nfdiee2f2xysmsrzl2e99ix2hqamlzxv9vtqxdiinaucg14490097yopqhpstd2x6ud9nj2jyqu0oxrrlxedb2gqut1c4xufr6ju93w8yigoqfx2fc88d54pqi1x5hb74crlyw82x8tlv1dpk6xcxlj5mutpx1ja8l3r4cjvnrhftbqg9zy1tjlhvs3hyavh9xwbctr2kcz9uwbr5b6rqlkuslsyfa29amxgxm59ol4fxj27h0nsmnfwnbrqwcmjkg3jxsl8jz7pm6qrjsfun0ot3m15j272x8rkd9zvesp4wf2dovt2if25pjq549z54cug9aklls01rke5peh44d3q25i77wukpjw9keq1nqxl4mp70x2a2bcifnrjn5yly7h8pqu7gpf3tbjw9grx6idvhv81zcug0v6lhrjmfs3e8qp3yy2e8qc3t57xq7xexiw5aela4ud4d0gcb155quf85ngh7hbaxris339vbxz75ovx4zu24jzvduvvso19s6isay47q0yzcvn23010im9bksj2lmk717e9bvx0cvreelb90mqakvdt3m0xll9xpnpg9nurgg5uarfds9ajjgn3a8fpskhjdst0ylcuizsvoj3u3nsn7z3fxfryqyy92g234zc655y4ep1o1e3jpy91h1zb26m6wcm4k222faf3vj3g0jfm0wjaphnio8o7iagi1xbcvplo9jdb3krb8vpe9n7ba4ou0wv0v64f3crv8j79edtlo37nmpql6psrglx6qn6ctzykqh03th7z8lwd1zu7scjrtmlf',
                filename: '6i3qme0480to2os5eehmjru1rnboxqbjyldvh4a5pc2xz5o4tnawfxiyjyn17gcwdaed8ovrytztabhg4k7actslha6h4p0a6c5am6vp0vkkgnicj0a6nd9xouxm19b2k5a7ip6ofbbmtm5uyjyy1h7jechst7oxavdufllj3xcu74hiuuwnasr5oddr9bjvs1fzjplp16qzle529ijjjbwcgbhfike7stb7xs1p3e4xngqm3zaz7rzx10j9bll',
                url: '1yf9j5fr6bxbkz6evw7szuamfc9ys6mo8fxwtseiuqyvc5kyriy74l9n45klj3pyrb5pyq3kffs7rd7vhcnink8teqgzu0qgiv88mqbr6bf2fzieyfdbmnang5x637o5ll8i10i8k07kj9o2f4u6x7g5lbr87cra9cwdwvizjog9fuo75idx235frrgc2hcp4103zfvkxmgqms0etee62rj3jsrew2tamuxc95s7usyjx3jbycgk6f8rxq5d9zx74tshlqfw9nxpmxa37kkcj3od1fxnzgmvkn6itwc2x8ohnhzgmxmxmreokg29bezz1zegxtt0c08ir7g873sioijihw9jh9f6o2742mcwr2gdk9aapmu92ieqxjsyk49tn8d5rub6yg9bebm6wvqzxajqeyfam7jzyzm1ioreef0zemkezovd1ijiam8e9ioejp8k4q5g69csr15tttr322gzq27vjsh17k2acl2i4i6tprrlr7nwu4me4wy66r6hl63bi0ilvldwykt2lgo05he08pue53vwepqo5o48ma72h9bwxwybjhnqtnked9pbuwuip6rsgp4x360ab98zyz7og3eyw1ycvgof3wpgeocykveb30pzmk208w498lm5ik3er67a7z7rfugc6cnrj8ft3l7axzy049v83f87720lsn52w0y0rgk5n7j6mx09t9no8vg5klfvw52pub1un3rxjjy8b1nmpbsxfxwjjcm4jp77sk3rjgnll2iqke2nxsvuizwvjirmghtackn87kaxqw7t495t0c9qotpuxuu6kngbfdwiujb17cvnrm5yye0nclifkxyzalqa7l33x1oh9lwzb401z2ihpg13scn8jf07dqba1iusudgldjrgg7hl6sw5i87nf3yzepakhf6w888w93ohqt8mdeau65p1ivo51pajwb63po9q5slggal9538j2ob45sd57ip4shwq2l8nspgry3mwqlp5i32upu4vhbpur1j3szen6yfx',
                mime: 'a0tix0bq4jo33jy1e5iv4colb0skn9ve0p1sjlknvrp2zmlp0w',
                extension: 'pxankx7b259f0bnorzfcoujq6u475modhptphyhl6ii4ls9owm',
                size: -9,
                width: 379863,
                height: 794387,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AttachmentLibrarySize must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    

    

    test(`/REST:POST admin/attachment-library`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'dca69853-dad5-4100-8128-044596042508',
                name: 'x0g6cc13vmfyvh11iuzysu9ygcv93rkh80y8gls289zeuvx40rm0lcklsb3pq2yqyhf4glzkd9vjxlzeyyys4zaljro3aew3daizld4emorqrj7pr6dw4oy2rs3tdnev2nlxr5qc3j3qua2vstlduxkzrxw3js28kxnxuymeifinf3rpqg9b5w80rzh2dz2ne31n8gfkb5swjr2qgtibzswutyk5jpn4ppgv99d6mleynpfw3r5y1azdxktcjpn',
                pathname: 'npr8wwd6qo7e4r5081p1um4stn3plkil0mawjl357zicr4fkl7uxrsy6tp4a2kso2hgqsd9l9z5ndby9c9jti8z7o867n7olxke3l46637f6uhy0rcwl2o4usyon0k77ae1f7hvnjabnjixvuswsec6mcmo6o9h7jdgvg7ic77h82rko4vu5ho8sv27hl4rrnnaj0opwjju0dodli6d1ytp6vol2rgoa7oggru6ds9abwm3pir92nk57pvjle2qegozyf2b7aoqytdyjtm5c8tla75nncx4qk9u7el72nt3hrv0x6ovhzluw2t0hkjy9ihfka9nvj1l03h9qffsat3zv1apke8wck7wr2hksr7dgfr7b715ncw9ylmnn51c0tv77027levq8oazcacru5dfncgvzcl2i7bdb9xajoi75u2zx32kb29wjux7hp6gnded3yk4cvyclb4xcew5336rqr2to2klbf9b08pghegmfaa57jzpgrl7ap6vi5dzsdsntep56zjutqukqz7wzb1mzre894z4sa93p61s6naioigs05jofs2sgw4tq09hbkjg5oy8tp9rjamb9hlclrr9flhebujd7x1c48jgqttl1v39cje3kok85095nx58lp92959nov4c5ljtv76u8ok7csa321vtiylujt0u8ht7kq75k0ev9etpfuegtxewrm8mzm8owg7o8oyf2muqslj0vfyuuzlc32cdf9urxwuet77oiv0h9ryzjqsaxhvnphathq8lqolwlpbzrugdyd41vn29nf5zuwc2r4i0q6g92lg3tit7d8jonsfcolo8fxc793i48hmjaowwxwtcq8sltpwubmn9nz1bemyinxg9rsdal0iuzyngk8as1p3v070mgoju14wgcjco6rbsx6y27nu30nwsrehja6wofi0rzhdhuum2gix8ix55tyo5ew6wns5fus9rvoz8ih1n6j4yhf4kfeziangv0ba0ortydccvdgm3zyjjk4hnmihe6',
                filename: 'q1ixha6vzal6jk25ihtfjcrnwdye44mcgt6xo7eyd5ejha4w4sjzp9uotdny0aj0e0vs1ipu1sx55vdjbbd0edieoim48ocpfc7e9lr86xsgcu50dnsqiwhc2udbkpr5zgp58tentcxys1ewfm00tmeoxb9s4d12tl2v3bo48ngq8bjh6ujeaw7qeawrkegxbkey1ugxpr46olkh9xeged1vorf2lrx65e5fc7d1hyxdwfv58yy4ils1mfbt8wk',
                url: '9v9pocfb78eqsrx3q62hwrw142rpy377ntolmvsw6cs3jsbgsrzhiyyybybu0vazkpblorjkjuosk75qkc3n62dcxpua6n818pf7eg5ngcbhdo6zrdu59mw917w5ue4uol354lkclj6fpsez533hinu9w3pwzbtxwuc58wu3dxzd51f002g71ccgovktuthjvxn9n8iyg49lu0nb3ej8z9b1ikn3qz2q7m6186rti7hwwebfv7ykspjuajie1gj39hmpna5faoadgqzel04v7z3bppxm2olso64hobawmfo666mga3bk5j8cxuahsteaznp0kobbmtogb5nszy5r6gb7y18ebg7ffdr0ekk5lpjatlw6gp6r2apn7je7ogcc0p3wl94rgbii6ugjitqin4j7pmdcz4ifbsxln9sc6b9bueqh1uatj83gc35bim3i6ocu2hzj8j24c66mi6ganvich0l3n8flo8bb1hvpbqcbe1hiseifo22zz6hnl4ii09jf5kxhhlv5qq5mykxzzg767girtu15irj7uhtx8vxsvknrq38cssvyc6yfhsqyshiadgm55j1r2jm600nri6cnt0why042p0wro7r5t2ehdwt6e0rdgjre8k7uje0br08ycc9qdf4pfztn8786mfkilk0sissnqtf512rb5y9if8abuaf897khm9gsl1nxuqmacitxfyglq0gt4hlbh0terxmxfd5fw0bnmwtv7az1t5hqz3wqtjt3ouclvyjwo1vquoq7zcvy4urfrc40z739ld0gkuonccb1dsxsy1fhchf8j56l6toi93f55jjnjn4igoevbayp72hmwjlv4yy8qu18mpgi40bwkrfbwrgzqvmqsblibou9eu1hokonaectqx8of3rmjqvyrcropo4oa840jamhy53c6vj6ipgcq6124wygtnv81gxx5yl3lglup6jn8k667ndiwnd5txe7y5678lqj9aptzi783vk4kaf2p3ayd2el8sf2s0zq',
                mime: 'wrl8uw5u0pfpgi47ferrbuho1clgp5bjc1p3e3fz33lw3x2kz5',
                extension: 'oqziwowa8p1x47hsdw7hele2iuq9l8mlaxkusos406b3x08mit',
                size: 7727714284,
                width: 924782,
                height: 922060,
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachment-libraries/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-libraries/paginate')
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

    test(`/REST:GET admin/attachment-library - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'cbc126dc-4642-4e3a-b92c-dd9e5869ba9d'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/attachment-library`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'dca69853-dad5-4100-8128-044596042508'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'dca69853-dad5-4100-8128-044596042508'));
    });

    test(`/REST:GET admin/attachment-library/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library/780b0c9d-2a35-4a78-85fd-c9612bdc5135')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/attachment-library/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library/dca69853-dad5-4100-8128-044596042508')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'dca69853-dad5-4100-8128-044596042508'));
    });

    test(`/REST:GET admin/attachment-libraries`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-libraries')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/attachment-library - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                
                id: '6d4867c0-5ce2-41f0-83ed-1ecdc205c2f6',
                name: 'j18dwd589d675szqs0pyompsimjrjorqmm6tr2kys9p1gw0mfxf7jbpxaqsv6wdzzkgsd32yoz5wrfy70xbgpaiza9ckyya2s9qkoqblpbq80sm96lgl7hqvzpb4x6l0xdxvvhws6kaefvvlbaf24wx8defh4id7b6phar4ujbfm8qg4vfq5a239oen61obdfij0wbs7bd4ky05gf1eczw9za7kie0wlralyved1jpccr4d0t01kvqg0z6ynalh',
                pathname: 'jlp8mf6ni27tm0jhzs4t7lvre4rsva6xjn4ku3ev46fv3s0dbr43vbuhjxwlma5ptayyl2e7xyvw9yvsu14wy6by4m1dqo5z4egbs4n87w3gyddcsjsr8leasna9rczxy2nrxhwvklg4mft5povrzla5suq9m5qkrg7ofwd7tq2wmxwoupgxjuhtcgiik8ylzvzj9oef6juail7bfwxczpc2ds6np4jr9z3wgozetnxlq8kxpgf0bh9uhmzxivdswv1sd3t3yoxrkfw2qv5w3wy2b1jk4sviw04c9216x66n0z56b6z697ad6d0higm33d5gsr0vn2vb8nmfnb8m19dpyyuvrgwrrha9dyhmy6q29oac5ch92wyh8v95raqv128fh43wbsilj7w76f3lm45v0fub5p5syrajdazfpefc636qzo6bt5ohl21b1v5tkql9k8rr2mjc6mvkhlxlkz37fjbv1ievmf623up5aox4vpanht286c3hwmg4x9a3ch76vkvpbyl0f13x2lhdgo6vy2uqcuu1ashpl2j3rg238b779ow2hepacq61vzckgy181p64b1myc7cx9yzmhkuzn6xr22ay4qqnilf3sojjn2cw3omk6gbizx22ye5esegvekeaiuk0s57l9myt5yddrwz1w9i5ckf3nwwsop1acefdcazpi2qbc25b8r09joby85zyvqerj5q1rr9ribbkv8sp92kfehknz21py569uiw7mnuk95vpq2i6i4jwnt5kw1bi3k3z75nmwqyfqy3svb98ax9maidn8o7us4j2vdzw576jmrso1dfoxrr96karkv7d01cpclyb30ndwwqhyjkrj742jhhek6ubghd3e51mwmq282p1s84dj4s6ki88k2neq3yxwbwtulrvpx7v41ap9kirw1g7i4g66pa9r0grjgz3n6k1vklwe1ggveveksse4egrch9p98qu5j74ytvwqvwqc2htaytv1ejdm9f0po7lnkyr5454dhb6',
                filename: 'abggjd8305woduk4klfc08u2vxgu8ib4heml7r9u60tmcf005dtggnyzb0ozl8p8g60x0hitn5fu8fic6xg6afbhzs4j5u2z0bx9s2124506z9trdhozvykmdwwl0697ea1uc2frkn6etypj1942k62j9d25le6ue2ptgqm3i7am2sn95cqtaa8hu2mfu4rp9c6piztitlb7cr9tv46nmg0gnpf2tq2zh52w8go64i366bk37iqdq4nscmzx9f9',
                url: '9scj3qm4b0vaayahdatjapi60h9tioflnynkinda7fnwcril2ue5915y5d7z2pb3ejf83i6og6qkvidu0is6qk1v2bd3rb49p6pxwxkc2axf25k3e150x9a97te4k371guf0uv7r9brmap5wfib44zgp6urmjk2ehplzzd8ldchgd51lm1jqyvjy7ed26o15wvga7hoqo790rr98gvhrz69wu8dlmtt3rg7io3829814lmspw6be7q7bflkjb5b03fsirxcdwdbrx1voreg9e3danjvlx9bhhvalvfd2g7g55u34qlmqszopa0f1j6kwik1wk4h24iio91hxkkuadvsek7t5lr431vbvtasc64ycd7a4hn1sp7khgjjl6jguufsjwlpwy1zi956djxelfo5yzyik6keq1f0wra19zjbqvh4bwrzwnntm1xaqpe9tkkog7xh6gf2whr8jmoa0xo22oqbdh60qt4k97gfwclm00yakdlstyij2bjl5saf1vfou8tk069anis35u5p851heo940htf1fxv6uvi89h9ayjnregqar05jox026rvjnfjgatp9wv5pqx2qpy5vqj0mhngfk6c3cqzasa856xu1fqzblgyxjz1gp4w9526mq5oi5v9fouri67cn92b5okyzswy4nzc4piged5m6ggdord8safa1s54jncj87kgakkevmegqblw6dxf0pcvuurj9801p2iewdunxh0l5n44fowwqid5up7hijfgy711vlfsn8gg4bzah36lzz2dnck49pjq01tw10yuaq09qs3empwidatb2nk96qdqd29ao6fkoz63iuaxphtcksy0ste1i3qzbj8jurvbefrfmskx6n3wdev8s5wt6ue2me45c35tzy63pqrtxnnix74xpenl19iboh98knelkq2y2fddqomabcru46199yb2lmabojvhebda2kw1htza43rs1669llzk8wblmr7bqh3xeboyg090s18hzjjc9t8hvtur5',
                mime: 'uxq33raqtjq39h8bs0396vm7jzm86g922m3n5ai76xclf4kxwq',
                extension: '8juyq5eo7s4q2mtt67zir1x94f50uhtfyde7l0rbqnyas1ykxr',
                size: 2743354533,
                width: 525520,
                height: 536679,
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment-library`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                
                id: 'dca69853-dad5-4100-8128-044596042508',
                name: 'vckpie8gsxkv8qx9wphn3nx5bis7r64j5mj70vk28jkjg7yrkp0u9cpuyxuoq9dpbeloghg8avk3dua564rliwxtrzleajyxku3sofckyhrqrjxip4be5ygp04i3y5o4n4oq74h727uoew2ygxoujjrfmgf0yxsh8lj6hbyqqt76ftucxrbqhitqclgzktoow6wjbocyn1n98b1wsliw7efqn5m0jw3esij972oodw9xneruor6rspahr8lk3xx',
                pathname: 'lesiuhox7qumgzsj70l0ho9sp6obt8c4npuwj2y67ioj12vknfc5psfqj7lsl0gwk4yn7hp4wulz70nf3cxo27d551d1i2h9bbyformeh3tdi9tqw7n305y9m36dm139l4gl9ijo9qk30c13a34rkosz9f7u7493ojcbowx3ooj1epsm9kglz33vpf3wg6kop2jo5vo9uk504ku9fr7dgxtgu4hjqv96oz04usfi94gd0wig745dcg224s45198rqfa8jq5bkoa6tq7dwxt79mwyw3vqcvst3im23pmeco48mgblfmrzn6ekw7vugyiwshhpufpip5lb812jxlfhvexwrh5pfspotfcqo9zbyvxkxossq8c9gcm7zpye8w1qenc0ix34ji4cm8w5wumarzavwqdmr7yyixn430jhd6x569wnj92fo41zfjaicijagpve4miucbhv7cjm422w24vmq10ki08b4osmvo3ln3r0phoeb1rj9j3vuz5niz90g5bhalnwz5zai6nneueid5q6j1izh0kjyjrybojukb4rdohx01t1pg7bd5np9fmb3txk6h0pgjpapyfg00rwd8o29mlavi2jw5uq5y1eppiln6aes7q4w6gu9e9je1z1gzkm0s0q5ny6jv8fsgj753bx87s3tzfqdoxugmdfmuwfi8sxvhbyu19pirfs68q0vw51abgiw1axcuhuu20r425qqly4miol87mhqelcx1by8b20jx599215f4x97k8a09sdvleez1e9vnud5t96j3skbecbzsnm2ilimiqgjiobr2qkg2hzy8ti1i421f8xnqkhv8vo72g3iod0kkgck8um9vrujfomsgupmq3zsjgob5ybmn0gzz0ttf4tk9wfqn9d46elg691ihpo4m8ku9f6urd13u91jq03co9wgnov5ru47u1ferbk2208bmt4dplzvphmxlj90p3q49dax08n2409tyyomyk4iy96lz2911d5yrupcc64l4abbv6w',
                filename: '2ro6pmmz6eom1lint74stlth0bxu737qqnkzuxdgxv9rh8s4dwk3l23ujx93aod2x5nom77cwpp3ggntqujf7khdpoe96p1lvlfaj5wjvplkv24zn61xz2xmlj12ec6gj3u4v1oua8pq9wb7g9m366gux54u4gun2039blfe0leijjnclyb7fxpaanll1vt6fnhoz06k0nwap0q6xjxlspg8bm88a8kolnmhgsva0wu0aw9q4tgn8gd7eu8gtzh',
                url: 'ot4g1cizg4dr5yoyvn1ggxphkcvxbrptzwr17lwsc1ckg8m1sxpu6bhfghkhj1owvuu7yvwds79c9w39ew1of4pii5js6fv0i3fza95pkrxi2a0wov07nuae49axn30pwnht0aodbqy62h7kmovyst6mcd3r1jd3ccudiw4sdy9xyutpq871ualyo5xhlb2lfzj9jjn27f7niutibolpnchx2a3j9s4gls4o9jc33ytn5gz4spy6j52ee95z14zb7y5f47aqgaxa5wi3esu80e3myjd6bwowef6m556fscqudogf9lxp3vwr54y7a1cf2j5jnbv4bdu7lor5kpa4qslvivqeyw2hvp7jhgoqu0hrz2di3h0nrmy7hm1562yh10w2jpf749mttp5am272apfycl14wmropb2o4u01nlw2kxvda2pzhc5tsfxwqetct0l3gfp2f53d2qde3znxnp4pna86wp1pnub6xs8nywdayipiyxfd9hd1czxc9a10u9objvlkk7oevvo4o9exgxeh3xrymj1vtr1n8hkhg34h2gnksjyfmulgstbikgkhhfwh8qc2xv98iblin8moa6d0gm7khb8864nzpfrk5ayx42tfa0djhlnojm6iz1tspf00qdpre89i5e9nf93fyorohbevdlxwax2h2hyetrvau9nyvt4jhg7bhksr1z07bx7zmlqhzc92w5sp9q43htm08vh6fv7inw9r4ua4h4rxcox7zeq8kez9nuiwlkl9sgl1gkdk610vsvcwz5v0gmj7haghtukg03g0d8lb06i4fa1gant4c4hwrgapq8an90fz9nlj6t48zfhi49ql5gt8e9jej95v3mlmjhz3xxinukifpb2c7harj08qubzkbzymufvo3riy0yrdp7xlghwyoh0qds6au4bsfyk0rm123fhfcncj52zwpprciyt3ris59791ueihcp9wf3efa6yly5fwrufspm2e4la50i14ju80jn04a3sz23rkz61k',
                mime: 't5nyzjdr192de6tgk0kw1xd0pwv4pwhqxh6v78wpyt5na57br7',
                extension: 'yq70af2ixveb9i2ci6qyoos6hxa6ycetq946pxsu1egggmhqge',
                size: 6020445694,
                width: 527929,
                height: 683793,
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'dca69853-dad5-4100-8128-044596042508'));
    });

    test(`/REST:DELETE admin/attachment-library/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-library/49e4134b-4c38-45e2-9fc6-16dafe69c8bc')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment-library/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-library/dca69853-dad5-4100-8128-044596042508')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateAttachmentLibrary - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentLibraryInput!)
                    {
                        adminCreateAttachmentLibrary (payload:$payload)
                        {   
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
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

    test(`/GraphQL adminCreateAttachmentLibrary`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentLibraryInput!)
                    {
                        adminCreateAttachmentLibrary (payload:$payload)
                        {   
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '45321025-b2fd-42cf-9d86-dd8289139b3a',
                        name: 'q0uvt6dzxejpw1d6x6ajtebmhczfgmcbe90ypdbtvzg8qlzc5dk8daerloubvl7ocqxhubdzoyc90c304o9md7bxe56jrhff7i60hug9pacf881ykdz78vq54q33cperkpmreqy51pkls6vpz110eynwtsmhouv5m5o0ct7r25n4e73s4us94mqnmcybgg9epbiqallrgmmdzomazrsgujzmvv3vuhi2bqs0d9l6wcz7gq3a3mubqro4xtwr6ob',
                        pathname: '2lx0afq2ql80hp4xz2n8y7k4ykmi0do4l2sl6geqllisx0a4lqpxkakvkljogb3pvlpgc2f52eqm15eolw609yh2yf5zbdsvgf07kq95z209c66j186zunxd5y3etyi64lsijtkcoeagij118u9dygvzu9tug9tootyf1np2y7pwrhqttma1xmqr92cijf4nkt5ajjvinhfc2yi1fmseuqftsaeho5t4bmumiwpm901c865f2zosah1tt27gnx8gxcp5ai23pmrjckefq2gqkp2hy99edbgy7vmlutoboxdfzij7wgq16pjjw0q2vpoqcu6ctu4m1vv331vxtbpac8actgzsigs0ihxrbbmsh0vrth5c94kc8veydcu4kaseflc6f58ko8faygv6u5be8nsyw6j8rtmm45w5nehfs74n8zgyuhjwbr2piu8bvw0ngio3s5p0n0brkalrpl4lwigk0tv2cpm2axcbcbpsh9iazks2yctyldq7mrrfhasogvc3qmkg28fobvyqck269nok8h60m7upjmoeu8sdrn05kt17g5jtxd7iqge3tb552y16v33liby37kwew86tgzgotdcap4bqr8ekohlokzngnk8fb48jxq5c7u22sis89ns4l6b3t27tfx8tm3au8ki5rm48xuanwlffyah5ydhkvstqpuraopu8gra58sxcyk4ifyvrnxytxlw16ton3rtogvqxi5mcqmqzpy8xwiakgdoji4afg7407xk7atfo84ietoitvcczgissbiqq0beaq6uisuftnatu594kjm5emyekey476n3d2l216faer70fr770w05nm8f3tqth5nvvgqlkjinzbcj39dgqvxxu3twn9rikar9nrw4je45494hegdc6ewrev2fe32sa65028bsiox1le6lk1sjd3atv1o2ydxq2tis2kjocggv58ca0qgowz1tlpewmmpdyxq7ktdzaa18i9yj6kl5jlsjb7lh1j7ur77brph1om0br',
                        filename: '1jskxud33qd7c2zrmrnpwi0uyyn9innirjzdc5r5f5qe6vgg8gquvk1ukwjtfgxp5xuetv0od17tiz3h9mvlrpievf5ipr113fu68s26gld8k9fy96cgjmyw3ng03hr71rjapi6zs5rvgq126x2qddhd36h5qiwllcf08tk3qopb1jazhhn7j5drgu3tvvk0walmux4hb68rk2w4bqo71zt03dnp4ayyyvfkylzrlh2rz3eo66anc3z93zb9vdh',
                        url: '09yh77taua0imhdvkbar4p244ww7el2vono1mucixltbqm17bcebh5xy7ghvo3xuek4qmnuu437xzxg85214zizdvgqogg5v0p12tjyvtv3ci0s97h6shs1pr6ze9smnnwzsm6a04a5xog4rhacz0609xkrj9xotmg0hyyn6tnz2cxxuryvsan8izsjvd20nz5vleih79rp8w5ya0mgnvjzfwxm0qps81m4iohzo222kua9l4eo71flmrb60yaq6jb50uw3v1fd0zuwpfk6fbau5yknlwz1ejji6pfsagub4qv85y6x4513d9qj96ira6pjew8m9ljcf7r10uo72v7mwst4kwioszxkhrkzw371by4vdw8c0vbyzr41wsqepoepm336trqfagltyt27dyre8af5broipbl41n3cn7a5jcjenlpnte6qy4zadj7nb0g9of42vb4fofyzwabw6t1rr96dns4q9nsys5ni8jrnmcdwj8frzj071yuvby18zuxj79cpluhlka05xbj9rvmewbclgib1cx6rtpiydyjfgp6yv4dgw6phckrz50kzcofwyrispyqmlwzmybh1xe9wewrj34cznk64iybse75zxnwm47r9io4nslupvefr5e5ktb3a9lw2qercj2b37g6xk82afvc6pjpsjljufauzx45qkz969kcoc5orvqoh8mosdspqo7aw9gadkovelmxlsqgk841ne1jk8eqk1moyrxjv43bl5csho1mt0btwdy9bj5odm3vh5whd6wz0t58k6nnd3adurwnhbad6wjxavuba1om7qqw2mshwk0no1925u08n7dksg3qgnabtovwecoedc9vzhz0ulrrrhb8tpa1on9b15a0h5977q2erx6x0l7soorwmcshryyn8zfv7olcne46xbcfaynvik2hkrfmk54zrk3ldfeb0jiq8ichgcltjudita1pm9balle1shnd25wot38iou6j9kop6xbcz9l7z61a3fc1a1uqbe',
                        mime: 'aqemojo2ko3kgk5hqke5kiravjt7ylbvy9md9heljkdugyzg96',
                        extension: 'sdgbputj6qgcr4l09sletmmj8i8xlkxdrv43io8ohldvmm46o5',
                        size: 9576954669,
                        width: 258235,
                        height: 232765,
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachmentLibrary).toHaveProperty('id', '45321025-b2fd-42cf-9d86-dd8289139b3a');
            });
    });

    test(`/GraphQL adminPaginateAttachmentLibraries`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAttachmentLibraries (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAttachmentLibraries.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentLibraries.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentLibraries.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAttachmentLibrary - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentLibrary (query:$query)
                        {   
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
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
                            id: 'c67db843-7050-4495-b1fc-1139fea5da66'
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

    test(`/GraphQL adminFindAttachmentLibrary`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentLibrary (query:$query)
                        {   
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
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
                            id: 'dca69853-dad5-4100-8128-044596042508'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentLibrary.id).toStrictEqual('dca69853-dad5-4100-8128-044596042508');
            });
    });

    test(`/GraphQL adminFindAttachmentLibraryById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentLibraryById (id:$id)
                        {   
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd0233732-bcf5-4305-9849-037b5cc7525a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAttachmentLibraryById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentLibraryById (id:$id)
                        {   
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'dca69853-dad5-4100-8128-044596042508'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentLibraryById.id).toStrictEqual('dca69853-dad5-4100-8128-044596042508');
            });
    });

    test(`/GraphQL adminGetAttachmentLibraries`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAttachmentLibraries (query:$query)
                        {   
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
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
                for (const [index, value] of res.body.data.adminGetAttachmentLibraries.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAttachmentLibrary - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentLibraryInput!)
                    {
                        adminUpdateAttachmentLibrary (payload:$payload)
                        {   
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'ae24a6bd-f770-4f5f-827e-49ecb7ff17c8',
                        name: 'y8g3gtf2u92ez8vfhqd6unnv2rt967a59yw44pjzh1xp690cvnsez7h08f0g6kinm8e8p9z05f3y5gos2q5op3a3acn55jgiwbdcujlm2aanm2gl5b6nw6l9dim1uz16zne96z57mewa8jrhyd5on7g2jwmqe8xswx2eqjgdinejm2pgzotg0ayh2a9yfkvnlfowl87ztsneuo6c6mwkv5iiic6clqqujdebbbrkb1iscykni1459bvr5ujuoem',
                        pathname: 'r39n2foe3d5jtfk4814qm4nn1q5cy3ojzlta20eyzg9vzwwaqoudxsgq2fsoskgj2chotfzxaph003v9eyjxcxmdt1b7x9k752q6qi4txybuader4nj9oxcliggl8hou3w6gl1tf2crgpn7te8cnpypyv493hf2zritl4vv4r037qyrk9yn4pqckg5ix6vmy350w86vdqumvydrozhuhd76ehzomny0qq91p68154o4pjmxek0ed5yhmon9l8h503f7xyn6pwxgcxs51mt9n23sd44nvjwdk3x6ynt3bnu7ikf3h0ef0xxwuad9mnc4k3duyzuxdxuj9j9eokkx6tt1zp4f955exay3zn3o3rs7p9imtu9y370yx37xtluo8ruydslmxy34nstvcy0tq68gdr8ixnrhul7mkgtmmznzf1o0ypyqpqvc11186e0zoe2wteybpemd5580tcuzd3qaky8nmufgn29mtrzfcbhx4rv23ebx3958gl615a861qvk27tawfk5wfz6yzaaugs41uptfvlj4j59n4zlglbph6kfu4ijuerjp1cw4vuaqjv6od2uzesejre37hr9k8dpx33jt7qe82908buy5wxfcovt7c737sp5l42asdib3ew6av4grj6c9mmz6c79uvlt9d4wuuxsfh1whsptdy5oxa3ys47gb71a36hzs2n9ky9dpf3zdu647et37vayfepe8x2ksux5gq5wdbhvpy1f1ygy33svu1ochebobjkdxfic33v6msdt0ibdbtp76k99uxuq9glwyj1su0hgp2jjqbeiwiy9g58ov02sift4gsitnpj95hh13nhbp0f79bb18ip27rbhnlpb3t6ydklsgcf1af9qck1acsj22c9xrq667pm1zili3upl2sezyc0aerf6f3xi8b2c3lexqtrkemkiwdklbitkaq9fxoodclabrdalljt86aru24z3wj0f8jdum50xcytmh1y65to5shsrn5dug9h3zms59w1y1',
                        filename: '19fu2hnjie012r9ylkyofyk80j8j2hyt2gtj6p5qa9cyzwj1cyr54lcqhk7lcnxpb885ncgbmjy7u430jud5bt6j6fzj2bo1nwdt5vpd9ke2rx541dt6nvmv895x3arcow5wg6yemfj4vdei4hvgeqxbvua0r5u0anvafflyo3ww4r4fy5b0phqk342tt4w1bxqp1be38suwpx3ojzgnbuk7kxm6euk0df0ajwmbv4b0ottdq2kkxqce6zhpxlr',
                        url: '3yb8406p97x9w7lwgc8mypy0tdrqyhctipcsa1i0rxsgtof58wabdht8s63kyowvh9tz5uau5vj14fky650qbi1xvzjnyvaywvincsqp1gqiogfp5sfab726fij56zgz5lwq0uryz833sno5yd07jyu3l01kcwwxaufi7yuy5dvx130dvpruwe1jefsrdfxgojqftjrxwc31zqmlw95tfrk1voir7zippknu0h14g2rgaijp6bpk5j9d621r4jdgeqjp96isxjn21qy1xvpg6eywp3wwdk1xv8xi9kb25fkw46qi5t74puhkph4tmhyfv35edbklcq1bmu7mzblu6lo5b9v1p9oe1ied329sim85v0fiuyv1ajmfpypp4mafi7192f0h2eks667l8pcj6k8252nwry5w7h2pq3fbbner8hz5koha33kbdsvt3hmld2iwvfl6e4k8lj5k5ojm0ro20ucav1vw5kr3a8sxkjcupzhhsebp1ybndf3ey63moxst7s1hvmbsdmkhf75e4qdjcpz5tuodd2nbgwa85hqwmncd67loutxbdlmc4jabzq59xffiil9h3ynv43n8rhp5f4y6qfub8atzmcduv7qw5g8hirq9zzw00rgnejtuw594tequb785vr4pubhl4gw37eizpipn84e7qne24k7z5nj5zdub8gt33prvxnshwyngifrwep0qoswisztbwcgipqpaw18ktpzhn94z8917ae8ln7l4ef0xb6muqn5s0zpe9kdphb1wf6rqgms2afo99hvxex6ube353nmrymhvyepoyihdtxttfv6hn6h2p7zjczd1e3iocmv04ek8ii9fi8h9kjr8njbjziaw0wamt7m8rx87pk0si7v3ii3nd1z9bqe73t6d6saydhij1qdn6q2ryoc2r3exltflc4iwl67fumanfluahlubq62mxfcql856c0x4l1v39mrmpftr05i5l3jkwh2gwng4i2bq7ryszep62gh9jiklhv1b',
                        mime: '8npcqmeblsz95lsrwd65om6fn6lgdkiazjn541nv6em70sc7g7',
                        extension: 'tc960p8ra9ijetxkyg9x7sh21znb1tkadtd2jfk1tzqt4zt839',
                        size: 2733088138,
                        width: 709496,
                        height: 712881,
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

    test(`/GraphQL adminUpdateAttachmentLibrary`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentLibraryInput!)
                    {
                        adminUpdateAttachmentLibrary (payload:$payload)
                        {   
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'dca69853-dad5-4100-8128-044596042508',
                        name: 'udv8ftkz41q9swi0h540go3444m7tjlzp36y1tib60g8saxkzw7qdzz9s2ot03f4979d7fa2rg7l3nfxnv6x4l1m84bjy2f5ebuylz9u6ukn2b9dhyfdcbrhfhkhaeqv8xeweh6ts8sjlf26nm1rnywxlo6tpbpfetwclwjc89xzvszz23bthndorm99fvckn7qzifrv7nt72b7dokkktuwzaquyghogwpr1k07v7o69zxp9v51036nwej0u3f4',
                        pathname: 'ljtetaazweqmaana2tc2kcb2eortwgshrmre5j4pkf70zstgf8akiihmlwrh6lwm09lo0m126oqkavxffqcdkh4m7bxs5g48sq5mivdue8z3waxagslp7u7nyh5sdg8f3koh5lblw5v07s9prtzzwq1e8sj38k716vbciuralx8kpggzq2qtp0tsg4uc5xnfpz05htfkrz9jiafez7gh1eddnptaewsjbulgqsd7not7p0pxr5e2my6jjwe3w4g59e9tt3brb43ge6olv3w7inb2zyf2kqfr48i8cjc84nrh5dcyyly8q40vmcyk92z2obrsmtyciu34oglu7waidptkpihrl39a3uetuxphnu7wjpyafxkzc9cu9slmn341qvvh556ko9b8fubmd7ibi9jk665gloqr9qzeay198zan0b4jd07mat1mww4p0a6avkzfb2c8acxx4ij4h0z8rrjadgt9jkl7evf5079x3ppr0493kmd71yc9j42gv7m4qu2b43qiemwqy8kuxmj5abzaab7t94zq1qz8s6e6dvibgnwjn8p0uzwdouwk9o3yzdjfm6w0v9l1z5fcngpbr29kdi1fvjp642cma1pweqjnn5e5fkevwrpnrdw45qhizqc62bjz869r6crd0kdgebhyyo12yibh0nhdiouy7dle189bp0zari9oo0dpfmsr8pd96vnrenzxwgtkfmmozn7u0dno0ykea42v04wqcqkk13fz8usitpb46braggc0f6wwnc4hg8qbvmxytheqz5vsqobtcb9zkq90ugibpbj3bw5b8us1gl75mis7ntxelwygj8feitansri1lqor1rdvcghhhusyawou8wrsztmofupyxy22733tlg7kkaxpo2h9wkyc9zrm5ndfpc1f6k36ne1twgs2tl6gfmcnpudm4xegdht4grtuv3d2s42xtllj157noggur4en1h2whtxpc7yf9z1ujelovssrhzna2etjtoj88jjqk728g707',
                        filename: '8cb28891mqt802w8ao9abglwrn00j55utsild0vx88rctbrtww67fvnnv7hdj9nv5rfap2lt9wetir0hfmae3xk46ddzltc935rmuqyocm9bld9hjq5lm9vf9tzpapfqts4gklhw9vc3m8ep4hoiojh0yd74gpoaox6aye5xpjs1403gxbmlkzogvaasr1vp64apwfb86stfa6m3tfnm8mcefxjx0vxr0fsvjbbg6e2bzioq1l3aciynr11cy2f',
                        url: 'iy3euxce2i0e3u4g9i8ylpl7txu9c94qzlot63nyopx66galoke6c2eo6sq548ho57ok7kfgnajeiex3ne2ir0zzjc6ul4r7wlxvb1okn34wts6tn3olmgmchdw8rpzef37mz07ggmt0sj425ldl8wcmt20e18kwqe7biwzq7b9r9ba5ecea4ui9jel7n6bfdbkqws9qw3m0m7lxgngzxedkvamyfh2llohiqmq0b2jezumpnryz72wcit1mdo2uaczo68tr4j3cahvs71crij1wjmwqv2ihjz0gf32xwj39l100jbgbz35x31h7x1lueqytcsi6om1kwn4ize3pzpgoloceqatk66cckithcyvalh4skqgilc0eyu7gmk7jh50gq4xjrun9cvdqiv6k1hhq1f3schfyx5uyze0bi3utar4iaitdmyw3ift982dh2mkvksl1z5qzr8g7cwymnw5ss27ah5o6awg7yqiurb02byi55l8041nh2pqnd3ntzx3oqnykncou02fdnaeor1ev4surdivpyrzhsnfnf77oa2inm34r54cd1tnuocajliq7qgzk7tfwd3c8c40qwl317abkhdurzb59qd58o80dag1xbi24k3evmglkpf1huhpdgpct506jasy7axs2jtto6b86si8vdm071bepai38j36f0thenpk00mb8cotc7sbk3zgbsj3hocprj1pagrqoanz0s8m7thvrunmbe2ehlhl9na2dfdhzueh7sbhjm8kwjozo8ag7ulsanpqpnmd9sy42gorj1byrvbolcfmdo2r2irxwzulm7tlcts36u4glyeh1n2fknxxidxyi5n7yluhnx1p7oq26zul05iys46u6h6gtttbez9cux39tgexcjrvlkz7flz2c2s62us4yh7zoj6pukl7vzla3osekvnb4ja2d4f37rir1ygx1s4on8qqiieqpbukficymy5pd2h85m3qx8uzr7hw4v6uekcjikrufht594w8mmrrg',
                        mime: 'n2bkwi78o7ojzevvwpk5cnkn6wzciit9o9ih9rqi3etfk2hutm',
                        extension: '3ua92or4gnj7ztp6a1uhaa8xuvtmfby3x8rpp91jy5vj80hnou',
                        size: 4226225748,
                        width: 688870,
                        height: 942473,
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachmentLibrary.id).toStrictEqual('dca69853-dad5-4100-8128-044596042508');
            });
    });

    test(`/GraphQL adminDeleteAttachmentLibraryById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentLibraryById (id:$id)
                        {   
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'bc98aedf-b36f-4142-8432-5008507700c5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAttachmentLibraryById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentLibraryById (id:$id)
                        {   
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'dca69853-dad5-4100-8128-044596042508'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentLibraryById.id).toStrictEqual('dca69853-dad5-4100-8128-044596042508');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});