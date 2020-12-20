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
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'zj0edyx4aksu041k9lh3efsde8g5ltqyu4xzlkzm4jrw2axk2ag41vu716m1hlpz7z0pm1vis99',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 252602,
                alt: 'cl43nb3n5xeap5897vz9zf6w72z2td333jm2ciheiqs1k2lb4fyr8z1onfrl256kt4vqghgq59i571dmp0vnpexdf93tmv51nzigujuhkyxf8r19chft4fkau4s9uawecc1b6su5e62x2h6o84q07pnyiqa6s64rs109n5skth77tsgy4m47bsx83z5jw7o7zskprlslz9r5wrgnl8xwhcgiqnd787f8qaluzwxymmwdhdxqyk11fskslxf1gzh',
                title: '0fosasvlowwjah1n0zohcdz6nzsvmq7q47dzrg1zeexzkbpyxq0pumvp8432ej5epysibhjz98aci7gn4t9y52nkepc4d6z1fao9chs22tk8glt2nktywhpakj07xyalw7o4zfcrmwbhmmrz4ktl9ax67grzk5h5fbl07afcsgexx2py1lxdbin618i6ill99nfgeonwjs5ncva7rdxzy96w5qs6pvkutnmu73c9gt9zbtot8z0f76ikk76i7tp',
                description: 'Vitae ipsum quasi error soluta. Dolorem veniam molestiae. Quae placeat molestiae. Deleniti fugiat dolor vero dicta tenetur culpa quidem. Eligendi quos facere debitis non commodi asperiores quia. Vitae porro impedit odit.',
                excerpt: 'Molestias sed voluptas rem amet voluptas nostrum. Reprehenderit earum eaque consequatur laudantium maiores voluptas facilis veniam. Explicabo aut totam consectetur sapiente ducimus sapiente. Culpa non qui qui harum quasi totam qui nulla. Quisquam dolorem hic sequi accusantium laborum. Aut molestias ipsum et laborum tenetur quidem.',
                name: 'x1yptmeg6h39sv7z6bng1981v5eb99lqe7ska5jd2tel3kywzauqf274n9b4q5p3ucr5hazd7i4yuk0hhsxa50wpwhwi6d3j9rkqxqf2ug0v1vtrffxiaonmyyp0dn0cy7ia6urdj1meykybf4052qc9forwnxgja86oxk3v31eo5al23yw2ouenwg9s1r7cxiwoe3gprxb308vkhli9e2hevzi0vq0c779vsobed3np8m9utbwcp0ap4bc5l60',
                pathname: 'bwkh0tveut0rq29hlzfnj8ez87h68dy63obkuxp71d8u34mbd1vaxb7t6w47nn9s8p1katus2qmluz42pahvwu2p5bqxlpmk6512vs831ldzn5kkvmrl7ozqmk436kg897qzw543go9u9tdxmlzg293txqoczzuljvyekd9aekk4obty98y6pvjyqsossjquqnzkov1z09wus4nqgxlvl81035r26ha5tj1bvbytqpur8dm237e804mz7dxyv9gzwqa1and8tigu47hpxejlvt8cwij4pc2r6pqarcbxz3tsraex82hmddg1imn8kfztwdt0yx8tmne17al95n0b8ma2kthjshtarp0cwpbyaa51yfipiw5si7l5h5iruvvrs7tyx0jqjbeumo7slokj5kb8vowesofj8uh3cp7uwsnxc6a3vx259za0fyt77sjm5dcqy8wrcm1kzjbetf2h65fqubom3lnwybretns5buq92dxeo541q1dwwnepdd1b6m3jufk4v4774nyr51bgy6gd7rgdjz1qwnwtwwb6lbmhqufswwpe7otvlcffy6uoe05bymeu7k2bpxfyin1844xsh8r4w2qvowc0unjazv489ckh8bwc7lx6dz8yv62g5fruyxl1czil7atv9og1mpf13hz1lirho3oylj4jtwp6b8qrgazbpd572egiqcsac66efoyawh44ch2adj7fgcu5e5d0aoh7npclgbkv48vdjz210l8z7am57pzidiflnmkjgolwzgm73vf7npvf1za205yvyh4hvbi3loawr3rnjmj963sajzr96uz6p8uuq9gk03sn2e1qtsz1wmjon625yuvxvlsm5ohs4bcwwno4gl163674b4qp8c761xdn3aat8kqu0wv53emohz4vahk8j4p2a27i4has8jww2uht5c4cmtzs0nybndq988vrj7x9id9y26nqqn8efdrcqlrkskbg41bd9y3rlt1bzh2p6i9f4nt8h5nh2it9qky6',
                filename: '9sc7qe2q383mmaa2h0gpe8rz64jd0o01x29qbomhl0069vwuii5b5u64us15c6im8pzo04lesj0j88v9pp6lwx24fuguq1dwe4m40qh79t09n25r6sv690m4w3zy1d2k1zttnspth6a0cf609mquvm6qj3792fwl2xdao9rn55ghlvwhgzr14ycin7d3ig5ydtye40xgtvysp6r2jj6n4697enzn7codjis1enp8ry0s0efx3mn1e8jn9cr2fcy',
                url: 'upy8tw8ug0padsbc0696j885f9w8aby7ewtvi3mydstm6pp2mkykq6lg3knj07m8wxdr6w6e2ijheozgjvcq4d7rpyijknj58oblkgmd0sssksc0z9wed5v8atsn6wan5ca920utpwr3b8j6g0cmlca4sjduuv0mep4ztg4dkzspmhtv1ijzqa6m9f11kcbjvw109lc97p7v70kcvz1k0oezk2trngg9nj89lzi1hx2ddv5o868rysjlytjxpf8avja6rern82qubv1xw9rzbu6kr9h2tc0k698ts5we6394c2bbtqfr267bja5l4udkk0x2piddh12a2a1gjtwjdj6zz90fohz6ipvjiurhrfhq26d4p06mza6g4j4ic6w8rsdh82xahvz90oxjdgax7umho2mkd8up8117cupuoaxepmwaph8w8zt6yeawzzsqecokkl6f37g7on18yi84smle776gljwzoty76ljynwfh6y8xad8p9gaui1hpyw3jdz9fqnrkfwtedvn7cmfap3e93x5tyht5uz8qguqn475fwyrtwd311u2sgr2c6c3o0cy3157y2hgnjrh9p5i770h0cc1dn7owlw7c9w0kat5hg9b0nwb17r1rrpqbtboc1hiq2ek6mdjt45brnaqibpcs6op6zowk42ornldm9mu1of9smk911u520lrc1q189lehlqvznm5xt1241e4q0rxmn9k5f3nex8qoy2pbjalquzugcfwnqi3lyjka6slps4m5uyn9vtbk5wu4rltz9n64q1gdw27wxiks58kq6mbx8l5thuak0kjnvoz6er6vx5qs0kgww6vtuo9um39n3fwvw1uopjalt9wfbxlkvcv15jk7lzssxq4f3uajk7pjmx0yanq511ydsq26ihg3pjqm5h45porcvbkcyy5kgsawfs9azi1au7ux9soh19zs7qpzf7c7z7vslf8cieozmj5uacaix6ru1swkfanqfmgoldk69tc233jlk0jgmhzy',
                mime: 'k54ad0lecxs0t5e48ps9w5vxw8c01ozmy9luxtvnbv6vtjfaf8',
                extension: 'stsa0lsdjonlp8xh4auo72oacg7mrj1yh9s3q33x46y8j417lp',
                size: 4042614804,
                width: 364260,
                height: 627927,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: '14ynsws111xyiz4falfcvdpmsrq6zlbjfknzsq647vll46c9whad0khi0m8reyzjpzj17apqjdny7bn9yabrecx6ltoyuqpgg8bl9srcmz3k8mamz3335gsmcypfkzs2okxh024e7s3sslz484k8sr8bhojw6dn5c6rp2r9ws4tujuj7yroryjhamzkv8abge1hww7idghq7q7wo1pa6hmv3x2nfxwg1uugnorol94s7fcfs77sy3u2f4ndohfr',
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
                
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'p1nx0qgg8fgzmkilk8jnpzd14z9eg5jt8vu30s7mw0dodmr070irrsifwrnjg2bp9tpexdpnjmg',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 233879,
                alt: 'lvfgjiol1g13bzqzzquojeeltsq0swoq180w6bewbsev0kllnpbh6e1twjb10kzhpyttzcpowuhww2pqbkcs69kw115x1nhql0q4102jnmhokn0qbv1nv7omgbgxboy0umr4cgst496f0keskcm4lvqxam8zf6mdd5r21otp9h7wj6mqacn1dyul1vm2on7j30q5qgtplbnnzhkx1fkyk6y76d7jvi1ngq6obnc1xidjterj54qiiu7scq1vh8e',
                title: 'apsfwqxqepb1v5qeqkg2u3625mxpbtjy6no0cv2134ymqy399g0ct5eldhjrrmc0bnvl3m3v03bdd36x0w1i98eg6hiiwmyxpe53p8nwq7m7k1otjalx9uq417f6i67wv4nax5o7pbu6dklim8qgrd9xjjwww95ojbfcc9w9r1pys0jvkwxdj27me2wk7zsl6hkua7561trtxdjnlds04c2avwkf6se8lxrf53gltkfptf29ii1bybwa6zczrci',
                description: 'Doloremque enim nihil aliquam dignissimos dolor qui aperiam. Ut dolores nulla magnam enim dolores porro deleniti. Qui dignissimos est occaecati adipisci ab dolor modi alias est. Non consequuntur mollitia. Nihil veritatis voluptatem voluptas quia maiores sed ipsam itaque nemo.',
                excerpt: 'A quae quisquam rerum aperiam maiores. Cumque quia ea dignissimos deserunt odio quasi eum quae. Eum quod sequi aut consequatur quibusdam. Quod qui accusantium repellendus nemo. Et aut dolor alias magnam sed earum omnis cupiditate. Optio consequuntur voluptatibus earum sint.',
                name: '97t8m07m0iz72cqhuhr29e3a0rxvgkmo310q546k3m6wmb8hswzwx47h08oq3l9osvr03b1er4lyl4i2szmjoj70mc9kvn752245wgeo8uf9smb54zsdd2fz525k8ixzfvmh7vp5a5olo3sxqejscvnn0p8mqqifg57y2zbj6x95uecy7t5dn1xnzlk6p22chvhy96sd105towy303hya5ural6dxhosmq55f91681gsedts8l7w9k8sn3jvl90',
                pathname: 'n5fwg72whpnnuqlm69ht2fc6mhvegvat7k2gzn0o16fz1erxkk8m506t9181djf9srojs5z6m0osu5m1cvgodvx761kvz6e430x36o37iziuxhigtvy9j1zgyu1493062v60yupum06fo146kio620juyve0dhgqon5b5ehlgz25bsbec7i1ig4b9wq0q931bpsme396u8hxr09s0sur77cmn04fojm7waysn6d40bmph39gvgvz6rcx6xjqgj8onxd6uxvm3fs5c2amfx717n94t5timju5866ssdpdym29qlnytu620the0huvavlnid42js8mbhv39a2eygabbb64jdir3xpugwixhlsxu4adfzcj2bicf45visio33zaog6tr1wj8a9923mb8rflg4gw37ww2wudntpud9p4tsi5mgp766p0k5aj1yzmjcv3vaas514i045brui3nf0ml5z08k7j7d4p77gsx9a9wrei5caicqifmdxol60mkxxiphkx0c0jmkb90u49znavdtauehptcyyfcrryeyyweihp8wlmoxzkzex6twohc0cvrnlkad0y7fyzrc29sl6elgn8syxja2x56mndsr9ffkbmkzkn5953yfrasqoxncmngkau3q9py9q9e3vljobkawxja7evlt23bmpv080f76kih3xghg5h1fwb3ny7poujlbsolf5ptchkoonu1w01tq5783gjtclxcqc3910568uma5tthu9skk4jmuc19ohyf2xubv0w58439opdvu3n54geygis77qjnwgm7s4ng4hpuigiou71l64acbrtb2jnnesiuf5hb7cpnx8cum3c05xxsmcj9vi3h3hsgunz6vyccf8a13mrydlwuu75vy7ftxjudq6sqsvnahorz2d6bmh2jen3knzzg1ji9coi1f32ks4k8hdfftsfaeqfg8onns6bxkh7w5jrmc6oqhcswocwpjwhjehmlmci8kk9ww9uoqnan57aytjbrh9yy6jc',
                filename: 'f5weg1k1p8vgry9alte7am27mkxezrowzf565q32c99p53856tti6vpe2pj21ottcqibcn847ahk1nomcbzlx1bukcyze2lg5dinx0wi63u4djv3d31psyafnwgppxq8er8p4de8skce10crobb81yswh52w5syqi6emo0mpq9auqwpv63ikpunm906mz10ns0jv9esqum5bg7geue9fbo8mc8pr8ogefhpiekcx1rynr1abh7x2zsm32yo6qzm',
                url: 'w9e046auamtiom132guswyxbvpqjkpne8c0d56ca1xlshlu5nmpofj7136tc60kjh3hua9q7wc2hr0yfiwytvsnrs1e1hu94tz78w1syxz2f6s0nr1mk2bgzkz84f6tqulxrpxqc9vz3nkqhz3zrleqnkmugyudgvgr7gecgdji8akj153p10uccy0sjrre91e28sp3gy838k4q7e4tyr4s1qpv17dvryn1s2ubzbwp7295sr07g7px3gg2pd3qkbo2lv8d5424lpfcy1lqtpx7um6hpolhncjptdyd2e7lfrbr5exkqj8wp4h0k4w4jnzx19cabwj3fxl66snfpze8zzh4u9x1tzfegoiujh482urabll7j28wpg2vusgj5c3d4deerdyk53c2b90uottxgy6b771jer1m1e51hijekqogdiixxlo46cnm54rlv12cj3hd0v5foa6wuaiirz01nwwbawhcfu44pbb2wo37rv9u0lqodh6184wihdjqi5gbllh1qfbpsq2iw8ygfx554xuokx72cvxnghxtxkfjxcjoep8ch6g0e6kbuxryqhxocoqgwcod73jb1cwcyk8hmxy4q1pgyxc43fb7w785lm6fjyv6f25g768ksbepjutfg2hb8pvxcm5rl1gyiirqlwpiqegyaa5yy4h9bu0k5kopgb8yhk3ceizywwh646pbn1eddbetprdffr4p5785jz81uoulftxzc00bvw7juf36jl8a1yc91alfmg8hci52qf7e2u6otmvl7yv0yn9s76xcgzglew2f4rrzsvyzpgcsq6qasqbm0j211lg4vvp0pa3zfhuzvrer7q07oixd2abvggeinyp74ddolt5lqx3m9dtaywkz3t4rc1uahl3wszbh77ae6hs7ttbfhelrfko4sc7iu1upg8zt7lx1uui5xg3aftc9bc65zgo2pau34f2cj4u8qkazmfvmonkz8wo2a9533630pdmqhdegwebznau2fl7i9f4p46xy1',
                mime: 'dfr95c2cm89ilef4s50sme9dl1jaut5perxczq301p6zdzij11',
                extension: 'yw1y3sua4tm1xz6asqigpgtw564ev6w718t02qutlrrm9lxybw',
                size: 2171381367,
                width: 404569,
                height: 666664,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: '1ebjfbuzfkmsi4tspiewkoh9bi2ui49fsf8za36vbc9efw1m8ol2oenax9e5tt4jn0uxf7h8vfnilri7ne9aqdfrsbmx7mq8a4ou8jlxw21y17ulkcgwyu7nzg52m66ci4pca3ijfka4zpzp1btahikk28v9a89uicitgrp69llwrzw6salfb2fdz90opr3qm0nb9ouhc9i3zalgpfssqyr9o0b0wzahb8qerajhzrx6erxw7zxyjpc8pigyreq',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: null,
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'ldx9zfsrqi6d9wwlspk9v2i2j23suxencgp0z6o9b07yy70u4zvfjqmbdcsovkoikce2ip4yuzz',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 686509,
                alt: 'cpevour7qh3zfc8w6sjnn2ryogpz51h3s8y5mcuwr5pllqb8u1gjj2we82o8ou1yc356t5c5mfsx99ot7h5momthidha8ns7uvnjgq3aou0i51fhwlb45mefswb7tu6g8hoj4j1tf5htcqhsxw5dw80xkxlc4di97jlvg4h7097jmhvx8u3hgaisec9ubtatud0zs6buc08tquc7gf8dz8r5kgannx9aepi5jocfbd36x0s59hiru7jxa48wreq',
                title: '7m57pi1dim3g3bvjx4vkzzwag4u2rl46bjcfllsb718twfwulg09iuxpxdxp2kk77s77zqvi11cham9dxs2unb9ww2og3zb02216fesbhjqezkh88z6wv8q0i207ueg740ipcvav4yonr2lv1lh9hvbqv8cd2oip7n7ymn003luf33yx2x9yh6i3rsszv6fi7kvkc634vjbthqku8nosl41swozf7y36rqatic28gfpv3z00h6hqeyk8rjncvr8',
                description: 'Hic doloremque totam praesentium necessitatibus qui. Est ad in tenetur. Aut id quia omnis quidem voluptate. Eaque impedit a veniam incidunt accusantium. Deserunt neque officiis sed voluptates magnam ipsum.',
                excerpt: 'Harum id incidunt ducimus rerum ipsum aliquid. Dolorem adipisci adipisci placeat veritatis. Similique non incidunt officia odio debitis enim. Et sunt quia est. Impedit et cumque accusamus id.',
                name: '9k6i0bu21tvau0ld7xv2omcsdq6tqcciid2ypzjkd0tnf56j69n2b2ghanlv8vithakixsoirtg16nqlnlasv4dlg3745k2g3ekjyuhxun2cnfi8dv9zktr8ml2nfxqkjtieoxpgdut0rdftbckbcnvxdyaxuxdljxvclm07hn4u8akr975pkuoldj63ekl3skt0jp9x97p1y7yrs0cj55jmkcomobbcft8ay44pferaowhvh0n0u99jivvanyf',
                pathname: 'sq4548oux3u4ro3ivof13vxw3aokoy6hxtzv6fgo0v33udjeg4zeoev3u7kyrrhs54fl836bcq6u4e29w07aq3hk6ytxikxji8zj8huozwmag3y4mktm1zx067sjzah73lgjnks5x79y6dngwc0urnja1ol58afinj0txgh1mx6je9vn09gui2i4vqzah3pm07v028c24zhcyr3ktm3ofjwja8ndfxns8ggihifgw84pxikqq3crg9az6axat7phsxv9295dvizht6nx3pp5hin2dv5nwsnqpkuwsyjqpkd2jx0674oqreyhwevi9y7a1jp2baix7n1xfjbdhark6uwy4gcjwmj135cepjx36j32x3xwd0o470rqqaglguv7d0y6zkprds06jowl86pbed2904h8mbk144cu0xqnv7pej8i409p3bmtyeahn5olfbh35007l68df00yawv88c74jej90t4uyhyi423ahe3ayavfhyspyh22wwrll3vz9ggemfpeu1jxjbs6wbxevgglhu6dsj73hsxks322cgh1mc2m4vlndwycqz11ul98nmiqiyr8a0kv3kw5dgfgzc4y2ljht0nt0s3unl4g9nq2l4vnqgms6a22otnpjg5022m6txg3ipbjiod7wq808d3rrtkz1y4x23htpz3j3z756igzfo1ngd6jb4pt9iwli2hxaj5pt8phu5gt93cxy6d8hg8ztzp3mkhkbvgwlaluvvjbh4jq2k3m5wdk8uwrb103ml4v2i3u95prv0qlyofuqmpnsoprm3s1czym3s9m5fa94dek39uvtcswjll0yyoh7w4cjax1q4haov89qbrkd6q4qqwdwwdsg4unld0rrjrzbr0t00cwp8eu7t4abzyzik3b17xe0r4dypvo4fs8vkvgih2dvziyidwgt6lv1d1y0g1j8ft3r7qcir5wq08dwwb3req0bfyw0147ti2o999adxokj7kmu0qdk9xx03dl3uewegxhaja1x2pz0',
                filename: 'rr6fzj1fn073aupqvp2ag74n2769awtrv89ys6svx2kgmzpq7b2sqlmzewmyv17pi7l2tchngd2q8vmsd5di3h5ngqthtnberuxl13m6dba8typjltkza79dch7kej0sfw8ayod19t7pmycrrhh9ad5kc3s804yc79kzocwfjyry7emzmgjqjk4vb43bro87mwk4s6nqxoh2ektfyek8m530pgewaxw3055aj3ot402jga2lv3jy0pgnj1fwh7n',
                url: 'wxwx3t26ja47osjcnzaltx3lmvq5nfcdkw0mi44o36twb7xwv2ir0wgfz7qjx17q2o1isaq1262otkze359znca4b2lej76e16yki2y716kp64ftal7sf4vzn6q3evxs6482l5syg9ja6d0psi9u4rnk7jscg20mo95vs3jln3xr84743g5ihk0t2tyz3gd2tcfnl7r19w39ypq7eu31mcvnpyf6k5o6efayyu1nvqppllbypswyjmqtfs20p7muh4xn2yfrl179qzv0us16pl2rbh0smukflkffmjh0l4z2adnhwrl9gnd26tedgq31voa6l1tc8fj9n50v8m6102mzi7lqj9oxzfm0tvdpa3l4bhnjzpvi9jlm2ix1aa34gk0zvnpdqpe5sctm2qi3onetqwuwfkido7q78dbe6x30i19rzrvkhniw383nct2caj89wxjvxi6lrusu757zlqvrkbkf2mq31gc2c71k2tnsx5qoxa0w659u6481rf20ye00rhqkybrxjr7xp00vohlpoe4jewl8karjgc9zzl8507l5j3hgepkmkqbfpiqrhk9ez22z3yx8g3q4txvxnz34lpnvnrydh38e52fj7ly0hena5oa2tte14gq779vvij6pa0h8abqaktvmozoxb7iy3yy7gfufz1eq4b18l1tn42uul9uh2swpi55wyyymoi8ozgn4kdxmbrt5m636rf0df7f5cu0wttnz1byh467fgs4tixjlo6ab9n1pjyttwaeya4mqpzcpnt8oyvpvg95m3f6bs68emp505qyzkvv8hu40fy3rx6fyac5gfb3d7j2rhr79ree6ryspvx12jis4rkaihxytr1hh8ovowu855kn1qkakb9wqnvfwzn9d67klu39z25vu5r6btbq68fnk7i437b01kb80cdnmnf8mdq8og9tjlrgbcgocwj4u2gms97sj2oycrnafmxo8fam2mvr0768cvm7fdpkks1f6jr69lotd7vfy62vshias',
                mime: 'tcmuy8t0eieitmriyujn3lxeun99qnfopoczthybsc1nhw713p',
                extension: 'bcucdhqtjsewpcfg4yofiahebpwy8ivpdj9h34q05qdsy2azlv',
                size: 9148491845,
                width: 327263,
                height: 114823,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'ipvnwitdf8avk7nszps37yqcfazjxf3xje2h84a1j44hsftknvifnj7t925t0i4jz0i8gb1ijtdwgwbia7a4jxrl00i34m0wglx8xrbv3idpn3t0j9ipzwaq1yjzo7towxxsehw6d7ag4zcb8pe4cxr9a1mj3yw8gusbwyq54ok03v59ij4uj5tkga1533s86ift44oxenvy60avhmnr620vqcvnp2572w56ojc4eyrl18k27nzjyqwlg5q3lj1',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'h22te77tj072leujpah6f5cj2z1c5luybxi588isetu1wmvi1fpkvwc2vwdoejl80r05iww76d8',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 146996,
                alt: 'rsee7pgpzr7owqyiul0qvf60gmmm1lc56k8ci0cxovsyc16sqi6piy4z98mxkdf9ox2iq7x2chwinv6nncke4f0x1aszozf35z48xp8jrvrfzrwv02gjqi3mw5eqx8yvrajhgjire39c9mp92gt16k3earpfqk4982m0rwpi2a7b041c76jmktt7r33bmr7xoik33spwwpo3taskwwdyq7hya6uwjhblxv9kubuh024a36b2yhlcqfvva2gkw86',
                title: 'ya372gwtt0bar0rag0kwy912xepw5g4vd6rwwl4q1lymte8b1xyzloam7sllucvk7y4l7lgl39t7cpkqi3u02wjpj4fj19malvdq3i9nev1hlo6uww0m4ak5l3kp4l3jfc13t5d30kgw8a2vl9a1ll737h4w4pnc0z36v8gtckjs17so2a1caqcx9stcd42urmb0iqqfa98cnhsmlxt606yw9y93cy3j1h5pd28mjb0ugodb8n0efry7f5662gi',
                description: 'Ducimus sit eligendi perferendis expedita porro ullam qui unde. Sint ullam quo temporibus voluptatem porro fuga nobis. Odio ducimus et eveniet est necessitatibus quis voluptas. Labore rerum sed aut. Qui voluptatem et quis rem voluptatum quaerat ea enim vel. Consequatur sit voluptas doloremque ut nemo.',
                excerpt: 'Occaecati fugiat vitae quia et aut molestiae. Dolores qui quibusdam. Mollitia expedita nihil sunt iure porro adipisci omnis. Et quo quia modi. Consequatur sed voluptates sint. Et est praesentium.',
                name: 'f0hlf0hszvqeqh59bh1cue8c272ezh8d96kn19ddvs04oj5vzpegro4brqvyloys53y7vxaw85e5wt2kev35up7ymdtwvpc1rf8qns2ygs9hd3wlr4vrdd5e1tlx3fi5khs4ygz4glb9y5o0zcwu2wfi2h5e6321za1bcl8l853to8853vlmhi6zpv2mij4yfxl5pmbruul3wb8vlj3qh1vfrnrl6jihp4fp44y2gbqqys9v8seggcd13j39gnc',
                pathname: 'mcwqh644fhmz1o4j6tjk7px0jg6q97zohqbe5ykdzpmwrmlxdw3fv5jgispzfbudky8txzcypk8qeuyho7e8x75i73v7es1necjy6zlc5d0t5r9k28zgicfkt0dovrjknuudducqkblkev72d7d4xrdka4dcuivknlyhob54yyn54xn8lt6u3149tjd7nerd0o41hg55gboo7lqwm6fqcviwii9ip7h0cogamel7388m9dhnhx2ixtgx3qap1yy8dgmlwr70us0ih15xxd57bkrgislppiplyh2brbx194dsz7j1tzyj20j1iz7hjcdl6c4dyysa83cfuvse7ose4awpcua2bij5zy4x1fvsyfxgbst4m8frvu6o3s3zkfwx9cypmjeu73tyvub0cz88xheew8cfoeow8u4yl6m2kkegmb9es5mmp3toet23rcb5d1to4it5ot5ibgi84q1zg4arz4o995bhblfkqmg2doqj8jxqsi8jyoml1adklpq66l9twbh46igzvc6sikt017z108g8tkvy1ib3lue7279r5daos0taqmxq4cit9avvlfkfo9azlq0pcf8w6smm7o8m3f9gvq73awb7e9w2les4rzz1jo9sr0z7u8n6uiqxwae7lwxt0yyktu04bahml4lm6p7kvbg3nnutdmvmixa62x54v2u07o6w1u4e4yx45elkwj2ji2rtwwfr7mu2w1ysw883obp6qheax0dy5qkz0nrpd1xly268ogt6t3amf3uvr3in3qqy7rm7br10tomigtllx7uqsp4jnh5ni476zjrzg07vcli2eyah5pebtlzs00mnvigxlvkq287ulocvczxi9idvm5z3477mtmbx8s51y8y8i75wadeevl4xcfio0hhgu34gjrdjqh3x9i2a6m7gua9lb9tpjwkd6gyy9l1vojl8fvpzdzppfunv9fyzdt8idphsh0f6ng6rdckuz3d68s0w887rx7agvasb6djm3laa33l62j7q5ej8',
                filename: 'oa2rqjaagv56nrq39xzt61f35ysh5om6cwxa9mflkycjn7l8pgvb32ddll20l7bzbg78z196flfxhqo0dcpmz1hjjk7nafe75efw7lbs8n15wqfsdzc94et27wuz2qi3701wlpauqnmh766iasto201l85eim638mkoruxupvj2tlwt0lv9rqabshgfcfd9j6pewxoapfcrw5q8l6qwol7idi3wowy1cg9ah8w0b48w9y82tz9iw6bhkh2upe2c',
                url: 'nxj4joknpr7fyvjaw6how5elgeewmfan499xwdzyz5f94wc43n792ar12tworipa972i0hjpcdnrbnrnacpw4ike1zkioobjllijgf117ant1fr8zufxarkz00vylkioy6gyubphup6jf0pekphxgx8mgjcswncchz2mj8cqxehvnqhkk0wv4fnfyo6g2mpvaodpj6347edtcsc982xccbume74v0afnxl8sfv3v4l5qyzbtghn6lftpyiowmtaac89spn65ut7weu5vprx7zhneruq0ux85hrn2izqwcw48567df9llmm3o1i77i62wpwbtp84dp389etpf6cko9f1d22wps26p7o4z497jwkxy68r8b1q9lqdsqyi2ujw6l9mc9vnq5bo79fqw9vkzmmuo9x4mn6fzq1mrrjczc4gqym1ww7bn9342xllg7bpokoki19rcd2suy0ec8pz7cbxgsypc4ef0cvdkdvict7daya14dq8xns5a0hgitqcblb4ucouqu93j7bo79s1jet1ej3q5bxq8toc3o00pcrkv79n9pv8frrdms190vcc9t5d18j891qu895vo38bpsb5bypbvqkdssub6wrwpziljhhm3nu63k4sglneuurqu3qd9sn373bptnpc203jz25d3p63ma9fbvly8tol7d4el9bz2sbg78c84xs2lesaflbul2myimj89gqmi3ox75h02m9nvncqs23b7s1wfpfmw1u772be3hn6wj94cv9xx8zzl2fbunkhtblaxa6l4uk1futm4l37rurtclm1b0uz31kziacajif4zy7prbpz050a32duxkirud51cbsindjv679g7wzwghmii3utwffgw2b5y6yjgmgbfx5mmqouexwukjwx2w0r560hr6o19yfvqfxrnfcol0zig34vveo7vvlc7ivr6io0ix5pyiw7ss0vmpmu3c4pjk7izrsdgx15x3d73i3hha7w5z5wf72nrt6d7jevzmx0gr7q70vqr',
                mime: '965dvas5p5pfap81y4e8f9jzwds7wdluj4ccceid179ygnej1w',
                extension: 'pkz2meikyxg0nml2xkqrkhtn6picbi5e5aft1ikgt1cg9dl1ke',
                size: 9609863032,
                width: 226077,
                height: 477093,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: '9w0hdsheu2aoqo8do86g14hef7mm9a0j7e4z46uukbtxn4pk9lixyr6wfpjrwg6vre2ie4744we8jrgt1uhojtpk0ow7r8owuytpdo5tlayily9g399qglpe2b142eujlbrgs7f2kd1xuhu9yi3bugydz7rzjho92daa3qd71pncw1eab0bswpohbcejgp3jla8h7nx4m0vna1spjkopup82989bu6qkpspgpu512wddz4fvloaiuyk7huynvno',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: null,
                attachableModel: '06413j50vf8cs08ru29etp1lg0hc7nm1xmvhzf97n6bjpxr23qfm7h9frek2dneuugirx5biylf',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 977803,
                alt: 'fme0fdilwshcisuq6fub6woxjt354n5plskihcwrycx0jy03yaef4cma4n9lm7dkaqqfiblyrj4pwq1fr92crd6rqedyjjdtdy6lb9f3oakc5et9mgotaipjmm2jv0lijbm26adgl5djmzgw1qhnnw0ylyx9cn7q3fjjwwm210y5q64hequvka6801ru39niqz7i9ergrvizuo6b6bemqw5l932jswz1gtidgz31yrazldixjc5e6sfdagclyye',
                title: 'y6qw5hmz0jgzsg6toy60pgwk6wk13ig9j1vui7l3b53ysfpps9fvtmlrcajttma71801vs7blhso7b7of2bkx9zl6sc1wmomlrslmjlbh2m2v5o5zmb29vbo1fgpswzd3cap81dpdu8ilfoyeew5107x1pt9e0nk3m58blckqpsov91hrqcauearrj9vkycw7uh50xyzi97dy3kqjyv3ivchkvb5bi2uk93ef5yfdptsuwj7r7aw0m0cqbxb4n7',
                description: 'Aut saepe eum commodi officia eum. Culpa delectus non maxime inventore sed perferendis. Consectetur dicta doloremque ea provident nostrum saepe rerum. Ut possimus perferendis nesciunt eveniet ipsa eum labore sint. Rerum voluptatem dicta et tenetur quasi eos doloribus vel. Dignissimos tempore et veniam placeat modi perspiciatis in non.',
                excerpt: 'Earum nesciunt optio nulla et autem. Blanditiis autem quam dolor occaecati necessitatibus ipsam voluptatibus. Et provident natus eos quos. Veniam doloribus et veniam excepturi.',
                name: '4dtxi4iwqeh68tch61mmv7xxaq5oaqny93ldleyywblamr35alxl5q435qc43ilkmmj8r9c30zodb5ib7wbva0vspak16wpimgkzll38cw2azxjeeyz7ojfgv7113hfhtzu4rlzxgr6nuvxuiirrt2fe4uctl2tprmeiic2uooxoa3j7o5ajpe1am6q4joor40kyhegp9aoymc3mahbiltg3f4itx1euixzg0balrfiaik5jlk4kkyvpof65jdd',
                pathname: '2c49n9pto7lz8mq97oo9aff91fi0xc1dmcm8ydtfby1olveqnzxglyco6sgkjej4p4a2ibo68zkn6ogpd3eb296fuxd1i6i9m878q0it3ciehyrro7o9pe2r0v5qerv2reiso4hpxy01y5grj7oe02ye1cyz2497bjh6ttymxkxtflxtfwzi70fe22mscdy0wlk2l5iq9ho8ospavifedg37gjl8wujaqzgja0j66ntmlx1bpf04f41zzya3c7qaf73rqlyxi43uzpetpehr1o9k3qx4geqtdsfiupgzs0dcz103wxhf08o42u80ejhfi6vm8rnyqg878y42wzp8f5woucx4kel4a62xiugm6qjagwcq325x3y0y3e4ez3ib4tc7wgsrcc0qyjx8smxr6nnpryjhp9t8zvakjhon4axn4c457vh7wwff57gsfejxtmev5j54kflf1ai2h60vig5o2x0ysu32917e5et97ktrhnjs065u4c4elaolzoo0skkq9onb9bonprw76biy9hdvbco23ux4y0bc6wqws4mfd1vuatczlfzjq3r286tlutbbbemu75k9jmcv3l1v0rxb0u6xq7w2jzbdrykis6tgvcytc3jrzzvanpz5xtqsjb2l33u510upn0izrg6rf5jeskekgt21uxr7f9dmde4cqoyer5xg30l242kg0i7go5lxpmfrxcnf9r7ciblj7lfjs9tjp3lbitg3uo57s3jq8blpn44vzf6tg4c9jgoul6g01zfisw5rxfdphsu3x5lrcwo0i3ckrimrj2fp5pz9ipntys6582b1j5apxatvhmuclhab36zrr108aih1lxd8dcn0bccqnikkmnej98xjy2z8minauqm0spl00y2wojkdmo1i0ckqq7iuj5xiucxzuc8sn6v9sznizob7qgw3zypen7lsicolhw4q02t2c4d6schvtqft3lj5bgxfnv8nnaojgj81v8ykate1k40dbgaznujoboqv899ttjh0',
                filename: 'cer6fz95gc7bd489ppn2732drsie7ek5ok703g4ofyoj7j12ogbpye1fd6wyc4kj7bkueej5alhovnskppigtdy0hri97m3vvum274ufcntwtafkr9pv4vsgak3rh2v44k258c4p4spk82f5hlq240eyc2kqisw4dejms8y7rjfkv1tcb4dgkgcacpk03wi2l7zxwmf6zolt74nymcrkv38gqns2b1hf3t90l0zty3z6bxl7ku8lda7lwowrqdd',
                url: 'o97z3lkkxspbvou4wni48h82k7yzvekicfr3lc02sxz7ietgv12fusqtljr0g6tpe4pnhk6kyl72stsl436t36cxtp30ksrl486vsb8nykv2mkmp9nbke16tm34rid1pn2mtqy6ogqk6npoxulpwn86d4lky6i3b9amlxxz0y3vq672fh7tkkmnu9ygb1r62ixdwqo0ydu8hx55t2sbp9w8uf3arpiq1unpkhtsy4y8om3if8pw0c8iwp1xyt4k246rreuvj6bekb8nmzbttv9ll2d0uliaypwhs2xn31p71zgvzyi5w6s9tgn23niksr8igtjufow8vy807uphi9k3dm81utakbvpmh7yus8bwhien35ghdu7ylsu5pcpih6d1imr0rxghablsgwziu1qk76dukacyoacqbxy36j8hb662nqqvpn0e42gtk8ztshpwg39hclu0n5mtfgn54112twmsqy85kymb38jvawbugpa5g398zsrz64ug22rhglipul0tasu1z658nfzbgfhaigylftxluprzrrjawtdyj555sjjb6zcv63p477c6yd7xs00npxc1pa8typ6pfs3s4zz880zi5i5y7irklceqweyah5oapdfphspx1r2b55se95e12yainr7k2wc8zll4otx3imlumuyquulos9qef7yaavazmjvper7enrxkyt2glcvfg5uv12ewysiisc9i6o7musydck2r36ipzz7ogh6eouz7eneut1bd8tun047hiki07w9z4z0j1zwwa194a3psnzkhion3gnoplo5d81hp5afdntag753wt2ch98lldghqay6cgvx10zzl7sn5b7pqfdi6486ekvb3kw4mgj6xcp78lpxkleq52fiw29l8o65b6cpbyet5d9esdl60ev9mou93wpzeebjulamixe4da44azyj6mybrc86m2yer4wklkib9regg67qdn8v9z3ql3ybwb4wurt6vkjfwk9ry1py8kcdew7zmlfpo3',
                mime: '5iwap8p3782b4ykkjps0wb2vuiox00fb3r5ng3josom79zh0k7',
                extension: '83yrojgfiws3b4r7phxsjc3ofjihuwcnwm47ra35l43dcdqz0y',
                size: 7187589195,
                width: 274616,
                height: 713708,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'o9vlz34dhdol4jf2jbkl39uz1pltb3zilvr2dbj3j2v2gmi7y5j20jhlou41hxtg9043rf29ik6scwtgyl41lnc3uua8kqnuawmg9mfjdlzik1xbvdt9roqi20i3fo2zj3yzue1epwsthhhqissj9ovg8ivnwquy3tqhmi57d6fns130si1yjgzawyhfydmfizucsxxkvf40etmgq1qhsajh5kjjq260xq0332c568cphpjc1qrs2avd0wsk84k',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                
                attachableModel: 'rke4dj2vb8j8m8ph06igvf04g6ebt5ozn8kagodd46j34tqchdopshrosgaoiz75pr9u48h4jhu',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 416992,
                alt: '9b93e11em4k6ubvtvf6bfiqttwe5d2il2jm85q144ujb95wid3ywfbpiatmc6cgoru2tpnypurjvebxug085bm3xbo9dnn3mj9emy1s9t00jh976w4jexf7cv5la5bk7mxxqu53x260oqztplpk839wlbsd6iog9j8texhywifpjg20wy2nuixmcj5v4ys2mrsdx9nzvdgkb7mwwbl2e83nr2j7ofr4w2e6ldpz31mfx64bj38hte28rjyxg7ix',
                title: 'hai7ya8h4i1didolsd26g3x37az2vk89vy9xt18p119r7w9ucx68roacc7lrzr45lcbef3qz942wsv8hda86wf6zzlzjt0my7oumrf9fas96om41kn54fdauuaq3dyyj46b9o0x6d6pap0lfvbeibaqopgd7nu8t6hftx96n5jjmwlov211js0prwctnu2e33ampo7czj8l5cxtc74xlev9jt6ydzctmgqnfibx2of33cac5sjomdcenym2osl7',
                description: 'Et labore culpa eveniet omnis minima ut. Consequuntur adipisci mollitia ut. Sit quidem reiciendis. Rerum velit quo officia eveniet esse.',
                excerpt: 'Dolore et nihil fugiat vel a impedit. Quam et nisi quo ut. Soluta dolore tenetur.',
                name: 'dh58d0h0ojrof9a1d1gp264n4e1ry22iukzb07sgjrf5js5m3yk4di1b5jlj6lhfata41b3nysaqlgvs9sq3goj6akso8pp8q15e5km145lfaqs9wvr3idr7pmrvbvd864sxiu9yr7rq0ky9bnidlt1vgxt8z5vj3uq0k7bf0oba3k23dujo5excu7iap7nc297tx72ipcnt845dm9p6crg1s7hoi2w01nvphab7pau0b4uwzvizlnyrd8u08hz',
                pathname: '7jznl7wpxnr2jhsd5fyn2q6947mzx2vjg0xanor645w3tm02n654g3tsju1wt5s0nsmmbfzwxzsbtc84yx2z2rjmcb5mhl745glx5osgvxf7n2fekn2gugcmmblv2cgm28kxadtk6ylqr0poka1i06c8ztsk4760qbkm0uqvbn2eacn9pqxspc626hqtxk5rap9gl6r64cmro6s1u97v0oocems3uy9eet5ip75nz758g7b51oj06t752ljfis35pzkm1d2a77vdvwhauvsqy5jghkadnz7fmh1q2vw8klcpo7use7ho6zu799idsgt6hxc3f9busdvexx47r8zsgee9i25v16p021e2b9iuksi5nmdwve0j9qgln7vw0vru0cnkq0n64j1mhfjyykze5xnveto9kfbb3ye5dmethnoj7dca6mlz2n21ocjkdwpymzxkyeo3yazujxv29s0n9h2cakgopk8acft5ar1lecctboixw58wbf670slzzl7bfty91oixtfto0bp6rtodotxqaxvtsdnkqn0dpt2wx2zu8bs7vvy516qulykz936utb73wczfy8q40gyofynxvaars24qb9720ickrxjbzadir92svu8y6x4n7crsvs18v83vc5rxvxg7lr58sm4oyowcb7skykxolk6qa7hh2oyb0luzh2rxmvb1emaeuef06h93fwsjh5kyivhaphzr4pqwv1jff5dqbyq3xsht68697v6heogqmposhntdp60heq61ow924z1zkvviuwy5t83bknwed6esjiaxylqqnj36d8gf0qpoy7q27sbn1rv108ggn1vo2xywalb2trnwjy79ko0u5y7fyn0chttmpisf8wud2kfe5bngw158t7ltc2i799rg5tay83gfclwjolrlqypmm07b95gtqu6cfk7k68i11w69ndqmxc3348soyqahpk2np1w7ko9mi47yp3j9ixg1or4rapbhwzw2zroosoozxmp4pctob82pjdsb',
                filename: 'owbxe8tung7y8rtxe5xf8l6n42ii1zv2n8xoyytn3zr00yaexb4qvxrl58c4zcqxl5hj87d1c2thj3exnzvyo6kxh0ita51eqtnmgrucr63x1rnlxg97rcfjfqx7ycersgrhzbjgrr0zrnrvsb5bzsynwwcq0graycul3j6fwsy6xqdjjv8kxmy3io7rvyjm3470lf5xqkb9ah4yeu91225t1rvin1bmo11w4jzwpj0gjormouym7vvfxbuv4g9',
                url: 'ihcyflsaifi533lh4u88jq8e2blnr2p7w9bixnvx7x0032ocj9iolne4e9jso33fzjg93sglil2je04xkk74233ur9hbw8kaccv98ghbwkadtx6uy96oz7iyf823c2mgosazfd3pl3lvry86h9hbctf5xj9q0rkrqwmlh2sv2yd6p9umwawq664qddmytfjd020vhy0vhezwhmbm5mzyx1qt9yz8sxptk50fe69g6f9fyxv86y7jc1yswub4fykj3q2jx8e1wo3lqz0ryixmbqy57y36c6vkwmqyrrqspukq0otjafuwvik9kkwc93fpc12f5106gejfq3ez6i7puskn14tkknv6bpsn2c8degiim42pihrz7u264kei6ufad3ikaar8ejxslb4q9mxm3o2kd3hs72ontwt1j22icesuingu1tnm49nzw5zlje40y9ev562duklb30oz1je5sauj3kjgt0vbhs88v123crezdr1aficp4y2ppvdyl9t4chxccpnvmjispxt4hdrxhypuqq61q38mu62aqb2ax0u7mezwbb2s8pad8y1a1a3hfp70e69rqcljtm6y0v8ne0tnmbvvectcsk9k220pd70wt2sah7tz7cobcs5mpn5rzewr4z6lvhvkxoldhbdigfy7nr6z5psecjg80ot7qodwhyfmpsa4yqu4fuj3xwrrnvxrb3pmct7h01jsu4tr2pzo2v79s4rhlup58oojlhcmfeqe2tlipb0fi3f4jqnh6atvn70nkgs00eacaqswvfl18jf5z5n0prb5dattkg4bpedtz7ompjk9jy0gq3ws90600chr8a3p559eel6fevbj5pjgew0lzoub3tv9rpwy689elpwii98juo6nmjukfnuqaj0azeqiu2qijfemibvg15s0ap69ph5gl7stx3sdstwp75nyfyvnllpuaal1e5otkh55kl3qoak6uebrpep8af9up6vp6f3must91nmikcjrzahlhq5y1wz5tt2c',
                mime: 'xut3qxo29f89c1r31ih1oy0t3tugvmwc8nqdu0wa1j51qroa3f',
                extension: 'fktwvsjjjhwfrkfikelhn7ds9foa78e0ppojh2g1k3lbyi262e',
                size: 4787990044,
                width: 377224,
                height: 544535,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'l2unixkqruww9nchcw7lzosex3z88gdzgxt1vpk89203tu4x6o30kuura728axom3lwkyy4s3mnf8ed99xpf22rh00ij4s1cyci2zqjgi9m8dgzi8q815sawf9j636udz2adkhkoyvsm2pqcp9gu80cr3lxvl73585cq64fzmgqnzqav1r8821jex67010gm57i1k3h14e1yashn8x3olhy2hvbcljrflbp9b2ednldet8ebohf71ftie6kf73i',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: null,
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 955599,
                alt: '2la5um1sfvchy533g6g5mlrpknes45xig3pp5xq6hkzdu9bnrz2edmvzdggjj12kclkpi2xokqmw5j59pcinjj84zhnhf81yz4f6ysah0xiy548r8atusl2oke2jmrrqfaeqgvvt58zn8ga48soqp2yw9w93b4ue49awtr2t12h74tx30z6ehexssm2ezv5pgjpkhxgs070qk670wrh0jbnots4gtgv96jbkxyl5zvhctau7ac307047nuyve6j',
                title: 'ft6xnnglcbkaqqq0zjb0cuymxt6iixodellct86ze5kav4bfmkk4j6tlh5pc236ewu5r571ni1m16nolntj1lkgi7geh2ks9gj7egisg3h98hq1et09h26cocpn024dsdx93f5v2j8spmpdvt4w55fylcdn4qu7f9g1rf83vokb1t3qomfo6jtjs07l4elcdje29z8te6g74ae6rn468kk3m50wpkgoeoekwlh7z0zonpt320j5x7o2e99nn8af',
                description: 'Molestias sapiente eligendi exercitationem fugit impedit voluptatem recusandae in quia. Et reiciendis illum. Et reiciendis repellendus omnis alias eos inventore et et labore.',
                excerpt: 'Inventore quam temporibus eius at libero tempore reprehenderit totam magni. Aut earum accusantium nostrum sunt soluta dolor corrupti nulla magnam. Natus esse porro ea suscipit ut. Tempore non ex. Illum est provident id eius laborum fuga explicabo corrupti.',
                name: '8bxtm2aj7snkm0evncfxev3f7zamrsthuu46x6blqzocs597lx9aczag0vt1zawrojxmij57p10hudw7qtcq4we92hf2i6c61tydt8l99shig2cwri04abyf67ge1wwggsnnw73zggapg6x9so44f79acvj2f5encyv40m3h6u8rwraph8ykfs825iq4vs4k9q2exg0cbk46i9fkr5ntsdayusde8nndlv4a50s1yeqhptgxcld840avvjj4oos',
                pathname: 'eq2lqzw9e5toxhnrb9ky6ih7riryvv1rivexwmo73kw14g28kva40b7gvz5yjxt171unb3x6b7d51bdq31n9cbukapecx6vdjq97tpk0712b6m95tfywb70o8kh14que6ltb82t6xtnn2t4iricvkufuf6cs20pqsfxh44sb8dy1zdg75c2yy8bu1t8ljmh6vthaqyozs7l49looniso4g0ipj3s80aexw3ubpmgdmknw7opmp6tkg5qu47kavh9fv8b1tg4zzj6tqmim1t18prosmoavj1t4x1ddhxn0vzulao25mw5fh4awnsz78l1sxe6e32ik285b95fefazjxfc2sk6itwzf61rba4arejwj47ibcaoprm8gm0sruqw13w42mwkw7wjxgxnr9at7fkpthk5m0d2ntgdsx5d1um254ltjkvqzzt8i8i20tc1rltnqjbwkky6t2hh7pn4gl5jdr7h8zcgjc35c4k9d1spyd6fp6s9jc0wv2fl1ezhp9whz6bjujcxqpix5x5o62fkvi7o0zotzn8zzwqa388b8fnm1wjythqimfzf7sum5fpckh8gnltl5dgzo5ixslbgla1k9lcqprykijzpjyn3e4fgb0hb1o94hnw9lxf8ca0s930s07d3r9hjps9qde0br9mmenaq9nagpunweud69zyo3mf0ignecytfty4k7l5w6vjj3o3qyxr9waafew1yqltvoi52n3ovq9kgtyt3wphc5g3y4ga34xzofdg4hmat474y3r8w5gqrsa5wdv9dq3k8y08cuyhlj55u4csbqu3besgkmbc1xrqhpy5s5ajqn11xg6jpifsdpbvippdusb3ixwx4d24d5u9uqnn0210jm86yvzua75zwt54ag5md57lj3vhhdm886xcgs6kl4ls2f6q82mjrofyywdese45ub3tomaeg40v7kl120u569nek4jd7qdl55eslxd4xyai3evpse7t8sbc55abgehh28apl7ghxd6tadqyp',
                filename: 'pk76hh69gp1dvg4r1vh0yacvfrq16h9833b73bgijwsifs3wsn7fr9dgl2fe5pkve6h5021zxrqo2fv2hpkl2aypmq0gbo16egpw5b2xls9a6fhagclgft9ijxm1qh386xm1z9k8r6gqtfjk42tmbf768bs3paahay52ofk7914rbd4n9wcz844x1oifqm7gzejc7o795sqfsf5dyf0r6qvea2yoky95jz7dsddapotz1pjwm2w1j4dxtd52htk',
                url: '5iidiwhccn6edwtv3if8bm4pmjgabppw96yl7qip1rcv6wtzh0geq628w0nikpymnt29ryfqis1a0x2prr5ey5a9ierjizd0onimd7xhl11flxa92osc0ftmyfvm06kfnrb4bncf1pr72u37b8yrdi911zawqzakm856pznzdj2bjx95c1z7uet7v0txn19bl3qxwkrjtp3o94vqhj6rp2arjgg9s1ggy51ujwagwo6w4aszmfo83du7jlpn8t9ggv7xcj6krij45zr3218hmt4ce3zstg191k1kwidpx13nh9nfwpxdh9b6updi1v2scavtxi00cyt3qi1ccuhhc2z9hqndya8py4yxmssi0cjpe07xm3sv8ff817w7hzmvhpypafjckes0tozo39wshbaoopddczltjf5dhd8gzbim6djlacj7sjlbe2ws7hxlyxtqpb56sibbmedtba8cjmpl53shyvk226xw4rmlnojpil6793421u6dqozzar16zzrvsghokyhowlj3xbv853682lqylhbr5re6n4d0wgeh0q0nexxnef6z2wz5rxdpjeqzqvgnxsfwywcz0nr6lxrb6cb3u388jebfsywft3a1m0bhusazmrsdeoxecci8kvo32b98qjuds8ecubhr6xfuuz5j41t8j08f3pt1q4ajbwu177p7ghrdhekbq8qd4gacq3k5qjrbz1bqk43a5hrv3uz4b61o3liirltoybymadchplvd1aw5g7sdepkeonwwacvm82yhj6k1zhqw412p0ae84rt8iuuh2r4hzw9fxapueul1tzlv0jhvwvix6bsi8wuvnwbix0v67ek2pwxhr8cs94d3cu0ks3t4fckmdw1bid2aw1olixsrmyjnnl9jxehuxzn6l2ojaz5f7y0quvos1y4xpecnymbiuy33w282hjsnxzqke9apla3u1iahjyqqpz26o95esj87ogfxymfnrj0kkzn1ec4o3wguw9tc8rwjylo38szbiog4',
                mime: 'f2p7u0f3v2r7ki2fofbagj1l1znrljhkcwujpwq8ca7dtn07ea',
                extension: 'h49o2dynzvui727aqdas5sqjvz4s3lpmr1u1fqqouf31kqwh73',
                size: 4749322550,
                width: 708995,
                height: 443293,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'im9gme9i1uwjvjrwzwlzgsytv7dfas2qosb96vjjrm6gqbz4svnbbuys1a9qy8392it0xrwlhothiwlgo7hjckohb1f7593bppxddu1zjpbsrofczga0z2ftkdxhvm70hm336tz2wrj5zukax7d05yyg8wqka5nr7hs8hfu66xq52sw1rmydfyy43np8rh1a6s4m4jjlynzmay5cnd0d2u2m51hpedfuky1vla8a115j5mkjk85qkuemz87eyyd',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 486228,
                alt: 'bwmlru8s8iuwlezts87dnmk92aih21hrftpzlorcw4vg0at9fz1cqvbrm4e7qtka7acqgagrtedstc718wggzvoruqy3ktyu69kiau0hy61g5xiweodc5tbnkg084g0e07w957vk4lqlg2e2pb4jb3rzxtii3v41hbzx96ewi7gwaaaoa1yrr0k842hdjpdexi13z8ye1kp8cntxt805m1jubrzxsjkts359efieoj9z0vrl9m93cdipjjyr8yo',
                title: '06qn4vpzbukomnz10e21324itdxgdboq4chbw83edp1k4pj382i01dr9qlpk0ipgrz2111o8ffwgxrthjwfqcxfdtyfdkk7w813355a51vjig779cukmatsastvo5o7bhufts262dblrmkl5xv5xvmmefnhg5ryvou3u8irp85oy4wd9asgh3v5mjpunakuh862br3sbsb020c9y5paqvd35bef5pmcb9hqaaarnmst3wzxzoxwidhqe7khips3',
                description: 'Et est omnis dolores nisi et non est dolor dolorem. Distinctio sed tempora. Doloribus dolorum inventore fugit repudiandae. Sunt delectus eum dicta natus velit autem molestias aut non. Praesentium architecto ipsum quae autem est et temporibus minima ut.',
                excerpt: 'Et minus natus perspiciatis ea incidunt possimus enim odit. Quos quaerat et blanditiis rerum. Natus ut asperiores ea beatae. Molestiae nostrum rem corrupti numquam quis aut optio esse blanditiis.',
                name: 'tpvq6cb8pskl5fjdfhm25s13epm9b6hdn1y3m0xk30js0516u3ju03v85md5c3b67ngx0qy0p5a8h4k7m0tc71qo96bnqcfi8f8uqr14brvkzl0logv9rpqib3r7lv3k0kfb0py5r5cyxmnlzkazvyw7j5ucjsfnic5ctov0is9m0520o0i5g63eecdk7y1saju8b479w70zabvfnxu88gnyiylpccw6di9azvxcnqbxo4y0hc41h9vmu5rf8di',
                pathname: '94bxfd6bl74opj6tkat9v8egpjxt05z7ezrzvm23umwga9oil9tpcsu8qmicdzvj3ytm80rfznyw2kofg7r52w7k8sh3e4czwikb32i9deiz8j93rzwote7yqugsgpaml6itua35qx1g8z2i7ehv5vtoyjejom4iyyenqq0bsznf040ng8gghgdva06b4h4iefzb1hk6mtw0wgrulutkfqpfi4hz3ux0i8h98obsu1sfs2pf7482gj4ab2hrk6hfusswx85m5nuuxrc08cdjze6fok061zx1eh4x4ir97favxn0hxamagg052xlc8iyk019rosxglb1ee7gqi43lhdq3iutqeadso4dcyts7a70xvrhegmxma5r5rjyyliiqjd9mts9v6mqae5ec79ztgqdqksknz4qrrtz2nm7d761h2likvddm29zs6mccs82w3ugbf8jjz562ou4wwtkhmvhfnaae7j8v17bbq2nklk8p6680ipe3j4dy4qz7jhpjrzjn0wegsvtkd8uwjbioicig7cqn09yjycy3hfeq4x2zhvz241uxlufz6ipwxsw9cxzvvlisxssxdckngl5n3l7vvrnewutijo4ssp71pz64d7dxmftp8636d9bw82gtv6288udwgd520zunr7xmpq01w4y0scl709hf2g5nzxk5mwypgnk8za504nrzznfc7cubrf9yqy8z6kgm2slmjmo5y42lxdjjqhfb8yexlazbra3752x2y3doyobj78ljrg21qclaxb710ttfvx2bshedrckyttadvv7urx3tmb441pi3xpz9rlh26btieta2vzilz701803an6m7rmz2tpemgohnimf31l3np0cm22db395cdag8qnm5sx0mcqtg7r6xcqp2y0vby2xc9liokjqph5lqv7qhna0z6grv06uynqph43ddwnpi89znn1y70b2wsz45k5vftknneunnwsvw04i7o7m1khq4hqkwn896zq9zcm5irc45taqj34pz',
                filename: 'oq56nkaedydl86dv37q0wvrbtz4irs2c0vgdhedrb1e293adsp4varjjg9e3r4bg34u0x3gcxw4vr1aucsc2hxxzapx7bhncv9v2esffp0n659ohgfecldppw0kzqxzmjzjtro8g1at9sjlktqy5b8ffatqkor2rj09xe8f4vyir935pzi62auuf0ie5j2daop1t030vtnoxg23w1aprxbit9hiq9jq6rba4dinb05iix6vnbyi6e5irjy47qzk',
                url: 'a41gu8k9g5ww6llhoazdua3a8m4m7grs26kv5tcv5p6s9aqrld60bn71jjh4l4iku2783j19dfpqcmlz9h2tac4dmnfzqowfu7wsrqdnm9n048ebfiervxi86k5tg6kcgxhubmf4n8htw2tk7tw9aahzl1of8xfu6wirg8k9q1cpcnai7ynm6tm0xazackl2me1xa8iv04hujnyt2yli3r14adgfcs91hay6uzkmrsobumnt4wlmz3e2b4m1o53l2otjcr05cc5fox0dw1erirtz03qlami0enanzguppaccaizabo8uwquulwdhk3nok3u9rilpd4621lo78cj23gbhrc2gy9vx1xtb06l45w8b52y0k1mo6oh5o5e5v6dnfbrt4bygnml4a7gvh1ot5h8gsonntwbuf57gqmb0xbqxixyvlrdqosu2zy6rbovjy8ki64qzbmbdo4bhkxnnk1ks4x5qjx87furvwfl7g8lxz8jahanhuio8nlmrjje5mhngbxgxvdanhep2xni7we9yfdba3g6ube6bsnv2ocmowuvcxel6rfcas4fz5wigwaf2e1rhf7bx9frjf5aas8zmcsc1o5erw5d19u7briuvkkqfgix5uvjpjpixxcxkz3q96tdgtyzbm1yl7lehmiux5bmm3nn9kg76q1mj9tl5p57u2ky7clf0jdi3t9ujbxjdqzkqhghuebsxx3b2pzxf70okm9x9hlq3pynmu4cwfhbmxu6caihhbxy9w7n7nb3stl4t9cywzbddr09a2xg3sy102twbhmsr32e24oxgha1vrdvm0p5e1dq2rf7lsdy6q2o4cjmxla0ykb698yp9j1rmofa0n1m2azjg253wqzi64xjl6cpltz5oup00hp8v5ch75br3gpsadekdcydo63y67hi4xp3svvfk3w5moibpbw0nwpjze6oko114s2rmzon8qdbk1mh46g4ade6gtver8496wxceiipf0itk2yt59jizzhns8lut1j9e',
                mime: '71xlnbw3yt7exqqvibi4zjp7h8u5stexvw5t1sfmgz3u18yxjg',
                extension: 'suh5aiy5euvdbxtasjxubumtdulohtqv9vi8tnaus9hudwwofe',
                size: 3022633659,
                width: 712796,
                height: 156827,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'byr1yg8j5ajw2s5t7j7ne8jwnmfgrf7tph60rs9yo3wqotc2fx8bh8w5gk3bjvwcyxt2h7ayahhiut34bi4z14qujnhi8x1iydprz0597cjvg1e7t5dpw0ak815ajl357gbf74hu87y4p3c7e6hddcz2dn6uyv4iv4i6jp7zqd1owfsu10xqd4glgkjtl4drvscexuys81h8qw4egfyoi68hknvorvsoelwmcaoyuefbi3z7afqy6xjgdiksz96',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 's8mk3uhevcl2cg2eqm3hluwlysaaa39l69t04dize6kzohup44yblcqtc1movursemdp6iqol1n',
                attachableId: null,
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 349241,
                alt: 'ljplqhytgmky51yhza1ef1vus0b17o1uwvelg2ppnlt4jxo6dwrvqdmd9mawauoj814gibtmk8ight1ssxoywmtqxqlci7mo6ka6s3oa2ryzawa1659toufsdw3zdvxnmdu70uj0cwqj8l5iqzseky8fb3szjmfy57lczyq2lhn6dzo0qgq2bhk99epo10xmfnnnnm52kn1kuwzvu46y8jdjgk07fj3l42yatz62z4w5q0t0vczdnkkhh2or2q9',
                title: 'sfal2q2srgeeqdqz3nzj7getuphjsfof9c93n82asv3d643j1t11uf04nmu35ms4by0vllce2mb5675o7rv2l4hofuyhr14bdkn2ej2bvk70tskasqxal4ya94qvzy3apui01n74ggiftnfdmykchcg7ffjala641zaplvkeuvo5qgloggutm3pe3ew6aetnc8wvtuzy8mpe69a14v9ehpwlyv8x8bp0c6uw2f11xpnfhz8qx6cmlfyryaf0x2m',
                description: 'Commodi sed aliquam est rerum numquam non soluta illum. Dolorem ipsam omnis recusandae. Expedita saepe velit quia. Ut at aspernatur adipisci. Voluptatem quasi atque non accusamus vel quia ducimus.',
                excerpt: 'Voluptas amet quidem nihil voluptate. A quas aspernatur perspiciatis a ut doloribus quibusdam explicabo. Ad aperiam accusamus laboriosam laudantium fugit ut dolores cumque recusandae. Voluptatem ut molestiae dolorum voluptates odio aut culpa quae quod. Magnam inventore cupiditate nihil assumenda dolore ullam doloribus. Deserunt aut earum sed cupiditate.',
                name: 'b9ml7ea454jhsqrr76uel1ww1izvtvqmd0ydv8xgye7mequ6at1lmpipfvixaawx5qhzs6uebobdaiaonuqvf7wx19q80kskz2vb2wankeizcog2irg2suvqto2kd885cd0uj785npgxncqz11klaip2jp84vn3n4qwgq6ytatfjuz1hmo5yf7k7j6obyzdv5bs6fnbcifvpnf5721hbhl1t72c5o640bg4f3xdwjsmoqyzce6wpm1q0d3u1pbk',
                pathname: '9ust4bujew5fdg7ywxplinp91egoenmsx88csfur207u8cpm2dkcvrpyp1xluettdg3q1xtok7ivzzbzqj0kk0egm42ieak8y2c5sgf94mt04jwtro3l9y4k2pa0fuik0jvi4ji94rftz0o54nb5p8rv6igt6g2s6upnpb7kfbk7bsrmngpouprqt6oiyu7hwqpo9o1i6txw1acrkfodpn0z2orycrsadmjnmjxk8gh37zj44onyntx5g2lpfl68jwrvtszbuj7e0h2a1gdji94yl1pjdyl65ns4kxzwnd20btw0sm5c2w81xm6hxi7r53rbs91rdbevu9wv422qnmtk8rmxfze5r7489iqrd2z1q4kwrhh43dju0ucywvsw75936t9wyet0nhmb4svm7zz2050ta2zedmpw38q4pbr0wrpo6efevhg31cz11j3fqxc5byjqpbw621z3m98izp2nmj6kldxnblj14qtndu4ab7y42gap9ihseod0zu8obq3wpduqisvi6ubr6up7mswn3tvhrxj15ks24s7tmxvrsyw0luhzm7gxexas7uzsy95ekua50er25q38lbb4xkdmlrk3et8oowdgqyrhu4wvbovlsp96hkgdkozjkm0vu8339t0vafd5mc8qbowip2er9oxsao9rgcmw1lljmv8rut40v5q71zwxuqkxnza3vqg6dvha88wp1vi2yxjc3l9ify47byzo79rfvfk805926kzvxxascgbd7kb6o8k4cyh287tdpaactct2jkcsgqk164sbzzo72ymvho5qlk1qgrnsm4ztlel7276l2awcppwcmqxpm3moulacjchsi6ixbgkoj1m3qsen553v5v8atl9whu5ditlprsyvqf87m2x9vryrzt4lqxizofieagu7jzff1zj9fuyst5ccri7et3yu6yr2ci41tzcg8o3umw5fw2wqi4gib0e2kjreb4y3mw2q5uocmqsudd75wxb0f6bmrck4yp497c182a89',
                filename: 'dulio4s89lsyvv8j1dbafny6dci0sw2ivg2k83zrznn5w9j88be716zkyht0w5o5yxaj8ss0hrp342y36zppnai4uvp1qc253pwxvthrzuvq3bi329vx1s5xhpbck3griv0xbk98cocbyco1uoyu0vadkrzf8butqhtl08zvyl9u6htdwotmv9qhv0z66qr70kg6mi9bova67clo8znqkd07m5wgxwkwbss6njku99gxzujui1ca2hcl3hnv0mn',
                url: '74v4pgk2pthfr2zwkyt4fut84ju8ojd9bcw78ar0cg87d8k7ww6675jljsoc7gunyjd8e8in4s4g8n7ea55ggvbt7wkercgkqkc2cz0bl56ydby5rg8byb5s9k6ypq4mw7ku5am4udkbdwpgee6vw6rk7lt75gfdhgnqstvf66mv16ibd3spbi5tpxtxvjhb050pmrmrbxux6t9e13h6p640dmztg5yos0tmb62j9b0kcl5imsac4tfca2klelrike3l252h8xg3zgy6bfyvtq62d746ldqz7df59d381waob8tz2ydvzsg2d0zxa95fmy3e3609rqrtn9optvvepdkphtr22sa5qf81n35u1ch6yg6x9vkv2oqhlv04i9xenzbahxx9p99s5mh865ajexkmjpfdyfkb23bwucmsn5mkfdmopcpntt9lz3iffndui65sstluwyrl345ryl08dpdkfakjtvxlx5gnpnjs0utisoqo17szgideqgahjpygkmskv2cezzfj7jvibuqimrntyxp9wwzn42y4a4zjzhk844cy2tv5l04yxjogtwa3s4s1j85093ko7tjmgk780r0xah7gh22enpcawxz1dozug0j00qlqeweglnr9fnom3gsvsc5n7k1pvz05o0mikz3ozz753ff7khgptpayeeg9cc7xueplms6mnsig2ay2toc3ji38j7re6u4wh6currgb91o4lxvm3xj9ksqh0oca6rtkm9sopt1zru0f5m40goo4lvet9xn0tdwb90u33txa0o5nudz941bwqfrz2kpmijd3021jlzfvkwyulzota5q0t1d5k3o9qvuv1lm9ck5khv4kfsu44j601rkv0t8frxvm0k323y3ydadgxh1ms8x3efjylehzuzs5y0o9pwiotrhcbgci6m7r26ol2zrhqn1ncdw71uof7e73a17q22bkhaurb67u2qheqkzt9serqhw2wf9nbe9j3mrc77kvyk054jnudvw89xi8smoq',
                mime: '468y0lzv08xmgixcfyg3rk0imh436cwe6meqycx9r5goeelh2g',
                extension: 'ilwn0j8mpvghfn2vajrrswm07mgjh5criz69eibqvcwo1yc25t',
                size: 4459784847,
                width: 834834,
                height: 733998,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'b7x9tm9hc446qsd0x6so4gxfp4g3x3d36syns3h8y40wz3g5zlzvl6b7pcfjhaqtrx1vydr5tawaku0jwottx5ekeq802tlxavzunqk63rz7faxj1sfuu6t1mt1auz9it1lk4y3kvryvtr7ev2tg435bjcrkxrx6wwvpw0soecbcfjksw3yfz2h3xkfto4a6q828lpptf3r6lsu1b97pm5krstmv8qwre85xhoz6257cxacnx0tdtyvlfeb88dn',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'oeetrglq5z42btgimwbc12711iprh1wlm2odlpapn2j78n9k5wbfv374wm8my46pw4bc868ubjj',
                
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 337570,
                alt: 'hyyf2hntl7dvd2n4q23x26cytpbcext6xl2v4imolcwxulwwz0yte4slochkmlxzjo61gq0djm3nwerkg0qpgnvt710uay0ijaf8nkzdtn3j5ud6ql9ei9usnmxwr0s2z21h3ewvlusvr40z2ty939x336hi4yve5b40j4rvg2bklm6slcdziyb9ypuadk631bk55w4ue2uaaho2wya8i78jdppexe5t0ax3u32d3mltgztn9d4sf7vekczs9vk',
                title: 'c26e9x34g1xb26irdu9ddq7ukiydmm38efsnoizpgq4uf30jhc0ukd5zbm2y7meg74a5qvokq2lyyndx8izfj4zqd7xrd9voiasq5gvql276mskyqo9kxlc3yjezcbkitcrdpq2auk6epq0f8pw8nouglfzafdpgrsgyn1oc7r7j19xcebocmbkljannas27sspkml1y66dtmsjc7lezbbkfgnliddk0fghzs45sex8ncy0jt0k5wewfir362ut',
                description: 'Ipsa aut quod quae harum. Dolorum blanditiis tenetur numquam fuga porro sit officiis cumque eos. Natus soluta ut. Odit saepe occaecati rem facere explicabo suscipit maxime. Odio dolorem occaecati est hic sunt debitis facilis quos sit.',
                excerpt: 'Dolorem quidem inventore eum quae laudantium qui. Sit at accusamus facilis repellat officiis eius aspernatur magnam corrupti. Ut libero quia facilis. Minus saepe natus autem harum harum. Quis omnis consequatur earum aut. Fugiat nisi necessitatibus aut nostrum quas.',
                name: 'xw6edxdf3a2t15yv0k89spwc72z9cavkntdaq0251kxzvnmfu4kyv2ki87was3d60vdz8bqaug86f0lj9f7uiyqew50s38p68uwc3rcza3wiu7a2ncora5mar4jum9j09jsusypoakaqza94739jqigv8k79cfg520u8w65xxaqz33r4wcavyul8pkaa3pp0oqbg09u2llobdltip8mlb2xkpugd2g2fv24l0d8plg4ym8hxtx55h6i7d15cxsu',
                pathname: 'hobch1eh8dhdb4asgpesxty8nw00rpxugaiw3xbb3xwnpxgt1yka1gyty517tqwq2o60mk5wvf1j29ji8wmquzt462raojalmjhbx7wlyoja2nm11t9sxrkfhwpff24gl62lurgwvg1wq81h0aaeevpukywokltrc4g16693cgxoq1wa34gi3d0nqw1w5dolju3r3qtrprcianfzxo7ptd5ixqd0i059r1i5wi5jaekuqkqofixnyjvd091sufkkn5gpyr3x2k5ere1d2fei5bvabapyod4lme1ruklnu1n0tb0htx9o5owjcxmiiaomqhl6072tgm847quowqgf1qhofikiypmnfbqsvw2c6qg9m08684u9ta5hkxjseetxya6s2i5xltuiiunpn7zp3ztzoqulfb3lqe9k412la4h15ci3vpyjbidleit0eq9zyr7t199brq8xsrwu6wt6f9dtl3o87pwpwjdndprhhkl46g5zrx2t850fy8spp8lqx09y06m5d024xh47h4kzquenaplzo231yazijn2ynjao7b119xg3l0qz25x92hlcbs31xp0ecemdwdnx7fr38gxuooekmfrhd8q057ts3ueqrspd3ld28fpgh23sn706sl08lkbl3n9s8zi5t2ofe1a98j2tswkszse975hyjw5wxkby41l47bgdgl675l8z5ukwmf1flqcl1yonefwnvivjds9e75mc1apminht0oge6lgxm9bmqmebb9c87nftmbphsg2k5418ui8cyxcgpswb892aflx1cuumdnlhrknkt8ovwc1ml4e0pwkxmn25x4m0j99eevihp9kypbez82wedyo0698jwaq2e0zb0w7et3nsmxm8jw3x89liqofqeu7mkx0yyxe5rij0fn37ikducqjd1ok7ioqqyu57v8bscfhdidzkrqqfvyf31i5tl9v0bcjlsbqd3q6gmwuw6yspc3dmpha3ofuz8ra8xz4povz4r0sb7c1flx2g721b',
                filename: '5olxxvk5jc1kahtisc38gyjxzgdk2rrfmjz899pngut0wppua29cy5775a45s9kgsojm91o2lud2uian8c5dse5n43jgsnd3u0mcv5veezjmyobe86vilubuw4i4c2yvb7f671425x8jrxalgtfnaonzgqf2lidm3vq86pt3y25erdq2ftgzmxze8d7bo6rjai4knm05daarq4x25lxttme79p5s0za7qlep4r8eyg0tr5letinucpxm21uyq6d',
                url: '2zd86dsz3e0bszmpwk46kg78vrtt2t17mrt5djed3j8qodyfc1ysmtjlynx5dyyism0gfqxvokvyygb2fw38evqos2ci0tcwjwmndjxe4n37ufgsxy6uoebe6sww91wuv03xv6keh78woscg4eng5286xzcm9b6yc7xbjyrx418pz7z5tecurbvvztu3sod2nw0viodpbu3pb5j3ysf0g6iqghzekgnj1r5cina5cyquawomeenznqfdkqtucp8apd2zjvecax817nql2axilrod2445grhnptmoq6egibydrcugsi1cgbe1ozpc509hvs1udvfbpg0iuyl5wmdrcmtzmopa9auq80ljhc4rq8hz07fx85u3xhk5tsypg3e7g7iricx8yhi0lrlxisplxoe8gpuudw4koiyur4t7z1jldqbpbyf2p5dabnygnh81hic9n1zx7u151lzo1nijcgn6jy9kaxk41y1sj742hirv5vmxizavkzoq9qo70nsoh0f10ds62hgby4d799ib5tsjf4d5voyeshc3o52ddnoozeqtny1tasqynnus32qzia69qpc10rn4hs3rg81hdsgexm9e6qzrzifll0w0pvozq9yav0mygyykutkm3kfw80z50yms6sp809snaxjj797qpt0m01bcgle2nglgejjjfzughd3cwkp5jahozsdj51eqq1c9sj3qbvbodqy8v77687adeibf93jtv9j71vcr2j22mhhk0snzt6g37vjxgaa3k50ssis3xdfv0o2fx5acg219taqiv8zxmj05pskecxxyy9pxc5zyuwsq9j4t6w05kpfd6nl9385ciul8mldvcyaaujjiot2p48ozcpafslhc4e5n37v687k90md1uct8tjxzsc02xrp520ybumly54ag16o8ziatzn3c8aueijdabwvuc83nghalb0mzbxyttaytymueob4mjhat7t1r4qozj9pqjvmb34xsgfp1kvagqft81ckey54ukjuk',
                mime: '38ttll1g4fnordo9tvsq6jpw7faqy2y68ppre9uzva932ly48r',
                extension: 'velqiut2dbq7b0txyvu28fg7la87r0a10qajxum8nieiipvzmg',
                size: 5949122467,
                width: 707402,
                height: 123116,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'ff9ygonmega7jav7amcck21c86ueuducu7amcwppjmdyb5fxpx1wwl4o3d7xejp09rzmefecc0gs9diazdt7rxuriuzwsp0iixxhkl12xjo920keso4arca0d6ofplwsqggb5wkovkz37izc0816autba5g981r85u1mzjuw5fk9mhvyuogcppr78fbiwzpnc339hgcw6ct9znzwezinpksfi2wpii9brwsoey11hwru7n7g4pkioy05l7r6o2g',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'xu4ow61c7zw49t2qvhbom9rajo8jiu8ylicotz7i7toip55jvq18edvmfm94t3w0ze1upsp74j7',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 385461,
                alt: 'rek1xlyelhefxvlvxdf3thujrm14qpt1108i7ebzarql27wi0rke4mx5iemzjs3qnw868lwrgrvk62i1t9scfjosmr64n20l16h3jaj5xgmaojvrw7w7w32izg1qpmw0gm3int54schjky4h2rt9rrqkocd8dim47e786pngakd2i312r2ucb5tij5e5le2jol11trs7yc0g3i7tm2uiphg8cuq6oj5hhoojh9cxhwq28dv7s3eyy14mjsql4lg',
                title: '8xilfq8zf1bej76rac8fba79zk2my1q0c0m2buddq78qx5ceyljsi4b0bphyf9f9e33eb5ohucm91g3r9cc1h07h0pczn2g4lpunu5002bdxisk6tso17op9pxmu1bi3ib0aei4p03rczt5m323ipgsctr78n6o2fzs2rnh5jcats1tmserkqxh4g7wds5gw3xunvo14j3zbg3438ad3lm3d49kkr9c1q1mhzuj52i3yrt0t2simk1xk8ivqxs3',
                description: 'Reprehenderit ut et molestiae quibusdam magni culpa aliquam. Ut nobis magni ratione ipsa consequatur soluta velit. Repudiandae voluptates non reprehenderit blanditiis unde. Quasi iusto unde eaque. A quis quaerat magni adipisci eum eos qui esse. Est atque architecto eum placeat rerum.',
                excerpt: 'Exercitationem sunt dignissimos velit. Amet blanditiis quis neque est aspernatur rerum. Veritatis ipsam quas sed. Ipsam nobis praesentium ea. Est ut quo aliquam ipsum adipisci consequuntur quam earum eius. Sit repellat non laudantium cum rerum voluptatem.',
                name: null,
                pathname: 'n2n9u3wzq7zd0nd18mjc1s0wclk545kkrhvzezcmga9b79bdp3azcyqamhny5yf317x3e7r6hppx6f0qiuw3q9phrq9oelly767kopprcr6foom77fckygcyde7wn6oqcp2725mmjxeuvdrsphfzefqaexjh3mwhmrgayafltruxxhf03j4ps171tw0wv9ei2l593ocbg38696tto4x71iprw29xl72j5hckb4ckt9zizki7yghk944j2l1tuscq1p1kculqr6d4gu6h7wmbxsz1i3mxi3bw5a2kconxdopcnvelnq4onursx0qpdrerntvlnxuf3a7eip6fyjdiadbkicc4y37o9ksfr27tkof8zd0lahn81bq66xvkmqz2upg68pt952u94exbskvfgzya349ydngptj48b1vp5lmugfwyg0g63qddmcwmi3rfh7cna0r7viehw2ks6o2xky3r3s7f6udlxkaeqvscixi30kbx40a9j2rtwq6gfnnv11m2ih6s8i7ktkhuo8758801ch33ohsspqrtz649uszmlettsj8s9jlwj84smk6eiawi35iphuknmxwgxxosro8rqa1twd43yzfqr8zcpy01h7ro8q1hbixkpqdg53mp6bvswnt6akpglnlkgss9m9ywj9hwbye0f0thmfw52fe8gjjhm45nkofhgkne01a1p89q17z6qo5bbcv1ooucp0ypin3z792bc2uxmupkrrwqbooksoid3opdbn5n2bj7x3jmhzm8w1gseifodpncas5d64lhvkc8mv5ugeqezmyxxut8288v4lmx0vyyjo64i9xs4mp2uyz4m1lhx46h1dcjvk8knux9i6u038zepxnop7h7aihuv8013nn39hvddhzjxj6k6hddyip4pcn39gu8sfygwmf5knn51i6as6i7e349a092bbiogi73mmcchwg22j9ityxhp0dv154te39adugtf5xfjbzplo2cvxlmv1kxqqgauyr680nn6kom',
                filename: 'e6gztg4cqv41o51jzjhp30fqpuea08hiu2wba9wi9gc6ghwes59kyiiapb0it21454ih2z3b01orqe953acd9m2zyxrfvkuhjtt64ne8car2ixfudepmn8kphtayjzvwy030zhzfjhtd7tgmpjcoyoza9g0cqe63bvwf1951d8fc7tc9cxrntipg05h54ypumn59nzc56fjezl7wg4rztwu721mj6ld3nxgmn5doio5h978rsck3eyo0ds5esqr',
                url: 'parloy55njzzabsixg8tkxa6psnq2auxk1imtujju4w75bc9wqzdjyv8p2odlrirtinv462q8z7uaey5mgtxc4b99jzeulm51mm0jh4hzgbu4y9g5yh9jolta9v54qiahej9nz3e9l0g1b1g3pjy8pjpl2isf7mjikve23nodiuw0nju0ca229z92khawxz6fozaem29waktyvkq7ayhs9i7rkcmveh45a3epp6ihrcq9r2ynmc6vf23z44p5ujupv9e2h5oync706ghcmx9kmwr1ytkkgr1ce33uo573sq1yhpqkbig6p4bdq07lcfapekpm3kycelyugho4xhjtsacyq0qspuq184qkm9fgr48q0ydrbkaoj8sokkzhm6xwxia9peseco5gcgfz0r74wxtvoi2ier4mm31v9jqkuc350nsrr5hafs43uu5biepbommf52mlf3cq3kim8ugu1p036aq5lkmexzgu06zj86z8dyqqy8kmynqqsinxbmzbfkna3cs41hoj16gff5aqx3e9847tzm62h95zup6bna7wietqpx4n3w1k3ay8oq24v1555pq6h39zhhxynj4avtxro8e3napkxjd9zn71ej03wot014h786ukdqw2jqj04r89qkjpv7sga0jc9p3y7a0it7uf1gnmha1fvb2e6k4osppd15yunpwd7dtvr0osf03z275evbbgoeg4xwt5cgvz74f92yt35bdidhnoqr7r1s24pxzsdg80h3wqtqiqb0tdudfbu9cjw8p9rboc1u5o08mni53gdkovh2b8jkgcdxxy662lcop6bjxdg22vkkkhvmsjej5beciuvm7aq7kwg6xkn8ymiixekrq8jehj9pqemj71vl3rk0srk9la3y18aaryj0zcdpse8ncgrr3sbgg0u4kli8uob45vmynopigqlay33slyt08bwn8tsab05tdjgkovvfmsjfppsvsbyjxdtrs05sqayk1dbzmyueijdjgxtvjl3gz55r0',
                mime: 'qdu6d8flkeqofemo3n20jnsed893a9793jy4nd07lhme000wn9',
                extension: 'p71860vz5aytpc4bf6bo8kygwmb3dns4ui7qn87ap1tl9ycc0n',
                size: 7707531953,
                width: 103851,
                height: 746486,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'vy6dlxbrroqhrcngoiyphjqlvna1ecb9jm4walmfmvts9qbqcw8slcepq9i1t300yb866m8zaybn3fkngn1jkzpu0ko94jc0ak3kj999ft918kf1bd09i1wu3ackzxuqu8zs4922xjrucezlq0hjxsjq8finqq655ssnfff6kcjpaigd1atbjdntyaip926ta185qqtyc3zqwa9fk9mhuvxjdbp4v4sd72aip5x7508cj3g8njg576oqc14ksd6',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'epo87h9aa21ti72jyufv1wv0xkpbo0rxll6q5diap9bzqmbyh8ei5ad2ypk5uaykuha8bk1bded',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 229161,
                alt: 'xy9vjpcj10mxgrreza1u846isaq5qky8gqso6nkse9a58kvkxel4o7dojpspnf2doujt6xxfs8zcu3u92ad7a87cfs1ptq60umcc8raoqvtsjvmpd7aq5q97n4dnj6era8x46iwhwz1j3tiznc9cr91mjc1x480ti64otnqzjrf0ornsas5qdh20l3a0eykdth15vpqpfpcti8t0ckya2x40l5btlu06au9fsk3niv651wosms9q2yatudnz73g',
                title: 'u6qlhej83hwcr287w25ix026bc68r8azj4mhar8ypbnxyto8966jsg28eutp7zutqhzb6aucgr17j91zvk2mz7c2xgd5gtzqeoe9hp6fbld16d28ngh1eh27487351ezmh2xn0kgxdeczsipp739lmmhrw33xjhxyybn8l5244hvqbqj099k2m5kkw9hdge85wx2uy2tw4oil9f3ay9e4dqja47zarptlyb5asci88nbq12iq6yukhotwhfavei',
                description: 'Rem ullam autem laboriosam expedita eum tempore vel. Perferendis magnam et eos pariatur. Et quia est saepe saepe et et delectus autem vel. Debitis sit suscipit.',
                excerpt: 'Omnis omnis vel perferendis pariatur. Et dolore aliquam quasi voluptatum sit numquam aut dolores vel. Tenetur ea aspernatur non praesentium mollitia illo dolores. Quae quia dolorem itaque ut.',
                
                pathname: 'jvjaprnfpr4egq3ymhzu41ozkr056y2swr60zotyu4fwwmxuuw7e4crtbzl530ihnd3sc2j48dh1gwp78woc22m9f68me138c8nev84vznt1xsmjps47dhqcx5hjsztjbmsm0w4uexj7ag9if3p2f1z5ubrkrdu13dd8x53l5vmpianufl47metraujkr6gsevd8qjh55sk3mmwl80ah4eqiz6dozqq3hhgc5j7bto5gkeh5emc1w02p4s807i695flxoudjcnvf1rftzuifuo5dj0rql2mkqz3oas63g4a961lspjhn23hoeyipr0f9k9cqhlgf2h1960q416q6moo32gz5e8iu6bt55zjjllwh5hmq3cmk133e7hbrgc3s9mg5hboxs4uh5ggnwbd9ez4va58vwp351b64bq7e4rd6o9x8rb22kry6h8gqa9tm088b2ci98rxatf30nzphvjcm81f2f9hps1ezsofjrdsi19dyki4dyk24ayp90f4haui8wcrtjqcv6xtt7zsg8b2oz73s1x7skk7yrzqn68o9pwnfpjyy9kvyrywzdprkw4lm56c6dql8syilrvcxgyo7mfoyiuv0xp2ebwltat1hg8dwurc7nk5lskact5ns0ujhoegymvk2upjfs26bihq9zfinl2ox6ve6zxvnjtusu4kakpw8rb8573u8pgio3bhgt8v5wf6ouq1nn3rm0u0xt5jc378g7lwmeqgrxbfvlmn4qobr8y1o3ez0w4dsiko9xh1n21kzmwsdsr5hvug0c1wwud09293gu7ns7sckr90q96xnjvchfegvmx7x7p0u2gxj99ckzvfw68dwyn7lryx227p5mmwlkvu865c50ornc36gmhhrgtqjh20k1mmsalaxjcjxs9b0m94sf3pxiwpqmdl5eafegfdqmm9i9uzsdsnj74ce6glla3xpex06i39sdlsw7qygm5enxjy3wpttfgz6k30vf3ozkd1sjbhnb0udt4pj49rvtgbx',
                filename: 'j8unsd58e61kuyf91s6xhz3qw4jphoswaxx1mh47rfj2eu50ms8nf2dbxc7b67j8ble0b8yiclj8db3ug1wflwkunzl9yfo71g1mlez2460ds1bi7466z7t42c5hmh3wvbdelvvwhvnm6vwvh2h3y25unxh628jp2bgscy1c993w4w6pntlwb99z29lfc545r0r4o0m3297n0d67h5m0lajxd09ecbob1g7bvhsmt8actgbdgf3hoakv16u8ffd',
                url: 'hc6f8esgntsqk4bze4dnpqhhd2josuti2f3fyopta6h5wiliv4eiwxymuzkle09bzep9n19u4jxptu1c58sp4rxzbxn9lmcdfddbfarrew004cdbhcp3wh7dam8mmabup371geopo0ikf3gkt8447612f5m14bt1bc9u2yx6cqujcxdnx186v69565al97vn8isltc2lv2l1eg1go3rfdpmb0lxchp5zqtfy5n3rrmddpz0dg0u8tz2ji0ww4dhim116z26zeitsxbznsuwzttw0vp4pb8pt7vql5csdol75ut68y66xe2bd590f8m174i8xe7u2eqtv1147fzsc01jhk8fwy3ze7ner2xumhlu2soh56oakyhdmi94marxyqgwqvdw7z9rnpybezfkvqujy0meccy6ibclsfmizucmwvyopzct0pay534bhqebdnfn23vora9uj5n9pk17artuou2xdd4gvkm55xoc5kf2m9fgqtcp8c200ky1tib64sdah0ap2jjcupxhd40y4qjsn4qtv4i2rtbjekc5kfx5la2wqqk09k5s6ygcjvjb7nqcrfq1j18n8j08t17uvak993qenys20imkewnql38kuqwh8k3vhcr2arylcvt135d67tg79j5lomxt86bgolh4deza5k6pg14wra28bwg5y22zin1hf8rfmtqyo4zu509l1nnv8kvwmlqwld573gaunf1hmz8w73eeapjf7cab68taaa4mo77edkqexzm8v1dx9x0yl81i8sf34y0hoce5o66rsph0n65dgdh2lnz2051hbtrzsiqvfn3ppkk6r1hlcl3bbu02tqhqz91rvkockg670rdsmxrqikvq9wsfn0gtbvogzf9w5ts5y72wgqt2j6q6gptkgt55xus4su3z4abr2l4orx3f40n1u855cuet83ib5uw984qmt5ertxbqsx18qc8uibhbyrjwqssdi64ic1hhqwnj5qy3sl3jn3kwcpkrbt17741ese2nu',
                mime: 'eftlc9mkvnosiaxv3625fvdx2v8d2mls2ob5u8wxtfckb60lfu',
                extension: 'vofae2jc3cy5v4e9ri164k4xp3gvuyw7a6r0bwu09f5j0zfb93',
                size: 4202269797,
                width: 130829,
                height: 641617,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'l57jzvlr94buv73n0x9p8mmikk0eu1mrs4c11o719fckbkyia3ri6cii3avwwsgst8u8clrya1z6o0kgvie9y3pn9usgv549v7vvpszxaoaapjzzppkgs1men5y2vypnx09or2u6m27hoejjetobz2pgbw2vtzwik6lm37eyt7750itm3kf7p4rdlaguuh920graw5n3i7ukdn8krmdwpldbyasfqm14p50c9j0dwxw51nrd2a1en32ozhoxc8r',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: '0l7uov03ttcgfjp3b9mi74ink1u1ej0qro813z80qluzzbofdrky4gh6gnc4htf5zodrbnofvcq',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 648113,
                alt: 'avmf7k3oisga3juafrm5xoeg3xiojjd9b4zjagpzcdmgjpllnbpnlfetlc5l7fbsm9jyz5072ehmwvvayek3y613f5sh7sv3s1c8b6eq0ajj1y04pntyz6rht8m170h6jl2hd1sdvebgqy4fuoehm2ljfy8bvnjk8ld7guyx19a2gnwq9957e8ndyah3bcnvxe48ifxsu8ske9x7jdkqia1aqr85p8w6nxctnjodbdipnkte1rncrovua12xgwn',
                title: 'n1xjlfiyp9z5yo9ki81ogrkhv8zlg3kulhlrgi2kpu0zlnmveohh2yoaw5shi1v6l0gy8kx5ujc2pmtaoxw3e9eexbqelbew6zrv1ktq17vk1s2qmg9lp32s5pqbprqijyej0by81e5rd5tciqoqapnjb2o5replr0fxjivqk31g0yrupkbt9ca6w0cgalkqu1i6qi6xmzvlfla49xoli6wcl4uu23ty3fd2c18nycbnyqob4bb813ns88bue10',
                description: 'Assumenda aut vel eum eligendi veritatis aut amet voluptate rerum. Veniam quo omnis accusamus in odit sit. Rerum ipsum in saepe veritatis ut at. Sit id sunt laborum repellendus ut sunt et et. Error est odio quae. Tempora voluptatem et quia numquam corporis tempora vitae.',
                excerpt: 'Numquam sequi sint et veniam autem perspiciatis. Quia aut fugiat neque placeat qui et. Beatae expedita omnis quibusdam at voluptate beatae vel accusamus aut. Explicabo explicabo quaerat rem sapiente natus est perferendis vel ex.',
                name: 'x0tkcbl1hp2syo8ommwfvmu7v19gxhvg5m5fslzv2g20klw828gu4gtuh2ognovufv3x2ztk7wmwd3q28z1ty4521775xsn3lh8blo6ojpslcz9bbkg4zczlk7cue5gke1k5q7dd6a2cy9mu53kqh4jq2pnm8snb3j6t32myynzf4xg5xurtcxhm5p5jxbes5l3y0ei83h6uryg8mtz36tz7s0wlfvq25onl4wugrrau7rmtm4482sashpxcl0s',
                pathname: null,
                filename: 'j6uiaszc3g0zay248u8b6ef97muc43lynsu8xr262n15z3exfqiwn799voc68beavgzk9kc6sndt24y572lxbebosi6ksy2w516gqcssslh6mbnsad23t0thyl4hza5mc9vnskjo2miexwnhnfnr3nbz986nmg9kfoiriywj11c7511fo247nox5bdfufmi19irmdgft4sim9unqwe0uv1e65fnxf493ntqrmxf2m36mhtye3tavayekw84wdjy',
                url: '9v5krhbvhl937advoa9tqkhzkzyk33yx7nxqa2yhzrj05wqakx9ni63qnwmrny1oan02i1519hg8ocvtjbgiob8ilslrqf4s86vblao7xe2t0bxygmeel49sqp7uds9t8cf7ln8ioowqxqy4wl1gzeh4kkcyps4vlwhi4tz53po6ivc4pyvt6kcj3gxqe8jv3k2al3316bkfctgzuoh6nnzi5qte19t4krbmtj76t5buh62nv0ecgqyoe6kzfhy8ah844o7xja5e6zvi6lckdngmrhfgyen8pt8crv2ao8mpjt7zbjimp9e93h2634zf1k5gbbo1nc9wsnj3wdm9k8okk6xzxfi4qpmuzq4dudfictjzztyemp68sd5rk3l1gykaisjqcn3vlgjs1is8lq3ys8dnpk0ol90hbgsq42h401ju10ajsdqykbl2xvzjzm7qk9efbil4tz75zpgkkuz6zj04pghlqf19h8uiidqgx3r86mlwi0x284pb5677zy3kzc2pj4lxavoj9dho1lpbbqbbqsz4rx3870n443ktexn1e0381ma20ixt8rz68uva77htadx2chgpo12lthiy36btoupzuxhszooxjno4ki3rsl7a6fezw7dctvmjc1xz4l311ifs7ebh3vj3pkvb3w6ae1sdakurf7l889fypqffnglwvmmy3704fygm1pam5uowktvzlkfaijdu75al9c2o3ppj43gjucczhssv0f0a3dpb8ouy63328eeef4tttyutbcvzvlfruz9zlz06va2ovpv8i5wpnbujnxjmns62byqijrk5u72t4mzwtx670kqo5nrkp8ft6a6d6ev0ui5df8givdkivryog4g5dzmjcme6fdc45c3olznu6pc9tpfrqfwlyo61zbag2p6kvooestnxpaxlcnt4t16qrjwtr8839dg3ig9gq22ro5kgw01dawf4hgt8ixl6y25kg8semnflvs6c88q32gx1bb0byrjrey1lkjjue6bs',
                mime: 'amuzrg5rer35gnxi95vwaygo7kgtphu6k0vqdjoqm1c4m9keme',
                extension: 'c0w6lr4d1g9o54luunp6ssqrq9saynutsg9ytsbu4k2kfkcjgn',
                size: 9433676167,
                width: 841584,
                height: 347126,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'gbedlcohtl0irkxg38hgjt5vbyskrrip684h11jjry0d6qo2mussbbuilcly8qvc3dmio1fuztd1rfrvp87xviya3f9e3b5fi7jso4pqfjw2t6c45nbn4fz990ee6m4j0t5us8p7ny5zs3itulg6191l6bklxa9u2tsyfxzc1wb7ugg0k0k2oo107u8uvgptc9hxtzld72fnxt9s49qzhsaoo7xrdwls39blk5hb1qjbb6j1an0i96ow0gqz48e',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'o7jik3uwksmyyux40jk5tp5c427n99ygj0uy2heuoay1ucl3dfsm0yjne53pd0r6vhvtwgrio6q',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 740075,
                alt: 'ldze2vekj1yljwb7lox6pofr5akf9n4gglkhy1rsaczodtb8i9k3b7ffmerlu4yoit6ad82q31zsrkq7k4ritef1sootsrv3ktgddo9us3ymt7iuushenbvt0y5ojeb2xozl1h99fxae3tv7dziz90s6bdpllcvkb5f9zp9qdb4b9j6e11uwoarf98hjmyapzt9l8vunaqxlvr7dqnr3vkeaar6bdfga77b4yo51xsh0marxgisltlika2vmjj5',
                title: 'n0dae5xcs4p1917rd8rx362qr5cp5f82a5zzv7v6xxr2m8g8mwgt8psu331e3omom5ulj1ni74jy1anm6pc4td434q82ccw9ucjmkmul7q3xqbk6ua95xlczduwakunlnseshz6oxjgwg41hucjq6u6wrzr9jc30qu78sna34d2zrcvmkuqcelz15leneulf3vrxmmvltxzrgsj2c997tsb4j43cavl1pvb78ujnyrtbbdrkdn5xifd1jevjrs4',
                description: 'Doloribus ut magnam. Corrupti neque itaque molestias rem. Aut reprehenderit similique aut quibusdam culpa molestiae dolor incidunt. Provident laudantium eius.',
                excerpt: 'Minus occaecati velit occaecati facilis quaerat. Ea earum aliquid hic. Earum suscipit ut nisi sed delectus deleniti consequatur nihil. Incidunt perspiciatis unde sequi repudiandae quo maiores.',
                name: 'fhcli077gryp09bty8zo5vfigc4d9ovme0kwmnehif1i8mxa2gfg3cd009suiqhu18yxwf8gy8kqzu03u5g1wfnwfkr37q8a0smzioax73haav9y6s41yea7mdqy08d26umcwkq99lhmufjjn8smy34ctx3eujo31goeabrdi349zfom4b4ekcx7ycotm0sz005rip29ey59zb8zqfh4gqmwtj6f2fymmsug0d282guut5pviz2ga8lml5fihr3',
                
                filename: 'u7lgocatnfebegx6zi2ec103kazh9z07n9h8nfgauk7xq3j4vxakvrw3gaz5gjrnt91ag3dh4yo168wt4556egsib52i2xxxfz7vkvyn0sq3ccjt1r4orrp7bdppjkcsgdw3d8fcijbqxwnw8uie9aiaibfo0byvi52vjbpki7pby5n0u6ho2cnx8t10e9oje29fpetxvrdxvcj5cexjown1mo7xsh3nzmt5x8g1thqczs87b3sdywygwjd7udp',
                url: 'd4oii5ovs33x75459np31yw33rh86i32lg5dsbuao474rgi2qswrww1156og72bqevul9vnffo11ydt6kv9llenw7td7p76m9u4vyjjvgcmxzxtllojw0ir0qb9hzb0gi374bja6dukv4qav46n1yjj2okcigre339lbpd735g3rvgw9x9gl8fwzh3fugf7wm489qex3qpf7za5lbl85kywcs4u67b51poor9e41lh8k1y28cqh0wyctvk4yuk99hm3ihqxdtosbrnfz6jojv48hb1ye9f50udjf75m1bqmxw0vohsuhpgqdtvgu0nvm2i6yupq0aqywc8x8lt8kmwtr21vmdzqfvlyeitkjrankyyi84b7zdrkeysljb6dh6dokmif2gf6is23kx3ijs2q6txxhlnmbh2qipfn5mjsfojseid9iaotg9zpoar7xsx1wtoje552jvya29738x2lva1lyj23r6t54jexue72qk3ridslxnnw4iehgb0i3x104hb1kc53nzr4a6tedqk1xwcz1l3gd5rq2r7qq78ph09apewobyh88kog3pn8p2qzcl03bxvuczctvvg79cgx56ylffr2shzs3wcd5ru7thqyemo6ciflhkmkk1cg1v1dmg8c4hkx5eu1ukffgov5cpyxsw4mbxftlp3mbdl10ffhryfa4e86prx3n2ozqzsg90xbqya8yt08o5axubelnfnqyzt372kdjlehy8z7ord26g7yp6gcs397vuhrweroexiyr515t1wn605djd628svdtltyzuxj6bdi14r8042dc3zw3q03ayrbinl3hkuntab3699lzz2uegf6oqadwgd238hmw3vgglfvywtjc7btim0ol22ka5g2u1vpscim3xwhb6r5jeog1jzl82y4sv0j0a92gw5dwhh49sxwerq7t75ne65duxzpn0gtvlawio5p0ub3gr4t5x5kwjy57wtpqthxqibq0h1u39k3pvsgiq5rg7ao6qinkhpyc',
                mime: '1twhbsjz9myrnsh8f8o9z44vnd84gg0unh4sgg6vx3chdyznq6',
                extension: 'bsdgqop187jykroib04yeq1jrvjuj2s0aajpkk14aukegjttt8',
                size: 9317309261,
                width: 303667,
                height: 769726,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'vbyc98vvvb73uxdynkkb45p2znoc7kwyigtg73l6aa4hkdpmeuq6rmbckz5i2mazyejynxjwvv2xh0347y34d1jmj6fbjgwnfx134ictnpivbzul8tdgivutp08it2aec8xzzz2owbbd0uk2icnxifosw96dmbj3wmdcwt0lq7tz9d7f7zgel6yqj1lsv7or21xbr4rynpewyfs1y7mf2rdjlpd1hhnxkxtmvgctfmhkxgqo5wq476cduwqz6mk',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'hlgdh1vq88o0dimpy2k5c3cyir8gw0jt99lgyle3zxhrjvcl4j8ne15g82q3009pwpnwjlwq2yr',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 999219,
                alt: 'nv76qdeutvral1p32x1hg8fp4og3f4mwtbkn8g7nj4u12z1z01buejun1yo0iykx5et7dhys5cpi80op6bzr6v61zzgcsk8hknw1h9txkbfin3au5xm54d2q44oaapdddrq6994z7u4v09ageeytvhtzyhje9pgyko316fb6vrlbaa4qfv8s10p7ycbsymonp7tqu8l2te7j7wzm29fgsho4zjuyfwwl0hdtw74xl1i4alhk9zngns60tm06ync',
                title: 'lklspxcgxy8xoll756zc72uhloest3wzacyfij5rvil1csyyd5z6424u46xbg1xxh4mfpw15htzxiddisdtn1ec4msrpjou0sqto498r65hn7zdvhka9jnm5gqp1bkoti1hts9nilfp70mpb9dcoretft1dj0ujx3y8ol7lzfdnfix6u93t955qnayxyxh6ixq390hc7riik2kyhku3yo0z0b3vce3hdzfgse5yoa4rc5wpn66sq27suk4wj1sq',
                description: 'Voluptatem quia quaerat ea esse reprehenderit. Maxime placeat id. Repellat et eaque quam consectetur laborum rem. Sit suscipit sunt dolore dolorem.',
                excerpt: 'Ut dolores sequi assumenda delectus earum possimus soluta eaque velit. Inventore occaecati eos quia voluptatem. Maxime itaque qui reprehenderit. Autem nulla ipsam laborum eius distinctio id velit. Repudiandae eius facere reprehenderit a quaerat voluptates. Rerum ducimus ullam iste aut.',
                name: 'tlc6aqnhwx5a8bfcvl7ci2ur8p4b3vkoltl7ck0iohzqbxiogibv8zjfb333zygtrcvskpzq4rgo0x62x77cfhqqj9c6ytgs2j6u884koytclagzcal1uut0t7cdp900que4dwu3hbjp00o23hay57px7pjxcf5cuk0148jxsyd02k7znt0tewvjeu8pof1dp1yf27w6kfg81x5vu2kh61g5mtkjw7cl0hke941h5cj0zhgoy8l5njt6sz29loh',
                pathname: 'md5zkt3rtyzq9qq7zbqknub1atouiw95s4fmopxvrix0qurvj4k3jrl7okwe2y3jfo9haaskthb9tsl8s74hvs61xfojlcs4sdmy2rw5a4gcgm9twqqvvcwqgek5dnzrtdqbfcqea5y14sicgupa0r27ntmm75mdu4przvysrkgm6vr6i57qivqd8whtr819led5l8ug288jcouw9ozoqw6ku52bdbudd8ez8b4d0xatuqohd8w00iod7z3m7ca5zm88nmlh8qkgh4ytvvidl55radz04z9wfoj71tjezhqbbek5uzmhg6p64v3pqscx0a35jjvw2j2iit0ncjos7adrkjs3kr66qdoj3enrm3zz8ecvw3dvytwd85h2hvnksk7llbdxo67r8bmir2hjay4m1gz7sci3oc6ddum2m9lujx0h1dty7c0yik225xjlz3yhzyvd7ddxnnze98wnqttykepcisemg63jd7zx4uejm4143v9in6spcmekht199l3jeoqx33qa844b8ss8877753l8pol7atrv4zo5n3lv7oivhb2eqs1jp2r3cjwk1euz65fic8zowd3fyfgzedm4bcc896u5psugl7p6iky84nzb1jnsvos29w5hpbbchkogonqukkp18csnx5hokeoqx67kmbbuumpgjwlya2oy7viznx32hd543157bcst9bhztfqdyoux5f4x6scojwkv7n7qm3qvuu0vm7vnnq9dzn87i4b2ju6lry6t98hyasgtjldn3wxywk5ludgv5pzjhvnb77h9jd716pt6t436dszslvpu4ej37t8hceihm63wjen4zt1szs1haqmvk65xqyyj4wlvsyywxhbp91a3a7d5b4k69n2uj6ct0q4g358kfchafigquorrrogtozzsfr8w4yhwkwotxxff3nip485m8j42xsvpbx1gvwwct5s0lqlhkz9ocuinqzcasfq1dbnwadidnyvngh8ym80j6wcv01raff9kzss90h8z',
                filename: null,
                url: '5iyz1rawnnv2vei1sesxqijle54p79n1wubevylicb82pfyas82xe1asufege53l1cnww9alslt4doiipj0nfvb9w447petg8uuk9yoa1powib2wwqypgelc3l9mz44fpcn9uifk0wklt71anha4nm5k4wbf822v3xyu5xfmacads3kwr6rxkyd39ams5bqb9h7z30333esn4jw7crpp8ajr113p5h8mwt8z4vyx3onhhfvhvkym4aqxp5ch2d0k1skn6pvnrrl6lzgfqhtdo5l84l7ihbkvteoxhi3i3zj4xphf1m4my1kjg16tkggvj0thpko25sfq5sbba2q9jg5hf30byainaqv3z04kuk1qafeete2otga61n1pquby08oaes0dn9mn0ixnfo1wnhebly7s97x99ibbqnlt4wk7p1g91609v3mtyvh4ersy2gp3i3teipg2xmwtpkxbb2fgcve7sknko38uhbldgygr9o6q4k3g02wktlga0ramr4utcopbg54ln9xbd0lqdj2vq1lv8z6qonio05zzron9ccns1jdim7mvdbo5pmzib4u7g8hkqnk3nxalwdo98gp03f840v9h49u3nu19eksvkk0cet3o7b1cpd9cn8m0i2rm867ikza5ohrkj72to8oa59h8on9tkmcopynkwv7eptlwhegndpzp7p28p60h8ss4p809kn6rt594b4esdxh74vi64v06tjg1l6gg8k85xfb5y6qg6cj2db9myvddlqess5z7fvo9e4gzcghhnzdu3q6670wcj8cf6jv8tqpkx9x6kpnjnol47vc8g7l2ro6bymrk7vajmf2kcowlo7ht78gvy1spdfs8ea59zsgva18fcj5g8moo8h5xj2ifrm6sqapts5qkgjj28iox9okapd85chsrc06qts1jbrqq3y9u9afnil2j7mjiqm67m8ugj9b4yi9fi09y2s56sv94b8epgn3ygpenz2zyibb6y4ypxca3cxv23e8wnrrl',
                mime: 'bim8tf0nvp0g7eqntt7gl36huq0grbk6gnrqe34k30jz3gpa9w',
                extension: 'deeh647qomdpmkvspm8x9olpzdf0m2pj0sbrci22hspemr1a66',
                size: 3000685963,
                width: 239877,
                height: 675046,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: '6vvemfkme208ezta5ghkuajqqe2luae14bicfi6vqh58dtdyyu9grxzui0t63baqescz40g7m6gf20k1cqvl04wb1sa6da6vdcdll8l929hryqhvx2jeq1x93auprqkja2898ds1l83kiuevcvqpz6iqu7zrmvjzbqwbijtuqyup9cqd8hxm6mvn4yv97wv19xr5pufmjggmt5evxkcg779ewe0f3e2sorkrn7gmajvcyg9jb4yajqrg8a01q10',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'sp7a3pgz8r3mmip1l5rucnepc5x1xd4kbvv9bvv8jm6seuh8vz9szdooqvmijhg24f964gkrcfx',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 119779,
                alt: 'gzxly0j548xhphf68t4uorjig2thts702zzjysu3gxybnotq4l69th2v7nb6guotplxan5ptgs8h6eiwd3yqnmgwp84m78y57crlq5aegn29hwo6yk6a2wjebe9wmprfczama0sg1aqk367bt124h0kepkcam88gfmlt79irc3wg4tfti0cgimf4y5hwldnaz9e4pf0fy4lbx0a0tpzchixon141qvlnkg4h4vso7z6hr0h6yocg2x4kcxw71ii',
                title: 'xscvwt6ahai8nin3zgmyec7enedlxg000pzqpcdehji82fz9visj1c74geboosfabym6ig6cu70ens1llshb984ba0bj4u6akw64d46w2hne9a1ulgbroghzlt0ud1yvmo43gje1srm0xaqb7qrw4ise61rw8tjf0fpab0icw57ikcg2kuo733gox635ft6u087tmudualv8a6r81swyj71ottzwvdpvsvv9qfsj4b9potqfsdn9qyxa2wupebd',
                description: 'Eum quia harum consequatur et dolor optio. Facere accusamus quisquam tempora non reiciendis quasi. Est sequi non quasi nisi vero et voluptate praesentium. Illo ullam ipsa. Earum fugiat quo aut ducimus et error eum deleniti beatae.',
                excerpt: 'Libero qui eligendi sint. Accusantium explicabo dolores. Voluptas deserunt provident quis dolorem sit ipsum delectus exercitationem excepturi. Asperiores ipsum aut.',
                name: 'i4jjrgivtha2wnyc57jwfocp547qsl8c3mzxusg8gg02fonhxjmk11lbc72w5nld042f1f82fmx2uh69th6p3ltfilcppxkp7tswbp234x256alxy2xodihbma294b4hki3q5c7uccskxamzhimcvsup3020fsami51j94o1yw9q2ndzw4xfeortehfjsv7r6lf1szw0kl0ahg88vve1dm0unvj56jmv1ungawr6qwqkc3b0r46tu1d7in7tpjj',
                pathname: 'h6z5jn7h6fk4vvit62ryofcpiiye5kje2cy3upy6tc6313d2bhx3xrv9ki2vlrz9pts4s5zemz42j9rptk6tdgh7ja74efnw52uqv9lo32whnknl904r2ycdxqlc8k8sa93nw3vvbdp0kubk215sr0l2jc8z3bkgtjnecpi6hs4ch7318h6juwb7f0hkqdcepcs6ramrw84af2jouskfi6tzg83isaqnhr3ti9sgd8xysxtq6eb6e80crkqf78c7u3l49wqi7q864a0umzyatxtv18gt939nzcmj6cc7qtxrjc8nxv3j61boyxxu1oi2tpd9ab98bkdh75b2ch7ispf7wgabo27n934reeu8pf5m6ty5u1o255vmxsgqxqskh5u0lirfdmjab30cd5x4cqsd8kzsr165ea2jbnhlia35qj2sjfeukidy9g7cpk2yza75fl2qffwhm28f205dvmyqaex1e2k9jei2tkskvcu4dib112ajxuoyxe2cadflipufss9ow1j2unm50csxxgz0md7uwp1u6cebn1howzc0sqwdo5ens19i5t63ewr2hhj2r88548cd0ah9sya2utreclx78m8mz7dvytyt5z6z315oiropp4brandqa6bz6h2yw873szdjugvccz9wci1k7s28e8djc4nhcrlc5c3ua3pxrat98llmdansf51nrht5tqtykb45tl0cm9hkadsccc4edz3dchxsyfpdj24csep634ioh6x365f9ezwpnh5nfka9civjor3e9gn9ovw80uytx8ewk03p0l5r8iwe1ec2sghcvec3ags3rxr0y6r2ei9pzpt10qs6btz72ryay023t7sjz6zsgttszpirn86qpls8t83udnuk3awwh4fmvnm8a0a9lwjlre0a7vqihnhot13hv02aldoorcpl6ogrccaqsv8o94bvllack6e9mfl4iiol47jf6614ru79n0sovsvclyom76yxsv9krsdyxzszi5oxnb3veqzu',
                
                url: 'dbqjwjr9g1ubsg4lzop7c44stdqcouwts5rq6xtyvy1olf6k8kuyv6xxhy7b1z43vbldhqcf5gum7w1ib0it6wvucr8dtiwefmpj4ujhezx46o03g8pxh1vmlhptm5jhymuavcde9u2e0u5fmcbfnaynwezrwsrbutpjz5feupmu869wawdohnpd0252skcyjarax651ouzxilhy96jg6xx76qbrzwvngr92dt08kl2cw9h30sw3tuip34x5o5n534puc0r9haf2gnm9h2jivliijxnjzrzmzpvo1w35f2x1j408d05kecwdgnwqbz6ppd3jbdsekwbrfssiz1ph4aeo27t2rm16z2nfnrzoez3hj9v7nqypm98608clhnydg9j2kgyqe09c0owf438zw0a2z44ytszfxmgiqv5tfm4j0253gtng67exonz7hlz3knua7f05o0boat079z9vrsk4vorriwmf1hz4ninjijd919pw7cz52l18ow51mf7hmfpvp5hnot73nk1n1yq2ui7xuki2cph1jbdcjg2tng5g6sy6sj1eqm0s215fgx1j3po141k6vzsvc0yc78x8ed4nr6celcx48bzeahc4n8cb0zp3t4jxhwcopauhcawq5bl9x4q6qhl9bua2euo3b8mp4leswa1r3wchndkzn6sr7161lbqs125okzfxql4noun99iq9yc211x7ueidd0v5mng962rwkg1hx7b8qbojm484wbaz2wr0599oy6sg62gxuqhvj643okht9hzfr8vbraodt7p8g6457ujcnww7rnvpuncwmoxgjtgkub6p9cotc6i4rbpgkzc6g07qizb8zgcnxvnicif2ej5hhnse7sr8edz8hpoul1krivkv6nafm2slb6bbstnkegdpmri2tgqdw57bale2y7mgf22hpfromkbo89rivvgaq3667ubv9gfbd4pxzeb66c03b666uw11r5nx6pnice1lpu3joxnvdiztwchslnkju1yft',
                mime: '9cach44im2f207jgmwt4z784slqq8ip670mfu7ujrkgou1cnd2',
                extension: 'viq6o77cskd6tnubpzdqc4h2nrwq6fedyhtdeqaed7lahvpq7h',
                size: 5207605763,
                width: 793728,
                height: 328995,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'qzssza9twv5bb6cskny0ohrm68t2u6esgsuw86iby6v0ct57qlbpzzqlxpq1t7e8eevflhynm2u9p3s5zovi0nvx9l63rzbnvzh3hr4vmr4sxkbapdgkt7ewoss2mkv10kawpauyss8oylp6u6u1lqrgt3uv0gy97eqidq5g5v5i3hlkh7ba9dax5fdpagvglqk5059awsviaec41dj3vceiz8nwfpofv14xyui27ko89o1mtsg3yy5g9x3mexz',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 's6awz3h1jx6ckk8g1szvm0otji1mgw5gn1dfmyalgw25julhln0s2plawgpi8i6przobyr0pjga',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 146496,
                alt: '4wlthzz3jksnwpfmeoq2s2wqpom9xdmcajy6wcvvl9dpr1u0igifj5952py7ppp2ns25yvhjeh6tax8piixjjb5unmn0g7m0isw67qn7oy6yqjzsn2y14kovmszor2bs3w85aggi3jylnym9gxvaoh6n4kz2k511unph7db6dng4r5kt3uyq6gy8ym9guvrotjesvsx0s48cqily5vjdhkefd9jbk0xu9t1u13ccosss54i3m84f3zer6w8xtc8',
                title: 'r7gfke2k01418355iypdg8zrkv4i0znup27u3ko2x69kqzdqzuye5o289m6s1xmlpdbhgm00cb2mn0mjqebwcysk8eg5v9080cojdvh5o8jj3demxt4q3za8qha2tbuvo6wsgxf40zc8xliycgcazvm04lqwkc7ith3hq5f5h4m63zbi3hov50x8m3vtp6sjn5tkjro36t67zy1bc6ahk3kfmiy3l0hvnpv8ommiyzm41xf0yw885zflxu26jv4',
                description: 'Veniam consequuntur et ullam voluptatem quas quidem. Sed illo nihil quam quo vero non. Quaerat eius et quod id ut totam facere ea. Temporibus quia cupiditate esse deserunt aperiam fugiat. Beatae nostrum placeat voluptatem.',
                excerpt: 'Soluta officia ab qui hic rerum nihil et minima. Cum itaque magnam consequatur itaque. Delectus harum sed sit modi eos modi provident vero illum. Autem sunt sit omnis voluptatum. Dicta totam error et. Eligendi dolores dolore in repellat repellat qui quisquam eius.',
                name: '6x8d83wzmfukkjxu1ih86lxdnofylvue7h8z13rq0y07j71e6ifwkm1pio4vthsibgxl60ep3qgkh3qm0haxwuesxpl6n20chra00rsddsc9nbc5t0rsd2bnvrutwmy5epovqb0m3tgzc329lfrmlzfa1srmc6dlv6u0bnq5ea7h1xejrhvng95ojzlnsplp4121fk5hjpgujlu4zx6ti0sft4tlt7za4i7pfdi7807wjzigsq446z6joyaua2a',
                pathname: 'beqdvlfabx80yw0ek30vzh7m2czhkmakpclxelzbh9802t13ghsxe8esp5cf9m17nfs2w9p18563rytu6f69oqn0k9ejd09igop0ye7mrtd2hwxpmpfniqr5ou3bbqoc3iwyfokf07gbdc8nrlc9jl4xkw52xzrz6x0n4e4afx8zouc8varru5u4hhk2qdasaksp7cm2qdbdzr962uld3v646m150w09fj1ob5lfgrvlvlu8qj8blxjezkf9lnu1trt2749mtg2bkw8cehvhaikj7g0kkesx1q0x37dyiw9fbd366utjcwkw4ypupdzmf913mb4sqfb4v3v8lig0iy5gylrpfyvbt285wawmhkaphd2u7asje9zkm4k6rm77mb2akwyupg0y03e25b3vgrxzygl64m4oiorwqobxpki8k95i00xea50wo52z2bcg4qn6vvfueob3n5i6m283b2byczm6exmltwmcskxjm1zpyaezc5yymhqq8if5b4c07ock3ozpdl3pow6nhavr692b4683ya3r214bbaw48ezwlxhrvvjtovz072r689oyodavyas6sm8075nkepjgrd4ikcpre6nu295nabu2yxfpc1e8p0vr6gsfhdberdlf9vh89egeo0wr2cgs09rsjguwz47mfq1u7vy13wwopg5savld2t7lp0mrxmz3f9xjyunliutxwk0mrxgw32nkpxvwbqx4cdlbnov9zx41k7p60thd0orz1b9olwozqbneu8uf3bl1pxaazk424ohvysfe5anoiwe9hj23yeikcjhlsdkc3ls5ttlpe7ea3in7pq8gj3poxgas9qaw4qxwxxmawphoy883fy33ure2f8q1ccomcyw3sdy7k552am46ohpjr4dpsq2b0dr95f4e1rfvzw2j36usnn477m17lfc46qx0sfquzho8vt2zih08xn46mevxb3q6o4nwfppgx2y80icsanorww7vb8751lzrtjszaidp220lhsiizdml',
                filename: 'xfp1i7aw30fielg0pcp5yf2mukrd29z9elll3n2p1sx7bdrxrm0y0fzamn86y771qxfq6w35t5pqvrpmnuaqezii895vzugcz0theg5se3d3ix3rwz5vkse1usnijomshanagr6yeufnvge2dykwjdnpybhjfzb6ttpie57psay4d9gnw5lbofkbmbsxivfk3xm7bevcqlux4pgfhv82y1qchnge8t3325kh3c21jdl6c6els4iyj2woj260moq',
                url: null,
                mime: '73ulontgpcqqqqx475yu2w0cjnm1ld5pfqnnetw2fk1dw9aoy0',
                extension: 'f9yb574395eelp9hoc4hmpdzbg2fh3ooivuhlzv80vxvo5v6nn',
                size: 6324494804,
                width: 309742,
                height: 265552,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'h954qx26holsqevle5de20shuuw38aug1arf14oghx972q2amnhy7mllz7dqouy1w4c7r5x1t6ww4oo1btmnj9qfog5mxczbdg4q7xry3ly45gs15pjtifr3pxyslbv4xy53zdxpha253qxkh0tm1vyv68pz62ov7p9a59rqiy7p3o5jx93nwdfqb2b0ryj6jjbsom1vua243jnbmy4txage4s9sxmokv4p88j2fpnug3rmzzd8mm74g9rymzy5',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: '26frtmivljcln5ogpcy3jjy590qvudbv7cvyj245enx6mm2ko31sowobildnqms08hvxd3qf6cv',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 977358,
                alt: 'fbaftv5w764p0px4lttdaror4rmitsttby82isojpvuuir5s1wc87pean0ay993ay3zkbop5zh52zrne3mzezd9q56r77551ombnrsiyqw7b4yj9psxe2rnpn8j1ya7fx2zpli1s97rg4judks0rbsegjwpz9l0vlhie1iqyj5lia6ig69mw2uwlp8bbqgkjz1iuose02ukktewgh6ea1m43sqk6whbw5o5htarkx1iqbylsy6ojtswbwumtfz4',
                title: 'mkptscyfrii6n5shpbtgmyplik72rr633eogox8tha66l6brfqx8q9wuidz50kdavnq5u3q8bi8sxhk73da99f3y8526r4cnmtnjg2dzq3nh8k49m1py3f3ujylsula1auklfblkyaggqg8o16tuhdn7ed11ocd2wxjnl4cqi4498oxl6xo6wf15m78ysmzs4u6kvadlggrkn5hs4lfbznz7yncq6ugo5xwh7sjp8cip6oouqoakj4dzq5gm3ui',
                description: 'Quisquam sint perspiciatis reiciendis laudantium delectus odio aperiam nemo. Hic ut ipsa. Et odit minima iste harum ea. Sunt qui est qui magni rerum quisquam ipsam.',
                excerpt: 'Numquam quasi nostrum. Quasi rerum et vero minus. Doloremque quasi voluptas pariatur quia quisquam debitis. Unde et nulla vero accusamus veniam culpa sunt sunt.',
                name: 'tqpj2rwxxouwgkrwfm6p3686p4x3hcrwtfd3hjo87lyoywwr2s72lpm5qo4q1ldcyyuqcizlb07cmxy8c9mx2tjwaaotjc3y045hxj5h0i6h4jy8jhz668n4aikvebhp6iq5oun6vcpv1ow9csx633vp64x1rnxw9jekrysg22v107idbd48d05ypmjuvjvhujb6swdic03zwzvf7yw5rqa5mbn82giu9zma6uzgpyyvvlxbvdf97imp3t90qnb',
                pathname: 'p9se2teex0nylxn006vcjmk3bysr1ukmfepna46bv1dkoprqcwh5pk371sewa3cm6i09ahpo4jlbj3bcgmmkozi7lxmkwifabrsfdgacx0eowwm5b2vmri5k1y9qw2dbeghlie4ybudeqj8e2ksoae4fx9mraxtchsdh5iutni24ssm5cghkz1qxqq0fr1fenwcph2m9jsngrxxobwahxw4uzom9uynfge915vur4k3iqin1dr5o9mwhyfk92kq73dtfx7vbu53k92aa11zequtn4rgcb2cal5kqw7br9kfdf4y4h6q6ik34h5lid5wglsb0k8k8101rkxq9or23touqd4qb7qg3vndgysys8it3w0l13blqsfnm3rskv6aw7cdgwccyqu6oc3kousu8bxjaaeggpuabzt4kdwfahj0qnq6yrrd4859bpjnj9p98cmtey9gv37etjmcbnvgwual3lpv3svzmevytkkxqmavosg7aiokru5knau3ne192e0n53ahq8f01jtnkprj8h99dlxo9u9vmqjlr5mrdybi9nijqfxh1zpx6kex3424a8d9psjxjq6y25vnl0r7bm9wsk2vmsgam3kydwzsrfhuch2ttcit25w3ab63dwpbde6tpaklrp3n9xo32erf41j5ev4c5nh937021d49y9nqaxwisrj486vfri5tf7htoy6cwm0tgncuxzaalio5v87wc7j9co9s9n3rzkhhfmxani33eqyxdf1j2p2jfbfwmjlwos1kee7dgh0becnbm3zizbdhr7qhqpt8jms7j02v59yucgg6xdh9o7le7oind1zsghqd69rlx0r96ybyjvfcoigmt824shyztyuccwhg2yjqb71fgx2uvpq5xfquaxkmzzoqg5db04imo3ajfakqy8ddvlwoyyfv2qso0cpd7p1z8xljm0peg0in3lynv54dceczvsgz8m0scejswmhxx1gig66mt6xgali5pu6sh65rcj8f9i8jy30ou0fxh',
                filename: 'xuj1pmxlj03jabwisk0qdsl1475xi5dh7mlj8zjzuoq03owimufrgr2g8krw1n2uogit6eghwyvvdx5iokisvf5xkrypmosqmpst8fp6ilinodg0gok70lqyfni673lcc43fcz4s41pripy0nae2sw5m0v225cnptn9oushbpksdws2w8b9z4231jy0l8jq6dlbmzl20xxu5mpotciiutbaubixaisz2gqnhop9j9soi7rgjbuxehrgb1s0w4on',
                
                mime: 'cgtaza6vx1gm2n46ygnza8mjaydvb9tv8s4r4el50nfts1d4xh',
                extension: 'uf48tz0s6tnbqaxgkiprcl12j1fisdq9oefzl98wl7uih87a28',
                size: 2205042434,
                width: 643322,
                height: 925823,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'n588o7jpff9ofc4vmalcr8vfkonmd0bnw39d2s0ej0ahctlqa33c4u814srmhuaiggrqp0ilwrgupilsxtsq8qfrgi2w70hhgtd0ylzzwnmc1r1pskmok5qr537n1rmp018hyqax6q775ivoagf6pbc8ketf7gy18kln6e6c2ukbvct65wc80jixrjf8lsqbtzk6vugyhdgng7goi21n8f5i1lo0v7pwwh2kck265w2fc325qwu29hbf6becapk',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: '633qzzv71sffwne83qh1ehsat5078w1vcg1uxkkj9auorqo74arzp3x837rk5ejw8qvb6wx9shw',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 748297,
                alt: 'cx6tw06nji4pu588iji6ht9kn8a9713dx7w7464iks68z7mz0cnceqvdhkiocql5y3lmmky62m3yic2uws3p8xevm4x3qhmb265siubsccw7vj5yzo6s2r1lxye73qh0qu330tmikfsss9igrdqhg428wgqt7972t7eb0unp4lpv8mdg5wv5oaszxmityeg36hn7v5leke8nlz780t2yncw41r3kg1aqwp4gd1blzyrtnf3pscpuvdrieep1u3l',
                title: 'nl3a54l215goqsm4jq568pctmhs77u6pdm9lyrzrsz1dh5lwrdrdftayh5yb3apa1y215prafxoko3450iwf4pfki1g1kk5mby2ppx9v4e13wd335yl7q619h5iy57tpt83uisvnrkohevib5bemzr5038k8b0ijmi58efuedyznevscikagyyivwvetkb03jw1896bzr2i993bikz6n3pn8elsp5aydzihfqa3yrzvclj13xqy45tjbzwystzq',
                description: 'Nostrum mollitia pariatur rerum tenetur. Quo voluptatem molestiae non quia. Vero praesentium repudiandae laborum facere ad molestias voluptatem debitis beatae. Pariatur ut qui.',
                excerpt: 'Excepturi consectetur numquam. A dolorum qui id corporis rerum suscipit neque. Consectetur ullam et soluta vel distinctio consequatur architecto asperiores quibusdam. Inventore aliquid iste et earum eos vel voluptatem dolorem. Nemo voluptatibus sed.',
                name: '9wenviogfm4b61igw27x1f1xshvxozfivkyrapg1wstgodl8fh20h9t7txyaa49ddc3z67ey1edv7kh1bj36c9cazibq4x0q4lw7prjosf7n59rusdd8lcw1kydsyulw7gprlv0jt0h4fh9cq2acirj7jjnvvrauqz68pp9ddz4mqg9p3tz5p7a39fzyfrkn7gmc7fd1k1cf2wedd7i95hneo4qsaua7fgj5p79lo69cvulwh7d6hmgdn56m62z',
                pathname: 'z4yvjndbhj5lipopm1u5nq22dqjl4f8sqibko6bug5zbfpzucd9r6y9v1k2slvu92gqi4d6tpm7ziilxnph2aeopyojxtu8dv33jy8hkjbs7d7yhbw2w1igy6ta9a2sr5xgg3he340muf1p60trlvmhxfdqw0kgt9h0nep4xzv8gymeysss5xd65b4ss4x387bn8lslk80zws5ih3jlclxdo9v6q3gglgopgjrvozcys9zexnyqnc0lqrtczex83fp0g4gqwa1v5gqb8mnw3i6bfwljs7n1biuypavkvgzpthj2cbx3lx5pwjnvl2qxenwrgtatkqxg6un30xe0y1ejd98kjod7fy5akfam4zc26xsnq6ges8lv1a9evgq89qw51ajme8hm9u3gsuzo1a7n9co1tja8l6leiirsvsk7cgpfdzumub3zxgpamb0788dslcvo5qfshdhv5fd2ftgshx94gq2meg2n3idg0elcsd57j7yncegyovr9f8g74ere9n8602e11svehwk2y3itdzvl5rsduoazsa3bmulbqesmuwk5x9vx27hjkzjp5bmyrd3s3stokj3tqlyan2ahhf45cfof21vsx1hhpv9wfalqnzl1avebgqkp5aw48k9oajnnagl81yc98d34it7iq1xuelyeyfpn40uh7ln2wlnx283bzxblh4x6blo46ryhzbw06rcbj55o0od4ua3kowz2gukvbyedbkxi2z26nh1sfr3r653fldihulrg5gd9ipfwv80b7qk0qmtfnv5atvv06xc6o6dq6176g89iko0li0i3f9t12zh8puhnniwd6omr189yjwxxnt8y6wvy5c4hn67y2xojm3iqj508jgqbaz0ixih0kav3f558ktqhncyilwuagwpzitazqsk3ztjhidedo5878c26ntf4sagjh0je9fvz4sa48v0scuewjwh7hrk0va8qfcj5d4ybyal0qxr87moa4exlod3megsh67iif3gqtdlvbv5h5',
                filename: 'h2flia14ylqjrdzdslzjzdlozt5dmyxoa7y9v6ensxq2xc263heqx1u87fqjivo1j8j6l1h8oehlylb1at9geovdaoof9o2w6kd088xyksdo2sym3pff41ewzg5bg94xomdigfzloaukw4r17iw575i7yynnt0islanzs1o1tvll7sytz113rwinqsiaw3hq3hydkm1p1nnmgcdwiu11nzf66wnhykuz8vl6krn5mgxz9pq0s96mgv5vlvlew9o',
                url: 'bnux7uj4yca7ip4mv45nmrsf3641uyjw54wns79elbmxlmqhbne0sinslcm9v5txiry1ksjagyu7reo0prgnl75zsbdvzjzl6mdlo0hxfpdalpmeh7suw8zxlt6lig0m1g6pnurf1shz030jl07j6sm2cmatrxbofxo3sr67qlgv0gw9ekt5q26sdl6upfn9y4s9hud3ahzgoatnybrxg2exn63vbe4c4p1ff35qee0akz1bkg48pfchezt3uksmc72dtf23y0x14lco3cj5u3x6qqyzv72a2ea670cu3sqfdn66ibttvvpudhafitvxled9y43rlb9b9ujxxya6g97fsk78jy8aefuooa8cdcpd5o41g2spg6hzqr9mhk2n2kp7f39u6zeq21124ivoguddy0mw9ds4x57j9fdxze9f2keki4gdcbfolyw5p7w487s9gx7ofdmp9vrf2cxujlitl3f2psqea12fvs5db9r81nqe68i63k55v6p72jv3lf0hkxuvazfq7xcwbazg1xmqd6s8w54agvy8uw8ri0vqyxpwljsxfny1ywd64afnllctn6h6besjwdaeysr5ak9xo6k79j1836lov59sfdwv194qw87hlogttekf09mwxb0jhyj4canw2gbnk5ubrt18yptiocsfda2i4r06bkroertibyvpchx4m2gepdgxdry3gu569an6f4gn0rurv0kcvs57a7vmqdwjmlath880bxdd0g24trwqafj25ut2me4dcca08w053x0lank01avj1u0qsenjm3jhvsy51y7o3y0jwwakoa4cwtyow8isbte0u3lwhzhr3p3jaelon7ub6qxxlvyzudb5esh1av5122scrd1l58sqz8pohcq6qpxoj729l103t6bewrq9jx9e11ok00ctopkz397yya8zxwxoybx19mv2i71e3l8yvxjvttajgphj0336y5mc1ijekry13ntu45vw81srckhbio0h24tvhza06am41acy',
                mime: null,
                extension: 'srpngc486ypovhylnc7xhiictpesppepen0vncaa3yztv4dlxj',
                size: 9047475387,
                width: 290121,
                height: 541343,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'l5jeot3m8e1ih14o7j78nkoeeimczboctrby5tpq7146j8fnr2wk6otrjb4go7c4bilpje6vdagrnukf3z53e85r45rmfne7dnwqvc9yt5fgfqzzb4qtq6e81e68h9y3tdqxg2ixwgw2ggg3c5rrsy9sf1c5kn9oghflufgu6220ssfgpcftwx72dscpd1kwds5cnn1ysd1ocdp3otz0yfpcxz1q0v650dqisr2y322jyu61u85swzbzxn3tspq',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'lu79qr05uf5qu3xw2e88q370j28znspj1447pa7ifuqz34podn6hppsqpej6mnmlxjpdn29jmai',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 431388,
                alt: '1h7o8ounnzpqq3bmrq74gcbtyhb1gdobtvjm5vseyzbwym1e2i4yz6v72yvz2f0cjnlmcrv5oylbtarwmu3g8hcfjvaoqpykwgz7wcg7s4vmx1elukny8b2prh19epu8rxbf7g87exmwwbridnvs0qt270r9gh074xxocnl2tqnonahfsodd3pyczij1xlin1l4a2z94l4snuei6akm44z6s92izbbexr73jxvol7day1t7dvh5204odambkgs8',
                title: 'egjrgr5zcqkhrzkcqftxfewor328i12pzl3qw8uq5828f6x28syj46fhkr2bsjtbnadxudo2e1mt7x6hd9ygzkr6prskeyj4ghwlwavfhqcs3rp5q1tqcdpdwi4jpsm5ru2av7klgb5yjmkmoa18lehtrxl1ftbypxf2ytek6wia9o51po310dcpcffu58fsb0zdg9ju3n8a45u07gzz8o8pfrhk3u9wwbxvq5fjbwhx8ji2u7ww0d0jd5ft8n5',
                description: 'Aspernatur dolorem corporis sint. Quidem ullam commodi est sint eum nobis quis ipsum odit. Officia repellat et dolor dolor fugit.',
                excerpt: 'Earum rerum quibusdam tenetur molestias. Ut iure porro dolor omnis quo. Debitis vel voluptates voluptatem accusamus accusamus architecto asperiores. Illo laudantium minima dignissimos dicta ut provident aperiam omnis sed.',
                name: '2pddckitsqmh4hmgdzbhzbqc9wd57ccbmyxqdxpmkigt3p5c1s7e6jb6swh2okd2imq3133t8nnowf0riy4ooc8vldgsgmikwwecgdmnq2dqb0or19duopwp5vc4ir8ti3xmjnpsxr8t8lmxkbbp4benanx799l6v3p2y0oimo9zeq6ag246yitm70evxgdq7mnrofwv35dt0d5tumy1vuhegov4nk4ch7l04qbqm7ze2yr0vlegco313swc7ks',
                pathname: 'z08zvhdzcghdxbj9xd5kd4yzfgqy3qp4y6m1bvkn1gldxmhs9ceg9mfd9xudv0f0fs9eliv4bxycfv8a3v4z41tjl205vu2ezu8opk0ukugcdjtpk1npwkn30uarzvrcgwf78z1twrbawevlb583w4xskxhy91kmk6l3fdr6oekhxtg32vc38x5lr6k97ts3s6ad4ja74x8srat2eh1qsparmfnhchf6gskhp81nkjf8xgeokecb3fyilp7uyi9d125cv1qxhovwdsxz4djapxxrv7amcgs1qtqxf3o8drcg9hmspvzzd97dbd6wf96ty17fqbjvohdbhom6alrmtn474ttpl8ztxz67w2bnqv0y02ykg3ui8gtjm4f749sf41v0uplr85mdl05qckbetp4zp43f01hici8tft1mleary6gj1s20t2i6jaawao48nnc0ek5hh74eeaj716xny3se2s9eupgbh0ity21tes6knmeoc2tt4c8mzlmmxvyckldjg91iltox3regz9d3w4rlsunix4fqvunzrlu9vn7sfxohwyic6kihfnqk3f2tcf5xpkb8k5t979k0h49ew8erftv1i9twtb61q75remrd7cb0jk3kezptzmbfmac96u84sjnbq4vaslc8p0h1x4t959qoalec6dnq1va8brobkoquqedv3rm1zvti50faa82ogfyjbzu19czxh1jtfku616ykia2kvmwctndiwsitddg2vly0eosdjm6p14488lhhsl2r9raivhx8i2ddnjv7uvhh2gpbth02ibfq0s7m1nhkxsazbmmylqe2y6ghrbksivlkei3lghe2jq7nxy0ldgdkthbgmc2yj7eqchhe4e3jvonfy3zmws3s2ydxw3xa62ov97zhk0gn6jhrofmzfvyveguv13k7ywclqfwlxh6na47u16gbnwe54g7m94vv0ni3u3jewzth9qlu0d3jq25cqjnc41qo0s0bpzbnvdi4hp3pa6fogg62op77',
                filename: 'jrjcle19s8hizjkhv0qfb34jaity6yj8ie3i0a9s7aoi0ahc5e738b7w4m84ekj54or0mdop0tflkycvs0pakedmi0vgxlup4cfkx9ft68mr06cxk4iip02dj8y69tg6cw57bpsfdzyllp5mml7sp2vte0y4fvziw5rkl2ufdbrrwniklesz3k52hny9xil4pzqczb86t04ir9lzsk3zv6r96ocnb1f8us6jycfezmnxe3jre26tlmots6076em',
                url: 'sb4f4z4hi98tbyyi5ss4mfjvt9q9jvwnr5or973djqmclpuc4gbq1qqvjxq24w45fy1cvrvvpby73b26em6bt8nk0a0k8xwwu4jxl4s0aq4nlvtca881niwki92pmgyw6on63smygl9ieeywvhcexb0iqmtkup9ujsksanflywt7zxk4371660rb8lwk46iib0uaqw8ee2v4huu1jubfialzuy0n38d7ryw8212lux8wkvsa9lok1u6ex2subscgro3lzdbzgoblawnlf9y34klsnbm1inyeza3d6ihg3sxfzhd1h6i611dkh2i5kyl1u271a978kdlpu7se4e3604cireq70herfxwrtdoejurd0h9nys2jtvvqx97gnxezooehl31osnt5q2uriauj9x5jgpv5896lbv1o5wywzbdkwcs8msf8v4s08rwolh7i8v5l8w8irn3fq95aqks3qjfq53jwpw3scqxz8ugibicxgwtnmbt4ukxszyqi8u7kqvgxoxuveindlnhtz17nz42ny7nrdliognsk0w0pgqp8oyzywig1ib1wa52y65a96y72b570refhwxwqxi4j5mnlik33al7z8yeal1mhln742osi3oqugqq7vc7nnt2g92a79yl4n92kndzpol61aezrzflkehnvxl6l31i171rcfl0pjdpvucejopc9qaixxpd50pdve1x0l94n7bwnrhkl92wxcijar7ipyco9disq9nul6tpkwvd6d8h6jkh9me1qez9v1xmw6wq6hpl7r8rt6p9fmhipvfaafccr9426yojyi3l9hnkin7wgbf2e2k48x2bof3dp4znl70y6j97eza5dxu6tbmkk84bpw22vhoewcw4dj3ph9wfu1fycf40hvv1tho1wnxylm3fbx36x1jj2gy6z8lcl2q3m9awcihlp9cc7r302mwf9b7o8zmp7vjmnfiku31t5is6lhycbvp64s5cm7rpfa5ecji4md67d2pb2emmywyn37cwl',
                
                extension: '0l5utvlb7j3rp9wn5wxm7ug999xmt2k2c27g27oy86owjzod1p',
                size: 5369832796,
                width: 280509,
                height: 556415,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'gtl9alu9k8ez2o5058vhtpy670ldddrwnil7jyhowwj4rcyx1dm7i0ldib1a0yijwdn40lmngkwq045gf41a88lhap87xrp4bq1scp26tey1hv06nku1md4mm7xbmxepnzjyai2w0u40jxfgwaaush31dct24f7w1czg6rsj8cun1gmlgdtn8gnam30mq4fk007g3u9itwsp0w4b5mlgsz56fb47zzec635hxpylwaqmjf9saqil747cdawssnn',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'v115p75ozjyyz9zs7k5opxyua61jo6s09d7pu2rw0ckj0omh0kq62oi0hf3vpmpjr5o8tor3iab',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 477929,
                alt: 'd2ofizwl5wnwm1wgj5foo23addrxfrmg724ylvu0zhkgrz1t7xravinshndumoz508xs2vhwo31n7zb032788x328056s4lzbpf1y7r9l9hotgqtmcdz66iha3qd9lkluei294kep7cj7t9dd5ei7ckow0ni9xmwv33p6thxvfgvtm3k7voy0lfdgo8xwoh1jffa9hl3hlkxxqpvw3sgb51jv95v3o7vzl3tne5fs3dg1hrp0p3wbl2xw15v335',
                title: 'ys3qckp0pi6zxb3wad959i8xn8hezp3qpy81wm3jmmy8bstajr61tgbt0mdaxnkyc1c0jjtyh32dmz6indwemznweuebud3ou98amk3aedqbgzwy74bmn3astnuy5aiuvf37fplnmv5doydbgv81nd665iwjzethq4fzo2ew7t0pp4xjhtz5vz6llbzqi6lorn6qi8s3tdyww7go1ueanh7hfqej6byxxp0oagt5l7rarcvxh8qx1xiajrtoqrf',
                description: 'Repudiandae rerum rerum aperiam fugiat ratione corporis recusandae quo. Est possimus autem. Quam voluptatum velit consequuntur voluptas magnam qui non nihil.',
                excerpt: 'Dignissimos est tenetur a. Facilis est ut. Velit deserunt excepturi laboriosam accusantium commodi reiciendis sunt. Atque atque quis et nobis ut totam.',
                name: 'yqj3kvsvch19tcv9ppi1d0ia9iltm1zzh9enu2upxb7s61nmt2nidq1od4xqx6f1b5qmccn9r0kpnz538twb6nwos55d073gtg1vdehhnupymlmn790hytowvbjitvy8gcitdqqimn3a06m1m1gaf32pfiesqzpyejlte0zoyiqtovzw886dk1verg030lntricx3zjmyplcep7sat766op7y6ur0cjqq10rmvugxpw8klq9xropkzym6tubn55',
                pathname: 'u558z5jrir5q2i33bgbyfimpypjaoen9i01mlgvulwarr9bstznn3uxhi0hzso6gcdmg4edsb4h95lijvwwk4ccgbf36tiiln1y1pol1v4clu980vq3cvcdx5rftaqvx61ntg6q338ib43fh2y5eg5eyavon5zr52x90wp3j9qecvxuvhsjfobx5ax2p36fpnevqbnwe2x9y8eseegqaox3yczva7rzecsrlfdg8989qm7f8gr45rtzbvvypcgb91vwlxxfjdbic2fi3f1mx79cqzjbxuud9qu3yojevbvs0k24y31c31q7jtyi7jwat2587gwv5gftb9wslgg7ziqg12lgs2x8hpxnwsxr4prk0fy0rs9ya2znqo13gp06k76brs203nu5drovd3jc47e82ech16nuooacemqxywqqeowec5c63x99ay2yl9zfgpa9k5vkfajdnhryj3fbdujr01c7s9a8h9vq8h8kaekuhn0qaywbxepp77wzw6e63s23z3x3w2maq5kfrnxke29id3fjsfyzg93syx9g8mglm06wzz42k1n06op9ecycmyq8zauc5kum731xg4uk6rl72mq8i13p4b5ywib7ztinytp4fhs7jj0nehewl8j1apz5xgcf3awixjodt3kfntmezfpwfy3dy01jiw1cwqj1s7jhh2vhvu06k063swdn6gwa7ifl68ldx6ihp8gidyp3i5dnn5azj1f2df8etslsbqbtk5z1d7neg0auc4lnl4j35cjouvb57ns2kd3s2fj5xshpvim8xjgj41jzhnoqq323tcwrp1x2b59ema1g178ko1bgw8s6i7cgqln12jlkqbkf4dvyb84dsu4krripnojskmh1wqrygz45dswjpo0n7vs3ylbnhubkzbffboc0vyjf8r2ecfta3ioijwi2lsuue7zi4z6t2n4oocuc8s8m24ki5986p5i4jc09jo7fiib9h3p1aaqe327rtjwg6ny1s4i4pwoc6sh2u1paw',
                filename: '2965mbtxaljr6f9i0ivhceqisykjuw9qn05du8ab831urza9qco2b8qqqjo7d2bz2ya6pgsq34ih9f682i9g3wpf7xmnq6t5zgmj4unm1kalotzixb21ciarskpuqupnfyhi2ljgcv1fwvhyths97a3tqmpmto3sztb47a4mzmlfvg7csw9gdkql43all79xpr5bhyjpc5y6qnle2cynitfyoth6oluf56h13r73uuqhuydr7xn4s04k3ave1xa',
                url: '951eke1t2v5qrs2rz26yw8lu4uki5v6f5ohx37p2sqco333vgt9n5eev9mear594kx5aa30kr7szdev6qiqga3uw23y1l6u1fxiqmp5002xqlbu1zjtgqb38t0xsz4ytubtt6hqgxan3e92zzu7fo6lsqbn0di5it8ns4fzle9bc9hpf7map3arjgrk0u1e24w3fum1ecl2mqwq82sn1gc6tvryea9fqxlj7ss980971ph4mihyqh6ilc0onfzyh15lfxd0eam3rampvc2wks1aqlv0w9dtkefzltpg5ix4ne4iw3aumct9jbgmkz4jeuajg4g9ave712hwg7v0b1io56iqhbvmug8oa9ajt2u0kc5kztvvgnl8d6fvw38w7fesa3z4x4ewql97cwaxo5w1ncfua8g75ql6vuqdapgl9xqjuub4p4fwdwfn42jiky5r9xg8fsdfy0v2yofiwxbmccvdey6bjcglqq6xrb39g51y50q9v7vz809fd4rocrs8djkd35qrcg85j7rddobbk1dxqxcykorq40nkey058qtnzvecazuiwkworbj74ahd82hh12etbymwedenh0vj8s18lbjx4i31le21rcay9yz628e1s754b5yf0goy3yvd1a87rcu9tapd8o9k6k4rapk8x1qpm1x50e1wvliwe03vg50je3vzn54zgk6rxupij7gbujga9tg2hrrsfj6j2i6rrv76qwdfq7bxvb6jnf4g0v92vrq5gxnchm76vdi2s259strgjnc3s5xi4dy986gcyhf5fr4s2n726qk9palo7yh3qhrwhadlvky49jxpkwx2ufvm4m6btj911ai9og69lo1vis2ux7kwoz4vs5ga3kcuofcv2uiwvdrqph6rkucienmrpg1nqtt8fwa4reqr7fik1epnpvz7n7kdwr5bprnhtw82wa4ie7cks5ylogda468dl6bdbajdrz6srubnqavz8b8hf4vbhk1xto4a8fvm6h0fd1audj7dy',
                mime: 'f3em7zqdkguo248ta9196jib89y913o718gpbktrqq51qehm6k',
                extension: '2z8t8eb9oc8e5k0xj3e1d7fgj9943ptdvvfs2yfcipyl2m8e3b',
                size: null,
                width: 276218,
                height: 321855,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'faih1zyo2gfpr3thviw7orguf6prk2xnn2xb1k48u01k7wbe7va3xl5a3268vinco5yyvc334mncn9xgfrasyjrntbxa5047v6po738awssrvbbru4tt4zt9v6p1xx76uroijhvlfgbtkw3x2zxodp9cmer7369emqkj02nk76czjhqe3xb023bft3jaoe7eztl7nxhh2n5q202e6lk22u1im0huu7b6jt7t475s1lfchwe8oovj3f6ozhp39n9',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'ij578gunpgqk1egqy23xm7lnc1i2xxi6x8i3dwcykmsjdiyirnsbvgvx5tlydbayhq1tmfozoyb',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 942564,
                alt: 'qqx9tz4zd1eosq19uq1o362sy95ilg9kvlrg1zihpmgvxglx7mdw3aqxd2gj4jb0vxqwxyv2djyas8kzcy5xu3ffio39de4g39ek9dpyf47cwayibnyjhenjhhsdhtk53bz0503d6a5qryj4fwxevg6a606xc3ev70rmgmpjazvzpuxdkwxbivbdzwd1i8z7rrlut5lofcthnzsud174tnnek7insm4vr2gfs3h7ezybkblld367r2a38iwgrm3',
                title: 'fntft8h7hio2pvwh95wrv1xx83lf0vjpz39nafx3fjq31wy349xsoi84pbavfg8uyhlkybsb4tkeyoffkzvkh9z6uvpc5mye7ahl0v6n5yrnf570t3mwdt5pzyixserkkgmmm9j6463edv2ndrfcmf7gusaijqmng1hted536dhr1wqdfk7y4d3ude1fq5x09cyxj3ktesvj8citnanhn4nd7nqk4olzildypm1w94hy35zeb8qd4287z08mbpi',
                description: 'Sunt pariatur qui placeat consequuntur aliquid amet molestiae magnam. Magnam delectus aperiam pariatur assumenda. Rem sed possimus nihil enim rem.',
                excerpt: 'Dolorum sunt magni in consequatur voluptatibus expedita itaque perferendis. Recusandae excepturi quaerat unde quo molestiae. Qui sed earum velit occaecati tenetur ut omnis.',
                name: 'oypdmi2x94xhiq2oae5obe9dfoyffl623f9j2uvkmb1je7zjm7zup8dioehpldb2e5h5qjkg1fjfwglj1rlp6dnuj7o66mn367sd6gurv3qxzcbdfxc39zeywwaouw99mvhn3f2m2tn2r1von3x3an2migig5ueioyh5svy8xkz16s6jxdn7kfalymz712dnili3sj4w95r5knd5ck4gg3g81ylsogg7qi9tn6h9bevhg5tw845zucxvkb7wv3q',
                pathname: 'igui7sgwu96ajyxki1o0bdo7439whzhczhjkoslx93vkv1pkx7gdh5w0o88uba1vw1nrw38r5iyjtsbu5fic2ckvaprbffxxheyaiw44mdcmj44yp4fhca92gm7k8djbie9ickgdyiqt3fhegk4ib5n5mrfngck11qxodhobzokgn65yh7cvv5uvod7h5ubhdjibgvwkki52pptdkaw0sh0o9z2ojrgsrbqkcrvqwkjuwzwspn7fvltw78oxz4s48p65uiqmq5tlfw8v2b9i70v4o9js6fi32x8tqtyw3rx6munb4och6rs1ha03u8ohu290ayr1xfmu3omwqdwi7vq1zyv7g1dpugfamfxouchkkahtky0xcwqulek0a261cmncjc0vw49s078qt0yii9ilcjzm51h609kqud534jhj50746s18rkdkaw4skr90vmu1tw5blo71pjg20yz5tpdiu85wrck332lxaym24jt4qmlwv4yvlms0h43ajljkoo6arcs0wncxvzjmbbme27l2h0r1fpimiufo89d4jq4px3owrclxym7lbugu0j4s0amokvwfwa5cghbeelhxg2230sbo04bwz9ptl3tys4jql5h8a47yua68fuvv7ex5mcq55fr4y28t1ysedpul8pttrblubarcc2j9odeaumyjohuussyu5la62vivlx0tb64v3uzxbkc19e4l7h8mxezyz5cmj58g56uwmmwkeoyaxu8u16qmbe240ehnv3l1l6629yv0b2gtomswqft33yie6qzqbelg0witxia3nv02hofbud1amiudrw07aznkknludwlwnp8qj515nwr6u10uippxb5ct70nbuhgp2ve0vlu996d9dy5hp0rvr6vvd64uovcnt9lbrcvgqytu7uisbdzl2md42dub181oe29zky9tdprrg8nqaxuhmruhbmxzvk0jc6pi5yqiyckafd2at6agxu3ksdlh4po0jggjtvzeogj5wj3s1ij789ex',
                filename: '4yyjykpwcp3m4679l8o5nsu2qeq3l5vjcetwxlycr79qnjpp3xq1nwx9z3kvu6mp42zj62zfcmlb7hfsolxncveolx899bpsdmrcxj3siz5t94syxdof2vtp3zpst2o1bb24ipjnc8ds5mkfkrfwvzbqeoq7coi7qw4xfrqry8w8bcm24c8cg6usgp9w7xbvt6tz2h15ewy7wak31tqupt2pyz0jrn4s328pq2zvjp1xyjx9737xo4hm84sfrj7',
                url: 'pozrtic1y48mpj6llc1o7qo1m1i10ratwxg6nxke159npxqgu6y67hmecxdrl2oxup2no9wugvqowz9ra4g1apg9ud2ki0mcqkfc6kfng64oq3de8ilpcm23orvvo8yakln1wt6ng5lukplwvwzz9n239mjfw4c9qgtavtorx056djjspkhav7mljgz1eh9ra84stuos5f4mtrhsyck5tbrvd1v873jzlj1lcwen20y23nzunh3e3j82jd56cedogrswjiggaij6jafvot9g4uxel3pefweimuq1q974lsy8c8jjnirmxe8jh4s7nc4h9363ceoampxd8dbwn9aqyalyhbxbuxmb3r4b5h6lxgd71wc0ggpu7app4rqxvzh2z1mfmu87zsnyg23l6ud6inap0a4fs4j15z1jga3e8871w06gzm897oxqo7milpuf21ucrq8qs9bixd4i9hn7ecuel184dk99gahiv2dh9gj8u7scractkjw7hui38939w084yvgpso4tbxqto24797ht0lb05cec7mmb4p7xwj8eibntvzz3cbin1m15wxzv13yzjrwl3viayiv8b7o9ffebe4310jdbcsv0x1tfnrc4m9z9sqq1hk9i3tvc1ndqqmoa94f0kuxs5oag9fkkt63nbychjh3zgxgw2k5lh24685zwqpxx255moahapb9dpdii1poimpjijy3chf4r48aqv466rar0vnof2vv9i6v1cc20dwr3v598sedfg6mgd2dn98q32k8p1j68qg2a9my1qqtm6a5yx4dr2cc9xb41wayec3kwo8jajxdig3idcj6j23zmcgqta7d2a8zva6vy726b93wowsodjicio4ezmf86924lpgxapaxar9862qcn8qm4hgtts1dotiu77o8lvsyqn5wmq4alyv0eq3wdfn31zzs2e7dwfmthf0fcn07zptg78xs8ipmt8jt2hu60j3543vcdbqhlbttp0am08e3o3y5gmlrzqeaq3nqh',
                mime: 'jl4zynclx2pjbfxth0r41s32yeisrafn2oj1i2egs64i7xrx1a',
                extension: 'nber36xc3hogzgpcovqxkp3ctfgpm2dwafe9xg31iugssspfmj',
                
                width: 768805,
                height: 480209,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: '19lj92e9sfz4h9tyb4c1ixpgp6nltrexrv8g0m4bb9rvxoxrhmok6p3pvfc7s0k712wez6q7s7cuu6yats6ed1jkp24d0o1g4gxmiin5b4g8x0firyyaf495xnjs523dhrsb83d4f6795ubedhfa3oe4v8ad8pc29d3uz2iz6dzmps084p87ce6uvdozdg3f2dlg8oh90aa5jmvdtjagg55cp6tbwj5khsx7uyc16c1iht7o4zavcsptkbkmnzc',
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
                id: 'tq9jpd3nnfxkpf9azjo8i4u1zewbitirv1xbe',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'rip09y1erbibeew2fsetaqzqtlgwxw55xpl8gwsd7qlxj9c1nw0kkm877wkp2pxnshflrq5dqhe',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 166812,
                alt: '4sdqk5hdn5bncnfyo11usfax9bootnfk1lv6t8qnghplmof3oo6bgn1zzcmnaghc1rzu81w3nr8own79r4d8dxqw9jenxryctoyhy5gey9j64el89a82c3jxovxilk574911f9q2g9rdy10vnkwn8l47pvnfzik2yayo4w9odd29erx80nx6tx0g1ah2erehp3op1k687zs1ttic4dvq47qzjvf7wo9xh79416el0ejeaciyev30blo079ccqva',
                title: '86j4ygdoz4xxrp02fcchbccvly9ys4dwxe0j768dzroc2la0uexq9z27ei95inpe1d7hub6xuqrw61kh4tei4th083nnpb6qvmlv0svale3iqa9lxls4hg3oqie79is8lo5vbf4dturowoxan5pg6gin9tuks9qv3on40xiv5d5np9ejgejz5de5z5koi5ijsp6rfwj5kddyzydlv6ywxdkktjlntcobjacgzommmlotl7aabbn9743eya4uy9m',
                description: 'Neque officiis blanditiis dicta omnis necessitatibus molestiae aspernatur temporibus rerum. A adipisci molestiae nulla similique expedita et. Veritatis laudantium eaque minus enim enim qui blanditiis porro.',
                excerpt: 'In a praesentium animi amet quia in temporibus. Odio tenetur molestiae. Et possimus temporibus. Autem quod neque fugit atque enim distinctio.',
                name: 'pw8f3qqfyutstw8sxawb4g0msyn9c3xwu3609mg69t0h70efez2xtazinnz3fdrpuy6x7sa6r38walac7xmlep1fr66hz31t3qwkpbbn66n4smpf0ayn1ri97js66y0syse3ezbwmc01010aa8p53czq5wuf4vybfy9i89ikck7yzybsslts4qrzcz5q2eqcxjgoda3notlcodqyulmjsefqny4o4gvha988iqexpt431snnph9wsc7cxyy5gbm',
                pathname: 'hhjvj41nz9akzs94u8vntrehn5e8574ru97xyl489q2g9rjt3jux0dn3x55uyd2ucf69zg4uh3w9d97njwtcn5j9xyehiivb639z4ci1j53oa7gif6lnga14w0o6cy3wjx2yx3goncarnde96vnspxqgrktwanfifgim4752o9a64y4k3rioov1hm175eshtcl7wzmma46nb2cftxqymgjz0qjnlvb9fkd5mzeavens3fbmtsqj36ao6r49ohakuzjampausgkbqdbkwauv6jdkworuzsh5bmhzhjnsrsvo4ncjkosx4g7pc9ptvspb3i4d8aygqoyg3zgz1ui6znbdyev3698m078dmud4vq5pokju1kxcjo27m8rx0o3q86ltrsyvc7nh0wlslm0jj4vajpcvlv25zfyzrucmlm5i0yjr8gotmzu0cjttnxaq0vpfm16vwblhpcdu0n5bdizq8sppj4e2tajex6wvpqy3ksaskyzdbyhdueb2qpffyae1p9lu0rou33bwbgjj0hlg53y8p3ax1zn2cc93kea10vwfbqsoyxmhougoyr2n1jthwj06h8tvoxmxvljp5mtav04abpsey93jhcyljrqiyh135siq53iusaetgw77hno43t2n7ykeb9toehxxogaagigvu3ss0ekz8ritf9bw0gddhaw4htfynbjry633st2kj0kv6skxkbyjzll6jhs7ado44prptxp0x1rs12w631j236nreaexou4bp8rksivqgmq8mey9y6926xawj6wvg9jrsr2o83r0cls84ofdho4xauruh3mccohlamf5u0bcjogoz61ow7krkd3y8pn7h7ekxy9xnthdt6q5n12lqx613bu0y700zu4lrxov2p5wqvko6ue11bdtssnezsm7k6gvdsgunn1cdef3947dtx062j1ylrp5jgk8oda06qnne36rvff3uo4aytrj951pgudwx8b05v4joz5kau8m530oemqwpejsh72fvoh2r',
                filename: 'j4hust36lfd8xfkb31by6vjmp6wo9k7hxu3pkxbett7z71u8g1xole1uae2rg1493vu96yinso7r7mnjc1607i5ku6m2z6h20hgebnla0w698uvn8nr0g3euqmd7mqjmwzpiedvxqala2s7a2lvsbz58wc60q7hv9dx4wt28ktl18fbwgdjdfugiuo808uvym0izw2vsh0plhkrcbv53x3zk7hhz2sk81tpdsvomu00hrb4beu98iv8midrbsn8',
                url: '8kvxwnzpyx7tbakbm1v4w6vo8zwigun9jftr0i0gd8mdgl0b5uh947osgm02b7dwp86qsaxga6ja705iq1iwsoio8h72km1r92qg6aj4tgjepj7riry30b4p9iz1m39il4a26jt9pn0fsuyn8fiy9dgy56qg0x63csl1gwadht6l740al6wtklqosr9elofs82abau1ysxt8u5zm3zlr2jwdvsd9ro5k1vvl2gbrqd3tmttdim9wyekxca7wspfqxgr10x8e29el8pqjhfuuwa3wqogy5peu1k2tbdspauuy3l9gasptb6wkfmsvv7jy54ju78c5hhin4kn2okfl3ky7pbaj72swj99kwqk5f04fjbe9e1oy3w4uaxvvwf4mg34ydsgx2h3slj675i9l6ck2u6o5aufohe9y9efgj9fh3a8l0hmdcvze1fflookqu617jsznvzgzpi1444yqkg0o7i3zstg5df5s16om4hndkecafg74wn7vmcdy10n3coy3ddo0sedamd4gj76uxqiiocg3s8ja2babddl1k4mwrr9ju66le3izspvgr25yxgthbyn2rzanlrnkgkxlugtktkt18ijshrcj4g30lr5xkoaav674r1xvj9ogvbvw1qjwynlxemcu2e18mrwjq88z1cwlp120afwotx6nr34mr7t2mfxk85xczv03ach89q037nl2cmtx2tq54kcpcywxa9gumqccaxvm94dmra3frtvrbvg8oxhgoll67p0olmuq846q0sztx2eojz24w9hezsr2706z2sxffhjz4slpnzltuabuyvm1lhtdglqtca3h93267lojs59ccqp3tv5aq9emw44ae2y5qrwjb9bzka2tbgly7l6iibi9tfjovkugey68v7tc6haknzl72oro2mlwngp7xt94scrkt6liosauhubodxsxb0u5pq69n765a4pkj6kqmjdhfcjrox7ulhis57czpiuayt4z1f3d7yetg6s5juv4n16yzl8u',
                mime: '2aezr9lh9a38uiamtedjgu9w3um5u7pfxjaeyh1bsm0tjvcqwu',
                extension: 'hpfg7l174bmv2xyok4td9nkx0242lwiny2stazfjkzinjthym9',
                size: 5840767520,
                width: 514790,
                height: 867792,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'm1b68o3yix9qezk9gdmcdkz8ynfdlf8zx8xcy6gairc6ey8kmsji7ivd7i45xo21vkl5lpt17nm92lc5e3e3uhfptf3x7s4yw6dongqlvg1j3fnh8d6qawe4giizygzh3wj6zm7admqf7yunb6cyaf2j3zmlc0ijnvbrk9uns56ior6hyhl4iaps3ipmm0zuky7tq2vwo0mz6mnyt10v99lneel2yqeb1gptw5bp0ld22tkmziu8cfni3d2a3yu',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'uy9aiwzjrm3qtbcaixae0t8ophtxeoarfpcdu',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'ywkaud0u9lyajimmmghmqrpi4lhtjx7fgve89ozmzus3zg3y06spx4w5l2rvdq9mamwlqu7r3n5',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 678949,
                alt: 'efluwgo3xsd3zc805iofcyx77gqs24dgnqucg2i1leuy51fv6aamc7ee0rmkri11h7pq5ebl635mhvd2noxzegiffki2ozzcym8r0lc55mz7sfbj9lhhz8215pwbef0blga88pic8glgk8fnz6m6f918u1fx3e8gm2yzyqf00ww9l6ohvqciintmycvd9wijt05fqze1obgf2fpjmieez0539duezx0hhbar20at54bgrpjsv94cvp5nikljrqd',
                title: 't7wkzsl98i7hl4qudwoahyy72vopbmwc0bze0uvcuaog2wacxvee7l2au8olu04w2bu17ny265xhol8vuf04ub31jnjili8k14bpd6t6c9bxst00qgvax1mjyp7m9o273x18y4qb3dqdn2kclsqw9qw6ld09xacoc55ez96spswir8vumcmwyhcy1sq0ypfhalirhyrjct5juln4jrm7qnxkb1luwjjgtctbi0nwrzi02wpj7wpabi1i3p217ch',
                description: 'Enim excepturi minima nisi. Reprehenderit omnis iure exercitationem amet. Totam quo perferendis sint soluta tenetur eum non. Nostrum illo nostrum est a. Temporibus delectus nisi voluptatum reprehenderit non totam. Ab optio est culpa eum.',
                excerpt: 'Ut aliquid neque voluptatem dolores quia ut officiis est. Libero aut ullam velit reiciendis earum voluptatem consectetur. Esse vero ut dicta officia voluptas. Itaque molestiae quia cupiditate alias et sit voluptatibus et. Sit ab blanditiis voluptas totam aut sed sit deleniti velit.',
                name: 'jj2owjkb3rv6qh6059vd85c0ex1zfhtacvfrv6btdx1thpvyqnp5htpah0ljk6xkrz73y8fmqn7nabzf4d12ih0wx20mnzsxkvftreq6vj14pssndi0w6fx7erf298falvl4p8yygi67s01087d7jtvswga7yqo5asialgtpus9ibvdkcibrbo8ihy0y5ylbftq7gqvterzun6d7ssj40835qa5k6slbe4tce3eucvoostmr0hewqm70euzf82g',
                pathname: 'pc09q6pwd5lmml8t5ov50a48lf5fu2kbjnsagznuduyu73cpn99gs3mx8ub3q3zbal2jj5fa18b9e4rzfbyat18ltayzwji279qn45wpvxjbqskdtwwar9b7wb2u5xgbd1ssgg0j50me752h1y1x0t80a5k9lu44t0w4z8ceplgmlrxoidwh0ivla94zok65z4wxcbcmml16liu1h0x9zbt6yusz2mjfca0lo1iyz2yy8ugfvaz4k5e4457oujwtpv3myhqlxjt5yl5o7qjk3n4brn9tzww6teg2xcvdvhewvbr7e0wj8erx92xcsuvps7z4wotxll29uxmnvaf4nao0xrz9gv1l7ie9v32kr2sqqhhhgtewn1p5nadrn7xc689824ryrtc4cpdkkh15ujwkpyrx9p6j9ir9uwgcyaj8u2eytydh97xbow6jnp4bf5huo4jid6w10mzehu0n4kbv59ui8b72a447kd3upndvvcccnnnou0fiqofhmaiz22u5h0s2s5gqzlv2e9y9y51l013kfefj0y2oar2sdjy67ygwz7lr47ndx1mtx182r640y6xj2w93oi80zuwhuv5a9w0yp6vopuz8crrm10drck02tb4zl9rbqc36nqi2w7tvjjj8s28tqjw4x8th7ekw8si15os3aznkiodt1j6me96lvtppbtjtf8sp1ocropafgge8oa4dxjww8ht98t3xab7egj3abiuh9vznr8g1pdp51cwef10euxwmhdxtjt5z1zb5q642z95a5i8j433w7r57b05ucbs79w0vp7exzjf74cjj9y2v6vjz09qfrlor0bs97odnptf12siau1p2otszvgnljqfbe2eb8jmtaogua4htyajw7qcdgyfvj5umc4d6kj056g2a2318i8gzv2v9fpqnu55g3q054zquveum36awns6qonmpgfjh0w16jvqh4p9m0d4esom24m6c58dev0umhitimjhtme78saxn1vobbv2hqb9wtg06',
                filename: '2zgxy4yv5dkoyjcyhc5rl4cpalrkwsqw6pocoegxq38ljll87l9e508cr3yewiq347758z8917v7qc82lq6slmu7iq37m5sdaj61xmxpk2dirsekvuqw3hcbkfu5fcbf4gs1kx7vdaudz3yxs2gvsgq6nxjtyw6ppg5rpko7axnb6mjza9k6v2x9uac9xiay2il0p5mtxrmble5sxcofnssgiy092utdc50ywi86botxkwrhfftwb2w3w1rpv8f',
                url: 'nm6xzr4bk6r2relbdh18vl9zbgu4ccm0qmb8csae6incgo3aurhtjbgfdkn3iwt3qz467ottibqyoj52pi2i1s9vqw2lml6f9br10omom8vuurz9eufaifazzqlwekc1x9n0m871atb55y5l3stnr7sh6cyz6zvaacptpcgb6diyyhjg2mncwfokkgbmc34gqjs7auw9mzkqpht3511w9figfiz4qcf0c5svdb96y1pg5kj6vdiim79z2jwj21a87y3m4emp5vjsns411czthlasms2loz5al7tlss0eq3fullfqpc60envqesorlwjdm8586bxwjiupt2fnnqpb3gqek3wmqepavqhfw37hv8y56ut2qubmz56hxejmsvhprcah6lz10bpnp6anyt5kq5oz7ko4zshxbh2nvkwqgvm9qay8qqpxsmj7crmybisyhhgmb1vhcz4k3dou56hui5bgq0nh6o6ve1vp3v3yiew5ad3ecv4xkp1q2q0pnmqsubmdumca28nzd0wdwayj0mnl8miya62n8zkw0oib57a7fn3m7jqfpp07mn36m2b5jjc119dd3slunne3en2hn7tijubs0gah21nu83qo28gmb9yup1wvqdtt0lrq0xl1sx0b0w6vk52fwzormlqfw8ngunl5twv3b49g19pb5v84c5ykq4zrc2qnlb1er7rkp666alcgaarf50t5w7wb3ffmkfqjnknbmbivafku1lw2yylfdyqmodnu5nwrapysiso97vh2zbyzt0xiytor2m9ibuztrf0hxoc8o4180xkfyvw2ci2mjht1awkrzhe17pugxbt5nzibqzn6kadt0xl2sarf7gn650lad4yrkeoag13e3mdyp5y3ns1wotxmjzm50zhr0h8lu2zk48cmhuura4kqer9kw1yrjplxky5js7kybut6huy5s8yr0j3j15hgsrdy1fqlcneqxl3enrxdxzicvwh91yq6pb6opme2qk8f4ypxl4zcbdik7doh',
                mime: '97ukm4s3do99333y0r8ldodel6ppnzplh0vuzf9fr0vgi8ccuf',
                extension: 'y3lexpt3nmbksad7xrpkl3lciqhpzyclodfksd9h7rtkog0ija',
                size: 5100711389,
                width: 929171,
                height: 468761,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'pm22bmmh8iqakc1e23nt2kx3a9rzvbqykgwy3834prgiiq5aq9jqhwn5bv0326dklsubcj39xc0cw8lpilpdcpzzy3xsov7tbqx4p4r4f09upqd348fbxn4sovmhd3dv30pj32wh2mcol8prjzc0y3utjhjzakkpzcsed3audqsrq5yh10rcn6rmtt8kaarfi32kfis05y3ylm0c4wp8lu24hm41gz0rcq869fso2d3wh4m1po6rremxcd2fa0h',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'yz9i273cvz29tih4jpya6nbh7hv0nezxsollx',
                attachableModel: '8kfnbvynxlsl4xnd4kprki8xeocxy5qgt1k2vskmxoc95rp0okkx57e5cwmwgg90ymw45y58vfu',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 271084,
                alt: 'ynlbysmtbh495hgz62u7mwc8mehshlhh7m7dlnvy3cqrzt1sss1h3hq3rmsbwqvypsh7j610ew05fu70na5i8gssi26vb1b3inlldjb2s3o60q2jmninfwl2d9lcb3mxb83hhd0vtjhu2azndkm2t8v7n3ve65op4q4hi8eo9v1ol2i94bts8e7brkz53urrg9k65txrbbjj4o1yn7fx3c5issp1fc3tp6b75s3q4gps79oers1zbo4clm7w7um',
                title: 'gwe1r9bzb5y04o0k9xwnxz183taqppwmdxt33ga53z6lk0m3d13r325f54zms2vdvgbu6etimwvbe25s6s6xw9wig34tbrmrt2nvzyj2vekrtqc4q19gwh3zw6o3l6a0zsm9atfm7sfs1p6cdlwshxmkxw321e89p7w9lz0daam1rr1y4d4b1ggcbracr6u7efy4i7eip027rnjp1dukp2gbnzyldjkxl3vg9xufs239r8a4encwzzznk041267',
                description: 'Fuga maiores modi iure qui. Consequatur rerum provident fuga natus rerum eveniet et fugiat. Sed modi qui voluptatem enim reprehenderit odit.',
                excerpt: 'Dicta expedita accusantium. Dicta delectus maiores. Quia qui repudiandae. Excepturi iusto et autem saepe earum aperiam. Autem recusandae quia pariatur. Quibusdam odio doloribus minus officia sint a eveniet similique.',
                name: '4nmb8ptu1bxkvkrqhi1atwrdgzdcvt70v3pjxnyduvkdzxdlbnpmkd2t5166psgqiux3hyyh49rq5f2seudxthopan657l2zat3ljkedcarc1gms1dobgv6gg4rhsdaf9y12ygsbh7bnhbphmo2ub4q0ylewgnjz1zyriy11ez0cglhjez5v7pbyfqz5uo72z6pvid8l6lplsujn9lbh09kaa5nj31salrjluxzr0nus8ieoki9amel31pu4yri',
                pathname: 'eu0at1gmr8p5x9094ycoqgk390d4alq1jqb76bzh44mvs79qe1i6k207gu1apc6arrgajo9c7iozh3cr936f64nfhhwowxhn7047b6qgzguq60jfh6panykukbu04khr5otiwvlnmz2ljbl4aop4drjx63xvkzxwqkgb7dfq2kpi2zskinr5np3v41d1ftza5dazq644ocukr1idraso1775zmv2hlg6bs68xd3v1ttym4wnesc7icmb9mrghz2z5i2ccfng34lcnlugc0bqv51ltdtxeu6k5x49m1if67vlu69xvp1cat0gh2v8h81xcfv5rnss2qgy08yedh6u9jbmj0fgtv1sm0miq51jq202t7qp8lg26fsfnptmqi7d5esifwur4bccl2la9uea578ld12wgc1nlc0lmwdkvm09m7muwxyq2mkrobeb9v9nk8j1of5oonwme2bpz0gd10uepbwkpemlmslkipj16fzv9sa54bd9a4u8wt6lvtza5yl430rcusycp7n70jbeq8tthr6govtpo6ph63342ywt3o5eqfvjd1boir3szm2drqq369h6ir7b7cjyuwzivd1q1sae1cv2409tk48yhowkmr3sqg3hrifx07abtwgov2wdwmjqrfm96nqjz8zs1a3nypm3sul3j9ghcu7ujqdnaz3bn4z8e800vm9qv3doss0zggydpryljw7hq9wnhtovxtyxp7q68lsfyrh8btvlxedoeufapnngx2isx3inoute7umw18xg53erawq5h5fws1dpfviyhr54kyrcnsnfbx9sqh1651txuysr6oxhb0uzwqr1hrg0v55zsgod5fisuvjmxrp1qe820n544i83xo35kmdp8d5pufb8jcglzmkjo9k6n87bz43ykolv6d2cod73qybj4qzx2uaqsuyuh2tq6jl54k50vsyvp74nterqar3kfwm4j8xb9lfhk0d547lfyj14bi50ywdvs3ilnbklxb0momuhdsyyqyab',
                filename: '7y3criy7i8do9f8u0m64wu91z0lm97wtyg15uxu90t7hif2bj64ipzd5xellvr70i4ttz7d5oqj9pj32az5d1skx23iwjapvvye4r84run818szbfhrxnc58u8wgrwwtlcauzpk5tfafnwv97y5540nc0whdpfxlf4c57o873rajrb1kw2t0b2pom94k0bqw2o43rzeymhtgf8als94fxqvziborkqaa6wtfkjke4acgimu188u3v6ql2mncpqu',
                url: 'c6fz6r1s7qsjcpshxi0our2con7jtbi42t7yl77g8m521b4aquz9dej9lnqhjgqtxwj6x4j0ft1ei6qf2tw7f7e06z5lyhf38kn1vjzj1if8ox3croj2gfj8fztrc1f3nwtoln67ugf2ay5poju0s6x7nr3h6knucoby2s71xj1blgmst1tnanwjn01chzqwra4txmoqxq584b4n5w24gbgskr1qx3dl1y0ae24hj8g10ibm5ubm8cznmqjh3jpo38qmmzhbaltnufff5gai1ozbep3vz3uu6ch039vq19i4dpiizo0swwi22atigx7sdaqndqtef7ku7d642zpgyc5ieqz4kq8tz1kvacen8fsz74wb8etj21f3q5tex0xg51ytygwxwxvxesq2q95ggdsmfxy93i86gnp4s02kr4o06ej3129us0gjp8pk5zbpqum6gsgyw9fztzh3wg3yqmbvvm4g0ch7xp47e3qwq8c8s31panhlqtbxgwz0o1xgr9scrsacd04bfn18tdno93tjs50pjmi0iti16c1y2fhkvc8iqnkea90w2helug6kdkcm7v6vjtby6z6yhb1x1mj8yyfc9wr4q14lwi2uchzbvlrr6d40wjtl2iwygmpm53ffv54b6u4ryld99kcvmfa717loes6lysl9yo19hn49ivo76nr515mw7ljs06hot1jjqjr9n5wmfl7joe6sjffz01zyrl635tggovucek36fkq2rs4f5mp7932kz0ydqm4rt2j4ru9lqgwaynalgbig7q0sk97jzcxog5xafmxpi12jvbdygp60x6drd0vtl2dxan4q8l5cdarmsmzv3nmwkb96vlcategje85tppqirgm1b46de0h98e4ijghnzjhxqizhhpgm7qsh74q39ip2eflpbytf1w4wbd097nn9ij3zzf8y2obp5cmb0w22rybf52ajelc08r9lyc256m3mem292f7ko3cxxnpbgtd7ke87ung5fk84gzcwcgxy',
                mime: 'lwxlwqn8qu8vsyh20wt5vptdjnt9mkfz2jmdknj4zbetkkzac4',
                extension: 'bmbrcescwpkzfxx0fb2xkgx050brlyngynncq0eblqban5yioe',
                size: 6779916866,
                width: 191776,
                height: 377557,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'tarb9zjncqhuhq1saolu7tbvtkj8gllueitrsf51j5o3sj5l7hx00isvgktvroni4ccgsx1vy4ydwhkas07wxfulu3c73an4s02b06xxxnf5cfqkjeycfgk37t7v7isvz2qysbfxlkeptx881a0rg5vn0uqtsgnmg2j3cz40b9f3n1ra79p3iegjscgp45cowm46kskhnewrx2shek8m3u1dv93sz7bwur8bkf0b91nnsl8is3e2dnf85thkr1k',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'nirh7grszged4qfofk8akbvwkhvdgwjh4hh06fskrtxbzcqn8tvmseuupg8jy2nix18knuhwfit',
                attachableId: '7opq87jg7s8m1g7sf19ero77xz22sj1zrauxv',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 668639,
                alt: '49cmqk7drs5y9ea0vahn38ktev6rd8kecgzb468dk07xagwkrgwvngaujkteckip1dgqzxery7pig45qa4b1ol02m331pyu4otj5fiu34iqgayz68vrekuotmyukgn7ablj75wqpa7k2s7e6tvsity6pvvippvwc6bkt6irh6mdxhc3t8ycpvxa2klp6gmneyiwenssy3nj6fmwp053n0ysr4pbasf2z4eaqqwybfwoiiht2ekiwzl027fhnfek',
                title: 'o3dhj33z9pox6al9v73a8aho7hesgk2b41va15ns1yx82gppbzyj86w3lq8qo46rphly0zjfv22lwtrb2j39bj42eqsbdbkds22f1at6pkp5dt4gdaza5uexokhngknul56p15o0pd71jb41tzzh4g3tcfekxjwwqpk2qp6fcqu7t6l35yus5ubwcqciozfkql0z8qa9gd1mgj8kpq48dahz0x9ro2e674pyam5o4j287z87vfhrqipsdlz07nw',
                description: 'Veritatis qui dolorem ea ipsam sequi qui odio porro. Et illo sed quia dignissimos omnis tempore. Dolores et quo odit ad reprehenderit voluptatem.',
                excerpt: 'Totam voluptatem et eos ea occaecati autem ratione. Eum labore sit expedita et eum. Magnam laudantium est animi et iusto vitae non alias. Corrupti aut eius aliquid error omnis. Occaecati incidunt molestiae quia.',
                name: '7vri4jopt2lscgu9c7jpj0vusx3qgbrthaj9bo7hi8skefxze2b77oj10njmjf42db7x3mg6f5sja18wftfnzais4i6hs876dj2mgwzue7dkdpnanasyk0moxoefp5gbdlc3cf1h2mlrv00xcvoadaax45tzgv0tov9pbkh6bj23ce79ngfk3i3bv4k8s4tem6yorsqpa4k18e0thhg8p0nftj4l3l3nmxw6owpltvpaihbwvz0c4reimm3u6nj',
                pathname: 'z7k29rpyghun8m2jxboawgonrj3tup50cwguxxzm4kb0xhw7vhy2v9rnev7d56pqd7wskyngipubbl2yb6c7svj8ze82637ct8b07cu4uy8iyrugnt1aw5ie997j36bkpo3wi3oizlpre0zcdwnt4frkd8bstqeld7zs5dwohh8i7aw66sub43dvmvddjjc5ihbgche068temahhcelal6xrnbssc27ablupyicuxq6ea4jqksuz1p0pm4xd3lasbe7t6314oknt0dfm1i0baokh04g7mvyk4kl0durkc7j307xyvypucx2slct3e1km6dkoccg1tfxnskcxixdn53brig0clpo62tmo953oyu9ohv7erqj8kf6zxjtc0pc5dptxdm4duj3r8psmfn5gb3jc9p01oka3kczq51nf46blx74nrl7l7ijav1gryrhsc0ewhv3jzdd4nv080nrtuthuva36q1afd8955ngow311prohl77u07w6pid3osslp391bzhce2czajy0q37i3zcmtut8ntvm203yfntvhkzlkiztsxmrrt62whwnkq0jqpnldoy5d65z139lh3dwlg8lp8evqkngzv1tl6jebouyxk7gtkp6xi0h3ji67eg1odt9vnbxoeh56wxd5by1z6g6tz6czdgk9d8fgo5s4z3kujdsq6ccwhwpn868ite850e4dipo4cy77kvoxq6hkxzrpp4bgpwf9dyizxb73d3fkylmar4r4wdwb8war5nw5pmz2wwjvi3ibur7f1wxwnzll9mjpnhm3tw9lh9kvqrob3chyd7usxqgkiuceb316wiog4iplkvq24l09mhv9vbdg099af4a1i1xzqa9vwjatjmj4fijd50b0etuf5ef3azkubzcbn05jz2urxohi7kg1bkflvhy5nlslwfebjepsnwvw9lr1yjwoeonxez7q0gm9yr0s4zi9vmk56yncxnwpu2n6unzykcukxd023qzy40stlkwauu73mhawn3z',
                filename: 'fnri31xfg2duyo3wn91ziuo0mzbo0rt48b2owdo5xoln6vb46p46pe8ongwpkvcou88heubr5nuu26p5ylgoug0lmu8ctkm9safaratq0zewl74otvxkymz404kl7x54nnxx46sbigt6wrbw48tanxmaoys6vdkey8at39qjs9x9gq7v9y1lieytqooobq1z28wjod0ogbrh5kqd0i80ig8p65evha29khzrcgag02uajyjcg8h1u5tcaiathhc',
                url: 'kj4r2walkzk4i86aszjjd1ml3zrg7ancjv21nkmj7ntt3u03v7hl42jxbjhiswl18rp5kanpb9epyvxqb9gj5do4podraqaqyt8d8k6e8l6ft66k1hus32d4zu6ou822pbxrjfrcextoa4km9rpuusm4pfj5zs6dtako05mu6ujdx3g8bzwx6wpcopb6p8l8h6xaxza1xjy38wnusijsxrp801d30ebc8evjrgcidkglfmuynk7fyx5bk8erlrphgszhgc25ec6ksdbjlsosnhnqxd3oc0g31vqwiu86q4ek8osavzflzaclh64vwxm2n0xw389c94cn5hkwj7jbrtuif4ry0c0e092pdogi9m9wj5wbob5yksgd0wc3i7z5gfogzyom0shjrkwsczd6x120id2oz0vyka1mvu511q2lsbwfj76ltizigq8ybhm08jvli81qlh1g72xocv9q4pvk3iu72t3tylmgdxeimuyn1q0alst2wci1y2puhvdv6n0yp66afwc8hl65h8v9foaiztnwuzti8i64x3us25is4fpezw5t2sf8hp1t62ztecqltkx9ou6hap5dmalbd9jks5m0f5e6cgg8w8j3hrhxoetezure6e4td31vfj8p9dcifu4c1g6o574mrot74t0kukgrb1jp6hv5kfmvry9iryq56pil1gcto9rkzie27tmbdvcnagorfbsetbrz66mo4fox6tt35q3eha74zlactagoos8qva6e97bx6tv2ldp1hk1d25tm4g6xtgmxvf3kf2slmwo422k48ztshpk2485qkb4zrq5sjsyfr8cu6phvs3ygsis7dbu83p0oouy2jvoj6b2vajqf61dbse39waut9edtpsk51a5mlmc1jq4s7isfqcoiwdalzqhz2ufep9z5vea2xf40jj9zie3hbuym9zey9qmd1rn9r51sf9fk45mxoudq57jzljvvzed866qgj6geb0c8c3xuamgcl0lz85tqt8zwqhz6obmf',
                mime: 'v56sru61zlrbl47s2yikfgild0nfglmmuc38as5zaieo5ztg12',
                extension: 'j97wkasu6y5xiiud2ia5ac4af7dmdnivibrf4lud7kdjj4oghq',
                size: 5920562212,
                width: 636403,
                height: 434011,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'd3y0zh9fwze5dzodqt1978h3s240eekfgwj2ykb606l0e7u2ko0p47onqf30wd1vf91xho0ssl7buyw6yeymfhreh6fxtsdmb8oel8uw95cs6rjqj1uy36mwsqr10u7ielz9rzu98wwdn7delvf98pkzv8fal63zawfdb51bovlxnt99srbywfne5vd35gvofvq4qz4oybudjql1l08pm8qgvw5yqcdeouks7jcxhjov0obclcxpfzhhf5jpaf9',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'h8s8bknw7y6t13d5mlitqimm5045kvugcyn6bc3yno8x3x5lk741632x1crevgc5l8jdw804rt8',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: 'xl3ojxzuifd0rqamd1p6f7szq1feihxywi75r',
                sort: 456712,
                alt: 'pa7mvgil3mb8jyljt8e653dk8zcfomt1i18jr1tsv552xotr1b2d96izss3ty5ciar4xj5yossy42iorvb4wm7x2461tnq0t9kvcvtu3mr4kdwj4mwlvwft55z5ps21ddr9hz5lis3ltjwcx8gke2ijj8dq8f081mbytgvkz67jy9n0kuedpj2eeejk1fkfbzrgl1b07kozzn0o3dop21t09jehp62y9ew82pznnfjhqauovw4bxiete5wpi59z',
                title: 'jwzntek8qtgmagcvlkilg4x6r806tgej73cd2zlb34qawzdketf125tuklapgdmokk1urawdwhtfzqei920jd416q9g23yl271jv4oak6eh2a5r97n9ofc6c3hdu2jgzwks9ofxc5cor5dw9ur49ujgfkpmtjlsavxussv61khgqi8l5arz8cvyc5hj8l5autj3mj4z0hw0bmyp9uqvy5z5il1p1kle0ee85dok78ztcsgs4sw3s7jbku1g14sb',
                description: 'Veniam maxime praesentium ut et aliquid blanditiis laboriosam. Esse id dolore velit corrupti et sint excepturi quis. Doloremque velit non velit consequatur optio aliquam. Eligendi atque cum delectus quis molestiae quae. Rerum ut beatae excepturi. Provident sed dicta quas totam incidunt quisquam vel nihil.',
                excerpt: 'Reiciendis aut numquam. Non voluptatibus et et explicabo tempore nihil non. Perspiciatis eaque harum non assumenda modi voluptas quas et. Et itaque eius temporibus velit. Et est ut.',
                name: '3has6skbd0xj0m3rxn54qvpqtrz639kd109yujsse32j0v2wfwmmh6cyawdp7rlx682pcjkwjbbw8x3klzu9iuo5xetm2ge5ifs9m7i98ha8k691smm18e2hutffzghdbm2nz7jzh488suefxd3e5c71lht6d5dpdnejhh0dtnbfi4hxss6siaonctc5wv0b54qjs7cjtuoj5k0oc6yzmpelz0y6jkanxfsmbwjb7mvu3p21b26ucgqpwv2c5og',
                pathname: '5m12pfe2xg06ud98jr6nkp1y9qhygqtt91ldnwotdueuict7p55k0tzscb8f9qwqp5nxbj0s09mcr6lhzwk9eu2szfrujcfsb05dc99schlzwl7lvbbks7eka4ecsnxb8wy84ef34ridxayhk9dg1az3bqztza9tr01zswhuaj56yacosk4h7pzmfikc5ni4pdm3qnls7fx21b332dyutq2210cr2v0fsv4euoe1kqtbof108y4rssc4lvpc5hoxblgpb9mhdkcko3v494gg569w5zle1mkvu7xjavzfdqjg4qx43wvrpq24613oqeecu0s34g2atp0inoe36y37e7nae1otncswdfkqmzhz0a92xb4bonxhwqp785ryxv4ld9nyw6mnzm94hew1sy4f5kbaxes6qnfg3rojovhs94rgo50p93i1nozdqyuytvg8fdoviegc9g1l1p7z0jrm64c489efjhyae07rnwxge6gf6usb8ltlekazye6pcxdh7tpg1u3zurswczg5fsh635s8u4kijwax69p6d10fd2vjnc9n2rw1tgvrx8ug5dutxd3avize5ntpq7d3147ktxap7m7848ofblgaznxrjx5ngt4p4rnih5p1zll3fupo08gqa4l48w5k9nmrrjpv3cmd3bdtgj8fcpwvg8fagadmod8d8n69fhlngvpj8jekkr7fjr5dsvpasoujn28msoqw1dfb5ltwltl9gqyzealqb5ygzcp5e89vrvzkszgy6q1cxjd5z56hyqjvjbq3k22jsfh0bg5490qvtma9lmruml4obkuvtx9etwlrbkqzwj16s90tk5sblabqcdsspxdcx2e7sip60ivjsvkr2tzaig0ixq2nero8xh64tx3nf0smtz2llgmx71bzhx32vx5rsbpn67y65kqmfu3e8u2hakxhs8sqzw7l30cis9lmzds4nj79qw5rett8ly5hcnrmghdqp4wkw302k1cxegz7imlogges7zyjh1pijpva',
                filename: 'fzbjda0qo76gfy7f0kyplsk6dwug587cjku0i5ljobbwy6qs6evsae3fqxzrn1mmdcf2j35e3rne80pmptwuqv6xwv4de2gie865yjmrm4kw0xmxfe1dhq1abghdd9u1yejc7ohr13qik59o6yr26m0ra90fdy3w4ttmr8z0879zvwvb8dt40q9h7m10vfgi5wa777dlqqgctatvmr12117vqwam6s1yjpg7xbdrk1828pznxne6jysh0qs4szd',
                url: 'u2w37jykg38bc1yvlrkgcqg7gv9apu0bubvopfny2ngvgeyxewzvwvf3lefpdr72m653y91ranrbi5w6z9mvd8b2pu2zz6siah6z7j8v24shx12gel8e1wvolpf23r853erjz958rce4krtggnjml5g38wv2vjggkdxc2klrys2xescg8mj19jnbr10lnt04xcql3h0fdg19bmydmqo369vokokxpw9dhcwo4krxp27o1gpsrl3qt5p5bd8ktql4td4fs3yrx17ylup5gda2r8219tjs3jagrp5n9mb2u97hb6d33eau33jsdkw42ie7qwbsr5sfz6217gtv7g1cglywf40rc9swhqjdgsltyic4upb9hu8x4ba5o0bjx0xyxt03ypu4cd6s27qbbr8884u6x8u71pjg64kxdhe9qijz16wptzqt9fqe4c4rcisvx33q2hln3665s5gclldmmyjg67n68b5gy3qtkntyesx1aiqtx3nyuoax2alw6o7gisd8fumafb031fbysdfsy2d1okk7ayyvi5s46g0ahe8enqgcumru3g05dvv41so3ih8e2xshypi9rtiua4tzgxgfzr1vhmz7go99qbs3s63q7y91m12wk23jwoqqjnmmvtxytfgg05d7tia11uzzexqq1l6mdkkv3zazux7hkmqxkgbk0zf4i4bz6ods74m0qwgslcr7v61a924mniab6340nclg255huizxlegcjt111fzqzu804gt4ve76iln4ls51j722wvwx4s7m0j82pcctbg8recuwazo7kjo9mahr1kiwbkhokhk5w5v41o3jc1gf25d93korwbchrbcvtksofnjkgqwov44ilbn9qsvl4hqpobfg7u5s8r2ijn9xl5wn29jfae7ppgadwt0u7nl29kiiwdmc4cnlon3b2w7o3b6orj083a2b51j5myn2i5rby92kf286egju6pmua1aocbrtz3qqb7o5cqkwbhbb3u7692xmzsl7k5ia0t2p',
                mime: 'f0lmqu50qq728vxh1ipv2q5lk5k15sjyva19pl4rmiyllzku39',
                extension: 'ixg0v14p1afxbp89mlryqhmza9g0tzx1je91epg7zz4xqo3fck',
                size: 9168348716,
                width: 699947,
                height: 238003,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: '07menvcbmuub38hmoa2b4foi2o086w7ppo40n5jh31zrpfmd25nvuv6ayk4bc6ct9lk052zfmbn9wbv2xj73rzjmmuud5ewo7netiwl76yxn12hof2e9aecf6u6uqs8rl4y6yofy41ke70iihvmyf2cpnu3i1hux4dc3xvusssjskfzhksg7025gro9yie1zpjm7taynomoqni8o25ikeg46uv6wxm3ggwjur2pglpt5ioo2uoq4nbv4t6lh5xs',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: '9ofok9hbamab10umj498yvtndulpfs46k64gd66szcbwncigfmyg8xrwvyjmv6685vudr367w9g',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 250595,
                alt: 'k7tz05p4stszmijn3cyzoedm62sf1hvktx3reqndnvkn8kl7wkkbercqb9ayr422bnbhs538tt05issbjvjeau3rtqulwti9plxyrlisspxjtasx4xmfyxgm7yls2y4jhf5cvlwjvg6u0hf3bd9g9koaxj8hbvdy0dnv1esgm4oidzroiwjhsvhmi9yuod0ryl0uuo8le71b6w4vuuopbxx2su2rng2z9w4eodkg3liwxfen1nnfdja83kkiumm',
                title: 'csa12y2ixxbi5zc3vlclgd4vs1lze3v7z2o2lbtb3tmx7ss363asjzapy61czf4gxicfgrgex3ddb521seeid96p8qbszhlj05h7w763hida74pstq2xu22fo0bw8qc213fixziyqord36p9a5ppq97623z5u7jxr3yickpit04za07mnv59ykkoooou7s7mro72t3q0zpioauaoedzgyhgiqpg3yjmfmplie41qdl4r0hjagjyy6v070cp61qz',
                description: 'Reprehenderit quasi commodi illo harum itaque assumenda ipsam. Ex a aut. Cumque voluptatem doloribus quae.',
                excerpt: 'Magni debitis necessitatibus quisquam libero dolor quis commodi corporis commodi. Omnis molestiae sed corrupti blanditiis natus. Et perspiciatis recusandae.',
                name: '3b9rvldayz6xvj0nqcepbcd2cs88t8hxednpx6k6mz8axf5blw4bd9rdxysvwy8foddpptzqghmw7o27vbrdpbc2zqy2vt9zfhcqgcs7i9cxqzzj2fkv22e66m3fnbyaykyir2150qkwrhp6nvlry1obnfgyx97j4v871fs31ts9gu4lnzximgz3p1n82uran1bsc4q0zgvze2yrizdkcwobx9y4nfjrc18ayss7v9uwe05qiarh3cindszy9tp',
                pathname: 'v8w6an1zky01j8h46cmux3lgnnrsut7rzwmn46hada8l33imrxguycym5brriv7ngl1fggkm2m1esslkrl31ryo7zyvqi6b6vodagw4habrb7mwxugcqsxqkmwl0whw95u8nt3aadee1i5azznig7af0gcjex88sxx1qs9xxxy1unqjs3b9xs0oxhrx2pn8b6u66tb98xecd51e5takpgejbg6tbcqgjhaphkk4ghdfs2zm7r2s7jqnu40bgn9odekh8dj970yisgry0zc8vgo58nvjq5rcofcv4m6izfngmqom75medfrtarfudqck45jinr65ssmz34op6e879k7ym8tt67rqycr58y2mlr7rmwy9pf2x0oip5fcmtn1mb1gpfbto9zgumebv1dfs63dfufnzh48g6z933blgo7objajioo15zu32m5ktmjwhs79sgi3xgm5i43qaqflxbb2fsvstvud7z0lsugoh2nru8skiatsd55swjgjcl7fwh8z6vs11y0dui1opi4kqaldqc6f0jqfw12370devusttgfc90gtq4enwurp48bkvtib1ytm1zyxqvypr0rx7p5ifxtk1l1cim07l0xy3gb8jx6eeadp5hyqo5qtnjkkbe3ryr3hiujs0892do8jb6yycwaypfepki0gt6vz0renxm5revtsw7pqahrnzz9h96h9oxx3eoi6u9ofa8ycivjdt48p8dcq5r6l3xw84b4kmiap822abpa135jmnwb93t6h4r42d2xivntnw97malzu5ie7dfxf7z5bu7zv7bvtfm0gzw7w70xg0dodatqur8fhwnqiuvuru44cc2eh6ebjx5g7wc227zgt8km492c4kfyogv84ut2mpf9u3jmxsgkf3crnh8igw1oxdsk9j7swrpdpaxi5z707j512p4br3arnadzorbo800c8mpi7mzmijrppnass12kipgmc6m3br0tztcfvgnzzsc88gp3rfvddfm1eb901dxnm68lo1d',
                filename: 'nl74i755ow32en4oq1srd849goe11kazks65woflbqlmuv1lx2w5p62omq9sxplkzxp8jfadnq7dj79rcait7atnkbwl0vug5x1nwba43kotx6eaiqvof9619zfutcacsfigps6muso4n52spof66h3kozch8t2r77temmollq6ldal6wnzvr89v1fjpbyecichkmyg8r244h9imny367day6o5f9bzyhv248hav9pq0bwe3519xpnovyqeg7s9',
                url: 'lb7q0d8s5vhi7fssqgb680wdfq7w6opxdrurhd5is2j6kjqyr30yp91e1fzc66alhy1kk4awwc3zpbnkutp2ubpsveddgdnnwj7npsdgy0u6glymrfm1ih33ow17x9voy90ug30n87v1khq2y53kt1v6gxze75kyghuhq7uq1rrz3t9rl6n0zt93d3y34aenb8ds00s4fuzjmpkvw8n0adtyh4396w8qwv90sj63o6dfku261fiwskg4g24mhvbjo7gxc2ouqjktk00hriax8i0z01y6gy9qumu7vsl06fynjolb5831dbyq8hal6t68cyj9rmqsyggnkzmsjbof7egdx4coqvdl3kqnha76von5eoqivsr3icheqh65rjermel2lnfhq93h7952nsbemmwgggm05hwiwy26kybfyowg2hu2109nuwg4j6pl7ty58uavy7pjc11sfwmu8grvmiv669yffjkxsde05vuz1wt9fhyy577bj46cg5aci0w3pw3xrb5xn53n6p3bryau7bp67ilh2u5wkc83nnv5eyoa5km1mvhhrx4mk4clglsoofgnzb9uvm9y0yuvv4fxlq0hqtgmyri61f02a5rswqqa0ad9976j71fxo5niyc4fjmisphzlrjwft7r86tndnr91v9vxq3j0x0837bsabjzyk3gucda3ypjjvgmvbqze9if5nqjzloq9pcdj1sv962nnpu6dm0v33u8md0ofhvn45dmrab58hgytcqodoo4544q97dxvywrh0wcytis5yubn4gcasweovieeqgzfontkmjfvf4s9s5snflci9abpkb795c6kl5pd9lhd2drgifa1jykz2wigvszk0q894rgg3w5bach3yz7cvxjy0vmi8wqctcb8c2bap3g1w8whx2wjlg5tat68qr02jcfinptuv24saptwdu366vpsgqek64yvjdgllogm9jll9btkvj4jwyxrjv87g0jibpbh5jczy9mskj9r4a7cj1zcclrb',
                mime: 'bz5lhzdgnihn2jlffwzwps22rrgq3incof260di00s99mw0jbv',
                extension: 'sweo5530utji4et11ijgw7uwe3xqx4jzisod2aaa3qieq43528',
                size: 6541537770,
                width: 425284,
                height: 951251,
                libraryId: 'gwizp8g431mufb701flg3evzdh8rpuf5a151v',
                libraryFilename: 'szvo6zc7t5n97z55sajbkvnh6py3ijqv2mhuuo07fxesksjcvnvgivmmgwf7zix3foif3z0nnd8moh3bgozfvl5wkbcec42uuzisqfye6757ilzp4gdhdake27lkq2mzf6pj012h9agc7k1okwmy3770ymihe8y9l3vuytk69l4bpechmk1pwnufc6vckoqvamq05jauzlzm12ta9oglee1k9eo8xobecjbphg9habgpmv7jsefbbnw9ws5wqgs',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'mawi9xm0ly1znprgbz1x9r2frnjl33qllvg75n2kkdoo1snmozubci6cyelg54pknaa8e6mi3rdu',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 399486,
                alt: 'mvrfmlpr56xe0pxfxjtomzpf6bcwrr0irxbikavqmw2pkdg6cd42etmp23f6ypdtdf4jbi24n141fwnzwcgayu1qypet3kkqlbixvicz1wfawcnhd2rx059ql62w3131q5oh77bkcl8a5tn66yxbd0uqd3qe39az27dnrmtabm2nbi04bn4bc6ybmft8zmn4czfjyhqu1v8qmg63zjc9lzek16yxjyv2kl4cw94ywr478qsyo22la1lpjhm62fp',
                title: 'rwqqg796jsozcajbcmlxcy36sti1m9zvdiwep00sjvykcbsmrpi68z1oafigjtbpsfxwualahvybnl4cy62tw7tz1qqel40kzftbuonoqxo4709prtcuzzdof4wl7tebcbb1f2sdnr1mk40yjz9riq4ftphpw1ssct488cyynn7r5s4f8p6pz1lw6pkh8vycjp8o2o43h02ykqdjjh292ceetc1seyo47lkjd3nh9nunc593b9xwqm7rksd98wb',
                description: 'Reiciendis dolor sit suscipit dolorem explicabo delectus cum. Mollitia dolore dolor dolor nemo excepturi consectetur aliquid officiis. Qui sit eaque odio id ipsa enim. Eum dolores temporibus rerum et sapiente recusandae. Dolores ut quia dolorem sunt et nam corporis voluptates repellendus.',
                excerpt: 'Et illo et dolores velit ab. Provident dolores incidunt culpa. Sit quidem reiciendis ut soluta porro ex perspiciatis.',
                name: 'tzt6nnel9d0h3yi3h3ch4czf1ze6ckrmp9hem4331zr5za6ciibjhod7adaldobn14oj6gsduf29rx1dzefhyfd65ubjfzn86ptc65x4ssj0hbi8wr73tp1jgjkesw0ighpuchlm5r1nosfk8afzlokma030fv63skymizg7d6479klomi30klmehif4pkg8q6q0y1twft8lzpchakgq91dg5ik3vv3l57vnobrvuf7x9exeddjp61kz0yfmdbz',
                pathname: '1l8qtqserto50agdz22137dmr3woycudjb5ia54aidgj9wb1iiukcp7i5bhc1zf0t45hi49roxwqrl9ygwo2vfjoud521a5ecoys1p3g0u9spudtwvpbyb9rl163lsrz0o8x9oizrobp6nfdolti7bvoyokhfvlqt17orq9xpog6lkblq8ywf45w65w0i4k0a9ufl0w2rbd17jzw0kwh1cp894a8b9txr95y1ndtseblcnoyn5htwdj99ajw3tflny73w83en08he0zezhrhoodo58ocrsgurj0gul2yrulmhxrznx2x9hea17gxbdmwdct876bor657bp635wjp5eti3olkbgeb7vqgxqhas8pkw0a8ccvvrgqfgyqn7sc3hmnn9cogr1j2cro45dej4sxo729t16cazbb5exqm42fipezfgwqtzd70ekrudgsvfx7cgkz03zljzyidf2saujxkekbwayjkyodl0f8ok44coho7iu41t2jjout2igehb4x2xq9ae4ooafzmiq2vcccrlh9dkyylhyprmoiocsv7gmd11iguqoprf803x15j1dplxmmjfqzbsho2nqkma59h7upou4aa8i9ea1dja0c3s0y0aeolv7buvrb98v5sj329rfuq38ikz5gafdkmhoke38ggd96946hggjdfyub4f6ft5j1i6fu3nsykj0nhyvvhxiynoyf6dijactly862t7nwnclw4qsuy8w7kthlemopg9qx0dp6giij2gklrm6qaecpdtbf4uy1nfrlhbcrhbc47fslo7y96a7ce92pxmdhyf3rakrgejm84fkqqw05rec8q3mfgep7nxac8aq35zumvkrxufcv139pvgef27jlysrl49m7wcc9cyccpe50gxd72vu77dx45ioa9um5vo43vmyjlp0kholglfo7e33p0y8rjrq7dy6ckku0xsjxx7g33jzyznuo3gntqxqmojh2lnjj6l8lmj8wky0347dl3likquo1qqmr24iaa',
                filename: 'yvza3g6kjqe61idvrbjbx2m0wwc57308mtmgmjpwv8ur1i8vkzoxgyc4ozoy2sg0amluyd32usii2ms4kv6xowuscd8y5h2dxhay8h8ivm3rasxvuoro18hbwy2mukz2br41jks1sbbs5nug3bwsi99e2gdfoor9vzece2khcksjj1uzqb3f4kxjyfndki2gf8bhpq6rpdxsyj5vif23o3s76k445i3g2pbi6mq5ad9k2w42w81wht736u50ei1',
                url: 'we401tbj2znjnrmopglfsysuehdi8qh289eg1660o3xpt2a2sqrj7ywz21zgtxtj3d7tq5okcmeh11j92aw82uwshtsz8sg6mnesf89pacq8ps99ux4sp5f7lx37yjn0kt012x3ofr02nwl15tups4waud7yesmgamzo3idypc57eulofe2wx411kq7mxjga25uw3m6unzmtesjupwqtaik4f7025g4qm8ses90y5xfjeeznrwda8nwnoqttm9327lle6ig2nt01axv8rq4jjl3tlbafl2p8xo94k8pr6tqvlr8v3rf296f5gar5x66lntlo7ek7a53l5shyhmbfkz82hl2vtbl1gibmx81g12edmnhww3awnjv4atcfjs7fj2tenbwf097zxukl4whe8oah62barqnlegkq8el2ti979dzzsuibvuhiicld9o7mhg4chl2k93wzm12nhq53htuxcfgn18set86xg1a1xaaa11yz38bia9gtnnogovw08oglmz6vcvi224u0xj1vx4imo99q8p6kspy3x8lg7uodjtxmr2f12oq49quoyal45ju0ajc4y8vpz07oi7c978ceynpdntw0vlfqd3ldypbyvp5k1m7v4kbl2bf4fhx7jahthx7rbpagm1wxvl9go2m4ip678lnmmzyomsk5q1315s39va8c12iyl0d6wqel4et2dzu4mueecunn9jrbn7h383z3nfr6c2q9imldis5xx72mj4pfgzf00aiaf9jl05cntfl0pk624k4eoua86d0f5y7cg56b5u77nxiwnyror0ra592xcusimteo7i42951vlvoj45axfjkllnne52ox8xx3s4rdakhal4lt06hb4mhgmoa23bz3l1y0tx221d1o0udbn532p5et5j95kapf2ycjzszwz5pfgpohn17vwcn8rsbchl56zluhmx1qq752e3guj7zrjll3siauttq6e8ssob79g73wbct5bu22m2fu1ta4sylh1d317gqq',
                mime: 'zkv5909bxeh1tlokkzj6d8zwx89661xcb777pt73eftm0o1bys',
                extension: 'rue6jh7ol1m9vrp01vi5h6iazyd48hmkw6d0kwhymwodce4tal',
                size: 1648932263,
                width: 489596,
                height: 553241,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'r62gf0521nnd7r9xmre9e33mipoue1q3e6daki5zsxxa5l6p1zx6xlvidwepc6l8kjbets44ok976bjfz2spehfc9ca9wgmes3swu4bcivnrntbja7lvekwt2drrjo0jllryq65zvnzq6i9yq5io859xnoppuxc9fwvzmfjsc3roev39kknh1u3jqwbqrspw5biz83e3vgoz523rz6mzxprh44gro2hue0i5xjbuvlcugq8r66nx00i7j062bdv',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'op0zmxtd8kxyy2nw8if67ndnqowjt91r4c24cl3wu6kp624wik342uzh0lcufdfgejl2edvrq5w',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 5677152,
                alt: 'op4g4pbpc91h51lwzaoet6v9d23atx8z31lo9b7otodxb8zbk4gf5z5wlbk2vxpilz5kl75l9hckf5nr4poph5fa853vv9dd2jn98e6xla6u6jgkqacxl0ge072hci0o2xmh0ot8tokhzszvwqv5b1zkg4ezlqmomm7dzu2jjms0oks1c6bp6ub2yczl9b7utjtj4c1k1vgfpaloicf0b8l5aqpfvod9znvu0xq9j2ioq5bvrd2jwsba5tt5b86',
                title: 'lu73cw49r0pumdukq8vnpwqcinogwdhde7wvoloembbu8ia9ipkp6ctlfkrn1isoy5arkhjuu5v8gyupm15ay2k9b74a5664uwbmxiq0ukhv9t6dfr9bpik100zdwftxq9dfifcfirtdwh32ue4apquh1yz2q83bqr79d96xfzkfdbhaqlfxplttt3bbiy31lmew5zy46e8vs4a2e7fgcb6iet68mpnjswtzsobx2i9gk5ezbxqekbd7rxom8g4',
                description: 'Soluta quia aut sint et. Facilis autem dolor. Aut aliquam quos. Repudiandae voluptatem minima. Aliquid nulla aut unde. Illum aperiam non.',
                excerpt: 'Hic dolorum et totam dolores porro animi aperiam quis rerum. Unde quia et. Fuga unde temporibus.',
                name: 'j9zlanuaghjzifn5qtydsatd35s7omh1wgjl7po678maa33p002cs1kpozvvt7kwmx9t111z3rpjwjptckf272v8gwmn3hcexmb5z22br41f5m7jw0wqdjcxd4v7fx98scw828zr0r5vtpg6capru2qmp1sh2fiosv8dgp3q7u8vpx8m0vw5ff4xnvsppb5oz747z52macy4017w32arspmf004c416xi6zlsdj92rv1osh4zo1taas6v0xrbh7',
                pathname: '618rk4xn096mc3wsznae79bwq1ftl2ibhhdx2bu3hit6fw7wszs5wkoz319q4aaqzf4k17qk3fgypk8w6a3hv70rkinb8a2ccq1h4h5rrfdv17cr10ohc0j8aa1eh3xmsliggzxcctps4yf7e78867r4t0oijpclllnxb89hdn50y15qadjwxp04vblrn96k096x3wxuvadhce21du8648rf7m8g44oql84hwtz3sh7bglkctq8b9xbsvykryp6rrb6bb7zdxtoqkevee1lfh76o6dauj7wag4yzhywz25tu156fo7j6vmz7b2eckxd1end1zflxgevgbp5lmfylirqmevjn8rm63w9m0b0nsq4rdhsxgjnz02ame4ja1c16mb7hc2wpud5mitnth7tl58427ajch9tvn32ks2vjo7sgj9nyvfc3z7s0ckal1agl4jr0n93jyxb51gmrlyw85kzrn5bfsm2w0sx8ks55ivfha38yjuivnj3f1xfwk35bsof3a7yf23lku3dmeavz3vz706sgbc5bx0ojhumofo27ybmlkb5zvvykhnzi8e90crv93or7zi623qow5fwm4duxn6sjvqzbhf51v07ecbyc2z3g0h0cwc22ixwgj6t2dhvnvwyffwtkj8e5kqvntwz7csdnzrlq3npu1ue29hq1gpi280z0qcacpgwykrm4r18h48g8oakq58o33cxeyh9n36b0ejgiz1036i2t9cmwo9wslw1jhdxrkk3y9ppn7iua5sqfjq9w8ajmz6ordkgk3rpia363drhl0n805o1dp21h6e2m94vbqwft8mkme142jc4mb9egxavpc1jm425unl110w9h4kufm3x07jzfv47fdyfjsunhaziawvtx6q0ht7nqukdirbdf9bfmo26c5a3ikx0mw7z1apqs48hjgrh4q8d6703jx9iei6stf20gi764y5t5u40ebltlkpk6dw09li6vqoesrpt4ryxl2ea5k4psba8gtg8gubdw',
                filename: 'gf52r16jugu1pkweurzj60zu2069wojjthiagth58wuzjp8j0ojbsilen579sw98a6sscunzrjn3cxgyh0z7mzoy2afpl5acpkqsq27eht9pbggxtnfzawfmiug6pp89oh6fmp2puvq4qmt6plpt8a6kiv94uxxlny5e30qyyxbw1j2mrfodf5of2znmfiten3p4v69w4qxh9h8giavcvl5z9cs5n5fqtyp2z3knb0dh16nt0umyncav976kpbv',
                url: 'lzb09zefnofzlrvjbr438tj87jhzl5ag1c15nwadm0kftamdih49ep89n7popzxc89gp3egudcrqk5klwd6e1tnnym9sfq81vqyxecwjdy329heh58an6y5c7upxuhpwqo3ersoz3bmh898hmms1of3hs0vhm1m4a9x8o7wvugbltw1jzbruvu2xgna7lk5uaxweflyfqbu66yqli1gg5bgvsahfdw6n413mwdf3yrzwmyi82z8d3pvmt1gln8up3oitkd3cuf3kdhhilzpis9spqpvjj1e4gerz6bsd9gl0i5fguybdb1wei2ib1n7qq7d0t6j9agki8leyybt533y7xu3imuuzt5os866yvca5qqjxgbmhogxhhiypz9evmdckld2mx8fxxpjzgbtjzggjp03hkddbjvnvye6l4eeccktubwoy8ijpxg7rkyzfjbedzd56ui368wr4rhoe51ehattwrnea5p54iesrow361r3wp64wc7wrx2pl6z4sybjbc0fnqg0819nzk1qoeal5g6jgf044ak93focooqtztfdvgbtnkwlc4k4s1t5yehmyk14ja610xfhfkglvi2tpnh5yiljs19j5xkj38xq2rl0u66zanas5hkeeymoujgxrer18v5k8rbex22g879kumbxggzuk44vrqaka5mspgnej2jlx57s0ctjwu0quvwgu1aoww3ijkcz4ognxzmc2cso8qfkx7b6wbmj4rbl5vbou4p4wb9huicew2u9rzn6j9nx9af7h7xm2mdhfjgwudqcpqngvdsgniplql8jvglp0xlwgi0r9utkflgccv2tg9sezuy0b6myi17h47nlip2jzy5jil1yinuzxqum1e6u96x9hjtgbdvxhvhkuhpjkvpmifmuffky81sz2hd4p7ezdbjrfsvbgvolmrusqmod8p8nkavmubu81pj4o4jtfk2em4p0q48v24mkmht0h22hz1mpdxareu0hmnxis0lcejyw41xg7hdx8lnij',
                mime: 'ilj1ecdwghl594w3njgjcvqy92pmda843i3v1jodb0p90yf17f',
                extension: 'nzz1w32jk1amyialeyzqh08p8y9tqjpqtahpqm2bbsqs5kx3mj',
                size: 9824930067,
                width: 924252,
                height: 515228,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'mxyv86n14ewa5hxuqoakj8br8lpx5ofsk8ytowytib4kd1wz1cs4136iiqsy5i095yrq79318q33csgsmmvo647o0dfmucgez0z9hlu1tcqf4qmxwhisor9dguw2fph9m91nbmw72gip5ckjep9v89trf9qm8rjlj71xzf1eromyzkmoftpoyh61z4amjnyjx7zxvr80r8dtnltzo923e3wk0qnm5t5g1n5ajrwpdnklzanu4b7yo55c5flkwi2',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'xvyy9ig4ci7bstyieppzvia6usmvz9i3p0c7asb6fsrslcg3hgr994ue6ek5exozoxlvoqrlmgp',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 504900,
                alt: 'jat4ellhvu5vb4g3g0aijjy2ranjnifyn2rbjw96ihh95ti5mny3wd3d6s63us4na124ess6xg3pboxxc6lsnw1sfhrjri8fou6f6jgm3js5s07cntt6ahs9tpg091s813h0z6j6mdddpv89odltcmlvzt2i7623y48v156nxuqnalw2u8tkd2jcivx05f8tym50mvozwvnsd4fiwalt1ypblp4jbrz8p2vj0jkmaj6c5nx9rxwqvtw30cm7ofme',
                title: '5405v5tk3g5lytmlc75iopqgx7cbk70vlowr4j2rao4frq88ntslm7f098pisb2557ua04hjl9m6hn5wnndn2xdipf1jrt13gzz7owhs7kdi7xlaxxs3rdt3u9gxzycyu2uf506pugwsfqxwa57oxq0uvwgcscrutx6mf263mmqq2mz856w37y7dalteo6jutx5r3jbcadppa4jtijc3ubhje743c4umigxlh18hpxvln3xqo3jxl8am8vqk3tl',
                description: 'Qui enim sunt. Perspiciatis amet voluptas amet vero iste omnis tempore. Unde expedita ipsa commodi consequatur. Aut illo culpa velit ut odit culpa molestias.',
                excerpt: 'Soluta et debitis et nihil dolorum officia ipsam recusandae. Sed minus in eaque in. Eius quia temporibus sit asperiores est ex facilis fuga. Aperiam voluptatem fuga et.',
                name: '89fc0b0r4as1e9ylxosoj08lndltv7o2c5ipkmldf5pwnf178ebaesmqeor7t2no6163vjftrsxsiybtbhbjja5m49746p7vgqm0iof751liltumxivppjtpor7cvx4tfznt20h1ocp2tg7wc83wagy2vgu3bsmntsdloeccsyfcwq9hql2gdhqum3nwj3jyt88y6jdq69mooitu72e0uoq4vlhk39x3r7l3g5qgr89f2vjdf5f6xf180oxk004',
                pathname: 'w2lxzilvqky974yba7tujnt4yxoujla0ls1lxmgo27qerfyzaoxvz13rzmcqwoxvh4kui3ugea9xemov6oq4bo3yap6jwh4a8fzhs3995na2ucyn8pdttmdhb6hg4tna8jaf5xzcsbrsapguc2wnnd7wrrp3k1clg30z4zdxfeh7i5zukukkmn7cmtn7m5vzgfon1ezwdwntedqa6ps3d5oxfuamrlzz736j1wr5x6fam7wz96k4cq4kleom8s5v1s1lkmu1n5fxtg5uu1h9ud3ek1lgiitmz8trjumtyocq93w82xloydgpilu0o7w6sl7k0mica2auh3du7wqrbw8irq88wffr021m6linm6znvcwp3zfjj10oxxzhuwkm6g3jrst7mkppb9uu3vvgmphdas270bynehq8payyxyryl7s98zldjv8wok6w1azws3l2848vitd0n3n91lmi7e48mg9jfrcl2qjphel5dnpvtjv6rzqnbl27sw9yuz24nwkpchqvzqc3w1e1ggdxvrk7kfm7z98lbd4krdbe28gxbxlmi49gsy2frw0kfk7evxze5tpl48liuq3cudn5x4jflxobra4n2eluo99dgnmtspa5dq9tdghvgsbtprmi1huv4t73j9icalq7j2vnlry3n4e1ijanqs3giooilvhfz9ebjf77h4gz9xqqm6e25funn6s2wzgd61egn96sv4cy4qd0f4r2wh4qujij7u3ikv5mtiug9l19as3u973chlon8lhrekvod9bzbz248omfnqdo3ztrpb5vj0m69uhq04shbwpgugh74og28upe4yhb15m8vqa167meef2twexs2nkad5oc1kkmwne5umb994ws6i50x8vjpfxpvp5pomd494246ygz2276avqsbywpfhde1dmb42tneeog4ifir30hmerpcps8b4sqljdfm7tj97zqr6qo45g40e7n6w4xh8vctw6e7cnzgymrq70kfnp9u88hux1fyqxnilq3',
                filename: 'ckmdh265sbjvmy4pqcdv7ir35ioo0qs0hzgut545mkkxl4pejtud76vkoeyde7xjps2bk99ex9m5bgasoe0i3zx9vqdswy1fl1tbsx2saez04waf1ehf3gf1r6r40vsa1ndldhqxv5mgpafw3iildppz2mfzhwp7g21jyitpjm7n16nn8blma8d3m2u0ny7d2cnsze5eam5tfm0is1xs6153nrr71ecaan8jo6kt6h7w88hfonviymfur2a4295',
                url: 'p5xh9v3ay5484be81nx9abobxlsn8l6ucw9m0skovi232fkfbbuqfj40315lbow35mldfyoopcviqql1t1zgu5k4h0dobfapkdy7wtd82rbm3fings0pm935jt6kxf4ugrrtim9qxz5hwu3d4je1azjep3gn1zhvxx4vjr77k8s1l23iif9foj93gg720mxed1y906nglvyz8h8zhdou6y2qhmhi5f7x1nv0ivxhef44t3seqpfnzv0trx8984fewek742i0p6n0go6n2pxp3bjrwk6o3lsm3ykoyxed0v8nguwkab190kg3x8hnv9vvrknd3i4y56w8629smmqeshbgpozqc6lkj55h5iwjq1um3z9x4i0lm30311u4mhpu9wgww854wijp3uymnsaqmigrmzz24llis2kvzqeootesgwnhzq4b3tm3cxqlllg28m20n0qixp2oyu1pjmflf25yk1qnpqtksbe9ddnyicnsubklpqcq7j2u987fqaem10cpd8fsck36mhut4wiso9tpaslnrfv53ue0s44wm4cjeybfcb0mfhqq1e9ehouk9s8e72fk90dm0x24ltss1pim33maqo7cml8p9a8lbf8qtc8q5dtpkg2uje9m6tf5z880ex1xv0mylla1r1lohi0nrfih6n44pf74qzro1lb8cn8h1l0xatatr61g77eearw57pfdxq3c42oonwnnww1xrekdvg4ua7n5udbsb2ups9uumvgn8ebqnd29ndjh9n7u70bpvtjzjcb4ckdo08d2rglr0lekjpqd8xprc1avxppx236j8xt62v2qz48k4n80enbfxxhmonu86nozqwe9bwh4oax40t3vyejpag2ji3tuw47w19uww2arls9gkfm36l3libddj0wue5bx0o4gpgh94yo7cmuw6h2mpbx1f0wv59r7koj8wzga4od6zzu7gb1pc66togxnlc6zbicev8mnnxhje4ezrvl1ulqs52czi5ullb74vooxeg1a',
                mime: '13niff161e6jvaohmoeaoofynt0zrqcctqp1r8owlepqkknye9',
                extension: '8n6yhvqvowkg3in5cpagzi0ecxw05m367tvqigjt6z6cj3svu9',
                size: 3064906386,
                width: 639020,
                height: 843747,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'ga329xyrcis2gwztcpkh7hg51gm2tcs737k4y11auyzxwkyhs8a8oesl99i12zl2tpekarxozoj1e8ypesd1zkr8vu4ssahyvje6s5t5h5n2u6jh9ta2lmrb76fy29n24jqnxvoa41rlyr5szvlr8q3ovu0u4gdd59oojyhfoedf3ghi2yrbj56soerxhnoxc82ar69be968mwvxce2fjaecxwjnhbigqfev13jg69ke14oc4fmwq3q40eajeuz',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'dzy4x9eb4voq3ty97ifw0ss1vkhddzk0ynax7tg7drfo9opl69p3fvpqbaid0rmk1zk29i30m2s',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 829528,
                alt: 'dk0k5e05j5guehl7ci2a6jx72uozz1d3jlz5dmq9w6eqxfd1l88hoi0s1fz5gjb0sfv2aunpuingvquyii4uqyb3l8l47bk8vkacr517ylx4zi6oo899vo6wbz4g4dls5a69nvhug81b8d9nem4g0ge8wpw936mxr2wkqw6swtm9oxg9djhwanzqimq9c9huknj44icezeuq50otqo2acn5dorpwrsoowbncz0xqr5rkupgsw3ih4vzfe7phkm9',
                title: 'qzmb5cd2exhs4yhnyci094xeg95ux475fn5zern31irh2d171l6xeb5ood4qjyyoydk31mpru5etq9zxvsyw1ecs37d5mn0rqe6hislmsz9d97xokw8qnirttig4lw6s40dw3e0hd1fr7ft4o7rgmkm93py83ljo6q98owl0aemyhf5ae1bbnobcxn4t9bck1pdor7ptth9hnkhr7qn3kop66k1of53n9bl1fqn3ck6solvk1jipe4elvx3h17lf',
                description: 'Ipsum aut fuga quis consequatur id cumque dolorem. In et qui est. Voluptatem harum est eaque minima praesentium sequi. Eius nisi dignissimos non commodi et repellendus. Enim molestiae dolorem reiciendis sint vero molestiae vero ullam. Adipisci vero consequatur et quae vero nemo nihil sed.',
                excerpt: 'Assumenda consectetur mollitia deleniti optio est voluptatem perspiciatis. Optio omnis omnis voluptas ullam voluptatem occaecati nemo sed accusantium. Minus veritatis nobis placeat nostrum.',
                name: 'e376h5bhhqty97xxw70bwk7mgll7smrhe38hf2vfs740wzo5ua5xgsk0r1mttkbj1sedtiq7iesnhefzapzsw3mx1i1dgrustkaal6g87u2avclnnv25gy5kbr12jlvkd4gevotqkjh0kxcfhg35omx2mtcnkt3op7go8c8d5lmrkft8pmq57ievm7v5smutn9u5e8bz1eeissl03p1bv19ln41nwf057xofxrug8jdaj3q97brv6oc2s2w9nhy',
                pathname: '3yk5gpnq8msgae783bh5298vlzq4njzxfvhe872n70l9so3old9wtiw2j8rwwfbjx0t45fh6cv1drarfqojfto49wyc24vwvaihw8lfofeox0m1t972068kon54k4xeljlsy6740wdmy96uahbny57f1xvihwypuatt22gn5sfiinhylkmg5dav7b8sdc63r225u9qldatcrc3mg5a6iez4x6qebufutty58q9dfur6qsi9zaejutqgpwsnj1fw5u8dvt7nq14sbammztq2f4app3jpme78kchh7k0m1pyfs9zajrfnlvqh7h4psvzg9h7njvpvriecdar3qgp4cepxw6lihxyzs5e80v13plsr2m9kyhc3bfamruytcekxnw3jyczyl3n9jzblz3rv74ailhr78ls9u2k6hfw7giz1672fnlproj8d2itmuapspgh47qa7dq7anuypgmx222798lmugmtlh3pp4ygh3eh0325ueh1tks2t0mqhht28ymt693njh09pcula61y1tmg9blfc6hijwjspd77b9gwq0abvruh7r6g2hkn452gt0d8sy8gqhibkc1ucr3dg15xz7fg56owihutc4bqt5lhx60ap92mg3g7xll5tt5y3jwz13ynj3xskahzqvqtls1sdugxgwsb218t6egbqrg7xwhxep2ephuu04slnzsaw86ihct5cyxk3q84bfleee230z3hmekpvdlee7rr7k8xhs7fblmcgiz56ydvaeofpsyr4gdzourcp9vxi4df64irfno31wklzzs6vznpjhqsupjn9bubmt4zkhs7052b8gitc5zeoxz0nsxgqooxue2m71w8xcw01y0b2jndki2wtrvoo9cgjymjfwxbxw3k4jm6q51lsldl0orc21fv7kfhrqborsr3f0i1zr4t4ry39glisdckllw8m8uy4ijyelmox5hpryt7wuzprr0bra0q731glyzo09f5l731okypuuae8yb9wwvysbfjbl2bb3',
                filename: 'hpwa7gfin5cdow16yujgj4uibh5jdqgpj97858zgcehnz3uq9dvy5ooxp8oifglgyr4fyp5pkipqi8g13kv51th0s8hvy1gizj4f1dly6ww7nlye2nq1jnsrca87rrycaz7uzm1wqk0div6zaxap9gjtz05q1vz1h721q664366t4ovotaop1w6839igv6mplib4ie2p57o29s5f0xrouootczu030hlamw3wbugzdl9xn2nz9zaenalh98y5b2',
                url: 'ixrmtifcluk37qvuk2zl6rm4evadm98x7zhbbsbu65nse78ltrqqsw5cpcaplr7qsxg0d9r5zq740ukkv0zrpq7rf73zb2s7etcgsdwe5ypvtgc6vq8p5zopnjxd5ikwpupk4kl5mipf1lom1utvz4cxsaeqbxx3rdzoo2gnm7h1qzvcf95s9py5qsefw50it2k0r07lwj13xl2hpfrf2af6ta3hlae3ipkdysrvoybdtsmc03hvtofk94klnr49a0gq2b8rqm416ahohnm4hppyiz4umhyrskxh4tx7xw2t15ecfrvpoiv14pxw1qp2ibmkplec2wqkd78sjyu1u6w7im4xs52bhi2xfdyqk7s12jx5yov0dffede2w9272mrfzyl2n9y27tv915hppw41s8s776me5e0d4ypzjz21w29w1vmsg0hd4fojuh9egcaf7finye155nhzn8gjjc4dt27r24w2504gp5qz5kkn2sxs389sk8udbglyf7w0rbz3z43muozggsb54vtpkjs6krkwr316998vn5px1cme1lf3yokjaojr45af16cnuewy86ymnmyqh8whftzp3agv4ghefjbu16pujo2cjziaa57d4oj9wibfrwfqnujabvs6tbfnsf0jqt5aswn8akuscy45noactaakbxjbfhnv9yzeocukq0fjlzakzj2ytphiy092nr081vy78nqn3rzimjfj1kmqiurfjguxms5btpg8270k3f5vjxp2iqekpof5ia07kwr8znvj7k921t2rdacj3i0tecnxickn4jettd7odjw4o3uk21v8ls3kf2luzzww5nfjbas6sx7xbfhgc3elki08mhqcek8xrh32r1kbie96k46pv93zx0s74esl0ocm9uljkfyjgvk45qiscq3wo5m8os61joycv0u3k403ag85piovit49dm6bec921rjfrq7838yg1mu77xwgkiortg2ukwsshhlvx6kwmy99lm040gnde8vw0sn70',
                mime: 'e9itqqtul327sy4eko4wzjj8o4vywcrnhlk44mt5rz4vq39aht',
                extension: 'k9sbqx6owatzak2hqbbpich3f8wdh03gqd9r1qmbi4ulcdjo67',
                size: 7953817684,
                width: 977799,
                height: 371070,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'kwwaqsix8g8kefgaietl71dlzcgzo2bbk32ak6dmr46q4nr496pkdvykj2wywv8amwdrfp6qln9aafu1gzroot4wqj1v5ip807n14o8nfmtp2w4l8gn5yx59qhyvyafjfnda2y5kcgejrwny5ylcobm7d26xtliwugf4048l59o6sqy5uszn1c65jfeyrupwj5qoajzzf18p28ioa8vgffpe9915asnx6xdn3nrw3vw4m5l0cacu5ethlfzxdyz',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentTitle is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'gaq0lvk8yif0syfdb6anozwmm4yrsdve47opmzd50mgqkhsae4xppx5lm8habdyzxnurjbyisjy',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 624686,
                alt: '6esn3lttbwdhe78vgrrzygb1vygsduszx2yaen4hvtxv7wid0rrfxjiw7e4q2depiprliddmavbhgyew0yfgjadlvprzx32ngogpqjeunshmlagnh3bxzhrlmlfie0ctlp3cikr716o41z07k9gq3uxjwygbvplphljaayow70z5fpgcep0dti5ewrjubm1s9gq4n72eoy16mtuogkdocaeyms0kk074p5chdukko4rk6d66n85vkihcq58h0aw',
                title: 'mol5yaw2ba2lir6kk7mulsu4r7ijbcnrncv2esezb9vtnoeaixb4rrs3kkhp4orhixrr209vl5l7dlx3qk9j2z67tfivbwsmhud3eq88v26c0k7ep5pqia1lrtsxb8l7dc5cbw21z56jc5e2lo9ayn92t0pa5ea3unb5gqmbvmvi85w270jua8ltj8q93tjzqpgm5hf68hpv2lej0i6g7lqdudnp3j5kkswr3mcwe9izv9pz9f8o7m1rurpux5k',
                description: 'Corporis ut sed voluptatibus inventore incidunt eaque nemo ex. Id est expedita sapiente quas unde qui. Eaque consequatur quo similique error distinctio adipisci praesentium est accusamus.',
                excerpt: 'Veniam et neque molestiae suscipit quae. Facilis pariatur similique. Fuga facilis est enim beatae ut illo praesentium labore.',
                name: 'j38mimnpxdnh3mylrbuvja9w0fwnf4b1cv9uzhm2fdnp0ldvorpvf49xujvdzh54akf2bdzwzftpqz9fh7f4mlyfrml01s20lck5w193fzeal4py01s3ncdx7qol3nx45sz825o6mpgiazq28wkfnkax107fh9em8bif13n3wrfn9meahc1awqg4t2n3f0v74tr2eqa01nfcju5cjka99e3adn0863vq3ebby2rov17wy49mpxrekhpbp6t2jp74',
                pathname: '557286q9u0bp125njpp2297ech3yev9rkkk0w2wg8y96y9uyhr17rkqs50t8kh6wynauk58ondovmp7onm2wwrnu6b015xp7eryj60o56sefmui3zveek5pc84x9q17spe48mfxgyry8arcbgzruetpskp42lk09nr0neq1c6x1fqfonsj1lei0cl8hs9q5iiwxwc0o8huva42kxoiy93oqxq1l6srr0mca3gzmm6rocxfntlavu7m2t9tqhkmwcbomp0vgc2nw763dfk5qqtpk0ajlol0g7ya04u3qentvm5h9tu8777pzri9p0qh7k3sz4jtq43mm3vatjkay6zr3xryptv8chvcdj6f025gl5xyj51i2dzxoukh2xbyhqq2vifcone78b09x2pjyu4rpqbxba8lpr09h0lsjktxqgaz7nyh53xr1xub5nenn5hbve2iaubqj826adgd6t9uur6s9ds8xu51ssf7t7iud9vcxj325extnvejgo1ptmmad0qtg8bg986jal3fo5my09zx5gob3xtumkojreiqqiiu9f1earx70yprvopoc6md88rx6wiq0kckhh9dmckxctib5qssghfha8oyfz76hnrdhak0y8ns11lzjy0iaugk1lp34m8uwj448y2p2tjns3fe1d11g5ivkmkdqo414f0hobarld3tk1nk450rz9o5d6lzcvi1s34pcsbmdadm8j7sugerl629l4flyrnj6qfs7xbx2cuzmqd0mx76tsrwn7ed1nhphdr6akf62i9zwfx1vg54fhye8aqfrnydwy54tj6ghw7j3cbs2pvfa21z1g7l6v93r132k2lqolfjsasj69ebyrxc4u8iblx7545b5ue5ybbtv0slexy8idjgtmlivv9wi4udkx80oml7irgbmk7j3tww2sfmbtitlmxsx6ugcxi1v0tcoktcse223s2uqakbjsm4d3405k6qcp5kntzjwp59qz6lama9n8j5c4i47d1sxuz407dfl7',
                filename: 'c3e5vmjx3b5f5hixsawygf43a2dsr6dza4ayxdqq8u6qfzla6rp6m7dtxl6xj9qkbs23ynheg9tpwzncbiafn6ohu6050jphbb15ulftk6n48rnxej1hj1otndjagthfx7iligu1mom16dbhkjifae9mz35dp8apvs9gy36la6hwtjwao3mi9b0xv4vqg4ywyb4kpgs1qxs52taki37frs1x3nuwgopkdzsbz5xtarbey5zw5pq94uj85r2u62e',
                url: 'dz3cg4ttte9j7wmh14zckdpp6hjx5ahwf7kug7slv72cczxeq6lp110q453et1vvxzd084hptgygw5wxc58auskas9qcn2qk56erdczwmt8f75vrzfvxybluv3swr1cf1u1u83dp742xw7pisl0weuiry59lzek1p8oagarzbylfc6h79hiwqnm6kjf5y3pdswm07lsnnh3gydo03zlg2vqxv19ll64h23i353qg415559twrbsk1lp83j34v7dfv62k9hy65d1p7u2wx46mx8mdk2uphby4vyyioo7hhd5sdwmwy7svyykpjh0m1r5wgal4fik6enny2e3o1bly4b40g8ruuvz9c8p8v0hdvawumz2plp3hnxzj29ajb1601z4larjk9pps9sabiso3yys251uh2ocw14jq7t1c32bbddu6n9b6lgdpsh0dn8rmr0xyda513of8puvf6286ongskejixktbq09h65nirlfn7a51fm8jbi49jw1tmqx1881l25s4ele1b3rsiw9d9zkiwv0gcyerjzdjtmbdwgnr9qtr97vgx9lvuemvdb2jwxo5rvjiisca4j7auk08iokhq5lq85b7xo5ltzrc5mvypldrxxoa6p8nm3ho5j20fqw3dwnoarr2e32m49o8tke9aw21pgkem7bfxtkdqaqwvc9iohemreaagvzcapoterih8ptt3o4soxo6q60gbaa6de21quxhf30jp0li6qbxt3y9f4tfw1ptf7i8z4uyoxgimquai6ayy97u57zw25dzjrvac50e5d4to1ovy6ur7egfl3ymso5gzlskqmxf36kkt520443csp6kt23ylxehj5qlbkvckzlvbud18hg5raroksiok04qt9fyhad6qi40ly5c15vuphovr3md20zrhms6i9jz59tom2q2c1esue38ftho60reexvvztloqvwsyy8tfi0w05zlq13pmmpuhyyn19df9rara99cxnnpds9kofhsg2gihwl8uw52',
                mime: '8l0v96ob7pbxbwkw0xr6viifahjpb0dgj0uq3tr2n6volmy364',
                extension: '7e59buyp3d20fhexjnrrs8r0kplznj3e0lzt5lpnya2rfurgfm',
                size: 3091143368,
                width: 303600,
                height: 270079,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'stx1hwsqji9jhdzfnkjdzww89ya1gwc7a158o3c23maez7eoapaix0l6umxiy358imam06p2qwf0h3oyufcyv7z4hurqgq4nth1jbdd2f5hb3twqacqlw6zn434t2gvn5d9wqr0p9nuczylgbrx065pdmn7yc2eupfws2c6qslpdgkvyvo1jbm5nm145tahbucumbr29mb0a2nlavw6kr7l4ta3guh3b5p92fwoczbg5xtwdhyu23w8vrnry86w',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: '9s3rtoql308hpjr3rfyfleh62xdb7p88r92e7thof6lavck51agd36l0xqcjtrm926umt07gqye',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 597706,
                alt: '6djlvl8kpdlol1nddblb5gunsbwewh0r4sducz63453sqmblg5m7e60dh1hm61jfh2592dzj6spmbeu4gbp6vdrkckecyq7rmewhoa1fqw6kp6afol4jpyy1a29zem6ayn2z5s9o3ayn4cmerhn9gozubb9t5zbypuoxuizo76sazwcvqr7hyqrxy38bi5vu7fq8fskcx9yie5tgjscl5uat6r8kwqr2pnu60hj0nbtw40tnmuclapu7nuoljid',
                title: 'p0shm25tifb7ncp422whn22c2fxvxj51xpwcspjen9znnphqolv3eivwrst483fo9s599w6vjfjgjvp858aob88o3eb7xcqlrtniz18d0lio8r73kqm39uqg0gqaaf7yp8spf5umq30qne4e98k099j3li9hnux0r39py2qz4epf72mwqqqywls5ar47k5b6mpxd511xtkxeuoswmxn1d8swzje0blgw6wa2f46anhgsa6h6nt6o69es0vjj9z0',
                description: 'Perspiciatis nesciunt dolore. Qui et in quis quo. Facilis amet quo ipsum minus. Voluptatem deleniti repudiandae sapiente ipsum repellat quis. Aut quam soluta est laborum illo id atque libero eum. Sint ut sunt quod sit non fugit necessitatibus laborum.',
                excerpt: 'Recusandae totam eaque excepturi sunt omnis dolores est et. Accusamus sed eveniet dolores sint fuga excepturi suscipit. Omnis earum eligendi et amet a in. Nihil repudiandae quia. Est consequatur sapiente.',
                name: 'sy6thjcng0k3n9snkyf01ap5pt0954ehocks483wqkwiiqcycztg6k373tqse9of8tkoaqxefx3m14b9644hipp0s57ejcgpe4odfp90cmwrjpux8pjmc7kdcvju3p1qqbr6sld9m9yi625b9e45bq53ufpbe83lfm1bjerhy3486ho9gqj70fcru7x7lbpfrlgtg7ohmdu38j4bh0abif8f0he57bde5vizdb197lnrvyc9byw0d0fw31xay9v',
                pathname: 'e2y3murahpk4d72l75mru8wapzu1th74jwpwd4k7ky4r0vvwjvxew0kezne4f5fdew8inwits7puc1j2epayn7nagjddhrdhi2ebrbctvwzj2zfoyucsibv1flrtds9823nelcnhcozs9mow31vkak0898tpqgs39qwn6vjvppa90txmnkjdqdqdabjobsto9k9kuf5o4bn053uywchwv3k4j49ip1ltz80c5u8ten74g81bs5t66p3w8k7pejaxxqxm0qmxd7q7z6ds9jxl6aseic7ej4s0n3h67a49r9c9q489w5btc60z6yzy7te6ch565hayeuyiq15gvmdphdalopsk8slnyyxgvhoo89p3azk8vx0irc5bcuqvegqlidh7d8desojqwsl1e5cgyml8so5bz6d9s06dh1jz1cj1hjgkxf79fko5h6gy0hn8yld5rlbvs7tnnl66behtcioxzbenwmbfre2c5arc99qj3uf9wd9yasvzao4oj9jych7s3ts5v6r19i1hcgdc8498wx5a4p46m8jpgtbqt5ffe49thy395hdysjjixa0whe08zp3fctncalke4xnsmi670dm8a6r9sm2sgofmbv2vwloi6epjfwkkri7nwxaica1a14gpd20u7mzfd7gn34duhy3e9uri2fhiaje87wnetlbmu8tegl153x58asw7cz4xfh0gc3cbwmrqyehbs6itlv9g2v3f8mb7qx5lva2e2ak9l6nwbhd8kbdh7jlxmvyh07dwgwoh3pt2mski5w4tmwm60h28qlhvgd1q8p1r81fqkpxc0x0prv93vhq0adxf08belavmngrsfbyzei7n2attkttr6m3hk046v1u3khhxbs1yg5tu6vi7xbz5hlif88xwzafbgb77ntgoxppclyy45c2l5upv51mp4akkuwcrnsosdkdd6f6y8wc2q1ztyp5ev9m0mgvvwq08dj3tohkf0jwf1z08bt72ek416pj4mxe0bz2jhfplp2r9y',
                filename: '2b0i9ruybtqxm741kcs2skpaf4c7pdst6xzh841meg6u1xbz7dr8an3z95t1qae7j8u8g491agrlr8fs64r9r1otq12db64pu69jr9pasg7fpjq3y1goaswxhn7aih1vyc31lh9w2r0t431tblh25eu7jdhbknlj7k03hdnit3wavm4q74oe6i8h8nyt7ao7krxcye6ep5kk3xl2bb45yunxvf2zz26cqkiuqxwtigw3c0djjq9pvrf5fw95ukz',
                url: '7y79grvwpspf40r33e940l3kk0ut4ywhxny2d4fxcqfrkls034pajsersawh4vn2h9lqtzpkvtxk8e2a8ec4i00ds5mahe7w8kk8khd78c2mqjbwpzsfeadj0hl5xlpunukmyt7t35h6g4ur09n5qtbzy91zjfpjo9qtw2p96jlnadbrbmju7gf8dgdjryf0f5cclk9fj29sb2jwwqqnmqajgfq8ovww0sa7t19mf2b8hwkqv33setm2q5sn8yfa92m8sswxkiigrmknbl3673wbnpllipe974m6k13iuvk40wh6l6nwyczd6jr7rp6ded8saiew1f650e0e35yg70mtc8sjqz850d98syj47tpt2ecji42dftj9iblc2p38ycudr836g6kldehfgbpnw8fg8uw6e1kcj7lhbvsuycgm9pak16awftcjqtu1n3gamh6gybmfvzhrf0m19r0g72i2dq7tqfrn3lufml0ob1fazw17794jgi08p3hs5mwbkzfb1kxxoojdv97hrwifsw4n6qqw8b8e43ft6vjyh2m1ziswdi3iyinrq38iheum6ly1f9d5gdfhrbz1circ0902f70yf95d7dowdm24q511pcooqjgmy4u06ubqrebjlb898s83kx3q5b53pnebfo06wwfb6mzm9d36o1xmvu4jjilpmew1592oxziav43zckym00sbap2124qu8n5n4ofrhcs828b9ia0qzdwqsw1okkllvzj6z0c2vjswdx6op98nklt06ow9nb4ifenka3pogkxv84slw6ukeri2p1dczkh5ba6bzv1fyiit56y0cdjzwpdt17c7gs9waoo57hu7r3koh2unwhq8prloh08hhq2qjbny5kibqb7y1o0j3n8d7yi0c4yokf0fyhzblw0rtw9cglhg80x810uqk7jpsfp7d00z6k6pivmjrxbgn60nhniy3upspekdengjtpqsrpix9rawi0lgex50dukfx4pmh0drpg8o5cktexa8',
                mime: 'iphcnfq5hhov40obcw1ckc95ugs9pqufvf2kwsfgtgncl37t92',
                extension: '7umd6uxubl0m786u1p3eftv45rnw3p1ph9ph5s8t4kw4be306m',
                size: 5165967125,
                width: 972972,
                height: 514088,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: '2df0g52pfc2ft28mktb8f90jrkeuc40qd6yl9gvb83cvmlar3u33mtt9aut7a824hsq7d4g5jicbdfq5voh1cyl9fzjmr7mx3aviy8o5r3hh9i1sisbfljtjiux1shwvlyqsj4omye1di5cczwx6q5uu0shd3u57on5u7ljcmmwm1q9yc4uwmiyh27mxad7nhkqdk362mv5cw4scr19864h5pfk7quztm1kk0hx3i2n9zja7mca1chojs84j0us',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'knbite0a2z3zzndmi2yrvi2hstdcvl2cis8gcahvn0i4b06gbd4p3t61z3hzbtslucuj2gtf5zm',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 940081,
                alt: 'du0x5jlodwxj261fb8knrp0x7usbsjelzb37sdxlglk0666m0ez52py94i4nve49jdmf480wxj7qyrvtnlsxl39yx703ibd1koohmvn2opkvxolijphegobdcw7jb1dftexz8afftvlqp3mzyfehb4e016riks0019u6pv4prteyssci85vllzedui6gicphs8rs4fvsvwvdtzy66lbv96cvh6d3tgydombsbfw3uueu0nqsmyrgh4ihmyenir6',
                title: '61ix476f9n3e9dukwwpmozdh4lwm1y52o44sxqr0nb8qoao19b3crj09xobnu58fq059gfqkv5thlnyjpikc8ahu4izz6758ku7ifndnisph0lqnip3c5tzmk6xkwpqsfkpujkv2v467wyvef6t2nanp4r6umoohj32pzhrrzrtolwg5suynq3fyt2njhrlehkif3tu7ha62ca2uwszvfa7x4oxtzn7lb8a89d06apsr6bjwrmt2gfatw2db92y',
                description: 'Et aut voluptas nulla dolorem sit vel adipisci quidem quaerat. Quidem soluta saepe. Perspiciatis explicabo delectus recusandae quo est. Consequuntur voluptates quae id dolorum. Rerum eveniet occaecati voluptas molestiae est est ut dolore. Quae ea adipisci ab quis qui minus aut.',
                excerpt: 'Et minus tempore quasi nihil consequatur sunt delectus aut unde. Porro ullam temporibus reprehenderit qui a laudantium quas officiis voluptatem. Et dolorum magni minus reprehenderit officia impedit excepturi.',
                name: 'ctt15bab2781pr8omcedvrsn9qhca5e7yaw3lsn8pkfpdst6pnooh72p38tf4z0n2jimd1zzujis2bu7py50holjt3v7b6t94tr2ilszrotxpdo9zkjn110i263j6ga3rmopgcj4fv5qurr0hqekhg5h4p2goqf5tslgkufr738ffznbueuqmjmk6p35mzt8zdgdt6f6rv05hixdz0gqhxz12glcsza10bjn1lwct88id5rp1y5bsfg6x4fg013',
                pathname: 'ntacspt2fmr4ihh0mg8vf3fi0hchu9kcdt025k5pjf18ov70ziym6gwslvhsbye7dkkbf7y1qm3nnb9th1y8yibysapyppxhotifo74vh5o4lrgl5wtk8dx7e6nfm92r5l7dvvmk8bxkjh1i2s7r5dvtq12ove2crttrhj5e6amqgx7jbc6uppg3ujuzzcxyqjv4frdraio0fjuomw172xmk91fw3iwaz8az3o3jr67zrp2zkjxcmj9pm9hs4hftcis3vth0b97mtng2jnzjp5i3jshdmn8lczaydsysbeqap0dvb231g5t88kr9w3bb3bpufhz87iga4zgcasi31gpsjnsxx8mab2ze9guz6i3v64e1y50osxhzxjdi1j0faiag2pb7k3aw4e6wq9jnevoxbbxpbexj24b0ngyraaa25ap895d7o08qxyc2xv4cog8tj4zt4bzbx2a7h73pgr17rtck3wokpvw2j4pe415hr2bo55d6y5mv0c9tx84urvw4kmmm02ixulllsc8ro3v7j3sy9973csx6tihxs73y6caa7f4k6wrrov53v68sj465f6h2tn30qslds2dtohsctizi8z5e3a5efawxypsf6wep8o0t817uyqegsw27mw4ggexvhgsl1ha29apqpmv7yt9xaavb3bna8mk7a2opak1y7b8ggukmgwj721givgcpot7ww0913990yp54iqujzjlpmwn2gd9oz5buu4cnmykmzzmy43tewvq12zjvuwqu44az717xxghi132ltzfwidpl1dqgsmv2kzt4r3ffwk1v60uo5qe329vor6kh1tmbnye6rm4uwa0cn451j2ijqpsogtt885i5wrykteaj6hgbbqzrmqrmp6jyn72kgq2ald0ml6iymzf59vvua65a8yc25miknv5atcfzdv935195o9bgrb85p4ukfhcxfcbxuhcnfw5noe10fcl4s89h44rhj2qlgirqsgd55y25lj72gg5c8u31j82owlhm',
                filename: '75ce7jchwk4j2mqx9ou1vo6bjxmm83f109yl12cyhstoth0u42u92wdjlc04a7861t7tcdhr0t1c58y5lhxh5b0d0mzotaixhc2ny70i4nc7nfe2dghuzy3q5wpi4m9osho5hq0314zhb2cr8w3vryok1cddq4nhkrjxlcbk7vffvpg9hxy8740ncwpkol2z71w8ns11k6rs3uc7y2e23f4q3vpaj39acli538nx8d22qqguuhthomen2slhke9x',
                url: 'ykfzpg6t38z1b1ec9g7tdczki7n1epwvlmkqhuoa3jdg6w7jaxmmtha7arv89c9dlt3mvcu4ty2dn7wucz4adpypw1eprw8rabvtemni7svovm8xyigbyookp9757esit5g1yzl5k6sxamu44a3maulobqooaxt5tbonm44yol7mrubwwllk7rucrbszetjcqplk3hnmtzqrs4izhepe3tr8mobz3umv9z0zm2ov2lccemc8i83595wvmeh4u4zl869uosx680avvdp4o27euwiq615c40qm0931uuism1bbc7jh54ax9pee5osm3expqk0j5cqn0h90urhmeb10yhzwl4r01zwslpaa0ys3pgc0jkanyb1hbtcyj4i68tqh4qmw4bg44rrzchwoe8gu3o743scw17wcz98cfhwip8nnp0jv6x6ca6rf3c5ysfukge6xvp2ioeyqlvzmzh55c0z3jmecaecj7arkko8ybvwgcfesxb4f8tpzuroxzoiz96f6msj48fya64j17h3zf6bb3jgxu0kcfflmwi1cokh3xlbp1px4rqsvwdzgwdi95suyroqyk4pgbsgmih62aumg8xer7y7xgwlu9rgz698od256fzvttei1se5a1431bs632b2dyjlvqiabz47mzw27noa1s21nljc3grwtvhxxew59pwrbuaugo5g8ze9ydm139wgbu87wsecj427knlehiltptvjapw8xeb35tcb5agu8dpiw2lzm4mwfzzgm5mo3b0qh5pkj2rowlo50pdw7ig133kytgk2dg75l7ytmcymx7uuaab7eifykrrqgsvib1flxijrf7c0cc9snvhtn7zqb8z2jivgjnycky9rd7nem3o1e4pv5bj29jwcw3luzlbmq5w1jvinb727sho91aojbxu68vbmnpk4z02nfb0n8s8jvw2mg70ciqvo92ys4gdz6yw55lhhbok6nu7c4b5og0osjg6ccyamg37fv9l7sqmawoocv1hmwmwbg',
                mime: 'zbefp80m7169wzme8fiy3euihibsyb1rvlfyjuz3oikcyp8eac',
                extension: 'bf98xwvzu17z8jmxjp4jx6vf1ptiu5wruvemlxkidyrdzldjg1',
                size: 7955249468,
                width: 102163,
                height: 505743,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'j1o3d7048w4i3o94apvrm8c5zlo99immtuyg3ja23whmu0pkvfonk7ipfzx03bhf9qbgh6kekmxibofnbhw7nvazo363oz8v4uwo9rz7eb6l1x6dlox5lt0t38sp0tbjouy8u5e3m9klrwyjfo8q8h8hu6nvjzzipcrppga64qm7vtcphljkv12o2kmmo3jvz1uq03uxph65opolegrxsvezcobed29up20pfwcacsvp7rvhr3d0g5ryoqznv1i',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'pkw5cg5z3xxxfesnqx9qtc8qbewi1gmjerw2kv6t0mt560f1ngjve5vlqgi8947snzxlr7rhlnw',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 155158,
                alt: '1dd3cfvr8bf8p9cb31lqg2zfngqi0dre0s7eo3decqxnthwudfwr4ph3cd7j8o8xe8yp25bsgqeytx9mdm9ceql1vn36f61dvmpdt7pn8rzuw9pfek7wlne2zsa8hslw0lot67fyxgbw27fyico3u9midynkri4necynztqv70mt254eyk6ffgjzwz05iad85m2yh515iwz7fqrtd9ttmkukhyxb0iqgarg4gbux2pxrrxw8x735xgi9uodel66',
                title: 'n97bl51p6t6zhjbpjsqso3leaneilibanhzr7r5leij9cvqayfi6yrz3dga2efexm206yydvfw2zwu9ric37xfo5ckbciwca22mbwso1796exupliusrgpy3s7h5s174zc353rd4npbxov4h8sbfyw3loyehtjul6pjs67kfmqty4nud4w882i047jyn9o2bun2ljxa4pw1ijje9ymw1au3mzy52spqsjrzb0n6tvvib6rur7wdhe524oairc2l',
                description: 'Quia fugiat ut sapiente nam maiores. Sapiente officia error et molestiae dolores et dolores minus id. Nostrum velit soluta sunt explicabo doloremque omnis placeat ab. Recusandae et voluptatibus nihil voluptatem voluptatem minima. Quisquam ut et est quis rerum illum laborum quaerat.',
                excerpt: 'Omnis consequatur et quia velit nulla fugit quis cupiditate. Expedita illo eligendi ipsa dolorem iusto odit labore. Minima est architecto quisquam ut facilis ut. Perspiciatis ex magni cumque minima qui itaque quisquam. Maiores saepe nam sit quae cumque omnis cum. Hic nesciunt quaerat illo consequatur iusto omnis ut.',
                name: '2dny5bgimza8v429k3uth6ev05hhgw9ybky0kddqn8k44eh1x1hqb0bm157dm0obzbo5y816x2p2eyw0j1i1b5rviknzi5qquiuaekmpj83sdqrsnbi9itsgkyed5agk7nact5jbyvrdjyy2dg2f1jgihrk53fwj2krvaemcnqi5q69kcg6nnqvnrkrc5ixonyn2vnu6mahl4a06xesxa2u3ltjwtnr5myl07z8870f4t5ts5xjg2t3v3ts1375',
                pathname: 'p0x6yqop12zhcy5t5b8l85wny2bcbk2zymhqwpj9m0qf6osd3sdauxvds8jylzcveft161ygrb6ff4a3sxqt1re54o5jqxkgln7rzkf4rj88zuimba0dsqe5wepwy2hbx3kk9v0iaid24rg3g6wfwm79f9skn0icz2722j6aouc5wwjexn23xx9vluhxklvzpins4zzdvvvamauu0g727np6dtozpelux46a9y4ys22q43hdopjxxjycj02kh1938l8pvdpxg7ff761c8j93ul6xlnduel9yvxqadggk6v8v9fk21waflue53vkpiwrpoatai58tgmln24wmowgty5fut4csef7t80t8depw2tkvby0v1zo7dnyxflbul4827pc5q489wgmmzfcaamr4810ric9fa6o57nel2xyk087if28d4d8vjo7sh61hp9xhqpz228jkqtdmskud5yep6biwo30p69gdc86yxqkfhq80vvcc8qid7innqxuatjaxh0gwafmls6z0du8y9tbe2rsoo0rzpz83xkbsy7e5hjy3wg0t797qm5dvb50l7qw7kdmsaekc1ulc89tywd7s307kg3kjtnmx04hu0cnm4b6em2d5rvrek2tphnt6c2secw3bzzd3c1wh8bpoe67vdymyzzm0kemgqhuist16dqhlgaiq9askzq4j8jo259vos2h5us3qugkb5x7xi2f634w2vqw4961r06smasyvehkexc75o2j8kcp63vaw6nlyfq3x6rwf3rxdk8tw441kqizjv2rjrmeh9yljgjtz9twn9z4d0wqetb9cwk3ugg16xwag1vgfeemgx426wn5p740jyjreddkczz7caf1vek6er394g1uh8md7jl02372nyp7j0las0ihfs8tnggx6sk9kn3rm0tesj6vaoh0722939f52cu85qck7i6p406o9rv8gtb2tr5gfqzjiiljm3qrb2nxqlybem38v1d3dchqdqkri67nbdfcrmq7blqfq',
                filename: 'jr5m8cx1dmz2h9yw8mqliyluo6wb0kuhtu7zk6ol7gnrpm6fxa99oz9v63bbeunsfxgcj13zu7hxvzmjdnha8iuypog60pelpmbioy6zv4lpglcbfi6ttu1uzg39fz0q5hbhnaqtepncmnxevxbg0g9s8qxf0juakk925s7fzj8cewla7h9ibfdai7v4tabvcj8we2nrgopkwtn4094sgaylyoq7ivfb71qih1qtuiknoppsyp28isrgkrtkriw',
                url: '0svosel2enym11mbgqcaamapmgy3zgdltkpydf7p55u6mw6oxx2l7l6e92o6oxeaxcytckud2wtghtukh5az5a9uh9czuz2eq1ckrz5hbm11bnkybtixero0bfzybk729wtuycjevu8n1tn0h0760ilxnv582pg47zt6c3y1ueoueyotcmf6kdenwebarg1af3cl0xtw5dbj4bz0fmbvbclrv37vgioit3bc38wp2zry2gvd1h769k6oyz42ujbbravtsnbv21tnksts0de65us8drcgaz2jz6uir243okbuq1vc6sghym4qzby8bhto0zab90mtc7hood8ps4cancsnaudfsoz29cg6ewf1ska0bkjgegydp8ui5d82i3kg8r8yd74smrvd3tziwnm7yeiyn09jyv6vm0i4oqtcpzykhsfgnv2lbyg61jse4v4bfyhc2azy5y5g9jmlf1ttna5i46jlzom9uas0kipsatlwmvpwbvtutonnn1b1ye122e0hew3fenzda0xh9428l9398dpbawhsuqi0hd77qq0zmicq25szuiq7choqu7b3tllak9rw47val23e5f3ahstzobhwhv2spagbay2zzcc6jjztwfwa4z5cj1ezbrfzj7ulqipzoq7h6kgoy1kiukta7chmlrs28cj4omnffkozp8o3e6ilexhl37hlj9jgfaw848p510jfy0ze4qcgwemwhx10ffx6wliqyocuorwzjedbcphoxxx4d7twdum038sad7jjyze1hla7l109gij5yjjjgcv3hpyqm37bjztrhxq93grdww918xn2j8a5hrpz1olybquah9losxhg0v18cqvv3zdhqe580xepw8047c8s7lm3q0xuuwrqmbsy6prup0l52xucpttindtv1r80u1nxqg9vfuybasicxb1cker7tcda6lge8u8zf3rdog1qc9kbfv3emtqdhteijl2m7d0nwa4799zak17fdcop0tqfk536gaio2hzc983uz',
                mime: 'fgfm6ej8wtryo4fxcjzt80tf56njsve765r79fqzv5dhpg5c6w',
                extension: 'lfqix0a79iaivt1x9kmp4ku06lnltxu9ezjq0zaro7kaahbsp6',
                size: 1804860560,
                width: 761411,
                height: 298004,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'ku29ubf6z27snehdkfrmol3bty2whg9dmfslqjmtb2s05y43ixes84zbwd0ov4e6pggode0okco72i01xda6cbsyohxgott1lfx5b4b0yorwsinhmslb6c09fq3sf9ff8n31fofeirt7nq7wpe6t2ler7duu7yj4afte1q3dgz6641ez9xriokqwg0zbtot8c7l262xg5x7p18y1uoo1vdz7vq6tbzanj3xh9f1va9urg98s12uy1nnx01uc3q7',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: '4eic5wqmzor0zej4lyhvagwyf94alxodn0cb42xp8jkoapskhdjwzi6p68lyk2tlixt8a3ub3s5',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 746947,
                alt: 'r2nuztib2b5lywateyrncb8g10w5qb65kervv9jq8kmvf17rc38bzdvfq0ryw737xb45ihl6nfmqqo0az9j1yks701si8t5xtlzhxog4tyfcf19wy5q7hkni0bc7hv1xxm2lkqw3x5vafiygfm87yfg13ofd4og1o7zof92ry5kxu6xy49kttb3r5brn1y8gl61b8cjl8bkzgliuxhtvxz6pucn9iz1mh7k6e4gl59f0jph0gfjvppm5a7zmq8s',
                title: 'hms65875gx561gbx38wvj2963005kgqcoxi4nwwop8v8hv906jv9m3r22nglaiw1ms9n0q8aeyadtsqzv1s9thjo72qmtspu43mvdipsuzhjaxjq73tki09wnm3qbpgybw7yt8jbjb5ejx9tloarp1xepu21tsh9c6o6xe0k5mjjd1a2m2hn1ep52lw5it6azbdh635l23egw08hvc5l24llrwqq3m1h14l1b0zqahjctm2b1xtp6lrqb8mtvja',
                description: 'Perferendis itaque amet quia. Qui aliquam quo aperiam omnis. Consequuntur sed blanditiis.',
                excerpt: 'Eum magnam ut autem voluptatem iusto est est modi. Et quidem debitis omnis accusamus laborum quisquam. Culpa eius eaque commodi ducimus.',
                name: 'k5iulbxwvtxfaeb9blwnmsi34qfx5kemngyke42vb8ygpk2r0wyxh815smj91me9jvf3af6wun8ag185dwkfx6qx444tiasbfc6mslwtu8o0602q4bw4iamkor8myfgcdoiwgp6wrz3bh0d8yz92vi501q7kh263x6t932qmfwplghwxkpp9t4zha74oxclr99ycssipgxa7aikdyuqs7240ycqie1of6gjgl2nn9xu3v9ws8flxff93u31aj0c',
                pathname: '6josnp1m8zh6pgjz2s5bmbxqhgowjqk1foor2eou5mpasq6djgr9a5x05zeixl27rmohvnq9sj13qmnl5e98jmc38uebk9ru57oa5aum41x5x8ycgryecsfa6uxgotkcxe8ksgtn9qipa9je1ntpp8ed6g3ujnmfa74yj7mutanp14jwc3xzsjt2q8g11v3k0ytbui1scnp71p3ge9lm8fdpwyazrbtwu0ok3wszbtoa9ro5a1g2suirjuu22r10uvpn7h92ph9eltqvdjah6q9m6oj95b8ubcjnr22gmopa6yqt1r97sudls25j9wmo11fxs0ash2zgn9ljbfuna9wt3xivvet88i3huyuf2dqvlbgvne1kuteebkozw5gn4lud20u810elqumgxtco0dhaxuy4n4upb1j2np9nrz73cisv5wfnnzpmhepuanoz9mpfggwadlzi7t97dgmvepvtdr6v5jv75v0wtax7yufodnxfcofbpit9a941pcaw9jam6l6i4ix12z6xd78pn2cwhkrpao4ccy74ys5g64ishsw3p7thptf6fclrkxoqbdqw00tm2z9y6kvqljnlwz7146zijk425aqr6mbc740qs8pjsbizs66yeu83kck3v8atzxo68gahjnvid7ys3gsqpabux7f8mp629j2xeawmjpln0rjrhhjb6gcgfyg22w0lo939dup08jedgg4krzjfirtfwcfy90lejvlfwxfrjwfghrsa7krragotm9qxl231jz75jicro8vcgtem7nxzr9a4nj3bon63uwl572xsgp7b7s6dukvyowoswtvr7rzs800ld8pi9riozr36fooocfmp6r3oubhgcx2812ituhkzuhsvhyewv5nzmouujbkk7sal90eevqmazler27lemmfyke7echgtpvtykkjnkrie1frjluhi2p0hyqkn78p9cdflr7g0c309la2chtm63pjvo5umalj7eatxcqse4tjxa9rggp0s84sybzus',
                filename: 'hgbfoff6e1r4xvje54bk97fzuqbxjhe0az981nc1404e60qbkygbnu63jgt6seyim0t5dh8p06zxl7bh9uecnpuwkj86moy6e15vnlmudyhiv8ho836aczplpql3y6tx5htegjd53ael38exr9riqafnrdmtv35khlxmhdljr0o7i0yno2zna7uwidm0ntedcs1dvcmazk4g54bkqkwhftynco4pn87onilxaydpjp4kxk5wdjga89sp7ps3bnw',
                url: 'ag7e89a273oh0re2y79v77l2fwn8q2rm4njo3eftrct10f80xjx7nvkitu8hm9zl3l0nkf9eoz8vtix3ctetaweqhymnbhab1e6ld8ob1qp09mnfldk465dkpicev933qclyyahprjldx32ulluxuqan0oggg86v766vvu2vsoj3yq1sz68w8dgj6e38324zeis0nkp21hv671xtby7wilhbl06tn2nx0gfbf9ukgnt39kwq0i9gunqw4wyttu0b0qc2fgw9yn45bs8kapp7wtpbu8xyimw32a4drg5bnu3ea0ke25l79u5qy1xlo7ox2trrjgtfnrjipwdn63621acszjz7grq1t8vhcwkw1zn5kx36ax8ht8azvfnjbxbg7yyt6fpgsjt4f2d235nakpc24nq5xz43z6gjvfp2pgl0ko86wrz16k80tvo9c4o2s9a7i7u0zezqw6nwm5rlsloinwwbi3j73kd3qpe06e63da004quxen60e9kl0sbazyebsrtxlo9t72yaiysr1ktd8lm00j4zr42891vwo1raz9xpcrctlp555h6h8ar3kf6c5de4kmmyx6krzib2vkwceuq3hrgk7967tzk5rtoaymaurfbq9lhlrvxfb8nskcsl17ip3nyk7tkiaozyvtiaokxf8vf90hk2bxg5oqh9nxz9wbdw7w8p1fzdxc1j3qp40o29txqpfi771h8wktsi1zzkdw98lczpecziqg8uxzjw3e0mb3trf31m1i8pssij257mfj5lnocnewj3zzvnoo5ckb61tutll5p73zrl4nafps06fasph5blbnj5j129u8phbxee07m4c9hzn8221wwwaoc1r23sxbccjryn2kwegwi77yfqnor737ai8ppnzkoe73t3k9effl2z61hitud1q61h3303nf011o851owe8fa0xhvk71it8w2sym37tw61o3gt0jo2g9cj26wslho4f934p9pgwfomf18lyuig522dgzyy780qnunz',
                mime: '1kgxqr9weprrtofs61yobmbqgq4562ritnk4gsf0jm2qt2ow9k9',
                extension: 'v0n5rmj1ncpvxnkhr907gdeaxmenlztsgfhse8pqfnuemvizqb',
                size: 2514322283,
                width: 475237,
                height: 547050,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: '59m76tyct2r1byzynkplo92yvpeau5pjn7xr4cl10fqk9mb2j7gk6v3ikpupiyunpetiwzlsxr9o54yd9jkivi87080h0or2tg1kv7ik56r60jz2k02fx8s8yczyf2oozewkvfcenr4lqvz0do95i3efyurmbsopn98rmb6wsdppv59ifw33hntl8uz55fwaeyj4wle460xcfy428u0gv8lzij5zr5nmju4timhzgwrq7rdz6amoyo9bhrs223c',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'rp1ez44xzzi17rgw1m4n8p07zuewsb7ze2pifjymu1rcgo3t14r74ifbk2axg4jkgfq41tcvday',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 683004,
                alt: 'pw7yily7ec8odkeas38kkl4032q27gq68k1jk2904wiy008i3c7oorkvxd8cynajb5px5zlycv1nmtwts1wu1dy9sa2ntnwgue6nrj6i1ebhf8su01d8f2wt50rqbn3oi08i3wg7n5iuk3xpiboldo8571qf9495ts1lb1dijgi0g8e256kj8t2fzp2s29636hl1b8vrxwpkyyf2pyggeaebxbyvtonwmjx2rzvc13emq0uq56uc98y1gdbj5em',
                title: '5xk8x6igwqwviahuwctdp9um5lx94s5echr9o1ef4fpe6u6iutq5lqyotpa4tudwhsrqx8vq8m5kv1n2sjk2rtggkzl0octxww2ngrmjo2ym1ekgr3fpwga3cxeq4w3o72ibmrofkwog2ke0239vk7cw091xp39g8xsivop2san586eslr5d0zbmse3g0xtoqlsxjvxnn4z5ypu28yj0gccqunbpv1e4uz91egwmz0agxymdcknelfkp2q4rjle',
                description: 'Ab debitis eos vero asperiores nulla impedit iusto veritatis est. Sit et itaque vitae rerum nulla deserunt consectetur et delectus. Non est dolorem id eos nulla et veritatis suscipit pariatur. Eum possimus assumenda ratione unde autem odio id dolore.',
                excerpt: 'Rerum earum minus molestiae qui qui. Quia eligendi qui qui voluptate corporis nihil consequatur enim. Facere nemo in. Iure aliquam ut voluptate veniam delectus. Itaque illum ut provident aut nihil vero officiis. Quidem aut qui voluptate qui exercitationem expedita et sunt omnis.',
                name: '4f12lucqw22tqd7uclp8ga3d449881v4q3cc9as1e1vxqb9o2yf9qgmkke200zkckh15z6twzpy2us2prrf3jo9kkj7yykn2tiisdo0lkvnibuwf0yvz0ojqhccr19fyr8sl1i0suwdfql39q2p47t66uca1w6eu1i6toaee3887lglj9bkuspv09rtxxmvwixe2152jtgqtlxz2dr1jqmmdgnzshfja5os2qg3v58xqc8spphjgx36m1o3prda',
                pathname: 'kve5rzn55yf3bmiccyb7lh8m3vwlaplakva11am7tgieva5ykk4clba6s8q9z4bnsbbxvjcayobvg8hk50ggk1itr7ig9wumpl9sdk4cd7wsvff575sxqzdjqk7f9rro6zfe1y6ev58j91gzjd395ndu0ughxbwem6es55r28ukod0nzo70gr4dpsxmx6oq363fpl1kcig8c8ipln688wfk8gtrexwx3sowlwnlz1w2930pbumifehj1oo9tjnf4hc2bvv083zo77z8okjhqa037rvy505jr5977am7kbs7h0tpgicd7byyk8aueghiqm3u3wpy8ld8nwonz5iui5ghcybaudu1qzmnzxrycrhwmm55vfxracffh0d888crazb8fgj7mab6p94wd66zammimavfd92nald59exwp5khwujkiz7fhus3d3o4ebgx3s4xq2ulshagtd4s5req93pqgi6haszw0tnn67bg84iqg9o3y7fil0rcwu42nm9cpsa40pwlzm7ua74pawnutv0lsvc071i8l518dj0fegcs5bpk5cxu9ctilegrh64i5oedpyxaf9wc4pvy7vs6w1yy3xrk133f8e3nff7lyqgp4kluj0p7g6cc8h9oipdyond9nnfm83jh67e0vdcns8xixh2vijzaqzmq5erhc85vd4n7k6h93s8poonp9kio1sd4j0up19ti7omasu0i1rlnj6qj2rxkfwe6m3bkt74csqcpdbakyvlpwmi74xje38y4jcbksr107ayzky1jis1xinp470k5acxoohrixses452y775tmsi9hfu3y20htu7wpektndpojlgxr8punwn99iq0mozhv6u7e32rzjwteql1snavbjp6ut5co8j59tlkr6dip5m14qhfegh5yzi67z06ed315uyxn5wq9bexd4atihvg6xqkuaoeu5mu2fl5unzlxniv0a517uowpv208836eu2ztkun6s2ksw7k3k0zz1bdslabc9fya07ov',
                filename: '6esk6yf8mxoagdsjj00s5xrtu68rxp4uz2uibtbhkdfljtmmx0sh6mu0lyjy9wehe1t6zpy8v2swz0o5keju4nlffs0nizdjc8ygg0gc58hpp0fqshx9q4abveypfck5r1pxnhmje98cqbzsmjxv6p5yqiytvggiuv7tzqw0c091qlv1v9n33ue624pev5iivdfmpzddck00zdrjnvhll94ftdn86a40zlu1lbvxc1x6vsvhcf60ezgzzg51alm',
                url: '44mmv7eor7mqjhpndmd287pt4cumamzbrnk7t73vtepol7xo1zxzfyvsni0xdfb1714ml4oca71osxd7dggylpulockrpz65jdcnmeg6mfzneeta1zmjorybnoae3moo6qox8itrl7uu9zz9wjwfclrtrbti31awpbm2y5y92wk5d2t40utvfsa3kyzpd4jr6m4rxgvxx11fhp0eyr4lh75fcz0has8plia9p2cgxf64jcsta7nop36sbblp9ju9ylsqrkinoup6492xabwvgl15fmuc76qqt1v12xsl6mqq7u1o9odscwyzdpbf37vxdmwo2gv94lzc3jxr5r8363twoblhofsh5qf7nfdexyydmqdcgsbp6u0aqn7qm0l6jnsm8p59clxptljk5s5pvxu6l5ai9zuaxjzepcy1yfe04d4pnqvir6yhorusmj547b59v4tagwbjpw4atd3cahregbf5acz5qfrmj3sxi1vnh6i782yn9j3c74ggdup2qey3m38sgi0qjw1e0zbv7xbm0ysry5lndj3bhoe2ia9mmtpa3t9bxb43su1kzaqoz6cyxp9nonbtk00mf27pdiaicz074dy287qfjf0it9fsc310tzx87ghlfwklgm3xmg49um82xokdxrq00esdjfz0oldkvq2hvqzbqtkr8gdzruimq0qvara8glw9qqwtc2h1v00962y4fhl1dqaud28cm40meluthhdzonumt8ghlp58tm0pksh58qg58ejcqegdzc331yac8jtmlp8gskt87d2lrv9z8laxt00tfwcuzf1cmbanvylvh1t2wx6rge74eiy7fci5f459el9pzu4n4xjtrb6t7v8uxpmbu6v71ct5c29zxfnl8bhgeyfl2r2do8o9ir19ttbhx0euvdght8oxn0y5qrrnqcrvwl4t7oa0myp8wq2akpbifnjian38xoiraka3fkjfyao5e0230fyvcbd87wgkyk4dzte75rdmv6n7p7srcpwgpcbe',
                mime: '342caxhx52gu5iv9v8la2ydzz5o069bzy0n4e56uxk7vp1m6e5',
                extension: 'v33myiqhk5r8s3zi73mz7aytospwiawvgf75wecvj3s1mik6mgl',
                size: 6833599146,
                width: 410216,
                height: 684422,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'f662j4fi0ina483gbn1e8cbj5xcyv5t7lseabgaazbsf9yixmccazu3txrx1sab5ja5m695mbitbbs7si2kr84j4mdcsodl8fkxeyyxme6q30n9xicej5xqlo1inw62z4nj2g5p7epoxqze0iweccwcvdyedt71hts6znna4xrwcxrsx4hzs0rntbdgg1hpxu5xqv8tigotqoco3serrdswu65c3f027yl5shdbj2wphjsiaqqe30jt4njzoltk',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'wzd7qihrv7izg9067leh7237f7k17kzo90nzowqrczpakmovnpqigs0oxrklgbf18xtxaee80qs',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 627562,
                alt: 'w5dkdvv3feyrn17xdknou0ktti2le2hrniznbv2dt6dt5s4r6rhhsn7z9kgx4tzzcxdroijcrqo2n86cclw1afpspzglhq7h8wy2n8bbuq0hajn1lfq5ayzviwicc3t0mdpoga60qcrzoflqjuuwv2j6kv7fq6ehhxo16sabblmyk7fg1qzfn7ev5w66djqkaczzmf9b26ksekrmxeeq0qoowespu6bddwpdv8t9jvbk0knc0jqqvsl4h8e4h20',
                title: 'vegmqw6dktiyyodq1xg83jl2que3tn77atsoxdk1pyajfsl2h60w8y91ykhhyf32sip5fe6fcm6we6e2rbd2y3av76ftmaa13efq8r9w9pkivbcez2l3dgqs7beovgywgh5eemdvfswropucp1s0v07tvbr40cs8lype5sh6i5izsl7xj0bxc8kkrta9jn25y58npjt5jinf6lyx9vbcblu6uww7n1vi1hmfqjlfk0qkpo4vtqot6troxkquiz0',
                description: 'Doloremque est ex occaecati accusamus commodi. Consectetur architecto fuga. In fugiat facere qui quos amet asperiores at maxime qui.',
                excerpt: 'Voluptatem expedita molestiae beatae tempora exercitationem. Dolorem reprehenderit numquam libero et id. Rem id modi accusantium consequatur.',
                name: 'rw1ijeq6zq8bcqjizo805r186lmo8983qtopgozkr3z1yd0656gjz1rjpa2mm79uqm33dndn8wbsom9vfzt9t9yh0zn73veoyrlb4ytrkwumvps9wcp8em65y68b9v5npauz6wdn913ezdx6wbezc27rgjiaykaq6md79fklqjoddmqqbdom6jase3ph277pl3igehw8beyxike9j10b3qpxohlrovevbdliqvaowy8fhwqu5ut9kdplsl7n0qb',
                pathname: 'bt7lphlab5t76zbxf1f9xyunbt8s0yhcea3y1adho756itlyhob1b3xvwuaddsm0evyx13mxi5pnd51a3ffwp3l0z7kpyjjgke6ryi25uv8tw5nkbcv2n326cjm4w1idrmix7k7zibxh1kxjydb6h3xpo6ml22c3yn0gzekql0jelccod2pkxr796v1c6cvotiw976352aayqbaxn2229yc0qpovpzawp0k7vt3pp8rhtm22x0sgqs2k9gva501dj32b4h9x3baum5kprkrirxg83r6lx386jd698icw6pvmopa2ktgckh8o6h91g11y2gxnvcus5hba5p0aerhztd3zk6agg38s4uqugwh38i09w7w098t96gzzox0fjbyo7fad4mpy24o7d86b90u8ufqmdv5qowgve13m1757g4pszdkned3pr745cdhj8mivdan9wn69j270kcj69cqrusle80n0qfta07a0c16hsio5c0yn1sq3xtjlf5afuex4efob5jqbtxg1ixha5hxxjaw53pljjsqu2pzrdaa5wxzbyuphnivfvvt42qu0w9sghoeir4de7sryd86we80fvw20zp9b7er538aj4und6bf9db5ate45c3hv25m2475ebnp955pb0k8icgs0wbpm6cdsx27jrvowf8mxk882fwcclgwm9kc5gn4qbu6uxmt96hm2o1x0mm7sjt76b8eyxt9ll53iw92co9uqnjfiokd4p50f3ve66g5cltd4ggqesx2zb2bslricexx5qj2bnisfr2mrrc3qojp5c7sdm51w3ekponzitj21kymdtn6txpgqwgn9ctz122zwtjllu912uvgfe8gq44z3hjib0skhf8qxylt5if01xyi553kagaxr5dt31ihmry12e0y0lu5qiun9u63r43kg6tycpp9h7k6zekerm2oyy6yhfqr5u66kbjele9g8hubf8x2ag6r8zszigysg1z3qyz8ojf9y88bwejg4h5n3o2ro0hef',
                filename: '3n0xpy3wm8goofwbk0kobwxohctkg7a5g4t6ukx5sfq1em4606l1hl2wdxo52ih3stxe9qjp4il0q186beggonk503aknkood2xr1y511678wuer3iro0v6em6nq1e4js6hpt32rngpnzxbizfnl6zx1op8m3izixnaeim03bm5xll3rum3rvcwwv3vonw58ehoa59n1hsswl1ts0gunk1m43q7zi8decjldsvvluszn17fdg4ie8tafkrtz3ab',
                url: '1j164j5ptynexnvthj1wbvji6bw0pp4wr9qlow7hbo03wbx7mr5kci7suvk8iq2ewdw16xupmb3w5297pk7dzz3ys0fvg0muk75e6mzxhjeu1o3lqiwuu6fukbhum0kuzf72sqk83c8rhgunifod07t04w8boomtrdpt8y21w901bhqbgxgtjsm61v60k6p4obv91wkhf7zd8niipjg4ge4t57xn8iaisy6sembdx8uf4pnk44iwbf82cvusyhsqk1cctvy9od3hnccjtaf8mz9so2bgn8jtq4ehxsdoswzyope9vwq8b1n1aizs0v10cfnf5yw0fwipwkai8rli0ggw8uhxtg4794jo1tsv3gyrsmmznupvm5v7nu13zxz59s0so9asfyx2ctcjdkkjtueakvtc025zepi3f3dkuvaqunm5mvgc35hhfs2wpllblpzbmautzlmodalm4wlqr2v1jxjddifiz8cnp4qk672o440hveyamxvscq1cxykfyx1i7hxfour94jhnsfd5dogp3oroz52v3vsz6mjhvogulxuqdunqb2o837zo4chrodwquilmffc141ug42yr1uvi6amlr9b4fceh55b22n2dmgqo0hxxwgpvvn9yc9x8bqf7bfnzaiegp6dy7xbh352igz57co9xhyrqg2ty5lcyp5ktcls3gjkq1l52jfzvhzujrsmfon6lmnzt79wkqlxpa6e2adrchp62qfhw6d67ptm28i7vertxo8wec8vpsr5vfunm28n5eb3jnv4n3tutr956j80lbyww9rfx483ya6b7zhly0dqwaojkhc00erig4k4srec6c1vs49qt2qrfszl83o8g8ag5x51baati3jb6u2lmqadu6g63bx3v50qd3bjngv6qqjmiap07tvs4ggcad418yrind12egz8io3o2nho2t6vw6s1puekcacwk7le8796rjlok40him4m17ycvltdi1sgzxfsscfcuh89rddlor7w91grlwn2i',
                mime: '13t94mqyh4af5pz0mwz73uq4hbzzuuee3eqc7u8319kaz7s7os',
                extension: 'poznriznei6b95utx37n7paoqaggtiwjsvmnocjcshls0jrzel',
                size: 44132989770,
                width: 370958,
                height: 964712,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'l8tfhvsu8nd9ypmv37jiyythfnoqngm0pjhcwdum7p5ho24bskve9ahp3kzrfwzxdy6w5ls0qh35mkn3r0mlws240f3gosnf2wsjcvelpflx1jvlcmv21xkgyih1pnzekv681olpxvrgsvn64v65k16r0zbcxjaz3rgvt564rjx7mowh5tk08ul6hss8u4aiiro8p4xj8v3vc27vqe7xxt8g981wwnpqsfvzlgo62d1yeddm73ikxsu36cvykj2',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: '9j56ca55ow1uw3nvg9gbkit2869q84wsz1o24g4rf95bh9dy64sx5qyteqibdm18861432nr9qg',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 670820,
                alt: 'a92a01zlzgk6rihmi31etvzlmm6027yvyjzvg3vmlozdq1ptvu6pye3edo6gsmn7ia9g2yw3ugrp3j4esqd4yl09qdoy3sae25amrqyrwg04rwyb9sovl5ghgddpm453duqwj6b8s1pelj49m5nzy1sc0xideor26ks7mizqp0e2lpystbt2v6nxtmj0d2sz9q5b41jb1ua42gjqxaqkkd8s8hto2928exezh3wfhhdlp1yvn9i7genk6a77ksl',
                title: 's6omnjia9reodvgdgv5c14qpu766aa0wlzrq6u4r274c1rnm3it2sarximucg96gavtq3w8a5ife4y4l706gwckma4zwqcoxcpp0gkfsgle048vngzxiq575ntt9ghc8v69g0syj4d78usu00c2qo73pr8qxi3up9a1zm74ef7injp02saufxcx22nga4s6etoc0j3btvu5564m01tjro7yaxdqtqd7y7v0lw8qjsmtvdim9o3o0124hvwovddg',
                description: 'Voluptatem eaque omnis nam vel eaque. Nam cumque quia maxime incidunt et fugit dicta est aut. Minima qui nam dignissimos voluptatem voluptatem quaerat aut recusandae architecto. Magni aut sed nobis iusto ut vel magni voluptatum itaque. Eveniet iste ut aliquam et quisquam deleniti. Quo nisi et tenetur veniam consequatur omnis error qui possimus.',
                excerpt: 'Aut explicabo enim. Molestiae occaecati vel occaecati. Qui ut quidem ea odio sunt temporibus. Est omnis id laborum debitis porro. Aut aut rerum veniam nulla consequatur maiores et.',
                name: 'wu0exbedwoomubfrplmvmdrhz2dgerd3qoybkce1mhn3gzjy5112mglqexucivs760imebb8hbl0cpha6yrb1ctt4xwzrvf8yfk3ixpv5crq69yzl25zv7zdmut9wwi5i61t31u0xjzcbzxat2ivlqvcbak6055n7efqa17kazc5scjnkoayvyrcg8dwftxwcm5xegasiaduuz4mpch8h0egkj6g0dquulmk7l7aq9aw9j3audrjrzkl3dudtuw',
                pathname: 'ytdcv8et8hnwljv5zlbkhw0ycnjzhevz3o6a3kzp11s08wh7zuhx8fup55n2oupp72kvchyykce2fk4548bkror51xajtsldegnu7vuop1crhgp61h6jrerou7tsm1fpsezifywy769yvwr8pjsmg7idk1havgtirme05lf3mrr7srwskqqb7jzu709vkkrcn9chiewqakuk7p691399m5oyack178xlnxqhqwmbf1hf0zrszjgikb02exhjmvxig1w1p1l72vseuhd0s56yh47l4l7obnpf6ffnnjvncmberlcwry37u7bdnb65z5qhip9ucviontsd9ciwpp4kn05f4rt82buu5gwegkxc7h0sin8okqkt57nt7z93t12hn7gvtgtt70r251j8goeetwu5fzyc9qonsxvtktuf21kcxulw16sdtuv6zp64db9ebnjndzo0rlftxd8v3v50csr0qd3mmr8un34ds2di4tyu9zbu9cb8ezykv9is33dqi2dh6p24svdnoior7cfzzp37e6hadqjyok88u5roymsf7cej4g316gziqt9ob8kt1f70ij2f7prpis245dcmdgppeqjlyalufrnqbhe3ho5olxub3yelddewbkcdiz7726kh7eex6a38q5bfxpji6b3l4pdv7sg82z3010eeoz0zee846t2w9crwngp129tp7kujqbqnmk0jf321l01y8y3bpk0qp7tpzkxmctdee042arxb0iuy72tez7dnv0kridd2unj3jg1p0zp5oi93ftfgseuadyp3zxtlc52iyk5hq51dbjhhz0waukdziesgl27pmpeu68qdsgveul1uhx0opsrm5ws9uj3gvsx1voo9on3f1yjv4p3y22fq7fc9tld84nwxog9ye32nq0h2zrt2hnihff5kis2lwtg2slpeit81z85g3hnpevzcb6ukvvozbhfopeyj8wohs5r9xi19e81dxvvsn3s6ebctrzzjhl0v984yojlh8jibzxda',
                filename: 'wif3beb7hk9b7e39hted95hxap4vv05pmgmwxqcwrv6auwz5dv7n7w5dunm6zebr8uagd0v9budfyfbi0zljdhltjm38138gkld9gkmbs0jx26eqbm26im4vvbeat8o08h6xgqiqkpn2jpyc7wv45ab94wvx8zooaylmxy8r5mcllmxt09h4kckylzamlkst2ksn2caj91iremy9tzbdq1c605lw5drbcfnw473ecc7g5jb1luapt2s8nb2h032',
                url: '6jcamks2mzko2lzggpldcfrj83jltvuo10jkyx67lqwzkn08esoqkethc39kuinjuc56wxlgl1noatczvo5ncw82uwxlcobt88w4ges5fkdyc61bvkgybcehlqraapcjtf32jqfa9hwa0mt2z0a0tc822jhew72ri3tdidmvrr0w9btuxzh8fzotvotc0dg0619hajg34kc7afsxxws0zs1548270c9dt6vb23a83nymoz7w3e8r12e3o4s2tgwd959uwh34efkzovkfcwlf269vsxnizwt4qeqov3clhg21wpuxdiifngs59l88i7oexwaw7wzwedtf4xhyr73i3khysmesbtlfs2tfrhym6lbm1kyxyu163ghwcz02mdkrfi9rsmv8g1u25pyyisg4w3qifejz36sgtn1njgezxsusrhzajloso6nelangwhk2wg4czmc29dx2pl21lpzfehjiyrd6e5iku78hzzslvt8yuh1ynrzjiuc38pwjhmemyhu5bowctbzqufwrtehztqpdsittfd7699mao1vwcgtfooxtg1eql252e0c2020pmh57rhinyi9f2y05f1zci974uryydnt8d8cg5o4c11yhwxznpo2mjbi2yukpnsx8w2bel6ykamkbsk6ybaxk4lo589xroa82gl7uprgvo5aa8ua8cnssmdfp12dsf6bictlqrmlb3c60s4u3gv9xr3tfoidb0tc0i7ueu5vf2q2q98u4f9gbywj5u1oznbb1bbgsabbreqok97dp5ujjh7bjvryhpwk3bx2otdmwq30tc0utzwdrdedrjz82s5wy4smfo9f30vs8t9fcs78rlb9tsds4zyw2pp0tla9fshmufil4r9h2e6fgi30n9tx2pffgm616zv50tzdathyut9m8loy1kfa5x7ejeed67l8xv0cx9rbx5guacmt9xpg98h0bvn8sbpq2i5v1eplgu8ucbon3sm1sy8jwgpzuixoutm34ippeg2dvwdsbikvx',
                mime: 'poe8t37xyt88ear632t2px8a6hc1t3hie0gtbyd8mpi3kyuef4',
                extension: '5o15lge3elt0u0aj0bzoh9kpnt0yij4bx0muwwxtw93ctmssx7',
                size: 7665687350,
                width: 8406338,
                height: 321421,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'kxcjjmuxllegdzi1dzvqdxwrvql38eqwefmibm195ieqi9hawrq251wgtyfist4s4ixy52naynr02hrhfkolzocktk522479ao3m4djewnasahlr8k0w2e7byxzr223g7jspfy5dyakj65hkvm88oqat5r3e6t3oxstvwyrjl8921i3tano0htwzhslqji3qluzls4b9ox4klpsbgyqkzoxxw1r6sgryh1fu2lm9udtqkeh1tmqhvx0gp3jo5sg',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'yodqvcb5mzxfytlywjzseknbj65k449oo864qxdm235ahznhz3bz3628lswpiwy4gurr928yvb7',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 922474,
                alt: 'g8klll9bmkggh6fzn4rw09y0l5tutbpomv2fohb3lbf35j8909pxmmij8pxfw448ip00xvxpwek20j7zg479961sm8jkh3oawvujt4j4y3zmqt0f7ohe8g8k3mw5qjdm1krrnzy27s2kubhb5wgx63dsobn2d8elexnjtvuux4lgli3vhw2k07f60fim8f3sfmg21huxxfuer0yf9ror7vbtxq03wuxmjfw0lq1m9sxo34tke5d9m68avqosxte',
                title: 'mmab72ukit1fl7daeecjvhtkl66kevhlsm0n043gss5lk4fe5im731kx0zi5idun1gc3zfgwyabjnwe6bq0nmidq6vmzlwwxa71x6dpfl9sx6h6ik841m6loxgzw18m9ottgt5fyjce0m2hqiksjze26e3zsfzgabcmjman0modshggxsw42xazogtl6urwysh4henmz7xjoawrcihw04917cxcmpb5dmoif5xp87khuc2in0i5h8p2uf4k1b5e',
                description: 'Aut eligendi nulla omnis fuga harum ipsa corporis. Alias eligendi et velit dolorem. Nobis nihil id earum similique libero voluptatem. Qui dolorum error.',
                excerpt: 'Provident est consectetur. Error repellendus laborum ad tempore. Reiciendis sequi commodi odit. Asperiores enim qui aperiam et quia in enim doloremque. Illum aut voluptatibus ducimus possimus et non. Cupiditate veritatis molestias eum incidunt veniam velit mollitia.',
                name: 'yokpnvsas3eyr9zf3vpzv0emqvsr79axhfpbf8asik8zlc17qqn3qysjlajmlftug1dnxl0npkkolpxoochqkvdsqetlmrmvfuw5rplx6yikpc0x483t5s6g567wd8ew1hih3yfmvhf01khslgrhqkqpyc691xhnvsvquodhvfqw3qvavdndgnldduf5z588mfc8ih07jphp61cxhjkyvtrs8a4gqvsc1ox7lz3xxrtj3ac1bzakpxh9u0nhwlq',
                pathname: 'wrexmovdzn79wqb2dzrnv859skjfewkdrvtuf6x4i5nq84dum4wzia80pr9sppkxqlw0h8ylb9vnd61cwcrvrp9xh04mrsq53614pbwz5cefrxls1j9gb1dkwc3mocvdlwfs15lq6jclk7gw55b9sfk3vzby6hl555idm3ccvrtf192vw89rp17evunhxeuftprne8ubt851wb96jvy6dgicps7kaxacmej9tnasophic9ggpvzdybx8udoojbc66j8wif3nqqo4c4fer967rvbon4zvcegw35h6i7kdmjq0k9apat54bck6hoid1mh8l79kobbqdnox6cyajsznt3qk0pkj6886kyj2m89vloauy6juqzh6kr4t4kzrf92znximwx4e735l18vz24btn7igi9153b8bp0c7s9feb3x91zeqimgkla10okzu80ewaxhjfow4kigux7nbg1oof6q16zgkwj5wdyfj89m59liw0xwyaaukbcprgsoco0egcjywogksx3pb9s35hj4jozyzcxkrgw5imhvorblr6vhzht1mkausoulhmyji3fg73nffnmebr9gzrpwko582893qj4no42zrzjmhtxt4gjso4xccid8k14ani33befifsejyyl86qo6o84p0h8vlml1vhtrms0y2j7fuiymr28ugkth8l1lngomcxh7lc2q734jx1hixkg3k3m32qm1rkm3it7939oc63gj5zpo18xwja8zriojcodvd8hcqdmw38c6v6ugwvm95bvcwgfyhdelo07kbm3nv8cb39t7o54afmyxoob6p3b0z9kfp08cfzpntfnlnf8xjwzq259clebyylnmyp092hn6yr2goxnprcrjkeju1l5grv4bvue4cc6u9tq5x93a3dy1rydur1xatpgsw18i9x2gqoi90mqrom2q6mqehiwnjcz7idbdmbxkw0yivpy2pm0uxbwdpnkinf0yuhwbknrv0k2eq0d23ujj1tplr04uiw801oinu',
                filename: 'ruxw30kweaplcsq3a0s1em5nzhomg05wjh6p4asefv7rmzs7rl85d78ls1jv9fwux40469ru5pyn8y7wzrq9fko8pg3crzkntf0csb7nphkw7apmw37i3hu3i42yobyw9osvh2zl81ei74yjo5nfz85e9bitw69yy1qg87yxdkayfm2zrg9oz54t6wvdgfwnve4fpe6k8j20kdds3lcl1fmm510j5rbnnf2yqf0jhftk98io3khn6eowwoco1l5',
                url: '5wi6thc2riva3xz4rlb98qgnhs46dnnto5hww8x83cc5cj46yrecqwunxhun13nm3bpxytdr2vsnvzk5ts6vjfd4h7aob7wkfugub95dg6r7zam661mlz59e654gb6lobeduqqcg1992nlmqfasumtyumx5hssabw2jzg5cbu1lq19xwtyipo608o2u2s0v44e43ijunjnx2l3q7rwmvrxgc5x244qpdhsmalc7ap9yxmim11p9jvcivc5ppk71ouyuogj7u9z4hgkya34ftc9vmzd59450oymdm9d8s7jg80gv1md3l32swmc7ctqrxyz1bqvhqgpkn9usnt3rd382iocuxphpz0whqkf4fu6i8s3rb6j8wurm78diszs6z7akgn06mew1gvhgml3jnbw0cgf28icl5lgznt6wfcyu8ur2fubu8pqs2be4eumv3p7wxooxue4c7j58kzgzxqbkmn2e26uq48s5lz904l5cayaz3r2qcbsmvhgsg8rzeky104oawq7lc30p17i5al65w7u6jg0o2jxvvlb3g2jzgkl5ffpzjmirztyau1mbfhbzwf22ehliwpxnlxzram1ualk2t4ew6qe6d2e5h2e1ymsmeza8yti8w3t202jf8yir8agft9zic7tlgji2uvpl5kby5wrh5dje0tgzl6m6eoeoheglg6owdk81cb5qbux7lsln48k8rrkbj1hq08gdaasejpxoy1qacm9ghlcc5xr2z8wnq1yz5vcfrcyuvy81yo0l4okqkmo1nhupwsrq63riv8o5cxc0asf7jtrw0cfwqy1zsqe7avirurvr13uxmxu1z85g3xme2vx7pvqnlnlzj7me0toow9cebmmn1k8iv7e9q0a8o6ocizd993fj4gor3c3qtzu0yckjq8o8rt73iz31c6mt0eljfw12eoadhe1l0uu0lf9j4sw7hpvlmezemxi03p65p9759hbp6dmgeqqd7uuv5mne4j9h9zf55j40q0dzj3r3cdsxp',
                mime: 'iodok22av5qhgnw9ccimfh81v3rlpe08ch9vcge8o5xt7xf6vf',
                extension: 't0lm7zodwnzyqhw7usogswjhswu8w1vq834gcxfjar2nyailgh',
                size: 7747781716,
                width: 277878,
                height: 6155540,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'uq6ls8kqs4ijgp09i0s0mrbhixiitinpkztzr2wak3agtm7n7flenils0azljsgku2qwbop7i9jkls0fgewr7up4twfe0fuu93id1onyp1ifm5eo7up5ua7gcuw82yum8dm63d0p1cx7u9do9he5mvtbt4aufnrw90ce0p3ebeanhvzqa1unjpqxskjgytdz5ve3r1n297nuyvpp0kcgaowcsalxkp9reng1uylfxqb0bwfwgzk74xodj5z6s8k',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'h9u9c70ebgr7tpifcar17wygtfahkk8ea7k86wxhds9vnx1ihk1j9r45lu78sn97x4ku5m97opx',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 560306,
                alt: 'wqkmkjc0u55rgu2pvha2y3vmv92323s0zrbkerffj8egjvq6tekxypqgmn4micubuwgwuto8jz83d0dtgcpt13i7sjk73v57txzqecivltdgt50vrkgu3cih2o8w3qwrpdic46oreuvppjo1r993v0yc19x55vgz6b4yxezb3awgrh4x6e22jgewyuuhfodzsnfvrohn157c4nxz6jx5x47q0rci4y5jpinod8kmmyghlsldoqyq90yqu4hchky',
                title: 'o98rnyrzssvvhdfxtlq6olqfpafsp0h92ctqrz88y61me7453k8i64gwvet8r1b5ca55rzm6waoirdcxptbznz8umo94i5jjh5w2skhwkjpwmorxx6x21vqak64ycwhk99jm7lcdy8b62blkla126mljc3s61cjktxg0p34ndv9v4fmzp9o92vkd03uoimdh0jqe9e4s0kaxfh2r2ipiig72f2970qdr1vxozu3wvuascffdsauwc4rb0k49667',
                description: 'Nesciunt explicabo aut. Est eius blanditiis facere ut atque aut molestiae quis. Voluptatem iusto recusandae laudantium fugit totam voluptatum quo. Omnis et earum sunt in amet.',
                excerpt: 'Ut nulla voluptatum natus. Et dolorem aut quo. In consequatur voluptatem laborum tempore sequi minus assumenda voluptatem. Ea quia corporis ut eaque dolorum rem.',
                name: 'b6fdxse5niyt8cyljdyx842dtg0qw35bsp2iwymftlivziv6i9ztdhwd5y58m362oar7rgx5a1w1msbf9hsd83hw71r2ypvkr0wjw7ykc1tnqo0s5g4nkslhjz9bqt4i8cbmulttdh3zj3p8cmeaaibwy68lq8bvwmqxznadk4tk5agps31fkacgmpejp4dh8dq23775kyxrx64k4g8btwjupq1g73azmndpk0nwz854i1p75wbiz0pk93lsjrh',
                pathname: 'ac4uw7cbsepb4fikno8cvsxll9l5riqp4dpxlnz1o1ab29ltuq3r5awcv6w3to7ytj78rp98t5cl916pf4ixaa5e7hcxrnv4mkbq5giporx2910exxfdpujbxe7pf8evysu107h6pjtf7511gpuq4quoy4a0k38qr9hoppc4cdhldludphcoe3pzbx55g5jdk6lnd3822i9a8pnhg16mj5u8mlsimpg9vrv1pjedqt2sdu9aaqapgbd8z3lmakm6h8vernonyuj4u05wwvm8v7xln8do0x330vcncvrkofbu1hkiiijylsr9yowtpc59of61yakn4pl5vq4kewgkejsmqnjbhx05onyn81hyyihcjo0ppc6fz6n3p5yx1ekk17oebocyv11h46dwyzxlif5ua5t42wu0w60gg3im16f7xdw82swpgww0z7255dl273pa40p3pkqodxcpn195it96usq0pixy2eyz04l0fhr8udz56bgwarn4exnrthmoz51g4q13k0bauzcmi6qq3c8sbso2qo2z4pc1nywsdyj8sr3njtl98wdrlv8uzmfny8nhsswqm3r53za73krkignskn6t2xriq5wwp7t6bl0gx1en14zigqwazyzyu940ycpbreyv5mk519vq4wofx05rlj9n6k7pbv1vdknj72br1p1ngite7b4qcpppojf9olpjay5f6mno64ry3bwvj64wrl8hm6psaqwz6li2vax5fk147batk8cplm3dhir5kzx8wtezfnfesr90nli0zlqcx55aopq89tq2c0hfn2dihwv9ubdz27x2dsyioa7ldcfc4zsuhd3j1u7ij9i9c73pimxi7zuron4nb2gxbxtdwqv8bjovqln8y4864czodby9f53gnd7602o6nz38nayssdygabiwssdsskzmvr0exihuzoik8rstsc1oqq3733s5t749im3ymw99j7xc1r007c8gs03ji6ccdzrtp9w6pck7om408umm41o6xwkp',
                filename: '5hv8x9fr1ebd4dy0gxm7pjqxsyy6xuoyuk7p2ap9rrzd4qp9m688pdowpph421ky7zmdjsvcbtwo2c6g80xgtyoqihy0e6rw7nzncovf8yvztaty7g91e83m1ml1h3l906grxvlue3a9fuhiur83ulgpp9sg9r9vhrlswmn4o8ezaxc8gsj0vs3isprxty0h1mqmi83rzgqmxrda3p5k1bmyb4my2qhmqvpib46vxn87qviq863340fgvmrlcys',
                url: 'x9c9isd7a2tozzomm4aug5ev0fran6az0llqnc9xhmm4oy9ub369v7019j0ykb49s4kyxx1x6pu0ufz7s61eoezwxb844dce8rclqsfm8pjlrtzhdycf7ejh9bsj9hcixz3521isu2444izuhcdkn4v6tk0iv4ctwh27zzydlddn0fi6h1r0fd16wsrho6us3g2ksa2pry9jb9wpu3gu0j00d26d5wnv7znz2prqmj4pqt5uu5ddcebd2zh71m4mpdhhv7apahp1t8vni7niekjcdchq7ybmku7w79ezh279go6m33wr609ffm3xs9mqgqnzr70pn788mwedpaizqvzfaui52haojqa3r74su83emq3m8nxfvvjaicwe5uokmuavnozz21bnl25x8uyre206320wxkuezdn0ipbi6lvv2pk6f42yjnzml3umpuur60djt0xnbenygi8w3tg7ulbnhrjvsvkhf6ppjts2b4neemiiwcnlfeewy3pbam0nh00rk0g3shofe810p1hm555wbxp7v508ov6gyi04c8u9bok1qc9qg1n758dk1t7b9d7r6yavduc5xh3bcurthlanlk91he8yc0aiswnekins8e26dmo1fyropgcoi3omqbw4to9wa8ddjetf7lwl7803h2pxwd0s9e00x9my2g09xae08df8yzcnjgf7kwm6ev8atw8r2rrmss0rjm2twa95hv0nem5xfmln6tj8nwrlhfai0yikyzcrb3iq2hso8vyar90b7guuxk4958yy4qp0k6cc4jsb6ht6s1twhlay70jyq017jfetrw98e4yespm4uji85nz0girabitgpgu9avqu5biwsr06iiw3gycw05rllznxwezz5ocakahgzwdue8u0bkcudu3wemwx1lzakj0fr4zsnulijgwf03pntsbdmtw3nogjijtq9ltxkdd1zy8khge5fkmago1s0h6rxj9er3nv0crjkbl1rsnzwmoo9h3chvy4p4hn7ft3',
                mime: 'wo5k9dd65jqq1z44h3splx4bcm9rf8nh1ukoiw2wqzmf4q4afp',
                extension: 'wtev9xi4w4ps6ko4ewulm55vgw5jhul02uuhxjlehx5qjqxgmr',
                size: 8898934897,
                width: 714402,
                height: 123715,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'k6mrvuq5jumob3upvn5jmctwog2o8fpgd0fef1cabrzkv20iypdqj04uer71dooizh6t9v67a6zx5w40lagfkdk3fnvsbm415w5s0bhcuzbe7m7340wu9elqnuf6ijgnmlwbj56yu3j9ol2598vj6utngezun4gaid190d6uq65k4pehhw2da2rbun92h4g5m1t0fczeoh2y857iagismjdfx1fxhb31uw4xntgkr6dcy4dlbj55bg7gicdd4axp',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: '3z3210rvutfrxrg5qgpaj2ch6sfit6vbnda0py2xmc3xs1mf8rv1uwmrj9pf6g1q7v00g2xyb33',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 717388,
                alt: 'aw4zjp17c8gatevyqz4fa9qpdp82lyplionvwgkh8ko36weafkszwvvljrmrkre9ut2qj3q04ljs3bov9arteqs3t4f6nr809pjzy8fzppam6a6xpuw10h2413dt8mncwdfos5zir3btrrjqyn4ilkkpa5zasbevgfzr6j53xt94flyv9hc3dhicwsyxa68jt0flfa39npt9ew91uzm32x8s026qkoo47scvdz3x7f8tcuridi999swfj3xoxxk',
                title: 'mc9evr3r4mappfautkzoex0occi5oewqoj038muiz1jdxzeki45vbkerdblc1bt5rzzycf9idhwfp9byyivtnjnltj5uu7c6d5fg5fhqlg3melna9l9g4hhmh0agg8nimqjcptohx14uvxsl1sxv130xs8ofv62vywzik340d41plfnfw77ihi9ee3c6d8zbzekcg9ei21ecdkt85gr0l2wap7wp7vuo1xedytbaik6vxlh36vuaa5ypepmf440',
                description: 'Sed nobis labore. Quidem nostrum corrupti voluptatem quia in soluta non tenetur sed. Sequi ipsam aut.',
                excerpt: 'Qui voluptate enim. Sit voluptas et architecto accusantium quos voluptas est fuga culpa. Non quis voluptate ut voluptas. Corrupti perspiciatis eligendi totam amet blanditiis non quas ipsam doloribus. Deleniti sit aspernatur vitae.',
                name: 'q6gdo2almz41bjnua11hhsrw0fhw7gjtb7s4gbepzfbya4oy23vdy5aq6rwbjezzd9u3tut5mhiiqf30los2mr0vv8mf3jyu5fh4not12ylphh5b7bn63znycdl035iqjt0zz64sbbis23uzc5pezabjm6gadrj8jozxcrn6ilcirzxqnewifsfjbmi2zu1jzkyl14nqwtzx4xynqdofohf0dotnp05fsvr03xgr25dy80462sss16sc1gpscum',
                pathname: '7iyaymnb0jt7oi2q6v61d7v24y0dam9s192b4nl41c0r3j6ymlgt8qpjt0yrvu41msce62ieif0rvg457my4crgnd12c0wgslvhu68s9dz50amyfdm3fihqr1euvfvfqnn4w7fgiuyozq9hibk97xl7f23wgrc0hodqhnqr3ufblvvtb523y36513b67c5yfy8q78ttl441vhujpa31mienk7jpct1wxfab4a9xurb3bph6astf8wi1hm0kmndfrwng27bqy2t63q4179i30s6j4htrp8q5lzpeyzy3dvl7r75t3l10dz9iwkap1jbvuat9on0repm3gr2e4305q8oppjz3ts3y31a89yzm0o1v48xh4l69j071jntgkdqy68yg9gh113wmrrf411tgt90ol694nd4xr3rvsniykeilk51bk1hxaxoq2q4cvmjyjcrm4u8trx1jijn8s3d7oox5l79okd39fe1rv8fcn6hjqkl9pwrbu9pztuvuwpdvfn7gybqqg4292971szpskmjdvc2memswp7nekq0nzwzk08hcjbfr2mxwvn5troxyocud0oxryk316m0klzkiwlnudaef34w2agr5o6egeiecf3wohxjhgjp9zkvh8o2dlerbwa7x6nokau3y1vvblu8xhdpvuruiuo5vus8o4f1ivzn79f7q5koouw59snfu003pes3mmwgyytkyb9npt04pf533l4vw8t6yyr35sdwsvxz0431b9qpqcmuztdvolu8cgvfimhrq35vpj590rcl9mnhqto4n5yrw54u0x8ocjyij9h8k02au4wcsd0kp3ttusw1mvp16k690wfsc6bp1gabxa2qzotkgowmz60upykj71ilszvzq1b1efnwe0f689da8cq2q240e5h4ixzxo5fryvmgdwk7q7q1qhyisghxa1ydw1imdsc18jiqp1h8vexfj4nknxls32r7xcjloqy0rfiazwugtzidhv2j16omtlv3rryl1ix5yn71o3',
                filename: 'd7b1cnwn7ow3qxkl4v24c580qhlg0gan95kzvdqt0b827mf3o1zhl7l1v70dl5py809kqy5agr7qctdm2vawjus5fwdk59120oz71yi86xq7r23e5cywhpig5ft1n58menam9xyl5icziosmi57om3ts1ndiqxr6xqouawvsgaxotxgh2fiab8a9ynqdj8ioxl8rkzbr9tu9emrtgv2xkcxdv4raqsvie4orx2hkbebdrvqz2psh83qepydcvnb',
                url: 'fyhsw1szt4eudqtaezqhookperj31y60rgkt1w42kf3u9ni9qbvh5cn9eebmkfumfajh6vtdm2v7er0pzjy4up05csltmu3lky9d1yhd9ny0zec7msuah5fu4k2fbk9c4x1wy81dr3or6v385o8lbs55o2p85guu4s1dxvcb7n94wwsg06rue6uii8r8oybs2o3vuxpc9ocb3t52tjf9udgy6vfg9mdvl8wkypfaa6j6xr2gs6bhqbastt8s8qk9doqb2vjbdh9itymh5zeio2n3h58iresru33csy1gih3ojfuqfwiavu4a8zuf1ekb2nnff7ouen3ds5rj3e0kx8m0chovyxvk4sp5va5vehwvl4ofp9dasej0mjq5fdtcq289qw8btvvsi1x3u77wwu0dhfwvlra0qk2b0iigvu3p9ewgqgnau51stk703l9z0ycosbp7o681j1bumkcl6ymifmbdm3g9thzia0k6647gt2rehbu82msxzhap14yap441vnailhzxelzopjy23emq97pgnapi6c6jirkrynbtomefwn6d442r4eh8t55pe2y7sc231ksuq4g0c84fhk5r1kchlknt2ujy5e8623f08upk0m27y8bj37t31wtk52cv1oeo66ni6fxpjicdn1lzy8kkst7tgwbx3xj5v980janhw9zcrh5rpq69hwygjjo1zjs26kb2hb8r7bnuq7bbn071b0vri8l6uck3t3fbrpjvv3go3blliroxncylimyrfdtvtyvmdywvrjcjhcekcq1a2ax1y75naojuj4sx72uhninnr0t2uji943bteuta3c1s4g2imbcas7yuhl15ukk3rvbitrvp23ubz3oyoaoh4bxkl8hrq39og5pciqada399mbowyfbso2fkv51rjyk1ye3j3wocow39utgvtyxb6fjpe1q3xa4kpl3krz26p4ayit8qi03aduosefo646pnl99nma1xbqyq0phrbx8ct8lcx7jlw1tzmhsc',
                mime: '3ne434777kj8a2s1liw9ghn4wqnutt321eriqra1yodesd6lu4',
                extension: '43tzce2ivbk04bugdw34pdf17o0r8hqpl9d9phl0y7aajisr5f',
                size: -9,
                width: 355385,
                height: 359807,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'gdobb185oiyqti9sew13aj1o7bcehq28ol0fe51e7ptzciw0sj6ceu1zo58por82oesy750q206mnoiebtnwsl89lbricimfmsi0z72zhsw193dc2p7rqkkipiw1jo60n1oakiqqlyy3yz8b8w43k2f48mdmia1loiqxeay7vdz83eqp1l8rhetj9fazccjl8jlr1po2zeilh44f865i5zwpk1ljqlmnnik1h2r7e1h9k0ewbw8kqbf79n1r3hd',
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
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 'pqxinf6qeeycz4ekyf3o35cuu6cl2yc4e9rh1qihq38e7rskg6rrj1c6rlsv39g4r8kfn7ffh2g',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 790830,
                alt: '795z4akw3rcgw9x56trif9vdq0bv11k7pakatzaq9dc4zwh0qchnlpjh4ojq3i3fnbdw9sm1sb1wug9xc26ukbq8ijumnmp61rw65ss44kxgc7m0crjy2398mebdt9c2107kow7b726nbuftwzobe213qxx7rgkm87lru1uvhobwui2ult2lsz47hbsrn9zb55fqha30xdsgg7x7p3u7icygaljeljyng0qk53qhczczr3moddd913ts6myczsu',
                title: 'pm674kkj6k5ok5ju9aeykk2lkfgu8qmntw1comjuvaskhr7c57my5xony3ltr8d5lvdjqucictenka6bz09pjow8h794d10r4jj173l6jgg6pqzd8ndzovokn2spvaagqt5yfepk6bo6zitluvora3ycn62euadkbp4hvcbxegf7vphdlkeygkfowq73ljlr60uccq5p104j2ygtr6xpymunsaok8nnqpn66m8kzo28y2ph0srrnuwpwj787lk1',
                description: 'Laudantium omnis tempora aperiam omnis quo. Numquam nihil deleniti rerum aut fugiat exercitationem dolorem odit quaerat. Sapiente optio eos totam quibusdam deleniti dolorem doloremque nostrum debitis. Maxime impedit nihil porro illum a consequuntur. Et ipsam eligendi nemo ea pariatur. Similique ea deleniti porro eius.',
                excerpt: 'Consequuntur consequuntur et aut cum et et sequi. Laudantium deserunt a eum esse. Necessitatibus ab tenetur qui quia nemo. Ut soluta sint illum modi voluptate sequi sit quo laboriosam. Autem cum ratione ad ipsum.',
                name: 'fce35nw8i2ha0ofad45dinzwm9e9ovgiz0haeidd866rw4lpyra6pjvt3x8yqmtmtxm3nawwmm78baoq8frujsfmxjgqkf9oemf9v7k9ixnlvmxz10icsq11h95z9qqzwg35bomsqr2946qigg6edgqp42vstk2tsmixnvpypv2qvc8cwai4hg4bgbtbz7ia5ot5v5c9zc1lnk0t1396vqvss5et2lxczwypst68p0iq94j0k3n0q799iqcgazu',
                pathname: 'pioxnjktqa7ucvphte69mh15gea31jykv94lcr8isum21wuitqqh99115smmphfp3mtr3fvcbl2yu3h0ma0oujs828r4zukw2a4tmlxaaaan9oat2elp5u01ybqamlqzjwgww1jr9v7nedyv3hq6cvmj4diq3yatcue5ily7600nyirkgljkjvy9dew0onn3jeb51hs31ifgtekaby548r3u4ejh70l9nah3r9unjvs1ud66u11lk8nldhm4r7qza81go4wadqfum2l8l376hg3jeiaeiwkkth0zxfc8xwqq67rh5rjpkcs2xjkysl5maxtcanpq2eu9u8k23al3w5dljp21fqkyo3dsyqulpod4vryhqw02qu98mk36dr6mwmprkncnrhowwj2l9ja2nxlvf1etn0uaz8wvvizg5921wb83etvuu83khag3e9x6h0p6fyqo92siq34wowme6qz66r70n2uxd25gzs0kspvupju41eita6ch1pg5brjtrc393jdi26wjhsbb5vcu7v4kxc7uw3v18tceaodxubpu04dxm21f58t0e1zjq8a7r0q14ppia6igtxd0a10x5d378cp822pf6c96h9r9cqsmbq72s5je9yzao4gkgdu3j94czo6ur59xmvttit21l1uhn6p0n3nnjyic9limkafm8dc27uweybmqsh66ef2dovtooj1h5thqyew99xg4vcoguu1kb0gfxdw4yzs6s9dm7clzhd3vzspyv00ps81gduhvdefufdtvu8cfuhecc9rc7gbuygob6z5z8kxoeowhuy2fjk8icg7hrcpf44hddxj8s866ge1yqt9w0y1tg9jp6wp74wlcu2qfrdcbcqpe2kikuqgp47sxz28d7qilcqh3w5w0835e6kj1uxm1d8757060ha5eutv23p2hotygxxp8lnt4uq4mvuwy5yqtr5xak9evcbkw7gvujcw73fqydl2hfnplz124h1mz0qehaxlrplt9zoa7vcjqilvg',
                filename: 'dwxnokh46kkhh706zqrbg97hvamuqqx03l6z87d2x6z1rhd5oygpz9vj1b0n9h9lkv3y0qsim53so6d9m9660j20jk1aawvtl2sfnlk744dasc1joii5laijoyztf6iue5446hjjfh5s0gn0mi921piicqhhocrpwciadz6f92iktn9b1p7nenu6i7qr8zmf986wblxlo92ypwj8lsubo9v4mvcqx3d2od1yu2ybxbdsqft7l3p3rm40hvmwam4',
                url: 'se98exif7udt96tpfhwk4gswnuyglnigojzmaulm47z1nbv2n51byb54ew329jtbdrmyjz7o4ou8sdnsu0ko7p18j3ytid21d8lvh5cx9005lqr9b6kfek6gxzwotebz9vlp18kqz5gama7eoz04fuh47yxfnzbmao67728fjz931e8rhure7aes5f5vl3hr305zat6tkvde0u30wcia7rf10zubjvf20lqyv1mxa0inn0ofo2n6vv4pkfcpa0561rka7pnxdj9lt9tftwsvucjjih42xdy3uvbm7alsaspcrjdh5b18wjezwgcuum4ioc1tin9vaxvx8icb333uowfui25ujbdlarsxade6x4kn8g5pgzx2k8uzhgyuqvxo7be4vww7ofqqt0xriasudvjr0nseiebcjuaf6vn1n702o7g54esswx9fnxopugdu9bsn4gguhvitbqh0euosvoisppfy3jf8f5be51behjy0kla7vcfu2gr6l5uaong1hn9b9ipoc6h1lup6l5eozx006fk2ci8hr6d2dfl88liapv000yt67g9cche840epxck4pq3vd2cgv2ozwtiahusznjk618cbzl1zogqvv1h3iq41amhyixn9jnf1w41uwn8q8divvbdvw9c9vb7868zemkb7jikvj5xikybkb728g7cwdvj9rvc7tjnfejd8rh3v3pt3v0lolx6vjs1bc1uh7odz8hp1qxa9v6rf5l1cyotb4aiuhqjs4m9q9o9s0w66aue0gzt34coprot36bkjcv6qzrmgkif2lkj2zom8df2yno9di2gskpw5me5c5ji4b9alesf30qz1emxmjwhb263lpvgl7mvvow9u8f46clhds5m4daj7krc4ow99v03yil1vthcjz6p9761lqtnr0km1godvpywn6wfw7g9kz1bce5d38zkf4y9i3gw8zu0pt82tlkkcfh287jazfmvpjktqln6cazdrt0zj07o0bb8qzm3gccx9l95edsgu',
                mime: 'jhc80zgqhbapdilijpg11xk9fmxmm8eu9orqufgucbkdk8cehz',
                extension: 'nr8ay0r6oiqbephlehdewtt8cht86tid1l2xopmmziy50v28xd',
                size: 3321888362,
                width: 595934,
                height: 416250,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: 'pvgmu0x47o3foj01p1dvunqqmcex73pjfhe1aoov7dqylcqg4t4wpr1r3ba38l3ar946d7u3xkooewf32vcopw83yf8ibcua0k44idh537zpu59pncis5ydrde7nl92u9tlw27bwnd30kgvgkr1vnpc0eq1u9f5224kusmzmwobbyapgx3hvqky2kstvxokzy7nyorgnau01yqklkgt4vqb3vvy5bjlq94jew0v346g018d0hu47i7rj2ed6esy',
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
                        id: '4b768c3c-f317-49b2-8bfe-dd5956205423'
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
                        id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00'));
    });

    test(`/REST:GET admin/attachment/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/ea020016-e275-4767-b20d-7a11e58964ef')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/attachment/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/91cb7be5-55cd-4b4d-85d3-71e2f33fdd00')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00'));
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
                
                id: '0b259e54-05d7-4533-a76a-8c129dfd848e',
                commonId: 'bdaeb625-96da-4f76-993c-916a98214f76',
                langId: 'febd3d48-10f2-4edd-a8c1-bd76cf67ecdd',
                attachableModel: '0zeillvywky1t9da2symd2gppaipi06dzxeb7uq3e2hrqap4jzh96ic5vzz882tnzjcv4dfmqpk',
                attachableId: 'c414e0c8-4243-4517-9f87-4ebda3436dd4',
                familyId: 'e743ec78-6d32-40d8-91bc-bc5c976b07cb',
                sort: 520006,
                alt: 'eh06k0xrxxcglxgnoems2ak4lb1qalyhhrilg32vs16kuggy4fkfomvc7rpgs3wqocx2icte36602n8m30lpwulpgugxb2ka8ox4y0uw6all16bmkzpyhf6nfjdy36iijdwc1o5mrhg8o616qx5817l41a77oe5siu5kwqcxjv23rvkapf6889ki6bgwo9ofynpdtl7ipdcfq0gi5adyg0cse1noxszidyi7uarsvv7bxzts5hv4nmq9mwmgcjq',
                title: 'qa1mmtt6q497j0ajzv50swa8ofoo2ocio5ochha09fb80y16uaitkjagj2bdf9agro87jq05h8ynft31moxuwe8citfhg7i3lvwfgcqtu2f9i253j8iv6vnnm0hrw4iuww1889mwk3opx2vmp3ex9157b8hnf163sudywb9rx2dsg5i2wzz037vxchug4ci460taaoqvn5btzja3ffwy5o9gxqz6ti3enmzejla22opbuxjk7u90fdbh7l7jad0',
                description: 'Porro unde id quod quibusdam nulla tempore. Sit dignissimos dolor esse qui voluptate rem esse. Officiis earum quo facilis aliquam eos debitis. Eaque consequatur neque. Harum dolore numquam consequatur debitis autem ut ex porro fuga. Eligendi molestiae deserunt sed dolores esse.',
                excerpt: 'Et neque omnis. Eos sunt provident molestiae neque. Pariatur expedita aut porro reiciendis. Atque libero in iure et dolore eveniet veniam.',
                name: 'tocs9ho7xu4r0clkm4qxezlewx8ilomgzczv40jaksdao3baznb65h9cogg8pt5988yha64w5t77wucwco8z3knz83twi2mcn7d9qg6zuybuuzwb1ti1ofwmgjxti8urv7t8twk6yqxh1gsbyicviqcorh28wkq5uzramy2bt5a0qkv8qak1ca67cpxvxdbrgxb03zbsldvb90vuj8cepqbpgyp9r8jlzhi5gxji0pp2d82dtfsqv46pejm3z4j',
                pathname: 'c9yp9fu3ekr0m8l3mvzuu42mhu4hsn17shf537coro05a3vse3oi8yzcxmr57zm0r4ucn6wx54y7pyd65m0xf0tqaefysaxwqwhcpv1x1fk51svywqtudx07h5ppzfn8nt2s7r8c07zcqb263obyh3n21hkrrh8gtstcvl9y87vx19l3qst3pa51papubb3tid57oerfpao5jgk6ulz97weayue2mayittkfsh7jrumch38e8i05kb2qg9ucal9tht92i9shnwdqy4ko3fp777vf3hwidf6l2tko9iwn8habwp3dmmt4k6zoiq9iljthq3vxb9ml9mh6rjt5e39vr9356637jo65v6pvij3z2mayo21wwadyd20wn6luqce6tehgpgsxtt7pejpmk07w6dqs9xi6xm37apew4x5raali6a1vr5yy8tdukanauvg14rj2mlx6zm0aeodvyh5568aqged3dupf9ja795v95i1bbbmnx5y4ps60j7855z70kf4u8s6xykdp2l49xfm9s2lsmld7brft0l587z1tfkvmslj85n71yyhhcg1ys2z7stkdkzvpwop54gc7rw0zoe1isqdmf54cpnmtnd4kh7vgtyjrioamogu1y5nddexbhsj4s18sfmuqb3cn81zqsmrxc22qmz2fd6yb6g4r82owr2hcco0xzy1okj443584sryt7d774c2xui6n1gca87gt2h16qyhsiwnr6j6754lu4t1dmfesagrbq8wdv0hzlo9lkaps4ndtbppwgo6eqtslzx9ry789k58rt8qmfbj95ac0zoq94rcqcju991qouixoygitzt84ywb60ffv4l2owp6mrnhrml19y3vuyh0q9h8a7zn60bh9emu2b9wa5i4dst53wevinilx60ao153unqx8v69093dhenzjyy69zbrhorzs2ibqat1qzvw372ht1yj8rs2vshv22gaf47gp12dsbtup0scthyae1twy6yk0k8f832ib22inrnhu',
                filename: 'iyflyfc7qaovrs70wx8p79keh54w44ghowmjq8lh9l0zut8484oamnicxxkcehi1mkzlqb3lhsa63lt5r8paip0e8f9tjmaelwmdrlqwacdxqgncwz6kynrxl0rhqj037az5mvu96mjh98y2m7wlybpd0x4syp691pao192z0v424c8qry3f50ftp8qj3dld6er3260nzm0vdslvyvm2l02068y4ehguttrnnxvt07y9ab1axqm0xdio21eqdm4',
                url: '02fhanptw0zeczhunabb6cvx4sultjn8xxusyf8hurlmrk8advuqyxqp608txsvfyxs48gyymbcg5mqwd5oc9upbm5g39ov0w6sxdjytbl91bl7tm03pzwdp0unf1oi8na6pc92oarjjnyjx8nvyqyc6sboeoyxfm7w3y07rc7a9c8f0yzlqs7et3n05am5xm77q3e4ln92m9fc8my6lkfyt6q7y2yp8pklnjuue9tpaxneiq47h1ckr57ynodouyl5fptl9lb69m4zks91ge2c4bqx6nzph68vhgx4tzkdd003rnziyf8o5i5zr5fvi4xdcmpg4d4iobqc82rdbvclb0km1b1w7g3nusu0wewxnc19kys9zy884fyn2fvtmbsnsb361tn0u8dmun25c5fukxahi0ka2ozqcd9l0smlrb5wb8bcpt38djhowa5ny2yzggtfrfjdjq5mzotbe27iiwvwm4dbsoj6a6n0q14jk2meunl2tosn7t3e73axkwdabua57l4yvztqgttkwgrkcvvbniqorl8nj36a8xy8pltvs96flyzz0nn555poemc749tvhee0n1201e26asq4014yynf30uen93op39x4a48zh9jf7hugftlqr5noe506w0mch6it8ae12p4ej8e7l0529sgfn2238ydqtgff68sheezbkyio5xuzwnprvrv7rm69iaelikbtc0jsb8a3ik5hmwfwu3luwjszqodkoaw7dej271z0gg0xslr3w3no5hvghbjjz03f4a8g979mgv8hbeqsjqfa748i52xk7hbgiehzro66pammg5yekdxmm2o32irg6giahx1pqly4gioo6pd5tvmm6ys7apmxm5vqu658as2cfn6fx6gt47urlxtlcjgqg2nqyedcdbc39lzcfuxay8gwvtj57fbvcfsjy2xwitrhcs28kppd3bfi10tfq115p7yx93ry6xfj5di48krngy676sht6wminemzz96mgmgetf6lnmxz0',
                mime: 'izm7ix3u7hmqbq7n65kgn8gedyj9cwjeu2qiu2u5pngfazpg95',
                extension: 'wtyz8o3bkewfleqqmgi1r77ocmtj3lu35x5wd63pg4x8t6ng1m',
                size: 3035867550,
                width: 208009,
                height: 808118,
                libraryId: 'ab81da4a-c888-44c1-889c-eace31ca3b07',
                libraryFilename: 'eng9irfejppnt1xqxuh91i21uf9xu01n9bum05dc69s36me7g68gidyaxrwpekvq8r85f5ibqt9pels4hpoxnhfsrsksuf5s6ujm73zu756m2vrrgoyraapso9qz2xbyz6pzcuz4uis1h1wwcggf5gn6zxbmqxoodn6fy50wqlhfig8pgevrvkxcfx0eaq3l4dcnscoirfhh8g6ddnpkt64k0qfch3z1ld91adhnpwv0x83j4twwjbch2b9zjp6',
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
                
                id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                attachableModel: 't805b57t9aqktkk3un8mvy6c6gg103pmdwvr9im3py5t6rtyt61pccrdorpo728ubkastryfnrl',
                attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                sort: 776910,
                alt: 'qdeiemsug8t9wonabhdtemffb9izy0ie3km31dvqvs4wlp4insqm96ke1fkm9v9nef5jnqgjmf7tjk0s0o002lovppy4d7d6p4uxuwnx74uju1k0u5h4xn5yec8rz3n8jcx903ymwcoxf62705staz2k9krv6ncdmdiz5fw3ylq7owc7z46uso0p815yly6qdh9gj623q43wk19ho0dkfmdyrljy4d7agltfh1d9q8tjo9cg1kflbqq665gamup',
                title: 'dk1755av5bpe98s9god7xpvnbhfoallecmngtq1t9dvcgxed8mqbenet2zbir2uepftp7rdkogv5xfgno79qcntc9v7apk61h1cmo80uo68yxbc5p359ln7c56v0deyu01d9qrqeax9x9v4z0i78gqqnnwnqfosxcgfmtxanil4s8lf61j0u2423g18hdv5u462s7o9xivmpdelhwswx8s80ta5ozichdysmo7ezvgs2kyitfzqkua8jo131fng',
                description: 'Maxime officiis asperiores optio laborum voluptates. Voluptatem nihil ad placeat nemo est nulla. Provident sed eius aperiam consequuntur qui.',
                excerpt: 'Labore minus rem laborum sequi veritatis ea accusamus quasi. Error dolor perferendis. Reprehenderit harum iste neque quos qui ipsa voluptas.',
                name: 'mq0yfxh19jp94dk6ssvy1024tlqqqhiwwl07mfw5jkjvw09rxjalgjjr1clgzyyspe7xl8kb94h2wbq284fx4dbnrzyf3j9a3o3ksbjpzlouk70ij4269hjvysf6p70bh3gwqbriszk4t8qru1bl7960wcqha2c87s0rqojzv11bokr0iyuav6sss4rkwj5lc2ilx3fd0a6xqd9oqk8kliayybp2ymtqfleybq6iylecmzbwhd8luzx85lgghld',
                pathname: '7wz2r1zaopqxqnn7fstxf0ohjuoevm5nbdjkkxrkkhszm9qcq8oko7fjbtbda5275f2lz3h3595stcyrgn027z5n0c33o7xqk0gjtn3ce06ya3vmichq5vdsn9tpi5guvwz07om5bi75amd0cu773moy145miknez3tsqejl4k5ajjpgt1qyjwoxw2zjgzu2r2wftbgmu4pddsnkzylj3ihubpjesdhevrzo0ngfple8e1dwvbe107eo5u1ty2r34ajw93aiu7qbe8ammkia3lh8oa7gig1zt05vb2e5wyyo36ofsaqgpwlpuw7fgpso8o1o0nn7v5wxpsfwvvxzzw5a15zp6x0zlhxjn2vl1g2j1meswzrfn59kfkeojo69hwnvygef457rctrohal8ox6gobowtvp8uyofuo6k75eyu1kxhurrq1brhzldmhvteb3met3uhyd00rixbjly5jxzhnz9qcbiu557ehyvrmfmg0fn0ggiiglmjwscb2v0n7m3o0tftuxhm0n5g6pr70lz75ozcs4pyvle1s62k7fg4xt60d3s4hwjtq2vmlub68ilnba1v6cxdmg1j9tj0k70zq4ngnzjesjxghujes6rpy77i5wqfg1dvbuo7y03f3m9la1z2yq197tof1sgn9yqckfhbpzbcg8aggryvn1olcj5b4wcfo0r6rasu0ed5u4y4afs29i2z1wbkbc570a0h6leqvz5lryqxi3mu96y2zbw6x6wzlnotqnx47rit95mp81j4aojtgt1z13s0j5ihr6jvdivyyc4dls4jt968a77mahp73oedxgp367xgdnuyzd7obu5lpldjluhffrwmfjuxhcifnin2g8dzge5bwgv0bhrfj3rww3q43gx1xgn3anc83y70ylgeaaku56gqprs4nui0wrvi26nje9leo6lsxytsw1zszobppm9gpm6xxptxrjimzp2gfifwved99yzsje55rkkr441px7uoapfeo8ikewq07r36zp1',
                filename: 'p4qy5wzi1mhuyth7lx1qvqqyp1vm2gc4n3ot5zedfwd0mdk6g51o1zi49lsvducg9jqhr4a43ov5ofb7drig5pc4baat3xmfirki6l3wh9u3p376pwh6b4cb6ygexld3u9dgzrvczxefdzm13mrme3z8ec95gheev4si1w2s27q9j99cvapigyg65kwwl7ngs9ivv3m0crp5uteplvwwlyy8k0m2arcacyrcdxbsfrfwyfuwaap5su0qc4gh2ud',
                url: 'n2xzz8tlv1ucbdbebe2mtyt6xiek5gtcskit9d980kbxasx9lklkafspcozrr8jvem3ek93z9cpjvzu899j5oe872q0gp3rza05n2m66scb4y9rrlvgwo4w7ibik15gbgqplmlf19d995dwgya9a0fbyen9yletxpnv6r7omv94mxr5yhxg759ewx0w94wd7tlhrw67ew602z7ralgfjgya9ue6b6cz6p1yoc6e4crp2a85xcp0jlgp1melroh66254w9d4ylsprq3upbxduagq7f94w1rcp52rtftwc9l10piid9zvey490kt3wwh5rnyx8rzprndboy1j6pu1ua3mze1h04x3mu464tghhta6c5hzzmmxa6ld2y4vva03esr7djlwq13izyv2nfr3ejwoqxkyigclch0pkltdxraoi0ffberbjil7qjpceo1wdupea9o2y4vwtlmkvv9hf6tj7frswkc259uwuzei5z2xo2pvyaxxj00drifpo219gmqdn6lp0ls0hgj6mez6ohtaydyytsj541qmctvghpiglzg4fyl6gtff41n5gw4s3q11qyrfgi1oza2ha7dal7yyt5yzfh8o4dnf0lq5g0qem360nf25xb6k5g7vuwu9vv516xvj1jsh0ixupxs9ca5rmlhrgp8xbior6g7yy5gq46brbfdaib0xkzjc4ax21j008evqsmlki2n4pmyunrbgpqiheotg8ymwxq5h30v052w4ryqhzmo8nxpt7q8z2o0w4avbc2zb2rfkz7igd64dbhu0le3908wu92wvco6m0swcj7thz0v6f2g29dezu1bv9vqn7o6m5o7owpnmdt6gomnnjtmjmstsc8amgjef2zmr3w67wb8wtiv7wivtt0q2bt0t7ad9d9gsjwfxb6djcg73f2n9t8948ols4ijlrmfgj0scs8gdgl3ktlvc81079jct7ftwzsboo09r8gtu5x7ocywwjj9hya4u06qx3sfzhdusb19z8bif1s77o',
                mime: 'znf697c6gs5zf4b7dvm5murvwma2v9lv8y6ccvw3tgtfrvkob6',
                extension: 'kwqcw0wyhp04rbgkt4zrf6dm164exrabug2l3t57ssqlv2npeh',
                size: 9972869953,
                width: 627245,
                height: 171495,
                libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                libraryFilename: '0wk450fooxvl3fwqagd3ffuwuaepmo8glx8rs68xwsvivudnfmw17h3n1qzctpbqkvsw5or7l1y3rfpqwih7ypdes6sgrrjtfv33ysei1ma40fsybalp30655aid8bs392lo4d475pfy5y61qiichhsoxhkb1zch0dfzw0y783jr2x1skt31bie7esfozhfgqdvobbnek0orin3zvgezighyjrxxs3jqd2zw5ellbvryicm5qi5y82owr3ghvkx',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00'));
    });

    test(`/REST:DELETE admin/attachment/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/7fbde41a-2844-474c-945f-f1f09a6f6471')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/91cb7be5-55cd-4b4d-85d3-71e2f33fdd00')
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
                            name
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
                            name
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
                        id: '610d9e65-5ade-44f9-a9f6-138ddc6fb250',
                        commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                        langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                        attachableModel: '43x3t7kial1rionb3h2kpuo0rr8di1k47kivrvjs6p0nquevg632eyk5htr3opsnvi1by0k0l4r',
                        attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                        familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                        sort: 401578,
                        alt: '1mz4s582acdommilpj0pzyp33nzbg7w61hgmjd62ildlemm1w2nijreuketweewyjae1978soylzeqmhg492r2ny2xwp14s4kw1tr60wsz3gs831n7k5uxtercukoenzlmfg2wie83zd4se6eh3kl43ox8sser0y7up2s9llkzm68as5ecoy9ipyrakzk5k9j6l8bjcqdynl4thpda2ub8ctt4j54wsdxiibtdq94jpiplo5mx3cxzdsan40ele',
                        title: 'y2tvg67mp1xxxhgd5newa06aimdzazacci6oa6oj6oces3wzu36pnq25s5ty0wyb2tradtvmsjfpk5yc9oifhqyxjouvvco3hcwlegoo9svr20xvcq2tsnzavd3j2lp2u9uej2k1gh4ty777sxygep40qmyr4ot25k5vhinruigrnqj2hfehxnuf39ur3sa86c4hbfxxgibbatjyr9bs9lc8w75hx7vlfq6qyuwsc7j6h0fypvrs7cg8j6bq8dw',
                        description: 'Nulla iure suscipit a qui iure architecto. Iure unde nobis ut occaecati ratione delectus. Blanditiis quas culpa dolor.',
                        excerpt: 'Dignissimos consequatur sunt officiis expedita odit. Enim officiis ex ratione qui maiores omnis omnis. Esse in asperiores voluptatibus vel et vel molestias.',
                        name: 'ki0m8hpg3i6br2xq0j2ih0hraqyujy2yc1ts454kczruoonp4w7hg895si3t7hrtkaco6x8us7azpz58ywzakbff00j75269kxw02bb3ih9q172gp48ayekbek64q5xhqoa0kvua6hjkp14upzu84aaocel8r320ew6q0ho1yj9z4co1yk194ngdjcj71iv8s4tn7w4lr1qupxrv7fno0pt67832rxd0l55bqrjbltqpn9diht4p04eyckzbn3l',
                        pathname: 'g2z1hu64dc6rqvnh8gt8a9vnez7qn413dtv74md2vh4m2vo8uq8vxt3m1qynr74onkfbe3vlgc6dlnqc8dtn7jotzr0czehb04meg2osj7b0i72qn6krlulwjcubmk5gyrypoh8j6g53ne9h65pamj3zterbddupp8fm36ei7in1vttw8hchhfbppd9ygsz2j4le5yqymz3as45tve7maaq36brsil18jj9brmrctddv0slm6uzm1ayqc9acl3db29xybxpqkmlv29saw3oixb30f8cc4gijwhcv2qokm7dpvszye3as4pv4tzqdkw8ukfr060ai27ykquedjzkjp5zx7s7ud48chjqlevzr2q862pwdkb74tlrw9oyzu2itbpo2ozn0dfpp7fn22euhqhhh9erm6mbb90touye46vkxhjq4gb906pvjk54dhe3awwi9vbrkg2ld5gf2byurjorccxi8awe7rns6qvuyvyp1dcymnfdd9sutbh6aoxezei7km22mt70ag56gin4j3h0zwbcq7yvqqvuyow5a7fhj1dp8tp6xrzxk8pywmk3312d4dm14ffo2zdx43d9al3vqoaisy7phs3zx8ebxrqsghkgkxlgp425nrnys70b76sga1x7frqce7pc2iwf3z3bio5lqtphddnkt7r04d7c0dnr1l55amh8bk32vk1yqhxugm8ell77wldlw5khaei7g9rdv63sh14yzt80vnaua7v7mcbejkmjwev2dzsjr13czvmy5kevsctj4ly3rbtvkipono5qzs5iwg971gcvl4yoli6zlebxc5odim2x94usnvxq1kw6l1z0pp8jftv896qk57rnyb5qep7kn8gw82rtdy2x46i5349fz7j94g8c72eq8dte6v4l5qkb3pyebcbd9hcnu8ar4ryfx86g7lgg9s1s1dbnqranylpbs8k527s62thghpz6ih2rjjelm65ww3bgfsc8x7144ey9hp3xk8d7422fcmizktx6j',
                        filename: '33n24wapq1q6u26f1j5d8uqa7vbpwxcs9d93zxn99luhuflrtxftgv9rypo5fte91wjdxmrmplb4vc7pqznlopiu7txkftiv51mw6nh2qldovjikxszsuhldc04jy9h4nc5eyufl58244wqnqhzybjtulc6c2ebgmc31ws0xvqkimnlv8tetkuvl6xbml8c68g3rgjq6uj5ujkgtz2170wf4i8w961i8s0ja9pgb82icpfmyeglj68gutbdsdpy',
                        url: 'xrs6hmaf1ex45ki07v7vx1qromamwzst36puxx70t6edrsqeuda092oo5al8r55snwul8w2vaj0pwpl5nuhk40pvmyajnqkvz1dwd56z8qw1x3x0xrs6w6l6lev5m1uxjhcrbktp0cahb2sdd0grt4mmsa7t76fxkx055ii9znq9zldrt2203rlpz7ii60evoelgyyjmb4jdw55fvwy1ieo9auywozsqm0w5dhcucgojvucpxmk7xwmglmlvwa51dxt3vhoejvfh61om6ky1hvkyg7al9ukhkk99pz23hky90k25i52cbqzazp6br5944ysw6a3019smvcbzek6jt2dpi175amje7b3pty4kph75ep033xsocbbub6t9qk90ch6g773lrgll8kyckcbamfspatqki74dz4mrbwss0p076pocvu04ygu4g5duv543p12omspf1rzoliv8epk9sjy9srdz56lrbjeamjsz2is0a9ygb5zpwlqhufj3ztdb6aqf8n2ihqaa3d1n7va5i8mv4ei8rqlxylxehhde90euospfypxtnxefj4x3hg5f0g718ta06ism5dgct099i4twq9d4svdidf6k8cfe4nb3bfyxtsc1goq3pp0d2eavd1n2s9zop56vvi0fzmdoucu1zhl80e4oquv25b68c1rr6qp473kdr2kzorny13110qasm9xjua158w8117wkg89v3nuj7p08ztdggsgsm8mt5ouenvlx76cue1cys7cchmesqasyceqqtz75ykk4x7tdho9js2r36z6m5tvktt0zcqt3gge7doeyvfdrb51x7xpj6epehcog717hcaxmifjhknvvyvaf5pl5aqe3utb5lz4xjs3vcz9deuqv5pbm4rzg9srvdg8n2srmm1pm2hf2kpfswpxr1ty5rreob0lqn19fmzflm87ghlqkkjtb4ftl0yon0r4q25gmks1v52odeud7m5zbru7czuzju08ca0r51tpvdk9kaon5rmri',
                        mime: '87rzdm5ezwgwzhyuji1780e7szxa2dzj4i9axn2fbda2bpn7re',
                        extension: 'lbhh4532nukqziof8grian47lp2tafoqw9pmtjac252h3463up',
                        size: 4489624884,
                        width: 315291,
                        height: 278454,
                        libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                        libraryFilename: 'd12otp8r0lrjy7l23ydjmdxklk1mqtz609m2uswxt3035yd458a8yr4esh9dlk6sfrc5cx1agl8t8p7rdjay6fvfhehsai6s27avhsso9zq2efhgrehy3f4ynyiti9ymy6wmw24f8c2tvnot64b0czcdxxgu022tgghfhr8zjecq975bz2s1wpfuhlgnksqgsmx7y1whhs57qnjqkoinw2n3gr0o17m4cgrl9p5rsrjqp3362aeok3s3m6o9kw8',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachment).toHaveProperty('id', '610d9e65-5ade-44f9-a9f6-138ddc6fb250');
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
                            name
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
                            id: '61e2d595-fd2d-4539-9376-4d9258589eaa'
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
                            name
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
                            id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachment.id).toStrictEqual('91cb7be5-55cd-4b4d-85d3-71e2f33fdd00');
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
                            name
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
                    id: '1f6977bb-65e5-4ab4-b42d-9853e6685a41'
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
                            name
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
                    id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentById.id).toStrictEqual('91cb7be5-55cd-4b4d-85d3-71e2f33fdd00');
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
                            name
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
                            name
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
                        
                        id: 'daa62633-98c7-4fbc-b807-72a206dbd5ae',
                        commonId: 'c1a525a2-098b-4c05-89d1-4621b4d81eb3',
                        langId: '18794fef-a787-4bd4-a659-1b9353012b49',
                        attachableModel: 'nu8b58zjlly0w8gosw6p73tysq30f6gy8ysefpg8zr4gn78ee4ti48oycvh55hf9pkt9da9ow0v',
                        attachableId: 'd243c59a-0132-4a84-9300-54ea47b67e17',
                        familyId: 'a05e0bd4-5f3e-4dbc-b31e-c495c5a40e03',
                        sort: 765904,
                        alt: 'yrtv4qooheclyqcchn9x5xki2dy7ztz9bcqwrzdt56zl9bc346d3l8dtzzox7edsg46v5m4diqr063o403orlbf7z5ynp3kpskb64pb7p38qnuw58cdn69qq3bv0f85innuc4uu68g4t2r8dmk3zzfimtsy64e0u35ogy3onrfhixyqdwxs2hsq5x0ypbsfepls4s4pqgxcvtibbnwai691c9z46pxbyt15x1gobtqw1zf2p25kpeh7zsczyo6m',
                        title: '1kda8rgp13mgjnwfq77mwdf1zrj6j26gbcrg2zxr5t8uu3ndc1xbvz3lbww6juzktoxlwlh8c79xl0h3cborwqves5eja734br551avnprdlsiu5jd6i4ymdwwsuvo75pvpiv0u6qp4rkqtcz3bj95ux540vmafe37n1bx7oa9ljlla50h2gfrm8pzltlm2ejeu02l1d99ig8gttkaf8spvaq38va6nxw77vaa7b3kllcbrmr0guicxy1j3ajrx',
                        description: 'Dolorem magnam a pariatur enim similique quo omnis commodi. Voluptas id quibusdam. Nihil voluptate quasi eligendi est consectetur dolorem illum iure ab. Aut iusto quidem consectetur sed dignissimos amet. Ipsam est et quos dolorem praesentium.',
                        excerpt: 'Natus vel nisi sint eaque neque omnis fugit eos. Ab numquam at veritatis repudiandae rerum distinctio vel ullam. Qui tenetur quibusdam totam quam. Non facilis et dolorum cumque quis omnis expedita vero. Expedita ut accusamus qui vero distinctio adipisci exercitationem.',
                        name: 'xblyuwytphpcqml6zi0vaowa843wbppg0zignwe4z578isaupiu85t5i1sqw0k30jtm1w6n3b455loq6cu5wafs8qism97rg2es7cpql46frpa1afgdamylhdu6yzmv0v4gj6231nhh9wdpn6x8e60256s8jetmyftgvqgf27t6qhkaoy3mlka2ziux94jr9txaleq13oztp38ycjhs9o097jxeyjip0agygf6ipdwpmeknkfvkg7pqbb3mw8g6',
                        pathname: 'zv31jups4mxef5dt6p95q0htkoq3kjz32xejxxubg1dipe2ti7x4hxhtyhrpiqyps4cnbhf2ye5dnszja8maygrldk6g5491up5lbqfq7w7hw60jy50raj8cbsagyydc7doz6v9y1tghv788fvmhkrswjrwkvxi16uzj38g642rgbjbzafam414yuicb0dhkwg00qmwu4h5buqp6jbhyr72h53d8r4x2v0qnej0jvnnt4bo9l2nspv9awfz5j44k5cc3i7ycxysr09hdkexe5fonqb1ru9eb7tlzohfvjadktghi9wnpcgo4z5a7wx6ttpc8xpnwjdowpr97g44y6i0zybfeb2ooff9tt589c3ffq6nf4s4zxjz2uw282m8ljfx60t87xrom4g03efjsh50rxtfx344vqckaogrp4p9mdwig54m2qfv5kqxaxaxm85rpgh7kky4hy77yvxt5lrk2mzc95saukm5in6ryjqgflnavgn2csmq0t9narxgx4wc2k981g5dmv61myjhw0bnb5dqo426ezbwqkah866vzy13fnc9q2zg7rh2b329ggsoczseni80os6fv4enqtaoojgripnganbl5tnwbfn92g5ba4xys7k2gg2kjqlqmxnlsfsfzvqy8ruaot64zfelck6rpenelfaxpywbkw5crf5yf3cn74snilq4n2dofahhdpjf21o0eiko0z315jtsu6r7vpyyd6ftfcc8esd241ri2d4s9anmsjn2mqizyz7zqn8bw2vrrusbrcayamsel3kpzvpqklvyaunq883ea46j7b51wrs41vqkrwa8tdafrndkgp6ag6fd6cp3zzlaclgcuqmegrknfu88tjulww7hewkly5d814rx3bai7dz4he878fenr69apghj939nlpeg51bfd485pswuoeiun6pewbxtkk7baxtgojp2iv8dxypff6jrc6h9ialu1w1pcqh6nliwf9mg5p4yjc64dkui0ezefwijwunbqeuln',
                        filename: 'jbv1tws21qhauuccbeaubrcac9t2712ujdvynvets208yzcjzfxsm4mkugoue17qn1tvhf2vlelfuevd1tux80olkqas1zngki5m5q77116gaxzxkqpqu0oavsdrigdaefw00l4hphfej5zg73h0noy6xdoiw0fmfo7frn72grwxmh79rpczbfbc12p2p4qx0dtoyq977gvj8xubbs5dsnjl9xi2585mx18wys310w109x2rnk4u75sp65lcl69',
                        url: 'ncoji2axko02f9dzpijf93sydppvroo543rhauv0lvd8oj3lafj0vzd5gn2f7mfyhuqgguwihazzq0tytxjula96iwcjslvxje7z8sqvhe0d5ejh4vh507ev4ia7y7yr5fkknr4j0zzryvikal6m3py738j4nmgh2bido1knl43gnn2ceqldbe3flckgkxqz18h9yz74hbxuvtw2uijy5sc9qqm7bo1jh8tj7mu5lt3us089ehkloel83muafkauc53u8k7hygvnof1ihssywqaycbs8sfnemb7khoykqs1jve3p11au3q7vbyvpjcnx8xxaupemcrmc4oqydyad65eabtflv4fc8byb95h5lebgvid4hw88zpz7txy693wydqdym8n9l9glzvs9twkjhs3j98fhyvyoj87qeoip24ioen5aetc2yph7b2o4yp3wlc3bj5668rjcoh6dtt8czcvnfhw6i7589uujx1r2bi4hqcodb9j8kn5qojue4a2jz47tfwb3ynzr14z4pvjcvggs7n4gv7bfd2pzau0x6aj4oithv8acbjqnyda29cy1c1nemxat0d0ru3ub6mrme7han1fqkyl8jfo3lru75ul0nddb7w52s5eywaclrl7rm6e57n7j8yfvvauzduzn4sbtaxgbbty6qx3ncjnlfcj9l7vugcls3oat3di9djq0w5nnh6ildjl4cvh791o053hfd6wbfluy7sytqzli54xxv6ez3z63ubwochss6lo2007a9lsgu8t83s860h16ke7mbsp5s5jbnqp3py3hkw4v6yi2r4uycdkg0h63ssddnj9iobdphrbpfyt9kd8b4ysk8vqelp8tuw7sijc8e5jnjs6kw40umvsk75b6c0bskxe855i5g91li89w610rj6hvgeslctkt0nbv6do006kwv1rscrpqfuzdxermkgaevja84ln9veqqphhe4hio1tx2lcgnp3ghxq9pgsxgiu00r46kt4oxtkfd3rvbkp47',
                        mime: 'csnkmkv1p3iros3frqgxfbzzn7kc5q9j311gi3bnqsaezmpdoi',
                        extension: 'owbfg9emgm40bv5qgla1z9lan28lhvn0cxbffadce9zoxotlqz',
                        size: 8864359476,
                        width: 853818,
                        height: 185119,
                        libraryId: 'eae88b17-2e88-461c-b1c3-39d7bf72c24b',
                        libraryFilename: 'vkdr3mf4mih5d0i2yc6azzy7vqqw2ejjyrzxu63uejbqlizj0zlq2595y7yaxiv5tj4bmktj1t7t7clarywvcoq4rua81eai9182wlzxv2iqmzjznxg9wvrav3vvv0x8wf2vb67woqunas6nq9kp1ucm6a01zqzhc5gupgxoy2n29rgngj4atqvoneidy7o9438d717j5ietwfg97b27yugjnvly2kjci70oj84mxcvikh1ra5c66ylb25u3dti',
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
                            name
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
                        
                        id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00',
                        commonId: 'e971eb37-8a99-4a2b-abfa-6b7888476ff2',
                        langId: 'aaf4a904-9324-4e7d-b8ee-e98f3fcb379a',
                        attachableModel: 'v0zxoli7ky4y4py2jvy0ihi1lk7dz7p8zp10gll2kgjcxmrkani01jfcw4pxqwpn014narmt3to',
                        attachableId: 'a1688f58-e95d-4602-8726-19d141a95112',
                        familyId: '2b7a033c-cfb9-477f-a852-af9bbd352331',
                        sort: 305078,
                        alt: 'mgpvey4xuyufi3kgvpr40senxp5hekikn7j5qhsftwne882td78jtiq3s7h2q6g16a8x6di4t5nb40m0okgn2krt8rqwulmr9ezsz4xd5f2b3fw2u3agt4gyr5zds7jhxk954dns27xq4q92pcvr1v0tbkyyex4zbam8eugpyj4ya5tz6h7dk7i3iex9mtiignuzme38250bsx65nk6bg2o1kdade62esn4tng1bkzmmqoqmbh6crmm0z01wmk5',
                        title: 'e6xzw9ksxhdccmee0lye95rwaeiitepppleozb7x915ug6pupy9r9cs9p13hif75c7p3c6ljk7qwra0dwa2xl9y28vrnval96rowt2fe34ye6n4t9r8mzebv7tn2b8ei6xii1y885q9f6nmlvlu4hq10xaqxtay82au0tp23evpg6j1h5pb0oufn99wncw636vp19e6woafr934whsslwfx7yqn69lzh5p58kjkpjoosyg6ljzz33ailo1sjflx',
                        description: 'Ut culpa et vel voluptas voluptatibus non ratione et aut. Quibusdam eius error enim. Amet similique aperiam expedita ut aut dolor error nulla aut.',
                        excerpt: 'Beatae unde rem dolorem. Aspernatur et hic incidunt odio totam ea quaerat quis sed. Et numquam quia beatae vitae consequuntur dolorum molestiae ea nihil. Cum odio reiciendis consequatur ea libero.',
                        name: 'qwyotk8mgeml9cwxh087kpzxceifsvgkv38kd4q2up0u2deubm5tt0f4zp3v11xmsidzso7u621e2jipcv5wpwf5ae9xb5qtoyype7nyf284yqn2c7d11tkbfgk6m81zdy3wjkire2401up7bb5ztyy4x3btfmgq4qu4fc2fa4dlsqpcm4v4ty6lbq5dy4qqio7nd5038didcx0bdu5nxmkjvlc5fval1xhl2y5lndwwgv1oderoghbwhawhpb9',
                        pathname: 'dot8g18kcepl7z839fq2e8rngjasw9x6g1fq1laisr5wsza03hx7lwqsjmr910awmrvzd30t29usrbglz3n8kjdcnpl5oc9xiocox9vnzh0fj1svuxbkygzl8kvig9gp7qe08wskokvzi5ful9h7b7mpwx56j6w7w1zo2xr53tbq2vfrzvmi5o84tbmuyghfreeog77z01kv2lmjh9ycm3ax4duzg0byjg46huq9pd6ip5u1xuw3ytufifho0yt95qzmizuy8qen7sty6a7wvpo7jgmrk82zxohv8pzbh7bvcyluj7of1cypw608iuvgdzwfsdu4zbfhpfj82d3n75joaag0i21rzhvxbb7buqj39561p7fns68e019oqutt2qygtanmwafm6813tytxmef7xgf9ichmf8ko3war906meut5ael6uknsfksjufl5h79kq6kf4lg6r9qz92phrdfwqf9xyo6anpel9i2lkoasp5v7q1yd9iftfo0mlb9ftf272str68m60kqiv3jotmreq20vlof9t9eua6jgrk1htmb2rktkv5cjcm9qjhh0pdh4ina5q66uas0rbggytyugjv9inbe3zhfrucwk4yrt234a41hsbdgt0g46sm7zf734tlvc8gsmi0sx9qm4afa8l5q6yeusix4belle38x7d8wywxqcp3nwcjfxllal6lcm46y3wbe1qiddjdywjw6iudbpyxxcxymwvi1xfphh8mffvknn3h1qap1h803lkwj92qq4hp7eryowwtkb18mf4kqe91orakj868rgu5646mf1429k5uyckwx441g4241le7uc0mad1gx1jzbka322vggnembsd9690viuxlh5qn60w352jpai6r01wxhhu8vl7plzh8sncnj8ufssymu0id5jwt0gpab7963mn3psmkgzibzqp3zbuq8p0wr4k4gbqq2snxv5lnaxncgbbtmu6mplgl9oh99x6l4isx3n6l5e7aw6onz8ev6x9ouv',
                        filename: 'diidpqc4crp6rsor523b0wm0lywlg8z1ot98e2jsvxr3afkfzldn830gi6882u882bxduljx00b42up7dwja0rleydglwqhkv2yzxfippks2fd4j984zno12zw2f1nj39b4cx7nvj6rmkk2tfgzzvbvt98oe85hybaandu86gszhufizw4przlq1eak3kumg4s50izry3wy3y3ituyatdnvky4q5a4n7f8xgw6ve4zo0swqj0ygbjie33ry94j8',
                        url: 'ydcnsmf3ohiehaq4r5fy6am597ukyax5z9f59dvnfu5ub2ypjy867f6ph08bo7fqxhfgf3j2od1gkcfb24nhdc9rra6lcaftou0ont6fm4pv99wn9ov54t5365y6yq8g87ikz4os398ugmsm4s0ne2a0vrhxxj4s8upim59xp3kanrlsddgc9ajyuslhogoda4whjmsibwn4snipmkae7r3ek8qxln91hxtz1yf9d3hybt7znykejo5bg841ty12oo14edbvxn2w7k78d2jlstxk80qlxi4o9obwm3y6un82iv1iftsskj4hrxxjltbww9savcc5gr58xrqdy1t665dz6ruy08dmltu37t8fpbq5hc3ke4frh4l3886nxm69kmqbv6r4vkshz80end1dmiqesc4ock25l074jb8sp5gpt6rxn75h8k6glf1yfls0n8n3q718xo01l0dzfq1xkues7q61048i3bs2ijjssbu2xn0bcz9dkot935pv74j6xgsx74tm7bm7fnjl9gai7396efezox6n294t2vor04qfspd81t1eovr64mg5cwth4i2v1mlrv4cb23g9ds8g5rq2lk7hapd0a2nd5p4gypfk7gae499v613aut6jmx7gjetkhg1x4zop8zuw6034muc5vrktcm62k86tbtazv10m532bx6i0uzjudnouz0m8anue2uafw13b05ahe92py8ykejxof8ma9f7ngryvf3np3c9iwnmygb3knvweukj8sgfx6hiqt309fjhiub6ow8iil1kuxnaaq4a29d0owmv6cydqomx85fal2ja1mo4q3wvombaeau2qnzdjaqktk2ndy0kibhxtgr8oqqdqxezertqpgn570ai0ig7hqfgul5re8kg9mkvxkbr0mpbl209ws1p33d4jk60ik39y7okz9brc1kzeytqc6p5gisva0entxp39xrqnrxaa1vof7s68282wizlgft2njcgovtyhf9zao70ohs1e64lmmcna',
                        mime: '5nbgdfbbdcjh7col5ahneamo2igts1n43kc5ecpfc2hkwco57j',
                        extension: 'att5emxsxblb1htpgc6qwfq2dv3rryin4iw3vfhu8xakegjz4t',
                        size: 1222558054,
                        width: 731063,
                        height: 982071,
                        libraryId: 'd9e239bf-8352-414d-97c7-e6bcc6cddbc1',
                        libraryFilename: 'cuslfl9iz1gtoh3eo8ny0tvft631gephzkbygtgr0i07e0fz3e9kcraylc2u1youif90jqpehoyi9bskhtla8ts79nvpjare8q6wfoezb29kc7g3e8nt5i78sa83rmoeeyk93bunjewkr39mp5yrypd4kglnm449heeiddgmh8mcfybg5txciovvplj0m9kfv6diz7xqktas86ost0upnsiufjocwk67vt1dxmmjpynii1opr948759lodhghu8',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachment.id).toStrictEqual('91cb7be5-55cd-4b4d-85d3-71e2f33fdd00');
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
                            name
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
                    id: 'cc74d91c-bc91-4209-bd1b-911c6b6e3509'
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
                            name
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
                    id: '91cb7be5-55cd-4b4d-85d3-71e2f33fdd00'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentById.id).toStrictEqual('91cb7be5-55cd-4b4d-85d3-71e2f33fdd00');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});