import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IModuleRepository } from '@hades/bplus-it-sappi/module/domain/module.repository';
import { MockModuleRepository } from '@hades/bplus-it-sappi/module/infrastructure/mock/mock-module.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('module', () => 
{
    let app: INestApplication;
    let repository: MockModuleRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
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
            .overrideProvider(IModuleRepository)
            .useClass(MockModuleRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockModuleRepository>module.get<IModuleRepository>(IModuleRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/module - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 'nycvyeeec50tcf3ocm9s5te11e7j5h40mg5pmao80sapw3tsuk',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'kk0ezpu25zgr1ep01n5n',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'zhgwp17xihuauq9awpnwhw37bbepev52sk4ub5ismmvy33u6ure3ge3czuw31oy9c9lp1nuwcimuhw4tm4rumuuiny2luxhhbmplfti8uuci8zzdbf4nnqmd529fnf0nfptfgpn74kmdqgrw8fvnbc19f376v7tf',
                channelComponent: 'x1y3nc4pv9r39l42jeqzv7k47d8z7027joqonoybutgaazdz12f6xwsdmfmw13gajvgc32yk93gkh7gyq3llsse35qled33vuegqpszvlrzw2274y7dvfftb0am0znhi181mkeyxf33pmo7i8g1w2hx9i3jm0zzs',
                channelName: '88xlz089q4efkbgmxockz2jhjwiot74r1cde7ry8lndtk8k6pfskpb16c8g7g8s853k4u687meolphd643at1e7emd41qmlha6s424isteuj28a3gbcwpebwkgwi6sx5nl0jfe88wj6ypkc6mwi2j08a8nk21ar6',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: '3el69bbtynp158x43i8uw2db1yif09qlpow0hysx8hr4gsy5aa60r6dd7izyn2zh8nl4ekzfsunegf6ptucfdxq8l37q8yw2wcxwyovq3o4tegglaxvxkhlsr9cn6ffg1mth6dv8ptiewstuplmmcpa0nay5rx56',
                flowComponent: '2gi8bc8bvwna1549zkg5lf5iq81zgmqt25fxba63zpf0w34py54cn7a8gle1pvu9vlp59s5m7qvlmzgft2t39t9wh70k7s3c96nw7m5n8yjfibn5k7rpo1hcvn1t40e4wjsismgjyidt403uqvxdq0xl57ool6sq',
                flowInterfaceName: 'wvu0igji7jxumhtr5n9it3bcix5xcn6ay191nmufjyp5x6wxmboiiahzpuz22omr9yynnrkz10bn9oxo7zagu9ppryry3zb41cijd2j83jvgc76an8gph284wgyr6skmkugyc4dfy5ok1h8wbdi54om66dilaoe4',
                flowInterfaceNamespace: 'v0sbysw6cyjg3l5b7i69j7tii2pn055w5rmavivfq7aaeyuv5b0yxphfzbkem43kdh3kud5woub0q5sejuvpwjvct98hrhhwxv24zc2mvkdgr99d3begmu7yzp3ct9pa5mrrn195khgj0qf7nnfvbcrka223706o',
                version: '55bzg6iic9s7q87sw1qw',
                parameterGroup: 'z6d8h282bd75v6bswdfunezw4w4sp1k33knayrk4cpy4h0wt3friazgfa1ycqpxit49b6gpd6de6b05209enphbmklelcjp72imz7r5o0680hiswcv5p133nbpmdzhad4zn5dwvki8n6gqyv3iqhltqz4uwnpje9ya830ci8lbt25ktk4jkv21falxkofueine3alsu3gu7nbbwcun34fp0dftdupr1c0w2d3tj6bqpqoe0yeevgj1s2t5cuj0j',
                name: 'hkayjsbycm36pszre5c5aygugeblnlt3jnvojqg0lf67hnjoltd9cezlbb36mh7ztgtr8812a4zfyp1r7pz8d3in7xlxc4brd3k5e1dwo6u8ta00zlywh6msz6hg5nhav0r484pasvuo12sj77oobp2sg0nqee4kezqib5fj4qulv81xcrc4z61gkdwquty3d4q95vl6c0ukwwz82v9efiqhuuo3419ohmfqct5y87bc5iu6fy7cd1xvir0znd9j8wyvj3njwih4pfhasvjr29wdfx4uajznqez8t1pdzw50llnc79llm11fvyv4ww6q',
                parameterName: 'gta0vvrw8bluuz2pn27k1eov1uswrir4ce5wnj01985szj3uopmsgb9gw2j6qdj4ttx8fxsiwcplmy6amb1khdq52x66apg7ez4ixvgi0of7yarr9gdju2bij4qnrvn2788u6w9z7v0kqnsg7gkavb1o5ofedc6f5w3yfuxsyz5srlgx5ixp59c3dy76ddo80mmc7ahil1s4pm6g45252pallbyykp4lf6g9dtx0koh8rb6kp3yrufvasllvxmh2u6mgw0z8ummxrhejpu5ppds741unl4ao2av3c21dlevasqcjtfjz3pdbgmpcslxh',
                parameterValue: 'ykmie98k27g9x84r0sx05cc9juvsxwuwxl3i3d1qq9wxfpb8vkqzyu495dkq5kd8gbr9l7wzjayckmgvmtnkm92n1ngc2pdlhincpx8l1q2kcnbkg94qec1rqomyk46jfm20sly3uo0vem3shobmplpk2qh7h3xiwn8gmcmmmcza87krhte5ait3x5d5k1rycqm1zz70xg8yyyo8f4c3wlz7wgyzqxyt1zqy8h8usdjp8sxborh8vo2dgrj1irz6tbyoeild3b91ccjo2b1r3z3snydj3un2vyked8zb7u2mukss5cezt15bs8qwjfr6qyg3vo0ome1bdbat3q28uf7b2y8xcsrc2wrjrcrw023azcpb26gubjpyebgjwn3d5hyo8of6lpv5mfopc6sv1i8gxnpxxwmqvpd38g304pgrgqavld578zk9wfzpf39f6sjf7sxa4vf5yr6kj8ku1sxc6f9qtqwez5527oz2ciix7bh377c4s3gpuk0zphkblc0clljjs4pgk78o2e8h9rsedkmm2gox4t97qb5z006vjww1bx0xyrrfwhurq90socsehf4lqcjl0qrodjzrhmuindgxkrv00mzsi0kkfgn9na0vgve23cwf21sxbeaxfiksv5bjgncgxs4xcknq2jv5dp4db2z8vzhgzx70f2cup1fw9728u1ltsmwqwqpdr01ghctm60nm4w4zo1ac6hax20fci3ijeqopy3gx0ih7acgbd8ru3v266sjk2h5wi37hcd2urpt0otwmv2ah14lnfv3rkq955qcaetlslbemewvo3bdpf0vc60pitfyt67rblgrc93gjpphi8otory5x30qe58hmy3p5ykt7d4h3ctj9lp60rbgfcxwczfqykfdg8hptuxchwmnrexmeqa1jvg7t45gxaqa1b81ifibq80d6hc102ltmltf31wjocoponbthmgbswcnj84oe5idmxzelwbtq8m1gdh4xshp94qv1nsofw8g2s405pp2o',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 'kwwxfv2rrt1qxuxp29wcbayvgy9y5uci10155zv5cdheghftkr',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: '2bu5reep2vuijpwkoyax',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'u4lyjah5bcdfmhws2noee4pht8gd9i4tc068fteni6qf77xt3c2y6zs6mwewhcdfv8sojp8tp22b2vypha41psjc9drqz838uv6l2oujdc5rnn0rvgh28gr7dcc23dwsmzvdm8po2xbuj1ju1ryqdwuvx2gkd6zt',
                channelComponent: '4yj09irndw7wput2l4lstbilgopntjfnrn80danpptawo541yvn2g5l9zhyzdw19x9neugz6qnpjs0b88tabkozagr4v11zf3ukyvf2fvo384ylflnb5a4fzt02wtrshg364akcmnq3khdyjw6qjwgxdsqgqg7ra',
                channelName: 'vp4yqve16v5047sdksg690f2t2413780jzbrub7igozx9eqfgjkkxlqcc1bmqdozymyrmitjrre6b7d02652wfminx1yb5dy948pdzg532sop7nrfvp8zzzbd7zzrpywpqug7lr5opiurhgo7ca9b74fa1hdohr9',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: 'pfyb8ecem8hea79yzxwh9tmc0sviy3l90roj06hw49jl1awmrnyef6b3y64vlgaunv9dsazvcznwf543uvl21pnct04n96ob97ax64fl4ih8mafih6eavmtwz2nhe7yxbq8focuomril8oo2cocso2sfoxzvtq5s',
                flowComponent: 'ng1iqrkocrmz753mg1p8xtv9ny9qu0r6l54qjbfy3f0ofl87zgn8icoa0lvx6vv6kbnp0wd97nrlqhqwj8r7tafowvc62lr2x3nnggvg24gk5kzs4bwyv2uv651rx290x92qhw0lykk0a0s5gryu8o39hmtrukj7',
                flowInterfaceName: 'ob7buqcmdl8yke3shkoak2hfruegu7325db2jvlpknhewlnbgygfy7dm4vfzcd1vu83766rlbhxqh18qb35k1jwlxyofe3vb11573fsybvr25p3flvkhf79qddbwax44y46yrkzatxqz5njw2xtqn12z3a11dbkb',
                flowInterfaceNamespace: 'nmuiwwx8e3d4ewnaobha9spjt4dn5qmsmtbg3t0btmlqyqa7foe1flyzy0yah0fqzezrzmtuhu163g8ota76923qmucqz9209mqlcolttylas5fv6k60h040mj9yr21y2vrdwckrrv15e1lhzvgl9ycgf3nwismr',
                version: 'st8yspoxpyunhflkbn78',
                parameterGroup: '251vhgkdweualhj5d3ytiv0wt6ripgl9vz86xzhisfj4obwehytsdfqbxev4jahixookdvpu10t2newbbmz03qy85pd08jyc0759rvu1thyjtrgom5jwgg1d0wlnfmhh2v238y0ewqxt6cppmz3k34hwe0oxxticaw5ulfhdlysfnqfsazyl2b6n2imcr6pc33eyez3p295bhh7c8i33gsh6k1a5fi6gvars84r2mdffdqiev50ekwl8fntblzp',
                name: 'hl0cv4emhe5i4fkklis60254hfa8ogb2tj83if707n15dgzfyzbmt5g3ojhtbhhxbw1jjk1oqc0saxp3am8fbh23njqhc7zbsggzimwkma8th99i3z4tf4wazw14fb4uar0tmmntqr8dcs6lwl71iqjb7my100e3q8gnublsa9w8nrab2npjzm5o4x188g88x9trce5mk1d03jbdv8i4fdyaui7rkfur7o4jja16y42gp3euhutfr1zph60t7gqguba0xyp42br60hvxc8ml92cbm56836k23bvmi5ui979rg9gqkcgb6imclxquzf8w',
                parameterName: '49jr6ye916gyy97wnh3ydysp3u2gspnwrfhkw5fgzx8ckn8d8jkcin5od51sbgq1wdoq5d114x21hj90ec9tjdcn1440oquvbhem9ckvz50a0pkbod93qu6l6q2kahh66np51pkh8j7jrgjq505pikv93qv1brq2i9aj4sa4qkz4kr1wevo013sjzu44natl9kmh9f01jy9kpj4xz1fr0ayev09i19h5362duvqlcxe6nejjp5ku3exx1298sduj2vrvlkhy5it9al1fh10b4a6hxi9xx9s8jvxc3v6ugn5if2kp16wh6tfhufb4llv7',
                parameterValue: 'oeccfau3brll79buul5utjn2zjrlu5xhxd4mecf770bsec637yccbws14lm2zjdtdacwl6sfgx05tmmawvduap8ntrqr67mlyqt6zfzvvvb1z0rdis0shzqes1dq1kq5a2s9qcyivfnvmbpjzm1py5jidr188doyfyw0wiegcs24esjmbiqyrifpv3g0wtq3yji6ocid6vh7k1k6l9825spuq9uuvhkjbocskchbqmxv8x1040y8ulk1q2xqzjkqm3ef32prkn75bva8vg2uxe9knz477cgyymusklq0221cohmft7cjdlxo2vvw11cm2cg12i0e44kmcqgakxk6fgnjonc7jc29nwzi84wih3sxiteibvwcyfwme8k1oqgnnnabumsqxxn4pec7pfhj733w5lhgmar3ul8o3bqu69exuthmjwgfrilyprpusi7019xg20wxm1bd5t069wkeh1by80qcoessx2slsyrqjs9x8nqvtxwfb4dr9noefcf8gjki0f2ik5xqilkeeiuf8dticerqxaj91btpz4899ji1b36w09w0skpo8nhr98hqjyq36p6tg6cay03872uarv7w5vpbam2ctqjw2f946pw4ggpxr7cggia9r2ezlt0zcer1osoxpej6t83bhfjgotwpnibyvoyeiz1o55vsska5vbfqclmbjcqor86wh6zwvzu9zlm1ropy8mvvobyh285a39jv3okpfmwlcdd8709fuabr8xow77d26v27zxdemtrgj3lq8hqcorz3icxwsz828i0rltbz431lsviy85eyjhzaczkfp2sri9gjxyo2masggbfrn4t0xnh02noyu7t0tsctznla4perawie5c8f3yafraybmntu1hib99vy99l0hjjhqs6p7k5mq3t4y3kejmn0xchwbkelp34fxdxp2yitogghxqunxsvsqitfsmw7zeu66uuw7jya1gu64jn06c690n33k80toyp7oxiw5mc8ch2rc5b0xa5zsabf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: null,
                tenantCode: 'fruxk9gy2xox5ibh3o1prva4jt7bcs79jj1pmolvjwdl75ozpu',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'vmxvde40i6fwb8fbk0fa',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'aszogepdkwtv3zzdzq22sp6qqtg88v61eilige7shoaviap9c3t7ml41im947h2piuhw72z50x9zsunzhmro5crpx21uao8fd1dawmkpm8y8aubj37hzqesluiwk2dzzgk0f5zw3qt5imgsgd0phtv5zrhd1kr1k',
                channelComponent: 'mraa5bs63mgjlr6be4vkzrs2bzzxp8gis1vdyn8ad191ojrjj9y17m6e2ni8pxrkoyo21vqb2d6oydvkbijvdmook3kivwe8w90iyfak23itkcx3mbhn0xpldxpukfacz48tqnpnjhoevorda7r6dqflxkpxo1dw',
                channelName: 'w5uud12ibe7g2x58rk0trxxlxqpw18g23r6ceemsiewvbs8mccgmq6puhx3jvl8rdex9x9ijtx2srdjofek0zv8u4g5fpt4qlocx7xwfugl6am22y06vg97z0oewq5qqvv6rgt4tmgdq7jtt598hi7b9h4e2uekn',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: '4991v2nwix8f9mpitwyd4zo5xh45wotlzm20w9c4v1ynsq7rnmdba5pi14lkwh2c51kiqein4l6w98nwu547f48g77b94auigf0lfohjael7y92soxshay5z2xo0nulq653j1v3n8mbd2ukqj96zlvspua0m34f0',
                flowComponent: 'trj9hx949svifs88yp235v0uecarl88ln7ipwcgd7zybeyayrbnpg5acno5mrs3bow1cqd4l700bj669sixwoiz8y6sjjp1xchfn819jy75mlx3wwqchzj2vp082id4tr0olhcdqi15u5cm9thhl5gczv9llf6h5',
                flowInterfaceName: 'l8lmjsdmerpv2rxrr3xzwlc0yoh8o9a9rndqpgn2boqwp2glzq7hlmga3cr93ff50lijqgiu882tz9kwdil3c447p062vjaixs0c581mpdtm54f16hyhmebg1ect6q06z94gpinfo9v47h48xuthrh7a3p90uaw3',
                flowInterfaceNamespace: 'l3bu2wc5m4gaul4c18q667g5r70spq6gtls196mexst4tqdi9p5e5980obvs3uhf1nq0cmwtlbv8khmku6zn5kyr1ht9ll7t1ng7fm82tq5pbzw8fj9ngdhb92lyddti37mxv15uxmhis8calgeqk5r97oa74yxi',
                version: '9m6ee0pgjt2ysi7b4btz',
                parameterGroup: 'oyinp6o7pzgy7ij4vgpf7ca61dzvu6ccrtlun1rnbew4c2vxcedg2xbq6ipg2s9bjo9v0ykuhvhg5rcykddilxcl8g85dlk29lnd4uzt3u2v54ikurgxq9cpzj637whxx38ifhmgupek5qi6un0lzgj1fa6rh38u36i7cg45aouq8abqa0782f5vv0o4mgh1i0gkya338ccr90mw272jcj8vyrdha9o4qh7v91ws4p51gigxhkgkyxhr0bt69fz',
                name: 'wyt43j8nx6hxazazxlm4wve6woqj99dbijvz04nt4dw5imf2q7sowpwsf28fxy5o5aw5n6936o0ug2in2yqlrajajwks523q68gd8rq7vwm3nnyo9tq57hxaqzts70tqkkvfqk9k86secx0v8j8deffi1s002mez55eix7qszqw5u2oys4ghajpluz4x31fnz7njylurh8g3v1972hk7ge1w3atqzpv05s9lge3fqbyyexka3c4aet8a6gp59vvfvj4rspmjh6dwc4cxxht63ik5kj0yvfvpj3y2k67j3jvarbigkjqbuqie73dutaji',
                parameterName: 'it379da2afsauwvgwzq85vz03l5nvg4xxz7bz9hwtkwcwtik5ryh2xvkk5e3jj9o4w2sv6jwtpn1r4bcey7jpkz4xewzdh2itutqcm0suoq4gpcqeljnn5rko2nev7zx2l0p23o9yulm1ebsv8luy77pmx4rgahjglrnxr39z0m6c4vrtt5n1cowsdcgeee3f0qvykxzbmhk91d0husyss4wmg5dxpjlotkh0t6j1jngytw7hkynqza6y9bsom8kb0kdf87276qs36j50b7l2skw5tthqrdfwniywwjvp4m665u0p31l9bd9k7ypk5ro',
                parameterValue: '8jb7zwsfd21d7nw5quyjz3fuudv4g8vov7g8d85r1u243vwo1737yaglu86a6o8vhgwussqhvgw5csxx0euw9n9ua500sovw5zhhn016lm62w9epzh7yx4wrxewo57s4ddjfx5rekk9m3ka2l81l23e8u33pazljhq0nyoqygzujrmximngr3aoodtditg50afjoq3lalfapgu1ncc7od0vjmbkpmhosc1vw6gdkx0jwqdjmwedajaua63l8rdzwqfwo68d4q89r802c7qlmbl28wnan05fjf3jnm2lf6tjbqwohd0rcjewwc20tdby1134m89402ptv735stles5f33xeghdjfrw1j9cd95i46uhwqnk6ug26lxtkeptpgv0oxwktu7rlse42ilic6o7ycwic7xewxlnwa91gxr3lbifu11wosaqk2q1it1tiurnjxj22cets97436jkckiokwj8z91zg5v3m440u42gzv5csxdvzgdot2cucsu40ed16bhha5qyx4jj6lxqr44tz8acdon09id5p8p4wpg17bugvvodtfkj7fwei0dz7xs34sjiwq8u30tpbl44n43x51yzfw0bs0ua9qsw3279zv5y2oz1as8wzmfalcltcl7frrve8ugyj1c3ifzrk26oj5qrsiid7ui4dd4rg1tzdca66x5hm1ys2ca8jno8ja5mf6u5kzl4tb1fwp1xemax47odyhyydc8kgsyhdls812iacxk65zwhstbw1f9f3pupx2bygvtyhikznln90cp42fopqyzgdgu1rr651mvc4h1969m6v3i0jeabaybjylzre8duqswomo15z22vonkv160aa9xmyudp6oqddpng3ghbdo8fu4onxosqtyxq5xkt711pg9682thgoyfg8ls7pikhrk59vj1r2iflyc0whqjj1r4qs07i0810hc0rnffaxrckni9qd70bplh74kmrwlq3v7ypm0id22i07vp7jxa84yb57jmtwfvjl3htpwl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                
                tenantCode: '4uqr4q32tlcq2wpfopbfdo4d3rz9bka2mu47dajh2po9ei1r5p',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'mg48a0jgorpb6wavk5zx',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'sd68c9j0z6igixwu3mp9huv410l0y9vsyyx3b6owel9l7cb8tahkc6skeosatmdbbjh7nf0xrtqdtu8vior619duga1wmmklg0qhj2vquq95jn701g1kahr0eeoak2cl32tx6h1dbothj2b04rvf523rrim3634j',
                channelComponent: 'b17hcq5tek3g5morq11e36kzqffas2k5ah8owwkahj2m5olu1qiskvqypzhzy0f0w95jdyzfiaw07m26ox56vybjtxtwuxikz05h32f1p2aqz5l89mk3qmn6rokhpo7ubhkzib9zv1q87leb6vz1854xw4jyl3t5',
                channelName: '1ps9vgon632zefoe6gjqokkzwc4e8yquxeoku6y9a3b552ovqjpnqqinomqyzboyahzjw8j6rr47ojznokdxmumsrwcxdfnyu88wzyzxjs9rx4zgt5wwtia9bbsghupsft0azkp1zfddrj8nepr9xdndsjclkexg',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: '42bk65k74hkwwgwozlhyom32ihwkn04ybxg7y73uolaog05x6fa068sxol5mcszn5nqf5ep544xa3htluv9xpqerzpz0jxp4y9qp07e110rwb48uoe1a38oz2vg1wtb6z1ycvd2qpevd7sthze5y1s7zkict9vja',
                flowComponent: 'rjl3w8ll81084iudj7prbq7vpye6wth15u06v96j52e68adh0eqaixta7ckz3tk432ydavs4n954cbyrmrracauetqtztb4z3pgu0rrxv1wr09pwicv91lt2uz0jiym0rxph0h2s0gbr6zio6m7ugfkpougwqs8u',
                flowInterfaceName: 'r1yhc5ucrakk8q8mwpoqa8onrgfw46bcqjbyf7m1wwqrgo37ewbu0pobk0htesuasuo4chmpxgeszk3u2hrzg5zsypgjyjqgyfpe0bmiy30fshd6twgfu0dk0uttpm89r4of374x264z613n7qh2dmyxw54gwp82',
                flowInterfaceNamespace: 'k6krmw86sh1ow2a0ti35fdfhdxgza92ix9qdhshaptewfhwvog041xp9x89ml40d5gw66pl44ax3iwmjmn0p50d2y6vmd40hibrz48knbl2q9bjsmfhmfdbj1agdk7hmukpqhvjzhsogep3oi83fqq1bs3yeb714',
                version: 'nvxni9w2nn86h8h57lj6',
                parameterGroup: 'd9n7cmrvuqpvcubpu5bne2wi1cyzwcm0ktwfwx8gy25boviop4351bvuoz78emnnedfy5ta7d4owztmq4qulkgkpy76cc2nf3iey8uhba9f450rqr42cjcvoy953rwf9axlsf1lwhdkbqncve0m5px19y5duovyj5ifr6z0y926y86s108g61h5q5e1h4jgexkc73kkpw4ih6bh8z7y36ccvjf1zh9eq78gwiwexlfhanzuoome4c6cjiu3ggnt',
                name: 'xc86j5kn1p6btgk5w35g3fr5hbsg057g3j89qrbm2t3tpteaebnocukq8q1bhm3di3j9o3cm9kzbuk4d2i1hanymjku6elzojsrnb8ezxnse8bqihgpxsdjdhkvxkl7cgloxdavh2w6ocv0hyt9yveqxirdq8mgiynoz69f1dy4gp1tr096tu52id173swmccvwr6ht4w3oq1zhh75ycy9fqf4qmi9xpy661s29127uxwmfg1tcpupz70mqpddoxsaa7wzjpijp4puu1x86g6j3tnph4x8eeveq471c2a9y2xsle3qy31vctbih7xm2i',
                parameterName: 'fpx2cb0kkg43t09le9j4cvcdu1om6eear3k3r6j8qagbbue5feeccnnkj2uoigx99rxm8qfwd6bnb9xzswppgtd94rgnqktxgsr7n85rjxvyvcwe06kvj1knxxkafqndnlfaxw9zncxkahes4t8oly09csaa6xvcsxeup642nb0q97gj0tdy4f6rrw9cf6m9gtdcsynjw54w4lccgz38lk9hzbsyo0q0bcujxcavewed9re7ylpmh73si50mwc5blcsucr0s172lwsi0n4ivhjgsysf7wmlpu82dwmodfsjmivyen2c6mk0m4rjqxb3e',
                parameterValue: '8nzh2hqk923916h53vfrp5vxpzcei5fxsq6s2lk6rgx1jy0bswnj5a2qc8w9bonnkma3j4prf3tuem1frtec6lngovsdk9qh7gsxryz5l7di9bpffuk71h23wvvz8twaiaiajhvv3iobfoxwrpflwz4paclp7x4l2b9dgvbj77n6z09go0yh8vjoq01i9ywotibafgv5xofxpj6vovy774h3famj9mo63mxbrj4nw0yl4te5nw6drrzhssolmzpm1vmtkwxta49tvbcr0f2iepwwkfvi3x3yxpn2mz97ufctx69udyac2q63u72rdki0pckipdhf5optbi8jr4x8hcvm2zkfwqig2jpk4fdhx3awz6cg6oyzcy8n9yt242ilnoryxs4hl02pbughg0esiilniwp13muh9abrpixtftnz4sgnmnxkftneyhnt0oiiyfy0eyhq8ernlgbamwoqvtruokustnmomd8jp9k5wnu1qn5fx6yadibdbde8yc54e15pc12y9ctnny2z06976xczeejigw85g97dkrdmjn3gr2eaygfjget9utdag3lqz7miav2sodsm9jbk112kicle29uoqfugxzr1glv94s88qqm3nuv6nh6lvotsdme2plcklk9imc8ysqg6ba1g5d0hxq2s3oggd8qa9ed17s27q40m3glusihx0ohk643xmtniiy63eh56rtbim8cf9r5ee498ahvvyhuv3m7wmkf1lq2gpqq3iyp8dldm3v1miupnuucwv0ajo55jfvy134jey9ckowyx3gwv31c5zonzh48guuju44lfiuruz0mwmice8rt9aou80kl0udra40a95bcxorxilx8qtd2k9ljay7hq0md66y1vo1bmpb4eebebpqla9hsmxpo64b7qllp5gu4hwkb03hnjpt5xtrdgywpa9ustd1xk6ukp0xh6a6g970eg3yjbfo9d9rh06urq3jd8emwzxugkb3ywiuzsv9fm67728oe3a7rzoip8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: null,
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'xa73tohzal7b3l1fgkxo',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'sd0cil06oq2rvnpfsvgovu0xhjeh9x5ayggbff5kk4jfa16xwfsxnenx5osc2xqwf41fuxphp34i4y6o2w1rwh18bdzuz0ti5461dh9ac1byqlyllkgxk2fvuv0s2j78gn3rfmgfbr42du4dkgpw9ohrkjo1ftab',
                channelComponent: '1ll1txvcm3n8vr3d24olalrd1qa8cq62r544chocya0ytcbs8ny1zmxwlttqhgxdr87rphikxrz2bx2v5wx3thadfvdn6r1qjigqdm8r7hsmdiksaaaspx6hffd4gcgm3qviojthrka01fk7gy7huv1jzfo9m8dk',
                channelName: 'qvzy7qxii7nz6s6p2ijhcu0fkg1q0stjxo8zblvkfcehyx6lwmdmd7kh6v0vspif8uthnevon0ajpxznn8s4pms605mjjlfws1n160ezsr8fhtn9h291hilt5iqgjh2cxo2480vuola1xwocstm7wvn6202tw06p',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: 'baocj09aj5xiogiughzkjsjdg5qd8ji0neldzcdrzzallbdy90ckp2t4c4hh28i1ona2ey0c2n9cro0rey4alqpdp3w62c4j0lp6eyee88vbb6gnsnx1azc80pp7ioom9afzldkly3k82lsxnq66zoctqr6743k1',
                flowComponent: 'rec301508jznif5xk3vgfjtol674xkyw4x1mhpaxgrwbiv18664f0m4b4ashm7oklq11ek6fxqecf4cseojnk2vkxnjtmig51nea8mrhhbv8hoekxoeqctrd09y1jzd7a2qpyfjh3vft1akay1md66ay1t7v9xl3',
                flowInterfaceName: '7pvy3trp3orzaeuenmnlgly5vm3h457cnth57x0dzciykt976q55ob73ff0xasald584ydy4hg74z86u0on7ew7ot6js9g18mxpz0ljgr1l1vl6airnquffqkzq9q0ek37zc64ljlunre6s57ius2onp6u6vdxof',
                flowInterfaceNamespace: '2tj3hsa8vbx37bwye004yisvqxtyeqk205u1d8ovz2rsqpn93yqiiqk1nx0moa6zuz64cshwsgx359oyubcyk3r5q7usj7eo22zuppoa4quzcmihvr3186a09v9oinc2f3k9wkzdgsv1pk681wu1j6jg6ax91q99',
                version: 'pzh5iwrmc5xo355bdor6',
                parameterGroup: 'n19qhmp31t0cn0e5vlirgrukeih90e0ee1yg9ktdj5jh6m2uaq3eostgn2iz06e5sgxowgmthc7i1e332ztttid5itfha57wbmk3iytg01e9iyptbf14qitd1k5cby9xu32314rn9kwg174im221rr4w29g4zrzn8q6kq9dztqje260ni5ksc7pb44n4t7zq2pr67qtrp5bnrddocw63wmr4p9uh3orxyvt2qmykkow7f57894kzyoz6x4e3tpf',
                name: 'f60lp0ho4estqs65pe1224tjid0iaqb78tthe6go7skese3bz8jrokcxfvmkg10m5ntqljxdjhdmxfxuc23s9lxdkckvqax787hgj4fwga10xdoi7iebds2eotbuywbh70dj191l6wgr5v5vbjejkpfj4i0pe22eall7eb39nfbaj2xw46xj0i1wwsne4tm90fg3ztacmvy0c669o6p4wx4jopcyzflpw43qpva9ub89jd314inh85upayqd5osibedvcexxvwrxl5bgo5psq53t6776xe4x6udcel7u4ge4xx9c43ujpd1zki696e4w',
                parameterName: 'd59biaiwwd01atz6f49pynw95ooeyj67inonrbz6iif7ht7arfsa1rehokyeiyoej1tsdveti5lsifk8hrme92ab05nar3525urxpkuzhxa7l8aprap41i429u6pv5tkaaywsdtz708cx0k1s2dn1e3ptrdbbem8sna7tg2pk5atxcxmq9ircu4qzff7zb2hyl10bqdjwfiulkgkuo7jtj6kc6vyahvjsbf98t2xhug3wp72b5pvi6eigjjyzenvnsfnofjsz4iblmum9nu97o0wegy2w6mcpobrypp33qmdwzhl0sqttcg2scydcsru',
                parameterValue: 'zum3nzjuc6q9l9ofd5qnz5qzpk892rbheypu5wz9dq698piaev8rsbb6zkhcpvrrz2tvh7f3wzsp026nsaaahuspeip990lfzthsejyenway8ya6k080fb0rqirmo7pnkuu8bnqh7qykp2siy15fbrxtfotu1my6nl6jl88e9zv4pac7bgboacfuw2ndosv7m2ooieucc6wxb81vdw43hhrd9w8213mzi71ng2jpvvlrgi2dsecohv3fyi3d1bkyo5gscapfgp741z4jfdlstat62q9hfily7exxfrn5x94syh115znw1hpajp7ruj4uia1eqdeag46p7bazflo9pggygqp8z2cx1fmr3p562g8eya1cqxm6sevnhbxi1il8hwm8cvl4b9b27riub04etnecpbv4ijmk8gcvkcqgapeucflx54gx2o61uh0p9ta2b3be1aqtqus2yo6b860y8qgqa2jpoq60exgubfzpienjvwbvh41pun3d0yve92uaio6hk1sowuy8jbugnyjq7pdqk8axtrk5gcqoqrflq7lwsf6hbmwctzz0yujk71b1jqwr9dk0xyioy2t5nwglka37ini9r65gh26y3spjxd2iz17tzrk1ruw4h3hzhm3j86x8qjepyn0oprd0bfvm2p6hxjk2pjqsr1abj8b2b74rb5xrneoulbcapq5ag6gmv267tmlvmacwi7cuzu66tj4upz6h5u2t7cyj9jkuu23jto7gefx6jzmwcsw2k2lxrtt76esapedi0j1a21x8nupgs572fmnrf9byfog5javwknrmwok21oercavfueke5ltdrmo1xnv8sd88w53nlij9nio35qpt8pqezax1eeag8010wghk53lyqf0w49jnm7wz6obcqfb4l14pnr80xzjb3gwlwjwfyba8hhz3m43e34tgxsbmhwohq1sg9gnz44egjntmuw6hrspwki95mp46b6tiktwkfjqndsbibxukzzyh4cqebhl1tbrz9v97',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'afdgm6ixsiefjj0s1ej0',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'v4zk9sz1u6pnx8m0vaqabrakzmz6hbq8j81mot44aw6dethwq5j69cvkip0paxtbz035t3tr0blkcas6t955lcgtemq7rh1bj9q9iapliixbx8uvv4s4b1urwej5657z2odl7yibsz8kzj0o8qgho1jcls8xonbm',
                channelComponent: 'obl3f9lrsbifi4mezdqtt50am4iu3xvd7o0vl6lw41bilv4uai4vvb1voiu7m0ccqrdv2qc324zwovf9i7j4918a3sh01r9vb87my18bt86uw5yvbwatkbdioecwmn32vat6mungkhqlxaje4fdm56bw4j5dd1w3',
                channelName: 'b2p2ocn6ckmt1rw4nwqh6tzg8jnpw8ocycuuxqwytwexqm2goh0wxmoqjkmyjin1t2sd52xngytu22fqrgkd3ltnedz6nc3lg2xqsws4rpty9sl7lg9zql8c89g3o494hvik7mgd64mhcxfmn2pu4ijf8jiblxst',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: '2awj3oh8ktm1dog6z1tpywlkh1ujjgb2hfno69kjeqaz65yhx4sev76hve7eh0fa34bullhy416iv4abzt11an24t4p6uo285i4xp1iw74cav6rbgjh89ko9563pbpa7yyt81vfcvdeorfo6wnn2wv9y2js65god',
                flowComponent: 'edo29cvosogpq1uz00c562m7xzwf35vnzcdqb3j8wa2emli53389ene9pdra5haridf35vfz0ed3gvt9xr11hwuj2l0vvr8vxifo6lua83456mgjbxwtpggt8itakuu24m6xybfl8ufbt14mbkukxtue3vne00ue',
                flowInterfaceName: 'g21qsml8y8sr8cv03ugthkapib13jahpanh1onhvxj6ieid8uw2er2rygl8mrzdmtuez2a9m9uedocltc13el7qfmbf2svzc24ql79j45c21umxp8kglo7xde8a6myx9a6tv47hqlq2gxmj8djvdkhhcgc10e9j2',
                flowInterfaceNamespace: 'sztgday5nlo9raqnav2xz7e0si048w34p1i0f8kpnmis68p6a19t3p15dta86moolxwzss156hi8xwb3spet4nmoec7myl8rwqutg481bauy6lqzw32gazmmakynr7agn05xxy18r9ui0kv1mllvuu5e2h6gnxxu',
                version: 'dj33pxi13o8e1hmzajlo',
                parameterGroup: 'bjudr3jj1nshcn8bpea9txblis231lmu3f08pi5n8q1w6ww4akrfovohktm16m5p07rpzr0deg9tq6qneav20vn1u6kuqubjqlceqx6kyxl4lc7uyf89zw6k8eha0zmxgenruwz6ijm4q1f18f9enkwn61y1evhn0tx2f72vzreeqltm7yy1gtdrnv98ebbvkz2r0eg7v12qn4go3yyzx9zz7dqg2wu8oh5rv7xwawiqi506v3yz5irbqkw66yd',
                name: 'q2en619095dmob9t8qsl8njbkdl6b3pq9svlyesa0hc2tnpdwx1ynjmid2bmb9h697qlca7ytbq8dohmuq5po8s6rp4wq4dltw5hg2gj9t2ktiliiyvs6psueyf96xhvszk30no3fr32inyz4clr5hhnef22uwq0w42jh0zwqji5rqia7mdae5wpo59ol5m7cihorquiee7z1vrk0xkp0lfz9qigkr39e1xjqzmni0otmna3rv7iepdj0wcowm5s4k6r9gzo0ooczgj2hcor9q3xeeadshrbcdb9g4sd0f8bl6logdba9xl2nvds45lu',
                parameterName: 'q88h5mtfwk1wswwo0qtkle0rdsor5gfti3yiz7un91deimr0lzxlzlys3pzbschmr5ha4f4vggqflov6hs4d3kuqllhfqbs5ej9dsakpbqw7x0ooeofieudpr3bwshydlyewx82hncc6k0s371dwde9cq9mtjxnql6vhfgoxs4qjt5fob5dwwq6z7qervu5b4ogt63fzkz5od5l3i38v58w41ybu5xt6jtdczw9cwiroh6z63pub4tqnht8ze71nejfvo57j9r5yqy51abkdil7e19r0b891l0sikihyxoc3fr1dkmhz9851lp2ktxci',
                parameterValue: 'gmlvnz2lcks60tdnmnkfnyvz0d70tiiiolhe2i0vnv1klcp7td344f64eihvwkv3d99x4a4r24254guk5ptipncgrtve7dqgp0adg6gmfu99h4hyp5bkaj3o9vulijueko6jw0i8s38m898cksu088ay268bzovp3sdfsi7eq70vcojrv7jolu6mskt408n7wlez2umeqvm3fip3kfy01pk1ji6o30np81nu5n6mangj9bglxjw6u69oi45wchcgk51quaij2y2jqztet4vt7lyyc69b4xiqjec12nwor2dju1n4zfjeew0s3u52os5o1rasnkuz8lji72v0bybaf25fwav8d9yz26rtt87kgsvx77xkc25jg4xs140zwlk37vt2cfz2dj7k6demo27wb19g2vs1xowekeobdcdirmnt1dfkhq1fy17c2jhdxvpevj8htohxew8i1r11cysypaujqanepux5kh3zk31746otv6fk9p5sev03lid2qth2rgfadmdw59fkbz3rd1sltf3m3yqjaef3ssoobh8azvtpe9t9cqg5kep8bn7g2x63vv2mlqcu56ijig26hnqy4v795qfoyl2z8xr5cd5cl96z6yebmnlbwf9vzym3fyeozftiyiu363900xgfmmqcnfbwdpi9fl58rilqvcrbu8s5qqia79hemy0re2dvoj8x9oj6oy5lmbl2t02h41anhs2nis70nnwv71rdydehhzhqyafwk9fu9hl69pa9bqg44cslz0m4l2h518kqna3qu899jfs0jx8o36tq4jqqibkcjs6kotwthn6b24tvdjbq4glkesqfh8ix1bf0r3qanj34gthz6yhl9lql06sy9bjue7vm296y3xay3xl8uhc23112gv71zp0mev15ibp2eyd7lg4a0bilyo5vmfrr0xncn0jr1vc6u5659vq50tpjkhh5d4ypywct7nlv19a5jdczagyk61t5or08lpiod45l3at08sunpztop5c16zh8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: '0sr55dpw6uf5d41c996n8vg2gwylfm87rxglqi16y4xyjd4yur',
                systemId: null,
                systemName: 'h42jcvm3er8e8ap1i5ke',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: '6ziopulhflsmjfd0q02kk8u47g8ovxhdvsy36t7g4rd31o2d09lwblw7isad2acrmzprvlxksm79xwt8dm0maw0qo4ugntp1q661879rluiz1ksgmu3buagmgeph6e2hgchoa9ubdcwh7630zl75obkh8uy1ly8f',
                channelComponent: 'iks0218u5a1pohcsff9orkhjoqupii2rh0y0auncrcv1qxc1qr51n6r1c0r7fslybio31dlobpm7mkq6evzcgpmls61e2ahq1dh0xgjheisowdwd5drxab7877kegow81r7e11u21y9ucrjev48ds2b4kv3hjvmx',
                channelName: 'lmcwuqnon2h33x5qq4ikyhio03l9u1p2pi6678t23qhs2slzzbvm8om03rpnjjj1ro63cydpckfrobepm26isq5dlkegg5ddz7cqb895g9t9ucoqubvx0fsgedrrz1gdv9mmc5zqttl1h66etr0zj548setq5v7f',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: 'sm0r5v5djgeeo7orcqg6j5d4hhwrl6d8ue6cunp3qjejf8av80xmrog510mvl847uyi7445k9s9i3advuvszly757qzrs66psndq4i6prfdj4zv7p0su5vj3xnx7c2xpgnzfnznjeqbtymfrhwrh5mo8vvwlk5m7',
                flowComponent: 'niyninf84cknfvb124j78x495vjci4w2vwkpzv6pyqazxfpdutgwhwj8rw803wzb95f4jl32b62vu7h8hk31idw8em95goe2qlmcx40h0qjmmla5r2wtrfxy3wsjff6smfdc4nr0p5sk3xxojxrm69trg7lx4s1r',
                flowInterfaceName: 'hfw0rkq2wlaik6p8d77119zkfp8vxkd5mgjywwfjx58m8rjuglwumdduqhxsjyv3x2gw8kfp6fip6i34qipnnh70flhrvtdm7j307nrvetmmzy8whkwkxfroqr3w60m92cnsizut6jn4zxpvdt3qeplofr8nwx14',
                flowInterfaceNamespace: '2frd0px9a8gixftehf97yhhgtlo8k3uzc2z4zuo1klr7sp9lo9w2fzv52sojlnkwm26es2mgm4zoucya73icvkuhvt4asqz6pnmaragtzjkpamw4296b6ja60pc9av99lk9ifijabf04w3mmp0l8y22uffw53qz9',
                version: 'pvofv4z64889vfllzyfb',
                parameterGroup: 'ej320q20e89l5vs6dpelh5bmujj1v8p0dkro05ouearv13ure1bn29dwmtu4uf9e8tgf9muy5g5dkndhtez83s2f06f2niaobd15oigq8gti2qh8lhmu3wc7pbqiykrrdeldbl9i9a941qj302bm9wjzurdm0nnkwigeywjzni7nxd4fjyuxlucmblzpsvbo25wj47bem4ipxqqogb61qxywknwuykwjyvhlgudkudgydklred7h6v21zbp4x1c',
                name: 'eix0hz2z4817oofbnkcl0pyf0efnd8e818q3szm38xtjdsu4vskuxd2fcd5vleqdrc4ahi8failq07di82ps0wzrjaap7k2e63ylatktbg7zzouus2h20peoaoa6uj9e8ob5n278mta9ic3xp3yw8ffjssoq0k1odpagc41n8n0w4uq7fb0xa5qetlu8pfmt78y97elnnccaadvfybjmmtft5hqdqi8jcuqokop68lg49u72cdlmrhqqdbdl6qhyfjprjvwbzc5a46ri4orrpxz0nz3kylg1ux7r2a3til0tumlwuo70wn2tb7eyrbtl',
                parameterName: 'lo56umyyudd7v54ncb9eh838zuvoxg6v7nqncbq9ktcfolz896fa3beu8kzjs0r41r01wso3bk0tskzqq94u0iww2nxdtj2ms8nyeihk07276ma25h5qym87goouw3en2vvzet17j6suwrxwf29z1by86l0dg2atrzsqg67oisiu1cohzq72yug377iwqw451zdi3nazvkmcuf5s8nlf2sk4v6iippybki4kl4guotcbwrurfckveiwz7nyfbi84kmeat3a85c0n9iq38j4td8trlcdk7mtuu52kbxk25m0xpzh6c1je5spohz06qj9j',
                parameterValue: '5pqir4q4bfinj8xvtebohlabeqwnpch4un5iqfculyxd5ges07l40uah1srszbjdqgqy9tqhh1b9qjo4u2qc167njll7c5zk3th4cogffrbbztl4tr42pvjzw0zhd1zurrkwfcrscjle0jb24deczgremjqfgyv71go6jz6v5jglpq2dhyzogfqaxtqzc5q2lw9uqfp0oy84x5rqdkerqk3v5u9enwoiqv0wgzujqv7ri77z8bbqrvlvxlch6mvg9phbofnt3te4zrv00cmdjt2ylqf5cfotcn604qe108a55zrguy739uekkxx6y8prxlmht6i0h3v44h4erj3gii547q5oqcgtccpaduzv1g7z3djew3g54mfmxlvgklaeldx0tbjxadggepz2i3hw5y6iqzfjp389zi47ssp9mea593u0w7fgi6rna2hff1khg6bcsvn7266qh3nk83buljj2hzwg1opc90pb5bp667kv034kus430s4dbww7vof6ufpa7ukk4a936ozc1viga48w6rdelhirqm4fk7ahfyu29pesf637nienfktacdph2x20jchfunmi0jgnpmhy2kraf4niwc2e17ml6nf6zo2g5wjeud7dp2394mbgjsbre1ig834x5b0a7gi1w2023bp88uzo6tqm1xyw7qs1tqqw49rtyg7wpxpdlmdeo4mvm03hshamqivw0n7uhl0p1cmh6pzo8xt93jxoq4wfjsn1md5jimbbpep5xp8678ech29oafbyh3fmh0cgnqb8wygnyholyf56utgpwh7ur7wkia6j2qmsmy7sdxtwp2i0lgdhmzbvvaij5ybmtuxc6i33bup70swzrqg91x3c6tx0bsctpn92s0obxqhz8uervilyon4xlchtantfs1yx3y6dv8kon48ev4c81nhckd5u5n81swjx6d6ft7ducmyhnu8h4tz90dyrz5klt5c1thnb2b9eqycwes94c09v07ezc654m6fuyw5m0qmkhcia',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 'c9bvnjlash79q80s91girte6guqo1msslgh92mfvblmg0lz5o1',
                
                systemName: '2dfdm3l3m9i8q0678o0g',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'ema11xiugaacxqmr96z9tzd4li3f8l4toqnakqp62u9btz4446s5fit8fhwwxn8zsc046vyxfc342i8q2phu8owjy5q6so3e7oxyyfec8gumxw2pe98dna22i9my5hzh2vcelz1n3jlmefn137j2jkcz9b4rz9t7',
                channelComponent: 'm8xuibd984omtwcuqhfpp6t9npnz46ixh1dfywu37mecbmet7mmrycwse7do3el91bapstzohkkrbmsa4bn1vl69z42l1lbbws2kxqv9t5epsfm5kl1bfsepwtba5gfoxmip9c7dg4j11gzdrxgvfe67ihwvp5n9',
                channelName: 'defnl78ym5wemb7qw5hs1g4qp3q4e5e71gq01k8tvi1xm0uyuusqui2qa1in8vv7rezm4e7xcpzgtbptbbcttueyy980y8grixtv955fl46i9z6q8fwnamu2pax1ub5s1shwdzwduupujj6jvrc7ydxgqe3l4g8m',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: '37axjavkeg5wfyluosji4vzaok3vr98mg3jvhvvnx0wfyz707dkk5olehjqc06ek87agp5p27ujrb5w0enz4t399cjnyrxkil1k5j9wb6uhj6110cfncakj3tn3qq3lgn2bfpayte0n9vdqsoj707lmb4zz06k09',
                flowComponent: '6nzux5cbjgn2lrz1s89qhugjsl1235674nojn5c2m0ysfs2nojycodhpltjp1gy8dmvsup9kl3d7s7v21k28hndutv4f4ebij4wilmuxl3hwhljzr5xko84hcd9d2pm8ah6bp8625o7u8issvs3e182oh74dygyc',
                flowInterfaceName: 'e3urpyumx2ei95xain8am3zubscijauvxa3mylm5t3890x5t9skdbvwziw61s47vtxt0n1jozci4l7d55omcsj90n92u9l020sf40lit1rhpv8gt47se5qiwhftvay25u6amdjpa1hzlpob81ojz1mjfzdlbdjgq',
                flowInterfaceNamespace: 'vznc6p3u7g1m6nfpluagg83z7nqd33s65u70h7r47ggki79xrzvh6otfh5b3uz7cp5aili41tlfrm33ifge0a32jsiz5nikxj0ja70amkabrd63mdl9ym8jciriz3bf84l9kpu49mk7l02rrpz50m9g08lmvdhkv',
                version: 'j2znyy7rdgzbc0d6bw5k',
                parameterGroup: 'o0w1gdz5dkjo1f5pu9aed5ho82r1s1zjjpohpkert8gxi92yj1n2yw9fh6mhvvhdaia4035j7vwwqxep1for68qtlvcovbn51wb1fqzfhf01iev2pwgfwj60aiq3p0a71wspu9hf6ouczfrzm7co2eg7xduhzvcs2kp1bwfu8e1uv6oxq17uhr0mi7ovnw6yi05w9srsrgw9rru3iunjqwcqbbrjdpvjzvvec2bdmrh2udm1aq4e4qpvwq6epww',
                name: '3yfpd01nx2m4p5l93ndpg50cbmudv6qfq2k1mwwbue7f23nc712ak85mqca1oo7g1cd7pt50lz7kwk9rib8523hx9c7q47fb1wg7i2o5ay2y81tl97fpief1dl7henv9axt2g2nhpakpl31uossrbgk721kqh6trhfc6mou6lauxd1h99hflcc8c9lghhdceocik4r05bnffxq22iq6vdcmmxcuxl2zwix5kiho0od0p66vqmef8svkm1f2abajck7kyianx3dgnob6acgw3jsr9cxu6kkuxqj4b3auk7ue83cbwasep3oqqltgmquwe',
                parameterName: 'gb63u7hlpt22p12mq5gse41c66oetsidrfys7j2k2wmuvq5velgix04je6dpbc9ooz71w521j2vu1tyw4w5lgx6foosbn1ay1yx2ked6pdgk9rzjjbirppw49f6mkvbkv7y20u49pwjnhlaatmmm72mgbmdt0wwaphdb8wfntw9cr7omqsz9uybzh6lxq7xcjfefti6o95lpst7tbsarh53yvvp7oyenb2cilzl71ycd29sclaec22a6giws5xnsl61up67jnwd11am2mdqhu2o4bdx77hx8het9py1k2893rp30al0fl8ngb6doqrlb',
                parameterValue: '362dlkz5bz2r8abz4ludtnhu6veh1hxovel0525ai2cj3c1mqo904c9oiypu8sjfzr9b2s14m4aun0p6phtn96xc6d82y3oa2v3hsf0jqu7wqa96g78e9kj91osxlnhson7pxitwbph4ayfv2htsawp38tue2r1z7fz805svrtb4tfdcb6ulpatc9cx3shg4zzlobln2n15iogscr0xfzu1m1pkp76c9c1yjqfdc59jb0cazkbt1wla0dawo0us5e3y92xb0wm567kesumd116qosd71e2gi5a2qtgghtegx3lvlxq7ybck2le2771mviqvrs8jfpsept1fin36tfuernlcyb1e1g7yixkq5ltfx3ondev1k75ce4y34g381iul9hllmld823km93fiz3tr67p8dpyvqhzo2pfx48177xsik88lrge6tl8pnonpred465i7i4o4zdcxp3j69fkd14b0dscybs3p6zlr74biwupww32mm828nosyg789rr84nhv13w5m06x346pwpxc9ts7z9emsh7fmlkbo1xex7cgevcy7o00tpt66xhc8qsyeo70vaoa81xm9fad08frmw2fvi9r5novnsaxe4f0xgupzj3q2cxbfbdgj1aegi2p26ukjrggej4iub2wy7nplusp5khwag59jem4uj5mm40haf8skhxxhah2gqmt39599zt87rs014fhxed1q5ey0h9ufgm8cqlojfa6a97uukpkggmta3mddienoks2k4w2fmboh0dhd8jtaziho67jom4fctmcpmzq77h6m38bhv31h6u6g9d54a6fa7vafzu8mhqgdvb85u6cn7q6yowxwkj0wfhchahnqvr7q867ogwinpzufpsvieat06y93m0zx6tzauag1ozjugyz0al2z96ljd1an63qj0xl2urnugia0037h1upizu8wpmfawjarfrcnzzb4cxu9j6im14lx8lg51s7p0glt6n4lloxealkemzk9mw1j044yzwfll',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 'vofh78v959usvfai8h2uygymzg5vuvgfoe7oh0gor1ch7kndkg',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: null,
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'xl200rmupfuigkg9tspqn9rougwsuw2w7hyqkojj8i0onnpz7th554u2hglewv0azyx26vbfpv96gn3smac6n1v87czdo6r9i0lguxyu2q3w3zym4x2ne4rfim9zf2xoi16b0dppava1kaucsahnkesqlmbz2g1q',
                channelComponent: '32wlr8yqhon2ovjdstl72t45feq9dcf9wkej617zc5pf09u81xvi0ds7mjxo6u7w7rvw0hll8ocl2jds6myytgoi1vybcwgbkltx99plxxda01ehngoky1fwm4nbla0vwqabct9idydk4kq4ol6z3087saxnngjw',
                channelName: 'ulmivsqsq8hw41j0cz0kpr8q1pnnvusifgjcrqf490vcedrt2h54clsbx3b4rvomlp36sp7j0wd277ip13h36o6lzeoh5cga7u66hydi6o7gu608prtjxx47f9g0vel4bgohnkc04rwjwuqkgzf0lfu4v4kc6grs',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: '1ra6kxu771853zijmbe8kc0heb49hod8tlp1kfwqegpu7gykdnpbmamsi9womwnj4qjuehdt3klfks9kmcp9f9m5gesmcshguzk1k71ept4j7jypkmf954jnzhc58jhfrznqs6ggohqn9mh28ozz040sg1cm9ozi',
                flowComponent: 'n2ufrtjfcoeb4y6r7g8uxdpn7jcbkiohzgja8ulrrkrvur38iz7axkivkf8jbobmcpdx0b6l6fy8un44oxhejvi2itf8apy4nqd08a9fjq5tsg2a69v5w2rxxeamjt7idhpqlk1akkw3kk3t15sqpb4annajnpch',
                flowInterfaceName: 'u12jhth7aflbt7q23oq2krxfxokj7efgn2whov2v620k4oeiu9nbb03a7vhna0cbahdd7e5rpcw4zigzva8cwe2rof5eb1kri0bnih09p2r66jxlxr5r6lc46cwrjgvb7u4ukeb45fc9bq5k4cenavgei6jcvzui',
                flowInterfaceNamespace: '7zcoxx2n1d792e6u960wn3ydxw5y6mhjodg5hc5gpa8rulvqlxj9mbywlyzasx0jc0la04dzzep03se6gmccoj1c8cgbbl60c86qvlwow5tbttk8nez7bzs88jwipyt3vir86bhjnomwx1pgwqtnwrwgur8dyfmp',
                version: 'n3e4berwi44p1pwi9qp9',
                parameterGroup: 'vc8imvif0zkjwuivssyp02cryxh5tx4gm9u8a674733rsjzm2um7de2jqw5uym557fiiec28m075iax7a1dk6libqc2i8jn7mikwrk7wnmgn5wi5avv4gaom3rsq3y5jlxbwfn11cweuusk77hi71tmve4lvqkqaegfb6sw6x5cmz07kqoubx03mgldkpf7f3wtn3f4mykyoips1oi36u7zox1l592lcgzcw9ffqzx3nqtr26ze53ng58wlx8yy',
                name: '8r1hofznvftuve3yg90qz6fgocdgn2a75hh05es7ziw2y0utqtnnx8hc9duxc4uycgqp2tofxhlgxr6sc0fbnilmn0hjutlmb961husfw3pqw3cmjtqv3z4u270cqy260jwr2rq5aoxloj7zlrh921hbzgeyfwafnh9bmw5sth6oj4uqx8llsu2chsnrejdgsalygkfn0mx0gij5l1x9iz9c5hxs8etk59kr4vw2utro9mylz4iny7lmhlb9klpcx0c9ubhiphxlwf4m77i2d7ru951el6p45jf0p35lq7ziaszfu1l4891qezxmm9l1',
                parameterName: 'o1zk6bhjr931m7i11iudlkae29rdy9hrxii9oz718s3dl7230w7qyc8xt35vn0knigkweeya78rjst0x73pvncf9p9ts2en6bv0qjuoouegu4cf2w7y9nlubjok8ei49xkn13rpcogwgrwmcd0fit94bffby73icysyfg4oslzmedldlk5rtuur2hvpriyhft75vuc6pwjoz0wnwtjdqfnpq3bqah9g7b3h293cra53d5kf6ope52t58w8yt6x8o0u8yeg2rxd2o3je0r8r4rseo48izc26iyy5j5kv11sdspn9yckleobwqmxf7ec2q',
                parameterValue: 'v4fi60m0y5guejkdpsqby0la6qj6vm4iz6j05fikcjzb7hmsgd4nicqs770319hi7md8o7x5mrs4llzlegyv88vn1vk5bxk10rr382qk4u7de82rtdh5ujcfs7q3r5v32zqy2tdz6nbxupmjrwvnegdf7crrh11givyzbonbqyr53sgi1zyn830wje56wjjon7io92jqf05hk7jwulgye94ip6dmf41x3gw4qnzstwwubh1wwbkxncv5cych3w2h8hre8zoi3m11v7387t22jbahbafsg9jdzcb86q6ictt23zxbctvgcjvrat3pclsv2espevo38jd8itwj8cagtomnglcwnu1167jpthk53wd6ybnxezsa3yz9gzjgqfpyd6wxy7ztqcgjye865ghtbu8qp3z4cwgd1kdmvtsa860j6clgqhbex176xvmh6aljrua3ib1sqknpajl8ansn1mjhrjx328rj703y1rjvyltx3ookp1qax9grx36ql2r9jutcdamo2dvap4mk1u3po68xcdt5ghh0ru30j4x0nvadri2iv7pe6zbr7qx9waneysz3gj06ymdrze3l43pn63495itq7bjtesmettwaby65lvjn5pg8ihdx1a76ssrea3ta22stbwslhyje8g4sx5ibe26y68jisw3evb708oeza2sfhu9wfsn1absu2ictbq7eq1avq8nli8shqj3wdkuignc7ra38b60nmd2dt1c1vkbxj4dtku22euarux7atqtumowj6et760gb2dk6bnu6gui6xgconwk5kguvfg6lg47xtw55txjkk69jl7vd6u3ox8be9hxtzcfe1f8e7l5s03z86qi9wll3c17g1r7p5a6ekns08ayu9rs0qwjflcq0wwv0c7vres4apz7fr3cgm9fr0pfq5nehoftzpnqzczbxv5fnyqy1hwumgefwgyekto30mv8agj3ervowejsaf2j734rocivqehon9uwhzd3adb5sqndm2zwiaw0z',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 's6lol1x11319mndwfybecdwwzsmztihrfpjdvrhgnzm1t98egs',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'uf0hhmrsbgn90upkliu00s1ewfnhw2ru3c90x50iuuk3rjvphrj2el87387be3rdntjg16ard4bd3w9fy6trqnhfkfukxkwxlwiebw205e953coxm88eagutc2q3t43va10anmtq5udkhqvvani94ju1grq4r1lq',
                channelComponent: 'b0saacvxshxtq0cxrwr2tv6zqn4rztrw1j5bjkw1gqbgnf760zk82s90lf3kesohl5myofvordj7a6lurbhdcvsm8jpvcv5hvah268fs0si2aocagrx5rxpolbubhpv5q09hg1zmm2yvrebcacj6cb2b0pwkghik',
                channelName: 'wcykyspft47x1fsuh44qc9ptt0as0eo5cd03eb7o5ijk5g6m3fwkb5d0s3lubqib0lbjnjwza37vviqri32l04v0u4wavohinbyy5fqqxolxxr1iqa7m0fnwwssljv5rt5ymszmfm7p1qa4irfhw0ja4yokz1rwl',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: '0hatm02clyshsrt05ag1kfcogvv4ivdiisiimy1rq14dfdcj54nx6cd6ce8753xvykqgfewba53zeoa3esyt9q0eqicjkza24h6octohs5leeyt96iszxw3virhunvde4l6iwxqx1z8mbhjxaopeec2644a2g8qn',
                flowComponent: '5fjyvt2229yljuv8zwv96b7s29u9mro3ucv0jtqukc546r993wno1a0eyu7kbhhbi1ynyiq8xu6kky2isq13dvojmjz4soqn4mb53a3z8jherzabufta3i9pdvllj07xsitnr03a0qxf51rgb3mmnugykvm7i5ar',
                flowInterfaceName: 'ujv4tvyzm12rbtnszzbhnh8cdrubglb268o4qdzlp57tlmoclvt69s3yvdd1xa2bcfxeguad6dycwvyysfjiyso41jxdpmn9b6w6j5siwrbhdm9arxduekuwwxmaadmyi2ouiow4iwzrlw9ddbfmexnqnkjn1thw',
                flowInterfaceNamespace: 'lx9okermdpvoap85kpgnqtzed6yqfnks1kruj4mrdjnbaojvfnln8r0bz4slr4t67as549q4yjou6l3fcgdinq09fwywszc1scfnc5097uyxz0kub2pr7hnm1z5kh6e1k7kjvkzq4k90smp2o4n72sx41w8ew7t2',
                version: 'k0kjkdlr96u6wfmy480c',
                parameterGroup: 'r6ek61sciuys2ha7i0pf9nyibosj5w6wu3o5te8d39it6i2n7mu86tsn1nwxk5gw494brh8nkkw3a4vvjyzv62wimuej8yduu98krt1vh5jpx0f5gsrtkldss0zu7olbf6oppgoprhibs42ab8x6szc7h1xa49yfdw14gjfju1tl31lav3allh9kmwux3pey2itmkdq71fxkn9c9quv7894qqnehrjl0e6i0vkxgk6sozv7x6bs8sisx3iamtcj',
                name: 'owudbj5jdmxxzojo41tww2corscpyzv6yaqfk3sn1rlplbqk1xu5u5gion3e6jtlj65bza6aolg5s41rx7xepmetz7gtxcnaqceidzuscufbqtk5afsmroq0sjiu8ywutgxdrdojefrztp0lhm6gp37vxpcs7wiou0av1mnsiqfw14yvukq8022d9tqlyit9ynlnaev4pzpkkp3ysfhu3f4wlyoj6ntw64fjusou3yu3ioten6jfzl3a6g2a4dysq19p4bmqa8wdml6obz6jd0ds7uvu0kwyto797ynlizee2phxgxwit1ucgxv6cd92',
                parameterName: 'mdjo06707wh38jz9buz46pmvocuq30vv8mimcq1h6230b62s55zhlvvotjynvbx8pk8kkr8iw3dbxgbzto0xp5nkj5fmlfuja2yyh2dlg11e508k8lrr522z77eg9qongf6wsk7rssry5uekdykxnj1telhy7inhfj3cudw05ipp9rgwpzo45dil4lktkcfoukio6bqsxdse8qnkr5dr3elqzymnzxfvwx04eq0epnnsos6678h5fng68u1llh8ssy5ppvfzq4v55tne0dxn01pd6cay8s8jm3k7vve68v3mcywfv6ezvx5u2t0a5rkv',
                parameterValue: '1fnue5jec5yggbzjo0y959t5zym4wq4chc4e62rinn3vlnzr31aud4c8n4h1b1kjzkm120g2wrtsrl3wfxt0er55vuxh44tjs836avun7lo5jrlchxkuki2phjwv057vc8bx8tell674wiez11zm2orq2ipissymyqrfnlpp9lm2l1k46vtf963umkgthwhg8mwquo7zu73ugnr3km47bqw6m4mxupujnz4rwri0blwb54q4tdde7ewbxkquvq20xflmblal9xt45d31il9g7wqou2pziemhlhu9hv0i7vzp0j8mw6f698mpssy70uvdnzby7f3h9fwxgpvzityjlrvcuuz31r21ez06rv7hma9494cfii0t4k6tx4gr4yucokd0wabut0x4kf8sb8ukieujvk0pp8hovhec05e1qv3w41zdtg5vpjiyxq06c1yfzbtquf6r55z2e3514d6eefp68kg1jgh25u5wnwmhgpselug2elsl466ys4fxk6jr5r9yhptfpv18o6jpjicfgrs1o35avw693l2ll34g0wymjaq2qq4a7xkuklubdieefgpnvwq4wxodtshmm992sday063iw5cmdns9tcw9ry7jk79sv0l4pcex6yxsclz404l55x03nl6gtvo7t4pa2zyt5wugvwde12e1frhry7is0ivupaoe9szzahdenk7p5w51rqd8oaqcmpxl89vk9zwascdg36oiwylxgopnpvw7s5aoy16ulrwhphy7g9bgmp992j6z902jjoawa7zi10dnbf107s0ih5yy26c6bd5jjj1brkbge61u33215i4pseaus191kzoctrjh2d0vak74d8zy660jen379o4vqvw051y85gsr8nnls5w5ndk4mbipm6i7bzsvem1p8s6n3ifr06lfc8wfodgles7ylkwilcgvjxuf8ae5luobrnz8j6dreoimfi8ae6gyuifbs6y69nwdl84wglugfa38vbr0g3prcptp4aseq86gggkj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 'zm8hjgwvw2c2abw99wjyawb0aqo0fbo1tlvn5eerwrxq9bbov0',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'gvru06vl2v5ct43h49zb',
                channelId: null,
                channelParty: 'g464t421nj3mmbfx210ds6ekfqs3uz47k94mfa6kqbdrzl6zidq9z6w6nf0xearavmwx4x4uwcq8ju5hsypueixljzgcr6eu8n86l6a0n2qedq9f1krp2f4kgw09959ta5xfjzbdhz2pjg7nwvsbaqnmod4oq6o5',
                channelComponent: '3kbhl6jt4uvplslp1dgxqksuwyctvliltuir41owjonut0j2bh1b3d2n4xha1uqlpwf0fpu05bg09ijjc9d1iq6qhql29g9srcmsyvb18oo9xw8yracccg3nqwmqju4clt3fb5mxmjoppb1p2wb4hp28fhn5edrb',
                channelName: 'en4v2yrq1h4qeyljznb6y9475dj28ekg7ih49z90ajuh2st57ep26n333phvy6749rr5jzxybae1z3ydvo6sq03930umbfvb7rlo989pswf9nskticrbpr9jszk577dct3gvb4low2axm6m05hptd5tzogm2t14g',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: '8t1uoprcvf3dikddysu1u6t9dxailwzxd67amtphrfm981i1vxoldrd4d9ypge9zhpndc8gbrbvd96pf9dc6bvl7vponf2zfpk1xtviym473ovfnjdbzii9df0skbxloa6n4ebxxhr8ukvcywy5nuvr8fiy7wwvf',
                flowComponent: 'y83wcgzn96g88ftt61089h1q2a3fhw31fjg00jqayniweaahz70kohz4fqqnhy4hhczu6cr2hx1opa5f4qxudfbu7gxzk7mz076mdzs9yvnyf9hkomdjjozh29l0izqpwyfw1cnp8v73bggfulup0m6t18gjtytx',
                flowInterfaceName: 'shncj95eg8wba731yk7j3c58pga0pmyj2fedrz19kiq02jziwh91m5syt0y2yvlk92nws2dvtsxceioqpv9pueh28rx96n7zppknjyfxce91u8kh5hh8ppidilangd041uuuh7xg7kwqtbnu92xjknebysfjjxaz',
                flowInterfaceNamespace: '3pwbmbfjqdhgk3htlf82i5z2gs12uyz0kwvj6axyzpddt5nq8u18n1r491iohudomjpnwhv43mmuzafomaf2b6uus0faannvn4dx8aj4fzo3a6l94lg14ha3n162tl55wgk2tvigh9w7haesupwekjs43hinn13y',
                version: 'zpqfrlnvx40e2acdbu69',
                parameterGroup: '43uzmczi2pca8700u15ggb57ogjcwyak7yviro9ht5dnb0t6kp8ikoikxkspex3s6d97k9xx971jru39ox84ti51loucb3bcgfusqqpx7d34vg6objngna31xjsfq8d5beghr1hfsczgfdi81h44ouu75intzo31t63fgn5m667jp7wamgvl90m5jcw5cgge8gk2vhyny3ntjkv5nca1hcxs5iavq63ipxl1if16frgwwlq1x65sw5mit54oypv',
                name: '64sbwdwqqy86tma19k56psjgbig9vhxtr994u17a5a6ytocjnlu968fni36fb8desl99flvxrlrrojtbmlv2awwh3xis3ydd7d2189sw7nf5we26h6ldgbp66upykgqp770o5fzljdu3n3qfwk7zl17v64rgb84mdsjvzvt9h3o9hp4eifrjc2b5frdff4nsln2u283xdfprl45aepnoaamryj7fvgpz9gwl9hweqrcql6xu8mqanhpg6mj1gu1l5n0mj3tdb8gd17kg42ss1rclcfenemh45wal3iuq37poaho41peuofpcpkllr87g',
                parameterName: 'bd06jeo7nhnwt6spn9xzw7htc1l6rfocbf031joritxyyugqr2llb8941lbzqoia8d7ibkcj258bnztveaepgfuynwzrq8dblliaeiw1j1xcur1p3z4s6flfi8nrcphrwy61k0ltgkqg57n8lq4xulcrbpyibnt6esf78pn3uxvdlzh6kyhxm0ng1audfo0nwt0mww3vmhr34lxs4mcdh4ecntfoif3e3vtyitlrigcp9n6ywpnrr7rp6unprlwmpe7cnmlxs0xv4bqgv1ojpaqqoyvkl25c732dm9i1ybktrv8q9qep0p5ybcdsn7jo',
                parameterValue: 'xprizmqbotssckp7ddz1cos63sgshs63a92ajsue13eymwz9bcudqm6d18ob5z8cwga11i00slp145lkbput9kc7wepkgr43akwrrumh6p4w6w6lotzhh5sfkxha9ou58gwf0qxm2u9llrcvi5030xiucoebs4n42n3nxfi84kdhrtiohgxaff7ccslijg1ebcfw5nw99htrjdxjffshvunvb3l6tig7wn9koayrykfwxr9qn4twwv3gniwoh8jl5dlbnr6iyh72cv8svz0eef8kshui9vtq857bh6nfzpyfnazfrislq8xfvlaehvwk840di5w34zydr0uuuyqxwhbje3olq8w9dyl55ab7rd3rbs056tvr4rpefi49316d914s6010hqx73bvenahqoqzplczx7t9v9ggr7lyy00hqwh5x6zimh7hkde0yb2ui711zgzoumigq3m71ajqqjh7tosx74yqs4erf36skgam0ky4joa28kr380oshjvd43ap2mdh5uo1801y01luqptu8am68jf9spys0j4af7t2ucnn4lj9tzyya6s4dpjzszv53u37ajip97q1cxg9ibn2ivc8wayjvfk9bdo9oxf0dtglud7o7irb2aoq4bpqpqy0yrm1bsgs5043on1mctywwg2dje498fy1ye8ahn6ieopi59e7vbam25ltfodrplqylv3s7uorb5b0w79vny9so3phagg1sh290uf4q5g22u4tmpsjghyiqv9q58r86pntqh4p69cgbqgoj1hiraqszy9eqk70bk8julk7cw9s9mycmgawqtphghvk86x0bl1pt3bgq99tk47sto783r2wxlny7j3gr0cq6pu7f02yoip1rnocgdzixoqr5uceoezp7pnsn7las54e5l46gh2r4wlfedzd7v5zzlutovkpqz92g9n4xmd9jeet5bag8lmtb6ag8ndvct6kwcntif5nin0rxqxmu3lpivc941w4l3w3q2p8k7vhkr6kujxon',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: '87xw4foq8o62qegd06emiqw8ktxhzg00ebxi1604tjwszb4fdc',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: '2v4dgwtts2bi6y193jo2',
                
                channelParty: 'u1wk9d7va7c0z2266un3deoggoiplb72tbogojh8f6iin0wi2f85i0xk4t1e79txuz1bea7oidbh2bf5npuupgpghkhbhl0im6x5p0j08udxodkybrzbp7quamok2ipgnwbgbdbfv5146xq4lw2h5dyr6u9p3oxw',
                channelComponent: 'bcuivxtg60kygw9o37wx1u1feriyamjfmh80y7z1f5sb4oy4sjreh1egc94andgmboy59wh7dzjntchwhvrbuim5j6gfxr7xoarxz3rfmjegydw52srmewl6sw8v8lw9p71l548bs1x7rkdcvnk0zrxb373sg1tq',
                channelName: 'j0aq95o4y0ubhmfooxihvjmqqpmobwy8hua25bbnsxbh37neyud7r7zoyzkkli6215sq4rejypctcjcawftxlf3tn345h7ef4lpv2dd3nomh0vkh6v1i7vxtupkckoxgibc0gfdp0im0zot3i8mlrzcodg1tlhe7',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: '0dwda90yi8w7my5asrptyev9k73vrj7tee7p4gy8r48z9u10mkbqobsklb69lh6wjy69gc3fyoqgxh9js7trb6u5vyxqd6dmejn1a7up3jdic4dv9f7ff7f3evsseptnpiufv0glisxioyutvwmoft6wlwjwt09a',
                flowComponent: '6msjmpwg35a3mbgpt8pxzxygvnqsxzyyf3hhwj8xl2g442na754ajz2tybwz1qp5ojfjjc32qtgbozjfzutnn3f22xw95wgpvpjiw5r2opakh3yko4lnviciz9fbc2k42145mbnj13cfweyghsnn2w5la4ylz4vj',
                flowInterfaceName: 'c1eqjj323gyamtrlskoahk4tgjokk4mloig117kb7p8kx4b40sdwqfpt6e8wbuku7ytdwzml5z9t42we3fvgrqqlw0zcsfl843ckmgrmnu8hjvt46nkh2fgoeqbdce28f1uvqym0nvhunrwzo6r9fdo68ione18o',
                flowInterfaceNamespace: 'wuh0ome5h0wc1kky04l1hqfeioi7sx3wujogkbczs3bnwnlm6stjl3v7pnetgchqyf3fuq3exqifvo9fdx7p7p706lizzf2hkqg0jygr5ml5tdap99hcnxj9wjmc9ix6u6nckx8kqug5k0p4kxaa919rb7g9tny2',
                version: 'r37h920pteqosxjb9gja',
                parameterGroup: '9pmazpjdkvdwh3bl534scbouf2bancapvmdigbd4qe571p3ao30cnkpt7t6pqo2mnndxw623hl424ke0x61f5bhn38r4ak80v0bj6rfxs19twgu0r9devjfa7mdd9tfw18763n18v50hr4oljiizhywjt81zixf41d3k4bigq3d9l5pi63b6iya06dgji61x80en0d7otfx5opcr6fp8pi40ssoeefzw1hk50uw7tzugoyv3tgz9dbsjjae3hvm',
                name: 'trwyx5p2yp5chm4034yvetoocypyc99k2vud32xj0oli3xvo40p07fg2g5aoj2hkuvdh4g5jqfp3r4t3q4vc0mz7lk4gi492aqa1f69vq8cbt03p05x663lhdrmtawpt8238ex57w3vpqkpt1bqgkhuc4gdl7n85v7xw69gdx4zfp4gh7spxj5pdaoc1euaxugsyr5ycm9x506jxxc63g7a9jpet9icf3ij1ol5kz1bdwg5ilawo5nahtpas0ktlgmuuolkybkgopc8q394ofzade7ugtpqu8ns0dtx5lbzfyfs8uisp5nlpyteh4r6s',
                parameterName: 'tb0izon8e8yw5zzpsev40hd2h98zck8vriqg9rpjmxg29d37unx4k0665rqgnkagfpyh3ayehz9x97clizkwdboo5l0f58nbtynl2fye5af0brizsks2yxjatpdz0ae6lpls02zi95rid3gnpnc20zhhgv79u63p58uox1i7gfi4f0o55wpzehxhgjr49szqtgpd9czy3puto3c08wqzo5alu9ofhe50v4et4cu8v0u8ivqbk2saa2c50wefzkhebklk7sunaiqs8jmiwe7r0r9joic0l94t4wufxhwj7g3frgu0hvdrcv51y6tv4ujw',
                parameterValue: 'm1uxau6329lu8r5apzchlk8dq8errsykwxygq2aucgcf04x979wg3y6cyh0j3jnoiij73khblypg5zix5xoitn5uzma1sjyajlb8mlj9ygkidwc3nnkeqzb4neao1odjmplr7xoooq37e3bpqsrn0kpsc1j7jit0drywudznlwkeaetjuw6ejyef88ljxq7htwi3hnjcdm6vcxkpkkc04h48dzkt15faqw4bmjc90syxslulpehheszemejh8ryspwaskre8dokamwqnew803tzh9tcaphjxaro3su2k9czkfte49od9op3c4tibuik5htle9uvcdnzczlihpztk45yd6yk8ms0y9b88dxkrvltqcubvcsw3yrk984n1difvv5veqnfzj9tiy0erm2965vv0muhus89e7268w1aiwczh9tw7o8gh1bid5oxq0z882st3hwtzj57j1ivbnu87r26omdfxnhyjsvtx6osbwwj2uue1azocw5gqrflduoi2wt8yn2gn45eagm4u87v7jmdhghn9icgtdpahmxgbfrkk1lat6du7ojz60zg8pj73irr464c8jtpm3q6swaauz0f0oacf7mc8sl2z09q0g5jeiwdxpr99ajeydj1bx83h7jko7bx4bau4qr7s5xpym1c4egkqoq688p7f3cu21g5zdn1alvkpt2v5m9fgpti957oraxsypjbmp90nuln6nd6eluwb3v9uc1ptyzzkyahb7nw6xssxkikmpjz0rhe993x3l2f1jh9xv73srxeu7nde74waz5bn7mjvq6j9br86hgac3kizab92rpy6biwji8jbfjkxah9zplrmwwr5pkt2015zyrlhepwjjn0s4v76mt9v8oz0dby2d39pajup5k039awkztkuld6ohyok3k20qsj18czizkzs7bjp4g4ib50c6nqf59y0pjzpgel2yn3dm7m5nb7pyu8u7hah0pmpgz5xjvvcpvu5al75o4x6z5glsk807cm88a8lwnai',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 'edawmkl6wbjumbeo8ihpymtm5uvsyopx2hps2pwfsuy8an0b1r',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'uyoldu3pjyjixtkv5ka6',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: '0diw38afa0iypgue5lvz0av1uhknxdvd17n5gs55v9ujarvxa0pffl31tqw72acnkizedziybsiwyv1zvka6s7baiensegzbhy7hiar3ua4akfqdph0rbxndccst6gmmflhkqm8f4h1ljuw5ve90mwsfgtrpi3xx',
                channelComponent: null,
                channelName: '0tnem8v842nsf6v4mb4dw4v4wixdqcifxiglodnhklcu53xutcvz11o4vqfvk7h3tt2ti5k144oibyeht88dx7zcyrv44d7jd7sb9a1q1blp0r2j0uj4doamnibp47osxwl885z0vj66ca1urf14tdgjy9fhzxsu',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: '1bvb3h0txp6hydk4bo2q3vebthvvvq0nz0vemizttryvp3he8ezfc8kkrqm2eg9rchr4o8p8kdcnsvx4othmpzd8pw7lh3o4bfvlv2orhipcbdns1blh41zpidtajmbeu7fw8djosquqoordpg4ofw6hasu68tr1',
                flowComponent: 'tu1j4dadj74kvur5sb64zak4ko7gk2prwsrxbls65zgg8mgx0bvqek4ufqbyip9f5h87c8y85x6iims3ufc9zugyp3o09r2fqr391dnjbbnjz2y9zcfl9wzbkxmgcyv8kneg5kkxuhh4e995h4kof8lfk5azkhli',
                flowInterfaceName: '5hyw2hlqr5bsac6hb6bvsolbhpz32x4pp7uh0c2ilmg3rvrr3bk3pn7qu6lrqcwxh9sgbts6i55dos2i93yqw00kka52abq12oxl6sd4n25fjkvq10b8sxsgigei7str93zugs8v5t92dl696so3ey91m6mhr980',
                flowInterfaceNamespace: 'eg83kjcvu3b03ig6rdys69kwk80rx1yy9rk6nmprmadjsahjmeft4jelxqtj5qujj2tbtzx9ybz6o2m3ubb4heo9o93pdcqes9d0gxjrcavp6fhsv7b7gq829eufaq5wsz05gdblko1vavt8udqqtbnfwok82ang',
                version: 'hsaylwrulecslx6fhu97',
                parameterGroup: 'a4a9dxf39bjdpvgsgc4v3hoiu9tdjf7jwejru4kxasm3bs238nzfhau0azdvvylnkgjfdq53ykfk0x3vvwbrbb46a2e0rhspd2e3ddokgwccdqbrk0wcnip4ltrktbf6tztb30upevvs335g4pu38yzd9b4zn3z3tkbs5a2z3h01mwkluu1a8bc9emr9li6hrkgpm91v4by8jimd9eqq0xkzuvqdli4f5hmiguafy1isgjzadfw73qbv9xq1t6p',
                name: 'f9ygc7362kxfr20cmh4hwwer2bpgg47l86qagkxkje174mpenjsesaqnni0sy4cqm2pzjg7i1imwmwide26kxpzcqucwe6p9m21auodhc1o75vv1w56zi8j8xeko99v43nmd3v7f8myubbun6gwsu3hncrqwkd4la6tiujxd9e8b6ebw2u0ov94cjm8xf1rek45gs8xt6gayeprfc85ussfjiu6q5q5srnxntqjqngqma9s1lj8z9fi24er229032ehh45y1gopfwr6wxnfouzqrqbayvy7e90ipcxgr7hfsl8a1fvgoa5ey6wmmahps',
                parameterName: 'i4scovxgqsddp2ttey7mg14job6682alclbwcb5ddjsxmbona5gli6fdqcnx8n4yxbce156d8scmjqj90wnv5prp06aurutm5ruvcam0l6qgb8eqlywqlurnug9ysa6wtfrurr3irfiv3c808iwu03jnkhmsa4w2f1p1cj40jyzaegmp4tcwdlbobhbfhtdfp65tjmg1azb4opn7aobwz6l9qs9nl9s73cn532e6dfj7t0c5axog9qiymx98e8hkutr0bnx5ebc1dwy19bmd70ipd82wxrgja84cqh4oaeqzk1j2enbzwq16dp966xoz',
                parameterValue: '4z45r7juvhpfdjknemxceuuic3euv38oqs68p09cic54iheq0he1hslh9o92nf4w899ihju6g6byy845g2m5qks8g3yyts11lf6qykyp6omnbbexgo9pnmz0gg2l19m1ie95ebdzo4kq25svh54jjej4lw4meckrzdw7emv2uyod6no548i0arge37dolyofqd363w6p1tnwi4i5xdjqtgzskx1srt26eck3epi296zoyfdmgiu4b4lu463w2a8pmyfzfm9jjs5ezzd6mc8e0p5ux60qqqjpclbndzfyqpd5nl9mhn0wboyegjke7wync5wwtrxfdpwkusuai8gifkxhmeplkz8gn3tqoveb5bm3bskhsq8wqeimvoqd7oxnrgevoq4fyn5ou71xykeaj32j3ksocsef08jv9zlqz8tgzv3tct3k00rmux2yy3lopdnortzfe40aemjrpqnj3u8w94a9wrttv3wsyvfuxt0t8w1kztygfo377bgbyhrgrg6d4b6xtjq8p3p9rxj6jourh06ocicpus38rrixdjrd8u11t4wnhlb32mtn0nwtp3zcvmkwjmk87xtt7wg8c99k11qjv7k7j54718hxhq3vq5fvup4vha30qpkziz9gh2ur4lvnfp92qm8a17bgeaaxt0jerx6xwsrlsz7rou2z9ge5k5nkql6skehmo4fd3l4bwrfom6cxsst39211ixgtiis933094rhuk2dblxbgawzs9mhoruy1h2qhj3d3mzb1bmlf9zyx4f6pqew1ur41hnqtlb2y6eiacicvwynczuwt2d9udauishzm6lar8hyufl2b77mhyti9tbf3es3kadbu8o6cr3s5hb28djsmc59pjmhc4htw4j14xd7t0g7vf9z7lsjqd8eu3mmvo1viil30olaniivsgbbg2w75wzlhp99siwa49bd09hrhrooqtk5t10qkw4z7qwney704gq4j8xyj3gdzwt2y40g7cxe567gj3cpmqkoxybao',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 'r1n7tfsyi0u6dfyecyig83vpp1eup45a6b4b3hnnwtqp09dm9y',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'b8gturiqy4nqt6ywy087',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'nooy3ruh6s6doptjlfy5hqcl8w7mp421915ngs3ke26yoe4jxfcrv8uqtm4n3r0xru0b1ku0p6b7jq3g17vmig92hmw7cx6dqbn9txe9y44mjtq9ms58r7cnyqyp1akt2q5y6hthrnd2fbjkt3maboo12ert7sv2',
                
                channelName: 'yilstgaze6mz4dug51it7ld397bw5kdoujj9pvz4fkd59p32n59sxn8i2q4wpkyx47y6rc6efp08y5y16pjwpri1rhm9qa9mqw7szl5ww8envj0w5dareb8rysmxwp8v4srmvc9ay21kqcfo8t2r56zwbm23y2ls',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: 'bg9o3x5kvwzs5ufqox6nrww5sbm9zzd7zfg7y3o05fxrx0mfcwmalcdxyhwlf1qjnczktd180kpeqjy4xwoq0jox8vui4i71t6skigknptkpcusdt9wmzrbi1yihbyx0864beg4chcyx9adq2h54ll0yp086gbrj',
                flowComponent: 'd53h9fm0c4stbqdk5xf53tw66aspny3qt5whydya3bsut41vs6ne77ss0w4m60lq54qymg3fsbd4zme4lcjlg77ztm8k00520faua903zp5kxdnxeqjouem3r3srcsgezbmu4nt8cjul5ph7yc5hkbww7bvs1f45',
                flowInterfaceName: 'ro3jf06g0dh61lrdz3fw2nkh219bk4xbyvv3o3pmf1zv1j25tddeywfryeozkoeuinz6kx000gehszrhwumutukbrrb7soouwxjsvhsuwt5pirv28ruqnw61g6bquz94j3v1co288r7e1sla48cai1745r8yu0l1',
                flowInterfaceNamespace: '9n378gmvtvq5xsgltt8g1mc1frmvach1e3dpphhca4sczzipoe8s12k87hpq1wl03dl3ih06g7wfx88w5fhd44lqo04mlxvl2hjqio7edsts9jizyzv36snfwjpfyre3svelznxn1yftv5y2th7f4i5ws1rjhjme',
                version: 'pyzfw81zzr0bc4ydsg5q',
                parameterGroup: 'erk4o51994ie74j5nzm21hacmsoyd8xsugdlpg1lnjvrxo3mk5li1spq2rsb12c82d1f1ff6ro8kscywo0knm05wqj58ixgm9qfcjwjx7uly1lq39bi5bt2ox735q8tmvqsuvyj0uftz0bzij8y4jd3uibb77hn9kh52e49b7folzpt1t3vly9epb53lqlcaivcedvpmprtrv4co1w3wbkyg29bol7w1hj14b29n18cb4vqoo52efyv1cd2th2g',
                name: '5fban5dh4a6pli0vo18qjvc9fa160rba4j0b7lzwtaivnj2l8s4dqr2p7xs24vi6dzg03hfkqz3ae4cuvtyynegr80bdv42yi898c7ngqkiq362u1z1pce34co088mdspm5ccmydwf8h1ez78mbm0v0wtes9tgtpu4in6mfk9fbd6gtugx329rewidprffn492un4aqnzr6jffj5mg90pqb1qlbyq85f3rmho6mz52aix5yjo81z86p96mjgnequ3q7m0nmctqi3vkkrafri4p8p705rhvq3jy40muzf7yu9j49ru2mtfsfhq0xlwu6i',
                parameterName: 'y4739iib4arzpprnlja0tgbzpe846d8fdnpu6euoaxcfmccp5891legwo5wc0ev1osd2ou7pnsy7p4lwkquwekmn6vshmcfwtqwrzw21ecc9viiz0l79mggdmefsiqpwu4haf2rox2eb2qg79wi78pa4b439dlgsgiwuvz7lm79yjstuzyql1pqky2nx3fb8wahiahc99oi2jnwrdbrjawc06bqq1ayj6hqdtlttorikxufi0ccnh5mq3tnna2czocbpvkrm0hcrmdzretx0tdc4wpf9z879os6fx9ic0dbyjh8r9jg1pak9i5wcebah',
                parameterValue: 'upxxj6qj18ff95a7p9dchkgxdof7q6hqmvtb0558z3craxo8iflcne8od7h40zm2fd0o3qinmn5nxmyqkfmr9n2zh8m2a4rictp3w6svsp2vvparoqfyel7bd7fqblcd2pf4la1j8ijlkr4brp6qlag59bk7hbedivk4x2ao5a4r5a5kpzrmvekf8u1t8y3jaxj41fs62di0kitm7yh62aou3tknj562xdttq9mbm6daza8lkw83rb2ci72gk3y10102ijd16k5ial1cr9uyg9y2byrmlxx2vjftypptxb6sptrnkiwjngfng33gae3i5g9g94pee2c0mfbduzlqq514656rshuf6d2uuzonzu19650h8bahmckmq0bt1101p7gjba6ihxh1a5tma8yof9fqq9et6qdgmbtwsimgxhqp5wwglibcqnipryv20v7mb11vseiof9x7dnwogc3rlu81nnyhwitmjh1nuyrocv701mt06htg7vu6fkxtqf3e8579su0lvofmgp7unjkxrizhbh41lkqev9a4f1fnx6y87jstra5u0837b5grf04fpwgxlgmxeeaxn3zyb0i7eggi6f2ao15zumh1zeeeplxdr9oxboen3kvb2wcadon6nodzb6po25w5t7tt7f50r7lw3h27k419ozvkgzn7asollruom85vtqnfuzw9n2vgaxkixgf7v0qynqupc1bjbte68qtd0d9tpl51dyk36094hx28whh8yzqvaqkadi9oi0360y4uhg3ihs3tpekw5cpcorsqgkwaa57l3ui1vcwpqu2ru4vx4ljogqadzqi59uk4sb05ymss2xze0hjonpsn209sxu9k3tsbsszkj24jwnusfv607bj0ji2spsolg6urin6tl1qjn35v6os65scf8kj11gdq6jpu4icuptos3myo38icd7yjr9a0zv5h0ftzy96buu4coyh4kl6ikiaphxed7mx4xpbgehbxnoqwp68vi3s0seestsm2hmzr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: '85vovajjoouj8xrag7e7ila4xst2qcl20nij88hiqdax8x4owp',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'cwwp61dkjkz0f4g8xez5',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'roml6h1g9sf7i11xsdhs3pf0clfry4s08f8d4133cyizailj72lqp2rd947ssb1dcljbgsqifp8vjugmg6jmy4ussmtfck49vm3qgru3f7ytd63ae9vi75s9jy49zhuwulktppm60o9kbk6bpwko7vw6odxs4van',
                channelComponent: '8vr9eckh4xg9f224vkq5nkpyd0mlmtbeldiyikg4a65n334c4achw9aay068n4sawk6mojem9ibfiy4vjddt21vow8g8iyf4gf2u8gsdly5pahrbfjarqn9182xhi44p70l0vlxfgrfjtsipohdniow72unyl3il',
                channelName: null,
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: '18zuq53eq33lg9mto6og56eb29vcv14gt1o3opbap0fiugqvkkuyflu3qbx826e5g5j7dq17p29c45v9ybneuus475w85ict7vaq9cihj9skdmn1gertsddnnzjl0ydkjmqp59s5tu4mhj645oupt3y3wvsscr4e',
                flowComponent: '43poubcynfh18ku2wuv0znxxqrkhh4bv4e4wpnbyc0808hyj7o43kwknfc08mrykz71fv5ywl28rnusvkjlicn3einbwaw9hiha4dew0pdg005qvb8cxyjh8rh5ipi1rid2pfiy5y27mr42axmy8p0zavioy6fzt',
                flowInterfaceName: 'v3zsem21t2cxy0ksdvxmgfxrfhvyp50gzltqki57ufllxwb9fix3hon8ky9h9qobnz7cwyxqp2cu6y998b3jw68nmsp2c1ojpxy7feh9sxih4z7ultyzrnht2xtqquen1hki74hwq76sxefpy55d5jny9k8v47uc',
                flowInterfaceNamespace: '8ayx1ngq3bs2njybzan5purbtdmszweg4an7jymax2duutiayjcwp6e106hbdcvvn6prakcogbm3u3wt5xgdfncrzbwwy0cbmxlvbr7gxhnvy86leqgxsy45m6cndyekgd85jujqbuwpp91tj7m88rgdhw36gt9w',
                version: 'y3b97371ku19ha6wqe0t',
                parameterGroup: '21haoz7hx8nqc2f9u5annqhsqdt6yig7rtk3qch8ghvdxn7lb5zknu9ms417pszthvk06zrr025b9debh16sjjel1vj91m8iysay8zhddc0s72ler3hz4f3xp61cdi8p4fjz32qel9hvreys9xmrhy36av3kkhninbb0sz05vvhj7yaojmuop7yyshc501r18t3248qg0xtlnyltj96l2exbd7xywo62xdtxqrqhsivlhi4tyyuqss5uumdu5b6',
                name: '9cbh8twbexjl2dn09124bdoo9qfnlycf8hgyz0h4se33dpsb8cvkjmobi98u7htkglw9saldf1zcj4fsw4onwstdszbg8ir91flrhddv6sufky2xn785wxl916foe9hr68nrihzzl60atbxz2un1pym1ky8jdmgkfqvnb119ohigdhtqr0jp4p9aqw0rn488fkked7hscutd94xuq4byybbn5fndhwtkp3s83tysv9cr4n2w47ty8az48h3ae6ha44u12sjam6ci0amcunni41wy5i8k7ysduolk78alrhaw0g7y99kgcljgy2e208ze',
                parameterName: 'nestxddbgec5wllf9ru8u8ojp3l1bvpjbdml2gwi4idg6xz8rz36u156s9jt2bufk3nvbct5osf9xp18m5zouurx62ha5zkshy9ab8crxk1qmhqwshvc46gr76nd5nbxdyf0107ytj05ktebvjmy0367aco1jwyyr34nl0e223cz61w6gmzwygww9n58qo2sg1jqrh5pk44fn8bqv56mnewyba69s22ewtgq6vm1xm0i7u6sgwlambseqtf8c6d0c2ymecm8156acxl8scn6fztheykm6w9hvvd254yq6o87y7ieigk55rfgzykzio4j',
                parameterValue: 'dwtpcspmmgef7w0fhrfjjwx80q18xdxmxyxcir9ibdb8i68ldbs23zprsxwb65ji7g8pyf4xeeowck5l5q6ldgfi38xnnil5vydfu21380d8wp53ozjl4f4ojyrjw8i8pfz4phszqd4hvukkv5u8uqw3lm6odr8fu67wzcf533ohxv8zcmwhcuhwa6rv3ee2j37z0ujue2u39rk4s63fvmfwaifveciht6d6yqysulnsqreggla9ic51cfqhopl2g0rn5fiywmcd1b2nmcxxuicy6js8o6evgy2ki62rtqvq6docwe42tydv26q5l6n70bkqljeb7oo4oxge4psy32lmc5fshmi2p21m2unxm195s5h0vhm6qjeattqkyodadqd5bcmm0l5c4du87a5rdkvxzgcltxiqyr53qzbmpxaybjfew4usdn7no52pvq9tqvthk249zpl3vqiytxw6r36dhiwf33hwxzjyi17gopmlyx2vyfa5uu14uypr5wzwhe7jovgzcirja6oatbl4fp4hhjjexto7qjvyff82las5rzd4csbkle1oo01yihndkemlgpemzwvklgswkjppua8o9ggdxrqutkflthkq86wnofy1oaq3wa7pyta6fibc28eugw2axx3gjzi830tcu76fvumm3cyf4tp4me32zaoxinvjmgl7q88kfk4sdn0k7vpyisqt5locvtk9kasb71dkg8pplj8mv6wm9nltynykc5oxtojpjfihysekv8kafoqtxdtpnwgfk790ei8vt8yqy7oh3xx8oypnzehjoednftlrd6uabjts5yfbanljs2k37ow4s7hg4nlx6k4mos533jdg7bvd127kt2a4tygwpb6xhabzvlcgksg6t805ox4t4xc0qe5x11be1n0x1dygc2jxq89n6lxsn5aekydg8mbcsjy3w9t97tel43z5ummbdzrmcnwl9ymjdpmkkf821mte2rm4cowthe7tfrm9sy004hime1h6l2975oyz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 'b9jpw5b7pttrdti67mkp6m5f3l51hdilht9ym2r0eil9n7ogfr',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: '2l1nj6eh037sc15m58ap',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'bs4pj0nm59f8ykjjqroeq79a2h47fuu2qoxgwxx6blimpxgv6nffesizht63algy60z3nkxmxptkkaauhx0ehwey03qioymb1hfw6avlojubo06mq9s2liuvxu5cbdvtm5ty49yknpwfx2idptuat89q6smnlduj',
                channelComponent: 'a57712ijam4if6sze39m0kl33be7588gp50fil828iaj2ozpsvqkwwgllc1mdh57h0u87f3pbzpe0ogdh1hcv9di0ms5034bd20u60g8sw986svrgbm1h6dk1toylsal4m7zc6h57u8c4vvadqfzr2u5x5g4m3ir',
                
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: 'iuxf5otggwkop09p21saz1wcht986y24iuvk5fct03lxo7ngbx7i3v28a5hc0ll1ycr3gw3qjcst4v5gnw8uyux70jzpjejj88dnvxfzaknxh15kybheb0i0fa0p0raoepm9zsg45bd0vnvvkwja8amb7434exrl',
                flowComponent: 'o1fpnc7rm005j5h5ba949ygewh4k5q37k9rv6wf67oto6olxctv45i92hh95vwh7ih5sxkh2am46ubyrdc57vpdgvizds6pftyq3862gq6m0a7uqa1p7ntq5sj4rguzyxkzm3mixkp42fx86g42ll7t76wy5iohc',
                flowInterfaceName: 'dcwq7qx4qul81cmibgb9o3fvbvje1ltouw3pscc45c3iby2phwkau5ljr5ff5xgv92wg96gm7nidxx8ov1kbq7oe1b3wzd0vocliw21sw5hystcghn4uoitp01c9vzp6byr59jr3sonqy0hu9ydx30ayv18hwcjd',
                flowInterfaceNamespace: '4nv8ovf2b8q7zmdwmwx1hdarpd20o7xinf3p79lmuowc2prwmuavmw8jjcxhh5bycvjlbmko54km6vpucx251adrkfyt6owmlguworuzbkjdxmmvcp0glwzmxd5crem2v22vo160q1ma8kftl9zi9el6ymg5f8wv',
                version: 'krpns85mynt475d927mm',
                parameterGroup: 'tb4v5dzlshvuio1xgropm0no40rkbjujhlil2ues99nm6eujp4t6t013yheafxyudfj2q4dmb3wdk8q9tjkrd03zc2107qqbbqda3b64lqzcreanqhsakvvnaqmzoj9t9schznymvqg1q7d1mcx6rhr7g2p8w62xbjf5kycf84k27midoq6cwe5x4qnv2wqgw6yhaf23enbzipc5sylh0slfqgv2o7flia2w2p8mrpwohnmdjz3y13i4ugpazp2',
                name: 'jvzxgadmlb5mwqxk28g5xtw51mcmfyd3q7vkmmwh9y1s08p7m73rpyco04kd5hbifgn0uj05v7lmv7xdvlfxeur49gnykd5vgz2lgsr9zsqysbgvrebcxyvvq3gjk7tdo40fm7nle6xv721tgeh2hfjm44der8s4rjo8xzh0icp1y5p7ek85qz6j7f7g2w5iwodr3guup0ks89wpmqfnhomfnadnaoxxc3evu8emvod0y03nwz8r3hs8d34sir6k70srkvg7qj7576p6lfke3sr9wrbg8q53arosj79rvps53emh1sj1yheedpj6he4h',
                parameterName: 't28n45hjs76qemc4hju0dk464w7jltup1xk00fe8mzykrahr251eb96l9fewhbb1rhp1nu3hywsv5gay0wz9ofvg33w9la821n7rndk9tsqn4nur84410dn7uv6ieolm4k5ub0solmoucsgdf3bpostwjnors14jd48nq111fhsabc1iyj2yx39nyr37sphle1zdu561vqeuhx6oyxlf3qpvm295bcnm2lnhtu5om85eqqsxlg0ia9x2wwwdjj690cxwl73l3j8f2z2or2ix1jhpploia0wyurknppz8jk1wij1xgkbe9qeq5x5lvzw0',
                parameterValue: 'd4wwph3j3yiutin6ypskdvsiluj8vjizcg40k8zuzlfyfqmm0a7cllvdmdpvsv5slv5wgrt7z2sbmlmbvwi4qlpvh4nqz6rkavxx0jtg7t8kgk39pf1l2jojtlmlait8baze7lqv9umqzgewy1b2q5idfsx1cgyy9gn0er0574rr0a13o000kb6afynul4z6ze2rivmm5xpplfj4l8g0k5tx4i2pq7x6w8a90bua9mrswc2jblys65wq3hy1p1jv62ibvy4psr4ywthhbgqm6qe81e9ojrp84fb7oy7favkxteywsehd4zdoto1i0u102avh4884cqs38upijte3njma6k82dg1lzpcvux09evsue8j14i2cem05cn162wpj65oomnksnnqo5kzhklnkcqlpkyq9spoiew0b90e5jevwyas8hbcxqc9r327w6qjxiz94wufcofmelelyowif6ljcazmckx1kvrhx8vfcjgmepg9kaqy3gb6o8bsewq75upoyhvjud5xxbq21q15a9e7nvwvu0aflvt7sip753m5q05gs1204r1tk7bmxj3ag1an3m7lac2437tj6khsq7vxqgku7zb7prx2176maocikv2z1oc5bvjlpmqmoa5uz0kar6ro7vtf4qjmglsua6htmbywi9w6mtf85d7wput9cy3j96f2ulruhpzro0hywu3npmthfzfrtqc6jjtr5iyr1udkzsexfv79xpvrogecpkx94xgsdg6fk92o7s2rjlxxy2etjcntlye9hud79zej2uk2tfnhamo1o4du9oo2e6ruudeycpowbrimwhr5e0i7fpp0mv2tvq93n39x87bka301wpkmhlvexfiyta8yfb6nkguwuchu3zhlvnehvgay9xd7tc3l0ofjhtwz3k1x6nin9zgsvdfy4y9dlcz4z2qltg1rt0qfdqpljvxpjtn6ij3yssnxsyb2k7pbt39llflsjqxz5qwvii3aztjz2y8s95f0lcc5uoxbgwswq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 'gsgb40ni63n0bop4o34r0iu0hsg244q04yig0mzqm91rgnj8rk',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'uou01k5g5zmkugtqe9ul',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'u4wmmv4avckbu9f7vmvxkwczvb7khf0fpkeqdihhmbezcmplz0uhxvthk6rex14niezri7fet1fgwne7gmb4q3lex766g501co6puuteiq7qryn6tqsb0dbkeru9sjazwbpt3dq6t70zx5p2p5apw0xlpszt8pyy',
                channelComponent: 'pjxa0t03i11ofmfh7jvzca2y4r63hkrywprc97hfiiy7r7343007ymzgohku0gb4ksaivawwc2pejtmbrosaopi8oywdh8mbz87t3ozik8dfaochk0j8re6q2rlu4l7kq11qnbntp1q8dgb2glhk08ray7lu59j9',
                channelName: '93ub6dz4c52z0il4glsy8wfee1fy09l8llszifbwy1pl1k6wy2n7r9fikdfzmdobtvcncbyc4c5egna5ash5yj0ixkz8j1vaxx0emyvv5j96x3ol3v3zi2ty3chisw9vhytej78kn2henbf5cfphzohd3r5akg3u',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: '5lc9lloodqf5cklnyr5pk7rmhtrzwr93s7p4stcxpjx7h2k4hjlhq7fz02s92pif2bux7luewa1ytwptgnepi2tsvuvgrwz4i65jppv1rrmguu6eapyzpgdbq44911vwoxxwwivrtqyqmhlsnfp5fljomy8xaph9',
                flowComponent: null,
                flowInterfaceName: 'r14u0h0l2450dun7szkf12vw9yag3rgvzgzcsepfjad0bujn079xuily6jmqh7wkbe26u8o279zdspthpf1hy9u7ee1j04c9toxyol6t0c95akbonqk8ympwksc0v7y676ekrogv3v69b0wzyt1ayudufxhz0j23',
                flowInterfaceNamespace: 'v3go8ereikjcmjabe0cmbaovxiwutgi221ks2hybjc0sj3qlexz1xldg75q70v00m9q2w52akx6ur49atyp2547773tic883xrijnv49b5sula4jxk0tzy30hcszpddedlblu6ygxovtlgwhm0ha7duj1lcsnqqn',
                version: 'abxmgz3ery9s2lqowzx5',
                parameterGroup: 'rjeezrvvbiha6zqd55hfev7pkbrlxil4nfnvz4l9vfn8mkw8l2njns4lqn1adlpqzjneojyocnmtm1ju7nbyl18etxpd4ieig40pr07sk7ojbndss8m6gfpur1fad6wyq2104xy4xbitt4z6rl0wckjfoj4co2m1rgrpl5g329w10c0oo1qvk2z549ijxhbat2cjyjmlllws1vxbcljj0aeq9qe1p3w1aeoyiq3v0ybnf6mo86x65nk3rnu3srt',
                name: 'eea53z3rqnt7evsnp5y4o5nacseiukoii0cmdvz92d5j12aox8pfkznc63dqr74ccei4v3f4cvn5iuvuc3ef69mzik95tnxubr5gd010vu7wo2v6zmyqrvh3hzj83r59j2alv1jdp3kdu2wcgctn5s613lq3nqpc6pxybmubb6xmxkdwc2tq1phcae1a5ycycajb5x1plwdr63pdkoowtvsdsqzi9n7mnwv9c5x2l1742x08g06if51zqmg7a07p5x03lhl00dh4jh8w9j13s8dgyb5vl5aqrwm9ki15heko0ydpa47dtn5qh1dqxl8o',
                parameterName: 'h7l45gor4gave4o8eyxar4zckx1c518mtqsn60od1lc5f2c5vwefbvyr8yuqvxteq29wm1gl74suii8rbudyjkc394hzcu7mao7fcjxessd6prfbu73m6pi63ba1ae1pfqn5o8bydewvvtlkjfnbtopn2g1u5lrtwdcpyk8vrn36ec1ww011wbctjdjk9zl9cfrhnhjtejbmd5viaoxvh5tgj9kb7njs6tt89eg9txvenyy4jurdx38viqkpvz05g9pfoj7rbkq0d485x2rbsuyt26j3ezhqov4rgm9xfd41g8debb3jf18vnt10yhxk',
                parameterValue: 'zia3zdmiky3csaqkthhzrvvrev52pwzrlflri6bylqmh03bjz1a38xjmeegjfkzia4ujmd5isegd9otiez7o1790ygloc2b9jrwdxwd77w8gfy8b2n7c166j64u7kjl0x6hnrzom7si1za55bu9srb46mgds62nn01mnbxc3y9qgvglkcznj4idagl4k0fdcergnavigo34jilfxleualyo5o34f75s55ygbi60r5tm0i4xwnbl0u9gx8hn4clyphir7ejwxfno6j8zidczxe63c0nal39b91cuysj1mzgcsh1et5eg2otrjt9neppv3swkl5im58b1wsbxt45t4hokf05mlcdcdes4ojnlx1l7f8jp02xlba2lk6kmaavmxry06g2fers3jhp5ig13zod5nr9pt18ajemu77pmamwt810cnbqjj7mj3fzryfs7j7wgmevsyrxjnqsg4rm3l4orz99dpxjtc7wej4vc4xxb2ub1jt4oninioq4bfb82eao7ekhxp1mwh3i9rimj673nv3r32g7ltbumly0gw57kmkq3vx3yev6eczh6qyhljlapagut122lhqudgjbra3xsxw60aggaapnritmwp4keesawa2cbczssqwnxuhwkkfoifgsel9zgspqb8q0v719pvwtylct9q0ie4h7k05kh3tv5k07zj0krsuyljzen00ibm9p39zqefhj5goboxwf50lxrudqkjvoz4quv4a9vi8fchh4e8xh66r8v28tb7bgwrlejut955i9xpf6esb3gxj212sqhyndph9pbva2pzs3gjlxj6emgbzjmrmbk2siazwxjgy0a6prkh2wbzwwtsft3hyknyfv87zmqpjhapap9ybf9hl671lubm6o2bmpj15fjvnob15qw7xed2fdty72z52tc7s05szmt48nul0n8s0i0zz8uthczlkc1gn051jw2nmyips1o0amrir9rw0k419imxl6sixozlf6ygmg4is0sb23veadtjjybt',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: '6a1i4l7prvx4tarlqi7moagj2pplb40oc9g2uvurhpcaht33pf',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'dqszawlakgs9zs2lg48h',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: '92x4ouhevlriczisvsje06d7u7k7kwqtcrc8tx0xstcha8t4ktzt8o38cgxpemfd5tkxe85ucsbc6g8g6h6jo00i1hnxtyqm73cibxh910hfxsl65p8mpac0mw4694zxwbrtnrd4g5d1z7y13zignokn9ak539hy',
                channelComponent: 'q0xytowdfylqk6h0gunv0x23x3ty1k9yic94k35wassw3nak98xha3z49xfe6wjwflwa8m9juizi0df4t5ctij8exdf7q9rc5vuyacrepr0j4iwep872yy9akxx8alv62vfep09cpjmdt82rbevdy09nxoh3bzqu',
                channelName: 'd8fdxhxwd0b8sis7r6bqizm9rdyp2tg6e7dkqfp9c5ke8dziid5ey7bp730ggdx67z1aqt12jh4lp0sujp9rntb2jyonmo54m1hs4hfg0d7chj18z3jl63f95qv0hlg9ky6xwnin3k1y78ezz87yh1hxpy9s7qid',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: 'nmh34u5ms75nqg5n0cfot19um0ocn3fir2wycdefpor10fxueczxj7q7lm9jbo7ad8fueslpdn0oprhc1cbrb7fzavmz9f6p5r8xult3qy1sb0b03e92ec94u5nidaku2ewqo9dku1ors077vugpa1c7kyvjvz5r',
                
                flowInterfaceName: 'q9ifqmzhcekgax3h73fzcgqftbqx98a10hijvqefz4ua1ywp4umhimppq1nyb6u59dim9o0zul7cwaz8fhfso8i67oh1dbpa95qku89rks1o4y5jwf4l0jhp2cmcppphb47g0fwaustq80ln99ksf7cxmr6fwnq3',
                flowInterfaceNamespace: 'p8rbav7hi95qnciap5ewg5gkhpr0abbtaui2rdzo9fvqhuc4imvsn10zzheb1m720nzciqklyy7cirrz1invhmmf3c4btk9nbey2cfrjx7s6cgy1vrdonv0hooztkl3aa02ia8pq2xxqbugw1167dkoi2fvl3zk8',
                version: 'k2mlu1a9jp0vzwrvbrw4',
                parameterGroup: 'zgmxgdmsq54kx54kimvp5ktiazcng0n14kn0pqf587ar5st8hjyyaa4v1zgxa1liuc48q3kq91ye418hhwspmzgsnazrsmxyhlf1jm8vruufgssw06bwmn3p2zl4aqb0bmxwnfefy0g1uu5twr4lbkk11gzuej4awilp507hq8k1r4xmytjdwhcqo7tdd43zosh98y96g2wupdfeixendos1kv4xaibfk0wh0f5itftxyg5wvif9ra0ksn6ilvn',
                name: '3ywswdm9vn0d6bmta09zhkoj6uzklywbstgom3irz9fcnz8t1vyb0242hej94gdaq7gvgmvkgap9fdv15c62083sa6hzazzssutx1fx7y2yc3bz67p80uqexpyamj50xgeo8907ddovkvrowuw003raouhapgj7nydmaf76iugqqvps8f6o0yqblp3vybw89kk80jc1bwiy6bby4hmg91dh5t8e5py1plu8z5a81u3az8fua3cby59tvtfg5ly9strf6u4gci0y9idxzsatvweg0rjvmk7zjalyaxzlbvm81mv05zsrb73e5h64d2kwq',
                parameterName: 'ancxcqs47w1wynxk4u6pm4yuoxv8kjxrpwtojbfqiqb4x0u35aeaanvxbrut2q7qtkl3n1wfnqn4frbvjk4hd02t0v2us3fzo7sdbegp3fi34rb9t7seae7li51lqjzctwap6qba03jgbpq5dqsiojoi405g2b2fai3daft4yvo9dwpxxjths208lsp1lnf2vm6cvbcqz09ts8a7z3a2wu84txxspkgec8ap6wm0tjo7lhddpeohi146ob20rdllmbnl9f5uxigdjyikydw235ufg5simeixt3x1bchdzh53d67dy48hlcplorb5nu1f',
                parameterValue: 'm6z7s1yhqbrwk80m0zv9myit4ozao805wd1pgtzacy5zz5ugfmy4jh58mwckaxtanpgrofdqezertyjqih50b501opix28tivm7iw61pf3d9hj98j0nhhk75q7u12ip7l8s1ybybc9wsfrz9hln9cnxf2hlb9feg4aozll0y9sie3m12iln5u35fqzt3849a6qhbxplny3er8uk4miusb0qdpxvraloqusf68kjirjda3w5z8vflfz92k5icpsymvemlyl9epwkot8fgsq9123phmswnixmes0yemxun21id075okydz5giftzojipd1bhtgtlthi53vy5k3w1ymj33nvkx03r15j70n2frlmmv15xsebwl2x1yit6b9t5vaa69tljhi94dnihk85i06jyltlyxt87lnmzt912znqdlycovvwine8mgd6oxrkpewhcmkrk8wr3t39w6yu7ys12nwyprj0dmitizhb88x0nm1amvh7fykub9n9usxy23ktqz6dejd50hs6r89jvykorjr28bigqnf8qjxi1ehutk1xv24gpptu93wh3bvzpb2bopwaszcsrmf3t3m9esfugdm66b2bbfpwdigt5ug3kk0w93yuw88kmgdxtz2e8t8ftppa078thjdnbvog23hmhezjvytr1poghla9mxgc30x92q18kregnvs8ldnwvr8uoctnnffvvop5mt0hv5u3xubkjq9k2gufvgrv087gy174ab2kp926jp319kxj3jf2lyqcpmaofmxlh9h7efs0v5kfap83l0uytfjqkk1h1tzk9qpf8twxj1z5m4y8lvv0vcmi5dzvadoyelsiuydjvy85a7mahyb23ltsg07vtga0rdhe6my4qdsbzhcl7xe1zpybj5620e3db8jbemqod63zt0uuzrtg8cqbtjqjurmq0bz9bxr8434yzz4eijs58mkhub8fvfact3ekf7pa0k2wrw7n7wr3ikb6kpl9gu7geu2z5c5cmmziuhpqom8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 'kccwfq6tdnuyocqwe1fxrvy8bfsuevgla6t1on6ox0wjch57vt',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 't430bb78sati79qmg3d0',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'spntye5nv0aumx00o1chs1nj8qqcfaxvqhurhal2eqi9btju0yaor9jjlr4nt5mtqvrpmwquaj1ypwlqbjr1sj4lvwtm4h08cmzb8q6sdt6dk14ygjo66xa4xjd0dxxa9hrih19xhp2kedik409y3phnmhrzhtvx',
                channelComponent: 'y1lom2vuwzrdrmjkqy0zlelmyrwpsn5hsj8a4faf8uspg9zsjmsrgcf2j6g0kg43w2g9kws3ns3jext7bkxdgjlv2tff7yaknu7sa6j6zwlog6fsw5n6f6fr1dtnobo6b3rm482xb5zocayto9466jgyrov4b3er',
                channelName: 'jg38zw5xx3q6dgf0l76tppktwj7lbgzs4efsxy5qeuiiqmajvurwo163ewqkp0e7cs5wowgeq6ztkl291odv988361wn8io5pzfqy2ugzzon8y7gu6st4cj2jg4giw2dygnyhdo363obuqejmx6tvm1avdqwjt9x',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: 'zpzynnzs3c90qycfcejo10gughzptb72nnbjxt04v9frq0r718ybzxmgnqfispyqjmez8y8a6xr07c5kmehkc72iu0t2jaflnmcbyuzzyu3tkcbi5iyldvn4hsg0l122hg1xev4ez9iieosy91vc15e0vo61n31c',
                flowComponent: 'r4kbs5940itz6j2tnmq2rapezqy3demmmesj52njw8j4f16vrjkr8d5s7yvjfwjmf3raew0azm5vald9kh8fw51qjfo511yydz2hly2hnijwfrlk7igzhxpspvbu216xi6s3jw7irdkfkyzqho57xymf2vbhq4an',
                flowInterfaceName: null,
                flowInterfaceNamespace: '49is755958kqovbrrzqt7waps5gusem1ax165gzzdtsx6yiwgo9l7uu7u1f7w9m2incvm8r2jr1kidslzr4azqxlq1q351jete7lhpkdzx1ccat8tz7enpnmfvqazl2rqlveblr006frhj5je195c5zu4ku02n4e',
                version: 'bdhgv0689i98ug2h1h6l',
                parameterGroup: '330oebzm9q6ju2znrcvw1416imogt6njy8bimhlgawzvu8iahutdy25fstonjfxmhzgi87vaw8d00qfmdefa8aplsva2a93g7xs7vbwtc46aazfv8mkhg7r3oy5brcsvo4yrtrcj4570n777yhtb0bx6ilhtove2z9epn9ug98rao357kt6mehmbach3y5hllygxh5c3p6i8sxabjh4vithdeq16reek19lqxhhi3edeic6dae2crlp1zc554g9',
                name: '8a9lo1h02m4qne3w2lslgp9qfi9w0voe3hmtttyoh20jcwoircnj65gvsfzjz7fx8zmxajc8huuilsc1r9b3s6r58f86vlskxh7c0gkckpm23gsjjyhr4e6dbqdt2yqq1pmu9n2em5mnowomf8u2fqvd4zod29mngazysn2modwh092jmkbve7lowsac0q7ejjezete3c3sa0fx5ep1pd2itqrbv8rtgi478uojc37uq671oo2p2qynm5s3545s8q7i5wfilk2nivdlvoa4o2rwjz487wxiih9ebq1iaxyefi6lsp4aymbmkdpjvyzsc',
                parameterName: 'gnm2mqbkmluwesz0pxiqlekasx883aut6q9p623t1du8r8o47ujoyt8ujwokcxrsotnb89w2pntcmgcl09btjfdvafo5qaje64pi3mb276vtmh8pzkcu9gue8p2dldaidc10g2wqat647ix43f3jsmw3l7gw78aq0pr6i2qsznx90lmlu2k9461wzsku7f2b6w2uqfk8frl77k65uz5qi31ki4cxq5jakt4en82rad8ejn97s716sdl4p777bmvbtaah6kfiedglagavuj036qik9ze1el44rz2tqz2xlkifurm8lfuyt9dxrnul97iw',
                parameterValue: '3ug0e4sk74zrnpo5dxb2gbvqplcgs1zhviu1xr8g58o9d4vqi25bno4mgdjau1rozdtql0wnb41f7ofv4w6fdqwma17et75r1bdg1er8kuod4d2r2y2hnxuyamgte722vrc2banx793n8meh5e2fm6tma23uk7kzayygqeqsizs5edb9897ujyu3vtiwzoiv6gfg8fishj6gymwb00gh3jlzf9rf62loqx7ehchsx4l7ooiohc3u81ik1t2nn300xp6ibupuc69vds1wj2wm36njz0q2zgfphy6y2evm6449t5uurqc79wuomy0zlck0flsx1yhvgrwliw2luzev6f5atdkaugr1h7qi3ja3x4yqw2llui2tpqr8uhalp9ceopsfxfdkhhw0gutavq415ww9fzteimla2yj7mtxxz8ah79898o0m075ugph7rcks20toct1wvlsokkl54og1qi0wbtnvs7sjgteqscg83bl82h89bbrewoq58keyrkwmlx4whbtsv0ysxkgo27uqnx6uez90v3an7n5xwoit2xtk8eg64bpwvck0guwfuw7xd5dvchamn654mnl3x7lzceys1exvp44etaavbtpzs4i888s1gyq463eksqmdc9xggzgmg3fiqeq6acg5z0pr46plvdz7ng5qh3zox2irmcvnexg17dwaluj1a9zx9acid6uz5a5kokixxrmg53oxloztejnzn4dx41e7ztnyevgeu1dcrw6294i78bl250ff8z4o64gookaood7lokikgro71j62tt3e26cwg7f76fxiwq6gzew77bscjiw2scf5g8ofry7azzay7uat4tzst9te2ar2mi4ptimeudlz177n1x6f87zliff9qzktcb4lbvg1xbhubegwt5c5oo29fj9yx6nt9ksfrbnunylvqfkmrlrd20zhnb0go6qfde42vnie38j3fuz3twx12u6fqdw9q3gtee28ivxr3sk81r0q6fn6xfbg45cvjl1q9m8x',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: '6ufm5l4l7920pordp6qatcwrobz0hdqzvp5a5o95efchogguf3',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'u97y9fvx7y6hu33us1r0',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'xrn6v5lpp30ejhe73b5r99psjls6kcpvp0ot6cc74k4xtx1htxewm6ecckd7n82iowpoyv2su5xlekf540q3y6sh2gl0consnce5ccf635z0k73b1pqhdoplq169tl3srvserkg6g9skzmkm7qhmjwwllo4enc7r',
                channelComponent: '7xq63urjpejafolgp7w4c4kh6xhln4x1cqkkx9q33t2bdjv868y2ahs29ncfwhtaa5gs41szc0xuc9j2tzmvvlph94ucnor6s2si9wy39xl5or60p1moz6d4orng6e8fklp60ztlxnrsk6vfh2gyxql1878o5fbq',
                channelName: 'f9f9da47p8ybet9hhxmdpdo5epr0h3r82cnqp1lyqz04nejsf67my8qwfbodwxklu79n8axpy79y6ygy1vuodp66bxfnn0t4vlwqvr1lwhqbbso6fravg2da374sccbxjdc0zct0jejgh6i5tv8coz8n4n1b0jo3',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: '20w9svmig828i4dxmllor0xut3plz7wk85sxahlm5lvkzg0wm2eau0t2o5otlbxjalztqjyk953lda019rqd6i8uonm89xqlhm75hhocwadna43bx753v6okgy20trjb36ny4kgc05h3v1lxqy7bkt2sfwxrgjjq',
                flowComponent: 'v20xiwka1b057051tn8uumqk0cdv0ss7x6k3iwlt4gagbxpne7qqltpwr7oiqkklfoukm9yc4bqu79ahdrus666idr1p8f939vtfiqeyf0oudl7hlqpnuxfo27o06xmtlmuteqqal12bmnetwt67pgpsarzl1tz6',
                
                flowInterfaceNamespace: 'jt7rlgq6hg09ggf581tn143xi8nwwpqumy6ouuhuq5s7rkf59cdmy9rw1qsylv1shx0t1b0yvp68ieajaocfb1i3wn8lok5dtpc23xqhoshmwb72m7wau1w6drymrcmq6sjdt54lknf13x26b292u7fczxbduep9',
                version: 'oshl9hhc2kp3ncbxnnx2',
                parameterGroup: 'ojhautemxam76ao8rllxmmc9lf5xm932luwu4h7e4p8jplwx6hdxts4xcfybwgjoayesa4e5iqjg7bnpmkjeuqc1g93e0mwhhonv6y0ut43a833gj6isdhamlht2l9r3s7xs65i3tb2wkat96dle8yz2ggqjwpnipclyej6h75i1ro3fbdns0vohis6d8f6nd32esbdlhio1s5z4zpbwiv5mbbslz3snl0iwi7d5i6r9g0274frid12kivah7ks',
                name: '734oiun1lfmycdpvc7s34bflw6fcl9duuj7p9z0jam2def0nslet7rv11imr6h4357jdb5n1l9hffirmugvi9hptnn28b9mdb5iq1omoagosluxl87kupucpga8f8yx7w7eser94ntsrpzi7lua8yitqfglgrzdlo6rm2i8v0pw6dtily70k1szr7nkis5acblyrdhpmwa4sh9wmqu474kvspaymnor4mgyics93r7342uez28mqijponjqx4v42toydwdp5qcwbnpj6rfiisp6zgltixe0xx9bi70ulfo0rn12wnhmxnwjpkdmgknje',
                parameterName: '8b8pkl009uac5vrbrjrmpbggmyn11h4vapjsz3rttwgmpqqknq6orlrvkfefittxdftpue6tw3qcua8gau7krlxf6ls73mczdyy0rcbylvk8n8yi1bimq4ehysv4tsnqfgxl7pjwfatcixddmld8kbsnyfio7k0lj4cagf34o42r9jqo51zaa4o6a2ahb4s4qlgsmx3xt7e0lgt3f430fq1ih1re4ts9yzeu7u6pqk22adj6xa5ppq3mt3z92m9rue24dfbrx2tlw6duouap6t2z8cv11jeakf1m1pfg6lqg6ajro6u3eeb52yimm1ia',
                parameterValue: 'd3nx80465i8bst8okr623dnumlcfshfhcfbdkn5vpg0e3dp5br17m0jrx20j56vcwxds1wn7edmsmlag16ofu1zo5srqrr7lp6plv308frfl2dxj1biutxlzf5xdujkrhwkkf6zx9p96myvi5lflaynoohkp6ke0jjuf4j61dsetr9pc9m1gdswqwxqfwc42judvtwd6q6ftvc3rxp9dm2d1w39tb753lm9j1dd1pjomysxro25vla8k8cejsqwqivuueet75kc2t21apajbpa7uiftlxik66hj2ffpt3gmopbqm3aokb0j8xa9eed9qly9h3jofjr38oux12fado05z6r1r50o4d0q3gez1ulr1xk2zo96ilv2wp87mbzi11pemqb19k9qzq1k52xodvkoekoyjstpe7383up4yw8rl1o5bbfv7u7y67kfp2vjpkexooxcsr2kn5lhrx3cu4nic8qs6dujn8tfhf76epws55exo0gc5ekup04ddnfjnvugctou2303a4wuh2vqpzavrthuu4ukdd4xovr7jmxk6avxf5fs7lilcvhffw38bnzvw5l0vxys8tp836bqqrjh6yp4pnqopra8nwqs5rxpygc6dvkb9zhir948ei0dgts4nzuz0jy9mbyhawzve6liljubjnet4q3utnbshakrdftny14hlihubuw2vulatcvzwwapkemc022l44fijwfuyon2j1rgvxf9lagf6t67gb85bdngmyx9mqu7bf6dxi89ved58labqrhl2xwrxt0ek5piu084s2bh2chdgoi1jm5in6ziz6db73xeta6s3gnsiqihp59n8f10kfd1esvb3f3gxlukpts43jgmyssij9e2skfkwturcsyh7we2mdrsmhpbovex1pzavilk4kkksz7ep9kh9awzd1a47hwmr7rthdqjibukjj20wc95q3jve2b8qp75ipgudymq2bwfc19dkql39gcdzf8y007u4fvf3wjncw9zr33oj0rm4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 'qgo3g8mg74ymokikn6zhbi9ieu19a7t68r36r24pldkag9gdoj',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'clyiartpzv2yqgtihql0',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: '447u6n9a355cn02y6r30omd6mm98wbbuhvsw0zvhjzk3wc8t3gt13vpiv1jcunjoxkplrccs0qf3tw3opmo1sgqr132cz6qh2q6e7k27ysy94lmx9s6oonh2lqpwlbey7spsqx3x5am972mrkyeolhjl6bzef5uu',
                channelComponent: '0nr757f4ld9f8w0ghcn4nczca7xtnoklfouwbg144ovk9lfrqgfkax7yx0msuatgaq5u0qz230ss0rgb834puqo2tij2mxysddrv8tor4ggvofzq6v46k0zap0coixp4gdd56jd06qw0tm4zuw9rmdu9t0srjhe8',
                channelName: 'i9pkyb81tg3rejlaiw3oeqgmkr1urpbtrxq93xj7cq8seynf447tc0u11o2ietpm2j31ywa723a118mx8xcep1e61fvm9v0ikf8fnp6v3akcbo0nxw5qqg235cq775b24yemf1o685x03rmgg0b5yoj8sdmqx5s7',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: '5xmgsuk27d1fl8vpbh4218e3ybc7ndqcl2cz30h8og229p5wsbu4hxuyy41b2q8urooa3i3l910ibfkn3o821inmch51gnfre664k9m6pya4y3crg93deq7keix5c8firrixe2yzhz3lf7h00qqe009em3sx1szw',
                flowComponent: 'uqk3t43cd05qg7n9xa9pz6m68fweavb5ygvpqmar5nvaavf0xii2r5yq334c4qkkxjpi007gzd30753i3aapw9znx7ool7pxynsqzo69n7fyobqjt9nov2w3dadmehg86nj7s9izj9r4xzew5k7q3npd7ytkxi5g',
                flowInterfaceName: '7ubigjbddohmjijxuk7ut4kikhplni03fszg8ilih1rv5nwu9mdje30645ij743n09u5sklm7w31ku3pjdy0lq28ad387xubyi3d8frz86e85g2tsusksybfa2bjmzo6tz15upfc93zhiutoab2gi7amymnyd38t',
                flowInterfaceNamespace: null,
                version: 'nenreetxembj4fvro0bv',
                parameterGroup: 'ntx0uld2kerdlnivooc6zizbng78itm9aof21woszlfgeqktedgugr1mx54b1y8nnrgol4euuc3x6vksg0rwzhasoedkq0u26o90b364invo8phzw7167jxps7diyfjhxpcu3ifh8mgde9k152xshwifty8t4c5vftujfifsngeiboffci5ub37dao8q5qoo11ptekw6zs2xkxgk2bjy7o1w0vn9nqhm8b1dtuk63h5ywmkjx3unf4vlmcydece',
                name: 'zswege9553imnpz6ebzhu86i6r2xymhtt1s847q85gvpfl5st5jc7j5nlkhmvht1aridksnkuvvu86xcmptkptzptkwxmbcberodubjc6sijlzce7bxuridi54x4twrs0q4i8tb21in18ugnz96p7b8joz5p0v95s3jhuz5ltljhhm73tdego6ijfadqrdmxizo2p9x30klb5ed6e1yckkf46llahhqj3mkar603z99p8wzzq15o7vers3qfwr8eb735gbpclawiz503ig7z07lxblg643jv5y3si10dih5293cx3sli8o6zdnukzx9j',
                parameterName: 'iw76me6iv5vp7bky7vqbfzigbgjk17hld5xl96tpsbsrmxk3lry6mttofpv3wsbdhei7hssjeixmyndilccywb7sw9ts28d5q536y7isyvkdei2zt7p0a3rtxjezpn9d92ulejrm384r18qgxd4bcf5cny9td5ozut9isrrbxdajk3g39relgsk9cs1jv63049iqjowbm5y7cnsioaf7wip0regi0jkrrtfvfo0fbliz1eemtuk6cp0ru3te5nx3pxt35azha3c53xwnwkgd742yg7fe6cfva2afeu5m4vj2hrfbgmiaip25bls29a43',
                parameterValue: 'd66d8crxpra6ey7sb61ja9lb1x6q855f56m6iwoinj1o1ueyx67k9fu1t13swyn3x9u3015awbaj7fmtjgwjf9zls7oyu40vj8w332otvyi4uu1rh7h3dt5my8f3gl4y9lbh46x092i0vmv5ud2dix5ft72in30c16zmt2azm2wwwowkyv4s0hn5e8yyr418qowyabl3b33xezwda7s7kzibzzn9obpapgza7e44nlevauaakq2hnes0bel373rgj09r16bvxniun2fuch0u6g036r7p90quhxqkxqx7x581z4hejjbqlsb8p5mdokg0hmjbrfgf2ugo3ls4bjkyaeo21mu5d1ila3xtuv49fm7mma3p9e63c3k4fssjhwjms46uuewfn5ppinymgsatl4ypeni3u6txvsq8yuw2dv40rgipob2m9cyb8kpuwj9hp0yyejb5o4mgvaltopbchr6je1jcvhe1q6qxoe6wc02xqcx9yrek23uev534o5iygr1uknnzffyi8rkfj8w9ej6g3frw8dz1zpaw5vamic5qksrg6xpzeboslgu3fvz7m5uqlx19gkckef52n7s6ctfr66cbd7vyk5z41l8pn29766txw8clvriinqbytw6du2i4d5204mur4ij3oavdgqxc276ce0o6tg3v254toeus3ehwxpt1srqkwgdfy7vwe14vksvrr9u1bcamsfp9dfisqagsiohg4z82ac5afcj17z62zzjybr0z7rpbo6mxda1ey77aiz99tsarsjp408synuai6brz2hkbk74ykwxqwdxq1hbq6e1g3wfonjh2ib6ibysxp3bl78ic8oz7473l4zwfudttvbnxi3pkati8kvg9tioj0619opp4r66e2tlkwuuvupzr7pjfp9l97uw0aykowuhap9m4pyjyjjn36i4awcd876b9dng0fma2kydd0q6a4uybqouwr1i82zy6cdmwumpdzkv64awtveo99takj53s7aer9wl92c35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 'pt7zqwrmetvlayfc0y29zwvc1bjh8j0w9cwu79utvzfbzclney',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: '5bt351rlcbfwegg1crrn',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: '76oseu3dcxsj770f6peg53y3p6cilsrmfgh7szxf5h8w4h4w8w5z0h7pgvt866baljkfm13vlral60qi2xjcxdbnygj9n5sjdeiu3r5m8gcuxr5qbinmuw5bxcd3ru9es0tuhy29wvuw9xd8sw8nz2whoymmoxz8',
                channelComponent: 'qenc6upb1wdh4v80e7btrcynwmwz5ijgrfbej3wfu7vew8bnf6n7k35pd1kxldb6knce9p4qt17seuub0mo3so386awmsayvqsmuu4soz008fpacm895pc20k6j390rr8hq1yatbidq7vbl43o0fqdey32cfmvso',
                channelName: 'o2rx28xi3twlwb3lmaghz0lvy2r0quui5stdb75sgrk4ekvg9ypmkdjd9kkcyxliqim8wblbrnvos89nanc794hv8fovdic6aa2wqapmppbo1yq7rixvu8u900r9t3socpilj46szg9eik3gm6fcq3wwiekqg51v',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: 'yq06mo2lkps3emyhno2fc69r05oxax0r9pni6vv1l6twztwg9hr3plxo5mcuziyfzwaau4opgl5cq0b6vt70f85f7irnchb0v9z1ztu6l3d43h5zwdqkj9eif4s3ya9tly15hwy9v3iqo6lp50zcmczifjze155i',
                flowComponent: 'cix3fnblo7h03wyogh81gi2owcbo295ahyh6xr1apv8uhzdspkzuj9787cn4xne1h40g833q6f4u03ojk7vrr8dr6r1xvueqbpof5wn5b7rwv3vad086jui0i0iopm2tpqxrkttkzb64wntxp5x9ee3oa4fhcost',
                flowInterfaceName: '30qlpwo8tbswxju2wtx66t20lgzt1wtzkr5svtikfv9twbu4n6ivbkbl992w2wcpbm4r2uwvmy7jnmt184h8l82xgp08i931e1o0dnotyy6fa243gfm05j8x0aftms83z4vwfsd4va74r6pztcbqz2xpbup16swq',
                
                version: 'mlw0jz0dvdtk0lrtpxkf',
                parameterGroup: 't0ur8clf7ssmomyvvmfyb1cqpteihmkcw2em624jhms17r7occfqsetbzp5m5ny3tuu1mzv766lzk9fni2oh6a7lfxvhe8nh6ahp8goh7laaxpk3vvjb5k6aypw3mftutp14dbys35pp6udp754er65ejiql2pmxm2tkmh1teehajf6pidligjtbeeg5n0ipgrundi32vu8nu65rhplggkrup9qaf2okownn646kz549qhz8ujpj6cgw1x5otkm',
                name: 'f63boq8uhqdt2greoe41za5zywtxm38nnlqn6s0pxbur5hx7r7sl8m9c33sxi8lcmbyful5g9wwq5hbm4hj57ezik7dzrmv5i190znys7m3enzcgok071mp97mpvzd835u4nybsz774qnrg5ww3mj6d9t6bxuu4dth97p27sybr61w2o9h98vpxk6czuao4b5tdhlzjiojkd2ew65alf7an5lagy7i3xxlebxykj9dyiicn5tarkdl3h89i9o8gcu1m7afyseq2w5exflsizmopfaa10bdjs5r7z4xitzz4uu9zx77ubfgcgqa6ihamv',
                parameterName: '1d5tu801pkkwcnrjxu5o4rxjgtt5nsgv0ogwe4q7lgpwb7anb5mta5ibw772fkn4xpoiqfhrxknu1aun4ou6nkaohjjqndielgauvm62e9aq22wfueu1oven7jqdxm3rfio89ct86w4msndsz382exluzwts4kiaicpv3llp6ylh9zkm4ts039u9l6yw2josc7lef5hklrn55hu38ae3jrixpqys85u8xv2vh20i20xp8gfaoojr8xirlz6yke9wu2vopbnn550ktxwav2ys9ojydns4n4rn5g1a41shwu2xdhlyzm96czj8keeoaazy',
                parameterValue: 'w8m851l7wpogju8b4stqo1bng0d4k4p12kd3cm5vk4gtj5gf8thuwzzh0x4atibiylp2pvs1f4sy0ob3wimvcd83jgef1vhgxztu0775m42q2b3ajpu2jy2zoeccxio695ob2s08gvyl6nduepfqlzoin1fzenje4ipki7v3feue0lhd5dmrdj4sdfnf767olwmc7iptupk6fqqt5ffsimnv4jinebcei8c2fkga02ldbxiluj8xv6pepmcvd0kr3bf24t0hda8zeeze3f3wn27te2h2la1wexu6h4b1pfzg1c213xa7b4yko408bxhil4k8s853rhwu63yazlbuhr0j3b54p1fgaapi213pydca4knq6pqs6lvwiz0uxbcr3aas6p5nhzxdxxz3vj9e7nnnc44lgnkk7f19bbihoxr504nckjx34u25l4gmq73b4nwp7svuw061s0freu03jaq6z8tscswfv1a0ltr7drgh6goinigbbjw3z3dp9dsqvpnsuxdw31t07wmh8zl6l217p8ajpb6g4spm2434u2rykobgu57mztlg94xzgkfxjo69d5piqwrvsys7glwcwu7juc886bn3xn5xdz41z9ol4mc4ucenadm1tr1waa8ajht9iiskn7du31mstot1ivfqd1mkz6g1yg6fr5n3nt7sr8q8awujdkpz7qmhcq9tbgtolfn07aixk19iawgo7e2mn2ct3x7euxgxvjsokmem55lf9w97aqn2q16cxibva35djby56sjuskqfqk2ipsjh33otmtp7sgv8p9lzuc6kxwl06fx81oock9rxfov0b9pu9gmyo6ydnw0lb4cddyiz6fklcdt7wx9tjq5vr20wygm0lf6z5jfkktdra6gbx9u9urarnlii1xl8y9i8xshz5cr45q8yuagehjqvxo03117gopm8be1shzgtlb1bke4b6z8c3sh59hkxuv15zjc140b1z53n1ezalr5g52l7u9lhwhr7y5n7zvc3nkm0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: '7yfnt8nzz3bepl3moxfhq161s3ribzgxedmdr0krrwtvc6ms4k',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: '7wzj5q104ix9rsvaj3zc',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'd8zg1x53f5mtevcvmyzp11mnxqldj4u935odjec8ia2ibzh82c1ffjt3tvi7pb2tpkwew0k5edwipohlxf9leum7mhfqva1d1cg3hnh3ytrderv54qvt0wkcx1og9lfujlct00cha5cq0xkx611n95ao4r7kgap0',
                channelComponent: '5a2oa0gr0kowuuemmxke2vd6nmjcyfewp5ohoogmy3blp6b2ln0rv2e8yltojcjftumtznukd6kh9aoccoetm3xcb1lq0v0ay0fipm5dclywelrapk0ikonnyfy7edkionsc5h20wug0e3gnzb1c6qdi2bcj769f',
                channelName: 'cfg13omu7l6zcpc4znb4l31c4tbkuep72ybyyrajtehwmvz3vr4kuijuezm5ruz3c0gi788s7zc9kjgko8dr1iaqri1meqqcj4z4qbez8zjpwe6mjuz9gdrt8ids2ffmkvcvz0hnmhw5srcvg0pq9ifmi4egzth6',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: 'x5cu9sfqrev0pgxd3dkwe4c6q5iznlq57iwy03e95ve188mfl2nv1jzb5wzkfnosqd2b9cuaqkgguet32g7kuxqjk85501yz23n6aoh94jy2yteza086zemw3exqs5v0v4lyzpbj4upwncrhearl7fj7xqjrq3g6',
                flowComponent: '75pn0rqmjga7y6wtpqtoe9syvl4tyi8rjhz2rvsssa2wf46gomp60k9jnkuz754ap8jfmdewhi8iid9cih6c0llpuafzf6k72s4ktomd2be4y79ka9iv9x7o1zpm7h5tlznn4mftdqs8l17ix1scmt9sb5uudb8y',
                flowInterfaceName: 'vjquh9ll1kdtu4o9rn4n7ybudzjpqr8o9edp7xz19hwz8834jn9qc1g0bt38fhmxh3sjenonypt3503as2u0bbvut49koybftgbzaw02fx2e0dkibcnz8prrdoeainwkv5i0tqjsrebefsh7r3a6htx0y2ohx3ym',
                flowInterfaceNamespace: '0em9rkip8upkdx8bqgfopvk0hdeank0rve57alzwejwfp2aur0ntxoq8zhc5zz5yc4xndog6h9l4roaajha64rkf7wdjjm2sb9j0547obkccr9ehvadygqidxrxlrbhhy8dun4aly3owmknhhhe1kool2jtq7g37',
                version: null,
                parameterGroup: 'ssl1yb5n43bd7o9gxfadlidl3ag8an68c1svq17dlvhn75m8vsbijvwb29nnr6da9fmbo2pdzx4rg0m6h7nvyzop6eaepz1rvt0brula4iulas44fe7cmo22i3y6loxkd1b4on0nbp9uavi53ghjukefp27zoxvi7gqjdrcl4mljjqa5j3z9s0l7v31fqelsqtznbgp0v9umt11tjcs9fq1v9jhk1c6iwscdnkbg0lio53d3t48iarsvtegugzc',
                name: 'nwl1n434mkhr3cv6x40numuoglela2szfsi494ddemffcdc75rcrcxc7rodsc7cbvq31iok72hkdzj3naci8bk9e9m273fbx31tgh2rke6ctzlsd9kvtvx3ajf9i6p7zncdimsomlx5l0s612yzllwm3x9h80xz33jrbvp4vbsiijdvgg7dvs6ema6wa70vsgy8xd0268vmsa0424vxnvjfgukeds8ei3a60v4n2tx216cnzlpuys79ktcetw4axhqp3wc89j036jvz8c2kepp5dankf087iqmq8qey0ovknbj393ky9f3rqprk5v6h1',
                parameterName: '54nq92nwly5htdz083x0uej7gn41t6xafytxanmwfwx20pikdgp71v5qrmzdxphowsi0crsz9tndgdntu9p3djulpx74hd874peyu05c3705heqp5p2rt5r1cl0g1i7rimibobj864gh8bsl8d3qwhz313vh5fq5fz3n876fbhaib5f5kkezay2m8vn5x2ylc1vtbcg3lybnnyjljhivladww5kj0kahiich5c4lobgf88yuwst7gabx70vjc16f3kybg7hzhjuonqdrraf7i6mmyn94jhl3mym5slgji9v2ebgnjgm2byqi4y9j1y1k',
                parameterValue: 'bzadvwdvpusia0sl65cvyk6h67p4zwf17gu1h1d6pc2mdubwerrwx9e3u0cpb6yj9d6rttj85m4h37vr7bh7cbw7tig1tf7qpshrf7c2vo031xr5isyz2m26tkw851dabkmf1vim8n8o2onzoyan0vdgav00peuhhbwtl9tm36ljnbkuvv792t1vc4bzypmcgjj3r6ndg5mi82xp2arwhl1fyrpwm5aatnz0obw6t0c5xvhye4akoa06cfub1kzq0r6sc351f7hssbg1jp7b85h4m0cnbm4wurhhrcr2l08yumb5fb122gx62trarym5do64rumyzbidlpd2lun5abjopkc801lrh6nbm13ysc9n0tfhhntee0yqn6eo48tc331hk9mcp9yrz1jfuqo4wbdc5b1u7pyx78jgd87gav7u1gmqsw26fju08ja4img0orb095ntoikhmf6pep8a09o2uz8byre4tv62p3ff7ps83smg3mglk7d0v3ymu9z6wviolsb88mlf3oahcsw2lo53rvihrq75t2chehqzhq5cuwnatqllzof9svs4alcsn2sno75l5f5ots0wrpbxbpgbxm6k6i91gtc406kyalr5c2dennudizr1f1kzpu7sxf4y92famjy6759hve1cy9ufz0o00ljakg8sb3hdw1fl7yq2dn32rcgontx6fd43hyae3jernwfy70zoz0ribh94yaj4fbpi1xli60abvgrhzqkin0wzim2nqbca7rspre508o2zu6ttnq5lwakcfngmegcsr0gh6ifvc1him8rwb3za3f26plhv0lis80kkfozuc8955xw4o97q4xfx2b2610dgdp2cyp4r9bcxu8qwcvchw13fxa497zq3jaxn0g4tf25s08a5m6h4hz0mnxv4asqp8wbswq5nkiy83oq8ys8tiue9qhfhep2fbnfe1dg3kiv49bi2zdhliip4br8pm6i03az8z7nk9jc4oysr6x39t5izg9ayzmki02ok',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 'c34rb22fqy8th9ewdcug2dixthio94gp4me1krkp192eo524tk',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'axi2a01dpqqyvghwvuvr',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: '5xe7n7e7qibhtmxrpf2re4re93b54ov5jvc45dzlray0zg94d8l9g9tkglsxqmqvp70t1rfp5mpqgmy2smlz7tcdu354rgkp0pxkwwp6g79n32zophew4xa15svg4991a4rnjh6r3w09vt8jm3auxaltmrwkl3b3',
                channelComponent: 'zsdkyevgxnxntw0g54jbmc7ko7d5affusblqk304xsxaktdahc01gpf0wwtqcyv459f34n8i09w6mxrgk7weednxlz1vanbgbk42ulehjezqcd8s1igbxefakah4tmnyhvf8u3ah7m90ki86rdpxx43x2yinhqpv',
                channelName: 'rn768lxewhimpwkwz7owds1nxyho2oxy847gziqdgzhihhryitbn0guhs1i5e4d581ag6vegdrxhmr4vzoyelgaixd6cz9acuznvgginthc1ed2a4sbuf8dqa12y5w3zjmj1yhf5tm8xsu3jbis8d3ggsksus0e6',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: 'o3fdar28799p7esapwxm8durkfo2510ltc0wgm9k6amnuhn0tgb7de3vzt1h3fq6fx8q7zubmp7lut9zard54ps59zhmsiubj2zj572080x1h85s7rc467z5z1xjvcfjec73ze13ipe7rb8gskidpnhu53s2gd4o',
                flowComponent: 'cdoye0mqx4qwwcn5sedrxly3km3qy8mtnsp9dcuzpl8totwfadbavdjogdbbga7oece9372d3kiniw3lmus8tr87ie3lqrl9cmy57u5028gzjrzq117mjzzpnfajxrgrfzyoxj3my5qi8u65t11ss2747dspg44d',
                flowInterfaceName: 'odkukkdmd06a5iyepugd95qbagicw24w54n7kd8tild4l52fy030cnxxg2utvf4qd1yooubnsp14imwhcab5lsza2nbcuzxo1vs8vsmxvwoq8wy4mivw0bko6ajl3ce39qxnr86ga3m1qiar72thewf9nduobgnv',
                flowInterfaceNamespace: '7l0fv52amii93cpmysvywv0cm3i24xlsu575ucw9hi9h2dhnwk3wmngfm1yvt0ykn7xnhkfshmdzyus6w6ordyjieyvyjsghijn03onkj8i2ut35g9bh9juae31xyesf7dsqelge8a49z5o6lddblhipt6ys21cy',
                
                parameterGroup: 'b70jof8500zrgwdonz5guq5dio9jx03qmvcnyphn94nrk22ph03klc7ku6tkdpdwfcpege892vzbc24eze69zk2by0a1731mym6418muqgw3yvgazjiem1yj98ykjaxvgpxmibw6w190z9oqnz0ayj0hajvkzu2ww2t7ydjkjmdkk3l9qea29muxgqd4h4gq3hsqh3iuqvn26lwpc82jvtlzbml0tjfj8tfogzb56wlyfna3jpky5grzcul8fcd',
                name: '4jn4a6vkzedhwcvxa680g1sl4jk9hemkfps8eqli7of5l4ntsxfsxifwzgdsdepsmdnw0ntoimriy6n8lv3xctq7n3oobvm4s7bwv12rh5e4khiyi1b4fwmw5i0xpdgfm9exfi5d0uh45viw1i7rytkkxc9x0o1znji809foszj42kqcwg6uhsd0n3g96xtzm0mi8o8uu0iiqrs2udssvzteydm9wshiu8facj24hyq5psyfbpr8ftzzj3cpwgct24si8axzrh5hdtwyir0tiz2qqyjmmm3x0i4xpgbe7vgb4ppm4jnd4blc2j3y04ck',
                parameterName: 'vnvg2fy244p0qyucga0q1ynkf1ngd3w6t8826x52fgfesa0afccyzoc9zhek791yp8ni06omg7w6jcmn0cdhvdonu004x7zh0o7t56q4k67pleb7mfellq69ov6aj9baj5y7czychtoelslaq4f03mgxjjprohqz5yf5lapbaoq8b8ga8hkcdiamt8i3mw3hylftkla07zvhhvhgtcrxfjfqfx757l0krx1dju73c7dgo9zdfrci943e714gnf51qff01csayp2ujv0mobav5xelqg3xqq1djyalohdmcat4g54q8zrjwnmx0ynn690s',
                parameterValue: 'e89pili631miu8sixsdo8uq58gp9ixtqcoheckal3f0roiitqgwrhvtylradz078kn225p4dlzraoqxl6afljexoxcu8u0dgc9edm5kbnnrws1d52z3rm8jm8rnatdhvj0vq2axn4dgtwg6usdk0y7f1ih99s6mxsh3q61ez2uypj6qnxddem1ppnpk2brmblsmch8wha669e0ad9pvkzadu4a424jsbw9vak72exl1psvkgi7yvf183y273237n7b53dsc5jtqdwzk58kbfi7isb0239n937h6xbowv6lmv68d8bq97054737hrtajuad3o6fsgylnnecsz9z2uf1l9n2itkw315yxwmviowpa5467cj8x416wo2txqdkx4enarooywe4xze52kss1avu1uqiyfl1z87s0ijrbwhh99hbyz13fq0yjnmtx5flw1k2mt8nngsm42b9f6iaerm7cvnrpe4686x2v468hwvvbbhc2qogkaw0kod34so5aroudpmfk8a5q05w11yn77pnwpp6j2ji1u6xuza9us8z9vkhatz9cu37qj5t23mdgimrmftntsh0xrt5tv9y9axzkc6kiz27s5vzh1s3z3g32rmnwvk8wfdrhzq04ekkqgzm1ddi583657w2caa35wymh1u2pq3nimfzlgtxumnhw8jzk4z2hd7eszwjr4hwtttbhpk61z8daeh2p29n4810pggl2iuvzhul6imkze8m0kvxzy5e9i7w03qv490tf0y24rq5ugwszv6xfc34kp8e15pyob176y3l8pgeynkb78rbvm5osfvyyhlwpigzokanw8qcglu517w9ywj3mx0lly3fld7r7czh7nfhy0m92z6r951nbzkflaxxgqtmpkxmb4s9zd7foe7500rrinhtjwt96d3p77543eyrwq912ss9u3rld3w2b8tcaz2so3zwd5rq7tacmbjmkiegus64v6o2c6o563m0kgar55c59s9x6ltv8v5etrz8rfmibv',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '7utknpm1xslbm711zqw0v7skyabtikywr8bun',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 't8q4g5t76z7i3qpbs996x33df9djogzhcv802gy4mm8amzmb2t',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'x45r3ayzmbdwkfdc0zj3',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'jkspqc4evlrsxzpjske2o8nbnt6lamkzey9mit3cbljybhqxwxe9lhzh303sx2f488l4tmm6zggezqg5j8slo0ithjwq6lnuc4dc5230rpuz4b8c5nukgqk290qd74loi1zonuer0knw2iiausliuh5y39jjgara',
                channelComponent: 'ptu1jkfm036yzttz5cla8otrmn2z5ppoj7p5yly5ekt2zsmjn9es7sqyebyxzi5cgcwidm31nu7gwubmnujz8lpf8zkd9hsw6hugzf71mbswhw8xtw44zyoc70f9vpsjq6fxa99tn00imtdnjmvlc32nat4w2edy',
                channelName: 'k4z1nrh19efwmbm939feyrave1sn3u1kaw6udf53xnx2h9b9gaosinixpt1ik1qr94107xgqb9eiapziroxigvukjcmwv91kzldmhgt7zmilthi0slyojs9al5lnix4xv2ugav14mf5lv7hs5jqhjkfj00l45r2b',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: 'qs4bc1g9h02gcrwllejdyjkxzll6pzhoko3wyck5ghcrskp1gyzoay67ix4qi1f7a6cdaby7lb7524fxyqfv3ddiaxd74iptwuvwf4ztwdl1rptf0x8exzxr01hicdu796yddkk16ht7peysuuhta6nkr4ubuf5x',
                flowComponent: '7sah9xfre1ajgczibbw30b6t6r5unnjee7rhanejjjlsspe8niyi3j0dtjjf5s5ljzq9k8j0dva3wi8qdxcyzks0wmh6o2321jjosz3loa1hjjpfibw1odh1fqrlx0gsx2wy79jtgtju600dyab6uy13ex7kv4u6',
                flowInterfaceName: 'w29truven0b70faygu229z76hsppqmehwxjgl76o0ul87fjdtudqcwv8xviavl548flyqv9g2p955gi9cp4wd4f6rtqaw59evwqtx99pd37rgdzg7a34fkpky4mpnlytuwqodmcsk8kkdkts69uuit52jwxx0nz1',
                flowInterfaceNamespace: 'f666bu7jynrokykkiu6td5441snft70683m93nx8ilcd93tibmadm6t5fc5y0v0lvspkfge3qpzavftr0r1uw46rfcyqbmrppqreysks8ni7wdwfqexuh4orjilfr7qrr0fc2zic0g0g0mgp3am96wwl58tr078c',
                version: 'ikev4on155b4gf968q3d',
                parameterGroup: 'kuvqoilcihlxm8bi4ldfiex9dlk7eb38iewcwpcwj7xttg32rrf78x5ucxamxhuh935sqbvts9ggc9trw9hzga0j5cuojfw795n1lq40uibpbjbr482mywwas535xyyhi7qjh1ir3oy2rrbmfu6b65lkrjercebao3tr9epb79v0chzov3x14ef5ytwmmk9jqa21sfkc0yluum8xbtox28sgo03kid2o0xohc5ij8hrvvvzj57b94x9uw0wvay5',
                name: 'bpu6c7qcqzfv66qjwyjle6j47x0spo3urzy42d2qn9dwj9xnztcn1dghdmpfzqnfbalwg98ej8anisjulsb13t8e3noeb9vrceb95522l2rzot84tchc14tdr87r1hr4gziqzc6d93b5yi4wpyux1yonb4ogexxes8he8wn0r3uepy692h0xk8mglelrpoyup47n62r5jssbzoobn6cmyxo8w6297ipltiz7cwkqwb5sgemfzbf58uce70xlbb25vkpor72frtifajur7qbt6xof67li79p8nrdq0txvvd06czrhgtecl2asjafuq1hd',
                parameterName: '94v9zfutphqg7mlvgjhohwh3mjzvcxhxbbc0mgsk8d3th88krxlgpudthk43fmnze6d2fwpeuco8kmz2claydmc2sakwg980vpp2qj4rm2qwsj0sl6yiuimjubj9d6s4bociaya52oxps7yko6y9whq4k3etaorfapwio6p7vtloah1qcmxrroj3sogmstusyjgt8vv3l2qmn2htyzva66x2zcv9c4bnhzv3ul2epjya61j3rab65vqviuc5xq8i0hkowut4qdh3khq81mnv0o7o4ztpt1whbtw0arqvkozyg38i2k0ldal1khynalwi',
                parameterValue: 'qqhjmz2tite248b26mbk6s7cfb3caumht71ajkh0jrcmc8lxd9wo6dqb1t9jiy5yqtvpaoghaa4hlwmftmx2srkrzhsxpd7aifnglehmce3wichqb5mi16vqhif1qd3knva6jwztqsg2vn0efawtocwvuav749r947nqznj46ladntb4n0c9yg6ugjchg58bl4amkgaiggk92rfeyu6s9jwu80qa56dst126qp4dk61q9s5ubrhy327ic1rqtfvndwsd49l30mju9a5jogkt6qc1xo65mzf7og216pljh8tref59uu52q3my32cpyph7b0ca0j3vbgd7nxnvncd4u8hlmro9jd748cxplea3k6ynxw27f9s2xcvwmhdbwsxyazpvogej6w19ns5spactnyb6oded6okv16tnrb16cqt4cvsi5fxpq4a92afeozj2i9uerqcgza1367enmwkp5rnuvekq33x2pklauzd3fmqf5j8tyquuepga9pfwpfykt70zgemidstgezar8er64yg0b3nuqdlq208jzhlbvd2su7b5klgkb279lyi1ygqs38hy7jti7kzirzq2ptwh6lps6o8uyqonncc1162oa5pbhkqlu2aq7kurcs3fa4u5tf83eeeefhiaihnecm4mjahldunkuwo8wncvm7epft7acu81rit3zky2tvafo2et5f4dxfghv7c3j4c4sokv2t3n6u14zciw3501bsdgsuw9jxbdslbewixj8w8zi6hzsw4v6rybm8km8uty3qgeu3n1ebenmib7k727dfwurfd4sswwqy8fvd5wba904vj6rpguv9rrfp7gyo5vz35ove6mpj4gw05o173eqz1rl94k9k1x6fikyjia1pzleya7nspdrfoxb50jtr7k4amtv9lgurmtkgz5et3xuw5ajbtcln826vil61mhkudeg9dg7uc9aiih3ioug8krpnl6on278awsgwsf50ahnv76y6zurwjs82qakz6czv1ji0tl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'vz2hiuhmdx83hly06az0do2hhmtagzj3f47uk',
                tenantCode: '1eo1r2fqt0te21wu1h7og89hi2tpszpr6xspnsi4sq4jkmvi13',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'nmnel5hhsd6m6td7gxds',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: '76mo1vvveqq4ai77jkpnec87pr95y885cn4t3m1kkilesldlr9v4ng1yorwih9k8d17jkzf74jg1xko2dwhh9e853c0lfgwkqloue95srpd6nfqdev3a5novakpf4yc0occiusgtf9mpcno7i02jw8doxjv2gx4b',
                channelComponent: 'cmqd97t9bwee7vwy0nfoep1p3ftmmsael3jzbh77pnqhx6guambitprklrvngldw55l9n5gp7u7s7ou838tob8oyoumlljtetx38dx3n7do7x73jh3msisevbxbevcbty7ul1jmcd5pa4zpi2w5hybs8wdiv9g5g',
                channelName: '61zh6bw2aqo5b5pohg1d24jnxtkaryn4v9m7axop0g2z6kkasjs2y854t7rbgpvp6v3c6fu0rp0no6qz1boz7lj8g5egjxzky63f55wky3v57ermamekm6gk9g2h69q1d0sy9mggfm8ayazid3l7vja0q4haa6kv',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: '67n3bqlg3dflkpjoulkrjstah05gzwfqmy8hkxzdv0504okjvwoq6gtt02zv7kik9ba2l66j50ngmtkxt6m6ohpveqxujm06xz0gl0gpchfpt6piac3lbtxopv6869sib14rjgrubp000sfmkfcck2fl4zvgh76o',
                flowComponent: 'nesyd3tgf8g5dqqz3xufelkgvkxka8jno8vo7bjyc4jv5fn21od88ikqm3axzdjo5bdx076qhx2zmv1i3e9p9a2n6013fahygw9jchdm0mdhqaxdsl92kjb7izn23silfw2tal3h8beybdtcw6m9mj4i8dfhfbvd',
                flowInterfaceName: '1mxuumcsfv3po2qr35o41jwg76khhfmyii8a7x7vp32drljfjqz47ls0vljmz3izwwh15t52y66fgudu88vvj6wqhf1pfa67zkdm32g910px8x4t0thnjy95cx497dg98yr3ft1nhoy6dr2r7noim2wp2b5hu11l',
                flowInterfaceNamespace: '7dvo5z1rx72f4u2aqm4bg4pz473gsahyzyavtqyqojvb4pxh3crlp01mlw0xwqa1t2vo8qkw9b0bpr0oza3lmgex7bj5wdzcvafako6on86kkewmkovzz0koy9l7pffo6q1u41u693azowhoncd8a5ee6v7i25z4',
                version: 'yczlfvo4hxxlpw5qda4d',
                parameterGroup: 'dfebrj7wuiq8xvlrdofioxwsl4sq0qihvzr6kr58e0k352alich8l8o36kwdo9tk1eq0kykopccyzkbg21gfb4s9d6069tdz3ol3uashehhu9f30axfm7jhlen2x58sfblidv5ihea47szlm79klwn09icp66nk98n90po3qpjx3xg2l1dnpocpip4teft3zeatwkmlh4raiq045oc8u5hk76kzpo0guavukhgu27mglp10sgkfild8izm3wpof',
                name: 'z375h3vjcbjnlidbd1ekocno6xniyiv0y3qmk55pbf572g05mk39s0p1v1zswk5rff3pvdpsvkecladdk68fk16em6gqtb9mibf96smgnkasj1ld42shxzv6n9mc5y9xglqqua3xmspz6oqrz0h3iuhh06lgku5an06e3qzgc8dos8wdvkv40ecdmyqm8uw1z7oq8ajfqa9r06c0iw69cosknsnd978swafqiiuddpc6mvq7z5pp7ehdcntoxgmwz8yl1ldg5tdmx3a8cmyhlntdrc3b99eqy6fgbdh6iwbh3uzhuswfemg1x8ul4ssn',
                parameterName: '7xddeqtalxbm4r3hueiczwjlo680zt7wboex2kthodrq3teqg1vuqn4aloy8cr3vfzyb8gcdvh0iwbf91g6wufkd8zzjh6fb2z2apv7pfw7g3hfvz8wn6jskysep2mscisg2376lpiopkp46r2d9g4rwluckb7vnfu6bbyat38nw7jw3518iyfjtjy3meran3sv3ccvj5lwr6p6z1e0rb1njfb5p1yhrdccjqlu84qoecfluz96meddd11nkponjyq5aklllkfi7z1qmml9agxwnplcyg0h1pm3t0e35m1pdt8zc6e8bdsncpl4hsb5k',
                parameterValue: 'gtopigjhbldugcrzw3bboenzm7yjkj290dbwwj5tkpw3ho54p7xxkleauqjd2u7fufzdm7857gnb3b2njskcyi52b0kibsbvx0rh2yb5p84x4mc6fhjt7lq1a3mfgdlgp43csce9zo5gypsbwrik0sf94p1aipn2mdtpnx4pjh5fcbtjupqema78fkbftc9zxbrhoiwqln9ej1q78yxbrtd9ozz1qyn7yos009s6avw88fypzd348lgj4168vkp7grui9w83gfnq3zajfy2mdjvh0czrzw37ip19q61877u2spwlfk9iyyirwnnsirxrjwi4un6qm8dmrmu8oxtpahj9xcjithbkq2g9g8d6wmjyd694ku3smw03btaxyaiscwmj44xx64kuns49jd7j5exhp3viv94vyq36eoaux3s21rvacif2cbis98qwmvs80e00e7bgdmrwu4vu2aws21nfi1iyg7cu5teretw7mahce1yxyho30bx0aym8ajwl9bsuq8gwo0ds32z9lu2qo3ieamx1i0k9bq1a1177iw5o7o0cvbkqwcxb3ecbhprhp5q9a1wokqdf4ldw9rd3gv6e20r1eyk2d13zzg1ms5qnar7wojaqtamtzu8ogjxcch36zy191babzlkww18tz89xmfa935u0jxohn4s5y396cq1h4bezrotrt9hibsyx5r5t2okscvzflqk6x4r6h9u5bcmg0zwfqcy1lpkuxe2hhycwc1b7yqzlo2fyst76y0f4h148qq62r7imsrzftjljoxdgf89ocd59mubq79mv776yrzc4mwkojhj915x25r2cyxi3u2lrjyacqzg06200qn43tt29d021ni48kj1y4x1fv7qd87po5b092dwec40eim3ym7apmtqf4dgoic394jzgactl79q3nxv578aqw73jmc200wzd4gkr1z8qqbo5t3b84ts2e7kj63kpvjn6hy6gozru85r2mxwortnxmgl2tgjdwrayupg1gx5f',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 'sbtnnz1j8mvmnu3or4ngbeyegbotm3s9f3cmsicrss35vpz7ty',
                systemId: 'd6gp4nsf5itzimvc7faz3cvumcoqzr8y82kti',
                systemName: 'ojq0o2q1o61rkx8ff9ax',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'tkcdowbjtxdx8j8r9l7peohtz7ol4808jrsuj4qyb5ebzm2soe1ohhy6061x9r8aj1vp7oihdr6j1d1rmyaownxe605fw12wit6qzz6eud6r5nzshghlor0w84oybwnjbnauk9f6xdpn0upa5m7gcgsm3jaaxy1n',
                channelComponent: 'yx396y5ccqcgj3canvu9le0boi2nwbc36gvypnyhc95oxre3qm3yzh3buq98akvfcm208rxuyjkl6bcp6bkra9ih20ahg97peqedlnycvfe9kjr53p67rejqbtwelgeo7h9c5mldmynbjuhokd40gwdpaj42lh2m',
                channelName: 'dbttr9bh01onmw94wb4mdg9c5onv7w43s2jgycjxth08rxm00txnamsruy5atkc0kv7udc4hm8pnszys9qms97043pryrd1pj23osnq9rsopkf6ucpougl51ltk0i7ppyho2jpxnifxh26tdbbnkud52h0643m0b',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: 'sdg6peumh60twgxyuomm3u1jsrufq4uiylwgf1iaufq78twp21u30tnh3kuvpztzc90f8ygtl3s6y8vz3ttskkrv1att8i5rlsnpv1nj4p2nt3ocsxr4bgau4ffzusy6cq7hdoix4zkmyxovi33tiulkda89sgu2',
                flowComponent: '0my2qknlbaetx05fq6qif1np3xq3vgw4hxgbju47vg4akwis2kfv3r6s0jf2stz391lpe51k6bfeqa603anztrt6kwj6h7gdk1z8413z9dpnj12tz25byypmbxddlr9o0vlaysud7a08mr2h6m9remvhdqnmxak3',
                flowInterfaceName: '76ez0m5yn3yzxvnsl153du7fx37ju0yhvi4b6movgsrvexgiryoxlfie94oiuukmzudf5h57cnilfa6l53nmdlygfa09y1ebfl2fm6si72z5oh3wy9d7uq0pmfd3iy31ftf3609oafpv53daw18ss9nl890m5h4p',
                flowInterfaceNamespace: 'b5fmka4ppkkrjwrwxz30e4vo7w2qh46vofwyupttwfpz0k470h6nnnru4avio2pxvkwzodxg73url0y1nywkbaskdtyu8hy7dp8h1mfuxoyo6itct5n49s84df6wot7uqjxfu0s8csh67dmvng5n6bn0chxih982',
                version: 'do7kfn1b4dkt4zy9oot3',
                parameterGroup: 'eplx2spmefebq2wzq1h1jblfrmk81le63vq6smym8kjpfk83uyme81vtfejum912x8oz8woa6bwz7w9f49l6owcgj1jud61y1ab6rqzfcsx7f7fn7xitt9ojlapcatokvl2il2q65y5wj30a2kjg9bvgacg1ofis8ndnfh0csrcgv9f3v5d7r8nbo10d55c1sb9vdjk67ipkjszfhjdrd2pc8071ryxbnn6tlvsy59b9hu7z70o934p05bo8kx7',
                name: 'ii2vtnph9890bws8stq5sqff4or400wmzyflwm54ndxkeq446lnth0kt7nqvhbwgu16h9hmwa041tohe05kmz34ajl2jzz8e4k74wwb297rbb423g8u73ipj5qfbpzcjd2iclqj21snj7trcrix1vjyhlz9rtw95drzp7f02yi63cci3ag5jsn1nu3labnjpyfk3eiuoge3zdw5n6uzo181ycskwp3p0wbmp537j4ac991xaqlh0a3kgqf2azhmzhbm2u1ctb6y6v7cv8uazrl5un0g43p0xhj0jnpbxrbzs3gahcj16rxumim09ufo7',
                parameterName: 'o1i45u81ca841hkkyx5wko25ebs56acfj3sqon0mquh20v5uy1e107u4qdk5fud2u3lxfzc4sn4cp3pei8p41zu3c9gvbk6vtvn7wkdmld0cs69my67y88a0xexj8bkrj6gdkcf35ko7hvpvfj09tmd0di86609ygure9o4ksi2u92qpuhdtfawhoq808fd8knhrpqyrai34z9q8yfgtgj7xlnz64f2yj7ujvtt37ulc757alvg5a504ywpbybimtkdwsdcl3hbqv5keuiefqvbr137k7cwiq15bot5gavliftwdyn2mza8up1z92tyg',
                parameterValue: 'jb1isdxqxajl1rti779yxrxyvperfi0ug82r42rs8lto3kq32rqhh5vihinl1mwuw4y1c0162z01d32zcv6xfep1m5po00952flfaqlu2nm1f8oeh8iw2t0q7di219ritgblj4ha1r19q886xtpkrmp2fzduxtxi30nyr8nv65oqmfxsxt8u3sr2a56ciuee4qfmuqzcfu1dql9aqwfbd42108bs7s9m8g9uc12rb6i1b8eoc2npykscdlsnd4rmkpkyjq5lhsn7au2p45ygvu97d4vc43gn8rqqamp7kqej68zexsmkjcpoo6cto99mfo2tfe484ugaflnk6f6czo2xflbdokca6b672xhl4yl5319684otsh31v99ou84foj0xih0sw6a6xx5on05cazpjxcwcuwvqlm6rgt93qd03xwdtbxxat9o50owo5l3dpu3rl57g3oir8cnzfnlmxqf4dzue8k9evz230e3p29gqyex2do8iaberyn759774m2gq885q26k4oirbmcf4nboacohyy14t2ci90lk0m01z1w6whml6oxwiuwn2rmb30szmsgwj3yjvm52dbb7td4m2yue5hxlk4foe8omal55t5n3vk9i3644gr1afkkzyc78g7n7o4nyhqzvsutwn82oy57jujk4f6dz7gxlb754gjdnd596rjei1f3fbosiiyonat3w16ox9nbv1zdna5bbkidkqwjckt2e6qq2jnwbgvica9wz2nzonhlulrxay8n018j1vi10vdifj1r7iik2o383kt8aqsd4zx3zlfgl7p5ayazuhbfjf7z8f459lc3pijr3ypqcjmublal6v37pqp19fhvx6uaplh7wwxtr2je5bvlix9c90ru1ki3r4badjmqbijax7wdh2g803ziigk72fh76kurbmtn7fgwfamcdwzwkf05jg3p9274elf9v1yfw36yxmyn4aq8yf3hoibhoihwi23xf3smmaggiko3ss7mt2m0mer143yzp0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 'olw88vcks6wzai33wvtn3omzvp5lm4hza2w1dr9pflwrqngwu0',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: '7oh7cc42m7qj96vghm49',
                channelId: 'xmaiylru8sjfgsphrwhy0yk4xbubavd5xh366',
                channelParty: 'fyx6vcfym9v1cd0bzls2mf0zt2v7p35yig0b68i1sqrkcukvemiqmj67xsub6ejrxesptqkrfkrr4ks1vggmxx93pw0a94sr7pb80guhp8myzgsl0p6xhg39dss33moprp9e9o3rof6ygd4ngty3zur1qdrvvqsh',
                channelComponent: 'w860a63j3u47lgzuwkpq8kr2697bh1zahze9ue3o6w5fc0os65w2nmne0x76vrydw784cvovpv4a6bw25lvfdx16wav4y7rssq598tvxuerq4tno7icw89hviwkylabhm81cjbiynj4c242gecj9cq2tj9czdco9',
                channelName: 'wg3hsfz5hq3ew8e1j5n5y1svt5ih2gc139hxff41mg3jxm0c1uduox1x52yn9kbhurkar1y7v3bkvqsvsvg9rjnibscuoawa9umvgqda30d8gwvql33619rh0tiglp0acsf0qgaw6l6927bk0fc7f3qni119ruxv',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: 'twyr2mxazho5019lo3ye8f8j40vfz4ltnevp0oe99yn1sbt0azqx6cha67uyzn6ag4qq8dqdwlrjsn23ddycjd8jor9ipbzcfd8uu820fi99q3rngrpgl7u8bxkufuh7oxnaz9w5hh6n38ckv5vp7yhllvtvon4n',
                flowComponent: '0dcgbq7e6u9hv4i3ssv2myoxdgras4c7mq6328t6lzjqbr75vh002w6425p9z0lpizhipptbzr533dmibl1np0mt64enu130iku6ao19vdtindw3e25i7793hz5ggz7mb50bswdsho20v3lnd3863s3hx9yzj88d',
                flowInterfaceName: 'w82rxer7f8ppqzoozrbc66rod08mdpcsshk5eivsm4xdpe727n92acqsl6kpd1dfn7n29w0satwd996vaaou78rwo8duh0a7qusolvr92n7h1v9fuarv6b9f5av8wwos5a87vy2zlczr4m3ylu7xvgmqfneipaan',
                flowInterfaceNamespace: 'k8vog68gj7y41x1x21uwhrxkqlvz1c8eaz722xdivm3mc19ycecviwmrkkqhjxlxanuysmw5elpls2uk7bquzt3ir1yxnauv4sl442hdxa6nfa72idzbk8iv8z5ku0szdssna7cba7f915quti5w4b54lbpx9uki',
                version: 'kw6esldd38vjofl3xdwj',
                parameterGroup: 'wtql3s8tzhznrb823p21xyfbx1bv1k31ep133nh4f3vcs7yssix7h8uswtml938p16rnj8z42r60xs9rq8f6zwq9vzlj5su1argqqxdkbewxyvoroxq9d1l443eyjlfzcgbmypgqv0gc59iu48vcyahr8xprkssx9il3s208t4d0cgyxypuvgzzwk22twl3tn1oa9yzs8axt7ggyaaa0jbs48p80ssxke6523tvfbghld3sydahri5r3ownmcam',
                name: '8t08yxux9391wvzs1sdd9m2tyz7chys925ilzeucttle99xhoba1thgw0risbqhk4ndsur2yr6p22jtnlvmkdxhrll5c0mbg1zvo0wjcdljrngubhwu9q3flbe8jm1pf66u79efuwz8mjt45wgi187tz7wrcdbhkek0psz7290mq8do9rmtzyhdq9aougqv63iva638mdk0qwvof6yumvcdc7v9zydxxs9o69rgu40k7urow27w2epa6l9ee48j1ne58qicvr02xawsm2chovr901p3nr3hbgf6qbaw5x6ryh2volcaoukvgte3f7hg6',
                parameterName: 'zzj208k2piup3hmah9tny93qwef2hpcza4e4ejwaoovckknjttsclad3udfyjz1c9zids4welv9kj68s6r0u4fgt60cmp9wwcnnxq9sm5c2ftf4d88rnuap250ligv8praz7jgg70uvkwex6ql2uj0s411kzoycq5qqot5fkvmheyaa39pks7zyook58sfdzogdqywgfpmlk1sxe1uy8b8qqn9k0eslwvo0fbq0k3ost8bqcsobn0phipkm2cob6iq49gywrudncpvw9fngakrk4nf1q82nh7siicbt986ew1ps971mdnjvtmez6g7en',
                parameterValue: 'ntj9gml3w3xpdgc393a8xqzfypjy03ldvigjkqmn40c28rhy9ct3j9a5bkqd8oc6ox9nbm56l0im857hoi0l712cmeosqjj6rddi2yjzqpud3jykcmg6s6sbglfdwotwzjdy0sxz5lenl03dxcdbu4hvbthk3b1yplqcgg64tr6pndnuwy2gorynpwdfpfsi6ha3mjagdeenpmj0p91pgsltjet8ratzze6gtjpgqukq091dz3g0id7cejon77gdb97rjbjvtc9vz9lkwkeqo14u06iccqxewlrazfjnxpz5h41opc81v6lr9r32qz0ojuir49vlbck35n5t79j2xr56i8eu1nf1yi09wg4e9ozx769po7r4x0itek5fg8odynf766xpwa08xdsofnmm3n7julmc5cab4r6hbm28we1c1bonkzcq4yjgiyrovwix7nhf4ocbrk46jlk3snljnbpawotgdcqes618v0mwvslxm2ip4zfousvrojpmccicpl1lbg7yvd2teh0m2tte92m8h7bb3013pchg818bkmy1oqp6m9pu2301q0h844vc92m4vrdufg4sxd11lv7hehymtef2ct1a69w6skkcqoy9ba8fuj8ipcd3amrebp0dqey8rifuwtliy7yx7e0l7025upfu7h6kixttpywc9fymj6mid6rlevsyu1nnxpgv6orelyc6k7hnb4isuh2jc7fy3x82wxvnpj73qari9rmbpeca79pheatp540eqk9y1f9sf0p7681fvs9jnko6y12ninhs8k5gcadf76r894ncl2iwfjodw8sbl5yy05mojbex2x3o2gk3tws3zdgmgfaz2hihaqi8x3ksithhpbys9k5b1zj00nbr7g7omzea7qkm2yrggmxws4844ps90zs5qhwlbct8bh4bu3odf2ccdcazrg13vd0q3tsmusvdzaa0maut3lzpfqmpnnjphb1sek0xfaagmphjb5ohu12dyqpyqfudnj3yfxomuahn',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 'l8l66foppzj0o7tkcoxq75byvx9h5udf95fogmz4vq711pue08',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'jiqqk2u3n48s6p5g92nx',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 't8mge35f9e06ibummlleubyqjtvtfajy48ilxi2n199paeriu0a6t3nddwtug60s7gx5fo1k3c51egr8g4pxtnrib29d455md2xwyjmcj1xs4t50exowel17zx3zbd916viu6xeox8g07c6ackkdr0tubtgctqey',
                channelComponent: 'opg87mggzj19dptqpftf6phmhmndylzuzl60e643y4jln5mytjapupa6azh8ha260x76rxjoifjqyc5n8n1bb7x0qavn1ma365jgxyiuqxbhmyattwe0azgw2gzjaoton6ac1vj77tzpadipyx3n6jpjhd4q7sqf',
                channelName: 'uc7z2223g1iogtkecmwz0wqn217g7gecmkk1x36eydp4bbf9ynn1vpvv5dyrh4n9z6l6ickth24k1aocj1yyhkn3pc75a77ssjszou0rfq0vk6y1loshqleg24g53aioj3vqt035rzd78k4r7x9egq0afu1p7ngy',
                flowId: 'glttltzenkhjv3fsl1j6akeau3e0g9t08doqf',
                flowParty: 'eop2shj9kzkt5d6qfhrwm11e9ei59u8hqrj9nkz9k2405qlh80y9ykh7iatm12gxcei3bmq165tt9y3ql535you0umjs8dkkjlwyd7kamaezgiiadvpoegm592li9nrmnmpugxw4362oj18rj1kryiel67ym26d3',
                flowComponent: 'xxigy7kb5ouag5fa00k1el0uzefzgukf6fjlt3yquaw43si96y4oyusiips7bhyth4pehjyib556nsaeo2mcxsn5f8q0yuv54smy21me790z959wodinp8efixl5rgyygogtuabkbji5lia80y9ck0a3wuefl2zm',
                flowInterfaceName: '8inrgm8bohnmww82yqlaxwyt8dd6p6x155tvq1aajcpfh41kakg56wyawpyys8rv4w1q57vvn0fid4aw452l51d96q6qgrjvlrpwdkadaaw0e6m9y1xcg9s0qbyuqcwb2e6i8hh73ue7bpxzv51cwj3v7dj65wht',
                flowInterfaceNamespace: 'ywo74xadf9gf79fymblogua8ynktvd4wrffl7wyw73qen1thy15k01uej2os4yduvt5rrjbcujtdjm9hq1bc4jvh4pw3rf6ntoa6xocmz2o1dff4bg7dbg4r8gq5fobernvgy0gljkk3aokl1m9v6vgtucuffj0y',
                version: 'g5316etqbirrmyir5ywa',
                parameterGroup: 'ta8fhn4li14djq2kyv34vm6czs4szfofa4wmdkg1ctnzjbwii30uivm67abvbwwe1b8cexpicig2vh6y4v6miz8xr9vsvuhip739jtxlq5d0wsa0djo2knf4ag4jbkywi0ei9wdh1c8nyzmjp58p494ynxpsr4ngaidc409up4bkhlhhcl0moxhks2tytrqg5fvhgzpkbu8etymo3qk4bxk61ttieuqkdw8zqjc12q08v1mchmksotfir3487p9',
                name: '447a2fhvd2snpq5cxbybx30cbcudnyybqm6b6187rq2h4lj94en3ffwkf7o4rnlgzszfkzlnm7y6ylz5qiv0lae8179bkiht3dadmzvng7u7y26zpogz6zyoq8yskpw0qm3b31efv1i4et2owlgjn7xtwul5tc7rygogk1k3527qpnu3r5v4pbqjlm33cz88dee33prtpm62wuaku1eve0zc3xrxo5ldblpuu6f66buw5zzcwn6oiou2qjp3e96zozfpqc6svqfnn3e5xl4phshaoryf2vuy3a2ip2wzzhfkkk9noudjzff37zxfunsj',
                parameterName: 'shadr5z7gmkbgq7351zbly0u8xw0t00w96wnv8ot23w9oqbq8azfw169sqj0zi2refnduuwbtl915loap3wnxhxrzctrxymouyok4pyew96s2qs8aku82ag4lfwr0oiqdvq6zqlyp43uu0wsu3s59qdwxcfs5tmdyxry8c3pz134zxz2j3d3vanmjbv9ozl9glq2fomcxkcegyukr70lgvkfom4ce8u5enr4a4jaxj61d48lrzretjqq9bvdf5kl4644dphaoi0m7dlcai1ymrjaid036z5s2mhmpxtn7v5faljwbcjbcx64rjr9hut2',
                parameterValue: 'ruzfe1bhfiakv53489b4y6b0fc2cmbz7v8c0196kg4w5zp78dfxnsarwaavdkn0qdrmrkf794cs2hprwup1uprdnfrlwy66u271d9l6hpyqw8sxhe1iy59lhy2ooh7zpbjwcdz61gxigx9roq47sm8bh3c4wxir0l7vy3s1e3cywc8156raxxx2odtzoix2xy92dmcn9ew06j5t7ej7kyb7lxhzz432ngqd8jandgz2lg5osbqq2o2a2jgegqefsjiqg3wuumb2rcinbun6gap3mfdfkvn9vefqwh74zkdgeojuyp1u31mj292325tdm30uf1sz9nbp7gjpieaf3qqb802mnzq29eyza64igt2d83utxb7su3lzzqocv6f48fszghwtpas5fspy2lbpx3lvlq1nv8l4u6j17cyi92yj90oohkioq9jq0w9jrjccx8ueoay4t9evrhj0ka5d3olq3hjz4oieliv42cud8eluj6sldx4ywmyibaff179oaalcog9hcrykay6em3ofpkoeu73mhymsa93uspe1a16zxxs9tb6a04ty4aystfm2jq2dukh4zawnxi6rwwlci33qqd15q5lu77tjq2ylly1xkfumdi5cjc9hh8o36qt3f4jtng1dzz801jqefyixqb5l604u5bjkfjayugzd40c1rakux3znhb2ocp46j8ljxihkizfzplpe04b3i0sutluwt9txe6mumqpdzes2u9n4hcxfudjf77ha0o5w3plogjcv301gwzpkgwy5sdt3mz1jzbkr6phfdchwgcqs4z8r7f2y67afil6evgz8bhqqnld1o9i4r5vxrd29nsw7ybhki2yzc5aciyziu4broo1qausq9liyp5dwupl8js6mk9jlp5gkioufsgunntuenueg7bcsj3xk92auqhe7kt5ler93zk87x4kl2olwsg3d291grvavkl3aky0x9dd1yp1gsoi9rhi0uqpdg8fygknezh8u22mhehlvqy90gkitr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: '6wgn1k70nhxjg00w59rkr3g4da7ph29cfm1h93vs9ev2t9ozv8m',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'lwxx46f1rkgnbiikffcg',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: '1iy0s9c9v3s74w2t5f5m9zfbfmgd9hbndn5j5barc7zd9bivvmjw4ji7j6bbt11luco09j5rl04sq2qrwzknjfqpf09u6rmkuybarxo9bsa2f8o0rfepejsf3isr1i37gi22x041jqsu9uqstkfa1caphfz4xftp',
                channelComponent: 'bvls2jbtjgg4b8umlb1szdtrgxzsdinicbz0md4ac5gd2hfgjzrislozu4e893qaslk05av4va30il108dvwxo9aw65nronn9q9wwacu3qybc2bmazx65z3hmpw5qksyceht2uh78vgc7dg0khzgagpf7jbm18rn',
                channelName: 'hglo7swcjly0r2bsjpq5z16oc9sy6ph4bhl3b0hb9b4wku577xoxaxm8m465cn0u7xwjdzxj3swgktfulgtbrkewf74r5lkdqkbaf41kffzn6pupe233fcsxkafrwhandphmo2ao0f13cl2wvod24ddf1t64azo8',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: 'y1dg6qbg7y1o7joackbv9jnlj1mqienilfoi9a8znc8p6by325p9zn5mwxg9u7gd5pbcrgaxwjqnitzflo38dml2viefx2yblt6fub5plpzbpus2bj46obw92d55m8xxxddj4ss62u6xgtphol6i6dggs8fy6ggr',
                flowComponent: 'sjdsh3c0k81glvtul06nz4nghpbai146eemtw9dqzpook3qozsfrfmk4gpba0lwh7zbzv06ei3ns72s444dkfp5fanl0c0k72xdr01qsva6tws8u4g2acsvtknvc9efaez2jj3k3puwqqcxgpwkjxkgvajb0jcpd',
                flowInterfaceName: 'giw1sch3e5pcxmmr62b36odrqgdnzr8asuf9r81ue3tclg7i0mxpng9jsjvgkx38lij3dpfjwdgjlqec2mmsum7rmyrv40anqzlfjbv2j9dfqx8tcedxcvgfnkpdzaff8m46m4vnwr9k4ddet4jo0fm89uxpgt6c',
                flowInterfaceNamespace: '2rb5233knc7ws4ze6ppyutkodwctsk1d79yyg3afyz5nawkre0vtngs1pjgch5f9tf6o8lactx6jdp5t5o7ets78t40yhi3yvdng0diqni3rkw1v2oorf1oef9j7wn64so4c4ou5nqu062fuaw7808nux4u8ifkz',
                version: 'lfm0ev5uip4pc49ttr0z',
                parameterGroup: 'd4egq81yylny7npcbbur79h3b6zp8fu6ifdx52fcect3ds4cwj1x115x02hnyg6y8hwg2effa3g15wyrqso2m95p7176g9pmd4qjvioern9gu03sv6q85b3e5hsctp1y6cja5apv1blyar92ox1hccvunz26ztbyxovbkj2a5bn1st7xz7r4cfl63upynhipuu0mu64wmpqxelvlfsv8x0aq91h5tczppx7cg5iqeow6gayqklhxwasy8jiy01t',
                name: 'kgcs0c9rdqk14ar5phzx5awpjwskcu3a99kommigz20zq2cu1338fojj9fq1ixvouxgql6hcuk6ftbirz008d8ibpniyikeaikgv1q7gs081ow74gl52tujw7ufeqytbbb46qi6j09u94f9i4c331lauu3wz9xheg8nu14b5r46npya6gs9ckbzjv2tpmne34h3b1jcjyq18n7qmhvmmhakufngby9qdb5fspk2imwqj8voscu1eqe4r1om17ep342moihkecod0offr25xmtqbqu12r2rfgqhp4pqcko2qoq89rsivouqns4gsfogwe',
                parameterName: '3kzs1i9blidkdcttx7808p04ncb867uvh1z88t48fezscpicfe2y7dubiikik4iqxc8opb9kj6q8v7nyfh17zd0080ya9fcqgv8hprhnyokvgu3leuthfb5buj0fcu7jn3n1kn6zc0h3vzipweoy5bo32x78rnvid27b26txmp4t1cedpzzu2djpzgwx67y7764plm97ufl2yfckveq3r991u492qga4xsgpph7xl0tienfghkp9gxhnjha9zyawphiduyfnc7jvauqgyow3fsu79l2hwfr7237ny3mhhq45o1hgk6giez43xn61lka5',
                parameterValue: 'n03a57ipnfjm83erzmqnnihdh6qcaposdvpwhqaerxkm981n5z987tbqt5lkzmp43o2xcm63re2edxfwtdmmheowtybtjlubxjj9e59scpjclepbkvsdxc4n0bm026gzc52p4ttn6sofcawombnk9bvg6ms5aemwptra8b0moe8q5gjl85dhgwzkh9lv6h78tm6fbrh5tt1f87jwwv7vccic3ifyzr87xx6slpyyb7t1tzou9fczwidyrdlsxu1lbt4l3fzy8w12agb4mzxb3017rmomi4fvq313enc7oojcu81hbz4wzoxtkvszwmgy7o93zum6v0jwnt21cn2trcy7cqy1voad04sdt7tireugkoiau8umuwy8izo7txr75qk0o5dt35u46lzvixp0p8mo3fszc3quyrmph13bqu4kykmoc8ibe9d076gwytem2vlwyqthoqthw4hlj4kqq12f52efnzpq6k45rjmimndi3h5dz1871hk1neq814j38tez24uw3ik8011um41yjwbxhqkqw825odyl4itm1rgd3fxym578i5cpq7gnycuaw3twlpgocbawhysi53vl1y1ixz7760xzzt78uhbmz9aek6vabf429lfu4k8pwpqa6x74xgr9b20snc4tmkleqx40hzw3vnn94p0bpn7yox123ub3xe3w127wukh2by6tx1qd8yfrdspgqp6hj4k1rbu2j2sl6le22yruq3yyub124i4oye02v0woqh3m1wb4b7znvbtb7kq6ynsdlwha93qfdb2q46tpwrafphvjllanpi0cn92vge4uj3zlhdqg6f6p3cv2uvibr2ul3bw9pon3qy9ukyzgnv10676ji5k1sexhqmljc2in08amgixe2amsscdyurt9g9jlt2vd4y1sl637ho0q8om3euemju5zm6ge1m6wrjo7mfsg92l9oty9gjxjxyn3ar4sz28337leuezywgv015r1448z2e1dna2bn26fjx1mg0oeipo3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 'nbj42t4cvo0dkkrlgkekk4vxp2jj744riuie7vmu4rzgkfjdro',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'ldaosnfeoism3qeeajhue',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: '2d35msq3v82ora3eqzqwydf6tz9kxwa8yikh3hvyapof1ktsit692ml0zbkw4zxn9nrhvxxp9ju1os5hljysuhrxysgto6k2t0qlpmdgjp9dlt1h13273y9uzyvr9vvd7wla4p07daihnas0xxpvea9xqzm38cq3',
                channelComponent: '2h7yr5oh3pr51xyq73d879oh95zk5xq4owjo8hf4fy37w4173ql2l472tlgockcffdkv5jy79v5zjkpraxx50d36ljlm5zbxrzxwpi19k1naq8v99g0foperiwi94p9pg0wbhmg8c0b7qwb54y1zh20v2cc1goa4',
                channelName: 'byczxq7e0nmwa98zgmrgnkvzgoyh5a9hfy7ascfj0vzjl9vqzfn4hvhig305nkbyc6mndmv9nagxuuaup9cm64kekkdhyh7pajtym7zi5mgmsfn1l9p4y3gt5hdkccjq9x205cpvyc93tcqx21rh8zfpr9q9dkef',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: 'joubbaoqchkcj0l6dj655jauhtbn6jzk1owmffhivqxekq1sj7ahbnckci60af7lbf2h4w5o1uayt3rlw4ihiw90qcz37bq10awzatqcj87gmk08m7is5rrhdafy5jqpdiljqe9gbqjnm15wwspeziy0ibmtv1pd',
                flowComponent: 'makixig1uxxdft5ncuqmudok8dwp84076vtqfhkxpadyndho7j52uehi0gzb4r6n1aymbvzyh1sy3dfso5sa28uhtzc366wv643l9xwoqz5gwx9v0dwh22sbm9qskcmvguf4yahsdbxl6eqg1c67bjaxbcpw7ypx',
                flowInterfaceName: 'yb6cdg9ugq8v5bmjtfq05lfxhnx6xu3fjwtyr6hv952bbjjq8wu74wvvpxxgpltfkatod014my7kx78gdvkapjl4fg4tg5scncdemsjez7hwbbe1u77vyltygrz6sankp0afc9r9kful435c5gtlbaxt1ppbhcis',
                flowInterfaceNamespace: 'gaunagdmja97lm0dzbtjv60p3eex1iqmtz7stlz46gnr2vkcpb2c5f9qvkg6yhxfvqkz5g8y45d9imxoc1qqah62r8sltn4ocu6zfeijvr94tvaem23jkgx762ry5ngqmx3r7ifd4tje5p5hg2opq5ylikn37flt',
                version: 'vogg5w3poikcza2l6zsb',
                parameterGroup: 'c65xgrrq6tj5sbzjrn0bwpbgne6ky06npeqp2qqs8dngdb689cqbtb0fm2pd4vjklhbeie8uobzkjoq5h5pqttmhuj5zkz8vdr30j6o69xh2xyxqph1azntpbajlde8odmcog6utd6amgm5c1hbjkezg19xf1d9f58bp2srwpzrbbe2c5ykhtv5vp3uq22zzgza1690tya5qrz3x7v6fqnhk5k07w2djcoa2v9gs57sx76fl89sthnqvj3vc9rh',
                name: '9vnh1664zxuivtftwpee81pt9eg8dhzzkm4q8jack5mn4zak2ckep3xbw2erodgbpyzkote4qrnkjwzrolpxw7lmunjco0tk1ta4g2uaqbi65fas8ip5mfgajg9ln716ma7mnv4ptdt6d2btxji7x984xnaem6z7vj5m52ryyt7q2rgvs0dz3s8o5vkc68c1yv1mr3h54v4j1h8c4xpxka4mir2gxncvxnp9w2xg7rajhyj8rj96os6p5srzdebqjg0o6fr4xqf2nngktk3u0j7uhvnqx5cjru8qcz76q11utnr4wkml3vk8yq5ymct8',
                parameterName: '1mvy62eex7kypm3d5hs2ttm1tp536fqk0ktktgxomi6m9btq58fownkl8ksno16l1jdfhmaxmtokuilix3xj3y448arnd87by798c7cnisyeqnuo8psk3rx85w6hx0s8df25uwa7cmg2ji3fbs5514zq46as67ki4jwasvw9bpmdlmdrvcf5tmfytbqurvjqlsf3t6wxcv3u474a7yavhusnx6c1210ixcm0s1ypad0la0dj7znjrq37vnn96worn26pupqt867w9g5avo8zuonsb8cfi4qnesycpmln1netampqx02lol3xq2jqczyh',
                parameterValue: '3v6w2ls7u2ae4ag3hywjafcj0xpqdax5yb3t2srhlm5356ioar9ci57dqxi6f4jdr6g2loo3otgqr0od75sitn7c14q98i4y0gabtx7po8f2yaqc5yorppk596bbezadrw1yq7ft3ork2ia6d3vnq20udrryrhqh8q76eqzsvs5xzu2oz7mwkxjfjjvmccd9a3frampljrnsq4owzj5f7ppg72h4xwif9v0kikx0118djksyqe3oems4piex5dp35aigw9hykg0ugi1ed3z56m551v1uwxt2dkb2bkqtxhexhgp6wt4r6psucxhihoqsqtf8srunj83iq21jzv76739rtz0zf9z3wl2bdnabj9na6n1vsyckorta5sjabx0nqk3sfpxv2gvx98iaf7hyy2pmirasby3pd710wcgxw52dlotf9kw81npyr21pumwjxh0v3zg01hdon7dva8xszygf3ba4hjqimvjywq1f9h3azk1vvmlaf1mm94igrgqti74p3co86v6ejn9v81f2aopbblq1nk7kkbpttiud1742e536zv5kxmybsmbvz337id4wpiuw28ksudiio9p1iu4beu97nxld7w033gp3uhfufeggvtsmmuvk8esir0o3wjxvnn7dpsiljhphtntb701pn1pftzd2qh2qhyz3rwqsu0nw5pcc0cl7dxwe5ppb06x7h9i2ka1pm0g4cqa4n2qc0pwigg6i7vzwftskmku35mgl3ptiua469fp92nay2znw9kt1a2kyowzwamozy9wqaw7twfjwlg7pezwq9aluwxxdgus1jrygd4gpts9qyxjmw2m66riotc950dtylo3al9h8ra8tfdpym8hgohcoxnesvzs2079fb1yz90hnwtyjg80wt6hdiugh6hixu6md1icofg1u4x8dcqxdmf4ev8nkfpcxafxc4qvvddupkxr2l9epivrduy9l2w32bjc7nr4x4qatn7umd7001qbwdq0fmflya37rpjewq0l5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 's6be0xax12jyz02r85of34qdnt4vkz3sfqyuueffmk3r8fy274',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: '7eplog7vwoj6zk22git3',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: '46s9zp0vn3qlyt3bp70n5rhwoku71pijynazgfkjl68fla6gtzwkwtlh1sskgubvrsmv91j880xkarwiq5zf2iwbvhvr8ob72dcr02hhp0dcg8wkchxwmn1m9vf7txds7nvha61br7xzlqdcb7paz7paxl7ax26c0',
                channelComponent: 'fk0wnjwzloqovmba7occ8nzu8hepw1sae65g20w3723ykgja3bzdg87zlaauowjm101zc2flyix8p5uqauf52d6920z9wc65s2o9chmzzxt4tjxyp1sbiv7rzvtjz7zn5ers0gnlv7ennfkijjgjp5m4lxvmd0l5',
                channelName: 'xzqsae3jmuu556injafw6qqiu5k1bdmm22rujpyjdlx9cdjrljvpm1689nhoduenhs8kz665ltrhb1eg2r3iktesn4a43tbjwgo3kc561azxd7o732eolzhq0t80z01pj1x67ygv7p9gstm4khsoc90yz3kne13w',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: '6w8pkxjug5r7aelmf5s3i7xr7rdk64ezmbb7cgq86nh0vb0y9pvhaob20tr7yzlvgvqq8vkyjmsw3zzheilimc6unf8igycglgp9b87tfbohhpe2i1vphbplfag84l0kb09gws7yu1d2mb818s4j2ncafsqh784q',
                flowComponent: 'k981s5syobasytqnfphmbxg4ctp25ylo0bhje9g8tuxwdnjapylwayzkelnzjt0r1pxeie3s7y6wfqk7gkhs0qpdlv5f68shga5bfj084y4uhvejydbnxkq641riy7fl0d3ecdeq2onx1a2hissfbfx7qau61uni',
                flowInterfaceName: 'ahv1hdxry4z5mjra2l0bxr87beczg4119zetqvm0luur1s79tz3imk2xodhsoyfjky3vdbwmgwiiatppj71buz4pj0d037u95vxl4hl98xglcemf7yw0br0is8ut91fisx7hcgtmmdon9u2p2qbk3tk48mdgt6vw',
                flowInterfaceNamespace: 'y7o19r9xzs0tpqjmadaus46hsufs7rf7xskwpo4fw9zv7phjvgzgp3immupkoerf2z7ni2d2enenk40vjrrezsmh1i0ydug3qooqv1ctggoxl5v1hwg8brcj18743jg2wvjbg35e41tcjsst0uf4de06o1dsrh8b',
                version: 'ir17qs2tatae6kx5k81g',
                parameterGroup: '6d9keac6ccp2ms3h2xgxin17p3lj1yju5wo1u5auoqmaexlvb30qwrtbhmn1o2d8raj96y6k47tlxjazu40bxs93mwhpr9hwfn63up2sevrp6tbyo5kshdq9zw0wlcqk57jujjy68jmldsxzou7p1gbdgzli8ypoxn55wcec3g89sjfo2agzv0v9r5e5cmbavxqz1xzoyx3j4y57oo6n5lrhqvjfj0xbu5539ylx6xw7urne4e4nbcksnx5f17d',
                name: 'fngtuwcfoc7z08zr83q56qr2j0ttqzan2rxkwb0e9cbx59gpm3yqz045b534hkxfevyaye4u3n4e3inssstwr8i9t5y99ioc0kh61klr3z3l6js7peartlsno62yidxfaxn83grca19edqzhp1nkbs9kq1vkw6g29u2mk1ij0mr8itimqd1895nuxdwg2ksanl9ggco1zsxla9ff3ayf0m468c966ol2p3g9m99a62eilg2c9w3ww1vfgjqm9g5z8t35d8o9ks6rmgrzkaieigjurjjkjifv3yhj2iincnohxe9z8uq88uzcmexo5c2q',
                parameterName: 'rh08qxif0rponq12aagdktzu61jnp4kjshizjuxfpjf2fx7227ukuujg46k2a92vk9wuosab5f4gyjfwl46v6fy9hvaz52yokowdqzhtqa0kqtmmmopz5pd9pps7saewqfwvbb32wrd7u1lo9rhiveg2fjqakn6mrn60q8adyq343vd7si3d65smbv61psc1ma9r373ks0kfyuc71i0mjcs1qzspngdwftqng2ovewcppdfr0woi1pbeb7nbay0l39273qtpf6lshn5lgnutjakbfx8cfo74jy6r5lc5vdhhx0de95cayrzhemagljqd',
                parameterValue: 'skbo5ogzvqk2sl9zzfkgk82idlqvtai3pnoonex7bva9c079w15mujf51tc0xi5lqt09y1qa76riw9a7crcl82rxlfh2ylzx1n68u1hlzfcxfr00r1i2rmu30dyvv9p2tl14zamtu9qgxatspycw6smzv1u0psoe389be5rt7lo18pkit8mjuv2ipyaqiufiqv8dpyykevg3ygdwbs661t92pp8nvk2gzj6gh0go73xiry55lyhn3l9cucbz8h74xjpwdpny3su9tdoooln3goyvnaotftg5rdc161xqenkhytubdb0ct3dbv9q52du1v9q4mpkpr43dbts1xwy28mlwljzbtobkr5g2u0w12ijsetyc9gfd7qtd21evxk2m8tzh5cv8oh95mkimh17f2smgrhe8l2pjlwni426nardxxso5vupuc1uy5h4dfs4s3vf21aii5uvpeyb67iqn3s70o2mjayvbdp4pm5mtsxtwckup4dxbg4vifibbta0woz1aoqu2jlor4n2aqus1mnq4nok2u28y2llzivwku77hli57h46jbhx5f9gc58je5ujqmc7omqnj1q4g9uuwpt9y7c5jc5qrn0u7qz2sl34in9k0lrjuy7pw0wh6h77mmezvphqh1q2ugs0uoakcg0iq48v83x1mdmtwyhmi8lxolvpkofzlbt90i6xnyw44oiht399nkz8jgg7lqggu0kifkess50t3ellctsuqvghxdg2f94whqip8rebinaonmu8jcii3ektw6xt8yu7org4qw1qlpddsz07ozdq7eg5qsjvk6gh8tzu1ns0az3xgtwqjn16q8avhhqqeasbcoeadkhgity3rwcdmsbab7r5a5snk0hnm8k7nakujj3zyh2kftkx6wmld2nf59msfw9yieluchb963y21wvwgx5szuahitj0desos90d6olegmepz6lhjfpar101qt6x6m5mbhuqtebfc96h1its8shui8s60jlcwb9zp4bssiykk',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 'ixmpdaccwkshgwitg9ya9r9gi1y8shbdq9r9j8ovs7i1iyef2r',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'zaxd1gwpdn97ehim429b',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'v6208pm9eaodbkwyorf6f5v9fe9m2sxfbjwuld9q573yiacnfxziaytmjsm3lgiolfjlxu06mm2ak7acu5u9osu0t3eshn65wqrkvg1bcqykn6x2b3ieqktypk7e9d526hgzk4wingf1klub7innw9q4iuru8zj3',
                channelComponent: 'x6sn0z9624wql91a6xtmhhdhbuaksm19xp6m70gron3as1q26z6nbhj8x51h1pxibjzvc67p550aucv3hrmn5i9660iti9f75gztakt9wv57zetxg461dnjqsfykog0z4s0z2ku9pplr72q8p8oe6zdck2d04s8s9',
                channelName: '8e8nht3yux41tseaiaeyia5wpbuh4tu9mbsfyi7j86ycrb8ae820ih1i8ao9bv9qepgxnkx5dsnv3ud0tbpveoes93nc0c1a22sqafhyebkbcc82wmbzviqkk92qlufdful1u0dm0glnxwd72wmvqnoam8z1tj3y',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: '985glnriha2dn3spkv4el8nm46qfkgux488wu9f0jax2a4qivrojw1zyb0zy4q8mt8kv8fanfqjfuvn6egrd6l6wzj81hygwijrunv4x33qo8zr9l4inqbnu4xxtijlv5b8tavyd07oyjjoaok5a8n6dncl0d1su',
                flowComponent: '1qecrd83edssg85hte08i71ypwfy6d1eg06l1mf2w5ybkys25jpqrew10ytwehvnvcnmuild26lovdqv53052xoyd9gihevfqkgia5tyvuk5478nuj82k7h5x90yk68502pxjd9l824omoshds37zwprsnqlox9f',
                flowInterfaceName: 'hst9256ueavtqbc7ndazug941njuxdyl9nsq196b3g0j18jnp9f1kp2h4tfe5agmp8xonbuw99m3zulf5c1x5snftfpmbslha8cb2zxietw2cn6e37o44b511p753gnhbg3ph2x55letx47jv1dajatceu9lkqwy',
                flowInterfaceNamespace: 'y84ia1duayz5dxn9i2dkr9dkbrbnom3lidbwshars4s67qeaf2443hpnyehl4gd8qon3ftr5crkef8datyh3n3myt6el811k63ibv2b05vexgosnn1lbkbdyhg2e6e4bwd10xm7iwk3a731jm6ohoa2izf6aajhx',
                version: 'piqpojztp1wen6xphizk',
                parameterGroup: 'pfej7d7co52m36rev1otuutzhs8sso87r1ebajtvilvj2fcsrhdeke0tb9klhyvhhb2nfp231nqxv9qo8ib7tz226tro158g63rq46apmgjlise0yf7d86tmrfic2jag0tsjfpti7kdni1v39idhyetlla1gpfv3yygv27g81qqmw2bekno1c5h1sn5ap7thw8dtwsfowldvezhcluifuqt6k6fj70tjkrxsihlhgru4ur09c46o1finzruhowz',
                name: '4mq0r8w74ph9girsevq83paaalag26snucd3smtjwgs0y8oy9iku5cud2xts0u7dqz7p93mp938736ysf58k5d7wbpqflnr01hdt0whgkwxqrxoyt6x02vugr0cth8bvezm7rinl4xkpgvjq0ka8a9bosx2mjhhk7r6rglu40juxqu0k54mxuf2ujnm2w6m5t85pn4pp85a24nes3u6mjxmpo3i55xn835hg7mqjq2knwlapc5h6h6zeek33zdnf4dl8az3nwnl8r3gc1qytz3tadf8il12iavzamy7kkw42l9wftce8fd5vft1lsmur',
                parameterName: 're1ncs5pm9cfm5pyxzyu9h7wmdc8dif78spyd55jqxm11awc34e18xxhskhjqgeyb5bt3bk6iy2rrhjyuvr8amkqhvqs1hj31f214fe316cgjpoy2x2fsnm22qzuoik61h6stpdpkf69ddss6joz6rt7mjxhgyoovx1vyxgfr1r2ofz7xh7ot85eyd4g4owf916l3ub8s8xcf8cdvtu9ux7l5cjmvmzogbl81o8odltlrc9fuuqhsng66e1137x67uowqzc0001ogxi3ppxuyc5s8swm84wdqwpo2v1izzo5y04ilr0jwy1whil7rr5r',
                parameterValue: 'casuqo7x0xwpk7mpu3s2y2mvv850oo1kie5d5m456sbct1rfti8s34tcr8mklxh310whfr9sup5vp50m9dfgn3yo589t25ipk7oe87v4ytqf40l07cnbjmr7u7ylng72jgwsn37iz0n2i2h5o1ovvrha73odkub7iv8gl7ne4l6zwi4asulptts3j1x9q3lb4ghftf17ymzl9q0ksjadsiikrzs1r24tb2y4ekho6xkkmzq6lzqkgba0g8hpc7ntvw1r3ln84ww3ldxq4rmg9hcz7xe12m4598t0c077ts1milayald61fc4fhnjui4kjve6qc24pupzyzqcx3h18sci4umhw6f2rtdqqr7lk9op3g4ejvep2gkxs9cgvdlufh06b7lopat7b8udu1jl9wtvwqo2ortrp4xfrhecqrj61sr74h6pvhyk9u1beyk3eg574z4h8oz86yqrf1583uocpkmi7pgayx0wyvmi02vex4b4qthfwc9aib8i0gjyfbjtrt5xf3su6pl8e3qkb1fklez5vsuu925uq09upb7hfaclb5r10ev301h81jqo2e8p8kh0sy9w9c67wnjnc3d8i7aqr1678395bszucs5j4exy3k3ktjdhl2b2qy62ufa0wmj4fiyofue4v135oxmip7ogscnimjrbp4o85am8uc6flgka7526e4pzsx6r7stqgp2dse5tyrkfrixfeqqiogzqo0g984ievyw45nor5t5oa7tcr9b1djq5cz3w50lfdr42e5dgtf5hqme6q2e6kt93czctg3i6vm7iid3fnrfguj9d1idjpyhywu2535xi7t4k5smp07k6v2c3ysehy3fmwpql2q7gy7kwkcabagycbfy1k77fbrxbnqc0n0gyz2enrms7lw030vf0pio94wmzy08s4uaqzbnq345lc7xgcyq8ixytoy93onydfnqimk0316jrhife9au6noru7tgaqt3rg4mzkkxtnw1tib7kbe5bwmyqo51k46yi',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 'd05d50qgx1hoaooww940wkw7q5j9shkb76x7f0p6vjrgshi7oc',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: '3mgligkamobpensreg2f',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'ihim1xvbp7b7i24ytclgvrklpqsv4jz1qvcyao4hlob4uz24i3q29ch6e8cb977qbtbdw54fq0va9e0tbu3c9l2xo56nrn8k3gv1m9xzy1x7nx8ifgeawszfo31c9irqrebfgykyw9jyjoxibtbq107ut1664br0',
                channelComponent: 'cnee0qb0jwlljyq5ux19qz9689fdk4labyfolth1ww85uq5bjnu1wcn9pu9dsorhb3gvhhaaz586xrrml694c7vdwdj2cy6f8qoddt6bitcgipi5ytcwa377xuibwm8whxya8096dlz3h3uiwt548yda3hctsplj',
                channelName: 'nbymxn550z7zwur6ish6wqquz98lcbvbo7yiywll4rjnya8byhpe60i1psgye78chjb3609xn9x54rszbgoicqlwbu6dvde20uxj8z8dpy0of8if0ofm6fbw5pz8uqylf9bjnqfzsvfwgt3e6jwajlmo3j0fzcnto',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: 'ecihnxqp1uvpjycfgja7qxsro8y5p0t0yawkh8gx1lctqr2jcev1kkkxiu1f5589gffbs5versctzqo5s2563yjmsq9e40scb08nft5xddt91r17zpfvsw8bu5qrymwf49padnx56q2tkx33k2gbmhxzg53u6uee',
                flowComponent: 'f6cz4mw4xfackqkzm2rqzvs14c0crn0l47ivd0j7zs45xpgjdppj7fzsvclmbnonrr03ulq1kbccdtwsdvslypmx9c3nzgei0m2rmk52vk6ofjfzojwi0gc910j1pgy40h5a9y74adj9ytvre2auqlxv1ic40h3z',
                flowInterfaceName: 'lgu84qk6gu1vrb22eb89jpkdvnxmlf4xlhk76j93wcvrhyk1o6ylqomz5fx6uxz45u1chu1crsau69t1ynjdzos1n7nj5rczahrmtegv9s61zqhu6y56kc0at9cokxkiu7yu4tedeqbhf98k1hdt6zhdf8zljpyo',
                flowInterfaceNamespace: '7nn7bw435na3cp469ogz1x6hceub3m2sntxq8dlfwqdjt4akohsogl2ulpzb9ihvvjjb3n1q9owojb1rqtusarkh8g3z09ztl17yt02wgb87htn79w7pg59k9ea7dsssb8k4916x738j16en1s7xz6bqhshm92i5',
                version: 'l425kb68eg0kxcjswb1e',
                parameterGroup: '5c2ls4qt0h43gjam8i6gilfrvyw9ujlxlyrdp7eg4ouunou7rllrftjyel2yb2nhsxi5gmzz11ccgty0zve5tsbh3pr8d6ggid0qlk4ty653eig2sq7ws7l37b0y1xktos1rzsxu2jhcv60d1q2sggio5uvy8cy1agnl3lanu9iyns6ryzp54qz6f3a0uw6gxo0m4frcu6axtj1fjqs3syor95wysplt0hil2ccx6416bp41eovarbvnwzavlmz',
                name: 'arcqlc1lfdwtg66svx042nppamjxm3juyhtkkusseeolf72mkoly7dqijwbl0kd632df7rlcr8auznk2e85yqpw40s9z5e1bd3lngel5j3ocyhz2488vvuomt3teaa2k0vevpcwalssvrd4fapp19g7qhe1pj72aooaaz5v6h35suhrjjtn1xiq8eqq03inee2hac21o8svnuwz473zopydrrxu1n1q2ecu01kmkrw4d8p4ya92uhgu06psvvaw9vghb7taqm73b78nq9la04cbpyh8izip411qee3iwqm7zcznyx5x4tuai6rzn4hd3',
                parameterName: 'uf4xkfsfyvi7z11vnabwcghz0ygcvxhddsn2ego3htfqv9cepdg942k8218ypsekxdmpx702owa223dcqt3mr8xkz76nxmx0f98d3tcfl2w4rz9jbrnwq8plyktg1h6zukljwtyx8xv467plvsfb5z2hxsyyn9d6va9542ybarsamqaymjudqt9a9v2ayilx5v38j0zezrvpiwkqr6dlgbry3a05hpiq71kd39y6ohfxnt4inear044ut6i47jpyocglhzfeuohp72z8y10m9da8g9mszncms614xf6j6csvi24e70473q4ro88eq09y',
                parameterValue: 'l91105o0nj6rv2qxvft8z6ikhpnnsgl6yf4da43ondb8xsobaagdec6evih9mg3x78ge8brsgsz0499r6l8rxi78ghfzcyp2gk805rm0efzmovr6ukl6md0qs5mbyprknioxinciwoybflm6or9qhk9bu7rccajculj7qepvcbj5wzvg32855rxm63hpmyxzup0kr6qzynhjwd5le3nidg8w2eapqci7z5n51ccxalsedqymrr10yrvn8dct3ld6esmkr7a4p4u39ubq14mdwxjkdfmei9ghsc3h8fpynl5o8ibeb3guqzjk7sd5ojk1vkyvx0xq62m14p4s8l045pojhikzufk9whyo2vrppr6mfxdjgak7uamlg3sp4l9vhgqfr2vvl178qykjc1x3u03026hvy4wywee103oor3eav721ee3xhq9ubrs8xos5ed4vamata99qe64neeosen0uonle6q015zowi79wo5ijsnd2173w7craauuzvpoyjih9uurqtp4l6h7t9bv8vn4ufkqanjgnnsbqffixuigmbk2axz6155an1roeqdssyac0wk1zj8vpwwzv382w8vakgbo58u2mun7nirng1lvfh91end8p7kk0hk7qkkt9ei30m83p80igmrhga1vfcklcyil70q8kazef0yjog5s0t0ztdtx8v2s9vm68y4r5i7hxhqlfjg6nexunopyxut2u6c23yu2zcty6uaccvm1yl4vd4htdqak4v6t5qszyr0ob9wf5ducdjpt9vi72701vp40zz81qingt1pctftijn4551gm203z7gisdo1iy5x5prj6wi0153duwgsx4u5c8nsbxwdakeur3g5l3m84cv5410ap6xvq6sbls848ksu5fozly54ovaehl3g9ttm82vz4450xjd1gozucdko0dzty9jpx5q93ckorawl6gc1npt972vlsgler17sbcmrfkrjdtvn4cut1f0jbd103spa4b1b5abwikef6im98g',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: '10o85bl4aklil3zl687lv0rny1b6hbneaiatleqw67zgfhcryv',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'yhp4dfsd3h24a42s3yg1',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'i2c79e5vg13nqqdt510mxgdcszjfsgyfybmk861twl2ap6vyqnzvs4d7rg4wlnd33xdqi66ksyzpvgmzas4kziqo710ixmxag8kh3q1rx5e0yi5r0tpza2khb4bwkulga9as6g6wx7h5mgxmnk24qu3wazv5eh6l',
                channelComponent: 'hdsez2uyme8svhrx9fuzk5y7h2ne2426o0mxqnqh9aexg82pnjojjjeoxvgjpgqnc3214jc453xnwd8b75x4yb68jqrrym9ii94ffffv7i533fx9u8a7ynmnjc2babe7oovcdvwmx2nntqx23n6v3wgthi2yq28a',
                channelName: 'cihp26gjf4juf3nkq3ltdorqvbsbs08ayqbk8p0uab9sawv2okgcyemwyyno5wj3i3txjx1x4h2006ypnq6ec8x0jyfo1p424q0v0b7ftx8dkuu5ps9q77i6zu6pawhcxycvl4czzaxbfw55uo2hdmplcvndb1ri',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: 'hc95cu7qufcfrgx13bnwle0xvis5vozyac09uf2hkij1p0wql3znshzoctfc5osmgcdzwngd1gj50oicgfr4jn8isfrfpi7wkcagkgvbvusjfqurvnzd0wcubzrgimrekn0ik9momausidhzr5108mxk34sbnt9p0',
                flowComponent: 'dff9xtq4gsoblxqraeux3qi627hup1cnxir2ojjesxtkknlm4q15ofjtw9ckls9c1p9uonmizij9llmka09x14mj5zb187uf5xmyhc0mcvacplgqwnm6tjjcrw9ldikk8wo5152tlwjymsiu3kowdwak0105luvd',
                flowInterfaceName: '3662zumelrntwnwdn286zmu1zdr1mvzzuzvxfonv0e9oatpuig9mg2ixds4ga70nzgtoarb3j5laje2l75213o13i00s2l1zei7qqcm5t8ftrmxfrjliqyu4568fwwjoby629z6z5ghuq47px7lmfpr2f20feivl',
                flowInterfaceNamespace: '1kt6bft0q22arkzcjwhmw8gvlo1i6amglubtygotdp2rr6endq8xkg4g2hrh3r2cc9hp6qy279b52j5yuvp513j6v911jxzmquai6215s8b2jighgwnc32z4e49emwnov2pu4bfymradcj1u4pkuta2xfky4470w',
                version: '1wlzb26q1tbx2b0f6kj5',
                parameterGroup: 'o7mwsz9f4j9o01dnjamwem1v5g1uutzbv2wiv2tfcks4hgjle9tepj54z9j89fme2r81bhktm66ytrbmmjns40e4z3nedr0o9zv2o8dw897w8dd7c8jlaasurh3wtpo9g5sm79bedvq0jympn5u5l2k7ct2z60k7pbh1xgno5tjnuv98cxup6d3bfqpnfh3bqkzs9iqigex7mgmtu6h0uzhebhdexqc9u3hqbj4v0me47vrptvwyfvuq3tj1y7g',
                name: '4z587iwey3a4e03dx6vz7mmundk34c9yk57b6lk3tigc3yiwc74f88pptghiup1kd6okpbf3xxusb9z3fkuumf9mtdqvok1kw23envyl5cfcf8yykgimud9qg166cacus2ztur2dasyzzdvf0jisubpjzhlzrgh4jl0p0yzm2z2vw7rt44ckwz4cfi28kelumwgqvxoeeblp83tjtnzitds478iu2p80hiaq6mub89o5kxsj91z9ga5h9kumacb9n17ptlybjchdj18q74etrkwuuy6h56nlt5v13o0r6a81bw6k1tjtdy8bg3ppk1yl',
                parameterName: '7aeqj1d6o6z39i6bvh4g7bsr1uwgx4t0me7855qm95ps8pu4dliju5dcswnh3jq40h3lguut2uxtib1fzbzvhlsaaxuy5mpbsy5xtojewojbfeqyc4toiee49z9zoolp8csftnbvq0myk9qww4wdeu3kl2wcws7hel0mh30oirjtbofofywi0pbbwlfx5wk7lhhvfvdq6oqes0oze4jtqdwvzjrsdbw13hshkteakt6rb56h2i8ghr40n4p3j7upykqv4906jn896vwk2irykx78s0g4y2uwg56uj84ij0dp4zxkpbnvjggx0iv86f69',
                parameterValue: 'k73dlrscpa570jr4rsoi2ldbeh0hmaccyh8felqj6iy33zn6umlqgdswv5nysl5jf8shsh97basi6ic5v7se7d80l210mywr3uq2482838wvktabz09ses1incxlltxf3iwxijf95u76n5vfjuh7v1m9m3xen8p6r13d1f1c3vxo1vqby6y2gu8c62sjpwzirdklem4piwxtlvf5r5xo0qr9usxz16t1ymvnlupqct426sxrucxhrmsm68is11dyhnxkmov6u1z81x6w73637ranbrtainvzw724u53ng4cia9o1wkssxjpparvlcsmx1rtady5hxe8ahn0lr3drqvyzql1lentgm9nrsrs1r0ltl8i9mwqv9lfn7w6ycz498lhk0en7g130b2z3i04dc4gutjoujnrexqn6z3z4hx5ttq0mjuvxa3yyvs7qwr6a93lsrvy6jycfbpeboxok720go1i4x3lrima64nq1a34g7tkui6uaenc1opr43bgyzl0vlhq7j8zvkr8j375wze2x5c7ezn7wmioeuvyza93j2cl0xnylzwr5go79papwagxpvpixlaod4fqvjcx3wa0i8a90gugiah2jltzos4meimhxptnkvi239mc22p1rnaa2xuhhjh0fsjt809i1ykcui01tnxa2flkq1z5ggm4zoq7wbunosxuai0smer1cu9hmt5i4cccl07fyx3wh3yrn9atol09f65k1gk64949fd4o2l5itufzms82gbq1i0y7keszfkxn4smtw76bjctce3flgh5hi85fb7ga6opicj3o4bii9pg7xiu3vy72zlbdt0yk430ktfkjku9733ejtbnw39r9r05yyqb7fwx4vxngzqn4742d9ukeh1hrme3xj2czamgl6alcakh59qyeuxguzq4kwqn17thenb325e6ff20ra5164g0ehwovlu93o7s4ei4uxge9lyphfpi9qnmwyltyl60ebd2m7uweubog5m43xw4k4103d3839',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 'y9kw1k386kwt4acy7eqi63v8u6gq06x9lgr673v1ou5747cxh4',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: '7g8r1dw16y80syzba585',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: '31iyxrgvx8qo7s868hhg6acfjpd56ct8r7sy4cwbslden25n3b42spntp63od91toxid1jqy1x6864lwnhptpjvw9vuyqq5j02ddw5i3s4k4bput5mfjire6jmbhrtr168po6zr8hv78ook32mx91b2t90u48d6v',
                channelComponent: 'd3m56qlr6sb2gurc6j595fbjx1xn2k273whcgppxiu6mp3dgc324s6fwbu72hrzgvl6i2esuwo40mtb4l4ohltb1ca8z3pcutwcqy07ggsizdyk419p8oejboelgivdz2tm9d5lbe89advpy6ff7yct8wtqer4sk',
                channelName: 'f7nakctlqk2b75fwxpjgzcj0l4ms6pjn8g7tqf06amrq3nw9tnqaj3hqjbha914ni8mxac9dlf7qzvei2ib4kidroo0thznwpla15rz85fdrwfsn6zey4mvcysduaxxk994bqnrbr2u3sjyqyda70w6lh7nowk8q',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: 'hfy585mormh8wyzpupmovy1k7e81do8x75l0dvu32irgps92gvmqqtqecxknwofid40c54xf42j58tgo7ahj97m87g51g6d9k66bx0qlpm85vw2ssv14g765jchozfqq9yggkysxweccaalwt1iyuf3hwrgrx0to',
                flowComponent: 'sxbfvtf7n4m4472lcb9aehginrycyq71kxeeqirfk1gq21d0u185us8y2umaxwmeot4irlj8co10ff66z0k3w5wu8gnr8j94pnmu6zft63j71665v7h1xd7p7abmlpptkeljbx0vm59o9mrdc11jl9393elg5ikab',
                flowInterfaceName: 'j44m11yorr2nystwdw4i29mvjh7gthw9w74f24inx5jhk6zkrt6gn59nd5lususlsmitd4vz96e97y7hk91r70b4xgandaadaz7sps5qubw9z2kwhvmib3x7gumdzrhv7gar1jevc6992c1lwc87ywi0kf1q2bru',
                flowInterfaceNamespace: 'gu84wuo6n6hyubcseso6baw4etv4xdaw4n9o1002o7zz9cu3hes164esx8xi14p8putbs9e49cwexrh7sr4fnkxhkz2yrazgq5m7iavmhmm0fxgeuljsq2moouaf55q7zcbm992q4r47qt0rfp3rzx2n2l9823uf',
                version: 'ye64jm43wyyolv8ah1xt',
                parameterGroup: '47qy8ry1oxnnp19osewqhng34iio1iinoz25dja0erpslwh3lw34m87r0u5wx9xipqi3s5vkoa5y55rm3a72w8kv7yfve6e6hsbh3fbj9luc8gazuimlclq4rmm9tajap06khzsemae4jd0eg6xjb78o7s7pddmsn4kjyqy3djc6qobhmkioar595gkaam0yfyltapihy69k4wks0fdw3v43brzhert2ch5xxah1s6c9196osaoc6yjncm4mf7s',
                name: 'hkn6ee8agh8rs52oovz5fsi2v5ijjpciqw7tjalcyljxq17d2bz9dtyzvr2d5y26qkdq70y2uiqlydg8tousvj4ylzsxxm48ihefeqpiszxfxnw67j6hen6592gmjeq1i2od3li1gzgwo3k60ziuzt74mc5tnyx0xzj6hke5p72f4vnvkwe4ptkj68bjwk8fr73wzl17rt6eeh69773ipcyjzi9w74hzp517zpm2tin6me5wpyipysvgkx7ulef623f7v1lbbwth6wgj73fv8fjrdh3gcrjgxgpn7l8nokl9gzbnzbz75no7mcqta6l5',
                parameterName: 'nqmnzv4trqvrr8x23o3natzx5w9aoe9egup06lb6k0fdwe74d85a2r8zlw23nl1gfi1ur3etmkfxkczpf37k0aw0w0g0gj7670bnbknhb4nujf1bh2ndiy932mi3z95g0y4o4mm0wmxbajrxpmykxbxkwpdling0ot6xeq376t6tell3cnqiv9vk7mfxde742mds2alsihlr6wpu6cm3c1i7k4pq4rc3svvfk1a8ma2g6drgi2nxod5729m117ukd1kvja39qhi0sdzdlpnu3ukndu976fwmsgnbb69tje3c6cdo2yh8pns7k8kur3d5',
                parameterValue: '4mo9g6q6qejqibyae3kfq0ymjw7x4c2cb4kuxjj4pvrjihiitgold3vfhxvwl6cryc9cjpw6r3tdka78btd3ije1ir7shsjt6w621n6t7wzmrupmtgp5kj3avtbfvd5tnpkgk3bznw56qqghmvtnrc0ahwghfpytq643ic8m9szux8bq0b2kc6kaq8pvth0q5j12rjznhg4t9lz3nnbcnfws17o0r6d6j8wjqlsjzfft04os86a2qbbfy6r4yybsyoqzntl1j6gm8wno4koeyhfjvyn6b3npnitt0pddr7e5aqoolnjtaglkvjiyh1xc630x8yinbkxib867sq9ubgrj0mpo6j0lpskdt28qkxbnj3o4v9ii5gers6022qa9tl7okeqtnhat40yuv3reih0dxht3r1xbt6bl74v317er7xkbl3gmpi3fsrfobln5k24485up19vbqj9rbrxovbomip6q7u3kd6jaif6l09rz2qpptbtobo4066h40e5p5jgpw9ladg93o11z8bzabxxbe22nopxewmafarlepywtjg3yeqxqc350ovwzk3uwplelyh1ehn3h510qbxzo8qd3cey2tbuqk71x02ii3lxej4mt36nl00b7umtrj6q2wskq1s7t0ecs6ozrtmcm1cdwqyswaqe6cbxmw2n8wmq55t5mkptuplaobdhmj4m9p507z3ifl60o8r556pfgzqvcm7ebwxu040vo166amj8v40yrvpbt7gmxs6vrk0dq332d1mhskhx6p4tw4ojjf6bq3pntzpkjv8eozesd5ld0ckc3ce9k8q4840ktufzp4y6elsmjklfdxjpegme2bsgkxcz7gczqz0553ex6flsf4r9exk148pfhpareeep4zlx89t093zpamjjewmr03ttvtwvlsz4jkejehfx34csot4mygormkwde6r8q92s4mqbr7f3r1iqi9sgpyb15jx8v7di5u71wxa7jlx9mliluhl3akwpfbv081s47kxcb',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 'nz3szmwfbux1f6hgb3kdsh2efg4rn1upa1sm913l6tepjy29go',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'hntbf9k0o3zgibk56ldc',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'w4fciqa3tqjxslq5i0ioup84t8605017qtjy4be07ynrkayqt9u8lxzkk7rogfccqsbgeheir34qavjhs08o7cy8so9wehptjhxvrccmvtefecwo7qttg4sfa1ntsxfz2zxnhi0gzuxjt0op9574svxrmt8ag6nh',
                channelComponent: '1l14umsqxkj3inaxx7tojfvocz54kdvu9pmv58173e4hgwn8ehd90nh8rlt8om3vxml7hhzvyve2nksg55mshc2tut30ib10gvqx7ds75xhi0b9o7barlessgv09n7olts5v7g8gnzkqvvzqda99iopdlp2pwcac',
                channelName: 'ycpzo56j1tikdbiyynjbsgt0wt6qvtpbtrprhd64ktawvouh481bozfyz2uz6luzfiywutgp14bqvnklrcrfspgyd33aj27fz16v4m5ptffx2x7g6445dscsqnyzd049ls4tnhtpvx84b26wf9respadw5hoxoa5',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: '0phv1idmwe8dn3q0m4haczlna22s342ccy7aa3hh7752gji3vs1auddylk5r0czp8poxga3k73rigvs17uchjmgeq9yteh0kmhqf9r7ffxs38ntm1tbi31q0j9v3fznjyoec42wyc1tny4fa0hbhbpem3m96hz3b',
                flowComponent: 'cceui13896uwytqqrog2gqub6rew8d269km026bhkulecnlffanub76mtoaiemjbo4truq1k9da32fo02q600aiax48qc3r67btol52xo7j2on7uc9gd2xi4vo0e4tmmpuv74w6vvwzhowynx913b8gpy64opnlm',
                flowInterfaceName: 'fwpddvm9q7cy4t6j563x9ti0mqemnffbrik78dkp4aih3tgxgzra85pp1zzm7pzqracw8nwg39loz2bmkj4dbd80ne3x8k66ohf97t7q8czl1w1siga7oicc03mxo3kjle9xymszscxujdf5zmuwutx8pg8jd8euj',
                flowInterfaceNamespace: '7smwq2r4cch79wsqlpsngrk9jbioidhawsg46y7k7qawm1rv0bh1i2py6u1zi5qlm72hy8mz1euvgbs22fzlb4mqtqjgia88l2nk2qkzf730jcl614x9b9kpq6zylfxbajhwwmrdq2cvtt5cc875c8kw5ua2xmj7',
                version: 'nbrvcjwkgynhftevtgpq',
                parameterGroup: 'g3l0z01z7yfzkcyomunm2yhug4sc5sc2nlmv7afb9bych5s7tf3lhjnla7ua8guby6cki5ilmaeepqobzjof1sufz5hm2p5watvtg98aq0jupy716ntnnb7u8psqd6tgchv929gz49xjytu0xzcc38df4svsb5jor41940jdxnr8d5497sf45rlzwje2omwarljdw4wlfwsw8okup54bhf0hp3ke444lm401odbd21xgdzh49s1xpe1xiakmyqr',
                name: 'r3d3yrdaiy922pn221nf100dhffknkqrhrg8d96pdws55ybysm1vf0chawi14sgrpardgwg461waarvds8syde3qebf8td990wqfky968o7mk0ky91zksj4gcafzn9n0nzh8da1fenk0s20fuxg5m3akjjgzdout4b1lfcpjuuvrusolri3edyi4fo0vc5n0k3kuvfby4fvehxq8xuol8wppols4hi91zg5p3x1r6topgsfj99hcelkm46px4q7497lvu9ep2flycxalh2xt0rx6e76d8a8wt1ptbia8jw7mlgh2oxxbbe7b4zs4j02h',
                parameterName: 'q9goptuww3th9ceqeimyd85qgw4ol1kfve6pqjqsr4l61q4s9s4cbghgzlke940g1pacq6b6fh7m0gr12qrnkpt95zv122w649wb2m3bjszl2p2sw6muyud93w5kjgpc57isg6t7brx12plar4rrbydd78yks8cy33mwcerxm1mlvm7xkwok57bqva6kx6ct8094ghd3pnvhv4mh84ke31aaki0iqctjt8x1olzc9jz4d1rf07zmtrhpbon5h5dy9ffkk7i46ivrcrxmxmjxdhlim1ghnk53rmn52uee6m8rkwi2iaqua5xof6lpohon',
                parameterValue: 'o6euoubl40on2mkstvubvm70kln5q8xwsypy97ywwl9jlkufrfb0dj1eyktatymyx8pdi6h5l0fql7nwkrnrhi56kpwhpd0jeu8niuvmq3joscv0n5mm056q1n1dt0bqik60f3dy1eemw9t2lexpudosmrandd4y7pndsaig6p09k513nn8kyfxbq5ome3xzpjrme3iwkwdrpdlwazw4ir3vjndstl364g9xitzl6kpzrx95y7012cypxp9zwwgvjdrp0bxkdv2mt2ipvx62pkxap70vg9jq30emxxyg24lc8dyp6e3jkmeo55uxcanqiz0zhto15qp98x33jq655o1imb0yex7vitvmr95yu6zj0a6hg2tr5t6q1ndo3xlnv8hch02vckizdckbgb2wvihv71pt7mzqc7bdzfrm0qu78r1vzb27dyqz3l65hbbm53a0x207hc2abmmfsy1p48cta682ioejuqvon70pcvnfjeli8oqwpiu14g4zm08oe7tmx6l877yai8q6xs9n10qo1yp7lllg4qraqrvsfirxqwmz7u0n8btubbepgqwqtinijbrdgkw6ibzw4dahq85e46abuhq7w5862e81ijudb2b1j00pg1dgpqwuhgcl7n83mkxrtsv06rerm76mv2hlq8jbmcvzyy5wfwmdudeludaw5d9b20qn5pajovnce52d5jrxose2q26mnip0sc6m47gwzgwnueev77be2sjjr9h8qwm1amwtwqrthxl68o2qm7qnidgzy2lze4prwc0ac9pi8uo1zajsvc6z0tk5hi8lehjf6wzb43nst56bbf3exluppsgrqmlafgq1ku85y1rv6qku68unlwrqgb2mso8vg5e4evnkq3772w7wb2ncm3am9qolw5xfzw1gswd97o0fqlwk72ol3m5dlv3qd65aqqyh3411lwbb9pamcfwkh35oiv8zuaig6l8t7e57l1zu2fbpsblxb9nf4bmdrs33j7dkvqu8ww82uwr2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: '9covzjw5daw26q4bk4rkwx62mharw6cqip8abgclaiy3gqgpm7',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: '6pso4kmkc53kcnydo8fr',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'lz7ywlf3jg8fxtm2qowln15xcar1rlq3ydgemf748e6cg1nxs0eam597b8zhfdur03wgudd3qqrwt5at7pkrtedjuk8wj4u6f1pef2j3m1ob4nioz5f4gplx14vhzbkzgb512iju7u6t19srqhuf0wdxo5fd0tqj',
                channelComponent: '89oijs516osu7bdiwyxu3doucunkcvs0n1t9juxe5xfgwcrfx58ir5i1ep42i04p8wqfocj4ehryai8q7gizemimf49586jz8xziids6puru8n82l8fmffomopljthole5io9h4migokgwqnajkd2tqd09xdc0f7',
                channelName: 'g4z50hxio29fg7w2zg8swbauoaxo6dyaqhyvy6vif5gxbrdct3v67xsauunfujd1fclzqxr2xkg5rb28nhd7dodm5cjbekpfykexnm11323iu5c8jo9ikh1lhhibtf1d1monti1y66xft94ppmioatt7i2ze41k2',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: 'si47n4d2bf50axir0s9576awe0n210gzmyby4fi8cg1cblwkg9fjx2mmvnp91fw28txv8h29vs0x22xe0k66qqimluwspy922svyxvj5va0ajqxsqomz8i52xf7ihq0ah8kzt10d48qaoxbijs9vpj3vvt6hbejb',
                flowComponent: 'n6m2pilrqweiho7zmgol1bls4ba4v7i1jxo4fh09yipahgnl9adxb6csjr9fbll0wx1rycj3bj4offgj7j8t2odla0g2jocf8eckyg9f8qq9zubpw2dub92sqsyamlqs9xz58muurscljztc2ientx6wodtpb088',
                flowInterfaceName: 'rbrx5prwbblinw7fagb115yv3y48vy5diwu9smuzo4ejloe9oybhvqy8p8yjzrqgf1xxrzucwfxkba3too647fp03iwc1edfrbm4g4r482tya3psoswvgavsoljlftzf02j8wvxyp3pcj12v1mb8011ednqgcd3q',
                flowInterfaceNamespace: 'ltnaz3xcnmkjlp634rxj7awl9v5pxh9rpnccd0gzpux8a7x14k7wfjtzlyfyri67135ctxoly618d5svb86r573bor18ekskuxqitz5bl8kiv6d2hzkpnhvfnck0l8qgi3wxzvv1vombqh2c2zj4rol9pl6hlrfvr',
                version: 'qfbzafa7zrf9j84f6riu',
                parameterGroup: 'rdisoxy24mt98qxlmzvtk2766g6jg3fc8zk1eu6fv0e42ltjb2l8xyetaw0j8w8ipuf038deegksny4gzhz8lxi1dzfuslt0hansr7f7n4r9elir5ji2evthzsiebc7gwdf6cgqiejegyj1a8js7u995p98scyso1toqbz24z4j6yqafbtbg4uhwj4g1mw7fnb39b71eqhpqmxgfby26pen2fiotkigbxffibk80940fbqrcbnh6zm6hgkno20q',
                name: 'xa01fdv8uudstazkctei0k037xhdjlmba19ns6m2121g1svvksu6qwjd5w84xuhp60huh7ehjltyn89y5arnzufwk6rabbzsf8q5tr6wx8wva54ur7jpion44ngekmgyd4srnmoez8vccx4dgtw52gumzgc70ytt7r4fsjmzdntc8qmy40gq6fwklnkla68miw2fv8c8ba7ch18sxeu33a99t2z7tldzh4e9eysv99u4mjv0k4wqiiwfk1e2ukfmfugc099how26j4t3mebd52ind326izeggaa84n4x6i86jl0kdkwnnfcg4botafmy',
                parameterName: '0bgelik2mq0u0mn7jgtq8egtgivmb92m7q2klm6e3i7zmpn33hmw5a7cb0yvfc9qz2vijuj9jte61lotcwmokuw9lar0vpb0uwf28xhxrte5mjskenhtak3gyff7rphby755fagi0co4bhz31b0wy0bho1ouud12fh5ftcx55ff2yqaia8j3hveqymsqfgbkovzcyd802db6pdjqw96dnvmjk35m4z9coe3gu8zvjw3yxqgvxunrnagmhwq8jx6vycz8m9vs3v63gae4s8c0ld3m0zyuwi5s9rji8n8f552w9q75bcmzxz28xz2ac42x',
                parameterValue: 'p4wz5os2z8oqd7wp0p9xzz1nshxy72frume6p16jedmtckp3rxc5pggvwxtrtncelzvtammxv974o0vkjhclcxiqhpdgxgimpp4y78hyeuj12t3ocmvdw2d5fw2pyiax1lmmlmnczxvf9bsup8riz7vinhsi2qvacb7l2yiaskvqs3ifg8pf3zlr1tw90mh4obcr8re5pe7olhpq25wkesnwu89enixulpgnu8iygo3kaui2vo6ql57kabu9bjzhqni1xdsh71jfx0d29fy324lafg0jvjd8stxl4vxnjxm9kjg9fiba22tbva44tc7rqcb5zpslni2v81lqks5cekbmgpoac1vqeb5ark9h8fh99ufhckgbcxqnwg9ja5wyv0r3qmqjs1t4yu7m81m4lxzkhstq55uludlhkaw0whgaxbbyhfinuwi56hcng5rds1zf7renk3nkqjk0chlisdda53mynxgrqz1jfv1wpiy2gyljluj8w2r2791hwz7ddclo96jtgowhnc8b4dcao0j9t8bfp7lweote0du7v0ole3xoyv0bu22kgblg1f7gbru7p0i7o7nsvwpyckj7jpncxfukoyfbnx2gnx16s0j611wlw6kt8g6tghpvepyv2mwu4cvbpbupzn4yds8z3lpziyk0vhgtndhw3m68ed1xi9pbkljrbrrg955mw4q09oyuygsquhc7r7hji9ncifryg80ml41nymvq1oqghzw26soxr06x8i36gcusf55tycuyflsczsyufjft8ap89kuy84933x4t3qc0m74finyo2fgug5zir4wuc1e2mfevxoi66zsawm5z5d47ejwxz8j8t8xocxl9yt69me6sdow99ojkfiwh16n51gppemid3xn6j2ur9jhcpjusg6v8e0vmtfnv0fgs8b44g2mkjgylbtq498yxqjtm1g8msh1ljt7a4ox05l21jpcsz4vyzlqth0jzcmte4up7k5oghh3py70b24lqdh6zfzybyl8r',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 'bj5pjk6ypz6wqm9hy5m4hn7pxxmn6ub5u0y9mgwl10zpmeluue',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: '8nhmhzibb6jjnytpwpte',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'yshrq54hu0dwno9kylzn05f1sr2jp6fe9nbgh97bmw9kad08qauxtumgen7uko2chnreoqy1nyd5qb7cagdt4qfcmhyn7r59s43jy4n74188p07kak9jtfvo269vevts1xi8urv37es112y4k1sjhhy6iyiej7o4',
                channelComponent: 'rrf8rg4wcar3gi1w7a5e7e4m9gs1i7z7lsfzkuu1mxwdmspnuda1hl526y9x7w31vxauf5o3k8jff2e6mo3m69rwx7is1yfh3qnh3sbzonz3qmabb0speadr6uhi6njigc0c815h1nppis8rllows3omk6x6nkkp',
                channelName: 'tfejs6pe9coq2srcxa94je4l11k11ivvtyc29in9yex6uwe53roqtn4ublkfj6q77yu2wpi9qts9wq3na9e32ulkqc341nwyxlsjvm35f6c3u7jnnctct2otpbsmkde1q5w6pnadqmkjdsj95s5qc2xqpomccp70',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: 'ypsqwjb8dh9uqwwnq01ouh5hrd7srqempfjvxee7bh74z7zz3pgk4xpcq08igltqfsrezjovzke0vlmg1pdwk17a1ytta7ci0knj2tbbv2hz7iujx3lqfpsfhq9j02mnk0j51t992pfatihzxfjsgchd1p5leggc',
                flowComponent: 'yv2q374yk4np9ahdacnt58tvm632swd9jfh5cjoi4xt14wakdtp988l3hu2olug4u3b1dohapj7ql7dvub3xxp735197l039ybn88zlxkcp5s8qe322ccs159ri4ec6stps8z7o1a2k9qx9r47ljhpphjx5qddnm',
                flowInterfaceName: 'by3x5txxkr79yldbh1xtely0kwpm7hmqwf7j3w2no3sf0jqytg986yv1z0b7quue4a4wlu4whmjpht98372dq6esbb3l0uyfh30f1ckrnbhdj9phuzqw3sebikm3kna3jzv7ozk7n3q9rr6rzg7adyhffx7k1ovn',
                flowInterfaceNamespace: 'b1g88cr20z0j79pfixijr5xxnzgiqsiktm7b72ffhgwldyn36c76id5ritdoa594pjbvwbx5olz2plcl148ohma4nhsjkc5kf5qtqqhaluvdizig7fnzliy82j1s028920j4j4qkdaki6wmwn6boycyqjgo3ft6e',
                version: 'hcyhj5ulswg27blgktzyn',
                parameterGroup: '06pi55cwcgk27j7yp8gnyikys8wpq86pc192oglp1njon1pk1eavmi2kofhgzgdk3unp45yztgqubit8beleota8w8g8cfluem925qvuwjjmspfrxvdtl5cjhc2r1hwggximsh9yz1wuywi5i43dykpexmz7zgs0xzpeo8gkolpfx85mmkzm9gszxs6w9i12apr52700riyrzf7w1mbsrfweqvx34g93dvvtc9rkeesbmubuilimao3x498u3gt',
                name: 'fwgejtiif0xktveg4guo44jp460w1ai0x0e14cvm7bz0fa0rycyg1l8zs7iwovr9vvnd7edic1trqmfw5gbwy4vunn5xmvnxav4ezq1cydx71375yfa7ih562m2rccat5rckzpsa3tv9pmybtbucyowl0k3qwbbtbfwxbwo3tnmw1cqulpvww61svmj71ogtvu9rmbpt1yiy6l78yg30faz0t33gt3ph0aanps7fa1pv84z2p0qkmq4rqd3vu7zsml0libl9pf4e418j4carb6gzqrvbolwglbo3s6bgvx1gev16nq3krdqlfellekj1',
                parameterName: 'bwsqo7cu2r24h9gxxrcoaeqyho9lz1ltwc5sjksld9ttiwkqmeku5zrzqatrvhtd41uvpv3f3fs8jtpnqornemevkcfydtvml77425t1zyne2fr1smhblbjd7xbnqhv7vvdbjqw55gnjluem6ldich29x5p94cyri7ma7if9po7e3dc8bjvg164rzgpofk68yn9vlmjekrjm8hmml9e1ceb10fch5dtghu1xmad5diukbe6usdl1mxsz0qa1k2sm3j23pfll6gz5qtzo2m5e5ovp0jyb3q6w248l40ax5ntegsn4hecytrysaxvqzu2u',
                parameterValue: 'skhlxbmmctcx8xz6sln5b5sgny5yo4d5v18cff6crm77det1f3xf7ajp1pfdqh44j10upd2m6g7pctcxnkq65adviqrpki354o8mu9wdmz4hbj59r9wuq3r9in2z0s16umfctqj16b3yjcvkxarrb3fx5d8uxd6mh1r0pfe0t52c40bqimslbk2bxmpvip2awb0dfi5yjosiwgr67yz9cshshbgg1rb7dycend72cy9dihiyj1414kuvs6neu3x7zeo5sw6d7rarik9dc83sgqbgwa90lvvvdnmf4hm72vgh3ws5vfa3htkb493jd6s68uvk4bxaj5lv1cr3xnsp6m2ghzmx9b8jn3bx3ircz1lqnlleunzdir46tlsquxjagkh9yyyv3bth6nydxy07ylelwra86tncih4cpv45kzngqlzte360jb6brnunp44hzcuu1fvwqwhvphu1tawjliukyt0x4z4a5x7trlv30950yfdr2kmoag1tvip38j9ckk3rq2qs6md3ey3lj2ia99n0bgi0x6jn7alw1erjawe1ea5fsqg9xr0pz8x0wkza8y8g4thtitx35zt71wffnwoarqwipt3fbm0yekeh6uao2luz3ejlvygcnhp563p29igm93aqvg5iwtmyi2nnkmwo1vfeipnt2ez12msg4r4u474aa5xmec4ztdpych49lyh4h282cf7odgkusx6f134pf19agej0q7b7dsu75h1rnnecvr6c8ko0r1f1cukosepsvrfmral6jffj6ue22do4aovns3ixxfwiuev6mnxknfmamh8t7lkr78m3pbdox4dyx9e5naqnsnnlkz6o0cgw0ll82q058kum6jopn19559tczb4ek1pspe6wv29h6oel8d17pc7wsbh0h51gjwbrhjeaf1ihnjhg6k4smyiapad88d6sssb4j1o4unmvdo2c28cr541l3l0wfso2dxzy78grhrcyefui1n1ryqs67ujx6xfmrmym27tbj1kr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterGroup is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: '61cdhe3oapgv8hyrfub5dqqp7lyiq3a75dm42vzi4643of2ppn',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'nepqstv51jd40fry8eai',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: '7xte14zfcp0s2ppzmipw74m666grk6gma9tt75mnfkljafmlfd5yobj0v712az1kb8bksyh74433rnwh6vldadnspjtcm8yznqep6lmx16fnt2dlhk6uvruexejfuhmasxe8fh526aoishske0bx7un6ptade0mz',
                channelComponent: 'l2eznjvkoksrcwizj5zdlppewt7fe69rkj911naby0oelsgqgydvx2fx83lyx3t2wzfk8drf3u3upk35nnflkaglai1jspjo2zr47wkt7vxazsyj82r2b0w3wjw44lz7l9w8gdqr2ahet8erkv6a1626dsfaixd4',
                channelName: 'q8z872i1uruq57qj2wqm7r4i2021a5w6vyx2ectnrlh1k7p1iyccjffzpak1dysv5p23hlo6cez1hfk2jkpk4gzcljhlkrj2yez5wr7m5v83gl173r1wizv874tl14q7ls83mdwhrha9fubrucyfs4w2fz4yry9y',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: 'tb86hyfhf4hs5qen0o6wt286ojl6on7dveurp1rz77xqdqawlamggqujrhtl8acf5cbqkga1gm7nzc35vy8eh03vov5b4674r90grho3bvjyhrm2sn6xs7933763itr6liun2k51c3l307sjlylriljjmmkuhdoj',
                flowComponent: 'uj2of0j4z7w3d220rdwo08gmn1x0zizc89x484yatzowrquc8gp02sttd7f634t2417wanzb6rsmkov4fkdd2ostwcn6f9c0y4i65luuvs2f2wdi7pbpl4jui6gmhbotvku91qzdypapljz1tvsjxrf1ea4fnjms',
                flowInterfaceName: 'p5nhdpse9pzo4ar8xuadefhnneqjz1tegsexmyi4x3norythwjaicvqjhvs0kvs21ahgsee2h5ulg60ntvmnexqhtahxgzafen0jogo3g8r45459v9iaiyz670b5lshk4jld1myxh73t5p1w3pubnpvca047ygp1',
                flowInterfaceNamespace: 'i37ngeidbz0v5bztmy26jt032higjxk63q2edi5shadngew3duymc1fbzwm3d8asximrlzfo1m5v6jcu3ze21kkef986z5yjn9k2pbfm3j78ldtuav329thshr02zh3lbzepobotouegj3mgbawjesynv1wqpss2',
                version: 'afu5b8rd1yne3ohoufxz',
                parameterGroup: 'cw53b8zmi4xi06tggcvqgxh633l8gwloq70mzjna72y6awu97010zczdsjinftlrxu3a2peaychcjj2czrn9cttov8z8xyevoxktzjuuhlzq50zg176bprixpnrc3uxrtb4cdm5t2an3r1drvnkxyroeuo3b2ndgu8ms92cemebpxi4lwsatwbb83cv1k5b9424s46g2r9kw2jlz2pj5qgzu7ogdciwdbndywql5gq4cd2tnmi2q1gnesklk175f',
                name: '6nmhe7o7u93ehhkeup25tawcsvw3q5jpgj2wzvsdgyasbs06q8xxqa1hmicqnf7f64x23tnbiam0nvc4fv3v297jepzn5e4pjjh3v0hzqh04i0lr8m8ik2zlgg172ss2ewjoeyo9nmxz9urqcc207nnl86dp6alq61hmj3ijoixouho8b22h8i7w08yzzhysp8ct0z9bbrfqdhmh3y0krwuwkq1xffnhk5cmotg35m1wb7bq7k6ddtt97if8mf8nz3ctqdhxraqly0g7bhatzd72ajmhc367luucqa2r1th215u5kbo80ko6oekcysqa',
                parameterName: 'izo2e4pzh6w88jt264clq9ux0jab3wjcwbloeabxo9vcpnndw8msqc7hj08sen0k6adlepioi8bjnao9h3dzz2tafbx7g2us27dcog9t8qx41ivim4ddpnczzwrk51ydsj2krt9lr3xewlgdrtshepjr41ldfg35sil1qn70p9slzvajtfc5a9xdr8isdp5bjdc5e5sd21nvvd3kxnt911kd9ip71f0scdydq4tb269q56rk5vgi2jzeppm9fqx7x68tc9x9a3d7d9qz8o5t0jxmbqusqqtoczu3gbf3t4n9uhymfh10vtb41451zz3d',
                parameterValue: 'mn804tq3os1bmvoqg04znacqd27uhlcnjotht07tagv9irl5t3b7swqck87wul52f0mmy82acho01d2vg4anp806bas4oyrmr2ebs48b5l4ag938h6kv3q6qgragrbxr9myri2523p7napt3mwyynbq02bcgyb0dzq2f4e8c11l1c4sqa79769cmfew49mp7dly13lkcislg7x2exhau8n22dtrv4z5njgxzkdyn9xc9bb2x3uo54fbm9bsd7wj135or0wnoi1pfyv0cglnqfaroklqlj37g2vlzgr36r7noxcpospal2jge87h4r7czasyf6cj8uii88f9gv0ya4ajqxh531di29m0b9pnu2pln5z1gb0cp26jltgy0mn2icla9k2dxntvgi8c5g03p9cx5i80d0ho1uvwsvhmzpcqswx9lrczkde9vnpfw7nr8gj5d0g4zwzjwcoc2ha65pbkngibqma972fmam46gywuopr9rbtf4p6zn4yeg10anf8olvyqwv5fz3zwbe3q2f72cnx9vcb9l1zrikf1cpeaft7avo3kxu8wcf4u23xdq0lub98dtet5k5770n065jab9ih08ujnsv5nvyr4ahkr7mn8rhk0tuz9fi73fqbwwe8ek3mbkji9xin0xpyy71v5iytyvl4nktl7gp8zcv4eivpck7cr89ai1auwka3u1edrps37r942utn3atkwy0jntvybm2kz01nk26mahir8hbjv6wzf4if5mu1g9sz432z31k5dibtesrccosbf5pgjgo704lh06eqr4h60er39mva0q6cbx5a87bg2v36yucyovbjw6q7q95uowb2hdzxfr3ovynwh2x2jguf3jlz5pgxtfwwdozfny5p7l8tron5mrp8cn67s4wszxzgz3hy95ji742wb9xgb5wggezn9b8usnn1imxflfp1chpd3onuhno60qzqhtczbziurrwo0rfu2nwse6lgummi8uxtllqchle08o4l25s36lafsy',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterGroup is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: '9xx61oc7xcj0oml3m9bytfrqqrztxzc4lpq9vptynau7j7c14o',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'izreardytqfhmbg1r6de',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: '4ovzhmxt6u7kiscr1legjawdvnpw7y2qd8ncavvucnpkultlc1fhvaal68w8pgdhz9v6iydrnmqzh28yh5fwudfm2ob591cmekv7i83qx5w4u0xrq24srga6nb0cjw2dfm4ywfwshkapk8dq8h2uz8dunvr3fmeb',
                channelComponent: 'gqlmhdrk0ggskzvvymge0g1h6h9mdwbttftmv2btw64uacigninwawjousfp9a7pr161t9wmutkv5z273rdccueqohmqh9qgcfpqjf8tk8nai6qawvpxa28bu526z5e3r1gfraeqzqd2j1krk0k5c88zfws7l3rw',
                channelName: 'x96de4cthp3t0gz8dgpi522myln7b2yl8pufuhlbldqf3unvftppqcaxr2r42vn6dv7v5nsqgsddgiu8lw9pwfh6y2f0xbzpqdtyu1qiy67foaa9e7e1tjbh63ddb0ghf5tjqnpjbn05ons9bgvek530a0t2s32e',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: '0z2mmr412wohytw89boov4xnggxwdi2h1qvyifwflf0bn0v20co75652wz07ciw8usx4de87sfk6u4055i56ip1d20wuy2atzlpiw8jze6c9v98hdjq81vhkgzg30wyutxi0k1nwo6ry3opnia2u2np91g70ybxm',
                flowComponent: '29v3f5w9l0rlkyp79btdspasif86phfqyee10bagmqb0we7ck7njwsg8snqv7dmodang2gtffdxqp41fu7ouwveggkknp9wgkbwd5a5uvjwf8jik2qzno5jpgvvac69jn7tw4np0zbj2p4b0tdtzbs6i4c7nygrn',
                flowInterfaceName: 'tglbj46s2kqiysy9570bzsg6gqzegp5s06k93ghwnxj9l1rkttkfczgfhroxxc3zub51ikj7dv43cyz3yg1t4fafdjdx5jx29yhcoolmpznxyjlih03qm3p9sp535fm2ozpjhpf4gowu2j9a47uddy135oy7azpk',
                flowInterfaceNamespace: 'klarmj3j6t1v2yaed95bqf6udxag9dbsbjzug48p1rdvxc9g846zy3gqx8v0pgf44jjoratha3bgin4kwceiikqacpkov0dp0sgahg1pp5inl8w8prgke6urv48nh7p4445q59fshha9yffwuynz6lkjuhebsmvd',
                version: 'wbdcp0etjxkjx746mk41',
                parameterGroup: 'dxscvvs2zljvnk6tsrd0hzlhczmsgdt28r208gazf9x7lpz9rx7zgbsvbpj6to3vkp851ijgr7v3d18kerxj3516nc8q3yzd9nd7elooxb4lylv6h06qp2ynfe7aahk5k6d2osf5rxz1cv2g25q9x0g3bpwt45xp15yelouc1910u3ji96cz1ikr02ze8opdo1frmg4m02htv4tpajmqab7vt16koaemx0afpgug55yta3x9aeieuhp98a7asnx',
                name: 'f70j1xcv928878770l2d1ljo0z3pd4e0irh5lo4owtc7zbgf9w5ndqfesk66eqvukd7ckdh09shrpqyfkbi4b5nb3srngeuq2yl5j015unzwlwqvqnl2rgf71dyb5lupzu9ptu8p0wryd2dps8l7ke2m0ftkd5wzp1ja4erlyy690f6wpc54idasjb88tb062c823wnzg6q6355x8temhn1galpu5qsazsesy12uc2gwkztoxuppxq8hakwplrxbilnmpfyg57eet45f1zdngbyd08l09f7p08l30koj97s80vqvsy75iva2agh7ajdxe',
                parameterName: 'noznbie14d8943jgmz2um5sgd7sv39dkb0j70fe0dkc6b56hkab0o3yvr83oj5rntt3f5mh6igt5csaeoxbhjfvc501dr18fvv9m4exayjnm94x49j1coaw930218eg1kph0mic6bsyhyxv7jsjaoxzmy1g2rmt94dirhwt5jg4ud3z0ygx66nqkoa4ukeqzqxjrufw374vya797kxkuzpbq23igy2irzu5lnupgxyc2zgmrnfyp4c8pdj6mqsvv9pbb9opt5ywtf1i15wqmtgktg1kc1ou147b7ssyu1r0gg019gsd2mktzw63iwz1g',
                parameterValue: 'q44nv3s3iqwo9dez1t6ocjkxjibt4i4uy0rtwh3s73wikhlf4gxyu2x216u37r7kma3teor72fm5lk3xt2oj15zwxvcoigx7kjvza0msqnrs889cczpggh2u28btp1ringav0c7cq9jz7wmvtesjwh7v7hncry4et3x3wk2epplqq7liu0vkq5lqa7pdsh0vnetjrqvke8kklnug4vx4i5t1yeg283tg7dutocvjmek9tt96md3uvfk2c53fwl9vocptiyqqpqmt723l8wif07yg9tvopu4ergytc9vl60vdvdo2qjpflh29fgouj7p8azxdik40cjer0tqbvroz8s3z4uzt5cjl6yv9k4lb8i7z0df16xuvah768frano22xkn4qqh9sy661gm5ryv2kgex6i9vlana2cqcuhjiu9n4x8kyuex2bkbjql9tay698n3h9uwenx0yuq851lb3l68m7ui5zlo8rzzp15d9in5stq7bj0bpjn89de93btvrwohpi1mptt5s54eraufxlps3uzyriwk81b737eif9v1z66m3gwms8jyh6l1lrxol0kmrparj5mu6kja6i4mztaxl6kyez1wsgc7xwbt2u22sypxgw7z45aarkzscqj855jzjcnsuq32743o4u1r2seehxdzyssvutia6dfrri2kdrufd7yszvrhf08wgeuezvpvqefs040u3xerrogbe63ucu28q43vgkdutojdmoq65p2q8thuqv6xkwu0mg79rlewdse150rswwz2k98foyji8vljjytno82de7f5w1ecqjpxyb9trlwp8k5ardpznwrin8yvrkvzlkabe3w3wf150v6phca0ppsqd0aq5eoi2rgyycnnxdrce54l33xx7w3lrb6kevxptenrjm7ws95otbshyofwkpzc62q7wio87apjavnurvqa6nhb674vssjvwcdwl0c3o4erz8butyzro1u83mafs4zblnotkmisdsc10ggx2y3bj7wetfvrb',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleName is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 'mdkjjdiqgpfm2plh7g38g2d84lwip2amv9k88a6e2vl0huma9o',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'k1fqze83mrb8uj3qh21s',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: '812gaw5th92v4vwj32b1jhtbhwyf4y3fyc6jld236tfgz4rdigyuyjkjrozut7xdcqljagffi8tqettjuiyks9w7htu95ppbvv5dkjfbr9lg4evslhvbfxnu4ar20e47zb1q23cdr7afh8lvxey242rg2bbuxqga',
                channelComponent: '1jrggw35gkwages1f31gkixin00rhnqx09zsw3ablmjcvlfpdn588216tcttxmmg9kjv3l8pae6bbf9wamjph5fjlmpgdcy5hl1e0nx0d1x2dqdsbbvrvculjwiv6cnss8daaoo4dm5fu6cd4ivxh5ozbz5o7b28',
                channelName: 'lgcu84j5ziehgpduz9jna1yo3n55cx5xjlec0r3d2h7cbglcz8ascwuvwauualhjr5pfe76nubbg93c8onu7iam8rq48rr5niygr5ngdbsvle2y7zj8y3fg5igif7916tod6i5wdxbbzzifj8r5ckoib8ho2gicl',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: 'vgettmseasuog7ye22zdghwx3eeknt5wwhc7pgr08ky91ll9nk8441hk5ftv8rlxw0l087ayg0g2le9lxit6jfnegmsqjmc028hb3wfrhu0s2w6i5m7ujmn1p53jtixpz0u65khcpfzzpbwb6niwbsyyj1dqxkel',
                flowComponent: 'z4416fph5ki7aeuokehqfxvk0misje82mwvs28ifr65wp4868g8vnfeu5b17p38g2aw4swr0sxtvz5sqyl04o4xkgjn8gus63m0v7qtdsgbpwsj3l0frtii7fr8f5lwotj2snfx7g4i0y50ibglrfjarc0ebt31v',
                flowInterfaceName: 'zj6eywut4vxsc7om1jsr8ni8vxme3sk9cdtzbkk39ibxnl5wlr0bfkjihneg93o1cabkw44e9ubn7wbse3s3tgvveema9aomy4lemvlnjganrw6b4za7uk1z6ykezgszsrcnfox9zi99qjikarj85jy2tvbemts1',
                flowInterfaceNamespace: '8de7w0rtaja5p9bqjrsugi5a7hb4s1nbaeb41lou0no6zoh1lgj2uacn3gk50k1rh4ummbs6bkf1nhtbu9z88hrea3a76wcbockn0y8ziw4uh4dlxgpfxp6k0th017g4w4hter83n4u7886u5c0qwsselzx9mtbm',
                version: 'zj8pa2z4cvyfynf8cbud',
                parameterGroup: 'n4tvvqhajixru6voueuwegijniiio72negz82eqwh1w8f3d2o085grpoydiyhwsjsdpl4dnx97czuudwb6j9yfa21a595fhtjgx8pxrgvu46fnfcbtsi1kkp9lux7rc5pje7l1kimkfc97ht9s5gqyk8cvoq0sy1kbtjbt8jnn1awppkz55u3d8cs0pwd995q14ghcopubp2u2sw33oasr8ezfxg9ukajic4kxnt28fhnugcahympufbw7mmzwq',
                name: '4xnwygkv2ujcdmkd8hjm1jsoe5bxnhg9osdxvbqwwxnxpyndbsgl03rl05vlgwhoc9vtzs6w76j1kpr7bsrnjhgzfzxeyqoii18qwtgk3onrqlz40t5ifefndyn9tb2urqmx2qkb08dqy52n0p06a9a8qwe86o3wqihgcwk0hizivde00yobdpb2dt5fabt2o1wajhpu53c3resiwmonxae2jcxgslylwc369gadwd7azhp189zo70cw2eai3q871h2qmq1365vf37slp9rmt2wmtjy1tbkycxkm42jo319jh547rry93s8f5xcnvt3x',
                parameterName: 'ccoy8xxkxicijh89t2ieterbabtgk6c778jmtxh7es2ecf3h0mq0f1smcljhhiic983hks2aja4j2q0j61so7ib2mmr1ryuoad1mgmr973mdcj3l3i7z1ak3bkha8ezxn3zluvgapi2ba1xlxya7qi0ygxjritm1vp7qnvrmf88yd30726o30oxl5y691air1kn9gp24gabkk20uxncfopw2lfmwjeoem0i295pkobjfwyjosrm77nemv9by769xp0tofj1gq8ddq5drizxoq57hvdwfjlnu3u3437fuyyfzq59zj69nsu94bi7m5um6h',
                parameterValue: '1gt8blzzgglu39a73gcmkqb666w996qn41so66z22h6fftzypv9kjgriiv48nl0iomn6it76sv2cw4a7hrkzldprysw0uvdke731lesdfut8ednaby9a92gxw91l08qg2wtc4ms8jioit626csr7432tbkmo9wiiuwjulsssm5fp3wfbe752qsbfj8ywho5jwkuozwq3bywhrnnsifry6h2uc44qecoq2dekvpnyp2695m7bb18rgzhf6ab1i1f3mz7jgnx9013dxihefecg7gq7sz7ydke63ns6t3woxj81zmmlftie6npmzma8296prmtbr40j83aaga1iv2po7rly4tlambadq5leh4up2g8xabglyaxrdq0njurnp5tqjjx6ptbmd34paz787wehs3sihcrmfgk3elurdq7xrn9di7r2tac4p7iglfaqckbtmfgs72t3w2cg5w5lw5pbur2utk06ft603m1hngvxg9xn07lzdrdnh8l3z6rdr266d3bde75jrv3x0pk2uso7d7axtn86dcxin5nzccovekpyth5zgn6twqhog3r4e4nzl2xy5g82ddfisbkps8fkyvnvj3tt0aqqpi79fexd3hmckg35ae4d11yj87ifynijl5nkkbns8xi0g3c28wyp30voyf9sh7s5sat0j1lps78srkwtqqbnh03g2dbjxw5de7esgpuk1audu74baprcpgooepp8njbjzi7oirme2ypb9xxhflntqrc7yb9bwhos76wgrvf02do1a54as8bo188sr57r377r9bm0gxrpswe8tw2urqi6677j22rfkir3pvztefp2ixtps58n9o8jqpi45s5hxcmo81u1rf2rbf9sxu6dihhpdmrqg3bjix15znwvvyfhtr8p9f9bwvdjra2odfab6b46ocs0suekhitn47lnr9q72n2z13uny6tngncqfzwjgqm7lmgf34s0e9z39vm2q11u0nkxd52kj8wq5hypsacojbt4s4da4mtz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterName is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterValue is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 't22zn2xirj7dlfqnohfw5ubjtewcionbgz2wtvfjjzr1y82k4m',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: '7y1y7qpsmkphgf4tdjaf',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'lag1slynw1s08p6bpsgyna1xeino093ksxbqq3kkqlk7low6x0p3on3ilujqch5swvg1tsa6su74j3fhjvm5ulhga1eb947necth97hg163so36pt29l39roh47klzpdmkkhkk2ckz1lkcfotcxge5cr8x13t8g8',
                channelComponent: 'r10d6z5mbtpnjv14ymr2xq9m4o3y7ovzvzqnx6a52eb2ffhd0hwelfia4wskt703sshiw3hxukrcboauaiy4ytnj9ihcafkjgfyq51j71lvs804gj1ygce6mxj1s9xv7m4n4njdungmh7n43ckrctlryqrrrhnor',
                channelName: 'hne9nwsm0uipfi96e8zh8ygh7cylux4jm8px2crna5yqme0sskytwvqewjuwsbzxzh8dblr9yleqep04177np7stp6vngxz31fvwfaxxri1lzsjim4yoxc5z7tpl6oym4fbi50f0jjdy69i4i1j8yryke24mpub2',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: 'cokqkpa5a59hbheknnlbr50db7dwalmd6vucgfzwi872vsawkoedw4y76ee7wjktezbn7iih4tzc8nf3k5pnx66xa5n3l0mj69cs7utz22nwl1zomhk3sxa0gtjag98l7q0347stph3nlzdii4nfly5usmaj186u',
                flowComponent: 'tu1bkk5ou53qoda47jcfheqa4mz601bo5h4cx4txexuageu8xx5cwg9l5xrt20rjz5zqbtyfszzqrma25k73j6o4t9npg4mw1rbr7s31xpo7xyqu6v7lneurkulomt65t5wutew71djopg9a1b5jsdp2kwtklkjs',
                flowInterfaceName: 'pe704ov50h38okf0qmifev9hyo3qlm27dz5vcwy0wswoej8o2kedddqjobzmntpmi4gmz6pkdzqkbkrj66jk4571af691ryd33nvebfs65ywe8sft1lncjs3jdhppjfx4d9xchf6ym6np8buvpr6k9lx8ylgt95c',
                flowInterfaceNamespace: 'q5fpk4zuzc1spm7zi2i42w2xkpa3l0wk2rr89x91avd11cfqkvt7dixv0s1axqta19hy02smy6zi6om5lzktf27zgqr4ah22y2e54zxcq1cdek4hrevvrzslgmes5xkhgppqte3flsrqetaogfxj26mm9upgu0k6',
                version: 'esgpbg5d2k09hxhkyawt',
                parameterGroup: '0fe1fxvzfei0e8sozwl5136fzarl7ffhzl38r3eqsr70tkg9j5hzvy75pf17w91b62pd2wsbxy1dcqlaic5m5dxolg50jawcv4j2pp2t6hbmvl6yti6cpwzxiidl5jowjwrllakv9n9kenaa0dcfxe65194g5hi9b9ugr4cgvoa04f1eo2d6owlldjnfzwjmqlviu2f8n00zo1hkjseb7g4y0lr1xn8a17cera7xcce5gsbtoqfq2diuz6igh85',
                name: 'rbi42df1pn3z5n0wfyvskeev4txulhomlpgiu97opkwolyorf6jguh959qfraqtbhfo8j9dpbg8yeqr9s5b6mre5uqlkpk5k7qyr0sl4sz4xch9hp71bgz74qnqrh73ss78p7wtnylyf7gq45fqgy1cpcamxstp4yy5rth7xx4ebtx3miuugd7r59fv31pvltyyudfnruzue2j5cyqzq8zhrqqpeftufbng2l5f3wtbytocd9rp4y3nr60he27a74d4tgjroe2qrnn9o44k2emi2voigjrmf20m0mxcpcgpoxs2vy4og9op279z6sag5',
                parameterName: '6sb8f8ad0m48qxna7mrcwj8cdlvg2ozew957btfnpexo0vw55ywv3pcq4n19cgmi5db3na63wqq71l22ckrh7vr1y47gg7lucfvur06idrgns804dbyqd87terj17a727znesyzb0089uzuziwr266qn20bn4qaihmshxkv0o57uvjfuqygqkoabhbmvuiymu1qigxhqiphj1t9sy8bmmu9nkdonscc8genbmym7zdo9wnn92mzpurx3m7eme58vtg39a8b9x4j6twlxl2p6wjdd7n5cd95dd0va2bwzcd3oe21f5kqy6q6hm9y9cr7b',
                parameterValue: 's0rgii6k7djmz86ye44t06eo2sr0yi6w9sy206ch2dnz7dkyg8xsslzav0t7p6yu14mhineexkg3dq53jocmqz60agennf406yynrphqqoh6mixmakz6b0l5064tnpyvw0xz6niv9zx3ymntymlu0bsem2t18i8tzwu46eq8bdonv2cr11moyci377iwedwkdv6ld7j6d70jasghklpevfe0dk9la63fw1y6xz07hsq79t6irgg5lelvwr3lsxkbza76r3c2ysxy9lt42kh9oerkex8znesrfl29x23mfzgeqfsg1aj0riqq80eem5jepi8ms8kjjoj4cg9zl714sw3t31dmidxug8mvtepqw60ew7bitdlxsjdcr2o7zilag6t4xu5c13vewrhwssvomtxf7aj1epxqr8d5ma7z3k8oreeugwqvb1rwgzjm7ylq4qx87wlpgjdeg6alqvebaw0u5yted1olrbp4guenbrhdri5s8aypiv1kktw44ruvle4rdplzphjnebohi7jy4210f612ezrcll8u4ng6h8wx4eecfkbne5n4irvo28xb2qie538g9bt8woaq2v4qy7iqvlqzdqi8bgabeumz2qfpywwl9b95p85kzf7ommxgugc9briiix7y8ga7s6yba03yruvhf6bgh4ttwxus4noie01qh53v8oas8k9f9owogs6s85m9kn7fg40j26n31amomvjcjtd69wqh0n4hfy5y4vre44cxs38kxf0ziiqlwrnwsjs63u80rcmlxvjshh0mscqombjor8vsk6vb7ypqbqp5ms16f6adli0y1fzttq6op2dhsco3mudcihnjb6aooniplnp9xeavfaed211s6bft6gwjh69nrid19jnsvpldw3ugy87xaernmyjkh2544n1quc3xe69c6uoinpj16jn6kz0qnq1y90e0l51pnv8cdvfa8w72mpi7yng3kxgh8j5aiymmfblhwjrj2w0l1zphcr4jbmh0lb46g6r4c',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterValue is too large, has a maximum length of 1024');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 'i38j44pl8st2f4v1henmkxr6veiprnsytevgfqlbvkgl3qurdw',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: '3z8hrw7aggxqgznlu4ex',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'ccp3scq80kw9e89nahqo8x3ibgs1t09q54hj3tlqvdlamhzc5yub3my7uxu790wp3lb9vyjamdrl7tpdhgmt566996fkn9z4hq26gf37w6w5qol0qduvulh9emofw9s6qp5ry8hi6m1xfpowtrs095k58pvz8l8z',
                channelComponent: 'i0w0nobohu71j8blh3vkhzqp8oc5xzkajv0nfqu212h2kpqjd9zifxrj1w95oj7bn56590s2jikmbwx3mmbhw5ps8ijil6tnbsor178pxikphvzh3oytcgexl1epk6dpayi8mo88ci5vbfv8wxd0565n64wlgwmm',
                channelName: '0d26qws40c5sp9pp0kllq1y9n5lo4jlth46albfzp89gtlvnx6xf12j230hctrr11ofi2iwtfa0dqq4nqf06dfv9vvy8q9mwx0x6joery7hdo6d7bq7c2ievzlqzxdgp6baeutxh7qm9q1ex397lyfhz7an2ymn2',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: 'j556yb23mbg8lk7ymaxch7dm5l0k2y7efzkzsdsrcqtkhg53jmdlifmq8wbu62bgwlyqdt0p0ggj2pojs3hhn9hrjn4h9ki55oe8x8a8nztdcpyloqbmweqkbqnvo5svwudrc5knluazevljjyy6jdsd3vepyetx',
                flowComponent: 'yvwo1j7z8sxckdev6nqqv6ma2gqxls8i1r1vwwcwnin1iu22hcp2echq495vov59shendhuv0013gb2fig4sc9ivrwycrwew6f1bkjdm8ktx8nrp5gbs6wdqtsc50uvsv3y9hsvz68hbwzltv6jqkdd0sv2fkfnc',
                flowInterfaceName: '40knfk9wbum2wcenwa1u16v2uwrx9gx82b79fzksiqfzwfdoq72y3s829mtdoznvt4pvok5xt6wkex8zgvcjpe4fent8rynghd11x07i3cgkn241leoko4h2pv2yifyevlctw91g4s6s2zn34n8wq4yoq3e15qak',
                flowInterfaceNamespace: 'jmx38fr3qh5836gygfydpjenxwnd5wtl4y9kyuu6iejqz0ia918ulmxrcxe0omnyohtrde138n0oik4896dxlzjwr3il7z2kj237vfvsqa0o5gan2kvgjv9yep88s6jc69p32ha5aoypilvfq2oskf4q4bk9rg0g',
                version: '5yv9vbus7yrce0uqoalc',
                parameterGroup: '3e11ozhbv2kuabsww9rzzdkhw4z35tyu163xvz3y1f9vz0o186kov74cnwkscvlx17z6edytcwa62gtivc244614p2t2zz18r4la2vp0gmhbfocb8p5do3drr8xkq9fianpeawymarcrq82kbnluwvtzwi2isy96bqclrsdim45qg1bven6prkqqsyazwmpcx45l6ee2b1eelmlok03trngw5g31pvpo3mtzuvz8mqdfsc9kb7j5xu1egtegg3y',
                name: 'yby5wcnd45lui405al4g6wcpbmrgegmxarpb709at5of7s1kptweize0wafde9kj888i672cl2qe6ok18efy24xw5m92htdvmfoaq8sk7j5x47km2caqdzhrk58gxir73cvohujomcdj7q3kwtk3fp6g3g7ze0zk6z265uw2a3fv56aunlkq4rdwxd6eiz881kf0d7wgxo36ybprripsiru8u9vhr1y973sx3ctgidpn74b5drlw85ioxh31un87uk8asqxjs98j9vqmj52fvylhh7cu6azv9oyuvl738p403utbpf45i5ehrunk19rb',
                parameterName: 'inv600ljqkhaeat0jgjrfh1njfq7lkgmvf2sopwy4atedux30h2mgvnt9fxyznbbscpmuy0z9pss1jzgyqlu82itfxve03kk7jef450nh54zjb8d6a8p19j5virgra57r3k1rzh47n5epl5fie6tg15mgu7fiftscw74hoo7qjxlz4p5t39muzhg1eww4viput4rold8f8wnruqgz59kdrhcbirrsnxzn7x6hkpbomdlm1fhumkxsmmo4jnvs131n4ubv541kwcbun697b2wnjd4dhy20kpqxbo4g67gxig1d5rvb7gmxz53ku7wirt1',
                parameterValue: '15mh1w9ye6kvgg3u55dvmbxm428zuckcv5uzchdtnrgilfwsauui5ymt79t5kers1fpan7ln4za2ku2fgm2m8ti6tf2gqg8esqitpd3hmuwqiwyxrerepl51a9hjl1ams79eo2a0fgfce0xrfm98ldzr5kd5qik350cdnn8ctzvjm72xa41ua0t6r9jxcqskhfwuznbpdbys1krbhrfeu5pczt1zu7aqwnatyydammc738u4u9vhig8qym65qxtugynu2rwc40p59uu5sx072ahwho4hmek1llghfukkybk6lgt9ukyrcawd68e79qltwkchmd1ewe1a215uwzydk7xd7fs7bjqoa5kqoj9cqafsjpqwgcq309mwhi6tmedmih566jjb9svkzb3yscvdv16dyczn4b97lbuf29g3w6zjfe7mfsy9gqt0yvy9z4hka9u2ep7rezwkukykabdjmr2kngd8klam1al8e8yimb6rg9itnfip086f3s1f644euwe2qyltpjdc4s3e9nxunv28sjtx16m1fzrk823lctbnrygw0qk012otpzaub3n94o8i68v5rlwnmmoc49wlnsf8kfpxd3v9w2r3qwf7vhyrr4gtg3d09x9k138fmncd4vmfcxgvyitgk1wlotvkfn3rgzup412qs6tvgoc1uluti89ig24xrcg8g2p4razpwribl7a3n2ldapco1cfnacppd6ft3hep66b1dc0hghyxtmv9bgldcyhs700w6alqbm75kv64ev2mqf4rlfpja81kdashelt9vm4tig1ylxzreyhmz55in91jzrnp3koi7aktavla7umwkx8rnidjn07rq6fop96tgvrkp77ib8j2qftvhc84ljf8yap1qjzhf7hwv5de5ztl6e8w39wugf4x1aecl7jb563a94wyr9em5xicdn9qbyqf9n6zhzs8d0gejjwcxvvms3vsgvnxobbqpn97xb1eczrh589r7wrixubh9lyeobfxyqd1jpz6',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/modules/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/modules/paginate')
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

    test(`/REST:GET bplus-it-sappi/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'da3a496b-48de-4449-9121-1a1b34d66683'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '64685734-cd17-41d8-b1b0-96c34f75142e'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '64685734-cd17-41d8-b1b0-96c34f75142e'));
    });

    test(`/REST:GET bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/5e45b3f0-e427-40ca-a46a-13e57a4f3d87')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/64685734-cd17-41d8-b1b0-96c34f75142e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '64685734-cd17-41d8-b1b0-96c34f75142e'));
    });

    test(`/REST:GET bplus-it-sappi/modules`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/modules')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '0a6bcabd-c053-41d6-82f2-0e7e6434f51e',
                tenantId: '0e7fdfee-dc0f-4dc4-ac71-816c6c6cbe5d',
                tenantCode: 'm086lsnz2vf94m3wzybn20rldkcc1vj569sa8tl33z0r3ehcwt',
                systemId: 'c2af5bea-3e78-4cf2-bebb-1781716e10cf',
                systemName: 'i3ttdha4zhl4n207vd4c',
                channelId: '08c9b551-3306-4953-812d-c12f710db70b',
                channelParty: '4omr8if05oc3n9g5flhq6eq09j2r2rl0at4f0pmgz0jdyvmozxgaisc3qrj610ubc7e7p4fo9zna0h6bzsby3zxozcp85qc9upjztxepk578yo3gnl88lq53ybn9k1lzhyoxlyce0kvnxp093box2aapnh44cy01',
                channelComponent: '5aagblvl275cmx3v6x9soxa43jtu21zmhfrl2n71zi7lvds33lulsp7vgs54kvwqv2tqo603a3hp4gl571ld2xgcu15othmp53jikmbhouh1alkp87snyl25uqndgwdsxvj83vu3htj5stgk32e5e14lxmpxpakd',
                channelName: '1y8juakkjvfu2if3jypotl2o0kffgsrkrqtqavdsh88toheb5i17izh9f85c7c3v4r5akh91vxsjbscvgtljo79wtc5c3ncyw7s12qhe7uznmint19jz3byz6nj1h8a2f0b902dn7rbtxus1pl0o79qbbboqwtra',
                flowId: '8469c0fa-7b5c-4132-a811-51e5c12fba13',
                flowParty: 'pgp134lq99thlyov7xyztetps46cpo6r4jx97r96md54nqegu3khkub8swex3vej6fouh570zwr23xd0fz8rv9mopquw5tvsfhlrvbg00cxgsjazn33xyegqo171b42pwkuxh1yudemjrrhiisjo3v44i6oozctp',
                flowComponent: 'zxzf67i0i88w17053qhlv0580yxzne20j5j5aqdtenxtk8j0fdahjdka5wybaqgftytdwyr3ud1i8429cgsi0i90wq4un7dt7i13q4wkanbwyvtm8cnarh77jjopbngikilxpcg5oz7pmrdpphzwozf28op3xegz',
                flowInterfaceName: 'xtpsepo2y0fk7qlnghq124zgy39um56cgqw0anc13usxffu0pfteezakciqrxs9lcfsy4m15hw3msrq41kwme1zby78ixfeo0tnycecfxvvx2y3elpk73gli920o8od116x4g7unc7d5q3muo0rkwgaedsoci6l9',
                flowInterfaceNamespace: 'byebsfky3uysknc6ozkr0cmae8y3o2gs5hgurfy45bhqcso4ax5n5et30iqkchp58rtj5i5jmjic3k4csszm7yqd3dkspcr3frfqpgfhk0fbv77ufims0phyhq4sm8i7h0jtv0t2riaxk1uh573x6zjtjimu3yes',
                version: '9fu4lcus89nfp93kwp4i',
                parameterGroup: '5dowlll3xpceuxmx29a4z623bmbaidgm6srolyz3f0kzhfmgjushgftfnu662wquzg8xc10tdtdc95uiki0n0ekw1dnq3dx78yv74vmy1lhmo75lo28f6glhug976rf99d2s7dqejkvnm4leuxbo8d50lrbnno2kqu7k8efgqbg5ztpiuawj5acxs0k50196mpg5k4m1qft2egvq9gte5kmy1nbrbefwpp3a9325pdqp069ll1atj9sppezs1ag',
                name: 'kvysdykieqgo0houhn1onai0iucog3doc0qasxwlbvtf4pdqhaf617w9r3n2qvvimyqd1o464zvsu77rqbmml1xwseivcuq8bdkaxro7kw2s9sjhx1jjh932ghg65q8xm31moebwoo2gef0mvoierm41urm5n6oo6pt7ejpxjajku75xcazh9yo61n79a4004cakawthoqf0voj1jnhv9wqor4pqtgw7tujnfdtmhsj5audjk03ujbh29bs1jzzblvrd8rhwfgcw58m0cv2j9fov7dell904sa9zou9w47bb4nwxoh8jbwa8g73x2aas',
                parameterName: 'tvlirv680hzjmqazdbbq8p3zoyk7e8zrd2qj6vj361ovbjbt7l3skkgprzh26eeziymhl43ix3muo8db3cujnlisir3r9qlh4a250xln7c9diimdgpk94svk93ehyfdwfyc0dxbxzfst8droiy0adgnmkvqvthrdamf0tpouzwvzl4so32i6yjwkfxqc0qumjqel7q7728vsncs0e8fyc7i1oqpj1kdgqjfu36rwxr82rxschl2ulnco1wi8brx0201hzeflbeiwb881ujj7jf3uh9hlr7zav28it6cok8wa9cdxomw53953rsr5u1fa',
                parameterValue: '8wnz4928v6721lnrs8m15zol3pd4xa1bofx2vmiuc64gr2uiqzbqj4ax42g03xdo46clcncdeque191sfe78atvn5wocrg4yc9gtmfaare8wq95fz5srsf9yx8jsx86w8syc55ozw2i35ujvbuq7hg886sil242vbktymneamt57icwwgfzy38lsvszt5hedn06y2ed0f2cbjr930s1sljix7k0t6i2yydv2zxq2ps39hrt9ged276adom7inr7s9skczrjacniyfiafim6wlz8h2pmtiyq5z2y0ex7ks8vp5n9oyec16n2tzzm57odp5glsynzvewoz3hxq96kg7tmyn3n06px3q8ei5d9lgapeedg53d37r4j7gmzcu08i5atpkyy2mwub2rd0ixoo5dn2vvmwb3kpy7o5lgx62mxnn1vbqe5jpaa4in08qi74ecij0szw5eh8pmknry5qer6ncg9b3mpko3iv6bgec2di2r445kas388xyzaxhyvjfq6ufu2fnsgsbi42e6ckahw6nbt6s61x50eh35wabch1kt2bqcssmgajg69se4ug2fyp91n3co6nkjo0dzusyv6u1d1uul027iet1nhelmx47iqz9aoelgy09enranzhdrrfawpwrq6d1yij1vwijmqrino7mi4v2ypkc9k1ygu1ow2wcaentso5cnqut3odbu15a5ul3tkp4whq41wr77fkhbinrpz46m2dablpqvduv4pc8z4jh1ushc1sn5yzsxv5lt2vceq1yonc7d0evrzjk6ztr2b4hjztqdztcn1xmvjzyqbl9unj0czv4zljkxvgepln85gooaodk3jhge35fr2uzo20jvf1qtvxbkhh21uvccpxh39891tbl04xfst2nsz6afu2xiovceeqktaj2y6hd9ubpz6p4q5la9s58v77y7ybtot95re1teb9hwgat0n4rf80198ew9wt9w17bbr3r71n1mapescjgirxiqdekhhxs65y0y23xd4j',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                tenantCode: 'b14fh4rl5zh8uc1lfox1yw9fvy258ym2b3l14wymmmt4rv50ng',
                systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                systemName: 'cahdwz4ovr5unh4fsqec',
                channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                channelParty: 'fhl65fg7m4j3t4xhj5mb2f6iwte70cz3aer6onn5tq5wealo1lowk1hx4w8ovl43o50k8xxnpl5sadkhv34nan21742fk6wieoiinb0j1jyfeaehuqoyly9y92f78wjvx7qwizz5vypoxnf3j9ncarhxhl8l3tr9',
                channelComponent: 'nr4zn7s545b80sji6pkdscp9nxqk9ibt2jdjrbzc8ez8rtih0kqlav0p6r2rmn9k9u8u5vem958rjtw7dyicj06g18oxf640b0cy2a31ki71m89a7ip99iveqpe7jrvukfc5f10rnuhtr2zishd1wm9u84116iwe',
                channelName: '95jahz898wvxhlnwbzh39pyyxp70dd5ascx4d0mmajf8ipz8rj7wicmyxrke6z8dufnxynz5wbq6mgfi5kl97qaoi480eiilj467hf0mabr3um0nqtmonla41ls60v78f0uanlik3e8l8aplog9k6qkh6231wjps',
                flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                flowParty: 'wlc8xyrtosnsdlnqwqgy5axy95qnu1v9hsl4o5gq7z0ld0e5b4uju5ubentzjb0kzlgpcv2pn3201gihb35b35n31aye0j7ryoo9eb4h1ajhkz0pjthldhgsvtqkwgraj1p3ngp4ccmko5ahuhbptxx3kpctkvbn',
                flowComponent: 'dr64h25n5aog5ygcaejmfejrta5s24in98xcbwk3r9abjdwc6xul9hirk8tpy162e3z6e6h5fg69g7ou8gelqnggqgzm8r5dmbnxyv3tcloudfy1rd3bkkagj5rlnv3xlooebr4aav9n7x8ngid62tcm1bsp41ow',
                flowInterfaceName: 'ieuftea3semc9ogngnenoa88ki4blzd7y0q36mlm1olyo1gozhsgsj7b04rr41wpr1tfxntbu6xmophumi6cec7ueyckz8hxdxyij85nrxhhx1jkal11mlfthe05ar7uj541owryxjlbwpfdbqc1edyc72bxw5lh',
                flowInterfaceNamespace: '2714ysrhqayfil14ap2pdks0auk128sl6oc0k49ouv32gh03916rqm6bjsk595ohrtt3i76tqwojvzap2ol57euzcnl6tdo8bxgq1ijdc09rzrumyb321pyuqdjhawpmm4jro8w53towd3kjbkm6cgw3b1pvxz91',
                version: 'wf8fnrwxvrdtaft2wqfn',
                parameterGroup: '9vu80zdfdl75kr6mme60bumfrqvzkqkzxeltf5gi59jnxgxioeg0u69w75szwp6hstpvglxuwipx5zll78u7cfrvb2nsyqzzkjt0rm6w54k7yqqblh7yluuq0ukf6zumvnzxmodm5k2munr2vhce5ivua4ptetj3muzo2h2iz7nf6yj4wvx8vbo3wtbz4jsok2ap126hpteai6sy378s7im1v016sltq9mp2o5x9awbfeotq8n9jfruwxfk911w',
                name: '84x21qbarc06m106ojol9n8mkyj0r59qsaune8bhxgd0yzbg1t7zqjn5fpobzsnt5xlujsucaowhno4lm16zer8ajto4hscu7ben9zpfszg1ascrxt908mywzay20fvfka235lwwkyr7rspysxsfpmmrvf5vwynpm6tjuf1zlw0c3udywff0wwys7lofue7i35cvpwx41znlfmlh0zx7k1yjygkp7ykns2j1ztpg4mkc6tkp8cvhx9inb4lxt16cvezox7hg9gkckr9oahtyynpird3d7hp91aelbym31zkkfkuv0nxtzks6vvwot1k7',
                parameterName: 'fvnqm89th4z203sm3r73o6mg9f2a6bmq5q2536z8rohhaevhx0zrwvhzy0i8yf1e3qhki571hocrd8vd3lragn5dejh81ciu8gyt99q598g932sknfz65bkcn5i51t56ss0o97nci21au7mvdu5215xegzyb5r7tiia1cxdczz8tez2f1jkm23b0o0ywqmuz7onqlnk3entr6q1e4fv5l6g8upl0qpkp3lz3d35l4q50ios8ccjhxkmzo84udw3atih0rp5lxjoj1ygjyd4c59dv32u7w7nn5r9z7x83mj3tb0civk7emzjcl7huzw1b',
                parameterValue: 'rb01aov6l6regjpiti59t0g30c1e8sbl90s20jeyz4bi5ve06rkl2suf56ti8natflghtmvw4auqdqb4e3w03sl4d3o4fdjzw6u3yq0txkvnbip6xlg3r7niigs8hilry9pjc3jxnv6hxvr8avp6ptlg2ry2mq0qszi58c5y34ey0miztr7ebyywk72tj979eh23h24bf36ovobfr6rf1gq3ryjjeakfeonepvorvggko5b3zs10sgu333mxfxvd7ps8tsc8xrph1xd3pyyapagvz8tiaxchz1eky5c496yp7qyf3gjqxj8f2plf3pjyfbqln09n2aek4vwn44oeo5t4e6h2gqwlenbsgh414qvh85k4iq0b6zdsrur9sl62dsnalyu3nlml3da91j68lh67uy133rs6i1uc0l26j8mv6c7ih2zgtxf8whuamws3tlcig236w2aiionjn2q98vcqwgwbx4sqmhpez05vk4xk97oxf3havrhhz9eprp76j9aj4eoimvu3vfxia93u5f3c1t0rdhif71w7p0kofot30avwm2dzwjwpeix12z752yh8ehf5l41mcquzcwb7a5lmjx5605sq393vntspqad96lbf94xgsjf5c24sjt30pgirbdu34svtbxm64ou9c6qrzc1hmcuqog6u765r8xdbfh4zmj85a7ebtq92wuakvts8vh7f984bx8yagzkjqj1ig6ypxe7a8xjl27l9tvljh17n8p882g6q5107y5kvrd8r4kg0obw5lbt1j7mmcbikmicjmo4hfgu4bmc12ppq1hn4n91vwnsa254xx9tw1pdx5k9g6tpexwm25fgt1a46fjhfo4h0ps9nzya1zqryf89nd9s9e1ga0kn2lf7nbehy9q4a3e1le0s69eqq4zc06gy63apea406xs8v2zyxq98q6xpgrb308lzhxzusersf1wrmoqg072k8iov8zjg2e8aomqcbzqagsiul02pny7ufviacj3v0ibp2415r',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '64685734-cd17-41d8-b1b0-96c34f75142e'));
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/42f8c55a-1542-4f76-a65c-357872c7c64b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/64685734-cd17-41d8-b1b0-96c34f75142e')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateModule - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateModuleInput!)
                    {
                        bplusItSappiCreateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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

    test(`/GraphQL bplusItSappiCreateModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateModuleInput!)
                    {
                        bplusItSappiCreateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '9c0d5a0b-e7b7-4906-964d-1d0319557500',
                        tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                        tenantCode: '9665pq1853knly7137lwolkdqqgwx97pjr296xnssmsavrdrcb',
                        systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                        systemName: 'movvileo8af1e171crlk',
                        channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                        channelParty: 'q2u86619442yx3nnhtd41s2oy6k801x4s138agk9fx0lqj5l5sov38nnmbhm5ko2kgini7gfbcsukdmjpxlcq1it36pqmf9cexpqw1jrfcpl2ej8ki2a3knr46xf0nwivg4saldes81qc1iwrvha4n8fo63vj21g',
                        channelComponent: '8qtmdrkr102c51iqs8rbry87es6nptqvj0l6l4qtc0z31ghw7wcbstfas9cokzj6uexcojq21ujw6fbbzpgwxwqsucwpc3lelkadanap9vf4l7ckkal7nazqh2462fleg9y04n9vr9njizsu64wjq4e06hygp1db',
                        channelName: 'l11i6ir5c00ml1bgcztgxme7rp7uq1fqebzxy4b4r2gj15f9ldv4bjg7h3cdwbpbo8281zuibolxwuuwovusq4jkegl3tkmlj8kwz1uh6kgcv13ovy60bd0va8ieswtvsz27ez1ymrk96g363rn59z3byq3vkva8',
                        flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                        flowParty: '7rr7b4af71r7zxpvp38hnrqfydfnmd231wav4g9muhp7n278br6zgvmwrpr1sw0ij4xk9ic8tkgr3utmsl6wv4710woxnt0s3tfxpqpan1fock7aqznpebjs6rqacv3h679n7rauglhtx2cgu3bea5jelbx4gzoh',
                        flowComponent: '92nb2c2vrqo40asfubb1v4pn837aa0biojggsjmbeg8b33by19439o2uct5dm4269b93ncpwdxlnop5g8rfe6n210wgwonrqe6s0sdvjsqtuhjhzrok1qp7v04g2k44u49uc3r26ro7j4jsw2yf7k73gun8vxzb3',
                        flowInterfaceName: 'dl6arxst74e980i7zrx9x7o5wlfgd2ooy0n3omd5wk7rebwemht7m3kxnfokmabnvantcstnp4yb9yejiyegmu7q5p9vlzm4i49su13al3jsol9wennp5eed0bxu24dgotls8fff0q58j860pksblq11myfp09px',
                        flowInterfaceNamespace: 'deoj1s5hsb42iinzla9vw9xqvfertztdsujeom9ks9e76v9gid4rf1wv2vu5g81fmpmspbvr4xj34p9ibuvfx2118yjbqvpqxyhngce5zmxc19hvdex881zan5yg7ln83ypqrghpf6vglkg07adtqwx9md6uf9i3',
                        version: '7t7ob0h51wzjgvke2nxq',
                        parameterGroup: 'svj8i57nyel15qx6bo2692t6x7d83nldmrfnh6sckdwvol5guj9mz8yp4t7vgrljw5bkn6kkneq7xaegzjrn6hhc05t8t01p0x2jfb4nqb148vrmdxall7vfr9q32zz008jbrzm302lqv7lkbdc2k094afv1b39y1u1drrj1ecty8b7yrgk5508krpnhqm3430u2fi6aomgltr0dqj4em7oqru65f4az6ahhsvijsc9lap40fg86wynilgvc5qy',
                        name: 'a717j1taww9sciax9i2l6vacwnnfbkcdbxlx6eqej1erzebdhtgj8xds5y6jvd7dqeuvuv3lf5dncftnqulwkfqqg1p7w5g4ng5rqic4uig33d02wjvtduxchgp0l37n7qcjrmpxdhg5y2zfhssgrz76jmrjku00kkqpa0h0sgbebi5a07fw1trx553pv5yc6rbztjdvehzo7d2n60g9qiwjgwml5t1tgqaabcbu3jtxikj560qztr8b424ww4481duijj6mgqgcih9xkh83lf3e9dmu57g6n9lyn7iwp0yfmvibyy6c6cj9xcaww1iw',
                        parameterName: 'vwkbpscseopk5wu88i8dmfekhmd6lyfowwxcrwidedvtmjbeg0xkqqm6dgjx5rmlpwdyyvb5u53sgr8exc2golypz1q1y6m787b7ucx5xhedjvcfiv77gfo1ly0jrscptb1aqmc95tmdvmk67bpln0i58avgvbuxzwopcye5h3hq5vavmq8c8chjaq5004kuhaoji6chdxonbqf85hnc3wa89k2qxdrjg4vsempcmnz66tgjtf1l2bzfhqh3jqfposckiot8fc3416bt6gwj5e36opkebqab0gqaxtxh3ihhpsqnhzt2vvxpvcwmf9d6',
                        parameterValue: 'szzrhqukfzoiriqar114zlv849iue7iv56g07s05epjxkj0j4jihgqsjsaz701cz8hhr03t948uxpq5kkxuvddprc10gluh8rp9mvkjen6ffvju0ryobo1npv8r82r90y3iz79sqrclxq5jzyotsqenkdodgdr8kfmtcidaqshd7wgjhzj9gttik5ioiyngdd541m4mj2eqdl34p4lhjkzzadwsqd7ptr039b1ncvvbt7mpmy13m2eqhzn3fzweoitzn97e2hjnt3vhzgh5881amht58vcq4ro85mwns6id380molh60tgfhsagmo9lsqtgypdj29q06en52gb4cbljyo6t354p8ce589ma26sn06w0rt9ic0js7phh5cge12gmqkwld7hz6jw4b44a5mnes38uizju3tp3u3ak1iwmlkxp4rz93l7umb5c02nob89x16bg8r0ghhfqgz6a2n7i9p194ixsoepact6ange42bxnlh212g64ze9y86u5yokbw2rr167s94jxif2istb7see9jzyl1pwc5gfm8qqjq6rnl0fi21alxf6v2wtczkopkuf51kalkbz19cx12cwdgwqcleehu0ql45yq4nkon72fs38h2m28payn8fdu5s7zdaoxg0bihjkqyrh3u8icwzxwlud0rglp1jqfn0nkooqt1kp11q1occawbc6e047t8dszo6w4u2qy3642w5rj90oo75nezmtc29z3tqc83zvzgkcv3e8zw8s3ompxoxbs28n9d6b0upm33f9d78z12c3r5hd8nmc69fjd4q02erg3qp0h7h60xmbif8sy7344cejxevn3vgub9iz8ahdw3b2neoflnp9c3js98iyb5uf50bc7pvzrlwk0xuly89j3fyignhnums2x0turxmnx6q2zte2gm5c436skxdii3097gmjgjch9lf9g3964n6r0jg00rbkj4a62284j12kjtypwvbpg2n07lxbxk5eo5mnphe3gxb0wjn7h2y2td',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', '9c0d5a0b-e7b7-4906-964d-1d0319557500');
            });
    });

    test(`/GraphQL bplusItSappiPaginateModules`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateModules (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateModules.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateModules.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateModules.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindModule - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindModule (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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
                            value   : '8fe748a8-de12-4fd4-ab51-2de5aa6933e0'
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

    test(`/GraphQL bplusItSappiFindModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindModule (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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
                            value   : '64685734-cd17-41d8-b1b0-96c34f75142e'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('64685734-cd17-41d8-b1b0-96c34f75142e');
            });
    });

    test(`/GraphQL bplusItSappiFindModuleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindModuleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1440838e-c152-40e5-a2ca-c4642cb87ec4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindModuleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindModuleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '64685734-cd17-41d8-b1b0-96c34f75142e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('64685734-cd17-41d8-b1b0-96c34f75142e');
            });
    });

    test(`/GraphQL bplusItSappiGetModules`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetModules (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetModules.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateModule - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateModuleInput!)
                    {
                        bplusItSappiUpdateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '1b106d6d-2310-41ac-b1fe-db43a309cf4e',
                        tenantId: '4370e77b-773c-4312-9f59-b3ecb4685649',
                        tenantCode: 'am834cjy3d2x3v7xn0q7k9uczsebuo82v3eg3883dzrfkemn5p',
                        systemId: '3b70d46e-794a-4e1b-bd5d-ff7c053921a9',
                        systemName: '21h2lcdf0cdhgx6b5zsr',
                        channelId: '1e95a688-2328-41fe-8f0b-a97a9c764c6c',
                        channelParty: 'u0bhr5bdmwe9xek27b73dh87b0orizmuod7k89e2oh9rr2mkuz5tjrx9bf8zg4itj09tut8sysz4o6yejsa0sbpnhg8i1einofm8hfpl2h5382qn0cb3mtslgj3344o9jd4ioafyj7yr929engvqwquqdg9o953g',
                        channelComponent: 'slrgczy3e640b1ok7i8q9jxkxqhcllnhwujf9z4vyroxedsnpqbm2gz2p4b4u8o4smk75197sw00rzcpub3onawjm3b7agdtxei8dpai4s92hkfjd31c286fpd91zzkdbswejcoh3fy1dkm5m5tja4erbsau1doq',
                        channelName: 'g9z25q1a09xx050gbyhzzj1vqy08c9r2372gk1dqycz3u16evb7tq357g7g87clsau2nyalvmm3yrvdeikn5dquc6ort2vu56ygvibpd781gwb0eyi1c1nlonz85c3pbkugclzzw8kjjgy2ogwhrzrfyntggbi37',
                        flowId: '5ad59871-70a2-4595-b224-3279432b7220',
                        flowParty: '8mse1rz6c85wqfrru76ihjcgfynpk04di6cbnqiaxv7w0t31t2s3km2a5xq8kkg55xby8bvdc0qz8kivs7ck0j9x50fmve0j0bu0kbqpqtst4b568t4dwx5n03gwr6ghm9am8169zuwafc78k47nzgk3eoedrhpf',
                        flowComponent: 'bfc472tlzxuds5ef0edlbinytqjl87u1i7liipct20wrgcntqk2xzj3ay0763n3btmdnrl4j28mv6nc6v6k3cvv82pxu8oxwwj9cpftuortcyd0k5wv10huyt67prljs1edt7lnme1bqvauiqky8u4z04fbn9u8e',
                        flowInterfaceName: '2u8er8nlwjm4fvkw0k1rsae3agbtmp32b7eo6nuen2zupxkgzmj1knwyscnfuc685kv03ag89xxfdrtp8nfvups1b59szmnod8y58fsbzh0m5k2xtphmqluwdz56f1rygry5jqrwqhvk909hiu7bvsx0bt0s3uf9',
                        flowInterfaceNamespace: 'syxazyf84757jyrv57pp6pmkaxx8scz8fuomutlfo4vd28sfifvvucrjtz4abw4w6lkk5auffe3bzoxsqd5lvkfif4rbymh4glkpcrt0ghh0poxpdgthfpcvg2rwh02muovhqxk12snuerghlcfwy3d7229pb2vo',
                        version: 'm6ne011hkinq82i4jwl5',
                        parameterGroup: 'mt4g1qz51niqjyrielj2k72z7e3gw973kkhodjj1nk8h3pzuggc5phghz2rjds1abkscg2zaajpj0adq87lauzcbccxda0us8ftnznolz38rowu9frwfy1t7kru6zcjzny57f81cl9ro5w10mwuh6w2rohnqj9zxh4apdmn7tr94nvxfyt6t2tmlf2jcpr55zq12fkztioiy17e6ix3z8e18k2cwsdbmr8hwthbj60p2zrjl33vn5jorwsgzl1g',
                        name: 'ey5pwbk7itri4j1gb5u9m9gidmcljqycwr6y4zcagfkbjuzlfv7uukd4ynhv4q1ro4zbxwd3vc0u324i8on7wuu51a619xpffbnvb83m7qba7un7pkk7ezmz2her80tm7heksuf177blenf4he0d4a5ses3w40snlu6mxx3ojvi6tmaufxybsms2df22b9bp2ysgrxjw1nr3ofqe558vwee6doy0w6xiezytpyo4sthacdl11eamkdys6accf8tz2qc68z5raa57dn3igxu7t63sb3d0pia4zx8ngbzk2ma08ibb0ho7nqbno5el0gc1',
                        parameterName: 'bctg694rdkhacwnxr1kwhjn5mc924juica4m2k5gp36kpm2wezpqce43ebk30tnvby4j83frq85hh92rjty0fmv68ujlp3fgt7et6o3nboup9lm6qql83lddeqw1jeevluisk27vu38wqtvtowfnypdeb301ts6652h015j2ybuyyybvfn1egvqlb5ukjfn7d217o2olozc534ckba4pi1musjjroxrn4fedng4nrc36gh1p4rudsxs1ghwc02d2n09n0zogj8k4nbn9uguvd9koj7hbhr64uormko48il4p9ivlb1as1z6kavramjke',
                        parameterValue: 'majj9v9ap1ij9j74h4id3av0oma4sr2waii3k4er3no6ghj6jqfhjrnp2od06t1va9r9pjdyp5ds5k6uxphavaz01jsi8cbkxban5rrpquiqqhpshlvvjaihd55ioqyyhqcikw0yb3i2xbeke2byzt9wxtdxzhf5vhwduuogm4v6kln895eme8500ldqg36slbd27q6buc8qzq68epm3kngjd2nkkyrwuymfl9i9c6inl6an5smfqrwts7zdsdggep6xk4lyeux9og9cqpzgro77e1p1tm6tp8qq6i0zxz6fleiqtx86s3v03pb2zd3wful7dn3vhxzxtm8bzbtdh8t82wcy8yaup8sfhc5pbr4jgpp2ttlsjwveloeso33bjmt4k7awvuvhq70oe1iyp7y27r0rouewe0piul0bxr6iurk5it07ckw6cdu32er483uyokpgwneyhey04hheupgq5062xnsobdui9nbo7n24bn8ylinftevo97dithvcu2jy0x30lvku35hf0705txq85ko00l9kgxeoh2qlgz5jmemkdh84ncttlzgfic3qqtmfc4ndtdmsqal2ld15fh00xcley28pfw96i0voe43n23ysh5yrboq8axnj5tj2lmu4aohrqn7s3dbf1c1gegpdnah5cutu9emfbqydhaw3o9mace892cd51dshf7zx0v474mggwtiamtksi9j7wcyyw61w303wz6hkh11763kyvjbco2dxm0524ydzdvgmtpif0b46ikj0u6602fq7x25ztw8bnv268yt569k56lajgbv0pmdp712n9gcdfrbmxqgru5o39pqv9tud9sfvb1jjd54di9kzwchl3z9avahe17e9v6wvycgri8784pc6xt9x20szuzk3lujphgnwkwms992eil5g0ufm8ik9njidl5980c5hmrxe8yghau4u3s63sb7ofm90x0e6pniuopr0grk870r7eoyj0pwshm8potn48ly3ve2o028uzobl',
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

    test(`/GraphQL bplusItSappiUpdateModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateModuleInput!)
                    {
                        bplusItSappiUpdateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '64685734-cd17-41d8-b1b0-96c34f75142e',
                        tenantId: 'aaa34636-2cfe-43cd-a83e-651c47420390',
                        tenantCode: 'xbdzkx1t0uuq21z45ig2w9u047lf1yvzhapp17wfdxvbwhus8o',
                        systemId: 'b8609cf0-0e90-47be-8a34-6be9bf537ed4',
                        systemName: 'aomjt6zljf8ekacybe0n',
                        channelId: 'e8a2dfbe-32a6-4185-bad6-e05196afab10',
                        channelParty: 'aodj8w11nsyjoxf6pwfvd9gxj3yxgukosour4yvejcv5yk8dl3377n70xcufm8x4gnlycr3vlz3k0a451zjguzclh1qt3cxo29iopfik2149mvh6lrmieonexpxprvk0jq55ij472fynhg1fx84de2ntken4hwy1',
                        channelComponent: 'mcp4ac5yuyzsy7p1hatdf5n2zhd38sy3l9wn8aiveqeza0l89cmsmf08ia31g6ej8lkgx7sizb2au46twxzrvok4a079dqvpcqrpikls1oii4ilwiqxilqoyzp1a5ju0q0f3wndij93798vfzqse1zqh909b71om',
                        channelName: 'c0prp89tn0igxd1cqp5p6pu7uqcfd5s670zdjn5jmv60ua59dopdo9cq93unx97dsaz4c9eizjk5vv51uuo3m8fhf46p0m0xa6afa9jiisz8l8skh7nreg5nwcqvqr49zswmad1ejp27og5ps8o617fk7fwes8do',
                        flowId: '4bcb77f8-2248-4717-bf10-697efa4afa2f',
                        flowParty: 'jm52evi1ep5djw5nu1cn36x22zhfwcnthxfblxzk7dcrypqjizsodoebg3gje4en8preyuosiosl3ph7fvvc1lemnwi97acykdcs7g723tij1d69rd8ty97ua40vear8ykqyuxn4bg1zstelfvg9jmjlso9ccicn',
                        flowComponent: 'crdgjtij574ocfkanz3s4cl6wjosc7f8tz0fvh38pzxuejgqf8ugn540o8vmddz2pu6z8oggp3gxzahliqqc2jijc9o8wz8zfyuesgu2ptx0ua5mf1kszk6oqmo7dmn7bact3pq6bccop3i5s4c19mgf65b1x14p',
                        flowInterfaceName: 'gtwbldnxzl66iuywm5a0mitjt1ubnfb28i8kkujufkyr2iwremiqoqylzk6g41zl1cqydyskueje941fpdv7ca9a6jnybh0e7shpped15uhqg5be8ca9cwwlwjtt1x2vwvpasmzus3534dj4a0cnzxgghx97ql76',
                        flowInterfaceNamespace: '87sz2y7173j8odb0nueh3g8t8116wvwe5fzqdpnmwbj5x07x35e3m8ll50sbde863xu41x7fro636qtactqdasi03yldowj5ar7zpeh6ao4hk7wbui5lw09fs54uxk5wrzi0yzcju4rglnohhqhf1xshzuu8tc3b',
                        version: 'djqiey09xxx9y48kyqbs',
                        parameterGroup: 'n8bhf08u18jdhk16z32xdkd7likeyvrqm3jwwx66s2vr82wjyv1x1r9bhztwoggfpt4d02y7v71psb74rej82utdwsvjumov1t3j6hl366ez26g8y941ais1eeq6a129gvg5w8lxf2k2yy8vcv9qdk7giw59rrhfks646pp8m47irpmjtus6fg8834q4qngx2qzzaak9136w7vy8by716ef3p9vgavg7l74snuyfepitrzvoay6ku603cj2n7rz',
                        name: 'b0jd49dajucm2xjw52ds06804idbumt1w5lyq4urxuenxt7pt1yqu5n0qlg9jythp9aq34iy8a74adjy0cuuisjymg9aqkdjcvbe0pim3efiyuzlfw4ntqpsuh3j6koxg7w7r05folk0qw69czw0ko4qc1l36gkvql8c5sxst6p0yhifrh9n6lhay082drls2oesoxsn6dbst7sm283j9r0d7oamzapnf7e9v1h1znie5nwfn3z8r9kfnp9fx9cjyu0r6mpsjpzpr1qov62v7bq6l86pbtgkdgkoccbqv6duake3ylhyhs1a84d35myf',
                        parameterName: 'z39bzvdwaagy9gqv62gfw3s3f18fyt43dl83oyxlivkcma2ex72fbt5ji3vlhznhpdx8p0ou3o0og0ngcrcs4k188xak24qa4ignvhjgfrnv54hbwbbffoi3u1u4671r6doc93huv3u42gtzp8lntlfduytsgqa4qq477vh6zxhp3y9pzi0l3fqce7m3rrtbnzeyvnubeunxdlj3wf2rowifdu29sen2e6jban50cn9i0dlh9u6r4p84f5dxdqquuc6fhb2ugv0d4rlvbok84ogrrb9aj3grx65f5ayhclnma3am8jujcid6rp2akymq',
                        parameterValue: 'ejizc4wlgqj6sfiupn53muay1k7y4fhrsb5p0386ehspdtzidknme4mm3ln4yphlad0i8dvu0dgzmgvwlbmno00m6dmgjnipswvi1d9r7hc45nnuu8q82mc52ny6ild0qxwfu91o11kxsrhs1cdezd4n629cqia4tqrvib36qvixuday9nv7craojucj81flgq25vwa5qt31ilqzsk73qbjtuw32g35n0yi4melfyfdd7qu7sb1fla4os3wa27p3d6msrwwjgdo4fl8j97t6usa9o25ugh2uerqb9iqeermobjdn0yupv2g6o6y9ah1hz0dkyyiwpq7r4e7y7sfmq2rgc3lft81ebuyzj1faekcwiyix1buflnhnm8vki0riznhpgs4e7bujfd22sjpd1dlfvafqz9axsfm0ac8yoei7u0e38toal8hpxl6a123m404c0nqa00zle01vhueylw83yj2a9qlpstm1ib6ci8octgvguboib0evbz0eas4r3hgu0dflugqs7hy1g8wltf568xtqcyisjv82nx64gy4sipnbvexof709qqp6x9aqli79ehoe7lziqncsqc0swwsqd8jgsj73fjuvpf6tapizalw7xw1gfqoyqq8cvtacq42h5foiugw79650vzjjqdx5ngfq1mlyk0s5c327kfahfljh1sg4wysajce20dxu2pyg2btd259mplkuylde1nobnr23punqu1c0c1qncm8u7prowz32ywjgrfovs2e0s7s9bsbry7aak859wkzjf0bzp0d4pgl6lfskc6zqwd8jee8pnj34j6ia2yekchcqfk0wjehb1w61083bsfgmbmcbpxq0v876lsh8m9qd2fojd9r2oj7l9n9m6m5o8nw9yhgj48w2bdrzyidrwhinimgn26nplrmkeqt1maa5y2e9jpqol8mpkb5ylcbz7ce978wk51yp85zai0onjt71ncsp31m5m5tgs4vld5fdycrahf1pd5fallfpkjj3re5z',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('64685734-cd17-41d8-b1b0-96c34f75142e');
            });
    });

    test(`/GraphQL bplusItSappiDeleteModuleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteModuleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '67ae0bd8-7e73-4f3a-ab6a-855787a059cd'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteModuleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteModuleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '64685734-cd17-41d8-b1b0-96c34f75142e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('64685734-cd17-41d8-b1b0-96c34f75142e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});