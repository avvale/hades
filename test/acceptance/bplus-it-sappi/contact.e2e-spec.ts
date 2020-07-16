import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IContactRepository } from '@hades/bplus-it-sappi/contact/domain/contact.repository';
import { MockContactRepository } from '@hades/bplus-it-sappi/contact/infrastructure/mock/mock-contact.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

describe('contact', () => 
{
    let app: INestApplication;
    let repository: MockContactRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
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
            .overrideProvider(IContactRepository)
            .useClass(MockContactRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockContactRepository>module.get<IContactRepository>(IContactRepository);

        await app.init();
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: '1z9bj49k2c0kcxrrgv5s',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: 'lnye29sqn497y3d4scraa0wf2ln3m5jexw8lg3bnhx6hbz9qb6twn93xldkyk0loy4rrhzwbkgd89kymuuret5xemyx0dszhmmztsgpqbu15ch53m15cililvcc6s37cmsjuogsyc6xfh07vhj8oj9p4eu2ggoqd6lhllir0cupwzjbwj3am2pd98jk99zar1c9chkz6uzsn5b5yd65hxlfnd5deee95b925xl2osps4bgbyoc0vdla4o8vu82g',
                name: 'gmf1fll4yyh8i3bww093nqw80zc0eia1hynpdzkp5bqm54koc4zrbx3mullbknh3l95bz7hojfx9qt73qfuvu07gpqy8krkbp5hhjxhdizky8i97tkm2sact2rqrnur6etqbw7wvxi3f9cc6l2d3k4fn081ttuqj7l80yh0cgy4j3ab8vgascigbbanyr2xd7leecfm3vkp8ceeitp8fpy89l3xc5c7svsfhb54vamn887pz8ptfuui0al3n11e',
                surname: '7g73qc3sdm9ksqh466p0bralctv875bd2aismrqymlo7xarf8s22s8jp3ne6i8tasn3105kk0acabw4hat4d0ez54t7g23ah0uit34wxudf0xowbcqps7p3iv2uzc9ukj3q6gvcc84yj1x7bhx8fp02u16p4ovulz0ubsyve6tamhtmqymqnq86q8wclbfp6y28uruigsezzn9e7b0ny75xmxamiym3nllikre1ko7pz7yofqyw8e03l4668wid',
                email: 'lnkch40t4ykku6ewkbojmmy86fguwatuzd7c71tiiabeoawf4urxbd5t61d0tuxjj3e95c5ksc57xpalw8ty5zdge5vvjt9axwtpcv9i8boxanozniw6i5uv',
                mobile: 'axbd37nqsiuj8csaqt2ozq5wcw19bof24g762h4vijaai2cv1evpjja6ald9',
                area: '3wwcwxjp31ri0s0nwiucxnuj7oxv7zcyjzzu345ey0qd7oy86a3asya8jkxxx1ovwzxez0ws7wipv9pyzkhdj62vyrkrf7lsvktloe26d2lsizevn0sylf4c44hgyinlw0xs7yh60rzjp4ka9i7oszpntw6i4daqjps9w1utl56d1vjygzyfw495lysjyf9w0s0pujhkwbpyulupyor084bnyysdg13fuwhasnir5cn7n1m9jt547x2wibljwyz',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: '36dtnsrvtxvlczn1ppum',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: 'yyp6tuycvvh17vn52g9qc2ov1tblaqrz48w3hplnbfjcvruv3bs7tcc7t6n7aw949toagb5z8h1x7t2wwd3vowwoxdmy9m4yen7s1jp9z7kc2qlb8lizhtnv206sx8tbmzg48oea8y9z4o9bnwiwzy2behmljlbtwut0rzmc3ixhcla1rasoitaznqto36l421t7nh71pukh2bszmtxrkyutcp6xsdp6ginpuremtbwnn439qls6u35hojhpzlt',
                name: 'j6nzhdobzkmwwuc3gzadtdnsntuh17infxk8nmzyypo3xe1re1lydb2f23rn2fk3ebkkjjj3czp7cbzn20lkwdwxlmllb4mw854xwycupgrk653z1vz7f855dku3rrcd29v3qe14jtzzhg9w20tut1krwfrommdukq2uvqlcuep2tw6tvf9vxai8yrc42sngj2cdk68hpzwx698t89wnkv1clh3ocsg4got38f8hiz3tspdlt3lnagjx7dbj0sx',
                surname: 'zw5u9a6maw20d2dbwoyjppoeg0gog9pf457wo17cfqarvs0dmio48epnaud85ur4r1qaw3qsz9ydzh1l538sfxqo5lo1ffogv3qzpxggzxc75v99j7bjh8c26l1d4sb565iw0pzqdq4np1jhyok30b66uh58mkus5k03t7bd239twfbk34lennmllhf5y601qfuleiebus5hdybxuqp0u3efebht3ipx58dcd9a2ajlaepyqil1qrf1crndwl6i',
                email: 'j6djci0mujcrf784ie49w3nolrujnlykk3ff4ym5zg6pxgbo8lbix60zuitm5rg90k1bw4w6bhzgwmccexamzxr1w7fvhz487su8l04w4c8yddczqt0j0dmi',
                mobile: 'rsx91z7fi7c9e2rm5dh6jvqcp2p916ln1b6smp799m3o3dxstq45uwopvzkc',
                area: '9jc4hzfw7fm57qkdrr38ui0o3pi4zdh0543jekrs6dffi39zneo9skxoaqwkmmtj029z1ek7zcygozbhw2hxoppwqhyxfbx6hdy2rbxa4pbnuiw245ddjwn7nm0vx2fvman6c84m97yldar6h8v26jb88hoq2wupde7x49chfj7a47x2z45s5chpuad1mxb8jv67tmyxcx446r4o9ygpc4abf7oijzc2k23ppho41ylkhe7dgokdjgedlc5v0qh',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: null,
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: 'nrp9p2oloonau1wu4nx6',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: 'lix9pur34lswz17arb9j9te6fo78cad21jqcc39uxszz4dxyzgfwil8s54l35esqt5bf18jmhlktxu38ump0wt0t73qucimn1v54e62ye2s4pze9634x84zn9vl560v2ezdlze8549vlo6cq4f418xtadru1hr0lqtlwuyla6gbl9kuwg6qm2ir5tsyufu4bn4bs4c0sqyo6gc2t6gi4152mef6h0pucw77i7v5xh27xfbvszjeie662msabn3s',
                name: 'ms3mu2zxpuxxg8xmxh8vuivmzah7ae7uyak46evdfu4oy2f3w1mjqpwmvdvrbz9ojr7glrpaqazvgqblht74am1cngw07xbl22efllb5hnee5v1jycvr4ekhy63cylp2xnuxnsi9ib0xq2ycojlan2cygfj9ma2azu1aomb7hsz7telnalbyiiddgb0cos5mdtftok3lgjgqmhdetpkk23jvi0yzr6r72mnwozh4z9vgv0b2d7jxnulvl9bnttg',
                surname: 'yrlo9iljvq8b51u6px8fs0udlphlhmi3eqrifk7t0r5qackubjf4ofre8s6gv94l0sik10gol8fcw2i1eglow9lm0pzbqkrv3nx9o1kocnbp0rk2pn0urzb7lj62deo7eow9oc9vq32kkduhkh7gq789mwx8as1ciq3f0tstp9mjdp0nqpd773hyeyx0qx9is0u8bac28b00y96dscdotfpu635jxq5lzdexjsdv9gjdd311qton3bm0kytpl5d',
                email: 'dl5ep8tcq4jypuiyemwxaog6q7mbwt41bkc0ov56py2pu24tz2afh119q9aphl8x7i4218y9v1n5ebhjtwhjihyn34uhlezuimv01vow71a5fztb3izgvoa0',
                mobile: 'io1g5ea3crpawtjkzrhmvawqzt38by7iuj1qujx5kqp9i5xq9wgy5c5dwlqc',
                area: 'dqbdg19zbr16u24a6ey5t9t8n8krbdhuh5j49v9id9eb2odhh203iy36rkkr31o7qz7mqmb2thrb2ynu08xvdfg00t72vw5bqyqewq217f61qgx2yrk9egdni11dt3768w4ur39opc08ip4gx5cv0s8ueg6yvo6ubbsuqlty2yk9qmsidelwyd4e125gojfjkc7aso4fjukzypxhskjv0amu1mm1nqxh64imc5xerauf278xn9ktgm52kkr7wqd',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: 'tk4cbipjtpss4zkpy59u',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: 'xeq7uvrwt5e7og6tdaomj0xyuyebocmm6hweutf636miee24gr3182n6pskomcakiuijdxaxsn7p8mdr9o08axpm5e6c7hgu352asapdx5zf10bq8kj30b260sr3rtpfuu7tohntmdfynl2y93ajy66tte6pz8tjs5vgc37kuj4ku8lrvscvr3epvu82nc6lmiacuup6q2u5cbq0743skz822lgv1cm2a5tz40rr3xluv0yxrnsubixe8m6x85d',
                name: '4c2qzuv96urr4xpiq0jm7o2u21rcjneuturt75zp3elumrh1eb1u94q5larzrniw6cuhuylukoolbjp17ld8824yjl7by31p2ilj4onv29hsbreknsbxj3fh2ec9l0upg8ytk8cn29i2pky8zarn39c2o981t6htww5bdad6aiqhlo37ll05ur2nho4m29623o27cqnysoonm6leclaklnias0qltk4z908d26yc71n0bqk24qtz759zp4ksdih',
                surname: 'vk228j2g9wbh961kqhzkfcrhmoz0mu1ox2hyaf7s431tcdo7ugumpnyxisn19nwooyx0t13mgdo711cl8pv2kxwwqsa11wze46dbm5xtcvm0xfb2yxv2edbw1qinm3qgaph3ouei52cj38p6u2xsus9vu29jspqqnfk30awykwwwmeg1kezw5ygsjj8lbfz0byv3q3gffj900civ0ep9bybpw2xy61etocimdgbc39qm49p0kotoybp17zhddju',
                email: 'brtahbwa5f0xlxm4pek77dk8tk3swwhf3zbmaww6rs1s3gcvel2cmn9tgxasotnh87lxh4wko2bpab7f4vbc55mzw5eh2lvu5x3zrutlfc3ltg9ijhh2uw5t',
                mobile: 'jtpm25ucu0u4k0n8i0apgc8uc3qwn9tavwwqhb5duhwtm8s1eneoi84uzwdo',
                area: 'p382c41prtgleq3cthnvfupfc5iwhu7wmk4apv0oocjig31n6ekk0sdu12yojk50idgzyw41al03dsqqanqvubtqv9nvohv8du8bdsby24ez1fkan0a4r8unvdbw2juyax9o8xyyb7f8c1epzg8rr8xe7rqycotga522uvdt3443dv8oebxalqkldtpgyyiw4pioqba1w73h69ttkvh0ugf2pxklrcl98iowxku0zb5piqxi9zwuh2k3h4wizp8',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: null,
                systemName: 'lhf35posdnlbtycl6g9t',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: '9p3gjcinllmtr8ygan6ffm7pwwty4untnghzncyvzk1b1aixgksa0dbdwjzcc3oddwcy54h4yohlt2wl8d5z3yicpgkr1b7p8j7xv7u8n38fvb8cipe004m0uwyfw0adu6ticz9py79l3ircj388emw7xp2t8az5pb4guke00whmz8a9o8dmyix2t5tmj85l6xd3ilye9cpe93uvgg1e8ika0ndqaz2wpfjskaoepsihlzoayfga1nthdw7rwyv',
                name: '1n4f63py3lqgnft274mbnzbwwit1pgljb9y4x23pkjuomit7vkpbskxtijlnfwwiw7a4x6dhdffrvyqsump9m1y69lfa25y9v82wxx26c0cjc0evdn2nmt0ttec3dev29vrhl9828pqfy2b6fyceydjnze4atku5yqv0vw1wyp66gesm2dbph7gfigwf8xn9gnpvudulcc94y7oijvriw4waosjyyns75n4p2jy5ethssf9acew0omcws5l0bq5',
                surname: 'b0q260js8nv8p0hpvi2t843fmj98509unc7jmsvak8cfm0mkgre33hzcbzvof2rji0navemxb1v9j20j4e49gsxa3rwlnoevyjmox73hwbxw4yo6ms48ay1jsixhx7y0bej7n9ujmpxxjaz9ifvu8gw2qn6xursz6fcifgq3iiybsue2cc7xwvnn61ove8ji2y7hw0xpud1i71unw1hsqhzzrnyi8o3l9anen9v4nfa7karbgz0o3mk15ddbyi7',
                email: 'dw9fk8med4j16uj7lpe64ucztp89b9d0r1n3aq4jpopin2asolyn543lh4pnylvo5321ogof1rvmp7d4m7o0cqfzrwa1puvb30vgsxu9sefjg4ihv5uv50wh',
                mobile: 'c7id8s1566gyw79qwbl45dvw1yn3t9t008xu161o0b91pqkrcrwyc4h489sc',
                area: 'i5akwpnnc1leucrjx75d4zan8rby2o7k4snf7u9ycjy18vi2vvrwul6m6azcxcxchcf0k7pw52z1mehyv383swferxqbh62xg38ibj77ymvvfyfe93py3wililkd8ewpkjicembqajfg27pxmm6ae1is0h3lwptph52s8o9j3iknsqoq0795br33f8a28vjqsjy15tcpapditgo8jledgtq9pcbkqkams1tngmgg7v97neqj43e79fdh8h0hbqk',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                
                systemName: 'dx9s7ywy3gjk8oiwz2ko',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: 'jgl617aaplcequtuea880mwd3859h7awp6ze3yv8ckviz4va00na0syk6mwq4r0kg4oabf6j08j5gtciamas782urspc7mbu3fvk1vv2tgxdpgl6z56xbru6uj348vvd8bjmbh8jvtdqpqwkp7644dxk39n29719olelzodivut1ts4j8j0711ktwy6o914cys1k7ed8ebjff8jsvpivvs5zzw6hhw63vzm5get4bbdq5fws40xirqgjjhjud7l',
                name: '5lrv5b066vcyf35tmyblb0t2nw9fq6zyf9opgtyed7o8zh0fq1726zmvc4mek39bvh2218ffe5nacsu2h3wkzjms8cm4isckso1222iqw9qp3usmjtczq3o7hbw835bmr6m82mmq2i4viasjtdohlh4aq9oh1gbgs8guwnf1hzxve929uo0l5ngr62w5mzthl61dgsx04u42r840gec42zanzj1jqg5d6l1k1itww07pg6yv2f46x169d469qh8',
                surname: 'x27sjprn91d9b4h53ailifgluqubjtkr42blyug0fr3fgfwan697r9qq99q11ggqvrmt3cmae0sk7d19ilabkryvu0iessbhhgbena0ajhs1imnj40m3gfwcsohzntuwhv11b2yml9yjle2oofpsssgwwb3dcgrlpbzt0015u2ryqlvtvy61o3mjkl5frswwp1wybg6zg23fwicrcazrcojpls3lcu742z4nyet5rz26fcoi0awp8p8ii4ddmop',
                email: '8vkrp6x8erva75s7zerv7eh9zez8y4ynwnyfydel3nnt7fr5m2r5ato98g7npvfpjtvhbria43kpcagqmrj3g1jnjxki315n2ykeqi19d4uidxk12dezccg5',
                mobile: 'ufjgeql169v5e31kjd8olzs4cq56pbdfet2tl4sevcx76ljs5315gihu8g9t',
                area: '357o4mxc6uggsrhpz84uk5oi8t1czr6vykt0g90ayg2vftx2lg92pqgfibu3qpo4gavntwhjd63djfcrh35bjib9fyhhckq4z8h9btp7hkqlf6offrokp3essa6xr5fzicuxcepfhsqzir3bc4l3905ae3794zihhya02t289zfn3bq3myh9jaofpe1h5fyn6ijbysddwoagc9o4icoyxbdoybnwf8r4k52onay8fnai8y81ogl44w8gljgmbgs',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: null,
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: '4lt83mi6qshsnyg41ln022h96e9smgg2ekln00lehp87enk9ge91t2is7a1aqqhvey1qv3d58660xq4oge4ek2609xlagu8u8ax0ihbyzlpktfe59dgf8hps4lh46qjy3oexqmhvxkh333d0hdvq6djc88wjstp7vlsr8221ay2zldcb40qozlq7isbg9548z8fg3vqw55irkqjlvvaj69zzgf9lkzv554lu26gvhw6ielefkd7crgcincpye2o',
                name: 'k1yv8ili5j4k5eg90ctzlwph91glrdu20lvk0vq125ddmuzq5d7r3hpk6vfl539wacs997dvvw7y4un1xn3n45o7arp8h0bmuot5ccs4cblni1zz49zhcpcym1v7blgk1s2oh6gz2uc3xlypv04l98gbnhwgrwu5aievx9c84cveb8pfajt4p3k3tvcl6gog4cpzej62u38cfrifrp52sm1axqgifmxgg9jka04q3501158qeqlxm2wm7usjl39',
                surname: '0dcfnbtdgrx5zfq4ft14qae40uigpmz8r1hqoipcsno2kojd1mrem0jcp43e5n8kxanjv9294noatxr0iurs3eylp66tfjr6q1cz9lkyquwerdq1a4sldy17klc19mwuetj67fyew4lkh41a5xzwh3ovhky3l2esyfznxeby6ddtjezp6q8sqxfao3ojdcgtite2ufryor8whkgqs7ow4jfcjob6n171njvu9c79k3bid9g7r106etp423kphu7',
                email: 'jlwhe7vasmrx20yi4ky7a74b66768g7qcjry51lmw7x0wpf4xhaabk5r2od3ih0lak5ud3ub7pyvjz880cqwz1393irjzxodau70i05oxpkj5h8cyxnhq5g2',
                mobile: 'dsnndl4qu8mayhew8lo4ahsrn2lqkggve84hit5059ockclzxf9q38j3r13r',
                area: 'x9xwv66agse6ggb6pm6aywkya0xj84z8m8x9ja73ppyp58bgypotn7iwq5yen4vnwu4xq62p395a0vuviw26nd4s3awwdm3n3sltp3wa7ojs5tnxgv92qsuvpyjjudcvuvv2q7ybm3vilf42jc1u3pu4n7k3aldwyf32eat25m7hcp1g1n1qmpcqpdk6fna0m58j8rfvvotxwclomclpbz03ep5hirroap4bsr1pwspam1hg9scnrtkb84t7cqk',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: '2os1oo1x3swpxbdv832qa00tto2f48pjulwc92s0bljmo1lad9a6afgodi8yv4upvq10aztiop8cd1bjluluywdgfswiv4c6qwm7241ap1a5nvs8aebbbsttdcct9o96s87efullwqg8epn3i8iii39saoerx4tpjsxbs2k1965if1r8ww71n11ust3t7d5tvsxfp6m75ltz35mbe2op3jq2dlg4zus8rjakjxsa7zsoc3zjr3socvk25rwu1w9',
                name: 'kq17in3wvy5729x1opphnpcx7sfqelaf738h84xn5pd2ie1bkkhs084ni2v0nhqq1j7b2p34jlti8zlg99qkpugzy5dp8g94mkypzv8qt4lbofjvt6eoa2oohoaj7tcqlyfgahddfas3seaiyamz9uk033q71f6exocfj0yxb8b8a1vdnlwqkva40hex8h6xip4ideqlzwdl8rvyw8svnwa4nw0n1lq6123m4zizf0htg0lupgxssxnx9af2spb',
                surname: 'bmrrgcvkjk5xah2mws3pxdscjwxjoytzx6dzjqp4j0mtal0tywvk9dcdn5hsvme373ozcdm5ce7ks7kt3t0o82p7ssxh2dw4e43mkkeewhzsafhtlemb8o3gb3to5bfb119sdv7vjsm6rcg4ls3nfzoy9wtffkw6jrkg2fm7rsm04yxjw1as23hdv4y7hgdhezf4780z03vo1gv998upldtm8yw8jd7x74s7zp4fistefl7f1xbsg6455bk34zb',
                email: 'c0q1e1fcf1vsgi2yxmll414jftei1f2y1g8l37ny9wvp6ds372qfekgr0elyvppt3wv8kn27uulw27xypk8t9ri0rlza76vwfh9fvwc5m6vowgrh0nesvxwi',
                mobile: 'w0zomryqckxqsh8uev4qsp2w029bwzjbeihgg8a6d7o8hy2wsdmzjxyqf6dq',
                area: 'b919nr6xesr40hggjn398i2go6k36h0oyn1ixq7zowb52b0julowmqmypdk011mslio0gfiyh30pbbpfmckc1vo5ux9x8tzjcdk8x0o4rhql3edxs2s9tubjcbdr9egsywkp2iwr8x4hi4ifpphw1aqofnlpe9nwz7v9rwaj8ycq81ciodhxmrnoeys4nlrw26ayougafku510kxwcxg8imrthy7fi3lgia22vg0gn88tfli7jz2zgeqv2swn4o',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: 'ubhq1ag1fuy4tnh8khnk',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: 'cm0qoafpg1jp9i4wxpvcf0g9quu1lrnut7ddxf5hb877eadnw5i2tp3ze6v6hg3zbp2tk9g0i2te3od7n3zwv9loaen2vkk6mq39se48w5r02dbg76b2iolxcc1hktz7rbqy307ddeku0ii2wuyohlajith8sgn3gjkzy5g8q0fj1otix17coyjd9yvx1nofak8c910rf475gc4fn7v0xf6lq8qb4so4wctc3v37er8xi1nylyoygpzi284ecym',
                name: null,
                surname: '7yvdsg6l35uuxgaa02qtj34xorc3bzow35zxun8e6e0ei4cvgkxjusr96290j7im143bjmhb03vthrkb8ovv7lpq8u6ijel49qsc5xunbk3e9mitfqchh6wxdo6rnlo284fw86msqj02qlx8bpuhb4eo49u7wribdiy1791vy2a3qyz9x4c56jtp4mgzkika64dwbayhaf2761qz1sx0r31xtt1id71pdynysaj7ymg6w40x4ttly20w6tlfiay',
                email: 'rievl0dup2cvvgdzo6rr987ywk38atz1b3y10gz2hg9sxiekuflw4eiqkk5pgjqd1z6nne6r6zujo0fip1yamalz7zr4tbw6vb9o0q3ml412c7p7t7zhsb0r',
                mobile: '061ddu8nqzn7xf2njxmtfmhy6oezbypx3qf0ff7qupnbbx4mhnh87pxal4pe',
                area: '39kcvnmvq2fca2kmikl2ayqvt28atled53w8lwsku2mma4zd9rnydplzfx4ublt07i03qz31q7za03yyfjy6qbx2jpfdk0uit1256j8rv7mi0f0yukqbz59kikn16n152i1q98kkh3mcvde4pb3u3h9ziaxwuvhq3m5qkeb4kn6hbw6exsbnt5n0vb22sffi0b8snqlmjsaw31jc1mafddsz1pprfzie37bzlolfvj4nybttbz8l2v7hy8k0zwe',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: 'nik451yy8dt3qnkszd4c',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: 'x1k3c2icnm8i2nuj8joryn9o9y8ef9jjfvscmlih0zisqtcvgmlr70rfzvmzx3hjuo4ip15u552r25wae1w3kr41pv314sciqm6zd3laet4u4mp9882c9ev8g3y3wev88f4t3ap8yaqmsjvbh568xx95nt8ny816dv1sa9x0mgvs7qr5pv94o6p8js7rm09uzy6um4niu4k9ltmkjkzgv2knjrl49nkvllb3dcph9elu3zxohbikn00zguiehym',
                
                surname: 'gqog4jn1nu44jhmxae6pqdburl0kr6m8o860y2d36tuf8b5goy2xykh3hpoqokb43xj5n18w4g43fjys980s0lyedjd7ejc26cway06dbwymbzdmqb7y7oy6r2bp43fnw4q4gni8xb8rp32k8leu2u3cfsnc7eefa72abltj47up4eqv6zeiv9lu7n5uqp4vhxufm216n3c06mx6gnt1kpk54kc1dshqzcn9f7m1gulaxtnhpczqkhvo5uf9wvb',
                email: 'fjxt6t43o215ghfjuqadyyov7mtup9xjfeu5mnibyc49mypzlb08rnoy5pm4s537hc5l7cb1cnogo4cxz74w6ao8a3zidnlhqhb75r2043d23jhfx1fkwg9z',
                mobile: 'hkiib4w4r46p5kqklonxg49hb7od0ll3ih35nam0iklvzxm2grcdlcc4puop',
                area: '08ej85akxj3a2ifunhmdeg2deve90jmyr1ggmfukcm9c08xjc940bsec40wuuzf7zztjx2v6qki9qebl8z1wmuhahdg7ucus0a6auifatc0aqkiv527t7lfx2h4s4q3eeg35wl71qccoa9jxkw5sixbe89scgsvgnrig9wnev76qy932yw6p5rhzvkjqfy246l6qqrg34n5h5c53t6hrsznq5nk2xjti76t1wkb2gv8m7qd00y7dgc2x95dkcgn',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: '5bjj455x70abkapo2ett',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: '9ejlps6glw4vd907ly7y3yd28khdkbylkzcy3rni6m5y8s0kdudwlua35ldunj44pyx5ivnnuzseeydgdlhfewp1lrvzyo9hjjt6pj247vx2om742mbozhvn5p1a2b2274f3f9w72ut58lb7v1z93p44l8owiooqomdqid1eyjbnwwtaapgk7aq93iocmgwf6pmrqjb3nsw2v2a8sxlb9grwut43smn1s8k68ksbxi9h3cgjyq0i46cw7fjs7vu',
                name: 'vxpqsbfzwqrrdrj8ccldtk5xg79sgu5emb6093ujhdjh7g30k76f2q7fo8kj5n278exd7vcwemaxuhelhqo838y0qw3n8e4pnlsoakmpkhzvrj5mg1w9633hjtt6rv5lvnqu9oqoxpkprmf1m9sxjksd5byi5v8aduyr43q11s09la7dyxdssw9inhl0w43iz0eo8fgpgbwfo87c0zqlqlj5ecwdkjbk2wbksmxz77tw24dow07mfdxet0yu80f',
                surname: 's3q27p64j7d8w2il4p31lhybkng4dahdonlw32q30qeizqamkkdhjd175q060d8no0apkeszlyhlnxk9zlw0q961861tw033ixlikq6bnua9ej6cgcx2sk09agpz6acy68tijfyuboa520clk54iz472zopvpsnp1faxxzsch9i41xctw6yzrdn4b3sf196kg2zo0ia326h8q08iovgiq8v7hatqvpuezxosq5jxyz27psfpnwdk0rlxm6akmkn',
                email: null,
                mobile: 'rpwunwrei32oifaqafyqxccumvfmp4dmt81d6idap7ggnu6eh1vylfsmcd9g',
                area: 'cq167uj80vv3nomgwpnb2hrn9bgex0p86nvre5708cw72iks3tgmg9n0eisx2e0y5h4rlc2s6utadnook7b4zlfg3u8c4zk78qdzvk43dn1ulpt8z0qp9ianr3pmyp0lpznfqtgggu596g5g66845rwer5jx1m3smhdth49l0g69romwp85pt78x8okm8gqelg6vupvvv7069badcsd5cxj2t71tgsjyh83qgikhnqsm1cnnmnjn4n4ubjobh6g',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: 'egtvxrfb9uyf49miwa4n',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: 'dm6jow6px71tag0e3ea90i8kjc7b3tvj6z4h6lw6umee31q33wgnqw1dfqv18vvrjaodpue7t8821w207rw2tdnwrk8hiyl6vvxodmcqd8a3jf60ooxife750ok4bde9dw38c8uyf47k7ygedcr24cwqi9nqarmgs8hfqytb525hq2rg53ufzv0gn2pogxs7u22vqs2z238d75rwipym5hltps84idpyz25a5kp7y9wrpc5x3mggly3ocphmii3',
                name: '90gsy7wunm2xgxmkdic89ui7jn3czso0303uodu9p3m559514x0gv4w1bi7wb4l3zay1d05at9pzz1v0zt78v8ozdv6b5g2xm9aatz214mh3wu1eu51vxvhdu5s5jn5lux2ejqs21ckv0wrjp1dzlty0krn9wkoltag0atqa3v5xgif8fact2aegxqeqo2i2t1ylwf2eb4k1pffv9lmpk4bc6uk2b5si18hd9det7lhqelid5d34khsd2rcs1px',
                surname: 'yyuzsgica3ksjz350mpkgop9acsk90uarqknpmvtpvku4omofepmdcxihhktx6we43g27axw5sqivt619ezi34ksgl25ek6coqos1c6doaze8cwbtbe6x41q64673da00rixwiidoil6939tceul70z8m29kz1afn1b9qj6fjtmo1ntprxeqdxvc38a6ew8b39n2nyz3jtqvj6r86ub9e9l0zmdqxs59xmpcpef592kzjoxbei10nrm5bmxem47',
                
                mobile: 'zp53oh84uqnmu45vctuc2hoofyxfn19a102hmipjswuvfmzimvu1dlqbygf5',
                area: 'llmmctnmvq9xqzhgmz05z40n9f3zmqvy3il8vt8np8iazrd1dwdk8cvwavj1yr9qt17fnuaudrvmpnanaipjp3k9uwn9u4tu07o4xgba162mjkerrb4i6f51durwku5st6dkpzfwogwq9g6pp19d2qtbzvtcy88kf9qufe57cb4wrga0410us7tnlzxha2hie5aiul6fr0exrondsilx2c3f2ycga3tuvl5xjwx2wk50asvdw0vpjep6oya3scs',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: '8d2vexrqqajm2zvsmtmq',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: 's1ntoz3bpfrd951uwb0dbn3amswyhh3in8gycy3lkvmphiohqxv9wrze7zboi0afx4yhnyl01z7bf758ynvouhq4ev95nulszrlwma6f8piay8iyjyjk8stm7auub36mfpoyo54pi7ddo0tcoqgsuaje1q3vmzqptavalxfft1rf34ynlelforx3o2mry5xi0yyxk201nw06xtjse86ku1ef23dck4u3kx3jrn6sjmyygds0rd1svc485bzx6h3',
                name: 'njf5omat0hqlzohhe5nlmaorxkcxd5rusrxz588nd9u9fplxnja5yzzday4yn63y1ip2g6dg3q2izgbpgx3j93pnftgc8mx5u18u629r15nq11ob573ev7e0pehii13rzlwaha931v775mdvmyj6mocgo6tesq0120n0lbclga6nuoqdxizv7hvmd5s7cpu92ssaqx0q9f2zvau47orb2opl2hs7p84ttetkfku4vrm9dna1d6yf451sahpknxz',
                surname: 'nre5lq3nb6txulwqrfuv51qytg5sro4qgehbdxrmfzk4jqcevmku2zwmltt9izxswp580u6f4pj3nvalx5agcugq7dapbhpzy5xkg22q7b3pn0asrtlzx37yendlxa0fkl2by701nljmis5ajwea1soeh46onoc67iebuv9oxq3fa5wqtylbqpeeu5edjupp5ar24zfhgu8zboc7wbxeuqomwem9v0ak9tlewztditxn27fejmarjh2m9eizduu',
                email: 'hpvtu88p8mp6rmdrw7hdl4sizq58rl9q34dlh21prcivk4p2nao5b8panx537tlafuwtf8won3iuubwsbd437iehr7u2o7nmg5meydu285ma4cfvln1c24z5',
                mobile: 'yrjvso47u0n7o8l0oqhqj4ro3mitd13d70e6p55yelzz8dt0ulfrr6es34t9',
                area: 'eq8pcn02gsf6vcup4meturez508mya379pm95iwx4q5r5cip3ytl7vwmhl567y11kws65y66sl1j4ztp5dai6sv34x71hzluydze37rj6x6ngkc9mhe37k8liudg396vcr9zod86jcryjz4351idsu4rk9n9juxr4l5akp93y5s81m1usbozd262hh152qpd5ngmg7zde1tdlz0nou8wxmtc8pi16piaicchz3tthl93fs65jjuckmp52zmcw2s',
                hasConsentEmail: null,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: 'vnmkvguhbjos7nilc74v',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: '1anbu9kniy7yk2o59ngj7ujqv934dnvufhmmc85niqv2s69vppb55oc1p0xgbw49ukgm0pjycyc2l6vvzee78jqron5p0u88zw6r21zawgzaeb64spxdhbyr4q1vwidzd3a34hxcrxaci62abfabwqohbfp7m9ti0pl38dppudlbr9xnxom5fvp72cbmbpsx9rnk5ginxosytj5tldzwcpcwi7gbf18t819vhfd0fh12f60oonbz7ev4h3x4p84',
                name: 'su5qs9lb9zooqoatg8u0l0a56ku1j345xslbaz0o0ttirjzpbwe6kj91mspxl99g09f837cvd3tpjymcekw33b5pxowhteldho7wf84t7uf5z7j7to5bidbtvz1w965239jsnrnx9076rvge19ui37pqqsnjnf58f4xegkngtnfjlaefnjuplmk9urq8kh7zvzza6jjqrci41o1k86rwol74z3gwyrf4w6jvi5t26d3ck5to1562yb4pb2mvdew',
                surname: '5gx3u1bp23b5e9ir4m0hxdhcki676jkarq4f3fmwgvpj7mzmvod26mm5nhzbz2zsxlp2udxrjbv7gbye1t1prb47k8nyi96efka4uta4sjei8ue53mzhps4tjd259xi68ew8xgyp8f7bo0rk757pa184l550dn7fku5nu1ta0u8jskgg0h5uk1uri43v594gavmsvrey4jnekmgecs1u7co3x56ufpgmhts3gexyxbqhx78k2klyu2c72yh53gh',
                email: '1js6z55cx56u9xo7z2wwmzqzi3rwp20f57mfdxx5dyvtljav07t0j2xydnu0rf9u90pdnfiqf2ywlc2dy9ie240rw0xbt5ouyeeb0111i5vyspoitkh8y8u1',
                mobile: 'c06maz2yf3i9qajd7a0z7vd0bb45es1xp92ymlbdy75cxy6u177s4qnrvrol',
                area: 'uqajstlqcu6b67mf0lxr1sdi4ywhvmednluvj8caiu9ix5css119qtu98b60zbsjaspj44rwfwjjbmmmcc19glwn7v3cc59i89pxv2xy0gtjps2i9jn9wp0vkf8f60ywkhcihfjbvvrnz49wcvsqwwrrppuh5ur9e0pve3mj483d66hwdlbcejgt7333ro7p7z37mxcae16yd77aqzey048dfdt7utrpqecbcszbullu2xrv5s4d0ripgz0hewg',
                
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: 'r2enbrx4ogygr2hdk1bn',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: '0jzqns7x22k5jgbst4nbu1l1zzccgzfhv5iguqeqzqofm5nyqvb3fuc269ph47e6ynpv5zxi1ep9b3h5eq2fner4ifwr5sbcsy1ju7grvimvnh46obnkh97kiqp0az1dpy6u0xco3ybpqfgonl0i1f86tc0n9t0bmsh3f07sov11twoduacfsg7pcxlvn2ptefxfl8dz02ysob5q3guqbb8g4yseu0edq9nna3lx0lbw8vn06yp7zsp4b250iu7',
                name: 'f48yiney7avmemi8wg67lfzliuylwjd92uik545g2htvgyhzxhlbe8zjwe2qrdhrju4xpz83xt5qlpemsbfns32recc1rdj6endkm5ws36lazmmd3n3dlir8jxyrajf94gm06zmgni956nuinkedp8ug5clri88wdl8pnszuuwd3r7l8juuqtnpo0fx0tt0ue9m7rl1wtpxhi9jd5zbwcuq5dk3ma4o2iarllqn0mll5acwg7iwhzfzgx5d6edh',
                surname: 'lcyg2tl1m25jnwl03fk7dzeed7uhj3etcyk9eewuu12kxuhz2rphh7blhh8n4aerh0afca9xhxnyc0p5pxy8vw6dat9ubpe15s8zq03k2vkn1u05mdg5i7yg50oh6ftf8ne3txtyrbr3h0r1mfgvzx0ie9p981emdgwghx6pcoqxwwv1mkppvkb7g1rhh83rt7k5pbc0xh93yyeyk04j6zqrf2dm8so5hrd7zcol7cwtgkrldk9ofv2sff4nepz',
                email: 'd619ip1obtyu7oixbjfp8frh3410169l2p08rse8c695of1f7ouheu5vzuwjkq2b4pv6kqqvnbysofckyflnszacbq9wd1dg0lcnr5627a0c53xq7ek9vgj3',
                mobile: 'k8ohry1bquo3y627etwhjru3w89vz8p1zm0hqd7gos30sgw7euxruw4g0cpm',
                area: 'mccudvlwa4jvbxewzbx9v59l7ufki0sn63kjatr8tf9i49b898fd61cc24ol10zkzbose1tahi61iviezltfho09cgc2ambvxpcbbo8ob1fqpiheoctk64i580tms2vaqeavkojq299ardk0e4wuft2bnwfuyun2hnjpub85v484ltpyncvyi6vd9bdlq9bqso1yod918jig876kuvv0uin6kl2mwt9lvwyin1f28cj7brautux237u338alp2l',
                hasConsentEmail: true,
                hasConsentMobile: null,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: '0vc6g0alnf8z6oxazxmt',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: '3z8btrwp3y9d7kjdwzdpw4d2hgui5yl12fqr78up5dfu5jbr2cqaulhooio60imnww917a9jidvkrg55356nodc0kmo0r7ig8li2h2juv1gw4pc2pux08a74x6ysanr7jp75ndlgtbusms78wn3daaik2oxw38b5xrm6j3jhlho718khum0t1c5tdcn0pt4d9ud6qxga8g87x7k8skfdvdf5pm3pholqp7asm0lc2puyrpt6vqi6trzha7578s2',
                name: '6s42u59ph7zo15cxiwh95qdkk08x9wmm44ryfr3tys77ie2pp0rqbmudr4g43bl0vrlw64c0i5i4n20hn2rgx4apdu8o7qo616jfcrl9drtnns6ocg6ib5d6kzpclmnn8fzdyceg0cnv5cntmjs8m4myft7rq8kgzsna31m12njvjpi22npgouio79ag9jni4bx74fi1xua2xc1ji1au4l8qvferkx74b8f3nnm2i1qs9ygor6nfv39cm1luk8b',
                surname: 'joofyz9gdq9kgi9s2e4q2mo1xnvsackmq7mfjbkbntd0wme5tjkpxep00ltma7s6qz26jdn9oztcqnzpq7qqox6qwankvynxnj9stbpaezchdqgu0vokyvudevsasiqb931p2howfdfctnuxlo8v8szitl3glhpto7rnv74y88v4hjyno7cj9ow8rkopc9b6eecrqb4v01nxfyy6ue5evi2sv5tmpg1nynh9sd8dv0plpohk4qt0gt3z7ymn8om',
                email: '8o0w4jd817e6ulrurtqky9jjebpqhnb9gbtexnwmoi7m41kvlkkd9xlimzw133yjjfhc30fvntq6fei6diib22ebxwafhrsskbigc740j24867vt8m7r976w',
                mobile: '24aprqkrzt19qj2ustd42j8jdlywjppejctw7uic4xttm6t81oxhhfeyla0k',
                area: 'o3zfd2lvikhjl9s9v588ovlf5qci5b4s8eldgqsmrxap1zmqflb1suuad7ptg6xi3ymi455pxpsznntsq04be3wszfde7sbnmvy08ndm5lsh6gfvh3suj6a4x5j99580bdp3s6x4r4t4vcbz59jqnj5jlsh7ow4nsa4oqam9o9g5voum6mtjjymx6lz3na76g81plqsfjtf42qjbiytu0t9gkusdnbcmpzsj52smclscurxm2cy1rqwikf73did',
                hasConsentEmail: true,
                
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: 'zzk04qkhj8eb92myxj0v',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: '25rbz9nsc8ui951sse7g2qi7egb9ilh3fkckisvnpo981lfhv49sg0tk0qnef14o6n9wxqrpykhc65c7w5jzy2mk85tc2l9pppr24r4tkpoyw2roi6at1q5x0a8741v3z8cihi6s0qbqyoxcubq34rl065138exrjjhu32zeiph1rtpn85nfwafd7fs3ahd5qvt5wtb96xbwbmmxh7jtlvd8lpfgeacqrhmx55mvmifuh6w2n0i6qv1vhtrexxv',
                name: '48qkn3hkt5e5lpv6od1oi0gkb14ftdyzqusfhwir4y1z5hvb3uk1sijp85oozzjhdz00psiw8boyfwc7m1z8s4adnqqsqatafdjdzywmwzdzrkcbyu4q55opvqlerx9icp76xy75pn37t6wuyvxafjkewwhg7rh56wy8nd6uhgxzqbnvjpm0vlu7anfkxch6umzb5u737ad2nfmg3ghhet2ho2kz61khzb24p37fi58asfdsw0gsfwqkzezqwk0',
                surname: '6tgi2n9r2ag2o8d50qmjd6rpzqi2t31mqaucearict7pe3ls5aurhggom9dxbc4phyw3ttl3klyxofapkop0b1f35j813vvgm6mb7d66av2mof7il17z78k7abdfoxh9lwdauwokby4hhfi2645jjaguerxy8kn1vihswqvk26630alsik0mjzvlc97mxrkqfnw2qr1j9y9139hshv7ef1pqhukeg9lgve2rwwr00voih43dbt017rw8ba4b3wa',
                email: 'iml3gkwu0kaewgk6ae57nq1e9e8ic4mghcewh2dpjin11y0jpwrvk0i34tp4v3oxz0v2mvide75tkwly4lrnpc1qh8g4ert7xvfph5r8lgdjzmg8antat76b',
                mobile: 's7e5c4va9dthhf7v6gxvs2d6b6axu7z7gqhb9kr0b7dswhwp33ewk8lvqnvn',
                area: 'h0yct7g0fcqrqk1n04er52qlinctpj9jpko0mo7u20b58gm3lqdjdgpvxauyftbfc6wuvijnr48xd0ee4cfhxxsslmrzyqi0klawpkw55rkkbnt34wgx6bzmkis7wqxm4a9jju4ndsv0kcwo5x4k1jhqgdg98gb2uofpl19dhv0ivihik8z4haleg3mczf3xjierdr21q80b6fza8rasuascn251fqe9nd99viv5klqklsyokt1vxvlubyocydy',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: 'xyslk9j9e2zr061zgwni',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: 'a2mxoshp4724mubavhq5jkija92wr9lyvunmvuukct2dun15vg06oacqkvpeonbvtsj3qxm64tpbo6mk2f7ck94xld3t23awnjz1uvjmdvj70rejx54wsge09fafrjq2vb363y85xorfcf1ggo8xqkdgybfoh43ot11zzyjzpyi03d4x3p113iisv7ytk9qn4rtw92mdrldcr5e3dtbtbpzendt75urydcazotbjzuiqs94md54jtdhdrm0bqin',
                name: 'f1yyqm69lm4b0kfe1k3dac21uigrkl3v1r2vc2tqsjpea8fkm8nor7ooa57x6avmjcbz60ms5juiqu214dhvij3ywuv5na5o0z7tjsqnxxk4q8qmojok9t24xn9kch09d9y8p3b84e68agdgueyhoc7to8ltw3kdwv7u351ge7i2c8b2bxqryxs8o6hsa76zxt4b46mrwq31g1eeqrsxfbg4gfjz2uvxbhfzvomd0rpa4orlbr8w2pxpb1ihy24',
                surname: 'lyovxvxdvh519p5vnmobe9exx9893j8sq3budcex0kie70w3lj9gc0j3yz2d41e6039uyyo49qbv4vtxzdz85mgk64fkhg1u0xqoolrfhz5u9tqs81lg0oukmqpqpvvlamjbr8o02khjn2xg9t49ibow6ovn1qixjoz0xc010afmmngr9yncfcrwr99a6yg8pljynlz6rnz5jp26yreg76opsgttbil5yv3zrab61wkohs8nauitxs0bb951neo',
                email: '9udpo3mirixoig54f8cp1mbamtd08uxp33cikhe1otv3c1b9557go39iq7z2cu4jvvdfjhwwyjcx62izmw7oubl71dtgt4libqyyyn4ijlb3xal1l4ctnnh1',
                mobile: '3g6hd0giizz18hck195rpul80qo4l69p8f4zxgxzuylqh92iagr6eyysy1f4',
                area: '4qkyg8f1rkdyphyuaya9h3t532jmz2cwqt3mtgtlsv0uy1ymtvklxdq5n8inc50gt4kx4fe6ntzrix4dgxec4ya5n5p8slxj79tyaqf1nwid0poew12q0qsu2l5uxrxxsnc8eg379abxypm1ti69od28hl071ry7am8oq914kkv2lx05cwvuoocp7bvwry1rznwsocackaxkmyeqb50yyuigsaidhq1j0e4pu5faa91y2oci9xljxhacj5j9hlm',
                hasConsentEmail: true,
                hasConsentMobile: true,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'j6w0ywbuwqtyv7bw9fxrmd01znxfvvz9z4xnh',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: '65p3xywin13rjlah3l6e',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: '6s8c36a8a1yb5ap0a9xswwq82pa8fvfpufy3e2ycrfccpk6369sirhqlhaoskqdsol1o26cuqnsltw985sjdui4je1tl22ghhvv5bevsxnhdhvnx0rarb462p45vsgsrim7934nefmsgcsc71mby8ncp06rj6b5ozdchljz3qyee9jjhke1hcd0zqhloaouwk3i8rkaoln52tvldfzpq9u61cgs50so7mdaxt7itujihuml81ga0h66l6r3rbci',
                name: 'j01i701mfkvq7fob6un1a6jbs8jrovk2et00z3q1013n58bfumrpxw6ul7hzqtm0qfqzx9ioz6wagm59ke1930yup2bczfpxjndnis55ivna2ru7ksj3fh3afb3p8sej46r02z3dcgrbngpyeywll60z059qbs3h55o8d3kxk8s39dye6m0x3co6g0vo881em8o2uol6dxpjx3chk3jwq1a8k2h2mv7tccocmp6z319k4fg1cd7a8uxvvt692aj',
                surname: 'h0bvckf4pxcbv3j8c1mzz5hb3lgim6oxvlevv90h0h384j58vhjymprblzv03igpy5k4t13c5y4mhm4vy1gsb6i7mvu6eely4qlghlnb3x37sdjopmnhbd2fkt7utntq7qnuwfb2no1nt2y4l5l7l0rkv3wet26z2x5pkpvh3hextr6a49su07qfenkv834lvj8gth7f6ih5k9z8uiyfjki6sfd1zyb2oce8q9m7e234yogblz80qwz286dwr22',
                email: 'w421lr2ktdtp2s1xuztmbs4iomrssaobhemrb6t5wfpiq7xjbk8saykahkdajezxc1uvlx2ohiojtl4a15feo6cqeew7jqqhn4ejsuqb5m24lxpvbem61bx5',
                mobile: 'rr61g41vljwqph4f6y12z2isps6v1khgv5ftp3ju1ul89eerkg8ucdt25szk',
                area: 'mfvs8luqjwpjs4q7xfloqtv57tto8w5g77golzia4fscf2gviiplajsifgxwa9j8idail3sv16uy2yrgqxdplpse21mr9a0nla1pzsd4vsgyjojmbppb06h9vq9pns2jmmox6k4wzvwa7p718anyb2o9yilswbzozsabn3l7jwuucf3osnnm1yplbi08khpzisk0nr415fpsm6xxcqge83kh4oo843vdpdouociboqzia2uvmeogr2hhmy2eqw0',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: '7hy2hj6dq7s4sic213jxxv94uyxfdg3qt33ew',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: '5vixxxxjo2eiafhbxe0w',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: '4yyelhsvbrod9je0nkd8xcqocvchizhazsedrp30xph571v8fvxfzgmqanseao3ip14lkhxs43si2pik86aaa9gqkrge5q0zvfdhkyhotj5zszetp4m623vjggj5yqzgpotxxkbeevgru8qqapnwbubthxmk4yi3iktnjeacn2r6kt7pxuxikzuj2xw3uifqhyuxqixo4b6pykhazzabxhdnqemh7to3lqyahtsdoj8qchl96k57r07k7hx00ya',
                name: 'r4w5ajdbwhfjuk1be4wle8v3juv6ecug5px1lhf2avzcwv6kykhcjk4bgvpj5jr40rxqkjog2j0cw13kowx0lan6nv7tersso7jb3jgbvy3xca323seid4e5hkg87ytn4bquefq1r3jg2osdpck8r9a7xhv4jwsxbv6asfxkl210o4fa2kwr54sjqds8zqvxw7kgj1klvqjo94vml61pakvtkn3dkrih10tbjgjwbkji3z5ur4fc5zyvdd4lcu4',
                surname: 'tankac6sygjss0lfkoa1djjs177vemqxrl5a4hekod9ct739joyvbrc3t4pxoooyi9p0jc5xgmn72tv8i161ys8pjjt2ziuefmfy17mlu49uhamgvm2sqzdbthyqv9bammri0bjgy7aig6goj3d9fa4bmt1othoxwsd2htslaz6aqjvecp540ch5yya2e57ew8vt57d3fcj1496xh6lwwv3ffqifa4iclhugqhpilqqn14mgc4jib32ijv3cico',
                email: 'opg3j3svatun5bddh0wlcvcxvu04ethcn3mv0419odq86cdjwdsi014h7tt9q3izedxa3rxsstsg7nmv07d4goy9cnyq12858c4iqasrqrxl88o3r6sh63oh',
                mobile: 'se6jgba6ond9945h0kw1l0n5argmow8qywp3r2j5fwrxtxtbnj8dgfvutb9x',
                area: 'f6v5myr0bx911dm00ro4axcyfjx44yn8b06fx8tugf7cuy22uu4y5iep0ftf1veqx8qudy01s45qe6hsfors7or8wcryqrf3mplyj1ac2l1ps42g71jaugg5p06qkpcq736hweou5bforjla74ll5w16yvht7ukddn0e783r6bgmx5svw9q9rwuwfsfqvfw15l3npf3y4unjopm9k62s4qpg3kb65q3cxpkbdgetpu56diltnumx2v5lc67xx7r',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: 'z9t1yz7did7ns8wt9fwscoxxt9vpa8q0m19d1',
                systemName: 'lojkjwb1nzt1fudfvubn',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: '05zzcmc404vopvl0nx2j39zhwuwndq47x43b2imtrkej4nypc1dpch0wqvoox59kjnmtj97qq7wevvqpnm9iparmy1sgurn18t0p37kbo2zglvyl1sy5hb6ogzssu0w984bzfuxunwwucsa8eatn5n70habahxw2h2t4c7pj1q42egznjdk6onm1y7emlid2ibqs5is2uvkgq58jwdc04pyn32ir4re9eprdq3vx1b2e6bpgol399yh7o7wv7q3',
                name: 'tygnr82bj4kwbu9pz8l1umpht84vtnnn28q9rrr1inh3zaznk7lqciuq9f6y2xwd0fmjve6oh2rff79o9xm9jixsmkivyt4nee5e8aqh504c3v8qlbrf3mog0ug5l9kusesp2orj0f5qkymxwd0psfeca10ord4p1xegu7afbxjzqtc6bs65z3tdkk6jfftnm6oxuomx2xfwau4cq221w29dl2ih16s77y47volbdw5y5ia3y70ewhih64oafrs',
                surname: '4yvuewqi9vkqp6bozoge96vyqwum2qtmbpup6qbrypysujfeu87x4kai25nrachezf1r5zvxcydja6c48ejkjv5tm27ry3jo3sjabt5ll3eo9di6g0vfn44qu7tv6tnbohlj7k9bllts8gr3nndkdg27h7fln79jx19rf8pmxzskxrtxug60jv4rgcc7yi7prwm2ri0uvt5nax0po59gsdox3gn430chheo3msrb3b63yficdhp1mz8ojcwjmk6',
                email: 'xtt5rrn1o4kgrql2wfc9andidu2gzqbn0jz0gggvwv1t6ede0vj6np9fbda4u54l9wtaezolznvcicj8i1uhafdp8cn1vuim5i3vs8igwlyz4jawkigmkc3h',
                mobile: 'mgibr2zr7fbrjkc5qb7x53a6b9lxhqb27dheelpcqex25l72cek9f0cztsap',
                area: 'q3r2ruldcei5qkcqphlu7uidjxqxuvjs5i6618ylfmr0g4511owt01kmqs3ioo4zxjf04tx3lx4tf1c135zmtphygn6gr6ocfoplrveymoq7agr1ri3e60mjkzyec2sykekaezfh5hdi0qarmcett5iainj49ary7leixsaa5ja1fibqnzyrod5rf3sxd7yk0bms93836w3zckv34zh04c6q5f7r77iof7k0rp97eiuqgvcqxf0950tkzqkvu56',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: '0tptqgqwns7845pegvzl',
                roleId: 'pmu1utniu6m2kcf300ra4lhstdaq0xt0nmpc9',
                roleName: 'bdheq4y4mricg0g8t8d8vr8begmzz55v4mv1wxusx2uq3cudv73rz9x4hjnhi1wc511wj8nrchihne93hv4hdx1o84qffmcymb0o29thrvarg1z0k16p5zlugog5us3nxptbb5h145w92ukezg1f41019l13zs5f3cn9eyet5cq2hc12cmopbe58dcuz3us3xv6kha10uuk1wx3qjx5do7ealxm88htjiprdn2nbzyc32zhdutfqdb231qzko1k',
                name: 'eqdh3cw83q23ytv5qd8bs2of96d7s6ckhjjw7ddo4lj7rszm7ox1wjxdr1cxk9u0lris89aizxdq4mu4zr81ane72vqpljfla15f69lpmd6lm2zgr7rguwu632bxcotqgcpom6ln7kx807osobuj0b5ia7ov8jsg4rfjpo6wz1rsrhg7vvmc483ukcpx8hu4tfnl9rwwdzk817kbsnej2tvgkxzqyixdswuw95dsrz48j014gv1mist2rs1ua1c',
                surname: '9ufuveknrlfeftn6dlldzuyth4x3cjvtii3n0r05pxms582y77m3ualeywapwb6sm7stb4esct1q6u7aan3cij0shu44862dqpv1fd4tl50oucj92stqirzql66fchaaybhxrb8xupxp1ktro0ft5u3n1r7deizo04r9a3sd2lj1i1dwnze96ssmzjifgk03q999f7zz3gey9fdf9ysscvmbavrfxi5zzsa38r05o22738befydg3rq6kvautzz',
                email: 'w66bv8s1syn1ibdjk2fver6z77vpzu1si39q4u73f7l4cezx0pk6k6ynwgq4j991dt5qkzpjm10gq663d5oeawvwyptftkdgdr4iwndtla8wyd6nf8onvoyb',
                mobile: '8wopr5d60kbjzeqjmlrsqyh71ffw32qeiccejfctxwk362jayn1nfpqt4bak',
                area: 'jbdpiyvmnxfr6u4xls15jn110c59mooy99s6ziqgt2b9mxuc7qg9gp3rbrk4o3ley28rjauh6idu9fg1xbb79mlhgs58z9lcafrvdp8zfzdd8bz8q7u8kesxl8gwz4uu7ljgjsn8vyp10byr5o530b1h1479fgzyrl8o9gsi8950oywguiynb4t50sy3tkwo4q1rlrlti4pd72su2o0kn78du8c85x0qwbky1wueo56nrsfd9fbknwvzww5a6bh',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: 'l0q572hw1vhqrkju36vnc',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: 'jngvbtjs4mx6yco3b8gtmjocromj8nud56myrppqdy3j61f02aa2b65grotp6n36hhpnh4efjzg508mqz6ifieqe215zema92kkxhov7ddbuh8nbznt5258buootpzx3sr2olezgzpcogv4bcgi1gce3874fuopqgravtjw3ikeeli4u5cbdj3qtm04gd0sy2oac7njes7762drrxjyi8rpa7l511eu51eikt9qx6lytc5ggmjbx0jbhyejg5e4',
                name: 'ws5nlwf8ziqpt3twb5g9x1d7ow3k9fuj0prpfzpvd44v2zz41ta7m1vlebkenwk74thi3ui53gaguzxmul5fcgwk98zo9hlx3sztj1w9zinw7x8qh453owtqud9ysedc1wozs3wl52rzcvdwbtfiouw4h55ljvswz5bouoe34n0h1s5etzdkr9xc81x8h2sa6m24tgabignovcjeue8vkb9irumhmoth75z3m5gttltcktt4vpklbp871scnk33',
                surname: '6k7w352uoy6i1xhj2s0ynjely8a21qz7rxebt2t10jcxoi7qh4o8tt23d90y6ayksf9bja5pzl1sjvoikdea87ywh6lxq5yhg0vin58z0jfw0pk4wpr2b9khhzs31h4w5ogv9yhxg1gexpqnp6putp5cd31f73f5xwlboyxgyt27va57b5hvcc2jjc6h5lltih8l4oknpx2uqkh8qt0ur0romx1ouzkat8yb9atypa4gbei6sdhb7me5jbc4ohg',
                email: 'a1qko6k7jn05s14badipgb70g76ufrb5am1yhm73yx62mfua6vea1p0hx8kz7bxqr8os3cfv8i20ch7a9ajnpjuw1t7t3auwt9g1qe6lv7kxe72uawhu4qv8',
                mobile: 'cnen0wj07kgrep0hs5luqm0bjw2hovt9jr52gj5t9yq34cne9k88gm2rva49',
                area: 'zlvbksyplf0wa2qqap3jd17s7yivdu7jfsdyd538qrr8vyv3el1u5pdx27vqndr2apjj3bn4dw8gsn1jwwhr4glpju9eohcmm7fc5o2rh2b5c51eyuvszhj5te9bs2iz0roriqeqqp9ne8vki35a17ekw7sqy00hcy9wkw2szx5yb9aw42j5u9mq5rcibabk9w3nk5iwimf7s3g50za7trit3472clkkbgznmdcv03t7aaqx52jz19dqy1c7zel',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: 'lndnitqruwfyij2rncjn',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: 'rf4wzpicl72r09qczfbia58pzq6saxmr0atlmrygvrctv31j2ga8dl5o6igiratyr0jssovfjlo0w3jr1yuvtgzq6nwe1cagt32ryca85vqcs3h2kx583t4efjxwlxcr05816woytyqx5lr4qvza7r3084slxkdli5jci4hj1e2nqt4xgkivzdhugdp8ri5adnih3t298ecs6vp7a0nrawxbjcmjkiuyzisbbi0xcqob9m8qf5ek5cp3l39y4jff',
                name: '3p3rhus7pemfdopj3mjvv82z1uayqmyj0rf9f002fotx4xa8cnjd7agqrujn7uuswieiabu9ehm8e0sr6gn0qp9i0kwhm4vzj3drs9c7yvxr5jfporjs2wdwvdvbulrxvj0nyxqo4in3wheggjpnxplzjwwomoay5qctm41v00dkn7q2nw4mma1qoohk6lovoo885pfjy3pj0ve9owl7f9z18h2wxjmek71liau9lmpsndyzuh6guhuhi8ymuo2',
                surname: '5iflesdj6ptip94ch0oaxe774ujoxpryudnwtohr3lthrjnzde7qycgl8pelqlmeuxhyl9m22e6esxhporvt1dnlufa4eulvtum0d8tcru5ew3jyvzynsy78ygs9dxpa99ex07y5ah0dk32gmv2rz1xjcwerojruaa8xt18fftb8w4l0b5vt8jhrvs0gmkzbwrxamz1330v78eyxuemcof5rv2sn5y1sl1cf8xequtydmbocr0sqwpxm7i3y5yp',
                email: 'g3060hkyykvtbgmwe41942ahuzl0in36zn1lxntlnt5gcdrjkh2oupe41f8peszhlde7dyz00ud948sof96toqkcw3sajf3ovew9mb3ggu91ggb5y68d8uod',
                mobile: 'fzthmwlm2x4nwfucvkpls0sx9i6hfq576rqqzdqag3431lbb2s8n39fvy5yo',
                area: '7qu1xzzrgq63ghktr12fjshspwdtx5bglhea9ggsdu1f3sogk8tl6puoibcs2jfhw9gvwo1jcpld7886ocup1g6yaj40w724ghzzutoo16re1f89t2kditb54gnrwblht0dzu3f43mwml9p2hrtchopoydsog64mwpsmgxe9q5jlmve8t2l9vb3826v42ioksyai4zenqnsg3qzlk6fj01xzz8fof2gfwvoszxu0a5yjjdoqofoe20utews1bmv',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleName is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: '9ncfnt2v6mjgm4hjb9r8',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: '0j6suiw2vycnss8goy97mmhlktb2wrhpovlyigh4lbxh5fdp85xltpew5cgi2e9nnqum732kwh7debrqedi0zpb71liim275d9ui51ci8fuf5zf5skysb64rxi14wja2s77meh905ixbxw5xay2zsxi9hhwca8xd1oryjtsdaxkiagp42lxv50r6zplxftmjfo7tdsgbnydbp1qc9ulutv4dh997lmh6u45in2paw102wkru4gag5ocquu19v5s',
                name: '0wfp45kxyvxi32j4m8kt2gv47slt08t32l8zrkth6anat165tyhgxldiewt56llrgwcg7mog3opb7kpxtxyf7asifviqmjczbqzj1rkqmlrojudwspugifwmshrxcmdktu2yojct7uh01audc2gwxhifrwx4703ckqev3c5ozzivodw0ccm7nt87d4lihsi7yyif6si7s08wdew0y8s8vonur8xlpokxbfdk2q9iu6fit9euafynidm4y2xw20u1',
                surname: 'ihqmevdvd4uev7pb1fk1r4u3wte87xs75n7bc53l1tadqagl5id6zjilnq5s2yct1y42xut8zwdrwv8r3gyx4gb7t2i3h23iww79liod1y7o41h3ve9i7na6lro2zd88x7cyg2diszvonvg1yl6qg0z3k09j6qo9bfzfm3q9p5vjzrzw0j9un0k103tzz7edp8dsx5bg6e492g0vy9glmbsmt2bpnkcahvzc541xwye21by29s5vza4rkb5efzo',
                email: '73ttelms6gxrxg89qk5i7jll6afsfcdwxfsd4zltxi3mtls04ipetc1j2ojh2dmm6z2a3cerli899b768o58po842hvpc5f55bs35mxcnffqk5c4e4u2bjd8',
                mobile: '4f6chjvy9ewgi7cx7ap5r6tyol22jrj3i6f4l60x1ap210auuypq5ks8uw7x',
                area: 'hiq3x0n9q55qrvxbhjvzyw892q46wy3zvl7iquvyz46b7wwkl8lax5sdyg6jaftssvrofkkpg5rej49rntpyaveb4vow73c8812tcgri7h2aham49b6yzs0o6lovxutbcvsil3ohadxkgmyxf62ns0firhdsqy3v3tdm67d8w1wp7mebtgh4vhmklsdtjkxq8te2fjawj4mw5kstv01deyo3ppagx4ejoq1qrncnj00hdiuns44hkicv51ycrtb',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSurname is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: 'ictyvqbwudkqi9zqq3wf',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: 'x584am7bsspju0ln1zta64crd5gbuqfd59868wkn9gjphw11jtdkxgnhghzwcswgqfl3d6ex6fz4kx9eo8qvj6vsxoukxea8ec1x3lamnwhwzmv51i13a9lfdxpzk6g906z9v7e0ys0zom80rao4zfeutt45smxarcjdb7ugrbscih532wrnftaddyvzysqe105jbmjaejb02rdmo69hr5vnhzbyw6gi5zehw7ch7ikz8opkk5wtd1qcyb9shxa',
                name: '2nlzsweib2pt27vou5gbzgfzigw5agbhukq8ukttu0i70dk0krgnu4x8e79b2dot0gjqpfsuvnj4dy8uc3qzp6u23s3v6lzcenuwjhii4u3yw5z5d2icypkif9q0dh9hf9t0uknvbxaoofa6ip9tx1rj3dp9y00wylvthyi0qlpcdb6q78dl0tnskmonf811peraf4fcq9ncufdl2h0ypt8qiovqi8cs7yo45de6f36lvkb8wi956f0mdz7fr07',
                surname: 'fnfmygdfevodycxd41q4uxoxdytchxy3cp785lcwdt1efrd5i5uwtxtni9fyr41xpysup5ck2p10tl04fgk71rojvcbsv02au4g6iwzaigkz21xyc68aircir0h0usq9imny39glvenj8fse8cexm3l0m4azgj2ml9wrvk2q3dg63r7ay9cito775j2fjjw5nahcm39ne1cf1xopdqf4n2ksoxgjjyf9hca4sa72yut74p5kfmabjm9nvz990izw',
                email: 'ixv4lqcp38k0u27fvz73bm3ggax0q6okm5n92gjyd28ruhsrhk2g295lxspujjqp0vftf0p2seurn3wxyoptr9axtr0uxyng8t4dvleosishrvpdd74owegn',
                mobile: '680jtxc42sxn8ye4cgvymsqa0ouwac1awtyitdm0lov87t50j8vrvptl8h3p',
                area: 'z5y8dx7fo3qsyp59xa5fdkl6upo0k5fwxknxd9qb1x6zz6v56gy1w3a0mw3wohvbn54mx24pen1suveu73sn8yfv3p3sbmvne2z77i715rjmlub5d3pkis7wg7rvys05jzhovcn658xubykq9atlesc31xrw4n93h213mz8eogv5uv10kcaevh2o3a03snjupoqcn1nlli73i2eado26gq79of6igle29o1tre4qjf9f2exg3ero65y7i83ugcq',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSurname is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: 'wnok29w5t2pq81uezgmv',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: 'uvg596uexl3669jiskyhcpwsen2sr2fcwwtyqmeg0sjrzqt051smzp198to8kuj3unqo7bgszuua2lyl9ttd6jmiy6zstupj8xk4byqwg2s55mkskbkzgep0u6iuak94rdfs1zafb00w4torsytcwiys6jym9mqzsbxnzarfvjyce535bwnkzcupeepkko1fxkh9oxkw6spsxsrb4s688m5jahn813i6136tctc6cmybuj92p0fs4ctsgl39rno',
                name: 'e8zvdk93tx23l1siy2u7b5alw9pnv84dw6igsmdwtovxpclhvjw6j3qbo18ep2cuzl16oe6kzrr2yf1jlo1mvkxxe6bkrf1ltezfci2co9ni7h9e7q316vcy3vyj453zsdmast318z45l4apffi1v7h2ie7njyqi4i2dcp533o7hfefu5ins5uuintwr9q90hvvmdgnbes41kbxf0qezf8fe3mxnwdvx16au0x815ht1p13navqglidwn7717ww',
                surname: '01eqpopabb19ep5hx2h6p1hsem48srzxz80rlyo01805ec4l2zhob3ex3oox37m9pcgqua20vfzw5p4wmd5gop4w65640pvcnxod1fspcaf9esogtq2u67yw7llwm3sm1c6raj4kvyp60wcaxo73py5c8hulhcuryr5d3u8wjabi2jcii5uwalfs4fc9c6vm2w96a77a4uth5u8i9twabfyibifsn6n2vvyuhz1t3kj5dkas7u0xezr9nkag9mj',
                email: 'qovfy11iaex4obnkt8edhur4lrtry7n4gldfdu7r9iag3y57w0m7kfsjlgf57xg7dp69xogo6yn7bkavjkgwmt6jkvajpmidc8kp4d7fuv3v8dxuen3nmwxvt',
                mobile: 'goo2k1vuhghvuv9xsqgyl2bq8t1pbxzbalwe7zjuxuwq4oxjqi9x1i6ikvba',
                area: '0zqyp8lx1zvhh6lm6xpd8wxlp05tfme0j5n41q8qsn5m5ckmgp7frysgzq22fn4rhizenhbolzg76gmpnnosc5r2r6zuqthtfdxhos2b5jt1zwwnk2dopvjqqmgm3llzxekfev854r1cl1m9i2uex3eoqmsfta2g07lkr254legkve74zblcaw95cbqyv8whlpurfznhh5ry0cnqb7g0w7gbzi4ooy68niehxenr6qufq8yiadrrmpzams3dzx1',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail is too large, has a maximum length of 120');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: 'k7ju1ykonn1jr7avwrtf',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: '3n1z78t693thse299ey5no8zvpty524ykqpmnjhlcb1ubi4s8uxklwlo4cahc4rwoa3tgfq522mkw80qxv2c1y0o4paem3ygzy5j7bqa0j2249j1rydb4flrww39cl94x72vsk9vh0wr4gp8sjblolfsurzpt4nnliyigl2gbfl218uc03l23s66v44pt3ws20yitey85e0gbiy6872s7twu23bmb0xl43rkbkph0jdv1izcp52twjzyw1agzq0',
                name: 'gbnhrv57ftf008bee29a47w6bu4aya26g4o9lmo7lmbs7q3z2o467uulhz3x661sd93e4fgjqixj4utvoskb40riq0ine72qedj25qwwrn26627ouoeay426i25byfsu120f4fbn1kswm45m8llp6ua5bw7cgh9xd5475ipji5rpgmjm6k8gm304i87ac8wyz3ojk91wcjgc468yfnofvzre56qzcnnua7dfp2x3ppzni2o3usjbcsx18eijwhv',
                surname: 'i9fqico48pv979fb5af13vszvjztiicbax0jbl68m419gpbohb3l4oibt82o77uebrwmdazuiw41hg8db0jstcylbh42iyv3yr9775dhtgpza67m51yxr9903g60ago5132oelnf4rjuvtubx4eeev0gb48htancre84m41xvni7dopkk8alibzqlkudne8rv9xy1r589drxze867fwpj8yhcyht6vqteq744lrk35xxcqoktaldka6jcwpogu7',
                email: 'prufx9lfowrchslid8ip7s7dri4t8gdoecdp8c2t9i4epk1fffwlg6y74hqmskje46oe9ctisegclg4rc4i9spd5m1ovwbroo92y4mvdm7slvxsih84c8z4m',
                mobile: 'hy1ntw376wfoghfxj3wxgy6pi3m27ypz7mylxrhlyy883zb5w1gze0ubogkce',
                area: 'aefj3yb3uwo6l34l9zp6isnd1okpuv4hlsves018ekkycszhe885k8kbkf26byogthe0m07c68egceovlrnnzg8twcu5ekta3t6nf542xryqc1ev6p26ke5idndlswhkih0m361hvxqbxfob702gsu4woyqcys669mtvj6sz4j95dncegdodg4oe4ulh7s4k934t1xumvzlgk2yjb6dg760tz8c5u6e9un2vmjd1em59bxbxwzkiudqqkhazubv',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactMobile is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactArea is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: 'igrf2nxgy5ewv0mocqtc',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: 'nnfdls1bkhyddtked3ebxkbcxt7m7k1thf7436tahfmexjl8u3fxjaqxpkflwbkpmazv4j2i38iyhv95xrytbkpajhrhh1umaja96t6p4mnv1h5p1d3bbclte4564stqtwbhln01s78h1rpk29o13tzqaxsnt70vggz2f62cmujcgl71yfok6aix79f4zy8bsd1qswwihate4rdq7oz0v6qo3khmg1g4n27ioxmoc6q9x2yyk2xxkcofc3q6b7r',
                name: 'ugwkezbi0wq8l1nqi5o2uzhoge849q97gqfckxsmhvwx6ziy87urvt745im76s3y6je4efbi1yn0m0tn36l8arl40tb3eceeulfjfzilvsd6ezio5amkrcave2fpvtw022vrzhe1vxf563tf18xh82847qgpmlpautlesdwlanr7t5jbjeocy5hlfvqm2lafxwbwnvq7og7tpx3bys1q9isew60xf97aa1qww5ld48mh437cv35t5yal7fgvo1r',
                surname: 'm2sjzz824pw8iutylr9nby72wac85ov6khzhrorxih397yph4jt5he069ilgaoywliws2e9ep9m1rkvwlvk58e4iwyr977y9vsfm92or1j4314pk3utxsrkynabeq5curmmih4naqlvhc6f98i5qjv1pyu2ywefsda1l6s1cgm9cqz8oh21u495u2fiknqrheo8mdjcvyq8m4krjmyksva889vvhligog04kvlmrq0qfy5f2kxpiexjpnldrwaj',
                email: 'frrptnbr0i1de29q5lqm27z22zn7phao7j50mzuzdbn3u3r34712b5pt8wt8pi632iwm6gzu852rzssb03zicvkwpe4d2cimbybd4qtmlj57q76e529ya568',
                mobile: 'd8hmsfcvzg9xmura1zsd7iyib7xthf3mcov8731ckfw5m2olma8ivyqmejn7',
                area: 'uvv9t9xqoc9pkwl3gbvuxdatw7fw79ud0hi95bs29vzr77vksdql964izzt9bqtza1xcy02f0z4m31dohhhgymj31yz1u6b03gqwdkmgignyeaubnj8mwm1l3cwtg30c6nxmioq4l7r26a0thr2bw1ulsglpobrm9c4a90et6dj6wov6llfhxqcvhqbk3d7qkylhyecfgnzvkcz9k3i0ln4m1q60mf3boc9dkcp23uec8n2guz69dtusmi93b2vf',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactArea is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: 'qd69gxjaydr25fd6jbky',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: 'in0rpuedcv0i0tp9ri9e6f81l2dtffgn06ud3wmfarn26wfmp935oly9q79qfq2ghul2x2714y6b0480v7fkzzk20b203ip2b3f1exjus9irnnge5lluscw0e75ily3zfkgfhbq7ilee7vwqqxofjxi784myf0n91ge2p1v62xg10ew3kmwyclguei7pir9nhmuhh6rb7x4xn7o92hcj1egmn1ovedl3bbv7luvkqsojw4e0gu06xahyhemmk2s',
                name: 'npfy0t7oly3xwvj8b4k8bxhiki0j26iuoz16l77kxeskubbm2df1yyswjiqf8m0aj63wc9harql75lbl3uoanrz8jqvrj6bc0818gci3arrmgrlqjijb5hqx31077zhk3pbbc86xbo221m353es7biu9v458tyk30qa6pymcbe349f06iz4ov734gmbplefb2p62pcetcprbcosjn3yi9bpuziuwc6hffvgjzjn2zz92j5x4er1bdy3oqlr31d2',
                surname: 'bwhgex772e1vzlurta6pitnr750lqx4jirl5u5gwxbvhwa1mu65z5evvil9h1hzttmkql5gvlafzi2jh854nnezer0u73401h9vxe3wt0sdhztpx7ishluzdyj3mwh1js3kmssix1dk5kvlpauwx3csxzpzxll8uhdtq4488629zh5yse6c3v212hmfqxj7l62zttd78dd16emovzsuk93516qgf3yskuh9cbtyci8j10680vclcq08qmq1j4j2',
                email: 'ahwpb86y4bp851wrhlhhd19u11t80vam2skd7r172iehq1b6w57usujpgoxt0e9sbh7gi8xviczh4uf9j6tcarntistmjivlentsgjllw6szixoj6wglhd3x',
                mobile: '9zukpx9djvz3l495xxyj2wk0ulb15ixvw219d5xsi7u06658qseip7pj8o6q',
                area: 'hnhyloh7vc63se7jnvfppvi7vvutoy0ipo9sliss8fogw4jmcifywhyx3oboy6wvlkjg24ivbao11bsuih6n9g6hhkep6ehjrrcahfpk8hbf52qpki05r75kxf9u4dpjr1eee8u0wn4nyudq4r0arrerqvzjx06cydz63386p1y5qcr9jpalskb85xox3647jgvyjs2aql0fne7zvjwr2ex1kta6ivbd789hur0kuh6q9zyy2rs8ydzuwa2rip1',
                hasConsentEmail: 'true',
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail has to be a boolean value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: '3fzuv13mo2spkkfwk4n0',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: 'ro6k4z6k162qmjs184ct6hf4gfy0ay9w2dmq5vw5o1947ro8s3dtqq094jz7dz697030y270myjubz9vqpwcjyyqifaqoj4e78839wc9dlzgk2s1dhte30sh3bg5x6buezxlddm5o5r08470wuwmtttvekvjj2ne427qctewvrhmyoc0q6sqqs4ayf797lp4dgb4ivmzfzjrk3i3c5nvrjgh5hibu23nebhe1o7usvu7yt6hbisqwf69z0rq3m4',
                name: 'uqrlopd4dlxnxx03ozmjfoppzntgs6zt4935serzah2ay7y4ya2ze48sg8523jvlzkijiu4u8v6kkibufddrout3v4cav8n1042l9ugjl07a6meux6ii9akumsqwbxtq2uaw0cy91s1diqade0tsch1v8ght9k8lplywd90d40vtodzl351d96wcrzof7b0bawqi74hi92hei0ow7wh9w1aqjwirq8eh19a7ott6yc1hmjp03m5dr6lb8wg1xnx',
                surname: 'l1yjob8vtvg6afirrpe59kxwyw9a408rle03n5xnmiz5q930hzz4l9islqv0kscaluk1en0hq6hb1vpt732tsjdurx9inyi3rooswvh0d785sq81azv57tfajlwp1dnvsj36bs4875pd49r0lrbyuqhg0hk3czv6empuyslly5t4wz79jpi3viiaiyf5q1q43pnczelth1hrzondv7me0m2jbno89luq2twmce9tnfzx2dsz9fajrppwdovztfz',
                email: 'n5xf5hvobocqltqe36bpnni2mhwbcea6ak0jo0pvajxeus4xw0icb9s4cbwam6afn9dx7aoybeabo0p7y1bgknfomp3jryglrpvoz44opfke0a9ige99cjh3',
                mobile: 'ez2gzqblq9gdbw9qm87h9vixvh7kyzhmfjvwsuvkzc6d8jmeg2qhi4n6ql25',
                area: 'httdtw7h3e0oxf21clw23oc1wzhotzz9i8xtr52v48jecm9j0b1l6sopqowiswgu84bmwk4afjlfexpna8vvefe1nq2pncfhvirzaa9iqlw92k1fgnge1rvurl2qpyfasm4frncm4y3cccjli1b5f1bp4hysvzld08x8xcgpe133vz16gxy3onb3m39kzuzqpbajyu1gndf7edacq36d1ykb4k190w2t3i56x1m3crfbxlzppnjdm981e40c8s7',
                hasConsentEmail: false,
                hasConsentMobile: 'true',
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile has to be a boolean value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: 'ddj8ul4dbfh1k169tabg',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: 'lqm2zp2bls3r7hzhn6w9s3p24ug3fzxbu6j7t9xx9gr9zwvfbfx2k1o9twqwia6xl3lxepmrvxyfru4xrjss9ozre1h5nf6pqnsmsmtd9j3hsqypjs8of8hzc34f07hk2j9uoca7jbwsjpksl0r3l6s4feiep7we2b7mthv9as9ap63101ts9nkkl48q6r1voin7h94w20f81gocmrypa8c7y86c8fe5vp5i7ps093w9xwee8pk3epn45blin7q',
                name: 'idlelujvap54uiw4v6crkbpu6v4ucg1my9rg57sun7bfx08wfntl7u01zzpndc81gzvl00z1ym4bepic5bufpn9kyxsjiony1dw3zyig3gkc5zl4eu8lolukokph2ak340oagb0jtlh1o846q3ixraxudj0dlqemjb5sl1ni61lxxkt3az8aqo4t0ldidtwruutnwp4t0shz98mdw4pj9u2ddq72kl1y85may04yfz6yfu8ch868hfdycgpjujp',
                surname: 'nz7x5bxjue8dzq5pbn83q3llfvrjyk0o8t7zfh35vce6hdfqigxqu6ymak6wkny78o6lcg65dmrzajqq9us0iw6jfq7lh2cgrf0d0bs3n0xubkrvvka27uf74oxlm9zc4wqhzrxpfob88o1zj5wgsfjsr2n5uz360brues4n124i544ctv1hfwg2vuieyjqoc2721xm8ctwxfzuq1cnt5yb2wafxrnxpkswgf8685pdbv3nbjwvhaz0trdoasrc',
                email: 'p5w2xy85qeoty0ku2fo1bovx8cah8paoy4egadawnm7b4rwm9o7x2v8rd53ujlmbypfy4d46qq54pjr05gy9knz5f4jm9nyklss8bvjalbgh2zbsi3acdhy5',
                mobile: 'gj5m6x1w7ulo6ougxtj1oa7vmnpzqoss0wbswoikgzklonmbtgdo0icj0nuq',
                area: 'u9oxe3pzq4fxd70rjfnggf05zlp9bx2qymjhuj2ew16zmfoh0xwrqr2oc5z9ks4e4dojf9qpqoda5yheaepc3tx23qkppt3l8gf2bvf6xh6lzq7a3gvdmf7rkim0kx6uumccxufyclzv6h89sr8pn8vzgho2pvzadhe7g2g070arcek1e3ljlgpgyovpuy982wkhfwtitaxt1nk6rza0g49htlgu716sf5e1r9jlx9o5h0etf2o6x51fvzoh5iy',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive has to be a boolean value');
            });
    });
    

    

    

    it(`/REST:POST bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: 'ctf4a1jsbab4g6o511lx',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: '368tjtsdp2cy1me2t5n95c75hkkamadfvabh9clgj5kcrdmxp5f4ryrqnal2jnyhyn54iueuiv2ko5rj8nst2s6jcr7mktrr6q8oclnvawfxr1z3jc9uq99jjh7pfdvkxdgbvuovg4z4ajiql1hay47hr4shzb8qami3uz8az4xnw5rntvyghm9nkifpq58gasekf4697b93bb7gllicizqhwpc2vo9njntcoxxqortloyxmdc98lgyatflrcg8',
                name: '9u10hik11gcptpjcsjuy8ddp616jdw41zmq5ubcm80rbekhwpy20b3ojdpxb18pbobkk0rxwumdzwrd5tfbqsonvdwv4qvhmkbbyx9ncx2xcqr7xj6ccgqxqhojazni5oly8f44esee8nabnniksh48b867kaz3gq733i63e5w1zfep7gne9jypl96m7xsdf5lcic7opp17ur9xzpknudziz5mddp2leb2astw1111agfd3xomfg3364ndyrfgc',
                surname: 'vvet27gbwl4cvuxydt0f5brggzkqfbo0narl78cnus2hehn3sm59q5ibq4kjcy332npd14bcczv1nqhj8e1dvtckc6ysdfg1o46p50awgzzyp55zzk7i78i43mkxs4eli2voig7oklqnbhh6q9g8i2jruq3jbyc9isykl0u9ueyufou2cdtfdrq5dmsny9s63abtbg4n0av1lm1cb6vk224rsv8dro5mb6d38v51ggbzoya5tt0me4f9s4oad18',
                email: '4scqcvx2jx3amlbfi02nffo51841jiglvappel9mh7ylsn88joo2o2ra6qfb816slvvz7kbqt4c4stn0ydf5i3j1po0mo8qb9c7mje77tsdr4g50ujdkrkyy',
                mobile: '8760twbuj3af52ql5q9l7ndjh9kz7eg1d700dstzs760sgj8pl73f60roftz',
                area: 'w8gfxkxxl9dl52fiuehut5n4xq6rh0frkrk89wab9a9ghy8h0dplkwvut6ccbsf3zpulkri3lu4ll6iu3gwxhb4gw17tsndp2pad7rkefsy9wmspjyxkh0g9qme3uo2emezn2radyi8dad7ma5gjw5ujt6ta8xsbdlmmrxqouq4eqnhxqofjz9dr5czt0e5wtyeyayclq4r2xsvaz1ti66y8a2ganecausm1lvhj2a29wzmt5thuos4auy6lyxy',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/contacts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts/paginate')
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

    it(`/REST:GET bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact')
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

    it(`/REST:GET bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '6e521ac7-7f34-453c-b979-6cca399cf44b'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6e521ac7-7f34-453c-b979-6cca399cf44b'));
    });

    it(`/REST:GET bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/6e521ac7-7f34-453c-b979-6cca399cf44b')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6e521ac7-7f34-453c-b979-6cca399cf44b'));
    });

    it(`/REST:GET bplus-it-sappi/contacts`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e2200b9f-2c65-40cf-aa01-d8f1df0467ea',
                tenantId: '30fe5443-3c2f-4323-831d-f3c3b9f34f91',
                systemId: 'cfe8e2d1-b2e8-4e69-8ab3-8ef27cd86d27',
                systemName: 'jd4sszjbzrgiyou539b7',
                roleId: '2bc5133d-61fc-4f83-9b79-6afe6a0898d7',
                roleName: '2e45deyka4oukb072h91ief9j3j9rqx11z9c35wnpbik2h4fmdotxtijuzpum4co85fcdyz9j8qjp83l0dgytc3a6qaymhgs2y8s0584f8d7868h9egwuu9c666go09fhwy31zsuec0qzvy9z1fk9s1rp3tfa060lplrkrlyotupuyqs4z0f4qz2yrozracl94y9ujg2sojn2c2bxq6r8w0ccb3j96p8av2oa1uzfpvo0kvkatbb6lazf5mv4iz',
                name: 'e5ytfigqqrwo6pk5rjlrctjpa7yoag9umki51ktgog0vr9pl1z6ri92uc2fc4q0xjdp6lbdrbnqgkp9m8fy2xcwvagaae8hrqqjhxo4324kubwtl4qe2tc4cfha63yxhc6l08h7s3ri5d6ag7u8i80vevir0ljoyo282s5glb80du0lxbvssjil59w1cogfq9z1ju700a8tcp2n7dj5a1vwi3hnli1od2yxd2w6t8p6xzr0qhd5qremjwpik391',
                surname: 'xf4rh0ejn88jiiz0yi1udo96utb1v7v4hpyl3tszta2f1tvhq2coth26sf9cf0hdiqf1dseozpbgj3qa9qyjniddccpxo5xpvyt4f9fibwa1s93dc67ujp5rrbepyl67uuf3mz68hujo9dh8k919c92e9mduqzn00dbxtqsskan3rchsvusxeedj4u3bu38vr5gjptsq5mbbvhcui8z7izhfusvqjgcdfv7cus6wefpkl8iq7aer3dpha53ci8l',
                email: '9czoltb3q1lynpaavtamifswoddgaby18rl52y055izjpbe4zdhhc2pkx5esa222727jht9aq3wxhq34gl9stb9pqexahwm89cks77h36gvu5dtst1vrtgmb',
                mobile: 'hbjl1pk7ajys1xy9p4odtaggmywrq6elmfdz49qgbosw4jh9kfcxpzd5c078',
                area: 'omx1olidole984k2oi4xd6bp8g04wlttm01aww49wm52g8w5g3pauuufbszm99856khcfnji3ap23ozd50nokmwhjc9hbxrygtflrljfg30e3ran3na7m5bmes4dqmb1ahkxaqg0loa5nqyre8ey1h3sn0ydsrprjxom0a4ut2jd0geughc5hjvd0n8otg546or0qpasslnlcy949yamr6sgp36ve0xjih3nsmqt09oh6op8mixz6sezeqnf7mr',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                systemName: 'ifsxf3k6zw5txxwgpe1s',
                roleId: '607751ae-2828-48ca-818a-d079459234a9',
                roleName: 'ymq7g7v1lfrjrvubbwawcx9mubsdcdlxwbzxtsogz0ilxutyrng028yoeysiaaakj8aeo11yqvsvmhjbql39ssdp1gwvuxlk19x6gydhww51yqfaasxr880g5cazrcfh3dxrhh9cdx88qmjpwgzjdjakg4xsrai0mprpb15wlyx5311170iyk587lfu41nx50txbe35vrccnc3psso8j9zvbvqheq30pkf77ucirubrcqtehgtahlaqhjsjylb5',
                name: 'pmhv3bkhb8rn205qg86a9nfk2r009iw6e1auot9bmgfk0ac0ooq7v8zvtz6o2eh0ulyytv5npk4oct1p8ixzuqtlxmm9rydlonm1s79kw62w7gf3ves65r5jw5r6i82qjui4rjy8n56h8a3gghhcqnxrhw3b0nzim1fdy77m5zd3t31ysogyos0lbcw69ak157emt21z3l70p0lm7nlse0b4lkt2gax4qjustqx7ud1n2fjq5deq8h43u6086ld',
                surname: '42u9pxu36vonqwdwusonkujigz8kv4l7q3dx2kzv95kysduqr67543eoq9geox65pca9nn6l1mdrhkw423bpxzrw976v13gwuhy64m9cl7ou7hlqomrquaowwurmhqhh51tqy3d0l4dxd2mo8kr2colvx1s8pqjhftf8gztzg1gts1vrcz1i5a6sla7sahxyizabx4oopsjsixr2e4gynvlr0lelrz5mubj9593sz1mzd4zj81sdhbjtxyijsd3',
                email: 'gy3v5chqw39wf54ko3jxge92tmrl9kl5oamt8zzhsxlxl7hvsf6t66hzpg488ol3e5wuuftrrh7duvh339gyrua3wby2ad67v2wqvizpx3vnuk7y12t8o8ej',
                mobile: 'e9jk32u6b4jqv5cv6mkxzeouc232eq1362mc4x1eyv1d4soxwmrlhki2w84m',
                area: 'ed3npnee3w0poq2bp9kw622r9zqrtcjoygtwm2049f5gt5jbxwndxq7gbm2fnqv5ylpt0yjfaelm755q5qmref2g2ok5th5qqyiwvr0aztvjdmkb4v4hoxur3aq1gscrbfuh3c6zo2fc6zmss8ckgal0b9bm9p50w14ubjkog3zri612mdg0xpcqvpy3qylqr5kmh5fqt58cny91yrt0gyowaoubxf36llzlc3fs2bxi26h7dbkuqfk7qvly9jv',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6e521ac7-7f34-453c-b979-6cca399cf44b'));
    });

    it(`/REST:DELETE bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/6e521ac7-7f34-453c-b979-6cca399cf44b')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateContact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateContactInput!)
                    {
                        bplusItSappiCreateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    it(`/GraphQL bplusItSappiCreateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateContactInput!)
                    {
                        bplusItSappiCreateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '0f9791f2-6497-46f8-9c8c-c3436b20e849',
                        tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                        systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                        systemName: 'ihszy568hcjyosedf2sx',
                        roleId: '607751ae-2828-48ca-818a-d079459234a9',
                        roleName: '0gfc078jqnpsiuwr8uwypvfayyr0o9x5nar4fh8naacd7svnke2vnwlacdntilcey6fj76vnfpfuyp9v2gg2zcz4jmni7ee4wggrjwokxhegjctpwtd7qop0qpyghti8hjbvvq4ai7knc38jreqsygw3kysrj5n1juskd7603b6whter4p3k2j87zt8bpnkmbp3o2wuwu2ztsz51pqhea0jwl53fgn7f3j0uex5gw83lqytimd3or9rf1jvtkak',
                        name: 'ieov8qba4g8i0bjguzoodqvbg55cwjhgf7nq3gu9z4zsfgmjar90jwmli25x39v1pmjq7jaqsz2ebjo47g3lonc5adne21nj5t6boxo0fl8xwqi6mrvnyxxzdt2879m444xy9nfx3be40uywqcjru9f9gchl5hhq9gkrow8blgbw4ohbs9abgql1iwwzjto48464yb1wj388qmfw28s8lvg95yj23c7siftb4elcib4pg3tni5mfqyeks2n7cr9',
                        surname: 'l0e7uprj33htljx34zlv9xvmz01ifw6jwxoc5d2i9yg0ovi6bihyefcfj4exgnpy1di94xg0oyfk3f9fayw6zppavvq9f6nlsi50qdvcun7fd6nkfyrpbp6s9m0r6h1sj03d7echcdhytlldmur0nislmn4hwmo6zycmhrnnpvu50kifh0415ip128z8dee8qcnmbsg7cddz87ccq2zrp0qusm65r08feqyjmzmqgalt9eb7kmkt6hfltrni09m',
                        email: 'z08e6vtdu0hqffvkm5zhs6qjvsq6bl4b031kmgb0vwoawmjzmeqa34efbkevlt609k81cquybl60kqpo2n5zrpenwvpcoej0ojzuhu37at8ckbt2xjts1oqc',
                        mobile: 'i90ywqlrarvo1uo4w4cle3ihhc6cxzuzx8jyrbjhj4bjorsf82crn2md8egd',
                        area: 'lq5uj639on1p55hpn8dex9azqas8fjpw2kq9jk6jzv8hsdua5cuigsk78xhtp5d4erf2ie31t9xje457j8u6q2th15e8cae27frdaes18gosapf88n7wthpkp14ifhjqa2gjqtd4ibqrfi8dspyw915mgb90d54fxbjtmookb9apqztayj1inosssv3ize7mpyeczvon6rg2mc0qtwh75vnxviuv5h5xg5irvevuwfk111dixg6f8kdw47jzgh6',
                        hasConsentEmail: false,
                        hasConsentMobile: true,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateContact).toHaveProperty('id', '0f9791f2-6497-46f8-9c8c-c3436b20e849');
            });
    });

    it(`/GraphQL bplusItSappiPaginateContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateContacts (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateContacts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateContacts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateContacts.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    it(`/GraphQL bplusItSappiFindContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindContact (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    it(`/GraphQL bplusItSappiFindContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindContact (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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
                            value   : '6e521ac7-7f34-453c-b979-6cca399cf44b'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContact.id).toStrictEqual('6e521ac7-7f34-453c-b979-6cca399cf44b');
            });
    });

    it(`/GraphQL bplusItSappiFindContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindContactById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    it(`/GraphQL bplusItSappiFindContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindContactById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6e521ac7-7f34-453c-b979-6cca399cf44b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContactById.id).toStrictEqual('6e521ac7-7f34-453c-b979-6cca399cf44b');
            });
    });

    it(`/GraphQL bplusItSappiGetContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetContacts (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetContacts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    it(`/GraphQL bplusItSappiUpdateContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateContactInput!)
                    {
                        bplusItSappiUpdateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '469e6d0a-123b-4ff4-9f67-e363a65d32a0',
                        tenantId: '7710429e-d751-4097-81c9-dfe37b5d66f5',
                        systemId: 'db248d37-f6e4-4cc2-a5fc-f281cb50c841',
                        systemName: 'maamgee9znpt1py91miw',
                        roleId: '27f917da-2e51-4a30-83b1-a5947a9b01d8',
                        roleName: 'zzyithzzteu9rm33e4n1ogpcf6evtgwqbnj09fcrwqnif7xjhjqhncvk67lw5xapexhqir00ygp4z2aozfv1cyv2jo9fijb73h6ipr946st2v95q3otdmpeggvud5g99oq9r8hvnt2595l9dn5fvgzas8deq9dnefyymrq2fa5w1c1jj5vupil0gjb62clysptuux6fye98bxhtz0l1ihossdxsgzqbg0mwzq5y4ff19wf2q3o8egrsgoxrx917',
                        name: 'oforvbmnlebvf40tvpez8o28c8c80wo2i9cmgavf4wr5cpcozqytwclzhj6xxpbo5mggelwnpo9kqfekcpbaazapf3ez77ptsm6noe9zsvivdgo8s468p9s6va8gqnh06iyfkjsymxobmtyqlqatr6iwuvt0n2gybezhbu0idisquqodnry7iz3rya63r77lmx2nekifce42mk9bndug48rpy5lz5cdskpf8dabsiu12qshi2n7ofxwyjnt4c5p',
                        surname: 'xncq3e0plgofi57p2an527dpd7h6nqfibtp65tix4eji3fdtvfiov84mzt03hkxnso8k5r28jy422uwvbgfwmelho9q8jrob3qcng6602f1yquwnbz13z2bhqzidgkvabegtkhihzjlhjezb9wq4g35gs782h5b1fc8ndiftyzidq2zmn5g9adaepn81azqehxg5x4pvwe901q6qh9mqnw08yyoqqqn78uvxlficztpboll0qm8gkrnffi8sy1f',
                        email: 'x47mamusrouf9qqsiii7lk6u54gzgvvtu7a2hi81be53y2333wd65jvvks7wsacysfyon6hzjvuu0pts01uwmk0x9491u0msaqcopiwxdtz18law0kn3yjp8',
                        mobile: 'oo89enkejq7wlx8shhng89fgb5v64v29em5sd6gays22zeerwbfp9hhy3ix8',
                        area: '90pq0k4yo67bztkc29judc0tnkpkurw083xp1t485fcfcnvzee5yy6rwo2v126uywnqpsdm4hud8aofit3oxy0uuv0spsrg4gcmc661jc8qmml4yrl2yx4e1tnh8ko498fse2gakrgkzbby7fa38443g3z0lculj92pjtav877q9oa1m5ii07ihuz741zm8vt54ovkodw66lbensaoy25xpnwe16k4q7ll4kaoc8wizl80kgv68anws3jzz77ai',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: false,
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

    it(`/GraphQL bplusItSappiUpdateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateContactInput!)
                    {
                        bplusItSappiUpdateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '6e521ac7-7f34-453c-b979-6cca399cf44b',
                        tenantId: 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
                        systemId: '656171ec-fd59-46ef-b5fd-d64472f2ca81',
                        systemName: 'cg2ko3cxhgshfbhxfhhk',
                        roleId: '607751ae-2828-48ca-818a-d079459234a9',
                        roleName: 'nw7j3e4jnfi1jrs4tp80k2pam5ie1slq8ocbsdm3c58knqh6pr453g5gbfwpjztaerkhomwmnf9fevzenj14cp8l3hq7wbxklp1vw9xjb1sqfc1riakin36luck01v3j0yuy7mlo6dwk5f0nmxrfjc5s27qrc7gfq8r2fx6k893vsdz2uyfdg8qiqt49xcty6twceb7gnjxtceq72l5zkyzpsexekae81uw7x7v5ktwer1x293u6vrch9z77o6h',
                        name: '2deshss0qlyw1pbh63aq4rmytsf1w1r0v59cu3tr0l1fmb36h7rsbt07p1vuyyvjyq8rfhmxel765xo8pz7j8ceguf74h361aopwfgft3ooqef9x7nov2b20dxoegqkd7y0hzquea58uped3zippb2kvf8g34vq3tag643cfsih8rw0mu2ounzh3lc8mhmid8cne5yjbzhcugjlm7az85to4kqsjw57zhjulji1mcourosp866v0fu3rdwu677c',
                        surname: 'hzrac1qvkjftq35p6872es70xf4n5ku3xr6fd4c0630f9if9e5pebr4j91q3403mc0us1k20ahl0pg8xguvjt6gtvgx3697z793c48fz76fb1s52f038pniszo1nmggl71ile1q0yh1exr7mqw84d1lqlwn8g97w2m1x4hc9j720ph3eic0ej8o1wo10g6rvflbb7j0z17909eaf8v5t3j8ok84bwzrfkgwv08z962jhbetf7xj0p7ayw70vqmk',
                        email: 'n2vml9x24byg6f7idc9t3l34u5yo2its3jlwfmtvtyzd02rx6yixnjkb5ixt4xjj3yiwgqtelpfkutk7v2nsjnemwyn5zxwb1yn46o5x7je2caa6gmk1iren',
                        mobile: 'cx61pdn2w1i9i18g3qc2ra96zj6fiih6gplkmfek15xkmash72iqqyfbr2ha',
                        area: 'wl8xn374gnb5r1r596djvq2ru19870rqelb5cpplb0bpde2gln1oroertak059qjzq9cbmlf1x80tl8sm3mbgozz6fkkui858qujfp1uhoxl8q4jawgrzedij744gsoaqscd0bzfv6c0o25x3sd65uddcl3q33qic0s4vmk0ugbbapln7yv3vqi73aqe1m3ofz3unjaw7xrn0mk9ecc0nh5rw20i7s56gmx8f1smbb603evlsf4mr8joqyya17z',
                        hasConsentEmail: true,
                        hasConsentMobile: true,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateContact.id).toStrictEqual('6e521ac7-7f34-453c-b979-6cca399cf44b');
            });
    });

    it(`/GraphQL bplusItSappiDeleteContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteContactById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    it(`/GraphQL bplusItSappiDeleteContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteContactById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6e521ac7-7f34-453c-b979-6cca399cf44b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteContactById.id).toStrictEqual('6e521ac7-7f34-453c-b979-6cca399cf44b');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});