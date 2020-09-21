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
                name: '9k6fny0uishwm25i960zopco6st654f1qrfsayjbxatbf3y3bof1w57qk83mg4apr1nch5ve1d2rnnen57ssxuyy50m07o7er5c5qxfkwvr9uo8pyk6s2f51kasgnc5vf2dspr41reahf7kmj6alx0bcnmewtxp2ddmzs3ssdfonv0hcp0e1snijcizpnurnb47x3kpxkk6k9xc1lwosqsbqrvhlpr3k5y8v8jy2m6e79kytr1xey7jsjhxlh6a',
                secret: 'ftz38a6h6nznyyswbfss3l8cbjihme6l9q3mskn9novdmp7drp08b9yd3qnce4e506n2idh5a4isd28fc16geu9tni',
                authUrl: 'cvipl108fcu1rxncv1gi3w0qcjgng3lq931vii4374j2aq6lwa2vkxcqoroemcih3l5pip9nrl2u4gscju7iv41bxyzt00lo99dquw99zgfl9fgjw29pmghsicilntwrluu2jt51oy89f4ppfo9flo8ju7c0sp7mzzx2gut51zvo4l76kp43ftk92ucoeurec0e4t49ch0f6kiz8dqx9redox6khsaww9pzz5ogc7ex5n8k2rw9qej0ziow2r5pp1g6jcrjc6i17tsmpjcf9io5487vd3ts4t93u8j8rqp0ajwdh554yduxy9647fc3gzn12sgpjjwkxppkbuzou7e5g4gbk9ln5e7seupmnktkwjo36gy95dpfig29trqu3u1ojjpgvzqsbjtkyp1sk7653ek8067830wnbzxmrk4fvcd775m48405bqlx03gq20qnz4x68k8bzzgc2ya82fu8d7jtoz3ktr764t32tk8ztyq747nlnyoc3gdb80zy2loiz2nmiey3ztx71r5g2r5fkvkofyqubm68p7fijf0ouia60d6xj8wosb4wa1lfpjiatlub5ravhpmq6ch1ng9efrfwyf2ijy8hioccl1skvr2byjhau02ljss7jkd88wzp7ttqrg30dkye4mk5gmaj5rzoavku2vlz0cqvdt79sz5ldgwps52cczmlnufwie8upl3567oi08yj70yguam00oo6mcqzyob2pjmnhzgqz5w9ygi314vuapombv9jhdw1zh97e83zdbh5n0gcz20g8z8tkt4f3t6zpw1roe3zmrbua1ozuh4ziiaxcp1a697vhks0l0waq0thvqrwyblri148zd3ni1ulqhe2tspydylwtotvd0vttztiza7acixjc0cstjv0c3dknsdda0gqdld30v4i30mvec54a0hp3g32kh0g1ucs6zvvt4tgjvdm6mkpnzl1667h96frr3wovi2jcok85j6c00z46xv3044qdwzerlpkmcdh70z7ialtg4o8ak07tm7pt8meekxxfcvxtjlxd96emsxe0n1l542gsk773fk84vxmyqm78d5m88tg4v1ewra4m3lao0dq8h0re25yhhc9otpmzr0iyraammir3xrlc2ic046f48xqz7vlazoelg72sb6as1djrshdukzs24qgaweyrzozxlh51h117kjpxplgrlxcdhqfccssltnd76316x1v19ljq75vjqkmtpv4g0r5la8u7je4n8bilzqqh3ulqegkpdwoqiyfabjex3z1qcqqi3ya630dhdpl2gua7l83zd87sz9x566xtaqc4tzihdgdqj5zc4regaygbcu4u7fe0dp1ay7b5naxpdpvw5zeieu5uuiz0u45g2d82qy2j2rs544xo6bp0r8sm5ewudra5kij3iqz7ldfrluevlvd5zefvwx70f6pkgit55xkl9eorvmxeudvo6qdy37pozh9t9wm2pqlzvpqb33p79v6hk4ypioyzp3m2d0ducvk4l0dyq85lj8srkw0rg8ynk0k9l2ijpnpeovh01c0siahm6jbl97sjyej4dc901cx682w2lm6a0k4jevsstan78n7o1xdsypkjox2fhjces4buxs5ornpdlf6t95rm6hniscynhmjkghlmno0wxhbi04dp74z8u4kzpuqq7wtg8pqjq8fsc34cix9eumuuvu5kf2ius2dwbqpd7e68bf3519cw4ymatbfwdbk9qxw8qpmgp1zbqsfc6th87ai8e8donzidpvonzkhc2y7sbg6rini4z8mh7i40yrgsx8rzv71bhfceaouy6hq5i3p586povahpyxm02rarz9xhuh0ef083qo8errki2yhvxpc6nkx6zgebdbr04ro1xkfsk0yba7yxrmxg87uok3n01lownfrjkys6mln25k7xw7fktx1xt57pymdkvmngzyduc70taji1y41ieuckqjihdnp4w90nmynizlskmccjahohj5xk6vindwj8z7siua239ww2kgbw',
                redirect: '91ip9pzda4mfyinxsl0e5t6i872jwg80mjqba0hdo256063gagjqw1332wh99t3wm0dd27ky0dzt17rmm8sqi79rp7b76sx5j86axj0pg1atc6b55jxn9s4bnf6ei9leeunqxphvnvz1f6vdoqdy26cofcmsoq8dwz7yl2jvc9b1adb4nkvy321029f3jqtlo81dni2k11u3hgqwnhwjsf9qptoftca02hqd9z4km6bfcvegaape12t4ng67106u5mqtdaq41iag3sm01xfvzyawl1jl3ttnym9kmhohewuvg6ta8a82yljqmozsce6izm3wkyrewwo5rau98jkb52ddgrwr6fe5rlf53o3wfz9gx031zstgg65s05rw09unxtt85bzo4dfeoga7ksqk4cbxe33f77ny5hoe8k780nxmc9rcashncwgvbjn85o8xlkmu8833ut55clunaggwy2edxwoq7o4m49a00mxzvagyvn8k07apxvrhrtuowwondkxz0l29vyup6itxduh3vhn68pybjp14i7wev8nmqb27usrms467di2ycxpr53ksdx870k54zvn6stfz3gqwd5hfxmq5i794m608dusqjc14hhv5ttxkfx2qiaioctf72t2tx1klw2p7jbqgykggz3a5qdvn83wjbe2yvicfmctznu7jychyku13ru8ada4u6qejv6s2p1zmzamdoltc84rb6k9ttcra1gtnbj1jlzxekf7ldz6jfb10x9wef6x523f75m0e3cf1xw8sq3txldkcf16t0bqnubd3zx6g2z57hftevh7cy3iqddckpbs9jw5l4osxw9w712dnzahgc3jma94ajsris7rr4epv2gkdikaihjefzw9280g2j7t4879l0nw34sx4fajhmx2ay99x5pydaf5blt6i6uek4nk9h9d51qqjmv85obaqilbrknh4dlpfcsb33u10p3u9538ycezd8nig0cm4bf2jtzmmgrpshzqobxmceqrxn926f5m4bnoki90cm71thgr1e964f0swivk1etrgiznuw6mi4llf6uo0hlvjqq1y57xbbqfmc1pib5a006qgdu4b5ezxm0ef0wqvzxklcefeltqivp322q6ckxv60d89b6qq4rlxzzgtq9mswwxv81opzfezrsmi8rs6t5e263ybafc638gqk4no7uee7n23zxlbg009xaqo4jrapmj0tcz7dig2axo0ocma1ejr7k3sd3n972tijmicnae5me06p5u3x68zipfja7u9phrhnjkh01de5mnsz3marbvu49lwc1cccrycl2i27hg8758pfhd3zkddghd5tdt2s3clcad3b0u1vzdsws7s5cgf2ys6mdebwpzjt00qme50nw3nx413v0hgpb81zmsz7s12kxs9ze1oprks318akvp41sjwxygw47qilywzy3a44vlwkgm915ccqrxyjliltt2jpqwep46cdx447uc298rvoj5xgf7adtfu6mf41sgums4i6yc23ptsrp4ow955jfqtgxoaij06f75x5fdnf1nua1p2oqqzlhci77z6r2nnxfhjsqdbolx03z2dxq3gxmb3xjbv56ybuyf2m8lb2pnq8v78yaktpatoz328nyyll8uwtmhpvkyckuyun8p4oafjlx0np9t46xnv442hc0mk694jn7fvczskygjdqaulav7r3qm3smjealry3cday3eu53t6ybsnp074hkf18ofk8l8hng3t5xakzp2bhqkuswu5sdjwgc1v62fuq5lppakutb1247k64vukwh2oy51zopx3u19ge4knxs84aenyf0qiq6b1m9nrydw6yzohvtj6g2qjkz340t5eh7vsah49n9ddzih8ua9jbzzbs2exsdno4o5gl7ce3pj8qprv4wnzv2ro9kif9hab8ii751hluhz3govlnhsq3kepk6prp4a6acz9yexlav959t6ye7kyd1dmmbr1alv4qlv38nvyi23ui5votnxpe84ibfano9wiqkf9',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 4358560377,
                expiredRefreshToken: 5047489156,
                isRevoked: false,
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
                
                grantType: 'PASSWORD_GRANT',
                name: '0slupel3496pmltv0zxv5rnczmhktcxwp01c4yojljhnzy8u814yyg9yhfnqdlw3ev44mqfpkvj78s5krxind2nothdz55coxncbd84dsbkstn08cmoemfcrnd3hy8skculs2skcax6o2l9toyyi486g1myx817p0b24kbzlh0ega3sw0ufn7wcukqrdykqv13htorid0ja56bqbzzfh2ktw96m9urpfmbp6dx79celf62h2rgor3ggtr1e896w',
                secret: 'zdnhh7v7837hojtvpuy0natwoujete6kgxdb5cm2d3kh6znyvb7xeaj13wi8zq4olh3itlpj7umciqkaj2adpl143b',
                authUrl: 'r2qe2ch69pl10y3d781fum9th0o9hu6w22763t2rxk7tl6x62fb0j9p6cnzokvpta3k8su1mn7g7cr6prqz9lpu0c5agillbnjuk38xodi8onyzumk9fvjqinfrwvrdc3mv6ruuzz04x0ioivnyx0t0co7fzf5cs4ftd379z3re5jdaljv2i0tclml4nv4fb0jq47qm3p2eiaw3z91umolqabloc9zfyqontjytskhkm9uvod91wjxvaqx2oc07iex62noa0404leo1o6md8hl4thq0rz5lws527kfhk96b4smkdc1otgjdvqtd2g1bkq1iqcc52kq7ph2tlu5zn2b84w5bcnbj6w5na6ayns82snywt2e9b4w2pztzsdd2mwjq8n9njobhnpdxqo31pduig6g8y1f7fm1h05toi0rdfn92007oze69lhzkfe0dn0i0mkjlfz3lux0yh0rwhtr1tqbrm72kd24hm1w9be2n3anhahkx8wr9yoihme7fn2gmv3z35d13ivzrppd4y08f1lflkhemw39x7i5tp1b48wq7vjidvtyer9nbdtcz7ukmadxnf96jourly4ta7rwnv7omomxydfw33bwpnuvnuvnbm62sycmk5g3feudav13b3t5s3srpb1j9zmibyn3ne37ss4cdk5w92vldj2saoihbia8eoblfm3fhbopuxp8r6upcckcuesh54roz7pype5wsypqj55fp4d1dq041u3k3m6x86noaylybvxob3qqmfay2lqwukl0atuuu9okre1y1pezmxe3r0e6d1x2vy4q71agfqxtymhq8565pnsrclircyy4ryao9ggvagk4yso8905uvyrya7x3g2er7387cyo21auleqaw0u7x567vspibsuj7mh97qsxwjnumbhi0st88l4oi3snc3p414c9sf1bs7jv860sukrgyxucbyrcwunoeylxjcqy3hbi4hzryp64y5jkkz4d2tc5lmsng7gfw3stbrbjmtd53q4k8zdeetfbhzqh0o7qe9ag0wmwipww3jr3ec7sqcbsp6ezni2zf5lln4nuuvhgqutsr6mdu42d4nbcqwvqtw6cm3yau4b4qlquc9fz30hn418mak532stnb7metsgqcfxsh2k01w5kyqthgruvxyhgby16dslh482dn4pv5ylwudo50udiozmbmjnausq33eghhjqun4jqbp9z3gohl39zgofiptieo2dnurnxt1n3yruol4p8uq0sq9g81eocr8y36j1xshm5rr5h9poszcqr1epbz2ur03lw9x1f3rwo25n2hs4a39r2ypgvmbmhh4l93xutxx1azwn58bd2egx8j2xel55jksfezdhu8q2mkn8kas38mt99tjhm3as8dwp833uoowxt8ufusoojn5jsjo55wg4jm1w02p9un9wtq52py7uewj6mxka2hc3ikj43i7crg1g0if9omaacqfu6huw3b9kg5nowuwprk4ux80yk5nmwvlqsqndbyyq1j3j9ghoyvwopoc33v25lilfyhweeo6v0wuk06qjlljqo52fhn0g0l6i6mi72qtvlnzlyoizqptai68lwdr4x27kn92nx0x2fqk915g8ug5y4rksd3g3mh62sjfa0u0vtvqhdvbsxgc9sofkjzabtoymbv1x2i9jo631cvhitznox70cw0sodhafh5u9hprcqm81hszogzv8aj13djudjrz1kl76kqd7w16t7sehrf1opxfmdh510waakss61fbr2tlyicb5ca702fsxvac2wbuom4n2tr3tf3cldo63gqrjyf71xneqek6u6m8dhhh89ovu3rkrbdarj7paz5pdjhnbqwz50l4mwuylcjhdsltjjf6ouqwm537dce386rnn75vi3ggbvghych1xfzn7abu8nll604w16knb77i0csyhyrtewmoje076z12jhli22m88r3d6zgrg23xzs051xlptc5deljex5ra4uegata45rty8cetrvdywgqh9rsmu1jnm',
                redirect: 'kxnxfeb7o6ky7org738bj5c3tvl3hh0gibtm7l08m3rby9wvkaqb50rs99jp3mgwvqv67ait1r3dbojf3ane90h5o9u4uicsm1lklu74kbftub54tjwjvdlwqddd3spr8jan7ar6d7vx62egu7wh47fdj0wvt2e5asoo2bfn7vor32djb4r4i0njuzu2ems4s71uvbpfr0oj3x09quu4nhg2lk7zxv02qcswemke36ghygv90k0j22uth0ohvhqxx3eej1ji4tindccjddq4jrzvykmt4atnsy57iu11z6h3e6ron2z96w1nmudvjdlj204pwwhwggqox8kfnxh7w9ko5hin0qhm2c54n3haxtxrzjq20ps96z4fhnr10jkdtle873qvjoah4s7n3s596jmte2w9xpwkc9n1o3lqmle2v5ev3z349ss5hje3iw00rq37btv2k0rtobcjllcb8pq1fsbhhyh5nqbf2jlswmhyrn0sxwbummk9l7sdp03kcfw4tmo9jpc39fl58zkhclef96kgnhvz72sbchd4glv89rs02ui4quw37d93165gdmtmp5wvdxeambe9acxa5ato002a8hosmva7vegoay6mi6byn267d0jjlsa5asl2a1bz2v14xha8gk7c7d8jj2ywofayadqyp2q32legp4rujsual7xqh4fzaeyeuykne7omqqu8o2vpi5gjdg8a8lj3znd2m5n2ms83rxumft6bdmqtwthosrfsg4l7vhkbns7z88ci8xj9dalhcsyznx2evnvbkc43m2hqi692hss5p38nfgpz7p12ka382xfetryn80ic2k2ogksmsd44q42sltmrdyveqr8ie0j898hq8ttyw4rlxzhhqgm1oboewqiyb9ln8aae838at4c2wjscoxpxr95fw6p5rijjtxo4vv76188u3mjbhdo00vq1o3nd3b5qiaa3z8kbj8eh9oltmx2a7ah7lkxa2ym53rbubxk6scwyafvec0wighwvfgg2hijp0xkk570aya7cwrm2edokilbqrfrwttuo5ux8oiyvsuo2gofe2agjfyb120qad5npmhkfbxrnnukhebfqdk9ezibrr3232xdy7t45j0nerbuzxaxm7i4rtk8ifu7x5aavkhl0c8c26jn7z8xe8vbuog4nemuwjqc75qyhb85xp7j8yi8nocnektijfwp9mbe252j1cfkafais8d9ahz8zqe02btzqx6ac08k6n4xzn51zw866ye8g8gh5uw2g0ke09porg0jiish6btelyzgcbb53lavyviqd51px4lnzaaldz1dsctduxmyueld97le4k0qohigg5xzt5qwl3we59veyey3pyvecvkihhpmc71uglr3qb2yuoafrd7jpu4j7pcwgyqtsh73dg7jf4r8ac63ths3y6pmy7lo9fx3uc3j1f60a3iry3gvwcmyhp5yjp03iqqfynjmh4f8eue8pjomx76lw4500xtkt91wgtzual86qckf8xqmcqlvwa0z2mhaadckd5xaw6uss2551pf205205uyjp7cev2pi430ulxt8ygupk9pt7lh78u25erzw6t52j1r8mz5xk14xtplvblijo44n3zylgi2lurz56nyzi28xspoc846pdjluzk84hsusmck3o03dmdvugs88e8033mr7unqcdhjjy7j32i3qu1kwu9zel7u4wktdu4aap3vk1lzp8m8pd28fxx35hxcs8a9bqcxtdd43dbs4dyhoudya14v1jdzb3ghq35qx0x2ean0gwz8hvg606i8mtk1to1xfg0x6n14jzj7j4bhvd4hcdmctiqyd6am4ayec2ce69rr4fwmzz13n7yaddooqnfnpvg7dlsdhjjwf6j6zu7btnvi0lwqiffy7ulzsl4fn4guf3acrqqub5ykcrw6yz75o3r1p15yy3k65twcobqu4fz2x4b0fr65rygu61gqp8dll07vkjhnvwh9yfrxeojdeovqt5nnw0zhyttr23td3m5r7a',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 4202428560,
                expiredRefreshToken: 3143985858,
                isRevoked: true,
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
                id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                grantType: null,
                name: '89kbzquna86x3zllslan9y8hzcev2ukhg6r90l1zmvod4gyjwsuyy1nr5a4g3kk79i6mqyfk4yb9yy3l24rbw8q8tfvffhtxe8sjr3fkcgaw1vavgp569c9elu13r0blqv0qd6doifnh6d8iqv00np0vwei1j2sgeomajdqu8m6up5lq504pcr7pda7rxkj4wxsylr17a8rkyxhhj3fkvydab1jeqcal6t4t2zd8ec9babmo1z6r8p0ghsiqaiv',
                secret: 'aucju6s3mixwpz66gmb2vn94qnen4l0ys0er8akytbkwypfuifa31rc8x1jva0j06ggauwgsnrej6pddnx8ifffn7l',
                authUrl: 'ia2s2rntcpqir3takvq4eyj4cm80mzqxd4i9tvf782r99yt3t87gar4g4awmo9bqpansi4q3gfh4hb7dtikdgx4psktz31txd0emw217xmz69p7nzhm7uyfp3azus62ne8xhmw4b720t92baipmejerfib3wtru9vbv5664cz3dcmn7h9a17ikh7dtk8gw59fnzh2rhkpi1xdmke1untjy77md38a3cmrlr2lgw8dz2yxp784b0hx47j1y15fqzonma927psgfmdabw2311n47ujzi5sqevkn8d36d37nfdz8y7hfuyj86kyqewggg5k4m13lrmel16h2859i2rivwwyf6feg8qr5g7tgqvj2394f5rzjlepzf2ftec3jrl0h7faf6tbaahpr40il8mghc63iyd0e4xfmec1czmpzibr8rxrq9wco10aowdkeiihhmddxaovi11i4wa23z926snz9uh7rtfymd8jwgppw9x9jxz1ea8clbrag8w164kqliipttrztpstmw3r8d4dqys97pd11yoshv150kp29u8sua6lxf8w87e55ybwg5n3djbtjh3dg3a1guvx5gq3fwe7at5olqas9o5ddl1oo33wjrsl4lmrl192gn4q0swyii4m3uh0gov8myw5mp2r22317dfz8ojksw8f9doyxo2vwdsqfv29eauvg7joqvl3yliyhh8ha9t6xx0r9ap5hzu4yvmqly1ndnd4lkdoj08io122hg23mmu1r1yhozauqpsxo1t0shdesroiq5ycjmpwitxwcakf3gv065waxftdt7qu428bk24f3hurndrlvxv6ow3upwt6sqjub05m19tk6h3zit1hm020c1j2bs0n9eovrka3lcynt92br84mgamkwmyubyb5t7bz328xnmccf05pc56ft8vig2wb15ol1mcd9sh5kxs48rfw00ej7wcithuodrkgzmsjuvphr1uo16b60hh5pw6hfbmby0geg85ho8yxhyuclgr28eltqvppusw1j1nbx68u0i8e8wkqr72ti8icce0gzc3r1hbuljd85rjfiv1ovyahnqxlabtdfw2lg88s7rahc01z0abljk7znybta7821p2uh38o2vn8kjnwztued6i1vcgseqv3zfazwpws88egqqrhrnnk0tofex80xepp63vxi2s3drf91nctts24rpjr5t4csnmym89xoodmdgr5bym50q2wvsi527esg26p6fmi708ivfktes8f268dnjrvdr4flgcyr28pykokr5pblf3hlqbaul8ojfh8kmc0dbmf0a7kfh2z48pgykwpnclrafttsgpvh8xbsmhfi5f2oggnupv0pheut2t27ggp0wx0aldr4btwrxb90x81t66esxr0ceicm0u2i4hiv9bcexlwf1n6vatkzucl50rykdyylt1y8z2hqfkaz5iejgo0v4ve9nvww6ua0dpdg3n4n02gxa4swj2ivgw3v6wcnxa96icnd6bkbbt4edg2rk6ern8k8evnuc0rgg5rb031ln3yjlqmvi2ygelvtbgkamqy7qgmkykxvv5t1539n9hgc75wz7bv47jxc2nudu1icc0efrdllq8838oarhj09atv0bqees8ol7c2qxbt64mvst99msl5vy6y0dqexgqlcxm4g6hex2mz9gp6ftgu46oe0r7k8u1qz5k9zclw117gocexop6ixw2xoti5h3xvym34nwwkec6j274px8fks7ae2gowu1hmhtsg6hea2d0bwt812rqx0i1omvkdcwa7z5rkwplordwh8btmhdfu6f8s3ny04il7ataqodq8snq0crvwwlwugjvwjow6dt1o2286bi4scovj7mzbwedzsoypktypzs51g97lqhy61hags4x53mhjgyvvpwmz2yw9i1upkpvzwnvzb4ewyo6s5wc68fm8ugs924ul1lo903qyxb0ujr595omxfthn4d4zgkws96mapcrwsmyhpol9jw3ewcb8ytmnoc60qykka8yis54t',
                redirect: 'ciusomcoexbac1na8fno6koupw0kq2q3heywjf2m3vk1sl2pedt5cpckxfakpf1ylj0wo9yuer1jz2grbrtlcr26deo8tgpmhghfhrtvf318s2qwxec6k5xilzd563u8y7bdtw2zir57nwhxocw1liix49r0i0t74dtib6q6cmtpqajwj0m1m7lin5fl387ls1nsr8dwj9m08l77cg2bbqsdfb3vlyxioq59kxn9xkuzcidla5a9wvof5al8pv9k313zugw40am0s9mhzlosz0p1sb8irevgj93csi8dhgn8057ssjnrt78804hpa7bi9hutxtri06fkr9pqdxlfwi8avihztbvm3z8byqib9d9qulxqd43gnl2qkcaz0w1ycap9junx9xv18q16tqrta1dk15hdws9636nyvh1pnzblze87kbjjxr8jh6xc9em1v7clh2yd0mmrocs5aasis8uwa2yp34spxc6yvcfa7ggqiin77zgjao3l5cnmqnkz3gs8cisb6uz2gwcxz7dcy3k0vukwstvanr4ws7059xg9obakfn0mhvkvnjq1evkncxp6i6rm13wnxzy2az7m270uh6tbv7j2pn7bvosumosh5ww09s5815lfv7w3u9tr1qau2d58m17ard0yaboyi5b7wd7dgb9xst3io2h9wizb7f312hs4fgncnic9h63nfhalri70i1bda54ysaqpqp0iusndcril369l5digrorwez5sxbkii7vmydlr2c2f0urfidox8ts8tcmk2iliizq5ex56wrx7dvnvsfpswwak22y8eul3gtrvizc7rxygx6sarmhacic9uv04xel09lfvxn74uus7v7xz1kopvta4fyy6v8tbuuyeoed19b6kpk4mojae6iqls6msc4n256ro41mn2twaln3a2kf642s8e2k1dhtbuy0r9l21rm7i6wwld8uvscmin3k8tkvl0erakfgh1d635kwek6mf4iu2y4io1ftsyg6fbjl1tcjhf1kdjrw8dpigjy00p3r2zyra995z2r6jpbrhwmnhd4fodcsjdg4vngy87xsuz2xi2ymuabq81xfzgummz3tdgrereanolo338tohj9h3iajvfevyzageilp84ti69s3ab4xgnaimgvn4u4w0fc0z770jteujmwzb3hf42kkrrp9uzcm94j9x4dfdw5w9fx01aemehcm25xqs5px6sar2qjrc9c565dhdpfyr56nwgtom2a4650890tbkvifwy9n2yq1le4f4adzd5dg84l66nca348wbdrlpny09uqtgn2hppz1t5u18h9o6r7lxjskugxjsm4i0ztj9bqmdiyybslsbbdk56n1oe43bjsgcuvg7ozgmpxdc3e4qumvcybm5zihcx8g2oeasa87g5r079vqve5nhvp4pngic8c119bxgrprniw0wvmrt1doz7es8060189887kntnr3bd3cmhi39ml6ucwrgn53kt16yqxb9o46iw8favphb2017guw1zre1rq3y1ctwh6s82586z2ozue3sgeawn2vdbrho7joug8uri97b05km1f8z7w6kmyfiqgw7t001rcbbz0mrt0enblm2bgw0m0n0d64z6vgb6llgtigm2purkduvy3wjrrgt46gbhl3ytgzi05uiaa6dz8gc3rjq9vpgobco84qmia431v4dpnlwdrcsymn5o5znxssp7uhg4qkpkowcn2g8zy1howbf5u1vf79mrs3ze4pu54ojqxixngkc99ujw7rbvlk1qgng0cfgg1qwqm91u7s0x5r98lt6ugforlg8m3vgmm1vw6h8vez4uwpo4ad2tlhnntvbpw57phn2kbp94kg6n43wecf2ds2a86gypk5wmgb901uw73d3znwr2pc9bn99tg19r7e27xjlio5eqlos351mqhv7enymhcszv4f66a1hc3lh4ohxifvcjlzdbhc4ghaqpsrzh7a43mmixkjozabqef00a76rltgxp40rrpm03v5e1qdgucp4',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 2035221613,
                expiredRefreshToken: 7291833184,
                isRevoked: false,
                isMaster: true,
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
                id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                
                name: 'ooclkdms5t9y0tiad7t4vwpk3nz0lpzjsyu0dzubpf3em6f75ppi17i8u80sc1av3delhjcb2lnugl20pnvixl2unfyda27iwzo2i2wwreas58sas9fvob4x3puo6uvxbcx4uryj14pybswhhq94mlh1f3h6mdvorm140xxhw2puh4oqnimdhn7mmkjstlnfwll9lcz6j0epkktcy46igbxbefm81p3cys4a840odxmcesmtjzxypbksd5x97od',
                secret: 'tzlv7322zpkm6pprrq5ci3r5tqzxag3vek29h6wuwtm2ilxcaf4565jq78x8807yn3iw070rl7u2m8qwjfhxmelmfy',
                authUrl: 'o88lqpvxqru6yzy075c8b7fy1bx2w23nj2sdxr2o9fyzfootbl4sx7mj5fnq5n09xbnk6mvbd9lzl5hqrteoevjuzpzxxxr6cdf22z23i685p8uwya9wzcx0u10do4rcbmwzcp0ikfxwl8nwziul7roewxelc5ikwq9vce7utekgpxvujvmsia3ut73wwvr0x3pu6t18y1xm99hhpfxtd7kb59mnv96xibjdbweenmshd7q1p0b4jx30tnugi9j4ipmbltkkfbk9wt1yip41cz03xggxbancxmfstp44nuvqy49affhnk2qb557bzxxp08t6wogze74wedxcn2c1n2tfn9712nkdgmmx27pt9f5r9a7ig4qidoybl6lpdwrjno62n9h11duxvltdf4vg4kde7s6map6ed6yz9bdqhn69q1tu52gd9rlzku4ata4qwbkfdbhehsqhecfel7nsb2b45o1z5kpwrabp836vs09iau8zej579yh9rn2ubsre61xqmzm3oig1pcekxlz7207sg2gb12xmsbzp8l9hq4b37rhg0d3or9zin0l4uk4dzueretk32nxawet049r555uies9xem1rwvxcff481dfhrcenwasn10pimrzdagrbytp0tpbnlilo2e965hu89zob4qvchlvbygviwxco4lkonw2r2wd3miq190rjhc7myj06zg4q72pjupf3qumtohzu3k0c5v7bfemrhpviml2k0znv5fqnzvpsk371tkbwm9z8n3lja9nwi4y3g0nr14k4zobfru80ir4jndebnmeybwe53b75b9f9b3k2xf1z318rljaxsyx8u0fkxxw4hy4socdf1keixrivrassklne48ox1dxpjvjkft5ufccehfrlok6aykargvz9m9v0it05bw1h5doitj4mylfj0f8v3sk1pxsxcgj50f44s1ppj2fwykhi64v3m09mnxbshsxxc3z2fggz1g4s6gzg747meshv0kg56tfulw8m94ok1leub5loiogxtjnjdx48gmewhc2fdly4ma2b11k9flebfymfgjz9h0y1faw6zf7ijylsxf24paebr28crd6yg5nv184syreotsf01f4rw4evp5b3p6kw0bl582c3ixuvodtw99kmr04i2ktt6l40cot05gmthd8ryselvebyjp5bd3dyf1u5y6f4x6fbg023pa8ttqkvwbtdtp6o6ihe3bwd5a0ng4tpdk171kaefwkbwp75390ldp7yykfokj62hwzvbyru407yy47zqxgr8mg4r7ph8o97nwjbu56spb0knc8ernvao6fthucsx33hni8elq1uxbv5slf1ksuaviljelgabssvph0s0t698klpuxlx04pnidimtf7atoxbpbjo8mw78zy0wxcgkmmrzippqi1oqowoj5bmlzjkmzq0273esgeydmd0kexp2gcqki5sm0tc47ey3m50k9clvbnha0cn3zb1n1hwroy40zyzcm5zxb4f79q03y8cpy0n0qt7a9c579z1tnn764uot8jry2vjwe7kt4ybwa2eb510456i8684xn0icmrm0lb2a4ai4t5rgs81ds8aypdmix182o36ia16fb3gv0rvn4nk2yqrvxcefg9uvetb2mw91mmnhk4m1qt9d43q96926l9q5pifpc4g8516tsrim6b1eewdjz1ppb3pp6wjdfi30c9bym5ualpde15mx1cd46rqyld4t50brpt02v2hhznxwsqlkvh6pl01qznkmwqpxp28mgwt3imrpmoi0qds5eanvtbcpkqrcga1brw2t2gftzy1a07ahh2ndob551p4s596w5cbqp838l5dm7pqg90b4pfpe0tnv5s44ifshxo9uvwsd15umijmu4v6zz0idrklvc5xg6qy4lgmv1fre6gt5ejer5dcca77tyfc3ahbzq30gk7urov1gsxhsaord7z0sipt14ggo8a2rglo8ipwo37t2kfn00qpl7t8aj4f4go6usmurta1kacp1f9j',
                redirect: 'dwzq3dbej72ossianj8j48sc47bfnqpr6e0237hshzrchu41iz6z70zpdb08buhuyop8zspwq2grp6z7eilb9wmbgfx88r2ljogui4ethtxy6jzj0dt5yxvvjgrk4cxywx7c44m8f07p6yitfzdsglz6xr0qcvtvp5ov56mp6cyo1s6qs637gdbcqmpvn3vkboeivbh43bc2y336dgh6fsbcpuw5enibarslgdx44qkrrqgqoe5t6gep8r7rza9zilub6ish2gq4me2aoghumufb5xl7zsta9yy6z0zfydklxfqx3dookntty0i1uld8veo29ahrdeesyola0rfjt58s76qovq783pa7x52t2z0kab7s20h1yhswertd7sgym751gn5zu5xx5r07f98ow4vom7d5rfyy65itjqut7lhh8nj3e5cucyezzfyje2yiar7g1zg36oek2wqk5faphjen2r2j8w4s9pc16nc1uspg1ypntm7hajr3565f649a6ju57lu2iw1keay0ur4u9d1r4b4gifudnrgtus5t1pa9muvebaihjds798wquutbxq8qkjp2tz875zcmxxxju8gf7k0k9u8dkgz7mwak6zva6fcilywkuxinferxoe5el5q5jem7z5yocq9og6ovbnybiqj2kne2lxyoa779yd7tidhibskumxy6ttf8rnv2cwgar5l5kxnjkwt0v3llfs0mnzshecihj9ht1gpjes0cl13cqml1y0s1wu8pr81v2xrrri2p6xm4nifakr3yynja6hbwqk4b5dguz6vvoyx53q301srhwojlzkh94lji5o3d047zipg1blqr52859eyvp6z8ibyjzqyqsaxwedyprg7t4qomki6b6vqyj5nkhti6nn2n454ir3z02rfathx03wkodmm8o0f5peg56zolq5fy8rl2zcj0u6iyyyg1dj0522gs7ip4grmebnu9omamvfgfniuq549kc82fjlg0ync8t7ll0xsll8traumv0j1su41rlbfljut1y6ouvko1oezs8r4ajtqs0tveuf9gtxsw3knjjkrnunp14mfyeihyp300lqma6ylp428pmyz2ygbz23qat6e2dwexdo519rzoqwzrqmhlvid2easi1w696tf7v9ixmqolqvnj3ecd3yz9v2dt4un4wqujrx4iq2v7c6cy6o8cfdoug2n3gfqr3172vsd6vkioxy1my72i5tg7v9aag85889yp7fnvdo26rq214m1ha9m5r2cqtupamz4q2o70sacjyns2u6gr4egocjw4iascemw4r2qu9nsgq1nv05ocfzanwci3ixnzjns4c3hbvwl9lrcz4fmqhybhifp1c42rym7dda9fp0uwngkxbfoshkxe5e3pn0e12et1an6p8ps9iw8yrji6v5c5588q0fefnyxb98hnzb2t39vgfqki1i4i02zxni2zt2tvzswhuv8f4206wky17ymdrckpqz1q2lo183qwy8z6lnk3q0ns5rktyfrbh00kxozy3svqba6k0n0u56ej4ctuflajuausrkgjgzflw1335dwrlupcwfoat64bq4w3scfg8wnwfmngr5gissu37om32jh1fec4ys94y6li5h3qns0xbfcf1zqds621ary0bf96def9dzs0ca5dki86zajlm3ez8lf05ny7hkt0vgl25dtrr4tkzvbv5dpdhsdo3b1w87ol1aofqbuoyw87uccqdj5qqlnfag6dii386m552954cay257vog4yk3a7brr7pe1oktu2puk3l7ea89aakk290jw2vs4akjnzminhyhf1i3mt2c5r9wb65yksjbx1gc8vmj48gltiulcaqknljux199396j4uffo91q18zm7yboxa8bo3jbvpanvb9umt1t2r6futyjrepj75rvwjc0q3kwrar5bvhdlu0133o03au11ttqlagxyzw5vldivgrdmzboevbz5qq9l0n77vto2ueye4y2fs0nn4d2pzhip358b452j4qprb2',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 5320109427,
                expiredRefreshToken: 4100682505,
                isRevoked: false,
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
                id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                grantType: 'PASSWORD_GRANT',
                name: null,
                secret: 'x44hbb6qmjtge26ytjwnwo6wwzlze8jkdso4a4qeckjtvhmvfz709yauafd0g7v3zusz6tsu251d8mjl1enyd2q4r2',
                authUrl: 'uvlokj196s701n1mzvhvuxtu965z1kzfhr0mjqimv65d0be3v8feh8z3q60z87s67z0fzvmguesztvqs4jfkbty91gfsgt6jpobgl882fxx6sxs0aklnnc6f6jde1xv8v75qny80qxwc94hgqeafg9hscxcz5xovmqlwadkyoi81k3m6ae8z4qwrpd7td4yqj20toednh5mn8xbdxnxxy7oj3upufybfxwy73apqlg9oicgujto5426torxsxg7r3q3dp3a0bf1kxxsunjtgjqrngul5fjglr7605hwsq3wb6t5q3vcohmv6y9qdp7tkpgx9w8wpu355xjofj0pig6ot2fsrjqr1djtz5va1oaar1m2534bem2atx2p06vquq8f51gdxotfh4ubbp3iole56xf3aa0qv80inn6qzwq0k6owh0m6tik646vlp8ml9pidu6ntl2rnyphs57a5acy92s5d1ajnwrs8qvjixlgdo86f06rjt6dnm3f5p28dpxjhr631vz6fzkwpjhq3r4ftj3px3m95pr205ysxb6srm4ab3khenoepl836r4kac04zuv9t7yetv7sijne8yoxpgrnp70obi8zhxsd681cvxxsyw9meoa7trfsbgoqjwhltd1vn5f49xopohkqe5np25q99gcllzn4d1q7u6ozkeohghepr1yobvg8kadxge9ub0fkw122kggx8ik6wex205gvq3lkdd4u3dbv43nrki0phu81a2i43zyvchv42y3anryuv70efb1kmloxio0pygzjp50g6x3oz6czq76hpzp7jc8e9430nzsj9bxtw7l2lfqmu3pprejdm9ke1yvmqv6ei6g9uffuaeiubr80hpb0byvmwikm17i3p21ge8jkdqeo92pomdxm0asp75qdx2i8ps82aat46ynwf85ffxayzaw08qdmfp7teey2qakz6sw8zen080l6m7h08o7mjltjwajptan57sa1ltiyhbgfkyv4eawrac0bmsozh4hsobm1m3qqomzhfmxyuts55cq94omgjwwqso67855qvzead3vl8xt687muorakplnoj70kq9lrkl6n761gfzfvl7zjqo4xmyehwvx8pczgzz0sq5oxcffolk7rjcgtpxuvw21cln886hvic5vsjvucmis3viogcgke0m6ishqyi5dqatn5utbtojyhk98dovw51l0e8arhlrwlkc7xomrnibbf8o3hhsqia7szt35gg529kxrlbobzgpgkrllvd0iqgsmtnfhocqio6cpbcb5yp6i61z1ouhva25l71h3amrub2dhgunkjy9klk89mx0c5cbswwmlaigkjw5quxgktzziir2238ygc3gfeixmsoc1w8yhh46w6r8lpemmtvkunuk6hvbe58705foxuqwicunoh0urt5qnxwytqt6r2bjbp0jtxgnmkurenr62o0a8drduq33p6xt1o5ynefxfs434nhbwp2if95ddlpl5oyyxrgo81gv3wj4deppcbf13jo54ahwgupw7kf28zxcsmh2ma7475qhvqxbc83byjfgd3pga1jilyq2cckk3yxnq45ta312pgup5kovbxyvv97qirqjeccq06n1jtz4jd1epy0xh612jcznmgxr1bseo4dg59ouqetbg2tapf40n8fkztlmv8fha5stojiq1cyvzyq83khhb0h0ar1qweva8vvilud7texa1gnx9b04w0rr7ptavhpx9xt5a8073ridex4upjwm6snoklxzs7zlvqq9zbv5s9230ygvhwqypk9cmc799zldladliz25s6rwhrh3ab908ksfkh4qbebnr18pnmq7e5d7hnn1lh564wt2oq81n8a4aj96lj7anu0tovb4oeia4m9bofd02z0ev5fkd400b24mrtprbg2p4lfm70wx0issl270ahjtgngd0f02izwo91ggldgpsqg3iu175x7xwpz1trywu66acfcc319liiykj3gf6pg1me7ya69c3a67ripecpsq516d',
                redirect: 'h1i9tz01s3vl47qtu1bjs7pyz8h9q2hc1fakkjh144hl3syzaut4450fh4q1vvj2rz8eb3lhusnuuv5e8jh9eko761ff7qf0fzdw5m8c7vu359sl9bhoo7wjtpj40df945vsllgfgynbt2lbufeneeikbbspechy18vil6k3go1k87ps818x7vbw9hsqlwmzbvnajc5y87pwed0rw4qfxqsjpftgm8phi7onvs99x5290gjkkgrt80qq9um877v3igg8ppibbleyelwaruce8i1xkokpzk657w7bhzblkkfds5xn9hhtltytcqoy7bjwbea4607vmz8xv5fxttf8zoz0owx9ktip9h7peb968v93bfy3lqt0r85uw35zv5w2u5wdrhupywfyrniie9oisfz2yybgewr7sa8wv5qjsjobq3hv98ifhq1oo35r4f0wavya9cm9hy6z6i3qlcx73z3dky63wgdb124xei8dp3nnabdo2k7f71fbgi6z77nku81wlnvg6uh5ruf8rhdpfj6fzuwi9fbjogk81uxh1hm0emxfm318bp53tjp9v7izfyfpjmfa63lekh8mflkf4nf5awecf0as32u6t0uc2wbg1a6o19m5ilruyfwk5veo43z5su85isyttupwnqemjgny2xnsmb4pejyeckqc8ayk7i4orb8ueyp1gz1yc3wopz0l8izmm8olgc6x4ckmn4zvsagd618ifxi0ranys12wt0rohzx2r4ooyylfwfpcand4g1lasf71a8xb5zpgqpyl1l65v84jxcbvzkdf74re0ziw68bydb80xjarznpp6krcvd7zzivcqs162iu6uyhcnwa5i75pm3c0ysk2yrirs4iscs6w4mnajsn6ie2tqzrjqkkwrqbus884cb9w1jphawhv3ktz9s2pqafoiotxjowmo9avgabvqdobtuxs9mectfjr2nviczekyfofmy1w4vpz0ln45p0glgg466ud12cn4ctah1snaowwdvpg5gibxv2v4shofvvfuiadhohdl83uhatxp0z5o3tdyu4230pnh147j9mnwjll202aloxd1f6325wq6mmdu9ytwql1g512ydmxmvma2edvfdx8mfv7o9ytgnrtpn8s2vekc974ul9ii0rhn36mvrvtqyf3h7uhcmvzn7m64hg6nh6h1k1eu94j28cpef9mglcjnkzib8frczo4ezn974o7kta1f0rei0ddlnit4187i5pb404zj1uum5lwb995tp1eusv2u2xmkoxpzv7dnhv0h6zkpz9ax9ztk6yjdtjj9l0eqs8ujmgxt6wf3b13ggxpejwrcovd7dcn75zedcxdnz2m085qrm12tv6ldw8jtqpqwjs52muwflwh3ak0fyf71sjlvdouhzz5nd57sc02jca9kwpchua17qpyom7wsnunqkqptcyj52sixfa1416v6qrc8e44jfpm6gdjk2ck15xp85qynk782ts60h8mkycp0krzwdy7g9dh2y2s7oryd524kpolslbitevf9plq22id9b0nwumn9hqhwba3mfhmgx1u8qrn2vcilj0gaz8nnazjdddw6gw5z0dignlwl0vea18gvlnfgagpw2zxlymb7ir9t4y2hrmx91y2quhwski26me58wucqdqog1f8kug03cx3a5g4xcrqco7pn7ldeysfa0ehvdfybseqgr3xyct6w5j4fo7av16i155618n3t2t8isbwnnq3mzqgd2s3vbvjxa8k7nh32643g7pc7818ag0723r50wi66rma94ggu4nhjjewnoz65auzucrmq9uvoxlyzq90idiq4y95nfmtfsvn73ggrbibt3s9e6sixppgc1t3lxi1dmpf441j2p9p1th4hlk1kg8yjlyfhmivrjt6flw0rxd0nkt30wti3gfh0q3acuduz4on7r3ha0bhibzxd6tm230hzcuw8w1lvzkvy9ijhwmbgwvphtk1o4tx9w0tnz5umf416od2f1czt1adq0mhqaeu5jmu',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 5042890158,
                expiredRefreshToken: 9955674662,
                isRevoked: true,
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
                id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                grantType: 'CLIENT_CREDENTIALS',
                
                secret: '7vgtnu7dtq6nsa5ovmhtftcpinwrop3pnkeb6u7yx1kj3n0hda6rxkd9p2jb0af1oy4wpdd0cxwo38bb0ao2iaqvux',
                authUrl: 'vav907vcs8ykyg7ttxzp36rujl4eut0bvdmj2vx3no4cmdyipvkxq635h4y64jkagfde686gm9mqqnzgv1r7he2c7jgqhnu6af37ydeq97kk8dt61wtc6pyxcdujkbqlomqk20858qzajqzj8fwu8dmhij7d3x1aemv9053jaevbbt7l4xrm4xsker8rxipja39klng19ymuyoy1m55kc7efcyobi6ctrocdzesw09943pt9872nk2m5m8dxn00rvzb1k0c8fgfa3hy5bu76d5wnuchcec595uj1km93o9dj9e9lagtn68xt3rveprkgqhi1lzshfgi5nkcj0a27xo7yjlzdfim34uhau4mueb19mztqoqbzqhhf4alec6ivdp2t7ziw78n5b6agnstc975kzhbl8m8skopar15h47igtpybdq74an3xxwk64fywbx1pbz11a82npuwzou0xtkhncr7eagam43ec4su0xv31fpiw13gycut2nqx1652cjsj9h3ecw0aabnndtg1oiogu5bm6710c3mur60sh0mmlmd2qc0zeyov7g7qmt00qbmu1xk6ygm0h2tu901mgs3k31nv5t80qyq0qrefcwbntmh6ugeudfqis9ukn3fde2gltbauaiu2x0774hb76meanothapkjz85ei5v45tl0zclbacooedzk9lnxdgqy2qvvqxfy209dr5evyw9hw08ftvmz9pq78boy322vp66a92s5zurxfyo1aqaw5gf14m2fe2oxkcglrw6r1bmng68x5w88eajwdqv4xhw96enogfwsp4j2zy7tu7yxic03a7lx8cxpmials0kb85rn5g7yg9gqf56m9ftf5ff169nyhhhqth1w1d4ntgf4hevfy6x9idi4adt7uca96yl3tdr5ddljo2uxv6t38i495nbesywvq78v7u4yigxadag6t9av8b0pk8ryusrbo4tddz7wrjchh9x4m6gzph0220lvql5b6nt5vglqv57ky0grsruah1iyddru0ugva6187m73peyr9965tg9d9olnr888aq4qf7kasnsk9te82c5ejozmhwti9ct9os0e0kt7jd9okxq3c4i1h42xaco4vthckuk4ujbuwhhfuo6oj6a6c5scwj0p0dzoyzeh5aezg4b81vawe2z40x1tcw0o7xit9x1j6qn78q89jbmqlbmzb4yd4as2uwkcn6blrm24hrlug7tc6kbrjmyobczrnjm8r3b3p1d7dtvomgsmrgh2r2lyh5m64ecmeb2q9jvq112rhrzmqippxg1gbh1zu0p6ccz932s0jy2o2esvp71e54b7s3u9r5dzie17jgdkcahge27o4k6s71npji5j9wwllf2711pvowmyj5pm5d2bqy747h52d3ce0cq0ps4sf5nsbs802zk89h2qfwre1q7rdnm3ia89ta9lb7ol0znjcc19w2ijle1d40x9l8qkwq5xgfm0qyqdqkw2fbzvfsfzih3b9f11o90ar9l1feh8vo1pzaf2797f9tjz4nv3wc9bvzypcj5u7zaij65pn7na7x4336p0of0kcrh1rfdg5fjm4we7v9zf8026al20aa8k3ha8xjlck4gbub1rda7ikdmpixcpd5aw94p6wb5gl8zosqlz7fibqhcxr003jb4s7wvzy0hl8uaog4o0fnns6s08u9djscngvzbj7umv8ahr6y7al3aszz9i5bnhw6671hiy7rhzgpplfqdlfg69thp33iwmjebv9thmslys2m9t5oh7a0iwh7twox1csh7a2n4rv7qt6ex75lwqzclrczw8uk9wwxd277q62vr0qz15op6nyhms8bnby4050lk4m43l9j9xxw7hc6neufnwdlmuw5ms11ei90yplblwjvezle7v7wasbpyc01dfxwll1nk0zyomorli5q3xqh2g2nckvxneo9qmq8nytorggk1zenwrevuhb9fdo2cf4v2oasg9qvoows099stytrq045x8w0q1jhodtknya9zvm',
                redirect: '5qp8l9nb9r0k7o8kxw174i334ubb4buj4mk34l42jnu2ij0wy4cmw7vbsigmn12tm1de7lranpvcv0d7f9utj1z74dba1zwgmosfeg7t95knar6jbmcd15df9tbcq8t6woop87xnlx78rdv8meta4pajpb9xwkry9srwe87q15bolni0his7stqidbqfm09tq1ncvan9atc9emy5is78clhuxbl6y2kq1lffl9e421g90r4ntr9c6fd74tkrq1rn7374nyxjkj0tz6u9y8s4dsck032j4cjp12m64rhgfwio47if4xb2rfj1pjordmesay0x6h0zmvy4qaj3cvzrcyu6j0o6b3cfie5h3c71a0t9jyjv3c8v0sta9bzghm4w5eguocgd8cdrrso16ns0hhebe8dzyliikmggpt2eccrvfezokmf99f0p0b4ycpndj6x4q9busvamv47u4i8f1qgx5hewfj3fz9cqhwdns0w136gm8wl9r793g0s6e6mbnipzz7atecxz1sqkx9vq14g22yl1gdn7wln3854cxz5e0zi0ebta1c2c73iynj7gh8pxhubapwukk4p14na3parnjnujxehjr18psp78gn6da44ue3q1xq5zlhxofes0rkdqkiy5fnq5tj10bfxdn8ivdq6jjq3yivlhsec8mekqn9d414msont0siqpn5ygqaknftnq3vmyfm4nsc1owohfk7795qxk5mvsv3ueoxejc0gfpuj550e4ot68r05zkl5eoz2qmb9o23kw10n3mcozcb8wjyrhriad7mqp4ed4x3funsftn9wbzcxdha6azrcnjjsvv9sssyaym4y491kywsht22e7p67huqyj7rvu2jpbk8320ntrqr9087qjkae3y1w92y5c9q5ejuke9dgb02oaqd5dq1edsmos8unraml10n20redukd9vbqlslghdnv71eldp6qgji8tzaehiq8t8hoaytrqvuhu8azwf6qwi6ggmrilp4rofg4p319el41ymism34sq2wve3fcc4f1lkuxubywrz2lqu6meitdxcq22yjyvold3kfe14ach5vodi6j2g6dxpstspwz09lf6d2w3cxiqhe9f8sb4atec59to7naqj20888aw11e8662ukvu1lxw3nj668uunezsjqp4d31ut3us3bsazq7wyeoe3bzoydmf8r04t4farx5xyt0kx71ya9cnkr93e2139kwkqdwvsovb116lz35wnejw4phzsifsbhuqfwtkez4hbm8boxinbzv6jy2pjtvbbrctih8zwpkt7v1iybebvwj7g2753g92rh6voilrftxvue5cs0gvuugqs8rzdiddbzbxnonq1dj0adqnjf4f3fzzh5yat592o5b9nx9rnoexiim48kyjpk3wtcjv2rymgtmhg492epz7f83n6rynebd2j73eeh4nfy7isq4xpkvkdtnzrfjo68amiatkj93bf2kdsyolyj1hvyzjw8whdubpagsec40akuf0rwtf9wr6apf5vw2kempe0s8uh6zv0eq04my679y3l8dlp340uykslh95whnv5oonypb9yn9ty9ez4bctfp2ja6ezj4hvplbogdptri0m0u2dnbcpx9eb6ij0ll6457kf8w43lafzdo4x78ga5i2n3ciwrvv2ak3cf3lilz0lb0kivrh357u38kx7zefdnf7tgko4kr4pobk7akr9tsmxw07s4zpjj2p23u7ppartj6vhkh7gk4iz4ue7t0oyxtk3khtmnn1ebwks4nr9tt2luaod3w2cwt0ihs325xgniseftsox5fjo7dop1ngh0hfkp41vivm5d42egwdomnbu8xiygkeeqakkwjpfqo4fm4lfuvs20oqx2zyz90ujgsos7vqd4x7lguewrzt23ml2yzfwoqsm26a2swiragukfkx1fy6xq3ngy6flzodj8l4auli1izd43z56v48526z6wxu58vnvrudsovll009rz34padkg6v33qbw3n3v70t8xfn',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 4699393665,
                expiredRefreshToken: 9358467113,
                isRevoked: false,
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
                id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                grantType: 'AUTHORIZATON_CODE',
                name: 'o5okql8gp7predi6c9lk74rfspvw2icg1o8i3pvi8jjsgbyfvou6odbjtmg0fwodb8jkybi7rhiyly8ugiww87rcuxaxz2gf2p00ftslzsaxq89jd33hn3rbhiddqk5s9ff5xgc06ww0bxn6qwz5aktkmc6ec4t55drq3ktyluu8oa6frah0nwuswdtl6mg3ulw16qmucqz7t4def973jn8cpa42lxmbfsor7dmmf4r37u07h2mqq359vczyjch',
                secret: null,
                authUrl: 'sfy8tpnlia3h0t37gzoglerjdaqdkhse0xwx3mdeiu7zz8ai2z13iqsivwseuqp3tdwvcaludwyv9q05bu7qcypmv6nkp31nfwcv65xkulv4j3c3kbygax34lmnqigyi7f5gb97vfbwgjgwuqleav2vz034qfiflpkmkt41on60ny4wa8obbz8qk6wdph5lepkaip2gy2xkgoi3ph9nec68qzqq352mmjerybtos06drcqj0ow9mtcdmyntofb6sxo1fpcjgbhs1007ly92uoyvl7jf09z1y0r2yg29xz7bqw6wkisofoq8d8jk0pyxb9mqrjow4ax81azcyyzwj9n4x2imavkbo2gsjr5vm5s28qrazlr1jlb6dwionufivyh4ywnpco1etkst9d31818vwyiv3w41gj5i7jok8d29qlm7dyxxf4bva4ku2mrpkz6ow20puqc76358exdnumruxrsymakd5vrl5ubd9eidt4jne7soem1fj074olz0rscx6usj41f3g7v6psx9qc00kygt2xa77xnsb893jl31c4n5x0p0whd1pmnjv5hzueah9sxjteu303u1rxqo385q4bt3e6ajtbda1pkykrd5ebzi4h8xrtyw5gzwbjjgabqo29mjhf1u1i5y0ywq5578e5vxtw70h1zn5rktvkk37d7scyyr68ioot3okri20bt0dhpxub96m9fsgab2maruu8odx5o1h5o8qhq4di1iglc1ii2m4015872wrmp8zi1oazh74k2gdgjh6tflazota03cbxl47e3urhq4eehj0tovms6i1nd0p1zx6tpdqaeco4emczplszagfogy0edfo1vzng12k0fpicsd63ehqwrlocdyux9u47305koanbtxrf2plxa8p492u9ju7pwi6mo0s3qk47lp24ahxkgpv4t9vvnrxo5adp7rgtswkabtgb0z4vf7aetnhgpmiu9re6uqn3ji4laziqmokmg7wvmgeaor1z7n3ngo9og8cpb09o85im2pus7bk9chqaxri8rd43em3bvw28irc9h8wvnu2f2luz0s6ng47g0qrgw91xwzi248fz51xagexzrnt95wxdb4ytnmm5jogut2nowb0nbmh3s0nxyfowlfwrzklmtg1rk78i6k3gzfpg3iz14aj87r8kbg626xc1vl7a10uj58fucom14abfphg4scvh70myexk0kiic84gzsfu6r3tjx1cdkfmx0o53n99a6hm0giaxh1rwj8o49hgqmh3i6wz4270c7bwj8rv8nonw8axug7z9ho789aj62fhro2r70sbws4wdtp4jzc6tgn7x5xmd6yhgtd7cafgnw720c1rj76dhuhqr7nl363dcd3zfnwu0rmk440zzv84xtp2t14bi1hb71pz3224x7s4mtczkqond3qcodlil1wjhogy3vhihqkth5roixgeghr7ei1xk2ka91gnvqxdjed2fa7cm63szj5rgkc416ndaiemd23m7fepelpp9sjqe7g35y65blyimrkwk3i9gva3nbtni9kn81shni4lcmjq48x5igshqvavuog7eb4svds9che8qccrfyt4ou2vrlagsnsr2vrju9m5jr6rnvuxwrftwzh2wuy225govbf64osfodrtzkg34tqdncm6xy6a6wkolufp1con5n0rjbesns9pc08a9wyk3nbu78ou62jq98dd59h2adoft4jgao6higy8voofw2nk8wii5jy9kw066h2asf5u3bnv1wpuf05ignfapz7bct7u8ltkqz7osr9cbf120xpxwibahv7sa9kf21pfh57wa6su2f6gxd7x9g0rj2iu49yc0xqp7urcshke4fiz96y41xzu354frixilp386wop8om9jp7hawn1c55ffezmge9cmu8p5n8z5bsfc6twgan9y2szjvppakisq0cr4wz4sii5g3d4tl5ut7nera5ngm81oy0ougpornk75899wts2qq8z22mkt8xzt6j9rrqnashzjbbz',
                redirect: 'zm12xakhqjqlenk3eytq5cm4mx26nfp2dsc1qy0e54tex9vw8g5xhbw7v552rc72wnty84gx148vwyrltv50ms8fdyya639efjan0oavzg4ixq34750u46hmt1m9y4zoke9cy709nz27kq124lhxiejgv2kpmqkbfczy51ls20ls8ffsv5yd3al7rxwzuo6f9uykulajcslf9dx7xyszax2wuzoy9vwsbg9jqlb5uu4sw3hx9e43valqpmwqveueyxeillltr65e8wst5vkdie5k9l06k4nj51cx8mdq1rtmykvdmlg67pjuw4iktof20vumky3jqwnbtarq25h8ntkgcjs6dldamxd5yrr9o3lgh3dc0s11ns2hbzpvcya049gp83epuodflv1pijixcms7iieofc438t2hsmlkrx7mbwzey4qmi9vfzky52sbj2qqog4xeciaclwxx9m6i6dszv6xubee9rsrdeuvzhsorlne39s8ib9eremywyxgznaoub4lzmlq5ur5hs7phcnu94ofa0m4ay1a95ankg1czi0wrkobd3weekywpf2nsfh0nkeatq8j3dfq7tulkqyfgo20pswtmf1mstwvl6iigwt72fqe3nh26dudm5m6lec3b91gk546adi7onomnv9k3sehgl3mg8uallsy57za1cyr649lwol8808uvjxz1dvprpvtucsuce533rt687tk2nzyv960d6tl63ovjdi5pj7a7quljmzo97mybj3r5pt5c21ruz2wk0oc539kgrhlypy698z15vq2rnx9siyxvlvgjwfyxxph314qrw777tlltj60jw4ivcqif5kaqk81a19ry22fi0srtt8ngkrkying8unqoteqiqox08tt3y9837f5qbom3y76w2xzg4vs1vhyusl2afg6kwmw4bsz2jqhfeehi6jm7yxk4h73pjjen42z6fae6y19fcgeetxlelgxo7pvujq8ksom3i3hwf34ax1pbkyz2xqwx69yonakzgqlnx8goyuopymf8a0ugv8j9e3wzl9rbaqm0g1hqtj7x318xvs0truuzdu1xhr54o29s4sinlh7g401mqic1ue2c8ittt8ai28eslirwsv6j6e2mhgp5q4ahuv47b3kfl70yj46bt1nxrqq18wywa32ou5gqkbqojk76typylqjkyp4xvwmznuk4aaagkuwg3m7v7ihncvp0mvjpfrew17twvp7100iy5316yfbm6dp0aiaafq8a32smbjikujzkqvp1ygte3iti49mc5bjsvj9fwt81fljynitdygwxo80wjk66571sofnl1wj6376s55v7ut0sqwdtar4jg3vj08guujxi17k3cqbqokzk4myvx7spxrynxda40752mruz3lxnd6g6h2z2vtm8hrnbko6p4hoblnrr0g1d8lw6adpdw0wc4i7ws5rxer5d5qb0zxgs944tv4fm7pja0p4iowbr9qoinj8yrxmisnlmawrje4x6cad1uo4h6b5zgqij5gfq6i4hvxui08rnntcvm6f3c0kcweligh6x9e18dymniaxhm3zf9nixvsnkfd38mzerdsm4pj93ti1ywl9v1wb8261pdla7iyz94jvfd5hc8lox9day27xdqkmeq5hnyepcbjkb4rdxfaayqrrkofgvvy8bbbqsr613y958q0zt5qvug230n8mb21uictnfpqqizwewomch135bca5jx4uyoj4fzkdlc106jp3olqpnfxth77a2in90mijo0zyxtxeewbhop2kehlqbo6qg0g7hhiaof91cl6d8r6hb63ipfi9pzi2kg28slrjizeh28bun60olcxqczk1vt8jjc3lo0sj2ipshr6lc2jr4e17w5wz0uqj7zmr0ih4aj3wgmyi7y6g94lr17bkn8a769sggkrg6hiruzeoxobk61a154oov3bxebebqaj2u70i5kpd5wba1ixvesjlorw3yngg8nc4mto9ddgh2tyb9lfkkqh16dg31twbaureo',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 5558357332,
                expiredRefreshToken: 9073957378,
                isRevoked: true,
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
                id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                grantType: 'PASSWORD_GRANT',
                name: 'qqpqar3fczaehw32qxyomokg55ccbfzgidt8kr0ufu6rxyz4aauojxocb6iojr7wlgq6dfgycyr005emnifqi9z6rmi58wz6671a14ot8bzt59lowjsauc3v4z80mliul87w0nuete73uv3lp3bx31gjvyca70dtg1rdirbp9hjjkllkj9cjxgvwea8s7yljfd8q3bxoqrcx0ifxb92ycgx0a478sc6zuoxhvx3xug8t24lbymzbqh2585oia8c',
                
                authUrl: 'fhre8qep6xvj0y8gfkh6twjivm0v6nhtk2v8q0rxu9doxmv8ttgagpie0me5ni3lqeqq73901q4r9dnlmv1b2v9w9y3f94qwuvh32mzfguf25dobd4mqvczeh7ym2bq71w78hvujihf2ganmwzhcwel5l901u5c2ehxguo3ttlxmwn1erh26hw0qdrsd0gvxbd8jlg4f5mos6es1ugjze1j0yxyyn2vgt0g4q2z28ozd0tjho3qi4ymwz3yolk37bmcsia53q671zasdkfy1zbnjc9okrhjtvwqe3d6c7jpwjuiozt0dsw49p8s4m4v5lococj4xo8vo198yzcuajczxl3z9fbim6dud0xby0hjejc5nknsgqqkjdh3e5rec74mj1k5t4rcglq1wb5543iulje2n1531smfanmj7lzkytuxxuy2xsab6idxziqg22sv9y2w3uf56rnkucg1u3xo0a4eri3d67ig42nnu3kq9h5r8z7qs6xe1u4u50qgjden7rkgcbkvgdog3bym2n1zfkqfud2fdjc3yss6plaq6i88ha5jh7bpfrtlvagv8noql2dvkxm7j3lajlgjjvhv8m4dxdv9zn2dmiznr9n1ciqf9xdomiu6rufsnyxqd2abkjwwxh25hwugfc68nuf9iu87usi6zrfv4ce2q3kmjlsmyax1hxgq937ycvzx6fchgzec11vqf5ypbtycvif3esz5nwa6v9x199zyjm6ihdguj2c6lg4w8fh1bjrbgre4vjhh8lfj73g83cd0ion2ireaqbqg64ppycbjlp79feegchit89njn74iofp1hrsmb8enrfze45ef3rymgobemtjqi0yam7og0rv5zi3vb6higz0nh9cw2a4kat58x02cw6yjwiow3v1j9u5s3v9sl6uvr31zk2grupmf1azkbr6g3cqfi06fwt2djrkzs1vpcnhpnwmfck3qh10bj35y5j9mg0yc1ofylbq29v18btblb938vzc9ggdj66e3imwv5pjz31oxd9a8t5bs5p0g4k545axqgqqfo9h2j7znl9aajdvhq57haf19lj3dpb1w0oe2h5k0s3ny1ppbq9n9bkseczd2qcsmsjjkqlshwrd5li2pyaddl99trwtu1o2qtwam023jq1hwzkooztx1gz2w6bfshpy8pf99g2zsdka7ils2oj5kjm9c2jqz4yxps45gowrzut7ebr6epl14duqxbkly1wqx2h8yelm2wxtoqp6f7cvmtaf3nr8aseqbv4ecp497j04xxg4irnyud3o7cuzi7ct0viw2hv1q3fkb78iiajzmb1fwpudplibnbcr9l5mim5ln2yzos1dk8d0duejd0uxt4kk8qbwxqxgszxzjtezsditfrb4jx4ohl8cn3mdcg1c0aj1u085bhjjspksv1fr9fqrv0xgkyj82s2bvmnowfnhhx1tmawnp1d3k8vxlyh8kztvajv2k5cnjllve2jxsqyx40v4b8bm8uiojgrfq6rutfpz03qhxl8khdnggj3xko6i3xnktqtydf3sffv70k9xk7x1oahwgd6ndztkc2yw5h615imhvxc0w4jqjcrczmo4973mdzb8cu6q51sjncm9zkzdpc69rqtp6k1o41bhl5kwub9ca7p4uomk9kb68vipighs3u15c6bug4xku8nubhn7gbe5y7ojdb4aor4zcqrw09qycawpa16yu74k6wo7rnr3rofuggfhj9k7cs2w2rm9uhwr0t234wf0qdxpphrlfxll6p6z5ev3445j9amagd2nl787kg0xw6utn4uuob5m6rmyw8ihwvmpd3g1ehbldycjjcrmfstc56fadwjhx2fvnodtc0ltm9sztr2deram58yon1yrekz6moqsgu2v1xpkij6cqhh6aqdscj3djtxlir0zlh0fgegssamjpwlkhvn1dgyy3hus2hofkk7koxsywx9mv9m1lp1at8wwli6s0d530kf3y8ni9qprsact40p38rxnc9tqhm07p805if',
                redirect: 'guyqhd3hrdlrcmwb63f000ros5ugtxr1rqviix9esa40nofee3ugmr5rix9a3mi7mtnphx8sfqxmjbkdz215itgmen2ky90h00tkcj718rsqzwmlpyo6kmind320ese8pmjvo97wzgu2ery2puu3jn1hrzm8ekt5l4v3dih17m94ak2nflpv7sqvhzuwc3vpz5lvpf87c9lk6tbwm06b614fdxltl2d59wbsrlwn0a34i6duir2dfdje8mw6p9el6hbusfut408g574bktcewsob25ysgq0zr43fea45oye47z3qo5k8292dvrayqtf1yoqx03id74or4l0j80gmvlhaxqz5tcie51breutpcrkuqamwez476cq6limdjzfmz9ux64j9p6086kbavgyaeg5uqfe1x8ba0fqdjrqnle2ppg1ny2w8rb0nb6m1nymq5qmcvprsiwkwwy2uluvh4d2uqq6ler5dgktcr3jwdc3q3kbt9lvfg8rvv143u3tb2rqiwc0p0e787jd9xzazleleaabz0vexsucsqpbzga2enl6tfwr67bubninbwpnol7rcegpamf9zemmpnxuj47013cp69clquiiclint2tkvl1prfy135teeu7w5x2at91pjw1bkj3ejv32zlqzeljz91j9hzdcfhiqbzl4ire040jhdyvhpbtfczpwhjo550dkgw9wo0w6jwuadsazrmd26dm1auycg1h2ovngz7t1vgzj6d1yn5u6sz0d559ffixio5z6z34yzmgl90rzivnqzoo2iuzior510u1mmzl20vq0q0rn85qj6j6zki6vn153i3wwwwair00aiv1rc5wvi3ys674ywgu85hjf1h3ekwlu93i6ck5tbyk6j5amzgjzp2dwhtd7zzl51q5hkk4t0o4u6yur5s3qlw6qh88gfmjw4zvcgergcnqffto7ea7mm14tx122c5f15tg13lidy9u87p3i0zm0ofir2yos1jrq6j115n8gkxglp0cn7f2ifie918shefa23tgop3jd99jquoybzadp2t524muq3c6noq8oavbcv7xz2miatve43x3wg03ftn222fl0bkwl2htc8ctawfdasffz6mdhbnnguqgrqv8telikgqrqp1p5ia7ksy8qkf0s6ppub20jd26p2vqsx9fupvvoqiqbqsrtmtqfwejrsgi2w4j1b5e5tlo7d2cxdbqlkkirikn6lmul4w1epuhvata8tdom3yk3tnyeffdur6vctu4w34nz9odzt4pa4w9o34l2xtadfj9vzas1vu1ucmkug2b8n43l1beide33hesoc1fvwnqw47q1jf3z0q0v8fzj41udi9cg7u97o883wq6dkqaj27vqk2kcib2qvx8oufhzwpf51bl831ne9ilvj678wcniy0pgvocdobtbj9ttte6711qlijpan8z3sv4h763otlorbgw81v3h61i4367xxb0ejgdn9mewd25mu7sh8dc8vwwu247kmyi24gu1ux8ju422angp0pmsxokl116p0h3viva9lyzeyrwgp8o89lk57a4iciyjb25r4wncxx76zv7t4365hxhpw71u58zy92fiqgnjjtiz4co42ie045ow8kb882gb73nfi3nxs78zyxtghobdsfdobxsidax9dy16058q57u4dakw0iwtbrnawutm3ff4w88shn76s4ecn6wpzsodcc38e3xmersibdstddwp527wfhmexamfwrao8t6tgjhrtd59nk6jm6us92gcxbo43xbk4dbkgnsv2chxj3jyixwvmcsslwdhl4im6my05rp80eynncmvjulq40pcuha2iad2t5nsfhsmgbu2dr6ojldaa9lyp20cgc0bzzmjel73u3it14b08nq9q78s77mcxeovi3bhe9aqjlptvgye77kunns0gzlnfebpw2xg6qizkrhcgld581nomgn767vx74u1mpp6ukej3offfcnsn0os4k5lsvja1otrxupisrgzlqqx4awrmc1pb',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 5051119722,
                expiredRefreshToken: 5752759700,
                isRevoked: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientApplicationCodes property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                grantType: 'AUTHORIZATON_CODE',
                name: '2pv4wboz6bjr4gf9ihvxd9t1o5bmml4ga9a2ilwra7rhtmvj5dq1ereorsvlzd75wl5259inxg0ljpfpe88onjxj9qg40apk7wfc3qs1p6d6sm4gboq19gq7t7j5ixlxfpw654tvs5ia95ppgsip7j14brff433xgjtagdj996samv7areoji0ltgqvhkr9p746x2vh3ta05voflvzm5mvo6wq9m0qyvuztl5hi3r3z3jm7s2xhje94nvev122s',
                secret: 'lbokta0qce2fxg1701j513g1z2cbz8qhk8uix9bdnos0pezd90gxejbqinh1i3ikc6fh9lr1ipcwlthvvibr3bvhrg',
                authUrl: 'pwy2qpvpegglbb38ff0gvep40bgy9fsdfwvjoorth6bdqe6ry6micz6oum6f3ol7l54f3cdut6qtiq0n5i9watwlhg46jdwumz7ycaae2cme7ttg8ghdztfpt185ut6y1v3jg8vqdmhcinbclwvti8k4r5udo93lz3q19kizu6dw791onflbtdfx1wo5kw3xpp06xdm0040vmdbpfcsasz8uzxxvddgnfkgnkwilarisug4d3g12573fa51stytj7ioz39jxmo6ufbo0ufmu39ulo4zpi9mc5007jlxs90ll4tz2mb4o7m9rkhxeahokzbynmsglk38qnvk6mnelf85qe9isdisfinnqdczmwwal7i5grvs2d0cznkut51yd51hy09d4swxi65ayof4hpzodv5mnsi96213mb0z6akpei3qxy7yn66e1kv5e9sbiirsxo4pq9j2qu3o5vulnqkx1iaz9qd8lic5rrsqkui1e72a16qwoqohof2k6zzq88l4lgustfey3ly5z4go3hrllg66wfuwsn18515a66z0oi8p4j95n9xv3oavcji9taba16pjjndfascwjegukkgf8mjcf3e6bg2m4cvbj7npatp9w7v8g8c4xtl4zbo0wtst0iy64y6700h5igkuzvk6w650n371cho606u9lrqq6t6jvwb581bizeo00tt16dltjvdgxxk1hhgqukzfujnkwskrco906q8ffrw16kz0aplyyujc6bd02jz84opxm606i8hv0hnmbctr4c01fjdkaicwtyqyda61a3q31mxfb7mn7xmx8shbrnmo4w5letqbklz45dw940u0gygwtuhxb2k1cfjrdwovmck5yu03xy9cbv1q3qyreu61v4i5op33hec52p5zz6d5wfi5op2v07zjs8kmoi5c8z1rfavcpcvqap3195wd1geqpaj4fnnte8m71okv6c53ygudxv9deri8r4jjmv5eri0x996p8oq4jkq1s2wl4nx8mrge3qbxuzd8cd9s1rl7766n5hs2mgwuh6idnevmlashecy0nc29580nl4liy3tqyetm7jief51hfzgkwpollcqd5re3ym0n0m7mno85900a4utvx1qcos93zcfez41i0r77ctcg1tjha6ttz8buy5uhs9zmfk4f8rjlz6o26au4mpc7t2urtl2iw4zpi6inz4d9h545rb288vlcx8hhv7xerlz4kga6arat10jj4xb7hzadvhw12zbjkamp8ln538ri102hbn421diyzju49kzqo93gngkwmi0vl1v5x31d36t0i6912za111265im3ed1ux5cu0zjpejze8felk8frv303u4gvpob1mggxsmsa7kv9ydpf7qm7gcxda71z8xn4lm8nn936jk8eejx44x3vobn4xz8kv0h8dwa8auhggkhsfnzccz5t7ol0p5pnu02reek0qpcm2ocvftbh13tigo15qvzn9grhzpvo458eoj2zk98nr8c87jfcdj4w06tf4zytpxjzuikbm3hgyin16hy743n6361eygsx1w33g6jwcaexo3r4silfbeooftoi7udv9z2tsj4g6gz95uqw6z19242xo43urw7sirvtanxdfm44hyk56b6gxf5qwmdmt426bw9r21x4cn1j0rjr99bx82iezedz0rbhkvaucqkzlnpmotawkd9rix4w1g7n6eahqtofc569h3yw19j08sjsagn6a7af85oby2ibd00izoj6hrhcdibh8uvnlydxs6orvsigayoihaxhbrr1nqoyvgakutwvk90oxj4m3wtrdet7ue9ay5ysq81sfz20dg5r0xbzmhcy7h5d8t31o6tzq27uoo4nferf5dm1eq16ue80inbv90vf7g7172ofhl2pjhrckzo2g3mai1wkuy075nuft0rh4xwyds9ixfe82asif1393jg6oinj6mcql5scpus14k6hjhpstuqy2p42hniy563ta93n68p95gmxnqvif3ekm2r01bj8xxc9c',
                redirect: 'ex3j2qur3z38fq9ykk3vhibsn0uov7bqkl9jkkdhnogjwr4kb93cvlwep1k7fjo1soyjguw6wbfcnploc7rf9f96xg3cyzr6tcy054z1o6vdhplcq8ia6zn33o5ch6dt07b1y3oz1ma6cgnzyw7nbxe8w18rnw740rdtnov9nx3nh8ln5vx2qn83vpo3xxjkdq02v87wdfwcz528mmoiz6zrgal9jje7nq9lh6ywe9ok4lj8adjkelmxekrxdewpxomql6rv268xlw2x7l0p9mp53id6ziwkmgwvkap1vw3lt8wymc2c9g2xfpbv5qy0bws023qj43jrij08gtuedaoohbroftvg7yegxkxjxkx2htlvs32sso0ob8wg08qkk1b7bc5kknpw6j04hndrg7d159suu7i1ntp2y87ctzq4megmp4gijvy8y1y5j1sj9fgoh7au064nez7vh3huii4ie7vxieyli90bwtg5y5ij8h3aso0mgh0dvg0hevdagccviw6j76sk5w3gnqzf8546g85mrfptvwe3koz5723o4mlezvulmpqmvaogvhzr5enzlgdzrgz5vcnsa2lwzkc4fkcm9i28cbt53shkq83x2kvnoipaa3mhpayjqbdqotgvvjfnzikmmgo6yfg3z2ek1bnigk3ot7cp7ovswrnq9c8dyfnds50fwoq2wjlxdkrir9cbwnkv286ja7v87l934e3mglsno2z3pcwj3i4e15sfcgvvx95970fa3cz2wtlr2qzcroctcvn6mvj52u8sye09sg20s7nqxx8g8f9p2n0hsslm3ixgb7pjrtyp2glhek9h0a546z4k33kkhxh2mj68vr7mhvz2axao9o8nrihku8v43umzloqailnfpkq7k1v51qn4bvryfkgrp971hvwl8topo5vot9s3e09p55s8emo54qm9w176wp04gqkdumtxl5rp6uwfp85xeofy09goiex1tsanzcolxpxc12iw48i2oauvj2rhkowvru1gimctcwz2ybrsxbkw43biop3rtq0c2v21bbqjfrh9a16v2orikq8dvvz8gjxw9oydkusah3xfg34ljn6m437ik9ezvc4psj2eawqiw3a2m1h2n2b01hblocnw4xxrzjutw2tn2980s096kqfg3ye6zvjwv8dxbsb2iff6ywkjcp09z3v0lfd28th4cagkiuphudfi4j73coefrm2nfndc3j0229m409gg5q4091wpm6l6d7qbur5x0jd6h4duaubledtcazb2x7cosav9fx2k36nx2ck4afzrhidid7g59ojxr2686g2goyfgrjeuuo52rtim8no9h4dymxlm9gcihgk0c970pc3eypfki3vyk5ivzmduog9ojms33bf9x39oy08ffdtf7yiqo5kow2hw8gta8ch1uhw6hody21hpvy052cxgwcrrjf0m34ozlasuau17268fdn2rtgrmk9bdymts8mv0vg491vro6r676asyrgc15plkm3qhrsdptoowaoype04om40dwrjfrrtv3us20covtr19bs5k9x8abo8jhqo8j623btjumh25cgvgrno8pedqay565on1y0ejxbro3zy6sc7x94z2f8dwtrsin4z8qn586g76xvaboft3uyvd2rhgt7da814mkxar1fjembh0efg0t5bvksii7sew8hg940nle0khva3j239lz5m49ejt6k6flx98bu2ufdl6gevbrbhmskvruagav8mipff8x86cluty7b9au4d7onw7mvfl2fvs100go2l17a7l9v3aj27ikrnquzvwcjw7ezxrdd84w2zk51u06cn0070u3ykl4oya64sx0d0yov879wknspjjok1t0a0traa8xmcyzshvcev3by67qk42j05lch46kxlwojsiw7as3c0dzhwrplwr973de6aeyqejgtd9vvtjavwx7bfddlynkwq7uc61ngly1qu4nz4vbqzgts04g1bjzf6o76cybatgieqgxi5tphovl3x0',
                applicationCodes: null,
                expiredAccessToken: 7760477861,
                expiredRefreshToken: 3637267589,
                isRevoked: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientApplicationCodes must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientApplicationCodes property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                grantType: 'PASSWORD_GRANT',
                name: 'u9ussen4dfi4y6s7w52paydrsb6et5cbjavd53xa8e7auquvrkck55pj35c6etnsgs2suvq7pkl9wvr0caioou0obrumso02anukzrambxa1k0lg1447hocxz6umsk373mv4wewmb1ugasmxqck4f25mrm642oxf28k3s2nfg8lsl5oi5dvs1txnoyu3nnfo4sm8fcl1slqeidhp9dugiw5qmg92ne3xhelbctqr506ejpw7y7mpyaqg92zvabr',
                secret: 'ndwfd97lgwdkx9dzruhxeirr9np29mrqx8dzajo4ihdocravkmmriismleurczrnwdkitlx9whm2n3aerlyw8v3j2x',
                authUrl: 'dnbytcx0e50hb5lwpgk7wsnnqoj28scyzq4r1qc4vrm5nkgz8ftmn2k9rnfwm60q0j0qb9syspsvp2icmtvl74avw8cv7jcx9pn1djwc4q9bfppzqllv0jcoxyc9j28jl1pp6h6md0trx9j8fgdbc9asbzpw7mu62an7q5pgae9ad4o7mv0e1mi8135ynkqjh5jzwq6quyzvyd0m1u1vz2n65d7c1aia74o4edrkw9jadtdyoywtyibx66j7ylxqexx266mzk9pzwlh9fm654zubypaj65s413o4jxjcoqutp5b5mgmdv4gr1xv36h6xw71x8q8n4i33jny5kzniszc9at77b95v5f70cqv658k6jqo6dyf79q2kcmlaa7o4hj5n3zd03ps27i7p1a7zht6k34scydwl6650fbn8nont7i6f7x1a7j2tfjk2i81bv3zozzf6knynf119vz9nnundryourihq0vwyab6wcgee0gvsa3nni8ptnlq8r8bph01ziyljlvexn7ygz8h5h4r4t8e2mv428ka11n4dvpbg4m3e5kz61vdbry98wi0k18p91w2xfl6wavjsskf3p6641xufh238vkxz0s40hvx5lvr7ccbjuwa8eehnxyjvi5ipkpsehprojer5dfhvaujn78irvd8dhp7pftmwjb33prhljm8rwhm5zsrl89qj6amgojzhd6fpa8p31qufvwy9tquejwjxjxelax1d9stwqh64hn41mgs9zm1qkpyznagn119x105h5iadluu18audwzep02hrv4mkfjkb5eglnahwnja5c9qb519xm8y2yq05q3hl05m0znd1t0niq9z6628d9b5obs516xk8qcwnkmm7qz0wtos2c1d9gjy9hkxaexlt6hzcu2c96gnlazcgu3lm9bl5xqxilld8aj9io8rtbfw8jtsabfqit7skjfrar11ieis14osfe0gppf1q569tg5y10g3sq8ij19dvus5n26sgvh74qjp0jbobwjggveuctxxj1zu8qwfdot4lo4ytwy0r3kfh3dvp4n5wz92ntuw2k5bbdeiuwaj7h9rkradgxszdbnyoixdfpr7mcx06bu52crmqcu0o2e441213iyqs6emf8j24seijsdtuwnnzto35p1p74llqv7ycv6yyo8z6pg2f432f3y1kxsoafsndnryhjmiqkytuc762c68ifee4fc93antxrsifxckfmmehch3sr8kd8kk8uungkw9hiyzqt0x35knvv511l3qujaavijgcuu9apdbzwea3vwzkcrnmnkayn93p9pmqm3y0r0gtc3p53dy1x46zum2umla1gf9we7eyb2fo9meqimxrnbl9rygeasjjq4r7y8dzasnk5myn9v7tp5h73w5lagazeb9f2hjyhwqirw4t9majyufqy9v7nnuta5a4suvnqfs4d5ah1tg83v05kviu6wpvbn9l9le6qs7b60rmvr2f3kmy75h9n255m6vuld3c31k4p45l7vubcl1g5uf6b723830gbnb2u036gz49ughxwt3wrkndve6siu6fcbi82sjtqbus7xpnlcedp26hwz7x5gwl6mgb86gj0a4pzkd7nl7713jmengqf2dzeb3s8f1ejt713g4v95l725c92255oqy8c9c90214a28suux6s0idfqpq7xnqvljf0h6nel78t6qo21arlx104icvt1qjcf9rgw5b5arre3hbhx9hh8d194twzcwy3g69u6ofg9yczbajy85yd6kff719g2ffum9i0g2eldip1lcp31m0o0zp65aykadsuardffa7mzujvlhnl31nn9air79f1gl9urunbehgsb46803szdnscro6312i26fj9981cgnyty4q0zma6cknf8t8ljw7m0zdw4ruwfnkb3yf9nmput1b9c9zub5r6xl3poaaradgdvzwt0m6gfz90evp6aaz0ctkrxljv2fbv9tnr9f8ettn0djgk1t8eqnfdeqzug1jfpc5wvyeryk8',
                redirect: '3gysmsm0thvo8vxmiwv6hxqg80i6bcu28udkq3gj5ir5iukyc33k1t2ayo0521s7rdafu945is63plre48ff6ysd2mklsaxc669dq4t7qjl12985sdamkj5bgnj6dvhw52e3tq8fegnikszq6a8nwhskkjpo4pb0y986ky3ajccid67jqra0xe45b9b7ekxbvcyspfvlxcrcyx0kj2ruafzoj5m96dijyqnr7uoxd4986suh0435bf6xep5j3xeqyi68rkngwkd09hck4oeglhqa1l2927si3s3zy9292bfw85dweghinh8jvdha7svgxredq9dks6tibihsxsi4s5osjzntf86mh603ri7547jiywtlb048i8f05tke9wevih3lfkwmio0w4cfe50we71rm8mlfpkfh8hqjo8rv4f7f2alsltbs8alwf3343vy3iunlnlup8rjx3at2s1akywkwkyksifp85otisp9qa8ot7d6w846ww5b7o89sf9g1053ea8j6lb4ck6zmivdcyii6de0bvbl0niich08sw2f9m86rdc81v8tjrz6uq0pkh8zmtb1srtgxvpwde28thzg0lrlymmvh5p776vvu5dluz746nyiy2hhyhtcgn8i181zurqq9rzt7cdr8qryck9347kswlxt9liw2jdshxnz43599jntrqie3pz1d2w87d2b2ifrp0vlg6djfr6x1i8dyz45kx2qi4yz68t90wvdnis1yir4m3kgj88ed0kioivvo7mfdwnkzfl6uwfs0wloynlr4i7loxdhe7wo7ecu4dcp5504gs8r1hji8ook3h9bbfff2kqnshswgg3kyca09j9o8qehtz4pyam96xjojag5v08lbf82594g5fefa6crs56u2zlbss33upm6kmqtz8p9gujs3p3tuk1fcrpyw9vtetamwq7ren531lkxhpakv40pws6wjri4c0x5sol0kir7d70jdmry573s0nfxzzl500kx6yildc4gop2qfwi3jezxesbfrhvc64pfx8xiorqfth08id5dyzdkhpu41g6fvc7px63voxcnl56vjavjh3u4g41kbill2im0ed4tsixl1c52qxj14fdswfccm6x3hp7eqqh9bwsenezghzamzapxrjjgy5b7kgktac07m2prnw4l7wilxq6umxoperjlacz08xzxhpqpafxzqsu70tejpbrtywbywad5ufmevpyvflxuuw828qkyvs99r0so7okmls7nmfvg5i07871t9m2j0t2r8vccuig5lek6e7wzjkrzhm3pg0t38ykejdl4uqff2ltuusqs7urman645b53gwe2jltg0midwnpg6q3jpzemtltayogycxlrt82wwabrorpqpoly3is9ayrxs8zt3ngomcguuordeox442bsc30znoc4iojw4r5xuwcihx6bft76dbu5sb4n74r462ukksjlk0s86djts9ntr6ltkk6omyqru1q6o6xqa1969zn5mg4a2ou5wz8mbxsxdktnmca96finvdb4znxkvqqi7rebtip4e9bzygevbgaqvsm7bcdeodk6afipm2fu4ia72fpe3zqcyyszpvxj2rd54uq6xvjbu6q7ojuxyejtruzts36arj9k20zxs5dh6wr9yqz02lqcnnlisdsirm2ghbddanbz3ruyrfzriyb82yr1h8obsuifsh23tb40kd3v39h1pik8o68s64qtf1h2qqyrdhv30153lxiej3f4it8k4z6v4ukw761gu00jahl16v1l3bx7hy1kjzojgcrmeyxs6trnhbbjx2yik9mzigavezjhbv4tphxkk77uqug1ni30dcg79x3lsogfzut5rmydc02nix99906stpyhbm7o2wu6waemsa79pf9uu9oof6vjmsox06tma4vdn3zllkz4vwtg9ezerycrkkqukp5vdfddal9zs37spkvfu3hto3ht1qtt7njjbfe7d1k74oi07cjue85e95xboa9wv0tud1ar3cduo2gcm',
                
                expiredAccessToken: 3998193828,
                expiredRefreshToken: 5568566267,
                isRevoked: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientApplicationCodes must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsRevoked property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'l8smjk7o953zw47zba41sih9lfl049ycfqd7x1eha218q0shrverg1qdrman3x8qz3z17e4lv555vjj3v7x6t5kw2jc08cezfamw79dq9tva8dw6gv6e0xngtn58h37wfevagrng046leilkrlxdk1sr5ul7de3wtupwbj3l76iyi6otnogvmvqwecpdx6blqj11w8zmkvdtwjyx8u43s8xkvamofpl5xzlix6p5923z8hr7j86928eu32yw682',
                secret: '5rm69jnx7jjgrosxn3liwq0sgjpmmqzg6gh9ijri2dih1thipbvhssh4s2vo6zqufp1876vi75a6grxzau52oux3ko',
                authUrl: 'yw1e4adzyyema77162wnu3j41tsy9ztr21dtjlr824ase1qfyl8qqpuqhegx7ucj9e4xuvqtm74zfpstsplbw0w6blck0kv9qullebanfnvw72cb85h90sbiaxlorsmmvt96x91u6sug8yj3hom39kpgpzr507ux21wrlffe5f3cksvrom9djrnhewlcqlt7pz8kpkvt2grxnzqnks9fzag1azcawo38dsqqrcggb66tbyopwn4vbmsq8agg5rjng6cuuj2jdfntpw5gkqoq6lowz3x8igbn1k86bbm0oorxz6lchsljwkov7ckic75d81czjxxlzy0qb4pgtt30dlvzz2uu13v0ofiioqcwmtulqsefnzln46id679k22jp32rni81j02f5jgq377gqeck79g9ddca9v96gbqry8y9903t7o7zg94m4k2qic42kgzim0bopuk5pz1rfbrm2zeudz0by70867low5qri8uov6fuozqhwp9x6vfcvu5p0deuut120fauu0p3jwinzzgsfhzyx2pk8kbh6nu0b35fuhb5t74v68y16011tddg56yfn0hyv36jijk0zcmhlxymvwx81sjp3oqtn9tnvuz4f88xjanb2ue63zvad7zvna3dedabqnjla0nz8gtxik1v95yso49xre0c141dxkqafy9nxjf48w6x812qpdk6wqodjshzzo938kd8jxq7yt07l91qj78ohxo7vpshygkes4z9206500mcl4l9w6j1nnkocnpfwmm3ocumhd3452fw3ciad8qmytma8fu2vxl71nme2yojvo1ko2ci4whv87a53xnlu4umct2xwa0xcdaphry1ot0l54rs99obdzkcatlo24rf18kg54rjupyij3p4doiop4kfyq9uyo6vx3tg4mhdaymytmjl7cz2virikod9bxfc0nvqe7fsxd2pec4l6lhm8x6zp5bebewb5dgso5073blt2rho0x4lu7k6ult53sf565ftf4bly2syhnd2213a49ft5l0flv99c6deg9sns56ouai1o7u0tuj59lwx1fn1f229nsj2adl25smp1qc063f99bau1mp4e061jmi3sfty3b3x58pg47tmkd0yv1l1r7ctjlqyikye69r75w8m9q7e25ob8a7ake4mlizwaudlinrv0v983vb7uaua20td1mwonodkzs6h9oiulq0hbitz5v3l66qfhynvx2zy30pzlzwgalu5y60c7mr6lp5jf2xmx7vtr69xb4dptuq61w1d1rft4v60m9wn0djprev8mimau1k935z1ak8h77lt0oil4lloboac14izu7qn7j6hyocrdgs8r9l6q54g8alfu07pkznq35fgorkia8r79hnci8hocqoedy3xtifxyddhy7sk94ju51hahuiv5dso3nn7s87va4qlin7zs0ejchi6bzebiexa45maxc5hd4hi4hyy9924rklnjkuyc7ofke0w2j7oed2q51k20lf7yg91w3ha6qx5enmfllugfhpx41x3ar9k44xtc6j3f6fqhutn91b2k6m4vr9utcuzmjb5imls5bqn1l65xz6odx4ch3u7qqq26u71m3dvlxave0ub5krygkd5z5e6iregm4spgbsk6eolh708j49vb7n915d1m5rn1ac2aubz1jxhamijrgf2n9f7e9c4zxwul22q5yimc4a0rlviqwmdhgchylc2rlq2s4uvvti60i1m7pl4lrex9peyss1udsnq1cehn2yniwwp225ipdhhz0mrutqcacazj0lsmmz4jn9uywtuhphx89iuyyoiqizope2bgq865ibo15w0dhqu4ba7noa3oi5c9jooeu6m04t3pbseqg37qzjg19leoin9bmklt2fud0ol9sxcb97kkon9rxa8re8ycsq3fh6z2iel4hzpyixhp2snwu9g2fjo9xmpljux3wt7crgo1stij30tk6jvfny29c3lwgzamvtswcloeb6k8cp65jyta34ukn9mcpohm7wah',
                redirect: 'kuge9xoq60t9nviwkqjjbpu600g70plrzzx437wt7ooz66fj9f25e847hkj94qx98ou3tn7w3133thmc3mm9k07qvk0p17gt3x9j6bpkwn7ftkbh0idz8uys4jyltshh1j5qkewtdiztjdx70ssuto9ea5j9ui0m2ys5wj6d6fxxd9ur4fphuy916wryevuha3z963tpyvq7ja3tsm09laa29rzpew9xljgife223gz34uxrcnepo17gf5l190jhv7phvb2xc8u0czqk0ya5yjohk5emors9xgmuwjna1qctcycsghenw55p534fvsmpvhp2zfwaew01s9y8iuj9wyce7gs5q9lit4d32r8fxh4lm4czymg2nqiie2l3u0xqu6izbn6nejry75bct6xs1f6ko5p8r12bp8bjb0mcmy13r6b2z35e0y7gls7vdw117toryj8arr1wocc3fvsvowzswmswreuokuup1r89fzdetbpustog7huf02jc6f94mghq5qonzbvgnmo08kc4ee1zm9ggu8w40wuu03ioa1r250qfvav2zcv5i88v229gj1rrai60a3gjtcdqziwj53iy7axs1v5ciw272wzakjtg2ztdzvu1tg8t356pi7dsphdtsu7vadwttskkq2b5az93qus8wix5n5zapotalz87if7k9mszroa7c73jgulcz7jxomjocmm1lh1su5cq0mqn4cqu57mw5s6y1avi41a7z8odcfurqo90noka6yuhdve0qv216nrftinhh52wvqt35ci4bt1vb6b0tw2lsw8rl74qaa62jc07dv52cynrp4057tei0c3vv3ggwk19g4p8e7o1by1gmzj6tiduxsxgg8ytt8qpygkxljff15tj23demwmmklyn8lmf9l0rdylhj6c02uhwwdrqmaf2smimysewihww4mof3zovhk49q34hwuic8pl4f0ibmg4vunjxt98oqrjwppnorucbemnal1s9sx21ffff8ynzfyrkqs2td4x1zqgsv5lbmg2tfgspgvvnmuqe16wb257as7zqbhg5andv40xt0bvk42c9bhlo6xjbw072o0mo0pd5kabyfq1ydrsmefpqi16fr9dro6lgl332v0afwdqozn9biccxqdvmdliucstdy9v1jqbnodnp7xduyo4ugltsl3qpusowyztvox3cs72id1xfdxmj7zmmrpc1tiocjtaurr3t9li2scnlr0jw0el5xda43g2wt1t2wtna1yofqjl761pboex92ne4tkwiwlks5qkx2a36598f9ep3hdyh7o791pnljm8mps624d3n8zyw2x3b1mfma17435o3devxp0vpsp922zku6mzshze2bmih087dkka4ifci73fktt2mosujd5ap40taiyqlp5jce2aunu8lskq8sg4rpinwkkayxcoh8l8m61wdg2ms6z5q1mx3y3wty739px9ptxabkjd2lwrma3gn4u93fzk3mgta3norfpnzrzdafcir0ln8zoxclw40ohyzm69nrqaxzrfd1vundg9vuw243z0zq3wlg7l715qfpu9f31lg8c41y780i2up0pxa9kh31099c8btbgrz2gmrrcvpm3txobvpxsle73isyqzhme6eu8x33s8w15ku00bicvv3yh11l4s7ce2sev6s1ps25jylfra8kch92m26rvnzmuk6bic1rq1ib813tk1z6nx9umwh5d5x5c5ialq1v7yizvgzux5ygse1tw292uga6ffax8oiwfyo739tgkw8auji7rqamwk4j4ajsc9b9gfgz9bc4u0b09vxyj6vs916vkcpo00edo1pl3mat8ei48bbi0vvhx97sfrd1wob14swetll2cwpx24rhix4cj01j2zn83uu0ips79cwv4wclwh8x1rsncjyie2v9mlp3m0zmdzea87pz2sefxwoexcqyhac15upfhprblboqg9qrc460ihrvsh89sq1fddwdwgdmawy10aayaexfbejs5gfxaajnd6l',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 7021495775,
                expiredRefreshToken: 7856920806,
                isRevoked: null,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsRevoked must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsRevoked property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                grantType: 'CLIENT_CREDENTIALS',
                name: '19ka9k6ih07kqypi2gymqg9xgmep4ihfd15r5hjnusccon188rci4qxusg1dfs9iy7l1t5qac54tpbla219w08wd6dfuix5lcaeauz90kc13d58zzrefs5ozd5gqtjik1w320xs1rsgkdvm8989mq6kk45vegjbu3rtbo2qhk6fo6cp0jrhjl05c8m1kzp8rnp6n0bjudv4hz2njlld5v962hola32m6a8pth8vx8g1zspcgjtnuvl5bh09tasy',
                secret: '1nskg9tg42a427cwmaq8f065i96sb959mvuva04ebwhe57car0k5tktp4zsv9vd4zghfujg0f04m3peorbweh5y2fd',
                authUrl: 'jgjfjlip7usyk1a2voyg65tlyegsjblfwqvvg239llfygt57dtxlg5c84okdr0clssi9ewzptqymlnmsimqj50c8kh2jnye5twfntv1zxuwsnbsk667ps7cipzfhg5av8ul961s4c3qv3hkk9zrwhj5h4rk1tt93czgqsg43jnajxsyjqhokm5c5yprx90z6zyldvnc95yz3vbc7kt8pwznyksp96k8n0vc58x0xobe109q5qtdgpzwv5b8i8gy81vjlz56jv7by1005ya524sfpzlum8yk1v95t35re66j0cc7tlbm5ohzvfquhg3d1ze9u0x1gohks07u8n09qc0v9b775o152pezdfasss1u753uvlb791o5my1kcepbmf9rq1jo4h9k0xy15ztt51eps3otpcu1xkgbebjy5mb2y64npwiq1q2jagj5lz768cfcv06vnf7v1v4dgqpsxk2l691ziqolj40igz3ytmwefzwcrp8dgl60nll6d38a3mpsxiyzuh65w5exrru1y33rqzd5gwg4hexwyi5hr61hed555xd2bx7rm2sm06a1eemumilxevpqzc3cxyrrchmssvy2da6yrr0u23tiq9h8uy8vmxj7bek0wdd522fzffnoftxal3r6rlt5ek6hsc74zh1mc9f6mk0s8q0ulgyi6gvqonwvcs27knwpa9slqdrq2l0ou3pk2uyy8hns7jnrr5vmn1teiocg4yxcc7twzcmqysg5os2kw89emaorgeox98qn9j524a1sgwvlomd6g34awsv86ouyklclovs385yden2kseplqialf40s59a7vp7x2v5qlpkbvv70f10n5t5827m1e5mh9axtnp4l4qxadutn5spt2g042ksnsvj5zcecqplqet6u6zw4l2fhvstcvb4ntd1t2y4vp9u85uc1rtodge85vj1h73xcspdb8sioy88fhc44c6zbw39ifb9ptz07nbe4osqqo3xesj4ai0xyvhvm6ykstyokvt1gs2fgaco6daqns1xzheurw40aojrefpnqo4huxbd79v1tro8ssjuo9mwb61rvjxgy9patxlk11g0ybvyqk6wyc7hjp42ql4ww16trh3vwf6kwiqybc8hd02v6bbaaj2by17wx1a5dvxguyxgpqkubpmxtqf2lpmf4njy7n8a6ngbsg9hu6x4gkvvqss2w6d8xbiwd09dpjmuhb5lnrj6p4b129h69xqzp3unr7b8zxfygitou9k5tp3un6nfgu51geup6i574rx5czg5zgvpto065o45n9xxqh1slr6odqdgagmau94mzktjz92uly77qnuznrh2qd6dtm0zqv5w33j7jifgoxwqtt5fwpabzonybw1sck89q1lr897cul27lkp8f1sapbkr0rjy5bw6c8tdiib3pf8ewggkv7bnft57rmce64wae2p2flwhfdkehric0zqjqr3k74gdv40911i55d3c3nsbvh5g2rrax2nm9ry169bhcp0wgqdgp0wjew8qt0v8d4njh27nfar9my8bl95qsc1grxfzd7o7vg08uftnahop9gt5mtlrek80z6srwcnzs600f2torvdidqh4shrcbrkp1xibj8fwrbcpq3nvprr5fc3ozd0mvsiadrwq62uet165iag5eq9qsx360dpzhptavpyoxcz9lbfk30vbv5yqtdndh45hshd77844klnmqumnqsy60ti634q1n8n24gfkzihml5rv3iznk5ppd3m3wa3hps5v0ahtjbzwoy7bqe4of76m5gwuoan5wxxp5qbib8spkpqfyxafh0a11zy8wsior4xvazveso802ia0axml92ja3zv56ryesgfkj789mcugdirr76zn3br7fmpry5e0jxni1ckex78khbdmdd0t7pstmqk2ops7e4jdq3er5rg5lu68xdvcp2a4yoqdvcmdzrirmjxy96mfzugcej33lezjyypwwbqwp4iqjx5705pex2g36malalxwr8zn6cc6fi0vyb',
                redirect: 'zxdmszcujyockyb9fcvlt3gj2etpnx02w0ou7rprbsqk4ki3fjytiop2hbozipxmpobkls22duv4mfvpdvhb4zs9upmvw1no1pmjylsebpp9z457h1y5kvohb7z7yb0716nyrip0w73pzyvvkozk3td37iary8p6boomcymenp6o6iwlu0vjg743g7jlril221jeh1fbatvnndtdmqn3q2dlzq6t6kdotuz8eru8rrta6yn8bxkqlj3cdfua39519fq4jx1ocy4plh87q9pcwpwxk5n9q6uzu3milaq7esl17p2i5b1wcz1ymin61hw8n4ovc5ckp6bi514y8tkewoxo2biif3v2xkumv8npuujkqvld7ez2bx903cg8zd007gjf0coulghc5rn0z7lhhj01vq88erpkfs87w384i1g4760snb435en2s8qdbdla885kt410velkkbra486g4v1h59rr3n8lfj12p8sbk5v9v2uc7na4wtkzf7mz9q8njlqs3dqy0q8ajhb858qpyypxykpqfl7ask6wid41ptx6a33l4js9lgfdhuse6l8r81czv6ueybhh4a6zcbiopi5xf2j9zd2yjle1m469d1cy2rlzvaismkqayw51nuy6l2pj245ektca0aytf9z9asr44d37jwmtlqdo5g4kzyhlqplk6nzf36y920hjyjbchsl2usl8vs0ae32dqe7kqgh2rks1n4a51ztog2ah3nqfu46qczwp04odih8k9sp2zfdrydnzhmkwdeajoz1tkry31sl42efo5bf1ce2ht1yw8ybt7p27n3um7sa48tr4c4wxfy04tcnbc7ax7ldbgn52szxucoylwd9qqo3qezy8yjg03ydugkifrjamcfq1vo4f3x2ovm53bof3wdbmt0bnn823lvy9qnkdz9v9pfqtgdd7wvavqtufe8my6r9g852p48lxju1mpt7k3dg68ueopd10kqw0g38bxf8ctnyw2y53x215t7fpw8pbl1wamop7qxmurixxoxldhamc0nsuz2jwnertp52lik5ogfy4f26uj9f46lj8sqy4fkmi4tf1zqwstzju0z6egc702hkn0j64g77qccwxwtreh2kxvwil7hjx5sc7d9xby1t24cqmm2gxmduzyho7i2vw4vwulp5gwqe2xa6wmo7wjpjhts3v2baejyl9yeo3m67k3la6j4a63b7jfrrwofrt27etmi5cigcs6mi0ahekts40zk76isvi98qoaqibxa1bb0stzn1abu3sabnengslpeyisnfv7misp3g16231yx1i6esvyhzopsutk1jdb19r8dz0tkeao91y3lloty1yrs2lrjukbc9o69dzpzx36rkuci5gkn4behvd5zm4w4kj56donuzm5wpbnybbrhjcfzegdi30bl4lzu8b23wchev0m0huomtjo3mcbcd5hou89c4a0dojnbir38bjqmgqsxyn5voqx2m15dnoupwvrf1zrnrtziqovyac3h9wiwq9i3jb6rhj6gnbwa0b0142ofscwt9nx3y3h1d11gzquna0vzssghezaoophf0o9pgdvgx1n562fbj0lbe3p4b567o2a5lniu30q1us50le5ox1rhfvr6inm53ucttyjiwswtcwy6anc7oojokjj8tu05b88w238xvlv9d650ynaaw16bghz63ju7hvqwih6vtskz31vnj5j1gigrmazdh084kfudu17ifmkbtat2l3zzf4d1l6yd6ider5r1qinne3xszxkik8bovg0171vhqr13dpae4c3ue49wcljdc5khpzobcxmds97m4wvf26apenjqfofywjqmaluup6ej0u0md00bc1xvxujsry8r45t9ri2hyvu3me4eb80wefv8gqg5qy4gs9gnn0u15b90hczeatserujbrq47qqrb3yi1qj7zu9cqhnjlo8xgif28v7q1juhyvvhlcoa7tiroagdmty9901vz8iawgfivo19bexxue871ky0fs29atcmhf0',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 7873003712,
                expiredRefreshToken: 2132813240,
                
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsRevoked must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                grantType: 'PASSWORD_GRANT',
                name: '4ylce2ws2b27pf6gbn081cw702nwbaz4kqax9yvw75ty6b3b4f0w5qk050nqqmjvtxu57c5xvy4ktkequ3jjau6bkvzsn05aefx7xwmfgq1uson091iicucr8zeafqxzwoedxmwrc65hbg9agzemtk3drqnru9g6ew021q3vdqers4w7mrc52hitpy9d8yhmgr8rf7e4f03dy7e5fbxnns3tjx405emmgrsqv64bxdkmzi67efs3nwuhj5s0g7f',
                secret: '78277zu2zwbd2g89d428xbi92ob0rq0rt2xe5osh9f00a0et79ia4wml7vrm17sfpdcvpzda7yb54871n9kllzm518',
                authUrl: '4u4o68x6m9blhpresrbjwe6fmn305j0ksozj73fxt7npa28ed1a5nom1qtyov1t0afqyi8mogvogda9jquwjhyty12cblcf7ow9etjn2ouooat28nv72378mfdqsit42j9o3nz0vv26rha1izbtaon18t3iwtwnu05azldsy8f0iqvooez91npg52re7k9iwbdskd7id92mp1c69ygh9muotrmmc0o8haz3rqg0jopztahk8k2ta5kuy1kwjeic755bt6n8bmo0xp6rmqncnbho71v0jmy92l36fsvf3ej213i2rn9wy2bm6jgepxjvferlt83rtnm78e29xq09zic5pu2k8thw4zqku7jfw30voxweafo7wkadjnxxq8yxh50u5g8ivpwy0o1zbzb31jxnixvphfxgo9pgpajxq5os78ci78dkva5p8t20r7u7k344uwzh5ai8gtmnv6edc5um473qgnajwc0xcvr6cd1kdje47io6xt39cs31yskw11urp2xrqtowgeyme92qtm2gpoqmr6uw3y37fb6wgvgj2z6j8rvpnc1stmdv4wy7qh0t8i3gls8zx4rb04mtghmbfgofre6d8aj2ftmkpnipuljdttuackt7vyt1gwyemspphxq5d5nd9m5atmk2fs0cs0p8b6jr2hramfg50nkvwkq0dqy8gfr3c5hbaozo9nt7x0ahvhz922apkhbfv0pw12kvtp1yjieys2yxusepvy302sye4tplnq179l66bmq8os3mmjowdb4unkmwetiqind62l4e5s166uwmh5ust1genhbkkktsdjevh1namnkzlzj2lo6c6wp6f7413cjko12xjcnad18c6f7pjgr2wi85jq8z0qsbspyc0bo8dsjx7pd3mnzacg387kvmswfj7bxzu6asvopes5ex1ycg54zsjyymoc0w8dajmrjupip63te2lza0jrgzxlbl9qfly3o81ajkgy5l6w7ivngihiv39tf9hcue1khv9jwrwkx4idihd69a2uo95jn5svuuz5f1pkkabktoko8ez1lxv9jz4h62w4gws9rmrhf0faqudfcsnnbuu74pllia3fr8n107vl68xepsjgrzgbxqg3oz02mihrq6bceshgsi6d8jy6dy2srj4envq38bdjk3asbe5gx33bmlw10hru9763v7476470pxpmppjl94cvl84m827pxqfnz8f537ihhu4n4eqc8jzu5pzo7auys3srdb0uhe9mazi4rrjarhxo1yu6r7gpl2e9m2qvban6ywsfbcaaho51gwegb8waxcw0lekzh1u24hgknxlt2h8scg98kl2o2aaogig4gd61oqfx5lpov82lz1ncg4d93q2lkxqhkyw8zfm4ib5amjyhc7g3vdcff7729yjk5gs6iq2gf2jtf2xrco40hq8zridqnphg1mx4jnhvqezo36urutv8eksy8reju65juqeo33e2gxojp0mwxot4nohgvwx05zayd2bf7moux993ivy7slybio4dgl1j0ougy8sp8a9mb4td85au09bk3d0rc7cz37ytvag1k63raxtcq23naxt4nqwehi482q7s4x10yq6zi5jdj40sy70ehbojsibixxfy9ak7zlii0554xoqdmooyhd9ov926cv2z0skh3y0nrsh037rhyjpfz67b21ccgf5z2aa7is5un8znvvugs8kzht2cr77yxn6mlvypzzlh0lg6eugleh5h5r41ea0awt40rl9hnt1ek31z76glgfmkviucvyplmsdclunpwknvvqvkjhbi0ay8ie84kbwlxw7b1zcbci5w0o6erdoj2b125w8c0babjh55iwu0koukpkxay2ddasbty9vqfgj0czb76angh0pxzbxfy4jl34xpogvryibylyvd8b9adz0d71x4p6pchu8w1ybej01ltsm46txn0j9rtznudxaoc3nbruv8w865t07t3n6vibwudll8z68h2r2cjxvvu2i6nu59e9zlncmmwk37im7',
                redirect: 'f5dj7oe7b2c02bt34v21l48ate9ou3plm0dg5sjp5aoe13w2pnbmrsq8nhey9f5i96sd1yl0anxzwejjceyopc8yt80vb858c8374tr6vde65g1soeeuz0avw36d5laquvnce645sq9qkfyjny1ztrasloapwt4v89wszhietedcsdrh565um753vznmteqn3q3gg77qnamxqh4rn6asxfgdcm3nvlyjrmvxm1ylgbwf2elu53atcx9683xvrfb44tv4brel84s6lbbifcmve29x9a6w75p58wk291cfsxhc9zhqatlqoaybf98jak3krwyfkf6jkn6x176a92mqdyzktwlx0idj5ko2omkk7hdao0yrgva0sxm1v3reie3n4gucu6wez1ou875b4nc1y6w6stm5zx0nnnvrv8pgiutibjn0mmlazakdl9shqesw6600q5x8tcigtun6wno488kv1l5j2xt3o6boacf5oddd0zhrxmfzsddfu0fujubadb0dqhaijx42wu9vu8unohm7qwfhebtqm1zvs5g6avwvszwku69ppqkjdo7xl3so29ytc7gdy7126fgu0zrpr3hprc1tgeiabr9j01ki7x6gdimin8nyg2b48b0vfo5zngwrp9c4ofck2vaxec8wo87oyqm7k1nijubunekhxfocm1xi5kis5z45m79pf8eh9tbv8bm6viz2xjizhe9obaa0gcw4al71zyd4uyjljkf6eqtd5iousku2dk1037vqg5t2wn01prgc9o4jdb6vd45nfn97w57q9stpsuvetznmn5k50887ptr0hc54twf2hj4orxsap2eyvz7ugh5wqqlli3z0xu3ys03crwejja4fyvywps7hnyv47lfaz6toeiq2aiy77gdygjyl9oe5t98er83mgx3rj25nngc27qqgshg8k58p6p1frm9dfo5r35yrno6dh4dbudrf26eyjfuw6rxflw70xrrn69pu48lpd94bi3q967qm0glmalblo71m6v23vz2s37is4gsxxbpqrcxaovkt16a8kxwuvxy771dk8s8gopr1r7o0jt29ww4d054d01flw34p0hb7yvsretuyq6ewtyzlv80n7ayapxkkwn2g47futwxahfbhjiavnzuys52xrooq6nj5vhiea7wnuujnt95m3gguitc53ygcea5xbzjehh2qdf62bbx8a6sytuhtn2ny2v537rjta4jjiva3k8556447teuj2a4w63lwst8d8c4kfucvahud7iytw9rrg2yhgqhm6597l9n7gut8nrsxjedtro4jsgh8hqexhkmls7ikyggskcxdd2038tqs0vyje1in612r49ovglg2ltw7jwms9z8xoesf9ovrvrrkczvv2n77lmlke4kz62ojc1ygixu3n1sa24jdpzewa3vy0ko51rbq5e0hjm1e599oqf37xn946gkporjry28ax9mfm02kbesra0vmnvjqbhnrcrtcza5jp5wsfl62ybjdlzuea7pjx3bl6bzl8jie8c21kcnnafpilgb5kmghrf6e20oulcmubsmb0eglq7dwe77ai2nqowdt0hcc6ygk7pnaddti4wmlhbn03yge26g3q1bfeo3v01wh06hlrjvm5pprgyfvm63bc1613xfqiakxruea7zcpak47i1uqr6cddkizl1e5ly2zb88fejo1ha8e64ylgk6rmurqhftnkya9hs6b0h5f24t038gk2e3qo624y37s4ye15whj7yx9bw1nv859039qsz4iqezj43cy9nuzou22pbk3qirpnccnmvb1kuegascej3pi82ih3ev4er3uomo79prkm09ero7vhysugtk03of59ogs0kdo0l5h39mohxr7649r5iw6dsjd4q20hdpixoeg6qg50tovnqp6ad0mwf24gztslfmqszyfh7dy231aosnnqp6dl3e5h6bd6ty6x4s2d2ljgb58qqc2gsizphe6snk1hsnzmz7p03vfyj02os2jd7itvdct1v3t',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 4416458783,
                expiredRefreshToken: 5109789745,
                isRevoked: true,
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
                id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                grantType: 'AUTHORIZATON_CODE',
                name: '1zihofx6zz1yv6083j5ji5wmm1elq7hmj5e1arioi9lxc10tgjvdl47io9gwwq4v4l1ja3inj2imjmx80vrr77bf2x4uthfdy2xubn1hmyfsf1jkb5iqpji8zd5fyuckjfq76sit0qq6yp7s6l3hr92rnvo07z3t8lnlq6ohgoymxishoffwr3py8xcouoag5q64kvb92uccge48rcmeciqtdoa3cw18cizzpnort85n25lsgd2ve5qiyzwe1va',
                secret: 'ztgqu4y0d2t1exl763zuvrkg6qx8pu2jmd9s79ggkodmb3864ns9m650cixteahqdjg3ljaeuqbwmwghoi4q9ghlt3',
                authUrl: 'n20lec348hoi27voch72123hf8pn6jfm6n5jfkwhiwf6h7v38itk32mcoc1topqqa15fooxr4hw52yuxl0kc6t3l8ifqx3hedenvw6pwcepwh7zvv5k707ybi92kz2ud2l5vmb10xb357bz09en8llc6biolcqorvm1q4c4g3j3ijy5c10xaa7y8gzln12ex633t9gq9aplv8lnllyep3fvtaven6cdg3jyz435g2rb8jjrzuldjsxbkto4tql9se7l2wmhwx2js2bxwtdov67bpdirs1wjj3075nersncodmn53xy6vhd1mhmxwfibew1y1sfs295iiy8mpb7nug6h40ky2bk42s6a3h7dwr0ttxyaxpk3zscyvaxnbyypxjgt57jadnv0ny3yhc4u4bizeo0gzrexc250kiu1a9jaxev7aqto2hl676xnxne9e73y9yj0lz5sdrnhdwug8l7kc8jxiei8ro30eqbawgotuqrfohmkcvswsfwwmp313a1frxjuckqa22sgtfnnob7hag0ov24arl3ebtqc4hi5rhkwh0k2s8nbs30meu4ttz92o6damr2q1vjye7vloqrek0monhxi5ffonm6jhmdz1b6tmivx84ara519cushx8hbsxeyeos1n6tt3vifd998fflltanrgueagexc6meik2ir9pjoid3xj6tqcchrhz9086yksv6boqw1bggbfbzeowxcjgff4m4hrubm5gkr0kzjf6cwit6ppr9a47894a3bo26cqsecp4abjs1329eym1lqs2bkfe7hvk543m4sbuqy14bdtdrbhnk9sxfaprf8fknwqwkansxlll23ym8oo54aya2rktf3nl9ozwswelvjmnu553u3r5c8au39od1nidnxmc3p8v56tz9haaiol0eqzudg12rdlc5iexjjit8ma4cdwyvmctqd9ybhaggidqd35shdumh8z3kcr6ov2aj18171au41jrnjmvyrh9hps8z3pvuynwqcurl77z3jchn3mtklnh128zpihsyuwl9vl40camtavkpry4ilnlg26jshgnn0d6ap1zhiydgdvjyt7yql928qj7yjj8t6yt2yqk86qm1dhv8wpsej1asmvb48h0918n4j013l33cexrfyz84z4cau59vevlo432zz6io04kcws8hkvsfqhhqxij4fzp7gk99kkuejry8j2cwgh3ggl0c0kt8lcpbbbb70rjr6xdjurm9t2v9gn6998lxgfsrhrz0n7xzbydd686qk8ydizngjz5wmg9xhzi8dhue2oehgcke6unk1t00lbzzf22chjehtk8n9zt3ucw86mhg9bz7sg6198sumllw4fhr2giza1huws1nggvnhkqmbsw7nddo81r00yjqmcn8oade3lrr5b2ur8u761deigtqqkdulxut9slb8ujgjumat3mq9cx8bhgzdtrvqfnair2ctpvcz0eclsdo9rb4hhb9m7zbytohlqd6pzggjw37la6wh5u0qqq11fky6kojticfw1euot908ghx2cpwsyil7d49xl3y3dp9l43u794ncir5xtzqw4hdyyczk4uxztsrjbiatz0ik6blsp9oqdie5eb6xxspbberlub388b7y1zzsqf1yfuovmgr8o0sdixr1eevnk06gjlsh4batln8mo5sstl766zwlagucp0al2vb203n47ro8jy0o1bved0zzqomdlwmb3z2j92bi8lflry9731ubq6d5xjvyen67cd9zgi4ihcs3ftz4c0hrfygrb3kwq8jo8ivipb7jc5hhondtrnu7hm2ha72gnxscflgnmd4r3i1hmkgbyd7tb276wkugx37a7l8k49r98p7vn0u9n85scoerfbrn7jib0ev13v0lqbj53q5zocbn0t71tyy23fckkgxv88gi1t6fk0znaczuu7w4dzhyy8m8xdp1u4cze7e8trh545ro3seci4fde3jkl0qud3qpketkg70yg71mmsx3g2ts8kfuklbvw6qv5zn62',
                redirect: '6nj0kdyene8lpvknvmlvokgk3h7jtkigpkhkekjzgsx27bc2dojzx2om4uoalbn5jkhc9bx9wba1cvtw8e7d9i5ovend489gyim847q3yd8ro7j3n9l4224l37udnpyrgnwjovg7f4ti04yfhoeyocyzz4z660j06ytvqgsr1h7rz7f35yl7ia8x1zepj4z7vc3hil8fq03rj5m6n8ip6qopb1tjtfo4my2vkyksnt7wtq432m26xzs5rut3apb4ek6taujoca3abhcs9fadv1wto7giuozxfgmxofps6ijxmbte96zbkkocrl3loldpmutgbr2cvy76gbg0l1r2wph6d5xjcrmacuuaykg5qf9be63wz2hfgmlhbovjqqs2blda58a2ki27auz2jmslmq5rw8cu7o7fb6rptqe0qjslkubt8wrbfb9hq1li9gbsuiai2a6o1v4jx5krgn1kim5rved9ep1ex9xboxmo091svcp83fpagpyq1ifo44rmtrgwyeebqe8nejyeuf9celi3uxfmnbxhxdz8n6deozm68pclhz3yw8es31e1mfyaoa2f3emqnly8x072pyuzr6zy2yf9d9jld9uj5x8rym1qbma0e7leng9hfnpph9mq7uy2s4o9frngdv53cqgrge9ghsceshlins9w5cbx48xolkgdby67v1cp5juvyawo49nh4kac89fd4vvxt4tdxz9si6t135e6bqbq5amhowdfsa7pm607xse6xbswz1b9mnwd3fb0z4wuru9zhilh9cfqrccwo8w12wx1zxve70jcpgtzmji0rm15olicyc8i46zkww4d0nz5k02rcpv9atg11xxthqa0tluarfurpwprtpzqrj0xzfjf9hb587fdzvfvx6s1c1y6yw9c81nh1cia63ol6hs5ywv3bi4fn6vnany08vk99rh4w1hlnpxm25spljstmfzspog8cr67bfd2bsbdwvohn39g7ffbnbivvkddokze0fpalhwnf6gafd6us8ewe1wr0dbf6spg9p13o87fbhx9v9yuxla9si3y5sb9fnrojwqmmdag3uwhh1jy80hi5tkgkei8yoog69nxtrhums2h65fecr1qgnxf728pki9fkimt9tkz6lgodvqhznyb0tohux6tuozjipe72eop7aunlfw35e6kdm2dobo1wspmd2w1698qqveeuykt9bbtpkeorvebfnd6xmwbf67vtestb4lky0dge9wgt7t35kf0ogrob52eo6w76wl2v8tx2azec4f9zbbu025r26vybdtf07m5lg7tnrz9rt1dm5ebd8q7kvj5q1jm0mrvwzblqr9m89z0y88dc6fvw5u11l160cl9pe189xt6fl2bhrze389ruro6fjbe2n8zldam42h03dpytkwr4u1vnu5r1g37k05g6zloauwn50ci926jnsl2zs5mjbzc42aojk9jpkyyaagrqaigxlc1zkpuex1r91cb85m6zdcu7mnd6qjx2bprg9xhaokq5setx91nh6ghsc3jvrrmd9el8vh25omadmbcwh2b1wnsseef7o8nzd6zihfsobri8vx3u0u0hhvevzv86n7ntqdbttz0bsgvgxsprp16pp0cxjz2rcsp8b5xiarupp5fjbmyjqv9ay5hay3d9cg3qfdl0lymjmvfvyi56z2nknbanp96zgzwiqnfyf9s5xf458b8ptkflb43kxz5fwzzdsgfy2tzwbnmtn62si0urvfd7erwnek0ff83nt5figcp9thv2fgcossskdwldvgp34wwx009su2284j5rdiz8swz00faoi1hkw058gjr9t5jyn59rpq191wlphubjnge317hnb544uynzx7i9tmriy0yu5xjt0w2dt5ycrulzdid9kz8883ybtsrc31e5rvtcysgqrptlcrha87alcvxkzpnkxdgzjqbd39ixkgqoq6c97qlnq41nd2xw7d2uv5a02bp0xbeyil2s1mv582zig2yx7vy1b2mv03gvt1y0jdg',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 8518440709,
                expiredRefreshToken: 1941245844,
                isRevoked: false,
                
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
                id: '8g9qxtaqzafqinv0nyjw2mnwh8igtnkks1p5u',
                grantType: 'AUTHORIZATON_CODE',
                name: 'id0ue8jc0qmxlmopll2iismwmyqyecl3g4oknoinhojy083bvsm1v1ynd412sqo6nvad2am8ouv5m5d7idwmc7ldhrls2q51mhn1ijvtp5na2zpn75x4axvwvtpj2fbg9kte0v0n0w26udib1ebibmrskbzu2y8v75pbewfmg4nf0x4zqt2q85wmb54xw2mer69udjuxgvj3aaaxitlcbycbjc3cl9qsgfomj3nb2fmgtxu7cxwb9loronzk30y',
                secret: '82shh5xka70om8zfpo0htvgqcfugljjqlz63ta8zqpq92qlfckyq77743x3wak424sroiko2v0vd207iw5dqu41cgx',
                authUrl: 'v50scsjeero02zc0wc915ixdhnygel1bwb0v67gzzh5p2xsmmwj0369k71k9qglgwqxr2ir85s2p5hzsh60qosm572pkxaf5t9c9blqroosmq0braskm6hmkzucgd2cfloajpsi2e5ze39kc81vkrpov6ef8h5hjokqcoeo4ybddfem1p7w5ci4apuk1u4pjk0kihn7198mnzdzu9vzl75sj1hxkhu95c6i548v42owtmk2baadp9bhg9km6gcrzsuzbd01kx2gk53jtzzvuue4a3y9vqk2thour5hefwms7gv9ke18diaghhfxuv9xek8b2kjbef2mo3w20ml5w2gksnax47fl62j8slzestcaaqwys66nkgcwf6k7wllfw7faraf07q1p23cwzd38r4cfo8xje4q7py0xlndogvuxlz2qsi8l14t7ve70oxtniw52agmvyoee27skvapiaeb9vhkqtnov3s6dy5k1e571gzgac2tnh837wiuvtu3sexyaoi8zrdo7n8ioj4qxqw2ni261oz9unvj3stdevyulclnadxx15muvdb65hy0q5qgpni4l70xsh0lwmhcbd6uqcy0fsdufbv40np7guz7bey9kdzzb9df0f334kgu7xhwzkxpibokuvswo2s4bacv63gvebn4hqw0clbjjyafn1gqveoiso3w4di6ebcg6gz8o10kvy7jqwfdjiegkhxexfw5s70i7vyrlc1gqd2xagfvzoeiqkpfh3d95bubmf3gtm3weufn7pnm8teivveyksbm3hk3j0fqnu9xvfpf3zjfy8m1w9zgw46gfmr2s6gbbgc3s2djve6iukczwzqqng68iy1itchqsuzru45i2ipf7e0pj03245hd1x6n3n0azk3p45kkoto7tzgeerugna5ueog8rzfb1ljz07glq0l9hztanbqk3iyuo3yfnqzz4ytu7x6hy4yyvh1appx7rvgnrh41hk58mxlz7qdnkjqqenvi44u1u42f9jlw5fskl7q8mxgd0zb6ls5r4hiaiqn58y0m4ihpvwies99ttijt450jy7w76bh8zckjljg8qrz1r2ji96dclu3s19vvd2szh7o3oh650elb41yswxbxgy2dv04uyvfa92qiv3dpu5ryub0e3nqzy1jd5im3d7mk1eendkdqvlttwyzw8hwy7cmd9yauz3rxch1bdwqmx0ma0sjcp2w6y0cxx06jj9yimobgszi11e2qty80h28exv0wf59j7t9ay5gsojd1tne9avdhk94h6ob2xxfpeil2uzy422ygxjcpe9e4kx2dg6pozr0icux70i72lij5k285cwc15n4jzans63yo6nxphypbx3o5fg5vox3wik62f4odcg84k4c0iu1aohcomzgjcf6004l4n1c5iyf0yttkyo20jzlp5hksi8djbs7m0zd7fh7cq9z1wwihvm2oyvsqufml706i9b7vpn04tqmp6lpm6hm1btjjd39pm6s52fl7p3yhi40qkbosd6myz2589vvmovyo7i8152guultchuex6uxvmuq7wv6n2jmdmayvw1iaamdlptgpypge03mv1dhwaox8hthvxams8tzi1p1bdj7urlmi7tle27m97x4d71ndjn5r64grq48wub7qpi0mm979izdg2wduc2ugzc22dl7ozmckrk1q1oib46q4hy0j7niimcco3t5sn5js0zj9wstqs4zdko9fyi1k08ecepkm1akfw8xcmhm0btscen46btj0aymivuee7vr8tgk1xv5t4tuf57o8u1xcpuooau4j1cplbtjvgbbj1jhl1hylzheo2msyg7jciaq6ptajte97nt1jg9taofiog82zv4vjrhh5gre4w6u6vulzem60xz1i5ig5v7iojvb9jvbuawrxv1kcvueod3xiljlg01okdy3fkiyyfu4xb3paqydnsl81rriq0co49vwnl836y7wg1ir05v3xgqh88z65ilkqbmuggx6q2vlmwqf3dn0o0azkfkstta',
                redirect: 'j09f80cptjmcslpkrd8372g7lmkizc7anm29s0c25zj8k6b7t1g915k9w4ujlbwqkhoftafywuzu7daymrnk5j9zwbec5avgs7munf7rh9ugmxbxyzv4uio9nrjsdvhz0nom996eqwaizl2m18arsn2cq3os54c2fm0u71gz89ajg08cn5lqb1wm6ccol1t328jux98c7hkuj7obmg2dgrhj3ib4n9vwxkj2flsz8vuc972v3h1756lqag2hys6v5ihe38azsahtsso8cc7inhlu2vfpvyrer3luaw3awmp7zjbku7j15w1dymbir9vi4r8qp3vsrsa0fp9znvrkt11fwngsv0q0rmo8g6osdrrzyn1kau6a1i0jwuu9wnzxsyazgk80ut1sc5my3qaajal43g80wnmbr3fwolohwm8t2eaygbogjvbr3f84gzo1frhggjtkmb2617mh8u7ltp70pkvc0ggk90tpqe18uoqub69j2wsgb7e94sdu9dmdam0l4db15gcu9btubb0o5fcixgl5f9z2aw3mxjdf4g99l8z88crgmq3zatdzenc3kpuh58e3zk713v0buva54k2gdiwbl4c2f2fp9xrvm7q2try7vbr295rjeosbqagxm5sxoyqw9a3u8whnh8qyf6seujfqqyxv5jmagd4k6egoshq2zekqaui0l8iytstae73n3w4dj52mxhtiit3uxs65rwuimui3st0akfhzq3r948qawe4v50vlk4ntnqcgaiqvkui0w1lbqswpbgbv0au0phm32p6vyb0qfyld1w7jophdtzzztxst5q69w2esa3xykumsw7tqhl93stihxgub7p3trn923l8aco264gmbcfnh3b5gm48a6wo2b074jbo1tspqs7za1j7jry1mrndzxc7m25bjnux7pwqiqcjcrpa61xpnmji5arn23x4roqfoqyr76ojld43il163jxpju33q6imyhu3b0g0fokuq7lnlbkjqcw4a7ua2r0ccq0q4zf1mqh1q19vecpptx3ojguoisgzwvym3k3dfzzavof7wf12tmdkkronfbcc7rplqwdp8v09yu0zqi7kfe7ad42gqm1a3ucfjwslauh2gg5s3jswftsdl4yrn0oe6xu9lggapbr3sl42j81mhefmd9bq7fdajnvkvyedo96gi2od59usk3kvldffd4yaw5s48fallrmk5sqmam0nover5vh0aw7igmypx4z073fd65tfgxf2kvakhlw42msx3itfb2a13ygg8jrhspdrk9b4umr6r9jwjldnb14brukllsyjuptifbth6fioxgfviim9843x7o77q91jqn4cyypt1rmdpeptu86mh01r0sxqp3zz88635iyysn2nu7v57o99ah3m8musb13qjigb9r4cjr98ppdpcgxs4dgqnjam1jurwa4t423skon70rv0n0wqc6rwjdbzt6cq7wk1khl0vxzw9xscvsymnnn7dsqtsjsa290p5klim85qg0czluv6nam42gyzlpgm8eila74vnecugevltty4nonhiqq38xx388pmwmpu2tigiqoowclxw1aaipv9mvqmn1njfvxa7if1jzk0i4ud1kpofy0424dfi5rzwemgfwu5z4jkfk2fgxz8e6a4uhi6cp1jc6eh4njfzeritq2fkm7bnqm9r5tlf0l1dm2mvann5sd151ik9y7aj8bnnqjgosg4fgmgnnxzbwgfa12efvu64glevp13qbow130qt8clgxoca0n8n7fzywcbzl59johbmckk0uze3e20ud4xsyhleg6sof6o7td0lmw57g5n8sbzgqaam1jy2cyjiolmzrsrlxm8gngyvx86q7dmti7bhufjb0arvkrl8y54pwsh418v9wqx8cs6oz3lphn5daawtc29snrpvdsmfkbcmh2wa3vwp1npeul0jbju5whgehb8mtwml1vsqn6442mu6l40wrpq9sa4ou61p6sigpjp72d3yl54dpcu8jr52j3cz64bj',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 7976549562,
                expiredRefreshToken: 1779489201,
                isRevoked: false,
                isMaster: true,
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
                id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                grantType: 'AUTHORIZATON_CODE',
                name: 'fsydhbwyg0kx3cf3pzwu6dfrm7awoyqphdc2umd0o1i3jrv5zqv7xqueb5r9lffynrnxbfq509fh6aiks36uoznkux2h77c1adfbf90vucrfhu8o1ixwverjs2bmhquptqqlbqq5mt8zxa712x90ywyw48vwtp2i0308unkgpo3bywyrjxqrb021056xkoi6usgdizpxsszikszoz2lycjqdpls8k4vyssrkmdahjtlw46s625p4mx79kucqc10j',
                secret: 'mrh4qqq6hw0u6wmeam5sdzkklr3ukethmge5rh1t2b35hpxgx7bjof1ox1hbhamobutd96ic6zkj2rawnkrm3yor3e',
                authUrl: '4y8dotwi7cxz4tjjx0n9krdyd827urvsubx3dklu8onic6wmshttmzbr6xhbw6curc97oo2whl3q99d6qrmfsnianzy54vaneb7joojq8fylkkzwvlzzjfxmyfsbsbo3mq1ztnv879muzyaqgxttfdvbw9bs948xehctle3frspndo3okhdipptkhe46akmd00vto7qsx3qxqoedbsb3hxcusgqsv8s1lypdovobigzg6tvlmjpvnw1yywcrt1h6oaemmlikj6ywroqdpcqw5k86692eaqn3bwqf23arkbjzyx9wwtef3gb5m9s5mhyegge7edzfwyu4lfxpp2oass8biame5o5ivg1989idfxkkuggdepimnx4e2sogptxnoxffkbe8y7n9o9yqzjbf3ulenn6qsjghdk85lu8da3geek7cipzlte9n55eyvc0k4gng9ctkr40gsb01ouco4ke37i9yjvfjqqu9pjyao664ljmkaqi29upbiydvj63qefctx6sbaojzpplp3fo8shj3vl34cl0e85hhg0ttxsv6p89myn8r08ch19ndn5ris71eroemg6b3qp2ogpgzah5ztnq9dcf46i1lcrsn5zgrl1s65cg6z63hho4ed11lxrxjwo4awurc32ubo72eioyrwoua4n98ji1rc8qfnfgrleklxe02oz0ykunnhxsdb77bwzltc1rgn436xxg12ab44op4nmy0fc9vgm3m60uhzr8q1szx4gtl36baowzrb43cvjg8rgdp5kdqwa380j7zr85m58x9ad9ld4yj07xrvmqw03a0t16e1vdf95sqipij1rcp3gh3oilak56ompp4da124sic8465sm5iazv0dur8fgfdm1bq63irjm2i41bka7ce3vj3z4hq0zzxtkgpkten2mzpzz46y0zsnft4pz1q1slvo0nppzwd1fmcw3wzd6rrmpoafmu1fd3zvuskz4kf5bk2c04b3i30w4joytp202lfjoq7euf2uq1pa1blgdc6gecncarnww6ru3v78cnixi8pr9i8dxieaaq8p97227usrknojrfmjfbl57f177kceb439a9myklyeca4bah9514iej6f1wsoleqrha2wznqytn3og005knb5yuigge3imfjrs17n5q74raldawrirdlgmtagj4hgz5ja8xyc3kimi11ijfg0uswvyaslcd80bkcdls07cydmtumz7r9r2muzf151x8nhvzqb4tj7nlvz2ofoexu5dlw7bm2qwbm0vtoxs44qkiat8ohprena22xzyj2birqb4awjru1feod27ugmiow58nv7akbyev53x0iui4wkrcrpbfq7pt50uateni7zjt95a1kupdhqsvkhtpzwfp9h55wtzbwk7p3wby22mzzp8ecn4gf7lejjan59vkvhyqaolwi4kwklkq2xi5o0i3tc1okzwmz1m58mvg23ghaemxwsay1aed1w3555z82nnppuy5lm7uemfm4m4rec73w1cekrol0bv7cswludage49vndszstod57m916pdcbskl7q02aomdvuadd9jhjkwgkcrfo0ff8zdgelg9zive9lvh70s2khc2q4trs9ef6gcy47ia3xhh1qa5op01jgs77duoi8gm0so2jdz75vagp0ilnzlqruf5ycmtt6854jtchnqtg7rz3iybtdhkooldwdtvtjod8hsl3h4rhb5gs8upcav24clpapk2ha2m5fby1ea8jdzyymqz6221z326hqjydaqbo1c3i4047166bfu3t6pfm5rmgun2yvit1tqb5j79qt550zep9wfehptp6fha177dkmp5r4jy271wgxotuwbipxzxjbjdzbwqefzaqr7dia4gbqjoxjman0499lk6xveuxadhzlzuiwlhb2xrqvtxj35ga6ho9jzodgjo0ujdlo11qwoza2x6ggxyyj12vpmlotz3nwh1eipxiwh5uiif40rb2u92idpixmkstfhl50sgekfr9crdzxdxtbsow',
                redirect: 'zqg176msb5vu4hlpqm7c9g4ssypessqsrwogkdox7gd2v8n1nutzoogap2ew6flpyb97mvw8k9n0z57o99diumzk7gsqwy2fhczz1ghod4pu8yfr1cpkmxpc9rnutnkzr1z31sb858cmg8epcm98wqv9evedh4edmwphkn8qjx1k3hj5bvvy2hvydpwydw340qzb5ct9c5rlvglus9g38xl8mvkgqbuqfhknbnnbmh1itkq9y0eq6uym8wws92qlsnqmgy2ukwxgi0v2x524ul4yzz37yzrxns6mip0x5a3pe3rh7hn8rr7j91caezf678wqr2a0gvg04hhwjwe4qtrht2b2vusogq76sour8p8hm7i4p9vv0q10iq4yx1e4n7d4zw0ttdqwybwk8tyirw3lb1lsop35769tvdcbg7sh9sc9bfvq3y7u1bnf4vh22c8e8qxsoyiq04a0p4752tjt24y1x8k8qnoyfaumxpbymumhcei3jtrmpw6xwi95qnr92uy70wfhy4yt2i0fg3imwxnrn0qmjcxi8s58ed6ohjky8cm8675kh20b64bp4afv47bhsrypz2h0k2wo0j6qfx8nshkx4ke3wpsbfwkudhy5agmcsn4aqywq6rhhcogs0bla2qqnsrvn7nh60rriqp6qrpul0b1exillz86bigttkf73q03tln7fyps5nipz44ol6cjmhihatcm0b69ie7lr5x9x2m152tl60phl4eg9rzuth4f5ir4pt4bn8p6b175gkljkwj5ztov3nxm41uu99891g7sd8o514i0ha0uu5ijs33255i0nnp14psvkp4t4vtr5sdhwwkedwbyosvntakiqvsjcsje523o3gf3f4xh8x89jri5nmbibuf9vqexihrf3vo18h521dx64xfw1xj0c6k6a1wkh2qn8vpbflo8zqtav0zddlsa0yi6zn6e5g9h48lxuzik70uz33qqsmng9xwoqnh2wvbuptgf2761c7p0aiyez5eue3sqjojqow76mwsmvvnqqw6jrxhasf71cab836i4quyibtj3bm1946wquou3tfl65hme3ghjn66hbgkndwfi0q352kfrukdact38kpfdagcjjkofjybobl2xwbgnchhniqrwchs1q83xc09zfdi7j46pmomc0lnbvn05coav6kky8b6vg2rxk99dwt7jpaud4j26z08ccjsaha9y7ju0s1duoed0ee2v2nleujffejgbtfo1zz1j82g0fkkfzenzihwyms0gl7opzgcdmwg4cddncpo746rg7j6mw8k3iw0eitl5r35agoq876829bckvi5krewy4revw0x6pb1k8vbmovntmq3l3656whtsyhs2xf4ya8ctsbe7r72wuzkfch3v4ok9buipydvb0j3dd5crsotaxns4mtak77ispu4f0jrqi77d548m40ajnw19ndaoocaa6eb5plgs4vrd1w3en8pbzizdvcgbtbspphg9nnvubm6ivpfo49bm93a7f7o20b15bwb50bt3o5jtzhybmoiw8yqk9b748c4fmaapvj0fkj2tdjaaqogiozua7r6h4urq0skxp4mcopjx7j6hcyfkltohus33dp603qnwyf1k26yb4k63qbos5rd83c4j4g0q1hmzu3uk4u3p716qspiphnm6nmfg0cv1iq82uoe0sjngggboah918un4wgti4qhemf0l6ictg00dh9vnivblxiz4thgl7639ey56s5qaz8n6lc5wm9i880ucj1wl0h0edjl7ea9d4tk3crucsau5r6ncy6jiwskxyb09gv7b23ziavg0gp13lagvrhalk59detohx3pi8ys9mt6cgov0imncayamypw86cqwphglhyg36g6mgtz4t15dv9y88obfgv9dom1udrnaj5q7urm9jz2vw4wxhjzi0guzprq316h35glgw02d61ce2cuym8g6qvcpcenm7uvqn88ei7zxj0csg3h6u56l59n02mglqiqcxu23a7z6dliv2',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 3866986491,
                expiredRefreshToken: 5779298867,
                isRevoked: true,
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
                id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'o57c9ktty459fdkrhiwdt4twqhzhcaqj3bdsuylocpeg6cqdz5z9wjx7ui59kqah5mmqsxode7qomh7i2fro944l90laqspu7h0lnq7mtqelbhbir7lq935baug6cn8eux9lqy8acfctq1ex1szdjl95w7f13sq8h8zh34fblmhtyxqcapqqykeh2ks7hoyr08zygshz3bmc06l7n1qtacebkrym1xl6fxhmgxokccopqrhlol3xtc5fkqcr959',
                secret: 'nrsp0kix56bk0d8mlfx1fs15i90qadabore139qdu9svtsr1fdbq2ucjrfydnpyb0c5djepwr4iq2m3slkry01xodf3',
                authUrl: 'c2v77gx9dekgcz6qwugnv05d9nwkshfjoeywkx97hskzpa5xfyelkn2y0ni5x9tlj7hiemlab5iivsitnf5ljwvxh45pvxegb51jongthrk5agow1aran96hqtxewj7q2qdrgdcuxibje3mcrm5ire6mvj8qqo2rrxpr1eeu8ndwld0ny2o7tpa4ijthp37q9x9r7xhozi0u4dzi547qp31eo9fcj9zivr6dug5x8tyclpb9ybor284ahml9m3wksw4ehc7ulrtbk1ydh5rqvnqw7h7kzja4kpqy90ncez0vpmaeuhsckgq4xj9rechsg60ene2dezggtcfm65gp95c422uvdguv0ke48colcon5afipzxzhq7k85jhdkskyjjxnm5ctto12hqf67i5v5con0kzxqzq9l6i90re8dvb2honlrutvrggut7gghabxaptjsefnbc2z2tvaqwvrxzfpfxu8wnae3zq0tyemcmvwsxd3ayh0j1f4qmcouidny0hq4tfzi2xw7r0m7m4on26z4ulf520dkhp6hzr59s13v54dh6j38f9zag8yx4ddkv59bzbwusa34mkkekv184k7u5hlki36bswoieo2wky59ob63nzpva8h9fkt7b42p6brdedzgtdnwrvx64zkq2vpif6dzwrkdwd7j96p9nqslv3yoy8ahpmw0hkpxsw66cnr0j808pdio8dx6ppuwjz5or8fxmgvesnx08ox245sejnc2gznbs0jlx69aibyx7g79jjbdo1cy6ca3n4f218n36bbo4qlwrff81s8xy90x1po1zvq78w7uqauaqnvvivzffan3gw1van8i8crun3asnsq1i7a04w3v3nc4beg4fxgj47ejjgf2ut3b651iyepjzmhx1rsqhf2hylaxerh9x6slihvn97tf2hzscy6aagydzmnns8lb2nkmshcd6pp2jz0lebl9fg2wrrppbvispk7cli02xtsx88w3qijr09t1ran0r557zj0zn05gf59k2j3n95iuvik79c7wkjbaf0swa5dsog1gua84uf0s858lhrywktc79ul8ferq7rque6t97u9ygfbrwa5knldrza4rkfdtnpv53iybj9ixthtgm74igkactlcwwzcb9iej6ahor45c332l07rwg9ar8mmkqp8s1fiskw8e4ay9huc5pdxscqyao9t9v21p4bhpam4v9s6sose0wmwbkjmuqwb8w0jbjtc2ztrujnjyzclir683fgssqn3uo83e1s9wxqny7haapw9w5cvsnm3gbu83l38qabbmocy46epmda1e2lvi5kcft64z5ylgfurmn1l0lgzpmp04jz47hfr623g8p2bxsl81xvmffoqx4jfm6o4b0xgfuuzbgk354az2lz9gu9a920gx29ax8mo4yzf6d6w4579g08ct6kx2m4kp7mp9ge92qkpf58qe07evj7l9jox3bdjbzmgequ6or9e22a6qkiqfubshmebl06zj1ruccg0u9d9rdzyfequuficurlqc5e8ombj7oug33adio508wavurbyccoqms1z7kyo9x7nyazygsod3rzzts2f4amti1qofxp20mugvs5jtccayoa3zft7ytrp713faera7chy7uoizng758qs3a2t5ba496l6e3q2hs97yg3ijtamspdpxzclvqx4splw8je45sp1rvzfvpbrih1xf9nyr57wn0skmruijqa51noo0afthfpw5brl9buwyxs4biez88mjm1uveywx980fg29en6hzp3ejdugxgp8xyggfxh36w3ra1v1351lzv3nkzr1ixi6bm9ym1g05gxelxbe9kjfvo84keruqmp3keomugo1qbe1dse5jcixgvom5ldsksi4p6uuhpqkrgqzxhvug58jonzw1574foamneswl9c4k1z9vpsuxzf111zc705273ginnyj8dzdqh3t58kp4fynbibea4q0w625ptaob8lq5upqzd42e1xjxpdjlhrvbn6z30rrpdl89',
                redirect: 'tgj9ig9yzdmccso1sdspo1n2153ms0tv69i3q34okgsr6c7n5qgdtailwgks0j3m6i8fwdh0jaigp9cqw8tj2ciw9lr517k0wf0pehr7mru4luaasvpldr1fp83zqj18s2t4r1em3bnodb773tekao4sag9s8batjhsf7babq2vhpqqugpfrp9g4onwtk61lz7rbilrjmg8kvupz46t3dwc0oshr77gmo0m4qcy0s47t8kw8rnp5o93gwi6u5s8i4wwt0bz4pg3v5b51kpzmwbcisuxykyrb3mb4zf3q4cr9c20bz6js5dpzbj05kaot369cx80exvxcpvtk058tlldq6xm8rtf1uca00i3uhypc0z9ylb94jkjlv8317hotlietbqd98ahbu756dgssxm85iox8ncu2jhux410u58tyanwp38vstnacupfaewviyjp1xiwdhjfmu9bicxapt3t9u75lazomivgaeibrlfwzs26wt46vih148pj70dz1qn2lsyip2u7zrak5l48pfixz8gy1ivg0i9mlticve8q8qoymrlk3m6lb2wda8dz25eeqqezm8aieespjgc07k9sl4ni2caer0a0p148h5yq86894mpxzs5f8dwu534d88dk5msocgmgey3rc2vhtlsa8b25q9cbuh97z51hbnjroe2gs8be8f8xb2ksa88vixgr4iq628e01ub3rzbneswi889ql9y1n1opltvoumdx9rloqlu63dl2uionp9rgc73aiobt6odbgrkg8s3k6pztglqqbd58t3698vq24jbrkx396ohz1faqq8v8mz64q4og0iz3abdylff2a89wmaoivgg3gd8md6g2hwmtlbd359nqttwl6x5hmc0ke4avzey4hhf3yi4jkq5r0csbqfohigfidt9fmlf2i0lf485ynaptdwga29wcjgx3iedqbtiksrgmafs47anbchh18nby6f89xp17394x0lqe8q22pg2drwuklr6k7zdual3bsg33so15i5n799dth1fh6nog5cp57jkqghab7xuewvdsnfidzjnyhawi6kfwoblheisxyuijj35kjievxo4wx6rre6x05ur4qn74mdubn2ji9l5b3kqzpldc6r8efcaode0tfehsdfoeyy3xh4ods7tg6nrnhdloacmiu5ct1xt8px0xlupmj0imnafd57oy0032hjrawne7jq5fjo02c3jricogxemqau3i931yw4sd8xy4ly3yqaism75mt0u5eou61sd5zvuqwx30o481quk5se9vtp4fdpvnwx05vymao1kcebyqsgmel2j1hz1p0jv8v3xw0xv3ttb9qeatkzeqiafya6fr2zi5f974l02ozt74e2x6rlg43r0i4jdiwg6girr29xt4ml8018w0omxcgns82xrtpnpwdsilgqdajaqtcedgjcxnq220uphg0w9qldhzlnpcodi1nv1bxfvsyo7ovi0dvz2keesh601ikqmhow0amiswuhlttge4zf8b20w17v00dtnylgorrji1zaqiy7roxg0r7l84k5plnofran34c5999pc8673ppgkixw9hyz1x1a1n266u1xm5ocpej72msy5hlvpii2ja040nq8bc1r33qyzoahgpyi0knc7r0l4m48uzgqzk4r2wf6mo8lszrv3y07g1ung3dpm8p02y51ta8f6o3rs23r4y24aiakg7ag4tgj7vq7mikxbmi1gxo39kmxmvyjkn6ua0un85ze0d3gm9htzdnzqznuckvr2y70wzsvvvi28a0cc96ql1pszzy5seroxdbungprlluv31fr3qbjlx7vhowkpcjeh2c03emrxckguvfdv2wx32diupi9tarnkt9uuj2550541nw33fjtpyt6dtn3l6wds7djs3e8nhuz11d3qzlstuflbk945ofejxt0m6u2h1ogsnbst113apiz1rifngl1o070wak5uka4qvo4aox3bwqxtb5wf2bd7czcxhlfb67rl1rn0sbzge9',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 7959703539,
                expiredRefreshToken: 7066226024,
                isRevoked: true,
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
                id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                grantType: 'AUTHORIZATON_CODE',
                name: 'i8ld4ufwifhillhsmovtedr5nu30yidi72kpu7j0zeau8qyhevsj7tqzeh5seq9akum4g9i5zgo1su5p8togeg31oe6kfn69sqq4k8x12zl4h25fmsxcs9ocglaqcptir73jt3vu89ygu5sx2wmje8n1bw603v55uu0ihxyircz8kcwoyyhx76juhjsnh0jrvfn2axyfj5zowu5i1hwq9e1phf4hpqtyshbrt4joh3gsb9dfm1ombjnwwny6l0c',
                secret: 'q1eyttuertd2d3flhx0vgp7ujql47oquwzh0bqv32txflrsd8ti2aaksy3qv0xbycphbrmo5x3d2detxbwfo2r2hmu',
                authUrl: 'z2wvdm7fxvsl1vu4v4c1kg1scbvcclnt1uiw14no06ipapge5tdtuy6h741h49ep3kha10tit41ire66bf12irx4i77b36we0iuqa395dz7jfst9apbfbek3uoyo4v0d4bmcbb9baaiet2fngnod5jm2evn2jomm2in7o9s7mej16ordhhlm5mhsua85g0cuzjb70g0r4gye6jo2e16m3g29sgin3ochln9dxkqp2q7tp6yj7cr2dxzjxjb1p4bd14w09s2j50wenph7vfmf368ohhxa2zdyrnw1r33ytp4vqmw1194k8hxra10sfl36egr5pf9ehdkf6zidbic0ij57h4hygz3sj63twdz2e933r7rpmkdj15y8l49au0mhhxj7jyh19hnxxl5gkfjctlz95wygxu98pwrlqktf0upw2voe9g8uizls2s88helrbnph2hijcfhv64hdmvo3o5aa0a6xloow0225zi694tt0bpn7e3t99i1ni6llbd20ub5hkug2t7nxdy7gjuif909o0x5mcj3iydo1rrlp24ax3wcxt1n9h0nwrty7a50jknk531zhkt1fom0t3npmwaa69b7khw18w9wspm3vr6bjn83gkmscacuaiqby5b8qk42gcvsk91jxevwdyqcdxuk374mqww82bj4btaaib77yvg0gp984qllxb5wirrysldw8uu1ll4y4k7adsqp1osn5omfwq1w8juxlllqv1dkivx94t9utvte94drxtt0ojcxb3zzvt3gbgjh27y36urm7s7qyergj19h78gvs0umoqkboft6kp3c4tr9ue4u3r4if5s1veqc3ja5ock5lqrwoz0jq6i6mz6l8zh3l3ls9w9a9y8e0i479qsm8bbhuj3zdrahr2n9trlualbtqnazgcajy5nyoipjhc378fgmeg140e56jrhejjozsxj7tqpnlhkv4odmysa5d84jtplj7mn74eslx4e2slt87cx2byyodtnsyhumzbuprfdjgah9boh6ew5drl2tvx604566pkganoibprbic0s9n5wrvdx3z9w9moyt8nvyv7p7pv2muovt355oe38aaawkviourkm3ix4fbbfhcu5uxu11istjnpbtpu2yxa8jpo5tj9p5cyol4wkt4blbdfpgmbw6whbdim577f4d2nt49biulkb1rzyc7bc12d7d0xvdtzpk0yc6j32ovnfls7grmsvaj7neafhj3pm36i8tk8nek0nsuha4vw3zr4mtudx1fzm6bdoh4vp5mkxeu1qkd67c2kdfnod4sdiyc9hl45krci4h0svkoqvvg8daiwdv7akzset5zjargclg7x2f9fej7tnihz3vaotoe8euvyqnqws0187vgwsrg14xy4bd3j5ghd3nq95cnrp2killr5zsouwiz3fq48zo09mgjrhuhwddj37ycveuyzcxl0w9m212km1pebua1oefrtuf1wk47aygjhv597va013cewyji6qkqyqbwb7ycxarzam1tk173xvhlunrast72tauflsnjyl6m9e9ib238rm77bg3r57j6nv7w22vjic4t0npxigpqhfkk5izwocszdmylvwjpv29xrvcxkypvm8qrbfy05omegocyygw1p5roank8t5ohxv5ug3b7p6cmt8vx4g87z38878f0ym47wjlawseffcwoq172o7lx86vtkeq0g6ldlgrnj58k22mupcsv3ep0qdargpvpgfscj03mvdcu0ha3w8158glch5whs0js200186lsdodfr10jejoocdmcfnzghk868d3v4laeeua5ntss0nz6p1sj4s55vxwif1bdxq6e93a8ptbi8auhof3iqjibayro24cfr5pox75tdxhn2up6earebydhiaie100sf13tlwhm4ny7sblpc62w0vw29oo495xq2kuafjv1u8krq43w1h6ugvd6io6eb67jo3aku2uv98w3ch0x7pd1wfxmz6wz1pcljvkfjlhja266tg4cqz65vxran57s1',
                redirect: '47fd2ivrr83k0irfox8qxbzekkunieqap8t5lzzfvbmedi1gfz554i80crqo796m5a56nshvz0jmfi5gksebys6majwic42ft8xb6d0sjq4h5u3fxgz7gd1cxslltss99rc280k7xa7n7dk5kosanu3693z3lggnyzlf3ep7fampbhxzxeqk0e8cai7oks8xii5addhmcyzgyznmmjhuwcby47fuudxjij7um1dmjpkghtetkfhas35v70vt4qfaml0xtufghy50q4vc3we3j0jxtv70x3osxocww7t8por39abtkl57uiolhevln2dbnipnpd8n9fup0qkuy7xqykkow6ggfmrf0ah9eyvtnnox6mh1txh6qdja1uf8o0fu38z7l8toeke0byzexc60dwtrugjrq765ld09ot1j9ktftgx3fwwtoryq0mb3pf2qloafiu64tzwla368eip0xa7rqbkrgmy94uo9jcv1kym2ncmtcfb3egrlqwvz3k3yq2l3c2huh4mqjyixo186w0ez5k4d738xwo41gir45hidgpu33w6wytrybxy3ioju55ri1049f09s9epwz6lii9nm6fwm8zfmtq1w5ha9i39yjso86363j3nql4sb1b0ovfy3tii5rddaqdvqhho14ugmnjbtlj3e8j8wny8992frhzdhis2jwhyx6rozen0ow6qyz43a65l59x74hh3i8pyh005z9thvnq9r5cmikfe2ya5ly1l125cx9bh2p3gmpjcku1sibeqwqp9hl0w08hriecb7qyfu554od3wibenbzkzntrp9ttsy1s3qga6g5cl0wgqo3uqyx0m6xxh9mrgl3b0kmlca6y3fgw3r7a097kuo70r3evqag3h3ov61nz94s195bpw3k5ztddwfooczpc9vc6edbgtdpmsiefnaxnzp1ul90clkv0pwgz83tcaizl71jq6okupcrd0srw21vhqidkkq0akezlcn2tlwoqahxsfz3b56gqlfl771q2zirrfg1srfo9ab75eu99ykk3r538wxrhgx9pdifpr7rrqetannc2kpkydhglwpddfbv6jgocy4cubytto40err72tctgkjxjecf6sjg56bbv7mczw1jabv2r249rh5xppspvpli2k78itfwdhc4w0pidzkg0osyhfrgqv71z9mds1h9hb37oyylpmqbkcu6ejdssunl3tgd3bwyf03jmbuewx3t7o7po4lvv29ilii9hrm1t0zcg8y058gd6nygbz3itj2h4easttss05k59s5sopyujbqv987d8w89kl94mvimumkq0duuhj0swzmasqrldqozdgk6bhn3f7p7815fh4afxjcdyu8c6hdu4gf39vjw2pp3ykzupi3ubivfwoo5cl3o3ov93wswtql30mg3deimq8a94l8h9l2irh4nx828508xewpa8hsvl5h9mzgxnb8dylpr18bz3urnb8v7q7z8neuqlejzfz83m4hzp194ao931qss71jvld0o1nudh4sog0ni2sq3f2zi0yib9sewq8fszry1vla2kc5l7mgfr2sagexojgwoin39l8r715ahbn7aeywf0vibkpujb4bs6uqzuicn281vjmju6jrpt8esno54bkj025xpdpzdwnultonf8vqjzyyqvdwfe52f9k0afco8xpup3owhavob5nzbhdxv154kl3o78lxuyg9iljo3xs5oau5sb7rqttvya9altkaztp0r9k1x5shoot2l75xawnak9zmyxpe0xkbic89v0q87b4kvi76kz9l654jl3etbduhycdax9mdwf9gyuqi1te7ely6bc0817smzp3ylhdeukispjbe120wyk528ayoy1uyy2zo36gj44uomui8e5b0h4u9r8ptczmc1uykn5hszqyhpdc4evlgkifs9t77s3bk2wa3h8jisgvk1a6xwgae0upihq2cn87h4srt1d992jwp5oazvnbzh8nl5lx8a1po2oyhy111ntswqdq8oq62d8y8',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 7616267370,
                expiredRefreshToken: 6035738134,
                isRevoked: true,
                isMaster: false,
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
                id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                grantType: 'PASSWORD_GRANT',
                name: '6pk78qt7by9ovae8putmu2r2pn7ni9ed903qm25qa67sgtfi96qsw3u3815ena1ts0kplf5hpfrwk5tmooyzdxc9erffkoe9wbi68wp33tjs27g8fm514qg9gfl6n5o06usjxfzg3d7uo2givck608clbzmxtrh8yfad3iswxu1dri5vcizjqnlkvjjbgsouxdlyut61ixarz5duj0r66vdm87w7ejmmrj9n79jcyz1t484oaxofmvly9hja6vu',
                secret: 'h3ho8fxjfd8e83rhytuf4830sqgg21l3fi692242373efck4f0djqo3udfim9oab83t4qd67o5cab2ek3us7n3ew12',
                authUrl: 'l27fhkbvtui94fu1x8kusmr76elrmgvs2g5ggbrwk3m6kw88q6c3tbnmh5b58wyulp6b42vwo44oax5lhh35pz2gqx22cns6rrpb2gbjqhqn1hejsckqro9kb8c10qll5yb0qsyklsvbout22ks1ggpr032h7uly8kwawm1znte8ryrqiyqomsiww43y5qo6s3zx7e4ehbn5ze9lv6mtjlh0thwd1rm5ys8ka2jjgl6xa3qe3srik5ojk263xq16cspctyssrs5zd7y6oj9lp9z6uexsv70bh61usmpwcxrrigooz6c1iewzsw85z1do3ggkrpxt9c2fx5cmfz689r1h6udgj6ik7sk8f08yuo6niugxsp0nrwle2tx3kulc5f4wt5n6rl58q6mvgicysrk5qxsvdeibuqf1o8x7sqzr0u0smrq9xyges5ew8ravgzskmaxv4stkumn06bcysjp1kqa4a1a95hm99xl5cupknge4gsydo5fxoagfb6omczj7vwq3yxsolvzxlkvnt4re237qchbucplu0vln7g2cwywh5cgdu1sqixk2gh9e48u3gxfwz0pu639z762nvtmb7m2zm5fgpa6gvu4kaipiy3390sl6ebkytn41mr5fb7760cuhkefij8yfr62gjpz9t0o62vncsdmxrtjx46856unhe3wu73eca9vwwnz64zbbcqus3zizjg7ith7t7nafl1hp46l47ckn62xtabgmplg3psvagus32skcgk7eus89ezly5vy1urj6pqhtdinavg3x2ya8lmjl96ypj6xn9ztu24i5mgbiyckbtsj368gp12kxqgw3m8eu1ux89aupzdhwyrdlfxhy0y4pgu9l50mhyvpoyjzspep3g7kc59r9qcsayzplmsujz9x4lzafnx00rs9z8vc0y5lls4ouxsf4rpuit0animbgav9587d5ewva2nj3640cdk0sw5hschk67xpyar7rw9kg1usvnr2wjmkx7y223dkosjn3zxzyqk2ldzqnx7fxv25kmya9sg1yfw9dr17w5docigvehokjei1s7n70ij9h29ut9onnwfssxriz2njonjwobymigzv95ye4etzsoosmushvw9bcwpiz8s78pjq7o28pyt825asreqebjvfwnt55juvpdro7uoypp1rutwhux2fw07uqgdcasnp0dthoykwnjl3t3co0c6rzsyymlz6jk6r682lfql7r6th8yefggvxor10nt3qfhnn0vt1jqk1x8ryyb4xv76eaxzae3gqaz6obvpkmshu7ggprqqedmci063j4dq5p81avp1gz80hjn3btb8t5tvq6kjuolmi0xbhr9e3638copojkzzkatsf6x0i1bzvhnm692igr2k6uv3bhw050sr668ogbc4nnhvku14hqwipuatz9cu7ztxs7kc2cm6u1ytqmfmxnrlto5q1mimnfgd2blg9k0q3aevzwihpbvsb8mx4blui9yek5l3z77k5q1bhpgguglz28vd6hx6zrfkdvmlfwj8ss87kym69bdwxir87sat0nwctkjnehckw5ppnc1zpiqw66c5ehv954wrwiby7v1dbg5ugz4mnsv1bjfeqkcu9vjezzkvlsjvjmle0xhtd1v5nbuu8a12dcpyhbpmosspu5roii3b1a1mqrbn8g6aqy5nwo3vtrrlsq5ycx35epa5d8b1e35x5wknisfmzm0zgpbqmnbzi1jezvt2qxih9nmwaehfbghe9jgh9m8od37v0wpr3z1mg5rpob5eus8kvqkorqccqz32wvwbs2gc1qxv5tqtyv43ntgyrtli31kdd2msta8rznychqy2drwv850uertfakim95jh6ykj8eyz6nsanb6rc1ln1lrckpjdv4vp6aujjthdtdyubhz3ljwet1359idvlitnqcmpbzsazym1i7xh83zpumywpxi2lmqg2v5b4wfs539o9ffh4cmtte2abzccovoh90s615sheuimfba3cjeqvwdpqoaapj',
                redirect: 'mkiurj1ds8sl0rrg5qdr4l7xx4ree27628uom59hmor4q065kyjehbct1ox46jdplcfygcdstihtwur5uit5excf98nugoml9mn8spzvka5w0qi66chj9tcf30gtjd40h4w5guavfe4wny6gd9o8hxna8bxvc1xdkdnycvyg9x4dh1oifmxsxod17t0s76s2yc4drf6ibty4dbnkjda98am1lqtco4hn73g1483uw2zaejq5oxbi8164kfb2ixrhcqd6e73586a0z0btdbinpobl94kxh0xmt119dbubnzunv42hhtbmpdy3wnyqwg9q9k5i4qef4uux4bbcs2litvybywgxrkp15lpkqoixa1iis7le4xg3o45qp06mqzaqlyctdb44rndsy4bx7yhi5bqgmfenn5bitmttxnfiptfzrr57fycninn4us4qpvfq65yljidr15rn6i8ibe1cszsyogwmpgtpg8zowub7ho2r2f4q3l0gb2iw0meo0yv0wjhlwd815b7cr517ucvk2vgu6w0dgmxd2ix33dgpebcxezwgsa986tqgavt105yqxcj5wh9hpm0jyofhafy5vvn1jepcyhxrknshz1bq3dhbdzsaheqp0vvhg4liiaj1vmr48nzdbmt39ktklfay8vmslulq6hdx0r3w5gyidg933xshkvt3ct3ugsmfsz2r1g8pvrhjpuhhh8a1q5gplotutr8flj7lbft3hqlxtjh14fps6k2on35zmmpw4p8r7kujy7fcwww8jclr352wi088ozvv4ok5kujmtpbi5b3bn1dq1jf5r2zi8mcbnqfsl8gpt6du4sfhue3n52zyb33nyozrigxpclzm3f6ovfkyzruk1ipbqfoipf0fwemo6rpjoe8ylazzmlcnfq4t6kg6ks7axtau3cudvd9yv1nszbeaz9bqrl9emh9jrn9rmm6rx8cv4prrsameyn4xnaep7ew6159s10o6isb7mvykjc3qgcdwxil5drzhubcfbdnatnwtwxwmr5z9421bsxdqjb8emorg6lvk26lnba4b7y7mx5gr3z8xu541imwij93igrzvso6bp9lemo9lz039bv4k5zvmxusz8rrif8y45new6e3tly2uw198mjc6kofv0sdod3hyuwi3487mzfvqbddd6lv25mfcgdy6sdt0soi3b0j638syy0pxkditeim4wmkufwdersqin4yyfo3gvtm430vym551u4hf190qws2pqpvyd6rre9lj9nughny1jv5rvqu7w85v2lqumyl8rsktyvyu9vl4mot3vtrz9wojuiylobo1n44hs73rast60knh60bs1cyv1lmbdryvbp1ahzj24v5hpmye9h8b0ubp2xrtz6saoz5ro21xpr9kxu6dykig9avxgvtkc6ls5ef4ntn5vkwz21f5cnarwg02r67ulpgd7da78e4xpkm0nwj5gydrkhcmufzery5dvui745dx5f7c10g4v7sug0isvjxwr03n1fejwnqpp1up7rtkl7viefur6ccxoezzxus10a95g686cr11hhyqjjx7daptfhlb2to9bnabk6v6ao1avhwr2jj6rgv2wp5b6v0b3tqgd80z2xmepku4oqcwl8j4vyhwyvilxuswr5icb2m2mpzxmr95kiyvwlqyzh5pqnjxx5nvx4ar56fi8l7wfzx5u8d53hwi497xrjuur69ninqlnpj18dvyldqg2v1fy8i9lsdzqg80e819cytaierwh3t0p841xx7sue4jr0exuml71uo5lkt87a7usznb0e9wmdupm360iwblwghv80f4iokjidfdp6jr5umd7g84jgfqrve1mdui3e1ijjqhwukpjp2hroeqjpa1kayvuukks9tfygt5enixxoahhj2rhj5lcg4aq2d974hlwyxwrrtfx76oqxl42p76uou796j8ed58pyntkn1ezgxlyik0vawlpec4z2kmiloqdkungc1o590nfwvnk50adfci9hlyfjpmj4ts15qfu',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 1727069034,
                expiredRefreshToken: 5325069755,
                isRevoked: false,
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
                id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'ypf0w7nneqyc1xpgtpt9nwfesoa9bd8ozic8pizx7egvy7pxuvkq1g31gvqzw5wnhxaoaikm8llviu3zyxa1d2b3bh14ueouvz7d4a873xgf5e366ec4a7daxyuz73n1t1m6wjflmy11qd6a8tld87eeewh2ipso7v0ymv6ef5x16i88gfwnrt7yaw4m7q12tdf9ujrq2ilfaleewusj7vrvrf86y472enikbc9lpuzkfk1q4k18oa6pqm50u4u',
                secret: 'kcu1p0by9glaex0tjpbjko0x2ecle7y5353dz93t04q8eisthaq329dpk5hzv80tohosygptps4bszzcmrjr52kl6t',
                authUrl: 'mtq3x58c48bfzrdi8nhdm2q1gdi9250ep5b267qh0dp3lz1yoap2w6xx97co5pugbi1mapwp3noutun5dl8bmjg44p6uhufuvaw6mbbeekjem70d0y7548pkkllwqyjzprlzerp35ru38sidxp8sys0drvsi5me86q5bsr2b8o65fnuo4ah1oc58jd0nvm3y9kmik60247cq55ezbcwsdwn3h5pp4tjwgcbv9sxgnhzb3w586tk3bw79wnli1mhjpvbrwdjl8pu6sby8qo5y1yfuzin1702wc6sjpenp73ea1wliiqvuxym7nt1xh9ljxtulgcyc9pb4q5y7fvwelqmas1xxme7by2nclfrlz79bbhpyzdtbd941v4citygljvaei1bx8bevk1ri6crh0wghfc3o5c19eoejws9hqa2ncr2by3iqkia7v34h4c99b089v80ixj1ptsccwbu19y5m74i44cos6augpao788jvid6ie94ox4yqsn1akuhgc719y2hqyerkp9fksji26cgn589vahnbk1cts5ojcd2kh4ge9z9b4bqbawus5dgbzpe09ctu77irb1r8iwip0w3drb1ei6uxl73p8fbtbhmzjri5uh1nd886t8bjqvaw4t6f1ke18ams6t8trc7vgrs8kwzapqzqhndrsg0ua5pkizhphysj1xmjpocno1bosziof0muvidu9s7ectdiphxwb027twgrbquvskg5fdk445ex17its2746057xlpog0uf5m9xis6svjw6dgdemjz5pefov7xwfvfsd4nb7b8y67ygat9lqlmvtdn7tkguc44dz9k811zya6tqtgsao0qz4fufw4fbxn8xi2gpk2phhfxre281w7c96f7gpbkf8bthyqqggfhjlhuxq5qjqcfadez3priq3e0eyhjvgttk65ac1dfhhtkyoc9ncyefts7a55v746c17dsj6esvlawzd7pbffg3cwvbb0l6j5hr6b4gnkr7cax2dsxh3o1ywkl0x2nopuqyuu30l26mmsfgdr8p6oo9xxgmels1pm05fvp37k2xsf9bs12qto6m6fwwca2v1u6gdh2wlov5weh8oz4qxtvfxo2a5mk7tvl7yt991hab4yz55rx3el0vv6nh20pde469k5fow3zq0vlf76b7gv572dkz4if52ixagxlsudmczzp6r2eqix247kpfing39ugq23x5f028f0botfj1vucx2fthlomkmrmgqrichc9jqgmfizoc66280o9wwpmfv24d9zr5axuune2p36hkcfo0qt3hjbt8ufvkq261n38o0e3tg125hyply1pxrhia18ofh99wna9l1yssamzx726ktgm947h92hy17iqgujftmlgz52v4hj9gb93kek36i757p3w8f0sv3acd8j6fk8sqo50r9l17av7watrokc8lr7nliy7c8v7mf76ho97ci7ns8q5u4tzpcdd0lplq49mfxgsbuz8kiltgvrjjgnnquhs4wwfc1mux10wbb1o7xyak4zcbx0gyh6389b6lm7hunxxwno4t2tyjxwhuy8ekcqqnooeifuzl3hojwtbckxzklvecw185nccs1nsyfb85olqiiv29krp83h2voxgd2rh6smxp1fbf21ffgyu9d1ib62i3ccgk9quq49ejbqmjy3s2e5g8bxksrbu0yw2a4o8vtll5qyhlkpaywm8rqj09eso3zwvzhrn3t0w0pa7wyw0et2rqkyc50b8vprl8smtuzbek4ypcnstdges8btkcvnciz5nfxfwq3ewqwgitokh80jddbl7wl10p2phg73a81bokv2kcfu4wuja8km98o869tqcqox65e38cjru82okh1dyol8f2xp1i111qcde2w4jdkpaf8a15rcjm047gaxdv39vgstml2gt05tnbhzcd96tuupkceihkqaxk0n31qc2o0b4p9etgqxpw0i849yygitsc86uqrqauoyo52ec1hxultnbeixlryu1tj96j10ocsclf',
                redirect: '4nbs7h74wquz32109rhkuzygvjzdw2xqcfgajovtajifujgz9lmdkqrymjb5i3r0k3cvoq676l4yniwh951re6fsetsdd44hxm3bl5izbhh1mhd5r3qhmz2zjfzdyv1qviwhcn47sa6ef5knvaduxjzcnx008kfe8f8gw7q3o3tl5tt4slw1wnb1g6ctpjkmbeku8w5u9b63bopee1pb0dcnqjd6byl00ixq1bnebgaaoo0twjr84h4egm362suj40odp2iydrpd50luyj08uf9lc5bgg1t1ch8t7j655r6um4ehn1h1vcwvpg68mzcf8z8dv6ubosd3rg1jaty2p0zefln0efd750gcbvb7rbchsg5843temv4nrd8aruf46udqbxcvxnq11safhzz3ppdawfypmvsscpr0u2r45qhgw6k5prfguxx1i02lljrfda0lp2ulmudo18exyw8bezgovazsgile9huloscafown7k2no2bkqsqhifdenceng8ruzhc1oryvodgwgvygarf3m8xlhwqn63n9c43l2axlmnpsrpq4kzeuzmrrg5a32077zkpe7tg4ffs57s7z8k369mripewffuadj7svx53iqhbntkmg3x8q8qoebnr4jjkiumhxl72xzc54paepm5xx1d84fe31z3q9jg1nkr8vq84xtp5ui7o2luockcob7y0oo86hkmsraduolrzgb729fje76d380ixlfmtvmilfe34bpltyzowijgvdentrnyjn1ve64jeu4fqql05pw133izeknbfhs8447fc006658basz0vij4t1qqcylt54of9wsl5v3uuysq4ip514aiju81e5g70kqhykwv7s77pu5ubn8h6u2j5focz5aaezj4uch5zeceigslvxpipudt3698c6u0pn6n1w50f5ffx3ptlgzjp7ekiegthfcvanoveimp2sdkzd7wietgng9esndupczqsbmadphzavqge3rjaqyfr2ijg0z4u9m6wlawdq6gmwl756xpocswo3ei5ojuhoxh827tymetz9dsfu8so3ga49exw3moqeb4i547fhvd6m09bqk52gpn6zcw32oirax9wmkj8w6s3rgszq67q2r0k1vh08uuyjc5pqpve6sfccm5z0xqc6lngxdwsuf38hssmxialu8e112qx18g72abvjdyf8ari5hlw369aii3tj8fh3t5a986ykozerurh4n6a94fdd5oh7lgz0jpz7r83ylc3ex1nsmzs9nc0c8ozyzr4wizvqvbtzgagvzen5vys8uoqsnif6epzvybq1gaqqxf4cu613ifxh7qc71jourk0k4gx1uw7z9h0m3t3f7gsqligjr8osxlb22jj3ynnup79xh6kqwljfud3ycojwsr84u3mhcgm7duj2lfnh9ymtq5h7bi1g9ip0bnwbt4vuf91htf6co4t0xlru98zdpzf95xufjgidlnqww6a378b97stmbxjtk7ypupbu9f3uwlywbg06oc0nckk6672ggb0b4omlkhik4jfqm918ex34ug8gngo95krivel08w5c7o7ousbqf936xjju25ca1s4lx18br76rg8mp7i31uoja1hji1150agm5lea6sdpux7rh4id089qhzgc5qcf7lyu3jtcl0hd7iltx8vvkvxm8l9h3y0ssegekvvwbb9t5x6a8pwn6m115xkcz6e39yy5f79edu608ca9d313yfwvm95se9b32ai2ss4q3d0w86m8rsdyv01a10dvge4zxa0fy8y1hfyysdk6tnydv6hoqzcwqi3qfy065wxrtiwa0o4x7hmm5zyk8awzz1dnrfhvf32llz8j17cxe9fn327odxtaey4li8vvjmt7gyxwss3u6kg0c4kbvle0thtv2zdyannagyuom63tblk00862vd0705u4k2xl82yeavckbczw77wyigyl8jovlk78234ssovf7cry7swif5z7fwhpj7bvy6uo20r5bx36znk1bz8qnwo9qc5hd',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 54292704154,
                expiredRefreshToken: 2881760988,
                isRevoked: true,
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
                id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                grantType: 'AUTHORIZATON_CODE',
                name: 'av0tdkj1rajmyobmc4dahp56stcz83z8gbwvkk5pq1pz77uelhrlneyq7wq9hxpawdtg1nes4wlivn05ad1vgfkzei812ddr1cl8xym91xglwbjvoessxt607rfdzzgqr9y8ci7614c1la1q6m1go4mxa633b4abpiexrr0hzbsnxiu5aigf9nykksc4tvdpsc9gb25zvc9p8uf4ifhfas3ztviad25bt1thdddd1yz757wrg1qq1dz79ir5ifa',
                secret: 'hldnjx1iqliglfpegg3q2md5y6jy6apeb4n3byhq5vujqt1plycmuxc1471gcji4uxnkc9ymnj13f4ub4gm2oc1fbl',
                authUrl: '6ov92foymul44crdy5lre64j1h6asvtxp61j55xkz3c1ghq7s87vgr44p84znq3707r4b8bqkhcqh866qn4vdtbi9ezwy2au4ojq9saze8tpkbcnamw6dinwlrmc4kgaxw7akrihgts2jbtwmm8u42jmc2q33ewrh9akzre66d240dadhynnsvnz63ynb76xw7h3uhp2g8le11glfddw8h1iltsf132loo79f7euf74yrq00y4or4248wc20eqofrs33rklw3vj3y8owg4m89vsgdtpahs6bbnp6ewau4ixlt4rhbi99pon8zrmt6ohfulcwwpmao5eocuym8trqjxqmxwgq7bthqb3npl2izouk70gq6d0yabw3mebxv7mbny0ztp9t7dp3xathx5sydiurm6yj26o7khhmzij41qz9z30ubwcgtjkng6gr64s8mzmv53z798yfcdt4ajrnuojpu98knn6tchuxyaeyjtz4711do1idks9k3fc9t341margaylh557mzhrtp0j08opbdjyvowdof90cdo7s7mvobikey7p55zyjm3q842k776iqsil57jsvtf906c033x672flgl09392xvhofnnklqgl1e6ou1fcaf86ga6qr9yu5xn5q3acx15fcqkr4nvh3vofrrgjydazv6hlh4kvol9fpsvlfj7yswmh494x3mn6mjy0o27zkzmjb2niqvfmrnmm5kw213752oh2fmncxlma6m0ah7gri56f7i0kuur13gyhnbtrixuzmt1okcexivlduuc4hhmcp0cav6jjv2d9u2wmt0zwnaxzo1yt81lc2zv1txrxet4ohsnse7v3sen57ao6d4kfhnz6gvertbsjq3w24ty002kst12e2ka5lwmadgx4wfw1ctvtxz6f4kei6urkmw8iuby7nbesth18kfnf1dxtrohvvq6t9xwk3towrifpbl6z6ayk5ax6l5to9avy95cpz85j4qe2gxfu9r4akx3vkjln2b947uutcp1j8e23n5uvy5kr1l0arxz7r82212vgo6i7db9m2e1o662pqri8854gq3kg4ulcqzt4354167kdo2qkr0ieom6zhjqc4jpepnhwi1vql4lffanvl47363340e6tuublxp8u2oo28155uflg587z0z9r5q7dto4ybgvv43kkmmt1ueelkutcjq759jdnkl7rgaec6p68rrze2i1ptp6uhfycnqwjq5zhn2og2ffqijigikfvwbmgey62gonayanmzq2d07bvx5q7x7f3wonm1ox77igrupl8nfe8p73974wpga7l0z2vo8d7uazoj9m1sgnvnpxcwtl2b7xfwhyq3wc32hzvvooi5ea1bhgr7t7ixmhvczuovchl7qd5psgxn71qurxbkkcg744lh3jtj7fk8jy9834ggtaq3k0ijaokig7pk231hvqmft0ecw4q9swy49evl9xijvczxexpzlrd739xndcuugryhr9700x9xcltvtgxhm1u45x688sqy6rr55hhvqzwmy5at5exwxa342krt70cyf4b452u78853r3e31bi0y3pn43gej92muixu20h8vi1ld76km2elpqlp01r1v04znbumrhof4q1mvag3rr5xh3f3e83h0u3uey9cvdl8xa8gwqtmf7p8k34fiqkbpv4nmqr1yrry508iiygg0ru5q75qwaa07fus0g4bybj57hi9g7o86xlnpjv623rs1owbvvn2nqrc8gmxk89nqqo4qfqcao8zye1ku9jl2ecxtqcks4m3z2fxhpnuicaunaae3tpp1juunu6xgyw7xrar5uxerhsvneiktz3whnpcw5le8mayqbk05z90k4epji037fkwqyx5dqyexo27ixhvq4xi8l4qcel9o6t19l061b09uu7zhvt9u1tm6wvm64vjtmsi1wvmx5d1k6erl8s0optyh23gwk54mg7gamh8hrsxzuirywwt3k0ek3qj75sg3mwz80fnzzgqgpwke6enu92nigx79',
                redirect: 'lmvbgqbcc733gyn5e0079jes837m65nqegxpmsxv53s2qxabfbzmn99a5fxkgdyljpk9w5qrsfugagtkcnllibtal13wsmnope4vyduux3osz3w1198lp6iz6j8r9g33qj70bh2ehrs7wq1s49s6rg8ud27gk4lrpi81r8fdfoq494eedqsr4t8q7c9dspcss2g5l08kz95hn0yezzgm8lnynoy7op4iz0xxf1pytmqs48jprryaujdl3k1apj7ut908jk5qi57jvogmiuhkvqkpgtby6snb4vj8ld9p9oh5fz6l30f9klq6u49e7wl6grghx505zaip1xuyedq9ole2h0gjh094wfjthhl26sqn9kzm6ul89vogo27wj0fnpofs9m9gw2ruit23q9ad2mq3clgob42y4wjd6c85gm2hw56egox6q549z2yf6ppeo32cg8nczkruoa50uobkkv5udsm633q7w6ype50ws4pf1z8gsibsu6o04dd7p9igi2nsg9u5xboa9n8yl4uigis70quldpnmmjtybqyug8xyrv6t2v3ejdsecj65dmzhzzwk6gpbqwjb0jswzj16t6p0g7c01r54kmjo00xwp0a14dwy97efosvob0ku2xpxhuj2lnv98vihgy0xcgsrbtmakdj8y2960t2ozvmdem6dp5je5dae4kka3ksl1zmug4up993tkxl04p2pc3zymjns2tw6gnu9a9660x89sna4mbw63r7ljs4mfmye4slqm27fb3morg4ai98dl9ie8yn7xz85we08p5h9t17ngencz4508x69dq02t3xbjiqf4lsqr4bqqvl1999vgctg2rwqi8p8bmcmfrkxma9o17o2c39g66tg6ftkc4s4uu49l10e1tv938y1a8exhhkkw3ps28y55zgt0fsotk1t6qo97jnbs1ga3hf33r4flnu1xvxa88sbtme44n3ztgkl1w96a7gsraanp864em3wpjaf0nw0jzu7g8mxl1xhslcv3wsjqt92067jrr5r1m0vfocwgo9qbdzwydr8iunzgso2w5pjmkwub08vr7128zhe5asfhdu5591dksy71y8q91kybov2b8oqwcbjoq9byhzehl8yr86mlmjz04yi45az9ddmh0e8pa59hjwghraq3j1fhvkijjmiisrsxwpoo2m6o1qnejidafmzwhp0sjfcg219nq96yaaqatr3ujq2w4o8oorenp34g8hbl40tteruh5bgzoq7itudah9l3ohsmpu38np6o4fwww2f07uvj3xt0s5i3jzmmb11dhhe0h497uhbwwoxvwqppl3ykd2qvu5m1audr3dowycu8fvvwmwc9amuliw0aexj81zftiggyeyl8hsy3iy74j1dka59y55s7hpiflswjq9i45k0gk7pxsourb5yuulbb1qn0cdcducpvf34r3gcwx8b84gf8s7yljsvgokdzlqizfuqs9i10a6x9kyt3e8h52giv19grasmfgay2rdky4s7oardiz7y5cb8seji6z7sdmn1g3tiz30d3zvc0j3wn74npyk7lz5vq0lg87721mofi57qlzy9d638k683keuuqii4y7yjhpv93bnh6vpcgvki7nffrcjggrdyc0oxwybh07r4sdy9jfhb77cld2svz96t5uk4tg8e8mhjdvwoa5km8uz1qrf6fintzg5ljmyfp1utytlz0pvky5d03hf0809d0cnxpogvvqlnwfzo5qe7wijo9n4zedbsauosxjvsmtqw55wshie5mjc3opir95swi578aeh8ceaegnfw2f0wzvse1t95400turjqtuieg30gghrumdhl1cfu2as4bj8mj61z6uegyn2nvp73mjmf599zmcknds9sbtzg1muas9ajqi389f9qqbaqcdr7jlydqehw9golbguuiburnacrmhcpt19ifi7wc5m0u53z32ls9okfprw1113lj0294u72abasfq9t97rnlhboiapowr24wj2oe3jcgwfu5humpsn7',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 7401785393,
                expiredRefreshToken: 77287280528,
                isRevoked: true,
                isMaster: true,
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
                id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                grantType: 'AUTHORIZATON_CODE',
                name: 'vv9f0hmzrkl299viep6e1dtzp7mtqpzjdyovlanku3resqoh6xitlk6qwiy19hk27g97phhu5bdlxv7br0rbse9alj77irztq0a2qy9uyd8t48e8ls0vr1tjydy0tmsghwk093v3tl9qyy47xwb2piiwdukr9j6n0rpy31j7zdd4trfkk4irtf37tn19mqywzdf78cddz2s0hoa0erg1ijlx1736k29mw1wuk7swuc5ay0kolzo0ulwbke60lxb',
                secret: '2e7ixsurtcqih1sjym1ijg5bxezy819ovgt4w0v5ch247zxukjazu6dak70nmzfrlb6c29z8pkkveq5rimhubsaqn1',
                authUrl: 'bg3wknuav0q33s8daiehcalxwdtv1lqvix4pack1c8jsxoeba2oftai9ycxwla165lxx7dv4k1hbl9p3qeja4cnngnbahci6mq0u3qjsbdbx539ood45afcdvelq72kac229brfcrgl6cah6dcw6dbxdkzo7m4qn5n51pb7sd0h5tbzrxtp55ljvc3q2botd33h9ripfi0cjwftyifcdudwi3d0xp66g7fc4t2dcpf0qcpek55x9a7939nefzvbvlb1xgn5snhkqwn820jbydxbyfcvglawusk1bqtc565c2ba70vn86prrj0iipgpb8z87d2yb515vokhsg0aknacop1w5vhii7nk21ko99fzdc37qbgudc99ahbmrmcigf7g68qjvzs191ax8tcte402mca7mu6qy9w0kuajzbvixzauz4mufgmkt4v01w3ivrks847lsfqqh4mji52eout5t3zzwshv0gg0t2p8wxiwcdtjz6kq9brl03iwtx3t08n43dzdt377wby927jirctv4pzayogbjrpw98vr46jmc1th8uz0rgosndeg721ye927g5d41nw6zrh1nkdlukdzbq5mope2ueypmfh46qbzeounfpgqgbdxa1wzyfa1kzks4fi5uxoczhfg63mntuig3ogfuatfsbjq2tt12mxqfqj5m4xoitlysb5b8qeynme3avb83s3h404lo9302186jrc6bx1euwzmpcw35gsrqijxdp0volf3l79px570cw8xjwbxd3ff43ppey38m73pdifjiifbchjsjwlifb0sfbb9ni06giyu8atbrldx4yaax9js2sf6ilp3g5yh52bl8594op1ho6cc9b1udsgvapqo13kznvi3sxlohx3su6ec7nrrz82fg1db9dubspvkrkf83l2dxc41ajrqzjpiuc2aehxnfs1apvcyrz9dmb4zywjmtluhra4h0ajytw4k7kc5aow3hfiuznc9xj4k59v0jno59ugi4on210kb5f1hjfhuf5zoutli82qu788bznyftit4bdbu0t2jdzsoows9vf677lsiggfjg5vxlx4ec01jph9ifglbpbx5a44f44evbiol8852xha5hlhxhvjvt6aeggyuf5uxn4fn3odweg5zrl0dsbczxk9me8917ntscznr1j6i4ryzw9sdq5h6div0rt7iudi7hzi1jcj8yufuo23zhmfr9l0gytvpdq3230udxs4nhke21yjmqgmhxohgnlp7buq3ajok8h5e6vuv5xdonydweuvle00sqgqrlr2yq6ngcmigantreaar94muq53gcc9k1cg11mr0isrjfurqwrk2es6kx55uqc6to4a7sey8q0rpttel70s3lssqc5v84no9np0og95f6xd27wfltk3zo4r8kdmsdfhbdxxfr5dkar5ew7t385vtagmeo5y2jw40p4qbjyu1nzh5gknedi0t4dqir0uc3cbztxz094jqva2c9ykh4id8jbbb9h8zdod737ll7f4oh2lomfeb9fm57x74bglz6pxwumdxfp8l2q9xfz1pe6xt55lhr5hy05d0b4hx67n0e2daia6tlx03t4c4c38yajloedmcuyaj97k20cvy7os8or7n7wgkhc8oosbkbpndoq2jqoftq0p90ce6ol0hlj6p161k7c4hr9fqlaaboh6bh6d0alhgop9t8va8kwqj33jn4bzgbgar86zvi954ydy6z0855wcea1bdhzw2ekchzgaiua2lpxkcjml1i2hq98xevshc08uxu3d061xh9073pzg1r3d0u43363ddj6g9gtepngwuutqqotfv1yqxyswt6j2jsrmmxat7lwysys9bplo8xknwjac80suz8ztuxlv7c7s2no49jnludnqzckc933fb2q9gmmwymg5iyoqnfsbtz71o4c023pqh6xkiraadk6q6bqa7s7p0xve4dmk36xvajdhmom6iwzdvdouenfhuh75wdxzauzxycbbdoptmxwx1ixbpiurmi9',
                redirect: 'h5accv57q1te0aw9kyf7882wg1xlt6vn4x1iy3uh7skugtbkm6grn8dc49ahaulapdjdk8ur9v97y3bthi7suj4iy6ilx22a079fx6hdodzcawa6dsu1yqjn0mzl4bhcx3a5vwagseh744hseqxyuy5kpydh7017wn8q360icz6afmxjite98mjpcif5u3kv681s6xqknrj0y1760ed1ihvrtvt969fjsms23vmg6mxlyn5cqyx7oqlavclwx82xja9s3iejpr3iuebldtzm6dnjifg7l9yefhxoflrlx4jmeopqojg18mmj3syt5b6or4c8te4euiat5rn4s21gus1jgon3c1nd3mmk6domd8obfkfh7wa5g7wnwklk1bnqkvnt63vmntrs6uiudur41xz5eaxc3gfurbe4df2h6cg4n10iwkpoag6tk9q737bvzi0k1lyqv4ftvpjhn3i5ls1obwzi9mzc9zx24kuy6dqfdglywabeaa8ynwpuiwwqvtgxzxv5frtw63q3bzkej7oa6uus4inbk7x5x1fg83ayd995xbd99ska5w828khehly1fd59rxgxvfdoa6ybnxd12w4f41gtl8iy5wfq2g3o77tpcqgjvgyr8fsra4sv4euxemrcopg84lwfph7z8n09ju0oa7k73j3j6v75zx3pmvmmblhunmau32m2seeg2s0j2blvkn6o3imywtplnx269ieyt6mqq1w0lj70eb48erj2b5wm3dj3rziigp2t0iok6l0yk7thxty1a7zyboqu80gtqqwu95uq341zx87pdxcedgtdimsv257xis25ha26771ofi16idgmgv8bco87cufjhy2plcdxajqj94bci5xopbz4qlv6cynaan18vq88012xiyd1b6782x23xb16s3grmz01b5cyvcnyv8vbtwiryg5k7rfovfopgsudhexs3ygdm2ltr861vs1b0ssjv4vljdcps0j4ta0f1j5xhpnxc89w62sl327k20772uevz6wkjxw8loa2627cxx7c3escatip8fdoewnnp75fmy2ydskghpn78i19qjuhmxj5jp2tltfc9rnkvj60x3zw7vjfr7b9fdnzohtof9mwmytqgeudvmvag2s15nd2yqm3s2tluyb9mscfh3bx9v72vmbvz5mcqm70mdsp03tpff8hg5ganzfw5kcpy6ujb9bsvm7b09xo44de8lj8i0vv73tfjy434ombnqwfdznsbpuktnvzhjf3o949nqoaj0huj4njvs5h2lv4t305q1kxlwkydcuxb7p3at7ybwpqhpfddcoq253yxtaug8q8vueloyot0rk6wm62my5g9fug5w7ffnf3op8oczkrws4bd04eyjku9q2gvrk5ur4dp2ve2oagtoa5may9vhf6qavjplcbyybzo7fc6zqmzy4r4f5r7xqg3i68tvrs2y26zm3j68kunfm21dpomp44pkf2vn5ycbm4agq4ker5cjxeetkw6jx0r0jhstvrgaqf78vdtd1hvpmd0epip2uxcre63wmkxoldjbwtcuca1fepn6g76uhtgkxewzec6ekppzutudv2orlyw6my13g0p1h5jatnv0h2yyhs54yy6t5tu4es3vbi0qt0vt9ks6mbv7wt1umwfxf18i9psgwsh1r9f8nwgxh2mqyuiulbxdiu0lzez1cdcscsen1p6v9s4tj7m0m0lp07hpyeukcz40jat6cauass23avmu2d58n9jbjgkk1ikams8zsb271fehaondvyys1w5ahf3sh9l495olqe4hr39zwbppbfa9eenyz9evw2ipfv895zah2dwbkv5fe2rfv06nbjsxwzsdnen9rmxn7n48lnghbflr26sfeflhbhjdy93asr0xdp3uaw60lbx35v0n6nouculwv6n2wjhxvktz9leti3bbatspduxc79xaw0gxfrbp0w2s9p1zkiad03acstcmvd63bh5wvhc30euqf8i7y2vcnj5zu4ilf3hyx530txsu6q',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: -9,
                expiredRefreshToken: 2177385206,
                isRevoked: false,
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
                id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'zdy4ouk15i3u89atlpj8rx3vzrq7v0xhiviw4n0xtj1ez70m31m6lyjitpg1pbpju2avw5x8mgxrq75tz2s0cc30qul8qs3k5dbb37f3xc7jb6sy7a8k64knops0ulfwwn3nulh4cjqomhfozandr48ue51drwjfoowumx3x6kvwcts0ohgmw1dxrdrioznvul197h6w04dbs67hhr7sscyzkj51lg5m3e7c6nal6w8i3eae7hgbruu2u52f92s',
                secret: 'hxd7pchabiqkqdgadot9wth7dg205sdjoa51eedgg35rpk37hr9p1g1pdb2rslnrdrhm50m7g6lk1xxotvqxwv9nq5',
                authUrl: 'y0mdg5cw0tbtnucy2ecjhnjgml4oc5gfn01mcjosiyhr21ccbilk6w8ddsthbkbjlw5xzqqlvl4ua81aaraf431fumnqaxqcqlh7j0rwjvpucmfix1wf7j2amuh7673adnkdhu6jsuzprff8hdfbud8b0fsfj965gwnhvl5u1kwy6jz4uxtb2bei8sv7vgzw0xhf5ax6bg2d68rsga9nq1bvr3zki41h9d2q0p029dg4hltpb6697enimov1rqsqucwmchoec3k2jwrrqtl8nikjtjjn96ody11a9kul6l3bnm93ntmyijhlsshcn64m52l6vwr7mznn78uulrkrfxwztek2cdho9qixzqkhwh4l6dw10re9je3wgk2oi5uauql6je6oot8zai9448g5vtg20hovs6qew2s2om4nxdfa1cx6e344v0jabgba7m0h32ewk2i8vm7l2vhhk7g9nwwh9swoni08on8q2zaoswosqlu9eszoww0izwciv7ydhqurjong09iah6i5zr70mv7ttd6dgb23yrwdsexg76ug8rb3lo777lt6ub6iiriicue9pqe7180akzzair8nz286xvrkte2jfbds4d90ksesmawv30oma682y0y2tlulhwfmus4qjx460qmvna7q06gtiunrr54jpmg3ube28sq9j43wmf0adpk7xxwhw7nnnyalv8c8muykpoh1zhgwebnsi50b5qnyqbczay425t7gdw7xopjuvf8i2gq2v93aofa3i3koj8kd1nj7l6b5e24nsi2cliqwajuu7mmq6vu3fe3sau861wvttpr9yn4dzqgl1m3j76yzh3d5uoet939mf5o1gaodk09cntossrj8h1r8kp7rb86zb5dw2rmm03lrc4ubdo69qhsetj2r8gmc73g7pjgmzcrq98ylf68dvfyhwhoomxd8y41gavcivoghfriyrfc4b28mvcuf9u89gdkk3kepsxo6go1rev59f17pmpthqivfzypdiu21qafzs7pi08um1x49teizu1o2fm4e4p0k4hx5pui744a0m7bvzegnc1s63vxg5v5xlahjxbpnoy0qk97ix99ni76ygc71n0z8d1wayk60wq8qqksqw61zmvfgc5c7hdgjvm5ml16tf8fne8l4lczu3ehege1a5v0r16w5rbxg19657bcc5yfi1fv1fl5x17y9b804qv63qw3jdanieck9ks9yjevypnap8algk66jmqd9bn9cqd6yw4qmqe8huhfjaj1qgdthrq6a049n645wpydmwvvwgefngi9nxbffg2u508p1as0e24e3wewfj5rkp2ohkyfukt93z4wqsd2gw83l7iiwqy65d0w2s7eiq7fhcgzwajzccdnawfduhyfi3r1egtv7xm8na5j9okkjpuaapl5huglyb6qbtaudzarmoynl3gsmym3c8if4h5zs8243mf4164fjwtqpfmaavnjlnwo8q8a795tixzk8fitsbau83t0ofv3mu7cu7mz7k5ppptbk3vdjolf5t9lvlgj3mlvmjp4fnt2u8ws90h4v5mt6i0hpxupwrnigrp3ob7gmvq99ss7omf6k9gcl358rtic0t944aixn1yg8fpr9aph2ev50ce1doi6hk3zq6ztgtyb81suk6rgckkvbo6rvlp86l3bxf43lnzq6f8ystnytsavwjdpd1et4wf70780aiomojn5ib02fd8rxxzxudhsau3qju1a6z4ipzkrjy33o303bniouy1sd3qhfo9eqv1t0o05gwpjtmm6km3qcyc5qgyfcaau948wdkp2xwdqfriq5ywyaaqpx950rbeui7c436tvtjd6v7hdelxcbuzs8rvchkayd830dznf5mhc7t5l5l141zkhiwbo4wmzhfgurqtc6rp1kxkxrtn4plv44ub2ktquux6lvnull37p1svovmv9cdte4v78671dvs1k5zxm1m3i0pdua7bo9uyibxae8pv432s1i874uh47iqhbqwxpi25n25ddz',
                redirect: 'g4j458z10peqgrbchapw38gzvr9ocdn07mzvyjwegttl26h1p7qkpmb6kzt6sls47vqs4g4r9uzrasgxpvtmx8ai84b20dea49qxjz4hvzjc4j3z6k9dv1nfief0bpr1gtdw2148k3gam6159nunl53ic3k2bgummu7ad6pwr09blnqcvni8rz4bdyl14xz8opjc6cmzrer10vjj57u27xxjny9ihx7ob8lyl2q2wsm3ehpqtpxx5ma79f44m3ikjeyk8wfpc64jim3y4lcdjaettjvdfi7m9596y3bi73ftc31ffttidszz7j2a0xmwukfftia8z1x7mq23i8gd499v8rren8zwxhwmd8ghyzgmqcfbe1i988p16hf32xppta6bbk6x9rof0kdybsjvlhlbbieemgbdutuw6zj4dy2le589l0yxbshlek8hqx91yf5nv3nerl34wsg93eybie5xlr7pvvckz8cm5jzccardfcdzbs2nb7rl7hf28lr0741vtyf1wkm62lk336vgggqpbb02jiohlfa5itsihhe37daiaraiqsw92hrb89avxxf57sfw4qxqgg93a8wat6tme2nkpn9ci9tt8t75zgp04d4s792lk6tmgiatr5y79r72v6dbwagtckc4kltt0ocl1gthnv72z6qute9cgdn9cscdcye59b8iu1lxw17t3r72uerovy6y4rqbbk1wrmv5xv9hyk6w5wdzuhr4mm3veumwx77eycfxagtlw9w2lqqlzm3a6f45wolzcga7g0i29a1pdrhts3e8zznes11z7i0bx4y7aq01q6mryln6pw5b4oowm02xd9bjs1100ch2lfpxiiiqho75c8vv7hccrzkhhwxt3ynu6hnl8k8buwf0w42ncsoicw8wlfdrs0zt3ev6c7zy6lxp6d10cy80gn19yfln6rq54jk0t348403qe2c5kai86dt6pu1t17xjqv33812zb7fw76g4accr0bd93xug4n8l1wpr30uirpwr1g4r0vwxe816ysj169cgj68fzfcaasatz74i90gl5kwwr2xq02i0ryhnh9p0l1pp75455d7ot0o77cn4fowzgaxljq4ucypnhqmkmz3c7ldr3dhe06lyvljtd7dpbugg3q6dma5lr6qoo48g8r5t0o40pjz7qc9i3xtwsr9ioeevj3yki9ssjvgjrl1iwbj1w6t8whxdrgyj6m9ddd4n2xdolgc99z2wlm0s96qjs1q63031b070s5m0971ciybgxt8izhj7a1q75y9yakaf9k247dt8vxisdf0p5bumw10a9jkdglm8xo3lae9u0moab99wfejamd83b789nm47cb3ubmwghxfnbsf5bq10xhhthxfmtvw19mzgvra961p6x7x6fsr4igui7g64jlyf8o6n2fsdwiwx0hfsvvupny8arl9wun4syttq9c04wn1vl8eoysvgmsc4do6xuii8if9vbuxnka2y6o6236yjqr6j4ruon69tv8o5estxo6bjte9osizzpsdobn4y771ujutf6g3po0drjfu4kd6xroqpqm0rhm3brgrzzsvdeap8ufa840850nvjbo9n3xuj1pk1z5pnyigixqeen0xp3ti8oyp30o2immdseuejbrg1gyn42vycek2arxhl8p5m5iai1kdi8dkldrwoa7ybml3aslpic1ftqy4efh3tktkngpgrfyy9azf2tip5t65mxd6zngomvcipu21zx0rkrfozlr94t6zcs2z9msl1xtzmzuhizkoxfdde5n33h3utyi0759fkvuqrjpq7srrjchcbsipb7ud618ad4gh5h4e43kj184tie1xa2ibj8kyjudzl0txawi04fikmlthdar9ocmc5pbz8vymcyh0s1azms6nb99b31y11a9v9hhqox1qhzrdlud8c7e22f8alya31vl4spn1fwr20s0dn0hq11956nfe3wdc1l20maqpe05b65rvvglqtzbzfi2w34qhw7wu4e7ufpv87legq',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 3784581681,
                expiredRefreshToken: -9,
                isRevoked: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ClientExpiredRefreshToken must have a positive sign, this field does not accept negative values');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsRevoked has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'c3act48qx60cm9mprl8mqtffkor90h3782ekpc7vfpn31jjfwvx44ia87mrfwwj70dpdtlhyu6dvl1khqtptaja7mchwybn7qrbhwui4vp5yuaj2wws9t7piysy1v2z8n56dwd08w4pqy103e44bi1wspgb0ogh9x6a0c9io1336ytgf8cf6opv3ltnljrwln336vzoggfwjh1xvcstmupkbsmjvng26zsy6qqbe0objp3h0glsl393csqjca62',
                secret: '2tyxurloxdjkww2au6qj0hlz23h4p9c1jgwauvk7nw7t107q23enk22gp8uw0t66w7w8t4cjc03nv26rne45vqa47l',
                authUrl: '882przbd6n4nnagn154mdx4vo8tkad6segrg4wo7i7c74so254mgl9wcrxjscyqstietaf15iyhdv58h0vi0szvqd64obh6r5c1273yfnm6siwj03dlxdnk5hjke1gxjvqn4a9x5vo6zhovw10v0x9vu0jr9zqn59otqw8doyhh9cl8aqhcscd986nfnjsyrx91wu0aw137c5cozeirpa9mwxmxd4ubhfu7eu84y3i004npjzkpinq920asgukgblo2hm8v83u3ufj8gva54510ps4bfqoma14nw8e41so8mqva1xw8tb5tr1kxljvetj6h08e8v3gseyrtes12ptd6tylwnbwiep9pd4wd0gvugok5q7u0y21zftrnpi28o4cld1f8jeaqvp82eha0sg64q1mb8uyt2xgqvxscnt2i6f4dl3f9a5nq98808kj7e5lodke98qu6tyxkbyogtjvkgds1zyq7iirqpwz42l7z0cb2uhj32borz6ha8czqgsekp6tukn28w7wydq6xeubcaeg089m9zwgkek06o4ouljw2zgki78tv0iq52twb6vvz8787pc5aj8cvn7zbsa8u4w23v034l3i5264lrqsau7ko6g0g9n905zlzs1406ghpt0rxcdvz45mqnbnnk4t8zulgm3tjuqgiy74mra2mdkdyt8g59mmbjibzgoupb3m0a65w5w45o6itltwc4weqo2jaz8uuqanoibqgsjaarkqod88nwswj766m3sype3cv24blltjpkr7vke824qm893jxbransixoenxtmtrqoiymxv45lq0ropj49h8zjsxuib1qkx2cz2ij0z5d9bi712o5on47aog6emdhb6kz7p01p0io9d8qzez1etyad9bo0uilraw0ifnogih4r534ctlqt595tytdfvlal72870fazbhp0srjtkuqbrg8o78xfzb8qvf9k60nvsc25j0v17uccfhucpxq28aatv56y1hqanqak0bzuypcf23sawlc2yvlgidrkj2ir5c8u6f259hpcfq1j1qxiy52p17wgi1o7w3syz1resu66nvmpnoyzl9ok7iy78dtu3hum4k6rr6m0sfcc5965iqqmcbudlnpuxqwomqbhs3tavnbkqqp80dtnieul47fagdqvqhs8qmd5j87mypsy907jr7zgvotm7o9eydd8ok7gactsv81hcecpuyq4s6yw06jue2g1wyzt0e7r8woa62mla8aeeaza99ve38perxtyje7s366jihcisgh1jx1ge67tktrt7b5gbg8ncfys4g8xfzv8hxnfhmy35ce3jnlas4inmdpixs910hg0lk5t7n1kgdy0aj9skj20ax5bvsfj2gd9twc1fyb4i31egnumliz6qr7sql93t8pcww06zxvbjgrfzkquvlrc5i1hfph8epwm37ypmc723krqiuyoq53paplejkt8idn7vwc9wayy28kgdo2df1rcu4rx1qya0up1igff4924wea4wcn3wvkh4k8efmmdz8rlznb9crxmujgg7lnn4411bmv6na3nbrvv52jsj1oove0jendrnzzedtftjgi2z0ih3m6wu20uk6qnatovbwe8wwd0uzpoy8ul9neg8sn4hdzi6l7vwzs15m8t3rojr2h9gdjmv15t4qi3e5fzfc0i1n6v6w2jszyn705b9k56w8lhuye3mzdvx4f9y6gkoa2z92jfphhlj6xltgf6mewhoqyx9xxgv6zpk9022bevuaa51ocwfe47b6xba179lqbfv48t0wegmpf6txb176140ig85oj8aavhh4jk3o1oojh35nvsv4v4t6rpov19wqh5vm00u5ojj583pt38bsso32p19944r3yp20vyx81yh6ou3y38ic2i6oq66d4xs3hitxd4l96el72vsmpy5cjfsl6r095cf5mhsohf3nkqydlfx4u89ehlvw512e20d1oi7oaz8ewfndgnky34szz4d6weo688x6jobw9laoojgtc6g1r38kon',
                redirect: 'alny4tnfl00safujlxhq2d2u7zj0n7al0y916wb86k5avlqae1xg7yzqmwllro4mpyx559l556dw0ep67ztbhyv8r78dk3z2b713i92eh2gdqlmxzrvaxxq9e2ffvpn7ug6lcu86srr5fggdm5b410qee5t95ka3qwmqjchl115cri0fvyequd7q1vm3d11gmqpspzee2doqfjlko8a9mltyrwb8c7edh72ymqwzkb8r3j9srrlep6sd45y3kb5uoy2lam7oh9k65lace8snsroifad99spyukh0rw39vmsexcaqeha4dgkotp6kom91q6kg3wf0ewhikona1fbwe5elcs493aho6lhb91jc9xb9jwj8l8ul3jm6rkjkg9ysyomupyeydupj5862w4fcutfpmnll5dba1k8pdtcnsqu73snykk5niq7vcfyyupujmiq551m69iynfiilaoyfveaai3v42hw905gmpxedot22zpucohr4fynzyive8bjaxjiu5njdgefgo1yrx3do8tf90q68zat10uvd0hx851ecamc1qxz4gufq6pw2d1soa484f3ko2v66hsqefebres2m03iuh90tkig5d2cirefsed7zp6onilgl3hgy30m6sd3f1izy4fke0cn7adntuzmzk5sfc3h2o3c2ytt5krsdua26ohxl2f5v25k64brh8agzcgwcqt0z5x7ede4548tk2n3i4u0uat6c9fd6ofwn4aaw41msupmsy694naf0k2pc76tu4qvqezli9zn4hep2ejgjezzxsef4gglx1ub7u4i1qm9bwl7qq9ua6zrz6wfz0by0662y3z09ks8gv5dxwjehxtltqeagpkdf9cciwa7oa493wngilzj87acownhh5olcy8qy8kn5gqot5wu0jafjvpw8aaf4gutbnxdo7q39i2c5vyza4cho09ruz7239870slj06z56141u7qjrhcekdx9s56whhin14pj0r7mighydsipj85eo30yddtq4ij80vvbq6p0pgn7o8gbou06b60nztbi5u59ma8s0846p82sow15xgck3kv8546wx9yl50d2b3sbavpb6f9e159gdv8s4dguu3i85i7fjh3m08f5z84iz0kviuviwy2a2zboa793ur30jyg89cai3p8d06th8t4uk6xhlqcrjmfqel6dv3ct7x3vneppk1opofx4wemz3btiupy20ou45cjhtq1k3tdleigpajtvkikgdt573bcf1hurrllqh3hi7p8sat3ii4j2k60wh1ev5q8lqjjzbrruylv3cv7u3jju30i2iznjaad3or2l8k0vli1ntoy0y0v9j9r96yjeosjedowon8exroec5edmvuyzfp73kvg8qdw3m41szknqnkdm97j9ynqultj9fglq2bwta5gwjsxeposkffisrl9qlpe5jyweu3lq8rkuvg1u3w1m9k6n7fmh6ze1a31x85a8uyl6qyllcf73h96r4bk083cks0dr1ltrvvz8qc31y20ce54tw1rr6si21cib5490e04yj0o4w1vezb1862dslgmjri2ilm27csc0zt5y25r1z64g96lkd6dcssocr17myahi2ziymf8eqzj9nqaa6d710gn0oui9cuemtffn6qxb8n949uvxvzl7q33e482rvvz6gnzawk27b8vvc84kg3crrxhfmxzd8j5s52gsybe1qb8j9sr0f4oo7594i97tuyqpv2dmdq817f7ytmnawvhhzmjbaw8b4s1jhomtkcgi3ht7v12xcbn80qa33ppijns5z597hpmlf3hp0t559x6u2omhy4511utv6j5iv5d8ru2l91od640afihhqpyc7gzh8sgp3lbdd9dee6pv9utfijjv69mci8mxcnol2b9y8s5vshh7czaxhpo768baf0ktuqwhdyi2yf1fqv4hqzjlzi539w4cv3fkqc09aaxl6v6bvn8xifqcemniih54ont685aphsfsywmsw5s3f79vu6ij7wfab7xln',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 1948094461,
                expiredRefreshToken: 7152162453,
                isRevoked: 'true',
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsRevoked has to be a boolean value');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                grantType: 'AUTHORIZATON_CODE',
                name: 'tqtonj8x7nfl3w27k84ok125ejn6lscbz8yc60z5h8i8f5q49voiruw0tplqdeh7zj6z0ejahwjd0nstm9fxwx56bhi2gyias31xzlrqkwoipl2fm0v7ipf5vp7j0z0h8ud3c6iu4g6q738hmy6se9n7qon938rgmqtrsl10c6e99pg7ap490zk49uiswgtnxf5nl39qgvcyesm7i5fe6xdywges2qov4zz2l1gmylmjk7h0dwooozftvnypxco',
                secret: 'a5zdpwiitek49j6hqexlcmvvwmt8z28hqejd4gosrrt01heivpmss2yds60xfhw341u5hhezr0hqzchp7nzho36e67',
                authUrl: 'e5a8y906gy1299qrobtdk16efg7jfism10z7iileyp1vdc51ddmubg552owgvq8d4nsl9dxt2506o5ch2oaj1v0e18d5qrg0hz61i82eitjjvfcblh9kd6k87q0e3h94nu9rbny7v5vsnebupsqy3c8au27i0ilm28hnxeqayu03yr98xrnh51z69tut09m5pa4wq3yca85j3tet9jlw8bquef9p99tjvtky9h8w54wzz5yjclf44t4bw8f8d9kv1eo04kjrbj0nfit3b4dcwni6x0es95jll32ual00tf7alnmpnhr259jxdhi9vj3htbhgem9fc4ssh3nkbnjw562m02upjb0x2hymbswy61fdim0wpj6u30ijd91jpgdkndqxjst3tjp00x5efyx1q83cazr86dtye61z3j2pnveykzivk3xalcpy6pq4faicu89f6gtjtj5919ypdxe91llkdjehrgpyvy694j81k6x0k7onmbwihzw1eeyymj11ny899wcp5j8bx28rc7ss9277rnvtz4bw064lcvdmbc26nsfuf9ea0u4hdnp9b2sfpqjzbcqpij0428nbkugzblyuzjkvrof8zk69geib0tyir1dyaelm2vw5gzpq45bj1iqmdbr9jsvfklcvpbju1onmxhx0ur975aekltkl5zbmsq8u791f75cj6d81h1alh5xmbrfx3p3e7xjmcchobwdl8x05c37jgvkfpezygcex65oqbrj6u1gewiay1axvlfr7v8e66u79c7b2l73rdavoq7tat229wwhybkblai2bnflj9jq5wbptwre4vygdtmozang3oqlru46ysh9rrhuk5ans9l6qmga1mzq65glz6fo0lblx5bjcrasp3adewciqba9ojkn2k900f86xbraoqho5ergckq3kd7v05d507klhna0kkqmid0875hkb2tgfm2xj1mff55mc0hfl9uuc1gznfemvo4wtf6cdzsr1tocjqrfonvr13z3hc4lxksuoun7nc9gicj0tb6wa6ni0gimvwm6rxiettxmxawf0g2xdjxf66wftzq3zk3ji42jov0olav4lohmarheljyvkib1rljjjwj4q00qqqnrfjmoq068oimiq4qd2q969wk0cw1jj4k128xoluii07wwfsq2rdaw17ad3gvd2xackm6do8kebjravkuh69veqd0oamc271b2nm2mixbgfo8svrtqxt1sd51oqlprtp9z0m86xur1h9lns0r0i5qxs5z68s71me25xrraclaoph8kjlmf983ajhx9dmp2f6rcg48m9k1hszpioqb93k4j2bg5mhsj97kqx5eth2eipla7ktn3eg0j19od8m10me1gybka8g59dir0pymbblbme6fyz731frwx7kr891ccdc5dwyi7s2dux0w796e9wbmv8avw9k575ib28h4y7valau4vywsd2ftbje7sdo4q8h29t6micy2i7uya4c838a6t0x4yncbqc8sgia75igwc84dl7aobzwal6g3m1koi4stcwdmbwzju4bf6sjfsyi8tecg9311807jiyxm481isudgp644xoaz4k5ow3bjzovinucw16ne62cpwoemc94zf4mo97ihtglhrvrns232n76sgay5wgribjli4fjpmfhx1macv05wngctm41du9txvdrue1jvmr4om4bh4nyn03woavjj6q8bohvp8yipfdfaxc8uvrh4iev4t2i5l9vhg8k0wojggswhqgltdt6mw48wddy2lkn17kxv1alvqwy5nfh8k8osnr4rpei3rxujqgtw9mq2tav63ng1rqtmpaipmv2yll0s5lsw60zns3wvu7z860t76sfxgc6cwnyzf3y27f6z51of77vghz9w0bu21b4zuul63y9ukhvcoep38ni6vvtqakzmbqb5wyxwj33ba78qzkre8qzajyv5yzqrbkoxb5dey7tz9af3s5byamck5dp51w8xhjrvny397wmoup26khp685vttf1pta',
                redirect: 'sdb2oay5vxjt1jm1cd2t1q7raq5pzdouhyjtexe8u1ptgqi2o07nva5pr36bsay11kqyi8ou8yn2vcgmot4swff7qhwf7jaczenalzu9qhusszcex5gg66no6spsh7tzoshvebgqw5c3i018i4i5oi6lvosn8o4ahtss2fpf3mndyv2k63953euqlg85ap9ucqtdcfzsigka0f28ccaii81j4hzafzxfelhzmliw6jc5t4qqot7x2tq88sor5dwhuzogua5klpok3gfft1jf26io3md53lvgdgzmwoknkdulgrhkyeye9vvfqmq0syesnxjysygctuyvox1kksenps62zysvwe5gp4n71r29epw66mt7r6vnc3fxo6xsp3jfvgkcg2n5efxsm1drl7uc3fk1arlsd5uzg3s2bhgkhoa2rtosbzybxy1g91tcmjd7yam999h00r0r6woc1lbch4dcu0cqabh7yzdvg5js4e24cb5x2vrzd2ftp17yz2x2w0o9v04hu219desn82oj76otdgvdlhjg0mdkaenheaaieeb2sj6ycm03neabe9nah859w595l98wsvqtq8tqh2691t0nmdbt9qlho2me2ry7cgrf2ljhft0yi4bb9drs2o2onmr0iytw4ibs1144jp0y2kgkcz4j5r3lbf4akn4te6xhlunzp98nvzzw1mi095uo8i5pbcpvjsjayunjxtlm3c3ekl4i6evvycemfrdf4zm3smx22l2cb8v5d1u0wmdxfp6oj5er24ddz4y8299c3hjvylr4fo195uceekmk9dk06b6wkjanw2fhp8chmruxd5a2lbzugir9qxdotcz9nma7o9acwwubbfhw0pst2a6ukiuoxvtp8425b1t1yenrxsk0qp47x1inzug48p5jnsk261qkmbdhzbpfae0ejwikbvu7f8l11182s32v1cw4zft52qi2pdwios34mhp7ny0i672u6piow68xzik7euzx5p9nvhjoa4kebypmja917p42xenh2xmixhnprxsd725y6t3mdkcd3pnhjxwusq1us4jcxmvr3reuyty12rvbj1ksahwxuviygmuegsqn0bsjmu0linkprgwwoz3c791aynkmj07ej638dlysxstcqexv5lea24475j9c61nhn4kiqm6m198a37vz1nvvhzrsk2kjo4aw7q3o0gni2mf8zrws0xvgx5qx3wsdro950q0a0ikwzwobkiyru5g28g3ath6aa685lxxihwiiankapaoakqps0fpalwyb9qto7zkw6whh6ajds7ngarujzc0bjh8nmbeaui36r5rui964u1symvisq3bdr3cyf4ovt9ydm6763mhij14q4kp0c87dr54fe97tu84w4kenui7r2hylrvcnjqdw77fdbgs966pinweakxmsgoqg2bs4kbbs5vtu4o2whvgtjcxc1cy4gpz7kcw4b2zyf0zy9vtox0s6cnt7gpgnh19sc5tngg6qkfqcfffolselz8pmewov6rpapqe8ulud5mamrvmzy9n3dgaq13bvg86t1dkc97v2gzgjjvubz209u5rof08404v8yqvqm58ha7vnjtgvmtouedmdzjpd81h57agh2cte64sihhsdhnymqtoq3xa9kkd77rya3y72n551bbpyf4a7pdmc44u2facvkbe9137v6lrvaw4ciqrlsgzf08vsy88hty30eegy6188ffu04f9vvc6mjbetq3bs39koz0syssm4ew61p9k5vxsvwmp2f00cze7y7qlkunu14w7k8p9vncdtneihaqcm32qjyb5lzjn8iws0fo76wini4uv8fexy089nwn9qwhti3fmr2zsr09vws1756mdkdvz3k5q6z9t20e12nymn7qev3jkx6x1nwych4chda96nyn2qlmm4iht29g7lusw7ehtloxyy9ek1any4wnyw68q15o52opfjbj3uwxz36ebci3im5pursfeiilx61mrzmo9u7glfx2yznirz653b21og',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 7902122326,
                expiredRefreshToken: 6237194035,
                isRevoked: false,
                isMaster: 'true',
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster has to be a boolean value');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType has to be a enum option of AUTHORIZATON_CODE, CLIENT_CREDENTIALS, PASSWORD_GRANT`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                grantType: 'XXXX',
                name: 'sk8p4zuoas0zdmpol1sxl4rrxd33go6uxgte2mybp7fmt51kaanataey9ctv4b2b1g479v8jucp7bdqwexyb8ip1ah25ynudpo9dypzzwbwh2mz5opkzhmlylr4h2wy9qztuzq05uvc0kbyjn8yrk38e0yyuyittbphbxj7ahy0e3wl7s7yk0yrq3wukzurv2ecq0ea9uizu3yvev172ee0bcuo96jl06tsmnvjlnx8emwfo6gmumbr8zeqxoj3',
                secret: 'k35jpsi6mi5opngkwkzf8twdxsprsijjnsosdhckyeee73oi88d4oakk6kqar6q9v57ec4k7gjiudl3yy8o6kd4yh0',
                authUrl: '9uubxtuy64qxidv20xtac2e7p9rih71qxmti86hx75eznryqvvhgho1y40mel3l11a77ll68a3k45p3wa6ynzu9ebup99udz1y0v7mscwtqx16r6beaq8s3zr0rknlnflwdg0lvmceltsapytgrw9c7lo35laimqarcycxd9b759fm6hp2gjs6dwttaqq1ms4awxl7asvfbjsf3r0sv2jh2kg7n1nfghkj204241mktkplj4tm1qousll9ag7waaujs156li8d6ni9cq04lff5coeqin2wlwt68qnqn4ydbzqf25oaissyjq944ga0wcmhm23tbzgdl182usle1uv1cz2s9utfh0eallsq0jcgrl4v0cexnodba03pzgbltnra8w8gw9a8t1jqwrloakr2xij4aq6e3gmnc50idin98e3xwxm23tebrxxyz9gvkjcok9w2b90o3pqspr5bm3d880uneallmvwiua3lom1o8w63h3gjq0hzcbeyrtcqnkogm5a4mdaav9a8bkgj76efzv7ybm42yswz4m16kfgc2at65nnd19y0v5nvzs88e2r7tsoaxvxf867fzbdywvdo42cty7e0cjouoy7i2uilw62i0fxtu2bnzsap0d8ptg6c4jiydv9ymubcv9z0465rai1h3jxju164jbmc3slkvi1chkzfpor95h440qn9jeqqo9atj0opu0autnra6ziilxj968ukaac9zw7hyv1hs1oui89z390bvq4cyrqx661frafc37hf2jpgol6mewoiu9ryfuv6k6t9qhvexb27ld32et3mh82q3hhaswrkuij0lgj9vc4040vckcujpst2awxeooxndjf9t2lzbxjvqcr3yzcutyerk5z8zs48pozzw5ni6eq0loqaggqic3n3sv05jxct8zdv06uk8c0zrv41d999it1v3f9hxc946ua51lbqtttqd6bb9hdzy25au8yplaye0yp47xauxf3l9r1gy8lxch4eospresqsaxrsapfaq68z4haz6xu4n9ryuqtaw4u85xaxjjlhkc8f3habhps4odmuxdimaishbx1dfvsbxmlp7knzisd8pyhrm56q3i29j3azfacfcarqtlyiw8zlzb8lahmeuptn42g8nfge7wu9vbrttr0rb7q750ywrcikra2yns18dshjd2onqekmc2hd8lg0sxv7wnqp601hokg8xwtqg6373vrsqntq09jt24cnzsswrgtsx8xg91xhrtf8zo4qlwmlbr058i7dodjggbv9u0z09qh06yupnah018byjcwxx00n7j8sxtpj8v3wi4a6w4bh7e8br9cavugjc54gyvg7k3i3ocyicqpwzum13udhui06mrwizjybazf9wrp5wjd9we87de6aowdi5c5hi8lgr5x5cp3rj49he0kx9ccg6wdu2r01vm1jg83x85yk24bm2w4w9a9jmxgnfdppg97h2folo9s4ee96o7q5ndzssl206g7az9s9fbc84ytjhypein565sz6exglqt6tln82mdrroaoqmebwe5zr6v8buwyks9r2q5sbf9ayvazvly9x0yr7zeeqj0teu1g7pzkgfph1hcxle3ajc634nfkp47ga0wnm99nwpaqld42lcdwamj2obvgjyjwph8jxlfrfskcnv03mkq5on6v8hzxumqz9fhl4d03lldu7qbqfus7ntq5brrwh1q2qvqwb5y2dnp71duj8wijhhwnz4wyvfwnuqaqzm2isrn49d4p1cfe22n51mbgg524tgzive875v10ogts7n32ywazvektdvfsy8c1zyiicsxylyjkknsxtivtmekfv5cvnx2c6x2ln9pi3m6wwo2x7pk4b5lw42707tfxb4inh60b0yx2ai81zjw422bt4vxlevknnylpl7cuqzo4lxgnawi3640ux0ay1cw2qlkyfdu68f7bihj109c0mqhe6tnxamfzlx3c6cts1zjbzo8j66l1nvexht7nppg8u42aoimkw9kkkhm9lbg',
                redirect: 'eyf45wkkl4lefi6rlr4dwoxd7pvd74l0mj9g6gk23tctza8g6uvhueo8m6qamoqqu289yk2qju3p9nd3g9th5fehk0kl56ubc50jmz26b730cjxbdxlxvu0ns1p4xrb1bshjxz56hy6qo6d779x35ryy3ddcp9rd6s0eg57dfsvdmj91kxluiaeunk3ec6h6gsx730dbfzc2qaymelqvu1g54n89vam23jkea00fni6q1dubj5d1lsah6wtaphpgjrfbmow6q0e0opmd84o7emw0herppdm3pe6ozxszmlgggpwk52vxab0zz7641wn0wqpa0ntion13m405po1u78uxp6xj4dwz19t0ivor3fu2aoxhxhjz9dd52mx581x8qcebfszyzr60aaa7bx01n5dptv88cancf1b48g5obwvao35a7vfq16347kznk8ml96ydkvaq40dlw8xs2sugrwmoljlke515r16fe3mcbb9vayf38kg11kp7q0bnc2y37zjucr802fphim1epeamx3q6iuxreuur4hwue31bey6dy5qw91i3dujnss5hjkjsavbjdu5svaxam9rpm9hd62gfqiku3zqwthiwwrrmeteruxiud49ru97newvrh0nc67w5soyerarusbubw9228zjothk7yd13fvcdtjxn2meo20tnds75a0u1adqjg148fa3kn3i9i90lfscucao6g9689cqlhy7qtgktfxwi4vuno3jgijbdqw9c39lcl8xvzj8807snjg3u1o5l7hcksv54vck4mih5xylegiemvrgtczwt0ji55yfy1xai2yba6nja3nf8jck5orjl2qj01adm0m3c3jhynis11lfb8n2ikyt4fw1o06xj0y6ayjzymobwvxidh3k860a93helhryl2dwck2eh34bkzkrjrgotf1ds35gwrmkbbknuw1vi46t1x1wf5vlb9q8piyq8xz6cspva9hwkf64wzk7kglkr8xw6gwaaymiolph9ztp1763goy5mjmj6dxcueznb28zdpe4vqc6leb50g6g7r1j16jxdbfpb7uxvqftrw5ddb4bya79ozdmg055njpihr8kpt5nrtaxes89bsiqsbl4t9pyrfj5vt88db7uimv0s5m2yr477r791asmpzxqwn0vqfyzz9c4lw7xh9njn022ibkjqp2tkteuvnnc45cr6vw4nsly2uzz7mwv912844hfxxd9eqt6jci1yul8lh3dcipwteptr6fg8jnuyjopg6dodwqtfurunwu63t22yjr7kb36095tcuyj2xc1e6mmhahmoonspyb5wzxpchbiqm6781d6wqafi9nk3wszmy1bav1n34ermshe1841ydk8m4duk66tehuzo5h1ynsd5u3gpvrrk1encqgj62jjvtvx5wsc4k51uttwrk4l35tiujfjaw1o1tqpd2v1f0r8s906vqqk9oqoq6txbalr62ceoborn7zwndj36tfisbob1n3bnt3walpk4azu3zhkbxn1z4poiq9jyn9ypv09cy3cay1yujn2pg7vha6hyi3evtol9ge5x5dhh59xihqyc6bkqlcs15gogfc5sbllymfx078r4194mtiy8j49qoutinflioaqagijfdvo94fp0em3t2dim0dqnrfwcel8ttvl4oe51lwza4wl325ua4t9k0pkl4tbtjlspt7j71poeu0oprpwi9g0pd1uewvycfy0cenwvd1yewe4e82ltei91nifxelmllsuagr365wkc0kjp6m9i325k447kz2qkepvn1boyutr23ndsjuy4i1oh33o6u6jzyby6cwgritj6o38o6157hske8kxtqwekjrvtmw2t1g7hwe61x64kt83i3vgabh0nsn11awlfpblfit7n18h7xy516ad3e40l7ky7552ec8n5f6qh2v3rvn24irr2cuirqw4c0tzr8ofgcye5yd2ot7chcm44djh2eal4wfxsr5l5vynj80c6hyllvpi96m7rr6hls55gq5n8',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 6357925779,
                expiredRefreshToken: 6521881475,
                isRevoked: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType has to be any of this options: AUTHORIZATON_CODE, CLIENT_CREDENTIALS, PASSWORD_GRANT');
            });
    });
    

    

    test(`/REST:POST o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                grantType: 'PASSWORD_GRANT',
                name: '7zk7g7e5n4eo41tm2txitiru2lusoqg0mmr430awbnocrw7545g3lk6dt7odfire5pyuj5301jtyq28sjvhxjle8akmjvfdin3y8hk5zh7g2u25m21x00yb02beonjvmw31y13rwq7qnfhrcklb0kr6m8a4i8yhgn1pjuy63vizry6cqtki3ptzmqrxr48edtzwrq8bryvqhbnhs6e9wzkmqhgw2bodrtm9cxghjsvmgv4zg8mrxyogf0anw8sw',
                secret: 'j6yeapb8ys2ldy650yvfwl7m9c4b45f7vxm5qf668m3xrs97lg5lz80uvbxyy47exjod1e7ypqesk7fz6d8c0avbya',
                authUrl: 'bpjwfpmcf1skfka3eo81d4d5ucwql3josc1ldgbamwwcufhg27x2vn6nhj1x3d7pqq5fd4t1fdlcu3tzfu8sb32bbxb0dizehlk0mjq54abxyoarcej1ae63pz54bi0gbwugji4xkujd0ztstg1zmxmj8p4a20miisydqg5v1j1znkk7qh6wigcen4uf25vbtlbtgwrli0ga65aa4cnp6be9ji1tzlue4bls4iahgoez1i6rerl1tx0nrrvusnt9rmlayqwoxff7drooxc46diwitb829vah568ecgu53harl70k7c3yantac940phhvdfq8xb2bylimcsn8ffyeo0r30aw1ra831gwcfj2axdsvp3dcnbx7wuij8r90epve10n2iessjtc9hda6xjlaf040jj45sdah9mmdxn9ryui9ny12j3xprjhhxdouy6cztbfi1mxcw3bb1led36fbvmefkx6zvfsz1agooqn9o5y2ks2t6at5768lzu8bnwhc07x9knp6rs3di54fnrqbnuxl2jyxga2rysf1mv7xo7es4urilroj5tgew8xvas7l25ei4o0y3uu085r873azh41dspj3411j1w7hi40eh062usp05cl0lf5jlf3ahng509ltk9lmwvpf59us4efj0sw78vmin69g9gpvtb5481fdv66ibxul05gydr7b70hbelac5en4cjik1ycz1xg2vay4gyepokz17t5295e29um27ry75mtvm7hfbupvaf3aesiwyto1uybm433mrreirxkmv6gptly5ti3rpqgrrba83qxhj1wxmtsj9ishjiuavcirmvqarv1wqxdc56k19a6apwg5zdrdhrm7xem5aqs8ym84pgo7xlfb6rg8j01b6jwkccb3o79bxx76rcu1ttu4rds2tsjhxtya9hr7ksjskmw1cxaixo264w693qmdw8bwbvwu6mhc9zm3xf8vjjinuia67sfe9ffdj79w6y2k771c69m8aezccie99sk3u68pekl1ubjzjkihtinivtvq3dmcgzqcqgzeww3nj9f6s84kdyyecxku3ktyj2n25zfnhk8xhwkifcmtsukr55fk2fsrrqn8jicl10xxhimssh05jvybus6yyvoc397mp436ch0dtyal9vu8gcnglgv9lx0gmsb3y7ixsnad8zcd0albrpmy2c25c6hs4dcy0tfja8s07dalzk20sqczthceauf3l7o1j0a7lqeff8glewv00b84ycuakdvvmnb9hmne5xk3ep315n3kcm7dsg78b85bs920r5mdg6i4p7j17ecmcpm19f6msqbelew1gbxbrp7upespwuiy3yeo0d6e789ak7phklws60bc8r7s4xdiyg7wk4v14l2mk9ghn1fluk3g7r3slqtpohxoh8ftonjf8y3zi2jd468uak0da0tow1fzvxngeopjbtb965bh04r1unkve1ud5wphxd42qdew4f380x6a4kpwiq37iahji8we9vtb293tioi3oda8o7f1es0z6kuvgqpww7qygbyg38wbxxob36f2cjpo08071qasakt414k1b6phc1ve175bls1h2nhw798u465rfnvxnvkc1ww05mci7uscth7rt65le17ycomuy55ky3upyjxk4oupfn8z96cev3x8hwyqicqrh6clatp87l1g2fakorjbib0ykoglun3rklotis6k0teadt2mrwattd224od0mwvixx89o61nxag76n4lat0m20zma7j75b4wuratjtgzjvq4fywxa3ggjdzuczvng4ymk1as1il80kf38cr8mq9yqfsmehh8whjw5zcgbznbwpruq158bv140xpmg9xc5d2fxet4t9ow5dlfdy5s1crwmhhgjta3uu57zq75c7ipz1u4b99rcy3f24aifsn7gcdrbj0hkl64722a19kfj7melk9e4ogyrao10ih2o9tw6ztg1stzw4jwbemubfydjwlg0ei2u3ixpb0plq7unhx2vq5zki0v834c',
                redirect: 'b0gojvachmjj7ug2fpb4v2a2nud2j72rqn6r8nf5h8d4xda9ayb3m89uhdpj2nu45zunz4pjh45aysevd0wvlyfu4x6ulbd3dplj6mgpa9rj0bho6jysupefmz1qfu0gaxovhfuzuxqx7bjhvuhc2tm3a76wxyzrye08aautpvom9gysjx9lguwdhn070seion08msdqtgzcrspj4hc62je048y6uqm2x3uhtotmjoni1ep4ry72bd1u58ehx89wpnmu8smvung5x1in7ff0rx1pccld3vzjbhyrm4cbga960z3699o838jdcnq8qiet9s7tyczhunsxjxj13rjymco4wvk7qzfx1p4pmv6qk19quh7oqvytqme3x2js97mf3qzid8k27cktf657cjsn1469xvjv0cc6wwsbnkj2rv9xkfpqvnk0840q81rc9oslmv5dygf4bdis9p76jgp1jqougy22ksk92dzv5i7be3pl0pbj5ew6emgtbfw1ymve3ly4tf62c2rji10jz413bu3jc6y99babbtjj99hq7235eavzgc800xixfasqehjh8so7lvyv5o3zs687yng7fpx61sd5dz46vz2vjt39iwitwvk1axd22d07z10qnu9abqqx8w7bjsgoo3wnbgfa7qmj2sj7scaur9wu00arcz4zxocwua14seaknjo1ovxcln5qc5vioow665wx60jfhjwxbqor0mwr35eo1od5npz1t0tviv75piycsuouiocb4kcsalubeutiahy6g6bpsn7x3dn7q94zv2adm81ya75fudv3ku6r8t4z3zuecz0n2olyzohg46prw7omsm1kb4tsxwjxrc5baxf0k7i2g9x1e3e7ig2llpsqbd0sezubtk8qjlpbin21uek9qbuc0wouq9plafhfapqs5g3la3nwbx67bdlm4k71v6j2f9yagb4fw8q8sq49bpou04kvawu9ovfy2q4ns9gah4okdbsjclv54oci1togmwsksm9p3ija59eb3c5g71jkdaq9zifowlmap4ulrxf4w2rt2zdnt0nsgo4ouso5cr0fupeke393o9ixcu1t01vntty09rzn03h6h5tjg4xgj3rakjdz4skomw3w91xamkw9blvcktjdbay8n3946vvzdglph4q8l2rq2xq42196bmgmca5n6yxbnvyd6yed1k7op4f8nokcj5f10okxptv7usrt8vekus3cxfxpc6lpg1ro5ladjfrly8tc7eaq2xq9226yuyndcwv2g6ncjw0vxizwolo61hydd880qydhctgaxv6tuzfbtkcuarly7w7ba26zh0ywlyr3ndz5qoind1gfm5jbne23xuh8ilb1iua0o49xayudo2xu26ttsz2t292zraxy1rnssnb8y5e32jl3mfl6bsd4typqdj3hep5jfkemyxrr2eeza4ukf8kd0w5tttz1q8khldvc9vh24thukuekvworms2ven3cv5kt61zm854omrf89lug61g6kgkl5ods09a33zu9sduflnjvf9dk1qefndhtb69o65nt628vsdgnty3oj4v27oxxeq44399uh00zqzgwz92w8io8bywa5rcgkkclm4c5qz34m3z9kso1aen9jhor7n022nwyxj9ygc8en87nug1d5x5me5l0i7tkz68eob7uor7ldyga3qbij3cl4ljfybyfp95fb82c8sex399rltp17tofjq8ye2wl21geov4s6cc5quhw8kattyrqv60ynh066q0sag1vhaqbp61vb9633ip7aj15fr92fcqk5ugxgv1siqfc5tvkdu3x9lfkikjp44lhye7lyav0pqj9xkbzq0f2szsf9javl8o9d06wmd2fhca3vu3ilxt6v1j2mwim9elieep84tisb66jw5ihe80j7o6xli07s40uw7jtnk3xuh4po0qxcz06p2xh6oh2mlvxgi5rq6zhndhbe350l5jfm88lmv1bc92105gfa51wvbikw3cr02plww8t0ubf4q5h',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 5666909054,
                expiredRefreshToken: 4763795751,
                isRevoked: false,
                isMaster: false,
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
                        id: '3d6b9e5b-5e38-4ba3-8f97-7db37671e33a'
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
                        id: 'b07ad268-215b-434a-9873-dbec1c5bf907'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'b07ad268-215b-434a-9873-dbec1c5bf907'));
    });

    test(`/REST:GET o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/cdeecc7d-ba63-41a6-9605-e547d94537ab')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/b07ad268-215b-434a-9873-dbec1c5bf907')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b07ad268-215b-434a-9873-dbec1c5bf907'));
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
                
                id: 'c40dcc4f-b164-457b-8d2a-f90475bea0dd',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'ph9jx6kp1t1yvnydsobtuofycs3q2dd1dadfdaikh6o9fgw9xjzxu5j987lu73qptus6dlnmnq93d5tr371jtduu8mmiyfdxjog75dhufudll6g1wohk0sup1x7er391a57bnyvkhuiwsykemf1b8fru6ti364wa1m4hfc5nvfuv4w10y2242o3e2qcl5eorfiitiuw0anwbjold0u2tp85kr9f4mook1ce888ckq4zrsluar4hy4ke5ugm7kdf',
                secret: 'iehdrnu8faynx0buwn93lvnba5ocxrwq2h6b3iunk4zkoxeyj1h4wsnxym5ud0wq3czf2u1iwq8r0ai0kww8eq61ah',
                authUrl: 'a276r4q6x79peg5oce8v6rimuvprk2w5yhvmmh8k83ogu51u5q3tr7mgjjbp7nk6yogcdrz6dnw0mommp7rsg8vs1y1o9sjlnbeufx67hs8hqdwsy6k2qzu6wcpve5fyd1b7axqan8uwh9trp2nblex1g9q2dqfkyj00i9f303sq3twp3lb0ed6s1eek1bqhl730lnopo6g6fsuy9ydxq6zymkhlpqzgof9drb6soji5h5w0yxm1brr523ybty84q7zbchmpz6xb3n7ydd1iq42u4t93rrqqg0tw3id9s4e0ocw4thl5kecq8s5iem245i2k8am75d3p5q843hzctipm063bnwov2h8l4thienql78tskr2g9hgpx6ssjcj11u7spfw7dut1me4ivn3hvkts8k5n8iz167vwf5oaog0c42612dsmbimbtg82lc8uqnl05meiw90scgmilaodi3p6dnjf55fqufsk0f1xilm3duu9uuxkw69udjp2ufeaibyl3y8c6f3wa6n9b8hstwkctght4x7ndqlp5heqcx46mliyuqlmyobze0kkmgco34bk238vh20x5nrvnz2f71yebacujqgej50grda51kdzlk1wrsl5u032bx8n583fu1wdxpc5mcizooozijozdejacsgiuspys62r2rp10jju2vconc3ajdg61oar159f3od0k1tvdcrxfgji4lee6h9ljm2wr0eo4s9h4a83phaqheozg6vw5meiigwfskbdp1bxdwu93xh03927omifjz3s223rzssp5kewwkl94glmede6gwvleefu6a3lq9qvzx6qxkhu1sh70t03g2r8ij7i6ungm358n8vte7d52522r5339s19pxtc3xqvk53ukw76w34n43q2qaexnv7w37q6vhwbjxnej2vjko92pfn0159adrcpu4rq5ugox90ya1pilxhccpq277gmbqncvthhxhqnsx7py83ea3kbp1hum76c40kire8nwjnltm7arsndszysieq0e71v2swjpo5mc89u7wv3hqdri23d6i3bw8ql8yekq44g5iwgh1mrg798zkteu0d96wq28w29dt5fzt16yvrs4wnikphloclfo1f6crezgg2d40lmchi2ht8k67b3pcne13d2hkiz0xwch8b0e2dfj8j03kv73g15p0iqfoc5pndl2zjezywqp4ojt42d8xt1zlbxzspefixo74oaog7tvwufyvruyhdyrjkna1hwewn9mrrfjtihiv2xqx3enny1xc43o8oygx4uhm3e82y2pyx4d7jyfypylbej4xp3kyue7u6chtw6z0sl7spe6ecugmsa09v8ibzr2q8dghul2auoetgtxhzzqqqfieoe2urbdzs9guhmlwb64vhqbe9qbewmukbplz7j0qduu5jjdqlaquvjt3yr6mjngm5osyp33wyecgzq47lxbzni2pc53zwtx6itg1ldnw6zby4xuut9i380op0wapfst8r2bj6xh2gbuk1xzfyimg0sykjjl2gb02kkkpeb3xne1c057d8gjih69f41j9wqiipaxk2wwpw9vbv9p1syi4jpazml5vlrqeajnsgqq5k435a1ta3jmww3fx3dhevctq1mdjush6h0b6fnv196cn38pkj9md1qukaqrpsxmzrzzo4ltg03mha0tbqfc780775svvw6nnzxunlgixxxgw69awdzgmt1jvmbfwxoi3yxxn3cfemwfcsmgx5w1zl5fjqg4d2i854mq9h827bzosvyh4gmi8v8ojj92p1fqdel7vsbdfshp1mgfk9adm3nay00jgaqhqsszpf2ehq4munuxmnawrps35rw6hsyhh1b9iltpiugg0vc1scgkalpk5os6u1edspdvr39f6r7okcqaa241m8a8f5jaje2rdfd1m0yx9v2o8w7reuemxy2rh5w5sv1ao6l001kqionv7zgiw16rtd13e01qtg3mqmke1mbkjphh08nei2xjxak1f8ctm78wg1rijl3',
                redirect: '8hrysqbgxbakfwbo8xqyp7ttcmlq0bnsbn21hh1linez3yaniw4yrnmr8zr2ikiocxc2auq7i0x241j75coauicwy7w75l3kmltljwfsigzmgzpazg446og49nggsx3d8z8htbf7h1nhosbhpa7zsearnvw6gr434fsofz1n13yqh72tr03xxufuyfiyefr2xc4u380efhlnm579fx6b4xr7i77be57eqdsj11c04xhyjdjb66swo9v9eb8kihjietgl2yuh1itkb3yi5jtk1dab6mu1cwqiwbvfa7q6g44gbzxqgijkf4fcfsb9km4wkis4eqda3o46qtzz8pjg82dhfrx7zc5ntuc31rlybixpd2xv59ng40xsna7r01ca9x1jnruzc177xeey4bntsqy13xhbsaz3hut6ff68wz9y5n96nlgf1s7fexxtwfzl2cliwdn6q1s5b8avwsq8o7jltced7rz1g6lvlcj2gqfoa9c9mrbbgj60jtdmys7xjgh4l6v0dhg9yxquqagfra53umrne8q2esniweztqfl9z1d1f9ld2n6pzo7eg3xbnxgwpfdbixqrrdm74denmkejr65mceilgnpvr4z5zis10gxvmp2ibunw0vsg982ha6d8o3ey559qql2a3yn3f7opip3832e8bsxrpm6snalf40im4zwa9pqqy0cvwou15mjkspghm8qubcgccoiwqz8y6b03sj3ogt0z7tbbdbdf2ote3yhu50blg973ayudjeaw4aqc859gkcowjjn4hmkorny1vz8n8byztjgagqsmcg5qksgupqlwykxsqb8zkk5b8abur4eb8jnrcyeiizxayp9hizix3hd3mbs3ezjx6fl284xasz3vnkxl39qx6umh4omqqabkwwx5wtwtucyib2y15j0vk22wxw517lggyya9ubg2lqpdilioh6tmccjk3rx2wvj5y1lpxm54pg3nw5f03s73mgo60bni9s69xy7ukzbt8hqtzz674kol0x2knwaix0tqnbhl4j0edoshx1f84sfvcyjl6r5ju1diz9slzi1cfub5afyl43nht2vx0ert272xulvns05xipxtfxn9ly511pngcgy6ntbf5lsbhtw6vjrjbnqnjcretjmhqgtd0weasirjbvpqlsl86kunt8c1m1ecvb1e9ap7t1k945996k298a6bia5rlgx1nnww5t5bsnhhcesijpkkix9usml7i7oxb0iovh4tk1yheum8fbuean6b7slmis5v697v4669cjj2marwvizaeuenvdranf0cp1xuvv09r5hcxr94nueqqusgaqpkyhmixea5g8otcu6md74gdk3p0rp5f096y4ir4wi8xruhbc3wofafbz2o0x6oe50d30p27up3torrpkjnawd40jh1yjoib1vtxxbh08cudctkh51k8mbj3r1b4eftdefzl2xdxkcr7d7jnjsddq7w95nxor984mdg4wt15zsyumjuibkhkf07z4gpz6ldsavyik6tnqnp0euur8jmpk96edgyv6y293l6rx1xob6p7z979mmcirlnr0loquzgw9lk1e4lo2zfw6kcs3j44tsbqpzcljsksi7er2o1sftedippigyjjdcmjqwsm2bterv0nngr47fu3afmvvi3m3zxpegro96eqfp9v3fwgmpid879gri554d2vxo543bj6wk2ajeqdy9uotiffxwavbu0592c83kk2lf4pk07qc6dd2h5rxh0ge3ruc6clegm9pdsu9kcq9no9ol2j1dtqoit818llq0bcs7ro3o6rj2qcoyieup090osm0kjc79slidibjeuzj5ilnlv4vm5qyte7vy5dkkru4w8endhe9g6s0g7nmz2xuvzgyyxe2t7zuc5c2cec64pxti47f49re26a4k0fjqdmnvqaa7shw5v76oj163ubyqdflyr8vscjw48fsdyerxqpzuw1sph5l4y61s0oa4gu3xwor6905j39hqcproq5tid3xjon3vlckqq',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 4567002040,
                expiredRefreshToken: 2117763111,
                isRevoked: false,
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
                
                id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                grantType: 'PASSWORD_GRANT',
                name: '45coyqdjk6m22qs5ao86nctr2w9wf64uom6b1uhcj2u4qj2zw9gkxvvrpuzqxttej25j9olwwboxdsitkx0970nobtndspqf2g0ysoeu85o6eliwmm60ycfnz339o5rzcgaezgws57wwj3fiupr7y5ydcj299fm57hvafc4yxhbz7il15mqbnkc3dha2q1avn7hzie7gimprx90sljgis5nou57eyqr4i0044oio0v2qjibw4u3ljekij0ug6iz',
                secret: 'rbgjq8aokoilnwelthmz6qn18i7up0amj5v7xq921o8i4740isame4rdkt290zod0t4e27wxkrcnu5kef38ekm2oje',
                authUrl: 'w17el6cw0zuj3u6a1qm31c4pzr6z6lapparm91a6rtb1g3y0gb9ce0dqqfps0b9wqox6llkun9u4k03noqoamgmp1axvxlbyp7qz1kq4h565ljlskcrvu0665fs2tta6x3rk9ela1vod7mvcv5xgzq0yi8cboar4yuvflic8a4fbap5ghfld9xqpavv09mlnbcd9i93il7h544hv6s0591p6lqc0tf5dg5ny5fno473u5hyd27zoxq0uivv4hle1oe93qbgj3c22rl0e2tmlytsp92wzr8wbh1a4djo7206gbp4vz1os1hmpffxg0w3c68e4y3rlodpjfdjole2xzsju38cmfbh09d4a2unr45s79fyjew82p1oaz2eh1wxbbxdtvswsizqwghtqtya6hswsj0wu13slchyqd9qkqnrg03muslh3vroptxcu2ozgf6hpq1qudcp1uvsefu0hm0av9o4wc53u5txycfk6ymgwmoadrb6uq5ogxmkorgf60i36mfwxyj56wlinz7uo73x0j3x8tu3quehhe63i2na50dvt5j9wfya4zej11opeybe8wah4tj9j11p4pmiganxl4bjv778j093rxty3b49dnb2n31bljggnohv7da5wa2v2831lqizb4faa07j2pw57zplm1325egjjenoqjuhma22rh03qui6z8ozsl3bpju4togu200dnfy09052kfpi9gw01mwam0wf3dw7hqk832ehey8ex0ac5t14zy1mjbdrg00r841eb1w9z8ezr7i9zbdrypd9zsjmrtj2gttnvgg0q2adb0ah7awgjpwx0ssqxqk29u9j4p3ozpvycfwktrjxcog34usszy55x28wjv6ne3tm1a0l1i1esir7rsvdlhjlye9mlijinpyl4317q8genvtna6mrmf6l6ia895ut7qvfubxg83w6b8lwbjwqy31f1or1rhcd1pe3z94g3hrln4a8btg0jnzb6f6hybsie9g8omibzac731ypvjd3ketn81mrwi5q5lc9gigl19qkoyi7kcvn9j4a9xgv5jppmmaty5pic3beaytamd2y099nfpyzhr05wuqmj8u2qefbv11iy0sr21mnw5qqj8flblhw4xlpwsmcze4pnfrps5dv114ixgm6aee4jhioyw7ai59p9x7uu65jio3otrw5gmchwf8e4khny6bo1a0fi6oxkq9kg0pc20dufp2awxobk421olu28k4a9sk4qtex6b3w2wvjkmau8p6tjr7989msn2el7s3epzeleab9ddmwb6fufidigbxzyckcant7vrr4y26xq8vre61p4ht7fjk4fgh64zjy0y6br61dyi6duyi99yvibjniqbmou3553hbsgzdoq5ik88xuh4nyfcdnui4z6fuszie4ykspholvdhxdgzopglry8xv50x1y0261hqglr7agi3jvdkqahetx1kgyym7ike8nl9nglcff3amvhitmrozun4qecorq5rdlpcj91ry7dmc41ioyfs7152odtyffh1nemx44wcado1fxz5zwkzu209f5eqn4v2nzs8bwkfe3samksywqtqdfsfxynnbl329yinc5wxecg6bo6s5gcriynbzz9o0vtie006dcwq1alo3x09f6ad9eworqshs7pcqyrth77qjt6l6k0642jz5voblikg51i1xmcxikb8n3ktcng60gyhxxr6yued4z7dpt78y9kbkdtx7aoxkwq1nw2v04zwdc2s64p5ulx3j59a1xjkyk46snmqtg6r3i5caotsnxbnzd3e2khtuoyd4826k4c2hx5yreptd8jlpqwgyp5l1r8xne5b82zypm4pvjyjdoocb0mv6rqcdgyv8zekocmi1moqtp0qjk53wd51c36uimh5uvrwtv5l6j5b7rb3reg72am85lfdev9zh3dg54kbud0mymln4bxfilgwzi4q1wjtgetgptwy9jvw87by9ioqrhvmp8ktxpph20pm5xl0haaljk0cxfbbefissp9',
                redirect: '8u2pv9ei792mepaemmzfuu2wtgcjx9o6gydtl9eh9ahfxd5b8o20ymr1o64r7ycb4xmlozrx0vd5a28tp08bxd858rolcuqiepn3nze29cjzoj26d6254ag0s8x0btkxcei8qm2ubjfwnlpw642x9f05lxs3zp57ry4l1m272ik1ch6mzgz1s7g12jfusftmp3ibgtk1pyf1l78pm55sbqqbi5v5yd37o4zogr7oamoqlq1zs6ktxrtvglampn5dd9d4wz8hk7ujouhr7jc11deryda8op6favb3w0a6j25k9sn0xdv4utmsiqa7nyc9p5tlrt5a3h2pqogrkbdl437ks2knzpymbq3pzn4dgcgrwrr2xaks5joxrmsrscdmo4t8ewx8x8bnj2aevxuypi35w1jfmay0utj11geg3wssobf9emuljj7sqajzgz1zwyvitpqz5lkjsa9wk6rwelkxk367381wfkrp9isrl6qzdjqsdhtr3u5yni7d2c1x6sjjhann3msy5gq3vp85vbk5kcy9iq6g0ngnudrz11rcnbylm3gy7fz8oy529d8gyk38gopwf58jzc7g7p329uie3s5c1wyjzvobbsh0umpcx6rbgbw11zb7hif521vm9xs07jrqrqnm5t7x8zqt0okgtl0knlf8yfcj4lqs8pajn2vtc0zmzyewbrid6zjjjbx4myg25snp4rkms6ots7rk0hawysm69h4j0ggyaufy9vry6jugnrla160w3h295r9xdoxi1t1c14a69eouwjvr3vtjyho3qwovjrce1wzwwy8e9yhbu68msgf6iktzkijjepk1pv9n38xo9hg9dtjuy5470p215jtr77gk5oh3iao0h40egqqxmv948zkzugc4duy3ev960vdsmj46ki4hn5yn1imn7buwv0munyq0sbwlzcdediwah3c9gklave1g75aarbjjkd56a0z836czhqaq60gr5j677rbehzcimr27k507n4id3ks7jjpzlid5u03589cjvmiuniwmcoe9a9xl1v9x1mltd6sz5eo2hst5i0hvfdlsy1vktu0c3buu5qc2xjxbl3yuygdx2pms0nevhubvxntgzapdf3czgk0zsxx74xiua1jyae3blzb21tkhsfpud8qgp47v21sjqpzwmkbyxgvym01xvyopkdjqv6vpjqe2zp9bv4bttlskfzu1y14l2nkmj54jgfjgl1mi2anjaw3gx8ug1di7k29wi08ol3pvdb74fjkshpghw8tcr9qn2u0zifmgfiuuto6gd6jvtvlo1xgc1xb39qnt7njm4xlj8xqx4f6q5gy28y6nukahobfyylyxb58nttezert6h7gva1lmv81lv27ogh5eh1tl2xp5t3lhucxietkaac9xnglm0757pthahojqgsiksooizyd7let3u8f8wdq6etzu7mty4hyu2e5s962ewd7ayk5933tub1xm177tl633n7tevu7fj6ku0w6xc330e8m5ezql2501p9988z8799xa7batppfik1eurbvz6f1a66v0g8b482l8nuuupfg4alua5eawjj56dtqj7kiywjqoz6ejglk62y1eiynbd2sg5ej9gu2gphmpv6x6o4yqily2f1tpsqi8p309p9144wb3l9p5usgp4bry6f45bxi78liuneyve9lx37gfb88natw3hvrzdm1ire81lkx5amw25m7r6vnofbgai8my3amnsrejuxd6e9kj52fr8qvt3q2pipnp9tqw3x1vwzeags0x1ccwgmpwslnkws5e4gog3qplxczh71wu20ghwf63phfb9uusgcxlyr9h5tcp31bgzjyk9yc0y6nr0bdbbe86npxolm0nhdi1te0z4qfmf3j7c3slomew8dh988sb3aaaqdv7zj0jto9sydp4y4yv2kmm4h8h7ykrfizvp5pf28s2eehhn9y0gjledjv0hb8g30kguvglcrsojolfpemytxa8klwhhasrej7aggpwkdni60pi50ti',
                applicationCodes: { "foo" : "bar" },
                expiredAccessToken: 4203762051,
                expiredRefreshToken: 4719512021,
                isRevoked: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b07ad268-215b-434a-9873-dbec1c5bf907'));
    });

    test(`/REST:DELETE o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/d366d5f3-7ad2-454a-ad7b-ff5bf241d65d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/b07ad268-215b-434a-9873-dbec1c5bf907')
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
                            applicationCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
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
                            applicationCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '88277103-00b4-43c9-ba1e-adc4c581cf95',
                        grantType: 'PASSWORD_GRANT',
                        name: 'b954bj49a5bm1sysbtv2cy9zieebbkr8mvad3hyum6foayxiuavwa2gki96kis08x4og07saal3pcc28s2rbh768wgzw2kedu4nuovirzji610djws5eikzbgznu5lcqvjgxst9ft9zpvvc2o4lxo4e3a0v635qyhjverbfaji74thhasm4ob2ll037v40e7c2nupjgdqa0qqx1172jei5d5e3v5hq5sncllgxsjnjks0wgxdl1e8xvn1apubra',
                        secret: 'dj5yxst8f87eztl8goiln2v1u179mqvryjin2x6ow1ykswa66t65t2o2nowt89a9w1c93ok6tmelw0f1i1nctpq9ip',
                        authUrl: 'vjhaxh6dztlpaom75yj4z5r422i9zgaoj401amr4sw7bcjdbkm1hjpa5kvfxaeaz5lyv2kgo2i0h3gd7sc0lx6c8tdmda6kg1py4b7hmlgybw6vkxd3sd8xv6atapqj4wwirlgqo2p75icx9ar0jt39x5dup9v3dvdj2dfmop6edka0s52fni1t0s8onhp102nqtb3xc3wfhk5gyyiqlv4o0rhos2lj371kb60vn5tjgipj4tv4wqehg05p20i6y8tssihgj7crt1vh5ed6m5zv3r82ta22d0eegs5zotfuj7s5847vklpn9dcyqsk5vj6e1bv7q8d3symvw4r9vgn283wlpylizz5twfkf3z2uw9r7v0e06k6jdpcwc6cllsppkehga9vc1000kblvta327b8t2zgeptafi8ftw9wf7dn6gunyq5rqoar2bufljls3b870kqtzfhv6fi35dteaadfwmkx1ita3w5si759uk9z8xsv0lsw3myf4jz4azjvwlfx0y8ial9nsfc830c7fllsr4ob5w3nhce20hmk8tzllhabli1rur8ov80bz6bhnvkmsuc7c0hic67h1o3lxkaq9b16y08nwe006iyioschl384hhoh012mtw3w6r15wrxvm0rt36xwm2s8q14j71ss2epoqc7bqoverfr5oim1usmwn4l2nxo5vr0awvvg9t3k8hi8e27waef4dastp7zbyz8x5fhpuyzuvji06lgbblutq3ciijg40b5vxcjrtvrmoq1qaluqhnrifpe3ges9wpham5b2q016d0or9ievqfusmdrdve1dhxwhf02swz1d1y3vwjf21z0za75yhb8er4wm0114og5hz010v61yiqk9zt0eq8fnyew82vcar4qtiry89uwmnq9kdppmtnwxesitj0wtujkavumg2yisuof762ve2n9yohusbecrkosncnubg8yf24ktfldbk8t1ub4662ezgaiiq5ed26mrds1ths9wuh98prx05eh3snraghhsnv3w9xw2i4akj3k003shtyujamh6ib6d3gu6585kj40xt6b9tscgpir3ewiyeq19cq75miyvfd8ppqladk2erdxltq4be5j9y8zramud0ivrt9dkhe5ryp1dzs3y72tek7j6unb516ta2weooobpgy2hn7xgx96gosachezpbe0iz5btld5x3esq7dggdahec57d2hzu7uh1otr4yq2n5dr0xmc1oeyvl76vlr27c7k9fne7c7xnkjba1od6lelp52glj7mjzu46ti6r96sf6b4yakb1i2ps4kld1rjktqj7639d7cstxvz3k625yhpua00jj41015j2bjt60umpm2ekpu1e6au5ghpwqebkomow19gpcrzdnmmm7zzb49rf1zftqhwsnmvofjxo7e6c15snpazgqckksjxqo9kn1c9f14no2zdcpr3hdnj0j4sv3i790mdwxntagc7eu67rp3le3jwjiw5rogkrppijm1zx45obg8ybrue5r1262uyv8vpznj60t1z1nj3f4unlqgqvcq8onv8dexei1gp0t9c3sjqvkndy4iz54olcljfqwny204d68j71ztvubyqaqof80x4vpmsbgic9oi6ycrpksbwvkn198qb913tyajpri2mia1ovozsknubysx09142y0f9t9s9gxl6koaoz0svpuc8lovkf5cfbtn3awtdwdvcwmfpmhyc0s1p5hetxalz1ozltyobaxl7hdavbkdafubk9unbjsrnqqmk8lhk3og7psnvuql7t20dn46tu8jl2t93j0kinamsg0hbrat910qqvft1jub5s7ndve2lqi3nhvororb25rztpzofhfg3p0g6h9aqcqhcimrrm2osf8b9p65fqphak293eypa7f9p1npm3pd2rc12w4uc2n7q1nb2ykhpnxvkpuiv06n1j3g1zhj6d6xie2hl49efgk4s6mpsdadajt6304615mzeuf8vfjv2rqr8wjojba0prtyloezru6a',
                        redirect: 'q8odtu8p2yzcmjfd91i9jlmqm6djrki6vlblkqwl86hcft5hokjas840h6xrovfe0u8pcd8mr5lqq0qpk2r3ciovtvvje50pdugtkhmpjcbtxaiglihrsmmhillfvr2rkbi1bp5719dq78xpifknmo4iqk99llq0doycws6laxgntl5gesakr66wlbh8ejfy0g6pulltyg8e1nmo5m97agjp1o0eh1qhtzoofuxd7idrzzsq3j0in5wu9v4tbjom398wcvbs07prcw36sxsqyzxjjpocin39dil75huko2zm4eh88f8hycl65jgtxj9x9z1xtlufzvpteu7aoolavsoyy0nf9xeqfednrhbkfrw4qn3uowwaehglkr4ug3x4dlm297074jo9m8to08d4xk7edk4iqj9vixnby135kbxvjhl105vkr5ys5k7br58mctbigy4ovr9ktc8san5qi4dtam39xdrl21k03s0y0ro7l2lnxe7qnctopfcuejjx4tmrta2l267uu1bt7mluncf1ca3p4mt0gnp0doianfrbju9eknflpzhq1lzzrtgco23ex8xzqj6h3py5y3pk6mpi9946hi2w4ewf0se6kmycahovnio3jovyf9j91o0rhzipv41yxakq7wlza13dktqy66q9ydna835cy6zznwsi8wp9glaszef2rw75ev44uj9lbzfa68nun0skrj0upntiqvc8ro77kosmvf9fjfpgktbmqnqxxldbe4f7vemjex4j8y5z22oag2ne2oh4lo3qz1lns9ethx08lbcx2wsrn9rzzwdvrk4x11qeegylv215b14dqjapyhulfc0x11jplzgx3o2476wrhroaanxbrbaft6ciloauswgmed9w058zjmbxcfazo675ymdt9vpbk1wmgvgqbuncv4zykqihtzqc2n709s53acurqx3d084bohli6vsaxxq1cfdyo4ba9kefnp2z6ma6ullplg330hefwgc9afyi1scnd1q782623rgv6ighb3mhm66f312tk04bw0anpnwjktsy79lh6xjtedou31zgihr7a6qvq8eyjdcw9pymshcryihey94228ig9wl8xwd97nvp7x08jw6r685y3a2ciq1cpo44saa2tecq9s282xnlfq7ehkiibyqfka3m6n4up8u2ezmyyz4rt20in6o7qauy1vhruw7kdbsren9zenidqfdkhfz6xubt33imuki9js2olbxnngdrjss2da635fjjhdpa3goh9l9d5nrpzbfqui05qa8suvs6imp0lozoe10pbnol3htwg473ruzg3sji226qztcbzgo252gefb4lrpcc81q2tabtueh0rawqrapv3eauf31h6yh41vtub6p6yeynlzz8wb9w2d8d0jo1ei5hsqoy942pdol0vnuhguso9qact0pbye3ww9931jzn78xomqufvrblc1ds0em0qomop8k2appjz17wz937fkebgwjd16wo0fdcaoherkg2e4prof4wwuj5x9deg40xw7humzpyjfzq819o0wsebkootpsss655zwag1qdj53ho3sja4yuk2740k6pv837nm56nhn7uhb31jd91cmhqu1j8d8lwoqx6bks64n5zc6l53kk7e5obyaxdkgfpxmmslrkz05072jxd411id63zpuqi6v0jc4u8h0y4ixocuqvdxsn72b4bqjfb1ow8xp948py6d0on9wfv1y6j244xjce9hxfe7ie3ijicu06em2sigbu4562ai5td3n0kscris5h785g4hk8pizw9vkm7plbz495q9epm8yg13yhc9pu74vc3gnid86vhv33kybfq01ngk8tj29xpcc4bhkv8s67yrhguuk4ncfrryqr5c2suu7op38poqgjwc60zepl150sy8venzfytuglix4dzu54jokdrza77z3fcur2rac62666rly164pf3g8y57gz88r13r43kyxpnz7ijcg4v2yqzb00nkkup5kc0dttj9r4o0xo2',
                        applicationCodes: { "foo" : "bar" },
                        expiredAccessToken: 6246796383,
                        expiredRefreshToken: 3694580043,
                        isRevoked: true,
                        isMaster: false,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', '88277103-00b4-43c9-ba1e-adc4c581cf95');
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
                            applicationCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
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
                            id: '55d5b941-4979-4013-afe5-f0ad74946707'
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
                            applicationCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
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
                            id: 'b07ad268-215b-434a-9873-dbec1c5bf907'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('b07ad268-215b-434a-9873-dbec1c5bf907');
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
                            applicationCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '76861387-0b35-4a03-b0f7-8fd1129023e6'
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
                            applicationCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'b07ad268-215b-434a-9873-dbec1c5bf907'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('b07ad268-215b-434a-9873-dbec1c5bf907');
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
                            applicationCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
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
                            applicationCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'f0e6a510-b19a-4259-be79-919fcd0d6a00',
                        grantType: 'AUTHORIZATON_CODE',
                        name: 'w52b01ienial7uok4k479fqrmrafqdyadl0n4ky4u03trk8n9b8lzn1y55geozeh5h5r84cpze2cu4qnyd0f2jrhnkqfsj0dstfadkvnb3mj0kobw8spielhfh94bbveja3rwv78fse87du4hyik296ck4yzte317dup8i8dlg51elklbmvufhzz73wc5pj2gzqcnbqpqj1lwjwilqj5rov6vy7paibaoj63rby7f0ijsvj372sjg58rrwxxnj6',
                        secret: 'i83wzqyvqwres4kfl1qyjvpjtchaaqbcayvszz7h5biuj7c3zjbbmx6e5v9x402uwjce63m4ydcotyiel0d1fpux2t',
                        authUrl: 'tfe54lz8yshqklx4jsldvcao3ka0ca95quxa4o8t6ao9lkuwg63o5q0fqiwmcpkyuvxuilz1s16t27f1hr9ksaj5gk9cwhjy6pp18vw6z3omunlypma6l6imyd3hf7et6o2iy33mlwornuzuc5l2memqsk7z9xj7gim18v8wy427wqg9g8jb4i8hm7q2vio9bn441z1wikn3eekpy7limwv9lcsmjglizwbf3ciwagfmfesr0s1o7970n8h5xbtr1y2eg4ddmbcsmyqxz9fsnxkavnymdvfarp09c93950elfci5gnkkn27xx3v5qhrpehpksadehlwxvzfzo96xkyy3fgpzgotsjycui8thy5dmp0wg0wdm9t32ckd9cpiym8izxnw0uz2bxppwru79ackch9djzg3yyzaiin1j5seciamoijbtyxu60ziu8hiixmd9u5dcurias45fxl4sujz8nbap8fbdi7yix2fxnhg2nd1m48icm8bgobr3xmtsp4k5poerr5nyvo9r9aqier88k696gyxfx124gbi06cjgkrg1p49t9wjv4r4crih1dkwbn7guyz1m1he72beigcxo4tss017uoe9wvbhany8qbayb7yb8vzpyfbttzl6cxaej9xkb921v0pctypm55xsege4bmbfxp9tnk7vqmooalh9ip0qo51d6p1bfojtfa5phofirax2m6mamxfr3rsc7yo2gnko8fla58yngzkp8nsdqlwwfjqyonpa6g2an75uvjk3qadoyjzr0uqsimtbc6sgj81ctdmh3ife0ax0mtmu25eu2bwhnoso1cb5svn63qy8djuc228g2ez80d6r2ao9mi9xukxmu6ej322t5mlc4tfvo374th42lsb23puhnrx2vl9kgs10qic03p2pthfucbrwzvsimfjo7v03lpqd37v1qx5qb7n1w0us2fuwwxn10jqsxntxm3aejbmxkh57kufyft3oocgfg59zil45o343uuu9ppsdlzvkivxw21yn8h42czsynenn4zjgppjkr3p52pivlj55r3fbnd96rv686o2f5rspdzt6s097bawy9zim9qf72pxbsd6ias1l3os82p14vnxkuwwalm106fnmrexg97l5t1xpq4qdr6f0e30tdm2xau8nqv9auhw4s2d8l5eyhhsiuh538o9g67e79pjtjr20jpejjx3m9q43civuu8z56rhmpillzef18jbemytocjul9hxvgmcmyiuqd4a2p9vncknfpukur5ji3kh74baulofa9hcbpxti91kb7kqneuj1tjn270aga2307vfkb9rsqav3ozgryxpwqyfavoqheu6o4qsty7l9h4v1wqdb3pc8b3c0rgjbfzokxdm9hd5a2d345v23keylp4nraa8wo4e1nnkah444r31xn248abww5w9fwsgo7yyscqrt2rqfpzmpegyqjgps0y28fz0oxkg6hb5yt84yynzr0bykrm1niio42ssk2l9tsx3ujeadwegeio8w3o07ockbo5whm91yqjp3d86ow1ia8ttt824vsbnpney4qpjn0ec7mbw2vwhc270y0au26i0j8idzgamtjdu6zytituu80oa4norc7u4ldlecxz99rc9y2k8v4lj33rcx871brs8wjgmn75npjzdutv6s1p80mj43xjqkhxcn0x2n5v7e4xjyl6e6d9bkrxsipk3e7sx6faz9lgu73kihcy6ojgeq2qyi1mkqy5h3njohcgekh2fc2h47h5j6zdbqtfzhqpe5a2bmr8mx44ffv3c49ttzhkway4w3d0bsbnfscv00gvhxu0ji138lq9amrwy5gse164mu5iuo9xj14yc0oa32hnqjeyiy4d99ltxcvjdftxqf8h65nxkt7h333t1u1ct4mpd4eg89g2gava2n877anpcwxmmkpmispel04y5ym705mr8j3nyuet5ksjl88i89p99y4l7t2yd608fpk9ffhsoj0uecyvrlhec9gta7udxr3162pfmyk',
                        redirect: 'xc4s5kk3991uggsjgmyk2g4zfj7b4tfnrcmjks9fih09drt5a78o3k9g5izpmpxgbtgp9uzyqfr8f9aluoe3edowk8onlurs9db75wlwheu5tyt1fcv7v8vhvf10rfbghj1h0v1hph5sjjfp57biq12eyfityckicmxaz7s399taa1tllmodi3x2rcvq64q25d21g4usjr5kt1jnial4o75f4z4wp230djq0kxcnf1m59khx2x7h2tk3h2cvxxogqeivhat73zqth6i9a3vcfw45gtosb4czyvijzuo4yqsny1y329g6yzbovzhl2cxkyctrdt98bn9r72h2wd6oywnjg81ce2kexbxsbyfyudoafl1mpsgmnlx4g6ttov7awj96ab5m9b45yb4fbb2ntid24s52lajcu4hvcvxuwclv5woma1f0ij4q3bifgi4cc2p5dysagowb3jl5l9cy9wzi4e966tmxlxvgt1czi4af9b2jueowa3i8mhia2q0joewb1jnujimswg27m4ena5cdrk6ag4b2t08clrlv550g2pdrdydlsttbfklhrqzhhd5j5o6woy7to19ekp6v9nge1ogsx3kluvf993msn1rbq5yycjw9kqgnfbwsf1lttnluoxxnyedaw8jczjgcvp55ksqpr2aw6o320ddp7tq09tdw7n0s9th1u8j910zd06rkhbkiea77cuin16ufg93tv29k7vhau6i0pizvbecijg41b0vtsy2efe1o7vxprmxmm23vgdiaerryim67f48zs86jvj8uwv3qnx3iw2rvz938bhvbwhe1sxb7nnaafgqp7n1xpfkbp90e1pus3qc5zt0zvcewim6taazx2fibs7ddkfpd85xj4qiv2peka6js9ewocscd9oh5nq6rmslygjrw5w21uys9bcud5ab4mvelbvnxmtdu2pwq4egdgpy38lbopzeju44psdmh2jeotr9z3qdgkr0dx4cn41368dx2qdnirzkkpijj9ymw73ikkefky6anqwj8yjwlnrtwaqrc1qkdzllubh8wogkmqus25qv3jtj5fukuc8dko0j2mt3gm23ln6qrb4t8vn4dp4spv9x5irdr73elxdjlhmdw13aq0oroezfsxxg0r34kwmwlaon5e2i2b340dc0r8dolp10pkift94osheq2br7fn71i5af1kqcye4mky1uq5brnoz4i6nd9f46shf4bm7abn2hce87676y2zfhexx8nn6b1l00ngwncyrjs2qcgbsyceqj7gkrw1acddiskjiiozrw3u226ljquaesje00cvwnnef9wf3lrubxdwcr3wgh77u6kq2n6tefy8swr3ves0zltwpe6ldi0pscb031rwhswftpbu7mfejnxsnqvexcj4iraeccvgm161tjkfthrijjiaj62cv3l6hmd3qnuq4ykda7du90a2akb0vonealnednkx7aszvmsu0ni9uljs8vdk8qovjmnead4r6w2zs517oqgu5wfgsm1bypk57psexbrkwlpbqq8vx4lf9uh7b6p18ryf1qvaa0mi50m28yc7r5qulbili4h0yuvo152q4ve08irixi2uybe697xqy35nrtuiyd9rxsf3mptrtqi6tvvz9g1cxc2b4p8f9ywxscdb3l5yen7wmvler62xc75cbm2xtksrvyzarpy8pw6rk3qra88ryliv5v9noj48kk6i9m93duwqmcdik5aunxsvuaqdi96i6ixb3mgiwmrx7bay6jf9sn49hj13s0e0efdym8d6lt66u3xh04ecgcpje6l80l78hb5r8w2d1wktck3b78zcatq12cc80hoz0msycjtuso9esvj728qp7qmfkw47hduytg6pd406loadw4gky4rmkgpoqql35rwyp9ask8djj8yrcicv5xqnqjn1i7j0kb9ggkvzjf5dxolmk8afajmt55l0xkryb7uh1d41b5scrblrjfgpujf90knsir4wpbhccn17vh3rilw0qaeez9a8dec',
                        applicationCodes: { "foo" : "bar" },
                        expiredAccessToken: 4888970760,
                        expiredRefreshToken: 8988983769,
                        isRevoked: true,
                        isMaster: false,
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
                            applicationCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'b07ad268-215b-434a-9873-dbec1c5bf907',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: '3dath7fe2magmj5iqivdmv4gdc4rly7ly655pn1baa7jrbiozbmo0xu8rjbm2kqiy0onz4yvjkyo0btpq90hp9d4bgqkkzkp6ef2ykqgyqsd7utsly7n44pkmdzpgvkz6zdevw903xx0cjtv8x1g22cbdfw2ujevjscl567choppc1gsc94gcjxr0c91rxjrz7pdnvwpmh1nsu57r2yjf4fdy1quzbadwc6akrzftidnlb1a48f8y3wole7b1h5',
                        secret: 'dvs3zftykxz4kgjhlparzfw6xz8kofnfnokdtp2fk3j9835dewhwvkvu3cm0mfz31hxt2i7mkt5y1be22qt2cy2p08',
                        authUrl: 'uxxl1mv4108aml3u2yo0ynth6v8pjy0ysdcp6qrq9cngwe5aixug0u11lzxs2l1u81kj3ckgumgst50amw2fgec2mqhbih6hfyhrrcwf03yu9veacefqlh664apeb3zua12ev6whewjnzdkujxoo35sehxu9hr5i1wvyw2bhsd4v38u8fp7hn4381mfz5aa6wkfj99vmvf3wvydqj7ursf0s72hm5ym5bltgcj9vzh917fz6poh7ow2ohiegtpx19w9hjss87jajpfyo7rmy5foy3dadfsvaqmjmahhs5o9h35bbs6yy9uc5c6un7avuf9lnfpqk0kkxkjuj61kbpj3500cllz0y34dzfiwtoisga0ue80or9z72f56t2revmgoyvr34vu4ngaelcmae0fc6uelagsayelfx5hv5mh5aogylru1idgrfi1c9fjo6yk4kpfh1gvm1hdbsa9qk261jhwinxj4czj58lo7buuhxhflvlbs42imtzsvtwyqhtqc1h5dmj9stbhybk3u5el3e6i56swsobwwnhqop5bamd1onlylbh7hxvlzj8nu9fsy0oxtje1in73eyqrq9zp15c84jitcia3yekg58rccxs51lvj51ogolhh2kb9bui9dggn460jh68g069y4yefwwqjvdkvl15ez5ocqx1n61ladyt9zgcsq2us07x7j5iqpetnqd11328i9vn1mxvi4eiqc7hr3yer6d0j5j3auzqbdc343y3vwaks2jz194hyzhehmzsgcekzsrmecxzq0k12mnv1vls0qysgbkh7p8csmjysxgd12bi8jfurqtnjptqcx6p51y6mr5qk9bel38ek2k4sggz38x7q2qmtepxb4uqdybmnud5ytfbxybzfqneth8wslmtkbjweiizgvxwfoc9es8visqtn7h7wxv97bs6pwjos707m634umh5ixvvvuif5cf312b4mk32oncmsotwt90bjfp9gkk17rtdyss0ceicihn0yoghpnwsgt59vg1yqx8jpvmjfj9xnyq96be23jnrqlnvhbxolvv075kxr56im5y6v0mp10u5p0xxyzonb7pv8zjxip11qv1zsnmzwqj8twqcf6gxnhgu8io02y7iihoxnugnk9p2iyq9bgvks55vz1gfe16bqguftr7ak3r5gv9px2ig3hz5y31gin99bbgyjii5ninmiz12t73weyj6xb85w2b6qhkocmc35dj951z3sbd2h00ypox35x40nzs699nwxa7ej4u58scxli890mijq4ml381yhu4cc7v3wrtjwkjus1lj4q3iwco7m216ueehswg8137klnrbzz3hiredkbwj1mvd3q324rd4qwz8c4mxk6o1msfxq7y1n5is6wk6r6g0i8993dralntsij3ie5plvnhog0051j9qwyawsic982dt596jlhuqrejbe3tnzqpz3gr87p8qf7lrsln6nxfxlei8yw63wf11bir60i03sf78xkbdo3a91x5mfbta1d1euhcqyrra3htgkvol24ridt8ad2s77crlgedb8usurds2wriblvt3fqi8jlyegkbjcvlzme1796psqr8tndzosau5ebcfbg9tfe6qg583dw4v011im1v8it1s7e4oezgvkl96ofju25wzcpvq3b9rwg9q3pe5nxbu1zzx2fk0xmjhn1mo3nhqzhs3zuztpvvdbs5ufavt7o4ob719sotboti0ywcvo3wcpx5r8qopphal6rinescvfvxmk3xwtmr1l7kw11rs1bfvb4w5u0jp0cgoxna27li4pmzudmgooj37lr77pq5uirb2krrt7zj1ot6eetyu3lvwikf0wpm5nmntq1tut00u1e0k95wvmdanvso5a6byiiwwsvwffv3qe5mpuc0c0yoxycm7lk02fj25s56is6bpatsn6f72yhxlcmvbstxynhnjzzq1n47tpht3pbszhmi8qo0kooh49gz4l9ujhijcobagqq2ej1yf1d2jmvaqzsr9arw18ws',
                        redirect: '4kjpjjdd63vj4vuf4znxjij3vx153dbti84ps0ulemew9r0cm1f6o53dzwna6ml2u9onv082i67q3ktselbxzgioyqq5cok6hy9c6c1q3t64zx2f24s20ke2eipnjs3toyurmpfmm5138ir3l5gq0jzt526pt1i2lrd80v7jdje88163sw310mz4grxn9kfyb3f4jukqiekgvk1hijvym9ux1llz4m7cme4u7uwwahw4fuc9hp7pobmwme2nqbfguiv8pm46hfkf5tv2e3q4pl1xgkf4ti3ezp0dsunnmirrcv9asabaaf7zqf5vbckvgrtl7cl2zyym9dumv80ihrc2y1hxggn4x92qkgwi5p0zn0lgd80xwovwshlnmhcfz3rttjjw2pt37qnbzxj486xya2dcw4xl0bqajf48qbwpovokwrtdxbf36lv5chx6wbmi0l1qjkfd33yzym691ftp5c2q567g2q7nt2snfr4shohkvt304v5kjipe2tzoqxbd6sste8kk6klcaqvjrtwva2sjzie87x497285taum35fj7geoybsclr8uccjdyt51qux46jugo8afkw32l2iszxsfkoenssnz0i7pnv0827dh260u0e3sv1sfr7sxkiacgaqhsvgfjbia3v5clmiwom50sqpxcexmyocjvu2cuo7ujti61dm1hz7b7g31h3uohk2g6riaywobzk7rmnruv1yleieljw78aqytcbv4c0ew6wlgor5zf282rq7kl146xv74jp2oknzzigpjc9eork6tq5b3pcexfjnbsu00xpzzceykkwb24y2uymrsak1e2p5v0q13alq8rowlkzrdrb7ia23t5wyuvhmbsgkgj5z4b5uy690booqxu778urf5zmwi7sy3esv58wp11czeoby5v89m8kvjzpb50c9yhs3a77ch40y1me2qa9kdyuv2g9d71k8oawbmvmucntcejk8v7r0dobfkqrx82vxpxepif04bvz9y5lvg9t636fop0ba4hbx1et6uhjugzv4dgukzopyej3hr6cjjocabose50izx38sps3wrybm5pffcfcflbuztbgcuf3my2wfexodc7b5k60rezy17h5gwt3wbf2auymdosjfkc3agsan4mgi00px4gzjpvnnsk7e1t3cb3ua62rnrviqtoeflw0q9xd5k0ge2t4oay8mp5s4ai64yhpnuplvs445a1ftub8515oi3326f2j9a2fmndsc89354xa77rvmyoh1stc9q1oc65kgnos71xyzvn127m2oar51t2b8zdgtwxl7obtuho27am4tnfvce2woh9qvxntila77fjekijhpoxs9jydsl89ogi2k19s8ud3rjaynpxjbmyeuwha9a8a5ql7u5dncbgi93ve55ninv71qgb9y7e8imrfvhpqts35mjk5er8pygfyr6ks4aq77fwbzonm7vsfev6k0ydgnmzf4tnvvtukazoii850mrkvub7vfil3ilpshno189mevhpe4g47ljv1j6988di0lf40u1m74hqwruvtym8cgk8en9gy3ps2hfdxgrd49x628bajxsru06f0w5uhexar8uhl7jv278ojitt7t3zanil9h2vc61an92ln9162qywc0u24pdrf8pla99ccuo4iigl5irgrugydcebcu9xl4hn0vk0j2iwswfhovlivzavja1ysi7qovev5tjdpg59s0xocmp1blnvnf6o2626jmsgd4ki2jlwtel0oqqnmusf1e8uhtckxpv7ba5a1aoag1mpjaakx6uuon4zp3f6w5uvmorgmxyihmq8aethh10d2pjnipuw6xh5c30u2hgddqd5ogxr7xfv8q1mycb36kfumeznk0v26m0d9jkqrq9oimt436fu5m1vw6nrpzqhvpuznsg7s23t4nvq3npfc0a27yn4qil5lry5573y034f9pvgzzprnyn86xfu2gwu9072y5bi4jr73k02mu7dtr2loifprbpgpavo148zj843cc2',
                        applicationCodes: { "foo" : "bar" },
                        expiredAccessToken: 1411488854,
                        expiredRefreshToken: 1884363210,
                        isRevoked: true,
                        isMaster: true,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateClient.id).toStrictEqual('b07ad268-215b-434a-9873-dbec1c5bf907');
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
                            applicationCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a8038049-0f99-4835-acd1-b5a153fb017a'
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
                            applicationCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'b07ad268-215b-434a-9873-dbec1c5bf907'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('b07ad268-215b-434a-9873-dbec1c5bf907');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});