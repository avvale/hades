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
                name: '1ltswry9hkdf7a1r7d5opmd99fcoeqxf1e0hc6y21fhbg3k8w1ehr6p2xvgcrp3hifkyose0qx2xbvcp4i7mbjzr1k5v12vyed3xh898xtbri75p5zne579dtspkua5ib1008hqeyce0bc5hj04x4fsa5w8kr79rtjjltlbth3vtz63edt1y7g5k3is930teoqzrdmgiah4fwhv85xt1mku7ytuk99i9nm8tf895dfon35hao0g9sytpklojbxu',
                pathname: 'd0bw6kw5nunbgmev08nvpzflqsmqiu4jg2itbdsy6pa2szw1ubo4mpfoaakgd6quc1x6nm9ef9l00c4uln7xaiw58208knvu71u5bap134lg4oxime5kakxg922i8mv1c0gh4ri68mnwgh3fp1bd9z149cpqpis3j5acljt9it15vv7csav9u0fqyl01s8ezalveam9dqv301dezi1122narxtseanbuf01z81wxfkmdk550fgdum1327ih7l2f3u1enxmdk2mypvvnqr8x7qfwc4dq9l2hf79qhi98k3kq6a3i66ulok03ydq47yh59440b9k8n4ilkwslp25vez0mql6uwvubmg0q67foe1nwrwe8rtkx3p8gzrknn6gyexcy75q6j166bh4exq2hp6i6oyau27p6geuvohvhcl3xowqme03pv1xm3fv9v1b003dm02t53s46yrzjnhaf0s26q3d3mveeks26d8p6uj9c6quruabxscj1qu3hpq5xgahw7fkirr5gwnl6oosuprh1ddnz0br3bna0w35bmv5uick0c0t60qbt8o4ls2yt8c336gbnijkd14ida7c9cs9etc7d7in43hl2f81fnoka9d9v6r7ioiqajtku6yeuvsuysvjmjo9up8juwzrj0pehz0up5sf2x89bl67nbp99ojjpt6xa1barja93dj46vaidhyz9glfdlzj230s0ml0yj02n8cyjmuhxpc292m8xdum5s99hq5cbu9s31ohiy2y5ycu5kqlas0ty7an7f69rdl1gxzh7jbks3sokm41hdkpvxvvgza1lbyazgc0io4j4dfb6mescfz59e66zdt4ity2exm4huxkm8vs860wgzs2v3pwhihjdkymfebiupi768pkrkgvh8eecix6a71ww0t6sh6p4makt9uvfqtkamq5tl5m0bupln9zjp6oh1hj6uu7mf10e3lh5f67kd9q5dgdiydd79dffmr8rry381tgzbg4040mo0usy3gi0t',
                filename: '4zyf3oky2aqyao8lto5al7oyt99vtatf0clyth0dj5w9p43mmujfiy1pccgv9jcwb7j7m668mwpqk3ct0s59e8fmp26r0rnrpnpfiw5ot833vq17okmsq7gyvruxj0lptdedlq9tibgw6nufapq7w8g3yn7fa5lvk1rt0x37kzledrvhdd6ced3hm0500c7jmvc16c3dhmxfe9cbsp8ggwa158q6kdrnyyvt7t4bv1gtuor6o5dll57rih5gpoq',
                url: 'v8i84sjuizwo7uvd0jvpxk515waqseokpd4ayw6rp2kek0jyrbhyr81zpbqv0c8zbsx3ek38e7aaix2ypfwcekvm1gucgjmoga5vgvxc0z354ehrqw4nod0oqcy027ag7yuiktg00lxywi4f6bxjoxkjmkpc92qq3yzllp7qs6mnb4ev6xk44wgb3duywq28mjaivhfmjwdltca7m8xin4b8l0iif1xnz6gkkiauuxhbcle2so5pdk3bdpqcr6ym0b2xdngy4uox8vs1mronoewgzse60xn7vrx3oy7gyais3hledo2hyqp27i3kjqf2j3bhtx750l3somhca66g4xqpjvsake44lsb043xrocgydg8knzjyt3wk9eqj3b5ucsfo59v6s1orgegxwyces531dlw1b3qv3d3fomig3jbfqq372gllpzu8rsf1x0aujz4in2dbcjjlpda50q2u53crvrxjuc9yoij324akgosqfi4ch99qzrzmvq08f9fs0dtugtxcraqw260nthhotx1hy8s7hg6dfrfrza7hhfb8ybo4w47t98cpjg5zsmbp9hrhdrvzwd6y52iwvmj71h6hsj29ofcb0pkmngd34q7phog7l27bawtt605yeyjhanq9wwk8tobrsp5a2m1bdaw5thg5rais1ij4dl7em083hb6kt9rlvq8cign4hwlriquwop1110kc2mpptmgc0djnb2gi4o998dux3zfue38sgnrsyiem6268k0skah888ii1jgioltf0kh25r5cshz8p0omg8ajeya84m9tblpe3l048gymlkh7ywai9kqr28fwkyaq5tp1q0nrputxljcamas7gfde60z0a6a33z8xvkg8cp0gxlshj643m41te68lm9ph14hulnw3spar2fl4347ah9y0yzdjs850sd14cd8gy65lrnwwqirkukv01toorfmskcgwyqx4y3hdvwnq0wwl11kwzs0rvqhkdf7ezexlg4076dg2uxx6egcew',
                mime: 'v4uwi5omt72da8di8b45qbw4062i5fj6mxcvx4ld7ovbi8mofl',
                extension: 'nf1g0k358evobqvr50x1fa8eqqf13383th12dwkc2dsihvl776',
                size: 8069619637,
                width: 349439,
                height: 457734,
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
                
                name: 'kikevsj0p8bqyyk2sur306tynq7ojnzlbn9vpwijogvc17cmsgymd3cawz6iy1yny0f0s20u2w4bob03rmda0g5te6patjdb9smcjkgo5k7jagsgh5z217jcv37rpkjcacgzlzvrrb3xdbbuhzbnwzdn5elpu50gy9qia0ytmyovxk2i9m394aagq40ecxbfkoyq766cyenw2mtyyndyqwsigsf8qo7fm7c307ipljsimh0q8oavngmijb3g4o1',
                pathname: 'y1eq6axdboemwj0n3a9v11ye95apn8ogoajobw9ppgv12ny68p6yvhtf7nlg07t37l2dprs8a9i8vu2ts51vykorn10eqvl1ucjm37uuzk73tk6cxmyt6l70a8udjo60ruztruchuzzcsi1pekm1wqmb0osw71jqss5b1bkd1gb4awz22ry2rudgxf6h4362zv8havz7mecy40wra6een871wdrtsqyjwq2zsdpmuzw6x0qz3ohn1jkheubp5vvgniyjm2l9h83vezwefk79z2wmihxtfbk4bektbdf2v20dcit93m99ricni778fz88i3hilpqdji3o0t3z1x4ozj55r9hj461telq2byha3o5dvo96djp1kbubyfed2jxyg3k876m0lg2h0brahbb7hcp9fi8goneh44jg7nwpqwd6t3k8xzmf2j38gznzrg2qbd0ne8tvkndgdt51kodra6ik1i765acu8tbovczco7jzezrexs3oc7hpkgwye8urt4mmwygbzj0mgjcz42iyk12peplokid0uurynmr83klcl36ntnldu9yyoj5n9u1prgc7expm026fyp6dsntl46zp8v7myccqrw0odzt6joxqavkldk2ylhddsxe2ekd347enzbb080ij41jyupta1s612wwrnwhrm5eytzzh7gq602gt2flkgvhjoq1iibxr7vi0mgynyu3o0w6weun1khbvkkzki2la83xs3wrtx8gx589r2uyjs5dngjekvbdtg7cro7ifmdkjsar1hkftgkcq1mo9ujbpplscf6hfglfebhbr7g7cmbafw00n1p0tqb4830p62h5ss5mp5gpvligisnk2aoeljhua6944uwus6yp37qra6hn68z5okaufvrwthb8rieb3met01aqpnm8gxujk0gkcyfjwhbq5lzpgbgvryell1odskonxafruq5h42r7tytf0pv1jj7rbh8ogkphzaletug1c92hhvcj4gjd6gi0a39ng2gj5vbnz',
                filename: 'cw1w56mpzvourtx0bdb4osqxotxk55hrskvf8tla45kglzcygrmp7tw3be866lkztjq8n9jia4nfhrd0ss4p02cij5li0pfbg86rqh7ibfmc5mc49fl0cm7ewrzr0liafx1j20velnfhime38rekav7ga7xf88edpkdqhf3irliht0x0to3ico3fykg5jocxsfeei2h12c4caz2glr3yj78gxcdoz0obg4e3kdohxvburrbzvdofbtisggy2tm7',
                url: '0u5ygb3jybvh4xsgb39b59te1if3oodcai8jyolwoax4ytfytdljack76y8mbpovsxidc2f5isywq5jeq7lakgzbwzo5vdohvrt6h49xt73m174j9hklc3d9hjtfgymku736efnc3v1u3hp4jzdqfhceuqyzaj86j1kpydc38ctahsfhpt63f5t7zy3q3cv5lws9ro5r9gq03gepyybw5vrq18z85al536xa7fjo28fvc4yul9y2k823refcjm0xrnikp0hmn3vic5x2raytzhmxaqmsdad9z4f3qsqeazan7w7mgdytbgizdhha1lsd76672r8mypvk318vk2m7668ursxfgneoufebtb8zp682ncec99xcvxxezqr3ulfwivz70k2j1td59lh008c5ia96z1dfm44ukldwbfev9552fb0hm3pjq0p9rbb3iine1bbnml1hg3hdlqx5uhokipwidk5gr4cldh5w2bzu080zeebj9jcvvtz10wxyltn665xscg6ay4kozoagljiji72hpw45valpbi45eql7z64buj8b2jhezwgfshme0rj3wd8wjkwbdhymvl2fwmunwr4rygl4ue3deues7wkaxiwbnrces7iq1n2woie9dbk35uile14f8c71ldb841u7i67w4fsh8tg4lvsjh8d5ui6x54bjf3ccmwp6e7fkheawsnjnasfitb0fxeihv2dnaolxhh5h4itp9tj0p2818v5u9asov1ztjegp69km65hktofi2ro82zztpcowwo92x6h7uu8dze7kuhs5269pyua55y4qfg05fc4kwvk3l944hzm32fan9ho4h9xf9spctbe8d9npqzg1dpf1y66uui3h711ogcuq17xptvq5vytb55mikpwtaxqj34uvteji33389tjjxn6bhf4iepzgs5ocmj3i2v2k9avihd09qe2k9d0i6uwdagx11rplc348xoyq0dgwr5xdp1wu4r3nay6f8opiuqir0hi1s4rekma7',
                mime: '145o9lnn9k75n6jm4mn5mbyfdjgj4twrjjzlfqbpvfznm1wm0y',
                extension: '7s7dn269wuscaufl46izc1vwmhbkh3dzm0lhbpwqq7jrkyefsr',
                size: 6310257474,
                width: 691017,
                height: 209488,
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
                id: '3e5359e7-4005-4055-ac57-2d195056dc15',
                name: 'z2ts4pr25exh8svlvttbdkphi1fs99l371djafbqugmnqjmtmekn2g9pyb3tgp7khbm8d8b63j3ycq7mmqyz9bmx6fsx1z9gea8gmlqkf2lmnd4cy45zhfpipashngm3ru39h1eg430jea5jzr2h97amp7dpjgv0o702ajv63dc18hjohquhgp8zy8ftr993ydzevdcso0lhh93xzk1e8wg3wfsf962jrupk043ytrol8220ndsv83chgk7eh9r',
                pathname: null,
                filename: 'mxd6odqvb4alrpg6bqeytachmohz7e73v8tww5r69wzb1uctogk3ngp83iscdexxvgv2kvh3a73oa4h07572oa8ns6jktbpxkqdu1s04l674djnuqiuzff9ryq558lm4r1ct23d5tnj8z04ab41wfe7wm6algipk512mg2tk222zgczh7hqp1mec7hfajpnui7350rhktdr4gaeysszd5rvrro7h4ekztbcdyyo3etow4gte66kbnuhl4uuhd4f',
                url: 'mm82k2nco4zhy8q0lvfvnu4kz47gxy6sz2mxx8f7tsn5as746rhq66qqiwozdjhj1lrd48j6kbpxydg0h55hb41pwufbn1kf5asnvwwutpmxyg0u5ahdd8x8cn3flbjkghh1m609ogy7ug5koaxhhi7ruz7xfdnpwcvu8kc5ut7fll4kndfnkte6xlfijzh2d04fyqewqetu1pgnj50gp24mjid0qna8zczjjwtna3xqn6begc3n4nvfx5xo0rucq732y9c2b1yqwausy4zwmrwf9xbsb9juja1dpzlm86aav3x5ju7n6jqicru361oje0y93fbi5e6y5f4r6egextrdve2368xaco9jfz9bbchidku081qrl3izz2a44812qnrazffbhlv56arurvms2hqdcje6wq9b376529vsb3qepj7jdsc5xo9ad6lpcj0gckn78qp7chuqpkzz5t4npt39tj16uzxjwdyrl1xayr6rhhu7er1ljo5rrvg4rb4hyb5oapq7ov2prw8gmw5xywxg5ncqp9xfjtvyfpt9xf5r338slq6h1drlv9ou4p0yz5o90zb2nkvpv13xtz2kr5drhbml3boiodp1dnx5pn7iagxkqipau01ctb0j06z6rqnpa5wi2rkusxcplqshvatk2f2ybcu9b7ug3hnr0p5mykz4sscduniw6r5plxie3jen3ac3ko185fav240fr3rz0d4fvwm3jf9kwpm1hyv63174zscthnrronw687d12976596a9pheinz0k0q4ztokqrwckwdjjxecmat2c09yfb00tgefx294tk941b9s07ima5jzbhks8woiiwugu9a1pii4xofbupw3xyx2xzg3lm82l3sxcas5f36gae9c3btlla5vm9pz18ngw7z2yzai9f0tukctg6hotegtkysvel6j76vdc2yad212jqiqpmiqe0f3vormvk1srsiad7qsfojvsd1djvwcfwlkbvz9kfllqq29wjlqcd2t07aw',
                mime: 'qksc0ih6w40mgrnlpmwxqbl660w5dssv3311gkx6q5h2c9vuvq',
                extension: '30svse4p4o893cdo3mw3pabcwf04jubwjkxevsx2jn5ch5lg2u',
                size: 9768431276,
                width: 247345,
                height: 227065,
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
                id: '3e5359e7-4005-4055-ac57-2d195056dc15',
                name: 'b6gklm84wp3e2faeqs5x0x9o7bh2rc120it8otqm89ja5rexrzarwjxu9sstxbs3flv8mygo7sj51efl6jk0h85g0534qk8r6rkdlbazpnh9avmbn7inlr1b3xd6jn48cz6aivjapdtc7hjy37mw2ks1fayn3dpduw8eubd63ocqirwqurmyd8evpkjty1nefstjqg1y1gz3w1xa13tww4xnm361ds8o42weryaqk4hoof1rmba214yrfbze29l',
                
                filename: 'wye8pw4akwy75oivmbhbb5egrbv6dz8ihw8ie81gwgzraxjtstsmpznyir1gzh8r6l0n77kwyo5m2qb740023mp2vxyh7ujxou607jupr5ghcx06mias385dwgh5xhrhr6z1sdo0hx5w4yfmhzijz6j5ytwpf5r312ludspj1jq69nemq3zfgswh0a4kj4yzby3c8qdn5rxx1ktaf41nlssve96imd69ijmeslikxa0p64s8gm2jnae99ufkcai',
                url: 'q0pjn7ne36yrxmeotls2rur9lxnj6kbc77k0hkks0tux3hdmtxzcxu07k957ajcjio8zvd4voblrki328qn1hqewx66ru45751rnoi8zm4565j899tbmhfvmywfp0o8llj2hi2soqvdzsjtn368zjntsretkndkchv98usyrr4xgcou57aat9y63ekr9ik65pm44rg6vh67x0rprnz6zb75wk1z5g1c74o5erfpc2swew4tak61xckzggpyti8xfkae3qnx5d3ln9a1435o8i21ynvtes1jdnjkw0mk3ieicepsbss0wzvy7mf0zohwlfadkzmtg3fljbyntslebqy6c9jbqyrwqokgwnx8cyw72i3h9slz70ag8tnyat38p4bt62aacoyxel3we5pbwe5fzjcr8s1q2xr3nj2kqo4guk9livs9x16hjfy94rdx1nhy6w35geqdwi2kiwn1czhd4w9bh891baducl588pg18o0aleo6d3rn841raedbo7t7ouz6dhmokazd2uahhc37eqkcvk3dy8117rrusr63ksxv4w9rfxbq03lqmzd0aahwh6khhj9bezowtdozvwd62nk7lciy3g5qxtf43koaudcc7eav0gtut92dboqhh7dbgo5s5qm76hzz8ouchamtttva4w0ng29cdurjeb1xrvscqztnwmdwsc7goc069bvp9sdshig38ufne7v46mphnusvu4n9kanw4jmbqknuj39hqifkcmfkelnfd6rxdaxhb4zkv5av5xlx9wwosa42rr2zjlzeo1th6049twaj3m4hn7t8wl7sbdas45dae3sffljvebc4ahavpru9fahoufqtf44fmzbnpm5rogbw4mcg3y25f3f5d4tzubdbprudnqk8weip7b02zzlj9dctes7tki3fg0rsarwsmto5xqtmsflijy44iyxyul53d3shv57m03a5tkunzymh1s2zt40oyw5j5ejokmym7tgg7tbf9z3gimdbiaaentrjw',
                mime: '8itndketwq4uxkiffbua5wfo2iroswo7u42g9593sm3mqat6wq',
                extension: '9qimcurcq432eie23v0uouj47szbb594r70ryrgrqh3ypddry0',
                size: 5388015029,
                width: 567474,
                height: 356573,
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
                id: '3e5359e7-4005-4055-ac57-2d195056dc15',
                name: 'm40sh6fykzxr68rvs1f9p9g9tobcii9u59smnj6mlu0mwnfslm4g8e3qstxz1ytlef1y73c0ecj7p81ouj0edq8b5db7iby4md7lt6btnfxx1w740zv6r5zmviwk7udq5w70zt8boz243z84a5q0p7bdva5upt1j8ilsw3dadltl1odjf2674sgtt69i8l0dubrqe04pcvbgtyljsdnbpdle0t29y7xbnr32i2fx9sgxq3bxnfmsg6bz4covs59',
                pathname: '7382uqbfwkchbyou1c7tirg54gklzgdjx4o7gkkjvwnzesjtyoqjbj4ljihznxn0afckgsglmrzm4dxse6kk07usaw835ewnuhvbeyih1xgjoate5azh15yzwcesmcruxr8sd1207vxbvymdc4ltum1q41vq4lfvsoybofzq60rnjzfpctgsxmfrhl72b4pnegkb2cupizxof7nxqrp8lpm4vug1t1txwoh54zvh8gn83yvzwomwsbxdiq1qaglocvjn4x0gioyg5xlsa35iuda64p7cb6pesxaaldfz883yh5q1rujsfz1hvxggoynyj39tkimyyi12gjwmyf1lpsw6bxlfk41qrs0v4lxma6c254a8p3cj3xh2hxff03iah3nnqeqzfpkxhapleg8fzrfy8gkgztwr3fa6392mblf2wvlyx27zqjjruf2qke70cqj39a273y9mavtook3saphxkgwgsdd3eiufydnncaihvcfr7egnz9vu0yb80gvjdsmnj3lyrr1jpgi72p2w4pkqd743ormx7ftyev769nkq8gbqtnesqgm885ptxjdzmb6mi6jtjh3lgh6e2oxnq0oanjz77k0dpchanncyep6thp6vlomguaahq59tt3i9c9xdaodhxbnso2ivu2zj8uxtdz62oilez89598y4skscrzxqcuxbm3dsw3i1l1h6o4u0ad47l20w55dubda1eb3k3boa47cv4md3nu3ron8sfgey79ogt24202f3wbk4bqhq9vb4ncsxr3yrd0tk7a1wai0jg0fnyywphyaetiq9lp8knc5k7n4e6un1f9wzz31ootalzbm1wpnff493pfizxquiktr3xmqymprjszdnbdp6u237jmr4ouikdev723pyt0dqodqjpy57grqppszwvaz5s394opyzl6nojw5itasl9qi1bpuv162b3zvpxaa2ugwi312ovgt46420xl8ksn59k43acqi9chf6eejkhy0e42q7d7byem7fvw22',
                filename: null,
                url: 'mldvm4j61dmnmij13u8sjdv08r8uku2htrmwu5rc09iq6lxp0qc8zzbeg02wpkli8scrtq16xyv66lx60vnxeysrwut7ccb2liphyso0ga3hjs9h5y5vns0scubplrxv5qel6jnvy9sx9fbauh2ro206hxi9s63ab0qzsrxfvjgctq33flgpt7xs00lmm6msk7xlis7ev0olnjabcncwspjm1gpchjfpjztcphcieybvraey5ohs02x8xb7kzl69z0y4yoji5fmufrey4rrncvzlcis1aht2zf2zhdhgvhh9m7a6j8jij5ww5gnecanfe246q3swk7oau0s6l1wn269xybaem8wn3drzu9ktjtza4rwnn0zp3j3s3qaqmuil36qilru39v1ri3qfn8qk70tmhu4mrdw0jp4dx295x92s74fx7uxkbden4o6nwt96vcncc8y2rhtgkhbnqm98rf97kd4qbn177iujdwawylransz0eae4qh11bzl8s9sbzn0hkereslc0lligal8vf5u8wgo2yi5fkg82nasge52w9dtisdojng24da7xn404fgapoylgvm6htpkkai9cfzylrs3qbn4dcsl3becngiiagz8f2wh4v0hbvjkf73nfxasst36o1g4s0fwyh44836lmix0u8gla93ypuz3ytoen2kf7w4izoskqtkov3lp11pjp8owljya83g8a86fvepgf2a68uq2ukk7squ3tha2q8eidv7v90dh12chlvz5ugg2pxrhdjrnrj6gpklcq2p9zqg6ie69wdajeqjfjhoottt6lbp9rncqpvcw4fdqvstd18s2juj2fsjrowi9tzwdtwqaezdwqiz151mxzrp3wd5wfqynymw9k7ienq7b58og8f8szq1c3khob00d0424at4zorqxrfuza6u95j4uhcibveo4u9879x6t22lb12ni8o0brf6a2hrpytnvbn9dhxx324eh4t841zjv8iawnzqt65en6bubginl6csui',
                mime: '0iawv2jmnolvpleeq7f49w4mo6u985rfaon1og19jp58kbtzoh',
                extension: 'dcr17neg93qmex8fhdvbglm88clh9lb3j6ydq5p3g6ewi3bf45',
                size: 9535095120,
                width: 619691,
                height: 298848,
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
                id: '3e5359e7-4005-4055-ac57-2d195056dc15',
                name: 'w7d7kwcg9jin8vrosgc17e39pblgtwwgvxcbvhjkwpojk2h762sey7wb1u49gjzccfx8942r2buvg0djcuu5hv3sf9671y0dkpxpnhhmgfacyono33rr6zs2w3zaonpknyciisac0l4s5sh75zp7pwbmrruejoi9gkbxmv0qtohvv1l4wenm6c2guquylfbc97irpx6eshb9r1rk07nmrao9an82hcbjmmbje46n3bq0fkfgxctl007hx8m9eqa',
                pathname: 'm3znzmuyiirl7ea8se7hwmtjdzqnsbrmz9aje6rpr1f3kqarxt5u3k1stxe6dzfqxel0riae13nnk1jtj1du4snic9wne6ovvr30r8fcdxlz4p77cqxpk7bu4fwdnfyau9qu3iv9mbi7rcc38ndnu5ldp35wflkkyd9sn82thlz3rtfyp9n0h8pk6l11egddh6z9temywx6pzl4wtqjewrjpfrpjlkjos7i847j10emwf2con8k4in2eugso3o7k9dmw6ik567xltjtd8155ie0vsoph3sx9ny8t7501x3y56zyzuw8nrn7hof1szb1akwzpr8oyekxix7creeemn3pbm6jzvh37rp7rsuaosdwzft49o5zuh5qbazcsa385u595mkpzmgvirche9w6qiyfg6mtic0dltjr0wllhvyv8o6k6gmtwuhpveqonuiuo5e9cjk46gu2lmpj85xbm6cnu5itje3hv933vglwyhsw4tqknzd9o4bc287f0ulz5kj1rrz1g1ev7z498dw3ls1zmrfvdg3nyv6ii5h9wxsblvm1xblvyainj46eeo6hi84ya9ffbyp3885vw3uusya7degu7tp50itfkuyorbj1a0lj3icsnicalos5kmcmham202ndu3qggzfirl1894ykcc0c2y6kyjlhznivpp3q1ki0evqomeon2lifb72nskifjong34eqz583unipu2hh65q5dgf5eoi6tvkgfk8gawrvpng1fqmyfd4jqinq8wskbvdl0tk9a3fjrnbw0fx5252pevxx98ixp7gsyfr45ln9vf3xqeroab2av24vd8p9qsiidkl6217ciazo6vv1vor099dmfrwjgrkfwbr1p98qfci2yhwfv94r2oton1pv7niy7m4je5n5ysu991fkq7adsuy9r3tz5nfp0hotyx9qdmti261l0szif9shamk43iu51v20byadzj4heghh7zqa3wk5jyr6sapois1choj6pd3zkzw0cxj6emzxc',
                
                url: 'zwj7syeb5v6fc4cemv1d6fmzptwmgqxl8nwgabpgcqvqknti4trw7e5fa635r5nhyi1wia8b87bimo43bdkkcctw9zl33mznbxbm90zsmz0plzk3hd6dwobq662syqfpys8cl1jbt9ypd1bgh0jhbua54gv2399i6b63wezocfp6x8w1vpgacdvpsoeeubws0vpitbu95isew7nn1o6407nn2pu5nrdm2bdi2hnzfe1rmkkmrynyloc723epfw1aicrpt0kb9wffeeau768o3ut371lmxs5dkmaacd3ru851twbek48vhxcxim7hr6t66cd301lje28t37gyqxjw956n5vpn8y8ugbdnmiv8ssp2hmjfpm4eibp5v8w7vpm8xrr03ujwr55qnkoeju06igur8wrqwxx0jq6ha6godi9ugq65sxgrdlb21m2fs2aodw0dvgowmch8hqpaszpnzq7wgldoacot0tj2gwfftg4xeeqa8ngj1iuhbxqrj0foxhnj55acvszvxss95hlyebh5x89pxiepisgxwzc1gcvk3niqabqaoajbaiqud0lr6wgopaf93fur9merx9h8uvm3trowbjzsugtd5uvdc9relcd1q0rm26ej5cz0usgo6xlcopju0nl499zv10czk9z6oaei3j1ia8zsddzgm569ugxvb43ley47ozzl0rc4u0zsrxl2o9nvomagf9gaqufrbl04hey1pw0wo1rl3rixud6rxjivsm8ah0xikvbt78dc2axtfr7sfwf655vxtxgbawgse3edmf3eb1qur9046jmh92zss0ffudw0gk6d1ppnef5yax22zzuwj0kw8pgql4e1ca4w647ovoq1biploo09k1nv0wubjcircmiz207rgqjfrwhm5lzfprjzo0mf3o8szutgnm5hwccqvi159y9awx4u0k5oyvwl6su9jhvfl7ewzcyakuy1rfrclj1uk04kollvme7bjak0v2wdrsx8odh1f3f35qd7c3q8',
                mime: 'tx1aarnpfalbzvpt1fk143ibjgd153dza4hfbx6howlc8ajdwk',
                extension: 'hy0f7ptbfrs9c8ni63vpiemwl9fwh3svepknp39v26q4qzimsv',
                size: 1144650120,
                width: 736700,
                height: 873990,
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
                id: '3e5359e7-4005-4055-ac57-2d195056dc15',
                name: 'a5gfx0zugnf3i7uh53l2m5mmxny9lhej0kxiiad0j74si0hsw29rsjrnasg1gi213bw3k0vi1uvt3mgt8bhv1p0y0rnzatra09634f0t0a64ya6eiv0abkv9ecnm5q08a8j6zj1nzf2zd3wdye8y5w16o05pwknac27cxdpvtpnmj29zxc51zljnlunw09dge6sog1fmllvkxgxmt80qoh0yvwutzlxok1ggg0zqjeht54y51jemxxoqkatwotr',
                pathname: 'j4ay5foiinj6iw4q9nziy8n7cm0e7je7e575bgcoxg6kewxyh9yr11osbty5mbnfc5oy772i6d83fdpw1jhbj5bc44pevw355hc0vs72ojeyj7g838hjj4vrll10vf2vonurl7bjo831mr5ujbep8weqb9skklx6uxbvw2pdlow847klrs13j936yhbccv967rcqu4crm83hv6wth4wz84uxe90uggrlm87yzpm7dwtkta6vs9icjlfi3tqxj1bz331gyt79akd9kvqd9kcq7bh8zwt4vtz7fmbrtkwcosyunjb31wfiizm812dkxdtcdf10trf39m1elgzjocn4o0r62rusgcsvnba59o398tstv0h5n8gsdpvl9ej0j3u7acvd78igcx45h3499bld6orsb9yhavpv4i9kslfeb8ygic19cfqnfszd48rimmry28btmla5hd49ymmkewivo7q46a0yxib7fkhf0yb231p7qwdr63slppnhpt4fmhi30rock2f01atpwzen4b2yky2qz4jx93178ga23tazsbtcb6hgvmm2wdfkewc9lnqq0zixv2oi1gcox1qjlg70fobcqfvlmr23edkb5s2qtek87as7kv7hw2w9s5c3scbmn9j7mnn8ydxx7jczfiaqx4hlvcabfvoxc0i3cyirxfjrfth1okmyeyrbmjc9uomv831kjs6jr4bbnf0h3rsrsahkmlv3orpsv41v3f79ujn40t8ux3bo0kmkc4cyk4tse5mkvn798wpvjg9do7gstvy1v56pccj3ifowg8iqju2c53ah47ptz9vo23m9n4yml9qsj2nf03fh20nb1y1uzr17aamudtnkmos2i1ve6djelksftmpwn5ix92fxetk3u3wte0m2lszug6jlh4pq7n46ivzmnjg3xhf7xe25blw744xgiezqxq8bw58503awmm57l29l48nxggk85ahi23zugst97u0fr09vg8h1vx92s77xeuvsntlwv5vctj6t',
                filename: 'lu1s1t7mvmhxitclg23wy337n6zeuvf27iuurqek27ft893d14y6602x9s3b5a85w8jtz6699op0pt6deo36v3dwxft8v66lywo5icnjwke1f2wa44d176awvv5xni92e7yjkyn533oxwz8frixyatpvv0rasphaaipsgqn7qhuz2iu5kewi6ze40itegcph3cftcb8vjc1s0uxg6jjp3hffa8fi8dpb7uz1phydfwj4yfp7hu87ckruf6l9b0b',
                url: null,
                mime: 'sim5dpn9v3bt2774tqyf6n491c84hd5mh59f5f4z01q5td0698',
                extension: 'slavs0hkhw0mxniwek7tgot32kliq9v261uf5ptultrcdwpuzl',
                size: 1473537984,
                width: 413524,
                height: 392474,
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
                id: '3e5359e7-4005-4055-ac57-2d195056dc15',
                name: '3lzqcttjefobr4aoecik6i0c9gctas4p2d5nlgcdkprqorx6ashz9pe8fqiffftvpkxyhfgsh21z9g1a77dn92yvqe44rg5akk0mtck1gegjmkqxydjs04vjf9w2xugojnizkagzda1x3bm0vuoyip92hj1xgy5evywy3hcqimut8q9wdb3vw4yo2dahcyv7m1h3e64s4wjttqx7qqpab6hohl86yfiefwka8cn5jt7hnftcegz22b4307sv2b6',
                pathname: 'liwui6by6bug9jaghru8s3uj0msjvn9c1enwkua3oowpgcy4nqt8zte8nq3lna0svdcljvarwbvy1rszi1oqxuhits1qumxxq71jhjroy1zcaxbte3f0h00bjefqfk2ngfriys4qjc0xaepj7nb8zlfe3i15mcr5ezwxnonn769n63civ4pl8l7fd4tpf35332svnnfslz8wwcde2682w31lf11k72hpqu44liquh5x8h8kh6u4yafi8l5unbhmq3tg2can2cmooitlzpu2umo7zk2mfcbltmq43sroa91el9dz95tr7q1lwee1gjsnowjo353wgk8zyxjaw1x5mamwqqmv65kkyboj3m5i62kbktjljpk13w789llbbf8l88xdwnu0jomm9ysh4e97d04aeyyxo7u4z9eqy59xo3cadx45qk87i3m74m91vuqgcv6qpfw59cjf7pw02i9jt0tfhbx96xrv6ct8be89s8qmry5kidwey8h44vy057gamnfveikqt9cd5b6bpcschzwp4oe411vds3f15ry95vryqaz8yn6cae5pci459l5i7mekk81ulimfe8xu8qv63437iuk71thxoqu0rs7bmp9pd09ixxkgsibpy6gulquj16mc42wwju42uoxpcdjizsssconc0yl543hl2vvdpdaquhkmektr6fqn33t7ucrvdu7k17t2bhnvtu7uackqvhr72j4ie6xnv37w6ohms4xjdzi61wxw89mw72ipq3ljixg2cit3dfmilm1bcs38kf42xzlqer8b2l2zcn08inz830rw3q47ge6ol859wo8ui6871mpa64czl2puv9452pqhr2mqep8ejry97filjr3lnt6yz07n4p6tvpnzh16pdph3h73gc0y4tyk5z8vowp70s0r1xyjyu5tb1aj1ovf8fz6y3upv7mj6y2wpp32zf0dhxq6m8my3s4wfhynjelkwr83kl4h250lpwyj4b4k5ow0higf4gj2xl4xu7sbbx',
                filename: 'laq7vajumtfxyqykmisge7xjo0sef5nxloii637o5dmjyv3u7oxssjoxbc4kzkicfy5n31723bprfbkqwir2icv2rugj3az5pfaiwidzwwmjv03lk1fy7w0z6uoxnedhtaj3rpxvt7gxexw0cbbgz8k7wqvloqvkeoal4kp91y3gkh65np4r5js911n82gqbi076kc05o55t54uvym8ahz1gnz5p5jghlwswumki34vqln2myr68dv72qo884eh',
                
                mime: 'befyjzgkezw04bnj02m4ffy7qs4zkbc3ahys494knuval6ixqq',
                extension: 'gl4blq76nn3lam599nop722fawi4r3lzqn9o10aa7rxgcdgvmd',
                size: 2173999849,
                width: 664343,
                height: 598179,
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
                id: '3e5359e7-4005-4055-ac57-2d195056dc15',
                name: 'kuibv43zba8h2x1bb6nwn4gd6r375cox9hmxxhgqbt8bcfizz94gwpwsgu0vuqw4bhn0ncmv472hl066b182hegkyyynsazimtptcotf4v227pvhzwk845u589dyrzz7xr3p57z324c2wn6slv2bf95mwnr602tfu9utdtiopnyk9ip4cdkirnobdv1nt11nqi8ecipyw8figl4ixnzwnxrz446ajomxnr5wpexpkbdu2lb0vopen6lhk8jg7th',
                pathname: 'gp24rgxyfph633731y0cjp0fyezhyd7gbl2eoxo4ds0bfsyf0jz1wn6duqyli124xwxu52asx4s0t9z3gkbf8s85a0al5olf93bd5g07pnops04iyzrd6mqmtjmr7cj4q26orsri2vvdwr12iovlb5di9h6i7uybqyxhixjr5hbpkj90ihejh4z0bqgvtf9mrm7kywymuj0zy674blpzxjc9oz7ocr8vq8nllvj6nl5jwe3w34570zol9dczqx0grhwlsl006bsffj2jc9xi36eerovnxqcxzeodnlglw43nibaiwy8jtbzphhxpeso9gntsyp185c2e242yx3j56tphwiljeyx9eq72dr2yugsyfyt03adhbekifkmrbk0lf6bt788mkf8pin344kn7hp1thyvnqkoya47odkug47lc0aiiy2hh8qjg3z1118agngpkojf8d20hilest1nk9lr525sg3n3cbtkvndszvjfr7beapzuu7jcsb47l6ukj1ugvugbdt02oayzob3tq55cr2buqccm6zg2bl2uufa0yiano26dirs2yid51ffi6dpl6cocdkcm0u63t6m7n1jpy341hsncue7jpkwhpbxnby12ta7cqtdj7ybob3t1170y5ftwglk4el4xn0tokstd0986udkni5amictbi65k8kxrrg0ud8lv6pe5tm8fx3wvul4kwl68uofxeshoe9xtsfd4qshixrtfsddeyr23u0gaerz4uklolop5h3wa3xgkuqlur80mal3g9zzctw12foalgo5t9pw3zbc5qu6qz9sn7229k4uo8cn11lhycb18j3i0exuv59o9dspqb2b108xb8kujrsodidao43qes8nwywilz83mz0ag0y4z2n4vvinmezdlmh4ygi5kyl12o12fs55f9u6son9xfyi9h02bwwkjnyfk7r6z4rmxftxykuxnt47usf708gajcd6yz6bk826zaop8g75tn9paryg3ts06kd1fzfk84aqhy',
                filename: '9acki5jnlrsnisxwj8sg8gjelc7jakuahcagqirdfly6fdngcrx2z307cf4el2hc9dybv5bnuv51013vpqcmk84jr6c71tt8xjfukoqbchdfky12xjd4heoem9g7pdfwwfs7aapmx1f7fhiqi4chtjtm5alhrzqu7yhh6c6ekuofv0xsjw412uqkfywi7kk9rck2wj0e18a8mgx0vl8q2j9ezr76rt5m1c9lyox54eovn3qtmxs603dec4fbpc9',
                url: 'vcsod6gvo7effuvxrchufhj7r6wvc30snddlz334o2ma3tbt3uv3vev64s75jyqfw9xj7f42u8fod36ba0baxtme83v603gb76bu8nuojrb62kfl878trgx2nkvz4rwk5i2nxyr0f5g9pz5360c7j3bohva6zvkkqbx2vstlt6zm1nss03x7w8ui0edzwu2fnao4yq3rptij6c5mtrvunz8tg7jakdyqxl34bs5h28z80j07ro9tbhthrphg190hagumv6oayko93hurz4h36n33iufwltqwhfuf7l69rh7vvjv1x13zbyh4ooao0ckyulo2ichx3vdbv60top92lbx30tp4nspat1x5nyvh86crkyh1lw4so67xju1mjbnztda0qnas1v47a2mhtb68cxrm9e2cew2phro1gdpsau5s476p91f8elncfzpel4ad79mk6n5p0xtnukgpokffvdl2sd9lzwah3p15ve4zxhksflyj7ni65cpqlbggn6qxcq10bg5kaonapcxmjo1r43a8j0gcegtzd7bctwkbcxqsmhyvm603nrmaufbr5u7fqemki32qxg4tkf79bar7wtfwi27ya4695gipayy0umxbqqy44wkh2nmry59rblf5gtj9a90w8tegz67dluje57brlzx5f5defepiofpwfzhk630jjm27t9o16l2e3n6j2zz8zlcxlyzi99ec57vts36alsxm4g0s4wukpuap83iwx4fbxat4767mofoejtqed93uw916gpt1lg36nmac28wuhc4ixkwerq2axmlq88adk9k1qucoslvjb24cqyofc790r8qehijrrz55355utjhr37cx0iqklzvoftso8o5795ay53t3jxl7ta334703pr5e2hs49p9p2takwd2ufavdvxl8jvww3xm65m9kpc8snf09p0dpoyymjbi26je5qmegw1ktcpz4mwwn8wql9ki04w7r3anjnrxiotdmq0jxp5px6mz6fg8buqyhfp3d',
                mime: null,
                extension: '7mlfynd8jep7gf1i0xxvt90ngy0q4zfywu9mq7d62i13o2ybnl',
                size: 1648402836,
                width: 164367,
                height: 403687,
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
                id: '3e5359e7-4005-4055-ac57-2d195056dc15',
                name: 's0nqt6hcyjj02l0d5l3im15ass53mloqal591d8ba24dffcbo3wvdt0rzgicsc7c8saux7hm7p1gw20b5ghe6alf362tc9w952vi5sn5gpn6cfb1kznifhqwialiceg95p4ea2nt0tvz1ft4iam8fhkkweggaidfhwl6j5m6ayekkx9j19g4n2x48jqp8sq78r1pcgorwfyof3qwroqmef722p6teu82j7s5rfepckprtz9fcchmoyb9w87revv',
                pathname: 'zb05lf3so3l3plb4na2d024eokf7ixltk9qepfjzyssqbwhzd5qrvgzbpbhgdypdld0oqdtocmg7q7z9ebex5f3f2cp5psyc77ewpyboh2ks1by0u7fmhtov88dhbz159an2rvb4lh2hgo5ds608bbnsr9jg70g6xft45mg2qtqvoqilfdp2cx9qi486zx81enbihsyt20t3b6019zxrf49rmq0fqjijzinljefahmv3opz1ruuzend6sgg8k2a00gykikrl70oru9sohdyanyki9uxxdf80jivzcbvi39iyhmpzbzk9gpyfwjlnyhmynfww1exabjx9ybrm1hng1udr615d63lnh33p0jkwbrvdc9f8nguve0bpwavr9pgrwo95u5r8vaew8yxofo7fm5r5tehiqjqh8kzv6eh8jywrursd8m62pntrd0bqeljqzk9sb1acw6svnvsi1w0xoa6rt2g6zfii8cf9yep0cf4j8g2wac05ifatdh2uks2zyt7xc4zjib0d1pqzbeoz6z5e11tk08tp9xak2c5av2bwnibja3hauxmn0g1e82ni81urdq9atumtrnnodc1ul9prc0q7oa5z7etc0ogkj9rkzr18xbzgh0mqjanq1iiio4fawwax91156ydsnvrxrr99nh8z3enjhzo9chnmqlqpod3dmmh9yboeskba12pm5559z8dgn963q6bigj09dpwq7xggwd456bm6kgiyke1w57tdk74vlufj937rv64rubqefht0nea1w8gfk4l02tmq5q9s4wregsjir6596as2i7igveizkzr40io730ue4fiq10tucvtwleapal1ohsn68xfk32wo5rbou7sjun11iqc3bh8461x2sy93wa9520h5soirmej0idphhgss13oj5iwtvaj6j4neotxctb64uyr3woeuofo2kpausr0xn4kj7mqqr1rdi5jnk6ydu1vn1f14fn5mtfe415qol02ah3bcmn5ef1kx5h1cf4m9',
                filename: 'd8v32vyh88jo04b4lh2wpztv10msgrz52fvatnvakmuw367cmcs2y2ubi2ap13f762jczqqsbmb8k82hk1gjvl55mych7i45g8skv2qb6ih3o8axkv31coyzi4hvvuqcafr7qn5s2602p6uucafxv7rqyx32lwrgo6m7tle1lnmf7shoygnmzpf11joqf5dd68m8gmzsxvjs09ra59b6wqj7mm0wdhg3zcc68psdtgssfbuw4v5qu8ugt7ezp49',
                url: 'jp65xzswbh18nwt9t9j7fg3zssp41bejmttac78ontvrvfjgnc7l02cryxxcmsnblkfmrhu0cmf0crld625aq1pknmgleejz7stsce0zydh9b8hdt9xjj0fywh53i5o7lrk72mr9r1h7lj9a7ulgvuqtwabvzr7maqg7ry0fxb9xunyh4sz48z0dx4jr2yjnw49efjtw630msv3h6yx3hg4mifeiwjh1fqget6mxye0u7csb2ehpj2ftbj22tiw729zwz0b8dyfdxl1pcxgaxw30ndgv1n0bw9hm5o9xiljuajmwa7xja29gj61mjw6te4yj6z2d5dmqgqbk3wpkjqjgdenpx5c9q8kvvuf5xdhd1kmfbrdhv74kz3mljozb60e0jmcsnplfjngae499hpg3m0t543ylsu0zs8hrbefn2ig426gcfbqcw3hnmtg26mq5glmn5wurilaxej7hadicdujkek6olcpq9615ox2cpo3x94qsj2mxzwpalpm8cahgl3gwn5owejhxfn6tov8qgcdukoqgzxyoa754c6h3q1auzpe3rqp0rc9ola70i2pw42sfaha109fl2923fts31x2abozxz38ujrr5bc5oxt516k2mze2fzr09dvtqpj510yqr5a7eaxi25n820gpwtuytsecz7744dxqmf6qphvsrawfqy10bbqij4zg64zrwmjjk7ulcnccykwwais82sl109um4bt55vnbg2imabr1n7tk0ymqab9e6a6cj9ir39nyrhk0db3wopsvtrecqeu00eh7scaurul8oo4pmd2dqw24uzduij3uruazaiogt7nqumjfhhdi3dci4dn513cbqjawcm8za1eam3nhs1fn3t8do45n0gp9vqkzva1gczaxmt82aju5nstrex68dfe7geqrbr8bqmhp16ek3p9eod79ryl4j48j23mas389fun285vwiinou49s09yggro3es7oso6is09hoi6hzc74vdkl26brtvw9elb7e',
                
                extension: 'rw2rhrvhqu95vm9ib47jo4aj4o21qkl1i7a0hgjjk60fxh6hro',
                size: 2992883965,
                width: 914542,
                height: 991686,
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
                id: '3e5359e7-4005-4055-ac57-2d195056dc15',
                name: '8dpaqmzcpwqx8oc3bavlzmdmz67id4w6rznfthpup4kdjr9bzq7ze5qyebex0hjzck69v19518lbznszl9ti0uas34z4oh2ft32llzah7vr938fko5rsphr0i3cctxe0vxdyeeq4puidntr8k70msljzojpnz1g0d0muh941fqxh7hm3p4qefdfgnjnty0hsyzo1oa0ne1i0plbjhsw8sunvihobqckgnu3srg06afryah78x6uywzngr53of5o',
                pathname: 'hv6pkuim0m53h9ob7caoa7zka4tm6e6gtct9uganm8cf5g7xaoq3o42p3xowphe180kllagblm2if57d36a5mcrcmsbgjzpsvt7w8mhk97xygbvumvdr37jmb99gckgu8coqzco3fdvqt681an93siuify3y5or89h6ent2h2aunsateosmqbzh9qp90qnmnn3b4oavg3zn584jfw4z59atatm2zxoyxulcaou26lip91oyzprszgh89l9i3cf4snvr2b9ggqrf1qosgsq7hq71ctdxgsyujjhso8o8egt8po8rtnvm830x2pwjj8u00qhya07jykj5glkb2qri9uhlcd3egjgtzbt98h17jdsp9gbonvyfgshya8iyvd4f6k2zeb19nvbn61qrh2vfi51bwuaugizczv50vp8ebhb0b4k2zicpmpbsofqh1q49ngbva9s50zugtwk1pb8wgku5b3kd0yg62yyhmbxrv0numwdqlkuhk1e2yaxwu6heoiagj65xib186tvkt6laq28u3yi0m9rqkty66b635401dujzy5roo8zpbn27qj04khp74eixg1edqchm3iroozz1e0g4jab3uavudusr11bij0zlqku92qlgc8flkuuwdx05v28p0k84u8nk0by3145ear00bv1pk98bbavrvghoa9fsyf50t9f8w3dkv5qr89a783qevbftp48t5od0hstk9ffit2vloq5abfkwta1f634ufalai87cujvk21s6ens90faeuoqdmwtpykf1cqj0hfjrhxzcydne6g9eisk7qfp4csty4qo7p2yueo26xonexm4nfwmuoetpi1egno22nivymj4czooc3l68gq0bzt612h5477zlsqhvivg6h01cdmsibwvdg61d40tqf0uq82pookq4jonkwnqlout36wtrijiydkwvz3ds3hm6hsiwmgc063s2pg0v8clwgg2r23iaq3t0aoph3j4nr5kag492is4lprbhgi6yqmfix',
                filename: 'xaagfzkrx2uron4bkutbkuzd22dvgeqx2r1amtm8omilrbq99ladsjql1sm6j7oe79yotzz2zfex4afqai6h94y7qttz0860egrr8vbwr1hqkc1tc8t1f9g4soicipl4fc52vz06vk13nd168v6m97u6ufrxip108h1lxzgo0uftbin3ci8n819zdbo4f6aq4wadsnlh86uau3nif3jifw2qing1pw0yxperh9v0k42u5e3vpna3s9iw1bph7a8',
                url: 'egwfr7zlm3xk75r9mp8p62w09f27lyijdunmf7jxggij749nh5rm4c2po6cr9q1hxfgasdvhj3cgheemp8mnltvzln77uel4bcthdu80yraky23b9onvwp4tuio15i24su0g8non1md3nt23vqnme2tf3v3ggfq3swlu2to3e7b3804lhl4g1fhuw5olmccu8aa8ap1tibee9kotn21zmswzinvocyz7434d3bopa8qcrehiadi0enod9mony4l2ticrjoytq6d9aid12sbjjhk4w46ei7ww6ifet5nv2ota6ew4qxxyp0wc4cdncim485j6uif5hogkvtjgk1zrr7iwa08orrdlu60697vp4xq0gsovwmx8oqwoqo7syqphuauzw4i0k4b2byyj7vv2wpxxfv2n9rjv30to01hp4hp1hhsxdw1rv8tfiilkubfkkh4an1ue9e1njea5opzaayln1uzkefls8n0qkfc0hhnkgeexpdzluhgwq9pjg1usymd8oqlwlny32v65hlt0j78eyp3an8oswgj9jever17a9oxurnoi998ezus33nu06ktca6bdy51d1iq2qbtfl1ij91jyuwv758zepy71v8z9psscronh94kdn6kohh5naobnjz13qwwgnai7950qxdq93pz74594fn0mfqzvialhdkjflmji8gf8qknb8cmxiiu4rloy865b1r49rt9l15etifo0cz1pu6ff9sm1pfzu5hiae9i5zt50gpwqrstzox5rof6khpqspwwnsti416z6fg07cmemcrr3jkwelhst1xykpcrno00s43at8z3e2emur88nxigq1prnlmjfq6tkvhovfqpe6hididcr97ezrup1i5hz3hbvelldxouwlxnpcu7pz0yem2mit44mykz6xlttbbkshdnt7td3hneo1fjsgky8blje62pay0pts6efrdhdpydno11tc436lw66ir69fq8wvu7t0ehoz2mytc0h5roayrdue788xgax',
                mime: 'zsg5znrw10j7g3t98wk44bkd6crszx4i5gdmfhjba89ehg695y',
                extension: 'k0nmbevz5ii60fa77hq8cov4x2ggjqp340eqi90qqj1zsslnsj',
                size: null,
                width: 723195,
                height: 702009,
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
                id: '3e5359e7-4005-4055-ac57-2d195056dc15',
                name: 'eo6y8n0hlrid5mx8pr6z3znp9sig9m82ydl2z2czey4hmcec0c4lnxja0t65ksyjzmlujbcm26pwoiilh81jt0werojvyd49m4sae5v1lxequwkjb58f2vkv070qkq7au7xlyar8w5fxsxhdiv9x127l6qafkxccacjyksxp2xjnldzilpydfhb8b3fvvsa7s3hk9g6zwrfa8433o0ugx7j3gpkav8quuwpmsx5u0ihnc6m5bmhzik1vguwyjar',
                pathname: 'odfqzato2hk0cflknw7d47v3ph8ptf0esxkiogq7kfxvx3vtfn8i21gr5ebx8vyfvu603n9enlnvje54y8g8jdaipcu8barhdsmmpl78mqm4izizp5ruplqth12luljwvrraq5yth7o0vl276tmlv9m7n7x070l1qbrbq45z75ogca6yiwkl0rhjqs8372ryrc8y649jew5yt7l06mzij38mfhww67ve0jdpalnxs76hdc3olb29369p0t52d95vs805ek84ju3hi5527jcwc7mlyq3z3h0nng4l5kr4r92shz4rnio8plofpir0q8n1awj9iawo4t1hra2ah66hleg2jsk7esx7ifz88v9u225foxzmvkptjazvf82zhnt1d6jvkwrljasmenmhgtfjgbfa4serr4fpw9e26wfwy8gtjkn2u44esxsiwx2bvs8s3cil1xhed0op4kb5kiakaw7zyh2724q0zitaopuueih9e1m6tbq5qp5wy7l4hld1rgqi25z9iu91wg3ltqfh2a3s862frn5x7cjjf3nsk1ds4rnkz9qzmmjxpjj1rxmee7xiufizc04tjvcczvry5xh9xm86kavpc6oq5ppfwz5hun6l7s9svo2pu11m4zcuhf1jyipdwcc0eefqjf3a1md64f7iizpmm8z4mtv39befb12g43pr2hgdk99tba8qe0f90ta1viqrdoeulabhrpkx8b9mdz5hz327erl2rmkpu8r5nvgbtwd05bls6anz1q5bcrjgnkve9a0s8ui3vhcmnsbpq6svweoml5iept6r8cujcr0v8qk5ryjss90plz2xale8diqzqp0c07h00khv0ddkllppo3nwxbuoltxeuq6uh6us449r2xz8b5pxpnip6kmf8dj4yn3xgy263zpex8zzu04qncb4us91ukywozimrotwz8kgqlm6ggu0hn6sv8ag6ftkp3p9zrfj9518518szzjve4bc4m27mjjci6l97sytbbpc3wyyzdop',
                filename: 'e3q3u3pdukrwxx5xzxrp8cf14di7c5m83x4yphzwtv3t85y0qvjx4ijijn6flbi3jgz12a7vycdx2u1i74ka757ahxpwej0e9mpmrq0ty3ms671bzc1qylnmyor5px77hichpv3sbhxofic48tkj161b658m58sb55w0cauzl2spbww2nbpkkkwjhmiuu2git69gn8c2ezehq21z0nntx6ovorhuvp6mxejlso3vunaee8kiq1b3pclpbd7guer',
                url: 'xari922ilvc6jnw8kywtymgppxfhgsvr6sysv4ltazjkeeewc0ytw20r1sypjmg5w3r8yuuda1dhfwn3tpwnjojkyf8ngrhugfjgyry1mgmpr3bmeccwgwyju80v1q8k5vmsrw2atq1i0egnbuh250pnpo9699mklofq5d8n1j0gdsqgrbm29t7na3n5j84x6qdy0526pb6d10w7lgdib5ghp8k33p2o3z85mqmxku2kz05k2lrbbbt030j2j0vwwpe14twus90qswx0eix4awly8plyskio2iwgq2va9zwcej0bh871wt7l7waxdj4hu66i7hw6z2m6x4a6jjdas8lpvfs0c1lz8fkz8hcuy6yirzqabeqpo3tecnyx7e2lfkzeswwigd3ewkatf43jrxn3kcb2ejphaauttlq33m4o78mtnd7kp72vw6s3an5oaehulb0meoz8p8km9jhl4rongkf0jbhs1r1etbd4ltosmnis0bs3vke2iv87vy1sp56lr6greumdgue3fm6wc5ybr0xgw96hes4r7ercqi5c451xxyrfcmizw1m85bqezywq89b4od3e6kmf1l4ld2n4sdyt6mewz86hqas5gk09wfamu401078bsk3v7oxjn6vfui6w78h4knu5gppstmxvte60vw1u67kgkutcmndcvjvxonsx827au3mcbh5vl4tudxkxogby5thv8lvnqvyqjawi5kan7b8aawdtptz2e8kunw02eqv585e2rq37hpjihil4ws1qbmbxg97i0yhfv2ie1jvpl2e3pgc05ltw9wlc43oxbsygecflb9q3ewh3jeazo21p82qhcjofj9shl5s3z6klwsdo4idrda5njaojgntk14g0bc79dhxbfori8bv75084upu24v4r2i28o68ebglevs5hc8gdywlq3qm452s5b4t0etltqy61fb4zap6m73eq0fpwtvy1gppnzvr5mqgn1436cz6ccjtoof9y69jmvtt9xs8b4khc',
                mime: 'qhgae0yt07c6b0ks4rvo4j3ook648nweqc4f3yp6bpmg5ss1gg',
                extension: 'ke0bp4f9k7nuvbfj8ft4vomiu0gauuj90d141migvmf70b4vqp',
                
                width: 961933,
                height: 768079,
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
                id: 'm8n16rkg9i518ircnf4kjy1lq0vbfw35alm5y',
                name: '5xriixjfjzve22f936kmdcpcqap1jmcxlubnosqfznm60p10genxwbdc4pyc7bq9920q64sgml0q0r7zfqqbr9oexrxey3fjs16u89u6cmtmgtlpod1le8u8w1jcizl4rhxi0jjzbgz9j3eqmpw54zk7m54cla9izczxkkjws4vrrqc8mhfq8lvhndwm6zntnw0jr8ar834x3tbte6v4apfzwtpbf3gg9jafqaroycbnei1ygpdlpqmwke5mdc6',
                pathname: 'ss9ilo4rj54d95ifk1bnnmutjyoqpx953kj5395lvajoxk9ov87qqv2bg7gaxb3i0homkqxm39h12uwwjban0twvz3ndifkorjimbu9u99retash75pdt0afixqaijdv6jjqrb3roie7kbcyuwfgy8h4clz31z6mnirzzzuet8elhizy2da7o03yhbk03ssrh9jbzl5bo5hu7s9o3suwj0xgo74vk06pksarspvpj8863unr4v9fzv3xfq6i0lzlyr6hcvnbirr1qbs9160j74smw7otw2f4rkoq6oageo2tgyvczrno71uryyymslq5qbw88ou2fkn0dzclx0jvetv5feybeydt9czp3ho5qvmerk2gd3ko956plbrbhbfbdtf6qmci2gpi6m8kpvxhy1btxkcxpvpn556m92hslt6ys7p1bbvwd5q3ctx2bt7n6oqh6ife8u7ry5uwbhwaiww1toadwzoddu8f3qevl5qngyxynfxpdozob2nax2k7ai9b10epds6zr6m0800x8cddmja259c8qiprzmq2y9w5ix243rq70r8awfttqtbk97btv1ah28d0jwz92svm6378jysm0kp99woujlkow7rs9ur7joq06nwnuumlag49vghgmi73fry1thi9ur6ul2mce09s0dab1nppq507grnom2dk97glv3v20i5krzfl847og0ov3i66hdmdlxpzsxf4hmodyzxfuewgqh2c9r0ce8o8p1jurfgd00q0r5nsbnx0lkwxn5n6962939cgrsc4xinai3kgico6mdkjb3f67r9jr15a7jlijnctn7xxb5zy2rkiaf55ji35s6k5suk2few6akdrtl8fiu8lr5e609d9z4xrvycqr3mce381203y90aozfr8emw30g9gje93l7dq30oh9znugcbxyotjgnqha7ckp7n2nfnt2a1ngjngoe72cp37wll7fcuxtlm9z36sf7b9dglw8qmatwc232escrj7p0avdhwc5ufo',
                filename: 'uisqfdhx4tcnhs5lbflsq489evd88rc5kqameiijlx0zvq72v1f7pa8cxyjwsc25qdnadgcbgo0or9ww70vnz8i6453stdzymowsknuuaq3dj0qccd8tll5njpd3az82qx9hu0bvhx1rpz1vabniqoou97t79su89vizy0ao7uk2ivxxmhjnlcmi0ycy40dkpru19o6fi1v87gfs5an1snsu2sqqgv3duv5bbpf5nx6wzcphlxidejvjjkt0e0c',
                url: 'uw7k29lgdegzywfou399yio2ps44protodxiudjns7o2yooxqoxp6ihwft0000k431aye7n42x8roummvi4csdev1j1z66fk7fyuc3va1mmtfu9ujv80l5njslwwe4130zh50n6huv9gzf5ddh8xecxqvu9zz5up6bu2qyf6vgste0eg6npvel2fyme208psp5ysnt5jvi7xqqysm2b7jseth3bzjr40abljepyf9w7lieh78iyuf0l01z6ovdswfhr802w4ncnys516hlvp6xuopbfjq15wvwlea1db4lr74zad2r9734axdfq8u8g2195e4wh77rshjwkbsn9x60as753cenbswnuwvrlna9btm1jd6mrr354dvyqd1jv2j6ex79opo61p518zd3b4q6jl9rc94i63skrtv0h0pk5xxjhbwzfyk1wtw74rkot78ja1rl6wckk5s6hzpy5qmkpgbhwf2gl0ojpxquj4ykljw0w4bsck4l3uvqyloh1yuwmgdff4sg6prjrwm9ixw1gsmrz746pbk75649m9ja4e8ulmxynzdrusnrsj4z7zdqv7ypdvdyzn93aobayu4dkamzbc8sssup1wg8332wqkmkismb0aw0twcvrcpo1s7zaegi6yvh7a7fi68ed03m8cc41t7x67bknoerajbeqgwh16u5z6n9s3jyxj487kwjbvsz08t44hzxyif206rz7v7w2ofkeb07rt2uxfyq5qn0gfypukbuti3hkd5no8mj6hp2eqzcr8pr5ckxpcjn5cemjo1rmxnkqhz3bzegkengyj46csv0i9tjwipc0huuqq6mpg6oa576qvz7lspymox49ww052i3rfif93kr0yop3820euyta5rpklm6b5nb9h5eztyswirca1jfxnhn106422m79fh7uggasy3yxw3qvxy776ibaatle5j61ems8hd2wjgllcyxotd66vlvu4mihazjhqm95nvl9lvlaywm30p8uwgo67lxt6u3nh',
                mime: '8l2puu9l9rh28jr7lxsgqmenvw2h5kzy2nxuq4cnlhshyaez1v',
                extension: 'xqas6egd2su7d1ukfbsy80kfibbni1oe7n971btfdd79rtaxo1',
                size: 6539928739,
                width: 439718,
                height: 517477,
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
                id: '3e5359e7-4005-4055-ac57-2d195056dc15',
                name: 'u123ble173kwqxd3q7wd3eyzzfptmp12q87fu22czeky1hwiawup076hkuv3waw5md9slq30lhgizy7gprexl2ji7nh7vx8kbrnl3bnaf6qbonu19expmprx5mlm62aike6mupsk80jf6fs1dxazid017w5sarrl4opataul5e3lp50alz1csi0jvrk850zehj5ff2zxovball46ekm38g55ibyrmp9e907chz083kfp8h6d2oq3xva9k0ygcy25',
                pathname: 'ehuvy9tusqzfdcsajny9ertkbknl997ppwo37l7gtv0s8i852oad74wymbtb0kny5aktn4ydrd6g2jlqlofgn9djrcpvn0yaxc0d2irek0gc8z2o2kmbos3ugnrus96i31c2bt19nsperyeldnemo0kads3143n75x5zpcqxwpi5ksr1is03eb5vij8m4k8eg1qq5zt02n14s7yjijlpp3pukw5fxe4ujzkc1zjv52oozmcfkixydjwzge00u92q33druz8onubh3193by0un38j7kkhj92fv1wzam3jottvkr66ao8a7ow2n178u5gseg12iqhdl0b41wegwcs9o12zdhvgjfgm13dvtrl3jnj5qcp3w1us2zo04ujdjfnw1gh65de79czd35otwa3vjx4it7a40mck3xj4ieymf5z8qiyc1omh0gvce0jpa4xybecx7600otewyld6s4ndd8b1eulzjve0vlzqco96ze6av0i40omvxe6a3vhtiwz4ew5vltmmcy3vk0hbjgeq2717u6em7sd16s3eo2l5w4uzndbmdax66nx82nsdqu9nbdlwxgfvi46so28y2o0i3d48o4vijgkci613ttqi87f4px8v84bmj48o4d03ro6inuh756exho53gf86qmitce4fl4bnswkbj7uhbn9lu0dc3xohazg9cfmn927imkle1kqjse4ojsm1ose8uma89aob6w1em4n9di8eqq6xje4zi5m9w0cbcfo8ncpo9p96eipu1moby63ef21b9dsl0bfow7g14ybpfdpsuf9xpl2hd2ck7ry4jixqubyl2t1u0iflo3q79d1ayuc6ysdtntga374se717t32o3thwow4302lgv2ax3vkz35lqndtg3iyxxq7kl26py6wjve1r5rxbr3kif8p1up4kakup2ih1j6km19nkhc2zkotbrlbasvp8yh78896m9vcur7d3aya8kg7yw6u5araxzub4ymq1wopnmpttgt6bqz1yvfxi',
                filename: 'i0yu339kb5bw8amomnidx536491k0ntbn94eblwnxg87uhuc7gx7672cl7qfsbforwohliyzh7rfp64c659ior3ub28cgjozxnw8es7xxo4nzxbroht5shfcnmp16eub4ryv7jwmqyuj7rhjunpplgva0k71455ccb9o3plzx63jpw9c2vs8xjxwcls89msxw1krn2r1axz6s46zrw8qlb1r3mkjxbiwnyr2kytu38guqjn4pwm8rmz1am091ea',
                url: 'fhm4bpc5olqrjns2xh8fz5kdn44wibn1gssqitd4fsu5tfoyjkj172h8qhnnvelttifxuugnelwb4s2ar43x7hn91qtfx83ygirx39dx7qev97tov4r99nky3urh2keuxm64du377tfq2b6z95kmc1dsajpiqim6ca3flbdmjun25h80phjaadpji7v0oszgkcg5uppd62owcxz1d6tm8f23tbi1nqx7saf042xkhrvka9r0lj1z2zzgtu2waogsl28nb62l4zwyda6oucsufujtgjjk7qt624gbvsclr6gjs3m1k30hewihjwlpiu0eoe4oska213rejme16fj59x9bwbr9k9laq17jwij71uqki19yrbniyltdd0445q09nf6rth7hc0k11ye6lmysx4l9jqtl4j50ogazna1e3to3h0gvyq5olztlapi40sg02r7hyrj3tyfprz5a0gpfxi220sid3s0lzk5yfxoooh47xqfcp6lx6b9beq3vk38rjdav01teevtml7cax4wlwveqicl6efl0ynz2tsh05g6yefhau35l73ciwckh7fqmr6gx8nlm9bzxt7q4hb7tv1vkd1dkqwaduu2l2sbvyri1sj0lunjnwkzhhoacmw5xi5fm7475p0crmle784qs8egwzxc7af7s10fk14ldx3inp3d00nayemhsmo5uql5vg3uvqywtmqbunhdm9iey3sok5bd7y12dp672bci3dyqnxy0v4fcz8hkroktpf8kodcgp5qv5m7hew4wgau9wxm7iuxbipgtb749wvb7qw9iq3mgox7opxz08z2vtzvki2r0bcvyknpl0ae5mu7ygrj3wdfzuxmvibu4ssv90zhexsldcr4xr3qofz33t1ertljhkyrdk96faz1z5q83s9gg1r46g1rlkm8egj8yahhi102xp1qc6rlu6ptc7j4efegtovvvlm5i5ygujuodx6h7x8xl4pxeix0yaz2xio2yukjj6l1oc4erxvw6fspo9',
                mime: '9jukszh64fwg56im7omrcyi4e4xnj56l2cc4hrxlq4smumkio2',
                extension: 'ukbyqiwsupztbddxd1zvblz30xi2u0cd6b6iedtuwenh1hfqzw',
                size: 1155885773,
                width: 106924,
                height: 361403,
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
                id: '3e5359e7-4005-4055-ac57-2d195056dc15',
                name: 'pfextk02dmseziquy2w3f399ju8yzjynz2i28x3863jetnd4r6t5ktn3yr0rsvy47xl0jfv5viwy2zggql5se7ncef81qvehhuhvb9367cpemvafhm2qhrdh6rx47r8e3z0t2nz3pvzrehjwdxez6z8om4l7foqdhb6o5h6wmlh7y7l8wna0tb0635v1ty4e83kwsuegsxf1nx1shtxxfzuhxatu70rge1hsj399wynepiyuouompehx67t9qrr',
                pathname: 'vwtde7qr2rszka6ecfcjbj5ar9omesq403libj4qcdchy8kt7nx26pkptu4fem2x4olyf68j30myim4goedkspf0wm7ccrmzq0oxxqt4y1okjimpuyl7um7rzy2bgzlhntxfxflrvvwf579t3k0qntfhmz7ekt9jdv685r5kesg3y9n33zu6zgg4uccecgqxhdka9vqvca6ai8aklvxvmqy4t6a6mqclmh0d239qgk3mk6szeox9mqu58wdtzihwdxmpsgeg2a0ai19bn8y0ad6uo6ly5tj9k58t4e5jix81rxeanvlxn69z3f7znz0vno18w32i37jmtnfc6hmyfty2y59aumex5t0tqekbvclz0tz5zbzn8b0fc1iobfp3nk5jojcqbmhw8viuelrywbh0ahu5jwps2o5jc8u84at6xh319zt5x777jrh1voo67jx36f04aeecll4tzbrk9z98mu1kgvkg6godyj9eqv8hisluuqhv9tgen9frf99z7uuf0twnx95d37o953whm7hrwrx527pdajgu3i1n2cr506hcwof3emzticzphwguq105avds6uzazpdx2jujo3epgkwwld72gsccx6bhxl0gttxhu2s3iufz74bc9qgltu3pptm37ikd3hp6y9lqfx01glrvaq7w5bf00f5wx06i4swvp7dt24ngywo6yekxurj12jfirslp9gdygum1hed44a1xaj6mr9ufboy7hbxtc8ovnu48fe5xhgm5or1t1qokim6fg41vwezino6wp0wh4duk9b6ze8qgc1ll0gew84dfqkzi5te2kbgi9wf62ehjdixj2skbs9a51gj5ut10g9yiud4eh4nail2dndlyk4j3yiq1feh22t1j5qqdx9pmub3n6o8g2p54i4vzommdphhisschhy0wydt3qnhjc72kffd6iwi7sonjd0s8v5r2nvdnhmn5444qck05mxxepgn8k7qby6mivro3ube35hxwp3wu8mxyhjd623ajx',
                filename: 'zkgs8cro3j5eoi41fhpcjr3rum6latdpf1ql0cijl43olklf9xbwr9tfmjyy7vv28lu6lf2t3ym7hp7xo007yn88vag1x5tevp1fdl2gqsh18g3yqpyu97gxjqw5r244lbwc7i31davcs8omxo6updz1ubau9i0fou8qhtowpukqg4ima53b6o6kbuvvylpqyivb5e25c6vnsx72k4sw8g5rk8w75bbux2ln91gq3sgvpz6hkm99n8iojsyzzy4',
                url: 'kso1s9ptqht5aqlvbi5mrbfmy6gyv95dslp0us9ey3iaj6s2ph6h45jlx2zul3s6pmuur5ey85q34iy21x72l3haxaovixtsth3pj5s9h5kbattqqgfe031dbudtxtvebi7whjvi6zqh5vfg0i470o8kyi46el832lg6rub1gmido2x9w6d5sjdcczgnmgsvbk9r7kbdxka21ewg8jt6px7hymubktpnjkbyf7j08q0ng8tgl7t2bagebwvzobejb0ehb5ehxx9wcga3tew4ksb787jqq4rxl4w44pc2su42aweyjlp2vlkok47x3vsxqf5751jot7kof1n4w919hjqpq7tbsb0yuo9g8qbgoc5ergbujfvm9cyiucron80nkxdaarquffwv04gpd0czjboc1qjx75rp9006ex4ktq4br1geu68hv7iul9qu0rbtiebonu41awyurxjhplnwbhit7vb8ne529g6vvfvasn50pozsbvaq6i1vgej5g9fbqnhwjuy97tjvf96e9d9lsn6hc5803m4j6sloigxxfl2cizz1ua7pkqcmlvei5i94q7k0gdxua06u8lh8372h2da7u7cobov2z79zyapfog34xhgwikk7q0uk68tejgsy67tnylgeialy9ncnv4jr4idtasjvau28h13y616l8dp8dgo47gqvjkugor337zrh76w1vfbag94y3be6simtvc378ik7n3qws51ssfewm0byy1tfjsmus7vd3s63mg51pp4gnzyk689db2xr66e4kodi78290g5mzv8ee7uxkvf3ymql4ooysmupjwva84ofi92slo5facyec8ap54a1736tsk6ddiin96gqu6hux74ooqguyjy44c80icrw4n30m229oq7tqwr907i0uthlc674w07gkaivvt0b6wx9ct784zpfkf18ogigji3npfbin8liyv39xdbr98nxavsp3h2tdsc57npfj4ywbohz1p7xczw7d0z674gq0iemxes6',
                mime: '0unkx7ar4uuzgktc4o9v35efk15lqvgesm60vdgho8cpqdn88l',
                extension: 'p6zwym6je91bqclpx0ekygvozyj6jzt1wpm3k4hbyt3t1dzz2a',
                size: 4841448112,
                width: 849580,
                height: 677108,
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
                id: '3e5359e7-4005-4055-ac57-2d195056dc15',
                name: 'ov7ls4cpy9mg4hp03ufqk82anqpnt7d064b588qljeymv0jcyjcgtclgdxb2vgegtu2znxcfhzqpptvi135kb7srdd4iwrpfnrvpn880d98kiznobh9s5yy70pk6begxe1iic7rlybeofld9s6ja1yw7m41tr3kc4novyqwl286golx3l7vfiwiv4wocdrzxiynxqhad6pawx7kyim091tkgdoowtvrlnp9pjojuz9ob0jb8ij80jidyhxldfwf',
                pathname: 'ugs6pa7e3gtggqdk0nxubwlacu7xkfl5hg3vre2iznzu4sz78z2zftj1ybny8rlrhddokr7tin182q1n1jvi1t5w6wflhfl0yxje10fvnkjcsbkjy8ig6ev5097nlaol56ktt2pgoyuz9bs5pxm9x1hytjs3kd3x86fye7m3aw7vdsg6eh7w5d74prwp941h9oztj2a6wlbry7rqjaqdnrz9kwubaoiztm03esnn554mw0d8bpt39fayst9llb7049tno61mj56xurwn4wd10owpw0ozc5bo37rhd3r8bgpnbbejt2ygkx8ckfg1oj1p8f0vyyp9ll4utlbtdrpbrcc86pmrj7aiw93nsu32pqqrtr80c4vhmk0ji2hpqti1knet91xclr24f5o8m0lnvxabw5pfrd1zjy41j232874bx0b8czqdm1tkl2knuwfopn3t1udvnpz5ao7b8x2bxlibddl89oy5mwt1jfv80atcz2808gchmvombuo93nf63jp5acyxyg0femvkj8vvypzr04iqizgorklqn9iovalgfj7v85gdevv5ujdk9v03m86ga844xplo8o5ax4mbas611317mdoq0k0xs3l04oyv8ar9vw6nzi7brzpkrbtexjgl86c1m36j26fb6z14ist7a5o2n9wm88gt7izwzbskf7xgzkosfcxu0pl36csa2fztihmn09hfvmrfsob69b2q0vy2fsbyap8iqw3n8a7ynx9mxff8j2jzigfkpem23wd7fm2vmiz7rderu6y6vuyhzhxmvljzp97nhnhwapjt2hn5e0j71htquo31h7czewbusi2y9f8209d1iats4mus4ka4y3ljp7arpb3qqahq8pnl6nwjqmjdtgajqyozpmv36fw47rzk25zvui919mo3t29q6x47qaqj7b04mwpucs95t7u8i1ow2ink3s0xryznxrwb79uvd4dnnxdmz8wpvoz034caozg3nc5rkm7o1n57zr3saeajc7k9noh7',
                filename: 'aobdv3f6xf3qxvyhw2xz2g7hj6f627yjbp20m1f0rewz68nhnns82gfrh0mkcz84hg4sqnrh8qcfhdtvawwt0jpjw5vt42neulkohv2fh6hvkn4hon90m4vzp1lnnuo21i0zp0sxyxphmhirvim81led0tex9g1m1bu2xwflnr2pi3a7arnka5w9zyeu1ix0s1pf4vyxtuj23f8jl3injmq40utn7zz9l6ehjhmxo6yq2wv60k1n2b154dwpcv84',
                url: 'vg3d2cfghl0awdjji9y23732rpwcvdwf96leh9zogoyb3nqgxvlaskw9v1y0jx6u4hxvubp0wa46didql6qvg3yn9f8ha7qfr3x3159tz5qoalas3v6xcewcqf4n671c6yori1h4kxgykqikowvmuay6v75oln695f816zqkea2e6t841n3ly03zs6uisjtwxtye3z7xgt9kb61guoefahi0c5875h1bjtyb13p1q1swsn7b0e61xujblku9a074eu05jr14mw06vi9dvoy6bbzfdznzl4o0nu6x752e3wre2ipniuxbejfcun8zuszqfkwihzkwzlfkpdyi7sd8cbhkcm6f7j8aeni4xursb8j3o455i59yzhlm1dm14jo6uazjlc5imt5v68cey2gvqobi3hmqf0ag4c9ab6r81flzplnnv95nkz53ro6r38io34o3x0uuwhu7rdqu6jvmvfcn0a4vt3r4b5lvbkmxcdminn00d9l8oahicv2mgx7pi6d13bc9gj3wl5hk6nke00l7ypitfxph03w8451f9emhe4rh1pe08zehnlqipfwxj4es2unuxrgoyqfgb9u5hjds83via28wzyhzrb1uu2a5nvyktkqt8e8oode3oahl7h5jpbkc0y9eedcn4d5l01q6t1z6qly6jzmea0owkk4mz1g4cxbk9ottdntn71ndsqf6mv8j1xtly86lp5u6vkz0ppfmjfs38chaimeql0muftzkra4suqu8x927f0ezrm5f29473sz3rbfx05dtnoxo14xi2u8kgw1m3sk6efngb0j5tfmjd7tj4rh46cbolqg59gmtgixflosbj85wgv0x6bj76s7hkzvgf1pz87hpqa9r6mp76ba1nrnm9ljjsnbropuczjnhpkt8fxbat4kflwcunrh1svid8bk7ixi913mg667znr13gau5d9t36jifxw4uu69edg7z7381vnpm91tg80ojwty71z6m1nwicf4zxcueyrmm1tsen5py',
                mime: 'zeqzv2psx5egxyulpxcbs3b0x1dzvh526d41s7016dm7e2qess',
                extension: 'b6ksbtzk5ujxyluzhytjfcoo03lul06zm3owk8785l0ewzj2yi',
                size: 1894291838,
                width: 729180,
                height: 760351,
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
                id: '3e5359e7-4005-4055-ac57-2d195056dc15',
                name: 'dj7op0nkdey1fi4iwvj8vfzbe27jb60obc5gqh9ormkntdb7qqfji8k83g1rllesj6qyscuo86ouwhi8xw7stg1dfwrpfwbrifxhpdhvtaszzhdwkkjg8aaerrjkcmqzv2a65uvultot1uxa8vc0q4itsxau0idgk7cqrwyf7olocpn0dxbi7g2wcui8ggo1uwi2g2cr9wrk013r7boyuxlvhi6bya6jdy3kd94o5g9uodjvkipvgnd44q62d6u',
                pathname: '2tv7k414p7ffpmv0a6a527rwiy3k2pjai6zcy3zjmtfij8gncc6nbgqpj4ylw4g54emtxo1dpb95fkgo0jwwmz8qjhzkvzepu1mtixw76nbsppvkwg2w69y4uvfw129unqyfqtfsg0htdptzmfdbbmozhzc0r3reogoh598f11rfese1oq4ayresv52l84m2h4o1ax5hyrhnvmvu9h1pircdfoj87gyhbkfl7cjc1c7mlv0ym9olc2juzkc3jhqvczvccl18pj1bntaaazbutk4f7go6qvft6wsst0ze4vc7aolqmeq2rvdici68sws7c8slzi88252xgtadgayn5zwcktdfq58vx5fej697c36daabyn1mkz47hc9ydztdokkbff4qncpenlecto675ozj61pdn63um89bzf979cc5vinirt8sab0yobvv21oj7sjrnxz2piwg55o56sc55mndzyq8gojo20w3akkvihidyxeu9vi6c1fpvsotg458t889it17obzh8mzc5vbwqzvq9qbw79z18g16f8hn447903p7r6jdip4fym4tjxnec5tpha3q6d4ot8fkiqlfu4nb62305yh3mj0uovkn9xfsum7utke4f6wp1nr6dctl08xq5zzmm19kkqqq6i4kw78p3hyujm8ttudy4xe5bvcuy2z3fpxucflhvbsw0hc1hbs68upvu4m7glgo3b3ean5un0xapjurifvepmjxe1l1pzn92h9coszyedkt75wqjxac1gsevv93hh35f02fwenjw5ag57xvxvts5sj16o5d9yq9yef3fryxbmickz7l5nahc9rjkvg3at2eq78fjn2sc7x62alhj14t1vkmu8ylxcc056ai26r97gfim9o7nprq9p4t3fiuxhp7xoc3mory80vmr2er1l6t5kr346vd3f0hsrn4przxwjjukqq5f1e7avnc94a85ovepypzjbgz2f3ed2c52bq7ngktcbcugry21da2bsmm2xne6i3n3',
                filename: 'j8u5q3s74i2xfd4mp5dkb9vz7bmzcxdobc0myhy3o5e1hv82ors9m0dpx9r7v0lnzjmy66xpne3okf4mrasvgllnu93nrl1pfim6xmgg0m9pqf28jnsbr9l3956wlxptzmyny4baypxmnt9yikh7uqy8sixbiqddtcvftxr25w4vbz3evecx3v2z0xqywjafmmb6qp67jaajylnmm2j3f9996j18pmmw8t6ta4iwn94gr2lp5wlg1bpcd3jhxmr',
                url: 'blr97yvbbhltpe45zl312g7xlcoij9v1wh876o69u51krxpbfamrubjcnpd4fth6nd2p9ru9j9cwfpod3oeicz2v9d3yrablpu51aoi529ehkgykgpis7q76ptnn5ht5b2gcndlvaulqe8usla5pzd6jp4nhy82eqn4ps1jm3mr8znqyb54ous9p9ji9bumttbym833lbkkub105gkjs8tzot2k1fawo75tvh9hh9sf6j55odn5l9htxen044mkk3ofjsnt11tesipopdvlfrvlantv5iiansv3bu8h0aoj98qm7ntmjisvb5uu82lxrkk40wu577allz51cmy46013nbr1ig6txqg02dr5jph2jl7l0opel43qugh4znoeus10v9g9mxv8j8w4ltxzn88oo04gh0fzt0ecmouo62h7mvynqr1afu3ifj9105el7qki8bwlxsch4dpeib6dlcf5fhcyitfipbvnx1q4wye85gaj95zga7sb8diceo7ihqlh71iewh0usnia8b1whl7aowvtvka8ifyat36rfcxd383v6obgsqd1c3zneq80mkbezk756amz06z6iamyzplk6ogg9qjbhd5eeljms8gbto54o17gjtqn939ucvkcjqwwwzsof4qe90z8f501sh8t6r0p29u3nk82gmb3662qhnamtncdbn36pvlc7xjkr4a1p9p5y4wfm0llgpp99m1tzxqn56rdcmr9dteb42uth6nnhzowbg3jhlb14bio9qxyyr0rfo8uce6n78sagcqziep65i9x7r0eq00i6oq6dwgkgkpsoh47u000weuasckv4z3f0fngmvnpt692y6mfc7e2qcye982kdtw9bvqevuc9t6plv0m7t9c4swvdc5r5srgqpciulho8ximb5gwkw1jrgiqtj9bgnnvhz2wyitnj1dxr6noxf6txtwpo7042j02mg1a1hlb0x143vt3kde2qdpmr7ide975y5ma0ccnu3uje3z39ljp1emmlg6',
                mime: 'ihwbz54nu03s3hh1u7jcejjavw9xvj3d7w0akdh2wj7ed4j6gv',
                extension: 'a6xtt7n66skgobkk8kzywufo44djew81f9mxmgw1t2g0odt428',
                size: 1306036836,
                width: 523607,
                height: 282537,
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
                id: '3e5359e7-4005-4055-ac57-2d195056dc15',
                name: '70gf5jw8m0kf26i4jqpgbeu95gow5qkc65q65sdx236fu9qb96826o8rqht5db2zy56lcb8dhcrvdxqj0fi53hh0dm78qm2p0qmomi0jkwfgsz681xonfm67aio7ch48n35vo5cqaajeukygpbl92i8u55c1vxzdf7yws1b12cgqddf3xg8j4vxuerez10hh3ekbxwfr7yslvq2v5svsy0q4jqv49yiuxe3s3lp2b75v1box6ys66ey09p3qzv5',
                pathname: '1uwst1bsjrav2uxgnay6wckrxu6q9c9xyzskyhwv2mvclr76ema9qoev47wgsbybgfyu4ufi3wqtjui0ohqe1ip5inualflt8v34xchyo9vtrvyxh61n7ozfi45avjafoa10y73132raqbhqmfcnw3fmppf4kaw7tvupwp77qntdii5zj9tm7bupn9byx13hfs8u497pepg47x7abkn7kmgz9yovbx30419sc4ud4iftsytira9gbg8rkiv2wr1pecjdedvnjjelbzc4yiajc8ept6c5ylv6vv56y7wf6ud30wbpsnoczz89li1tu5dlcmnax5rlqf5w7pt2j4a9z0z56l7302latzxlf2bkaztxwxwjl3eeyo34qi4nnwau6foy1rfnw0pdq34l331csgopfmfc88x29hlmsi7fs8frteoruie5l13mie55i6jcb90h4bdqx1xwwxzd7ca88ptwkliyb481jf9d0d2bfjsividk9zglimdqcla8uk49h6w5ugqjgif8djp5caq934wmawqlmfxqk95iffx2ro5f4cyotpof9wplakivb0t3idys7o3uoi8h71g0fa108b3jj2oui9seei6npwno2ejm5y165wpwi4tw9uvmxcn4i3b7d480p6pn54a1o211rxchianhpm4fupz8kdogb5tebzfuyafh9b2311n80jug1saeyfk165lmkwpx2s1ml93hqvrlindp3toyayb44sgrz1rvj2d0nnbop3c4gvkvu45ulhlol2f05zm8j0psjsyna1qit0el42m4esi2rwdc4hszqa93bd1aon0thulna2acxkwlpwxtawimk311k5yas7pefvte96shsycckhtuitjz7tdv3wnt2bzgfqitjyaibaagw3xc93xarsrqfogrr2uvfy97opppa10t9kegh4d4h0dpe5ueebcd7raz41wv6jejil4mfcpee11i6cguvjqxjoeae2z8n9qjzc9x3b68s4ga6f9cem38stxe',
                filename: 'lhh62scbkwrr6f829cfvc3dzfaq7mn18y6tptvrx53vid6xv4d7w9foosi3yy7g7yj1ofobzn4ajg6zm2mcb944m4ziap5tc9forplg2ssabjyw7s87rya7eoyhubi98r15erh0c48oviwd1c4cfz9fks9l075k8zjzq7w290b35r6wt1b6fop9vvo120xt3fzgs484lm92e5w3npbbwkngnw2ps7u5mdzdy7jiozr0pb1f29sdi3zrya7v4izb',
                url: 'yps9vctqvzxkfzuy2ddlaftyz72x7jku8485wi1me28c4sc8zwc17hx26w68ccpm1cqhh5mik7ec8npr8n9vmni69p1i1pg7qjrdtmpokq5jvptyjw66yg3ceinudal3f6twueqje46tk8742xdcvavnzjnr5s0gu24q0u8oagyjz65ct2829xhu3nq9otcbr6czacfaj661izgdf2xmh0r4u9cpswdrj8j8f0k8t5kf2thwnlopcw2v5gd77erkmts2mk45qi31gcxq0vwy7x6iwb0of4siu7rl97l4ezx8ygs9skgtanncfxoyeth40htvd6ikoozzg92nh8fmerjnqrhiw8ybnm4kqltnsnhzm1tmgf3ptdtt07c0jnt89owqd51819b1wwa9k7mzgaj17x5pui14zu3xjqlpm4g5a1d2o2nqosiyybul5udg4tb69afszl1n1htrraau3wkfm9g6h76s2j84kx4l91kau65a0dy695lh7xb0bi5t2sh1avr8m3zm0spetr8hyd8wv20loas3j4hlar13dicu7kl8lhwlfqhmbjfn8yhex4xy4yd2evhdc7zce8c2bkwv63dfstipyi2pcpew7npkbexhg0bgrfplxyrpxz62ld072cyvw7dz2veo3vr07n6i5eteub6wp5yjajfma4fc48fpbobrl3mnpbkkayul5j5qcomrrh1mwmyggnvb7h6be7n9czi0lf0s8xdbfgrpybwupxmbaxeee9o782c3wx76505tsnwftcso1zk2pfyyej5y2r7mnyxgeajtucm37qgzb1e7a8m6ktk0yhlvjmbsi5asj0xq6qkzca9npdir94po05zecvrnja7ywo3dqbreg52bovl21l9ktxk37qx8bt1dettsus7uaq4fdn4n5e4fnxdprv7a1gsy3fdgijkdhbk1pjnxthbfe4fayi0eofktmlqugs6jah1hntypwi60hlu5f2sscfu8kyr72l4rz116p7mdvn1d7cz9',
                mime: 'swkn7tlvc4rgxp086v7vid1x8ziv2jxndyrksiuehchuxwauahm',
                extension: 'weqpe4szkdwybu6x1pqn55sr8cir435z7436rnj5m4tsvx2gi2',
                size: 2118944869,
                width: 742162,
                height: 710901,
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
                id: '3e5359e7-4005-4055-ac57-2d195056dc15',
                name: 'qd7na33rokx8teniamwhl9jf4a6z62mmo5hd96ellyx8hlfn8ikrc7kgh31gwms3gy9k8vr38tounqnpdyax1xcqnjcwj96l0n3ho3p8eeuozkqbzkcdlqtm60a3uqbs97p4x045wu5zrvezrrgu2b44dd7dxa2boaieb8snnch1d41irfkza9bowk7ydeed3bb9jrrzr4ifeia26sjvp501qnlvrjow0qf2pa76x3jz7cfxa1a2mqz3lcvrw87',
                pathname: '1i0uf4zy94mtyaj4wpv3pkm9ag98qd1wmtskqprptg69e2hmco3zdgusnbr6247vk97a4vcjv92udp0o53f9z3h5zk1hz7m9hsvk1hevickmh7fakf4k7h8p8pr6kx193bbt1yv52wdbber6poh9rmb8rho7alwgex19f2rmrm77g3dj8i1pgzz22li6y9ak3bb7qusm2kcyxiy6u2zi8hg6tnxllovi3hdl2z1scjs2xkgl44z0980e4wjlx54g8s4n1ileojgbk8u2icxez4b9018remezmz5nqw8ytccccdjkpk0934ytsu6rkm3fuhxa6meixnv30su6gawvyq72a4y1e2v01wk6oekrhoh1keoc70jaq2555hh19fofxxkd0tw9dqilzysf45ddqtf4j3vxjulbyyl6frnpbs7kau59mwihlf80fay617sw1d0rwwgtfpmpa1bubtkuvj48i1rhv1gsgsgrjv0hmfi965k5sv1hzkoevqnb29fsdy204yigdd8g5fbtel45b3qln1xhosuox4dak01kyyhwm01qfat9tp8zbthjqcx901xjdrdiedd0065aoeq0mbxvs7txjh70ovhxo292cie3xg3muht2stb217b0egjfrk19k6yi7kevmc4kovx5jd7jv8ojst04insp8oyz2xnokls8qy50uei1y6hi5zvvha0mk3csprwqrue2p197f1jmoh17z6w17na5er4pzlxudc37yfznsfe6rp046jht0rswoe5bik5vc77ag69u3g6g55tf000qed9ze65y1ainjn8jlsxtrkfjuzblf9sin2nkiboye9p5ukbv1dq6xaw92vmonqbllyfxvwi72qlr7hoqdnovpjox9etz7kkzjy6alk2yfgos61cc6mwwg8siiu8lwpb1yo1452ky9wokx0g8iyklys303sea5ew877q51k4cl0bqvjpz5zpetagr0a5k13rbsx179g89rtk45qysin84jmw96xuh1u35',
                filename: 'w54l1g1tx31m53g87tvxae353potoi397euw2vxd74xezlbjciq3e8j0t73bpkerah6y4gcvsyxh2m07vp2dgfd4sa9bsk5qs4hjx21353kts0daev2gcithsck6r3rsc70og3nwk781kf0ido8t6xztfzf8n8bee73mfctw3p2k44t6jlu97h8aptaarqohkrcxyj1apwq2lyo3wnm9sphsse28pl29bf56ix2ngl4ypmxosslrsjwij6ecozf',
                url: 'zbdbz2x4edsugwu5qnenkdtucpl5b2n6jwpruphnroompla2eckpgcifcmshk187vy7mkc2l43ecgpot34fkd37tqcqwo68ohtl1vcoucf6gwjwd97874lukfok2hgpthw7pmdplp762yczpiktcs0qi30x590cvjkrinveub0nows4irmgf9ffsbdgj91qxle9wog60qdynfdp0o57l268bguc6aw4u2dspmxa7i2xfinoawah8y4ig8hg35pzvdodulljhdbg3pafyg0tc8azo28ypp9g0thpdrjonx6bjdr0oe8uto77fgj1ipz5n3wu6poyxg71rzarv2j5kqefumte0i171c8ngi5dagygglwjefozys22wvsnlpscrvr77tpp5a2k9otq4u75zrg68tkabm33c66t3nd7t46kuu5z4jeobdye8s29x0if5dlknccthkm2piier96sefxn741dfc5y141omfa76ssnkz8mflcq2b3icq2n2tq0zz7vqpgl3488ptzhdg9i8ee4bu7szoo8m69oyt9dgaysr5ppm26ziy5gol6es98s8c9fc5tvh1xm4zcl6jmoayvg3angwf5bi2flgozm22pwo2w8xby0o2t6ubwl0zfqj7n2bqyd5g4sg8tq2l3ib9qe3h698vhnzgkf5oavtv5f6enwl1attp9hunj2pbtqp87tuay2whmlmcraaammncpxq8wty0znw6ec2dbhzm0k2kuzegdy9zs51n622lar8nba9cqzg3hv03r2hjoenzvkysrzfoxk3fkm5ujwe48smv6z0numnjlvwti1oeynws6otbwhjjkt8290pxiptvmgdv4kykj8lmz59xeycm8gd4fmzt08ur0o8rhn86ay0nrnugya7b8xo3dwc3puve1kihdcdec3pfqdloebcsa6wab1owql2mqp41wbp573m8e9d95jvk62olr4t8v6ulszpz2ia866zcwn8d1j9kh9hcy7oerx43nxl4hqif4q2',
                mime: 'aw2xk6e5ohfi4f8vv680d03tzmq9camgjvtebilvc4g8dio00f',
                extension: 'c2ew8n90fusdc7b01c6ortbmhowgh6mmtg4fr3c00dapti9wzw5',
                size: 9722046851,
                width: 441209,
                height: 824273,
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
                id: '3e5359e7-4005-4055-ac57-2d195056dc15',
                name: '560dlggyurerpf10ncibnewa7h3dhm1p8mlqo2daj296sz71ejgau9k1yrx3rsshmddidii9huymtpwcpv4gj8eif19mqa9w4xqk3f2kz6jyfmwb68j9gw4rtk6kravc4ftkk2bko79uskc6qbg2tsjh7kmpx5u0h47gv7vgdyp7824x178rnkp5ha93ou0jhoddvlxmyd3fqmje9i3rn791y0o8y5hi8rhemxywuoyscrqi6nizjcauvafee7n',
                pathname: 'i8ui7geu6nbkirha1aipgy1ylfmbxsej2eo5gkid8afn9b9nyfapi7490jxw9q3dil65e3xx7bryudukiai9dch00xmvj25wma51jpuv8gqorxrizqqrqrkb9njc715lthq8t4fr0dh1xpghpjy6w1jvih7ki6v99z6udb9o07mvt20wxrnc94i8yozuatlohka151kqblrgy5u9esycfwm2vroubn1y7l1yico5siddigz6hrmtwnkufavlzs2ma4kfyobhw8fyr994dave1zdqryvr67q8z8mhzn50000rivu719zdv1a6d3vpuzk36hbv250fzkj8935i39v2iylq4nmq1yo9jmj53oehrshj8agavmitrr84xcxjlihc2soyiiwdv7jf4stszvp0tergch6i0k991u3qtqneuxakm2mait28uhirly6sml9x3wvm30syzjl565hgzsecurcklz69mjv4tcueadacsf87ieae9uwqmhz0e5zkbbcuvxhpwn0pz0f7s7ezxi6q5rt12tc9tiwvj90gmoegojfr0651in1cf76w41pp32l6keadv99xuqbalx4qi8agbqc4a17sa86nb4tbqmfz0hxmq0ppqn7tno77h961surg2ayjqmkv4obbfcml9adr85faqipusw6qa32rfcpik4r5kgt6oll2rfrfb9zm3efydj8lfl8nuu7cis6eoraxvsz8c6b0unloza5csfxs9x4ldz9y9ni1v2bjn2aq8u7uwls6whehcfkttdkbn4r340pmzj5epcjt4mcep057w2wrw6cuue09g30yrph300gnh4op1sowndykb3f6hjgsat0l2pqxyjuxivzn3gfwcbf27h1gamei2o19k8cdza29q9igu9z4tsknhcznoukv7582rog8iwypfm6lfa3cohqyhjk7hnv80zx73eb1dw6qhurvwqjzs65v4m229d9xa7rnkx5g8nnh0j6p5r6jtipuy2vi7j7lut86pv1lcuhu',
                filename: 'cdth5xgx4o75b3qlphxzhdn76p31tu63gavarr1pfih42n2q2rwld4magzgw4oipqjoyqx8xv9nfqlf38cngssmfal1h42qrwceqej7ajuangmvccj1hj152r7i01wbdz7891ecgbogx221mhyt9frfan4vqfvi4c09e8bza6ou40sf5i9es9upwwwipamepqcuwkwo2ktx0snxe3eq34qaxrtqcgiotrbv0thxlqcir6be3pxb2bhceocf0rpx',
                url: 'brzyfn5j2mqa07cxedkn2sqeaneun6zfezkly00p1idrbu039scb8az0ow2rcktjkq3g8c1ksc8hprwpz65hddvblyniscnjgadrzdtukx4glamog5oie4xrhutdcifidr03y5srtqh8hz5jf2s881lgcw7pjygl0ejm79s8uftuhssfqutbrzovatybldtj30iza2i2k7rk9yi0h6ttcfmy7awvkvcrgpxhjpg01tp2c87eqz311vzxt54vj6thruw04fclpkccy8ulvpirq6lws4fmr56bx9lq8kqcod04ysd14q1z06xpyuvxlpzhza0hyeiesiiptfqxntfbpgbdm992kwq811ku6n3xea03jx9rxrpf69hnpuaig1r94oam9zdeana7tm8p5sitj927q8pmhas4ery6qwj3a4wrpu1bkjedve3ce06l65hb1l51ft16cmm3fc79iq39tli5i7pji38qfxjmxcz3h9x3cjj2vyl2zvrd3rqt1gdqvvbv9ig4k98bhhiaunlautl8nsb3g2rojqec73i50rkybp9vbp7dp2m2i7b2wrkjsqhurzutxrdg5ilh8v5l2t66tippz5v9356t3d4r4kq5jda75dkm7ra36rbmegldeuc2eqxf75ocybyjnn0tdr35as0bdyjzobnoufkjgqxmju47xq2a7r10tmvua301mf5b11djbr8x6enmac5ltpnpfxwqpig0vfy1fjaiv7j8nllsq5t8f6uj0b9xrdv3b5vt5owfc2yndjtv896rkffic9h01614m419105whcfpu1h2j8vyz2k2h4qmo9w2lu13wd1ht13hplmamf8qbw2nncw2c09f9dc0a9wfzf4r667lyp7737jt8w8t8iiw07y78re6yrtn4wvqu1qvhhohh6r0r4fiu6ygzz974mwbsw3zjv2m373erqcai2b0qmu4opk3wcbfwoekhckw3t7lhrcx99hajugp18agbqlglma18hlwv4j6a44ldroj',
                mime: 'txoqlp887qh8plqb9mq6ret8ig89ftjj3zpl7439lhqpa5iyel',
                extension: 'ytyyv9pq6dt1jpw737fgv67z4u9hv4xykviteyv9bnmkusde0z',
                size: 63434487583,
                width: 395232,
                height: 488197,
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
                id: '3e5359e7-4005-4055-ac57-2d195056dc15',
                name: '4p3ak80klany9vavwd0kvg9wm7dd5j1bwmv4eohcr72hsvr08md73l3fy32rjhn1n9lx7or4egpv7tiyjz983y11in9zmvrbwj1cmjy29j6gy3df4fpmfs5ypolepjo0r7jmpsdg52r6iclu30jj201q0wexmu67whnne6v01agssk0h7dkwr07wskit3ymydxxtsvt8uqjhi3hewx85xaq72ul1td4x6seslahiza21c5q0cyx5y5jv7cxkq5v',
                pathname: 't7obt4j5pkilccn0nk1iaunb5dzvrw43zlquvmk5zjp2ac6qoo5pjsloc8brh3bs9zm4wzr4cia1y3ru4c8k1bxz71zqq2ri76j4umcpovvudqcclusj0s8pt4dd4yqlyxxcyxhheh181s5k462j1qkjo1fmz68g9p11cdov2yt19cr2bwe61if5mbhxmx16dvfyfobysjzu217lm1qs1q8yuvcqmx6nrgf7ee1lm2nmu31gebszdrd4r9yywaja20wbxoxg1uw35p2pvbmdqy7rduvith7syn45gmt77qmtuoeyvz1862gkg3idgwkkgzm5bfnk9j8x7ze0fwv2lvkbf1rwvizc0ntgjkvh01k0w0379l36czahjgls16v9e17fnfdgw3syfn99k93a3djo02d9669lgvltzu5eq308w50gr9tgs96pksdvejyvopo4zxh3w2tl1efac7eqknox5gvjkopjwvwknc8d12sswlnogn7l45puut0wtffu56cywh92qs5g8nyte21b6za90oziu6odmzfntmubyldifd7cyk53sm9lfbj8cb512ndaoiww4uws00heuopcxlpx1uj26vpsvlwm35xvgv0v0sgedybjagkjtaj6xymfy8fkc99gc1e87rgj4cp0zqu7au5ovhllvdifz0r1wiys7ks0azqtxaabt0bb2q4avs7wic0gv7t31td6d9wzdhgidg2jwsg91u5rougr89z1wgrbuc3z6bmum842tq3wgcgcf5rmr18s54d0sg5s741km3cig4p1q2cqekvei5fjap7u8ggafuovxxhvqjpwc5tllhd07915ex4ml8s85zwcmod5nwklibo1ux9cjtmvqtqrdb5u2h1idyp3t8fejs20uqtc140upab6dau44rcqb17hs7ddlzyyg7h98okjy7xeznqpay1l6g933kkegdqlvfb1eunum6d1yed6c260jpz76u512rlid5oxykm59rl3z2f85i0zfjqyocvz',
                filename: 'd2iymzv2sajil57jm71ttd8n4tlwzlv2f73hkm2027wmz1byp0r6w2jzqg9qo82k1jpw2lc2j36o3keffha2xzij5brxlt69h2m8khgcfytxxnv3pku3l3bzu4ym787o2mxcbmhmljmw7dy05egdxjzuxil5spf28idty7h6k35ikmhwgqf9xb42uigfduezfp6sbwnzgmjhwizlpxrijjhi16b8odqn1htgzw5djo8fvcjvsovudmjouaywi2r',
                url: 'rk4roycge5rgoxqsh42v16iipb113bp0cfnign3t4r27frmsqjqwqjby47xcn2zc3xzrooysuhwrcwh0zhsbrr98dmeoo45usbhmxfveia2o0x437fje0j04teizv5qo6t1nhkpapvaxcaxchzqnqmg5euhlmlu84ow1d5iiq2wdudy8pm60j92gjnirzf27mn29xe5utre0m3f151vrfrb3qnizwco14q05pfcbrr776ao5lorbv94qefqoeplvyu521lnf94w0avochqfyt8wel92bma4jzxnkf6tk8ypfoqnsn2zs4zhw59sqlmbdt5tva23z4oceh42m1bznol4jcdazrnmkswxp3vld6bbnn8frnwprpi606gtigim66o2b49gzuyg1zi7uw2ds2ep6o4m4fqf046xavyoe1i88dsmrx5r3pvzeshtzaptpkdv8r9vvovin7xoxwvckesn609xgkvqf0oy5xvlklh3sp2gec9kl2ahk1kka0rftirkz8tvmga19higrqwrj0pbinq82jhtkc20p6y8qpvpjcoxf5crs9th6tsgzduv5ki644c31fqi2c8vvizefaycwp5ys27psn4xo7dwxppl93zco0252k9fdxlvfxjjm340dhfwnlyold9puzhwhnue6kkklah67a1qkjz91782b61pbgpw0ipimcdslvoatl6hvr0533gfs2nfbbyx2bo6jmgtpebyms2zqrwwu96uqa6h48fvlk37tkaq8n3lrby59kjxtvnsblmeum5wv8ooup11eqmpbox9zwinbldfbfzyazawpm7s57d86eb5dpe0ix2a2vetv5bluie7fov93on7c4y9t91bv0o1zaztqyakz4q3q3wh8wl2jm14hmskzidhvdv3wepa3iwnv1pspkfdx7kkqelproz4oj5osxdmqnj8fh8zj4smghb9vvwz5kc23hb4m9c3eb28w5mj74awu921tstph03ylwi5sfnphez8o1mk6y04r0jms',
                mime: '6dbugmpmv87olvdc1nawon3vl56w229rpat7cao1vlfe921bi7',
                extension: 'of9mwffuh30rkynnefuut0uqpxl815fonu4a6zpk9ij3fggshx',
                size: 5918003727,
                width: 3578958,
                height: 861493,
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
                id: '3e5359e7-4005-4055-ac57-2d195056dc15',
                name: 'ddpzl263m5i87od7hssp8upxju62yg1pnfxtmpbleg6usjp97pvaehbyeq2v72ooh1uitddvvccyjdprd99cq4lurvp360cy7ouw5mcc4v1b0vo6klqyb6yldqhqgvz35zsz8mu3g3784914bq6bwuf91fovyv1nuvyolfob0ztmxwx8immzq60h3cb9ovh5foi6xppnpgr4wvvdjhhr53p7htvs3xprtw73s6msdjau40nwryw705yj1yrm70r',
                pathname: 'rzk1zj43slofjsz3jbheauviojofttxowbko4qbo4aleijonsj6hn50pnxibzza3itddy0rsybpq42jm3rs8dxq44sygfue5hjajrobdu5fbas4lzatsjj8sz9ggf5kuy648bzrx8cbo425css9zs6169v93yiafbbdf6vis9n3q7s6mzjifdgv6m2ijecc8pr7i9thln0hiwzq8u849uqt0cx66blrlaa94euy7alq4gwycndukl13y7h4bh3npenkt6i3dirow7yk8ek6ih7792sm4t02214f0wdukjgroa32xcgssb1dcz7rtk4mgwb1wejzhrym20e5ev9hwrkqe5kqris8c1xr55lf5jd26xv4fpmgdkr0ctg7i3apcd3nk302kxqnvjcvbizby517arsvacore0pdg819kupiz6ojv8f1mu4hpkldbrnxiy2p92xw1zryb1w24cusq3594wg9anuul5koaf8lc5gexz3t6a2qeyj6k0t1isoytd9uuobqwxqlrsfrbsfdtr0rtoewyv9vvggqqqfath079aqisqrnawc8wvlswxktn9zwu7hqwpszu3wohanxtcrkp3kglrqkg95va6bbeq56c6crp01zdzvxvr3n9ssebjafuplav3gx36uhwyllhguy1f8tp1g8d3xqxrzgsr7283kzaspyv4ko57w2mkjju70wp4wcp4sqswoqc97tarc6xolgmgob778t92rvzmkztkh30agk4vns9xhbmjnp4bwotfljhpuhltat6o4cmsa7c2zdi8zzciveb3c8hrfcjmplgfn7ha4cxoouqz47yyalvdb0ude9zd3hmmmkehec9xjs8bxb3yz84afc6gtwu41e184znqivy6sdu0e6cg4dew3z14o3red2s5ao4hy7eq9xujfxoc14j69lnkgim1dy2r640i9j5s6hgsmscofkyqv8jcj5u2l5s2t01p6cwoikilidppgf4nl2kumxiqzcm72r7xsp8id6fe1j3',
                filename: 'qk72wvuler5x4bxj3fugb8gl1fjz1wf0fbb09l2rq9ryj28jxrf5xizg36i2ekp2bp8aiwqoi6n8b5axrdfsmcvxqo10dbin93bopaw5vvn1uj4snqc2e7vb3cpj0bjsjbxt9zf8tkokbk2vnx1yqwne59cl3tphauoxpxjb1mcp6njekuqzuyjyzz145dcexopdiesar5kb8jd5tks89j4zxobblazsk6d5y3vybdzy1rmxtbz7mwe0zv7cyp7',
                url: '4d26fwqlf65ppgogvv1ta3jr96be8tppnm51l3vl62k9j842jobs01z1fsqem6ugr9fokljvbnly629vdws7roc9jj6e96bfrbxl4jjao5h76srd8mrnzcdawkchaeuocbqfgll3ww38oueq44kxa8gof1wndqvvslr5rmks4z4a10i800djc73lfkvsh04u72dfu94b5xymhucgjw3f2we0043quwai5i3zerdk9x7nwzyd9toaqjda1a2jinqzjsxc0v4ma8qqrqjuo4tkqkfvstx0ry2k8snbh4xt2id6kynaalh9ngus56w3aajhg3mlm5szejd9duk4luk4iilyplu6n852yjbj5yz4n983xz40yfrk9ve0nny8zym2qw2ul0itidoxutxnyx75ijzvh699018tl3891c2atlrdlwn1ix6jooo8r8y5tq2rpswx6iq658u3q78l3v3uk10hvh4okx0my5uitu54s8wr8w1us2tijbkv532w1hgf686jir1oqgq95bfgnrifcsokm5sj0uvljms1co1n3uvldmf05yxjshgp6gvzh7kvp852f9ca837yk6qv45bx10vwz9g0od74f2kg2jel07k800znxvs43b6v6gp1xotnrwdzxtr1591al3fa6lri5oacl4v58kk8ne8dotii8szwqzjapund6j85jgl1eryfs1wuzzsljvfxgkcyth7zfn6q4r0wj6vj1q2loadw8ef85xxc7f44b2h1oxht7mghj6fg47371lj7jq8d46ney0xiiewhd4cwmp4c7jodovv5qbbhd62pqfykwt3sak4e8hcfb70t5frgoih87n6zpmsmcjb22oxqfiedha2qnezzqnel9zuxzbqjd0f0uwc1me0d3auw3ndjt2wk3anapqm0k3foqg31mwor3gm5ldqwc1zi9geeg2c39rpv43kupjem3o7z4iz27zb5gh2hjmw7o3dngigst6x0zovi9s04bloqbg7bccy255d4s2ar',
                mime: 'f7xi5z3mb0t6n1ikeb59smovn74h95652yvy5e1wdpn64ue53q',
                extension: 'bw6g5u1lu2zsdfdcbzpp98qkubrvlj1tbcx0scy8bgt4l5p7bb',
                size: 1176564005,
                width: 551377,
                height: 3450634,
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
                id: '3e5359e7-4005-4055-ac57-2d195056dc15',
                name: 'l7bm5fr9c5vnanghloo64te7q7rhys39aljiso7fodwtw6g2g4hkqzed0f6w0nj3ksw52abj1tc1oghhv6r1n86pd9ya8z0yc9r69ckznjqqu0j2jyo28ozo2kmgsb0he0i8pniptr8o1iyldup1be1ctomdg8f011o5ztoaaxbbdpf1t8okazcda9ytr4kt5k08y7hojrlsadiqpeaxipmwqo883tvm8hod54qfy6v83l0r268dpurc7p24ds1',
                pathname: 'byo9l4wewe6fczxg2e8mqkol019chmhndkox0ig9hcsmzpgo2ik6pjavbvht2wfv57fncvpz3aagzqteyz7p7oon46eul8pv8wcluwmyxqmzoyc71qn4t9efqe16tt7kcg7mfmtqdkm9uqy83rbh8np89fclepep8l22w40bbrz1cu5968wn7rcs0hc0evrr1acvqpdb8f8yygu1n21p76lbau0ozavx71qotiqwlhrdtn67i7oanteg1otp0o1au6pf4qczyjgc067bglcrbzbyxuays1v03gkcpp5dpugxk63yohciewehct7pwkknr7cl3xwbbpq9bj7n07fwcr4cnd6nv7e6couybxawh5tntdblso6vus286g2bodwa06dvuk50dv0pxzc0doq2lu27qhk6khnjvgix2ufbjytob8b4yotcjus53b747pbo2razqntcvkmgpnxmz4r7homkrdzkqthqy2oiih29xcyk6nn38wsdeqi1ymy1mzdd740yhr9foyqsd4joizeji9vrq8wxtcdnwqpp6lwrbpykas48znwwc6154f628uuj1nk2vqfaqd2ug8rdlf9oy2khc8oaxrt7b42lotbv1lmtn6joj0m9jnd4v1ym1v24w84e616snu1otjidcqvyn61owxuzfobjn5rfnvh6rbpc5ouzud1xc8bi7n2ptmdmiu799p9c4grnbr0wf2w89wsdrfaf2wfjgxor1r1lpfocwt4oh722mtbnc2j0hejiwy8a8s6pojcjvbqgyz576jp2et2mnly9l0h7vgmzw7dfc8ykhlxm505c08tbao5zywpt68uz45ueafqqutfje6xophby3ak652b9i81xglcn4twac6jbtnkzfdv4yrlr7kontqrjxs9fxpqacrxok88yo1gow1advy0pfcy32t1y4zwbdnrm7zshun3hhghar85w4q3pxjetvo3g3rymyncmw9ahft50wxsx2mv4c3k3x4gb7hxytw8pujd67ghi',
                filename: 'vpcuqg0pptp8nblqlq7i2ewypxser90qje00x2xkruqdh62uvb4jznqosl2tp8y45izk2149f5uk68xpclz7xrdcy7p1nhj5583tfur0vjju3fc1o0gqlvm6qnkns0e5odq8onq2j00hcgoxe8crgbcop8x6hkxshwj6c3bvhimc4dci6q0decn0cbfglcveohnga2cx6zce5xguu7n61p7ck3bmyg582jusd2kum8kkvsw3wbal50ylxc1r1pj',
                url: 'k3n8yc32f78j3sv4rjs2jtt6atdblgmypd8on5vrgisvh8l1vul7bp0co174c1mdmnb7adrmachzoh38n20i4vz9c49saz03957twmm6z72ox3uzpapz4r84nyvmcaacj6zxemrr8w9tx1l75d3krjle6tj26gszu5ylzxrwxkg1xt1ky8bkatvm8n0px0s7s79cfm1l9ikzsjg1r9anzelhw6xn3dptdrawdj2lb61d1wgktcrqtklr45w7l2pplpe062q55e35v2alqwyfihytpywynm9zd2ehgocjjzx012ev89qmtxhyb5mtielny9mav1bxf40gmx3w9dsn3fihwqidq3vq1vq37vhr29tvds66bch74n62xe1mgtdmjjvg0rrt37bdnd2j0hamdvdheqlfv44cot0v8jrroicme8e1atwqqa5dszknxyonxwqrrok54b17ylwfs9y8d1for898go5m4cu0nerppopoz0dbaefhs0olo5cjdb8gk5r32mj9sss1ankxwhl6bdni4b55rj0a050v481sip435arx7yhqr6vl9jleap11zhyt0fkmphuaypmze9garlwrehs6jqtsg9345dxigvn8zhtu8vhilhxadgkccv0nrdjcxleemilj1kth7233h05s9q84ihn0tycbyj04vutx2adx9ugl10beijssima4wo5wx8orr20ymmxw364m2minrjsy0sk15i0ancyhjwn3jj9abesqwzvmhru5g2pbmo6npjvr77bsasipot218u0d5hf6fz239lh81a0lwi1sojj4rz1g18humpdjtxflik595mpyozfny1acwbg0m3sn3giu7o2hx76dyqgc6dnapu6ol0nf1ocgjrku82szo0ii1ejvhn98gy3qy6jdwm5gx2f2ak0fiwzu5ojrx5pyki0zv550l0nt7bhuneyxr3v2ztiv5bxfmfl9nj8gfkzhem8x6vmpztbaj5p6e3d1ctk6b1kktfsupl4kk4yl',
                mime: 'wxuku7d7ky0q5mop4clx2zvyeolb4aodlbiopti4akofptng13',
                extension: 'egfokvwspycnsq1nk9b0x1u6iqzp15ixeh1nluuj96e1clyin4',
                size: -9,
                width: 222757,
                height: 458741,
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
                id: '3e5359e7-4005-4055-ac57-2d195056dc15',
                name: 'usvue96u8g8fv4te2z1tww7nvcwdhgygb0h2m3gsl40esvb1nwjymqfvc8gwxd44ff80bydufvob25qprg1c0xq5ckfxxjldqtfhp1puy51711afxjyo854z0srdxbiq3s0ewhahlhqvpmt4ctahre882lxprbe0aeam9nhe2p9u0c5ij1rpoi00v9945ah1c180l5jyhuvg3fdle7k906mc9hpeih1ox381uj7wge0e6wnzf6loh0eta1z6lmv',
                pathname: 'nb6cdrst7clxfz15tqqc84adca6kelcab7ga3i60iy6wqgdvfwhx91bjzkouxg38e8416ytjn5ckypmbh3ilsdijwbw5i88yautp72sradbx6oih6vete2f6dhvjji0b09z905yabf4akoh7sxl5nzh40r7ycnjdntzdf7sgpp3r4kgc7ko59wfj3itxqovdre56tqr8m171igbnz5zrqfi0usc08ehyrul8akfr3dsfdgt74zpuzrb7q4j633a0i8b8ua1hwmlbievsu0i73i8clwoeh3ht3zhtglvm9htbd3dnumrew6st8dpu9v9mtn56dvh2drodwqoa3tr40c79u2agw1huhtbthrx76inqfmp2gl55l7db55iz62deyu6nsarcwfko12yzg9kc2vrvl197id7lu0mzd6qwexxb3amnxm8c72rwyzvfct9u8iyxqbnnw7tdonxq9nlc9pppyx9egbj7ngln4bhdfpxa7vas4lpm62yrxrp0m7dx7rlw55tlujk8uunz8vqcppd904yrjn3epo5u78of06yjxqwgvfbdf9n8h6uxa9h2bxqesj7qbh2k9etfjbzz4fycbctou1yecornop0d03dzcxm9tzs3m5pv2cjswhaqe2v975ewrkjp06z2asiypgrtx92h07ti46qipbk3o5r6y2qxrr0pael33t9pawvizdthgalc7qhvlw4t8h8rhvz4sk8xzwi57tfsga2pe3zexeqp964lpeephd6vgx4r309871qdnws5arndratgros2ir17eb8varoy2g5lr3tmai512wfj19djjhm6ymkaadm2ys6j56yhocbh4wqr4qkx9vuozge6j97m4rqa3v7t31nv5jw1ojvzs4mleqqb8ahhwhte52tf1q8td9a6rdqjsn12bnqboaz1d04mikvqcf0nm62mvu4vkezftc5k0lgb85nis7p5m3i5c2lc5prlo9nyjgqjadsbvp2s6gxosy9doeuhh6dmfqgvt2w1',
                filename: 'hmdijk89ugxzrio5dg3tmu358xwfcm7p12j4gghnmy3hajwwx2f9b1zx2rx8cvcy3o4xk3ocojdjz6ofa3bj485inx05szlgktlaa22v7ylwi32jad8z2ftnzicw53xj9e44zk1kw66rhojn3ueazlghq7h9yue2tr0mj717baz9oac1ry0o39i7kyrutep0omnvd5ul757gpm9j8ksfmzft6dmscd64bmh1u1wusgpibvspqjhepg6xtzgxufc',
                url: 'nhsc3nj8e322mllbxhru3eq70fzu2pfmu4f8zwjwwwlmayck2l8m4whfm54d0tan4azu6s51szuh82bnpkcvchaonwzqvbbfbmvxb661phr6jcvx1g1l9qobosjgbw1382bn5ivcj1w8m3nvs4hjbqbnr3upjjkni5rei9c4j6428894a4igcjhctb837y83u2v1cnhj775kwceq3bt6yl9j58ryjeqflgwsxhyxbtknufbkjtc2a5kamb2ikz03zuqk6xrv369cubkeqax0kehzqcvb6syxs48uktrj6i9i1e22msh0a0b6kbk6vb9b8apdfgx02dr7bq7aljxkcsjk98u0yxvazg1054wnvd4q33roh1qkk4k34a5x8du8swf1tdio6az5vvxizf7gdmnylcqzz8gjtyc9pts109a11f211bhvmsgl2znd9zsn9nlmrstjb9c1gg3u6zrbsul6aegqza0tcf37ic5yyd0m2mlpy7diu4790vzp0tg7pxiy7q9rozyuf43valp1iwdx2wokaiei3rk94wgsrdg13tgq713a0i0g0bzxuvwv5f9kmtu6jdeqnrnm1djlvvtd6bjdxc4ks5od6z0asqx7ml39zxi8vyvm3iued3xuhi4p23p1pzxa4z96wjnxsgc8x22ufmtu8l17srw0trsl31zulx021kq0yryvgv411eqmsaw5i7pze6e3wuzvou1eal5x24io0j027ydhzmq21twoxwf613v5pmmg4xlmv1kz9u4ew162wlyt27omv1v3jq9m6varkvusucw64se2m0kxcunl0e3u2rtqfxj2nsvogzvye9e5vlz3qejy1dfqef0cmhu64t1jr5ze1uf76r6if65vth0g3okb3r5ag746lm9x2le5jxa351qo5fe71kw222euaa0cyol0va0j2j115jhc93munrvryv55jp73voxg2x9somrbl111le66nff391tjg6glcm6kmre8c9ymuflkg8f3sb02dypd',
                mime: 'gqfc6ymf2jtzc3v76vtrj8tok3xyyw44n3ogf25pxr9w2c6cqh',
                extension: 'qch3klcdj1mxyf2ch7dywpahk99c5zpryostjsfor4arusfue7',
                size: 2442320807,
                width: 569832,
                height: 239661,
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachment-library/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library/paginate')
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
                        id: 'aa73038f-7442-4dbd-aee2-d8a0067727a7'
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
                        id: '3e5359e7-4005-4055-ac57-2d195056dc15'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '3e5359e7-4005-4055-ac57-2d195056dc15'));
    });

    test(`/REST:GET admin/attachment-library/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library/4a5936e2-f38c-45d6-ab7e-c1cdd770241f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/attachment-library/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library/3e5359e7-4005-4055-ac57-2d195056dc15')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3e5359e7-4005-4055-ac57-2d195056dc15'));
    });

    test(`/REST:GET admin/attachment-library`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library')
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
                
                id: '69a43c77-a56f-4cbd-9a9c-2ab09de03b4c',
                name: '8gwgawi1tk27afs6hie79pvbqgqv9jekttqg99ovrnwflblpfas5gq2voff5ai0pozw6kt7tv5idol1wm2byruf5h90m52clfr68xji4bcw76ejkfrrdig4zwwmxmehpxktqthol450pggkajytqfw66r962zgt3kjoju5hjksc5k6e3vj54ruw4sskg60xlx6s0s05yhuln09gosj4vcy4jdiljelu1rjkg2hpv91y5w9jyqu186oewtmycpse',
                pathname: 'b4fnii6llkagyzmwxrblpbg3lvie50ljajemc3snktjxxb82dtw30adifbwnbt7677y8acqx03375l0hpq9m16c7ha13pg4qrlc0h77qgw9gk9oyb51ec3gkdgstroh5m5t3mwu722ih1kqxz46sfq044rhhwko5w2lvkpimjmuc5vlwome7qav6k5meezg4huz8nerrml4d4vuxuklf8o4q7gf45zq4jqw34kqqt2uvrd8m3cfs4ec71i3ald6eo3hsi8qy9i6y0rf9i2mx9d8ht8mk90x69042qjuc0yw7reskqbt7z8dbh8ypf8ujxp1qppj6cmx7g8xksh6h4gwqyr31l0y5nl599byrj9bl6ucpnviwcdcbc9a6dn922jswvn5zvhhxpmuunecbpq7irxcmj3zarhytmfirs89q0a1382utsvle7nuloq35e34lci44s4amun4878n1fgcl7o9miknqad836r3fenr4bircyuualzmrdaiiqu7p972uav0urcwqw7sl4vvziyna2xlz4wlxx40dasq5whaklvg4ewql3pzq65shfoebcl9apg1gxocwsjdd6n03hp4w9rllmy92mjcz91kge0bhulolu60sfmhctj4vn5p1fj5irqmots2gwiygtdx8wwldcslqtztrpxvdhte2tagv5gh4641lc2iuyn7iewnixaey7hlrefzoa8xjjdwd8skmkcf6fb71ib7kvnrehdeom2pz31mapdud88vm62x45mv7ah0m4vdaybsw45hz71q0olg6fneexvegsw8j5v6ruonyudliguliaz2mqx2b7r8g2yo2i2jsy2ll79w7h1lidz6wi6v4w0m2ssz5qb9mqdy72ccn9m5xw2mc6kt6w5ppi17k0n7hdvb8xsrf36fccfm6k6v5r5nnenuj8rfdbejdtnk9ftsqmj77oqtater0ndx0hadymk2ziyvbcl45se18xn7zxne3m1afpszu14xt4snh6pzjgjzx7n2x',
                filename: '7mp6q7ty7gduyphuskdm3363fnrs0o7vgskeykx6glbeyw7nigtt09wn0t330dq3sst3o9bos78szf0wlfkqpw2klsei9u6gumdy9kwcn68lm24evr8u5xihw01tetcmxyes5v7020j85v95efgzz4clwy5bsi9djxfufsp7h6nrz9q3rkn77h1bhgp3taba5jfu4dcoyfmg1hkeshet2i8vj154mfqitt60hglth6cpwp97eezpt4esfxgg30k',
                url: 'wa2kptrjosmqzahh7azz5snm174uc3g1fuo09wn7lrndik8yjbuvljsws6jx0jhj8l8dtjh3b5f5ons0ykmhtsvkjofnu6apnbp2g8ryfo1dagoqvwd5gs8berpbvm8xd0pmhu83anvcf2wy3c3djjyxlv55fmxf3qyve2nj9yek4wcm3wxwyzn72z6u1jf6bn11yrpqro2jbe3dku56c7qo2y4jjvke5yecw7v7t1w5tbn8bc9pr3zbtjudqm0ruxx1teymk15nxo7oyahz7d3afv5lx5fb174afcxzhvomg5k340s3z09rhywtga2tcchzt4wxn76gwy6bzso9ntgsy8a2qcdhgyepqmc2a6yy7lk91xe3go6xtumno655hat6j8uh1919m9fa4lzzi6yveg08q54bayu1q3o78k5j96o19xzk876o0o43ht3z85heclu99n3hxa79l2i9doh9mg1i35z1hp6wbczinepgky76t904n6903qxx79ms2ki8noh5xhnxau85ale7wlrjiooadmxvf07dt83gln2j1379ew038ejr6ayzggx1o6zaccd7x3tj8x9uxp7vda4vsoe4vymhlz38wrkj3o72jvkeyrk8e9n166vam9pcwxy3xzs6hclyzxvtl9tniq0emnrfx9uj1vxg8egpwxuq31tl8wl8rzsfk5pk35e79oepasv9zs9b6quex2fuix0wb3vz1avslpsfeco186qdhu4f09oospy8nbawyn5cu24oiqe7vi59hw7omrriiopk8046logp7hu7amzv7p9uc7uwn12h7iy4x9avz2ij62monys1o0c85z7shco4d6jptzy7x33aabdbvq9s8s6wya5keuxb6jhurit7485446b41ud46qw4k05d0xjchd9ws6pzr3jbuzden6qw84ya1zi7xeyvl2tro5flb3pyticdi2or60fash1jbyxnaww6eoo6niq3c7me3vtj7fp3fqxt7ic36d1htmglwlwc',
                mime: 'y9jacufcok8l911ip5mxyp05kl4099a67rzej82ghoahhhpw7r',
                extension: 'a2jpato2660brx1ecri03s9h1ck4b7dkkj9o5gnq6l60e6c6sj',
                size: 1549860013,
                width: 382915,
                height: 839713,
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
                
                id: '3e5359e7-4005-4055-ac57-2d195056dc15',
                name: 'y0xnazqi437h73ypzny1sqsl7tp7x1l0fwoio09nyaem52mzo7iry3h1wnspom71fqzcq8cy3bd5z78atu1pg4k20d0l6lvsk1xgrz0spzt2r52je71gzemf6kfzd2793u6qf6q6r7r3yf0hiayxec7x5cg0ry91svtaaxat3g5o9u5o4ulrbcuesda460dtlx1snzul97eqzowmk5uvv9m61nukm2xu30oxe4g8enhv7disiekhpgfqksdfxo1',
                pathname: 'muaq6197nscfkj574s2uht1j61ifmoaxut2egdevcq2hktqa58wqmu86m9os75knlryxqr0woycnzw8uwn0aya8hexse0pibo56ln0vr0w1bq7ssfajo859ts23r3e78jq2s9vlir3mvmjc9ziaa4de99ufwn9yg6axzz3bb436bbtp4fg02v2i4nr8r8pag5gbc36odhdo0bmldstcrn2ya8scn986273tezb7u8788c650tpbiy01kpz3u67gkpzh1zhqjq2l0zuvhlecy0s7i90uz5ll6dauj3akj5b2mb6ec8adh4cvaclljenxg2pucbscmzjkmkijlssbw1exso8b1j10lmr4ga2pe6c1zjbnaonp4j0q3n0q41wknhr09i6baofxjbk96azy79rajoohezesxp3z6natdc9sp6ahxhpzvh9p3hev1o8lp36rykhhp45t5nb5zwum03t91d5idcinad4smtw0tu87loom1hrig4i87o1sh07vw3u6bw93i9fujrusqjh3e3c7fe0gugytaqq8clua0gf8wvjx6fumcvj8sdgshucr015otbqqdknlsthtfsye8he85o8boa8h2sl3jl2s29707qb5hvrapnd3c8p4dk6xobde99gpqp7f56td109wz22o1zwtw7jq8ajwv8rshds5gh912pb0yqinc91yspvs64wchlvfyalqzlim7ma2u099vjlrbesq32l4pxeoxln8en30gmqeo88hfi44yv744y1rdwqm0ekmgp3cu1cc91g7ujkn6mvfkhzz11nlofd2j0eyle24o01nws2pl092cnb3110g105hgihjievczwlieoh12pncawagt14favrb40xbyi70wb8f1jjeben4o7urwrnh0gswnxpr6b306u6nm2f78hht2ykf944ou43hi1wihs4w2z7agq7e0i1yvkk9tz51pk7vlwe5hgijco2kp8tkbjifmd66cfszw159zrf2q6pm903r21owapbb3',
                filename: '7luw5gkqop3smvd6k05vtb7a63kzw03ezyz3krd98afah2ye8un46clh6rdqylduatddxim2uc14dj9enqi8zdf8rl6she0b9qmo0scwg1wbx68zjqe3jv908sp3f8iib8wozcwryh64rxdf1bwneyodf3bhev55bh69z7t1cag35879nxqlmmfyu6kdb8hjr8c61yp7lmpptobttjuqc3lx4bgue56z8xesuragkazh5tfbnaq8d0qr0wvahp5',
                url: '2c4bn2ow6ffw2uax34t89mxxbt6ccit6wzzs0wl6n7spkptulr3s560wn2w9u8fod9ii8572ybgbtt3rgmr8lxuwt7wkv9etopbibxcoy15ut4bgzgt3045ijg7vl8alfhzvc8ir8w1pnesdv176jw6z7gklpbmzcyta9c3ps8o82t5bxloq2w6izkifm15vtystha3oq5egwf11v00vx59tiv0t8ja7c4pywq69r198bzv9kze3nbneofchhgc72aax060vnvletyar86hbtdmd1ozxhwa8xhfnfhe8l9qswkq4jz2dzsss2cc8kridetrnvqbe5mqv871aqlbhurc6hus9ypymiqmy4mrruqt9k3zi96ssm5d2m0crk6qe3yqy4cz2n8k4dyih5d7jy6u4ej1dz76k2ajc3r0dqbp7i8p2coadi45c09sayxc54r0ujchx2t7maz11x5h92e43x7ae8589j9cs6r36p39ppogmopq19m9v5o36ayth7xnp88bibr6y9kd51j9huemsiqxl26qkj0q3i0mt5vcib35f5o8xuao1caq5m3f5besbihrtmg2we5jac5x9m1fqlae3tk9ous455i4ws35omft0mxbi5x5kauno1ujwukvcw5y5vdzmbapwzibz6yxfkfbwl1tcnpbbcuhb0z8uaf8hlo95gfxyhvc71u478ytwos85rckufmy5pmg1g6fzpe8jrw1t9i1ki9fawhsnuikrgrgsjtzcynfq44acqctx8hlzq8fx7wz63je8pf3dugggdn1owsjtn1dr6750strn15msr3rk9wv3lpc9vgw38y96gs8vaptfg505thhawcuvbob22o35u0upp688c4ls614knc1dq2wd2nd5ht03fia10ehgln2qhxjwmvoqe1kgtk3o91zblhro9zidgsk1fecaa2utrvd08esi8ttgw39e3tgjvaghhsngmimgjshnd37cger8nx9prami9uqy8h3ct2jyzzykrc62',
                mime: 'cyr9kfddjdftngmw3ztnczo4kyy5vq446dm9b6bl820ooasdl6',
                extension: '7z7arq6j90wha9b2w4twdw8409dv2jxtkwmq4u89wr09woby8z',
                size: 8588059784,
                width: 518631,
                height: 567701,
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3e5359e7-4005-4055-ac57-2d195056dc15'));
    });

    test(`/REST:DELETE admin/attachment-library/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-library/4001db75-7138-4d3f-bffb-1c372730b00d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment-library/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-library/3e5359e7-4005-4055-ac57-2d195056dc15')
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
                        id: '472c2c70-ff22-45e6-918c-e6f0a0c0a754',
                        name: 'x8c3nj7y4mngjncf8wxw5tnyn54ytv8xfs4chaytd7pprpi7f4hqotfot4y01ypxqguki5cm8lf5hskqtl15c7r3eak35fg8txf89xnvnclnfi635q03tlj82g4jyn85pdqm8w322chm73th2phng4t572dpk1ya4gg5p5kneo0rws0np2iud6lc1z4dhzjsgbxdyr43w93atzol0udll07xq3g9u1ylk4tunek77is3zuhx5ufbbbdgvg0us6p',
                        pathname: 'uc5agrlloxc956y49tjladzkiy03aoxny9hdx0btaxj6o94euxwmdy2rcq876yr6yn89g34bg5wx4cijud029mqaz6ffijr5327mpce7byl9mew0cmtsfzgbixhepuhy1b1gqfx9rbk2ys1616s1g2c6d0gg3p4u8n4fjwghm1qmrosaisbtvbkcbfufucx6tw7blgvovdt3h5ks7o6kav8hw788fao0vhyf0xc97jrhd7mpvatpoq0l24xwi602w5fllbaib9mm3iksacuybpmg0ea527572440d3aafn4hj904sf3swlhvtr388606n4nb8yidhnp31cox1yqgoeuf5db8izans402h43g9zfouhjfi6ybrs0w6mrl8mxhe0dfhi6nbe3xm9u4rau6jgt9naszoq994elkz6nlrhcbp363myc1f1y2ugt1u7it9qq6taavdggmbahagf5hf3nq20coj6rqe7vdhgb9gq0y1s7jprjufvvtx1sig3r8acuu9slg53j5lfzyfkiityf84et6sfltkqgtg88wlihcwu9mxjh2eh5m6q8g2unv0yt2ysnmvq2o9avpdjog0m6lrf2tthc5q9xw46t2x9w1faezfbzt4vktkij6k60vqghrhvmvwxr73xp39f5m57mkkb3v4m6eogjnvrlszjlorac8h3gcvp02wmvzhv6b68l4ivqgc948orbletfkvs7h5icqd8rnn9crb0aelndr936h0pbv1iv2152ur0tb5t1tc99fqxlhff2gdwx8nfsohhbvvxwg528iyraoo2xsss3hejnlsc6p2lw4o91iq2th4vi97ff8es6263rs0dj6dbix9q59vu4kkecmor4dk2ud3tbid728rg1iwt3c7kqu3okzvzuqeiqrzokn27nejnnzndh2mxicnblkj8hc5xs62fzuonntgt43604n14187sb4kksbe6uqi73gnglvpqq132vfc4pa9w407ioowi5n37bl6zzrl1fhpreo',
                        filename: '9wr2pf2mkyannjq4umb2lawju72dg9a9cwwrc97crzpm2j8408eibsyx3uuklr3cmesljl7fy2n3xl1beg5ep88n2fd1ldzlwydmhhcg3zp4i160hmsfcmlnc2wug3sjtir2r7djvslzrr3dkjwn5dkzbucx2uyd48gs7ik6u2tsuit5gqn4joxk6yuidoz33jhhpk8d4bhj5xsckoxpxoeod8cvwl2e5xs2sk4d577e76425w8y62yefk1h2jc',
                        url: 'be6penq4fyfqit5dpt449q9cvyvnr8qr7ycpphtqc07z40rf0fecprfs5wa1axqs4cqki9ocejzanqp7qci5x74jzws1dxa5ly3opzwgxl3wo1c6xd0bvbbsuimpa076kbpv48350jkqckayk58odfccekm3cqci5d2pjwidq64gyhzwbz3acbo5b9622qn5mm7rfbqom2d4j8r5vroeue3xxa7cfru6bulqa696ne2isa3hn5xdhysd5yhd5i1f429e0gwtjbna36pezmnqxus11a1q15f6xy9su9yo8xxpfun0tfg2h5bz9jg23ylcbcve7rw0g6k13al78kiccldxt7kfvw0pdw6rtdag4dv5htqztbav6cq00mbqqom89jto03fxd2cptdh5s6l41kl4qpsjfxhpe5pxrykz8fuy3pcrm30r64fttrkugsjt5j50lauj3iqy2r5y3h7z7rd6big6me0d33xqfrzy1n4a9am2yebr5csugr0osb05rxxzf26kwhnbj4rma3rsluga071yzc7k9f3uvn6fglfs3iogdnumgi4vbufdgyefd36k3duf8s3qb06k3vydf0ummexv6g2ovemiu1xj8hv31xothpougxvtf1x96qy330ypfxtc4e1u4oyd3bpx0mblyww2nz89ew7h5bakh9il1r5kxq82iu9foukudl6zluzz4krn8edicotsv3gnsoreok5p0q0k9fhh5zfrnlwy5hlesslwbagsmb63mt9hualecp7sqiv4wkknolzrc9scpb9jgzvds06lxyq2h52p65bm5y1llll9nobkdkdciq8qbeyew34y8re1km7zseaal93qqhowo3ciqfask2j0c4p6etuwbff0k73wgtpi8mw20hcovqe3x3p54vddbg59lsh9f9xa54cs9zkm2nmklhqn9zvdoeypd7we2ucxh25ozjdcbyolz6qgjg7bjswos5yj6w7f2cn20t4jkcybg3r2tc0bzpab7kfy5wuz',
                        mime: 'gg9jhutkhyjsc99k77wj81p9vov7us9dwkw6zg773vvz1f927i',
                        extension: 'pcbe29b5yz5pp22qyc7dxy0i4qq1jfd9b698c5s6mo7c321n42',
                        size: 2740926131,
                        width: 163735,
                        height: 787442,
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachmentLibrary).toHaveProperty('id', '472c2c70-ff22-45e6-918c-e6f0a0c0a754');
            });
    });

    test(`/GraphQL adminPaginateAttachmentLibrary`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAttachmentLibrary (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAttachmentLibrary.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentLibrary.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentLibrary.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
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
                            id: '53100baa-670f-4fbd-b48f-e7032caf31d0'
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
                            id: '3e5359e7-4005-4055-ac57-2d195056dc15'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentLibrary.id).toStrictEqual('3e5359e7-4005-4055-ac57-2d195056dc15');
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
                    id: 'eb7b68d2-84c5-4c43-b850-7327b8401eb9'
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
                    id: '3e5359e7-4005-4055-ac57-2d195056dc15'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentLibraryById.id).toStrictEqual('3e5359e7-4005-4055-ac57-2d195056dc15');
            });
    });

    test(`/GraphQL adminGetAttachmentLibrary`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAttachmentLibrary (query:$query)
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
                for (const [index, value] of res.body.data.adminGetAttachmentLibrary.entries())
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
                        
                        id: '1a366b7d-c381-4c1e-b252-50b844e1ed88',
                        name: 'buabohczcasutjrtik4vtaud3asu4jqs3l4ls8fp2irqun60wiyty4efyndzxf2kb0zr4zjutplmpr3spli18i5gqltbsuvozb0szolylh0kzgv2uhpctnkrq2833mc2tens2ui33tx2q7696m27lab45ga1nhe3sa2xv3kzv1uxhe09l47yk2o1jv10iyugqv55kyezmjpgwku4jsapuquu08yvk03hepli7xzqb7kt2fy0g8ofaydnepausqx',
                        pathname: 'yke7iqk0ea9banc0m78ef5orvrl8vm437ltjx9qpy188f2ytolw1boqwsucws53ngxdsu0w6ps71ycgu9hw4sa38kz9ijjogkqqv4c70io6zjl9dfvqc3ta27s9pvkb5rk3qmedc1zjbf45l0rh29xgdpxktblupw3ba7ziek3hhh8bs78guzl9lh66p1fiwn8qahbhmsbyidyhy25bbbj2brqvp1ihv7xceguwz0d1o4rwodgzf3q76ntdhpd08byho7dbrifaiyelf7h3upwmce12oxowphhs99ingihba4y8kcqngb1h4vsynxelkhzrh8qfzacqlippnf77ahk1dspdrc9lr0tvzfn50hredoorbnff25dwwxsd7cn247j31gm7kxqw1zr0zhpmilmyhew6jdwgo0vf46q86bi27hx7kz6c9eh3dvbt2xmfz0dq7b2ngyz8rlvucpku6ckftsc5t14qhuhn98dwiwb5iivfjppyiolaqrkek7b726rtebdzo2fllshz9tla5ulmj8altknf7pljgu35ych4lndajfbnonhten98or9jzk3zcohjlzpr4vradidtby8xjk5qoeehlutzdcoh1roy71qlmacs76lri78z6dpnzwp2aobs6zfetymhwmpx28ozpd7i5inw8akrn92jky75382wb92nknp8xm777y5uwqun3veg1okqb7jftnmx8gjpgo473s89hc4ra674jhyds2l4wvi2yj4nj8c5wfra7ev8uwutvphooc6xorpgp3fg3k8xlw5qfhomr6otq3l73gpgxc78w0qfo4uzwav662k9k0blu0skbdh9ktpkukua0dj5jv6ffhqm3eqbv3qxdo1k08oelwukroh5mn3bz7s5d891qv52f9cabq5qlvcjz2xsvsa9ryft021jacyjbszz2erwi7279kikvmjl814c9dm2o23guvvkv4odkd0xxd0it15md5pklrhf69uxsdxb0xme0uup0x4mr5l7r',
                        filename: '1q6wpimv1v7414tms570vgptakzca8232nqwvv9sl5y61cb2hlrpj6qu1pj0f2l70jbeoisbqp5dyo3hj3rmp9c7r5t7541rcc6wtf5uz5dc1sfa9lyqojhdal1ki1a1szgzh5y81ve2i1lrnvfs61kn529un998j5djp6zegxrd6cze83xtmq20gthstmcm5ndmztfpjhvskar17r7vfw0dqhrti0ppsrodqjsr9xy2gkwhl6axgb2o4z1pd2m',
                        url: '72ypxbfdcmxe8n3vv195f5wmjn2h4lezqa8ahyhdt96blpvmo35lc8hzkg4hg97i1a83v7tbs6zqrw22m7v5xwxrjcrrrc56oan9k4hwc9565tns2gorfj174zngf484v86zmazs3xzvcn1ouaqik6rq65uhby96bubwl428uppdmfp5qchjt8png8ankafzro1jielhdun07bdxil0gze6arr9zhgkpzal7uz6byqjwnevmh3rjhppuocrmjrg0lijuuig6nh6efsgu5r43qgz9s4wvpfp6frzewb2wvumbm4tiagf1rrejtup0dij5disdhancw7e7w99g0xf54b4oms5i1m64y63zy2786n6pov9dtlaegyacfg7rvj5mic2lmtcg96jxn9nkdsne29kp06phe8g4n9ze0ytzpesj1a37auy933n4jo9t6s57jetekjbhpa0lpnjh0evg1m90wqq0jcjkkz2nv8nc0d9xngmskb7opbx7b0tf3aa75nekpfejx5p92zz8lt2o69d6irux7llmuevdgteno92ma8hycybwbbryexmnr9l8lht8fj5tpe4svn2zwmsoeaxeylf75kec5z31xh1fsilim7at5n6bkaoqltd24f5i8r66vd6a8jutfbj0ggxtdrl7m1phn6mgajsebchjdxj73uj8gonnpmrp65ha830lxt1hx9p6op16m27v10rw7t94zfnxtl5xiaqv1vhrnydsrfumj1njj0xkwkz4r4ekbfyind44qtmztplseddh69qymfwx2xflm5bdxocmfd7u7ux3xw21all67ecpqmzcgw4ln9kvg1mtub6dqz3m4nffs5nfoaw23zfx1eg2hmhx0q0sfp3z08sixj3ve1yk0dcgfjzhrz9bflqospjsg78873pc2xyn2c0x9kyga7k3fg87y8jhiq5vixea7vvlq1pa7aiyth3b5b2kymjbtqmjpe9pe9m5ji5lehropmt63odld88t2k82ouj96zno',
                        mime: 'czqh73smxqmn8txpallhi0nkpmd29mxyjmn4d36qaudvwclsnw',
                        extension: 'yin05bu89gif7xk4tpp0q4d6ug39m8ji7jyuh84wsle3015mcl',
                        size: 9737165146,
                        width: 654719,
                        height: 723807,
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
                        
                        id: '3e5359e7-4005-4055-ac57-2d195056dc15',
                        name: 'cc3ak1ps3svhr6qnsol97v4b2wp5urkphhncfzm4hxim5rxlbogzbfq64lvkxyt85mqc8x26w7el5b9o9jdnbx93r4w6pngtkk9rwpzn2fihb7kk2ix7gn7iint90xi9iaxyiwabtj9li6xfbdkt8fyy2v1w8blz93lkitpvlno6d6m7bh9v75yx5vckpb6fst9cko6px9krm7j1or6cqnbmmzmae9s0ywujau2lbxh0urap5pz72ezo7r55xx2',
                        pathname: 'adbcxmjbzr7ch32apzj72l3hn6418ngo9o7codxgi2uz57t9qk6c2so8y6v0wiyuh0jzzv8hbs80x48dcf8e51hyyk0h4k8tsrg3c728im6ra9jwqx83om4dvutr1rsa21seh7o2ihmskmj2nqugrfqilepe1q0g0qemr2efcpq96jqzsmb47wqw87hs255ffuxhekh1n4fpymokaff1fl84wfz44lzgxfmnopcd2kzgavr4lth0nl5v68hrym3wdq64ai2x4noiaxn6ulb4n5qha20jwybjte7xcqw1en2gbgecn369nzee195syadmhw2ocmc7zffka9rqkvas7dr2hon1b8azo06l3wpmpqcyjboleas4y9fpjlcablwq28wj8kyksf8isslmq7zuwmftqqodx66wn6epwy1g4lwvmvzk13yqmcqfp8thzx2ae3e2ooozl2ozgkl5i11l35x715hcor08xxu3myxenl074gnh1wnfp3x9pmmpfk9rballtgidx4bcgr5k3gv5mlln248547s7v2abpyy6u4o6kmmkdrspgke99ly43sr6zze2lbika5vbcxgkou6992l8zrxg9pu3b1svu098ljanyqh41jp64rb1y5602tf9j9dr6outjzeyzju7h3fjzbs0g8evrdtfm817m4ulmh3hqptt0sr9kqytd0ew5v3zrxx09wahspp2m4ixlaz88cp1vxthcce6b6pey797mc2ftmarj98133jki3c2nylosvr3sxwb0xeg7mdzbqx3zms9jkr23bx8uus97ph6jyxe6to2w3j5zc0ems6ax52td12cg9f8no7es1h16itbycockx1ewzo363patk4sy3f5ebucjt0p45j73htseosmm1c507um0piamc5m3xmmfznr13ayil7ia138o5whpjp5yogx2ziwvghthhe5v5brg4kcnrys3k0zv8isefx7pd7ehi4z78wxcrregexvjx3enr5v94lm0zvl8nx4qwx0',
                        filename: '6oh17ymzrqj2cthuxdmav8mua5py1i2eren5ypacn0427t37ff6t84qyoivglmtl29vnsyswdu3ntcmqyrohyj6cfria72tkupstnk8g3wjipvsskh7nx7r3q355esvgft6qefpzmuag50u89kgz4lt348geuefkzfpj1w1ce2vjaxuw7dlu5qnckpwa7565ixivm4clb4nzx7ulct4q418s9h076t2xt4w3a4mrdqioiksji1w7xussdvq9lo5',
                        url: 'dnl520zzy9dmd8a66qil3outwqk9ky7yzf3vr5v7w9cgyz4eiqikktdqbj9z9pjlpy8ucp58qmigh71jeg1h6cm5mltlyz9fk9vz2c2o4rx5c8tb1h7chiva7j3ay6p5ne5r8gu2n6v6mbxhxq0zbgw86o59amze2459vipaeix74cnojfvx2y94ot8ep15ad6nkkwp2adz633f9hngf2hybbonle6altr1im9eol6amj1mlk6hxo31n0ikj4oiel72a1lh3d4qbvc7wknwaijwfsn8p5pcj7w00zczcnk6dznyi20k0b32nuuv9z787zz1ndw0bkrx4pn6xvrntcgjlpo9gyrzhohx3m47py6ia4kjll0f1fghu48gkkbrhgj0ws1vgebr0jxs4v1su380pj330a2iwobh5hz8haav4zl5hjzffa6pqanv52zh8pf4s0uwcyvh7phon3cnp6dl78tjpdkatrk72nofr89w5f24wbxnzutnzh1bdt6q7j36ktzlp75a8obc8xscwyvpa4k779q5ptrpejjp8fi416g5gt78bnvx16b3auuz1r99gb8cfhgw8j84a7z16kf69f8dl34e6hegtwlp7a0m4n7xqb3kncr6q8sa00esb34p2rjr8x795upexs3c9cl1ud0qjwj51lnsb6p2zfgr3g9owo2iqm15ooauupmrih1p9c9jee8dvlgli81ln1rw9gr9e3ecat6dh2r4poy1koxjoo8nydq3sc0v5qrggmfaroz10r3f8xfvl7if3uc5k7czln5eqjzt8xne0wvkjso1is012qcelu55dhxm9titpm68bz74vih7jkpgh7bi16jahpwcylrtxl2wgcypa2ewpqivl8zq6lnt4tvqkgtyq4076riv3n8kbl0gmao8ydz9tj96ueuq7e2b6583fyb3vw3fr51jsm0m2qzlwmfebidthalan7khc3ken6smgjizyq6rnp1hkwtsqo1dum65r37lpdzs1898xizqk',
                        mime: 'xzv4plxpkrak44ggixqmfgev04phgucwfn3euoh30r8rfjdk6v',
                        extension: 'd1v61hzitrefyu0vw6dhci03q0h4ontgcu0ykr5plxs8z3ttkf',
                        size: 6171943514,
                        width: 597039,
                        height: 518900,
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachmentLibrary.id).toStrictEqual('3e5359e7-4005-4055-ac57-2d195056dc15');
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
                    id: '443b84fa-1cdf-4f47-8390-8700a92ac0e5'
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
                    id: '3e5359e7-4005-4055-ac57-2d195056dc15'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentLibraryById.id).toStrictEqual('3e5359e7-4005-4055-ac57-2d195056dc15');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});