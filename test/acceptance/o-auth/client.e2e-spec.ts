import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IClientRepository } from '@hades/o-auth/client/domain/client.repository';
import { MockClientRepository } from '@hades/o-auth/client/infrastructure/mock/mock-client.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('client', () =>
{
    let app: INestApplication;
    let repository: MockClientRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    OAuthModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IClientRepository)
            .useClass(MockClientRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockClientRepository>module.get<IClientRepository>(IClientRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/client - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: null,
                grantType: 'PASSWORD',
                name: 'b16bnovrdlsdmr344q0fy7mq5hh9z69hp9md63l3a2dgeugpulvgwo9rxukogqj8xnonbei8ttzc758an7lyvcudbi9j59gnt88u6ohjrjkn9rh9kdt8d6mprt6tg5lpgcpjsmbh7m49hv4kr8dobhj2qo6ok6if8727nbnqjrqt11jrvq644903g0rc4cgt6owran9sq5uiz94kprie06qnlbkc562kfd6wnj7tcx76fjzhwf2ns7thl6rsph9',
                secret: 'wbamm6ly3pcixqt1n2fvfpushqtc0lp0xeviuohsgbl2gmuu9prpijajge71cbzr8c25i81ufctqwkpw7kod8u7e2c',
                authUrl: 'hobaaarux5q04zo7lqiazrhnh7xue6tiwlxw0i582peabezsl9btszvhf9tjd7y0j28av85nc4x8vk3oz7aeeewt50qei8u54rqimay1ri4fm59zc23gfqyfvifm2ac34kezxbw6xb24uy68r366j5ypf0clojnd1mif6j9i8viu4sebtklekvatc3cnyvn4ntfhpsbbq1750any9js5wjh7pl3zxpbxk5p3m8hidysfo3dpdx4v7ua00xmuxkoeh9evprcao93ecusb8br7ic2wxbdctvas35hyu3d3bu32fdd9py2d5yr25llkcp03hv6pzsav5cnltlrs3cxl5vfe6zkqtaub0d1y0gdcgfff8kqklxqzadwm099aga6w8xfddqcnwd8rz1unu8ushkbl7uzaxk9mtddpeidfi8cex5etpgpaxcttnko7ze0rbf8s2yf1jwaceklqkuvammr2z659txcrgxyzoume9nta9f1fwn2ksyxw28btlqhf9o5dqbxeg86ifnue7tz37ehimr55gp9isc28mlq9qgkt4r226swgg0mcqnswhdnj8ptxhavrztywagtm7fn325m0ld2rea6mc10q3d8m1u66v68y6u5gmx81222pvmij40x62zpe3k9swr2ovo7xttophlumik0kilqi8n46m7g3ct3b3ycaec1np0rtfi67g7aaiozwe4c9uih4rea858e1g3857nry36dsa87kao5hegxmc6mtaa0igektz0q9vrqnqaf2dscna73q84cj2gg6w5tnenqbz4r0pjipaak32biut05g78f8bw56psawaltjp5cgyj337h6f763objvadmmgp2xhc29p2pm14r99ucma83ylh2x8ivlc3gaf66gceainbk12kbz0nbh55440ln1tpm70da6jhn3f6uaqpw6anpmv5s0223b19bi3nsaudq0bei2tyedsistx1sqmbheuhymka0t0v82vricdkspzypbtboxv3f639df5ux9s7fj4nq38il2p72an070avmrhfx0nsdix8hx2rw9ecp4nucpc9by3dlu64t1pfr7qqhi4occrhyqn1tw87008j0mpkd3aibgj880kwdkn429g8nibezcwday8yn01wzelm6qk42lh4mw156ud2xiuyplwjqaxg7fc7digh9updyclcw98ibwgosq145osxjhg18so7drq2nl8qn4ekwg7l7zqm66t251m268hdtgzbtas9siw4qzn4ol4cr50s9knsmdjkhn1vbut9ex090ttyq0nl5ksw4vdgt3jl0duu4dfcl10d3jke7b7a4jpb1pb5u5pv48hfv4wxpjhsgz46xx5fp9lhtzppm8b3aaojxvx6se7lpokh2ja1wr89fkpqoxz09zfz2q5c9x243m9xftcog8it21hykm9ga41iuusn59tsl0e4tyxnhm0ukykp1oh6w5k18i6rvs0ydxpb0tdxpbo16m31wfzm34eedpjxeddguvrdr4fvjq6s3lgvmq69uifnwwz61ud22n80mc6gtk485h4aap985tonke5i43rq80ioh01if9a6c0s2dl5ps445dc50m8ehqsulcmdwm78bwaofnr6ozsrqpimyr5n08syks11vvi4alyti6y96x7v9j0rjsvibf0xmwhvgucemql8h4euk1xndqu4h0881xwsra4eeolc68x7o9ui96d1mdkllq5c2595pxli8vozrqiga46pi8fzzfj82be5hcys3s2s0j4v28m99a1irsneejjfnkgev4xvi8105j6mj1ia0p72bb96cc0gbyvnm6qc25jco6jwq6ath47yteo6mdu1toml0t808e5jrfyudgfvqbyty4kjnnt5d0afokex5e6ez26uuom3hgl6k4mz0cs1our24vzynji2f90e8ixcqnwt1ow699xuf4bmq2j4v873ievvrepmud1mdzsisux19l4gw6ibuj9t3r0ppkyjijmkmz95lepo7118wwmuv6iqdvkw',
                redirect: 'w36jaae8h0z7tubccbxi8c3v26acshuzxq5c4f0t625bx5vqpk6jnn19bpv34sonuldvrags4saky6ay31pufc3wttdvbvgc6f96wlvm5evs291lpazkmtlvw0yhqz8ulzkresrwddcqamz4jfh6goyvgumxmsmkjeunxkmv0m4wm9oc6zuj2z8bgsdg22ehthegyqkvckfth35bc3qb14cj0bkeaasrt06v13jic7si371r7r4jdj0phaps6lkhyskeyjymd2iiwb5ly138plbxkc4rgdf75ublc1uefuxqga8a7cwb64i80baajq3z28n3121ehxctpff4aih93vgt9takeu9v118q5mkowvsbaeufr1q70tgt8i1p0q1zz511duocnhw74ccgosu29gqs3glm9nkjss5vxbv1551fftap4oyixb1h67rpc68ca56ezk5iv6e796j78zxtofggsfxeuusdy3kuwn99s217lammokl23bce5jfrk5ggd08xu3hmdigxbb40xicbj9n39b3ii5a2ieda0wdgdtmqu2us6mplphppjb2655djbitu4h2rq44udye24nk51dx5w1wfzsngzpy90iglr90ul0y2fx0tje04qbzf3kt5j2j8aaychxe4yr7g8aqq61tujjg8rbw7lzjnpzq0jlatktgsyl0qqb4agg4xmf2hvc4dno61fejzqmdqmniytjg78gqnhyj4ezro6m7hpm82sckmqkbxmbee1wolrnouber6s6obglhtck7jmu364g4yywodeb9rk4yvlbarc1jdlcls04ymij1rym1za4kqvjv3l39xfhbhlqzpwiwce4mtnlx5zbirjo5igdt233493h3znjyy0g613ney2xc1ufkbqq63rhy3s14k5fzhxrj9y65tiv7j70moesv7nnevhrwx7l97iqbpwqghj1u04j7nfqgspfintmyi5vnwmyl2igd16rgx13rzyf4ah7pv38thnbzvl0dt7d4f736fue0dbkzileasyw3jebk6lke6v2cjqnqpy12tpt7j5ek7wts36cim2q95nkw6pjetvtu94lv42t9zofwnjepcm8trbf9w9thw4exw8ludps0d084ahnqb0vj7eahni2qmbnq0smst43i0uvfkqegauaq2sincebl4sbbhxjxnkvv552jqbwtpy627kvvricrdsk7vrbstss4lh8q4aur17qr7m922z4rsj5zbkdti0txeuzhgdkknqygpxcqhl0ydsmpal40f68k1nfx5gufsobojg4o8f55eh4ytktjghxr48gkguawk8zcvmlwk3l0dzhf7djkdupmqxyybg5c6j53w3p5rwyk66hn1875cfbql9itz6knxww8ettixz4fqjsv9qio9j9yigb1ars6l39bw81qi9xef3uxhpy6wiaqw5p20iftahm4jku9qq1v9o4efhdtt5u38kp30mwiocdptv3prdp7ieqxj71jrazcxx06fhrkboyry06mgalokh219qcyfect9w2ctgdyxlicc84zbhc8k08lzw0lfb55ubdcug3vk05cncx5ek1el32v2d046tk9vzlxsnt7ncfx9taiyneiy4r3pqoli0tjruej73khpt87piks9qscxw4n5t0dzyxzoyy1yejs7ltka649xr5yng69w4shtapxo8cxe73nfqddycv7jgysy9i6c3qbqf3gs8rne0g6y5qqcamyxmex8f5bmbrfkzydjn9p4ha6507v4pz5666kzlx6wksloowmt2h290fpsidvitl8x82hroya2dzews56tbo2bdh3idk0fnad2aq5c4dbekgipfzyzcfp45kr1h6apdbz64bbdqcpwti4qr7k3b7rxb04pglliogumryw91vin2q4k19j0fmr3yg70lsakaib1xuxge636faxm1a7khosonkwbm9ril82iz889vj9g0nm87p8g2wcxzwy1rzmzylzv4y1axjj6meqe2cpbv0m0yeqirzbd5dpv7slu',
                expiredAccessToken: 7755742850,
                expiredRefreshToken: 2531909098,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                grantType: 'PASSWORD',
                name: 'yu0pq54vr6hs1q2ctepdtr8xy0dthjio4gtt4idnp70t77zaijjmmvyassi5nxfyzv1tncbqga4oo6jvfzscz7g6mnfi2fnyh68kyvh28zk5srl1t39wa8blqpi8p0byexzbq3e5dp4gaj7zx8dg96u8u9upx8h1epetsy0iis1gm2qghakh950kp30soidbxb5f2e53st0dr0my5hxfv4u9kbxcngajhh9vth9qm830r0z6b6rjqqfjq7y3b9y',
                secret: 'dabgcdgwfrvc0z0xvxn6543aob7634gjbxbbgnb8e8fa0alguq5cgb4o6l7ne66d2zoa2g1jrhqalj4ec94fwp9xxv',
                authUrl: 'mqiuuic75qhipnkn0myx7nlawl3e8mpa3n5yr5p6o8xhspie9dgblwt2ja46x9nmsi0iy42rqe1uqr9vpyyqruf09zr0s0bei4ljhegnuec2hpxdgjsyutw61sqlh7ed5g7nj8ypnqr2l4z8wn2shn60tjqxajbi0bv8x1k66a0j2aexpz7xvsmvc734v4el0fje96nfucl6606xtpl7xxfphr8yliatk4gz9rqyzk7m6njiacy61j2pipk0ak6vwie2qxgc0kkcl40yc8rs06uhxx8ijlmptpsm8cuwdgaymp0tqv4sc5jn9x7ovdxawpxzs9tez87tztnd6c7iecgmp8ew78ci1s34lpv6wrmhqd4dv59az5c0sidebirv8duwozgne1t0undbzl32pwzqvwkt7lj72al302bxvjcvpsvf3ovvnhckullf5h3m7l2trblopntoo1si6u0mo24ya2wd1fi8zslca5jk0lqmu7gz0gfn8yyng3kxqm18lx50kyv6hftxxztnkuclk9rpzf2qfnw44rr3y5axj7jm5xemtakndjt7ko3c16ur97kuywk50hlznwej61cm4vcvsv8bfjyo79tahw246vb1apoa0b8j1uxicu2epc09kgqq4es20t56bmn438joo3tr28zp0y6g1did7f0fkfc80vrl4kcg3fvsoq635ucifmsnmacfyo35b4vxu9kasrbaw80n0xci0qvwmvohthrbgl5nxukv8cmq2ztglgdnwffdv4gookn7jrw3m5ftbhits6o08u141ycu80r0ostyovz9pwqkbrzof1kljfhap4gl451plku7yaihv26hv0gbugujvemurzg1rip0ew1wqyjf1cqpd5smepat10olkc6u17soqcl607b95i163t627bhqmg5420zr00t1gxth2689j7dksje9jc1usas7rsv1fvvak7zhl8klgtyz08g7hm4n7a29f7kcr0o64kryoxqsp3sr0jkan0yufzob7r1hrnfzuv436r5rd678jqb4jb762o3l3jz380efb4cn36yrw4x20p1zg4ogb5ws43y4c5jq40dcczosdyxwlh5co5y9dd9adtdmz9rl0c7mw8rekxziprpbypbvicpheuvlrhy4pt8gk6o2ygbars8fk8ivy2ekwtpcm681qij3oowy56r22gfyiho6urc2kuszeux2lbpqkbh1c736hrgf4558pqg1uh73tnf6mouc0bookg3uq7jlvxnriqnk5rnvzjfwoh702x11ehgw8ku82ta972twzc3xmnzddk0ukuwb93kdj59b5ih7ykbve520k9sfbfr7j6swd1sawqwe4aklb94htdp6ahy7lys05c46095e8i4ukl2tjgf6zlim9qkxur4x1d98ni9wr529nmbsyjljesp8ipphtjinagrmvnlcym4r9a2d92xk3yhu6rlk87busija2lwz2cvov6pqmsv1lsjyk80j0u66202z907a5mm2foey0xpqs2ox649g3so11x6gk9xke20hew9r7hg0ypdgm4nnohe2a4s8j2gf9yco51hwuesaoptxikuyz811h21y8lpo1alj73skxj6abwxarlspdvs5bhib9tptx66bz7bcjr1vg4r6yslhs2mczfealiom36jjsgka69tx7vpuhsb98g7p4kbz8sn6yrshvt5zve53c6jxb596icg4431k5q7n3t7921mvhpqkhrkh239zad14zrtuoi9pwam5dezjv1718vynyw0c0z23pfy4lojvixugjjwhucv2ox7w4sikajwwx777pujqrilzp9jijq12lahhqyudpda91hjgc9nf1yj4ham55vjqu3t1qhg62ntfljizhqi06lg0r6xgz75pt5jnu951vd37pn4u48ofwu8p11s6uz6muruoykomv2j5zpdka1vwq2rnr0vh8y60wo4jcnmj7nrfmgijqya9c0wvb3ilk7uu8k35i56nqinop7uy308i5b97tolqz1se',
                redirect: 'uyffm90ivd7x8hhzwvvo04j9wab3dqz3ndejmq8tdiuhynjweegyqsa0cr7enaj6yi7j3n6wp7jsxsua5zvw0uimjn6rtqci7rpd3bkp5ukgcz9ghyvg40go0uwmg4401zs1gry5hujtr50efyr79vgmjf0q88y2xbxrwpa3a50kgjcliksxcvv9poi3fso5xgcbmikw2vk405r2jpretj3q4gqzppm3use8uq4ufw0zilnc93dwbxor3niva9hn076brnlku2krfbo104el7i76ktblnyehdf7ivqxj2nc3qm3iqgazk1hmuzo2lgjrvaw1nnp50opfihbbx8nknx3n55cgdla5qwehm3bj02emk9jum7mywrnd7e742wh7df0jljpqdatdco040aiinns8liaj4b8oq73b09193a60rgwt1o71je0vv8o2qrinzryrg4ywc01oon911z4c4rddfxtu8zm2qqg8dcqo3z4ehlxiehnj16hdyytkq8fkre5c38rgwg1ubgplp05sdjbqx2uk3dw27nq09y5izrbjqus5u5wvc6o5zcnmlz4npld2mfzm3zbsplr29ci6tnp2ns8rkts92c4t56zp8m9ir2c07pzldi9bulldf6hizqeelac5uhq1hwchlps3cb586axcoroco450b67d2nc8pcuhyg21yzwbs9gm8524jz1fzza8euh4uh46mreqonaplp4a1gmexbwf3x7k7pkn40whlx9za1jf6t85vojqen0j9y37knrhxud8ygju8ebzgv9ohwygqh0rwodx9gcizax7n7g8cf0o6iws7ro4zzqs2runt52ahojp4dq1krhzs95jrm81qg95obxogjowmyhf7r05rvp7cvvkg27e1ogeevs59l87no1e907dt573as18wj1zrq9tb3gczbrrzwb0who4dqvceoeknvb5awvefipm4ey3c1njc1kg96coty0sl79nloy0dpb0shgpjf0l2qsrby8da8717l9b261l5xs86jyqgkapd7yxk1z2e6wratkunww9uag9ktoz037m33lsaj8du2jce6uns4nxatpjk5bn07jeyin2e4kxeombwucv9lp0g3jlhjsc44gw3y9safddzpdirywvhxjqmht8i427e21mvm0gjlqqtv1aazrx17bf598f386wc8gidw1r40snedb5pgn4f3h7xvm5x335uhtnhir3h96ep02wmq7t38vcol0x68n0mb9sdknr93vf7rvcscm2j9k1431pkpveqgei1otkhv1ozprqqt7xwv7ezgu26t5gra3d3tr3nc2c3q3bvg236fk4x5swgkfbcartc475mk4izaen5k3l030j47su2k8hdpc9k5ma6k1t6g9fubtquh97xfb7v7w4om2c5kjiyosapo4aldo60rgfxvzo80bb5j2kiei0552qy19vqhlfvtn593a8yyw03vwthcmcwgh789ue7iklj86nsyt5t96q22e1on4kutnjwbhq2hxqmhxgre7718tcweis78cb90rlfdbhu12d0xxlh231efikjon8e9h5zh6o9yru02hswglon3kv598i4pgz94n18bxpy4h37zrd4jbefcz6doe3bk5mgwg88b14idr9t9q2sm7ts038ardm2qysla8ntv22iwk0a1qdzqushxi0zmdqjxyi2vcr1wseqfjyipm5fax3eqmzbg28kwx2b4ejpb3i97eo72flaz1p7pjftnts739ybbr4xu0wu5yivyulajxz74ucr9w4090q58ci6ep6f80ux78fa8dhh16uw3urbjks64770nohvoh1kvsjaf4ravoidzjres4d01pu7w7tvj5d1gddxa6igqv0k11xldz01wjd2dhx9or8ev4niqugot1xxg4txmdv4egtlmae0wwclsxreqy8an5r7en9spkj0in5fp8e186yhijjscxi7fxjosuc83u1lyomjn3e3e3zhsxblgm5l6gy85e27owi2igks0xm7hyjcdfc',
                expiredAccessToken: 3014663141,
                expiredRefreshToken: 9277373259,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306',
                grantType: null,
                name: 'fd8oq8oi3f3xth2a9gyfogjp407xjixsahm46g8ab5d0lhpkixlyqj0qp2hrehj4ug9lkdfjjufo1d4rj23hj0zbgq8thpi4lcpsvsj17jmabxytqt6hs8jwp8w8klw9w9hcwe7ukuwpscgzv1fz3qmyene4lijewyuntgur1f5vde5hbheq1x58zss700mkiw85d9cnf41hs4u6m6esbjj44xxyw1lhwkumlhevrd19o8ygot24o8j9eakd25j',
                secret: '00r8wgxd6g4ioc0lg0mw7v5kdltpnu7ver673og5cdj48i0dq8c366iujctfzcr9u3lrlo39k4gb96gh4b6g9lvjfb',
                authUrl: '8qkncnjwnvm1wvxlva97v6xb32erilnz8eq949pth1i0uf1ev8wdm1pnz94dxqf3qg07i99uvayi7fpijuxfnu6bj4n9nm3hj0yexhwa7hb1tq0i660khtibobhnqgqtwhtuvjheuf04qa3i6jfbuk13d9xfd0w4azjqhty05g0yp63u9f1sqf22hejrn4h8c01yr5c2y9mwjwly1i7k419rsi36kas4pjoypbq0xidlas2emvoa69srnx59swu7xhkoypoqdo5jqgmdb3vpcnhfkkxvqgehqc62z1gqzduv9gjegkq2xqmcnd3nc2zmnxxgxxi7v6vjot3tod7zjgao5234b23r0j7jrmp4jszyy1bc31ec3vyfnvpbrwkqzde16kmltfs2x40d7nkzi1qysvvsqe3fuzihu4jx6qps4kqmp5p9g5srz7yiqwwhtz0s1hx5dcva22zrsi42vltu69rgql8c865imunpeegtdfvmf1ycqfei1gnzpxtvh36despqck98hom5meju4l3w6uq7ef1xiq1i5mwt3hzbbmalx3p4f1a5wz897sz4gpj0go4ja42tkl4pc5hfdbltxz8qa68dvtf9qsyoj1fhc9sus2qixsyzcyoa1g8gzqizm18bys5ub14s0wjdnn3xdkoyotydyahla42otxizs2ci0jx2n9cnpta4ia4s4c753k3oddlszim6hzeqc9q712dorak8ksy4o59h308eiu4isin1hvr5069oyl82n0not7cm3vg5nz3xttnvycafb03qz5elem3cmiy6ga5oap4lz6e9jwsguiufd2pm5tpvp1whk3vnwa25ly7c3x21xw3ibmozkphw25pfa5g3zjf88jg54jexv38p32456p745nojvoq5o5xlvkwn3esv1w9z315488f8bfgk6tg7s8amgboyqsxg8jd054s4foghqz9yduych52oxkcyfb4iiunu6sjpwdzr6qxmrex9jnierberypmqqb9q6y1ef2l3gvrwm5qmg12q0tnxk10qc7eiqno0i1uybezzsitjtu9u4uttqmpw72nhhby9e3q6e8logzid38esys1wl7f1nhfwhg5c603uggb95du4y50rkb5xjn8jg9u86zx92miy3aj2eorqnrefsakmr1180w303qy9m0yvusn1ejk9q7ncaijv7lrzupd787im0zp5u9rsbtivt8zew2emeyd7y2rlc2w9nyttvqpqgb3lfo450imli4itww1ufpndpn1zvdil34h53v8kko6f5e78rdveti541onskxc89tubk2bwwhbldlpmz28wkskoc8cqqtmfjqxe2cotvptco06twnbdp2jv3nlfy4cfwkeenxvmbkwlpox06kjz1kkfgvn70s9u4y18881nmyt74kiff7v2opynzfxvapmi1nfql9pvjh03pf9awwbkptnb6xwq8rfdlewg5xebgk34jdquldem07xqf6fuhi6o03gud4sc4yu43qq116p2ctm0bm51nv1x7783a56wc22g01b69m5qrex7lygnbafpe6ums5ffmv1ig5l8lxxlyv9y513stzbonxoogw3qb2x09dgmpbp06sr52tc7e53xmftiurtj6rfvuuevluizyyq7b4j9gjzas0ae1geuq4tuwknlq61gzhbnaxn1tbzkw0vug1mxtvudjpgfvn0w7ak47zc6ji5zymturvzgnx6c2vu7w1kcp381xs5j7xwsg44eu7jz71mmccqo9ietcpm5enblcvby0j4d7awjgian69p4fngacurwofl9mdglmfctyqos4r55rxc0wr102wjm7eyyp30ifvem3s54etnlwhoh45y3x9kq578bv98y1eb4khvjidpfsyb4kq3rji4wwp71101a4sksie7txocff79cy70074tpy1mzw6lr94zr4hbz4vla0zoyocjd00y1d8wn24xykpbvv18culab0mln60wzwnixwubyxlrhkdub43hoc0n7avkwai3ecef8',
                redirect: 'ti58vmbyummvun7v6dqoocigu6mo6bic56evheghftyz0gi1nvw4qbk485jg5ivl0n7ut8g4adm2rtqpmpw9ea09wbfzmti86se44vi823mt9l47qsbswo80xkz6gbu31am2jb1smrlais0zymphkyl3v5848a4760ursb619e2s50uno2z4tkhvda1k7qsxpi5xmc6409c8k0vr3e2klt04k0a4avgtc4govaqp6lbndkbeeorlhv3mtreub1k48y3lcxyue24084bnt5hmdindcoz7ptwqc55zojicts42mkg3w46wiquvvd4rgjzxknte8bwzah1cwq6bc8zrnf8v1bbsiejot5e6kihl236d8m72goka9twn2p6ld610l0muxtf4owez9tygcjyz8l2io9mzvs97ci6ajrfcm92n13ikwg2wx23e48xw881h2xmq29ax9s55kucjv0c8alj6j3ievkxasxqil14cid3diu0bcvgfjf4wgqe29g0xgbpt4ixibadhu2vnsmkbuk1pfskeegi5tokgtjlxmqcs3ifleebdik76n78ay0ai0o22cumgvj7b2vvpsvntnii8r25wdv1fmqlsnq42guaq7c5ihrmrtqb0jsfrqyigk0gn6fcyuvkyzb9lql7gdcuf4o4iqs9bh2k9erk5fgkcmexjvbmv5rsxtf7zlsw676iiy8fe2nn432mo9g2ysd2lpvm4gz62qrt2bpxev2xi6coysizp03ge4n6o5sxk9m8zzgfa7yhnwxjc5hwf4mmtv3j3fuxy3dy5vfis6ewbrctkx3s979uphd4dum0e4gsk0qh81kjvqvkcvdvev9f75e7u9gidrwlrl1ydooarlyqatasace69abgiygw07c9og63sqihb8jw9zw9j1p6nux899yh9nz8pnh78jrhh4c79glsqgpwouz53uapl81jsasgdsqldgcjpm3o156r62k783dznpb4yryjmc7qexv83t7b2prdq7dyq1i4b0ikutmj4tbedkig08qz6ig6wm2pmrvu407ytlwjjun3mgic2myx7ptwj3oxdc0tq1be9pe70f6j4fmcum8zifr68k569ze1wsunnk0bsqs306xv2zc0okn86jafg87oi7aozgtgkn4dqxhgrz9k4fwmgztrksbae9ipqn3gmd9378dsg0ugp6bn3xrfqrizg86kduy5d7r1qn7nbwkcj6xmmb38v3kphdzepqnuea92lb2tceurp134s9f0v1o0kgctsclbe8jyb681v3if5uyii5mvpqx1uxf9yotj2jw8k3uryyqsfop2r5slh5iwn88e2m5zl6gj2cgy5u9fxule7j5qnvxq3z1e1jz7ik5ut3yfze58bf4y2ubu07s246j7dmnhmk0vwku8kgtkgrd8osftfipdhb2rg9p31m5gts5usg5mazdar8flv8ksm9ljcfy5uasxp8blvmn5hyftsppp875lzs1cmxe77ikss0pz45j53rcs0t1a29101qrhd53s69mnocb3tf9q78738j5awg95f7dvee9883f3ikv15tmh2t580vp17j08n3gnxy9pybxorxqi3efdledewl3krhgxga221vm6gbjk0o1db2xo0a6c5f0ifh5qvwl2eon3o1utd6lgfueblrqt2lcm4o5yzobg03ybicwz5egp7269go2om6axqegt30mllj80qhhokv1vojoztoo06r0upn3nijg6oq0137arztn5laz2bcycadpb2jjft3227scjxlm48dzvanzxl6o9n9qxzpl1hrw0iduvov5u72sjn64ju9ji1vbro5tyr2izb1n1lyyvavz15uigqt8e9m8t3ee7uw0haowq9669fbvrkhntj15asb0lja9xeweu15oksr3y95ycrz2401s2h5ciu1u9r3iwuu7g8skwmszh7u2pp4g79co1vpf53cgsbpiwqt03p27uwxl1njrkd99uvhcvfyleshbx9kv7c9zjfh6bxexy9gbbr7rj7',
                expiredAccessToken: 7090094502,
                expiredRefreshToken: 2057820690,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306',
                
                name: 'dbz4p1sjskmic9vdhg4x0l2g8nsyyu12sniqrx3eefc1t6iat1hd53n8ixl4euptwo62qh4ivwi2ocdqct5sbyf7b795ltdpaixp7b9w4pyr9spq64364vymw79tmj2tdt8k9r72p7xth4x9flbuv889fji6pfumfld614cuk4fk26jftk7tytat7x0e2fya7upivdphqetcsq4tkgxzfbynnphvc79p8ab5601qrrm0mpun6n5pupozdvcxm9q',
                secret: '7mwc0i3bxemn00xg10bx1zvp2i0r2tge1wp960pxm9uvml1yh4wh10rj9tdi1urpuk29ue34lw5q9qwz3ub5lxh07m',
                authUrl: 'bj8cp1oplgggexpf713x3r81q78av6ysy51d0asat70pl3vkujow37ywc6xr530os0i876fvswmfursvzrtdjjjehn8ev4nyj9ev1yikhi6ip361xcvq2ofe2y3121fyw3cxpcisw9wpxto1rej24xygvypqszmlk5rs7qw3p8n8m64pzpuvkvnfy90qz6nd8up0kuhp8zumgz78qa0d0cqokkzk74pxc0zkbydvyy3d6hivfzoj3tg81lhtx9bkbwyg7spr7stzks59zwrr91l61th6v47w10l9r25cq9t2vq81tqmkx9ecpbwau0zua47j5swynh71fjogmfijqzsh3ulgcrs9uz1m47u5vv6qgjp4uhxlqqwhizpf53v3vrq2mt6z4gwjwezf04sx5djtu0ntgw3djj6qmgfswsomaxsk1nau0m8nx44wraccmml6crpns1qia6b7v9gakpi8fuxfd603r1h4aajjc5odarljlmhg0ed8q0zwf0c0wg7mlddjwet88lts6obj79k8ur3cj60llr7st6e6pp624qyaix97ilds1ibrdxy58j2nz5at5zodd4xvo8ojhubvo6sydm4zhklwr7ajxsnvcxqy8dkduvvmzqpv4zocvd2tr6omp2sbmvadxkb9a16cdou1iorihrmjeluz160qdbs9a0141p672fecn9gcfvvgtun52dzy1g2klrwnjqpnn15xfa40jbqefe0shvd24knl6y9f031a19r7oe77qdtk3m4llciddr20jakwbbrt3x1kytspf7atsyt5qq4uyq7nv303dlem1ld5das97m8ytreqtn33cxzv343g9hk98fi6fhqg17600zp2ci6bb87qi8jv2remb50s6qpl7pru74g8jzdncztr14jvcrtxegiv0unslcd4mxuxjsg843w0c1ullrz72a4z777odbhewm57d2lt1z2pihco5a6bogojqlhrfz1q42ijagwtbnue9z7hjef49yflx4nsyc1g0v9u0t2hdnt1wlhmddfgat64ic1cklem8vqxmt2cdbx328lgqfvvpv8b4wweu0an2y59myfosyyp0e8vrd8sbyjwjeycs3atzw36lmami7ixjxwj2fcydx9qdgy9ptbxeypk2xwdf1jqdztqz4zmhfbl1q4af9nka9qzsppmcij2k2zw8e4qz3hs5tui0md3ntsxoyqzzedjxytpburvt9zw8ygafij6ae1fyziw2xjazg7f64jj3w47lys7o7n9qwc8ezjloc4q1uo0b01zwq8in7f3qgyzohr2hk6fq3riln9wuhtv3wb6de57n69p5nwcubcn7cusg74kxccdi5otpg64efrxab4ltmnf7td5cx1orfbtjdy1kux5mnnkbwanx2mrhuwjemiuhtypz1ko6c5vvj3ngf7pbonyhryc3ovtmslvefrczgxwcltk9a8szirlujq60s2mxs0qa5ks6t4kbjt99ugvzodty1alh6nddr9armzfuios85cvqxerimdymondcmwzvpqxtwsuu28duqwhs7yr49b25nobi1j4dgyskhukuqxnwvb67xb2mdgi2qd5zeo2a7fsunoppy7lq7u4x2zwe5ey52tu58otm74sp7d80khtaeceolag4t1g7b50oq2fk8s9ea58snn7g7f3flhbzadobfq13q2n161caqk8ql4f626uvfmlvbw6xcmin7ssrhrwmoq2cfe4dej5u3wwvdihgvyef4kk0lr588nnenp1bio5rwkhyoyurvghieg1id1x0pbxohkvs36776wp6cpntl5tyu923sysz557b7titos5he38sum04y52djmxhcpkn3vrz8tfn56xriy84808n4qpzyn146fayi3dyvda1o2satqp2fvayc5w4tlx83fisux173023bwlgdkzwrz4c2fk3ph2p46vj008ekfiytll6kz5ks54mo335vqi7kgqaib5hdloen6rr71ea9af1ei63m5gcpj37em2mvy7',
                redirect: '8kbc20emsl1cwln0ccnwriyk41jgl0mi226hismmbbvf5kodywt5ipas85y7cond4bi0zeskdk5osq2em2hq72fldopfdgj4jzgxknkwnf1cf9uzboovf7bqxwt8aj2bi5n4dar53l6vzrbphfobyi8tr49gpb4qp5ccpvp8hg8s2njbhi3bq0s4x236oyay3s5hcu9cp4pr4punp3zds3m5xxltq7vm8cpgbbizkpm3yyyh4wfc37d7sw8echf0vcorq6tcwdk7qvqlga34voc71rsq45kptq96ajqq5ss8mbpdihkyslees1f2v2144nt99v8j9y2sivl3t4ag4z6tpm1xxk2pkyaj5qxe2uyqz0qhmujtuja3qr1q28w7xibkxpqqfyivz2t1fgrb5arkphorjcrp7hhluqemm6fjhq98p4c7o21d9jr428tiu0mztzt2rsx7niusl1kewnk25nr17gjz8kxt7b3s5oepq1cpa78fa6t374fg4fa1y8ik1r0rb2yxy4h5yceloic31og3xed8bhv7bbl6n3h49ofvo7j5hj16pmckne8d2sczzc6j1ft5qqkddlbhrmtjl61kq7tgr5u7lubivlju0o5k6o73c7giezyacd3ka0obmkoh5rbeg6r514rn68zoofyyq394w93df4lyk6e0sfpj9b0uppkwgz19wwzb7k6pmar46li2mkhlf1th7mv836u37p754k0kefchm1yrzt426lh9tquhmwmlca1krwvcfhpjwbjijvmkyymzrfzemzxdt06kiowvzojw9cfgb4hk9sl1tqqqc31rdkixysntztys18xgsy21brqkk840qx5cb4tinldpwvn9xo536aobyribxbip9olv2v6b82valh8q7glbdjdd6uta933mop4u9fmx7giikyk02dlg7rir0oe31uj2dz6ui4c8sr8fbnodcq2n3comgbcs5p6wt4x4z5f2guhw64guu53a1m7yvv27vgnbuesb0390h7j7at9ivgjaa81xqsitydo4jx42zto18p80z9z0oztf3r9atse1gb4tmp4695vsawntz2zekl7qw744luvz8vbnlkatxigv9h5cnw26cdb3mflcgzrzwv7cla9sk7h08yajcp747fotuullkcm2e3jfnh9oqe8qabrnoq6r7y8uhhck7xbebvy6r669jlbfpc6866n7nyhgiwwiye861odxqq9r21m0tj36gxlu78vtf82vy457f2p9lcbvhmiizecdzl68mybbj6m9ep472b5abn403nsawdizd5fv2ajijjswqrbmgmbln2emr6v1gg14ie8mlfvxwistrujdiiky0wpflv21w664sko1ho9mw1juzwylud06kxagnnddgs2hhih66bzv6abwgnrdf5q64v65lanudbbu1hztpwyp4esphcj2chw6k4vjemsdhhf9rpkk5kgcnkbdzrm30mmxa1imcwikd02j112eu24gd3r49eas03npta95dv2ft6o61udjukq11sxvn6xazltzcz94yt8s6rrild4msz4h8z47xmh9lgyu0tdmmuhf9rgb4g8qxudzw6ilou9pp8v933nht7woxqg2fbpj2u6mvlt6ae5eqn9jpn7yrbsf65umw7kyqiw32n0tw25f8upg7h2zbqcnxn1vn85ai8gg6jo2987596vq1pg4qk8imbvde8mudyfaacz1sf7wiyry2k5e0wy1tjzjeawvntfh3tkbqmzm9aopwttykaw6qirngdgpaja0me4ijbifc544yixpjcxd67iegzq8nv1f39vt5hky4mh6669rg9gl55p0dh7d87dccwmoxklthktkip5rhkr14cby2mibvlg331qobo84swehc447tvikgrnbzju6ze88dahpzxb488ssj8njhi2kps73km74ghof2kcjtmlzvo0osw92rkjt1g7qpo5pixzviy91mrhz4bk2b4qx66z29ya28krzo4ttpkuag6khkpb77d51xkv1',
                expiredAccessToken: 8637882440,
                expiredRefreshToken: 9035556108,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306',
                grantType: 'AUTHORIZATION_CODE',
                name: null,
                secret: 'gc14nzu1i8u3wy58a2s5bttrjeuajy7b3hbpjm28j7ohuq2yq7mhlcpxb78bj8m5rcac4za2edtflgeymf8hs6tvah',
                authUrl: 'oc6u49wr214gaj0sy0tze9m4avv6tzg0e5k4qsa34yi94806rtyuqrkro2zujmatlvhk30n3lw1k54xrrz02qit7fkh92j2cjxum5sp2q9qbqxv8ro1bl0ohbcm5h91mz8fqjgc97wm307nfmswsunuc43wmr0xmd5lp4x50t0xpodmltz835ywi5qrlkkeezbwsrlj7ymn7hn4f10n8qqru80j3b7qwr3mjpwfu9orb8ru85n74yrlutgzkz7sidj88778q0z9oplkemn8x2jnu29pgl8anul78bl1wrkjlh4kbal4w0kyujmq4lqby8aou55ribpqrvfpw1ft746elms51bu8op4i07b0cmuefe92743xvkjh0fdtrimlanjgvepmgtzs0y6nhj9cekwzsx54sfpgc8hiewpxpgjtx30p9qqsso4nkuon7di8b2cj33p5hxdum8kdttnoq86ba4lyx7zyhgk60rw539qaka2hz6swpl8fa6cv1qtd5ftvr3952yes8b4hb6vdzi0giiitbb1iqnnt0vy8mpeq1kpq7542n73pwjs391o8g5in586a87vzin4vtbbv275043b32bycww7558ekbe36ezx5pun4rpdmh8685q9ktuso3fwwf73rn8q2ovtczkcldi1p970gw67t7reh69zb1r6ng582b9nvmqe1v23rgb2rdc6ls6oxhp0jiet6u9b3qwow40zqhoyyin2uhxnysm2tz7znbbf5wrpk5sf8x39whcjlfo20qtkb1p41rfsbnp6mj8uyxlzmxspnfk8tjp6lfu2oakflx51ypmfjejbipj6jmh10l5diaw3q0s3d5t1ospvs7zh478zryb3qgxmhyymrodxcz45cl09nzltbqyenz298k4wfu7bfwfzam7tjaaihxas6s1d80nd7iyeu2p9217cj302d9624mmzhc39kc3366y2lbq2srdbhci4it12mw06hghxvqs0shf9fujx8o036s77bnv1tdh80grvkt41b1m7bi9gskwy6oib8rvkd4t05eq8q5kkyl9k470bcfwxulu03mmxsyz1baz6qmdkikxlc57gm6huzomg820rjajgw2cn7gjxaguqwzxl8s2tw6iwkuf08bqn52dq02l09epyqal334w8m43lt0xp0cui8epu3rhj6a91hklbie6mwgqmfhc47jv7y2eku4023tyflupa81qlzs5b7ae9yu7nlvfkgfoi8tw29aidlhr7lnns1xuyaaynou61m10eb7o45fl6yia15464ntt0se4jetsjh6n8wjhlgk6v6jjfhiq2qpwtnd8pq0pyzghhvumpf8zu67nmw0r4cwbyq71y329y0evcjiti5jr5b5c7b30i9ghov19eyq9jatz1plpno0xuvbjegvjxktbry92p07hg6jfmdq8tq7cza0w21rhh8k8bsgm06l6ouvmwqbwc1bphunltez9x2f5gbktl4m0xr9gdaopcg10tp70njssmxzxf9f81ikrk3k8c805r79sgfwn6keah53b5doncapxm1p87tgewhwfmsiq0b7sjdei3tyw2jhpzs9iiiitsemc7tbnrnf9l7xpqhbbc6qsybbfz9n9u06rzee7qmh71qukczpklbrgf7th9nvocn257tsvhnjqgtvq0xafux6jgbmke5gvjjfrvd062lvs00eirfi9ifolff209ktiypwwond748lgeytw8w8ipxf86gcd4hjczgs6m60rez3ma9rxa7zmatuj3xspvu9x9lbwp8l7eh6t96g2paswg7ml71raj0y9enq5uwchc5tg3vrhzrdon1jq299rjuibwvicg9iuwrdl9ox5ewjf2uhbuo3jd8jn2l8gwlbaavie5rrke4z0fax72g0nd9831w1j1vcxxrks598hrhdkeu4550omfpvn22e3yhxycaxcm4iy2l9741efcnc8y631p5v0tm7xzo1q3fkkuqum0z1si5frdyq8c3aufuiouilkgnvznhx',
                redirect: 'e4u4te7atksaponyc7y7cl8phnlikejm8uts0nkb61qfufylb7q2wdmsqo3sip8tyened8oimqdccluu801efmrffymly78i2q2mohuk2gyk0o41e827j99wogk5tjf01kjzdj0f98keac0u05ibnb4o5hpb6w3hgu2d641hfkgggijhjhvx0szm166pxm6uyieu0xy797agj65288b72d44zqpym4irzygdzbi8txtrchnkx6ha6sq61hsjuamxmgs3pulrnuc9f82t4fe0dv33yadzfnxbqxbq9anl3uwe8hlpff5686glssuyvjaihqmugiu42nj6k6lu6wqxftvonjydt4q00589tgvxzw8ukd2cjb7ze8eg6a8m4fs2hr8kup6gat0m40tuy4r4dp5sa0sktkvm6apzw00vvix60ot6p4uvaaoubck5d7kls4dldqqpsq75eqg8ucbt8buxvhj5pzhs1w7s8hxe1h0od614xqqnb2bkpwq98qhptuh9a5g2t3wxfs698na4ypz5oy8veduucu6gfjfqomd301jdw3nxik6j98twyu88fc57qj1qf7few2nyxvmqpr51ays5i793rrqqktfwxtmhmko5umck1h76fexql1qnvfaugyx9yatbmch8hsqv2p87pay1tb8wuhm5msc7ov2jxiv6af4c5qo22rhif33jfk0uy6bvce5jthqzurd1raswyga4lzb1tsdqlhsh6i71eqxt74qv0615hrfda7hjwx0ndzyzh1sr6nct7f6sds9i029xpk8lhr9o2hzw3qjkzk80tur09g4hzhha4hu83ti7g93vtk4fymhke05dsqfu29x56uydrl1dibqnzkrb8i5ptcu3rzfezrtbx07plbbufciwrhmzcsnndtn72d11t3q4mbw7qt2hztxnvfs1djx10uozijfyq018hmi51rdehmxbsenmakkugvlzfzhpmg9m2eydp2y37xrxh4ng2j1ql5i05lgz9a6jvgcczlifws1v7tqt0waja6ttgq7d2fzj9zh33mgst18qao8r8u21kpm807tcnwk3ixkg9fkl3a9myla2g7qyczw1iabbqp2dsfpphchygwk8z2zry1fk8cl35ckzwhom1pa4sx0u152b07475697oioj91pxguqbauofp5m96i3owluwqrgp6lgj8qs5rrwxnehwxmpp7wddtedavkrne9jbz8bw84rjc4mz0dssdbovgeucmvmf5jmhqswkf3is0hg2wfljgu7s156mij7xy7dd522vr8t2zkkl0tljz4gxmrzzgtk1b8wa9kmjz7qs6wbj22m7qjsaq60plvz90mioor99dvb8nkv2kim7e97ek2tfww0qap39cmm1m4zywep3pwn4vvr0j4ncafy8gbul13t62oesblojr3rsjm466195aszfpdqgqc90r8wm9avqpycd0ke87ym061u9g5hge8aixsu744476ujogu35i7zoh6uvmzx98ei8rbzsk9vv9kt673u2sh7kemi3ljtdpfyqbxy853owqt81d80dfke5jqynp5b9fa8ksdnol1yi2e3fhmissq9co53rgbqz6cumkselp1uffsrsgakyvowftzouqgw7m0ir3plrrdoea07kk2lte3mfu2xyratwyyukk74xbw9zppu2r3bezn26lfozpo63o4oitap86aavr3vto3r0di5f523qd28hb6yfov75ogxtd0kuzag2n80685z3nvqtg156bx3ykp5q7ifsexmcafhh28glbnbk1gwhzuzz0y5sry99j5021gonhmushgu2wxxqq41fqxetyjx3z0e04e5dd73n5mt2o1esnlwhz85u1c2i0e28ilu1sitllyi0r58d5qaekvptwok9ukldepacnw1nyi5o8xojbtxoy10596kolz3e0ljgn1uc7mtz4t83nb03lfamz7az53c4odwryjtub69ruc8mzg916h573hncoes64qtwuhqf7wi6yq2lkc3c8e9u',
                expiredAccessToken: 5546912902,
                expiredRefreshToken: 1272782295,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306',
                grantType: 'PASSWORD',
                
                secret: 'co7xgajh88f5iqccn4tbg8xdkuuczpjtdnj8u0y28ucd3fi6wjhj6c0id7pvcd74wx5g1tiwh4mf2jxv9q9j0ma3ti',
                authUrl: '9t1xz5exyq7wh5mo06f8xguqzlqpusj6ixkkfuusw0vyb2hvrm86waq6pkehrkr89iivp4pu66sku3cadt4iaow30iauitttwkyoxfihjltinokwdekfanw0yl2zm2db2r17ssxkl5vk9wgp4nr0yeyg40pxccvnxy4gpg1n1a534031fnpkcmqro6xfu2yp3rius5zsi1g2al47kkpeluix76xd5kx3nxxslra49pb7uqlthfhp3acxvvwhq3x8x48qdfnye9d0d33rndvbm9zjh2ins2i7oqh2lhpk5cwg6qs7rhnzkesivao7qylw3hxuv6sut38fkp2lak0id1ykud57ie4qn1zq8uiel7optpp7cyxlv6kj3i7ad0655cber5wd1mwhgmwsv9zl6wvjqlsry71mx5lupryijft24ji15qsrdswvrx4cb7ye1b0tgb8tj3bel4vhv99ljxvzcn0mnnxib1kolwaahnine97uzbb1myr7qrssomb76vnvgq5kg6k576b8gg5ijx3ipij00mjrcxzten075dakmgi8ahpvout1bdh58e7rq1166epw1aqcoaaxglv2yhftwtskg74vrlzqfwm0x1iqpwq8gbn2zx9egf3pbt3aswb6u95z7aomjj4e4ppr14zpr10xn8abc78q3kh1ids0vsal1zxpjpwpg4nv7fskxsug6e66vvmrkxvtkdhupsqgupec8dc1il0kr9sqxbwr0ke30byyt69lgny0vauul1nrv2ealeavvk3s1bq5zfukp8ztr9omrfslephb6dbxojjfsxi7w6wghle82e6zuhqruidtnyyzqwn50xtd1j9lmmld20h8atkteikby9owvpqayse96a5zu5j4u3w7myeyndga1iywbwupiqg1svfkv1tmszoetkv827qyjfhif8tuc9ewfmkzf0xoap8vqukv4xy4104snyi3o3yvhna239ab6cffzrlfth3955qg4ccst5zeydkbsmxei2lgz8kdrgki1q6zampmr8jewnnepppu556dplnahsjrje9mpvuuk3oum75o4x0d4up1yeqmq7wuedi5f72w76imz1bk8k75bw54pxpht2eu3rrwq2c8so76w4n6hutw7b2y6fby9kdhdottkq8meql3zu3rcqppksg9tc3nn74ko60c3ziuqkm7fy40oxmfgzzq9ooqhuldiavb0sd9sdwj6jwbkc8dsy9r4yl19798sdgde7ybwn10q2dcniq32qn15wb14vwgsz5xndiw3s6m8a1sao72tegzqz7m8uzkzlhh2g82yyzbo2kb96lqlh7qmqtylividfl1w7csg46phc972w6fsupqd4vz8j6gergew3cm174xi51tat3qgfe0t47phpx9bmhau4yniuhf9ulh82vm4lbem7mgj1jbfx7e57481mi5s5jcvvi0nz9cw4di2q2vft7jpay59yot2u9n3apiliszy2oa74o3gopw30sn7egkcb5cydhzfouhovz7a19cvbkbom5epvs1xk9lm2ojwzzg85lqyyoyjoddxvyzpaeh6t2cr72waq65o6gjwylqyjj8yd7y5x8injd4ipgb1rny0fnt4nlmkrno4wqopyun03u35gcx1dw4aikf1zt4oiq46gcasdzqg9gt7i85yhvczvyym1gbqhqhzemnhw4piuhezri2yagnyn4z7l54er826tbt64i53a706egsjzyvmhgphn087ah338emsoix42khroutioq5htz86d80j7ebvc1ebt0qh1kddr8qkdfldxwac48xmsf20a9uig47ckp5s3envx3rqvvuktkhdslvnonely6h49tnu3a5p1zmvdaes15sc6qhcz8zsj33eiicbq94zx1t3hl722r9jndwem5j9ekda62czpebbg6s62yon2hvmrsbmnh9wrhnhooyb3r3ftz6p0ubjkun2erqavl6jbd5p0etrwg487it8hon8w6hgo259zr70ai39zcy9pwfnvyv',
                redirect: 'b26slnnmwnc4qdhuagci83mao09nfviy5zrmczc7qzs4ltky7pnounsbzvmcbdxxlfejvd30wissjd89tril4l9rt9uenw4sudinksg2ok5a5jox0y2ipdcxviqlejchfokrufak83h5u3gnvvsswa7vlhbvh0iwe8zfa1gj6sf4p1wo8v64fkm1pwrfnzzs1pc7hefvvuqhfie2n229c5qdjji9losjt5rcsz54qnqgw5cdvjvigimqcy9v7eee0jfn69rmai2a77fcu2g553rj0wnyrb0tq63vf2jwfmwxvb9s3cybwruqcgkz4o7kmh6spvhmwmrmwy8u03xvm3gifvwcb1yx9gdp55zrddadovkjlnimjouyqkrywft2v9kq8w70s1abyzs1u4lu5nns3hsrcje0ozb9a9gobqos3pcbf47rjbzxoul721034kokuimc7aun4g6jhzw494ruln2l3wjyz3xizhceg8cuhb0clwmu0ib4qvgfl9p4pam9htuqtusoexeiq5r4d5mc545cbk8xnw42u8wrby0ogzfctx6vj0t7omgf3thjv1whbsv7lzjp3y9fmeadjlz99h0t97ky9m3oklhi0yzeldwo8sfzlj1guq3fwv5wxeezhe2m1lrys9x3uxbau6m6evnplgfo0ma68g758sjveb360sqliq1su30yvm8pk2huhqyeggsw9hdrwjdcsaxb2p5kvkig80cfa0ek40w28lcws2u4kle4jqxhpn29dh0n5h4nsazxh5rzpqfr55tm2fsnh89ss6bcqqty16w4n5xtvereh7654yabe3pvb7rcq8up7njhwizgmzq5y8i67bfez3y10f83faj4ilxy077xgcxy9z4vi2w0u20hp8099fbexhepbm1c00lnq67kt5c2l7p8kqazrzap6885qgtt6l7x65efdkm5wl7pd2e8iwpamfg8v0iy8qrpho1i63jrknerg7qftihzi2u0rvl6tifn0rz50l8nxf6r680rpjje9m20zmpynrg9b8reglxnhrtcp3m5nrczopiyi4dhiitwcl6pa2y1esz37nzfb9rdpo3ew18up7s8lii3izpk2wibrdhrkarz3edqplchfwumqsv9zorzf1w65te79og03bycoxlgjxw2llq0fz36p665rl90u22jl5or1s1a2kse9ae3w9tzp946c1pb05lmjze4ehmja88ua2uxb21nx3srzxppu4cjc05dc77ykoibsiv8v8ae75txfdk5uuhyjyvb2j8c2uo25drwss9ohmzd12s7gconnrpyuyuqns6r0moj42foaw3gfskxxe0oul3o1yjf77wp3ktkay5gl86msgt6qrjdfk90h5q7shnwwwszmrxsaf57fysl1qaqkyr1g6esqrvpgvcejs10dy98sse6sacxd26qsruaqfcsjm6f52tvgsclyf567gstegh2lwdm7snl0f4cticuqnegrfinuqjqg969ddigqz92tdige5emt683au55cm4iel9r0ivs3eksr71rsksifq5v759grl3cjbmw1b7eiallofkjlhpfvbjf7zq0s85ppm69u82xkx3m432420bm0a3ptoxugonfmmwo7z8oaeuns6nl1z7gcelbbgi9rw2a5zwz2puxhz25jxwmsgfolfhq0nu18cxe5xrd8hnm29ns7y605s0mdkvec2dd6wy6m6g2051nt9r246g0ivooy5oyodvuvcug7rdsv9puqcbqkhssnvxk7ikxiqrcjcb8k2bj0de4r9ycll2607zt8o26m4b55yuoxzh0wha6f3rjd154klo455n6t3sdue3a829m7gh2qhqwqfhxive21rjv8yip5ycmlrvby0wku2us763jvw0f9ideho0y92pqx1ahftpwudjk0312wvbx5qyyurxbfp9ph96rk137pfyli99ugyvbuwomftpr9kl21auu1srf2a8x4tcyy0dghswp4o75q1kacvkg3oqogsqp4npdri43it8e',
                expiredAccessToken: 7071892379,
                expiredRefreshToken: 3209433786,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306',
                grantType: 'CLIENT_CREDENTIALS',
                name: '46ysjp1fob36jo8jf8vjy6yy4jg8k6fxpo5opa3d56invo11se9ka2ulq9v6ldacv12dmujywqncz8f2xdw5d090zbdfk3ye5i75uwdsp0y4vtjhm9wlg3jyb0qy1ozr9v3o53huegkso2sfxr20w4366qpwy0ijiscbygg92y1fd8ktqsvdozk4xqbeqo824bop1w98mis1aziqkqv8w0s0k53fnooxl6bb18dthhxm97yphnehya68fpvugkq',
                secret: null,
                authUrl: 'e4s8lhsgofof4dwyfq51vkhsmmzmuer5rzv0t976pbbrrt296oy6f75jyx7wij9qpiouoaadqje5155yuvukzqwylx6l8buhs5hp9b8dof8tti7vvfsbyha2tacwl8xajdj9daqceeyplw7xlkbc5cfm30bir4kho7g40k3jlhsbctuqttxz4abjvn9tpwesay3hwn0a2fmi994k0r8zxf438acl9pi19sjbu6yzepqtm2364wpfsrw68g0aamu3xd8v2kqam3e60xuwkk5kgd59un27a5sw83d3ln3vwyk47uyx707h9dhwbb2qinm1fgr6ggxpm17yfrzn58vdmqr7jzxylfjwg00fhkqoxxtepllwfrcd00bbu3tqrsju49wuemj0t43vcx46x0166j01tiz4ttnmkadsqxx0lnayaoyjmvn6sjh240poh6kf2prv3pg6s8njtbms9nz33km6cj7usufp8ulloy8nxf8083q2sph84vn4vewd4ey1tg9aofz1vfsdxn4z8ewegjf0rsmko8e0bp3pgq4t5m234v95he26yfes3obycl5f8t5l5kfh2vpa650gwtxynux6d9rls6t7infafg2owod4ho3pxo1fmaq5kwgudfhaq11zcynssi1d7darhd1fo97droh2xb76yq36z6oqejilzbubu21kss70vylozgceg0kykdo30215zns6rs3fkafp2q9maelxhtlsw5rdjcnbgh3aldki8kh6w7snkueq7y018sjln8if5qsdx2ej6oyuvaxwas0vgvd5178pdzor8bla5mpj0yk6ccuubb90jeppxviq06d30x8qfyk1q4qk595kqebmr03jtm1tb1d2nwfstmsgi4k9vskrvj3f9j5ztc6hkbtbygtod7xelhhz619024tpvi28y9q6i8p0xi6g7hfrjnzfdafegf5spt2eicgfn0latyisatg6xp40gtorkjgtnouzxhrwtgsk5yiyrbu92o4pcrbzyppc4rtobndyd34bbpcwcfedidxr0phfkr1eqm8399a56c8zhsi7hp8o3p378993frf9unp0cem6fn2zjpd88yuqwl23tgg2x0yh0rmf0z7ejeaq2gci56mtmkbpcmfthodm04lgkoah6ny2ld21mrta33edwgvtjl3g202kkda4ws5lpbyaa7g4u9il3zr1wv5crxy2kvmd4nvrsua4flk09v67co5iybc7xmksz2kfas9whs7bf4zuz5sw8gb9t04pworvkftels0ysolch4ncnsai5i0c7j159olgyprsemibzxduojs7jhcs8l0ctz2apo4e6932ia06jqwzqnaxdl7pymtzuoftcewicclqrs22uqmwvec5kxqic7ppv19praxzowiu1qh7an92wz00ub7oiea6dt6q74nocumetvx4a8wzhfb39a6ogcyxfbeeud0skmjxohjsrnbn4z5jj70awcpy7yxzt96mf1sdj7i90stw4b33mcb9odauyxch8ystrn2jexb190anf3452ib6x78a5lo00twdt28fk5qgvoso4lqrkh1t8hg0stmdjc6wv6hdguek0uhbtrbx13h9743chy78vil6ui62mqqvsia1uporcofl6obzqzi1zdpjlhqptd2hg35gtafynad7jxkrgn65j8emm500w8lgnii3tgl84lxvfttbzb7dufj6h2y8jq8ecminkjwtkqf2at2moam6772jgipdgpge5ltchzlycmo11iiu8iymadodxihwp2bvy99lvvz0iyevfnrb9d2ha3h06ufpz2th7snmmxtrqg82phfqy8pi05nt23a29n9dxftyu2rork0b1bk9uh6okeb2v9grxgi5svlox5ptazr14wu23klf2243zss3r2sdwstc5n33973vfxmj1odo1z6fb5u0gi2tu4rq7cz5gb685fvo2wrl0n87oqcxdcyscr88b51ui4xx6tajwjuumfohj74t4kprw5d0vytawrpzei31htv6',
                redirect: 'kyt2qzvpw9q7b69i76ib6eehwj5oa5lo3ye2jfkg044hfbzqyszz453cf3ylbq7utngshaptr106efhpbmxy4cbijb00hi5owqu7lk4fqgtrw27yoyqvtgbwmbbjwxan7qjxkyov3jv086sxv1nu2w9h346oose3032nbj3en4ymt2iub01qlcvx152316d9c10c90pym0vwm7zmiyhrc6puj4ag3cdzjzb1iin5g5258ypx782v5sxnep1evgnql8518bm7zs4rrac9qde9194wnx943r72xclfcx7qgbu0prtamu5dmk4f42od5i1pyljalprjwq8g8rmywnlm8jkp04e2evdl4aipxiikgi49wephxo21251xnfvbhucqllmqcmcoo20umckrebp64dcw0l4jzcbrikyvx5lqchohj4ha8khb2aohyz446kk60rk4zg8xh3k77kiumpt1zidnb5wnbuiydnmltdxt4lsxn3gg2op04gh6y12eegjn8mlwtl6snp71zmjgn3ic2uedf75bsxklng0l7gk608gfw6ayjgbkxg7a1ixj53x6gmgf895ao4pwh9drtzleltby3k292kwxygbxffpt9hbp11dljhdaq16pabi865hg7lyhk1l6v9m6rh21iskd8veii0mxjdxsqqbns7k79dnlejrp03kx0f6znpvg3lwu921kbd91cfia1al8g3705mvvgs2puj9dzfu01ywca4azdprlrxj0nox9hm4ymmphhp76wf94wiudx5lut1jp53pubt0fs1vkh0db5s7rd9jqwxbvar5xy2oh2arv4737jtwrbd1vzapiqny4i1lnsga6t5ka412bfkl8jrslgtar512vfxz41wih7oeoecdu0dt2ed8dvneby7i5uclyxqt0es5ba75brwppnud4ycmj137z5og0fxgxntzty7r26xk6oh8h0gm1nli4dqml7fha38hbke9yy9c8npkx2dtpfv5t68b7l2kg7r3yni26h72e475rr6yanbrsj4xjpbifth477f5asbbei5tcnv5c4umdhg06hjjl17zx5vcfu6ltkmbwbe96ssnezdie0srbt2gpxiuyvk3ale2jvdeoqdg98sx8o5mni0cic0k9xe8hiiwhuz6imx18g3b4bfo6wpyh1pbhih7oixcmjpu6h81xu7j9ta3eg4sxs6w1okmnrzfbwu606gm3h2kcci7jmm7ju9kxra71ao6qdijkgrc139yw3b1hje7muuxwbxv43ol034pz5r9sjyqjh6fvspbv22co08jb71alziiv30vr6fhxucdshmerkthv8x8fvkwgkxidybkl84qyewqw7h6isasw0ct1d6zikrv5ba7duwa02dk73qdm7tz5kax3qewyx3wieck50qfnw1cg04yg9efqcywah6lenvbosg0kco3b17r27ys67uph8n9iwuqq9loul7qb4rmhlyrplqt93ne0ssicvvrf353enxt7n8cu9xsiwv0wm9csoc6yll8yoo12jf1ayui2r5wnl7c8sn5eskdogny7f8hnx6j7exefi6d4oxnvfrzvikjvndnet3j0qq57y8gf8zfk5xup1jt73cy8l0qjgvxvn2tdszihbe4nxn3gudm13y3xurgotc8sqiuw3roktqbgp8g5ggc2b1opzgdvgbuzmwgluvb2qee8cjxmav9drm234ie9bj2nksk3f12r8j2dohfku3nwpl8vt2ao7a7agavxlfaf08mgnoinewooxklbcr19ycefrxi4v66rqywknpmhcgkt9owwgywafvimwnb82z598nmujue9xhsp7o00qgdljxj54bue6gdmji5guz53q1qopoer3gnev8fgnz6wkx7mqkitiexjx1wtukdq5esi4wp9upwqdv7kd99zb8lx06pnxfu0cyie719275h76jlyyxk1hyfni33884hb2ou5bfw5mj6n1syq6tsxaqt90fl469j1trkmsagmxdh6uirh1idpiwwwdlpx',
                expiredAccessToken: 3359010154,
                expiredRefreshToken: 7149835404,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306',
                grantType: 'PASSWORD',
                name: 'kkevr3vybdxxio14m75fgsuv2diegbwa8s9rygqq5jl9pbdnj8b51n7x352sy3evg6xx56nodixqj2ecuhevuyymexwpny2vjxoa0n336caav0ufj5y8uodj0rvu339tehp5fuxu7vbjxu2xtxi5j258j0i80sswldea2lslfakyf1kuq8tsogju6dxuil7hmw07x2ebui45a08jestehzs4i4bjjc0mcqcghnyj3eq98gs5n903onyvfoyjyrf',
                
                authUrl: 'oiy5bgh5yogphx375me5lg8lpirm70ngvbuuenvrqxre0b60p6fl99cxbvlkjxphb08fogbcb14t1qz4oe4me48xz2yc7vrmjdhsv1qobuidey99km8zofs06sz7v1bxis3y0rnz74xdb32u7kjvkpw4snjce52srecur7vbyj4j0kbnsedconqzyzklb0ckqjih7hhswh4nneh467rqrsid02u4h0gaui4sn0m1kxxncgs4mo1ynskqnuhcmy66kzaqibzh67anib000iztsz3hjocidaw2w1t50kcp53yqf4d7wvxjl9owu5e1s1k1ks970ce67orljfikkmmyzilhovgx4nfvv2ipgrqupmzyqb8okgiz008sjzsmv0evqf0ef7r6p1gh9wec8bk33tpptsewhx8w3cv0jhmyugrq354kg1q9ilfdvxy49thvhsfqwootl2ep3wgai4e66zbj1hdd5p3p8b1z0bx66f1zz8p7cm4dm844n1zz8shq3edo55zcy1g2n1f34w7gk86hu8kix5lbzf8n68d874uj6nv2ghs3gci1kbauz66p46dcsijdu0ncqhyueh90tspxvlk00arhfndbnwo2pqoo6w28ty11opmvaquxyab4zcnmxzinbe24k8u7mmv7kxbyov0qco38lsq0b0iyqmhe0y67y739zxwq8te2te3eu5qcnbw7eig6ux5ms988j1n4wj2frj3h19pbczwsvnninz0kup1h5bsylx0kf32z1vosq7ewnyzl7rmwf72jchxurequ65or8b1chpvcjb2372peu9a6f1ilai3ztcefu24ntmwy0idatflde1xrt038utg07teg36leu82x7km4xmtguldy5y04odk7rurw8crvs4y9ngir108pdfj42saak6ve3v9zqpgtud09opm6xiphxyjrcxucz3n56b8ii1ldkuypu4aoi9qb0fkbcp3aru0c7g7l20hp88k5ip1cnmskdpe3dd7a8lmuwr9hksvd2wg3usjj57p9e6ir1v8d8u92y4zme0yhzq70n5ke6ntclmncdiqtx071za0xp0h35lusztp1na293ormsqvsnzwczztvyufwcw5penvogmc481m9pillmt7zz87pdg29c0rquvckbvqwj4l3d3sgd4q78sixvqjd55bjlr3hxtogag4y5p8974kjk97txmm29d8use1kli78hsii5as20zzlemhzzu0l49hghwuniph54otlwdc0ep44k69w4gariv3rirhmhqjrsymafxcvz2qtw4tc5znqe97rdq0jn6klvjdj9cgr2kqe9twyavepo8aztrztoiua9lxu2cjw4mxi7vr2bi04lpl1vd48tok16jqs3vki1rqd6r2zfuzkqrmnkvopnsxi5xr5h2mh7u8a5igziu94f2jq12p5nhv0hzef5tpxr38r3xc78mx6yn5o1tyycms0wpw6o10uxgvevpcldzgfr8ckg9euyfrn9acr4vwwi9cdr1g1tvt9lyiujsevdqhggb7oz88laf35yqpkv2h2bhcxglvgtxyxcjkfhi43ob88fb6stcnvxgfgpwqx2smrsyblozblbjum36s6krnu2uz22h9amuv22bninf55rhosffs8b80vsl9gnm1gny15yjeribscrd3ni6f6l8aozhnjx9v911cpdoyq1gdf5lal8rypaktw0dvuquew4rw1lqk0mo7u05ed4a0k17fmyewrdva8ivkt2mdthk8qwi2cdsanbp35dzg3qo8c4z3m171amcfyeltfyqo207ogw4z1a5evwcupe77xy3mno3bzxpzvf409j69lqua5jhnc2aozxnqzv5i6mrufwxb18lbgo13c8pe1vuuco5k2byfzzzefw5b2gz6ivsyyshynqrocny1uki2sdtwbirij0m4ewyzx0sn8odwxje8xbxhhfi7g5mb8x7orddmzrwcdjfw555twpvsieo91w6vstzv8xywte4m2kk9a2r78mrksdmau',
                redirect: 'q88sdnp6xd61vkzpkrf9qw4myo7g7gl2fjwi55apk8k82b2qk2n76xzou1vxhse0xmo6azbjw6ulwb5qmyatjxw07m67j2duzx37dbbtqw3swz4sj94xykilxgezqu95l7qk2xauv7ublhqa8hxspjffo9ospodoz3bwr4wbfgk1kp294u393ldir4okfkdopjpyg418ka4jwz2bei1830dz2uwmpjrrcm3ysa455iz1s2gg95ehyc41c0fkkuulaha1vukyoho8z7ktouovymgoiu3c21n6mflag25qd12i9f8mal0l9mp795292beeqlnsl1o3qhj6m8ozcmkws2c0n06favceb2q76p25x7iz2qbkndyk20lsamdbsodmcqr3abe56jkiz30ju8wecjw788efqxoc506qk3bii1zrov0tiy605zok8razt1tbrv48kxqzd6j2663rjbxalfi5f37x1vcrp1gwf98wmq6vhzdeem4347ttib5h6kxaf6d0tdoqrdue51t65ms3mghyuc3mz4wmqu3zhiff1nmzwrv3dd5p93impxwszm4lyr5mj4cy7ibdovq6fcu2pxfyca8o2irn2ex6t4m58bgzqltslm1eozk89ucjh51sm0j4o6t000ynbm18rcjq2yb2o7znqt4cezadgqru5ghhnd4984taqza91hpfn4tpm0mgq62lvrdolkjebw7818j0ho0rgl900sg78p8e0sik8yf66myeqpeh4h95kooj7jg7mhav5r32s7gjpnzaf9fo1wwtldcymogfmz3f8qfh0p9im8r86jyyjxjrkjwu4fvbq1fs4kej8u1ax5m12w0nmmxe6chwyljqldgunjfrrz1xmbm2ijiqodiak82omkkvq8oh332w75ierviayxnyz93xyuvhd0yxlp3u0b4lnll182lpgr4zksx6rabwj26520gbjhkeq5po3n4vcaz1nj30fm5wbmuost8xrnbdmwcu4gwnk5h66s0zaquo86zialtpc7cd90srwyeytjloeo4kios9taj4gyb4bjaiz4jhuidadme3q5zcrp5sknqtgpw5f64zhn0ylxegewq0o4k0k8tp798nzr4rjq7bsydaeegn6qkgkoj4xvu8oitiat2uqzptxivgkqgrk7friw61dv7ggxlwc0w5vawhiqyx0g2oyj6njb6w36r5nc4vs0vo4llg29t9wfzjuyu6efm4m9vh6r73i226ez34mwurwkmbs54uu3ojxhy1rqgirt1dp232qq171q38ct3fh8h34ejolgmv0lujvl8wg3h3x0i8yker4a27osaneyoh92yoxizr3r5cl4a8c5bcoou7f5seziywx16kqa35296ee7mgclo1bc757w355ifo8g8hgw128tnbusgw1r7pilq6oa9bg0unxasjeryamspq1izoaszeoigy87w7u4af3uz7b8vhomggqqitwa3st5ctaxk3kacroqvbacpkdd2ggnmm5i8xoluvlzcnxjq3seadonjarvevatlrnjtgifexfg40pg4i5mytsxj50uh5i8vc1fu8s8i8a4zen1yx3xbw26rnwpwabf53rcgxbachyij7zkqloslntywsuxmk5idqnth531r6i203yi21rs7igf54amkr4g93bw6hsz1immsk0m8hfhuqq5yb9mj3enikw9q3fgoqiiaauuliei4qt2w9hmpyz5s9esh8kym6tvffl0j0yfjgh0966r8lup9enl139e3fso8rzzxlvw09jbex56l2lmi48i1pbmp7ppk4q2lshfruemqou1rdrhd9jmapgf9txgtxcsvvx42l19xlawgnajaerbfm3373ia28vm6x198zysredamc2n8wqts7qc52plykh0tjg69r2tt0azjv7flup40guukl616z334uj1e4v3bva1cp7a2q4jbukwljhqhvqu6hhx66tf964t7oulxpeuzsye6clwkshqdi5fqsyd3zfknft8jh389ppmjhzbb2',
                expiredAccessToken: 8055045610,
                expiredRefreshToken: 9592958928,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306',
                grantType: 'CLIENT_CREDENTIALS',
                name: '69hw5rclhkqbkcwp27nw9af4fjlf5ytdpwv6j7h1accdznaurypdtdio37dl8hdwdcp0ldm65hm73yvhfw73gss1kwak4j0ohvv190vz42sl0ey7nxixe35t2pl3f1fs09gegtx85p9qryry3xe2hfh9kjni0bsvz07om3oq7qgvugbdyy84geosg6xx38whu78ecfaaclguh1ldp5vhml5r0115hn26ailyamiea6i7qrpkxz8ex0xpz8bg7al',
                secret: 'g2hcmnmpnn0qxkd2efmx6zqi2qvcbrfs8v2qcvb4tp14i53cg6xoea9rvzh8aq7tuo93d45jyyf2v8ohzkaye41096',
                authUrl: '0jme5id1h9rz9h7i1i2t593xi1hiernmnet3c3kdaa18l3hm0x0rlwr43duwr4ans3fxyptmxl8uwvwwha43cb6jxyzhgng3gia6ycvmh2tdtooh41oeycqyg5bee4ga8ih0fx89eyun2m4lltq1h8hvnonaxeysfokymin2qwkzrlgmvcmven694uzuzpoxvithtxivbf680l4ua43by0upnt44wlddmlmoo7mj7tanik48fg89l5gd39g5egw8bu0i937gacf302iq5lzfh028soi90spvh2b9hzgqiqyww4ddjuoog7b4seld0g6d3eto5wpik3p0c1dk5s8yhssvogrc7iao8dhw30v4th29qn7n9u7rzpj8cfx9kwscr353d5g5k2eg8ybfhubif6lb65x1qngze07v9rve990hv15xap9onpfuj68yk3e37sh4w69ke0nup6ey6ljmn0ih3rll9i8bhwzbu1y78xjrhzo1bpet5yf810de6tc7shsy7v27pqw2tlxope9f1uf2zdww7lzrwgfmdryp7gi9yhfvmzfk7pwru1gl97w9my63n9vkl7m51qky1osq98hppaqlxiyxf037ks0aqeclm74u2bbgerdihp4azfpxf5gc4ud70tkxs5da5jtmpwcyucq9sfp8eo0jpqcqra6f8ymj8tenff9fj97fvz3fwgm1wbpnyzaolvkci74msi5bmtinhpfn4rgna7lzh9od22b0aq60s107o53ufs2y4rpvjybfl05j2ubmro63m9gsp0jtmizhoxgd4pay99el9mz5p5tw1u3zudg0bpnhx2mjnk3pr4warq85wa7eqf447pq15coorobybp6wl5aae568arwmudohrgcp6hcej1aybh84xx875dkb938uq4t5ply7dzkxwb5k18ispbxrgixn7jb1mqwktb2t627bnfz303gluujmpsxkltc58yxkm23e4tlp5ee5hr4d8b4px29plr9j32m155mttq96b7b7u9eu02epifis2b6n3mygl6786b518rt0bm4b2h272hsuhonacxn24u03rxu2ypbkgh8ntqz6ji0moo4myh38km1xo54cuwbf0haqcn4gixib18demji0vomuknxq66mekgy6z6cmx4va2qxprsvi6mko5ey04ftyxp4g1izu3lno8bsdn61cvi7fv1hbw2pmkfc57vm7w5payk1xlxuia7jhn6q35jwppge0kprc8sr46tewg43hc0upr4m5pfoswwtlyf2kgc01oc3526v70e9qskx0kpx822bxt1a50ybq6giy5721zwt99lm8908boey9swbjlzvesuxveqofxum2f8dh453f30glmes13eqxj0qwutmskyc91i2t4eixsjroykcrz0dmk3ahy06yzfysoipz0zow5afyr55zj3en17uh8w94g7ndkhiswnnl3wr58t991aer30fck2mkfjqzlr6s9esoykh0y1vdbcb9rdkh8niitb1cl5n9z1zavqs7s71l53lpsfeae1460dfob2q0ack0tgaawytunj3iixjf2w3kq5zki6igwqf4kipmukt5esjwra5wb9071p6dd8vkozm2nogzfuupoq05t57weoul4m5twjay9iazvduiqm614xp4f5hpeh0cee9em3ey0t00rzb5aizg0h117f92ldsbvsri886grpeqya85doc3stl9vdbzglpz3b5871tn39tccgpb9s58vshui6n6tq6djosrzg4xgeflput27p098s5v3fa4a8xor6g1qsc0nujg27akspatlq52xsetcf0hbesvgtjzy3pn52mfsc7maadsfxg8ryye40ulgs3roov0u09yp50z9tm8o68i0bm4keopdsv2ivl1jkp343ntootiogmguz1hw7f6wsev8eusm0oafgmweb9ss0ak765176i0bk5o0fejca3z0h5urw62fm6j935t71p6edzxs7r66m3ak0gqbyc2qh2eivzygjc8jley',
                redirect: 'ofn3hrrntamzzo4ltcoukgoqe0yic22tygyirukerz2kgfogffwh9lmq7myx3v0uhqxs3j84iidgzkk52xz49u07zugsd82x2eax3uzzhbbmtr0vs4t79h1ax1dab96byvh7f4dapd51a592kkobuohtr7dwprkewb2tj5xrx2e5u8ptkv10joj3tmtqqeqfojrz7yupiycpwm3s486mbr6f7mb6pqh5u36btebpzx1v89gtux7hynfvkqt0930v0vgfmdj7rdcxyk4yvhn8nhowohw50vr4rs21dt0hraiu33me1jto10mbb1n7598qydfqdymml2cgnh7ybi8653vylx16to280nhul3watxp2osud51dnqlzrde70eglrzk7w0f1ti481udv278ewdmzrd1gi9dhv939hy77566n3pomgoo9e1v6aq6tm2n6kj20idf47v70mab7x0p8bbgrbhdmi7pswwh5emrfuppdil80rnkxsmllwq9k441esns1dvkun5hgb52aj4h27oqoqugi332adyvhfglii56ixqfojwegelc1y5pa3xa46mmag7zpq12h9pk4h7787o46g1vcrk0ihme524knczbjchtdefj0idcjufgytz5gjrfxpkbx9ypa01gg1s6xhsvxedevo30fz3zqx41domgf9bloadel8dldzrquleduu59sjzhu0w7bmygy4amzpq8o3v0zik5s15r3abcut325rr3mp3obkq0a5nawn2h3hd3cwgncjniggtikvagnmv79elkqu9p3h9uxsa0yw3auz91mv65e6pcpm2inq1qy8jd0gaqmxp19cwh04sy7uxfa6mrmmzokjde3ormqkp9v2ncpsg71z794ljzzuwlg7g55f8vi6bcvzidj7c21nprcogb8s8ejew26t9glqd0t39ditvh9w6y31e1k37vloeer0aarkqwt8edrw4v5a800ui6gxwm5yovnpgeuq69347c152cq7heqxjl9280z8dkhzc79k6qx3uhikjysm36c2j06fjcli87mmff2owqq58w4uxjvioztsoq0yzuk0dpr5hvmog4oi1153n60r30umiz1q5yud0u0nl4ka9ezyth51ni7ng9no122210xlpkfuu2zvvu4vok384qrrftgvidjdriynsxl2lmb2q4s2b4zuzffqv9scb56kfbty2b3rn75xor89mnlukenvktlqm2r5xivrdw5sj23u7r89382a0u4qtg0lpxouctu9p0q4i9o01j3eq30t6g9fs4y1r7uo4vweml5n34rw4k5swtv7hxzkeg10xek0k4le5tnjfnjibs9rdkumz0dgr1h2n91g0bvjhxy2yh6s1dofk84xylymy46x3s54ohplx4ef9l4eyef6d2nrljb1qupw3kboq7znclfwgcv1lf8xxu8pue3pw2qeknd1ec1wzuag8l8t9rs4l67tt9rjpbkmrh3ww2dz4hdnys1vqvhef05t86gyrd5qawnjs2sgqxltif53dyj9jfesbqgs4d5mhc8woh5sqfuxbbev727tf99dfmz37g2jxwcrt8zxbkpveyd3y73qarksvouqteg2zvng6jbfaylxzu7f1ce3ds7x86k2jk3i4xni39itjl26zdcmqf5rik8cvu798zjbcf8tg89ghtan8x27k22qtxkarf5jmndyafyr0ac6n9c8k6fb08qvp6xdz4lcxhdjnrhh4bb4e7ag0fdr8k8phgi53sdp2guhpauy3mvz5wle4lr4dpdr32a6n5dn5sp1jwaucaerq109kw33ueqsqscls3oy0yi63u7y4bq6na7ycal05fs3r4l3jovca4vkfksz6x456vta5nzies9li0th310kjxhmh7p685h96ye39ikpuqjudsshxau44rn3a1he6xu091uezpta3yt879hsek008s2w1vy1bk9fgo7x9dt75g7778acrm8xyvzzgvmynkatqchb9hdvslxl6h5wq64nlwizmetwyhbk',
                expiredAccessToken: 9616610625,
                expiredRefreshToken: 3126960550,
                isActive: null,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306',
                grantType: 'AUTHORIZATION_CODE',
                name: 'pkuk8nl91aoy4bfeibquaa3houhj17khbhsg23r9gutxwxd4hm2ehmp6fejg1tqfpk87wsr2fy223jki9ysebmwl26b4vrc4s43uluems20ien55ph2zv0gqw1tzuftbhv4xpwqzr8z9uwu64rak4bwmiub7a0614d8u3fubsv30bnvvhuh3iaz127zhje9d0z8rz13t0db88ccw7wutfewl2fc46d77tkv4uacajcf050a3b1nfph8r3wxk08c',
                secret: '7q21gfh93uyn7r9adiozek3u09jcy77ekvjqmrz6kvw6eq0ejx7gs1p29fl8u0u6mrsoa3j48kb0kktoje2s9byh7r',
                authUrl: '5bw627nyvd2isy8o0z5xdiqt0wcx6btworurmk8qsgnp2bxz1x8huhovhs48kue0hoejbcl317pubabxaqiz0wt1m0iqyeseketd7kq2y3s6wimb0zmijba1j4wypukiveq4s2dtiblkt78j31mo69e4lvazam6rz2af3ibx0mhceczex958krdellrq7iwlya1rejuvkkjdage0moffi2vmfib5k3u09evdqu6fz6oe5i4xke56c3leykvj8rfsffvnxxrtoy1a6evyx92w60rshjddkhyfmztmr465wezicyv0fuka9kghwqpjuaoab5ahwzpvqjti6qhxzmvex98mfpfo44xy25yi7qj0ch7hlziv70eg4pzatotnabpgvcl7jhb4lcxrupzqph88db18p5ddbokqehoj8qdpu7xut13fn859gxvbsl2wsl8f0p7g1kp587efxof75nzzaiz00gwh9xfwgwgsblq0yi73sutvg35y6bkgatct3cmfyryphvl8bd2vmlmca3soi6o6bjguxk7hw8vacfx9x0lcpxqba41e6xh8wqstj90gv7vfwasoetot0qnjp8h0oqanjsihyufmaqzsxbzcjh2x3v6naapa13k3pqpwpdjl9kte2f4i15zam9r2g0djz2r0k02drijro8azo4nj0lq4f2u0qkw84vxk8sygbydpfusy1hnep8on7urznn2e23e5eybdzidee5w0fq2dcx75as8su8rhlqd4rz4x3q9ozkg937rtj3fk8o70qkdb308elnmmwi1vidgvdiuvzqkxs8sgdbepu0kywvz0ld6ng93i39aimzz1iz4c6zemrnftkvwzzsmd49hmyy0mxget77meil0hd0im64ol901gxdo0hyjcqneuwn7xcw4lau5wp5g4w96ela8x9mngw8i2bo93yscz24p5irwohhuv7fetsq8ls9tmui9hj8sjzah2aag6rnulc2ankl6nlugyx6ymcpf49981rojubfc5ssycffveo85sb6tebavapf9kqlfytgv6rtn7f05p8ketd3dymgutme81iateihhut734taas2iz2h973gtqqiod9yb2xdfgh8iq2i16a5jvy61ocyt881rsvbxfzidvirevw096fnjmqv3iuobzl3rxnu77qikwkquu166tev8gf8e1sqe9t300elz33oc2h9ckn49yiiymhol4871jqoua07f6w1iqtqcgijaipcg6wky3g9skxzfdfvtcbuce1fcl8futvjyzmy8zbw1oudejb877q5byb6o1k5dfxjjjbz217kwfmjxy9lqfvr6sa8911isfonoe5ximrklpqrdc58gzn302fekt50mvz06f008r3ada7lh61ks5a6kpqjmb62avd3pswlb548024wggmq0du70ntq87zpufs0wg9urav56r1v2mbfdgsdh2w2591hfatz3h2qasjzwmu3k1bue5raqtbhaiqx7jdmf3pmqitp1hapyd3s6aylack992fqf0tpf3pgc4kxkykqhdpvecruhzlqkt1lh7caar3bhwitrv0r8ene0h8en8x5ya473j4ng3gqajf69pzjsckvw7dm9865inprkik8bboztpd2zp1j6vxgf524vh0la58x8jb1w6evum9svv52uu5cp307c8ayx278vvn02bkoneumy10ogq5xpmcv122ywztinjv0x9ebw8abdozpcrey2rs49f7ijy5jzw2icfglbn1vf2yg6y29s2lwlqn6zo3hkdje9z8yr9l5gkx3nlzeqntxfx2ojh885ubi50mpbxi1ksqp8yefwqhoji3eefu9eenxsyih6doc612u27wqlftirvl7aw55sxl27upr0r6xzh3kyxiutkw9j0hllujijj5svk1vi8klkee7zbybdq2kcqc5gg6o2z8lwfnkur68vk6fqouroxd6l21n5zacih83emvnolsgx4w73wjm8hp1vjiag6t0epetl0qc7fp6tgmcwdz36zqy6f0',
                redirect: 'anylhvvwcq74vt3jb7yosf32p88auvuwdmfzfc26qdf2lmmvnccwohu2wkr2e59ai1cyus8ikvmlrdr8up2yr8fsuong490vu7jdynz4k558wtyvo5c7wv7sku8ye3gfwset7z3unkxzb6m0ukgbdtjpv7g3vdolekf15265qvtizqd3r9ijn3m7ffmlt9m0uwum1ool9tfk0ppa3vth5ogv956q4wobj75egaxr674c1tv5kis4hvm41y5rrepuolcf6t8rh3ryoeycp92czv2ca72k8ccf3l1h4lwiohwl400cwpd28ki0a5e0ci118em74hi0lhv3nk481hx8cdx4gi6ky8iieg5cwvrwp6umxmer9uex17q4yrkdmf54teg0pa5we44l338lqtfhntvlcvw229212flkz94jokukhlygzrxykissjj34vlpq9cns44jfa596prg68yatfbb5fs6ln1d7ibky5im25nanavayzxvtbn33vykop17cu197mkmf9pa5c0c33308w2c6mwdjlr3jpd0o28hm3j6190g0jwig3v5yxh2g2j9j27mzvxkwcs5gfib2f24hh3d9h0t00fca3ekr4l5o0th8qb80758yqorvl05p992mobah1dqh3icglup1ja5arj4ehjvoonjfcyd1920v59q6y1sv7gj6bwgc98uus5az1jvwvxd8wn4xvp8w5b2e68q7js23owpp46jy4uyocf3wmbxv3plkxa9509c1h4bc8ly08wjhn7vwdcp4du70zzgen8siwd4zilyuz6q788cqfr8rr0kxwggjsrvaxax4bbytqs0nzo0f6cuzz80wo5ab7qp341sms1otkhtqbvn8e856n9l0t5shr1lpup8lzbw6gm9yi96pwvew66e48s9k4gxn0visf4imdk0qsxqjm9nrapvs5fxo27tyt1cu04ngvto1tkdy5r15njclb7b96q0z1p1l47uwlc0cpcdhnk8bka6z1vcv8k46jny98mwlwwi0zokozysodcezjuwggqxnbygqvlcq7lwq7aefi57vd0t12z2z0wke61on54u7i0g54q9n3eiqs1i3pzarlzxqmv8nylgilzvtonsqydj6hqetrw5kw3ye85fcopg347sig90eq3m1nfc0fmy1zj4t893rai2bjnbf3ssa64womjf9ytj2f8fge7j448lp1teu6hlg6iucg824jogro3go1pan7w9mx7v4jfzonspmdjzdxakc4j23aoa155durytrme0a2x4r6lvzp6359ndat3npl11fo2t107lzt9ovear5rm7i911hup7pmymfs57huhdvhcvli7veoz8ctz75v24fcz5osiq7dje87rybhaamokzd93pznvigqek34fggpg45g35xr8tecjzw3tjms8sbz8mj3314esxztlrzoc3w7dfizgkzu3zxhiz4qj4jbcyyt9dmw88ilup8btseo8iz1w2fjhomv4kjpui6p3rrrlgblx887sx6yznn57k554jh63hl0jzq9tbj0mv8dj1724b5pozzdmx7wn41xzf91h5zt8u8ubbcr9qlrlug2y0v8otam2uhn6parbfccjte10ue9xe8352feawn40h4zujqsg6u60gsyhn2w1desg8c40oid1zuss9fd9zyy5t5nym9iurz0xf0sgdkamkbxzivrcajy7vmz2cl5l9ar9o7s2l89r6i8gsmiu5xved3em4l2io777l0cldbkry3o0ibvbyqodshybb9nog0wgx48n6rykl964ujk9nmhh4mvk0xq2kknsigdojttqoyjmf5959ezgr9lol74pkuhrdnp4ybsm3t3f2sjhbuus9z2541h8icacibzrnmzjypm9w47ditmzxtj6sw2rxpzzp3t2aiqgnhr0ay44mhs83rb9e926zhg6mxhpj9w8lxn40kgj91i5lf9u13fhvu6ywgswkd1dtwowefam50dkryeo1lz3j87bsn7vmtf7gwuco1rb51cwb0',
                expiredAccessToken: 3606021229,
                expiredRefreshToken: 6107120749,
                
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'yrtt79pap45wks5kifufwpnhws4h2x7iv8b8n8emlb94vnfakz35ii5lbnnhtk2l0smw77dmce2n8x6q6d5vfc1fgmyle1shzhws20q1n0b5js0f3vomqhx26qjheev83lz923tcd38aua9yomgl9tgw84gwfsb30bt7dlnq6hdahf0v57quzugp4rauqv0gjqimvapmwr332t7trjol06uj1s6bmz8iua2jm66u2mhtbiqd2dfoqsqhk33tanc',
                secret: 'ra98vwzfhssywr0k66dxzc6cqkjssp9qpgrpbffs7xg4xisgiyd2x7bfin8cnhfik4r9c1blgaa996vr3tal0xaq5a',
                authUrl: 'plve9xadtq0jbdenyrbeh8lwc5iaa8sex4o901oj8drp0in4j6rqzofbjiw6vsi7mwyoeh0m9do2bdr2slmd0d5jlkjdckcu925xcnyx2l3wsxcz7ilkxf88ltnkunth5gc6cmdpe84lpw6yh1r5oa1wr1an0k2sfo9fwcq9df627yms68vlnl55tak3r85b0yt34bnw7o45zu0h7w1fmtfb4q191ls45f2syqgfojdt6y6h6nv4paebrv6km25md0txwzc7z0snlb0y3y2kwgehu07ffvhpreg21158t8swpug7hl8jeh9ipdrcavfjhal9gqkbai9bx01r7wwa38t88gtboa3u4tx6qf7vwao6934uxwd0m8rx57jjztwt7vly8fou3can7nrgjda91h6i89502vqpl6yrogmcws6n0gbdod10ul91trxchbyhzdfw6goji78977myhma2j0ag7kx5rxqcy7ex9oj1z788tpc9cns0pldtdtfle7w4ll6rgxtcaz93iks5pxjdrtiag29i3cszjwubqwoqq0lsukj3ievijhk2relw77cky3k12nt3cvgrpmvjwhpg0chzzltt3l8j8dmtxyxrs9s9zeetzgt2ucf72dlasvzultxguey1svwhfrroekxeocuclhd2rzlr4easlphxf90gay6x0t6ojqzke1aweietn86b8ddqqpe8jmetm64b3q9x2223salav373dtvzms2grutg9mf41hrtl7b0iz0nrbi80u4b7kas74lgjqw4stnde6jatvymr92h02lzjcpwraq7aq7bl06hs6aahnbhhj2lr83k2b788dqp7eep18xqsvecc41zmipicbi1acswq802oyivufnqip61unggu5vaup239kfa54kxo10zutaht98hf6komv3nf3vyfeiwp34tx18idsvtnyf35mcixjms2iatzqfoma6r2lw48kl8m07r1tp481lp87ktqox3ex2hu7yaa20fuac5pnvf2tgjkxj4ris7lwt5xpgswon0s1we8uzkce14pmvuimfw3n2gbs5g30p7yfryuooj5hggh1zyq7y51qyfbki8jwvecsmx9pslyhqd5qrhvql6wwriamuqbf0286axbcuqme6oh1rjxinfk915earv2b998hl651xoes5a7oqbq2iskeflqkauhioi58lhm2ivstlffeza6oq4f2jejc8auuy1ar480v2hb1eysczoa0hf5n140llo7ylcs1vbsyqdsfe5fdfm4o0xbpbiir03lwt6dv0uuysfd4fvf8oh338ybogkxhvobebxm4l65o0vuduz7sr5kchjcihjs08s2xj4g1v6aen4oc7r24183zb1sawzyh6aef4nu8tomvkmh84qo5ukt1iy2pbskmkffxe4r72w51l4nc98fltv3e4j9szqu512igmex83785kc1v2ylsmzk42rppnai9iww9w0xvrqpgh8yh6o8h61rgxq7eoqt8v9n7sl6f1b9e0l6b0lhvwk2mskij00dufqh6oz4rijno4xrklhzxwa2fiwk6f4fle4y9mz4x1m1vaynuyg70e22gm9dk3f3kqkpk0v7i5kzncx7l5oshol9grwf9imwnkq5vnmjjpnwk5hcp0izijg82ebohjcw9k5vyhri7f7vyqbvu5t2ryblfithwfaoem6lhi90kbtz0u4ps6ie59k11b4mu43ioeqj1w6bl3uka0581voc0a9n7c1j0bwrwmi58d32prw39d45hxwwaoujih70hqd1uj08fjs51jsze7p6iuig5n7b8e7aiho20ngz8rmxbpl6x3au8ltzo4znj1x506733nuxgodookcvuf3fcsvig0izjzy7akkkgragkmofs3z8mqmnr4m0986i7qple731ftelw2zf83rrw3o6mx0etoso1y8vm0vnk45l0yepi987opdj5u85v00vwpmcvnx01iy303bhk4csh94gsqmmagbjfvj49asq88mxkzp91yhyie2',
                redirect: 'z0izfx5w68vwk1m5pk202e2yxg5h821ktprgauvz9s1e7vf1idpta09pl2zf1nosegrog06ljd4mdu8hy73kv0bs7ky4xyfgprdf4rwcqhrlya0zxqivi8e8y6446mx7ct9q1wv2rly657qesx3zep96t51hz92kxn1fnzq0xt4c22w7rvtic1ulifefoz15wuicarlffjotlybiu1f84gh40c32ce4udxpobs3wkvyqt47uye7miiixi5oo59n9irtg3kf83s4wdft6yaq512e4n53zc3l5gutrurqzz4e57ilqxpwd50c8ay1eq5wi4r55svwe0fmtf3ofebmpluwrnbe5xk6olio9q1ssrtz675yi9wkrdjfxmaie99mj82j3kmy9qulw4f8b8451oyut2u2tak339wyla27rtvms8qnwtybhqbtfocg3aga1a61hqbig9jj2lg6z7vulmax5za0qkpgfdmdzgdoc4z6uv3txqtw0kp3xrftd7v6bk1boixl08mhh7gffc7hxn0b46vxwj47fzbzqb3eoa6m0poi2drnngz5f48kqb5dibsyvf9nvvstbye39x18yqk5h3amqk9d5tssi1sk4l6jd9ck3ljfyjyv0ih3ewuki2h9jfgc7g11x4jxzee0eydrjd2jwtff13871vx5rpruwqsyj18zo2uretb7oqff1vt1qrjxktp578kbfwkjgq3pf72rkt7gctbae2kmk7mc7avq3pbdk4zp8pzgf8d3acpenho7zbr1plzx1jkhsp5qc12sif84pijezb3r50n6vac11wtegbx35nkkqz8jr7hcwjnm7frmq0h8exyzg1rhu8bfg1vzcm8t0b5fx54uhn1wyw8o39qfqxpcnztfwc1eclx8icg6r5mum9dezrsvnctdm40jvuk65x0yfh61eud0l90xgtmctjl1hoz7z8fljx0dhi7i7xatznj75mw8p96az9h5v083kdhjpez6qp99ox3wuprfxcvyvmsg85tib81vc63f9ccyt4xgq03iea0152dzgd3yf6on2kwakj3p9q4efz7bc19r6rfh9vwyx5fggn54zlugtmre85qg7nd1x96pqtj7hox64d3s1r5nk7bz4ec9ausx25vbtdzt1raryi1v5r87r4fe7kxxgznl7c94eq7toay1we58g5uqe7anu33fkda855uu3xm0k3emkaqsp6eagu6sv7wnlzgirw242vu4inkwomqx17rwyari6nw3hocs808re18fi3ieyob5g8snykdbblfrp7vik5lzqj5hcatvhhv7ptz6k7ql3mbkzizbolw3nc92kz8z1viw2ly5sclg8bhy4ehupyboztylgpg87h8x2mjlh6v9bn9zhfpdeio2fun0xfuai8omfagxv8qlfbl43i4fbjlzvhvzpd08c7cg30vha5hz0wgestrl5q91xkjr3kvygiu4g4zkzyfuq4rgey0r19k3ptbvmfj2q5y55jn5wx2cyp6tstkpq209zcymk8z34gk1q6f4p0w2be1pcn93naqw0u2pbtopdwaxcm4m6zjmuizdiqv9px6e5kzbo4lj90aemi93u0lpw54ivlz5zrolw7bcflzyz97ek41relq5l1j2e0iv3bnimkfh5fvz6hjc7t6v1hoajyoow1l0us5f0w9sks8aa7i1wu7i9qavxbt0y4omrhypwkeetyoxwt48hty2xbf2dv1ytgb3oq1y506uqr8wh1ijjlhymn7imwrema915dfhnpsk6nghhvmlqfhzq0e0jsjvr7hd86pznsu5rmi9cfzol388ik3bk6ki817o480eiudljjxvw63n00cku3ia97oz2nsor6lhfbta86iu324iq9eoaq7ldy1b1ttkpkob6mb2un7hnxuo2k4pvye7qakrs2ztfr34dy19yrjdskwoxva35gy7hfljd75j2v2ysg1x5xnbhqdju24gqexy5i6zco3mlbyo12rwsqohxy2r8tvhdpn0bt1q3pr0u9wy5',
                expiredAccessToken: 9576478401,
                expiredRefreshToken: 3392800356,
                isActive: true,
                isMaster: null,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306',
                grantType: 'CLIENT_CREDENTIALS',
                name: '85v1mcz85jsiv2fo2jggy08ywb7hwuikj801jpcdd7dqbpiibft8rvtcnlpnncgchokbqm8ij0cu45m4ek9q71f5mdsk2vmc5keq9im6jcneoc7rbiaycd8jiccfd0qkb8id47zejhgvgqlr8u53o48rogdvidzy0qgzrbi0yaxyurkeqzdvssaghc83w5dfdov8fyii29dcs6nxsfxi18nzfiv08ethzmr7mq3i6hp6av3guuhzl3kp6n3c5f7',
                secret: 'ky2hjb6eikiojz81nqe8gifb7dxjahp9nribphcix4tws705i7jte6uxtcp807oeqes2lqboh2np827n5blu38bt04',
                authUrl: 'i69f52q4gl5fto1z8a0sk5383cn8gg5purlv4kjzvolmvpjpq577caakdnk13rjc17oluk3a31p7zpn5p6l9oz3tnik6wncamw8834xz77jp0a2ib5z5b4nseqmuoin5p4s8ybw6q8noosymt3l8tf1sgtpd9x8rs646j7nxx4547lbborlh4q8akply0v85dyqunkygevviq3g0zunttpnzms5q83ffzmndatz5vi6jp5vutw0uhamksdmp1ncgur5m6qwlzeefcb49f625mt55kb3bg5v9jobx98lt5cohe3gnk4rulxpevxb963rt47ib12dpp7y619er6cs5x93fm6wyvsc853q0enk6m8akmb2r636pmfgisxytelljbtxbz41n552ni4vl6tqgy1qihwx3ffi6r6tec2rxlyo7oaivrmr4vd3504rx1dl09dq1detboeipzp03wckgwhhwsr0aboq6k3p75ysa6yjvv8m9fdxs55z6mf9h1phkoypt2uy3bt9khmmvsd8r66vdhwl4z5d9e5a3xwsq87cnmj8dyzotsiyaopx0v0szd9z0jky006h5zqz4w4gjg3ldt82hqddh8fwmgk5nbv1m1w7x1hf1lwd4h6mfi09l1rsojd5kw38pobe9wd1flsaggju7imb6pwrhbt69b9fmfnad1qsdgjylihd7a5vyf4vsm2srrtjeaf4ewug4nescsg9130oga5ys5c8nouymgkevpj93x1qwslgxcej4havc61zfaxi2agte8hx3ltvbzn6jko54xdcl4x9h5uk8lrn07vjs8rrezrdmzvqeem7f3me7f8ah03n93tbf681erj1mvrwoatk090r579n177awjl4ouvw3yznm6wqjddlx3wicpy1o1jeoyuitj9srcngv5r3b9twy4wv0z0los8cq85wzbkepsj9hjgmv8caslsxe9lsftjsefraac83vl2tvwv6t080m5iw25n6dgokjfv2uoaq1rmld6ofdujuid1867kfz3d1ebu4nonjcipd74w4ysc33fi1sxgqv5803zxslljkzyv5s93djvo9dhljxzh28ry54tnuapp9i9d7t1kl9iasb5j70b1rujxrpfhyp9lgik8t9hm9e0n0sjualv7f2uq6flfpc87grb9pft2nkats883whpilldoxgw9kjjoitac4b580r412229ijr0f4v9fw5tnqiw5uvtcszeh6zmegf3pfgczdo7049r2p9uv4mjfzqhw0w3kx6pudr1w2c22j382ba1wd70tf20yyliqrfdhraq1ll8hemiq1ummgfqqpg8hbtiy5yfzs32efceon1r160gaggyo7xxl2rdjaznecmo5tpvr86y5r166sok5o9r4fj0im6rb24vhvqucc0jrz5r3loma0v6g9x02eah6yars80yg3hst4xwuj2tva4xa77ar4uw3trk11n4wgvafm3n8nb4nmqgwrg26n3t6gkw5uua7etjwca34bxglt1hzlbyf4freyw0h8ebnxzvm4vgtdorbkex0r81y251wi73zymjr5dz9jmbnlb4lwhypoi41t8u1o0wiay585jtgw8um48lmogm62rv209dcqc1jpt1aednwzm0hfqgfz31ikd7ick286j0h23xdlhuh1pjkx3xi4deq1fc7r22f925dnv38q8a6wdoe9l5wukzlfiy80211qsi4o5eq7nlufdj9bdj6zflkn6h0g0esev4pbz0g4itnj58ewqyhvqpsru7dkru8bbgt05a3789y6x91zj1ol2k2s47cc80ba42mxla976d18qhutc1l556ysg2hek5dfrlqoj9rq0vzk6xtpv69me2wszcjj2qfmrlhb1fw5k9yn2zw4owsxbrdfk0xzl7ndrxqzu8k2lt9cxqpx9mxmsjeoxgpdk5s41g0qlhahqcsl4wrftxlidthhcxp8roqzh7kjp38alf4chqeddgmxk1obkalhhzce81fq1qps5gnhe9p32rh6r6wn',
                redirect: 'en27a9bhadd82ovf5shckpsiutzztghwh383wb6jomjaow0n41ragw32d2losngkyrdrd5wmyb05p5vhrv8o27i9irx08rs78tzub8rzqvpo4g9nsu6qjfjnffioa60uewlethxmdldsgk08atsyxzeo25pz9leuaztdh61im7swwe33en350jta7dmjsktxiiwyryvviyrh35bbgg87b2ciiylti5tp1kznaawkt4ucvt5o3wvokc8k3xdk060kxscg69tjqr2wu0wl0mqx20zi2r43rqr25kpvoxzsr663p3p7horjqlbx5v0nf595j3kb6osp8ccgfhjui12mh19z53zzokvvvrfddyrd87w2s6r00q2msjficsxgjgqgd1vyrnfs3shr4hjnooxuq6sf3tejlqxxjt4nq3m32bp1qasv1lb819u4jjhkzvejle2x5isreczw55l4vz3oparzudbh592doxsu7p2czkvg3y06u0xlo8copcqjyvqv5q5p3e7okn7pjnma4nimolqj581f3iw8dtjsqeev7hc3logjub0jjtko91ouauel5q4a92tvklbkytq1y4995gicmycvoirn98kectpa27gn4svbwmweiqxzimd17dmxk49wiej2gxjeqs2w1lp2et11v8gx2cna088x5xn1idfj5xw626bt7s3q2gq7r76dmfr2t12tf7p9fmque4a5h9ikzitqku67we5qjvgnd3kvghf8dnsu3ldm4uqo90b9smc9grd290auposm0a5cyoxylki3d5ag22p48qamal2z9fn13gbvsxzvtb971gl2phpqtt4bkprz7vtnjh3i0pa0mmcffoq6t47uzf11yv2peixos44vz9orccgm9p91rsrrs4z6m8416qy5rgjcz8ns1s4of0fx8llnsdp0a06elabo1y3hoj4buwnkpdvjuzkn44jq72vitbz098xlynivgi4unsnowww3ef6iigg7lvvrytiox1ogv2v6epp357wh1yinafuf6qqu55wht1h1ft1nw95zwt12j6cia920a6lqltxvcryeiatsdofmp89ds6z8xxeh7fhpyt8opot746ji1dg89il9uqlsurouwg0ezumes7cxhvnmg659xjtqt7o80vuw8wlc0x5rhioofmsljfcjfk76fngkw47btqr86jcx0bzj3hy0lm69ff90bqt03abazauj63ycae7kzsqlvc7ne0kn4l4gjo9d4kf3my77i82sj8aas9z0nv7gcj8ylybzuos7c6vqr51a2o3qbuseoo6brxq1r51hgs5wv2bt090eus7adb9c536n5ov54vc6ciqnjg4q3mpct3fd6ygc0fur50ik1b3wrynorveqpbnzm91hj3v79sv2yohd0b5kec5y2y6x15xvf9gx5yqxc3ndo8c3wgcz5nnq212c2t2no598n9r5ydpgqf18qgnzayy6pg77v6sp2bxxq76w8makzag7nprq3xifboex5kuhmd2zofbjgezuqorvxg6hj7uf5vy56rkwz1eksokiqkhy4vvdh67j9n92lszg9jegkjxgcf7i2stckpecj4ezu41qr3rmhsafroxnit6jg2i0pwvpczhgpzu5w35br0hsa28i0les6m5103oetguj6c9fr7u62kvn9fvbyzllrwhhu7lmcnfdnsmgwjsxi1hvm5rwtyiwyd2lcb02ohgyzhlj6whao3tcbn6n36zpqirhxli4swjrgud91wmm14xhmfpk9rtt4m98hnaohaiwng8tnwz530du2wemuzalxk28jwf7hokq52g50cx5bdab73fvykr8yfatpuq6130ps4gll7wmzau5bfuezl5hjz4rcdh19edgzahvb1nvjxrs9gf1bnzjv9r2ile3v8h9kv1qbu98bv0y4dw54vf88bzvg1oqtbtww6964axz9lerbw55bdxa7u1629skpil14jkwdyflgluo1r3b9x3ir3iozbzxso1cvucfusogigqimpefdmv5',
                expiredAccessToken: 1062413088,
                expiredRefreshToken: 2423154797,
                isActive: true,
                
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '3r1kkydtqwf104j0r5fmfzbn6ice6c5b43s9v',
                grantType: 'PASSWORD',
                name: 'mic0zib68gmt9vu49hc4d206nxs16zz3eanhv9de352cne2estjpdndewc6svqg3llslv9i6rgezu5r0fbcklnh5wwovlk453kkxa64hzmtzxrp8dy9ikpoh0vawdheov22lgcvzve2awn0dzfamen9c9sxwj842flb3hgpwpajrddjrgjg6eik20g4emg2h1c1uwraiwvfp6idokg3a955z6er1sw642rk21f23udvuidsiohwe0fqprnrvuzo',
                secret: '0d9bkanauptqyh4wa5w3sjrnfb3ihrgcjq19bo7wqdveu7mkjbjfb8uzh23ibpa1deib23uy39k6l7z0r1p8gzrpfj',
                authUrl: 'boe3o6i7e3hkmqo0by0we4yqt2pvszeb9qsxniqipw026xk3bv5pivapankcd5vqhqwh3qjzzsr7jvlbj5m1aqc389bli3yhs9qsk9174nqn8lb58x3p3clh7yaviwaloi0jrx1of16k8ihx6bqo1hb41xaz5a27g60d2gds48a1zgug1tvz43tjg1f8h0d9q3o10p0wqn4wr9yubs1faxs1inh5wp5x4pr9u44kjbmvpthlphd1quat3qgqa03xxiyt4nn14uv99144jjd0waybimfb1ytdoi2y9053mvf2rl2hyhslst5c73lkwwr0wsy8gx6zayhha1k4mgu6kja9hhj5ye8up9il4fglnww56fm9939ao9x9oyovstochm4jaw0cshifwsxhiqwv7myazm4ijquv63hrj1pg5px0pm4fkabty2iqxssmgbxr07mwkjszgiu0xouq4gzjhq7gps4xthk31ir586xp8y2414u5fgnz9u7q7rfec06mvt8o1jebdiul813m9v4x79plratvcjylzdh38y9n71xj8z6peiobw60is99xrfnja8txwo87155nar1owyw2hmoymhq3toh0gakf9aytkplsyny1ki5bacs33o4e1rj0ea6uzxpn0v4o4xhn2qp1gearad3iz69tal6qpz71b65clfj1k8comdwijwiek4zvqejv1bfcvi7w7wr7lry32tbim4mfwv7j6o4j5a53tqc9r211hyo9o90ruki6a4ecslvxecsvoud6kjf80dexb0ucpxqidueyn1ey22589jeidux1juhlaaitlzmufcztvgz8153h6mg61zy5zpemfkzvk0tgkd1g1tnvygpazma3xba3kgqlz1q05zdfzs2ftcfdt7btkb8q95ccko086sdm0j3gemviw2iml8cjyvpkmxb770sqgyxkivpilm6y30znpl1mcjj3huc5jx18z5ja8908hf5lpnh48sdsq08ci0nyannpl0qhx7kqr7xfzq966vbsvezvxia88kuf6825hz7ubdykcq318l9u6f4camo583izzsw9h0wff62m9iao88a2u9mf2t9a9ojacx8mcr13o7oxtv2gir5i00dg6snfdpeqe0vv4821rg3e0a2z90242bqvvpvai7qkdq3k3fnwhy046frvbkvg7ithvsapm65wpdjh2bquuj6hkynkenkjjm2hy5teqc0mgh3ee0h6e139o514lrti38cbn9hyx46688ns6tnyyvjsrbtt4h5wld5eb5qxifbjrui49i7lbdbpaaonuk9dwbpdyoooij19bg54xvjkqg64zix7zptkz4ctf13etchjlaylmiwdqcnc5snrgn0rgo8wrvqrth3jfvbm88p3dm1mcjubvl2gxwhfj1mtkvko56pvq07ouakh0j0ihmlo6072qfgkxz34we0e7ofaqpdifggni9gwai5f0camihky14f8yarln2on22pwas8xik2lhmoryzb6x4avlekpboiw7d50mq3bqt88ou426nu34v4art2ub733dc3oxnmen28dx261kvhxvsphwp6qqe7q58x4117yiybyyzrs4koisz3d2o8oyyh105l3juye2adqfnzsiwl2kt7jicxzw8fh8p9sku6nn64pv0ooxdd14hfrkgi38r2stmxv4pfcm90s4y02nvn9gurvremu8fnxu56dxq3d10e8u8e6xcrf32cmncu174jlegfwfgufk9w7one21pz5xc72eo0tykqf623zndv790lawwpuxmnrpazelkjm05xtvt9rrf3gqmv6ankegd7lpmd03msaez3u7xv4u4wppm2jivax72az92nr2bdxsx10zkywqkadctesbbehqnu476t5fafkb03c66rhagj6mxk3zptubkpber2lczz7z633dn17a0myd72quw4c3spx2fmfswn710kmme7qirasanqlou6my3e90j2xw0q6e6e3sohfm4xnwy5uouohymmj28u28kcmu9mv',
                redirect: '8jkbbg2oolz54wfrehafpyzkojdia94etd3ehcijnpadk7wz9nmo42vgvotojqgox1rrpdl9emt504pj9ilkbnsikbbs9kwnx9m57a4sbtrntrskhs2yibx8881lphuuw1o2a8aoy86kvlnujjsw36t6vta1omr0nreslvf0ohislc036j8y6uwudreyzyxi3qv42xg6b799d756uzxkjrrlou9jm4a3bttixzapei707a63wnp2vui3qgcjyqplkjln3gk6rxskuqgbrfmhhdp2yo7hu1b55l6sohscv59uzl5kav1t8g638zauh6ij83aum8m087gtjkttz16g8sw84o4sgtkuu2ftytpxexext6uwc8ubxx7eceud9jerftz3fj70h06zj6da6wfc1qfgb3kty4lmyzr5cgam3ijfc9rt5a39etts2ndh7937up1l4i8cazanh19x5k0ccyv5li1uvfilgoyabs7uhve8e0q02fltyd1gys7arsntiq0qmy8cm02meo9g3s6cibqs6mizqrlxu28we9z51q24wbxuhqb55osjd9lkoawdukl8x43ykcdlzn7fbrv35a9yjb33ikud4ny93811ji7dgjkte167c8ghnjhrwl8oz21vtqybkw19i8snlb0sq9ure8utak3drkx8t9pebk9tcjq8lbqd0qtttgpyhvofafve38zk87fh7ezzmunzxw97i38rlhkz3txhf1zwdtt3902o1fnyoy7m3zoaktwgp25a7mq9h75udlgsyf55vmjtx3hdtrij7ij1w7n2i3h46mgesu7ypoldnjl09i1kvuc7n7p431vbg4cxlmgztoreu7z1gdoyve8jkqlj0w4pkivqwk0zivvtycgryu68iv3hrvq53dprf4n3tzmns6vjoaqb52k8zupfwqb1w3h2le98uyozzqdoxzym6lhewam8zt8x7olawqwgmybdrxwv5fqd4a5h2x5qvbk5l91w8zft7prq4g3mb10p2c9shwt1j59jfgtzt6acl25emc1n2mkxjfyrxvvugyktljtfkpyels7tcnbrcvy96ha9lqwhh73fxumlp3kgygrw1smza6dkr1r00075n6r9ywy6hjfue9gp7xgji2c4x7t3p87lxvrd0scpzgtxig8d5iuy7fu728p6g00b1gze2hs8si3a6txjlgno32wrmpye7pqf58zvlacf0zpuy2hw3pss9405tagfpukc2ao1vo5jhb14hcf9yn901sshxfkix3n4fm3njrest60zztnky0mscl6hack1nmfd08wvxp2v121xp72ociq85lxol0s6vboec4aos4jjr0rt9oz457zt1j73qlnpvge61nqpzz4rlzuzosrc3hlwuxh7v09v8kx3s2ikcyqbu8dr3ufdztfkl44uizmmz5slw0u53ujx0g0ugtkahpro6l3gqsomosq84sr8y19c4h8cnkzg8tba5uisk1y5js96q158kpehxoz4f78igh8zay3fn5s21lhrjxllp7khdxo9h8r4a7ve9t2ozdhsav61ogcuk1qs1ca2weedf7gx16wr5s4mf0um6h6sabs7ccfmdhjiva5x712uw5tpq3qetom4tqu150um0e4eprkxaowmdodnanisknkietvn9gudu4zuapvo15eg1x3xime8xgsxei3b9osyrlzm78jq8rp5xbmcu8nx41k97csg184ma415gfjv1yzvvv62p1w7yze84qdx3izdas4xy8rqrmo29qowqn456pdq30a3umtwv5m6at7wamvdhyuj1u0cjzy0bsgjic870zr6a9yuqxsot0pdul01jtifd85pr58smzb7d4vuf71x3mrbl9shrts3c5wqad0ed01ff89u50tw3asx761ngnqln3hs1xmak2f4hb2c1sgaji3r34znic56j3dzcatcv3n4gfl07volcpp5pgv17xkdnr8pxavqnz7oaupgzb1zui10ihdmlqdc9ad6wtdaisuvcfu7aoia19mi',
                expiredAccessToken: 7664570939,
                expiredRefreshToken: 1423265549,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306',
                grantType: 'PASSWORD',
                name: '98xok8ugbmcfgzap0bev907xb3qra7raghbyexzujw7kh2n2jvdlafzd31j1i7xglay0go79gelsn0ctmtqcpaht5mj8c8i71o7m1zr4u0r9jvzutlqvhjfypg0z99rwvj8wfh6vwt84hid8pjq5wslfsegt8ssiovbti0j3a2kyd0mg7lzw6pi3mafdh4xl9f0zf1mefhh5dgmee9z7gkdo76vec8w979tmpuu9s60f3wruxksevha9cdwgxvrc',
                secret: 'hzxyu02gd3xz7m6x1vg1nk7j8h0a606m8e7o7bse37rwa6i4hkey923fsnwealbd5jy60puhcmxleeo1jpvggq314w',
                authUrl: '91wwrme7s5wm7hf7c04xgyxxoradr9lorqyl9ufdv7htzpr4iyty92caubpghp4iu4dp9rfgs608ety8kkk9rccwj08tjwp0jxz52zx9lkcv6rmlthavfgo2hboz4l8ph6uvkw4lhpdywk622h0ibg374vz8ncyn2x4p7vmptsa551wkkit5u119cmkxieiup1dewtgo77qut33m8wpyqvd4sr871warfi0m9kss64hf5kedr2nrlb5kanngb812k6l0nmsy95axhh0tfejx12ptlrcgk5rrecy80rtqds2dsj1jkt1wdver94bvn27iqnqijsb2oodpc9pf76985vysr2ckpozf58v3xjofkzm6mgrsxq6yyrejuxprlu2f6wqkqa68n55d8pwwr3vp0v8zfd17k37n0yku5kgjb7d8h2cdacrlqlhi3jx5g1ckq85junb58jx358tjccovgqnotr14h6ocwz7t6ciaawkmk1d9aqx88zfuqs6n0hugn2brz7e4eagyh0htxp4ljvbvspyc7lhptyhamrh983ek5jijhe7x9p0uq8nzhpbiqn414525yro7i56hgb0zev4w2mg7iwasglc91r50w5k8mqhilmkmvyffz4v304yngtjtfdlus4ldjetromiwnfcvworbibzolxm1om6273o9f16lzpc47215f5vfmi865yu6yb1fgmrn4ahp1eb077b9p242mh0xmmwpyryyxuljeybmikxi8whjp1mnlolkqmca1ilg3g4m1w61wvfm16mdbt5pta83mfwtwg9gxblyqyzau6zwt83puuy28xaq753ym2c2zebcvgm0lcpsqy7afli661x99q3fgccr0kzg5o5vnatxivz5wkqdeq6a4qxh4oka09vld8m1v5s6jkrrb1z1jd62m38zxngmcg8uy5aiwpgof7xcwntq0m7141r7lr9xs9hyptbpo9k44arwllqrxdltcgrbp2nd2uphomwsyz2q0kw0r2zai4rsfjn2ovlzaqf56memhpthiry33vffvkguriwlkluzuf58xngoywmup2pkkl3fnq99rsky5smozckx9de64vr14khlryyy0dmf7oe8wtciizze0d22visu84frjwktgb91d1f0jk7lk8edlusl0um9e2f1205i03as8bhoyd32r4r1lv50arpplvhvw8z2usf2qpv10x9da5wld83mfu8ddzelbspc1pcmussb436dbdfxmw8n167p7nei4sgcnzk59ngrbqu78vzahomvgpgt64hifjf1kn4pgtokiue7i2tjfobcka3846hq74kyx6scv71qosrv7cpkafvskpkl8rcak38tocsz0ocl6rr2mpg2zhpfpk7osrzeuros59be8tci1na48qnj1t4u8nd65fy225u0mamy4oyui7lqh9kvfonvfjicp2bd97dlzaj7og5j1ys5emien71z9287iaqopa9wbcd38trrjimu6oii6b7458y5lrn3pvng5kf8syy5g8cwt0wak9bzbq8e5a60drg6gm69re06mabyof65azlcj06caipeqgv4czbbha03gkd36n6ck5z9u0cb22fv59j998gwsw9ydiymq2lkpjqekhk4i1wjyp33xk5l65lz4e8jpshwhgqps4ivhe3onhxse0a2a6lgdjxsrpywaiu7cpdc72ygntaydj4cyg5ozq7cxrm0gkf3quj1tfza0zaghubyt3jxibfzdedb805o2hhblyrfk5od2s4emoix9j3g9krnwknm5i1jhskg7v4oxw3vgr1wikhj6l3rj0ufpdmsf1bxsgebvwswfjs53uvx5pas9qntp0n7bxs8wzt05kst7spesxzhnav4oqgmmrdtdud46q2euqg0q27xg1fo3g17n4zv1v72jduulp6ek3epdrag10r6fe48giw2qyv7f959sui0hdf2x0blblxl31txuuf0avjafw1k6hzla5menzrxizf728fw9uwaszzg55ys8iy1m7ji',
                redirect: 'sodrt5oc1ah6gtw6k1ecub31gwb5btx42cglh26l0nfne86vh694l4t78u83zy2tsn294l5sn6ig3xdgpt2fcoy6fw66cx6b6vrdb7yhohemeapz2fv2lr9akd6a6nz5ilwhn1wxq71ml9qzicfot22f05o9zbdnsnnofbtgp3khg7ghseoad7s07n18o67gm0mxujqadl0p9kfvexw57jwnwgnfewknwr7wglwv2oskkp0xh7y3ljdpu18ns6brl4pxihb2kgbfhkm9rtyy6aa7k3qkud8c6iy6f1gjfc5pvtncbg06em455olg3tsijx9ggvdrivi06qh4jzjvl5wqfmdlxwiu6n2bs1ox56c2rjpelaomivqumxkmqj79ol4twlinpf7or2n1528slnqasmiy3vlq4vdbl5ex2h1d8xibhez6secwgn462vqgeklnfx4085goffzfiw71sx3iiwwblrzmkn6b439kwlzo8s38sv70ad8jeiyeeqi0q79t29qrh46adnb0m6k12qlc7k6qqpgbg1v6up53ywnlstqk6e0qw8opbx3kp3baf13tn0idjrdjnfm0g7shyu20tu3tzfb1a868mu34jsre8n0yes9jq0so3sdevzhd0herbhdn4l1tbn25s8oy4h0lhe28k5ry3osa4sq9xf5i0rg2lbhdiv0ybfi960p5b4lgsku8iuusid61iszn77nconvtoii47dy9untrocnhma4n9if0optau2rfo2jejtml04208kyhwnaazklk7dtwbbwhzi470wffjizge1ny3zyivbosb2fc68ydnrwg4npsgz0objb337wpf2c4h1l289fdjynkge158w8430yg38vjxf816ot30c78kcl1ekv7kntq3v6j1s6szoatg2gg7qnm2bi6hftbuygpmyloo4ok4tv51nczpvi1fa9dx9w0ar6tuzrmue8uuu979cxl2w5gu0luf39x1z1zl9zyoae91afzgrwxnt66rle17j19c94gsvojgjfvq8bs5t5apldxw52t3db5vps6z8997zvtw3dojnxug2gwpfnpawor7uz3f74bmlb0kx8sckbp07txxj04e5jkts8sdt81izq0eisyyofqos733o62odhvjajbgfhh2tu217wxzshnld7ftywvu003dv75o9mbeei3x8rs4ax3zhap8uupqkoirmghrpat0k0s4g670rw60eb91mq36idyvse2bg4ijt95jjqx2o68n4xoovcslyhco7s5jg3nlr61zgp8xy2mw1hivwzgd4r4obi25nz7ikdkhfe0b9oatx0eojjjtflr8sphq2qgq80i64axqq2yir7vkch0f7lw95teij3zycc60srz7ipm2qdwfzoo7crdaxss1xsamulaoky94gfq0k7ehkz60qx680wotb3gloko1vj80rlm72mwg2hk9d9wwv0kv71o5a46zesng8gijc2b116tn37aqc0de8i7hzfwyfzjl9zqqg7a6e6l7sqdlmsvm9rwajuia3o18o5kn86jz1t1knhwquf93zd26n4g4x82yr6ufps9y2jhejmhltky4htwi0hxmvhnyrzc27071xrj4w2jw5z47ql2nwzieyfvrn0f1u8qf43s3t7nznexw2ah1sbgl6ikd64l48a2z28f68qzrhmzy3uj4dn5y09y6y1s5uhrp65nfc943z92fy1oi3igvhm51wd9c1p1b8cqzgib35oagn80oua4h8eo2r81h01vrj4hps9nk604xcn97dmzsrjvh831m0c9v95mnwx6b5bjhgepww4ec6avnrewuwastp50k09ejixj2crpauhhsl9eowatueccbco14n5nzt3bwfpu6ig9u13bp5g77nl7yu89xrvexcafr1ys1m6w31vdte5p6qxco18votbqbs5yuhmjn7ayub6398yqja7lmq8axgzyv6qwn9mmg35p9c40zh0cm28yj8skcala0ere6cnw7uirixfq528eqabx4cf8',
                expiredAccessToken: 8131035155,
                expiredRefreshToken: 4924276948,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret is too large, has a maximum length of 90`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306',
                grantType: 'AUTHORIZATION_CODE',
                name: '7tncktdrlry66h7ia2e3c9t9cftwkv83iui82lepxrvstbbcvzgyut8xn59kakydbrdilsuxyt82eho2rov3y4ybpjqin7kk4kwwc78eaerocm5bxxpk99hghikllbfvqskv85ke52vn4ifhdrtmyemzh6w8tqx9llupzq0jy28j7on1zp9anlybva4pz5248xdks72qxf449dceqbz50clc1xikwsrtujq0d2lb2t74qennuwrarrekrf7vt3o',
                secret: '7rkujpwa6sq1fc7hg7ssdrqx4g7ztmyz96899si4tt8vvtl1x17d8pf8p8x98mb186bic66o09bv6k8g30j1t9jw74a',
                authUrl: 'plogwq92dvkc9mtqjikkjmambg4e3sqpuvvm8juhz52720cb2tay6h6om5uxh92wdukq92ijcln4zpbr2i7dxdf7w85umxxpglqz2x876t83gc90q7p6k1lksn8cndrzj57el2ml7hh12oqbfkjklfpwezhgybpqizmdf3uw03g6r87yojm2qcik3xf5qcql4dkabnrnnp7dsmwl24ta839caq3kb9zhp2km530xspiu9elix2hvxk1f8ffc4ajkwspsnms7j9g4ec0uq1zd32z6isn9n8zwcbila415lkezt8cs8yjo8tcwrugzy1gauqebrqou392do05wkthzjgbxi7g0fr9b0m0ik785491zpbd6qpvxxxeyc5mcb9skt2blwxmghqylro6wpg1m4o799oropzh7vxq2fx0mm0srv25z4xk1ed683wgl0tszl2ym6cc4j8qrqryoxpb4bapu434dqk436r68p6r36ga4785k24hls14eailjpeygdzuh1j28cpmh1mjshc71d5lgtmq5ir4tiegzqeq1piyk3r7r0zq6v92dokds5ch5lli974cqhtkku0uhhvxg37uzkpczrmpxvr9ommdk8jz05t0d9gwk1dlywykd0dx5sp22m3fyxkjv8pmmi9jjsephpqjdp3lrai5acafh15s7m6e8xj0rnytce3lmszf84j2hrc3hgwun24nznu5h9xfsqr4gevs76s4gcmdmfohl061lb45nv0pl2g3rugwb4j9puxqgxbtqyl27knfc0y4pt5b9cvneln5x23qh147dgyh6dv5d9ghyle96iynne2fthyi0n4ampoc0e533zf1bhwva7dwlkbmwxj0ws40klvi1sfobf5owp516jvs1v4xkpjlubz6zr86b432vvsvdwvs55cdy8z7mvjlqb419191ksrvwim94d1tvnudlbbz3bqv3s5dr8ny66w4ff001e1hamlry9rdgb2fwuehvb1rlfpfaczf7uo1zsxj8mmvlhg4bbu2s37enlfv3ujg5watsn8icj7m9jvsgwi1jentgo8p917i5dq84mf05t923wsjkir5mf7ax32zx1z8hv2eivf2l8gkt8ra6xm8w1y31iy64298ectrgbpf5iza5nct5t9kj1va4l9onceca4wdmqmcg7qnojuoou3m16hek5a3pnbqmdya4koxab6qhghv5hadf99u2lt83dtgb70ljcmorgv842xfrgya5o4zrzhma3k7mioeygsqplj5knucsdz8vtk0lgy69crpltgheo5ffiyw1eczs2l03t0fgz6bc3yfzm7mkeoza03f1rg5r5iwalvnm104nqpwxa7srvob7cmu3rbgg077nlghbg7ib0u2vh9jbp1b3rcovltepuowvyikavidl1qi787uh4fcvk3qm29ir4qk8oyabxmorsup3y6dolmkj82yhlfh3kpadknd1v3nd1ral0mb3mptfuqj7fms9whypsvbmwf89h1ksi7nqojz82bgysdyw9pewc785so4pxf4eh7ceg0lqic0npykw3kephwc5095qg257ssq8hwq5a81k0bnuvksfp643d40clbmmntqz20xdagdvhhviaor80huhn1y5ykvvkhukvfwunksyu1shtpi0gp8fm9cvajk986v2mm43qe885xdvhuwthgqcnvqoszsvvapcsteq5kl6f97b3ffpnd88bzpk2z3tmuo1fc4vp4tb42n4jg6dza4edkxs424xt2a9waebhpmzjjagxp3yu6l7vasfgjdns6fex10j5uca2stojm975hkzct5geh1koq06niedkf6zgk3l97iaw8yt1okcd0b1k8xocu3bu5wyktimw2j7kfwr7ozei5vli2ma73q8b99y9fvps3g4cio6olj9km0i0dadf11mycdm0mwbvgu9bej54g0khjgp7ivpnpyww7ecypgxxrld8fucqp7yyfn7jvgaehgitxjojtebn8j95e4m8pnuv5bwyld5nyaz',
                redirect: 'xlwnydj078dt32nao3x3n0n2iaa75sbzkslu4ggcx4rvdd0ul82cfbesmh0c8d4vdssdkc1c1tnp9hf4eptf0yi6u2b23ses3c7bg41auoc3hnow3bpq6jenu9wv27hfb93fwn0xr0xe9zv7q18fw5fr6l8td6sc3jlwnfxu7ba18lo5vehrx51zndy4bhm4fp17m2h7hl9d2hnj1bbss2qyxad2jxdfpwiswoq0xc61tt90o13b5owlqarji8ahbchvipq2brt9gx5ud0atu1so24qo0psf1jarxka0wk23hq4kclkqkvod2vq5l3rmbqwrucsnxxclz62bttesr1wf56ihij7dw6z0xos3qylpijdvhhwh4o02i19hvhedmept9pu089vegrfnmc2tkxdyekv4va08wh3tfbwoc6huzdzig1ff5mphg1tbdftpq31nu4dz6akml4ni610vhf79yemvl6c64btq5w5ynl5hy1ug5vhb7uypzpue6uskiuded0fzzba25jlzvwvp8jzkx84tjcrneahmrnh5ahfcotszauq77icml8tns9smu72ssbzfy2txi1r37xqvvyk2e6skrc8qp4oi3ezsle37yn9rqwzqtwjt0dsooj9hqrqqreidp15l58iva6xfn8hjcpblakbl8k49yazeu242uzvtbh79v6rn34oqllj7ulvtc95002o8xpu3y0vkgk0wa1wob3vevmbo7bhi0xg02lzgdfsh6a2gd1tys7rcq2qgtv3o73ke775t2mt3vm8aca1hkslfozgh845vv9unl9eppy4nz5lq5z6o61261vfn6mi8mwdr30w2tlh76jk9olu1cmg1otlng4rohkdu62xgf2ffxyfpm6xmfx1vqsqdmte1dilsmas1jt9f4ft2yoonljy63m4ilxalsj64zhz101xmgabkytcpjrv043i2ma8fp783yh1cfx0xgvq7vs8nm7vpu69fxx2ih3ioasbiz5noq0a941rnvhd80h2oxpfnkq9prmlzp23t4vk3vsv5ys0dh4iyx9ongg48zthsk2abm3qpdur1dijg84l2on1ii7831uvssa1sg9e2j5wl2ntlurpp4ezztk8wyxop7e3ncnawal21zxtk2iujp65brs7rhvlru7rbrc8uwot6kwy7aanhmw48raqy0c9cnc8jnpt3ijc1g5e5ombawyk4fhnq05mci0co1dwba7n06duf8d7qajnws7q6e2yvbwdpsbk3pmkmp1al0cfvhz0k2l2e40s8qj5lm34a6mrse98thus2jhsyo656q2a8576p5t9bqebakvne7cyxmanycd8bsiid6gd0roevud4uj8jeqckfeafxjmn9jicxipxf1t7v5qq6sl1tfpr6a5irbdq4t995f8oa2exjech7w1rx9q6rfz9t3phdoc2nsltr0pzkqxqltb5g418so82k4ixr4sbdujiyj4h71w0btqt6evo56fspe86vysozbjlzba50whgqpam1sn03t8mpflh4mv18bsfcu60mc7h7segmg15c5wlb3bcvxmde72pkm8kkj6raq79heojv93bf1kidvrw39w8vo9xg1e6v3pf97znpmzzeiaqbqd9jfyvdvr16frd37lf2sl1vtged17l7d150czgrzaonb3vzlx75nuqco2v1xvdpry1fbcpzhbgsg80trlw4twwf40uo90m3z8jr3i74jom8nyhbt6flgwbvuzeydl23c25f8w57zqx0z36uk2qt05am0rirea7h3rlrfo5p23xk4au9dqmvrglfv273dcacedk9byn9evt1rgtwlk85oolped5gykz7r5tagi35r1q7xtmro60ti1pkceff8qtca0kipvjii33zex6tx2ax81ynq5qm4kl0onqiksfq5ktfkju28ntca5e37meya3vtt08v2ijl0fksxogif7d1ud0ykscn723umutzu774ahd8z7409ldoc0p7w5rhdyald0qfucxd97k1ktwk8sq2',
                expiredAccessToken: 8809318320,
                expiredRefreshToken: 1435903523,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret is too large, has a maximum length of 90');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientAuthUrl is too large, has a maximum length of 2048`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306',
                grantType: 'AUTHORIZATION_CODE',
                name: 'dzwjm0g124105q640ernnhn5arxx74ustzom9mcvlebmk69qt4mw2onqcuanvu42idb4xvjk09a6e5j9lot3w9p2gv3yg47y6bqvxmvz8w0witj3f8fbytdbsi5q2se8tt50wip2z8k8czaih2d64079nulhne6zfn715qbdrozesapwqdueuku2i752nstn4rphx9a00nbdkw78sfimqii6grdbukfyhdf17mazyhypvoewj9q0eilbsut6z2y',
                secret: 'kwbnx11bitpxs3cd5fx19b48u7hycxjgxj20y1ekn8bsmktcrryzyvetahdnkox9hqbirzmu395yluob8lxbfl1m20',
                authUrl: 'p0ej8i2b41z3mphm5zxcpzu0c0rl4rirzr43w4eqt20zi2350tp4f99rv258ljsy278n896uv0wb2s5d7ftjuqgp4sv2rckxeko9l5ig2npbumjr71xy99tji6o1erb96cvhtlsw31vyxn4qfwn8s22th8agaotz0tkzyfse1c8a2r796ildgrrspfq2x6g6i9w3tb68xtz2gzm2jgtup7a2s7i7je61d3cmls740z7sv23kitm6j04mrgg3dy2utmk7qvpixznlci9u7r9le7flik4q7ksfit1uohf89m2ef6hrte1sd5bfdjktvkdyuly9vnnps1snacgycntdwuishyo1afabp094ag0bquocux0sa7yg4vyl5pmiqm633ot2ycxglh8o1xswjfrfoblt3h6ryqi0j25a1rpdn5ctgfv0239t57d5ry7r57b1t4vy7s217lat3qwcf5hpdttpos05lm7pem9pob4rilvu7fm9irb7n4pshhy35km0wj88vxcj2er5b6dsgq68fotzlqnfgorovw5b71b1ojbpqfuz767j2ofep2d7ebpt4j9s8haumrnm0cheia5vth5rs5jrs8wmify4ke3y9gm7hdwopv9mnu5pdualr05g024bc83bqqnyf2ifl46gnwevwbc285nugqhpjqtdwyqxb0wn00x0578dc6e1wn7f492z6dagvewrhc87sm11ngaadlsozv12r7zbwk865zwgo3osr5mtw30dzbxzx97p910n60lr7kbw2iyd42z9784d0vhz6pjpi5yqrw07gc1yc4xf1yo44gtkymkh6pbgn2w83nwgm5e97hzhwt1g4gqgj1cmqspz12e58lsgtr56mnbhpbwng1p7bzq5dldc92wbc8s7boq99tz5iahhryrvl2s3cwt7n4es1fybt89n7lu59bw2m0fmvb8zixroslmlmycmj8xpoif9iz0zw20809se58a8r4egjhfuqgl4iw9yhsxvpwygn43qv7wcbubsbacl7j9qzvtyq94dngl4u2psk383bq7sqdie6j1hmbafihsx52atxlbkf4s7jr9dhp2fdlxm0obdrq3t9nxi9q2uyk2xbz7fy4nini5248ofi2zwm8fdh864m9fczl0bhwl2fw8wjro6n1cjjl7fozs839yujk4tef74vwkq6ln30a9iafd7wco8mg26w65hqapycyw6ik4ahiad2rbsb2u4ckk9ya4wq47bw45tufoxazpi0ic8x9rrq2da8m3046kah3l0rqt4g3h2m4195c6io0dyetfy29lzqzsq5ueqb48ljfs1qwdqdc5ica2bsyrv252t90rtbdji8cotyobl4c2vgsxll2hjzniqkenpjmxu0atq73vrejwp3gntwyhj65itcdlt7vkhblsh81jz97ktw52dbxhyw72jl4darjx8ein2dh5hzpjfi1yl7rkmej3dxvo55ojqql1n22uzix1kf4hjv37sc56z33ctmt63a8xx7qm9xrgap5xvrv21jyrnu089ybiihau14ahgkzum8kawaslllkrqe11be8sdyeqe6elmh8nrml7ecsxtf2zpiwkbjqrn238f8620qx9dg1mui57k504f45zd6tl5rhmu22qwomga1avv626s26uqbybdo5ofy5opwz9r0tv02r6jy5kcvrdr7vlbqzuk3548rs9ove48odke1b8piuvvdhish1dgp8p0lcpgogxl9j7xz3fp2xh4dkmmizhvpumx311ubu8vscbd8gv0qhhlgtpd4v0wa0ilktyg5g3pizjtll2a99nlgfhl5unz7b8e5ccfxlrucfy29uk5wer4al8trxof0xteyt8ne3g5bz45sl7wjl21mgym34p483hpviv69k650nivyftnf3gftzw3bormpg9p4o531snej7tjb4vfvytgm3p1u3l4wy6d8e8v42bv3uh0bicskzsvmk4et44qxs9yq00yas66vwgywem0gris1i1za0n3fk10vncd5ar6r',
                redirect: 'orfcb269z7i2gu6ikjv830lp5vxjt27bzm7gaih4helsr30x59ge7qgqv0yj6r987hib1yr957nkfo0rzvdgp6l7mgv4glbhqlduyg6t4s9bouxzbhcfm84wopr0ajbdqmx500xulw0tqc1h96d9vltlouiwz2ojda5l9ifnw6xrntoxwepz4x7ox6q6ipi8ksna5is5s59oc6t4aw32iqbir7ih39qocdpp75j1tsf9a7wi5pnv6lza1bzkaw43zcvz06oe9nkprrv9ux7ri7oaw9vf91ailr05mgdoxzfm73y40nl451jztsx7faawzm67wu2i18zy3jf1igsyrjsnqnpjyf3hh6p3f1nwn1ahy7an0z4dmwgnxwaapio3pd4zxrklho3w2kkgolmq9v273podhfl9qzzitdphgpeavo6s5dpnl8il2mqan5rjcaq8e4am88uhegi7mib1lqckkyk0ndg6q582c6p6tyv3kgk0l5n3thn0ojnocae3yz81andcde9s6lznm80op9rc2e20os6f15t3teayq8a0aylg4gnt25v9u4hy4q0bzvkolox2fkxi5mffff7j1ow1dz02tieogjnzgp1cytgwacue8l4r02c2fd189h3tflrlm84irv3m6gd2s76h1l9i27wdwgky2buhqnppc82jd7welwndq26tb2u1qktshgtt3p0m6ll8gowivq2w2jd6e8j8ujbqqjrpgym5b2gpv00boobzml64r9sv66o801321u60024vms7avxb88vo6e6wgje54ct7wvmxq4wjqfvrk5zzqt2e76dr1802sauvuk9ljsosi9j9a89i63nroe9teo6byuo0xrf3jdtj84gdffehu4t4whanur5z6dayde99y370dxausv3fh91476mh7tno98w3zum2ba8rczuojbux7f4aepgjaqq3pmvhzwqfbyvn0h27broijmdvhu9zj2m54zsrmzpi3ndhrdyszgg0emwahvqrsrscj9zphdnmu2gn73if3fbrln09chqvfvi0yepbzw8h84xsf8ntn8h6evmd2u01bgvt2i8d1o6gxxirvlm4kjdi2r3fy0wzbjjwlramflthhiffi5fypu1vrst84wrfecciw1k27s5u1cvjf09dx4k0s6gpgrg451j4hanmfsgkr1piyyh7jrr7acpz9011rwsxcan4eryi4m0flc258kg556pk3lfzhf2wvj972b1jaowv6gazvryberfmgx37m9d82i5rrbokt2y4ueasvkm1t8y09nyft4avt26aggyt2znxzr0lhu7u80gb58p9y12nwc7xwyek1jqv28ajn39pu0yinuoqcjrrhvk1abfyv2nwlhtrcug6qwjh6yl4ggdlffjso37ji7vpp49p5wtggrqhh76rr81m8bjxhneugyjrzqgbdzcklnvxjxytps4c68t7lkgf3hjjfz54urh8jr2vynmipdh3cqrif7n79ol9harwuyvwy1zuiee9p3bz1ed24grhvr4g475ov79cv9uz10wtvyi82i16w34zw1y02mpch4g39sxof3o6mfuxbfliniaav6dz8qdn7r03006vxywqkzyko5n5ee0lzyph7dad294nhuejqwl1ic5zzx9znndrmzmiw90t1e86vil5xtn5deijiwt53dtr055vmwa8eq6tanoxdswcbr22qr6zfk2o6zw8r3mu3j1n9wn2ci0d8a6gu7ustnwqllwux94unmgfew4d6irx12mttdzo5yihi209t5eyhl7u3nkpoha5pnrj4o2ejdyv5d8c6xt184z8jzymrjxhb2exd4ueyfwm6czmx6r131jggnnso93itzpcuv7dynlliafkn7dmmpsswf3ginvpjxi55ra88aybq88djzzthkuz5b8jo4244sz2rvxp2emr70d6o35z128f3ll9ez020ueqt3sdhqd9c5xaxlyquigmesu5rxd7ji57vgi1wrt8psiv6ecw1yi975a201i1ghf3t',
                expiredAccessToken: 3912419010,
                expiredRefreshToken: 4036753945,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientAuthUrl is too large, has a maximum length of 2048');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientRedirect is too large, has a maximum length of 2048`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'wmliac6xumd5m53mvhg6sljn29vdssz2zts88pvyby647q1apv3jcp1naex1y61dmhrdru7rjtb6wlvhiyg5s8ub37495dducxnktc1v6cn9kmdhd30s7w01ys3sl8qidtsxzh6n1es1w6jthh5s0i7kohgndnkb5xuzqt24knbftr0nb8w0eegauwfrnyvebqiibe8vl2nok8tf461cbiphq5kjldvz534dqr53zitgsya2gsad1fwm6h1w26b',
                secret: '0k1rs59zc0nhq4yrgjcdtcp25lna8ge8e5sj3xg72bdbincsotyml3nzd4csll66hpikn6vbrhb4indacre6cs57d9',
                authUrl: 'hdxshbxh1rxamp68abiccvljgrky0ynhwznx7o0aq2fa65rw4i2tiaa0x1pwiv2tqulx6mkjmxlxcoxz6g09x615ftihfjpa0mjx3tc0axu6cgcwfndaisri9nhw0q7ojnjthvd4bbk5dcwvlyg019wi96ounvugo14sy5hbh4bdy37va1tui0slmsh79y5j0luuc2qrm15inrf8aqo8gw6xug3lejhq4kmbdg12b9f7n1plmw3tlm4ctf19kpc27edati97ntc8f41p85vv5m1vywr3nc2i0px8c9tev2tdoeu1xvc9iz606xp6rwsrkk9s5kqlt33fjjwkq0yyglicigg1v5xnd2n3wowe76h8dc6us1zevet0srgxww4rdn1kwdetb6a55v7pzbl8hs3f6qparugw884xfcl342x7sz5ay6h01bkc9h8fale2i7a1c6vomd1e7xjkddwftkb0684zn98dglrhq1thf0g5bkvhbnqj2s4bfbierqfuljfgn24cdyuoyfgrykf6c2pwwuwkl9ftmsz1zx5m29kup3qvpkc5g6ffxi9xvuaix6nr72gcvbhk3ftz5wyscbh6dbbmfwpcnb9ukpgusgcgfdrww0dozmi4bzb8pcpogyi3hjxrjm02n61mo5im6r8c3qhkxvn9gsv2uygquczfiqkd9be714rcgy9tl57jaamon00bw6t0awzmdi3bki9672ly097sh5r2dqvek5x4c0mbu33nzjyb7hnmma46brf9o1mpuoncihg8re7g97z5lbgnxt8jilucrepi9mfu3t0kykngs6lwveai0xjwopepczuwx75vc5afbjuu9kt34ucuoj81oc4k3xfwo0353ldjn4dhhbio7zjz675b9eayh26fu8x9hl58wvvgrec4cb1oghry23150jon72cw87if0rwjp9rljcu2s4vqa51s84skoft5dmrrjv534mmivfipr1z44kv0dpcz9z7dy9g6wsal6qp3mz5khrr9t8zcmodgs1tfhmw1itlo2exbrndoevpasv1sh1dp28v0zwppzu4uezdandjlzf5jdnyc137mx7cvo6izmz4m5qz4o4yv6pmdzccsvj6m11mrk8frulerh2dkvt19gayfxw7b6gwq8jp4q9epmefa1orz8mbnp25034g0tbyficax2w1l0z55kvvo9t3q7d8ynv2gx2y2k3oaq8dwcgt86ii2kajzpnc037myfd2tmm06j3w7w7wbs8czpp1e7masxpmpua2h7zxyvcc34eiq9i8prvrx43t0eroooq8e0d74l1k2191fdni4rgucth357j6iox5re6ls430yv4g49xn7gy7vz45kdlv1cstfq80f1ler5u8f81o6qycq9f9zyfo5jqr95f4wlcmdykfjw3zrqzw57ngdmasu6fj1qflfjz5ce7x7c6l23n9n2n4z62bxnhkqdhohsjjx9g1fejpxq9h8u328qtovzivlqd2ep1w7vvwlsp410lmnwj2bqajuwijtj40u0whu7zemq1d1gp4c05cny9xiwnuvkadfoatyak3zkbnpkvmo2zfaxv1ewudgpu8gomfcpo0w90yez7q2bujvvp5d7utnkjzwfv1x99csa6tx6nqexyqkpavoci36cpnds4gb4apulx16sxya2qoncz798hxu1u4a6uri06nd7evmjs4tevnsn2r1delqqowybi4k4wnegnuvvuj8z5568xmysa6oq2l11i3343hn4dwvx6uvy0aph59wye5f4xc1s5d7exolmdx9s2dfhj9nfdazkh7jxyept2mo7ke0o88f0kwq71mdfslp477s2u2r43085y0uff16uzjm1g7f9xf4m42je17c0lf6mqq542t3214g42jp1s2sk0gbq71a1y7h80ohzfl591b538zivh9uphckwhmuwuh3r1zvxva1appghaoeuwsilf4k52q4e70g0k6n1hvuesvsby2p8pz6u1cgnhl09v5k4cumwz4f3gnl1rt1',
                redirect: 'uh6bzf2uxfl9qen2j2er1r8r1ijbzi52su6j4qknqlr2461mtt39lpu3x229e269w18ucxoof2lrbddubwlx91w72ujmzgskaoe0kmk0al7gxuo6ppm5ixceolrispq94zhbyhj805ypof8podmz5r4etnl2ozh2ir0f3jzcfzgiaplyzmmbhsklgaxs2rekohw5oqyf3ue5r96mrpyv2fuk3dxebl4zxwmebbyrea56xh5n5pnbpqdfma9gyz9rw9hwysb1rg00iybwn59rdu5jp7k13bzgy6zzwoh3sirfaumq2lv6w9xpoqj0k1q6h6yphqo00inum7mj8tr10ozujgg4k84hd1lst2siwfup29ipq2eq2pj9cc1f4nxgye7lvvo8l1tiof9oi60x3abpj90b40dy4rocu6ij5y0y309ao41ddab34jq74ymr0j8rjyp34ygorum3dgnqtx6hgy11ec48nimeu6u7jy5dib40hh6oupftc56k7ixcewl0ig6qzv9xijntqjglzwynxmpm9u9d76tf0gowcjlsen12vto5yj6rlw56lggwyngu8syozb55kzkqrv9zzcjpbzi0y3y70og7nqrbsmcfri5p7nyobn3rcnybpibljk9m442z9fsuxypphdmv0lbvzdfuokzk5mm6n7hiw8wn4bxngtjm2t4a5mhnv7g7vs0uhkrmawnuqfffsora7ouzcgon8gp0zihhusva9om0ss8fxuug4miy2v61kwar3many4r4kyopnf46ivfka5cb5kwqjih46i4ttdiajmd0p6vr4wk9vs1gc201z5r1tvccjkw3kmme68nd9tlbu28taia5r07o6aqbygp0ld4xdik8ofy2nmrto6m2vqi0p1855uqc6bbubaf8jnsufxzmn4t7jd21a5wivc0d7acmmwo5c6w5rodjdtuaifqdhpynv7xj1rgfqsy4quldvvxjq6k91j33pjipbeqlpe2s23ebvmm6ft60k2b1racnm4fnxxjwt2n3vyskcsc6yjm21m1onuxqobt88y6fpe85zoqs2vaqh3e31fsmm0y39t20ngnlomp1yi91mqglck863dmg5rou9dm69gbrm0890bjwt3dzlcsvxmgdestgx9p0xghtdz6z4u89o90vmmyhwzx2tcr2qdn8odh1dbpavsunsn8g38oeg9twekqtiyiahkn9qmxfxgs0mj0cr03sk9xz26nf2plu51vv9k6tipyg7pj7ixeofy5oxsynr88inf8ajq7nzxa73werkky25m7zaoihk1ltiur00yea2f93t65o8f5kg03xuaslmopltehcbshgh1n6wqcgyl6fo58t6piyanjnqdtaki9lfqm1o76j8kuunuprnku0sebi7dxouzoaxy5hg9mqj92dftet8kogcvsulixemo37c8ehtk0axz2c4gr8zbs9s1kzv5vy4emfyka7cd7o3eri53imoqlk5azx7aqxshtylhu4b91lb5tv67hl4o3dxo1sdgfy9p50y19ihprf2ljzae3t3rbaw20lxc1blqiijm3iknqrfub6tn3vm2pddev3qwr35rjfh4w9jx9vvt1914mqpjrsjmr47944rkkx3912zkfqq4ojiqtwis2o1nucl2aagwrl444y522jmo3vrhvho7i9maw3ms10kk7yvvdc6urnwfrgaa9m6l4o7c84ap0p1b1l4nppy8v4z3hriwyg7v9n5y05zhqzf6iu0aiiyqawz2633692g4un1ytj181tpfh2hs23qcq920ic1ycg16ai46azzl7l8afnpqrgkjl96qttn5pct5cv92gy7dx3opbgsu9aeoc7oac6lppmr95r6rp0rubf3iuekusr3dvtmhpopeie1l1tmuixuxbz8yhpyr7ft6oo63hpxo0w9n8p4j8t8c80hakey2kb5wmllvp3aah6ptwpnhepdh59wnb6k5rfskno8imm3dtfhcqu54feh4ko7n58b6yn65r0gml6bmz593fw8',
                expiredAccessToken: 1870851873,
                expiredRefreshToken: 4068350302,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientRedirect is too large, has a maximum length of 2048');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredAccessToken is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306',
                grantType: 'PASSWORD',
                name: '0pu71v3touj26le26wzyj56nixc0k7j8q3eovb1p8ov4nk8kwakzujfsr4cblt6vrrj3vnrc5wpth5vlfdzgp4xpg36jrw7qgs2jmceke4vd3kn62ljce3gcwzch269f71c20rngyhlcxt7of1jvla0uj2dorz5hyrrs60y8y0g8v7wzl5698zyjy0qctiot2cqj6j961jibdp0yla7ps8msb4ylchshm1l6c2ko4986k8jc9kz1p2w6ppkac01',
                secret: 'gic1a0lwdxfpzwyvw9ohsbw0jfs8ku4v0wys4td103zb6p6mdgovxnavdtglro8610d8dr1tksceshozq6uscaueyz',
                authUrl: 's7jg9urecwzvuq7yytr60sua0jnovz41c5h3gys7m2vfuzg4sj9mo7br8qupx4tgqtzb4hqkilaktyt0duzmcwvwxo5lbbt9et22i0wtk6swadkbkugpiyejb8f7d6dxtnnxtu48lw613lepxlordo9olawp8ilci0tnk1kts9b4jtz7keecsgonbqvssmdoq6bpmpprnjja7mnk3eq87thu49ncj5durefvxp0yezlj03ptkfi121y6qls6kknspgkwptf1dfuvonb80yo8y7yzteinbecr6m5q4gmayrl2cg43xl8r1c5qyz6iwehbc0isjb46nxp9tsftz3vfknt37q4v4c9jrmxxnjbhp4fqd9mb6twse5ceme6sdaov5kve537qcpwm7auqemsidkurt1vblq7fyptv375ewydm1q6776kk13vktekx0vbdepsa6129nmxlpw1uimghw3d5w1xijq9w26zry05rg1ld41dwgg0bqsak9tk00kgasgbgtkrmcqyxxplj2fqky8tx1jq2alna3yn7tqa3kxiybzf3fhyzc2caqcu5nea20bdvcewaajlieppn0ui1iyvc8hhe6p4vnqjdm8yfyunhmv1415scr80wa9mqy4z8jdwtdx4ki3kr04jrzk57dqw36xvo4f3e3km7fz3a6irj8451arq2w550tvlnw2kjgdffwq35ymw8el15j549u8m4c0j2w7jyjbv5jbs98cq9jwdznvjv4exbshjim1oj7cpzz5lrtuljhkzdfk4k9pqbcaq657p4fyipjhmfcue51csappe159na1uz5o4n2vkrew5e1hifk62xdb4vecyhsib1srdhabenggwhh8fxxhdp7ev9l76bvwfcf2f7fjus2nwn76kqy0mp4ycdfg4arvuwxd8547ktvy17hypxy4c9em8elvkbx5srq13j45vds7mabcpntma8po93okqdnk9z5hiv9zmvft1zlptb994l7e6dw6ao46deqwgwa1r1lxmnqlr9z90o17nle4yk6y8k7z3e962y86dfn19tgjhzub7mvr4cmvo5aolku7mvtud3vzixhx01da0xn1rp2pqkwlnioxh53pasm12dv3x1fohuhrktd10s3sz6h1gc2vz3wlx2px9j31r6ciawdvy9fedlcfj745lj1pje8rk0bvphh2aop6suzod2s3gvg1lkc4cn14o6ivlk6inp3c30b59zktmnevjfzmrmdab4dy7yhd5q68izbndmc5df6f9lv0zcwlrckxrbadbdmbaodkvxqa321aqb8vlu2eue5ayq9rp3nbjpjcghbnir8r1bvumky9xklkpwchobccku1izqmp4swhu24wlt46x7ay3xqu2pigjwgpbelxq4os7j4bbugixs93gn5dkitm7xv4yip5qvom6gkmikqhzza1auim2j6puajd52s9xm3pjhh71v1zoxx5vj2qu2vmj3muts620n1zy73aq3h0nf9hrb2tuoep1fixt7l34cw80d16l3iw4c9estegektdu8kry2tfzbf6hefo3yugq2tqvmtrohtn0a52ixbjbfn4qplozvi9yohtp4z6vm0b5tny60yeqk0ny5jq2l84f7o7x3fuj3lyxna873fxyrry1wfwvfwqoeb2hmmoo95qzjlgdnrmhxat0evi6b2lrnlmr3ordrgz3jqrqo7vxrflxi0lc0ej4yty34i9zivbovirgnv6v60q9nlttxhqze3itpak4a7uqqd0i0hvwx1chi4kaxkiaxgpcjj8kupzu9jmf2arurou013u4xu5ns0ek7z3byfz501f6so8quzpenbynd350z1ojgf57x5rwv7xsu4n8ghwocn1pfqle4qlfo6gj3l0osy9c5vbkxlvldi7ggajbuiyhfxocif4w8ipsoktne8qqi1bq5t4ssbrby7h4u9qjcjkpoh00vzas5tsfbeiq0hz01qb88djileir6mu5ruocxml1iikb87q9u89vb633pwitxy',
                redirect: '1y7sdhxstzast6xl0nyhed3djf1nrkd6sjv2x55elmcfp2hxwrgrdg6ntn5omnaucaed69vr7fyu0iaokbdpmpxjnv84ow1wd9k20u7kb2kmmckv7zkxm72mv92s0lalq3lo556sbnif0ugjr83ahlrw8r8g7es1v9t3vdmotaz4zx74j0b11jwvrxytmfc53ipcfhsgev0dzh1qshzrqsxph3rrej01rr051suumtrwxq56jrq9qzm2ihe2jd0t8g5nwj2hr1urtwhn2be43uslh4erg8p1dsvoff64wsxwk83jdkx9t1bwffr6rhr4f7fdn2x1slypy1gf8npgtpbymxu6b4daprvakki4wfwiro69rb4dn1a2wf0ki5kc796np5m7bcdkttc0fuduisao1aq767jtsahqwv4xr8ensxoww5c7bxbshy4sui79l2312nbkouu3umqu6afhyjwya03zs4q9j8ewheqvo4gdmz2819oq1fxvotveilanuitm0sxhdkvlxbfzjwrxw18ahskh86l95wvvj7y4kvqu9glfu34u264s88vfojtowzysgv50cefh09wib80vf1khhpz4u94nb72r5sg593inny1ro6u0jao196ope7ozgjoqsma80ntoz6wnz496o686clvstr2mkvqpkcab6rm0ic0hef4v9vu5ujda8tu0qbcsb31yc79410dixq7mloqimszeq60jm4slgwkxq8mdby13qmdqv4w5xq8h0fj3xtaodp1ts7lhbj2p5glt60n9aof52k41oyu5oswyhfh29f5oveg2jcczo7yoybyn9spapb0wf16q2p9ptxo94nzk8l88oax1pgwae3c7alm9iw6k8raeknvpulfd6pk733y6k5i5dp75nacfiubl0qz37jkxs9b4ylb9oi2orzgkn7gwchvn9jowf7hi3rz47an6e5gmegbs3n26rg73jvshtlzd8pqkoksvni2oj369m552lcxm79j8nz9f3dx6vyf39jmedrxr6xu2s4crqfp1lz1adt8wxkdwipszm2ae8qshe66xlzp4z2mmq4hoqnbpihgukxmvgxormffm5cr26ayyitw7bn35cz7iclxyfkuduexoa65qkx5100xw08yv72620em4h5tcvu4w0xkxki07s5h7s6wd5d8pjcg4ls982hfyxteplswxs4zlnfow4794h56o9ivqb5a2l2jl2b06tfbd7bu28pj3d0ofrkbaj6fhrusop51d46deahong0m0acji2tjjjm3wnfgfbjcil01qb80xxb3ad56juxb1jm3jhcaa6xn1bz0vudoxktvmfz8ioiz0z9rrru3soktw67k00o1fqnzrn3z8hyayeiwyrzc7311r61a1e1ep9obz3ek8b9t3mn2tquwbpfbgh5x6mvmh15pelvxp764ss2yblwana7rqnz1k6ypul2rhhsgq7nbos974er9ck70wswkht5snqtowoe2dof5ta22rz98ybc4ptlih7pd0ca1zwjd884gpyoz18a25srf8gyc85ev6wfqr4fcwgw7pefjxqjuq8wkw293hp0k8suee0wac98dxyuhakzrpt051roxai2tfzkdx3hgg5w23ya866vrsq5qxxw9z0i4xzkq0fp5xuwe6qjt0z5jx5it832q01ue30g643tf616kijwgbvxlmv0sz3uvtzhinegsdk71hnhnyelssy6xgk1spn7m4wy9ft3dn1gmiranbykoazenbksukfixkvird6pvpwrnnlmez9xa0h6lg8h93ncrkwojns8ftp42jm964tuv5vy853djlasqtfl1lbl1g7fr5smbyq61imv94g786y8s9gxflmnptn6crzngt42klk2imek2hg58zwc0pc4brfr3uenjlzakog3jhy1bkcy9eujbq9krt8v8m1enpp2no9iz6w96j3dhh82hfx7bhkjo9cn6qh2m3f16fgr9l9nopjyxqrkfy97wnv3dpwpi2uqex8ggvwk10',
                expiredAccessToken: 71336018271,
                expiredRefreshToken: 4853860701,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientExpiredAccessToken is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredRefreshToken is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306',
                grantType: 'AUTHORIZATION_CODE',
                name: 'acqpmxwukcn8gjni0wlbl6170wj8dbrjla9eg7s4bmbji3odn3cca4dbcngjyejmq87rtbrikco9euw50jpz69oykk4fpjf2eggwj6csi984ll6dynl2ia3ac3fprdro2vud5y74bj4c3y6muewzflye9mlu30ilwgn0sa974gkgt7fu343w0gsljiff5ualtr5h7to8rthplkwlr21156ck2djolha8xczbrdogt9f7bivg03gdr9uh6ks0l0d',
                secret: 'ed9borv2k4orisgclry7lnh60re3zeo4qyp5wpetdsytfkb0jzyj1e7rxfor9rsyu47wwuzb9z7oji1xuaomy3hf8e',
                authUrl: 'ya42sjg46971fuu7hlsgde24jgm5ac84qv6eeniabn4glm089ev5yu9qkf3al5241w165e3d0i653f61pqjd7qbxfoxwkrlulq0vgchpo7bmmu80f4hd04oxo7j6z9i2z9gul2iptt3adszvpw7gd1lsdc90t6e170kw74cu47ky81d7g7hyrulsjrq5w23xt7qbbhf0w753kdbsi5mba1v8y33r6wkps47amzjv7dtsiwtb7q0h9itvdrlm1jbus8zxm9fvj3g9tuf8tv6l044utuc8q5nbf5720g0ojupcdfx8lofvltwg2vvlo5700daxonc31tefvgijskxwbvljjd4z00r3shzqsluji7c3sl3uaik12e7e82a508t46p00nzuv2o86oqrhsld79q51hgamfno9znb2lgofxgv2crug89p7zsvdozf0j17pcr0ru3xvlimqhfoeglskh10yfbeq6eb17zapz6h5ylcq2d89ubs67qb5au8sg2gt18lo7wejd4dybbaxw1hr8agwq0yziofc2hsqzm8kshirg2vhregk0ob1y07bgrfjey59ivdpxxem6jlyfrhs60pobgsmmrhz7547dtx4nppfae02iftu8htp1jszddbemz52wrrsvviwj17e8aqvzzagawlm3y5pmnuz0jqnd74qzbdg56wt0te9s2oavelkba4zfahw1y1u7ntvybwe9oq7ibbdg01btbb0ikef6ujwd81w98uxp4fbpnqjaf8ma9spvtpfdu7ua2w307hg2mitgctsgdtn52n9w79v5bm1iw0hffvzpj6jerm3pexwsifqp0v4wrcpjbw98j16a6v4dhpoeoitw307wmwbpd0ufwdo71y6pzoia586xzaiw0obeuacff0bpsdczt6id8b9cnbuuzgdg6hz41xl8tufvr94xhm4upk02o5gw9ouuupcb6so8tc0ku2z0v7l2n0ytgclal0gbi426y6yoqvf88f0qh26dg4tmkbvy0upckjnemitvugpi70k9izwm948uqcetjhnqbba82yi8u8oeatgeypaiq6q51dcwr3rv3te6575oh3wrxs0jqw5bugsbzsakh7xaliarvs8e0aod6u4y1ixmh0mx6vg1uilubl4mqd4b17zyw0t160qytxjhkjh00h0ad82xo0thtsd89iyszqjfr85yswjxzhqkt64axm4443d01t7ltokl60r63uagay9icc4b4jyf5eccmkkkedrvayuv9o74y7yd79kq4p9nxx88rw000kxycpdaorlptjtlmd3nhib1b450dekg0d33e3sd4987tui8ccnhjqsdit42qc2imzm8ckzka52uf2tkmfl7bxcanbxbiax9qcqh0rxr23fci8daoy1nezsx2yalhsoono599cf8p71kmztbe0rvopvdnifbrab5aq22ho6ogdu1kqo0hqbe50166xx4sxm8m7bdqztb4pgnhk1nfj26t1ojfmeb7qt84mnuu1ejfgnar10qhbsu8kudwj1csges4jihustvbjv6wciwru5mhzp0icgg698cvth34thonr50wab2hnhacllefmh6kszykcmesrflvcfcyazbftomtzj74xephf5uuer81ov3tsz6ll1acq6bmiu3drvrrzxsatg75rmmjos9f6dvz2ee6x3xd2dyvpyal0aoun641t4rru2poswxumbys2n7dn3mj3apokgjkcpaazq3jiboaa7a0pcohgwz6tagd7t45l8exl1pio930daqj0oqj547m2mh70gicij474rsumb1cw7nj8qjppmrhapnv2uewik9g92kw8s6wijpssqarbpq47e2yzw9i55yg08wfxchbf4gzj8ujuvs55ngpqworn7il4t8f3t2iyrruv4kodyjuma6rgka0h5kg8tsb7sinxtvdt8zyj3jxc5qvfxa5smfp8fr2vgwzcvajl0l5vfq2j6qwfl2n44ntf7h05eds00pzpcz312vd3qgl8mjtvgoitx',
                redirect: 'o3uegxd6vt44rmpczz1iorstjjcuqf3tfd8lbqko8uig0y5yduq7faqya1uw8uvwnn8nl5ics6a260xb9nk19y2ksatl2p53xwpw9jqdeodxdipgq22zq110bol7ob3k58jpkoky1b1msnn8oo9e6etiuve64tx6mbr6mi4q9d9ogbv3f8xt4yvo3hiyzhe8wkhcvhfzypmvk01j7xy7cb346dhz8ldz23cyjdqojzxhzxwgrg1u6vekc5frx37opzwt1wjdp63ndxhl5edec3xr4j7csff02pjqa96b6uhzzywih7pqf6zinjbrppy6nvb41j6vj0jj9qh7y4nk6qppvjfqv45nuvojpkxz7ok3rw6z4q8zhyuahu2dsqv49x9z1v48q4cqprxvml1kxyzwokntprv4shdl6a18s2qdu3urwx9e8nej946pfis9teb403obwd4y5z22chq76fot61oqjpcjyle7koy257rn1nkmpleum31rtc1h71on2ci17l3gwno3cam6m8f3gzm4gm2czi7wl3d8vufae7s3939r3cbiwp6buhh1ad3zv3lqs2erjd347qq66iuvwcc8nkj6xijor2406r3bq353fqbmqwpb1mvmyiioevi8ptpiaja8cm280irk2dpxzzlkj1c5hpfh72890lskzwoxpmcc3a3xfekhye28yxpmdpj2sw39m95fobv33fpzroi7sqv9hlba1n9zensydc76fdnavnzm398hke21cve16pjmumfvekhyyzlep8r5s9cnhvpveksg16j3c5ce1m6060fskzdv2mwp3c41a5cj8ee2q2sp67pg2843bhltqxu7q5t3h0unow5r87k1mt8cjie9rk99ww30c4x58adtczs7x029pzz5yozvvhgrgci975hlj3atyiip2907r0lam8bfte5tqxifd14k86vhzhut3tvgsx5d7fwaursg93e2kamx7zv3vj5lqbu0mu5brx0yrai4ocxpx4xwb7qa5jwxq7b0et45s3skekzvvb8ddvmuy9kli4502swt8q69l5t3n84475v4zca9dkbscotkod2nm17y23w1o4cnz1i8matdnj17wt1iwtnjosom59rlgqopi29ie10jlneox6nujrn7lenvvtu8qupipfdu0mt5rktgndp86moegl7wtwlybciuy64b1s5hmt24huyj89cd6kfjups1nuhl059aouj1kddn6au3ivcs211m9dx54tg2bzg2e8kqhx5gkwuepwgpgzsoemmwficuef5owk2fv6wbwuybzp2ydx4nmng9yti9sq31k67xb4avcq1jfejlsmt9hz3ldnbo76x9e3jtd2ezfzlkyejv50k2h7lyqydge6a7i0z8c5xkm9cbxrljb7r288b7myduqb62etle06b5xq6xoimjeutrupkxhocsd5id2f0fvgkbbe9mn7dqmt3n4lp1s4pjrpxfu2o3umj6omfmj7i09hevvh71m3wgwz7go2vrphofmcgttb507phjw8vjvug69yfsnvfglnk3c6t9roghmnnbfqwnkqlmcvl1skgy4h87b5k636l3riy6ieyb0co5sprqhxnnwfang512tho2pa7cr56s1hi7azz4v6xsziue1yked66oda2ry5by3200afzdgkuzzc17tosl577iaiqntfajz5hs1jbq8s6xr8b0j5xiqqjtheimhxhregfkade8tb7eb32p6r5te5ro7i26bwovuhqmjzsizh5ymh00ybfoak273071chu944r67zpvopmps3tbsob3kac3e4wsyq1y33ob5n31qon5ryyknajjaawo68254w3n7k7yenewsn8h29cwn8gdm623fq5yoh45fg5ymee4ugix4x6drepf3zb4ytfl7ef7qsu1m3du2uhilgh65as53varfpmqqrez5zc37swmpud6grid0de2fd1tn5olfo76qoe01yq9ob3q5dxdmmp441dtdfatbwoyj5e9hxajebj5c9k3',
                expiredAccessToken: 6283042047,
                expiredRefreshToken: 51621314312,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientExpiredRefreshToken is too large, has a maximum length of 10');
            });
    });
    

    

    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredAccessToken must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306',
                grantType: 'PASSWORD',
                name: '1lcqqzunmutk8ckwa0nn8gma7wooung3culw9x027l9rjrr4lqkdeac80itzxpb24mpi59e34ec7034fxuv92elxwfett1kzxkr8d83w8yftfg8fvlc1jaonjoypkpmfv40djqm0idnzyncefafvc9papd088biwj4hxb36g3w1h2ixkf3njmu6xzoz9v3xcqcrg37zwcjcy3uomoth9xlzd5u2xwlfam0e4tsgsljhhcwdd3ymsq8g9ntpnthl',
                secret: 'z0s52r3t88mnjewjnvf9d3uwtm2svleupp86c8q3q7431ig577iew6lnyifojfzr2sr2yp9x8hirtfo9hqyrp3ef2d',
                authUrl: '15ifsqakvs6vogr0sh26cinxqnfxllu3wlf21yvflshluwdraude8ua0vvoipr2mwbjq66n2cz2qx063a7ardeundrs2trtmsxow5rr16qlpmqyr0jr1imp7p90rdv8ezex55a7hwbfw5xz4tgp4vh9ymndha418xujbxprv9retbhpdkebm00ho8jjtt1ijd04fl3xfrpa7uoszjjzebunztdjvm3qiip5fnpjuhrdgk78vyzgms7xxnepb3vf1qhiu9vzolgqghvulb66s2pawjoaya9qdmx5fpgg7d48jiiwac4nhhvv9ihe3si7tojhv6i283shgal1mz4tjq933x4txuttg83eh1l496sp63rum9493nl7ya1c9z3pjz29hbgk9fiu3oa1jc3f7yqi8x96zlsso8t1mhtu96qd13jjlwq62gl3khtfj4r2hk645re5174dvfsmyvmrhiwt3j4u162ygdp7vnkn0981896r4gb25jfvj18llvkx34vsef4fis0bm2hjgsmc4p2ikwcr4s1l5tu4ga6aehwl406l08bdid4i0k80huosxjnafqptnl9qp5jm8tdpl0sm4ebbfmz6ktb50vxrsq0x7qqojpmb8vhardk4wtmts39abcjzkh6trmo7sb51y6cur32r508w0p9i717836gfvggp1t8w70qqoforhek5uw9eku3b4704vdhbxbudl1nh4fdcmz1ozk6enlqyytnjojzifakd3dgfpqgqsukap25lp3gnafbzi0nam3xbd3ql5cra06la77s7xgz9ewj93i3r3mrr9l74bn9sva5qp59on1czbdto6xgcr2k30sbyfc1srof3fa164soktmr0s4v9rtphum3sqs6ekslyll1ypyut73ptpenrajcvgerf0xt9pnhk9jahea3khn06fcrf2l2ruskz1faw3hlniusjsok90w3ttnbujkkpew6vvs837tlvuneog2ls039reyhi2qbruhy7pfni6gxtoyd2zln2lig0o9yfjcv4iolyrh8gr6i69abc3036i7tzgkm3ls7hnnh2v594asrr8jhs7ramcyze641m201q8rnoe7ucn08js4w3hqfgat1tu1gvt70yklu52y78txxqi6n9szew28dosdz7mh6ugscdd6ogb1uetig0lkdujb48jvvipyk8qt62jk0bch77oam6ibjhcvt50kpzjr66cdoudkjei09gyiibcfc35qihrs9at18j0bavghltcuoiuz8hbn6lzsgggehw3f13rwycdju0e88y6cwudqg1czlyiu3yma82ryh079b7vaqg32q327jzyvj7gdp4zjsv7b81qp7c2st1drvs3lx31pddzp729am1eqzpehuop2axy8gkjgqymjzgrm3geundh2giyoe4vx396y96bda9ln703uja2tnmkooi84ffaig7kgbkbuhtp5bzwsmunqd2r9g1l35qxesdostc6yn3l5aquu8m9v094irardmjmq85oehqva4gdd1od9hox93za16hd2lzlgx8txr7358qnv3o8ki506te7yzspzbrns1s71eyx8p2xnw9a87jnixirak1xdexdcxgrimkx3tclr0mjg2o10x5mka0hm5cs18omi5ikg4b6q4j04q2l4jbm4mauxn98uvld31vptimgo0uz1mimfmdozrwt7esd43jkeddry2nx1498qbciwsfa3jgq22ehv7ncz4mkcye6kzn35iel5hpecd224rz6prxqikdsneefejb2ma7q1r8li9h16f2wnl3fzrjno73b3xsx59adj3ls20erltuyr6qhcyw8ld6n0cpvnw4wxu0xyvob9ao07u5lryaf47bcy57uemzqda2uwmj7zxs36a42c1leiwgwhba7h149k13wegh3fscg96h9wuq0r56usbikq8l81e3ystjm0g4n13xceq0h722zop1cl34tx2dskugmxxgvxh2na3ttstjd2qytr6qkheqwsylplri9l3y7',
                redirect: 's9h942oriw3o86sor4sjb05j75y4e4xuya4ejentdzntazyoxw115n4xao14nkx0xsjbj8k7clky3wzet647wm9e1k28hi47y42dtitq8ibn949cedw53u99d6mshicp4anegtabwi4p3awwcu0ug08xj54a89ea57syocfngm15llwlyot72aj5d5jw05w286kmh3iianb4vs6sul91zjah03sxw9od7cu8vtii8z1f5z7jktqz02de65zgyguupji0mvhkd0a240orjxesitmtqhnureu0euv2szgxwz826588wmhefgvygjvn24zhetbgp0g2w6qsziq4th1q8hnjubhnpsvx2unvpz0zu6r291dwajis5kz0n8fivmds6o4ln8t31lqg5h9hmd9vecdbyiibpljdqk087jie7n7a38fecl6tc7xsmepic6ptws0ie1fgpylqixxhz255oegwcqngiktsjnqny25zmg1guxpxi5q52hcx585y2lmeraqj77bjzxssl8osuhr12ju9wvjzb6gyvqhnpua6sei5o50qanw4lcgbwtgkn7m9ifolewhryb5sv2lzn2t23uffrj7iiba5qe1fravyty26o16m8rmx4v0j6vd6w1jddqwdprsfo79bdal175m9oeielz9eg53priihh8ormcq6kfs3bpy0xvtm7j5f640yrca5ghvpkq7ckk3s8k28sqh19d09i5j3gdkia3tryn13jhimrldtjp789xz2wpo2mymp5fyw8vynrpom7f1f8czflvkz95vz8i0lc1r19un2gf5b982vmiav8es2gbuovp3apywm3j7mlnl31uwdelxz7ykrmdoounz6t0xk8gasz7qx3pf5nv6xf0puc39vjqo57gqigk8omzv56cjjb2zkup0vtrwjbnvq1huyv07dumf2d0p05n0jx6e2c6bneskz8afc4qg7j4l2whvrwuqbp7bn60iuzq9u7gg4bh36enzogoe0ycoekk7um3en7kv7ct7yk4ckgikjyygxvjj9zls7vy6n83guucn8boez6sp7asa1ywicerd6ziyjn2obpqu2ozngj7twtzvfilu0t39i0dxc84olu1ywl078nxclmtkrbs1unp78290u4xosqrn1rb715pnaz55zz0jp8ptykp59shmnph5anydarw2i42peb6l9aoodzcsv34fq7hqx8kdl6jibwsdvu9o550epfxzux5syt90qk7wr9km1oqjx61n70r9r0hl48a39ysl515qc5j3ehxe3oiwi9u11kdqnfc919iaj0wje6vs2fm1okabu91e09w5lmpj45ykso4a2pj370xyoie8lafz3bv2xx97i8kg30amkus6k96875iwkrnvj0luiy3qa6lqn5bk1clm4ft4t3yuvn7yrh3chmj0vdr46rz4hwmd5f61bnu4p22f84nfhmu6w61ofzm9pd9maho71uj5hz15kxm66d9mvng7yyazc8i2kib963h0m9ns674otx2h93us6a0fmar637nizbfmxwivfmhr2yijsr5x7dcdx2wx0rgx96ig1t6wq71y317vt72upv84x0e3ex81ctmfqo8tav3snz3yevgpcpkaqm5bnf160p8xy3nlznr1g2zf5d2qbqb2wi9c7olwqwkzliblfuqokynb9gnh8b7c1rrf6yskvi6uf9cxpcr85buupnsdqpqq00unrgip0ob7lf9msfnh60rgi59m0a444obye4hwjpsn71kgv83elifv6zpe9xo1z9y5k6xti42kf075xo17hgkc3zgyyd0wl5jcr2qkrdy66h4otp6kd8v58xrxbkosy6xvva3yus113fwz93egblbe3bvpb579wpxw3jwq0nqxhgngnhpx488rhtzwim7hanhncjcrruu0c41gz14454j9fmibcyr5kwv98rrxzt45bkrdd10g2k2d896kca752vxkh6md8q41wsj2czm8y8hfk67sh9d2i9nrfs4a2ihfyasmxx9sy',
                expiredAccessToken: -9,
                expiredRefreshToken: 4599551741,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ClientExpiredAccessToken must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredRefreshToken must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306',
                grantType: 'PASSWORD',
                name: 'o69jgoqpfpwbbpgrdoj0x3m7ii2ldiz6tnaw503ylk99mlkvsqbakev24daag20bleuolbgziabldttd945y1wecztqtlgi9uc4mnyoo2lfjsex39jmkt2gney53wq0c9inj9d93cy12l42m4dxwxa1thwjbt7qrfqxe9u1x4rek50nmyy9w9i0m9tr0z2s746dz0bd1rcw4qx4zqt7epfpmmec15ryo3c5yg8ti0ptdkuhozyrgakmsoqjkn32',
                secret: '58jgb1f43ks4vv5tbpjkrrm3zsqvt5r8t8sapybqdohpqm2u7xq0zb2vs1xosyzu4iylfm56yqy2qmoeqth1b5w97r',
                authUrl: '1o9g9k4xqpw0quleokqobe2bx6nyu8vu59cqruh7jo4gbf4tl0lvxw8khg8i35tsk5lzdvwv13k8gprkkm3hesmmbjypq94ffr2om2h99fqjf62zqqjtt9r30zrtmykw7ksoj0tkhdnb5lysasqe75p5rucss7kmyb3q785y6ydi5clmmjic6yewngnkki2624jvdojf307zlymtqj4y7apvwcsntvlf6jdlqwrohfe7196usmab7cmzrdyz16t4qmx5lwhio9dfxnbj7p2qb4a9bsquxvm7ybid0a5zvnb1k5i40apof7xgg7kx3ca6a81hjwt2dwa7om1wd2cdj9wercumwy2cjn98ksrvh15f814hgs8uvvjahn9wcc2opkgw9666ku5g37qxwzsjyldc3m0flmqyiapzn42hgdhk8jda8x3gq25coo051ar4tnlieniidnpwy1pc9g7cfy25lp7agvkab0gramcjx4tfed4j2xe20vqqgu9jm1x53bprc9wbeatf5269erbmpu7gjdbhwbq3hh6p8tt5howtumju2zvfdu286hyca7lou2rrj66onhje2capny4jqu1s825amun5z4lt39ino8v1noput46y6hqx18npay5pbmrfjlertilje4h4r9rfwm608q4xy9l9f1rr1web94z3rdl5jo5a4ouuaxooxvc0q8z791wfezxbomek984d3h0t5je2g04fycljd5eand8haa1sfz6ljf7z7khp102cnmyrk8pz8290ofk34t4d3sdsp5636f6yyt8ue2164dxqufvjolrwfsjpbamkuaxrl3f6bm706o4di3b59gk2euuuxzwu6jfs6dt8lbthnspnvxt7nlmo9oh23j3wwvpwffmppgm4l2i3wl6sdh4y24w9aeyp9fhi2m0mpjwcgwnychiovbtuoawrdhejszwlvh63id5l4qth5nnfjw5hz32y78b748nlqswucp4xnidek31ze54az6wmekxzlp3gnzn3aw6k5iwkyrzxvwpislv4g0szov5j9xlsv91lejb21l4fgiy75y63jaf8pdlbdldaxdz8ug04z42f5n1ih0x59vop36psxc5z97irgrgkxmoc53vxbvm8eoztsbxrns8uwz41lvl7jo2drom2zzhrd9oi245471b8jc2ap8iavr68kgs0bpus78jn3yuudsgsyoq39ygos2s0ukdaxr57eaaa61dk7b99sobuspriwioeg168h7n83kj449vp04xqgefyvf24uzal2g5u39baz31brimzdj8p4yhbyftp4z5guhso4lbbpbmsav0txu183jkfabposu5e3wp578g41nt0exmhehmkw8kah2es8mgswqbs3zmnjcgrljgfy7tlxatk5cbrdc0or5xo0p5m0opr4owfhgoznlngpakjg0pygu5chcbatyl1gi1x9ul4lyd7tqc2hfopni7ocj9osqqpsejeh2gpdiv2q4zvntqwk05a1aqg659o57e4nlsh3e1f9npvwrm5s12b8c4z67bvqb4hhgjtu75id6vvlxxtxc9s1feq8ug5duylv627n08v5p5uw5p9akkpii4b1z760damufxtyut5dajbwwpyr2g84vuhnx0h9awvkd8t4bc5koerfsfkhah1znyevnmou5j0o0jedyn9peg773yb96si49t1zaj4rolcr2xkp2ynpaxfgs44ib06v1g5hcrbcc04gr51x9oir5aw48126sbojvsi241626oi1bdubijqov9xrr7lhrhvc9wt2kqtq5ikgw1a626d5fftns9sla9rpa3lwqmkb5q7px69b5mgsvee7jbct0b1c961ewzaufzcg8w8ogtl8m50q3l1cw3e0z0m4ybgvwme42klcergm4iladko3cp17di94mzjijbz4hk481u6z7ek6f2t8ja8dycuzvf7rpaqo9vhede864mxe5yu01jq94eokpjr6595ud86pnu1c6jj702expkron0h826bsopx',
                redirect: 'jrcggr8pwr0koe0r3xi89frtxi06s3utjzytfsb43t1x4kutyvqbyadcfr5mdda8kq0ysy35jacnzj48diffisutv1qjeprx8o3pg8i1nc19q5d7pxn7musheyko4eflbb3mjn7onhjfwba9pnl73d3d1devw1ykf1oz31to5j7ghwzscgn60aqq29g9nh38uf16aa9mekyraupr887imkrar4y0nk3oqw8vfrc69iso0sqnr1m21be5lsgwdu4jttrijrawxep87k092v83r6ftr9weau47tm2e7y90ux78ob0irqm0t3pqw5kco88uq35fhavpwzbu24h02xb3a4qbv77akb033u4j57onq2pmhaeyy22dkowal53jy8jjm22j9e6fh9jbsx7b34i6b88eglahkf3i0vg11xr15izgidg2n5tz9cny27momdbte6m9ju7vac56awcq8jlbi1p1owhx4jewuvwvxc5k2a8o4vdkmaueuhz716qqfr8330g0hb1zz422yplb31ertlyy0yrmyrzdhhxbaugy7dsrxy76aq5pi0e65tf51zn4xguuy42lyt8lctbou3kxq55z3w8jkin27dsqaxwmb3r1xqwne72irhvy4f0yev56zips4cmh13dl5lwli9q05kn3rpjtn09rnhw9txwzglp2j1wbfgarrqk0bim6236y7p8q2774kb2yri75l9wg4ylmtqksjdqz9i6dswynm1mlnf3k7zl0btzjeepa9grqw846wx68dkqw0orxetr4sq7trhb2xh55bvr4yul0x240yvhsqjkgsyram6wctaldb4wh5b7h1zhbb56ep6powi47w9znmyp853ggs9fv39gs45vtn8kno5b4goojny5wznd2h9sn0ztgkfrnu9sieeqgf8xs7qvfju070zl0t9clrwkd8noamwctl289wmkf5kk4uqdc36d58vwg1atu33ute8dfy7a3jjlf0wqciwwjo54q7nqognn7qm9qew4p9cs6uiai3mh2j59dv9wigz2ltptfv4feacxqbh2dghafsfjob11fm71aul3g4jgmbc80lf56dbm22xxarey8dnetwxkib82m64b3b9o2w1qbez0utt5z3bckzloz8hsu0q6zx6fq9wunxizdvk37dkjky2xjmxhz8akuswfoft3l7foh8fzsfzrmtin711ytfas4df1i356tkh8525x4i6a9onhtokdc628nm3gxw2wgq2vimsrpesn9kvazo3o7w5fgh0krmy5la1gqfvtkw49xmxtu387hqyz5dywaawua22s1agd0opgffednjklnlt6nvgpozh5ay5umzvmfkbh1c4npo3clg3huhhnkbt4wlfatejo6k9f4mqr4x21r9g6rocan191adz0zv71mtp7km2ml2toa2h7mevgmdmztxq0zxhvovat16spxh3rg6wakqotnw0wl27kdswzm6rs9zs4y2g8b6rtrvqxokpt4p66m161kpmwxwhg96iczrzbafznmq2zzpvvaenzmqf9azmxcph6cczczesbvxz06vznpfcit4yzvrac3k930lrb3vz2dokss13c1yfoi17n2qz6xzelpljb6ydqcycqdwsuzkt3o1i41sx52cpqp2d8fuivyfbirutm2dsdmy6zjzsz30zyn84u9d56wzyxid7zpxtw7e4w1xks4e8vvzmtper1ak3nhbw1ebmv55fwyca2v7dyqxc034ym2dik20bbzmwcn57x3jy6vhjq5refnnq32booby90s2mk5slxasvgorz1yrr8ealfr7n4tsvlhjrzw42cmk50ne460oqij97kitrhwrpg8xc5p8w6bvbk7e0fcccuz6h2ra8bxhevvr6psaps8kp8c518cd2ztiib1sujirgnmtazd55da2d0bz6gp5cwqkaqve9jyr4yav83l64lesxvgr8vhsiqdvs0ecgfp4h1qxjn87fhqlr2o6y5ane8g92dht8neh4x95kh6f8ph8ncwvit4',
                expiredAccessToken: 2399295890,
                expiredRefreshToken: -9,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ClientExpiredRefreshToken must have a positive sign, this field does not accept negative values');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306',
                grantType: 'PASSWORD',
                name: 'w2igc4zy012ek1w16oqrj3haovymema7pyrd1wlpteabwre6zd82zvciqb8anfwyfb3ofts8ehngeu2zs9x5qp1jxx4n841gbiqcomyga4m34mw29luuchbn2a28jcnkndajorstdgrxtam88uwti1l3dqhv3e4viqkvdqcqds12y9d3z4qk0t2mk14auzpwkr3bet6x4hrwb8a404wc2w4v6pi5oogaiu8wkvunjyp3xgs1mt2zv2foloh5hju',
                secret: 'p47b5ep706q2hvz83kai4v1ww04snt5b080c4v4wb8zi5r6wc40nmtv0m5cdgb4k4mfc1332xgeym00drx1pt4qgc2',
                authUrl: 'p567xmc3pzsb3wg1zlzl1uhhxhguxi737233haz8vlgxxzfjl6zgd9sm8hjqsmnjlt6ww5u0zk795xvogmqklgh89nyocuwpb6bg7os76tbsc8pi5dkrvl1wrv6r4vxf7te8i5eb12ftevpx76k2t02yx2gh4elcyeogiljg3plo7ht322brv2fipoyxg79iydi45df4ucs13n7hgb8qec1beqv1e689781su5jrc7mhev9mxse1lkk9mhi6gv1fhk8udr752drvzyayd1113ghk6oyps905w8qiyrt6as6hwaxeka2v689np9oi4ijnpyo9wr5ck92tb22v87reev1q1ckrixfog9z270w5z51qobydi1p2eg3bs74epprokqdota8igzoqgwbzjf24b9optzkt7qzk8inmc195swkz5d1avjhrpdpjmxbpdgylv4a5pbrbicn4gm5pocuw7g2cyc048pw0fp3jufucniiwud0bffcybehhe66j60h1rradyk636zykg2tkm9a8tx23g5t0ov6mthfmvl923vd275viiqtrefno9vae1dgcap4am8n1jxj90fu5tk4csnt35jxigdkdlp3ofuexuc68tofx73b8rtrpgpfuw3w80erox981k6crfwhbxbt4xd7k4e0bdkkyl3tr5v0juipnjtu34ekksqok2527nyqrudc5iodyhiqyjd8v7glxx1sszs0dko4z18yzuixjc7ayy0c8wldwh25dl41oetvm213a3z85okc12yd5uw95m539hp31cavmg94gar1s4hch5orfzwk8nxp8pqtohu0ifhkxnqc76htfjhl8gdoh9ncectmmjqqn901sv9m7w2cuz4j35hs9zpo31vvjymps3fkepg3e9nw2pxzuqlf3eh22uz6kgxewf5xzvvr2vafe7f3ucw65ehb10sobkswvq5mdqxosx6cu2ipy7eptdu3f3fli23lif1xzrab8k11tnzl0yp2z34p8k4g3z21fcx6q4ifa1tnuax1ceiavith1y8bolyttgo4kuba0xmqr8cvn2g34mgypru2bv9wbrta0lpthej4k4hmtlmccs8h9j3po82621b6psjoaccc5pwzfcb34vcaj17iq00lm8r7mk83k4s49qtyw8umu9dir11p0ngn5pm3u8xp8meqs6yfp5qrnmsvlypq1e2mihs4dri0416wepnvk1wpexjn177uwuoiqt07hr4l8auwx14bnyilai9lt89xqg8n78f09h8tlr9a431x36wsuhrdjkt1zu284eayspkc6s109thfte5f2gxq2ummtqiy3ec0hem9nbkiglw0si67fhq1ifbiqbxx9g24xxf0jnggvonj3vd22e3aikdzm5kfbjm4w4pbjyq6fgkjcf15rabtew2qfyw7kc6zs4ohswdfmuh89oh6v2hy0h2z359z9rwhcgqn83cql8hixxayo00vg78k183ooq0gbrhlx982y37zo74g3x1re2mc1hqcfkib8pp1nl1mlt3ix16lvglurm3gwzc82rkde55ytx1sygyv321r4fkivy4paar3t6pdryhcxibgntacmcv0lkkj6paoxvayyoz3u87sf03300admdrf1cv6121dcoujmb20we2tzb1qbcy6h20lm65147n0d90qr2sl44pe79mub64hjm8prcmlyuzjaj0n220u2pwbrulfuf6oqe5mosd9dui3dswonajp40j5wman7y8xjdepceilcy4fsaebis4filse0fnk2df5ejnvie0lharzkgcophn2xfjyeg6vrpztl0xku5prxfdtdv9387jtsvqanb818dkmo0g4cva0xfu9t6tdh17jm0u58wwrps2okb9kgypbs8siuib6wgyl5f9anucgsb9d5ja15qett8wch2p6q65c1y7nqqj1dxxbvoi3hu5il7udigapoq5w6fic2v0sotki5mg0gn1mh5msl8zb0u32r6d0dtid7y8lxlraqxpl4bcbddfxa',
                redirect: '1mwbnx7vy0r0b5eho1b5e79bodw6hc6hzjjk7iqrzlt9x8nk7b4el0qjymkx24v5o5mz9gbmdaavcwvmvm683vsg830m58an3xro96ityehw7jy5qhbi0agdh0nafjjh9wfwyiyna3juknekwd26rosaoddm3ihqsoslr8bjvvvjctqo76cjrob1clo3sj8f52au79rp23la5b6pajxv8cavcjce9x2q9icf1jlai098u7wx5c0odrwljvtxqujusv8wlhd4lf5f9eb3y82edp63ahazl99z70yxb6z2f01gz1aoqdngyxgc643lunsf1iny1dqv40cye4fwshrm19ljemriqina1sccigkst0qfqtoskisgnbr8j6r9ca3vaprrjoq6frm1nqb5q0gb258hw9tuno2xkwcodg424keymzilh56rexmojurkhusbyxk695umb9zfvkd2ktogme2u2obfenq6m6kaykrezfwdfic6jddasr3wtwpko2pfzhcnlvvci6p8x8y8siki4w7hkixxgdv8lr6nfle4nxcxo78fw9p4c4nbwwo9irjbcdsfaascb080jwhssv8dhic5pffyn089uferiahumjwcngtvb4g7xkeg7ukdhciepfn0sfrsp6x5vfha40atv22ia2z61965bxi64vb1a57m577crhw5frek509nkyzcs0z8ux7os0empseobbm73ofo6knllgikom8ac61yamkwwfhwnzuhztnc55i4avan95zj41zj5qhwmcj3o47fxpz3agkgje10b6ihwd3cmpsn0xz6eo6q9bf8j1ruhwb8a5zggeay155aa5o4m9rc7ruwizql63hxijvyehp3baj78y38w8112fky4izqb261ml9i7njiyfhb0zeoemg2req6qvzpi9oplk5h64r8ff0tphwwz94gcekgjuuvw13zhxu7028jec1qnz32bc8jvtd0pq4vn1zsk4ak4pjkyb4wn22knpqi7bt75aahxka1itmhwnl1s7fdkvgleplzkvwqaugsn13tluz8xwveniyueu4uz35bhjx7ioqe6jbmtrb1a1daora1mc813brwg9169b8hqks17m7o3n94g309k1ms51e5tdf219aq0b5pvfk3reh6td42clnm9bg3h2czd1iqks536qhcfv74bk0nsks81n5heasjxnk3ualqbw5nuv8eh58qg3kvqhye7qcgdz4r6vn4d5fakzuuxt1mzy4az8muvdsma6548q99n4yqcmfau8r6ctgtzhqeohrvyyzzx6xcxljms3e7n169gv326k8q7rmeozu39ihmo0q970k6hc9hk2ortsgj4ag9bwhbta5sckxfkkf3exasc09dde4mfbe97qq5p1y7kk2hn9excwbdvj45s30dbimycuglefrk14kym3dqxjzasdjgzme3nfeq89izypa6vim467p5mqtbbbilg3bkj5k9cplimddwwcbo504h7l5iy6gnbbfcjie0y7nqmai8c5qxf12gi2t15oik3g7lr5ao4jrtlqcpmkr4m29fwszmpin5g62ty7icf346lecem4nmp0u08pscr16hm71ghsc30846n603u7ba43mmyzlv8dk4401b0b7hpax5lbmx0p6c7yj1zwjhua1kt7meai90mpw8f8soa0a6ido5naji5a8foerbb1zxgxeu2d8c9lipv6siydnor7btj4v0opxxna5z4ywralo6hebrkzqcme8i0hlbzjpq4pygt02qjfbqjjh26rf2vv8u4n87whm74d87nof443po0rqqpzwg5dafws26xolqhvowz9wbuuyhw7ojyho8q9cwwbevo55tz5bxk7zsq2bavd1la94sd6d5231dw9w2l204lj7827f5hqdc9n3zg5hcarwfgo0ifprnq32oua3wlh1ukvuc9uo6woi116hmg5uhk5rhxl56k4e7y1yrfpn13f4qr0m4ktkv2ext95nzywlvlht52wggbtbf42lyvv9vjp4v',
                expiredAccessToken: 8733420848,
                expiredRefreshToken: 5792831564,
                isActive: 'true',
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive has to be a boolean value');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'mi85v93dczhr000mv0934ln35lhantaug6yuwlz91x18j5e4pkyic9awwca53iaik3h55mn4dzx7afsuernw0khknbd2xhom3ouko9nzt49mu63ulde3psvjaqh3ay5zo6a9bb854mtb4e6bnfg0tj7sq2jvw6yvumvwhmblr5twweqxq9ge64oxdednf7l2xmr3p38p7b9rdqed0uky8x084ehzsba6iboxjeb55goo5l5vibaq39hlhtb1brh',
                secret: 'gsb02rav12u5qfct5c1sqsw6b2uea2389g6asmwyfoflh3x0m39h2gjq8q9eji4xke34i7b1ffiik1nrnishp2urp5',
                authUrl: 'kmdphmvw3ha843hh8msozansml0mtslzyb0fv2d82mxi0erv10n44z74wc8s0ya5gbnml8i5y05ifapmd7gvtzogkf3mgu7daqivjdcoz9uynwzkrfap8489mocu7lzr7fnkbiaeg3vn5i3pueuozmdv3jqojw8rmljh8kvucdfsykt4sfc8v71b2k8p5m05bz2czrgxxe7b5g2vijpl6mx4euv062n3pz3b03qzztrusvxbm65zfve2m0m5tuxtw4ow2xmp9uhpl5drdp3ziyfoqocko2llj0ukvuzmnf17qakh5geurizdy3hw8jmo5m1s45c7l8hncfd3nmrcz11x6izpyuti0ydksea8w5nxrxo680id9vddvnreturuwbr0kwigbzjqbonm7yj48sov044qe9jq31k5fe7r5eb3b554dai5le8yu2jkgvjvu0md8hyb9qq32y4r5fzfbjf2mxs3n6pea4uvoqfoctt8oh67dm8co4gmoaxrmaulx8p6wa8j7ab9k27sinv3h1iuc6tyil7p5uho8noyhfr1wdcsfcbc02jih0ug60g3qmdv8pje3uq30fkqmek6s3d35ernpzpukpjxk7votqwattxza37z9rg42dkjr2fqfoq9omlrce2a9e33hhijagxclhzp6vmzm5xquj7qxscqawchikyh2ex15vo2hk38h7occh3eeqom0tn9i9ufteypfe3oj08bmafwvr39b2wqq547bs7fqdh5x192ts02zaw63w2iz8stbpl6x89cw1ma8t3f4c670oqdg2cqos0x1ohge7u28i9zf0oefmgevizkqrjww3emwto65ef00hu1o3clh0c84k5olwl5m3sw8ighudloyheqzl470fw1ftekhjfkt156bhg8uverut558hn686fdcvkxihaoc67lbjvz3273sfoyjjse9vo8mzdl3gxoxamu1q8jxua8qrt0q0dyv054pbosy994kvpj7n3mq8m5wrlkruzut24lda03rup8lw9joffrcrfrdsxhwqvl665opi5nfxkl3dnxj7f8xelti68kfx2tiz5k4e0m3eu2s0hqerchypz8kqv7mvavfco2q274pjoxyobz8hiutap03cb06ybal4ix14gy4plv1lm2jakf3b7irakhqfhbgaappbedkev8xmqmzmo0avtyfwwj9pxcocp10pdozbfjnyu3gs6j5e0o3wqlxqxwu21gb8wic1ahp0455rpucpkes3a0hvhzkyo2vxsmkpkt38gip2nm8t43zmnwggdh0f3rpptqr5bfhktyj3cwhqu6k2rw3pil0l0hciu7ufx87sgj2thseb9xom1btqgswlwqpb6mfrai01bjlk0v7dwpom9f4x2h8f26s99k8xdgbpz73w06ixcwd5veotpiiy85v0vpe59zd7xy04qj7xok3nruqrw1omz5a08pg6t4iidbz9exc5abrn69a94n3ck3mysufg50lbhjgrpkwrxte18j4wazpojudutyljdi405uaxm6a5zjfd3gphu1xlud5cm7eknet9xhx3oravy6647wjmwoje9kxskwwe50qdhuea5a349558gz1bfugme9uh9p9hwb7l93wur1ijbk0ggk0uh1j3jkhrcyqvte878phww2rr62isashwn5edjtoyxaqlltqaw4391b0tf3jyfj5r1td43dr1ylc05r2nofas6zshepj4on59ofmgtn90xljzf1zdyc3z5mm8k7oeh01wbkorc7hy5fvfnfyif8k3iofhxt56c2j8yhunfsh3areir73txf5110w9xoy07ork4g7n32jor8mjep30qs8afimjpa2s254nhvcovfz6fucrvdie3hvgks57289r8h0p923uy2xqvxnc0dmneom5k5387muvf9zgbcnj87ud625kh8zb8w9av6ev8o2ec58c7dsp2247dlpilrmjdilx1fxerjvf0owc2hfu5h14pr5axqu46k4g97srntcqtxeuogy73c',
                redirect: 'grpnmwvnmqdh97gucux15ifdzlp3us48pmmn0qo6rac2yuiv7zdy337af9yy8du2zirmo28jn4xp6fki2zmb2dh9kouhame7rlmkhchpc48kg9o9grr7svwpshe5ccqy8b61jd64uirit32lvujabmz9ua94tfu5eiejxlyx63ey5pm3c0856r4ax3o7zzy5bve0fnj032g7hemc43p6yu2nbws5lm5lsr7zkq56yayzqjo366pvgsufunyhynalxm0f9b2gl9boimaiulque1hdy1vyilhmo61yreb31xg8arocvs6r6oqhx8vd15c3m2tkzsyh41swee9bg9esegkn388xr5so76fu8n9j47hzkofoee4aog1kbt9nfxyakt0z8uoddqopjihu42jk0juftpfxke2gj8fe4eyehcyyykqjpvidx6ukqkdwdnaitj4tf54evcavtethsvabp07nd6llrutpzyp5rdm8hg0dc4d44e66rfne3xmzsjb0xcj24cc94xujerqb9wvh5qv96mk2stu58c6abpypdhozk1r1zawcseefydn7vopmrbfap65iqpczdyx6bkrxhwny7hshjv68rv2x2twry4vcj2jzljuoe75gkwyrcml1vzipyh0zleupz5onyac0d4b05hczqw6a4i8u6rg0e29d8o9clns2oprcvubqmpmq8pwd03a1xi8g4dh39k4oz1w79hvql4vzwvubo4h0uknqpurjxp8jo0uznatvueo0n80ljmkq1n87tkwxt6fjguwez79cctyf1vp5c7dmeb0219lhzlw5tpi4bmgnzpxo9t3huvcfr8xgs01bl1h6q59eo2i08if3p2ssc9it8pfzmsgl7tsxb5s6rqwp6yeey8g8ivz25z9s7pir367u1q8pcnkxko4dxs0d067s2m2nbxfzmg4kxv6ms0tegg7jow13fxvmrikiuc0ynk1ecvqw0i7oyoshvndj9qh0ujrl7bvic6lx8qm595salygi5k8tavx789g44vpmy74imp7l4qru9b2z9wwdsyk9qzg7k98mstziyjgmg5q3y20div3rps9p7a5x3jfx5sadb3a6opljdw1onr2u0uz5fvns8x18t4u6x1uhah7gxsuua6o2qjqiuw4oamcxttbxgieffjlzu9n8cv74fyvpbd0hj8143wpcktnkiq5fudvnm53du43ywevd2zx858kv8a350v3sp4r0m2jv2xfdb17ru8y8rdwx4pmx3ui9ozersueosgk089agpxu99xrd65jgcj0pizkkdjzuus8vwio2s3zrkkry0bdfsrf0xlharzgenxdkxtwmacigomfarsgi0834vnrn802c63z01xjijbizq6wfsnxaaqke6y2x8dt9fw4d53toxrmh7ojh3cd4wyx3s5xa0thli9egdtzhoroozb75i3div2kbip7r99kftyptu95c9y2qvqq50y5vo8t87024a016j5ka87h3pli5u95xjldy0v0ed0zdlevs3s36ssjvic75ha3fby033xfdanoiz29psyyxzvpr3f07ou3kjo4kmcww02rmwofbxj51a6lnktlq3hyh66s8qjknaa5hskfiv898elj5nx40my0ceiv9infink5iipu7os0hzue28syymeymazxavk269iugg4ks7r4osaunsbvttvv3n8cad93jl3bt5mdbrti1grormvixkwwrp299udx8b11tsbvivd0hy5nh1pg55mn68v6pqqi1l1chr0ki953glg0yp2ji4hewcb6q2blkrchemw6o37sz1ihm1lsi896tan1hsoi9oz3vmhwqccl3xj86avqljpadb8b30xksegi5l3u5n7wh12sgb097syrqw07mi30uhksx4yvu26dpeac0opdbui3k3b4qgkuhmmlwj0w1te5sp0vrayomkk7x2qcilw1sq9nln03b99dkxr4fnlxzlyaxpoc4je8824frjmyyd6rukj3m49trpzdb3x7lsbcsrmms',
                expiredAccessToken: 1209631827,
                expiredRefreshToken: 4858598206,
                isActive: false,
                isMaster: 'true',
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster has to be a boolean value');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType has to be a enum option of AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306',
                grantType: 'XXXX',
                name: 'b78y1w62wnbv3yvv0oqrue9dz4316g39g5vmm5skgjhi9ponh2w2ki28rt00hkltc75qqstc7zoyvqrsiwkh63gaz6j8yvk0c10mce9u2493ohk4qca6gxvs5mom3wyzfa3q4wdrxaxe5qgr1sfzbcf5k4396rfltxbluo1uyogepmoyxdafwh3tzrcu1jmdu6hz4jslkto115ex7fif6x50t3xbeftl3y43earep2warr0p6dey3fz52kt33na',
                secret: '7alp5d4cyvuqkdz3z6w746wahjs19h7qiyhwaxwzn485co2c0cdvm3cmfpxcwukcmmz6ev4um8wnd9j1dv6um08qup',
                authUrl: '1vrsy5vcol90zrneu4k47cxay0171jkr62h91gdv5ntvskaw89q8xk4jku61je257c1svboo4jj9mwkwlw1q1xzqgtghzt7wy7r5vh4464w0qgvjgb4w3kvktm2tigpxpem9v2xw0vytlgepfwqqhyajdtk3g2l5v4keisyyua3le195nv3ogq94cxu6g3tfs5u99wi3k0xertw3c6nw1h4xqjv6qwqrwswdx2pberu7gokrzu3yik3i6t51tw2w6gugufz7r2o9mqyz5z66lhncjmqc7c5p67zvfqj31pn3acxpessg71wocmy7hamae73ompigan1j2lp2636tc9pameuzf0ny6ieobhh40ayerf7rr7y6uvuxeiujuj4n8bgd1dvr9tjcid381k0qn3ikhpk5dn6qkpoezzkjlkrhh0hs0p2gm1bohjldac16ax00ekuj5il3qv6r3bghozwmngfaqd89sboaw9rnup7y1gi0n3f5r0e0e35trylzowjsuzijc8zy5lxy16sl4z39xsc60r0afziv7sunkzvcsbskfg2jorpm9dctbo1jpcnrhhd84a5yxy2adwos6vu0d9b3snk76ke0572q8qj8musrjapf6749vt67c7qjefy2pvcodb6k65tg4us2kjsyn87b50zz2ybzupkad47w4ijs54ikgpj5y86xvgzg3hpm9xut02hcrzugqtvyimz0icad784omsetwck92yjixnli5417asvockq0srpy72bnob1f5tn4yn00ea37yr4rxp6lioie4e37hxjpan16l3qqphgwd90p0xz17oeqt4abprhasesjb91po4alx040d9c9ubdps9iead5a49se5qk9auytf3ml68yzoivw2c2l3svmqrz2t1412ie2gkbyti2r1ss55g60dboldgwlqd8zokckjvu2p1ow36h7tqew894lhvf4ggg71a2kz5cnd59bbm86fozkv3pzksax9ahkjmf6vykrl9i8agwjz8hryn4t3a3pp6cbyp2kceegrzo0ab5mcruvr4rnsbd48z2jgw452u9l9y8evw9to8o18vxsntgzrcxd1rs13rjifq4yzpqa6vms2pitdh2s7h9cxbjs7x73l0o8tq2ysz7h5bwqiqd8budq2e8gkd5yh4wopdfquxc4r9lj6js2enwiqrpy8brefy15ussvnc13ecxs3wc5hbldddshvkv3qusexdhcvmn96nh1npvic3qjhls26i0uj0epqb9ime3ykgfbaiyg4y6dpahk9c3mgm668g7umy7z4prvfpqufy4zmmk5j0op61cdbitro4qxzp56zp7pu1jubeumv5nsvftjxtg6vijbf8rz0qz1z95kgb8uevu6rao0bcb2flyw21kvfr5b50vj884xkx1rdtn2s9nscd97mutojkw89bo2fcw53b2ugdk7gubxpacufrfh4umhq3wtojrmhu2ju73gtxu3j84qd3l57lqm9jepi5ehrdb5byz8xahnrsexsnuc6u63siz5d714lf69igkc5sl8fq2xicope8vxupiw1u0fa9ucq6fz8e5dx5t8e13fcbh3e1r3yv1thyyp6c82m9oloxt5kbsw90kwmin2tnjoyl6qoc3wu7k7xtig04yj2732qufu7wlkh8co4udqg5teo5gairmyblvgtl9gx0vsq30akj9mfa77o49wax7stding5obqsy009cjlkidvvc4350vsl8c9cp7rd7dgdi8l7sqzmy9o3roowbs69vcgju6wcosnmvhv67jcf54hzitaya5cmft0fp3lr1qcqz49zy2p2h65fp9xrlg1iem3sgjyjvsyb4elnpzm3y3a5m1orfoffiuqt7sk7kb060125aj89b57nt4lui7otuhfou8aymilvaoyux0s2lfmk1le5vcvfmyim2g070ik0sylphuu0cqafv41z5xvy7yeoaurytqjwbbsikww8b78z43i5amzmm9kq2st4ohzhiqtjpxinjzbf88',
                redirect: '5nzuz9rn4dwanoehzeo63vvbxby3jav7vl1ttbywlbh4qa6gojcg6yjrj5lvkj34396y0rbiy98vef7zsycv8px6xi9x18009cq06hf2y3qr4hhw8qhgldv4ghpqhdfuv99hx9xvzz0l3jao3kj2q6pcgvft7om50o6hb9hyxw210q2d7p1ijryfooymi9jdhut9l61mgqjexyc1ygx009cawzmnm6rj5v7de6nxgdiheaib7nf0206tnm1t2xa6055h76v7a2kdsphtxijbkmom7youro6jz3uzrolpnnsw3wrbn21il9az7hrzy58m7uj0ddb8uh3lus9mbgdis7wswv98xmwnn8pnbooxd7oeud7sqwiye7i76ihz9z6ct1mvk7vyvmyqpmwldf4evaregwpj7kqqi758ho5myrwtxx52yoq8vi9byi3k2r3u3zi04edwt6x7y0x56vthklnnrcuiiavqqur4qwxkaqe7i8qwrhawnevyhjp5hwfdl664ng7k7estroc153wex29ide86q37h9ipkb8luo0jj4o3cnoierh8gwnz2w7lumre3xkv9gb7fnlbrxwa5zkymmkf2uqkjdvy5anms9jbol630r477ipwbmz9544obkaewx52a9ptb574q9s2vf35rjzskoazepd5398800jevny5ffwsporyjxlakxegbma4w9euwyntkrhgnbucxmdp1cypnzoi011abpol8h951z78xhbkpffj5zea8a9ofl0jc3huon5w4oi1oerxndz64tgd651a68cjk6w2jpzu2j16lv2v8epeczptidpsw5ofq2qif14ds2n1qzbfw5sj43zjci36932ubxxcj57xhmm23s47c0ymbt98vk8ypft9zzkxijlgps0o7eslyxhxk5mqgrnmj1cxqpntqq838r18g86d2ordnb21j7e6xkkc4ttpvotb5cdy76wxwvvkefsb4lx2sn28djd6r6wzv07s29uk94n9mwpiyj70nf94mi75o9xfrf06dkg458d9i3unf3yqyr3hogh4rv2bpoa39tmt89emgpkpnn902qt3njas0h5h404f64l60gvm141ft3lfxejbei6evxey43krkcdzzd20m7990hvin81e0lcp7t9pox7g8klkqu63h63keb1rmvc7d6l6md7yt8lt76gnhfq09f26ovqfz7c8qatvr3m3biadyvuf8p4lck3dh3ea5aum3okup7l2nlydqxco2sek1kyof0ud1anndjv9e1cxafyowfvwkf1f4wh0i118n9yeim23k7pv7s85c9z9hn7fe4gw5825nr6zaejruaz18ek489ml2aykrpih4htmcjh6k9jq8ymioi81ybsujetg8l087bm53wqguy2u3zg025ttd9tnrsxij5w96eamkgds59od02acqyvla6tvyprxlfostak18qhzzyuriwi2dl0q5cnqekbmplpuwjqb7il2c6dwx6eva5lpih9s7jwan79k6vfwghmzc0n2xd11kwx9jhp2an859v30x5eia20q3likkxsmxzsw54rd0qk3wtvl8cmdr338eezyp98wyt19rj99rfpi2xg703l4ouybbskon1u84e583xde7p3cu0thehgiocp2e7bjs54q0pb2c2zaumwumb9a9o46vcwr4kk2vxeml4jkihjkm3g22fe3xnl3a2eibxzdyqh0va2z0bxf556wh8vjm8nkbibyizm5jqduj2r3azwyxspnkm9sx5pts2n2263c7m5mlv02hra9yphn9ueuvsepg7hkd5pf42ya3ejurc66e4bjfabsypm27cnttq001arguijg56m3nd49i9i2bvlhwl7edae5dr7bhgv9jfeafczhonbawcfue23ra9aaqdwy3qqf52y94dfbcmexs0e515gwn83p8dobrcki7qajhv69p3ldssj814r2g7kw5ruld4xjqubfydwlw5kzl42b15a8oh7wrskzuq8pfwiahps8nc1wdqa9a',
                expiredAccessToken: 7711460775,
                expiredRefreshToken: 9339955828,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType has to be any of this options: AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD');
            });
    });
    

    

    test(`/REST:POST o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306',
                grantType: 'AUTHORIZATION_CODE',
                name: 's9airh4ltvhqtbq4ihv67g0kjcsfzm8pv5g8nbgws48iloylci9kesi34oo1ktw236o6yi3bxd9mjehqdezvk4l7qdiyuwwhhawls8vd3rve2hjxpeg1vcrfktb032gjf1h9nksg3ed7il4fnqk7f1hcdiwsi4q7m1uqajcbif8x6vg394wqp75ogflbbo3zkzxqsfr487hejyrz5ee5t851e6wonvdjrnx9yp4rxq79vdx1why9ksqyguot3z3',
                secret: 'j8ks1kggvx6qeg3uq6pmzsm4kda1c9jfh8ai1ke6s7t46vc40g8amts492vte6cavjk9f60rb91ecmz4i02ebra0yf',
                authUrl: 'tbyaki5rkcvp1hd518wd1phg3bwk82jw0clphzxb2m0oj5rzqjblqd7x1me0t9fsd9r218rva9rf34ee9mx699tcl79v2e1u80fg91jzg31dpq4khuu8f2et8o7e8yczjpsghva3man0y7feoawrrm96fzhnc22a107xxk3z6x9ss8l66dyzaii6vdd0o00lr137xp497xn9f0qtvv288fy4p3ztq0879na4eeuqw5rlzjdkhf4h83bccqz2ny7v5h3kfirg6azrtkco3ta51ymof06tnb6vcd9iay4uyjv0pd8ja7u4d3920tyqshgdo05czy8uy06aexxttu143i60ic7ksgrifqbb32wmmbz9d7seb8d9j2o05vmb00ms560lmqw8c9okqzn7c53bu73u5dwe135gppgmzw6kmfzo4ztd63dey5ftndb52258wcxn4own8crnou7bxdduirbq7udjh6k4aiem8uhypldpw9kgpln1vl20ktsuqqes4bxe7ccnvulvf7wayqffdmxjlmy26x1bkszio07vx2dax5bqzrtog2uuu8foeovwuz781kv5it8ulmbms1x9j31pw5hieq2w9kewfzbuap4p7shk02k0xn503do54o6lf0d6fhmqpr1hwo59nkpmyipt5xsfa5o6ca6ej6i7emb44yj3emjewixxkc42mbzrrv55e7mtgumyvntc22b6xh27rydi7kbsiztp5nuijkkydaibkp96433vtw4dgmic04lhla3hbf4r9bm365rixpaeo5590jr3kypj3b33fffpyuh8ny9674n6ikiklucw5risqcilb4hejh925qud15zx5w3nx9tktvwphwkz94spsyxz2iolkx1fj5zjeuz60bm4ctzjtb5x5q27y30ttl0tm6ad39jo7izjah5b3m0cw3t7razzpprk7clf88uy5jp2cn4ho0am5p9jn4jrpqsqoip4b5447z6p0n320etkhnka71l6h8zcr3h2u6fh6efgjyh618q5drlreubv6wwt0u8rj5a9q11p99uutrjagwlkdreyggnr87n1n05edt5k3axrr2jeg7jqy6ageu0k3fe5kg57bdc3ganf7vzllqn4q84uc7tf7ljl7u5crpuoj8mn6ssy4v6iq09tqsn7awux4wrhprfx53x6olgv40tdo95x8g1ps5jg61ab65ouihayw8ozfx6qq33q2lq26zwsnszm0ncdtai1dguxwe6o91n8b67r6f4uq25gz8w3nnclgcb476yheara7nuh9m8yv5ym3rpgsj7uvoo03dswkyndd3aiasqbkkyd8csq2n429zcl9taw6utwrl6sg2cmigs3qhq0e3f85vdeid3d4xkwo92wjlqibcepc5iuqkwrqybitc0k8yheejpsscbrdtao8b8st5z5mmk9lvuyayrhcrpv2cngdab403q2fjs9q4zvh5ov7drn2f7qjgwgfj3f30xxy60xbs1uw5gje49yst4ozsy4zy3kk16eww9nl8jw41x0u5qh2o158gftkw1czc1c603x168rd8fp4u7jh0v9t90vxzqmpjsbxqcqpv52zja57c2mu8wh1sryxfp0nwchyqlt0nm9xa6io6ns8awtbdpy583iudpqnh6ndlof5g1ycebhh45tt6prjvz40vpl8d8cvn83tm6jh0jpulyvj5gto0o0zoxiw2kv8s7lzgbq910z705bbk1mi8eeuxxy0gxqduw70adhspifada5icg2qepegkpn1uh3qmnmvvnlwikj4v9k1x3jx75wb9o0txui1gauc1g5k8sq3l3za8m4w404rku18wpu19a3gi641p5ne9gzcrdufo39cto3btolwwd6qftg3jpjmddi8rxu3feqs4zaob9deit1cfy65sng0ky6c5w8gfjcwnba5vac7nuys6myguoa28kfw2k1wrl4qs9e8oduri3tt59m41rvegyymbo44goa91m6eedblvsdssh5efj9ruq9vl4vl3ef',
                redirect: '0vhtczjhxqn4nljgpk9ur3lilh31ulykcrk3ji8iqdavk0c8ponflw0dx72tsq4d6bbkxw8ws5f1nnrkk7xe4t4k5eau6gdkylhmzpzo5wgkkrk558q0trbw5xgt7728iydk9yemaam2jtm7zmbrvi5145d8vqg85xcmkyioxhg45jf1eaxwppwiq8ry2f98tn4oh1yron41j2tj4zlbpl6qz0xtvluyxk48yv1o9dzzm1c0ksc36rpmoreazz9l7rcb7j2xq0rgdmnyfohtnkdko9xm4xwo81o0hhaf06tdihztezoiuh2w40lomqukk9bk30ybkae3304t30gfkbjyawjmj4gjxp67kv70gaylf9fuuyisq2o12h1isd0d8focw3355huwpv4wuql01fvpov1fpzo6fpnbuqtvs6fg0gchmey4qaugpasfy1fce7ee6qc56s0p5bgspnosvjsff9hgw3hkfqspg27bgg4cm3a58nl4o5sbdeuzgs85za6f3dg9jsu2miq5yzpiln8kf150cjrj05vjwa46ktabxcp1fbqkrbx6lhjg6m524w7pfogv4z3o6mxwcpwzvgx1wf2x7caq8iluatjz1z8gppxlbeeklgi665igi3liqbvq1prxcp5fe3qfwyl8w4dbf7y4vzltvqnsnltbj2rjf4kqhdoim8bvsk63qke74ly49b4kxzjc15aspukrh8tsm5pu827q7b95wuga0zhkqvo7h85d7suzjxxlacpha4n2e9wo6gohe6kp4j7tkcbnemnwb4n1hh68iks7u6thksbxtsq94y2scp7o06eztj8yinfovldr29g6pgq7s8kxlvmia5zw1eb9tku6ivd3mirx49to8jgey5shmya6u89hkjwqd7dcb0m6o10ugfjdschhzdibxyra4isklacycvityv38ye7q60kqnhdg39uhvuna0424uzsuhh7r95ou1nok00osz7j65v1po3urbgvk5kk2qkls9cvrt0vl7zngw315iujkydw3im6fcnm9yo5kfnqtalsgecuk0xrdrtnifn3yvaw2xf9is8lhlv5gem8qefaiw9q02ra5g2ul1e1jhe9ufat3kfffcl0yix3fy038mmurmhg9n7ogdgrnwb0y26ymy4mmnlltjkc621emmxijuhf2qiltw7ib3d7fr5nm8aet0nzdoksn9uilf8ur2q0a2hgn4mgulm7lixmfifdqqcec9e3sp7it7z8ru064lhi0874htygpjshielnmhedtzlq5zcv6t9wr1dd3jacj79w8n5d8ohe14hl3z6pmq4s9karm1qca4zo19dzocs2gr4140o0ydrbfysp4x5qt2zn5edxratg9oqtjbude5z2za9jefk25cj3rq4tw23u759xdtdifhoeluvxuanfrnzfvyo1i9pxx6bhwh7t07ubtmp6j1pbhumr2qtp74gs3541dgin8lxm73urna0megwp8zhhafmqysq0grotsjvyvnktd509sroig60q0i9p7362biy0r90h2dbybsdsdssvd493kmnqpcmjpque8gtrk7pzuubcy57e0398rnilloec39ofkwieonuucit1c2bok8ewvcfk10ax7xsus749pv7n9amxqx38lvfgaq4ox6iiyeo86oqc5378vezkojulfg9wvdqee18lmqvupnld28sslfyiqi0sagxj4mty44zpmooslw3sdfj8r8x96yn0ek0vzg6pwtw5kss6kx20rfoai59kn85ehgih2mugbmu5a932rmohrrhsg5ks9c0tkz4ultauo4o5t791o4omoh5h3si8wei320h8tbgoldiyfbnezytjohaqwuzqsof546io05pfgmio0yh2qeqzbhfwlq257r0wrugu8zetcg8r5gn0zvhlu7i0ckpqwbm4yllyos74so08mjjklvbvk1vm3trfmjgphdgqhw3hx9u37zuptk7bbt1b2gs7e24deth3gp78uqcaodybip4m9zpses4jm',
                expiredAccessToken: 2093574563,
                expiredRefreshToken: 4484356979,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/clients/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/clients/paginate')
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

    test(`/REST:GET o-auth/client - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'd3d52a09-cd25-462a-b0e5-ad7c420165dc'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306'));
    });

    test(`/REST:GET o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/65ad04ea-32dc-4f07-b407-643c2273b54a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/a6e656bf-8ec5-4f1b-85d3-4e930b75f306')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306'));
    });

    test(`/REST:GET o-auth/clients`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/clients')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/client - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                id: '397235af-a280-44f1-9260-f13cc61bd7c8',
                grantType: 'PASSWORD',
                name: '8tgm907lpe37a3wep4ghbsih1o4hrdw0jc0z9u22r9g1gi0oqf4tivj7s0xqt077hucroccad8456lhq1mmx1v127l5idrecd38kqql23tvjvmvl21grwsiz1to0jelyzhcn11svbw4uxancwvt13dlycx93i8g4kfb5u0dwfeyb08ka58us1ol4d8w7s13noo9ecn35chru1pjvzwq34p5588ozxe72p07gwq6n076u3cado14kjkmvm4c998g',
                secret: '32pgg6e50ym02xtlbbiu1tmilve249sso5ksssvit6qto26fhr5j8uxvrgqfc7fdt4ev47a67k6ux62bp64wocfy13',
                authUrl: 'vjpuajg11if6jdh08v9fflm254441pczl1a18nwo3r4hujtgq2ex7dqusbtj8wzq0mefgu7u395240sfhzwlgoy3iaayf8h9jzfhbik67yrgkmtch395gefnwepv60vawfn75rlhrz3hiv0iu8d0h6mgulu9xuwtc7fsvx4bqbshh03od4zgdx5gcms26ayxgg3hcz5qv6uq07r9jkwqn5ao01y0aywngdc79m7ktmm4e6pggtqsi3fibmt5ku30y4lixl58wyo5nefenygbs10fyqbio364r072vh3itqn9e8t2c1eco0vly94bvp9nhesq8mr8f5thf9mf7lbcnlwsd9tdn2bozjyw2v07ph7jf6bqmz1jkyyuqj75gqu5f4hiupqzvj5voa2657kt1onf6nnu45aamk5m76ml3pen8cjxhhwpz08mkua6p0i9ubs55qg3vto9pkbwgv181fip2e27as3jxkelqjo9p1kmvfs8ulo5rycawmsnz6o7fg3e6329ph7epqx7in54le2wt9vyfv0qmc0q0904yg321pgcn791zi4yxkup2lzd78dihfovdlivinlky1lavplrzzap8rtlqoycnumqr65x29s2eeqj3vtbnmfj7pjta34cgabo2cov316vftap1m92r4esha9bwuj5x8jc8ywg1u0ylyaibxwv55w329e6pr1ft9hsmwos340c084k7jhmzzxdgemf4qyydyiq0punn0mgt3gx4gpdg577zzw7ixtlxwblpz99waza9hrac23fi53bvok1rvhva8bbxg9wjsuhotfgz2zhl2iaftg9qgf8uk2ove69fmf0n9739nn9bwe0axs2yw3ls11sdceuknj0v00gt2jq5gczd56obpohb3gpon78iv0jb2q4mm09vbcji6o6vqz9wm9wh5d03xeumbf7sa2wib28p4u4qgzg8j45s2snyfpyawklvih55xz008kay0a83lwxb476ubd5yqrrjyngtpjgkxl9bcpm66l9q69qoom5pb1710ftq6cnwglxao81oyh9ppu946uy07xelcq3bice2375vfnatdvp0c3wgwsty85xpbl3f4mn86r5q1zxm71u4y0vyby87cuun6wggy3wd1fdedjkjy3qlcskn78gtkmohukiele6v520hio7299zi8jreonfpodzo65xzu3wphgkcosbdxlsjd35ifd1kjtsp8u8c3pldmh5ym4wqqbsop5sz7k1c53shpxxr62uklj57gnly26qquf3zfiza8pzdxewkjb9w89qswc3xkls0bvgf7vxcvrqn6uckhtipdtfc8i0pc32zkzci6nugc270dhiox3qusj0g7acjsqw86ociwec7ybcrw7vnwmq697wvej92iqhl7kf7pctjojrt14s67v36dbelhjvdn8228engz966u12az62150o1jy0nw7j8cygfy0n32u9r07sb0jtf8px6qb66kx8e4nhj0vxo6szbfq3xzhdcwyokc76yodsjfw5ryw1teo71w1exzw14aqitp3aev26mlc48o7vepujbhmsricxghni9elhlbcxk3df1gmks3ithhlsbysvyrbk0sb8re3hsy6zvl8hew2tv99d4kj6cttavp631zbmoh8utqwc07vk3g2jaquwkw8ntopfunmh4ghunhbln7yw7p6fdpdlwyr3e0b9xycqwur5jf7h3vfebxj832idx3kqzxuu1wnatld4h5n3ogc979k9wwpxib2gef7rhmq02tgej4pq4uzxyf8jdwrctx70rs1g6am93fly2mu0xkxybjrm5l076hd8hjhg612w0qbs40ivh0ses3z3tst4ive7hkzmjukeabg4fin5s5qchfpp6xjqycikgcmwm1op33jbwa9zv6mxjrigy31sz0k008widmnlnwexq2elhfdkip803l6xa4sgjwraggshyisoxwcjfw41zmxus1eda2qyyu5m7gm0tofqo3bz0r52d5sh2gatf1mr4zbv',
                redirect: '8mhnixc2l9wey9ibymu5co2cl3ggqmva0nxlmbf12qvgv18gayj15wg9pqv8ceobbom2s75okc7ut2ju6cs4jx652m6k0r2v6qog2scq20nir8otsb7zi014nbizs4s8wzzhfc9p07ah5rjgbivcrjgyfg7gd2o1n0v8ln1ow1heurwhiw32ff8ctvkefzhjga1k4p78mr8xrowypu0x7hlzr6p0dqlph07xdjnmu0thi2pyd953odvq6378d5lu7jlqjjbrcbeurso9jugxcligrbhba1d5vlgd17uagsarpcowa6p4eldbjl12gv10uln6sj85hh69g3cg7ccx4x13adawfe3uqato564fs3lrx7onyaqfnl703sxpx03cuswt1xzle1v8jrsonpyx6tsi9zdm2qgt0pl3a99umxu097jo9gbrtphvk3wtkpd9ufdtcqcxlp37s5500g6qjzxbyd3v3gh9zdwswe6y79js0hnaaxq22av2v05atk628sb6tbgbnupqv6izjovte2qerkwlxnzb36woqz14eq7xhjtlucml5kah2lovzmyty1amlrhb4nudwlcy2vmwsrl19f121kimmt9g0ouviqaxe6l4ata2s8yeuazf63pn912ygsdp4z5m2c1oh202zgay47ntbjzv3y5l58qtzk6v9fc0r42jkc03ygx48kstm6tjjua2z5k6925zg4si41rw14svbb0gf5jzkel7vn9ib1kd88gsl0f636nnkq1zjry2352om3nt0lh109iodwlays80gns603jd0eace2cfdvy43xqddr0xchg125mg70v5yvurihv2zq2tko6m1nejvdil9xn5y3unp8oc57m2y8jqubux2vbzjzxl4r0o38risf278djlwp5v9krpq4go5jv02tu4b2wnv0yws78o8yzz93uc02zd4u85286thjwn1e4jr8jlvwprxs78l61el288gl9ruk2h3zs1mdiynud4v777zedw2jkqs9p8svokxg5v7awx58igvv3r6xol2wfmk89aglymfm00gijpfeb2b56zpa53fg96xppl63v15d5ckfwo3mt55nj6ald4en27i1dt87lipaykmrwovz9wiqweiico5fs6w92amdyf3prny3vi36ig7ang534fmnyvv7msu43lfvlbv4h7mnwpi94u97559zhbhqvh6pn1idweq7gau0krj5fx0rid1xormfg0ggqlbjz2bj13s6jxbvg0umdlvfxygvkutjcbkr8u17fwmut2f7ayko5k964ejxaf5vgczpp1syiovfg71trnzxoan403ceqwodhbmo44nydyvfyivwrt5imt7illny7p0y5m6nk3fukw6542ccuj82hefgxlt8j3v3khrah6x63ekjaf390oqr1bn934qdjg20skdm2yct0cav7xvwaazyqouzjr8hwxwaml6etsde89pqxqjq3tfs4l0hy7vknaj752cum3cyin05hhp575ib050evjvg1siuno2yr66m3gs5bfolerj8e826bh7olhhzjdu2htvocp04dy2vjfxb65rwkmguxerxypruhqnc1l6oaj4fzlo64lh5a2oeu7n2fdbxz6414639n4iyjgsz1u4heeh4qzj8tovcw1km3ckggz89t077ac5xsselrt28n5ctey5quobaye6x4wcejxygjza335pmvur4pt4d8uezmzprzlhyew9ul1dabh3c5kz6hqwnoye6wbtlclbfyy2g30bedtjtta4den1hqe3o70iekwvapxb4d7kw1nv25mrj42nh7h224t2glqk55n37gzimiu7idk7ilme2v3b3kr6w8tx8oly8psm8n3n4bq93asc4f0r0meu6e57g4hwpr2o8pyx0bp7czi7co6r9dfrfcy2gvc71ca00u6svi1u8u0sap1igh8ehb94v6mg0j06gu05zszo37h1dozhzkwpesony6zlwwy917rs29liqw87fsmtt05zjbr8c0ap40yjpbw',
                expiredAccessToken: 3338941491,
                expiredRefreshToken: 6694184712,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306',
                grantType: 'PASSWORD',
                name: 's0e2x6uao0yks1r907933w57338xe2orjr7ww77dmiwv77zy0uby12cuyog91bs7hyxzkxjt00x1cm9n9m7cvecu9giujdz2wgoi2vmfyln9veznogac08x1pv2p74j6qd6bshxmirco65dlie6q0277v01xr5x25bwzzqr1ce5c1oasz1xgp16uknzr9b9v2oomi0bafz1q09v81sz8amat6k9xcnv1e6hlvv4v1nfb7s4uw8420mqwdp4wpgf',
                secret: '2yurmmotb3o581tasx4f35lfl4px48dz86zclefbl2rm9hx8p8f77cojcui00m5fasucap8df7s5k9l1w3hl8m3eiq',
                authUrl: 'z7x5fqxhlzf7nd3kuej6aolq5dmsoi06hpguda9uaepzk8p537b4p9y8ln4xe2sg3v72rq2pa0wx6hd91qkgcqqj2tt8frbk4jl22a5hyp3x1vxy2jt11imqdjfjp66wu4mxi9ntuywx9bofzag29tm546d9qxlv1klujv08x2ufxp758g6kotyjpbyh69yc9nxqbjrpewlcz3uheyd22eu9wduuqqk6m0ca78qm43qvskquk76jfkckf8c5id0d4fx29pifpbimxvghj3wirmwu1boamox6xrkqb4nprdealjjlrcdyf2lgfrlr1w05lbb3hdpspp1ot10ldm7vocjmk1vudxtnku6zcih7o2lpqyeoi5uxman7rzybi82zgwlxzhx1qi6khz0im7d8znfkhl0xovrudrnc5xcizslx2tnwrh96q5pozr3r5dhlz3kdvkyohubwfak311ljiyyrsu03lajzq8mejfgav0zzk6ndu5mcg1922mqwan8p6074w2gehrv6mjkfu3mnx5amhtthozjyklq6ueb9tcz1aivdq5x3nut5ade542fox37fbiwkh54qpedvkgdg9vnp4a79yy25loy7qu4ptmp5dkyqzvahp4c5wnigyub7wibi39wq0gnp5yrvl9nmb6p089rnx5yaeda4yjv8t1gzommua7jz5wm618714vfwz7b4b4tfy18mlnbehp7eb1mffyumyzqj6a6zp9b4dcrr45g66vj12uelvbhlmxdujyvhwiezbizx58sadt3ct1j8nbksfp35fonhwnxdiodw4vccwzhfwmzhqu60ml8qbzihzw367fvexdrtdphu5w8jz61l5viz1y7zpvnzd6azjn657aeczhsnb4lfsou7gtmxxffw9x5l3wzcxzlvtjy4759dhmjez8r9xtsdyumwbh5xgrnfuphabfpasbi0rpzf6ccjx3sbb76v7reg2gykqw8xxdl3oot6jpk15sgmzvz46gv8zn1cz2dijcp4vt55r6r2bpr7regoqs21jvrcaqlkq3gelkqt59fzsdxjdo0biy02vbuy4wzhb9kkg2sc1t8ijp3csqe0hqk123hy2zv3yj5yng3t8gwjow5521f97bd1guzn7xuwq76pcpkol46ukjg0g9z758cbsjvvo37nldo4itibsq6a2j2vppxqa2mqboggju2drjwh9bbxx3o57jasizlp223aq9kc7juoeefyvc7jeq95po00y4435bqwrjn7akeamkx5prw3htoq6vst21t9n0d3z5adazklmjpw432jsgacumcg89n1isejkftqxzw5oqjnd4gxlmexbwezqo24vhzt25hu8fx98qtk006hhi0xy7ahkx3vb18jgz976x2guored51m4y3c2ls4hfvy6csvpen5h05twoisxs11q2nmk8irerpysy9jhn581p9jwe2lpp5r0wb8s1nlrig4hxxl3nu6yem3m0wfhqst23q5s6qr7ein1dwueuuexyumq1ci14fshzgm7g31ayk83qisdxtpmdwigoazwij72d5wbsylxgk76pfw2tgd0ouzu6e5bq6on0omvb8tr19pk4d6wbrimjvniwefe9uph9ke299h3g1cqakezlzylp4ci3z95r4fvtz9vvrt0bow6ps73e0jpzqbbpqokh10dx5pi5d75588gjxdc8znj14pdi3qsns119cak94qczzs6t5vi0bupz45c7bd65nvkd57j9belovxh1g0fkncoi6roxii7is1v78enjhpg9wk5sd265yq8ft8sof8oo2c7i4rt93wrxpnv8tnh7klygpcy39odg3xr2wxk8vc1wqdh9o0yy4qrrxb5jr57ga5ao4mk7zl3n026l0n7ypmt9aism0v9g7415vewltrnahovp9wuce6mvs52ue96wp8cx3653oztx3nkyt62kow1ljbrr8i748ndk2gkp19m48cyvsv3js37vy8yyeh1quvau1z8rosf4lt5cvxtzi91q6bbwgt',
                redirect: '6j9p5cpir41cf401jlqpn0luf2kay8l2n1gr452h4nc59w8dgfn6ixbrizju1xxzifcp0tbl2fu9koqsay6doh9qo83frcsqqm7oldh2nvyr46gdmqhngexnhsg51kz7zu46xneueppft0ev5m7ncq14o7zsozvzob7h9f8wpwrctfs5uykzgur7dq4rcgtp26al00vv3clyorgjtr9usrs3f9d8hgqz5jsftg73m56ufkstsdjxkvmyyqvopcm0y3zvndw8ubmcwoart1zbotqthkq9c080rqwg2n5by67ych1q4knv2kgjz19cdence5rto09ftkiz513vruf7pbzzbq7s719p71tgk6ppqp7ajvxgf7hyg5gidemseq9c0jwqu4l7l8bi28t5eg248uutfnyqh28yxdyfl36aru65tsa5kutuhumfuqwjwao5wxxsh4m9uqoghiq0v03cfjwqfnsewpvfxd51pdvvk73b85avlxv6xmlg2cwxkb4b8r1yoac1d4foy7ms8ihc2kl8y2d315nxpe1sicuakk9e0as5nfdlyuwqc70ciee8t15xcluongl0w2buq2890m5zmwvl1swptti0y1a1g13u8x1dkkrx9lznw759e52rodxhtqelrx8vc1syhyqqn2fn1dhfl4hz6aoh91yxwm8tv9w8g2nw8eqgvx3y9mzqspskkb0x9xfczmfokk3h1ovlay0ymke6smh9gmbbzy0uqumm9pur68trrhsjklgqwsm1fpa0u0l903sld0909ojudc1hcxw3egvqfy5dzulgouc53rv5msjrxq5m58b1outk4ql7mx282kf8jxq5kk2bfzckn3331lmx2rn4qgypbqmmlpvwnk9gjykov3iyetm475f87fv440t6t84bpsaikyccostybyv0f4h2ydwf503cksiovcus4qm1jpmwkegmqg6qbja3qscyx1p93e8clzj29jfhifsbw1fpuhofsdk76e68tmiu9qq5t5w0rswh3dvuu2bctnhgrtphi71l7skid4jkzsm099b0xui0e6dcxdj5aqbcxfvd6125w1cptlkeeohaqsya0l0tytbgv3nuyzm8ji7tlvewq32vjyuczgif6svjo5yir9mgbh2oskq9ayvbyk6q05ke2yda98nrlbuwfqtta6ub38ldqmrhknrb47tgh51xtm9loszpvt2x0qszlegn2x7uihildu1bit9mxbcc6bcq3zdjd639zff8v4rty7v2n8cmzim8x3hp97l7xays4wf899cymtplcl20g70kfg44u6ifean0f7u5gccp2eeaa3qozki1xdf6be7pdle6uwv0xj6m95lt9ohuswkjy2me9k8fa8h1a6fwtkq8f68zyo060gjr0v4p0pwjslh1111e2x85tj6xdkdg65k6loo2lhr2txw8ify4kma09fexwrw32q0rw6a2u1ptzgsbunu9uwrychot4bbo675av6f10bqzjq5uj4j8uash2floh95l540qag7ibbhbyi3snorn35xc27xuqkovm6rgwodlif5kjw45iown9u548y7yvs2ti124zfrax70bm7gtqfbw2bt95enbev8uc51xk9u3send5hrfmljf9dnwnr279qtfjqbwdumam18qs94jqo314nq9lsli4mlxtc9yek0ail42p99rnk48e6idettjwh83hqk53nt0eq7tishjtdrcogh3cgll12s8qkc6s5zev5xz6pz8ez5o82ddm5lr1704nbw3uiess40aahmvd8x97ilo2u4hgvk87ybc0c8h8xho4av5744urlyfh977d3pm27hcw8xwwz12xrp9a749u5ddq2q8rj8vv1k999axsambuxn72pka2hd849r7bpmefw7phduiu5vrchi1ba8zqky5z78rsb12w9zwmq1gllrylmpjryrnbafg17dda2qy4v9vxvixn2q06vpu7ig5jxg9jmbhg2bmv2t4ik64f30fzwy91fauz6w54g74ctz5',
                expiredAccessToken: 1415902369,
                expiredRefreshToken: 3608723794,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306'));
    });

    test(`/REST:DELETE o-auth/client/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/b300d779-6942-454e-a578-a5a04302eb08')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/client/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/a6e656bf-8ec5-4f1b-85d3-4e930b75f306')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateClient - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateClientInput!)
                    {
                        oAuthCreateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
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

    test(`/GraphQL oAuthCreateClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateClientInput!)
                    {
                        oAuthCreateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5f3c0cc7-ae94-4fd3-9d4a-e4db55070448',
                        grantType: 'PASSWORD',
                        name: 'cmo8fmugsp81h80qm4nnosusifyo75b48sdveykjewaju0fwz9j5oke3ejih9arlwc32p67zp0575hix91b95gexey7eizc3bhrnd9o2uc1sk46vcxl3apbr5e7ng06qe1ltk8f85qj9krukxzw7zv4vd2roemked5r28u8pkv5bui0r7rncqqldfiuccai6txttjyjzaww3bmpnk00zu4rq0t78i1vfh3v7swy3l1u0zae4i59vwqqxzw683mk',
                        secret: '3m6jnawsia4a98v6c35plb5zs8g975hvyia5r7msr0e8qqc9wli95k99fp5al09hqdwqnwmbq9y6gln1dx00gemxy9',
                        authUrl: '89bfesissu1rjchvpellpr5ij3dm0cugzhbtczeoa93lzk8w9vrkzjzkl7twriarj4afkrthjkgspioc4d44g93asgbduk7fq2rnau26rn7akhjbo5h1db9owdgt7oftzs9qbz4ey0i68e5mks5lt57ycfzj6agpkgfe2utohr765bpjhk0rjhjtnujvgzwvlb3xhticqhhsn5ipqpao3i63rwqrqkfqam1twzi4898xjb7g6iczk0pfqxvsvngkapjtoxgoy3nf0w0c94zi3bpo1x873108pnns84jho4ggoyyotnfi67pc8n1t31r5i6rho5ku8exbyx79minns698iqvoc3x3gesrqbxupl5swz0qazoug6eiwaq9i9u6xgqwjqc55i8aqmvjrnjtbtombdcxslzl7h1bkfww4bujfkwl1qiwzd5012w8o7nd2j4o2yrpt4s4fla71q791ibh3nrhwd13fqzdahwvkxjpfw5t7fqu43vorph2saozps1tqv9lt6eb08lpvh9jjl2eabk68jfse7m5ocpmx3r6qs5mfyi1aq18ero9se1b2tgf7wtdm6uw132c7is9gxuuqsl14i1huseo8p4znng319w4ort1gjju8y8se718l8dkgqfk1pff1x9tit0o4tu3txzsap9k4eadisqsppbkic1kc8f99vqt6u7m0oyk9fc3tut8c2rpkaoas5ehonodt31dyn2olq752kk424yunhms55oodlxpmdt1bh5e4lxvv5za2tevwkushalupk95t8vj7nkn4mvqbw01wzdgeljwub9a2vq582dkhves83zoo8ilcil1cp1g9hl7dltxc43s8kw2ofvanr89jn6p9h7kc4fk3zet6ffsqcaft3qg5xrb1hnfobcsxnoa7pgl36gafc07wpsp7a3t5azsqvco845fi5y97xcgzn4zocmxp9nahxn0s5d8iitem3r1490sb4817j6ey3uubvtoacly70cab9a4cz8jijdmhqfs5paf6s7z7mjcl2o77w5am8nemqfp53wcqpmnb9qjq0y58p2e4fxqx7fcuvvq964amkhiubell1f5bzw490nscy76pjsx1bg8gd0csckddkfrdmvvka1lf3lfkc7f97oxnw9wbw5xhl1loo760y2yaz8gufr90yendbmbvzam84e9lokaoamdbx7eqf4ygmx7xwfjp467d9ajjenlkyy24f1d46n4cw7edi0pmn5y5k5ymqpdb63x72z5gmhnywg6v9ebuz8cdcf2dxinog3rk6qcdwr5fmhbptjnulyswlqn67hms7dcyr8b6w8vx7c5rq19410y4cns7nwzgh5cjkmr0crp5odw9by3dl2dkqxsw0gnyrjtr7pdg8uoljjhoxwcrhmchix9nd5e75p5ixqikyfgwuowb1rrm0s6pc7lqiwpz69gif7pqfythaqrmdvbz3u5algi107czc81voa6iem56htnqvv66nwpkqtjears4d4vd0h326i586b11gnjeiw62y0bgmnw8z2j9o49rboei1yoqhhqd5b150vvm5ypr8wayconscon6tx6foa0d6e8l1zbbh9lt33bs4vwvq5tsc2iwpqka8aeiruow422k2gew2ieqqnergmk6br4462rt0hj0hd5kdho585vays0izbm5s1wuzvw9nyz6d7a2c7rk3ojd9edeqakj7mqnzhn4l1046xpl3hrn5tct8ht925k02ly76cwcswee10ll0u8j5ierg3cdzp1ol60j8x1revua1de6dud2m0ta31fenq19tjk8kvdwaxguj769195wpravxhvfx37x79nxxl5nmtxtt3fo94iest95aue6yqlogx0yud9hm4h1nzwrk1yy6qv9qnpk3l9755k6k3q8veu6dqo4pxof1kqggpizqc1ytniyvezogmsd6mc1yub2lwu8lr2armd7wqk6f3i0rwjhto93qrio2pjwgivztszf2ixymgxqilrxn8mbc693bqnjlga',
                        redirect: '8b9w3sjivpim2qwsj0arkn6ys34zmgk146wj3h8a9gzfaq1yz9vo1wdavyawk1tlcx55n6ccxrinkvqxmox4cgjbihggeyla09dlnypcsgijd1vrbo9c1k8nxqe5lh9xjz4ii73qslpx87hqw1sr8o53ir3caagj4eopxo1fk5lz1wewugpp7u6kg8ninx6e7m651a5eg6wf06ums9wycz6j0n3352moq81qe21kwg52tphla68nfvq8922zo4tt2hk6f8q56e5i1t6847i3tv6cx9edk9qk2bmp0obgnqcrf2kpj3jnps7047ry3u3cs05lyq797mgja346a9eisetq17bt6y0yrzcp4qkb3ucf9cw5sucwzhppgrfpmfdqydsy3wugppmhszeit9shd166jz3cl0svxy0dyd24kaptdifh5spho742oat5np75bn3zh47s4ovv93vww61vl8pg4knf90jv8zegglesgrmut66pnlyvn06s8ceqkq3l2ezzrvplp2dt6zdu68prjk4mh6hqw9wnfdv102pc5bo8quoyr2dclc8m0isesgcysmlkdy5jrxep2c2nodqg6x4i1xzo2xz0x5lgvm1bi9r4uv798va0w86xwiffvis69npi0ywsl8ug7a2p1bw38rthjfeqvos506qkro9uk7ab0aomw4leewio8b9lf9f6vehlb010ug65hsk67qktk9tx4c436v4m5rjwr6rh64rfjla6qw2yc6nmw99btq3jr0lgy9epcxyvsc9ihcurnecfjpsfqjfwpoemux0zkbn3wich7hnhch1esw48dtp4idbx47yfjv5ffa86odu3rdwracddgqh7wlapgov4358jelngfd6r3wmt3fx6bwahsd6p4trpa5pgjkrm6ff8nkqornseqhat3go236jjngo2ceujz60d93hy2pyj674s5g5wi63g5p9mh9r7jlph8hp04jqn8xo0fi994487s1ou1x7m515vh6oks52rtvxybz4wj4z1volx12kddhw6ldrpfj33o5ufrkz70d4auch31ju89zn22krj0euqvhc2sqmwm1mj4hd0naxj55piu9apwq7q7d12q4vy1fq9c7eisxwgambltp540dwo8dkerujgn7rmzznn1ypiuwsn72l4bxk69mk0vnl9uhqs90t3euf5v8jel76v4zy6q946xz0kmwypcjbksypgkcieotoxdfvzevj10btkgqrrhfub9mmbbgkinfy8suvkgs93olhgf4xe0waok3qi5snzu4qv9990y5ehgcsiuwrsgwoik3h7qwr7zddenqp4h9or0hs8l5d436oe0n5t0ds0np01k8gaasb3h43md5h4ccd5zf3cwpeklq14ddxwphwchvit6q55z5j4frdhskx8npazcvk2vui8aoeyt2emdnypb40rv19sgfg9uxb7zid7evrv0oj9q4rd5a9n6zj4ag6iq2fvhaia5ekgo9kb8dsjge4xttkhwu771ldy97c41393z5pmluzt6mr3m7aut7m1oyn0414mxostkby5ghiuq5s80tkulubqpvb5b8ald5lihin9y15h0ky95q86arvsir6buvrr6qjyu2t5hhum4wbkyht4mci14w71fw1sx183dslst43kbecnvxsjv77pjaya004zkxh7yrrctqr4faxzoaldxlrb5i1y418een9nvjqj16ab75m3dzktlim0c9nveat8tk3banlq3ieuzpixci2qdgfdc5xm19uco0z8c6x546ohbou57156crhmc4csnp0qp3rnnz2pexaafi90in199balqpcuj4wowdyjh8yk6efa76ju9nwam62whhf41cf4m2b5e2prx15ap6qeps43ez3eq71zvep1adzim8vluwhuydmz68ro9ql60wlwng58wcsjp578m2zdoy3c0tye6tn504w5uwe5d96so56zea2um03m8hh0e2i9tqvto8n5y2n4kmqk2pn520ef4cxil94wo3l4xp1g',
                        expiredAccessToken: 4388882940,
                        expiredRefreshToken: 2335214440,
                        isActive: true,
                        isMaster: false,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', '5f3c0cc7-ae94-4fd3-9d4a-e4db55070448');
            });
    });

    test(`/GraphQL oAuthPaginateClients`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateClients (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateClients.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateClients.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateClients.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindClient - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindClient (query:$query)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
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
                            id: '7d476e94-7684-45be-abe0-c4130af2493e'
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

    test(`/GraphQL oAuthFindClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindClient (query:$query)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
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
                            id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('a6e656bf-8ec5-4f1b-85d3-4e930b75f306');
            });
    });

    test(`/GraphQL oAuthFindClientById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'b9e4ce22-6c4a-4121-adae-177065af4d49'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindClientById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('a6e656bf-8ec5-4f1b-85d3-4e930b75f306');
            });
    });

    test(`/GraphQL oAuthGetClients`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetClients (query:$query)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.oAuthGetClients.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateClient - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateClientInput!)
                    {
                        oAuthUpdateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '78f2c5fc-01dd-48ab-972d-15cd626da006',
                        grantType: 'AUTHORIZATION_CODE',
                        name: 'c50szw81l5o7cbmbgngbtqhp7zu54h3nzwvrbrdnkd58p4g7iw8h5wgavumjma7y7h1scpliu3n07wg46o5qnob2r21av16kon2k01j9kcyfswsomizboobce5ri5g716idqa2wpr8pkb3huwiwxdo8e1aujyr36r1buirimaca33qnlo10299ajf94i9c24uqg5wkdqpzwrt6q76dsf4oqzpxd3y7oew4o1zqcpava2t98osa4sp0t78bfec72',
                        secret: 'vhdyej4vvxyk9qkvi86v4it491vkzwbfuhobbfxbxcsofxqvdscdcehedrgwjkrad5gvb3ljodp146afoiw4wb8sqm',
                        authUrl: 'p7hr1j0gh46gct798muoaw4u89271jkcvqlr3upvzpsfslgrrthshmu19yattq7319bh1l23dmw2vbpb6mkbr89g7rbrc9lc22xk31k341rs8yj15cvlebobienppnsy7itb0du71rt31pjs7rjxkkdgqkggltjqugzopemgquxr0gh2b7f3wdsezh0f4wk6iy9h73g5saraxgmekgcxr3iiys6ffnn4295g5i5zhe4pidi0za9jmhfcmf9wvvadz1rf1is89hxtofo42o2xb3nirnele8v2l2x7g71lgjof2r8n4mz5q4zuo1a2j7tonev3wbu51wp5we3p18zbj092hzd9zku1i54vl49g2aainkrhqexh19chjp30n3ar308om6ihwikzztsdfpvap0eexx7f8pve863sv2eiyymfiio9sbgs8e6gdh6hxni924a3yrp1p3ufcvp6g45q7qpve6mqnx0joq243n6ufkxuad47q2jqtvlakdta1lbtvbwcv4xael42akpwiyudl0yrwrcmu9pm5t2qnznds9ocvadcjqq633wvfmm0tykttwpf0lilqamhbid2uwm50scvblml2paktpn6djj0udxhhdfse2p8hy1pswcqhkno5xu6zlmpahd4scrth9of4fmrd2iefiw2lyq0qpv5hqs2pau45pn20hwikqxu9xepnsm3okv5xxdmr4kajcuun45zpxevo7nnvvoerg2ru4lnmzcal84sgl3cykcqorzl29g4dfc8pudg1805uhg76rq89wimw1x6zumpxm1r4rbtr0n9fae7eadfgiazlal95q2444uviqvhe26z2873gtor6rbd2c6x716m0c4r8ox6ka85i1ckxkcncstfpnihn2n1qogbaly1nq03jw93liihde2beni26bo9y38jb5bio6zm2nhkddgc89drtt8yd061xv0y91sg8fbavgv60ni55zq5r5md4g98se4cgi0jm2rogyt6nk3ri03u5r6ldzgv9miqc47smdz7f3iwcffx0cna7bmzk4n8rn2vvk67i7j19d8glcxltikty3snihkir1kb01452ibd2m1vmc9r7dpmoc6pbe4tybahtpjz6kc102kp4egdfcogr7sik0gea4b63g2ko93w7ns2i9vbuhej06b6esc6cnwbn1r0yvhob47wzc3kmdz2xd1puxapcq07bpannlcl59u7dcmesn8z1iidn0cd9hjlbe6qgj02lzqk4jwfj67k89il3szh8chnjkvywxsc0k6sn7t321j1ossvskk2kh60su6djfk100i3znfhbhtgwfgtcpni14u983yrt7hp9h5h2u687hk9h67i70nkglozt3r839ox6qffi8tw74u30b2noomgwdspaxnjhwyz0awkfni3yy5ukr7yq53p9jz87fvm7zs2886ngxrecusn0wjjj34xvdbyj6gsw5bmw9h58tl6r774f5a7son69vd6swpfgomwvfr03ybhi458p08uoxwciyl8iyfeen5ot5tgoiluitjb2h1ltekiiebbvryozm78cdcj1gqomfuq1tlae8t1novrnsltr2gt01mku7f4b34rm524ryl4n5ybalr1lj1u2kegez86avnwwyvjv1zw9vgb8tmut23jsjay793wyokmh5j1wdxe1j82nr441nzijrk0drebgjsf6fdzjw1o5txsa6bwdgr22w65f4n2rbl7ris5j03x2c9m7ukbnwqwjxwxa3ww1rlrjx7hxk7dnn7vl108uuvvwtn20e92zm2csl2kesy16yec8curaqogi5embdmifeq4oadwu6aeusc5mzfkkrap5k5iu1lo0syqtvvmv5tjzk7jhsziz5tov0axea03sl7mg55aryahcobqe7hca06l0dpju2lt69ld2h5vz7us4x2itqxl4hc454zkrboxhv6hr3m7eu02ssaafw18t59n2dyh4qzfi1t1emjdfth3t2ofb94j7fzctvauu01lburfxuml',
                        redirect: 'iqscxq3cazk0344dc93nlvpy6rusuowk71ed4o87b8i4o5x0yfnxa6d4wynkotzfabgxewzsirl750wyv5deete3u9w5aa697frsvhiz5g0sa2kn4j15ddv9e3ladq0hynf05zt4mbdxq6xn4487pp8j49xj59h5bt8xzp2sm6k3cu99v4kaz7gm6t7lfy58oqv5m0h2bi3e461j2erqegvjcotth88hlyft0sra8rzxhxjjl152u1v5jtmvn14bz6ggdhp7tw89vu9hdf2zh44iptdqzchu3lg1tn692waqdlv73a2938jom6n6bui6k42krno8mhefowp81kh7mkucla5s4zyevfhd9hruiwplvd3eq42aqpzluhg3h3fgsvu27kj14h8lhuhriz2gf74vd4ii5cltw71cosygx87vimwj4pms76p47os3uom51p52vvua2893jbfm2z8nityap0e481i6zhtbqjbbu21mlzbiuxkme6yqc8a11xn6aa8s0hjvclgpkm8lcalbchhkakmdz0027f4mkap7yby3up6034mygyri40fs3c6r5kk1xpzom26ph1klrm6vug6dyamqehko2uqt4o580kir2f2kntvhk843zatfwqphrq4ixmq8kmegqzen5fdgsz55jj9tkz49pk1444isxzf63ns58pprs2rlx52t5mamubsjviem1vep0vxvaxyo841qh2fugr7scbdc0c1wzvzeuhjjdhispb2d25le7ce7ktpe6uyns97g0ln3hoib441w67kb8hlq57x4mruxd925lyb841uh7gzah7u5eckvm3s6uc9vtxqb7x87e9budx8ggzy5du6c0dpc68r9eiixnef7sl39z5zxq1y8j2ttze6wd1mgsgrtdpw6kxrbwyrd9cn3gg8vkdokvatstt0lhs8p54rxxywzl64uqbor5k5xualhlyd9bktytfh04x77qznebhqtcyg7bz2neoagcc1w9jrj7k7cj13nrglgmoz0r1f2jrk1z6q3ytlbehzdx60yrwxwzidu5702bo5ays0adu2igs99gg1miksc31xk67k6jky7oya301pxagqlsgdp9fkhhnnoum2sn58owkwyuhgp0h45h9ah02pc3frmqoo354jt434tkr1z9g2g7zbs2aapjyzj6fbumvpb90bzn8hu8lmogmd70wv2v8m4m2r7fp8ima0uiuv0j0h482d62ghdzvgqz7zly1k212wzr5ycij5qg3i3rbzq1ko1ttp695yand7p37hes07sqkgyy86x3pvsjiqsx047ts4gfxh7z8fmp6bz16ygvq1pyaealgwlwvoz8j8iulk4mnilpj53x02do9it3ghf2eb1natqcw1kbkpof1ux61ablmmtipzonrpqgnvw8psxwzug2oh06xwzh62xw01emiwlr54xmtk3mej9a9ao6aylgtleq5k69mfrruw9uciv26ebet90xg0i5t89a77ukgsmj67n084t2srgka9i5la77cly2azstw3yseggj8tgop2jyozu6hn69c7ui0vvygt25dt1tq0zbeysdm9idw65pqqoiqn3zwuoqgl7rp7tpcsoteg9sdcmukbdv728slypjoc042ia031qk3dc5nzic5nq7rpa1vr4wj1yl4vcga5ihirc3ojhxkvzk3ykcm0peqhyh48i7to68tb6yc1hoczhwknfkzcor88tl50bqhx6cx41pv1sucd0vj0el3d5vy6v8a3nu4up7dhwbsu5kekp2vxxf8b3pw9o0m7eb1kva63wta2tgvdw4g6tmirabnjlln02ypysfudvc9q7xawts71qf1grescesl6q8lvl9xgoayc88jeb17tdbp7xcfcj3qisibhbq7funepvqdjzgwt6oef1ggp3e0sllrrps734jxuuhijdijpzeqnghy25vfrqdlm0817ivw21aim1b1uwizn2vyaaudvimb01oi5ca52wejhmm14ov19u68id2r9x8nntlxkc',
                        expiredAccessToken: 2498203670,
                        expiredRefreshToken: 3023300837,
                        isActive: false,
                        isMaster: true,
                        applicationIds: [],
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

    test(`/GraphQL oAuthUpdateClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateClientInput!)
                    {
                        oAuthUpdateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306',
                        grantType: 'AUTHORIZATION_CODE',
                        name: '48j361h5ohj0wx4pgyif6pl24simw9av6fbr565qxg1820pnclxq82ptosyuv8u9d4phk49dqegaqto5otjcx49mzd3k2t08o4alzn9ni4qbndgmweaspm0dt178or1d0a20dfljop1iytx2qhfch4zeu35dw60mp45xrvt0994cd3vjcp7tti6e4g008szit7keyqdbo0252kspv42r2v9s5c1uo4a4ect7fido0d1wf3bqj11x7ltoucroxg1',
                        secret: 'd7ynhv9ly2uq1p6l6ayv0lni95mko6gxz8kiub5u4kw3dhezw5yt2g00tv3wiuuk77jwi1m723gawajdrou9f1hu72',
                        authUrl: 'ndm2773zn6m7s5nyyqjg5j4l4tznvzgirg2g2yk5eq17j7gtrq3rdedlwoq35jsnd72ikfkte8t3ckexcside98nh38540z25vwuaigty8wce0w8shqgqzqka2y0db3pgjo8yykdgkm32mf1cj7kjfmvl20dgfrvdd6lq2tfwj8x1imcsf4ua6hqdipqoelrs8f2f3pih4syzdoa722eqbt4o863qtwb0jt0gbs17jv6p9mo8yyk6ezy8hkz05xouxd08z7rt19alneyzdvtz1nptdresxk7406v3c6nq052gxu8em5klncmvu9z24hz1fiy72gw2qfw9madh4fe5yr8gdw30sfzagxzp5yrrjtopaq6yorwmo07qg3q9oer9skr9tvd1kddxnfhqeehbh3sipdc0438z8jlpj5jdliv2mcz9f0oi20h4hhocsyiyzv4dypc07h3q1en5hzrjw02epltf6pp4rdubgvp3rmq9rur8yenr84r43ojupziisfm4x53vyz2api08c1xvg7ogx2zcdl1enwpxtzsu63r6t3jo9gscvuduo883pzvif92o08yjlizvgbhq8zba8v2nkoc6n24s4772gwulnl54tbvbcv5hatujfl1ivlv9tq0nb1znwcl73tl83u2uf1b76f82udlp0zoomssisztg33fus4ck871etz2he5fvgm3eq2hvfqikh6hzrre9ei53q8junatvrrsyiyd36dapy1cfsk779j2sapftwlw392pld9nwa5r9fhwck3lp1knqegu8954hhfe2cbd0w05bfjo3jmq8j2ckuvqg17n3l4509ewbb3hhq4868we3krtxszveq4yni9gmmwcadego87otlvbms76l7g9b3nin6k20p6ttjbvzo02gw8v8gm6tivg6vn3y5a9lmsmxvwtnlh1eij7jh7hkk1b7iazx5050kxcbo5bfmiwh0emeqqhvz3bpbu420pv5eprblcz5ck7acj6klp0womzl33d2xnp3mpm8b5j4x58hv8fkg98i96sj637p4n90bjb2onmkhxzcd8ladhy2qhhonohdmqw24yv4o9k6thw4kv67mht7wwdmn2bd10skw7e81lzjng8bbedvfp5fkl1t0fg0zc6mluqczj01dq5ffygclufsh6s6axgpdi7q3goqwk9bqs1xu7rx9k8bzt3hcl892zmot9wc4sx64lad8aneh6vj4qkgdawpj582uijyvvpefklkobwhfvbu29ex2owufjurvmg0pk7qy9qr1gpnddofxzid9g9z1743u22xb540yo8avuzlztdiwwpdli1sujkqd2s6ewykogi6irmay2bbg670o65wi3ke3cxn9uc0of1znfe3ad15zral0sys85hvubpip0nvplyd8qegk02abo886ajd62sz6tlnlzwnuvi31keqr288ju0x0yuckv5x0t74ndyb6s2023yk0znu97qguim2bvm0n7xvqohtr09sygq50k3ho6a55vbv5m6tlj4kjaz23c6vp0phzycvq3ifelfpuj40s92f76glujnw47ls5wrezoojfg76oerf4g9s75g3pb3soe34eawo43gus52vm57yc0k3l84skijp5s8a5clzl0t4gnbcsmfmtqo8mc3mof4koc89zngyahhtugzv0tzcacvodvz2ulrwh4rh9lvoec2iu3qxezeup80erd9d9ran60exe9lgvekd5ibp3e9n8ubv0grzpewchs7y2bhnl775ng2hbv5dx3aa0tr3lbbhirxdxepdu40kjrifo2ctc426075lgjg772ai4n0apm7v7l94475jro2444j3v6bvhc5og10y88uh291wre4flwrfcw1vddlb518odqpbkrrdqouolrpe2aifbh8bs6rxh8aal8a861st8obvie8ntyqwwk442cmy6fvvqv2u5et5o43am9op1kh2eepgm0c9n2mjn6yr3xw925tjxj0rm6atm9r5t44ji1jffnrlo3ufv7d',
                        redirect: 'iav2apeaif6m44v875cmupvcp9oyr55libueqaxdeum3dcn7a255hf9v2aoot7kg4d2j6g7t3nfnrnz8q8frbkqo4dig2ga2xmpfxy87zf7j371vkm93uvc0uj1p7of7beopfzcczy4294xiq2uu5zkg3drfj3rtulrvif138ayjwpu8nzouwgj4mki7ne5bxknb95o37bsiobt23dum9ev41jho5t6iugiac71fegrx6eeo1cw24l316egxr9zf0sqxmhrn2v25b4os0s8cs7eis89c0toa0i7v1xym9wrr7nsvts7eavz0vzn5fhtmiwrzzdzde9k93q4a7nu8a7b0v5zu22y23rh2i0zrzredtq2ymabfaglgt41qjeawotd3tz62hatrxaprk7uotd67hya5d5dib5iw8lmgi5i1llod278lhw8xgb3l0j8izxj8ewchoslqyf0xw487t1ki8xg4xjtpto3ti1w0r4vta5caybbjklfwztcfu4uk6mewefj8sxthiy8fxd7plqkskrnpurfy456bnxubjbykix8wvzj984zcksocjynctonl075z5l3lss1gyyc596rr5jfjxd4dsth1qywrqd0ltsnrweoaulawtapdscdjux5q3ey43jsbwp6qarg8k2mlz5u1tgyxd5ylnyr7p5zfsz434ynuxrmm88e33k2fsrvhlyotm4zcsi7xcoz06v8f1c2ex4z8n4gf4r1cqcaxzl6852rb29fw1g2cm6bvmxh0da9dzy2jfyxkka5gbj9tbqssycr9dghs10iojmxk0dxzloqfj51m8s2levzk4i474xom2bbpu7borezhhanr07zsiiicdpk0ob7x6byaikbe13oviyogi8w42vxmn21sdn94iav9xnx8aqz7pp5q6gzxvcywbq1fxgxoy2bvb8564dryt2ximll9jt1m8veo2mmjl48ga2auxl8j72rq7qpmaotam47nv7dz058zas965tqai1l8rr82g2p5s28bkmic8k1bzy2l670vbj3l9htvlhvn5hfm5zyt397pjag2p7d7qk8bgumoxltkt25lwb9l5okywalobspcti0fwpgotzjvskg04rwnbqr1h0strrj510ineevuuir0b2w8j81z4517j8rjt2ubuvwwntzkukihna6yfy6emzf9c7gy95c8smq6xwytsl0go4rnniuovahx5xjk629q7m5790aw1gy60tdnjzu9dkjdehb2tfzoll85h9u37eru4jfrrl7hxtlb8gpybyr0dcf50f0gyl9od4oedkg5wmvobi0ljfvp1i5f6oy88uqptyh5he2oj95hxuuck0t2t41ayh6sh8jr92ri0p2fm4phwtw0o90b163fafktokx1bcrx16op634vrxzxemjtbwbx4ytddlqpqahx30q62ygoykp2zhjzrd4vcpokisro0cwk1d44onar8zbghzqfk0pwbfb6jgw4czhch0vyj6nzjupwjoc5poifjt5hm5la5kqq4robn7bvx4amwpbxf23lr15cyehxmxgtc59owwvoyr43pr7ivk1h0wf5ink1qugfz1n4fqnmwwr4epnzwmlcsl2da3x544a03sw12blcnp9egph7sry2f2etsrsahe6fvd3233xipmgpknp4fxw9bxghl60zra2688jwuhwqpu00ga42tampo4nadfm0cmln20g1oxhptgdyyl0cp6v2aw3rxjp5x7y652mrzjziiktn5ijq6esm16zbk0w4si0hpnm5rp9mw8rdu5j6wxksaamo01wgdwclx5zkg8qyd5egdn84l7ug0fnkgpgo06voucoh6h3j1qzul9k5c51ajcb3cn5vyvjd2bidx15eamlulil485grrk62il3r1m40lx61r6lteawq8tbo59l9wrhaqwnlk536pjy44p9e05u4qw5c8c6exhtl70t4zxvbencpgh328qczgvl3qu8ltt7elu2bykavvmka2ffu9oc3n9e5piu56xxi83zt',
                        expiredAccessToken: 9102133429,
                        expiredRefreshToken: 9269783810,
                        isActive: true,
                        isMaster: true,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateClient.id).toStrictEqual('a6e656bf-8ec5-4f1b-85d3-4e930b75f306');
            });
    });

    test(`/GraphQL oAuthDeleteClientById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'fc6d3603-e675-470f-9a8e-066323dfc90c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteClientById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a6e656bf-8ec5-4f1b-85d3-4e930b75f306'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('a6e656bf-8ec5-4f1b-85d3-4e930b75f306');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});