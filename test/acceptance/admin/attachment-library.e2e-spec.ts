import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentLibraryRepository } from '@hades/admin/attachment-library/domain/attachment-library.repository';
import { MockAttachmentLibraryRepository } from '@hades/admin/attachment-library/infrastructure/mock/mock-attachment-library.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

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
                name: 'b49nubv3b74mj0ot74f73o4fkqvhzzqknfcfgvbeaih9rl0o75mugyv9lbgo8ak3az0v42llik21jkbjttulb08vkm7x39eqkreywkhngbjytxdeahkm0bjrdzccp12y7wkrb8pin0w8naj8f8396ul4jh5gje8gtsf7lfx47j8eb7ss5s9rb0avbq5ka2752r60u7ebsvq6w61thbfx46tylx4vg0cgcmcdmmny3px13ynxtzjzkm7nu1f3nie',
                pathname: '0wgi0nqbpfubb3kopi2tn5wvh3pyh21sv6rhgsj4ejyebg5zlzu0ilf356pzr31zk3thet3qmai5nz2dzms2bfdepe93puzfyq25dr2bezl2cltctnm3p5dj38x4ytkv7kvuu7ghuske0n273p1oogxuqtl7l36g88lar1msxbtk80b6a2yxby9d4wmphojg31chtutfa69ms44o4u0ov6vw6u0g0spfwkm5z2s3282kau64je1yc8ufjeq9ucn4oqllveub6i8ne1zfja5nhuptr4j3f1zgxs1u9ka2yd4oxut56hyido9tfwctd25apxs33tzq86oz89dqb404kev1vo6moufk5lu8l4xxdgwjztckm0x7swaurbm85x5jvi537vbgidz6xdltw5wzcc6pbh3q7h1qhnwbzdaoh2nhunafe2vdnp8c2ungsvl2oklx2kl1x11x58g655zoapoox3v9nntupurjwo3tzyvyzwt1wms184y40ooq4gg1tolrspv9rnga2m2h5omhypvmt1t4t628vwzp043yiibvyj5s8t4p5oklyvgjwy6ajsrg1d2d80jd59mlccv14tpu9gqnosjlhsaj15wr0jb8lwm6gbmlnuqly5lm04os97m6kqms5dbygc1umab6h475c1xrzjf15pflucugx7n5x4ah660l3611sy8h0d0g3jttjb4docj8r0wqo9r568mmt762kawx39r0hzi7r03ybbxw35g4v85x41mo5bnb5xxi5bkjpdusk508dmza0x0j7t4sorr59z25np9m4gaphoskbh7q8txwt3ywqkspr7tdahnswnqxpe10fku7z8osdmla9w6r24eewjvsteyj0nsoroaxmzw6n4dtkgvfzjezrjnlg98weebxieyh7rk76ra6aufalwwsqu3gf37561aqzbuquu2rdghngv71x1rt3c1sxi6qdev3kvv98obml125a8nobij6wk85e9owiq205mdjkmotswz60bi5',
                filename: 'ac4wdnarcq23ymxunxljcdgcsiykzoc0yra43synv6g5sfi1ntnhjvb9cx8jt088uwc7m6nicjai9a0e06oiyuw67g76tb2shf7vcpwfzb1ji1y96jfitodri85txqgoh8qud2xyfr2h4wstksna8dg1dhgdixlvw6o5gkcyfydfdcnyx058o5nipa8bni2230cohtzc8sc3o11w3f2h7g8cxzb3ire2qk49d873gz87089kwowsm5by63i9n2y',
                url: 'ub8ouirch12gxcx24jm7m794srwdbm090t1ty9ts8zuofvqwq39rwgfxi95a7rvv2uzlcfhm2r7c3muor5nhce0ne6lygrk1xq1icj09bzbx20mposwk02552m1jepaexi4slsfhii4nb0eapb0ctn0n77juknc3g19xmy3nadg8r5m1r1nc0ok01s9cs41d0xnsgjyjbqef24x8r3nd6hmmcvq2l84te11jwdkf24yqmzvk9x40uv8o7r3jh20jqllw9v4gjmgqq832x90smfvkwunsvb02roy5qd5vtt4wa2bxf3iadpn0l6vqp7tn7hnncja7z73zy1ne3ydp33tbdg9nj5zy7kn7acxv2pugov9onh4yr5y9mjcjb5l78xryvd18hl2ac70k1p98erc2kite2qkkp20qvxvyi3nro29ud1ah6nmui9marbl849yepoghvsenh5a81xsx2g00jqusspe9kql1spegr5t0ctbrnws7eqmv45gcbfznwj5qm1uranjhappm8ggxefq7k1hgr7fyomtmjpjagt9s1vj6a2v65c7ip9t30iyg8w5ydem697afvl84vrkk1ai19hbwwafwr0sjokpbn9ppaqffg5dsedeen2xl3sekvxtga2dvkqexox9qnzfhv109rjyb37zzcgh7ertcg7n4irqkkupl1pqw11f96xg6l6779u2phau9ec6vrytcldvrmjuv362twx76bcfxq99t7u3enbf24eaxwji007t897bpt3zftjmd0mt3idz76lhefsmnbbcjmquiody4r8uq84sedszyv8vacn1u567di5iepmiuukvpmo7wttzo4ksjmweb6xk6085lkvjrgj5ba3ecp7gikwnw5okmoyc0r50uqm784banqlbgtkaj4zkbqqsz1dwlcj6x3mbjqhevbo8aoql4m0h1ij7h5q10yirxdxy5a5zyduk07fmwuiqkzeux16fnftcfbt70foxsxxy3izyyz4v44hu230hl',
                mime: 'ivavozst3jy87eam6chsqm8bmoo9owg5weieya4pcmqqdsi68x',
                extension: '4yvjgvcupy3bvgmcid8zbwgi554tyeawmrla707skzf62ebtyz',
                size: 2314229281,
                width: 659166,
                height: 403113,
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
                
                name: 'kc3ib9o62ech10sv1k3qyl5mb6zh3s64w3nlt7va5jc9uh5femp4cevbq01k9atwps56lu2e7dpe032yj9548slansm329i6y4kywnaa4843z64h6hwgmlctjrayc2zl732uijfy3pa5ru9qfrgt5ggvig1b0nifvv8x5v1nrzytve52ml1r6i3mexwf70twd0na4o0xmmkap8m4lpoa0x0sr6225e5pd9eqzdp02elahbnsaltblzzqywiwhpx',
                pathname: 'arr6oof6p9wclj73dxoqxzysj76y02c5ax16twfjy2ap80u6jsdvvt4g2iytz51dk8tuljuv2mfmtcpw94ks8ib6t6q0sn2jazgykne684sy0lywjx5r5y1fjztjg2uvvzijgx8xeou4si0jfea8v1obphg38nzfv4t40w6ka8vcivjmqhehjorvc7suabebivmv1ao9sfzws6z6nsph8n6l8908wn8osiixftazt3dnges0xf29k8wwz1botgo28tv2inakyxj4vl5zj78xcixxhrhljcktpthc7ux0dfz9lmgnvhygwcs2i11xh16y3deizk44hoyda1ngnu8zcawks6xhx332o6tcw0q387uhvoml5pzmejjxqz6dzvd5h8rw5ahvnwg72ymp6aieydwwnfzpxhl4r957cc7pctzjrs1tqaddakt6zokpj8tut5ic9m9mecz38v0iugqtm7bh6ky85ilprft46dkxhyjfhczgvdjqkvrulr7or35k7ej7cqespb7q9ktsnqbs41pzz1eswxhu7qa00cieyra80j5ozrdl7f5l3y2jznmabkxdnafrle3m0c3n2pliolqnn5d7ikt30b85roc0tlq4sz0u4vsmu5o7ixlwm601japsdz800bll9ynpvng7qa5z2r8iou4q94dhgpggl7kae141e95qz99gyq0o47uwrepcdhs649tpt54xlhw7yqfzer9eu7muj7jy0r9s9zos9v5jzckbmvgk28kp325lwx6fmj5g1kzd0z7pzvafmwcjeu7ngd7xn5q6v18oyv2tfg71jqvyd1f73de0xiqpg2yxpgy87orwqp6yaqd4mqsn7iqtltl0fs979wtd5fim185fl7hxp216enqyqzuorl2t3ehgxoqth2rugh4r238wxl7ew4tv34vx0z20685r2vztyl1h24ss640x2c6uv3i50qkkml7gyd87v7kbgoamnxvldq4jdwgirx8852190tkb7gz7q3bn41rfxtko',
                filename: 'kwbwwymm3ehoik37kns4nvk5fjikxau195esid8g8nvyv8nxeet90fp2uv91k1999tfd2yzv8hou25cwy7r4p2txq29zsdvia1sjghei7f9b72q4dcuvgv6lypcw8qyu02bz7pa6e8rgvz62lzj5kyrnalvljz9faqyts1ebsfz0rgdk4bxziitygtr2ughu2ehh6oxdkhqvt4qrea32afcazhn3klqy2ep1752rrgacm9aebx8zdrja28jaz87',
                url: 'ksyk5kd6dasp3pxakdnhdmms8q9fxro2xmummguj7swis0cq6e3xwxhbq8epbyk31hjgzr9n14cub06haky22achcostutthfb6ptkqwpigrglgzzutmd68mkw3crpbr789hrf8vhgyjt72mg10bosjoh1spbz1pja7hajykrc7q1rak9sjlywbgv5ngm9fuzoovdg17z9ki9ox0qisy5lccmecfoyao4qhwbd40p2as7fxbzxug6b2o4jmwj4eenk7pq8ulbda8zwo8m1xpngf6uu1sbj8e9ljqwxgvjjgv2c71xpxnwfqrs3uwmppbcozah2kfcnb4hvq3fodhpmcx5acycjbdyf2ytewomw1gllm8y43i0375ojt8mbtp0bvkb5rcwxk4myj43g7gtchdeaiugxccoirkvjc8rhse218ii50zg167lbe3bkacbhwkwwcruutdu28dvnb4r3fwik3es4cscsfhummy7q7w4vrh7xvklglpjw9n6y6dvi333x49g6lqxldztgi6er7k9mt4p7olvo4ob8yc0v61pxoihzvfn6alg4r0f62x5zof4fa77ff9eoo0xyspo78ei18199v2afkkk4tf2vo09degwy6ivozbh4j4pj9iad595kpox5itafl4b9jf7dz0n814k1kvxtjm458cnsub0wkdlornyjaldwhk46nhgin2ntcjj64blup7htwm0dfgx88mo2jas1vqfzxtennygtpji6ebuftxb7rlmz98k4cgl725y3vjh5ykn4v0rz0prj1h3jme1b841u675p0nrnfhhqbwb76rcvf1rixrgeh2lws13v699zr07c1b7u2z41p4im1hsg5ieisonwfdxr225wwj4kew0il6arshpuysovioihgzax1h3bws9xo25xxs5eqy66jtodjftwd54k6b78dkeyxbjfe99l8pa5ox4zjn6ptu9r9nhhvkeuh7aqug3vtf4s0g6ob4z2ro75telciiko7tvzxds7f4',
                mime: 'gkn6kleu80wvlzpy4qxu4kr06y9rx00n5enhyu1nttmz94t34l',
                extension: 'sb8kfgx88l79glhgakksyv1nwwh4avnl07s931nrnwu0j1izh2',
                size: 7638430255,
                width: 126604,
                height: 894869,
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
                id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9',
                name: 'wd55t7mmlsoodsh4ptd0bzci8u3ftk8upuvnte0layeet66zqyuoused9k868vrfv5xid9ud0pkt9mp2q7chnqml6eh2ng3d62lb5nzew9bo43oqchgsciw6kn1ekhw3stwv967znultpdnz8dvyr55hf2mrpbb7sj4yd1gp4ow03hdreodhnkc3yt7678lutyvup0l0zp2u0xpnmw8zgk5h23yqlwy3ylm1nboyr8gbjlklt7hezw1flw70o9l',
                pathname: null,
                filename: 'p6koa099xaf7j8bkmjv823fkvn1szek6u6tevi3qxn2p19npc91jf4h7exohw8aykp6ugqis235v1kqx0cqnj7m4hrahbeu38wzm2rj917cneffemf0raohnadqqewdfmegp5t3uiva6f1x4k829whu11yrd3pwdjlfyvx3bgld9ztg4ernpvq84opjwj41kdxwg1ga1jdonzano37beopiauprrcngnuewuxngb2iv96hgzpqdixy21si3tz9v',
                url: '3pr27vqgk31w3iike6kq6nwc3aalsrgzq4txnwyimt1q4q46nvfywd06s5ujkt0eys8bfl964qyk3xknyvknej7yehcl2ktq45jnjxd2zgfbg8tt6i4772q55oou1z4627ewnxxhlpijrhkbd2h395tfv40j8glfz5l1ld7lhh4rynjpynudm7vj5vslcrhqupigsczlo3tt9b8kxcqqqr0i1evsexwcwg1gn7qbzs8qe9c6wnlpavnp37ufktj4zxnwqq3igu7ydroywrug689tyo8x1ww3m8q5qceprm6phrszqgic5mfgryecohasae73hpw7cy7z3dmzvzew6gsnp5v2zdpz60b2kc0q6shoievf1754e30jpzkshp7vj49g37qn8fpu9frprmqm7yexx75wjir5296iiw6zglq9mzv72q16hyb7thf4hyetx6c6qmnq5hbn7c80f2e95nkj6jow90edbprrq0nvpnw4lskotar4q2rsagh2x7poect5aroialtklp7qa0ij7msreb0wl9pqnkbxouwq05u5x7k994z9r3834q8z1xkcujbw39ofi0aujtb0e7qk8yhhw8vk3wgxlhu94csqe03y3f42tlddngl1m64wrnk35asp45hff724z4d3hj3e01ekkiyzbwcj19silwam8g5xw81yoqzahdor2k497roepitwlczt67lx9g1i8wbqnre3yo57pwp8v6wsisayne0tngivg8w03y9yzog4q8ahzrzvq7py8cvsxb8dq729q80g7ivwn94cm1p3nxn81siwk78g3c3o12pe053p7n1b9n43v0up4n9ygyeogrnz2xsys2fvux3l070kgqm4xrsj6roxznmqcaq012xc726zjimz9mhjb9bjgxsqhvgyf87irolpoghhocdjis6wtfcjv3ptlhh5h5pl75knq0axghxm34q0v3ppxszlcjsyqme006qzvazxpxe87a5676vzw8siatqp0waw7kuymtm7',
                mime: 'w4tmyh49d2dgzmimii8z3y5lxt9jvv4kpaep15d4w4uqn0mm0z',
                extension: 'ehfrctlm03j527b4g5fqu0tjxrhb4j59xf40518q1u2508b3oa',
                size: 9363772546,
                width: 622701,
                height: 515351,
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
                id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9',
                name: 'nlkkulzoakrgdg69athp83f8cxsgw6dj9jilpq68lpdjdla35ztmud2br3h8zu9r7zlkw2x60auhis6c555hlapa89hi809m51b6b5udwe8ygd3b5s5hznbply2x82j4y8hpl06gklzz01hjddlv1w5c0j6r9r3fj3ji6xuu1kmk0mpiii815o990a7edvr0wwufejnfe4h4q3yzw10yk7rd4uxvizjev97q466sl1kfd3a8hpinb4klpf5rtme',
                
                filename: '5bg72udhyqfr5wo1rgtck26zu8v4uyfytjs55hz0av8tuh11r5vxkphqsg5zt1xv2gnlaxvl7gzcocu0zpz2i51uwxms80nqvnvbxgz7ex13ot739lpjkg4ptg1ox3i38omqx4sg0f2d0gl6v48tpehtyhtnrk03bg5qnk6oy9fbv9vv8z2y0a7j6g55u1e9yirkqla8gf9sxyzd0smte07xgy53eiih5oqxvpltbrf3u12emsfv6o1gms01c7p',
                url: '6y6qpuub077xoqlimdnivjjf6wkvq9m4x0l1r8gs47lg6kmwfpq0tzr19sx16mqyag88gzg3ijy5hcq39s37lxpamrj1ah8z4l7260jqlyj6u5267hqrxe09y5xmgq867d7v8cron7l6epvepdexxsq7w5ho3zt44xulicfagpkriei161bskhf4t2ncalajuikcftk9x609ksy2fakdard7wza0u78mmrlfawcmcz5j1yrv6kpz861hosza2025hljg34gftlfxxza2l3v4ulj1mypgxw8m6vlgonc6hgdvga7k0imlc1yg7yp78r85itvokw4uos2ismzipb61i5ltnhzdk1mhvmzd43fkxd8rpmj2ntj2q9fyin3vqtia77n9xlkzsspkvocbuokxvo4ohlye0331sm3qp4jxffk3cq1j9zp4hlejj6uh55aea8zpy7vxsjpcimvzomrjl6qiwtqc9ue0i9nh5d283ti6iegqax7wsibpgqbezs72rlohio15d36ubswsa29adiws81f61yqouip8q2yt5kwm7b55xa2oijrklu4ocoz3ib1fbq41bnhug4ymystmra63bkbmtbadtyahcc2oifsjux3xbh1d2iyon54n7srn0fpc6416yforzo9d24uis3wzl7cb6d6x79zrgkomlibws5wn1l8o0sd975ewklbfj817wo1zt03hrd1v1xidyufm5hczwk86649b77mb6zkpgyizda43m3hq9iov9z5gu4z0i7xpeu64kh1nlhlnwgpvueojk7vlht3ew58j9c4f1vpldqm3ps20im90jy29hw2ppnspmo1grpo1xzl708pgx0wz70na4lcu7ah7vvajsof3gidywk95fohbd8hr6jfxe9oznkzly4tsq0yxdbjha72diduvgs3f3fubrl4dvkxv52l4le4gnrt1j6zzmtlfbhusyu2o9q3jqlspfd69bultwcj225gx53lgsw0nrvaeec7btfp6ltp65i0q',
                mime: 'movc6anox2azp5agpxxgefouqd4q80pdwlz9auioadghnh540d',
                extension: '4abngmwuxa2ki18u2q437w85dkckiemwo8pvpzfy3jt6yna0uq',
                size: 8017730749,
                width: 975065,
                height: 416897,
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
                id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9',
                name: 'guemkaymkvbi25g6acdpmybvqtr273szdbgwln2v7e7qtkw63wfnd8lu783srvnpxkrvbf78tl0vpw28k3t0nqsdor2ysupr1iwz9vwwvzt4oein7qmk1n1k8t1lb8cd8lxs3h5vpd2tr2vpqef5wcwza53flctgz5imnkilfo1cn6hua9jah652h4gw89ylo17jq2l246jh150x8kdbia2ty6i7m3hpiehweqmwlec9dfa933va8db9hpjf9y7',
                pathname: 'tulobsq7xnv9ogg672yigyjax8o3sqt1iec073bn7a69oxwv82rv9ip1jzj0ijjhmg7er4p3zqtclcpoz169d6gbx2fvp39v5rrjlll45h28e2m4yd3krr5bmffcmx6wk5t9qb3wv1yehs3agf91t3oitd01unltxqtbysyf1n43ma6e4ovwba93k12ibv5h190veo781o41bwlpxgyrq1ksasxp3o1x9bbfgywt6ud71tlpeq4qnluk9lz75pbblij7vnksv296b1ld9n7uwj6uoz66ajkrtj6uek55hwbfw00tdxvwqfich8jot94gglie33066ckfnquc8v13cxxgrbioy4u2tazgmu4n8oq5ia67i8qba6lb85h79mngwuv6lgwr6fuz2hlbjw58ztlb6132xneh72bbtsrau4z1xfgnns7tmvx0ue9yp76m6xj9iagp5narqclxzudspk7rbbkhs78wqp86s0f4bkgllzyl3xvl8do0kj2f8rlhjujlbuwkb7gz74pdcbacyw38pnm36mfjqsi46bfwljq9lolm93yuzi84e29yzrj7rd306b0at8k31hpwzdxh4ga1tekruhi4pwohtglu8hn1qgfjrrf32ap301eg7zh949439mdyvgzjnvtsmar96l5ggmla479295g1vagke9nldaeurpapp1xtw7je81tj5jkctdje2n7hf1sglknpwmyt8o4lxeyg1ljuu58vskb835rfadmzhf71o2fl2hk6n8xfmd6eukw77rdx0lwf01ad2if080cyk56paao8i630f2l0u5wt5zhl6cyrini8ig1urv2tbdmu0j3ruzzko2sowvdbcq38qlgfjjiiqma20rtmn6d8dq3ouw18h1u3a8g0q03ks0s7l2xxecznarukyeegoi7bs848n1yh3v5o1bewicyld0j2obcad29ttv3ud2i10olbylu63imyxa0utkrqmy0fzg4dok8ex6rcwxcuepsveyxd35fmmk6k',
                filename: null,
                url: 'x2j0v7xfkpxmpcasw8bmjwfubivb3pgs5qzveea6govpfg8kulg6hj6889o3ft7ecp6zn3fjzobkp35ebm9dh760tvqxrdhw6ld7ribg65k2pexl1rpz8stx8z7j8eko01ekhnxu0gwsyj9wht814oyxxg6ufz9u19ehi3j4qtka2xo3org4o7f8h4ic49k1a38epm3oxpwncf8vu005sqq6ydbswqmtlula70hjf7tbbb0ybzxc8lfn4todl7zaefxfoapxj8k3fumgpwal8rl1wh0jtq0b7781p0axbffdwy7g3ngapuy74xz6b5jgkn7pewwd8f83rpqz20j09gwfk8lf59017cvl4pmgyki7i25587ihgpokzqq4j48dolv2aj1l1l0b8ibxxfjefoykk4f0kgvheho8zkg57dr1fwq8ordy4cfcicmyk47ivynk1ujmli09up2nogtgxdoq4apq1vqkvg07sg5a9drtes6dnui3xom52p1kk0upgeejt1vtr2tyj2m1c193pp6m2q52n571rflqs4gl1zohbbzote1p1509nniip3vuinsgqteljd4pk5b7wg2tqxrs49aozc6vcjwdojsagf7s430uy5eudeqjxfc0dmxij1k167lj6kgqv69h5qm4r63lj8tqj2awubudpm2k37s153c8zaxmzi5lvjhx1qji9bj7fbe9jordko66c5jf4gotqozcf6ut5gt4hp7ndlamw4aov4ej4v9jdop3qq6jx9cvi69da6n70w833eg6zkbb5qj9q3w23c68k713g2k53l7vixrtz6psldnl5660q731lox6adnos7j2afgcsbvxxzlta9r8pyco37cx1v8yrl575nblo9r2ai5w69s33adnatqkuxcc0dt61y5pg0tz3z5jwaxfh52bxzv94iyokyk1d896816ygeky5u05513mtxz2rj1ag18mnq3upyii99u95qv127ui8anseozv68l1lgej5e8jhbir6ssb',
                mime: 'ullcbmydom27kk1g1cpty9upyesmctzok082l76scdyo7fpxyh',
                extension: 'ctdrsw85lbphjaazon0srf6ia6v456obf5l9vabtjhc7zw2mqo',
                size: 2443061222,
                width: 342236,
                height: 190757,
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
                id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9',
                name: 'ph3towlggussscy0s94ptqve36saq8qinngx9uhla6rnr6cyihktbwnisltnjzdd7n21d8bs12d7aio21tclq38x87ziivdt2zulj6el1tfzus3susg8gvbqs8codngiq5xp14ogk4bcqkh1leyu0ndh63gy93oz7031glhx4n3s4l0m1627qyommcm6y9j90tjr47v9xb4hw16ym99kq4f1crawblhe3csgtycbgxnysuuz978xzioc0k4c8ms',
                pathname: '3ghppnesgnglivzj0z13mpisp1ci6fug6jxntuytqwa8gz3jbd3wcpsfgihor37y37wugxijexlm2fd6cixuoaikia46gv6y7xq4z8j3wtgbqe3cq1eibd835r1q4d71sx87deecljw4vqu4c46yq45rq6770ryxinhmszlet77svhp10jnrmozfjsuog26y7u8ywoyo0afh55jmm9ghhk8bzt3ikjbqz1r9b2aav4y10sgyll2qxdlqtlhsg3ok0oxrb3oxks0tjx6e9dmcev31fy8f0mkoab87wnln1dwm3iuv9wsfhgudhytn7wn7pwhaicz94d3ao9jvf354a8b52rrw2dmrf5vzd3dsy9pncav7jzgksmonlpqi6vl4edbj36g845al7igmv2988mqq2arrkkmr5i5c6cwiw2bvqjumcsfbghmj8okjba0liitpxh8ksrg26qfftoo3xabibvn9cstez3ymegc7r5pxn5flfg5jaa6xdfu4fa8skfu9tlk0mqi5rnqrdvytvwxhv0itnt0wdlugelel01od93002blj4bx4dj5hb298nqerm7ive5uq0o6is610hislqlm902mv1522q4wj5ucwjdh5lpfb9ctmg6lldl4ckeia7aoq9h5vjm42yifgeq7zwnfp7iaibiepnfyenttnk9i71gp5aqf0f6o9mzqa8eqtgmlfr1h9n8gnw8zmp00cgqn57rs69z92s8fj4zrkybu9fual2r2ac1v9qqyam1w292s1qm1lsq1rrjn4e9z0avt6052zx8o4imdddog47p55v9iihtq02nimp38771hyuox8aihk46s5m40005qqovac4mtvpcmtnp650vix8unj2jkhc3aep4kppgr3scwfgqhzpxpli8bzhxkeeacczy7qb25ya32kgee53czvaoohslood5tzpkgx8qw5ir9nrq0ab0i6yi06avyvre1dsnkc88r1i4yby0mujmpxbu2w9syrpgy6sq8xmgr3',
                
                url: 'b02guc2hpsbprcsvuh5965xozlfjdefs71bhpprz6t9myijp7n1cpo2y6g0v4mdgfvgmxvwvzyloggdu2500e9r6z548xrc4k0somsjfv72mfmt8yu5yhnqltq1q756xs3n6n3wbupf7uk0oieb23q0s3x4s5g2ogaelafob3lx9atkt747kxr6w3azvw4nc7vc29bahhblmmvqbaadi3kjlqapj547087sotz6cd2r7wmbe74jhcauxsprs1yk1d54g61l5spxzj7jorlce948ex56rw2zu6w55thihrddy8emhcnfl7sbwff3x58rst8u75gupa2vw3ucakx4c0jbfhs1mbmedeirxraellpes4ojxnt8gkorgihl8lzvnfchr8s1y75vv0qktako0cddngo0nzp3hvmqnxqrpkgvf8kpv3lzdvjvanseftjnlha4jvsx0intk88o5f0sr72ojkrb11v6crip6ohtqu6uvwz43ow5igtnpaopem7ovcyyqkw03bjbryr33aov4mt5xa9g1tqnoevaw8b1z9xxtksiuu0itvynpya85m4r1efkcm1q1eh6gqtfe2pe6mrzgx1ppcctjnmbg3ys6w1dyh867mpt1dnvjhuihpjbr3fvkolfn2rpyg70inej0v3mqc3qnr4ja615jx1jrkmgnq69l8ozvtd4is1odon2p1plm6oti037qntkzec7sgp3cy0oywwpxx3z944pyadxdf0x7i4pdrsq2o46oux3s9vj58bhxubqehjc9b3f3cbkknaw3edunlnx1rxxttjghnp8j0gz3vbxlxcdjlqerevsi7q676bz7m3hfiwxc7jnw9auq31azzfb9ejnlada1ia247ktna55z90qxi8fo6ywcxlwxd2bkefmrb9wzlouxbuxjzf8m08lkjpw10edn38uu5briqvtyw19is8lqo6qhaxwoal06cvvjjs3ih10a1wln3kpqwpkarbtgeuasyp8ysczvijqy4we4rmam',
                mime: 'l080wuwtpxs8ahpeh1pfm21cp5x6bln8ujyenr0ldoivzc1v9r',
                extension: '0qb9oq7k7rbd47fz2aeojkrqgyntcf4a3up6nm8f3hwwtpiaz5',
                size: 9917203026,
                width: 819486,
                height: 343446,
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
                id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9',
                name: 'edcg1tui4q9pxtbxx3d5x6g7mievgc2nxot9640oreqwfvllsze8pkxjx1rgs5xxm1w928auj9m3wmkqr2u97ube82lysimzyvdttiv3gxqsr0knytgtwq0f4h31bxc3ve4b8zlyi01nzakrz3k1x700945a16rokx3uf66watllk8nmnx9gtqf8bwcn9e06qaar7pizeuycsle5wvgh75k06hc7v0zwn80t46rj4oxxvr6wlrp6ve054upvk1o',
                pathname: '8qs8oqiucjt6q3ohy1uofs7alnau2u2srk6y4m7xnc8eb3drlxv7c6c52yxoq2mpm1wwsn70dhgofx87kts9g158t9k9g4rh2pv3sewo6y59tkm73wsnwthayg7zkcycv1s83m2cxibqjqeb440m3uwzhbh6cxfythi00148fmu0bi53vqq1rd9gl7rkiofkxtq5bsqvs0fom4kwsxwculao8g5qwl0bqhv578bd05536yuao3y8dagk7c1hwyu0awuvei7emc9vln8ubyqkwya0hqg3mles810yz6sagedhqvjl87vz6uiizt1sdwfgew7iuh46wnlxtrpy5ug7hux6oj6avbsdlm3vp42zs3vohj3g6rgkcrju185hp44j6ghrp06mmdga96l8t48ezzbibq9b40iodwj18pwzy37f19h43759k57c1tw1y4s07mclyi4c2um27cwako9mvzurqsj27aw78ks8f4tvgw69cph760mhxone457a58piletmjnfwi47gju469oklm3woj0l0s0iqc9lij86qibmqnxyhh2ti2exinpwxcneoh6p0v02ei6clow8ugmzpoqdhs70mcdflgs1w81hfxyog4fr9hxzw7wxe2dy8wwkk9nxuj7d9k0pb2t5gvrzyqpfgujj423n1buwvy2acug08lomxzo42o71suzctbndnljo8nuizv3iibdmmv4shomvb6okgg06gmn2ulz6qrc879iv635qm6ixe1nn2nrszh6flktqvvl2brbxtq0zi0s11m3qqw2q3g077dvh3kt5uuz30cte5v9n9h990lwma584zk5pyxa03xn4u3um7cryi2h6humfk6ebqoh2ed4kjt7wxh39v3in1m3zwxe8mpmlfhza0rupxk98ek1228wijwv6cowfpcggvbt0v8dzf7fjy4h6uujdbf2zurogp4td7upmsajdn57xmoirwqab9cy6fc5s3cl3r8zdagyornxv98w9qed68yvzjv9ki',
                filename: 'fqytxfu2po5cex5jlrl1vo7poyq7nk7dyg0421hbqjpjn9rfgzp102jsz8t2bg27ssb4vt1higwl8zagkaxxe336z5nwr0gykfku7adt3w3l632lak56jcw0gjsqpqw0epbsdcdw7lepy7sof5nb77oaxzyu9xyuwjqott21xozl7nk936nlo7guycsvy1nah6uqo7vonlxa93jyptx3uv46fhdw03lonvs5y3s5ikn5wxzt8dihbm6kgmrghpl',
                url: null,
                mime: 'z685r3mjgs4zcgvm6a2oqlaqp1p7z3wbzrnxoijk9crq3ou3fx',
                extension: 'pcdkxscxvhifa1brv9p2sl4mx5g8u927ystgu3o7jcupizfdq4',
                size: 3153319996,
                width: 698196,
                height: 286154,
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
                id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9',
                name: '4cycdl1rogfxlmeq1ffekdki4i6fs11q1gcyq6qwe797804pkdfrxfngwkqct3xtm1l5f2f62yflpoy8zr0bwlq2l5e1qjxbza4gin6i7njoewumudwu58tbvwe7ec4sardd5etfs9z2z293ikdqm3ct4a463mmkkvjudrgs1fivu3oj6mdpm4pxzeop6v3q99iun1wfp8761y5oim8i08aweuwx05q1xl3tt8n99sl4u05xkjo1m1yjz808gxc',
                pathname: '2kd7vkvfbxmn6uirprmokep55gmio6ushgr4kliaomwg1f5dz12rv03432ibfm5tlasn0mm5jub26itu54jpgfj8hkbarldzvfwzzl7kgwx25ygstl1dbx07ynl2q4jbljcz7fnjxd0htpw4h9g5t97ccfxlup4tojozh1iwiq082rk86pgsm0mjz1fzbcvb3wpc2nudoug6yxpv5gjx6bkj2gxys7on0da4dcb0cwzy7geozy8h4jqbhheeyzppsa93g9e0kf0tzzr0nxt1gfyv92wvmvn2jrxocsl0nemmluyw6mt5l9dgqff8fguubpek08sedulykdsvxxqrcwwl4p8gwh7f5i2yq4uh2t4m0tiwxe6ltcex4is48to7k7a47g45y33wz6k08w523puutx5fo822m40t3v9dppagso0x4q9d8tx8n7rngqmh6rll01htvlvq6236v3b6tk3vikttuqlnpjdfi1vhtmjtq1yl0gmikg20xjuo1kc1au8wxf8m9w8oi6iicvmqbnk1x9y256if018irj3ljojav0jpdrq4kr6sxkeo2pkq2tghqxpiuinvuhirp0r4rknru4bzyt7x4cgbudfrgtnahps8bgo5byfd6budfc4l8frv6yx8kz67qwicuz8rw0u5o2ra41kac3x4sb0ysb2ynzcn3qrl2892e1qh8exa91fjv1almv8rvhs4ncq2an69lw08es0k8nldr0wtpote8zh0yj8ndk450szm90s08vxft1ypbwny63qz6645ha7htzw3hsdzrtx4l3lzcby546bbtbjbd9r28cqed5w8gxgzksv0gad9z091vxkmieieuvleiv4o7ehu291r2dp1goxga3xj0js1xpnzw78bztly4emyl4juw1xcai7c0xfwwcisk3qka48i0h6nd3w9a4kkcx4i5dgxxzoxw0yz18rm73zkiziybjjoq4ka4j1g7bcs69ck2e64dsf9lp9lcly3vgw1guuzwqp0ugb2',
                filename: 'q8as73t03nd9um6t4qyw2mk066bgmlf5b96onfexcijpto26m1ldpjyt9qbs9xguchd8tdgx6fpgpphgq6o6cjwfru7pggpw19yqcx8rm23ngziae7btidzvax10fgql345qjrhjio2dbar2oel71960s2g1wyw2adc86u22qgb2aizdo6hnrlml5gj7m7pgoefmma26ng4favot4xsp6lab1oo6bxdqnw0yl4v34g4r8i3ef9enlu9zup4dywa',
                
                mime: 'pzz9yk9oyqcx610p5521k5wjmi5xdvntn0i51z46xxsajfwqjp',
                extension: 'ig2b8qmf3mz4rv9u5mcoer8o0mkfdzs0rmhq6vym1cxjybkdvg',
                size: 7582952181,
                width: 134739,
                height: 481605,
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
                id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9',
                name: '1zvv5z8c47a03gce09lzbln9kcn448y2lovhc5dh19nrzvyd4o59ib00mv6y059ki2do3if13v3wt1nwoaq6pm7nj0n7in2l2drm4q1dm2h509jcmqw77u2lgvay75a31hcjcq8fkniishqsys1bds2npozvvwtwikelzv5mrv2uhox5vbybnkxdxfdt6rbrd4w0e8wtlbs7w7o7ylsu6uaprpt2rd2ujy5tmgfatjf371oe3hng6kuj9h4vre8',
                pathname: 'v6l2l05w5wc4rvsgjon4q3xvjtz5wj0fauhowu2mj1x686ryg93vobma3fuwo59zifp8ucosxatdrg4rs52ybr55fz51p4ibbalx24qq01rizrb7r2o4c94w5m0bc2n55khwpr7kzqs0y01u3lkvubkr98kmwncrfn4acy0ng4k2g5sq333wmlf1m7bcp1tw4kv56rp4l4y3v8xrkr3x1fucm08yngn597pz8luo9melwpgo85qzw3dw6mrypp8b892wyd7e8wgwmkh91a4orhiocajfh8h54xiba8l7dhc9uhazyiqmn7t3n8p2jwx8jiuwairranj3hbqmo43kkg2knmqo1up3wvxvxlc0f6y3mrncneu2gzm2wt42da7ky5j1rw41y821vy5jpdsuetq8zvb1lbigvoe2rjxrbnoen18ih1wojkgdq4rpw4pr5d8n3i0tq19ksb1iapbjqfxd5tfv8tql2e4fnj52c5pa64xm6jadnai6mdlve7yyr7y3ijda7eb7mq54vvqgtizbb9yo78bl19d0hbc46ulr4gmhxv9r3q3tazziq4t8lx9mkhjbl14d3hi8fhvkhn94o5iw8y9fynokilbd9yeyyeulhsu06i50hbvaix7y8k0iks1l2uyz4bnqtmoh4yq43j5shunvaux1fx5vls3g6yyse9z8whqvaerr0v3zh5ohf75umd0jszda2rdaigzjvojzk6j70piqtf2i7j75mqmayv2rmpr6tunwv1orrpilv6kucxfvpw1xfcguv44t573lbzcu6c5eyotqk3lltihseezzymse3p7zatmmducg6idpdffglnek6f3y3zec9drjftfdowysf2i1kaw4k7wrnw5p0f5fsqe3p8dxlu10cfutiwsaeorsva2p86oh6h5r24v5ocjhsk34v5pk09uuwe2nrii46zoc5gd5dyxlosdeva4q2oae80kw09epl4kwsnnl3kob2bfv9st03b1uhn3uql2r879wwf9y',
                filename: 'pixv961ihmhafkl93d93ja72ddg9vqz2wpdhg9jfttjc62aidf0iao6y9p96r4t17dnqg4m43rugsyith0d3ix1ixex9d8byy9xjrs2ru5jd4o3x0qh9chf8sxacnhk8oqwthes29d2s0fxqdza7w3xmj1o28odylsngzbnxuoz7onkxvsy5ble5rl45x1nh0r102l7q1lzhq5o49xhn952vud93he7yrpyit7fqwm36i60fdd9ad6lzn5o1xdr',
                url: 'lnv03keg4lkyc7ko3oanu3118l9nkl4mzy5fv60x9u2mm4grxizkchyh41l7a6vpdj9jt205aojc24lvwmyabqr02o65lr8zzsxz23byk8jg3sx14pzt4ffew7ucdsdk2yii7qhf6nkip4jywv7sj47d3yiegtpuwjccu7cu5le8qefwkraeayj4gckfbwo0ad840vglghgns3fyfdffsj6k8rfdkxzb4j2mhmmm8ez46e6me0nbf4t1q4eh4ypc80bdmuqon805q7islb5l5mcbof7me75k077ntck3ab84cyifrfrpo9dbmch4t8ztkw0u5rlkfnw49p4s6l97d9h3x5o6dfr4a63rx954tu3kwi26truy1h3f64xu8iiyj9ii7tzvt4gviawlfcoe44gxn4itjjhofufa57xkxu1tc0cu926hge190yaoerdru0al7kosgp1trah6bgtczy1sz9ehedimlqfphj6bxh24p6jhp77pgynb54wnzoek8tjm784asgjk6ybl2powm5ch0l1pvtojh6oc533rtcwwhcid6kib6shur5qb5g0lun673hcrz68ctpkejplkppo7k14ffa849ox2wz0gd0e3mq5lc6jb35dnvuvfgj2jubw9774zqc6vs73smfd1e0zio7dpjwyi1ejbmu6jwn011r3s4s3wkyojziyazaxrma95fxdbckt9je2ha77n0agp49ob04bo34a9evd0ocmowhirybumi6a0k7n5zzsenfmlc1ajrjmw8xhisz1ymzke8nl5aiz6cizsfqh8bmnoi9b8pc31jjp14wzoh3vajk0uio4yrek172abgwwqzk39zfbn9ezicglm0xw2pan9qlu9bcsjzgf45qqg088h906cvpemx09imjf8yjvdtnlek2qqph3hm1y5zfz7b3etbnq9e9h1p9am9j7euyt74ytrm6dx9f7uh9r1xxkydtfjab3qmjiesx20656kotue8iko9xil2oskf8p6ago8',
                mime: null,
                extension: '9lqpz137h9bt7uaimuz3tkz7vwynx9ou1tz8zac3ssk5zx9yd8',
                size: 1276392396,
                width: 879758,
                height: 299886,
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
                id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9',
                name: 'g63l2usrixdzin04wjo7ca5vaxibfkeqo58dp236x4pcewc3aic7j6yp1bdjjs4whq2bph5phhnps4r6ca3nli6rntoescu5ycbu8ore8u3tntynic9c0wjwd1p4m18spordrvbnptjc467m8eun3kwg32054n6bxvxg89l0wwqwhuiterqjixyaadf2cjcrvcs0utwl7pnq5qxuqxm8l49b9npqcxolzeox8ksswqerrc1ftu8r1pnjmnir13d',
                pathname: 'gruriaafg73dee74ufvhdkqgicqi7zgdjia9x3kkzkgekidiulhpmg9xd7xh0fx6dn20v9mrwl81nto3muxl3ct4ak4hzxurws8cgbqn8o4lyzzihr7cl15009psl0z9qj4r9xvxjci9xc1q3ni48twiqh1nispusu8eyyo11tdwl8m9jfrh2j2kev5i44bytqssnkqt3rlnr5ujuafqt8ux84dw0ru6c403b3fqyh2y07ihm88ny9plz7zax256onpm6qm6t7uvyhoie94kuscdsi1aqr76uftklp4ak7heuze3x4apeeit6u61hb0hiqy29c6i4bxp3ae3obzjnl8vujhnksb0t6mq3rnujnb4se14qyis6es1e5nqbyqweasmv999vv2afrdj6vi3x5nk4nid5gizl9blatxgm5pgygwjnlyr9ib91q8y8sq8vvmuxn4bem62hhxj4hcxza0q1cdeh1oy1l8pd4gwa3spo9fm3zzdh70tcvrs04pqej76zo2ln9lmqpa0edieimoteuqp8trcutjlh3ly1jgt7ofd1bvcadzpwbd5vdy5a4ni7ifus5sacuyn7ivgzyv095sfhaoew03prctiu5il8sldnovbkb9n5ujks5aons7w2ecuandqj0ri16lpfmwxr75lwb4hjcy0wgquatqgzed5gp4g9yrfnt9krkbc2v5kd36tl7el2ini60nmhqtsn7lts8e6ef2gsyd201afbume9odp3pvneoxlkz6m1j8c7do9e8pcl5hq08gvxs719tc9n8w2jjey70e032bhn1jtf2oeu23dgcrw81los52ctbep7ba2pphktl7h32whdqvmsyn2i60iycsxk0reuqhv4txrtdwykxjc3lctfuv9f17rirhuhgcmt60qqh2ivo4zcc8rwu23eev6b5s8l14fp2chr35hqoifduoz3zxz0yq63oyrct5jcn7dx4hq9fzmx2e6wssdhvl7jv8ou5v03ftrerxwpgdc75ky',
                filename: '54z917p4gvmffkqx2cdcdrqu5pcejs6sh07utwfaftt1hc8933tvjvi8znhplzek5107lnfxtwjgqt0pi9378nxmv2pr4zyt11qblydmfm4nbkbo2lk81mizz84b8q38q36dswy6u7zwumo3k0i11o44z86te0quyfgiw00i8fb5vsteit5r27c2o3ikq3lq4896nos8ev3cafurl8kzkt4g2n1oniu2lr5bpud1tpx5hd6vqylk6i6hap6pu5t',
                url: 'gdem2l3fnvj2vh5xodsugh84722se6zx6ormunwuftwzdpvvdalem3627ewksmfvcocc5ojd9q03fo9aeiu6yckjqbq0tdj3y3w0q5r7wxgrid0vs9wwdefcsiooxeipdtrxyr4bneqwk14qzi7b0rbeeon61q86hzkwv8ugzk2315e21uv4eveqw49sqj6ouywr51pylotpuy8oxstlazukmnozfvtldz34gspu2o3jcnu4dcmun82lafciv3i9zozycl9no36xratswr43q1gfdwngr0hj4o2izvqs0ohgmmzuwcqqcu7v3uz0vhyvawf0fmo0qergth1jfq9y0z2zur4yh566qqdv5qnsrzw0jwtq7f826ummfeimupmcpkatji7zoux52w0ilj3mporbxw9bprtsr3kvicipz49uncfbsa44e5drffz2il4s41zrswv5bimv3la6geyypvyjyyarjgaiwyditq54x37mfgdq05q0nrpoenzfs3hnx5f2nhcxsda8xugyzv6ml26m7xpcsxtr7usnt1wg2ix84sxy6zlz4lcvcj6yjjfjmwft7ez9jwm7kdca9edskpio66u7rwwc8evu4clz1omf239k9n28kt9tqyuqw05k63k0eus3ltnjurrzqkktet0k7k33ep8si2dlseq71cc4926cohwlpigv2vxc6mickq1c3v9w47b9nitb16k2nb2qga2jmzumgbetmheoypmfhampnrglpwhodw12zncf9zs2c5itvaenxhhjzm5xy8jmvk31qr7s3xh68mkfk2ozrr83eo7s4sdar73z7n4o38vokp49mpux97r5qczmisiaa26je7hqrwolr65538tixa6aepejqc09w42w46pn4kpvrlg63cn8c9q5g51ab42joje5cphugbh8up111045cpub0v9i69j1f4hugyap5j28g8tejv899yxlb8b6hjlosvqp6w04b6n417my2dkgiwa4clgvj3ugerw9s43h',
                
                extension: '9g67yxicbxhtlrpniqeri3o0jb863daxdpapahtxjrfhqxrva5',
                size: 8742879987,
                width: 129323,
                height: 623859,
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
                id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9',
                name: 'jteyklyh6o5ojsbf67prz10phmp87jz6qquoktqgaj8dvig0s1snmn62p4u6zu5wkrt0qha67c2du7q04bc46jw3ihxp3aa4a4wpa9eypqvav6aug2cm29mig8t76uflw7bfjj54jkjiayeg7eznwfhqto6j8cxx66ta4j2132njrpvxqscon0re56luab5c3b9yusnzdvjet227akmm205ubvb9y4yjvjlgbia8xdpbhhlmvtz6mcqylsnr2y8',
                pathname: 'qk139aq1ffomlze9a1y9nxkdhwh292r0fnkw0w2ivzgmlqrjpn6pon2gxxeai0ngjn1km5k7urmqwqfqnvllh7uz9j4w9k4boadb8hu59qmwmcz0cr686fdvgxnqbdnhr1ej9avkqdqat45ic3fizc1doid95u1spnqlns7ydzn6n1rredds6gjig6zqk1vyi0l9hh0rtqmsfxnngrjvhmg3ihlwx51q1fy192co1x7suoz4t9oz7bu4npbgzz2va4mljs2m994e18qvzfluq2vq9mz88cixidwhnode407o63o3n3s9qowov1g1o4khtulv0o6dyv3mig96nlc70met19smuouyfdzp496bbgwsarex4y5zr3pgc9jjsfte1sd8jxb0nnl278vc4opvmmd31nfiy30zgbp16e4b6v8k399a7heewd206vpce5faw0w0wl16lsg86kuv58k2lzcjhblkzwhmc94k0kjrrzpay8iks4j1a74m50dvocljvm4klomtj3ma144l2mab8c1hgcbsq0sao0cu19quii2disbbr1xyugyzlfwyralsz0zv8ajkcg4n6k6o8kggn6ccjxzo8o2m03om9pbdbjm1inhr7gvy0nrhx0a9htmlnpam7e7loctuwkh6uxl5nvqxr6aog9y8e3g9624po7da8obpqyzdys14qsx8p2l9d8d4oxs2mchwn0n2yw4y94c14jzzmpnex2sojiglcq9w8ay41q9v9gcmep26dx56zu5m7mqe87yooqzhihp20e665hj1ugmla39t2bho1pb4nm0ylttinh9r8eu4o541xlarf0puvfx0fl28ll74rrsaeqzll4zt14lgo2mm71bwg0n4lewug752sr107g4bmzq5tqleiwysgnheizx18g75u6xtpwi2xuirawty5yfnjrg5s0mjcq2uspw5lzkyxf2zwzebb5oq1fib71avjga02cuqmc9za9b88nfmebcgcmhs7b5c0r5tov76hu1a',
                filename: '3yay393zhbz7c4h46zljmaa4iz9v2zsjwo7tja14cnvwmpsviv0e9fvzy7ndyyz9zalndngk95hkk4uodmdeub8s2ccku75h9pv25srd5vr2819fxyejqr7pvo14v07roo1emi1aroilaw947qo0bv0shy23bzbc6duusf098fsxk01v8js0h6ncnpbj60fz9dx8i255ebd41e0a6yjd8j5a9f9jbv88ekawn6r9m9gjegxi7a6gmemitvlk8w2',
                url: 'y0fh6i6y87l31bphiw3crqpwp94vsmlxo8sjh07f4ra4has5k7ymdc5a70m0bkznr78zdfk33f438jlwtjiut2jcs8raiy4olhr10hz8l1gy0gci5q97nlpl4m60hmj7zt3w927y6rc5wx73k0onzzwmkp0tpt718ymzhnse3zeo2vi6nmx3iy6wxitgc9rmr45n9p7l6b14ky2sjki8nf6vh23v1pqhnz4pwfh972hc9poo5wezse0s8921ji1wakp8v5ji9ox2cuurusamx1vus6v8qdhuo6e7rry5cxoemclmrl7pjqpld1vtf4egnk1w9btoin84m8d13bfxmafkedduhikash2zwy2yqou7t8a7m643rnajal91pdy9jlf6v0z7cc8l7hu1eohdw6y9acegk788e6dmrddwfm3ipvxfrbewqek3xqlu5f82g15hpghucjjr9wb10hzvfnwjsfny01qrrv74m7rqqdjvzuj4dgxfzotanzptx8wqg2pikvmtxghpw1eqr1t2occur7ok4cuijiv8xv4p4c8tw7yo105bdaz8wvy19ktpcsod2c7xh1m2fs2ylhpgs2syhgm2xvbdqd9wml2rfjm90n8j1feb5z0ijtbnwu1rn9hl4n69zraj6cgjrpb7r2j6vnwkncaxtib4j5l96bovih6zlyzevrf5sudnzy7ubtadnar3740i4o9pr9pm7ar5shug0w0yrcnizld22q2c6wdiupsmdhq8e5y96s6z6eca3xufi61lzm9edue4vh4uhwj9kexlz3mfqnk0yom9aooo68llroo1qo3rp0xux39ijglenmhyiv1uq0kkm6phus0bl214ehhh0i4sk1c0n13kgs29s1j1ly0mf8s6cu9qiygncs224tgpc1msqnn6tlre30rbuwnihosqqy12kwlx10irtwsyll5rup3571iqkhh5tlhqu4pds6eeijgyasu1pdm9uldmpyczxte3lt1ztc2m7ceneyemxnug',
                mime: '4mtzr5dvn4ar7pfj7tcawhh8na6dkdy573y2mx7pgm0rk0phic',
                extension: 'hbc11ooavbomw86oqilpkfr9kr5cgiqkabcbqz7mme0yeusnar',
                size: null,
                width: 267704,
                height: 776987,
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
                id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9',
                name: '6jb23ko5xxjixrn9f7z1157sdyeqb2ro7d0brevykib5djmoo3pafwxyt6d4nrd8iegwxdagjp2nax37ts384zj7x11olfde77yj663ueviypmyjp66hrzf5rpjwo82x7anp72wcdlrzrnu183ellg6amsfi3e64lrd05l1o42yel4mkt60qtdvggvr54ldzp8qztj2yn0u1fvflxtao6dbwb8kche5xwfwvh2755xexqhbn5x2urp2rljuydzi',
                pathname: 'to4bsrcpnllruke0700ylpyhv9kwjivpdurnm8y0kcfuhi6n01e8y2s3ogm5d60qfjy80w7pi8jwb9687a6vojp6pg60y7ywzqwg8a3zi1hze3eda6eeanneb0z7wcxhz1vyjha598c9irbchcj1v16lrl3cpjm7kj4q5ry5uqlnplhvmlne7ei8nkikg938ld3du32uv1brdh7l0en8krvolwjd8p56h8rm2qczh1t1q6g6ob5fz6c56dcnwumtj0lsjscmmwph6istrbjt4snc3pimz5cz9qislhixmuwwhlyyan9qzuvow2fts38kmrur2d8r9ha093s6l7vjo12r7tkz6vkaq7qz8ev97735jygzxs3c0xx7qbw6p04giphy21t8ubrj137fnzak6badujm81in15jbhdno481c19du33adbt78mv7w8i2ok5qzx920ea4ho5d7q3mhaiwkxs1o0kyiyyynhzxabzc2pgv5vv8i9446oqbzqbg8zu5qtieftl11tn7wyja32hy9030uyik1i470nz8wmd5n1jd9rsm8rxg8ktqfvr89y81dyfrrc12ha3mr6ki4uwzvie8r1lxf1zrpf47vsbrzc1j0nwn9cjww4c3dhxudytuthuaskw1qbh3urbfyutm3odug29v6vu7nx7c60gocdf71znr1p8t5h38r0u1xt1diktwz5gzgd6rzi2yryywu490k03k10gnhsr8argenh6e258oueh5a1eaggtz03sxfeepe0srh9cw7lb7wujqfyo1tcgdqks8kxmhge19dmh1t3r9b92aj4noibjeq7f9ainyfdw3j8z969o4ka0054h9sqouee8pxvu3asphtm2uulip5torei53jcsu7x1nor3nfmofvfxsrozrc4bqgitjb3dbartu88ln8txdskdw2tzqt4qfrzmm49bdwsth2ef9jd0qqg9q9mkfmq5n1eeaq136tq0sw57zqok57nslvear8t5l3cy8lksvfa',
                filename: 'x0cg95bp0hyulkl87j0uc2g15dmp4qzqbzxi0xpnt9dst8ntctii0o86688ci7gbfbgpn5rb8jzs5amhwob7oe5vfh7muayfb590mvkrbd4jp1ohiuyqvgwvudari6e0q9n0ua85wne3djhikc8o63nvqm2pkgkvdmzp3r92t9pwadmategf1y95gkz4rnt8w97kse6ldxyoxwevy9p7yuh0k2p7gzj9ofbe2xs1dw5r6qn9j2lzh4fom9zwekr',
                url: 'ao2b1iood6mybhsgoqh3015lzi2o9l2tdcib4ccd7zg45hndeao9pr5kjistbjua7a09nwupzuh5y3ah9gyqpo10b8yzqy0f43od6ms60xc4j6e3az7re3sbyrhj1u80qnsb9oip1ck8qgl7xrwddnbpbfj3sd6dvg2gzwcfndeaf28awbaotulpuzyakce0mf542ip3hfdybk2r6uiiacrpjjnb2b7809lto3qk55ez7i4ov3apeup1w0zp1dyoy9bg3fylxjr8jkyvq1ul4g0fa6npn3wf3ejsb5q40t5p4mezvdwmwl0yc39dud6k9auzy7339qp3ltvbzks3zg291mbnl3rsp0o6mt1chblg30ms82qa1bog0p0n8da5pt2xkyvnhcte8nj74g0k6rok18uc5mpe0jsjzic5w1nxfae61s94tx60gvdzebj3hydj2ung94xsdswrbwwe7fdyxczuucheqjfb9n6gu50dp37mr061w6uk8spp0le5tncyyxqogda5f123e6wbl30xon3aw0vexksvg7onoyavm0pysourroix1n7stkfnrwojdnl0wgyzrcv23geau7pt2rl7szurk51066y4ub9pq1etey28qmktgjpik95fksw3olkfrwh55cc3xp39vm414kra6eqq9r8wefgwnxhllmzlcs7ivoi0bocwx0rwdji12dovz9wwxkygklosea10l5jk8eeg76blxblw40gi4qink89gl4extd1sf087iv4pz72yvaub7lt4zchmg6phl4rvujdwh38ihltsrqnmpb9n0lntrb65kbkg7j5kuy4zqntz0z4qo6jhnp9mp4z2n7rtdsoo1jeyp9m7xi4wrw5ubylqjmcaoa5v2jxofz7qx1rveky2h1188ywa2xsfwu8ekjhcu46sidsg3gq1k9v88vdpt2qtxpmlqle7hm2l7e1iwt3r5qw6nhiapyjmd6nq72zcagmhrwbe50rqrjdivhmbmfz51za75lr6',
                mime: 'pj2v7ol77ljvim2ugdm4mafau4osfbkuhjtx40wdcykm286nil',
                extension: 'sejfdjhtezwq4k6wd1r4jobbzyok2mujhpaqjbkcj8dvv193vk',
                
                width: 665309,
                height: 870300,
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
                id: 'z52erbaqx454fq5le4aj2wh1gy4liri3fmpsq',
                name: 'o8ji7mpb1h83xg1svlzifz9vf0bb1erw7f4fro2jdxf60on35j02mt8mu68kx9r5hdl2h51jz32n4l4hiogcrx10zq8ne5iayqyuzwzopbk7q1zozcl8piun6bqcv51dov9bqimej87uvcqwmb80hg5k11la9zqdpwmmjurjcjz6z8o29wvykxf5awbgh7hjun2h973s85a8rb6wqvyfg7b5oodeorssdg2la22a13ei6mzpuz7nldjm4pt75jl',
                pathname: 'uaxono52ocu5ueteuzqcfx54s9shw26text6xbh18or6j1isv5uqu1d4pin6d6vjvfuxu73ilaho735veu5dupc6rwgxm4nw8k12n51kp5kdobj6ve1xzhotjlemyfnzzi2hg2rjjal1vjoaiibxz8u9svir77msz87ba49y0ooxv18zmrdbi6hpw9yhs1m41n97ay13day4lvtz8i63g73vp1ftvoi3p1hmx4cgkaeb2d4txbhp2kohim0mtsctvtcj8wab27jji6nn6hadqwf4gdkblmlervu4erm00lpnvyjhfc4u2y3c0xcyoq4e4h8ppsz4now46z52qg80dizd3ryiwqxonvf5ljic9oemf1u9dx9kts4z5wk6eb3iuvat1znne6d78v8nml0ytn6i1q42r2zwfqbqh5ro49gjti361tltjoo8h3trmws8t0vi8m7dctw87y8jwp9wzw5bcj2u95vrrtd7ad77bc73we8y4zavy1x83pqvpnoqj5c70r620bsqyzyiztkkmviwlnrf9as1lezi8hqk5jgh236qs9ywrqhtzm0y6z1jwc4avpm7tnaa85fcxmu31h0bcyfkciargqf3n4uec9eqnabsra5gf4ha3ht5hbow5ix26ei1lkz46nh88kqpl7z3iodbybqi4j6xx4fsoh10tjwwpt9bkncsxu6d6ikg1wcd57a02bka9q1t701vc6ssbjzlzmew6r0mjtg8367z2ttq5wvw4drozbkgngeu30k01qbadt1qz28hs4v4qeqd8vjckowtjrundh9oe1y9tkd8ivtg8uz7ipcdjnehxyn68mut5d24ooadcsaa2zbhaoev6gv6j8n8x55eims97ktln5uoo2w8c10dgvpa49z30kfuoecitmcesxxgr385lew9krnkg9xswkm0h9s0xvgt2u60gq9lz1v6laok4m6rb3urrntd3sikc69d7j5421rg773ksyc8y4q9ljx8szj8qveq71xf3xc6uf57',
                filename: 'vlzc8z40cdhod9kd6jsc6ml3esk35ov5mwq3w8nxcgyfztb6ho2ksirx5gmzrh7hk5rq1pndra9qo9hdm8ainz53d4kiuivkp5rm25q627z296rou4ob7nkdqt2zzgbxxyjcc53wpjxgzms6jakd5v6gkktw24r5bt17l4sud19du485yel2gfkzv2szmlg172j88xxa9eqjiywuo6w2llnjkjlijxcn0tan86toh4th6v7w8drsali0d9qsb9n',
                url: '3xcvqkh5er7174posqdtj3jkjitceq7rt9n3a3w49eluww5adysnxxr7kvac12epuikxbwdpyv8ebzuv4n69i1noukglzbit5h0n1d793gz20d181oeosb1gw552punz5zfqvxtbarkb6hytpyacytltmdt8c88swy7jg3ithhq8jrd5ms3zp5nno7gmql4txy488cecljynwba12g5w34h95bjg1lnpzfi9vgxy6bn1ir99etu5khdufp09owmau41owjk9774h698on56rkq6c8piue4ipsy9dtnxlg6t66lw1pdyibsoyi9zxscpp6n7jexbpa6cktr7iycpdw3jasnemwzidu1doszfqhl4hlqftgwfwick3posnfstlojmdhq3t2ndenjxbtsutdh8u46fpaa11fdgmq1phkl5bvat8tmbucectaitgtu77v4xb84r29g0bvze28nfbj8c5rn00ariiwtx74rexgeywvqy7t6fryc4grdqfnxsnxxoyjnu4lexxjayz9gsl0x8pngqdghqp5goy397zxjb5wk3x4pl7pyhcys34edd75pxkuxo92qx5typ0oyjlpqas6cg2nzqpzer9nmnz7copgaiywtnikz34aji9a8rgf04pauvrw3jn6215vgv97lyv62crtg9vaoygamqb2ra6qyy94gu9ejigo83hl5cxs1je0gs5zhbh63q854mtvasg0vv3n1cz2fnr21zs1d52oha77voauzlwiaop3im77ko05m1sw5frziimv2vixmpfv2ih6c50vc8h5y67aoh6dsqvwrvkifr5pnm3k9snzek89ee2g7lmh9fcp501dvsgla2sk8397xnhe1xfjih802jxwowoiyg3ymnhj7owfdgrsuqbwh1igflv3f8d4pqkp8jnwjk6tr6m58ye2jxu4fp91dpw6hallytm653iwtj96ds3fh49jhx3wyizw33orabr17xi5cr9bg7u5uouqevrg2qyscdne2ouu1xl',
                mime: 'g5jaor2sligel2ziqe4ekvfogom33skmc2z6elqu3njukp1kix',
                extension: 'ofkbjdlygccaadri0up5n78gl0roolppxd7tb94j51nxklxaay',
                size: 4860453102,
                width: 248756,
                height: 196815,
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
                id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9',
                name: 'far2ydsxdyjrbhcebmc0wcp9htwzx8psbnk0a67csuomcya3djfkkybs6gl46q85pvgqno3qu12i8viznmpy13pbd0twmdfai9w5v1ai0h74i2ykkgxfh0lku8fd30qoo74xkk05bs98krfqjc5s2zfs3cwe1yza42n9e2j2r7byd03edmjnwnbvysdiiv5qv3tujckrwoa67zlorxlvo1efsem51ad31snx665uxtdnvaxqs97muf9jflxf0uhn',
                pathname: 'o67t5wtlrucgirxyje6ywoommw6dvivlvhg579j1sos7eofmjm2ejwdt9rt817e48dvwil3zybe875uqgqmwb9um0k5212stb3qlytd75xtzaurbi4lu4gml8bghbltjjf431h568qnb2l01cfr3auvrnp3o1k10j746n4lps5962jkoite9zy9s4fv4jy69wr6g4b7dzs6fi9ppudh7weufxbc2mz9au6lq1nck2nv8k66u5xennzqqik4bkqt4hislx2tj0bdl2tv0xih3vr28c3vnutnrb2v3vp8p4f6r2jrr5lj2r3swax2gwx4hag5h9tc3memlyhv6dq4lod0i3x50wtlcljv02j7k3pktuopgd0sbycd51reek53iwowso8drqjlas4g0orccsma8zmai87gkuon2vk2foeuvmz2cen9qiww9uvf5j8dbp5cxiouauft6n84w1doarlstthtrk5hxwhur1y22gf9p8f0dd9fnlafrt8g8cqgxrpy766hmjck88hw8bi9zjxpyzsixwhwthh2a23w52paogvjzcgvmpjs6gicuj29mluvlg8b8szrc2hhavt7izasg8s39t2zvxxe6i3pvdk5asi88h2crkbfxot7unrhxz6ocehy4gr8dp0y7vipbz3bvo3kd0chmwdj6p3hkdc6t8q488y8cepl9kja0us8ngz0b7yq3mp3api0wfukt8ewfs0fpa94wuq13rtjb7ap50884mkdx58spw6eqrfwu0w7qqvgdl95s3ttv0kxj5aywcga2myiqylb30oh5i0lg9mm3n8wp3ynbf90pw6mrh6s3ml5np5rgtkkvfawlxcrprpzorybx2ohnr39hos3bkevtfyitkmmg2uk64bk3c6slclf9535s0cfgl6mk3d8qbrdyumd7kjxn4p4lre83rinfs7yrrfhrvwkyrt3ti36wk0yqtk7ziuch3fty5kmd9baefxbxdw1umngdhcp0f513s67yz93lvqms93hx',
                filename: '48ttyr6xgejd0bwxjnpruhe3mhucdsgmc8bee9z5isumgevxnjzkc9cnwwta48wqqclqzi3dd4qmoe1778ph7htqpue7a8qwl5kdvz5zmhfyee0hfbkgrotzj7eweculve73dkm8fw31dbc9ajrkssrz7x6q55qlps9mv17bw3gm7olefaaamvxhyfq5qteza3brampzekm3ec4slirpgoctzcuq5dmeyzbp40ghpw5fgxc1koduirwl1b7aj17',
                url: '6c2hersc5k5g37h8jmpl1oe163vqayymd4uecjn2p7p2okjxbcaojjv43h0rh39xc2608o2yex4hhvnxld5ovddauemq5rzd8el0b87z8ifc9ztb8g2s8c3ej622uzu9i2ufdzwttnxqu7h509bk11fe33ugxohx0vqs6tde9hyiryv22vfviy0vqfdylgday9opgql1soniy9o0y3pnmi4dpwfd8k7yxkv431z1z2a7a3dfw1tmg3pqbes58t3ec0zo4w32t1k5ttbljvzb58rs41ga92lkz1r9h2bu3urha3x9b40ygk1yi8eheq7cfxbw061ikz2g4pk74yrulclkojvxq2sc1pv5p4hgte3a307rnu8yall64a4pjjm7kue5w93tj9c4wcbyfcz0th7m4tfknr9jnnab7fp90605xti0hxxep7k4gg1tvxd6gnfeatdwlp68au5hgsgls2cowm3t5obiq0jjq07ywvlhwd2hd6vxx223znvyty5o2l1wgk9prk3vy93tpm0bu5r7yzqimis5u24jq3ajcwtmvzuseuw82ge4b34k7lm37pjxojsyqf8rzdy0ygq971ag86il5enskbgl4kw6yc87nkkl4iq1e6hw9064k58b8za7xrns1vl8ljtawko6omi96z68v8r8gl44wlwfm4alusz4e4iyuworfks6hp35zmzod2wgokgzpi82c8g55bjli4cr2bw5kmm0bcg01dvnyrgtc5x07anyu4zwq6tcm1v9nwpsclfdvoir9kgxr47r48w8dzljq294m97b30u6zvj6ok1v9z3dbqbjzawa2u66qufd86wbggpb0bfwnwheiqfoflqn6v9j1qp15kh1pp05bd9879zldoxlr87hi1qr7jylk4yfcnducb43g6o0xd6ao103dnkk2igaujg6198rkb368f0arsaih0ada77bkpc5yi9xummq8w57oyni56ul9xgzw8i5ds12vcgrr92j41sh3qsmidsiebib',
                mime: 'p3l7j5ydz9qzw3qz0x8f9syd472z5umk9actvoxqkelwsm60dp',
                extension: 'ani7ft7s28foxmv81yrx38kiy4dzherotfklp7sb0yzy521c50',
                size: 1094232592,
                width: 730458,
                height: 813090,
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
                id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9',
                name: 'i8kk9oosk697888ajdlkx3kld6xbqobkv66ycasar4kacbhced4rrxkx800bgbtt28ilvy1rlozcv4w5yghya792zqdkc021l3mgbvgesen6xl8ldi1syk3u8w2rx7lm56phrjloal4it1sj2xham8l2etydzvp6udk2mw9cz4995pzt4p8ito2g0184koncx9t0txcbiu074wz5obd3fy58nhihi1n32ej0fvue05cdyyuz1lb9vmejbb8tcom',
                pathname: 'l9zx3d9s7i5ebkeo33ccw9t0e2wp9hjfcsbckznwf8lv2000ikz4nb1jewfrvwcm7njfot8934n9m3vy2okkpxxnyxwtv9r25gnz4k2hkjep4fvta0kaxkbpd2va2kmgvctf3nw0qhlyr59iq0am2kg9j9flpsxd3o3qrepy82ntgd4hn3tx2661if86xfv44glwnp2m8yqk4s11rowuhr1h27m25z5yd40s1geetzc00t9vtdp0n5h5l7auccveypa2percx96u71pj9c4saji18zlyrarhocczotcc5sijmnb58ex96be5233pfnyq4llnaekba2b4hcu5bq6fd35exggmt8iz09c90bq688zwbk032c56rk6gr11dvcd0a9o0zomk34i1p8cx7lu8sm2rnxbndb3z7wmsd6coiretglglhslf6hsnv32pvyio9ovawo4q88n9s4zse79jfii4svle19b14keldkn3dyl5dixfwhapt03n0cwiriz3wu332qvob4ra4bgqxtfnik6z01i1x69jbfmg68w4vyg377syta0vz784zmrtmzt21yjgioro51ta41ceovr9nj8oga4p90cvhu9hbkthac55wwy71482idl2wf75serg9u2hst57aol73xjyrhxqiagxorl5h1z0bvoycrlxu4jrkuyi3oyd9ce0x86pj3v33gxp7vws2ulq3w7t3h1ygdwis8otyfe8uvkziagdo3eox0slpjxlhcgdbccja53sguj0gt67o17xqty0ys3ghdr1nkb4gsviv1t1hjvf0tqm9r3b1n12ahyb43xw53r7vdq3yybe2u199qvdxcwwe3mjv9khjwi32nz7o9e7livez85hedb4yirs4ljc9fdpukbxohu823gil3hhwh5zojb9joyz6k3fe9u5erhqrp4hyb3li60rmf7igduyblhsfdrhgpsklqxr80xzb7wimm9wqq73rg3o0qf2eyqvlcksqhb3tqi34h2yy1dkt2ms3',
                filename: 'm1x582cw5w07f5j79p7onpmiauo64p4nubqc5o8fyo9jwutrn33fiv4czo93grp3eu0gq0e2k5pk5x4t1zx8ldn8k6cbuvyo3vkgdrkfsje55ljvlpvp87m4jarkc3k4ysnt09xqt2nydqqp1by8mjtfxt3a19bh66vq0o5lqvurxp04vmz5n0cfm9c4k8cglexfgf8sxofzli8qkmd58y0vi0zkdtbdse4vwiyadh0cy7dlagb1u9kfy6ff4zi',
                url: 'msk4jnieqnmydgw3synr0zgq5u051crhibpz7f50ix5lmvwb4mljzgnfx99t1wedo4bu7ds6r9tbo5q7wy65c3cfbd059j727r9tqonzubjkrex1qpf23akq7up53toe2katx3446bop2kjouzoazc42nayh2wmqi0bnzbfds7lwuh6hh0c9ncr4frw4igg304ahehzzmbp44z9q46w9v84ywcum54sv9m36z0oauir7pzudyvvqu5p41wj2nj4sjuaawrti6nsmypwk9uupe48lxoxl432mi9o1gem59j7jqpks4rh4uzs01br9lqhyhdc6o4yge90eqgqbrnfwqbrom8j6ndwo4ac0n88h0t0hwovd6k6tyaj1hji26qpbed7svg0cl4uqwe87yxyo6z19wkdm6lxju3x3q7pqox8qreu461s8mtxuwad3s0stk3rlzjcb7yejrnnfuzbnontp835nif6mzxemfkfhs1qidh0vip4gs2sg9jtn7f1j21iyz2nl3hpu66g1rf73snzkebqnfwcmwrgy7cu1sl46zhxhf1me7u4y9lao4ncmut645rd30jcxbechutu0d880psy4zo1xeuk462ky9rdkuu6q5ls508yxtsp31lfag3715vd6fwv23ux5ovvtqp8ogoj5y9ukgrg4d1c9lg1e2cd28xyb4fj557zn23xx7hlnyvnrhoom5a3hl6g9cozuxjlcgm1xaggevr661rc1iyk6r2gonlctlhzz3kcye8rdj5zrh2239zickwmciz14h1juwptqygefuh5kshoutiti8gai7lmdwar6y79fq22jvgbq1aztsjpqh9q6qnuamb5f8nl1977rli5e2owevnic2ic49pegu7o2i8c4xpadtxmbjwaa312fwn5inxp7v2igzv00w3a239u9nmk4tfvp9hein6hmppo4fg2don5za44fyo4eyevrpqm1evwwsesdlrnurigfb6eqll079zbuorbrut6pftjrx47a',
                mime: 'ixa3srwrjm6x1eyteto84fnqqhlh5352pu30cielem93vurgmh',
                extension: '7aome0wxs40ucki58to66t3tlm3bvqunt01q7jk425w6l8e0y9',
                size: 3164737152,
                width: 140234,
                height: 820418,
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
                id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9',
                name: 'kffsh27sl8akwmht4rq1q7vj5cegbfrd3lzznk7r1e940zd5ia9efj1knio3pfd5rrbz2ke6c5lnxgiuss0lmghagpnsdkty6fal7e184e6oalowj3t7augrz7wvwsjixc9y36c4ox5o711afn7u6rw51hatcv946dx23tjy392s1zqp1hm5koa28sdcnswp9opljvy78a53ervhjtqlb2x6or0t1qp8p3ud7t00n0rst2snvn7rgeo4jq16v2s',
                pathname: 'mi41rgz5ltcmdzyv3cax51em47r68b42oxcs8dnc8n8amei170ue096z8ai9s3px9s92cp06v88w46no0g0xq7ykmrqbz7bt0h675yzef9q3kdrn9q4d4weu7489vx9m7gtn4g0qckrc0zs4h67pcqjch6nzevieioyzcxn7n49jz2alq9vz3mpr458y14j3cfgaw69zx85noffe4xfepob71y192li1f4uegwmtmmzf3kr4mlnewhw9jyfsmh7gmfmejx4cj20bd8v8m8gajb9t4t306cns0hbgwupbro5bqgft768g4drsy7pm6nojv22fukg6whinhm06lcweuivr8as3nowdrm2vdt11p91z9j1ah2sz2wn0t0ib9sp8xffp6vyllzdd52kqj8dr1j8edxr7cthjkl91y34bh0nb3ap1fbh2pcditehhb61f0m96gx12oo65baqff163ug1gs0eu3f0cp7ozsqerofnr70enq4enhmcvvzfz9msxkqw79foskxpg5a2k168urujeb4uzu784tyb9fux3auh53xgt5pfpci7fiiqrhmdde5dy59zae00fuisu5apc62xvyvne6m078q99dhjclw8cl3bpn2ojeblb5b35prwcwrwrnz52cwtg4vr9orgf9w01o6zk2x78u97m1kjz83uixp0dz92jlp5iai8izlc44uym05hknjiyzbqz6o704es495xrec0khpwxk7xclwl1w5fap7yrvawlwbn59yjyfo3uiumonzqyy6smnx3ahxfu4446b5yoctslg92lglatc8kzd8g0sf4rvcjsdx7vwxm48trtnjbyspxmlt5pjyosftomqgvtbnek0ov1hip78vz5uryiccmps7nnz3aixd4rl3jynl1b3c3qt2qlei1cq1saq2g8zl5vo5krsmnzjgffil3symawhws9pwzzuw2ghqg9kenycfp3no4wtme80m1tvcy2djga5iewk4xqyfx98wgxywnuv6wq5hy5',
                filename: 's2vft39cr2nv43tghf2wb1vnkvm1yz4oeoukm0tcpitojvicvcg0ysrufcwx0u4we7zq5pntigohrf0bitq2d9zo3npcd8ykierm4kk7w9ba7ygyelug41988ttaewbvefos8jyy2lv1pbb21p40rsd6wrgcm06gbe01obuang0rz9l9mv2dlfa7aqvu1sjfl110esno59agnkq8frlx8s3gje4tqlcyxyn9axa79j3si3shnacn9x8e1rpx3hz9',
                url: '7x39q1x8zb2i9d9hm9akdjc5flvfwaq2jijvgsoq2zmmikcxgphi12foczss2m19z51ocshbcp7zroxzhwd3np0t1pe1mle4xko8602jvcgox1m643x7z57frqlt0qmt6vu3ijhx1knkxvhqbeuo09wmyygs04m1ewg9ns71eqwfiu0ka202vue9k9zjp5izi6g9pink4081zenhjodutgvdveqm8jmdftkuwj2qit7f325rgqepnbnybo9ssqcj22aghfe8eoj6a0zr5upm404366ncsyjr1c68w5qlhv8vq10vrhvzbq0dsq1lhw8uxmlepr31e8dtlweepv2276igv78lcpvtc3d8g04pq18rei7tp51rd6z5quxbkk4fotatqgernknsjln18li3oheliu72opkf1im3czhaf959gcxcredxqyrip18ufd1j1w1ok72tiwgiku8lab6pbez7h6l9b4qtgrq2qv671s444ukzsk40nkk60v39rtp2xelfxs3e45fe6vka4k2s6ninhpi8ygc3p5udowfg3zvzvjscslwe8en1tucmnj1ddn67fagcgo7112eyjg15yfp2typ6ucebyvwyk6ewycfpqcfqgk7g4ea0ga48rccyi6729vdo6yo6bmx4y88beziskq63bix2daqkm3c24kno0mxuns8eehr9700mu2tmdgyee6yfhr0gn0jygeynq5qackd8hp3n4jla8l1g54ts5jzl798n6h7b0moqr38xvngh0elcvlu9ravkcj7lljzpm5ulzgih10l3u91c1cyz40kvdseula1w0znjarqqng68rfenz2bu80t3779yv4bo7xabzfjyfgrqq91ig935ho9gxo0f5yhf14ayycsyg17watjuvt41d44uzd3r0z37v8p8wp2icwk0b0u93iwp4l671h2hlpi9i5i7ymmeqg4zkjyykhggf2v23jthb5oxellplbu045mvcjxu8t7n0w6hjtq3e61icu8kxk7h',
                mime: 'fb2ph4bdwustl98wt6gzf5qs8zc2cvloq8edvn7rp6tn20hkl0',
                extension: 'xx79r9g1rsqpc9cg0ly0o9l1po3nyyutde72ie8hcqxitwe1qf',
                size: 2450087951,
                width: 278503,
                height: 492006,
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
                id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9',
                name: '8ztm0auoz54apsks0wa086o2zw7u7teclfmdakpzfcqoezj0vu4dxwg09lz669bl5wd0bdqtgmnbx2qg9u7s3i9qxhr1m9upx0p8ktcda2qw3pmbvgiuhvjhld21dax8axdkoeph7v0a5erjix78yndv7gfah662uxerqbeg4uuxr7pj0sgxksh9b8kntkxr34pz13lpw7s9ej62csbjkhvwmiop3xafupstk7qhrrjakugjko6babbtzwlgego',
                pathname: '1rpbhdhdtyfcm7c0n4bzhld1wfeb1kmsmteoxdi0wu67vvaowvf0inkyazbjhibqjbpfb59ujgztjk8bmupawoc53e64vvv8oy7bm9msfrk6j9o8inbea9x8wygbth1qf5linw4145ukdfm29uv0ywpnly3nj9owbpxx6l2lgxtejyvxipueev0jkhe8itshg7cy2qg9uwm9uaz75l4o2hc9xuwrot1pej0mqdrzw13n9kxtleb14ffpu7nz9x74p2zfsxb6gefmtp4f72px2g3rxk09ityn5761j54flvwdxmqpged4tzjn6iyfivfjb9ek0qrt9zhhxuiigi8vffa5exo2cr76xu9z8djp8flpuo5wcydw5qztzizzcrf67jmjd1qiuciv6b3cvew02qpbije1q168axkrwpxuh6i6s3hfa7l9ahld4wpeupkwc75w8f8axcmg26ahiu5fvdatgakyvjqywtinkchkiqck57hs9bg60ugm82flis6y8ah44521rrh9slosn5w3iq0qvf8m9xgqsnn44fjnzzmsbqzwhqfvnaisjlgrtm4io3w4m6hq0rdqi0pwnim4hkktamu3xtcizpb8yadbjdayxa777g6abmhpatn756ft7byr2iqhrh4ouqanepve5b6g9xs086ln80fi011l9wymu0b4e5plxwuzwhe2284wqr8lgxumlhf005hi1b91v5jpzk66u0me4zfxvewub6j2xhmii8nnnl5r0074fzw7j9wtgahbmkw2yb51b9iie3c76orha2mv07249s153m8fd6betx3f1tgaxfix3heeom2cdgr3a62x1ix0wl9sthmxmonnzpm8ewj2whgvf3o0tqgnp2myufti3x7qyf6v3we0k6x50k5u7ynshue3jh4xjw5yr23xm5swhi0zf5qee01u9ssdo9e6z58q7neyav0h7vgt4b5ty4bq48r4b93zgqmktxe62sb9hv6x8u9icgf09xyftmm0llvweed5',
                filename: 'hwpoqi8rwg88v1vy2r1wkikmtjoqiyp6kl30kdqcl877n5usv0dwxqlv36o7rz0yigc6z40pg7wjeoqkal6wn4p4s880y12m0bxw3m7evo39y0swtmeoil7z7u338v4yax60g2h3415h2vkqa2gfm3u40aq0tphwvcx2dg5ev2sjkvxkjnfbyhcj1ikyv0iiux7mr7y41kqfrzzlz42jr429ck6u4ssmm1fz0ectt4y7uz9wcbupyjde2e2dvg7',
                url: '2fa3vuh0h02ricjgd49k3g2xech7rqd0hy3qsuzh2abcukth00ckfpruuofkne5o6jpop5cjga494793fm5qqu5729p93uegbma0hcdxd4o1b0lgau8hoju2uka7fyxfmmc5nsdtxun69u5kto5pgwpglmuxfpaugsap22l9ihej4rzq72t1qyow1i12s2lfvo829ogkyzdyy25cklz2j4cw4uj36wpg2bprwxwyka53dcxjda49rsty0b0675dl0buzdciuxjtuxrnv55kenrd17jph3ypxuzt20wjkq9rw9srux55vz2jxvi0eftgxdeasgtxkv2cmbjdchj3cwbgaqmplb0jgoembykjn9scmurfviguiyqohd3xatru8e0f1w1ipev3ze1tipa5cjlz82qzbvd1s8sz580emzb3d95cplfa9mbzwicjc9bky6vgh2az2rv9e2dxvyoolx9ecj5lvs8k39vrcwn898ubu1ca86eedkslnqluv3xxxtvr8kfcnaexesuharopeenzgzgiik6477wn4kaci9hxeqeowbjgsg44zve5yvlizoezmqba4ima9mw9na2brsnexu1bajgn8mk2fkedjm6tdugnx61qr1bb3fj526n2azijp1d5d0fasmht3ihtcs3beugtgncmc5w2eja6dba152xjvo97j4skkgs8151c9d99c9k98346e9dpwpbzmduozgkyuk9yqafwv8wnuic3rbubj5n38oodu58xmujmwtlpu6m9v7jwqugdazbp31320emh0gjwzn45bf4anuhj56x90hqhod2jfw9o9f79kexr8uibsj4o6zjsddf4y2yujn4orvjbnsqzhdz39uduan2qupfvp93y46okg3n6hbm1figgmjavc7020yhk1kb1n4a6fi0fhbkex4w6mq5c37oe7xj4edr9w43dkcwkz5gu9253yshdk9mxoniqvlopiohpacf8tbzsh8zqnpbwx8tlpbwu3849zso7488vt2',
                mime: '6n8s9pp6v725yk68brnhdb8lcu2o8rwcbgoijid73sglq9mora',
                extension: 'b2o9a2b8m651llmdyeiy79ynpdslo3dx0iudsc02zu8ssy9w8x',
                size: 8782810867,
                width: 989964,
                height: 464827,
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
                id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9',
                name: '52fq5kinhqls8m79w0mok3i57skdep00zqr77l835bl0x5vk0fw6k2t59klv61limx5a6gv9i2mpx9orjvpfl3ztb852d6rb941lx53qx2i93bmj230ar9ss7eu4xsi3k3z4qg5ghbuul03cq25yfufrnmv9ygvtu8u58ttzf9pvr6yqq0zuv6alwk1u6vez2abrt4bijhwpk7h5quaov13tjr8lyv3zn0i6p46pw24h2wys3f537jv0z5ei112',
                pathname: 'cyo9k7mxzdjmyw5wn1l801ghsqsqy92ql6cqg88784k6d9412eebqqhnbjn6r1byjy4muw64xdmsvspyxgr3e8aw4szo16iybuhi5b08wu7zemwxj5adk7ekunonrr68lwww6jmhdmu3xg085ran7ux73qrjxh6gk8duslssn8wk5bus5fzy57rkvuc5olo22u59utj267ry351jy41wli7k9g5oneswie0r1ujj8nf1ejk87jgo35cpwcpx12p2ntaaa9u30hun1bmie0vrgac897ui8dlpgeadydhd6hwfbcbm0y80hjqe2619zsfz4yjrra06shdezmmt8ols8z8c7hfj0qy84n4mv99jd6fqdhgp62adbtht69emsu4jwng8auxlse3iyio8otgh78b5grh45e54on564e0gym702m6wlzte4otghjzlxow8j5l5tqhlqazahxeuoldyp4n0vjujz8z3aipg8kr9krhkgbk30qsfr012idpg2xg5e9h4flz619t783v1lp6pthuvk8mppkmvbrfh8p6riny9qrpj6yxxuype7bhaiikgkdgx6tv6cjn0oredbeggk4dlmlq6b3tq018fhcdkc4gmtdp84fp92eqd5at562qu3jbn0mvsh0lfjap078ulzxx8vl9x274knakuzcco0ibntmafeyoa7yp18ejltjxekuer7jjw546ypi04ot14xnfguo5cz7t7dhxlc31qmv9h1lb9m7j35g9fozoxs5e8xfpfcqvzgo4tjrwu081dsvqxjikljm6h21gdncz57cbpbd8brnhb6b15se8cua6yd72f227btvqrkmie0mtrs9izgaz7n1ojakrjj9hdt9vxuybpgg4pfcjcz6ac3yovob1xvl8zqr1hupl0od4a503cposrcwo7navbslbv63vsdyp99ps0jr0njwxh8n7vnbj9jh9ieo7iyt25mvb7qwjxnht1vhlfu5cb0vjzhqu4gtvuy91h5xwpxcydftct',
                filename: 'z4nkl7r0j6ynd1elge88pph4tshfc08f7an0xw3u6ya8a5zb38r4mn4f2oaqenjzzqjp9h4of3a9l2e8r28krro9dlnyqknw41d3zalb9kmxx5fdnb10y89z45ps9utti34frqai6lh4bjtv1b6njh51n4zcv9mwals1t2sg5pu5mlqtamw9wdmkjgvwppnvjv14c56sd991a60oq2eq9vlcb877tha20i34d0ng43h093ody0nbfjkok2ofig5',
                url: 'vrsvuiub1fpw78htmt5ndepdk5mk7x0bfl9ny13lzm3u88eknzxfjaydhqpxgjfbdwdmju5etsrqnm5ft3eitgu54pu6e5por9kk1ht4osvcil50m3yied5ef28mh2vpx053ihhbajny3blhnv1x1tm4ffg7qw0uw6ztlq7dpelo77vy7iu017lxczi6ottldsjvhhy6x2umifnzhtfitsedlkocfbtg3jlpuexccz8kzvyaycxdfaz4ph5d5hjj7jhzahs0q4zfupm4qp2xph4lp4uh6114x4a4qtjrlx20ql88z3h6tqby31jnjm2d8v2zzlzt47ad9lotg02sc4043xckaataqsbrkscpjvzava83o1t32hiuqdvvz198z6r6r1bjb4r7y8h0uisl0vmft9oi2x28dxvog1151bjyibd5s382l3brw11xnofvevpgi8dbjkts1sx0shiabj0kiomilx7hlelqr7xtao1u1gkw1k9unaf3iqsdx3x2v8fybazgj20vj4usfxuyvje3y0udml9wiqdrq3kpq9dnwupwws44fvta3n9q3f9nvywl46es1uozeu5y3ihh1qdl0clr5prsbroph0d3pbt7snls9ej2djdh1ouy9wjyzjxqer9vlzxlag1tkm6y23i8si5p5o7jf2rjuyk2n8eryeisd1m5ekeadoiydfkcefkg7avs2ctq500oet04nqq064xtnjcwndtjn1iq4xlpdrotillkeywfdmdx2iu1gds2pqa4m589rcyfz7824q8c0rzdqnmdk3tt1tw3lhwh55spsenhvzu02p6au6cicdg2arqy9p41j0u7kou2zv3rxrmui1jajcf647kpfcxl46a57w6ejeuu9ah7aq4u6qpw73fdrz9eukeaoisvi5xixmblrde2olqe4pqv8o18jj8lygiiq2ekh2eujckozbo5t8g1pvrsbdwcd89fbxbyrcqouec8c7mc3lz3jdz188bs7j3n7zj9cl5nmyfe',
                mime: '5d5hj2lz2jlzbiv86ip55gyyebdf4b5uu9f6thwt6g7ybhlasz1',
                extension: '4dpay8mgjdxzs82b6s2qw29vkhesrb30xn1oh2qnye9sc0s1m5',
                size: 8535465919,
                width: 571778,
                height: 679626,
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
                id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9',
                name: 'f1c3j8h0fh1wh9xs5iycd026iq76icjczfotci54ghiv1bmz0ltdtntm1cbb4ir2hu9gniiofzlf2nbogbi6rmy5j3cru5rw3l1st9qgbitwx6qwfn5teghglup374eq2z08kncdlp8uq5wwpvysk2u453o37xb3v8hamzansz4wlz6citplhpdce8lrothsoy79vnp9t1min6sjkj232190242g3ct3t2sm4318d5hjx12iux3tqwet40y5rch',
                pathname: '4tuqyi13m7bwvcni0wf2hsq6wbo5rjjhktmehaop0e2nnq1s6jrw9849b1i3zedj7kgrmbohn8jclca7w6zr5jrii77m315czbpecca6vmgp6gq3ea5fgglzmwqpol4u9lpulkcx1ym7pjyeh6m55t2stwgcqjbmnic6htylrm6sq0osj8ky9heayfalihcs1nzulhn2eu94t0v8h66a2e7fkjuezbc302hmrn13hwhx6dk6y15j9j7q4b9vhf727ktbiopvdedhpn6a4r7rwo7n8937mq22kzdoe1a4ge71k5i0cwqd1yv7cwztv2kjhkll8lqwinkppcafboavvdps75jo17yx4t18itw4cu61h5ti2b7oq2v3fvia6vzoqbxjfnagxhlj1irbcn0bmqx2lv8f4j9y36jixh1fylsso8eu1zi2fpca1rpt9g7gtflc0oimycbb54e4c4damqehguser9rx2txk15c4j57rcj0rza8lv8lbzypjzdanqvfkvpkpyy5n8sofxjonqv1q39pjemxp29py0fwtnjbnletiur5ctwh92qpo8bhh02w3h5hfqmlk3y7on6xfslv4wqhjnssjxnc2ospgowhcqrcrpw63mqlil9906cpkzg24fcwzg8b5o30v2km2h7oq5hg2ayac665praq2qgvwf7w9m22wj0pbhe4krlwoeuckvu2kw13u3er4rwm1d6rfkpttekkcf2hyog2vqamiq810kra06oan29t3ouuqbblmnh7wpur4os1sth40k00ofgo68x3olu3inbsqay5qcfwcf3qigd4mh5siivsbefx7k6oiz6lj33gtkpkzl6wt4xk4jta8nu3omlnz323bgt95euljuip8bvxj294vneuak4kn6jnice4p6lc1zcwa3xkjlpxmdrqzywp0dfkfaf0chpjc5zjbsv7lokmvypxy6o6a3wz6zwswu9rswws5u5d7do2dgohlwtzzkdmue9kbwkeif0fcaopmkgtj',
                filename: 'jwv5fwfinnvowks1plc4f925k6nu5a15jdbh65y4o92pqbqaer4jscekdp04cje03tllb2lue10tsby85731qliedpkj0gidsh161ldvv3igc69hx6bntv5geknpp5qkhcvz2n9ypjfu0mz1qjwq3ea5a4h72au73bnfeoddfngd1i6sm47wf48znz8trpzf59zbqmwe00vvxezkldje9zkeyvroohtbxxbj2n6var48vpqscfnw6gsxgic0tlm',
                url: 'c7jftp0g9kfc773bxu1o9zi1sp0ezqzbccoag5pra7vy5zkfyu16dsf2fixg6cpwps20zjfnlbc9xvhmulmp5o5dh53nogmxmx6iccbt3kc73e386y3cbgl3pvuyg7lxfwnwj9x1i64ypsw6aq7amhg6nrd7m7d50w21qt4m9hxe9j9x63ys8nyubvjxrbwyx0yn778ja4mbug1kom2413967bovlqtdo9yrho5ap4eoy4hsi0x14xtdy3f7c15s6wxnszwgq02xdwr2x4n4umrfmt0zly50a8qv9djagasctwo1kpyakyg23atxlo0wicg2ufaazxjce09whsbirh642n7xex690se9w6fktdd90ingtlnp3do7g04cergxqbyiq3o7yux3twuio1dh5a98jd5zrgth1fyofr8c54li2oaj25qcrz0uu491yh4fzji4nd0o7pcch0dlm5wsjbrz3qv5rwkloj38dnemhz5f0puklkisldon0it7m98lrs2vb9d72tzdnc2pfa2h43j1mpb9bm56maaq679qru0mj1hxq6ezeonltbm87vdq3pdq4yyfrzpty8oce9v625lg8is1wvu7m5sq0porhmsc5wljzjr3z44ihcah4y4fwhleid1sh1xa6uikibfzkjptj8iwa448in5svh2y8oi6ty1ortwovms1xjbxja09eq3vgdfu3u4c7f7tp0tbx3of5ez8wxe0pazt4wwhdon3abfuws7bqavreolwizg7vlaozvedj2br7cs0y1wjbg7nvkax28qgpoimaifpqdy60vpchwnc2wjknsmxmi8eu34nlk6p29bc7ukm09h2tiezuzej33y2vq1e6kzbyk2akeri5zppaknlulb5htiwpgu1gib5rwzi2vtwo09kz864iciobs6zb9n486h0mf4b74ylo3pbwlc7i3s365tftmcwvfuxuqmf0cb7l82g0ctf7clmkl7rganj6hjfmskn4agf2tp6ak2potn8ctyf',
                mime: 'hch98ycsee3y31iwskpgposcqxyp9vobyncdngi4n63x31sqy8',
                extension: 'tqgyhzjm25q2pj04ayconq68jk9ptra1bi1nxiewemt4j1xj4nj',
                size: 7529730136,
                width: 978612,
                height: 477764,
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
                id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9',
                name: 'pms18p7wzl8p83hk83vzws7y4c3rszwl5a19cd2haeihaqiwrmmelj9fj5exczjl56z7bwbpfzadwi1xenftxiypsm4utzgq158l64pd0j0q1ft0yb11pl6qfexr1e1zsr21n34x9ka1rbi0xeooi3oqi2brnz2eoh3oqfppkua9bnj1ipqjaorih63pf1z4gj5qt7l5h74k4aqdjntct27bq0x6hl76r4fbaboh75tg2xnk1udokv7258czo3s',
                pathname: '9mleiqc9078e3g5bahiwknuxq8rum3ow1gnz5tpxc9yhn4bfvnfu7inksubv6sh6k2i3ckrormv7mvbrka0w32clga2vqmuqz3r2cbfy7n991xm70aamqfykbj2j41wi348y06l1s5azzukb45cqrlm00vr1u2htxc4z2fr81fy3e1vtiunawgescr91jw57xw3tevwitdv3lys0ztxidli0zx4mrgx97jnvkrxf6j9ueudvsd5d7wxqukfq6xlyi5mml2t6gvoy1g7k0cslodeyc9qfvd43t81jsnew0vmbihywxwbee131mipn0g1o6wctjqtdlnz5pcp5s51t61u544i0r550b5j8uxr0fm5wvvlgan34un1o48h2p3kcv7atz9gvdntc1enpmeew6brn2yckhz4o2dp1mc8ej5q3caiwt9ybesr048yfbog7308ly7n3fl5mcvnaps3k28assfsc9t5kgom1zz8otlyfj7u8h8n5kr4po3i5fklt9ulvvq7q034t6off8w826liui1c6vghww0hqh8gh7nk4fipb64lxz24tkm787mx9qu4f23l8e1hxb4j9tnqdlf5hp20adgwvhrxpm7y18gid5uuhsvttwino0ilithxn4bobv7vuhwyde9qhlr3wmbn7qfmmpowbh3gamyvmklah905qmpdy2ws84bwmcp0n3ruw637yu38cwbzk9tjxapdf7doab5g1fnvopw1e5ee4o2wu9t0twwtzishff6b5eqfbfmc59i5urmnazzf5qeyi7bhgw2c51fl62m7i8olljyea7e92th154fmnasvmd43esyz7em0a7epm4s6u7oc0vavzsiwapzdmdxoll54kvr59pk7sygi7kmwecf49myjhnziskdu8whq9aeje62ogi864xzcct3b7z44jzbetc3liiyxt7ehlvmw5975shv5bggydf8lceltq0oequo995xlkflvk3pcrlujprl4z7fc0smjske3fyp20z5f2',
                filename: '72jkjflpvxut782xhlfcjjcg0cjl0vws8jf9jy5exjucknu6v149gn7tu0u2h9mafsv2h75bdylx8mwo9yhq3ijk7qew42zzve9ju8449r5fny9uouadgp21e5qlofghikp4b7vdq44k5lvyk5b7gfpegcd5g8qoymz5fmr57lupe2d0aiyh9lhz9dln1h9y3amzlrvokaj28xt0d1z05qyrzh3l8jnqv25tme1dbysowj554253docwv8d9pst',
                url: 'zp9g6a91u5nn2opi0rr4irqrkie6ra543qnr8x1yuajd81x0mcvrtdj1f3ihf3n9h929p20a1pkamay6s0y6usocw3ns3fsfyw0nq6mx2zyx6mhjnvpcuq0qddav1x3a36hlv2rl28hr5e3eq96hjt7fsiem79bzsdkr4ts1zvegrergpkeizac7m1x3uhyekm7i6rrq9tbmcdwnk77xby7r8n779m8wn81h94q1k09xwwuuxyjglmr3uzt7a5w5dc6c20i0qh148hcbohv3xzdg3quwseidslw5sav8v2zlz76ekyiaamkrakth2o2fhtblmqwkjpq8bg7cxqhp2vwylvte6ibxrk6rcl3oidnz1jt7fhdl9i8slw20rv6gr5hfbeh3d4dpewzt316tg7loe07vrqhu09jrx66xj7akpr5z8pr71bxsgo2wybdu3uyvfx7wanbh7j48gg1ydc7iyuix6mzps6xy2nwdj81nliq552lx7pbkuhiqdw6oo6h5rvy3c5td9si9q1q8idjn4gu9uzfr6knfrkvlyjtxpaowb690l014uicj8e9y0o5s1x3z3fcpnyg8hh64irpofrnwh4plz41294s0cqn4upvtie83cam6nfa32cliqigviyg8162m9tkd3vh2goxb7x60b8sjmzbntxl8nst2rh9nla31nmz7kh27b780n4mga5nhlqjzfnhr4lvjd7nndbqgcw1dz581ltifuo94hy08chs6rjkq3v701etbsmphm8sgzgd6re1zbq1gqio3xicil6dp8igeo6y6alghrvnoiv397hxyew6b9i3n5mjothsqpxbfnkqsp36qzocayraxtb2yrj19xkkh36xvjf01ezj504wpxgctk8kvnof8a8b8f801e9eo8iv60tsluhkbg1g7xfiqrl4pdk7wfjh09f54mgi2vpvw52w0ixpw9t83weubrny1wtllnr2kg1xhu1ymsc14mwnfukjcpq072t03mqxrm2kw6hd3',
                mime: 'odoxqwp8sz8utiurqlq1an0td86t2aups7lltkmnxsiyyhbgm3',
                extension: 'ufw9rvww64x0rh3x1tce40f54clu0novw390zybg428ok6g869',
                size: 29578866728,
                width: 428917,
                height: 979474,
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
                id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9',
                name: 'deej56p2efqkhj49pdursxupm8h8paom53gsjlrwdglz2omsa7m68my4tc2dnodbhqvi09rgouqxftdock6c5adzwbm6huldze44zq0vqr8qatr112f5rlcabuxct55rp9cfxc2na5xbeeznxnx2opunun6dt6t4ykkc6fcqvx3s1xj1w12x9q6i2eteupvwjm6s7e5plsnjxod52l6gyae595td3thpxk0tpfabix3wnq784sl8ljwi8iqhmj7',
                pathname: '93w2c1u6anwx56ulujegtea8psg5lkh2u3irqm7u52wrdg9bv5x6ov8iegqo6te13w4xwv420vyujwq2s0xa0xae2y34jx0kias9squwoihkzsgu4w0manslx6a4psrfgkd3a0zuu6aivz6nc78jvayy3w82zqam9f1lxmv7xqjrataidcrznzj4lejqt0x95niy0m6ml33aiwvq7nsxvdhts484taqjeu5is4kmueaull7yacdk3yemab8ngqiexe2b5k2mcywbkaqtjcresa1tiez8c9evnxb5waensxc33458ig162usry9i84hjszybiugl9kt3vpbxeolmd8s3jmadqwrx0e3x2uyz48hk81tfpk6al477la3w1mbhj4tdoi9rym0i2z9x9dprfh4kdr3lstwsrnc29jmbzg5roo76kj07p744dhpwoqmszec6lbdsiwlv8czcr6czstmki4lk00eelazcdu6cf94emyh7tk0u4cfx5v418j3cxsmeh7zw1bazsiq7j2c5mokl7fq6v1gdlx3x6fzf8284ijgnzuq8z7qzbcr77rtohwlsddecfqk10i7y8c9owicibd5vgghabtvbpnt6fo4l6bcmwjyfd1789lbgqg2qy77980czpwkf6l818xw4vmbds6rcxnrfwujh7yudd6maheyp90dqsycy7nqged5st3edfdgfbru4y4jwgyab3fwa6y9x4b2c7gswhbf3pjb1dpoyhseqxku7ae1v52ej2igl18rfgxpebl26hkjexaqalok3tqaa8burjmfae98es4o3apta4c8rttyw19eh258r7hi0sn1rrt3sdh0hv3uj5fljzs7yt1anyt8mw2twz8rc0zd8tr5guxc1fdz4lwxtqmkimfkf1i28pu94e6sfe0197ryby2jcgq7n05hrshtyz684sdl7x6rmhb8pdd0jr0mq22cgzctadudhsa3oyxnpt020yymd8fsw212favilxl905orxa6naecy57',
                filename: 'mikbmugiknm0ch7j6w4ypew46pmajrurb3ifflprb8ozveblqn879x5uic4tq9bospih0mg91lxk4sklb5y8tuswigz9fkqa9exovnjf04juihahyp4ye46c13b11littdirmqeqcmjz7w5l6ipurjc85zbudw79uszer7j30r4r5363iiicg0yac2kkudtwuajewzv2sg78q198d4y2ukhw67r3f24po1dtnp7bg44puw4zqw4st96m8xy87lp',
                url: '1e4vymbmjhc6ezosvw3ablmosbjicnoqrk11s3kj0mhkf2ivl2yc2h09pm12ldfhmw98r044bqyevydltmo2o4b5egp2fsh1k58zg107efotrs6jmmdnfvghw1vmfff9w1zykzv6n32l5hd6k98ymvwymtz8seug82eiqempxp85ye3afbs5hp69za28xbdd5tn7qtb87hjgvphjf8ze5vc8b8keyfwe8mmpon327hlm26lwlfpbjfftue5fwpxj47bowdca2zp3p0xrfcpjrnmiwxf5yw8280yolasnd359xm8efdgw65feapfwv6putt41lv79wezdjen6h02mshtt8l459exx9a6f56kv55hj10ow4mzt1yvl3tmxwdl5btjsodf3cxv92qq4vh23mui21zm57jpt9ryof3pt228k1brxc5usksf77xh4lbxag0g15kr7swfuww4aqe6u7owthfvznqvtnqj87y59kepruuojx2rzw7mwswdcxqmzs1265eaoxci6k0xg8hbtvyj2np5qvuz3oxdnu6mf8z9tjhfc3x7ad5180jmdfklmcbanj2eflpkn328wf77pfvdsuypvdedy6ryh9yg3a0jlz9ncr5io7k00g0bpzpf884surhukk9lx91iulwgaf3si0esvqwd7jzijkadpzh3nn1lf3fciab6av1xin2lzm4a3stblprakcekorhghl0s4fixqb6vncam0ya5odxyscx6ahafawgseklfwnpy1k6rehi6gxoavday28s4kx4z6n7kncao6ctntrcu2htdad6103cv1lgo8ysexhsu1k7rfc1s65254we52wfz72desolhjrcvm8rfu2dh01epkayy77mdtl2knn22wkp0eaz2ue7afdcvogr7myjjbbirdsa32633fd0f5apu3ggmjbxdmrgbxozxhgypu724d7t6ycd40fvwxa085hfvmyufu9v1xqd8tskih3qxwgdfgm2lgqkvpovcm2wy4p42c',
                mime: 'tcva3pcln0tzhtkct0kmlox9luxx1gcijszq6l728akh7eb4a8',
                extension: '9jn45pocc6wpszc0bqqae3danyruwcvpljyoquxb9vo6h5g6tr',
                size: 5473132683,
                width: 7684072,
                height: 287241,
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
                id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9',
                name: 'ucwoi834j2d9gt3zif149953smy4gjci0zdobbhrmpcghiishdope0nzkj6wnuglzyv5n0iyp1v9ppwwgjemnoddbzj6pcyb2t2bqxwk8z4t6gwlwddvaqtvgofzlu66b4lctyvc6965zkhtzezqgpks8bylu76oz1evuytcq8fq06eajf2zi6fi3qes2va1elifp64510prdxrfk2wrs6hkx9dafqq4pmzvug8kzhtj1hklmzrcdflwsoy5k8y',
                pathname: 'emgh0qgdt428896gpkg4bpy0qhorx1ta73cf3e0syax9ehluh6mlvzylir2k2kkou6aptz8kfmqevnqb16hvbusuu4i9qm9h7jg0pj9m0yfmzsls9lx9cwpxxl03jzh1yyt7k3g1r5vih6d872fq8f7yauosjfy25wii2czutfo8ixoqtdr0qa4zjzmwqvuhdqh06rm53l4iqr7y37e4ibo47sbizt8of3cduf2mvbpm8mtlnpjcchi03nidgvz8zguyasmdqw4eefg1l8ut6m9s477sm3gt7xqwhnz7bx7tghtxvqfhj04fngo5wv8wuufl72vag0rpb6ak1jzrd8nr6b661swceimaciysi21p4qfdmstmkv63ilhn5t7wqrutnaoxpjzmwqmlvdqvfyc0ftxwm66boi0oihzxlunx0fe61ijtpsoyel3yj9i4vp1sy73hrpqv5yjuuxfz8a2ka4bx5yduie3t67z78u71w6n6gdf68zht278jww86sebciy76kedmejtyhbrfkdcopwreys9ai9sdgbpzm5twmt8pdxa5hg49z2a2hyy2dr03psknuqaz8btezcvf56on3y2419h3nd9yf15efb1y4yjppt9y6aqunte4mkugmjecc97sv4ijwnhzsbg2v1f66heborz0z10lpowblpicl2civrxx2hp3dvjde15ysjdprh6n8w9sj8vteplx368xi0uwckzhth43xx7f05iht2tteavvpxpmy3469vvi1cfusjwc8evpmlz7g9p9m0k0q271ppva6ko5kg8r5pb6osfrqwgrn34srksjfd2p1bicp6w5iugsyt8xwzicg8nfunzzb0unmihenou16x1qr38vr36r705dg9466e4muot5g0l34vjjibjaiihxl2ofbkahftb6y0yyszwxv221c9tcwrt7xt4rq5vyj5edj0ze8pw8x3dqvncwv6tztgu9ngwzd7siw9k1s5wfx1gtw66oimyxhf8ukayaks49',
                filename: 't4lw008panveoyjfksrd3cx2473ewncbz0q0j9sbz6shbjx8v83qtmboy59or44ynu8gvmuvs2oygye1ieb0ab7aa68it6l4q8te2ym5s9m4bfjayyfl6x7j652hlpkx7jaab4vfz691cv3nbtjrn6amd5bu0h8la5bw3wc7cqntfvg43cp8jss1e53f3aq3snzr1qwekdxkr8wqyqsqv03l9mqyeuiukgt7tr68gcz4p30znjm5aneddi94hnh',
                url: 'e357dkb2v0tvppz4i9oc8yjq0r6ztt82azrd3xhbnqlaeszf3ux88i2537m8ems3e16wwor3ye8l23e0bhowjq1i6inrzgy20gv9pg2g4vyku5qfwta86epwq8a21wfs8dt7gvwthqdemm7ra096jyucvzmgbv9ti10m6zwcles41d1bpxkg5hbdn9ya45s70n54aw57cuywujiaj8sjdm96f2lqsoon0avvhg31nutw9qf2keo76aw91m6h0p1177zyjydmfgc9ggq0fzl2u7h7z2hvb9l4aurfygzzua8rfd6ci6c4ht99fo9gzfbbklgmjtof3otlhrywu05794koqspeyvwtxeez0i0fpgfwan7iv1j9ssma1c0k0219debmp4rvq71hx7uhmgnczrzhj1ea3aw4m5cay905whcwiwnxuvfaeq5q49xi4e0f8hcg1rfsvpf893hg7fe2vhpqqwvjkdaqi9hbf08ns8cef40q8bim4tahvrppjjy0huajojkjhp9hj1nxsi8344yvggauhm3zig5rw3d3uxf4a79xvjjara1rvkr8qt6sal2noyy4kv5ftttypkhi3lfdsn3uw5uwuwn0x7a46vdvo4q4ea81ldb3br1exervk3aio563ucaaxmgqvhexm5a9o2sjnhrrtrz9yc05q1edp202d01s04jhx36spljmappcj5tcfga4qo7pbmcpm8seiyz5tyz7w6zt77c4b7eg9etbpd3kdpxoiryfo5hyhgh0liv51uarih76ztjmdlv4o1jxc70sl005ski1r0rp93078tkb4inx8ev8yhmqx3fiqcbl5htvhk8aumelz4ts1sp8k73q16k8mxyb76quobx0wy8dhc0rfqnyjwdy6s472zqlwjwjkd7bu59nnwm143mrbdjx7fbq94fd0al0f7cd250ysdmkrxjng9hvu3rjksmp532bae7r9cosu06wts9r5afpmwz9gk7de3fns670x985h0uw509vk6sx',
                mime: '0ci71wegsyp9us9s6dew216cyj3br7vyq4j80m16vrj3gm163w',
                extension: 'awgt25d76nbdm4qp8kea2quoncwiks9xta9dnrdcadncprsuhk',
                size: 1866780066,
                width: 740359,
                height: 8325265,
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
                id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9',
                name: 'f8xrzv3yki3tdn32wvm7v168bgjlipd970zsgrc29a7fbqe5s1nhkrhzzsdl2eoiv6izem0ukaekdyq9grcbfsb0hechvovq3rc6uokorgp8qjfi4s4kql2ch8c7414o8msk31aehhyb0xw8ao2xpb1ws1bbzbpj4yd7fpro57rphkbjy95alfj36psq9v6adeoq4xa12inwpnzqv50m8bflva5791adz1jgmo2uxd62nc2sf3anw91neb1i8aw',
                pathname: 'qa0w7kua5jd5iacwqg2ysstfzw2vg8s606qy54al5ankjn2d903c95vpdiwqaj1vbybs54rp7x1wm35zougpugyze5g0wrwpg4y3ankmgueq17eghetxwzlo8zotauarns94jzi3xybyzy2jy0mp9urynaouo0naytlbj4pml8bh3f9id0mn7sgnerv463st60c38a7jwbozhph8eh7ny6ueuq9hse90y2ki9amtk8gtdvzu1s5sdy7dmn2aa39veoknb4w971ztds6n91zwk4im7ektez2y87zusppjlbxsnbo0foooyoiart8u676g6ddjdwtj935orjgi7wgvwksfvdl3743hfejxev1bwdwvgly571cx4qyebn8j641vzipw70hbtcw2srdndseb1oe9op8zblx6hldq6cxfpm9jlc8a3mumz223qckwmjmocsdx3u0g3q9c45rb47bjapjkzsy8jet9vpq10md5txg0ll62x6d3396vhzqmx5u1ih6oxaw4g7wlp5sfw5294ktbjdzzpgcy77jnqwfrhofufvazhhj7mfw61745muob43hn3q3fk5hk4jm2l4tfdaua8ra4hwoiad5n9n87rwy38n0ivyuvjrb87p39koh0wu0dcdl2wcsld1771fpae4yn4bdnvjbt02yrkaruehlvdcqakvf4ss19t53ukfoo7b7c2s8ic9e8rdmehqr0t2uh0vk44k7i7ul1d9p7ujfxcdfshp2tzdxr36om2ylejkds5iqg9i358l001m4ouvp80be15yrvl3a7oo8on6t900z1ydi0mmsfs2czpwqjv955a6mtjc7mu495dcnc3s9p9xfjq8ndalt0eo5qxvqh3vsdck6n7izb30jnbpm2vnfi7fmhpdwqiljqmvvhxe249tov2ljt8r0kplwkpbdmg2bflbzyxvrhwsrh69yaj2uh7elnfj86ndqnkv2y2wg5nug9jp8ttem819u5a3ej34lz7wbqwi8if4flnfr8',
                filename: '1u9eopsiezdeqmakz6f3cwfr4s2i2g59w56mf1y5wlbm3tdy86j2bkd69dobz82rwbqz3hhxbpymw00v2x4foz2faa1js01zvmamhm06wojclec18nx97hclqhs32i0clsaibho07euor76ai1kyuc0z39ce0b9gkgrh74a9ul7o72i24filuvv4madahtkcape4p8r4nr3a38c9lvw6nai92h768ptj8gd98ib2xe4oju6xai52esaowuxyspc',
                url: 'z2ncaq7vagnwbf97cqvbkg79l1qoutwbqxocaqwryjj32ft4dzlzpnmq5ov25de1jlizljdl305o4550qjs7tjt80w7kvvstli7fia0rkdf8n4soivejhmxzmy0cm4ysf7r17d3f8ervuwd5b3jte6k1d8ztrsp7v9r7hlgxfdx14h86kv2qi15eclix69tihz796zu8980mej05msevbbm11mh1bvwdxqj0ffkfpv55n506qjunshuh3stt9j11oj81in0g2ud8tqf94hwozotaatn5rucw9bdtg9k142aolxn6t0e6kvyyc9qjfxdb1bfsdh4ri82jjah8segoguwfp4omsew39cl3rjpyetfpqkshihbxzddspglkxl9bp1142zbdwxa0gidk37k8l6dr2cgke9u048kass0m9nts3nfoqyjyla75bacnvln6t4kgg2i9oo1kqqqfnr0bce1bmpjj4ruhe2qf0slij1vibj9axni1hub2zs4lsbrtiyzps1q9js0jiv2xpdte914usou13p5e8ty9302kl3wt4tv3ttt3twoa5jpv545nqiw7ac26vz33alj0j03u14d32hvo9lgufh57fg8cjd6urhitn3x3k6wd31lzxheijwkqpvhmm9848au6veyt31ajt7l8gn4hnsiqiyl0o6a39rda32dysp2bpoajlwci2ncd9udeywgvrn8456v8uk6lhr1msbdjbqhxqs6o6y6r2djlc90euzsayanu2c3xsh7fvv18xurzjmj6gjlsy3apes7dxetoa3ydolp63s1m288p64b2buc8i2r07f43447tnje5a74px65r65flvo4huupn8fzgskw2rhthtpbxgq5tbtnq45tqjd8k039qpb8zc0v7h8uyyvvtqcdl53a8d3luo8rboqtwkdd3aun0sxscb7vqf2pm2xlj5fcvz9ssvtwcy6alycpm4b8jo9u5u9kz09dpp7c0zh23malc4u5stdt70ermqhfz7ixs',
                mime: 'pugmm11dc6l2kjfyykhnraqfq9qwwzrf5ln8umc2tj6tz12m69',
                extension: 'f123q7bf7k52ak6c2tzk3r4d91reo0nyoe0z30xo45y3bflk6r',
                size: -9,
                width: 430905,
                height: 453147,
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
                id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9',
                name: 'ng7cybum22mvff9gqyv5ad2cac4r9m2o9sk5g06htuda1jab6zkbu3cfmj222a97uc28ehxfpbi7pzb7w6yh935al6o3elqq0nmnpy3pw41phtl5mhr36i3yhv3g0w4b2eokeb2iomrqf2zi3f9sba1uh3pgo3n67kpwb43bpjp6hnuzufpluyvkawwraw4xf07rbieh508tsew521oapv43w1aho0xxcviirafvtw4y8r6hikv22leie1rbzki',
                pathname: 'gw406v6uwb0cvphdfbcr27e0m3d6c56w496ydy8qh5ou6dpcbnakmpfmugnjtsuzjn0zc3zas4768fggqo4vulcwmmnq8u3eqditl13ljwskwp2erkmastll39akg6a2h8cdi1wdagrc2xxusru3dtyphyrqcmnuhwa8r421qnm44o1lisaxlcbpsim9pkvhsswu96wjcl9pvtnadcho1f2c2c2uj1n3infzw3wthpl4z42wqq6oofkfsvirhe2qd34b07savbr3dgs3jkv562b8a99ql8flbj65g8tp0o4kkg19md8mtlybd8ghdde3eew1d7e5zjw3x45grhxsifv8mpbyzaivexeo7vbqo9zg4g4n9z8saps320fh1qbxjempab26j9s33ju9oedkxoksgfhiz4ecoaz90jllprgooxos1k6tsdjhtxhlrcyevwr9magrn4eltnrlnfd5zql4oqk6iqfo9ov2p313jjw4xw59kidzx8tt9xfr5bypz92bul3e3pibkpdlntsrwswd9jt4spxa8wnze0tn20e2n11zc8ihcza2nbtb7c868epz85z7o2108nz577mfidw4gbes87ou5b2cy26gfxj6t1dh76ko9a7665re2e3g3iw92vcgcoqkegt2gzrfu0hw8wistzw6llp49aw36oc9926pmrwm5ap7krkbf79lqjodv87dcu1wtqks34o8yzzb7njrwa41iqjihepsfq5nxfn9d6p3kmyp0tx5hkuco7ojkwh2i9hvwaa15r6n5cgdpz8tvc8xixqajxshkf2fvznfq9zntlwu1pnmhkdcirsvo8814kc8feq6y0lshfkwu87av7mvnhs2jdmskgrzf1qwaicai9smur60uhvualst1e1vfmwp006efbepqdl829lsnd0p7st6rf5htd4a1tf94gzyljt8u45ehsa38zatwr752zs9vi1ie7r6dsa4ts89gjzk1i524yevv2vozpuf9wludr4mbpx6gm6b',
                filename: 'm34vdniemtoy05kd7ub5bjx9yi7awk1i4ma6rom6h8qt5bs5rc8p58lxxehrn66a9gkx5izvnnkc47u7d4pm80llfwee3c63892mgz9hl7bzp0qtw8v1glv9pxjvxgtaql7jtic9xys6ywe2tnwtafrn3y1xo8at6vjn8goft4de2vo00hzyh7t3rxq9mgn3hsfjoxbqh3yaiz81nbww5i7qjwmqromdarat5530u5u3kkoqavwsxmmg1fauy1k',
                url: 'yfbcxaq3spm9yowb0ayivb8p1erbfgvysalrrta7is9ku36wiz8h0p48bl03954m7ghr7zgt7bjfzyzoh0gvv4sfw49ptx020hzvghv6pb040qebbouugof0kmana5m9j3bck73v5y5twansenr4pb7kosx03ra599dyry0tz4y5obpmajq0o3d7fdyf5whll6dt8qbo9c08912y19xnttwk2gc4wx5n2hg8xi56yhg4ocvmhqay6asuz8sklze2za78sc20bnhsbdzc21gwgixhncrseh6ggkxu54lv8tgj7u4vjtkkd12uo1ti0j08mm5hhajlnjgdrg1muktq5vxk7xg1qufo5ug6pfsx16oqje18vmlif9huhhgd55seq3gmbbx1lbi6mgtlitnafz5v9pzwu7vt9dh7eufhlrqndqtlg6exkbjjdroy6dwenkh2rztioucnb4xym613rgm1o386ai8ve20d4llirqofes7v9mugkloocbr424df9g2q80nxpomw978uabhirm2slxgm2b6ntq9mynl818u5mgm0va769t0wxgemjw5nzqpjvb1i59a5wn30wony0ki6h0zgv20qq18cjhylxwt8tvuj7w32azloq28puexfz4jo3ptb42plisvpt5n5rsk11zrs6h0wpge4hydb76r3cmoumjva900e8eq3v72u5on5dkj11m85ib11aabd7l3rx7yn2ak8nkxocz4q29ubou8mpmdufmd1b4r3t094xn7flo7eu5h11o1r9huok58yq2wcjmwgh1sqw1nkfjs366xeojf3j1fld8oj7at09a1gybgxp77gdw22yzcjvdfrbfg9ezjpiank1qlo1n2jvm3duvllonhmiynqt00nvibo2mesn3zb73xhx62717kabbks9ttvy2kp999l85oh0k4amm9hcqbpnazngv1ot6odnkywpilaqv1z6xg8xq7ne64dvcmw94mh8cww2kyqd1m4xjjq9aukunajjgmc',
                mime: '6vu3ias4fnbosiuzoueyhrfsyelsfkxyk37o61lx6e0ir9swbc',
                extension: 's4so6vbz8y3iwra3mdm5vu70nx6667bjxlb7hcucbpcodzqk2v',
                size: 3829939094,
                width: 304831,
                height: 954343,
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
                        id: 'f10b01bb-9f58-495d-b85f-0b6b8f0b1164'
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
                        id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9'));
    });

    test(`/REST:GET admin/attachment-library/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library/c414e4ea-df88-4bdc-b93d-a0eef6372b56')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/attachment-library/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library/0be4fe93-17e2-4291-a4fb-c86f1a93a9e9')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9'));
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
                
                id: '897cc43a-e34b-4c9b-b82a-e39e66a59b4c',
                name: 'u1iuv80az6l1mc2f41jb5z84kwhlgky9hif751ieyr16umpsjkecoa5ap5fayip4nukv253taxlv2o8mlmndvltpikvrzjoqsbg8my7lqf7c2gea8029zy3s38tny0ted3u4kk884ehq5gtikg64mfqw6ggymxdm6878a6sj6kc02dtyhe36koz7p611s7n8ar77gzo8gecd94zv6a5c40zf660tksxgwo8199c8ig9a6j0d7qzgi3m5ndmkltl',
                pathname: '9rmsd26g5likfr4hyhudz94torvyo9ducsny8vs9jdzggz94pzisk3bpov3stxtzfoaeanawqxiqaxkgygfjzkybplwixtdzfhqyne426i7gh1groxszmbjczd9dq6166j0ro0s257nt8pydmspp6kilrb430jxry9ydn38ocntuz5dbxb9ywuozi56zn58s710778ojqxw946iiymf0h3w8xcka1xsex5jb6jxxxgc0mmfovnwu46vnce593agv10knq40my699xyoyz2si7lzd3ugqfcnr8wm1yd5zq50ykoenae2ta1nbgpclrkbucr81l5u13ywlf0c6lfi9t7f3kkfisg5p01atoj13gsx36wt3aaak4ktv4jp9besslv8ha59iai6ai170rfw08osoc4qpsa4s9jtb0lluzo1kp02wiyzszyye6m4klbrsl15zdxnrzru7x4pw9n7tf2yw3u0c54787vuh1eo2hdn05wbas6r4bz2uj9ln568khf6onreapu4lfuhtzhfas4t3ux3bki4xtdv0jk2vrvac1wh3yakp0nmrfcoisw2wl9l50fbm1zpoqxu46gh9zamfxc9ps8kqnl5tjplutfpyfpw2dkj8l3dzos2muwq4lwhkc49ce70yd02ljgwoucpvznoeofd2uzye0uvbdozuxu6v7uzdabaywmfo1s4nhwsaip3ks0ou305b5swqi044dbtv1c20a950rseulmhuxnk8zt49twai35tjcbcbtn26ku6ji958zxo90ayhmw9lw3mghfff1ks417eiigqzr01hxi8ofjfok5hvwy7jj673g6hsu9x18hyg3f7exn04lgl5myvf9p6t7aauaunuhmpmhjhkeztsquwzut3k5horog4ntz3kyxxiwo750j9r5rg5b6iq74nw9q4efqbu5v37y250t47xbnzhndu3layrohf8xwzr8t6zlvz11a1d8wei4o8e9mabtfbzrkm00vi8u4db28n45oy4ot7q',
                filename: 'zqdgi1bkcxowyg4w4zomfhzm710ck05nkzbaj6gbvg6b3y1toys7vc3r3ddvdewx35c6cqta7qqi9x0ir85wlyck4dhgvdxp925btu2z7j3bofwb4103ycfzb8ityy1lfizg9gvy2x3ury36o5eeek9kh95jo1v8cuo3pwzsk1q7mekegz4miqetfe0j3wdxg9zg6ez9y6ls3cvp29b8atkq0iowq7plkiocijgkle97jpmnikt28zlcgwn4abb',
                url: '41z9pdgm3cesae0bxd42cbphl91v7rbpyhssvkwja0zu0rv5qmqchy7p4ul2zahd7bfo0tro5litb0kort28dud3evaly7zlwy8dr3tiplyw88evdqw52lpfak8hxfnz4bexubglbn7sys10e0v8zvrconqtr2pfn9vptgbvlaiyrn5lif419zxw1qy1ay9n7tka3w5col3m8botbeiyjig8txfx5lt1aubal33gb3bbof34ykii6lnw0xb94exaiccqrjcwycxl81t4gspd4l00nyk95jcp8kvwfith63eipbkju0g528t9bnl94nepzvyfcc8wu8tlu1ttgfrsj80hcbkof67qzfre3vmyjqhj5b7yojhrfe6a6xe3n2mb7y4g6qrpmvxphkrdqppxvbu9e2z92zr8jwr2u5s0vf1mvebx6yw0zeo16claj96g62x8m76oim0mhq58ra0pkfgcy5p0ez281x7d3tyi50cmcgeanzcu6qez2yfrr17fdo0nsxtuw5u364wiy3vr3vjkf4kt1gpf78ql0j9se9hqwig0o79ry8vbsn1vphi31ppnc25n1cm0vcbztju05fajjyl2ock98pgvil4ero0qipaiaukh87oj02q8ersq6dfws6iqw2zun8aixv9eecaug3y85vy3524l39jl02gxu1gah94wa7ciwl90jrd4ozjp4dord9qakmusr1ws32t57znrtnas5ozb4k9p0cxeiou54f7aod9xfdoemwddtxkrty46ylbkauulzpecu3j6xaj27hznfrf5h0gf5jidrhhj46j9hr8ha8mea10b1hazztf6ruud5kvgy4660id6829szjdro8w58rbfzukgzrnyb5sc3lgscgdpw1bo517nkny43m36tg74l6c1k9ibvt2uws4d565zracrechrmkib3741ca6bdyg0kubv75n0gpjivqrxw0agl1xpl4tlpuxjed4nno1f095uzske4p8q8s2dofve0x98deus',
                mime: 'vucfs4syky4r83x27wdidlmtdn6dv6b4rmg6h6zisqbq8cd1az',
                extension: 'fvehlbymkubdph4pz28disaajh6ym62vkfuxha0e5vk6y5dxof',
                size: 3927635003,
                width: 773432,
                height: 196756,
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
                
                id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9',
                name: 'nuze1o0lmpt9hgixg8iojhtu04nho3zdo7u73vk8fmfxks8ju29bu12jplhsbwvdn9xq8qeg6syxtmu2617mhw9x039982k85tuwc1xxlq013y7du25cdf3ijh523nwehkjqacx0z11bwxtv2pv2ug0v4s3avg87t3k75sv97tvlzdfe9udmiuh0o7wdnx92xy6bilmd33rbtgxrgb9s0vu6vltzdoiecr7vmj3lq2cbmx3prxvtnlordhw2oug',
                pathname: '8h6bpn8o6t01mjg9lycfcs6f6x8a29lwksz8m0mrlswcn61o2hbvb2d5yd4jab1e5mdhkejp8hmyounyp2v91g75zjx6jewtcouf980hkj3bspm58c88k98jhcjy3p4x08y69vcv9s5p9v9z7bv56zs8pasxkg4so6e7pt8s1f3l7dvjgvslbu35iv590ggfgpjl4tdn3uy444f7lyu7nfj24yyr5cs68we0c378by5lurkybvpi5u4h66vu2rpo3uhxd1yeicllvjamtzro8ltwla5npkfa942vgan4lpgg9bopaob4i6mwr51px3x72idd85ceiyzx1n0io985hpggdahlgvu1445q4dzattbetcby6c2324c06d3bulgg0h4w6rpsbivljnadpfyfsnyn8vrau2m02qu9g6e309hwcdw0jat9w7dixtqr3bv3v4h2wcjr8vfxc30tlk8rdcgloct21kvbishr1133kevjo52mu3e1k434vvme7jcy4jpj0nvcz9k57fvn9pfjxrem62rziu4tupejht7zrwfv9z8yekgs8n7tsmrab56pnvu0nym0vx4xd8ttdyeoa1l205ogyohxy2syvj3cx808g90e3cvxzjwmaar08pvmw2nbzohd439hb1zrgrhkvf1lnayo9ot56hcslkoenb0dcc7rdzymqb7clal4lp285v1bw8eumf6zs3je990ek4mci9m702jo9hwkb06h2twrkb9oi8yb8ymubnw2nzuqgia2wv2s35evwgqqr2mqkjcfobkjtaj107g15c54768qixfrqaj4vztwryiahvnyzev9vtjhntf78qa22wtk0dzw4xnxnpjprmsyhtlguwzmxfh4dfcijetuoxe42cvtj7wsh61h0rfoo5ljhnll4n6tsbzhclg95e9eapwezjwqdedfds93215keh2rwc2tm4cq8wpdcik9yu29otlxjvsnrwtymkhnxfzxnhmlqn2s0o7luytc46oirrnuw906',
                filename: 'bmoe9wyon285lm8es8maeupg4r2qa36j4zgv6z42l3oyqav53e6vefybxe55s43da0jzsuhte6s1uiggn66qdj27bs8et7d81wpt127f2nrujz66b5x03zy2lbwwpz5aehk4h3ylombzhjwc5hmj8rc9mtfvvwq9ydf18c3u4lt51ndmkrs14epcetxcyoaxi2h3t3f21x793r6pgyskk1j5v8b4qsnxufztkc8z3nbt5frxhg5de0ygjn0mmku',
                url: 'omsckomq32yvt8y3mds4kbun7wiks60vzo6yactev8i1zvefn88ojr9wgwu5zi8w0qp78pybb6n8dl68qhct8gdzkn1om6runfwy9kvubcn0y1noxp3440hnq2v64ft3sxmj4m1q2gxgaeixn5p7f7xm0r0gifxl95fyy6x6yfefnf1fd3v87qcvrc1zpc8ninsff9oe7oi90ong0uzyrdlngm7qx4p3i01x60r0neef8rdhpqao3ytf3g3c93al3lauy272xekdfuql4kq3ihup2bh6buhu97yp8bc4f7red8xuaqx4bva7q5z5m7jpcxm8ae8e2oc28fironlenl4d65ddr43feay7hin5nvz5sfcb9wcnyzbpimi6hzs0t79cqf51bp3zjevid97ghj9d7c0es5nyjqhi2a3b3vd2t98k844rnjyk1snw8evoiuwkb576dx8np6x2nfumiorsdwt4ge12khcsmrm3ouwwqp1tnnb92qztey9ixzawykhchtu7bvtyd9tg0ijrf0b711zk4il1mrxt6qjmncjy9npva0y477gg6s538g0z1m3yn8ykr427gpbv8mfckcqlxi7ppqntxa7wypn0t8ykpqt0oa9vefevbbnhjbu0lft626vma40u9s89k0uj9a9rg62dnw97bi7ayk3c1kmk6f2k1e9p1svec9109vqc9qpt1106fkqi627tnljnuh5p7apxt1dn1u6mgkr8m1pe4ci3oe0agmlebvwuqak17mk2n784g3sw84e6nuww67rnzynhm2y4c38yf6v8pt5greo8gs2ccyzxdd1dj914yauh3hmdyg4afa948hjtlowolyt5axn48cu7lkscio04jrwpaztnf11bvox62wxtv238g810i3h04hxew7fzaqft5s9ewdq9jxpgnahik5znxtrpyz0qcodsh7azv4ddy5tk7u21kd2nb1dr4hc7yxf7l00zwgosgu3f3lrrcaeg6mb09xsj4rkvatkdzaen',
                mime: 'v87nwnmhu2c32yzopbczgvrf4vhy4r1hx9q92gavsjcb9du8xc',
                extension: 'my1rtwrlx0t6utduvkxdoa0n6n7u9zskxpkc28t3lekrpkcvwo',
                size: 5389492824,
                width: 894956,
                height: 515783,
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9'));
    });

    test(`/REST:DELETE admin/attachment-library/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-library/cb9f2818-968e-4d2e-ae2c-23ff71072a39')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment-library/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-library/0be4fe93-17e2-4291-a4fb-c86f1a93a9e9')
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
                        id: '2ba1aa43-84b5-4e3c-b8be-0de3cc318ebb',
                        name: 'dwuvre0bkzwcorhf2jo4octsw39djd0wah7ywqs78v5zmhnkexhsmqfc5gaco4joo8nbroq0kvo9pprk4p7ulvqdprlo8m34tetsqkmmblko3njgnuzf8ewpt3f8wlrnkkd4613f7ltha8gl184mt3ul1q0ch5rtvhy3mfejpeuw1612eo9ovusih0raxoqkmhvxi0w3t7nb9op2zy9wvyixfpnedue38wi15zdzyiqfgychk4kns3evvqplae4',
                        pathname: 'tx7xgrnf2kpxof4xp6zp80whvqc8v3jywglyblrh7jpixdbu2u6ge5ucptc12pcfbd5n72n0536ea4wbmz29zxuw1k8otcnx8ndfblmua7gqs2wj0nwrfpedhzyyhaisfgbgyudl1uqzv69m0p9v4vhv1miencb70fl8rpq5yl49qgjpl9qh2cvn7b4olt84ip76vjjwd9sfs9pn91r3lcj2qlzjcbaxqgunu6akmztmoqu8vjigyulpdyf5l5mv6yo69wvh0lak5m0bmifqzolrvqbr6i1xds2sdu3rbztjt3xfh21yos56mvrht1yxo8bynn1j67kh2cf5elbb53fz7gfvtpdb75skdhjpwxbxf2bxf6717inoi73c63al8bx6d59g1q7wklxvhj1mi2m5jaakvhw8vhgjq02s3euzd3ihwg7mx5ibxiarlvlh906zg5mihgs5xttp4wqsf0kfh9d2dxvxbcgpocakmfztmraai30vtuqomty2win4kfyibllwrfgbe14bmxk1bf43edck79i1pisyupz1yj5tk8zws0kppfjkoke394g44cqsm5yk2andiwchapdgcl0axpfgqktf94i4qoq56jxfrdor8je7kqbricwkz2kvkjl7slctz1ojrss8m3dcrxga539bbu23hzlxf679007nrt7dkh1bao55f4shcvebgujscbbxewtflzvw9su4j5il13u4uxoxsaj5xhqq7kkjklmg29qjeuvg6zyy4fkbgue8iy92lhoqvypa0xvyly9gfd4bjnhrcvr8tgikhs2mis0iil9rg2fcrsq020nitxhff1uddhmqwg3xzbc0h8mztf3id6a86sly0wx744k7rjxwq489kkes52d3qc2kxj55mhazpmknwt0137q7f5ftfhvugrdyp9e5auxzeqhjxeqmfbwu66f6dass8bfk6z6vf47c4t8qx143fdsbfvzaxpcb8uc3mau0xwt19e3640upgf8vabzlbwez63ie',
                        filename: 'hlj5ks8nboyhdf64qrweaqwsarwu3ry3ssb3f5onjsl7f9roq38cll3jzs162ndytwj1mqiysfbhqy97yytubnvfxunjqk8slknesiggvfaqbmelb0d8p18gg7o9lhdjo6p3utvfpyssejzzit9gvg2cqn7gmwx8lm6826sc7c3diuabe4321k3p44lmfclfoqb6mvkqietou0oqy8hwzszjiewmfrmy4alwivc3iquzei2dchfkmo4550o6h3s',
                        url: 'nite95ftxj1vhxfwqfv4mzftw1l78o00i94gozt3vupsq0l3kjckxxusvwjb8up8bgxe9t53emsrcohglcpdbfvwy40k0xko26la97glkmrj4m61ap946nas76sczqgodbgse62f1hkshq3vs6kpbelmjizfxxyokg94zpuuem4rsotykwiuuaos0wln5m6sqsupkts2h5pev55itcckvit4rwlp253w6l2hdkak1y35zlcve3n3uv0j0flj5y5zmckkm13alxq39llnvp0qx3broy41p278zv31iqz1n0t0vksc6nf7dbh3jsbj2e635xw922urrmjxzv4hww6yjrfzih3fk6299qxz1i93bc9ah8uh2kfjsth1i92qitiem19jn9wfcdxmsvl3is993p732o0jud5y9r2gqbs5yyiprvyyvv505d4jxsopw5wid20hjrxjf9y605o35mlj8yh38xe3yg2yky6c4m1ptn2r8hkt2r47nc38emzn1oewhbng5ioth8irzb91mz7drx30iakt1e4vve729b6vhexwsau3ctsdgevsnibfoi52mxk9yzii03e92nn5fqrhjviu28wv4mawzmemo8vu7tle83646owr91cb272mxg7p1qijsvonnmotxsntpljgzxnu41ncgqhmh6zqidu7i8cefq1k4o29awpaplya204m253j759wcd0rttpjbzztlnjhvx8rvlol8oamkvxwr8z12up7xnjgt49qc9t79oo47zov63blal58847f81hpq02rp6njw1axqwiwlu5u4owvf4i1pdtht3e4406n31fu48kwqi9gaow5bxutjri6bazh0n7199wgy3dlbkbzps7vyfaij79jupm5z7914r11lrrr0h6cjf94bvjtg2vgt5j3d3skr2vqipgmrmbn384xjp8tzsz2wo0n2hz271250wyp6k66zzjctvilhvldwpgpbj1bqme59gm53dz5k3vgfm8i4i6jt0l2b145l44r',
                        mime: 'w47f087ex4t7sf0d7tfhyn75q5m45ysvgrsy1xoxd195rhvryq',
                        extension: 'lthcdnh5c1rfs2ch52mf5fxbdr4rhc7l1q4ddw40x593jqxsgg',
                        size: 7536267829,
                        width: 701153,
                        height: 764016,
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachmentLibrary).toHaveProperty('id', '2ba1aa43-84b5-4e3c-b8be-0de3cc318ebb');
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
                            id: '6fcde379-840c-484f-b122-232820899d13'
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
                            id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentLibrary.id).toStrictEqual('0be4fe93-17e2-4291-a4fb-c86f1a93a9e9');
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
                    id: '1522595b-4d09-4bfa-8c23-f807d77f11dc'
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
                    id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentLibraryById.id).toStrictEqual('0be4fe93-17e2-4291-a4fb-c86f1a93a9e9');
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
                        
                        id: '616b17bd-4a57-409c-bcf0-6478702da5e6',
                        name: 'dggah0gqv97mwh3w4rlo2astzsv4pay6vh96v45tc4kwy7wgeesgoqxjiwpm2fmirpdi6xx8vxtf8snhu0rdwbxpbusyf4twb752rw0oo0fk4u7kr8hnzzpkmw3n9xovoq85xf99aaovd43htx0osovmrgazkcmqj0lxqp3j1h3xigqxvxafjsh0gkrcy1dfs8z8gglxc5sp60ss02ol9lbzkedhieasmd05lqzix7b6dss12b4cdwt6y10xfex',
                        pathname: '93ddz6s8pczpyhjwc6owhj6dtutpjoi50zldbxmociitcqo61zugg4aqcosqhozquxh48q7rx039umne9rjh6pbh0rw6n3g4ry1qj6em9pbil4o63p18qgf6wpto3ck8aoz0rzkb5i3pumtmka8nx96gpmr62ye66rjy6nq349we3rr9gb8h6wzqq1gxvjdjss3p862r835yxuwu5xq5suemp9vcgpzlx2pjdup4mwh3jou39yvty6u1e6qlza8262974e8rgcfjim8mbs1e90sany6dwel27qst5b8h9t6u1trck2m2tknw6zf72wiwtq7nm3mpknzvqeh5ubem655a2uijtwgqcb9b36pyz039th6r96hdmj1wtunqib66yd3nmzg4qscqq9g4voi1gkiictqp993ndy9vt0rzxfbf0d5j2ng9j61vn9tgj31klpeipuwkbyzocre6lticx4jxg6qq8uxnplbtlnmhb5oo5we811m92bw8tpjyifzz967ur4hwsabj1ceedi2ffg0tee2v29x0zwbyj5a3hohw724fcpgct6cp6exc2feut4l4oat1q0rwbfrjo75voxyoc6oagykd5r82dwrwvly4xcl8ki60rzx1nuedeygul8p60e9tkw9o8foth2x7pb3km1nbte7jms0emcuunf8ay3wq1iag9glwovbras5gadmk4f222jpmi9cebe7nygkcnh4ekaysvbzvqhbvr61atq4kjog45f83x9ix0c6ohnozuvj2js9fvorhz4caig2p5heog7svaq033ru995hteuixdg3bv712xzmrpnynpx52fz8dsvvzq2uf5m6zjtw3qjw9xtoslmqc68ge4jnm1qy30ycwuw86mz7yxpfi7xdklw4jfutx0om6t6znedrjepiue0ac01pdulfy1nbmr402aqofanc8ogqp82885ip5plh53xs4ksn1ukcq24eg6de0ltri627ji7r4vdn24anmk2mbovbd8d504fif',
                        filename: 'djo5rs2n0eo1kl8sz71e514p9dsvj0q4d9jbo6pgagm8doim2yfj60h7kwy6julrshq074mp7mbjubr2otzdx7f21t8da9wlxap5yeuicrd4g34n3g8c9cv2gw7tn3knkqx2s9ylukg759av16im0x08iy4mgnbok5vnu9gv9w51kxk9gc9ld7oghpw4zausph3h4hc9vx3lo6w8bma0zl2k05k46x56ecvj6l7j7il8j0032mxr25asq7sa03e',
                        url: 'bxa96olacbhk4cci3fkfwpmbxa9ql1lhwnky2tvmwns9rttx7h0dsg88cbnec1hlmqk027qralgi69jamj92j7cs3jp4vzrsmaj7g05j8xfxnjwv16b778i5wgz2kraw7rhy0dwaz22nw17xpc42r59e86261b57sf7ox3ahaekvea9gd2w5vsu04xlecqvnb67xud88vopbz83hgjkujq7sgn3cpw87fexcqadgcjjyrnqsjs8j893az9w9wpfcymmhqbq22ndrrsqzfoa0ghjwc62ado4qq11fskxa4c1bi16k7y6jpslo2x7pe76i8865g5d1vgw7er9z93hzeud0jpt2wwxotre9n9euvvf16xlqi3l4f0jvpa5c8s1skl9dden4rafjvje0xz0cthi7ftybyxim293cbqaxa0tyy19mvr0kx214dp54jovzm2ofznhbovdprvhxuht5ilvrb2uohd16adc55u8vj37ocfkdj6ibn18yo8kaa6cr2mrtbye6meg1wj07kcsbze6nmffxmeo1sc4wip9bmlrwlzno50t593ql9i2abp5530wrm8od0qof9vvikbhcvc2yifzg2juuaxaby3sbkxx1wo5xvnw2xqbh96z1hqcmfqy3dhln76t9g3hxxaa712hlnygjmrk9cxb6df42f8zzuxoj56nmim4frbcaydfp34cp9h7q5w1cawxfbfbu8d8ounnlyumhl4zqwxpx0qwppf7mrpem7fu9uny13w1zqegybv5gr1cfsl2cnli0akdwbd6f2fh2h33uki8ckh1s4gz37qzj70cr2tp42jt8humha6s7s2s38vlfrxfzsniob4phqkzzjcgasp72191oiyw9k2q5wd9t4ndu8uzv4x1qff0xjne3o9h4ja189z742mfhkgjbtmjqr62q4isqhxqg5xegl6jk4pf85nlh5qmm1kevd647u2zob3jkyz5yosntigj1nafibx2injutsg81um7g44d1okxp3umh',
                        mime: 'sc2rtbpapk7jcw7nwj1ueo2vdvb8glvw522cte9td2zhpk2ujx',
                        extension: 'xngtogii6365a7go9eywa302nm5s51czcp1rnxiwvvkoi8nugu',
                        size: 3976029198,
                        width: 234354,
                        height: 656043,
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
                        
                        id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9',
                        name: 'ywgqbjo9b2m1f7arigc37s0j6lxz7bnh0x76ogv4dmsu6q0rp0m38rjakm42j918d5i6unqt8qhko3q5d4ge5ahikdrqzc3xoedlhkzbg3ckatgu171vfzl6zmrioj5lhdl7qmk9atm2ec2o5gsbqp2wr190ot1gl5gpdsndgah7c6s6qnxrzome3kkavhwnlb9snkztdbmy3gbf2fsg498elwnddhu769ugmd1dy86ujgkq1q3198u5qd42244',
                        pathname: 'x8wmfh04ngpe4gkplpdq6aqspgi2tb7tco9xgu1j8ini46trxs2g9wb4010a0ueg47sfj2jhclrwd2dzsd9riiytlyf34ncambqto4d9aimeamv2n3mawmo1g1t535ciq2tsi4qksz344ngxwatuxdhvyvmtq4i58651f2wv5sdkn0a3buo18cp7myeoskmjyzvbxgoe3mdqw1wdw4171litmx72s0vsrr8mb551jzrzeelgmbtzzvdo6w69cdqkeu9siu9iu9tqvkpui9ud1l82kmqvqehl5g7qwfzmerjnl2055ww162k7zoa3yxibu1b0ekf1qifph9iktr1p1kza64ju5rsxikksxjdy0f2x6w0nrczltf7tsirsern3rn3hw72mv7hno5z2ne2yd9a0i7onk5dla3opxicbz77vgave6u6d111ow6yxh3ajddrinhbfc9p51a1ing3devmwitzfdsq6zabwq4q9aeurfmq78wjdjfmh2lwakbmp46px2bytlx6kvldy1q9jcl7gj60ukrce4rhk9mnfkjec1jzgt9xdzvvfnt581eiaecqh72zy5xuxdphk7czbayhozvp84yyq67ti7bhkbicib29uaiu0mivd7cwn13br5s10mg65prr2e1821ai20j9z8yfnxkda850jqg56wnuk2txsgt3hqtez5frjqjl6cvknd6dmg88am8cqb67wteg4358ss195pl7cmwknq9drk09qb1t4xo164t5c72bswjch2lzuzjmvwr791jgj4oidtg4hm1pf12ntx2ttpsgeaqx2dhfrdeov03mjnmhmnaq98nm52vi79wj7foy22ywnycn59pk18lt3j6joqd79mr43lxwlekhzhpkok7muhtgua95u7qgk1797hv36giko1ydo5xsudj7kelm330gji3bboctmfjf947mj7u1fxxqg03q5sk7qw70p17zf2fscpctjtf9xybty50a3znoec8ekkbktunk91tgifz2y',
                        filename: '7bg6m2hcv6l0zadfouxykqke6186u2hvyzoy7uupzjcfh9qrm4oq9i23cdsul3qiwhb4u7qps7o69t7xhw2biotcof6j15b06xhqyprr2r4bof1o6b4bv8ccxwxw5wdu6pskqosh4uw897a5lb14mwj8zlbkan5232b6a3b1x9qrtlaa81t8pwo08vtwt91rh4f6y1x20ot7xu4pv93xk6lqvc7h9kmlohf5wsv6wono6t3ctd5szi0lnpq0lg4',
                        url: 'yuipzyzqwe5cneinovv66yhurxqmh8cycd2gw5cpmubo0jxuygr0nbofqz4v1luayn9n8zku7r4j4fbcmgrnhi9ixzn770vz9z9n07cu6iyu7wbpb1u9ggn5awjwxs9yv7oavj00h84e66m60yr2opsa2yvsfgctshgauim3q7vc5ndl9nmpt78ydcd0m98kgbagmj52zr56o8th03omfbecyba1gbk9cpsn3rw3uu934ip8e5a1eamaoxnmsr6qplrpebh6b18qdjhnljv8gto0e5ig11z2403cxtjf9ctkp1ilb3k6llcg0ma1iut7w6np258zeriv9ifguue1zarh3rmcqx998z2jkc2kkgmw7btj5ub49w0nh3jt3kx56wu45md79te6flubnrysmz5tug7y97d3br55p6u9llxwlf5wdhe2e1p0bebnxctx1g6yz7689g3vl72gmtoe261br0nk4iktaj1s6ubo7aohft157cc3jh2zgeltbgd3e0iuwpv592ix3g8hfql4tmy8himxmt38bwea5hr040ufjoev59o6e7wwh537jullv5ce0ub3eih3lld0v0ieslvm45s1c9dgp4w74agghg9vg5vkcuwsx4b14h28ev55453e8xb1d5s31w2i0jq83nmv7qce6adml87x67b7phdn3bpqvq57l9j36pa87kl4vyhfprkgfftnklost4y92fg62v4ps4nyl598bse36l468vqby56z9le1do2k57zlxn3sew9hbyxplukvjrs7rzp54z4cwig3lnddxvzozf7n2053gti09xc6tptesm47ifdr1s34lwql8c0jdullji337b1ziiddtosj3cn9jbylpg6bbn8qrakzz6yxniy02nvi977y94lljkfc73xyadmxkcmonrp6rkwxhp5nmu9wnmc2gx0u0rw3rycue1r8gwfnx9oxlmwe9opphsdj47ovm77jq4b07es8kkz5mkm3unoxj743h5lkvp73lo5s',
                        mime: 'c7gnvqnm3tfmpf1fy9mhn5xfpvcnqjiv7revlt3a53f06ku2jo',
                        extension: 'ztd2hpxgceiy8nm2toio6htdm54892r7wukn3oog5hb8k84fm1',
                        size: 9077870881,
                        width: 159806,
                        height: 595406,
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachmentLibrary.id).toStrictEqual('0be4fe93-17e2-4291-a4fb-c86f1a93a9e9');
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
                    id: '72188bbb-c2ce-410c-bb96-2b2b14aaafbd'
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
                    id: '0be4fe93-17e2-4291-a4fb-c86f1a93a9e9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentLibraryById.id).toStrictEqual('0be4fe93-17e2-4291-a4fb-c86f1a93a9e9');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});