import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelRepository } from '@hades/bplus-it-sappi/channel/domain/channel.repository';
import { MockChannelRepository } from '@hades/bplus-it-sappi/channel/infrastructure/mock/mock-channel.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('channel', () => 
{
    let app: INestApplication;
    let repository: MockChannelRepository;
    
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
            .overrideProvider(IChannelRepository)
            .useClass(MockChannelRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockChannelRepository>module.get<IChannelRepository>(IChannelRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'wff0uv9ipzvl2u2g99aut2izwpj4qdovm5055amxz2ebva3fdw',
                version: 'bfa9lystq5p8r8pj0206',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: '7b1rvmu1r993ntccev6lgmqj8voiv4webaw9ryb54kvygno2jza7znuajujbjzznx8yowedseenw7farj99s82mtr3i35s126t1p5rbfbpi8j95ejr6xoa89mc3c5lfdn0dlgzbdhdwa9jskuuj052geml9ylvwz',
                component: 'jimqigkoj4a9qzlsa1ehu6f43ai16xdjfqdn5jcmgmf80lx1pw4ll9b1fhrw0fejtit2whw6j4o9ybuwync1pkubk0y73g3p47kwq0v7fv7nyyw3zg7sgdc137isl0m2u79knae1oap3xfs56zcho59elwldqivo',
                name: '8haxavusut1pcg0aa9tz39rfevrhphmxymfiu53mn6jo3rgrx0gf1es7774zn2l5yni4gpal570ian6u6944lc4vioo05qgoe4knkaxa22ae6ybtm5asb3oip9gc5w7b5jo00pep4ndsrdz9pm56otglp3oendyk',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'i5cp3wpr23e7swboi94wa56r6fpnnlyrztdqbzi8j45gwqgsfsdyagzss7arklfjrskoyqxwdhbq99250i5q0o4eyv3yowcadcrs4yc11uskz4dlraugyvbq9zwjd6efzsdesxazm3cajicaw1caymm13f46rf4b',
                flowComponent: 'qsaodx1dpnu5b3rgz3houzxbgbyzgb36f6kviqd95c2av5d7yr3vfljn3cezpuvg7wa4us953qumitw4q5puprh17nsvocikdmaigdjoqmdks0jbq3qgl32saha6qrgpoxi24dimk59a8npifri03w7nazzdkoao',
                flowInterfaceName: '3c9bf2co80tro9dikmrnig0bpboo3a4n3bsg4f216z9xi400g29necx2j7agyj3m69yvoxpcfrogxv777y9rgcdx237mpybwvppn4il2ab123l4p4hx71qkq5zqiqyyapch211m7ya148ynml2thr5b4rrie6ybz',
                flowInterfaceNamespace: 'udtsqnjfanfzr29l1wyla5u8n24lzgenlo4s5u9gxbyumpl9h0xof0bffer6d3hus3ioykpeoz2fc3brduqzl69iukiixsfsp9cy2t761lvtee9oc5he18g4puxlvxxqiimytrq5ilb8nsht2bn5kom14oaysiub',
                adapterType: '0su04l4z06fqdmj0mrvo7fxz3mxubv5uh00nh4i247qj8lz5unlujgcvjwxg',
                direction: 'RECEIVER',
                transportProtocol: 'm7i0avy5blegnhhke4og6rxf75rcdrm0ihirj3yvfebjemzmg1w2qwe081ge',
                messageProtocol: 'ah1cq4ewvpyhz5s1zcdv2jmgsjftgspq3wrywi1igwavwwq99g58bodm9bt7',
                adapterEngineName: '89tk97agau7pm8gs9j9lyoa3h1g0ack1zp5xly50tqxrrjg2sh1bj5c91g5i3alog5tw3cloaaawmlvdf2l1o4cgce8yp8mmjhcimrm4lrld00ef7c4ynmyy2i6kigacimglytyncrozctfwqip8sju9lxt8oo8i',
                url: 'kn96gnn0li9h9hsoaj2xvluqdzjyj8gj0xmctm4z8o78shlou7jk7hs10wc64z79044egfj6pzmxf8jo3tm2mvuqj507vnq6hunp0gz289qw0om5qn3iy35xxzboa1e56z6u2l2ow2a58keiiy5wdgsbme3m5zlg0xnmwvpx3rik8dvanet6u12uontjqx6qv45pz3gia6txsjrpwbr2g342hmzreglbmyvcn14trb241hkozgzl1pcouf4cdemkqlhpy5mqer8l1ezm8rajyr22ncz53dr03mxq7pwo24kwshlvu81b5o7bpx4xjrrp',
                username: 'otmpjowscyx4at1h4inv3ekb7t7lz2y1w6tug10re9wqxgxoxbk255eghzqx',
                remoteHost: 'w1k030watfopgwlgr0oszr5lq85qo28liie5690er4h699txx8esmoq3mr0mkbgksa9i0p8mgvkn24yqhel6fiifwqvvy3guk26wztg7nxy5kiot4tg27hjka6rb9pi0t1ik9k6t7zjfrqg45jlruxaf50yif1i2',
                remotePort: 6828086397,
                directory: 'v72lxijaia9ts0r28t19paxn8s7x1eokulrfomnn4ll35076y53uf5i6flervfd4jhj7r7tu8en9i727zig5zbimv4ditw1q044jbxpwlok4fptd232jqqgiqprwktg99d97cj1bgac6v6rfvoveh51vz6k044ggjkbvrl52htv4ri8plhgc8joix8oxerenzmq0slixh3vmjrel0l33tp4kmp7fhtxco5evin7fm75glcpzs5qu2aldurati7ufx9avl8n0jaqf3rhe199862czqcit0warv4hrmx9n9tmxunt8depm6xzxzo6l9n0qb6nc2dpk2wiy4jlqtl3cjpeqxam5jwc53bgdohojnmro6nx0k7jgrtuhkyth20xobj32qvm9c5idxwgau503wj6n2bylqtdtytkpsxlhundis53d2kqxqoj2z02sevk19cfbaoo8552gm27eni8489j23rt5m96o0gq0knh0b1x66n4d7hxkm2kxskg1a9vjtkaq3w7bh0igrpzsxqyurwne0vcaratxagkt5vi5s1i0wd4re3yiay11ek8h9ch2fy4hohwdkpa5aa8fqi6k0qcp7tp1965vjyetzi8sqqpvv6mm1bzgi76ykg40bggw5kqi80vea0ht9b30u7s7a5q4l628mjwjm4rmdypa8f6ulqd6oviq2wr52vqgfnh7b76u8qiuxi70qsb6gvz2tu8o6rr3ytex2cshgg48h98jsjbak9vckf6eu5kpm1bn3w637vquex64pa4hvvkyl4ehdmtnjnkmt47mmorr2eypu66jjk6rnt1lsq6jywppozi0m5hau0h544gc6txmrgs841naxri1usck0b0prqiihryie83qs4mvuwc81h2sk7k621q8x8fg14l37uxgh5fww1482zm2fbne2j0n70yh58ydd6y3azs4huabyo4ifxwy94doc8yim1o5wytco74zk7e89d44c9gkvzjrisw6g701ke9x3dfacgj59d6t',
                fileSchema: 'fgha7e5ycsm3amnwocd51ag4qbtxafwbg9bxmavjltvjepnesn12kpm7skw70ftkkqs5r79bqb18z5uckkoci34z0amdtukwjveesh4he79ssa9cokt6n3x7fmbfsbdexb09f7fz7z71yfbefkdnhyvq4tbx5d68yhgkdtdwml5ae4gr3ka9382aqmfjr52wruzj9l9hm9wyg9mcv0zqkom730kkz2reg3wk2aha8ehwprksdjxmcfr24ej2o4rgn96jvz0bavzv21wnqxula9wg69lawmvp912135u82hwxgb5ctnulo0r56na80ioaxt6jz48j3rec94ld1ajgvow2m2ps0ddf6pujpvbn8oqf2r93tkagycq6v9r26k88lz16q7ro7tl6qo3r9s1qnjcl3aupzuwnt19be27pz70f9da5aok5ksitypljx8k8p58s2a88vx5ponstccww6e3aj9xpth7o9flpsaijcydm4uilwm8vx0r4ae7dga5ytf9lcah9hbzcv3xhowjjx5jgfjz5zqzawqqr26jllows3xpc9tl9bkqdwy0t7d4hzmhze6it4i5qkd5pkplcnntgvzti7rsk03b007ug4w2wz4z0dyoutd1zby6ijxr42gsuth7vq5u69cqmt5p20cfx5uad0pbzlltoi5oqxjdleudutgelyqfmj9le90tcc2e9g16bsl1ztg2z6upoa74aylqedcd4742kpv5jxlos8jut3tusnsmkhvm9c31gsiy1k00xszgm5pr424xwfhqc2mh1t0mrle6tfgco9g027zbo7fbu5c2zyang9pkogdbsr25myfbm93v7sm280y84w9o6lpf5kczfgogvfikttr01dphvfujg7190iaiwa2z7iqwdyqep9pezivws71soxaj6xghmaf9x7h7dd51j1d4ju4hnrd49ho5sirotvcaolq829wu4mp9rphhp5v2o73fkpps7fk2icf5mivh43f7gzliupgnlpp8apzi0',
                proxyHost: 'm0fmshfqkslxqyu4q2npo83iueg7rrxf0de6z8oc943lgta3onhl5k0hovbc',
                proxyPort: 4268213288,
                destination: 'fqqqg878ar39m6s81pv43tj57nu8e2ae6wjjdaqsee0v9kw3jgod2rwt4odq1qrcvlqrservby9s07y6fdbszlnko1oupv6a8gp7ot0wcgr3ab236685qgs4gvsli53w37j8aq33ou7q0oqourv78zctiiy584yu',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'shukoinlfzc2xp7u07v8g5f9e3qx3iarpotv3ek79vo3oivzm3mnljzqhi1jtd7cepxjjhspj47isbjox8bgfqo9yqzxulse7prm1euqjwupr22cx08004gz0aaitlaw1fe77dd8o001rzc2jlqtct6qmiq78sj5',
                responsibleUserAccountName: 'pphndfeehnvo1hk3f8qt',
                lastChangeUserAccount: 'fgwfjs7xask6uvc7d7fg',
                lastChangedAt: '2020-07-27 14:11:21',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'u3qsyum60s661mudy7ibrj8fbgq1nd109m4dmsnv0jmx85d1eo',
                version: 'u3odgthfvrwd62xqd510',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: '1v6k1sank6lrdr2dxuv8jg5ppeg85cwua4urfqvwz9o94xbrrhd6rxgtrrnfpisjn4iax5fp0vzv4hi5bjtkdjke2rtpq5c5mp63b2x7z5ii78bwdjf1dp6iab9tiuky89zlilokpvkl8uulq3v216fhq5goerb6',
                component: '7lz7hm7dzilxetuzsqgormph31f2btkpsal34wzz0o3lj7mcnqnakbx5w6uvczzqo1afo1z7q846axquw4co87no8pnpscyhvfurazrkigsmwqe9m84g3tvdctvu9cy0vfxrtvuf53h30un1t0zi3xbxawcoo92u',
                name: 'pjup8yl66zkutoc2uakfz0p7dqiadk4p6cornwx4q9az1m1a0vz1wfgnmlj88387p4348zw0ol4ci2ae40usag0grmwc63jsz39xhoa2uwz9dfi0eju0xnn880ds8ri9y5w9yzsvg3qne57k0fbfieidjzuppqb9',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: '831q9pzrnect0ytfxk54vq5d2t9sdiz2kscabpctrgkors1ec1iwm405ra4trax7u8men5yerovisr5u0m9eernezp5yr1iot8yftro6pipjahwrmrsinbnvcvfdtwoikjrusvqvyzjkusah9g1wscu6ir770v4f',
                flowComponent: 'trrkcxnumbghgv4q7pi0uttee1x9m32qn49e45bjznw9h1z9lwyie5gvfvgfcqw25tvmei6llll3lzn4ltjxgv6z71isdjbq04jqlv6ewbndku9s3t4h79xabaqu46y1owzuxw2ggopvyu8wvioaseznu89ztihl',
                flowInterfaceName: 'z7bsy6so1guajqpuivjf9dkumiqyimh1dqx1m3prmsynx1hziwehkfh1wtj9xr5g0gsonh1ly7tijgxhn8ydbeslpuyc7s5la4rmte2n9ei8jpylp7js3hjxgrsc7jl6wqf66k6ahzjducjbta4on4wwzfu78zz0',
                flowInterfaceNamespace: 'dua1690x9d3y2xqroalkydiyftrvc35rpiwatqlertyoc0b6clwgom5mbfju4nrqlxk3wb0ybjtzb0gf2cl1zra87mgo89uh51bp6t8hsnme86ua0p2os6lsx3j5r6wh7te8bnqxrr7k3xrzzy5m20mk3z7w4yby',
                adapterType: 'mqvnw0xp1rifgvva4wapeapxe8pm9jpf6hy5vsjleqwkrj3yf4d5o91hb4gd',
                direction: 'RECEIVER',
                transportProtocol: 's32h3jgm7oj0lcmiakcw8xszsyldp5v51k4j1rjw64o91omdo31gzyssrgh4',
                messageProtocol: 'qgl7fhzxrywjrr04t17i08bsdxljnq6j5rh7xr0g8kxdpt4jj0pq74g08o91',
                adapterEngineName: '4kop2pr8euueimm14vtpaicv4llpk946ek50v2zy4fl5qabpsi9lbji59w79vjs2o7a8tgbvucml90v7j8zrirxw2jbw62rrkplum0btmpt2l2iw2a9493uludlvis1w9cf38hc9wkwfic5pv2ka6qazuqpvys8h',
                url: 'ln8r6vdxgz37nhify07dx73dv7334hhvlled5bmc85mhfh2tjcijlbvm4htjsv8m7dtu4fq81jp1eyghzqgnyrt3w1jprdpddeikf433q98h0sjhg77umcawc4453g3y4bsvcqffsfnpfk63dzjw0e4qlz7o2l8o0cvwe9qaexb2bb4mzzkau29uaqisplajedhc8az89my34ckoqmniufzngajvmy2b2dp2jqd4mml8xb9fnra7xxplqi0sd4ellqvtjhq0pded4scf7oarmjjngxq8chxwzrdh2zdcydlhhnm1va2e4gq69zx91lq1',
                username: '52ndujokwjr8l55wupjjg282trm5ry5q80dx8a4eckjswm1p9ozpv1wee2ci',
                remoteHost: 'eafrlxlvj5bukxe6u7vjfd54og81uetkem649ap83xha8g1zgsd2a2dwrhjthkkhbixw3bkvyl030r4im91zanqjhte5kc9irppbdwcpdz19pgw90v9rozavw70igv0k1xsp2rsx5rwgw4wa5xpr6lrwvr1hriq1',
                remotePort: 5978316609,
                directory: '8zptb6p766i0nnigetgix3nxhijz6zk76bdybe9971q8lrkvxlgyucbw1dbhr3al0hgjcqjgaltj4uc0mvkfvl7wlrsc5w55tocobteon550dfc1b9f9sxy73jo1vnw5jntxduandxq9st4k7s5oi2xsno2ysmg3jq3apuqdxpdshn84qkmyt1gg3fvy8je04e4x06a1xaqz1hbuw0lu5zcn6obfji8vw9n71p9h78tog1dh45si0wowz1td1vlp0vw7lafvme92gfkiasgv9y548oqg6liyegmkl3gic6rh1ht90ojo7ocuiak0q0c4cig75izmod5lzq54smqbdyymmwlzbi6c5cqynqz5h6lvuk5vhlm433acmzq3afi0yotqcocjspsq8jvwu6bok4w3hpy3qx5wrceu1h1zp0cl7gr2gxphg5q48xf27634dka2os10zjn6k2perk96ttqh1agpvibxeb5qhxaunr3oz32ln3socniyxrpj435fr6r9f4whe40co3wt7n1x5ep6yumq07hcvkz7cdyrmt8tsrw5y75h7u7rmow4j7wgi0le5rztwv3lgr5xxoxlw6q1o07pd0arejjz4dac2tgi4l5st9rp49qo3tk33kgnd996xw79ewa2a867achk4x9cxva7m9g7juptzhhduxijt35bc9s65essiu9m3beidrtjrwnp38wjhs9p0ccgqzqrf1ix9i67ymirkj4gmm1aeq13uw751zfuibmzhid52ijb3a8pob8eutr8lg4jc2sp8wsip45oa7q9luysmsbm3z3dn3276jtt604fvdwhuizlwc9v03fzyfflfsynvuaqz7o53yddiwdp0p0mzjtzy6fened9nhdr2nje78teovj3dfvc6a5n20xcl6prm68hrpfsutqltwvj9n5t6bi2l4y4xa4689g7mn9366lvj9xcairq1q6bch3jkt0cm5mznstxcihusph1105922w1z2xuo4arwk8zi5gw7w89',
                fileSchema: 'vfibsgeutru9slb17dyac4cn0g3cbcdzc3vidfo70oo4arb0l257ps3ikbvhlvzkvt8o4jado4t30sf5p4h7u1lwq6krez0ss2ih8apsj0novexe6dhsxgxj52rdyalcul1pb4tggbg7d4p18vv6h6nd9sae0tw3a3pfdj7en20t9avhv2proa1cgdaffw7gm6vo5wwxqeghth4ulvhwkqszbemsmwg0cgg3n4iyccxal2uxdu3pijubyqr1k1l7qw7i1ku3us11n8l8mskd5e1gg85hbsg0h94cbxv1bleebgdiqboxuhq5aiztfop2thhz36sgtcnxsuebujy5browvqjqlm6i5h5p4laz0tx5mt14b0loewx28gjygp0bdwv1rptfy2j4mw9rt4xkcfe1tuflxbiui0lq0659mp5if9kdrey03cgjl1e00sajz9hbknm8gnpg7myg1lhtrzhujm7iimbwthaokour6da61ov0kppxtoiv0cnf408rwrluurfbp18h6ucayd7e7b9wqk0zcwk745mwsljf9ok46tylxcye43jizv8uxfcp4o15vh1bqraq62nmbr5d7tif9m0wufh5l480fljvw5c9xsevye84rsbuy0mz4s8j2hujv24uvz12bhc218jj187ofe21zx37hkhc9xacd614flr3tmwk8zvxuenqf7ghfv14cjhkjf7n7saouzfrbmsjwc00g9bdn0g8z4xxtx1ks2wo9zoju47nna42t3sadhlp6gtmp3lywla7gmiv79bmk5vc12cfzstl4n5u76vwk5ue17vzvryxvzozwv53mp88zkbnk7qze5gp2rt30s1m55vsyco3y5wleooo9hift8s7am1l5hfkuhf8932ayjmv199j9hfj2oxtecwaylc8i1u0mnvf8mk5op1q5x88944el9mahypwtzq0oohfw3b8u675rut6evoyr4krlafybkwbb7lhbvxieh0ltzmznqxgs8tboc64q7gopyg1',
                proxyHost: 'd0enjmnun76bvn30z8kd9z8f8n0h17g1llgnw0c0pf1f3wb3mxy17oy1nuc4',
                proxyPort: 8738895424,
                destination: '8i9kceyprbed823orrixoo1j3f5ldqvon9e74yx7c2acdie6eolt6burisnf5b2u0sffm45h1yi69i08i5vjjjrkuzdjjno560kkc12mp985qxb4m2dde0b3mclna2epdxcqdjorgu76pbzhvv1hv85z5nzfdmzg',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'c7p8q99czu2op2pif3duw5qv1sfwteu6364xokmc71wiuiyyll5w8wtl0vucz3vlfxj40p7iqta4f7z4zvwqs02o2193xrr9pl5dpep7a1372xtb36ci3clnjtsz8jntiesvy27bfo2wbjusrbj3bwo5gpvllgsb',
                responsibleUserAccountName: 'zosbkxpewmroohilkezh',
                lastChangeUserAccount: 'v4fjoamxnv5wnwa00eud',
                lastChangedAt: '2020-07-27 11:25:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: null,
                tenantCode: '8ue3tvzcg9383mi5cirmn0reo9ad5y45th5szzsfy12fw1bqpi',
                version: 'nd073ehivp1hpq82eg6u',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'smhvgl2tyt1lvpqrpd77aktycqayknld8gqmxvl6cxiqcdjq10z7grar4czqjupo5za9pqnmvub4bb03welih3xykftha0v1zzq9i1th34u5fa98lvvitctwq9zivj7i5o5wwp9if6hzfez4p1b8e03dv5r5uwgv',
                component: '4zp6dp3xw46girvdoa4ttir92yjhrilzinjb606w02nuxfalvafmuofa2gqmwjlia4y6so2qb6rpgroc3lsaif70auca7i6bsu1i6m2xq34itq27i46s2rz5ps7wtf4uctlw9rtsmpzg5ur8afoetbrktlnoqx6l',
                name: '0krkss2bzb1zybun9tyna278dvluuvpze0o49rkigif0pliox7n9eltivwjkn4gjsh6gsjke0jczpqwuft327w9frqn4drimls95ket2hu8pabl91s4xm29gpdu8bqh522x4rz06yo9alq1kh7ae5d1d9qa7ocwd',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'okv73wp780s6628nuyn05znnhz2sd72xcmickve01e85rc2gtifz9vty26yw1o4y2d004uos82d7qcwskhdi6siqgtp8itar80ebkwl4yhmjqfqusfn11i3yxglx3zh0rgocrohs07vempsinpx27jl4723fpw1l',
                flowComponent: '78sy88v4wnyl101wzaekcodjg8sh7clkklaskzoprsx43y629xevinmxaodrbstv0jwy4rwf1m028i0vy3qrspzc20pu1s4fvdsxbi9olwn32xbrs6yppslcruwn1idxsr1ayb45uvu0mtpbpm9yo1c1unz6olhl',
                flowInterfaceName: 'jc6le5dt11kookuve1njaecald2a5myfr1erz88hx4yg3qy5ldgpo6k6jejsazx9h652v9zprwx6b0bfkrx4rlejaf46kng6bf2wj53y9gqm9jxtvawva8arwpukzu2xfmu3zzpyu99ux9i0x8o3kiip1yxm7lmm',
                flowInterfaceNamespace: 'sl4d08e1h6pv4jwi8hfrck3rr01lzfulct119v9dafr3q0j4lmqqqmrjj8xrt3ioh24wayjhxt7deg75stgscou7oxq6esn5f1ydf91jy39nmv57ul3997bw2fp272buwpl5oyugvytiqoxfia8bknlnek8k4iqu',
                adapterType: 'ltico2qwnvrqxgafhpriwjhavag2i2xbxumiqjjj3q52hgces1l1bjtw3c81',
                direction: 'SENDER',
                transportProtocol: 'q0aorxuzeedc46p09p4tjfennqn2te00lrrueeqvklt0gxdnkulax8mkl0pw',
                messageProtocol: 'rkflasvfz4mzjmip5wdzzn6xtwbis0tytd21wb57dh5dmmz8ic8ne6182t1m',
                adapterEngineName: 'hvqihq08qabdmftr0ot6c1p9jn4l72p9m4436jzvhlvygt2l2jarfrtpbn5l52nhpmhr97omogsoquxih7d3ke9pugub2i91muw9b964lcxv0mp930y818b59e0gelrrht3yp8rm5413faju68e9b6sxz3nggz5l',
                url: 'uur0uoaqqyavd2j0x4wa1g553vfqtigwy1y3s6dd7gmn80n2ptfzt8e1z4fr4okofa0td2m3hke9fsb45i9r7qgj8iqhbc3739511inn0qb9qcxgloarsmmjasbpt44lxj4utgbltvjspa2md56amkgtrtjht7g34iswwyfjf0tiwyx1pg59mqabz9d99wvhb2zdz6olv3eto40qv0u6lr263e5ald5u0zxworkgmx92itslqj2yimoko7bry7cd2ddty0y8z0gv1juh2xmfqztkxqywzx56cnvlenyj9vm5fcibh4t8uurwimssanbn',
                username: 'mjban9iv3bsnwx2qelplg5eeqecf7dnx7dddt3lkppt0xt7k9ng7xa8by0rz',
                remoteHost: 'il77mpmj1r44pjj8z115rlaioamnvhl4qh6jybh189f8qnmmi6aisivutag74j8ah6tfhqehap3ql6xlq2wgwv3knafao4522h6e30es4socakwsgabx1vxlo5ugvlhk681hy329zwi12y425kz18t6owxi84dha',
                remotePort: 2069950783,
                directory: '39x878ygtxfl8poz3pjzuv6vp2639i1vl9e77w59lkhg664t7gyp3k7azya3r4j43xr246jtpdj2jnjk4dteseg7b7zgvb3qajfturknuwvrt3f4ucnxdo8suvkzjdrt3cuum5hw0bzfkyl682qjyj8p1jrtvhw5ms05i0uri5q52i2joi3gk2useqfk43vjlxerecavb2pz4c039gnlstmupv09piy3ukyk0lzejxp9x1jkt6rwwkagsdbrhmpfm70ff9rf7610nfomtupeyeon8ooo87cztw4pklqz0jdt92q146ixi7eezodb0l8ug4u4em5rljaz39ouwlwfx21jw6hvwvgiek0pelp43bwymgtxbu9rx5irrtlm1eddyocec7wx9hpjxgdz5h63916npawt88d5dg42htynlwy3oxfezut5c0pwc9ehdl1ju4zrqd2sytgbb3zwy3ap1zmpqcvbxo6y4h7nb5o3tiemnalliqwcajoir2awyy3rw4bp4a1oyqn0uhkraao3c6fo59jnxcegxow1phyeaik8wqigso7nwb6m46upr7tet2ig4goahgczsddbspuw8yf1qwk1ehqlaygkagww183t15g2uhd37h7wnyrgk54ceqetnl9do97mfqjy9zsf22o0wzvo7ei8aer3aqadfayhyjnubwixyl0a0nkeqxgws0zn79inwalp8o4ppshv1re3nx9cviwhnjicyef12yfp886xm8c9oa3ug7qrv5aoqschy9hhs89sv9yc4fuycotddzystph34cmm4vlkjmqgr7lufvjkdw01y6ib1bl7veevwvt7o7vaxfdpryztn10ar0lgn18m77qf241v8p7le4ql3zqhykc7oxw5k4oidcv11m3o6zzosqs325osu29ucsfc5p6ymbri9pfova5uw2yrpddwj68o7oj3xd5n9zlrf0kj3l1g6it1meflsmrc10220i4fs2v00lp5idik0jh42pjq4yka1cvh5x43',
                fileSchema: 'wq42kccecc9qwfufl9a38wernmh8p4mcy5lw7t26quwaakc7j7ozhxfk3jg156dkyh23cszbbw4kg68i4rgwuawb0lwn6x283lzmtjhf2ekyhdjarwp47pmkk7rg3vcdewppylgpnw8drvqg6lfxtws7k67457k4k09b44r0hhvq5br6p7zhtlfg6an7fu2n9jta3y9owqqyphycj9vd0ayv8e1p5w8qof3iv012utda6yk8esiq3njpugkf7ylj226nwyqr6wjz1ax41dngx8slrrd9y3ywui60ss4x25zh2ptm3g7y31gbwhly0p5yq5qbz3492kugf4x48cglldzokc45ryjttkykt2nfshra4epy8udb5ef355s73zdcfggjcg5sh12db1cpy8n4ibktkqf7vdkiq2m5g7svdav8e8n6naurpvoxxpcgy5mbt9mafbteti95y3okh9rprtjdebeocsifxzlzui897zelqbzaqucjmb9exa3i3rmof2u70xya6ht9ylyl6p64y9jrtlksetc1hyejffe57ampfrjomiiz995xd4gegkq8izkcmo680n96wqz934aq8lrpefl1w2e29h7wlnt7ggkjxmgjuyzi3wujkibk2m9ym6n74p95kp7z567b0tlaptexqea8r69k4l66w3b3y2kfntpncnrva5vmyu9kxkqvxtik2y8fl67v47n5e7tzi9tlclyo8v6vq9vy7bxw34vpr2ja1jemh9dxc9yk0zcqkilsqv8vqh02b60ewpmi5azynv775jcji3936b7svay7g13it51vlnoslxlvt32d506i7oyq4gp4tbpxw1b2dd5lu5h80oe7utcye3fi4qdz4s6flm4uk4twcegwjan7awbr3qsif6km63khfr1i88ho6y2reqpqlwj1y9vkmmwqy3k3owm2l4s90m8iglvtd20bx3icgfzwosqt4cdxqyh8yll5ff2rd9mweat4bprmgudm8068n8oyxm6xwclc',
                proxyHost: 'st55xmpv016v273c88d5mo0mcvw6m5gig0vkxwa0mrg6v838qb9dfx31vy50',
                proxyPort: 3788819699,
                destination: 'gl4sod6mgsvt53ms2nei2iax1o0p21swq0qrai1hlbkenq2zyxxlfe1f4zf6yqprd1m679j5ut7sff3whs4mp5ht7g2wf7s5k7z8l36ijyhvn733mzu0w6ak50hpuql718c40yfpbf8k90gbc4qqryf8jbq3j37u',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '4y4fy6i9v23nkxxmwurip8w3z7fnszyozcaxilf4ughu0tdqecbc97enrq2dx76q7roqnbpqv9br5e0bzi0s3iqz7lmpp2te4g0cyjd5h1soj7a8kf65mtoers78622fki62jn70zgol9lddxhirhfsu20kpgux6',
                responsibleUserAccountName: '32ygugf0qqkjgholnx1r',
                lastChangeUserAccount: 'n6m3d3syxbxanupdqaq0',
                lastChangedAt: '2020-07-27 01:04:44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                
                tenantCode: '9ls8jm0v6idzug00ijiil5i4hslpfp2bbd5jfddlkfekz7rotl',
                version: '8m6yvy08efq5u6z3d5yj',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'kkgcltovwjm9q8n4m5cqagdpno40yve20v82salrt7ve9vo5w3t9h47bgd6ue9owwiahuwnccb77p1o7k5ge3ei3ux73vjqf7xcstr8gqtjlipnq9jauq1rbbk89jp5248qi1cscuyzxbnozprnm8k83qmtqc1z2',
                component: 'ox4g8ybypwotpto3pxirjj8c7cekkgt717e66us29m8cjhxsjebp34yu2c4urwf5hellpbnsru08w7nkmwrty9e1svduer3fi817hjdu01cyxv8rbnnu2tivgyesfqgsaimq75744rhndor0pbcltf9ebsgv4psn',
                name: '9ywjp80yt4hm61g0ywswcirwfn736tcehap9tdpgx7ul8jspf7ri9o069mqif9bhhogmztsfarmx1khydgkln50ds12n9jta56knnkmre2bj1cypisti73fyc9mgudtu13uzql0l18ep5g8cpj3f6isxm11sr007',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: '241n6t0lw34u3r2g6hbce95k4k7ovuu8c9nzslhj4032s1c397qyych4aexs20dof1sz3cjtvztq0w0n9axpd6u4bxxe2jppfmubi6a4ew4gw0bs97fwnafresectfzu0036flhd4s7nuym0oktfedopf1v4mkf2',
                flowComponent: 'vacrxt6oohfyb40f6e5eaxjz07626cxgwe3vysmoddhpuv6qynzbr1mlrbg25ue3zufr5jp11cl07gr5smgb7c1i239skagwynvcypd27xhthhduoxmrp71h8yftfelbbg2qfubp50d43khuknirnhxfzh7jhsqh',
                flowInterfaceName: '8da5e34i5meq2gtruoj3acco0wq40d5v84qak4jvujsqm4a4yroaqh1ll75w9ny0m4h6b6a9ei0os84wc6evu885rqh253z7zqldo5f2j3cd7a5m3fls6mt32zidr7gdqtdiyznspyiv2ccqgma6peubcnwojj61',
                flowInterfaceNamespace: '4s2znd8gjqercqm0co13xcfeqzoup34978gnpcs3lf6ig2znasjcceot7t99kqa3md45ymclwl9p2u60xss4zewuy6l2gwdet1n9v2kqulkiqisddb4wbve90yaty5matiay8ehk3heg8dxlnvvfl6vpsvza13fs',
                adapterType: 'qyvapahyity0pj8999jk726w7mxva3mt24p0u5tmhufgr8mm2ff7y48juhhr',
                direction: 'SENDER',
                transportProtocol: 'n5x2fv43751f7b4u8gpgqeah63vezq7iqyuepcd4y6tj19zhsfllm6lrhafh',
                messageProtocol: 'ncch4b2koy3c6awvrqz1nrdpymjk116n8v4ha7a22hsacrpxnr6kic2nmmej',
                adapterEngineName: 'u2sw3yi2msri3qe636zs829bz49v102zmu1f3ld3vgjztqn7xdeyqutwirnwftjdq8yxnubffmkppn6zlaj6qtvxnk7trp6k01jcrs259fvm67ottsdux53taphzxd9gca2fk1890r8wy9c6ntfgjqn2vukjq273',
                url: 'ni6kj4jjhdwkoea7vpzoedl1tkwdbkdz0r4re1ehbp75nf7ivv1yl8e7e8b8xw4670ryh62i6e0ajysctukxz5zlh2ct7e66xzqiec78v7slnypssv8pq9xo75pua7hgquo4klwa36sjq9sac5w1g4phohxquatwvppish1jchsp2g04dlvbmko8hlhak4yg37q0qsbbbrxfj75qevn6q3um8ago779wlr2wl2icisup4pzyryte7ejox28m3uothxdwunues9cd7ngb8pcgmx7driwhbmikbp856uluuwwabbyr7avoqmvylqv1v0qt',
                username: 'i97q66ii168dmhvrh0oat45qoa7q91qwlhrxjn98o685kt9rs372konflvs7',
                remoteHost: 'u8ohmyy3k4ctpc5s0pcjv11yi4wfhm9tcjaqbasnar4yvidzy3y8gygzjr77w86glg0kjb5ujuu6jxybp8ph0wijqs5ogk6kdtubu0oo5ys0hyf20dmztf83zv0hoxhdpv00lw2y15ev6g28l5ir545t9w4cmfzp',
                remotePort: 9975161847,
                directory: 'lx5164uyuhg3ng7dh6dd35u0r9ysqb5r11584yrb9q96c5r9lz8aptjnw5a05y9p2543596obrviwjo4p4ifl5ur852f0oc6l8vz8u8c8thj1n0zg0b5ztoydjdu9i3yrz4ol7q9upz480vnx8ta9jm996parifqscwk2j0fr1e8wx87aat1j9pimcn1cr6ysl3cf6zbp3kjwb8i6qrvn77jstvfrdmcgur0inb4jllofdjvhz9pfxghqukr0p3skbvwm5lv0vjj9z0dhi8tali0k0kegxqa6g1d3sp008x210ue88f7n4e4380onq3wwx26205lrghe24tjo1wpxcpdytdwk5xn7fvdw6z5ora1rt8h60pmoyyh6ajud01ku2fpiyo6id9lacwwp4i88z42g0htc6j13sd37nysfxnltjq3aevtvdnwimmij28lr45cvtdmvj7kyabw4jw7n9809fmmeyyyacbjckbrdigx3hyo4s285ctcth18us897qgflrrarm5vrdfrjzokr8ganp9oryf3cjz7t96rvdsqbkff9jg4laixor93wt25lo4js3crg6uopl75rgt9ax6p0cejbel4m6hxm2tw98pdpzor37bwlkx409buw45cwb8vu917dhrzm9a0cwr51cu44fyxpef7abry7015pcnkr8sxxuih5w2ax3cqioa05u8rkc32oo0hcj5u8x4p5ckwur05p0mptj7u13keenj3nisgtu9r3eewj21ig3txlqvync487hmgxxj67789gdse936aphbfisprdd2abfhsoqd03wfa3b09qsj6g4wey8ywv32nvdfy5ayxjf2lll4hpwkw09mauvkqkmq0hbpp9ksmb6vtkxwdp5rmhb8m4g73pdanqqmaaxn7jjnvq1dvevsaa1u7y983o8o1oj4otrwazst806avwuvvs3xmdj91j1rl3gduv5th0yzh9zssd8m6rhsxddkxk19tw6dg0qqmgkkqrssuapjs41mw',
                fileSchema: 'k9mfsddze0q0n013xjvv3lmmbym0wqglljz7fzd3yu20hfqyz7m3gin6yjn3n8svp34wqvdg2qopbidraitt2hnrvudnl1a6ocbvubv4hju5xtgzffxyy0v0i2fq4fnn42c9t4zwvonmtnby29p95e5cg71fmuaxqomkr0c6msbzc0nuotmamohp3s0wyk9ovchketku8vgubvj6dkv2jg2n9ulf2ahitp0qghke5yz3rux012wu7z2v2vxbfkj3tz91s4hn96i422og0p6j8unyufwp1py1hkhimag7hg3vq7h3edmu16aly5icrz1usw4iavj3fmnljj1ime73xpdeav09sjod4pw3y8v1mn6wi9yxijow0i4oog5ukibz8f6pwbinizghr7ttkv8ss2udwgdtxa1kluux4jsziv0n8gzxsahigmfv0gu8hcqagsy9nklz65ob807hb613mgu856n311nth60z5b7b7ofo9j625r2o36d2cnc0ykszhr0ww882ue8ofg2wixnh0u027jwrokl4b4y873sthzl2qdpjiwneity2osmhv7q3rvwlyot0tdbz742yh1ikj2h6mbucx7s0q272d9uhabbyw60wptqktb7hdie164d8nr9v8b6ws4x0gr5alehxoq3nuboxu9jer5l61ejvxf8r32wxup10e4gx51zd81ascuh913f5odslymphqg1u8gayl3gvmry0dpmh6qlsu49z5rmb23tdjzmcohufakum0eketnyvqp6wo3gzgl920gzmgsw3o7v27m59pq04kspbfu9hf1vbnoke770moq3j4r6b1hx8p8p750dd8r1z1dslctds2w34jgh66cjoyfml80wp8vl05cf7vamj0vf22gh12sxs8zaa1tfsjsozlcwbgwstcnc67v3zvhysdvffeh5rrooumi9sfro7bm03eprjcgygvmcwvwfcqshtjkbp1pwybfm7wadogyw133ftfmpt1goh9mjltdjib0mk',
                proxyHost: 'q26dss5af5ucqin4yxey52lfopx91ivuft2x5gel54ktr7b5hwn33s92ufzh',
                proxyPort: 7832982118,
                destination: 'mrvha9ifuvvfcm2nqewsft2d71kv6ymfizvi0949a6hvskl5j7hgg9dv9n9eflcb3v66fqklghqla0vq4c67gvdgx7mfbylxs6d7w4y7ovo317x6yi7m1yrgjakcf2vv8hlr76b65m4p0zeyo14zu71zuzgstjke',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'dm52fi7u5231a9j87dwysir6ov1ope3pm0kpx19c23ifh7hjz9ohtt221oi7062upc4m2sp1ns6oixv3ljn770whw8dyitjtium3cc96m31ax66yiwq4lunljla0lumd24on6hbqifvmgcret1xzkalqzykyyx2u',
                responsibleUserAccountName: '4lbr0216vq64m5dsg9gf',
                lastChangeUserAccount: 'lue6qyqdqifmohqo3nac',
                lastChangedAt: '2020-07-27 01:20:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: null,
                version: 'plku1dc3we07n8j7qg4o',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'hyav0ap0etdjyydoy8jdoe0nfx8jnmg6pab4u6u6svvte71t9r65cklkzsoic4oetio1kfr9rrodl21uwpsd58n4leskx6hygt33asx0olgpetaiuqmyvffdx3j8ns5luhwayqhyf1m0lq42ltl927x4pbt9kp30',
                component: '3831m915glvdw47v01smsck96jg58z2lapfq3zl78l32zky8dg89rwe9ijxxhbw8hd58plej278ryfdhml73d15p0b1w76ah0ysgqpokt6ipcn5ngcyw3kry7e7ue9q7v1m97651isomem641nmgtu1c64lmq977',
                name: 'nswh16a485ltu3sh9mjn2hxbq55xuqxfl7hhbm7o1ct1iwv01k5yp2p7600gcmlq080y7e0sc5pc2xf1ac79ouarqof9blruxc8tgyjqd4l7ssquxryqwstdn0lczrxg6z866iiobenf0pf6ca8lwdl7yymej17h',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'tkyrsl1a07pmhlm5nt6keczenpemrlplbsef1amnkz2zthoxt003xabosr8m17ryaqan7iajvl5em47k5ozwee8kou50eftiaby4cbi5dnlg48bz1x48exoyytg0mi9qs4jccw0x9xa0wmov0ogw1o4aoi80bzzn',
                flowComponent: 'b5qvzlz9exk4yy7vcm5gcx3xp1t801xjxh6lr9kwoopgzjq2o6a4wan8y5kzn9h6zqri7d6y6epe0nd5hl25ejnt1s5tl5ttia63r3joe98rscp7vmtecw33nfx3zyug7j9tptnw9zbip42vdw0v467wnp8sgga9',
                flowInterfaceName: 'c1e351c6l9qm1llhlz1aphjkgfjxmcbve4ik13xwo2kaj9kt7tcvzrtn6ckv4jvzi3t14r1vm6ic9z7ik7furnls23g8uxpz7ea2d51tzb78r7he0lbbsrlufshk2kj5f2aabwbyuac2wti26pu9pht949rcsbxw',
                flowInterfaceNamespace: '8n2z4puxyy3zayt24tftz0gw7e03ttxb4et3kv7va8t6qrz7g1og9ee2nnwrgiga7uipoxz5d1nsa9ncm6peoeq1gh0jn5t676ijf0h9z6awh0y2tvyv36lhj10dkzh9qlryag52s9hzveu30nzp8xqyvvtw268u',
                adapterType: '01gzmgu3v3j35be9apxdkijdaiy861brskshbb0sf5h0je6q6xektyvzy6t0',
                direction: 'SENDER',
                transportProtocol: 'ht844w36y2y8gse620ta7uljgpuspzyh3z0r8cciwgrwjmovhdls4f9o1282',
                messageProtocol: 'lo1os8340hiospcor6yslyp7f13dd95xrju7t3tx9wpykgbst0faoz0w0x2f',
                adapterEngineName: 'r3f1wsyksyogm9mpotbf2lb01pc1y1j724qmqh8p3os5oz1nw9b5ojlygfr2xfhbmu0ei5yi09d96ejcws7rbg7yqbz2wtk12zalli27kyi2vfbqwwv5ugiycecw5vklbmkalbgk9snjqa6cauhpvba3cjosqwlt',
                url: 'yukl6hush2l8su8z0bup70iaj6gzdf1h7obhz0m43r235xvjm2u99b7ssm2gsi4lvext2iptooxnxx8oyc25o99krdt4lcloh1ns76v0h0qq4s8womx7y1255v66vvhinbdvh4nunlx9lzz0qaf6018g1co093mbntw4a8r67ltgx83ua9jcoa7dywca5nz3q73wy8h49j6w7djwfwuuckw7soy8wocbevdz2osnger960idvk2g9jqu81e16k941c80kd41fukvfeieid6e2iatkjw9vpwgefzz5w9rjceghkc155zvhw7dg2oxm9bg',
                username: 'vpb5z55y2snq4kn7e6zg2zsi204hs0okl1lv4crbq1knz4dcaw4t3unx81e6',
                remoteHost: 'u6qtbmpym0e1gvjsck34t09v6kogrxtv69ky9e33gr0x130ql84bsm2qjyb7lrq8vmlvgnnye3yg3bgi61ohpkiz809mlm71cw2mm6cypsdirebkzpv9lxgz5i1ht68c7t36968rbkufeey2ww2k3c8dlcyqaw2q',
                remotePort: 6752930303,
                directory: 'u7c0n0dar5vshpygm09qwkop40euim0o6aluyd8zwav48fzlktyk5ewmdavn5k36d5471a917b2ig9y4jwt9tzkuuwr25u2cusz17ua3vzduyrz2su54hr2wmcowhddo299dnulhhoc93kim75dk6a5di2ktjq2r9xbpmgdudh7u9gi9xw61mgvcryufpguncmufdyvm0gg70oegjmazf9d6ex9boms2mgt4dffkjqr6hle8y2ms51bjp267uuaymmmgjwicwlf0wt812avnqzt3ib6v1lskk67wt5gq6t1vilejdzc120miep8wqijt5wfihgwtyfu0kuan4di6bx1xrryegmosz41gm4ejgc667x07nqm0o53pm6rhnbb7afdfe7w70en2apy8550i3xcyous06crh649cgo1yxgpv7oafkr21cpldsjhxlc6m26es4zvj0voweksjz8cmmgj6lc6tuee7cd42dz3fhnttp8g08l427zoh9h44hsuvwqdbjr4q87ex97q4hcmov76x1f966sq8s2pnutgiu10i7nfhr2sry2josw1hfrdd3wfssbv68stqx372g02xlnwfeao40y7ipdejymalut7w0fj7ha7avgb048dk6kzdblojqyyxbva3dljfgoswr7ln2mmw7dwd4hz4cn9kisg6763jlhqptvn7nhaqg1us1egm0yz1lds4wr3oi9g9mgkqfvfasfl0g0i14asprr1h5a9g9xpiaboh45ga56b542buf1tz64b6otm0msmfic8136umobz4zqxrvuemylg7gfb9uhb17tevffeu4hngypxmk71hszzmnvsof0i52vi72iikaoiubxity8v4qy62qdhu5dh2ofvz965fybs6g120ibox3tnmu0e4o7z1swo1ouqizdihz8u0vuxard2boa1fyvuvzt8zl3ogmcq0e17ey7qx6n86qdgsnbbm511ylbw208zxneb8hi1mmysjek0z4npkswptn0hp7hqh',
                fileSchema: 'ttef7l8hfvbljd0gmycegihcuhllc6pxpru0mketwigmhr9h88skqd7hxzdiluqdo9ed64st00bnb7jlsmq918h2fzs0kfghgujel4kjfl3nasrl72pv6sp0jg8v3o3hlbf88brx2sixjzumba1ihxx8tn7lt1tnp2vnqqjwqdgdjl8rogrijpv0jiigjplr17co2ahok2rf64x63pv17kisl26c5eocelfi4fad7rqndpqh9715fe4wmk4gihcjz6os0ys9fb59bbmzwfeoz79sme1e204axdnz0bnkgshnzmsn3o720lbs9s20ucgiipavc658rgtmnm2glwpus38s7ua18qlewl0o47bci3m744pjooa17gaykz67meh7bst9a9l6w0vxlmzsaevbs337yx6r06shy4tvt17n2uetn179hqpwt6tdolp3g1xrbnm1tcj4cs1x2zngnsffh6zft2db5hgyelc7gm89ae94dzlm9hzexcht5qr1jhyyhimshbci70aj836lzemoypodd68asujipr6g4fvvxxfu52wql3xkwyv3o0tuaqiqsldvl0zto0z7avguh07m6hr7z4taq9h23l3t8vujgzvu7zr8htec66iofj5ll0vs1a8yl0t55sj6zm6om4ul1hlwym96co34usuz52vhsxaonldze587jnceqtbia8jw93ucxfeov9m47njsd967e9n4mc4gjz246lfbrq7xkixzqj11yjrzqrxqg64yjfev6g1g53ee8nsvr02k2uc3titlk4yt51oe6rqhw7qlglg8plx0qxx3wsqrj824mjbjc8og1hf96oa0cyzxhigrpbhg399nqv7huqhqsnbg0koofvsjq1urrfwd1i9jaoyzpyovmnghqp7459fe58ifqztotdd10uikc43vk973j7iec6pvdn80rwanbxctmwb0fqmt5vk0v82c2si9rzxgrccuydejvg0ybw56ka7zwtbxbyaxce9d8x927lpyv9h0',
                proxyHost: 'qoa47bh0beed9ryufrhv3tsyrv16kl6ztr0e8jugr258vptgv985wmtbsjr2',
                proxyPort: 9099693218,
                destination: '9dhjnlw3tyo3al4fw0ht6rw4ggx38dfg93bhih1izdsl4g8ypsudfgit2obol9cbyfdga6kp84xip7kovd8i46p2xkfb84msutnokmmkcvd7qi3ztwj3et4766dbeojma3nzvpf4n5wfu522pfmd882sidxt4pme',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'u4q6wxj3m01qxgpkklyvjhvcc66dt5wwphiy7tizufq6983szptzsjnlfkynpi98ff2miu4qaoatlaqpocsx8kqzz3gysz6mq2qu3h387rhmkx2pppiinx83v3skdatvstqzas94ozzuvnjsxqa83ae501y0v0op',
                responsibleUserAccountName: 'ugfad5nb4tofv2vq2pzq',
                lastChangeUserAccount: 'emvojn04hle2k1akfg5d',
                lastChangedAt: '2020-07-27 10:44:19',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                
                version: 'hf1lkoxdzusqvfe9uvyy',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'ks9kkj4pfekas21e6jn44tiqubj1moi56p500l3zcm86jnhvh9h70viohw17thvv33q70mhqjw0xqswgbv7f0o6k88oxs66np4p1jtqxwfuhygjsz91o28f9iu5ldlyo0uk716d9dr8lzj6og5rg8so7bopj768b',
                component: 'iwu0scgnq52hydvo77y4hf7h00g9o76bf6wlcjehkauxq2zx22xkdd0qz0473e0o9882ofr8g7chcx5z4rxdpd58a33pqeoneufrcu3i1t58o15wq821s3fyoekqs9vqsq2q3tnr2ll0kuf8fup19l0ttlojngio',
                name: 'jf4h52evjfo2x5dxsttta208g3fjg2lptay8z9uohbv8na7du9karkux4t593gejjm4uka1nhqfczr2oe88w93wezvdp083xvty1w6jfybr873q7fbsgx0vdfc6h2q8i2h6zwzu7vllw5p1exi19ced3wnuyigw0',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: '1tjycczlr35y4f2iksme7wu5ag7b7b4salaa15vfwm22i1qy2qf7i6gil4pe8urfktj33p27lerqvoj7kcbf42abnu4mmbujhnsksup1sqfziak15vddr7mbembfce0cs30cm5shk81oj9suzl48vtvbcjfk6hv7',
                flowComponent: 'ez85qu0l6hb1oxhxv8ocw1wp96p56j1y572xs3jedv9fxtwboykfge17cr5pl0qccdm2g2t9hhr74uspa0fjk6me8lbdr4p7vy7y3rfezbih323nzh16epac42uuvrghflf9nleupvwy9csv29n58u36bwo7qqxg',
                flowInterfaceName: 'aqoksc76c0tfyhxtfdlhx7giwtulboselktg1m99xpeu05mmhcybsphznqsxvzr6rzrnunc2xyqntn99w1q8bas0nxcbm1htnwecspvascpnmyatem4mm4eyili5dlgzhh0tupn777c8ruc5cki7j4satm0nnfhd',
                flowInterfaceNamespace: 'ldmbxfz4i0skq0jp8abhl3x3gdceswenmyd9yuyqruyytsx84utnmoe0jife6h2ihfjt71lc0k4vlhk4tjddd4i96sue4batp6zgfpatazbxuvjnohwtn7ikwkiga93lniepz0zfog1i1i6duomj0x66ez9qq8pq',
                adapterType: 'r0jhxgco3m3o6j7zdi5mor955hx7fg4hamq8ssvkzbhrolh4nlteszcnumv4',
                direction: 'RECEIVER',
                transportProtocol: 'so50al36vz4mfdysxwf73kyamuh8np9xvtsy5h4e86belwo4qmwkmh6pfycf',
                messageProtocol: 'ualt8dmb2fk5pdixlluatinea81lhox616mnl2sds14kxhwkc1qnh6bt8agc',
                adapterEngineName: 'umgqxc9v4b93okxo0vcmukwrqwb7lvl7jt4iubxgzquqtt9uisrhntrwa1b9whbi9td4zpk1h7vyugr2eeb43a1ykfleach30b0mw1ikzkqn2rj0yujpwca9ew8sysf80l9nyp9t0krzlw0nv0bmzj41on01m6ag',
                url: 'm3iig62u07ea740zqrgf2r9ljw64gevu4ddx3rl3the5qa56gm31u2v3czvp1dd5n464gl0dewvq93b8ut0t35knot0uggqd0rexyvabpxytq0ghjhfqfv04bq8f1ztr6cfocsruzqtgd321nqkuu1r7a5887960wui17nzyzbtuhj0s8ecoz3bqaa74cs49rrqvy2nju4nv277c6n9ferwyq9eu0hgy667pz35si5khl8rk1e712t1u1bmxbdcxo8u0qmq2hz0hsdjlypnwfnuixmgm9pqdpdod1pvyucbg01pojdijsvm5m1y2q5ni',
                username: 'j8wb76yl7k55vmef6i1rdjf82b8vm8bl3qksvomfdrinvcq32bq3ckz9j4uy',
                remoteHost: 'lhkxwybefnigfk1xv29zs71284o15zzq6thuaweh2euqb6wk3tzby8w6sj4hzxe2rpvtdn4bk1ede8vsdsow1wfphyreqbazxozwj0igjsnq5xw83vgielfsoykvtklb8blbv3ch1dpwxazfrswffkz96a5xl9m1',
                remotePort: 9713094592,
                directory: 'bsqexy928vysx15ga5j1a11b6lu4frdo370olwm394b14rtvav43c4rsjjp396e5gau20hrcynw91046dgi64na5lba0586bg33cy9174z81xpot9csvpgmzl0t6ledprkatqbplbem3kr3ulo1klfny0t33jgkaaefpnwh3qpng711cwtx75ck4ezcsassgnndk9q6eeqtyz49z0wpn0bogxf20pf4nf5xo4zf925cf1ehjtvz5pjmre0jfsn5lohwfhqdfki3o0zluoiagncqirx371uhvg8ecfgqo577nhwox1l8y3vdm7hi91kxuaed8iby79nphg883a3q78mlbmi7169loljwa3x9fforqcqiehaiu3s5vy0ka61hxaqpfpqqy6lkvj677d5f3jctwv8cy0hrji1q5fkj5woprjr1d49cirr6ylscjzf3wurt98t0xpqrquy2abhdu71x2u6w5atmat2i99k4rhokmnt2qcklhmnye52iggdeoahsk37reia6g13un5kgd6cqoipdv4vx1k859iggjioi7698ycklixbpoypy4preez7q7ig9m2dhd9xgqs8d6gcug3x8rsvv6mrl98xwpzjaou5lvh1hkfah7a0yv1rq9d18i9nbd9ayq1nts37e8xd9yi5s58vqwz00yk7oefwvznb0tequykqspu8gqu4kyz6ug5co4naeg8sp1otr45nvdl4vatdn2bbibtixfthp53blm5wpev9vjqxklyinw7vakvjenqxx8gdawko6up3dj2xiut4ef355pzhsd9z3lurxoaeyossn03tk86m9j34nhcvbu2l59b1teiwuck88mkh17ydr9qjsj4p58mhcclof594ftawi5k6j1j6tskpyu2l84bcrqqhc3tmzsx0v2uxcpplg3yt74pezozaz04fr7guxi26jujs38hkf66mo7mv15uygle6ysu37rdfxpio36g4z8ipsvcy9xlersa1mmuk7q3qlyo3o3nchu',
                fileSchema: 'vmyblpsglh7quwpe4lx3c5kwak9gun7bny47732obpa8rsv1nh5eno6v3grgdjzydwyo2en2dy5jazike65skpt7s6fs1wa7kp248efotdt1i9xffm69z46mrmaiab3fjslbnyw42qyiksc9z62wachhcjv3pimzwsywdzit2pwn83vr8tw0qf2qrmvb6z1usfnyannszgwqbz15z4oi8of7hjm7kzp1s52xrl39zgs2qq44629n9spspig4p5ob4we6dafwo4qru5fy64ltvdtrkyppismig89gyzrwdb46rwohg35z313ndmum3hxq3qwr6eqkvoup0ku785fwg0n6tv53bpryeida33eh6j1x31mnvools7a99v56kwpokx010r1zi8jy4fq8m1ebzrg313gvn8wcfjucam1kvnncuq9mh5geinz6n7uc7k13hn89zht2jxp1kgu0o27dvfsl7svje6rr3icbfv44bnfdweyv8n7w89aaqcihw87ro5cr29lqzbqo9rvgdjkwk80nqov8jbkhsnf91cz5nn9crdlh8zdrto5rxdvqlr4hwenzf5xu705k7uhsyxmjaooish0ibs9m6kww963rhblzaadx5zopq2opvpzc61qgn1wkhk4set2y829i6y1ik18pc007mvojoy2ht5v9ibrqy1e2eoa5jd5hg3i1bbial2yu5erwm26o4k97y0zwrw0t2xfcm03dfh49thipc8ethvwh2qwilnu0mf5p9g8ra5mvenwj690xm0pr2w3maxqqr8jy6v6ms4cnxlwx2i1zgv0kr64z5iikj7t7ax2fkqskcp05qy4t0a7g9p42tke67sac6tcaiozod2syqg88lfqte00bmy3goblfj1iww2qds26oghcqiqbqcosq2ydmlsl8q58lz2b2xghh7x9mapfs8ob9mighl0iulxq07vwkyn1uitzx0tpwrfw61kjx00nf93swlp40bhk7pjoi30qauuxmgyim7p8wca8b',
                proxyHost: 'zhvs2mukroobes8dzev14hpuush4jcgh6fa1n7l4gvo6nya0qwzfbodljg2n',
                proxyPort: 4138826275,
                destination: 'xyyofnj1puiq1pa0s88j3x089ccceyj3kdhdxgr4x4cqwg5v6w3l61tuzaazmr31a5uc4zu9c85ipp2xcprrle5oja7vv8w122rlohg5clayrqkx5pfxjcm6mwvf0bls0p9lds11ypbbwevb3f3amgsg7rqf45lu',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'y7kkobwd4isvco3o58yxx3uodilbnocsxnxulb1wh5zda7b6xa0o2zmglaafxogvqpw65hkkgwu6rew0yc9l0tsztqjjnf7fi3dm53sv5tng60svxuzuv26f2x0j2mslzsli00j8ltzl7afm19q9ch5jh7nq546o',
                responsibleUserAccountName: '0tboh1rmyj7ks794799t',
                lastChangeUserAccount: 'z2xl5g4xxhlbzuw13kq5',
                lastChangedAt: '2020-07-27 02:58:37',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 't9sq2t872dmbasuyu8l5fz4b619jlucpzbwcfsu6vjcc4r2m7b',
                version: null,
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'rjycg1ii61z51inx6i8u44eh6s2bof4g0f3knt7aeefnvkr56mx36lh4f2eocoyjj7wfent59v70illu9buald0ygdr02w6m8vauk6dtvie2a60io4iwhzogkk1euew1w8avyohpq1q5ng8zhn69hnjp12qbo02a',
                component: 'peq6elh65qnhm73scdrano5ny0dwv6tn2vx1eppjaahkhcn75ovyo17hb2jd7af3u3rqhj8yjno332tz16topn5u8v038chnz1yrk6tvzf1quwthcsfh22efrkembzk5upvb8nzsfbzlz3a1msw2en739uxsm63v',
                name: 'zcapnvp6hkel8komrb4i974n203tsnvcxo10ugbjm6uzd66mv65kjiqdtftz282vobsbcdp6o1emssjzd9gazkw0d7lio214o2iabzowyvajh1vma9t4c67j1prcllfcv157im41j9u4s3djauou82u10jltbwfr',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'p1w441tym53eczcpgjqotq98dnkuir6gi6cyadf1eyn821o6za3l14buxtzzg9s90ribxgaua2qntlf2r0jc0x9q6aw21jcgpbrptvn8oxtct3hdaczaa1c7yfvtpckwnwyg6vtv65us4829vd7ufgv15vrgdcgn',
                flowComponent: 'ima9gqvt32uanqgr48axrudyaksytn6bxagr4ds2lp0e8i3zmancnlxrnhiibcmr531jin4oc35pcm6ncsemhtlbkz1u428gt56qywnr0bk0wckwemgriarsu3m6ijvtof1cwk4e8huc4gccugxofnp3hzvywjpj',
                flowInterfaceName: 'pmdpg93vhq71f7sd51wj52a36m7x92dc6vunf0mu2v7z2z6y3itbywdn8xtnj7uyaopbpqqfbbo5ylf9s49nftfrr46juj11poqcibh154pwhhi1rne4n4yh05jp7yj93gjo2vdn0s1vjvma1rjfrfgrt8aeigg2',
                flowInterfaceNamespace: '2kbs5i163av37e1f6u6f5drmsfan9tkch4zd447qskuevuwmwmsvysvg2k7wmhtj4y4ncexsg7qnq14h72s1ui7ofi0wl3i2zq4581bvzkeec2exo8cmshroopckav3ig4hd28936fa54qjhi4c5autjm04ioh0r',
                adapterType: 'wyc3j6wydw6m3xxt5q1fgi2ojveq08gh71cd5qx3zhi5sb24ygjg572885sj',
                direction: 'SENDER',
                transportProtocol: 'pyf8hym48xxiod3mp2h29kjxidbihk1g0336qjf46c9moer9577tgk4ekws2',
                messageProtocol: 'ihjcsi146ioh9dm1frlxxn5dsj52febyw06f213foc835ch5pdfn9m7lpur4',
                adapterEngineName: 'exckm02htgi4uz9a4wt9ho991ds0iw7p35q1sttjtymcqsjhgq1l2cqs1i4dvy4tmfbdewqj6zhoi7ze5xlo3vn8igk0mwckj44shcoq90mjaf0u1i70rw8fr3gn7hqi9if5h1xoynf00r8n9m2olbrsimk29q25',
                url: 'c9bh2eb86pwfiqww7qk977ng9mcf91kor1zkgafx7en8obtszq26b017rd23u18izauqmcys4j74mq0w95a7tro6h0w9w4let6meedbdzpzgu4jmnuxdj6bfz2j45mcspikxgizqnwlrmyr7r66acs1n8qi2wunhki9xpjlo7c1l47sijlhifing60pog4kt88rq0wiftlymvleutdszbe40oqaknv9iijqksb5rrqhvb05g4o5a7kv48w7mht96t2y9l0prw5mevjkdsc170g2uz5rju40o9y0g347nrvn3iwj9w9xird7z8cs71bk5',
                username: '72om60koygkxvgm7wc3j93hhe2vczo9l5cl97otmxhkn843n5m2lkejq7me7',
                remoteHost: 'wz2g0vhb4kj9b6hhqr98onasicj4rffne8scvorb3ec6oac54r1zc8yfqtvoydwnddpqyajeijhydwfxe3c080s6vlcedo3gzimwb2m0mzrwspq4nefg3u094s8fsi2avrossl3kswav61qghyewpapwkod2ldfp',
                remotePort: 2762620760,
                directory: '46bejbmewobkomc12ytlxobajqkdat0upl14n19jj5hy0n6map86v4pjyoc631wm246jvr0s2dafowy9rwrg2jhsvqdto9cm6vs4kz6lf78prees78ij2vmfrwhuu2jwden7pz9oxg3fwikr2czonsbf6b8fkz8h638yuorpyxyx73wrajfl7nygx1pz8p2txbtjij1heoom8mloz1vwsriyij20yq2u9vouueu8ulmsdjdp2ko25zb7gr2qh9uxvhuwtzb608w9lbc25zguyh79ja5jxgz31tj5f6ve1g6o61g5ds4t3lxcgcsteihw3xobzxxmzd620sn2o4citul43g1vz12v5u9z3m5l14yvknpnvg0480euerw46rf10leo0dvvfc6oz3zr7j1351whb6zm6sdwhz50pq1s0t4ulq91n8h2ns0l5gls5o43u3ha55lk2yur3bijcdqu1amce88amb6i3kc35sv8ghnbu4zdfo5iws5np3me2yk4iuctse350qsdqadkrec4wtdj47ybfhrtr1vs3zalq0nbyvorazwl8oqll89zsmv90krdojevclosfheakt62x46e674rz9t3u5a2ypuxlwfnyq547679h4qhd5naj3f6u3c80yz0a875ehzfal8xgxsl7vpyc3xbh5w7v7ctcxrqk57fy6pl4vhi4boklqwooaeihd6w0mqwjt0a0guxh9bztwl2vggx7p3zkg519p23i6sok9lxikz09cnvdoupc22chuaesm7e0t2wtkf9z2phulav60ij7nfe08lhyj4byynqnmlrqn6jryqlm87xgk9ucjr2rmo67z66fdnhhixvmsmf6zpe7uud13qn9l2e6z3dh295ze4cbkf86qpu53ydlgjmt3e3qj0e5a6jbzp76foyv9fx09mckm8jfys45s0y4u49hd6blr5dhnknproaf3hto91bjnc4mfa26gs3iz8eawezp1n20bds1ln40699br4c8x2ifz3t7y3b',
                fileSchema: 'd7u1g6t52vjhpwirvpd827tbbrjcga67nu7y1nbr6okfhiyhfq68kv87x8ygihiekbyol7616mvfel7xz5a5zygsvtyc5ljzv00sj1enae2t5qjggi3utvfw1udbxwkyvvuyusx9buch84pf14sc5fwl6ncv98fb8hbsv0q671kctd10zh8xz1ggag05nt11wibr3tw4hzmhj1vxs7mx43hxcusxqwyamzwpcdo908uzlpmydu1ol23bf3439k84zqdjv6gn87yx4knegl5liwcmu33718r9turz1k65wq2fuj7nwwu36x557w0cd67dp3a02f346gpnovg4hrovk0gaywybsvcyx13f2vq1fl5qlq7f6xfum5s3mksbkx4irckz0gh84jxqgnfx6llevdyvijpypttqp8gk4sag0olpidbvww77e39xiv9zyye2p6kjedg7vly8pba79s2dxa5buwh6luvrg9jop5dimxoyckutp3cw8ruqjbllemkh9p4wdl41lav8x85u58lkd4z8nt6oejzertvg1d2gic0e3qf854n7v5cfybzl3xgb2ois70w6vayu7rovx7t7n6el63u39ce4mxvxklu7sn1qq8xr0tok6fmev2exaofh8codliwm2al1vlibt0ngkjmrl798l73gp476hd2t0pwv4crn6qbxpuvgnbx7peyb24qtp8veet5oqcoaghfta1a0le04eq8as2tu3niw2yfe4l9r9n8sxeo67s6o4of66tl6abtvim74ecbbrdpgt6v1b1ei2j2nxdt70988axfyy2jf1j4n6gm94p5lbsaxbpzce1b10y49m4vp2a9b6w1t21z0qis8uhsex1g2b83str97cuzk762rmyn88rwaxug51013io2nrpbtpuc3yd0gc29trpu20zo9bsr7p9x2lmb8hdiwqxw83za4uq1z4p9osxy13kdl99zswmttn4bwwhxu03zu2x7322bpo5ozh35mk397ee6qqxylfbqu',
                proxyHost: 'gjbgaw6wuht8r3idwl2vqu24ykc54ouo2xl8kxsjjeptw9jz4wblr8n0q369',
                proxyPort: 4796176174,
                destination: 'w9qoht00aofrcwfz72sfwlz6exsx91iuhucug45s4kqlz3juffo0zrg2qdsv3nl8dt3w80arwwkiuluw1gtblubtve2ck6f0n50ahlshn35a6f5c2d48gg4dc34bp7tlu093ijssdnpyj1kq864bb0zk1cbuf9ol',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 've0a9srpg8o6ti8biyrv067d6vuxldfor2lc3cewaqhumcx2h6gy60642op2lplup7evkbmvrassl2znlhoorr996mgndpjx40jvnu8qn4ue17q1zymvwhrxw5h8yaxhlfsiiw5l0ogy2rfidltlceswew0zozvd',
                responsibleUserAccountName: 'sogtwqpfoltcj2rbx7fc',
                lastChangeUserAccount: '7d5p9etx6oib9ipdsjew',
                lastChangedAt: '2020-07-27 07:00:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'qd7kn8y2intbx92atvv3dxxg3r03xsqmlsb53lg6mejgyute6p',
                
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'bg1crk2i3iuqxv7bktcxhtzggp157eywc215mcma6rddan3b5thi6xyscw0g69wur68g4ha8t12msr3r0csx4ap73mawfiv4qh18vlvrcna2u5hch3ijw8506dw8r4wdz9yh0hpmbop9yun6ng6wm5apxqv5b69d',
                component: 'l34rrtcpu2hc49ovwy5emk8g170f0nbcos8s9dx1ysb39hommr7w3cfjt2bgxrosw2h65dsz7k62920watt0wdstwt4269mg7pwas11ahba4w4u60v58vo8b7l4gpb606mfa9rr7y1disdjsv2v08jrdaemb73ce',
                name: 'pqt4wc3cn86wb9n2j96568cwf5p0cre6bab550zf4w3m7rg0rjlsqaspfj4q39n5sytoyt1e76usyp4ls7o17rf7ws6ma3rqt323pt0cu02lnwf74dbuj0pjepdwykbt4shlwupsxezy3lqjfrx7q22h5dqsrx6e',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'gu4uz52pk4jlntjjm233kn98q7fh9xft8wzffjgzq1us0lw8wmk0xazr2qdm0485aq2xnn195ywnqsjjkin17fik8hbs05a3qist93gsvz5b3k6jv4w6ebiqlt83vm6m7iulzn7qy92wuf5wu7pj9ojaxgujuwcw',
                flowComponent: '46p1iqpimbw8l2efu0xksate11frnwl748znc9nhsodjvlwc9cdg7d87ydqe4oo08r3knfcy44302te4zbyqlyhzh0yrap4icrhd5y729fum5uij6cdg3ed70zih57h75sadgt4z9o0f2j1uyx7ud793imi6dujn',
                flowInterfaceName: 'gz8lo2k1ofw029m457dqk8wl394gm2zx6qnpzs94ys4h45a9f8fh5fcd2auq6emj2cjk7jfckzd5zhqpc56ao4dhbuqsqbjubezcu68f0y93jlz1i43ph8rwu92azo1dptuiqyn351lja3trg4u70oq95y3ac68c',
                flowInterfaceNamespace: '4nyvcdgu64c9hzgsawo075sv76nok61iwme8rijn5ls4wy8iy007q5jocnfam1sk42ijjj7rgqmbuf2kdxzwurs02lyqzn6v0z9v62axo0lujcyff1972kx8zqwpq4g8z18s6fir9ykkc4clkp4jrsqiw3jh9v6v',
                adapterType: 'rxvvnv8byt0oa86nf3omf7h2snl4ltphurz1b5x9fpxpkbtftrqq16aklvv1',
                direction: 'RECEIVER',
                transportProtocol: 'tlsbilwxtkjvzzd6zif06j9ebuleldqjxabmqdhqx83d9kfv5gdk5tey1kf4',
                messageProtocol: '2ghbb0rvncw74hey2vrtbxq3qsjyqg16yhckocfqwm3ij6exoa8smwxxw294',
                adapterEngineName: 'ft2ez9pakymmy17k5741rce652f1fay50ccqqnwyeg990wms6dzf4ct190s6cpc8rcgurzcb3qdr2kmw3o82nne0q8vwyxwktypzj0xchwf104ot8iydp7yu9s2x72zbh9oi80phou1wkpq6gz6cp1urn13cm3q5',
                url: 'y5nkoux24e446r1ufteagesyj8klygvgufozeojkrm0ojm4sj7gfuvntv4b0zq533sghbv9kgsqpw5irk6gs3flapipdj2xhijkava2u7fan5idlpt6crirtyq4n63i406v1mz9z3cc8lbx4syo0yx9a8n7laosaduzw3n1nh8ltcp4083zn0anpv4rdh3yyl9omjyugl9fecrixyt5ta11yeqqmjw1du3sj1cm9pbdxosqm4djlosvtjhh5hbh8iv7ordmbs47aekdf8k6qv4evy8ajrn6xlntjftu5rx4d6453t32t8j7m2a0ze941',
                username: '64uegpgjkxs051a2b3bto9rbbk9sj7rh6hsqkjkvb6sohk2kd6r87uoh2xrh',
                remoteHost: 'dbdesjud2hu2mb3iis4lv3jzfp2vziv7n5sm9m04rrw8pmklvukghpyfla9nbvwxnqbvfdfm2rtdyfbq6nz9zbh0zkl5s7wb6rncf98wid3o86nh5vx9bomfpydjfazcifxa5zqysvwdkvnt76ay06fnmbm4t8oi',
                remotePort: 8624558073,
                directory: 'w20fmcb77dwjwmfarqb1bjgrkxxl43k0re7iy9olrd138t0mbqfmr5i74uannbg0z75b11cv4028ncgtpwaxxxh7oy7ieqov9ssoperk24a60no72gk64exgui7ambqvcaizcez8mejtw9cvuylio8c1l6rc7esmj3eucptxyn5xf79zk7b4h6mtrh1aishay2b2rzs9kkk7zarmxvm1294bcbdqsmppgcs0j76zfxdi3naowi8vv4fwve5ye7daj2i811hx8d64rmojghc5cqvkneoo336vxi14z5j7d0yrs5wwx1e4yv17lx3dxkh0hsogh1peu818afi8uzw31drjtp3kq8svb16lztyddco6yql87j11xvbb9lhy783sqhs2snf2a0wwtyg1kjdszccsf17uugld4t14nykwfa84vd9ioip0n7ghnyfvw46m5kz79z9nolmgb2uosg107v5ab02f9ujbowuhc55714e4fvwsld3nh8by8w2bixa3cipxj4c3j6t7ftzqa2jicaw8zabz37my3sjfbax71b104kta7b1e1sdmjdmwwg7ir1hmkq4cown5ah89biq812inq3fdg7i1efa70os1hdtnqjngu3ygt6iw5hzk8g81bhgy2a9iivetx3wnhazmagb7hc7250f8fd2d89147x9n406qdy327s2p6a6w71a1f1yylzcv9viry8ozp6p7oc22c4maxxo0o0w6qlvssoj98fe0njs4acs87ul64ud33wquuyvlw0uq79brw1ts56fvg999p0oqziwshedr3eobnpjgiom5ad2h6fbdi6w8tqi88d811duv6yxqouwn7fix62rdbnmyyb2321f8jbwd48ccwiutjus7pak1uhy9ybt07qbwuqztpc4c1hmtvzjc0iitjsr1u9o9l1k7wkoxksy6ax2p8mkusvgymqi5ijw8bzsjh5q7ysvmfec2z9hr2zmen2bmdz00m9fff9zd25c7z940z8ea55we5g1f',
                fileSchema: 'nkjtxlrvpw6owtw4krhsoxewzp9orjcr4h7ugddnoy9101dan6w5kwf3p7d29gxjssyefyv4afwkwm88eh3otqg2e9ilhc0fe0uo63e27mqgn564iv54re3pcr251cpxtdc9bcdmfmuukpluymi8m1rc62s86qxss676ky4uzdy84kglhkkdcu3eydgix3xg3pi6ntix7awcqowxn9oznr9qkk9yz3dp47lfn5s5ty2mzngy64xiwx3jvjliq01in24v9brfxd5gypmeaqnjnsmihccq0ijpdded7ob1yo62p5hbmgk4vjyjan6ebow1pskc7sk463y02uzpamsc3zu5q897i22gsb5rqcqscngvge2ra13y0115792p0ig4prvt9v7r9fy4hnftikxzbgavwnsr2kmdnky112spmjf8d2ash6ulakvb4zn0515yrpz9txjmbns801jqurxmu00mfe0xci2plx2izx1ew6w3hw0pb13dqmcu4osxh6bh3pd8wg0580u3v8jxhdg1llcy5ugd0if52hky8erz7ylq1gfu49nl3h4b44gg8rsz0o94el0pt1lfxdn4t2h2ws6jfkoimj2wzwpuio5om7kdyz7w9789ssmsecwbke7v2hza8nanefqwu13y2ydx5cnimgeu6n0d4pso5d00a40p1cb1o3p697g09lh2t5yypzduuef6em0dov0amny5i92vl6zcloat0k65xo8fk4m39jw0zz0thj2ljiifbxdrpt7jcjojmhw7phhjwoif7whqnaemo27sfdojlkuq7yab7e3zplc01jwk0p4954klbb1yfjoi7nduwmna4lc4s9ofha1re12ysym1td1i3rlaej75pbblchi88i4bs4xztfq0ggfjg37yd7npge597xffovd4uq4xk7p0gnwazb537h85frjq9l79wrgwtyvjt9asa7jpm5acljqto3cu9qhqycrdizk0tdol27rlzl6c6pg7xua6nv5jyz9osk7u',
                proxyHost: '87zlvcwxhhf58ikfa1r71tdnxh9hx00acqjutm97ulzd5ide7elm2o8rqklb',
                proxyPort: 1180902730,
                destination: 'ynrwmikodzrlcwxnr2i7oiy58pi12lq37jfsxap3h8ylajxj1v7xrutg4nren5lc0hr49tdww9nds5u3nxnigva0emykw7t61kecahpbpyqjmmpmelj0x20uotr6bz5irp5w93awrpbz8vqzochzhyuhi4dag9ny',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '77n8zf2itzkuapdc6urfmqgnjxybwj5jlf4lkyvj7t3c66m3ieycn9i2uaesr7jro3nbiw0dd5ttyexq4to47u66vo946xh4mb3qn7arkhpw0pjba4lfxs7u212zfj68flohf0k9ieo6a5i20fm9tewxrld388ud',
                responsibleUserAccountName: 'znmzmifaiyuww2qvw9rz',
                lastChangeUserAccount: 'dj5x9x9d25o0xlb0qv2m',
                lastChangedAt: '2020-07-27 04:02:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'brey77cefzqcypy5s0y2y9xiy7by1m0l1xrcg8ugam09ioyn06',
                version: 'tf7iwn2l4aguzr8n9j00',
                systemId: null,
                party: 'wz67duied9djr4an5uexbcz8zqeqe5etezon4qxeci05sh04omr9l3j6j4xiqqbn7qk1jze9fe0gfsah169aen9s3zhxwmkaii9g5mlmb2j5rc5wmoz98kdolmcqj24g5bafejc0htn05p7rrw8ezqzwmq3i45ky',
                component: 'fq87k83dsof30ohooxq04rnvzm4vxd6cgg4huwhbetm3tl0knugvak2rlf5swh8f1pt0fx7142l4gkcfi019bgh5s55ojfaw4moo6bebed11nr6gvtdxqoa4tsaigscgqy6q4u1hchu9ifsh86rmms6r2ursu6y2',
                name: 'qlsgmwd3sxqdgypttpc7fzf6lo0rbhqo8zz712ku9ucex59ya98ihlxy62aoetd8qkr116t542ecuq0wjhh0xthqefmg67vsetoanr2f39dlrie1c58mfd6ff8p8l6c4nlb42bdp6amo5q4t8zcdl5egafgt6l9z',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'tsz0a1az7j6swe7mkmn0fet8qvrau5inc9qgkt9w6fnf4wyq9hmauib8zayol2oz2dpkycuwtsrpdzbekp2f7ojxd3bp7rcn8beskzai8g6uyzbtigx8c0pcqsnmrx65h7hos5cn9xhij7b2ix9wcotof7k4zeap',
                flowComponent: 'fy585waqblz0c664u5tt0rebhgwjbhk6r2yebg0wryzi6z40d72g9y5ab4ltrwahpuoyumw3vedp8bq599oyjb6nbe6phy9osj9r3a4i2gf0epecstqzpxi2nzk9wqdonlwwps6i8immpct8z7qpjv8nyy4t6e0o',
                flowInterfaceName: 'ihv47qhgsoannsvrvln89e49lrw01uplwkxyf7h22wggjaao6j9hc0b931318u72o7zwpl05ljf6mvssnqdrrr8igtfqf20779219ynt71vcx8rycf23ibnabw4y4i9tb4vhyyp6gbwog6qho04jyalxtz36jmv1',
                flowInterfaceNamespace: 'v6ifsgcywur74ue4i04mejpmjbxvr13awmrk3ht1fuobqhkbbysh6t9yh6ssgsfhsbpkto27epnijaqwwpk8xc3uzilbq0cbp9zdvaeahj987q27qrtrth0hk1tfkei6tbr8chvoobgct9ju1u8vne833nn5sf14',
                adapterType: 'eptbd3foc4nrtzz8gox8c8gdotjsc0sqstmsi3iump7015rpp1iixq2kgpoc',
                direction: 'SENDER',
                transportProtocol: 'sgf7vsxxqrkqq66whe0l3f2b8jnajq16zn0rk4bxoecvrlh2roq3x6qgyt1n',
                messageProtocol: '4y1bvblxrub7becv4ozpv2relejtxmfxdw7xbzq10dnpsvcxz5tz284hzr0b',
                adapterEngineName: 'wtx5z1y18sa1udoublsskx0x13f2w74bofzfhra19bh4ldlms7edfr5etyrdek62zfv80ux5146kc8e045ckir4rhswv7biv5h3zu77z7ws932cnw6mcyita2en6nkr4oo0w36hwsjqgisr0jtl3d8o298s7xur3',
                url: '7ajvsa7nprwaxu3dvc0g44c681wsdmopl3otqfephccqbhnf2hy9rm8uryptflnsvg5k5ly653478yj0qyn52tld7s95dcssg8s0181jc5eopssbbxb6qgg28loqv7uqlv193jbf6e36xob5kzvt3quvocm0epl8bed1tvmbcd87y6z5zsaoqzwgfpcq1m7ji0y0ou6rexpe4rcl4b310dqr7mf7qdwveuevgek90i3iw0qvawno0lc03xzpiz1vvc5yk6r14vxlgcieb1lhm8rqfm2bonsgwlcu3np5ubhwxxgoi3n2c7cyp926xro0',
                username: 'p9htguzdyfroqrh7djf9qt2weatbq3afpezny1pylbbjy1dcwxcxl4j47qtw',
                remoteHost: '1op7zf0la16e7kl2c6gsbvpx7s5oxgl7p0wrfd9geu99sprwc9ph4xsfcp0070knyilv3im9lblqp5h38mqq8sbhmko2njye21l2mv5xjhytxlm8z1hi7limqeykw646bgke2tqtxznh3zstp2mgiic2his3qt3l',
                remotePort: 5143933182,
                directory: '66caaulpjm7kdr4i0ycs90xisubafuh9sz3rmqc6zfpmbfie1lgzv6edkfj9ni5hco08xbd0ahxnikpohoid5ip701rfrx16yfxjdf4o1y5bsnrcytwq093x9bz0lsfhgenayxf362q7y0m0vv67z9c1jiaeq43ltdoaf57v4vvw4ll5e545e1xbco8osqzusr3e5dwwj3cigilnjzpscykb5x2fcpj1cf45vm8s03kmduyaj94u6rar1o1w6kaiseo4sflgvf6slhkl21c9h8uiatfhbg0n86fu1culmp6x55gxoy0mic1ey5wrpmhf6m03j6jboknw2w5y7ju67sh9hvs647rza5bqbfeug8mn5okxgglephybkf61ntkvllfw6aznyur4as7tp79twu57jv2nu7gvlc3jcilhl9ha49501mj48yhc4hpfdp7mi1x0rx55ilb7zzbocz46ue1syqe96wzav9y7qyn3xwictjw4h0kldo1wqkr9luqpdxlv18zn83uwe79bu4lkergllev6g9h9lxjiyu0yc989ha09upt3yxxok8kvlsyrw3kigbysvse9md2shrvxm14v1b7toy5yfox4xzrowhrtawq6y24st8ld36d8mi7rbeenhfdqtywxt9sfsdlgywe7c3a374t9hsfank68z51543w93uj6doq9bxopz9vedsv8qh69jkk7rkzffcylkrt2etwi1a7v9slqkdg0vpclpw6y18xvr32f5om6syo6yyhzcwxmd543dpmqzgv4nl6w1zr9wr838t03969hw0ys547ltrbp7yfgzubzmux5l0s147vliox00itde40pq6k45qp4kelg6b53ieu6lw5hrxr2joq8h795v2ydqlyccl9cefbctlei2750hmoyiny0gg8iggyi29c4cdegum51t1omnf1k1v5iz00do0g9jbthube34e8b54teu8bdj4dz3qlfpaf2kbywy82a60t0pvx3dlrhaqks4a0t65ym',
                fileSchema: '68yevfk3cw26sbucxpro7e5pd7dwd39wd1exw4rxqbvuyls2o8pcg43zayixbr9dwt4me9g5n4pls9cmwtm9xkciynywobr81rgz9t58aptk5f3iu5rb0sea28uteg4c20bwwo4umiae0utlatoiceiqyavqnej2n3o07q9oam7oeijx8j37zu7jwb7sji0548zzn7hzja9ag6b6lac46wjmqrcay3hezvwvl99k2t2k45y83vl82uv75t1at404igl0xn5mqmn900k9z5ek12rkjkr49ogcj0cm1ctux9krzgky17bqrklqhihak91c1vcrm33n7qayvz4h7o8cx4b1zvvhphmksg63gpew5p2ygey05soucyg65r8lxsxq0bs690yx1gctll7hqlzk0972mwnralz4s140faipm8zl7bxuogxrxnt0xdtjoku6w5zprmdbhv7i9ajnw25l2vslfyei3125jhw0kqisg2k5q6ihseffiw134rtshb1zpbgku5n89ndwf651u37hap6168ljyzzpp8e32seu3r04ggoz6fye96hmefjal04lopj8ns99m69qyujmmukaahjl1p4zx0wu54flmioqu0kbza6b0zmvzjreemdlmm367h80yvs9wehdzy0oupawgbqgh4n2idt59ki6m4gyk1v96r3u4pc9byjsnuaupf68vjum2exiz8b5psm5k8vfvitrmbxj71qslwhz7qmkxf5w1cu0wkfpt530z1fa9ejmxhb02yp9lb1ygc9jk27c5h1fkabr8sckrphwcmh85zd9nryyp5h6oabor6u72flww6hritlz9smsmszvqijqovo06kbinkg5tdahde2la3nwav8ht4e4153rto2qsbbub0oam6lb2xs7ry4i4ke0mstt0dzzqnnkdoki6qwa235si2slw8udpq8tnpd128k7ig2ik97d5a4q56h2rb0bnbrvgb3jj9sghgf4t3eovj8gw98459kx38ng7ae6b71c',
                proxyHost: 'u1p04grwzh0dcrm4kugwyamhgi6ras39mm7sld5en7zyqsmiat9jv1lrsztq',
                proxyPort: 1911880850,
                destination: 'ls8bvzy9n8mlqvs6dqutpa8g9hqrse4mj7enduf3odvqdnkkurelc5d279xqcyxy9cx2ixssnt4uk7l1r2p3kucdfoy6hylv7g2lotbojkyol9g95s7qh9dbed0h1knvcn27xeydjia48m3p9ejibres6a77zd1q',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'us4n54igdhg8q60u2ggcnj0e868ohjizj81o4aofjgml0d4dziyxcet68pifzb5snlyjg5vscx1o2jrozgbrqntkckqh9hfeuwklsaux9a23jcxu6fsnenf6wtirvjccayhulo9zx3t0p5ip8g4qyr2ycxxap59v',
                responsibleUserAccountName: 'e31zan3shnjymcmup9ne',
                lastChangeUserAccount: 'wlg3xduvr5udgyzt8z2h',
                lastChangedAt: '2020-07-27 15:57:17',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'l724obb83srh3qh9iy30dyhf72rhc04ql1e8amwcq6fw3xs1ov',
                version: '95xeb9wn5nhkffptevvr',
                
                party: 'bnzz9sq2q7blljm046asa2clxxt85xyzxi0qen89gwvan1ydd1ojss62bouyljioctaogiqf4ufm2y8ioztnff74lrdqzgw1t06wp6wa9p713121pckk2csi67dnrwydobf1imgb1ak2mhm44fhjeuc7khr7z6y4',
                component: 'ujz7qlu2y3jq83ephhhdghfir58t59nq87qu2jrvwscg9y5rkt27za5qnrryw778m2zfobnrcsuzxhophhwzg4xenkcbqyl4y7d7qt30cz0cijy3um3fv947ibqcihi6tk826mmvrit7u3b7jz2hjam6x27z4k40',
                name: 'fh2yrxfes10hlg1xw2ouksxrmp40msd7d2nhh4yyvgwfzlvg8trlrfoyrmj7c67p9x0b0jv043bgo334qxn6tt2trvsawph6r9uv0s0b36wguehfld42tx1llsli284flsprg2r8s3f70dzz5n747tcvl9vn9ynw',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'ofrxhbptulgl7y2r683ay37p4gbzneix5ihfeamwsscsrjs2e1yl283yzxw2zdj71ccb28jl9vxideza59gy80s668tgb6vli66gioz00n1c0m0obul3bieob3vxmbvkp2mrh043okkpbo9su9xhjp8lyjofz0j5',
                flowComponent: 'ehtrzpvfh36z2mhkhctjmjygmz2udz5nh662gvspjo4hq2b09gsz4315h985cf0ez4kwgxfka2zybndzfqvidv9dgjyu4p1va07ztudzr6rv999fg54xu3hjd95mtowfoh575wwjcfihe4doq31irfxtxmb2tmzw',
                flowInterfaceName: 'k3qsfm643xup5aq4px06z7m973sqlejs60dox9i4ibgk3109azj86azc1wivbwl5d6vzprbgwnc7frhoeq0s1a0jh61fts1ivhzl2lsn44i0q8vrqfdhf718jvbmfjhitvlhjwql25as3m4rqopy0e4gky9u3dsw',
                flowInterfaceNamespace: 'sva6uz9shnvvmlp1939mlb4tm6hn2a6oiwx32bngijob857ihfc8lqklc16h8xeiuavmu0paztmzq0y1mvb5sqiwpyd7swcqzknre7pk2byru9homj8d41013tqokzqrbj7bdt9576ij4qtw0f4xfkn2mawlqt1s',
                adapterType: '5xzdq2h2kxuni41ps8d7fst6gbcac37bqpkqeamnnx04ge7xbsfe0vxlaame',
                direction: 'RECEIVER',
                transportProtocol: 'a6f61h6938r1xjgijwvjbtfa32eho94i0eu1e54kt68ppxam3ac7fcsnunpz',
                messageProtocol: 'rogxkr40ovdu8433n6xmb014mdavsclza9shwhk0j93ihrvpkddaouguqxpu',
                adapterEngineName: '2w89g40llxm5b9qxd8fgg73kbpgsvyl1uemwhz12lm5n3nlb1rgfrgczn7rgaqo514gv9sjxh6k411hzpkyizswo9shbevpp872503pvfht7t8nnkak3v3s0zi7eml2xkofp41kowpoztgpdk0ii34fqag26bpd5',
                url: 'kqnl6yf45jpsfc2gew96h6ryrnsc9nnm3o4l8eatrgzpunou28w0cv4wi9gpccobcy4rwy65r42g7t847bosim28yw27ce95t6ue0kctmt6h7x0rlss29r7pe6nz676m1cbs2rn7kt0ifz5c6vfu77dph78smh7s0h732opeziohyruxlyriidwyv1bo5qjhiy4508419fa4ljgf0pdk2mffgu1kubr22bggzebjx06pcswmni8n2wp3xn8yv16fb9qofb9u6zgz5wclzp2vx1tcp05dlkw40k2c5k7hkqojen7twe6ncosk1ygw4ibu',
                username: 'p1pb48i2ei5fkv014tmuen35r64v7vv8p2uuappse3t1113drrabat0p0vou',
                remoteHost: '16mq4dmemxzgcf68b7l0hwopcjiodug68w649i7u1oto42hdzmvprf030vbz175z06jcq7711bfqqpojtuh5ocr0zmob0agp8r3w7qdpuvpp5ila8e8491mje2q7h2inj4b1ak04482b2mguadnwkg35fi4bagro',
                remotePort: 7828772988,
                directory: '29cg0e57vwc4r87l23gal6dqrux82r2asmd4buf2q09tkk843q8ni5onugb9selxms3h7a2dzwsk7508eltu6sh7jc7xurrkc6r1gaotscjitgya3km7wgxgkss9hcr748jvke2lf4y6hk44tr8kjinfzxm7oluvf0br1qclktouk4903d99b0jap7s0ytna2loivrox5d0dpgdyumuu3ythsvonroantm5vft77daaqb0nkqr2pb96gp13baex17eq8k7sxtojb2nb6de9z9md5ef9lvqcemdifa3fn9tnkap4yhmziu6r6724bfaei3hytqbv579628udhj9jqdh9zj2xoo9dldzg9zbicstrwnbnudxe111tyad1udj1dz2p8thuoq8hupjhw7stqvzln4rmphiwqyadybrdcxhzq30l21bq8oi70cdar17wxjb3zarbc7o81uefouuk2vwlgyogmmkxhxtg8fffc3d2g66xwpbk86bflmab5ogxs946b9zud858qr4vjs2tjl9h3a7by2xwnrewaw6xwlzooo2gv337py98irv46az4tuee59chridy47f74w02miunkzl2e4om5rfm3e9bpex9l5nohs727w9auwr3lp6eeax6ukjlxz8qwslivivrmddeb36xohirnebir0fkt4xjkov9bg7hm5r0jxzm3nib0j773ycvbozuf2j3srdt7z44ay6hr8p4dsd7qz2wi5jfvqmcrhesyciapu7agpdh99rrpbl02hd648dp0fkwjqem8gewe5olhdrnr0xh4hoahj12sh644zfs1wnz1a45c2k8uesgvpo12ih2gkzua90b7a9bae7qcl5woj2tjwwjuraaagc138mjgutrxpz8lml7a35xm2eo4devwhk726036hdfnz3cb7fv2bmc4roe4v7w8nyr8ctxucrtdqvtmzzae4aiv8axcz7zva9fwgvzkhu95d612tafz0vtpdee0yjjlfykfzaw3nfq9fo4r',
                fileSchema: '8m5226saguumacttaz0xy2xsbl10sqj0vrz1k3r8cj307v929v07lj9udqj3u0wi7ux5tmn35fzdk0noww8d5uy6jwl6jpbjlwijd51x40dyxt42wfcjb9fwoqgeurxjlos7ohe9ekmgnhjtmxro0t133673v6m3knok257ha9u5ya3aavcqd8mymnvzev9ocr1h2gufbg4htu8xyrfw63kxdy40ugobaz35p20tglc649k7xcp7chumsy31fmx3nbuq74yz8ip4uwb52ydsozwax6dfwldapuc9629dosnkio1zvng97018cwb1k0qc74hizcrjx6wl4xlukpud9ycipyzc2zfpqmtp6ludaco7phz10qoekgrry6snauwr5f9gaufmlrt1zug324sefzdd5ejix937ezdb1zv40m153rjdnum3hr9lgctcfp2c07td9mi2xvxrwglmco5knobyj2tqbn4ogkm1tqt2bvjtaqi5dblxcaoebzn5p5ahbeyuexjelwhupz2m7u2dklukpvlcho15oyrm56pvvk4c8w6nrygv2hhu1gi5udicutz83z2uylwuqvv65tuadpr7jq40vqyaz08r08dp2dyxchnb8mfpakxp6icp2fyreetb0z7vc5q3lex5rayp9w0p6kz0qnstm6fct15ev5x39xedv6hrud3wsxv1hgi12shqiuodt0ddwy5k1s606ko5egyn7rmxvvsl6uhzpn1duqci9l4z4i7bpzb0jzbx4sl4n40rlicikfwolrmoeoop7i176ux8h8a8bo89ykyk8f1p3ql92enqs3u4eeazfdzqvnrvi719gq9uxa5zg9594af1a5fbxafsrek564cxiyc2dacwae4jqlsa8os48lv8secfka61a4km3ai4c5sk7ckd5own21ngvvh4q6lhfzvlvtp8i3myect3hhna5dg8i54jmsqyf9iu866m86o7p8o2ovyr82bsmgr8qwz33vctg7qitvhfvxc8tdx6',
                proxyHost: 'e80t1ylnoq3hbyirhf0802hi5wpmlujpcyqviwa0b78jwoyitpj73q38umh0',
                proxyPort: 1181214692,
                destination: 'gcials6xafpgav6hv93z0753uzixagklol8j1s2y6pslqniqnvirjdatb0vq5gfp4td5x1nlyhc5qeb0gtwe014l27xdsuog80aig376jftm34vomw6yjmdjwmyu6bcxeh2tjzigy15r7ba1vojreuaqe0hxu9i8',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'cw9bk7thfshrnbkrtba2q3nplhhf4g3whjervr9qopnzj6d6r7h7ubvaf1dso8a5z0z2xjcffazl2bdqfwqp98vz1ytedeo4q5r98x6xsnh1bka9tq9ydh3l8yyj2drrfzo4h40z7ml9ieu7pfs1rmspuhyq0dn5',
                responsibleUserAccountName: 'ynsxl4a3z05tlgbanna6',
                lastChangeUserAccount: '206x2zxqq5n1jlu8dc72',
                lastChangedAt: '2020-07-27 14:41:39',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'dapuiawrcjf5ne7n43hazmsoqnng8wqcxpmymeqe7tqns4zspg',
                version: '2pux9n5q03c5ocfucspz',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'p04ixt04o8640y18zhu3134mdq6ljnn5anl7yevhaxh3k32n6q9m0kprxv0na6wy76431tm6xo1cpmweo8cw16xczztysvhp376lnx3uxv1myrkvo95rhg9pxy5wgc62an1e5ohg8zch648vz10ag1hx1ww394lv',
                component: null,
                name: 'kysqbxo5os3po7ms0aafzmz3fpcoc5p8ab16qljr1zsg253rdnhntpfw72cpx7srgz6mrdzgijs1rm1lhmwbt1dlme3xj9vdf3eqvvmbqbwz27k3jgrgvqlszlg8z4f0yb3tx4gt3p8wu2wkavjrecsx722zyl75',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'ipmw4dp4e2zz9prbyth7a3x3jpcat4ulmpnb9c9z4cjr43pk25ou5771en0h0ckriab6jw1owic7dttdc6szfh37292laanba3zxybufibuhbfqjzp0mlj61f353xohx7kz6nsr69bmeqpttzi33y6295cneom54',
                flowComponent: 'bulrrwld3n68gr6net3hzekgw1dwktkflh7bpgtxqrsqzo2vf2so3u1cv9mcvv0sz3i7kua2v1i5rzzm8xnsxx3deane4bwbavyvg2ewnrusbfem8b4dolz8whx8o4db2zmoy5u3x0jvsedi1txw03xzaw1q7az3',
                flowInterfaceName: '6i2gq21693m7tnn4i7xt3h7vrmigc7k6wimtua3ke0egdge8uapvjxk1a9u4pf36eue3e7s7rq4tgmzh10qrie536r8527yzr7juva2iyx6lzra6h237d42nxnv4s06vpsj1bsz1adzzso9pwba1rcs53qbip21b',
                flowInterfaceNamespace: 'to95pv6tk3ukhby6m7x1a43nueggqb8mcei2plxhx4sa9rnzyqfkpznmwboa0sv52dbgwj2vwx1723k45z9rcnnc06yopog40o2o7ys5wza37wkd5tuoa0jdctmfg2twpjb2tbks1xe9bkokapjktor75ymi521x',
                adapterType: 'ti6wmm179cuawtejy48872127ln2xexowvbbxtblffe451rf3qvyz1s06a0d',
                direction: 'RECEIVER',
                transportProtocol: '2d2lcdlnmk7t92yoq774cr8kwlfe0ckddw9d4gcux1kov0zx3r3eqv0nvo0i',
                messageProtocol: 'za7v4xg1alvafe3jq6w9jsw87o6y9rxri84m0is0nyncfv0ez4n23nk6duba',
                adapterEngineName: 'jw2yz0mns981f20n1kru6l2gdnycvnzoscj7fa0ry3p7bxlnoop7h9g26k0i9f1qzfdoqpmvrxrpjk4ptdqvktlmsexxc7cffccc6q3njmj963x2h5rwpegamu2f8h1uslxp2zb9oao0gkwkugn47gg5z2l0zi2c',
                url: 'jk40uxmrimebsby0wduhns910f7scemu9dkvgl7h19ry0dddcaamoi1rkbdye0aok1kdwcyijpi39f9v10eor7l60nm4fqpcv666psg54j9n1yu5ov1fjpke9mtn0qne4f61v7bg4l1pnhuv60vqn71xt32xz6i8vj0xbp0ta74mu62xzklxe9kfgcz57lmjjmgjno2pryv96eufc33sf9ruewlt4l87hxqorl1yp69717o9gfl1xz022wllwu5avph4oyv2eumimpz5p5iw0ngq5gevtp5cp4mrw4vbesxudoaybm2m3m4uhdtduob4',
                username: 'ssa0lbdcuco8b00s3r63as1mk3jt3fd63fs4o9wrkrl0kve7q0tsl08jiiiv',
                remoteHost: 'fdibvejjk6l1f3y1f0idvdwan7lxa8cipcowr5rbnk8dyet4cr5bny3sa5em6nw10dzhj6p7upy7qpy981cjmcqkv7htmxo4fosj5swrna5iqhiuab8kkfk5izb4bu4ofphofucqzy8k4t2bvo5rirs0ugh0x924',
                remotePort: 5394588265,
                directory: '7e0azg4fbs6dhg1wletjmlg03rpmjsq7xp0mj2hgjt05mf6y3nomvcvrhjbfndqhdxa30s3xble93oaq225imq7dfu6sigjhwi3so9rnnynvgj0p7d2vy5mvdwu3y7xzvos9fg9zh9ho7x8za7hmh6doqg8qlpehmf798wko6nh9sagpjttlj1qtm582obqlqpm6ts6jtgzh1b30cy9bgkguffo7zj13q7zun0molxjbin85cjk4llred2mlwuhgqvkuup9tigiv3w5fb4f37mh1gtebslas2k4vkbhw8hy754gezr31osm2bvaafhtgh8140izwq50y7p6rzlezj0s015x97evtwqql6a3dhqwzv7ywyf8u9v2ny74tynusph4n9psc4w3lrtd17z19cw8nsae3ruc6fuje368bbrro3pltm680mry18q8u9uyqorxbyo9ytwetn4atp6zyen2934sgyq04944r2hirmyx20x7j0gs7r01tyizp1kn7k9bdahf12pkxh6vv2meh1aiq2hyyla5ypsj1v4aaarhskzqibsud9rlh68vciwo0bj18bdm6vzvjp36s98yjiav9056204bgm89f0mfi8n2ykxqo6wedxhyulv8rv5c7yy4jaaz7dunrvasmlr92w45xnywrbikcmzwn3i4dmuh4rec21las6ufz26jmco1ytuc4mhx904htes5duckmvza8n4uhgs76akuskxpdob4k5rawg7csg7jte3nhx68aa8jsjhfdouotufj6ct0ag32tzth4zh2tiezgdceteuhi5iurtj43796d43kx65if5j12bo75jxkd23aenkujhiqmdc8x4e5im52qwfvq3n3p756bi50acbi7hxyqkdzpx6ueyjlo45v0ss0sikp47azr18swko0wxtfrkg3st48364hcba0bavqp05fl1vjduvta4w289uan9aw888o1zd5e09dscxsuz55uz0mmtszs6uo4ewvpvf7f7to9q7vb',
                fileSchema: 's4fo34hnsu65i473qpknlzpo4fe5ygoxik1ntuxq1zurkxele9hn0pvpklxj48wupy6vw6ydf6sw9wc42oi1zae8fg38x92lliwwhxpnkiha5b3k9mn1qdrj5wx4b8jofiwastkr765hjjpooj4fs3za52hxohcrw2quxzotyscnjrqkdf3em0hvsi0qy8aslcqvke5r95xnk5tzyj00zth96puwxwmadmtetmsr3cr7u3k0gcqb14u4hxiet3folrce3bpuzoqwrthx2bh7cqmnmb8oevd66xbl3eqxyfogynkvd6ku82j86ok48sruwffqauaijopuislo3rrbmys1yluktovv7o6g7ap4ygaddxx4fz3fnkgt4zznt7fvlfnkm8cl4l6i5hkej5bbb2aatjzk0fjorhnf3sh7jjowctlny223frld5pzd7l3f3qls1x7zown8b9thveabowdbbem0lzl517qtlxgfky0k08j2ka9a49wvzzi6puxzmyip8ifvlii7rx4do0idvtqpzrntqblhds8zxw579el74camuhno6k8p7thqatstvxso6jan7524ic6a9qqhupzx6y7qmh53flvkvj7fwdobwb6sfooizep9ll73lgzkzq4lnqc5wndkyyvy5r0qvmunh7s6p4eh2dngt078znoc4qqc2p8hr896wbb5ylr8z4k27cly73iypxojyzgn34361k827hwg1f54f0a4btyzig2do5gdvrn1lidx3yw8mxw5clgqff8s4rqn1yihqlrz36sy3fvzd4413cim79y10l5ff2bl0aj2h9eu93pe2s1z163qj0u0x1wqtqia732c38n3boa8dud4fp63uk2bq2zwasmpxtf96tawbe655lzgj3jxc5eddni1ptthzp9uvc1fcay5p7oazvfi1hrtv7df3voe3n71miemzmu1zlcfzilwhw9m77au66ibncuba0k7ffadxcsn3kkj7k9ub9za013t7y7zx03ssjrz',
                proxyHost: 'v05m2gulqlvqwq3mvtnpvj0mf60mc56n7rlkcxhbxqkzv7ch81ba46pi907i',
                proxyPort: 4273113217,
                destination: 'jr2wwxiwkrrlnm4cclaoizui0c11jqoqaig41a7qydxm9tqmcdodiudye14f6alzrckl3p74hq6qspyhuhnfr71be5mczmg7qa1qefjurivi3sk5g5a1b8whgq6o1468huj4nq21g17z77a9x9c5uqv71ziw1ftq',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'qgbwmku2ek1754hmq7thgalfg7rrw0pfr2t5ncxkos7iriyo87zud3e8ph9y32ecqkaau4ips3g7ssytqqpm5yj9qobp1meue2btczj2m7sjmi74qhrknfgbz29mvei3zmocbjm6lx9qc9n1wrxlgorm3h6dkjra',
                responsibleUserAccountName: 'ni68lp9aws804kjan9x9',
                lastChangeUserAccount: '1kfri3vdwlxvw4b6mk77',
                lastChangedAt: '2020-07-27 03:47:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'a1e1vn0uwy1guz3nahw2wqta8ytpwfuhexjemwfsj1auwaxrvh',
                version: '4qiyw8qo4kr6pdx8zj59',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'ehy2js73ku2sm3kyhldohf8sr284duxqp8gneouooby1meg1t8r81urszp1n1yln74zaslm18pvcjlfsyntkglbqqodp9cjus5ynzumeeaomiwi4ovy93cwijp56o8q5zybyx6tpm6tiband8dt566m5y32x1kms',
                
                name: 'hyrkjz9h6brs9qi8fpqhcdlp79m2c51xw4hv3g372mz4dfkxj4y5ki14vgn4fua75v07e5bn64qzsp8u16bc8ihoydj1rlomyzppyw97h8o6mtbahfeafvdml7ok8w9ayg8all5nb3c0occcid4xw0gld8om834p',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'bluusbc2w3np20urnlq1mzy15bdxd2equmrl9y8igw3259820vwrf4np7hfg1x20yn45l2aakrlaixmjujz0kj65bx1d5bkm0p0qjw39vgmfl8mu62md9k5bbhy0z7tk0uk4rrktovdigy64fu74fthgl5fsienu',
                flowComponent: 'wunvlrdghcyn3561l1jhxi4ucskmz4gpvdp926ixwpcynzuuxyv0k2ri680ysvr488eynyxhb274hvjfcz6tnxabnhplegszi7qi5opjuo0v0fuladffggc8gdns8b2dq34x3h4cnkdmq4vop6enbm77id2q8abj',
                flowInterfaceName: 'zmutje88hip40767vzryg2kq717dkuh3shh462cimxp0viu7998tc34lhs0jiruwuxd615w90tlit32wim38191atzkwxt4zvzp6d6bbtuyr2fho5wdm40on9ji3ved8a6fgr2prvqyncwwsfsa79t6y340125bm',
                flowInterfaceNamespace: '0kq0xh4txthkqk9j2a7h6ozd55llpauw1emq7v0yoth0h7bu293i882ozvsxu81wjz7bzk7glsfnlf6enr9060f1l7utlz0q3fdr93zmgnprny3fa75jpx0qr02y320bgwy2dke8l4rb0ochymk0qtwosfwmq85o',
                adapterType: 'bor1eaepcj7rwb3mf7svy8chbk1zfutxxvwqwfhbxntrjexveadoqt8bhoec',
                direction: 'SENDER',
                transportProtocol: 't5vqef7cmrfatzxfxjhlncopymtzf6dlhskz5gncwrp0ryo2rk7r1h81mt92',
                messageProtocol: 'cne0yyki13195bpmbkpxifdnb93rqplr5yw63ke6zxch211xjx61hjwzrciy',
                adapterEngineName: 'tv82sxt7zvnholebvr7dzyrp4rzfykcl05w6zyoqx7yqcszve58alq477u9ff6344lozhlnf746dheyqj9e39bs63hktzau7v9wy5hfys4rzziv9h61t1lmz93po2i8vonkoxj5inrberw8x5513ejxv1excge3v',
                url: '1dvlsfue466e71n6fhva5u4vm9280xx7h43zpbmk2lsqa3cem4z7zifpd4450l617gn7cims0x4lb3a3pot3fm319ca9az7cmvv2vs8ig0gwr48zia9iatlwm937evsr7hlmwc0qpu4n69ee3hwijmrmjny9q0vkqfpikh5hbombqux0j6kmgirtf5uxdbc6hk7tk6i8omjumfmmlss0q563j9iime9f454p1imctvyxtya61sc87nl85gbxye63vw42avzmdedow5miok54r7uvkgdrf11kqi40veusggwnzjhh4hez72a2n6z5ehfk',
                username: 'piwbxtoc1ikb370lexh2bxh59odmjbsw8of4nns1nbf6x146zvfbyuf8xqzi',
                remoteHost: '6frgdih4axoeucf9946hw5njmvlba6q8m2c78go71b0d7eqo2rudxt0pyn5gx2i0b97mksa8hd1felbhaa56lz7c06ot5mr0qk7ldfd9grh6upfs5fug139es001ivcj2rvfx1otc579kq19cmcmshaoaryskfah',
                remotePort: 9167660751,
                directory: 'v7wtal7jv66t5de7fuurxt3un7x6fnvl0uf398wddvsgdu4nxpx4pp545juzarl7x6wa4btnz8o4hbh7lrucfg0ts51b79e0xw6koy0lmroim073zr9lye5ko7n9g6jvey16ev80x8nx61tyzvbuz2qyndl4ar4j7vkppa7gx1s8yuxvnt903puyywftnkwq5abvdh0ld5x3chjan44ehiyvc97o9c90z1xk807xtap0fb0z64tys2ch48mpqyr6rbj0pqbdplnx25b79b9dz89du8z96keg7uy6id6vrof6quofw9qo8str28i6xzanog7l3mvx1iynt152ro6ichoi1t2bpikarmartcoi0fc86owa36h4pm2xrsk5vqgurofeg2l2q61r5bea723o0i7fzcghn8ndhng5dpdlz8hnbyftrgu2dtlidomz2jsv01dqysjg4172mo1abl2xrpp315gqg546cgzt9lvvbhiepgpji70ascakxe1rf06rcf3ocf7ch55l9jqvejbwfpd8d3q1ewta2pbqtncb4xkf5towszyyerxbcy9sj6uxmwgzemglar2g1j91zujan0a15egfj8262xhn8npcikv1awunufg43fwz2smxdg4oq4nea364h1ygalvi0fz017yp49kvaj9qz0mn8zwsxbvaj7i26ekjjw8ubm7eszpstzqh1g7t8e1z2uxftuoqrisrptz4t6g4yt3402pg425agm5w862zpe99ateoul6717draci5032j2vxmt20fri9oe4rj67jbqg1xjmqkrojg9jakokqarz11hfaoyrn7tgq53nxaml4hbqbffjtrsko4h5hyk9q1dankn3419i5sp052oq6p61yb5pkfd5dxmknwyondc4li1mxuavr6q7vn16o4as1wcf4cbfxzwh9ttdtmosohaea1kkzxepm4yncdw24gxggtuulmgk5d6doeckxa57qcasa0a8ikem6bgr6cb505xfrfe9ugqgrf',
                fileSchema: '7kjzu9onorfkw63o7yc2va86z4qs2mfltcvfbtvlbpv5n1l1a06i480skz8j0lrrupse46f713nipah3mqozpl0g1ooj3kyrzu1bayo6us90cbnw8ch0yyf0bq2p6gcf9c4qoo4o2cycoalwwfdx72bcdo8ibzlak5s9620f737pfm1etvuhhrdjua5v0i09opvq9qq1gsb63sd23zdq1hjl5hjsjb7y40ep08ex89lovi6h4ffig2f4e6578cs43wr8do6g42oqdx5slsbzd7ovge22nxurfwas0xde674gfdjx46r0s8sh7c7f8hevegwiglow9cs5gqaaa6e4q399sgc1atxd8tct8n5vrhk7b7h15nao6az7kmsjkdtn83aaguar8fdllvi570k1uj685ewi4g33n33kyvtm2ad5ex44rk0989etgpf416kgep15ekj7usva9rm498gz5mzxxpldqsd7t5oi0duuvekjh7hi86gj0yyz067rtk4e4ifs0wom6t6apw3dkxcafc6w43pl47onchmv6hn1czjcexrb8ca88k6gh9u6difyankqypq5b71yp9j3ulwew76n9hz2gnx0uhnzkcatt9n6oaotqsmch8qqju9evs32p24jf0jdwxjj8iw876poyi11qqjlm1fhmjumtopgypnih5sh1yhsb7esrrdp3ulq8ko5x0wazky83zfagm2ytfl8ubgvsutms694n0520jai1ks0qszgk30svylcub70fqulhjbvgk9rw89echkaodr222xr1lny2svegmunnrkbavdno5y0itda0x3jx5l7rudjjo7ba4qexhmzfttd7pxl1n70ix2ory2wlr7abuhycp1zmyeauq47ew45fq7evrirrwgyrowmfqnwhyk4pbhycg20gr444n2w1uat02gwakjae6zfh4jglr0d9uol25mo4ahznjs6zj1vnq37x00va9b5ic3kpc66cyvwyffodmu2yrrz3mz54kneh3g9',
                proxyHost: 'tfn2lfpl1o5p4kwszz98mhflnbxzsb4cbcotnye7g4d06m1xomq2dr2u7pgz',
                proxyPort: 9967658155,
                destination: 'm8ykls7dtmxlp89hly23ejlt0pr6i9w45xzpodwa5n9rz33j9h1jtuq4g0f4tjm40g3d68xpfl4fb7grnnl60unloxsmvnlm35uk69l39ln4t0sbntdepv1gki5ecvd1fl4lhhgru6ic6ul8l28rycuzaiuhqrae',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '1yzhvhkn6eh1pw7vqgyabv3sqhp7rqb7wzrmsjl686osghsg59a5b0lcorzvekvppugat23gbsqg1bxukwmk00xym7ddz293lpzxxt4zdak9f7zhn087xwdmfo397q77770odes0bfbbnvlqlw9h12hssiy226t0',
                responsibleUserAccountName: '90o2odnb8j1ljtju0uu8',
                lastChangeUserAccount: 'qe8ezvy704l7lotux69m',
                lastChangedAt: '2020-07-27 10:03:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'bvrjnuuhbvrepwxvfol41pr4tbjwgljrb9cbpffye6u6ezvnc1',
                version: 'b3pleipnhjb0ajw5hrch',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'h3tdxnbrgqu14u903v3n4cfziwilb9lqc25w339xn7ew9axs8i5f6k77fn3gpvzouk48opaynpg321echum9baxzl8t5lrm9iu41ap92x0goj03nxb4s4ps743ckjlszli9e5zf0567s656x0blu71tugng0rxmu',
                component: 'f1xnn1b68lbntucmyk7zxhjrob0l742hbe32oi7b4t1z2a27ew66huhyynivndn1wfp4j6dmg51cnnpagz4ojk9gyu6fgphkfutyjns2qk551rtdh4fneba7touzw09f8bqqk7y0udozsxp218ld7defym0ubcpt',
                name: null,
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: '74w28yauzm1tkj541mz2k2z1a102tu5gf241mim9ge5sxlxlxa7jsu05wg213pv305paybta4f48f9fved4vqlzicmjuvble9rvsllgtvzz8so8svbytfa84d9y005fkrc0pzjs33tzs9r2muqoi3qhblh2z52j8',
                flowComponent: 'e5rgww1nf0w6lso1ie8fcc6oeyc4eim1q99xw0ha4t8mex6dk3ayu3rcozy663v93thwvlnf4wync8jgjpiaiivsup4nea4xeyqj4y7306rtl86h5yuug0yff3219q2nurlv9sndbb4oxjayuzd3hm7s3fvt0gwn',
                flowInterfaceName: 'sd6jvfuo7q3ojikv4mnpxkafi3j1g1z1rybzn55qxqqjkqsxjswu9qxzaoiyn8okguos4bbdtb4jl25d9nzup7e02a7f72319ym95o8k3l86wjqygzbcxgki143dk6mfip0pm2lgqtzqc8nn6ew12f03nvmldi21',
                flowInterfaceNamespace: 'd4yb4peortmpcgddm1k18z34ol33urkh3pj1901rms4mkgp3sx2xi5ieq2j9c3fbnq3538nua9c0ui2wyczgsutld5nly8u3pgaxntzs99hjgdgtrsmoymzpg9ogahletadxdp6gyjswsydnf0wg9mve2iq8e32p',
                adapterType: '47ul5o4e2l43p4cy9439gswomkmcs74ecbzrk36hvh2cgtd4jwthvoqvavp6',
                direction: 'SENDER',
                transportProtocol: '61r7nzibuxtuyve2mgzyqtgsi1m7qptvfhlktzbaifle5x0rfu4j4eerv0x1',
                messageProtocol: '6hh44mv3gc7xw7cqpgqrbwyx8rb6fpdbrb60nvnjw78ywfg7a4v4mwzyls05',
                adapterEngineName: 'ytbdqpgkck4nvjt3plq35mvel428iz6ds3nldfdoy5hrfly7gva097vct7wnhes7sjvar54wi2y92q3valj8lxwkqm8h6xwpjukcronyry2vexkpntolrabvooz96xo9d59bj973b5w94df90oimct6olgzntkzh',
                url: 'n8xb3fvr79zdwdp9j4pivu0h8i8h7xmwerp5bdehddd6kkej3pkhqyln0gci9dhki1i4tprt3wluytg76xk6ok7d0m3vmye3w40j2dl85v3or8y5hal6l63vyyh2cmk20schsduo1e2kikl66n8g87yja0ikfiv6zf5sh91euuidbf0ziz2r1r5rih2wxsjnxb3e2cqmup5zhkabqh5ul4f76x8desjtc178mepyi0baajzzu3n46dpzm4fqjzem6193mlo24io0ithmzpuw9u446r0mp6lwoz7o4kp7hoa78piixg6v7lebink8augy',
                username: '0ach4smt6rfkko1byxofooh9zva3vd37n4u3hfddtfxf0hwe3imzobmslyhm',
                remoteHost: '1rld8vvwcpnpzhoyp8kgz4vandpr0112n9i85lu16c9wo9rwk68sxmpabkb7df7iotvijsxhki2e8tahd0ph3mptz6ogbwya1ea4dx967o71skkw54xozzpwtq163lbfhl7rf25vn7qxyn7a7k5lhstun0mvfy03',
                remotePort: 8581903605,
                directory: '0q37cpeyrdbuw9e5zvhf1ha7i9gs3307peghjeusymz4m8y27rlxt13yq8dnccl3bnfr3xhzpa1tmvase3nh7pr2f3e7yatwbq122bc4qop38erdl7ngczt107bsfvn8uhgun34s0tt8fjccxt5o2veksdm5v2yflsng8ix1r0txlndrs89vno6o1rb60pkrbr4mlemuxv8v3wdf1xx33kqrdzitkj2xkfy1swxrkb99tjdsduvobs0o17axekjzdyo0f6dgs8sl6lqltqn2uemxkaif7kcx3zsikhbh0zo8dm3ns95z578qna1p0vfoi4p735dznmtf7gllaw7sdviyon6zq8o7f7cm740jhhcstlaxygevgealcc7v5uto9egx8vr04jnrbhd4tpvvixj0eebcuerki7tgzf3chudjt8b27ilexiby7lltoosochg9qmxhwkf8p94en4k4gplg9ky2hbmnhv5ay2u825o70xheor7fe5ndu2kr0710bsu6qa9n8wkxq8udh4ledyiacihqifg22homj19r7nkafv1sf6y7xe90zq0cazzxfyv3nmmssq7hcgmn6xkv3elo5bwqvmud5my3gcsepoeuotxpy8te2joiu0vcjudbgm0f5jul23jg3rzuwuw75ki0qnnb18bbbvnqnxpsdv7u8kklz7683qe7igqk9c126shluj9k5cirys8te9n3r6hcvfs7szzhl19dqe3egkn6ft5o9mah0nikgwovbd44j8obbslrdnrqy2ud6jz0zgqv3xwsj938v6q1a1uhq2rfh2g2hsbtkqe4qnmwhrfr22vgtyfm3t73xx93mvwcoq7ovlyfi40qumjmjndnc16pibrzm3yzzasfz23s4je81vonrgdzl0cgapnkw78epdwlnpwgl25jj60b9fui7mxjycl7ck6r1nzrzl3fp4tz0isrwdrvdlrfter2zsz0dsve0wwaowimvjezgo5zvnssapip1sftnnilplz2x5tr',
                fileSchema: 'zxd941xlb1ivucxwki5pbc6dofcv7htlxc5q35r76bk8qcd0fu5tlyvvwsgtsegf2bav35ljb6klu24eob2iw50sgctuh64ws1yv8o0rhm13rs0vizuf3vbmdbcml7ih9o4n0gmvxn4nyfrh6d4l1hwpwjldtp5odegxb7203jlb689rlcpuhgnj6fdttxpf0eze20yf0s4p3b5j8f9dsnv5oxapxf4d0v9ta9yed7hfyd4r1aa1cffrb0fx491dwuf0tbvlyu3pghv547ff5j0c4r0as81rsg0wgby6hbw7ekryfn3pqovvdf13v2hcd8xq88yr42izx0l67zo8b9b6n2i9ko1ferxngscdqsq09pzo31443m8wmghobrl5xglvx8o6xqs2wtrjm1qbc0kwtqao7aw557ib8v27njgyjij7j5zuua4ajsutmczkkbtvsq4j0xy3m17y2lvo7givrt37ku0jubxi2drfk4j0sorgk2583qkfm20zdt6ufb8y5wwzc0hr6hupumk6wkrjcon0e7zl0kr5zocfxxqe7q4uc4nla78s31r1x37psenhk3759t83tp40aec5dmoh9o51mjbnigtvh0h4t4d0alg9zaivzeiesyl8wlwi96mub82cdj9xkg4kliv8wokkutixp7vbmm5yxgwf5hehwy1qtbix0yp37m3ek5u3vgp3dnsnra04iqh6wlli3lp15a86f3olemf3ktbrc26bzdnxqq2f1fyjszbcwsa7vavxtxwifygvllvnfo3eyvyzqgj75a91s2z07b9uo31qudytgb8dfwvb0w02skhyplac2tkgptqs96qpema1u8biz337ecqz99140diidp79sykyirvh8iwgoceuzr2la1k7ig6cofett3j99zj3fng3irrbrztstfoyimgivds8k5y9l0hego2l6xerpkaj3xqxpa6mipt45cbi8hacxkif5gjpwbuyr5gldo2u0i6sivzxwt6tm9iroxsyrgpi',
                proxyHost: 'od3vdyd9346s4yn0vanen3334o4h56mf1wfmpgvtt0z25hk8ywdgmfadanq7',
                proxyPort: 9608261838,
                destination: 'm8ss1nif6hmymnu8q8b9xhw1m5biyfh2lgr0w0sxt8g58tf71ffzckws3jd60u8pmf0q2p4icll98x8d5spewz6foeieit6v1kn3e6ern2gfrkzkiridpqed2h250gkel8z94bqjk4njz0p2iyse56trimocfs94',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7p5to5vb7hl653oetie1b3fy4u538z0g1buamv86p946hviifsso3c86nos404lo3q5d937opu3l1zj0t2xbbubwrwuqh5mp5w6ia7jw2vn771ipil56ftk6eegcpjnyqv4qrejp1v3wjkaa2a7g4afyylgkf691',
                responsibleUserAccountName: '8ctnnp3wkwelsfmegqap',
                lastChangeUserAccount: '1orz0brje6kak9o8xlaw',
                lastChangedAt: '2020-07-26 22:09:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'cw66o9ds4j8iqz6g46houjcktygvrixelh46bwnc90o8jt1fjg',
                version: 'ylyobgifrdfpu14ztkna',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'th2p90pg8e4024uyw1ysxxbeznj4xs66xvfai72y7sv8fejko704lcp5y0g2d5wt3hef4a4ldd40k3ixwq6u69904c144zy2ix64x474t885y4j32whxdvxfz39p6ryxfoz20h0vibnwbdb8drv7niqnxu6kc8qx',
                component: '2y4ebaqhutaugxugx6b9on44mxlulzov83d403wvwv96kzuucvgckwwntcwxi0otg6gvm5s2g4k75z2qq30nc2aejyu3pui98s9rjpdg04xvqvutrrftrn1ku99v5rja9qix7hagbbnx683v108xehfcsq5izikq',
                
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'k97zmrz1ubecj1946gpxlr1b33guj8pccu1e9iosy6ba8gkn1yx3vcndt4odmx7ryt1pb9zgv89xckrwzuu7ghfzea595u4zouhtsrncdn3ut4wwtr74ywhsxpn7oub1wybyc29dukzwz5vyaltp104qr7qx2mej',
                flowComponent: 'yb21vuhn0lp7fpqvcb2mc0805ma0g832szxoypi0hitqa58se0zl80x21ttq9m6ihtg63nzah7vlu86a5hsyu1n2pv98rfp509ipgwa3vcwz3s1npufd091ao1iskoa1i60u7krjuea8bg0zfu5th84p4b4br5mw',
                flowInterfaceName: 'y8vaxc7sliu3n1f3i9u04umncy3ovwhiwdfeqfhomm2ssjgta6s04rlaeh1khaptrc6k4qjci07hj8w7r3xnicinvypx1ncpv2pyprbmdskcoet6rly6b8hfderg8jboeh91mpyf9eaoj4xtoj2flr2b8y639isn',
                flowInterfaceNamespace: '2ybvpjqb737wg3wnprqrk5ro7wul1vbj93yue30n1hd3nqqm0skt9zazph2yikidugbxwco6fcvxgtguve8hnah7rbnuyemmebsz089azlkcfj1hpqik1gsk2tcionvmnjhzmpa0b23r2fpkk2x9poywdp3lhz5c',
                adapterType: '3ye0pmujxu6rm9imgiu1ksjkburr8jyw5rs3odeiko4fsxki3ocxfyysxvhf',
                direction: 'SENDER',
                transportProtocol: 'haaes64c060yjc6tb4nnxfkmxh2wqk0wirmpjpx83ij1w8uhscq8dskovuez',
                messageProtocol: 'ergmp7nk2wws4pfy2xt9xhojg06ol6qyfkmx3d0n0wf742cmbvaeoyz2v0vx',
                adapterEngineName: '29efzsq5z6xk0ieif3qco89129k9gnt3md74afzsi6ye71imjhi5ttnimqm73cjl8twup0015tlqas8mt1yyezvpz9uana5yowfow1tpich746l5k0c9i1gu2bwupauj339ypwvs8njd9kn7pqmsx9ro775zkk3p',
                url: 'w1ddrctlboktuiq1d323g1jcj0mef2sldc7iqw3vvkss3hrjv2xmicb2e7gqgtp41i105fiqcn4lccqsms45htb2yz5yex5ri7e6g2cklgs0vigog9teiaf3b4vux2rhv744fsfai1o8e69lxil1rhpbz6tvvheyvzpk5jxhnkn73z2k0x4h3ynnbxb3ip1uv3cf0x2hh757mliah1l6ligyc83qjdxqwoadqhof67l7z8v6jig4xtodbf8uxvgvnepwzuy5mzdbe14j84w36l1igfu5akde539cvh3ujh0jaxyv3gvzrwu8gctuavmc',
                username: 'os836n35g8fbn2e2jw5uswkre31ho50tsvyybyjoog9ro003cgpihcso4k13',
                remoteHost: 'qqvs9m2fkwlavbaihrqj2lel0qpqwocrgen3ilrlzfliw46aju5f0pwb1pgx7o7qjmujimdxldu5yug1actzdn898rv8rabon54un4dscyp9jxyovc2ond3fpr4igo85gtadvpd36k6wr3eusrvetfdqoo4u44iy',
                remotePort: 1966600644,
                directory: '7k6z38e0bxei120fq7knllunhi7kdh8lqvx128fgp3trz7eqij90jr33gpx9wxxavgsc05hn757xdbf1ohscb33g9yb8fe31eps6bhw87jxfafy24gres3luwv90ydhnuo5ignlvs1jjgihvglfmju5mdururcbfy3mrkz6n58w5trpc9x4ujpkvq1b580qonjx0avf4cymp675zv0rvjpg26h5q10rokibjue60izrkqcm526ih37arczt87d7castr83e94bk17zmy7j3tvjankh6xwgyrzhyganb88m0865ajsy0c360nb6y7pssb21ny7es39uy1786tpiz3j825j2b6igzepvswe1xxvmyaqmt9j0rawnkpr4hn7vckmuaqv0v4g339t6gj7a98suip30pgwo4ue5n6al9di3znlr2rkpggpknz1gmooyj6xjtydh45myrq112pkpo9nrc3zcnb8851u66ab2fza5o53uxjx0kz7a6o0japnk9d1phv75sr0rbgqgz5oihwmzh9a4cp78hxr23tlyf8icbhgpn3vw0hesk791q62spop1ecaor768m22uel7ppd4vbuv4rhf293mjmuxj2ex1f8zltxu1yesdktukwibkqjftn5haeznbkvypyx8u8lpzwowlwkt08zrjl67zprz1p9fosznyxe64q0re7x25tgnf6zgl4d286l74c4gcxzu3h1wmtt8udmfcmqhiecarwd0xjpl4nrvyd0yh5g62qd88lh6cu9giw7ljd0xhun4o9tv82157muwiiipmtes5f6c1pzwux2jq0273nnkcci9n2rfzrlqi0q7inq7vuvlk2sqb5fpcd6ye5o38j8tl1k2khq30yml5gqcrvfhun9elc7dvy2q3nbmp10d357v34usniw98nrtl35frs5zo63gagngopxdlmobrvgco3tgk5cunex1hcg7p4li8gimrwop4taqfzfz5pgxcrpb02ouojc5z56963h9n2zfpjf',
                fileSchema: 'e837xsyac7rs8ucf3v4hrmgfcjba1y5l3li6txki6w253ew8yqsnefm2shrdd6ibj1iqz4nvn6a1gyopcimial023sdtqchk50ou3qrlq0v520g8og4wdobo1ctsx8mvkjsuq2qjglqv16xj4mi2cizh1qttsbyj8vgn5eu469ncgfto0gmh55bvydz2amllw7o033khav6phmhfvyrxretopqkqlcs3rn5hriku1jr8mjdu86mhuiwjd40yxxux5ftg93mhprb82jf4879lno7lpmy3rhmozfsb0kq2q9o1tpek9zhe31bpnh9enl71k4luiujqlnk8g7fsjil8px6f8zdfaz6ru5xoq0pxwlm5b3540db1rferq8z6zm5vsdz9zy2s96lv8s91g4ijnfkske0dez69rvuxcpk79h488evuq8r65trlca1uzt4u88dum4kri4nlb1isp2xoah799xeg05tat79vpytust6itl23gyhhcnw6bhu9594rkkkfudtldz3e44kdye5aqq4hw85dpo35doo6pdsww36ck6pw56pfz06jb85ej3i1h0vi5taka5mk1dj6l9fkmq5aja6m5ssqei7euss6uj7alt6e95u8ot0z8ly3r2b9910kp4o4l1ubzxb02kjqsm9a7df2by0q8fyox18c9h2hir8cqizl9ladogb4t070zboqwkmu1q6dv1b1si4w0q50xgf3gm6abqv2lf4hqwdca9u98bc4yupnhebpb5kld3t4xccod0v594aer7m32yttm0nj2nx97f9jn804k43zjwnno0uzn7gzzaitgzq1hqa3kvczol6d2il5wtpez1g2m33loir7a49f1anb3ngaq4p89eco3gx663v2ttkbtem35sylcjpt6vn6a6advhednhd6v2exi49osk1c5nql6evi138sebb14febmvlalcsj9fz9rswt5loghg5sn6nepi86q6ncz5t111cx4mhubwd98a63xomtdz6cdr0e',
                proxyHost: 'mdjv6xfhdv3pbg56ujhg797648zzodprtv2v2lojtl2b3svzl8djrnvrqiut',
                proxyPort: 7442415961,
                destination: 'qu75y5b0ofm9ze3gkuhj51mo7ittfd0t71yza15dxf37smfdtxnkqq49938bjok02qtaeypxch28fwpdd2oee702fhf10dn65xvq9k7ov0y1wa7vrc077jc717y7kqobltmqe54vm371nh0rqvfktmpaapew22sm',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'fp36gei5b8wgq222cvcxqmr0wjj90chfg3vlwqeb01c3elpe4bpxlwrwlshsa8j2vjoi93p4ve9swrmdcuuuxqa5tcssr6y1c6qb7u1lrwqkopwdqn4i5fz6u1yfzux9c95vtfcdik06r99xz1360jdqmqnhy9ed',
                responsibleUserAccountName: 'lozu1zai3lh4s4ys3vxz',
                lastChangeUserAccount: 'fx47rda6sci5120y2y26',
                lastChangedAt: '2020-07-27 15:43:30',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'rknnx383ybrj8zx7o0rdxfcta88rdlft3pgodadt8mrd7mz3zn',
                version: 'ezqvemdkwfpbirbkv3el',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: '8r16w5edbiau8u58sorbhbq1xyya1opwqvo70j2v27iff5gvkb9ts2r9qt4o56h254a7gva8zgs24wgkw9oe2xen1egiiykiace9gmihrjhrhlst1mtxbj1hvptg6tvblk9zoh6ehw1eo9yu7t7np41yl0g8a9cb',
                component: 'a16xgotljc6582hb48txxp0wcue47jn20pf0t5yg0i0edwjyyg7jq9osh6o468d32k9ikr3i50ydgggpbf8wfge3hpwd5l2n3mkwtn8s3trr82er96a4qow2f22fsn65h7j209enjzuq2gof9ieavluc9hu0qycd',
                name: 'mui4k3ij83boowgiepjb0k6gathg02milvcciuxptzzcf7utbmh3j07uhqiyplazfce64bgioawz3jfsa7onm8ozzg18kzr4z4trvh712s53yu8n7e8xd62s5h21jiopb4nf2jdnb024vhnh74k9sh6iaz5v14xu',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: null,
                flowComponent: 'e7p1mmcj25fb2g1i7rxd2enrmnzjiwry9zi3l3x9d1ot5ysxg1yucgclh30hthv3devwpferz8rgas4x3ztavcwe007hfc34ec9yxgx9a8wm65yumckjvvfsxmi3u3zpfl1si9p9t5zwvjgo8qiwn5gfg55ap5su',
                flowInterfaceName: '59pq4q9l3spbolu1mpqf303vjdp9ljpmbfosnaclpdc90zsqyktjflju5ip093wvu5o4075p9s3ncjtyy6x47cshtp0yxfa2p8y0sg8rnxt0xthf8e9rxjxr05g8m343betb90ckov3tjotex08zemt5cdif7uu4',
                flowInterfaceNamespace: '61zyj4tmhuj4bsl1b3gyjvbk1ep8hcq4pev7yvgh22aggbxhd1v6msuu9a8cpedo5al1dayyk2cq44kqankhca9v84isyygg06hdisdrmmdone78nytwh96v7qnnmq8c32hd8m9wzd98idzl63dnku0ov6afrm7g',
                adapterType: 'sobgfdq7i3lzztngkefwrg0a696wr3dw3lt24x3zy1ui2qklafr4hxtstdpq',
                direction: 'SENDER',
                transportProtocol: 'em8fiutveqv2of5kjz2vd20jeyfiywbuswamvj4uzwh08nhq6vpa4yi9k0t1',
                messageProtocol: '3fkwhzdq3l8sq6ogs5mrimu57izpwgx3henozqof4bavsvrtwphbrdmlb783',
                adapterEngineName: '6y3j4hlz3su1te2krmpxmxq6req3y1oi7ex4i6std6f9cp53vn53hc3j4r3ueaeryqz4rot0m2qkrr30zn1cddeocsods6ttl8nutq9iyupioubqethbx7vgwo4tllsx93fk5bevweon491tglj0syy07pnttir6',
                url: 'pz78vnzakmbh2mcotned4xijc6oh471kqymxxcfma51lqygyxp63jbysxgo5u5j1yj080ejd5rsa265ltoqudgjkzqmu5qolozsmewwzutsj2m963zjed0tsd7h5qp1hy29v94ttl341liu2p4521l0xjkho3z5myzhbb4mqt8jr88zkyjd6xv5ho9o7ohu8jc3pudfqnjag63ufokh1u4isy5yyyd2qu5ran9mlugwm0v09mnyhslqui5fivexmkapn1n6b9bghihkvzarambzfe73z6oow9bza5vdh22bn0i0onp3bkpgye2x5mdsr',
                username: '43ama6r9fw3t2fz6cc93e7oyzr8a98hp2y7cyt7x715g8gpaui0rbxo3n6k8',
                remoteHost: '8bqkai782v7fqpkyd3f8ddve4hc1qs4iszvgyibd8z6751xw4a2zuukvvt5hzowkx49ffkr27kbqpbugefjn7zjd9y8tqytq3t3ujd0rq6epkjn4kxmqwg858nspxtkzkkh5vtxoe0w5xv2xt2w2bqgmb02wyt9c',
                remotePort: 5913289752,
                directory: 'ftg3sdgvcupqftqa8w5rzzbsxe9rgsrvl4dakb7hepfptryudm5moomuu5wjl94k41xdf9zdfymmklk0b9onzb0ekudcjk54ptq87eq3ome2g7l4w5pazg96h1690i4z9syuohokcesdbgnx934rm7gbr70lllac4zaldh2bvcmzlwb269z2mcryd6ntl65jft3zmbdn0wmbyph9pb470jvp0928ufvijo53ruddhii13oqy8e7mf3zbdhmfc66bimmytwnw13ijd1w0y1ghwpu9eag5cka0s2ktqodmuwyt9xzt1pq8ef83xfer8t5dlv47ltctovvskfupts50hvy4yzorsxrsi3ni02ua2n7uzl7xwsepsrk4epgvhl0jkim5nwer0914rjf3gtwl0nac9duly0x1q99qyila9l5ngq5yscbbv1i3d22km411i7pq3peo9ccnbk554n418n5694tfz8sz8jje6a885yuhtsnjze8w5pww6d6qwjtjilcaw1jp6eam1n7r9ytcnjyy63jel15gg7cprcy1trelxh00nyau92oxre20tijirpzbllxaqf78sva6nczylfz30zceatouihfybpfr4bc2yq2mqac52kaea79pboehe67n3b9ft3f6t196ovnac9z7esc0rek12r3fcx8pxbflo5m5oh2vvktv94fwexscfvqp61kbeg9rp8i2zhop4nlom856m6jnvu3hh45xd1cr3zl018j5q6i1gqdzco3nl3a6vwyv0bxzuxikg6cdsameaivr8l6dsyi1izkh6n4o1lao3ps8aqr7lk4a57rwi1ftebjrfai6ia6drpx7d9763z1fku8pflbc3kck3doy97t5sp89kvai59u6epgvucwf683qzc83b4oo2ukns5v38sn5pjleoi32pczbw08ospu0z0ux8byiyxgofipjlhldj92hhhav3fdpjcbqx5yjrktl1mjkjxz7n8yfkfmbrhemaofwqf6d0emu29sg',
                fileSchema: 'iinv9c4n5ztiio0jlyzat8nhag7oplglyyq6jlaxcamafh4yrdwkn24gaik9x0k3rebaalkis2in546o14dxx0xhg06g2xt0ecpmsajb2j8adpk056ix6gmvnce5woveslu54wws3drg5m3hxruufg3ffykxmrjvodnvrs4lilqrcmby3vff2t6mx4i6a68537xwik6ddswhqpmek1lx37b5dqdhj96ke8lc4kw5ng6xtm22mjiadhwhos07btp0hmqt5o33ocqzapehtqyil3zfiduxylmomuvmatwefqaz7jsjx10ahaz7gx30slhh7o4o5btuw0717fck3asu7q811c6n4r0mc6ubf92ikm11xofod89y5bq9gm5d4x70c5cgr9c4ayzydrt22f1nu3hv2ia3i7zsgwkha69zn3pnelvox1kia7q6hvyj6qb0knrtdn6dqxw4sj40n5e69kiefltmu2hex8npbqv9m3lpbcfzv4fuwlpba7c6d6fpfoflegyfdnbj3q94xfj0gge0culgvgwvucis89ym2jmkdvwrrh30gvpg3dea7j86akhrzcc42kvxcprvgtklajug3h36nq4og2ftysw87ngwdp6mqpm49qgg4fy54ik6caljj7okhadhp50daceqoqqfqmqvw7h4lss2ywxvtwo23ufferyrybqq2ht652u4ylvmjheeseitzo85n77sqm2a5m8hml883c70wt54i1c3aivil4xxefakyw0w92q5ycuiojw7bopv8176j659kuurslov8gx6jcdnrma3atug6515d19s5xfuzs0r5o4p3rb3fkmmlviom7n79bw7p1iey4gz2udx6gi0w07mmj1ghvm8ih963ec1j136dnrscuopaq6mcsv6plbct6a5g2wpcp96ine8uylhsbkvo1jp9mgniokhykt57fms3uiv1us0tj80gigt6i2tikux31ut8xzv3j7wmoxcc82md8x0s767oh1gknegl6dov4y4',
                proxyHost: 'cotfxa82o7pzy70ubwg5bsbad8b3574ve13cdtauijnu3rzt5gf06hxj5j7i',
                proxyPort: 7998964098,
                destination: '96m4gjxdd1wkyi89w8d9p03dqeouu57qce45sj316m6u3qsow1aao3m8tj7qqctw66bpcik0zn0pigtpr9x0czgwdavso9u6zksv2lc1ih6g5enf2wswjmpjuc684zncua36tp0z7d2ophxx3uur7m7303p27pre',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '66qvl0azkwtxfojuc06qqjnf2fc4av6ovn9u5vsdcvyddmjc8qrg68w1nfhgcfc2rn63cdthvksafer8jltxxd8rwqgx33moikvp7ve2gcrb1yvg6x9guuccylqs5gybjr0oheo5715jwp3mwyksiypavtwzl19l',
                responsibleUserAccountName: 'rm0jth46y1ktzu4psi2x',
                lastChangeUserAccount: 'x6ayj00s3uol2q0v461m',
                lastChangedAt: '2020-07-27 06:38:09',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'rpkm581vtm1mb1yy45dfhhapabim3ihpy99v4q6tkxd7bn1ym2',
                version: 'p41xr2e5s6dn0siqcyxh',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'zz41sfdl49nhp00n1j63g573lb1w4o0oyzgtyi8n9ya8m29k0ynb19wyy9wwwdknxd88ts1u9k79bx15e5vzal44d98urjyqplqn38dzvysbl4baaxcbmq5vrm2rrsdl0twvf2i97pdgm62bfz5cyvnzc436evwq',
                component: 'l3wx4gc1kg6blme83yezsewu9h74jwdt6qwzecabar3t23rko48iuamwain919aa6mh9jg5jw39mwxbvhuipo5bjvxxt4yxac9p8082pjowg1llil4u2dfephhll2e81mtsd9t5xbl2bue8flfp9f97x4hv67x0s',
                name: 'vo7gg26lorafmhiweg0yaobbpqpxqd4rmoux0jcxpaeljweiaeh9jxttc31m6vtz7d2rui95l5n9dbnmvn4ctd3m9i38fas0dc2zgs9oa1y9ux9bbr7evzpy9fyxbnyt06nf62nwftrhrobo8e7gxbjt7ehcxm2w',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                
                flowComponent: '7udd9rw5m9530lrtbf860f3malo3mvt0o44vt3yciblg0y0ik8gjqq3uasak9hxbn8rz8chr66bzcvsbfddjbhcpnn3t53dwd4z5rdkc3rrml42c9zwgmquclnp5hn9hhb6g4t8hrhgj1oi27fyfdry2nezmlgt8',
                flowInterfaceName: 'cy5t7wlmd94dpb8j6bs6xggugsmjmy6cw721ac2q3i4n01uoc6d3sf2ucijbsrksl424bufn2oqvad585smof49nczqxupp5vbdrmglco63lp2madpnaj3fomeejxvzcy8u8azxzgcsieuiv4x9gvlfdjo69kevj',
                flowInterfaceNamespace: 'r6ljtg6b3jmuuzvww6i1bhdggnh5wrxn2brsi2r7s3ahxen9b39ehotrwkjutggti4wjpx3oexgig9npfxxlhs45ykqtzt5wcdfiugwxuo48oemkanns7s572y56vryynga61mt56pn4ec4lves4mlra0ksiooh0',
                adapterType: 'rcbcsqrv2w7htkuyk97ozux0snix9sahgg7h9eolhsosd2r6jsk85hdh469n',
                direction: 'RECEIVER',
                transportProtocol: 'cmq4m3do5jd3g1zvkalj4pr0r3hcd85rtznowszihfid49e9qannwegjwkkh',
                messageProtocol: 'g15u2l7bj5r8ikgpp9ndey13h61h9hn3f6l6nkxd60ep424lpg74e1iozdhb',
                adapterEngineName: 'wvihazqppd3cj0wj87w1yrx2v37029a6qr276gklhtutth5qj17tmuwmveoj6zwnuewuf1qdpczq18vp24y9sruow566l222c5coq9v0hgajcue4vys3vr708g25sj15jdhepydgy4w80bej8edd9jq8cojkea5m',
                url: '9xmxwoof30jmxn4q07aiwnndyn4y96puxdv210ejfzvn0tr6iy1p3eho1io7vok4wjm0xeq6y2upj0j5lnrxuxwt0xh46i5ol4dvr53hdz4dwkhb2xpejqpqg8vsqv58fova6jkli78dzslkpdwvp1x1rvqyelmsy28igyci0t3kuq13yf5njo5kxbnj6op760vt0e24e44zkpm0zvag2sfj6q2a70o0ysevoak08f7feo6cb9qozbksujujciapoa7tcynpe2ghxa0c22w966wy2jwelzdo99b0l9fmn8ikdwpfnuzes9b5j35brssk',
                username: 'vpkoti4yvdktvkr8i3p9awby7nrpk12pt4j4naycypub1sru36r2d9spa5xa',
                remoteHost: 'kuz1g0t15ug1bw59edla1e3ihnhr86xb3mzm3mkv5f5j00xrybpzaf148w7eymzrdfro34v2xg022tgh2olz97l943eddtt3t06fytdmvrqmxy9szsscqb99xyaflz0g00szbafgaau9xzf9e1by5kehypq0mfy7',
                remotePort: 3740611882,
                directory: 'ovdfx50w8psdladtxx0tupvms3lx6qvu21y9b3mx9cqaopklrx8fwew09adbe482cdyddpa6jyhtmn3oz1ivpg58mkrxncwy50qd3a4tzusyr5ffo1hbrnl3a72lpjd36vjm0154gayn2y0w3pblnxbdw2d0kl92lrg1mqe1x0k1pm8tg52z5yz23sof0yeptem8wkvea57ukj6tsds4slcevlf57xz4rsp9p2a3qnkcqbactv4gou9k47je10s7q2f37l2b5q9gefe3ealo7mhxoxxyh431hmadwetp33i7tib63vc8slu0s2mcdfkl2axrfzlehig9ivqej4ldbhihv10f4nwg1prtonfkc1cx1fklr4t3jnq7azb4zb9nvunzm65yr6cp1eh5zvzc55yo1o1aexzvjq7n9erx44qh86pzxay056qx1meqo0uxoqc02uro1k46cqciaoii5f0doxq0fczqdeh93ev36uohc3fec4egmucs8kcc0obz8u6t62jxuj0r02lfgu68d8do931t69d6buq7g8poasc369ge0w7upc6ohs2mtoipxgpvht1ss5ob6b4wof0jc3aydhc0jtjezk3ygi4avhr316m83t3qf7dauj9n8kg5xys2ljgojulau2z6ae8klxh9p6zzshgh7ci36pldyf044rlzys4fj7wiyax7asv9om17zwjcfv0hl0z67hmj9g3xwd6farc7hhoxccood71kzh5eddioeghk2k0nl0gkc65s3mt59wdtcqnf7e116kbs2y7ufj0dppa8v2rlkqcq2xsuot1y7a5dpwkgru7r41r0dz2mu1e1x0wazyfih631hqt3lb8ixmybiean7bepedjy222ah3gv14pt7a60trnsffl8ox9nw00u7o2bl4lg0az6m3qiv8sjgpgsjrd7idynnghahdsupp5zy1mxdasof3un4tgunmz2qowqcm6f2c71c78gb2ggdnmjo8njx0lwrmatl1hs1reb77u8',
                fileSchema: 'mpypd9k4nq54kugsnqxvuzyu2c4pmvtsd97qt3qthip4fjrbbs2k82z7iof453m5na036lcyae442t3o9ejwpkrv12hfuqc2m87wjipqtpfh2s37pczc5fmj9jcnw2bzpx7wqrlsnysvr10r8yioytiewich51nb91v6dlsna1tlyyujriryr0tgczz81a4rbr7gc358hal1d4k3o76hc1o29qa76by1wxkbj3rst9y7ygduobf6bb2g8bz2avjk0ls9mni5yj363trpb047dw0c86oi3tkd6ji3swdmleiny2vlop8vb3p1w95jorqwgw191aaaex3zv9czm3j0hfy2fmo59x9wfpf1ygvsluyf9tch8bjyls8qxihl137jrns1b3karc6rq1vivi74429ogx2zt2gmipc574clr3v9rls2cgo7y9pl7urm4l2m8uklhybxzi7bzj8wjhtipzdwfcc50b38vlula7ub8jlao9sde7rssm0zxrke53d88pqaoc29mxlv4da0yvynkwh3najmuv3o3nl6wa7nnnm6be8c98a37onwjayr8irrxz60xv0m90w3t7cijjdcl5ou7mnq7pz83f8sgi9xe4xh644bi9nfs53or4wulcpf12yenlt6o7kj2cv4sjpwrqpplit1wt6nph8v9vkqj2k9a688xcl2y7gr0s7y9so34n2l4xfcadtormtcavdb53d2aohgfq0yiryfax34fwo5nojk0f93opx9jxj5tums0og7973d66epuyo2x1gf4zj9htta0ib6cj0rgn7j6swc7cq3jwuej5crwr564kxu8xsz9vnt1a7ai62si7y4woy9qid6fke1j4ntgdn3wcvdcfqb0xzrjmbbzed4wumui3p3swb7373lcw1h01zu50bxsgh2e226m3s253pege371gncnpqnpnxu0olb5zqwi6ofmityt5xqo2rur4al3t71r95ezt5lxssoma5zhsea6w3y21uts7solhqa25b8',
                proxyHost: 'gzionumfuywstuinlxnczhegn61r5q5pxkexic47n2n21811shitqgxmyinq',
                proxyPort: 3510515146,
                destination: 'wv7tsbsiwfc0vngbuldcoicjuj6fqhyqc5iys70gmkkkkbsa557n583pieaauwtg0yi8lh0pluedoewlperruljzdj8bz20vog5jpdhdyqivvmu3xfij5bi8j9s50dm8fl3gjw1g0j9s9tgsyy7glgimboq9ng58',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'jfmfddqqz232hszsl70nuveixmyt6nmhdv9pzak62w3gbfl26wl2akl8nf1uouriibwvtny1h2bbftx32eap73u19gzz4t285aozqkonyhgvlhi9grj22pox8pq0d5rdlxh693qr5uzlrvxg7n4y2t2nfcz4uoj6',
                responsibleUserAccountName: 'a91fv8iyyl0tt9hdrjfe',
                lastChangeUserAccount: '3sokl2haosjewyl784mo',
                lastChangedAt: '2020-07-27 06:18:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'ufip7a97vqxor574kf1mlgr1dox5q7koapwvnnnbiz9795aw1s',
                version: 'pbck4mczrczr7e3jl46l',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'qqtgh61q4k54p0x92tneh1hjnqtadl8krtpcgmp09evu6eyaoo4l12p7txzvgepbtv9owrunygapr456b73bkg77agua5v8lsg9mheys2ys45vpesmp00gbnq39npbgc05mrmfiu878m9ovcn5ibmhuipf473cmj',
                component: 'pr7552ccouqreetr8d6mstdsemkdrex0l8gexc24ppbum3v9sia4qvo0aipws4xojflltdk7vs4b6q6qqhf1bmkq6gbtinzi8qzdh7429jxeo7ayo8wisg2x1xfyao38aj783z774niz7aqmm0qpswe0y8yji9e1',
                name: 'r0if11wwe56ekysd1xxqd96p14u6j7n8yefsyqsf74x8pujexoldei6ywnr4r8188ra7aqhek5oqm88rwxvotzfue5zdijcmuzqe5eq0qf1smhsv7el21roc1t6g6k5mqlg49rzenn366cqtmmh54dn2tp8vibjv',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: '6bfnwhmds9dcfwz186m5w8lafm0uimymrr77rnx1an67kr9g7elhz5adfgq703x4su1f9c5ilhhh6grd3unybiabma6w1w9g6g2v46izlwi28gj9rgi0z0dv0lmr68j620p8rsx5u2lf91n4vbcksba9pbsc3256',
                flowComponent: null,
                flowInterfaceName: 'i042ow8cwq3fsd64x9givi3dpi31ear0zlf7dbgy5gxhqvqnh5l2mrdslmqrqkclyr6z1fdccj970u3mz3fee2ktd2o6wxd6ugum37pdg26t0nylwjrosxm9hb10u5qs3onopp0zsdiog8ysbehabtlmz9vsy4zw',
                flowInterfaceNamespace: 'ubv343y4v1mvr80as1kjgj9deamz1b5mbd2we69bv0qr5iyaiucv2sqof2nbit7r34kltilxcl7nfyfqvhbtotsv6e7kzjngl54hfd16e0j3gcgjz5phclm2rrx9e6o8tjzg63qhykklvbwar796qc9jw31ghey6',
                adapterType: 'anbqy3b4fru4xe35f4ga9spet4y5jt3j5j6tr6bgd6586xrn4ua9ykn0aw8f',
                direction: 'SENDER',
                transportProtocol: 'nbit8tkc331a8vqknr08kyq12k4x6eatza1rql0qkpfrjaohr2z1uki0emq9',
                messageProtocol: '9fa4ui7zzau6gjxjj7ux6mt5imk34m1urbndazfg69ckxd3ersqzv386tvdd',
                adapterEngineName: 'ydj1182jgir00jwqsx9qmvbhul7x48tyx1ii27790g4a6lmwx4n6yhsx0lyvorzhxdml3vnwi136wl88kkl69ayxdzsxycvywymt8foexywlt26vgkkbtizwzpjylqguhh88rwcjq8qwywxz86u34ye7lv2zkkwr',
                url: 'kp6eo2hq3qb6mqsjjg6ur9esszzvapmnhp99rozjnh4f0jcctwsbwiiwweez52uah5bgdjtpx5rusmdpbeou08rozmxhtevvoq3lnwb9yoqmst51xbmy4ps7h94ugxehc72n7w2kno3ihm8ofgntbu7e3y4cnacl3okcjl40qab04gj6vlpadt78rbz6hcukw2a17mner2csrr9tgn7wdrgy9eb9ub07oyrc0a9856v64c2tjvqir2uo1ucno41wd7hr7w3rt198irocd3z78zmd7zh9gzsjon3wojm2d5lewg94kfnow8lg2lx288b4',
                username: 'b6u60rdq1iztomkch9h3qrcn3hdqbywy80th6uhjru22bbcq437yiklh45y8',
                remoteHost: 'k5r8452lfgd0xw1pr32uyi4xlyz2scazy1a56eadild7kuc7ku8m24zalf7kj47df6loyj2wn9hihqkkvs71fxjuk3t3n9hro2aj3tnu23jwv2vrkqamjhg2xjgyjldsm2lbrpqkrmuaxfaabmysjhdq22ay740o',
                remotePort: 4875593149,
                directory: '9tbxm8knw19zinpxfmpc0fzkij6wna9h7sfcec4ellrl9v75d45m31egmsgsbnfm22qqrhbq99yjd2yuojybsvieotju7trn5ucqgmqv3cdy9refeetuagk7gf8mlqh6apsz7ledzs11odhy780vmqpgfc43dmqcw5p2yymya2tjv52dcjotu7p68jysy9t7zlrc80lq1981qgzkye0ebdgvldycg15frp2skjbwu9av2gxkv4zd11tyohzlaasz6zgflcgdu9f0mz3vwjvi51hn0lsuxtldfwvbev7i9h2ojutwsu9ce588i9rdiaulr2w7v4te959u63rrf4qk4njx05j2fa859terwja22j509i6h5p4a2fejn1fp9ifx92eyn3rdl033yekenllb642ptl2sgayy5i880tk5ig5f36ji3l9h40aex9epnagtgzm8wrj2mdnp8l80z1b25szx547vq6osrpqxo2xuwciwdf2enxdvjel2z9s09j7neffemptremrrgfkktkojffz8qehdeh7m7is6u9hyobnajfozdytaygnryb9z2zyk920phndcvb7n712s7w6l2l6gpvi4mictvtvmohhwiwxt503s1psgte5pgm22dj8okzg4hjngnqnlii8sesc8wg63zga6g0h7fdmiqmubj0nfjeizow3grz64736vq2r4uwre79rwjq2zj2xqwzq0y5ume7pp675x4k9j7u2y15lwus2hvheqfktihmfg4tsx4tv7shqatpt5dr0k8pvas9e3qvuuxv5l35vr8r0nr7hgvjdi84txy8iz67kdh2k3zqu0tkh7sghcduxzlguj3jhgw67awtjujd7yr97sdqiloxcufue8qvrlstveetqkubpx4q1dun73s1zn3yk52tk9pu9e4jep8avrw4ai5wqvjppv1z09ao1go87ruarz8s0m6thwdnvujfrk2javarwe48jhyc9wp8k235a6cmcoq3hp6rwakzba50rn4570',
                fileSchema: 'w7ys9kl48ou100pltkl9fyjnbgw7rmtv7pzcgo8at2nm368cpa9oausge3spjkwki58bfac31c9gqll1a3ftn6v3ywxfin6bgjsu82f7nm9kk4o35hrr4ohi0lss4zp9lr0wxp5s0813zioxov8u2m1utx11i0rhay7rpijcpqytdzqj9lx2jqup260yv3gzukbylbiq8dmnymsd3apet8f2vugizudwluuoe9xn581a6o3lna79yzbvxgngi6a637ye3g5el6fdh0lqw7yo7824mxqowyl8b8zwfi3zmct5yiqc6eufpsl51nkci7w70fs1zvmchnc65xjmgx4p2huugmeb0qi8zr0bv6p7dwhy6ne6097gtrpjifzi10ok7pmqf5eykciyr66j7um7wpaxsa4go5qavhnu5q6cnag6mmhi21zt1f6a1yw4234360e4mcckz570y2mirkp7e0a4av6py7bz6r2wc032b6f9mnt8vqct7s6bdrygl07pe0jw3ofh28t1rvyxg0u0s3szuewbvbm9idd9pfffyxrwsjdekxyn99gg4bdczmvy5lcshaj98wpfr5z04m3g12tei5p9fvjdbghqz137z6kq8p1o4ia61ptzxzguw0ut79qgd0c2ca3i477rtx8f67u1833qvogikvqhrhu8mawezuv5il3qf8b0y8dor13sjp81sqqpwdhut5thlgychkw9fy6c96kub1ey0slpzlpvtbhof5en4eugeq2ejr1m4ospmcw6taneo16h0xut2loi7a2c2tcc8w58w4eghpr8cd0r8rb1p6tuguzjisc2gqs8dgfhwb6gykr65hrcstu3t8b5eixuy9axrzdztc9lahom8w9y7i9yhjf64pal8z20634qy0lumnc8kyond3t2hrlremijxz4hcvvp8vmrhiispr41doqxgxb3e87mqd7i9obazmfjheekxrhndng1t2irptwf834dhu3ttr0ou3rjn09d98dvl2zkp6dv',
                proxyHost: '4zupxb3t4rwk5ekdmuyuy8d01fdf5eq48ken86233h2mw34m9ls60566fatu',
                proxyPort: 8180608633,
                destination: 'nt78llbyqzw40trwcv6gjw5qnb54qihoihq3yjtexg528ptc3vim84uwfktn0ayqq3xzmat8z1s7d6k3af5tmb5id9ydal18p1wl623g9y8zrggzga1f1wpdc8jjap7feg96jwxh4z77qzrmt1p1p9vl7zj68j22',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'm984w32yd6120ogvn7bb3q5du6a6qolq4zovm6mrakhc5og0mikven2qfnop1tbslomaldtq5wb0stuwk67uaxrsvmxpwg6nhdwwong0llr2ua3mh66boco1jr5eezkxp190csrryjnzb0naf36isagekf5t6c7h',
                responsibleUserAccountName: 'rckkd0fhnj7rj7t3viso',
                lastChangeUserAccount: '8n6lm0bnldujuhm3ahm4',
                lastChangedAt: '2020-07-27 10:42:49',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'l1woylnc7uhc991a6sjweie6ih8shlq1snmm57g5109orulux5',
                version: '9agcqvwmts6jh023hlwj',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: '5hdnwtmfzbjcc3ay5ivy5hbvuf5s7dstyln1e55u4dnxb022ds9f8ge04fmahbvlbnszsv18tacgpj0quhgck639et4ymvkhjmufumk7nngyxkkob2yblxdpue14lx5655v6d1gzn4zuq1fzm4nfw94b7lrsfd1t',
                component: 'wuuf8algiyks8celxtv57tqg8iynifce62m7t4fv8q2ocwn5eobo1vu6actcksyrl3cnietlnf89tprpomemcptdlokcl20j9jrxrc329mq5ekyhzyqacrpymp9wvcnvvduln40sw2kb1oqdkhegppt153lfamg9',
                name: 'xuqm1dvazahpukyapq76zuu5i0jfy2191yytc8uvihgivtvpxe2bqp0uu5dph9jtakg187s032p3gg1wgt0cld3g70wvuoq7h9ykz5cgzitf95upm9ggh3q3h6qyzaiuyanv8et8nudjigdedp9azcx16bpb5v08',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'xkka4ptrcj6oxh7t6hsjbld2xy12qhao1mtqs721mnfsq95z32x9dqiiivy6seoiugvb4yilu7j96cumiq4va27g82jjlcwmidz5hu4mubsjwgby2yd55giz7lxdt06ddz3g8yztqtcdjjrrait8rpe7apwha468',
                
                flowInterfaceName: 'us6uow5ujgjrsj2qu8v9q4squ9vlhclvptg8n9vul6hth8gliwwpdujulp8sd5nc5sbroxh5wpdjo6yx8vi4o1i8zk3lq5z25x3yq6forpne06bpyonuu97yn337pfub5hqqxqt0r5xgiglpxnhu1o3ulamsgon8',
                flowInterfaceNamespace: 'w9ziap6xk3f3iru09v5pi5owc19fo2jotf7hs0vcvfp0y3mcculf45eqeiwwul3pbxm3xemaqcl6njo33oa0s1tmlw4jua9yshzyqvm24uc52ah35p1ahfh4a9vsfikj2lpabaj1embe3y5elyrdxrhedbrp5ulf',
                adapterType: 'nu9rjm95r2f6lqsem93xl49iy4msgel1dbgi7cmip8r5yetyzbr0rxrzytu6',
                direction: 'RECEIVER',
                transportProtocol: 'zbcy0vbt81jxs9ef2gw7vu24yujjv4eudnho9bb1ct5007os2tgrp627n88a',
                messageProtocol: 'n0656qqd6ndabmxlv6c6h28pdso1xwqlfqzdg5ce5yr3zw33uu9dzde1gvia',
                adapterEngineName: '5di3a345a47l6iz3qar4dpufzxl1qb8ees7wwyd6bb0utfgr06mvhg0eehynyvjbtqvaixs93wiprn8xh1m2ga061d03pvz7polj5qnbfvg28pni09xlpbf2l9tc5nh3c4de7hvsmqexxfm9p1wnddh8qx29rcjc',
                url: 'egah75rybk12vrvcjtqx6wn2t5ok273xitudfb1ra5ldt8oytp93rejiesk8gurayi8o2ehdr7f4dd2uk949gtqv90ixkgvl265ws61ql13rz8uks696culn6qlvzrs00ok7jbc8cayytu53tlhkmj9sulk4tboat86beakxpb7t4wypkh1wgxjd6gutdk315d73ecfdqu96a3nvuab4p4vf1l50bdbx5ob2ha359th38tus2317sm76nvat4we06n2sxv3mggw70zsywdbzu6xr1si72pbn3c9ma2vmkljgjxfjagexgczxuuhaqvx2',
                username: '1cd7ovjbdsm6l1fw089p4mat1s7eaj64064dryjfjda889powbwxw9oumctu',
                remoteHost: 'bef64nh8ptgq954pxd5ie5do4hbe5e9vvkoq85qcuxf5l7k62ure1ypgl0pmazgnd7escjhpr5861655ht822999wfkgmfa2felmkq0q81t6l0cr5nao6l1sqawdn07xrgo9pfr6woy34ynpbog5u4n98cglg6tk',
                remotePort: 1520698825,
                directory: '5ho02rrgzvvww492vax5xc80dibu6xb2vdf1kft47zqhhlaoozxcxt78jdz6l6lsxtnozvp3g9qd5yunly0asyx5ngpj2j87zjv0ma8j1w6e7t42lkstawql08o6j3xirq5xul132uydjdbog1ty33wxfl6p4xxlqa3etzvxi63zxevnro8xc0ptn63dyqaii4v659y4n7op3ll5jl81ciuu8bz30d6rt3q9klbr7ne76zvrsyfkf59l1tubc5xccimb3dxnn1w9q393h4qkxf8oixfew7n70zvfg9q34ow6vkbe4jwkl3i0y70rt1icon0hz50dun16uua4h24l90mqhlquc2lxn6p4c34rgdy7ot1zoaqz9qb66oyru1lbytgax4urvkos4fmmalsp48oowk26ib0qukbinxm57oz1wsqgddmfktmfiq51w38cn9vrk2lamro45ul6iuksmgvfogsubtxi0k22zyoor4ldsk91pbtq8uilg7h8266nsdanvgw6fda49jmilmzkvzqgv3tse3h9rqhjw7koeiua1sdx174erkm3bm35etpdfp6av72p9unsafznymuyraaszmsia577sma2epah9tnq3ou0a9a0at0wu3is6jmrjgor0wsfz05g9xgv1lrt0vkpsgq1pq5zol1gd9j1yemwhxvoy0sp00xqwdvphdj28105vk5v1lyup89b11x64qm3ts3u5b0hs8jt4f9mo77ql5wdxrgea96jdnhxxvgc6n6f8gq6qr2aobhbqh9plamf8xwssmgdc6djhncpdvrg4q5rk1b8cphwxnefc8dtjqytn7njw5w0ldf05yok0fhiwmqjwzfjdunv2dsacbprk249pgb0dykg2r74088r8i3y13yuxxlmw8vwcsg5ate3fsebv13zuwuc80ic5vreb0pst02jxsd0603n6ki5dr0fv186ku09jf8oimc18s2m5vcc12tl0v92yftw8kzdud5cq3iurphb7h1gv1fy',
                fileSchema: 'l0hbxid9xx5we21zhtafb8d3zle5r3yc45yoo78g27zaa921qbe3b8wz7rxh0ifp1vgkgbwy455jq00pxb7lrfeeguvt2axq1yug35zdf4b5de4syyj3bq7awil6vwkmprsi6n4b69wvehxm4jexluc4yrn0ilvn7g8gbqotmqu7m0sjt24ab955zzn12vssk5cl7wpcsbd5cgpgcdibww3im7c9fpu2r45btqjcfmbzohlsenqh5n9e2pjqz1l5sn9w3qbajhx07adhwhkljw23emq10yv5s9ndekp5ybalq89o5mf7c1jnk1lt5ztqosuw3gszy98irvr70v15g2ql6r8hbivkk1aklwocoko2vts3ghkoxdd5634dce604wj4wbkduzibs3oboygrv7omha7dww0bfl21tba9ny4c37fu17nhmz9ihhn476dfd4t1w0vqwqi2s4a8u6qkyvup0zip51st46m9tx4c6fmywmkllq2rtbjqmic52l5it108i1m1xwim6c3la813f6als74ulbbz6dilzljq6w5r37abn1y07jy216gmvznt1fo27f7ixgjv3z1cj6hrlkpwu974m63oeydag0bx5m5dt33yls75mrdmp3g2ugt82e23m6oc8y415oqm6deo97239p88mx8bg340n50qm8xis1ybqyaccm5ycc22e794rn896ct1sg8tgb9lnngnybuvcp1x5xuanciikq589we9jj8xgwiti2tk7b3ca6obv00xecqoyhqdd3d7j0z6dh091s4lu788t8t71yvqp20jtnf73w4059b7aa744oepw6otuz0xaiz1tahchtufm7qyrkxps4ynzze45vr1dg1es1au0hhubpntfz7ufouico4noplpfpeki4vylqz4aej1v2238r29a3u48y2de4xqowjykciuyn90dp60opjuvfioy0gm86b9g363me20vbk4f6l1jl6vi5xvg7qxa10b2o8ojlrpmditufjszz8b',
                proxyHost: 'bb2hwd56jn7lrk41gfahs1p21vc33ixwddg5ymw93ru98vatfg8twnncj0ul',
                proxyPort: 6885763808,
                destination: 'ux62qpko1jmyeuj1a2spik93j0dowt7p9cqwpcilrrkyflatlluo5b8xnyafc63g6j8boax4k05dni4ki5sy9i8lvb7k8nby9830zo909qtyq1n3av0dznil6madjum42emulxtx2vuaf88ee67b25bxb5loc4v1',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'xyqi622vjosew2m4usi0focj1ot2wwbcqtsieg18bnz3jv78c0f3a2l6c2jwflwpn0fd5bi92v86st1izstiqt6s02tbkykyjbnabujks0zrzmfdiqa2uamw3re1wem5hp4sp0swqpyikp1f438x8klx63b71bdf',
                responsibleUserAccountName: 'c9zhwsog3qwvd8lppv3a',
                lastChangeUserAccount: 'vlh2cfeqqfieyi17qc2c',
                lastChangedAt: '2020-07-27 05:00:50',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'q1bz3rn7lav9tbyj717nj5jcp5vqp8n9y5dgt702vsj3hla30i',
                version: 'fes77bbylvhgnw1ruxfs',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'n9pgmjr3zvdy38y69allh313rr8dgprlhw8n16qxl99f9g3vhyk0cvnde5h336psr8bt7yw30kik6imaykoim9vslnl8kc6mpzndub6zcyzhuk47v5c47z2uyuz13mel4khbv7ozx3j1lnn1tb9hkxk0mtmr6u6z',
                component: 'emsmzfhrzpmu2kfmezin5l0zal4twhcgtci0k4eqe07jlw59fwku1rrzd30r4obt61nrllateikwy7beqylu6cm9cu8g7oddk50kt7qdzi77d9llsgg2zju77xl3qua1yhuqxup5xjqay3zoc859ry4nbf77evgu',
                name: '22bvkdxnb6ag2lmjchkdv46mlf3udeznmox51c8rz4e8b4z6fy2idy21alcdo15fd308z58m97c4bpyau8dqmb0ba0c5xim3hdr9nrdc1v5me4uayc3t9q6v8nw1quldrarpry1n7n2x56ic2q76iipw71k9ojz3',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'z81xxfm46vuaf64l8xyus23vdf09cezculeapryjcinufh73hxrdbsrp1rw3eje81kr3qvx9b7skhums5tjphmnet5n8qbemtk6nbky1d8k2t1vuffcd2of71a2kmgicy146dpkhy69yi6caifot7dn8gzdlif4t',
                flowComponent: '9xhox743vl01qie0qlc18t5671sfajns3nizvg4famtixdgssbfskenykbvbkdwsl5e96bcq7vqatbf00zzw33iia2nefa34jgbemwygnmwdeeqmpegaarbp00t1vvxwodvz87d5ekb7stbe3unwc1cl7cd2zy0f',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'me4928osh57wjdj54i99bu4hd53or0me1zvgrg2raz3qdhb8xmcfpha6daru4t6zdlrt5tsjx2y0k5kb31wqsl8pe6lbuzd4387tz7kvt9ivv77vahpdigi3u06zrrb3h2d60tfkqr9oeiir2ni4r7n02dm5312x',
                adapterType: '7ci38xcxwqproo434yzoze7mkigbj4fkhyj9xrg668wxrsu3m0h0sk4ej014',
                direction: 'SENDER',
                transportProtocol: 'wrv1ib6ltzaspl012y4sbbsmw94ejpg633ghbt8473n1980lyheh3lb4950v',
                messageProtocol: 'z0mv26z3fkac8309h77n7h2gzve2cp8psv6kwc6o0nzlwo9e0gex2wmh3uvw',
                adapterEngineName: 'u8o7j49o4nt71inqeww71wtrh3gkb8ymm28d88b9qwgr885d0tzuh2c1jlheigesh34gakfbmknw5yo2q84pihjmiwevqg82cvoh41tz2e07sqvvopjdu3uhayllc8l8s3rnqstp4qlcnvpeqtp0njw1g3j8o8zu',
                url: '2cpx3qz2enueqyw41hbbrnz7hywjqqnb2qwpbduevwjfioq1ne7f4iv5zjqgonu4qy3ktf3xgn1bp75s6978unvejzkihiv3bcjnra4bey9b98gpc3wmuaf60vgcf47dom0e6puxb5er949k5f8caabduasbw7mevf4jczl9jddvk2jqnu1ncekbujzdkumyy4wvwxm9nu1wdm2x30r9n8p5tp7vy8m6lrgx1wjgqdx2xcavl8mcblb8k7juqfx21zjdf676lfcu428mbzrm0w3plmog4xp70vduf9uv79ytrl34rypk5iggq6oxvoqq',
                username: 'zluo4fesmsmjaao5fot235d2kdd9j1pjwn6rxzney927mdee1x8o5h0qnho7',
                remoteHost: '5yqwgvxyyth51yzl82m17t6c04i4wsko52xsl2lcjxv1j0o4irwsh323dqaab7qtnn8o04wgi1v9u9fg9w2fbglk2aqnvv0vgx6llj1jehocbuopl76f9ghf0xmcvuc5m7cd8d1anpykg0jw9xjsehrc0vs3qvfz',
                remotePort: 2651519647,
                directory: 'ibyc9pdqmd72vnloedhx959sirrnklpnbpn2yart2p4sxy4ercxm1nfjr2542eyw3pibj3058zms9ix0jy5sol3u4wmrt6zpe7qespjtw6m7ibjabx6cpf02i9beimhtez76qcz7f1th4s5vk53io2boci69kf6ma1cm3qt2kqw9rh2ofbgf025hw7jhyisow9nuhhyb7oq7c0ev28hay0bipkz4o9560fvo88r6s9pi3d9kmbxql637s3y347wcj1aajmea5u4a11rl5xhtlill2c0xtkghpq1i3c8ujsms4ykpzceewxhdfuf9754jks3kuc0nl7ltvrkqajgkgly4vm298qc4cscges1h8q76maos1hdhl7dnk27yn6r6kufpqkidyt2moknaz9gvj47i4ccy5mx57iekhrzsbjwc7lzb1j4fslti8y2me3ixkb192aq2n17jirpwzhqu34lkjoue0x4x61ktjfkli0np61avydnmqh1xp2dvhg1vnffkdr1ey6n07mlftuxu8x4bm3zpyyn4f5t61xxqq041p0dpeyj49vnwiouh0fihc21xel1kiid95waqfdahpjs2q63p4fkoimokn4nlr4mvpiypdsvh56uthq6q4i8ougchwf6dg4l2fiq0ewycf2c12odtw1guimgqgx773oivobln54plh9hhrn3ixqvplxa9ysq12sgxsi2yly4pao5om0w9g3yslz6coylhdo10sw6n7vfs94fusc640vxz6rt59h2krhiieye65yowmnfqn80qjod59spumezeyyvnmrsqym1szefypq3qop47hf952wgjq1czzo7zoi0tw10sp2ytek5cgex49bxde1lv42aei5g2ndztsgdwfc79g3sir58cnjiellupv5u82ia7ujc654mr4a4o3swgh0ha6qw9l84vdxfz96wgqg5gugkzwodqmfrpdqyzygb2ncv584ydxmxtovb0llmrw60thjiggrpjcvsov3ckjjxx',
                fileSchema: 'cstorem9n6x0p8ltunbupykz823k8arbzfim5jp54bzd8v1dojsbrybfdu8d611v85kmlymmv5ezaguwmy2mimitxwyei2krliryfav9v4qvrtb1jidlvvmjyrytgvgwe495f42fuo30j75bjn76nq1lkh3tp7kkfm3mfwk5a3t8e8kudp3pbw3b44ihddgca5ybfj1jx6jmepq0cc3k85slb60sh00xqi6xvq28wp4ej5e5dekcfupm3eip9borwf6uiv8t2kb7x95da3h4bummw7t5cx87k37kfjaywmt6a9ycq419hd3qh09vdmnvpv9hvtbp9g94dpnirfsviye02x44abvn0kaj3clxyajfcsr22gmuccsgl6utk2oqsbqbynp84qbljgel3ttziwwvb4p0vrluebihb4zp0jssw4fzrty5cmrhktvldlehnkg4vjwstaw072wx0eqrcs6zyey0skg8pdymu97m4ai33baf30rom3nlsq0y70p29wafwaae7zvg67zq0crcmeieavkqui416lo1l1ea5a2yqc3jcha5oish11nmvf253qqckrakn2wshwrelkncve39ylbutjgr1rx5hvrrqr9ake019uqo4vydbvg35n6qv10wv9ugtmlo9sfx7vwciae9tc48s96klt8vl4jjbwelekelwbeqgyl7ncelv7jr1ojawdenarp09th219h494yqd6v1py8ow5nq6vcagoiaj8b08vixhp30sbagx0ofqd8eggx29ek1ir65yljwjofuk0lz4bj2c4rc61r0lvt0263t54ligxb39af4rnw86ke0f2fh1qnexmn713cp3ldb1rnwzufv875gk9rwjnozkrnadavqnzwtz98subyznicg2q9jom6a7hgn0dsnzvlo3ja6tcd4rw52d1e2ma4ruk6eqn9qi4ugvs2may1jx6bko2whars6nrotljpguohuvl6ric8ffdb333kkahe1dqu9c098jn2corejvxf0',
                proxyHost: 'bcxggk1vvzjedknbfbjp5nfrlntmgq3n8wtgjjte46pt6pv24dovsgjjc1rm',
                proxyPort: 9396450898,
                destination: '2f2r8urf44tlhl4gewdd3bb1bkcpfiru3iabh8blf0drt9vsy7alugyvpkgkx9pws8d5uatnow6vhvd1mhusnu8v96dfthl8bx8x4pc48rs5cot8h09q3vx88cqi0fjs73dd7m75twgekrljakqc7rmuq937c9lt',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'qlbjfsb7wv0t0cw3lyo6phbmb2mv84h229r595us7onizqetn9xmlk9knh83uxi38ar09jjmvg3e5on6q13496hs0xsfhweuhsr4iqiy0o2veamrmh69l8l0ymlwp4o5lcdtzyl3txu9w5voqwxqryu6je7fv4e9',
                responsibleUserAccountName: 'dug26aqwmfaochkzseb4',
                lastChangeUserAccount: 'dwumtz2eri511r8ue3g7',
                lastChangedAt: '2020-07-26 21:16:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'f0itckarmlsotwmda8tx09v6h8fz4dtmqxx1nk5k5jmgqbmfqa',
                version: '1x0xsbesbjtktv1czvyg',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'tvmqqp7z5qtys6wzkphsk8q5isw58wc0p7nk77lyg3dz6s7q2d4qguar53rat48kzlkuyfr3iwke9e7a9538492wgle9jqoop2i3y9scqp3vl3z96xnbig08ivuos8urnru6wqi9r8nsbbkdlzu7dpjst1qx2fqp',
                component: 'oe2fniwgxusncsdpmcl4r6l4j39h6w0hoezqdt06d9qkxtm1wgkps8zr24gawoaq2amddwkqzcvdjmfpbal3sa3t6ifksacd9rl8wz0au2o0syqqhxr66tlvs7ubjoh8wsiqg6i5dqescv3vk9lfabdsuujwhb89',
                name: 'h74yquvh6emb3zqdne34chq074fyovkhwm3gw5hmsexhs7zvigoexzinzvdmio8vlk16xz6bj4pf86kc0etn49f67w2d3xdxjsj40ggvf40j14uv2gcz7miwa9i26dw75v3gc8nydask6t8gvw0y76duuy6hgfpd',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: '6frrcouyebprx74kvcchfb7wk047qmt4nwudkcetg03crnvjghkp693hn1w0v9dek1lh17paqxzd48aph58kug119f125v1bacmtaaj42ug0kaoy38gifooyfu3yl8mljeshyjm3ypb7tmqan0r43kke92henq18',
                flowComponent: 'hl6s3kpma66mc7ostsvrtu4opuscpr6s0qbaqy15h7suj677hz4d86vi9ss5ipr9cdzwzr8p7tmlwpdq44z1qw4keswky4qo3973pbjadahwiaccne9o0mvg60fw6bhvmxm7oyag0xn8vje5b1f1umnozkirel7k',
                
                flowInterfaceNamespace: '20btpawquvx0fm820tbl4ws0ahhbapo344n8v737z4uk5gyvkddkodt7qgkq52uwttzws235liqa90wsgquy1906p2s1imfuxdewa6o8v24ddmnqelqg424x8aec6wch9ykqcosphllnv94uurf0ywldpf26louc',
                adapterType: 'npowtt5dsj569r0ey2gs52dy80wb9bcvahofv285hk3ivwvgf2s1znybtkf5',
                direction: 'SENDER',
                transportProtocol: '8wji562jbqrd1s388h4kpvvviocm3adimc9q0culnnszfufurxs6lk6vgo6b',
                messageProtocol: 'stnbucz4f1v22ah1whza6in0e5fpumyyrxxktpk0j7ut29i2ptm7d88z8mz0',
                adapterEngineName: 'ikm52nl3tggczq53jhz36fek4791v2lge55ujn04lk0qvsojsti0djt7w1qo8000nxjb0v83qb6194tgxgiswg6j71jjp1jyv0g7qelfk7yz8ehnfxu0afudkmaa9pf9t5hlewz81uosro052lueh18vq947ojdj',
                url: '44kknh6zo974gnuicx32xzztz0rxn2joz85au6ouei8uybwr9c2kbf0op1fmq47hbke1bdkootdnixhkoliw4up04hqtqpldcbwhc0o1f9932pvy0dwjyysq3bzjhl1kousqkd8xm6o1goprqzlsul7hgno41ue8htxtrxqr16hs8em7107letzy45gzro7tqtkbe48qepjlo39mny7kju24kn7gltomqpoeais6imefdv9p42nuegz1c9vlmbr0qtmkj427njjgwh0h9ih264khawmnuxz0101fymsmwgy1308jrr0vbwsnwyx946n8',
                username: '90o5expsl1rahykolaaw8dwecprbedah2x7ycvef0zm7yrlc2622gpspuwho',
                remoteHost: 'hhoazh6wbowc2ikxhveay4cnpoaazc81nd7ubeiizbvcvmmmnslj0g4emcsqszq4e0jdc04w18sppcopsij2ynv4k0haqqfjf9unhm7x7oyu2hjfm8fudxre2lrdykwyjxwv0qsmre9x9rfnpqi73p6h6lj8hid0',
                remotePort: 3564013536,
                directory: 'hmfee9wcn52spnazp8swrcdfqty80i77mg91oh9b5jj66junvhe6pluxie90fkx055nur89jgkeprlg37gqy7ztf3rfh491i2nk5jjhiqscqxg7z7drdy0b7ri30gw3g0ueom7gtgj9c673q3u38dwhr7vacjmkig0710ylfcx00yr83umpf9b649qu5s34ecadbbju1wh8eae1aj53pbpl5ppc0gtp4es2t9utopoi84yoatdsdlyc9qbxhw40kv8gq4xvpa6yc2jub6zi67txb0ysh34q191l9nhlo60grfqtqwyi7n6cekeqtmap9991td29jyr5saf15ea13x6brn8u7x4kz10mpvtlm6txafdklp5s8hg40gh2vqaipyjgjltxvacjyr3ena5le50oynwx0igjwyanrfz0kx1y60mwro19rvzsvoigqyi2hn1i2rq6js54xdleo28ybz9lkiei8sirxqhamxp96fw9yd74gsie7kjjxu8kmrr7u17ilh7ocngaj4qs0m42qjapep65zu8j0h2twyv9s5awc2682u4lnbsy07u723pj5waooeycyaj27m42fvvgem9rylzizu0tg2gk18n4bjyge7qryrnl7q2zqoxecnlt7sx4vfq2fa9jldevo2ypcjw5jx651dhvkvc4nw3mui6z3getk1dppcvzzdti5oja4ecbocjt38jxtf9ec4f3182hq6oee6aickh41ale5os1gx5m8xiy9gluf1r4o32m4a1km1jvcm63upy5nvqhxepyj55nxb0ua7ma4m6ysh2byc5dngaodbai2qketehk6j4fa1sq5ac0919zv5mq54mpv39wwavan3kyxvl7mzjlfsvoqzum8ufsp601xq63nrucg906entfmgzttcbqbjvu8katmt5zwr00h6ek3nrlkf42jxe82pr5uze5uq2pw9gsihqqvgb156zzyu6gmf5r7219dtts9tx3am94y6exur96z70uih6bttde89kow',
                fileSchema: 'qrc3vf4vpoime7iaveqwstr3gb225j3b4yzl7nlnwmyggwemgqpd0eka12tt12f3ky3jn39xk569ttes7f1w1t24jxx4aitm5jckcug61eab0fvkfqgjqsb0rn6049s0vwkhw8orn5i2vginx83h7nxmt9u5d6xri1oizv0wbltohcvc25hjl86kbswcbbmzvmkh18qcj7bk54aq1v882tkobbk4pq18bq3td8i1xke6awiwyp6beeqq5qwgvdq8ckpxc7lgncpsyrvn4mqxzqq8ttp832b3jb3m3buudgnd2ei8z63pnway9uh1ot278pxnu07p8q10azm00cpf4480sf9nw4zbeb045qluyjhksiql3rtw5ithdkfxt1yow20t8h08xv0c5xgkb0lo5u419z9rmp0wue2vfae1uc73kvw032ayiqx7fifz3ipoy9nbuodsce1w0v6nn3xhod9th9jr0ntr71501ajb429p00kqiyf4nuqc3i1y2iaqvlrhwtnnh6t6cjmmdpwo66wc6xgsgplipdau6jl7e5kao9asoqjy8v7k54ppm1ih2pzizqgp81xxiound6d0xt68xsx5a9e0j4z8q46gnym1i5oqxyza3jg4l7o89ass0qac9m3m0fy53ytr83ec5lrjunz7dq6404c6c96632a35fxf1qzok6fwracuywyhsfmoq03pee3fxghftt5xb445fbcjd6j443yrmi1fo8nwpz3i9m6z6oqtxq9i4llwmyd5z7cren24y2qj2yy0h9357xf20wzvgonhy79zylp3nb6ydt2149n05r9v1nk9q4guefc93luseaovjtze35yyzzrinludrpohu90vr7s5vakjvexmsur1pqxb2asxjc49p9xr9ruage7p2r9kn0f2a2f30y66gc5mvwzoxnf7ywpmjyoiutz7haew471m94ymfhddim094fsj6s39gxkevy9ljv34ektv026g1mi925blanr9et2t4hlx9uoz',
                proxyHost: 'yfpf5euauahquewq4wb322t3lqzt0o9oll1p6c5theq0lsarti3dt3o853q9',
                proxyPort: 8428613297,
                destination: 'jfm35bdv48uf0yy2ikzxxtymurr44hfm9gj83n6e56uxnx0p4u6quzop6y30sf2si182ilskliwn51gkfrsq5uutvgy3vbtco20yemp8o0doivyoj6od7n7rt4uj93t4lqn047qjt7kqrnz8ibbqfmnr6cfn5vue',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '3h3e78p5xvlf4bht4rpb8yj72ritr89k3dr7nqxo86yff1kosxeji201kx54is5iihm3u9559w7zlyxmodkw29o52rvnfx1y1tbjmiehxu18mov8nbqm26utlao4gxaziql63qk2n7h7gyvjaa2ncdzq4771b7ct',
                responsibleUserAccountName: 'juw9ey2l1zrtwh08uc7d',
                lastChangeUserAccount: '2osih4zc8dbazs8y4rn3',
                lastChangedAt: '2020-07-27 05:03:28',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'm63wks914nnt3azk9uy9nz14w719qyh23x92cfu1vk06ccbquo',
                version: '7eodbov22hbji43apsf4',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: '9ton2a0etigpogqbolvwo038mkuluuy8ljds8ubhe7e4khn8hup6atug67r9154vyo4jsxekcxtpz70rgi5h2yurdaibph50wh3ii0h9rm94tg0kbbrnik27v1pmhg4tmw5wdgwefwc3ca36lwveapq71o7116bt',
                component: 'mvzixzorrl0o8ob446jp46ick5kqo3ceuyxlypbhdpefpo6ut03d2jpwgqds2sbo9ug2o0v682yaoxnjc77v4gglmakfl1xd2sq13ghngvpztq6nqaiorbj97poodmxogie0bwapyqamhvw34xnhmggczhh9wjuk',
                name: '7e1jnam3ghcsiu2v00g0sxz82ribhz7bc054m3iw775vb3c5wx6eazd9oha0ptdzk5b24n952fvoajw2uarn4dac4pkw9zldpa60uiw8en2ex5fi65yeud4kk9idg4q5og79m35iczkmmdkc11ljc26het7mizq6',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'gfxvgqyh77zdgm8fq7rif5rk0vayiuqzbxepplq9o1xueoo0i5h5gabr84hgjxrlsvgijgr0tnttqjzssqtbr1nx3xzg4boguzc8tk1nprs9wx00yhtsz5vkw55qt4wzzwzvbuijr91cy8i49o4xdictwetx4kev',
                flowComponent: 'nb6upbxguc46jhn8ur7szdtng495fmgkrn823cby256f0fet8d8t9x9pvqzx7bzioc4uo3mwdnbyqinc3l0yubqpfp6vst8nrteucysl0th37ptl8f4nrd5l0q2f7zv5loxypd8lyh8fsuw0a6geo5tvulesq9e9',
                flowInterfaceName: '77f3r4dl26adt9qnr1f1qgkubyz5atqmmrom8k1zp0mer95db2jdl82x9lnf2bj95nuas9rin662kyo8x7g470s3ywkgu6zwb8o0m3wede1xb7afixnnojr277jp94ubvhwpradaoecxkrfupfkaydxf91q6l7qi',
                flowInterfaceNamespace: null,
                adapterType: 'n661cmmzzuwecm9bu2087h5jrxggqt2tczc2hb7kusspfgefp4sqgxeea14z',
                direction: 'RECEIVER',
                transportProtocol: 'w9emt73g5lahzoul4wcudxz8w2xriw5viiqabqaexqbujnin7vg4sa530wze',
                messageProtocol: '5zlfmvrt5ar0mxc1omcb7z7yupkd9170ugc62v251p6qjdwu1ajodm07ewmg',
                adapterEngineName: 'i570vbwh84pbwgqmmig25cwq4jebkev6xcrt7p4tkdzx2gfzg81egcimd4uso3z0e9uqo5x8uogrccq9gkolc16frsss28e7cklmzi8gzvvnrda68voj6s3c6k6pvuqx20iivab3yr6v0uyu4brvn4jso17ticjp',
                url: 'iiu9gw12wsyz74k58kcez3v86sir9me8l7sxocfiq42bqoa2fnhgxx26co8ww1uqz5ellzrsaa53rhi49t0ac1rr7rxpz8n7fddtdxdj75kjipuidrbywbokx3r24c9qw553k9sn34vfynkxa8a2lzh4eufbwn9xz8tm1rlghh109aocsa77vm3zl6557qjb8u13456hq5o07gyvbybaswqyhun0iud0wjntrb6ow279txvs9lcmmp2jrdc02eqvmlue67okmcrult1kxe3l0da9hn6uxemu05b8gbuuettu8pggcfde0773t9s3aohu',
                username: 'laf5pmw6zslwzfb7ctojo2hkgujxdgeb9lmznzw4v8lnzuihmt6jmlik4hdj',
                remoteHost: 'bker3chb3v08ea9rolftgp616vpx68o9bkfv5pq5hzjl5lzylc6n103o0ouesmq8fyut8jr9bjsfip1qu2a5p2jkl98o1pger9vb50tz16a2rhjlacdt25xrul4afn3jta4xtf5c3zj1ynh9ip6g6lrv8gwntc1q',
                remotePort: 4269993637,
                directory: '0fasn1skoe9rq3jtavmu8fh8kmzzsa6dcgcld0y0lbk8idjhb63gixo4zuyzqevac6mc2uapmmskmwhwbd93g2qp0t9bvnz7695ag8n7qrg9kkjb89lp9s7gyq3nbl3kwbe8w2ab0rpuqplp2hx5wetyyao3q82xb3pgxvyfgo91kmqy1rcycak10tcm7eyjn7lyniu8tzfagvrt2qlrof6svlwbwmlouq6cp3izfzfwg2lh2qnt73cdfilh1knnd05iltqmtw0kj5ejec49a3uf1g63w77dssztv153uzcjod1rmeuyysc34ki2fvy4n80lseo8mv7quli4ec4ej19uhepr4qhwo8uayeuzcw03n29lpuetjyg8pwep83hbv2rs16u1772usraldypi48cko58ordu1ea8oqsfy3rjbvnbz9nbyy1q0sdewmtooyip9uwfn7sqfzryqllt7zbnf21oi6gtfpxxmt4s6yot9svxhv4drghgnr4m6jnfibhpes1o3jb98c4qdetgmqql6dryor03j8zttk1uoaqr90vj31ssvqlau3a9dd1uucpaonbodn160j01qslf56q2q7j77yykewuoxds0te44z7joepa8gqxewg554ow8lxxqv70nw6oveulpuw360i361luqk7q5yq45gq06f28ggwjuzjehblm2w5krx3l7xhhasib0ryp2mdysczy2ra9s6cf269ff1cd0ypr7ibudkpoq7lns6g6wrnpttfsibcg8fnnzjpfn8fpna38nz6ppjyff5p21ynycc130dqqo73dzp53uroz8h0zxkiwdbtzzewosok25urhv26pispwu01bod0u6jzliq2d4p5jlle7qtfo2n82lyzddcyrpw2xf80cgz051gjjlsk6bob899nijnam5ewtjbhcgze7s4pafod0izr4kujhwricuyubeg495x2z34qx5eg16exnxfm1jr32ugn5que97tamjcbzamhehn4opl7mkcgg9l',
                fileSchema: 'ki835duf2ynjassplozepv1jnrlfh90q9avbuxs18hzvqawrx3meeww36qzp73uqtn9ku8x3jl8jc4hdx6878czy4o9occg7fcjladr90oddhl22woae6kjimvt71zp30o0w8jlbz3gfpu71e6eod428rk0awb4cuqfo31xxh0fgdqho035mvbhtm3dy17yj7vnv5ti01b5o19qqar4psdrem5fnjustwaz3ymw9o9lb9821vcycgl7kik2w2z19s3tzc6wuq8sahdn7orlx62r8cqxtwnvw9hwcixjsmzf1o0r0sm3b0xpg5tekoh21xkcujm6zjd39pt7790ttbux6auxkl5rw3p58qm3vylp5cmcegqumn1vxqz8o1t39n239btjrgfuf97d7v0fzdkl379b1yzau7bta64bv3m9mlbd3bobr3avifd8vjg8pfhyyr5p9rkixh1ttkvnqiee5hhvh0qnqycpt7g6b2014v3de4kk85a8w9qejoz7k26rgqfd2lad8vs5odngty5z83637d99t9b1ud3c7s4xla8ln1zshg6l2alao5fgale7s3355f366pif34o5zw72876p9tf1ekk0vn9mh5bw0istluykamzm6s9atximt0yqeyprpd4v67qtfuyt4pj4nj00pepm47pgemm234nbakzi5gzrnxyez9mkyjielfrjmiyry0ira6cii8o3tlwi6w6dz9gkjy8dsnf8ppq1juubvlwpvt4cr1jod21m7jnty2nf9417wbaj1ytb4iv8r4s72fe5caus0ra3vigecxqn49p1rucufyfjukuen9e5n8n2sa270yye2acab96w1e55n11rz8xmyyb973y6uxhdn60nkuckkktb4f74fflu28hhi7mb6f2nhi9gqh2el9kln8g1szhje7hrf8iw9ipp2ulbpdem63lh1uyt4cogesm08p74hwivpzrut0qnr1jouochg5mnurb2r0d1bo9wp32zfaf9y0uyjyg4w',
                proxyHost: '15e1m5evcf0hdfpuxx2zm7n1044yqrbd80bexeqy2mqtwy0vcssvrqqh7hnf',
                proxyPort: 4005079407,
                destination: 'ab85yozxo3u5hpn6cwkpiisl58291j170h5ufv2o7s9ht7lbwkvu2se4vhoxula216wa8a08i34yol1o24xyy7lbsr79tqvqyi82lj4w32y670r7l2l2fke2an6r1asab8nb3ed3ce8kd938999ycbxnlkztac06',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'm4b2o5repwiv4b7ax4x6q28g3013l074dyrod0l2yu3ssyroxtbimyvosjdh1zdvmq1807gsjqhrys6u3yoeuqb3b6spsg7l7ojrtruweyaelmlaa301w8kbwjddkennabejscfm9g0pkky716i7x0pql4qfwc9p',
                responsibleUserAccountName: 'f0ee9knez2krmeduakkr',
                lastChangeUserAccount: '61dhd7hxwbthayygeido',
                lastChangedAt: '2020-07-27 15:47:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'nmshmtc0io0bpmfjvmkot0siy1rkfoz2b85hzru1nfnpqi9j31',
                version: 'tjctnu6tfn92bv4a6iyt',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'wwuvi87o14j06u2lf5qwj20of7z8e8frorozbfxgcs85lxbettd1nhx2ibwczmu8crib5yirmh9ok6aqj2028jxzqs4pcosbhgac724nve7agkx4rbnlp7uq0zwndhp94t15ohr4xopz7iwyya3des232e0xbj3m',
                component: 'sivoj4mmm5su06dows9hujlbjwb36wh8fvekmafmr3xbl8b0egykb1vxg648zpn894erxvv0i9ltz7l3dnh2uynhrx0w17xyyhim93yeyysj48ad6wrwn35cij9ulerw5tkvi5pein6inwmj1d8buj53zaodrsy8',
                name: 'shszdlip1tftogus4q6cwyhp4y2kzwijhd1pv3ytwsqbya194vxhpl4r8epxpkxz5afgolzyj75pw734f5z4e5s0v9rcewvouk46q29bhmg5hw9hr70f9fr4reqvirr0he7w3oxwvd8hwqkxetqhl5vu0pgrhh6a',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: '9wfslbfm6miseva6ir19zpt77bx046m37vdegh7df1e2d45o7w0cblq246ph5zhd7nwaotfwzma719u05mvlda905k1z2w5kydo5ggc4tpm4a06o9bt0j1nfyopyalmav806ioeyia95br1p2m61jgw39fqzdrwq',
                flowComponent: '6kcgp0fyc7rhx5tt5nve2527r3scra38lfgbvk31lme4l8ixtyvju7us5xv5349qfozdobtrjjj3hp21k9bgesvkv7upjm7t65l1lh3dveqmen98cpadvjztv6snm879lrihevg83p89cqdbex0b2yncxcvjoxiw',
                flowInterfaceName: '9a0f148eo4weyx8kd5kvvxw7hjnk66nure8n6d25l0pulr4ei6oopcjabdd8fozd8hqz08nmw043rpfk1dzthv67fxnlsaue6i3af52hln8sq8zlaa0e3zz9ik3myekagy8eo1a2do4mgi0ztnl9bscn6njvccxy',
                
                adapterType: 'urphvy5wc38288l6xhpk78kadxp03mgihtwfsxardhbq2ilppy30eeyh1em3',
                direction: 'RECEIVER',
                transportProtocol: 'v2tnc5mps7gqav2kbzgjrkm3dcfn17izbyaow5hh2o7csu1j8ys6si8cdvjh',
                messageProtocol: 'nzmfaoh8ds1mphrdj07y7cyyih8sl24vwy49l4mnu0b91koychkvjfw3ilh9',
                adapterEngineName: 'q3ovf9dnlkm2tfgzietd3vabnbvthmm9wdx9cmouz5qewb54xkvj5web81gebsegrlk2t5lwpomvdifqpcpv1zs5x7n1l51ai6rawqj210x45w8po51h0tnlpvyafbgtajtt161j8bamld0ql43vyix38cvkif7c',
                url: 'ieoycvqu9v5clfyqg84q54u8llshbsspoy2d2ycrcxcd75vkn217dy904c57oftxyaos5w834pozn4u1j57us3o6743oebbf83i6adz51a405ahf2pbk3w5eyds9m3x34ygphvnbsrjzuctsbdh5xo0yy6fo4g6dxvy8oldwu4ro866eyogqas73q91kuiw3qthkh35e7usyigl5ms7c14ahnxq0gsguebnjhj7r3mrsgp88n54af00119r15ttnn2l4hkgsslnhdc5jov27bbmmwsnspyvvvelk87g907f7ws4irmal4gti1hkdfg5g',
                username: 'ba8ruuazoz16df94sgg4y3lpcm7rzynezo5ffxfdz9n5pgdrtbjmmiccmce7',
                remoteHost: '0cgb15zhsahtzvd8jpe0txxn16izupcf160y5jwmj1e9a1rkveov4lajfhh9fhl7tyyxo6zj6c1dgf1zm64jssmak5uoshlt7fmweyniuxz8dgdgyvb6ggdpebrhmi9ao4wdh4qsiw3juedxs4q8n6nhajt1dpzi',
                remotePort: 8871199119,
                directory: 'u8lf2cw0xiyqrzne8igzu5ebet95wdcj9fbaokgg3joi84a11pdz5tp4kiy5wam805b0qbjod7kfk0tq3jwauzxh0w87bphliy3owdsc37d4ip3z1f6n72aqiryh7vtbv3rdflqxg7ict80dr9uaaxjlophj2ubgl0ox4eh429gr7w1fa5vc7ksuf8u0pr69phdn49qda78j4yhov6g4qr8x6srg96pw41pe73w5awkg1kkn7mg6xe24yri9shsx3kp3u3y96a8ixycfohnibv6c3ur6f0vqnvvjbads7jj1b7jo4fakfdo6xysrwdax5dj6vcf5w0bl1zt8he32c5pbk5d8j6oy0s1r02lrpmaksc9xt9faybvj3pm382btda41esumfviegn00b3t6o022ehuaqnko1dlod56d54yqrncqgkmso84crr0zjeygdk9cie6v8td0vhsfa0ywetmf889reg8nvps3xe1g76a6gxoaw8gzusy26y8wlj5f0miqezff1q1wo8qeptezooyxvhkbbm5llupxf8psxgtcxddpvdhvuufesxocq5q8hg1rbl7ehrtkzihjbaraew0f8rxdwoskd8xt4s3mbpnv34a1b2l46qxx174i0tz8k4qfqweorez6o6c7016kzgzx01xcx3qugrtityyldfv8j06l473gnjwxvg0aho1tolzrg2xlhebjx59854fq6lff934vt1vyvdbpkzhp8ocmnb3yv9t3d3ewj7dnigujnh7d6uucxkn78nzi868379ca0m0jlnrt10wzb1vhuduew38bpzrbm2tpvp2o2sajhx6yu9o7i91pvdvpmsucopmtp664oa218gbzthonw37zwfnexu8qfvvj5ufn8kg2yunbl8nujp9a0b7lcq143amrw0ugfyx295g22a0nkq3hf3uomqm1f52owcez2rdpae704ytxns5xojgtz6u4m79noif0gytcobyfxeg505l4dpyrx3fgkppu1owxt7zs',
                fileSchema: 'lqkr6e0vf2vrsstd5x54x3s0ofryxsikwsbeolz8ib31jqsaw3b7o269e74lx1y8hp921kjr6nhbnmn8g7s7ak811qgo3choiksni643xa2rb24z116yp98gta9e0b5bc7u6unik65xdmexxbb1n9b6rjt3gzb3zdl3sg96nt28vn9xxxp6tttm0c6i2cfsyk9k7naeyl46a191qbc95anlhc4031t3toevs67igy1t9fq345tqngvtshwma5gc16huaan1jtv42brw97ibf790fv7jlrvzwmaagpn2aozfdfnp9d178exqi7yvw7wb2n5f2rtfcogj64r8vuicz2umy76kycw4351pcrv01oy8e6kxjjcq8y0wu4fkm0fgfw2m2irzgjxh29hj4abajbcjogtdwegrnrpb45gxhp22iiomzdnf6u5pusv6euijlkcl4klqdg1j528lz98gwdszr7393z0hqfyrlo26krl8q2ihuo47jnn282qjriwz0v37vyfxaqhhutorcghpy01tecf7fcrxak0egzyb89pcd0mw937av9mjoro3qegohm2d6yubw6kpljk1fv10so92i9li69q4jpvveelr3ubkvxio7ll25vly4penb56dccwv4wig0phyh1cfde8wydmprtqbs4a7az0ohn73w7erlay1bj61an2t5q4t9oty1nm8gruyjhfhzvp0xjaswcc0138h4ya7jvppobcoqb2urxfllzazk5zi3yw559469ufh2lnxc83trlrbofllydpqueslucjbasnhkczj5ldy7gwypsj85c9hioratxnz1835m9z6cez0wfv0s6pnafibht1oju715cc58fdxkkcmduj6vu6x2ytp6codalgo4brfo4vvoz2vljvbslb9pup8swpepyf012n8pbq0u4a1f59ucm04g8fx47sy7qebhp3s576lc81w3h2gjm9xvzss3ce9s1t71ywreyml3cutv0393pibxpfyl0i9n82wt',
                proxyHost: 'r1qv9du8sgwp2pxmslbg7260jbl2r5e4wjp14bih5908eqqs6tmviqu7tw8r',
                proxyPort: 8032901225,
                destination: '2pb6lcxatnqcs5ee3n2mqfd4y83t1pbgnsxsez4rwodsspmxkb3hd0wq588pr4l32ouj4l1vg1iedhumxrcu4lwau0ke8chhehvyskti3i9xdml10x5o490kp97kmnixks3xkqyyub22gsinhd5pbp119clf62r4',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'cp0edbsfnmy3dmzrqtcd2x8kyr358evdwxrvi166ws5kc5mtz4k61l66xtmua62ifh0e2mmks8jp6wtyin4oep4lgto4gsl643s6blnpqx61wtvie4xy9b0oxyfjcf32yukbdxp8jcztrt7wtwt56g0hpk53r5j3',
                responsibleUserAccountName: '2vknvmboutgtycuu6uyx',
                lastChangeUserAccount: '08fwdauvc2vfwf9mbxj2',
                lastChangedAt: '2020-07-27 00:29:28',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'wquvmtatkwuefuyd5s1pzy2cljcuh43c8z4ez83hgnfgrgt9jn',
                version: '2yoi9voz8e1rfx7y2f8e',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: '1xl53wkeu27xu20ne03nf3m8zt2e5978scrifvha5he0j5dlv0uzxfc90m8muer3xkoxlonq0k1rznczawf9godtzjmbcbue03axw0xuq6w1foh4zgr7v2nwwhi6cnvwh0qp10bau8prdrutvsb7mdy9p03et4ss',
                component: 'i248tlvgpaezbj0p8jrvk3ib1rime0vhiuqany41cene90ovwzhzu7ax3rfuqcu5sautlni36os6gyqat8cm274ujhersp8l3tryo3a1x6r7wdbwrncz9jrh0fp9f2zm1ip2o407frftv05bdowbp9ez8le4xk0w',
                name: 'bbaiopes79i3lnf4fzbepfqvf7dzpdt0icm0y7r6dxiezvvcpnmaj09gltcz0q4s53fmo78lcj0mjiaf7dw2ud2iu4lcw95ybrqf68af9ih8y62bgdmy7yn30mkmg1d738t2kqdlx74ozbkslefjys4ed97tm5ho',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'zlxg5bxyjshc22iszu0w08r1lzk2mztnrnprmk0lxbnqsph6nd1i8ssmly9tnb8dapoq8q5x7z7gbehldr8r9ez3o8n8b2pmsa5k50cx7lu0a8w6kt9m2rmj67czad042gwwynd6v5y2hmcvm86gaml1c5n0g7oi',
                flowComponent: 'sswa6x8dsc5jjdng5uqkh3miejlo5q1my6247xh82i72629h9lyyjkpxjwpuyqnmkq7sn2vsqfjskykt1if9ya8idsqsuvybdqw1or8seslxelhp4doupe2l7a56z3erplsaul37haqcyiscronrbyli81lbs9uv',
                flowInterfaceName: 'll4gqkr1gs34wfrfj1opvpr8du36alkttu2ru14psvjqcrx5gb0bfiyl1q0aki6labv6sk84yzrns78d80ztcfof1oqep5q8k1kgjp8omx6q5f7e5rbe3thgml70p2k3lbhw59tm8cptauy11h7mc14l8u73ixjp',
                flowInterfaceNamespace: 'cl8tlht5vsha233eiugysaeugn2al33acn6q4j7afb1zobun9zta0b036xdj4w04rspx1o5akullrg3vx6t0tuoe70m78v1op4z8arkmjiukxvl2k3txpj46e736sr6qadsc6xqkrba581nmtnsetkvyoe4p20nj',
                adapterType: 'gsqzvqctgmvoxv3ejqpetpjux757c06t90vjz8hurtelpttnqv74aib7vzqj',
                direction: null,
                transportProtocol: 'o0n71b02g99qiyyxym9u0lm24k5t2wflxtj612uoy85puslq5bblfhscho1l',
                messageProtocol: 'b699ymy8bv38zblkzfknars1pnw9ztosqhmrroo4zw9lpm08o4hduw9zfu76',
                adapterEngineName: 'kuzm9c1qvvzosq6ood2f7j3tlvfh1mks274gnzdpvmhu6ybaxgmha6xjlhaw4vjdq45hw3c3w3f9c6pg88250ycidq5htqr3uj6m5fuyitb11ah583wgo6p2sm6dohwflx1mfoxjm9d2wo3kdzrkhx2nk1fkf0qt',
                url: 'wkurr4cnqr22sgysv26zgjirererkm2b2r92rk31txilgfcg4yiip41qbob6crd1daxi3qrp2gp0hlz7g4knrwms0equaezfcrsufw8wkwj2vkjxg0wi4d9soj7mzlqk9zcbx6zfsez5caeikw0mzgvutagz42us5kc2zdmxhwvc52s4sfi7pwh1z6zeqzvepe5tzudshtn1t4gy61qvf708ws0vnevj9z5rn4eaj1a8qrs5vm6fxtakuhsb9ruyjn9gjlt3w7c8fodfz1l8wicjil7czv9ubcaiucbnfj6ng36vmkzsas9nin6w0swg',
                username: 'ey0comfne48kchm83c9mox7inbikovm8zdwugbdgz3zcuan3z50ghlxu1bvs',
                remoteHost: '38o4v5b8r6sxkkw1e4v2ihgv3ru7wazctb5wr06vb9fa0gf6k3qd8y5tvqb19hs03ekzayxqahiy7k78zocqtrx8vp2yppya957aws2or3653yf0pze32dhhizynzac7qp0chl3h683u9k13ml6sfhi2g1fbfzel',
                remotePort: 8056195206,
                directory: 'bzwfxcfkjv6k02voditij17uyf254r60vbjjpx3dkdmyeev78rof8ymlpi9ub8ws9v2qgvacu3uyfipogmfi03n0lvb9de43bvd5xxkjjc78o3xiirwz1q2nlquxt3wjw1cswf1m4u0vradll2o34bo17liljqdcobokjg6v8lz8chx09x4y28ts6rsveq4lx940yrft5lc451hziruizg94x1awu5inmvnz3y4ev3b9yh92jygzblqzkyi7bho6drsgpjifjavoyx3nokob2e3kan3fmi11taqmahbf6m3zn80qoxdes45wjq7pthgmpl7eq80mq7ituwysp8swkscxvwqym32d7dg76hl01qsq4kl1y3031134u7jimsccwleqsb1rzlph32h7kzpxhitgr049f2pjiupwx0xjkrn0gdljr5t4696m9xcrdna6oujkm276bb8f75uq097xyzf8bxp5y1tw78l7atcslozgn05pu8gtzeaekgze44cyovp7m1teqxqh6q4fbk8e2wv1nc0rivc903dtzkq8hml427gmj63mas9gxwf5wvoskzwr2i2zxgmb8zssjam4ig6fjd36v20ctq9pja8ml1lal0ob3qlkrmvtqklu6ylnqm52lmkuaxt26df6b9zskp03441bnyr1aos2fse6jni9tg2o5afbcpde5t6dm2unfmmre7m9i5dijz9edoiq0lt5edq33wirvoe1ceuh8ejqq61cecmwcj3ihji9avk6s8zwouollkwcindqwapxege49wxdkias6qyd3nfa431b1upct6xivj4c78vkduskupjzhib6abtxld1qhco7ev42cfnhd6o3pg615anrq9e2sphz411eqp264lm8unkdchk4pklqhwyfotzaumvt4k5j2yinook8shbsoj6o6ki4o60041ywk73dp6p3m7l12b01shbhmg07lvddv3c883yx9mgvp6yh7yi11nnmuxne7k210txhxt430ke404js',
                fileSchema: 'h3yt2u7d26y9pufljd0vqor0ov3aiiv85lnj9rawrcaisxbzaebsez563em6g1sng1oc09uytma7izddauxrzmw3yfbqas0z71oxrbwwdmt783jmt2bxzbpgfyb4jqblprv5v7fm6mnggzov5yyllr199wpqukn6xoxuv42391rkmgaeua6okjzcktc24lw6p8p8bf65lzc5htn2swg0lam0xraah9humurhdyv5vvmxwpwt6sm9rl96fli4cmzwi51l15o1r7tfujreslm5uc5lfqenxasw7efx9zsq68lgqowyd4y1dun16tzw3oxtnco7hhphetwpelswf5l5vu3n6hjxrvgpnn2q066eo2vy1m2sep9kc82yyc3xgr6q43c9si64g5mao4b46cmly6vji95gcbi1872ggoi3v9h1kim50yke3w63pgki5woqausy1x4wnnpvd9o175702p9eht9du4zsp6ti9r59g262h5wfxiotagahn044ogjz80qr0dwgyfcnqjw41k6zeog8psk6qzlraogz9wwrem39g1im578gpjsokcecico52ez893crpctox80874prta7owv4tgqw385vcqmr8jlu02zkaqwukl13a0dtypgjmz0ia22qelaco5b9bbh68pppb5dw8totyju7sfqws8c1oas3ffjklf1d3aabxhrwusyug98h50mp561fs5z2djuj5gt0sdx2r30v9oxcivfy0vuacwt40gx3kv8y9iwxzu95yqwmbg8ia96ei5ts6my7ukuutz7pjjdcd1wrl58mqq3aglji885sueo8twf95qz9c3aubmjo2ao3dja2qowgxcptc9wch1gzzqepocfqfmfotbad1wqeqjaqyzo9q3pqug7xq1dbw5s8cfplxlj3yufwhia7pk1mq1e8m5fkw7h5hpcqkn04ppynito6frrfmput4kvdn7dnvzxyurzjwgfuebf4dg8qkyyha60zu5g311i688ld4cc18cc9o',
                proxyHost: 'bfjclxcmlyuo7bcvdb9l4d44evir4p33f53l7tisln1evudj9tqipm5ygxbe',
                proxyPort: 9590711453,
                destination: 'blmks4kb46hubg0l052e0o154p4v5adp9t0ojbpyil7wdu86yw88cgw49uztzr1nfcp0p55cggf0jxoka8a00pwy0xksdeuse1xx1qj24iqikcei41rpb73o40ez60tlh9hpspgblqvqg1l08ookagem090od53n',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '5oqtxrak3h3hehii3be303nx2idlfxcr9l008zs35l64xmcy5222stjqr1b2o6ptzfih8qw7yr4b3vzgko1gzxwz33w0mkbaposhypsk149db7j3phedphq3fhsbctgvjpdxbjv1blhq0jjwk6lzsa082ald3l3d',
                responsibleUserAccountName: 'z57s9p5isblidgkiu09f',
                lastChangeUserAccount: '7a3a99f7i862u3nb15iu',
                lastChangedAt: '2020-07-27 04:34:44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: '0irrt5pn2aak2x06gm80fd2jg2gahnhbi0pmg5phmir0ow87kz',
                version: 'vjx5jcpc7twpey7u96ii',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: '4whc0xkydpdpy5nnfyjyhxbqruwr59cghenyv2jy0knaybv01gjzehqq1yk3a5o7l5wkd1i4u9vr1jpuep92vgrf1v3tq27eib054bnq82xj8gq45ydofv40y5xbdjsgf4rzmz3sb1w3959eyug80l8k1iz2cidd',
                component: '0mwjdcsgtm1oqutirvrr5ct8zkdeh153l6w9iwzwayobqyzwljn61h5owpceyonh7l0dw0tb5yadq58gqqn22m2k2gve0ahlc0m7wrbbbjepkhcao9i9te78z44a98mcdb8538em3k2t6mz1jbwm5gcj4i4efy58',
                name: 'cfv7kw2myftdi9t716ij2gqhpbytbnpi6ogn8oxbcph0kklzlerz59jqh2tdxnjynvixrik5nvgeef8x9gr8dh5l9i0i1u0l7qcfh9u3yufrhi1h451mkcko3l78edtdaxff78arwkfu0j3kaif239hlwwpdgq9k',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'l6aby02xwkztke0srphx82o3h581taqenumtkewgevs5k2d3sq74qemdnm1zlby00tdojucuq9rnpasjj2p7y8fug2gq1dton0nu947e84gv6syqc7d27e7ky5a10qyis9n1hf2ijvwapwifyer7mofhgy0woxvv',
                flowComponent: 'xcefxkkzgxu4krrck2yir0pi3g6kh04rcnuo00vpqtiucp6p9thtivimqerw48709es4bz6ay16xcmdbvng5vuualxu2k6ouub781tr3ksd7rrfoq3ycre07tocyhus29sapj0od1tui38qvbtwf8fr2oy1nrvj7',
                flowInterfaceName: 'xxn199fuadtdudsj5rtt3qxj1p5jxf40i49tvmjrha50pivyj06porgtbm7o2302nflf9q7flw7tpcxo2zhsbgbz334n7aviuybi4fo2e05rtt74d1t4xf0joswjtyaqydpdy2ddcdfdv55goe3bu4qfzlblatqh',
                flowInterfaceNamespace: 'mji9dtg2dupqfj44c8n4sxdhx3lqlw597x2c368mgvvqmhtkvg0fxx3x4wqwsaksfy7dech0gzrz0slvbcsosntn35c5clfr7dsmdrch5yu7js7kdrprgogqppcpjb8x1du0zrbjtkc12p5rptz7mwgk395mracj',
                adapterType: 'xyj5v9efyz5emha2o6r8jkkrhz2z5t1ik0vmxqpp9qn9k0bgoeye5201des6',
                
                transportProtocol: 'nh8ip9pys9p0jhx5t9rs1t561qox3w36hikonm6kc2izdiq1zmxs9xxmtzwq',
                messageProtocol: 'c0tekqpb45jonim9f8zdrwrhznab9yaufe79zylrlavyv57bckvbxaykhvum',
                adapterEngineName: 'fbqq0w28pm6mpusx0qt1cntk4h4dmgrc72s2rhqcew4ozd51aym5yvdbwdz89eoapz6xv9jyixciacwz773teda0cd6z3ico823b9hu8y7p082kvqnqm5gjqs3tvyocdcs0vftzks683g3jiprcsuhk9mkton06n',
                url: 'zu1w54qnn0bm3v5fjmtx91q5hby2ixnpl7fqeqb5abp0eu67gnl0dd14pmppy1wk70zzq54g48lbhqn4lrgbif357vj0j6591he1m83j6v5nancdy8cqnagzdjae4n33ug4pxpsjhqvt2yn03joeodr1h7fbczsdmo304dpecwsq5ogstd8mv0xuzb9vjf9neqi9ppbxnfs5142htehadael9j351wllqja4e1yf5hlm67kj07ql1z6gebmjiawpfvzl2gqdmzk9bzsyeuxwtlgf4zl0fwco02ngg5wpt1xpn8yz62aqfrgsnw7ffhxd',
                username: '3c7r65szjz5uv7m7n6vtki5rbolo4cslecma85v12gzwm5vc91u53fsec6ob',
                remoteHost: '99yzq5mfza4yhne42ck1oqdg83zjcqxcmdopf0sp6p55e3xye7hppt6x0qv6rac6qaxbgvvk4uu0qpq9lryz4t8ksayzwefw48q1j7k6k8j5p9kahw971q0vldjl0c0wymb6xs2aikz6g20a83qb77jz04dhfxky',
                remotePort: 9356184577,
                directory: 'a4nq44e6b8i37r83j8xanory76a309twqnbux46aoqrekcs13gfm6xe61xek7qik8mm0mfj3we75mjisxlc4legc0evng518010g6u4lffroumimdp0x6ia2hbw5pya2efip9pr09wsue071g0tj0updepb96p8u49wpivb1c0htb9be2fp5ce5pvdviwwij048uiv5zpp6cnuukcof1oxumi5boqqr8cg33kixt9q8spak533n4rlf5nuyt13p67lx2oi0z3ka1qre3vn5tmos6spqdmdcbpmqld2bc8i2ptnl2vfdwc5tf8uuuk3u21d87owcx5gmvvn2dqqclv4yg5rhn3g0xya4efj3tri0xltynytgyfxnyt3rqjnk2fdbl71jwejgfuwvfvet1cv9ddedxt6fdpeersackbn887j1g9sp145i2dam1603zquf2dedrk8m4b72nzydfc5b91nrovushz651nt6sw8zy09e8upzl85s49zeuoowjkj4fkcez882tdphaosllmvf4yuxg4h4oh067g8oqaa7d9bmxa0c919tuu4zil2fuisnpfkn0c5ufljfw89orxqsjkmcnar3nuu8sgsllrujjc559obdz3af6zv9jngl2iadqcv7eouksx3op7h7g42cx7hd014eap6x20o0wb4tubrtqg64ucgesnqmr7m6fktfnfpx63kb2mgk6y0vkx8ju6d0t1s5qh2ao29dxvp3rltwhfj6efflin9y64a1q7va3u6k5rxt73l0nwyqmuy1o2kjats8xpphrziybvyqrhy47o48g27o7y6osn6pnrh1y2vawohobhrz44lwxgw3xp5j1g6v5safazmu06nbq9hye5ccuzlggrwsgq81k9whs8x8dwf6hfl23xm63dph9rrgzdyca4uvuhz9rniyp4zp6vgux2gc4d345f8kbkaacwu4x3zxmgezm6vwgpisserxtfj74875d60zy7m7845b3aurkvm16g9xypmiw',
                fileSchema: 'ge8l1mhwhkpohg084x3vruway5yh445fnlgksyns7umzaepz2equxk7636goh33uztnlpw8so0f1w2d6ak3ewjutkq9t9coo5fq3xwhip2a4bootvvzwquziukcik35v6z44ryve729m8u5ynokzzqx77wde72ye64x3uqiuvez59otor8gkc62gsh8le00xcja8a0obj8v7jdivb9c6r4bx8tp43mldbwr890d4ustdk2jj0vpiv5eh895dss7v1jh7ru31w7qznwa26raiugh9f7gdqwi8k63xjtof0ma834r3chxcy8eb4gnyrc2w4aryxcwee32snp2c9xf0sg59dzi3sfbuw77tfudtqc1ti5plr0v74xrrf18ty43gefo9hxjbnch2a0x5okk7k1f3zvouf3ffsiiroo5qz9e279mp42jzeyk1izcox5tfiumil8gs9t3swe9alivt52d1k5s2kiind9wvt4w5db5zvd5rxohic0m8iehxey8cnabj3k44o7euw0klxesjpuo2u5wdxw938s7qxl8kdif8560un567m8luqb1ywf2dmnuaob8ncyrvjp14xp8omn7uigtiguyqp89rhcpkmxezskmxf4lf7klr1p9yji5ubgq5dgysxzf97dqqnb65yczu7551nf3ul57ufl720ci551aw8uh42hz50wet1jfx5lx501b3sb77bcs4axlr5bjdcf3trvwzli2b66skg5kv5g7lwzn83nplh2exol0haefqn7kky4jf15cd5k5xqr66vp0wgcu44ek8hjm9ut3qiqy5fj1oj0ur85luo61quvxsehdogj1veacjopydbg4kdejycf5rw1k5gg1fzabozuwknycuzd15m2qw6xa8g7dq4asknrszi4qonro85hwm9hs2o4pccjrjpsv6gxqtw9yf4flnnmze629o09g84kmbaevw2e5dtxx40dqz4h0vw8vpkrfripsqdv22lbx32jw30pt2m3h8kmpse7j1',
                proxyHost: 'igb8x2bwc0vjqqpdy7t251ioewq9g6iz2qn9ujmz8q6kk8x4wcpmhyim9ck1',
                proxyPort: 9791748878,
                destination: 'fz04d7jyscw05erd45obpv31iyqncveodw6kfnge8ofes4rgmbm6jgaax5tr9m97kj3flqw9s4u903czoepk97wwzgqj7pqsnx7gk4mfl5x6emkfsjs89ppztegv7spqt53trvqg5r0wyamo2i782j8hjmadb9ag',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'f8sbvaf445nvnwb2r0bhrwq0ra3bu4qgkad2lsit3d1wp6ie96ofmjvdkcrcokkubeq5yvztm3i4gift8xh3c0gj465r09ib1beuba86jcr7d9n3bg96vo1qpy4geczn501ii6tan2fvasowvslt2p66i338wcbs',
                responsibleUserAccountName: '0q8zmde0vrhm1ax61phm',
                lastChangeUserAccount: 'yww5s3ce62rovjfbd4t7',
                lastChangedAt: '2020-07-27 00:33:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'vkn6khow3fg0an3t11de3g05o4zvi8dlz80yklibuvd9fhzjut',
                version: 'dxya8qctbutit0c837xj',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'ucu1ned1mp6f86tklkjqlaocbfn9qfnyiwekngjnjfoknkt4q3ezs21ibh8qkvsya6qew7gqxe721fvxs5qy1w88goadwmwnxb3gachhcbbrq0yufofqbqm9ou9uixndxkd7gmaeabt3vuitlj9dy551bphdtk0h',
                component: 'w6kied9picr97cb3yd9wtd8yab0fcjnz0rb7pig6ngnv523t5brvrikyvuve0phnduebe7g82t8fb07zkmpx5i4em3c1nk2l75dw6lusdv6ayu097mueq4u5bimzc5g6633nzp2utwdbelqgkuvt1mslypipbt0y',
                name: 'zklu7qdcym9fjlhslpy9uv4ee251zu3780x9jdzzms7i54zvdsx78ktegli6ck2dwdg9ejsk27hqeklu93f8pq4bq1fnaxm7sg3c6uq0jzcmtjei2apafpjmqdyrunixd7qatxwhukkxjyqyf34ezo6t6c41u4jp',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: '1ustceyc6t5lt82lcs29wlo9j0ip28u4be5onxt8phe8l5d8fm4attoc9byq6k6w6x0loboyngx5m91x02u8y7hzwn3ef9i2mybajkcx2dy1xlln02ea1us3c3s5ulfwvslvxa9ug7mg9arvc5dr56e69j8vzvlt',
                flowComponent: '5tyqmi34yjezwib10zy3u4wvb1urwz5w27ykl8krd877uveh8qsk1pf1oidp8h17v35cqmjn6kre0on6bvpsu4hlj517jegxcb0ye33wuj899t12yvgu0i6c2c4nmit3t074uvcmtec5jxmc31283s72iip8b8ak',
                flowInterfaceName: 'rbeu3t6j9egtza3b7r6r5fodgnljj3prkmjt4vvjnvcx8dwz335bo0qpfpixdy54dvyw6hyb02zkkafozykdp39gs2qkm9guia2vt9oys2cgfwxwwdhp2hjnft1g16l5hfs5wqybosdppnar203ev9yhggd4wpt1',
                flowInterfaceNamespace: 'g5exdyrhwjk6c23ahf10ooxuk5yt1hbxm8i9cx45ntuam39qopwy13yu6m3a4xpt3cn6u77h4n0dvralusb67i2i3mu6gxk58lqxrcqqowxrnlfgqof9ko2ggk0c2kimsikmnolznthila7ctjfm135k8wrrhs0i',
                adapterType: '21gkl6isemjozx8j6h0b7ziuvbj7x1nquitunpfai9evruvhgxqtl9iyqwgd',
                direction: 'SENDER',
                transportProtocol: '855l35ws2xoyfc0vpnrx9zvnkkmflsgprew4ie8prxpxvezkcabqh9vr14kr',
                messageProtocol: 'vdp2mepdc5b71o6pjtat921ueqklbta4gtgrqz167s83o26heox4db5l7v5e',
                adapterEngineName: 'k61oe3e0folqc5wxo06jw04gf4ppi1i58kbxnatct6htqyh4orm3o3ia7dheu5dmwlpjeoc6vy1ct78edy7zchl2a46v848fyirt91apt0iuy3xe05dyb5dhopwyvdvm3z9b2467bdeou0mlwkc8kqgb27fayfy6',
                url: '4skf1hes7zmdjkp1yhxz5ejdp96larwu7nv1u4229st4mweake099po318f3mugq10ypfng2czb1b3id7e8ij8gbu1w2zb08do1d5avqxgj70oevk9y5i9uebiok8lzfnz1e1jek3ylgvb4fw1aqxly23o9mcgzo907fg6kziebueunx6xtwhoz3kj24vb9k5xxxba2vjofnqrhu2wozmko3yf9rf3txctz0ldv82p3n6ug43a7xhr7cickt0gexttbprm3dgt4y9suepaw4zlmrte8ruuvpycni5ei7xmo19u3vu23hwgs5ex7xizcb',
                username: '03tknuoi8brwn48jqugxi5xqqx8l0qhlkd8w5fedz6jl12ilc362botdrryx',
                remoteHost: '7tfl7gblazgtldib20r5rieqcef6cik7vr07jejzxsla5k2x28ka5u8z17y5awg1qvbtoagufmrn78639tpcdo3tvfbj9j2zbre2aeudk6sfqs4ar0h1l8barrvkrpufcgk8pdfp22yc0m2tnhgc8usb4mfeml3c',
                remotePort: 9809219802,
                directory: 'bortizjwzwx3ihvajb19a3mk10cgptw66bn46y3b8eyexqw6hr3b71za8foamavq2dnruim4f8s2brzetvuiy2yzd4905hqsgszrj0ojir5cpm0kjrxsw1g8yplowzrd9cd3dtejk18d72j7cxvzz6fwmpcabs51d7d43ij879topmlqij9k0iaifig5dk7zj0tg4e90zudi2oopjuth8td1l447hhbwmaejxab7ppjrc5iugxpwxv67nz2g6ujyv6wwysaeaax2py22z7ol43di083fahb2l73ky5xm2g9vedv98yhjbx55xpxoe40gabokjbqpponcsffdd8nwzw27fd9qg9vuzew4e8sznjjw40obszak6gpjtqpzt2alkqmsocvuxi7h0zkhlgx5yjj2hei49dw1dtvkr9zst2w3b4pbz1hksy7yefetzwyyuzpt5b09wc30jum6dnjghqeukiudaig2o508wp5crhp29j9taiihraxjxpwvxso6yd4azrom7hw7i6rrypz8pkvwa4f1ajsorv7qxuhaczdrlb9hxngx476mavlrg8vel1u6ch1sp3egdnp6r4wf305kncuwkt6abl5qvv62nn6pmbp8lj5932e2miqv9sukmqesaregar0sztyezxtk77dookbmi0zpi6ttu0vxifyiscfun7lym9hvzyv1zp0ctnrtedrj8mqvu8tym1fzlwio8r3ojagu7bepg03yla2w73xxjjmg1fgm2cpl499m0nmyczosj6qxiosj3o9mppppa7zvopr24jjc25y2cxvrh2rse3exsaju31mjvw0f3v28af64a9wkkn7bv2viafvgtbjqp6ttvod2kanwddwou064chisjf0iqzafapej3glf9hbsbxu1zlriy7z008ywqpnc4mkkyst4g9ba420viidu5twhu4tzelssczt7wvvs8yuj0xtdqyzm9gi408fs9s1umw8chioxvj4ob9zjd3hv4hmbi8y1ioa0i2vi',
                fileSchema: 'r2yvc4l1kn8xop2zytkb27fe59uds7t21i4nnqd6yglgvcb45fu9oc80gek2wu2y9u4qng0eeammpjgrqf01l9ttnlpw3vmw8iqlmgad9nmj9xc09qonjd2f9d90qyyts9c9ytm2gbllk4ymoq7qumzymkkcdebeis4vh0005x14o1gr88zsjnu3v45svb800ps2lgahvert3lb3s3xnqqqge1nykq393nco3k5tg8pfaykp3nmgn2idi8um38j3kknak4kpyfpw4gwazub1ck5774c4y8gyhd3087ba3vnlyv4gyiypoe94nqku7ah5crahxl98zs8paeuvnwdm8ikva55uajbghqusddoejyci2sfr7x5pmdfjfg36psoeycl2kckp4y8kapvzo9kdivw5j9i4uj7l8norrer3tul99z3cm3x0gdlzgbq1fwlyfxnosj3dlubkzmui6a8gvyj36jd0u4pfxic3630kawayn2tctclsbyjel2qemw9tepiwjprofrkb9cegyguzv1yy7apphf7dd8q600dwn2xu7s79hv14ezr76lnyhqvhis46yccrulib6516vp2ut8o7clnb03865tfqjbporsade14llk1jlbcwgh5xzmlujoxkgnpncfesjn5woa0hi95rau08kkm4a292lxt2831mpsm7bn796swb28sls0e5my9n8rulzfa9xk7p01xu5g2zfsc82jo72l999h43g4kdu8o0qb5iyglloa8q4olmbrx52bxa9zjm5gg1ebsgoqym9qefl91atxhd5me7fm71a3ajj1bmf0k5b6f4xpfqzohgymjfm40tkwi97d0wkk4vd7qwoekmokr5er73usuzciq0hlrx4ttyyr8i1s9iakidpb32rj1e014xgw62hcq89wecj76zma2k1cguim9sntdow9dtmni31sfn3ms2sc4mj5o298wpvzeea8bicalbl9jelp81j2v4612vjeg1gj1zctdnatgantqmebtg',
                proxyHost: '5njkicupnnqd5ajuyaz2h3or29mvi288eo6y39r2nfefpbesdwy4k731a82b',
                proxyPort: 7878476859,
                destination: 'no70905jq2oqxfu4tnerkzmfqday769pm0p4idg4kzwmkzthniux4gq0dizuyign4m6xre5g3pli94tjrea6niknoi2kbg336qcev1vu6w3cvcv7hkm6vmnk84cued4nc3dxg7p2elekomo0cet5quoq9hpu6uwr',
                adapterStatus: null,
                softwareComponentName: 'pm4q7u8ngwsktgqsmlmerbwkjauxdp6r7hly3yf7l5flq59h7me14ezd437for8w1kgh6zu2y2v7sjlfnttl4rsgzljajy2b623e9w66n52iqezkt41uip4x00cmkbi3m73l1jlc4f21y0fia9dc1j4xg3i5ge07',
                responsibleUserAccountName: '7m2l3f2bi8j2q2jzmp0y',
                lastChangeUserAccount: '4dw9mwctlssw2ycpswls',
                lastChangedAt: '2020-07-27 06:06:37',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: '8qwan7yj9dyy8ldwy4cxwdjfo2ohk9ndcndhi3ywemwhov5nqq',
                version: 'zpv7d5y2yfmfy6zmxv1i',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: '4whdmqjeb1qnokw3adzu2og7469hk28ycj8qacnt38hqu5ji9y44n5yi4i9vpin6ze8bvw3gji1o14oha9bpum2nvtx7yceqa4oj9ik1iwne3v642qu39ncfnnsx2bnqsk1tlo11487q861zgt9m8oocqiu704ex',
                component: '9rfpt4yfuvu9wmhx06p99dvq1aayyzujvcd9nldr9yuzjxva7k9vtpxwbqtxacxfbvi2eg8xppk3d64vl3xdqccd8w65702zxaq5yz3zkkqw95z4xxhn5er3cvwgrzo2iwy4avbnt5zmjfk9iclytzkxhjkxpffh',
                name: '15pmilrfq2r2hlqeale7kzjm9kn2bfrc8gi1uvhjexquq6wt4zl4b3fnheza7bp9jwiid5javc2sqmlxo1b8rm68022flikcf6uuejap6mo9tihfnrmmsxyrz8yi7bizutb8yjyx8budfwcfspzrc5weddoc9ws3',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'f06zaw3zgrmnq7ha0ryjby46ane21djtyv9s78b9qpt9ltta5ke62kedsse70v470dfclfq7oy9dphqqwa9nad4rqbau8rrgc0nggzf3plk6lj6mdwi04kegbjf37v4z9srzqfz77onc1cmkrjbr9y08v2p0kybj',
                flowComponent: 'hzpxxu4hwms41w848ukf85zrjj7mwl9rkgolb258ei3kadvp5qf9vrfjat24zn7iwubsdt2on5b5dar3sjaubsqk2r9who4o51pcy3ac3f806kzij2rp90p7xhrbgay2u3umw8w5t74zqb64sobu9fkxvwrygh60',
                flowInterfaceName: 'os976l64lpkybkdaarw1e48bv75ihxpl943768ioqdyyjhwr4ymb6alberbhvmtel3kx415u03n1y3d8fzq08rxln5tyf9yae16sb5j74oce5qqenrrvzqip5g10pvdlw05k07p12ip4x4l8giz08pdj0km2pi7f',
                flowInterfaceNamespace: 'dtmszbk2m1wmj1sectjx8ki7ptg9m4lm9xulwxkdrte36hmhhnwh2t6a3o5cqhfwhak8r5cy3a38knqs86lly5mt079n05opk40v100pmpva53ppx4oz4v58s75riokmqhsz4snn9b41i4q88gddw427qgys10ns',
                adapterType: 'zeli4sw3d2aret7nyr1b77v1uur85xpi8yfxjqhuqz841bd9cnhn3pt6sigb',
                direction: 'SENDER',
                transportProtocol: 'tmjagwithuryf9yk5tf4ea4vet5p9sp96vlej63atn0jhcsru0gz3lf24ukg',
                messageProtocol: 'gtz1kubi0hrodbsy07t701ivabhc5nt5zati0pn202aqgjojejbp6lu94ffr',
                adapterEngineName: 'ia0xfocuk4bdtibe3u5wrh6ltdoda5byhykh609e3f2c5kmeubv3h45mtss3j36tiqyjyjqz4kulfe7rgdbz8ggml1ls5b9xma1z3yh2cman8kigxc2jt1qp4r6ascbovvy4fpde8ncpu6d4ckucou394p32yv4e',
                url: 'fsgkstvn396ej6mwyqmo8d05y68i0g137e8jy8m7oyol349x6h1lxmd90pfve0jxmicsvdirjzx1707nh5c3ir947u0gazhjcchru46lil3e6pqrawzzt0rtvyorr7i09lv2rmz7i9yugwnu23qdvo5u1rj3pdr96j01zznlwh99ustj6q4c3zoenb10s0joe0mqij9748uc9wc9j879jrpkl4zdu0a0hg5qq2q8th9oavzbibk67jzkgp140cn8vb4covj7942ccukhnawypg8f2umdp9h6499shxmbola6bz3i9xv4amt9o54yzkli',
                username: 'r7zwheyfeezbgz67gib0cugah1g12hclap42jaj5ahaiudbr265fg0th3o5y',
                remoteHost: 'k753z8fvppcp2v6qcozhenzcdp3i12len2yp214h6bdvdvyewzdtgkcvxczb0no5rzoepy7ualsuq6jh8nm4nq4m8pfv9op5hvt9ddcs8zkdvw6put1msqyy53hblyxba4nvv5rky3ndm6ktk2r3ea5kq4to5e51',
                remotePort: 2425033275,
                directory: '3lim1ubwc7c0ae9c8hxuuldiwdl6d4okm46wx1ogx7hf4aza6bhqcx4isi8r8kch5cxejhhxk5ievx8cycmm0f4i1etjlzarogx1o7p1sm9957xqhzxmf9xzkck67aw9f2x1jhceeprqez2vx6k4epjass958kldzgraspkno1vdg2u7thc87ys5sg7xjkw8iw60y6t8oo0nls2e0fbzicf5eawoq1x9sj7i7bl7jrtcwzcgm7oop8bexel22ozgtid48pbomu3jiwbva8ylo31nzvm0cp7oj079n3g9mv7bk40az1hmrjnzm0ehqxjpw7mzobm9cgcfiptymhamt5egzmiqjkn1mzj2lz3jna569wrz425jt3r54y8nqzydik4ljmgj8hp92nbdroai0farsut0lfiqvj0n6swny37ib1of53mwwamu4pgkqvvxxuvku17lnobgnv6s46i027h5qgmc0w029wom246u3v2c7hwyut2hh3onwvtx78858rt3wwyx2zjw523btqqa8xr33njhjc1pqrmh9by9wyr8m6s5x6jeyo98kakh3k36rnsr7jeih98e5i1hmg82ifqdxxxait365375vrs1ohn5fe0tbfjtmeybluxae1wezwgf70lxrdxfve9gww5343rf5qtwbjuffa5csat0509mcwobmeolqbmrr1cv5ozerprmuh0esnmbnr3zxqotjeqtzmw3vnlri5r78plcfo4r296ynrpk9p0pwnucmcm5fwqt7puvo42i1eat3x7mgsu23cems3oe1pcftlpzffpj5a1udwo82oiiel0avc9mi6qmaqyjbdcwtrhqgl04qy26wy5ptoaow78xym1em2ilmzuh6jc8vszn8lypjlt427cxsb880zhi31p1pz7tvkxjpmkaoor0lii52f6bncshupr83h9srb21jg13tlwvqjfu95hzg7v0aig0dl4q6mrv8950k9dtzow1zizzqia8wslf0pphq3h7jvcx3hda',
                fileSchema: '6u3bm8vmn07bhbucjkf0df3gvqi82nqutpqlvuhj1r8vsxhg3rlw5uufzcayr9ow3m2gqzjkjbh0s3w1mjp284sblhct3x4bvm9w8q6vk7ap6lhrbtgkw8m6nyzy7amej91ze32grzseiblykwd4qim4kiq8nxy2c41hwt85repnvkn2msjq8h8dvz553zun93mh2hw83z7e377z0mw5pvvifd1b4qdvzpde42lx4f9mi8k0uae902mf9wtea0b78vgkcgb2flfj4qhcuovnjkd9ghd9s75lysaoghdiodaf24prcirwl6st4ecrk40ztt2fgm0beecx0oz5jnb6kzogfsb1m54bo9kwdmsye2znq63uk6t45ehgm4p2uv3dk7bbpoy6maaut08j50jf3u0zuimq87wp3oa6lqp6ugcbc124628ocd87oclzjt5ja6q8j3anrbg2cpp50q9bvaj90b1oqy0j5bgm41c2j25cxqv3i1s6yeklp1lzv6wfqhumpk4so0xa9ebr9xbt4b57zd5miyp3qrrgwkdinhs4c5t806ipy7bievzuqaglz7h1md366i7s0fviqreki75y9t5kkpa47nj5ekh0jr9mtigprjj310qhljrgyombbj6vdqat4aawe8txvvx7u30uu8twrxd0yphwkosqiwn01n0c5onw14nvpsgs2ci3rp88tcsxej987t9estef9tnau8i2j6wvfl73et0qb64bss3b8j1kvgn41f2rvr7ox4wtygpn0g4inhbysmzomax3d3z8xx1ngat024np3qkj92xpn5mckuebeddsci7ctxj1nxjmj4iq400u5q8qsdx2druiv0lmay3033be9vdpcbeklbnipvniborp4qoa911pg38bjwdnebz44j0qprfutsxsym0wgxfhsvibgrhuumebd8gdqghiwdiu3mokgzi2c7156e0z5ekwlti0vracht3s7lufi7fqxs4lgpzsr8gs75iljjm8r59lq396',
                proxyHost: 'zeukmtwi1xsx17047mbbh1ce5drcp64xsih9ixmua8v1qswca3ap2micxmpx',
                proxyPort: 1256197175,
                destination: '5dpeube8kam6wakuyn0q4uxipium0r8mlpleduhiwysdnmhojbqfiialajya4myg6lqy4s9viiygy6iuvtt1u01ym4xmwkwkl56wt9bkif2nerqros9ce6ebt6e1ljofv0w9kx0kh2zroxunxufubjcyt0cdasrh',
                
                softwareComponentName: 'lmyr9sad3orfp3z9bcwp7pqb3t2u12rkz4pybzc78z3wrde2pcxqi6ol8ifyn9goribvvk77h8b8eame1jsmsw0zqnvktsgvkr2b9wdpgwe7qanz365nevk9zdvyvfc9vn9zdux4s78sbfv3yfbtjetx2wnwk6cu',
                responsibleUserAccountName: 'cohjpyj2togb7fzq754c',
                lastChangeUserAccount: 'ph4y59bpc6b1nt3al37h',
                lastChangedAt: '2020-07-27 02:19:10',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '3k1b6fn9mslnyyxuorav5d3bwb84uk9pm4j18',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'smb37i93h8v86kt4uov8b10a4zbw8jueh7trertqzgvk6x9c2p',
                version: 'ha0a0xofkqmyebrbo4rv',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: '3dc4w7po6n882t40cwsq0w9ng48vl5oigw3yoquyj7ewni1b8nseieoe92jo690pm1urxsqyo1nw9d1pwpkrhx66a4y1jczmlepl25cbmnkhafyi6csdgfh6pudgoessygx4d2gxo29p017os4jy3gxh8iraz5mj',
                component: 'oragg034bbum11yb4eg75z5dmyez4b4znerl49vaxw9qmlyaixz016f2l3iaonbnxjw0yb5g8cc0idgpg5vlbje9u6we4dkjiogibpjfl7m3trah01c77l7jpim9ak2jigo80redgk5zpx4883masmnlta7xtb1q',
                name: '8cxnub2s4lpquuyehj01cgq8ldcy67fx0xr12iwkrxluy9j0sl0lxfvvedwyotkrrfme4wffqe09oua1yrqw8mnxnmr001ainllj87k1gfaql6plg1561ljwtbpk87tkho7ieiuh1d18t8fq88jt1axh7kk017oo',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 's6k8jpyll1whqrwd8w1jz400ub4ayxxukzryhxrjd0mdiz68ngm0eblmac9ctj0vqzabak7ve4e54bwy42p096wc3quw2msuxvzlevn8hnyxz4lhpaj5x2783m774k64u4kv3wl57xddu96qn5c9koideisu0v6x',
                flowComponent: 'vry2oyxdzfzlrlfsvng7s0ta2e2jr3vsvvrp0pjslxooyb491w6sk2ooqtujm5287xsabtclo87rjv7rwb5jm3943k6r1l4wjs3ckyxyawoyjm2r3uo1w5merde4g89zwk88iy4va4qs2ym265o492dysre8opuq',
                flowInterfaceName: 'hvc2k04swgchdozbr6nw72hjiozlez72ildqdhoix82lc765q7f3tvacijbfrr5y6yaxn4alw4adb5bs5gqokag26o70e26lpru9r7e22djsdm3f1ya6o7r91ppo4k84xo0njkhyp7z4oj1ow3gg8q2fgmrjeu1z',
                flowInterfaceNamespace: 'jg9xd6tfj46uwbsjdkcr0qcmrpmoia59eiou8opdppy06mt0emathetbjfdds22bfed7p3yb4lu00wsalmmh0gw8km9uemczdt7qdri0x8t73qpby3xb6u117jjsrm3rom8rrx7p3zy8qpch6njn0tkg1zqiljoz',
                adapterType: 'l4m9c9lbwqnjskuekom8rjry69nd2rohnlf4zm8pbbpoeaqokmvahbve2clh',
                direction: 'SENDER',
                transportProtocol: '94m8nz6hvuk1savcn145as5olyd26f2ifnfd5n3gt1je1nls8rbfnzzxo39t',
                messageProtocol: 'ffo4cnwaef9wa6hpa3x78arv5e6sv75b525r7b4n2x5j3lphu3d2xatf6yqg',
                adapterEngineName: 'ahg505lakelx79fy6wyakestrucr9kuly2jcw0gi0blxun95mmgey3ui2q9vtclonzns1k2sm76kx5lefv8gbd74jj62df8pf1nvw0ipuwgaqc73ro9v20nnxw1i3t3ak1br130ogogbn1rpk7utgl0gq8cmgr2d',
                url: '9gh3qz3z1282ckq0hma8mcxz4fyuvsdtg2rb3gwwv981w39pyh83vp931un4fzudoeznqie6fbloz0ichqhgg1deeg0umvkfl18htemtu7pshbvkydkiljtxr6i9jgnniebrz1r93sue4rjwe60nbhm4i6dutn9csa2eeedskb2gxk7kdgf0ukr2h5kp6lfrmtel4hv2cxpldtwfi1trx6yi7rs1wz5sj5qmlrjof10tr31fjq273lz7ysdn0h4bsq0rpk6sx5saiqe635lppb7wrca8z05deki1yr32mshph65mblwn0fm0rv0p96n4',
                username: 'diidzboxhrkzniwiehops8shyrwe4xaak4zzbg86x3q21kqed5pugv5io6ir',
                remoteHost: 'mzi57cuk2z3qmell9apftiepze3u4dh9n8gi9admp75ou14a1q8i5t8kyrpws1vyx8gq1limqkb7degvkxhr4s6z999y1u7tiukdk1vr217r6ypxgmukama0iuy84ez19d50xnt6th4pelyc9fa7m0u0ymj28e3o',
                remotePort: 6844110211,
                directory: 'yp44pjqpg356ipuzd56x4gkym8u36aiagbjj4yjeu3hgligl6rr5lc466oi4338iakm6yx6l5pezn97z5yc80t9guhvdwaf2ry0dl7vf1hxelk0zb7lyqlxo8btxe0jgtkwtwmnbednbjwflwzn7yalao3mtmmkdit7k9j6rev8lcn1fkjq9fu4ncssnh5o2mzr0imlypeehn646fy15a4169dq6aru1a188i4vba03wl7pv1hkmdjx8qdpjuok2ch1lg7hxiv58ls1qha5oy2yj6rfgx16nnas7awy1jlyhg2pw4g8ou3kwl0u3z10qpdwcha2why5rlpv0vw86e19oh835srddoljfr3xzqkroik51dn0njzdleh0p9790b82jif9klkahk200llb7lffky276zxl0dq1c1xa6e6pymoog4dgo6s9use7v2q4u0imgzxozutszre21tw1dyetb09i22hb3s9ef8kzx8rqtxytns90ic800r6smjoofnqvr6saobg0h6mrkv1rmnybu92sp7sqq6y4tdacwnt958818mec7beevvlfwxkr559uzmqq4ofm2u1ak5gbvltkyep3nta7of8ito8qb6b2qxze9rhnol5wsjwtc6jt2s6j3qpaiqw5tdbjv4xtphw4v0sh5jn836ba48tj1y5nh5b1wdpgo8l6yc8ztkt2pjngugb49cenqeae45akse9ha77jxtd6ryf4rnlsvlh94gwnsl3esfph7nsoafb7wzbmarepq48zzuh88ok4foq6qicuvz9rc7z2sjw3ygi1787d2snvpnq3z9ierzcoyasc2z06l0kwsbybpva29r8tz6xjkwjg18rcukcmt0s24hhparvegluom31ztgz922k4bftj5zb0bhqjcyu3iudrc9165kyw9lckpgkp9e3hfrqikcf2n4yy51tyakc5dy3ndnayrzfqklb0bohgo2z3nibsk2jw0ex3oscpj4de0v4w45061jcdyuqwlbo23',
                fileSchema: 'x3yvqb7bnvpuoks05up0psxf6ix6rcuro3d3k0vu1tr0poulhzy7p99jnmzq23bwj9bggsvv7c4ovf5qfz64xi03b03nmxci9zfmi77fhad3t9imyq4d0jg4o8n1we7uraro85d9jbpierpw9df2xhh2kwujazqrke0nm1lp9w7ovg6ep8f8ny8esbeqwklccdz39jg9vpeurdvcjnwchwbixi4euhmoaeh4z5x4nsjq94jd1vlu7o7dp79l4q4ky9lpl694y0u1cdmiz4ch3nmkfhu55h50rie6rrezkan1vg72z35iv2cmm474e2gzb8336t8pndbrg5b3lx67wxiqpz8a17cq6x7iaefjjbumlxey5n6uwrkjfea6y1qerbqz4h3vhhnrh5gwmqvtvotn5kixre476j469ntlyujasri758176wqf0m2dje2kwbmo97jee0xo1lnskt2tl03ak0ydvv552swoxrws3nipmaq2rr52zz7ol6rpkp6a2aa151hv5vze3c0ir7p9rub5hot3z4lw813jr9qvfax4noyzeuwx93pvb8f5m7hqpoleb15kex2uvb6pxbx85wglq01pfjsbd5rcab3l43fimmjtfdzsufee3y9xwr86aq8e4yoifimi431yckvmemzq6eyaknxm5iwrblbwiywarhjcocsq8qjnxxe9qy3p9k7qio2r9l7v4xu3ypfxzoadpxub1wf8oybzowjn7m380gty8vyfflxjduhka0r9kk74upgma948ddkpuvnwrs7fwsw06gga38innhyhmheyrw917b0ghwv6k471vftx9qwgcy6wk7v812a4icftw2wa8exfhnlwkbdtux844mimpeq0duv518lnbcqwn5xc38ptwdkkw74ifasuvcue2u6a5muo86kficoxysdyxwvwjji4dckb3uhk5z4lm442mvuhat1njh61uqnnud96dlzf953a2iup75j51svb18tvdlrcuelrgoquxg6br7cj',
                proxyHost: 'owegrg2dsvc1gzmzbkm7cxs04btx7akcuv0nkf9gzkcji04y5jybvlhvmqb4',
                proxyPort: 2428790887,
                destination: '36dh98872ruqdb31mubclskks22lsajwemvk4nbabetqydij33qsiuz42xb3zn2wey86mkvkfj9v49ngxeedk2ysn4s1rdzd5fthtwibsr8j04d0fdv69ul71d7q8857bxajnbvnk4lflnwgkqm4m8k95qbf0sxe',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 's07m9is5gy5nvhfp837e9gn9zonhrxbw3cf3wvgfmssnyo3e9hyrm56q2vst5c82ypaqo0pqp6ejnnlxycuq40m8lsthgomwy2zkrl2hhrh0claqi7yad0pmhxg4tpmxoxebr8komrjq88nb5f0foo28794o3mk6',
                responsibleUserAccountName: 'w1znt9531in1grkh1u3m',
                lastChangeUserAccount: '8f15f63qbahr0n699sbv',
                lastChangedAt: '2020-07-27 04:32:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: 'mjknzh4kvpi5xogfq42lyb2hmymbwio7sieyc',
                tenantCode: '1g0wlywttm72zy6fevd7ctt2z4ih2b64xq6jpze9zj71hjwwds',
                version: '8i4ecbpcewrh3trp897t',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'jpf7i5kcezb99oap5u1aug81frvp3ufpn3o8g9tvljk4d5gddrybxv5hmb82fa2m0fs3jm836gmxj8r1wxrdb25hzsl8zm6fqbu3mnmscwjuy9c7vty6q32p371jdmc5vsziyrd6sg6rc5dnjoocx846mqwmg1jk',
                component: 'joexog1qajm7cevs41evzrmv5b8rnnqwhbqysgwe5dlepgb21ukhsp3lqs326iosetbhz3gebcut9laipi76tr2xlmyjlizrbwbn239ofpnyjfq7lbl83v3s8op21rdcj2mjdn5oeoaxcjykat2e2rzq4vo2an5u',
                name: 'xsnhtksfplr3zufo3myjo59kyx7xyxkc0d0ofqhnmkkj57lywwpnxjyscel3dyttheworvznpm32zauhlp1wclksrxmgilj7k2p10m9jfnavjqnpa0j653fds7vuwbb70thdu2grirxgnb0zponshziiuhrldio4',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'mxdo9bke7nuiwukhwm6zisjteszhcaaix789gurapzhbsmy1jt7nvk5oi0e3xp455pw9hx0v9weq442ho5ymtg7j3e9cpp22017zuz98tuh9e43f91vu50e82ju83okgeyl0xl0k45bmsmp08tjytev00md4rsks',
                flowComponent: '2qd77nvqjzit8fms9ize5rykni9hyw68y6tt7wy7h04zm8bhse71cllj3pzv42mepx4a47t1n7wnhjry4vpoa5fkkpq2kvh8ny3qdmmkdtuvfs3d7ywcs25pxpo2tj71ra7pz6lvjyq9uqqem1wvfjh6i6p1e526',
                flowInterfaceName: 'l8bmdg8j1t1z4agdw1bx5rzcmw0jt36c8wcma1kql60fgluwnt8t33rltdju1wf4nmrknnz91xcj20is79gvlo1h3u824lqt7od8tl9wb3h26bauuar487gi1hs8bbb1mpg45omhw6hvr03sjavm1rkimkyyg29w',
                flowInterfaceNamespace: 'ifrhp0pp5mx518zpbjvudkmxxqwn72p2arz0qggjmg0n3a3d77fcso0otdssx1imjwyk08v5z6sn2g0ln2t8atrke7fu5m60p375kgqcm76iy66jxdhqsv5o1ogu0f5qjhz0kbo0ylzpntx4b1j2am8v0ylef4s0',
                adapterType: 'yngafgolty1ynuof284xxlhu24ddwpbeh0b6h68d7xx9au7mbp0jqc6skzhn',
                direction: 'SENDER',
                transportProtocol: '5m4eds182m1ddtchpugh208eag1pwrblazp8la1olzfpsj3iyc82svn1i4n2',
                messageProtocol: '030j2sy3z6cmpx8hz67lnn2p2q5hjsxxovw1tny484b7jdb4j0o1mm2xvuoq',
                adapterEngineName: 'v6rg3kjgxqvj8ngh1g7mbvlq1lwt7sm8rxrjawp4izqqufm0pmz4t0smi3ihs3nhfe1il0i31bxy7jkjpezuizh4c9k2c69u7itvtap45mz34lz3s038xlyesbgja9itrxdsyphexezas7l8qewr7o83u3i36mzl',
                url: 'qykmzgw9gxfn0ld5v5xwlteq9xx6ugl7dyyczh097y7c3bi3tfxmsczji7e0p9nfb8cusiwhd0fyv5fds2njue0wyu6shgvkogz416c2zpiuqqc50rxcakgyer40ku1uwpkuavxflf336k19x86pwk0d8hmfarcppxonyaeja5wieqq8hsaw8u3q5cwo8aksqbh0t64ugobs1bkk0f1ik9snmw7veoh1ikbl1igjhb9ry9ueedarntjo9b4wavfb4mwga5pxlvfoncktde3rbpt2fepfa4nexthe9nnwpvafpu3pw8uvfxc333gykspw',
                username: 'nefyhq8h3083m2gk8bnvr5t3f70h8sopmlhhlqyukow1sqxlaaek8zuzzyyk',
                remoteHost: '6s0ttwgmp6x1jqgjxtnm36kvpb6pr7edg5feadgw59idadb9n202cxxak1ae1vm1a2ai0bsadqhj7tnhpjspsczadyx2u8fut7fj52xq52rx47j9cxf7x8vwgfqib001xg8jh1c14d7gx9eg24lnram32rlftt8k',
                remotePort: 7255638788,
                directory: 'prikvqe2no4w50myfybn43jcsz5zslkqb3yown6l90skm579doki94101x9pjokzkdstuy8o1i3oljfysbe0iovy2wwslndl6nphmubhiskg1qit6xqsqai91d4qzl6wgd12rgwgnhz3z2ng4k0qy2pkskcmd7jmj57742lqe10y9ywa985luubqhic8b3f68r374hokb1tr1enravv3j439h93352e1uhqjqfgen0sqw9tfbgfe6rw8mhti554nqy1ulozk7j1di798uxin765as1r0w1op8p45b15m2ungyfy57ct8vyrreidg571cqcn8si2zt7jx6z5g9n6y7hnjj5u5cduskiwp0irgti8tswlq34q9y6zkkf4dxvf8sqr6u4xhtsbn8vrvm280fd1g1tjvnpxu1lwejgygtzx8tlgpnf059eox20ow8inrx5l4lsnmg8s3zhyup0alislgdvj5wuj9qsixl773nb0dxl73sqv7pykzv7cccn94zm7mzpfb7n97k26cyupao2rn9jw8wzt3otg9qgribwqmljrtqw2sr67q2izuw137o9asy38z7fmdxqx23hjmnlsos4cpqyerl6ghy7t0d66newuysozzmxdd5gbyyn6ovyasdecijpr7qpkri2kegfc435h8j61itkfctmb98is5svq5iv6qv5g521tc4ajwrm89yxfjmi8mvzvctv1sxf0cath8t2sfr85jbrtb9737u6qfy300ivxzfyhvzjqjttklectm8hs5vi36nwx473hxn8es5ppvzxqbc41k89vxud86n152axb7jpaovq4e6igo7w08ur2wcze8fg1cma62k8drrpnxdgkl5fa8nq5mcini7ndgh1k4oud5rmxmnw85brcitx5tozcwzavgzyl16iitl8deqnho3qhr3pat2ikut33oo7g8hlq6wlkohsnqhmtha1ofutx0s2elxd66pm0d8b2zz81ezoq3ebk6hkapv8p09fa97cu7yxcb',
                fileSchema: 'hnovhejkc7l7nhdcers2z8m6g6cj35ctiqt76l0v9ry4k7ws8s6dptsiluxz9zwyd7dn2t6e1e85a4ttjiqim3kqu8dn38s6b3uj0ork3ofcsx4zt7m824x0az6d0uiicitboo06mq62cfw7k0fu0muk7qtioaarzkkc0ldxac14jnpv81v2oyigjxquz02vxkgn89scros4z1b1lx7s11o5il7c02y5edy1giouf1pp4p2hgreqp8j3cz4yb94dkzlrrb6aq4tl2xdasgu6aiem5498ooa4z1yi970wsnnt5ewqetrg5obupgs6hng2kwzqup033051sa6fo3ycnuef7533e3go460eb3r4txut71hlzmgyuhya1k3fds15svzwjhnvsr9ls5h0wltm4di6f2s2wv44cvgb5ktammfos34pg7x05x8egawew0gvr4kz7ltvrkjdn335l5t14erlg0ounaii7tvbjr1ofnpsh95syqyt8fvve02onoxiq6cwp7coxs8wwneqvfk3lvijqx8jnpwp398sw90ouu65in7177kvw3dbleqz53b11tzc4ngetbn9dhd0f2j6fdo20q6dgz5k7gccwssd0lfzetyjehtq8zi8fvs66hq9cdaaptk9sovn842wup53rvx2ckwmga47a1szthkz6mffhj78oetzal40y5phn2m6ehc9sn7ueo6iscuw51j67jbbp8m34t4onzs51sb2nqt8kbo8wnleo2krswy9uim3okujejk9no44z1q24m1e2x921jyvke784w7n1keprs4wxlcw4a4iqaqg9l5uglw5rt8478odi02jpr87829gwuzw0uvzdt3d5ji8w4ltur3uw4j5sx99y4cqnickaxnvaw7qyy8rqh6hja0m0oie29mn9koo7i2cgaabdovm7vchy57s51ekbbq3vxic89xdguv3z5rmxx36rjygpmdi3gdeducmjrr5f36pi8f217mw45ey0jvb8zssk988nwn5',
                proxyHost: '3mocr5ih8xx45y376vuswsvjyybp2h2nvenndz5o9buwtdhovik0h05dhoih',
                proxyPort: 9622783432,
                destination: 'v7cm1pvr8bgrzr0hjb0lgp8ttzjdvrbhe2e613dl3ouxmcltc9l2lvnzeuxccqdhxz6vvp6fr75k8vd8dhbzwjud916j0oymdgk4p34j48ixrhjq8r44i2z2im34zuooblfqo23mm4pfkcbgtkkmie7auq7r5ji1',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'zmvzpxtjazr6hpyb3d6avrci5hl1pln9oob9zplr4wcplzstw85ivl7c2dn89gty7jgr3r54cagig8fxlsx1rbe70svei0zfshympna4w71x8zss3aqvcebff7afb65bxn0dtd9ja2weal0yck77rpv0essmyyo8',
                responsibleUserAccountName: 'mki2vsie1kxy1qvw189t',
                lastChangeUserAccount: 'z0150dj4b84vpgpd85z4',
                lastChangedAt: '2020-07-27 04:33:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: '2ly9ikv9goammqhogsi252nikd985ypm4d6dhulg0p0ow5cp5w',
                version: 'k25xbx94s8sbprc2x9j0',
                systemId: 'hud2l87s0qvi6shjlloat5dwl9p9p47io4h5r',
                party: 'e5i88tjtjzlijdamgxn7f3iv9wuu9utnnra97eu3ozuztud1cumb1u1y1a11p7tyygkcu85348awpq1zti7ysksynyt27g73ah6v0tbcgqpkq8wjc3mcbthfddff69csvc5pl1ciy43jol7vahn3s3nz9q2cqjzd',
                component: '5yc91mp9uxfsmptwcm78yo1kancy25fwr95k4sudfmp6o61y6mkuk8aq8kg3fu1v036cvlqc4o2916s7osrp57sfospmym0fcak3tk65qr9odmoxdim9zj2aqg7v8sajxt9yl0vybvgxbovrd3238we3v4d4f0xt',
                name: 'lszv07dvygarszjxxl1n4a1ax62wruyifj5lz0anlu1514qhx9szt9jkr4g0cnkx7one4v20x14qrxspuystn3tf44re5wmeonrb2btczsnkv7cc0f4l251fwpygg9huge4syjxhv3cbcwbchpozy9ku1hrk7f74',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: '85cvha6akcz1nt2qcso688b4j31qzb1payhet4n1ojfu5rcr5zjfedrbn3lr9tdkbv6ckke991a1p6pv7dxfbzpn4dsp6q37eprzrc90db5fuztq2kluvenf02o454dpsgy7t8f373cq91520h08wfyfa2gd0rtc',
                flowComponent: 'qt12jq1omyw0lxojdgh8nikj65eva5syjy2lccw89yclu8ihrtcnn987rzy56gn3n5lrykt5pd84xim22xjlkw4gzcpvnvsxtmxyh86wklpbauiqqb7gn90r0xqjj6kqc739djkkqzcbj6nlz8yt5fl0km9aqvsw',
                flowInterfaceName: 'lq9kvlz1y410vzabyzgcyqafz2k3vhnwbhzw63y01mrv0jh2kplq9daprxzrqunf1xgxz20wi8lkz75q33hl4p0xcpmx0p2n0mo85wvk4bq28fegn8ebcgwdch3dl36mresi8e337qf5g8hdskmz3zgqcbq3tkka',
                flowInterfaceNamespace: 'grvpljvtc6kcti09evfh4v22w6urnz9xl9iw4mrhhtnyiujbl7pl8gt4z5eao0eubnx5k33kd2ou2cr918isl9g2wflhyjsdtd4auapbtlnz8d9g7ib0x5638yb9eoahiquh1emstcs7ra9cza6ypu6c3hva7t38',
                adapterType: 'b3k53emfzwjva3z6cgfl1kr8u2jidnsmn23ddxvg5gtvzwkp14e2oox5oxok',
                direction: 'RECEIVER',
                transportProtocol: '4kly6b19yamdlzdrkwywnxm14m8gdrn0tip6ysw26pp7nzls6zxqsu31e5uw',
                messageProtocol: 'be2sirm3t3mkzehd56h5e68d592k2406l2aapqtwqbcw6rhmthwrn5441x62',
                adapterEngineName: 'alomfxvgyrnnknwm2r97dhhfndqvoy09ot0k6uq41sjk6kiu72lm231mcnm7t92wdte1dvd8u9p7tgoqyfbawtrkr4infiii7zgt9qbbhkgld7v8qsom09b7q70h5aqx8ouxkqdb730t922547jhxzlk6sstblls',
                url: '6xh13j8bb5jsm9go8h9g2a5rwzfhmsra1vwdxb4hkr1zoaxi0xzgz216msdf4iu99aspsuejefnkhp95mlzlp2sq3nx2m6q4g5clhfcw49ooetaq6joyisb7wo9bq4rpl18odsq3b9hi3rsntl7osvs5fqga2nlohnqacndaorq4zf8c7nlqextfx5qrp9mox6b9lyt46xu665nvtaasljic5ix16hzvnf8z1xvtvc8tikp1uu61bpm2d4w8nadl5blmlhe1391pspxwnfbrgdred3a8na0uxt9l8xpmf18q70f3tb5egcug3j2unvlx',
                username: 'godvq2aeqmslmpjqg1479tgpooswesa8hovgunawf2st7z7oizrv213zh49v',
                remoteHost: 'mq4qtnvc6nt1tex8dz9hh8feu49wi2l2f1cjtsqramsknfahgqxdt6an3ownfsbpr9rmcge0a465ph3bthpd31glinzt9q8jmyw329s9rpfuyhq6ncigalvb3q0up9qdevko71f253nageiwms1u9wdmnx36kkkp',
                remotePort: 8628266448,
                directory: '9acg8mljxdhh5auhq0h2iwvg2rzc9j410fcqpcj1d8wpk7h3ciux4tby26uildgwltsrniq7g1i55vgv7lecbae44uk2ughzgw406eq87yo123uea4t84mjy2hqvkt0qcdflygsad3r2suis50io0re4kqzbr3cbcry9pfnkfqsgufcean4x6ezk7ba7df5h0q500y49oy64wscpoeyz85bzluo1mkyupc4lzwixmbbyrhlteys4ckuipwp9u7ki7lflb9j75ncgf6r3herhvxcvginmceujjwuoj24hj483mkb7ehkrc7o80m8lzr8xjcml4ul628xiqebff0vfgs6s1itn9iqiaabtpaxvoui2fntuhtn3x43yatt9fz8uegodti8e4lvm77y9ssdqbhtxar1bdoqqizd72gfu1jnw1lee6zggo3q4p3vtan7una7saxfpw3q6nomyh278an6f0du6ahdhupmy0vl4olrsnot3053sb5x54f6w3za6sct0svfepjk14ad97h9olvzk5asgsvnpn0kwjf6rmiu89vzjlyzpgvlyobl03vlh50nb4m1d07a1wm30b3tlcdjf4yzp9f1xvg8dtdgdfjdkl80dgwzkwrlilb0p5x0ddxr9s97er8cqab96nb20cwfg2wilas0k0t8i22ijlxt2mrzt3gu2k8u3rfzkwylo785c2xupcq8rahmvmm862kr8g4392a24aon9vczz6jdw6w8vlevi6twpbbjiodqruuv50sqdy0kk1buwevovihu5zw1kcokdb5o6u1yhsmxjf7aqfdvewnnx74c7sq9d6wnu3xyff2jh944j6alyd4saxqtznn64rs8y8rhula1xm5b9tbef48t5j2voo238gqxo2bzrqw0ido7z3iz76fmf1f0v3pn4kd0nwr36ne2i6pwvjc9dbz535gbae7no7nlv79lz43k3ycviz8hgrpm6jc28r62l41qt82d9b5epje1qjnz1cpjzclovw80e',
                fileSchema: 'hwtzbn7degq5fn2s01wcsr1102978uknmiyv6w4aj3ih4o7io4zd1slah91bhtwj66hwgbzedcinx1a7vk4w0bzv92o66azs1hjbojqxkum01evcu6360wskdr2u6214mvx14m6nau8qly9e0afuzqqmlsvoqaem29zkriryp1efmhmx3byayn6eyl4w9kqbdcmw9yf8n7tttqc5o0n9hnbyfhyn6uvom3c4hubkx6c0mk1bcq3yf7jjej6z3tpnesbe2s0nmrnho45lg8jmmxnyapln5vr0xq6n607fsh6vbo1qwc8k8ds0s2b9hzvbzczp0izbon8fj9q8ytqywj0fne6ptwirjeop6p651qb8ox1h4z182jujrzn6a27rzjhvz3v6v0fl0xzel6s2fs2mes3d0cjsvdswvbzpox9snrcligofkrm4n74w4yufgbs6ympc26kohtjan4jas3su6th2jgv0wgyahom6cqnn3xo59n62vrv2ziqja0o9ayo3b75zs6lislpqdnymzmcyvpcag7v3dixx1rr8zjrn0q7m36uaaixsc7idr4pigh1qfjx6i0j36chjzr6dkuah82l479g8olnrfrnn4j3zl9lwct9djwgrmhxx44yzotf6f9jkx8o2bb3lfbsjar64ij4fr438d5szlopy3ksctqdlfyepoqfs3l26qdli69me1z17uvabx6i171bwkd6np9y9p4wrhvgh4otppdqop5jiktub556dxi4tuhlugh3dwczf9fkarog688hpgwmqk87vg6oqe3fcbvl8spk636dywhjm6ex6phu48iumtc6xad8rr0uwacyfutqnlu71zg7yh0pgae4t5g74ngz5jydyxuvqdqvcs9y9b8fzkf8723hnnypb6ei5cwaa123zhgk0vx6p7olro8oxryz9djytavuy7i3c88z7fh602wv6z561o74d549dmbp143wm9845ln177gjf4r1u0osf1x64vy9ir107orcf6yw1',
                proxyHost: 'mjnz0wvic9tyvxj816srj6g9gb1iityfsvemi9c47gugd6ny0joshd3ogyxw',
                proxyPort: 9565158970,
                destination: 'swypjg6y326fqhlqrgb79gnh6fs9zymeegjadl45yywgvy6j9yy8za9aypzdo8gnd2l2hd3d5plk0n34wpgwh5o1zcz4eswuw74ypiha2avstnzyw4vt1mthoizev0tkotn25bhvau5vjf6695z2d780flx8robn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '2fn8wkgtmlsoxuwdwvuwvirf19ntnr9ib49xxreoo45f3xyoz8qy8hnb4bf7cy0uaet9nymx8aeyevip8iq3kz9p60qc44ewceuvh6fk6jf51i73ngxuub1299n30fbvt8fyonmqkcn7ql7hhrbfiuw328gy9eve',
                responsibleUserAccountName: 'xzkn9vgszre497aofzwb',
                lastChangeUserAccount: 'uhad93ivdhsgx8m8extb',
                lastChangedAt: '2020-07-26 18:16:41',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'zd219me6s0md0dv75yl6gnsd0cgeyqv17la6k6bhmusbjrt8ea',
                version: 'pt5uk2i4fdwsn3jddha6',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'adijtqjclug7ff0v2mo1za5o4vg3th7umibw07fbki9y5tu0x6nbr1kz5y23uorpq219fmqmapkv510gwfnr2c27zvra51sbui2sl5k40o204jzmwy1a95s78lcxsqr4ybg03j9b3yd6gu4lc38i33pyamsk9y2c',
                component: 'p91vfv826py1o2w7uk8s4y5ie7llefkfx5allnhnsgjgb27w8au2j66wfbd0iqs3boaw5e376h428sxgg6k5w3a44p3u88jhh9bxusrxi514mtcasbks6z03qvuo58uybjx3k3d4ux9z6bvxdr8tmbn8e4ai7zau',
                name: 'cw0jy868i0vef6e384o1j2op9n5ih8wt4uwnno4j9nzmvamzyoz9vgezp03hj7ugtmch5infjc9qqb37vx00g2lnqfvuv116o5rvq7syt5nm6hkansm10l9jcfg2a2y2b6ennk6pbqygd6yo8fkil1sv6dj6fxfw',
                flowId: 'dosj375povuac228zzk69v5m7zlddkjfq28b8',
                flowParty: '2ppauh23zem5zxzd0qmw5lu6kwauph7i5huihc5lcepion2swusnpcq775897wmngscqoe924dx3nv7ny6p0v1k22wbb7hk6cgh7dp6yxp1ja0kspfi74inydh6yci4ju31fs03y8bgblzy5atc5o6m428scklxf',
                flowComponent: 'nbob85shpmpgisz07dut6sob5y0k5wdf551bdef13kh5yz1eg3zbh5xjz4p7qlmh8rdiw6b7oayiazpcd736771k8z89xii5qdr09z3x35ozfhnokuzyt65gkh28pi1kynely5euj3zyjsq4cj4mt06n00jdodje',
                flowInterfaceName: 'ntldjo2cd0ohw77x829w9z7cxt7is0mwqx5u7wxoxjw0e6ttf61dx251f241jrlaydcv3b4908ojiadqdjk073ad08pxk0qa4y3qydjiml6077c7ctcaxtr4qs3d9vxyyrjoze7pn8kll2ca346r5zcszeckuh5s',
                flowInterfaceNamespace: 'eb01frevrko001iutaaqmwnpvpj277w5gxh8art0iycwfk75bs55ehy8xs84vo2w1ne12r69471m4vn8a6dpfxzgxso2r204i42mr1gizchighee5ofpnwgbzb88rmmuvsbso5ylmjc2ocdsgda973h9x1394180',
                adapterType: 's1odt53rq8xavmyc7rg7rde5gqqx1iz9q4j8h019pumaz1hcat4zgdzksx8b',
                direction: 'SENDER',
                transportProtocol: 'gry0napk6tgfmjnwdlo5fxb7mqsqui5sqn10rnvy3kw0pmdyekazwdm3xee4',
                messageProtocol: 'nh6zeid7rs448xklmkyne8lizfomay68443in0y3vucfx6ouxjs7pc9qrqao',
                adapterEngineName: 'vrbx6rs10j4kl40nran427oka1jqvyzw2rm322rygtl5bxo0tx5aiqwodhb2twb0jqw8v5csjznkoymycfzd9p0vna60f87qh9u20uwzt0ion1u8uysa985cavj49alifuxj3yhov337zmjo2ikwlclc4j8ii39i',
                url: 'w6b4ud0ikpwavg99yef3wv4kobaogdxluz7sr1gyfnd937kwwscwiiki9wqfauzgrbo5wvzz4rdpbbyuume9hvn21a7dpwkm3yb48fexuqgds0t711janqxu88ahwnimwln75k3wtcbo3shceexkh5plge3x9ygbjc8hnwftn9elcu8vo8vm1nchim27rlka9xjbw12j22la6purkjau0oi0iyspcsaj6vwu2hiue1t41u3pbdm0mzhi6ss4px256r1b927a0z9yk7dgkjb8gbvk8z3eauj1vqei7usvodtyyek284om50vn76s8rj7r',
                username: 'eyl4jlm9ix2icoiwul3eun8nhen37cw2kufwwx5rx08byxm7gp67tvzh6fsp',
                remoteHost: '760kf34dtz9pmtexktv7rmmmy1lbsijwfecelihlo0fk3bda1i9bym0pel5mempu2o8o3c8jsig3uqu2zmj9g3w7yjpwhnqxlo11pvlqphulup8c4saafoi3dzehki9djrqmuvb9r2tvfblgmoptvzwpoklifzd7',
                remotePort: 1171686755,
                directory: '8dceqc74mp19a1tj8u61r8a5u951zn2tx7adh1xdirmh1sh28elpge75j6o3r1mbqdqdj202nu9y4z3bqxve8u26rznbr7kapoh5pbof62ce61q496uesj3p88su0ghxyvak1rokkqb615x6mhf2aikekaj6ejfgj959hn2fzh7g28ik89ij3r0nldm3xjwy4wafertnuyv7j8721kd2xg974a0fu59xktw3zzevb20ujixlu8rsvz3yiu4yswc9wc8j9mv7zeqvwnbigj75b8djfoab3l91rj148i74pspcc302et0daar0lh2a7904usimpd6hsdm9sq7ihv2yluoyf6gzdhxth0qs55iwvn70dpi5q52d40c2urgv9na43knet7o1zng6ebfjl2tdwm4278gds14f48at0xtnxob17nqat0zbtmrr4bhxds2hpi3jenrz6ub7j4m6z13y9nuvyhcevp24hgs1nccyj0n14hwli090fc2einqz9s5v9bpdxuedpbzfno3yu8g2wgukuah40nxur3gc7lrbpwl17q0y0md6lh46s7mka39t8iudokhlr8265k4j0uuzs0u2d68e1s8i6kiwzoynkqamxuiyioiqvl642qogooot65ir8tlpr1peb0odqn55vf4bg4v3aqt5ztwzestu6uslezdwi6mzvy0wjprhrtahi0uoqvy408scxfrj53b9qwdgrkd2m00x9uqss8hk1ivvts9bk347b03s9a170hifrl3akjtb9tija773rbqocrn4djargn4688ip2b5lixlbimcfumenm5w5lnqcr2ruazwbd7bn3jp5s5eva4i7psu54i05bnlrfrod147lineh39nr0fx8nxhc2udrdyalj3u5uolwbyjggdjb18ykvbvxyyfriu17p5d8ssqotn7og10oswomtoj0oawfmgfrlccdakjuowt9zizircg87uddcolinn7fhlh8uhh31h9s8ub2e56qnrp4wtwz18uq',
                fileSchema: 'ntonelbnimzg125jxwegylqlzbtzouryg6apyvw2g0cb0vspm3pwsmr0uhpegbw45w2rv9yjtcbw6yl1g9e77bsribt5uept6m73n8q7ewvj6si2yciw8jagyujvnowhq9rby4h4sczws5h1rm4hwzyyrp67uvkmwebtf12cu3oum2ighk2dqxa6bs1k3r0x07lavgldljahreroub58itc0ls05xidyaiv9rytvyosr1w1rngjrr53nt7f8mhhsujs2gacjpi3bxd1sklb2nhu1j41ctrux1rwvqmgv60b8gfw8db712fiu9nq9b8jsfvhmviay4og3vmu5t6y06qjxnsgve1umdmgpto925f8oubojy7x9v9qtf8oap2bov1zr6truo4tpa4a6ku7zzibaa47xgatrcvy7few3f4qtktj8rcqszhy2mw9pb2rvoqk5u8spj1wrv87vigzgwjoeb6ygcxu1qp6znqa5ec56ra7z6pve4akegvh849vsnu9slezkoqyq6bxqiobggbqrij3a9g5y819y5to5vl10wg9bhbvk0x18llhjeh7vutri6lugrfvhec1gwttpf478515x2zw2bp8d41kvh4usvp3ar9ed6yswcku90pvycw7slmhw9m6ide6skvsz2gl0by1wiup2g0v719mz4o0d8v2ndhrp723nazfb01p0vt3nh1jxuv3s9pc5mivet6ubyxi7nsjrwhljjcqu4a3lsf83ryfvac70dwwqpnpb1kjozo7ri95yl1dr9wllktrg69dcfv5fdxednanr68snppg6po6l9u00polme6af7wt5hj1leucnbzzs4ad27g171l2pqpautvraluzv2jca0i2ib145e9d1j1j91hh11jvfxl8tndc2d35pixw6ik620guiywth0pscif01xlcq2d9axo4wdj0mx0jcn9qn2j1mnp1wd3vnbu2va6xjwia2l2g9yhc86kguet66v1hcrmkmwyo9n1r63b1jfcd2',
                proxyHost: 'piddwemqydpx9n03aw5alg7xnswyhiwso70o10f6hx6mh8fp2xnrl2poqooq',
                proxyPort: 1096285453,
                destination: '5m0jb551owd7x67nlxifquwqv2tl9lnzsl0jlho58jnirg46ot6ohyziantpq307hynnof1od7xh10jq6wmzk7y02xtsgxbh7w1jcujx3lmag4lg8ltufgfbj4x1clzwbal2lo5e8tr0ntty02qbokq2yezy3usv',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '852t40p5hegw2t8fjiek45j1v30di04g7gctt086v8dwg3yd5cotqfuxp3667r11pi9fdf16l3kcjn04gfmnn3eaessbc37xrjdk0svuyjciagztcfvd63xmtz5ok6py4ptrap215nhk61w37233xthx7v8g4ham',
                responsibleUserAccountName: 'w9xda0g4247e692ralav',
                lastChangeUserAccount: 'br3qwtwvg1q523lo4uct',
                lastChangedAt: '2020-07-27 01:53:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'wg1jb82krgavsbzdwsuykkyquoxsr9kzldj5ut9imhmhq2zc7r0',
                version: 'dk1k5yf7agpvagbsy2k7',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'v1xug570dgpbr6m59mgyfnrzmplfarch54ug0ej4zyya6u8slhbhgmggc3jxljf06lmr6b6u881bggl1km7il6vn29kb3tlflvv6yxzehpkjhzgd365fnqhaoms4ug1k42lu119n54t1564pdhd5va0xia411ez6',
                component: 'dk46b5k881wuhkoeop2zqpah5hy5yprid7xegxuwolfvlibr2jjy3kkr3bo86n2tn4ygcn0vnlzqn3jv1d4o4texe942ezhe38d4wbpki5a4c26zby7g6eip3fv1gvotwzifqjf945km04ryuo3ucnp9xmu0bv2b',
                name: 'zna2gjtoz9f3clvi5u3ongmsm4j8ztmoq3kkhtojusfofzgag9a8cgbmfpa83bucwczovw52f6kedbi606j12t6a1y0x426g8ftwo9lx9auswo61fp9pf2bg6zvrgxzn3gb7qxlzuauphlx6ygd1wxa7len56zz2',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: '6q8mujb7fq6yhz3g5htj5hh6ohamf4itmmwxeu3jlye4ze14ffor6l35rbj65s2htg4y8ch037cmur2gn1j7wvbt8dfpkjqwtlypt9j8q4ddka2ccm9us0vffcvfgoblaf0wi8epbli0is841sqd93nea74jp1uh',
                flowComponent: 'brq2y9400dv5nxwn5pv5m8bn7slab6rycog3vqn91pkcso2cytg8wvn3rm3dcyxpkbn9561wyp735v6izcnw0x4r69z389pqhywan2gki04o42uoc7tflhx5mjqbdfk7pxgoiqyhm94kh7rq1re1umj836xwhgj0',
                flowInterfaceName: 'vu9glqszyhdfiy6cm7oj47v3jg7edzl5kpeum4yoskhmlc8zup93iuo1zgygdin7mcdr1hanyaklhwnppq8epn9ak5podbidzv6nzscesit0102ogotari5ed0nwzdni855c1ovhfkgbo5dgje533yc0xkrvssee',
                flowInterfaceNamespace: 'bsz9bwoo89tjx1fjla2m42134w1rsg4p6vxlyfcu31fsb5iv5dbthivyt87nktbprexdl9xanawzwpvm2tjaunu1crrnrzf1gckasgjku78r4iypf8j4k7odv1r2xdvt97t1o2x9mtkzomkeds9604ioq2w7bfny',
                adapterType: 'yreha4ssc8qzz2098vuw3jconaudh8bzcc7whrt98cqxtga1cffgp0xzey6o',
                direction: 'SENDER',
                transportProtocol: 'hvv658od9gfn8i67rhq2rjufqm28smxkx17li1yi0fx3gtyzre7me2vi3t4l',
                messageProtocol: 'z4fsmr4ffme7tyyg9hgbzd6eugahck9y9c5dftbmiwda886uxfan24xs9xlu',
                adapterEngineName: 'e2uwla87chs9ziam50q2ar9csalek5rwdepxsk1fe7hed3xezjnie5amdt2i5pucyvaq4og82zjt7fmpdqmo3dvzfc1tx5wfmr11bbgek0lgf6uw5gvydklnrudjnix717tjz8vut9ax4rulzybyh3a1y0aj82k0',
                url: 'atji1m30bv4i24i3ofpgn8jt52k7ian5nmop41ne7pd9sxrrrsyxyc20uav00v6g7m5njq1i0bv9b0uqj5dpsky7xvt7qhbo2h0ld63y03nlij6lptfr8ufq0va7mv0oxutzbilm6tpbxn65d9u9mirpspqxghwxs2xc4e89k61vxo3mnsqtsgq9vabt7p9g5cotu57c9fr2zjohxy3fxivf69032n9ph460dklpdxtiawj9ywk9emflxp6u8bti68y7xdamk287sqpya52mtnb1y3aujkpm20f1itky4q55bwkj9l5z9rwmhicrdr8d',
                username: 'adc3cdnl47yu52ihnehfz435tx1u5js5peie4uiaod030ofsffnf6oiwdsos',
                remoteHost: 'vj4te4tq2y6ki4s278n91eno43hzjpt0fa60tz44bxqb8iz9bh8ca9r0u4rtxu6dg0kujdz6yemu35fssx3ru6oq4ja77nkt4c7i94kpmclu0nvsk9k59mpnr3451858edjd662xv4lbzlh2ds4ogh5tgu28suju',
                remotePort: 7668708282,
                directory: 'kev6t67xr6c1x618mcx6d5fd86kp78qb72o6s3afnuorjhuy054kjmawkia11g6zt2ifantjal68cgfvwisrld5v4rzqttgrgy8ygogq01pymw9usmyko0rjvta30gk2hav5jex4ehlfpzyzdrv4z6iy6cpd9f5pen75gmd6oklpz69wcava29164c93azblrpoam7pmxuhihogwgeupd7fjwtf7hoob7kklow5zeh04ul4lajrktmgi7bdt2129qeyphyo9mn6is8fxu2p6atxswhapsxc79iei74itmxeepq48wjrcnbibpczwpsfmlinygftqlylvpc2mqmidtediqnvs2amn896o5453hlx02bcfww16hbfdeneft6ep2whqov5ms4jxeq1booh678bnwk1dikj24g4mh0jq5exz7vomt2tk1x1jwj4wizh89mylk43oci5t51ybhydicd9iz7bgvy0emw5b76it4oid2a16n788ee08lx5afd1m3c7gj0duruekfr9ukjlh9jwmqa7x1glz3mi4nyu63mc1f5aqtmjbueeuoot2vehs0g74sd5b5oqt8jqj83no676cj1ayujc84ttrj2b6d1tpobnnecitdm91he4776nh6qr9rw7go2q3u4mp3hjm2pywih0u13pgv2fo12wifpzuyhkb894wbur890z28on6qfqtzlbfrx6vkuanh3h482fdp3cxf48gs0odkwusjm25z8a24ni6m0j2ivdcsga31k7nmzqfpgz36a4jn0laesisat5jyb3jbufvzdww7uus57knga1vwohl2img1zy8wvdlqn5txgxspi7avljcrn5p1qz30cwmhm8em39i94d2b262157k8ul8hpc7fnm8hex5usjj89l0fp0r1cbf8rga3uj5ycuav9nnww3g314d55n3qbd1wcafmmxwewgwypv4x5ldit9rtb6oa8vfz1bxgvqw3cljtq5n9papkao2b7h7b5mxe61mamf04jnr',
                fileSchema: '5lvgai5xsmlw53xg8d8spjpjmmk2rnnosm26ekk4w65nx3xl4lqoo0dhhsj6x670g2ywmyob6dv5is6hm03o180tp3nvu3jbhm6ss510452u5vxikxqpir43g8in4nkt5jg4d78hzpr9q5d9mg5ba22hxqdb34bmpgl392swcteizc9z29srvnd6o1f5ut0wc23zxuaptna0yibh9dig6e44slcind2eizl5tamcuotlf0brgwc555onx5e0fle3tiybiinhbe3ew4mkqg7nbe0miomgkuvm0uqwuqqqwnyr1g0si0hdw1q3wcsfcdm86gz88sjvzrvohwwkel80mpycwwcc568p6ueni8147sdhsc2bxmtdwy8dnnf21r3mlqbverhm3xr4bgb3v8zkzcwjir2he5utiiwshu72z1ho0ww74x3d79dma84gzzou1k3ygx6oz1jgzdknpmzx3vio3wope9n6q1q6h2dc2s1k307lvstrdtu3qkaf9bkqwo02fslr230pkgu8vc7ghdr112iccs1402nwahumj721ahdxdfi44991etiaeazno5zm7xpoj62p4yzms1jdlefiana1hctoj4zpcghredj16mhthsp6es82yw3noa61ajwskunb2go5clz2e6ax0rk9d8okh9lj2d1akkrfbd8lswlxe7qcgnuy9j89j5k6lrb5wyywru8u5avwsng98at5fiph1d7pthegq51f83dfuy0jgzo1dc3947ookxk3zpxlljx4zb3wby18i9pmdnp8ahjrar7358j29iyt4cuodcn7qgxtcc9b1ljvkxs5jqkbn4lbiks2xwfnhp0o8xvis356090f76wcqs5nv27glmu29wwomrgyhxg8v0lsb363cyer5yb7ktbuvbryqjbinu1f7u3owx8s7ni86xe0wrhpwfj6dznqm0ker1584mvxzxp1fb1fbwo500f93qjb847b3ium03iujbi4e910a9m02mhizi8665tgn78v',
                proxyHost: '2f4gmdda43umynd29aoyb77zibe1sfm8uw7jffm8st96vgoq4rg3dwgqusfo',
                proxyPort: 9770158672,
                destination: 'rbxue1o47nywvtrjfvy3sb6223y2532uu174cr8jgl1qyp8p4kldchcak0b69g3oobafnlsli3zj9msc2os94gwwx1asgbg1gznqdm49nh6keu5avc1gv95pvhqig84pj5iu2exse1ofuecsizvx8vq7z7yw6hnw',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'tu4wlfax19ir4ck8pvgwvi4keo1wj81n8evi6gky4gmhn5wjp3b6wqnwxatrx9okeiuuizl6h4e6unxzbo23um7fr73kskkuax2bktsu3kodhlei4lb6kcz3pc8mdmbj8ibz7auw4v6587i9phg0brf17t1frbvc',
                responsibleUserAccountName: '1ok2dv4afgt9w9y9o4f0',
                lastChangeUserAccount: '843219jh9y5zbewscmi8',
                lastChangedAt: '2020-07-27 09:23:46',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'em1gwuu93tumhmjnzq54eqzshu0bt91kfepp1s6w3quz7hu92r',
                version: 'zcfmsz47l4fjp8roo1cow',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: '9ftqk0rjg1l17tnrht4se45zx8hne046vu6dctlfamdtk15kqnyshmwnzi8egqocpvasnjhcke64r5w09fdvq2w7q4jwna9k8dxamazo6i5wn3wih944kzstbdzymjpvjzzx6jx2c1ht28aqfhtpgfe90z8jxkul',
                component: '518qorracdwni8u7g52zmklt5pkoxo9lnrtm04oc75q40y6j4f3q9z9eey2cx08mls6kdcwttgcq0irtdz05qx2aiuc5lqfimqfkpux4jj12bxh70il7perc78oev0hj8u4q4qh35m0rnpvpalw7i02pmubf16rc',
                name: 'zv9n3g0dttnj2xv5l6ptmlqcwdcirtkw0biict7mxfaapqcexbp5if02iomrxb49q1ejt9yu5fhxdddatsv4sgb41t123jz0ivu7c0s4a62pa1gy9x7oztwwkbaab51h1m7mbh7itktsppcabv1v7yor4uwq8db1',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'o1v4hrgw5vrwffjhs9zrp7rijgiogy08bbejrto672izxjheg7uze2ptr9hjlqxmdxk1z1mg3t928hbqwuc1z4dsr4a7fjrdf7rlnulf63bnm3um19befxombamad7i9toxyducg96xvbxc5yqe1tjn0ii0wiok6',
                flowComponent: 'ms7j7dqsc4jqpotjjixtdmemrjy7e424z554dnizy7otyrbngyf1rjnv26nz4figdustc8pc1qkygy7nhlmnn5afveh7f4ktoxv2qgvz8f55o05r6rxxo1d8mnunlhubm6j958e9onoemac4tvrskg3wf5ak3k45',
                flowInterfaceName: 'zbhzw8h1iiez4oekqjwpfsayis3ahhlisorntsa5msffaiglh5yv8hh7v5mrljo4bo4kkatorutx4dmri63jtdsbpfb5chhtreitlg4f8gyzmim57mog2kxxllwo76h9un9f5akon5hk79zdwtwj5x87uql1w7r0',
                flowInterfaceNamespace: 'gry558i4gy0n7itqvmuevrp8rg8g83ywmfrjl6u34r22pzs6v0jhexltwu42rqeszic4561l6xyo427v71nltfexptznwp754qtw5dr9apzdekcxbcfie1dyjezg0nnok32524zgko77i7ahmhujgpzy6heft3b8',
                adapterType: 'uln1zfto3vn86md2h5tlxntkmjm8rx61t969zqf24kqsnlibz0te6xrmcl6d',
                direction: 'RECEIVER',
                transportProtocol: 'pmofddajuor0613bv59qcj5yjaav4u641xtclz0v6cq7ajh2kni8o5ekushh',
                messageProtocol: 'jt7zrt7cbr92ay6ccx1q42cf80xvqg0oufsnydxp7m84ztt2kjh16u3l7apc',
                adapterEngineName: 'ugo3ljw0ny7fzyd88ovywmqu0z7t0aaeibfv906m8tecobdaa5jljluhlaw1srg46l85bluiqvdiq9q273tl8q9h9xn6wvwa0qiketmd59461587w03vpl4vep6xwwrei7d8fb2x3looogl54cwya8yocc90vmvo',
                url: 'll6hl4u5dezu842nkxbldxitkik1igu8xbarrd2w4n9gtzcb8adghr6yyvdoookj1om45dwnoi8xgct5azc4k0zqt2irrun1eek1cmg3l2gz184rrat6mr2ix9v0zmang8yli1l9jqih06t9r59za9qnn4nvr7d6v47cyd57z7yu685lgg706tzxwyu4dkzksbm85d2kmcdlmx290jveey4rv6u8g1lfhtvuhcrimyzn9loc3pcxwqzervqlgp4twz73a7anagyujthyhk5wppsucl2064qcolh5tdl08l4gravsvqj47q9e0bul20nw',
                username: 'od81mfr13q9c827oza9sq0n6xhcoeatwg9urw8scs7yi7315k2vmcnvirobe',
                remoteHost: '26otgiwaaemoff761ift0cdrzwkhia7pg7y440rffi0nlaygfb9j5wvoyt7f133xcm1hcka1al0ud6j6fu2ut4yzmogajmt7ji68elw36zd9i1dgt1rsophcjvwaqiyg6676ksvfpbywbsu0xc8jnrzjycojwe6g',
                remotePort: 7323261002,
                directory: 'p9ehgs89or6vksic2waepi1mkgjigng1kueeds1qwlp21lwzrab2gribs0juks4vk1lwoxahtpsswm5rthisavbnu8jlhjogpj7nut79917bkcevudca4vo9c4rli9nl3zz6z3q9em6j0gtla5m8u3h72fydq1l2j17cp8vu6f2to0ifk1vqa6xqd6ax7oecjqmkxb40wsk9gud3otz9ub8xinecaqdr1o621r5mqvi1wrstfo5vp0ylvcni9guw3dd467n5k73f326be8jyrimq0aatkwt1rw2lzgkb9hnwm4o6yaycxcsf8j8ats4kzhkvlxlyxtmm252vucclgbyee4uklcd99g9mczt9lyrvdb4iu5yzzr8fzgx36gns9odmxtchpuadkhuhdh618o0692q9obe54prsb161s679bjpokeqvxby4pv30x6dspf5vij105i3m0ofztaq42nss3bbonbseve06151bje40kbm2qhvn9rtmw0xb0gqkewgqmnvxemssjvt0aeqg73kze0k1b7kk8zzltg5c35zjfcsdpcjnbe1bp8dzpq0gy8p6s1uylfsku79p8xu6xm8opxigyr6is0kle32wb9y78zr0b4e60760hs9sbovvj868r9dfzc4j26k2zr4ztxixd9boubq4hx9j3g6ra0uv5wtgleexaw2ceqatstcpfwwqhtzb64t15bbkgnhz75js5pdmecxtjmmhntw40to4yaqjzdon1cjj8vjhoqs61viqlrgellvrs8gldjm9hcx4i9f5tq8br1ti6nr73ust546a7fo5e0a2ze2k865yuytp9nvarlbw952uwsp66fv75u9ozl6lxsuxtxhw4kxug8avt05c5xnb3578pyvnfrxqv6j41cofdff7kx2mfq3eug7xga8k24o80deq5okqxc7aoj35zrgn26ykn3w6psoh5zwa7gcdg28ss6bsxg3wwzu8yrzay5qqgermv2o5e65l3thnv3vnjgnyp1t1',
                fileSchema: 'bvnk73bqjl9kg0lrix6txntgpzu8r3lytfxvbglqyruczdhunxu4a83lfp2i834iu12jy7kghxiwb5ey60ef90dqyqxwy4uzrwozy0ccam9m3pve0dyn27gem6jka6l3bemiqg8jqsnwt0wxmsejd6blmjnrf49ddtn3br21gi88umu9vuofap0uvlgfa35bw01e59ewxhveufew578r45yri3qn621y0s522atq463d10wazikckuhpm3fuulhb9g1dfvvm7avxpfctk7l68zctjgjqu4gqq06wo5wafef3ija8tas0ahdaycgw4njjigmlhbor5ex0s8x9lbaaeov88cqjz4cf5jgrpdnqok9n3xhz82ndty043yi5rtufgmktbs3iqvlx6w7925bk28kfptqlrfflq4ifehr4ht3rkcpfg95gp86uovb20yy3i4184qb4d3slglpl4lvpywp6bobwisd0fcub3eqhg69lx2hwyv41beuycs9iq6xgur2k9qkwoc52n6qoy3najbsl1vlwmonozm1f3ekwf8ws88z8a9bkvdf4e3n0t73ul65ggr1kl9d4ujukvlzqoheg3iwuxd2mypj2flg72nhasy71sxoi4q594k2av1j2bu5wjv21qadvu1jtmcd3aw94u1w3rourqiaaj68wxegu8ija11jgox932z5k1jtteteb9xtpvfppdwzfi93tvt2vrzg241hma1fbk6qvhwhp4iib3gkpunzbe6fg8y8gxr1p2speoldrbsy1kutjh3wjsw1wg60z6w5r3afao8effypdyywqe3d9uss91gmg01ay9yvdo9umv03adbnbzaha9owgfgp9uy5dftjc424qslc4bczesglr65iskhlmtr33hug5xi10k7zcb7o5xnh2ws1zifhd74yqbz2r4k4qyybgos2ehc4297imor4brr2k4p61ngdpb3dlhqoogcwxm7dzuwjytnwgs3iwudqkhxrybwpp4r3wrbhd9aic',
                proxyHost: 'rsjajtw3w1u2waqmz8x3w9mad97j5wbfpbw8f0j3d155osahajoarghndm43',
                proxyPort: 2305874968,
                destination: '7vdca6kxnwy15v3nr8frsqdha0ko48gtx4eucws3eqt7tpi98ramvkhvykh3bkkggz8i1zpy5w4o8sj7lzvd70dg931wpes0qqmjqdq8izlbthnn6htt10k2zsjiah4jbnzlo6qg7dewmebkaecdxi501gc6yjwq',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '0kyunkqkhl2irm9g1tcwtsncpb6l0gzuws4fnc5390uirvkm1wx73nlqymfobx16uiav6s6wr8zjdix782sj4x99kd7wbpzgk6otdwoaa9vruhpsmjpb5t98b2zivalinmmke9s8eykxjrzsvaleunn7ttrb34b6',
                responsibleUserAccountName: 'xuj4ctnbbdatah95ix0x',
                lastChangeUserAccount: 'v0weksxd1wuezlve4rvz',
                lastChangedAt: '2020-07-27 01:51:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'gtfi0k2k446o1fqjhvlvce8eqm7fr7tu1ewnb8zp1x9g7nco1k',
                version: 'ejwm1gryzd5tvt936mbp',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'lp8b3facbf7s8c3tw4ylha5x6694x93wnwhlchx27olc7lmuux00p6w2nm5s99j3jgoj198huxmim4fuilqztru0ftr029q6wdc0mfm9bz3c1nicf7odtm34a99hw74yfdj2th9iiq1fw5rjcwmvij2qyosedtscn',
                component: 'br5fd02ubymbt40u7hl1zo3p9pa3aychdvjq6y34uq5fmd8633gesfef1zmea3agbtr348ox8j69a09v5m8ihfuy5c45pa2umco40g1opgqttid6tsuwcuvyknbrtcb7tldrp8y4q5blqfnwsa2b9dn83tr6mj1e',
                name: 'xnfp2tahv5pr48w1eh7imq1j3s0f05t8zi3anf9cscrivj52illwxlqr271trrlpknxw6nyytcp4jub2c8t3aagxx96ciwvn2oserf0xr13f6t39smw4g4as3pur80r80kkce8wdjxf4ra29fqfj03eiy2kb6fa2',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: '6zo1i3mmrd2hlets82gx6t5kq1mzcmbquwev7bor8i5db9ytuftczs3vchbewwxgawwau9933bj1p5jdz9tuha8651a24lnz9surbo0yq4vfbm1vi7l1im86j9yqqsezxrkcbwnfo2ex943erxgpozsgfqrsjq9v',
                flowComponent: '0g55opjk3s0dz63rvlfvgj85zck8qa7jkf91sokbcvrdr95x1mlmdc0n8sqdhadai95rhncsx3ffgbnqn4ivyt5qglud6d64wrslc2iy66wnj2urk0iay5aroappa37l15b4ye5alubew0hy7mc2i0f5mh8vgb8m',
                flowInterfaceName: '7w0fq9mftl3ekckyxznj1mg5ocm7fl6t4zfsw9erhgeiglyoucna40k8qkhtbb3xs4x5jfjcmev17rlhkbnz26fulhtmhf2bawqafi8umyfhdgp532uwly188xqdbng9wqefoigpajbtl0tpruxp2p49ax9o9e9m',
                flowInterfaceNamespace: 'db9kddk3npcpgydqve9cqjl8movb6pju91y321fdsceopgqajmvm677xqzr11z35d1i10dbauvyue2uv3nf5sprqwm0x2z5kjb2noeg3wpb3ivdoavrd6w0ihfl1zzjt1yl1oatohlwbudx6xmd5gbemdni76du7',
                adapterType: 'bfwx8eh6s2boweupcxdzanfe4js6vh1eaymm4cibvbd1c07ckc6ihc4p0lh8',
                direction: 'SENDER',
                transportProtocol: '6znx9994gdhol127smfaz759afcwrcm5b9ajip6mmblzdcre8ryoksi7n618',
                messageProtocol: 'wadjp0ht77tgqdoff498ukynz6lfv9903rma25f7212mratk44lzymrymdgi',
                adapterEngineName: 'i77mtl3p40tplx0ggtirokz65hxn4js472pju9d33fulvae6gr04s5njoy7pbs50djk736zc7vyyei5qlgpdrs70pe683gq7cmti1n4tt61qd1qn45mseq6ra63mw7sbu4drvn5t2b0lzrz8yny63y09aqjorcdb',
                url: 'gz89i01c9rvqmxvylzgzmv55nibvz36n9crxapwcm02ppytl7e22i9t8t4ghpe1bvzo3fbdlaoabvksme0swd8nkafe1c781uyz7be6en90hums2voa1vpu7fv5trztjg9ir30u0kuzzjxv7tzh3pj68rs13j21g1ogtrt791wzxmzq2chac7rigmn01mwdktqfzrljodcsccpyyyq35nlxvmese1auaoxsni6lmeussambephge5f1u849qqypobf2d8z5pou7264pfthmnwyb8kkgivjhljfnsakaimzpk5c3kzgpx7tndr4w6bbid',
                username: 'hxru2zuo8iti2h3manhey0rb1rg54vxu6bs1ekgr42joakwggr3aerrwfo4d',
                remoteHost: 't16ufvn7b9klgalq1u7lkyddfnkoc8rw6p8m0612uxik4x20rt7nkl462uzimugjsfax46atx9h27d3k539jodmvyzdpmlz8j9ecatl7rzkborolaxctabpwstaxw9gukz3j90inrsyd4pap1351o1olkivgct9b',
                remotePort: 7033989067,
                directory: '8a03oequu52201pip32xr1hqg73cz4p2psowijufcwoed0lkhtvljsvgc0pej1e4vqrzv3s854t2tqvj5fa7ct4fmzpc65aj1idokvwkb0femk5buetk7ha9ofvtzmm0gsb1tg7du2cgopi488s1p7j8t47n4s60pf29f6a9cbsmlvllj2329ef1kg6kr868qz5onjk0pd46ry3gw5i0g09k2tcmfrwhqrimp6zpqjyuqxpe605be67drspnlsw3utofd97w28a1kl7wirxbl87fkrm8geskkuzumxyjuli20h6d298xsbpx1q6kkr38udkg7du4ygaehv6l3jpbbibgu2qk4ggoxe09j5k03r6nas80a4jgzhxlog379wkgqgbdd4caxznebky8z191u4dn8ohxkeol2hzzj3wc2988064s3r30opstxnw2x7dllqwz4pafgooxg6ycsu2s16vk96xcjly1byhbzstkelpjjo42rbzitkwkcgsqcj43e08qsuh7fdecwz0j2p6mfvcoj7igshzkz7mlbdq0glll5baak330bhnwjsshmav222bczz3zi7hy5cmzhn3ajludh13erjf4abfv7kk2qj3dl9bgmdso2yel94rmq8vju88a0qd7rn48xnqjbs71aib65uzdu4liuweiuqwfy8d3ihbgq2eyrvr2zi4p77938gu33kmhxgehiumi00nwshujj9vzkq1f07jq63wbfbfavsmrtofpyycctpn16nke24h5hfpzhroc64fytkjp85df56ep9phbe5bjdka3ic2y92nwpvq2rjk44869djpdh869wdn5fmifslf9dsysazghj7cjf787s3wsi754o1eexoikq3wg35z34zc1bas1vnkgihgvbmvnemcy2a95zpl1dvda4udwfh653pd1rmhh1e6m6vtmmepulnxny06qr024ibgi2env5u56o0eaa7hc6rixx2ab7jq7sox6qo30vh5oy79enlzfzy5cgrxu',
                fileSchema: '5vzn2dyp2b9253ybbkspy52v5oj6ia6g6m4qati3nq21xlrezv4kj3sc3ao97st4eobtdl4mbf4boutxmay7h7vmb7m6xvza8qserl22ondwfzhe2juwvqhipnsuy4zhs5c4uzpsalgc4y4xlfa02xzt12auc4lzytptk5nmzjcipl4mqfrv1h5gjkpxosh7kqcyykx3x4jl4u5zqydmti8eqik7zwjoxiyglzwt49oen0s5zpjt6uaaoldiadwg4atzmiwia3vws6kpk1a8apyg2eiscispxnplz3dxtu3b2x7n13ja0z47i3h6pospg351fbqlofhs60hec6daf8chki6i8pqtvca6h3vnybbesgjrryy39hohjl05h5j0vsttn89bob2h01iu3yeo6xd0b0q8zofrm4ca28wuyiy8yk06km4mls6099ispkabisd5mo0uwqgiqm13a1afpzdwo680xsjjyngo7hbw9hvzscz6igrbb1dpqhcv4to8a5giaajts65aj2h66qrf8urggd9nuykctigu7swe59r8giqtsf6oq46ueb84p0ic0z315hheonp8a3bejfu4722at6w29thfo2kolo5fojpjmizv8sigvehcuj5tktt1oxfq73vcb37pyjs6urjbdyqgw5ilisfguq4nxmncwnruxaat5oqp2ghm46dj6cz3w70dg1zxp9izgwcmwmwkwehx0qo7rvyqlzqbdweh0zergenlg000rdmc9x7oydczpbsz2wl0hom1dvoesvzo5zm7spkf02yugbmry0fsger6xitppw9a6fsch60nfqmf8ax1drhx9xi6j2lcej6mgik62itqs8n8axpm50p35ztztu2p3p6i2qc7fll6vpb0xlwht1i6fz9f8anl4snbhjrm8p7n7eex4u1d52oj18xb41m2u8z7yxcykrmz4eb4tj7vb2kx0desv5i7s7joibl00qiznw1sn5by70mdo9ail8xnig53mgyilmbv4q0d',
                proxyHost: 'xdo1o7z1kreaml9yl5olaewemvbvnfvv8g5ozbgj1rsrph74rxgrbnyr1eue',
                proxyPort: 2236887224,
                destination: '4xcdpgadfp6vg9jcb08a4x5i0pb759rkh8sl3g2s0obwelli7ezp40nu7gvz1bljue6bzbvpbz5ao9sl3ihpilxo39qu1p1h3wkahtgzkdy15pa5mgz9i4k0moytqv47e0gmqgjkb91t2sfq2epsk4a389lwppzv',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '3bdp1axtc0yvawd1znkx8kufzv08iv8svbjyklofkvkayvoeyi7xs2n9rc07p02o233qmj14addktzf8pumzg9hgmfhoexknpvbbfkk05s8ikua7k3qb02eqs3apop6li510yck73g2e48932xjdpsl9o5jjtf7f',
                responsibleUserAccountName: 'p98sm49hvif6g72jtbtv',
                lastChangeUserAccount: 'uttqely9g5gzqjofvsg7',
                lastChangedAt: '2020-07-27 04:21:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'z09y08l8nzf4icys9beuhqcjagt6temwkb6wyce5vgmzjbjwsn',
                version: 'ls0tqt292kk1rcxunx45',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'gbgi0pm9iyxkm8win6vce5691yfakh3n1aq2p7v7hbfa1n559dlivtugc5q8mhpksodcv1vjojvchw3zsxnala686onnyoo0ed4uvd5vwxiga40vv805wx3h1siaivt2b91ctc1cak9l6q66dfxfet329o1ql1k3',
                component: 's8yevrtxal9ucgqzq385hwwk2riffrbh7vtqmzjqmkgmklyl77kbant95mvhdu6eox8oym9yrr75i0grre66tvyvgerup45jnsx7esxwgzcp0u29w9ijbzrojne3wwge998esdtl3efdhe63opgqt2odqw4hr1ucl',
                name: 'xgklmz9fo25xefxj4ngle2355m17p1kirh0qwnazf97cyqualetve2lzpkxbvkxri8twvwonmfqt37n5sdi2oqemsqhn0gnfza9smcwof05w8tbb9k7c6ye5th180euqoqtp6baqwdaf1utxlis8t4j8bmfxamcz',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: '6eiotjp245mg3n2rtv6k1p2mnrk6gcg1vpcsa52ljnbpscb9tct00cvyujr8enx2h28nphbr03ttqjkoq7swqr1idg7dj8d7bdhvm3evn45u9y8kvgsvxjw8e1qr57dsfbvcs1wlyjvtuwn5qwlnnhm1ksk65nea',
                flowComponent: 'gym6h5feck8adt819ubyoeqskah5fgk6fap0zy87yv1ihap3n0ctct6aevd4o06vyg01yq4253ttfwz13hcswlztq525u1yb7dn7csm1kq0if35nj8xwn7s01mymgoxvfr2oycviy5cp6pffbn8atifud8jfoxkf',
                flowInterfaceName: 'ixp1jfmvsn6qazbn2214uzidn6t3ojw4axbsx08qbna7yx25jl3ibyf5cm33swgdcg2p4b87s8koaqm7qxd9kowoe6fn4nsqbm7hat177yo7sbt9d4zeltur0q2iv8ckkmor59efycevcwyy8s481t93bng468ax',
                flowInterfaceNamespace: 'imqgqkqt4jcsmbtl6aruu5rizkkix4w7rg15opezc8yy36s119spasvgqf419lbvm3c44ti9bz4xnfw4vjbfnh5c9i1s9vw3zsrmkw9u6bv44tj0xm0wm6k7rzltmxj8jv8g2m3wz8ayqjc5pbgj1iu63rym98wu',
                adapterType: '24g9ancteo37scgr4wciq5vyt84js6h2e2crl6c45epuumlzljhlrr8bbq79',
                direction: 'RECEIVER',
                transportProtocol: 'ip9umo9kfewgyb55nbkpu5djnasv640iyjcji1szdxitsfa6ubg6j2tiv3cs',
                messageProtocol: 'ztzar2r7zcgc0y9k6c0vv4v01hvol9xk7plm0ko58ytc92ovckbtjsg8vjyc',
                adapterEngineName: 'vaai5nuv5v61kw9tn3bz8x7kg9sq7kbfk4jnbu60d2y82vsm2vbq650u9l16th05qdigegkb9uqzlab79tkwy0ehy79vnaswxhelz1vpk4vfcrztneuuwcdj9f7x4we4n7ymm0c20de4dxyk3cxer5jyvf2v8ptg',
                url: 'c53riytm9wcem2zs3ekp7s671leg0kkgoxhwfqo06cv1wqubfpzb1o4ds9148rk14qtidich9iflzbh6jh93526tanpc0ijkd32w4wlynys3gqq270v2pa8vnborztxh3czql4lkijyg5ob8z7j01krn7bfdc2b3zu4vpgagv69wrr5fmv3a49cfv5013rd32rbkh7u90b0irk87857vqutwizyxfhk8dnce167gepmrzsnqnt1v575z10qyhh4wrpfnejtbq1opdn0g3whmgxkh8tzyp1gsn3uknrrg06kd0p91i9clv4i4n3edmcww',
                username: 'ao3u43n748ruemphxq8kx4ymx70nogde3kq343i5iok34p75emmtj0c7miq3',
                remoteHost: '7zmt5ely2a4z5x7wr2f63q4gl8jrqd67pyl2wwx4jy5whx32mndnk7k2qg16s8zw1iz01atelaifofu0gnk84k96f1aepz5i6l7464749y9rwbkbjpny7za3uol88rbjiu7hzchsg5ymvugs1uieirwvj8kzz8ez',
                remotePort: 3289426881,
                directory: '56ajpjzmvts6hbjoatvegwjebfe53iu13tmot5wkaxt2sk7lyuhn1ma67xsxo340hewlujer4n5k766c9q56q67121i7lpvtq6mw1j0ferfil8qrbtbesjgojrpzo5ybs0xfy2g2oh11ddvyazetq5dsagilr9ymsq3q1oyq67studmrsf5anzhaa8sdrayaps0387mf9ejwhq8ujw9ybaejkuva0kgqriz9yv1pvege2og8h5wvplrlha4uk1vn69k51lm22qm2sgmju38kqwfjp23yc6lye87zjw31t78u6ie7jx10am33s53fvnz6487r57ab1em8hhmc9rac0o175ico18lfrix4tpt0wmqujlw0q2tbdjswrfsrbzvogngpdujqbbgrle1uh1jaa2bgvqrx0km729wds1qo30v3ed4zjq2vbxlytcnbld1ss0qi5hod7p3x0f1nnsxx4svednod6ncmoegqtjqw9aos0bxwffp00x7g2ael9p2bjdmuhd2mjfbwccxahphsmybtyq46dxi6otxpdogrl419pvctqpo60aiwrspvgumhkku3iw9zhz0rdrdihhu3e3pg9c8pzdznbxjkge94idb0zdclpiigbyegfb5lyqxgk5fp7iq9o5kywecriqzeb60nq51f0fblnpxpnrqxcm2a51sqibewrv4hfry3a1fs3zqwuqojsq1orsrtxqqjm5d2s0oq2qwnfhrlazin4g5p4maeojnmieef98l44g3vq1ro5jk5ksxn5qnrhwgooh3qvh4lpu5vfwlpd980luqq68virygyf12ey5le9q99ildzt4t9c2mt41x0ftrkstlakyy3j4p1d4d026nuwr5ekinyykpmmpsylpa0c67rw32tq80p1o72xvapq56b9yd1r4asxzipjoh01vah6t53szwixlh48bp9mdemki4b0ijzrjg6beu7aste4e3wpt098ckmcw82di2maf8025d5b1ptm97xw010qpp5o511',
                fileSchema: 'gys3yh2n7i4wbegecn05jjpttj2jofdb0w6ixx7l9jrgnhixrv1lg3anai8borlxyjw9n2uvye9enfcffp8zi79z1x1y5xyadasn65cr61yqsap2wmqul3qinqff1u3l3mkuta3h911a82erjfnnu89rc7hixlp0t941rk4hltjtmu9ps1kzrid2s38eywk60zpg0w450jqy3vzfgzdoyg1x7hhn7dob5sq6embt0o6e4wys99uxakmyc5re3aqbq6z8ghmmlwud0pb0wgh75t97t56gtvjlx7os4posvy7h7nce816dgxqy3jg6xss2qgynxyzrx4klswtjvsfuwn9zt5bgc7a8ysnvrargultgt9oa14bhhdmjrxm3tqkjg03r0o4q0fpd1jvdfjbafm20dsl29mur32xfovbp8ltibwtt4022sqc4yra266e9myg9yw4bxjnwmccrm4xrr1ufwuvy5qnq96zz1sz11xai8pslz1b4bcxxdhpab34n0iwar7dwrmmj72axjrrrjm3rkojijh10hr70r1qysf9nsi43iv98wlw5iuch2ugmnr7qhobgpt5vqh1wr6rzkydxwu4fpmke1d210ovjckfulis9yj523vksvyj2j1b8wg3gzi51qlycabm9razv07oribb54lf6oio779gp4qalkwfl2x240r4fe2cmsy2aamxha4aqosi77aia4tmbt69m8a1kx4vonx28jv4yr8dbt32edzaz0w81gu0azn4l4s14zzzdu4q6nm8nyhudbr2d0xz0uwhobxmxzu7dhxozjg8b11nhowx3ni9rjbwwxeb80xtc5ewz4fwsb55z4p5pi2q0x6lhcbtp1yayuwa4qb1n9ew7sb63g8fo3j1i6yt2co9nv3neoqarmvbce7ara4f74rutslk7q478278o3rgoc08dmsxats5q9nxj21u6v7xotwn5gtxrc0rs01z44817p0kynnaw7g2marlyx5oddsdydi5lptakoikp',
                proxyHost: '3dtntenwltk4bhpats030t9nnncj8jgqcaap8j3h8o3u8oe5qz6z8xygecy2',
                proxyPort: 4739254995,
                destination: '0hedtotli8kzuux3jdx30untbc3gsw77bfz7t09uj3jxeylf0twqilzpj5vpqdfleg0xejsluxiv8g36l20mifndartllwkgnx7i0j6gzqfmi7jy28x35iy7863431tnph27j2kpcghrf5c4pj4dtc0t248mwexy',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '02b0uj51uu5yapocrfynyeemi3swsdn0ck36taogjyuwu1dkcln58rpp37a6u7hcy7slyl35fisg06qdmwoixdphi08il3v5wsfwn6laeaai17tapcz93gof0lqozkqq2lrfn49bzvfn44lb11a4rdxyzd85foz5',
                responsibleUserAccountName: 'cyqukxe8l5kl2cjve564',
                lastChangeUserAccount: '1a8u0cot6gd37tpzngei',
                lastChangedAt: '2020-07-27 03:59:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'z4oeb2o9bfb0dklfbkm9r71aankjpm6u1j8cxbejzaln78fo35',
                version: 'y8avcysce4vpb08zh5pp',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'zabeyc7jxanqz0a5oj2n0zzeuam9gg8ygxs76s8n7gshaxcbdbbiub5vhfhmvoy1cureniznibj4ehtppdvw9l0uxqu61htwgm7b5pn1xklnrubk346ewuxq43efphqvsit9q590h9fohjm9uigqyz4oyb6oywcf',
                component: 'uxoyjqvah5gnbbujif4759xj1nwl1w6oy2jmkjyvwjup9t3v007w2b6ao6s03ajct4ltjp7ahphaf5bawt88u3qkecj6pozm11p2ttd0u2193m4amne08nk3pcmespgldedf76778a37u66ugp381y8pf47y8jza',
                name: 'rzgyhzbly0v4tn0gzyqvoilaffhzjvm118fb8snq286a41lt323nqa6407o7r1u0dlahnwfmydn6vo0ehl7zzn6iepvqdydf1zqwgj78mq930bc0dmjbhr7hse79azl7h8o8z5rkt51f9qtnx3gvu33d84od6o0gw',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'lheb6u3c6ua3n0yjosxyz36pd52sak2z127p8jxkpwnobwc2qcfk60lx2qmto91ft2yd1d3noilokt5p3abgsgp0w3s9iy43eet065dc2a8xi4rm2ok2voxpzsv2rayn6h03iv2as4mdmzyiemi12a9vc9xqgtn9',
                flowComponent: '6nxp1zozc4y9a8ze7wdz2msa0rb92g1bk2ykesgg0vc9i9e9vgsh69ak2l123w0uo8byfdl8chaweca250oe3izm2tbk962si0jd9nwx758hn9dx7dj1hhez3zxoe2x74kqiaq0hovmzvp5g5gkooczrye6fkc79',
                flowInterfaceName: 'qbjhy5oqsw6qtnq4qrjrrbdgohlt0zsvgv3d2bu25o0o6szll0wj1zg73v1g27fynrw6zd38h0u2rislcuy8kadcvmjx46dcfy2sqd5efnfrksj3aaft4jzwpwg2a7ln6h2bc7ajqhse2ye2t8y6gau2c80ulxmb',
                flowInterfaceNamespace: 'yk9kgpa0opshtq8m25av1c8yjg5k6ro50es74olkkalvc1yt751anomdxnllpj4avwcx748ulli6ja64bbg8kzy3mcvl8748d5xy8tkknrhjg50xgncs30dfugoj2lrvfpdbmd471ezornwingm4a2g984ard3qv',
                adapterType: 'tcioak3qj9vv4835gzjfezw1imo51ahfpey4jkw88qz8j02bos1907f96gpf',
                direction: 'RECEIVER',
                transportProtocol: 'qnjolq3c4z9bcb8hskpjggfwpd6dfkfgj8uic87ym3bh9s0b8j8qbiaae7gf',
                messageProtocol: '835xxh8eg59fdzubaodtycf8dw5m62holv13rsrt9uel9e589wteykz94jz3',
                adapterEngineName: '7bjr2or7hj5ok6zkjqmbioeyvrp9031ae5mye3afsw4jmzlwogxgcksgrc07adxvpbtrnb5f59gv69m28h1umknz4z89a4erlzdcvwweu3teg46eh3i2xf3tzs0ows0q79bt0s1xjvhxdw7dl16fp0j5lphrzte2',
                url: 'paq0mox64niy50fy0kukgzcbvoyhxs69sad5byezyq68ytxhl8z6vmh9ywtetyp50nhwjbb4x6a9ulivnan1hdl06s76jaz8geikbvzr97jw57qg4wqecd0m4snz2p4q98rwxrq0y0wqlpsdhsyt3cq520p2xdajq9pxxtp4tqze663kg404s4avopcqkuz4jsdyu5qyz76vc9yys4hkjupl2ivoyndz6dqx4nmnalqmanizfamv07moucnte4d2yol9su7zetxg0c29s49ch6pypjori88yatcbwqr0904dxgyuvrv50b6hcdvnlvv2',
                username: '66u14i90t25w1m3u5kai0gojb36nq2eida2f1b3zzutmkgkyw4ikg10pzx1c',
                remoteHost: '3g5al6ytbly41abkubvpw4vn31lf1qahka18c9mrozcqdlyakvdox001ds2yz8ytbl5pgzfrv8xfwutt6u12u3bqnzbfiinglca92jprent52387auf03taqb5tt9qotncc0j3m8f6z1suaik18k4j27c64d0ijt',
                remotePort: 9797570462,
                directory: '4sqjb292p5xb5uerygs631ydvg4e7z2eymr7uqb2r1awjm9a0pn1tcar22c496531uk5dk6ee0advuef6n00ny8xlzbo1xbky9qc2qln2hy96z1c3q5zkr9nglo6otoqwtpqi6kq1ycuangit48n40pvrdgpacsa1yhiwuorpsxkp4m0zc9thvpol82wjnpbchhie4lcglp4tty1y603pnz2uq36k2ekkhlmqbwempty8g11xhvd856ijl9tsh8e473jphifkdtpg1ytet5c7z345os31vn7nkvoftc8co5w3fy6vurtx8uo4zv2vpvkgpop5dhgd2yg47pepl7z8yvv96tdhlnpdodszhck7nx7bgyn6yrkgi19fy0974lilr4gbuwyo3wwm3t9t6o4w78y7tmdrr6vlai715maw1ifgq0flgqn0rhr3ohvjfekmzm23nfbqvhy9u2a5abrmawosw3oi3pcj1os6qvrg0w4eyr4e4sdpeszm7t4o5zpynuovmfibosmobjwh2yh60x39zdtaa6akcb77mxslrf3pakmz8seovwkfk9h2fcrkmh79m40cxvtmeg28iqnshcbuoyb4wxtiz99a2p5pujib1tw0k9ymunqn5vyh4i4wl38xuulu0kjtyuitt9xbvshl7xy8rn9kiwgh2unmn2xmwh1blumvqgnxxilzpoyaiyxe0c6acklsv0n62tohjg7tn1n8mxpjasxneygyvxol6kks5w0822shahe6u4oul62yksi1k2rgb1mrpb332olhvlhmapvt5qbwl8ooped8s427izkt90yz3njhhhdpdj28t555v1xp1t3itlo562cb0bfjifb3rqfwlwze751bqchiy5jflepaywzrhdp3hhxkvrmuygaji5oyfhtjuy1qfkwi6hkidh16v9jic3rx1v7f1td3nr98wd47md43mhj0uuxytbxc2wmcugg7n0fnao7ko0whk1ddjgu9zm8oyjzj5aaa5uw3hkyjl01',
                fileSchema: '9disrvvhe490okgujysg3f9vutemkb5qz96z82ocz6y1eux3z27stbl85tkggfzoz8eg4651ko66szp3d9kyhtbcvl9pftesy7szx4scsfp08sarnvp842k13mzrbvzf23bcj28kemmjnqkuvdayl6hb8q591gatcmd5ol8e2vt5i3s1d2v8cb7swkmfa43vlvdaph2f5szruxfvf2muhsz0ptt05lqyinelb0h8ppbgnjnyj72uwii7zbg8xzzajmi1gwjskdzztztv818ay5oh7gncyby0sziv352ccdkwc8drp4svj40410j5wiyduvb2xfmfy6z3hmkewyxfo5kidlbv4upq04mvpnbq2ez6261v0wh26e93ahq5vef7jlfanokzm39w78p7zez88nvx2c4j7uz6qor8f3h7zwrlm3ku1pj88l22b4y9eu6drrrmj1ob9e3hkc1662q188k264d9i3gld14zzolkzw1pqgamhu50kf2gwoj7hjkwj9r1350q0lzy194teq3f85keh03g9snkjlz7aj5eptgdi6jdye7mx3nkad6th6iu52zzyv46dxg17pzaxao97oaphjm0pzue2ithpw3ss4n27lrikn19cd56azhs5rn25t0j1qmtlylxu0h5n8se4drvga3fcvrgx1g09wcge6d2rhpqf3rtu3xa0nautolujvq9rvva2l2gzmwhazwhya3gpe6jy0rvw2c9brtw23ez1htym9qatl48yi09m1npaan91y9b50g6x03fb3m9oq0k91boprxgfiv3ge2gxrzyaql5a38vxykqni5ny8g04ainapymzy25vyuml9152x9m8jh6w1nmawy6zscxg0vwuq0srhvzwe46j8nroh5r3dxn71xx935du5brnbo83iz3juuqocky40umgwtoagh8e9doqf3itgaiotlioit6ihaz4639k2jhrwkwsuxf3hxoif3lhytl0x6md1zlq04olrgt0onh8ghrrgk7y3kw',
                proxyHost: 'dphagwusr4jv9p4wrwsuhfn2zf8trfggqn6woiv9vpt80li4aa18302bq7cu',
                proxyPort: 2129554888,
                destination: 'tujqu7ga7ugu469aapduo0ywivpfrmz8ha0z7gtndl8abkiewtfwz7hn8r6v0mmwjsqa8p8ilapi0ur67lu4cnoiaeyhq8nywktujsezghgxq6ogq75kkos2b5rnmedpoqhqhub3v2buxo29b36tz2t05nvsgq2w',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'plb3gsvnspmh49uzby7afpdio2trxt0wrndr3322hejz9ty1gmlrnp3kd0nm7lu7rawqhfivw6j6cg6gl7xhn1bky0ntp5gop8ie4voz0e0b30d4xqvrldq2m84akliez55m2tkrsp1q3li3ddef3xmql4h13j0h',
                responsibleUserAccountName: 'x8zxfcqv6csb53c67b9n',
                lastChangeUserAccount: 'zl6vejxl3jhp21kmi0n2',
                lastChangedAt: '2020-07-26 18:47:28',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: '0vmntqbjhmbvd6hwgjy3q79tkgqlhst6ea9fwr5165ni757y7i',
                version: 'gjernmy1373549inqcsb',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: '3w2dg5de08by1qujjjtyfl5zon25pj80os5v60euwm2ly42x87g254nx4qz17qaqi1r7ccgbk1xlyua25595jh7c4jh2lkdce4ehull9km7o9kvhizkxm5umasym2zhfv2jj49gwyzynz6yvpzywz925mlorlkij',
                component: '3jj2mij665lei8fk7vznlozthhm5xdjkubcyzd4se5n6bknskcxpkfwkxv6d3rorfarpsskjyrvoh7ejv8ma0ff7t9a7ks8ujeajajpal2ss9wy9ve0wpuqdn6b6wz9e9y01eraeh65ijkwtzxutxxhqu8vi122g',
                name: '4yli5301oxjubbzagkyx5wy08oiao3b67fb5amase3sqz5dclekqqza0oyafg3cnkf5mjqyhtxcehm60orzq2mnz1knhgkdgko3rwfnxb3rxzfb6507397nldw01atk0mp0qyfz200jgfbghhl4zvw03a39gsq9s',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'p98ukzaajkpb75b5nwqdj3n9urg9cjbrmn0qhx054sdngite50ooe7kca91p50xixuw4s9w0wzjzout4zf8huk2y15fr2s83ya5vztmwzx9jv9kwgzcfm3upqz0plj3hkpabncvziltjyodw47kjs2vh0n57a978h',
                flowComponent: 'jmat0o35x82jim92xdijjut4s1bau08xo7931exw76mcrqw3nkgztjl7x8rsh3lo4lbuh6h5qn0yyn3fkqa3sovb5ajgi7pbvanccn5xd0b1fm19yr8s4nk8616p1gk1fpdds4632fep6iq9q3luuk294qn9h3dh',
                flowInterfaceName: 'o004qcf6g9vojfhy56kfylbe7lz821flof0lq7kuh4bbo0pc1mee7snrtjlc4pwsgpj9fxjs21hrc5dpjtmmx2so5inrasba7d08ggnfmcvbaray263e0mqin8e7v98hakoy8ouvhcs8r34h1pzjuibv39jo62si',
                flowInterfaceNamespace: '5txhtct5hr73gdqdjez286nuvy0igl05nwjs98c61e0wml8dry8azld3u6ytmdyho1txgo9zcid44lcwixhdy8gw2ppvclkjmgslc0xlr6wdtltq0iwz2w9px5ivzy2zb6vjjuolown3pqtbcf14axzkacycdkdj',
                adapterType: 'jbnxj701psw0vdcwtr5z4aqeuzktze9b0sytuh6pdslzb3anvrwkkz05zy80',
                direction: 'SENDER',
                transportProtocol: 'yz93vhmnsruvcjam2l2819d81xdyvzr5y4vjkxsat2il987aokov2d6c9ys0',
                messageProtocol: '547voxf93c7deucp6uet5z2pvo21xvqj7ugecggc5ycdwxumyilxit14ivba',
                adapterEngineName: 'ifpdtwryxabn6qv2hdn0e0kawntbdph6s7zau8dfvpxh6bllfe8o2rz6gpcmw1mql7bjcf81dyq6lfqdhot1odw4bqm3o5oyjj946ue2m2f8hmkdiuyc7r3c2e4lx7fhp39lksir1rjjozky8memjoeb9co9ak6c',
                url: '3ds6lrd0g4f3xz3871ourqxskf6k7hfzy2xkq88xetw8p19i169q2hvznkziqeo0hys1jaxcwhdntfp1cx5yk6rq1727xr1uhvd6h2o2ygrn17z8kvczmjd7zmj3p662q63x6voel9wyf5p94d5aeagbq0o3gpn17ryxdb2cydugdh0jvk3b8x58p9rcizhjqyg24rc4f9v6tmyormgsjj47974engxgs4lggh1ta4644v6cztlkujcro1yidnun87yket73p2i7fu40t6hyj2xpqzhv306uyfeih01h7dxkcjpkdu0v4qn8lmure105',
                username: 'ydk6faso8evyx3d23j44124oiq0gyasd324bn3q9ue5ttkw3f8fhi27n9ddb',
                remoteHost: 'guu7sqidep3jtb2jpehosr12rsxcr468l7xqud6a5h390on3vkvaqn04wevvs15fqdwd2gnpdf93xnxuyrcexy12luc0h9be7tbt7h0w6irevqsjjpowg8mv7dlpl8ch304z10wnp9c4kuntp3mshwxdh6teinnh',
                remotePort: 2102568012,
                directory: '063kcr0rkyskgnzdlemniypdj5p9mo8ln32regxmcs3g6w0gqde173yt26wag3m62xqdkyhk7y3fcqmiij5tqyiyhqnh9cmgu4t18c4dkmm619s59ose7dizq40gagao21mzo2z2udezvm3fumsnsdg69np6p7esbidinutu21m97or381reuxacbbzsqtroyfngxji9yaytyw140109a35i9rrnbr83mi5nxw4pakc3i9jga3z98npgczud8b7wb506txgv3w9h56tqpi40cqxdyfo8tjp9wff4l0koox08kj9bvjwli32vxousgcan0pmr9bewxuaty8zlllcdk5iitqw2k863ugq9lct9ml2l10e1m26h93ekm21ul05i7j3rc008rezstlg7idww5cvzddwqj0xbmg2no56hw87qwvictxvwg9mniflbabroh1wype52ftp82uoc0pxnigu0d40guf2an6oi8qbj4qbh17w9wjjlcyl5h349hcmig9gnkdtcz2jx9g8nh2gjknx3mf9eobk0nf2pdnl1hrjdngas9zkedtmk16yhqmroi8rmh32ynz9lh5qcjs0wyg55b38375yutar6llhadnbf9n48i0n7ft6653zxh5nmb8vx1p8hqgusxm44oqluo7mhak83o8rmbzw5ak04f9iy3qk7f8dn5vl9fepnby6a3davgqag2rr3mkogfumauisf2ebf9t1j6qe384dh7nuu8gvm9wj5bmnof7joadifep4i8ft89uwe0wh75cdz4hhw0v3b7al2oh122arr28wcwx4j5xhkxx1s25zc3fyiezo6mlja4407i0yhib7w6rkxhtq49pdd6hupsi4h8tmwm8iusmnwoj2irfhozc4pm42rxt67ogs87s62y96vt6pkni3wn60g933xzcmrwatln4ud3y6zasit8orcctcglnp8l4mdszo4177d1opvhjmoeiefu8zuej95kvvk7znzj1yh9zjxu5f73q9x80z5',
                fileSchema: 'rlrk6q2wa0e2gxd21jf6sqkhkchvhzk1brh0g91hlqah2tsce4xes604yxxp58vg5hoc4hapixndk2l42109ynr2rgl295z1ttkarqlnjznykhmiyy31xjnvefs14ofrvock6kqucqwr1wjeq4hp83osfu014x1xwcnuyz1s2e4xttoufup6xfjfduhrs80iap18xaf28jjlp3p8wkz6nnsjuwnu9ml4z302by3zxlqmsmajpb2njrbvytt0rzszqtdeovwt0toii1xyy2iu9x26w10f84egyv3hj56t8i79vmc7odvu10l2n1u3kivmwoduw54a75gp7gpwcq3h6egx6sycmpqrf06crzluex3vtv7zbe3jcw79yfa4s54uqk9gfcydl6wbufp2105d132cch3gkz5zk7kg0ciricxv9ukpz2qf7d8bxg3z0ocmajyk46be638b452oe517ali2kv0m17aln4rc4j5775w0hv8ydpar86g6och5xa69melc7rccm95a2l25e9e722a9iyaa0sfq7iufi6lzcewz9k2py7eyxlpahw3lkla52vd4nh7rc2deuy4289hcuu2snxsc36ninq5po2hnqpl0lbhatvn3puno984uhryonmsia5wopeup0kse9l3jjqmum0mykk4livzwqyk2k8jog8yra0oktoabgc4jpurjb942tfccryahr4v7wiy7sb6hab6eh9d6spjbf6dk1haoqqdjfeqr0m7my1ypgovtzhcgdcox6g7js7iev7q4m6xaa10oahkfygkuy6t6u5epyaj4kq512efoz2a1w3ck0yjn0437cq3v8j2qyu9qlk72gutk3is7pzlu6b7nbzblcm89ui2mlb8nrf9gqs1sou6vwck9qvo6zy6555ae6ht1elsq6lf7rr9z9u8hifcp7wioqkl9ahyvxb2lzjsp0jhyqml7tfze8lo83upaiei6kwads8cfuitvqniatd7ctplj6zwz9xz0ywhe7ne1',
                proxyHost: 'dn388yb1s63fov67z43ymx0e4t68xpcvn0qk34vz4hwswed8zos2oalsdppz',
                proxyPort: 9753611698,
                destination: '1abt13cvgixambto0kb6sl7xanlfsb6rene1jj849t9wx2eespriqcr6pl2uhkmg5prywrb7b9mulwt3x0z4vuk4cd44fagnipmzu1xy8hqwhycxojs5bd5jjt1pi666qod6upthyaxm8u2zj92ozqt5ceceevmc',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'hkp5p5prlu1iqln9q5gehkcbglz7uhfcdj9zhuhxv2c1fki8dbcygga1r2aplv6l9f8qeqw0nr1o9tvmqvh82f0tx0eliw1cmfubg1uuiw3uysjg1918w54r5189voz0d0i5sg2ti8ejhwhw1cjtkjq475z6qht1',
                responsibleUserAccountName: 'cfb6gwf0w9liu9sychva',
                lastChangeUserAccount: 'oj8t5lqwj6hxcdd5bbr9',
                lastChangedAt: '2020-07-26 18:10:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'fi1thb2u7jhzcvd4ia44lfqag3qv8n2nf2beg3d6i3cqq3046e',
                version: 'cx0xmm16vnfe9rlgq2kx',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'i9n5b9hylgd4c10cextz5uufor8edesjipu9ttp134eb80y0y6pw8c1ro2dn2qr3fn56bivs5icw88efdbcd20goozjxd9l84a2je0purp32pmp0wurdc8hdi286segjfx110yhiubgzddyjhiptww88uenz7aau',
                component: 'v2dnhqeeccwbsnvwj8y1utzxxbh13mdy5l3p4vjypw1k7zttmxr1rd1yb730dmy5hppgck82ejigicnyvu12dhictaiq56pgzii15v6nz65mrqouikeqn2pqy1t0a38ly5dlv22vzgdp9tmbehv8rak26ri48gfh',
                name: '0wyph2hsj6h5yf16y583ezv3uxtqktjjnnt905ye04vqsprvj2gc24tdurgbmbhlictdo8ve0wkqtuisvow7i0lr38bl6vdo93o7d64xrngy1be2uoyb687abnsb1nrw4gyurq9vm2aqugjmkm3o11m39d6uuimz',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'qdq2tirpyzsl8p4fwyzi4dfg6n6mz451675mj6265wrhz5jwy72qx60v3t6v8xh0ohn0stnsuw6k8o3c4nfv97mu4hyanl4pthjwqhtdc75yemyc7a2d8l9xm7y5ebdmygtxtv6cmufxgw61gjefok804txncfsa',
                flowComponent: 'errtikex451hxkhrxtm47w99c3dcr9kea2lpg73n758mhvwm44v5vi88o976j1c8f9v801g00wnoesancf4ypmvrnjs387eromdd0qf6oceu7sn5icrszj2jrzqro3l9acgkqs5tqnwffddvua7i8ijit3wcpxs2e',
                flowInterfaceName: 'seg3mfz7s262yd522qyudybl73666kmnipuykszm9smkqg2icvztaasu0er1i8lgu2oiwfkoj1vldezz6b3q32gpmw1r1nz9hgvj798hcpi1rl8tk499gudndcwvrpruice9spc1o55nb1q2eh9rkpgbvlfdchbs',
                flowInterfaceNamespace: 'jla31hvrigpjnez81zz5w70jopgaqx1laqvgkxou2bg88dmh8oswljz09ptr04ssuncj1lrv908eoa87la9d4dydwgy2h136fkmpimhdq56hhpv401zok8ub9ewyv7xvzbsff8ofklso9jk1rr11rjzyi11atq38',
                adapterType: 'u3clg4x772vvjr5wtahiyen9xrzievw79r0qjvkmv7atve6yza0w4pihdm46',
                direction: 'RECEIVER',
                transportProtocol: 'ogbrujm9kl5jhmf3oiyjtgrf2wudd3023lhrgrztyb7ksaa85deixirgx8bn',
                messageProtocol: 'imxdwcmg3d8jhgsorafmh80py02dtrxpzmsppdm8po9lqx16jn6t5s8lzbfp',
                adapterEngineName: 'dq7yxy6dw1uo4uj6ynly78nudaoitxl1m6asa4q9calzlp9mdvqkgcfgooq0x025rw200ua6fzrij2t5ehmndlarxf94l55w39ktuzymo2qctusudy007pp4dlfm0jf5elm9n1bjaqxy5wtzzmdejlp0uokcomsk',
                url: '6jrgcbyag0u1b5lnv0hxqakjnfttlozr1qb1oub2wwyrwye23lqarl0xlcn2gn87lidygbf65b8g9h1brln0bybmqwuu2qosxxy3rknsh4h9uiwd1wzjfxjpu6sdbqrvdu9cfrfsdqqoebtzubgoroqowaakp6qmh45j76gmfw5hlgm2oclgipn5ruyxbrqulne0uuuuvyqubtmqzpu2wodhi55uy4r8ffl8jskmjnlewqztlvtx9o9w026ubtrj62nje19kv8rswf0675j8qyd2tkvd424blpvudbjiju4ygmnj0lplajqt7w2141nm',
                username: 'hone99lm43ias3uq769ucav00kclbu8vnq1a7dtgr3qaw4lt2uc1m0shev5y',
                remoteHost: 'mh8eevqbbuiwwuv6gue1gn4f9cfclhp7fenxbf3xadq5btpcfpz6hk3xzg37u4izl1rwvsld04zkvhc68aln973xxkqg19sb08zdvwiyol4p2d4ih2zxl05r9s76w9ola7xbn2nu4hmkvkfpwkhjswl3r8yceq7p',
                remotePort: 3486390876,
                directory: '1ow23qa381fwdqlmzxbb1n306apwbalc8kqmo4qj92mhzv6vafrosgtuqn2und4ot25mzgi7eaj1bl8f85ntho8ylrrcrmgwlfbovi47phxjjqlcbfedunzqxgsggn0ym37zicw2x5cp2b86vxdlc2h21ppwwad6ihyr0v40u6lbpacchgcsqnzokg08tbz7wpumc5564cw0hnsltspo87hy3a734zcewo5i52rtu4sl8d0o9c7x1diqmd7jku867vytchit340ijh693wmnvc701vor5grv9y2uw4pv4ctrdy835k33l4p48fcugd4swzdf3z7ffbr499c4rgtq0tmcy3lwz1ky221daib9xi8bf33bxm6c8m1biv8fi5mkquci1ylyhxtusi5olov586uv6r0ur0q60lz3fwalhm0v8emt3n496wa03jor2175yl7td0ehl02vfwpk7rm4j5wihuoy21u0axvzom06hif5gp3httm5v7jfllxxbwchvqdsw9uiyj3msvhb043053joeerrpm8vuidx6hk4efkn3ksdzy5jaznlz9dbc3iye1cvpzg1jtecrhdeks2dstnkn084jfo5antj8xzbdvoynk717mkc10wr3sp6fo4tj24yrt8zhvd5e7dmpcjcn5m6v02voqwod773f9b3fksxc57157fnin79iaxeq1365v2gc3knceh7iyc2d1ndb1zrymt5hfrzqv36f7zugn1n50porwgohtxxoq2js402yjxkg5bej5cbawvi7ye3cpxh7y0ml5pe6seska9t2hcgk6dpwtipp3rdtxbi4lk1msl6rmuks5q0husyyn8z9vz3tflxkiltw9cvqpfa9b96p11butzunzdz3d44xg5vx1h50qfngbjc5suw3m4fp91rgqtl8dv5szu865wvej7eu4jioeddqycse1sroc9ia3d0s4v0wnmq5iacasd8fmm53h22trfry77yk67naacoa7stwipyhovul0ikiloo',
                fileSchema: 'xsed43rfbqer58btmsoem0g13dbgof1h4kifwf0a3jljnr5tu38yo5e7wyz7zw6rnsxixe3vfz6st6rzld1bm2k7k88ja032u1xwn2g3wo2749pjlpl4h0wj8emzo7gjgxdm03okbcq3p1r5w8gx2apzh7wr5c6kdae404ihvfaw85w155jxiesq0z8c7xv1dvvv7tszwbly12fzv6yvxk4v9pxdfumsb6ty780fprhc5677ictirf1rcl7d9kzggrk9hdu3ltuf57k8jw08bnswolue42e8uzhqx5b9kqgkudrwdu9yko1ngxwkdt779rffz780v7v79czve7u6gc719g5x73a2xk0horhd2kyvngam55moqijc3hv15xg02tfprmnuojur5ibl6aalyhvxy8jb0sw0an8crg221iuwlhlnsinln3b2zkwwt7kvq6ay3xpugfs3rusgnowrmfgh3h1minzhoo37gpkjmfvf5m8wch9s1f34kfncrq2eotle1g2tmriiyijrql5onmlilqq88ci7d69yox6g3kwd4qse1tlndivm52wwj9xnk6x7bx7qgg0slrftlekgod7nreqx13u0dsxiju1045crttmwkgzsaxv8jg0oo1q1j94r7try0pp7r1nmwzjt3vlh49mitrln2krbri9i677p2vdwadjx3ijwnv5yiwxfrkcd154rlodqm7uu94wqbfeqtwrzzt5eqvvxbqp38tp1j4hx4t1aagod6a7lirk4xx61ytexkx0ckf05bagoaaed4cz26g6outzn8wvfvjpelcqr16th7mupj8qx0qfeabyqmlvu8i5dqmnnyhjfjnuhqjk5k4qiy8o8a84qs2f26nqped09z7zsxkzxjktzxngcywklgb6a1wxv1om8zy90oe9rgkfz8mm67wpy7x6fyeqva7bae3clya6mxg83frrvsmj5raakmjw2baw2ip694xr2ny7oalmdo3pzx9lqkpv0szi2qtojygg1xo7g',
                proxyHost: 'wlheeex1utv8dws5jx9dfhwvq7dwf017wmpvkv7xjv775u2jb523n6tclf3v',
                proxyPort: 2108003950,
                destination: '1wo10vm8flr64l4p4rcd4vs4ffqf6tvq0iact7wn1xlop9el8173btm3s57ndt0bgfyhegh6sfw4p00ct4pkcqmcdxjryn3eqgfnh3al49ydsvosy91mw9u4eiox250sebjr74boqof3zkdyzm3zuzdsg2jhoq2m',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'adnb0a9tnsmnsg9w4eg7625uoqq7rk17ypw8guwcjwo59ryejui4s9bd10lo1ty1d85iql7lu5p99axcmx6p9tpdpw2teit1wwavuyhyw700bvykf4pn1jdy6bbrnqxkv7dvgdqvqqfrgbw1lj476sw6whivqrpx',
                responsibleUserAccountName: 'ylkypzsyhh6j9fz60wrc',
                lastChangeUserAccount: 'tn553sxm61k4n6mtmawq',
                lastChangedAt: '2020-07-27 14:47:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'gmdv181a599nsz48ywjlxxa50ispo8ngyu46lfb34nr3ya3819',
                version: 'lbixsflcet3kuyqqgy96',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'pun9j6rndf9i3s06ex9jjd21q0jf91b8nzy8jz1c4rqmfiap25v7zgt4vq5tfc69n15qlced8kulp4o1itkh12ef7tdy96hsr7qjyqgh2bouq1yn110w1jvv2plhy7ig4cue1y21nnjykb0u2agqg7xb5g6wldac',
                component: 'ufok134ykzvydxs53870g4usibl8wih6vs3tw71wzjzvfnidrgwdk6zwh8dcg3fwtblqgn8sdzrxa2jm6p6mlw6g8cv6wowiayy1tqhgr3oozygne26abv27rkgq6avbr9aj027hw5ht2xx0men97yzha0cszet4',
                name: 'onikbka70jbr8wqncpkmxnziy3sjcdua1yspyg38dbhtng2ind8jtc3a60eod8lr4caf16m8czd8zzpjlntixyytg4sdcmnbmgzuxkudqct9r7g5hukqxnwvobrgx8ylq048fl7869smv74ksa74lsct4odz0i1f',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'zj6xa1da5h7u7a8zepag630arah7v2i3ppsi7q6uo4hcurz30xzvvwiw1p228k9mhvj2zxhg6x3cf1chd54m30yps6saz9tvw1ehj9nel67pw3pjmbjmhq4d43d0gp00494kd0ohwi70u0m7vzmbe4pr5c8eg5zq',
                flowComponent: 'txaftbe45z7h3pcfbsfzze9huw9tsi3c8srapwexdtjwotl4zn31zh66xk5ii3mukxx2n8cn59k6au5ovtxkocwq6zsvxem8qwcc8i5b8c6nr831m2lvjnpgo0hhjq0st7k7zz7f66paxhkrm8y2gtupk4ttfy75',
                flowInterfaceName: '3grj9uatmr1kp7d1vbyt0h9x6z26zsrnd1x4iwai70csv2o2182ecj3scko094e3qbi8dgnaclah716bfnstfjbewcy7ozqpjm0u5a8dcthmewc8xxuxnymxzgcl3auj1ghcjsfd22qzwwlx7ow217sjthzitsnkm',
                flowInterfaceNamespace: 'n5rtyontlkazdl6y91k2a8h958aiknth4w5pdv975wxkyjuuzqe2bh6n5i4jfy4oj9vhz6pwfxbnsrzxajk6lppmybj7tzfpmaoi07j85ig6s9o2q0ce1tc7xtavwy50or0kqimfge77ql8yf5wrkm7w0m2avjlo',
                adapterType: 'q3tuotn1ax7rb4qtj3rv5clh0zwfnz464s598rvbb7pg8lu1zdl5ui9immua',
                direction: 'RECEIVER',
                transportProtocol: '9j366gwbkbi47bsask47yzw3pc45zlxo3kbosr8ibkur6yij0l6glstnewr1',
                messageProtocol: 'cecie3ab02r69u1yyzk8lsjlq0e5xslbyep0h6e46elqjwxg66yiwkhcw0c3',
                adapterEngineName: 'b6fule7dlws45t0jfhms411avt01d8g4vw1ojdalme14ux4rrjjd2ro4t8v75agkiq402yzen06l4067c6imilehidd80gd8ibz0n8zaj4s3t3hx0sonmm3fa7a07hrvri8s0i3t3gzcfgo26zo4bba47olct4mn',
                url: 'zdn23g8yc66j0uswjalbyf0csv1gnobywaldxsdktzjl89omqucwj5sckqlyyk3f2bjku14yumfryre8elixc69bxmw9s9b9uxtevfrhhn0rw1tfd94yyobxonv8qelwywol01p15ta0xd85z8jg10hw9t1foy2wfl1c7rmq107o6iwh11855q7mq3554xdoduxkhliz9fd63tl1tvuvixza3lv8w3sdokj491v2ou7562j4md9bv40kqd90wfevv47h8fgn537fbkna4d968pxj1lwiq1l0f22rp5cn1awysj3tnyyr40ht6r9q1c06',
                username: 'no5glguwvt2hl085we3a5w4vz0f7oyp67uy5fnvt26laxxgdv31d3y1ghg36',
                remoteHost: 'utkv6j5yoqhr8l9kock6gu324uvec8crn5joqe6g57v3j0u1dzzsh3iicoxf73270erkujvpuotd0l6t9lu6s35ul59n2dupocypt04amscor8myw98kuyqe3qdfqdvwfn6y2o869tdizkaxmjqz0slwnzpmybhh',
                remotePort: 9435296338,
                directory: 'nlsq8e0yc5ri53n543vq0wl765n8j0mzynxxsy8lwlovh7xwizpghmbilcczu1fzgv8om1egcwdpajqh9hnxwulp6c8kbxttsh416lays5jw1i8l5skz9kvms2fipi7ev60pu2tb7sqv3wmpfeeqltonr850o4chju5kod2dhus0ldlc8eodl7w7x9cdp1edga5je69blwi774w89ayto5gwshtfrg5npqt2j9a8m4k8ry8w8eozyb7bzt6ytmnwp4etz8r4ruwp88p6mc685zgn5y3i9iueie0nqezup9xhp31oa6ay0htosh1qf925vptm4mmn233aqb715vwnvrvgoj9knmf442qyd0z8ab24wxq5cnu5er9f1f9yetg20igm4ux38kgz05j7f30yyo5ilbmxcmjq4czyoowktqyuqb9du9hir90rqwu8gd938vh6gt1bqu228l6nid5v750l88ryvjld9y9xgnbjzcakl79vowdsf0jkh4vw14grwl3dzpozrop4bj0cx7xi6pnqawpz3fzsil89b3vj6vc54cbvs5vdn1j8cf0r6uanllx6hzonl9cbl044mcenflq0hbtfyjqrarc26vdni9muh000wuj6vu5dtgzzc4e3csho56ke58ra64ip20bcbmos0z64ohk6hf6h1kycumkvyyddqob85ah8m70mt53kal6y34iyllg30aq6wmbdjrwq7l0d59k6iy57pdkn5tp51hswrweetvhclpnqsd5jdjbrclmb3c00c5ubir7t7noe5eqe3kvd07uya9kvfov4savtfz5s7k6xfhyfkbtc4vg02nj0hoi5q2ueyq6fojqn4tb3fz9zi6vdxg91t9mkwcdc3z3ubx2n8wfs2320aoujrn3pqvamczsy8g3ru7f5yvtodrqk6usfe3fpynfflklcykj3p50yizttckytwjlb9trv2j3iiktfi37mmuviieusts1y2dlc875wh9avpgjd1fgwe4rjyage55cq',
                fileSchema: '1nbjveuiyw3cfk02l9o4ivz2kx1redz1fiv2sl1o0lrf2ax0wmpra1j55x2gjgq0r0xsa7j3vbeblncwvkvyh42xcnfx433nlpz2f86t6doghrlamd3goh886habahkvpejeqzy2mdaizfo35dwvsck54cbs8vzgiyl4krt9grmqht8lzuge75y550v88jk0pz20cyl0pwiw86xas4cjfzgosxxnqpr9avhv0c4w611q2hm9igrakns7798ktaitarw5izj5x5bq5a4ey5nz8u6aldrbefzo0xdnce5p5web1yavdvlyjs898wyk9xk2vjd0qv1bf14n2uftxxfopus5oir27hp3lez35it59empuhalljbjpgdqki8jyvvb7kytun4ms857h6fr2qxxxqpp56up7nu4ay3fua9e3r4vdwmji049hh0958a61vaae6hin9y5zqba8zoqv0jou1onaih2e1kd4zt8z1wi79oouue4zp56ewftse1p2oid2hqajlehtzm28smyznumyna6z35tbrkmwfs3bwg1rrqblxumsi8u4lp1sujjis8rmg74x9h222wvqzmskjdc0yel8trfx6pfro7jczgzzxcmhucqbnqno0m6at6bw6b06nkvmjr84ri8lrev0a2inv67k4bdkjpfu5hhdh7w3ckr2x3vtjrck533vlwp2ufgystwzf8jkty51prwzkkxtpve3rk7ff5kvk6yaep8gtpy8ktx4usom55zb8izmy8bqi1bbe0f0am5o495pbrvpt428zgc8zeza6o6ksm6sm8knr2wg8citown2mmmvua3nh9gqfnv5g1l162bwy8a85msocnxeawvn53s82ng49p050sy4apz1prgs8sw3ogfn34c79ca0v379xo3ty1z56962txsmupbbz0czhshgpo0eclrqjh0ykqaevq2f9woormz1juusmvdaq46kq9325yeao7l2wlf2v8fbexvsx4675nd9b89d47hl58w571v',
                proxyHost: '6byku65b1lvgfbbewa9hw3i7dm49xou3td6u2xt88l0xn86l3b525jihhtma',
                proxyPort: 1001707527,
                destination: '9cspyyoucw558ok0zmewrtsysbe94529ziqgfji9f3d4k7vf8xe9mwqsvyrj9id1aa6k3rx0f3uxtk5wlfbp78ykw0s5hkxzuheep3m290lgl10lpqrf27oyq9icl7rg1rcqsdzv3ewa8nchyoopxcgcciscff4c',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '6fv5s6v6df3v7gdyozngflt9x1xut3st5z91xnf40h6t2qwcksxfmzmn91m492990nvn1vo70yc856dk7wfz87l9lugof72egpjjr6dl56nrl3iqcpu8fqne154idmiuj6c2oz7b3up54e1d9bgd6nmf55ls3mv5',
                responsibleUserAccountName: 'uuyz5ayej4tct3umhanq',
                lastChangeUserAccount: 'yne8geaz25psvlj6fiqs',
                lastChangedAt: '2020-07-27 02:09:21',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'fdp2ec60a609glg8wo5es6381yyn7eu0impopwzpkoogg41txx',
                version: 'a34ft7o88w696w8x68o5',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'nz5xb44rm022ywi69k1tg7psh7tjajk6uasuguos71skktrtikh0h35l4ghtvd8jl6j2z8yxomq0048f20ir6kqk6z4ivdezeks6eq0osolabsq79zusl96hl2v4fr9yunfjq57swu383px48uan4i6477up9pfi',
                component: 'b5zsq3d4ll2muq18rr1vrrdwi5cq8pcuhuxcagsb2z99n5i4t2bqn7bdemcb32ewrek1y2hzffuxdinr38x5v8fldhjyzhnu98p5x8obphi7flquwtgad34ytz28y2lacsfaddyd3nk8z7cil8c9d59yvlummc9g',
                name: 'p0ujsyb2ohjryw9q940j6ahy8sbt2bcp75dclhod4v41savrf8bqeubk8sx0e2q82ex9x91ufn2onh182absup4t34s04d1hghxbcrgs30pbfeuwq7sptb10uh9ri6fvz3bjwlmoa9ppito0ao4o4sg02wqzmd5e',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'lzhirirrazdv6p0ggs47tl5h77zcohfn1cbw7zexpldl8k5176q6ap7on64a9j4udkf0igxptd9255lyaha6p8ecclbv7pjs1frwshj38lk76emm529iy8z49dr68ozmku3kr5d7d49ng6gjx3yy1q3bcwrvzdxm',
                flowComponent: 'osa19377war8kf16owdnuasuu5w4qkzzr9r7gm1gsa8dsj7oh987a2651o9sih5g2gtw6bjkwxsod7ptlvba969ubzivq138ca1xkauechh9smcby0nfsjln3lvfngvv1gys5lt01qfcyke5kem80albj3mrkpmu',
                flowInterfaceName: 't7ebn5mfqi0355cohtj1ejbz2sihwz6gnqm4n751ikagn70555hpca7tlj4pfta4tcxbr38t0lqq0r3m4t7bro4g583vt1vu5hkz5ip1u8irv1nv3csc1woxgpg6d8uuqhp67wi45dhnqlc3tfglddc3g2nm9qko',
                flowInterfaceNamespace: 'xu1nuwjk4zty2ng24w68d54a7zs7u6trhijjqof64yh2ecng1eptni5pgayw6qt9vcw360ebmth7bps91ze13arktvsowp7wp8m4gb1f3c9zovrazutllfjnudkl2nloiup204w2py3yjh0xgipsoo529i8buaz2l',
                adapterType: '7n188ahizge4j870o76t6d0qtu7or4b6hf7u1ixlbuhgkm7804s6ei1f7gl7',
                direction: 'RECEIVER',
                transportProtocol: '0q9duv1jdcz6qjwhhdwq7xu71o55ipcr7x272qizunf0sj84dwj55su1igoj',
                messageProtocol: 'qhyqk9ocnzjyx2pj8e285il7197zbsgyru97fjtom6lj94yk1p2lz4lweyp4',
                adapterEngineName: 'd8c6b00ne1t11lphiyy74ay0rcq92lus3gioqj5bd2dxiwgkx2bzfc4ejfz4psfpsre1sqb952pueyysst9nj3n3q8cj0kpwdauh5o633x13nkmjjbdth6epz3z5lq3qizeqko8hq4fzztwawbz5u2gba05qqls3',
                url: 'zeoce1jh8li7jvuf9zv6nlk31j5y9nkrw8haogesxwa2pfroh7m6mpk8a7aese0156nkg6ncla7m440so2r2fv0h4isd405hmvaaho56n64qo94y90i8cyzv1ra6ro77k8kgmspyhcwp54wm3f14fu5wy0j37i7fukqy1e4hvfolpfjylpo0f5ci9jw3cc3sqp1lc5au7vsodfkgfgbj78c9juuu8dfr4cvhkqyutdvhx4wwnb00zocvdu4mzs1u0i0nxb25xfwpsoak0n654m7jio54h5qpamh82bc74bupaxmezk8sxy7fosu7w6c8',
                username: 'wytvih5g4dzt018geejx9yx042rvqbd0jutgvdbk2zqvu4rn9jc1hy3m62pn',
                remoteHost: 'svma4p859wyez3edxu9j8z0j8f3al7xl9rmpg5tbni16bwqgporptde2k0fwuww3v04ov5g3fyf05rxp93dmrl9kyptvyqlox5i6mbswfumte1qv63mx36wjf3syqbkd4hej0we699bqr2i50uricr84gkrmid2m',
                remotePort: 4490082160,
                directory: 'k077se4hjkx4bj7l6dfkgzpry1q1r0e6lthqwm95z2ltffeuhhrgrjgln8tbdr3ebdt60d57ilw5e4bszuuiqmy1lnp8e7hmr8nizk8fkzfkgwqgtkpknrkrcynfferb3ahbr0c38np328hzwko9jfw5jjtr5twi0j4l6ebjvjbgent5gga646wn7ul0qmvahggv2qapoxu2e53fditajtac4so3nkzlqnfmh5jl2hhfb1httnfzs9uv3xy2ybsrf38akvsf4femmv6y9eyv3x6xsrdfrhgpxb3aw8fw58umksczb6lertz851rocrcqror7a8ufdt4rcvwwb0w69ai32erfcvoo0ng9wpal6yqbfvgf4clnupbmd9pghc6qj656ga2e1eyyi3yefbo56tf9z4ogh4qno3y711pd7e8rxr0xsn5hg49enwwgxivp9yyqjqgxmh9mhqsc6vzx4elsna7didbolllumwgozh1aayqk59lcle8zgt64y5hvu849t2zkcwu05brkl54p3mc9ilgps482tx9bfax79q74zus0fvu7yx4feapy2lmfy3vg1r8o8edfk2kgzrpimw7j1thqvq6jmgsngy7780g3oi6dqgp6xa5io3cdnu1new8rq45igiyrsy32np7uvsrpcqq7ubv61e5thvk2tsqbprxcwon1n2yauu72ny2pnrhgcmduopstj2d02mipvvgwgult9ofszizql61fobxg9ybzvrs8242n9zwl4z2o323qz9tvr6qy78vr17b6coafgkpo85k0dd8oft371762wh5ezbycy7y7wdakug3kgkbrlkwclu8te8pgwdo5ulrlwlkehv20yrtjoil855fn2dogidt9zmakpxx9mgxbyizjalzz9ig35ld4bdon6hossywt43omokc9oydc2jk194s7ut51pah8fym5ypl3t78stha17j7aq7df3jo2kya6pmpun694maiiyjuotets1y7aipwc3p81cmbe0v3k',
                fileSchema: 'knmvdet1jdvf7z05de6mbxmo966027c2py95t967zxkh51yct02f95ldreqj85zlkmxpgib4vx27qie88fs5ky087dd3k4rhl8e6cyv0l4ez2e2xp7exx6qog8f6sf6z4jwsd6vgpu82kn31djnfvcsmzy4u0m2n0ol1l6y1ngmsyvxl1l69kvxbw23f91gtxmh40e2k8v8dv40yz1sxayis4lqngcrk9zhh5wx6i993nyzv1zmcb4g2r8y24u516yxmahcccmozpltqghe7yndbwks7c73euapcf9gdojdob4oahwz4xh0hx5n9u49k8kv61gu4p6r5pcst21qwsdmec81657w7gyzaxx7ms92qpvue3lfyqhppyhqb13e0fskduaco87xlukjw2xju1enk3t2j6j78lc45dblwcggduyudtx39n1dq04xpnxpc5u05c9o1isbgix017312hrlautaonhsgok87aaiv4d1snomkbk2xzspu5c1gpugtcrj2s0llw4yundm2mkscnd5rqxzofw9x8k3u69hrqa58wsd1eoj2ie70rq3r76d5chy4z2dnkrjj0g0csddvtg7pzjsimlesmvsc9xbztbcvuts5uxwr3sv4v0xt7rl18tx4jge6txrxgopembfkuoi1stlk2q72ltb21zs356z178b1exkya8g0org4h8lpxhiyycicoiwn1k70mm50wt3l74rukdr972ljfhl37i2kzhe31gs5yttjp69w0wloxr9a9ru8zz3ua2f0aap8qriudl0dc0z1kyoog9isigv8td1vwer4yukd7z268hf3gvk2upykrbd4oqyll1wf400y002h6pkx2mrnohnv9yq5ecshaileh8zdzf4faxvvpi9iitrvsgz9irfn5bebq4i7hxlq1szyk6qyypy6u2ij8t6we22kuq4ukxjhznue54hqqq8x14jv2ydmtq2hzuxb6mnm6s2tagg04mk5bwfat3jdkj8sh9lt16pcm3md',
                proxyHost: 'kzzyv8cdh96l7ltnja72we5y2jw81b7m0lhik1mio7t0ywodmxr42adk48wk',
                proxyPort: 4364541609,
                destination: '3xew29gtugxylusvjvpsq83uxt7yzlnlajrvx8sdpz39kwz4inmdvvk4pxbq58ac8hw4fdxtjlt8ggl99ih9f1dx2ggbvt2du302u7le2bwzpg2hxenx4hh4fkap0hwgt0ls8asgtrt6nzintdrxf3mhi0wgfbcd',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'bzu39pipoqn0bamycd96cks81y064r77rxdxonlxipvh5gcbsl11bzk15grkkixtnhc87nqfqp8agjar3j2c63h9at1qp3qkng3pdt694qltke6oxdno9imcosdn4xymlwfgprmu5f1mtj5mnj3ohqm8ec6gtiai',
                responsibleUserAccountName: 'kfjwenvf073rixyeyimf',
                lastChangeUserAccount: '3fxqkomridnm88pzf285',
                lastChangedAt: '2020-07-26 19:10:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterType is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'nczddafe3xeyj60rr28k7r9ngsj5xjo781v0blxqy163hvbp9c',
                version: '5j1zyfcbjjceqykoqwnp',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 's06mygh337vm35xbuuzb2d4ny9aoj78o9mxjcbcvh5k7320gnzpbnl5pucyiuun6jq4umvw3re706os0an6wikxlqcv4pdcs2v91y26cjjiwk90k28rb2albd81xouhzcb9ty38a27v4ghh9431kclmgshp469sc',
                component: 'gxm1mhzapq05c3aerbqaa1xusif3c4p69c997d5kdcdy5o38fgs50cghy5gphbsdh773c3iynha1nu2m9yh0a10xmj4kp12n2kq0fppusrlhzyhrao7oaqklbri6oqujpckfpv5cy8y3tzv9npsle7im5nm7xvpq',
                name: '97rddrdj1y0alc0sb7j4v08bu9ycwcfoajzsnjm49tomny8h43b1kmrdnc7acb0yvcydel9iv7uacg28h627fem7gxfy48ms7zjc6x0vdextkgp7lsxjg1yvz47qfvtlppv8vzf2pj74hw6tvwzdtk0hk07ymv80',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'u0csjjxzc2l0mlqh1hxv994x7wxyp55kyhozds6p8g1fcgb688hjajawrzz66k6ah125iwv96qwj6ua8c2ab3a0hwiq5nabbvfd69wymj0ivzryfmuwuwtqrb6yusjvhwa2ur198ipfq3n2wxoc07hlgqcgoypru',
                flowComponent: 'shsgraufyf33ibxklce43unk37kph3lji4fhgkhpfg4f6gu0cb0432c5i9za766ouzkgnvavp8s8whk2o40jg3ax6hxrpylcp7iyf0w7jysgrz2xjoq7n3anli1f5zos8iredou9aa3soc4nc1sc4mm1ycz8eiab',
                flowInterfaceName: 'fejln9gne2t6lvqgjsjxq0lz6esizyb6dkrwj2cgnh3tl8ag6haswoifrvldqwpxpql8gmq1dk5keuhryyhiw8l81k0vt7i3wezia36t2a4cbdzlcnrp04yxayuh7edw8ozd0aptv9svp0lhp2fz6ah83lie7uwn',
                flowInterfaceNamespace: 'xfy4wk6i6hf0rmj323k1l15dyeasd1fyq8bjkqyy82g03x8kikk603uoeb1fizv45kgn0ve618tw4zzgbpdez0pzwhjcajb3u4z6e931fc5rg5ycl94s4wjqyttxfxptxdlbuvhc1rayrcqhkw7ugok38hsruylx',
                adapterType: 'evgb2sobbztdqnopf5n0b18x07euq1y76p4z5072y2me5heztdkeqsc38phjc',
                direction: 'RECEIVER',
                transportProtocol: 'z8yq9c2gi7l0kts5zqtw430qu37u9ckwzmegg7kn5ns2fmr3g6xb31oged4o',
                messageProtocol: 'vjyb31zel0v777yn9gf9umedc2ngw4a9rogg8ioxz8dsuqtj6czn7en4zdmc',
                adapterEngineName: 'a1675qn5tqpgzr3d2is4bp4w8ru912qxnhn15mrl9oud269io0xuqfznevaggdgyr191aesp6hu5oykdi9ncoaxilir7y5949uf2rjx6yzg8ywciwik1hsg2sk5iq5x03rxcwif3rotewz8llpe2sctppm06pe9c',
                url: 'zpx2u41c1gan3mwrbxyhwe5m54h5wwt2rupln4n7meftnqmh3fmund5adkm5xufqfhoe3h553i5ezo36y93d4cw90hzfjjz26edu4jelkhvp4egq0e2drqjqwkq1sub0i5gwddg4sw83x83dfqdy236a1wnhi710r40diujrfw4t3h5gwh45b9qr921tf7fc7ngpc6lx68rgjgxlgbje2kbuu7xi4sydg85zsnc7irsuic69hqhw25najk389k890coym48q4qa0jcr2ohbe4mipx7gkhnsgsswiqcafxzsoyb1eop41kqunwh1y7vgb',
                username: 'as8t9b3vanyffhxl48pq8kbtg3alq02ka4wew6fp3o3a8p0mppqhmz7ekhlm',
                remoteHost: 'd0sdhb9ohgzw740o87gqn5ly64wp9mf7u3acn54swm3od516z1mtb6dikzfrqheiqz1r087bfxxa8tl6vn6hqu7xkkwyfrdjuv34044ai5wznoea0rkjpdihuhgn1i51g1ny6gkvyds1kibfvmu6souoj31omm9z',
                remotePort: 5762987468,
                directory: 'g0icmuwmp1w19jagl5z9dktuj9zuulshjtdwvu51m2xrt6kw1touwr3cazvyticcac3cw3cc04xzacsbgkquy4gufzbc0olg3frksng17yyxq24bjgehryvy3hblcuc4i2fjbdnvfws4snr0hby7ljd3nnjs7b7zar3o9mrvhn1tqpdlt9ajg3mcnpjecno81w5lonn1jm4wf4sot6gy501yliq8qm88qzdnkvdhco5srjym3s88njsidy0mhjmp7b8qjyzohsr08wzcp6rh7bvcrxupvx9iskuisiezhd7uu92j6z5fwdig7ytvnz15enile5icso13y9lu7vv41omukyw4azo4r6eyuvuu1xxdt32tn30ael0dak499jen8tpshgg8nefy66vzyjaa03735h1epm44qp1t75aj6s3yu5ctaqjypfu3hmmzb19q4mgh2u8scs6gbh8nk3myzdq2247f6gn7wps4z5aeyfl4m7wxs6c0cvbnccb8vp0v29yk6t8yq4623rwgxb5k6dyhlqvxmo6wxt11g275cvg82b4h2u6hf3ahrpehqktut39wh0mil2tccm5duenwpkwuptkxrzhgl9jcdx1jekckcr6eeanb1z6en6rvvx19spmo0971qttfs34vqmrogz7pkwjrs02qjhq55jyns8jwaezb2wuedzokxfinpcddqfuwno6jp4v3ri6aw4xdhmknfu53riygcu1ksid7b4z4tl9vvad48ta0ilh48hohh3is1djw0alib86r3y36dg3odws01bn1r2nx9z951zdjjdqh8nnxs78vhzad1qtbufm9v3ic0rhaefhcvdhpb4pv0cf3o0twvi82ug1h6xt1nygy6kzs5d9w64g89jvern75yn9mcmhvu7bdjkmoy71fofqouw31moiziyfpzfjk61ukcusntvfsk693pmemshn19s46a69ld4gajl4d6tg4af6sf7nm6qj8dh80tmw1ify9o7sep6y1a7rhlfmp',
                fileSchema: '9vnrmtgi1lkf7npn7stsplazfrrmsf96jeaedn7msqb4rqtomjjv344z9t3e6phfvkdz3zyy0wm61wftw75uhk4rqzxjr7johm3qcud0vjyjckn9gooh7jq0304t8w05wko2fy7wfs0nvgia9cxlyhv9ejhzsbfu7i1sf3vs577nc9ayvuq8cb8zy7wah3c8jtqhfou5w8sjl6eug7dstaibl8bsg96sqdbgimm9trwtk5hjt5w3i4xbs2wu689t4ehaqlq2ftscebd2wei06jyj8egddxz9uuin0o3n73o5huo4svu147o6w3ov2dbwyi4b1ziiks11xo3j4i25dlx39pyhxic4r1qazdvdgtzezcuov84sk9muoo8aid4rk9fm6ylz09ltbg1msxeht9gesaniko0hcatsyktuocvdgmokq2n935y79junmog71yzecik4tyahzwjasv8g37kb7744mqioz65gcjrkkh3ukyuptkvh8hdsgn21o9wq4g46c73tftvn2419k9irctvwwwxd5vobxtincpvr3k84n416q1t4sbt2gv7j05ix07bk3bdvo140xeosapu1n1hiacqwe3kq9czu59rn4pyeysf4fr6atu95jqi51yitjihcxqb5nuni3mu6vc7sc8owo2wfjofhqlsi21os8secaq8rxo9ctdov4x88isappg7393lh8clslusbu2gbhvkcwy79i6or9fo2spwadpsps7g196z924au2a9r6gauxuxusuhvirq08lakxmjyqgghz14mws6bba39z60yu29qe2drjmavi8964hihbe40ufzctzsuyoc5lnu5627xaj0oy3y3jg8yodqynakmeb6v4r03foves46xv5khvldu09zwu7en5u5ofo1xib8pq5ujhkgx8aqlfqfqmbbkjtyolsi15l31c299ttqr7zf03y06734d3anci3blhl924tjg9zluuvx1fnybsczlable9mrgwl2aygaf5ize8gp8',
                proxyHost: 'qj3elzgefasv67i2derb1l46hk4n4h554cbdnvtfwux49omzyh7wm52ccykt',
                proxyPort: 2887373397,
                destination: 'agk59zs5yiil99vtq8a6ab7ic11usm64nr4jw7xz93z1s4u0oy2f2njbblzdvflc8wyshiaab1ejckulzkv757ysondi1havoy1643h4t37ox5e30jct12xo6aiboh7m147x1wbtoz9k49ss6oxjisrpncvqdd2u',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'x11owitd86gmge33ghm6ux8c9brw0gy8y5nqqfpiqu40aiw0qrn31uugitaehfzowoc4h0r28byrelbe79lhap058c8nf1afe7ch4vae7uuwbh2o5w266tccpef1q3dsamru5q38961qtw8qi0p1bt2dyt869ipo',
                responsibleUserAccountName: 'qo93pgt6inexgr0v09y8',
                lastChangeUserAccount: 'cb4h4v0ue5ub0913q8h9',
                lastChangedAt: '2020-07-27 14:40:37',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterType is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTransportProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'nlalupmlvpe2s2x2ireq51wo9ehuburtdl9agyxtrw9i03p1eb',
                version: '2jlpelk1s95fjees7iqj',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: '3uzrmlya1rifaneh7bwrqwa9ixg4go1nqpn3za2qdg58hedqmctr7255ejaiwk554pkx0x6pp4beuc38c5b5t3w1pno3g9l9ij2ftxx3tnhcsg750xqf9kgvtondmyj3bl5lp0xeri2p1vc0vvha4agki97dupjq',
                component: 'tb22bqa1ggr482zbwh2798x6e3sqmlyh99cm5u95qocegjrgl3oncz8n9imqjd0si2w3lspruf4cvs6ix4q0hqmjjb3sap93ibm168mw3f9pvwlpzm9n3zdetnvv4w83e2uyrboqh2jfp73d0a18nkmxuh3il07f',
                name: 'x20cyy9g1y1ree6w0e1nr2lq8zy3azulvxreo4bool6810su8d3uleyck563ljgm1niehiqakckribpws899rc7mhb2ehrvapdsx7mwaz2g3aj7uow024yqvmhuh8rmgzh9mojwerzem3lrtj71pu803x0t7yx3g',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: '02m75zc4qyilvvgsqfjngm3io5q9lqegyv5pf7tkmu49fofcyv1be0rwp28zdo31b9ebym9pquytez2q6nm50vz33hwlzcgddaglgrv6e5zhzvr8olh50lvhvcjs23fdyefpix1uqd8s05pgtit1adfqhxkilr06',
                flowComponent: '8hdaiy46rlu8xzj6wqsnsfqtzk1ikzns2y8mqe0fgdxaip92zp4tbfz769hh04fxtt56n00gjipncfph6rjairae0hb4379avvf1bkqd3f4q335bhjbvjlk75exqghq2xp4l0jrndyvx5w7zyhyythsdmlsv7p1g',
                flowInterfaceName: '95rfyjlg2f980uai9hd3oatjn7j0hhk069wq471ow1w56zgup2amu05w3cp8iyvfrpb3u729buk0qoem2upbotr87k0q2pb830wkzf39k8fjdeb8i8tktpt8g7kdl8sivktbrajiu2jdxw2bbx6nfetxxp18pqz0',
                flowInterfaceNamespace: 'v8x3kzk7z1sxr2vpa47y0amldcbktqaygubtdj43va8fbnfip5fq9rdltpel7qut5fp4fpdqmg66pnl21im7g3vdrow29gxe25jgxgjtyyfqvqzkmqrypto3v14j4fggiyu9x7bt4jipjjxjr5lsj3t9b9ubk5ww',
                adapterType: 'nwdbvnfoy9fme2fvy2n1dun2tr39oicgcpuptbj390j792qwimtzitkglpro',
                direction: 'SENDER',
                transportProtocol: 'xyl5534bswmivqh3k9q9l4wbxialcin0xcw1doarupldobdwv20k0m3snss8k',
                messageProtocol: 'nr1nlmhvhsqjqdz5jc1076hbicotjmzyd9smcqc4xdsvva2o0f2pc5u3c4jv',
                adapterEngineName: '0dd3r8avuzsi2f2gka7fm93qi95j920kae30pqnrnzsyuu5dvs6zdu9w4x48twy1dgt00yu14wlu3jct1qsz40mfdz36k43hlgh0kkwpjwyofmacbjqlmjdh1p5hsob20xtjqu4ep8h4nn1969v5nou8yjpnpugq',
                url: 'x5cvixx7szhvzps11ju4noviqsudv3120so3gc9rmgm50wiocyacdw2734yi4zdk40xn0yi0zs7xcqdqw3e0ke0dmjbljch81j6noyhsy245zumeu8pvyptkapdj3ogo8nfwagixoj4sreihd8r833l1q6vl2uqp94g11dgx43dyl60jm5tio7yeh33rpadpgplyg6f1tnc6fworf3phvy9zp7z6i50v0imqhibio3jdvk81dofq8q2nzso5fcinmwgbn0cs0l7izdlratimmvbfsmrvbadf21hq5c3tc2n7hsg52emqjgqivsbv4u2e',
                username: 'gj26l4fwqtoybgtoa6bfaxctvb3zlkwficqjbnndrubm9a3k85bk92blnzs0',
                remoteHost: '2pxbqnv9p2hfnakcmre4xckey3q45cv2hfi8eqzb0l36qvwqo2caednjjzbd2kj5ee21qfby1wcwq7vw6h7ypb7jxjcze7lww6jlpcaolz50sblktsoiy4w719i7nte0tg3w0nbh6a0eusevhluiyhlf86n09yvp',
                remotePort: 2327059417,
                directory: 'wl4uyn2d4q95cbbodffyyyrsd02r7vr1vsymsopf4x79unqdy9mbipzlnxdqtpb67mkti94g30azwsb8mw71weg6xm3udwbgx23p901jzl4xgla8rrvuzx81n8oic8xes57vx4nyzodt3av3p0yt8qjjgw4hn89tmlqa3bylgkkk8rwjh0zpu64uw0ovh9mfale4tkzukrthcynifs6rmukf6gy3jpjcwzia0fuscvr5qpqjdxym3zvncumbon8am6ejuho6eef3wbixj5nkg7yja9q0bqb4068w59wumfdilv88ajmdqs6uo8346y6i9vpqg60bnevrjd68a68ia36tfkw8fei9drlupj6fwb1eamg2zblyfctt4p0mgym4b3ge4xr1o3r29b1swkctxt1v1sxyqmn12h8nalcnmxw9jq7jtc9kmzidpbqhhwysvizireeq1m6a3cgghg4wi5ygj2b45h35wwnylpml13ehiy8eynrsf4uivgt61s9gyp1uhgygut7vfj9gpgt8ej95gu8j82tyo1gjttbq4adqig35y07c6lopqwih6tk7fb4imlohcd6jktlr8e5jap4qkmvpqcvff3jialjhnynh9q6r484imv48780t1wyx0gdpbd7pbcifqxe37oxh8i9l1hfx356tm8jv03kh18vk99xslofu1xwhxti4y9o0gnqbe7vwx06bcremt010mhwvr6khtxdlu31y8uxd8c9etkpgs6rjdytmwnrqmdjg9kcn13d9ijrl25hwwa496iwr7xofqwbfjb3b7hdxbjev174lrr58nuzehdvg9byqn74w6yc7t72v2w1pp9khepnopq0e6jqdqdhv6pufsc3vg6hfumyafivew62cj78jnw4awhzwpy5ywv614l4m88sdtqtr9dihaho7brwvw9efop95fd0qcxyj6tx108u9ih6sowwv5obu9tyfjpru5u7jtv9b0c77rnnrfqds8fzp058362g0zgxusz0ccpvu',
                fileSchema: 'wjv483khnkpjhq368iop3b3hz77pgpi0ffpt8ghu5bd5euvycriy2lp0hbkpj3b3qqmfkdlbotldqq1zfw7qgxwfkjryfpw6x1rb5ul5rmtsfh7xdsrl92fzuohcm46gyf0hkxgy7cm292avmmuaeb7lg4d2ixlhry3tytife168r3clcevufszqwh6uwk06pv00x84mtl1mhtz4ftatwn1r5cjf9ubj7iti8x98ay1oc4lt4h93jf9vm3zpqnzkw7n5d057en3b4bj4ww39mznw5jpm5ppdeeyv8wphux90x4iiv6kqp3f1qanpmpn4423cp7f6c04j66qz9rtqoaii97hk6qg2ezobxeydpz5j33mmqwjfhn3pbjl2hf9wskx8ojtjidibgvonx69pci0wpez8ipgitealloha2ut8gkxws1e9usl8cwbi1whppa73ldq46gp72mgn7soinvoqx25qnjmhahdkcifs96nwe31ry1gjii1h48k0fkhn3qvzz87zjtjb6mxccxddc3t54x99zdtf76sdvxpxrm7jno7d96t3cw18c8gedr2l1qotbht36jxas8par1srrwkh2orgap7p2af4h1faehmyeuxd5q71tf7qraecmwkp68ghedg02el27nznm6ouw9rqaymz26goxsu7w32i2zf8ze8gbs4mtsf92lgezl5k0gh8pr81d8wzxefsmzk8njms58hwof51klmms5ag8jbaowueokx2box11pn5ziysvdt0afcxt68z1gjj1ttljklucffulg3chcknm8zinyd2ktmvq6e32b4n110gpgk6upxztd8ss1aacu9emcdyre6thorxsz74roujluhccjbb57slqby7ozzrr1pff691kptgnanz2ybwxk3da2wo8e4c0ndgsiy8qbktgeyx6c3100mz63994xbktn5fsmodkrx1uxu4b1tycd41oye4x4d148tzsdubhshwvgohp8afuepoed35uahrzot2ptzr',
                proxyHost: '5rvh9gksqll0pfui4ydcfhbpxfw3g6b48ab0qwdk956hc5t8d1twcsbqsxcd',
                proxyPort: 5990630544,
                destination: 'ko7q7vmvtjmgoaovwd3ztarc7mqvhe49gta671po6j22pqveqhkv07okjf09uiqr9j1h096z5v1i7vt9ztz42plszxh66aofz3odt48chd69roiogpadl2wdfn89nfuqgvuo96vdxc2zwb49fc2u9ndc6mb4tzb8',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'py4hqcctqrddwr7xn8ndr5jlnikc3ifwzncrhmr2znhbef5jsboxcqyw37bu4epl9fb5wt46w03gu1h67i76tcamjgq544bf7wl30dp9od5jv6v96oc5y8hf3lvdala6i4srufw4sfnaixcm0e69pcsrj5b4fgaj',
                responsibleUserAccountName: 'teajs1ii4r0166etcac3',
                lastChangeUserAccount: 'e5kpze0c82m0xmjrwty4',
                lastChangedAt: '2020-07-26 23:51:10',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTransportProtocol is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelMessageProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'rpdfl1h4qs455pd2ge8rpghhsx5ow64vfznt7w587iz46hhra2',
                version: 'e502wu3diajkqyjdxy6j',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: '8ae6akv073a5ec885t216nhjmwrj5iszasvzeadx2x0lx5lr9aquq7qsu1fsgilyovjgtsjrx83s1tdl3k4d5ix60y15sxb6j3zxr6jd8klh3ruiy1jedrw6unhn4vjt8igpd7r0rqqxerbsym3s9z0w8pyxve9b',
                component: 'qvhcq40hfydvdhrwbfkimvkydv2pmqivjqmy3747tytf84xqb36brmifjne6csvz7nwswwlsg5gf4tu05k13tbsskmmo6xwphpq32lmomn2qi7z96wlb67kg0gtmgljbld7bh359phy43c6p9m62aqbyaw0z3qrg',
                name: 'scelcroxb9ydyt1ktnecncctkuahj6aez6n3z9st6vqffpacnfugmxqoqi1a6urfvzynxiiz6fldr7pydwt41dz2riobkm7i8vl8l0pe83arixcw1434wa0oo3siakozgsev4s5nu6lyf7dyyqpqvfbs9at50btq',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: '8myoirw3yez5bb9ihhnedvi0odtcc0v57q4zffm3s2r9rh1pzqo7zfzyevx0tbklfimy3ef79lxc8h2g7siajl52jo2bh3f3ozzsaf40mm6x7hs4cdrpctbc1uuvewxk8fzfioflzk3jdkbs4f041deshpmwovij',
                flowComponent: '7ca3vkfmi38jz5r1yquf30izagttkcggme4aix24w19vodz0wnbynnkixlgquho2xk1gqnefiih8le8zbz5ao6hy4iq1s991s1jey2iir9h9fo1vzb0e1l9hx57lazp48t8gt1r7vfh1qzeplbvda261evbylj9b',
                flowInterfaceName: 'rhkpmf6gz6neq3dx8hvp2wchkwzpw1a1lz9wgzes663i4gaikz641ssx1voucx5bfyn7i2d09d2fnml0sv5m1q41qmnqwa6tcy0scdlbaruk5w4in169gfuf9icwmlvtth8g17smybfkzge4j6obb3xh6q4bo8f2',
                flowInterfaceNamespace: 'f4xxg2wg13q1oxmhfna4xgsk2wqnxdp9uugl6xxspn8rjwmd8yr6slhiu9lcl1s4kve7ohkknhip4ndcu0c02s2jfuq8h57zpfks57ywpibikm6g1zkjii42k364r6vdcqlk3ay2wtrcn1u27bwxd1v99xwem27v',
                adapterType: '34nwd5ntk4zfopufelz12anjtciddvzlr34numflp6um8bsf23kbjxh9so7c',
                direction: 'SENDER',
                transportProtocol: 'fok4xpdid5d2km87jy1l895pg0zmk3z89yqku6d7cfbsv0je08vxv9zvxqix',
                messageProtocol: 'alxrovd91kiq3huwcpzeez632e6o5evb36gaojc96hepprvgpeacpag8viwj2',
                adapterEngineName: '42ilgbu1vrylkpavvkpaauk6ywsqjjiec0269vwba17rewp45s8oxsjyhdxam3154y0ikay38numutzhjvutjt1j1sh91j5hs4mtud7i1fo5h6o7fb1yyd39n9f1ua5s0rbbntbcys5meag04ohwpmbudv5q8icf',
                url: 'y8gc2kc3887d3zy2phwuucrzlpythhrtbdzyl26pi0t5ltlkl59iq83bjw82hdwlhqoppbbbtq98m68xex4fd4j1qbih1t9gsej47885tvde97grry42irsv32fmouddkj92dv1l47dt8w0sq1s9d62dztc2hxa9mkqt2l3ixtjuz3asdvy6i9lsth450z28p8v2yksfuv5gt37mdjow55ljc3uvyn9dr3mzqdhej6z7tkmjzshmeunyja5ylt3q7hyhceecesbgrzuwa903no8n4gs5497krtbdnmtfwu3g0twypwntyiy6tx2ld8e2',
                username: 'aluo09xv6aj3j799cxzx5sgv0j3fhqsnwa3nrtutfj5w6q4kbn3dr1hnuc6n',
                remoteHost: 'yktoonaxei888smfxflumk4ttjxj6vwc9zv1owjfq6ds6ekkcqkfdy9rok2i2tvqz9ln72e9kpyoptym0de4z6a5zm46j08rf4n70l66529j2h7z5tgdhr7s8k7h5cuj7ubla76ys597vzxyvtlik0vx8nc36j9f',
                remotePort: 5113418705,
                directory: '2xe0h13g9o84ak9zlqlqnqzt3oles3ve9p70lw6s13r8l12rbfap71aijfnir2p6qj11yztuwdkjxm3968n4z4pjsa0tbqgvay6vujfe3ldso4na8qb4r0zsrs9409jddkirrqqc7a0zaksgtdmyf6xijkuxw9c6i7aviya7col5c9mtrjl02t794ipi6tahyjb4b834ryp46m2a1qe6b1brbrd2zn9vym67fr1wl4ptazfo7xod5k2me0qpseg9obr0rvwnfc100eudy5qdhhb23fj7p2vsp4a0dys9xec7ik9p86gv38rm0j3nbe21oacu8x3tm0axu9zrkm9imaju1aqa51r6as8zpxjfb7x335jm06l7jro51x5nj7c46wlb75ljifuj0os75j1h6gu1czpw47b88o4kzajcr8lojaeylf4tqtuzekhrpucbsya1ayryoafr5a1t6gbs39c7gnk77y9u84w6d789o07etk5rnmu4mhkgvnpnyl0ex5ibxdw7fu9un9iaz6xdrbip9zkqs7gad5z9vfp96y5x7d42na55ikxq9sf01z9ifzdvbik8h7zq1ri9mi7tr760pvc3v9gq1zit3g3bt1aiu0rr23hqfqgpulsp5goa1pvme8gxw7yq98txxa5kif0y8pgz6qy1rzg1xuilnf9ynyhg75i7alppkopoacglvtafee8d6q81321l1pp0qtpamjtfbdsm7slagtxzzdyi5ze8ck6h7xlwlyxlih5hcatt811txw9adypfms7fj1gdbpgrbrvgunsjq7okie525z9omuy6ujqb255kupxikaoe6slw4ai3gdr8d6gb89753dw6vl5vw7p38j3ld69otftok0wr0pmoc3erlklqo7t7kabfuuk69fei3ygd4lxn3p28hlszsdjiaay4225bclf8s2jmqfetz1qyam58yi1pk5f6ykjnzv5wryrq1faf9odp6lajdxym4kk5iu6unfff88p9woh0ew68nw0e',
                fileSchema: '90dqivnrlgnzicffqgn38m93bzddxsr0i7v8h0xh5zjsdkg6zf5ijtsthktvwfxvbc696pw0plsdycql16j6223idqar6txktek257quygbex3177gm3i0d3hub2fmryylc3bxbdh5cbo86ny9yw4f9xs50c6v2ffbh3e4j6mtqxpfb7bmtwdm93b7qnffpqq0ln9acf76bebhrncjq5xvb38266x6vhpppm572tjhl8w7lbzqfvbymqc42suttf3lawje7yvn70sno19gq65bejdhlojzr3cjkjvnjg9e5p9tlueim0s0gybnx4zpm8vfv3nenlz6ug2fowv2o8dnlusld3x1nd4147yrck8b2tz39l3kplkymoo58mjowwwv2cf3obdk82457onrbxk9ownrqf84t369z8407g6z4ght4l2p3cpgxbohai9y1q0iviejdkibgsj6jrnr53ia7ff9ijrkmq4lvw507fxvw2019ap1zta081ypab5lmcw1iqdq7c0h8ye51aageqft26jmhon5sdcmdfur1gw22lz97tyjvdesfvjkkbpkuaq9bdy6bg2miii5udy0j09m4v1ofn0iecze1mg7wipf89z73nphqr81d40zyjpl7ijywge3vgx8w39gwuvvo6jzexh3v7xhrxbejvihj75asxn7r8ay0iq80p8l2tw2fcx0cyzt6szrwyywikvz7eix5f8h8w8xzqfc9pcqbiz4bp5yexlc9qtc39s9tcdzmleh7e1c2oxsq6k036t5jj0r1h20kaau5zhhosc133axhcbpn1owfm2hzole8474s70wuel9o3qwxekjkts4neynqy24mmddn6cqf0ilkvt2bipbuy00wthx5sxqogcotjd35fsz3kd5fyvm94c26u9r5wuev8rpcwi84be98k4ldlzpwagd8pluodg1ks6r7kig4h7h7qhtahrcx6n32eydg1zb2v2ol5xzhztkcbb3q9rerll01ytt14wu5chvv7',
                proxyHost: '4yjt69mz4zcwn6cu2fe0ohivf1lb811taql9dyck69na1xmzm3u5uqzfql6f',
                proxyPort: 3026985314,
                destination: 'tgir3l2rppxrqh41hkf926u5yjvkyfi9742ef5ya46pz25c6oc6rdsqf7ieurez8tqgnom57kog1w8lmmrc8ra11cee88gp57r5bn53g4lvn2qkk8lqtvka5kd9kr40qy2ts6vtybqm1e2aatf9g1kqru7yz98tt',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'eoanumc2fk8bdxzdhhuiqm62rijpc3v1k6mjnmgr9lga9keqt98rzda2ha6wfmbge14u8m7wvv2g5if8aluiuqt5xbuy9whtq12qv0tj9ecurwasbprv1171n72vuc0agp2z8ux6d0e7m9tb0h9zmjzvcwh8mb92',
                responsibleUserAccountName: 'netfrt1f5361h55sjm89',
                lastChangeUserAccount: 'd1kv851azl0k3nyzd1am',
                lastChangedAt: '2020-07-27 01:21:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelMessageProtocol is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterEngineName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: '9vx4arglelegw20ckavmvooieh961ttfblwh6qnq3auq83uqg4',
                version: '2igivsf3m05ou1vmnh3i',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: '82c1ihmyd7tif2sa56o9ryb4rbpoucd2y748y2zii7vwgl39tgnhqdp7kks7bexj7qtm570qy1fcuquhyeas64ct32p9qz7fli4giuwhl1o3sjynxty2hvc050t8k6w5skhpmzltsee3jvr6c1aknxina5qprnms',
                component: '8lehukdz46icr1an0on5vsfuu1tqe0ae42qcojkiirusra58zy4nsy8l63fdqy7zno94d5gmfzkmm1qn1dpr398nf8mv846mn6egkyr6oroev7agroo0rnnqy9uxlrshsqw1f9yeeybf91le1t5iogo3mpej4m3l',
                name: 'gt6wluncbzxnkqoul1c5ccj5yolqkvdsgikozmwfiq6wo398ii8lbtjspaa927tao8qyi32mf5or7eu2ywprkfq6hucgsd4qq93qe4wjz3jm3qlbnoil7gw74x04eye6sehznj6y960vb5b4cz13wwg96dh99tse',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'n053bqraif25vufmrfbvztimlowfscjxts7z00jav1orycjfb7jw8gmdvok3c7tbbmco5c5i9xc1um95yyl5p80xsdkplb1mqtx8era62mb3yqbpbsjethunfk9mtixe61l6t01ttyhgouv074k22u70fv40arys',
                flowComponent: 'o7xg9vh1bigv7loznaq960fpfxuyvgqaqp348ww12wejhjse450f7us8fxi2uahamkatkatwx95oalj9zq9ei7cr7oerjo0qd00zbeuib4tudf5terbmy0n3t3oxsqz9cln97k5qgnjdfslmijet204amgy9nzlt',
                flowInterfaceName: '4ulssyyz2g3ijtywnikvzfwgi5s2kee8ip4om72nt5zq0bm9rng9syihssyaiojt25ysedqiyctfs7gleeq4eu0quunqje67nynnyhpyhfmj8ohh5dzulf7punvj0dowf7xz2vkyiab5n4066f3xlq5p3te711x0',
                flowInterfaceNamespace: 'chl30vixtezhlr2boas9bjzgeg2l18h0zf1pa3eq7nf5z8wo241f1lk1szlgf9fw504z31144cam4ldot2gpv4nondfjp961w14h6wvvc7k5eh02edj4fejjrfiohqbta18a6y4zetplhell8niq1vfiozitcgkc',
                adapterType: 'd9654kiyesl4sr5v4qzkpbzttwwydp5znzjz0316z82xugm21qyiziaxl0ic',
                direction: 'SENDER',
                transportProtocol: '0602lnl9e2gj0l8t8vhwm4pp0uod4vt12mz7plxa8bcj2d1un2g3e72mp184',
                messageProtocol: 'b9u2304cb215fa42pkmxsqfw4owbho33w653bf7ysjivhc62pi8cbxs3rzvb',
                adapterEngineName: 'p3wbui66bpqqvaoetx4ahwpsr5v1bb3jy2vpownreibds9gzfs0zwyoymd5nmwktv98dbh1pplmydu6ut0dvpupk3a41sedh9vevsrzal68le4jfkn12jms8lu6a7iml99nlonrhxkr1xpi66s825fg5bzj5xkhdx',
                url: 'dr8hx1r2dfuln3zodfe4soco2pa1o5f8ll94gl6273rcwtahm0dqf31pbhips1sjxjck35vujvn7yu20x0qbk8khsztsmuag6vxs8km3uafbsnrisy0oaact9u1hmnkybi6oqftsus6g379gczcyy5kakzp2x8m8rlp5vlmznc2g90dpqsztylb5dyva6pr0f6o5ela1ywl6h7p5ymqpjmq64shk5t4m8n4e3t6lof04ygy3lqcxnbxc75avlple3020pkl59tt266s85p3uqsngidu5uetf3uj24fxqimjb35ykrv7jc2mt7ey66vqb',
                username: '3fa5ekytu133daoqmn3plhntfqrqvqd9x3ew7gtnatsabh7h39ibtky3n8f0',
                remoteHost: 'elfycsheinev55f91tnzu8g3cfyq5u80dr6hkbqmclb5ep8sr6qbop46ymkigobojoiuwtqz7thdvzrjdwstk81k982g943r2a4ix8hv4ygwiazdqzepo32yfr8xffzlk6h9msuzkmtqsv8apqd27ic1ym7c1x4j',
                remotePort: 8774149084,
                directory: 'rtcm54ik96g518g9rhgadk5lo70vokc7oixjgdlc9izui2la43le8tme1ka6izwlb43njoulhwmi5nezgsedj98dftgexyz4j6psw8z6ta234k0c9gea47uwk11y8nd8sxwt9g6v99445w9qp4txd6v31ipzo6m3u2xzkosfwzfc7c3xt9zg0pl9go4rymgjz0rcr2s5r1ymy73blh8ihl6i2ffxp7a9ntcf5bfaz8sb4jfguz0mvu1640ffqknij77vs35hkwjpf27sazygzmcgkyodsqyn2ytk28f1cyde2mouqj0attdgacocfkmyfl2mcwojzi24j6rxy09rvuypnawa2jgfqauzwn8y7fsm6o7kasr582om5uwyo5xq39tr70usex7cwuedeb4droudypc4fb8wmk4lv1iienvxgu42qz6ldn3cn5t2kj1cna3ceteybwmrsnmn2f7b6nju29ag7s3uuf4rmzgrrq5yp3wr7luw1djnoxxjq4jrt5rayrjrwvunjth0w3n7oyc4u3ni33stq008kkzr33r47tyo84zxnzldlwcqha0xb9s74qcimz7m17evo01ntsnyuy0oxw8c5kfouujaiomykniesgla4ftdb12v2zthp9tfwjqmhkfxo3xfvlar26z5adouii090hqfs02icmma52ulyi62yr1t5bx3l5e4poxz1f0jbwdqtwcveyd0728ikq6oswoqnpfgn3svtkygnklfre6rom07dn81ylvotlc6nweegc9d75tcgp6hu7idbyo5ndz82bw60t0lc0mdkypddw8hahzqulbykg61nvfoeae1f833087je6swpppyp5toqwudxz4fsno7etnt05p072nj0kh50cl6hgd179upv8tgx94wkafipp3mb40wa079amjnmxr1aswsg32dea5qnchahwzm8jwwjxdixu1r4x8mcb7lsulssvuyme81p5zslf4oyfpshizb868mauokce60kxp3mpnjzk1w',
                fileSchema: 'yxizo3o9ady0sce9ilblww0vollo8uxhymxa47tb13jpraoleu3tjgo87u33fcp1m3pt5kjdr39x2i59ko94qi6kzjglcx1kf1f8qqj1ux7mximm85893avnvr4fjslj83vimv5raod94vn6285b2n29u09pcj6t82bs8q0es5zt5j3kna1qq9kdjf1to5h8e8iyoa3k81v0kaelbyhdt00druzwzqiq1assab90sz3rmywam8gm3urac296suzzlifrp19ol1j2zsjv1xnz7r42qtkkri9vctq6g80dqd55c1nuxwfebyl0h9gpaaarhy0k2w8q55pm3je0otfu94k6jp5ex2vhl18z1myhf5ewwy8160ic3c3na8t4dccgazf3je9ioqhlq607gf7gl1ddymwp0ggut03d630fjk6b002k7xutzbqgoirkkp1eqa04eyfmaqw1r3s56ws816xu2ugqln57vq7rdjgre47yhaylz9jggeez6i90mjgndqitb9dciqw9xc0axlfs7p25xhcofs3ipjrsygko9qf5amx44bcp8t4ej5d6b9copwq3fdshazzfgwn46u2jd194zvp76qkpcuzy2022rfe2sbeng40uaxwg3x67ghfcml2zkw79sz43z2d2d4gju3lyyhwu0o7pb87kukejuamucqjkf560pcp4xumeyy0ylqvn861do4k4fqxgdn8vy3kzjkcc7ggcebsutmzcftyt1p5ak3n6gek4elom7qdh74ta51mkegboq0vvb8l8xl0pxk4mlj06uhvmfsd27auvppafsxoyyf7kuvj7fgz7e0z3j5w3hiuttjy6ly6z1qaiajwb50a00buerm2asdonp3kdna4ivpenj450t6h6icp4xg7thzamg4nqfdhg7afyu7khbp4yp5d2ix9v3d2coal6l2h8190xvgy00bypdym07r2zg9pt17v1mef0xr51241ydrgou7e8kchwdzvb4ap46uvupyx5g7o8n9iu',
                proxyHost: 'qf3662nz0pvbcy9g41u80ycyzb9fbejts7f5equoz11sqtjp8si3cd3jd04z',
                proxyPort: 5980777307,
                destination: '6btjszq2kds0d77c4a3krvd9zjmsw5sfa8znt5xlpgqnwzi1qxtosyaz0asrlpvkgm15wrk2ll81pkcovgltkwo2kerz33sm029304c4n1skbrenyyguddwq85id954y787rnu7it3pfc7sd0775vgpq8ucsm2t4',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '7teoc73cb83fe1j8sc6jcwl9ldnsxauv3h492vfaex0tldp13dcs2q1z3acnk0iivibfxupduq3l85hc44fvq5mbyeiwin3ik1uy4fcwsx42gttfe5k4cz2ci2fsdsf8ip65nj7p15ksl3b4qnbkedsc3q8xb60n',
                responsibleUserAccountName: 'egd69pkkl7l3ul49x0r3',
                lastChangeUserAccount: 'diz2cyd95c41xg3fxw0m',
                lastChangedAt: '2020-07-27 14:40:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterEngineName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelUrl is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: '3iihlnfcj9atino6lxz7qcb9dmdr1i3oqjfmvsqpvsiidsxita',
                version: '3s9zgd2b5n1wj7tn9vb6',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'wv5gao9ig43ubzleg3qp9c2p2wktcn0c8f86clrpjv3g1ylc7l0gb7q1si7nqikbtk2uow19gkg02cd880a6avz76es4eifrd79e3emjp7p2r6p9yums509tur8qvmr1fa4tb66j9jz3saj7hc3qbxwt8xabtd1x',
                component: 'wd9jrx1l8isixwaw0l97khcra3melityc1hn5gg46bpr1j1yvb8wui05lfmeo8zbgwkyrj2c12plfm2flzx0gdwx6crv2g4h9q1nxhqf7n1lwvoa9jxmr3l3qxbiqup1r3ha6njal6yclpmx7w23qq788ee9znky',
                name: '5wcjxr79iiwx44detc26a6manuq2vrg9cctu70e7hs2o0mqx3i3z8lon16uobrteufzor2ae2cxxhjvcvu48i9szrq1pi32r1srzpk2phutnprkav6uwlcgiq30owzzhh3xodscr2pdtf8ev5c6iuxfurvb3r60e',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: '5hsxrkx52qcu9ltumilrfb1wyjuoo4xzkhlsegrn157j0m025bm701tj6eyalkwomq4sdjvj3j8q70dg90wlw67us2spk882847znli0x0q7hrczewje7sxipg9z865mloxb7nnl0yl88ytz3wrc8jfg6npr6lxo',
                flowComponent: '9rkv0w5e9h6gnqni100g7uu8vgz1v1ku15hxwc072itn580eb8q64oonl7q4redd7ks6qf91w19ygtjpqpxy11o5el25vl7yugufwdypmhxpeng4chwg1fr98rb58n2t7d1cdfez7yvmydargsd5bg2vx4omrmz4',
                flowInterfaceName: '2hscr8cxccwtnkqx9zkpol1gw3i215b99ioucly3ui12cydubqq6jdd4n59985ih3rm3jz7iq1sg9j3nifrtbb9txn0es550w1s6e0n0at3nnm23fx20uztqfk60kvyw9kl9p04105icqrb1h73crcgy9fchhy2i',
                flowInterfaceNamespace: '4irpu9wwembtwb0530emuyy88pqyc60215mtpab8aoe2zdsancmgvg1bl0pxtis3u73i0xkytiv4t7rij07xsnxtscq9dryzbog3y2g4mf1kylcfyms5mfn0dtbea908wqwjevdmgwg46er2eb0wqdqe9o10p6o6',
                adapterType: 'taiqjhr4ljh95s1goqtsaqd3nv058z6y8x649867pr6fnx0en92lv2vjrd48',
                direction: 'RECEIVER',
                transportProtocol: 'w66scb7xmgp5okfjjsx9yojiry21ug9humyy85al1dywd5oj0u9s3gxzrgv0',
                messageProtocol: '2qfkqsa8a7wmbaoeodnlv4n9xg5ywx9ej6prxbheevqkqtr4lajpuas2cmaa',
                adapterEngineName: 'fzuuxo4jknaijvsr3dp6d4dqjiz7yyjskdx8cb6hqns8bb7cwr159l4w3zojv4yewxrpqql7a9mss1llbvligutpafieiaepo7tkvjy8an6bq1j6jnt7aoqsdih1gt277z1pbzle7sy1iq5u8hek20pk4d7crti4',
                url: 'pru4z8pho4td8vbxorlh4qxjynmzzr3qr2pxt3ufnqumpuvsq5vmxvhtwe95j750jvffxnd70m7y9pfd1z1v3lxom96isb9k55jauea5w59hrh8m100jvbttqjpka3zyriraclt3xtfpc2pt49l1fr2ilfd9rnu255qcpbslb24mz63bdu5qo2aopoiyshow4fypy88heu8pu2g8p0ywgrx2tdq29ax35c7g559dn5hl80qh9ix2k26kugk0a89gu8qzcnvfwy6m3yrv021m1mv6d81y4xwyfmyci04cizetmptoubw8ef8fl5t3qsuvf',
                username: 'mimfl9wobybwppkltbi3dcw227vkfpr520zhlgydcrpvpd6smqsakmne23pt',
                remoteHost: 'ncydgd7lwwtuwtdweoubfx9k69yloca83ctktghsyjzwjx2wigwbnhhd6pfbv38ydldzjvaj32ljtt4tz94z1qv45glm9uu4uouqe6mjv32h4xl0w87xkei1yguslg7p81g1lgq8reolulbrbpptl8cfyqw81rsc',
                remotePort: 5763173005,
                directory: 'cdnellr52z0ugmpku58fx0wtkk1jousjqog29klwlq94ekugtt161brtlosrrpzb078vy3kbdnkxhfud17tvfa2efb5bak9rfv3fozhn0c5fjqx9nn14rk1l885gu2i7jnlssyfahl81wgcgb0haayl6ebzmqumt404mltuxq0nxf29y7znys63noukxie47fbwrlyym1nvciblo70969oz5yzyc8wtxrbvcqr0yemq5213j4wc8sgdk8sujdfs76logynotyb3h15rkmhrs58g2tasc6la8thf9ujb8kt1d3u3wcphbxg31got335h67sg4xnbnlrgjryesjgfnolh3u1v8zhlzw7hv6zsw45tzu0qv09yddl72tyyot7zdigkyp37k050i1im3c5r5r1xq6wthcwd2cq6wtwrkq91l8wiw8jp8la98pza6pwwkobuh2wwda86ojxq9vhwdsrqizortua3e43qm6cvm55icx87n52aaodk5lu5hb0vp0yvfuig5b2v1t4h0qqedqikfcooiz1h1wi9sx3z993clnvghzc5ez9r69mmv4buwc71t5bgbe2x54wdej57tmcb6svm3cxz0ayd07s933rpoyrg13f6ba7dzevo3ae9s5r1qf2qgk45nbiurv8w78rnuoam8c80lsneb68xbnrvqe9ycevdilwctj8fh5ibqbbo0jxdi9waz45qkfb41693lg1ex4mmqysdxaxkmxd9we6mde143p9vl1d1i7frradw8h4plbcclagpb6a1y6vh3jp666ds64r8ggto0ydiebqeu9uobxf1ziq0kxqajo3doarjsfmke01onyzei9izljaijan1d94ql7q8k2fpj5oe78r9d5oyono8rufqybjs3hzonal4q15c4gpsog3e49h06yhuqg9xfxrxpr319xl3vfuxgkgaqyg45iko108cwaqz9xx8ko8flem9jtxappfdwca82bi1rfpm7psay4wt8dfmnnztn6ec70ttw',
                fileSchema: '5uk0gqi5rnyzi2f3mzh41du7o86ha0sxplk7p22hmnuqetonrrse3tkube3p9fqzsmgzaxi398tywiythcnw61ot9r4b4ogs5kimj2djl0am8ez41v6tdtv8f4e5s2uon9qzq1owby7eqq2lurzx1ehcv46yjh5c9udhfvfauzo8x9xwkj44gaaluib0efd8b9o8w5gmiaibebqg429ubz2o6h7nxux2z4eaut7de9uxlalw7oznla3grus7pa9frcdwz53b4kyu9y1dtqh4mq6sdj1xyi8p5reuws1kfh99pccbupmcahojuaxlkjcuyy3v8p3i9tah4pt2qhdb60i050aeo3x8ylub4z79dj7m6j7ji9p5s1agi5ap2oikbwkbjdwfi4fkukdksj9hsalne6kkqg1eeknelidrlqmfq9ugwwqxgxvce0fml5yu2vk4ffgrjreobxfi5exqvorwrol0rxvitcvbwpdx4yvktj43ga5c1fqda439s758ga50oqj9du7p7jsy085yepij84zb8ox6gl3fccmxk6v0i9klcxm3ppnljkiu0l6tqt3695rw7mk0xdo8le7v87r4s97i3f43chnphnqadx39xmzf835tia7ha1qiq0iqhld1m9vk0pz57fmt4kno0up6gt31ywbt9oexh0n8bzcuh38iis2u0qgsjeuzrf74hdxwkoev06mqxtwhxa2xgri7sypda9zlwvddoxn2gf655we1z4retzl16g10g9s00j6qv6ud3nxr1x0bwo98rezdwoth3ylb194zbbl61zdxle5s3frqrf4fzag7zmdjdiizv1jzawim14mkppen7zpluizip1uq424eiodzunglj8cxzyvgrv4s14aryjcwr28i89342e7b4c1bcyjviay00fsrhxud7bjxn0ddrzwh7za23jukejrlojv2u6fsa3ezlynp7bh39xczlcaqa4vpl9mwwl7b9njvq347dgai4caqz4usy30rw1jm1eps',
                proxyHost: 'vkmfk76fxsy2uw4rj61osjk7dn9pa0pdjvy7rf19zc9e5oi5vvuz43nthp34',
                proxyPort: 5174295794,
                destination: 'knllta0i7f09ard1gsnzsuayq33noeb30b9s7g4bu0e1frl085nto6nefnosdmj696c7rlac3jnau2nnilprnr323ydv85yqg4nc47c127iwa35ght6dtg8txpes4jj5ih8w9gwicqj4cgbkaj16fdckbr0otqat',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ujyrf19fts847gfzp3mfrl602oejvt41n1l2sdzcxu78m6ljsyfivywcyo394yqmvreg7989iu0v13gfw5gmt5hi1e49c07wapsatyuoi8atsv8ucucb2457r0twok7otelwccoo2fuqalb74ln9j2hnu6gdfypc',
                responsibleUserAccountName: 'r14sn0gpgsux6euqyv6i',
                lastChangeUserAccount: 'sp6f711vy1qlqrqvrjia',
                lastChangedAt: '2020-07-27 15:42:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUrl is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelUsername is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'g16ub5d0ikte42bg5ubns9bejo5bkfm0efpq1m6hqe4ju5fisu',
                version: 'u8ghdtfzu3ajftbk5mq0',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: '5vu64s2jphunqrxcu15xksfqxnybvtn9llw65volmk1i63lguclqeatvwafoatga2pdrqg9ib90cpniqv13yqs8m8u3pjqorgk2yve7sa1596of1sks950f7pjoofth0fdkdd0lzbvj066ez3q8zw2892s5u215v',
                component: 'smye6fr6r85it12x5xrxzv7s52eb0oa9lklpnwu5x64xy962q2ibhuy2uqcqiktams88hebfp6yo2zv8tf8xt0rtvf7jbetwpbe0bqwgro6knnom8v12snk714ee8dwh3gpupu7hghg8xja0065cezl5488gmt3v',
                name: '8n55k1cyazzreiwitewk4xz6en0u4ulxbvsa2f30jsla3y0lqzy47ayaxim6egqyjglu2epeqrohs00yzdnajtlr9g5d3hgudqdeh7gtxnkosxb6yqqdjee3iadlmokd9rca7o984nv3vwzyajx1k85fgcnwet02',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'u91hws6afihazygjm9vu2bwewrg2s86h3hm3o3eaxrozrj254qind6g42qkyt98m927eoetca3mrx5tv1mq9df1ps06iij1gujd7rgpuqkvdxoux0f8a73h55o4fo85p3d43uqigptw2rxqqozv02ftyqivsozlk',
                flowComponent: '4nixj6cittqz9xmc3dtv3yvprsr34ju5axav3n8uut05vkohywpw5eps66jpct4azeej2gsodffd59ektzjoegpuk1ipljqdp3fbymhbbwz8zzs4ca3hnidfxy61rugle3jg74jpapjyg12ixo67ta1ydmcrvb24',
                flowInterfaceName: 'kpzqathmj6ghqwx7t4ji2giq0gq6p7zk1l4x2jo5nukk3p5y78z1uiugcbbjm2niv6cmqr5i92t4pb5konxzd9zf4vr7b98i1jy7lzk0ioyndd7xyk8n63spo95sl2egxr967xwjru7h8vkihikzq1r4wh9vcxmg',
                flowInterfaceNamespace: 'uycwwt80nhsuxwkb4fnu27a10pvri2asuuumvd3j6whhq7333p1f00auxoppj2wx55z6s8k1y16qgt134rdmyy1xojo9z3lko7nf4khc3upmcek1uywot8ekq3morw7fgtnhjkhrecjl56zxtf1k1qcj40zgsg5n',
                adapterType: '3eualkn0xw4b36vehmsm7oa6ik87r079p7iep3jzem4mu041o99lo9hu9xdq',
                direction: 'SENDER',
                transportProtocol: '404fr7jne1t0lf7bq85zzjt2cxtt9hszir3xqlt597wjlm5ic9ovtchy2fw1',
                messageProtocol: 'wvg1dm2mwi71l9ak2b2vxyappam78eo1m622bl41uk47ezpwbmpcs3ncictd',
                adapterEngineName: 'g04qgvxe6t1vqxevef1ayho3fbv0g44mf469v4o4s2hgi653itaf0hpii9ppy5g2u0tmvf0w8uovufi8e5yq1bnt1kx4bj9q38od07fwmzvzdznjcee9h2djpia98in92fjfoc3o7st4fcsoqr887zlxf628czbq',
                url: '04egczqzho4v7szsf8fam9lcglpka3c42iu685y7kynb9f2qisl4rrwn6jucwjol9ho9digvz9aua9vhqc369upgo24h16g632qerqzun707aep8eoa5q9sryrz3s0osggefpyxaropqr78jq18laiqo8vwrsk0o9naz83m1nvznuypjltvey1j31cri85w0cvkobwz7zlymzpbpe8ste2j35ufi7erpz6nzu1zvoxmkfgfpwjzns64zbqlylckdb54op3jpdo1g60ewbripas84aluwwb6sobc4v6a23vsemfsd5dsyavbqv040uori',
                username: 'a23lof6u138fvxibwi4y949kw4cmljh0ip0j28wc47kybcmfcs8uliyq7uqas',
                remoteHost: '0on9r8165kqfwk9wjq10l2ljkzqpkzpvw916ykfa15djch5ttv64lngfbazl2bvd9cp8qkq2frjmsasvmo5u9owkpme8gn0ut1h1urh3ss1vdldvfjgwd6mnlxjw3kc0shslpejgkbupq03dxrgczlfi97o7v4na',
                remotePort: 5912916170,
                directory: '86m7wtrfqd8vujsonz2xse03t5jv237g1zcupjgnha6l1q9kaids3buxzcjr4gduckm0ahqnjd569ylvastznhrw0z43pd4t0qwhzr2mzhmkfue557sl6rdfhmu0oq0hvpuy710ua63x2j582xpgqf75sx022o3m1fiohs4eq81ivo9au5qqpov327y7hu3qm4ducgtfu02m9h0d3e2uj6s81p1omo4k97o79joe105bn2168ce83k001wo7qvztli0q549fto9odghtjvt0hxcy4b0j4gvkvct7olr4v5h8tyeqcvlervepbmuszd9z7a1m9nefmuhfxxare9b5zbm8c64tqvwifrlchkvofgei1ow560u93yuzr69hvmqnt79zpwljlms973mwc1sl8vel43h6jae43tsh56t9o33txcbmfte8au9w5x3mg99gky7shlakaisb54ds6acm19cbiqotjjv9kqfacm7fhslfn5h3isvzz2jp31lfuu69k50bs0mi6hwtae6qanow4shv6p2he0px0k7zz9brwyez7j6q9bvwquwiz6w753mzl3cdxdzry0rhk73vwgg1ygt4p29ftolzkwg5e3b12wui6vtzdci17tyqegj1mc88kceq1c7dfx9o75wooidlna2xa0cltsxnntaa8x52lgfy66ufe14rg7kgm1y94fm7fz7yp0r3ljaspwqi5341yfvnsoctfxpbk0zjn35yy1jkayruovzpi10cmk437q3igkpwbv4x3izs63aajoxgqt3auoh91iyq3fmk3g5f34kpih8j0x9q6y9bur6aspp690te1qjrzriz2bxkr8wdxdvsappiitq1hdu82u84mj0wted96ii2wuot97r307v1g7gjt01a60hwzwizpkkvepzi5gvvat4uexi7urygdchrgs94vq8dkzplncisudfh1m23cjbaecue7ysooalqwrkry21510pqo6fu317f6aiaza5q706wduniyqvbulpi',
                fileSchema: 'aer9mk55h62tzghaci9fw3dzgwn3vz0s2glujtjzn8ad5jo8ypfmiy12xoe1l08ux0l1n2bj76064mtjfeu067jm76i31bn19329f1jhzdn9ph3o62fcc1760xr32zdx7fwncv1fgee9mykrdc1p0ocjnlxe4wldvqj795nevjunl6wtld4z5dlwl6okr26zjsq6fe6pe832tcrri2r7tguugqwdmf9qx4a0v3r2l9t44xrqqbfpuhgqigs5u12urgex27ie5369zzxsdj090fg2zeyq6rm5pyjk29qq26u4bb8znfx11497au9a4mamuqy5ypp9ugkkl4bsetb5v0sjcty6d5tujiqpv4smkqyprhm8fpy06osw2xvjnrkxib1k2jpr2lmp70skjjcn7oqof33nyw1oja7adkx83opbkqlknru8r5j9ievsfmwu7f7wm3f6bmjnqpyh5pjoq6xvjakglq6h65njukdjtw2qgvi82cwnqs2vr78w4p55pv6p1y30ceh9y41jl7tcw889wli6i2uj18d1uc2zwo372vzogkslm643boh1sw5b8qnb71dl58qxh4xko0eb7l35vzbc168x2kxoc5dhn95e54rzen7f0ii97cbwcqzeme20ct8lbktixv3ymu44kt2sxgz83ev4s31x5gwiv4hqxt72dziuztavg83rk7swirc8vs4cxt446dos826ed6b6k7x2dhrackzmww81tttq28qgu7ln2ch4ccmkvyduqjwqns6v8t3fmkx3wc5ox8d10hwqy7x64kw2fk81k2ri4eqyypf9f7un0uangn8z0s87yhkei7kwww6mw204m0onjwwyfq40xzorbx4zlpx9x1p28x467fhy0m41k899yrl2ze687fmq89o628h3cr1o4xyoyqjzxlawizezet0wh15oao70bfx4c5cj6pq8wh3v712o914e2l8q2vaefvy4cgw3qepi8y2xnu2domvlq5vd5yhnwj8fezuj4klx',
                proxyHost: 'ol3rfytlj8x2idwdguawspti0ckaz3i406zx2jshqbgccdp3ic3lyiyz7nyr',
                proxyPort: 1451880926,
                destination: 'jeszg8k98hb7ceeeb1z3x41ta4ocuurf89khpj6byc9cr8b4wq6q9bzx2uvd1cj5fre8bl6dakusdc50zicl8pw5bcqpv7lcyhq4j5d9tkzr4zdpp9k73scng9j1q59cj2w07bw8dxpuz2o3995e6ke19tlzkaaw',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'pin3qvkwrbh4coxushpuo3arexig1lvjo1uuaaghy1g50nf2kfcncdt02kyovwrc3wf94n6r8y7fzjkoy4hy3db7o1801zohq8v0qrzdo3a8tsb881tn5r7rwdipkjk66bb5ozm7lqijnph1vvcanr4g2n665y6g',
                responsibleUserAccountName: 'fizf2bvm49lle04km9zi',
                lastChangeUserAccount: 'gmv7zb82pakk8ltkyxwj',
                lastChangedAt: '2020-07-26 17:24:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUsername is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemoteHost is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: '7eutid2hr0h2ug0c0n1p09pgmea01798kpij568gvd6okoywj7',
                version: '7dsll8m2ppidtkth6250',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'v0eqazhmbanvk2iuv4qj1hneuvuvdrk56u66pjhrpbvpw1jg4c2181hucmmwft5lwxwc5ld57t798cop519irbd4pc7kgtgzdn7n5upgk52unbusw6tw86q97y80l172ehtsbj0wnt29la5yn4k5avpju2o91s0x',
                component: 'yds31v8pqwtdefeceappmv1fscipfj2znj7f9t90tkjaaqiq1pz40e26ufijclv0ilqu6tl2kimtoyew433utfz8e74wjmaljqwkrp3v85x25y3h9yy5dm8ekw46pghh3j0s8o6k3knvmo5a0tmycq5pqmn815tb',
                name: 'frqxq65vwpgr01fg5btu059bfmdl0lufegdqudr9ycok7ajz07n399k3r8og23a09lqyakgxcbs25poc7e01txp5z74aypety1c8hzo6hsd5sesw0u4z7mrazlubt3icffbq3f6qaybo8z7j12z864tycpalsr2o',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'jvq5akiwynkba12gk6lpsgd73518yqmp4g4wjhksshgvueu1d81fco73yluea0aj4paqigsj9o0eacdji0o8rnk0qlguxzv662vr9576qhk9yt1z49vhauacycnei2b8upwzk1m5x229h5t7qwwbz1vx9l5e7t0v',
                flowComponent: '38v5pctkopwhu8jy4k6le2dlkwk4s6eka8053j53pcle2b3nfh6kzp5lskwmazzyu0gt6tu19tzwkoqyamgthwr5z3iynqi90kcqzumvzzy2a0kss7nvgvspuapt4s612xewd5f4dscv40enwf1fq6qh18bfjwjq',
                flowInterfaceName: 'pmbbb76051aeu3pemu709edzdnnvye8lr9uh33ss98ghrb9ydl7r7nn4ndf8p6xjap9umzh6srh7uexqq5qa2jhv33ld5sko8uzgdf2npihjvre9weub3zmr4hak780kegaveyc4xutie60mmbe2dkftv811ktgh',
                flowInterfaceNamespace: 'p7m7mpe03uszl38s0w260ms7yb4hk0s1u0hkssq60enqrzy20brt2q0y7ofgj42qno010yjve49ylo9d3um9kjwy5of4cudtts19xr3elys893ukslorx9lqqav71v0jb38er5v6dhqdz0vxd7q43iimktb7v4br',
                adapterType: 'ruyxm37esfykom8nxirmx4lw0nxixqadwrnqjlwn5gzw75kifsqh0nsy5hmi',
                direction: 'SENDER',
                transportProtocol: 'fj3ekj56wnyugf4mqp5ztpact3hpkx220zp2lqnirjzd142lwpx3b926nqus',
                messageProtocol: 'thp1x3ieiical8xznrgkz925q2su7dd9sar4el9omk64uje6hacpqn3p2ybw',
                adapterEngineName: '7wp8c41hzky3wz6e9lrn0dria02c3g9rh2v0f3umxu1sm6tsn5quxlng6vdzz1p0f6uvye27a5hketf9vjfvq8h2i3e0i0k7nsr4rfwimfyq7aldl6fhciy8ueaa76sc54ebtacb0y06kcohzx0j5daavuu2uanp',
                url: 't0vxjznai6lbeml3i0h8wpy7njdlbjzgtpatj9i4u7yr2zhimhb82c1ume723zdax1z5jt5h5kkl4agmkpoxw81dx03sn3anxly0gs9gzuw64gpbdig4o0dwfmqilrp9ob45k1poiw7v5kv05x7b9yzbnarkc3a7kn9th63jqzvc3s5x2hzvq544neus4jwgmmlmk475sj9hb5zcyu6zp980k2d57i6ks4bnog4x19zybit6o0eg5ddgbauucr76q6vwl4biwc9s3bjg4rmfi79hlaibt8umojoazyu3nblfyakw8doqxt9bltvzar3r',
                username: '8bput0soq3m0yopwd3a36uoscml5s7spu5dcd8svdqt3s7ei5jrpvozzs4bp',
                remoteHost: '1xbfllniqnuxd2ci0u0kdyv4onja79k34cuk1ekzkgc3voyus17q5tqb5e0e6h03g59ztnt0y0wwj7r67ezs2rc82uovidtk56ou8bj3p12r8lf6ltwlagmffy06xnh414okh3u4hd7fhmwl479ttzveq7u3a7yrw',
                remotePort: 9513723035,
                directory: 'jmnp0lt31df2nbzqe63djv3ibh69tf4iuyzwvw8663d3mem99gz6iti07sr1spxmlz598mf8u6e2qwzldlmlnlxg3xegjv08h46516deq1ia2sso4fgytkz10biio7oydxf2r1z3ehl2q1op6znbg40eigku7kd8825ewyshy4m6y3p54ed1hhzltd8zfsg60vi7w91y2eqt5fldau4sd5t4m3tlgnra50bvq8wtpqid82qgwgm64xlenxejwr00nd3e2yee7vnxg47r6uegkn6t7nmylf595kbjg59v1pgd8yb8avvlftw9shz6376fhszu76it0ww7a00ceh5drc75it2nb9slijvy4klzz36ysg3asy2f8c86db3az4k2l8l02wp76yi1xmhycpohbrsgu2uml2dnf5bxo51aopgmdtxc07jp8wbckglzf8za7xqkrbx475aarniwo8cbr7jhda41oz6rbrkujga2akfcbwlx8ky56qsj0ntubdfydv4nvi87bfktwprz97509q0w42ij3uyhqfcv2vcunghmp9nx6g4xw1nc5pva16ktnkinu53jjye55dxvx22o72jmu6c9kvmohcr78811n3lc48mab9ebmtsogxv94g2y7glf102nmjh3p1vfhtifufh50rwn1pbc5gady5jfc8u33xzrj5onu1l9gkb2uovlgtiktfjfrc4yi4ao149b5a4cvw13fkj3i78urftae0wxdhr1iv3n1hdzul6atnmz58vdjjgpnl3ngq09ff75akmyno331f1s2omzp5c7w8rq6yf1kwbvtohzajjikmugtnqvs6sttty91t6dysk1fd3hc9pigrvvulhdv2gx4klzostmfjwhkif2rr82fnhnqtnt09h2ld1yqxcerubyaysq8jh6fd7qwrsvqskmws25hbrnw17nnh00gi7x61dsz9ax5mia9js1qltos2i3h4vn8rv7i9tk4lvbd8ekqr1w54imlrivysh0hplcqzlx',
                fileSchema: 'vesk4mhbxrw4heaeaul2lqjllxvl6jg70qv5vlhhfx55no2554qswydnm3c3kzgnd8fjp2v999wr3ktiqme98v400wuj6xhxxclbkupupk39p9pey9yhy62w9w26ybwhdn6u7w9bl9rqectn677pllrt0jq8f39hdxf2thgure1h3ftmbdl1kavmmy97cz0yz7kaxna89srffo51lnx63lsi9if1skco6ismbb0z1wzj6ge3cbom2kkvdwydqxxmvbohovpy705qzqykx3w6z5m8fdcdx3obblpizq751ep2ql5zekdtjw89siiquwm9vqxchgv3nk8xcu78megteg099hyztxaqhlzvx65v19d5ugs3r5ifg48fwkgiq8moud9uzgiv3mpxmxij9izigcyqriy8dvo1ep36x7mxexbskl912k72gqzcptnxv9by9ivcnphcmnka7i7j5upvi4t20lu3755sqr27fos0fl30iz5w8vtu8j0ux2za85y98ijme96urzb6kj39hbm4y02zh1pd1cbvbfa2hrldll38b5h6xmy8fxyywrnj06ggys7t91ry0g9qoxliwahnqen7snccbkht107yse0uohw5ladgzuzez9ctcfr8p5455h06w14g429kxdh3e7yu88j6vstee9sg7lc4v65qtkpq2qubwxlf058mjigw22gp0m6te4wbnd8zxbvvbjyvlr18b49c9fi8vrb76h30x3wktbg4nzhnpb3k4y1nz2b1awahphavuac96s48croca0fkkfh6441qfws0sxa6ntow0vl11xuec9llmkt9nic3hn5a0327dvi8ghyjbw899kg437jzuocihj0b5c3vh9f5c79iyenmh87xjtv3lgknyueivs8b48bvqm351kht9hq9oajveze44l8h52otdw643n746st4qe07u10r5c130tik0emy90xxvntfdm3iuox3eh9h48301wftn2rfh3s88x1vu2wq2iyq1xvp1ber',
                proxyHost: 'zd879tspf248maw3ddps6tczrwqrrp5442cpa5pg64lwa29osh9bvh2yd30h',
                proxyPort: 9736656187,
                destination: 'r6l83wjsr5dloouma7siqc4bw42ysu60xhhjzz1yakjt6g2yz53p6nclfslq0yqjij2pgkk48exjbsdy2jhczk9calye83vgws2vmgv7fz2sg5c2xfdsichjzcc31g6jqxs5utx64ga11eusbvx7dl5otqi5xggd',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '8fnevii6m0a48nks0k72iqfp4ko24z6nvvxn5wqp88lpi9yv6pxat4amz8h32xcja2730t9h1ggawu171oqeo3e4zlq5lhhz15fj84az7auks9499o1apgxxp27xi1gcv8x0r6b7lyq5m1etry5xm6vn8u9wy9l3',
                responsibleUserAccountName: '5qn3157xkc99dw7o489g',
                lastChangeUserAccount: 'wfzp46l8jh03ptlohi7t',
                lastChangedAt: '2020-07-27 14:24:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemoteHost is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemotePort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'iqu1dq2yde1byfn5zncm9gjrlzq3fhe6oabu8jd2vv9wvoynjc',
                version: 'zvpr6yeo80fum48rj1wz',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'hfbb7fodv8y4r77xyj7j6fyb8jzodhk5ibstifsxum1h3sbyvuypencfcgox212xspkuepzbl75py9p6iqkzofnpyiwdj9kotk941yccn94xt5vam4xnpnimvf6p6rsw3mqcjw8p3ucuce22ik6sgjo1nuox3aid',
                component: 'kb7zy7fn9tf12wzogj0hcagkidwb8p07i0napgxc6b5vqe3ef18rk02zq1s99qishehqembw9zfbkadki2ep6ybxgkhczsawmuedo8fv7czbki10oscku7q6bsu02izyaw6yuzuzr4oszs8fk1ncg161zs9zrwcy',
                name: 'g5psbwlwz5qxmgsw1jdoodyecpqip2sircs3x62e0rlvgy6auljophyigmq97tycxebk8tacsyzdnscp9h7ve0wjmxwbto14kp3nn2ugddtskn23gbq52m7ur21x7lsmkaalqrfoniwtogt7bcwhnlnen8gagpqi',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'shrzmuofulm8xcufda77md49kshce53df4882t3bbf6s4adricbwa4yl9oj8bqro9hwpun7l2m30m5gtrlx42qv7x7pituafj1g8ayhhf5u7101fdmfro6atm0g5mcbukzwhv5ijp4rkvzzyqxen2qo6ms3h5hta',
                flowComponent: '6n36nx3pabab0rhetz3nxyxrofsf7j8bv01b9lgwftg8ubatkzufs3g6woy47z2uk8qdljrg3su77b2u7kynq3ny8flzabwkgqwdmpcw6clzpc39ws624cimn4w68s58yyvc8vpes1miupzcdg31fw1xqsdzk48f',
                flowInterfaceName: 'gl2korn42ar25te1um74yru8va1ea0lkt17ui6ojs8fkz725xmh44bcs80cb2f6lrn44x6yvd4nk0d24gxdpguvtsxi9c01246z0p3t6celx95a3qqt02nnq51bkw0tnvqk65orrav3hljh2gilx73got9x7eycn',
                flowInterfaceNamespace: '2h3kmx17t65hnmset5nocpuig3ta7py4i7jjv5mmdlpkjtlo7of1qvkar6n2m8f9qpnp7ile73vatubajvtcmgqq8hpr60ydc646hnrbqdqxfplsniyxb80jmyh1ijg72ineqk5cf99ecaep79twyu4wqd5w39ma',
                adapterType: '62dksgwzytsnslcvw32esxwxrv0p9nhg44l3bv6jtuxjbjbvfn5hvkvaj1qi',
                direction: 'SENDER',
                transportProtocol: 'fonz1n4726skr21u3u7sd9ljsghgc3gh3dbp5o6f20trvn3d8vc1d8e55r54',
                messageProtocol: 'smc4fcfwtqypl46gbuxc4w203l0z75zrm012k43tc088bjuq335ms8uvqjfc',
                adapterEngineName: 'u5aboaqavdxvlbhihck69ohxnkftikzwieep1wqh0yhmcxwuvd6p4dsc2avvlela9u71e6whidytgfcdz1rg93my22lhm70sysbw6fvy7aclsnqvm93uzjnbx98ctk61pypllg779b5xf6lvbz8ee7wzydsj7ne5',
                url: 'avy9cgl0j8vtpimxy1kxcleg9ubh7bwguiaclxcemecak0w1ba4nqwj9ya60wfyc0vwb97xskyv5xvnsazfpu6e3t5zrq9bxw2ekyjb8icyylp330wq642h08bt4hos5bb0r91fve9ts8wjk44or60hnlmn3cpb3r3u2ur3p54ocvhlmxmenlnkown66p3k68m1l1bmi1jumml5gautnl616zyb25bqizdyqz3i91ggnqdkrhjhlnrkh0wqhzx2xdlxgn94i6mtchp6r6ttxid6qzpt7ugxeu0759zjt8lxvr5netd5yna4fm1gds9ck',
                username: 'ih5q10yzkr0b16i58oi4cehwqlot9yu7wxvgcyc795q5sg5mwlgpdfsyqgda',
                remoteHost: 'dd4bg1sdwxia567c4vgkcpipcjfrruoxqgdzfa7pf0yqu2i6u1muhwjdvt3p8pca8nbjjvlnxigf4s9axmpmgt2cuzplkby00jz7fmqw5v162czzva9t9tzm7s3tvxes8938d4tzzt5h085exmantxbn52kb42ck',
                remotePort: 10630886274,
                directory: '3sf8loj3dcjc7qy26pmy5yar2iljqh6rqy2n6ysekdb5ktg1m8gmht49qvbfcq1q4mwztr05iane37cqqotueez8dbx77b4arj4mjwmtreux8volu44t0lzz0esxaii3kyeulbap8gxzj7fvuctzm49z3bqdi2n9e473vndnbdkqtbri7m1wcqtjz0txhgp8oc5bk3gtnchjdoky0u1ib6yjgbiviwmvy1clxqt945em6rxq7ctu2h3lki0elun10mswrrysyv236g355fsw1tvfsu5p9na8062k99myofx4uu5lxyluwlstfrhadqhetz35k8bzgfeq9qee0uo5prduomk9i3ctc0oetz1deda01eseae626bw9v0iqqc17f1p06gljrqyimu5air3z57fnyj1isfdlo7ce09q6u86br8v3oyb67247959i0hg368357y26p1gtyfcx49yuscsr89qtpioreena63h22ntnfiyjii9ou43d2jbkndhg5t88a0v5ec7e6vcd2qzxmfhk1wejumigwgct37k7ygku1nbsqbp566nf78cx2rb4798y22ef3jwr9dsxzd0bvf5y9wct4tqq7ezxbi48k0ti7yoohgqweqmf39m1kweoz7nryu6a21ee0f6i25cbfjxz8bg9dn3hgdsk1a1in1kbk36ve629lmlt30wa0pg66dgf8drutawr8vm0hmm71lzv7mrmy6rqjzmvjhddn7xs7yrlishiucepukyypqwvvzrup2hupkdhiztwhwd7mj5zu7thngneb3khonfzfr8qnup3dbrmq4vwh2natq1kvmcobaowrwdp08jew54wn33nphfye12rcde506oimhxqzrkxk7oyxdjzvlgv43483cu0ib0bme8pwvripmotcie617y402xzv5rmmps2hbgg109510x5a2r72reedfb0b2017wzwckmbj2cqyl38re0w3vke1ukivjmjk8b8ottorhrbo7ne13caw3rf06qq',
                fileSchema: '6vaph6db3bkvao4kizwpnc2artyc0ii6qqguhbfsp9tolmink0o78qqfudmkl3e3tzff9fs2cwtr2seraqlctqcoqlioepkj6nttz5skskh9rfl74zw85s5elvyarnejty4frv51atsmf4m2isg2p3pr9iv5r490p2c47r4qa1hb070z53lh3qccku2vl3iufd0c01kzd7oat62np3bjh7533770gpafke6xlw5joijudyss3iw49ijacfbl3y8hyg6987w0u8khes0i75fj0w8z3tyxuj3k1lf2yyjg5bmivvj9ld8qar1qkebsktu5d9l7r1wsyrm9r16kg7w5gcw09k1iq15jyefsw29iw4vtbimk9e9zk1t6cosfuwqxmwcd67cn7bl9dr0qr26fshv8scy8595wetet55bz8uqfm4bioocxleud3uu7mg2rw3pa8g74wl03x8nyrgt7nz03gxkfiel63gw0bikmtq7pmsqshpziigtorhmnmyfd8xitpux9o59qvez8ej0ielwzea1q3hs6c2sd0mjwtw8a0c5gtq8u245td4xowk9r98ttbyyj5wpbv7s5yhz1l6p92pcmts42f5wkqe7gmfims3levaxgdtsingnv6g2jun3jr2wgqbep1aaad0lx7coivdkimwxq0owaeuhbm131y2bacbxz73oe1rbz68g6uk8vacr9qbm4uav4756iyjt1it9pubvh8fypjfk1jm1fjc5mbmzoht445g4tze8meivvikcwh7r3qno3mq0zciwlxk1rge9kj17ec3z8at263pk333znkrxdmewedrmwcttjdp36651p95fp130p6kfbvur2c4yft6zyjxzstksnonig22dn5fia2sobrdzowk2z7jdw645mxcj6cr7fh7o51h1v2xgm2aezvnfulmjzs1cr9h921ld3vs80lic3an3tr4lsjmkcla4tivccjgrelxnk0xz3t54rpj24zsqfu9cfo4n021c752mu9e9n',
                proxyHost: 'ne39bq62d7r9q13g67n6oeuefhh70s9qeatxilhgqh4q0brd04m6ot1xid9s',
                proxyPort: 6645386232,
                destination: 'r9fw6z8h2krd8vpyaqmcz40czylcnd6mrwkqrg1vev5e3srikwe2k9kq1sjoz1j7y739be3s7gmp3mtt90s9q4towpiiig1494n3jt1xlau58g8ygj0yn3joeo1zxj2li4ktehg2hrze1smfqwkvk9jncsdpdkhu',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'gxbvc7oj3qtx13jc8bam5ndlla5ng5svgz8gsimnbyrdq2vym2r7x76w51yopr1uulnqhevmb30stn7o3fgf03k7i0b1kkj7yhj2ysvxphjt6v66q1u61vafmyavmt03hke0higw1b7j0qtl4nxv8inm5xx0184k',
                responsibleUserAccountName: 'dlpox9sk643gbz2zt7hi',
                lastChangeUserAccount: '8fyrjrbexwabo6ueanmf',
                lastChangedAt: '2020-07-26 23:40:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemotePort is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirectory is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'tmzjunwcz43w3ph99w4uriu39r1qgttu7szr2erqlu5bzgrwd6',
                version: 'gsn8m231oygtqvizko1q',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: '24nl1ttnl5wojysbpc4pqwkreuavloqsy8nl4jeczakk6vcn1yuals4ihedtfa9fksbhvrczpda7ro2eowmb9xz96xi0bwfstz85uh6rrf7tqk86730idsj2k1b8r6oaro7t4z15xzwq8fasekwt3njtvquzuc5p',
                component: 'pdm74cih83runq7bybcy6dwha7x1zsiac5bowvfxb0kbpu5yionvb65r06yn35hz8j42tlc8wngolfn6eug8qtejwn7a0qx9ohpa7kvdxz5j0ocezxlzoxlq66c4uu5m5x4uvm6vui4s1lfmhdzbdieozmc7wasx',
                name: 'klxi7uj3q6ofomnzp28mr8rw08kjzex3f25zhc9i1bn21it3l6vbpa1ww1uwfpgpp2qasv34vuwhv7ujt2nowxjc1l503anwjbr6hydvxox7jqrmy8w1i6iomw9ontqfntq4x0p9uajy90p2s7tnft8ohd38pb7w',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'idpbmh1u0mv7y92c64tpbzb4p9bo9p7715jhygr66fv7zdal1clz6kgu1mmsoz0vioe0t9d2wxh1d53we2oiofvj98ruuv6kyymjbfxyarfw1vaw9vv7ygrww5x5f2gz442sh9nab7bs7m8yv8z8ctjiaeysoddf',
                flowComponent: 'fgom3kgli1d4j0ghxwhc25bl6jx7nkgmz3hy6txromdl5ojw4y2c01fmcmtij49it9crtgy1us4jukrd1k6dgez0g833hey6exq422fva0obemniai0nt2buclhaoyh9khclzqwgt08m9pqqhm7w7odzpb3maryq',
                flowInterfaceName: '12d5r1tndj96n3g4wi8cboov1vxay1r53ghzqm221nu69th7s2kh0cg97gmnfymam8i64h9wslx9r2lo1bt4ui5kqravyn0xeikbytjvgm059p2pxa485hw8cdpjmca0kge1smoz8ahbo04k71u9kzh7znjaayv2',
                flowInterfaceNamespace: 'b2pg3n024wop2nb7ijv2dfi0a4u2tv9nxkt7v8ktvt6gvieh19eekl3ueqolv3jp3a5mp172ecf6dso860qnua69bwzr4nvpmq8u4ek1icuh4gcqhx7vc9p7o1b4n2w8b2we7s5bk2xw57qky3ko6k70ga4zzl8c',
                adapterType: 'pw15jv26h8pdo7rtbru5cd7lrgjuq8vr6il1nvuyqswhjy9uxg0yyf12bhpr',
                direction: 'SENDER',
                transportProtocol: '6qto75bqd1laykajkzw5ndkxi7bwt2sx9l4w4d7bsz16uxpkjj0fdi36250z',
                messageProtocol: 'hd13k6nvlxlh946l704fj1c33v0lk7ofbwsexkx6qmzng130nygpwcuuxbzm',
                adapterEngineName: 'ntz5h7817183ubxcwxiw8rklwcu6gw8u5fhhgp9trxfw2fytqz3fbm5xm7zxc73kwn4sya8ecncs548l9kmt619p6hwydj2cwfqrjsrq6p0lsxoulr6qvldsrjha2562cqudojekhuf1k4iqiwkx71o5nx8yon23',
                url: 'orui61y3rw29puzb5hada36cm0aokuvkgn7utha9iaw4ta79ud8jlcapaq0vcegtiivnna90bpw7wd7hhdjvx5lssulrpjnmva8jb6dccfg4l97qspdpj675bya80o30xr63exmta7tgl1f725vk3isipzy8m7slp82iwzzpo6q9ptgmptqokpl1lrk2xom31duz726lyvc6qmx65vcrt89b2sqf4v4tqmyxfp05rpopfln13rz3492voty5lojeehhruwkrz2lsxrgzu7fjmwr8p8lsyvwdjoawbmmg0drd0u3o5c78imav87by4ape',
                username: 'd8n1v1mprlwammun127lmqk7gqh0i4za8mtqsd5ddyg7eucjg6uh74srxk20',
                remoteHost: '29t08w7aaaem4xolz2shalea5x0nnqxu2tdcr1llx5oo5ffifmn7dt6wduudylq505na873kuehpfhvw1wcets4w2rqm76qdw0meotx4q25tqay6lbc5uigsfvz9ypsvn4w2jdy2xjq5d6sxpefepm0hp7afhy1y',
                remotePort: 1029777756,
                directory: 'xin3gc7x28bc35q2ruwyj4659y8wppio1z2jh4h6gxnl0vlnpy24dic9fntk04ir3a9bbuf6l6q5va8tyeaun7lks2jvkwab35q5supsjb9f7hrm1jd5n2oig5bk0ltsh4qxpsbq62oykohsry4gxmbfcc98mgslrhzvfmgblkdv82j5556rb5w6v8n9fx24c1obnj1cnnmif0f9thg44konsl5dgfnhuci6t11x46s9wuthptj97xboikm7x7oj9jo7w2kj5lzk33qckhz9rhjkrbh36spwrs7t7dxloutpxexcim89632vubp9zmaqqsfbdkkpkv4ojmkh78wcuzhiaxkvfo3qmi7y4a0h3qikumdfrqofvjwl3n1pyk8fp0j3lbxmqkky3jebk4l2bh51qnt1lh27bhc6qj8rv9d8zip4oqail3z5r65fa0fk58bpe9scz9yafkzz6b4ttg83npv32k46j78h9ekoywj686x6uk72soiolimiyi5srgfgl9akce97cy9ypj4jkg3y91rn7vdpvt8k9lsi6xu31wjfnfmqu03kl5g368frwln3aw83y9t2av6ujjnn9quisyggvp5yx3f1qemgzrj1g23sn34tt0o7f7urtnif7p8624zuekkiswzk773l096dg9qe8u2jf63az8nnuj7j2r5nxj8h47ntngh4yn3e5ybmfkd9pvrrbc4vkbgw790n11mez1b3eea52l5gsj168nckf5emp1jmef448aq6dkajy9tm6fxws82nrt3suhqbem03z3ajkib45hlxf9w90dmvwfe6dhn65xi5r70vbglfrrs667h8i53fqst3s5zp14twlrn8ta1xei4c89yulweuxho8wt89wedbpb8u8vf2583l0ykg7qrnc8u4vmabga84e1ugmypwdebqoolvgh2nuqxj5x1i8ooxt7aove7q8g93boz68noz9c1mq8bubfa2t7myfrw09k9ryib7tz9d541t1k6ocf54oratu',
                fileSchema: 'h0wtma6w6e1gacm0xcssuaya3a8jxohz1e0ac97ekzudhmq7j2bv40byxrnowlwvgvlawphg6xggcz87sm7salxcpns90tgb12sd7fwmloslwxh28fs0nbz2gzjaancvmorisvsyz9lcmw9gsfa6m8hxl9au8nud1b85qisa4c5sl4dr9czgwy9ctjfhd7rcistvc3wzk6w72klzyua6h062ny14ke764v2cjczfg3yy089w9i877ytvv2s6lmastm20j3iy21311193jijdfoo0cmolymwcqys7asyn4uewqtriowz9afe1nxrb9crv8nvolzfxjm4qaucdmk8s1s3nij29t3laz18w8tj31vasbxe87wxey4aymvzg5qwg0akltefdrgm88qqeofad71w7wo2gkyhfhucd4w7foz09ovw60tnz2fw1c3c4ktlj2f1pdzx7bvbk1birsbr04gwvvjteg3efn94mzpbl0h7z6akbvbzv2sruas2n5xz7ykb9brbr04q6ox6r692zipvec7xblulhwr10x4jdr98jvup478ck2cx6srmo328i4kiiai0eua0v4cduv51uqrabujgrzu324tgdt8pumu46w7ewxczfoiqowjer7leujjg34qff73z3t5p88s7rmaquww9p5rzs3huv8tfxnh4smkiqhpa5knupv07vzgkecl47b0urtd6k2jvi3oqqxae6rh12y08bubow113y5tbxo512urk57qbyvriq8tiecolyhiytkml3u5vhsk4e1ortw064rcfh7x1p3k6mt3tglgcqa1h63shgf98mrbtpsgleh2oig0n39u4oyz1705yzda87nxkzug5oaibnv88cx177a4y2k5n41qx6xathxq2d63nhe1fe94ox4zcfh25bcoewy9b353xzdhba9siu1g8eepxpefk9iy88pp6cfp3j7hvuflaq88js3uyjpjt1ch11bsnagxucpnle2wlg4qjeeq5m2hfq3oi3g3kq',
                proxyHost: 'm4bt6elbvkw6lt9e0uqkfsdjkmtmo1ntohmzkym4zhjs681sa4uznt3u7rkm',
                proxyPort: 1287033598,
                destination: 'zl44b238k6jv7l7mlws46bghc056ljqpghz6qht9l8o76ivs4ek8kv7oh7q7j2adfp2uu2jrmaxlc6t1275tgky6bfaj96ddwqsr8v4jury58rwwcdb4quw49i24x129yr9ga097ilfybe0kh9y09le0qm8quujr',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'mksi75nmwbjh47zl5msgjainik5jwc7qskb630bp5meohi0o30qifa5c4t0gkz3wv8w2rt0s4u0j2d3zt9fb8pqluxrk2ykj6m9po1es55r3lh5n0d9i2g140b45qlp3zgtawo4y6tfluhedsv7aqtz2i327vz79',
                responsibleUserAccountName: '2n6d5afpfnoao2ugz0ps',
                lastChangeUserAccount: '7pclsjfakwg71j72ggk7',
                lastChangedAt: '2020-07-27 03:26:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirectory is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFileSchema is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'hteqqyeba7f1ryv4yihyg7i74c301pt0becy6joleqm6dw4w8i',
                version: 'kxdqapmchu4nhp0es326',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: '90z7bhzdlovobznadq1prnt2ou7q4x1xiafc26mircnheoyg08k9g43mzhn79sn7r3beab5du83433auhqoem1xei0yh88ij92t8jqf3myp5jrjduxr08satw2h6fd1mlzhr1uvgj8ptpiq8wsxzsahfx9e3ltoq',
                component: 'keiqqddfj36yond0bs4txwf0egbk32pvks529dlfp4sfx574cdiyatrzlwpof6621iwvh7odcai1x86ogl9bky8ywrofrj6b41ta415spxj5u59wkzo2pbp8iz3hpdn0wn0miqz357y5t3xza1vjzqabqhqm3j90',
                name: 'mgw1au4x9gw35mue2z9hzd90ry0456bg7rj02amiqbdsjmpzuf4b1ri3xlvq44yj3hbumu2zu858iburjmfeb6n7wch820i3p8e5dvt12fjc732zfykync7dc8z8m1a28uagk5535k4wrwzd8cljd6lzuivf3e2b',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'nlldvshljiizdcarprr5so0jdi3idplr4dnoxbi9swcnoayx8v4nnafv8h22hf7m8sc3pmwe9dlenzamtow0o7vldgkovho7dup70wmxebp8m3d2sshlrg01n13q6ubluh1402gh5vyaajntcghaki3mgcuqblag',
                flowComponent: 'y8ehzls7petpd2ctu1urrbvn2ek34rcftp54al1jsm4rukqze8v3z48uoroedxjrjdno2oyvejtcj42mkndj9zhm8u47fbh42bq5q0wmk9ksv434ejontplz5vw01nereqvepjw9oni3mqy4hw5zru3lpopsozkg',
                flowInterfaceName: 'owcfh86ucansnskh8ojgx123fgkzfyn6a8czicljwmfkipihuik7ev8o0yhob06jitoi30nyta8o9ko9de67ncrqjlt5p0cxajinqu3h88ggm0ved27oy7eplf84oi7pb6k62f8evs21crcgmm9dhkbs2hsaq11k',
                flowInterfaceNamespace: '81we2l7hnacrdws80cmiz9xp0llhpsg9snnx4fzmoqotghj89231os1ww09x65fm3m7vqg7avqkd3p1olc41svnpmkl8ql56x0jo3p3hcc9ogbeoe1g57ul5clwo4cjfn1emolb4d99pq7tbc21o1lm7lqcrssjj',
                adapterType: '63y0u54maojlmdal5er7se3k487rkrvdaff49c5yc03tcfg589l4bv31i3b7',
                direction: 'SENDER',
                transportProtocol: 'ekxnpcxsqkfr0mfv3s9126pq9l98cznum6jbrx7ykilh4n1jj6awhjuwf35s',
                messageProtocol: '85pprrg6n3grnf8ve1o63ewdshh39xba3fibdxxl0a08d3tkyhz08uuex76n',
                adapterEngineName: 'pzagrnexs8xsjg632n9mcjjipjyhslrau2ug2vqa1b2lslq6k7gicpq9pxq5i6y6k2nzm298aqwuf4k8elp5ti14qwlsls9ov053tqzwcmwx9if58w9m18k0lp7smw56wrj5fp20le0qeisnrdd1qn3rp89j0vpv',
                url: 'ntm0zez5ehb5ehin2865wyakx3duuad3qdlcjqtijbb2v253acfecvc0lnzb3dhn84xrg0d0i3p9x6nn5zqagtjfbqp93nnkjz9nr82v7ncv7d0h98nu5x8ew1p3jwufmebis7ter28l8xew674jyovu1myomyc9w96yd0cit85kub08d84h4t5fxhm3ngod7cxngsqft4qjdgni8g5959prlahcswudm6rxjol5tcwy8tom3jm3a7ui9lusjn71l87ya3wtgi0nukqh2t7u6dxjgkog5kmwvyk4a0o7bxvfc1tcqy1u2xvs80qc83tf',
                username: 'ckgskmdonttr9zixzylruyfza8mzy9dk494s8qr65fg7lx21l5av28urpbt8',
                remoteHost: '7jy1p05xcqd3otfdxcboz5mfpfgsptvbm8m51rf2dwp76gki42nzv5yjhe6mxfswj1bqbt7lp4e4m2enbaupk3pfsbrhxxn8a2ill4i98o1euc295mtydxh0aw0vz3ebc6r1fadfdzj0ntpby3bazxl123hid8ez',
                remotePort: 7071606072,
                directory: '5chzmmn53x7x63aiorg6lcosmbek45ftjn520daa60weh5upoooetrs0f82gjlnq8e8noynl1r7b365ep2cijf4nebubsepsdqmg6y1tw6rs3swms4zadzc3j9a6rpsmz16nwaw2k3drazd40u5yzjfengjwtil8e2a5ogg8rvs6yb6bh25ibtk36gw63tjxv1hxng1slpc2q70csoqub706674029wjrnduishmxvez19rvxwappfpa55dij9kfqcgz5tupm0eysh494sojvkkou05mcb158na8q3wadyh2236wiwepxzxlfckmy19two2tay022r8cy3n1hw08g27riq7tqwzscvtm87b9c98hnogbqca9l0m9ql8xodc9mkcozy3p3qortpx36a3emx4nivsyk4hj3bzzqfkmo7wxxjfwgae2390styz1q6cmi7kv3ddtwsyc98ms1g7draxolcn4tspjo64visg1cft8cj9wodyeurhlllg2wrwq4pqlnseidi1af4w8jwsmlj7v1py42mj6pz0yhh7ug2yn28yozp21kdbpsescx6fcf6b7v1azs3yisek48kbs8qmpd5vase26c3p5fg07gvbqs8sfi12w0e5pk6rdbg9xit5ldc1z83mcphdeeh00hrpb7qa2mi9t90d6b958adnl81w8kmkyur89bcpob72sc0xvtlibgy20nnntepic45b0mfz3f5o36lcuuztt7dapwijob4p5bs22mr1waoj2k0iwcgdxfc4gtve986ntqoz5orlyot5xmi1fz7994570vnamkc91p666wri613i9ng5of4m270k07zvx6utna5oblnt9vbdsw8tnat9g2r35s4dhfim3xyaj4k8z655qnyhuxtqetq2a9o6ctygixnivij4dg4z9wwu76tz2kwqljlha2wbyg12t6e3i8l77rvy7wq8xz9xuiafxvs3hbm6rnwbdf93vwhto93wi8ia2kvh1rh23hs6hn0ixemxn',
                fileSchema: 'rdgsfp3fhhcwpjrsjb539qkuo0lk8hc8cdzb28kqayxfubg3po24brrm7iy1sqgtxbtzr0dsjoqpkys5m5y4kuu9u33p3gi2xm5koiqesqdsm7nllr9x2z5qnwx47gsx3v28spah8dp0zmlc6i7423eet96a8rdxeyp38luoremhvv2snk5q5bilt49czw5dech53yhwx9nhkj0gqn3y0xt1p7o79kgkycqpmkxd378t2j5ntqn6t1dxl89qnck7lovmvi1aed7zb563zw3ra2575kwyrn0y1o1ew8j3ddec47xhce9g8ul2swps1ix1wfpeaqnahmyvnugrpvktc3mjfnvdbe5v6op2vb1364qcj1gum3celcyqjjtyjnviz6hu5tech21z1zuvt43m65yphhkvg8png7z1sxrm0s9ozpow3572zp95dvl1wpt1odhgj6l7oxmltpu8zsofdmkbow3cxoxvx7j63rt90yh64mat0ny0y9rshnb5b5xn9ocdxw18ga0w0ilvkmf7xbidn6kcow49sdd731a3xstp8akbk0urpio6pdohyrf4trvxhvqwq8rml19gonrl7y7qu2bh8b26uzyxngpzk9w6iys6tzjwlm14pj8x7xraiani7dxwb3w7ho29up1nr6fkzv379w2ji4e0ugr42p53lastvty6ammuhct4jj1levp9ppsib7tmz3uvn1ztsvfpsxstls7qeugfxy59yar5n0mw0hrjd134wh2dirjq2kwc1p5xua4us64uueed1gzn84qxrs8bm1jmzatabw1p5uj9ie1d2tcakxvqwtizs1evw64ei14rscnxqtguep6elz9bzxyige3ajosspagjo8ym7wdyhe9ilxdsmcmpioyjyuy3tx9qao16s5omxv0eg1derhlxaoc1m6yyd7wer1ao4qnagiqqhj8hrt55y8j5286a62tbg5dayij0c8q2py4c27tl7ak3y1f5qp218m49t9032szze4mgb46bc',
                proxyHost: 'rly5nu36hpjwrnr20b3ru7yjyjtub06llvho8swei2t01s7yuggt6atoomh2',
                proxyPort: 4568034560,
                destination: 'pl45q2favuwg2wmxrqj7tc3sl2f83gz9mibofmas2vf7q92c6ibx2x9fhh2r73iot7hndq6qgh4lmcve3tn83v0nruzlvbz1jaj2eme0nimg31uqh6ngcjjz6k50bzgduu76w0sgb1mp09cymb1jy62ea5kwmckd',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'oruhv68odrxofre36g238ge0zl6ztybkg7i22tgfcroajerrds45fc7dwecwr3jb828299p7kb8u4v22z632tvcnqs18k6es46c2b77jjy440ci7xz0bnrr6ye0zubqqx6bvu0wga3mv2v15gluq50hyrs9npplz',
                responsibleUserAccountName: 'lh1gql3smfnq86rem3c9',
                lastChangeUserAccount: '1yqf4kph4260ejrv2wlr',
                lastChangedAt: '2020-07-27 15:49:54',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFileSchema is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyHost is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'khct3vdi5k5wn60ieedweqqjf4ojehqjk5rn1irpme9ltai3h3',
                version: 'kwnhj3tve90pkwzrzj2r',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'ydspk1u0muap5m5h5lcwhdpp0tb2lomrwbn2ak07dhoe1cb7grehf4wraj9hq4lj6ppqj62bambjxuxz4f232kpwie8w04a6tvfwu9qd7f0fnthpvl7lae6b89yc69qgmpi00u8fqsqwjafo3muddo5otjomt3ib',
                component: 'h1swg5vl932n1o7bky8ltv6gthlhd3zbzpd40u9tg87jheep6c8mpbwj7q6etf445d2w2v2wuffiz3hyxq4vuyt6xibvx5vjqoscvukig5kg9stoyn5i1yi6vprb9rwnave1xns3u5x8gwba4hvaaxowodtqkimh',
                name: 'oz9dtzsybkijpgreloprexe7zfn8dvuugha5jijgnqelt0jrdsfwtn5blfb14afczxt8755i2er4hgo3q3494btp9m7ct8yo8bcxbis99pbah7u1xo1za29pqcod8phb00uw5qcnybru96mv1kiejp0hw0ntmlu2',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'xoq7rlhb8igmgyqklsavcqlyk5er16fn3pkxwxh7ioku3v1hai70j68dg5aaozxs2mh92ronxp22opxrn4j3d4k4yo80yfz8fln6yd7ec4jfsgqpfilz6j9bf08v7go0ng75w4gkd8vybcbd9r4hh2qf2ckhee0s',
                flowComponent: 'tuaig19r6qi6orj7abh2nq2jdnt51es1vbnkd07gzyfs5cfwr9zoynyz592nzwgweepqlrz0bhinedsmtyfk3ui9ztqzfhw0prrvuhs53cvrma1vo2y3rwhvnpa4bybmkdfqgspyxauu4uluvvhdi12dxe9bfb8k',
                flowInterfaceName: 'xtxxpegl6ol31h4fuazvlfaadvltnvc2f6nek9w7p6zyxiu75gc3rl7ot935ja82nnzzg3chiaa6h9bas0w439ipxk8iz2opem9a8wn7roce79v03o7a967hs8cmi4i2vb3n8xoi677ltxz0v88pz36gjd7oak6z',
                flowInterfaceNamespace: 'h3h8mmrlpu3q3vlf32l6yvaap6oeu68dfqy0lhsawuh29612lo236ytrdsu7wr5fvd7ppn08i5xwodz6lp3hfxazexgufelgso4ydhtfan233v3ty3cyhf20ukvxl89q4omrye76303m5uawoi6n3gs3d6nv2m6t',
                adapterType: '732ly4tkp86ffwfjaew7bhtdlpffygnl4mfrcputsfhrvx5vx2kplrvp7m2z',
                direction: 'RECEIVER',
                transportProtocol: 'ffov9knvinv8x05q1x4kguze0b541pj1ou3smgh0ro13wohh7ls6kn1pos24',
                messageProtocol: 'fynyr4u6zxaiesnu85lgfq2ve0b53ylmt7t3x25thuniybgq1bbh8459014j',
                adapterEngineName: '0emulbxyeyqwbx0vgiaxfo9lczt8qduxmmy98htgehl0j6q68i5w13go2sz7vg7kvccigjgvnnno41tdkyv6r2ljuahibghj1evsszsbhmnfwgn5she5mpfgn6erof3cpb2mxwli82gbhw6thumgv1uzxv52b19v',
                url: 'yjbxow8epdxm2xfow5aux6od0i7mby7k57rroeazb4dn82tegci2u74svw7cb04ssz0egme242uahwrkjywy4lv9ov1t017rkscgn96og0l7e4rs58vpzftssspzb7awkoyk0rh99y245u5v0b7unjk1p5y4lwg29kgeoerq4fanucqlny0hktbw6fb3jkswfvrkppyv8aao5nt95h5baux5vfiyh1ygva4x3tjvloygx791vuafzldv8vio21mnt9cfrrcb4nq3tav93fve78cdytp2ijbverw2wck38srloxwrxhepfo5hjcnh5eb3',
                username: 'zdyqsovifxw6buz151gv4ko2rwbwx4xe1eff8itprai5f5jf30xrwerxk72w',
                remoteHost: 'bpmx4xm7yxx9l9qicbps2hc7k32nhiu6bfmek26die1l12cmh57lsouf5v6rxb7b6k8fbds6uaynlryjrz87r315vnufjdf07mue6gizivsuxh8hyaiuclr5dkj82291wl5jhlwwj50sg9aqnu82lblxge0wn932',
                remotePort: 4946047161,
                directory: 'g2rt660gg5ue3gokx0z5bp056c0rlqwxhf5jy9ke9w08dy0o3qapojw45awb3twg9ncbdc1hgu786mydm4pelq582nzf5lchgpxyjv4kl9rwvgjbmw3k2zqvwcxg4fxt2jb7qgdfe1ccw58egqn7uu71s46vbxn6ttqio6g30fod8lfkuvsgfj492wjfziyc8mqwg8r5stfqljdcrloyqrokpecni8f0z154435un3ih12wc1e8fgftmy95zzkkntlics1om6so7xnyoojs09gnystxz3dy75wx4lzoclt1nm9j8le6edeejjtwoa8jrmln625pn0qsf6gs7gdnyf0x2mwmpzdsz816jo5q18rte5me6y45xm1ew55p1xc8m59sk7v5ombe09nqkggqnlakxjlzogcgzd9l57zw4b07aw8eq7ni5qntbjegoi212ycj2g3wtxge3u42jpu2gqx1to9vwkpqwnl6ojnusx4sm3f7kjbzlijl5mb6xx87gw072dbr1066txgiei016klxkiiq7lj7z02fcn2qb6lysskkb1dobpylscx9dm9lpdlxijmqfocmkxu9eikpthujmvxlhdgvzyx8r44sxu8bjhmou6ufbewd0grjs4iaz4q4295i60lil7cw91r9or3e1nwt3m39hske1rz1bv80ipgg726t14t296ufx29u0w8a38wmr5t66ljfruynwvx4a3prml6n4wexvbtiw8abyutrp0rcihyt2px8r0m3y91237f3oz6p912trygi9mce45skvlex6kxhv4t43v71rvtcuu28gkosxm2rffg7ilv17zpy8kz3sqs4hdc4a1hsb680dbjad1n5j49obdvmjbnqu1uus0sv1uc5hxspgfpm9jgrk2nrxem4ny6g0d6lqqzxgrwqbxu41ky8cqeh3nipve168amj3u4qbir0oi9t0x4e2m624ctxz0bjuer3nhx92ib0an6odgtoc12rkq4fha1374t0uby3b00rm',
                fileSchema: 'y22zv5r2g26b43guiazumdw6zzgtfzou4c0z3d1qs78z38z1igrgj4pbkrgpout66pyk6mdxgqmyl9ulaokfc3kjjn54k59kjkn4zdkfqtdljv1ycjd3a7m3m6mvql094gaiscrvfh32sx7ykyosmzd1cy90t0teyobiy0b8q3ocd90q1svvbwqtmksdfa517l3f30sasiabs5m9x80ldo5btd0ih2y7f87d96vgqrdjlut4yzgl59w4zquahbhy3qk5pgsqw5odbnvbwsj1bz58if3a0d4q523z4hsj8yuc6lfjiploxeitzttuz6tuh42jbseik6uvtjixjej3o220mjc9h8aw3hswhf386lgf5il272tto666ivhanggsy6mx1dano2qc94pqxg12etczfto7is837tmk5fshfcf45uoysgqruyrzs3ggkeqfne7kz6wsb5y4m2ufyhytssgsppjd2fxcarcg3uznc8102etl0py1x5ku15ufi18zo83df3b0i55crb1r21qrhzo2o7cnimg0euhzgsguzu646hwrq3svtbj44f8e8tsq87dtb2fn19hz12coj4i75rk51b861tojv7o1a781fs2utmrykxh3wfu83ii5oap93gg9jbfrrkz4i9d8uyt2cr2hxaqbjp5uum71s96yns69240mbwmi30gjbeh49useid01sjekipbefrsjia8dlsjlujzx37vuyrv0kxuvx7x5wjqd9zhb6l4ca0jmkbhzjil3txyd6v6yx9l4d1f1lt1bs61ppw1gqmm87n38nomept8j3d5aswfvmygokmjumxj3sv60t2n7xfa36u0xu1y00jjfacbe55o3q72osy6nylprce0bodceohg3bjfdi0dpnd38hmn9oykztxqsbro9wmazkpbq4mqnbylhcnameip19x509exvu5b5vtrnei1es6n2r1dsr3ql2jq3ynls7by9910ef8ykicwcyx3bqiyh3qzbkccqg5buvnpi',
                proxyHost: 'oa207vg9vr7i8n53rilm9jqi6p9nsr360qx4k3gl1gwjvw8k09iu3evrq77ri',
                proxyPort: 7538652389,
                destination: '4kpm3rpgqh2t6dqbpgff6goax8a1plrv3wiv422ecsf22yfjo9bz077zo2jbzx6whgiscyup2c7x98mdk4nqskh2s8j9v1i5milbbe5hkffspwd9qm5s36bx73cec4zuiqoxhwkvjg1mi6dd8jw4w5cszl80fofy',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ckb2mkl9yg9dt4jmynpjxhterbp8xhx2mojpyovicz1txy0cczz9gy2qpcqpbl5f8y2cx5yt3o9lfmuwahusf1lwcssf4qhvb3p4d8xz42bz2m3j2gc5kiv0wkx2rmj42bpok689smgsjp7x6baf1cykb9k5gqsv',
                responsibleUserAccountName: 'ps0mkcr2nc76ls6hdxl2',
                lastChangeUserAccount: 'npsy68sf4ldvif76u89z',
                lastChangedAt: '2020-07-27 07:09:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyHost is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyPort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'mk28yguro94dsbuoli8vyas1nuzh7o9ahcxwjh6kwlz0xqyrgb',
                version: 'kl0ays0nvogv45ix2pgl',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: '6o09cqmhj1bssklmoe0ll3ex0emoa5bgvt9pqhe4k0g7t7oqk3e9j6g9uhapv5heth3u1bnh52uj9d5612102it9p0oqsjjy54wpotqrc1c7mvsgi81bks002bro8rnzqmfrwahx61bc8lga2868zitix22uct29',
                component: '6jjrcacy7rx1ubl2al1ca0z2cylhz7mu5gkg6sh36g1b95n1qhtkh3g62tiyfytt3gdlxw7u47fbwf4em5l4ytc94l95z6hbsa42p6dq2fbk8pt2siqjzvaz270h6qi8b8g8oy8wv3tsg1taxt19n8cwweukp5o3',
                name: 'nuwv7vip7iq3yb7s982vrr5551qz01lzi12usbgngdf0ieoar0dvlha75c6qmxxlmv21imgkdxyi5tyuv5b95vgzunv5khmzkrm59496yjkoc0o1ghqkpw0xahd2iyg2jhs7p0m057g9ts9h2hgjcwus2lxbwdtd',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'zvn6xoh0xdcoud37qeqfn5c5913dtefnrzbhsdmnk3rzevkb52kc48pzb7ugxdy1d4suwafsq9i76vuhx10rlsmygn96q60l02dinzvaq892rxl41xxy6uib08sj4ly7613q79dt5eikbw2ikea246rwxuonyjsp',
                flowComponent: 'fhhjfhcunf73sqa8zyxiqnpkoq99wgi0wmv21qlb31ahtjjuz2jgnhije75dau8tkr24o3nhi5oyvx6gzbrr6mdporsubz5uqj84vgbymgox2dfw8v0anpnyuil91pe6j1t17ybdupfk8cdzpmu5sgd8zwcwmpn9',
                flowInterfaceName: 'aw9l5ijl02v2eckmyxfn1z8ixbzbpz01tx2r6zne4vcc7y72eyozhfl9h1sp4241u0bd2aeb1dhqcc3rca08e7snbbkzp3qoln4s0e08ed3ic6phc2jqiobzfuf7wyepzrc039wgtzr43t7vx9qxd7lqhbk4d80o',
                flowInterfaceNamespace: 'bdwpkcok3p6zad05iqomlniu4vsstatdiha9yrw7swfxc6lc0hf1ase0hfyuholde6rg8gxnb0pz6z469xy07gq9cxccr0yg3gv1b50e3suc62ngcqh0aqs2uy5fyt016suu2c58mdzix9ce01ho81h6abvllrtz',
                adapterType: 'q0hpaboze4nob8aqrbrwl44xo4w8ura2gcoo25xe7ixjvnsureejkihceyd7',
                direction: 'RECEIVER',
                transportProtocol: 'tnvfn6xv365ecjjwhme37p5qo9ojcxwjd1ihpel6oybn6e5g3em307nh8sif',
                messageProtocol: 'dsa6x4hiz0xfhinly8y6douoxfv20d4g0t1csu97cj3f9gvong9xelr5twwm',
                adapterEngineName: 'gqmw9dgc9zhtdj0y9pl804zbz61e8smvj9fm750m6rulz8jfbb5uoze99a3cx4lb6fdxbi00g0guzvlsncmzomu57uvg0zjo18nwvop6osjwtx2ktwhw1aaua9122hyv2pcvx2e3xu4j8nociy3vsb6s4nhs59l6',
                url: 'owwhjcqjvncdabwygxzpltglglcju32of25gjeyb2zidjqhmlle9mezhtjrhho59ykiveskubo0qn8av973xzz4e0jxp2biys8l2qoazxe1u02i9e0p0o0ii638d80oj7j744s4qhb8ituxrc1aesemc1rtn0a28ty67t2ez5cgth8tdpped03e70wu97769zroa5o1vv9lndwjq07v8npletfyqts2ck7olmarihapsuloxu3u2zad3dc24sexq457hntrvyp47f7cokeczxy9fgqrfp8oiw9iwz7bzq373z6vxsundwvo86122prqt',
                username: 'nbshnaa8vjlbrtlo5z22oqxa6mg362elyt1vyffn5tsuq4nz67t3n34q0gxa',
                remoteHost: 'g9l0z3q2o1udzyis37mrbieq9ivoarc6l5m2tdeknxsjigfnqlpxqaqwpsz38ju79ihhvhlz0eo0f3jrg6520zhn7fjrthasr0sccqq1edpsdwk4y4hsk2s6hy2fxm60bsr64vrmn11ic3jzn44e6pzci7vv8tlg',
                remotePort: 5278116104,
                directory: 'u3i4jwqw9y9sgwpxrrb165048g155ruejg4o1oyozz5w5t4kwldui0cr85psal6w9wzjx9v10c154lw3sw2twrm6b9mr7tq3owdhhnziq582pb9jp9wehm7qkrqgjq4wfp7okplymka299q9drg3e9wyvy07za1smb5eblwinl7byfu61rie7xqni7nc48opcebw1kaqt3rvnkzf6wayafcu9fnlds3i1juejakqmljohfskhkjt4w4c7mis08c6q6g1kt4gjr2d32ur9xzgvkvi4bh57r25th2ui8id0ol8b0rnxaze2afsjduqwcl4wgrbvujmnyuf6t013vcn7e69v242d1s2x74e518qxdhlk3stsw8hjahldrc79mcei933n0qr3wd8zvj8nru88gnxlmt2qs7h0c0j5ace0l3w5hp23gj1th3t5l8gixiu1t4335qmceq5kijj5tn8mnkdygix5yrucjvq4ntmqpm9rdk2w6yuzsjqz9v1u6mq83oxmk39fk66evfrqre3lp4hefz2q54qasdwccl062u5qf9znujwt76dul9vyh1dct6o0ov3rgez7gy9d109jz4tlqodqbnz8kgt12pzxwp8gm5u4dul59yeiiu5zanrr0tofxo9dcumjr21su1afyn3ivtd153vstabiowza96yvum9lmex6ps4v1j0s4p21ntr1m73bbhh51vw2r9fc5gmur9p4a0ucsyhxrb5m2lc2e03vkwrhk0wow492xqllhjuamnsjksq2376a4xm4gk8w2k1e3fad86gcp11snm8ht74dkzbnphefb9oectlpsirp6f9apernbpmjnexlga989n6h44frx8o0zh3gils6cy2lkgsklzca9u23cws6y6upa7vyki9foxpw780yb6mxj58pczcgdjtfiozb5yf9jv0xd2b4a0imc8ue1d2zl72dl26cislleywcl73lc4zm764f9si808gjfv166691zvmaczn764jn69j7lxq',
                fileSchema: '8n57l5iwrygnju4ka1fk54k2fsfjxgkgloybadvc572kme5jc7ry3h2qtg00pzt44iywwdunh7xpde3qoct33izczc7gab3ropyqcse9a0m2ebc918xrvmzmm52h512h92cst35fgeq35b4ykmizvd1223pwvwk0q7g5otar4dimi1snhhe0dzmfvqhpmnrasdcrhe1l68omuhx9xloervachen13je0vp7jt2so650m365kkxmhy8y6j8nczh6wxj6vuexp8tvuj54ljl40avf957pjq3esqakc9y1gu3jwgxbhnki6lv45w7ec7l4uext180uo2gkmw1qnqrzw5i7a2u4ofwkhle62v0az9p96h08vjkt98czm1nporep8beb571t10s5bc8vuq5meu2u04nuenfjw52gcam2haaziaqq1e3lnas5y6iokzibsks0kyu4zwdpj5j2vbqkgert4zuawf5d14kfzwk4w585w09duc6p5uc5u3htcxjczo1c8rvpbghx6fqjjgp8zpw6erve6up75s5852gvu0hfa6lbwasja7tkxos78lr2iqrzz0fnaa0y9d3oud4vqjppffcu2vzg2iprgjqgp39ihu73bor7ah0flt55wukqgeyu3et8okfb3awmm70npjse8zlqacuns99yvlc5t7bidft1ubenoxp463nbb18897zvro6tdjjr7x9lct4bkw59o6kghstybu2tg3gf1bc3cmcpu9yf7c8lmx314mxsiieibj04p8w36978h1bn72jqto4d3wxe35w4h0c6lr9vj1p6rwtp8lcx9qcctacbkias7vfvmb8d8j82eacmiz5xfwwndkkpc2t0oy87b4303hf2wht367k9ziv9qpu48kzpfvuxuimmo63ff7io7axjx53oik3agwm17xbn0hlkqv1wvkk1jm0qd7dbd2i6wvw117zz9romu2gjitz8rvjpehb2haxqkda4rxynwf1b3jl1xwibq4gwf14pik2qy',
                proxyHost: 'dx12tu5sy37d5bav4fwkhxo5s5qiexmau7lvmp5835aj0poh7wn2hh6ly29w',
                proxyPort: 66457166185,
                destination: 'o7co848t2arbhnpw4q45nfr40lqxxjoxy8w2p1h05hm2jzx08vx8p4aq2vamr4at3lgdctsjffil5jqrbtghla97k1goj04wf0zivh3i91hdzrv4mu2csvju08jj38xvoczdqka65k8ga9phjzszgyb1ejiz3gmn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'lja124l8cbqietwx8v753v2kopzy8i1yz4nkz8zp8y7202c6s0h2jkwvj7tu4g9qp6y7w1vgju161w4hc69osw1xjeofeq8ofbczq5d9w7xpadchaq3ce896zabae5j69blm52tnj6oc6by00nff7krbdhioqpif',
                responsibleUserAccountName: 'qvwa7xzw4ryyvybv5j7f',
                lastChangeUserAccount: 'nd8wsljobzyxfakc5lu3',
                lastChangedAt: '2020-07-26 20:33:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyPort is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDestination is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'xi0sagm18lm59p9u89d9d7v3uis7sbmu4gta327ak16uurke7t',
                version: 'ygg4vtjca5ydxswgaeq9',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'e1tiyns90c5pm7oc2kwm9vdpj7bke48okxk8r6zxbyj4hzo8xmofh3oula1xamzzdowpi05wgs00267bst0hjzca0iezaek1qw5uqpvu38wxa4a4w0wpkracow3pky3u98tpil23djvcikakoz15q9c4s7u9u6vh',
                component: 'ttngu5k9hbrep3ao45f2wppcnpclv1oi7hdb8pxmve2wsgzi6e9vte57jfjy4jgv5k0jzgbm8g1xv751hqujjf8dbf9mef4rcnzthj7nfujgqwuh6mnb72wkaxae14nddlsoed51rc52pm4ts9pinc8dmre2vmc8',
                name: 'rjc2mqcho6tzh2dkzcpr57p764v8tajqwx00h7e0ik7pesya12ccaz4h1xivl79obup5odus39r92sg21qz4uffqsexzidtagrzeu5kzhcrql844h9h1qm66u1qv0dx3sq0vxh4k6o51ly2qzzn8ms6u5shbzvx1',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: '3to7kxpetrx49cv1mggcsmpiv3vg1mpb7sfu4332caoktrm5cngazmtorcerduh9afl9dr0d40mqrsi3aepxulqqdxhvaj3s5n3js2jfnv93hqvd3lckd33a99tdz6vitz4s64v6cntzcie9c423eadze3t23ufy',
                flowComponent: '7suw62iw8w494pxzav963byrkppfih5fyb31ugp7y812tszcy7vg2ik1h1anqiaa2qtpjkpb0dp86py4w4eboo5y00r7g6q46624te702rpmml4nd3d8gguellwi3av0tfwmzuoiwzqklp3xsnmtyonyoon56e7o',
                flowInterfaceName: 'qd6xyxvy8mifgcqg3x6mwb42z6uto0ajamxj5y8broq1r22lem5c0vqggtoq60e5z7uyt7m36ibcr3n7ctsuka2zd3i4aj10whervpar57db9nlqexdv4ykracowosv7vn8dbgzc17ag7utnxyamc8me6t62hslx',
                flowInterfaceNamespace: 'tpx47ydogtk21eqp1m1a55blozz0440yd8ka7uwomby9hveujgq9hhgad4d6jms8qrlwb4pj14ow61by0o4lvb4laub1qnzcnt96ctl5nanwg98ja182q2hwr0zbg2qe0nmbpypngeiy9ax5vpucd9306du3xtt3',
                adapterType: 'gnf8818m6ssj9jtmunrfyf9xfont66d4appzwkp9b4s6xqnlh0ak3oi85gp2',
                direction: 'SENDER',
                transportProtocol: 'dd5jey7uo7nepdus96kbtlsijustgn8kv1dlook3giujhh49qtmsuy2n8kzg',
                messageProtocol: 'v55z75j9z6lakrfgeazs96trz3o6766wb3x6btqvfs8paph9axodywe415tl',
                adapterEngineName: 'y4qwyr49u1z5yh27f1tw6oy036xia4fhjtihj1pc80tb2oxa45826auym1dp5p4xxzalf0k9rxmbk2ly4mxsqgzj9i5wqviah4tjpwtypdx02vl6046a9y7bdvjc70rnqbssd3vksrun7vqs4u7o6btoiehnufxh',
                url: 'hwffa5da63pfuykune7ronj36a4d3lyppjs5srn0cfotrc1ybnrdsl30yjzmum632h5qyoup2fs27v36n1yqepyqzcil18ux7hbdfc60zeknv8my2vt1dysqpp81gh7iq2rs7dkst1v67jr6hmh3xliaagjhpi97ga2ihcb39zxev0lxlldzf1qb2rp3i2m0p9u6t6mxoyjqg9tvfs3wdwlr64chu2mm1c3i66g5igcp2v07r60jkulcl0r2lyikx25fm0nybj7za1di6nrxwshhqnjqntqq4yms1n4fbmsyyiy4oau10xh009lypsx8',
                username: 'sauh05gtybybhrldm4fx4t86lq2ddx3thspca7in352rf5n9ab8viuszvt25',
                remoteHost: '18vt8i02daa0wxvymmi8ryqij532rkj7p7o0hhowvtlumh0i680hq585co7cunf3mcfd8t7dnvnpd9hxyf3527elnu5b38to46kuq1myoe432t4k5dblv4fxikqy3owqukiq0ko1v7y4gf1bhnaazh6dd4wvt93f',
                remotePort: 7483281503,
                directory: '26iy9isxxhk6zmdtt5fpv86nl6mws7s78pz9psmavqcq74ecxhrj3m5gg242pee462qlxj3wm63zr1h5tdtcnswd6j8bsrxzzlr4x7jftkyvka0f80lrvu8y52sf004j0yprcuk5ytd6rsbndvc8nzq9qe35ci4omu4rbzs2flb5tgcd73oikd2albaz5nolkoraew77kv3unwvn8nrllbmbx1jiw1lcm278nxi9f2w97uxa8focwaa8mcol2hs66cokyt6ddh5ukk8vjxgxrflt53fsm5e6cvdwo863rt4fvs1zefdd0qxmaperrx9liicn1jcnnxrwn2w5huhlxuyc7clvsjt3wj0tsb9hng7v7i875edtu5wv5fis6rmogmryn3emvw5y57ip2z7agbolwnrayz5p8t60uwwzinm69ozocdw9sa255d9dvz7luagy9zj3re3uukc8abgu9sxyajk1plo5ash8f7cmfcit3bxf53k5yw3gspd3ur85x71b4t5jjtikeluinr1yr1pzqv7miu0u18ylgpul7ed4sjqe7795vlnxglmuh6xdarbtng2knz09toirljahi5bw5y07w9ekx8vbfujo99ocsifetivm43v8m5wta35cin9eysqwxietd4lul0xh0aeukmng0361l4db1qhgpyk0nu1q1nk8cnz8zhd9gh34fbwicay65n26hh92pdwsazipyzdiey356vys0kv6eo79m8sddmdc3oqmm0gkxrmuoxbvzdqqe2l6lw8nsrqsizlfmme4uwq10s5r1h9vde2oqfw2a9n8flqlvjalkdvg7dm1xxhugmiom6cc9gq6bpxytj6rd7udmb86c40jltknqvmpfi65a6zni0f4a4y71kf6ipblafu5mtwxto5u7d874onrbci8sxwpob6lj2aqwceepthopdqvvkvx0svs67yh38yp84ug0lr42bt1hiak4ejxft65s0b2rez4367b354g3orn43s656j6a3hc',
                fileSchema: 'raq8fib2rzxqq52341tm8a4fqwwjcxd2la1090259e0idtc55kp6f0m10105mdgbkivzyynie9azceyjl99izz52r2x61jy92fqkv57jl1ob5ufq25qucifc3qwjw88qz4103otnrlkprj55snzjkcj3tp91gk6t743w5asesdl1drf8fgh87k8c7x3r4i2s8ihu07y5hbtuv14bddqmariqqi5bt0ye2sgvmtlhc3g1ecb4ltu3zywoz6oriy6ubn64pny859x6knxyctv0am57yuuryzy4q6swpiyifj1p13e5twt1ab35i3cztk4sppplz7q8bblq1o2g7bve5c4crczi9qcns0e81db8xx80dtnea7505sjcafbgbup1klvkd1vsl028io4uutxmmagagojtak74906y38br1xbp3g1fw99wuny1drx2aztncheanlyvbto1pigggtkvubc9lkfcm080j47i8a0ajkott80oaxm80dukaznejzrm84lh3cwbltkuxqt42x6m1312g0bcbrl953bn1skm49yga6ob9rsqtayisw3skzgi9xav5umd9q7koue7glcvj1lndryoaamh7su76t0006lkz59ma3h2p2kev96ptlwa463hginfh8ewwgpr0h5i864fm928gv3kb88e1ikzp47xcxel5hjnm4n8qb8mmpx6p5axfl9yeq2mm88ocnxqchpeudi3znubvauy9ft7t84hjbd2ih6crpohayksujq75h9r4uctf0xd1zez0rs124zo9gs6cy5rbkpabwzx501pyeje84wkm8iac33nstmvynx73n2672sx83y1vnawqfcn9tz1ay4gwnquvjhruv4kihphqaab9rpj5xzqtnv6ndv8khoxyjsuuxj7tzhwzok9pi0vmcyc2m17273dqidilsykffdc56vargy05u8teftsb6s73xsn8sp4556vi32jq70f8g6ni9zfohxm0ckh70natlc20jfppwwumkno',
                proxyHost: 'sa29ul5sbt6nady7okx2qqwlr53gn765az9yfz9x54ff4h45bs292a1yro78',
                proxyPort: 1271276922,
                destination: 'phuy7q3i71xw9v8z3rh0dtho8vjxfby7aex40lmxk5faejc1fh5j39jyy3i0yzg2f4h2opb1onwziey4itfnanhxrrsmc5e2mo1dgz6i515p2gm511h7mx59v33tcpps7pzxl9koihh6zk2yrd8nr1vynpp9jjo9j',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'kb8x5rieicp0kwqa42zn7na5cffgk9l755vj3qvothqe30wtq9jt872m6lgbv000pun5uep0gq331hx854bmwknn7i00em03k3pardjjc7x8sqe54poblz90p9jp3esxzp7c8av1yk00x4lksjohsh339rm2sbn0',
                responsibleUserAccountName: 'eoedr56izx5ftnibai9a',
                lastChangeUserAccount: '31k8ylnr8gfgzb3xeoqy',
                lastChangedAt: '2020-07-27 03:17:58',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDestination is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSoftwareComponentName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'woyr2tcjstmo7dc2xv2tkluwakmigt2fn30l3o9tsqqu25y0x4',
                version: 'tx5aqjwofimbv88jucx8',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'pptiq0nakjiwzgl6kuh7a0jzx8yoo4zel7kfgllcjy77ywkb9wn7ymb1y706zhg3q931dqw72q4cmbfjzsq8gcgv9g3emifu5ua5c8h8dox54i2ge1wf9egc7zvlj7c395klh5a0plu74gzrpmuytbhqhh85ui93',
                component: 'x9h7pjjcfw5nkzmq3dzn5bs7s5xw9uhscup5ure0kgd1s9zwphiwwsv5rwb52fs2d4681bg9bf4r1zbo92hy7lc2pimrifsfg3vi2xhteihj1qjclilayo2ivmyql4d94xzqu5yf73zm6xrjlo3965civ85iiev7',
                name: '4av4x7trgw01lh2goqdp3qgruspp3jw4oejspo2l42n72mw4j6p0ehhhi102dpfp5udaeldxrqgh0dcfo0t4bc29lwkb362ducgt67kbo7b48fu91az3a4phe1cibasyi01x37uoaxsorw08lwqsgxtmtf8krfq8',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'rsrx3tgvbxctwgwpydq0ldko8ti1fmj1k3hy3cb42pclgaljkl6mizvulkwwmwk7gv4eilq6uxc20i9st4jv9h4x4gsdr99gd26mt41rixkzucocsj92yvnc7ea2i0dylks8j67qc9qo8t17aq9iu57cr5cjh3n2',
                flowComponent: '6im92h4hbmws5xp092e90lvs99ri5sx9gw66gyymyn7hnsu4d15cmt5j25e82agqmz1sdok6axjh2t3q3ouxboqkdoez7kkfumj4cm53v88uzf5e4cd83ak58dgrxzdcgwbl2jgmfk9zuuf38h9los0bx9a67upd',
                flowInterfaceName: 'w739wsjtxhjvlmjoo81r06g14uiicbl7zon23m6uu3zqrx7nv93ij4zguplccctooysdmy55uqeapqbftnu41q4n01l6io1wchv63cfgym8g8w17ts7ab2tuuokleop60qaw2ubhk04zdzromgot33ixvwk43hxr',
                flowInterfaceNamespace: 'rlr21ihl0vtd6lb6cwa5rtoubl3m95mh9a8jaqihy34s3ywpvkiwu21min1fnhzbqanozfngj3ng6asn75fbgtsutkdu9law4cfx2kuutrqji0suvt3kiv84qy1hu5x8gzeaookd6kgfkgt6yy6x9y7wb4vqj7sv',
                adapterType: 'p3atza00sufmohvg3elrriqlijohgz3nvixfsro75hk2m12rm40olwwfh7ph',
                direction: 'RECEIVER',
                transportProtocol: 'ult3o3edqn0x50p96dx6opehi96dbqc2uejk08tdf1jyh8d1xhnmijderzmt',
                messageProtocol: 'kx8rltvohmjuu3414xdubfpx5y4dhx01za6zm4mzx63y5ipthaq84rmevfbb',
                adapterEngineName: 'kjqymph1c1uv9dllwu6p5yu70sg4hy7t0itu1n4scua2rhcmg1zw3iftq10emcnqzhrxe51py9vxew3hechdec4arktxju4nziwmxzeq9yfgvtl6mx276zo26ak5cv7gwjktxiffvkhf5muu9bq85fycl102sgfq',
                url: '2u8etc6dw4u4oco2aqg50hdk5yng7plfe23ogsmvj6l1878cl1cwqmgyes9ilytkn9toecptlm0l3bm3cprwleza2pth074djjrud85tvrhifsm4yen0qi4m8m0miuunz5puut8dd7g0cq8tcsdjd2whd3kbhc0va6ym3eegvj7da3ah6tnjorlx4bpkin7c70qnh5kh5wucrw802yhdb3bw8rzbj5311sh89yhp4ou8g876jp9q6hcioibjwv5voq3nxaaaijwfya0ra3v0jrh56sa3nc9v4qzt8gk1eah1njevz2f3z7mif4j02kej',
                username: 'h0nhm9d1youzydacei6osk17vwnkpx74ed9w7o4crtg3af8x9r3a3klxrvgc',
                remoteHost: 'mjtvs3tu5b4srusjj9hugknz2mgeefjti182fchbk2hum0bzz0ob13cbcgiubekkactimz003zlb00k0837po9eygzleh53ilo1uuq5bszu02bk4gc5dnhx5ganqk5flobeppvotoafbya7a1u3u06cslututkl1',
                remotePort: 6967610082,
                directory: 'tf9atlgq718o7dj3v20eppr6mqlwwltebqmvxz7f3mk6y5jg15zrhxg6h1vbjizbxcr8yc0leiyfhuvwaa9jhrf5j5x94028r9jofzdgbzmnwfvkvnijrad8jmaz1aqlswjh31ju33ki1y4c3472231t1aqbjo8y40uvv3z8z13k4tyxxyctkgso5m8qz9wad4aev91tnj1y9xuizkvljywxm9chdl7g7c0bpuaq5gtoaofzof0chxvv4njlzf2zdfa7fzf35ovfuesmsv7uln0cfh4m17quvvh8xjha61e72u5xrd1fmjph2gh8wkjk3oa7c54w2xfq7ztiqxppjqke8054rq0d4pdxqtmmxv7e14nd6ydyy79ki3agnoof69vy5rfs2am69sf0qkhhyhtuyj00hlu9ntv9c8kaajvxucpxwqh86d47eftdaaet8rixax9ikrs9dicj19p7eyh21v8mvd1jskbz6p1k8bdwak1e15bmldh0kvblclnv9tkr0d0b05v51kcwaccliaxo8l4ezxgg3tibjw9i68arffj2o46cv1k9rpq7u71sqbvbkzkn6fz1w39ic14l0osgus5j244k6ctmsrf1oiakes4k9ube9hjksythyrvxsx25xqzkp55kp7civlj9e2cbt9wnk69yi6o5co2mze68q5vvukxorj4rgv43zaf7v6mxqt12k7fcb6osmg2s4ivmdkca94jh727e7ef9qhdivf3c5v8bndsmisc1160s9bjec67g8sxxdo8zfkjykav3pd6a5bipebdyn4psbko439hnqzgce8gb0vlwk23lgtlckj8ky5v58ycyeep61qn8sk2s9ihpo099v7aa4pujcd0ebrwhlv6qg8l2y7zzyf01ssbhl6jjee3fk5w0p0w031jd6cfbs3bx4d4161cdizax31z45qkkjndi3wqjlha7q1xycvk7zwjgq16vmlhyhhntck7bxz74a4hkn6vzhozvt0x98immtzwmvf1r',
                fileSchema: 'cw9t1f73567km3fjm8vb25kn7hxzozm1jfc188rapajpu9k72y1qptfghpp0m3tmggyr59bo9exjh9ceeoof5keb5tbm8mlpra9kblcopy6due2lxva490tfbih8lpgp8mjcp5pw28zj32f8llj7596pk1tuxqxxx1gz8x5j8p65e7dzlzkqo7xi4pdgcu7p8bmqtky4jmot3peceri5743nvjsqy9t9trrxknd3gobsovcylgr50ctqwfcid0onz0vaj7t0ndlkgm3tte7wn6x3i8f1cvkitd9tczyt60e9f9kyowsa9i6bf02o1kdouvi2gni4sofngbdtc4kr0axa8ltkl0rt7we9eyoee1r8kp9kqora5nol3m12fur05s01o6exmeoo1tfulpgjnzc7fmawtbw40alzb39tw5nrrdlrp8r1890l2y7ts4kwrfwy2z6pcz3t4ddk8scgg158ahvd1r1eg2as2mc9gpss4cvib4mplha7adydc91f86tg7yoquelbikruzvb5pxqa4aq99w9j7cltcq2lxz3hxchlna3rwgzh5v7ax2rmet2zy5wtr64t8qywqr3c41mqlbbyldlquafp2r810s6umiwqwau3fihpkz668od2j4vo3hfqrrz4cnc4lf51h0u7zr6u77wn7gyv9u5oy03ba8omabnabjisxyu5giowq9h1if0lnntj3x19ysfaff0q67z1mtzqvohpousn1ktbiirqembr6ne59wqu7z20upfn5cc4ekv7bt0giffndxs9l662t8daptupzb9pnsubiibkln4zai3dr6ceqtb48mlqg8hsabmy5ey7dsr64gm3nmqk4bq2losxn4mg9ugu3xkb5g7w14evxx4et7qo7wxh0hft5kd8xdo0r4lvkucqlr4gzoukc6j0g6x0mf1ojlhgyw4f9ivg5n2s216ggbltw24w52mg77tc6pjqu78kspeb811ufwkipzyuekmps6nq850ir7aqrnctzxnf',
                proxyHost: '44jwqhv1naxca1iznkr8m0a767oww0lemg8xzto87k8ih7n5uhhh1p3io31f',
                proxyPort: 3637783336,
                destination: 'my53we23iylaj6nt2im3zjywfg92ltcgw4k8a1cwcpf4sqla24emtohtovque2yhc4hs09weqat8s3624kzrlrtm59344cjvi698h2na6q8opkyvd0aa8mf9in2h6wf91pubfhtq1i1l0focgcmmcrei6x2wjace',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '5uqha7g3v038qjjkthq354rh1pzqf5wg7vej4o3sqr8jna3nozyt23qgp6ith4m5yfvql14121uom0runovmrpqqr13bcbay9z61xcbkqduoe0i6vcwyjeochcijkq8e3n96rhtm5z5k7tyekia3yw8rqh5xbqdln',
                responsibleUserAccountName: 'uuuaiqf1xhfzs6nvvwik',
                lastChangeUserAccount: 'prn4u219h00bpq7nghr1',
                lastChangedAt: '2020-07-27 01:28:23',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSoftwareComponentName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelResponsibleUserAccountName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'n22w58dkwtyf74k5dbsuguburivhwakonmm89g0cqg6v1z4ype',
                version: '67tau47o8j4cnezikpzo',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: '0e0bg07470ei94qnp1ibk6wxp8p41ut9ee9c6cj4831l5q2wjneg9ogd1f4wfky31rgiq1bo23n34n9n0efxd2ovon4jr320umbetpgcxmbhnhnov1v60l3m4zscy97ohwn81k4bfa1xwvi7wsnb9ejror6cpc6w',
                component: 'u8h66c08h7fueur6x16qgmzvridztymodqf3h211gtdwz1wx1yzx54xo8gqelf8860y4mse50ve56uewyaaqo3jt3sxvk6qvcv8o66b9x0bm0vk6daj9beshnvtwe00a4erncxlilobp4osuj42muw4fetsvh166',
                name: 'oqnmvsetn70il1226fp4ri4bdxrwc56obs8p4jd8d0pfl97xcswy9ehb0cvhc7un4d99pzjgp3sfedg6ijvgvu6q7atufm8xj6pnuneksubs5ztlsuy7o14ixlsrncb9ya5v8d0ttcpyq6s6f9p8un6pgkxo7n7n',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: '6igu14ni2vh6r19wzcb5i03un3cbzlg88fs19igy07zpwwui4nenvft19s50x1hcdsqjnig9ahh5vctgaxcyqckkeg7migbxuj7vyqa6rzah1g8pmc459oe2o8yxv2vk11031nqx86i2esxh54zk2wmlys7ttrb8',
                flowComponent: '9p2x11i5m5e539yadaipbwrakm3w63ys3tno97r91tmf87rs89na8bv2vj5gn6phavqtvxjksshidcuo3mal4xlft1454kbrt1g2grco71f94hl186ckxb0kugqhbmmvwrsayip9yrtwtqalo8789mdwc620tah7',
                flowInterfaceName: 'n19c6dyj1hbgs243q9v4x3r2zml7b948x5x830sc78414esfwik2ru9l5yebcxtqdahlxq350f4my7e6r89r9qr773gjtg2ecf26i1u6pv353ix3ysxnsflrdkx8qiidgta5cxgkcvr5knselc08gb157rv11jw7',
                flowInterfaceNamespace: 'ugzcu6ofxy5lzlt1l38ud37wheafksllivqhrxxxun8wg3trvseiaemh84tsw04obeyojcz076nazfx8sdsocbmab1fckg5yks2k5advx6j2lwcbh717b0sep4rutf504l4wzxzjj8njdijb0rqfuolzthf19bm7',
                adapterType: '3ks4vskfl1eiw3yc6dhyq5zvdeeyi1wfhmfjuwq5mnzlp12wen1m1x87wgu5',
                direction: 'SENDER',
                transportProtocol: '2tndibs8m54d2iiqm4dxixt7btwa8xz607zzpcpsozn44yt3cd0u9mec00q4',
                messageProtocol: 'uirl9nm3otha3lixizpzhvuz7oyrysekou744n3dz93t1ets13mxub252p8c',
                adapterEngineName: 'y8uf0ta3sajnaqur84il1rntblen84dpnpbkj1jkm2zbwr5nsjh6jf5l5iwj7es7fnx3onuglyeh6u28cm9wwimv534c0913f4sd11kyo47wwt8td6ntrt8bcrmarksill4c2entm5unt0cwu5zsr1wfi3b2cr91',
                url: 'ur1964rpo2tj6dovfhj836gimr42s1plnt0kw06uh4b4bkf6x258qoo7n7mer9x5kd3r886cte94pzcuiewjswgcpqwsnrwz0r3f7f05mhyf87cpywo6gvby159qzkfv83rbyc7z3t2d0ragaiwb1ivhspzdod1b0hew4cgiqwpsfk3j971en2vsj9pj9h55zhdkvnmtuqix632pclmjwk6r6oajfn9efte159ahsl3dagkv7e5e8rewyv0qwyjojx7ddne9hxtmewydt0twpd1ba2xnhx87hkq3ya6d81oox7givwh4oepa4ckrlwgc',
                username: '3tc8lx13cv9rjnye0r1aok2ups6nacviuk0o4ywmob181ar3rg0751v4bs8a',
                remoteHost: '3fj9xva5g2z7npya1rkqjnnfmciuxgu99j65i0q8i8o1r50r37yxkz3v0qc0399f0l6z6jg49h8nwokerga5zqk5uzmqst645nra4dk668isx9uulbnkgzjqbfpctezkdjy5nxz4cvq4oc59pbzbpcpwffc4vy43',
                remotePort: 9161507082,
                directory: '2g0x42akktkhaes5atvg9qdk1xmc8944i5v8qk29tad8j5anpjsgo6bayacs7z1t3d3vokss9mnbim5yzkdfzfl2sfqsv37ltphavbsv30naaz35mt5520fl4vd13a4zufg1t294yx28vfrwvm2p5qfb4jc6kcp3e7t2kyemjx743r8klad7o0zt60tift2jlie1eggs5g2g6l5h7ki319hgbv2bsjc13jmdra8x12k3vlcmhj7sr9uo7vfcgrojv82qxemcto7o0ymk9ajr17hk7gh1r84ddd8k7ityonxvdqs86ima99ay1a664f0yitbcx2e9c462gsm4vp0zd0viw2d84jpjfwzh46tynsnpjge1jl7nwouveme38l2buhg9ov37bz9w3hzws4mvhkr3u76diydo8cvrvxj5qkao2qkb6ejh53xma4qdr6ul9ya6ixo0nwpzca9hstmkv6610f4zz34zx18hbn63baqte76reda0obelqnlzllp3ohn6tbl54ajhy2bdratx78uelfu21bqeq72hyn5vsxsltjpku8s7n0g237ubd7yx24yguz5t3iye4h2u65ebcm3dmj0guke5iqjdkh644x5liqv135vwwrw3mjphx1du7yns6ej0rqavw1ibl0dthackcj3clatuumw4ud1ojejfarrtu311dz5hpgcug44qix45l3stj46f026jo5xmdjzvhdr5jt3gz7aiet70x3cvsi1ucqaajyh8n36x1aiauz17mke2f325rx5y65e0b779rlkv7ms8ulpv5a5oc7mi1o3d3sawk0xn9ez926tozy0op63g1lc7z8jhd43mkq9px7glriz8qehni8if31p9j8spg50uc4ux1b16822yeec28jg456avs8skjfxhz3cio1yxuof6yrbl5ikvgbbz3viizqgonkbfi9eiwgaltxx30l39os9wr04nd2zr8s00xnblzeic3p17dd4cucpb55xfdl2tdccytnar1lt8',
                fileSchema: 'v0qwlguew02j0xp1lrs3x6ggc0az4e336oel5i7qrupgnet797ovetyevpksunpycb9qfoywvll5lxd7mir4zajedh3f8spl1coxhmi3gt5kisma0t436wfknxk6jv27h41bf23rcecc3j1h57yyzvas3zxmv0h1bdgpzs3ac5uey1csqv16k1xei7nv8grs1x2xl9k6fpk9v7iijxqnhaztiorvy8lyyaw0bxtwvogqjwerfkmonhdz6eqtnpnt5g5h0gp2xhgr0krz9tcfdnveeo76aj6gw7kyt33fl73xwfho96qbck2c5mhkdk7q6se9q2j4k81yrsk92f7z8er46lul3aa8c8xuwd0she64jxwfkjpg5529jkbjtqkul2uya2j81258qe7h9knvnplbmqmk48c0tqdfxbw28roz2ruk31mi2njvq4ak8a8t6vfwdyfkma138wxz70xeet6upeogz74haxk8h962ck1k7k46wh530eotpg4q8q4460bnl9txlb8h4gluzb1gjjsgsfoup3q8qjp6j960oe8i42ce0bas273draef7euqj8a24pfg1c5xdfo9pudyskdw8qub7lr7uolfef6qjuvy7qa043zquclt4dx9zelag8ebdnvhtqei6nfnjsa3d7wzkj2lgfzuc53405u1dpndp0lceez7uwq05pklc45a432drs24d4ank92j82xksw64z1jvu085wnuyg93s7o48f0ulafkdw6cu42dkt5786n9q4uwokb4vwc6qwn0cq9ujn7p9hat68myk8n651otema1f6ktp8e2eu8m3oyz08ucnuop18cu37mdlordm267grziesl3lpcbk8cchts82gyr00ux129jkdpt8ut0s05xbx7z8qjzp1xxg6fkzz1t2thbj0yt0cu3qwyhvo85srunr4v3q7r187hfklewk1ee7abw2chzvheiqrinyl1v7ityg06rmv4mkxmhiodrxzva72houfigjnyjbe2gh',
                proxyHost: 'pxbu91z8x69s25fsy66ioxefmcce3l75nr128bv3rwobkmjvyu83stbiptez',
                proxyPort: 7212358083,
                destination: '1u2lj9pgzkuj5d6etv18xdbe1nw60bpuddwrftn8wm108o9e04qtl4aq61o1rn2nntna39uyoh56ia89fbzmawn5r6jj1d0vn2z0hs8pito4l1jx3ut8nfvn1py8lzlkul57a4okhigs4as2dj58atp54bv4wanl',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'qc6jpnjmmj7xshrhs32jdun7eh2kncypb3sq3dwnionurz6hkw2tmxf9yw2v2565bw9lszmck2bhb5828n4w2rnestbputl8lqtszq0q14q1351zgqzbnrmyo2aq64t86fogk4n14wvfkdo4w7yn33ervtinz64m',
                responsibleUserAccountName: '560fwt94rx1p4tmk2e8ke',
                lastChangeUserAccount: 'jtjfrjyyvy1jvokziepi',
                lastChangedAt: '2020-07-27 04:04:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelResponsibleUserAccountName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'uvbmt606ejin0wzhx7o3gfb7i0b6t0wa4o4lffpgzhvuk9mbv4',
                version: 'u3cy7wl84kq0jzsaz9ov',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'gt1zzm6412h8ygr9ej17rsu8gwfn175g9nri7impjcpjf3mm8jumi7i9912us9cw2vs7jgu9bh1xqhyxf5cp3ibbxckk7pzhkyhbv367qyq6u8emrzyhg28ec7vmnwk7avus3fjfwypf57d4x075ac0nlau9n6do',
                component: 'cojt9xsg7yzqaswxw2tw04kr6gvy71be9pbg6xkytd32haeuyxp5ogjnlguvetfcizi8vlilwmko9mentpvf5nwny5c67kuh15bt72bfm62mqqavh39bom0m2lumvpfb6654235qvu4b4b0r7iulwsg4sa3yin8i',
                name: '7hpu7ezbeohlurxm7am5hditemsmf6zgpmvzdn0802yre289es68deawwt6td6ka65n2rtxzz529phu0lxg4vhdx4329wrd5iz9hv5i8thx0qgbmliqi6wl0stshozdgwjlpoeb2kk9v30bzdejpl6txwptf7iq7',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'lh5mcxrzjlgqqs7k1jngy389u04ijnc6w93wros4a8jeth8soio6hbbweyxvvuraezdmkmc8moo1gwi7a7706y09vgy565zc2dmqhhyfn7nfbdqh8egs3dhb6dwczspy6n1mbkr0yvc7lpso1zm0x7rj0ty0gso8',
                flowComponent: 'm9my9d8grngi7400trd6j11dk3l5xrzvsnomsqv6ol9sbdguxoez29f4krwr7xvmb2l8x204udtojx9wkoknv0852xpujcgigwmo1obvzu07bytc7skw4mpbep8fhkay6jppra4i65rhvi80wcvvshmcgrxu4qly',
                flowInterfaceName: 'n6x10e5jlibksnob3p3ebr8hjf6fyn1qgamnh1g3yzqtq6apkhxpgoam4gncxl9dtf8co7pxwkk6dwq49kgekznc34tlx9xj0bjgfefxo2w9857ilp5enhya7d1ed0hmwfb4qr6edpwf5kcwx7tox30bbyul79u3',
                flowInterfaceNamespace: '4tu40lkosqv4s32er4vszct1rbuey6fphdljfm406jnx78fznpwaj80lus5a8z3gkskg4nt1ptzoulf2tnoq5bh25zpmmqo2cjv92ggqdfjtknxqr4fyuxb6w89srrwx6ypmg5e4wms7y0hotjqjmtadxq1o070z',
                adapterType: 'n5um2rgsrvd46ki1b6pp2ijaemud7il5woep09wco2mryuagd6vwneih87nz',
                direction: 'RECEIVER',
                transportProtocol: 'welfy3tao6wzfhiwok0e88i9fo02aatzjcl61b42ulyhr5z1qmjgb7pjgakz',
                messageProtocol: 'fqfxqxtp4a77ndqddo1zi7y0143ajwsdiud0kgqs3r4r6it69povqmnhcdkl',
                adapterEngineName: 'hq6njbwe74jbvehq37r4m3ey4r54wjeeugp05ocqorngl60xx6grtahzhc517bgdhyo37do2bzx6mqb4y6ctu4o6zfeuwaxw4f3clb9yytpkdk735a00xyugmty1k2c1ti2fl59hgzzmmxi6q343dpojcrdqfgi8',
                url: 'ct9tp9aaxtwb1vnm7g9hmn74sztl8uhs0z2ggphmet6ssea4govq2utkukuxcfn2n6a6sabrna96pha0ldmul45g38zfs3732ot8z63alr9ivs8iaxsvsiscez5k74t6rudd13c1g3icv3mhit1byzaxy2avj814r7eq3d8mz92gd82u4f206t5euwgx75d62twm63z5k3xdswur55tuj53bm6sz27q3qatw6lx1doexwma33nd5dz73k1evnomwsb7pxo79w2sj6dvdhj22ofqxgnrq6yugzrwygvauue4ow5dgbflvt6rwibh1uvw9',
                username: 'in8r0sdmtdfizxdkm6lvwgu8ugu4xird9xa8sjqdzaccdozjyrvw9zmhcgo2',
                remoteHost: 'bkxbmcqyvecpq9lao00n18u1d3iboiv7vleurpfmn4da5xl4oj5o1xxs8ij0vp3ravkqe4ji0289wbb11fki7k0loi07ruxxmfhsdrd3rxs33feecju9sok46bbxdznke6oyi25cx0egad6ooumw0fdhseta789x',
                remotePort: 9204952218,
                directory: '9ev4rba6rfzgl3nk7p3ldmcbe0zg7n2wo0cibuhmc4tmshsdighwu48neveodsigp82oxscumfycm2gayk7miejlr38rd4np9m5dr3izw0xercq7ad9iicmmgpozsbke5cjlylq1pxflx02aw22zsjv1hosj31xiv2sw4rqlmd2lyd27b08yru4f7rf7saazhypvfu9bubkn7s5dizyvqh1t71tc0gsmhgvdp8fo7bfp067faw1n3h36vrlqty2cgcibuj0ytxzbhsu9fb7vs8oexvqkqzsoitzmuxpo6x7y4zwbwn71b2f6jr4xjg93vqrbopy6lxf483m70fattq149k96vhikcwj5o9pdkzbd8x90aka9hzjnyjrshwyilnjkrsxe8fstgenxvfevajllijhmifxs7ma1ipmns4sddtccg1xnaqhdcm2rea90fuerm8cwnqel0prumlw2uso37zetzd1pygy5a89bh6j03v0noiriva6t7xy25v4tuwhflxln6hl5z7zxrekc39w9iad0089yb5v8715342lfgju4y9gu1fj8ovyiky4c7r0eqd0uc7tpgm2ni68simiza6yer8co1hy2e2t9oijqqrusij4v9b8ctgpyz9khvad2ttxut74wjnjs2ybqvu2hm8ktlme1uvybswte3ak7ntpehpjqpn2vc6r5yg9ern7kzkcvu749mdhv1ygj9rzjhychqvqws7l146zlmvq5ir5ck7qame5bmlj6xhvgodw27oguf6l2mt911175hihslb7jshkzivxoq888o98hmtt0lu9czzd91j41puswn4l1xv3yy650cak0v13viq47yn2jpze9ly7znsfk0vc4mx6o52g5wcgaya1b6hiemhngzjt01bvf00ysr03pjq2atu0jozwt93dutcw8kr173f07ha1nm5zerubtcema0wns1a88iu17x8mol6lv0w89wacmze71gt841j9ztx4zrqqvdbttq33c10uqhz5g',
                fileSchema: '7t2k8qpre5ypkd27wkq7xq5hur6kdbcx5htuqjg4so5kjizwdmm5b694dm81khkp24sjp13vj77cgcug2ri7ofbpaiqmgpsy6tnyvowl6o2h5h115ji82e593w5qnoie4e8poxsmp6v5ga7cljwk396v27zj7c4ob7wwas8jtima0ujmsfrhf0dm7jkq8t0pu6mix2gqg6gc31flrpq95moa4d19w5th8k3rol8mydib94w5mfsvxp2f8i0eh69tg9b5tnr4qqwyg5fyxmuvfdg9vwom5p6co3w8l2bfbijcid91i4ou73jgzrieddu0j0tl270qqvf3s8zl2k083ukthshtm59hcgizid8xiimeiqqcrm9b7qcd88904em3ww8usu5tsd3hh1qalfki14jm0i0h7112x976o3z54v2776vnq03w6tjwbdnyq8f6oizokwb6hsajifzr3p4kbah8mfzpgnntr3xkby9etcc1cdbdd1fnet215guyq00zdqk3wbxx4mbc1yej7vded9jbvptg3i5cwr363zvmn62v4ljk8firwnyv6rsz8ils4nq3w9m3w94yl3z01qr6ybqxbtpnywrng92s1ubsi9x4q77u7pjc2win3fj33zutyfxyiwhucg4lbnt8g73d6blcukvr4lvvh6u2jk7hr43ipo12m87ac5jxlwt5r0kj291v5zzrguvvih9i2sld8fwjf92c8lv3kn6kby2naqwokinths0lqroa07ja81kn508xohye7jyze3o0fahwawzkpamokrke4q8pzxg7bsqf9fksr7zobdlpxuwcylarnc8dr4vzaoyredp75p57qbao3mksdqmi20u73hylk11iwm4ziahprzyuzluhgkyqdj1y4a9knem1b9orsd6ui4uapgilml0nixk64a1xf7ph2gycy2ojqr7sg5lksj0cq2itlxdgr7l6saiws5lj9kqmnu5ttup3k4b638ill6zyw44dgi4m6tyje0waxvj5',
                proxyHost: 'rx2mp9kqgga1nj0vqevj0fpw0jwfyo5a2o87ond5k2mvhx57r8w9sjmkltp8',
                proxyPort: 4725710022,
                destination: 't8bdhxv8oe8k55heoxz7fw547kfo61fb03d6xr2cyx8tf6jyy9qlmlaw2dblv1w9l9kqc8e4z3mzeborapup4jesu7ugwru6lvr67sxao0vq7plgrydwle6aysmcdexnzlte6de8cqyt8y3e6hqvg49ja2gf676l',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'yv63wk6glgafiqj9gczmeu5wy3ggpiqq8vplw3d0yix2hon9zzmavbpv4wab8yxbgbaqlhoic0gj9qwydnd6y32320ew259b9vhfx9o33lyf259g5p27xb76i83b1y6sim9a5nx7m0lxvcxzv3qnp1ijn4mqaipp',
                responsibleUserAccountName: 'a96im3glc0e7cdjk27s9',
                lastChangeUserAccount: '9d092afl98dxavepdpj8f',
                lastChangedAt: '2020-07-27 07:06:07',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    

    

    
    
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemotePort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'g7hv0dgm7s1vn3iqqe8mwez4zlrfcgn28olvc1seps98myyif2',
                version: 'xle23pv7zff1kafxqidv',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'ke8km6o4hwn1a8basr42z9agon5nse95ed30plnexjb7rdjnldu60nkj9wlr8zwb6x2a6r6at6vo5k2qamqo85ly7y8ueqhlu5ikwvzg3ao0dwh7ye65tnadd3mv6kgqc7zibt6tipzccki0xdgf4e04i0kio0dk',
                component: 'dldpcr36mo0ji3el4lvwt59or15tmu4mexod78j5u58bfdgucge1bo9hpqzgpflit6og8qla7hc3btqakcudvqn1ui9tate7rq3puruel0lewzj93qm1f7orofrf4vi73unmlxmh4wm87x392w2yroxvkzoxopkh',
                name: '0xfwm9v4hldycy5dkdugzjjvppivac8s91q02t0l8co1x4alc5kkua8mdqdiav6u5iig1li7mo1pddq3t9ybamubuq4wn5mx0g1673yh9hzj85m5t8rj5060ri60ja6yllo9d9mjfjobiufv2yhuls5sdgdss61h',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'fz7omt8jorga2h5izjdsy77zdemt8fytfnnt858ea0pao589le9u8yi6hhrf6o5i4mbetgqbuazjgu180slb3p9mfla7czuali3n32xchi7w3g8neo5nin4vstozzknl61z20h1o69a9ij5cxagdou52t1fd32ls',
                flowComponent: 'jnwfcex3nru2sm6pzzy3nxuogactte4cso481neb2szom2x8bqn2q91mb72eg9k68o3yx4zz6za9bcd427cefuerad2r0263h9rf73mlz9fikzlv3pf1k5t8ly7hrwtcyov9dh9lds6qz2ser3jgcampw5mp495i',
                flowInterfaceName: 'w4i8xstetiog6f208v39vrsaj7cwpkphscschx6zx10ctos6jylr7oo00umo0zk1o7b0plaienj4vq1nqo8n1anp6vnz2exfpt5kii57x2rn6y7wg4pa4kkup1j36xib8ie9cpib2nvr88n85pkcay9r30pskg10',
                flowInterfaceNamespace: '1vpxp1j1w63129ae459utulyg6wm8qbcna4w4vm0sc9djjui55pn8najnzeejn26lh06kors8u2kivmg30r0m35j69mw6gp12er06w7uvjkbid54u2c8ut9dppmngq26hgkkxblyhd8yx07a4k46ynhc3j32cnpj',
                adapterType: 'x9su1g53lxn2zzywtdl8yle47w4k4llitm6olfcbiu4eorqiv0u4ws9lzagc',
                direction: 'RECEIVER',
                transportProtocol: '85hoj11hvvgkb6b8un8iclh4xzq5vmvfcqthir7xa8weizy0ai29p3enfilk',
                messageProtocol: 'sxwk2f77jpptt8p7livcj9z9xutukknr8t5bfuskk9n0yuh6spknc1udegz8',
                adapterEngineName: 'ktuak9mijzduruyafiieuhg4xiizxdalfmcbeizm4s85fa5uittb0k4r5sqctcu2xf1bo465bnisdvzg51fzsksqvoulmhz93j26dh4fuzs82oojczzhhgf88yn7josd7vl7sw9b7udx1mfk9n0amr0pzn61ryci',
                url: 'oqxp3g647l3ome44ayhoclww0zx0v0yxhx4zvkt2ktqgrv4ifd616er6jdw8ufpfrt2phgp9dghp550wygd0g2bg0dls7uc0wo5jsxz45dk248o9xz97pjscy03vrxmwwsj17lmwx3zhdwifvrmy0o4yniub7g398v15hzqydq9k72lspj4ycv1ae4xza72axu6z2szfzzlo11yh2xcr289m5av5eigqe0aqkaup6utjf9mtgltgx7hhkk5infso8nzlq597ocg6w8o1vaqhhjwvm8m00k0tf8aqilbn4wkx8xn02uz9wtoid9h5ey3t',
                username: 'c4ft9xz1m9ixkg2gb779n3pab0u97vvjgtzcsd3xghytda2xcb1k2gtq7m8f',
                remoteHost: '55ycry8ig3hcpcb6q2imkhw1trgltwod837ghd65vb3kz3veiq99c1oft006q2lrvyxpw1c5uslamz6wzpfkypuc9lz704jgfh4ud612vo5q7n6rk9cmejrwtukygxc4uo5fbqqztqiwzv0tnte7j7kvjx1yl15o',
                remotePort: -9,
                directory: 'xe2ix9imx66e6xq8pe6fj7io0m11ilt6v7yx8awig46l58ddwz29iuncizhp2gvplhuxtsn0nxrvpko26s4f5fsj89d0oa7eyar3fzgb5qful13gy4y4t9g2egz9o4dtjxvfdu9q9u018da1fmq0ikxlahrxf785kbmtnth5jpqrsvhdyue3gj5vp2wosbaabp5d3onjxoafy41oqggdxodlryp2u8zjbhvkwgzdn7lmv6b15wkxjb2xzkkf8fsrj52vr4ombsxgfosx0usiu1yci3pd2gllsg8up4o8rn4ve840g9m1dlfbrwxm2f60fxz28lst3pu07fy942pyyfr7gp26lhnfespqh887llen2b7cbd8vld4rko7oesf3uh5hm2911m38v1mpybrsr7fv61h1jzz17x22dklq4ycuwbt4b3tdlcrkqlhvxov29d8u60pdqb9p20pgo8ihba3nj5asyxutqzdark95zdk1s5ybqm9ntoraxbnp6zvyyup6oc3jsmxqlovrvahjevn91fu9i6m7h15ls00g2yyp671t4mc4spgygc18cyr81p8b28t0676yq7wbomgnqn15uts9g6vrr6usl0eypit38ua7hurncjbd1rx1l9ehp65vgeh1sjmq29ov4q80l6w71ayvjcw7balqc8vhppgc36ijowbtktogtsrcw3uyv8quv0ewo48mz7qls3vrmbg2sdj36e1dhcy8xn1inxi7uvd0koup0e9jxc6r9nwafxfq6nqc8pwhd9e7buvb07bq9g5rxcw64lzjg9rohxvntt1wc33od8ghf28jugwn2naxjz81qv9vuxkqnr6hcitw6u4ohxm33juo361y391wuorpo7hatcbs9ucf6awwmuu2yo4pxaeqcmqaojwgtlaevifdqntls156c8fe9emg1wwpxtis2ib7s495ix4ga19b2kifnjf4oy9j15qaa6yctmm2l3kpoa96euvsi1n545etjjsmjlzuzhk7hhjj',
                fileSchema: 'mzj7v7p03gbvqgvtm0in0rd4yc4ut6m89k9u0zouq1zjp5agrer3hwk821dwnfh108ggx2qo54tccld6piud3nwsnkzguly4ulabscwmuaqmsbfbmniyh02cwkghxcagxkqgntzwpv3j0aw6rct2orndp611knrda1kz9evtmk464awfhw4b063g3q6kzy1ipy6uh8n7xcsiom2f8rrob7la6w2g9fjwcrh0bvmcbun5r5tmu3oe0o8jel8le4s0d8s597l6pqdu9bc38mi2u08o9xc9i1an1bldzlc3pmzuxbo5bzh9hhhwtgfn4r7bfjhj6hfggtucw3zxns74vppn7xc8r14h4yc1icav5ek6s4bghobog27sw6xws0dasjxlrhhy6p430f89xmm7fww0n5gvvgsu9q60wnfk1w0ra90jcfwcb26nkk7pc7d7rscx9037867iuoni7y550w8gf16zmzxxldc38x67zxvz73jyfyv12vmbrliu4aoo544m3essvxn4934rqlzj27d6ocuvb9vlsn0le4n8k92blucv20ah3hlpc6loc2e5txs98i3gqf82gshxt8f2z7fb8e4q4zt2z8kclm67ouqdm4jfn6dxtp6ugg9wgo5gupdodehj1i02ghlor1q01qrqqh01wvm2393yd0hf6rhkp9awb4dvscvzfzm0qb857nmnjpdxe23q5g38iyz85gie6yc3dskndkw2qt409kqh3mrvyiekx0v15dh1klzvpiscwz2f3wcuna6ols9f4vijv32yghy79f3t0mlfa7oqvykv2ohe9xiz3cfr2yw5rz25byn35gdlz0blbhchssm1s9qjbztyg5uqhjh49frlve0tdxjzbaudi6g8wxy7q28cwy7giy9y83u5kfhbqayo4n77zurovwu3n4kx5i5fy6rntlrk11fn9zcccqr7iw6icry6zkg6mexui1at6kbtv0otpuqr5d7sbd6iophrjm41jqv7hvu6we38lz7u',
                proxyHost: 'xmvw9jtp81jelhia7a9dbct3p421a5839u6gqvxummcbtiw04kk7udbbtj8m',
                proxyPort: 8798627839,
                destination: 'lq2osvp5fxflqqlcufwoh0zdvynt96bprx6jcso7qm8h5bcankv8ezqhnvfjgrjfn9695qa62gf26jpb5jf9ku0sui45t2py79wccz700z1ntz3nwc0fd2poucxmyy96y92gbdm2q8nqzryah1yu3vbf0emf4bgz',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '18t5qhctnhj8rdbiok53h6s0pka61pxvc6q2iqt0vkn3p5hfrmj91wy331zzjxsa2a428qaeqtrw87n270sn1gkj88vibjj7ci6rsah47yv8oaxgwzciwl7lwrzhksepi28sr7xveg0khv0r6p2plxzsm5pu3a2v',
                responsibleUserAccountName: '1m2y4lhnbvtb1eypk1ih',
                lastChangeUserAccount: 'be3f4blyxehzmzj71jm2',
                lastChangedAt: '2020-07-27 05:04:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelRemotePort must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyPort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'js26gi0mkcye2o4x3fon3lpwvwm53tt4w5cldet5jcyn2c9yvh',
                version: 'f68aslkoifzdgi3eqsxq',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'ykgwv7ja6288jy5d6ljwkc6xsbtsic1xkqxntygggiznzniaihu5huqb2qunyv9h8046d02yzf5aliikkkma9k79o9dg74lt4so2iflxh3p324p72tmqsnsbl7j6aojzh0icn8sk2nd9aciaczc1z8dh5divg4ah',
                component: 'efu5znyarl2268sio2rdfz1j74iawusuwxt2pk807omiaemzp6ta2amlbdlwrwa8pike9hqd3gr7g8nn0i2j2pukeojcx2i9bun2xnjpdmut8hw2cn7cn7znhxro3flcr12z271wt4lefmlk1413c462h3tb0y89',
                name: '25caiy8oj5h9mlk4zvbx1pw235v29fhw2uzwtfrnduy96t18lwts90nhs374et3i4lkr7yv7hloxti0d0d4njcxinhnnaz3ug1umwt9xyz8wmq7cwww9xrq51bvepfi351pg7be3kr8gz2kmfbabo0fyfvgb41fu',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'hfb9cswlddry9j9f1pvydji0dx1048h4jemo7gdgmx5nj3nv5wsy71kzx980lj76ohlei95npclyfolx84dd0pw88feoxjal0j0ay1um3ogqgpn017t9czb7edy6ms43jwh4jda1svl276ox6yiknpgxvtiu0xmf',
                flowComponent: 'ocn4pgye4z7nyhj0u3vr1564cir8k8j0saj1lp4yhmia2eq6sdr2d4ig9barj91ul5zrcdwde38d5gv5lj4zxjjql3acmqt793tnpybc4q1lm58p1t680ns3ygxk9gjy46am78zd94f981zcwr8whqfv8lhrjk89',
                flowInterfaceName: 'gmso4qh8028q26y84e2lmxugadv10hw97sa8br20h45n31edp3258gs8fxgs8uly26afnrk8us5v4c58rhbqbjf5qgdg924wcb4i3rrfxa5ax781bbr9vqwhc289n89jej83ookvt5n884ix4wv94zrplw8ef7id',
                flowInterfaceNamespace: '5j70h4qk1f586wxnasf6udme15woa24z19bqnyp8vb5tdskq1dpvm0wav4z4oj66pkcnn8n6jc5b6al86lgf12k6nmvf5jqcjerkb7yrvhw6done3f638jbaqu6rzehjgxnarq2txqqix5mpv7otttmpaqx8xwhr',
                adapterType: '9e205y55pqyt6usn3y22y5fhi8lyz8h4nfcm08wrgkvt84y6p8wuqn6sts2a',
                direction: 'RECEIVER',
                transportProtocol: 'lrhnxb42dj3kj8jwsirhlsdfwvs4fo7xhj6xfjq7e75tf3x41ui87ixp75ds',
                messageProtocol: '6uiltkixjqwubpszyo8ztw2xlsbozn54ot1ducz648i3hhkbycgmy9jnhu3i',
                adapterEngineName: '3xrtfjjcs3wzil4hqeyp11o61yzdo0cgg5u67meqqjjd321exuq5rk7rz02vvhj46brbi8uu2ww5ou73l2jzjjt7btdqd6fial2xe7yopbmfhsbaocq3ubibpsr1xncw9v96zs5td6bebtq2fkzc0adtv9xnqak7',
                url: 'o3ezes3ci1s7qv7qqb16idp3de6dik8xaqyf02fm90cid9cq8ysfcm534hqkr9e6gmqyz9p6blenqnp6anl8uoaua7tjhxbxukhnqs8xh5v90y3cr7v9f4nwkgxkgy3gaxodjfffzlmsbdwv97xmpjmle82ue6e1w2wx6ygtd4kgd8628hu1nhbv44gqq4ggpdd61z0fro80jiqrrn06goo47wei2627w2p93e961iajdk52411glophl3h0lz3g724qhgv6mpxqxrwtqwrklvc1w1lhl37b4ljv27vksoqxeg6mt8fqoheps9bdgff5',
                username: '0plgh9hjne6z9w75bzs0znpi8nu6w5rhqlca2al2test35wy5w3ziaiviyfe',
                remoteHost: '88ar2o9bdn8lx8xp9iyx5ou388mhrpomb60qlypbdzt3a2xp77y4ff1rmk4ieejzn9fve70lokik9ywou8xepwag5qu1l4j84d00h940jhntno1b9l7frpdn11hb70x0c16gnsrft0umdkbqz0f1xav9ssuctnzy',
                remotePort: 2714461906,
                directory: 'mfvy31py1gkbojk9nzikpnc9uc9w6wzmlfilv1anc10nzqi032ysl1v3x4yt3l0dpe7mwmc845d9l8xk480ai3rpq9yqrsvj7ihlh0nny1ahsn4285logmdy1gewrqabbzxqu78qfverqcpzbj0qkwvunk6ymb0yvo0j5zwliemn35a4ycsvfsf7y6z42gas384semyuq77ptmmth5turv3c78hy4km8v0ph9j2bz8jd31m0lgi6qdtsa3yttz7s67wka03de8xckgd98jjj2pwza16s0x1pc4p7q110eg6v5rmrql0f1lkoy9xtp2p7lk3twpjwf6day9sp2fe3tv7cdvvp9fx8xxoi4k0t8ispqtciiccrbtmc8p5xbl6o9i8abc50a2tsad5r65ja0sq3mnclbkiapchi3vmh2yqyhkhcuy0zbszy9l35g2bgbn2faa3azw99ixxsocj1yen9qev17bfb38yx6qnafj7lgfw07mipg1sm4m44r967dvnscz6hz29je2t37vngc4owf3uiuafzg0hnu1n0ox0ly4awdqhkvkw73obuab5ezp88pa4vac0xm9k58bqmz6stebo4dcoih15rw8i3o5kwiwfpg888p8x2rd3jgvzbpddoi2mbni1ipos3qb9tq2ffubr7a324eggwkbjwnuws5liey9omxxo775xdolljsjqv75f4m3migq60y9nknbvzgmhbk2wwrkh5tr5p4sfdvkg7ww6ohl4olljy0zpix6mtpfv9amhfr29bq3cqt3ijgfq4uaxderla993t3vpj33254a2az30419yfqyabs17cthdgdnobot1z0jgs7lskrhhw4e49wrp9dcideqbwon2m8veui0v9jge3gge326m8exh0wvie0tf1rcwzqm4djwbxlg76xc5xa9fn9ydxmxqp2umrz65ddvvevywf6e8b4lvyfbvsemol0hdhqjtj8a21zw4onytdqxmb81cdl0yixelf1x0ux1420q3q',
                fileSchema: '0esb2j5qif9cwzemi14su1p4hiqu92byqwlmsx7sahumdrbo8ymw1e6qoun3o9b1ejhxxaj00zqcxtn5vtl47pwxaigv0lx08gdwm3w7sftgjugxjqvs1o1zjrwyto5ygpwcp23fnwn7f56gxgv4d1yjixnvustjnixe6lqzdltojjpwwu27j1v5s28a56xtiw917b36rury6kgym897seoopmyf8kmxp2lhq2erpnlrmc4jnac3ifopgco10c6jlydue4e5bx5exmtjk5x1lgmowf4pl5uub7nkro9apkzpbdp0phr1qmjayk1fifhl4ydeyhhnqt3gxcadk4adgkiwqe5o5atzupryl2i6vo5txebwyw54pj7zqkgrqhh2ogs0q8jdtejl4ofkuyz9iziga9z61t9pwjrwqef9dzdm4461l0t22pf429wwjg2kap12z4tb7y44x7m3vtldw5emw1h41mdqy5xt4zao0ru325acq8vjjg6snd0gzrf5h0zdyz2pd5nrtsipet6fgabi1dgdoc5ndoedc8mrhtuas7dps1kbvjfe1az5xei7iq736p05wxfr6q551rhsnma72ie9f9ick6f3lz52b7px6zhx5k3ivi09qt29mztzgoyh9gkukwor4xrjdqhm4x12r2dzxkpjvylzx5uq6w83ggaq1vzg2cidj82d9yiwadge4m7h7lwkg1mm39ysn84tdnos7zwxzllfimuegt02eleot0hff3se6o14hsg44v9shnw6yn5lyvwvoiz77u54tas0hzifkf0rykem6enhuydbc1aightcinszcgajgbukpojagn5hxkmmnytfezg0tal6srtyszbnpc8l66a5btb9zm4u8k6cz2rl949dxgahaojwkr5ehpc26x59hfe153bx2snlqm3k9p97ca8mcd6g5wxqw7rlq5n75oana6ia4d8u2yi83apjcs0sdgw92izfdibypvklargu9f10s9xq2jb8iy8rh0igft09',
                proxyHost: 'oi618270xje2tjpt0y1ewmuilbvk4zbyrwakilqmzhpx3xe7xnjtrafe6yh1',
                proxyPort: -9,
                destination: 'pkx7qtbn7k22cp4ua8bac0v3rxvaiv836xvuu6y22yy6vwx2c72zxinva2j5yq062kkmdhs7iz2oluqlktn4eq3hzl6mflcwmydyvkbaff7lgy8wq89m1ecud3hlyo3j7md1t6ye7nom6m49wf2bse1rgdlq5k0v',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'oud9kwhtu7n9xsn81nswnr7u6ljqk1las3r80l4vdz2850p46b816899pd1dwym2s7ixdfhyjfb8365r8bdhl2jjm7h94hesankqa0yp3dgmurnbijtbqivo3azerdj9ba6q95ntzlnkxy09a0lugg3q7ja7vvn6',
                responsibleUserAccountName: 'oe9skl42k8nfaaptvg0r',
                lastChangeUserAccount: 'fv1nlz21x1jgkyj2m00f',
                lastChangedAt: '2020-07-27 16:06:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelProxyPort must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection has to be a enum option of SENDER, RECEIVER`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: '04cd07lvvex4hbapbjqikd5inx415ju4qupb6959ogaz21xbw4',
                version: '88wztgr56105tpcvde2r',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'vuplsi06zz0im7nmbm28ftczml8mn6509093302mihmxd21ojubmfp9tx7pe2evdsxrcy4a75h5akigvc5yf61r87uc8zltuhvfj5q5lz3hylimnwn293mpuftpbhvfc3ekd3z395klf3y76dxey3xlws4qdkyc5',
                component: 'dzbz7o6vth4ijhnym3dtoyx1wm9ru3mjnyy0jxrn1e7wkz0l5wwlm08ptw61x748ifbaiewksgixfe07l85b8jnqp6jft1wpc9zo5grh9bcuc49lcol5i8mzlsvarnj7nqdoq63cc03sq5m95mh35r94goz24brz',
                name: 'wtebr1lo22en8f5nbgvqtn16okndc4dsv866xtf9l9eewh78rd17ur37btj7pdeuwha7lqnuns4954o942q72edwawkc52wrrksmh1hc4plqnxzujwq9fiemk696zxjdxuooc3p0sbbwdy1675tbg5763iag0pl4',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 't6qj95eotrnimzy9bqiy4qcaz5n1p3vopjvi4bfkwzkvc1u6rqx4u6zpo3qbexquetilkonlss20yt13djuevmb5yav9dxfy34cnpggx6xtoc8jwy8qn5apztk3u5f3hunx84o4d49s6ugy7bi2sujb7yc1enpn5',
                flowComponent: 'c8woh8s0wd4vjnynqqhpf78jfd59ekrxgqt6iashhkzm63dbi0rmjnla69dohmyvva68rxjmjr8gds3woo1flq76gzl9yrq2l6690djw8qzslpuq3qlrzmuw8rl05iez0dchsr1kvcs4sx5g7v9pzb06wdfkur0g',
                flowInterfaceName: 'y1ckb953vpj6ohvm13dbyjzo77dfgl68hocv8n83dlio48ttklcw24s5axke459hxpoj0n7q1h8rhy6z7p8sjr9r150lrk9rajg0puo408e13l6gleug6qdf8fa25akcd1wf8z7rlxo8q6mhutld8xnf7xnj3vhs',
                flowInterfaceNamespace: '15hyomo3eyc5sngggs08skowkxickxeiyp1qc78m1htz2eg13tqka32ds7wznrajncaf5tf3ujhz34vop3yudljpvf6fgt8nkczpinfj6h41oo3tacro2ydyvek07nmkfpu6b9bkxace7cqreri2gpe68b5nh3to',
                adapterType: 'nllxxm2pkc85b6us7djfw7gt70weig636jzyndxxrd274oyfcgy9vo53sa8d',
                direction: 'XXXX',
                transportProtocol: 'slh4yl428lq8j0wcfwt5298lxmxfii5lcfv8rts8irtuwfda7rihtkk6isak',
                messageProtocol: '93p963ce00lbuugy18feolegysvi5qepwwqpiagg67xr11pcbds4xytm4z7u',
                adapterEngineName: 'j5c49kgi1jd157sdsvuj62kibh0zi0vbj6v919j9ij614iy53v6k0wvxsqh0dxdjh58p5tjkbjidqtprf00bgh3sq8o557zjrtahzkdhj3cyxazelqhay4ijabrxayqlla8wei2fsp2lkiumnbmrdghko2of85fk',
                url: 'qigkjoyugqtqzseapiivfslco8ipade959z3i8izzzgt99bfs2ergay4wegvcz6gsbx2d70ufsl8n8cjfa01w1m2a13vnxztr6h4mctdoph8xycmrit701vc64bbdczcmdqywgit6o2jue9aod4guhn909owzszxuxlocvpfnhuq7g9p0ubrtcb0ic9bg3wvl7vva01nz9fiuvkd1rcvddqeuih9sg37jdlt9sdsn035klhxn73ml82htcgcouu4lz8e438u7zg0ws87nbrbdmyi7tsqrfsi90ij7415fhv0qwj2kk7pap82dst6pmiw',
                username: 'wnfpzeapsrbe19wibf0r727gun51y5d5bngtrj9jgstgfprcol4ifybipv8h',
                remoteHost: '0p124yj739wm5ph9i8vijiigmdhgff59bgch12jnpne588j5w0qzc47pykhtilf3d6497udzfkltkjlmkwxd1vz6oaajnohvbiank7vayltb0edel4eskl919uttgi4sugjiculmf2dmbls9v2kvxh7n2d0mpshv',
                remotePort: 9833120933,
                directory: 'glucri8gb09z3jr1r43zprx6l5y88a14rzz6beer0rkslq7kzjzrbllujk7z4d1kn6z5l45f8om1ypd7by5zrb8v1nhpx7x48nsc5poo6vc8x2s9nquxptlwiafk7wt1hiywxx1cmfvtea38qf5h6ufwbj9qdrt8mju9q98ezeoyjl3a0hhus5r81dn305l064a5aiu8sgti5vsus4x5m97ltbftc6hbdu5bpduwevpqcm9f74qhvzwjhvhbf9mg4nsoy2p3g07ocafje7fkwu3wbjx39bijpnekpyb101tiqjl13bw9ob10aio8th2t3gzx8se0ob1vgh2rzs51njvp2f1x3t47ttu38mm5ubwbcgc1e1kxcfv99i8muwiwwnkq8xgmos71klrn1bxhwt3tbgn48fxpg0g6evfxy7yb900578j88qonb56ou23qvsgr7fs3vb513t28nfnzxej37epkl24jocibxvvwf3dln31njbqsxxy9oubbicl4u8eo9ktu4v3bbt9wcobueby7lcmjpedjd13aefyri5uxhi78dx0z3pkwkbd0b942abz0de7sx9mbx65pv98rwhgttl8y1eyupinaqkn0pyx9c25n9fgjj3j2ba4r95qa8wuurkgterbduapvk5gwbvzxlfbnvd39a5jcg0sqwnx5bpskkzktylks50nf8gkc1avt61azlwkr2aa0mo8mr7gs6doxcjanu8nrd1og5s07calj392bqw3uqdjis6cow6ttmro3ksdrv98eee06a5g3ycg6u5z30io89vf6mv27gcwpld1raebnuhr6pf2ob57wu4wayg5vo8yczmeqwlu84edqqxoh445pkdp9gm3131h2sfyhdmkw8gmgvh9c859rz4hvk96w417tyhzsi9v82po1dw9ynl4d0w1fttvg2ocsf437bf7j54lzbs2wnynhhi4bihofcqh7id0t0gs55zztwyunctrevk2wnm26zkl3sfkeslt4ries18nd',
                fileSchema: 'h8n2q0x6w9co61t48a065gf34yz2cs806rye66r2zfbbpb86rk3sb153agkh4dijkmz0quhdttpjxjcd6ojdw1uq9u48bqd9fbg6oln2tcvrl29f4xi8vf0obvbmf2gnkf4wixm00krbswnrqprfvuxhfkhyzrfyjrpb3k79c5to7n5m4b4qonab3ia916avu87z2pz8naxdbnpaiivl4nlnqflmpcu4lj832zrv6d9tpa1vfi6vgcshhnwd8wl6j0ecwa50ehfxpzehhlsr9hfgwjgad0410hcnt5mdbjxjaykehrddy2s70ee6iu9sb5opwociguwsz84qu2f66jfp8hc3wbzljogys5xe85lht0opfletyq8gsq3mfvwtht93q3mofun8xks2ew00fxi4xgk8ffg6zbbs2izyexf33x4vk2t4kk17hvxi3hn6l0gl29acaj9yk8vlxpxbxxc1npc2a8pnnk0h08kpkhpf65q8kjp4bn0hdafeo0z4ik9rc9taxcxflukvhcg8u459z2q9t0bbkenb0rtbblugdihd08y2t7vim8431uq5gzv3ns3fisca5uncu7yhsny6ghoyd4zb9om0mlslno7gepqov4zdxi1xymcvslhjs0uwa3wau2mabfzq5rmpwbdcci5o05z0yuhyzafnmu8uuwfyou7qeyl7yb5n9mqjp1q0wv47tc25p6xoqcpumc8sb9cpkzi5ncg23jjtr9k0ap63g89yu1xeklk7vmg5zjdqgrjd5myegs1lyjkfpw0bl2ccba2piji6jy8ahgph2f0ejaa96ptjrual4b34ab0j2k8kkt5kuksyfkbemk5awgsfpp9shewiiujdejftou1g006js7anqey9inrklkh31u9kjiz4v24h41f9zd50d3er0pwy2zuf679g9e6jxzc17pr5p4cn5gd3auuflm7hexrcbqx4b385tup9rf5p9rwfbh838bou8tdfuovvalnm7xx16b5yrn30m4co',
                proxyHost: '46920kz26s4oiq8gw9xzj98nouqpnrylnomc2yl65fvshuvcuzefd3ui099w',
                proxyPort: 2075198616,
                destination: 'u9y9ijpw5gwaturxz4nmb3rlsf4r5evqhcjj8m26o5iehyqkvzmfwci0x1wn4vmipn8pvqj4tin479wc0bs4o558pl2ipmf9932gzxn3iqo1m6bnabd6hxyr2p58vbpdhwfdn62cuwz43a7lcou96gv8p9uu9ncg',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'rofd1uxqmlafr5docbwws7cu0qwtk8v1sx0m011zppgbfsdx08mv6ddss59x67h43ypz4h1tljug3alz4lmgav2rjnw6lyc1ntd43htm24xf1pab70pzo3ugr1p7quakfe358xf9q8gm87zz97ylhdlaakdk4ens',
                responsibleUserAccountName: 'hxqegbmd2yveteztk03g',
                lastChangeUserAccount: 'o9zmw5t9kiuxff3u3sfx',
                lastChangedAt: '2020-07-27 15:57:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection has to be any of this options: SENDER, RECEIVER');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus has to be a enum option of ACTIVE, INACTIVE`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'fwo38f8oqd2hxkb33x3upl5l8058xxas5b02oinmvq0jnrstlk',
                version: 'rwtno4lwr0abkfel5gjb',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'qvx2nptzg5delz05289lr4bqw2eugv54iv5dh003nxxv60drxrk325nxeb97r41vz0tt3tq6yyochl7w4ikgqkh37rjscqfry2a9a29qcl0nte3m5oy2uq0t54xc8zk3d67spx7i5tf1w7d5kc7m7gen6erhsai0',
                component: 'gvun76jym5uushq0vjnicukq8vnms2z4aqegn53mdng0an2931uo2dsvxx35ez04iq8oillmzzirwu2t618ah64sqzgqn1xzxxakdw126zh68ilat37ol21q9o4ke27rmlh98ucc5n7hbq14m2ns5k3cd5lwilks',
                name: 'm0pp66ddw8285r8si51guucs3agwiky53gfruflr94t0k8h4l0tpg3d7jnxpdamhril8h4jkzozmy41jyoqjwxbskupni1lxde0r4xfselki5b99x5z4qxrrdq8lyqtdrdvxpft6o0i24e66l5u07vvpo30kgpdn',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: '72gk3nij7qh0cy7x488winvlse8rl1vwg6c0ej35f9q5qaxhxpl4e8podlv2ra5sm7ws5q2x6ec0ul35itfiawmebhi39e8iwuf1xh16vq4tp7x959av9l4taivti0kl56p1sa3j79te7ko2ifnhg2xdnq7akdyu',
                flowComponent: 'chbxa496jdwvat1amfx03o75iaup2tffymg2h75m1hdeypphf48i2k9acudrazrq76emecdfp3nqau00og8abbv4zkvjijy58mbxnljtgkdqmupv8h5ll6iydr0pvki4cicjyeqd8ur2a76dd5qqqxyqa2saohvr',
                flowInterfaceName: 'envpqi05opyp6ae0wsgwoyikes9ra6tp7uwdj3jfqgtnnew9ybok3wc86yfc0jrg1qzif632mlmbjf3bq5jcfetp425rx9m51bc1uk5ajwpz991kf8whv9cfewa04h6p6mzcz0uk9kpaeug4skmsqf9plx58k40n',
                flowInterfaceNamespace: 'vxtmwi73q3ewwsh2ra6ewsf64tj9ruo4plimnqnw3zd3q09eq010yrb73ezsuunub27ij2a9kol6vuusq7yckr4zth3fdvr18p9ukphhry50ikvyl200uzgxev0uhhbmu44ru9rvnwfq7ci49ngnhl8wt44ytofq',
                adapterType: 'y81rcwi0t9p02th1ag0ujdy6zkicwm6dgna0avp6h4iympty1qippnl2dikx',
                direction: 'SENDER',
                transportProtocol: 'rmx6xlx5ipn3kgzu4vm9s87vjh462vvlycpz5uy84bcg756m2vz1bviiwap4',
                messageProtocol: 'xcu2d6u7bdbdmxn61mug3bqt275bwtn4y45pjw7bvi8kve68mp9gdjx9bv26',
                adapterEngineName: 'l7cqvwswr5whb3dr1yhi8u7t5k1d3gms05zn9b1fz9ieyjgqc3ka7r5ech5g742fwrxb0y1xypjrnmxt5t7xl62mnbiav5aprls4ru1wf47y3nl31eh0ibzsj7n66acl0jf86jswppoqvi267tuu4ovavc2eiciw',
                url: '83ed9c2e3muzu947wqmiq85t94g7t6n4z53eyvmcob64uh20mk5cgkjfohyn2k5q4k2qemj45bb17tzv19a5twb4nll0fb1nfekjecb5t7e5msx8penjh2da1przyxeum3r3z8jp7em8yg294qsdmssss5ix039ux5xb3bepixfcj7axz3a0dnyt98jiiwmmnuzm7miedqkgurslb3rigtmehvv0f6eseo5aljsiwy95qfvwgd7gt2tmv77a0wjz0j7b77tg3cvcre3aw67orhclpu1tp3jaeu63c9jq3ixrnsu5ljhiywa3v8v20yt3',
                username: 'jktv4rrfs4a9cwwvxmlyvtn0t2nmwaqstyz7h0okksxs3wn81k6xsnafva1u',
                remoteHost: 'tlefysc019wgphczyv4hhpd2d16ynlyqx2a5y6p7cinootmnv80kl30nab7v8cwostpnnixitzjxshxcodxzyzsnlhozskka6rl0v3f3mz5oji2m1lsb33akgnbabdd1nkili2aohonmb0x8rhy16x3w5kazx46z',
                remotePort: 9620034475,
                directory: 'gkcp38vq00o32m0irmnkcuuadkrdfhru7sxxmdwq5mfj0eg5bjtxx8ma00r1bhk2e2vpfab77z77ozybvq5kv1raqs1804uchc29dwkgorun4k8764wm98vcgsimad00igw3mxa03r174q0xm2ixnwjuiojntkhrlswkh43h9j7cj5s7i57pub9jto7ssgor8fktrtuacgb5vqnez7jqyk6n3ht9y4blx32ukuii7gtfdio2kfc4vkrkb4mwwori59gedpluyvsc858tyecoxq98c7bvs5f5i65dnjgp7f2tvtkigiwz7mt5rwkj7d33102yi856m4ademcjlsdf5cl4brvhpo4vnop1dl2fezv0g918pm4ngt9xocfpp8fzv540s1bhsvggz2b3chgdlaj2nnhduprnevzj7u0s5hjeh9p4m91bq5ew9boi61cneoklri5ts8uepwpa2s101k2h5p900kvdg8fropjm7sc789jmufr8f2i9qfzgwxclutmay6m49dmhungd2on0v57zosz0xky5ul1npt0xujkht9d750y3snw1925cyc64yq0pudh95ykjqobooboxhjhv0vr6zte4k2xhguwznxr17lrpsw43yhkcrmyuiuz9gl914ypmc1vxf40lokh3jshi3rw2ibqa8jf3zvfqiys4kcuxsx8iji4xk5ge2sabj9kevgykfxqmx3lbp92nx08t39i4zdxppr03jdl5nh22wob1qrj4mk02jpoy4zoexvpz00h7ibktmjofhkrapgnv9ssyk0mfick8z9trjy1srzkxjzfyoob6096bi6vzotvt9wms8x398j63x8gq3v0t5a2ep82a1005p8xek7zy47iei5ajjtye4mxdsxxxaqh5rl0oq36g7u9rs66q1d2nzt0apgp206af73a3fh5gy2cbosbem6ryajghjjqwzamupeb1olllhiuw3dd05j539g31agsrx53ystvswbjdqjc8q2cllcdepn94gr2s',
                fileSchema: 'xgzbb39js8fd9dzad9cb6z0t5w1pscn1xraoj7gbnkhpmykrfimf58vax86pbwut49p8wf1nnxb3ijob9e3oxh7jx0x4um0d5a5yibnzr5jkjx6fejisb27lp81g76pg8gbnbpqq45pqodcywp27havwpqgbxo1jmr6bahv9xz36zjlf9kvlxsuyrz7r4zwvh9qfygntz2sbzpl6xnw48f1zarq6ba9f9gbtudt2d6wyz5ythuv5wjc4o2vcm7lcuwhdlhwypcgowocfr3zfydzm8ddv18t8pd6933fa4qsyah7ouqh45x9l6i7nbkwuzlneq0mx8cl7e8ud7uk1rxxvsgetqgiequq01b3zzvv5khl0xlc7392vrh8a17zlc48g46a9v5d2vy4ermo4elg05155ovn4awpjfyn4r7extso91i9u2eq6t3qlbla5htc6n6awla0b1zf7n56o5ukmf8swba8i6ehttvca57918ttfmhhhogrefu0exv03oq7yxjkt381rbbckvicvykgcqzx3b1mjxgl1obanbw76ulkgzvqziuvbw2uk6qo86re9rbcatwm0u8px7tsqcr7s43exj599ejzjvcrdjh5cjeqh9apkk3bfpe8jglcb0vv3cra8sdkro63kic7g5ok9r0w27xrbqoznijol7f9qdvcbu14686on4k6qlb183ikurdngc7mc0alcn3x938ulqmw5o96uf8uri7py2m01lb8reejzhyvmx4sil0p2v4f19j3vdoj7z5ylixytwsfs0s9uslo8v4ez8h26l3wk6k6ntpdypub2p8i6h2c5qbu44luycg341slsfpt7mugwkdthgbfxc94h6xn2ezqaj52fewudxrrtb375c3hbrn5pb9149emm6oz0k5x1maf2ypl4j812joywlwy65zxuv3tb15i6nbqe0yf6vk3p8jsm3ld8bmud88cfnbgrq7nz8znevb36em7wspyr04ei7jyl1li8aqlxci81f4ik',
                proxyHost: 'is1rydbfw7kyq6laf03oq2bn57jlph2303znio53fikh5yaiv32jnjfqsacp',
                proxyPort: 5251527967,
                destination: 'q6wqlv03krgsqzy9zjrcnjta0ugernx3ma7i1nc82demed1ewwzo00i46uk6s7f9vdxv4n9g5uh4qlhwjtz6slth7xsxxg9oj9xoh5jgr0w8ylji0bqsl1ilkbgq0j0mfpkx5t1z7qsduex77yiihg7npaw8ulgr',
                adapterStatus: 'XXXX',
                softwareComponentName: 'f4djicgll1dk47qisoktkrxf7v7vgecaii2ao011bi7c9lmxqv63ct8uu1byrw748f4u2cr5yw817fb7tcn7pzrivflak5o8dn6cizobh78y9chxjyftosw89lghjwgwhwix531u5geukvnsfjp4hrc8rex8jk0g',
                responsibleUserAccountName: 'qrhyugr00tj5ugwtq1kv',
                lastChangeUserAccount: 'jvddei1r2h7190g0gndy',
                lastChangedAt: '2020-07-26 20:37:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus has to be any of this options: ACTIVE, INACTIVE');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: 'muaq9avb5yb6tkkyathpv0iy25p778inlwjrmo3ve1tyl2g4ec',
                version: 'zy72c70sahz23iuo76ur',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'hh62kuwmrixmegx139pv0x2gnzvdp6twta2yifkcvx1hcsyzj8a6msw9z03dufalqut2d31pckpna3ymqik24awvgiorhgo12poo69pquqeerkfmm9vj86qgitfsne28pbkwhkcs4wv71iff6lik4u818qu32mz9',
                component: '67c4jcd4kpqmios2h17gvz16br0ufr9129pmg4fnvprmvh7lyg7awiuenjce1woqjwykr40jgw85ece6yu0lvka8sqfo4gwjtrz8guagv0ozfczazuq58ntinlmu6clly5o83v64ui810u9qzcs7cwhhbv4r1erg',
                name: 'iidh1tknt3vnc8relj3qlct9t2eghni7qkgvrlixip9212t6dl212m7hls615qkjm16fe7q6ujl87prjbp1t0byzmqf64nr5p8t5j93bmnbbsn5po0diky30swjw67c3srvgq2wlxh435yybuq3eq9zav1z872qj',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: '8kxaqc6p6awe3knigx8v355apf2oem4sf13ewrwzt06bkfvfxo3h2zna4u1fmc8r788p4fhcjwrki9e33bppsioko2pkkt69krtv1h6d1num2nreimp82pprpelhovq6q7msge7hbjt7vfge18t3k8lypupsg850',
                flowComponent: 'gjtct73nwmxvhp0r4o7nsz54apfqi563974718k81lwx09gjmxz1b9ydfwr5bx8nofb1a6nc495k9jhzpedpqiz44ape124315cs6p4346vvfbj2wib9qzfpl726i5fyc8drclmxfm5tf3n3y7ah9wvjwxi239np',
                flowInterfaceName: 'eieyhj9yie351jzhrd8iqbxzx1sslohzx7dtzh3d5pqqpaamtyrr4vd2nvowpzl2hjpghlidfid2ygror9ci7256t4cslhu5166pi56162t4xjurml53vquryf4vfwm090bob2ghwsr67ku2c6p1u01fw5rljpkk',
                flowInterfaceNamespace: '1f57ujycgvdpoexnrxiqc1jz6amqizas89ssxqagr6c6spg9syqdxj7epa8fsnsoe7egza1w8h8w0cgfrs8ye4adlb66s48gvjbwctrrbmtbbmeis4lzgfht04pxoz649du8j73dp9eocm24uzdr4h9ilmcxmqqh',
                adapterType: 'yn4flvt05ppc20i59ubu5p5abecmfk32t6b5e6rwu9952by45m27m3vs59fm',
                direction: 'RECEIVER',
                transportProtocol: 'oq2tvly15ikwudl4oi6zmmf5t4gd6n7c40zzink33179fz1s3l2brmmj5yle',
                messageProtocol: 'mkzgxutssbcz23ao8ukewuyl3sev5wrm64vtp7giyizy57wrz8upfwjz5ahf',
                adapterEngineName: 'muzenew1foc9gxyz6r26z7oruydg8uzqye73pz1bw26dod84gbcfz7b9naqz5ovwjfs575v0i7txexjlvmnpdvuvbmbpl9vltxrv5b5gnpzursigxotoluj1id7my8k68m9r347ud0s74pta6wo7x9t4x1dajbmm',
                url: 'efia8n6cyu4woopsi66ft5zj825g6nl5l44204zkcks5btydkfx50ajew5o1r2jiuot56bbv77ckd8l6u5kq7nomacq3bnaqt7fuahbuwwsidu42k6v6uluola178psqq52w5f0kqtt31gdtwlixjyoae0l70k7m0e4uc7gdzd6quvt80gvpmibeat96vqj0qsv9y9wal08l2ezbzd1e53b5t5kchkj3vp5leelnd4izq4h87ebgrwy16bhwztdtg78xca8pjyp47b3id6sxrd3ar3ktg0p7q21dbpanl0e6omtmxmir0r2sv590biux',
                username: 'yzkkm3d1llu6h29rgpwuiykb4s83y0rl7pyld3c7gf0e135qhfc067zrnv4u',
                remoteHost: 'n7a14bf85pk6s6lswka59fgilsa90g9sla2ffcm3xur9zdvmuc59dmxfpzsxhh1chm1ymut80hqhdcq3ybktic8r6v7htlvyc216kj1tiw54z9jztzdadomlcjw8wgd4lvpj24fpzcgu0isc2a40td4tiangz1nh',
                remotePort: 5137365254,
                directory: '2p0a47g3lsl2jbc8qkwik3wodkkyvvw1tt11ugu8hnj182cyjlefmi2rjp4qsqlo1u0ck8j5ej3zn43ztrbbs4qw2wsfg5vqgwg06jnwu0tw91ci5bmcuvf9agfjf73wkjpqwohynmq3d57vrfrfxsi7m4seyro2mx0lqhb1sq6mqqyk01k6w3mt659lsxcyi0xyzgb0jfe7hplo3amhe14que26z9j4vj07hvivox8ua31k28q0kw7sphg60fnfd0kiq47rzow7mn6sxc86j5eqlz9gz55l4jbngc4wvtxgnftztuycuxr6ctldk3xgvu8769jwefk2osucdogmd6liuhhlrcsv0fhxvb8z1z6r89i3eebirp70w865cfrzia3adfzmw5xp32nbmltdslhxlwbvvw8yea2xu5mdahsliqs1uxbd9cnymj4739qqcfadb1qsmsou5onhln99u8jwohbzklf6qovj61zevkcu0p0qim9laaafblmawonk3mtq4fsu89fv78ta5ajwmr33re4muskpiung1mlntgdm5nk3xm83fiki9rtkzh1uudoebtu03e94ankxre2akxy3oqps9r978kayuwk2rtcznvi4gkjc3rcnv9pic0aexutpxr8l8jmbvq0rdhsgentdesipn1hko06f2dn72rxmjlmb92u8zw8dix689lfxw06tnmhtfkeebp3oxe66l98fz8ey0b95r6zjt9ive24j5d8npt6aiy9trmkouetk995a6hur7a50r67htp89mfdtmy2ylhz30o2jucrxopa2n7f2tp0yf09ks3koeb6fk6gs1s9td15mtfglo4q01ktpehov4nkjq4z5il1n9fzv1loa8j2b99yryfe6yn96gp12a04au0mqwjisdqac75ivt9zjov7d51424orlj498runxsdeffl8adddaxt40sw1qbosgqd9ybm6a27t8gedygzuraydrcllqkncqxtairrjtdt2bni1ytpuoyfhe',
                fileSchema: 'srhzv5cj9i6k1qug7flk9vcuekxvcnwyqe1gjs44q0oewe25iqivcnqcln8up8i6osh2c3zid0n94d9pgu4nf6lv7qxoog1qskxyaygc8rk0h319xpe87cj97qumro889sx3tjlrf5dj2zlxij8fk30a5n1haric0cxykcn7rbjhoytw3tnh49l2ttqwhon14puymw2hsaks5k5pcly99oiaxz7s08amxbdb3i0m7cqqsu117d6r8v7i3vb6puuqrzvfbhke5fm0r7tg6d6w1qeatxysgqfvgcsaqik1j8yex2rqlhemu1e3u244ksh2r00a82unfgup4lf8y9ljm2pe1xgl69w6g4e96h3jhab8op58s2xx7goln9d5s2nh6af25r9bd6wyf9vntuf4j91xv1uopcd4k1o27zrimd8lsd5wt59igbuvqkv9aatqolrt41kaj74vssxn9dkgarp5ledrvzhfl9c918rthzk6qn6mpvwfymjx7bzdvc1wf6nw63xr2zpetc8segy3gy08eqajehde83ls7zyr32eo8nm6qrkarwgxjnyy9t74tmjsiq2xf36t0ds726xmvekb26wx2osrialolv5icq78zkqp0qh0trakztl8znr3yqyfb0wasn8ah9v65zoj7c8rbj6qj76s7upzled0anqgofse4st3s2s59q0lo6cw8sv1mt0ohvquubckarr2r6751tx3tjfk93vaobb2azt23gkti2t4sjhaf20y3ovxl24ak9kou3o5byeww1dleeqvld3ginnmdlakoji765nj8a4b636qf6ic79yn9uapvj2u58gpd4uofgvwbnzjocg7fbcrc0a0ja8vsc3737bdh4fgreb1l29uzcuiw0mycpdgy10k8h6iwwzsj0wx77s2q6fn5rlqmlzs7bhnf6wbjawtdu71mtbwtgdo4k4h3noiep92r9c7bodvxf2fsoolmet83uof7gdopxbz816m5ny6l9a8hbuqi0gg70ff',
                proxyHost: '8cas7jgwk5ezmqwb3aboqnatx2kt6mdix0d1q23n7ue36qr5w4xxkcypwepc',
                proxyPort: 3185465506,
                destination: 'rl3m6uysreg8ylnvjwdlr8wdjxcgu076m3kosnmswh7g21uh8k7gm44c49sxrcr42njttw7qr4o7mnkou7szplq3cgt5gxg9mtlb74ovvch9qhtnj7ooyu8v9jqpjgpxydnhibf8e0voob2zlxo6pqr7ctz5g91z',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ztnpt5yi6wmqdqhc2hozrowz780m03wsctz9va8yt9gya33rblg9ktpg8b5oi7vy0v1rjpgtcuzmu5ykxnc9gmiz0rodzcp97qxas3domli9jrxont2m4fqu48tseqh8raey1y29xtt4y96vd0un3mxlwsxp8u8l',
                responsibleUserAccountName: '0m59047rdz3y0pgbxinm',
                lastChangeUserAccount: 'sx12brez54p9mp9l50cp',
                lastChangedAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangedAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: '4vfuwhlg61mnus9c5fssdf4f9g7z93pd59eu3e6txy7f607ltb',
                version: 'ry7olp5n52mbbkg2g7bm',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'g6f3y62qpdkk7x47vrsbu8j02g3y90wikq3kd78011lq1dz0p5k2y6jhrk49ivzggcyya4hr0smsee7loy6k3fnylrxvvrpnuml9jfx7gsu91zklk6gnnke1e57vi0euay7wjoylqpk5c54p83f7uthaos3qmyds',
                component: 'jcsfcoorj24xznfs7lzltxu5tvakqain6t7hnx503860naddkenb610ho53jm7bfm9a7fd6yqcpnf24217c0kqevplh4emsrqsf9trv3ig13zazec73ojkv0448tlnk4x1p3str4ni3bfo5si6arcvvmiepsmo92',
                name: '3c8xjoxojadybils3qqd6pkexx73p6o7fqsxlg84ucq2opayrze2pyh4frafu65toelow9k0htk494hfwt89aetwlggbc560e5417g3h0htaf2xahtz0blj80grj3i5ewwc915ptzsflvo3d15kuk79d4mo2rghf',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: 'hkzx0qw9uyipi0da8bsyv4kok62th1ylokehraa9yfou64i0euoft83g6cjvh2gs541gou14cy8dw2ofloeddyf4tkqca6j0lx56q7ztqbdtxveew2gmwzto62lrsggvx3v8ftmyull7e4wyv29wd37jvmvguttz',
                flowComponent: 'zi5txqwmmyia92gdakngroa21k67kny0z0b5fprdiomwnep82whja8ww46tqt39xewouv27htvs232s7oc1fehxhy6io0594x4i6v2vi6bw42wqark50xxyecuvqu7notvi6zc2g0z5r4sd9xu4u7zayy9bzljh4',
                flowInterfaceName: '04puc68pvu45oi4oi7fq71w0dvl210vdbhgjx426esv3215rvqr2igjpetaske00dqxwyxc2bbmp035qrte7gcu2v21ntjuw2ojsq1mjuefondvb4p6asrzj2kkrdgu761i4nsdj7tlmf1dpxyy2qp8rvch1bgku',
                flowInterfaceNamespace: 'vs2q53g46bh1ricqdqq6h7f25aubyc5dcckaudp51y7l8okjzy6wfinf7hao3jbam60plol0enz02nxz1y2ey48ziel123yi6d973tb292wj2wodegxblm3lditqgj4cqh6zcnvoer6okapmnge93wmlampuhp66',
                adapterType: 'b7gqz60k3kmfpqdlvz3wsc4zkc6jn7mdyjtha5nbuhkqyw768708ikyg4ian',
                direction: 'RECEIVER',
                transportProtocol: 'v98ock5zjsvthwqo1g3mbi8xc7we7ney2u8fej0pro5exh1ywb2o87rw920e',
                messageProtocol: 'xhni5cmls1e8qzwmwywi0q0airgbm4frhtp34sra4382cjcdzd1brlslvt57',
                adapterEngineName: 'x81voa4rma7tft1krp761at5z2o7h92twmcspjl5sf4h1avtwga5g7qmglb9akiyfv5f7ew5gqsn4rclpwe28v5dswne3gignbj5c9yvgsptkccp6k8aykijxedj4xuftfavs12iydoso9x5defxjztqkjb9r8fl',
                url: '714wn63el6vngy0hf4cikpnpj88z3rymxs6zomsgjo8u5l9ts4ink4l9sjotkrhrc720t8ugax388zrcfdtjrtgucnyemqmnsv9v4jylozri7yw8qffxp6nxily820dedt3ws4la83ph4ul3enma5toajxk9dglpdfhjjh052mfwbb1qj0okr4k5xgsttu4pvv6zigpn7pcapt45yshxdg7krja0imq00iuqvs13ellga9p358e0submhlfawdvxefzm7mr7zabl4mt0g3yz1f9ztpf7kofpbqe9xcs38yv4cqtm3n7flcugc57lc04c',
                username: '9xdrbj21pqnrwic73zfxq2mqzdw4khtn9dv4zruxsli0ycjjpw2w8k83td4e',
                remoteHost: '6oz42rqrrwso3nm85hzzuwzfjpsgpj6hccya2x4okesvj6vx5v5w9poaoxjnpb85b4mkpojy2lrteyv86f8qxjtp63udrk0i2h2j2nkcjnj59t0z3x24jxexbo04i7huwqn8e3kaq2kj8k2e3q5let8onkhpw8za',
                remotePort: 1713731839,
                directory: 'xcvxrlq8tl71289z835wtfea8gwm0glitoowgd2g67xxs8crg04odqq4a9bzluwogffplfvcfizbs26nlpzv4gww7glux977tl1zcah3affaezkfgvm7jsq8l5stf1nncnyqcy1oh433q6oz4hwsrx068em4h9mdd94237th0bnbm9r23q10zjhvzlxsjqa8ihxpimagiz5hheb7c8rslag9qzzu6r0veo0yre9550yilxfqe6bj67rwllwpazprshhu2fj5gh7aw6su9cpou5hfi1s92343s4q3itveczfqegn2h7w02euxhrtj6aspd42d57e7kjzm0t87cmpb0eb62g6r6z9av6x3wlp04w1ctplg3thudx7o6uj1al4rctprku4frsx1u1t0wwo2m1am2e60g85n5z0fiimrbdv28zgszcg3u8ykqo9pj321ezp8hzlfah74birc5k7c95n1kdtbeejfau89h8ic8kb63nvmtamznm7h3adu4dstpyi3c9e05668u8wplsgvpn8pc97oikl1juibgmjubflrsi4ms4sgg9e45jak7vkvb433yxm294zx0mhbfw818la1r5xkpywcayhu87ddkr3d2841qlxqhfyw8r6z5whgwp1jqsft2h7wybspun6bqq4hismsfmrapjioxnbkzlz2ru4wgiejanucc8wiu2h4qdrrhgryk5oo709ywz03ywtlehw3hfgloh0wz0sa5slndtpjqlpuu0ae4580ucf6wfw0urp7v3su4ztj93z2h57fq5zqhnyh2kfpi6fb45j186xzkp6oq8djm6biu64et8qib6eji32pt3ij78vaug1fcasw8epnba08wavdtos8o2vey1sznnh9x2apcrnlfvsr56u0k0h1hkqqsa1tzkk3unrofwjr00d26h9yuj5u5gupuprtrhf7587atn4zx2dpn5iho3hwcfztb9b04i7g9gpds1rpwfswnvrbbguywhnpm5npgxusjphph99f',
                fileSchema: 'p73azoa493akfu90pwhrwmqjhp05wmz7e4445tfqbkfd9dra6sjxa1glidb6mwyucknxse14hk71vs3nqh9zl27wsj39nscy13jwryh1enqwcg2p8fzlshn4xqzw4snthccwxpxwl83wmx569my4hec1cs61sgm82ko2tk02megn06832smk6qceyop70bt2cxmbtpt41eh7z7f8unskjqfhpdg5d5o45t7douaa7zpd6lzv9nvtl5lvp2lsld1vawiwmfd8r8ybru4yoy8pj3kkat0s6oh5zvt4jqz7zk9o15aw8ojx7102ah2tbyfxdp7zm9u86bkhlm6urooj5pdc6qw9l4s3uect60vnn4y7gaenxr0mozt6ksktazff83vk3x3kjmnwt0sxym01nlusf4rkue15f8eigm7i84atcdij0aernzbw9mnde9rbuqg8b8gylzgqhcz6yaia4q06ljgi2by28udgdhqkzou2zp4pn1yg6m8gt23nl0yv4nkgb60f82o1vmu66onhgrgu3vg2qz7a4fq9cib9aum3kpse4nyncrozyjeu20x46fkz2xx0k2wi8j4xqfii24d03hn8hvbxu09xt3r1fe2pd6k6szba9u91ihg8caa6vrtn4fgkx6yca5nvol9daag4wxpcj2nuvzwcra1ey9qa3w4qxrbsmfl6pu3f265cvob9aa6t38mhqgl723lj5x4ta84wx5w3wkl7yl1edbdmkfvuqz4gxri17gp80dwkwvg7zf9e6jrfpaozdruydsj0xwe8xcfsdvumq2yfc4luhvm5cx80131adpdv2bm0sgespv3ex2zoq7lfoada6b45bbmsedeviz54w92mgcftgn77y8gzi23jyhbrinzrpnw79wf023rzrksa225lt7obkvs6dmjtvm4zxnvbb5vip0z67430rc7tltg8xfkp9kckn3f6u17238p34bo1p5yh610sdib2749ohlmi4b8t5dlpa6pjmzo328p96pu3',
                proxyHost: '6mcxiuol4uanv56y977ruulrhhb8o93h41tahzgayodgmogxf1se46bvzf0j',
                proxyPort: 9479283620,
                destination: 'zc2vobosz824upm8pwi5up0emqssxzha17hu5you0nw0jxc5ukm0zkff4fl083mx09zjrgsol2vscaatcpgnj0c7h0tia4pb2ag20dbqmaawdb9ma8vylykodgzn5cjew0j422aw09h098n8ky0lfwh1vr6uexv1',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'v2ems2e9izwipqu2uub16rtr9apc1b1iv8b2ideo3aqnncc3iqxgg3r5rpweefhi8y86rifeucfctbipxkib3o65et3ap7ax3x6kf90p7n9es3bth5zp0riywirjook8rcau8dxebgkavxstnevw038s0vnwxbnt',
                responsibleUserAccountName: 'ri57y4qw6rlv00b1a7bu',
                lastChangeUserAccount: 'vg94hn2rcucufswfm6uk',
                lastChangedAt: '2020-07-27 06:14:31',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/channels/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels/paginate')
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

    test(`/REST:GET bplus-it-sappi/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel')
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

    test(`/REST:GET bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'd47bacb0-494b-4d76-b008-ce74da0a0ace'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd47bacb0-494b-4d76-b008-ce74da0a0ace'));
    });

    test(`/REST:GET bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/d47bacb0-494b-4d76-b008-ce74da0a0ace')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd47bacb0-494b-4d76-b008-ce74da0a0ace'));
    });

    test(`/REST:GET bplus-it-sappi/channels`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '5db06e69-bb3c-4678-bd58-a5c61f65e155',
                tenantId: 'a46a9c13-c35a-4619-a20c-bd5b693e072e',
                tenantCode: 'icmpoyjc1mw0r23ijg7abprn1ojwezol2mcoa5q3yyr2m3qoin',
                version: '8b11jwmtn4f6xe88dmy2',
                systemId: 'ca8ceabb-6ef0-4bd5-8a99-a199c38987c5',
                party: 'w4ra7fimfhji0dzf7gzggozvc4dcg8fkv48o49xb3vflipik06n41de8ozh8yb0xk36ghb8j3rhj67cdg0xzpit1hcdvt12vqio6ofm20vs4nnqqkanxt8ozxofit6t7il7htgxucv8v5vlx0xkaurbo0uxpf84w',
                component: '9xpjbxnqucahcmw40f561kl7q30iwno1f62zxxbmfr80w1xxlptfjam1smeczv02layflfblrenomqzqx7rtx8jriyxtv8epat218l8byxp7vuq8kee3hjuumx6cftr8bfn1utlus4iwfyjzi0f6glvdpqsakvu6',
                name: 'cymygo5dp10mvbbdfnxmoopp3aynxkgpq387e78jobc9rei0crf2wwpfnnlsy8xyiydusdr4zmnhhi3v3wpxqpze9x4pfsnatajtn14dkwshohu86j05hoh7eiwt00rz03xsunu8t0pqdx1zq28ewmygcz9uohew',
                flowId: '46adf4ac-e20e-4862-bd55-b8ccf8be6c8a',
                flowParty: 'nln10ar6ghbl1mo5n3u2x7cdnijshbhe47531kfsku6s1ski7lnbfpc175yipxlomdr2dp1hd59rw53vsazr7vtkv7c6fprl3wka93jbljadifyny571b1qbvju8hqy0migq5avz3xmvxp6l1inq5fl3sswt6aua',
                flowComponent: 'fe04nwziokgjyhai6wc266rh954nwlnse7ad6dj8m8bbw5dg1btcc0v0bak8l0nn3ff6vob9w67eg6wfnsgymw3i5fufoojuee9rjofsarhyjwpopi577xf3f1mkn2eea3dk13at6dlunts8bqp7kohbbauquj1g',
                flowInterfaceName: 'n500gne4gc25p0qsf0f0m289h53u001zc4la7yweq68ml3wftiy1zfu4z6ueo125r71lgx31ycrwmlh49zsyej216jmkuzoa6z7jkrrnab6vew5f4bvw43ssixrnjmatqn5ye2uav8oso6zcsocex24duwfh0l06',
                flowInterfaceNamespace: 'iyacxo9sjxv86zh544rxo1hbdcqps76kems2ne4e051e47qyrgrdymxw7nq6fk7bquyf4psrbfjbsp4msvia2caq37u84yzgero71cjvsmmtiyo2evojmv2ja6g8ithj5hmpelwqofixroifjs86ryy5b8jbydtl',
                adapterType: 'vkdwrscc40iyt1vcydgp3p13imjz2fn7tkzdb7saadjf7j54l4a80hlxf48e',
                direction: 'RECEIVER',
                transportProtocol: 'lp4v8t5f72r8e2ahgl772b1kj5wd6czni0y38b13vlhhqqefclf600pbq63n',
                messageProtocol: '888xkqzk23gxp13rrxfvyrhrare57483xea4qzmo4dc9fd28vldhuzyo2isp',
                adapterEngineName: '4rpp5as7d7z8g40oupem505wflzgybjx835hn6nv1nr7ywaya2czwm6hugu5xr3183dyzkfmhztvsr03qixuvmskmogvu76evas7yqlzoutu3toljtgjutel6fj65mynpa9tpo5c3dcl5zklz54rkfq376gsp0ny',
                url: 'i6zwjuyf6cvsfe9k9q67b65vcbifuedbrdq19vt60zx3tbon6jud4y75fwe8sbsysuevd551p7o8s0zi1i90hvo3dhcadzigqm71hxclhnpb5s3bpjh15jkvot7ptps483cuyszmgpmym72ve6s8ko6s677pcg6bbc5f59rna2wpea7jiaw1pdjr1hiql8kyufvovlmrosgi62hra32hpnw5m94omtvbe9epra6r24y31kgc90enwv8lveirybcomua507phws2a0gtu10p1qcq8zbpsn4ubobgmina35d9sdxglr5nduaj5pn9ovf4s',
                username: 'zxt6rj0mbtipjqklbjuqi5yn7a8xfyod5dnfvjnej1s8uaoy4gjvx1immu5v',
                remoteHost: 'qc9dtfxypsnaovfkgg05qfj7zx9dyuawgtq2wg1ip2a6jmcpdb9xuuwq5pqpfb5ziixv59qi49yratzpm1ktyaa3c1zwth66v3lie95d3x4yaedr0ntennnsmadtg2xfi311ud73eobtwrr9e1wn4z146ncgigi7',
                remotePort: 7300825068,
                directory: 'k4vh4ku11jrtkp1htjgvfvc7ocs5j6swgryh6pm1oi7o0eujmabuddr234odql6oszv7i6c9p6364b59dqgdbo15yn794poyn4ee4uqim7nvru5bbbcureeejdeqjycxzoleoidr6c2o6s5hlwks0h21xxa328fv0yhuxd6k3607jkea1xqyvmpin6592zqm450ntnzo7icyq0o15gskl2usd704wscbccitb9e74l180zyb95h51q44j9ft20k3429pot23sbg6haj1hs4aqjr6txmhgyazi5fseoryftq65msqp9o6z5wo4kqpfzlqbonzeti8js1h9dg50m4b81xh159taovvehdkcm9x19pif4r3cg2qd5s8evvv43dat2m43ko4dipx3rlvt1romz7pljv3rxuhr5rwipje8dl23gio28xdks780kdtxouuwyheyjl6lndoo91lzh9rnn6kgztojdyo0kck1jwlywebfa6hm5lut2a6jvfq9avix7soo3r5kqyvhqnczx7q2pwoadmjc04edm8z1eqshsy374rx0w34t01tq5gz3e6vg5ryo62x4ftcuvediks63gvwjjh0t8gxxscwoe01p211vcaf5oygwgqo8ltevpmclqomy6ljrdlwob0fv58dwqyz661upm256yfoyatwiehm92mqx18d24nkn8bm2uggbur016v6n24krwzd6hefwxfekurdlwtm5wfmq2xl262856jv4ejh40yho2b1zx6y6y6q2i7qw5uwjrii2oc5odlu11xj7m2bv7utliaz4gb7xpaky2miup9awzzyvimy5usylyqnh6wbnph23xlfn91fgde1ram5wqdainytddr7oxoz1oy01l2wqz1nqltvfpcx52fjqtt8pgosy2un6iyv7jc0j9g0hol2uiue8rswwwkfgnnblr107f2z21m9fae28gnabekihu7i9hg5z4rmb08ifa4edzf1k9dlx1t8ko1vkv8yx8684zbgsi2p',
                fileSchema: 'jq0m4zal9ts5ta5wrapo8kfkkmv4lnx5xtxlxzfu6gwmpjuncc0k5rr3lej5t4bpgxkjq9q850fb0vgjhzwf5ws5w86hmadgqqytwx5rcw3hx7xwkpxstxm8oszhtd9gxzxzqvggjk9l4yseioz586qpbckbb9him31lll857g6b7uo3adu4siq0o19juyvcnpmoz8y29bxfgfdbgcqej5gac785ygn58uhcfxujr7i5sv75vi65d9qksiswypkkrnoc5ph913vanl4o55y29l9hyvicn6pv7wkbsg2egndt0na8r4v05eqanmajrkuy7u498f50tsbe4tawc2zmanufmcnt9zqi1eovh6dcsinp8vrkq5ynxzupumruk17sqzuetmyy0ixkm49bwc0t1jj7ib655nyk26qx59nnhv5dewpcxkox0xyew86szh9jae0bhly0vjk6w7ayct3n32hh7hoamk1czj0jhlnt1w3b78bgcp44cnrrc4qk9sfzfyw9egrzxuqzzbns0niczybzwekwpinucuajnbtqw0dg34ori1qvpozddqwrw09e9sqot558i5x7hya1ug55z0laz9bgtx9kx8yjnzucyo79xtagf0hk3ry6hppheo9pmkx153eb1uxd1ojukzhrky5u4hzu3i178lsogdw8ncan1rczi107tdzbx0b2auomb6pl5rhy6eg46cvr5y40cdw7z02wihkxvon7zgqetrqobi4grb68an022tnvwpltpawmzfwjoqj37cfc0iijjzphixkufhulz64sch9kr4cyhy0x5l93ib1yvqth3cxdzuuhr8rs7uca4vi67rjy0ot2be2aop4oww6r5zui34rxnb382uzhy0i0ogih0sxkqahykzhazi8k5hcy8xq98lb8lzez4cydh4x0v5a7jc7kf97yj660bl5bvz0d34b5vqtl9gki8r2wtdn8266i6zn8ih6p9wkamisvr5857sjavzu2736usdx278aoqn2c',
                proxyHost: 'e4fvdeequn7em0yw9q3tpzp6edm2ng9b36soldurge2fml7gwcc2i9gf1kaz',
                proxyPort: 2756914664,
                destination: '7cm3gkgeljp6fwwv8czaohj2kxixfbzl40df103qozejiycurqe2xv0r0zihu8678af8cwyqryrovj12z2dom4tlbxmty4ou4npdvm0jguuv36h7u6ar0pzz1jlij8ql4xk160t1g8u0con1osvv0jlhituqu4i9',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '038mkfafuix8jzqpx50isfrc0s7rx6t8fdfykz4dx33rhhxv1kjla9xf6i3hohnroyl4ix2ejz0skcrixwzqfzfy55w8296vtmxdgk1xxxa6owdscr9lf6guggttlii69il0l2tqr8wlyt037qyz82cutz0klhwa',
                responsibleUserAccountName: 'jjb8fgn2qo50y57qmxhg',
                lastChangeUserAccount: 'lz0k9z9dcp6l32psrg6s',
                lastChangedAt: '2020-07-27 00:02:29',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                tenantCode: '771yhzxrz2i7vn3qnom8cbrugg5ukxy8g153gqbagf4i7qjze4',
                version: 'kv0xus9uavwpmepibc4k',
                systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                party: 'sh1ihchuy9rs1kseek6ay3zd9j7lk7zd9xyzzwbpl20n7gyhwnzbzbgl56uml08yqiszjpxgshogfamvedu6kr1cgtwug1mhwn0cru9o0dognbtd1bu7zhywxj401wgs1xvy652ozjekh0d4we26o2kz830zmzwq',
                component: 'hnrjymkpxnowtym6hahcy1s4pnh5qjy6a102g4pq2099gz0mgqm3hlbmtkat0nnrj66q1pogx3k9wcj5qslhf1k6r6of6yphmxgpgq40oppuaswsdk9mn3rq1xxvyfia83q266dgg20hjmktl9v3hhbpl0mzdaj0',
                name: 'cbbpki8617zqq7jjzgv3608mtgc7vdald9qharro955u45azsj3auhtocbvpo6ywugioshorafvicihjy6upe9av8xk90ck880s2zwffrf41m6c5gzjp6havwi71d6ju3s21nt71axhsp3wsb8p6uomue8q6sfso',
                flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                flowParty: '7g31kdr0kx9w36n03euo4f5nysm180ujkuq9q51tma9ggjnz0l6gtr22wppaqrwmxl0wk0xkk25k5x3r3nw2n5e0bsfnn31i73rpumsjjwpoh8x8ktyy212zw5x73d96jn2xvkk9vodl440ng6kpk4u2t4kzp8pj',
                flowComponent: '7zmxwt2dvjyk7dqqildzuag98yesn3lf9hmvpyq8tmpa9r2xak1ir4g8pabht0yzai63m2wwxhlr5e90lgmauhfli4g1liqid9zrblmng6ou3y7qzgusayi7tya846gemvh63rjs2u8pimp17hxx1o9wlxx8tydm',
                flowInterfaceName: '2916swjtfmg09ogaskv0m1zp29kaibw01w5ri87xig0o7ia0eyxsp72qu9kriq6x3a94vo3u6qc7m8krt2t13ckt5qs5skl40dxntc50bjmsrkbmv92m3shsvl3fqv6p78srmh14fcru8zrg2uyazhsdmz9de0u6',
                flowInterfaceNamespace: 'h17pslazy6hxkit62q7xt1mrtgyodcptbe6szbxb0m9qgfv5pbwy23jxlfbqxucbhsxyvekq01vc8ewmngdtz8hv56e0wm1xqeir0lqdbkyiesgj5h571vh980kbleldxuu3n09uf9embnypjdccn7808b8bgyf8',
                adapterType: 'u4i88sili86e6thwu4g1b0kgihhv1nv3zh20y4ep356rvnupk0byzmh943vs',
                direction: 'SENDER',
                transportProtocol: 'nsh0qe5ifxz4tbwek612fj7kuduq7xhlvi1g67gyparovkjln90mjp98bolk',
                messageProtocol: 'srccvfeyjl39xjd59tqt7av269ttwzz2r3ywlg1p9le4i453o6kwbcj75goa',
                adapterEngineName: 's8x6k0k7y0sbii1vhndvurpml5y5l3br7dma60tjk6qb32smkvxlxt5viznk5yitpgniuk5qtmvnzd6a6bp26x26isdqxp7u94es5xjwscqzhtatcsxkz92mm9eb92gkgdwv3f3tvdnyrcw13dw6kslivzishldx',
                url: 'yho9xzu79gr5ujq771ln43zluf0kilm6fbe5xihodmv5hv0beqd8gk2zxrnmjoixrvy0coamayt0t801557eqr3t9iafda3clr537an765n0g3bem0q824hjcfayns6to49m9nhx2vbmzeja9ih0d310qyu65koud2ckpc80dbm60vwwk7ojguuwouilut3kahd19tyef1t4aky6ql7ceo02xohsr928vz7eygsk83ewtjz7sjsw5m3za3f9p4quzqwxmv33fnxl2qceg1l5bla30tzllii9p2fudvxpduks54vclr24zku9c9awcofi',
                username: 's6xbsvjg17oxgiijwq2rl4xntnacx2nhlgx5vy9zz9ek9gx457z2gpf2z73j',
                remoteHost: '7fiz0l9zhlz7rfyp78njto8itwsk4gvze07earwqcxt2q9zje5oeg7kj1o0dt5v276fgy3ac2uekyth5uwhqxkbjmy0pf6d9ufs5z6jjbfqzi4ig3qqmp8ay9d1ppehlsm4dx3g24vvufsbw44c3hnzz71r7pwx2',
                remotePort: 6383701991,
                directory: 'u782rwxwjwmkdsuix36goprr7zemnyg32tbxiv97jyiemuxiwv9a85bysdu0lldijkuk4uhxymkjh3zfvvxi45axpfpp5n0zdfu9tf3fuq0fpdh0ycfmdsqh0swyatfug2cclci1qlt47b78ghehg1g019adb7c3yka7dsh4ed4hwmrloxfp0p5dl8tu7s218qbv6ixbcvp0ri3f3pse2gotz468pxs708xdp5mawbe2w6vo8vr1hxefe2elgbhwqytc3azdcnw9r6km9mlmo6vnet8nrau12dqwi5ey6yr3dd8964quv1dc9pmtdt7tsy5rdmkgpas4rnmzqfjvt3zrd1gcyse3rnrsvep8dxsfwtju4yvfbmswoinwlblgondgbc7veed5xchppngzz1iwlov5d2jx1fkk3uih34ggnel8g7bv43lfitbs08j5hl3fc636n67dbdzfr59e7kx8opm6vpxjn6qmzp98vuyllx6n0jywjdqq9uax4hbpm8vhu8eynw47f4hdf6z7cpwtw9eoigr104h2pckiwuntnqp3cpbi9zor5rnapjdz924ojm3lepd4rjnoeecg6d8ydk3rm98dh338ydfhrb230n45soevkpydav7830emikb3rujdz45pdtn2umwtglrrurfnpf8mgjpa5swxbx56t4bfqi1kfxtn13n8ch1i1senxr558wihl7zw3funhyelo4y6pkbiu0rp69i4s9ddxlult36k8lfpgmulzsjkaer4o81jv8kpbtzjd7o8cnwtz4sh8u96tlq0ub8ijlk2duqbzurnvrelx1jhr0p4rfbye9hsy1rcmjpem1wzysyzzzfgxvksw6leiunhfa2pq18d9dekgehcnw4xqbhn85xjn45ofqfqxwbjk6j3x6823p9mrip7t2ddlv2imh045lgip4ev6sabdn5v0o68vnqmqcwekdo1lsrs900yp49tsj94rvybywah5sv8y1cce7io7bjjbi6eqzt2482g',
                fileSchema: 'pdx8hh0twsgo4947eb71ot184mz6kcuoiqly2png6gjvabvjpbspjewlzynyd91yi3etr5uz7p76rjbj10d2siltln6op4y151p8bpyue7vdvs0jkaj9adrfxaewkl6ccqa6gf1mds2s39i1fy85tftnksi0guv9vkv99i2xa4g2e9ge1k1hvpxcxbp5clsi7jkz1grg9ai25y2tlfhjic55pfzvjxwo3c0znic3wb9n0pold0xpimyj73oufts1h1bjvno8aeop370ue8d2mp0ems63vy9fn3zy5024elkff6lqd4dzbvnlf5vl6f0w2ir0dfgwpny3bi7tklc6n5y9og5id6cfqka413074fafw2ha858k5uzxefcu28qxs4vswg8umxlqnlwu3tjn1b2e0yz06yabhvv1tjixedua57cm36pj3wmdvgm9g67xo8rtnqxwqe965ttclwfc5dyg0p9qo8q2tbbm3mo27cxcmenytoj4gvvj8piyw2fxewgnhmtxsfkizlur2tlwzu8qr8wt0eomzrq5ppudl23dc0zz7wbl0y4sbkefyfgisyb5a1splkqla3rcy6iskj5w0zrxb9j9lm2gj6p2iotasqjbsus650jyar8szw7hja1xji76szr5hejldklnwh0h5st69vepj0c5hyrz8n9cbitngttvcw950i1qnwlmb9rvrqwanfca8b13h3cmp3e7xy9qz7252wysd7qplg6pqsj3xqifs8fqphnkbazexoitr6gme69b4jxl3njzje32w9jc6jhdgle59u5u8fa5rzbudg09fei8g4cm32w3u74tz0c6dor8x5zi1dn4uwjjeyfv0h3o8998ovhac04rdrsef2t5hy6kvueisma7ms2abgr4bjkodak0b467wlngxim3j8t9mgaci2i11ug0xrft9zalxzrizuds4gjows06hq97jnvvgy9z3wso3730d36p0dx1khadenwid9qq6j364bib63r3zw43cyyu',
                proxyHost: 'm07ot1m6hx72s82fkhdvryfqtkxt1or40s0dvzl7sz5mdl7n1eukddfog39m',
                proxyPort: 2653610294,
                destination: 'mag2h3wsylkkpigfpn0qpdigpr3u9hf6atvndwn14etih7wpnr722vxz5p6zu3schl5364ytkdjt6bjpfzlw7bv2lbc6m6sfnmta058p9hpd1b1xawwuitfsze9u2qxtpf9hdvm0rxjayrc1aftquxica9oiddvs',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7q0s0f95nrsrt9l4bv559lx0ytam708gcwndone4099hi1jfr49uxg5taytgy18fy5o7c7hwp1zjmsstpvzpgt6nrlx9jhhqmp1p8dxwzq7pf9fofq7pvxc9d748b69qpsjrhdjme7cs4z5zu2l9qq3t15590g9l',
                responsibleUserAccountName: 'oak5acax4cbjq8v9k5ws',
                lastChangeUserAccount: 'wvns57d0xztykfxm1c41',
                lastChangedAt: '2020-07-26 19:09:32',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd47bacb0-494b-4d76-b008-ce74da0a0ace'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/d47bacb0-494b-4d76-b008-ce74da0a0ace')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateChannel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelInput!)
                    {
                        bplusItSappiCreateChannel (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
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

    test(`/GraphQL bplusItSappiCreateChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelInput!)
                    {
                        bplusItSappiCreateChannel (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '958e64f8-f558-4ce2-af09-5079184c1ae7',
                        tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                        tenantCode: 'jg6k01lgp5lprfmmv87m3rc6uaabg2kem4fkr2an2d81srmkcm',
                        version: '115erah099klpb8lwdf1',
                        systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                        party: 'c501ao5r09aj5io0uixe985nd5wervz3pv4btvvvwc40q5v253jg7ujcj1wlyrv8n76zqs3rtv3lkvsm9oztay1xt61iu24pkcz6x7dgitp07h27ffjbbut6ycou8ss6y1n8kns8chrthsuc8nyqt7efpt28hfop',
                        component: 'ujei5aw2v2evrehnrp64z69h5vzcsmh6xuats3cpgl5pur5yg4yigpuvsg0ci53klq3wohz8chd559lgkc79adr5i4q0zznx9cvzy40x7716xxgra2ec8gn0r9ab0emnvjvuo8d6znlgfxfhoxzi9ouba4xen616',
                        name: 'lmdrjuz8rz974qc3m5udz6kcvu55r89ibhyx4t4ke72vqvyo6es73dx9eab6aojffb7gkrj4sie5a84prf2rrx19vqa8v1jk7hu9mizbyogoz2tt30y1byc6lit44u897ri21zsbq3l8vh6ms5or2bcg6ce3aavm',
                        flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                        flowParty: 'vcj2pr5a2wrnz6mlqtiwf8jlczy55rhd8f6f5b7sdq32ozylvzthkbqtynmsvkpv7v2a5yb3f6085fv6w9ru600153c90nq0kwgivgc7m6yb2gzz8br48adk2qkclmwjkw27er7rr8on3jmo1c2j0rev49newrfw',
                        flowComponent: 'wme650821q71w3trsc7fcd5mljbnxd5e594iarkul41lz0c7qivefcl3d5z6gbh2fxubr0o8tah0906siryjx0e1ai0z2ima6n573ket1x364qxkayxpktrqb0bv3tefhqnoo8ocmvz2xqkpd9u0f2wwgzcvccla',
                        flowInterfaceName: 'ce3k6h5ydiv42hw8xy0kzcpovhms2bojwekv3gxv4ic6xfo2waw3ghqqp36711tdmpctta873409yj7en5jsgeqxl4v6c0ube6pb2o045s7fb483o042230zr8rg2ikzwll2m47ncmdg7qsqwhyd785772mm6e22',
                        flowInterfaceNamespace: 'btpnnn8ig5o7yas4du8l6rws4zdxt3o30rc9d9uo7cudt82pmuonjtg9dirts3ej81gtj5nvh87h1ufny9ody8nw1aqt41j732vqkou00f194015n6eb7mbvegk3035l0u1ukn4s81agadk5ddgvqywugz3gqiv9',
                        adapterType: 'el04odsrcb5a8ynrcslituzy6s69uwghndg627yv3cp40n8zum5nkft6v5p4',
                        direction: 'SENDER',
                        transportProtocol: 'vb9klc8nt57qcmttfh7ophwxufn5tnkfuwegr3g1xyzd3qpksrqeojk1f7po',
                        messageProtocol: 'dz3g1qzmkcwsi2wjsxc67d48p4404hd9rixpkt9tsiknvqgqquqqtbmhwky5',
                        adapterEngineName: 'cc4mgswonb8u90nb5o2yoa31pq8p803ur4op3eotyqvmr70625f8r45ti5ar0dl5qjb17hwk5jjpqmj20gok8n1hkrtjw0yl8ie4gqmt2kl86vr8cs6ahhn767t9w1puovn5js6ylh9ickn2ty7vi1kypgcui7d7',
                        url: 'lkxlrvrr6dkc9y1y9al8qafa9r2xkhni0ur6coz41x2zv9pm6yo68kzf0bb81kqoo7z4yf2apqwp55dokg5v27koangmaxdrcpn92gv5hp1ww9iw16d482z45jxyop3s3xq26ndcmxgc2spez1io0vjlt5nakqbf7jtwrh3z47owg5eekgcufzgsb87ljgacgot6cl0ytm4vr5jgzys73fan3bpimm56hxq6reqqhebh89j5qz70whry2uad9zji09s6ujizc03kqienelirco6r6mjo8busvi4ozaw39h0n4gwnl4ezexd80i22a066',
                        username: 'k4imedr64dozdegavwawkhtr36xnrrtf5cuq0ne3e3vkjw9mbcgdezvlkvb5',
                        remoteHost: 'mudt487b3mbsu92fo9u8vp2mbuzj5lr81bhf57guhrnxfujgasqvqfbm9cvpc17sdxv4cvvqe0c25n0ja19hv1py1kx0ac22xzrbgoo95yjltnqtwcppemd7winu5hph0dvk1uv4txtmeqgir6fcocge0gyk1kom',
                        remotePort: 1367001971,
                        directory: 'xv89azrdzes6de4km8x9e8go68xgwtg9c516fo665qi0hji8ogealx5gxbb6j6msgdarxgj3tpwrx5vdtmxidz444go0l2jyfbwepe1afqa028yv55jf6qydf4j6k8tl908ruqy2o3v6comp1olkizv6aqrn5isxx3z9ec3q9urn10rfv8wydttfp8hf32gj8s7ibt5kojonohiv0c7wknthxa53plnoy1wsqpmgutqzraev4dltcrtu892dreciaw0lmgtqzzjvajh970p6rucvtizgjfls7ti56bc116f1j5895etnj9b4tw9n1kvfcc2h8n46ep24m46c7k58ymgbj1payjcpx65vqndukobnbti2wvlvfug83ycj7cjacnd2sk2j7itbs3tvvi38b8cxvx4s8zts3m359raechuta8qn6ppwoin41ksob0bqx6pycsqtrffmqo7s9akckpxtgfw09g52vvb8q1lz2why75hcztmr24f3kzk31n2nn5r9b2squ0qm7h5ce2ppn7bsw6gf7ij007g4gaf5f8nkmm25aszd12rrwvzhp4fl5mkkzj728mgyr8cwrs1jnqyzrhysf359p7w5vi7vdewkupimbv67f9wti1513vbjkug89rzfvs42a0cmkmunhbj7g4uhupqgh1568yh2qz4yx5akzu0lwunq08ax53gkk8w57ch73iipkx46wyovp50oycnhgskb3jrtmdmu846cg0zpukv3rnvjlp4x3lju8c8py4jlorompullvejcls0ka7nyt8wifr6ii4mxj0mes3l3whl48hgrhygrcsc6iq1zoikgt8um5v7l0s281fsg5in11yf7lr7x1oultusdbu386lc0mrluyhas6rl4mifmhmlwj93r3kbggchiznl8gcrnktodtv80zttv0cezbefny1sg33xc9p5coozrygyfcnlwiyttsu3qr6rq8oulzklyri6q7ts3klpcv82chow9kxe86xi7153g1o2z',
                        fileSchema: '1jjbk7y48j5wr41c47e0i5ehioxjvk4qdlpo7lwmx0iphz5pv0ry4itf48m61o1pgjqgtp19o7w0i3fxy5gy2kd05xc8pb8d77d10hqg6cewr5lj0t5ghn6qjmooui9ec1ssma3dlffm4lutoi87wave69g5r8c9r5msc7bzymc5s9xmyatlq4dpiif097bmvt3zmf1i5qwae60v9yjesyg2qf036ijpok6dqvbac2coiam3z85swt7nw79hyqymof9ktickl6hd5qmv806zbigveamp0suyoyq9chkskt4raxrp22b4jfxfz3pb1cdbu3zxykla5eyhlwe4317zzheu6wfxi911wvoxz869s32v85aublp0d3zy9ycwojqf04hs2yrp0zii9z3trnux5yks4ckuw9extmwwe163xfbnx5mlz6j2e0cidviwp29t38pzatt68ni2hosclhs3shkb8ycfgfrlow0793ybcf4oeelfbk4ldtbn27bcu4ydajo25lsqpi6n17299pyiy3via36kjzfkuaang1ms0b8vieq73xujtvw2ogd4hdyekmmf32vydnqdnif9uylnwr0if8wk1khwqeu9sev57xy4tvskoutwsub7lozty2x8byagfh97y3k6r22jeewfhc424haybxttlgfhzngxup2v2f7cri42cnv4r6csxlqs5g6reo8bhcgy7qmr851dcxdgnn5197b790nk20rp335fhyynhkcdr3uscrgbl9rakmow5ll4filzn0cdcbiq21fm5mzn0vet4xoxi2w6bnlwqilkamgu88hg4acdxd834pzm2dvq69284yrvd77lkbvx1jj96z57wf8ticrv9n5t02siikm423gpedhbiecqqq4llaluuew69f3w0cn7y11706dvlpyjpbffbjgl0ckm3frad9dn4v3v3b6t61qm2q4vuzibmktehh5jris23rf97yvhg9o3b97c8vszenh202mpw6vs50mblpbowg1b',
                        proxyHost: 'yka4efffa98xvtfboq0b6cqb9ife721zya7elgyeofzoyyt7tzpsv6e95jtb',
                        proxyPort: 6084004306,
                        destination: '6ezvnhkyq7lxx2ztpmk8cui86908cxkvslrl4row7gmcniubvx9qw0os5v6inrsx2oe1ndsh9l5pfo8s7prdi6svqpr9y7fay979pmqswiohi33vx48630w2abse6gewkqoox8nmvammbepsnmwnxdqff2raaj9d',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: '9oct3al6z1norxr0jt2ze3jwsj2wddu51nr71r5jykvykxbp48rphd1oz1qt279lbxhc0uu5aqkeowovtd064cnpyhk9rct91wldea8lgn1elbqhhjq0b9ogujk9n3961u8x2yytlco0b4wbxr8knjws6dvy6s5z',
                        responsibleUserAccountName: 'e5znoqkqst0c6oqpvk6q',
                        lastChangeUserAccount: 'hupiy4kiy6wruorr1rw6',
                        lastChangedAt: '2020-07-27 14:11:46',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', '958e64f8-f558-4ce2-af09-5079184c1ae7');
            });
    });

    test(`/GraphQL bplusItSappiPaginateChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateChannels (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateChannels.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannels.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannels.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannel (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
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

    test(`/GraphQL bplusItSappiFindChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannel (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
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
                            value   : 'd47bacb0-494b-4d76-b008-ce74da0a0ace'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('d47bacb0-494b-4d76-b008-ce74da0a0ace');
            });
    });

    test(`/GraphQL bplusItSappiFindChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
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

    test(`/GraphQL bplusItSappiFindChannelById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('d47bacb0-494b-4d76-b008-ce74da0a0ace');
            });
    });

    test(`/GraphQL bplusItSappiGetChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetChannels (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetChannels.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelInput!)
                    {
                        bplusItSappiUpdateChannel (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '7c4d7688-aadc-4cb0-973f-faa3b4addc72',
                        tenantId: 'afe5776e-b383-4182-bbe2-ee7bcb11ab44',
                        tenantCode: '926g3q5d3ovaurb6g8lmz0a7k0g9ragh16hqsmu1cky5vrwkow',
                        version: '0fwios18zycxnesog04y',
                        systemId: '39f1512f-e2b7-483a-b409-8627b236167c',
                        party: 'mh8v010r5i808z01rh9wd3qbm1y9jnigqhe2kj957pvvbbv48v92cz4tdonpabwvfe0bu6r4ocmcg9eaenrr5njjx0nk7a4co6mhvli8xqq5sg5g0ttaropgt6kttfw8wskwh4h7ynt211s28mjqc5t8mdh7gvbw',
                        component: '8c11wlbixk6fn6gpq4mfhvgq84sld7plz8aecwdbcf4xbgbdyualncfo19zf5jb0kx4s4o4el3hkzl3pg5vss209xfngw6h66baxbyzex6kxmn58elql09h6x1bf4bu3nsf64nmbu93cec4iimy5ifa26j1egxpw',
                        name: 'fm5a6lxa2tg7kjq8nshpesw3ekb5kqih4ip1d41e92nquzo3f3qbhs0u78vnh1850duqfhfam95380gzuf68afgtu5je7t502epuev7p5ndydqt7axhvhekm22dh2r2fgcp7mxllu5g4b9mmisu2wjgluhnzxrr5',
                        flowId: '2759c960-6078-4536-a122-2e15a2bcd28b',
                        flowParty: '9ruyawpre8jhjtw8tgnejdawc6gedij9kfmf1g5r575q944ocjhjaz5pcxrwotbgf42jwobm9f6tvsmljyux112a6vn56wl41ky615eiseg1ji2eq4qi6ac0izomz3lsp7eode70gmlahefotzfar02tqifda4lj',
                        flowComponent: 'n6u7w7vsmxn04o5ej0pd40vsfhi851y0zgsk3kcv56smfjas25m04t6zdz58hrcbzidycq3egkbdlyp6teu06bapw71rgfn573va26stxb34xl1aj5ytple6s3dcbnfo7iad371aaofr0seoqgnoj670p3gf0ym7',
                        flowInterfaceName: 'ot4zpq0sttly1snz5dvbqflb3w4snus8dutdekirrlk250cllnaovczf6msz8dllgulg4zqx78abox03zizgnyf0d0c1v8lsym9dv25m27zeppl1rcix0f2tles05zc8ti0o2v2rizc3gfnw62v4cp7mobcvf8px',
                        flowInterfaceNamespace: 'ro48netitutzy1o0lxo16nfpb5ug5rq9i7pgt390psvugi5wr7e6khlwwelxgqxblz2pfxwexgzqoyhthzj4s71muas6pw0l6fwo5jdy6xghs66alfvelgvm989v37rh86vy22ki9ofrktz48hnmvx6r9wvpshaw',
                        adapterType: 'pu3guasmzaxt8trre9agvt3hlzl1bb3kdxw510c6no5ezwttv3h2mwrnj5da',
                        direction: 'RECEIVER',
                        transportProtocol: 'bia0a1bg58hse3gyv4s98ovn6256gp5u6reo6ddsoltbzflxgavm2vaob60i',
                        messageProtocol: 'yj0c43fas9jntjyc56pohlkp9pmjlxdrmdrlcexls08e3dtt9en5vs0me69u',
                        adapterEngineName: 'vjysvjf31lwyy198w57h3pyvn68mckc1c89xh2hpluv6x80nsowj5v6xbqqrp1a0zborggl7ovg8rdg8o3zvq4dzpgi66df3por31xubyrh44roab1twcpz18vr3gs2x1u18s3ozzfrm6qqfzvzyn1zxkw6wy7tn',
                        url: 'tlbaa1lb8u5b2409a19xwm0wz2o0gqwnb9xhhcy3qmeg8km3dl18tm9a5wdhde176tkv96wmx19z5nsuhzyij8q5qx2k6jh4fro87j501gg70erndsvllsm6vqnef6juq3y8a27lullsx79a3aofwl4ehg1yzcn01f8ldqq0iumer6jgn0bd8137crzw4o7jvfba0woauupnjo1fxigut1sgsj9k93gtetoygknddyplxcm6jf15ev6d2pcpw23gfu1h9nacpprkfuzj4yutczcqf2y7dfoq4khcyxdf4droljl5rytxvw0n8w8iaqcw',
                        username: 'kuovql1bysg5k56eshpa9pz9l02tucgrtm6ukq08fsnweuz93yjsilmzma26',
                        remoteHost: 'a7jhmy9gu8m4fwf1fistag2tdvdxfsw7nl4bls18ljjhecq6u6tggz272s6c263aqab8wutc9r2wqnfq0i1i1b19vauqb36sonslxf90pixbpv92yd4idmn9c5hx756lufzdpvjopijpm397th1b7erz0h61jwjv',
                        remotePort: 3301658641,
                        directory: 'kx4c34168nib6qy882sndq1ie2xmuhjj0h0ybvyoygbc6q2wwcv9y8clnbk2o9eqyd6dnz2n6vjgxuiv0bs9q1m7kuk8fey7wb42uw0nydkgtqd0dg8s90ah2uogruzpzqgum52pzogzlwxye3onp488us8vc8lqa53afndvjwqxuo4wfrnns7hfd0fnervgrbts655o8nhnr8es6xbd6pz2lfkowmhc2q8nyfp9px1kg70lsbzvfw3unwf6klaody4hbggah1lwzhxi7susv0i504xlgmrqom1bhbb5sb3knt2dqtv1rcpio6pxywpdrd304sp1zmjy1prnhn6su3axjaa1ap5ykfv6o6v0ze54bohck6jy124b4ee8s05hb5sh32h82erzrnv3xnces5jn0if7xli0u5xexywkm0g5mnsxbm8u5funev3sbbdo66eg7ki5qei9y5du8huh520gmaf726brzl8zcqerynb22m7qut3mrawbmml7hyjrauvsnm4ez8uz9j4jprfbq0jfg2lm10s27bf8o6q48n1y0x2fdoljdemdqdg4vd0t92odvdif7mr0pz8dcj8qswz6i52unk8sj3hy5xizy5krf47xkdr5gh78srm8xnm49f8ildydsky0spmghg9s79pidy56fuxobabf8458fvacfd9lrff8meu4k0o3wzfurs2ub8r18fqzt40l4ccv035ftj1u84ztg6leuj373hzcn5o559ttfh0tjeophnei527r6uk8gj4jhjnii416cmgsutrml1pehr4sitmlpq4tg1bw1q8od3j853zy14n26ug14vzw6bcghu4jgqijod5mcssunzr2mdark49z0j4epvvngf4aug7sy1ne7ict98o3l2a08p44npu1jkaf5a3mxvs7c40j39ub9jhxmy9bcnn2t545183t3xx0pt3h4k608q4ffg0uuhaw6dq7smgsodop6z82qexj05q8ng0fb1tx8ax5ysz36swdvgtm',
                        fileSchema: '254mnecdn6gd8vn54jgp1y22rehsc1bugz5e8tyiaer67ga7i41zoj6eixq8d2ld6pc2hp8zvm1tnrgqku1o3kmtp4r835gt6aeqb3p6fseefyqix3naqhhz0jo4k5xaif8fjudcczhps445a5if3jfqfk7nfjs6xu7qj9g4ww4qopgikh5mlfdi4871skir8kzgwr7i6gpsve8te7f0bt3wcpujfy1kre5ulzxtaky5nzp7vref3dn2ph85azbh3wx5cnor5xupblkm0712rlcuvftabmn7wbx1ve57n8w3x9uz10kjqmm8nmoyon1oq0hdl7g6y9qkdyamb41uze56ejkwoi3md44775h5j03jhie3wa2132nzzqp7ecd58551gjuw5dy2f1bwgngcydnxh995zdv6txnzaisgjwrhcj34jn0qbsg4jaltuz3azorda9hanvbbdddrsctt12xhuq0c0dmv6v8av7lqeiyk4aeig9trhbqhr7e2n2ieus9091ypjll56hnsql0xnzxqimp1fowjk3vr79mx7po5akinc00mko4553kgn1idlkt4zxvt1tdsp7z42fxe2lef03u3vjfm9r7dxyr1zlof1pbyrmb5kzz9sjzgavzucp0khzxxdxsokas1pi1akmgr6ykhzbh0xg422iiiu2yr0ehe91mh9jhedjjlwa6tjc99xkeatgaizyf6aopp67on9109qdca1ajl5v281khg432pu44svspzwqjwmckbqpfrcckz07xpyykyslkfacgv2gf3udx4xkklx80pmmqxyxa5w6tzxc0qyflzqzb5hvz51c7vtyr4v0qyr1uu3hrk3vufyzvea7ezdl0oipozvc1yom9ku8ros9oxurj97fb10syp09zvn7woencdb1cwplcsmpoiqxu3vapl6w7pysf2iu0lvuxup5bycey0u5e708ozubht22jvm6w57j24zksdbwgcnx7e14k6j8ayp1e5nulh3te90pggpwvp',
                        proxyHost: '5djbyptc7d6w34f7m1le3w7jn90zo8be5pbfnmold5vh7k20y3glcrr8g6wt',
                        proxyPort: 2705234463,
                        destination: 'cr8if2qyo73zr7gev8oa2buumwlfy95f554qq6iqic2sflmdgq630k2bz6n601m3oa8ndst34iliiyrz269w5vnmfbpj0jtkedxtp0h4urg6l5f8d8phb063rixuimdenklhq5q5bd85ydomxffdaiwrlykcd7u3',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'fcojrge6qjk905nn051qxvg01hol686f7fqidkd41ce6bj2caeoqpflar7buxrow7v2uptwy07e58gxkjjffqc1bjxfn389gaj6xm3ue8i1ixmn1o09tkl7x6tx40ojg914zxi0vcizoxjwmkba3btwxn0x4hbtv',
                        responsibleUserAccountName: 'mnni2yd97fkpt39ab0r5',
                        lastChangeUserAccount: 'f6jkjwbdlsh2v2o0rvhn',
                        lastChangedAt: '2020-07-27 09:23:15',
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

    test(`/GraphQL bplusItSappiUpdateChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelInput!)
                    {
                        bplusItSappiUpdateChannel (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace',
                        tenantId: '62d866f3-920d-4623-b3d2-6221c5e15c1c',
                        tenantCode: 'q1na127cho999nt786mp9kct61eetxulr70h0o9wboeimkkq80',
                        version: 'y8jg2sbiknvxmsgahadz',
                        systemId: 'f321d9e3-df8e-4659-a1fc-a47234e36929',
                        party: 'cgsvns4jmr3feykha5oyfsckmj8s3l91fzefhtlx1lwj77f4gl63zv4n82dm52rxw3adtw1dot8bhfn7vvf25t539gfwjbjwdy3rlha8w4n8f8jemahjrkxydwtpowl0qlfsqh0uq5ti5a1vcbm473phkm3rfsab',
                        component: '8y5tk0lhrpc07851o5xzexixy0p9bbaou4sgojqupv5vmn7ui6wvr85wy0ya6m4gsvr6n00y8kddyjbdkcq2b5eel2tf653jbl83y0t3m68svx6yh9vda1357mj3cmecrpw5gxe2ti1zgmptmiwtovfhurvoxumf',
                        name: 'x0qwolla6q0gqo0j84do7w75smewojxk2qjx5rltzhbjx94txx0enlww748rf8qurvbc6juuy1my09ty0mk005kpwnkdqy1zwyahcry05vssjk8m7kqhsmrphsg10u9519yavmf8yp25z7hcrrqzxrcek864r5xo',
                        flowId: 'c3e04e66-ab57-408d-a5a0-be80e24aba84',
                        flowParty: 'eke0ry2qi1k8pnplhl2d2zs9yon7dvbg6j93os4njofimaos7di4oze5g2gtd3q0yxort2v0tu9pbww19gfwg7xflbgbgu2ipy1ukhejhyqd2lfminfeg9zfhfsbxtpcgvzq7r7jkd3c503yklf1uma8ii8pykxf',
                        flowComponent: 'o7bmxdffcq8m646lr3fga3z96agbi83ejiklfp4x7wvygelfzjkggy1xvrgk5za6vt74o7u3ic982p7dmzsydt25m8995g5ux0j71axeyqggu8fj9n267xcqz0j9n4qfaufwsj14voj6s4n5y33q4dm8v413ui2q',
                        flowInterfaceName: 'nn4hbm6mey3zlcvdpu8kjkyl1kwmj329ie5lmmk0m93c43vzim3sx97qkm291mnga6jxr6gh9gjmdqhpy67vx24gpnom2xnrb305hyvc7qy918f5gd5lig90na2k4vfw3hfndg4q5xbmxyo9vk623i2vbwndsan4',
                        flowInterfaceNamespace: 'qmvhgdb4tkp676x823hno1zuqcsh7nbq8fopa9ean4zs8rd472kyot8qnjar8z222xcee7g9zkph5pobe49uay7wu58muczsrbpi4cuduz9gj72xeqep3ukn29fta5ipmpvof7lo5m0z76iu52wfoojqpo1kjdbn',
                        adapterType: '4svh79luwgttf6khk92oogxocojx8lrng8yzb2b9tb3y4qql2f5t0rd8dckn',
                        direction: 'SENDER',
                        transportProtocol: 'kl5tf90i4lldsf85ndxfbmyp8hm8l9visxqrejvwie0yscroc4h190ui0552',
                        messageProtocol: '736bzuf2bc2j9v8cibk4ivd9sclhwy6v2x8zm2hk8b42bz8ciq686naxbc4q',
                        adapterEngineName: 'e49d5vml0vd79uu7u4ctq9meft59i4brdrnwcw1czp8v63eeu3bkw4afcc4fadtbxuerws1wzzs2hdqvedjyf5q7mggswjb0bgiz48ik6nl0xtcvdjm7l5e3l3l4rsalwv93np5szgwm1cnoqaay50s9uc09i1ik',
                        url: 'nlxpnueykm3j1ou2urthv1dfp443gtqcf8wbi0ex6i94dy3z07vb5xn30ckfbvn2vbh1k05v405ny8l655ikqax8koqmnfk6hpzbvprlh21vwfi0uwt8t22x6poir268a5pv7edrlw0f271jq05mh2ypegv7roodk1tm2ud8gva1lmacpsi0hgrktkivjanhp9sdcw29907wxrciu22w3jwg8ol9uc1quqq0sce1h7lmkitbw97modhuz8z850tdcq8md0dytu7c2ovwyh7ladgsxjru378wqlaiz5khjg2rk8sdppel8oklvdng09a9',
                        username: 't7cvhb4j83zssxqx70t1j8nkcu4sra2z2knv3pwwrhae92crbnpk39gs09dt',
                        remoteHost: 'h8hepydhypig8nrmtvs6tu12kk6ng9sa5u62rdgea7n98pk5exu3qt9pnfx92tun9v5517858dgridewcdiqhy7r0vz93wqkhwfo5zp3q7qedk28o4vwffb261mdqo7b5nzu8k0eilgskwwctlgs1pzg3q6pcj7m',
                        remotePort: 5149575900,
                        directory: 'bwj5mu7u6rqejpnor57rf0ef7fhpfue6s28dt7lsgjzfm8dn1tvl7md3q363gmpnymsgsmhrm5k3xnc5kf3ssyfx5by76qahmin6m3cez2dfylx1k4b0zi8su4p6bnm71tl0456x0940876mm5skcb3mceihqhj4n70crvc9inkl8znwkaiucdg42ix8ztt9zryj96ogb72z5xm8lvt3ni8rtkaj8du0x1b2y9tmk5kipl94f2z10pi7muefycmxu160yj4jjypf3hp0b4e4zyzaavy7ggnignfzh5oiyumkcdwpst079x0lmeqyf21apinyi3srj9obhfojck5hu1l2b20p291yhur61rvlxx2ier9jj07a51sxvpb7uh8rcvhhuobddhwugnjextsv0v1obnmfngt1pwi9vnla1ygietjnphkv0cy5g4zctjtzbf1842vz3mzrqj0d9bpwptv5vax3feze5b6oqrsgsriz0vu1kdd09bmaquhu6tzg6qng8il2fyir6hq3xxca4t3fyia7cv5xw0p6tfsxksny8d859quienxh5ycgqgs7efxy55d9ydz3olktswcgzfmitm8nozqauxcxgjz6z23ehc5nkg17v991tgcuz1h1ppbcoin455ze6eww4db45ef1g6k7blnjqzbqgw9q9tvx7umdhwz6ofyjifve8fu3ipttu52i0v7mef8siqy8ucwn7qvg26es82tjjt7gb2ppnfgwkpdwpjw28njfc46k0dqrk41cnk2u60dae9ei9w19l3hfdkmt0v80e2x2t7g48lcz2b7xxduvjueypabxlgxun930w7ze26onadxansmnhgzu8hm6p0a1dc8oz2eu9ioj0zgmerbc64wepewwiufax9ne3d4mj611aq1t1p82d9bvs6gdkxc2lax7upxdnkg0v3jybtmhj33ot57bngo5iob7i8uaamngku576bf4cmjip4edmkj2dhjliotjmw5jlfxt6nwda1m1nx49',
                        fileSchema: 'ru1ddzoc2i87o9c6mjez0v0b3az7s3b1qmrvkmf5obg8tqv1j67hx1dijam412gfucv4c2pyx0wjezu3a7qit1fhuyzdwknshib63onn61j0qugcpnec0ov3l87yhl3s7bjfscmptir23ssjjt5r0lhwf778dyuis2ssdqmgr27sf41uej7ond6juza07wm173d41h30dijik9vsfk07pgkm0xjg7wlu85afdvh45sj8g2y03672tmlxqlhlqz9bdb7f0mj31vckz3we2tz55v7oqqbp0jn944wgdmkgi3nkmd2pyvankt7s0aeq8y7kfqhtldhmkx7wv17u037d8xhndd1copiqjpzo05voni4heibkeifflvwlhokwiicxdxxny5dmczoikzt9cmywgl8ne6mkwn8ui7hwu5isw7bxhecxs6ntl11u7bpa0hnb0vzpl3cfxww16vqo6itpb1yt7uf3fb6x7p1jfgeh0ansqxmbh991hafhapsqf7ime8scg2vz7oppngq6k66t1jkd7hrj2hy2obpu4ttyec8j1q99nzcwdebw2ntlk6vydn2uqxs6ssw8u3mhzs69lcn2albzcx053pxzx61ae130brvdx14xjtlwovb4ygwhxcektwktmvqvhztn9m6msnms4y06b88k03nndkg9adpecosp2zgqbm6tvpw0oiz0dm79ync7cefxrnwgdgdwqrq51k4xfqn75elkld8b0ttjqt6d5yttkiep05welx2reb3qdhpvczr1v9ak3i6hj86muam3fflwtykiy1tughv8oquhcdac5y1m4huo7wnfda3wloh1lvg97hejpbnldo8653su9oehhhgwmy62m47fqj1mrqe56ami9cc63amkstfn59np6afkzgh1a36zl4zn42qygk5k286bta4ysk4czbdqieyssaa050f35ufna5bxnwisolkhuvuojw3rhmp0a2pb4g8dm6o1wrc07jc176dloabpy292h5v99m4n',
                        proxyHost: '964vvvb847cec0iirfr54svhf0pbd99aiivg092513fcujiyp6rdibzbstnf',
                        proxyPort: 3250374744,
                        destination: 'lrynx1tg513ps8642359akzhhan0ryncoeya0pph3lmhi8ih179djt176tlnycm24qpu503q46nvzkwc3fnco9aaqlqvmjhcyhcxak0uyr9p8zqso4kplvjargcdph3ghau3xd93xnh2eciuulchdj4qkiv00kxq',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'n3sx9y90tjcqhm3jw1qngk0yg37tdrd4i9242mayxaifvyngunajhoa2ahgiaqkojw9x8tqrlplp3vchddoqb32et548auxgh4ihr6vhf87yudbor5sjrca6114zfmcnum5egz939fdy1pzz7f619y3qzz1rj5jw',
                        responsibleUserAccountName: 'kwbhi0thwy24vpd18g7h',
                        lastChangeUserAccount: 'j76vra39toozvcpvru3o',
                        lastChangedAt: '2020-07-26 20:45:19',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('d47bacb0-494b-4d76-b008-ce74da0a0ace');
            });
    });

    test(`/GraphQL bplusItSappiDeleteChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
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

    test(`/GraphQL bplusItSappiDeleteChannelById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd47bacb0-494b-4d76-b008-ce74da0a0ace'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('d47bacb0-494b-4d76-b008-ce74da0a0ace');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});