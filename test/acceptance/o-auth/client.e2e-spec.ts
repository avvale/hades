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
                grantType: 'CLIENT_CREDENTIALS',
                name: 'h76hy1dq74jo1w1v4rgiekxld6pggm3lh89hbt1nt9a90fg7n7tkp7svxthoejnfnz7n6g5ozpkgw91m04i8eqybcu5qbp67z3n49s3dzjxunpk7j4xx8eo5hg2wdp3azf1osfftx4lz2y8qqymz3euod9sv32pxhbl08x11v4xkys4xake4ybc9e8ejpja2dj6vylm7257zv08qzom1uvz1vo4hnup4d4bdk1r251fhpupq6evcx7jmd3ypytg',
                secret: 'dio02y67ricm3yvkx8d7tcpgdh2k8n4r6dzgectbanj2iuty2faje0kat4f6ey1a4lsg93cwgb8xinzs1g61a3c5fn',
                authUrl: 'x3576rjyvng6wv7x6h9bqj5nb2n0aiep2fp52t6dxi21ykl8s8hhbp3vywadq2rkj2nf4lwtwo93ubr1rvv3fy3voyv57jj3ozsuix4hz8rj5pmdj7i4fx1uo9zde79j3ll9eo29rlnpzchwyausacle7okhma3m0porr0tcf82gsmfcm6g119yugo9axdu83qqmhu0f80a3hiy4jt3fg24c5fvl6sj870hnusgfnfofk34acj2sm5k1hcx4wu9k3oowethsiu6divp97lh50zd1z11zqrq5a9kcv6h4i8p1nqhwaisf48phg8bjofbxf94u7ekbho2un00ot79ujfb53b0t7f1x9mv0tkrknltaxp8rbba562u3f706qhzdv0grapbxpkksedaqknxoeysqd12embashvgwixf7dyqdjsvhs7vna1t6dsqmejf86rwzr5r5xkbsynwbdyh6iq33ma0cjrl7rtsrtzwvkcy5kqv4p7um3zvlnxeq3x6ntmw8dnqladlss5sqzxzlrif9cpias1awr673ihkmkc6tc12waq85ztqox8bpobnr257lpwql0nhpwdoira03jm2uedpblm1b5qxebo4fiia9m7xar2f9wsssc8pjk32vzq3xh90m3lg1fwsi8fxez86zou638jw8rccwjqgquoqvf2fnhd5blf9370nnqa4h2y6e7dv01r58qlpclrlixopqesj147l21jzodzu20dp54padxih09elzaiytm9m4mco4nuh1a4vmswyzgkh0l3o56b7186gl6ucfymxsi6equjk5opzhkidan60bwzpo0de1zkug1f9s7a56w0evvse7kkazz6wh2y7fe7lspma8jm72qrlk6ffke5m9quq3s0fj1u6pgw8zuyk3dx3xhn9c7s9528h5riuj4wa85dz1abt5qg1uyq9l6nlqvfx5fodo039tx4za7qb8rh0t8rcir4hz6fd9na2quxvgwvxftcrjkfr21oicn77n06t1uhm5b5ifmctb1krfwfj2rgl32gm4u9p5zkbxtqusfuvweb52n835p41c88bh35d2ar9fdh29dvvhp2i47tlwazf9bi9qqy0mfrrqb9pt9e3tse1gt5vzvu3limsn6ur8t9j1bp0lay9v6t3618bx91tfmr6uurea5gag9c6yfw27co2sdbepluua4m4bwtr6m7o5mykem3c2f3mwtc8gbk4pn2hq4mlj75il91p9sfuskfx1kfheae6np307c0cuyq0u3yuf8s25nykisegh31ga8uli8sjy0dxaluc8gcsh9p5tkxztodsvfe68k9w1jxwxwxgq42p7amld0c77cp3bfz2aqfxvmbwvb8iqxv6jp1935biczcf6gyr1ku7jgnen13c0rwid9capiotzih91wem5zwz63gqzkauo3b1rbeexjj0b9kd7lh1ynw53p5ik07rrbbpyxank4ugh0p7ka8tnk23itg9ht44wfvcmgp5hj4qfebw64ua1l0crj4eeruf9p12wsto0fxn68qgkj44eb31kugb93pnwnaj1ojajihmuq7swcvfif6nouyqw6y0orm4ck5dr128kxfzxrv02b16o7hquies9l7ql01gaw2lhy0jrmi19kjrebxr2nuqldoy6gbyujetqi7jc0dpntqmghxuyykjcbztdlnrqll58v790h4x51sxhhpn49o5i18jmdqwwgmf3by5681g8xg4dt2xx5gu237ki5ah054s3r0k4qoh5zkbibeddyd5xk69rwva7cdnyii6ysybb3r5t35euz3yh241qzh6v6ck6ztrx9gmx42e34d9e86m9ar9c744dg1hf28wnsp5av4kym8e3roexf0ok6vc605akdpjic561y7nssbbp07zgchzhsavmudz3lcs2ifltljoden38uqg0tx7becl7hodyyayipf1teb7bc21xnd2tjakngq7q1led7t9mavivy2egri0ju5d2mhc61ej4ya2e3ils7syxt3h8',
                redirect: 'lrg60mj4vns704zn7fzwvrw0fawd5yyfkszddmw4gyzpzpc2xyxejx0hy18n1lo6h7lg55870tvfdfl6gr9ejwnl4p9atsldh176f7bi8ilhgjfz0oybv77l51xji6vysvh7pciz6ip5h55crrndjkz52o5d0x94afb07vn9hqfoy1p5bz24ya12jhtxnys68lfs2torrj6f4smgknc90mmbp3iyi6s36wg15ssuin7tyae2yms9lvs6pf2vrzk1625t056159m3e77egiox9jpi59j6b851x6dmhydr31t7e9v6pyu4w1wn8jrgiw65gdulxkkotv866ay0pcwtlmk9z513c7m5wgwve1qeqxf1uz05xx13kgwxzuub905kn124rr2vm93wo9o9ch7v9y0wiphwftafawzwwlvwhrzsjn9u663z6a4fs1t5up3hahepmy1myj3gpr70846hsu34pawgultr6jyhvdaef334k700ghsyu9m4lb3pqfuxhpvf1anxlzng8mgfv0kiq9c3gjhjl1r9yrb8hcovm0o3gnblxk3i9538y5fd0v4eeg710ouckmsuok73ph5j52lrrd7dqfwmdzdp8pir31bmmvwegbuk09lq6acsxojnb914rlipkqr7xqdazoonc5epx5napxzplxig5v758f65na6ggck297ah178xi2r5u09rvbije7l9ckemllww4g6hwayl65k64gej6ac4hycrw2c90up20kv8knz80dnjfbi6pauv4wrf38gekc4jhaqu19w1ff7nbamgv1o2c3ziud7679to8wu15gh4x954fy1twyhq4mu84pzanmgu0kia3epkz7pdmf1zvr0pcmml81bybrgm72fkqqldjqu9o4acdfejznl1z6o372p1osdu53lr9yxxgbzeuqe2prdsppbqvdfgp6gidjjs6ca8n4q8u4u1ngsxt0dyaz2rzgiz0ijmwi7qmavly27tjbkhhqx5u15cz3z3w6q4blusywuwdk3htdgryr3gub0jtyvjf0wz0cq3t6i1ghjzhn31nrwbqm2tb9tfs3l7gq14vpr0sm3bwo0piz5otg6ij4j38zoar3ftbnfpgai2unxjvkywxny25w6u88u3kl7itjshy9x3tjywqtgd9vgfz3poazugj6xxlpz8wf6gqf8mwatsvsd6dlmn294u8nn1ylpuj4ogcdzl45x1ao30q0ryc9pc8il96anomgtvp0hud5q31mmnqvw68q3c5ynto94tuzqr50hyo2slauai2sxtbt8tqwkjr2wi336y7l3dvhu3epkn5u4kbxvx74gzkvj2mfiyqe0veldpjdigxx8acbfq0m0q6g82f07vgfcuua1d65p2kxe582gpgxkztncedhpdg50w5raghpadut3ze2a2akitly0pkc9mzhd9cf4bjxkefhd3w5r66a93hsirhzy493a9o621xqplz1j01a7ppvnccmebbec3miio88df4m5b794w7iiifie3sqr4ob2qjpxqm010nhoa4255uvt198diixb3tlj41oj7xvgcqvu45vkbz66xrrs5rh96pxlh7jbm5bi13v03z7muce7wnhhqb0eqw0rzet3l4ailalw0fso8is9m4vzhin64tz442d1cmkklz34vvkz1luhddermluave2ut30oc706wq4iqhe9vexxx4k8afo4dfpw8gur1qjzdo1y4lsv4ibc7xuw45y3g1km9i8be2180i7wqe5r7c70vjpydj5xkd8jc1rjh7e4eq22u4gebvczxjykc81f1mg8h3xp58amgpdytc7i3qi295cs5ex0o411srqjnoj2su569gwue2boc56p3volnu6r4dveeaawp4rxgvhkcuftamvb1zf292lq8dq5nwlvncviz1vxd6dpqdbrgl3klzshl2t8aofn94bn8nzkutmwo607pq2bselwrcipc4la1csp6s3hljoi3wm0gl5zohbr3feh5mw5hq4yn2k2bquvl9s6i',
                expiredAccessToken: 4672610920,
                expiredRefreshToken: 5247488981,
                isActive: true,
                isMaster: true,
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
                
                grantType: 'CLIENT_CREDENTIALS',
                name: 'lytk0cbehjjlh48ec3hmy50ca7q6jdchwx8dutpaurd20n0rqvughl4utc9oquk3sp4tlumcdv3gihz8l2n8c93lq6h3qxba4s131shighxhferptb9zj9mdu31qrnzqnk8m4b49edg4mj200xzaxlz5p1co8qw7a7fi7vrba16crjt4vattdfyjh228doeduau30oc50vdhnj9e92nfx46936k1sacljwcypf7j71ncpk5dp3ish47ojxbaggg',
                secret: 'mmcax7toyo1ve29bkzzhjk5kqgvp33ffnzacn4b9zpv1kdpri3hd80smdbe4tlqpwv0kcdheo4bg6e7wmaeplp09ko',
                authUrl: 'd1p8k74qqen9c3g79apz9oecysgp55gbc0k9n2mj6c7ul0d3yw400cq0czrq7o0txtda1kg7mh4lcqlrl8y540co22m0ex9cptuq3junjxs5u6ci6vtk2pjuhq3lgcyjusbmv759b2z30hfwrg1jgskl6c6zml49ivkgla6myyt3it6nm565jxhs4b7actvgfo0irizlhwkrlx0yzrd4p9drqyxk0uokf2obmo3f38xytj7avfjh136mh7c8vfzhvqso33txv85txm697e9gqis6w683edolyg0i2tbcxpxq5rk97dglk19b2p6xjfwkvuujh2nftv2nbztsil2l6nvqftyllfcujvfgzojqwc1kjxxm8xr3pwesm31pth1ey1f3rjcyyuo9rc53vsryj9hxs6l7yophu32wid70jrho17h6o9rl6s3wfdt777x3ci0wjc082amwa1gcsri8zzax123lw039npr3qokldyth6i0376iupgeg27gjbrbc8sd7j7ssl052p7s6lh09k94k6wnk7wbb5ws4pk5ek9pyjcg5nwaevzvqrm1r1kqp3bxjbhw43r2tnw2hlaomwq7377xvwpum4h2c8fmikwpal6m7sfh4qnohys4perbwewfnz0pcaccs5asc0afja1i19elx2ln9w8npcr29cx5l52gqmp5oiu703icpb39galouclxq05v1i5pddk57dab2547pbs6lxvbez6y5nad3034c8f9hif2fiqdopk9d501bb22wte73yh8jw5wagoytr3bbmripddv8xpphdd3x3ykn2at6kupdlwvzy8e9xtt50znbyrpayc690rf3p89hjc01h9ze5gc71ovhnqsx1vy51dma8xhnvsz9ge44yj5msif40l5efwh3sg2lq5px111sn8x5yhygbtlkgnmdqns11ngb8tuek4o2abg0v79qgzosc3cun39ykueelkrv6qm2sgqhutnf043vdplfszj0wonrx6mn04es2rw5sreafttjzq7qsd6uakocgbmoqjlkq7p3k704xm16y1ten9o4qvpyomfko1wgufiihz690tuohtjnl4b4dcxzfwtywpmv5o9112kzy03e7qso2cgq6i0ha7cvn1i7b6la0kajetvzscinr0x349wbl6wsri43kmfjxqx8zetxrjtj08ibvj7laiqfxyzyt48a400bjue58e9nkpo2zgsw6n35rp99j4yx0alx8n7ce1wqyanjqemnxqdq1ppomi3f49dlyz515ccmmayi8mtvburwlrxjfebvryhf5w7j0kgc981b9q6hgb8r1etjj8iewpbfklmzd7t7juumshlwknulmn9yoy3q3wbfl1i9wc7ixjmdt7n0pwc7lth6ocuksv8w4kwcar2d7rjp50zu0tjjob835qbs4ryvlravghnje7n54vudp1epe5o0ilubjtaw8j61f623ljo5x4ukxi81r5v1s0jmwq9eq67k7wh51r6e2oouaub1jozueh0sqw1pa9p05llpv9svloi42w8cxngp4bipvs23ez2znssupdj86lrc29g6bqgw5q17vqusbs4rh6s2u7olsi1msjswx7kymw5x3vemq5chabjh5uyjwfdikmnxbt6pzxaohivgs7kbmgumbb5oknnudrjwg6hhsj8rvm4jcbdh78zh8gphvskjklav0qr91vsjdh40q35ogevonynf8t1ubt769ghfvy94wf1k5vreeawyoh152uj7mvngz0rijy1e7khlzqr7dxh2rvz98rxkwf8xmybfykdgjahgjmyw393lkb1jtr1z0negdmlww2pi573vj5nw4g3m8ayjmisqa8lsyilku71i03fdtqtm5nlkzgh9v5b812vhu7qnvd8u1wqa81ir2zi175w9x72cico4htwpkubcz0lsxbtuk33rvrsc59mj7vyua69pgdav2hlj9zi357r6jxzgdao3kvgrzg1cnlwvlj1ncpcm9z6ep4ctmo4fqxdw56j3j5b7',
                redirect: 'w17b2h8h3oedzvkwcq2dmdxu6j4aybejrtrq4z2zhm9tfhva2yih269rqvr8j424hx6emurq91837znh0w0fhn4fbtp8zbypvls6lm5wes3j40s5befjgrhoz97x238egywdn5c4goa10i3ctr9i809tbd0sr0m9n5m8ph4qc8ibp5f4hko76evhgwprkefc4n85fl12hu596p98fwrlnxdfwlfxo0z7y33hpud711863rgoc40umzztiind2sin88u1wtpu9gk17xv6k8pm42k52h2h1aj267e1y769xvhmbwydtc1iivz70h2caxjyzsf9akv4sdw5tr1uq5bmcj30sp0kqkds62edgu7juk07bg8klvyvz56aa2dsdiu3q7rbht0q2tfs9xjdby9ryn15npfoyz9z4909sqko9w2l4mq4xm3vtckp2dbdluww920lsc0p46cbn83wwwoq8weuqym0aj5iejzyl8brd30jj12n5x25uat6qb1z6yndzard8bpj9myc8knfwqnalenkrj99cwtjghzdvtgmpz8e9v7s82hvlw07ls5zjxa1aoqvulpnl4uhxgsmo5qbsyapd8f60vk5rou3vrgos0vi9lgrwf2i1yd0lo64s2ovxfcsovzca0sbtmylwy2qyvbg1v31we70nh6vdi64yt5fi589gkxo8veuqc2njemo879yarznraxlw25c4wrsq97ey5xuxvftl8bcffwqu6wkrpcd8azzixjpf26zkbtqq4pe4fc4aqxeiug1h2b8b859mru6zucve5yzh0d76rs9yt5wppnhv1l88girovjq4vczcoyzlq5pq6xwkie3klhg1z7m9eey6fn1mduwhu3f3jsi6b95jcin44d6cp7fgfe0jgpzm7ew95czmbkvl1qssfniajtebxbzveey3sbp1d4nt1bpqsbqarewifnmkw795ymn9wy998af8oie07izqgq555b1zvuxp3x8ainsgzcwi1u6of24scjbwi9e3cey3eiw0desqasm9x76yl7puvhanq95djakaxi1bs9nze8pahn82tb2x4408ht6ouzod82wdyzcfvdnsqnph5vz3mhoh8wujf08i3djqh5a7m0ixhhisg7z4sgc0ons9zr5hldgoxllahrwdfv279akds5390padeqmo8mvbndqc1qoo1x3iou3qwpqou5zabhm15pvpx1cfuy5rhie8f3ypuslgddnsjettjhg9yxp52gn5byw0z8v7fkj9ryu76rn3w5yuze9bb4a9zb450hsvxckrspiwyw4yurgdzmdku8eiqjis0jh5k2uv6o4lx66kelj0pf2gxmecvc4xi18626gwrlh6k5ec2dg25wjj4f6bl5z53v4bnxtr9xsmd8roct4iip4fged7uerq95465bge4541kfybdvi7qvf6j53z3mnsw7n0chip4sijmj5xcvmccl6wezl1d42m9au97zfox488t9v8q4qrttj0epl3vnuvnmhvr5nqzbogoidmma62keda3pojbzncualttc44bpeo7ivyuk2l8yz43epobj3b1jvxuab4owoytp8roxetj1kp5z3z6lj3doeqk0qel8yxw8sz6ld9562kzqueoodn5qf1a6y11urge4jeciatg0povrbhfyvv4a691u56jf4y2tbggp4ox2cq66x295merybeqb53ze6z98cqk8zdp3bdbf66rarxddqfnmup5lse72xlo6hpl82soafisbq0yth799jrvk0949adgwx6wpohiywo34sseuu4eur6otrxr2r8gv64iunzmxjyic7tunhajkfjt162rvijmagf7qjl3m9dhetp3hcf3ghbmdnf5swfk7o0z60hdbce8w28s8gwpchi7jbanw3huf02t3l7l256oxps781qxe7r5dsc2lb6f75ffgrfra58mdczlpvr4bk9hak56ob95mliwsszzschtjkgv3zgzrai79nblngg0ubq7iupv4em82rpfpqxdgh6y4d',
                expiredAccessToken: 3813569239,
                expiredRefreshToken: 9508503716,
                isActive: false,
                isMaster: false,
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
                id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de',
                grantType: null,
                name: 'xn9a7rrgfzdbog3saolp839ee25ocy8t0ptup2wwunhvfqfs6o398iz1m0f27zqmrd6nyhzl81xxiyoog2ko3n7lm0tus00fwyvz88qdxukhgntue9u2a4fs2suzyfehubsjfcudtc4ydt9d7msvwkx0ghewdgxdykwwab1kj6oy8t1dxrcwxfyx2xhob7ta0ublkyrek3kxvx2lsskdwk0c37j0dk96q07dn00aegalnvhh9mr5x38rd7vpktu',
                secret: 's2pen8s8jnu19nx02xipjyw9n44nqtqo8tskwp2hn70o9kql9o26ge6t7sf0eik4evlubxfua5dnytpsdzddwiha1n',
                authUrl: 't4kb9gt6r37pev2zr20b8e0jk6ubzeaouhw7sisz5tfnbh3k8yvmyz5xohboss8j97ap0ytof2rfr28ws2x7v23fcvtncsdkh43fmkietmtofuzkzlni4rne7je4f99hd7494kwmagwfqwwvk20wgnfczgwitmj410fuqilpj6dff27td40y1gnb3ttuwb6k0hlfd9l46dezrt5vvw1cshyinemrsdalts1za8assecgndhk9m19srdwyi7jg0sf3mblfj59xynfgfjotxyx5k9x3ri9i0w31bzmad7hnkb7a9l636rq9w2fm57316uni5ah2348nbi3a915abpnxxehr9hvmimgt75r6y09vz2lbn1bu5dlgvhwy2x4law6pp4r6pybbie9m0d8kkx1au8t5uazdrxk8qmh0elvmyv2pf1ufe1vt7wgb5p8ncr5mboxc931ktwtsndgejrj457xueap7dhr4v74hu9cfaem7f9y0zevb3y1xlv4jxpf1o99ik8545334yse0aq0zfrqh0c30b986tia2jfpfi8hgdkqerw9qn83smjpgakujx0jrpsn4gwtyg8wt8u4vz6hy8q1znswbl66cc9autjnr5bw5n9q7ksy7m65orhlt4je883j3gyh7tffbcp44cgvkhk2xkdiuvwtv9orkm45y4bcc73l5d7nk15ohly12kzzkmk1qm4sgjlhfhsbu5jsp35vx7154rslnt9s72qr0ux6a3e5qrazwgdnzxadfwqagghrm8yghrv1gktdftuw987fupwjmcw7c86dk3fzrv9u7sydflkyck7zhmiqy1c2jlq2zyfrfl48fjho9beid42odmrpp417hxolzy8852pq3o9r9m0q1jyefz7msgsun29cy71qtsf02whgra1a7ygd7rhohrzxk9hgnkogbfp3cqddmbhmjnhsysin7lc0r9kcuvd1k7bnf16xxg44z4sj972e07sz3hisq8u2er9wfxs9q19g8mfti4om5iues94wuo0y3xa63qba4qqwvvqdfgl1n747is2cq2l8a6uzei45p3mlf52k7kexfyao9lk6urj52mls05wmbzwaz2cmbr4sordq0zt8h1d7b3r25ls0p87hd4j6nb9u1s4j7dpdboekqj3vsxjry4d0p361frtwcdbsi14fa9h38249i2yfcqvnaqvl3xxit3hma7ydbbq52lezq47jrvefl2fg07qcdjius9ykrrnqo4sa0045ttptyb1tocphmou5uzyxtm9kyi8ji8wwmlmx6fyo6sri078j7dwl63tzba7bh22n0yarirzes3yo2o49bmdvlsxlqt463q9nqggkgkt14oppbloc8vy2i3x6u3y7y6iztnes8jk1eayr2lwcsdd21kxmtdn197dgyz1cwg0jd31dte7cxf9a2kq07281f1mofpgbosd59pdsymlh4odgiy9rf2fe0dx99ucyelp6zi9lwzquv59r5q26hmmmznjc7zi6tx1rwdbiwup1gxuc8z0p16sbpmtl48m7w9juo1sted89pjsmoxy1rymwqk41fyldg0xuzweqqaudggbi0zq0jylmb6iorcx6yewk6rgy2lk5xx18h9laceinw5m2z5bxrhxn79ys9hdefv45plh220puv9jvqb3gp5ydpi66yjcp5wcqe86uh1roqeegnfnx5uwsynnglxf1okhualedepm0m8sqsjzvne8ylxz4siwelw8hk9sys0o1zcl0qisxnf9uguva5bqe2e9e3tgu7uujqppvhcjgbqwjziavvbcce3jtrt5bg2cj4qlricjd5ezj36xdfypboweocfkb2oo3ap1fwemhjkzhazrg30fdpyozrq2t45k35r46aqhbjiews40mohuyp1tb7xsxj6pbtpkjzu5mth85dgh44half2tvijn405u4062f0ssya4zl2umfi17rq22bzsa2dtrzo9yiluxl6hf1rhrsjp0woj3igaxm3cauxuc2wfji4em3ztv7',
                redirect: 'mecght69udvooqrsdga3pjqeuz0nzw4k41h5m8muu379199r8u8b3om9bcri7vl1g4pohbguyazcfttvg2oe128obuuewp49xy5tkvd60w94xpnlypv2av2k65uaq90wpllqv8v1ps93nou154hqz8fp175vm51v977e89vej15b93tg87ijomaik0skgoja1mcashumlstbnlac88ozdmmfxx1xv46hpwea7qi814s4ybauzj5rcuoe30z61xmotbeeahf8b76s9lilxs4enwjvk2t0w9ix0f58e735988848qfty2682lze886z8qgifjp19ll8t037ymgq4507tc4kbwuuh5wdnhxdy3gpoahh4ud8szlrj857e4jash0phu37m0d9ld5pvxt7yo7mqamq7wjdq5wchad39fabvj4472d3x24x3htply54jg5n68gczwcadt2vffe5j1tfimecuwf9q08o1t02ej38uys6ngftnlccrykefyteab9hv1nlxcq0kio5kswy371xzcqw0msrg8asxjbinnoecuqjuzrqthk6fyo94d3dnac24zl4rpjfesshqx6eqh5t2jcjer2yg732go8kx7217rv9sq3qdkodpw8xk863yq9fox1nybnmb8i2kbuelhaug9rpktu8n7mzf3qmk7x87xwmziehfdnhgvizxwimsg86fqeswxttmzqfr6nidzh6qc1lafkkzp8nuna0i43arbqj7r275gbnyk7v7s1827g0ycmmiz2b2s8ggs3logza7herz2dprc3t4o9g7da563mrsm67dyndaporlug7x6kqcf9s20ssvxsfq8o9mx86mqc57s5wm21kro6hedfga4cvkzweuhy9hjmqlosvkb6dvpgym0w5po17tp966o90k3n1bn895w6v1aejshdzh6jm03sd2dy6mqpd6u955tfzcjxhlw6gufj1irnf8hrodwin3gcj4rdbq8ydc6xbk0t63tmkihdq1l2bo7mlqkk47om8jpzexn8411fj4msg0yd3kkbzani3ociurm2rkype2wq932hebbbfrq61n3zf5o3eo9xdgj7s0bq4sy2tfm1jr8qxwyps1r5l6vt6fc8kra79dzyy2gh0815klyxia9va23y97zj9rengzq91jk07lu85ahrsxt09xgy6eomihor4fz0hslowkkpgmxh8nqkzxjagce5c1uwr61ovqq15adzupo6ouv6l7ikie27fn3ur7mspqphxyojagcx3au5xofkwl39clfq0gcw0ev6gsrnu5vbw0ylrwhq6bdd18k1ze5lwvjq5nf3hwk6b1q92bkmsqdbrkv3c6gdxajv9hu77a1ubl40s9bmi8s85y96fo642kq754nx3y34fxc5vapvxrxkgqdvjtznvsk8i65x0x66m6cg2sfrl9qzcgd10zl98lu27urmjw9g0lt96un3lrvlybuok97u8nmlxhqiql8b1zkrip5v22bdlhsmablgqhm3132pn34iwb9kg00mdhk0owaw1phgdc3ojxji1gihzwbv6v0d0ulvknejaodjn8baa7o8f8wmxwjm1b6en7tgphr03noi3yq28itpess98pv5s2z6qy488b1nijatlaa3q7opv0m2tn942nii8wwd6dme2c0qek6hoo42ccpbv3ipjgn3skn00pmeut1doqctdlr9c7caupebhdcpfrjqqkkbuaz2ccayd9mqgyb9inglmfsyiayp235glcxxa4wkz9g35bvjmbhg6np184m5pj7nng31g02xnpdskhpyxwwp03j5z1y6q42pww2p36spnqsyetp850dam0hpterh533bjtug9oh11cq50avdm57p95sdojisykwne58fkwdyk48yl6z5czir0h690m99t615il6x1j1jmdgxhesnavf1bnbssy68juqo7qqy0q9cujctm29gb3z9862o0o1rxilgzkypp21yl39mw9awbo5cd52cjo24crk38txfdelsj166jwkt',
                expiredAccessToken: 9634417424,
                expiredRefreshToken: 8151703501,
                isActive: true,
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
                id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de',
                
                name: 'qg0qcvazvssyva9nyao9tgwn7kr6k8s79gpk6zwef1ner8fgeze1ih6i9x0m6elsailu821ujh1h6aopzs36g3yw7p9e5n2y2hqckdtyteqe7y8t2ndthcjp8fdtpctl01v9ij0gg7l82xt081ldwd7s43zjavtt6qwvtw8ae43r68of964h0oxmsyecrcfg96cgogtf4b2cdh6ghukfop5kyhwitnttwsevi85y84kclbsvmvfqv2ppww656mu',
                secret: 'rphcjxwu88c8ww6y3whee0yui62acy94y3y53gzfwez5ucjcew6w0i0w1ptkno78rv6hl1hhb4nsanrkibp319jq9e',
                authUrl: 'vvk608fc9shf4ft0lm6ksyy2oipucmwrgrzpmcdy1tv0ia8865od100lntzy8akoulb2wvl2gye2toyo5v16bxee2ls1p2nm7q1mnj50lxw65juwzqpatz693ykl28mj3n5dvedl1vpwqwnits2tt3tqyexv71a6cgbvbj6tjick542g6wlqg6gzpsf369jqun451fiejo6yzx88cb4eq85kjnhryguveiktkgabuf9rmixkjf338rwv6y65moefhkepvtjjit61utnuryhbif04evf43nezk8r9s6v4zypd7ea2s4t9paw3dxzbbpa59o90qf1p7rwhtdj39vw9sj7m8wyfith1g5hh9q9mvhmwevlto3mao6f0wrevg3an7vavs741voxax6izo28h7qtb7af576e7idhvf4n6a1qp5rpdhqxrxm9b6irqmgt85x1o2qcquvil2lo3ii688k7hbpl21eh03cxu8i3l1yfk4pdaavyg1l1j5qpkcy9fv914a7sloxa7v86vair66doijzbyzrke0mxi7rlxsn0vqbcjaqs5a4no12tk2i4jt3wmsca0squmjmatitzzfnk3090zg3uab6skex74tqtxqd168zko0dawtkeqrp3lgzix0be74ddvdc6hi6nnetq7b3munpzx4rwtx7hms23y92psldn1t37bk1roln73i3at8e6oyv3tsa53zy9naemyjbt4qqyy8q4fvcmu5ucmk2qa5i4pq7qwtby5ckgy9dud2ksba19zbth4xftywr1u43v6zxiqvgm2y1gl2krnscrstty9obxupdzm2dro80s3a11av18rpxn7bggy6eqzr7nck0fx3v5sb7hjyzzsl1t3zw36hd7x9cl8isk84sgaa0qmbn0xuit4vczps4nankfe0gh32yfp3b57e6fqwx4rv8xvn7ytlmz56z92spehh5z7y42joo1xydtcnox4zfvpiwj00f6yhc9t3h59u86mtghbv3aenaocrmj9dpwzjfwfta2ccfdek86xdgself1cn4w60tay0nnxzb9avbxvfdbzm99fp092ofh5dehty3ezss2d5jymrt0qdqo3r716qiweuzk0wuvt1hemnk3zjpf4p8joda1k1jswce6skdzjzmnz6mk744usz9kwmgwnxphv9bpji0yk0pm5ed7tuhpq9y0p7gficzqdj8xxcmduymilyoh86161ab9d2v3f18i76hdoot63u5b4nhjub70hygtqb8s31oconkxwe6fexk0sdipvxrsf7h964qr74gphi9ecgwty9a3bl8a2sx4k2nbex14638zeq5jlrkamf20tva40fn931wbryntncdt2bxx1xey6wx347e25hld17vhn5oke56qg0dr2lkfsx8dfiu8xitfs579l0nog223ds9rq4ogatasg0m7h0mh3ec72jksd9qt8whku4vl5rxd57fvx6spigsm738n7w5vgi3ic5184l445shx79rai1d9chhjsg411b5akim43l6desjdugi54tg1bhtigoy4xzykzy8s612irk8ou6hsp2pzycjonvrombjxte0oyw48scmy4qfscf0cpene140c8oued7dqiffsq75mm1l5siastg6pmktibwi8hjjprzbmtnjmbuy3eesxevctfm8dgyciz399bvn81dv09g2z2xopznbiye244eq812vp1lh3zogr7f2sep0n5k7rnoot5g4jbszihsw5yrj9wrxnzmvkdsf7lvs6737so9bfyr2hfudxjmxxu3riv7gf0tnnnuayn7c54ezrm8xs1t8h392kpea3e52eoe01ct2o1y0rric5rncpfdtptin90vc7a1dyd6pxz1pql6ido00fun40eiy0d0ekn6adindc8vtg1ehtqegdpvni8hub5bqg2qsot51yuk8saswo4or2386veflh2fed2lok0lstm1ud8g7sg9mwtyduv01nv8hgzh550anxz6m37b18pfww41djjp09zefin',
                redirect: '8o1x7fbhv8n4s2q6pcf8t78t5d8jrr0upag128hgl7z161ooz3f1t42raxil3n37artx5cod1ks413jhr8iisdgo69rddmv34nxbsoqfjywnnbtm4aj17yibjxoxyuzdb886njklq1trq8cy3gme1he2c7p4so3u5hhf70djwr58g4l4vrh7d1yzz4dod89m2r1ngcx3ve80lwecgc66cg6qssjcfmeohosb4rg2bl1ewcfl8u3042oo4fa87cq3qh2illgiud655otoxx0bmgah0983wzqxm1q1a67pnvpniagq3gvq81ewgbxlz4qfs7wu2z8uxucun2fgqvvwjm0e2cbqfz5p2i8blhf0i19jvcgbwqwq25lyi1jcu00tay0vgatzxuojbhzpoqa7x07bv2bm8whkzsx4dljar2p327p2n94chsjfusjticq2ts6s71dvemsb13is9lnj9agi0x60emm91yomc3ii61sb4807yj7md5brv6m6qz3gx9vkpeyx0plicoxhemb0rl2invk1yvk7z8f7xj8l1op66p2muhuwip23imjj6yff2dxw1h25gan10klfyygnvo7xtp85y7tls26aqajwosnbluhn64t8cbogzf2qs4io1wrm511lnxdlo66jx7ph9tbv6vfskwjm3emyp1qylibxrmqjebjii3jc95qpu8t6ypri8j28pnbu1hk6822txc6ew3iy8aartqd99ks4qzifw379pg2koyvqtlqn6kacyv0tdizso0dpskvdp0p7v2g7ibim8fasmz3ru9aatmxlbmq655du7uwh4kue0zc45by03jamnz16n4yjfmvzh277ake8nx2p1nodc6x7eh93vxftr7j4lo5ji2tyyhbco7yf38eb5a74hcxhnexjhmk48woz6ps7ouejjiesri9j8s1ntxwxpjyiy2w90binnajzasisswwwbe6cywczzgqtvx9ll0o799o6rxq10nkb47jchgx5zdc6ivu225aqrcvperijdbqg1by70sqrrllc8dn7lfyiqkua12ntgddc6cb3rdnbvgf3im572wkh1j73zgjw6joqk3czaamkeaemdro1bgi0fobbokltlcs3u10n2gt3j50mw13ey8fzxblx165x2708i1aia49trj6hdwmcp2s95pcajevty5kuh9zzwtazyl25w5es190lxrlkkmkmque3xcnio5gikqo5tv2g3cxao6nvqd84vv8k6t45y1z386opshzw4rdvbfxajn7jn6y03c3pqht4ioswv620vlgo7uvpaukdbq1qld26mzdbovyapr8o51r9yyg2y1ep1sc2us0l27rpw027mizi0qbhrk6gdl9mocnky8hy6o32vihcyzbakb5bsu7nmsh2ocl7rpouwklyat9t36z0o5ify8ilucpclizruz1uv5jh3xa1ydq2m0ajaxkgwgbhwj2i5h31z4td4ga1glzpabgx9bgc7izywn4edw3a9ay01okuexzu6ork86f5uvc8x15qj8cukipe6xkto4v0ewh9rmt0f2q4sl4s7d9qx9q4epugqcxso2v8bhugcq7yzflf75f8zvgpk5fvthkjopwcmbz2nkn79pooo5sruwmykhqbcexfbn4dtirphz3xnsj7gqlsv4ribq8ln0tbjssxwka7zqjzyc6lndipavvljscbx6t8eari9havie77ejrji9atkwgc8njw4la6j1k9zsxi2kmvo7d6oiwvkmz9jgkud8p7w4djo098z2kwbn48aqsg3lym39npddus5ryuwpwja2vwp7mgm0zxpxzaomyyzxgvxkm6qynswuoqx1hnvxfwjlshvyo6ie7pv4l9g8rcxa410y78c1lu4ix35b91zk2oc6yqixyc3j13291qs46sb4wx2mtv0xcg10meub0rbgmn45vzktxb2if1navvjz085jovgdjwhywxzhadtfagqujcpv94y5qfxe2nmcum78y6kbu6b4m642eresth688oyvr8',
                expiredAccessToken: 2365712267,
                expiredRefreshToken: 1510381339,
                isActive: true,
                isMaster: true,
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
                id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de',
                grantType: 'CLIENT_CREDENTIALS',
                name: null,
                secret: '481ja5hvtx18niafjkj8skmkswu63vinqg5dgbicgbi0hodx9cw2ay1quq0n93tshqwjjsttfcrh20bonq7sxfh5ok',
                authUrl: '4oeo32u59t1z9vwreffee8caf65vjdly53g83cyd6nrvgymlj0306zzis5qbuqt6vgt8xnpbxcwlvcboazotui7ujh663lhjpo5llzgig1xr9js2hb5ccz0xi3csw0ttoa37mrogc86h1t87wlh8a7eh8y74iokjfv7z8x4txs6tzevfxo8y5o6lewbt8ixw99spl4phywfw33qeln7f66roditkcoww7bcjxc3e59x8z6odhz0ntw9zkew6193ul00eg2qlbx1goaq754w1jdg9rsg0xyw6o3bhs81zb2taficge3upd8l8m7hkz9c4mjpnjhapgzzjdrydy4kvi4220lxuomlczhdvc3f6vh9jw1s6g85x3fj2f7t2voljv375r63h1txod8e43bkcy5379d8fcs3k647991qgr3darkjcbjo13ciry13yc44si5hosx2ya2pdit9ggzqid4bn1mb9dmt9zh5gbo2nerlc4swie4j3mq1kmd9mtgsy7dlxqfgvwmbycs4fnbsgltco4oy6utcs3fu2qbtw4kikc0nsp0sul34wroi8rgzsikhfio6qihzoymulu95q4ixw9czxnui2nx9cp874ju05x03kl22ifdutvfvw9zhubcannz54hwu3rsr17qz3lc57zetwhc30tqsrxjgnwzv7jh3mh0cfuupjozo41jyiraoywg16ivu9dpzqu4vyrjg0iq361yb79zpc7bay2qstgx9zurgyb4wmomhkbvzam8yrgrv25ue6kt156hla69v59l56jnhvj1d8pafd30ftcr4ky0jvx4mz5djz34jefokfadtwymelrxv0d44nhntu8gd8694dpgm2yn1fg76gbt1ge7wsyqaqkls1jbqp50enm5tpsssf8nc8mut3qbrer0vv02sttgaq4z83esxw6hj66isncb4xss2qz3s0w56u0r783jv31gip1tihd9bh3y7xp6d4hmr0ngv9oe6z76znem4guwl885m1wrvfknkg7t9y9zsyjkc3fwrlb7wjptk4bp2133p7aapruf5khhkwkfflxnlzcryusghw7fspidjhrmyisc20pga8ybv1ciskmdqxacza7qia7w1el8xkn8fdeg4rs6fvtx37nh3690r5uplh41ffgwkkm6eozt36jwvhhcgqmhsx06rw3udsjb1n7fp9hcmnfd8pmzvt9lut2lim69c76t6utg65m256fsjesm3e2gq4lh8fdfs7mobaai0vukaiadovgbif6x48f5chrxelwhimc372u7m7qcs3wg5iv22w7xssd7reulrtf2zuelrpr3p7eg82h2ob5ue05d8zkqxfo9nysty0bl42civclw8wpncz61xvhbf6vu6e87ub9ezzzq6tqkvij9b471hqpomdzyb6xp3ze7c9qehyo329a7g1t79nxoud2r3p9b7pnzuk3tjpuieaq4pk3wp0th5wm8h5hl5m63l1pxkiw8h4l1fqp07mrjsr9n9fxwuryieom0ablujd1e5sllnuunw62un6xusjaaeqrlxh23udye6cele0baq1pzbh0m4sx130kwp0etyj0afjfzw0hkaetx9m5w2e1paoxamhagzjliktnl1lv2ry3wc4i5ez6c2pt55awgh7geeot9h7w1cfcmvjmnslkdsh3ca90h0co8pp8kwuayfuwkkui8jjgp43gbi3nrdyd0wbpzpfijx4q9pfimghx2y2ne6xkw3f7ma4rvkm0t6ipsqm8g8es9ydce4sec124w6mwcuz3tcvyhi3hp7ag07kbszvug2f0497tznyw2jd9eiap4v0xytz6uaio2eay4bkgl3omelrgggsyl7b4r7myawj1urfygircn4m6daawh2uiqlehrx8sfvcutpzi0o0bdxa289bezuws6o8gius2mjzk1ulvgq9ikkxxckd819hm7xh5b23huqwabmico6p7msi3afo6in3etmw0eya6n2iyyxynla5e0s208y7xesie7xmuhkw',
                redirect: '5hs40amvm4a2kdbhwng6gi4qfi294sgxqxefjnn6qeyg4m2x62r353n7cz071giypzie9vloke2ybs4tpglg6ukx071txgkierfwxfhugthlpsh6h5d30qaeyw8xn3c7q2lx061wxtleck6bfy4xf00lkxxwwh8nq7xdj7ls401hgwzvz5j7yr41krxm3ogvrxeanm399g9z04nek4jkmmvmgj7d13yesqguacb6yhe6axx5kiq1vljdsvrd0v8alzzjgjy25u4cjz80r6ubdy6zec18fjce70g4msxsm0usf8njh5n28ipvu0zmrdedwunyyc76ig4bjxd2a0qp715sb5e5pv4vmp361qiwikfdg5znq3dercsu2at1b01hisrnexpucep3laoh114o5ib16lobeqdlzvgrydi129pjj3kzg62y1wm88cp9igcamjox6u2xkh5u03wrxz4w2tbhn1hgme1are3okvz6hus9jxn86zlonqj8gyb23029cbpzo2y02vz43pbpgmkdhvwn3b9fqob7kki85n2onk0x6at897jd3ovr8z4a64y7zil0z138uytyuj3m0k68526buuql7d46fele8drih5dli7bmgi50x5wxrkx327t9noq2vph11vnllf78fjihgh9iy5qa5m0d6fzngazkv6tsz9cn0dreweay5fzaiz52y8snvor4gm142yqrw4kybfe0mj92cafgj7scch4z0lqz932pfad7liyec5fh88sffuftlgxt19i2iofn4xiueuvp9xf2x00ox3a36kibh2r3bthicm8cyaxj4dkz065sp3dyiyyoqeji9ikkb3fhcgnpftvo4sruy07ypin2o9t9fyau09t91pc31d3gbl3vnu44p24rt36kyjsavpbojgbe2b3fcdhe9bz8ydtdlzxn7f2rr1c1vklatvqvwiob8m5lh1c73k5b81zqj4kj9nzb0nvdxxvjx4u6orrygn2zl026b4puwbpgq1eermt3qr1jy75hgt0lfm5t1o8hkkriytg46fuf20o4rt0e5mzca93h9ev47htg7wqka4zweoezyx44api23wc26y5goyuize0ar3nrhhimus2r1yx5psjfw36awlc1lg21wb5ljet9fu1hl1tuab92exki4utqgjzdaben382q8sna8u09iywnmfg02kboafcmisk2qa6e5j99xs39zmi0dkbb4m3f8yiujgx2ovkrpei9j68jgkg6r4akb8cfl4nf18inv7qp3yockv43fwxa6z3hedxfm2n1zvewl98zt9ssor9egasc4lotloah9omb865pylswafl3414zsdj5c3zdehd2pcad2dulgoudcrurybutf8sfhcn5ir9pyabyexpbgh9jzo8k43yhon2hpj2youew3fghf4q29m5frusxc5531ohn3ddyse5t3auqqw6j15bw7zzntexez0hjbs6ee23pduxpioythjumz9ywws20u7rrirr8n77452i222hgnya2tfm145smdksd0sgef3c249ak50luz5m56hf7w5sue4s4rj7l3s4b1yx5kq7yp11xemavlabps7yffxoaqrjxi3mecw9luaf90wnf8kdg4onpd4wivmbcq5w9w64dx8p448p6tmwhkc03f59ubqg5gjwt2d2cwicggnge1gt7ok7puet0qgfuhrf984liysm6kdn8123bqffnumib5g0ryx8o8trgaab3ssslfbvq26z96ip54iytf2y4tlp6k3nwoimhxqo03jdcczu4ioi0rujrz69wsznnw2gy6qq9iph9q9ahl041ri6srm3uk43gpn2gto5hjqq8738fdad2cz10uh2uwwj327h127tgls2q0xod8pk5rbyc21lenvbfr7rcjc9dpnre2yixd9w6kzvvkah7cz3l1z6y4h5ad9unjlblhrog3lqruynnjrpq92nd2orlnpapo3k8cpfs6g0xgv0pvp54xtk00qv6f5u4ez2z3kghs60no6qg',
                expiredAccessToken: 4195139670,
                expiredRefreshToken: 3733620923,
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
                id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de',
                grantType: 'PASSWORD',
                
                secret: '4yyg9n0xdq0cahmwtdv95txmdiki9ikhpt4mv303n6geq7043aaktch2lp2yn528bjbqmo22t18dj1kv2e4yub5u5t',
                authUrl: 'nu14trruovfbqzhdb6hnateswv8zapybrer5f8egts594zsn2o8y2jbjuue5ivshoox320f9i7537g7yt10xvkx8jsy9sr38rnmvnjc43wvq4j2k1fq3symdmz7t9fp7sw4xggk93qf15512eky89ayu0kjp3jer7k0kp8bdzsjmxy1kppsgdaui55i4o86kmaunx1rpx9x6xk0d33h98tecoszgh8vyjl8t9xuy2hqa7q64o9rtgn9rwuz7su3k8154dz4pfw4d7hazfbfjhfk4c2q0fne0spo7311e1gpi49i6fsid5qsk4lncgx3amv4zu0j6l1mk0uiatw8wrn9hgt6n017n2l0hrqbkfx3wqxvs3wzseap546z05r0u4h0dpluuxpc67y2nelz914rdo2563ehy6s0ma7ae6siizuweofssn41ise8z0hrh9voojh0ufksvji3vtynne710jvh347rzkmbp1tkcvmktdc8slqzq6t77liio23ml4geua8rpco5ykbgfnnv5ucf9p9xoto164xyhk3iycp3zly8ew3sf4wzsnzetyrp38jefp2tkldf0u710dcsewio4x1536k3ckpidsd36eae58l0d85qg99dhmgld9bjy6kl0kopueya9xcut6di10bgp8cbhjmkrtludddanb614fbcn43domx0gicnuw6umnu979imozehqflv3diugb6e8v013rkvaja8dfo0rqrr5u9nuhdvtu2dlwibbv4i0aeur5gh9hd3qus5jppsb4tlz7fyvbkw37zz6hawidvoqvvn01x5k3ugie5r3ogcnhd3wkwic7liwv2g4m23j6xiwfk3gpv5yuc1gqmkhb1lmzty0vdg6eiqk3kfazitle1v0j0xij8y8qwqj9g6qfjsdukw8aazxpvq8blj7auwh0i7mf690tgxmszae9a2eqhfk056l8hfncvr4a8xbdj4ed2pdwymdvxp08c6atngpp8fz1uvu9tilkz7axsxnw2ci1stt2x23ybysgrdt4hlxxnqcwn7e2aq3gf46fjq1mgbsggjo7hsr3wmdrgrygjlueeo4b3dca41k6fub13sgzath2n7owcto4lq0cdbtttnpel3bik628e012r44ggvq3bei0kte1rght3fxms35i5nsu06t6k234d0yk47b18g7f3kge4jfji91iqq4yvh2dzsd3hy0jh3gv73xloe9j79833yr40xc7319jax72d5zp7rkqmstdif054jhobyrzvyxolb2yjjyiaehh42mydgk238nxypuuow2khy440yeo661w2jc41wo6eljwu5fn6bcvhjgl7cqg1fh9xijwbxcxijeh0wjf9uyrrcooun4z4csqrfaivfjcqqx52md793bz4lqyn3k3z5dm77ck72lxyfnmmb1wwzpymskif5yj4spr5l2snis6totx0j3vkgtcagdcplid27vdmx57m9gkc8ve1rsghqlnvotfh09tienxf00k1prq61wn1oa0vg3asnj2i30dkfw63oxsdsbvjs2j8tj7olt9ud7zx8lmzcgcvm1psxnzb4d35p9dks53migyfqjbso8aokub5idzrz9bjk3gld0o3zprturwjeh6io8rqap350mdm9zqnqats1g4rqd5vdbg1rd2kaptaku59fy6hrgj9000c9odd83tzpapi8h99f4nv9cd434t2zn5x8t9anydta7a64n97foxzv4267rfco5x3dpuxheg456bl1dbwokuxvdzorztluazorw6jbel43740nu2ugkfjod2glachwg6ds0rre2nw7fm2anwpblrrzjtlwqhptphwdasvj6vzuq9wk47lpqj2lfmcvanfdcncg7y5xam43hq8mjpw9sn9nzv68t7wq56lif57b5c6rry3l2d2potfiai1owweovuy3cxhahlfoj5chm5x9rozu8fvvs443eodyeege0pwhtzkn3xs5jr5nw5wkxdfra2vts1waqnqb77vgwf8fa',
                redirect: '4smlot9djudeid9k4moha9a3jmk9tqxt7kbw0z4aarudngro4sce0z0nkcap8qu9iy9r7oh0f2xi38bqx9epwv1i6bpslcj2h41f2ddh9nvj18mh30ddf9tm5e6afz48pmzizq9lvp6eb7grd3eva6rswicdehwqbzyf5fko4eleipfsgzvgidix24wtldwzeftyg0y8j0j972uu2q44hfp8wut24cueaq2y1cvbfc1qciut9h3rea8wypekibexgudf8luphs2rhjdk1mj4auo7b7d80i9a94dqvr74bv5wq4jnq18q15jf6ud8vtawus9i70pmm6z35edba6lmtlhi7bp9gjd2pz5t1wwlma3n2ghsemrss2bp8qqb5g7vso5d13l6rvi1xau3itubc8h596ujouj1821p6gooeddhufhkrq682ju62errchgddngh1sugedeypw2ikue0x817n211e19uzstfzs8b8569w58g81t00xjx7kuz3t0x21ty7ltyddb8g8el0c3hsq60p2k31lhdupsmr717fgt0iv2arj3603kw4mbwo9o751xvg0gpokn14tolalyjxssz96yjm5c63dfwjoqtnxlllrcanj20ww45tvwt061hr8he92hamchk18bih5127fwt0kpgur6cc0l7x1ugk8881q8j2rdghzkx3j7mvwrsy8m2872bgc1whn5bpw03poaw3vhxuyevmgor8t3342g8i332x89imzof17weg18qhrlxlf2i8dllwzjhkz51c42ruxxooyqcpsghw7xmtnco5k0uqsaxsl7987ml61yg463vatyw2zdkbk3kd0cu7r5kcjxwwmxpvcu38dyzro1qq4umr52dna1dcfobw043xfvrl2vsna5vryol9v6ytkbrdi39qagd3lk1kird9h3hliddt41h2dtg2r6q05t8sme3s7ihqcek2aga8afw3nstftjabjcj2cakzfx7ltz4tki4d9zrkpzwjeac0r4oifpzrudejrwahoelcx4nmi9g3cjhw14h0ckoawgvdl7xot7v81hpy953nsiky8ji6s88s98qt40ncivi7k10dcsd1be2kfhy9y8yiud3p7slxwayh0rgmqszaq5i1s0fjaf5tkw1cuypix8jqq3rkrjbvn8d2smzsdf99ha2j7kpste2scrk7jbftqqejxq0q32x2fxswgc8dzfp1d62jbj3nx40r6dbhzxtizwrrct18047goitc1od0d1ylsulyr6ioyd5bfrk3713mz1iet5vzsphxbdsbwlxolr9wnxeeatj0162j6sgqvejkkc8wgstmb2t2gkb79mwsmefeaie9oupo3zuxnv39u6kzghy9f6iilybs2yqisjh1n0i4kv9rzbs1u967jxzfu6y1w7cz1xjr0soj44sv5lble32pvtmb4np6elj7ewrokx1n0sb9jd6247wn48ifozgxxsaaednmkbiptncch0162g1938ujecu33sdgyll05sbt85uo1qh2ggp81gt1bpl9ykwrgcm5bxf9u18bp5kw7fa69qtmddg1vm89htc3majujq1d1jizcoeritim08mlmjs1navgnra6jxgesowpqeee37i4nt6ztqou71p4gh3zuvyoeav4oc179zmvxlr5xm8nbfuuy0cgm870efrroy5lj2578oezmaan8w1l5jb9x0wccw5vk1bj6ymuc7i3jtn17ae77i7iuvkmnfav7trwnzj6zxgy8quz70tc3unu0z3010kw5zjk1lfnlzq4s1fantad6wr6cgems2el3bprwwzs5kxxs76o3490utucuspjmuslwzdnv9ikw1e4ccjqgsvlr7m0ricbirg08phqlhl9um2jclchvx0ba515d641lvjsct5ecy6t8ri5x8onvhzz0sfb8emvmkps0c8fyczm2jvid98zknfsi2vz8uur4aytwhmsctd3a70mimyzlp9adqu21towwymblxr0e86nnbhytu7e3p2ctwm',
                expiredAccessToken: 6650962415,
                expiredRefreshToken: 5030357404,
                isActive: true,
                isMaster: false,
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
                id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de',
                grantType: 'PASSWORD',
                name: 'nofzsuh4k0qmamfr251m6eea7792q3o0y9jetgar6ahxyc0lmv22jpfdgrl04iz9sclhthwilf4g7y24twmfffnrjfxzdyvoowlj01mu7rtdayvrnttlca5ya9ul235yezt1t3yz3nqwhpr5h227ugil7x70y3qnn3e71dogjc1mp4aj3vaji9yhemvrgpal4g8xt0p8jz0qrqmo959naj71ft3i6oo7ronc8jyazeb8u56tgspe5xlig0sy4pe',
                secret: null,
                authUrl: 'altwff19w49m6n9ey7fp75w0zz1sukwoy2tap0lmd60dsb7srnrnbhtg7h7t84n04wj73tabhcdo0hn6mulvb8b6gkbcu7xxgfe9vxei8i30g7frju3soesck7w6i8qhytpu3qkd8ltp8d2d0sjlvpvowcsy1z0t5ywmynzd2prkqw1c53aa55jiz5b0igx83eq5zacgkuu771bpkkdq70y2wdtlaz5hv0bxapg6n49rm6zq6oq1qyldonxyss7nopswgc1kxtlhglsf1r1ylwjzxrnzxfqpdt9n9nqgrin1gu460bs81pvufhhtb8jcb3o7cx04qx5f8z9nh3cyko2qll2uam5f855ul97jo0q3x1ughj68rehxucrao38nv1gap8gbc30m5jtuio68jq85dr987q2hbwv58mmlvivgqw8ozjkdons0xjaxfuymr78pek3op38l53v1pws6y9tn8mducuy10m233h8xr50nkfpnizfm0p2nuotekec6xfrcwl67dpx3qm9rmgts2u8pdg41mkh7jy5jrwjd4se0kuzygl3xvzl9nhimtqao02nf1hcl5gbzotcss385iog5ycc6sd6e84xcip408jflc4q3q23jkk6fy6a6756vuqeg6s2q9zrh0dni8cyslzfj661orml28h9qxfw78pih5j0pjje1sto3x3ftcrlha2972y8dnv4ioyxuz43ms0iwhut4fxew6k2jm35by8jpvhwdqghiozy0r3qtsjtto88j9lchr1ea6sjn5i50f9fg4w2bszo6d8homwv264n1bawb6ge0wnkhueksbybqhtmtk93py0y51qym1nrniaugyqtv6624eche9ik29xoshmqj299tjv5s9u6x85vmqdutqcikxx98apv23yktbq95cea7ri1xppzt9z69i9ufcxjlwf9cysyzxewge22kver7hv5zpcjdjfgxr272xmbxgiy0dagea94u96mvh4p8ec21ra7nuvj7disrpjg5yutrgvmofqxol1aemjc5nyrblefsjxewvgtfz464globk9vd7r3h1hxjrtx3gf632uup6tbo0yw96xi8xnspejydf5kue7wk9crmpetgi0esqh2x78d4oq5oow0mqdwy6hicikwejxncibely0xmwcm95jdsq3z14bpbj6kwgtmu5yna38oxudlvrj4mbpjrhqhx7w0zfjtod9vekssng7yuaptb04z8w1m65kysyyqipa0f2jx3j7e2ae6tas9kyf3vc86qo8ggd3j9c3u3onwe2c9nrxsqr6ont4ezto1xog2dtgs5wv7433up2w16w99xtotqhb385r9cuttzlr06dbwse0d38meyit2y7n759w7bih9k3826246823vtz5rwz9z8uj02j28rbflpevobljncuzlr6g375ikvmajcx50az172od0f3wy77idl8kkwm28cqoaq4mu69dajwgvqz2pn3965c3jwffe04t8q4m33bmabrha33cbjpznjs3ujpwdwc7dz0z54h3rqlrp7769pgy5lvb91c1nlii4y620fdyyi3mei3dqpgrqlgnwtvtunhlbyw2xfxb8a88ppdcoonkqs14kw8zasdi1rqnl21z5gfazr0tpvqek3d993k3hshuntjmxp7ogykla2d5vdjbqnovm6zf1foeenaf51lp2gnqlor6gvk9d6nm10m7vfn2wlvi7dowfx44d5nc7abf8qtqd3rccnkb512082s7r1eobqx9lglhsdqze2yd07kk12u5mm57su3ydaijdppks4e5pnd2ltso0l7ckuh5fr8mn4afz5r5dm2px4m04igju2kqh7xch8la336jevfjkjfxukb1l6hbj4j10aeckan9j20aq8ln60rwx94uttc1voo4drn1z69d5kdnpcaklosopmxno2j3nkzv92b0q1aedouul7w96e5r7f17fvxauah33vubetug6ouokzpg3snfc2588tfl7w5cr2sarxfogml5ff9ngd',
                redirect: '3kl3nf9rhbef1nwd0ytcma328f9pxh7iniy01bgraahegfzcgihsu2xoloce678m35gz1cd89iimvak8ynhlfsp1k3x53iszxx3nd6j6didmlv1kpjnv3tigp8os4nmfhdxphbro7vwk7vigyzl0mex1ktn8h0a20he69jp8oe9ccshy1s38gol5r546gdhv7yfh3wn25c3aswq5buw4y6xo0s7j416usjky9k0gfuzskw1a48izwjtcsbzv79w2pfc6hkglz70xqw1z5r1alo77tjdypxug0kwgensnmkwu2vjxxq73ftdmc4pn5oieoi4yk7clkamwvfzbm5aze7cy00fow364dp7k8v5mqzz8ykcfsrrcrudlr0f0hpc6mytxgj3gpgywcwld71wkgohm5vzs33sewfpnvr3pierr1kh6rxkb00vm4h48argj1iso2wqdlq277by58eeo8p9f0eygb7xizbbpz1oh7f4lsem7w3w1xzb9nnqpug4z89kki8awhvutjd0mkfsw2q4rk5l5peyfc7kll7v8qbf8qgx0514uctxxw3s3ujcg1jomsq4y47101ltvppqjzsz2uuz3jdpe13vbdky5q3lhzduesm7xqiahp1lu5sn1j4ayyugvzyvigickghthr3hq3x3dfic4yw8xlt3mctb8jeb5hn3bah4s3r0gxof7jet7klf4woxlph8nefq5o6ld45hxqj8p5rexd3bjyxh881ne6c7lbyw91tbj4005n2l4i6gdgffm288krbog2eac2dg6dh848zyu75kdc6z38oxhs5wxetkryzfbcwwzceirn1c1owol8eqhut6t6fxt6iyvgna0czorrdwtj2wxbso0gol14y1deauezn3vmx374rsru0lxuuelo48dzsmem2295tc70r6uw4fa2vvx26hrde59o8igk1ali5i43dafdde3ca6ym9w4bgwek1x1g3c8br34bmleqkj68usxs3m89yo8215u385zywwprt598tegine0xiqqj8mvhkg84kd2b0knctbqfcdz6v8rycd0b4u46i5h4zf53nkduf6es1x6ie92xq4x8m5cck89pbfpdfxdygmon1oazyj8pkmkeu28qpz2qj3mnn8zxblunb0fevmo0msautu1fre0frdw0lcwugybcfsv2qj89tdhhblq2u5eh3r3p748gol0q6sg0dkn2vlqyldkyqlkfxyxlhki9s6i5vii1uelhjtx9jztgpj8rmgfrimwxge77cntxuo8x9g1cfhynv186v0w0tzd0wsqu85gx98debg1fp7m7f96aobwz2h209k0g9hwxdx7em63xg8yc049zkhomhw56i35t2in78olpqbxepms7qqeohmjbbz9pmtoxchjago0i0khg65bqciy91dtttjoxpsg3015lm86fdfs5kjjavblfgmuhbrxfme2sl9a7bk6l2j3o3jygi26mvdnlcs3i8imr7ixr4ibn5zq8dtpcpa9jaxvdr899zs1d21si0awyur1b1v7viaaxww08g4gzys5akcyyc54nnglfzgonvv9urc7nsbi481c9h7474y9u6pnzz88wtk4q3m1qhnsmbs16rwnru6x0sosz3grcm48wu9swq2fuh0zlb57d7woa2xzpvyiyzv3yr5tcmmzf9tkqoahsp2sx5pkkdfc2159qa0nyxgdm12dp5d9qk9hz5p0qio7qxvvp2ydrveu3x55q8zrje1raqsro22tqjq3gc7jex43k1lxjdronnb4j6s3rwkzij6xf681i8a6pao9r7ptd0dkjnerrcie8ug03piwc5j8vfaue4soywptq11qadal0l3ce1ub0f4hlx8r0jjl6o3b9wv3gsazn4gl8rfqoi29e3kmjljaydgusb3yh8aa996bb0adlcelawmi17us9vn1w2t062i2ya7b2hcxulurin6wda8lnwthu4hxkctthi9ldt32yfmrnoiomlv7d64zeztv6fslrxv692syjuap',
                expiredAccessToken: 1554841686,
                expiredRefreshToken: 8335690160,
                isActive: false,
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
                id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de',
                grantType: 'AUTHORIZATION_CODE',
                name: 'allljvnijypnz4mgftl5yvv01saofnpwoq0ddtgccwjqvsrqo93s2n3sr6fcu04ycrs84fxv8brvkdfpthsvqq9nv3lk12mh4upyqgozv9exfzqvegg5rkrcd9qcr3cpq0jcdf6aaq063oqs2b4yewe11nonaz4o0byvn6cbocpyj9syua73f3h5k3a10wrg8vhijlmttklx3urd4ltppviue7hyl1g50zuzpclni3ylqlwhsjizmohjgkf79ek',
                
                authUrl: '85iq5d9obn5e5whcsan651mnfyqen2kg8lk888d2m082ie5b8cz0m64wrp0gkyejeb2l87yghwftw1dwpvxqt6kvxr761nuuhamlzfk1b68he1m5dz4mw2y0wzsivlwbzkyndz14aw1l4a3ka8qvx21y8xp4vdcx3quazuhjf7wvdiknwz737ljlahwyu3f4r1oe2c85wfcgowcmx2ypoidwec011xacd1fva0xcz8zktixd3d38nqd9gcgm1gu4tvbrjl4baqpiz9ubhvorbptt4vurdgz7ll4b9zq1qyikgak3delwf6h08t53fxi9mjtkro0bwz7gt28666gc98e0d30lv9yxpzcih2af4999nyqeeozo7777lftbedgx6bb34hqrzw0gy2buq5egx36312ixfzrehb4ausb18zr8lhkii3oo1orn7cq5al3ybkhbl19qhilbhv5ztkngho7sw6r774hdonwoj38rv3wsmatnfe3nxfx3b98edm5ic64f4yk0f79ju9uo2jsbq8zryvsrg7zj7doerm3dqticsb73aqk8e4jugyi7j19j1elqr5oi2hjh0zoc5xevi46qtm56jmzqy90qi1nkxbdm4xodew73twwdl12c7bd131lo66hvf1y2fxo466vmqpbo8kow0ic9e379ggvb5apx5dvw4ro28ict9zf62femqap4ua6ib3uhgn2ybvakowi9l4dvk7z0a6h8x9tv61kzbri2w2ad2zy0umvysz1y92da8jgrpfa0z1ahdauqkt4bc9uqznzure2fr6oi9gve73esy7f3n2uehx5b0hu30l2ayykpx9snxybr84lfv6sym0jctryhejeeg0klhhzvbun34vk69pfr6d3dxh6ohauezvwv113xosur51g7org916552hsfa6kjve8svmsm248xa5no329ex1hz9tyz8getweky0r095uzcwojhkan6ee9m6t3r1532yyshipreemevtgtfosnviq7x3b1a3grrsl2jkunurr36am17x381xbd71q5z614q7zjmtfsevemk15m4kin7m81cw4chvovovqxpz7nefwlt39ml7ofzhrnrw05mp2225jlhfarskwhm1u9ajjd2f2xo57hpqvgaikur26h9wqo8ntjso4hntmsq9eu7op94yfgi5uvge41w5ebajrvxkf7ygiui6liiby7u2fgxvpfj2yfhbvf3lh81s5kpra52lcmn9hd75wkie7fvkuuibnhc6i95x5410zyztc5l2vzwh6vxhwho2w2pit3nddjoxdkqvzaczbcepuxa3txqeybhfny4qb2mfgzuvs9urhbgdqee2msdfdvqiho9ig4kjmxyg5l90h1r3q3xdpyaz00i5a70utqmpdfl74x5yr3joohert2auj5sj2yvbdq13wp6od5lufz5vd9zhxasyv10it8ier6k0d3xbub8yt8wqr52f8x211ky5c28a27i4yaipve8ksfeylxc7kzprdj0pfpj55iirskkxzvxo4fehr4xnbxtghs8n2cdo6kxbgi9zw2xzwpssloo2la54ygf0yj64heroc6xhqemvs0i0a6yzm14j55eqvxkad49rlfuh128uqq9gtuu2hvmglqhnjcm0k83e44tux6n57dythckl4qqss17fo91lkzr7kgq3i3l4ik4v76t1392waqst3hpa65v1cy3zihmd1e9qkhkqr966qnlri9dsc95t7tecyafwy6zpkczkzntrgsoll1gu8hpvol9viqvr1t7c8h92l82vsg567iqdmbkyfb0q8f2r61lpbyixy67kp414jntyuryly05lthzbebt0wb8rxzmetux2aadz7qn39qfmctr545c83aaa603g54wd3cwlr5xbi46lrhya2fn35tvob985hgf686k7h8sw2wyznvcsp0or48wt01typzu8dfi7vs0xzwcjuow1ee2xoaqzqt359cj7v1i7cqx3pc0zx371p38po1ex48mr2vfe1fn',
                redirect: 'b04lkqmyd3o0z44fj49t7yjw5u2nerensjgbznkry6aqqp56u0uiyu1tvc8f2bouztk1b9h3xlkl3gewdftru5njcvhgtv2w734c6p32sqx1lhmvi1kngtewpgtbi38lhpoxxgyqv8b52jv7mezmoa4b25i4p5fvy1ghbxfy0msozljprrc3dtdfmbv5eno5xwtcfff8q0cwiqoowkwhq57zvb1kv1tcxnj1dw92dckx899rdyw2ut0hw0tn9c1jmqjdqesp8lub4w16trq3dfq9249ova19ozlhew1h4m38udz9klowkqak0lupct8zak7uub26w4o3g6qw24fvi9kb38dfkicbml6e1blcstiy5d1dd1tz20eoboh5j7ab6ftr7j4ipq59saq95ij5106nmwv9g2itc237al4nn8q2cjgkvpo6f5s24gehfqqzctqlej6v7d5kj1wv2qz7wc05xhjry4h70054qissbvcp3iw6tqqff67rpb0ipvdxoxyuufh3cyoqhb5ywzvisal7f142diejfml8tnwuylse1gx9i3kublsks9yqymewbhjp4utwbq583rwyrk8v65bqaj2q6ehr1kziaoj5ejkbzqauloa306ayd9lhbjndlpdo3moudwym1mewrx9fj28bpufpsvihoj0p9du61jder9lk3d0kvv6pjtfj967ch4zgsei65r4tr56j3ldo2oe8qnf5tbi0gjt49agxj7fejg8dkib50xp3ffzcmkrlb0hbif8lv8fw4016eag5gdx5b3j4dnh931ilpo5jkcgt2hyzvj9slrlvo472aqbrv1aaqi2qcc33pqefxn1llldxcraj4mx1uys8fogbeg3500z57t7uqde6831y3z0iyabq3pzkzutu67nw8skv3w08ktwo7qi8d0c1nbx6facp8wyupba345x6zg9v5soiouchnzk5qcmvkaohpcuzthx0iy7bsdwi665xf3w81w5oumdv7cyvo9mg6y7qopaqyv8g8asydru3afuf5m0lngnc0v6fcm1sa35r2zzjukuks5iy2y1iudbr6wnbcrqu9thzw9j8z6j7h6v7ff1ya1nfuui7xrfvd1mtccqf0pf8l8tsqpgxexy8knmx1blex1698q7veao1jq2pvksd37bdohy5bgdxdpctgerrdfj4gotmxp493jludpvy1tekyakmr4v0eutlxzeevjj1cu3ld5nfhfnczjcxr2lsmzwzudjruhn0epd1b9qqws1uup1j3jxbry5jrnyyxhq1332r0emnc98t0sq6rcqexbtsbr32svuf790cj5rctxyirjn2988ltrs4wd8p2b5vpz5qhwjve3a6amxie3ye7kwkhcmkboa6xi5p8eyi65sgy07zvp4usebeybwlabrfsevjel2z8ewvnhjklbpvu5xlyw5r8ytkahdlshva9gtq0esq5vlq7gznf0ke6wo8r6e6164j6772o1gjm6dfa4nj9cmyoccvgsbgkzzesv4nyizfmeyyrtne35n2b5k7wv69z4kknxp8i97k66xrh5gf4sljxda808yv7og2d8edt7zz79l66bvoxmp8htcau2bzq9lq3l4r6bc0azzmm1eek8vo8iqx31bpvzymqdlqedght1g1a79gh3zy725aeoug1thb43v0iw7rrjflu32ka1sbcca8oixwjje00do81ea9dasp9304ya7in34z2658f2mqc1egtbyd5vtibi98b7iru7h3xhk69gld6h184a3ftinv7rguna596z4n3kzwe68ku9cw6yrm0259ke0un8o2o0yhndvqstjvhy314mz1a2jdhvdx57za362lfuupsqtfeok4b1x3dd2aqwv8t6n2ml3573o1k9dm84cv8hnsn61d0yd0gh9b6mevahvjbtlkthertzzitn463l0n675jnzxzf7was92cep3uuaftcxjmb9rgifisjfeg6n3sfkzj8zqxc5enyr4dub80c4zeq2lotfbhwtxwks0r',
                expiredAccessToken: 6898681457,
                expiredRefreshToken: 2790221883,
                isActive: true,
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
                id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'nelbpc6fl1fyblveh4yldy9bgb33rihcgrlzxrjh9czd0xgt8q6zh6tiahnkeanyga1um3ysi2s9if8sz5n3m8jse3g8fcgmj7b5rj6plokuzy8pemqlcz7mfjyi5umkxcb0muheq39o759m0qre6s3h3jye3wvunc0wenbzswa8punonur6qr84vkeivdsr7yep74xsxo8rehzys156h8e7ykk08yc9fektfaynp9uinb7nvjlmh9655vxln69',
                secret: '13225ikfvno4vvrrmcnuck5c7t1cz8mthmkwyxuwh47bjly8crb3mztswjsyxshpa603ythk06yw5by9gh1r1g0zcw',
                authUrl: 'ng6n9zicrdw9vn7zymj4k4o9z3ptn2n8kw968itqxll3sffy6tcxn5mi3z92uq9ufiqu1n6se7c4l2sgqmawgt3t3s0kesa489y6fn64vkf6dqefimi4jdymki7h8ypzf8g21ihlsq1gzjqs7pz8ab9wq7gemu7sbkr5bmyvlhc23qx455rstlvt7mxw4dbnken2brexqluwh6ylzvd8au0peaal8cxt7fg1zeak64z89k0fpshfuagvzlvc73mvet0zaimvebytpnc4ggzhiap3lf1gdumse2nspts5odhqxa95swyokvp5lroxxjmwzrsv71dbq57ue4bq57i1htzz1ikg24pa1huykik8zpwlbnzjlqv35b7bimqgew6n451u7lymx0j0dduoqil8umtrvo1v68cec23hwe7vzlpqozyhdcn6jms240jnpmeaq66qxhfw9g1pp7vspulv3dtqgowwv3gw5g5kb5vckgi14m9a7ojy8h00wb37rdp026ampu8b6o9xvr27e1y8hzo6d25b5k9ox4rs43qekv73nry51oes8fjb0bakdi047hdfnwv076le6rcjw2dft4zmxb2ne7vsfud27vbyy4m20l0pkgk5kz5b2xryqlcqi04g67vp2r4zpulya4irybde2k9vi9yl5qci78wjokqeggk6hq1467cdc5e67h3qo1gm4z2fi3zht6me60edu3qqnbz68rl34f7pnex3xzwjn1m0oyx9yvb5jbpqqlwo7jvesb862hz2lgjm9kh5uib68193cs6ikt2g120yrht7g8b15hlbn0vhs790minffx4y1imr04j4hsf0c46ax7h0qtnzk0uljt0hizlvfhb6f6g8o51smvjzpdh84jxoq6bdfr7tanfhs9tz3ju0lm05swg9vy81s2bn8xmokgdgo5vqsdhlq25x6qsmrncta6dj3iko8hjt2vsmxgycflouw75b6x85raor7rfbxqgbnaaj92x1k25pd3lvy5pbxhzlq0vb2wtdxpzj1mogu8upgffb4349foyuh8c8b1gpgynvb4e8rcxi9iuth3vr4cp4plxuxlwtnfecq9ci4uuoaznkstakfoh6fp42xq4l9yq4gymq0wt3gu374rz71otwobritue3pnlkrd1qc4lp5ugrt45ff2bfuzs1500o0dzzekt095dcc2nw4abcubafx0tfr1ktlrwkufl599at9n0tcpounhl5kfbv7g7uo36a7vwl6u9ug8royqfbb1dcvtwhjl783vbeof5hftwaapicaoz3xi2cby2salc7mxiu9das18p4mlkj8oep50phdwcbekdd6kyls9yizeckd6iuv1zkdbn4hi8929zvt86emvz509yojcyoofgxw39x54mi7w21eego0e8scberbrazrntisn668qn5xzrrahe0lf5gc0pd67tvd6m36e3fjtphkpvegm6i2qelosvw3z84iwsg6stuogp4owv1hk6xrkgetc5v37l9m9gfs8cj7rgvj7autk0y4f2ak4be833okf5hxbg9abgjk68w4zyftug3om8wlmcmrn5ogd9fguv3zjnhttokxifqw2pd08kjt9xtft8chapwkygb5yf21gghricko4cpbdu8961og7lod33emhg5lpqw4gfvnvpvh7kim82r8yp1x08syuicgghymme8ndgp7r7gxil8gadgi46kchodfgsxqfz5s8iiqfhm7a5n6s9d6pd349rjqizi4nqi26w2xr8mk6c5moy3mdsk7o5sdk887n2fumbinjvrlcsinh5rioij6y180htbyemz5612gzjv8qokhqiu4q0cbc0fkd0b8ivq8zpzgdh2efbylo22tb375qbqu5m6dtyru3yhpv60uievzvmbt1nriptmj9m0b1yz2q7y290tkh8mpwtz7tti46ie0e6j0prmlmoblxtylkmye7nu1ec3dfbkk31m79kh88xsllf7prd1dq2dlhfdonmkctd4ouqaqzqq61xn',
                redirect: 'p41jrot2b47ud3losp2wgeot1cw1hpv8c5lxajpy5kij80inrrxr8w4589f6aqxx09akqlmoftqlktrr8zgzlensdg5mbo3etum2uo27uup7crkinrzrlzlyqo4e0xhcu1yrd7nkwzclknr5n85nfwes7s80v7z113maw86al856b6gylgppfjo3ckbex887vqs8q844y8l68qmlxk3etwd059hbc11vqayfsgeng3dfs6d06v3hdnandrr6hz33kz7e2zkct2q5t8m1kphfp5e0m0by3qkoeskx4t4yzqzppk1taeyvdil9l1kjlqboohi0qwx5f0ttn7dhgj6eh03u5b1kzmzxluod8pslyc23aa53dm57kdvjtk34eaevzwxg1l86sqieqlq2tm8vck7x04657fpnzlllr7yz37rieqv5bcly8cpm59drrxhe9zd9bgky3qvj0vp9jacs2uv217joep8t8l1yl51iccmz4d2m1kyrtx947ahwhc8v1hfpthr1uplhcoq11qi2dg4qj4wt2648jgw6d2anmr406mn78zvbrrufax491o5g9807z3fa65kz8bygx8yf6setjknvrvs8z8bzbr10vtwp0gtcezoqa9xok73lqjbwwqf6ts3yr82id864tmrvznyi3su305ru5hp4bi3tj340mr387k625pgie0ym065fbgn3970gb215hn08ze5oearl3cv3bjppxgqdcbrhtpgg7wexi8qci7ced1obxvuxt9yofqzuxpz4nqsyc5ym9lwu1a9vktjj4ijp5xom9krtyfa9ik0viwszb09tmnmazwioqypeksh1b4130ng830xuth6dsbxtt3ip7lvugbdck4yr4gv28uts19du70bkz623u5k2blhydcjrhnrbrt2xb5do6agd2nxrgzae5qxu2l55t69p6nrgtolakc0ax1xye0uu82im0dcew17tmakkpwbg4x524yeynxz8a8exyokv4zcdhlt7i4k8azww4cf1kn0nfzpj1xrxj3kxou0gkqahsc257psazeyt0wb0ork3djaox7b556kv63isgzqtmc5ujliqcplqfhus10wk6w0r8assi2ou4p28x1s603uoromqi5f085o1wnpottv45ksn8q7827bvszcfr5tedip1gv07nra7thzaxcdpspcqg6i2dhevp09jxw7wtiag88zg29f8j9kd9sjr6rnpd4p0mt7xluyywn2ojmcroci13hy1z5z6pdssacyxh6hml2y1jlbn1b1y0qwu929ak4l4abxm8oovx6u2oo2ku93yh28hu5sbzzoeovzt4oyrtqzz08agjmu3nz7ubtkil1s99fg4bqui0eao15b0220eb0ta19nmw2pgfevslu76vccyb0gdcxoiax21en6fe0nggh1381iwslj3b5dlmr00jwi864qo57v3u2tchq7alt7afpr60xum3qn9drsiwlprfiyu52kz23rwky5hvq1h0av82bfvdy18k91jlfuz7xvs60zucpnzpako6edkdgfgdzrozqcsc11pxs23hapt1rph0jtiur79y0aq90ehxkz1du54peytw5b42k8ahuq1wofropyeey2p3yx6uf42enac7tvom79fsn2dy6ws90ik5ujtpstpncll6i03c42wtl0qly1fu6k5itqq0idebux7uwx7ifjqze6xtgbnqq1pwjvi57rslhdcbsh7ts2hi6lpwx7c11h8mr9lmgi19tpnfs1wkq61xgd4cvs51x9a9sx2wovsm2jmhrxcw9n68by6xg3yek40zcljjq9dsdg90yylmgw82fdslh9zng4yb6u2516o4kebxjf6wnx9h21gwl118jmh93um4f5o4sxs4cfoc63w2m22p3k604vpxag62mqj0ta0vin5qfki2axstywrqzqeqk4rwllcmho3btwo3nwqochxx41vyvq3ut5nlzkxwozwp915lpilsm6xpldt5yu01uehwcb8r7zt3w3lrycpzgrp',
                expiredAccessToken: 8298316855,
                expiredRefreshToken: 8587986361,
                isActive: null,
                isMaster: true,
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
                id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'wxtjzzmlm3z9039k9i253jtxebrl7yo9sedwelgv9dtc5j5uu0ocs4tgsrh058b5byz72swgq4hyf190k1289xrgh07md1lg8svskaf5rqdvvlon3rvf8nu4h9e9f5tiojt95h7njeyz2lng3wvksj2xjgmyo1lx8rzxwdq7g4tzxtaup32vdqnk9z48975qkdvwyr7pwyarpxsi4g0uip455riacu3qpe9ki0es899mxisbfsw8cw1dmbmv6w1',
                secret: 'xfk5ay095jf8ch8psnfhykyy08d74zwxq84b4u1kw2k9zsbojmjibn0a80k1mzmrkp8t0ejdmegku13un4e4n2hhqd',
                authUrl: 'nx5asrx7afjfub1lu48131ipwtn60v55c39301xnzh9rzr5ht7rdyq1o86cnxrlwv2g44akro0nm7c95ocqxp3cheq39ddplc851xh5zqh7zimbv6xxqcu91y0zzi7y3gspk3nt3ai8b49bamsg08ft7hbz98xi4gbaealey0hoagu7vu196uy8rwg4y756ozq0w4zrygzmes3opkx237gasro4m2b7dtn3ysy90cc5tlpg651k8t14koc8a1y06y2uc4qkuscd7wdz3ad8m1tenyoy6seactpdj8f87td46tvslbk9gd5znh6826ublqeq8pistythzp3vghyuk5gypf7l7p9hnm87ul7ybuqafxb42e2tjeis6ptakforavd6ootvxvhruzeollh4ptbnuz4k8s9o2ig8dfsupi0lunnycc6tq3tflwugghfwfidfgsnrtia3qbudnhzi12b5pxxlm5s75bqqm1mnzhgcyhoks2wd9yogjq6kctfo4o0368jes9oigt1vxf3ro4v66udvi1nu435ptt975bw1hsty3ysuwixxtirq3q11ftrrn8xnv92n8u6bt1nxuefxre4b51315mn511v3pbd85hbfy364kosr2ja3fvlfav1nlrgrihapusue028xcduxcalp6ngeobdp6ngimq38m7d3mpmz6d574hua3y1kuk0qg6jnz9pjmqkbu21g2d7causyttffvzw0k9z3bg75o88o2tmmzop1anpsb1femdethxo89wfwahx450kp4132zlxzut656r67zrvnkfs83qrq9dlxprlx5t6nnidi7gjzechvkp934g7lswaok57gheqlhfl76mgp85617ffc372ndzd6y5ij8bmzix78t5imhxgjjphzhli2a6jz1kaggr9kbzfr0vbstdhf2lf9msq0w0w1wwzj4fg1fkuptigoop9pzct1pgu59ms8xf18b0iy939rtkk6ppkr1xy9jzxq8d29vu5mnxbi97a432y9t6v122w8ofupvdg2lentw7udzrjrc0se23c20mh5ntpd0hcwn4ydp87rr3ujgavo4e4o5ur12d1vej9lu2842532lq3r1y6g941c2ekyjk1j6ijz70vs0moh0mgpo9q187et82597s6u8f6pylwzr0ctoewrc21ptvfl227pssbf7mi5hc4x5fgmrxqftnlk5ias6rn68yhr00ieaidklofwzigjm8330i3w95dusfrfvvlbyxruj8ka73iec50rf6ytyt2nl3xvb1mbdjck7l2wargwoea624qrib2ti4gmsgrk1l5pibgxspq6sk0m4nozble581qeibpa1r4gwg01d1un6f23ewnqupr61ux6duygx0wedgvfcg38n8e8ig8s72fl2bidcsuilh57k6b675ge6e204x3u5oks8lz7vkqz0ktnjn1ufgd9kjiwxh3z8yldyoit6jmj1u7ycumzjmcttf9ly4hxrw8kwuhgrk7hwteggttuym6hxr4iz26j1gfsxmjr76qr6d6cbi3eqhwxaq94rkeknjnjc9dxts58ebhkpsndq5nzst5trx72y65qoyl28jwdtkmndsxdlq8e1otimk8w6t6rgthexvdply9gbily5z15gubyrzg5ygtf2saq5uuy5tg8yvn7l8lpfedn833jk5qqk9nxa57nyoh699zy2xd3z70en5sg3b7z96zvebliov90dphc6x5wjto13gyg847abrec1n861kx1qjexjr5r9k7ofns6e37rs676n1y1fr8979dho8nsle1y9gylxdzvkes2z4jtjrsufxj4dwz4nl0k3hi8fvzfxkilfoqpla5rjq0z36ihiqv162x56to4z79nqfmurbu67vi5qu7hxwdrepfjl0mhf2yx57wh4ndjvuxa6r2qq1ins6mzyzoz89k9tlt5r65bwt3v8mq9ejim7muvor958ecybf9hvgn03n7kzls1qoisw331be70m3fgute0tpcubk31rcngo',
                redirect: 'f2yo5kdnvrf636l47op50sxeebyi77llwpvxn084mbo5zv41sqdzvhdbe71szqzm47bfeaat8a0eipd9y96amanr5i3flx361cy3rcr8l95iztcgv3uej49j3lnn5bivd6eky8xb5w6khsapf1nsbfkjlp9d3aza2bclowkxk4fwvh4325oy68u62cg06i5j4frxl7yp2b483yuz97tdp8dtmyuiqq1hlm6t9weuned4rxjujt8o22sxzb4j5y9ifaxw3igvb52a1ogbhr9ad2f2v9skmbncle1gljfzhj14lc87hoha3b8qls3ovf6f82zrqw28vbwoat7xhod04ayj9un63swdktkxagur5xdwixkgausqzc06jr9cul74vuz8jmpxf8rvtw8geof40vh844c36j71u852171125aw6hpe9ib126xmpty82qct1bke199ynyghr7aorqe4i8688p5alab77oe0rgsr7k0nibi3kuq08ildk07vco8g87kjuljs7ehuk7zcfawxmbicy3cwbpo8ca1rl64z8n8iwbnu5fo2fm2pva6mlfuyaztauch10xogq2jcaj26ayshxmmdv3lxu9d5eibzhizwlac4rwr8ob0up5jm6u7q7vommi9uq6w9kl8m6o90582bbgoko5gwtlx4akydd9o6awk6gvz1ga18tnkc8z9prnkxxr8x531kld5rgtum09tuxackdj3zfbg67lint6v609u08zxpehvdvi81ox08m07thqae7191awbqbug41pjox0wko63osuifrbvy82qwrzgh5awizm1dht5jb1a0plmfzo2c6d76a6dzyq13yk43u9yyz1kj48gfzdwve0w2t4iljwc07u8d97j4x5jtkunrwzzlxar85vm0n8vy1inomhphazhokx65asosh2xj3ajhsp8ff6v2zp1d0vxaxjkuvcz6e1e6f2c7t8btz9orgu0hcalbduq8jyx0s86x6f2fj0sui8boaoi45sk7tebe8wdpamyhb2pcquponn0v24pjwprk2h1wfqohldt7z7oxzohjsvobu36jluvuhu0yki01ywirgd1k2micz8xmpjh7oor3ee19ci5t768mzukowv3ipxmy82mcqvm5dyrh0wrj85ogjfk1vwrph1nqo0xl1gsphm78y6gzlacgjypckhybocrjvfwsufdzkw0sjf4io41igxlzg3ui4gt1f9nxgi1filai5p9qiehkit77za60sx6la39m0z2t9cz1k17apxqmq5ahn258b63whwuyon7szakc2zl73o4c7jbvva3eussihwri9wkoxaxf2czl794y5y5d80ibm7nvfay9o1r8xkqr4cig3rypfjg4ve4ezl9fgt45v6mnxhv094qzsx2q9r5nph8a70f548fs7tgojczndlcmmr7ft4vib4ylvdovbe6ze7g8bpotpkk1d8qvgwqf0tlifvnkqd10f3h75i8ef7pas4p3q0nmzvygjufx4kztkajnqa6tnv9z91s3ast2r5wfto70bia5at55rxyia0t5wtkl44e253pqzvz1sgo92t5462tvbf4am3c612o4fgnk98fslu4hfvqqp72j2u00ppwhnj8rjx2n2umdaed2bs0hrydh94r667fucvkpdz4spwvosij3qiour4l3j92dh2ct50dcw8kwhyvyh5ijao0u2i8iptduuttjacibvaikx16zn5qaptywbx3w0mdto84woxbryv8qrcasmr9cpypa9s0egh8aub001jq1ottsy2b3rk2t1w6n0fwaq2jirxutlte3urzob28wide3was3ubfaxnipm0j360c1113pmmctsqzkezpi9fqaras9jcneik3v4u0szatz0qp0ibdd14dgmuve2mdb9je41ebw1xc53ypsa5bpz5kwcq6cytai443p0pfmpsh3c0yf69e1rjsewkhxvdndorrp7q2mv1mvq2bmpiwyd7yb72ziwh00rdiykpv0drlc0k04tyb6',
                expiredAccessToken: 6494569291,
                expiredRefreshToken: 5214633170,
                
                isMaster: false,
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
                id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'cl8lvl3dds63sxdjy7j8mxk1digs6wo7l5dl7fnndbp9ij8ekw39zsy01qoda2fwlo26gn1zoqdu784y0igerckjk1gelquq3ytaj5f1izyd4e30ao03xsffglo1vop0hp8a58763v8ejlnkiqdhmz7exuv38qipi3u01kp13npxo4cma3prigygqm56b6acofrrx58l0l7fh4tzvw4ocrtvlgmlsrgiua1kcf6f83kyoh1jnlpm44f6tt4mouy',
                secret: 'tqjvkxavsveie9mew0g6548347v03d80c5k7rvkmg3pgtybksblk7ywqzabilxwzj17jkqg2zfl99c0hl0e1h8ahr3',
                authUrl: 'ck2ysfpt834cgj5tg9uu30dknotqnhksqrh4684c8quohch4t1jz2ag4tczp4r6ub1gjq6i0nkc73cve3xuvxt104db94xx8fzc8cp9e9myla01fbubzk2inxt3ixva4qk7d0z6d5nh3lhvo150ugvzf08wwbpism7y24ypi91c8hwu7iuomxw2c0y9b2friqef7itplnjy9k1d5h6v5w1e3ha506h839uv7goijw9tuy7gnpgsp8s9wud2tzj29v5ykoqj0qrc2svk96b3wh6y6vgx9rzkqecsodzoj514tqomss10hgxlq8iqpglqemotc6s8f0n4ihnvk3pn8eho28i6pmfwzev2hazziycyf1g0knx130p43nzxlq9i5pxcj4pvqq059y8nnn4iwm5qwi2718oh3ch7r8jn9gg3x3mb6buhlkhbxrar7ozgiaifnbbpod75jfs86ilc1fe4r3u6k65pf5dqvwzkqhtcd3c8l0lc057qs1fu38nl106uu4epcd2dnh7734vvaqqt3teok6q7a79ok8obi9k6y94a3m91954s7r6udtj9gei7x9jzapvz8w118850p9wz1jv27yjxqg61fvpmp11wgy6ha6958twlrqs3ucatul2lar8mdcbctmguvfv82tkazlv9k9b97vbjivetenohlm2sdjpy1v0ztlhf9zyvypl7834xq0mnnuaj4m73nuzbyhc89vgrjuhbzwlm6ukaxwkllo8iywk4uvgl1ej5b6ycyvu43y56nezoaf68ppndqvy0b25cqx3gva3hf4j98o4evx5y6ob0m22520a0vd4v6bs76w4p347agw2atqdgc2r7jmy3mqx7be6udwiwqm5rsyzl1bl7vxj53oyrmyc69n4ft16ujqm0a27k65i8qknoailj6ra3hcajsawwv74gbxqigb40l7ta7hpvb1a6yy86htk24eeftdikxigk8y3ajvy2y3aevv9rammf4zb7m68gkfgpxkk42jvo3yf5xptkqyzix7w4f82r2a0qaiowyip0cxmf9vz62chbiqykawf9oj6q8y0sibfyx27s3wmex2zyjfnqtayqb6z5brtxongtdpsvj2un3p28krgmrrl0lbiqws1o95c7ytml8gcra29xnp8fawr5tz9dd23mt8czi04mqpm1g977n4r468zl2z5v14yk8465ocnk86vhjpbcp9rdbaak46v1k4p80x700h9nlsk1rre872kech4k74cevlv82vdvp7ywwsik7g00b0vfqpw08rujumdqj0hr9ux5bz2t3p4caqcxvmcchex1353m5xq7h79j2k8sdt3kelag4v1bcais8nwmo05t8j064pudvjo7bhpu877jyxhp6nor7jek8wm4ldq99d7mzmsyro8u1edolegqulhsp3tzdl2zsz944lxp9pnh830nemcai6iqln86wi8tk42kqeshkqgxgy01on47w7wplej4gb6r7akgn83il100r8h9gzu9d2xzibk72ooy44bj1gqiwkaypqc4185ccgv0afmbmfhrdjn39z4fj8l700vt41i8nye2rx5ak9dyi18z7bi9jj1z5asnbvvy6szekayyk5av8t3flvpic84vdel957g8ksei7ic1eus2deyrgiu0yqb9bwufg4976m6owrtfmkowq1q7i4cnmsqlp5nxk1x07649kleqbmt7xa9j864dtxw0kmdgy6oh4ya5fcb213c2vbkq67lkysds1yvrgwr7pjrz9s61ypjehnkmw5mldduxnds08ke2fq0mqjw9883nkl4csjy2nv0182avtqqeg2gqqkkm4ss6zk6mihh9ieujfr0d7xkbyhrqzptlmd51it9r2pfbw2vo2xvsm5ivybvmyk51oyn2br5uklx46pcksc93fqlj89etk8mty4p2lhwh6sgc6p0dbzfrwu5v0fkuwqagkv4vvbjof0blfkykq4b31v8mqn4z44g18u3ofdk0tutk0orehc45p6jiila3y',
                redirect: 'ac77lad0xe34dlzkopxfo7h904oj6s6qjvxgwfe0h9f9yn663f22m11nkow6wcxwtpvfqdmdotrzyno4dnr0n7fvupklpfcmdhy78yj2vbqdhyu3qkponbtnl85n767xvqzop7jb35ee2chstwtoiyjqi942pwppad07xd8e2m97f1ykskxub5a5lr7lwd08uryp5b6wm0oyu9uordjuxohb0ncbhy6ufkxilezb3hhopiwxkzgcaikoz0d4b80hzvzabg5upoqr79ruzswjzvittc9xls9atpgxxdmbnepibk91t2olhgkhg8o8vx3jyqruqdhjip3ui1qm10cx9tntu7hk5q39uvq4nysih4zcpk0qm00amplbkruz0kif8cz8ktas9h7d8hcp12a5secd0xi7yb535956d8beep4uqaazqljq02nezyvt4w85rtsci1la5t0rjt46bh5pzraqexuiykwk2y9ikdltwnsmmu34b9lpes0e1vy582o5mlucy3wre0skpjxjdq0bygc10sq81vunoqh1cpgef0c8nkqpyzqkvkx5ikwixw30wpy9stpepijy57orct15l4h3nwavm0mr53kohozah96dx7c5psncq7nhr4w15syrukkhynuv16jajatvw1ck0bgmwxuhhmn0w2soyqngvib8snt8l678t3hzvztkd94ykotb25xrx5ezikv50rf34sjnnxzc1axfk4mjdu5ldl3g38bilj6w1qcug4ep4h9p2um11gojtacloal3yvtrkwi4yhcqkfad8q4zmkdg6003e8vmbgb7yf56nwu3xwoqqe5c4iy8diftlajtdglfvqnyoxw0alfgz746pjp1uh4mtdy6lht69kl7ls59quircovv7vk4luu6ppo6w21cbsv2obedbgp7pyxim3d2b25f7w0p0bk9uxd46nop4rb846zl5yl8nlvu1ifbj991jk6nw2izv38rcnwfoy9kex6e8l1xrtzu2jydqw10sdzm0f1lrel5kl9fb02ihypmsmndwa2byoz9lfpvdtvho4jmdqrsxdzzs2wpwy6bdvop6tvyavw3xlzrcvh1pkblrkjiuy3ygd0n5mp38ydr6wpffa6y2zbvia0hfq42tzi5m29u7i4wl7ocwdktgqhidmw809av4be4puix6za5aldgnfw8l5vj678jmgc6yeusbzflve7j6rmg6e89xg6h9weglot8bky4zuj10y22sa2e20z86evnrsky86pw24t8jgom44pji2hqlkby6gye78iplxr4qbektbh4t0xtzjl2cbmqtdc7fxhf2kxgy3isznlans1gnmc150fuiyd27rytueajk43htao84dao2ju4ifkc5wkjfx034lh3p2o7xzzburjx1igdj0pftvnrqm83sai9ziouddje5k4ig3drk01733b96bjrpty77g75elltksb2fz8igdkpidoh4vulkt99bhfogej8nxyxwn46l0dp5bovaedx4wu062olytbvz0lz8zx1jqxofgq6es0ujyhl6cwuzzq9bcyrv2opyd3adcmqcnh9ek2aumryvsdxvvnb6fb8jowuefwkq3dr0tbpe670z9dmhv5yphuxqb5g57p81qudaydbdrmo8jpxgof1543ce6gv7zrrudip27ernbl1byvccwmvxfrs02pcdkk64ntimcjs193dmwoxam1jltbhna267b8c4rnjbjgjem0qedxrr1l0a7nszaa6r2n0x8qo9qldfiba44jaofz628ird1qjvxq58lkm9y4i86b1gpclnkd1ng6tgsubx9fcuugxn8kk1npumq9z2p0sfsfsa30iqo32ht8363ef0dgzxrn8s8egu9q3lqe6e346jtb4ddvw83rpf1qho0rm5hqoda8gsuuixnon0iz9id3tarrumxrunw6v2gzvrlw18atlsdhskcvppcxfo0hnqozamtt2gzgij449ntqzjj5n6f1q41f303t8um2xv5desnpjtcy3dt5k',
                expiredAccessToken: 3891838169,
                expiredRefreshToken: 3629351181,
                isActive: false,
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
                id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de',
                grantType: 'PASSWORD',
                name: 'jbrq7j57dwsmzkxu6gtzpv1vd6155rx3a0a9nrgp16527g9l3ts0ra66nehwg6iogfhrcksqyorx9fx5yijbo2xxlukhpfra2h1tqwxvw4fritm1bs5cl9pnvm8zgqpsf60e2cl8hd6fcx98rqtxv5614275vmewz841k1ih9yen6eqs7np2vxp18xzks4ns7yxn8rmpokx3xrvfjmi5jifad0cfycqaxvbuxd38bdb5bnn9i3ybcc87qaqo22q',
                secret: '6813xybo9b847mjciiuutcztq4o7ii1zk0p1rogax8s0wgt8r1sj651jmeejtqyeschq11cris6y92n9hbryum0kcy',
                authUrl: 'n6njc8uluoce2xsoj4ju1kxf1jzrpqj9cwookdtmbzaqmien2osgxhwslg1tracce5o4wim3om8o71bi5bkif0xgesyogr5ppbtef4hjog439k5mmfq6ne6qfs1tkcj8gn898r21dlec9trynm4flh4emwtyz9phutskn8w6ayb4upta40s4rd0teauzjgqy141kyt6kdz77snmehe4owvvtoee2z4jz61t5d7w6bktjpi3wljxmnpat8erdnt1dwkgm6f6ulcxpsnwqynv0lgutj7mxx1dnnnmqxw29eq5t9mo9r0itnznbi61myt4iazd78hei39s3yw2sgvq1ufbs84seof175c12avdawfhufsgzzenxwngkj45vdbcbf2jpg3157e5vrphjy68ocxvx2dzvocftkfcu0uwggv91g73ejv2any12qesksl9nwzjgu6l9ed1rr957bpzt17t8jjw912ttxhavtvetzo4nbkqfjukgjpe9sas5ij2gak0dimj7i77ugo1pbzp3kk9wvzsbnd90jt292nakemlpkwjjlndd2w4afj0bpc9by6fcvg80tkkwqdrb78cjcma1fsadxmr70196r78m9chlz8rjt5fm29bxk3k3fwm29pbaxo6qwfcksdjo3kaqupyrhhw1crb6445trveu8ic67jzldgifgx2k0owlrgnchkr7vxksm1l9pxdkjv0uwy3bikw7p11egm8lofx74earkhf4w2usp8yx27g1wkizb7y2ukvfrvdsniruhdhvgslqeiptw2s8aaaap2xlpe7pebvc0jtuwcwj85bm3maxbxqqs4f84b591vk2sblxqcib67l5q11gohf5cnpps70er1rtkdm95pw7ckmn0srdkup9img6tg8yudt2nru7mbwaecw0cmg34pt9licqijn131j7ce27bmiw9co2j91lm5xhdp2tr5y19l6lqjoh8crhok17gbxkp47rytalf4f77rkqjihoolmqucxi4s51cxxt63i8xzy0f9bko1ov6oe32snyth7mzlvo1j877l13qxw89izna0iim9f3nrh3wn4gaciw6vyb4xygi9dv4mw50vyg713gbg6p5mbd3nklkbna1f6ribrvmnx5z05fju1atshhc8sdo5fgkyaaranym47z2rii0y5thxecmzpzc1am7oveigo0qaehh7067egzlhti7f4j7qfz7u3e0chhjqxpre0z1cpvs0f8cyqmaoywyw6ns685qxb73ltdkb7fp8onyjyxt57f2pv1di3g1mj2cfw5fqeh8qtw4lfqni09bu0gjuxfj4gqixfnntqhxl3ymqhd0dwz59a4ozr4gz8g3f7fxwwnabgxxxq2ahbnjx0129ujag7xkapzohpjuv72vtadv4hp3h7j88cvovq0nk0bfkbcht42goqcpuc95spdmlnitlsu7061kcdw0i63k8jhry2ts1fec4r0nx2oj0f8w8uxhknpvv84uhyojggfoowsen9r5jnsa9lqk2c0k9hp1zji8dkcn7cqebsbukp955enhv4m1s213ih5bzjjv706gpj3jfu10nhmkjh55nt6ecgq5h22jst8d126pzbwrlt2i5021jj7qiuwwi9dott8gas55qua468r96m5vq06guo0bxcgbojy224u8jy3ljoh8ibipm1bpafxwevi5cpm35dx56gffnpqv5bxru8i5pqj7th414dai4df19gicoxbx0nxg9di3im9a21uqnr1a2bzyu8zbyip7fp6csyoi8c4qa6wsga11c50n33vfhhmrb27w9ypwszcy7vm3p7jj0ogq4fhuatojoblcnuu0be1rumgrgarlsnq02wjktilpizpceyg12cgpvtmmpwwcvh5z0aqk82jild6crpzva745facjiiqyy6zht4g2zs8f9dgdnp7mkkulmzgekbvkphmzrokridxi5t0y4fzmw1z2grut6khlchjhkkoegv08wjw4aau07pukczawc31nfu4h6n3',
                redirect: 'r57hv622wjj78j55ixgmq1130cgpxuvpmas22kf0h8te35wul086kd2voh041u1eyjgt2c9u0scdtb321lnyex7k31yqx2vy7nhadwnu8wk32pnplv86hz7epdxxg4kkn7y7wsv1pcqqq6mjrrctomyr144h644bln5j0kox3bidl5uraeysmkrttmgq5arppymxohll0ch59tqh0jhi0dhi4fmnj26l8mmog8v4squxyhaki0xd9hr1ycrdzklkv6fp08umi5t7i0ekcyelg9i0pu0f3tcvfs2l3u2x558ga58ziu22it65cdgdg24myc53atmhqremr2f9ngnu1zy3jih5jb6buurr5bri6ex4l0t8xgr73wzevj9xbir9ge0c66zeauxsknti1a2duhzqnyhzoacwhdxrx6jhs66u1eaziqrby8mp5qooi6f4pi0km4cglwhig90wtxzgs10l0nt0jlqijogbzuoqw5405xodiuu3z6xrhjez0gh0sbbq85dqgvsy95t27le8oe13b62815vjovkybfqms163dyzv4x3jwrjtbx3f13jsoyrobeqk2hi197e49tu3f8cs99g561e8l76k5ovgrkvdqu0ita6c868zxawb57fdlil1q39v8q5ljeflyvfahahzvqzxtnnwx437570nyxrmv0jksnsl7onkk75zo6wg042fogodrqp3pki75o2qt3srsc3oplssn113mjwppumzqld90zjaxl3xzkpbdlo3qu37107rz66gp2ipvjjyteoj8u33vhdr7han1xpfzvmxrrspgulf3z77x04fzgxxnvr7ncbjkccwdrbugwyoq3r75u1anmet5b2ae0q7zfas6bd876eyzhkpqypln9pznjhacz2y0yeyjeu0gfqggu0fradja24iig8xb3bpyuxpeezr3m66hjdc1npc8a87rflaf089tfj5zb4rrxl1pz2n3u1s7e53jr65tkd4b0da12jy1lx8y1tyifgpt0od7zosb4z9acz90d3uc4lq8twec8n0lpkw1umvfqs737f54qx4mnq8ismu9xqw6jef9828xbm5rft72a2ei8qcyqzgfdkgsd24hblslpw0iqb10uuivx2hign51zwdpx8rcvxyarts0d2jhuhd5dz6iwbd91728zcka1vfqxr0tdewtwcea5ev74kzuum0wh6whhq78et8fur7eh6zq3bsa9g7v1kjckk3sz67fpby0vkhfjkn81sr7ugs0ic368f8lihsjqsaxnefw42ex7j5yqkcyblzxp3ssv1d2qmnbcdviju0nzd5wwk65lhb02fj1fwxeosw2c9iw1kiio5oywfo2r30r4qerdvtty9bath0kwslozx1od9hotokrxotsyqr5y0m4mdwcrj97ujrcswlgf3nuoq1n7ft7qtvcbk9zplctz2r9tnhkhzx5quehuy3xo69d9gdfqbi3k0j0v5ecs89ua2yxrvx28ofs5vl78yezn6l9zfoedxjrdov2tlhywhrhx78zy2zcl5v646jj17vxvsgxzob6z4k2ubv0rpjm8ne2fsvywe2g40eidqgv1w2dysg81pjhp6cldyl9j4982zqv20jtbz4a4l32pocc3mcu6qiabe8q9kasljqzccrabusi107dflj9fz5jnk8i5a2xqofjjt60faw2rbqmuxxdmsst2nkbqpkyog9e8yikp3xfocqctu79bnm8b76ejvsfwx55o1cfv8p6c7uoosdqxt2h8klpaxqhk3cxllijlkrwudbv2sm4hz84xrcpazzh51z20itagiokcq19dj5mfef51yosc0edttqm7u1tgqlr15jynoegj1v4w2mnxu3svwtin9xq2sz501tmdoljasxzlfrz7h48lzvzxvspslzdomxm4nyvujwhhbmby1tkzb4m4u0dw1tzeitpnaenfpzbrez6xd4qw9gu85aefq1wrvdhzfv2govoc8jdxtyoxkiac35i2x7xx83flfmo8emmbnk0tul',
                expiredAccessToken: 2878317950,
                expiredRefreshToken: 3218298961,
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
                id: 'bdpnpgitbv0w6wbckupa2bmniadtga6nyf1yd',
                grantType: 'PASSWORD',
                name: 'aowi7g0twmowrr874iciijtsedc43yr4cqs6gwui4ce40pkadhwuwfr57rpqy636zgualsdvs62049otf87j9xkifgawfb675j1xrt63lqpf1ja51ldimrashynwxw1yk7gdbamaxdtubny21h57w7y3qvysogm5tmeokkkq15bt9auywzu68k4bf07gjfz7jlagnueidujne3qgk7qn7kp091wuwxyj55gei6jaqxp5er6ttab372wfgu0f3nu',
                secret: '5jfogn4kdwedx435klmsqb8k4nqeae82fb4acwvzyuk9cfwwul6umpjy1wnd1nzke52p2q548zzt3hkj1ih9m1m9nl',
                authUrl: 'dgjn2pzysetvxb6mf0zfaclwqov9dp6rgw0ggoqncayxf4p5iygzwl5zerrrbcmxwhb10ae2i2geb86xdptztrc2clphpyw8dy18cytlusi43gfymfr181hpsbpmlm65zj2dxu5jo43dwi1u1dqmdg1gzl41tlwhlafpnswzqwzl4102ob9ft7ajnpss4tcizovfv9ihkcbnz44zycyjwfgpmxfxej6yfvjscgsdz1eewoqdj72ch0qtfydyhmw4m9c180s2dqijfkuuurrjeoxeysaj12g4xvln1wz5m1kmty08qi52d5wxan2drbjpz8k6a86fg0yyc9g2jpr0saghp1eio874ftfs2ry3ii1ubesk2xgyb6p3scsh53e3792i0nv3rukm545ssy7d61onqwej4a72kbhw950q9qq8wa0ionf3i9obinjvkttorqc6e9wn5clr59n17fuyzy2d9c0yn4n00vzpusn6mocwpqb1slxuvpqsr37ii989f2ru8kuy5dz7np6tf6i7ujx3v8t6w7i2ge9t4i816ljltsef0aseto164n71ms0viiwdxiqjt9qy0rvfvepqqnef2xbkaup6wxxtv9kavt1iitepxurt94zu3kysde96506o937soijm0ye3sxjogl8dt228istnvutdw8t6ij7gykei7owps1pkg2pgb8fxvfooim2omzh0ficc6sop02fqeoldpgcl7oz96or33uw8y7cw974mvcq0g3kcd9erm52e61t5giau4twco1utbiu9gumepmr4gj4jgiikdht5bgbhzcfdalafj27k9jvhagvbb7rigc4ka3xwcr1e4a92vu8rge2zew5iza9ooterdq7xbh3ivaazy7o5tzav7pfc5fesoxxdjwuju7cd2gksns8wiy10cswcnpj5fkbknuf3b8mdrq80ctae2185t201z3g63zzdleae268n2l6vukds3g2q3obe8kavdmt86qt5pj3z6syii5yruoxhecy4u2rpxc533eghuqjwhzpjt06dyvlpup0afqz2o7md7jod15au7f92re9tizm2b9v42fiw0mtlrwloz7wyv5bgz5qbl4mveql1f1wr1luhabpyjcldn2ljby1nagl98ep6xxq437seekdwnnrw21fvi94znguuhht59ww6dn30qpwwe4ojcflgntp7vycbi08p8sdctv9480wcdbg4rw0eau90wmga797c8ljjj5x1vxqdugr7izeg1dvgppfr9mjihirp80e660s1iom0wmdtf4uallul5gl553mie48l9nmcxmqqszmwx7t69nc2lx5mhgbcv4kbcnblzezljdqb7frh92t2k6ooeiuxv00xrtrftu7idu69ktgicyqi0k9hhfo7uluolaf62k8tpt5d3szf32279i4wbmluk7m9btmchls9c6ku4gqao0he3xtx61eretrojzjufi6vi0ayfs3h35ku15wucdva8kxh55qw4f4vb8ppbr862e7kqby0nxllmusi4z1j31iqlwgdrjjz9mn0k14yqnngosiprafkqt18jxt13uae9gbfn7p0m8bvah0wq3dbadr8ippbgl1ar6h8ti00be0fx43tu9aup4ehmmtnqiph7hod5tqr29j72kqen4ny9k5xbwa5sgq7hkq4rhynejg9m6518nvs64uvik0bycn0w2i4ozj0elx1aaz7b16aticmelbsvlc53jy0h11agk5m0i2fhq50fjaps74s6arytdkdb9tpof51svdny68q7dp8uqbdecpy4jlb1yl8r6i5pq35pyx0nodwvhipvdfl8q9ml442rc8u5jh8dxgebf81ve0crouss9rib44fujcb06lmcguxuhjbc8fnygvkaovnd1j7zl258wjudoreeyw6a7au358m1tvouxt571n96fb0uz898c60enwx0xqyl68e6qj3lcebq7uxf6str3ln2hjwuzfpi8y9zdz79uzk4sglzwyxcurq3i8arqnk6qyl',
                redirect: 'd6mpcg5kmy5i7tvso3xaebs10k5vtrjcyb6hpj3njsd1taw6f7ozg6tl9oe5r8cxbp4hgpe6qyvgpwti1urdtrhw6rtlju1z1gppo7j5qzfwk0u7e4b99kktsmoft7tudfjw0s93zr921o069d4cugdcc5fv60aw02jacfy8dsjsenbw75opuh7u8rco2ngioorbqsm2hd2ztb9xn6nanv9cia34a168e2rmk41rt2xnlb1m4a2j5c5m7t9etrj1h3trm5lufg71sryjsty6lwx0kdomheu0xn2imofb6eg3jzmgeph5vectmvzz3m00rrqeo3scjw4nqik6bc4jz4p05u4nk6hw919la86k61dohhmwkfvfjxkpigzemhgmo20g74r8k0qftfqmk9eojttncw5gffww260jsuqjp361ax0hdz9ww447ilwnuj81vspv9u5iu9h0oizbt6fi1a072kr9in2d80nl3jraqj1b98qvenn2rl06s4q0szkbmcdccq172c8g2atqpn3lblgfkdb9io8iyjtnhre43r27ldyw1btoxw0bceon7zchbtyvh2n5t7ilt40har809dxlyancjtxihy6tt4gux1nl3ur069s5cqn7bt32qpwuqeq5yhqm249b0pt7pqze30agoq8ryz4rf82jlz08iir7lf6cos7aj1zpjn1vwc0q33szafd9ixkd66werg0uov3e0e97tf2wi2fu1pgmcevm3ck5qt8rwq6myyzsfyb5agpfjm8ghtqnv71ud4einpy0zqcy5xg82jptq2gdc58lztefm6o83uohjbmaahcqvxfhfr5lqpkdhrenxkq8nqvycpl31tizmas0odg6cj43zjpez9dpiihffd246s63hh0vbgs0icmsnkzl15rpuzw0tf6tyaa1vbz9nhietevnnjg8d6rkadf6o4oguv3h1nyhk5oqeg4p73kdyp0a4euwl603yankkv5db9w861p4bl2wyr0vr6n1bg26hpxbpfy8w89vftbqp0yurp7u71s3thsyl9pocptbc27u7e9k6ikx9xeiksqihpzdbhl1tlr3lvjiq4hge7v4vibgq9typm522n7chh26fzg2d74x1nfwbfwme78c21ip5y697r2x1cefg52tpi0nx9femamsvvarrfzmhx0g9i2x48stslu67mhkhltvfmrsrbys59tqwedqloitiocqjou15v8ss812r31gdzwb3p84cl19tdcmxc41f5y3j1hh9z8v8xiuunh3298xsd2iy4e0mqlk8oz3n9ma2uk4024ja8fp4mstq0z46322fkjwqosyv7hcs45uxrido2nhk2b27t5g0w0he1dcbyj7zjdm9wgth6hqke7ek4fr1wqlsesamjnjfj4xov03owkewevjbsokbowhyajrcf6mxeuhnd8oww14b893di51knl9tgw3jt0f2ylq5iu9fsmqdkope5a5oxx1y6i54nzl0fkwefwifm6rpu6zpg7iwjnpjee23ahgvfbyujr3qfv7ma4g1qdafvgid3cfk7zvbehln7qlgqmafx1is7xc0ejmka81babtuswrynf88v4novg9zbifrw268rp07vnfr5d50tch7vzcan7cfg740tc7ywymq6ksior7wmudjbuskkm2amu8xtd6ex8bsloi8i06tdsvlwtxlec8y3n3d4yqxstlzf29oenknq23uetu6oexd2vswfl3knovlspttmm50j04rsss1rnd2xa5s8r637womt0oj0djhdf6f2at5w2628zapakcrbke2id75v4a4zqx0unu2xmn2fretf60gzv1vlwu0ix5llbpp427w5amral0499zdeeryt8e43xtp5kcnlff0kpfj5ff9d1ol43acgil217x4owvg7470bpb9ppwsz84ktuixx9mntnltwk31ex6qej5dq8km6pclel20d8zcyzz8s5md64xwvpdbs5z7lyd0i0mxlkxn6vk8l8sn6mse93p4mso8x0la24j',
                expiredAccessToken: 4458519499,
                expiredRefreshToken: 2015748590,
                isActive: false,
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
                id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de',
                grantType: 'AUTHORIZATION_CODE',
                name: 'v1h11ly1puywt98ogqfujc92wctqbnm1wjexf2yeeosc9mod0buzx87ztdcow4w51vue6xhh6txww2locq5e4a6rqakkr27o3y3yjru2wgfjjjcpsm8q8aoss7q53gnlil0qsr6xtx6ypfgeeglv1br9mgsm2klu9zpqa51x0hieexbfhx6n99jb53c5lvn7wq64zmb6tj6xq4kb7b4eddj35n1oeyje7gwpyy3y8p5yqyq69tjado4emrb2zksm',
                secret: 'd5uncd345luf6c5dhls3n9s68179g55jteow9gntyiacipjd6q7d1o1terv7gpsgg14rdyyk07zf7o32k0rc5b0xff',
                authUrl: 'wl9z00vlz5fmcwtiblv153seooa801s70hzms8qgqahqzfxtq6qke4dhvxsnutcu5j1nijxua7uz5vt74qknj31javt2bc6mi6szhaww47qevle2h07cok7udtmwtlkq1ipwk20g92qnx7wzivx8657i5c0ozplyycf1zpgxr8gdaye7teufomkp1hqrnbqrq1auuh6nyy3ubu6jaskrblsern4p9ylaysmvz3crfgopsqqfyqts4oiipyorwh7s4invr0yguha58cn15r03efac0t92su9vvcyhfxygi7mwd6pnqhjig4foktbwc0ahep17w13puq06uns1kdrl5w8h8ba7qqopx5xrb7fbgyplhyaseexcw8y2bh6z0kohr3bpgqigo5u80y0paq7bd3fzhrlmokcgbokwxivzcozlaeigpx1hkqblmloggikv95u7g4l7a3gerkj4p193mnaska7xdntmyp8o61ef6rzijrdxjsbxiujqa0yw4cmnmla7sii0cu13np95vsa4e7ig1y8vp0yssozuoa11ceq3o544l23vgjmw7hdtgvgwlusmu91bwlg71qzaebj5befprtxrr9mbczy6kj27jkriru7so6h4fkzrxukhacp74lbp8d8etdcoxe48l1ucqhb636jeqvgx593f82qa7egpste0f1843j7xztp47wokp8mkmx0e97qulycal7vmr4ze2prtgsfw4o9gk8ijxqlemyfdji4ajq5zr2ljllwxuvosczflk8q46wuk8971b9r74r73sbbxss1nyx9knp04zp2wpsz177ah26c4qj3tfzoddx3hyvpme6jzzicxhc7hmkesd06jvk3lr7p94c6zhev6h5u26nisqumbepk7hs3zhjjsqgvq5w5p66i5jm7ru1zpbou8vhxqn4j0dk2e3qkxph6y26m3f23wn7a921fz926qk8m6da5j316sjiwombabpgygik96i0d96m4d8l1u5vkoz3qkcgtyorm4vufxncn0l6agtt75vo8wfgkvs306240yy4rijgqof6rut8q7ruzdsmu10reqp2vqc694dxmqlsjpcdse2g3352pnr6fa05aydnf78brnboyv09xjgriiy64793ff59ktxwfxspev1werhfv9nmxlol82q8g00phtu3rckk3uh9pdtn8v26zxuf7jf7rzqsy06ofd19pbxikxgf059di96i8rma6o3k1ta9foju9ua6dv2s7ofleq5np2hn1ajdtd9wyfmqrlvj3uz6b7w9qq6jenv7wcybqmw0irol4t8n5cyqmeag0lg6gw0aiihq8d5mxcma6kgry84exdsynzf3cbjxj0lcfmb5hifinjgxbbtzizld3hfy9icl5s0jrfdnef25shtezxr2do0w4cgbn75mbcbhimld01n8x472tus48xygdaauegwwrsumanaaq3y9w35ldyhaayd92hy7vpd14aqqwnqnn0zpf48e46wvztyzggnc8u9ggnwyow93h3ztb5c8l9070wr12anm73lvd9bd43aa2n5tozful9zo27irtk3tw57kbr7w2y7hbppxzin3ua1x89emj50b9ljzl9q3gxqpkwi4ezh99gnq1mkoeefcimzse1skysov5r3783m9gazxxuuw99pjnc05kwihidq0rmgfoxclyaiwfea2zaxuce1eaii9alw7zujxjum0q8xkb6h1nzd0siwhac82dt2rkz5guhnz3zgjehbobjsq0t5up6q9lgqr12jlsuycvij3p0i77ytwbqjyabvtxdex9ryr1vezb9axaiyvnni4vhkcvxulz5adropdhgur31tgcl12s4pwkpxber6uiz4jck6olu42r1azlj6xgl5lh7qb8fyq0pl8f0fdoahi19dmklhoyii2u4oxzreya7xhgzfqk5ar38aqwqhkfy3vg6zypnnqashx2z7iyh9kavd7ou9n69ui8cau3b6ymojwdt5b81q63q3hasxavhpr3bglozvul1',
                redirect: '8n1hur7nwopbi9bl08mdf8afviek0b3p5d6swzjw0xcbznedpsjkz4z331fd4zseywba2pt68tgy7wgo7moszf40lxej2ughjtso6rlwbvgwnd519hh6uzfw89wd0makvod8jmhm33o5v7wkn48d5fy98pizalx7hd2ltcs8nd8b3anyq0gbb4v3hdp2n2ebav8p7yh5l3hia1hsuaxgadjl39zi2dv7ioq5skd3h3na9a4weu9utvjrnjsajigau569v1evuqradlfbjuq224x2yl9uhy8d5hro6jbnk5111un70dz36l9t5cbkydzsa4d6n7jjljkxjrskmeueb6f7fkn8tza4b306o4vtd96p925ekvyuzqeaw3pudb27hb0phhx297e87oddvsal4yfw8tsw4y0b32i455sh1186qv7e8vprgjpc33idc1n5hmt7t070jzjfk4v95amstqi6sc7kjmyt8vie8ndul4h5vpbh2h9pdh2fnbxxqmisme58he3e44fj7txksscuxsqgjokjltxrirmcgogf4hn673r8bpwrckvm0ai5m606xqfu6fw5zelff6sve3xg1qr74ipwwiamwrm7my86bo83ildk55flxbkq0czb9wxw45xwqnrhisgp2re6n9jivnnohum4yd6jezzef3e6q8rzcvzs0hw4rlssebro98k8qmrxioey7buk1shx79nau5vn3utu72l3rzg7x90hugzn6zfmz0bk5e1mi2oj41xmuzpgf44rjeazqcbnivx2nk5sid15pyivy4eunh2l8nt0zylmoebrbztxm2cjjpjw0pp8fwrx4uvb1xhprzmkgd7e2om8o91uuhv11ktxcbpj67v0x38btp3a8wrze7x7bpjsx4h2gcx7c6p7gs6ivfqazi6bibskhgvu4n29bojo0vm2gejztmbn082eldhyc4412lk4s462hixkakyu991pl6j9pwylfooplro6x5b27mo69q2207bqb8baot9e8ngeiaxvlv7r6liyicl99huhf97z9fiiu65ltmvwsr4grhqm5avaka585y4wsq2rizvaqqqjnxx1warm2x72bffy5ykjz03c1h96jhd74nb0r0o339yfwilchruek72x0tymmh516pan6aw2dagtyhnj84c7o81i4xm3thmnc37s3nw8drxxiwjx3d56qme4xuqk801ped3nz7l9wt3bwrizucy8x3onbqb6eghzaf7unzqbyq09qcf62zgj9s1asns0bngjymy3zxadg1q6uyucw6kzs5huopkv4xc6iln5l5g1igr7j038wxy3m3sb09xarp1r4vtolwuvyrsm4egvp8loycmucjqmcmafty4eprbfpejsodvjn97awzxwacmihfafn7c38m684hll3xcux7jv7rpn631uciqanuoinkka6trq85r7kb8ibcru31qqc4jbnisrhf1mdqvyztd6neqwe4l23mgsaxa8lhhsv2jo3exg0kr4r46x16ana7ua3sl0f60o7burv6dziqrwlgj8eofe3uvyty65jcifm9ztarozre5jonwzapzcsl9u0eo4i4captz4u06uq2lr922s2jz4ycz94k3qq0wn9e6cmy2uv74myea0kaah68gn4ttrln92fekligpipufvaj27a7mutdbz3fvfimncqgfrjw72hem3jx9i9cvd9iyqtriw3ky9j4x88xz9yaenyoqzcxknusd22ha7cvgyxqzjuu3kc338yz2siy169zjwx2erjdh3w013l8vtfnckkcw9bn6qoiqt5wjsr0skf54zsh84pjllszpfa9ebc54smt8ru5up45eos6tjziqo5gc8euwmpy6a920kbkhopkdvnqwqetyu9xpkefdg9hugh6kwryqhucazlfspq9plrcij3iwxzs6halivb51xckh0j69hxaw16h4mnwt5a2u010qwx20cgq5eaymesv1yjuljmviqq5r054ape4966c50sq4mia4j40rd7rof',
                expiredAccessToken: 9742642689,
                expiredRefreshToken: 9885661185,
                isActive: true,
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
                id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de',
                grantType: 'AUTHORIZATION_CODE',
                name: '0jkl2hp6gi5agumb0xbtaq8vmsh0nfmodlupd2nq1wph29ncopd43n9yd4wlto616ik72ru1a1ia71jfph5ml0nla3l5fpgiku48qv4zofmyluojs3p9zr9feenpbxhd6gk80llfihln8fga5ctjxjqvc009k0ozhdhqf7citbw810jdui98nl9qg78kfbr6qxl8zhosgj7i6govddiwgm08ngeftsyuqp4q69yx40zvup9zuh3uivt8exlkhuf',
                secret: 'diskh6osvfwpker2p0k77yc7bi231cseyd6yxo6ybh0ll0ghion5zw2a43ivyu3dlsrohj6qo2k2kolrr269pjx48p2',
                authUrl: '0yooeatq29k1f8wwrqz0uk80xbqowqrs04zm9a959wvq6ct98wjpdk6eclac7jpao3fv0hohlpilo0i7byziz1ugu65dm9s38oppwu5cf3upgyl7c7on25tiiq71drla56gfokz0emgzqc1veyq22jgscq17lun3xxe7v8uimqtdsr7xnfixn3rd4ivdcaohlachffjaxgrzxbz7mgto5jbmulcktqpd19p0fa2qwp3hoibdhmzm0pflksyeb4cd9cip6yairvtu1dyl9tresoh34ubo163fda4wng5c45c3ia6z3fpt1b6tes3c7aa4ibz23c6o8jitx57yxc6ttelx5sis0h4y0kcsbwz9o6ma4g6kakr9p9nvi3j1l1x8oe1u31ct30s2fco4chx1fnug8iontzrxizktbw8b89sdgg34w5yvozeio1ql8ewd5et02mv0w43ohbocbqs8xkqoqzlw77p2pdwnxwpaunav2njg6ctic2tntoajek2jv23xa0z24idoz9mvsppmqasuruiq6ouqvy7kfbc3ufe1n3cl6xkwjasrqnhq322qv5ccoql7dv0j5qz607cu1ph558fnl5cx6zewnmqiju1bufbwqj5upbxcysci8fi8wr65vfwlwsfbksnmquwf8wpcjiglz5tx8zwq61rj6tkojiejyagk3at55z7f6obv0gtb38lswfdhpr58vuu2g6lag85p4kf3zazkathudio7cungyin1j4hix5b9qksun0id0itobz0ei9v1ta0gji658hraps4twfck5jdfzo0xh04d70cjrfddll0zp78elrk2vggo8gkk25iqu6gf74i0yfsx19y3ppyzu4ass7ukubbjq0x9ml5zek941ykyyv2ogzfhhy85l4o5855t90teyc7kf6cl43ji4wo71b3xjgk9bzrw3i2yiaqnszdlasfox006eyv8g3grdyzs8t33bdzlap6oerxg7ivdrwcb9t4jem0swj13rzshfvj9ao91xxcdfktahtu8cafzmkxsl4tvle1iq8l8yn0m277ekjbuyt3nox9uhklwuzd1s39bdkbbt77p124wink7jlxxjuw8ahu9wuseayy1dd4mfk01z21uf14eg9mfskjo468ka6vw9z99x946rrzi5mskvharoihthwipdp6cndbfroxru3y4cpczx25sf23telyvnit1ywo0mrsy4jrjmaqm5bcwmhm52k11b85p51d85q372qz7cus957w52gj1986spvpo5xyex5wlju449tcfnlofpw6bhl2xvjqshchzq836m2tzwwhe4514kg1rwtbjhdjhx4zx7o6s73bfvzcyedx6ne76fl9j8xevxbm92nx8xqbdm5kzk3575jmv5m40qzfeqiedehh5tia5a65xennb53259rwk7diftj8v7cd3lalex7m7xh35w29fc8s9keyb7w13mhgspipzaikyw3f0crjmgqsgoamfmsfcrv3pp406mvfw6gmug6q0of4c96xla6alnipezfkxwiz28s2zrumvl4odfdh9qcbcxf5zmpyjxprlrbcamq1mr7496q9wyy3q7v2h2wqlbbe6xb5wfjzf81kqetudhff28dsckmquddux950tmq2caoik4y3ck227cqq501uwwgoyxuxgpurekj73tdr2y97e7dvldu5pl0pwkepx7h35lteha0jxq3d21r7gkq45kc81u7zxqdtvvdd1zi3btysd97qsxks0sy0c2l4yk01lufzljwbkqm93ug1wx3em7ueydvaueyzm7xeh1pd8mnbz3kaceu39weyl5hd08ocmovt12a7g3p0hm4ylgy0eaodq5qdr0edjoqog516fskave81k14roezs7ljrxyp6vnktfa6o63x2vd4cfn6sjgiic7jau2udaxxz6ginbvo6gf1mcrbcvzh4eyv4438bvkbghlod0wwk9vu0fd3qjz7m8t6lg1r566gy0kjf6p1clf7kmy3awox8ok6iwtbp5',
                redirect: '2xkyxrzfc0ipg52z7yudipfmcv3o7il0q9b5ut7yrro04jdkzlk9hw0068llbp4630dxxwascqd33p1o2pa4bwrr753z13h7mhrugdle2rwmbyqqhkxbq33v9p7sycmvvll2nrhz652ka4co2qd6hpyn06hdue9wli692ztiryf8l7jswd62x7jckryhicp090e1kb2c32443pk0xbbk321t00qne48zwthacqcfw2jqn91io9qvc7uunj3vmkyzhnuiavzqmh8ww0ry6w3ci2e52ojalbjke3ku7xakcfrtoaabnxh4b51x8c5w5oupta52pqz0qvb2yk5uiz5d8ddfd5xhw28g1j7uxkycnypd22de77us63nshgd3ik7p4tgu4tpbtdtd5nh0hzmqyqh6k4hhbwd71qexy5iturltrnvuay8rd6fefhsz4bq1qdtfclbbiafvzodu301yunxkszwddk5c3elsbk10sxr4wq9e3epjrtid063j4dim3zuowko4mtx28wq7yczp00mdob499qinylswtoq4ngkf41jver9xk87f8uuhi5dlqxojcppivh1onbeitluqbq4fm0len8ujhjz9p7velltihdijojr6wgfpses48htb2ruim5l35d4283pzm1ptvkfls9y8yv4cg3dste602ucuy1h143jfyr92cin37gj5gqrfbxykqij5itftyzu5pdhmh9pa4kluoalyi9rss2grw83ar2ogc3dm6fh11jc5ru69y3yerovise4ie8v2bmkkmwz3yegd08q55rwcbp7yykqkn2dpnhbwaqg5npd7xt4lq793c7346ldi8ks8xe8ywshfw2n4ow7hmgifwyg9u95l4qgh6eadpwdp21xvylnfofoffndw35em0bfyfw0k17a0h5zck5zb274inomr5o5cylr931urdti5mljpdi6168lw9iglhj169hujxootvuc8lechgxwh40219zyrgv0xgoqcnfrzd90a60pafj8h25ziuuh7wey23s179zkarqwu0lpdd5s918997ealdlxif85smzia3ydjiltj9jqknyhm0xwxg9s5dkpxw19wxnj2v2b7zuigkbrg3u4uexlqsvrk9ka7pizh7g8s18w3kw53ms5ralr4het9qfcpjiooj8lfi3ztae01uyj14uixukgu7qfyym8bcglr356835m3dba3v7o6j3y8czceoico6rewj7bnhak28j6m96czyzj6n3xrnd0m15h9i5ll8ucni0j3hjkc566wdpay7t0ebjghzbzo5f1vhn8lh4ioyn220c1nkwy79pbpvxy7gmk90m0f8dc6ophdy4vkkdsdqza2uwhsc0i7xc7aauy1cgy7y6mnwhgnt8dtpy2qw8nj8b2cgrgku9oidtwzgj29kh3f8ggcoa5674gixtg7x6vhyd0a43gugjgjmv127sywjkdtxson5fo76f9xvmz0yr3sdol0g9hhjmnorc03khrshlfkwbnjm4vptfvn5u6sx3oopvspcceyrz843ehfhfyatezggneq68gjm2riee9p0294g750w4d1gb275b0o6ylr2gz4y006p5r9jq7t2tisxywrh62fvutalr2si8141foxwtdbsoomu7bt97j0obbkz3o92r7d70jj1hkozlu7ueh7jl330h6mowuwyutl47o2jakbdd2h7cyzvoebdkh5a8aio6j16f3rlhhhb34s5egszxbcl5rl3honwhwfpyzc99xqg41djkfotjxhowebmzz1832jfy9emy3ymj7nkp4uyavkvmmm7scd921sxn50ql2dtj078a0k9aok9d0edbp83j9cye3idu4n0ux71m533y4yhhvv3ih75mtwr7cd6mgqghhdsuxlt9vb9zzleeirq4up4kue4xbho6eifmlhbc35eqis7qc0m9u2qho5fspt7igigcz9o9y8m5pzbhfkglk81l6iwphxghij8mqhts3rgn5556z5bg8fs27zokwrbcdw',
                expiredAccessToken: 6593170680,
                expiredRefreshToken: 2751778163,
                isActive: true,
                isMaster: true,
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
                id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de',
                grantType: 'AUTHORIZATION_CODE',
                name: '9zht6sdpgukly89r5pp96t7p2js22lr7rm4jqhjy3jdbidx28zlgygllmsri2zqegt6j5no6p2v1yxoeo6oqmut4kww7s3479a4fqeyw8qoi4dn4hr8dmsqmnor1t73jvhy3bpigwck94t1dxf9deag1cf52dpptszpj5rjft52ezovk2x0jee04iucfn0u2tzmb58dd0idiz5csxfhgx7shlfyhl9013rvfduc9j3v2bmfb76o6eprjrqe63ls',
                secret: 'jp8g36k9c6wgkp2bt2j9dqdrfcz6z19dlmckpq24jqg6zbxgh08x46ml7lk4s7b63czpxa59hfc2n43gnc6hef5s6i',
                authUrl: 'j1r8o26gnwpd2uq37xk3nc54m3om7idodgnmo7r5h4d2y7310yd6zpbxcu1sam136vyly0km1sd9355qwsx73nq3rd3n7nuatnhykb4r5mv3nz1411kjggjy51qk7nf0ggu9x43uwjme6a8knfkclb0af5o5cplqufoaaump1hpozrin4kz0c3bp77cj73a5uqt6x2jbs2hgv8j1tidqy3v5v0p4rybec467ioyfv593xukei3gwhkxn73xx92y7sq0av38ik3jzlpyuyl7ehf4z9vanzhdrc085wydh68ms1tkdnh08azbmolsw43mxq5f9kjnrgzuug0epucphuvz5npi3cakagbmi2so9ygcu5cdnsqzsxs7eex5mgs30mbu7eiqjf4y1kllr6tqsur04x2or6s6nrfvhn68z7zc4mjz8b8d66jzbc0bgmgnowt83bavk6m6rfj6zcw2xiwjd97l92b9boftm9lllaart8uki5ncqyhrfr0br0wh8p7ri6j0v7bi40p396n8a2oaaq9m1bf6fa2oe2b098jtunr4gn5mm2jrbsgyvnoixomhzgdi5ut8zgh0k0a08xfj8nijihz1tuitgvvjy9pl5hhz7ivxuufstnr8fj80ohiqi2sw07qr844b0u11h2jyw0k4gi8wm90bg67xssjzhefbeydgvsye3ipcl0lx12xwobchb1llhupr83hgr5weh34jmy56mascj34liemcvg0v1hii8walmzm26rhmfpa7ecolkedohdicgm0lkdlpjphqdm4sdd5cbd0uzrj3ziufx4l8in3owqocffb0d82jntrrywug6wfz54a4mj5b89z9vqcwfofhsc9aibzl4nqvnmrelf5qvknjknaa9ie76u8sqfus9j0wrivgvt2o54f5jepdp8kczjnf4byhn6qh8xgeqg06stqgg3jlxmfc8qvoofhfvju49jc415mt2dxi0tkuultp2qvrwx39bq4x653fooa7ixfy121ehs0377726x1lwmissikcciyob3rn363ia6yoh3x63jlzbhx5jh322s3t51ngvb3jbz2t6uszrlphq08cdnlhiflgb9hb6opyr0xyhsenhk98vw6b1kq4f0gusmc5k241jjdlobmuwig5y6z622miw1sm0w1cwp39rce6isua9e1d2hcsqzw2fg7f2z54lyucjk102joicd6xies0rv63hf8xahi3vjmrgp1qsox1zwkz6wf8bfpssbnigrrlu5vpjonasauqhtnjqwdes58zd5gpgn5nwbwfn9bqh4zjmix3ygzbp82u4qgkt5wg15294g5aamhbf9asrvogt4gxs9o5unaysymu9j38tpds7edxkn3z1261v9zc4eo4nppdumm6ewwhhih8xihtvo3it4xxf6drd284d0mfp6bks05z8zg53haq6yhmw7sxihnihhhyp1xhklhi5ty56qfx1tdrldtm9esfgo6orvnpb8wv80m49o5ssmpovekmpxt1a98dznbl3y8h8qyzz9n0d87lcjmsnmhvnd96yp9f5k5t80vhp9306ackly31fn85p5chq4a41n2ibxt3qbxihnnzbfhxsa6oomi95ard775i296nt31zz90uzo4beusuesx8x1vt2af6r1w59h2yaj9dqq9k5aq25xy827zbt4e278pov7chyt9q5kom52qbaq4k2ldxbf85zhayi3u5mjyyyhgqgicvzrz2w1xiq4pizm3a4xp3nag9vjw1jcjudjaxd4lmvabrcb2b5ezun9yfp2dzsfkd73rm2odwkn4unxo9uw3rhpny8z1awn5tk0mozl1z1fsb0knp37r0iplw86gtcfobmfgwgwno22a1xg437zswa9xozimnkk7n9wh2wdlsp6aukl0690rnr97hi8tbzetko2igtzh1gz5jnrrlv0dcf2stscn8t462ihgpqk9oz8kyuaais6swmxkc98gk0oh7koh2fdl18bupzloxm4px2cuecpjqo210y9',
                redirect: '12oc7ldi1jjlw6vxzbymuzhna9wcjodm4zam3jh339h8hc6mat8j1lg7ctr3puekhpalp4j1h45bxhsj84sy4darzswh8wc2pxxm7rmbupjdpj02t206fr0r4tf2jd8fa6k5515eybe5ov9pzt8dm3kxdhq2pepormhj8pnbymlb4pumlqaweamw1qa88cen8vlx972eekjc3rhmgs3p9w79ashn2kyj4oy7jqhfnfiyqynd5caj28xtlblw55gfcz2zr0iutklc77ew5xubsv1h32tp6uetmm0vst24bzhtvcuk7qywkirvmaso5b8ysp2gi0gtksfiz5ufodzop46sq89lpdckshohihc97zmrvqzhbdziy75lzud7j8hxzkyp00gynqcd93rj4c9gwk68aadi84m9xlf1au0et3abtcewtwpjoc3suujx07c587gcz64kx2s1iyce7fbmetqlvsdaaxncor4cpx2q5p2h5b7j3qo2d06u859gumeket3jyv4vckgtvauh2b6wav0jrbt65qkctxt02zxcxffmnlpp0aezr2wei00navjddomzfg9asb6eo0i8h90n7lpykgbdlm7rj7boo1g98p5d6j6wtqqxn5hpxwe81paw7gto2s7rt5r9nnzo3qaqn9g55d1jtemgidjtrt9sfabspnsc44hxkxsnicjje48gvgcoa75obosor5y6q9q37wx7jv5i575k99ue4nzfsciemhg1hyg5e8jjikm85rxdt7pyhady21exapxm3udds95872x90gxq9dwbusf4cyygukufika43nuxshc1frsait0l6k9zotzl0srtqr59wj79x49fuw93ew8k7do43kdc0obxgsl8ybe01ppnpw8d5wml749qnbr8vcfukcrkykck9gwkqt4q03moxnzozmxjg5eiee41giz3hd28ip9n6km899tp3eff8neuv3ali976d10a188ibu5nheq6cc5ruqp3h33wlalk77g02u0hbotozhkfno9ectfrc57zv1jdxa2pjfzwspnrvfc7pvirl4vlza71vi4tqhcur41jwwtxny3vru4a96d0wco7rfji676w8iyllhndik5sa1bah3ixxqre0udkp3qhw4w9esk59ul01f7nks9rphdw1rn6cyc2rgk3eye6hnqng4ddjb012w532cnm6urlwv3iq3ls9vcs7rpaf8lpdoxbln2ffs045htd27i8fxe00bl5aq25esv61oyid5tzpdvxx221hvecfj8btxkkbb23m2eolq8okvknl59wwpy0a21muike87hjvjtsabdm96bcuxw64buj7qjvrdsmr13gojcxnmsxex6fnti1k1tudh5iewbihlfn4t8z9pw6h0a85dqadrsj1q1hoy0kcjln3wl0prplbvvnpbzluxmx1p4ihgvrhpllx2t8vou4t4lvtt6tzeiy8ulzbsal4hh7ic92h45ktr2szfryzj34n42djd4fr5j2dpefevb7onsf2ty8ui18usy3zbotgel9pmsi9l3tgzzvjfyu219qyn5lctm331nuuhnhro3i80jeio6pv2wit3kchl2knrhemazgdhdqfxkcpejhtp76i6fp9gk49zakawer72dxi1w9u7jmxo4cmavkcj14jinyukne3fiu9lyrkeegj19b0hynaxhutz7jx6aagkn7cefssd4chdssrk1cj0drrt0dvj73slvmknp6pzbghbmrqugglnl8akgh4ihwmzn03937pvy8t97k6eyo2aouqke3an1edm9aoa0pedtsse88sbrlszylyv5piluz0mdnsy7mrw4qqn24w27he4i821otwflhuzlqoqt8q9k7n7at0hw92jdhsfvaqtrsc8b8l4eecrucopbgtbnfj0zt2nu95o6xx2xbjymddxiq9sgt2uy9oco1kvxs0glmcr2uxh16oo04zckw4nqhh6uezhjvisym1h62vcx5h7qhi1xxc74wzkypv4hoa6cwamvu8h8n',
                expiredAccessToken: 8258348929,
                expiredRefreshToken: 1373331759,
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
                id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'uyaodomgmiq5u86gd1d31wwvbi62rk8gazuuxmn2a2ilf0m1pywag84e74a9it5cd88wv1ujhez0z6hkdudufpli9bmxe8ivdujimuu278195msfn85svk9suapre68dfddtat1tr18zj8v3uj5um7onjao74vzbsx6y72vnmsitxc6w22z2ca5y4q87m8mle9nbfdthi4hxru6uxyh2k9ofwf7h0obich806uuyhmvsjzjgkmylrpx1dlh323l',
                secret: 'w7g0jjn8d3izzsnr0fk669pvi5lfu07ef8ag1e26j206vby3yfdtn5g4v3kwv1cqxh6sgyg307tppvxy0kmrqjq8pc',
                authUrl: 'tmckf6qssalnasscd54xuh0l2yr47c7nu22yagj5u6inu59z4ps93ovlc7h8606a4ulyue402za13l2973jwjb8eg8v55f98aas61dh8ihkcoyuesibe4eljqlyf3bqgcpub6twpahbskd4crqefdfifmj01pijedwktts7u9m1c1rjx4k0me8jcd1dfj3idcxetbbwwfypspcz9qk3eze9wj3es6rovk7oh9i6cyd3ido0nkhc9qqjnc84nwa4x0t6z80od13tth2k8f707s25ffh5okmm0f5bbvmcc6zymaks7rq8nuj35i4q8sz22cfbl2hlbetznfdoolzqqdhrbj5wd561e34x4viihlkrcrgzc9ypl9smcona9mkn9a5ep45k785si7vzim5trwlu3ik7olr3cs3dnzzkj747jpkdd9brbvlzxpitzi3xjt2ltei1i7vt20wy630kwclheg6mpaa25vazfebr43g8a7f3jajc0mcxcgf2pxy8ho4enwm7fa9f264xm8oqgsvo4dwzi0wane4mmnvo73r66h5uo8lcxram1w2tthdg0z2fx1h3x9oqmumwzitrouhu4ts9rekafx8o5aqqzteaowe3di39we7yu2fwobveq7551n156l96hykfj4czomjtanonyfi2uckvcu36kdi00kcw7314uekl2ic0r3bsqpo6m8t3l5gdkarqmtkdsb4bjhfzsgv8s0z672osa85d0x79zsbno8v6thhgxn7swgce2erzv8oqtkrrtno47ghaofrlyq14qx2ju6t2ojm4qzl1w3d8wt3eep5huz8ayio7aa8xetzejjh5yij9cv262nnk6944i2jv3hcu0v40tf97jkt9cxi3pn41hjepwlfpe8z1eyb63m8g2s0te6lzq1q3y99defyjdgworbv9mn7wnd52qbr8jvlcd5pxlf4o1v4l8dr1q2a2v8o4e696mmwvekylzmz1nlgj8i7gq5ubxpzajq619g6zbx32v1m4tsvdg9gggqrofbesk61hr3skorxr1ec1e79hto46wub6th6b1iftz3a3o963p96s1aqnakxyr7mu8tv2dlmgy0djxpmzvl1blu8d716oe9db9keaa66elp98hdxcom5exvfuepktgga84ret9ptuditfxocy9ojkth7s1bthno4ftba44zbvt1r9szfrpzf4gxw04cqnd6tymn18xg25bi7rxn0a69c28urzooo79mro5505z6vshw69d9rot4z30yj3ffcake6tdvj2aa7bhcdxvbyltqlxdewpbvf3lajk1y6tx3hroom2dgrh0x177ph9u6k3u1jomjl6mca3qqivfrw1445bp7sdconhtep0s57ciahv94q4qclyi3we24fbszzfh2q01ptfonbhkmy4skp2fgcmtqpqkrkzji8sa2v30u5u30yplybp02guhf5tuqmqc31y7fnxupbaqyio85mg52d1om1lqa2c4xemy4f4f6hhfreo31ucmy05kpkrihdt1g9wamw9n60z2k3zegoemtatmzsq58l909qek4jq4yoc6of3vsttblz6qxnyrl3qh6c1y9rmt9l57c7hliwl4sg298jzoaniz7ejbejfqm00qp6x6sqv4vv0gsvwkjw3t3dyir7h8gpr8hzo2j1w07js4eyz2617864vlyrqsga78odloi90f5mt1v43pebd7em1hvxpotxspbmdncrff2hj11vq31bk81bzvzerofjahrypiloleslj7shup8tqn5dvwm2lflnqa3dwba86bq0hd6hoa8inwbd3amq99fq9pjhj1ix06kyezgzifjogz4cs27ikcx0gcxezt4iub1748roubj5a5urpxq6meqnzp6p30ipfanbgcwjeo8i3rd51rl8jw6m2sf4y10tljnhz8n7rb0icg3g2dgt3e4i0t2z8fk3owlzp6csk43ghl0yokd5jnus5d0kvuvcif2dtuwumo7hw05hs7n2hsnnt2pqirdubm',
                redirect: 'sif8w26448v6fike5k75hez8dpdj3v28luh7lwut7vg27c2fee2i4ebulxywbynl8s350txuka45219vcd7s6ftu3qfklj38xdcpdu0yfa90hxbiciyu7mwk4uoih53xedbx98rid7x2z8qelmo106xumaf8wl3ifxk5wvzasxuuz2x504o8dfzay3h0nlvb12sjpxbs7wyih6v86ne5lbj0ebh84yrvm4flwevm4oz4d5yxni753r7pha4d0647esxj3oz50t5uke1rygimlr6xg1szdej5mxkjn051sr712axvwno1xy4ezp6htpv8yxrecjato3knn2a1aeugjtgv2t7coemdk0bih478w8284p0fqd1ny2b55orqjvaj5l538v4rfxysq90mvzphuyxijtdbn11m4qjh02tl4gps77h5ht8nqsbovto203cgw4rfdoffomf1tq9ibv7nnp07nycuqwdyh03k2g7745444va3fbw4jckw6sgwzsxabwwjdmmu3wdtxvh8memvz52qrkaix55zt6d46rsi9w8ozzrqk0q15zdp9s7kez3q8a54afm55ovjemu7ynjgg4g61qxigq9xuqa3k2ax0to9coqdpftx41jsgrtcoz8addmbixf8g8e8br779eq99pi0cuavcnnmz3qyeyxk8yxdroofbynn7q4eumkso9atokl5h9qz4va8f0ywzjlpkj293mwwtwbsk2y8xb07b4kh3i19n93rmwn7f93elwd03sw59xzt1hbkry3px2zl44tfb2u1z52v6e0tafgk3w3qydurpr8bw7v7930crsyb06t3ndg5ub93ep0lmxr5z9d31tu6m4jcxujp87gvxgq83anv068jba71r6tjto606f7eitnjlo51c2ubgdbtcqvjkgklrznh17ams1if1epd8ku35xxw5oq5dd4vuo4o2tlqlfb1rr8t36qgns3wm3e5yyyhi9ip9sf6s67nf7p1hk0xb3verupb3tcawvgqmmrp2dkkifkdkfb0881h0mjtfwhtaech2eu9m279vynp4409nss15p8jzhk6uo8ekz51wj8xeku1g87lpzvmkvczxvqbqv02xfhecrfe30fgcqqob57xgx92f0vaoboewlaqinljschcnch8jtw9rtic05vsvbsyr6n5zcqr5a9yefxe040zt48q65m4rcn1aum08hmysmnoy3lnfsahwsaqtux3bkf8eqh2zn4n4fmefn4vqggvqjdh2t7id8bi2gvxbawe6svp8cgr796xdiopq9y8j2si2pwx79gg2qp8xsm578pilfmyh2gjithta9bgdzpdi2lgm3aimofbq7460gzh00yzetcw1refnwaa0wydnglil44ezrgsv3e2ohvcfz6euzzc2h1slc8c061zqlfjnn5p1fx526srcsar60fopf3d1qd6rw2q70escamfkg2umcrygmhkz8sm0468xc9n2ygm0pm7ncrtp245n7k1rq68ycwt09rhpvycts9pq158do2xaoakuad2z1y427p0f0xb4qm6d5n4sciq6lptd3z5cctlv1tljp41q3wp0nditetbh53dv5inx782tdfb89mcg8vsl2lc8m5zgkrif1vycdjw18p95z9vg3hlsadvg81y0gqn9drrdbbb2u2mjvr4dihdnadnbinv5192783f6rmc1pl6n47wj7g4opv6p0kmjb6jbdafiz4chd52v6u5izvci2djet8la66syoe5f5vm1e512ogqzm3v4a0p5ykegfst2c4pgydcsx8x7zncljh988u0mcwf4le0vxmohapedc33omgv4g7dv3ed09h3gn0k7dhvw3bzmybz2b6vrpi0dsvkn7d2privxg7ky5s01vz5obsa4tc8ls5syp16z3bg4kq3h6ri6onlwl16xktoirgw6kqft7ft972nljhn6hzhla33bhksgvxonchrpm4egssegidq58w7ybczt45agenq0cr4qcnl2j7c5ci8785oq40sc',
                expiredAccessToken: 6865009880,
                expiredRefreshToken: 1989652716,
                isActive: false,
                isMaster: true,
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
                id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de',
                grantType: 'PASSWORD',
                name: 'sz64w2aokl7qrakt10vz74lwerq1bsdwq1460dqatzx5ik03dckvqoikuglzbxg9a8xno1ego537sk63qribembvidveysx5rgil4qcwr2w6qrlisr65lit7x84szx8t0685sh7fnttoqlde8auv244uoijaydivwb0wejurkdekaycydna48dhd41w45kyliguv1bzrk4a50vry6j0g5qr1kjj33hp8ydbj482n7sc1lovyrdf66zh8t7vl7hl',
                secret: 'xrba0mh4ejvtzvts3thm2h52b8a3rb8idjcmtc97rd29rwaj47rfbrmtqzrw17162uuuidbzosyps6102z5c8zozse',
                authUrl: '1zdchds3lhoyf8zozxcdphm90tha0y8ukjyuxu3ep9fn3c3sh18af1bohuten2urrrsexaupbf7fw7fmbs0vm5mh8iydme0xut2zvdl9svjrwhevhf6wx5b5qq4k2bzff7o3paea8ep82koczd41z8756s0t4bs2c6jgff8gwuhqmp5ckt7d66vvoqbaveq7b92gws8z9nyby0nix4rrdphgh2ucqhkp0zcdz47nnqgkd4qmawt3l98eubked07l2q6yte94f1ay5aww83iujncb1xfcxy9zl0ghii73rsjs1df6qcx9qqp5d8tasez8ltie7ud3irotyd59bva3y0acwx7s8zq9xjip79j5hw42l0gmvxexw3fy3e4cirrz7p1uqnklts6id03x8iaqilipru34spgwmv52a9inrx55tynju7nis4144gjsioaziq1afw3gtgk8uk8s1m6zdos0rya1f2umy6pahu0f2amit9tqhd53uag1e96hp1329lln0zgdyke48vlipvmynnqg3nilis8ueitlsmx5mbwnthatha6077u9oaxy0lxvitcn1yzfvckqktd82w95oja9ulvq7lxt6z2yquaxdhp1od232efycsz2nrqge36v4vt9tgvbspzwq80o9qqvojog2r6e174hms0ej2ztkb22b1q2o19igzz21lapm9tjfhd1dldxyp00ttjwn1fx4icags15tbyqdgxgsqye9gvf3u0xufptfpvgegvwbiyco8s6iqxlzubklyaeehww8ripboddb7dfj3fusje54gd5tj6z9yfw1vme9kswnjroulzxz6qr54oe48kpewjh27spzp1pkmwklch2jd03obkt1bck7bwpxs812tcsvj4ykrgsywzggjz4yp36g99ns8z7x8ixzx1pl10ydeifz9410xv8n1wv5dolt05j9iyumuu12hsvat1bz0v7t94edwedo29z9e5jjvweq0tu0gjgemib0e1n1vzvp481o18nxzb97kbeyx9hdu5urxgmk4parny3pjkkod1bzyk6gsb5qfx7otgo3n14492olqbj5jttflkpgtj7r6lcuuc61ugopx6fqp9rlvy58gryoeuh6qsakwccmgq6c37s63rhcsnlp3yh9h6avg00p5v6cmye3rs7lyz3bfbfmcji55hs84ythrngpy5ikdu3nbcjzhqizgq544j18ag6v7xl1576qa4ye88d38v8vmmn9lxh4m7201854o6wbgxlq76jp0zn8b7j8pdfkb1okvwgri8l33chk83jdlel928sgi2gixa3sgaip78dwv5d42892rr9mo73a6d9qygzj0m3zvs9bo4nlc15qip9leosst774j5arnhi5ztkvz9rut4elf72r4yoo13601uzc06bgs2cgs1gl7apr97v5vyg5b78jy59k2ru786m0ncai9l1qlrdxazcj2rh9dy5gwhij8ra3vxwiw5k2vkact52qgahowosarn291kxrlfreo6y0fr5obpqxbqkgqzg5fihxg8opozccyxz6huum4o18ngni8gfl4yml03znp993xnqmf1tpthqjt4j7rpbvpku5e7apr7pg08b34a6l38y6lref3a889qfziyqywgcr96bc3wi7sbon5sta18z2uc4ovx76hdi6m5p5y8uqrzprj0o4asjxa5jux34ytvrm613jcn1zvt2of3syap22xlqby7pvet5jchqta0h9rz7dbi0aj37in6a0rgyrrji9poinabijmlqhgdx3n04770z0776i4ch6ojexxpqjcfioiooyhfgm3q2ggtgo2n8mb1ggved75pvxm2e3cxz6dv6oc1782j7hd6laj1i8rq67sd4igoh2wecki65f1omrjjfa9z0ar41dfk8inldqw3vx7s8o01xj61qyzpiuej5gz72w1k745bgg7upstx9v5nky0ld7jbv7jmbuy5dbh94rxs4ghvjnss6h6o7ranun4nop10kn4hna9k8kurzfmq9',
                redirect: 'fv1f1aofl2zckz8ulnxf1drnffw5h7sndarhot2elk86xzjcw3k41j7e4k8a3v9sx2pvqzkneqhmkpignq03ztm7umulx6w82j2bnvitpur7n9iwzm6r02enml9qvw975j78x3zp7c74niifvhksgd55lo9u1gmzimm2vmv428urbcaaqfgk8m26ganacryldj7kb1oxbhhf5ne8mxiji8ilmlkxcdmq8d97g8e4okstouw66utxtmozuofcobfbuhny8mc6ypyl6oznhymg53hb2e9gdoejl24fe3lhmh2p8z06szl3i5av26qkn6rj5jhjncg9hl7yrd3l4b4dvwv5kfrlw47yibyqmjy1p1qg9smpsequw7jf2k8uwf1afvp56d1q2buggr2gkhi01l7bg6s22gn78ghncryknfuj5y020ud9wvq2lzl8yukdwv1fqbvywptf2oremhepwpn54n084o58f1m1vk7faz8huvnc1q0sfsnygh5rok8kg4bl6hn8q5w0nqb825begs5181dzw0xlkmlj8849co1lcmkvukzw9exo7hqxvlwv69xxuk8jziv0k29oxw9x08me6n8ytkfdiotld9v1amjsx38gyn0cgsfxig1g3thc1tkjawhfotjfun62yu7ic0r1tx90mzdcpzl8b00icu9e53yscba5d398thtjrvqwwdu6omrzcxz3adn4gl5lqtuhw0oxdhzyahp4qmdncwqypcb5hh2xg5f4c4qasavax0bwnfdxf8w8idbwhe4bvolzabrg855npv1l1kbib5q4j612hdszlfhiuwk0svb9mw83rgtywcpanrkfa99118bad2vxy40b1yq6etej4plqnjqogw9bubjxbi10ptpf0a0krct96c7axyeznrl5c9jrf1gbr5k2uydg4w1kv8lmc0kezypxxhmyg4eh8cm5fm9z9cigtwou5dehq24sty46cyc44aynzh3dgit4t48lut50z3f7roer8i0npll7k6pidevfejgd5yv7i3hwgfu6p1cpl1a831qlxbze44m0sow1608fk96varzijpab11ict0609ouofmeqeo917oze6uuv242t4aj9esatz4jbf2v7s0aromm9j5n080gslnlrtav6txda9wtvizzjm612rmvxmgx3yh6vac6qpmxdc0jzqnqaheohpaq06ejx4i7n5bw3gr3ksdfddxs6xxgwq77sz3u0ahyyrw928t6qo3p760gfn65cc7m6x9yjmc69r4nbv78xmrsc2gx4pihoyag7l4uo018kwa71hww6dzbw42srvgcu9pk45i53ay58yann47i9i2rxdb49psgm1gn7f7t6q7imf0n8tkc19dbat6jj8pdsjkn06cib4zx0awprszb7nrhecyxhyezj2o6xtd6ihk3sbmtrdvicxzbt7v0wsirz9fuknf514y77wzfv0zs9bfcpvkjslt9dvzal64q9gzn357d4v2axiq8bwem2srhqx5gflhnqlgy4glree2m9cublr15khmmpi98kds7t857g775hsvfvzlffl2egdzc57nx2v2gf7w1dcp64nvsu7b2jifoz4vre541hm4gpda82z543bnqzme9seinhlzvxnmte23gnebbm4am0ccucw2cv5h0pdlr3dlblxzqi06hnub1z8y4cjleninh5b78czey8ux2aay37vz5qxzotmkwxnu5zogdnaa8v540tlm3raehq6p5g16o1c2cycw86q5fifgfpbjdedo9rfqipvwvbwk4mkb7ykizw4lyjio5l75cq2pi1dwpr4egjdr4h3encdi8a6z9dztg476iur9qy8b8kwzljig0es4n2riebvj83igooubxlwxr6v2vb2t4jfa2cetpmp5jqmpz555hzjlvctq1ddhjugvz8oxkgg7xd0n6vv60fl2dsaymypfjzy9uz4k54do554p6ntcswj6q51etddr5kqc76qvh8uxt775o2n354uz1gws49nvko70ih',
                expiredAccessToken: 37718553215,
                expiredRefreshToken: 7733959842,
                isActive: false,
                isMaster: true,
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
                id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de',
                grantType: 'CLIENT_CREDENTIALS',
                name: '5c7e9si45t6gg72hns24izkj5j1953yahqhk1amaf4c0f0o5qb1osuf9lufket2631g32c0vxdvenesbza8so5gswn60if0xzdpakxoxjyu879es4h43tt5f2hlomj53m27clrl4ukaokw9wg2gku2svjvz3ls6zhwt0g04bt5sobofqqft7mbj6stw0618z3vqu0ox0je44xvi1gjxw1z6bllsz23bu3ub1x5wvq451p0ai6xt0utns8xpbq21',
                secret: 'nwg5ji9xapgsl0yae038vh9b2fi6hyga02ebsig49a43k4hqcrp3wgt0eqxe6300m399jibzzqquvvabiossq5mwqc',
                authUrl: '5izqpbwhlosbcnahrz82zvn0lzi1q5d4viqr423tolspol7d2jbkan82sqa5joxz0hiqcnp931gxp6b13mz1lxqggrc553ffnkn6ras3m3el5u0mvvrsqoo314i3j3189362adfbvap31inieiz351pekpkqtyj4kc0zfyv2ghroyu5a9yxt24cxnxk2dpxihmaxoooxuq3kt4d5fkx93s8pz8jineqnawsgcfg6scpxsb06pgz4peuwupjpxc29pwuhp8amqqarj21y3bmgbwrmqy4qpxghddungai7wb13u2yvzj127gufzr8salfszq067ql39z6o58xvwd7tlvpvkr0ve6adehg0h59npmfophlqngpd6xzgrvksjs2mxd29f88hh1z5s8w9n73n3eeijxxv0gm9eci4if27usjgck9isgzpt88wclgrhuu9gzydpg7mn7ex2crdgf6ikm48sdz8j6b5j41ggolln3uobyuilqc5defe8sgpd1bu01jozeqxm92l3lmdimkujkxz6i3odrreuxu2v9897kewsz0im9h539kjqfemwioo4k5djx46siuxj8xy28o2sk0hw414gyie19jmy4764g2efndisobyctlziwgyzlh7tywrfr9iqaieqknw8zayz61wz7i9wv89xag9w3p2ufxk2kwhm3v9l3icrtjmyrgquoaxmfqq3csmx88xoc2p1b1s5oln5pcr2hel7nfw02yf628y4cfp2c8lo98y1dgyxsxw73bfpy62s5az441guse7bzepkqstvpw7ybtjosvegrfb4q40ib8xntgx6tjnusix1xuu5zd63mmo0309wceq8z2tag5yrns00qtpbyip1q9xtual0hy0spmn7xosutrcq75tqp9kmi5wl4xij9jzt6ezdsgztdzpc7mmlt0cub1u2bamosx3h2dnmyhl85swxibvojj61v8zz6z6q8yp0ze48zebpy6ypn8sx1293kc6y386ossaisdn1sharahbe0mtvizz9wlips845o5d23ac6omoh28fybw93bjy1hwwj6o7ac4rzz1s1c47u274bypu5n59e7beoqzrb0ffevlvt8pzt5b2bylzkqf8stokotzalks1ep9aq9hyeaxsv5zwtus9rs5jh42hyqrdeoht9jby1t86t6oa2xedr8vkweb69f9vld2qrpx4i1aq6j6jcnk3bv28ftscskqauytqjnyfzk4aco03tenhqlwod638omluvk1pjuj2b0ka62zj6yv3q26w0cinwfngjzq3gt8imdqhkzs7adtv38expgr2ht009r7mbi9v6sbo9d27nu2fqtfc4hfxq36irzn42s8jpj1zi8cpkd9x2qbhu9i86gujmg6bv26acg7kk7c1n4w5ha598r7ajk2a750hzo6s7ypendt7190hr8rzahsg3z6twap2pvt5j9ojcjq45bnnk4hz3kuvoj5k1k6884s61ptm6f9wxcxjoc511lie8l9qqtkbhdd06tfyqkgjmb1wba94gr1agfnbm13qlfqubti5a3g4oyzhv0nf5p1fliko9ng3my0cqb00pcz9e2c7xrtm518cqsxkshbg8dizzs8f6gml0w3o85a5l8eeke0yxjl0ev6946tlep7ij0m6e3k0b4jca67sf7jnqg1r4dqxgyofsfmc0sqjv81kck62560uwawvcbwmmvih9iz07q6murwi9zcz49qnkl65eww1tp8mq06y63oe3b3tq9py7w4q84e8gv6bj5d3hsncu7j997xk7j8gaocbmwepia49avsxdzivudi8n3ylwybpcksgyvw2c47itpny7fhxjqbkmelrpidof8cqe89j1fc5eb20rinng0oieehg68rjsckh3pvbgbarppwclmbacm7eg15ld8couctj750eqhl4kjzhg7eblqdrkkz77b9s69mh772sh6q9lt0w1flbfclcgyib0dxq2pm8wkhe4x5yjh6qznue8co3ionoiow8lz7jujmx',
                redirect: 'o0atfl3jczq651y2yu41fmpl1m6vlchp8uti5clclx1plf7ehhh7u3gkh3zxrvxlfyf28ys0l3z3021h5f3xglwm5jkh4bc1rjd15kq8ibwjm8770bfq7tq341v9rjmxvlcusjxsscy3mgkwov2fewpyx64u21d4dxn9cmah2s67l7p2cno46t6nm884bforav73z4mb2qi4tynho1n6d2ukvqf8g406497rvsaobbt66e513wrqra2g2hdge03zz856js0usukjxkpf7l1dimtjw7pk8azy8r8k9423ijd7wnf6a43k4ife8rq9iscnpsyi0ieye8e45nclmlkgnxfb2f6yb4g05byn31j03k10jqa34dtf5uulklp1cmkkqe0e7s1cbgff72azb5z45lf3flwdtfctc707kth8nzlwx72ghof1a8er02smvg2roz7c1fzznfud36fuy8nco6b2s43567d2fzfejsh6lbd8cmr4ixo32uxn0097u7qq1voudnlefbr0a6wzprjx896m9st7nkj4mlhwkjv7k2uazw5lk8q0k2riuw4772idpqngcuj7sbks56zdeqcfw71f747ska5l9ttdsd5t9ofzcxet6ar6qx943apuabt7gywf1gyui7z1i5juxcupgair9gjmqs0dc2zcajqu9t2u8aya5h34mqz3jqo77zbrps7xiy5aoncsknbg0662m5uoiia39m04188vwqbgsedki9bpmagembmwbr036puk4xwf4q6hbl7tfr866fmnegwj4kmwhrp9msmlnk8wtlea77gmrk3zq9uvaeduklm2wdbf4q4bd93g14ru68q22r8t3wnge71gewmthijz2vcqegxy5ebwi1jygneferltu1lyh2kmtng2jnadj16gplw6hgnn2vtuz9kv7rr9qc89wpsbm6nk3lp502uqn8v31nw3xnxt15ltndqof9dr63b92tn0ypgkb7lwz8acvosfv22hxexgqdb3fwoo4y4ydz94v7lbfb4ijfya788pi0gg1rq6cvz0btx0t2qxupl67ve72b6h66on3i1cy5plxjk27m25z0vkak1330n6weq2fx5clhs3hf0lxj2uclzuoktem9v7kgoj4a9t04drqrqspe1ub7t91abfh7d63xcqbsmow9t6v79bt8smkyk8n288vl9pg1mi0qejxlombh55j1yqrub0c24bekjwm1gob130ejc1196jl0aep5ahv400061u509d3e2v3ihntw2i8zaxaxpav3vtrfvmftpm34a5s975vdnb3jcfxva3u1mlhyquzgnhwhuebngxx4ame01p2mjnx98f69dmad5tjx6l1s3xd1285ak3ovh1wdsiyuozspbeudbdxd56geep910jvhskpwmm953oyodw5ne0afwb1pif0fnltslebbb8q8h2puxwhdsbuup3vdizq75e53kyv09h6lqal2cufvpmionk6nw9em6pvsnn0ka483qqlvpbg29cmurlcg22ucspklze8sdulvuhdqi95od58tjo1cxm5wbixrkkohvk9u2rupn6dp7m6lfsu8av7kj48gw6je0bhwp87n9sk3qw2tibucb0i2ti9ozbt07cnz6t5iross9ldfutr7se8n3cc8ja44s6fsc86jwx3y4a7ejpxw69vok3g5lh6xxxpdq4bvczi2lccgnk2yo0fb5gr4kgy7051l7pclmg1jy79feanx1gu979gu26uz9ki33wgfystnywfpb1i1dbvp0p1skcnfsn8vjryy2vt4a2siz124namfmeuxxj4k4ah94f2185s5n0oz4f9dy67p44cpjlig8p94hakz7cf4zzzbo7nmhwwqp3tdcgvbbe9znd3bwrnr40mwp3hscomlywpmdd1470qiny2ems2loor5w4mds728dxa5b5p0m2il4zpy3d8r0u37fgeu7i7z5ixc1cc6b4ckffrhcr1hbnixqgc4tahq8bnzermjuutam1ppj56yfsjmwg',
                expiredAccessToken: 8466149964,
                expiredRefreshToken: 26664786905,
                isActive: false,
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
                id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'lhl1yk2slpjk6g9l5s2rnapda6dp615pwro4mzjdfje5so4zkuwakmuqabgf8es2pxqi6wzpirhp1ez9ccaqhsmomeds7sf17ei2jvz00mnagmhr3q8o08esr0t6m13w4purt4m0tfqxez4r8bepew6k532cwie4z4uzwqz78g36voljt6ldztzl8owwgc9ueb1vpuo700jk3lxjd004bezfeu68xmwdsmpgvqb5dggz0icfwkx873xwt2uoa3w',
                secret: '809r913fzjavlw145yku1cm4xyco690j3ls96mspux9puu9mzfwfwbkywi8zjvthgi17db0p9yvr1jt9y7ijtwdonp',
                authUrl: '8m37ymxz8fwvj1mc815robzqo2u61atjjzslo35c2dhhrdlkjq45b2ireljrc6gimntz9u4iq46wpj80xafuo85chtc0vk9tvct5a75kr9qiw47frkcza7gguhbc58g431van5gtatstvy04a9wgjp1qtprdmu7vfqb7c3dx02oeelx6bzhd4x6h73jitmzlfbxdlgkm7xxglrzdm48n6kkc0hbh9kpstisvy8e12czktbza2xv4q7zc7gjp4b6sa81qadl0f0yj3c8yr82hpvznbop7p2m83l66vybc9zc3ghafxfhvicbeut0336tc00e0uzyd3ipue54d5jdi55fozgwvsp7egma0bhnd3tvl9yv7f2o8wr26hu138wekycdfd0s4apvmvs9toufsldlwfpfjxandrt6msk9du94p1dgls3gxsy73b1u7z0kraiimq7962946jwxfekhmbhbfjicjudo951kk4xbqqrqevbo0i8dm89rtshc2fi380sg54qt7l53hb6kgp7gppdu4adadpkqx7nh8g45d7x83um4wi97snh57qokxz52fr2xs8y2dn3dbn5i8orgq559l2zgi0dq5m0ydf9n0e852zlcl6eihy4667x3fy5ux34io9r3xc57jds28f73oywxcqq1lfb587eahcdfkcv3i67gt3asdov2xjikpuyxaxinj9bhwqd0i96ek1s21as0kf8fth041bxo2csnukbi4db42lx1s9xwr6a7zai86iqcbgwc689czzlzu1zgck6jays2ins1lrqp2w36k3zw646wk80czi3ify2575xyc6nsd1e4wa5xzd9b5jopzwj6d6qv1x9v8uspab8cmo6x4tv1u1kwse0yiwzwedvpyinz54pf3l6k99jmzcyyue48w9xyb522ilnaxufea98hq5dczh28wmllbt7deizwa36kaqabqmlc1m5fhma6bonn7e54sc36sputywudeclqckbfvveqsg5ds8ofbi0p9ia9i1k1vm8elyos5m4wk4groiwsnkjovu0kbs2qy1etuv6wm8lldhlu3wmebf4jqg1aqmgslebl7cckvnydzg5qacuzp4uaremn594nz1car8f5q5ep9xq5zuz2vj7tujv1igpybhjy2iwuykdn3pcucposrrmpzlezqp5fmtabhhfiklm8gm4nsnie6t1vnl3jnrb8xc4jsaexgodmkbr1nz7zovprdsl9mtu3qlz6vbip38byydol4lriw81pdg4x4gsbcrxdn0iog9hycd16tmz7guadvpkpw9mslzdattvaf144zbs0fjon9br0fbgts92ejt3szvhzmw24gdxo70i1jtgtckxoj1nggar9vtooaij87s71lmonqzyikdkbb97js6ji148o61ajs2kny8c9ybmy7nq7tbgiy7h30hcrx1wfbpplz8n0w1jv6dnpn9c6jlwvxv4ks3fb1ysx4gmvhhb007qoc0t4agsbodhdh1gr2t5a7lfpagmxw5az4txxs99d5uqgrqz68du8kunvt3alfvzps0x0wuawrnxr0rtsmibmal44gjxxhynibk1daiw1kj7pm3p5qzy07jh9hwj9t2yrm0iyjlenyqdauy805ptb3va7u9j5476sfrzkcm3fm6e67yijwdo9kg9zxhq6799r2ad5oep1hg2r1fvyx3d6pi5vfshntcp8u0djot6yw3r9swtpj6saoyh0beg0bw70yxvd0v667mm20jgkxs6ojyqmnhhr0bm0nel24m6d761e173787y53fczctxc1uhu2krd3cz0kxza4gsonmpr4crxxdafubniu85kdl2djp06dtt6vce3xk5wk1zo6pgxtoe00ruei6j6plxdr1fatp79zbqw0hn8b01agmxl2zyl2nftbshkb5s04l4ytipcmjqsyyyeypur20qn8hwxidzkjv1bfdppxfw0u0pkuizyniw3an1le5eouiigfu3lv9ph84zsusbp9f8ooiy127x230wh3',
                redirect: 'x1qvoe7zf859ggvc260v34zdyywgvksdyietyzhlsmlgt375b45zuxj8xfcqdgefx3hhnjkv53ylxyzhqg4xjqpqargd7rqdiwzoxx0ovqmzc098gqfin119cz84qqvbai4il86xug0dukh1dk9zh45yj5tvtpqeutl26epvpzchp259hn5qsddeqwngd88d3zql2mhg4dwfain4g769vc2pl045dw1fchh8tzfostipvvxsbknywyhget3lucj2qutq7de9o9teqbyzndarfkjc4i8ogrzj9urur3on7zljalamyrruzp4ui8ezbjypko6rkd3wtydso1nauipt2tpvc0ysx63v2eajrimhzz04r687y956lwnm1mtw6vz4ls8axaegj50um25ztoz3zzhkre8ocraxupguyh5ggutswahwww8ha3kad4v9ryhka6k8uper8jxe7dtp6bz60gtkai9t3swvy6co9tlep5r9tlmj54aglunz5529myp2evxnhr1z920m92viviwzup1pc6oaieh9ucd3yadns4pm0hda93z0fy2gscq6yy9uvapkeg3vj1pw1h2ek0qv4uaosxw93mlif7x24p8aomg46dh3pae7qxfr8k6b7tddx9lqooglp0h0gpz5fsp3yvf3pl2z6oentnlc92jfdyf5q39gim3w0g3bpzmj3pig4mby0t64a3op0pejpqqcee8j598x0wf1gn4vi5idcyw846znqt9mkalvjrb5d3q1xcra0ewd9jnceahpcgkgl4bb76rwznog8l6zs0xg0tntbb9yd5z7rboxsurxrq3dctn8nlrz2v6jp0zpems1yqos4klf50orpfiihze6buzhhqczazcwoxvlpsda5isinmxzv2ru4zbcx7gfvly554q5dq9znr5d932b7h0p5bniqxh2mxw22yax3uijiupiakdo9u8a4q2ixj08yw6mpaiixx4xvea4cqyjkud0o4l1zilr2bzy28q4b5bojijpy1x8ifrct1x4gdxaansb3nfmu9bb9tt6jz54qanwy72l3tdl9mrcwrb218rtvb1d9saz5jvx9zofspdvaubptgw8uzfxwbb5ud1p3yntp2naqkiqea64xjmznt894cw10t0rzwjqla4g1sytla9jpf0o0v2mj7roz8gaa3ojj9dhaxism6ji33s5d4ocel90j87mdsp2z2qgh9974kjzf5eqhtwl8o7uzle7e5nh8qw0n92nvb3zrv0lht4z3h774fb4dvjnpzd1g53xiw2ssz7mzcxbe4nrv4zzkjjfxc15fq1cm6izngmkceep3fsnryfujxu5lo2ud0ivq32vwxisoamwbmgp4zp577mo07vtxnag0tu7lawj4n9jy0ps4n4592tmiundtqqnoywo76j48i8l6189r0uyq6lohfxwffntmk7b767w6b3zat74grpa33ggraxyrctqi86wjsz5hb0vvtl7bk1ko77dcg7w445mpw51gziuz9fobmu0c0f9n1u01iyq4bd3ezackydz9xy9r3i2haf77gn7p51r5l1mglas9hl0sg75fq1xy57damtm8gb1s9wejvhdzot58pfjj0rzv3f3syampuyj1m4zquq6qmt65ra6mibp0bspsu43kn116hlpiv3dsfm6ontggiua1hw7p5w37ajv31wgplbjy57zbp4pm9zqjyk3ojb3hxglxf3tbednlwl1ulrarvrc7r36piw5qipsp6zqnkyolbwzlqu2o6c2rf2m5bxacn09h4rkxy49co523xh71kuzshuqoh7lpgjzqrsugabo71grlq1qp3juxncuh4qq4pmx6zxlzji9ydopb8y337uad1rm2d0ruah02b3mqvanb752rwk2iwcoante2f2fuociluqh8zhsdd9ljo2iv3hqp3t4ocbw87lnvy88wrooj7ynh1307ud3aqqoe4h2is8mqnywfysvu6iemtjqwslvmbn406p6sqly5h93agn41ohi8pwyisgh',
                expiredAccessToken: -9,
                expiredRefreshToken: 7320185537,
                isActive: false,
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
                id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de',
                grantType: 'AUTHORIZATION_CODE',
                name: 'bfp8jpw9tfo43aw5r6z92ohpykralc89q3pbt72ouhkathilom9b7nb4nry8blijseh99etgmy2v1inrxm5ex7j0effdgpqnkrukt08wuqpft8xfdtd9tpskzgmix9mz053wdqzuj4yw5ig56hsx05fww5r9wihwj91h9jr8e7c0eqb5hgsa486choyregpgmycbxnw9nioebre6upqf0p2xwrygkrjkp48b0czc5aka8vtnbvkmhocj3pksgji',
                secret: 'ikzvg7hq9s4ll49peo0mlrkz9gj7t5hb5wgcjdyghoep6n22ui8fbicttzhsdybkdf411ueqobqojj3fjwnfzuwupw',
                authUrl: 'n7ozjneubfs5hsevotg5jxaz4kb793n9cymh41xee35dmmlbrs5gb5bbyoenaw4l3rpw2dt68h9yslbcm5rufkpj0qnvztt6oceumo0qu154nrv0bpgpwnxahil3y3474ysg4s87a54oat2ihpk1b9qtp3d4pdmi12ggzohx61hq3x4mh5qt7ip3opewtp3vwonmsaa7d8vxsbmfej3zd03wqxxm0gqbpl2b9rf9jtageq6vpl8as7vknzi13oq8llkor4wlogi7siu13siykbjbtqx2ao5vh3fyw3p22igymm3xwurw3jo5ww17xos7vtrcobh965jcqjvc3llvlm1i45kbea7mao4eqr1auiwwqt66p8c1vk5d13blhk8yoqsos08350rx9gqj8frhbc6vdil3aed5lq61o2l3gy0x9bag16vw7c2pepzp2q5y1mr198o67tnkmgkfg870pi3ohgi1nmilsy4zz87lrf4e5p1uoqpc5qycfm4u8ilcirrycexdvv0o8bskvpdc198l0346dyjhqtoks5ejf88p3jz8tu78uxtvfpcle2079etpukvwkec7au7x2m18x8kv6qaolo76q15vxnb7ti4ukevh4lsghmc8t10x3jmjqtuieih30255wbhqpqxvkikfqm9aryptba74uhy6lhvdcezz9m5yvsg9g44cx1b5iuls3bcwezhauogg6zh3z9123ktwqisyulhjsm9rqmogpjhn7exm63xqxhk1rf4f50yj8vh996v8ngaceuw35yapviityh5mil8ys4xttb2mki4stw02zitzmibbuxk0hqim8m9dycuqakerishhxmlbs9xt0c4xjvrqcmxtvqlflnhhsfc6h2854bk4cg1m5py29hep6rq9s4100g6jheyr8fdm0iyhbbjyeuz2e5qeajf11vxvylc8gmxq7h2d2w5nrmsimhcau010ou7v4anhml9bclndanlwiegfte4lfw4cdh23hcgng68e2nk120l95v79kt9zhidttw1ew7her1905zcebyzsxo4gt4tymc8mc3eiqv1is1h3a1rs617ugxudyuqukls8mhx23zvf13awbvu3qaetpbcmeu201q61bpnyqgiu397nqtwsyoqf0c8im09fimq919gjj1sxapx0glhuaw4fakx7zg5bgqrx5zfisyt52wo7p2fomywv3gv5655nt2p5ziq34qff2h1ham0mmp9d2ohnpo2i837gamjnnn1q131pj4suisswxny9rohd9v8bux1qmt3zog6783u830bz22qr9f56w4xzonr9b1pz6toifapq8papbbt41jjvx29444mgn8wjqoa0byudj2ekhgdmlxj5gdgandbvcy8k5ww96351dgoq2v096f2ggmzumwdwc3r3oe56mzuv568clhpiiusymp8j5kvlkq9aye8twqqzh658vgsvf1ruf6i0ovx26t8grmi7xsczmzo8sa1vpthqhgzk18usfoojrqttqj7yz2vbtrnym92795phzqpewiezwqjgmnrbv3ytcd1xgfudaan3cs6tw6fmk3rlf7jlcm8zzzmafq9yen3blgdytxei3xvbd6jp6t185az6uktxoggcrb9tsdac9l9no6vnfl6s72p9nqzo2v7pocnvifnpczu4ab1pl7bxy5g4pblcw2upkocwmnff1le5bu77f05iu34hre753ymmqpc551tlblfzufmnn3d4q9yv9w1iafg01trbel8icvx9qkp26w1y4wwgfzb3d88b6v40zp1gvpoxqj2555t01uuzss3wswwml1l3ddw8m10rzx4qp59f7vp3vf7z0dczhmedjbs2e94ti8dpawkeqcq4zpcc3gwdeyezbgs9iaojuik4vezyv8j2fwhvq4hw3hug135m6r41sa49wrczjnhy5brugcliefzaz83jf0oenk24hui7y743m4dwnacbdha9mjaeugxhxkx0rbzzot1sy8z4o4w4zfo2vfnlu4axz7z3',
                redirect: 'si8b1hch9h5ebnw0r7fnbn6ev7f5nzhrw4p5zjfpbv6o4c5s8dc534v42ow4j5qj8046mgdowzluolbrhrp1tmeliulyry8jp1qqw3qscs3lb5frj5giwhzy7d1jpfalvhnt5m5duip20l11quf43fkkrrtagunrzglduvqexoagkfgxvf7f6jqv7vhy9jhlulpmv8qkvv2ewfaqcz3u3c0ro1jxf7953ufxrjphudpzcng8e6jsp0yhqhsag8sundalj56kh9zrbn3zc1010c9rtk2eezlvtnptnx2t37vgwt3rf1h8cxe7z1ddrfucu8f2ptfy1w7l7t0kuvn2tm4wha47hoo42gjmf4u2bu54yz2djdex7hwp3fc52420r0r8781ai54zc8xptg59chhlhiraebioej694qshithuwsa3lnbeemvp6ul0byz73s80ezb31ci6not6fbd8v79uj0h78u9cikj5l2syj2y1ejmtnm2ycyggzujcpxbh5hn80a1aiwluevdqag3bfp0f8ub89cjg8nd2wza5bthheazejw9noc3fm0wqn3tuze92xiut6wqwmbkqsqkcg8cegimrnjkuwkxynjb782i84zes9kk22s907n1wz41ikh1gi7okj87sk5kdhpc5chw8ejt9vond3i1r4at7nrqz72lal7412ki8jr9d1tpx5x0xspom6o4e21opkcoqcs6z9ok27524y8ujmkq1n2o9611480b4pnk1k3rc6avjolusmg1lei4w21m5cv4aeb55kunlbhqbi3azen9zytlq28m4wq0snj51f2wsivxvx452emhc1lp5otcsf9zixbl3kdaamehc4nh9if0e6v1qg4sys70y48eybzv2zf3r1ghg4r5gzp8kzhz7f0beng376cpxnpntwmxs02wh73mlma560gf00g9fywa5avh7r0yjzrpyt1bdjvgs2taipx6333kb3wh8hob6j98ql920fowf9ppym9ygxo4plc0e72i9cap3raunn5d5skmoscjje5h4ia3sbt6n3efmkcm52j38t5l32xd14fh9lp7tg5fz1fkjal01aoybd27ka7gaar8beluzdk1d5kxb815o8wbp8t031xiz5u7mkiaqya3ync7850iez67xacofnylr3h5irvs74rzqvpcgzy7mkwv30s1wnbvjubbo6mweh7obkx72z1j28xfyqus1nmw5vxy8bjy91e5jpm7mueqx0l6x2hkvsf2yzqbb895560f4uno33hwx4hhhdlpxea2sq3mktlrdqsbagdxgspfk4h0q8ym86ii1khdqob5nl88a0jreiv08kkgfivqiepu8acvlsyf4fi61xvtihdabenlbon7eveek94okv3yns4lxxbuuc5xncdbhcn1ms3f4brgg7oeow43x73f9yzv6zra3t7b2yk3l6am673zrfth4uycp61myh9cv1479ocfd4stm86ksqvdmpb5bzm5e26gpxfkebyyej20jah2uilk45co2nmcdvzkdivfupvqbkumg90ys038yhw4i5z5n8pglgp8k0kjvzddfa6t88hp645m143uzmkz8wxw996tq7o1x866brl4pj3nmx91ojugpilqna1pez1zbk3p3x20ad80rnrr0nnau3kcdwyybsj9vs32uqfw8643iwd5sismocc5qc5sani3z2rqfzgi15av5zgt6fexwz06nj3u0od2js2zd1xplom9o8fvm3zump95hgu8sxs4ketsi9z9nxgqe220vjdatqfpjyt3c782029qsys4oqxf4gm1bff8q1ahnp2zbf3e53dtv8iopwrl748ko5vmxq57a2h3qgsj2fegq9j48mi9x0aboxwkbb8qu2z4sijqvg0s3twgohbb0wa1vplu1ninx1kixi0vcng4xhq7krf5mtl99pya944dklrzx4w8uexlod5vtvjutj67g6eqnrb57byoyqdxreyls125itcxdxnijk5npk774dtz0v4crozdi',
                expiredAccessToken: 3043113105,
                expiredRefreshToken: -9,
                isActive: true,
                isMaster: false,
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
                id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de',
                grantType: 'AUTHORIZATION_CODE',
                name: 'ndjdj113i5bsq21ucldd7tljt723hb3a6oqlhvocxet84n3hsmwte5d78s0zfbd4b7zvt11tkqbtley0mdiermefaee14nqfmvy54nyyos7qgcyh69fzsz33dbbesw2ncythp8r0nach3fq486hyfknqeer0u55t7vuo06pb96flhve5nfy3u0oz1ld6r1ey7st1xx97kf35hy45psu4ayld8mykv77w7ftjpm5ynvu6u2ozlgzb7vzzgn9saim',
                secret: 'r1nsg69j1x1djpoinrkfeutjsxry0h0n0rfh4acxicgzj6ueu6iunovidv7jdv0buchir63pgziskjxbzzz2nv7418',
                authUrl: 'mq94he1hlgdusqueecqi2nfqvi2hdfgi6v75qkrn1hvpb4o62womlvcsi2ekgs4rxxvo5hg0xyoffqs390im3xst6xn1dwl4jkbiug6z2es4risuadr1zrk8045o9rtsbe13ay9fyqne0qzfd82uaeviftn9pym91t93apnclic38kp0arm54f83573zip9xvtt3ygvwqyc9ok4mo6j8ous8h24r106fwvfch7ak6sak8b2nvlujbuz99l51qudwqebu0q8vel4x1sy5ig45d93lxjkasrgxr5ds3vklo2nq2bqvgze3gz88gztf6cpiyiklfn5pvudb1yjrdyc607t9q81erfqwa0p894e6hrdzsl3623twzvcr1gbqmqdu4fed7ljui8napafill6tyis2svayomhzb8dy35528l6eqt13o3085vhsvgv4faujo3f4sl7top4y7kp2h3um1x0pnocavdtmqyqc5ma7a48glwhz0turx8lmj3vsehudokx6vurtqifbuu5ucxdhp0ivjngc11jmr91i9teiq77sqlzgqydzyhcwvr7hg2bmri89vu3fp66tkm7axy8rl7ic5bnh6frtgwkcanujn1e64dk4io88kwer9xdhgsuu389lmiexnos8ykqyypkkx2h5uom1rgp9ez2bis99vwkmqtzjqsptbncsmm6v060topt4xwnmlb0wxluvfpi4m8zq6l20eu0563ael4fmh5pkpbpg16mfsk323am29sxh880p77usaaoaucrrhdb82assuaq8jf1lygbjg5bqc0cxu3ofyugag3q6yo4ykwojymf2552985d04ez2rwxdgfq5b6qvlrxlltmgr1mm3awyn02rujg1wmi1illfmnsqecmt8ug7en6jzr85kfb1v9v8js7m2pkr5lej49qk9910aotrj3r2ul2tfenhe6lwslfe68a117f9wh0sv99rxmft96nzp9mhsh0mb2vxo6hwqmuxiwwlrhaimbr1nre5fktqlxbzfvsiez1b2o8ahngqfkmhlpu2dkg4z9qnm0rn0e2j5apwc7pr78mc58ppwncvgrt3v18fhxp8z63hfb9xnscot3ht5k6f0xss7q0hm94cexlrhid947fpx3o51njzrzaq4ytdwk1gkwx8yf1y3pjwuk3imoi4t0966x2dq9841e73rmq8w4ip0nte7wp85afrm7kkztmo947v1pznq8r73l4gmazfsiwvt3cdhpnmvm8b2z6zs6ubx6p4whe543nr7yt5olkfv3hk04j2t7j00dl9dkie22rg1meemnzgi5si33gramvpdlraqe7l5us645khzaly8vvx8o0f14psrwurt13ew6m8i9yr7ya76cdw9136pxkq3mmtggwlv4vgk2q4wt3i8be4rrcs3uom98d4qopbx8h39u3j8w9den7i0noy2xy31jh1rvi8mxxhcfepqji22eugwi8gkdukthmzah38v7c12a9pi8v4jus4u903gx5vkkujqve2uy0juk33rma6p1mwwttpr9jhzodvbmohe3ta45cqeoi0dvu7kxnmdo8qy25tod2feqb997osnbjwa03wi07cbi9s3zxfxvdmi518yy6p6ps1k1m3x3uejsurklylo3ydo4y8d60zrqxuwdwptf5n2zy4lwjphamy5pp0p32j1upax82xamyeut8a7pew9pswuyn26wihsu50l8ai7n56h16y2zur02qmm4uvi9vccx62o04042os0i8s2qgl8jbtl6og0d7jjgngstjj6xrvvsv6agnm23gmondesavojgi6n9s0anl06q5uua06c2jech3e2qoow6d3r12pgp1c9cvb2ws7j0fn86a5lw7mz539r1ly1bcme40zg5pm5lzszs6o69125jrompw8yk72wfkgnykm6sc90movrgimv5xv3m9fqquj9fdy7f0tgit4nhh2mrcbe5p3w6v6b22m1fuofmvj12t63il4pooaeo5ebtto8os6mqvvcipp',
                redirect: 'pkkke90q9iwye7b0lzoisym1i3rrok0l8x33t7vwpa2gqlvjvujiihpzaoghnubdumom3h39j89rhgc9p4s1oeof73ybqmgvzilf03oazjkorj8kwetieo15q5e1vijso2nuagovitd9i4nz84k74d5u942oxr2wri81mrrw5gdwcku4xo8mjvtik5rcs6jvrmgb1nr0g00qgwpd6zj3wzyqdj962qm2iyhj671ju0410mvbcghybqqwe3pmylbxrbjmdblm2nagunre4i91vcw2behniooykqvqpel1mzy5v5mncxbc3qz0uwn0oc6hksu3rf3q6ovuk1eham5w2h32muoermixl581ufwbe8edlkhaqmuhm6m1de19e35vk4abahgwsn91w08zc4qrkwwnlm19fvfd834d3wf8a7zlmcbfwvtv2b0ol7mtxw0ub9uov3cyd236k0dhnqz5dw3dcg1xesujy64vf45vz6n2smkbq9bk8kpcm36i9rm6joi6rh83j1idhph00fsrcoezyi7a4q88ahayec5tufumzhyi62wk72g6hgmoktyxze9o0myweq5kfifnm77pjsufsjrhg8uktwal6w06dwup320d25kw4qhsxm82jm5nufmx6uq7tmozfl3zrg2vea04hkwoja3lal30glwbl8lc65z603nl94qhga8x8mwgyrg3593114x3fuoya4ddoexlnkrq9vs4rtrpks1800m61ctbnxhvxl0u5n3uz7w7txv8bfba71d64t5ama7bl83qhc79bgk56e8u59v9j2doewcbz83kj383fvcswfmol3qpknp9a8hxa3fajokf37s6w7g7n91ywou2rropcyrmi3l9papnh81ya06gbwlvb8hkybjnq8xf7gyqct151wsxz3vclkoyz4sv5lvh4xmd36redeup55sqlqclrltv0nkgmu78x8o4014ysbikoyqozh1txeknc770rvkmraozowa26g4lkjzeeyfgd0iv63l58svcxd0nvfwo6ec2rfo4bh0ixd77ejxcb9sjq2buxmppuexzrk46ln3oeujyf1w8rkgigqfc2ffxxccrx68xh4vzn5c73869itq00b9dww1lhhovr7tf4mfdrqqet48sga6sx35yxbdvhzb7es7bh5ewm25t645fbk2l5vbvg677qx6yt7rf35xl1t6edsgqr4mil32c10w0n5jxj9zkz2c0l1rv6rijb2yibm75w25lu85vvb8xx4wmrbi54ngyb277u763qfp47pk98mil9vmx929c9icchpqfpwq37ayyugq46zsq0s3xuky6q60l4258m8002g721l6jpq9bxq96tz7pv55wwxz1avnvfrglag80xd0m84wjuryl6f2tdxeu3v0izdczwn1ku0o6hus5ia2m892xsbwpx51lyzzed0fsf8r86wwzsqzcdwbbl2ew38uoudjc2hxjo3r7d2kbip5yzh9ysvsc9dqs7ber2lx97byzy9dejc6qpfhylbei67f7dkeudwddy2yv5s29bzpu5hy1489deiwl9he8mraq3dg69flax0ddarx5gq8hpdn953f87b0gjgz0x4dzl0296kvo7ubwrccy29xlr1z4bumhxtvlvv2g0q1jth7kxgseq8tzr2s9593r1i5ik1ilmpose1aowrlwxk29tk9n69j2nrn2anhsk6t39azwre0gmao70c7v0drtg2zwsawp4tmicbb2pw2kd7m0stmuq072q7fx84ik7q23l7bq9of7lturll2kwhjd828u6nfp0qfxrx90ppu98qao5lb68ac4pnettkxtia2tkpvjmg1w33jpv7qjs9gfokrc078l9v4umol1coe8rcw1iahnt9os5h02mxzcsugh9lu6k2kjp5zzfnwdaflagt00n676hqejvky18dy1oemoith14ijbkaljq6dnt88k5bjuu196aveslwwpk757etjqetnsg3dvbc9z5gnu3rrjltpzv63th91df4w3',
                expiredAccessToken: 9628853890,
                expiredRefreshToken: 2748356779,
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
                id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de',
                grantType: 'AUTHORIZATION_CODE',
                name: 'anu4tu4kq05tqt8v076iogmjmfhgb91mcuew5jto91mknz695wgsyjn675z8q554lly3iph7y09u15fyuc6lc769z1ge0qfuxjdfxfpnadg4c8xuv55j4n1dgzimnzhcl87ahq0wb9qc4gr2upb0kwfu0lvnloslckbrg2txckmcp7ujbfwttbaybr1i8za3p5v0vweu0kdhmhit7bb68t9rry8f9rd0f4wv9jgr0ebtl1a85e2bwzxc1dgor9q',
                secret: 'rdnl070oa5xyg0ptt56vcu9bmqz8xdzictn7zse7814m7a4njsb2tcpq8ez8euh2qimfymmxe4h9mt3z172r9cu4ej',
                authUrl: 't6g2rz4tblco7xiz4d4bjzcsfq1ztarqezar7c30ai42yuffbvw89oftimuer09w2tfmo5ikv07ojvqhvgsijtnx3bzuue63gpakuaqkcpi0g0z2uscu7rvgry2maw3805u3dzprtbmcn96ggzsyy5rhitsj3dtp4etbegp6pfg7ncocsmo1m12tolua1sueo80n8gvi4fjx4b68sa03oytoo76nyjxa8j9751zpq4d7nvbu0u86cc4huruosq1zc8dacezzwwpqrg935edidt3smvhefu6mysox6n31e668g477eycsdypwqbuv5u5tri6kq6m0rwxxbb3z89aoa2muscq4k4blcg00udug8x56gnaadtoajpdjb55nmiip9nzjeevys2x1l8rvuak0le1otw1zz2lew1sr3pvkr1761hpgmhu4shcbirqqgzz2rizjqg8ggkbnmg511yg3ppe4o9m7zomrruqtws7n7t7adn2ylcau4nz0cz5kxzc887ooedzolrgqyealt2ysy5qikrvivlrx3yek5e3rnrzb8lbbmxnmvutbgxs9curtrbyla1e5hwgfrrm19edfefpvgdvf0k5yjjwd9qhnmna3jodnh1pyb155plhhzg8a2nn3mhh0ax6jubujv40md6u1z4v4fuvne5cuxddgpqn3fnqmb8r0snk9oqxyp3r2lbpyn0y3e7a1x6a57k7g30rtqp31w3g5qtu3lbxbqsse14amtqt84za3f4umryezczrfknbsrta7bosrgcdc7yauep5v43sby3ap600z8xt2iq4xgyzylavgeer7hsqm6g9wa3ihgg9m8yzwlkseajpd7afzdwjb7r1b86ukvi93v5nfwwbu4a21g8zfb99y7q1ybn2b9jsehlc8q9ft44wca03pl7s75f24uw505ccwmtfgqgvfuue01470uivofpvmqs5eznl71qet1znnofep7cb9fbofney0l7ahwihb1w7fnxxkiolq4ribxj74lbaiswzywlaijsjkq6gdkurrtxyuxlkm4z5naj1j31efun303ghlkcois5njj65dnivuxmdjdkw7hb9gct269rnesk7sxkk9e1r7vsnf5vy9v0c1b5gc2o7vssiys3d3jp3n2r322a9nqdpgaffw2jt6yychiyd1do0yv5mo1ee0nh3ordq1sen81ubfnlw500sioayfyg9ceavuyl90qrnik7t8rgrvb2ynh6fbr5fsjv9mm7c36j8e261eol4jlcz3vzj77c5q9ezkmh0n0u55gdsug9wbere54zdlzj4jfvco6563nrbwpai7jh9ezkd6l7zb8mwhau129eklu9i0un7e8fczsltcmaz9us7xmi6paq9c08ah6tx7dmychznpp94i3xml8ulwfj4n54x1gts5bvrr8atw1nl1qrkvyibjiosjn74alq87kudixvka4lqtico5wya4zz8svcweru0qqbuxbcy63xc2b0uznetydcna7rlmh759lflydvihparemrej5vuy3ck9co6nxataw9u4ckwue7rn84jdnuxmigguuldnndk809wrq8x4yucrfo4ob0olyfbu6py9u4k9hwsvq46rm5zyascgkqp14w0qtbw2p7ceas42ocg8lu5st4x4u7a5djelasbi3wsysfe750e0ce5qwhzzmzzedj5oalm0zbl5qhqbpziyhhfy20nk8argatzrsufh9h8tn00wj89617culc6rxnjsh5ocz9uhur99emwo9lcqzi2ewm9fiowbnxw7yqddyouucr6vcmo547vp723j1gv1e297aj30iu51t2j3jodkfgdc26zmo4uxrmh1gw6k0pz5inw86bvk4mpodneeblucb23pfuosnn8u15xwk1wiz7roh4hi1a2145cyc2zmgid96ib9rejpj5mc73zdgzy4ffiqx3uiyuzlunzkh27rer62nrlpehyp7oe0e6rl79knu6nb6zbjhupspow7nb1uewyxesgjyw05luqv',
                redirect: '3gjc1elkhh3jj4i8jj3tdvv1dbg53ta4oaklc8bqdgfi71okgarzagzpr8dsm23y8s1q2hbp7l97cvk4jvpsb2zlha12hhvf6fgdf5u6c0b4isqp29grlhcd5n1zg6uxjrvp6aa8c28hopwyrxpj4gjw3qhf6w8vlrlic7jdm3pfbencxag1k13sbq0yhu5kzuo6cofjsxrnuhve446kri28tm15stra2mijmix65wdyuzje2kvxvqfai62y2ix39e8gl65wmzdw4ss5r881xy6l31arn947f50b92rj6o3064y0cnn17wscoso7nsfldn5ofevv11cuoqoh1zkv2owp8cx630vhcgt92pnhdum5r8uxxfbyvb6l3nnxr5xocajjzx6e4s4vx4xlc0yxbv4z2x9ma6krley6r3ip3nu0sa1g1w62d9dds2ilsb07fhwrq1olfprw5n03su58243akbnquqhpp6t1elryltcy6uvam0pgk8u3fbv90k3r2pp2xo8he37cgheyziq53h0kc7avoiefprm48vbhacz2okh0euqvuf9r89wdakbffkgd0hzi7ls79vlnfnefx0u0gmbyrjbeyjhnyvadc3moh1xa2zwxxp7w6uioq57zvy8kl1gbz0c5rrwr7c6e0op153978huiniwl1jro4qunxf6t9r7m17cbqzvhe980tecdt3xmrcvnvs737drumtr3aki3iverqw33z3ihpi7lvqayhbmrzbvkqtwdm3cw2ne9ey1lnt3qzdmw0zbh9e5a3r2105p26xquntmatinwiv3gon4jkihvobok92uf3eom4zx4h1z27w4pqnzvu1a0nyqf2k53hdfkgoppu9quodquw7b32tjh69rum2vskdd7t89c8lr2gphmi3i457x9j0p7c99z63536b8dh01e2seyb26lgbw7aza8zgbrxw5m0baw3loh1as351es3spx36wogh9bpccm6ewnog7dzfz18eijplm8m12tb9yyt10a1gi3ktw2mkvfskeryj7h78bolelufe1cwtyi8rrxmrdo0kf7ymwsq64dsgyq33rerjvvwysaxi80d7idgxzuqpxkp0unufsbi9fhpu83mck6gteaxbi0di27ma18wdrorx35dbw0zodcsq83xovmjuh9sopvp5krkg0fkw729zzxiy6372lalspraz1n2vk6gytais0123kto3j0mtkifgk922582oait1yun83u7ff5mfklto3amh2xovsprba4d2jju6efs0m1ush739krgiqcenoppsgvv6uay7zmww26kaz49kic8azhz7ha1j2ou7nmaagxbfim82ra21apv053ovbf7m9278wneapjn4xq6eanjx4ap3gemjyf4ansvb3itvz2lzfedcof7ebeo56di0n2pdpi2zvb6dkp69j3bdt9xp23rto38b3b00t1fnxzssajl7e2miulwipvnixuwpakavrygy88ajhl15wabkuc4j1lmzkl6k9hevwyu762jbsrfhjg67348lx5zdsv1yyhod26i6eehicg6ejfyd4fgkum84ngq4arcjg0p3n8nl0afo23urojl5kxwk6k2acvw4aqyngihtbfsqsxi2ei2xzk8od30lc6zqxmv857gbocs9lm8f38p1n0x0g0g1acwraqaq7lzpbr3otwq6pz9cr6ogmtqq3k339ekvz1rr3aszw05ubr9i4mtbdjsy1w8cmlowzbtgep3jnk4sr0sdnwq9yj1fzgs99zyvdpj045ft96cgfuzhql0hw3vpjvps0z6ria0tisk4jiadjp3oi94hg7g911wfx6808alrlg8i7zdxa9k2i04vmoougvkn8r5yrppdbfy4rtro9akat2pqbr48mqnmlhduv2vneps8n3owpf0krxbm9nrk8mzqyq7p8sy485lfmfvpynt439rh3jprg4ikhgnjm7cnm4k7gyj0qhcsafzgrw78hx9ro3gajvmap07dkt36i8d18fz562380m',
                expiredAccessToken: 1377520679,
                expiredRefreshToken: 9275946524,
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
                id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de',
                grantType: 'XXXX',
                name: 'jozyhejlc12ji94wxozxjgzqybar2jx0jho90x5js13bzyp3atzf0upgzbth760a7zigbvmsau7ihnkb7ph6h4pcx0tcjt1rhvvv6xz5v7vprwo71d8xivwqtdkgqqemg8mdpvn0rna78dwceo2n61plrqegzsauqltogmhffvx0u2jkfc6w9crs5qr70ibp3a7jpj04w3mzcf5eqd6hy2la0ewureveztf8rphp01xrmimmzo99uq7fcwbhpsi',
                secret: 'qi0m96uqpuh2tfs64mxg87gngrwyqw8aogz11a5ugu5e3v58b7cb5g6swn7wrgptk5u9qbc9ywch6neznqinukt58n',
                authUrl: 'tf997a42qkkod40erm1bgb1r1mixg3zzl1mi5tk8i46xnwdlbwgjd3srqut1w8ynsbpxjb5h78oj7ufckk2r2jgw5ct5ox4lu1b3kvcxyyu1e6xyzasbkcxhs5hwfk5u2rykfkl8o3b3ml66be71kiol5i400khf47hd9mbv79yklndvzowwvylxp0vt05z61r560hkso2l19mqnk09ysms4ds174qsjoy44b6a1ewybr25a060gqft9649atqgowonno7hpenpq9837hqpdf090zqycbuuqn0cwsxmy87v4xbai8dkhanxemvlb1tlydaoba7tic94oo8fyy1x2okxorltob8lwgqrt21kp2anq85z13szx3z6diwniachzs6aesfhccf3ssl6petu4n81wi8t6pn3e6yw6blfz1nglfglbv1ywjgykyjv6gk6ktcnnxgq6nyrxy7jwe04n07t0plwwvi75r6h0tlbdsahjmzqbcfopefn6hflhajmlstgwh3qr8acdjdsmrxp3bk7facrpt2cu5o9ed52bun4ftzmpx5il5ugy43p3eo899g9aqeb5jy0oq6jkdcozdify7hocurkfz7213o1tf7cxiirp53fvj9qs7w7l530jxo2bfqywmeqqx16nvl5l80d7gd48ou9igmc4jfxafu2oryakgcx3orcixbgf137yrsp687c5i8x6366z9id7owizehon7c31wpazuj4i8d1zpht9ia2sqqaa19nwwfzzq9af5snl7zfmsusu9rllpu9wt2l53arcgn81mwglxcbiz7aypcdcvpu9w6a1y478uigvwbuct29jeqec6dgazrfd3k5l73urxmai821pv700p04wingk4no5fnztd4wmwp2k3ur8a9x0ppcjockpx5zodcqejwrkfonb6h126q1ubyo6060obfxe7w197tdorfmrj8ssxde0p4gvdpty173akgasrrw48hfsdw5xnqwvc65eone2n172cesfd6ws6xoua1j30jq9ix881i1bh9rh7li6nnmcvur3hx2rjgredyudlpiv219h7biu96xz5vdoedpmle3execq58x3fpn2exgw91x8m90do3hnn9yrn9sgj0kwtmub7sxfai7et5d3q6n46gnrywam5evcj9brabk10lltnpv6hmv9bjj38dqpmj6rn9n437tt3xoisjo6dp5191615svlrrbh9l9fvwejg87i1vfd20ah6rm58gt6s1zr7tc8a868ec4m80hkf7xnyj3ewvxvipglj8dd646ruinhpoq6uh3ylbfkaonbgeblwol9qpv5c9vddukzzn3swpmmxz1zbtz3fnphkzso33l7r939yqzo0omqrno9gdcgix26q2eh61mlmbkom5mqtcx92uf60n67cgpwm75n6zy9ulkxtfszrarrxr6b0dlkkhkv2zqsugjrpwulozv41im7trecf2gf63pus8thmayk9l0dttntbvd7031jgjoyxdq5n1br2e8ks37bce6u2vo8669w8qpth1enqn5wrxl4u0tr7llwtxg2qbxwib0c1cqcz4qnnc96sihpnh2mmhdc9ydyhpv1ya9tblfovr5br23tgtgkjvw3ayamgfs9qi9fh4c15iyvvkdv9bj62bzi3chgrdhlt36lld3ylfgy3arbyimqj47vgnjoav4iim50gx3i962bxmpzyseb20mmccevum3vvtyk9pss5sdop1721dojo8tpolrmvo1i66abz9som1dh8028uylyqe32dpefagqyh3l6pwd4kiqha4hdbxapcjbl61reo3kco1qn9m5n8t6pqyqczdy3ishkwgqqu7d2olkov63ms63iecsil4v71lw8eyis2ahnoc5qutfrv4qnclgkztvnp43v54qcuaa47tksyxi16pbzwudn1po0w1p5s42c2tg9xbu4lh29m9lar2f0dk6rklugt5t2jqpmywpu5v9wz3oxdqmdijnkl2s5mbiffaaq6zubt91vd45w',
                redirect: 'kvu58l9v6t7zye9abzv8fvovf08s57rq1owk19okoi4zt4wzi9ph6o9y8ibaldlbb0s8dtgkdml73lqsk2dib6ghdwxyody17cigi6q0ii0t22utxv180fxlrtljmass45w7l9f3nmweakjjyoxqmy0yjrcg2q5150vw9wv0n3q6kpo714jm0tz5xkpy25jns59y8b1pat2eu6556expzhboknx2m776q6jw0bg6sf2un2vxavnk0ttfi29wo3fot1j1krofajjvq3skumvk61und4pn0bsi9kmxtmm3wg8gni6qwc7vajp3rv89t68xa9gwyz84zvdpi306h2o3yoxuenj2luzubwgtwxm15dtki5rpi5m8kwj40338lwdisb8r82jd1tiufd529jm3arti49qd74n4a7zldnqmascv968k607mylnpzkv59tu1fo4u0if3gj7k4ezszlant3qkx5jkggw1ca58zx8qzq10b6r77wjuahwss4em1676zm2ffzob9x4t6fg04517n8xwujd6hse21cezodnxzxintdfpn789x904wp355lld8pzoalg3dm3qu3y0tylm70xya8nfu27xpxx18bw6wfg4kccg4zcqkqxwpea9a1cm43b2nuvfw13np9y7pfp9cx7y9f0ncho2171nrfgbmyca5xiwuegkzi6dg4s25zoyu3kwnqtmtubw74sutlollog9yasne0u0dqz5j6xbx2m3rebaaqbhg5gwb5o35ql9g28tqjwfon5r29mor93vej8l9uknftd6def247pp6b84p4htjt2itcif0daf46bkucksdxeekeuwo7bhhqvpuqod35imhlreq1w8jjm2ffwd1omsv9944lufxeqw6al1ofgv4mhdjvheyrmlw2iw05fm7x7iq3ssaiyeyx45l0feddec71u1gzek11ak37tub9vt3y45ps0z1iedmr3efcjv1vu8mkbvdt80m5mpcsam18bd0rffvaxvgq720cjigegcbmhyv9463b4u9ym5hfqbaq4n904pa58kn8x09z7hlz395wbn4ab90391qqn1epcj83uwjh5iqnerd7z3njfqwu4jvwu8ct6d0s16dyo73zn6fy81542gclf177lllgjo7fdfrrjffgj1m65maafqsguqon68sw38hvnzgarm9dnu9kw7ir9v9drw2te8yt4o4jbs9lmxbhpqzx729zxtjdz6lxf7pivgf7xrrlhbas91vxb9mv9iiq4am2uz2jri1pjnff0fh5wcpeak60s9iqre56v7sd4ofumty4kmb5upjw1el6wv7q68mcogwr5o80qtv3kzdez813rpz409tbc8tydx2wjd0tissmx0jttiq9zu4mmnrg8upbhhsea122zl6hph0khop9bz9foct0ww4w3hef3jfizvpf0uq2c5yz9ug4xt7gg5sj3o51pu7oxyscz23339jvqmyfx7oth70wx3gxbnx0au1uunkrlbli37vg3u0ko7d0elb610rzjmep6s5yihtd47f3ed8nt1eis7befvrn8h3lnn3ddajfj5vlgiisfxvk21su647eazxmwlj7tq0ks5knbgksl9boomtpldd4lwupfmq93pob5q2zxxkitxu924opupx07fliye5ntv53ivlh1hqaxbavevtsv8koocx8cm8ro4ef6grh1rqxn8dtp8t34jut2o1lichezwnt1zxysihniwekjhi47x2ytncu94bi8qr5hkbxpre3uad87vk10i57pbph6vhrkgcv7wx3ahnyqp4rascvxjxjak2im9u3fns3otryc0tmla31wrh7pr058cunwe4h84msph66rx8825e1czxp58oa19xgotkygl5ctdhhp3x7b5vo5g0ix73vldbygmej69eru9bk1duyr4hmqphhx7kpr13k23vt0ejfq5oqow9n0pyu6nr16q6bbb1dphl4we2ms9ng01nqoa301huttm8ssif0rqc1p506hhk9nbstk46106',
                expiredAccessToken: 1030975093,
                expiredRefreshToken: 9185029043,
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
                id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'itwct42ib1du7q7688u9i7j8sw60ca57gjkzjzoykmf06ft7o32ao6vry3gh4ukf5cgy9pqspxhfjejlgybb6w3yd8n7akcg9glxmw77rk14ub1lubyzihy6bk2hgm933o5hfern0ykrzetk6hw9p2wbswhuqfvb6io3jf9ktdu44ru2cysm6qp3yirpi8r2z67atv92kt04pyx41h12zkoxnrxb3mg26vw9544j6jstzm8i5xy1mabzv504xzx',
                secret: 'fviesrq2ynxo2sbnzsp24rciyz9xux6hcepiuq72dk48e9b5uz3dl87wfhsrjwddutiiaffnqkagehyme1x93k6r8z',
                authUrl: 'k97bb4c0cgl8nf3jq9hkny6al3ltnafc12cp4koqs7u5bbsfqzwra1dq10hn00pj89jm4mh8botzoev1rvph8g91h65fw6vtkv93xgbe9fps6nut93tdw2xy9kqlx9aog1x0ebaqlf259iu03w8o91kazyp6t9twj9ak1675v46crlb25473wdul6eo3d9plac2ylff4ktel4xotcstb2qz8phohsrmi5gog3yltuwelhq596z4ic6jg6ns7p2fbvbs4otvw7urulnga2t6sw65a4uye24n3rjmlp259w4gwfji1of20p4nac58mgs8zox2dmqst3apw4wpqxbo0qry42jpknm7k0cqf55l4ppx5afvbifbob0jtaia34xozyvyabr37jm7d5fa5pbq0kmuoe0fethcyv0swd5i60fjns9iqqmz9vi6q7raj0ivha72xug09t95hmy12i2r2zh5hddebktarzbyxsxzx6l82b7vx3po7a8b3qh807m17yy1tgj0l5ie9jqqsux75zbv2a2kauf5ttw66scuxonvkjal0ifikuzar30fkz0mjlr1wrk7avpgl8l54h9ks62p9k0xb1tuwjqqjhhk3vfqdj9kk10rcqm3nhp2f5fhdu54udqg8twduxa7n11cji5g3j1qv4ehby57lqvets43vpubjj3ye82yo0lm8a4fzsk4j2m9s0tsp2awpkpctnugojie6943zase8jh0qwpaq3fm4bh72t53eyo0hukgvlfy3ezmj71gkpvrwr2j1fxtc6ngvz4pqdzdumz7kgm9qge11amqd1x66lke34cble8qkbx606cez0rwnflz99nh1dqiqe0zxya5hcz5ywthrzxsbc70naoyugxmrqiwu5eoco3vy8uizklr4dmplo97zexb0hle7lw166hhzbg7idrmwc60nxr9f2oq6yu5eatp5oj6z3ww629ernxmdxzumd2a22w1z427se12i68ms5qh2544rnk3nwhjlsykbr7ahv7xlju7y7t2tuedfhx7ubebi00um8n7d6s4zdqy0d58mzc88k8lpeabgp3twf4gwrqdvbbp038ji4m2gf9myjht41d8uphrejkc2jaogo9qymgfidt73hd2q10gcreo8hvk5xr83fwhtnvv1cqjkteob8gdtvidnxdcu4xpacvjbhy36yr1yooiptd3nulbj77zrbc4lv0l27mqiqhf1pgmaoglhsshcnyplusq32avvr3xk07mku3ompf0xtlh0i8dle1rhtlasekv6f6yuboq07xz7tr149nwxcn2jb8r9fl5jfsc3xqoq8z2c6tfdi16l0e58pyinai3e36gn58y83cq79htpkucmjukacqe99gya1o1mzded76i03rk2l2xo05zs3s2yvl5jy69lp180ardhggt2gamptsh4hsjh0tceuz0i1q0yiq5wmoot7i6hgzz070qndqdfnzhk2yex15q8bjd6542xb5xd9xjnq22nk5e35pmsaz9g8ruqucc6vboa4lg3k1iyahp9tz1ghx5olj7m1p0o58l9renltu7jsimzrn3vxtvd31eolnwuqmfrtp3xdjzxi8zinio4nhba7yzubpwbkyxe212gqgvwyux8dfx4wtnf1e63xfijmgi98bi5n3tk6p3fqpszqxrauqdyqmccn0bfssr72t7u4bl67hccb4kj9x6h1z8ya4m3e8cwdmqs9n24p8ru54vwo9cedgq3z5m4ovbwb0t47hoeaqu06r7z41zlw109v22pnk32rd4csferxo2nx0tqgrxlrad25lrthz2aejjmjwjf6r0pmo3nsfznh8309zq2sd2mvbmb4bo3a2frylood4u1ao4yfs4327ui0snutktz7g494z5i1lmqf5p6ns2dxytdteau4r8cj6oibmyb3iq7e6q5285r1nonvb010szz5p3ztg1j5qhxe4jm4cqqcpcfb08pi47d9jk31spoi1llx3n3k39ws8gwz9qk95sroi1gbaxo',
                redirect: 'tizn6l4qjcz6c45j0m6h6grjde25rp780kgej8jv2izwn7t0lahknnn19auwjubsx0bg9mefrwhij4t042t8cvpdmkss9wbp7myoeyoezuq66axat9pfpzq8iu5bdvwsp77jhmwnnuvyw80ibutk5r24iuamr1k7hwzxu1vzsmpo85iid25plmop2gnjrup38f0xq01u07xu04eqydzvcxt5dapzkvrt1gmp604fw6iaznk585e3seu6u69ztjf5g202v4nkcb2ng3c31nr9s6ukchu0x2xxo2dg1sc4hyy8bpbvsbu3cz71y0y533pun2r7hget9511a9m54e85n8lkvyvu0f58azq2iqsl8xrym03u96y30pr5q4g34rvtct4tyh5iti0n8nmaipyj3medfx7xjvokpngc7frpf6841tntpxx91zfrv3k5exurvd6gdafug6eg3hbaxtbdlw8pzcqy0paz8kc8tb9oitf4kfhyo30zf8gt5fah3hz6gx7jqoehoro9o46ooee2k3w6ubvgeu2rt56609yd627hyqutcsrq5zkpcb96ynrpmq2almytq75fkm6w69rnkrli7embp06d2emwfwvgl0y1dea1e1fodlflze5yzyv35yl0a0ifyhjpdd7h5aylp3rucapn53xr9onux0m3g6fnw8frg8ophiy7jdiz3ax5dl2w24ojdvmmu09jale2zyb9vqx15zgklajecinoun1sbe8kvo7lk913mn0fi5n8cxgmyxllhjsc00b3w3jkzmh9magz6nacgmf1wa1mh2cs53qvr6ltjo0ykt0uf1pk24h4u24kectc6o4ihcy1byrfbr11gppbnrty7ryl0l7dh1jsdqzg9lxcsj2xpz1i1sid9422i5yjuhaf3sx184ws2h692l1y2ipaq231l1grq0rc2la5hjpoor6rco9gnb3qw2mwwz8kf6ejkmq39dd1etdmmz3o28tjbjn23fmfl9wlazgavu5k7y9fljff0ni37d3574z83z2655l0tbx80x5vndqm78s9dsoch36zc2plwkq9vk1qrayyzh5g6ys73zw7qafrtq0drnpiapw1c17b1jbur028y2lmdbxlmg9dog11vubnntt2n5s7tq4bmzbukk6ciqc73szff3uw4827isw5skzkg5thr4th5godbt6btuo414o01dcfhzje9w5l40hhb57jde3bq1x6vrw7g20l9j5menxi8hnc4ra5jmh53nszw5mypectkljk5chq74zefelrmcuz2k0mcj2qhbgg0mqlhm42ypt8lom8tgncwm51entppp5vsyt6xksoq8u9xqy5r44uscy65rau649bko9o7u4rcfpv9bf9qo5gvba37pbi5ixsim1jhyrllhn04mlj2i8kwp3kt7jzxlp1cy9m21khh9pgp2y1n0yiwz0aaa6obor08bpgjocpr125vps8pw4ko8a8gnn4xt0qzrcohlcm3yrazk633ewk89ogq34hszi65wmq800bl514qztbhp2tujrymrce0plbvyx6l9428rmzz2qbx1g9lxt4wcstbxyvxx6hopxsl00ohqlbl7cgh760f6pkv1g55tv93t9phutv8cghv1lcsg0d6uq7lwzyw7337f7celfhzpxwx8pvi74qp1xonxlct7kgt2hg2r8oirbdapxtg4r286ldxfuc6fbiu5pxmfx6zenqncn3o7ays1wmegmm5rwjy6jckntnaz5hq7ao408twd0cjum4o6o9qb824ujsb26w7b8n7c0vivea29quwibjx5aso2fwsidxy9j7h1p3w047znaof34elbx9jkdd0akwinrx4dit4bhlzfd3xxzdbqs51d11hm0t6c0wykzrx5fl92re88o4vky2zid8q88td52u23k80zalbhwb22kphdt0qhev8uxpac5corvi1ehfjeqaox6ewia6yxqgnrf0ukjf2uceoupesn83oyfxzwdh2oa7px4tbsaelzljlz09w1ss',
                expiredAccessToken: 8194907734,
                expiredRefreshToken: 2377149065,
                isActive: false,
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
                        id: '49ee2699-0410-48f1-b6e1-573cbf42dd49'
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
                        id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ffe013a7-8848-44bb-97b7-538b9fa4c3de'));
    });

    test(`/REST:GET o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/02c0ae44-0101-4eaa-95e6-79c9f5bba28c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/ffe013a7-8848-44bb-97b7-538b9fa4c3de')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ffe013a7-8848-44bb-97b7-538b9fa4c3de'));
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
                
                id: '39d1614c-7bb6-4b72-bdbb-80c6dc565014',
                grantType: 'PASSWORD',
                name: '50kz59ry7i8eue6idbw8axgmmeuq48sl76l9xeo6qvdoqs1w47iw5l672ai2ydjjh07x5vmb39vkm9rwtybljdyi50ei4mkpdad8ot95ge1gpqb17td8luj0dalsy5fxs0v2c82fxx6f2iw63gy24lokx4bici4lecx6quiopfrmy8qeqhd3enko63l6y723wz5fr75a4609cty16bdj1fggj8ixuzy80zm1n6hn5wzpv8kyueubo5p2i1g4adq',
                secret: 'r1oq278v0xkvnnodggq6cltb9mho4mor1h5i9bmj8m591iedi62271z7qyro04ig2qdf0m2nznau9etakj8wwnfyr5',
                authUrl: '732oeixrnv45zkjtprakqpcrf2y84t78yu2z1rz3foz7x0qlgtuizweqzjfqo7v1fh3obk4ey0xsyjmqua05t661318rfw43nqu02yfou71mkdknkl5h3s30ll2o3gs2ilcejfuq83a7e4to2cdshjmmyb0649scwjtiga7rm4ddyp0b61508pdrwx5heoyfl7572qzjnqv2wi6nctpowqclvh9gcgg4opu6dk1k9mna4gcrurs5skuhdke2zti2q8ngb7xs0083h1zjk3ndksparu0ihoo7xf9hu2f5tyzg5jsbcbqdmklfy4jwpdsjkiu0o19d2qw68tr5j5xcwazxo4gvmz9xa44t2b1navvevpao6430d22akvat5yr9209vi5aq97dmvvlo1yl3kxhrg7z86zb1v5675ce41c0uom36kkcljpx36ggbci4vm9gl34h0qro30dma1vk6wjsclplcfi7hswo0u0px1ncg06moprcx426vj2bpajq009u6jws9e5efgdb7vvk2bcpebozkzcc9d8uu2wp8orbjsab7z9d0x9668u2d486kx3gr0jmnn165i6is8kjlponssdfbw6ruqylt0iuhnukvn0xlunsjehfnqt9s4184id1jsbd7l37z1lnrx6t6tz6k3pnsg2urzb33yvxodlwgk3l2a048ywyt4uji4afcw78d4fy2tcwxwx2j2r9bj1h474bwwzt3556b8fqyh5bidm14safs1g4glwtmbyvy4fvi23vnmhabij8nm9spfnoag5c9xnp9m40rle4x54r3piq0fowx1dsr4pnzmk5c8xajt44j22zav3dbeq81hjh2e6uz6kxewb4cmqxv7fgrbaun4wgukpv5gsbj2rcueoedelh9n1azajl7h11zjr00q32h0b2pp45ce9eg5nr12hy31mdjrdpbtato13eioamxkwj0rw374ovjxadz9t0sd368e3ktvbrt4qzqrqfam7gnrozasge3cshou1scclp863a0m75bdq8i00euka9f49p6ss3s1s34m19i13akx8t3lp9c09ilj11xnq76dw4hvd5zkqm996hcuq7di8dzy759mfbbwq8v1qdkpp1zqgxgc5cl13de04n7exftr78ad7dti1v9zsxysyph3mnjf0dwqhjfxbjxz6uwey0xh3e2m84a4hamvtscq9i2d9btekfavx8qfhbsphe1acc62odbnq9a0dyojalm6k2908x7kfxcmehvgx10oypoojv5ywowdso9x2bn2qlad7fz4d1xcx3vg72m8rselnwqpbju8wv1684cthyfpzvic44g2efvk38ez220hqakt7je6wkjlw018mi5ze4yz46l4skdi9g9wmgzv478xcg819k29xcjbg2936hplxua19vhdfo34cm4y101mxugnw0lmmb8adi8ianfyfhggzi4tds3vc1ar6iwqg692w2m4g7npvqfb6aysqtbkz5mi2l11l3jzb7f0quvbeyv53kdnd0zk1df1il3dmywpprz3p7p7jjo06lpjfmxk3ll34r8lm14lrkbazry65n4ju48ytd8zkrog9ch64jnan335a4zevblavbq3b88f9v20semx48p2m54qlxmdu2r634hvu1wbjh9a1nmofml11fyc9bwjacnfdruyamse2yilqsanz6es8b0f3uwp6xehu71v4421o9loxtuis5rgs4eui433iyeswrfocatzac22asinmotj9dlg3vhpkjj2xno35cuj2awjv1ijvzvhbkdwmu0wra4mcvmwsk03vlq18sg4v91mwzwj0my0zqgj3ibf6qk3q84ev9zh1x3vfgd4e6g9o73833v0vor8bnbd7hszjzf4y1du4zv7jino4ebrvrqj8wrpe98dba65s9mymufdu2tw2soxx03vox1qw5xezq1vbyfv0c1de0l9svew3qicrum2pxoncz3ktxmi2weampgxcrl3s6vecwj4w7zrw7bqqezon6imvmz0wtd',
                redirect: 'pyxi2jy3w6z3braym9v41kn0jqbicd551o3ih4dxcbm9fi8n66n5tmuylg3f2brru69xa8mrw4z1hwokd788nzht2dedjti6vv5fcgspzh6tekuffod4wu6kpozcaaj10q0phsnbdnh86pcq3x4xx1iw85nmgol4mc6x605x2kwillqvf2fueuec3h297w0i1tu16sbksc1oxp735vrvn4mu1sx0itohs9i1cfpr12kurov5j4b47f7fhcwzqy1eai1jpafewt90vgwmfeey9e93y9ip1y36r0gfaf5ek1sf5x26wipefso6ibleqawr82kxho2bft6yiiymgz54qw57dm93vvggu48fxmrcux4efc68cuh76kdrnrlw5vhxievyzmlkf12gwuwc31mip1pva0q4d8fdwho8ym5jgrs1hrlsfq39b14jb3dv8lmzklxfn1ibtcvq0a97xllpcip0q0zbj3qq3s7bw6gb55g2axxv6glie4ofrwb3rq6o97fl2nzao0da88kjbwctct2xv83ce3yt9x4k66zgy995b370brixqz2tlhxrpi9wk4n2f04frtjp2kdvio9nojhd879z4dqb3hjxy9wgzg2clxx7q642gshf90lxkikm3b53af86g81rh6it3trs3ggax6ofx4gbncc1tiv2bbk7clu6yoiclb46k4pd1hhjluf0gie2s5r6af56myxez4ql1okesssmey12od8chfebsarua980ed0lry106iadv6azs0t7ck63g1udmtsl1rsocypfnc44cljfdp7d1egp4s7h6cgka7183e32ige42jc8wb31zmiohm8qfe62c84fdotexesfrq6k396x6zh755gvdl2v6gnmxiusy83l7gqiwpn37e7d3mwmpweyukqkxwb78uqaezqyklt7ing7i9qxneoiq3povwjmaytd7zecfgyc2olh4tgiylpqgf70m9mlc6rxcjmlipx6p0ul58nn4kf2pkb98ueqi201bt467hkqrkwxh5kbvqfenqwgaku79yp5e9hsjrkyhw1odc3lsqe7n724jqzpisarkotinom4egq6uqu77rfjy5230m85yd8euqlmeyuezg8lsx5qvog58qnop1rqg1snsva2hkys35v88qzxx39zhtthsachswmzhmgdwgu3u86rli7trcjrbwj5ify2s128n1mg62yxgsxt5n4tkuslmhvkea2xejw21n716rqc4phdhvenlfquhjkf2tqrt7huvgk2lavtovtvwf01r81xv76rajv2zen0lnemst7ddg1dtc20kdw0f273ln807pmyw1x2gzbyz33k2fd3eytev4u9euhujcfaua43qbue978zbvjdd56tgw1lex1rylglwuw02pueklwnzwy9cqmmczqqe08x1comxytw6bey2in8jbypbk0djrgqduiguaoc645x6j4gv42ga02x8cun0edpdy3989zb00hrwgthnc74cjcj6rnt9x1rjv5eyeq4vmtq2oswl6x7exryyem2etzxlmz32kvsfusrjpdnudpqiw1tt8gz4trzeq6zw5bc0zgno6jdmxxz5o73lnaya1y4dg7wythq6kytq0jiwjvuu5lecygj9k0a38kgcbqg0qtyaljgre2pyoh559jbtsj4jyh883stetjlwjpojaqb6awx5dr4pkvbfat3wqb9y7iz6njhfzxy82k64u6cz9ydnyge6kd47bd9575jmg563vtrbv4agm1wfm4x5lszp4a7f8o8r88qw03pzloq4ak2hffnycy6rqued92gah8xew9ne2tlix64i8ny3x6j5ac4wvvgj1ae8ghwyysbwwxukhzjb0eap801rkzhoamsx49f43txsufxfgf4dm95s33n64rw639uv1qy9ye53t0nm9tdee8vsde6lvniymqi9na864nb4mzugn65huvl8zoabalaw05gkt14n9nyna10yswyiijdlk2twr9t6a9yojugqgynnhpvweglgdid',
                expiredAccessToken: 5440846201,
                expiredRefreshToken: 7895202979,
                isActive: false,
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
                
                id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'nmvbq6pgfcqwfl332jqds84518lm0ka6vpsixfaw9dvnz6bl9gcqkiayca9vouk5t207p04mvkcz6qdyj3vpg9kcl8hhz1240wiib6hd5ucbqpbufh73my4zuefk1nfkgfceh3pzighfayq2ooxczk15wh37ukti36ym97e0gpr7iktqcetoymzp4dq6s10yrlnhz7hgaiefsctranxyu7orziyguwxwmhjqw2ttr9x4vy8bndt2i2r3dh30t71',
                secret: 'ibmt4bte5i4gcqvnxo83x1bn566f1fn4u71526x8mh3diy5rngss6oeysqy3zr6ywg3uczd1ff5b98ckn4fkdxt8e8',
                authUrl: '0tk54fgcr9v2s93mz5u2t9ird9e9kontt5qtbahrb68g3u4iq32dbcu4br935e1vwj24ksk0g56wlacq87ll6a31714c6sft7fo76ksrf1xagbcr7qakdei4q5uvc59y3v758xz13ogyugsmilk5whapbnc9u3df4i2x7jdl40dxaqfsti843dmf0ytccf1h0c3zxvuvbqajweuev8psqfjr23dbjxejpp5zgeixexewkku28wlngjatl09qmz9q4trkp7pz03f8w1k1d7ffcwohanmlhtk45qlpe8qmz2y92y3lcwtj7musipff1n868u6tpzfy8ei2mg9xargxythndcm7go3ztk295q1ydt7orn0khtzaiq336zc056afqxjdxjs4gt9gl8l0i5qwlhe31rqx2lhe5rbdp1d2jy8stt2f63n3fv0wtdylq9ugaq9wbngix56i2nentupkwlhk03jtepftvz58estovn4bflnr9zkiw8ks4zak8crinm5y4gqu8r84o7mc9scew8hxd67z50kwb38payi1wbhsjlafztqhp0c7rhj81py1a3nl9bf2caw6glxjstmuxlibvryz7xbo2dh92db10f0eb1zc92mis9tjmdnhuba8kmmdvj233wlmrwpkhgxsuy0n4wvxkbbtfwvy8hgpefeb4hed8wniuaq0xg0hqzic7wcfk4p7gsf2gdymcl4y36xm53nw2zhx7ihqptbqrmh30ltu6qusjgtt7yhxhy8st519sft7zila61fjcgedou2nczoukpllxrkbbmx05k4od64kokfj5kczm6rqbchuq03xy0veayhmn473blczl7vb10sb587kovu50hpjxx8s4zrt0vbercsp0y49xhmalsr1gy4uaofwgvq07w2ewejtzw03kxgwsslt8lb5g1iodym5al3ydd4g35yrljaqb7ynj7dunrimm9mkx0hy5bnyjx07mjgo6hsuetb0zjnspgiytklusao7mgv885kggba9ccnpxu07pzaq1vg5ns32tfe75wgke70kf45ut2s9104akzlh177wvs4og3up1iiltgkqmdz8ixsaefy7n36l7kaipmykjcq7d7v5s4fe589atgy8qbzejtbwxol07uhxf4151v8owy4peojphyf9lcii8rv7u0y52priqnw72n35j45mdvlj0s9j7ufyyq8dhj65474jbhml9m1vc2p42no7vtu5psun47k49r71f30qmfm4doupzqgfsv9tuechbuizej7usdnhvf3cy0xqr94wx1w2fppac54kx6z8mvvwgfa6tnayyjrp8mx1dugqxvs1l94ddqddi6m43dzn0220f17uf3xnttaa7avh35n2nvfovismmlrrnyufj89wfm4l7nvivqekyr98bkgddf7k5rvqx9c8bswqzi2xymnu0dngx99tvc2tdpabzje4b5ocr7p8sc88kabyy1ccvozsw1rny4dcnau1v9fxrjldkjqrpcjc7ovcc3ntrkijld6vbv65m0q4ngr786jrxumqzudikn1f1p7d0wxo52y8ut2xnubto0l16u28kbwthh3envy60tgj33uh2y5cyka65f14ap0kd98w6fgy4ce2dtiryhyp2t6h8z7ow1ajbg18xmy76zt9vnz2q3viruh04e7co7gmzhxlav4yl47ziied4uy5i8aekstosm5bha2t2vvfk50q83pg1twre96iun1yha7n32xqqi85gvwuzvhtji7s99h8unrnrvoi0i3wlcawkcovdukoydfraeeeji3bxhiygont4vubbj5eotp2y40zrmxc6z6pwblw90uvrthmiqeqvlqet9nzjyeaj3xva4n1clike0mb4li3zvke3zwfudcvkd2zy4ifzq8cpm66t0p3h7n0pppv1xsy698azy3osrs8l0rsfdg4m94xw1l8m38px9my381c12qjmiuaqr5ykxrfj4m61cm7btj2m9zu2gywwnwdwzc8asztaad4okobtzgs',
                redirect: 'jxttfszolnvt38gagqhd7wymm493owbsxga23oyd39fpu3ede3brjzgyouj36saigqeugcqsbmhfe28no5yy5qgt3w80i33xzigc8ikujop8880edxb09d9hxm3r46x04zzi1rp0d6xq6skeitt5v1jxdawyvn4v05edx5nepwitux1jybxkhcuppjjgu4qt6wkxu9t6b2gogc7hst4q938g84vmn72e9suhtcss4anisaram00qu1mv4k1l8p1sflk2u5ds5m4x2krs9m7qureepn0osg2vs5mm9w8ket8fefmd7wqma6xbk31aiw8e2wzvj3nhvtvt2d48c0033h3u8mc89b3d6w7twvslpwjun590u0z8150b4pz8y235fjdex89b6gstw8hvhr9m6jwb4f75gmzmfwssmis3sn1iatbf7bfsgfex5jcnyt33nzhy6pwz9mi0qhvh0i18i8e4u3jjhh1ugci321hy0gf16j2d7uea272anzzfgnvwfinqhqlovxy86cd8ablc7jg0ar0k3laqfydnli045fsyw3fyvbvwfqhy4370n0wjv282rdl11nazej7koc08z6l8z9sgt2sxmumpru65hcrx7reoism26p252l7tnb5hfk66008yfv1alyjcw8t266o0p0hyxfqk9xfhm8gbzsv71b5sotqi56n61lf8l0mxlltl1ff5vsob1eu8nsunisjpag1viu001qk4irqfk9983343fgywbx3ecaok6g31fzrxsr6dn8piteponxqdt2v059nncr6gz73ampr225c44ehgqij95jorns06jlc6d5ire1bocc099hgzhxafawn4m3hqkc3lwa5jyjm6dstnc19of5cnjpol4zvhn60vsnni4capwix3egvkb1b3h6aostku473umey57prz953w2g49f3ghofuzg5o0uvj3399v1dy0ob3nih3qqtxylq1bz9djjgpcvimawk2qx3pvzxnnnr22xrl6v982tncf6yt3iiz4x1dwje76nybkz26oxcotkff5e47595watdegwmliaeiz1hvudmz8ksqrfpsue5lutstd0w4pbkscbb4dew16am8rrm3tq1maomgjbowedlmzb5u4jn702gztzb1f9odujeawityy0kp441jgqafwibmpyxwyqcetwafeizmyrpasxlglsreb8mozhnsyfg5dme850rs3x5c0zmeyzcxixkrwjp3tmsy9mbq718jjf3ruimgkhc4ljd014sdcm68w31nu0eza4pvy2zhkqsuhon6jwchmqcgkvyz5kfvy37u24wvtrahlikmpray299rrysfs7nun2f76igvmccghm4r8ogspaqxnt9351wsgkeb2wjdcib4vbms7ol3do0o2lbh1het4cfnc1v77w3c8x8sybhhyg392ne0ec4vctw1ltrtmnzm66jvwmawdpsmzc2lhaw06m2s5bqojosayl74i9r04sgleu4lq7f0fugerc63ij5q2yhcqy5b6i6fb2ewkz9pn5vkedsfqni2e7eopjogf7b02ddyylbbl40g1e77udgjow8b3be6qvulkq2q88uq9n5j787dod4gg98i6e31fmhvohl72byr495702qhbj5ot0vyyo0tz7byq1sg377ggjvueb9o2x48tplmuf7llnthxmpcn6sycnywx8diudyxa0v0x8uiqjv13vd7wsbh6fm5gmr8l13gc7ihd60iwaqcmvw3o9u2nwqkro1mtw9qc9eqjicsmkvcoxcstme4rysmqow09wfmkgehcbr79d2jbg6wlrcnge0h5i9n3y3mfbp3vj0jn8e330avkmfhejj90ix6gpt3mixz7ashb7zrpfcd1ktota18fka65obsnpbxecoji82tlkb9dxgnpkxdkeau7ozmauuwgzi53wt413529ithx3tfagifog6tetu3is4ltw1pmmq8owjljmqxump8hyikpb67omz8hxvc3k473uhiqjxapljj6csyxt9h7',
                expiredAccessToken: 3236688274,
                expiredRefreshToken: 9129093771,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ffe013a7-8848-44bb-97b7-538b9fa4c3de'));
    });

    test(`/REST:DELETE o-auth/client/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/92fd4d93-cab8-4925-9532-d4d066adc9b4')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/client/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/ffe013a7-8848-44bb-97b7-538b9fa4c3de')
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
                        id: 'fb45ed39-6c51-4691-b7d7-4f576c999e6d',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: 'v3lyp5rr7c613tfcuquza3ukbu8wyp52v34tslskgwylajaohifo69d6j40vwfjz27k8swm6ayav8d6s0msuvqioq0wiupo8vcmclxm5oag59kbl3dy7d49sl6t0q587hnaedip2w0nj6jz37lbfpfc3z7irf4nztwehgvspqe5j2no3sk569og7inz5zyxwytwv2mo857milath21kfthk2s9i5i4hffl1a57vr6wlvpfdk285y7ipel0o52wk',
                        secret: 'vo1kuo0mew3dskoprh6b581k20efs6qufokev4widfnsuf82whl42gb174rylalgv4030i6eqrdhsn0w16d69x5leb',
                        authUrl: 'kz0gik6i3h54en73fqykencapr5xb7t4zv5uv93ic556ssppfb0friajwvizhyhid0nuvxhbgz9jxw8lbenswb5wwvrefarnfi36psg64lhbpdpsfzsiq71khgppe3gq9aaj9c2imt6yrrbe946r2mdivbguh3wjjc91sbytc98ojqn6dxrodopx35wjpd721ony8q3n6dbkf40kzfjrg07sl6b75wxgj0b36k37okyc3649cv776c5a85z937zwz4hwcg0dn4col5hkc5xza9htd3ffsgxbk29zzlezur94m89mako3khoj10pknfyelw0cf77jilpu7hnwrbvg4kn0tpu80ueizbum0u75zg0od7ywnjggz7td19rnghd7vtu5jffmy2zje91atblrlc4gqmq71y3fjcgeob45zzxdkbq4yo92ia80kha77i9culiinvwh6lt4n7b1plfvp5pd26yoklypxouhauihm21nxy2ka0txezw26wvf3ad8cqwhgmtqzhxqhkjkmupryjvltvb60vyl5jg4x58tiufsgy6hld4npiwa9xm5044gh28ypwjc49lgeqq1x12aj7fdx3qcdmt6gmhd0bll3015z1c72p2j4lpdtoe5wwnef0vcwnkojvnd3sao5vbutxb9w1nardrdlwhvqog5odpgnlz359zz3qqvoymna6vw58sqb2skcopirvka0og4nqgynrvly5njnwlo1v86jjh1tzj7j6tipaw3ooln6ti83ixivnpmns1hfxo60pc8jmbol7blqupzibgsyom6z9phek7yfng8qotkftpnfv61i1z9juwoqn8bln5bgyvnk15hzxh6baaoflcrhi5vrje9b9fcendt7a92rusbcdg0jpvp0m1o9oet0awb02viyogkce8t6ubatdqzr4ynieu6zkoddh8tqluthb9bvpkxg6hm4tke7a690pu2jyfz9z8xx7rzvqp2adz1jovu4u13gh16h4yd424ws3ssayhis4y2hbfsc366v4qbnhfur2q6tv8y4o3x4mg3lmk5ggei5n4a3auzoj1q86xje9i2420lbizul466i3q3xiub7cieujuu0k9u953ykck7dogdnc8xe6dhsmapprfczmpg934mfpmh19yso5nrm48gbhjqir0vjbmvqxl5chufk0dobfd0nqcqj5k9xu1aql1dp5a724sky3wti3gsa8k9922hjd0ka6szq4ra0bgthh68u6eobycvipnjiv5l7rg3ytjl8v2vt0oup8vl5ryb7khifb0e7fpegdfmr3u4frkppot932xmdxcltc09w0ge088xu30y5u4am6l2hcssyjkqpupnnwzdrv33sifvq8pkklf4yt1sc8ff9tgsggzoweeckqo268tszz31mfesq6ijvbf7o433lw306xm4kd5h39m8sc9abe3tzxma18gkg3cxew6szik5silmwg7ds2a61ea71ly6jgsyzxhnirkw3umfr860vbsw8ra9pne60zvpbp0z0rmnph4bwni26o5muyc8j4zud0folu1b484blbjm8823b8tjlxo6pchy9js4pziii4ku3szlal3kv1iwe8igf0i973k7eqc0zdiv061zkag8xraa50epr088yc2pvsproekcnsfmttb9kah38jjffjxz2bnj2gwr9w83rllxstmmuv70nsujpwne0vdfbk6ydo9b7eo68hn8ytw2azsq526prqkphj1azypndig3se39gz6dvgp7glcj40fd4c78kfr1zhutavg7pnwlydaqc2c65cefrlmt6zn7o47pcj2sj9pe7ieyby2gvgg7ca4hqiuw9r0h62d231ssd1ijpvksqx9z7xuiyhsh45bwd0m2zfj4u1p7uoqh3m0edneph6desz66kg0zwi3tvkmab4864iuf1eoi973anj46dbfsvb6sb0q2zmfw8c9jzmfqifsw84xiamuhuocl5fbzpkzloy3s9migk60nq3g1pybl4i95iywozitc',
                        redirect: 'ugzt32aq4tqfjtdrhmu10wl15zg7f7hj9zmui379569nwd9i56ip6cpygufee9pk5i56xy5cm4b6cm6ta5a5htkacmp7i8h2gmj67faiyv5dah0kqiov68q1vusinkn38ak73owo83djtzdmuweomsmjlyzjjv2nqc7kyvu3f9axedolpeblvl5kre13skpkuchekn2il4ic4v0g81m80d6qzgad8xiuvoi4dpa7iy2uou2q8k0m045sfs8b76utlxkn4quzw47akfpu5qxen892h7bfaipt2n6u1ugbj8zegi11e3m7ze61dpeg8jvh1001i28ady4nggewiab7x651w4pfhoeqdyvspjf33d8on1jqd9lk4nq8crm9yir6gh43jatwp9iprp1ym7nxgurtr880hnidn4wofg5mkjki5jc5ic0r81chjlouma7yq2kc5zx2ymouon0c5fb42d5j6q25okcf64tyei9qhn13dt21o8suomw98tk677e8letj4031pp4d3ax2bamrextd6t67cr5nocf97b1r9kg4uu0whmthlj73m9kjaxegxkiki0wqtpscorztmomlror26o6o6sgpoglo507xrs0627qh0zovlyna508m5u4nqazb0v3avfuoe0w2td4imlp09ybxm70hirxykoxxifdlyyqb2fjknw6rg8dpv52m75xddzjjeu5labftcqv32t2lato31teacfj6do7nq614tpy8fmxl9vtjzxxueg5f9p28ib0is9wk32p6p7i4r74ka1x8w3ob7rw90f3itkfrnkmc9ms4mvhjgg68j74ial7zbthb7nvue16liayirojye1foqdz1wxis559xkixi183npedl0rvq0dfm72scrxfyisbgg3y98l8nxxug9f996v7i1qrc4ydwz6pjxfgyke2aa5gzgmkrzrmmhsasxfs2xu9xkd5ih71lfv9e6v8w2slg9321fu37mhjmvuceeikrarom9av7h6wp4u1vl2t86oi3dhx12r8jnotp3asxirgfl3hd7xl0v6qlb14lkljyzp0kmdk5gazlnxinl51lyu99ps377rz389kld1037vpa25tqva8s9l6rhbqaj9rytbjltwcxioehfk9bbob6qc6wojf2dbnpebjdt8s56d76e68hers3vb3a3i5a4kmzw60m07lziydvbh06sc0yh0yd3xpnfr27eiifqgyp365go5l1ldrytme4vfox9m4e6j5whaow6vs9fueoqcr9s3e6q33k54f3j8bxe7jyqjxwf4co6jgtlrljfs3e022miema0kpplfxcsl7ddutlms3om9qxj389jo8mcd1sez58wjjdnrvpc361siv5u2bzw4yklosy44vueq6hdrne4dsmp0icexdk1gziwq2hoeklem7xwf0uad8tmhojnuguj34uiedvbp3zdwhlp9413g1ip6azeglmhscjpq53ypn17e6alcp36gmh1x20dvygm31dwnk9kph588enx20rcz9xfdue7ihz9k8y7rojqlc0bqusbdkg59tejusffj4g2fo5bhz5zlhnemidom81medwx3v710xohwnco2oknl73y2fnrmmoihukeu7hugptzh4poxjasp3wb5a4yqewj0dqz7xpmo8s0hlatr3kt4l4pl8tpa3xrululag2z5yuykzt2byba6zeuln6kbviilskbn75odazj6xlx5cwdy0wqin23bevfup3fu6z8nh35855u7anphm3m1henhvpaab8564kgciuq3elck4yj70hq4i6jcaz97qi0tfn5badu5hliuujv6vhv3tofqnpat10vhp42n1hl4tfkfvv93eyx6avr7c0eksvrylwg9vwpicavkhpa3jjf1jxhwk76fsw6g4lgr9xars1990f9v2qsq9os665tm1532qsxu5936wposr4j8gnlb4fozatf6lhdr50dwyvmzau6orrowtg5ldhxkcdayqszlitiri9h73bdab195508ur2',
                        expiredAccessToken: 2521241703,
                        expiredRefreshToken: 1641256539,
                        isActive: true,
                        isMaster: true,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', 'fb45ed39-6c51-4691-b7d7-4f576c999e6d');
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
                            id: 'b585914f-a3a8-41cf-85db-f535bc916ca3'
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
                            id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('ffe013a7-8848-44bb-97b7-538b9fa4c3de');
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
                    id: '5defb085-343c-4d3b-902a-95d42b180191'
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
                    id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('ffe013a7-8848-44bb-97b7-538b9fa4c3de');
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
                        
                        id: '0f0ee97a-46d1-43a5-8c13-b960218fbd95',
                        grantType: 'AUTHORIZATION_CODE',
                        name: 'ncyh9r7q0315lkwrbnvuhwc53ow1e6sxy2hswaevf8gm10tceotx9a2xq91f998kdwqq88yaff4cnfgqoportli2qvjnzt1rvhbwjpme4jsnxkjy76bmi6a7jfq293sdshdl4cz8xw1wzmy6fz3tmgbrfbmwv08uib0ytkxpojifpol8mt4dxwcyaaso7rudq5bufkyeevwlb6hhvvwkl5aey832htwd23dkcnv64hx0sf22oztcvd1hau05dvg',
                        secret: 'lhffwazouk6h0tmm0ldgebbvb3i9wdkghogk8lkmd3pms0mcx8u4soc33ii3ibfeugpfvn3mfw1imuj4ckly7fup9g',
                        authUrl: 'u1c9iy9y76snnmy0ijxu4pj3in2raqrmp9lfp2jvxb37mlkzjerzvghvl224jffps44kyuk9i8fesc53i2ghi6bb8xf6cuoq2hkvi33aw0t3ptqwacb0a9o5nx4vy2ue20lm2q5j4itihw8ryhl8afy4jvbp9d0adhr2x8o11ckrvmzrcdrmr5pgonkivczfhhi812aa1fiv0rkgot7k8khqs7tx4pb6533b8hq96g5yrsw7qzyr13qyvwhte3gti4e0itl7da9gpck06bb71rh4qo480okq7xmkfsmmt8ihrzz0ilw037v8j2486zicrqdaxblevr4man2qbggwwebmjlnjw3usvzt9ogdrafu95m2t0e1d39i6hvqpnbltelpbwuh4ua3ow5kl4q8f9gz2or0utbcevfe0nqhv8rcylesfeaisrmobkkx0nyhz3q7rld7qmz9re2lobjowcgrd6qs6wxjwbvrk5yvq1hu4re6kkw8dy0cdhul29ugd7oormbkvzoecbxe0nb88y4a405wrf35hlnils33g3ys8mfc8yttcb775b5pa9kwlo23qmxhk3fdhxh0dl68fknou6whijys5y26dnup5ekaw4rh4w5eqc57rz8xue9jukz5yutops8h8kq6o6o1lsg0id74ntbl91j2ui8x8pohe2kjvb29ip7orszz2gbleyzvmssepb160q2vipgfb01nqomp0z2ul57qswi1ofvvathyr5qlilohqqal6y7o4xdczzc3tpoire1em9ysmq74roeg84wf8gtc5iahnlpo66k9zxp39k4ntwwiar9csvkjeiia8z5jtldbugzbnvpsekc2vm4w0ywjpy169dz0rdeebi936yqs100muo152fwl0jhpv8v0dzdp116l6qd9jbnwi11q5skzqwxpbm35yed5pzanut0ianzmfz2xjvaphnr417ezco5sia579pullk7ktpzb9c0l30mmia5pfs2ttk7y0xvyup0421wr0tn3a917u299a2cf5mmyxr2k1eypanemndxs60sy9izf44cwjtvt45a2mwxiihns4f5vppdybqoqcwz7gqz4pxrc0belxce6rva80i8ftiux81ctmc0zqsir0zlzwfofx9cqmrmri510uq747k6sr2hty7yiboztl3dmbvquf87h8vzfsn2gplpyqlfi0hwniu6yw6eyolpu56zfy3wew10w95phbzyq809yyr3tr4p5tdz2tbac1ylqojdqf0e1zowxpc7htytbf329pavl3grx4t9spynq4wnea0lq2kdtvbiplv7ze7lj6wdo02ty2k4nosgwnl2o510kkeuve2mbd6wqkeqbx3oqub6gyuau4jtlf9cy9pkv0wgnc8rzz5ts8uqj92u006vugv3f6ajmh5wba6krmavtxgpla4uq7pxfwsd5jsmq7vn3zyt70573hzybtiflrnhytg8ouvxvd8s0trjp7exapbrq7m54j5wv65pqnc3ybiodtjar6jr5u9jlcupi97o3p84hf30vfb9p8wnit324uetc897qhrkiox0kpkb67acea5drlz2mocb0j5khaljkg2afqmzqt89ox770u6ze3yis4qx51nvc429465lfwuuv0gpgba1ztan8bpmlcw4gm7j59r8k46tpw1c96cz2bi22b13gve4q1u4wge64qzjwejjcmvif66xsl9hos8k2a4kc5hnlxf96v3kxpnf2eb1m4267ldfutieygvtiuo52frrnuoid1e48cycx5dqqx47qb34bz7ob4kpsgpkb1wtaflmn3o9sw0h5bylvho7sjm74al8166bloctzopq9cubthilrgnnxilizz1l06ek9pzh1j4zho6ms6u8dt5lgi8k0q3yjkzbnyqeboo0foguce4r7m5ac4f3udxc0k151usamv0e0hq2avydtq4qx6u0ii0xei39yh245atappmyg7yc0wp5irlo72ieph58la0qdb2uwmsrz4gbgi84x0ds5q',
                        redirect: '6lxncceq5si6rv8a3qzbbex0lfnndussltyfvi0tfw85f5bnlskn44738w1pvzjc48s7hwgnp6oodljwlauzlbtdcc4vnz4urfgmctfkcx2m0sozzrs5u97grqvirfddxs9qcufd4kti5yhhh65ertdxdocn4kol8ukq5022c0mhbmaf1rh6cyixcbt840x5e25y405tbetelwxme367cjwxgbwp8mhbtzdp10bpma82mqtnx5kbm09aw10ckz0fagjpy0km4tgbybk94rev7drjecscrw3gdqcrp89inktye10j4fkwq0yemfj78acsk1bbiap1jmcyt31wffsm52k4krz8s5w0g6cudr9q8w0o2uydlovohhiyvnu7ner3kms9cvyatootwa9mwif0jsuyp5kn2xt9fxxdendjm8ae2wuj98aprpz8bg853t8nbr2mtwipnvga35vya7cnnpbva21314qo8avzyw6nsm63oxxvn3jkeeken3rtv64x9mxjo5mnjox5aexn3j6uoqnd0jv0j2t7ng217kqp1goe95270mhlqeqsuodvb02jfsxbojvw7ms61bt1bgq099lt8dwxuhggwyhv65xcvrzwe2g697sz6po4519onjnvusuyoe73k7xr914jt1ikiiliwqtzo81bgjh67a0admb4ca4encjl2mj5owvyx0ly0mzbwdbzyplntr22g8ckcsalw4l35qroqsk8t04v7ozh9y680so3675g2l34oetuh2ai3jwbz3k0wyn0x61wul34vvahx2659y61qpkv57seb8yzxh7rj4x4f2olc2b2q6nfs4buj2ief8645kkc47pmh81585f7tpdwou7h7kv2weoruokbfm62le29hfcs09pyh24pmev9hoty2a0jo7ctopftlk483s3872jfn0wmb1y2jo9x1quaevjcobe3ozjl3mmh3vc65sll8hkjfr4klophxnr55c3u8b128527ilu2mmtqtdtecslsayfflmtppbte2s465wh7gozt17hajfkqmcgv0ytd2uihho6vjui7i2o7zpgbx74eqcili3o1rfx2zxf44lhrdtofh1se2qxqwdecpbcjsfpqs7vcxqtloioyegqsjyx2xj7q6uk5evu1cbrryjeqi5qaljmlay6y0d8e5ytfk4ft6iq5ry0ncob6qq591qqknwibncqvecuer4si5k93qtigh07wkrmec326zbyi533t43vgww6nzgbvw1lkcax3mx7tizf1np5bd340k6o99vsfvs6xgllv4ekprzkyy6nwy8pferouaj44clonyaj9ak3t1du3pma5z3r01xq67nzismugbqu1qj6tsx5qtv18fau8vp5kuflbohsjaed7319k7g0jso1gd12bzj5v544czy6y12pyud7mo7im75kt1797yzspuqz3hyoirtqtbzik7jiv2x0zh01dblpn7xvlz365at9az3k7r35pwjjh9g7fhq45mz5qnzn0iq4uwjnzhdlw4zjytwa4op9ffqbwcrzh582dffbe2gpxc9xkz0xz4ifwp4cczrnqxb1kxm7fiqmv7eppxseev86vjghphjzcuvi1p0rvmcxhprw94a8o4bv9wmolcnps9u8vm45x2xotm9u86p3cxllsdrf7j5xrcvcqpl0eurecmzsqijt2fh5c59dtyniml9xp3j21lco73dcmqf3qrsr4ekfpr21c9ujichfnd45tamvluyc7cwcrbhlmt1iagpe81opktxo0z6admginralvkxkcm6ql711bjjf4w2p5z8fiyr3e5kv8j67bcu6so8dc58fedw6debalvato33fdbfw5pf8de65tlcj3tr5jb1qhc6cugis6027vu2pg1jyhf8g14btaico8opguqssvc3t97m0mq9e2cdmn7u2lz49n4xo1iehixeguq8k3q68gqs68jh43up5xima5up7szoi4sbp8loacg1p3727tif5keaj3sf1cubp10lvequ04u3by',
                        expiredAccessToken: 7737959203,
                        expiredRefreshToken: 3291093270,
                        isActive: true,
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
                        
                        id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: '19mygw2ettmlfhejjxz6rgsj4fsgkjb1sl631l7mxzdozd6iu33pol9zkgvmhmkdtwnx97expmwr1k8vtdxh7zkep5qz2ct75n1x7pam7cdp8gd5xu54baxsnoqv12547bhvb2jgnj97jbo7biwlhd3zsxlmtm1ry7yxqeorntpwo0cl0w7x7cnxxsj7ggidqend8ybjuf3f8wf4d01y8zcsv19o438goo8o4pnmk8ymp0x3h5hk55dz0h7o0im',
                        secret: 'rl1fqv9h3yrqpyquy43ug9dy7323zbucy0ijt3r0edleva06ub5zz9i8h7n9nct0ch03h23rgqjmu6lmgjgmv2hquy',
                        authUrl: '42z3a8pcnsma71fvibafwkt5w14s7tm2i5g239v5ihoub16yn3uyqtixswzf9djfkj5do14s59bf3q1sg698kg5woiyxmszoag0a4uijbs2czlc1lfo236kbwek4einkh0xnirxgx13uf472uqzxtq3gadz0z4768jkmgmjg2me4j8na5jnzpjoa2p0xxi4pb0b9b7get6zn5ngzr9kn5mjjoc6ap39lj5ffwqw12wcdbs8w0xzfsxgjo5csa9oom3qzafhuec6yzi4ab7sqpdnqiuxu6x7cnj42cdfrgmzwe6a5ir4ji2jw9n3ch7nbxmv2obud7gnqfjpnzqvqqu4crms51zqvgysg47csgtwvpgqd3b3pdch1i6m6p24lcjugd9ef46ieiwpjk8ebodycewmq2fzusd3omn1n0qsdezcmazyhwgby98fc55c49r2z1ehx2gwxp8pe5j19rpusxp8l6t96tgq6ck3405rdg4yg74o0zg0r4i3m3y8jxgo5z412e035jjlk1msg6hhd6lpp1eylcc069u9obw745eyqqgswx3me7owv8m3jdwn477lumqrsk25r1j8l7xesp81ff8gyqsop4ywffcf9vk5ct0hob7vnao9a1vtdkzc50c5ra490c8ah7ue67fo50m3bauidmbxwl846q7bm8ophkjxtb0yowm5r0g9jb1v8sm58axdw63i7l171s38qtze3nfmuktnr9tjqours8y9wv7y6dizu8x1q3lbbxf9yv1ljy4zh2q81svm536acoj98wr6smvj7o19aaqynv2jx0hdr5l1qv2daradlt6og47xqruy0vn6ywc6oili0nwszfq93p844mgjilp8awxoe9kub9x3oti3c1v0acn7crc54hw8s3wjgk2ss2zkaczj996wsh2ud67rnt8068trtdvu7009so2fpuzrh7mjw3qrdqpcnam36cuxq00unval23yy797jwmd7vaff265ku1a278tybodtknnaxf97qnp0dwnfk5rph2z1c6qrvf4lkwb0gopbxy7nsg31c5lqgljfr7p17travrkq049tjgabzitouy3luydczju5lbslzdtdwok7w6538esugh81vdwunatqyr7jcpaydxf6pr9gnlx6hshfkkmmx5tc5fdmkvwdcpituc6lp3z1mqjmj3vf8sfd857xgq4krlvkyxfcid8t17iqiuc6n7k0und4jwakni4h5ey0cdp9juyh8jna44dt66q359877hm0qrff3eb1pu19mpuvx80yn9jvcmk5lg1tjxujm7hxloxk8rfw3uixbsq6ci1350k1kqo9gciareth27d8kygya24kgecz6jru95c5s5icasywckyzte7zuova7777owsp6kmj781qjkj7j80plpxyuj7vnb7djktal94cyy1451isv7fqm2kh4gtpgze1qy5wxnbacegkuykjqgrasbjcn189dpexwbzzepogp5br2i859nr8eqbjzur2fj1xq0cmz510vgsfqut66ebfi2hposqf7rvlvw2x7pba8ovrf0chitpbgd1anfdnz6k07p4ll7836hgspltra9bqhhffsc55nuk12fjxhhqdhhhghxdl9g6b1dt3v3470l6hjl7aeceunsr1hxoegbhdyhnmxbf97r2buxph457grrx1ixsclv2q4x5klghjxw4dhvlddhtt5amhhw8n4od4svtcoe1muh7a3gfugael7p2aufc218tnszfq2bldj7w16zd5gvamx26n4oerrmhdhv3h5ib0re3ebjs6xj0ew6kue58aw1zb18556pcgpstuapi5hyecfgjj9xh3ai79hnidr2z3gn458ep2u2iq5o41hdjv1zrfh8zdxnwn2kg0fiui0r0jc029bfhxnjdf6ee4j0ce7d63ittyllm981ajwdgp6el0gtoiwnp4kw87q9ee1zmwxil45e8vdkztupcp5w1qegkb3sevgaz8y1qt6i01t9wls5s1l70nm4lsb',
                        redirect: 'm41ophm58n02vd566wq82avjxryrrh6xyh1xoz1yrz8g86n6lnagptuxnadcy6weoy2ns6ptd7quklbl9ew2up2yo9ue8y38a66suxt9uc5fb41b7vd6rx38jhf36yqut4annop4a8ado99ag2vhvkqum9c4r3zap8fkmyu2nq108786ajuwsggmzfcmhwmyhijuuaiivfjxpwop6ej4eqqji2n8nx52zyonvewq982uvp66rnes3gmch70jptq0i664f3f6ymof85jlol72kfsglrfdc3walsvkmbpmo4mmzuppz67d4mmh8se2nq6yu860g1903q8ph02jk6uiyr1bod0rn7b31hgvfxl57xuatvuh7madxcta8gva077krgmjfg28gcmhlmlt8e0u54tr4tf2p8dy2ydujox4i3fgpnif0bxf36z7cyb78gydi9u2ldoghwearxrzohige1wsdwahdru0a0g04xyou9yffq9ssqhgngrx7pnjhx4b9guox7smryei7jwu8sujjyrz1c1vxsgulmwqz4xhd9kc7ecof5w1od6rziin98n5ll0tz4vwol5mlvui4i8xwfkar1dw1bkh5nqx2hz8h48cqx47qivs5ao7v6mvrjk8a848qtnp1wis6jxwytmbhw8lwhbjkekg6rxj96uznmt36o5fumeowjj2jbua1v9snse39elv3bebagtbejdaeos1fbt712ndtaf5p9pjdyzwzuqo254ficdgsptzvm7pnegat5i1sxpjny36rjxxr6vei2j53effcbl1datcl81h5bb593eciqstxg9hrw1vu1wxrnvy8x0pfp64oguo37nw5yk8gdd1o9545wn0b3w5fix6rfo7wtsatoix7pibae8y17ceatqvs7g9pryrlofzltsobxpkw6s7tvp8weydrezncxejn63soaakj8xkomj2gumpuxd5kyybqyjnxd03qyk3cajhp3o8rxbm15fbyye8uju4661du7ij6g62xk6026t15x5o8goxio9sbfmamu990k5z94pbzr4vg1pgaz74y9rv4q1ypz1zn1av06ez0ikaydxolqyg6hw2etxsgomir5hfqy5arcjsygomkejyq9kmieh71p607ux7e2jqrq13zuh8p8jes9owof6kso210mt7eitw4km8o1rayigu2n4o9com33y3uuasdpv1wpe9batsiezysa1nvzj1w78sf0euixas8nulp4rotq7xyi98xl92zef3d9hw7wjntzvecpkqsjhw4xit8j8cw4jw23rvtpx2bd0pkedwrlxlojvkoqecfy9rojyoaix7ua6j9a77v02sso59bqpi61evrg8vq5arvssk3q2uiwstth58gw6u8obewt7hdrxiieu64n7rjegf1meusis70d9adkklq2fhqivo2amqd8odo46ruw3fp16elgpqwjtzuc60dtb1upi21u1a3fck0mwtjefrb10xaav3v1kyzc9efy3pyaqiutt472gfur5gkzejs1yp1lj5t7bcel6lo4fta06sbi6cxs7t3q7tyn73ca0ond4rrmj4ghyh60rrcrz74gzgpvjg8vuy2yrd5amj0v6lhouweyormeqlpx5qehxap3p6m6d6kb17a7wa5g1g9q7iiqzqqzxbbnako34fkkoh8ga4szsuf9e08zh07tgl769ynisg1ddrfrv9kkv50vtmyzd43973g6vrt3fxwf1miyhm4ehuz4b0wd6mugj7j4xin3utgwvv47qeoe3ec84li0j5v6qsm6x2hsrcjbvwcoobpeiglqjg48hd9qy0zmgyt45vsadp3h437m82wewez80pydgwn8bqznk12qnyncy65kbam5qdppklhv131tylg1ucah93rfb559rbwgknogtjzb7nzlxzf4qutjg516lnvffo1869oi80umcgkd35zgv87ket3m9gdgpi8cyrmv5uktda729vlndmcz91c4snc5sve9sua2273uk00ri4h6g2ntjh',
                        expiredAccessToken: 3094576106,
                        expiredRefreshToken: 2368902528,
                        isActive: true,
                        isMaster: false,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateClient.id).toStrictEqual('ffe013a7-8848-44bb-97b7-538b9fa4c3de');
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
                    id: '04177319-78f0-4a67-a51c-c046656a2ca3'
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
                    id: 'ffe013a7-8848-44bb-97b7-538b9fa4c3de'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('ffe013a7-8848-44bb-97b7-538b9fa4c3de');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});