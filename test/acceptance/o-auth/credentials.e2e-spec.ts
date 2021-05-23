import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ICredentialsRepository } from '@hades/o-auth/credentials/domain/credentials.repository';
import { MockCredentialsRepository } from '@hades/o-auth/credentials/infrastructure/mock/mock-credentials.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('credentials', () => 
{
    let app: INestApplication;
    let repository: MockCredentialsRepository;
    
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
            .overrideProvider(ICredentialsRepository)
            .useClass(MockCredentialsRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockCredentialsRepository>module.get<ICredentialsRepository>(ICredentialsRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/credentials - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credentials')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/credentials - Got 400 Conflict, CredentialsId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credentials')
            .set('Accept', 'application/json')
            .send({
                id: null,
                grantType: 'CLIENT_CREDENTIALS',
                username: 'bpg622kjhzt46f5x0c55k0kj7j0q2rtak32uukclarnnrugyppbkomfr5r3q7f3sh8ynxaz9dl8oi4am94swvwzydvzsw6ihgsqveppbdte7cugj9r76f32wb52n6vducb2q0xl8wjmfp6or9wrz48m5zownovdwdw1xjq5my2mydnn1n7kpgjkvvyxnany6glzlgmh9kfkhh3hll5ongrubnxotw3ktyk1ossdn7d0y06407fbi8xivl42wo5h',
                password: 'vn241lk9nim3ra1kdght2vw0961f7hlg56vsi2g1u7fbqqjmdh8xt0rgkclckts1eiu2h2ulfqzwkz3fjzfyo24a86hvtmnsrodp8mf4t2tac3rzu4g4mxwsle3bxx2ed6kirskzkcx3wtniwazqqo19n9wf0wezw8em9yskj7jjbp135ipp21cj8wjsgm1c051c7a7jadhk3330cr57pnks2rempd9u3jbypmsxt7bu6xdfpq8kt7b48j2cdf9',
                accessTokenId: '5a153826-d7af-4868-9bcd-6fabdeea9c53',
                refreshToken: 'Animi autem reprehenderit. Voluptate ut nihil et alias magni. Exercitationem dignissimos veniam ut qui rerum dolore. Voluptatem et tempora vel et nam similique earum occaecati. Similique adipisci ipsa ipsum. Vel ea eligendi rerum veniam ipsam voluptatem nesciunt fuga.',
                clientSecret: 'tam11xt4895om6f2fbn9ecn2n1o0y8vp0i3s4wqch5ya1c0zi445dje0fnzx6mssnnhz0yrdvokmuz7gkle4phvdhm',
                redirect: '5jsmgx8gqdjskdom37zh5grjzyprzxpoh4klf0fis6zo3obb50nrtr7ct8x5q5bhmdqjvxvqjlcd9avdbwbt3l93ata9hw5oji10kgaabg4zra9bel3yxpwr01y9reae3iiz08clxyig0srk8mfht92afaazjuth3252bdnvsr3b9hfwi3lmhlwaagshpxfibzbcy1dlwfmt2fpkxyenog7gh4leuwy2y4mt3up61cw2g1aq8r8kqc3jvbl8xtfy5h7dyegep1sbhx6a9a39gyz2zuh1howt0ncm9e65tnga9duw4agytpz0cgtd92pywv82cfmf3hgar83o87fn5fyzcpupn4gcxlfm9jdet8dk73n1flujwgnim8zn1h5xdgyw4gzba7s6qcar7tpvcc0etey91lghsv07gzsosu75c37em75pa9xai75q895lo9b7oue2zk4lu4o66ogtu4vk36c6nudcc1ju7asdfhiiptq44kbrcd37regmie5k6spt9yehkqbykp48ziizhns9nwry13lot0rhz1fh2t2god7yxvo4jle95kadddytcyk0au01jqlgp6vbljm7uagh6dxkzzp64529ihu0871dzgd4bdhfkwth4k2jc7gq7ld7e3m70hepmoalkff349npighzudkl8brrvmdh4fjvmsxh4priy75vb37mvvbozwyozymx60gzyhx7lqt49hag88nolqiu30cfe22eo9cljzkoll5a380v3xf46bf89tvotzgmfeqc2dnhwrenxr46hc3m9dwgfsk6sucdh44zye60yn6jzycnz5t6ao4w14vd1wt624nlxtxx0zo3dp5tjj3h4zc6h9xp9vn5ihypuwhmazp17vhlj0zzcpt1hxtztoxoqnh2mv2lki4owbllqbq16jlbml6pudwhsxh3u637cqr0neg9w4cqqgk0cbt2u43bo96xlvgagkqq2rfvjyvmtk1f9710q0z92wz9pbiplwb83na8ecciy1zi52p6vjl00rgzglt1mw8uut6blcyckdrk7r9sh0196mtxcn0252quthlr9bfne06017i7cuqzgydffph7w5cz9b6p4nk1mionp6z07a2czlszburzrbjangm5q6g2nbqgw02i1t9ia9za0ki34ctjalltg8adeiqhtycelqmzbf06s8rny7a7tvavn49ykq8i8obzva0tc0tunmxeeojxkudg4bdsyxxh8a9jg7dfnh3fr1liih7et2v5vhbxlkoofe3cdy6zt1b3k82jfivvrkpop8ta0tgdg9aoakcapoiyhpuik4l04ml8owxigff0d3m2pjgj85slcm3ercehi0djutoy9cbr4zufahj04tnsvm4dwfbx9sn8serx4ir6wlbofphtj4usrf9w3d9pmtnf4yqjiik3vh8m6rcre4xx3iquuxmlkodjwxix0nhf9jpdopkj5twwn7d15jp08sf4sgbr88po2elvvz4efcsynnprvyu9b0wxpi10tx4c2tpru4z06puzqikrjir4tru8mg9ma5cmmthgb6oro7w8zzyyh43sv3tzub689msfoqs6pej4umiov3szx7mgaj26sk8fn01wlwsurcgi5mr9x4x06bmst0sstxt59yswd9yyuemxgy5u55ty7g5u4994avgudc407qocb9nq4jovckqzo83pittr553ppmari1uihqdf2pk5h928vsfh3ihgrsgm4lq534tw429d9sqo5eu50h2tsur54kjy6hfygpkdq3oc6vcp46kxfmobn651m12u71sbo409ysnzss94olj6hi6fjbu72hjff3vq5iw8xlb2aj42audgk97ekl5rhdr0jd6q9znwg8n1t5zvwjar2s65vpz0l4npyo26yi4hkbdejzyk4xs4giutdxi2oycav1krsuzdblm9f6stz9vu2014scscoq1jx1epc0bfo8uh95hlawr6nj90d3wr2lpxt4g1e4ohecjddrjhhk8kcft86c1e8qww2pz3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CredentialsId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/credentials - Got 400 Conflict, CredentialsId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credentials')
            .set('Accept', 'application/json')
            .send({
                
                grantType: 'PASSWORD_GRANT',
                username: 'w6rijnvn1jkgg63hav2kq1e3ymoll48bvqnsusrl68gm856za5gsq9uvy9y08hbuaa2t79stv5enpr9v71omlqw3z6k9axeat84jney7z2r108kin267ow2jdaegesoz1wc5qsbbjtbquu74xjzt6jbtgopikvm7nx2ldqls5emz1o1bcqjfiwcirkpz2n5y9kol4q32n7yjx0gq167cni10ztofkdubavj6kyweoop06f2mfpsy91d63qya0s0',
                password: 'vjcq8ijqtkl27bgxnquyv7z0egprvcpe9640sfy52hz1u6znid0drr0sojcagfq17vxuaedj5k338bvkndj3c66rzd400gj7fcwmt56y04dclqcmmptw2b4qy3u4yksbwlw28t0rd0uz2ara0nh24xtp1hi2emp40bs0cipmsubqsknjkxvm55wcr8ensx8qmx86r59douxonsnqsczmfcmoj1m69rdmo5i961d45gorj9n7qr8ekplq2mye97v',
                accessTokenId: '5a153826-d7af-4868-9bcd-6fabdeea9c53',
                refreshToken: 'Iure ad recusandae voluptatem asperiores quas veniam veritatis nemo et. Ipsa libero accusantium quam voluptas molestiae autem maiores perspiciatis. Voluptatem est quia illo blanditiis non ea iste laboriosam. Saepe sunt nisi est laudantium repellat inventore impedit. Illum modi odit id velit et.',
                clientSecret: 'fdoogivzy1dshvqk5kemv1dq5qf8h888hp6d1tjgrjiun7rss1aejxqeuev44v6j7fxdtrioyhhsqcn982ceyr7uho',
                redirect: '5jsemcpqjcftno6v0dikp4196na0b8ngykhr3xl29z8cls3tp9mrwjoohij577xux48se95rzd3nrdh1f0n44yxn71hmkih9dmqrk123a639buox0u7cjc8yieifzc8qayvssdm07yag39jqr7059b5lkpahre63hcn4e5kksq2bh4kaonhxjqj826elg377njcp2zj19v73b3cgw9961hhr7dfus7h7ucfd30v38k79u84haaf3pw7wo1anv8z7w9oy2ly8mybv3ia0jzj9xzc1gp0i1o8va3m2jqn8hh0el2xf5xcq5jkgvi1tr8pvz7l8biv08xii8mu8d7ktx7ycz7xf65y1ilwjnhssni5gtn27e0t9knugfxa23ncoa76q43q2zosullpbp8p0mfgvlz2km6dv6aroyg9irkawnspdl4j7spcatx70szxnq8c1bywzjca56hop5wt6kgq2vcysmbzuojwxw1gd8xklyooym0mgjz4g5qvbjcr3caenysoljyouoiwbi7pj3mgp0d4y0ritxa3gq60kc1lq4hdatcde8wktyikzzg027jlm09r6dmujeyjwmes81nywakrb8e4uukzqpmxwaq1t90hjotc1hr9w9033dvuscmej0uz0lxdh7ex4yxbf9f1of571vzuk6l1szcvxtfs5zvvx52on3fu3usb3qmz34hrnxwgh09oyafy6ak9hvws95qqw5ywqmh6pxhy73o2eyyi7895tqqzsq9ntar15nznl9kqnks8htyjskxe0g0n5vjv7nfkgysox2hk2jquh1l2ih85npriczxv5n66r2wqjep468hagi441hwl63lf1p5a0xhsdzq0jae66tlvmbcds7ak2b5fx178gjo86srs001czxvm19czpgo38flsqa7vhfultdt0iqw6b2jq0o706a565uy14iocamkk4ir8ijj28qmbzazpp4tnwzifybt4b1pubqifclatz2hj15u1qorwwv7dx8f7oqpsthwz91h5e1kbt3h19tm8r7b0shjsjen2ymg5ekre5e4am23bwnhxbsz5c13p16re6ulp5il5f1h6ipbtgjg7qp35ru9kxn48nuuwybshul0f6rxrw4mesc50ytmouiq1pc4w2ttx13i34re0yjocoqy8i5mqxwb8pb2ttjwe8hovpmsko50f9t6hrxqlsoad1nm18xjoaqby874cslpt7llxagbesrpmfftm9guskm1558z6w1vvx70oz1w8cx3jpdvv0ibou151iqrk13ypl4a8muy2b736ow6v3o1n173nbzgktkm1h5efajpbztq5lf194ruazxyv0gegejzhyi3kpnx30jb95rmnfx06z5oy93e1y4qpal36cro790w6hwi85mqy6dubve3zf93dc2igscdnf2rb18b6f38k4x4xxep8bsftwdv0v2q9mdy2lsl965fedbkxepikwgeb8f5k4wgbkr9y4g2pi32wqfzpeof9bdd4nq960l3pk3dgrbemxm50cd36y7rlcdjrfveoxulbp1yz53pc7x702qfxf8i4jwga0tgzo9vtu8oovke035ok2vwdjp2e0mgbn34c85sz3sqlwqhfpi8iyps7rf0qi2h77kb48j70exm6tth6pk2ezk1tbhihuykmyutuakqjetcn4qxi7y767aiadoahl5z1n26n8k3fqfhix3rymuafw6sf0tvns43ritltp6c7b0opt50ybpyg0sjqa3ahfnn04dr2uop650hay857my9sibbfhi4ui94y3ncj4w5nlncln0y0m3ys9584gb0oyf0fyfojcl5857exe9l8r849vu6l2wqj5scmo5be20ypijn60t3lhqf0e3yu328uvmjr0ls4k218imxezzlg33t9u39xiu7xuly8qbq1til10puv3wc74ct5c0p6hzlmlloxa7bko00mknwnazmzsnugu459hkf61as02ofv094q1g4vzgfzw9qq2fjlf0qgbzo2yw77z6gqjvibr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CredentialsId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/credentials - Got 400 Conflict, CredentialsGrantType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credentials')
            .set('Accept', 'application/json')
            .send({
                id: 'ac38dcea-3dd6-44e3-afb6-b7c211ac1a45',
                grantType: null,
                username: '5r44yhvdj5hawchr9ekkn1a0rrirg9e8guenntavwe52lju6iiqvglh4zq2j4ig1ppo1m3c7evfwlqqwl1cqxhyuzjawy8u23xsi45aop3qvh7tbfe6vmc6pt9iprkiyrlyb6bkvh0raa68fi15bitfm8afsnui67xglpvpytkpfll0ukknq7ufv4ojumgyndnu8iv7s2t5co8txet77yzaeckijaoilgc3v9qmjv4jwlqtd6gru0cmhwsp4zi4',
                password: '03svjl2be5rngbpf003u2p2ajsquzsa7y5uevx2wv1l076b5j991qmtkbk8rxzmjrk8j6whfdxawo0581r43wbk1z2awr3ay7ylsmkzp8t1stze00rnlrusjczex4mohka2k0glmhpqh4d8vd8g53tqtibj3lehdjve7n40mrzokhfm1otiw709kzdi5hdtxpk7041yipufzzb6t3daa556pkhrx66fxx76a5deryoinla6drdp6fcokjts9k89',
                accessTokenId: '5a153826-d7af-4868-9bcd-6fabdeea9c53',
                refreshToken: 'Veniam velit voluptatum voluptates voluptatem occaecati. Molestiae ut adipisci eos vitae dolores veritatis sint dolorem. Ratione repudiandae commodi explicabo in atque facilis. Eum facere a recusandae vitae earum recusandae sequi reiciendis. Molestiae rerum consectetur minima et voluptatem. Deleniti aliquam ipsa praesentium sint vitae adipisci et hic saepe.',
                clientSecret: 'kw2etz14pfxwowqxsqe0mm152y6p3whuqwvgfs1z7izh43sdr92e67uc3zsc2mxcr7mmywd8nn0nxgjpkche20vegk',
                redirect: 'fdzalrgxobgxs5v7dwspdjkxvyrfwei7ped2kjdw7k0bs1x1fuo0z0zm4fngcwjd377zp0yec2e9rutdtl95yzi3q0j4tkmui96f9fiul4p257ygkiwta67e044t8qm88i4rtuquf2exunvpzv9e7zuymvln197kxwgakky3lrknd965a7wkkisr03343zu89756dgamhxz2uckjep8zhdm2mdx82debks745f0hggn8p3x7bqnllpjq1efkeg0ihcb1htmi61txmilzkmitvsg4wyy26r888b4zvdyg7tq9owlht7upbc2fy6cfbdk59en1reqil67g72xri15i4qiwqbgytvo9brcecdly7orydubtboo8l2z5q82jgo6fqgd4ye8zvk8kvowazxl7xcur05io37wui4lhqrftyvxs3o9eir6qhaeavyg9ytdilf88t1k35y25t1txtv289v720jq32p1heijyij11vddnh70zwmlwst4tvmm7s75poz25woozhn021h3mt50pfkla93186saxegzscs2qf3orqpuv57ytqjyxrkgfzo0um6mbgw0n26x8a50by2dqj45pv05pjz0f6ul74zdtnseayrma08by8q89zp7i28hg53ynrrq7qrlv60axjmchw94gwl30hg863mccxpy0innofz0qa4d5pmyr3wqp0z755oythlt7dii9sgtionehxg8397asyq0z67ynbhpu23ayd7w49ftn9xun477ypiygust9jjooj6dyzjed919d82tynvv1lzcxok3ewgvjhhcbpdqaele6d5be2mcuqrq3c0m0i2axmdtki5kvslzt70jmyfdiwn1z7wo5g4znqn4p7s3c25k343q6ucnhmznacyrg9hju32y4enz7clwb7mnf4yqfwzqbh5879xavp4xhbq3llieuojycwawlrh3qlws3gm0nc2ijkwe9gmuefdgbw71eqdllv711f3vbi2xf2ovv48lmxgb920mkqcaakacv483hxcc3buswhnkcnyl2dgy6dlru0xmyal4vho6nma1ko14qmoydvqj1e1j0d4ukh7amkwgxhwelnoob5g1oysjgfmjoumunweg877vyg9p111pxvmeand7qhmy5536835n24t1m9tbhw1pyc0eqr2iq7sb86hl9e07wuvzo2q5fnl1z2gkfyje8h0exfpu9ftnl1cr81sa5nn79topualb7oj7j90zxbu609uz7d934ufp43gmkae1c6z7qczf0xl1hinnh6en6nwhpqc0zava7kvyoq6toffzvqxtpfcg1xm4pmcu1fmygkw2jb5i8wgxk687hxkliufmudg38fixc9i274vjen1gel27rnmy7stx6qm4qah2ganajmaczuh1tuui8m71l0deqj1zt3lygh321dkenfk8p4akaryvix9xrdykrxqz0q3brqemygtt9p99b44ic3h3ao8nhksbwfgxdxhsjc6tijitm29gvhyas0vf2o267mjfcp2f1j0v34vyeci6clam7n5i9t1ukswpulyrvl2lgdo4cbz72zpu3jog6qhjy1oxl3x13rssli6an86hi8p9kvd2w55jpz8uqma1v8mrqfw2xtgx8irtk69bo7jcp9kd61ca89iy7xpqjnywt3lcifjesnx6ubfn6km7pnuu6czoqrfcnjd472rx5bykt76tmj77pcrv7u1xvxdk5cqx9c5nzwln3mvpkdrlmb7bfldn4vl8d1uyhbeilqiyrm4ukcby4s2sb0mltuaxdvee4ifrttso6longv784o69aaia0hxl0rhxbmau20xwokj25a0gquvgk8zb86wp8u7hyuo30av6q8i797erozr8mudegvnp0n4r2g0zwi7ub0rru939vz9r26zx4jjbdxrcfga7di9f781tca9u8gb3jmpej03ghej5iw7psxsv0ruqd72p4bprqufluh2h1i6aelsj65jo05443ph00nzfba5ju8l1tp3usl86sor1c4ni9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CredentialsGrantType must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/credentials - Got 400 Conflict, CredentialsGrantType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credentials')
            .set('Accept', 'application/json')
            .send({
                id: 'ac38dcea-3dd6-44e3-afb6-b7c211ac1a45',
                
                username: 'bry7qaimhtxkcbfc5gtcd9z9yujn4ya48cwtd4g3w70lc1snfp51r4zsufx8sqvi4eylkov9w2l6e7qqb998eispy7ibyzp01l0kabklcygc012lr4fuzomete494lha4wxw2d0zuilcly1yk87n26caw79999w84eryn0b8z8d1z0xg829drt786a0uenbos9ajjdbj5yfmm48xg0da4c5qnqg6zz7brxj6rx3b1qy74xpfi5h56s3if6d5if4',
                password: 'r3on09yvr2frr9b4p47pbbyp5kzjc8xd5tavo7utdrlts783zp6pwwvlrq4z9qyocw79usj91s9so5p03ppfa068x2y7r1j7wkmjwlnerp7hbd7cjcnkcx0k0ruxq6tynljr761v63z9268s69uslie1dsjlvr9uo4u8m8hi4gmpi98stz2w9g6emvnlnj4f8ypdeljsu1yk9axta78mv4azcmd5dp82rqbnoaigm1iou6sec5b1mqbaqbrilut',
                accessTokenId: '5a153826-d7af-4868-9bcd-6fabdeea9c53',
                refreshToken: 'Quia aliquid doloremque. Rem ut tenetur necessitatibus voluptas tempore aperiam. Modi est cumque porro ad qui omnis laudantium numquam. Ea dolore aliquid.',
                clientSecret: 'k5xqpnb8zmr2nzt45bfnzbhs7m77t1cdq3fh52sc77g0u8civaf7pfbyoa5n5sx7qw5cq5dvtd4h4gjf6p517m5x4o',
                redirect: 'xudwjcpmsrvplgehu53c63wi5ahd57rlfdvwotzu65fuolhyvgctf4lhx1ds9hphr3aq2r308w33vusj08exvyni1aqf0q68u34d863ya8472s12lzhnztyawgvlw3mota424kwf1mnzw25c2ql025cxhrxv44659zhrbh2nsdzsrowdahghm880ahxkdooryy4yzyt7370142ooki8jr0n71iqzwzvsu9gn3rfj36iin54c9f0lq0ps9sbht1pux372ofxuhrgseed7k6lxgvh84wfwasgpauw9l3jsakd275budl7nsaoyp5gyq3f5jqjebjuq83du5zmt372sklwl544vrb8liegwdwhnt3aex5w167qfg50xqab8fy6o9i624vv34q2ye9lcnp3xjtd232il7dezks6nut6tq36fb5sp372fjhgolqa47rrcxt1bc46c6a7irpwvjgp8t9sza4n1kaf37l5ib61tv9bjifdrvzbuy4t3sl7go2244e2kne56ttbu2eu3xa1vfg786k6bclvemc70gv1jz6cvsqsa4kapf79obhl4kyalpkxu5bqwxsrqoqky9yblkp0vl4kym7e68lf2dt12w1nwbeb3wbi2c6mntj1y5w7bxhpujjdviac0i0pit9cv1eckyh9l749qxzrgj5qvxcqq6hzr55js6m90c1er1l4g73f8x37e6bzefywhx7tplmkehxovq5ceoduwfi4987h7yacoq11xbk5bq4ra1i8647fkgdqft335ulbmt85m1mdif00uq3xwk2q2mb10k8wb94sm0i1l9l7z4dn8c1eiuxjgpsmk8unda5pvujhdi942ey587mpf0or4x8k79tv9fvx9dmss0ieg0o8l530l2no1u4zj07nfxcujkoohg1wyyja1hugbki49lemcy13ztlmmk0um3eezurvn2ij76j3e40ghgyxxpi1m727ckghowv0qf2324vsukd7xqwy8jqoxo4p9kcw7s8tj2lsgod7elnswx0zkcp55d3f5c7fp8ojjw5iovhsjkktshczn446989glb9cs58hlj4z6x13hn8ogtlchehfr88nw0ppn195oht86qu7on6m0o3c0uvzs8klfphjiwololtyrs0i8t2d3euvi35w66h7j6yun5y4rgpgitxu1tekfypgp8n5o1dzw02hd8jwlzoq5suglqurqmlsut35v5ebacon9jzbc363mfmd1f6e8s0ko0hvqsk2spuh6hf39riliv1dbouitqkzhtoelmb5uqw1wv1pnt20np2g6z4ybzc8z1z14jvtg120jydzhgdk21x0w1n9ejqa2wezish1qutnw938asuuw3bb1tvrfc5pzu98fg4dch2shvoy56gcgizhj08ja9havzbgbdmezfc08wbqef4zwess3wwqog93vbky5tnboe5wi3jkma7zls76pzq7g2jahylcnj540gkju58gbjqnwrlz6yiw1omtjkd7liihttaly0euefl4mk2h1ry7om64pt765s4an0zoqtklb57b6uwdozjeb4h9uxwg6hjqbofzleino41m2rmzzhm959i3o4plb1eg00uode0mtg3t801u27rmwguhlxhneizfumtlcbtbt1bhbl3afi6a6lr468osrko6un66j7yjpvo3j1sttnelwb7y7ux2w9c6suf7al7qfjkjk7c8zcmqa8dx7c5l97a8f8hdtqfmlwfpbrw15vj20krnjp1auwydqctn12tq39noanrvuk5vmvukq6oxi95sr78gi7qhgzqro52aeoudus0yr6mrxrik1g7f6xd4f8qlqelg79qfq55vlrrlyf9ebxz7vr6i3sdtlv82jvyzqkh9t6qky0uwxj44f1cznpvqkanui0oihvos525vomyp4rt8hxuosymf3ygjblem2n44jz3uikfq048ck6ajgtgvgbl8f7imofmwox76nk8d4uut6c3y2cb6qjrzxb3yv8uv1f9d8ue5sqftclosorfe1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CredentialsGrantType must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST o-auth/credentials - Got 400 Conflict, CredentialsId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credentials')
            .set('Accept', 'application/json')
            .send({
                id: 'gh3v90y56xkvqix1qcw4jap7djfnwipyhhhj9',
                grantType: 'PASSWORD_GRANT',
                username: 'gj84yg9jwu80ta4865kmp5q6dye56fkzkshs6laawhb2c3fe0grbrizbf3ovhr83ihfbb2n9fny27qzfpl8fzgj3pdba2lz5n1ise458cnltbc4865gaemcuqd4kar8dmffy9dfeno57okbko9j15nhjttq2amip3vsqwbp8m32opp5w26in25lsr0zbjj60m0md4p29ccclirgsn5w9dl0aww9fnzvwzmlny22iazswpelhptjwznvku19kjju',
                password: 'eqvdvgryqij3s936paniffzmi3tbkyzm7067ba47o0fwaubftkga3594etbp784hyhynyubrv27lkn2bc9poq2g6ils0xfhr32wyod47amj7hdrwb9tb2nyqtz8bgq41s238s96zhrwxcwg6hneyqvpr62o4uhxvbdxahle3eirk30sroifdn8myo14txn2qt75d7ublr0591j8xvile2amkgkqnf9k5y2fgzejb65h92unf8sxmcgigngnsdl0',
                accessTokenId: '5a153826-d7af-4868-9bcd-6fabdeea9c53',
                refreshToken: 'Natus autem fugiat officiis molestiae inventore et consequatur minima fugiat. Occaecati et tenetur voluptatum voluptatem vel officiis quas et ad. Repellat enim provident voluptas suscipit reprehenderit est. Sint consectetur iste rerum voluptatibus quod. Autem et ducimus.',
                clientSecret: '05ybvmphg8t8ndnyq5zo0ex3q5bjk6wlohjfycnxnmfu2n9cuj2soqmviru8prji8sez2ej1togdexq7p6jk1rk41z',
                redirect: 'rc1ncd7v2is2q4nnk9xlcjijtw4rn151xc8ip2ses89jwhna4d2w9br62upg8sa3q5wpxsb8pbkp9xzaxkqz6g5jvfe2toe4c1kvdm9bhxripbrtklufadhcrjdfdhkk57dzudc5bvmviqu096s1tw6fqf7lisre8nd8jndhrrsqxf9um4a7eimyr03xx9df46m3vpc4f39xpje9sr0hxxzbrbivj48tnmrn8r7pykqo68pb8k0z0hve25c2cyh4buup7i04ldxi1kh25khgcm20mnocd6y9gp4vxqbjzvgl4d85z0c8w8pirp4hlnz8dbl42uasjatfy2aiblhof8up3k7kemzwe5sdw5odx7w48sviu7jm88n6f3rlqwc7v90n3e5l7w1q6qj1t1toudw1lrqij3gw4yp4pk86cs999o8cokq2m8wn6lpqsojd0x6n8vef1pee268vap5rbm1pguxlcdix0ve95u9dz32x44g0xfj9lamhg0x1cnoiacj2hivhb61nseo8wnwpkgmkd0jufpgv7aqnbp1hvqjzl9keaj200p6e6v7ydp99fk74t1dvam3gfagosnwvizo229lix36ghek2ndfvndnch9d974u1di6d7cgk3wbt5bc5ku7ropop9ma8uyh1qetzx1xgip18a9e522yah3rby22d2d6ii86g2f18qvll3nd1aovb5g40moz6wbrmgeq52a4x7ilepg2tlmdr5430wwjfvn1b0cn7qtxok9ve9w6qtvohk0tzr9pckg34ckcb5zq1b08prm0ox74wefgzle2zk7ihux9yfeoio3bh0kx29nv8g93bbtfty0nlgeyzcbwbpq5e71n3sz1m7vlmfi1y80a3ajiq0ahchfnq2dvylx6u6mw6vxw86e1s5vzceqwckev8dv1dy70c99p1qgm1r3qjyv8dadv0ztxne309hfcrq39c52y5wub2a1kxbfdsohlj3nypq8bbxt7bzie9m7dosjn8xixzp2dy2owyxgizpzf96aifhwd0fvl2sj2uptrspzj5vp00emoor0p80xk07y0b2f7e5eez7g5xono4w12nr35g27x5cmjotwtpsfbihqaam7d514x84tha9a3es6qrjmqhqs7bsone9mfh1kpkon2kwmz1i7u9wmb3begivegiqa2vv4umbugj2cpfa05qkgt10zbvo1a2y850w07f0nyl4wwicu63w2dmfosfbrcesw4qkrnynmp8iey3g083g619qd0iox8w5elecm8gz96asw12ypvtzhcxky4hgjpyotln4dzxmveaoniugyydp1hqagtgm566ldw9lfzy7trmu1q4l4qavm1njd7blgtap7ulcakjmhs014l4br3pi37nm3tfm2d5096w30l91gzy10o9cllgrpn1mcd2z0v10kejsevg1u4ajmiywnb8sgaedah55bzgjtf1hrk4zu5ttddfh9zg96sylf8a5ptymtb6s1xarjyetiiw1xtdzh3tg86hjy2hbpy5hpo4g5q1c1yr2rw7nhb94kl1fwve8tzjz6estk68f3uxfk0qkiwp768l1f2eq3lti4tbkwov05pb9arm0mdqcc7nvbr5sn0k082airwezbbivc2h65wadf1ghcyaucf7euc1xffohd2mbxzvyil4jgqxurhzx80uom3e6w9hn94ik22mlxt4stigu1m0rwt1c0bt4rnylxhgoepat3wjwidl55jl0yj38jerpqoofa08ye3iyq6culddm2ax18omefr9h07gqjgvlsrxkb18a2hnvqkutdn62sgxsbg1cxeznmkwigbmhmloypsq9u1ri44u6suql5ervxpa78byj45mhhc23v4uzhwwkocn1gjxp4hmvl0828eukdcit1szcsamuf7upc3c54hk1w33kuyuvoiiztqae1j7p1yh8n3wkbcoyaiyd3ynejjidyyh034u61ql5g4gjqvl3qt0pw5khz1324fvdhveytg7xd4ul7rygqsmeymx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CredentialsId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST o-auth/credentials - Got 400 Conflict, CredentialsAccessTokenId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credentials')
            .set('Accept', 'application/json')
            .send({
                id: 'ac38dcea-3dd6-44e3-afb6-b7c211ac1a45',
                grantType: 'CLIENT_CREDENTIALS',
                username: '3jc4vaqs456frp7pa6va4cq15ax57kf85qxlgd9h1uwfoq80kms9gxo49vukova2sptyrfs6r0i8zoek09mmwozbvfojwml5qaylaxzjx0g28f8x37lsriwpvmx5v64ea1old4jlba98up0fzko9l1vw0yrbbmp6s6zoinmmu425d92bptr64gve2q9v9rxuwc14frnh4u41w7z96bjv84v4ljj6p3cvhjm9f0enabazjr4nseqk0cqxnepyw0b',
                password: 'jzggf37v8db5hxzfc3rmdu03575yeibk5yy85rx0xfbajr5uyncfznz1h130mh9hszfb3i54x0tgpuylhnnl8byt8ygv708j39h7byyfi90sna5p7cw1zehgfzdsljvcop0pwca4zxjjoi5z7b539pna7oissfrihvrf5489z1d7tumyctxvgew1re3wb6s8klhw25cx4e6focr9cgje09cdxm1mapa9blc2za7ukct3itd1hdxdkbomhxahgg5',
                accessTokenId: '17lrabfee4utq187l82y5u0ixokm14wfwsehl',
                refreshToken: 'Dolor harum tempora ut. Id aliquid nam eligendi quis. Sed ut et expedita aut tempora ut. Dolores qui quidem minus rerum sequi quasi quia. Voluptatibus quia eum. Mollitia et earum omnis cumque porro aut.',
                clientSecret: 'u3p4fkcu6ewbsgwe4xjk2s6dqwmebmeuyq6cwj8djw8qzxk8p5xgp860kfijkhi7bzknfqgej5ctuk8hs1972sial4',
                redirect: '1l9ffygspia0wtlu4xeeu0yzp0e1pklwgx4sc0lghru8t6l4nweojq8zo354igryuzk2m10n39jn2mwpbx8p7ul7wahsnsptsrvrrqa3xc4reiqjjnv51tyuh09za83l6c1rj6mngi8zw38l9uvlbnqwsaes6lcs6p93x1trlalzjyb689mojceavfq84jzw9ion08ilsajy97eoutla4vrb0jyg2bx2rprrm533cxdufgdvth5dlfrnqwibfb6ogtvkmxfm3lpl9f8chzep6pt2j5b3cat968j2yy2ir1yw0pmmwvxch1bo1khnyb7dswa1dzu1p5fyr4rnk1o7yyb7xwx2wrfn0hr4pltib1geykpprfcpmssmwpyiaiqold3qdo546vtj61bc85ns07t45bh74h1bhvcnhcuc2gst1nbkocchp6zi8fm6gs1qioy2kdmxei4b8mbnvej7vw88q12blbbkshzafx8mrjq93ajsuv7bzgxufqpx8t0e56qx6apwblrjwfgp692bdtwxfy5gmfats8atcybz5je4spixm0180y347x0g4rkf6l2mu2gxmk84e4wm9eg72d7gel9dvm4g70lcqdp0x19z7b8baji6bw19gkryn2vclw69y8s4gv38cvk69da0nt0reckrnzt8cks0y73x02rn1pu9z47jnl6vmsopakdzulol5wprro4kxd2m8bwlv06jlxtengt2jx5oqkcx3xd5qjvwp2gh8pye3zuucyfhpxzihxw5w4mx6ysvmiswab62o5u4f20byesctxdvbbzyehtjvu3xodcrfyk5qe7crglr9o1zlnzfm6o1bwdg23l6s5u0lqnx1qhq2psa6yuapr4ki8lma2hsz6hnrhyaoft6bwwzm0pm8xacpjf7acgmhpbd5t65t5b70ai8w4mmlpf4kk81lppe716l3k55yc0br2flyojro6z9d93ks7hs8u279qm2js0yhym2zzczjpekq02ytsn8itt712fjyecqmh944pamx1ji3xiud4m644s41jj3k3tc5s204f0zakc4gd5gl7dkkkqhwt931ux8x7fbail1tx8x0ep6zhxy5t6cgzspvohbu07w1n6u5d3u19a3a1zrbra6fejijzzgbt2ya5wsrhzi0ee5ux74ixnz1sb9zmz1e9lslmrirmjr2ii3kiy4s867jdq3mqq84vft6rb8aukr1fppsl80k6okea26lypyegdeqm69u2wli3e839l3exl69pgeovfar7pv4sn2aibdw50jij0ab4kwezsssmtkovasvbqhnlr2s33ogj5bobzxlhxm7ra9fanikbsn69c9vwze8zn7epfdxblphey8espdj74h54xoffxrgjjjswqs8sqo8m9ebs03xjy78qho5ixnax3gvy40jtc4ox5aq52wc4fj3957jbyayj3fzusevahutdq5gzeq9w12drw8xicg0mftwah4ovz3gwlymy8wnkiz129d0038xk23zvy5mrgh4b098i18vch4zx7np75xshrufbcit8lf9s78o5grz5sjphc1t1e5h09nybgz3zgcrqqny7hjake9jxa50oyf7yw1f10bd4qci8ngoc2636s03ncam3c2x1uqohilirq4jgcxlfueppy8y1scjjf227cztxm03it18pt9u7sut1lq4insu9vjx548939w2vnju0kg45yzssgins06od4asmbwfiq8t1pi3kw9ptrdk1jssg6v4bi02zpcj5nvrhuatqwaktk2g2tmud2msc71heupflf2fw6txv6zftut17ohodf8dkwc6itnuctj6fjz810oe86bluj0ozjrpjmtbgyhtdvzdlfnz3w40g2u013xhwxcwtwhp6xfa2nnosg1fe8etqvdf1434moie4oxtzmjxzfv43465mlagwvrhz1iqykl633e42hg953o30yfuiw1o2nsmtbpxd4ji1i17suragmiv6aed251hd6t2k9cq2fgq2j1eijzt7q11q4d',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CredentialsAccessTokenId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST o-auth/credentials - Got 400 Conflict, CredentialsUsername is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credentials')
            .set('Accept', 'application/json')
            .send({
                id: 'ac38dcea-3dd6-44e3-afb6-b7c211ac1a45',
                grantType: 'PASSWORD_GRANT',
                username: 'zvwmj8kg7o0rpx81yd15lpgo5b9hnzxohvxio8z647j28b9zrmwhifflo79oct3vak35fo6cyy5v3nmclg3o3teympfzxn8wuimhshiarm8vz56epo43cw6ktb6x4dj4nhfucslbnbzdkklzbnvdaeub42six3y96tqgi0keaejtnps8cbtmhe1y5krfi23bpybgzkqee1i2r6hu8u4kw0bc5inc2y8f5i1b9d84fiv293zcfhf73xtvuwxf5su5',
                password: 'jj3mutxik8xjuqjr72scc7axdtt80hydhluvudflsdoc7wcrk435or97522hi9a0w0h7yj9kkkplynvuhgiu9cs8udxupc6eng5nswtsnr8wkzsoobxq5thnuf2blw8v9obrpxatsom7kcxy3mypfdgl2i89x0h6d0dd12143poipf5ww9uimbhjg2xbjalfpc3qzfxvswvbsk6on159ekd6z1okg42kz4sxd31peg7xrrc2r5tnjvud0fxn76q',
                accessTokenId: '5a153826-d7af-4868-9bcd-6fabdeea9c53',
                refreshToken: 'Impedit debitis aperiam voluptate delectus quam officiis. Provident nisi iure. Tenetur voluptates enim quam ea a fuga.',
                clientSecret: 'ij9ebv8o06zsub60k1m7bc1rv9yjfg7m094hbvwog80gipi2ybqvm79dp1uupzintus61fnqksvjbzkuft0lwdwt7u',
                redirect: 'rdvvsh7zyf8gbuliqwcnu80ivmtvbhlo25jms1tzdq25tby8fxbdgnn10hgu57xk9f3sldybqp76q0ffv960o319ab5223ez3svznhvuivt9k1967em2t2ruzeail2vm4hevdu83b8pr9dwku64xrbn4smifs0x3zr9shb0f0mo0ckhc6m4xfgtckwncwffnjy2vovp9jjqtjhqvdj71dydfndrl6pki4m3ykewpn9qt04ggktrx4chwm6sckpz6ipfpeb1ceyp3vu8b76imu84zcbpp1pjfev3mu64fix1jou3aqemoc3ma7catp8cazj4qfbfdjmmn5olalo9kubvav3iwapaqsio0xupuzyu2u1xsc6t0lxyf3e8046456afvskbaehhngr6x3xi0wjvh14avniwcxa1vextzqd25hg6fp7ceb16x2y3xlkta7x9kts1603yv7f0iulfcv4tlqr1p6h8kovqj3hqoep70hludn9b1mkqb8tvvw69lac3yhsu7cid8871gtg271uvtrbti7py64ldiry5tpau6r9c9kb5mpb9fgd3oh5jeqj68l1f3oeyxzq8zimc64pjyr85beibicig47q1ll19y6k2iii3b295x47sqles96tlarn45znt5jqplof5pyp0340yhflw407yukp834savuvbbfytfigysqpfv09st7hui08zz573chsuaebcaoyr8geumw3hoxtl61uohfbs42jbvcs60fx7tyqgcznrn4kt4bcn4v5sgktray8ewf3me7at9n1wrekp9rdm8yd8p5hk0j6jxqvysex69dbmnhxufh0zor6c8r2363dftad4x0aq7xlp1la9k7y4u34xkn3e6hgx7rujpjjb7e55huc06muz6c3wqqhdoofk983fwq4702kkydutktsabmvkbmg9dct8w200c31fbolil76avzov7ryzp2sfrsjk83d8v8fpl1r4hdyrpzuxbqpkmt8ech4apxy6zrv66lb0t815i6vl324zie3xmvgoz6t1z1hdjg2px7q7dvfvku7t27u3r81633z5ufjdvpl2wk67mcf0jfhojjlh54uh8pqc2ykj6dc455x2m9fb1r376pa71zhb7edsbr4fpcnh6978big9xb3i5nmlwvataonkm8jkzi6iyf49sb80zjqudd5i3dtk7ccbrnr0dnbkc2r8bo1e69uwaptmcec0purg6c8c3s9fenetfpvvcjulvnt8rz6v960fyu8vq0hqdxduihbzwuueg9e79uj247jkpb1twgwae03mogp2lkiq367zh5wh7xsaqap2g95wcsqvmgum4epjb9nnljrnjtyphxjc88674ihk0xj1doy8qqgc9oq6encu6n8zwo5mkjtts5k75kntwd723hnh80jq87rkpf19vvs2a2c6pjujfkh31ejm0ze6mz73bivdc8y4fpg5cbg2q5k90z1ofhbikmn7ks6n5yfdooqbcfef173d5c0045hi7ekpc9wi8egbzi92xwsjjyq9n42ben17hhhj1vk8dmm7jggz4chjowpdtnq95uv6risyi78ccjow04ya67n6w98yp4279y3gwru2ag3t7fmtky6hztzpui90dtfz10e40r57kpiivjtcvqs7qvzn5xp4th8fn8w02k5lfup32a2nkp21dv4q8vvnpk3vp9wta5irviwu5kha3e6o2f0uwp87ki0adk1t1vz7d0onu8luradg7fvkdzvwg7xqrj5q225dn26n2c0biqp8k60rhl4v5twlcf0cbil0o9eomo8pq6z955h02l92uat6nsh3ark404xty30q71z5xkzr0f9o7srgzr6dyvcny747ki3uxfzdchjj3mv9gje5q7hm8jniljy2vozgwptms38yrdxgv9g5b30wopy6cu71zaio40nm68awuwz2eacr1jfb7602famlwu4v4tnriavoyhsshd1dzi4mayxe9ad5k6ars656wh2i1ptxfin3mhn2gcv2uhz7r',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CredentialsUsername is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST o-auth/credentials - Got 400 Conflict, CredentialsPassword is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credentials')
            .set('Accept', 'application/json')
            .send({
                id: 'ac38dcea-3dd6-44e3-afb6-b7c211ac1a45',
                grantType: 'AUTHORIZATON_CODE',
                username: 'dkxw4mivjybjateib9lzu82cuhihg0xonpwzlnrtbyxlcnuo6dc0l4j9d8whtkisizarg1ozsgk6dlj2nrl87x8rdkduolo0sbdfolz5kanyr69agbstd79d65cwwx3jcti3z7yu30c0m9vpyhzoccj4s89ntjac8h6yxoiqfcyfkflo78053o83nbmqvp7vkavq9a5mm1gthmp6do9mywykl7mi1u7mp245j19d678qwm0f63r3eolt1mvovxp',
                password: 'f30jk2ojre9i0g8v1hk9now09w7lgfz2ikk6ah0rckog9w5xkj3fmouidwq7kx87ww8z8m4rbihd1ph6qzplfau94h3uzk324e63ruvvq7zr2w5cqbd3w1ktken251qvo76fo0wa96kyjg7qfe3rrd9rh9b80pr3j0rnz4bi5iavpelxask852ddi1o41a5cqm089zo3409di2wunl756chf7y11wsvgiua5dx6xgijc7rhg31e0ymzyk7j0rv76',
                accessTokenId: '5a153826-d7af-4868-9bcd-6fabdeea9c53',
                refreshToken: 'Natus cum et nisi nihil est enim. Vel a delectus similique eius voluptate. Nesciunt odio voluptas voluptatibus modi.',
                clientSecret: 'kg4gwtvjuaxjeiylv3mv0c5ixkyambswtkw7c6i38sbpblrxjulcwg7pb7s2kvqdaz9kim3z8f9wmu24kicwwdwgkm',
                redirect: 'r5q50v8de7izrg0b6p4je4mz57u5500v51qmxsa2fv16wc5d4skgsym7czxv8vbpbfbac5rc97f1tfyn37fi3t1awbnzcl1jmajtax7i8106w3qsimjzdjyipwhmkk25sh7p7f0onp7om9qq9mt6i41eg1rxi8spapk32l68brmp6qa7y3ivt0ozeoh3x8yvyoxfkktygsl6mqczw16k7ua4iiekfl5062n8b5di33qr4wi492xoybgo2s8opgriqls9o7uz2io53jm09umj64d2jav16y9z45bzom10sl47sw3j11l2a4nt5wutxay0pjblbmsv3csbcv53n8wbcn5p4jxsm6n8n3gxwz7ssvwhb1htewvvpyixp9xwhec300ran6li8esq7677kgcc4pctibthoqtv7d1vzxpqy6c8v3iqmfy2l1aeqd0pvu2on6v6ikf7w7bawxk7t334u4bu92e0vpj04gchmha8gyev8z4ercsaddpi5dw53498d7d6f1fzjwld4a29n1qvt1fr4sn1zf4xa8ogfug5c0v4h0utq3fjo9ve4o6z45sn2f5eanku2a4fs39ggvr7utvdngkmix2l1siywjyfl0bpavbwsegopof069jhcpmbez71x0tsq73gsbor592h0yge7r8y0kl3jruwc95dyigqvujmov0k36cupr3u0snjnlhnk1gkk832wbfrcyyc9ibpd40a6tfjz68wn87fmwkcf3ovohs1dzf1vhhrbzt5nsgd9hh9l5v43df0nqe92ueefm5rnomnvi6ibuno8fvoosqueezlr2zwerak1ldkit24uauwtf2r6koccqh8axf36z9sw4ctw2grhwk2zhvgg10px60nglkaenv3zt9xmly7qya1lr3bfj2e3glv2dcpguttdyf807wm3k52ovx9xp5fe4ky05lkoqe8a8dtc0b78tnqikx0yyfjh7c19hscn1nvnwbu618xhpz9aet52wcb6gmwnm5tqd9shlrcri9sjhw3kz3irpkrs86nx3vb05vbysnibq3iuzl7yfocir89qykowo9mk04tjvt1oupk7yz80zty961358ac8y30grmx5m07zq4m40eufqoeqvrmuzjg7xo9vj3iot835icwcn0xvn505mxh03ghuf3rg0875p4t09hu3u7j239gq4y8u44sbnekyfr7jkjhbgn1ewgasvll21yqaoxsrgcr52akvmyo9d6w7vioha3ab43wk3kgbto0elkud0uwf0e1dp4pyl7kwmypnndytl04tfybh7akysmsw3w1k3izezwwwqygm94r1zrbde0c5ah0skud9yafp4pm3g6rkjd5wbvk0jbbjjna7n3poqt3s813j02vfz1uihajn3eaxrmwx5d5pgtechmvnpfhufuxdpckccojhn0e2k0ul9xbd22b0zzcsuvt1e4e26xbr9wjyxzrl9brqrdbu1x71146z4uoffswbaoauk478ype58accayuuctll5kyty0rf8lyick25pufcc01fwkbngv3lrs0yyfdzm9dv0xse39mcoid91l17i5glqe35h0u30zse4x8kdv6synkerjs0svmz1tyy9jp823lyimd0z2hwxznygjbei9zth4zgh80culjc6qkvsh261abkd4izk9lj8byte06v3b0gv6f8qli6x6rwcs7qqbpvm27hkyyo2ylb4k7g4d6abl7noppj7hb25n8fm7r1vvzor77knfhchvqrfdwpozqw2jor59g05v6qvp6fipt40u7uwmtox4rq81x1mfrj8cqedwnly8b9m9v8o31okone1eghb1fkxxwm1hgfwg8r2alk9a24zxg7ohuou5uzltqfmxqg9gczmalew5iompodtmv71lqhppqg65d1hxp20mipi6ymeo6wjrhx7ixufgt0ltms2s2qc88re643rh9rq8nodf9d5i7i42zok1j3db1am1uaaetr7teynexb5xnbxw3suggi0ylx6q3buxyx1x94bn1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CredentialsPassword is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST o-auth/credentials - Got 400 Conflict, CredentialsClientSecret is too large, has a maximum length of 90`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credentials')
            .set('Accept', 'application/json')
            .send({
                id: 'ac38dcea-3dd6-44e3-afb6-b7c211ac1a45',
                grantType: 'CLIENT_CREDENTIALS',
                username: 'boe6i6dyhipif15ny2d6a98hsd0nmutjbgfa6o6meq2saw76m26eg4ocatk2or36ojbzxtjm28vszcfgs1dpnc81e2fdgdds4xndmpoguxv99pafcqu0kb7ttkha6h4gcb3qiehlacuse36kppdiw6r445phdyqn5mvn6ckj3fgxjxpcl9adi87e6gci604j47he9zssxpro1h3hf1hfpulrrpac4k549s13en4g86e8qg3bwf0ux61xehblsti',
                password: '0p8rtczdiak3nedq3rombdldt5mt7ooxnhaoqi3y1wxyqnndubdk7x3ap5vb47mmth6efhh6wn4b5hz1dt2bxru0mv3egz7fz0qpr142yh9uene8c4gfqzpr9j6as9j4hk8fthzkz7u0nbuvgbbw2hhz8gejjvc3ckf98tkidls4tyxjns2xfem8oufn1vlevi7bip4fy7mpa3gg04mcr46iecovpq01xe0o5mtvbt89t40g6k3hzhi7r8czz4t',
                accessTokenId: '5a153826-d7af-4868-9bcd-6fabdeea9c53',
                refreshToken: 'Quis autem sed dolorem qui quibusdam voluptatem et qui. Id praesentium aperiam non expedita rem et eaque est. Velit voluptatem non modi et delectus perspiciatis dolores quibusdam quis. Deserunt quasi quo dignissimos et. Autem error id ut doloribus veritatis est maiores sapiente ex. Deleniti autem incidunt maiores.',
                clientSecret: '6d2sduzvufdrvi368gr2k48a5lqeemto05di6dbl0jba4p6z0cqfdzynqr7bq6qex4lx1cidt9s6z30fcwh5ipt1wgj',
                redirect: 'chgy0ht8umjmcogfmx6jm7czhtexwhx5th2msnbhkuz7fav5in4hc7af553u4wgo590dmoxeoba9bnm3y8170l44qptniavz4zg0tyy1mxew435s2al3m0j6u4xdo5astxlydspvjc0pdq6znp1gtcuvt52quaucrq9m8fuc3x3kr8z97rf6w8dn2tj6za16orq1nxiw0pp3ik5kc68serjzrijvg2fpgix9w057eqs31bvdoxzlqxhavfxxiccn9agbbuy8dyky777up66z2ynnbafd93icb2c4lny5e1d2uiam58bkrm60qgffeinbmkoiswq2dapgm3s119rdtise3ws3t5n7qyd779d1e0a0vdyxw7g8vxiix5wogifnqudjj4uj9rzag6b7zz5yz1szsi9kp0tgee0ug7ngsg1wsh2i6oro04d4yh69wp9yiz09hu0mbbdczwors7ro626df6dipjwkqwqupe9jt5vhwsi92ybrj9b4ud944tzaufh5msyy6n5ozyerg7li2ychc939l8936rfevaaou6svijrm2l740foafg56ffrsv68vuguimiurgiw44dmpr4g39xammxn44wvbcjxz45cw42lrbc3yegoi14lvd0l5089am8juqm86bq0yjt451o3o5x98f38ylfwd54l8wkl9d63ymyeu2b3mcg63qloa097kcxnufr6t5gqzrbpemu387zf038vobfctgt9zty75yfb5emh2g4ykhcy6l31yylihnq8k0ow0qvb9b33vf693xx5kaaw95uk3aoiudfgqqzplfcej8u8b333vk764utgk3njxdskncypkfxe71o68sp3op2c4yuepd997uhr78ye8n9evjzdltfj1yb61g60694z7gzht6sfswryls7d15nj6s1u70bsgin1b54za9pg2jw7rdb8ophfsm4pdxy05zib9qil46dcveydtvi8ezz5mc1ds81s20svo9xy8ammuhcclixjtvwehu12uzk4uwtiup5n98b44zwfm2b0ryj281h5e6jfgo0dd9d6n5pqgdiyx1jbknjxqucmb43ns8nkzvmp5w3m7iwotpsp6ihdq9l1tfpffeovs7vbwgwdbnemcsalbwgvr7ahy9sbhln0kpwetzr3m09u5evx560maxavps1ddk50ewm1e02jweaaa5pfy3zwqi0ya7ha6hn31u21pdig4cy1d21pzt6vh2d5s555h4o2cdtb6oyvovfptomvq7fxutzjajg0ourq3nurctchtzp07tbrprl54oxdgl5wafgzicc7f1ahhlthy55yzmjd2iwp27kg6w2evrtc8xt1tez86epzuj2eciaa6dld9z1oh53913ejn8eowepi4rxncfhkjq0h7da9kv1bzx86zvavo5dtw7jcmvxyblxpctkizesmena7x6573bmzpzwzpu1rb76xl9bqyunn6yfntm3snro59o2lrloq1fdks6h4x65og3eaiyzb5t7xd757qiqzxpyfbuuojnylniv5duu8au2j9n83mc6s1u2w06uyzn2q2sc9i820nhlu2prdhdq1fmxk2do2qt2tu6dref79xiondbjziq0vl46ctop63nrweunrparj5gihe4rqua1w0qri2s72q37utz34t5sf8vqjfox7njs2ltgwddopahdac64q87sb0hxn7ps42d1afvvya8a6wc73dt82p80h7tetj5vxrrawpkmj2yx7pq02gniydr0z4h05atqeu3a2rteukox6o4nyxn5ldygh6mlv0fzpu2swfh3mupxso0cap2nxnjreux07rizoprxya51kz3hxncv3b6i4ppmay340f1o9qjt9f7ckyna5cv0919552o57kujy9hz5usqvrqp39di52xp43kx6idb1veoie31zvwsd6n2q040zrj9l7xhkavd9iybe1oyt69fdbts8hoobjol4bg8dbh199mt95u2cny8wuudm4wcdthuoitmsdagqsmfjbfuutozxa',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CredentialsClientSecret is too large, has a maximum length of 90');
            });
    });
    
    test(`/REST:POST o-auth/credentials - Got 400 Conflict, CredentialsRedirect is too large, has a maximum length of 2048`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credentials')
            .set('Accept', 'application/json')
            .send({
                id: 'ac38dcea-3dd6-44e3-afb6-b7c211ac1a45',
                grantType: 'CLIENT_CREDENTIALS',
                username: 'kxcr2qxsq4r3zp1dhrkv9xzwjjoqe4zis6r2b2wjt54gl4pfpmdunx96t6zbd61umbjfyf54xtv5xycaf05z4l8ks59rzog2ysuu3qhomvhasrcwptxktha0segdj70v7tfba4yt0obhurfts6io3oc4spmbvmi7hell9ap8o811jtw030apocxt59mtat8th1quibi9jaz0cq03t69k9734oau6q3qawt6wh22uk5ixpqmnb1rw08co5wn3oja',
                password: '9exqi9v9gjed75bzn820exfl2b300ukxcxzbpg2vr75g01jlie6ymn162yujdv1nah52i097oo6yvs9qt0dwvc6ytd74uyqb9f7ezjmyrsxjhwmnvuurexnah7lpo0lkyq4eoah3kose6nypm18s7vkin4x7zni20hyd9sjdlsr9q9h8kj9amw28f1u1jnyebjwhdsogv198zcsla2h6bfl0g0vcexgqtekkwbcjbxxowufwkzhoychc4ddono9',
                accessTokenId: '5a153826-d7af-4868-9bcd-6fabdeea9c53',
                refreshToken: 'Deleniti eaque unde est. Provident rerum et incidunt. Minus iste sint non. Quis qui ab.',
                clientSecret: '317nkcf6hbmowph6ta96as6iuhdm1yllcc1i9q0iscq57369sbqpzjlvl1smcaj4m0sm6qow2ogsm6fqnfs79mcman',
                redirect: 'pb4z05s1iqlbla3phuvzglhdhu1uantjpg1yy9i99a43sl5zwtfzf2ckg49gg6q0jwql1njcfg4g8ca3zkg4n6b5wa85mq0skysit0ct6e681gxkexchkqelnahypd39ydo8mnjdptduvhskxe3qijobhc7pplgmn4na4w2cdecwhqu6q33yqdlthuxikxe351aey9ql0gsh0r29408emspstp3e5sa3huv9ojqw5t6ix8lqxc6mqgs99x97e6c87maezi035e7c8rkh0x4bewfw62bwrfsk6isg5c26n1tdc04m9ph34rvkux9wnoardnyvgazn89xb9yphyrmn1te7hb39dmtfs87f8w3rsbe82bmjqkpinnk7d5ypus89ny2r5it2marjbm9neteuy7bcw5eka2jgyarz3dog2cn10i2e5lxgdamvvp1jjigqqe4wwhkjto2lqklufsn1pdgqxhe08tqyyzllbhcgfuu6qscc5zpwcwa51u41si9d1qt2a18v35sky6wsrqqs2sdriuhh7uxmmtnnnxpzl3hldawhx6mj4929x4i5ghkpiuyxjzndsbeeptygtyx82x551wmf1aj3kj3ygljsg0to8sh1nqlnbone1rjosnuo53d09m7nl59w66aiiyj4n4oswqxl670ea1t1etnb9niehnu9qi9ue9cqwvla8wtv7r9avw0gicbp0p6w1igpz6whhkigj10wq4w0c2p89m7mx51nv429afeb56m6sjpx5grx7fnif2gimu4e3kvbgpmgirg4xqtly1gzhnsjs00o7pohab4pp8oezvlpihq8ivdv3dtxsr7f7hxbxkw2icrsuv5830eapmkgrmgycziuvifbxsf015mvtso80gjkgp9a1ik01mh18mz2q5f9og6x1jj3j5eux9dftcgvc6zfglxbds03252jidwn84moid9e63rjyepmicrxrxor2kr2uv7tcn3dj9vp2r62jhf1xygmeoq3lj09p9c7jbgqizxw8sm93p21qzwbxw59v9ytnadfj3hnmgq88xj5dnehnv3ubuszmyazf2f1m9gi17o7d36c7tsplocdl0mg3h1ahnzg15r5yl5k628921ngwlfchkg7357hckc6ks9eskc6iiyuziwbsvu569qaucx083xvwu2hby8mcsn0l21ctiaes42vc5qmolflkakk0vjxeqaxqf5byt5sq8lq4a558uys38wxll6eugyvs3s1w25gok5nxntbm4a8wtl9qece2aghwx2hypdxnr79ko82pnoxbs8j2zgvr6jtaf4gbm33ifwd23c3e77869jbln3wqb8zzqzdtrv7zztl8mgplyuepsa2s7w8vpz09xumdf7x9fxnljiry9z6l6pnx33l64wtnrbucjpyjgz5h7hwldn9eo9j7w7ez5k9s8eup243wuhqywnywnklpbbg2e6hrt3pttrhfzgzsl3kh31j71tig3uwmp074i95w9ejukbg8b1gnwdhuaouz8h7rmr85b9bx3inpk3k6jax2gpnb11xop1jlzzh7uxn6fywjdv3o7q2avm83qvv7ck2aqme2nwg2v2y1258a2ssn03qqg6mjkp0kxtc7rfrqgg3q0ub25q5regkqwom316yph9difs2mbjue64k2s8x04qoikxcgtfwyvng87aopob2m0iy5k3x34zymwz3s43gb30d09ti6g2htwekrwhtv717x2ttz06tggwd2w1nz2lmcu4j1u96y7089h8143mmeckxtcbbcl7ir13fp11xo3etwybonxoflp2em2mvcxgu9wprfkrcwdzzfwp3tc9si9l96sg5whlp2ugiiw4hc1m8a66c12ckqvnyd8czkx6jtmop01of31v8byog5kgh542utie9k9cdr488puwedq7n4cgvqcgpjyw19dd5fpt49rvn22ioar6nerokvr95hiy9sz5gbke9dclqshvsoo57r1qcfuhx9oe01m856umsuby1xd4oth0lyrqp1iqiy',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CredentialsRedirect is too large, has a maximum length of 2048');
            });
    });
    

    

    
    
    

    

    
    test(`/REST:POST o-auth/credentials - Got 400 Conflict, CredentialsGrantType has to be a enum option of AUTHORIZATON_CODE, CLIENT_CREDENTIALS, PASSWORD_GRANT`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credentials')
            .set('Accept', 'application/json')
            .send({
                id: 'ac38dcea-3dd6-44e3-afb6-b7c211ac1a45',
                grantType: 'XXXX',
                username: 'wsvwe2d8opn7qm51r6eo4u986chuljl1c5r6afuh8act7ck308r4ecnlhjg3maeopszbrx9mcz1kuw6bblgdmw9e3ykup51k4xi0o4kybuezmfo76tauhgqxzpxgohpkyfuvx94gq19wuaxi0q3rfjar62vkjf4kk96lchdd651ax0ylk8vm5dzuwif5aq9z52qnz19w4m74xs9j5bompuh2a6trlis844smg6rzf0af8tz4t544wgujjuqpbhw',
                password: 'khvvzwo252c0jfy082z1ndvyvrwijkh3vvb4epiu01trpg087c380u1s44sibjovxnyf06ioav94r3zdu7228prc39jp3rxha559p1j8p8i2wov2zy0uqy9mvj1pfl5sraf54o3qtj8syotwnxjt8ye26w461i6i16wrworvhep7ofhk2ls9yn9lbuh7ymmrlkli7mguhmdqbslzkxlx9j2h0jw1oirsv6akhoaa6px5scc4osgz9efxnx3n0km',
                accessTokenId: '5a153826-d7af-4868-9bcd-6fabdeea9c53',
                refreshToken: 'Harum sed nihil eius. Deserunt ut dolorem voluptatem. Rem deserunt veniam esse quo non inventore culpa beatae quod. Culpa fugit nihil ex nam beatae pariatur. Maxime rerum exercitationem non laborum dolorum tempora quisquam itaque. Perferendis recusandae nesciunt maiores eos dolore mollitia.',
                clientSecret: '499qkvzc0vx8jnousjn72e6tloz7b4biuw2tjvkpx3h3radcerjncmwvx5volaa58701lwfgfx7wyqvknacvhi2jk1',
                redirect: '8u7rv75dp76b5jzzx0kx9q2hmcp1axvqilhtjy0twhlesyrbcavvvtq4t4g4an5n215zd1theaz98a5c69cj63f6d53a2n35autsypf61vj13klyjq93ctzv6fc8qanwy69sr013apvsgdzd1yurb57jnk872dci7yomm2xf82nvjplgcn1iuwixqykql8bpxamku0hjr5uvgl1uo00aaufmyrcuxw3ju81fohphfxkvr0q4yfibdqqawqbxv9lky82b1mlo4tipkl8c0ebwt90mccc5bpaedw19vuytrujtogrj17krh1z44o36taunb4vmyq5rg5x8u9nw9y0rlf209aws9pj609ex8hvzksu51khg73z9mbwvfd8w6b6nqj3q3aj8vuxj9m32gix5w9qeb38xpj2iqlwynjcydzzeob8eja2uvv3r6tu9y2pxs38sp10wuzl9fsdanijh771jw9kklb5wlfdb8u7lkhah7g8uvt91qq65en8t0x4068ui36pdqzq44crbgzylb98i6gkf75ub23qx1l1mf9ewgz3k74m1l3grzjsnz3kwvg65s9kdrplu5b9d9siiuyl4pi3z4j3fpjvvipk6wj1awtng1fbl3v3t7y131yxs0x6x3v4xll9ob7bljkv0rc89rpig39jmytz2e8fga3al1f32eaioqkxipg0c8c25c2qmv1mav07ew9kx0ozz66jxv2lxox94di1ezoozf7g9dlzkt7dzfcc5292m5dzbyewwmpm53b5bkmcgp2491vrd87027s1hhqb489mutun1xa1ld9dr5pzbaq6jn6k94xl98srws6plzyesuxr9n1o9u1dkagonw17reud72i9kmytwtysxqs336xaui2euhz3xida5wr4ll3q9rzmtkq46hs48f5vynrbqmhvnd115506rc8qqdpfxpmdrca5zjh74lvf93uuef6ucpjeakmgz9yq5p7e9ds0rbtifi2mgug3sfmnftazel18ab41jn6xy6d14zkxznme4e83eyvrw9cafqllfer09j2golp9sc6raq5rz4v1l98t7fkb1tga1nk0ob0wd0lxrhbpwowvvyfadmgiffxehibs2i6fynfehk41hyz6w854h6zscknfayta28zob4k8p0lvz1gn52r8nrdgam7vnxdb928q6cdadw9sla0agaqkb3cf64s2axg7roe0us38onprjjqlsjaj92uzbfszhfgwabrwvanr2f23dfjo5kccfmoxy1gzo2zehoudettoyik2apkd24ziltm9fc7t1cgf1vcsl34b3nu83yss6b46boxzksjjo0atyuicyjjbm1sywodfk4sump4v5wud4lpo6tt7a76ev9kn9tj2x92728kqt2l9mg5w7gc2aypr1atfvwu6218l8omfvwnk95ml8y3p60bqs4314aubtimwvbk0qy226i2vwvewwzak9vuujssugfwum72e66w9qbpfoh4t838u1poqcjfr1y477zfcvgly6hepp1u2q0khpagx4im0nnfirbawa9cci8ov0donnulh4lbq1a5sxjs7jpd8iss13j0hqef8cw2vu4meoblovfxthd4miwlrugwufdx8w3aajhwsa3gm4ndmbny44flaeae4b2e4wywk1h76pciukel983qgtjnj88tlp8p2dx71q0hfpyc5nqjl2q0ts0ek6yu1c21hyqqlp9mv48kf9ijazy4pfrxz3zbr1pt83sz8i4w24ao9y0wlj53kdea3vr8gs9octapdvjw1ydc8lpjmzrigl9tk98rq9xpjz1x2kiwnsvefx8xxiqvkc400o4riyp0q8y82zlk0uafrm2fzu6k49plarvbn7h33dzt32c0qjil5u3d9msnbbig294gr6myyiwm5o3vo89dqpf054lsm3tvqto4d54yg89ha5mkgwgetq3itkkjprze60un8vcq4nv2uvfd12e2zzeasfig2ko7rdamsl3w4ggs662tm18y9og2yqktqq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CredentialsGrantType has to be any of this options: AUTHORIZATON_CODE, CLIENT_CREDENTIALS, PASSWORD_GRANT');
            });
    });
    

    

    test(`/REST:POST o-auth/credentials`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credentials')
            .set('Accept', 'application/json')
            .send({
                id: 'ac38dcea-3dd6-44e3-afb6-b7c211ac1a45',
                grantType: 'PASSWORD_GRANT',
                username: 'b62yapr61nbdrj6ip8eq9xey9t43vguncf73s4cv58pd2ifn8bm753vkrf0wh2r2tx0t2k0vyjan2xvkfnmpjicrymxvayk83c349f7lwxrwoc0zqw008zxa31ph4ir3yuhpxcp5vbgq5itvrqfy8ud7juwtefp0hy0esjy597f0ym98q88wcl4ih4i9g22j6yudk6frq9w848z5vaev9e3xi7dlfd355tbik2exj4esrfikqumj71dbk4h03ek',
                password: 'bwiyg9ypa8k0e51vrctiakcso4oiyp3ce4d81zgjnxy32ojd349y2njb1u58thwfq0o4tw66xcz3636383cdyeglrhqj6jw9xegltgm0xxcb6xs3p9is7b93jaue4ucjec22wskg27tux8k5vtgrm0ouhr25qo4kk5c0iro5s1vi2kkq7f9sva0nsqngjjjh5ss6w71ilbht86awg85ulok57ljh31kpfoof91bdio71lk9smnau7ll1im00ljz',
                accessTokenId: '5a153826-d7af-4868-9bcd-6fabdeea9c53',
                refreshToken: 'Aliquid natus architecto temporibus ut. Aliquid pariatur maiores voluptatem ullam. Facilis quidem mollitia rerum dignissimos modi sit exercitationem porro. Aut sint alias et officiis recusandae eum.',
                clientSecret: 'i7izjiu0y39e1hs5p220fg66107osp9fr6p1qwpg02plv6k6h7185hbezosw6wsjbjtgtvnrznqorqmswf1oxh47z0',
                redirect: 'hwwgtx47i2ag3uftduxmoghdhb2j3qxoo5ia5mhfp1afhwts0es1vlpue9g3yue9mc4q0rgb8jesqj8b1ddo9svp6ha3ct21q83ohlhzppmostmnfxyvfn8ztogy66y7gmmp6za51hejeczm4wrppbudd3gbz08j5xf7q0tuiufedwp4v9y2ug0fai92v69jg89lmwahmkua8l9ix6bqwzbt29yd5opp2hyrooxw1i471ykohff4whp2n88vww4lxft2lwgetntm2rzs70ee4611fu14umdc9q79av8nij8b2xf9cnw6t5ejj1bbz19n9ssj33hf1g3ee6rwm8q32h5n8pgttxge87jc9k5obphiggy5fi26tt6ffd5fwgyken4s67kagg7vv3j88c7irm1qqcqfbyp0yrmlpstf67xe4mkxxsrcbvk6c8en3ikqz46i9e88rh1mj5b66omqqpesk580xbtvpwr0ozul3kvey3o1805zzn0lav6z0xep6idyoviwrlmslyxf6acjluj7ox9wvjssib6t9wtuacdk6p9oe7i5ofuubzor750k4992d3eigbyukhqicggbckym0y593f60obp6fmlgjdnm4fi5n570tf6qypl7n0we7qjpthr6nb7ijee4a8bdo2e300dgb0f4c308ryr29x789egp4qh988xlar2y4bfblksoa6eupnrw8wjkmzcz5dc0gq4yn24qtcfe1yi22ullevn8lu2x543xw2o1e0125kvgundudwdgqoyg5vkkyz7ghgwgy3olox2xc508x7narsu801kn8z2s41hjzta23o50wk73xnfvvszc3etepc7ef519nav5pn4m587vtiet48tclt0vlxrydd212czyomyxcbos7bkpjtxh6ywl67tq3aey7acfekcunlpkodagap4kiq4k28luiiav0059379i168zgi0cxq7ksuwx7ijzdzsegziq4euufsszsiy9szqda24006go7mi1amqom7sxc71ldvip0l1pkxjpqopcwncgyxezfd57njq6h8utju0zrtjnpab5aul8ofzov6vko4z28rgk2c7pbmoxtzg03sgu9widbuz2wxktjrv41566z5z75oqnd6m5hogrbskwf81crtilye7ydqa5zhe80sx9yid3rqbupx7obk6nx33sc3dje55f3dj45y1lf9zqf68ulgkehtn50ldx2484ut75rp9172z9ig8bhkge9kfqlj1pbltqz4o9vumnc4ysb1pahqtfpp4g67ku03ono8tqqkc3oa0ls1uo7nl43y119c3rla85655030krkak5cnr9d0q24i2ho9a5e4jtnhyfknkerpz9nkvfqb4vpo276ghy1tsj378hkknj24oaj3ypac68nerm3ny9ongbq1uejvfxmsvs7nkhw997njzl4zz9k41k3t5f2s7js1nm68mwh3spuz1j9qgpvn4yupgqqra0xf6wmjy4g2ftq7grgw22bzgli830b5fdc0402wmnmvpflk6jsp8v56obh15fvxmd1g937fjlihap178andwbamupjafhkma3qjy6lkfsrs5um0zu6c6a028nkg4mtq9wmjbb856fmk46aq8la2j6syhm0pvbucxzrwo8mi5zlr7vdwre28ne2ysnjr57hof2x42qbu1nqbmkubnyth6rr6lsjoeghuo01fmch5tz0t3a0kwtrbdurjb40wsniht4conosd5g9pwr595y7i89w096qcwp3hbz0tva0q3qr7tkregnhv7atgqwlq48aulek5jyeb0xlvs1rgh1ri2jrmqhcvpw8sfnve4rvq6n4b30iuvqv3qhztocckqzfr49qnai0yu2cngbgefvv0b31kqygzfuxocra5qbj0tflyos42yfq8g70ovwz84za1mp2e6tpvvb1s4d1jg72t0t0ldnah62rpxbv8g0wynf0v8o1kzghgcovglm9d8vd2hp3db8qf4jl852p1dza577ni17cohmfah4',
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/credentials/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/credentials/paginate')
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

    test(`/REST:GET o-auth/credentials - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/credentials')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '7f7490e7-91c9-4571-8f7c-47f96ca47897'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/credentials`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/credentials')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'ac38dcea-3dd6-44e3-afb6-b7c211ac1a45'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ac38dcea-3dd6-44e3-afb6-b7c211ac1a45'));
    });

    test(`/REST:GET o-auth/credentials/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/credentials/0606b7c4-827b-4102-a91d-e55f5ea4f0b9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/credentials/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/credentials/ac38dcea-3dd6-44e3-afb6-b7c211ac1a45')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ac38dcea-3dd6-44e3-afb6-b7c211ac1a45'));
    });

    test(`/REST:GET o-auth/credentials`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/credentials')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/credentials - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/credentials')
            .set('Accept', 'application/json')
            .send({
                
                id: '4c03b6dc-db53-453d-b8de-9061a39e397c',
                grantType: 'CLIENT_CREDENTIALS',
                username: 'uescazgybweu1d75rtx29s7c6c59cst7jrs87dtrm9dj921w2vmk0ww6t4anfbddbmm8z43tx4y4kfatox6s60gvbrk7tw8920fddj3i7lxyjydtj1kk7m4xant9ithsg9t7d588uedzjqxaeuqx27nobs4arhowpqdn2to5bulzfihj2pcjm3s7u31a25roz1cyspdh7g7hwwx7yl19iw2nr6h8dmlnff4hycfmi22amlp8hyljbvb654nceou',
                password: 'uszbs9bnwhpzgxs4z1i72jzy61i6ycv2kmedsnmowwdfzw8jgx8wuh9b956osd8cbkrelkbj49y2qh5kpczzawdi0kk612c4l0x9ql6zn7i82t0u1wy9naa8t8xnni3zi8fb7q9f4mw6t3u1ia1puq8sp4if2l6yzwhetc4tj0nloifrszvxtxs2s48nw0jzr35kpzx3eo236kqm16qc1tlncitw6wulxq2wjwwsyv3nrsxc6khegwrbjhusjk1',
                accessTokenId: 'ef9e181d-8fe6-42ec-af9c-81d2c11687d6',
                refreshToken: 'Qui deleniti rerum et et molestiae dicta. Aut vero non eius quo eligendi dolor. Ipsa dolor voluptatem corrupti et dicta odio vel ut.',
                clientSecret: 'ic009crsrdurotnm7crfiw3bosupy90a4mgz2wb9qbcxygww53x0b8ig0bg93h83rjm8upkllbq594tvfiasuq2ehg',
                redirect: '0057z1ob26x92xymwb8wibepm17owkavjpzsncjxuguqrefp1z1p3y1lzcgqrr72suagoxjhri4dtaauu5hdmt9qpnygmkxqhaht72kcfzc0elm6er49cgz5jcs9y9obni6s2z8vaxe4nwx4yxocc8r67o9wc7x3d0my33z5ogp65r5q2b966wm13caij4hb5bhkb9vpmuzcp6pu15f5inp91ybyf73o22ip07psu8qv4q58t8hpa6seolwizdmtdgjax7el04h5ikj08rubgzpjzkkowp26so8xmfrwr3go6r6bmxcma9jzl4712cnfp8lknyxd45uelcdmns3x5ej7uq1a1vjwwaevs6pungqj6conh2plzzsk08n2t53bp1lv5dtpbkgfqkms3z40ntwjzsr42y7szhi2fxx2ivb7ekk9zghmrjcmswlrs7fxkvtwtt19jduiuyxcd4d75j6mr30hc9k2pqhjnq1zbm5x2me0u8z7t4kzpxf27bykgso4u5rje8un3588l6df40wfv9v06bb8xm33u187ifoklmpb98f4k0k7ornecl4q3j4u7zqx60jxzkal06mhvtp6paprfs35dq4jzvbwwagplkhdms1c3b1cjwah8ghq6czf4pq4kkklit4t5navji13xqiezsrh16083kaq5t810u7zvi2i5v2tjy1xv1yjgkwya1v4s4b8qzafkybn015kxsil8xti0zfmhv0t77k00i3her6lmfh5y9ezrgp0eepv630dm67kymfskoyoirp4uc64tfl65hp68f5wn0lpfvxk8ioaoqzzzt3l4x6mwcgwj74nphbc3i5c53m7dydepcmrhms720z6wa0zp2o0wbniupxi9m6oitmxb2kiym9wtu6ul8qss873hfe0cibetxjt4bhqla2zuwbgmzo49se5erthn69h4ziia84u1q91f435fmy4i77oi4sflpoe87istqb3gzlsrpuztqgx1b3vmsqbmgt3khkizklminjjuj7butmae2x2czqkx7gw8y8r566xd8bamcuo7ws6etedaeeljdnr0e0m1qr8ld88untw2qalqwpjxln28g90ru83xpmb02xms2l6787dp79niz05fg2eynm5l6sxwd2x7gbzsajrlb8omyyw1pp7dwhlozn18dy3re4dufsfjyph415qsvqno0osn3v0y1fyjppbygur5atecay1b1m83sevmwbn20at1dsu9hgwx33qxv5tis26xzvb17dyfgnmd3hoi36xo7miw0bn5a2r18sh9j503vdgx9slteshfe0pa1d888bie5numda6kun58kkpfvos6qu9ev9xpd3knarju9p2pg99iujwqxjwqdcevz2ecubj7arqof1i0pxqjqqqi5kfxljdydbtx6d5dcpjg9tzehzcad59yezyncwr4nqriwq790owdqc21wi8o5me9ovgyej7ujcpj41ky7awtyajz34sh6pg2k11dhs043i807bz1rdphlp3r6uvevhcs0j0xo7q53buzxv248y6xc9rdimux1fviesn9k4qt5rvepacqq2tbo7aaxsc0o23keo4pbr0uxrig10japz2md3dbj0v1c4tf24wpxp8dtq9el2cb0kymnkpq5xpe16bqag4g55xujlvvco34cdd2nbs8sdtunk1dus2chbz5gicb7n0avpal0rsl2zwiovfc6wxk1d5dv4q8gv8dsjfqf5pgzsuwz1zvhxxnq9ldqt2dsg640maocbqitonk2obn33uw0c9mn0j7csleyom45wwix4du34t2iti5eabi4agsj7xmz8w92ib7cczabf0at9zrjhpt4fqva9ylnyl3vil9h87toae7lqtahjnybt3dvr5d6ulgifq7ku7ouv1nrqlrzlkgkam1tkv1twp8aonek9pjlspt4j56hic1ak11vlnze8y9f4am52n1hn1b2qhgiixwpot5drxohrajur67gvbgs5xshx6o3qy00va186ai23w8eb5',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/credentials`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/credentials')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ac38dcea-3dd6-44e3-afb6-b7c211ac1a45',
                grantType: 'CLIENT_CREDENTIALS',
                username: 'fkm35pcrcbdmi5wt1uzk00xfc01r3z4siecdufuuh6gxddc5m517wjahs4keijti32u3tb5vdkxmiqonu7ve81zgviwr470vb4pram73q3si25nd17pnleh27axmj1g38q63f96vrrq4u4o65w9luu4l8k9p7q2rdfu1etd2pm2yq6n6pd8wwpzr4ko78g7umqdx2pk0xx7nyc9rv6bdd8u5xmbrtbdtk9ixuk20gb9qgxkagzpeoei7e9950gf',
                password: 'rr1pg6zp3y6woe3askryloetg3ajfoivbrmd10vpjpqjaa1sr5odub5kvv1v52w0cf9w18cqofa2ui94613zsapoaqzo1ec19xuse3m7ocbbrd963aswmb1h19pmn61tweh0zrilaur3a52hq96cjodq0zvm4z0vh47fiowbrrm4bgl6uydxsup4ociqs0fvvv8vjm5c9cwm6ak6eomua3s9kkxje67p226mg854aopvkfec4djx1cpz34ft4yd',
                accessTokenId: '5a153826-d7af-4868-9bcd-6fabdeea9c53',
                refreshToken: 'Aut nemo earum voluptate saepe consequatur. Ipsam hic quia consequatur fuga iste accusamus. Sint quia cum dolorem culpa tempora voluptate voluptates aut placeat. Quod omnis delectus beatae doloremque nemo qui hic nesciunt necessitatibus. Qui voluptatem eum culpa unde reiciendis sint.',
                clientSecret: 'ubfnblyzy4zeoqu1szkwrnqsf2y69r3ezoxozw1y0801lqx43dhy4hb7kcbgjnfxmv0ssmqn36p0azzxe0fd8xhho7',
                redirect: 'ymm5x0n7agf1lk11c1cj62xjcmmy854npfc6ka2kebj5vs0gtu7b0ysyv9tpb6mguvc9k22ko6dfk45uxfca21jbr3h44vavg8nrd573ekd9v1h7fxeggxgwlq43d7szi460y5dfm0ccqjbmtpmzw6uut7heff8c5947obqnsn1xcq2fjf31tmt9sfjspqfycesj9v0h22n4uba0maqc5if688ie675vpr4w8wmhbju8h729fo41pq01hh4f8q7s2na2j3j94hk3lws36nh7fmmgywx2uompf4rtedv8fzqlhzlr3r8i5lp69mm57b2532rbu7tp4rn6bz8ol3o7u0klrecibcozvw4m54gmnkfo3zmb25tyrqny00vti2oxp0e5cg58fji6ognj58l6qo4ohvhuautcwhdjhvxxtsxj79ia8q624ew1ckd3nbhnbt4ukhv1v4hpgfvgd2meaok0d6dg4d6krvjmn0u9uj628kljhqh3028diml6n1nm545hb2sdfs8pvgmvmg33cu5kjz5clafd50cypyc7e33basvgwa0qxjk6z2sm7yc9w4ljwqt5x4mugpqgvv1ynlr4l4z28r6z9m2xlu4hzdqqs249fel0qt5wszdq39rndzeco942ccuu34nx7da5jbb908ptqoii8u0vdfv3pq4kpxwk7z4rgh6klz15eyx0v8lt0d5mr1cll0znq3pymlt9ys29qap49nfdos0kmv9ensliz71gq2zlkyh0iaq6rexv7jlgxw3m3vzwy1vdg99g0utpj1l21w1kfnhtkcalxq0txqbizhfh52eshu5dcudsmosknwy2ibb02572a1g5p0bsv020lj6w0guwzx0b6vkxzzdm2jcbvg25d4963lx1k7sjcyw30cay7cu5bgyc3j3nbt95s7ziwmvasyx126n6ydq7wnler9rvqo2oq58u8iz9axenhestex9f22fy5rv7oczaasma4h7jiudgmgph1y482houq0cwsg56htrfk06v2yeei35hva2kb1dx4t3pwkkw9zmhvmnfxrh59ak1hx7wsf2mo66ggyfpgc0g4xc0t1z15455ib5y3hh5apzcids2z8t000ecj6n31ev7jzndwfycef27wnc5a3rv5a9ee099guohwn401zl4lxixdviqyfujv9ts30h4bbceftv14jr3ha6pn76x6u6yv3kikeg136pn0nwt9yempynj12a618psaygk14hajfdj8n5erv93l36lzsdh02xdu25fgh1lulak6mj6qs4y071wogd1ebnhefubborae8xc3m4dkp4r79jnbvvygka7xv36fq5eci9he5yx9izvre1so31ajr8x48lzq67nuiyuojsipe7gx1dx27mjoic0ny2ve0x99pbw0pwo44duq77loyr4chpnw8iep72ooks90rnx8pp2tgpips4c869cm9y6jrshx0mszda1lwlh0qi2em8fxd96rlkvasd2lk6xnbcag1vs66dvszbpe1phkdrypjfkhvs7a2t6t3l680unzi2xipc2kqx8xmte40p0lmiwmkl5zhmx3kyi4ofazyltntq2ocb3mkgb4zsgl8ipkjh8wjenhljtps4afxs911z4m08xhph2nhp35c6tgomv837u2nqktmrjmhn2vpl2phjf22xaj6813sji3zkggoy4vtlq33b36bmgpzcdj0x0osfu001rkqltg4lr0ipksc9ijyinavk40f5ixv7vef99q1kkjbvxerve7r0kx0bd19mmi155ps9cde1gwu0jou17h7sn8m9w26dhz8mqa6weftovs2l9ftk4enziu4pi5pxypxuredbk7im0todtjocj57v7fg94obxffrnexbl9ha7xn4fdd0h9sxs4kdavklex5su45ty0pyvnac8q0abkssysjaf9spyhh1obbfidv95t94x26giya1638pamyawndo0ylpadt9qu8vgv9fgoyuep7gbsnehy6a83lh91donkr1a087i1',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ac38dcea-3dd6-44e3-afb6-b7c211ac1a45'));
    });

    test(`/REST:DELETE o-auth/credentials/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/credentials/4f0cbdc6-fddd-411a-8634-797395070c85')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/credentials/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/credentials/ac38dcea-3dd6-44e3-afb6-b7c211ac1a45')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateCredentials - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateCredentialsInput!)
                    {
                        oAuthCreateCredentials (payload:$payload)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
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

    test(`/GraphQL oAuthCreateCredentials`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateCredentialsInput!)
                    {
                        oAuthCreateCredentials (payload:$payload)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'f3567b11-d988-4b73-9d30-febcfcee821f',
                        grantType: 'AUTHORIZATON_CODE',
                        username: 'irffg85x01b43mo1g5zzdt2yoqa8u3h4qj2tzkccauspfqjen2wxg8y52j4ede90f4o377ncb4wzfkj1hlm7j3ddhf1rv5t7vcrs1i9cxr9hvhmdtiej7hg2g1twjh9ilk47qg5gv7r55i74zc98sfysp05v1lv2nys8g9iqi3qbv9oemzgcs510qg5gv8gibkbqbvcgpr7l81a8iq515oibnjb96ehpjdy7adyp0fhs1f00684301571pdww2o',
                        password: 'm5kpk1ks6b8iaq6h47yc4hwqd3wlm7asbg2il1vzjbb2gztnt4r3wn3vkzeqinmm2cxns4cv0ixueptujstyjih95vw6p5iehs5wzwh7a2z9e98z4xabo2ftv4lwvaxfzlq6o5i3cx28snr1gwm8slp61f0orhwtuownxttn7bkgnraqzmhsxtefhatmj91h2709ye1ospnlwp8olodchmu593rpsztaf18k6shzkkjnfma8w8dx08nv3p45380',
                        accessTokenId: '5a153826-d7af-4868-9bcd-6fabdeea9c53',
                        refreshToken: 'Adipisci distinctio non occaecati aut non et. Nostrum sunt quia aspernatur quod inventore earum consectetur. Labore commodi et nihil.',
                        clientSecret: '2eatvza16smx06jv4cbd1g7mgdulm3w0ia8autmkvgboms0qgrmr7ma74dkke0msrglmoopzjip67lz0wqcedcp5wi',
                        redirect: '9w5twiklxkd0dd7bwxfnnx40kmllfuks1udqzi2zvje7w6vtb48u645jt1wn7i3yb3u5682gbn1alf2weizlzev7or3ydi6k4xl2iso00fr8b7yjw759arj1bzm9fucb04tmcqp9un8pbg74x1odbu0ucw9yirjdt5whv4t779vaobbl2o4h0eqkwkkz2yvty9nlpuipok6p20aar3l2c0ipgzqin6y8gqu6ta3hcp35iunjhmbcot88djgo499xkvl4nd44aactw1gza70pa1psx7shbm0q9ti8ygl2oig36fajejuec8w9jp2cy6lat5z0hpxrhm4gb8yw65ar06eh13n6v755m8pux8yanvp1pt04et1s24qrwvgaps7ohuee65wj0pxjtbrfl0223hmhs8cfj6b8aj4pzrr8soskq0ao37skz87np7t3j2e3826ls50shorlslp1nvnpbji6eb3mexvlg97qp2eetpe8wuzd7ya0aj56tcuzzx2wxbuh89kf0667ds2d595e6vapvlkck1506kzn3vyq28nd0vhawt3s5x5larvoutk1by1thcq2fctsfn4ouxq5ucvu7ass3k3x3q1kqn33odw65yl50qcxxx760ag2piztdhspj6wmsgyeaezyrqocf1f2yjkbe1ykqfr7ka01m37hmy2v3smnjcpuxyvav65ntrh29hd09q9l355m0zk37g7tyoal4momwau3erazdh47t24sol117edono0sgvzg0ptgqsaebu7s63evthez087tvq1wvm3tvtl75zelpz3nd85crkljateca4s3liocpcuhzg90f6w27f2882uiql2al286t974czsugnfe1n2wdlo3dxs1xdwu2ryudl5uwtslci5r8icrsqhfvwxaxllzcile7t5ao0xin2eypba0gx8g0czwp1cvtisrvuhq9hwvbduzqk33g30yf61c9cwbuyuotyyc95ol41dhfbo0sd8e2vex7qj7e1mjfza376owht9e6h3blxyz297f97cxpw6ozp167ngqjvxtmpul9bpbhqguybw9laer3zqh4d9zffbcyec52p43e3cdz48ghxk87q18zwu3vefkjhlae1cgf1xwkgbsmpnxfbcth1rrzazz5k9d5ygwub4oat4us4p7sbrqjo96x6elbns3fe8kcsxwfvl4u1xlhixzms3a98nmrfgsq3e4vltmozu57juq876xx642f6y3qcyefo4kjx0aguh6x2sshi7fz78s2aa3zgoia6jf8pvz33iq04vatb7ju7wjn6ttbnu0joylmdxr5py5pjqblwk93pz6ob8feogkrzbcc3zkma9yen1n9ctxrz8o6w7om0j1b6aqj90a97y0n5y971zd7zrhywgc3z4fo85b4rpcz2a1njcjz9w6pqn778pcamfrnvuhyhq47z3yh0don40pceemxjtpkm43uiijvjy3cd860dvvwo9x8et6ep1nymo87aadmbty3ex23t1v6goiya3u9njiu87jqvxlo3rmjhc1plbotm89mse5vqec8fdnhocsn8dsn27gtz21ks75zxo4jx2rf2env3zipoviqwdx3rckc62jhz595ys6ilgmsi57a3fnyaydv7sbrc0tnaez4wsfg8tb4h3juww8z2v3t2iz3n1ibc7ew1pzu9jr6ors6rf9wk5qpwp7ohich4onex0gjd40tum5xu6g8wb2dmwnwpwpez6897cm96ka0exkbhhlqrqhd7m9koskrqw55spclt0xb7ltllnjk7l1zqpbeo7chdqc9vboa8x81wy06paqau9hyziwvmoyeel66bfuw337tlxvto3khnffa3lgo9lgk6d83sp37dryb19b77hzql1amrlb0pp6pt9c3lealy9275wd98j2d5fbpdcpxaggf35ksk39f63jaq97bq5bmam8kod9hs9q1gdwqcrj0kvqv2wwrg02o866857b4k5ajigawa6y45xziu3p6e6c6qv7y2ud2jzn',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateCredentials).toHaveProperty('id', 'f3567b11-d988-4b73-9d30-febcfcee821f');
            });
    });

    test(`/GraphQL oAuthPaginateCredentials`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateCredentials (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateCredentials.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateCredentials.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateCredentials.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindCredentials - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindCredentials (query:$query)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'a8171d60-bcc0-4634-ba4c-c7a67c4a109a'
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

    test(`/GraphQL oAuthFindCredentials`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindCredentials (query:$query)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'ac38dcea-3dd6-44e3-afb6-b7c211ac1a45'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindCredentials.id).toStrictEqual('ac38dcea-3dd6-44e3-afb6-b7c211ac1a45');
            });
    });

    test(`/GraphQL oAuthFindCredentialsById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindCredentialsById (id:$id)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: {
                    id: '6c8360c6-fefe-45ce-a9d4-6e2cf7c980e0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindCredentialsById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindCredentialsById (id:$id)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: {
                    id: 'ac38dcea-3dd6-44e3-afb6-b7c211ac1a45'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindCredentialsById.id).toStrictEqual('ac38dcea-3dd6-44e3-afb6-b7c211ac1a45');
            });
    });

    test(`/GraphQL oAuthGetCredentials`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetCredentials (query:$query)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.oAuthGetCredentials.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateCredentials - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateCredentialsInput!)
                    {
                        oAuthUpdateCredentials (payload:$payload)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '138dab66-f3c2-4ca1-af29-efc18bd8801c',
                        grantType: 'CLIENT_CREDENTIALS',
                        username: 'x5g5arlabbzdfiz755m6uyv1qeq2nfg79w8uxf3mpuh6lszy0nckj1j4x76xfhdvexclp3f621z9a0sx2o4qkteae0bg278finyghxmx8h94e41k7uq3ftdzymptrjt9eh001x283nkrxcjijmghy4pkpla5l9m709zrb24xh9mjqnpdo56ozbwcy09b9pmim1n8xcltcrsr184b3zs4yzhrufuo4zrgzu08g79sglw7e2n9rgu2fa8xehwiovk',
                        password: '5gu1r756t47x1xarz6zklilio8j2ijzm08ijphwj6div3e88tsgyhqaimpb3yjs1wyuc3iygnrik08d9q6trvpsuqyogti554xbx1vgbxg2x9hwkez2meyme0jppjkgpf412ninpjtlrdj3omi4o0gpl9jt0xshm24j2yiqszjiipauisxktsr0y0zqhl9iuwf2zu1vp73rq2ty2vkz5d1q3v4n2g6rv733bisvgj82hjc633hvqpckgtg50q07',
                        accessTokenId: 'ace113e3-5b64-4898-82c7-9d9f8b025e67',
                        refreshToken: 'Maxime optio atque necessitatibus qui corporis rerum placeat esse. Ut cumque consectetur eos qui maiores eum. Ullam laborum nemo ut facilis aut quia. Eum repudiandae eos aut eveniet. Sit voluptatibus quasi. Facere ut sed ea soluta.',
                        clientSecret: 'i303t5b5ib2unkxmo2c1fx266f2ckjvsm0ixdtt20pzd7qk2riridn2vnx0d0ikviv8xx1pf1b0p39vl7h061vmqaf',
                        redirect: 'y5gdjs69bxtpdjh3vtbbvrg94d0fumlrh7p0mdlmgaukr94vyradf9cbeaf0frmuv3y1pmlvfemy5psjjhwaq1f6wm2kui7tigggc6asq6ntvfsdb5h06erb33eaqtojgim69ofp7bjshdyl42dvky9qxt46ueyumz8pqsyk70iq5k25j89213wfghq7ssn0p363e26o5v4rd2zlp3bbk8fa5rqbh1qkcsna5g72nb5oj6h92jmn3mwz0blo6ic3bnltif2svwjr3jjvcv2r47q5qf761hjhf3f2qgm59ikqhbn4l8zyg7j2hcqulsota6rkd8dip7c5lnm6c10b70be5br12mrwh2wab1qvqsatpx3ezuecmfcoup7rxpwr1qi667zpqq2u02ti7c7yn4y7l268y9onnppxc7txldal6cdcru0avpbwvvhxcy47ubuu5mgtscu5q4uxzlja6t9806rb2lat9dxj604d1d4ldqw3udzxgr0g26z5y8hlg5d5t087rli6f5honjpjt7dzfbd3p46bqcj007aev7u7fsuz7jdew3z977yhk830672wm0dgu50oln9cleakts3sbafz5kdix14psu1h7cet3unzuy14h9x8nrs9m1j62c88ydho82u8kbpfidali0rx3nvu4mf27hkvdv6hjeymbbsjswrrdt9l8czidwbmm4n3tami42jhptdigcpbwj4sbqvwzzmn1bceadp366m5biqnmfzti3qq17rrwn50duqo41ansq6d6a2a1wittid1xd2hv1gedgn4irypq3y88mt19qpqph8kxgzq7pxj92m2opp7vmgjjn53rfjgl0ad5u74gr75qjpp4rnf9pboxneg8jiy7x5dc4lofn9os0o7nzo4clqi7pl7jqec58s127kw9c1kg4i8phpphhpv087dnkal4ennvdqkcvhodswcpb7nz95mmw13qtuapq3vhdfzg24abk0ylwz38ty6ucvqodqw557mtgqy1vcj3quam3qz1fdqxfqrzbsfatzojkrn4fo6k0dpd55jxj5a0dwsqbbkeh8niyttsiazzxhigpk3hhc02ikwi32fslclt5rg3kfmboy12exehlv25d03717ocsfx6c7hnr8iiaid9djffvv0pzax19hzik63sbzdpmzq2belrddqvsg3e77d0cna5uw6gnjq7bum2todbrizq4fr3h2v53fl9icidyy3qsxp37nt6f4bb0828qqb3cnpe0ftwlsczyvvq2x1yav4mk3mk093jlflvv14jx2y45gkg574dastd96dab74fv9btt4q1sisvooae4h9d4o6o2ut00satpd4okps6qkv0r4heoe2xqt8xubsgg9iwktc0n1sirotqzk2p3t9zr1umjiksuj7wk5wxyvdjkulrhtymqyorq903asgl8b23xpwvg5givqanlr92lhr7v4s0oxxs9m6dpwp8jgmn393pd5g2lpysik7phlw17s4pykdvslvzet7dbempxepbm1eblv9yedscd3gb8tzl1q6r64j16z0l0sp74eoyff1xdcnvjktbqy8cya3w7k77il5zcbijgb1bn0vpw39bd53y2zd0jdqunha61izw7wafxz8lz7tm451rqfrxthm85k0kl30paphkuuwlykdpj3te2lj51oquyr3371lyy8cnllugqyk0gn73vp2jwqdlzhawmlbhmz1zjrn2ozepu4clnujaotmwvm1kgrs6rpl3d14ent1rzrga5ao4uq7lstzk1enpiu7v34q2kcbpqhswguxknzs3j31su4k4bif4ftmczkstempc7ciw0wpiirq18axzed7340aj562zyzl8nfb5n7488sewwwxfng2m5aq35yk1xbe9mispljio27xzagjlj85q1e3ruc26oslzxtlajgbgld5p6bl1crfba6mt78brok41m8db1rot64hn09nniqorw0ac8knrky1ns1bmiaxmg33damwq10rvicujoqb96np19j9',
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

    test(`/GraphQL oAuthUpdateCredentials`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateCredentialsInput!)
                    {
                        oAuthUpdateCredentials (payload:$payload)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'ac38dcea-3dd6-44e3-afb6-b7c211ac1a45',
                        grantType: 'AUTHORIZATON_CODE',
                        username: '7lvrk3h0wwyplte62f5np2t31kuek5ohhvkqo2jmcoxlsjasexcjdc4lhfen51fxrfldol7d3ppks43k15pvs3fuw3cps0n0o9iefosyqkohoo56o425xpzzegi76q3t8wdmn7me1ia72bikjbnn4mm6x9uny9zzgc8l05t6tq4jzm0lx2akskrqq46ysok4rv3z3749lasvew08ahr51m3asunxef99zqzq25fcrfpt10tfe244m8g0q9lkgwo',
                        password: 'xlwkx7yay4zlx4udvkssrhphsfhkke9qj9eqmvncjobwoxe45vg4rs2updfc1l5m6qkd58x0a5l3hgtw8l8397wa7q0bzjsthbiblvy2tc5satepjvde67fzlgqt8u6uwvkwhiu8yje1g5wqbadt1e5jl3uj7f6791o2jiy28m5y8cpzuk5eq4sq85dpwzgq7bm261tijwaojtgvjtl1dxlv0shh71nqje8smhjr60i7hkwayj220rjas2d0mba',
                        accessTokenId: '5a153826-d7af-4868-9bcd-6fabdeea9c53',
                        refreshToken: 'Laborum recusandae reiciendis autem temporibus aliquid odit quod. Sequi maxime reprehenderit ipsum. Et recusandae animi eveniet voluptatem hic. Veniam aliquam consequatur est quae corrupti ratione fugiat laudantium minima. Vitae nulla qui rem aperiam sit.',
                        clientSecret: 'no7q4patxy6yhoci4llx1ftz1qgf02397k6k3kg1xgvkl97ozl24c9lzrspkuu8qjriva4ll340qsaeiug3bsgk1tl',
                        redirect: 'q3a0ukbyu48zht5x8puthc5hqomdb00jrtqlp0iwoyrzuuk74p8go3lcd89be03t4h4lwc3yd79iqxtm9wyp2caoz9vy936md7fhzec7lqntd17edqo3witqa9wylmccdl2scb2rgnosnmdp0niu0uq1q11v4icwrwyq22wnn9u9s79n0old372my678p1h497wgt6js0raw8hwmfzgog3rvkelnri4thc4uc586h7qn1w0js08r6bvaebex31dwtvu7oe33p597u7l1rv6cxphqe25nnrchlduj2ydfp94qgdptebiodoglvadzbckv3546m9vwr34q9j4619tnvh9siwa9poyb3864b6byxxntkh0manreevc45fd5bwigv7y0vi1fxkobg2t45rxdc3gt68298lh38vb5px358xhzjcrxxb3re29a3im55sz65rtiazkq7qljuw0ferb9kthhqv2imdq1t0p5v3abpcbz8r5p7zd3pxlnl0t56mhyqijmm68cufvyzda4zv9ep9s2bpck1m9mnlhbhmdpbe427nl7pljy0lzotwi7p0t1t38mwehmgrh28j5v44qn7c8zapbve5tcg47yeioj1lzrmu6ir7sepr9s79so0xexs99t9wemmza3qryanqz0qd4g6psuf2in8y86l0p75togunl6ysxjm8tuce599tnwz65tanfiendpwlj4d7o7z1p9q1l3ebmo7etw8xhd1h7tssb3fkgrs3lh2wqvtox6qk68s50kja2tbmjdbzimvux7dxwxkqja1qsvewwf6lbbfggh4ec6gpw9evr0kt2esoti9ajb811fuxzbemgdr27l4lkw8b9302r2vwnk26nc3wo1zl91s5syua7at7jtbdx4s465ym28i3f213khfer9flpf258sibzbcplxsrdn5kkxuu8fpvs5c4ma9kwcrtqoi1cv0pv8g075ox5q1x9f8alvzf6dp740kgya43jhu9hk3ji4ipikeempciskhbbnev66738ad93snqssq3mbbcdg5wi0ivyt5ne3bod90ff370flom0j7rgpy7qybr7f0t1pn3nyi4wenwua97rfqqpkmbirl3a6y85oc1ftca7hzfdoe8r47xfgf6geoflc2lsdnfaixsfgexflijmylwuneabil9nr0m8i02fsn69cimk8w00aqgaccdo2vpsxn9dm0dtveyiyn4g64ga7cf4p6drl5sqf9038o7m2ix8dxluj4ga6upd906z6h4gtbfza18nhux4aodhelum7p7f3zcs7p96fsairbhpdyg10ysmte1shs34xl7i0gmcd2smixft1q5ew7y7iwsng4d8dzypjiwe3ndhw3w9kv288q2g0pglocjggr3xiqsfcq9rwkqs44cjpk6km658auutkve1gwumg9nr1quiofaldu04bfjkihzq1weka5jhuufs9ppx51na8vgf27fa2il2q3tjmggzrjst37yyvbtxiqwu8qln9oficy8flj4eeymgo5c9qoqwt2bkqkshyrngaogolv9ecg5p3xt6r8f57s1xfu5s1y6al7ed8mspmbwsv1ijir21fm4ifui4z18sf638o8nk0x522qmvwcg99iy4fl88wowml2jhvcy2ffc9dg650dq7n01x1cd7cuzpzqxmev73hpg701fnhsyoujb6qbqiybotbv3gtsbukq5rg964n226gsbrdx4o64wj8y3uy9env54kq4pb688uspnqlmmcbl9959p90njanwj3da0e9qpg56cuigc6vybfauvuc6wovd3ckyb03fnr513neujnr4r0wtnia6m81pmm2xnnnsmqif4tlctsaiqd6y0b3mkd5432a16nel7br25urpdikiaw06xvdq90jhlpjlsalxv1ejj0rndvji6ey6dy4v1xmp1f3jk4jn7ktobf7j8eupdyqsd8s627ck7ysomg1gxsakew19184mhrebte4avzf4pfooko8qs0v0giphlrftzp5csk5',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateCredentials.id).toStrictEqual('ac38dcea-3dd6-44e3-afb6-b7c211ac1a45');
            });
    });

    test(`/GraphQL oAuthDeleteCredentialsById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteCredentialsById (id:$id)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: {
                    id: 'cafac6c9-5fbd-45e9-b675-5747d10828b7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteCredentialsById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteCredentialsById (id:$id)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: {
                    id: 'ac38dcea-3dd6-44e3-afb6-b7c211ac1a45'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteCredentialsById.id).toStrictEqual('ac38dcea-3dd6-44e3-afb6-b7c211ac1a45');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});