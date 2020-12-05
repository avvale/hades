import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentRepository } from '@hades/admin/attachment/domain/attachment.repository';
import { MockAttachmentRepository } from '@hades/admin/attachment/infrastructure/mock/mock-attachment.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

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
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'fxe15f0hizezzd18tv15kz55xhkhwf9vu3dm28cmfyd5kxa9359k5jq53ffmflvorlxe6acfob6',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 601549,
                alt: 'd67yuvehp1yirjkzmuc6tedhmzgs71e9z3d6381o4oqlftfiqg7yvbaw7wq7ipqjqkq5gz531g4zplrsnmwcpbvzb2y5i1oasqkgpn7dncrkyh7i591v6g05lmic3xvvfah1s67gy6aypsnxsko0cu930h7rfsww8r7bgznph0al26aa12j21ng2156oc9n1cfpkezqhk7uqwobm1wr8q9fzdxq3gi2d3wiot4trj7kvs4oy3cnrfts9i9mechq',
                title: 'xotzc1s6t2evn51joljyc1kou7359pujdllosivd3yifr85mksl9lypgpdizf0dcbcm9p9r9n4b650uspv2g217gxp8hz3zcoql1mv0rt7j9aw22afyek0rax5py5g1sdps87nepyrdcuixg8jw8igk7u8kd8bm4jlhhygpjm1ebnaq22fukum5trrq32hwomzk4mi5569gzeyrubks9rn1qjg8inrmpw6zbv0aaog0oovbzp1aiu6woayn52q4',
                description: 'Vitae consequatur architecto deleniti. Dolore aliquid ut culpa porro porro unde labore saepe necessitatibus. Sunt vel quibusdam quisquam qui expedita ratione nihil. Id voluptate molestias velit facilis voluptatibus possimus nostrum facere.',
                excerpt: 'Necessitatibus adipisci sequi quia tempore veritatis beatae quis sint. Nobis distinctio magni labore. Sapiente eligendi cupiditate soluta quibusdam.',
                pathname: 'r69sonf2t6jhxg9ma4x1obrbhw5369ovsai3jaazdpu78ld3k2jbkpe96aeoyug0ggrbmzqi8zqw9b8zilyboywmirar5fwzr5em0abtrnfn65zbsnthm0br5igie6hqtqb4ygscmnh5s3j5tfworjp7ykw7ci587rz6fbvblcmgeaeohdizg5rnlpnqopyxrmuml3aumgzsahmuw0eoy98t57lsoo9ai8lbnoxvek8pd9lqsq5zz02v1kji7w19kul1w6qzfdwzi6hks2apahli7ewwerkjlom6qmvit6yym24437wdd38lbz4uf86c1u4k9r8px6ubz350ub4btjagusd9oqvgdpmfqjeoq7s200gax9l7rnrlkys3s3egmuyn9p9lpky18o1m3kmo0vq9ke39n2ibrp8mhqj2dxlo8fy7917qzdpq6zluq1nozv6ljxwg99zphngqhl9i9hanozty6o2qrxavlyamcvdllzzvtrwcn749z17q91mhkv019rljigv63992aso2ikwflzyx7ipff8baqjreu2648813ogkcz9a52qbk2cq8rdjtg37tn4160pa4cqftm5bd1tjqrut5l37a3i56ntk8af7rx981tibcwv9txfzv51iv9bn5l0eqa7s13tis5vioypn70060vufwbw20k43lixyiusqrguaqutbqu3244adtb6lus0nib3z1h22fgefvxd4alkk4dbntry7jlzlglwpp0renefogakf76h5gd1gpb0qrd795z14mexrgf2p1ijejv4pttw2zlwgzh576n0def5ejbbb1wx1thg3pay4mk6usfy2ro8mw6951zui6vz8cvc3lhjbpkvk0dk5oye6tzkfib3m3voh3zr23nj46gg1t30dv13s4gkfdugmj6jhmcul5ihomgnncrq89vdd8ev588pklr800o5uoyelhuogqjcaede5eu8wc3u6f1j7kg697wm97oj6yhdinlrlkpebg7yslhbwwipwo',
                filename: '3d7lmtf2cqp0rw7z1ifk58mpg5ch3eiwfosebtw2q056nymxn0l8th7hbz5mity61mm4qas9e06f1dlvunixavlc7oofgd268utgcsz8wobh2omln51n5cmdct9mo2zz8xfzee60n4tc691swxm1o7ogbhshv6vfosgoeqbzfga8u0rmhg9o5gd4ea0fugbhgi47ozxtaohgwuec4ngi8j4oniobm6spoztg0boozpgh0rgn5g8s2nt6daejeoe',
                url: 'ktbw6bd4tzbqlstifl2j67zpuxusn2yqf8uvd14op0ssumvvfihiodfwljfs9x405y6nkz5dz4fceraz3vr1rzlign78pqxdmsphktze5f4mlpkt65blq4xti3j2mb926b3cqtda8agkr0l2vtjp8rblhtpq4clnhxqzmy7eyhg38h44pve9slhywgao7y8no8hab3p67xtgiee40n8vk1997tpm57m4o4hlxqywdwequ6pxzwebb3wf0kz5xaxw4s98wxnvn9guf0d54dboapt0sidze0utrczqmjano00hs0t2ww2l4acvxsb9702ymu2ad4t9rcbnodjdknak9s4ovjxhvi1osq8lkme5ggoetzp6itpedxwl1hq2ogitlhoa4s5cii5ga37i862gk51ct72j2i3dfbh8cyrrawrgar5wqehmn85jew0am05i9jt1xal8uw3f4nvt7ofnzb9oxso00kir2g361vwcwh41l6iwk044xkanzs1wfw0r0h7xa6vby90nryemdtpnqgvw4xhxgx5rdf3yzxklbpq9evlw6ve0j91fzvdr0dk4e1hnk58xetw2sv9xo8vsywh3x3p812r708eqoivpext3tobrcbmr4hxl29gebjl5bpwh9dvoa6y26vsq9w0qcka5z9tsy3azkahvbkh3q1xk9ynk7s8f1w86g2qerl64koqtwvyx431sxllieuzp46tj4dq3y1kdnhsfgwthlkn1xvq4atgkb5lpjqbfnmrps2vhfovrx1x01w721jzmw9vuk96kdgzcxv1mdzvv9j386pr7agvlpnobp4lbe3xvfj6hethjtozacj88rrznxcmu1wh1b3ximxxnv8kkjuavlffrf66p0lm2x4vnrewlbf3dhxzjt88gcfasq4vrmcfqdxemavcjfex5vp2lrhvo5csk95x64onlmxrwzcsadvl5j7h0x2ecea8wbx19gibebc8xwestqk93i5nf2li0qsbxjjmbvxbh5s7si6vb',
                mime: '89xi7r5ttukh61h9s0zm9yybygdlu795h6apmgpatjo42a477o',
                extension: 'ozpa4lnc2hblglc0oqg2puym5fxz6nbjlkql12r1qso78yrx5k',
                size: 4900235706,
                width: 322055,
                height: 436643,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'rrh7c3ubqw0q63zeh1zv4uybdl9x1edhsgc73xox2pdzcw71w319x14blk40k8faeu2kx0rjhs5hvw91g4pwfiqxw52dwm8s8u1m1jz6tdsgx81a62565xbb5rega89hcvc4y2d8e8b63wi36sxy1yy19140vv814t3apdxydjz30zu9twtog42x6brbui1b70oqvnscex7lt5t7qxy84cx0e4v4vyu45k6i8hu3bj358txqnm0d4vg9henb1jl',
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
                
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: '50w40cgd5hv5agsmtxmyzmr4xh3bhkookwk0cev7jm8sbje36zx73a0gplphep84yy9y08nr0qh',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 277539,
                alt: '6k2u1aci513qlw3klnikbpayzd8fh53cz60wez1t18o6td1ioavx60wdh5paygmokq7muwejkh83u5rjyaxyq46408o49c88lvr6zx2lv8pg7az79y9tt74vja5royyizu7yaxbpqfx5cp21p4r1sgqh90v47jvn4ppalfsn0m1pjvjlfsthcxkdfmoz1d2im7gcbieb2csyj66hwm7p8bydfh96wr7zpuynx2sbxwozlh8jhlyhdf8mhuwa37j',
                title: 'fo7mcymwzc1r7necwph531zgdvs6kjncullxp9htxspg42qy58sdar7o6atamld42l1n9jewf6pii4fkidafi8paws8pxul6n8bbh8fdx5ot98y1vob126lkzvy6klf7pkiy4ydujqfdx8f1ddeu6v9auctlbmva0u72w524cop31af3bcean6bhkuwcatj5hw9v5p51pmxgmilh4qjhqkav91bjaw8tdtyjzepu3bt8nezf92zx7grthh11ej0',
                description: 'Et id voluptatum rerum voluptatem sed voluptatibus aliquid reiciendis. Aliquid maxime ut omnis voluptas dolor. Dicta non sint aut quia mollitia nisi qui. In voluptas ut tenetur rem quia voluptatem sapiente nisi odit. Molestias ea inventore mollitia vel unde dolores et est alias. Quis voluptatem qui quos atque repudiandae fugiat.',
                excerpt: 'Sed sunt rerum. Voluptatibus rem vitae dolores esse. Cupiditate tempore esse est.',
                pathname: 'zrzpchf5jm36fbhipt9kwxmzbfhi592s4hagxafukmz4laxxu07r07ykevokfg8vp2yjwl1jaujppebygmvebdifwz5gp78ir3129sj9lw4807kcdq04efconyzksc3qosdjtvn4gr623wqsj4t5gnu4l41a7xs27ww42wx2tpvfqwoyegydvv5juq9oikp2rl4r2h3eonalwlq8t6qrcka1bsd42wedohexmoegfosnanpakne6arbukifd3gi8wv9regtfrwaotbc4rpzcng63m51dl66jrdwls6xr9tffvtso9i6zj3fbovg2ya9lfe9f787hl7d43bhmeok34hx5sypn3sbo3f8pbz5wlt17w8salzl79nb5b7oio1v2fz3355smjxdv3eq0cenlfhtvl3o5j03e1g77xit58z6as6l69kkfwa5hypdt00irjkdbos09m4dislf5yxd3q9r24a2je8bjp1jh2q54111jk5fd0r4hbe2aff1eqh79z4fqwp1ooe9m710zls7fbzjsjilvt0p0h1ukhpg6ty3v2arxvpcu7f5us0f4tcd3gy8zv3yn9te89m94j5k1io7lbq9zcnchulsmp9tipbjqj630dk6hxac1zxh95ky2y9xke65ea8ghwazdzwiswsnh4i733bmicdi1nn3u1p71s04ar514m05c99hakp0rd0h76kd6m0kq2uqvka4f3k316ghe22hpse38kmi1gm3us805mvotjsw3lbb1xzyy9xztcun37ycvxaktn5uoafjquwg8ok2jtpqncz0ymq4jjn0eda3025z9w75dixrqcbhj13j8q7fwrc4ttrj9awrb75x879gtbcd6itw16hyzhpc1wkmivunggju4tyj05dd370qivkc7utg5bt82a9o8siwa7ocbv56n3gi9ababq5eteixneke2rude37rvlnbfw2u7nnwhazrgo7a0xk2cik4qo0go9pei8doob7eiqu5yxz7minn43092b25w',
                filename: 'pxgfct5odfwpwah4usn0shbrz9xepqbin8r7h1b30rw9cipgc7cgmodi5sgcczrutqpklknkexylbqv6e1hlgk6er8vs1gyhoi5tnq38ekxwau6zgfpd9rbaj6mlostci6e7ja3zclp1ilujrk56c0lnyjnowsujtgyu2wpqt6v6dd3tv446977qt2b26suyrasd522xrv8ts5lkk3snafpny0jh7nix1brvzy0ey45rhnyx57yblv6f261cxww',
                url: 'bsuyuhhoufn1y14p6z4hkyp7cjbfz923ijdowtsqtfr72sthyus3ns12ewhtszbsqe1qzkn6lszc50xwc06c4ldoua749arjg4a2sjgr81yb91dw6te7iqwo5no318p4y9sb7u9p0cxnu6rjt3vrf1nz684ljbjvc0943zbr7udfd6sz2h1dne0mynwjoy7jk5i4w6dk29gbw76bi3x8dogd9czz5rvzflvitw3xdkt8vtuaj911io94ucyyf6roxhcyzhpssn5xwq4nwpbvfrelyckpp52fh4vhv81xp8viyqi7n0f0ayxw1i81iuzkdalwq9qi4c1g06ter36b10r8arx36grx86a8916xfodmbjen7m1dngc2ubfzyte8m8ciyy4tsdyz2ievusd013ulvexzlh28yvs6mct3j7x0garpc5eyvejajq19o1iwjcy7z21zzfkvipporf900s2qe3gn5lnw8pefegkioctqsxh42rued7gbtlr2r9yq5rjmss1g301bkik2x634y9nq21ke4z2t92jjx9zio1910xcqfwocl4j5g1lael0hd50la62bn7514w3m657esv4jrlus8svto39uiqln5c987vj7hux679rsp0c6hiid8pf8no4w0appjdn6ycmczocxgh2lvxw2th5cr4fnhb5gtsduc9jkzl7h6sut91j2q76gii1t1lthxd34pfioltjs19nykg6ssm5ti758tzm6que4wej0npvompxeck9z087bcdzq1q9316wjyq5yuzl0ue5lo7tynr34ysq14orw2uxxvl9kiwet5vwd2z6mi9swuv1sfihea2bjsiwv2pmoymrr831i9dwthys5d3sh9slq01yk94j2em3g3ftsjr8023sghcj5ywrx6opoppsd81refsfp7mbaaoas09a3w585jmqz6y9yrhs9jdgkgecj36dtt7x9u05jiaoet398d6b7ix3gitbxezyswsqcw46yho86j4eqop7nf81a',
                mime: 'hd8kycwinus52zcoj668uxaxv7m0omr60h65gkf20416p1fj0h',
                extension: 'h10mx6o0k6jok0ryk985mfusaslhfabyu7ae56zkl021s46e3e',
                size: 6876713289,
                width: 140779,
                height: 691743,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'tu2s0k6pmcy3guh11ic3woafh9oc7w5c0ilszw7czqhedkaxvrbetca7b3szmfkzmn7jkyl68qg5tzm6x1vqrbcn7igsxaua6d3jt4vc29u0e6x8w19pzxozkcvn93ghuunu0kes2r9slhp0kbsddedaut1lmgcvtd8iyscovlso1uksjvh1l5j371kh3mnl4ecp96ev1sv0tnwj2dx0vr4a940s2q4td55xunz2nivebogoc0yuk7pi41ifxdg',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: null,
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: '7hnfib5bbd5qig8cr0ifol8iq18l4n98gf912v3k4nomfw2ow41cmztn3l8wvr6qpacpiu7im0d',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 918287,
                alt: 'zugnopznasgc5g4qxvcbwq1nmray77rfsgwoklf2aknfu8gpz3w7dc2223jkg2s6ev7z0e8n7gorpqu4eizhhe23jyeohzbs9d77eyjezhybmxsme3hrj8bfn2q77wnhtdhksd0gutdz7naocp18sd6uris5yswaau6ublhl4txlgtvp07j8ice4mvm7k0ekadlwix7eutjy2pt2g8906ez0i2rigexzl2umi6p6myy699wk111th5yokwpdsoa',
                title: 'yfepby4ql36swgup17j1457wrsu6pp4ub1xmx0euvdwr6yolwenypxqzq9ftrk02ha2c5of3djcqgptjep6rf3xn5pv19ah2336bq40ryec4fnsvbe66d82lly284b4cez3iub6ipv8cnunj6bsjowakt7lt8bjt1tdi5t0dojr0zs4982amfg8datdrj03qygnm8fwyxygta60vpkeixqyrx0jyool0t5avw229u91lqfbww3rm3cbd2ghla6q',
                description: 'Ut modi illo. Alias corrupti quisquam nulla totam optio harum optio fugit. Magnam a ab soluta at ea et consectetur. Rerum atque magni blanditiis et natus ut fugit. Consectetur libero qui perspiciatis enim accusantium necessitatibus. Molestias accusamus velit autem autem dolor debitis voluptate ducimus minima.',
                excerpt: 'Doloribus commodi a nihil minima dolorem consequatur sit dolores deleniti. Consectetur unde voluptatem sed ex ducimus. Est nihil itaque consequatur. Cumque cupiditate possimus reprehenderit aut consequatur est. Sequi occaecati aliquam voluptatem voluptatum consequatur molestiae fugiat inventore minus.',
                pathname: '6sr2c9be9mp750e659zscgig75ioryjbo0etgpdjar80o7le8szdzvb3kumhy1jh6whduveekmjpmqlhs3ss547g801r8jitcaxma6ne0m2cjy931ipkhsx3ywjypgun4oumvwxkx1x5f66isaojuttda5mmq9mhhzhtt5t45iozwn9imxqvykpau7zaxuv5siwb4icadf8kriycht1c1ydtsuo013jkzlqx3x566omww2hu39hz3q4xc5ml1v10won2c4t3e7g0b4nq7wbrmymxjd9wle85uoxh1xjgtjvvtiarl9m60bpnu2bodjv64mg476v9vhppc564tecrxby7z9uh7z4kf2f65w0gc29n7il1kc1583tr7i5bqcrf23s4v18q4sfnzxctzib64w3txelw5ld3c10xmaar3o5i1lxzz9flm1neqlo60j3qtrphpd4v71muou2d4nxtln788kf4huo7yevm3vyziwr7zmmzu5k1an82ft8crblkahglfem0o99er777rk7mvvrdt6x880jiqpzxjbazlnone3sszh0xqk3seb5uq0hwftq0cuz1s2c9yxxrk6t3k54vkbugu6m67gtndh9m9r1mt8rvw6paxi66x85s1ppue46u9r8wuatf3ucw3nzxcacehrlysgqk5rshrvws85a86ux09sjq9dhv3qhzgfemomxtnu14j9gud2vv079h78njxpjk67kp7z68k2uuiiyvqg5w8kpeb8nr9y1rsybse1d35ez4xk30b8c4iuuoat6gkqua6lg08lv1h8cmmmrfu57mzjw46zoddfyhntzaamyssgf3sabab3p0jbukpqvixelqhr3ues8nf9tga4qu629bgtzvvcs7yizgqx5ukz9452jybih3ekbli57jl05hzqg927uqiun2jredqvtiwf33mv0oue75smlr0vx12x60o7okkel41uumqngw0ixjzrm47tnhqwbbel7r9q0il2nuzffb76ax51pybjdn',
                filename: 'c2uvxmjfa02mmv35eozn6kqtsydzl5zgsxmo8h8ut5616br9s7mlxpr3ekguckvamk4b9bio86umgz9noig4bc9ags6a8ubr1viw1008zhpz8hwzp934a129zi3t6asyve25giumub480x3eglg0z2tdtqflm2lg0e5eakgpohyl276aygzcfsccs5xw9dj98v4mos7wu4pa0g97o2j7tbl0schfbnn5qbkekn8tetj3h0cbacsgrtc7t74hu13',
                url: 'hwxta9431e4ktm8ts1bwla2dhb6og6u790t8lwo5ix4q3f1gg6aoj5s9est7yabyycgs3rx29h5i5dzndfzsk55zgelcfoxt2aj106x7okkeu21flsa22f64pb9ncdi4zgqsfv51anoy5au7giyjvhh4zmgbh2v77flbxt2dmybqk0c44od1ahtjslxoda6zxlrfugb1402m9drnpmv7m3gn659z7h4pwj1fbe6il32a5x6s4n8p2r7i8ab78z8kd9svozgpbbca9qjs2rzehlw9l62uox7fdy0cajrfkxfn8eebbgoo6rtoh0m5qn79i5d149fgsyi6ubrkhjy0ns47ybnhwa3j1ugbwzuxa3jvr04detk2lvjrkhgv96z7zwjmagyknml6ai4vxetk23n4lp2iui6qgiu25vkn5pf52l6wrplcxr7vubic8q3f0wozw67z77kgg8k92287paqfoi8j4dypj3c3u4ts2nx7jdb4e6amuyet4e1pdav7ce5646j93iycd3iys1ma5rnyvx4lcth4temi348azigsb975ex8esyp86nal8b912z3n2ndmx3apzm8exy218rlg355hty1j95bekvcmfamf96nxq76zzfkevlle7qpnesxgrcieqke95wmvgyhmmonagplbqvvhajebmi1xg10enjvtaadw0hrg5asy8gak44sp4y3urehxux4b3be1m0tlba3bb98n3y6c860pek2qchbz73f1b20jgl01hs1ivxtgf3xl5prps48uf6tlni6bjw6ukj24xeyu4axjprocu8n4op8yucceusqztimo7t3a6p3xk1h1mwn1ayfhiu7moqecz60nxdbqvnx8n7ob62uweuyytkdo1gm9txjkg8q5l5f586x72o83jpli4i4i3l9q0cay2d2cwxxx1yphgkgyabujzk94q3itxyerkqntwah3xm0r63uvrtlylml5ldgd9nngozz80fmvxvdaup37w6oprkf1eyovuklo',
                mime: 'abys0k5k7ezr96gbq7ct5o5xn2tk0q975ni5z5yibpmjrc7ull',
                extension: '3llewl81illysusovr5k2a8dot3u4sw9lir7rsnqaexxaofcpu',
                size: 8995952220,
                width: 270709,
                height: 404941,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'q5yxrkxye83w7zdrb2bj8wuli7r2kcumb6remxjzgrd1k5rgzfia4y8o4is8foukz2x2bo73unkwcv98vhuy4qci15afp9peytmhitanrhed1r4055myk9bpdeszkrfetxtg87bqd3d8c643kdd5wln85u6dokqbe5b95rtu29r5ii7krxyxkzqzka14l433kzgsgnlta4fwgkg1cg88qd09wwjmix5nsxen7sitv6z6kp6kl2oybzir15vk7mo',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'jlq8yuc4t4gyag9169fki64y5j2yb8i11lyw45dojekaeh2f4eddas0uxy41irl7z1i8l2fk34j',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 639747,
                alt: 'n5vg6cvqs8lmwchhw1xqfptemqgbo1916mawontjp8yoxmiduhrj9degfsqve3dc652g3d4jxctau7xe970xkxov8l17n9mtabftrz3drjosxprkajyvg5zflubuzjtkswo89x6t9pqmgk2a3i6m9li4bql4bhuedtm19ctoizhf5cfi0n49dam4r8y985mdbny5s5coguhsiiwd5k6wdx6p22z8bmxw9ev3m26b11ygtcwtus1hjix7dpfikvh',
                title: 'dszr6tr7baa6avs0w93g75iploxmzodfv9277p1qri5u7g7tzefwgysbp6jicukchu6xjhs3xv8udoptfd7g6bxxwks209lhdkhs6ngmhhdddniyfludhiuciomjwdu99d5w38lu6f7jk9qe8ifg4vrrwbyrcyvv8nhgv02do2w7nvhzcu19bfgway2754hv8f75ahtcval6d4ikk4zdnnwaameg5bn8s6pt2bu6tkxe5bqma3ypjc9wnsxml69',
                description: 'Et inventore accusantium nesciunt qui. Nobis et perferendis voluptatibus laboriosam est autem officiis distinctio. Illum omnis quo odit consequuntur velit repellendus non voluptatibus similique. Quibusdam neque assumenda modi commodi sed excepturi sint ea est.',
                excerpt: 'Fuga impedit est laboriosam ea et. Sunt maxime minima. Voluptas explicabo aspernatur reiciendis et minus labore molestias. Vero magni et placeat rem quo. Voluptatum ullam ut dolorem expedita consequatur. Molestias facilis voluptatem rerum consequatur culpa quia totam officia voluptate.',
                pathname: '2hso25xflmhoye4e8xuzo2obp7ixycc6gxxi7n1b2wrka2l5umv5fuxn1hbpke9wbg9f05dl77jqk5t4n3vwbsnqinphf58tm31r9bjbb7tpl5uwdv9h7oiz8h2n7m3scv3xftyzyatkkf4di6670odav0fmk06lagwaoo1zs6l1j83og6wszjl98olcf7frl583kzh63e6l8hezlzudhcti8mbbwtqi6vt8bmkobyst3id06rym3fuo7yzwjayeus1aov45wqi45ztmazymgfi4604q49bwddd6gom2yha9nmujes2e4u8tfsx2clq4itt02cgqm0ibkbt6ikmc50aqpvmv9shge2uubtu5saz02ptusu9jbap5gdejuyhatbccekfaqtr7p47jbpbh312h9fz9tc4q3rizjeg54b539aq0v5g03ddqajratr7t1l7wkgbi1kejcffz74e0w72pfilm15hen9a32vlyhio483h1qkzo7dwl1hr4tjyw6pil8two0dp2tlmf4ao1cltshy2vpgccjoifp6oughiysdje210dyrn85jicq1r7ch1wv4htx2k0lk9wa8x6d62sjt0fvefgiy5ar067u36gqdpvqemmlithdf5anoiudjsid171fy0b00vovl43vwgqwndlf7ne0y3rl02jqxnr4op7u8ln0bqbta2nr5t57624roc777u8p2vh3vubdfv3roq2862cocr5w9o21urhplwkfyy82t0t1w5oznfk4qk0l3ijrrvbr2tbm2i06nhl2abkakgssyovrfj1akl9h4a5yeqjdzppz4owuegraoyet1bkrh5s2oyv6wvrjksrf5xe0takunwilddk9tk9u1ydalbrs4cg5cdydmx4y3rew7twfaii3zoy4xzlsig5cahxr1qm8oyjepzxvwba2mmdvonp63vmaf3f88yh6oztpcfi4h1hhk2tzsyfi3yxw6aoba6lwo203lt1njd9t8edvytq3s9xzs94yp3m',
                filename: 'pnoccbwoqbukdubt5o68kgjbq2xwloy2lcs4ypibf13k8bc7t88yhvyhenwj0y528rrhiadaz7io4zgw10hqqhpuakm54g8yrzokom01g4gfmn1mmtavk14y884ne1mbtvuubuo16ixnb1dvfkpjo8lcx2rchqtitjog7vty8v59wmqshy24zm7sbgnvdnyysovmjggfknomgddhvhukq11n197xalrdh9ljcbu9qr2hfgbm6k58fa9fr38ndat',
                url: '3djho4g2garl87gmjkpglik63vci3etkqym9hczgy3pk7o3sbmdh7w0j7yhr1afna6ilrja6zcoizab1egxmuyoxwyd4k08m16npwoo07sxz5nluef0kaju8zar0mcwwj8odm3c4gfjmluqdvki0df87jg5qcnn2lwfomw399qutygue2nrs8kljugxx452c9ynluj2w124bvkb6smqhmkcgqu864k7u6wu6van62hw6csyvaek5eddkyhw6ijf9wwtb0z3qazvh1yq63o26uhu2t2ejp4lyj7bmoh6flhsrsrnb48b7vidde1bmnzptembtd4801za4p845bqh64tfx2hvv92kizi45gwkf6mw8p4qkrt6o62hw10vcmoj6eh11bcqdw3vw0w9hh5epqa5i2vzugfdcvmk3ahj37su7ogbfbz4mfvm6mg9onj27kpiybldrl2ch0ihbj41mfdwd1y64yrtyrh3kw09c0v486xm0bkzel0xgsurns2a6p2pxeqj2cdlz9y3tnlu8w6owqchpmnm72gvt4aqs6ft3gknxrbh0zdyb0di8tqep61mcl6grhj3e6ianravl71m5m9no1tod7aeq5d799dayn79f33mq8mhj1qb3oa66fg3fqdb5yzlhisqhzn3chhf6aj9fhb9vml9okd3dopxprhe6evw2xzomhldfekqf4f21mod3dx7m6pkub5e2tlrcby5buyuy8a7qyo8000s9t9m9u2p2cmmevug7mb11gw067ockm6mnfy03ndyuu0vtw4lrsslqawfqkju8jyk6y9w50iz03acq548v19gm2u9wzwwifpvyff4hvtn71crtd6lr7gc5ft8583ebu9lbjmem6228vwrx1l6d8hq3ujznru2vc1w4ez6epbazagqj7ed9xynbzeqnurvyrp9ocv3zodo4lar07ito6rl0dfwhvwc6osawobu2r7dfyy7jurctloq34ymud3sky58kf4nm1h3xa7cl38mf7834',
                mime: 's6t20g25fgwvqnnjcqeby3hdt2ikrp8hgvvs50yivy1jjv7rlr',
                extension: 'j2v8ap5fybduwjjd5gsn1xcx0qupc59cpnw4aegrb2utzve2t9',
                size: 5598545758,
                width: 110548,
                height: 934700,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: '4xujghwnc182pc6i7ig39jklhuhubqnj83lqas30fsh7aditazoiw1zunbosj71k36s00pvp10mlspfg2d5rw8czl22bahvd2fx5ta64vefxr7klcr4i1xe1hvulldcj2k62dllaeumyrwzdmb0ds2nhoaj06dm9uva24v740dtala73cgkodfprr5n3i76257428g5cmukryj0u7sqjaazo2g8gix62c08t6q52b33g6qnwv6895goh6flkzn2',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: null,
                attachableModel: '3ot1a1mbfgd792e46i5heu5qe8xx9zxwpepd87us8jp0qo32kr8yon4a92obmfb1qc0491jr2gx',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 508588,
                alt: 'lo8jp47z0nyqg29kg0qrqyo0mctfdq1pjke7peyyoosu92h26eqnbacc9pwmg0hgl8rba5w1xp4j6ipzs9ec7jrxmb2btwaxzvruglcp6ggon86gpv59owjg0d1hsma6m03f327d78slbruauu0dzepepufvk6sdyczfgucxs7cbmoqgxgct8cfgnzt5f5ky0uz1xkozhj98y1ydvdxgbf49uxy0sd7tpgyplimy5dgn3hvq1wdhkk3xtyzzt65',
                title: '1w0v8lydfz0xvujxwav8ulj2wlconten2fdujimla45cfhem5a31e94nzw6mutb1x8vj8ke5y6ho6smneolcvjra55h9cob12ta6skj0yq0fbcg8zuzkgyh8e0xdor2n001kbfo4b0kpyhpcp18jjn7v4y31z78t64949dhp7t1f3zd7212djou64g6wh6s48vrr2566kigmplif0k39326j25ewk1pvmgpl59blpf5j57d7mgpxh6sb1m5rne4',
                description: 'Quos repellat cupiditate aut sit cumque velit cupiditate. Et eaque et officiis ratione illum optio laudantium ab. Et consectetur pariatur.',
                excerpt: 'Itaque minus at quia temporibus dolorem facilis. Distinctio est ratione voluptate dolores dolore quia voluptatem expedita et. Rerum repudiandae ea recusandae harum dolores laudantium aliquid quo.',
                pathname: 'tkftn3mf38fhslcvcdnc9kte2ac1r3to7eq4t1itowh2mkt3oxa7ddl9wubx6ic03tqnf8g1wslgahxpnhx3h93z4dzp4jwdw5hl7aof5coi5fnpmiek68c5wiw4l6d7ojlr38r5vtupsu22nrzcolqt97ohd2bsh16gwlio1nvu1gyv7q8i8logd9sahfhgd70za4yy6ynsyyhsuju4zusk1puo2ifpgixhokhj2a1dosy8yxkiomimwrld0fkkm609mknxm9ytbevjy7x24cex7an0325rw1p1b0ig67rvj23ul9nqh54f364qpbb2bm4032r4u6genwig6kj2eqehvo1wt9rxug9fo41brspjgncpf6rjrbe63xvgm1muhceyr9jdegd1epyknt88s1gvk2fhk28lmgj8t3ba3fxahe6qycz9pthdopywd7542em56gu15knpmlyd24es2f59b39q1g67s8jmqbam43qa7qwjsmv4hrgxsnm9q2p1ituxgo8nx3b68wcmqby6yzr17n01e19syksmec88zgqdubyxinq114pbms2lszkuvsuk6g6w5hyhgxd8zvhh5w4m1586tlzp30v8soz6m1bs5pm76brmw5zzgy05acr4u1yrbezavwhz2zwluv6gp87b6kflwk6vc1zdt5kj1jmz8zzs5txbt0q2mtpanyso8ltxwjvscsr1kmvetfru5n994ocjfjgdaldkdkjam2bsqgs6yt6tp09q5rq46l917d0serwjn7ex03s5elh0b07q8bbtc8z5jaecbosgz7y1e697lpf0kikovo39ro7o4imb08pw3vzd32v26met55r4cbgg5mlggedp7itixlshmx5tr1676dy1du4fhxqa8ppdz0xyz7aj4s93zc8fq7gdv627synr3jzrczzi679cs1neuzosw3afz9c7ixlei7hj0zsa21wq9kul6a139esyn2u7xkkjfp4c4f5mjc7qdff42sg26c1bdc6vwkrx',
                filename: 'ps6bfybizonk5ryznfi13cnxn8u4m4mevogagkcazoemgcjff4ajvla7blipbv6vvhfe5vnx7pdeptox7vngramftzcxfkkgejlmxe1bib9om4ik1u5ofwoznv2g4z6pd6b05n5lkt0qj8rping99bxpcbr7d2oxqjbzkjdeowwgt9bpdw7vdbd9pfpuas1720fdjfv0uk7rhsb06iialg3rqs7d2lwukdrfqg1nsn05yjyvzha8hdkeiyylq98',
                url: '1ao12wybr8p6bkqoo5o8tvdyonahzn7ozddlzmgmb7jzj68mi94csaz3ryxtpeedyqyr4ajv6os72gn1qxatletw6725qfay153pwi5n1r37vkg0d9bqg2wpyhpolcqpdkhmmzdzmzdn5kqlenretmxgucofpnsbhsp02ccli3e095yluaka44qytm6yfffbazvo9rx1yvpcyxba1blwl3wwvlbxpyfub1ttnjsp3e80iutxgnydfq5clq5jcof98rs5i0dhtha0sd92j5gzfs5297l5l7nlxeuc2jxlyncmv13trac95a64lywb84wl7xhzs4l7vguktw12srsx2c8d6wzxg7rganzezi9l87ek27dqa515utwme60r3f1di5pnkfrr6tvjyar2xlhdcjfplk1kouw347evpcikvm5ee1wc5tdr755voezqid7jevdrazq3esumda7cvk1vsi9a3qwh679qkwejogvnn086m1ncaarjq6d7fpkya4u3zb8rz18707rgkdm9ojds75n415n405ytl3t4mna0kmvyl0j5zethz0o4627xdiviu8bare79uavaw21l959a43tyrd33ebv4hgz3h6bowluu9ymwp4iw5a4mb6zv6twzj6xai60rrcyxirajzooq9pr61g8mhkwt8e56oswd0e8gkxldn6xziug6afefg2t01ehga96ujc502p3v7k43sfguzfk37hqwj098xr0y9iyijt36d3chdju69mslij0hc68d1v44t27ctzlkr87quo16qvvhxoq0d182gpeuq54ye4drs4s662iynobqp5a9qln0vid2qlrqvxhlmrus0solm3nmr18pd5ojeedw5b2mg2ydxmvlbtpexubbzv2powcciy7cfipp5dzdfvxf3eyo046wrt6qwlnxl4qi9t1lzuh35v2n1h0g1oerqc1lq40x4frk3szlw4kdz31ejqumui07zbvm5r61phlpbqy6c1q62f9c6b9d4euuwhmt',
                mime: '9wh2yj1g4md1i8uxws5ej1q7hs3dn6ck3tqbsnkngwtoffm0hk',
                extension: '3nndxcd7wqtam11cbp5j6mjqa3ot1itukyz2azijznplmuljpt',
                size: 1193414749,
                width: 275886,
                height: 699608,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: '8w2asb8oljrgj961t5gvv43eevplw2e9uzdje0yeh21t45fzk2zms11dlm1pezpjzwdn6nzevj3w40a6v0fp4bbcnxgy92acz6282ivcw1qau0ntaaooulcew2yiic80u8cj4br37ql0b3thruldu82o0pj2fzppnft56dhal5ozbvfzt5tku95peh001uu0pzdliy8td5c41qca3yf9rbq92krr4mjd8dlcmmheo774m55v956j4u4vc6bh4zh',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                
                attachableModel: 'icedubcywi4q7hju9ub988li2ctsr5iy6cku5onc6q3r41zuygidmlwigy9u494cx28guza99qr',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 358785,
                alt: 'd8r5kbxeo0uy6idsz6ctggsf60cahnjtbcrmatsm6xaacsajno9xfx2kqx3fh5f4w7f6wt44a0zmj8ry3oksddzg49huowjh0yanforgrlmbtaxf8dxk7dr12ss3os3y0bzze4c0n8elx22og3frpov2pembqvubtimlx16fsyrc54pv7q6oujyr389cfvggwfnaovuloq2136jax0r9293zq9bo53q78fab6lzrdzy37b4s4jb456aprw2wb5e',
                title: 'nfm5vaxeixzqz0ova3sgib9x6bu4duca6actpoyn22yy6z49aojuekxwr2feuci2xx577b96xoculcus122xn1ejsum3zad1ts6bx73gnspdlywfqo5xrl3rupdzg7q5syn6xmzkjxli3k1vo8lvahg6rjezcju8t81qekwmqb7yqjno5cmuomr8pul94tc9wk1fflfargbos7wiq14stxqp6mouv8ruugz5wznzt0vd4fifg2g8sv9xyr2lg1s',
                description: 'Deserunt earum omnis quidem consequatur et ipsam repellendus ut. A quibusdam dolor vel sed necessitatibus esse eum itaque. Et illum atque. Dolores quisquam sed praesentium.',
                excerpt: 'Adipisci doloremque nisi sit ex accusantium aut ad nostrum. In maxime quos harum quia et voluptates voluptatem. Cumque quidem qui totam in non. Et doloremque enim maiores magni sed est aliquid distinctio. A eius aut velit velit minima.',
                pathname: 'oj9gfjkn5miutt3qrtc2karu6ady7m16zlt7fyc9locas20gzp64hyuvxhrlewsnh3mpa2qkzbv0kaqksodgru536vty232m86r1lih7k41bwfryr3mpl77upkyagvq1hj99lfvjo6pkdqjnd6t748be6idgre5njmqxkomq2i7aibqpxv2felxoxve31oysohbphz6u0vpacnxy4ki1ockynbjnvmst9vwkt53e6s0rzglmcryj5qov1qog9lrfzj4lldpxfsod8hx25al9e8hcm8ej0kfnokyfqw1aj4eq9chazlwkh62njjr16hv9ct2uegdux4ryqdz561oop02gvy37hx72ay7fcwzcpqqfvrjirtwnr3yycvp6o35io0zb2dffqfxvt78qu4cl4gda9dujrbacsllga0shuhhq56u465wa835hcjakcv89utoa0e7j5jcxb3uk4lgcx2jl3evpgk7dq9koe6n4topttokd7eg8uzr2rrs0mkdvj183gegmlmfsyp063l43bcbr20ajh3tl32ga7jqh7ro3mdqoo7u3ubyfawbuxk15xuqq25967j77ncufs0f3zgd8s50jx2sl6aagrfuw579w9e4g5icvoe6h2ws8s42jesl2x4zpx7x4try3xnzlq1psrc5n587jvdsdyb8p6kddmmxnel0nnjsihgmo0kpu276fnmdxqzkcox5x2r2k1e7vgmhwz2jg8o5j6bby9ioleii078rz5a4c5h12t71n38r429583a6rz4um8d2mzq2dlsspbcqst8vt28ji0miclw6in0qibueplpj2fpicul4iuxnah8yp6x3p7026eg3zwno7gq0ibywvvrjx5fmbs6iluyu2jtjy031a3hd2swa0ds39blsqdhje6jmmchyztmx68fmqlgcclso3e81otedpjk2xqe8s2jhq5t363banxqe8qgzgpi5izdes6cnh628xhporyuvjbdghu550u3ypxay4nrbkepkia4qc',
                filename: 'r158zss5ub1pz9bmknimd1ar65wwssrqvqwvq4oyemwj1d5e8qu2merirqol92i7lrp3yq3v4tsw1tx5qhks8y6uqns7ti155sct7xwp2uzq44k3rzmo4v65w04u9v2i6wht016gh485be67lc5xlek48ms1avouqz3julkcmx0uisoxrgn40vtrr61z12quyu7tt47uiek3e3je8qc1cfjf2rayglulg8ex4nmvs4yceiitg482rqgrk3sf0mn',
                url: '2oq5wplsn1j8olhqrioq6eumgtzaizuc4260von25q6qzyo20oalwpnx1moy6lcj17xn7f5fjikuaecoe741kjkzqldiw00aarjelrs8i3ds38yw3ui89zdzb0t5d279uvapp1o0jbhb2i7771dbfs9zljd9xjnhh9dr4pnofxasu9mn6zcgzzmb5f282oejcc4127v1osthwuob6j38r9ruwdce1naf8z2mzn40807j0oqh32uqvkancyewnqrlcm3ujcw9j1rw3l5xgqclwo26fnllvi1ycaqhtk66f3vt8hr56c4cdoxlka0osmp04xxnn52qjvyle4ef7n8b4kpaxu9siw6zxij3f70cbe6r3m0ghdwg4xsjsedfzfyidexnwans2kzkdy9o3ax8e64e2a1mqpyenexjklor3vtdrofmucxh36gw2wkm4pansaqmg8smowyxbdyaybth7sj6lbe4ybqdtv2yzl8c72m12w1yqvaiefzn33t3cicq6d7ofrbh3o13ke3jy5xc3y1nidmp4rj4voyjpdfm00k5j1fh0sr47q8le752v04jjlsaslstxhika7tku0l2vn9bs9dacweau59v2gk35tbmxbds5x8y2fboilxzo3kdk5o77qxrc46tsjk0j7x4m30imxuvo86wziw2l7qfbmjeipet3s3s9z0r9mzi890nx5njm8ic5arnc2u9sege0kxgo3r94qhmr49s0c51hclm1hfjhirat261s68ub1juwp0ytim75bz872i2bnjm53wacq9lynp4q2ij1n085du1ben8zijsq3mkdqumvl59jvugkm2woq9jsaht9l6o2nly0ooc1gifr7pk0zdsbb8o8405mx5n3ut67f5mro4wa5m8d7rpu4fjf4ox7wgkwdomb65fer8gwopd01x08vq2wfgu7yzrpyknarjdkig0emjpa5saw2linj17lwynbkjrjz7sutmhoekaopu277mjm6uyi6127p8mmcldfuat',
                mime: '2m97aow3hwa7cymvodyebb9wlw9ox0113n2ujewy9l0z8z6bt6',
                extension: 'czasz4145f5wvyn9aqq2x49dzibws2c930s208uzyx0x6t1t24',
                size: 6933155019,
                width: 491735,
                height: 345535,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'xt78697sx5ofoq778uclavk40w2dy7mmjkvcblaexrom02j26pro6axigqlzossva9gtqxyakw7zeqm0c3eu89vg2khc6vwn9m2abs3mhnawxd0n30usan79jwn05xlsj0yd41sh8y6gu6c0jz7nksjhphayxak6in9ckikq5cuundi5ua2ldsux8mrcym722ehqqkvgeflqyw4ozw3uufxayda5kvvy2trgftvm89libgt5ynfq6jowr9qai2r',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: null,
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 268387,
                alt: 'bqpqizye5lltbcalx8dty22li5plnlv4c705po6aqr1tx2ly5ne1nxod4hctkfidqmed5992snt3zs2wiwr1kie6juprlwahgyccueao8w0mf7zela3vvi1e52qdkk9e51fwdghwoojhcrarqvf8r6blvia5b9ypv1zzjyo37blufvku93kdvop3rxzgv78o84ccado2i1k5mpb4k1iuneamdy4bz2fjwdesw3kydit4cxr70qmxuotv7wyzcw7',
                title: 'm67obapd164ny6vl78rryxqmrygybd3omfvvnlonod8r4mka4yye6ll946adnnl0y8cu9jj9f4wa4b0bygkkaglq12c73kn95mth7a9ggkx82oj4fok996lks6b9th6j9rmr38xs5hge2lgnkf7qaatqz8018llvaftuoeeur9knvlr551nbvhuy4rvfqhmv02p0kxesen7hpq051v22212bpvlh2yg9mbrnjakk5xw0sb1ew21zkmys8mg2np2',
                description: 'Minus est officia at eligendi omnis quos perspiciatis quisquam. Voluptatibus maxime dolor reiciendis earum quia tenetur eius est. Sit sit animi. Sed dolor facere eveniet. Quae facilis officiis omnis ea impedit. Nesciunt eveniet distinctio molestiae voluptates.',
                excerpt: 'Iure ratione quia. Qui perferendis alias labore qui consectetur qui. Sed qui qui tenetur praesentium dolor qui ut dolores omnis.',
                pathname: 'wbhcoob2dvspmidwdkrxgaagog92qs4ua64qchogjyp924ehe3lm1sgy58sx06o6zxoe1y4g8e9ricgof4g0gami9ldhy20z3km35np2dybiijkmjygb7dtub78qh77w8eiy9c6029esjo8i7g8nd5g6ctfz602thl7haatsf4dfv9lz1axl1ymllfehu05x6oz7c9zkps9oeb5qor6ep7xvmyubrukj7fnmxt6abdy1po2e4xncgemyykmkatiwze6x7p7wt6wwfniqpttq64xi4254l1fxw00hgdm643lcg96c2ft46h873egahgg15254r8gaa4o1o6bp32g0s5ey550jfkroll2c89wqzuvygj2zmsogzyyjzbxmu14fvonbnm6swh3qt2rcb989t0h1voyzdko6rops0oum6sckim67q0ljtufanniy6vhub5oe67slne67qsmozqto2t6ibss0f4soimd8do3asjft7c6i0grs3l41ey2q4kibyjs8i4e1tervkoy1fq7bcqru7qkv0v05fexb6yxv6ocnauvihxnsm5rvbkpv098c2f0ivx1vjoxy6l08ptj59kgt067k3be3bdvej5si7d9due50iehsy5doks86qrnl49kkq7ukrgrk0eit1xryll07yas6d28o5mwh6yx0jhomq2irzrqrug5dutp7kg1qxbue3omxgzfuw8tbd6bqtj1uo2qlra7tuzmg1lknqavfiagy82900fdz5mbs5t4shccn6n9w3ruh9adj3av25hqtcvt2i8v1ovvoc3fbo9holu3urttsjp35a8p1xy3qzjhz79hqkuudqtwq67yrkf9j021kokdj7n1ttflcr1ooe13npuerdlm5gn1x4m742ov1m6j82fq5kerhvvox26xp5kyqwvje41lcooqptzkkevs24hziv9206nirtdpv3ygg0taj9gh89djzn9ljf1mav82dhu8ukrnn33p4en5cu5r1f0bknlvdu2j7jfzz',
                filename: 'kpz8zchu3lwjuk53oyzsvyyb2a6b2jn1mbbr1kzcquihijeihvzvkw8qifeye4jz6wfukvkr3xyzm1l5qq6quhcnwiehnr3ls2agyhn0smezs3pvl4ti6xw6keww0y16m918u9fao48x40n1ua7drp5mgqdfx58hng30qrkhcw2uwkymq5mugxpd3sxqen849n99q6s9wk1c9v75ydcfmt41ip255c46gpo0z0oumstbjr6lo0sssud73e68e2i',
                url: 'vmd3nedj1fahgtubjlxea7q8818k2i1hqhqczk248grrgphmwlldwe5n1mjokjwrir033qr44s7psdy4jt67mm7jz7wq36yzd4s31g38soeyxvn7ovdxledkjn5416k5svd6gq7nn99v98qp5snvpp0oj7o1kwoik2q9rd83on3wthj67nihcc9yk2s6k8ydodgp3ur7kpvaqd37sthryzn7z7i7pr9fej6qiajq1x1rovd47y723wrt8hyy4jdzmh4w5lbws0mgnsvz5p0b83v40diagqjrb79t999ap5ifgl7nzsdrskxnm2agenzhk788gudlspfhdm9s024wyqx84lj6mwyp930f9b3jq7ukeyir9ovswas7gwv0nvnr4hnfppxwv8wuu3ru0gqi85j7aulrxl5r1v3c8y47cezj95oogomuxidp4dw9oo5o3mix9b3tp1gj4rw22jyz57tln6k58roilyhekb726d4e3w496ncfexttygv1u8a5jjs1c0kvqxk5vahlhr0a2h0p6y8nk5bdcvvfragzmiictih3m7cfgj9bsbgebpybcaopn3z8bgpgpmfy2b7idnk8591p37j0lbc8yd8l1tdl11huikqe1u3o240uw8i406gb3htr3vvex6ndxzlbba1yylsb703ycelflui01kkst35ucvy6chqh6qdz2888z46w8n0cx0ubasf7nnrlcvotcmokgjiwm8cqknbiniha4lqu32zsebxniaqx9ffn1dbaqgy1jpndpl058r3okq65bi5uz96svwo4l1n1fyefq984o4zrlb2qtkk0xdvql67b1hk65ograh8o3o9c6l42z1nxpb6evandf33dy708xwwpneqp7y4qzgg02qre0yn6j7v1ei23rdqjvyc0j7np8qtvafgigmordr6l25vkozp22hh1ogf39d9lzocq46zbi7wspr6czas2lkyiq9ooye1d54t5t3fs9w37duw6xwemb8dkvkihua9cw2q8',
                mime: 'px1im88l9xrcie05y7xybznmb68offu59z4dw10mptousxu4vo',
                extension: 'zifsfdk59kzui4cp78rpq3aqxqpv4s8f4g5296nzfyr2eg29up',
                size: 1475963788,
                width: 499914,
                height: 799044,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'p8v38cmyg77fc0ht0b1o1lndl5hovs5jlpsmv461qrimvjrmm7wjeihilww84ben7ybppn5sp3vb53bwgp5eyulpwjybeib9n20ni9s1tw7uiyoqysk7da07lkk5fsbiuico063z2au7c0hbxsopa2vg2cvcgalprrwrk68cgixb5ftinrg0o272t0tae5iinokcihfz1cozt1phvs1d0ucl8owacmfgyi1jyldqvhwzmqq1c8e87mysor8r4bv',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 612817,
                alt: 'vk6zqw980ea7izoieb6ilp8s6r4mn68iluxv34zd6t4lhkwqumk69zstg78awz1j5x7g7txnquly2lx489k3cyux324w1wh8geayqh9zvlw30d9pqjtz83ljvfyfkdb50iq21iyyjjclxh8fte82zbsxh3al0tlr9qtjoao57zid371zq7j5qf0b51c2d60dv4sfyvf48gm0gv6v0hw1623mqi6f55siuwabhxvkzino8z6tppnwndp7oropzl1',
                title: '6i2feut9z9r6yvjrn6xwx444x2yhea43v02jadm45bbnkkula45aib8zkdedhvodb7tq64bosi5oaaj3lqghx45zgspmoiu88r6g7unev5gaxlsqfc1ooav26o2ojvsz1cfad51sw19p1tyzpfklxan3q3f9xiiyz1p7qdb8s5gmisep6n2m38r626c4hwj7277ey6ptr1wu1g6cmg70v1z9eq0wtiwbsfjt4daa66nde1yiud1lymjd279uifs',
                description: 'Officiis voluptatibus repellendus molestiae tempore optio doloribus nemo fugiat omnis. Qui beatae ipsum dolorem blanditiis impedit. Sint ipsam nobis molestiae in. Dicta dolorum rerum explicabo error. Repellendus adipisci libero. Dolorem quia ut atque at est.',
                excerpt: 'Itaque amet officia repellendus quia omnis ipsa et consectetur. Neque autem odit vero reprehenderit delectus dolorem a. Voluptatem cupiditate doloremque est asperiores autem id quis. Est consequatur qui ipsum. Quod et sed nisi. Consectetur perspiciatis quidem.',
                pathname: 'ypzjmvjek3ifeu9ehao349y98wdpylql7qdlgoarxd7agtvwowdw9rais4fvf6gg9fsng77z77mx8a3l10c3d4pfpt3xtj6dtsq3xil5n2plq06d0x8jz0zu2f5h7qblqkbmmp9pay0zm0pst1nd7ruigs4n5fpk0zujtcnm1ulbw67g1kct9d2lq613ijvxuu3d8om6vd7uq55wb9dzzrcaq96shvc5289gaa6h9lqpgjeekcmw237cg7210hf12q932k2l8isf1l8x5caeguo4wav9akcextjamqftwk7m55qp3js3spj4shjbla9lib4p8t2k03vql91skhcyvu71gxoqf77ixggegc3vq5myymmquj86ejqxqvaoltgdkh2gwsepsde7lyqu5azkdqj7p2242wja3jdlg7dm29q9ak7abm2s4ms0qvccnknisirxjsrjh6m1ahyp5a1az3gj0p1tfnw4k48q2akctym6zulwf4a97evfpr1d9y9oflidpgqlt61vcy80twhqyhe53kpw7c3u142u8o45fro5wbsoqcjpzalgx4qqq85h5ncw29ogbd4r9km9a14hmvuuh38xekgh0jjotbveebqmapt14pivnakhmlj85c1p5cxzo3hfbh48446o5xv6rh171alkeuejyc62yuo2sktrtw1ljeb5ler9a2lasox42im9fnp90x3wdmbp7nggxn2kvxax7e7mk4tc4knwb8by42s8ln0gr02nenthdhuewq6li1m4zvxre2sdu4di1yz40zl0en4kpn8brax09arwahhmlwaprnxnd0lejhgwrhrpm7c52kvupxsg1g6jy3gr39uq5rlj4jbcfv8offn3obx4vqsda6gvf2lze3v94gfijyf2vvghdm1l7pm7ko9etrfypk38t7e742ywyupr0cf39b7u5f9nz814kkbuthov8uxjnrorg8mfkuxiivazlqdkq4r74qy32dctg4kayhtkqgeboirmee6nuycc',
                filename: 'if1mr0fpwnqnbu12b9mq9tsuejzneygyg6dfqcb37fycal43z9p6mv5t20l0czk9ukmol8iv44s9i1iy7s10yl822trmbixavqwgp79thz9evw24h2ibcbydwv0qx8pz0pyxir0cnrcr1fu5wundwuhuv1p60wpyrssw250ke8wqekmkcg58qeuee7j5jsaw27c2ssdpj4s1lluho7dzq4orfxe445mqfuatmwcn93yn5o9iepywko3kqzat83f',
                url: 'ogpxmtba0aoxixh59cdqookvyr79ra20uosbu6hrg2v1cnmwupvtb33542b9s2hdprq7y5mdozumebr54jfmslxmd8n36h9l3nvt4ctnn2kgps02c6g3pjfe58do08vv9519h5lcqbrx15j4zarz4s4p21x3eeeg5f8jskox1i5sswlmruzqgub9m2nemw22ion0x7krlioyk09ta5wm6t7usvygqdo54dexxb9q6st1te7d8e4e06nb1sbr7tfg6fa1sovkhucbdevksys9nn3ezd2epdgnycy7iiyi28vacedsp398qu3fyn5x4rcib7rrykkao5qxf2g62c9miqv16cnkqbjuryo7513tietrvpq6wu3fgdaa023eeicncufhzp2izso4ahhqltouq9uyis7q18vf3mpqqp90r9xcubzqla1pum9o3wivhpowsssbpavbv4aknuiupmjka6sgwtb1cgqbqoel1ja63lc5b725174a0efj16y100c397cyssave73tqjy1ycoldwjsfjlumrj4i126esyrg6m7hlvfyzsyle5nyblcx77u797fnalenl3cnijrfjyrihqvyf021mfghvkx4i8himc7tsg5g6vh5desvadxtsuj8zl3c8caln5ztjfteid3vtbf3c1a8rarezt2joppnhiot0suz2zayzz1hlibgt8pr04y2vue5ay73nhoo41gal00g3nu1dpnhnxevx15xo0912t6qsm60gdwtshn72k9h1u0trvdcdr2am4r4lkbhgptn96ie99t2tv75ohovj923vbu1d4ttry85embqokgxhqqr1d42aqlh1txplle266nadn3r2ohgk873k3ja2x0fr4qpxab1k7dgyo22gjngout3rqu36omdshpta1sj0okkoro2hgdl1tbd0jjiqcttbr2bzdeb9ko4fzdwn1w1h8qxk91q41jkers965o9dt4fh2hv131leir8wco680pxn4teex9jh0fqyaoviv7',
                mime: 'qeqbyqb296z663cv8svmvf0n06qhjrgj9qxqutvmj94qqt4jgk',
                extension: '77ufumxcf8fmu41tvr6qj319pog4q85wlbwkjp2n039hxtqrwj',
                size: 8057468726,
                width: 798831,
                height: 911613,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'wgzrbw1bueuvxvyu2m87spe55rm6ist91aq9266i6fckzdja1v5tqaaiw5sf9rxsgjhhkyucna56cdd3x37pp2wvu78f0abzs672jdd76kzmjl882tzac7jl6k24rwxaw5twa6298gme63qlwpfxkn3zd2ujlz9cllmn4ibf4xl7heiktiuesimeubu5vxwvi6k7rv4y454mh05pa8cd8e675psqjs2rdcmdj6di9f4noyjul8ugba0y1kppwcn',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'm19stebc8e4megn8kr4kd1bzlaq46unq1q3surzmvh2m3mbmqjc4xfmgowf3mnhb0xix8gzy48m',
                attachableId: null,
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 797468,
                alt: '55e6rvnw7ws3fz0zkh12s5eqq0n9qaiexygbrjcltls6od0q0ezi6wajo955gbtemaq28hre5064lkwlcrqvhdorfgp0rdkz3mi9lhmr14brpuvpayviciqa7d1cc9ht69lsjayprvdk2x0d12f1vq2cqeqlpn0byrskeabnfvrvgdbkr5h534lbp9489yrm5aq4mvh1q8fdtr11vltm3xwxtalrku36e8bdo3d3p1ojejx6ik6h2xra4536y5r',
                title: 'x9jc5bwovleh6t7iklrdnyqunbjvnkh7jed0omqxavg7enj3dkg293pusp2rt2m781vvzrng9omdxngc2fr085hpg2wrlibsg0kqiq5auj16rc8n56c8pw78wzk85o3ux67843pjxyb9hkxgloiywtibcdimop1yapsc72t8gjhklg2zyi60w47ptbu1esmy2hixbwvmmnx37czmttx1ivvxghixz83fi8b9v5arjflgw5vxhapeipq6tbpll0g',
                description: 'Doloribus molestias cupiditate et vitae quae impedit qui. Quas vel ratione labore beatae laborum. Sit consequatur quos qui.',
                excerpt: 'Nesciunt est facere ab odit error. Vitae optio quidem quia enim perferendis quis voluptatibus. Voluptas aut corporis totam tempora. Eum porro labore impedit et sed. Quod nihil sit et.',
                pathname: 'tpfh0om1fve5ml4l8srr63ohel6h5pi9odar5ar2izd4hou4syhn59gku3ckeknjkh3kt5a17z2zx2ilk6cx51ln8zhg4q32hcuvvwt11l6yomv2e6yb2l4pj1bvp62zmcxl9qof4tfb9ylbt7jr05v6moceo8sszl00j1njkp6s81sctmng55pgcgge1qxkvpjzu58ai8yla11czqs025qc782z8na3puejby7hwoyt6m2vtd4hz2uosv6y4dvo0ojhqbm0fewra9grihg7y5o41gbtf8ruehqt0h09ybpozva6abfmhke1f0u2jfc09ha12e75x13yntl9g1ppy74tbqw5x4wiilhukibpu3qdkpt11ydahcetutvzkx5ppinsrs1v8y2j811j9c5475zjgbo1km3y9j8u3nudhajrzrkqc6jcknnx9r2ieo1ltsaytjus4hp6x2yotyc67o77191f9d781eg102p03ld4aawwbn5wly7hdrhcb2otocr9e3zo7oa4c9m4618y99s5lddoj70qgggh0tam4w1h81dd35r3d19dr8251que9m4vdv24dtfebz8plenq7avkr4w856517q4n9l1vvil7zfuyf73zwwhyodxde8y0rzzp3q7umhv1p34azx6vz8cqn6o1pjj4x5k1p1lyagqjj44o22bjf2kjn89k5noffs189g9q18o7im0j5jj1cemq4wcjcajjy0ld52elhfiuyqpg8vo4lbfrol9phuqg7j21zsamh0zjxmqiiyk6awbqptl293ax7lgkoiydlx4te8l4ca9jq99r9stgk98802b2479ka43qn0ykpeomaljju6vnf2fhgzeck2at4ws0tmxiywcdj3qtkugweqv62p3ia95a8v57rveqao312fdeuotfas3lebc26ohcktgk5taqllafze9umly0wjuvh70utylgd37vufien882nfjn2xh6rbhj19ber24krsivfovtx6wzau0fe8qk1zpi',
                filename: 'pmmsoyzle587vclg5xas83he530eeer1kl1jo4k1m8eq9qj4cq331lgfs4mdth58z0cfe4aqf1arogtyyzvosndflq1w9zc78f73n5cbhkpse47yzw28p1mhw2pnthd0omsb7jr13ly0yg2klefuekip33hvfqdv2uda29yms6g9jcp0n7gu24xxjlzrub5jvtcp6gyilothauewgi0nvk5eb0zgoskh7c152dkn24u6rdzd1hk5upggumt4h30',
                url: 'wdf57d4b77vjv11fdfbntjgx6ow65tf3v7osuajjlhmo7a2dl0oqqb7ss2grty36iz4pviw1erzdx9c0cpbliu7dia301ckkgdmz2fs1oa980i9aq4wpuxzb8cnoxa44jnvpatq3l4r8y4tie5zxh0c9p25nhxcens4x9uijnz8j4konvjiqrwshmrzpdob97aebkw8pi0qd17sb13e7znhekestz37nswca6u02hbo8up6qs7sjnz21v89kfdqm53xaunmqltphrjho65zbvoyv1x34yboeuqz4juqj23jps51kx7cwcb09gr7otpqxg948wl2wk5k4gzvnwngtrqw38qovn26utd2ej5yl12yh2ikmalgzr9yxo530x7udl1yrgdri9zrxxf9n6ce112msf0zuvg22qqzshw43e06rjyz32atvdcyjhn6n1ryckcvy9jvto6kd9enquc1u2odhvnqyouzii1g10rphmd24mmm5ert6u0owwtruyhv2obltkcoe97eu4c59z3m6r8szyb2ox9x082wn6ix14oc0thhyn5k6lekfs9xwy3412khncgqs5ff1reh4um6jjz24j3vvd46tbx5xsa41g0qtuwlkgfe04thm5ad1s7g51qfbih4u3gg50u3xpsdzdxusp1yb5wrdnyfbjwwkizmgjr5pj369cnx09cy6dyir6fo8pc0sx49hi5rj64me7wc4jvh8dnyh1lp21750q2kk6tktqg1qz9r5r71avtoy95v7mio53dmdwugh4whoree108y8zek43o682tu87078wkru4nz6duw93fcpflq3vzyycbvcvpwn4a7ze5kevxo7dwblot0nwtymq6wnv4gy06ku6vz9coolhocfkii0jf8dijzlz4x45yv97pcq37q4aof7fvpsr4nnr41a1ia7u1q926amsglc6fi9ue5utc04hvjprnrng906q8546bpl8f4ka3h9dtdwblgax5u5gyakb5ofjez2emwuiona',
                mime: 'pvr0wvkd9zkfstpqh20mm97wgomxx452t2g6w6ikefz1cx4eho',
                extension: 'c9m62e8ulvq5nu0ipxvbk1nsy9zm5ic0wee31ambjjbsxmzmlv',
                size: 8643210981,
                width: 939045,
                height: 909993,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: '0cj5i5qsw1oydpyyjfqpu2rvwb9bn8x33rf3emml4hcusiy3g137eyvh12adfiih39ng0rhmke93zmxlwf0wthauj7dlyg8rjgzbzlpc6kcy9kvrkb0k7jse1v88nb0jacai99ku3hzih9ikikong8ddtp33cl7esl3barnkecdgk3vfweio9l8vt2cdunef9eo6hw3ts9ufo95y7cux4hmlnu3ibhgx64tgjnddw9xtba56vgbwmxzwkyrjvh2',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'tbkjt23jqi38ygd67lzgyv55bf56hv0nf63unk6uw4r69rjuqt9ik0jdhz0fa40gb3ahht4cr9j',
                
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 452864,
                alt: 'vo9mn237243dezpjtvbnvr1rc88z71bvykn71ft8jo6qnzhl2q6ud9pip584fccabuhsc781sf34fkmn6cgrg6ftzmm81e0gdbee6nytekdlycnk9yuvei42x74qz1etyixoo8qq648g8vum6d5kjww5ab8mx03grwqkscv6ge139a646p5xmv0oem53sxlwgr75bcea2er9di3kgrm8ez6fhssd3w9kwwf89xy9flhyqq602h3cp5vc0igvgpi',
                title: 'eyxk0ahbd7cmoev4q8tzkphl9b5qvyphsqmv2i7muslvh3gvfmgxob6pwgjd9tqqtjb2pkgw7m4kj8kozv54bo71g7u5szcvhrm43paeb6qvrz1ezaya9wgacd7ju9mr1ew4r3tdicwnn2yhg770jncyxefd0lj0q60fw9kydywmpdpibi23fkp2guw2a9v5lstk5gojogrhe0demd5hhu12238d6ua5wjqqkgx16vvb3vy7lq4lj5f6pfh7fz3',
                description: 'Ex reiciendis explicabo repellendus non velit deleniti possimus maxime inventore. Corrupti doloribus ea veritatis amet nam earum ab. Rerum inventore debitis omnis quia cum sit reiciendis.',
                excerpt: 'Libero quam aut qui modi. Quo consequatur dolores aliquam aspernatur ea non dolor exercitationem. Provident et voluptate blanditiis modi provident asperiores. Modi eligendi quo reiciendis qui. Fuga ipsum dolorem est maiores.',
                pathname: 'kzw27py8o4g8t7kr07fukgse1pg1n75hreh2if8qtysrlmpovybx1se49dzksklqil07ygj6cldee29io4ftrd9n1b1p8hnaab09uw5ae34h0qac2ermvk8sg1riui3i37ym8hlez5x30qrx7tz2egs9wjay9sqpmjf6dsvluycjrq4ub7gr492q5ya0ls6dgthaqcpdukiy65okfepvp0xotxg48harqjormptj7s1aq5nq8bn090fj6cl9a6tb3j1lealu0gcmo25or2lzq2n0vmojhyqy7uxsh89n7hmbr1oxi4vxp45o0imjxm966o32id40scpywilrk1vx28b825ss3x0b6tsk4mxkrjvwh1gleacb7faxn43jnnq43fv2vr5xt0n85c44sxrw2b122k7g9ncx8pat0wmn7kkw8rv3cc9ttmjkr8x2uaupm2gr6q6kf5u0h7ewx4ug8y9uhv32buu3jea8o4uecep3hxy76zxmbc1wj4fsczap6m1afi32rcfiybj837pzd3mbwbvexvl1g1d5k4f7q433odw842oucp2bb0fwmaxsgc6dl6agq1fs2slu6s05xasobw6vb51x3ij2jipiobgmitob4jv25yptehufo0q6jajaoefkw9aobxk4i8kudhgw8bwid4sp4d9uk2jwgprzx4v0jm3qpuyo5yzgclg6ugr8taf85rmr9bk90hq27cg5sxfnduuf6emh8ew6q4oqo3xdccy0qrsovynad89f1fagd2ulgl4to6o56ycsaohjyv4bdq2z9whv8fqt49pt501fze83dyptx0pc32mcn5x1h3uy8dcsuv6zx4xag3x02yu6yskttnjucwbk39hs10dx6ayynrqfn2693mcth3gydbmuiazb3e6euuvk9jxw04p6ayjh7nva9epdaap2s8289elgyipz24ael3998jl3vhusbdgnawhh26wxqma45frw4f006b29t2mjbkahq8wviks2xsw9oibshf45',
                filename: '1uqq2rqjq6psovekj5eo1pxzdku9t9m8ctxhyeg9282sm6xq2kmsj8thdtq9m8up8bqrrzr43sn9ucj9dionbydtxt28jybcsex1578lf4nu3qlrzqojewpzxvyc3p4w1cmb3vpk2ls682iokubsmwuhs7m4vhh4tfxnno43zqjb7wjndkvrextvva526jxtf8tk3ujypwk8w0s3xlq0to8sajdxirsyclp7inv795d5sud1bno1yf40j3vhp5e',
                url: 'fv84mypg3i3w9buip5c9pkwfl3r4mya41qtdnf6gzcti7hm7zs7n0s99tw0vssxzkqud5a8wzpfnxob2rlnc7rv4lbb2tvmijnksahex5xsdwn34h979iaycght78n41o0ec993xdj34omdj0ea7uvllotko1066luz15dk5xe723zabmrvgnpqljk1ufcu0vvn4br1zebamvn1w6dnc6db1g9h897qrv1uicxwlh83x01avgvq0ouj7c8avovnkzw3fcrjtw8l2mppt14vrj2fbwe2kbbzu0qfbdj1vjk48aw2z4g3rf1i4wxmphixmpl26x9f6pyv0ifxiv6yjqj851hw5oit639weaub51jp88bxf6q7dbx2ytp3d565app9rjerwoyykv8n6begz6mro5ntp9iocied4cp28vacicdd07d8yd0efpncncpmszu7odcwt7fanc654nz1z5wz6q4pcwolxffamh4coun2fotylrqpvdaw2ss6pxe6r52s9hpddl64js6q3s57vdz1sj64n60rsei9225jf89o74k9ckjhlpt85enxowxf72nlykcvvu6qvb1tg98234z6s4t0ffk8xnrvcm702wvu9rhvysqtl8fybhnrjh2vee4yhnrn1jyuj0179ulomys5p3si1p6tterlucg0lft701q89we2stj32faxl9wwzuy2n3j26jruf3ipfkp97fnn0wupsioe7pe2lcqc92adfbg3yenfj4pf6wcfm0ssvlgikilm4o2c1x8ncd1n9sw393a3x2lr5dbpvmgwprhsmngq146dg7230ddd7o0iyznrvp2yv5inme8n6qgt0d5lqkkie8s0fpob5vzwafy0j5erj4i2mf64g475tj3ul3083cqcw926shybj8fahqc97h83sdtjdzev84v3vejxbdeulfgzx85hxxxp2t10i0rycyol38sf4dcwadrwtkhv79lczfdg6ywbjw4iyspeoauzz8b1044j7pxyzs63v',
                mime: 'a56gqcnr4p3c2aaybkll4fo1chhwzcr9pfsjw6khtw2btobfmm',
                extension: 'nynoolg4cg0me82kgug5iki9q0fft1tusg7mghzi4p59mh10ma',
                size: 5479278314,
                width: 667351,
                height: 766082,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'glpcveed5fcgvphlhqq1os3apx2mdt37ox126kfg3c0a0rgcloqib5expvmt15y24681vpxxkade3mqx526ntgq0d005g54bypmmze3u0r3cxmdzgk9jmi4ud47i14to8dbasute6ri6wc3nfc3k1seq0oo2tk2ouanxya6wftv8w18hvg0s6v3bkbpikn0oy4a8w9lgozoxnnrad20wcsll6nqn68d1chpvmrvpgnkvbyulfapbuuja41ypcbw',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: '0svwupmusmgqvxr649wuxi1vj63ff2qg3uk9o2ed965mym0xd4z7hrhubdawby29o0z900rzrxs',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 760020,
                alt: '22egqqpf34qemirvx8w78hdjipj3qtecsa7wxpxyrpzc3t0bw22q2ln4md86wpzlkr8ji1hn4xwuc7r7lzpvgrh0enpih48vq53p0m4oaxketivu2a45h468m3w6gm2dxwerzg6j9f9symdy5ef89m45zmdkhdgdm6jsoyiy8z13117mm3ridqqu54uqx56locyu1kuspnwxav78lp0jppdatv0mi4ohd7hene2lq0ezeejjywq55lho43re3u5',
                title: 'tmmuzi98ln75k68fpsalrwp5rdczjs0qyormwrm64mn0wcy7aeu01dd7vddp84ntt2sqpnygdzx9kjs6rr4gb1vprnfxrymavfvh5fatxzot86iqy7z1iq8l9ywh8v0qgeiztj9ekdi152d074qpaduaorcqsy4cmy7s44fofk17xo33i6j5fn5an7gv21z2rqyex6yqk7r42uc7saisdd6ceevl5q3e8giv9545x0yit7gr1qgijz70j5ln5sj',
                description: 'Odit adipisci deserunt non. Repudiandae nisi perspiciatis porro. Beatae recusandae quia recusandae minus quisquam sit id facere quia. Quisquam sunt voluptatem officiis aut non recusandae.',
                excerpt: 'Voluptatem tempora autem mollitia rem dolor. Labore fugiat dolor dolor sed nihil aliquam neque. Nihil veniam eos dolore recusandae dolorum eaque cum eos.',
                pathname: null,
                filename: 'n7cvljvl77cwhw0iyheuwnillkqivmk399l3nagmmajx7mnm76lxry95lpzvcv6syn0nykae1d5a8zmhu2b6eztnwt6emytym6qirt0ytti73skosd97lk6ef3xxun1tv3ii3pedwu61w7dmov6x76rtidhw4psstfi3khbogrho5fa5im9u61iu9g7lnmwi5zaglw5eqnms6q5negs43gmv97k1db6siqx2h5i7545dthbsmafdpllbpocp0m4',
                url: 'dxdz176o3kelgcn1orh30f6b5gk3orzrenipmdiiy6qtzes02qo5b3fjywlge9hiwiot81b652rerchd6qqbb7zxw5q5p5pzqkaor8m1wxu9sir52zrp5tkh4ec2kn9yq7lau7uctyckcigbb4l1e25yzhka0atpnv6ffyirhukjvamdcuf2ees4pa41e15xz0cl8slpu75qodl09dm49hgmuu2qtd7zlcbtv0g8ianqy90qq88m5hl2c2oneflb39mxqsb15ogxkvke5wv2axjgt6r76qfgiqlk2o722wkuf1hr06liyssgjzrf20ep14tt9a28tga61whe6uo8oevitdf102jjets0q4g5qgfw894ou8q388vi1r41sfk8x8fatcdqhsgnuh1s10ex6zrocwjpdn7us2ahddz89x5w00vayqs4w6g5dlagkvaq1srwzuynney7vbw6alk566ldoy8amcioevlesw5oeli3jluft99954a4394rqw9fl18cb39yy5wplgjjhrqlttg6fg4ijsq24gw5vgmxfkgvqujngo419qlm0kseo01qusx2btf449f0840wl9c8g4jg6nq0attokghwtqgs1f3d77mn052fvgkw6yijs0q9rc38zsh2x00a2nsm83ab740u3mi7ya920k44ggci96w66u97a9jor1ahm4otdz8vzpbz4npgbm0upulo3m79nh08y21kisjg23efnvu6sns5eymjf7elfxaidj86tiijbmbdhsxeavhybwaz2meo9ligk1nr2i69qja4209dw4a4rmjqwfs8jvulfin7oil1923ovecwi6vbm37axsotsyvz5rkf5zjs9cecn5pohjdqlyluulit3k6iad8fclc9g2qe6ul24pxyazueh6jdg92z6akpo0stcr0vb2vuv8z4zgy5n3c0fqo1a81j9jq8jpo2q53pzogjnkpp1w1c8dx704qftrjgynnpk0xyms8bih3cl4p6pg47g2gpzvnz',
                mime: '49e6ggab5y4kcyb2y9z8asjxugw0f2im01uaszas1sajydekll',
                extension: '3aqdd5yb54mtdbns8ttqozuzn203oitgcyttdv7xb49s9nsj9p',
                size: 8870941118,
                width: 499713,
                height: 998385,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: '44z50eu2e2wx5jpi1sloi42g75shxhclm66uklul7g7vbwiw7m2tiyk2r6yxukbox6wwhgmv1hxdsq943d6u0n9pgpoev71p6yvs3uu8jrw3zoo2083ue94twjtvyje8n8vey3yzxp9sdtvedtfpi4815epaewh07bitpgutwkqxfz6kuzjpsyminlw59e30t56pzfeeo3zk3677ky694sjfgeik9l8xomjjl71g7diz3ccuyiwbe63p7wib63k',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'ccsat8t4qun8vhmwqa35xp4zzpujbn7c27re4t82bxjqzr8jp97pytbto8xs8pfx4koun9enubj',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 910460,
                alt: 'pxb2unw8ys59e4g5aczdwi4dh8vvdmykn8gjuyylrrywne5swvykpdf024ig9mor8kea4j6oo1bqju27zvrw8tzdn1zun15gkqno9byyr5qqagecjhzadbgm95sc27kbaxy9wyq5wi55g8x8cjz171uxdbnf5x03frkb8c8vjeaeb9ggeprsvsc3rwg27otldgfyrpp2erqqptuujsbqv7op1sa0jpks7i9v0nvhhtwmsuzw9zbdxp8w59smwii',
                title: 'cpsfpmokmphjv1nimiz60nmzcttkbgbqqqpv9nuemu66fyg9b0dgvv221llaztov19m9pg6fbhzczseiy8x9nkwi4gxc8f4fvhq3qae5rug3waayfezxc9vjhwv4d8ayho9lqlqgnr8ds30n0gkhudpzoufcggjp1c55g0by837dffllh97pqvrvzbz22wrc37vs6sw9scqvuwbqccr4ouictdoxbfzgvy5dt9ldxx58d7mjpy37sljq0nwwjea',
                description: 'Aut aut perferendis ipsum temporibus ullam rerum. Aut qui nemo dolores incidunt vel ut. Sapiente sunt et dolore quia. Voluptatibus laudantium modi iste ut qui ratione eaque id. Impedit molestias exercitationem deleniti.',
                excerpt: 'Est repellendus magnam. Pariatur quam quae voluptates et tempora. Minima tempora dolore et possimus. Suscipit odit repellat architecto nihil possimus quaerat consectetur.',
                
                filename: 'rbbptl83vyr5vhryxxx8qtsdep4tqpe3xq8jqqol73bbkp8i7qw6sqbhw86o2r6o5ik994a21ml2kasnoow1lnc09avmeslxuuud9cyks9zythyzdgdghn2jyebv3c5j0swexfs5ding937a83si1lmx0qs7h2k7olryneo1p2bcrbh1y7b1fgnr04iz1nmu7blv6hz26ak7c50ia1lm2k2rmiwnx6278c9t7atzpwb2wcad3t75k6hc9puvth9',
                url: 'u0cl32cu3g4z8o0mszew4ookqeenyouau403e2g1smhznli42aw574c0btjc6ie618zkbqa5n6kmc7pniyl7u4bon0jwkfpz83a0ex4uehe86ssnzl9kgem7r6x9si74h1zik2xjfj5ucza3z528wybowul6vm85pjhyjuut45b0zf50q2g7dossalk6v066bg83ec619xb95jc1tlcrkt94ykuqr4ut489jmew2i9xdoc2npmt5fh6dfoakgmgej8m0qbi41jntum6g82kvxg60j7daapobeefvbau7o3ni6hheb4ypni4l63j63o8532cfgyeoeyiguxmw6gc682z7cpqc18vzn5uzp5m2dg7n1ighwofwjln8l0z85s0vbft27vcvtdemly14holqkp7j58u5xgskhgx6s7ygkky33sg20g4h0ybaz8n8do3pfs641tto8bmpe2e287icbkhha4krlud4f671arg39us5i0jnzycjg9hf6i2au6rup7xn4zjlrswetqsc9mjmqj7r13764x6ttyxzv4qkna2l1uuy8axafx9f8f9oq3ngh2dfatk3le9iv84um6wc5t0r9mnfi5ds1ounx7slnc45b91vamkml9h62qjr3cmpaky4x00yk09d262qsxnnm68t69ion5a6lv51mbwu6hkp0dt7x1cymg879mnfrevch81x8g3xdx0jodi2wilwh52sosvyyjx8oi4drrl74as49z1plihparsln2rp295pcx0f7axms7jmr16i0ywd5uv5cd2kf3ftsuuyggd2hrnomvcyjh86bbx1hgsy1wfuits5ixjrmxt6x8j6ti8gm0l07d6axe06sg14kep9vim9cwdkqfrjyrbk94w6clbnhlflt77qd5e3riaowcry4u66wvbwx5ja59ym5zmfu2wkg0kmw4spxgfv7s977gjij6ns74qw8oe0ztnhnuskrszll59xc5sy7mn6pvom0m09wk70gfi9rm255xiwdue2',
                mime: 'aq7ncogdhlmvdmve3w3y4pulm5capun5g136z75xp8vziahfnk',
                extension: '5gsn9vfo4cno0cywn9za417sxkwdxz8vky8tzjx8yumyvhb4go',
                size: 5383276054,
                width: 301835,
                height: 589245,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'cz1sb5lqfqvqw4vstszx0uud00wfos1yjygj6ejv7q8kff4e3tchqib8k9igxz3fdbkkdm7z5f7j9sxww17np6ifwdnp34ukklxj6w5rvd4h9dzsl9gxus8vky3w79uk1shziki64nm2nk5d0p89rlq2i0ige5apaf2okflrasn6v3qx9ywc2ebpu3xvjsj3bq1wv0245lhj7l51m53r9l21qavtozuc9viulec44ryfiufxxoueo28dgn8dagc',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'pxa3we4ao8c3p3a0n2zsab60ztzta4p5tgwc8jj9biu2saxrfz99x7u9ujbtawqczbfc1kexa94',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 936635,
                alt: 'c58n5mwm1twfi113s8mw74r6pgffp7dnnnsg9aqouzk2q653f50c4rvyqa5kibxmqfyo36zln6ov4et4254tnn08fj24tq9d5oujbj0c7efgzv36l2ri3bcx8ql8d34kdp5z29yfjl0rjj8di0ym5gxc8qxn0osv7vzejlm0t98a5hk0b10l9xkwdkfcfh6orxwvnw9shj8mszffg44qkudm15sb63176lamu1mb3z5tcv85bhbdsauy4rtr0zm',
                title: 'rizwitf76979xvnachac5nsf946u2tcfvgpeg8cgd2neb0gusyt2e80e60qt7ods401x7b8hh7z6zws8btmxrsb12ws8jnu0aa5b4e7y7fc2b42d0qjz5rinip08iyp5azqubz0d85db98elhqelxd8b7vweumuvmisuip9u2rxh77gi8rqrlf8918xjfub7fsan4jm09vx3nxb5xuoia248mb0z7r27thzo3t4lzlp4h9wmkx8tarovu29tyau',
                description: 'Sequi occaecati dolor officia magni. Illum quia alias. Aut natus autem unde quos minima quasi qui eos. Sunt ipsam magnam occaecati consectetur eaque quas et culpa ut.',
                excerpt: 'Accusantium vero ut rem iusto sit. Necessitatibus aut velit. Qui aut repellendus ullam error. Reiciendis omnis numquam reiciendis officiis veritatis rerum provident ea earum.',
                pathname: 'ja8wpldrgem0xjfbyugdurnkf8ncl4qsfaolx6isgltat84dfa5v44fxhihzmxgdormqjk9e300676qsdmj3v83scdspspok3yfs90niroo5hhvf0ijs4h2ymaqhuozvrs4d1ap2ul4mto4me2d6la96dbbujx6szqxjfn8zc635bry53l7gzf8pr4b47yeonr0giy65y84c5qne8fydkmdg5ooyqxezldrght3dtwjvfdiyjdqntb4ltvg6ncrrsrf9vuxxk301q5okl5qylgatu4wq94qwiza79t7wgn34mef2cln4scz4yqr5q7ww05dacrpjk725can1ob6t7nmcj7sjp2q62lip8ry5ec0c6v9t014ie5azzuhaoajf73y7ftdn3c96qxg6ieygrt4uxkxu5ojmw62g35fhcm17o84iijgmegwzyay57b87t91woq6mxytf1hj3gv5zqt7c95c24kbw457e10gci08p9e3f5k0o16wemu73uxrscoretvf72tqv761v91f50btf1pwjvohpym4elm8sttr6660b2qmmfxmi7xyq0asucl3ga5grcpjok2pjgwbfvbdbhnlnw1q9ti66s8caiaimdu97rpxz83z3gpbhdcre5q275fyk1hqfrxdfs4huhyvqfgezcaoezszjufg5yhksng4dctjb048s2ps73mj3lbpsnkb159ahcprhnkwix3ktxtuexkuxcluyzxys7m9daz1jseu7eap8v2elpi8g0wpwt74us58o4v8njmf9432zon4ii4k50mhcmgdjj8w3s6znx47rxulse79lcbo98ycrvq2ui6yz6jxshd7ny4en274zue39uprhf4nj6du7c0nx9c7vaobn508u22hir766nh1on7fai1077omk7cejfrip7s7axdtw6opwcfl2jd66cdkuczxtcbb3t12forcnztq5g3inlz67i1f90vwrox76b56soznhaeykus2pqc337f31wpvu9i0q851w',
                filename: null,
                url: 'kcuxtc91a5fqctm27dskowx1sk5xp0q0avrpx4akxlnmq469w146eyr06lr3d58wz05djnc0hq6umzb7ikkhiwnul98ayeywfwrfjx2d2555kn6dlw7bif5o06iixpqmjijw0u93tt1p9b3zo00rei0y766t2oz9yzy1cscgarftww2ghghlodyjinn4tq2kh2i3aq3y93bqpansyt4v680m6o0m77sge3j7fdy03rnwddewo8vgianp6ns0f12wsz84u67bm2znn1zkr6yjcu6q7oxquu4820gn57963aa2hl71g5y9aofo8m06ty8klieji3fwxisdkrdme910altifsmqmt5jb9lymssyxdmwh5vsdxg8ae54iuxl98gvku00ypcyt6l7nqdkpkl88nu8pgcuyhveu45qa7behyzanpietviu602am8mjd7l9ppkkmefd9ezrxbaua11pfiewabvzpudr3fu1d2hkargkc3ovgnk5cd1n13k4lexzpjl7dky7bcrdbl1gbfkzalbtnkvrei25b4w1oi19coo4kl8nv5xsbmzm6laovt0la8bt6la0fknpajd4sb18f7fcce6xox8h9tnjxuarzhv4d9u7b53cfg1u1ib1v7vt6and4mchx4b8qi7abm131fpa0immrihoafrnfgolq0uzisk3vvwsv2c4o7pqr0oq741ie4pb4shcs1wac4x20b4doa5cw2zcvamzmvurrluyu9khwa9q5jlwowe272lyryytw070u2p5aqz407s5pfyfow5cm2blpy83balxjusp1mwl6q4rc5uqx78jehfps0b3ak2yy4qslleg40tv3ba55ekn2c1d1rguy7plkg45uak6t4c7zpy8i6itma1257h59qj2wtjl3lvvn2njhyq6iyjhtva9v1mm18x1nvk7use5re1w2j07bpe5ycmjf4xgq7tqlbje65t74uouvh40awe5bisi4vop7hfwpt2mktpaial6w939iphlfeg3',
                mime: 'bn5fqvvi1n0fjf0cf1bb7ln4nx3qfmmvuwf5os82h1idvitem9',
                extension: 'twda1f9kh9bc66qvtu3y0swxbskdkjemscejo1ki6r4or9ioud',
                size: 5696808575,
                width: 514543,
                height: 348815,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'ko3z604duhh0dwlrbqjhkmyxnulavzoa6e6jh8uhk8ejzopkdd09k6wp9z7w3qhj4je26ny3l02bakt1okhzso70eong6wdk4h47jjxinkh578omre6uii0os2be11ot21q3a6mihwv38oke1s9vd5klm9rr3czvjsjbsqppzmpo5v4f47exulr36dj7vv3rbbem5npipxi2extk12do40c28y300d1yqsghinnoqb1nee4grsdw8426jv0ibih',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: '3ci26r7z4p3nhuk15m7smqux9l94qoklfinu8n0epo9qvywbz4ombuvyazqjy4dn54lautvzhea',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 347494,
                alt: '67b9txrd1735ffpmidimfarravcm9hudhx2hn18m5rv71r88nv2ndmioza84hgtrajpo9okw8ynj48zaa7b1e1uemth26o0ss7bw62q49cg1tae0tma4qsvo4osalypy9lq62ve48z77b2nmr02ts3zydflxlw39s8hxb83heb8jrfa87trdjr9snlsrcokbnp1ql86txwrinyfxupt1kaonbxm6rl7uppazuglqdayutb7su9cui3hy87mmsts',
                title: '8e25st7qevk1cshu49arrhpcas1hw52n94tw5zta1x0v5y5bq275daw0zjpzpbgny4am8q2jo4x9hjw8r9jfxw1rfqh5ezp5tychs7y0fa6ta4djmlb4gmr6r4s1aqpgi06ck9zn09ji7yfmlpwo8y7vhr0zcr07g0dpb3qnwrw8w8zep1ydre9cm6a706t7cvunohq3vd359po73ur8gu2mt8d7o03vsza739qu6wrlnnntrc27bgx5mjg4cxe',
                description: 'Sequi et laboriosam consequatur in omnis. Aut quam quia voluptates quos non. Vel reprehenderit ea error quae sed sint.',
                excerpt: 'Facilis eveniet quaerat asperiores. Est magni tempora exercitationem quo vel. In qui eaque eum sunt alias voluptatem quia.',
                pathname: 'mm15shi062yf3t1ilrorn0ql3dczxvtq7yk5c4t6wpfwpepmixatp0vpvhmhhvh5fi2fps1mla45v1pna46ni5frio4jf94algldr8gq42aq0obhbc66txmktv9a5vzky2gix2q79br5qd5m15y8tauzlcw1kyza3rtwo8jozfnonxewgry94mpy693j78wy94ffgkh7sizq3a7kavg4b8argdsixd8bm9gcqkttmfobybkerhi7inclcir5043odmc4wa6tcmaij8y42ztcf4c7m4wxdb9uwhotq5l4cnjebnj18ecj32pha6y19zkogs7daqog8ig9t3su41w8hxko8nvasr1id8wcmero5aymfioute8xhnsrl8xxs014bzy64gp2tsj7kxggqre1k3scexrxzegvzj7hm2vjd9art4r87uc27b4umu51uw0hn1ka9b7hdqjhgu4gxixxsurle0907n0g5k6dgbo0ynd9ngt0z400o4dp3bhlohsv1oti0wj0ayoulqci0r4aalczcliuetx42pws55dg0wypo0u7eakittmh8tbs5o0zyc6g3ep2bcskw3vqcirv9l2fcua8axhc4fylskq931o2hd1uwsd7v9fjgggnfdp05l9tsvmcdey3z73xaee5hn6lhfac4kvfdbp2v139dbsjlaoadcaqyz37bhybtihxt98798y61u8bsupx1cnqtuuxo4zrafur00gsfgd5t9ln6khkq782cjjd0w84xehe3zf9zc5j5s5ro7komul7wls9x8nzz41p1fjd12ns281403qherabfr5fhesyuikcfb080ai7ivlah4upg08xad4xxn90odqk1x839ctjssit0whm4hxszpwj1mhxi2221n0a8mcikfajpon3r8gy9w8jxz54scgnhtrdaz4mp23obkr9f84060twcmzoa99rmfhrhdpoxn93823bbyngrz54j1lvohs49ut6hundinkm833zrlesfnkhsl8u1hck',
                
                url: 'bwi8gmzgm42tisri1s28tdls08gwh1grywfsbeyzpcrzjnfycd2sm8ztrvbeytick1pi6non2pvrustmxj2sw20gi7oowtnebp0bipwvdrgggrr1x2idokx7slzrzjxf0w586adzb07ypcgau8fyj872n4et1wm2dg11wqeobkugddvn46k966isu2unjdi5fvp695lf3gh4o35zzuvbx0wx09okirfdcxmvb39actn3xjmszdoewprcjplfkqjznyfa3dnbqjble1d7qi5ai7c05dst9qkjv4dc7qcjgmaljrs90sme27yd2xdsznypxeggy1ewsyvkxu5picdf8zlpe0jxh3paq514hrvavoavsb5d4gnann4f166jk4qm8bsh8nlxortvxwe194qnr9slsaa1ad10i6p2odi5kil7n0mzk3klbasgijd2ygkvlyctm2lly38uojmdg47cvp7h2fygxi420oh0vb580ldv0w0nyaa40kh8lv90iwl9do7mkg78vym71txa8a16bca4lijf3s1r703lxufi2ezeqoyio75scllape8ttb180t7bx3wpljpbcz746ph3pvrv34qbtarec7utcjz7brfmx3zkbk57aeq9u289dbhpu2i3i3to13sosg92dz2i0hc8o0l8m51gtpn681uvlpjx2zsaiwiwbva3abw951xkkf4wusgiaw9gfpb2deoke3xo1efo1av2yuyt66ozci1n7obfld59jprltcdpr34ez6q8fg5behqgwbwhp1itw94p8r01fxqdbu9i2dezsrq2judgf03c8dxlsd7459w7qof1beug7d3jwmhctlv0nvuomf8rt184pmz294y578oik58ohikvoxcotkgw0t48jqtsv7t493atp9sbgdpdlib4bz4wcwdg9f4dw6xz2fu093scbfibfvo8qubl50g2k19kiteciiz4sxnuj38f61mcd3wjsfmzdpf07whbhxk1lr7f7hxx6c2jajbfqdut',
                mime: 'ggoi8fapza0latvvrmk69bqtw9gs3k8r0axir8hyyzj1bsisr4',
                extension: 'vaetztk5weixptoqvewhlyj4vi3vcburnvmn68ww1hba3o42k5',
                size: 3102250229,
                width: 741188,
                height: 356093,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: '7ynortmjdj5fg7djbujh90l8ovyctwznwp8xpnmwlmtm2awi2ov0dwlr0jvyxby3e55l30g4e77p9pc99ba51o7lv6c8cz9r2hdwgd3xzopvajjinaamble3jmdaqtey5mj3mu871449jt5xspv3yi1dia8yyzavu5kl30m1eghyn1hdm9ackgp57bfjncoqb3tp6lwnt94vtn9sc3a7xunwvq5hzdg9jmcvi6eibz7ji0ss0tzvobkthocg2jm',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'g0ggrggbudhnibwa6z2ptrm3d7xxbxjdo2atp8zac3o3btbusg3ysa55mke6i22vl8e9zs8lwyb',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 649137,
                alt: 'nzonhj3crx1k7zp04ki17s2chushnxw00rilycie4395m702wc42mo0hbgba2za28a8hsv1kjv1m2mgi0c3xcq84cut69aye0oqey9euqklqfi23c6j85bo8eqy61ztfly45j6sq9y1ekknshm9wksrtks2562uro018w69ud8ydbbnuuokkvv1f56xl2pun2tvuek6yqjittso1pq6mdzs2h3p45jm0fad1mmsl4lyzcgjxeslgb9dzv35r0s5',
                title: 'ldcblnh7m2591tq6d71pl6j45dwloseywxg01imf75j8nt4oovz4fuccs20tgf408jwclxcvis2bytdcg6c4o5s91vycz0fu15idmfveoq0tqn6p9vhhtxmmp5e74wwrrowobt2t3ffq0yce3lerx3a2984yk1i9v9dg06sgaarjh21tbexhbn3nno215ki9nvcu9p7bc68gqttptwzaq3kdwje8oso1rlgzo95qbiu215vysog7k4t4u5fvh9o',
                description: 'Autem praesentium deserunt voluptatem repudiandae eos quas. Aliquid eos sed officia aperiam explicabo sint sed molestiae. Modi rerum magnam.',
                excerpt: 'Consequatur quod non autem. Qui odio quibusdam. Voluptatibus qui assumenda fuga exercitationem quidem fuga. Ad minima et impedit et architecto optio iusto. Iusto quisquam eveniet.',
                pathname: 'b1sa9a5dzrqed9z5a27xsfhhjy1heue1411tlkh2m6lbt0fmudsjr698iijw67bosohqhal07slajqn4ogpquk8rsv6ee4n8vi1kbioqpbrk6urc2trkz8vktw1xti931d5y86pc6k0wtle2kr6rwixif7q6dipexiwazz7mo8ua0j4vjb55utusknjol8yfa9b0fq2m2juptsfurj3w3jxyt11hi0pe1avpsx4b3nolkp9nr0jsnq77wlqi2sp5l35m6bm9tkug3g0pel25fgil2teyhrn4vi4tv38lqfotktr1hoaq819h50hv8y6sobbx48kubzk8fc83puktlx2303verwxbipypa4bdtrer6r59d5r6kt63trvgo65p08doft81bjl3zutpbh0wnrkicgbi975ld4clgh63z27brbtnqj6tv20b21u17gbakx3zqw53f4wkv7sqs75me7cck7k6sqpiqo5vzh6z3j0urv9y4g4v55mkzr86op43anx7lo26okhkks3k4je69x0uru8gn6xq2u8ps2my71dxw6olalsqicbf6fmy9mgtdg8jlfb0gz3yp86m2a90n75zhu9pi1lq0862yydp9ds8peajjrmozj12cfuqk7d5izqbfzcwu9g8aoxbotzxasubyicudz7bpqtb6n2km7c1y0spsh8lpy0un1xs9rjk6yeuiueb3jg962xeomdkt9b9ie4qtycv0yvj3w1jg73aqg2r7zs9xmi1jqtgv556717nd9fabgbqislwol080je9qle3j0yznew0pqaj1iz603dblp7r8vebtf89fxhh021g9byxhwqr2tfwt4436h4yvekzrsb9uj1xy52j4emcfp6xxn5zugvwz0plah6e5zlfzpkinbrr6z5zy007hyb45l6phld1eg3v3wchm9wa9oi749ep1ujznd2b6hfko98b8w1krror0q99c6t2fii7y6niazcbbgwpu3ss9hmi0v6zg5hi4dyakshxjxfx',
                filename: 'sihpip0tfctttitrx0pujo51erku6qp5izvkweppa3ufymrrvnkcbwolzts0pklj3ibo0ebdw3qrurt4u7w1wccc5m2069mlh3u80r85hlboyq5dopq22pm1otlddiqqe5dxoo9zjg99jalftb7r9b8jn5d5p73bsy3m8ssexh09vacakoytqn8szy8u1ll5dmudumat5yznn5vwbmiqpcc9acbsrr3xcdjbnwzw0nfit7t4x5uu1692544q1xi',
                url: null,
                mime: 't4msu6qktsla36uvlt723lj4dh94n5406zqm6hg3k8c84hk9gr',
                extension: '2laay7kb6ovwdgnwnxv7limwn8zusah0o4v3zbi9bqpg7pywli',
                size: 5456378338,
                width: 152987,
                height: 462869,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'mme4k2drvxtu4tn42fj5vmdhvs3ck7lezqwzx894sqoxmpkcvd00c1belcbfv1kry8iwz05cjt5ys4pozpwln2guloc6qrsjwqrcc1ru9rfs64ysgfrl5g95ofv3i772nrq0tc2aibndiz3pwviriaejtfpqfg0surmweqv2dwl7hphombilk9k93fivzl6r65r33pbyii56wucn6gbimn0mhw7avvu3rpcmqke6qoxkurthrkwglw3fjwzi9dq',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'zqye4l1sq8365o9ygf9btvgjkljxam2lh5by2lk1t6entvhzlbtlmfh570ss0uqpxmar8ww2inf',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 491179,
                alt: 'mlcq1tt4a5gkjqlwc657to07qff2c9gr9rm78pikmxe9x7ako8arewi4asbiydhs3icyhw1if11wiyptwtwtditiugh49r8elv1g8d3c3b4zupmsznwbijret4q991qpp63sh2qm72flhci4pnuyw0i94mv0gz4qsdpgkr1a0lt6w7fqhlrxx9ow6do6c9p7kybifx62uwqmxmumhq1k9vjzp5qigqwg6opz8g9i3nq79wl0tzvtepg1k11s6fs',
                title: 'og2xgfwy7e90qiq15hdb8cq6upvl9k0sdayw47mqlasnp2bjt4k6ohbmmyyipefi6ib2axzq27750jyoenhxngdzhp5gnv91o8nhm7wbeqmyrdbhe7ff9i2ufu72zipgwpfm0yxnksjeqkbng404mz1xnuje9wh9f7efgqsovuja84zdevub6no8dg2vustm9pzkpozvn830ikv2y3pv312izxqsqe64blkam7c4t9i9pwi2xk607elfob7pz9r',
                description: 'Vel non aspernatur illum ratione ab aut et. Voluptates minima reprehenderit optio rem omnis dolore vero. Eligendi repudiandae vel neque voluptas autem rerum. Iste officia voluptates vitae.',
                excerpt: 'Laboriosam harum sit est est qui iure expedita voluptatem. Eaque neque itaque dolor accusamus dolores. Consectetur ea nemo quo perspiciatis laboriosam.',
                pathname: 'n0yzozma67acm7q3lf8poglcjoxyncccjbgtvy349w3u52vlkq21n2baqbceh1wkoqmxycrsmp3hv946umjdq76ifiu6o7gvjco2ilxoe4tunwrw5vd9fe7yyxkn0hacd8n93u69qf7u6dauh9o1p4bzbxwf9j4khxblkvzjw5pch156aipy2y3mu8u4owugvhmzxszopznxjh0s0rrx4zfwo1toh7wiuy7i7a61yy2vy5aecl7lzc4vanmul8tslcqqk1hkhx9lml0519glvygl6jqezaswjimxp1yp4w2nkmno7hfn0hhceirnapt9la8efg0pg50jjz9vgmfmjy3tlo41i4k5tujozwtluaf0efagpthtw6y7d3hr140bjubgzg5z56053a849j1ftjjlot7wqmu9b7gy4tfodzfves7wy7p4qczar8ttj4bivxnz7jgsf2apj74n5h1mq1u6m0cxbjl348exhzc0bpt3c9nthdeorp61wa2klzgen4frmh1f8i2kfzdu2d056dji5bpgf482qq7ql6a6vg39z82aurm9gu7a0uru9ky5qqb54mqxwpf6l1lkewccxtpc02ulgfdps9p9v8pwhvfgkueo1g8mlmv2638fwbnfqaufgirpj4v5b7hzmutzubu4lgapjzwbpaktdczxjg539pjug1m27hvz8jnh7miyik8e54rfnyyuooimn6qaayhphzhpizng5pvh4nrs3hrnkascpe2x3j9v52jpm6gv2m1qnbikqay4efzgjxxhc8puddei81sh9z216ywiozrx7k41kew72h7ciq7ypipdsm97lb9xv9bfz1yqveutlzr0tbgx5g85orj2kx537f3qnyn8fnwad58i0jzy9b5095slx2na9zfx1y9twsbnpnvvfti8vmxmmtjimv43k6rlpvyk0rjt691ozu5gfgfwulo109m0kbbwm3woa7otd0xw5q45v531j0goj1ipetx08saz0hyfacxqaunbzfw9',
                filename: '6sma2zm14835vwtds4xxbf1cop6ub0tg9zxwgoe5bdv7wgja1gw62wg4we1btzash6al5as3yo09201h8c2rithj5y371c7vgbnm2hvp2bqge1m4qtucecmbtwvtrrkzrp70cd0hipa3ef7i4e56gffmut7pkbr3fmjm48dsofdwuq6g6pha803ta6r8z6q5eky10wct2iyxy5snqt8b4csymjz1vpwyr23b6p1d0zm8qitfrqr9iu1z9kdpq6e',
                
                mime: '8l0niuiz067y6dyan3o9refijex2bqbwmodgiaj1lq7bt1w91r',
                extension: '449dhetb1prwvnm5i1eir7hrto4k1hjrr5c2qkd5xtncfclry1',
                size: 5173993045,
                width: 812117,
                height: 921946,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: '4eoygik3jqgxx8wtct4xv7vypzoq2xvea60ujlmi092tlbe7vcjrm0nh2p9joiadffzmjry5arzx86ecqfdjnaedjbi1jwgetzd9nz798cqhgxvop4cb8w5tftenm1evgun7tui1fpyf9nat35hyso70xlvtswac5evd6hxkb1bb85w3oy8ft418jrs0ivax90noep7h79u9wgmd8mmq8o5bb58bph67bm4unhq2yi3hh2r55wbdcptes19eq0g',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'dc45tfxbbk361tdnj6w23rdd4ys974i08gotm9fynx35dfibs3gyw8b09i50g2citbxgylwki9x',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 158401,
                alt: 'xc9t8w0saiqvse3x6osy7jllk88j2e3t41ipj02ery9ozk7udzxqaesltchnrtafzeyvfcxccyuqn9asf1hurcjv4939v0rzyfra4cr3kgpgqbe58v58l76ttbgpgnuwonk2faay4fohoeujka36781geb6hw7yjhuam8kmmegiyvj6ehgnpocnfcd7l0soaadufulrt22izjk6qdli2zb0s73zqujov8r599rz6xlrdbnri5osvgc08zqj0o46',
                title: 'u85i24q42rkorca2imrwos699yn1nvywli08puew38r8stsdc7cha3ubtesommdcpjnlw0od1b4s2mdom0l2uec109xixuo86oc4ny4ka4vn4215goegyxr6npi7suwgcm5slegwhq47j91o52vsdll3fcer7v31md348ceuybkydfgqegii20exsmque950z6ykyzecm908v4ne9vy6upejln8ue9k9awm5h7w7din03pfege6bvgv5fmt71jt',
                description: 'Saepe id cum earum ut. Beatae sit veritatis est perspiciatis soluta. Odit fuga vitae ipsum ea. Labore laboriosam voluptatem quia.',
                excerpt: 'Sapiente et accusantium minus temporibus. Quia sunt ut dicta. Est aut dolor et. Eligendi et molestiae enim voluptatum expedita. In rerum fugit rem tempore repellat consectetur sequi ipsam nihil. In voluptatem illo atque voluptatem et nisi.',
                pathname: 'l7xue4ftvvaq1oq14ylwe5auek7vjz0dgqbj94wjftipvfidqobkh2j5scdsyslivd28m2ahoba61k022k2v5lp6o74ujmty8m2aur39amhmwtlxu4qsryaf0p9ajmf594ktuw8kfc35e0envb36ofw9cqseboppazb9ccmch794p46gi5vvcv0dzc7437bt0a2lm9xmk0a6l3o9t2oaqqj95guw0jh8w8u5gcx3l4zptu8aglhwllduel0ye6ocgw5lhzdy1q0ebic19aolrzgmbfhollf0zbste0saujs7u0ek7ewrg2fkftmmdo3i6tq5t36ddfvd173hkwdf5y7tzrj9qvuwmxwd2mnbdlv8ds276jhseavwykwbn9mw7hxnstw0hhhe2hddujkbxv5ps1ab1l103uyziz6b23b8alwdvbk0uc6tcx9v5dvwdjegs25ftk17xbgtvowxqddqbr8paofwi7cbidxjhukbuanfl3ysz3bcemjjglt8hi2kdgco64q5r77hd9arpe66bnwqfpaujq755wrv1g9o3x8enc1dnmfuadaocx26v3wie1gtz0ua7soygmsi7s5kn35dyc3s78h6ohs8hu88hh7gyipi2093uk2wfeflqjionia6l7lnd7p2jwti6azh3xvkshaej02347op40ury7pbdayxs7nf216wvoriy0r2jztfqvlnrgtveu2wwcbn89xcpjgf71bqox6pmwi00hem5t3d4m50uatnbjkhk07f5amx4hrupkouklb2qdgi2b7eddp74t4nhmzv7d57nusezyrrsnf8joqfewx7rs0nesxezf7drxw0vtiukxo74jnu2la2rzmt9go3lwg6xqcaqso55mh8qi61gc9vhqatimdp85vze4dka8ihmvc7wklwrb7u2xpyr6ukuimyg0nunlqtzb6ixark1c75evzo53pgtzodi54esgp0pk0mob9kpicqvg5z7u9jih1pru1uew8fi0pxyt4vt8l5',
                filename: '3j8jgfr48hze6fierd0kjxvkdusnh7dr9jkxs9i9wq6k1uak9evolev12e9szvjcn0vukm0cxekerrrdgu86ipegslt5l9c13r5esmye8gk3e85jyxl10vvbemlw0krc937128yopgh9d682jhduuo8qzhtlmfcpycf90uohzve3fn0c46o8dyrb609vvt0h1xfq8ny8ddllq14wx1l0ig31v9ipfljwbtl9ivky0900apuvcrwx44nsrb4i4wd',
                url: 'eczxf3njvu2njy0gg9sg0iuynwc9lraa6hulwnik2btwl49jwl7x98p3wzu5eu9a2oli77e6fi7azntbqjwfyraq6lthka7itzxevxq8bmtrce3t3impnp87p6k0hcl5j037996frnvlk76j5hevmf3gpztlvwcfga4mh1wr8saib94x16sm69naqy706745rwx3gps975e36sk0is98k7i9m0gsx3cmzti1r0celc3l72e2d0fzd1iftorrzz2lickrce8ufvbp7qyw7j3t5j8sitwop1bdrn3wqk9d5ehd5lt8esqflkje8365qweo1g7r4pdnzd8xfolkyuqpf50fu44z44wenbm64ox6bzet9g3bz5ac2jz0oxlcs3om1sqltmjrery91saliapbggfcsrtr2f0q21co8xkc0wh3qls382ob9qn4r3a6mmksg0c758jcvous8s194rijlcqwa073j7xkx5roba8nmb5aamz5is2j9o8mieszh5qau51r5sqg1a4a3sanaifj25qb41vsudpq0lnxhnkg1gwxjv2bo0b0p6v96g9y7a3arx5a6isw068zphztw1qbnx1tfkmaijws281oyy9jxnclqers646d75c9dsoy49zumnuwx2u9rgc1k316ncq5mlsqxiv7vzoe06n5wyvdscpxp0nrg1fprn9beekjygvtmt6xedet7mqdpxq92xmcgf1ct02roxu40kfi3qpgeo0a3gnkza0a7bhlgj83vzfugz06gqanbq1ir640fc5ivahipob828lb5zpywk4y4pucg5oj40m6nhtwc94f2cvibvt04hfb721ref3s1e42d3lwpwtiyvukvifbk4mupvwu8wu70evfh0ebt8w8nzu7jfh4dz9ouh5vtv269j91khku0m5qcsb1f7np122lh343dbcevqu0ejj91456n1zejm8vhkj18x7t6urxqrz1rdvoi6lg9eujdbxc4j520zbkn4dnk8jjjkkecijd1s0r',
                mime: null,
                extension: 'xcnwyw66pjto0vn3jkfp994ghd9mghwtic12bb4xqa1vf3exlj',
                size: 3205772284,
                width: 266694,
                height: 338246,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'qs2j84siv7p8ow3aqwfijgxbmriwp1bncj6u1y2w7dq3oh9q47ajp2dckftj8w8q682lvzy71a24qx6y30dqoy2vfhuax8xn8gkp5tu8n0xf9vacr1bsumspj7w535i4cwbyy3uq6ddcfzp4453sfv96xa1t1ps8ry4kfsa53fmtv2shu8mavjr6aexofbjcy27437p9l9wripyems1zpqllpvf2mhwj3vweedo5746moy90r1kqir1d3yoawtc',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'h7ufx4w9q1pxalh24el3c9e5775as4zky8xpib1glzd3sbjwt0ifeamxe7hd184ekfxp9iy3snv',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 262551,
                alt: 'k31zsnxy19ycu691aqqju22eynybe5bemfdehk36gmjizyarbrbuht9tq24d9jpsrpoibb69sw5gav2w1kel7cor8y46xc9uk4mldxsw14ho9bg98hcb7sh5e6qkd4x0yhpkroeut7d0msf4l52ktaiz5gvvqm8ggtjpz9hilice6qx6v6vzae9ny7m636e8de7g741mypn22tt945c8c7xq0jny9ayqp51wj01tjj8svhbfofi7y4572z0e1wt',
                title: 'h3eeie9js8ynfsny3wtgjgf0epff7drwwlhgpytqhpxfr0gf7nl87t1pm916gs22mr2f4mqn8q9wmzso3uk7kqfp6syl9zfv301d0412rjtu2fmrcag647g03gfkvjzhdmiuzcvzmhew36lqeux2ywqo2rnrs0fce1t0cqinveb3dx26lf5iun27pxuotw1qcj9erv0uea8r1z5gsernn8flj9p7hb7v3o749v42xq3n4sv97j82zkm0dlnet1g',
                description: 'Culpa vitae est natus tempore illum eaque. Unde accusantium quis et aut fugiat magni laboriosam enim provident. Ex consequuntur sed possimus omnis rerum. Distinctio quae omnis eum labore exercitationem ad commodi amet sit. Sunt sapiente nulla sit. Non aliquam id excepturi iusto similique ex.',
                excerpt: 'Labore nesciunt et necessitatibus. Id qui amet quis maxime iste impedit doloremque voluptatibus. Sunt ut dolorem sed rem aliquam. Qui eveniet omnis sequi sed enim quia. Dolorem officiis cumque expedita unde.',
                pathname: 'r36t4z980y023ergu5lzzpkx7aeswuvva1kymler35q3ergy9bhetb7yo32y2zzs6ynhxj3nfgay5cvlq6fxuyb125yrds11uxthxqfj0derzsma3p5c3jgmakx0axuwf6f037t0enuctm8hai5ghhp9n8sbytv8b0xgwd1dfbgx2h38u5lqp9wz7f6mo57vaw96igansao3njrv9d2s434aspx2amrx8jveyiq9lal999ino20lswqhngkzq3uh13e59kheqf5t2gq76yr8a7fdl8ckeyq9he1rn4fdnr5cay9u7h2hqm47tgnnoigwfwy7ffh3ifyncnlgztfahv5bafbhbgcvt7gl150mmga00z2f38wlwj1pb1j9kxqf2z1bjzftfee7dmyi3kfev67bix58bhym8dxc3j0bjuz7srro8jn5g8nsorq3bn92werpcipci00cprnmkhgjwl4q0sw2o5toc0qxgrbc9wjmjqhtqsy4agh8wgnzgfgl808l5n8qrsdq6r99a3i2yw3inou61d4070n28bbkh5srrlnu3uqgj8zto60ifnje30psusi7r4uxfgaz5av4dcf0fnxwdx0togh7mw7x1xys04zqyyzpjgiv241xu6c92n4g0ga119dbwa3s7sm3inv9as2rcgutf79gqqy6np05uxwjjqlxilpq0u4rzo8232ima84hnuht7xm6wj08gr65s0jjtujxrvtie01gk00th8lm0ny7vbemgou0mjkw07jv5mmymh990ryt9430iupymm8pykxhz4jtx2opagtmtul598o9oxohzxk8kthkfg2iirmd4vvlmun7bq4k37bpx67p8juwcx6q6d5hjtxph37hua50jlsbbhht6nj6yzdk6q7sufbecvcj0ekrr3vrjzx6i8qnbqdyorgas03zdt5z233wwj3ibjhm2h7h9qmd8sk1w0kzgmbdckf6gll0k9qrw0m5nxe4q5a6yp4n9w1j3b7sivmn2ddcu7fq',
                filename: 't5swcy7bpw8q4d5ccilky3jpne5wj28cvspaazg97fuq80h49rnvs0siplnyr4a596y8027trnk3n4t6v5353hzbqpi9bzbqzxtotu4e9c6gbsypkn2yb1jhohem11qgnh9fa26v3djzwv6t33epayc8syewede340ihbtswyv4e6056xsj42z98am90gdw0ekt55aubtpdz2iytwichrtiji762h15a18d8dh5fp8a0827lq5h9h1w646nla6w',
                url: 'pidtpdy1xjl7ei2du2xf0i0d15257fhxaw1jg82duiztj775pmpzr4kap105vijf7593yfim9g957o2c0vkbq5dui0rw074dalava2j2esdal08v7yddfzp0pu6udh39m1mm8ghslxs1ttjdebq3g0mkedwgmg49hnt70jc0rifx6078g9du9kp54b08lwtkhqn68tkv94bdjir2l77vopqlv7ps8tqty3yh02pvn5z7no2llep1t3a124h1ls842z4cri72aydswo66o07fhv2r4ivnajv53lll7ofve5p37mj2qwtnv0v1fvlh4yi1jm2matcxp15aqf14pe72lr8v9kobg1vtk0rm9bn1vidmc9dzwapl6gzzlhr025hhclhlgtb6y6xycmd6ked1cmg5sjsg9f7ct6nohv3bq1oglvsqbmj2hk1ukqg9y2lep0bylesvggbspuyco9sybvaigk0n89jigwsubojht78oqex7luqqyh60f2d1b28kjax1y9htm1l3jtsgvx7xduhhlbebab8w7ov7q5lh5e2nd97i2ebeb0fd2v8s1lmkuahvzk0lz8oo9uxrthaqnszyznir64pm2t9hyu4r79xysdis0cv3x4dcukkkecj41d6cht4ssn2dovavhusfcn4fb4u68pab8xvo556ldktn7k5x608bfj8meuwbg25dfhqg7lp0wa6v7vg9tdtyszvspdt0gdmr3sa6ca3qzz51rg740ylfjyov1y3vlrk55cdor7dh7c4pijzavyt78nmg0zx7k0gqqkwrj3z4ba6ybgp6bf5sx6yw995xqjlph8jrvh1tch4vz7bjfbnh5t8sqnw2vlj3kbuo691vzmll0wtjdtojsrj032kqfme7npan76japk9j28v8mytsssrlup6trua0a6qiangyb3zi6xk21ch4spkma4a2md7ft30ell3vqegnctrakd3qjt9qf5c5fyuc34rzmiiw6oy1o9qnw7eeo4voumy8656q',
                
                extension: 'ckuxzxwiv7cq7jb97hdwwwi0w787plal1e6pavl572n5nkiwaz',
                size: 5834500316,
                width: 422663,
                height: 868986,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'l02vr64omdy969heob2fc11itrc2dhajzph4ifc1rust3wu5nsg3xaot7gbnjyntfgs6ygdoudz40ck33x4t33l9nf23qygdthf0kvij19dmooknymat7tjz8n351o68ylbqiqrjbsm6ynrrint96fampeeofbldjb7vpksu9wr1y6scd7xpkj2di2hvuj5jkoiqxayf706536mze7k4if7rxsvp74kzjaddbw188yn9g7x0we9nfhethwdem1u',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'om0wcriqrt5ptid11202ru02hbn2nh84udq02q4p35w64dmd7ofaaim9h4kxs3tpg752yvlt15d',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 249192,
                alt: 'uwdg5ek7ni5nfjmvi5lw91cjrf5k9w7brg2q17puddfn6rtajszf5g9ufprta889kh0pdwzzsi6o7gcxb4qsfbpub0oz48a5jfzlll0ipdo3jzuuz2zuohcolxwynebr3wlu6e7ecemonoc9y86h47i2zcn3d6lxu5pi3gb9dzqekdw7q6oeerztkm4jtwrhnpkpf88xh5wpyxcew6be50pf7xlnexh3by3jw96vf933djt61cpru5pqdjm7z4r',
                title: 'n9a8heq2x75w299b4bzm7da7c8u6st3mhctro21uvpuwwlf0x7aylrvznqhk5t17zitgnu69vz6586wlzix5yqkzppe96s2hwchamqaxdt5odhwrurajhk5b9g821mgellp43dt9ehjhmfpyati1y3q6v600a3uh9gw53br9vi7kauit3nzv39rr75cfsecfqsv8vswbfnylq26cpeuxtowzzvu526s9g3o03ydsoxuaewj46zmqganrkejh3y9',
                description: 'Aperiam quis omnis. Quia est quam. Ducimus sequi omnis voluptatem provident veniam. Dolores eaque autem nihil ut ut quas. Commodi non est delectus saepe qui cupiditate.',
                excerpt: 'Qui nam ut dignissimos. Natus tenetur enim perferendis et ut. Nihil qui voluptatem perspiciatis quam incidunt error ut rerum quo. Architecto consequuntur corporis qui sed totam ut at iure architecto. Sed sit accusamus amet quaerat in.',
                pathname: 'ancn8j9iddrdtrhzc40dk9hxhdqfddvcrlbqhav9z870i3zs160e8tgjhjsh9ho8oj2yspiekw4qo7h7ceb2mcgi80mofp5z87j7q5b2j2ul8160j63mer4r85pa9jq2snssx1g5dbr0nlmqh16iuin28qih96jjptr70k0yjwen7g3nami6jxtjn488rtd5xo20kkmszjsunft53r7wt5e23u75k8bxoq49cjrjao9y1lexf1b0ucmv94h2spfqb1g9i49dqw7mgnxr8guhs2in2r3zxysu7xp3ei559ybf6k3l6xi4hvtorcem1pwf0zdvq3ts9wcebjo5hq0dxllnjo9dliw3xzzpevycwkpq6rkqp44dh2kisxwlht0t9ci89nc7nhri3xs7qa0nreca6wa5j6phw23gk9hkb5q3h3t5sgq5kdakj0jzlhqk6k73nxmazgq82wffr11tcog3w7gpwk4jicmp27iyq2534h84p2i92a8a80nr3xj7lprm87bb47tf0a5ynrjafu6z1um9tss7jgcharwx47bwlllkmh1mw8leda8re8e7ll0shiqnx4dm04zkeq3gu5cf47jes7gfsm3uf1b1bgib1obkewrif1vf8t1kwvzhaz8u5g8j912wb4xowwzmc596amg9aoi9cjwt5vbrndrtrjwq45uvp4zbidwxlgx16eb8xrpgqdo5w2aie25mem3d6753m62i9o02g6i7no3k1m2e1rrfu8zuduhhnugugfvrmgfxfsm783ry5jjr5nw50lrx4thcngzpxvav9pd2g640nirudapjhu1ultadd0c8jivsor406ndhjpczu7kc3h8xcdwd4r9ck6ffbyuhhhafx24e8dpo77fwlujql3qsjrydzogilvdzs2lghwf60y26pzynvq49vb5sk8m1nhcum5i7vsaiw0ascaavvqj2rtil6kszsdx6r94cwc4zi6ikyaznvps30hp8v931x11kfzn8cflui03olcmr',
                filename: 'yvu6tdti33fjh9r63w5cnhcmzbzygt42q4wuvzqcv0av8318y67xrfz26mqgrz8b62fj279rvwhcz4uyzjahpobmo2rw84jx98po4wzatbw2k8h11bkti9v3udax80lya3gtw0ophotkalxkductrjez9mcz8wvhephtk4quoko1f9ro2uwvlrv6jyc7lp8f394z97hj3p1vcuoxd88aj3fke19nvij5y1zj3kdsmexyajc9mzw0tf3a1zppxhx',
                url: 'jqbtylral5tkd0flph193pxp9uvfptstxv2le3mkeulq7f3im2gbp4xfqaiz4l9pil0hxk18z55exf9n3xoda5lel26pirj30xzuwtent9utn7arp2jjiw6l7tv5xxj1353nff50po110ic84lnz8mm1hb3q1igxohz4bnplfvv2fckkxi1wwdwhfudrmry71xpdh26nd1zmmevxmsb6mlitaygu8ujre0a3p0qyoh69z8hqdzkoz3xyu90fhow75wao6ceoe5u3unrvwkcbp5g1ddmzq0eltd3f04iu5gq8d7gem6jytjoktayl4zgf94945lfh4vjxve1d19tikbmgtbbgggptsjw04wzmv8ofjvpltnxmgpy0pxbqvkc803iu70j4nwtq8wu0k5bbxdbi6e77pc56ufhc2ikskcvo3pfuuofp26etim4h05114e4o3o1iswe0hvdhmo9t33pp1mbp5nd0jo6fm3umqg3ib9syjqpb3nbifew3082keypr07crqwtsh01k0vpjmhkj9f2mtmui9aehqp5w9p5vn16lwp5x6sn3ywd025h62caqwlwxv8afhi2qnl51dhnlz1x0ffepil5u2irtoo6qew5yos5drwkm1vg7z2l6wx1vner88jkdlne66kw5zho0otlg0ghck6mn1ce29gglgdn8yrbhwavm2pnpmngbaqhcnjojtrzdzt5gne0av60pfluci4s7ldfftr8un9dk0o25ctcwfumjo1twmlfdesq2ong7rpib8pqratkhzy61qm2qng1tzl04u3x8uip4svut672p8gxqoduhkil090ms7b13zd050hvg2a78yoli0vzu4hs5htz7vtl2965p3zidndx7u3d3t7vd43mdqvxtv6std0un933ayu87sca2wx4wyjy6w58qh7dc37589k7vsirner0vxa980h1anl8amiilpxody4q10yr169t58nvj4sflj48rwd735umr8sumjq3cgxl796rxyt5y',
                mime: 'm24qyqfhn4m4n276ya93vg4izxnz5oladuujybpjyv5p1l40h3',
                extension: 'f7qfrh78hgx8azqlt4byyrnu1wl4z22l0u0ipqavyeun4dqr7i',
                size: null,
                width: 366782,
                height: 660980,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'gn47znytgsj3nowr8pr5kcp06w23rbfmlifj8nqxrs3hnjbx8qkpqmqe49nyr6zzjzgw0lew7p7jrzlq7lpubz5mpfdyrgs8d5x2tdrmiz6exm9hm3kxyaimrfuzaldk78zl72n71r80z7w1fjtgvzxfafkdxe4p5ma1dgimlf720z0ox7ob8i7c0e16xek3pjwx23f24775d8ddwjvwsx942fr00tb1vwvog2579af0xj1jwtishkbaqhe7f3i',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'z5wpwu0tbe86s5mker0mgnphb15heq9zj04f3ka44dococbr75gkmizvzgy1jktsjcqk5q4d4zr',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 551810,
                alt: 'kik7m5ud99vtaqd6vlettafkpicxv5cxpqzbljsf0h4ghd1geqlcg0i2m6n9irpus5tx5ia0z8u7p6tqupovg4jhcr59b2taljnvqpwzt7hbt5j20o63uae07d0jd5foa5zyfcllucjq2ptviojbcshg97g1he4rvfb6ti5n3m38zp42fsmhac0q1xmhmm7n825zirllyglqg15120lxuepx5zu46t6edf0qxkspxccfvh4ri9xnmflmvo30m2w',
                title: '8qape3ncidlo3az5s1iy206w9temo88oi1zvvgfjpoz2syhpqnpv74c33fym8z0okkh4dtrj1ewmlw7ruiq9gscr678vlz58b0gcuh501m2m3j546i9adrhmxnp8l3m7c14bf8vbmw3y4khmibaeqpddupvf3n0wzsdas8cz2u639inqltvcdci2gbzdnkhv1mvh5mbud80sy8iit6nnwexfuqg0iifa1gu9rbkdsrftw2z7o32od2bqotn7zgs',
                description: 'Cumque iusto vel est molestiae eligendi quis. Officiis debitis sit. Dolorem quam accusantium dolorem molestias ducimus provident. Accusamus eum consequatur officia.',
                excerpt: 'Nihil quis quia praesentium rerum eaque sed ipsam qui hic. Voluptas non rerum autem doloribus fugit mollitia. Deleniti iusto dolores.',
                pathname: 'c96fko7ui4cwihjugfubgzoysm8i3ilhqi1e0yoxt17fq033dopga2n9v2o0mmnmc7vl7cm75t6ha96d4dtjhnw54o5k88km50seltmgd4dangkqoouxlan2ela3b4ibw5zvngm6i3t57bys4a47gb6gm2ga7wza77x1o05sr70pwsc9uruurr4d50y7abksjdqmrkw85x7nhz2gkuot8iy6uh6pa3hlds4h89olp83dqp0cv8y9woyh7nw6mucswu5tdikxjwiw6rrz8tal81gs3tkbpkc0tyqnqxn3g2pkugldher8zcw9d08nksndenx145tih072vfsmukiy7bysas0r5hou3wuuy09kuvgv8p0n7nqqcrk5yx2qa39srclwniofee599r16nyauwm6zknp8oaf9wjg1a7eh9ncu73etvbd3l2sp84qy9xk2hde0zmcs2dmwbz6tb5l8puuhp6eqo3rgpgbjd6n3l2g52md00q2tnzvp4e6y98f4ucxhkwpsiw7c8iaxtkwchjjkbjyoryv056bjkeasnqe9hhvphuo0pvrha99xjss2jwo6a6lq1a1fld64uxm96nooig68ow32b2j8t7upeqjxj6l66qq9sm4jlgp0tpnjeqiyie9vyoinet9saosbm03ot5eauny1dd5hhphyfjh3bexrd105of651h2qpbq1yxt44i03cwq29xhpotartsv0hrznl7kih7un5p3sge9i6zb6e3mm4v8u0sv1v38y26ggygqpfi8wcntfi9w2bgrdb95j934d2ap2oraoy7usdsgr6hc69hxgqcyh1l2aaw513uf57e1q5dej5qhc9mbyy1ipkmmeex9cvvar20khc6fuphk7rtumgv0obutbogjh9csg5vzedyix2aunkmq56kyj24fr51d1bnqi7ybf7avvaw9xqagnb49jeymccviwc6ve9ozdljxlt05a5l5rz6ci9ng3e4zmic77ib5i6p36cn3yf2180c1erbfz',
                filename: 'emmj9wp4zyrte2gvwonnx0gcyyk0nqep8b5vnsfhrviogs69an8sya8htqbax6anwqudee34i5hi0j40f3wob4t5kyqjfdt01dczinvkirxqs9wr8wr57eb2ofy9zvpz3ctk1cij2vrvtauzbv63k3ty2jl6n268mjkwk54gfyu3tln2uvplklqp0eda2pdzfy2qm8kikabwj3enxcs319mdjxsc5xz8bjawvhkph8oq07nadp1q7yohny153ik',
                url: '0tdoqr5zfeqyddvwlehw2ydohgq66el3yq8nfi5aej1mo6aczlrek90v6bdn65elpwr5ze360o1v542qrxckaebshln3mzgbephxel9ntz4mckek1oyzo2ibp88uhgwfoe7otdqvthvayybutg6idkbld3te1x1atc84sg4xnaj8sug5c8ltg253fyuunxbzx6008g4xlkch6b03n7wpt54cwh1403ikvouhmtlcc09yu5lipwmi1h3720dicz9t0ll5yw5r1els8b7q5bo35rbdlf6j0ux7dgiz3yngsf89khj2q8w7fapsw2tgj5vh9mzsn7z0n39fgg99fgn81xp1t7bg5sqqjicbuuza0wlmcftzy3r76i8q2j9xta3a2508mxqeo98ytqag87860rqxutsfqt2idalzmbpd8d1qqvlro8tjkoo2c27bni6m06joqngm8gfj8og17d6ijmnxwqyq33la5y7mg39aboec9mfmphobi81xb3nbsg90uju34llyh0nvuw75dw2giqwrvhtnlvi17gg2wc10zu1gy9n0qk8y0tlhbz6w0xkkkvh38hmmmnpahlopns8ejki22a0nr34nsq7kmmii374928vrw9fh3tiesna7e31vusws2aoziahbmpkkji75cnnf55adm3k1uayhfqwivist65kzifwlmcjrk9ed2zl4z3chn0o7yioxqzds6kj6wt7oaxhm36lg83byhz514ts61tea9j3q9jgw2aw1bcj78e3q6l25k43awjmn6ndn5bnlklzrup2y0fpjmfvareonr11zqnpey535d7ns1sx0rvvs1bt3q90smgbhnfsoh7b1nd11h6s7ddf4me3wxjxm4o7jn9qay9cox9b16jkorlizofx4zk4wlnyratfwiko7ulcz5ecvjpafhigpkcdjrdza7k38kvk6kfnac1mv965w5hho9j0svs7g9454yrx436nlp57mbdmligvyqtq8c8fp6v832qeyixhy8sjm',
                mime: 'eaga9g4q222ma9j0j5ywu56mf1xjumm86qw02g65zhdwg0ahnx',
                extension: '5rwocw5d20ldywgvd7hnn573abt4hltp7wct83egwz4s2o1iyj',
                
                width: 575255,
                height: 425481,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'xqtp3cz2q4wnyxtmo8d1e443s2xom2afzt9rvct3sjnq3408678cd98p2lqmmiiks2mmz2ndzwvn7roufuy86v56p63d45ujnhpyxh284z2blg9wt8sbqfveerqwk8i0123llhvzfvvkwy39vov58e285j20xkgwl4nmxvv2lm6jn45in0sj0ldbtvq2vgqqqjr3y6lrmvdkbyae6xb2xjsvn3g21ooqdtgddr0zlzj7yhcyu0pqynkbtsjyj2d',
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
                id: 'fvf5df96419lt6rcj1wgol23sl4zj4y705ccd',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'crqc5shb0l2q714xr8aozho8cl7to6wev2zgudavdgfa0x1aioxiygyxb017bhi9hkm7bs6nqy4',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 787348,
                alt: '1qrpkxgmg62pyk4kb06i3d3yhunidjvaldn19ixr46px94bf88172nk9719qcmvtiwje8xz7kgzv7u8lrad27ioh1v7i07luhz5vnaw52eitfsk2vq0if7g55jn4rko4t9fdqlz6kzs1s1fmmgqds5opz9mwqucb23k320a3192ojyj7hkmhjfzz3o7i5gotvrruljyad7o7u7tvihisrhefiyaq8vghjyvcj6r1vduo27npm10kbr73slktznw',
                title: '3a2klxwdkwt7d0htmrdlpc562g0yzzcveuq86w12f6n57zw7b27q3rzrrst8v29jb7w4p3dnbdrru8xfy7j30bbc820z05x1rqdkjuhe2tm93gfznwlcdt1gnyl4i5tci2z7l8qx1k452l7gbhaxouzv15fr69nzhfak6lh40du71wkpwwgqe81xp9ufdw1cl62tnoc1onprjq82uao1y7jxu0f9gatdcoirqjl7rdk9wsmk5hgomg6j8c3uncc',
                description: 'Et officia qui. Quis saepe nihil itaque et. Ducimus nihil in. Non in occaecati et voluptatibus et.',
                excerpt: 'Laudantium soluta impedit et laboriosam minus quia esse asperiores omnis. Deleniti illo mollitia accusamus deserunt aspernatur nisi. Et laboriosam nobis illo et. Harum sint rerum aut mollitia.',
                pathname: 'wtx7w6tsp4iq4devoo9hexzcbbiihvnbm5iru9camz7egar89j1aabfgnpcb1fn3qs5t7ud1kuox96w9eq0shfsdiyss8koe5tdbszxzgjw2c1w89crno2k0juiiuswodp700njo9s0ezr0zhfc6trb3ufoyhnac4njx3mh09elj4one3lya06nuvgyndoc8gwldav9ro4w30gcv6s1ypw7tgk830pl6dx393px5usl3yunmipqntci3vure5xawibeda7i205m7bes4daz9fwj08q6v9idkrogvxp5bcc2vvfeejuy0lgr7i6jmz0pdd3spono63ooaayure7obk68rz2quiswkuzgrcz2ef9v8hpl8zaxa9avif0zolfkld2uuk4nl11t0mhqpkxv19sz0zngehwz6cpqs7pnm9f1m4yh0tol4yi1g0pfb6xj677fr8v05j32887igyt17l2a24errh7trnqrm8m6hkqy1kmhqe20z02mmecfa3s7h0dr97k5iy0yjrw2xwqr1tabfoniurucvvnhzamwm8mv11m3bsfp82xk3xj1bqq69jza6jdrbmnn5kg7b56onadwszpdctdxcmg4p2akwo6wkxouot1jqsppxrnsralvbr4l31nt5io2iuvwb0d7jwy3oyo3cb49j76rkifq407x1eby2ou5solpu8xvzcu8imxw4d064gecco82wn9ss2gt85xirnp9gidmommo6rah83sds3wjt72nag9376uv9ntju7bz40jp51cwad9t4d979jvivdd6vvqsg0ndbgl1gx7j0i2fbof137qb70lzrh5ioh4p4q6e03gzq45pnlg5ozs8f8u1y4pa2t881ap5e63fzexijo67794wukib01n8kmf3ar7x38my01e334ecl4i3xwropzcdc5cf8q1prkinfb8f3lqoxa1dqgf7if4pwejhv1oahmdlmyu517e1mxh1ghygyfe3d2xqf0sei4bmtodw14ooymfeldg56',
                filename: 'xq3non3bips1p712x5as9bh52d7gjkhvom3cmfq9fhpchs14gl2qei4j3ks2n2579dm5ftfnhgxzskpg04i4tvdg52ytc1d70x6n3zii5kg8fyy1fub2blxf2v07wgv4u7eg1bqp59xdpbq9bf82u0rxk8wjpjlclv7g841o4bfz464nwsanuifdqwku89ovke63lm775orn8fe8twajlyw19jencb5nkzj75ruleag3b7kgat3e8efx24hg9cq',
                url: 'l8ye7ws9sxnsy2p0moqlkvr3b3d4276fcfbmumpi9w0vj3j03e2edvxgzjz4h4upzqmsvpcxoj5f1i943hsrpuzit82wbuspptrf7dboxrmlewe7gs2abxn7lukvc7pbk07ip8bkvfhdwrabzx2orfjhbk3obgwwzsjptg6z3x4kwdv49jcyxh8xe4fnctn8fcu5egex1rit4lqvrf4x2r3iuykjr2nt83m64ov77zb7zux2r5n7ecazy3h1qt7uvddlb0unlakvod5d9hv4ptpa62fr4s5tjs9sjij85whniyg1o3smys6wo7n43xk3itq6hy0gwysjq7zl59ukd8y3hrrjn2fhebdqz50qv899hgy5ua4atnterkg6493ojk9mlanipusihoegf75rgxvaamu5btfu5k6btrfel1f9xqgcebfn4p28epq3yn17uzpzaewwzhokkm9cpunjnita6qfduo653i1k38zck4evh21gj8hv6mv3nkr17yws3ij99ttlapbpgclmatv2gzzx8ilttslmiqetx4at2763u70zutgvo4adrd4a1kj9dszzeha21z1p27hlwx7snujemgdpzgackhy466tgr4jpaqzkoox9ru4kghs9yx9gp7ufdnuclwx8ai1s9sd9l6c7ktii152un448o1lftk3ozfezzo390vgms5o7iidwfeb9vdq2vwt81655wou4yufpjbr9dmk9ksq9zcjj6o9ytzhtlo8bumbsnxurrhup0iq8prznp0ptxuckgsr7gjfwc1yp0g9c6xyg00q4opf083koc6rrnp8o2olw2vp04tty8d805w52rbmrfr9c9uxnm00j4v2o2elpc9yfwozqk83klckx66ty3iwkc2gzh8ishijswqhe6vff9gisvrejzklyrrg1rr8twu433dxle5p91j4y8wul3bos60f7fypmgt8wigsxsfiu25sxrzb37bntyay45d25jrhlawz7y4ldrhz7jbsaqzd66m8y',
                mime: 'tiavtiqbgte9g6uub1q4ksk0pkad55ntekih2ezh30i4iuq2z9',
                extension: 'zs3db8ohhsjz7pgh21qupppcmypnllbao7et7zne9j5rg54z98',
                size: 1840260483,
                width: 854096,
                height: 509729,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'tgedudf6aus4sji2gr4jb3b7a33xld23n0bod2xp5oim32rzkyjzv5r5ck3u34i7pydgk1nqu6flqqx8sahzed14r7f4o5u6mo8scm78ymn5m36atim4ih8qzahsc49rqhy419humd8pi383kmdi3uigf1lwt7fxgtoi8zf83wa519u247i9wk5frzvukvv11v3qmvpxr6eoiy9jjlt69155pofve3m93cnjbpi8s0cgsmf03m59l8hyzursfg5',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: 'r79ukm02e7w84usf1rqaxgj8w6gsefh5k3y4t',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'sf1avoflez3i7608qceiua2qng8tx7oom5mv3eu3s6c8z55lfajftdm98qiya6sq3ww9yyqjggh',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 758275,
                alt: 'j8ysby5czfgzupu6j3tgru5q4hg5wk6gtd1s9z9vmomga4fu3ayc0rbpwrkdd3hzyvd5uwcvudatw7s96yrjz48dei4iry13vgmfgwllvkgw0k8qwef3m1gn8dm0dgh4fmpfckm52xg9d1jlhoszufwdyitk1qhrxpc42eznfaw3nj6kjuauivi0x48qpgzso68bs3psl841i89b3p5q3dndwec7446qmzt00n7varkxcntj8nscqeqlb23exqr',
                title: '3pa7fhi9zb14pxoe5mm5em1xwvkbxyco4hiofxhx67tv4fp4ie4k2jkfp96cuuayxcyojn0qfrd9vbk7uqz7e7xsfpzvcwkvifsa34kn3gd2exfgbdxbuwngae0fyuxy85qma3flmqi9zsmn43p28t0ztf6ojhv4l1hxm3daolzzxhui6ysu27fdim24x1usyxzvld7dyefy8nvgg9gisrmfvns5o2s8s1lk8h5x9nrnq2q1zmoca9jwq8yly8c',
                description: 'Ut sunt et ut sapiente molestiae. Beatae sit occaecati in et voluptas ut incidunt ut blanditiis. Harum dignissimos dolor beatae. Eius esse omnis.',
                excerpt: 'Explicabo dolor nisi id quasi sed assumenda laborum tempora. Animi delectus consequatur minus error ullam. Voluptatem ipsam occaecati delectus quam eum non quis cum exercitationem. Fugit perspiciatis atque et sint enim placeat molestias cupiditate.',
                pathname: 'd1he37pkr147rzstq4j9y5kd0ryjh9zgf6jgzopfan83wocsrok0l1bvqldl61wf1uv9jv1mfx8upgqxhvpegu3cxh7usx44haq4fcml8vf9dvhktt6h0iut1rxj71nr2fhuca90p80m1qlgubwcf0uje3nikye79wfklwtb2rj6crrroq37xf08cns0q8w9lz631iuz0lq7vur7zuy68ehc3jv28g4xj814y52xkp1lxnlaypkh7drmxffyfr6h4p9txdmln62mtcjf66ftth1bwr0kv207ktp9rdbw8a0x8omf401tsw8a1bz3dn55ncdzv5omrgujck03f3w4kqdzenkzevn65ntq27a8ezwhj0vpg9s7uhyagz1wxm0k57omwipvdrf675b5s615oons23yutdwjilqhhwt1mu0zozpengmsil7404asduespt12juw93av0hehd11al70ywyr9fq8axbhutzekg7ndtj75znj2ty7qsbqktj4o8hsw2yv4jm0sd70g3omo1ueki7cq4qtgthls4bpfxg77h60abnjtwtinc8xt2ritjmrp5nbr9noqos4g4o1hb6632t9q5l649jx5qs1byy3sx718yc9il9m5abpvsihq15wtiqi08j2tj8ao5f1omwokfm213ksdftzwx44yjd5237gfknsiqfeudba8zzs2qdn93ai59h3ecnpxl7efq4pndjccs349zqn6jp4afca5957r758ltkkui3fehn3kqyscvqfqk95lrrd6l4fx6ztiocltoidq21xaghh1to6vhyzmf8zabmzbj7yckhdhj2y1zupsgh2yvg94ormqg9aq0tn2x3wwqmffwqc83tyoneh3ovlikycgk7kwtzwdlaqu0hgnjq70vypb74tst4m6bp4tnp1g6bn70f55kgf0bo8m0c1dj4y3hdmvvheh8rft8zp44no0khcuj3d78z5q2tql54epuag8cbpzjj7rcfvq72ma7rbunsgu5tted',
                filename: 'zybiyzpq382emvn5ivkxylm6z0jn0tgpb2dlxownvhoid0zfb27hgswl7e7ldrrxpubzqemsyv2rz7whjd57xd1szmedsmrwk67io1x1ltunjiu1d386v0hkec5qxhqrsjfwcu3tbqb1kivk30ewk3tzhorpi7d2j4qpuy2sap9gy4x20idkrwzi0h117m5ds0s65a9n8o5bocsf895647vd0reske486fgjnyobrs1596a0jxbl057rzwzfmzz',
                url: '8ng35vrryo3e7vy943fqif9lz4n5dm5zfm33qeiezpcrmvrbbbd10twrzy71i5ew67qcbfyl1b623fs8dyzm2qtw7wx6olnk2rc5q9z6rj1ji5enzuuhbvd5dg66t9vlw9qzg6vsbvulc9c59dkb56dp4eprw1zfp95jp724l17haubaf6cydyjmovw4jly15vls64xceqhx0qf8n2ct3iji3muwa1y66q3omcowrrckafo1wnbbon0ngspedxcns91jj3qqme7h64g5fi4fuiyvrbh4wudx3ls8rbckfpry14694ir1ehk0zx5s9ln8jj6jq5p1fvrig05ogay91eccxi9xokk0ujcxoeiptwy4ez2nkp5pxrgv581wd0twci64ku7au3yzxico5in5d9ur4ycxxf7gtx6z4xgfzo9z0wa9mhsdpv5p1z5sx3fkr46s7nv5gsg0kgwewdb5js251e8d6tng7wh0030ki2kyruqmc47a3dke7aznauso37j8d6ldsyjmsq432s6t9md0um0kcwaifs53fyqvcdkssofcr6byipnibun0xt8j6tqo25kmin6l2lus4doka7jv4757yp4zw272cv31ixi09pv45rvnn3368kp6etul4350z0y6b0q3ujr1d19swcreke826tfh6fne2asoc4nhsycbkz9knyyujuha6aunzyf7jec3a3ecgx70csbiqs8pix8j82lbymhu11b7z1cngvmj33uuirscui1tpz2w4e1wss9vtfpr8isdrwq3n47uc9urrdlxk0811l371xz1pk7sfl0la9ce1zbrjxbn27fx1xlkru8jwduehzhl5wyrpoz27euqhwykz1jkutx8e0nk8oupucvbj3j1h3zmxiuhkef8vmfh6vodzhr59zabo5ursmqug8py7lc104eb3jv2r9mrmg0hqa5hcltdcy7fp3z3ftqfehbl2c60ue6p342eznnki8owk3b4yj6syxkqo0i2mzezpbz0yl6m',
                mime: '60vmeinb1ymd1dckhk8i8tqp4ku9eb5kzjg9t4pi7dgvyoziq7',
                extension: 'hn35z56segia9qneicqfky4asjyxkhv3weppnwzbcpahytq0lk',
                size: 4061358137,
                width: 915937,
                height: 865861,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'w9ha4jloelxc803kmj8suqzwb7ljvmqnbzuzsnmh344qtgbco3gkk5mpxf2fq03vz153goqn6j8vgqr1inkaoll3ewrgpuwz1w2gjc4zevsf8arfl4fjyy2a3xwg0flnf93xnlautgs7r8fnxm3tp1ckat1gyxybd1s29e2l83nkadtgd6wga60410pvfbqr62ywnldkmva4v4nirky7uprosrhh83lol3hyltm0rggk9ym5z9oqbrldwt2nfn2',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'ydtyc1pulp280zjyzlu879ubo18js0z6jsf1b',
                attachableModel: '2z96nzxapwtoobbiodsxbavg6gn9d77m37n048hnrz1nxhi2l1kfd683on4patez5sgx2ic6n22',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 588203,
                alt: '12sew3fva5pvh9olnbj6atz7zr0xh5hged2bwj690jj6n5m1ng8cgercnjqfydx118942cnzx6dx12fpf6e1fvbkogyu8f8sa90vn83tixx74075qjwfbgjxbtqrn5skijcdjkwycgqc061nh1sordbuok7telmzdh5rxs4vb2pb5x7va349guzl58hs0ptjnyuu2wwjg84npfqtu89b1yqmu9qutfaf09dj3g1bxog0h7v09epode1nxyg4pnp',
                title: 'w708b5mdmf9j1s82nplnrwc9vbtcqnwxquzl8me9gethv5lhzyhc2o28t6rxyhy84ri9qo14j4gqm0mpl9xnwdpblrvjhuzczhqa59rnastcnwivinxpe7zrz35hc86vibik0xnb97jx0we8dy0xbvnv11u10ov40cxzehw4u2kt0m46a3aspk17ialomxix1q5667tis08kkirkelylavbzizeq676msw48d9hhupam3zo1gr26ct9z3gorlnq',
                description: 'Illum voluptatem error. Rem provident officiis et at consequatur. Consequatur odio cupiditate sunt perferendis occaecati quia modi.',
                excerpt: 'Nobis ut rerum eaque hic repellat. Dolorem porro accusamus deleniti delectus omnis consequuntur. Est modi voluptas ullam. Odio aut quia aut assumenda.',
                pathname: 'pfqgram40wra54qsvnuor28rcf3nd4vwbe49qqiyno6yd3m1mng5uvs3xr6idxs4ivzxrgki9g6d8xuprk8jjltk0hizirwuyojyqmgk2og89i5uneevz5kcggc23004k0c3gavf9d3n64austu5rlmm06w89rj1q9bn9cijho51l9f74mtdk59dti0beys6ftnn7xzbokk8tkulq2kv2tj6fzoi96sfo2zb0d3wu6bsau38c6cfwnr3qj51xc3u0jnqxx9au0muhxavx77gi4sqtgm807p4kli3hk9q0nbb2i467lvr4ejpiph6tw1bj05dcdal71j0k0123j8m0fz09wyuhtwlvsfsfb8ox8uokjrs8xcn9r7uzg018spoeprpzf0jj52zlh3rjdyqj180gx3rhbg7b8l1v4neqsec5mw1ndzar6bl913rphpf63mnux4ux45ibdguqzl4xbsjbh735pvqzkmrem1nnbt231badzh5bvg4p8qkdkq8cx8mnaqymq2wsvww5c9oxp8bj70zpamms6tbv8qansx5fo0cvy9cf9a1mltyjy62f74p1hyw71me8an1ne2l9f9zni4wtvhzfsjoykwt0tkm5c8kkici84ajefxejj1tyaqbhhd6ww1vamu309qsqlr4turro8fifgvr7an5yurwaqbq5yll5mkh0lil50dvtu69zca1ym7zdi67f6jm1v7t4ut4ygsfccwm4wzp8fe0vr7gbvas3l2teva6uxpvk3aq1w1p02vi9v3yruwnctuj11scg4yczid3bdtcu7sawtvz8ftw1u31c0f4i5uea6jil2rzrudm5hxh7bm9nvdacpg5jc9f9j1nbl8ezeg0zlq22vpi8sp1mk9eg4uiobrso5fp07b7far14goeisdk586ge60oktbclz1ah99fxaksfr6e2o3rk79a11o01y3te8ohs2rgeeehil2v2dz03fiqrnxh2v9xjfipntq28wiu58wz8okk4l3866dp',
                filename: 'ndkj47kz36otc7p47ffk5l3k7ikfaht5ahhiudw9fjbgc705b4242pom1eod7wkxy8wzu0ltkl52sewv0wb0jdpi2am1vzx79qnu6v1335ro8td9si18jvvt4gogrhbtb5rnc5d05e38sihbyfk53shms3s8elbves89z9nvvd3rjqkh3mktoug2mj62vihyadwqpaxzp20ua5gmrifawvmtd1b0jio2z9ut6jyw47x4l82z2bb33ofq6p7u2br',
                url: '3nhbgpwbvrxsdtnzygzjcr6b3gauulxe15j9yqb0dilxhuz9bwlrtzzlf8pi0nxqh7jfcymayqkcdu4ikv13aqjdfg77j5rdylwt6s45dtfvjcx8wj8ye1040gxu3v3ebtepxvrzgf838llhal269hver5ebyjrigltidaji4f1iqh2ms2ta93tx8ht1zvmptcxiro50or3kklzxact1i85rpwpn8tnkudcwxhvpbk8gl6k8nslmvm0hj20z26v0ja6j7y04mq4ughyc3p7d2pvci9uk9soi5h03yliv99jo9vt25jwxxukczmtyqg6d9vnpk12ft538nh4ts3qd3jjvacdvgg2kw2kvxhx62cq84h7rbc0htk6tedbkryxbxdsjt4pfp7v7dr7xjxclku2aok79x5p2ode5daxvf33r35a0jbgs79tq0qsefkdouiq1mp1egdzm95ko1sxnpda9rhtssnufrp2dsi0d07lie33hxkcf7lqzm0us4ilbu39j9oslqsmiyc5xkw5x9x8p44rnt77fl3x73fyjfz9nhhv0ofq6jt3yld8o3x8srb5v6du4wqbzvr084gvvyncs2z6f5y6gsq3f4u424wtebcjabf5lvxuoknde2r303lgnc2xs11qc7eeaszds8xrtg5hkjck6egmw1k35r2nay8553sqemb2bm1128tzualk261rsv3t0coeu17lmtrl4rrusby9uvktann8e6jg2z59zb8zndd054udi7c6b7vn5hpcqbyg0abanh0eslxmijdi4f4xzzbsfy1msdv6xpnxdwsw3ifcjstsyixphljng0i4pgllu7teefohw658ir9vxzo2btuqtbyk8ppwmer9hw5iuofbixhi6j3ngz8rr24dmn9uc1b3dqwhsdt2gax83rzpyelpy7ashhoaez1uolih8j6q4oi5uhvxfyhelv73skda2sazgmrbmhvta9d9szpyqo8xcm2ojj3kpmv5fd9ykke8lr5ccnopg',
                mime: 'zdx6zwcu3o6ta0co3vrgchlhzz6b0xbsw9r79qljdkqke5lksu',
                extension: 'a2k7a5rzrhpvgwj51kd7rgps6jl1d3bgh4osb6ycrcrx7jqn3a',
                size: 7211869046,
                width: 319273,
                height: 589170,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: '6ynrisjwy9mycpp4ifpw45jz5ekcynkt63uzxwpfqomegsuwhtupnmu3bst7nwglg1565nhb8i798o2jvrr664jtzry5o1mkhyao1gde66bitfrsrqg72tj6a9y7wj2va022n2e4qn5i3c20w3f17sm5jawhax5wby7d5l3mlxb0v9hw5qscar0ld4y9bpay090344l8c7nabjq179jkcnb9iwaluqexp0q8x02jqjzodh0e76mniih91yk53es',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'stp0elm6b9x1uxsic7cu4wlkovl4h4hbylc2lrqkyhi02f1x9wkf4o61s7w5ctsfkjkqgcwt14z',
                attachableId: 'htcupw5lvecbd0obcblprccrjmuf997pc4hai',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 775064,
                alt: 'ycwrwegvstk3tltdgzs8pp5c47gt07nxn2lumi2juyhueonvhgt0esidjycpkkyftoloustto2x3lqfy0telbyrps72r2xrt437sd5uzcwnl6nnzr8szpsl6xfvkvag8ipnzws5c1hxvxwvs1gu915xxvjrrokjk00hyn8te7lwbeyjbuzkhyi4wmiruwmagy6dq3zb19btnre8qmf40gv7vut0uofngftkdfujt1lj4ygzu88f1t20dtzquf5n',
                title: 'lqj8yogbwpuu4xpoms0m407mpkcsnkbkmojgyz3pqzib8l6piasw3ypg3cdii9bxs27kdumdjgp3qvylyujxxlppvkchg04l05tz7sxvw2lzjip90p2zfg4h0drc7qrzipyrgalbhq2lzmyulxsog42x65mctyl81q7r83j6augtoc5y4lqpsur5hpj2swp8kodns43pmrarm7ph07a2ybfossavdwrwvd6j3m82p9jkuc40y3ujkrdkhhfj2dz',
                description: 'Aut reprehenderit vel officiis fugiat est repellendus ipsam rerum. Temporibus sed sed ratione dolorem nemo nostrum ratione. Ut ipsa at ipsa est laudantium cumque modi laborum. Sit quod molestiae labore et voluptas sunt omnis perferendis. Rem commodi est voluptatibus aut autem quo.',
                excerpt: 'Deserunt explicabo quam quam quo ad reprehenderit. Aut rerum culpa beatae tenetur doloremque illum quis voluptas. Placeat architecto repudiandae ab. Excepturi vel asperiores quis beatae voluptatibus dolorem et id cumque.',
                pathname: '2vclvpp3bioa2tgiq69ggkhfufvs56and1emi623lozr2ohxienvjafsz9g3h550vpzijwt9hj9x0po1zpsvlj3skc3x3309z17ir28m5u34g417v1ax3tq0wgbu1ti9ecz99zyd0zo1806mzpdq5agyb5ecjwae0bbco4z4wk7yqdpl68q16liohs32mf424xw4por968yu87br0zbpkq3qvfu1p4mu83fotqajx1ymva5zt5vg8gw7malacefhmfdkl6t824qis6bulgufg0moet1cslptofhx8konzlxqahue0we1f10rfxmf4zj5ji4ubz0yvq607oj91i3coiavpn1myphb1m8mgynyrfsfy1ng24jk12bnukoyky11bs2dp3zilkeuz29ks0h8v4933elwxwkkkrjkxonaciqjdyr4j56pzfayo8hzlmz4raredb7g6e1m4n70qo40n87knjy8835btg9phsu8u3m81lztyb6errpoc84xdr9i1x47wbe4976q410uv5956o10hgwsyptgbp54qgiok7vxd5x2nfjen87crh31jsahyxixqj6x6xr50ch921m9qml2mizpkeibnpqcthgg3ilzuwwm7i3vhzfcgxhvd57qlze0780miuib8adboll80gu6isynhnonhxcmu4dncuhu7t2u6veug44z8ejtbj3g1m6zsc565j2jc58mrlt6t51oz4riyp99vzsunwftsdccxh11y8xesou6nktvhjo7jntlkhn1gno5l4vwc5xdocp3cqpbnefxghccjfjthlqb2ntrvog400j9qgyquo95qel6kh3g5snx5cal7jo3fteo8g6s0dv3j4g4na7m6u859blqgifcrup9d7hn35kiwu58t4zqs86buzo1c6thpxhhwvca6s59nxnhd9z4g7d1vfclnsne7kqb71o4jq0hsx760tbpfnpkd8baz8irdzbi308lmd5o5ejalnmunwhjhpvpdsdm1qxyp4x9is9y',
                filename: '0ttlhiuac58i5wnwielylqcwcu2vd4l6iqkks9d2cpw3anirigh12xtbrthco7e39bjsgfh58e6u9bynwpkbilktcw242h6uh2et7ryn6c15shircmaqb5pywgjz5t6p274gt12agio1q1qlj4x23ek396vovxtgq8yynp4h2g3sfuluoofxp7cl5h6s3mf5xwygir3zqjrefc3hftp82c82e6p2ju0qkvpfhthoxjyxb6m36nxya35yklq67mi',
                url: 'n0jm5dwnwkkz2q560svs3d6ndxzlkxtlt8u3rgi0gi1eakcwxhot7bgjuomz5r97ljs8pm4lbu3yeucn5u3l8d9x6xjd7a0kwj3rblmljie2sgbioo2ycfbp0a5sl3e1suwv4lbbkbyr4x5h6uwu9ufv8xd70ahevl6bmn1l8hqwp8x7viuxxim8f2syjxommkgcc21w15ba0xpo5t9yb2bhqsv2qh1a01si5pjr5f0683s0d9scqpl2fn8rt3fjfp79wefspx3n583qgomcky6xpfgnd3zdcjmqvdyudeizgywcgmhoumqz11ydhe4904mj7a6ulcryyaulz843b8lths0s3r2e59qy5ir6p9yp4l426eerkczshl4f4ram6s0m6df6hz5pdlqqcjxs538yxstvrevq3ii3ho6kz6mmtoq2tr5o5vdqgirejobosdydxzkuvzk4qlk38ajm1503zcxxdcvevx2nzdnu73qgxkayg7kyol6b3f3bqp6oxu47q5r0v8yowh11h5pqech30k6brb0psyw4aw5xvvx6c6mlsjiqy6955dgnsx43qpoga4qajcflovhktkierorkx7gep03ic5iib7lnp4fkn3d624k9p48z70okmb8tyb4al51w3e1fc714ou54ews7r1lni17q8jr5gcwivzfgbpn5wywgvyro4p9dtud7vp7rcrw7c06yv9c8e1pltbmrwsvc7lp3py3chyeleqdyc8ykvylwa4jl5afk54qgimhhcmnupq86ip8v9hb5bvnpfyy4nyxfdw6jcul6yyqfd8k6rfpuxqgiadymrj0d2g9ni7k9evhxr0crlwdq5kjqv1m8muslcsxsuymcd7o2f1gfu4034exsm6aj664x5ybnf1o3p4f1c643sq3se3b0gsf1yqja2pwpw72pv6ujihzb225sb7mjve0v7s9f0qoxw5s1mnpyq6pc6rtuk01agusqk86pm8juw9wit6rmbee4hgq01t9ym1gv77zk',
                mime: '23r08kvzacj630ttnt5gdx16sqkegtf43m2duul9e7q5th9ptq',
                extension: 'zhqjaiywu49z0rrpl79fvd9pdezea5eq0i5wfz4vg8jwb88mfd',
                size: 5295105186,
                width: 451494,
                height: 448840,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'gkg60bkb5djfxcbqoax5ft9wcsn80mcbq735gun37w3yi8l5bi7hdw5pcouvd0z0qcfvki8vxeztf8me392jie2b1esu5b92h9x5v8pgxwis2iwhbpvpir6qwib6c9vzlxoegvp82p46qsthymqq6sgqswdgyvuo7o1laj9vtak9x4k5yb075xgguxdrbex6uhv8b556jek2cgowu94t22g6n5xqc38llv301ermrjnyjk8urqpsrbbudb8cn9n',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'lmz8oekxtbgde2t5ynbyhvg96b9e26eupgw501xx5h1n2ejc8wfmd5fcmo3kk24oku1551qbpj2',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: 'l9r8bx3we1q3c5hn429bjgh53ws7qvfnzg3ku',
                sort: 639897,
                alt: '1yi8wea6dt3ijzi4co30zvbpqo4bzvwnjwrjuma5jgwf1w3engtd3ax3g5m3ovt6m13m83x8pvcjfj93fa0hq0azjniqgdhatqq3wajvs7k0iu6b3yigwmf0hy3hztbx79pj28vaapx8oyc6mbp985xv8mv9y3ubp58gguwis8w91s912pwkw6scu0drg06fzy05jl7mi0xj24mtcxs0iirgg0ia4ujcpd6h24pjhvbu7gr5ati1ywlujnmv9ja',
                title: 'xrglzwdkjavc7w8r4tokaj5oyg35gidpjwxbjt1295lmuk2c6ddhzlc1hhb34105fpsfcdb3xu1lywqej0ctqffk28y8ciuom1ro61ss17y8564u0fzre36to6kud07imd48b60lr0xpq6f5dl8y9p9dxriwwirxl110y3e902ad3uhhezgdi0rbkcrn2luj4s25m5l9wi2if9mqlm8rg9ww52dg6w5cdcwbrzz5i5r84u46xjdt0dsvtlmmy7i',
                description: 'Nihil a doloremque minima repellendus aut et. Necessitatibus suscipit tempore similique maiores qui itaque facilis. Rerum eum consequuntur. Iste atque ab eos et aut et voluptatem architecto.',
                excerpt: 'Impedit qui suscipit ut ipsum eligendi ea voluptatem aut. Repellendus provident quas quos. Eveniet non beatae magnam sint aut voluptatem. Commodi sint nobis nostrum qui molestias perspiciatis et commodi possimus.',
                pathname: 'ic8ezwz6csymfog3m2bg4egwp4xezexi0ehqe7ma15mja6yokef4gup9m22gig7k5ost3ygt44r8uecyo4j9y0vizxbvkeqmjlwjdff2vlnp49f35nq341xkl50gogbdy8kpvriyjsn88arqv2qxp8njtakg9zptx40t909gosqq43mfbu1yi6neul6uaxvfud2ihl80tm863k9xu2ry0vzyi2qr8rn8h3rqgvubdxwjr3ulcvzh2kammf2zserv982tbiqd20c8n6ob6fp7sqmybjqtnu2wi6k9o7lh02ilvbaije8rzley8vsc5xjav06f0wcigbnjlf7nqimq49pffe6pvegd5xqjd5fsfv89lzj5z19s03w5poub4rueydijvvrjcotoygrfoon8ap6oysek6aa8gezzj03vvkyn4zgwhyn8ahgpdsem0phja70y5beznohrjunshn7to9yl32blc3vvvpqbav4h6qk6b031qrbnmz3zrq8qzml0n79hfqv63nqbs6t375qko43u8ejair2lh4232y67r6530zr7e2jmxudohzkbm2uo3a9br67geyupzx2juos42liamk3nmvgqzy8z5v7m3exvzvm6cwfxfm2dcun5669tdw482zpaz2qlrxniamlngn2jpdm496e6i2l1w28tr0agmr43bffzw1nltgdp1esns7seqfo1tp2py959z284jtno47o7x3dkj51coz76nif20ay0t4hibp9cxt4ml0y773kpbwy26rkchedfmbkcn0att04rqexzxz9m4e3mnunba3k9j5bn4pdrg5l7cbgv0urfxyn4e08d4ebb1caeidf6rt6udg9nv55jefg9y50hw0i1led9br14le4c7ezcgm2ezaoekvu3mpf4iqbl3aknvb8fx01hqsm89sj16jurn09yhj845rmvo96xsxd2kg4wbjsk97oqn0q6wovqrmvz57w4c270y121fkwz5fqtziv3uyi4ojgf8sdhm9ge',
                filename: 'i13d6pb4aqjrq7gkw7jojiai7in33y3s0blgkz6syfno5v5782nxngid15nztvaxhb6b54tpwex9jdusmqsskr45dul48po3cgwtlw7kdezvd19s2i7jb55z7vplu9ft1vvbfnu0pvk7b137h0a1vsxw46s9otd1zx1rcg0auiptan8gvbiyj15t09vxjdqhorvmbik0385hzmckysi2sru0vcwdkhe64vuqbspmdpnaghejg8w1hrzx8dyred0',
                url: 'jur7fghdlu3yvc8myl75g9fpcs06l9a3zl8j2iuht2gsgmh3qy3lu4gom3nildkwnv75ehbh4stagkx9owcl4g0jvfkzf1lqly172ab4tuwks47s01knwufld5c3c68a38b3rqi5h4t49rcvmyfsf5b6z7gugnefyeog6tiv5ujnak87huq6e85isimzu7v9d4bzeonvutad34lm3fweyeahusnokumt5qpomhpwxkgwbsnjicvu98l69h9kr2v9sa6jpgwte31rf9jx64sgcuy2e3xxcm6c0q75mnb2olf7d0jv9ijmwtnrbaeje5y7j755airhlnz45ij3qdqwo92q58gc5cjdsengtlzf78c38mc7f6gon2pc954vowm7wopzxsry0t73nve0f8hmfjlkbjmitjj21i7udxvpee9ynivh1ieo253jvbonpnfn9g1ijuy3ixs0gb9q5x0f14vjq54pn8e0s0cyy7drzj71bqmcitub5edtmtcqpm7sfdxsk1yw30b9x6ryy74gtmf7cqktch8wg8w26j43aa7tjpntsvpi1cjxyr0v8y96rnbae8av9kxd9737j7o1pikmve3k7rrn6mfgku6dtz9ncu5cgldaukfoju8ls9oubiseb6frwpf67sb76pyjspkb7tllx1xk7qjbi4p545vywzdannte6a3h2bh9o3rler6132e896y7wcrle89dfkut7og0ajyonvnl6pdqjr2fc7qlwit8zbfh50c06vz55aux9zwze6l67ro565ddhdpkpnewup0w57ug77y46dv7msj10fmu1ksg63xbx4iavi29jliw4qz2z4a32ow753ywaao5glz23kgkovnqge9iggle7qh3jkontqutk2j2ksfydme71krf60oc36c52c8nxaken319zi3rr9ynrb5hl8njyg1c2lwhinknva79no599p9m65adkjb12ye0eytcnusd9f4zcw88ys1uhf8uhlyxshiymjxtft4dre9v',
                mime: '5b19hq63ho4x31fghfyo095labegshgbbzgd8igyzkfdknq8dx',
                extension: 'wcgo5ocipgoskej2n0s5h0jl9s1jqpfo0j11hyau2fqkaoro86',
                size: 1239132866,
                width: 973465,
                height: 621881,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'qa7cr53cou4l3w9w36z138940ybcoeytyu02n9qh3nnsp66cne3jpe48rn6gkldwa2emg5qntppfzjlqcpkluqt84a8fia5sdp3corqaa1gnq6oj1y34wp1g450f4bkkv5jlq04ibxsbh4h0gp0ypurhti1z3utmrx3egop1zlueo78k3bfrj4axjmcrlxuw2fhyh84zs9ev3c7240yidah4nydkbhb1qsucvo5b698kogdqnczly8lsz1x0cjo',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'l02rvgyt8qaj75jp6yprhizbfcjzb82tvx94dmdri1em13qfpgjz5vcrgdny00n67acdkk40q6i',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 822932,
                alt: 'wj7w5u0w6yyaibyysqxxvadzl2mhw33d2j7ce7fkt0vzaswair571rsulhwxoz2ftj2i5wco0nuwus8gjhperiqwi5j1ttlrnf8jatodvatevr1oh87mb91rdrzo3xafzkvfbjw054bq114p3lthl80jjlnk61p6mugovkm3o2pjf522wq0comnrub4qg56ymhpt34n2eimm90778nubrwgjgtiumthazrr1d123tqg20bpqio8n0hi94003jaj',
                title: 'bk5t34pjlomxyem29wh1nrsd946mlf8gm0zrr8i51nfwtwrddygg8z1pxyim16jxp5locdg3xfhv929phgtfg5lk26n9tl5yqxy6zjr3rcqmizdaujzxwwfepu88n1xlq9l9a9lvkxetcimv7jddxgw1qnrivz2iv2gsl6js253r3c746f2sw3a4dh16w2r0zp1uyn9kbu6bssyv6whi48tfnw2jw8htce607otirrb96zblymlhnfzb8jpruha',
                description: 'Quis eaque numquam sit ipsum est libero dolore ad. Doloremque perspiciatis quis labore. Quos suscipit autem vel quisquam.',
                excerpt: 'Unde tempora sed tenetur necessitatibus ut quod ut. Corrupti iusto beatae necessitatibus et voluptatem eos. Esse totam similique. Repudiandae et quis ipsa id dolore dolores. Perferendis quaerat saepe neque. Omnis quis nulla impedit sapiente quia error.',
                pathname: 'xia45d3ar1rwft9mkxttyj1ricedfo89zh660dfg5ayhc31ungew486l7d6i7nwp91irj8bn258esrrc79tz8jt7zn10h1d6cx8z3egshhj7m515l271mwjqzg73urko1897vnoprjo1a3cc2oo7n25ekjw6xmlxo9wg5ucwmrjwr552quew9tsx80jcihlu2l9icbo5wnyjdzqinihouls0lva6ve7tcq1v7m2cnudaa7xa2x14s4xlr0aksarwwwk1ix5bczgfzqk29hfczl1scj4x26duqueq3judjjqqq9mkbrlv6y2no7nbkehzarrzx9kvc9s6de34urdrk35sol5i219hqkv0xe9go5p6mfwd81s4umemlw0yir5ants777r59gjjdoevp61orjxnr3caajjq7raafqq2p1j1fk3mk5ta85lw5lnxxfyqngofxeykpi1047kv79ixt7qmc0k1mbwvufm8ocpxlktajh4k210tf799nvwa3h4vfm6h875wstju0kx80o7lv8qo3fabz5fqvoyvz4n853lwxjo3tsuyskwqvy1i63wc9f6hqtm413kpo59u7gk5syn90nap0bqfsar5x1gdltwp66zlgjj659n8vcup31qlmi4k8s48pz09fz2pxp7z1h3dz5c7g2vrmal8lui826x90ozwrb0lmu5qapbzxknzgmsfja4t997rnt9pkiqvoobcfotlcf4dgxph55y636j26o8nllgmv2ce3yqj8tqkyxe3f8r4wxuplov0crtm7ff7ugjph2cxix63adzngoeejz54dssmawrm49spr6lyn1068160i3yp187cajk7d7xkc6kwfuw3vhuoltnqd5myvzp2ia2n9mkkbbelcjdq35gw455e70nz6t1i57lr1xccfsluz3apm2xpfrzy4p8v9jeqbnl5m65ux6grk2w2nxbg9ftizsng9rikkcktet362ztf608tydfhvd6uuikt2n0v73ir1zdxv2xztaxd',
                filename: 'lap1ptbjp4pczj70xaekx7hupwj10huh0cisqg2zk0ek0p3lydbrghy1i7xy8p86qc74pkn12804hyfk3jpa0jnxe1z66yyv29ql02ygb3mo8gow53y8jguhdpizfwzji7yg80jsp0ptjzp5f8p6o9abkdp4xpwv4lf0vrrlfdk9ft4d3fhdp4cxh451x61m14h2lei1r22hdeeol05r80jyhso6fjl8pez657ng0joamqte9u9pwixytgcjgzp',
                url: 'rx1cmf4xa56a10dq1arkkcdurkorssavmz2mlto6wfw55a9p7qjv82x1bvytx530xhc3cy6sga571hijjfrynko1yzk8bxl8si0sjd2137dm7t4pi2ipj18vl6dgsgvf46bbj5ttzot2n21fbxc78puyr5ayxbq66kyvh96g4w4kvurvgxgf3rmusf5dxdeo6g4igrxm4kmlra3pxh7ugvrrl77ode51jnulpncft946pha98qvvdrkkqt6ml6h0mwsszb61cmr8dru950j7zy0oh3spe0nynjpz6wdf2dcm2hyqco4inqavble4mvpmydl5sq2efkaqw1n3tou8r5ey7jyu1s0cjqxquvov28bney4eaz9epf05o0582u1ooe0vod3spcvj63gcmiww9jrq674rg6z1du8o8n1t65ky4vca76ax8gjbvhi2w51r8ukld6qgzfmouymmkj900mil1sksfbx7g8ej29c9tld0xa7lucp8kgxvdzcc5mi8gcyj3xtwqs9wd37dqrsoo8ukzk2owqy4etung6vsx40cgdn10y749711ko2rx63gsw2j8wjpg7rmknhuj8i30qpgwrsrvexia4d3yg93chrfjaqmtll0zoxp3z6lqn4wqt68c7wqb0axy54sug4ry0axdo2wcevj3le9pwvti6cr0mk03ck6q8aemwq1nea9h5qa3tlbjlyqsepxjqqlzx3tlu6f4luljuhhvv2doatiwdksgoitrt1qdtph1d2qxyzoukj46kbvr4pkan06qux3ww9dwefnnspq38kxsyjenm7vcf5132bphidkhqcd6b6y380bni5f61v5uaobo9cwts794v4t2yq4hvvwo01jgqbabs71jvfjbrrmyzgpq3b3za9aigks9cetr2oiwj3fe58lmnf6dklpk0s01vn1hrgl15106tqbmktpr6pgk1fceuiv7ys9bt8lbmn8zd5xzmx49ypslu43fz656lslyeehd5ffb4iqatg8vl7v',
                mime: 'n88srtomcii0xf916luhtabr5g7nwplb1e8b5hukmb39ks7mqj',
                extension: 'ulx0553khz0iefdb694vvsnyz2c66psy6zqq8kal58hpsvbzde',
                size: 3486109626,
                width: 934512,
                height: 947264,
                libraryId: 'rq6h0hn8muovrpxixjy6jxobjoecmm0hi0mq3',
                libraryFilename: 'o8o9g3c8trj086l85v5ks4rxucn1m7a7rpql9y9d4tbznbe8ax0zs4f8t4ofawsy4w9rkhbzs499ncrpv7nvktv3wc075va0kc8lcpd40i09fe2vzebtalusw35530mj8404kbs1bh85cghznm0ghlgoi6pgw6xtor9zw655431o91xqk1reqg258fcjhheswbacbdmnfd0xni8ndhs7xumhjv51n8stmuf1bk1g3gaz6s7x15owpmj1m0g7wyf',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'm2nce904nuthonwbe7ak3i8gubcsbklzjvcyppnzvg8qb2qhp7rqmt70iy3i9qxcb6vunii9js16',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 965674,
                alt: '44mxat3gu71q363giyahpe5wvupzi3w16ebwz7uur71gwhxg7fktc69w5hye7tzeq8jlf16w4mk1ga7nj2k9x03k3qo32yr9vzgzvzvax49xh7b8p84qulyjl5h3amqol00v90zyjyq17ladgjn6x3hwkf4b0ubn377j0ov4zbphvs1pvi0ndgos4umhdq5fz6e7zu044pzjo4u5vj0zxene7iwnylcc6zw7s6jp842cr40pt877aof8ka8pqxd',
                title: 'vcs9psgttdef60h42bynxuvrinksoey0x1qggr5y4d6o1x5djuo5r7wshdlqwmw9yj2qq8bbm04cf3hm8q1sd2saj1a4412t4dnzrp81z4rrrl2o27bghxwess0vfnfeb5gqr7hoynnljgb2g0pd6dkva5g01vqjgt3s9kzet0gkema1h76ykfqio3t8yg87bq7ghmmbak6es3qt4ej953by0nlk43wapcbc9lui8vyng0g1l4lcajjbja1wsgq',
                description: 'Eius natus et est dicta deleniti voluptate tempora non est. Omnis aspernatur ea voluptas molestiae nisi nulla quisquam qui provident. Facilis ipsam nisi enim doloribus ullam.',
                excerpt: 'Est ut quia eius provident magnam quibusdam beatae. Aut harum nihil illo rerum quia. Rerum sed est quibusdam non sunt aut. Amet magnam sapiente dolore dolor et expedita ut.',
                pathname: 'qg35giwv8fkxdbylh2phxo8wxtfs32ztc7nc9mbdtm33xnob3bblri4in3afk7u8hl56s76c0mwffxkw6lm9c03pdp8sbahob1732d707ga2di0v6li69rui6nnlqao9gymphhv0ghokneo6gs1mnn1uir1z8fyel39olw5vsx9mzng1dtmql5rj3p5r6h4wno9scz1y246o2y0sn7is927ybmv6wi5poes1q440vlubbtlnxp2f28ov5jw10zy616z0lzzxqb0p0c0brzfxwwnxyg93j1qrzfsooppuo07m7n4okymys7ptgohbsfs9mygmoyfypipzn3m5q4p0a9blnfzeq3bu78ccg36sxaa3l9bcs755lo739hy32ewlp0290gxnxnux9terbt0bih7a9nbyk20v355oet1xzvvifr6ahu2yip9bbmplwqwi62gku12hlwas4nciwfgqui5cxokfkrea0ucu6dp26esn59omknwvq9hc17804f8yjh40357jwr3k5bqnv3r5css3pli54mfaxier3lrhtswoxpu34tsevb6jmfw1o5marqcnputfs2lw7ikjxvpmihkma1csw4qrdmlyfemwvuevjgwhxecascuigthvsbzx0tzdctd0pu0j9dyda1387euo6r8hajirqnbab3gtifw0ln1tdbgl8vctabwdruhzfyyp6zi0uoygz28wm3ni3gv8qjrls6z9ie2frq5eyt0i17ebq5shindzmte3k8i9pufrl34ff02cgzhhjwe368d2thhse3la4jy28rkya09nfpd7xxnzief1ofn6go2sya5w1ptcfph0ineah6edk4ajii00fuap3dj8ar06ve02hbh7y2aim5lfwxr0iqi36e4cqqj8qby5m6usad21tq4zm1k5q9hbndordasoybbc14wegpystkiqxzb69e968bdjia0uuby418c19cmp6smvrs5filhxvpo6exenbq4mzcmv92d732fzopkcqfqs',
                filename: 'yt41qkcioh9lyx2bpkdrhwle695txbbb9j5bsa0qizh4zaj7750vgbjv6n8duc5exdbzp0xuw4tue8nyysvtwg0b9q7yz9uok5fd7ibx109uzbn4ane2hbikd68cq6y9ak1nbdtgzawhnta8rynw7srlbd853c0nnkfzxiy3bkmrt9m8qdwn365ypjuuzjl16enmuklahjas0j28zk8rdocts0a80yz3qujs5kfv641nrq1btxqazllqbetmxha',
                url: '3grrw63jm6xbh0jc9t4z0i6tzi9a10axnbliudf9m1h6ccmwsqloljrktjoidrv0os0c4oge6wg5bjydtlmldkli35mvupahubkanmcl1x9c8m3kssc7vcgnl83alz8mv9gduip1nvnfndnge9xcy3awh4ejkrci9kk1zlhk95twgr0lszxo7uxe823jibsqd8i1c6v9gej02ynrlkapt94318xuuoxnm8n9togrkxkpb4j0hv6bzz6rmgdtnewuq1do6jobx68qn90w9go5ssuhp7elk459w0bjxbd85rte9dwltpzalih05nw3is6p3pfai91xuflq5upkn6ay2deqrq6ka42dklhezpj8vuc95y59bxyvism9yig4lhpbd8tsm2l575vwf1ac2d4gvjyxwemy8ki6cxqspoj8yv5zckjp04aq6l9xyh7ypc2ltiizlgjua51ft5oiofrbrxqdfikgqi49yybyjxwz1luy8rfnrtpa37mqgfmuqc9y28yxqd7vgrgh1whcn9atki24h5te87032cht3ovi9z50c61exk2s04l321fpa21j0eu2j2gd3inm9sr90paw48ojucy1lox8ax7p5s0ltppfrlmtbmzzxooohs5lt09gazeu87i9ufms7jvw1ca55x0kqn50z9qoqnn36uiuluex4qa5jk51a61sjxutqqzeacsng4isuys7orkc8xsqcxxpbxe2pq1wsbauhvlwtoia5t9bk86gjvd47noq3tg5mo0v5ak9dwszypfa4r0ye1d1ez2tiviawd0zccs5flju80dimo11165mqoyrg2ocx3drzcx3ho69b7hearhabe3jjzqq5dk94ipmf4bxhtd6pv89a4idp41pmjs9d0v8nom81n54s5yvojekdc5zd7guaj5n7vs9nbvi8wuhzdx956isyw0ln1lircw5tktswl8r4yd4a4rbe2cpte55nbja4qzsjg2jfvn1cvt61n27q8m1ky33831xtzchmbmm',
                mime: 'b77o4xj82hnsatwwf8tnqdom5cvdl23088onjw6dixdngwixx3',
                extension: 'jr26vzc8dag1f4c1ada21xu7r53heo7e5tyqenhrajkf00w9jc',
                size: 5696226670,
                width: 405934,
                height: 261299,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'hxv53ry7c2gnuw7tlezn0h3hq66jlnzx56dcikb0t5tb8qu2pmi88slaipfhdsa3iciterxnnuntudwd3ifnw3ne77odangohkqypghj41jv175cx1acpqo9x2qwf7shvmfaedpbfaeqe0y1c15m134gbpw26htmgjf6gaik8bqpmdeycmgh8v99to03tt54ep69csh6jzy7j1hmy92jwss91659bud90eaqgkk3bzx5bp3zh3zbnvl102sswh8',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'q01rlg59uw9pmvh9ohgnxcj040613u0r349wrjywcwqnt3zstl28cidma7acnksqpv91mc2nzji',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 7529868,
                alt: 'cwm2yniefqajhisx5knhfg5ug108znm99culgb6ij9at1ocjkewpjaglqvdp62uaovbeyf70db53joc9ao8kwhmk0vexrxay7nuxxlo05rm6n2j6w4vwt7iayni6lg3axzdgr8rwfohau2wq0ums8awvk4frcx5k43ep6uqwxn01kfbm4ppatdfaumzqsmhvdey0x1ezfqrrmfyyni48xa1jw6ex1gulbauhrnyca09nkh5hxjfscn6vyommgh4',
                title: 'yaq1g16u9i9y6764ndt1twrcd7j88ni7rakzim9chdodt5asnuy4fjev5ow0bas86i3o19jesgzjhg0z2mrga2hp7i8kx4udk4lfskcf4rpncux8hu6z5utwifl1see5oj82q3c4e0d19qr2wfmgdbolx5mg9tciyvjy2f5083irbohhgc8jrqtp4fop42xv40j6e2xwa3j50nehvy5sas1b2t6zgmqzfx40dyzihga68owpmi5u7m3kjc27tvx',
                description: 'Magnam tempore et placeat pariatur ab saepe nostrum in quo. Accusantium nihil sunt sit. Beatae ipsam quia repellendus sed praesentium est est. Blanditiis reiciendis et perspiciatis ipsum. Qui est quas quo nemo aut atque magnam illo. Eum magni odio cumque porro harum exercitationem minus rem numquam.',
                excerpt: 'Nemo aspernatur distinctio minima. Qui nisi velit excepturi neque exercitationem modi vel. Corporis dolor amet fugiat pariatur velit nisi. Consequuntur facere vitae velit. Et consequatur natus sed.',
                pathname: 'x151z8vwg8i9el2js4vow4g7o7egjjszsdzgt7n4teglenfjsw700se618vz02w610cbugkksavsz61bhsmqdhw7ezlrys8tc3g3pml724ve1riyyefj9s1gnlp9zex4mrf5dfmf8dn1bwtgfc0k8abiex2g2js1ed45gusq5cqqbkq6nj8ahuxanojx8mzkrg25herr79taxyw7ln4j60uk3hlhzarw09tg4gvw8ckfg7sgso5aaigbaisi0x0gyc62l86mrpnnnned3izgkx95kq7bcc1x9ei0lxam0xvmdrcndpixwv2letrj24v86zkikqgkimkm3k4gqly0q3qi33qzni0gnakl6x823mp65jzcn0xj8c8zj5xkomd3u0pcz8qeki0u8fixpy20waazae73a2etjafplhcwg6r7l5cg3noeblma7qyeaqoxsmo4w70mzbcrrabjsk2ncrgo4hhgbl83eszn9su27jr4ets29mc4f6zzbtjun0cbuh0ghiopbf553iimc2uxnadduv89mqjly2r3kpnmg85bglkoywbhvpbwb8vblo3r5riesqkawsbvu8kfqs5cj79hkzf1z3h9kjc1x2ke34ytlix05joaca1gmtz3rjw563ashf5its05w3b6fkor1nq9pebf1n98lr5kv5je79jbi7pgi8w056vhzxgfq98ftar6nhe1phtyt3grr771i7vgpheiic0187rnbgulyow3rp3end02abtdimnzkgmhditk6hche2sebf7e0wnvje2u12zbj4ksrjkxhaiybplp3xco9cobpvpy8hfqv517k22haabg4abeqbbveqs1p8gqo1vai1g34jxo9pkd01k5jqrd9plwuzakcbitm49qfsvza3tgomyvw7enxro5wid6sbpnsmw7vmre3rq5p3w3yetmri0zj65scang5k160sh03ji2ti6i1tkyzh3p326ek9wk7m2iduv7v0206euwakb5z5dui9oyj6ik2saz',
                filename: '9ahrgjwfg6gup4jnwtq2ield7hkth6f6jerpx26y3vzqtajyqk8xbj1xz1hfg73bk2qza8svls6ehhzk0iuts6giehqrjpgb8fuiyi4wgn7nliqxbx3dngchnliunr4f9p14p01l7dxlah6yxbne9rtb1d4tdyif0vsaunwdwwi01xnp5ntq4qtr5omeb7l00aeze3jol2mxcg8j07t55s9d19yepf1s4rnfbjs2tovltdxxoc2s6gw06t8prkh',
                url: '3d7vf0u15a424576278lscsmi7r9hf1o0uyoouoqcbdz3ap5smb28iy3k8rqpktlj440wooj8otrwnsh50gvtgz64ez5jmbcahi50053oiitsge9sm5fyc3gn7xqef1kur11aq3tjya0bdyurx8uysrj37fsn0z28b7y812y1vwp52as78csyrzfzmcw8xs6xg10lr5l2hqmtg9z6jmfab4a12stlkzz3tw2p73ageahyj1pb7rqcod2acohsumwbs4ifyllcwnwaed4mcx6d60wlcxk17fjzhauva8zb05ry1vt1tzce1yfv1i0mfizoesj1iv6flic40cu5hgcwu0r31uxl5tc1b5h2r5z017gwiytf0q2enzbals88wzpeqoayyk35xf2l7krbhy83tlw0841vk36ieqef7p71rqewasrqv63a2zp6thk3pz2p2bbrtr79ak2dkft95gxas68vzr5n4ip9ve02rnx3d9jwt9kv3xr8mxllgzw5g15lvrzthz9b50o35jjefqo4bxiebz0spk5x4e24vi43ixxzgzw7p4quvwtrlm5580gzvwsrszc05wupxhbj064qdrtg06r3vb82ydxxptriw10v8l3dk8wd2psk54i1oeyj4i54w7gdb1qyl0oqz6adesnja7wf8caotm9s4dfbuilflre8kbdj3rpil8wc7dblfgd3g7a2647qvvjm1d3d9x1exh4djax4td06iebzyv05x7c500jath87skydv62f4sroqusrcv9brys2wfflwghkgkzo2axjiqit1oxhyhopb01jagl8dnaa3jagz7ff5uwe6mwi468d37uaa9se9gocpogbwi188fqfsg2z0yph6wh2sdtkkx600oejd6h533205q5c849ive1eypii5jbgy6b5uigb8gwa2cmou9kcte8w64tsjs3vyd8sllxo6jheox4l0kdbtew8jf7jlp472yjj6hyd9l672fbdhhzhqlp72s3xo774gv7moch',
                mime: 's49nd07de2ldixu7chxi0t83dpdxqvedcxtoqdxfytmg58zvuo',
                extension: '5elqhpf388juid9qbtqbw31v9lrs19rza3aeb8xewzku72mm9j',
                size: 2363190564,
                width: 879508,
                height: 981977,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'jw28wwbvbiqf7qqi7yckyjnv52vweiy95028y1jsa8s52gbdtnc0647qrlmzr3hwubqe96vxrf2fbco6t4vduteimp3kotppxa62acyggvrpsjhz6vivt7ai7tqesvr13i9ouzg85tvsp1piyswrji7c3qjz93jn1yr61s7fpjz2hpkr9w71mm6jo6l8biaskj68ef84i4o3zlksgfn44vdjncptw1q36hux915doqqz38lwi05cndcho0kt8s0',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'z4w7ye731b92tujdghk9dlplongp17v9mfwxeb1g1n0u0kntc0fdy75gp8grers8zera9t4pai6',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 248820,
                alt: 'bacvvptuci0tcu8ymvda6y1ymmod54r9tsfkehoggedwaq7u3eehdxwtiydrgm40127jyfxbbi30e7n6o4j61a2tl1mr24940rar5cqdaqkhubj2c3v7xsiytc7dypnv82q9dm17qgv2k5nzqhlws9yk88jz5w3shi2ap6qpyerfrrnm77k8mhbzne8fss864q91l0u34j5sxk3le85it53wenp6hib632m602bcv02h40it5d2zyhx348fthf5d',
                title: '4slvxxaqiwy9bhpz4use7dkf0un3jfj1bovy9i3jvbussf9gh1rizp4diazeg08aceyma6w1lngdsf5qeut4d0vwbckj10ek5iejl72g43ms73rgxsk6xorvdrus2qjarsflqw90r550in95hfh49mxitl8yvpa340lmc7def8oe2c5nwnxhnm86xt8q987zbpn902hq815v3j791lngimbwjc904e45ww6hg28tldme7ttfu04i8d9eik0o9al',
                description: 'Aliquam occaecati ducimus alias voluptatem et error ab. Molestias ut dolor inventore eum. Nemo beatae voluptates vel eos placeat accusamus. Mollitia blanditiis aut est magnam dolores.',
                excerpt: 'Enim omnis placeat dignissimos expedita. Qui nobis optio eum quia. Sit itaque aut est similique quod quo rerum. Quasi dolorum nesciunt dolores ut enim aut. Quo praesentium ipsa eos quia mollitia earum ex quae. Hic cum quibusdam eveniet veniam deleniti doloremque possimus nemo at.',
                pathname: 'luje8hsoe0775lnyrtpmaj7fbi4elfoxgei03fzpvmlu7fcgc4mp1dsd3mt736mnz982tyd5lnvln3q0wvj9jwfgm5uh9d0lftzoccplcjqrkfdknq41m65d3zsyg0jw50farhblblot9cg0m8fxfgw00zef0zsrvwzyuyktx2tg5d54jbpprm3h4poz5wi0tg6sm7kb8u53k9qozl5zvhlz0a0phu5b1j6hil1k9vg4ql01im2vbvbcsxxotc15hc1lenpsihla1i7jwb6uqetx9ntczksdq2vkbtq3vydymsgcgibs3drshaqza2xm1k9tzywpjw48jwjung0pcfhii8mpj6wyqnjh75vrjzz9afair1fq0sepxek7jyprn32l4rnn1qecfe9rikxc34auwydrx04fiavy31ttvdrzy72st4w7a31qm07rzaarkl4rcieugtbn5lvtqbtkve6sk5rgb29o2dgul1bdnsfoq97zd44ev8cc9r01ah1ihm90cr729qly0nl39tnxtdwse31e7rab785myuyvcgpctmtzrumk4jgsgxy9wmzwbu3xdxrcr9sw9wuaae0uqmt1kui7nxg0j5x0fza5ehrx81ip017cswdvn8mj98e33b7ipx7ywqf4271qgijs2kja1rqnvii6vvjoph3x28ga3nllyqokr92gwei7udgdn5ef7841r941q4uw3zdmy6pg2na8dg0okkp0cn6hadp18qtht6np37iu1iw58xiwgp0xda8qenm1x9kivabtyo0s6sd9h5j6819sv6g5lonafsrqh2lwp7ajcoq4eaomk7kzsgbfm1hkbs2u9cvul0c3ine4syjidss26iwb70btzrqlpxvocyd8fmpmdqmd1gw8cf5vxjvblyrldf1dyhb9703v765sp8vmdkn66juoktpr581ycouw7itxqf4g0crsb9n2709eqzhk0si6pq6ink0hm6g8x88zw34xku62bqgkjm7t19ydc7sl689m',
                filename: 'tzh2mv533gh3xq7vgyc559uhakrqwzfenw038lp2r2m8enwl6x6xg2mr1zan66b8tnzexjvimqhvy909uv1s9x6uu55e8g2t6m3i3f2f8hfux6lzqgp3dkl5ak3kt98uhgtzytwaze3ywfujo7pc2n38ukuudx2m14605j7ubrvnaipl9jjsteit2jgxx30k0sxzal4pjowvfvg6hesvok4ng97suhsr3a5tzo9w3b7rlujlps8r3fjupjblc7f',
                url: 'hib4d6rc57nhx9wbvt7d42mljm8k2tbpcnxly20xod59xziy7mti5pledpsznodpcw7rtma8jczbbwi2azme4btrcgdpg6mo7ni2u9drwnpzzc4u0rd7yxc7raplhi5vziwj7kvi5ym93d98xk1h3q1wjwwf9fti4klonnhi2q5fi1svausanrjibe786skxj3zj8emyyli5nw0pc105n33d1s5v8hgnj5yesa1pya2twrmbejcl3t62nfnd66smxhh571q08349r2cwrtgpnt2mafej6inkow2vz86u4d6tn8okd57l2ihlqulm8lob1josvb6ac9iekut255un8gqaxl0pk965dyhxhqt3ar2c439isriaqqmv7dzcjxgy6ms7cicr7njginpbve758bxhntcewiln4ucxyvmqgeeabu2bgqurn6lahqpi5kgifipn5xltgd1dyexru1vfwmjyfvaldoebzrezx6u39j3sq3qakmux4rrbnwok16i4we5hsz9s1ckhteax4iwwc4svgl298o568s2ywiif95s7qy1eavwm4msjw7sriqc4ibw7s8ri7ox2tf3two64n6vlwk9knjyypguxd99ne5lbvu3j69qtxou1nqqgwf9egjz8qydnl695ze408t91vrye7clvfsf8eqi80q8i60ocn5p6xkj0ajaej05s0jet39a6tmmksw2giz34qz5pkcbesc33u3gv8gsa2r5nc95fqrvamn8dhs5fw5wbrac7hg049xlxtitxzy1bfopy68lgi775zm6o8jcxn01sgllydiy8hbkztvsykxzmf5zfbkc9hbnozszotwkt1h8kiqsimqe4idya9ndblcpgspszxn8uj4b8cv736isgg9naoz309edbnkbdn7lg2jyclgruw59wdph2trtf6baw4ruuxnk06zfesqv4pt5turj50c2112ugux8hhl60qc5je7mlua1ayy4v8a5rz53y3syl50rgkbypb1labjma1561',
                mime: 'oev3l2jn3o2vnagh4oggmc1t2e0oi7icmu4hyr4m4gbks98odp',
                extension: 'fc259idvn74r8m2wqscaeo6r4h4tl8edoqld1qllti6kyjf93l',
                size: 3295572414,
                width: 425944,
                height: 877664,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: '6482elgmhu4shekuel21bgh3zoh5ljp188fnuwb6935130tokosumy2iftn4iof4pju55ufu1xdeq4xykvv33phv6m0yj3cphmcpwyoxkip3zpgpaor4pspabzm2sow8gt88nm7w9djbzwr51zk4y218wdbnkodlbtzq95mq46v584hvpbk7sdhajk1oy5tuwx2ks3jme8uvb8m0wjhlaeaqxae3uy227iiqsjr1nl1acpqrawc90dak4qjwtza',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: '9wocslebvu2rl9kch4x920zmi5bb0dqyxwfsnswmdgl5fdmgwl5trrra5flafow82kh4tekzq72',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 225722,
                alt: 'dkvfktro8h2sputxbar2yzya6odlw9hc1s066o627djemvtibk06jgo03w403jsrs01n7594l4v4h8kda5nmf2w44r7fz588ewvvvdqkc7j0gf3lr1kzayyrus8sbo4a30aqrbtuanbwr7xov2lr6p30lajb3q54i5nu8wj32e3xl0a7hxk2zi57euh0o74q3xdj5p4c9b35beuo4yvlf9gs2oq4kx3vcevovbegzncduyle6telktn120dea9f',
                title: 'e7ayq7j6pzvdkpggxz4pwhco40j9gkgdthhrkf8g57zfdcaerl1gyfp871u8fe3w9nikvy6chak5446g8i4bjxhtjfh3bhbi3yr3ncfoa5vjv4vmw927ydwzb4apkd7ymm9cx96cjove8xx2bw4ox7k3wpa8dzz80pxeyt3hms26kbfn906id5z3s54aijtyk9zg33vav2j22hkc335in7uchlmxahdyyxbabi1rjrziwiof2w2q7j4aebpkquv2',
                description: 'Dolores quis facilis in id. Beatae at omnis dolorum at quis quo. Nisi non aut pariatur. Aut cum expedita perspiciatis nesciunt voluptatem.',
                excerpt: 'Et in molestiae ad eius explicabo excepturi laborum esse totam. Quia voluptatibus est ut distinctio nobis officia ut. Officia molestiae blanditiis sint quaerat dolore eum molestiae.',
                pathname: 'ole3gl5cy03bcl54v26vnptm40mex23jtguez7acew57d2xdiybruo6ybv88flakx54hvk9kqg2uoqlnv54asdtqo9agur7deu2zeznhxqebrj08sbeuro1j5w15q3s9ehp1f3658o4keupkrsk00ktl9dc93hjqdf933au4ak0twwyus5xmikk1fbc21kv66ne0o2ewwdeieo3xnb07iyx6hdowku4gv0g5k4dpsatbbwhi7nqxqqvn06hq68ahfnq7c0us50g9ulvbij8txipjhqc00qxudgcqu01od7w9vnwnwwavunbs0mk3tl4n5zuogmosk2d9hmharp9vsh3sv9xgpvjhwvflej0hw01mt3kw86y1a6bsjl2710x32bfa2zbki7s5rovfcztyh03ioheh29jjb29sbgnnyis8vuk0ra3i8ix31y4n2nff1z9xsmqgw1gca2gqpw7lopldvtg39nheliw5017x57qfiofi2p61tpncl3yrdb3fkexhgweluzg2m93yumskafnto7idtn9pudncap3mypynfcyqc5diixsvemjf9f5u66chuvoy86ffmgn6s0stkjkkqmakk13vv6c5u5q3scfqcit928crjqwwss1wehlui2u4iz9umrnugewo4xb92eat98lns38j7pvb0kk11g9kta09yo5cm2ilkmpew55vn72bf8iy3s118cep4gu76wocftdqq8gxz92l2z1wuhv39lcoq6l5mvcmx3hi95n1qja2xe42tuvw0hru4a1b6glm6gpmq93dv8hrg2azmx3h5sv8q4y8d57jz0kyn0p4uolemjlnb2j3sn8rtn4njgkwx4x53hiyl7y8cjw2talr2kcq12f0x7vyqbjcr1fbnzmb62vce8ybo2e9qbeu757vdf2jk6nl9y99y10a30c3c8u8agxi1qfechmdkpoeorb0pfht6nswvtnrdgio50m82qokl4wz36v8ugh328cxwqhgls5eozu4soyvnd9p',
                filename: '4gvdixdj0covbp1uahw94iugeuqgdp77q1dyprktm043c25d0ik00p8b8c7nq380ipmqurxfmi6ppt3u5h242oonsfz73b63rr8gyrhr46eqpq6803cyeay0i0ojyqgvbm96yki5welg07x1ragkjnoz5b69h35xvcer1vu48mssw9suempffljf1y1ihx867pp5h284luoept0smgc4o1h8ba1dnenwj57x6welfnx55fsj0nyau3wv3i94df3',
                url: '4xhxeiuyfa2cln8thv8pycz52e2jpj5n9t0hbdj42y2y2yt4qjmk6g5y1tcwkrbqnjmvr6vzt0ke7y2d4ye8qyhlojb7nct92idjwctdzfh3yztogco89nconknboth6m6s2sj20cnorqutpzgic1ha0hpbo1sjb5kpy8pekl82gv3w1qlcloqid4ajh94cqfj6hogzcoanr90z1z71ohwjrl32wb9023qetpb2h6pgmrrbld1ehwoqmr7ku1n64zpxlbhghdb15gw6eom5mu87jg598gy497jlpdlqbjbvtefr5vysbcc7tuvkcd3z1xb0pzmm3n72ivi5dcg8nqgsxhgib0z69zdzt72csjmni2iv3gqkfhadds4p4ofvsyfmf7l3k3whl4fp1ikby5d08rtxlukxewtxc514cscknqz9wx47o65e8gwhygq34tbv7yompbcl8y0vqilfh4o4etr93pnk0evwpeek3vh7hcf9vk21fd23b87gwi9869xefjxe5ggymp8k75ssshdmby738wf877l7dqg2lkccmz74486lv852bfjkdyto2cwxmahr4rmuxhi1z81kwv1nml1zoerj80bsrdj8dz3c4b0zxuqrhxrjz05xqx36pzocammt8ydday5taed08f78ctw9u64p1fxk470cu0x2sjitdy8gtu0ha982frmfvzzklt2uc360pkm7wbupyfauw2aqk6sceggr86n9sz0nfbncus67ye9ipxuyjptvxm28i9w9uh3zsk31dtzzjj56krijp0hz57c9xjlp49bp1zg3kpg0mvszvxzct3a9b973ydiw0umx4cb9c1y3ip0gbjk32id0b9uvd2a5tke825dw9zytna7npl2qa5172gunm0todmp5onz3yua5uoa84kvp7xswkqo99rvbvm7ug7xmv7wvn0w7fipbc1ega47gg8gvi56y9ppk5cdbklue1ezqhlsnx229vp5jd5pdusgnfcit639sanv1mfmzi',
                mime: '7o44m7oyvg6tface5xk5ql36hiledjfl2ohwr4gjrsyxs2u92r',
                extension: 'zpizgkvdzlnszgbrb4nf3p5qgtqkml6i7uv0w6gkh6uej91ca6',
                size: 4653751895,
                width: 988137,
                height: 988368,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: '7bjzf1evnvfmpjtlu1scylq9butp5o7kddbzv4txz8dxt2wqia2uioxbks3m3dmq1vwx3hrjd03h0gn2o3irvmn5djae9pbsxhenvm6apt9yj3h0ucfc9250jt0jlda6xawhsg3wll92a4bs953s3ibgh6nhta9g80vm2g7h9ty506gjzeqbhl38ftnd61se767tej3zbomuce69uy27gw6amnmm0svnve7ickul57bksq7k9aopcj8knqjfyep',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: '0z5tf7ao6yxkwk45sjbb7cwksgnsgwap1gyssc8aftk46sdk3hfidotg9pxtek3gcbb7mn1dqbe',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 281156,
                alt: 'b6he0g132uwxo7uzqkx4ebdkkaroc9vzj5skx9f3l8rrjjiddmyo1ni22vpgv83ft65a1d51fn3kp3nwj5qbcz9sne1s6as1xd05mknhb1qf8upk1fxmpgupdglaly34zs2w6fq4i70kdbqeiupd2yexi4wuytsmf06rejn6nbk2azds20qjla7sq597w7s8cpx85e13j1khpii2wjx471c5t9gvpuee3a71iwtikuhj1pbmqkbdryt3lwodift',
                title: 'hp1jfj7iruewrvnd0rrhrovxaei60mifg7s9mz1wcswvtey85lqhi30x0wb9d47gzbczwij0dc1cigxvs80k8pucq4xssjr12vm0x7ebxaql6pkr92lmob7q49b9vvoe999u6amb92vahdqfnhqtizfhhwg5h7xryvh6erwewdsjhqlmcaksq5xbaglk51t50my5kbjiats8btifnj1luaa6q9zacxubbgb00gc30349hz78i7k3lcky2wsgwlo',
                description: 'A sit suscipit saepe quia. Necessitatibus assumenda aut et qui corrupti in in repellendus debitis. Rem praesentium aut vitae veniam nemo voluptate.',
                excerpt: 'Porro ut ut molestiae aut ut temporibus nihil voluptatem ex. Molestiae et numquam eos voluptatibus iusto ex dignissimos. Est autem voluptates et ipsam aut enim exercitationem dolor ipsam. Et quam laboriosam. Ad et occaecati dolorum consequatur quo. Aut perferendis qui illum in et.',
                pathname: 'uefxpywfpge1081rw1spx7dm4bo6lr1j4sbpljqm1gz7q6zd5481n5ivy1n4sgomc4ekq8cyw1pxa643g6fxcy61xqokessfadld3422xpo6diu6xca0o0yzit1cvbx0r5b1sbydo64e4p0qejii4y36wfi9uy9hv01l592ij8udj3lwq60qivtxtxjgi47f8rpvtjz1xqa1yx53nnrkyicb7hfu4oem7eil32o2h0ci0ch8muhr4p3io86f0jjwb0u493fp6722qe2ib2wr7wlbomgq4hgklrlq0kbiywejdefvximr88cmol171rrg7o8umuynxahbpysnsyaczj6n3c55bun2wce7uhavdo3v8xm197xdalrzv6znoy9ble5r31pxucwqgfbzvntoxdeg1zic712l6dg5ze323p4khn8csyx299vplzn3p902vnjpds39t0m1qtk31c74lvsvf80g8jocjw83ar0qrqufzku5fd6jbhl0ng29wktp33q0ey9jflzmmkwt24ffsr77pezi1mgqro4vs06uiyjauxwney38544lis4j7gvfjbsij11lw3ajxspajyy1acjvu7ycm9f3crcdxj8ntdzfowflh937q2d6ieos6w0bnmzq50wtufki9mz0tpfdmoidvhpsykc4xm65kjnbseftnmm575w7y7k204tqmuubzeezk2wtkdydwyfs1cxszoyhkeq1bxcx5tu29ng654qch8xksdnympk709k77jybi5h3ejhezex98pg1wr7srxryopprm2amogmjoab7f6byuj5t9fmcuj33lhsk101y3c4nxv63ydeau8jw11k8ycnaipg9818r38iwqcaojqhciwwkbsbipce3eac3lf6kg9q9ok38qs7yi1o5q6uqiuy2e0jggdpy689oidakuzn7n7a9b6p0taegrl0vdqpqna6plqfph2qdsp48zdv0ye88haj0elptel1sfikrax50f2mcxza3h5q7b4iwr5258',
                filename: '4oepxwtnakttmb98tn4szt8h2khvry89rydp5da93usdsa78nep3m24i5gefm7h1bly9ojdz270pwz2q6dhqjipw05nk0s35rv0yrfyyx8fpqt6kgalskhn9ga9nm7znbqt2lwi4s3gdsi1z775448gpw690lacw61zoh9q5dx0m4udlyjpgvjrm12xdrhfk0ip0yge47tdvyb74x7rhsirmfmzwg81habpugqmu3988xan0n9kwh5150cmvq4i',
                url: 'b2g6fs44fvv76b2751pxwp0an1y365q820bribv1wv2rawxcnpxwwtjq5gl9rqilj59hy1kfpsrg60jdv8q95jw3ne5lfzvp86if4srga061kgfen8rltxpb0z25uwgohhes2tf6syl81r0jk5yvpztlobgperpy77mct12ovqanus4l4n5rlb1rmmh642g23x5q509pp6b1o9e0e4iqjbshzror16bafxc2c86nga1rll9m1b2m8gm1d1p4bgpzq1n0hnqqz3smrn9ccrq7o3i7hb0qgviduc89ld8upurj0wr2dulnumctllwty5ukfdzephvh2aqhp58scuxwr32thr0cudj8uxgim6yy7wk5w42bl5cosgudab1om35agaj5nshvthx2o6ucn75pjkkg37mxcy0hh33ea2yxh22te9tn1vvzwuut6vgwo4q48bafcxpx3rl7vlextlyq737hptl3eys9fixtf54rcrndc11z52vvzioeosicyuax9tomjxllt9w70e42qqlxqgpy5hoe45xg04m81x513c5d7ntr79v0v3t5k2i51ilb28nvcmv24wllpuna2vdi1h3lo4x09nhkg05hb4w8ssqdyqctgubg6ret8wbjgzydurdxo0t0pbgqrok99f63jkgg951uaywfxsyyqrs7huhxqj2osa8s93r1q81ggl7jvunq04s7wws7qo54h926lu2vkv980ubwv3wc295u71d13exkynlnajy9xzo1onklnet5itj20go8b0xtkmqb1bkklgadkqjaqsm4n70azmpfq5hfmw6y0uulw5wnm3iwqnkmd3vsg8y1dnufrsaj7f438ud4boj1fgvrdgddmvo6v44ojoyt63uvozai7rzdllcurxe7idx4ylf0k7dqpj7rbopu6kkkgbw8rlrv6l0zklag9d8tnq7jx9his3yfsq73salrpjysjd9jy6q1hvepfntc8zxasg50niclv3jjlzk8z0yanpphbe6kvb3f',
                mime: 'trkwgf9i4kdck4m0yo8ywqpvtq1wzt7unf6n15pupvpnb9gxzi',
                extension: 'u52tfe2zto1r2zw8a3nq21mjjnskkewt33bc98r6gfmxvqtpmq',
                size: 2780812968,
                width: 769113,
                height: 784664,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'zwypnwwliqq3vz44o3wnarw0b5fe67n23dns7tnlw8ar7ec24rhfupu3o2ym1n0i0biy3l23iq7ln0d3bgdtsnkz79z1t5s59kqvje8m6m4l1sza8ijjogsp1qf5hm9fsv2qhhjt01ptqyki5gp0s46q810wsxadtgr1vg9bb6yj4vzqgytwjc250gx9gpnkvojssjn7hfyatmw0s24l8o7qh4tpwi9rqqxhfj7pjpg8jj5hv9ynpy52g7efetr',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'yx8l0lkebwwov0er5a6trb5bzau1lyyn6t58bklhtagolpbsuvnkvulmx519fuyl4fwoh5o6os2',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 693702,
                alt: 'k761ataa1286qzhl2lcdtn1h3unjrji5bu6g6oe1vdynxbvcb6u0zkdfrlr98ztr3q2ff2nzdcye9ryhjwnvq7epfhlo9ibwkyt624c2epwbziv74a6e9h2mxt8pvd9bv23xuviiylo74hewqg9i1dgvitt4y7o1qu4ihb3ls72sxkkmrnf879anct37cb46nxghppxoqrb3okp4x0sotuuvb7anyflp58djdgil1fgcdj7h5b0gqfuat6l6gwo',
                title: '6brbpxn3c9wc12h0vciozk5zuu8l7p6fzetp6yqf7xdye48mbxxdtmt1slr70vngjq4nrjgldzhdsbsojeknyo8r9up1kg34kubeqwkp0wgsx0oyoqdi4ggcne4aayg20yxyc8dal72roct1bt4jlz7gyuaawqxkka1oy435sp12z6ivq83gb7v7fsssbd98ylc2x9x8n3afs7639id81jbm4pawqp7w46am1fj286zecux5ht9jddhgx3r0epx',
                description: 'Deserunt iure vero. Fuga qui eos magni. Qui quam eum ea quae est.',
                excerpt: 'Sunt autem nesciunt culpa aut aliquid sit dignissimos. Asperiores amet velit ut sed animi voluptas. Officia id quidem in eligendi sunt.',
                pathname: '0fczf7clor7ptzyutby5b5o1ssq1urnfh58kuva1tr303vmq7pcq5tnedibi9j1pooydnt574v68lsd183tfjj5ry7lbr8aadhoqflf1e9kfuo39vrxfelsxzxk1ahdinde6eltjg84guhdko5bsw5ky8zlptlh5co14s0i24h9wah7x4cpmjo0ejulvts19oz2xu4hmt80yd5plqcd1vwhmlwv4lxnf57nksmtrel982lh7k59z0phg9d42rc77vza03iibuqjuvfpj7zqgxb2h0hmurrpzdmk4xaiq3wrxtxi2a19e98y4ecxh106pe7klhjthy4ulro1lb517xixbmlvx1866qup3uz5f90a2a84wj83nl6wj97a0rssn38f4xhqpt5szxj632cjwx0moeds0ulzoazs1vk4c0k1bpgybyk9c3p9zopz9k5is4dz84ehceqyejwsam5qn2zrg04ffnubr1otlggjsn3pdmgtl0tb5xvvrz5ehmlfq4z5gyil963wc0t55chet4gnjuh3zfoosczcbsi72lgt98ene4bsggb8x63kp3e555ns6fhyhqxzzk6hfix31prbxo7dzov3uvl3mnsa54yg4qbzij0j0vs78578rfhw75m04mau7ejletpnbedd98pv82asp2s47auletvd68h6sp2hsoo3faiai75vq576bbxj8jd5u48zkdbfz4x89cp3ccyl7xdnb9t9qzcs7gpu8k2yr1wo2c0ou0ec2z7t8vadjfe0gij7tawqhygdj1uuv3b28vhiox3f6eyj0iptljxl8alhwbdis8gb4ubax6zjkq5boyexxte9l04t7g6xx93rnbldapa2gy9x1a0bysb60fr3uqry2cbcfid4pgak60lucpiqbih9pxuelqoptz9a6gcg0la4gz95d2y0u28640j1whvx0iqblnlr820p4av12atkh7b04q1blv2kkhlku4ybr8sheefpi1v6dercvtuv85vzaurw0wq3y',
                filename: 'kzs0k44yom3yeva79g5vlpzqez72jfwq1b6iei0hv14n6ikur2uyg6sw5pcbyr387b3h7skdrlsdh51kv1ykv4y34whw42emdqdl1dcogm69jh1etka6ooongolcjltf88outusemt03c9egfd1w2ffjqmrdoqx4wr0ueuksvk4qvgghrf34za0n8317ckuy1rucjmkv1c8l2mawlemgt5m32ynhsrl5ru75v8v5stxf7rafbtyw1scon8b3idb8',
                url: 'g0eg8xo0nw5rqejx39jl0msmfwwki5852wly2kbdlzk1m5oeojctic4oam0rue7m89uilkfxptykb86dd7x19u67q9jd4etvauk250460jeikxyc5e5b180b53v834ng11zv2wd823diip2xdpjtby2c251e19ycj6c602u8z5rqgj4j666mjdzhgo1vqfcd6vdoa419wc3finhmpvuk1zhrf4h77e1sccgjq8bl1lsaaqewf41vtyysk6zzwgxlu28h8ehwxvmxp3o1z5ora3q58dvbms8luk4jbslfzjfaccd2chklqooyqwdghtj0q8s4yow8prxvmmgunvmeunnc03djjztgxft9ewqegq38r3vem40jcxg14tlbvnmrwx11118ab8kpz8dflozqo143dflxud2wtz31wu4qhi6045yf1nflwg69o24sr02guwj0kqgka2pwawz4rt8s8fe3w12hzv0eu24d4pesemmqlbfsp30kwyer425iw61scgjy030slnwwl0cqzqkl84knxvx6xgmgg8y7jqyp4o92f8da91i084hbx5zwqtp53fkq663lwv9sdg97ik4h7j5qvlt85w5wnzhywp2qxgukhijommaem2nh1zma055rht9s4nf2bp27py9kn6r8s9yndor03ystg7vmsbs80wtu021qqzaber4r8oai4s42ulvxkn9d5f35awgfgcg74wvv9d19982ybdgw4j5ehl8dfqwhgssj9qn0w4vhos85ejx0u786jbkulvn8naw960sgjh3i7p4xi14wp3ipz67uy5ru8fahipblw1b4465x3g9vz59b368vgc6x834p373v7s22m2y1a9hxlvxsqual2oifro881qh9bidwojln8x5gy6sto7ut1vyh4qw4whhc9jcz0bl2gbtwfzytaemcq0zog13l671wppq8aogo3k1fyjy5vennj2lypqt4y4snewnpn1pab5c4qhuwdoqvzk8f4vfjvvvuuv36zq2h',
                mime: 'ke6o6yss8vlg6i30lw79ytra8u3z7826h0igoev5gl430wa4ss',
                extension: '5y1bbvcx1xe3hubvh4v3vff68ldz1d9cx1wna2vtc5xavlz7fd',
                size: 5769475026,
                width: 880432,
                height: 461605,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: '9mq05u9b1omqwqsp6bmaqm3gt541vyb2c5t769i8kqb92f2fs7j3swsqkuuoqxllr3w4annjs60bun86b5t4l0tlzj0ry9tr4zgfa0rfig6qbs68x9bcdw2smoo2wpzdwkjmz6ns8qq3ec6g0p7zbokjni671el5d1l68fdeg7axpxj9l76lstbmjptmosx2eot7xb069nj7lz1gz3aquwlw42ohs7055tage2o4zgaabz32mscoygzxbpddhpr',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'bwc9uem33uc4dmv5remedlnny19dotibe5m3tj1zh267qaopxaj5sg14jbfh0upkk0hmpncjljl',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 935636,
                alt: 'odferp8f0pxwfwr3lkia8xik4qi0wahhxc4ab7tcsvnyq4m2yhzvki1f2a3yagaz853xk3m63d72emy8y4j1hr37zng64sdcqsktm1okt69znvvqmfukd60k2qolitrbiekofb2zteac2l43vxla8z74rcb13gyf0lhi6u0ex7ijjsv80nonxtdxpgkgruormpp5nbricwhao44polzcd66y0i35cjc425aabad20xwta2592hygcg1uu9euirq',
                title: 'k510cdozy69ri9oanbc0df48vr9kmtjc04histojr7vxev4zpfn3iw8pfa1i86slvncsyzn75vom6v9eh9qulrg8efqwwh9wkibl2dbxky64mcvr4a9fv7sr5hsa6l02b5peaybanq04lhp0jzmgttresghm51sj8yr1wo663709l7t8p4bh985uz4a6qedpav2exqprbic34unnmulfua65u9ra5za5k1y1yhgnxiv84f4wl0zo4zng030wpja',
                description: 'Nostrum eaque enim et. Ipsam et nihil eaque molestiae ipsam nemo ut odit. Amet minima pariatur.',
                excerpt: 'Quod dolorem et. Autem vero dignissimos sed minima deleniti saepe quis ad aut. Corrupti culpa sit dolores excepturi. Inventore eum est.',
                pathname: 'hb1sntup6sw33rzz3wkwpwq9hqw48zu6y7zsuauv7h8glff1yvbq827z6hxct8a1c6sl9son3tolmg1j82lvfajugjwguq30gtjlvab5ub7m3695v1da2ooiwj1my9bh7phazl6i400baqyuo8lqn41xyskn8io350xkmvpd5wwxgujtmji5zzimlcjfd2wfbstuibitrg7bk4mzgkxlozxay0ng8sc5cxsblbvv5d7lwdi8n1rtl2g1bk5bgwfbd2elftl71i7mai3r83yy127ywrrywlzf98hqvox7pas8rj6ere6ce3bvqhww6km0eq4c2irik6pgl2f97vanxn13d4bouedagniuitucpgd6cfck6cwxrjt31irl4ztwjev5erjftsav9tgs70qgoch4g4kh5lnhvx6hm8eum81txr2g8tt0usklwfqd9mg0xfoix37iorydp6nwcwbtvjonsej8s92t64li8qrw487fwsrf51u67uoec9wafk7drtftteewujvm7cw1ev2xgjqg3937gdvwsi9tqb6j3x1flzih18eu6v5elzc3dy4v9eirrj0zdhjozw4s91wxf2txk7kg2u2sd0vhlb6u438wl1g0srfnguwn5jeb7e28mscc9j3k1ujxnj9wx69m34pjui52xw0aws8xni3gd9xn4n568fjlmu5e67k21a6heqrv3vifwblib0stn8usfog40bgoixrhkfdb77nz3p2fdrkatfeujf1ompx5yitl43efz4wdqgdtfc2fhamyw2mut8wikznd620d2147w3huymncr4m01jr8ky2o0ssqfz1qjiqzwaz6y4ajcwyq2yagyckutlu5mk97wonmpt82irneycc1ibcxznknacbcznvn1oh3im0nnom9th6ej85euualwzdx5get96w3krhb6st9nwgwwhmcsfreexyov8jht2dr898fblvsmzubc4glqhdnxsc58p8aonzucyaqbtbnv111qh66uwj7yze7',
                filename: '9cibr5eei6l4velojtpizkpqisd4d5gkp7s3gd3onsorf0s5yucawztz35oc4q6hmq1zneget1lw2p31m1hclrs5734u3riijqvrynnxuxn8e4tcs1ch8gtwooah1eqrnf7ihzaggw7rzxsrqieo8i3zdvyrydkskettvombaorlzfeyf65ezqng0bh9pnodawa43lj642tkop3lquuhrln4whbyr2myforz3nphabnxic7h7k7xw59zdqyvuxi',
                url: 'ebsxpwdpragsrrfos4zao0x9mwo6cv1glzbl9wn0qsnsuo41prevjebvbvhvfxuvzu0nf6hkid888hdt78zrpsg56979afjuhmgo67vljmk75kfztbc4kfut83gkbeeg39r7bf9bn4wssfe5hkxc3d8yv5agel1qk5tjzpahslgicdjcw27n1y71kp3o1rg90tv35um7hirecfzmhp6xqjje37z1dwc9a7nns5t5lnikank9x2cghmdwf8ks06k5t5halwl4g8vwj0iaairlz8l17zbpnkke7f3guyuyth6rncuunponfsvr8mrt9hc05fx6pivirgmljoquvluvs50qmx8f2xe7x28rdtffxd1l5gziiqnbxvs5v3t8r3ger1eowe9bv7i7b5mto2aav8nuh84ztmi6ao2qirihab5iimn9nlyavogtx5o9qbc4pmhjzad2xvqxy3k0e009nyli5vownzyvo0kthf8o6mhvnleh4999y1caux792ruhgr5dcrs7s2rbo3vqs42qgtdactkrq8cade7vp7zp4qa598x4wjlwcky7pk3di21jhuh4mlr4rskbthrq90mbft60iqxyf7vwcy4n3pj5iysa3xpl5f352p9ejhbqu73uoday2jm66o0jutay76hm5vj3vtzqd7pok854o83korzqwlpbfd7qgbpymkkue2x3au3j3c93fco75qpetuuk6s116iaz969q1ekj534sa53e61u9t8du002g8b9f2d30i5zvbs6osph59h6sgzvkkbaruzqhhlz14mn98hgstzq0vgnqzjoypi4f7klzyc1lf69u807mnqsc415csvfxjx0un4p56476q879zj4u9rri8xe0yoe1qur2bq62cvsavktph0xplngyrgf84fqnb9at3moa11p01oaqhxyrusbb5zgk895extw47nrow6pgnvjvxmttqtefa9qa22jcdkeezard5k608xfnamuuz5bgq7ytp2j6cte60cgk2or4b',
                mime: 'gcbimqteav2q19z7h3z87d24bzryugs9zph4ubipbosu8cw8it',
                extension: 'dchztgwsi4fuz6n80fupmyth7xq0yqdz0nfjjr767bve6aly16',
                size: 9635094578,
                width: 600063,
                height: 208909,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: '2pxlyaj6urim1504fi8b7bcy6qeuzowbx0w4akkf0fzgq48yrue2fq890ik9syucgjhx6hb7ln6e0b96sphh27f6hwh6g2vnzppr0xzz0gz7wg5u4n36tjo78g64k5az0fulnu3bkr1f7qdc5u0wtb7blktlbqhsi5igv6nd7s9shqoilcec2csbn98z5ftn1basg5n6sxcliy2asatol98ol86owuhujlz5gqk2jgd9q9eu98ewgyplu361rdq',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'ygbfh0meswmcukk3ic4hnqxg34pwjk0iszwxphpzw06uul8ddhdfdvpbn29hwennxaj7bg88wqn',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 395260,
                alt: 'uf628hr4smrieku8fyvi34ds9lj4tje2jgieadydu1ffm2m8zsrdt8oz22xfdsijyp4zg11thjwtxn3j6yavvu5bs19kwm5jz4y0orh298ayd9aj1qqxergq1155mncu8k5vlqmj50yjmy2j9cklluhsexarc41mveaztouc42gupmcybdl8blphrkrret6rdhfzuxhbojki1v4xm0gxmhpqu4n8xro73sifn55yyog0pb6whaximhywte5gnpr',
                title: '7ityhlimnh9rd9umkoxkj3hikr7ezecjdw0iivdm8bob3rwvg81hjjc9lditya73l690na1czo0lsylmb72lxni2jxupcw041v605gd7yfufyeznxnq7oz86xb5ab6hz68sv65fevztlatzenukjd8gwzyowj6z0ygpylwfbl26l9n5g6xlxhtgipq00dimj5jj9yjlebnyg95luu4dlwnee5v1uhlp595u5eu9z2kjz3ojdxollvlgcf3upc1h',
                description: 'Quia sapiente perspiciatis nam nihil illum quia laudantium. Quisquam ut itaque iusto. Maxime sed assumenda qui dolorum nam. Et aliquam cumque aut quaerat officia et est consequatur.',
                excerpt: 'Culpa nihil nemo. Mollitia non id et ut. Ullam perferendis rerum earum et sed.',
                pathname: 'lkzvd92oxa654vg3vexah7ymekv2w09zdfojp73wldk1swi2pvdby3vzec40uke7b3y9rb5cm9vp6juxse2b06n1q2h8doad49any1jldb8ural6p2l2qfu0bsw7blymewzmt85b94gkoetabo1wrpc7sjmq1en8jx3yi1i5pzu5q5go6vs0rm5gqppaqnxl7grj50bt8g9lk3rrr57xn9kdccwl7vi9s99xe81bhnaqqsoehouwls4v7uohgfe94jt55owxkqn5t5rivjjhclqe2ln20it8teqcmy5q6fofwbojmpd9auf6bl3ny0dllildgltw5b3awed69z6pg1iiwdwf27yi8jfb4g5c10hwunqrhpwhtyxrm2glg79qhqb7xa2urr0sb6isg9clwwuqutrukuo8wxmsv9sjzte2hx0wwjfzgzcs7pw58209xrxaz7eba83prys4f1maxln2q1xdhlsi2qfbjzjvr15euyggghdgm40rc8a5z04ocodj0uq572x0s5i76ph45815u511ckw35otxlo4cv24ljsljldwn1qqu5f2k25tx150oxx2u5lrmkiwqz6gf4jaoklcvjmpuvqvgzpsud7mahokftsl640w1cjdjkf4z62z31oqtebi0s85tnu8rude7r3lrpg82gqaewgn7yqz7r9nvq8qaxn2mvw2adpbo82cz0uqet4ja1rgq1hikp8tk8dte779qakvfkeyfgn19bhzwe0l9nc809x75sw61j2lfahkgi7wxfe68kw73r96t49bxpww4a82q37sjhvh1iib9wn37odw067l8pauh08dyl0n9b21h59y1c25q3kzfs1qr87a9438n3790gwy7aebcyk09t2m8fr09galq8w4idg6zc6z93yk316v1o7puio04dtho5pfmnpk6co1drs0annh2cfzgvl3266p28ev4yj3equtb3whfqfwuznenlu0nv9gqpqivu5asdkpz8xt4hknb0fehf0arhopo',
                filename: '6naurc8y0fx4mlor6pukd39z7r3ckrt5uqgn7vtwgem3tc7tg859r6r4th1lixa1p3g7hfvkwqqdihjjfhgdxi403pzzedlj4rkmmfcqpefsba6hbnxdh8q24ef667ciic1bj91wq457gig3nwikmiizin0j7hwlgr2lzmo5x6rzfvmsao6enyr9tor4as7ljhs5t6ab8t6bd6l7ifdwzaa3fobezwzhxckghi5kw2litmlaj70zy6doxkjb79e',
                url: 'fvf604zcnp2oumy95ifjhie8htwhq7hru00z4w797vo88wb5ty8ll40cc00i03jy622k95t57jm6v412o6oky8hd4k1jqdvuurahp0lua53pn1gnyxob2vp0qfzo9rl37pm2c35c1aitifudsa177788e0bsu8216qymzyky0zf3nk88xwsq54j0no7z2z906c5gkj3s6zz4d86msl40jap7t5lq84qkitncyb6tha11ctl0gp1f2qzvr6p6foi3uczrbhp7x6i9qfygtalvdy35x37y9umcms6vlnvkbdygph82xpui3sgkt4mijjpeo7wsfvogcgbapixk9ev4co3v2wgpg7k9xz85tph955ch2lt8rqzdkuxz8wmjjdexx5c2ssul859evbl8e9z53bzh59aia61n9ednkvih69x5x0eqsbbv9levlzl02bnh9qyy7vi6u1ddn2g7x35b1gtmhfgu1w9ujooh628tl33bm4zn8o2vtigxwg1gh93khx4akjsugml3z4w5bfunp78gwmw4gt4abqsx3rk50hgzd3nby98aa6xbsgs5dr8y6wa1ww2nfmjhbb1xjnpbp933ymfka46spklockhw05oylaokipkgkavc67gteujldykp7hexhf9eryzs512rdm94f51ssc36jzs4dpi79m658d13ret9ituk69e46m3yksyiw81d0lonmja5wt3cafnhdepvve6tuia40u5669fmudmgusk19go8e2thih9m3npww2rfkwvu6m4nskpyd31hrmlj4zq43a9wog4jtrja3n03v5n4czo2tbm72gsagrcbtkqpwyvo0749saudetptnqatx213fyjfhfnnehloqop0hcjpgpgzrp02ji2n0nto5wyfnv3h6p8z05dx76la1t7g7449y7vrw9a6k7ukuqlxhb4novgrztb8mnf32071et5hyeytcgv6g7dun9mi8lvif6ndfn69sluows495g86q44xjcs9jka2c0zk',
                mime: 'jq4z0xcxctn132l6w5msbxd9uetaunuyaevec46vo9s003cfo34',
                extension: '8w98e59iqdhk1n87jd0cwxu9rd6onoy4qyo60ty2j58rypzf4i',
                size: 2133581380,
                width: 778042,
                height: 515023,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'nrm479dbyl5d453jrotr0eqde6b2ox8o9rffq1wggmpjv7fyxzha3sov8779162im3lopvcnvvenxq96ry47wa5069vny9zpy1apporiabdvkd15qextt4me1jxcusrexl02xqju87yn10ljw3qrkz46y35kr425b304696nhxtvvdbwypt6awj163mbdr1cjcso74dnkvt4svsphrboi12126uyt3a38ticwjajjrlvlootx7ccjvlzea3zqzx',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'shts3ekta3chg8rmidduju31q1i3ogvoir7hy70bm9hnyh8863b8h7vnwrapzvpgo2yc0qwpuvo',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 306897,
                alt: 'gbhs3vpymjzzm0kkxmqyc40vfifgreiyki0p87ijlyyvw58ve2llua5yr9ak419nuf6xhfpilh7ny2z149qxv8ysi384hpiwmvvk8q42cxztzaypblb2h60sxwf1sqtggmuky2vx8mdxppapzt82rrgnfh6jqjp7si9rhn9oiixl27tecse7lldnfey01ob0xo8ifn7m3p2jqelaqg0udpepjydnxxc2699fncw8vbrpji9huoe1wqwkx1vurv0',
                title: 'tv0vyvey2xu4838166ii3j4w9i2ij5zj7r7lh4ee36oh53alhf8z8gd0nbd3jx2yb20eiw1lw6l18azerze6sc71mjzkojsov9p1uvye9hvwv6yx4s0ftlqfwex8zilx4k25uxe79u05hqg8zpxgcjw9xah2axfo80r5q5zl4rx3u9ai4vnttugxigarsh1apadtuvucskvm4i6cx79k6cv2wc7qhzgfi33r2ni4zz6ocavjmjam6dsfrfbdjqs',
                description: 'Adipisci sint explicabo fuga ullam adipisci. Necessitatibus alias voluptatem accusamus consequatur et aut voluptatum dolorem. Id aut illo magni optio voluptate et voluptas quia. Ut soluta error fugiat accusamus. Eveniet et praesentium quis consequatur facere et perferendis voluptatem quo.',
                excerpt: 'At enim voluptatem dolore nostrum nisi perspiciatis aliquam. Voluptate consequatur harum deleniti in nostrum. Amet sed laborum et reprehenderit fuga quis nemo. Voluptatem tempora enim maiores excepturi omnis rerum sed et. Natus dolorem dolor. Itaque sit magnam est.',
                pathname: '3xd89my6orw0kye3g0fydixechm0jj9zhqsaih3wp0ele5xwff4yn2vak4o3p0r232b4lanwtlmbd9bek0agno2oveet492k3bicat0lx9xbgrquhakexoumricrx6m6nje39hl844w8r8uffvcqvyzftntiqbm3ijz4jshjcx0unmxx4gftxv5kpm0nxtlxf5i3wce294ycz4m29eadqn3xbua4h7321mg5347rpp5j4eb2gz7j8k09ymklq0plva3vc5ulylxy6yh8nznotvzfyjhrjlpnjd8552c20smv3gbbr1amlh2y83fkor7idzblb5i69w6zil128tpdlnla70wrsnlygcm4twr7j01tddbxw0uizlixx7wclqqqwbiwyx52romt6m800sha986ges8tft2um6w3utxrdb387bedzxwr9w75w2a4k8jsff0k03nwzbq7iz3t2zazoal6ab2n8jzmhj60tt8f3h28in10pnqg52vwrk6atuq8o48v5ip9bo9j01zufbsmycmmj2qnn01fzceur8v9kjr0pfp12c6ptfr4mks65lnam5cd1q0mzl9izvl21tar3sg3sefnnwm76cr5fx439qhnc4zx8fhszdbqqscghho1bzozcsm3s8ncbxaw3vd2d4qk2rp4fidfextjvyzqhvhdqwsu88twzy5v14gcancuonja9lp2wmzxb8ycyuvqdsyuws9i6ta48qtxts3vxarf6tdfk7qe5eio5d2x5165d9ltf5lswqu5rsnbfn0g72ielwj7umgebp8afvv37pe3dd00ujkfh2d3d0242tjrksbq22gr0ps2garevwdn0n70b0i1dxijcp0b79tzhxq7t7ekwz8zgrd2rbq8kqpuivakjuka7ct3fsgitggxt7ecptagrtte30wfm9gopdegjneuoe3gx3y297d08pd8d2bubr5iz5q7m4crbzexdh7yt4azxeebcyg79wu483o94qi3siabdfelxg7bq9jk',
                filename: 'n0fdlhyfm36q6j8n0dnawnte2bhabmk3bn3cu4inoqgf4f0h6tyfd4dij6ir63x5wptl7af8845wtbzmx4ht59gpic2sdrymo6js2kv93kya7hsmpxxw2rexpu2c3c77rezktqtrjb1e7cavmjfx1eas1c219zo1qmni9c6dxdps5a1y77zt4nxxxzf5gq49xwnbnx3phyfrd3udulp7xh0fx30bdyood51injex4x7hvlsvff93b734uh4p5g3',
                url: '6z7wx2z8e8xywq39okefgv41g22fewft8r8mxdw2tn7y7adsys44t9dowjyip4h7ur6a76jm3srbyv7yqnrhrh2lnvx2pzm2rmzzm6zv5alq0nl6is9jozvxgnnbmksnmc9uvuyxc6qubhu6e4tnmcufxifhwb2ge1xj1mb4dquiyk9b8g6iiqzjssn1fg5n12dizzqqk4a7gr8vp1tsfaq24a2n24fm73t13bg1f28a3v5b5kd6jim6of92j42l84ou92jsahob2paf3gwnfqwugpnv3cfzycrdyjsashu15ird7t4uzxyny6dhaprx6xa2zxiji4nm1y1jtk8meyp8rsc63oqaoopys7rij2zlh8aowwsg7saxd3krrq1eapn4wbubn00ig6oizzmcaxkqhxaa0aastqeqxpwicx8ybyzqowxgffwi22f3zmm3qgxqb9zeshmxlljwtlom6temhkgbm2mxzjb54kta9prer1gq86npgildrgoc1ydmnwt64reyxvqdmhlpkuj7j7v7ggd163y881y9su6f4vlv6jb1ntlimdhwdd9pfsscctmqo5qbhx875ciqx1i10ie4m0jm4l3innlzdznwcfvajypr5ukxtj17c00wnqco1tjgmtv8sa6qwrkm79tzkxg2n2pgsdfhe2qds0psb9uonhrj1zezbdh23n1ovobkrtov7k64rhcnirpw6o6dxkqma2cp12xfkmgee4j18pblfpjlxmj0l7dg06xfo6z1mwmfu3j9xruyfvfxig18ldnkh2hgi0n9hk9irwvmqxw5lrkos5nzk2vvgnd0jh0sk76hsnyg040e4cnfz0jq5buniczfclanmk8hhgqc0bzjon23548foa0t4hzvy8skmomk7lpj64tp4lr4uk88cvr1wumft3udymr3rcblqvqbn9zt7cqod73segieb0w6redhkq2gzya8p2s7t8ha26t0g1hlxw6a23xh6tf9z48ehngsxkv9q7mdztiw92nj',
                mime: 'b4f4k12dgpl9g7pxe5y5oab372rmr7cg7wxr3tjlzjzyjtu2bk',
                extension: '4lwndaybj2vhtvz4t5etpenrxizpkm22es8aeakopsxhaltnrn9',
                size: 9371621338,
                width: 564369,
                height: 988551,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: '3gf6hh18cvw8qxq0tnztf4m3gwv84lyedr7jb7bow502tr5b14purlnmxv8nozff2b0qotxc8znp1six5qwtki14avcuqsfnrveqf6xjia4yfk8wag9qwrndwp41t4a0rhwt6zfbb66yl2b3rqj617hm24xurj2qxq142qfb7i1bh95yzot1m6l0bbe99sv2lvrb28dabvju452zn91o38w4notgpoeg6e6wmex46f95so5mvd0lmf2asghl50z',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'dhf04twalzvj3rpnnwpwnezqnblwe1jinup49x6ldzstiz5jhucrh4nqwdjjkmvtqxb17mim6fa',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 332209,
                alt: 'dzpjsle300zb3t47mw3rbuo6a5kgrndko4pi7q5utmpzbje04hl8vepu4uzu1fl43ncmy4m74asyp0z1jxt6lz8y2cxk1qkmrk1n7ove8lb2ghzfld4enxf55ilozd24kpi2r9snzb3c30h2yprt36z8j5spli3t6l1vhdfvheds9hyfpnhek4lb71cj1t611uuz4ak6wb233jnm42jkqc9eflolrxwhpgjisccxqhlmuyuu5mld1jzfcud9ff7',
                title: '8r7lhtloy7qo8esx9w0sjtzyon2hgdhx36qz1vgdfnfikk2ws6bkmo50fct9hrdbysuw1i24kqogruonpzmvszakjtge44re1r42lxfhscg4bqzmeujjz86pxpvv0sklt3818lr9eezt3bdyjp770d00l5jn782sysnq5xk9b4imsowleh6bspxml6tzmkjxigc9v2rz247qcthgfsmt0iogawukcosambn2lwchvfhofld6um7ep8w6875x0av',
                description: 'Ut similique velit est quos et harum. Delectus quis expedita eos quod. Ratione iusto ut occaecati. Adipisci repellendus possimus molestiae sit.',
                excerpt: 'Eos rerum ut cumque necessitatibus totam nesciunt labore non. Aut nisi fugit velit dolor vitae deserunt consectetur quia. Et quo hic placeat iusto iure eum quisquam. Aliquid iusto aut dolores necessitatibus voluptatum. Quis blanditiis in id. Voluptatem quam quas magni in placeat quos impedit quasi.',
                pathname: 'bkojuf9kiahh7hn5tmi1k81oe3alah6lz5eh6hjqucj7r1yqd6dxlh2wj4ecv7kacjxxh91xpf2s3qu6y7xbcg2z3flh9zq6fo10h2ye4x44auoqwclwulkgj643zyld5wwz27r4dv3pypr0495n54ac4kamr5fei2gjfshau0v0ze9wpoe000waopqwuvt3k8fuermzpqt97sj0icnbavgpr86ed1zavt7jhh007d03ipaya2i3r3ho745919enj5owmngampj7jfrdj9tup0dgfsdsptfub0tr2wgaz2rw3ermm5gh69z2614p31vreptkqj0vme1ltnxqc3zusyrlobgnet8dkrdmuh2rjzn3qlwzzr1envrfvlvzbhttjf7p9fdznvl481ozsq0wnkdr3z63dzk8f8hny644ne9vytp33xh6108k7ls267w70uvoqliyrwe2jth9g3d2syxyzaiyre4k3lwxl7r6kpis1fk82tvclmhhn34ducf1a181qrjiz91c5xciqqrid1pivz1eqnzjg28rhxdg8bxi3snue013s8fxtpsfys5601fklqvrmjcapo1t0iqkftta6ig4bjngx3zud9iyfuyvaghn0wwbdz7gt6weoaxq8t8hrute7r48ykltbrabiyuhno5klk80odogubr4yhv9xq5x85u2eydkhokft19avlstmqiqhpy5eo7iu7o2tee80q7vhy4gop7np1pl75egg8nn5uchs47xkts1xq0cpr6b8upqwhoyc0bi3t5tyvrg7qvclqpx14rs3nfdyygupva7fr0zkidoaao0e26u9ak2uyguqaofese5go2opsj3gsevja4zsa6buup1kmfc9dwasckm5bkpt7acz994cx0eonyavnpgin2droy5z9bzuaa0vrab7ev10avohr0n5iegorcmuly7umm1o52i7pfmn3p8t0k1xk95q0qplkbr44qzpd0koyk7yh5uept604zlp5ok7jdr5qlzcrwr',
                filename: 'ghqi85asz6v2jb9bzypg56npc05g4smaoi4zo3ksrp7kseavodxp83e157g7rbsmqezn3moeqzm83qyvho1b7u0bvjcx5kcotigp9m952gpg2m45n3gaqo9mtgkc5ctmmx4srsbq9hqtthj6sjkfvzmrnnmsdzpjedc0j89lliedotg9ai3l07973zsb97h71rr1rw6wohfim8ooqmykfndtraoi9bg6adgyp8hd8t9kp7topba2oeghr9fiqzo',
                url: 'byiti5qsanwrrc1eo8r66knr8v191boh3yfocdxwzg5ndny4wrhmkm6sjoutoe1ep08kezzw1kiflbyuo57pxxy43n76pr4mttvaoabt3t61297d6rvojhqb5gxttx240wk9o60hkbzjzx3rbf4hcq3lrp6ulncvn53uwoglv2iptfvcpgt399rih417g9p85ivwq6pn26hh8zcqsi9xig01uflro9hegyx5kmuyqn7akkbpa53clc3ghil8x5kabeq4mxrdspz6apewwsx5u7m4yyph4uown3r8io0lod2h43dorxvedl1kaup9qb7rq8weequeq7cbep73fbz42t9xqjk8nz2w2luef91jaeucyy64qcz2jpfucm9jk41ywpzwps5agl0176i5xv30dsecdbdcy6o2muo70kt7nkxba0qc5cg9xeajpgwql7wffxsyrbm7gsxd75zq22chg97e2zt8itjfw51tw5hsdgtcpwyg3tja036vezvt95vkljcjwie9yoss53onwq2i6vkepqrmlw8jadiq91hyqyb6n45e14sdruf206fv9zunhmkx1fh5g1arfro5sl970xrzcbqoo3ffvl409c75g9yzi2za3ohbzgy8di8lwi7j7llxsgf94fxnmupd0pk9qyzt480543fvff6iyq9kc5f2kamhlwmts0ln2fidbp7iw8u8dae4riuqvvhoawqkgaosfnxob6rjsu4u70mh1dwkly1scav7zor7s29uccehiys25th3we8ykdgk96aeap3kgq3jpwr3k7dwknvzzqw6s44ly6dodtugpv52msy35eruw8zyjuljeg8wq67gq3fa13rg6xepr1owmw1o1xqkenno9uzfga701vdiv8ww874r7cnk9xpom5vqrwbah9xi6uripnqkw0ox48u2118br2qko96i4f7anl7sc59qxr3yn4crn8j6skavoa60607ba3ad76m305q3iccd8xgx61cmorb3h8d0w5o9b9mr',
                mime: 'ihw0s7demd1icj98c5kf5j241ouafefin0t4ftcpkwrvcbza3a',
                extension: 'cdrw4v6ghv4pq34dr2nxs9ee4j2p3zuh7ep1dmay6qlpsazmwf',
                size: 58846772715,
                width: 161124,
                height: 473927,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'z91lox1oospqx4tg031b3e3yg8cjgfd6vx0olohx1491dw1qrzuicbo3iah5edu40y6gawsslhsgxn4f0ybtjdd6wa766ivibx2e05oisjvmx09evxrdamaujfsjxsb67o6xy2zivfw5rldewddmsnwf32pk5p99un8tv2e9iyecbxy0340f5wevunc8450xk5x46n7kri7ziv29ho8vvqhykvqs9d5hlckomctx2ftk603mxe4pimheyf8b8bt',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'feyzs15ozp44dzs9vzp3xqwwr6ilhd3lir07pbu2awrrkkundnfyjv9dawb0f0d06qugo895ahj',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 488742,
                alt: 'mlkf7d36xx41qi314itnx3sqjoi2kvpijt26yqe0pc83kj30f0a2yeyih9dy5qkkz3ap7kn4lo62lna8lnf9d0oq0oaesx55hgahwk5zi0mb1dtyydy1osudo3zkbd8w7j71zhsx1ztlghpxtschbyf12rx4ff595q3ict3atll37asuyx0be39a7lpmcgkaeoqu33nxgvvybm7m8pjeleh2wmu0bmfmrixej62wcgi2oanlnwb1kpnd7iofix4',
                title: '4irua2et2xkif12jb6swirgcui533xbou2j491vwwknw7jh0rwyh79fhkv21qsl2fhwenz4g1ch70iy94loz59exk87h0bgaumj48s63gkfcre8ywtd5m1l4pp9cewnn8m21tyv8a9261ydyc9c0c85tkzpk6f2r0m27ibvyawe7hft3y06pjkpbietroicfnzqzqworguflno9v5qofkcyku8grtxf7wquz6op81wcdyz7kq462dg1ccr015bj',
                description: 'Et hic vero et magnam rerum vitae ipsum voluptas. Voluptatum omnis doloremque quaerat non soluta in sunt ratione. Quo esse est non.',
                excerpt: 'Vel molestias non expedita itaque et distinctio. Fugit nulla quia quis natus et. Autem ea enim illo odit eos et nihil perferendis accusantium. Dolor saepe voluptatum ut. Maiores aut id corporis. Qui excepturi cum corporis dignissimos beatae ab.',
                pathname: 'd9j4dyd1dy13aqq12o7tb8px953ddnpicrxjxbmo37gjdqklxzvke60zc7y29x0x3icx27mxo4wncesbw7salqyx15wpy9c7w8qq0luh7zu9p70ogyvsgaiju68u23ux3pv8apkqkzpnbaah42m7zw49kl4q1kvwy1djnaafkfdyw10mpen1p4c3fpl6r5ij6pol2k2wc74tqrw90hdgdyodeldr19i1lfyg87oz3zrshf2skb128ru3sg6uf2698yje9jsdg4ro5iba9vhkjl27yh3yur79avhdmkxquxpc31wt2i3nkfvb6rztsgeda4p4e674ttuk53irk69biwycot3h9ha4jwz9a5agn20yt7h73jsrwdhhewzdsr346td92gzim5amiazbv3nbu8p7tn2zg2foye2z5rbfb824uygfds00554w6rmhd7d8uazbt367wxqplhkqja0k2rmc5cokafyo41af117hvbh3ib1evlpre0cj1m1kzqtph4r39nidkn1ly0qtovpigluh6seybyf3p1gvoy3z7jiam88u1fqul2736z3c1k1slanilb1emk7je8mh9lv83xhdql96kp2jyo7cibx25adr570n919kookiqkug3me02wxxtdwz2saldt59pt2a5zk6oldw1gbs3ihy060wfqv8dmm4cbxsdysxi81wtgz677u91byc50osczqgpuevpfb4c6ytx0o06mvo5noix9ldulm7q1mqo1q041u8knrw90kghj18mx060gb2i40oqjamww0zqsmg6ee560no642azoi05zmkewyw5wibme8v5fv7v61zefd8n978pqq3b8coqkc6dunnuhn50ep79bonu2nwunwjc217tha68ufp03ekd20c0a7scbn9d12jpqc1wfpyslfba12k08vq1s3x2jj98mich86lx6nyjr3aemdj2273glytftun4jztwmfokw0ymomas6972emgwpvg25rkx89zkoz2s2tlszsz',
                filename: '2277qpf5q4j9r3owok6eyg8k4vu2f1l6ga1xc30623v6kguk1xcnutr76d7dgd2mkz8q7dfgha5zsby114bvkwuzt4n7zu4qkbt2gsgygt31ovdu9evbrl6403cxn1r3w9xae5433c00utq77bus3n8jl5tguhdvy2ufjsprr6trr12bx58xnfuvat8knmcmg6s6chpw56ffmbh6a52wn0r8q34sjd81wcbscz1auzju2o2sy3uostwrufnc05p',
                url: 'w81rzrbiwd7nmf8f8jsbebmqmy5p9b37y9tkaw25dcye16kikcqyy729zdb2ty7iovql9seq370ba6w5glf3fa27c7umo7exy4iphls0tok2tagady9zb4nqiv5u68hwow6m6hrwkrdh7oeu29bcc1czsmx9tfkoqe5b6h3ziplal5uxfu54bxyt3jrkly8gjktv829czy1kc98jni7g0fq02f8nexj5vo6lunvnobrnyrbdy4d39surq200iidj2g8mi0za04o1wuqr6d7teqmn3zfuln2p6z2lwtvy552k13fso4utnhjq7xj92munm9cprfs6w76xn77i306n98a490zgft5alnm4s6j41x27d9dfhhob2fvmo2at6lxu56se1bfqe08edefs2xgisz041ou48pn1xdlzkyrbwab82k37vnidznc3tp1eonqs8qipalnvytmrmw9eg8yobslvppled908a9bd1nc47o8x5vbfvavzruy8rlcxcqpzo7melgxflilcau3le8q74ypasudtbrcbw4nm5ke40gs63nkg1zcliqvgngrej83342eszbsai7y76rxazk95s463rgkhs0umfc0emn89bmv2sutay7c8uex5bmw5c93d4a9we9n6bdrg5inzhvkssnhq3bfxzgkzfco6dzpd33cd76yvobhu6d1395iedmnnmng3vrco1xuefjlb3lyj5kc5hjvq0ws11xfpyizywb4kqdlx4q5cm3kvthqfqo3y311yqg7ixjanz9q3mx49juyn2pot3jr5oikplbw6plb468rn540jz9xfxxx97svdegljcsoz4l1bg09ufi2kg7xp4hukc89ijwu912o2sbpscv2jgb4nbtqdb148pugzdnhantdapv3wkpju1ch0hzvkhmg9hhyxevdbfukwrdt9f76q1b02tu5fm94ug4mnjqg6bh76239x9hnov6louljyvpvug3fb6s7mhu72q37gms8spkcj48cz1s2mn5iy',
                mime: 'pnwzaxypfvj7w3s16ks37nvw81nm4c8oezhllfo7my4nu1zvba',
                extension: 'kirylaziurerndxe88y5964ewi4uaqnhs7vityldkw39424tlf',
                size: 6950712096,
                width: 4869209,
                height: 757317,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'cog9xenbsktvwuxabel6czdhi5c1xk8bjjtbb1f6xycerns0uc3dwihgugu84okhpv2ikmfiweg3cf57j9o1gitladfnn8yn39yviwvasmmv4v3kmzuhubapq7ben6vtdnpboade3g9wahlmwwukb3i241f2lzq60qrxp6bzmslg2v7eu17xwwb7iqqj84ipyliyi4xiuy89aozuawdfla59plfvgq7gv2tf9ykvzjeibltkutl800n4k8erjfe',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: '5do0w6v064thpcbmudmblq1j3glg8g9s7lu418zjybh6ml4aeyhn9duxjtyv96pf7civ4suhdzn',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 284625,
                alt: 'ln13mv4joauwewx4jov70b81ge1ghtp08gcp32an9f281iam890qoh8squ6skp3q3gwi8mfxrf6fujqihjwti92o0thher4mqyhjfkii4yndsmd4yiim6pu6kedp0u0b6l64zlaezu1po6mgi3aumx6h0m3g37tjey0ysgzyrhc1654915ad3fsar3k48kbiywporr5ibmmjhx81d5a5n3g92jo1gnex9cd4x72nxzucpmb7ropt19y1d5wsc0v',
                title: 'a14x3o3leqc6827hrinfjuymiva2l0j9pvgjuz687jb8832hnv5o6uilkbcibecplt5uqvh23pmk3p3p8oz7lidg36ouplbxoif47ec8kbnzyixe5f9y9ne3t0zekyhcrvayuox5kgrdqlvnwvfww9765ve554xj2zfk00bhzf9i8wc1gfdua50bp53e5d9bnsmgc5btiqhlsrb80yj9fjauuvtlxac1qx7nba2yhypntdaomyyk5cescp1y4c8',
                description: 'Rem deleniti dolor vel nobis ut alias iste exercitationem. Tempora aliquam quo quia eveniet. Aliquam eos asperiores nesciunt. Vel reprehenderit reiciendis voluptatum ex reiciendis qui.',
                excerpt: 'Eos ullam omnis. Rerum non quo ut aut dolores enim fuga tempore. Numquam quas magni iste adipisci nobis mollitia rerum aperiam.',
                pathname: 'li40y9m1frzz0nj40nl1vhg7az9a4o3gw6k6bdoz9xy687vp617a7yqr9jpuyvmfjpq7q7w8791d9845yx7vrnizh2o83u3jgoj4rq4ichyfe3qt27kz0wnk6rh254mh6l4arjr55mgq9sqnh78whqhy1pxe68iqo7vjrsnleu6pxn93ai498lxnqhwgc2zq7um37m8z7t0g77hzm5t82prv0omd58fj82gj233plrsy6y9uaovrkjdmi95ynqnefawxcc0lketn31xgg0cvo0y428c18dqnd72ohf7xwndf9l8bq763ev6puf5zay5tix96v4cks1bqlbw761il8kgn11y4hned6quu8a65fw3w298qrgibhyedtwyll73la0yrj646653vk4lkez4sj6u9ag83962ug28o14s2ud230zd7gh2tqmxdz03y6wuz93k2k9x8uybgdtnqr16t0af8etzi23qqnvtuod89hbxo8s9atdrbpveq3irg8u2mpuvzkfghuvek79mihx1kystsa61894z8hh1k5ig7moa1yr6c2ovcfby1vlbehr534bshjq65ggjigme669wyw2aib9ugnwuxml907yut345c7y4umejmjxqo5cbym5x6a4l0o5t0f5c8td1am1fvi3jyhlv7rg3axerrf6k87k4fcjdcgzxhldmnh31mceeb4o4nniyhd6jcojh66j9taccuo3ar1ioei0f094kbtubbka8xc77ob5m3jyhr4so65uhu126pg02kbdxgy147j37r8e60y8mjoag3c5ytrqcvdl4ocopx9ggo95y6pdw6s4o5x8vqmx4puo15fn9b8b5rq46hsksap927sgjoonawcwy0o6cuuup5ph7gm6ze2hf26ghmyyar0kme38jb9t829wydx7vlsiku5fgm6eldw0c7coecpgml0xm2x8283r2o6k69k9yrjkiyxcad6g2st2peju528cfugjkt19tdigqqn6gl3w58w32ibwup',
                filename: '138vo59heid47znp6gbby76gn32nfj4521g4dzcux891dyovx0yucwynfv7njb5z4hyeuwbkj8jefkv6zfk5glp25arce2s1szmivtjx7irgdkc9f3547wt7n9dmwfiauuvwg6vbhax213vuwlf6qu8kp2fg878pqfm8laa5h15irwcqs4b5guibfttpi7tjaoq73iwztjgnormuhnt92qowc4y175devkuskobaqpm72hpxfmwzdmmvbgpxz5n',
                url: 'xje4q63s4xfg6hw56c6jk00w4fdlaug33si671r9zob9kgg7alhm35xo37ypi1klbiqfv0z0ujvhmuy7esjkb6dgx41klvhp8riuk657xecru24e3opt57y8cxl8d4skr2ib9ehaqfmvf6is768e3g6txg1m4f6vd3cmha537i8a6px71fudmg11waj27rvcy08p6d6tromxxtzvh2822ku7on1uwgtp83xbsxf9f607ydya2rnowe1ucatbsumtsf2ohb428sjdyp383jmuhnxgkignqletsxcaabzdsqhufyppgnhd503d4ifuudibegnidre9m651e0l31gc6u5xvyovclzqy5770p0tbpy7jj7rpk7qfhb3iyy0cdjv1umr3sgykzo0vera8gg9vqnt01nm59r49c1v0irb1cyf1vtmtwq1vdfrxmk02um7d8r5tr7zhsmisz3tm7wrw4cb7q865x3zon8xhrxtiajigv8smcce840ssowxqosk2xtq253b99pz8zut184e4jise2g1aixosjhpi9299a234sg9gcs04dsqj7qf9idmnyvxor6kyfiwjl5k5ers7xfivcv2e27svmvs1zdyp1o7slks571kna8jvsc12266uerknz73fi9j45bxmvp79xi2ey0iq5ehavji305vv0hej2my8uerrikdbokzlyfg36y5c0illq60plzwu7db242ajuchhtg1b5d191b811vvr0q74r9ead1qmp7nn03weu8521rsj8m809zl24phtpr3kmnx197g46j9dkblb0s36q1f1qdrii5xyeikpj2l0qkkaoxvjl8fk05tbk8jo15bz4fxuvqbbgrcysc8zw8velx6o35awypty6n3ssfhnb4xz8gcgzz4pinpkw9va95o6kt6pvowicgi46lglqb33k1ty1z7dieuph0id219npc50bd6pzpm0ibbo7jc37o6rpd2d2hdmw6i995g8f0ussdbju6lgc2yqx6u3x5i9',
                mime: 'lxmpng3saeha6dsxx5m7fatb1adiz8iarsfcvg2y1sops4jh99',
                extension: '9xni2cblcyip9bhbpjxzgr0pi02ftuqnezfb24nqmxa6ehxdrs',
                size: 6877152496,
                width: 978699,
                height: 6943498,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'djzoohqetp46xgi5pp1jj0ekkao8r3clgucvdwehvp4t9kea6t3mlwj4ykwjegi74d6u8j9op4g4eere00njvsrtl5mzwhq1ka3lx5niy66mstn9yo1ni4ylhanb12g35d2ncno2r6oaogdyaxq1or3iptsjj54eli2cwz8256ujbkuygl4jj2r5bk10yiuk7jlpjavcr7f9btkxtslxolpyoxye5ojmx1hwbwqsc6c4ds12yxjagwhiasmjg4o',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'pa7bxl29ot01ijbdbrq5sx2zkuyuvnnj87786gz2rf461hb1ozkyrwfsdempx5s8xm43b7mynf4',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 817859,
                alt: '2gwerh7nwhwjritg78btq6f2103v9i86d3i72zlo03rdvjvb9w2lnm95tnd4b59jb4e07v1evbljvoyzlm9d42cshvsp13x7csgc62jj1euqm2isakcg350spg9a2f9n1xc8wu9qydsx6g4r5snxeng8afpekofwipb2f8wi49777d9gsc9ahrzbipee66s1xmu6mnobhx886cnhq5iug66mv8fyn11z6zqcyamcbryj10wlw2eifhox3ffaewv',
                title: 'ha50mtkmi393ndwltfmlddh2aowhpoyme1t8oaan8dl0zidr4xvgjv3opzp7cc4geaql55gjwqu0t1e2ufcq1w822zwhz6fhq9jjhg9jpthljccvt3xepdxgufayre8zyuvzymah1mox5tdh010tjgyzk1jhrewkb5iknmsk1z3l7tvzarqlgqscricrv84drl7jke4amrxcz78z8kiuvb7ty9jhe3y6lii1ubmu24ygchi6ep9pn68swq5ym9h',
                description: 'Accusamus reprehenderit aut similique qui corporis quod. Eos suscipit quod quia ratione. Eius et facilis. Ab ea ipsa et occaecati.',
                excerpt: 'Iure qui assumenda dicta molestiae sint ut molestias. Nisi sunt praesentium aut. Deleniti maiores omnis doloribus ut. Blanditiis dicta autem minima nam. Omnis excepturi voluptatem voluptas. Ipsum at id quia magnam vitae omnis recusandae recusandae dignissimos.',
                pathname: '1jwmi3afjb1y7y06x9n276nmm6yfxvh51e3w87euz6bj4gni970etv7z71tcekhd6zet3jz79t3ctrgiksxrin3kktoyllbnr4416x5jpq6d94uqpeyz06c266eeqac1t0mzvm6jk09b34eekhqg55wcgci4l0xds5qdqjj4jjnf8xqf6k6oikoa2osmvty1gd3m7zw37da7pcotcpmt1ah60fea7e8u6uq8py56xx95gmaw1kpxu78328tzz54c25jugshlty2ee7jin5pxnd27abt64brctfj3z8vv57hk7bsmd4gcdxiy690nwspcdatpl0aem2x4fivpeqgzl8fxgww78rhirqs0ml977p9c1p8piprvaegp5igdiib6007neogsed8wznn8z6hv2dpd6q2vpovqh8zzr7pevs2qqohu0j1n9e64fpjjmlxyysn7qvqjd3rujhv0r6u5cy6uf6xig8yn6sv0eht5bgkg5huuqdarbsb1hb47h5d88cqccbfloqo985vfwpl9yknf9gwhz9gmd33wwdol4fb9wn3vxs0809sigpz87jeqxm4lrvegnapt8xshzluxu3nd7vl0spicpjudzfpr9b1rroai9rc0j3y0w4ptyxb2d7pgk6quukedli8ngrh5ip0c0cpqu43jcxdte58llliifx9rcqbh5t4cicb7tgicjmuyrrc1vzge884pz6b6hpl7drkk5hnmpz2h0kxxvp87c4yp7x3vtcb16y7yzy75wxtjl59rvmn0qqns8za4oizgdqdt3ap0q1zgjrfd2ktgb3hyx54hoggflpmy61f5jeymtq0c3tbvwqr8s6slgx47kfdb149g0qcs13hyxeiajv8hs2dc9sc0fnny719k82m96nhlv9yy2gewuj3bdgqw7t9fing82ri3dd26liqwn8gnnxgg1no3snezea2yweon7l0e7jkrw32xhf942vrx3awqbihdz6njjmnsc6mk7a6h6jawji4sgfa304t6',
                filename: 'ohqf01udoux0332b7mc2mh4wqan6wjau9fgwfoaqy50vnpvnhlgz3km05a4izi77lnkugjvcz8ovrc5s9pko5gau343jrjm0wgkli7xdnxylxxypijzat9amxtupf0ja7thw0oabgkia3gwvtdv8a8q18sf5zuop9a6x8nwxebigo1hh82efva1wf1vlrlkhha553pzfw4dbc2axwyz1ikqeyq94veqa3bhp0mda9r29daswm2vxqgzglgv4iu4',
                url: 'kn1pamv5dfctms63k4z7iucsxb2t8ar1uvtz62efmdeej1hkpf50ea28v3ydp7q3ucn6np9jrxukjbqf82mum4789ddvy5l4kr3rx4h2710wik7v1cadusid3dya7akh062lya4rg2jk8e1jlb0c2bk2o43tbunz9pyoywcrtnitu9r1wet6zkljnmfoe4k4bxketiiodbv50yqdo2s5ju0f76g0eklsend0te7j6o4a0nwlfo37pp8htc55ofytm88zppkwf282ahlv9zjuhz901xs4lgnkvnjipz15380z4ggxud3w2nrt4qcs6hfzd2kktfzjrap7nmuw2nox0jxz8bj3ch6ud1fiiautxmts59szbwl3njla9ybb8mwo8oyombh3oi6ai2ed6o4vd9u5trpae1kjw97syj8u7e44tmuovxqka9v9l7n6vv6ni8axpaff53ugmnpeji5m8jv63p4av4lnstdj9zofjf1cb9pg37pakmbrmc6u535awwbomtru4k0gbc4y53v6zbzuszit737mj863ou5dpjdsrkigf4y597dyofoe2yzlemrs0pqog61at1vanzc6wvxki8ix5eg19h3qhh5xbpeacexg9azdogu0yg1ghgxbqmepzmgs98ijowo3uucda3zyp5t4apthd1l885ifnyohfqxm6tn4qzgm5kr46frw58hxb2h40lxtkfsgbldpxlj83iigj4x6djyroxdx1g12edugkbuxo2xux89hsgbjr17s10aw580c5jou1u1ggpzmxw0cpzpkrixgwxz4o0e35ty1tfzhqmcilaia0cy2uqaxsoedb9ezgoqpmey7ebbs11gy3ljymnujax657zj57k1456y7b8137nuddr9k17k7hsf6fgm66k1v5mpocfg39dtoxkmnf9uxsqvcei7tpgtg4dwo8us40awd4r8v2bxn78cgehfm9b53f5z9ntw1vmyn7qimp83azh67cc5ibin0djnvp8qkhsjpstz3',
                mime: '35e1qk0vxdvu2mz6qpwoxa7gp30v2fzdi4mk6oguwdvfh79m4r',
                extension: 'hzob23h92m0y6i7pgoputzt4eeoyt3wy3e38s91yj0rjulhx6q',
                size: 2059955134,
                width: 374046,
                height: 589171,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'vbyetyvmse8tbh0cubkp5pyxc6y0peo9pguohz582umoevemy8sn2ysga9j6n8pqdvikemb6na1u9b6qm9rs27670clamfswdqjjommvcdtbm14k1w0lilv5dn37nm949su90kts4xy5gw13qvplcx877iogsolydxutq4ptgqlh6jyweehsfxmd5zdix4047ne6ngcls5bg19r1lj9zw9kzgk9kxzitfogl54uzkod11em3bfx2p5avm88s06g0',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'ui7kxmnpxcw99g957f4v96o81rvkkdsx3g6e2kl44ygruumqsn28xulvl2oecvtwjxxoi0191pe',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 958971,
                alt: 'vc2yfc36il0fl88q054f5x2j0suetic1gzrkrcudr2kwnlov3bg19k55kxpc0ysh0kbt83g7bwg27imcoynq2um8xaokvgpa8vndz7qttxf2otzub7z6i0uvui6uol87d4u4oja51bt16nosoww9t2gahbgleyk0p2qv9lbkofommvqn2tmj0qnbqkqb6pvdjga056387f2ftgxsvkkw6wzllngu3xq8gz78ssem6rgcv208hrt7wkxb1ctbp9c',
                title: 'lmkk7b98b500gq2s4ys0zn9lad48ee7kyc6jm4rlp62vvceh1axummc3uy1lv1xtacyhra937hfs7rc5mzd24vel9xizn6m8jznp464p7p2j51tye79evhrv6fc1syh3c4d08xctcnlmrcv6dhd9ssi61r6hlx4plgibifjxw7909wksc8c1g5yvoatb73fry7g7u48k1skwcbuohj2tm1ifaeyw9yfvey26h730oclpds5yth03ocdq14mro1y',
                description: 'Impedit consequatur enim molestiae amet neque at repellendus eveniet est. Nihil qui est non vel. Voluptatibus vel atque illum voluptates hic distinctio et. Voluptatem sit officia voluptas.',
                excerpt: 'Sed ducimus magni facere. Eum atque eveniet ab et quod tempore eos. Et nesciunt quis quod deleniti saepe corrupti voluptatibus consectetur voluptate. Dolorum nisi aut sunt quasi. Voluptatem provident unde provident eos ut.',
                pathname: 'fr3t5wrj92u19vm394ezwnbo7wucxvjmdgh2qrarnmy7wtzcd5w67ngiaza90vo2wvwy6z2o3ks9kp19huab00yet0gejs450upi5sufh4tue7ykct3qmktqzonzys41pu4z3700sgeofwug1ql2mw6t0utlshfy0h5ccb9wstno6d0exxahwf4ddr4gwt1pky28o2gct43b4emv208u2gld1j0zo4wocxiqtndcu0t6fc3n6tvtnr2v41v8tyu2oyyrgma23tyyf9x207aa9omp3whapfewg3r22glya9iqk90opkio21xd8fjilsf1k1xezkh5zn3268r78npo15h8huv6j3xmiz8unfl0vhvg5nosv3vyi810q9bnmdc14wqg95gvf7p4v3iv4cqqpnitnj4n3lxigffs7cj3a2dlxx9qolif3vld8u0rwg1wqswrdwfwonb8jay6l7ftop8vp00whqn5whpd1tyesfk1aulbcggqsywi04ndln9cyyax2c4nn0gkjkk23fu40jm0nt0vptggz0uzdq1tzwwdy7vyz61wi8s5nx39w9i3sf17gw4zuftueow7r3ur3n75tt19zvzniwykfp9kp3qwne1u00u42od2u7njcnzsvg043hnpwkm9609hmh2t5tuftma9jnw195ywuyvnoivz7zb9gw4xk1x2zl44snxvu2v2vnz1fwnas93in19z6ixqke54ckxaq1o7eu1sm92cvkn6bvn0tvmjki5121u1r26xyi8s5ucflbku1bju6txr9lcedg79wm1l10sc58z26j2366da3h0y6ci80lxgeq3mrozj0yuv9hmf7kf3of6wnwf6kopjgm8uif41rnlhdxrb6m9ds4bhsr0lv0l2i4cv81arx2e4r9e5renb1y3sdjm2r3vw66q51pjbj0zkxuhodaov3bwt7nes699e80gbo91v58946ac489dpenxsgex4kenaji1qg7ey1fzdamlavh3jgg2kn3ogktii',
                filename: '5342d40mee91zv816g1052t94rt2es3itn9k5jptwf2pibiymip648rwmtf0r1jvr0jlmyd3u73ywuh9og9ey7wob56vawmec94bamdjfrhgwqsr5v0hhqm6rabzmieu8dmj58a61l1czj4u5xdq2l4jovo95qmtxall2o0nv9et97wfj3owms77kz8fru0x0xk970j91cuovibxby356sv43amr21023eseyklevuypfjwzieg2hmiy453kwe5',
                url: 'etpel4hb080wr29or34dfpyj3ygytxvl0dlew602yv53fcr2crpt8hkx9v4403agqu645h6gjimi0pvxgdn9un4j3fxockqq6xc6o45smaxvxkvesr7ljx79jt29rvhnnygqv221xe4v938h7hhx79oow5d4d033c711sl59ce2z6jlv46ezsxzdyay5t4r8w01gvmq7e0wyyu636kaw02b25kgi6sl92b93rikuuzprolcfgplqyi6u4rd8xw5neee4wjn0bhi43ier2lxncbnooa0jp076lkwyhj62464tesosjwu6xtj7njsw9p75gm10tsgcv0ciiukp1lphava1o2upjat3n7a03msrdupj4uzaxdyvddyfyav9h3ysvegw96c3xmqtj0tnath8zzjwm9vcm8rylpjr5zg9wcpl9cigoant4xrg6zt01cybbxarrfhxusnqlsc9ebm33ebdj18ox8x1to57hyu6b6gnnw1ka4vpwblxizrkpl4x7o40gcmdhiosdtzy5o2o1pzuluhhy17fa16qr06x4splbsi4ezkd5khizj3y5vo4veroptp1a7szpqguamx6mkihu4kw6cnxudzvdnb42v9hvae4c1pgj28wfj77wep5mudwi5i77088y0b5vu1pbhi1rb1o8mgfuyyd2169znuoxm6aufycu2ne79cmtumpr2rd2xgrwkjjwwf92hv6qpzwdgjyblvti34r1unmnc14nsmg0ef4l3mmmmkesbl625w13tyuxa6s4tm77u42pnxbq83j22lvw5ci3ttr4zpavmc7xok7teqbq0q6atgh7zc5l8luv8rsocvqryrpp53ean1iprv21yu7hoy0tx71dpj7qrk23dzgh2c3dq79eh5uq21pb6t1pio0r7qqfhhs6fzuxslywzpe3hc7ve29hwr4rjtdcikljer7mjmove5no3qkofay5dlky5d0th0vrxegkvs81r4w3icagcnown9szsm6jaftl8x228y8',
                mime: 'zwnn7exxcsvqn9e73cblxacn3ejno3d0ygp2fjlztg72u7qrso',
                extension: '8hg3clr8ctuoxjolx3hp8db124pyshgesyvlemuflasknssbm1',
                size: -9,
                width: 256103,
                height: 591761,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'd4ric1k2i9bpltwk3qncxo91woah6hcbd3nbzov5ld9ncc01qdnhz2ul56nhuhk6yp40jse4ks2lumfodkhn27me5ux6ms1dg5i6fxvbtq94ptsv47c97mq3693jetn3tkhgbyorg5wxzmaowcjxjosn54ies8ujirts2iekt9toautqy0jw6vurawlkcpkeymvmm2irdn59e5vgk8bnp5xyu5e6zqb3mkcmjltane8apoj3vpxujqmp4hck4yn',
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
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'doq1tnojj54nu991bf1dc8shxhhot6491rlucoc2e7pw6tdmjh8pxxjwlvju3sb8ha2f3t4vm0m',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 918877,
                alt: 's0rcodm6s7da8hv2kj7chrhdnerescft6x0btde2ozw8ns42ukb5xkldzqaktey8v3f9jsd3j5n5lh0mas3eut9qirw1nc243i6sc2f3ghmaatealsnxu0o14eu2w16zt2qg2p7aw01vy2tf39aphgfuto16029uas6tor6un7h4s99wpgnzyr3rmewvw2abrq04l35kx1e6rkyio2gitguxnztp9rh2m2jtwhxqfzx9botw6l9gdiy97ljgkyx',
                title: 'np1fwtbk3vn5djzxjnmo9u63sbe6mk8oe2ewlqorfp0xb1789cviaupwe4e7vnahl47xg2zzdyql7ig796yb1y1ekv3lrvv1ogys5rm6ape6dz3tpg1a09g1xn9jfizf3yd5wykdrr2h6xolh704devazf2zt73z9svoe3r2q52y7a6ca7h7p4aggs3augbcut73pj3lc3677ct6xs85anfq8duvxf99o1cd24m6dhquyo5upwb3ghh2nw5q04x',
                description: 'Exercitationem est delectus et facilis neque autem et. Quis omnis ipsum animi omnis magnam quia. Est beatae odio nisi iusto facilis.',
                excerpt: 'Et culpa eligendi natus eos. Inventore quo cumque. Quo est labore. Provident culpa quasi consequatur asperiores non iusto deserunt voluptas. Nisi quos vel et id excepturi fugit. Commodi aut soluta sed corrupti ipsum quia debitis nihil id.',
                pathname: '7hz9b05pq1d5r5q5sf1tbqs81ow4upgh6dl3y3dd7t9ida4anauk555big214882c0v8nd71cuz26xe1lk2u9vp5khot279908raore7vs5h8jo9rpyt36rabrwk8a9au2oqro2ikgvinz6ojgurlo3yu6mxdg68fwhlh1vucy236kfeutreef7gb09i5cg1u009cr4y5zwxdbj4tezxx8ly4mr9mgrep6v1f5jfdpc89ee8s3vz4kyy8jwqpg0iyfb2esvy8fpjx074titt26iwy65vzd75ql6neizgx5g9p9grhimaxk2dc3buyg4lfzgmbozuiniwvq9pp45qm7ngpeh45me4suxji7mypzr5grjx48aq9gv47nj3mzekqgd6vqwdew20zc49l2opokwwr8zonx7hecvvwtdfn2nd5aadb7up7ft1hylnfyvxj2alvoob9dlujpa3625q0xsg2gny7fjbkspc5rs1n6cfse8ytgc9bpq009pir5y83ck9mmd5meoaxb34vx1omem5fm8unyl2xfx6mmpbpgd3q49471yp6crj0sbwdkstkocmcg5tgoz88g4u0b1z6qjoy3zobmr8k4ji5osyz16jud9m1f1q42xkbawhd4ek9ywmjwqpethw9rhpiok5uw6l63wuu33p4lrebotxtrn83w5da2sayweq5rr5yyoz9oltk4rudx1dsikuyzf69ydlzpus9gzqa7rm4mtvljda10b0arnfyhoiikb972mgenu4hlfcn7orz4ulw5jp41j5u45fta0v6zzuoqa5l04l0lc1zqj9kngie20wxipx1yxu9vgc7u829heev8g1msivo9wwasrzpkxxwqax5atkoe1ul0ovr2ufmcmnsxyhvlibbgd3fueh9uwberu2lvudgzfoq444lncml5ixb5sq454avyn33duf0uo6flz5803dlmv5fvtsghlswndzxebcmpoom70vcr9v24yy7qknutgh5cu9yy80gzt97izi',
                filename: 'x8ybe77lwv4ec7f3gtw5eabwp4swccy5nt46l9sl6jzqj5svzbuse7kl18ku3kagnmkifa5wa91qngfpazd3yale1z6cv9rgp8y9o12eru4gqvaisgh9cztz59ont421nxxuseqjfdueci30ztq92o5k9e9tj9u5ah8ys2guf1h9waznhjg9cazdzp1j6ni1646ttcjmd4b3r2e38sfaru557ktnh0xth53hnrv5nnnkczuwakc4qx3kwhugcpw',
                url: 'pchrp15mh91vyjxeh832v8d1kt9hwmyiq3thexmqxujow6sj5tyavglraje8znl0b73jlnv3df1bbtutu6n1wu1rahn9k37jogmq10ait8k9xh4sziithtqpw3ub3rcq5eevdhi1eulwwpcqxyqhi5396hfbji5bmq6l8j2ewsl5x24zp97gzo09n4ud0d9vo8nuraam6ygz7np8wkyh23ixo84vvbk58n3n6pesrqzp5lpl82m2g37ulyuihxfzjtnpdkqayaywg75rztndktw6vdqq4nxvbu9mxwp3p847bfi9wz7awb83v6oo417xr6y265jkyfkft1l3u2y6uqbrbyntt9wl8f9twh2fqjdg11otad0m02sfnv5nl36b1x99lnuypofujw77zloun288b4avxsomyt4dtdpfpf467dmu80etlyhi5lqmz5aicwhc23lj39rt1gcnn4tyj470a7euqcw7nrfes40bh8um4fydsvxvimkqm45ymat9fjxnvu7cth9b5udsxfmg8pn1xkfbo186710gdq2uss5saonp2dpi2kf251zzb4oplrtmoi32jnm1sfqafn8dzk892huk8b1jdrox3h7l9hiu5oxnom9snj8kdrozew0gwwzyio2vnw57m67ozh1j2gbblmmdx2kn45knkdclad6nq06dphlihgsgx1kw4banzbwtrvzzji9a57k0vwab6qjmkzfvfqluox3s16j5l0l6zllp7x03t87db4smjin3d3lwjq1g3ofiqch764qzvfbh5bpzpf19x7nqrdjbc4tjcpp67stwdqfa89vrzui93vo25avi588whuja5yb755r3xx3dh5ily3wirquywhbeljnpho9poir8jexs43omp98ojbezwyv54x8y3jwjtmcge3vc96icqpjz7jkkgev43660ygm4cvsj7yrpupejlv7h2475k17hdv7oy4klb594i15o6piqvfqlze1rr0dw9siyo4fqrojkssswlnvw',
                mime: 'p458xl0d66r1cmxpg7oy94mzycmxemw8139zfpyq7zzo0r0j5z',
                extension: 'q2y4m4o6kc16b2wap8isrde9w444gq9ai92y7ypmqgf4ce4i3k',
                size: 5668969410,
                width: 318274,
                height: 302753,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'san0697si1iriwoqqqdva5kbfugtopr729naacbdfuopng0zc24odqdbfgn1ukcf50lcd1baxi37fm5tv568b5c8y1bz9l1fl5k3dmhdvvp7lxm8jegmw68osaavly94oot23zpa8iqn2owlrs0kdmz8vjuabljih7dvmnimc973us5adxloig1xh67jby7buycz27aw2of6r848grt2yaz0e23zl5n55h2ke1m25rtwla0s68hsfx46ufdq4on',
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
                        id: '57ed7c4e-6bbb-47a1-96e6-41d94283808c'
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
                        id: 'ed94f951-501c-4e49-af56-40258c458ba9'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ed94f951-501c-4e49-af56-40258c458ba9'));
    });

    test(`/REST:GET admin/attachment/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/d205a130-2f89-4cc4-8886-2b81c3d6d0f8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/attachment/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/ed94f951-501c-4e49-af56-40258c458ba9')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ed94f951-501c-4e49-af56-40258c458ba9'));
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
                
                id: '4d9d87d2-0ac8-4b22-b9c3-732432396edd',
                commonId: '802d4acb-b0f3-45d2-a848-ec167b8a6e6b',
                langId: '870ebda4-af1a-4271-9ecb-1f4664682706',
                attachableModel: '2wxn26wjk01r5kwsa9obw6li59xcbrg49mj5s86z8tci04fyidpziwon78cx75rc2nnu0w38y7f',
                attachableId: '7d75ae92-f2ea-4c87-96af-6d58af496f1f',
                familyId: '1ae5cc2e-2081-4c83-934e-34cb62bd9cdb',
                sort: 842708,
                alt: 'nwrl0x0mz8f2ew1ig22leei8b4o3ti0jtctytz2droyyv8ubu6rslbmxelj31r7agrjpl9h2a7uxdyjynw7081ijjd529ozpt1wuwd292l4vtts6y5t2o8efk6c8yigv6qygy2pqbitdj0mhnpgl8poq7slzc0cv8kw1vyttfip8sefdeft29w3b2dluvt7ph1qcotdcg7qq37ri8573owu2v21gig1w0oknleqzucl5mlv6d9oj3pg2qypejle',
                title: 'hi16um9ricupkba78ygx8j74ij6c6n5a33y93lvetj2e1zsqcy52ry6gbiizw0d30xemakogg24iqrn019yojdip84ho0e64ap57stzjb7fqjy06i94dq2be8nr4a3r670g0bh1zlimy1r49wy41njcw4affrxvkwhwl3cacx16vmfm6z5bq157q133sqy481dvrzk9rdmicffqsayqq6md3ozn6m29p6uiqgbdf7s41euv39b0fjq2dgwce4ym',
                description: 'Distinctio impedit et non perferendis repudiandae inventore. Eos nisi non. Qui at esse vel. Perspiciatis vel consectetur numquam pariatur ut eos et. Neque quibusdam sed ut enim assumenda. Error officia minima velit ipsum dolorum qui repudiandae qui.',
                excerpt: 'Eum voluptas et qui mollitia natus. Facilis omnis architecto quia recusandae quod nulla repellat amet est. Maxime est minus perspiciatis officiis illum inventore quaerat. Et voluptas rerum magnam rerum aut perferendis accusamus aut. Porro quia ut non ipsum saepe molestiae nihil quibusdam. Corporis ut odit et officiis et praesentium in.',
                pathname: 'otgruwdrli4pvfwojbtpn7gvd4bz517d90akt2qm6bb49u6uv9o6tu1bm0u5jl3knt3hn9e9zn2hoi7bgwn77t4agk7wk3ul4gi8v115gsxcnezic0k350ijtz28hc7zywyahf5srzljn6m4gnulwegjpzanzvypr68h7wy3j6jd5nxt1ldazisa19rxlgijjjalmzqttb1ud01h9aaqab72qxe3y8wq09uzzz4ejf21fg68pfkkpy3y6x0nty9hqi1ajiz46ccckehl3atd2jyxsryogctmf1he4nra1hzzxzgzmtrqltf72gq6pfmhmzssn2qne579keqx6cwccd1tbr2e4mzm6bkmw3xit37qkl3soc17on8ww446y1xq48wnjq59m652lxeb2jjwl96qfyu0i8mcey23fxmgdzbppr0t51m4vqpy8g67tc96m8renmk625d7rp58a01zsouzbmx00pxl7pxnl4m7hlxztd45tm7tjey2od2t6hkeiw0jo60u89n71o2gnhvbnp30nkio7iwxx8ewzoxe8mnp7ulid98hw21fqdw5yrzeve2aui7mu2kwx9bitcwkkanz54hz08lm2hdf4e1shh3deeyqe88d98sub16myx7zmiunddg28r61tf19j0krygrtporimebrqwre7zmywh9wf665gpdocqc49soqezkhrqhzxjkisi1qdgn87k4s08vr62algmyu0x1ho7o1lqvd26k67gu8qat9gtabllyo8cfty6j9jmhqtdvoflq0wsj0e3ctsa5ecaiovxohstmysz8ach68d7r19ihzemw2iresgu4vi52c6isti9wksskf63bnp4qyq0bdyoopfjuntj7t64bdus7gst2kyl2jshgy5acv7ukdxxragcihkrry7sqy2tpooh7zxtjk3aspr8vak7lfof0ul7072rkrehpd08da6l5grau0kxfpauztg0xdd75ys2wfk1tl4behwdrk99nds17oaybcqn8i',
                filename: 'ej6p1xj1frut4muw64goinz1a1zxa6b36mw1notjtobw6x0wxqf45w9lclx7ghsg060v9aiqrek09bistsf1asa1718qjugyrpvbxfd9pflaqcwldh51k55st8l9d54r9yl85k6v66ghs6q1nn327shthmy2jh3d9yyflhj26jcijx8jsziuz7483n5nj2ps7xvpn1hkrhpx2sqnpn14xisl7xk4dujcezj1udjuv7j1coc9s0hrsgn7ierexxy',
                url: '8zmmqmyfhdsg5efqfqvu4u3q09vig44fw4w3d7n90wkekvn9x796jtgnpitzy3ra49t3ygfbf0ompbgzsgh0rkm9brhb3y1r4pjd3hpksqn4bwn1rrqslt28h9ijgplpr1ckqs3ndjrsd1gkm8khvd7juxbszygkwibp9qcnhstmgemr826jengiizbdlqq7u4afyq9cladbua6heljw9ewt3jomfk0nmd652l9o6ayi3ow7nhx2thmprjunh4rao90utv1b83tpq8irspfbubktbgzrsmdnjpam8slhblt6izyg9tozbcbgn5263h0l0iewongm74tmttocsr4u47da2ycg5z3mk1ujo2ocjbglu2th9o1tpcnlm6yy6yx5bg6lsvc3i32qvds24p5yps8mzypr1t7wtxetg2cqppfpcfztoguzs81u6kkw4yeyry3bu9mr4ozdaagytfbktn3wexoif217ux7ywc1y630c8dcs04wijxfk8nprebsdgx7bahcwgn770t9jo996a4zro9rmmw9j6fiwy6pkcnt5jo5mepultq24wv9bzsroq10h0xez32nxbpwera5v8no7e44siagbpqzqvjh8pje230390rj4n8kik5s7obu18bnrk9fzkzbgsmxud0pbl5sdosm3fj2pf6vzkxnksmq7ld4pisrkbulfi1qrfukh1crz9dju36vpc2mtmenrecvpb6wgaezy9f1dnhgflmqhwblodih421jtej1upq7k182f6y3ddqucw9jofy448kyhtets1sclsvc0j2awrkoxv8lubq57ably2arhul3vb4kttchsbvlmzde6tq1nas5kpslngsrpj8zls1rtzj5jh7rvxwufzhx70iiplz3h641z6erhwdmzqbrz7mwf5lrhta264r0yxdnd9xm6ix4t9igqgnfshkiy04nkkrrq299ti4u45s05ec41c6md1mlraa4086yx9o6rdr6wuhshk5wmedaqx2qtsirkfsyj',
                mime: 'dcpj9wx03ji6b0cv6hto7j7ux3eg4om3kkbipfu58800ub2117',
                extension: 'cit7fs9920ceuagmlu9ba00q1ps0kug3o0mwvtvpjhc6qbii8s',
                size: 9636448156,
                width: 554979,
                height: 779291,
                libraryId: 'b44f6e6c-939a-4294-9063-f8ef7aee053d',
                libraryFilename: 'ei4lt0feokc8vef9ske5vumh1yrxr2mju8acl47hyivzcyaggdnk3urm16l3096i8plncwsivzrchhkpft3av96tga93i81xufyjqvvtqsx874mtlnmx9dt32nnbn3gbobrtyqmaqctx883tb452eewbsq23xkkr63up0gpjvhlj1rz1ic78fkqa4bpqd5d8rr55f0r0xgiwzylh8njo1zlk6oojtc2wni2pufbgs7vyma93irvrsmq7rlvpltw',
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
                
                id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                attachableModel: 'ue36jxl8l106t985bg8pe01cjz5r8o7wvmnch535omcxymca9faj4s9982kyezff691jpzvfx7t',
                attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                sort: 849302,
                alt: 'bukpzw0kftwapbyjls0c0bea61qkeu66rsk6h0zr2amyvpi2wqg113nvnt7apjpru1l5yhxssofdr2fe0ykjdvt9us7rcobmx9hprn9zqamwtesxrg0uedn6sbd4pzewcgmedjiu3b0drwpjoml81a33iuj922az2of9jufe8w3yo6s0iw4h3c8vfwd9wz7nnq5haerx445f1ceiaqhez08ln06sodl6715mg6q3tdvuk29g9ut48tz7u2xezd1',
                title: '3y2xv8r22ev9zeq4243e6kddz8xnahizesibtnfsja4z2fh5orfx5pengcjxuocw9h29h7u1vyas9aprq9jjgjbwdneav9vudnn1u9u2hsn0r0met60lnuu17hun0oloqhdadauifunnxox5ezn0ac615l7o9cbbioetujors6n21caq0nw4gts4ppury3zauivmbh15x28mgh9tiyysz7kchk5vdrk58dhrup1n0ymnmk99f7t3m4nup9rx74s',
                description: 'Et facilis aut fuga pariatur tenetur a. Ullam ut aperiam voluptatem sint. Atque quas architecto harum sequi omnis.',
                excerpt: 'Animi blanditiis et necessitatibus. Distinctio corporis quis unde possimus et. Nihil nobis aut cum ut.',
                pathname: 'g084o31v0fxdtar7909q6wpuf52222ky91bvk43d0zh2fguyvtjrn1im4aqs2k4536vepux0nxh1k47e76bd3pqo1277kkkrqj32j27ymm0rfxwtyrxc1n4mznzpbtd5l5ctaoihh21ujtasdopwy3g8h6qelumljyhdy91f6frwbe9sdb6d65dwyz90uz3jxcesjzb1fxb487fkpaiy8p0uh1xuu5wv5vu497f4n2qucleqs6d3816712q9n08if398m5ia1nk3do4hxt7mrltow6v3w52ob68e6wt0alsyqsh7farta4h80o9rnuk4l5bs1ih6jkq75pepx2t7zbulihybhuv62d8h37snvnp83yas71bli3zi7dahfo60xelklq7cpqv3mjzt7gl4xozw0s85353ddfh0hp7x780t7te3t57fg9tf41c87ou98h0hv2u34rc2lf6tz8i6ne17q224389f5lkdih66lnak2jmmfki9yv343ycbz8cjqweogafadghojpnzsxsmqooe0rhd4b53a0d9sjkn0q50zr81kl402hxcz4a8ipc05b2a5jhcvzc76ia5vm9v9698zoovwsuagbtrwtz76w4lsbdabh5r6h8m22ev61q0wdavzfxny5uzcgvpk8ieh8bh51aee9tw14pe223bq32qypagn5yatcl3jz8i0n2od5aeuf0bzexxg5o9fgmb9vdrwu6fcegofwwqjoq92xklt40uns6jyyrjh19ija6w04gq8u149yi4dcd5eg883r7quw4wi9hwe57s9go5r3vbcbuts92qft4k124o53ah8tnlcp1lrqop5tzq5i337jmsut7himu7x8igbjllda6pnljawspdq3294gwatcg71go7o9p938qlnpccqmt9re1tlg3c8kripmq25v08irneqavevgf44udjg9pp7p6gg8tvpag5zrb6fel2grvrfg80tspyt8qouxwlezkwow3wg3h9ln6rsz9krnemgcpe',
                filename: 'cq4frpy3as89k5q8w7x9zaofhud4fhcrbuldvyb74fd375tlrmmuelce479xmwgcd29a9s052os57w1i3v4rq9msfao83emf1om9tmng80vus6l9wut0q9ubeligp6due1n04h16znhyuysn55uxslzv0rx1nqlvs892taaxwxj9zbgu6v9uc7g2wkui0qmt75ydsl1ag6sfgjmwd536kw7t50fjjxea11n9ro1cmra7qx9cmrpo5sbf7nfpvz9',
                url: 'c5qk4vx4klwhorqlo02d6ykiwthhfwcsi0bw7r9rc6dadtf4nh2rntwqybci9qan2vemtll6hf97k4s5bbv8efzgwofgys80n6mdg89gr6lpjhbonaohnxhxr7700kug5plrl3rvg5ax7mn9xtbse2m90omq4vwb98mrhgd74ypyac6htqv12dblu44k3qxcwjq5o09dgnnj8f4de46djgkffqf40gb9785oby0s4gh0ypehy8ey40zrfahrldagtqi6h51ciqiohtid8ze7h6dpwujpr3cycapcl6bg63b7ilgbljxo8mkzfsgg0q2ze855sazcxugbtcwiqj3yz7svbcsrpnalchcva5cji76jj35cddxn1f3ikxv2xvnznr23tojxzk14th6xx9yen6u1k54wpsj4i7evbmpne7mc4s04ik611hbo5elazvphjm7vvx0m511e0f0ajykh56aembe0k5cmvkjkmmrqq76ulq0e5cyli0uk8bprb62qk97fxpxc0ii0s5hc9jutjfsu5ai2m3dkjtsikofn638k1zb7pdj2rhk8vcu51jndwsdhbiy8dhnh3081e5fp6rdbq7dcm5fe3sg40gat6wsyxkfdbttawrztw098052dz4sewl5c023d0jcvio0w6dafe92thw49wjuvi46u5bflwajkr7gx1oxeqjbkgloj7st2rx2v9o3plwr1hen97tjltilxqw9oilcwxt02wx14rle1rpsup534xmzgy8hjmtjbod5vp8ifqpjvbvvogbdesd2ij001hfh05q7m1vvy0bt50yqmrgzaboj38o7qbdiwhvcc9ljqbdldefw1rnu6193li0338y94uk27p1dmn4qywv21o8c5gsrh74qfefyn8tzuasqasrz9znxw4pe2v3x9cx28je8fvvnv7zi8x7i6vp3jt062pcrxugitqd65wpoblamfhlv18dqxvpbj0kodlukako645lvxupmp8lbl6uredvse4f1ttgno',
                mime: 'y8xaypp7fb5qly9uoh4mlw252b597xa63h12djlkv6ynpa8h50',
                extension: 'gxk76kynflcmihk58g3nxuwajo4ghmtbed8dmwwndm29vzzorz',
                size: 2980740732,
                width: 352670,
                height: 665291,
                libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                libraryFilename: 'h3m6dsn1qcwl3qiyk9pvzlfhlm3qphkzxbg6ozz4rbfu7cybhmrxv956jyj1f9jpb88aqe18l6atdq8dwdra6vei7znpjyujngy5vntkkgfc995w6vwdswrd1sqe63r5ka0bydvrhqqh9kar3sexthw6ew7zzjgd53ezfiu197kmyj55aid5a1gwxsllnpvfpsw9jlwdpmb0271iek1mdl92nw65tew3sk0rw41cwigvqcqccq8mhrqpcdtv062',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ed94f951-501c-4e49-af56-40258c458ba9'));
    });

    test(`/REST:DELETE admin/attachment/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/25260b73-1550-4338-bc18-2abd52424308')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/ed94f951-501c-4e49-af56-40258c458ba9')
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
                            libraryId
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
                            libraryId
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'bae7923d-6015-47c9-8697-14c6f722e656',
                        commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                        langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                        attachableModel: '7ypmtzrekxbgl6s3f4opdxaq3j3vgo7lz26n87culm53e5drs7i86n5w2it69ca9sdo9fr2pfuq',
                        attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                        familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                        sort: 785940,
                        alt: 'alhnpcoew6nxkdyfrjsdv6cdh0xx0jugviinfyetey617i04mgph4n2vtdxgmba0gl9m7ymasmrdgbd0omv3hnibb5u4jj55ees2kpyoqp36kqzd0qdfi9drot0egynde8u5m8fhkehktetcolnawzvk2j0cxcuk6zv1n4jkh4hgt7dryc4zymp8onwy9qy0irznuyhk0o33iadcjy36yeixuby9h83msuiqlke3ni5udlhm3euenbqftqch85v',
                        title: 'tpc4p155kcvy6lkwjwisfwku753j3lraw0gy3m3y58utaqxi8xizu3os965ckrqzt1f6qhkq12i8hz4w9awaqgtb2gqw3lm4p3cog9n3jmxlnhciy3qbyreaajprt8h2azrq92kmgag3q0u2ajfotp078no2yozwf1d3exvip7r0norpz2l74iyzkog4c0gu4aaziv8bjlsdgrvkc57n8kmclylixmtkkcm687sp1btg50i3qr9l3nd7y7b4ikq',
                        description: 'Distinctio sit voluptatem dolores libero velit. Est quis eum eveniet minus a laboriosam id. Incidunt tenetur reprehenderit similique numquam repudiandae porro qui. Beatae ipsam occaecati fugit alias aut nobis vel ea. Sit est provident odit labore quidem assumenda ducimus dolores.',
                        excerpt: 'Sunt soluta eum aut id aut. Labore non voluptatem et officia sunt nisi maxime sed nulla. Aliquam ut et quam fugiat enim a doloremque cum amet.',
                        pathname: 'lpra4rh9xcitptq48zt0o315l9swtdnkpasjov4juzxp9hvu0tzo3qeb3ogfvwztfeuzlnn0myeuvdm5i83x8lawxlln4usn5b6kz8yn22hgtv1ty4vswyb28n6187rdtwprg0npopuf0f9idixjlemspoc0qw8blfbxgy110v89j411lgn1eowevevctw7pcja3kczt39z5n792dk7toeddm44o2gzjnxe3tkx3d4vro50cic5i4i3qrk0alu7zld9zqsblkzrp8694a4xwirb143f9p8qffb1kr3bsk6job1jmcw1qa4rhbomo4jwsanatcqiy6aibd9ifmk2zn4q651kqbdc0a6odixr9kz5filv3qfq0tefe3jsb6i39ser51rpzlppkfjamlz87329p2ip5exu8md6aaajvqfjbt2f692unrgqpfczj785mcf024kyjrsf1ha46z6a9hj22f7iovan2vjhofomze1od9f3z5mss495v8kl8gzrn526msg7geuyfezl922vf2gwjpffxa4piwj55qz9kg6ko1mu20m5njzjkxd2p3et45d1r224azp4ww0u0z13ug26vvz4wnphw1k5eb35l7o3entr67xr3pejam4eb54g7155acxx5tfety9oz5f2aq3z2sjokpcb16ki9bc20r5kelpcooetxyoamdbrbltgjs61kwgkp8yv7h5s9bi5ywhaz26h10khiiegttk8wewz813tuq9jeqxx1pb33s0kbthvyfi8qgm2sxhe1ujpqkfbp5dgq738luib9uvi1r7i6f97pj77yhpmrltonizo7g52dl1nnfr7av1rir4yu6yaena2y6xq14qfm5e7ijck722ujeodkckz9q6rkd7glhwuhosjtyh2wdmtku93h09vjx6k1btxvjnxltl1b9v1x09oi2qows8hyeg7z07247tmy3e8ppk88644lrgqfpujskkzy4ymk40xl5vlwncbhazv1a68ikkqq6ejnr0lk',
                        filename: 'kfm5fa1c993lbs6etwe1xf1yypa2mmeku2qd5hd12pu487kypkmlvvp31spr9wsh9krt94y2fhsfmmwdhl21jtw3lay23ws704w2yxnmpum0szarpy921thp4t0cvfd1vnf769017tsdaxmefj65z06ekbjokk9a30m67hd5zabbg4svvr4rbluj2o9jo0ytgp8a1tj3wdwr0jkk3sghm1n0zpdhz1jmo13nzwm2tjtc45s34d7z0p7a7004ir8',
                        url: 'ray84a54qm0ibgp1j69wurkhmrvrl6wwufz08pfkiv8gf7l9rwmav2f5wrvboum06xy98pfoub49yvf0m6v9134wng2w760s9cfror7kjct6xyqui660efdusqete8orhoqyf770edkx2hlp3v43h9kecncwduf9rsk26qi511au3tj7z6m9t507gd4q8nolhmouin04e5elr3pes4mpc8hv80amg2aks93qxgb2tt48uq868j5onulkk5tqdiv89ssga024d7o0mqiu4h80uxtmrqmny59f5jx99ak4xpo6incfpp67lrqugtih8vyy0uq4zh12ehipqped9w7jt6q6nctt7pqpm30xfaeua3l603mn00cuv0eunfarv25akvtwv2nwq8g1lfrqqjvgjgz51x35ztnq6g4q6qnhmvyqwdoq6gt30pvovvnwri5107tvhaegfij6tzlzto7rx8zodfn2f37lfaucbkgvdyxy09bjm7qkg83vdxsvdqhvyny4m6z5zhuddhtgkxm59l2fnb1uo88uijjk46g5o0w5l8hjyhb68jzy31718jfj1zz0hz7cjwnd2dcsub28uj20lquxjpura1jsky5uasrzq5g2wcku9j0emgjyhb04nerr8p83rnfc6fyox9gcutuxge413lmhf8lo9zsziuudnzium9hcwaaeduto29wikuuv84mu0zdsj0qofgrwflme0xcgsftor7s5xk2eo3xmbqt7grregessqvccw0k26r9bdv29x5tpxwcxqmm0c8zjmy72vg2p1ak2v3sbvl2jaixoomzn9au1qz7gfnu11efvrdohbok6uloytt1hg5ve4zvqw3prb9m23apwhuxq20ig5tb0gpm7p4pxe9upesgznp5bz3j81hiemsx2gy3y3y6ztjq027gkxhzfoanipesq5r31belp4q6q42ityl7xo8u6iapdiags27qb1akwn3m1n0u3h52i508qk5rk34r5dp2do4b7d3jx75w0',
                        mime: 'tiw5ani9zc1kc0qpjl2pbal7wxrcvllbv8g2p6v2hsr4jp166z',
                        extension: '9j55llih1jtzhvor6yc2kh20fxcslhvr9do8zrpowcahq68c8x',
                        size: 6240920504,
                        width: 928240,
                        height: 273250,
                        libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                        libraryFilename: 'bf7e5x8r6z1gqb1kphtwy5rgm9hx3j95c7cdog9s0d0wqeiwzl1if347zp0z3x52jjd58wslosubbd71sqqyn2zfh3k49jtxsppmla2gmyha6puurvv492v3u1g2b910hc6jf9e3oaiaa4wkxyb25zgboj299j79mwc70zhxs9ygztvslplmb2pilgxvm2hujc8aivjusnmg15kg31x0imb6va8z3iu3xecufnmdtp60n37r3s1s14mc4mpkcl7',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachment).toHaveProperty('id', 'bae7923d-6015-47c9-8697-14c6f722e656');
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
                            libraryId
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
                            id: '9fb32819-78ae-4b36-9e9f-424431fcdfc7'
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
                            libraryId
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
                            id: 'ed94f951-501c-4e49-af56-40258c458ba9'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachment.id).toStrictEqual('ed94f951-501c-4e49-af56-40258c458ba9');
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
                            libraryId
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'b16789ed-7f88-4144-a7b0-a13efff34fc3'
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
                            libraryId
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ed94f951-501c-4e49-af56-40258c458ba9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentById.id).toStrictEqual('ed94f951-501c-4e49-af56-40258c458ba9');
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
                            libraryId
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
                            libraryId
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'ed86f17a-18c5-4a33-85fa-15d4b5fcad89',
                        commonId: '8ca6db12-e04c-44fa-bdee-3881a1215c4d',
                        langId: '04b318e1-028e-4c0b-a5ce-6ab19add612f',
                        attachableModel: 'uiuensnx5cm0hrqrz4ddgz66i5hzrwt9hfkptm3xnop4jfvrvffoakr13qphooxk55842zcxjht',
                        attachableId: 'a8936e21-0536-4848-b3ec-89cf112b2fa0',
                        familyId: '05203fb0-9b63-4975-af7e-bb9cecd3b3d6',
                        sort: 431563,
                        alt: '62n602mcmujseu00pnydywnz8e72belj4yd2rgaw05xh3eygxyrrr65wo1gasetgev0tr3lz2w4byz1zsq232swlvxjoioxr531p4518eyu20bsvatqnf0obyudm5el9qoeznli3s2cel1rai130qsfp5slovvd3y66v47yxreqlafcyf6iq92rv818pfgtc4p6t9y2ygvttpnwci1ib5uj05gswa25jftjyfpait07jnwav7ura402pj0eqhw3',
                        title: 'j8cpok2osb2n2m60f42ygz91826ng28769axl2ej3j5mfarwvixc5uduyoqfdb0rz3y8oqttppgaic3cugxn3f0ad2gk7i3ylh9b2r9ltcsfq5scmxd0ofmxx470v8wbsvyjmim3ro8m9k5q8mxt6vdexf0k013yyzkx9ne4iv2exasb6rtxrpu4t9jp6c92m6x37bm21uvw9076ema9sg7yagp5e5kk872u2nwm2v2ft77reslbivsiowppbx5',
                        description: 'Laborum temporibus dolor quo. Corrupti nulla enim velit totam et fugiat aut debitis. Quisquam aut quibusdam quia consequatur quia dignissimos. Ut quisquam sint praesentium. Dolore odio doloribus rem aut aut.',
                        excerpt: 'Ea vel rerum ut. Delectus architecto quis velit dolor ipsa eius numquam soluta magni. Corrupti placeat consectetur eum porro et culpa. Eum quis animi voluptate consequatur neque voluptatem est. Sapiente pariatur excepturi ea aut et quos repellat et.',
                        pathname: 'uitrdvecon8w2wlgjyxewfy4ox1la5m19r4kqroro6m3xga1ha3nx5vrva52itzgyw5cpo52z63jq1xc59ul4l8vj2f3989tjzjx3o2gvhr7fhrzn3m5tycewh6hzgsk0r1vh139iv5esq2o8mx0jf22uwmxiekqmq9zfg5zzeskhnv6v6ifgcowcagxtmrrwllkbddklhwd2p36zbad9v3my8vldahtsf2geoayfwgwfn6vckl7we2x4iipq7c256pwsop4rm1l3b99v2gynjbps8f8zob24627ds743jhyl69tiuf4z9j5srkrpz31ujobvjxr3qpxwjv90ym4be6jzp36nt7jiim0by1br6x9wfiaapzkfeysae9zclbh629qb9m57vad1riw3b742nksmqf5u3hvgvq7gbgnytkxa6v40zos2nmv4fsti1mkyubpvvcaj9yy8thyb2s9q7sxugmpqr0m91nzoe7jbh9bt93nn6e9ae1z1kwi5av118tfmr3yyj1ydqyvpdswdc5hxscfuje1nfp2o6uvvkq490ulo6nby469mtuhzv3lwg6qjalge1fqog4n786a7smj2akh9r5yy0k1ewsjvf9lioqpo36u879zq1c19zbo5rsh1wzx1j9aq03zqvphnege7zogk34s49rorh1a64j5c906iuind89e2w83uoxvf8usy67vfrmt95x3ybbhxc4cv9sot72z1nnboojlsmd7s2vkn7ojzwztli4dkanjwx9ziqgjs3xhpvyxi61b42bsnmwe09yliyubh6q4uswpqa3t50v3gvi0f1jj2lwo6w4ycb8iaua8zge5vhk5116akhprvyyeegl7a2rnfh104eakmo6z3otshht2aznjl2x6pxsb22ryylsn4i3fs6nkn2o2mims1mpb554ixpsgmd2yr73u7tmjs63etdrdbuqhczxrtcxo29vg06jleg9rnisxjtvbe6uae9uyh8lqa7vgybhomx7lntv8ic35',
                        filename: 'igzfb7z9hyolm57xf8r7i3beh9y8ucc80rq84719pgw4x5gz9234jfagoye3jwqxni22wrb3wj98xuluno24k4y8clixn5b306v3i4r7t92pccjbxyk3bqhaf43wzp51rd1fh4f9on4ed1i269venantnyx6u6bbtjm70l5i1dddfe6oy2013zwr8ftv5z03pdx4n4tkg48dh5o08akffnnrubrklda1ezko2sqll6reweh3swys01akwrmttpl',
                        url: 'txklhxp397oqgtvwcyiglkj295l68kcd6zurt9vhscii9t6f7uep8h3b12th5knolzrbcjc41nhwuuj7qnx86tgwj6uqwq903ulxxf4a1ob6j35nsn4nmkkmudh9saz27il8qr3jijccac181dwnp1m36kx8c2ct9luw18y3ptk0q5bsz9jd0ondgjh1n223subkst31i5r7l10y3t0fi3b37q70flg49j6t2wscbo8xqfs1r7zo53l1f93751lw4x7e7jl8cnla4y6v2mwzwk00c83jh08hcbqfgb0qqsp94sxkm5hxaotehadoflu81os89biay06jm2frpryd3grr3nrfx0na7hcwxiu5saxks7if4u740g952r0c8oxlvd7lm24auo4ixm1b5e9hj0qdsy19fgxqma64tp0v3gqivso9lw1nq113dvq961pxr9yonbpc5x697prhr8ih2zvygcxaw3x3obnw5yqqf9x6faw0sc4gyuw7f4vt393w0atahjqljrv3n4i3bi8xlc9qk93idwqp7jx3op5motu48s8w695gdbes92wd34qw4ar98lvhhb4yhy973jw77j4xo348qozopp9kxesx5agexw8jau6aa76527pchkilky35qkpym84j3mf3fxuw9wpk7eijn72ppdd4at035ugr5pv0ry2j74l4pupopsklsmabt623wiby6dmnxszyq8111cyyguamlan1nkaerx70iu63cesycfsrgkgaqvfybjitkaaxmxlfyxgeuwhncb8mag6c9zx3k4vxw3c2fzairxs4cm3ooqacxw3kjs7sr4vj511otqycvupx8qnd6x3rw8bmrcl6ytnjptfj924i8drbsrsp591jlvcl3vabccg9k6160toodrx46oboxr9gkzxo04rwpe7rvwme3jn5w9y6a8o5l9a0kltqlp84en1x0rxis566m1w0q2w91hhwnl2zy44hbtxw374poxrcs0grmquo9vwtr9oma3gd',
                        mime: 'otn3psabtruny41qrb6lok5bdiu5yvv3c7uz848emxpf6nbqyp',
                        extension: '97ua29fa6c5uzltzdkluyti36rw4ef4qt38tjp6gut8s79hpn2',
                        size: 3478257233,
                        width: 919367,
                        height: 934199,
                        libraryId: '7e886a9b-d521-49da-859d-701a5297df5e',
                        libraryFilename: 'g73y2g5or2dx29flvvda06055aldmv798mt8ue4tua5b23eygferlsaxdqdfpmzwc6h2e5b5jfc0mliwutwuldlqo4ndxij3gr6ao4s6dbg75namq8wk3raitx2bp9urvtwxfafbpc3xdxt0rlxnov162z6n2gnjvfwv1emsghf7j5xl8cho0ftce2r8xxtbod7wxjolsxf46ubdzy4lmw9i64sq2u9u3xl52abm2x9k0htb5o3agnzgdp8h966',
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
                            libraryId
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'ed94f951-501c-4e49-af56-40258c458ba9',
                        commonId: '2034fbd2-d38c-48c8-a703-debe306a9f70',
                        langId: 'b9f42496-6bfd-47db-be64-a1bddcc03d1d',
                        attachableModel: 't5f0rq83bac63pynrwuj399i799m7mzpe5o93c4tb77yktimvwth7h7snumb4gjtvbtsa29p39t',
                        attachableId: '3f969a11-e72d-4e78-b2df-014cfd51d7a0',
                        familyId: '44f9d758-3fd4-4eb7-9be9-b699eaaef6a3',
                        sort: 867572,
                        alt: 'pomvc70bjy5779lafiuq1h3p1981ykh9eg8j3ufdqxvimuxx5a27cvwlglf430szafuuhf7lwaglu49me7uio38id7x7diqggumhvjnn3zeigwmpxn8f5ojkq2ix4dk92cu7yjuwu7yemxvzki29b835ebj4c50jrevj7cxzoy2kdl1mwvo6k6bacmub9cm56ajh7y5sep3df2i4wfaqcrjkvds03coyq4ayyyif96he3hqqnidyuv5ibm0eqxf',
                        title: '0qh1lhszwovop4yck702ilw5q80m1y5xdd1y0l6vjt82dj42x3rmpoc4fdeffqvpn1o1m2skeazwxitdc6vmjn65ucouvpr4dm0qeu8hoefeud4uv730ohe9omey1zv23yg6efbbxuss4cewkbm0z8tcz68z4nw45lgckuflrs5llogwxn7safynpebw4rzoitsn9d3du8elk8qsaq3kw1f7nx1bczbk9bsft7dcww82n1a3epm19npq5grsk4k',
                        description: 'Eum et dolor corporis qui dolor. Aspernatur quia repellat quibusdam pariatur sint ipsam necessitatibus explicabo. Maiores consectetur nesciunt repellendus beatae ut. Tempore nulla atque. Alias reiciendis est facilis porro explicabo quis et. Qui quam distinctio inventore culpa omnis.',
                        excerpt: 'Sit qui ut animi necessitatibus sed. In quos molestias ut voluptatem porro nihil. Eum itaque quidem perferendis quaerat sapiente asperiores libero ea laudantium. Sint labore rerum sapiente non voluptas sed et dolores magni. Sed recusandae illum. Est quia ipsum tenetur cupiditate.',
                        pathname: '0l2wbfi2uhe0ef1izjjv3j9jtyfa0qhdn23j2tuvvr6tbz9itfai4bpyv04yg7yj287pkd4zuvh90zuldhusp0pehjuycp5twl95z4oo2w3mspsj3vwykn2yt23ldwm4vim5php22z2xy64k71ie9lbl3vymbd4vqof8oso1l0iqq76uk0p5fcg0u6g5jsr6w09wvlyrxy61d2y979r8dktw8o2qhrw206cblrtl3g1kgsjz26aylwh6dphe2n2o440wgqatkxpbx3gbjzbuvv0527rmr0zkupvq27sarw78zt99mtie92j0185klnp8lhahddi5jimg2k20wxv5741lpsu41ik46bzv5nj81x9d4ilu2mo2yxwh1a957x8w0abjqk81532wbaio3ds5x8oicagp7u67ahu2wnhey0wfrfihjiswwgxpt3wf3kf692xjfqi9cda2bmj2d46j30tejqe3midaj2vyg6xglby71p4a3iwqr42tyv1pmd206tkaknyelk8w8ntt05foz5tq35qbrwa0f2189syq0qdywlytpc2pnuj2lo2en1cr25dql9x691bezjl18iky78997x7kh4l97sjaz8kyertkvkcfnnkn9lpiopyjrg14hxgkujiy89zot0n1vejs0m0ng291k9n4i7h3gyqt2rdx5qpdijh09q593v3c9va94qnbgktprctwhrsz4e7wfczllr2820ar9rbnl6zs4oqavzkv7id3ve1ol4jjmja84srzet1q53iyr67ri9g635i1oa6edt6xkbqo46m8slt9w4fqsdk0kr9cr94cpaco312owhdn9tgwgofgigs5jmtwcwpgpnyypn4wzvi19mdjqg4kwg5l1391xdxif0ly0k58y1li4j4vvz3qwbc627aael4gslgszi2la0qhuazawiyvdlwb59rft7t6n7bk8xbm89y3wlm1p39g0u5swwk2dznwkwgututm18h96d2ibzc7o9ncbph108myv6nd',
                        filename: 'eo8qnza6xda6x2owxjta9log9m2mzn3handscs9tiqoh7sgvnjsbem7oe7v44a4qichwv0gjh99ia2unund6tqssvpvs7tt3d3i01vzyt58hzro8jc7va4lnseql31lsi8lrppzb5iyzuodc1sy369hil2l8wcpdu5u93g018n4o1rublc83v27jscdn08l9u3ll29uoz6vugpmf1j6x9wiz0fq82i2kk81n7994bqrziwdbopg5vbzz3bh75ll',
                        url: 'zkgx8duyhzrjslvc0m2oh5zfquqtzmm8v80nf6ve7l3ts3oq2nqikbpbto5b0fl8230d9atkwd74ga9tcek82ies5rjxrcok4nix9q4yunc5x86b79vmapara8gugapz3nawprtyjy5hnp9kjpvga5zwroqsbdrtodp486kgu1w40xmc3s0kdn9dmxro7hd1c6v27vz0yp0vn8ypogoc8rntmqp59jqlqyy191fztedx3pbo2ntdf5bk6ekitygmlu1vui2kxg97nnf66co2ytfikq4ybprw8s90edi1ohhzovbz73jht4i9cmq7w8jqu9x60yi9giacz54plikg7gkadfi9kh26x7ppu6a9mukwj25m3kmdau3qcquzuzxxk28bwl2cuj2smt1aj50a96ah9q75hoaqf4dcsokzxiogr4uv23gas5d82wksqbmq2d1qvic1yg0s66ez7g1lk2xyhbjqvx89czsuishnh2os5hkcjmkmj41pa5pih7h5prt9tn1k5n398mh8r3rdbu4u0pps8iqgddam1c8o8xajcuui6xkt59977tdgzrssw60l5o198efw66x95ra42tdz134m0patessphfzx81pl34u1kf2umoyz3h1ud30t1xrv7fw0n2jd8nqsqzgu6m20uqsedqhyrajb5mu1t7yc6f8pvwjanvus1hzr54m25q46kbxdzxrx8nesds5z6uzu3wdk0unp7lqixnt5dw0kjd0m0ty7u486fnaw006pg7v2k3mkotaxhma6dvpxtp6jfon82r7jpmr8tgbgbqopzd0ff4199nsjlnfj2u5u35fhn44g0xmlqkpe2uq1p34ro18c7mt81twwr780l4kjsik5ax0jakzlr07etbysscrztpg6ocubwrz6rugobo6hc0k77bhou4wqf9jiec2ujqehvgw995fervtfonn1lgt2lukce5ajn9t2nx8rg18sil4xzi66v3lx1clfal5hsvtyw5digxav99xdnjyf',
                        mime: 'i2rxjl5kn1h2ixqwliatoxh26568gzyfff3wugyic50tvy931s',
                        extension: 'tl42g77608zabty4ulgigs75t1ywsjgop88xxvwsyb5kb8pwp5',
                        size: 3567158869,
                        width: 354583,
                        height: 136021,
                        libraryId: '1e87e5ac-ef38-47bb-9649-69ae9625d8f4',
                        libraryFilename: 'l863gxfv6bgnfbecalar2nbju85o701f8fmtsb73rspx7ix744p0ghrxndt0ru8wo91xu0xxgpbuxj6qbhfb6qo318vu0rrq7j7hj0nvjl5nfwwf6s37dkpp3m69q96sd3xoj3z5zpgbmlmmu7a7iarw7r4sjdwt1dq3nnp4xcxaai8mo9xtvm73ohidn1u6mc0oz1wu6zl3l0e5qrmnpywaj070xcxz3pro3e9ds8yjo3ug9d9mwjscwfb8ajt',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachment.id).toStrictEqual('ed94f951-501c-4e49-af56-40258c458ba9');
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
                            libraryId
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '73711d0b-4827-430d-b9f5-0e5591eaf0a2'
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
                            libraryId
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ed94f951-501c-4e49-af56-40258c458ba9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentById.id).toStrictEqual('ed94f951-501c-4e49-af56-40258c458ba9');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});