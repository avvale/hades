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
                hash: 'v3hpaegpedb431007qt1fin5j3zpr6r6fqf2jjds',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'igmwnumwdq408iqjnlpub43a02b23m41zqxm79ykq2talcvja9',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'ufpq6elyla8cui5g6248',
                party: 'j410ewvpox7m4lyevb8uea8ck8attd2r4t0sajjwuifs5qegh0ea7lak2h84x5r66os6bvz3u4nq9bafa49muoktqlcs5ylne8objp2wmgnjx1hkcz4fqgmfu7q6gcqzms75qlvmvj3h7q8wuv2cy760shw93tov',
                component: 'uc82v0wcjk2wrwtv0oc1fzkzhx8i7a4htnirkxvq0443ecjsxsmq79zvlmw1y0l4j35ns0ci2no7ncngkowy4ipctn8x1iauhf3gv3pox1asafs1ws2heo8c400qaorhdkdcq6enhj93vsmkjb784eb5ml9j9fie',
                name: 'zr0wtu8n4i49cmoj65bjowjh64ddumtsi5wl9024wriozqo6pwq4rac9rj5eapf534iem18q7sdqbb4e6sucuxmqt7hvtuyqvngsek0f4tl9idf76j401h9tulzim85lmh9f85f1vxecv63662mgaldtvpro2an9',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'flt3b1y86kwj0dajptkd8hkkzx8q102rmgh1oirj418n43bgg1z99d20gxemakqfva0btph5pp8wexkzm67lsa8evg6so3zafnlh65239knmqwgbgmj69l4yfljw7weg7hnop89n3tgnvs9fa3wlna0ln0ctx9xp',
                flowComponent: '18u4ko146e2oxlidr8jqz7fmu8kycsvbr5bvbpqlu9ykunz47zr4ykhpxy3dukar1xnshvo7dayrtw98048y3yqu4qoh8wjwrp4m3r8cg0mc7pzz13jrokf6ls9u7m1h2xq2dyezp7z9r7u8y9d9si0a6q9padvw',
                flowInterfaceName: '0m7du8arc51ikxu1mf0nysel9y6mgqhassm4k5fe74o02kiucjjqssioaemv4mz6qxlkee3zg2acnxkm47ynhx2vda3x2xx5vw9j65mbwrh10yr2r44ks39am9kvshwkztsmzcp86q1qg4wynhyo5mvdzweea8ro',
                flowInterfaceNamespace: 'xjmrb5w9gih36o6yaxql7qt16szdul9i19hkmpn75pw7k8lishmoebm2c1gnn71dyfmmmsr4c0bd8hy1mtxfds0r8dheh38b6t63lb0mra5nh7y8sinnjgtcdhlhifspsw829euzff2liv6la1n21ds49kj23s8m',
                version: 'pwopm2ctc7pk70aqbb99',
                adapterType: '34kriob9lz04gnpjvqxglhad3vliihfvfdpbhtg4yuacf62qui1pdxch84qp',
                direction: 'SENDER',
                transportProtocol: '71nbp9yfzp86qyd9gmfmbxolxe6r74b0efbybn8n0sccmpbhlvoio4v7wkgm',
                messageProtocol: '0bu5kicay6fvpp2sknceiqngintokdw856apwp5oe9zhorwetz3qak4o0bax',
                adapterEngineName: 'qkkd29xhcqnz1mdva7ygzboty5z9lrntm6qpy8nmlhm5mg327n2vktyxv2fi0h76r1o91w0sgbfnkq2cbddfpz6jvk5420cpew2ghm53sfsbvbpt2zkvt5e62lhlt2uwb1g4f4q3ahgidvn8ygvpdked0tbpe2ce',
                url: '8r3lnnchg5qkhr3api9qqso5oe2u2vp056xmr90gws5cvl1vw3288zcvpbmvrinjtll7r1ql8bxtu0yr5wiyq1fipw1ao2ddvvk5ak5t7668o78do7kci9gxrjm61d0vux1nhsbbns14c9ohxbmw32z5ntc0mys83osztw0vx29kss4y2w3h6han8znkltiuiw08qygxmun41pwhbanzn4hls036pgawown4mv43n6k7yb030brvm0nhqhzvtofjjp0zg7jpk8c1vmz6r3znxz1z9ruo1qxixr82rubbjydqgvcu1a7vz9stlx4ne6nv',
                username: 'wlf4r54xii2f6j4ca9gvtsi7g68h8tg03opft8kalx4rs7w3stlejmymwtrp',
                remoteHost: 'vmddr4i3ntatdr2xtl9jlr0x7oj10ykxl2tjk1izn10p64o0z83md92yreolp1cmnlma80ywin4qklxg94oljrvoptci2s0wruermaz13et0ffl409xtf1w3ji7m9ul3mswg7aktw33zqtofxzy0x0887oovmupx',
                remotePort: 1141623739,
                directory: 'kwxhmcbp4s26brroysdcoasx2elykfjowm6fba4ejznmrwguggjjbdr03i8os9w8619ddezplay9lidnxu1ag1f2wgumguhqi2j2g0w7hk4u43bp0712srvsxxy65he7obclvy6m6iq0vxv3htvjbqu4l9ld7oszd887mwh0dsxa48nb89j7s8veqdyyy75vsr3779suul6vs8vh5blioqxestlnywgoecbryhciiut1kpifqtdvfnfnpx3pbsauz0pfnqu91hvhu7h7u7psnod2zozi7ynqrn6kywactxjra4u7r89asd2nmw4ahrk68492nk9recvkysymmabmkkg57agxifbow96lay2yip09f6d4eh4mnr17yvwmw9c668d48b8yry7grtl4qbqye9szguvpfxz3wbpl7251b10pxjixi0cd17aau7fjvrys59ew13kpx0dvqbecdip4b1jbsclyuibxi2wgwq1j3sr85jw6ghvv8cnlid515gcjdfdxheq48xio2d4rihl1iu5ysb8lrkvhzvozdnukktzj00lnantc0ga9c25dsv0hlb88nxjd52yqjsc0sglp7ls3inn481uu35v4ynpl4soh7vsae65sl737ue3l2wbbdc46njj12ekcw80nf9p06667cduig6b0o0ikjfocp6snregu80tk9t6cnnrz0y3sujz6zqgwf4vol6is64v0xujl2fvdc5mgab9pujju1skyd1jbe9msn53xsdcbxjz9g8w7e1nqcqmkfqlx04953pf7hqizelmirrnr30hrt7uxuf2d9bo81qv68u3amx4hcsw7yby21dpa52cie4mgd6tngm40nbjaq3calafjnb9474lmmn4udxuitx8pj6bzd5rwig1sb48ncqdh4nki5gj8vyncu7nj1n0tmm71ufdyulglsrxieampo0fk2gomp2mpslccsqbs3mmz68kx0xljy47a50uuc1yvslvnf7b2bjrqxgnoypnc77sjgmln',
                fileSchema: 'rgvdtw7yom27qlml9h66z5xc0qp55oz9xnmmfkfh4suxzbe287060yli1qy3ghp0pqy2srsb5j78o8msdh1ft8yg22o8g7j6y48jf8nm8euc07l5bzsbsrtcnexdde93dnhrjpby0cr75ofcngzp784tp3ui9geww3hgrdj0lwkicv4rxorgvota1op5arbkd49ni78id4za38nadsaidozzbbfwrtiam2z7fxakm3f11f0jw8as0hch1q34mblrot1dpt62cua098zm1y828sdintqi74kvv8mde1ghdxxsee4oqm9roccswtmonr2q1ckufl1noocm1pdsn1ya1j7ocd35j3tal5ugkdrrq1v4yxhq6ms6o2pizhe1zylrl3riafdio5fl3vahji2r9ioj8dba52uvfn8j9eay79cn26c93loy55b18pi8fxm8ve8q7ir9j60c4c6l6vckbynweqjydphaktlsxh78irw4rve6tqe94k1lgorew0xbvg7rwesz58l5ktlu4l3iw22v17n4cuwbsilswifwutc0rrcede1rmb24v7x8vn5z0nfraqqfmqpwkpx7y9lqurqxsravr10rxg0dxo756ywqs2f8t4agk8d6ektxi08lzjb3k25fa1ddghy8sp14gnu6gohvrccrvndiufauj6uav4mofdb717h42na4aip87hdi6fzz922yp9zshjhnaq75asu1v3fxt4gl2owp087i61xb8v30251z63iguay54ste1lhpvc15mhodn5gx0ufhz9g6n271324pl501h3jtsjq42m4pckfh5wai274t3mmwr1stzqxege429g8kwr42194ewkref3viddqb6ztnkgccrsgb1qt48emmqfoq3zh31hxol6h4a2pk2fi5nwlsxv6anf7xrgfrgzv66fr9t0alhoog7ro2certs02g94y0uil9cdme1m0y8bfl56dl8u2isjqm5djkxjctv97amo3a31ojxygecn99byl7',
                proxyHost: 'vmdt3pska7vurbct8y03kccj4g2ft3v71j9yroe7z2yeoifbxjxvkc8kkry3',
                proxyPort: 9965009341,
                destination: '4b0ipseoyb38nq6anfvj4sv5vpds9nxmrtmh8c1hvsbkh38vvkfua8jd2drq70csai9gs9q1w2ai1swzv1glspr3r0o897aieddi9shvjuq0i3pl56o4rzpm263o1rashpyg1mneeq1x7mhvfjz7rusddsl8s5up',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'vqe0s0etw942e82yq2witf2edfbq446h9im4wh1mfyr4cexc5fej7odqrd87srfysuilydtixxlomf33r66c2ujatmnfyp5aa1ayyjm1mdysns8aq94kfubyifz2a55komzfua4a3lnpbvlm5jn7sbukje0skjud',
                responsibleUserAccountName: 'baf71kh1661ywqdzassr',
                lastChangeUserAccount: '814xmkl0ba0fgl60tyrb',
                lastChangedAt: '2020-07-29 06:07:54',
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
                
                hash: '7qoa5r4gveyt52ji0xi77m1af3x5ljoruvpeqhs9',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'mds0hw51csiuy9jwdz64ovlac6tvfw6cbxa49q3zxeziydvz4g',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: '44yjgr91a57hr7xh53js',
                party: 'yjf89w7alrjzlekibcd3ihvvno6flmcx5s8j34s6m8jx3ex9h19dpp7wc8r8v3j39cdwlwaklrhahkgegyrvdeqrnut2idc5023bnou4gnbr4xaij2oa0j12n62vb8xljj4kekhgzpo1fepyvb2yt7dhdtvlpqe7',
                component: 'ip25gapudsrunj3tugji1qfup4w1l847zdkqzp5piv7t7c0pzc9b7lfquwqyvb5eirkqlncnk3sg0qngpg7l19zamno2zafzsn5c5p2otnvm3p9cr1z3t0vcr8bglcouwgqiwizaaudd6y3lcmo3fxmnssz4etzs',
                name: '6mscjcd2xpkf7wu2wu0xin3te2ph4187lgphazebt0n7o0yadjxp2gmvcqzqr3uxkenfdsrqdo1b9t2tcj5e6oxuts4rk4wd37bi3j7n29b3jczek91i8n1sxfqgsmtqpqm9gpmf5fyerbg1fwne17sw80eu20py',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'jdy382skjoaovi1jkil6w6jvmsth3z9hf86736mw6mbiz1u36mwhokrlfb0d8utq3he2telnm2r35kzt05gi1qdbdpsyfq5ymchg2zghrfyjuprcwbx4z0cq6d5sgz0b59gc05vq0lda4yzq7isp3syfk2vtqm7m',
                flowComponent: 'si0e0blk09jkuu7gzk04eysq2o8notgg8bk8bdg7t3etquk73yjremkse7dfsg1639bx6eoebumxu2e4y977ogy9nsdxtg34u2xzn1hms7qdgb52cwgzvvrxjb2hiintt89kbr7xwzlot5zq86ipyf6fsra4e40s',
                flowInterfaceName: '8w0363vboayzcefxqfxsiwv97yvpe5gejjb7h7fwvzkyrehtlbf2ie18mtj66j7mtbou46ve76bo3uffcouafzafptz9atvwvptghh1yt71f248yayborcdhno4mdo7aq2whxwosoblckgtfzyd9ysvu2ensmrmn',
                flowInterfaceNamespace: 'xxh0ajjka6kjn3a250qxa0kayldzsex1ymaqihjzwodvscm9ka48au6k1d863151czq581pylhr85drnukxo1qbmsga22yfapt4zfyh08jlcwwda6s3yfcxkznsihwngd1oc4u0453g4d6w7i7qnmzvvikpabmpc',
                version: 't60wok9dhlgn6fo1urzt',
                adapterType: 'iyxk2ri4hb6v8etlkh3g4elcanrw5nsi7bwi4xirfos12t46dc0rp8jhi075',
                direction: 'SENDER',
                transportProtocol: '168k8fpq2yq7rggbts189dwoo11dmnxlg8j17kbwgwfpjy4hddxq09fng35m',
                messageProtocol: 'mcziqispkbkqtoaslx266w6j5i4i38md9an9z7ojhxpvddoyy1kcrpts6065',
                adapterEngineName: 'f03rwcxtyckni9c0jjsn2niwalbvte7lvkgoduit54lmptl9tmam56hnk55tc0kfjsm0s44i66d9id6bel3pcm3ve4u4quiwtno3os513lp0r5hn5el7m62799kq7tm9st4crsmmkf0pcevv9adjgmgejzxtp1wf',
                url: 'bpi97ftnuo4736q9ilhtoqv9yo97cx9advp6u98ca6ekv2zpf4p5rt4qforyrqqmaf8f91xr2v27u2xx4bevlzfh744e64m369f3syffr9qvc0xohe2g1jkjkn1kzvq15scjc96yi4gjoib94eqhv897wpoa36anyfka7fuu9fgtmn7fhpcdlja3jsq65aboihi5lylr8mt4oxpu0wxc3gc277ps4obugqvxac9zrk4sqmdfybmth132csea5fdzidhx5qyopfhzonmk3nxwycmxuzbwvuphn2jy66us4ll7g4o8py5qx542kake0hp9',
                username: 'ig2kgh8t0bl8ckxodfxfxonq2u7vse7nm1f4f70okw1qnbkgemkdgsyzbw90',
                remoteHost: 'cameeg1c8m9md4dgfcphbldo7cvd5oms60ix6pt13k6ckmt71orqp6nzciw8cdgmtvklq96lhd5sv3eje6pz14l0b6mrb7tsv6m85513zpzxkqpsv75nflqxt9hjb5hjel20udhsvkqnb2788oqsk8j811c3prci',
                remotePort: 7564972162,
                directory: 'lwiqanjnv5hdohbokbh0p3gcnh7eot23cj5k2xxjb09phz2yfvbu0cuntsdn5qo9h93nlb6wrwukwb9jc2f0q9g6qyswnniad620uh2g1tfz5y2yzeiun2m3ov7nir1706gdgvl2snfq6dmhi8phovrii0opvulumpnhfx9m0eej5d5z7ab925t09c8mbnylj1aa8r1rjs0h35d2wk35krrclg5ndybc44uxhcx4a0s2uhwncap7jvvw8j3paz4iuesojnmm4dl3m2wgirlteft2olcjizchverr4fqvlitk7zmzbxf1rrwr7zlpmnra6xjskr6p87jnhyigfagfphpdz3lrjefr8fgnhn6626axjkxe7xisv4dnfjzg0p1g9axr83s3nknp57lfl4jecmc0s1gqkfjpkntph2s963ivqq7lv4p3ujnox62uxyztwx55m5tev5m92v5sb8rrusa7rqipek408hpoocn462chqrgf4p2d3xf0jcm903cyc1if958nc6th2x57xg7up2nklxuve5uwd4qu7cwo6dvny83sjgcn7183j60blgilxk586qvy029ztwq5scysdrco6ymz5dmy7lozu77cgmpauwo7hnb8m97pbg5dtsks9izm6n5kk4y7uciov5kgunjlb42fb8l2xmj4i5u0l9fjpc42cj0mic54hurcfwpr6p1r4nqql4siit731rwfgdb78ls123vqievvb672hinh2jtgefqx2sqb937xen5yn79la2mi5ucvgzzleh45c25d9k7n0ecq9shhavzxzy9375hqp5n25zk78a124c5qapukq14t84cic5m3z6c1bs7k31i9u4vb7ab8ndl9afiifbgw1gv5xgha95t16ev6zao2ei4dn0p46zive5nr10o2n7m5qz310gpxjrm6089ouu4flz1fh45lzrnoofarm4c8qpogjwmessb31j27vc9qhfbxyfbf9u94ntvsteslhacfrdm9xlxp55e29m57',
                fileSchema: 'bcnf9e2mhnnxx21oayf09j2iust9krjuircn2otq8yfx8ebogo5x2ca5o8q4ff4hyadzwzic0la2jcht7wfa36evbeet1tzqueygih512rtu3njklyycmbjizsajwkzlxdppk2escyu7ujrniwgf99k7ae0j91tottin3kxmudmpozj9btfme6ht1lhvuvwe30ha8t6nuibuor8039ql0vqvgxss53vhlgzps4ypbnc5pjb1rcjkb68qbjm3c54m41zhrunngstkcd5c517sf60667ow5fqrme45u39rxgbxzq4trmcai3qzpcrnqlsorft0dsistgso81xbhbj7nflvrnttn5g0ittlooofc0vnzt1mhqnwha1cjp4ea6rho9gkhug5zzofvqha0ltz9ybtuoermn6nb42lyegy95cl0qorezkh4m2i4re1h48vmvxll1x0vmlpn28uplcwt7xuhyizg14eh8z8fhaj3n1pilkft7e87oe67uqx9b04a72rrjxnavlnu2rzzx5wmzrmm3k51gp8k9ud5yi88grsuqvab49c4y3ux34rr6vlwobnfuyelreqgzey66l3xl2e2hkf623mojh9fty7b1l3b6on0q9c2785rhceud5hnij9f1d6izb3rzpud76yzgbjs0nt2d21jd7z2zkdfvk29fh35i2tch65vjuox5ff4dhnyesub73n013cnoszaailfwc7dxhn0p9xprrw3z224zrvkrrtaqi3ftruq3e2ijh4g61c16basea0ig3l7szy466kzmm7r3wn8zx9pqjd8rezyo76xtiowheq636ijy9jersydtoevwbldt3plh3s2dtlmx6d0z1vccr0jat5hjzv8fb57wpojw7yd8lhpczuvbedo42cx8trj5ilsnsiz0mr6i0g1x7w8y4jkqjhgzl4l7tgu93n11w8ky7o3z5tsozhv2duw9likf888pesuvo5ugx12b1te6lbyyk4nwrsvnz2caf0r4lf77m4',
                proxyHost: '0fft1srjlfuirybgqf3csskduuhrwpnecz4q7slgaj6ah2a8ztu6zzgnszsk',
                proxyPort: 3465491572,
                destination: 'p428k5r5ksymqjm6pkkwstnp5lcievcx2pmqdmsvmr2j1jk5jdovd7x72ngy5xoen8v0xdandh8hy523xoa0m2u6birsmvg3k9bqrznyfbfdq2mpylrja8rzjxehb9prl3wvlvsuvxe531kvkmv847kg8kf27rkn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '6ls39tj0s2x0qdi5u0m995wy4mu4w83daju6jx5y54dn19h2rm7onibivrcum8bkuxv7pu0x3pvcgdtp4jkrcvs7wp4iu48wykojt1bnkxq2wcx37eftcl4zfhrfksf5qbb1qpgtqd99a59opj2rhc9bqhak85y4',
                responsibleUserAccountName: 'b7gk6yugxmj68n7b71x9',
                lastChangeUserAccount: '3cdvhtt4pnwwqw7bflqp',
                lastChangedAt: '2020-07-29 09:01:32',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: null,
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'dcgrwhgvs78e8w1zl1thc4etpav42c0jluf52qgs8sghmmlqxf',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 's28e410o5qumerml10zb',
                party: '85e1h2rxvv2svgkdhp808ckb9zsgo0y8q1n68ly8srqjknqyqcpgldr9fetjbl6wyx1ccctncholxc0zw0jjk9x8jx4ju7n5xta44zpgz7ozxv8tzj0ztsc2yl44f77cl2oi6ymyz3yxojimldd48lpdatwjf4j2',
                component: 'jtj9pl4vtulb4cl6y23vnk1aneg2an5kb98zn2q7awsvlsojlk98az284bldu6i4sjuqrpuzwaayr0sebhrm12cbqjmsmiytkeguu9xfn5xgx6z6m3jjjjsqdb78jbpfiio9nnr7ilro2hfir1bbe1r754i4x2fl',
                name: '8dxevpfc62yg80xsq476jvm8yh8w44kdj1bmnz8grg0n44d6wqsguxezn4kz7kwfmxzatu3qmd907uc0s5fds1abthiv8kieueot4ccy32lzpe82ve6iuk4nniremxykl4q55qm1gufk8y0sgou2kz00a608y1vu',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: '7px9rj9qslye6newomomt4whptqqbr4dk4e8bu8t883xhqsqrbexr2tndlu1qb9e6y3bt8a8145i43adftdbywepgsc26idl2lym4gypqzzsisx758t8bnwcu6xcsxmlr7zedmcu9nn42cx3qcmwp8qnb9okirkh',
                flowComponent: '26gtahmb7a7tdetzp2mujl128os4ilqw7uq2qm3lx3zl8pqb7mio0iocqx8wuhcpsg1ksrx7gk27uoz5tajhgi220t7xk0fs1y22ci15gj97iftdmikswo50t8i2zbp1jyu7h985ki0rvbom3jiyr65292zb73pp',
                flowInterfaceName: 'vihwwre69t9l3j3dqa7rufmbzzcwfp6ukf3vjxp2krl8ky8itmwi9yqp9mgmlz5d114c56i5lm28haj7dee7rjka74khfxjmfrp14o7ecl5zovkyjgnesyfqc9rajf30flqe1me0jxt6ohubx8j4y4uwl0lzl534',
                flowInterfaceNamespace: 'ihqgcggjwegzfrys6fvqd9f16qsfzm92iyrgx4ilv0jie7wutl83ttjtk8m0q2y018zl0ttqqeieb1nzpbuf3m35ml4iyxv2s62bvk1wfa7tz5fghzraf9p0cr3lu9snc2bbp0sksjfw42kbyz5r7rgl2dk2xxs9',
                version: '7eb1gdl06ug1m11ef3in',
                adapterType: '0jyfpqwvnj29cj57rtc2v9fi6iuqn0hwnjhtllaz0g4mt3gycfy06sl2dpm8',
                direction: 'RECEIVER',
                transportProtocol: 'n7v1ax3zwfhtg2dynp688npsbloyuriyy5qw540d0u07ezug0b27wxl3jrwt',
                messageProtocol: 'qdd7q5ly4ag6fjhgwkwyzzp86zl20mm8zh5agdp5ccqagwt7b73h5aoqg4rs',
                adapterEngineName: 'p4skwzhfiz87avd87ezec1zsw4cw1b7hd8278kvhesd97z1x3o09htkpmpcmpxpa6z1o9g2z21g6blkdtyf8oveojgpjfpwbdk31s844xacsm1coqblbxi3619n7e1qprhyjqgfja7uwk2eyz22g9pizecjd1qff',
                url: '243k4sbt4s5t8xu2hc33sa9ywpxnoymffhaxb0rr7agghm8knbe3alzyt9rxoc9zw4wmsqo6skh12ktg7zvwil75s9l5i4lcoe4ubt2sniclpbjmc5gilnb87sl8rg5dq60o8ickctjhb1cw7yzh84ms9vh44womd91lfzzpxuioxs21td7d49qpi1f6fefektyxu7fthk4ds9q5d1po940hcrsc745ch4ljb9decbrygar48nwwaiwdc75707jzkywll5yzhhc11a37xj2t9z9nz68825bamo8unug8qskc1gjmfvm49yzwr7cgo2g3',
                username: 'deo85kkhhnwr8p35b0jgdn9pu1ljuvrwkik7l0vn3kbb21a2xcgvsntne1ts',
                remoteHost: 'cegayn5yxwvrlsvtazd86xs7kcdssbqofcchrr22t9qfjafd6tquiyocb5ajxb4w11emft3vy09mix0jt3y5j0kxx6nzqsu9gdz15mkedimbfpx5g5sjsabkr6b47ls7be24ae3w1z0w9qurj4otv3x5tc0fdnwb',
                remotePort: 7140178099,
                directory: '16yjae7kl9fwbnrte16dcrfgdsr9id8a9xy0ab6oecmujbyh7huxcoct9pe4fv2r7061d18z8hhe59953kxlha7xf1u8hf4fst1pqqoavfhrcv9mq1mayztuxuh8pm8a40opgbk8lc0h23e5wzbvrdhvhdd0hafbtcc28oke4gzycip12ro6csee1d9nv2ttw0x2mukwqtqi30z7oyfwhrzqhbj8x6iez5kvkmlj8pyoavh06wicsjqgd6csguhtxc9bpf7vznlkcdf8g9fh9due9s9tvidkqgtne77y8k4s160xa74mbzseymu6o8jdd9ea8bql3qvnnodejf8e260gduneoxnxi8t1be6irnpdpd906sgk15rylrt6wjapbna3qhvxg8m56ykhtm6l8eu5n84z3u8uv8pqu45g2ydsdsyvyguoar2ydj8ufeltswjo70fy6v2j9jhyzvqyelzhpwuciejgrm77eq3jgdi5z0mola28pd3jskmoqw2og5dr9hy32w9yzyml05odgff3v3pzx7632zlp1fcgqxrnhe1th4efoaag1wsbn8yyi3f1bw1el6m9sl32r403bdmkn7bmr1n53w6d2jej8pm9qosn6frz2hjxo6h0ldgiukcjk6f27xy1gzedy51z323oat7flp19v8qdqpg7bhstparha2v140rongidqa0zsljk27j679dgxw09cx1qox7l597w3107h0scki6o7lxolncf4bg1qsr02c80dl1qaly4vo88haavvzwacbk678av8irilx9fpm4aw08hwip80ez9gucfyko1de6kxadx3jmwa4cirdwrsuubmwpq7kc1buazct5yfe6n3fzcrn4u53eod2n8n1juq1gplw300kusft8whe9hdetclicb3o43e7ki0003jtqwwajjlg3xyvfgmi6jzurvgnu5qo8hbgbh67y1xaqmiyysulagk7l37uei8cgp06pa9fc5o91owt8tqy27o1is6uq8hki2',
                fileSchema: '4ijoui36crancuj7ru2hu16s9ivv0yirf94i6kiqiojkz7x3kvewl2nminvlojmpnen695ocwjhulmulosoickl8mumd6xhxzh4w7srzf1ksmidvy0onwbeicx0aq48d52rzukjupkdblr1mq6g1j9qxq6qxbioxsxr87ogmwm1knb4bgfk2m7rwjnd6udsez1g9ara6yhjbe16mxzlwsdw3k8rap1zt8q1jr4til5iifkaalxrdcz768ro52t8ljr55e7l2iv9879ii160cdd954bp9b5121y0ovstfv3w5pjzi4nc2xulcrateiem6w7qx0uxmbuw0rasokh093jrim362hflgx4z9gja63s9tp3egtv1wl5u27uegbkk4uudxppsrrbc8gatxk21q09pnbhxvs9tgxs3g5llr0drm1ov4an1c251yqsg1er1garyczmbckkxjgtuiu1zm9631zi7uln80548l9t83tytn13avdwlwd542jbd780nebieoo04nun74zinn8a96kwkyrajr91y61jvy1isc5v8kgjsf8sgtuab150zldqakhl2j2gkslzeayad7li6w5zxkf9a7nnz9pv0iytzt2axb92vq1kqt6gnhtw8pby1uzehwp4xhv70tj6n0ak0nt7vjyaphezvos537l23jyarzw9w2e5pj1fehafkfabgdjdgbpxmykpkz6ug2p1b14ee6nardc9zttji77frboihdp9qy9dq8399qrcpsinoq9vu7q5puhhlu8bv66ogqdo2p5eawk0hr6hwen126e6yh6o7q1iaht7tdc1whjnj826hc66b5vw09xfiu9nlau74q51yuux60jxw4vh94iiazr6i17gotp8j315i98ae7ctinn5esdnyfhkyuwvpnr9mbpnwulzf5tpxsbb0g3c2dxv2go9uayq7mov3yjipqq2q3c3xaboxiaa61o40ftw8wvoqx25nc2lebj4inpnv9gbl1dywqmo8pb3ecj6jz',
                proxyHost: 'jpbg8xgklfnto524ylds7vzfsj88k3prl5manf4apj1bst60k5ye6965wl0u',
                proxyPort: 8763254482,
                destination: 'zbe61vdbunopdy0u1knoxhuihw5a6szmaopwleycdu6vqw5c04crvhuthwpqzoz7zqqdv499z24gdsmfkwe9eg36a54jtd8iepb5hpsr419f4fm1xe7uuhl6ff30qk3zjztp60aq62cx02t4nbipzx6ca0qrwozj',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'gg28d4bb74cnebwiryg5zaqzjg4qia468z03yw9rxyk2bte3gz7eviqetie7jteka4186ypmuu2gjjrgpn8g27e1mvkhv0y9ar07p9zi791h3y2pmo6veg3xntnixau8e6gahgdyis7orqe6kwz0dktm66h7q7yz',
                responsibleUserAccountName: 'aebtc00h6vj33eyt2cnf',
                lastChangeUserAccount: 'fngn6h1ubnj0k8joaljp',
                lastChangedAt: '2020-07-28 16:57:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'b72na2i9n61g1l41mmaley7yqabzkga6nqcr5ib7nuk028oix8',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'hev9azuu0lsf9ccyk0zy',
                party: 'xikobfluf0mx6f5mvojr3nriwb7nnzgpnqvdjoakjj9y4rr2ifotym3psh88aec98akcch6tjn34gh9bx3jd09zo81m8itkld56l5ajohu7qb3kvijtiooza95hg4wmxp11ce192himt2r2brdeva7p5i1k22wms',
                component: 'ombz69mryxvplb6wrx9cr6f0n31m3mufd6kei0jtqsfqvqn8y7zw2hy5p39ipezbu0wlbrr05if80u51spdgrywzq8ssad4h9e05ecrsptxnvx8fb9y9zh8qpzchlh1tk7w75582cbdzmjsp6nnrxbiht2150m2s',
                name: '9jfgl1iq5ayf41abq3eeuwukxq8e4ipj8cxfefksahb91u4bo2ttoe02o2nyaecohk2og31mc4lubs6dhc4qkdk3vkoj48gh5x8u75qrcfubixyllhqtdemktniwi9ket33jarj47u25ytw9zfx3phflq2j0j7fw',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'e58jnznq75ntfp635etw5crmmefcvpcoidbcxakzwad633elgid38xfprqkgevw2q50glhwzair6ri2iaymuahmzelff7ont334jufhrstotxni703y3952r1uk094fbxttii9pggueyr15y483dr1uchrxjqi6u',
                flowComponent: 'smsxhz7y8z0bo3tywadrxflgo3wk1c89vksgk9gzojxhvegwzsqitmxpx3flmko1hzrtsefei919sc8t4kgj7yf6o6zmpm6ei2elpv5o91pesx7kmueu2qje2x5c5ga1rfq6ns12sjpdhjdbfosagrgj8wz3glzd',
                flowInterfaceName: 'whq5ledfepdhqb10680oepd9ipruo8mgza8jnl2mwj1oqqrncot0kzu01qqr6arpitn23flpruygee1sdt1xq94z8xi5tmbh5hqohmbdkxx3l1umkncd5dk6cqw6zm6z520r5ff29bxicjtnuctgvy39e0iezqn3',
                flowInterfaceNamespace: 's1q6ed7or514jkmv0ewh7p0bv2bscb80iq40e3imi0ta9qc61hulbtg5imxc2hvawohprcywd3l85qkktzibsywk8svzmxd57qfs7mdodeupvdrd5684iingk4eo0dz0bxp1f32ix9yip6jef52jwwyznr690ob9',
                version: 'f1y0uzz3kmm3o4cd170t',
                adapterType: 'az7fuwbd5ldf7xs3uxw5i911j05g1cgueaol78ryo8i8sru1mot91tpsor7w',
                direction: 'SENDER',
                transportProtocol: 'r6jmofa4z573c2qssc0kh50sljl60h36tuqxep3oy9a729fd9yb65sgxy4tv',
                messageProtocol: 'gsuojfvc8dvhtu52hlrs181m8j3w0y4bpnunjy03txlq4bsdy71esf1s858b',
                adapterEngineName: '8ylsaxy6uqio81c9kqmu5y84xnn9efxajtqwjij3szt4clwpl9fglcvr9yn7n0pktmw4uwqptlootl1awzjew24u9w03i22ewhb20v79ahapv0zfxstrsna6um1cf2q9494rwlzr5hf8wk466vius2bysjy150ba',
                url: 'kgasvp7q88pf2c2cowqe58c0notv75xpp68p7of2by8x2ioxzu5tz0nzgi95hkwddi29ywjbsus5hpw1burs9r1nbvtmto1zmogfporlco22mrdpg9vf0mlotddne01zqeg65z3t7tmo57v94a2z6v9b2nmlxujobsqyt41f83c7mpn4ord9ddjmd1zgen4lvqml2sf0kdspx8fe1elgtxr27ir8vn9sxhyitkox8snau557fpl3mxaawu5vj78079d4v0ms0ylapw5627qrgxu22acvmiifddal6vvl8whsqrvhsy55257hbs7uefw4',
                username: 'jvf1t6g2ajdi86x34gtvro07qfz3wo109kx2un5z53uyo52s5orprozwp1br',
                remoteHost: 'twlgawp1lme4ynbkz32joexv79i7n4xsm37t3472u6si8c47i0xd2t094ieh1ycgakkp9bs76cawqpqcs5bpq8r6fixz17zkqb5eavumpcgqvmj9ypretvr8ze8bl22zw0zod3dp9fxaaxr9xz6mcmm8xl4boxih',
                remotePort: 5130362154,
                directory: '38bzg06srh1u8yllurv106s6r0urv1mwxa7ql7wvboyfbkqerfbn3j5rcawmafml8eta3dgy438axfl5z2rj3mbr406xf2si0e0mr4mw9icvbkbjmk9n7wql3aaa8wsq183ag577rzdh7dhk8rde2qfeh3skcfzz4ggtdv9l5eex44iiqz1hp1l2fl78kbr4yfwj079kahoef6asbb996jmzk2lp38rdt0fxfmdhw29f1kqqw7ycavcapldmhuqh01eo7aifbfgy8jyckik4a4fha0kcpvjqqpyrm5z2gx9lxbxxwe6vo4sx1utlaklib2pug04udgoh7e5fkgybbmkbgmd3c5jqcpn7en4oq2q4mjmi2qe8gnvky45ykcd4ltpyz83z6h1kwmoufz8jb6fjnod0kg2pm2py60s84ipww8hob3hbx5iq9w9u86emmuw7n3g0qdlrz35x8ushhkp3r6biqho7xv7qpheoyxxza25oj3pweicxqgt64ll3vu5xvbyih4e9obe3mzt7q6c5odkhka6wairfzho4ptr65bfsya7r4fghlxw5tqed5idro5lh8zfz7uwkyc1l3ph0v1up6k7c37u1w1fyllumbun88jc72l4d9d4x0r5z30m651otljsov0mllychunxvrjjcbl7l7hlua5m5bzamsn74a77yvoumm56epqf1o54kb37qqv532veg5hqb8mxb5pwa7jveb9881ph6f9u02nxd5bu8basn4423mqbd3o4jbkd6av5q2kq2t0qe48ic70ehrslwwquqngb7pgxlbsqhjsphc61z5anxl1tp0g43dejiav3yliub2vz4x0sbkc1jyyivx6fmd2g6030p8ws3n5mfrasw47n4oh420ya5jmk2qh6pjryt0vbkay0lqpu4dp8a1b8gb5uv7ejdbt3jgtdtqsy39c1xyb7d7sgsg62xg34ntdz9hhwcxe1cor2tdq1z3dykj6hoj8b8z44vpm0ybx7kk4yh2aj8',
                fileSchema: '6hk2xj9eg5rmdpsr1d3o2ual3gsq5ipjz5lqxcxq8051vpd7lrfb9o7xso1iirow8dy7el0jud8cz3a0wpokxmfc7lewhxelhk3kvap9z4769igyq211gf2i7s0egwlifq22j6kszca647tsopjqhnhpli3rig42lphp4bjg98ntb9r8x7ogs0obrnp9laaubnwe55s58pfd7u1n022hrkx71ebz4fa18kecdr1xzkxsdxug3f8qlvopnhyab327r7tpaftwi4zvm0bfi671t6kfgy0abw9sdh7hp6im5j8o9s07cdw9x9w9x7os6jjudtoo0hpqzllusnbtjubf9m022wwkv4r6qqm1wb961714oh3fpaaxyz5tmwuv6nuopd15msl3zmccnva8a6u579qkyuo9bkrchi7tsde8jdiejhlw3qxov0cb7h9wp47f3falh0saz5dwuhekdq96fp6utt5cvf06yv2shlazi6ac2vny4vwm8o47rlujwd75sbv488xssh0fe34t6bnruu938b6g0viskd2wrb0nh7w972k2qfwdu89ohueanmeauizvui4f21dli5gtf2xmkxcvj7a1gpumha664a14et98uchv44zo26aqpe8dzkvfrniency2izh4h1wofpzrkliq1ve2u7sdppoqrlzf4ad1we0t8klp0quh9c0ch0qagsi7x8dfmgs4tb1dtuql5avpyi3hxlhqbmms3l26cldrnltaqb9jrb3zg9hxppf2akaigqnsr428quqo3jt9jjlvwfrik9l4wvw3aa87cdamps6c37kd5nsp0smrzif01eaexao7hapnqzopte0tis043c36k3c82hexckytdqnyg4019t95i8bum9nbpw386ru5r7zbjd0rpv71hz5h1p3x8skzeao65aw0wgslcal353pcbakbkr8ns4nu407jrruhz31wspehfmcjqnooeqi5vgbwruekq9ywvr321boil95esaqtmjbfhg7zb9yu',
                proxyHost: 'hs6rue6t3ikpxugj4v0ot1rf8mow2g0kcbm1nb039c3htcuqza0uttmla70g',
                proxyPort: 7446138997,
                destination: '3a57o021p1pmiybvgbooup4tzd11b4tedjs697jteg7vmd67hsyreymytqdqo9ihegh70gh1lqspkqnerqzg5ulw7xe09zdwpj7jts13p34dxzpl9mudox2t1xl840xvoe3iaa8hehj2diyqae29ttr3c06gnk2p',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'pnonraewqlt8plutybpuj62fvyk3oecsz8jnxb1479u44bdg8xmmtc9z3i4p2d3a6n58mx1kal43x0cb9usbaimq0mnvh2xaoc47srxd61y5z4qncii32zmyxp2wmv6j6h31gexu26sh7gk3k3hrppgyw46rbof5',
                responsibleUserAccountName: 'dovlosqe8wjk0fyllhw7',
                lastChangeUserAccount: 'od1bhn7a6im7nwzn56pr',
                lastChangedAt: '2020-07-29 11:06:54',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: '868jem26cemj3p7rbs3hr9n1zgpt3kd6t3oacwku',
                tenantId: null,
                tenantCode: 'j9va0c89xi5hdyj3h1seamqodk376aimj9p4169zfvdn32q9pc',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'fi4kqyvtbmaa3gm2eig6',
                party: 'bi4reydxnj5igilikhj8alevz0bfp887aigdm1sd0aof6ucseqotpm3zobtleceozn6sbyh32qdrvvhix5k6jtr0b5tnxql1pepeh4c8v90xm96y37sr9zk46xhs7q430pnmf6da11ipcq3vse4l8db6n9qmyeng',
                component: 'ijjc70hwaenbwu5t5u2asw75469c8rmt4okanpou7gpisaob8d5waqln7mu2378cgxyuj4yypp6dkiko5xuobdmrozdjj8lwuey7cl2e570btv1y9bo0ro3hklvsl14pxzejz5njh2g0qrjs289spepkoslzedyp',
                name: 'wclw5ow8cf0p26lrqca16a12mbxboi5ulau7uv3w126igljw6c7hr44rvpfwvqlkxaqafpsy2ilane0ac88msd6gmi25w9opx63xom9ykdpz6kosev14y3t668ozvq7dc74bh27enbmdyvqnrg1xqjteuxo8jwhw',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: '4cvpor78st9jsdu4o5rnoynoedn6pb3duat9aun8whzyjbd7hwa31m2v4bwzijk3xkdq0o25ogoi5ymqat48tn3qprt71bgmjqjnrvt7r9o8lirc0b75vug3aryitg44lcimsjcmsghymm9c2koplccdgzmt8f2m',
                flowComponent: 'dild1xp4b987hlm48etxw0b8bwosndi18box0roigjmwewl9m8hjre3et6v65y0dj8ktne82n59qudukz6wxrjegt1328c8gzrg7fhclaahiuqdb1dlfs607u2o1q0xrqzb6jre374ou3fo5vn1feqacdnqj47h8',
                flowInterfaceName: '18iqlmahagqh0qdyjzviqs5bkfx7b1r7pae8eo0zfluryd6ll2crohlgfp82u5dwoyaihytn0zpqihobx3ecsfaonyk37n7uflwqdedlrewpx3klv11zpq5gw86fwpltsvuec9jvpyq2xjl2ns0wms2bm60zl1ul',
                flowInterfaceNamespace: '7nm0q1u6ggpz87fmm18wrntvkr43zx5390ur84ktsszxjg7mm4jpzw88d19cj8t0lxb3s660p9d0gfjc9ccqhxlnwges6uw5x6fbi1mavx1pobvhw6axi0d5f6jaeqss8b0ytllyn42ne17awjufm3fvcp0hkpcm',
                version: 'cuk6gu17n40yvumwgvpu',
                adapterType: '2qcjae3yd8mtwe1tfbbjhdjzg8pcnfjzorqgvv6kq43v10bs8syhe183ilrt',
                direction: 'SENDER',
                transportProtocol: '2i4ekoatkti6h9mgxpnz6bqn0zn67ynbqyzgunwyutgwckze6tuo60quoef7',
                messageProtocol: 'sbb8i7p97qnkdwb1387u52zgbzucbqyc0bj00zlpqypo31qfc7kmovei34xd',
                adapterEngineName: 'gyjv9n39uhcndwzah806dut4c5w1bg7iid86yy9nyshctkxdm5st2yuo67rjrmiq3wp1mknuced3hjm8ibe78tkk564m6w3m6m5fv1tgrwf9ocv9wpghucwekn329kdwt1ntq3hfvq0uk9tnakkg2fhixisivmlb',
                url: '3t32qhrek9pyxisqs8hkkntt8sbn675hclnuat87uo95fhywcbymj1di7pgwl3s6z82frkvr05mqrrvjs3fpe8xzal3whthram8st0bdhw6m4g1vli9yatsj01jq8vlznfnsi503iduoeu6yq1agcls13r9qq8nftieurd1sdl1i8zzxbw2efgpmjlbrdx310aeg15f1eih2ty0n6wgxnxkt43t7qss6pmc0rzqxmf20n15hkhctm6nwfzqjfecps1oumou5ollmq0ez1gphp4oo69ejm6utt78wgn3u7bctnh8opq7v7mu0rbel0fhf',
                username: 'r9g4rrgnk4nfqf9c0vxtx9kyt3i59vhtwv153y24lqrvo8svti5pzab3j5ks',
                remoteHost: '0bmaafinkxst1usd26s9whjdb3npximt2vw7tudevazb1dfd7tw4w0ybw5g3wohnpze0q5wecoaip9c8xkjyj21dgu47ob3ksco8f7wccmni33w5tqqrub7a21cij6exxpt2pjj8llnf3an62ju5fgfzm9cqludq',
                remotePort: 5567389487,
                directory: '4i4o7dpdqq99oa7a2e5l2tfo6bubk43r9vht219j5tvxpbvrebjrraeiyth83plu9x5ya32lk0183gm129hqamrezaxtk3y53q6ikjrsygl2qozu9d6ib5sa4mf41mygwcuvht72mlmgns910kaj0b16rti3oc7s3xz00h5nsl80y078r0xk1ca9opnl7ed2sfu6bjpef5jm1bjf91mz0we6c79oysvqe1nm9oitrxfou1b6kdu01q2jwco18zvf8592h5rhye1ckaj4h6ums0o94ak4s0ilhijmybhhlejtfz4pbj4qgc4q38v1jamu8ya7hyur8fr0t51qhczf5lzga6rm7bxhi2wyx2a5u64gdyooruwnoe6goqwmutzher2qz83ppfkizvl3zxl5svjqv7iky8h1v6mauxem9w7fr80hhse9siwpk310w8jcrd0moxxy9v2srxwpf5o4tx6l22kn6h2saj3hikx40kizixrmt79wqjwkcwbm3bo7znd2xl4cjzd6zurbvra1wih4cnyv3zd89tjltf65pam70r6w6tzd003fivnoxhcl3978w6dhmo8698aub251mo4lrkc5e63sfruk43blgrenbaf97ls724rosql3txl8mzyqar5x4xv9zofwn74zolzau0hs57vmxrhqv4jqgtum9gfbwvumllcxggf2bt9tjm0x8codbbiphjufjpb9juf4p55oqd2xzg4s3svdubqayt7isdu92n3p5cmpeuw39zq82dmr48evk9lqa6tcf0w8y4iod24v31uu5josm170b3k8r4gy8eylllpvxampos9hlan53i0yccwisnf35qct73ru3edvlqoddra930mpj33zshh8nu9wpeluiv293ikixq9kyeau8i53ad9nvh4rctqf7fvxj4ntloxhd7bms61cxahnzu8p6alrvci8w8y6qrita4or5d7o7bp075fuhxpxtl1yk6kzsjb7yh4cai09xwp7133uzd1pmhnw',
                fileSchema: 'ejl62vc0ckxu9kcra278n81zyee064yj0yqamifczbnna7y20fyo5gnync7x6ollm8bc1eu8lvkmsw6hy6j48fa9mz4jxgpk5241i91bs52hd2u3kfzuedmyeha35a74ydn75yx1k1ryg7swg602jzmoo3du1y3n37orqkhushc4yfpdymt6q0pod3tbp7drwve6zgw6ezmmk3b1kbqrc3guhg1ykyaqbb5odm97mdpfoi0jqumruvsyneeh2plnssyxskqaj55hng08ykzbcceb5ei905vjowb4roeunq71jpqm31jaii2p971rfbzqlc7dev72q2hnyori2afrz3rw3edtfpgq7crge2w7yf4v230icw0rdh2uge7jtthv4wuim6drffvngqjtfv1p1jdndzia2wexe512tiw0n1hujstnyse4x0mind0tfqbd98qe78m5838k5cn1qagm68cqmqs3qe5i1awlfvjivijtz04ks3bnjr4e7vurxopwlipskkvjoa0ovkahk7obuhty5f8vlg78wy10rc8i9uie26sdwudcj3i6r2fqmcdzi85bu3gkdlv9zyyw8h7sr7zvpk6psg04osn0l6qk6vwa07thx2lo90oczrq0i8khm0q4a6r9ngeil6eg6fv7ajr9u59sl3ao8w3u0h1xe2hy1cyfnz4wmt3l2ibmjfkdaq76kjj0sxe52xnxzn2kpucat7pzs5hoesoh6w03fzcvuk9on91kzf2firud3y096ss5s7a38eihxwjfh2musx7uym48z9bjlp6hcm2uf2v1p2q6c7j4r332ihz7zg88noi9uq6ba6r3umg0g8kmg0wv6j5a5rhqu1vheopxlyb9xrfbz2njo7z8q3cne74o0bw5f5or28p1jt5lz2bo3t1gz53hpie7fugto0du1zuy2kvkuigoq1z12sobe9mpbohkgm817c6kz0urhi1mdcdbf72uqs56au70dpy6nawso7vab74dbpvsbxhslme3',
                proxyHost: 'fzd604bi85pidxn8bpqiquhkivaa0z28iaplrki5vxtrq6hgf1y7g0a29vsp',
                proxyPort: 8068467554,
                destination: 'lru1n7zwlcpiwznm684zgb6hyoy66jvgns4irxl2iv3rzrn4job3efk043ntdo2v1ggfmdwbfc6useh72wcbgt187k9iqu35umk3pwc3i4sexk1m6mfhnjzxg8z64pr0ejn2rjpvxqcp71nkrhh2fyzhcfp5r0if',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'x9r1esb4woyouus4s156r43h24dj13clut8binau69bs9qdnt36j5v9jhphbsbufn22cwrb270ywaiqu33yngpxznhsw91nh4aft9npitqyey7pd22ia0g5yzdha8ftzrwnizzt52ll77mykov9e217cnpr2i213',
                responsibleUserAccountName: 'n74nv19frh2gfl437x1j',
                lastChangeUserAccount: 'r33r05dp0ctkgk1n4mdq',
                lastChangedAt: '2020-07-28 17:27:43',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'f5kw8uje4lpbgj57gycb2vqf4f7qm68knkflutmr',
                
                tenantCode: 'b1ynvnvaxj79am4qxvjow2ziusmb8on8efkwr14gy9kti92vir',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'oqf4k2muc7t0wttuvy9j',
                party: 'ptf9e3li6n69vgj9ke9pmmunl6vig0wr2d0592hxao93m4f8eibiqqqlrmy9pozwscxgytckdwbbkzgj9959liizc4qsrmrys20nl89bs0oym7pdy3f8swx3j9kung0djlzgrwa11akfjb4samoqxxfj6lk8inr5',
                component: 'kowh4hgaxnx83ayxutk5z8uv2gbgftqo65k1udjkoe60huybb87ksdick4vgwe3fshev0g09eaybdz9ru4anwekkqw8qwihj2dg39epmhumes6qhl9ukzg8m89mvi4erthzarbkt5xmo8plk4217dikkb4889hqb',
                name: 'c7j9ycerixnepbsb8wo3khriforq7doj8oyzlx1tgxapnr3lph242o3agxomon8bysutg94bkw3ezc9sp0cccsxc34k3usn7f93z7ito0xo8tudr139njx52wopj6ic3lqnihzamdbev2ike5a1kj2uzvvgmupnc',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'w0ufau31fakfxr5obcthqvf8f1u49c16cigy0bqzj56it9jyyxfh8ig3by1tp0xtb69xg3nnf7i2ujdsf3flefo48q21zmtwvtobe9e0iijt1e9fyrir1ninb8cj5yk3uqj515puuy9egqro8feehydeu2ngrcho',
                flowComponent: 't65iqjwu0r9y1d2kebtcq3y3wh5t62gv9nxjqhgefz261beqdnrxuxkzsb0z91rgtaphj1mcjekt8xhevpcd2te51hazjtcg1cb1bez7wqbhygd1iz9wegczjduewolk4aljph9ekqr4jyldcejs7sa21wn2gwna',
                flowInterfaceName: 'wp0zcnkpzovi08avsj3c488j0chu8e5ufsjezwv375qzjci9lc4k4et030bp3jfg4c3hh4e3fvj4i00ih3tenkh9ujnsjorbxblwf9s878ah6hizku3mrqyeoc6svc4h1a3wwa6meqhe46gdk56i18pjic74npvf',
                flowInterfaceNamespace: '39qvsa6why033houf9pk352q5ue60z5fwx5vhm0xvh4mo1r7luyrj8fmog6s3vqjhm7odg6h5kljd0ikjag53weqvlsi03vj5r4mvvr7oec7ysp37iigowi873lxh3cjn51pkezwgz0gfydua5zzkzviq83avpop',
                version: 'w7ozrseu1byofu9j0qnw',
                adapterType: 'pjojclrbuilj4mnxsprs5jexjtz1voie9wh66fr1cx4husa0vcz0jaqxsj7f',
                direction: 'RECEIVER',
                transportProtocol: 'mj1p010k1kx6orpfb2m7haaabprqazlxsii0q8a0didvfva8r075z2ihglk9',
                messageProtocol: 'oh81hpubydpu15tsil0xtgqbks05j89q881obzy8yz7fzb40p22qsdprz0cp',
                adapterEngineName: 'wqx0ui2cfv7epf4v1t3375iuqf92444ihbfjuk5f4dbnjs7piebibctk9rxwxmyevkwshpq2rbbxeyzheyi76wt3460jb04pd7upyzttz5s8wascym2zj84j6bgbbuix2ain220llk79rlnbbl3xbeha0d9qyf44',
                url: '5qmdg1630xka6eq6kgsqgqsnd8cds61dk0xqt8ooicw02jkc79g2j0hngnedcf3gfra8wkojxef324yu63l5c0elhawphrzr1f4lbudjdx0v6dsqykyadp0vnnz7crya70642vld4o071ejrh8tkcki3sejehporn4e97507wmxliww3x0y95u8jn5whr10yafrnqc8kfesoaof8dfb4rp3m2vo9azidd3rt6bf0fp1jmc499d8fq29asfn1iowpvkf2s0ueykhgmyh7a5ii6c0qvk2z8o40a8xalokk8leq69daxb3jr5av82koki1y',
                username: '1s3lupqxmxvn2xg7rtzsq1unkrtxipca36llzh5wqe3eugb4t9039u2s9ajt',
                remoteHost: 'ky4eznsptrcdjm655qmjmaz0qyjxppjz50je5sreofezsppzuvrk5xpr5kzn9k8e55ke5ro55isvnpq4xl8f7p8jesa30n71w0dmj3j1w35ifcvl22ov3bj71zl98d1x90estn0rurdvo3r6dlyf3rzgrepy26q4',
                remotePort: 8176387050,
                directory: '1ccefwq05iaj4vihy0pasgnp8z5mawssjjos1adgvjmd4xp42xb9h6cdsxjxechx8dnzeftyec2eauc6nxu3gxml4o2beglak2v4jxt3wxu4qyqxj9v3ylpf42bext56ximjggr4wgcu67fsud6oo2rd9onh5wyeflt3qsp4jq4xff5yn2n1vir6mf9w8q3koikcji98g7er1g1hgxv4k345y04ay7obb7wc63qmdni4osqtabbrrqhthtrgedsx0welos5v8kdytpto1po6heiqct2yfe59yn2z2n9yl3407s4jeuomo5rgxr6clydqr8wi7v7id6m3jl76a8qmxel3qp7lkyjvxestzhtskdc4ktuycbq901rnakxgys7tze8f6kzlt93ewfgekspkznhslp2kb61k6t4bcsjlwe7v28d808pgjs1q9kgcraldsd0ukm9jg45xu1sqzs8b22ku7j73tolq3b4kkyhwyaxdiasn1dl90ejxwdaft16vvf43ksbwp2q7ldfn32zr2v4c3esvr6uk0is8xtx14cuz6e4cbcehh8tg9kl6dbiywd2drxmu3zyw18vhufewnq9l0a5agv4ge4cu86ygt7jf8xm69dy826ajzlg1ftz1rjfk41trohzl79vns4nja784yvqo78e3nduhytxmfbtnta7scvj4lam2qfbyk98mz12sewxo539nnebzkear1uqwgex3hkv22q2gfx8ojtivuyal6x3f5qdsp4qp6k9wpg7kj9pw9t7ptwsjcm92igni2uhgrn9pgh6wwt1af1zzjjppjpyk65mbz30ugv819c0x6ro3mcwa4qmthbp9vftdv6ytew6xocq9c91j4x1z1sul0feinvexol660s85yufstvjgqzhbh6psahzctf77xtgya37y0ms013d8ct0n9gguezgsm58drshjd2egyzwcgestxjevmzu6qmuxmthlmm949twz7xid9h4bcvfgipp6j4m7c7fi2yck764f',
                fileSchema: 'tqyzqjls3xr7q4f6c55agdolvvarzlo64payuz92xt9paysx7ju9jbluwil3nqzf2u4sz1ad17l9miw0yiegegow89ycktl44hp5hm0amtzjtm9bo6jobq1okygt4ousscv2l9f2pwtfrfopxs8jh684phl2hvp4wm7vpxdvhwsc9om9416w6jwa68y8bjiul38o3fbomejxw18rpnt6w9r1x7ze1iw9c5qdmfugc1sivg3pgjgh0yqvmiwhmo1gbz7hdkqtkzzczzlvpag6k2t5rz2gmase65eb2794kkdbaygw9tkqrqix8ma195ce75iidhxbwg2ddmj357sbgji8il56tqzhka2rcm5n0g88q4quye3kg4x1epplfzsqfduoyievha1wkm7i4bbo23ankmp8m54hd67a8sj5f6h52jzqz1ucdy3cpvo8xo4zr0iwpe8t17qg1nkr19s6d1gwnrtm7kinru3jbludubce7owy6mc079ezp0l231mmizwna8vtpw5zc5fe207v1ocytg4p2wk05f68pmrdyr5p9umfif4uokb7930j5u3uwzxi41jx2cz5gh435fx372ujjdn0s3ol8wr3h99ynltof56h3kjphmbofywvyxmsj8p2p9h1axhwf41pfvuequrhm9pjm8uuyskeo1oz8bakrerpu5znonb7uy7rbzuefedbsihx00ks6lhl620wybkzuyhkabbxtsb9q6irfl40a1qvzz9mmediow0ht5ant2r5avv765tzoojdrlelkbvgs7exuwibldkb25uh5fk26xmd8dmzrjtily3ong115d5v1qj532mzu377kjbfmlpmu4squkggk0k1rfnq46ok5ptrmufatfit2bht3ym15mdhrppmzdk9bg4cuk1dsmqazria7tl2yyu2su4zqrwh7lulhhomu6rc1oh83y1cir18ad9quh18yc00lp3gb69qi0kmxs16foxlfztpe6m2703uuoqjtjenmflcxsz7',
                proxyHost: 'ns2s6hlqtz4txsw8iubx5cbznvs48d96iuj92qbd2e25n1148gtniy6xi0ub',
                proxyPort: 3101262311,
                destination: 's5duj806bvv4r3kbt29sy54km5pbpybdpzaoyskl9bm92djn71wwsdyh3ixn2r5vh90fzblnm6u7e2ekjtjrl6cn5xvic528pvut1mg9sl5yr117xb91ii65xojn6ljt0jkm118rx8d4ftkk8i3mc0ky46qyjpc9',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '77fkd40la37u9hkkrd3lt5ke8mqs1tf479p2af7lopnag0awo36n8qkhazbj8wre8k8r3p31l14fvhur6i9bd4vfw7w4emfu5h854r4s7wkit9pjuix4gc1o0felvczhbb1vfrnwnkkwt356az5gq3sgbrxes0rd',
                responsibleUserAccountName: 'asi28c9eociyc16q0ggx',
                lastChangeUserAccount: '96p6tzbi9yix68t32ggb',
                lastChangedAt: '2020-07-29 02:44:10',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'bnukiqguwvopk0dtkcr03i47yk7ckicf0fk7qrkl',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: null,
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: '8gm0sk4izvarh3e403ib',
                party: '7ud27btj79rh2qyr0chw8zsp5dcwrn9961h9s3r7eak6avsriof4ad93qmn244j1pxv5ew0bmptyf7h4o3vyojxy0ff0ldpccq2x3nd0k01zv72wcjl3u43y6o93qswlcmgjapuoj6epua57r4m4qf2l1tu5yjsc',
                component: 'smxwm5d6fprnld6ukjykhyj42mwbsbzv1m5trfpmejptk3vpjsykv1y17jr9fu6p3r4rt3tlq56rg6ncm1vpv2w153j2l46kgdl1qnmov0dxlivmbd1ok621x67bnwcdgw0ss8ytsb6bumm9z09emppxq0fgsina',
                name: 'laojhijx1idkriihlgayvll98evkhjv0vaiyh6d503o28wv7kk53vdul6aetxvpswayyj1w06tsnmyfcb9tp8o4kvdarr6zyt1br8et46seoxxb5wwyxp8d1qump6t8dm7lfnvc9l4nzj5qre5yeeh1x15vox3ub',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'whltr42drldjj7r07e4j2w4ox98whsni5renl6xnwd8xfdnj2jnwlbg70shsi7jk5leos77vnjyyvct0qxesm49p6pz1xglopqio2i1ys0jg297p5ks9nekx5b0ykrpv1ekq4lk9le8u91ygtvi88a70vtpmubgw',
                flowComponent: 'y4t7yu1joap1h752k07zcinaq7gt84a52rizae2jwzswkcz3kia3lf3qklqhfhyqucpy33zt041ata89l0t1eryomzvbbwemrcahu9waupitjvb18f3f2ozszrozhycuqqsxo2pri1x0viladc5u15e47pw4cmcm',
                flowInterfaceName: '1owuo0wgtn3gg6mgktvrstv3erzoomgdio1cvlbts7b5pnknhjj3eudvhafrkh4irll46bmrwnlnwqe9c5yest7gcdu3vk7k52oa42rsqat2mbpk1ps1vq5tadio1ekshecd1qq3f03ov8uqde56i6n720kdhvy0',
                flowInterfaceNamespace: 's6yn0ydpj5p8f8dz1kp0zt5xrtxiuwypxl6qd8jq5bf248boqr17bbu0jycuqg8fncugv3jolobjj6qs4udnay6l59ci7ge8ek0jwklatvpj1a8cic33nr8qz31bfq0r4whz5jmh5grdankwazasxm5h02hfim6o',
                version: 'ys96wxno2p8trgvj7jgu',
                adapterType: '2h9nzfg4hyva56twjhcxoqm5w4h72qnypr24ouz6fggi36nxcidd9yej5rrw',
                direction: 'RECEIVER',
                transportProtocol: '7m73wqywb7epqhx6uqbau5bz35oy4d4i7x2l574ospj4bqrpeu7fczt0nqqo',
                messageProtocol: 'inp0dxfhzfocy97zrvub7gic3ow3qpgvtnhkwjjxoxyt5jlbs0038vifjtem',
                adapterEngineName: 's97yo3zh0tu3puco0nrspozt3xprgsczv5zzy3alafocs9oo2lev38rtdg415olvx7ruyadky2ctc3vyb6p08758tduq6xf2sszjiarliy5wl94wf077ndzlwpgfux03q9jls9clzsx3ao7vxm5uq6elt143j5md',
                url: 'n433iojig13v888vufgu36329pnic99w0g9c5uqoyb9weaultuhfd3enuzx6m4hy659gzcberwwrirgkbq8lizhcfnvbuku44puimyla9g7jqsqhse0u9k9jfgp19k7f92rta480lzp5c66j25i0gkgkx2f04sru783k912a2cgpg1g6ppweq44pnnx5m272a4cb00jk5c2y6iul8jru4ccj5cl5a440zfhg4qm9bjfpy3cw2rpln14z8cbibbgsk0nv2k3i6wcdbqa07mxksz728frt8i8swhqvljswxvyzg4oamlq9dsn8aks16zeu',
                username: 'm83di5h7leqqowvrebune1d2j07rqpjh5nna70glbedm26v1nn8y2stszj4r',
                remoteHost: '6qy4xonmer7ehurh4q5e6bs4jex0vriewjkuarson2he38tp2rbifdrluhhhor05he3mlcn9ining5dulfl50g768v5m0hvz5h5bbkvdqq03y0dvnaf6ibe493rhrvf2c3y4uxz36hb705haf04nnhnokfy03ckr',
                remotePort: 7572624062,
                directory: 'psz9az3uz9826vj8sl54pka5n6xk8heg40ycjkfayi4r1czsoyzwkohpkt42j3ipr65srp3gops7lbgv2qpebip0hix55khfmmqljg5prixo3xj1e26yxvje8r19rgtys307u8w0k1m9qy5zrp8vtho4gy79g5q4flrkt2b78712zpp80c3da8cmxzooamirjjwikuag2ghx0gfikotyvcmcq3c6wvb25je62jydivzfvbumg5ecc17ueqen1ad5bxs62k0v4341kjgkrzh5aj13iubf95qn9oqoxx9o7vca1f8jop2ndf4jmls8ltwzqzcoff1kvv31r1mt1ssnnyrg2kvi092eyznfc02x2isnatwh9xp96cz0xecc968crsfhy5uccvbzyl27myn6ea8ci0a9wjytcxj2ks6mouvuq5k6o5yqnaonv1e5yhta3hriz5qbkxbcdohii7zlgkcc0qrg38fi1tko013k13rzpg4mz0u9236v0m691bh2t5hajcvr1ighbtlj838arj0n0fkvw5ihwn6n67e5yrb6ghi50gsudvpcprqxkdq02j5ylxz738jk8hjq2vdf4ajom9bacv27wks4zum8y6tu1i80eaiajf0fwysy2qphm83bpclsrvhqjwp4um0zorihuzqrjy73bvalofqbyvt1ll9cui82w3tpvji07j3v5l5mg2eftvgza739wv8hk6t69ygdo9e9s9ug7wptxsa8vp288oroz44fjj31p271yh9wfhie2m8r99sq27xna7eac5jlg9ovz64qmds9xav5moy6j4afis5u42kfvy1d6e2t91k2mg9an6vwse7x9ddxu4q18y1gqu4wpbrlhl8coz65hawyu81sv07gxynwhistkjne146wz9cyr8zfczoqcxciw3erkimmcdvl237z0g4upgp4e4lap8zlrt0sn6eu8xqw83a3hi2hdjf0eigpgu9lpfkvzn39pehff5a3hinl7vz5v8sr4xn649z1',
                fileSchema: '7v8osybjwkuvltr6q2l6akagwjja08idb7s0xuyi6rsrgnforfisvwkwdo54vgm6cq5co2u2hi5pqv2dr24ifvqaio9dleklte5jgqtmhi5ns0nlmnbdxjs8twb9ypfbn24nyh1qb0y66q6zv5xna8rvjoptuct0s2q9e3drt42jww8ckzs0yu19h1agkkju4vvh6sdei1ean61znxval5fd0b1evo5q2pmox0khrhtfw88pn8x5dy13rngteaehfqkm0y687hx5axiqwdf2i72dvb4b93uv9lnplxddqjja5bw12hbawanrqlgfqxba0ozvm56ow7v3s9448901823746m09wwttjalcgp6r7l2f7llmyum3l3bhnwtavix6tyuuhn5l8mevp7tiwujlg6qmcypkeh73zc6a7vpbeoxwz0azi8vovvkeycfue4fj814sh1g5us8anvcmamsvli02vcc70h1d833ba8zv57y6782y34wstuu0vhshdiuopys60ax4q73upslddvv5gqxrkqhryuoqcjmt5o0ydqvu17p2wpy7rvghk7jeezf8r9nka1nqjzidao0brylyxzxqf1hey06av5cdqy8ifbjpg90fq79ec6v3vvwt6a61j335npyqw24j164nwj7beikhndts5gtq2w1k3bs4vduzpswh5cfjjlqbb46wjur93opl2sv45duz66wge22csf5qfkfgk4907kq0j6do1nh1l6s4vurzk2ct4n6vtbbyrivnhwt3s43fuu50yrwrtuf5b7qq7kpxembvr953oab4op13t8dvlm526sencd2ihv84jovdvnupdwdq218xcj372qy8jtn200m44wfhbzxeqzt2eetnyf3e8hdqr1i08hj71hax4ir2nvmehvl6te7j1z2i43au2rg53hou6a8ezrk5jczg675nny6irxzkyhp3ejpx409vviei7jbxwxul0zun0hgzrouagvo8d6i6k86tdmaudgodu2hgmla',
                proxyHost: '81ltchspchktuf32eb45dip9xsq2iena0d0nmnnnuwr2rk6jf9zqg7ekrgjs',
                proxyPort: 1543312872,
                destination: 'ovi9xx4whblju4napuepb4f26mf7mlv2at5xni4oguqo2z0btrof7len4mzi43l8m9jtxhi3j0qy7msgo9zzrnc39wk76ucp7gn1isd5idaq0b5t1meo8crxm2v8vnkoj6ibrgadgmi3j0gi82w3n7rrbnoc69za',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'jjvv223x221ynx75lva0mazcvn03g7hen3jd8b3nf7x2h74xzgis0p3mrawbzohnunnwqryuvjgoke6gybd5yf4f67jtm7zi0zhxr430o7q5sd71ib3evjdiavbph7gomrm895mq7oc6xn474sdi9181rkrtnbad',
                responsibleUserAccountName: '5tmoy6m96xul89tsx68l',
                lastChangeUserAccount: 'p6hrxmwrwxystrb2e9c9',
                lastChangedAt: '2020-07-29 01:00:35',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'yxlzrxczzir218mrhmcsfjm4btgxa6iefbnpco92',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'xdv3vjz1psusanvfe2jd',
                party: 'imo9rl02mgjlkz22pqpci2nng801i3jydpqafk3hwtcggtntdcecmu2h7g4rnq0s7e96qypjf5fumnaurm9s1v3mjf88ybbmkqfofv4jyrxnfmmlf1z7pmb3sptlx7mlb2jmwrj7tzsip7dcg1i7tgrt6jp1dgyr',
                component: '2obcolacue16yfxtgrp86wn77mvvazh7fo9eigf8ovn3sgop6b18mv3ex6id87jql8xxhrarmtztydnmzrz3falwg27pylcnqqsdcr18z8m4godcjy1rafjxhd3trssv0i6phpa4wk4v8m96b6vq67dd1o1lermg',
                name: 'tvyz6dm7mshimxptoggr73i5x25h7ymgl9qosdn3quohuo5fow4mr5hqf00g0pzs36szngacfl5v77ywy5fsufhzakpfva95orqirkfdohk2eyccyvuxfhc2f9n4r9dt3aq39a4t7t0erw8y0i5wep5jqed6ldf4',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'ly22c83nydlx9t1sdnu33ltac7zhi9vpodsazolgwv8zjinp83imnf5d72lgqfcvla46zzqcza0kj27mb1emwi9scy8sepmvjunrdg02e07zkowjlyrn0sw8k3w910sjgq9w7jay5bro6x5xxma6dg5t33d0yr5d',
                flowComponent: 'mceakn4u1yj6tl8l1kvodxeb2dscek2mseilch33enjuctcnqo9rsd06zzvbun55e1c9c3tqzsiwbs61w0pgll8023hpk4pn4emy0q7p2xj06r1clogwq8gm6153ltisc9rpxb45fo5e4q5hln0jdykqbfl0ieig',
                flowInterfaceName: 'fmooibzs4xzz1vub2lavkm04irj0dlevr4czexrrkucppnonmk73z7e3efnnndb7v1qevd4t5o2tw1mi8wtvfv0nx6m21nr10n08lydwrcm8232fy5zosfg5hzioowq28lv1k6aav2gucn432guqy03ckscbxtf2',
                flowInterfaceNamespace: 'o1qbw6f0l2ny2h48nxyjjtsjew01u9vc4ekeywjenik3no3jxkuaj8c7adhqrhg789mb0fakwmc9ebete6wvonuzvwycx99w2gvi7tnxn75tkvwrpbgnu9oy1657x0enn0go8vc3t20egqwaf7vqgcvqi4gfznaw',
                version: 'fs13joihfrxtp294495w',
                adapterType: 'p2trd74y2zzy94g46blfuzb4z2nz3q2jkqwktpifanmr474mqym0p3jt1olr',
                direction: 'RECEIVER',
                transportProtocol: 'pdtb4epcm1hprtg1rfir7yhxedyd82q9ea14w0mm6025hy8aijknoyaj687b',
                messageProtocol: 'r2n46qe1h7c3zhwli4qdoqdrwqk0gsm837z3ymlyx533v1j2cxol499wfq1z',
                adapterEngineName: '69l3qd2e9j8xjoloo5suuoaqikbqmhq1oavzp5ibwngs2dw8i79q6e2mrkb1ws0uscdweghxouwe6p7k46xeuy6n94l33q6o3miqtjdhzs0pifqp61151xd2eb7jwvb7yizj1lq51tnzu1meccu5uz1a45pxg32r',
                url: 'dbzp8wen79tv8b31xe5l4p3hgji9aqo9g44r2mlsdgoh69eu5omfuy3jlpppc5qz410pqmtsq41hfeqej8lr0r6tv6gnl5xqw854bbyfll3cgug2ymt0530vme72svcf66el7qaapq5vldtrcs0u957gfxncj8iz6f55yexqa6n5tcpnasynwed3txnrp8059s7iez9jfzb26lw1tcev2h9kmpja8zkucmxyutizcn1dbd8p9l4kvfg2wbcxihejc4lt7odadmu8hoeo5oazhp32p84kzxlnj4h0fvikab6u7dtfysbvfdxexfmt9eku',
                username: '3tjnghdqaze31689bbcyvpydpdqrdh4jgafvfygyuocp8jzm86maf8br6c8x',
                remoteHost: 'em4775vd7q5ckq47p4cr24fp0duwq0u4umjv1r99nth6w89ceiq9alnyo9hq318z9uayesb27lr71nrjklqx64j7k1p0sgmwtzdf8npqx6aaeqfydpde0xuqryw81wbxsyxal7b39xd0relxmcx9tjmqv4896oz4',
                remotePort: 8886225382,
                directory: 'vsh4x4j8r10mxlri8y599wjadx67z9rp905mwnnpyyr2jhpoymjgr2u89qdgwkzjn8d5dfh6ww3wb6ofjv2zojlw3a78tyeqlzzmtppe26m5l2470z26q6g4zm5hx1l8g64mnsa6fsf0uql7e2zyxov92b0lx3szgxceuqwmwyqqq0m8803lv5mdttz4yu79mqisohkututd68ywfxmwdc1orzsied0kbtjofy12u9ycpteixgzpl9e1zlknezoritzoezj7ar0j1dw3bhtk8amk32q0hsg9qtw9g6p51td5kqngr08mfnzpz3oec28v3rnjouyjra8ts57ihn1r757io7b81dadj8e3s4yqoalm9e2l0b5enug4kkqlnacktwozhia27t6rknvflglcpydkd770ni5zkkkeli78pp1edg72eup6vmwdpq7y6t7kdqm798njeq7odvltb3w06fu1izs7e509fw5hh81gexkambnxghdrb4h81g9g7yaggk1wgksc3jm1eqokks4i7ep0d9uya6hzpmegcosahvyw7q6bdwtyjnnyv18jzmac3exk2g8pj6n55r41y87pbwpkf4lsvi17taclezvo53cexak0jyb7dmo4trcyd994n6bskcxhmt4bp3yf4f12ojhmm8dxj1729z83xy2ec3on4uxjuchcbbcnrqjnmo9goqmp1ck945oo8pxtz0a6y5uxb2yn8jmp1yskvc8myfimi6ks17dpxot9u9s6mrv0cnt9vzm5iyb60wuvxbyrqkel0v4d9aiere2v4jdndbp21on2yd9h27uvr97bvmr939zmwlxclfr2si569m3p8og26zw287dmcwbql42syg1v9csgzm1lcx71l6im4p41m8gi4a6ivozt5x3omadrauqvwuca4sr6sagdromxkspu259f6eo5tlpxx72b80ve2rxinaopmix3srr8m5z8re1ryxcv9x2jdri0q8ijmc8kln7yqq0o0iynggceefat',
                fileSchema: 'fgw4kvurftvqcv6w3ovyvpw9mf7nxwbr5dqcdyai2xyxer29aroz0uwvmoz76f5ulspngd3m2jhm5ybik9rw3qabr0syjf655ja50cu3c9gr4blnhj2b3urcg3ssudwby4db3wpywoei89hf2r5d9aas2ul2gmhrdti5znc4chnle41prqbkmevm67gzcmcrbr96qyuyoymj8lhdsks2nlin0vnq7b4aui8s8dqqcnmp6j18qnvquxjw1r32sovhxr9dn4iyp9r5tv6ynii9i3h9cuelbex8gslvqkslnhheqzghbd6u4sqdy6von0wbnraq3wf4pzi9ee9jjl3obmu4uzm2loawby4l8kzzvm674mzhpxxm669i3fbnyd6u963sltji0xc3c5hra6xjz2bcp90m8yre9tuxoparmqe6ptaa9a3q06gwj78t1fevt48elcne671xwhtevw68vxocn2sgp8t8q9fw06jxjlhj7zki089udvkdkjikustejcyphzovm8jwi9aszyi3vn7cv24y32jzri4ii4jnwq3i62fln1hqckpf4cx3nsr98o3vsl0d4ix0ifekxsw5vcnn4ru45fpcnqqvxoyp67rr2sjijerdpk47d79dxv9cexqmq0dgh44upra9jdte4p19md5n12hrk221rbp6d1qguxo3fe5k5ftu6w1siy2qnkhhl6vww4mfie5iurrz9mijiwzw77tybaxx9kvq4y20lvjg8rfcm9no50j41ton4i75bgxmhhv09i5jpbe6dijf8l8ypeku5b8jjl65a8rpbnl1hshzp8082kphlpu0cxgwq7lo39xqp7bgd73cld8dhy8jz9joiol11y5jj4sjxhtzcjfjlkkdgw31cr8kfoalx0681wjd6pdvjaflimi4qsknl9w2hhxieaqtdf2upggdhxwk719hu8t9ai358pi9giz468hua0v6vruq4l46z2h481e63vb31d13g2ab2nbhezz3skij69toy7a4',
                proxyHost: 'mw5eop5kknwe9i35zj09n79nvdhoj7iy2l2f8g775jeol4d9bvqk4m6y4u58',
                proxyPort: 5066569948,
                destination: '1q8xwoj9gjskvqduu0hgsrccjkef023dj6tirsg9k5ykfqyy727j6i5qfvjoc546hk4xmjcl9dpy6imkolle6lcsd41ob2yovjtchoyi8xp56twlic67kamva2vc8g1spr4lrj466sfsq9kioyytm200yp1c3ni7',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '1lwdo15zcfghua964io1288tspkyvr8lxyv5m2vejyxdu84kbjsgbtn1lohnt1tnbmoi59xejnqi6weh3lop9xvk797b1kygwo94vflrb30i7mr6aypqiy5nmigvxvcdynjr0bcgdri2hsugt0lgb6ro8nb7qcvl',
                responsibleUserAccountName: 'pm58iue3p0kltvbjzm9i',
                lastChangeUserAccount: 'sxb13k6ja2pdlc44a2ia',
                lastChangedAt: '2020-07-28 16:36:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'kdv73hv35ofoqhgiux6nh8lcb1w2kqcvt0gmosvf',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'f3f1377dt29t12edjc83ibj2occgj5xotu72wso75qizfberxz',
                systemId: null,
                systemName: 'kovg8tmgagahaz69n09t',
                party: '0fdrjwp0keb8v2gny2v6lsg69m0dwsay9cc2tfxu5ril7wyknho6qjurgh0qfz3k0m18jus9dsego9g2m1ou002imccfjhjlkaeyy24k767oxytc6ogibvjfrg186i6g4drkj1i6ott75910k2ksyabdaj24z534',
                component: 'ar7g20h500lj8zsdz7816ffehw5qcx9uajcwbhzg59w23s1v8yrpcjyhtebzv0ied09ljorl6km0icut9kvuudzvs6z2pmdeqvzqfhqylllumgr89gg7924bkyjspfp80mlm218v10s4xys50i8z2d5wo8muuj2b',
                name: 'fms9er1bsze1aybl71q8vvmxfv9o06j0uyj9uzwc1mi1dvtbbnb7nvw100trvwhm48at7nql8ulb93bzo7wmteqyyq8dh2am7h7z7q42rq2p7g0qwozp9s24gs2gls4nyt91p9m1xad8e0cnf4ykn8hv3hqv4vxq',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'j5dvcz64uslm3grwgm2fv6l0rvy2dsmlqb7ovkonbrqn81ushp2cpzak6gqx8l8l052aqjfo5blcxwvxl0sv5sjfwn44axtzfulrltbc829whhq346p02b5vpuz7vn7ds87cl76hew4965j522kctq596x63otl4',
                flowComponent: 'cr4qemfjrmqak5d10qh6dwria96rhjrdfh56t67ean9duqhlsvtn9n8n8mrvqsgxmf6lwlw7t4wlbhvusb0oa5dvmcircgxxc6eaemy8bab78z8hod5jocjrsnbr04xxwur5x21t1xkgbskalvumtmuwij8ihxwp',
                flowInterfaceName: 'vgghabnq0ul25erzty3hbpxgv9mxzzvmfa5g1m7r84ib74nbr9eti3fwpihpstnomtezpmegzpsps24b6tzkdynxh8o75pt2cw5amery5c2hixxp95z7ow6cusbthy1xb34l8zh9c8w8pr6u1l897o1mmirwkrll',
                flowInterfaceNamespace: 'dftvk7qs8qg2v1x8pwq3ctjtru9mw16bxxgnpa7s7py9lfyi34jz3enmgcxsvqf7p4jwfuikozxqlho7p1lx56ecrlobiwb1tfdy7r11mlkabr9fdetrm4yi2jv18bc5f1uu4zgczy5mb354nzm5xau7pdkayvtt',
                version: 'uynnl996c2pxzxz6g1h8',
                adapterType: 'r1cawj1wnhg8lay8110aqr6kigrz8m9mlzlm9qh0hff7ksxx416tw1xzfyqv',
                direction: 'SENDER',
                transportProtocol: 'o86fibjcgcsybcbrpsg504s2jf6rnxhy3c7nj6gdrjarjskfgocwlwqd8s2a',
                messageProtocol: '0uqnhaigpwgp17m82zbbxodg5wbxhlu3am1shyojx885up6peda3aop57n93',
                adapterEngineName: 'nsivdjgtsjg17ul6j9yw2d81p67sdl3szd7fu6zyf5tqbbjg2dq1eq1rwb855betp3nbpp8exn6w8hd0zw475v522asy9czohtit3qyop3sssdxbpdier4gxk6cg8yme5t01uv0d7kmwk5g9jx356381ffndj94j',
                url: 'amx0olsy0fikh94l7qhi7as1d73ffcrzr3whkt6c5noquf78xooff6v7xs8rtuav91nlkl4fcx5kgezuot2k4ievd508vzknm7vbxm2y8q2t3ej1c9hholtbzvrd3ye3qf8ym2tppgctgaaik08s6c5dg401sb80y226s0obhjd0csis2q1t3varnvk7kzlzppyiitlo4toa5yhh2acd6ksjvanp1lvfaxaymvnrnwdxkn6458js7ktl4nh867vecvpmbyf12ovgdihpkebsgp6fefy8ng8kvjxe7m425vjistj6gugy09whdabpr60c',
                username: 's56w25nd1low3qx33za6fzlb4u96glgsmucfmfcbkoq3rm9s6s15n9w3w50r',
                remoteHost: 'lmbbvht29s4pjgej30mauynfw88uuskmirywsysw0q3ftn45vz0ocq7o1hfdasxv8jaj3l4mfyzju0h8c91gsc8xcpg164i8o91rr348fwxirm1etpyuu85vuqb0w6vvmahh8mfeh7mh361s4vdalumdjxw2bw81',
                remotePort: 6206496289,
                directory: 'deysdrrh6pxiekc45thgbsm3oaa84uszdmy8850abru1nfbhyopwq0g4bm7hyzjls7z26i0p7jjimsehsytz6ej6kvxs2uxoa06p4yf6vxzg7cbcq8ws7smzpfhgbk77ow8vtk35gbh9n5unaucucfbehlwr5ev5h0ssb6zplfqzdd97jlg6xkuepvyx5t5n10o3fdqhrldq4kfeqfxzw579rr79jh4bbvzkz6tqihn5fgr01g82ujuw41kd7bfd6p5mwiwwckv4se71dkd8watztbxy6zhpwllp68cdflodyy1di4zjk4n9z7m7kwp0la8r7ty8z7wii3i9onhluvge688gbhnsewhmz7o9v7rav5rza2bdn10c9is9dj7i0br7emxxsc1wji7ykck8vv47mbty4wvd8wh4t12q3sfl0z48py667syx4usq6lzej3iqr7iueji1sog9c7ar17cjliy2jyzymvhnpzf4jy4dty6vdxnc3lvx08im4xv0hwogash1a4mqasynfdf1kn481xwvom9wtyiyvydnybubk8k4u7wmjtzvlccgwn0x6ddy1dp9m7uyj7w8o70bgygjpz1q1lz32bfta6vfp9iqh61crb7d97afyyb2qsc1njy69jwm2zpakrrhf6l6z13otzofq2kwvndpmpulrxhjoo0avc1sf8yycvqxq484osgn5djc91tvkhjj7cqcw33b4bpetqvwqxywjbbunnkk339sc9jmcpg9h18ttc2830mkfznkoolierce52uaqxbaib19xzji2d9rwbk0cnrk3jk53wfbeik97zj5h1inl2cl3su4mdhdq7e6y8pqofzbqzhbd9uxn8pdsi58cw9qk1tu2sti07zta3r6qkjs0odk5ml6yjpuzd2ikspglgqt5omvlr8ppcbtaaqdtlnlioe15ezhgkevanqip9bg07ariovqcxio31s95fqinutax6itxkzd9peri12b2hapu5zprxmgvljjqb8vn01v',
                fileSchema: 'wjmkymvmnuxsz4kp4sjmqkk8gmhhr3m2ujkl30rdkp6li4r5vercflrzm65ndeu1n392o2y3hy5v1vbsvcgp7pc1jw1o2cw4w82n7qroz69i14xg1qf9f34vjg5nlyteodqm86kc3yq2tqeypgw61al6o5bokbv31fyzpkfcumeraxh5zkfyn1uo8c6v96wt7i3wlryewl9pp7vuduvppfaai4xtmizqtn8t7whcy9n7h2bk6mhw5t6fx5jb7hk94ev8la0j5nkz4tg3vxq2z868e4zqsmi6tflfvfjme4lm5jnrqbnw1wyr8jt9cw5i8wqk1r0mrmfqt712ji0r3we8q4znsc7jgz9u365zojt1hpnuuewmjbj5hpmr290z1mpcb9q8vo9lu4zoymdg5obourw56oewg0ysjwjfobn4c6xeaxb573xl9o3z49d1sabckbga8h8xarcim6hetcno0e9zdy1ncabgixn2sunbfyearhp2zzywl51jjsstvqct9pk90pq3m7dbyg9cnkznzzwx6m080aw2aduowya0okh35wkdpeex877xy03zdpqhvaa9p6wh1k75j41r40fbd9h7h2x9bups5klcfj7qaca81a0hirtuf2w11d6c6lu604gcg1zd2ma7rkev2bosadbl9t35cxzrk5msl7hetgdz5nvor1vo0qp3ub737mdjbk8x0w7pdy6ie09ly6k25ns639p2rvc8aqbp59srzel5tofd13md1s7ix4s5730ihtf22nwzar9gittuwqvydri9cb92s5yynlbnklt4g118o8uenr470h6rrxwqpm4g6bvai01lid1q54lzui34dgefo0czk2zi08496fs6hl415uqwjlzzdzukzg6buqyi02pqaeupky8n7a14iixzscferrpp60tealh5r2k7c5mkqswicpoin4j5o7hxe3y992i18vdxf20p0567yld12x6un40kc4jd0rx0gq5wo52sbobwu1w5hhh90lm1',
                proxyHost: 'xwrbwr68sfrbim615fctd5hjctfnftumsi3gtbbt0h64m81ngmfit0krdn3n',
                proxyPort: 9022469905,
                destination: '2g0bt8nwp83akyfzzkjcntkozf5ljldo3vrsh9dvpsl3p9aei7rjn5lk3ez9qfd47tnom15eqi1fojqsa8w7m0c12xo1azfmeilo4aluekuzd1d3z93v5x0q88i50tmgquxxxqg3isiu8gfjd0pgsxazgtiiqwhz',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'vzg77vasb8j1faafp26j9lj176ua1waxh7zrm7n0ho6r5hg6tkdfbbnuk27hszm36no0m58ea59wqk4rvkdqqs4w0t07yrks5h161tutyl4ajwr7p9tvdaac3jiklpqkrjeihsngun2ojpolh6xe7gai0didy6o1',
                responsibleUserAccountName: '58rvwc0swmzbfctefozo',
                lastChangeUserAccount: 'ukur7d8rp54xqepjc30v',
                lastChangedAt: '2020-07-29 12:56:16',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'z2jdxwykgwqegchrvmh4ucbamkuv9tbpvt5fazau',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'c1yoftrd7l8u1sbqf6n0s0psmgifbz5zeujtka312h1v89yw5y',
                
                systemName: 'hsfctwnao9aubuh2nqyo',
                party: '4jpibxvlpbjxmluknkp17ldl8fe8yt3emmvyq1hr0aeuxztr0i6p8mjqqkxs3mqjtuffup89h3msvnui1tx5mfveqf8688g7nr5eldwj7mf336qimggm9t6pd1mdzjcqnt7wrvta1kx91aso0g3hteb36iyh9yuk',
                component: 'qz7kux770eyxb04t2hecv5ta7s650ha6z1i3pd3slcs455hqnz0754kuk4cvjqfpy85f0curei70x8x16dw8wdk8o7smn4o81bqypyzo9aj7hsopkiijvgo8onli8y5hg05uj4i67x9sprysbc4i0fevm5cmqe4d',
                name: '4ry44vi36k0y114exd6yxvaebnaiixy0y0gqh0evoz4l5kshss37hvsbgo04cowkbxt5c9mx59kno49q9v7wmlpf9l0qot6882kb2h9w464m4ca302kcf4y5u210s7ydztef6rgzvkohvmishtc99aigrfu7762m',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: '40c19mn34o31codijlk9tj8vuptuto58lti4hwncvya66pooj4a208xmuau10035ew0jbag8flm6f1p807ed6d2mx36bw5px4pqfqk3b676c30898xabnj0j8b6kv3mwltqklkeb1z6j3tpc4b9ikipirzg0a8c7',
                flowComponent: 'lz72wbadig07ehs97jzfdto1jfisjyg85gst3a7v4zehxj1nstfsbvl902w3mpf65cmf2uj451hmggzwrlrbf2nc1hp996ib2leyinvferqkpa3osg4f2ioydk2zm6lwze7nwqycc1renblclw6drq9omvacid0b',
                flowInterfaceName: 'hu8kr30a89eaaomnzwquh8hrbqenqd0a13y3b1gbfgnxk41u61mlk4l1n1bgymiamgwgubhe6k7fhk4r2hl9lx4344gw594qej3r2l2f6vaozp0l5yuctza5mmlccnnw2zkg6vu5uh9h965rcqozngmvm877m92q',
                flowInterfaceNamespace: 'f85a2ray76oft9agoh8nhiqleanda89kdw6t5hqq47lyel1rdhyvuz3mvnwzfbaag98qzkbdtq563s2na3onrkgnziwpchrgniwmx5ctkj0609h0l8g2w83ghhi9y270qi75cwapx0rnsm1y8e7xv5rbhrjkryv5',
                version: '42f1w98yb0f7btwvgkyd',
                adapterType: 'nkiprlwaw1x0qhg6ebhgfqhpny6d64k3tbjonu43i9vn1kq77jgositp9ery',
                direction: 'RECEIVER',
                transportProtocol: 'ocro8rg1osrbqx1phm2qwot8zca35afoa06zw5pfhwi2vw18qxtozb7tb1as',
                messageProtocol: 'hcv9dh04zcejmmrg9o18k411722ivz3e3iejcoiph6capfzxdo719vx5zz3x',
                adapterEngineName: 'acg911o13geve2gfntd4qm9rw241u1ydf56gzcnm3aidamn9a4cnzlvxfz9s8yfitvnzuqwwh9qab7b3ojbi5ijqu8alsnf2bte7e9bychq7szxngimeje23f1dso5ubqwnqgjsx99ep08apxggvyy6qe15ztpw8',
                url: 'bivi98412oxhf7y6tsfw4edz9gzxumslovj2pfu1oz7uc4j2g5yz7krgapqic40gngsk04j64lz0y29ldt4c00d9nvo78fbmgu0tmcz68pogex0xgfhp0scjwa9xz33g7abjzn1q92w6mcd0t4owau99eyq5nvzqfcpxkwrn8tmw9v6ygbdau7vp531oq70nvqk2q376wcyx2s00bbdazndb5qhdfheokbm2vtkoza4r5pc803pbhyyduw4wvvptbeeqrbvh9nhkztnvh9eb7pyf2xjp7mfzbgv4z3836glswa2dq4bm4tt5vf7lzw73',
                username: 'qw08vuwyzx1401zglow6ae0ztjngna21c5k2fejy3xdaia212mtb545fcdsn',
                remoteHost: '507snfrfgdlm09fy2n9gowfss7lp65ii4oiiq89twydsna6maftpeqb9rnlvbmbzzqid1psqy0wafxqicf0lffixt91v4jx5a5wdppjojqesu3y6glhuwqb8zvtcb6w74cdb44lirfaf75bbelmj8bvq4jmqejn0',
                remotePort: 6220087947,
                directory: 'y7kqfq2b4j6hjiw4vlgnngcga1c42jcyhq1nki7dy58tis6e7g5uzz43n5cd7bbid91l3e0702nvxvh0h5olm1fheoq9f0j0rw4ti68e23ry6imzqrtwuxc3dglt1e5zg3w4tlqyi0j0fbebi3z55xcvtz7acov1w8tjj31mnbtmu2bpoa4pd2ytop8mnwx1g6e0m1iw8z6kvpfdy370joky7k45hzqmpslztono7h27dntuzqbd2wmdbyr5judyqdy4zqw3yud4wmuysb8zq4g4pcr0ealgnsg5xq95kpavusa1cwsn87p9p75h73h38k521l7j9bxs18fwvyatpe2eherltvwjveofms7tf2ezdj3832q73plov9dpddgghs9ky50qcowyfyzxnblpyqf01k72lyrl7n8i223d9xvrq437v39c32ysynnjn2pzqteu959mv41r5dgpvo4132irn8h48nx5qszzjpk9cypbk2cqdq760hzmkm0ekcogc02e4nalh3vjywxloe27sjfep2dfus46fji2erzw7bvcztcrlrlo6gmms48hfp8fcivy0tbb956y92uxczjxg187jd60cci3ci6zkbvsmn2b5zn1qccfmapd5cg1l50epjt3rvass24u4mkwpuqt2s74ftk51akkpgvxuncnl4v38dv7vgk2r2uuyzfb0at9pqy6nalti84r2suckpegfkwhmjpl0coiirfwja6kzdrirwf3xh0i09m9lqvasifpbjya6k1xp2mtf3wrcgzui5czd5otewte0f56a9uludjllkpsc7unpd25zh201i7gur6siwcvpqzt3onw76knofhvg5k2ala8rmu7876z2wnj4qo2ge9xh97d4w7dwmtu1gm826pxlukf2u2kfd34kc9xd7txkl42nzw7fb7jp1fyrnmmdj88xx6iaer9ut9ythgcwsvermo381pgh7yts5y8y5ck3ztz8pzbrvdrcbbbtoz0ce3r49c53kmran7q',
                fileSchema: 'b26w4nxr81le10md1x59j5ogxfckf3d1s1k02e75aotqn24r5ogo7egebagtqegfg0tfqwy3b07chgkcqvdfkynhh7rc4dgloxtcdjvbatz4o2sysvpba73tsfbfgvsx7gvwy7vpb9s9z6y5d0pv1o48zp3e3vjiam7rnaaei5r02ejvw8janavfm6g500iwcyg51f2qyd12vtvy3t9xz5um8lwhrpha6lych4txrbg4jg7gp6661cw7tzqxr5cwtzo1jajdqaxytzqo8k4pp7wg789565odxgeq2g0behn8mgv1lpuis4dzdufgmlfc4u7gs0vy95fwlibmlhutz9aa9aum7ttwbkbe82bgkldmzuiiwy1q08xpbsunakfbklhawjil1lphoez4839iqnymrbiie25n21qdhrjto0tkzlpuz0pnrerva5vghlr2oi6bjr8pv65gg2cnimslr2ru6yj279klohsune9o8jzlcpddt0evo4phizr61fh6cfd81z7qtw31kn5n3sgb3khfzln2efst14s1v9kp5bcdfby5q1tkd98fjw8i2nkoj0yc1u9ch32o5oajaxfrzwidpo7wpwq88rggry5p4eswb4nmazpnztkwgg6xb252miumfbaccwgtrwfde12frlfm94m49hmo3xsi71rmhl6xefmtf0cu7svc6o4ujw57k6jblpz038fhkevpi6avfzlk1b9umjh8rk08jmqacpdecsbzf2afsevgai6t5atefls3cmycyrzvlh9hizjihoiy33gkf9p429vg519zqozzsu4xuu17tluevx3wfywy33alyhul6wle7pvp81bvruz7k96s4luksl66kyt6slsbxi9di79ax18bjnd1ijr570nn5mut6waap7eclufc4ga9mzkdfakj8r0x0tl8lb74flk30mdwsemjncr5efrt5q82gcdzvhj2nl85og9hg9al8rtmms4we2ax6nnyb4ook0g34rxhq83llak9tgwf',
                proxyHost: '1fzu4hfbriw2idn0bne5qilsfiavc2725y80te6m4w9m1ejvriie6kqhse1z',
                proxyPort: 2133335712,
                destination: '96o6ztyketa9k8vy1t3y8ghesksmy63dm5xrahjfd18rqcxx6kic1vnteoqs3mzu2s9r4u39l9e64pdtl95qk5y9c70j4bcmviufaurdbkqhqa8zej16ou8qtcgebfps2vyytzgwlc582wvq50e13grbkp49kcjy',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'dqzvvusipy0piluvaqq7df1dnk259pqg09hctx3up5sl560vyr4qpgnf6mi1uqas4s5v62tegcc7t24m2s6ne2ft4vynqo5zizgxejjxy42cfc904ge7cit35vpwzx2itms8rrfz7yqzk5ynrubmzzovh0kym1cx',
                responsibleUserAccountName: 'jogxv341m85ymwpag3hh',
                lastChangeUserAccount: 'in38lm4pxu6yzn81vtar',
                lastChangedAt: '2020-07-29 13:07:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: '8c21z0pj4vgv4b39bylsqvr0x6gnkmu4ugm2bxue',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'qyw2nybh38r08551ebxody9bbt7jwr2jll8if9hqeetdciyc8e',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: null,
                party: 'c8r6ro5so1ec4b52j2p7y8saig2xakivftg53scko4e18jljfrob5r4rlxkifz3yqy9caot0ct3oii21fgv1sdpebjclyilv63grbhc684or7xzy8heagk3w8qwe69mxtmdoq2ices11lgv7zes6obnh7qygjhbx',
                component: '8l3xkl8a69sguuz5rgiou9yguipjrttsg5d47r33bmc3kc88ksas4gkreyfbcgxm2kznkwxeuovm413n7a3sh11b69iusdw9bdnob4jaa2wvoh153017tues8g58drttzcd48mn6sfghxwb3ebko05uv3py7e4po',
                name: '8e2fpmzf1kamlqexwywvo3gulielw0cevsitsxtefkp7qkcnhy0l6nkk3ed6vkforohu3wxeb2jgz3rek7vwdjeraetbstj05ssfrk1jt24svpqdtnfachuqlonk8g364ehtx8mpd2qad5kh3rdukyymmzcpcwov',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'pw5zwi69ycryas4tec5bmhr7duv2kufs59iyas6mewepsuzwo2ad6csuqcky8xod5bd9igvaosxaesvxf3hha1k3va7csad61ypd14zu078lhyxyh7wwdnzv99i496zfqmglh1dfkugfhv6zplt9p99bv375wyjb',
                flowComponent: 'p0xeutk1t66odncitxbbthmgkz27lvbr40wx287327ic59h1hvhavvz83b4t8juvv7wg2f2sv2kf5abqsqhqhzq3xgfb5t9ilm4su24yuysw37zdr6bfj40ckfz2lmnc53wg9f84rs4d3jv46ajiqkb2ch9vr0lz',
                flowInterfaceName: 'bina2oby2ok6a3j6jg8a4c40rw952i00t36qctjn2nsh12edogal3w1t8go8lgrgihdr6yo7m5kzx44pv79bmw4dd7le3ra0e1ukgokvdk4t7uru373vg91prfjjltladhlop4z24idaop5szf80f4z15sbxu9uf',
                flowInterfaceNamespace: 'xszroy59merv9hxfkiwk7smaenm30w3iapnkhxloq8tvr88l3a30ew4rlwrxcv9z3p4vkztir0lurh86sf16ldclu5bnjtlixu0txbe4ykrx06xblp3f49skau2cx5unye9hp7zx747otnh2v05wzds8u4qd2vjw',
                version: 'pvbyfbv1ntcl3scl0p1l',
                adapterType: 'ktcwfyj8t3cnjgpb6zd47mdouz692ryyqr9ap4dg1e0cvrd51bju7s6ty4rf',
                direction: 'RECEIVER',
                transportProtocol: '8id755rz84xg4n7tysokykby5oehuhxvy8srk248rt1ky1q54rijqni35qwi',
                messageProtocol: 'mp9s94veabpa40tglz5rm3q9c640nqzvvfy4lqth9w7cv1mz6vql7l6znp76',
                adapterEngineName: 'kkea4xtdj6lpbn6mrydfext8jqa704kcmsu20k65hqvhigkc257hql8pmbw4veziz8ly9s5tlazwizr86l1r1s06u97dxrmvetocldqahzyyndxporeo7j4bky59gjenl96e858qq7y6m7pncalshsrv5mwvxwnm',
                url: 'umvyko0da6o81nywkq5p9wo70q641u4at7rgeqxkb5ilfyo2lw2vkcmqeeru6pa46w9r4ts56sekn9l07jhac5b8sy84u42rlc9ulq5i1sc3vmkzvvq6guz5mwhgurpy9adji6vd7acnj081fd1u01ak5htizd6fxhkf4i4t0zef3hebaoizehbas02x298hxnflwyxguxg0kupajq59b8mch03rwawe7zwsw8v52azi2an1aw8sx67h2gv2mfbyg2c9e5g8i3c35452d255m3qgm107k7201kmnhg4a745x0biv5b9ju5gxhepnv3y1',
                username: '0bh09gef93l0jno34a8y7u98tsebmgmv5zjqn87krjvk6612a52hzipzzja2',
                remoteHost: 'sg1mbdie11ofiq5lp5uqo6j6m7lqytlb9rv9jv98f5mx7m33225ge6fzert4l92kmxqthzywz2tyqqy740iib2wjqtjbl97hmq2hc94y5udhq0bl48lbvz20sj39h0qpaok59kfu2ua8k4gzilcy8p33k3g1bzzl',
                remotePort: 2545023134,
                directory: 'wh5xdlc6cjnysd1kk9arbzslvaz02bhju6rkz18eqh09461jo1a1777gmibyzlewtg0ghb5imnw2zvlrnyxei07xcdbjn4efg5meeyzlioa3epr0dnli7n8ztjlwhv3qxpdr6hyh201fi501zdmewop0ggk8g4z30jp8wvbuspm53tizkqvgq8813yozggziu0us0rt39jttz8gzs1nahvjb25waaa7ue7t95xc9n7oq4gwf9n8736s2tvf6ymqzvtb6ck27zxeqotovprnprge8eg48gpcfimgautmc6do4pbvqbzwiwvzmexvo0dlplu8kgys9ih5lsxzgtmr53frdivhmg0h1zglo3uhz6rxltqm4p72us32wjtgt2yn8m22w1xcqvhdrx7b6fiu2stmr0fly7c3o821qlqmplv4l8u8jwfiluu8wmjorhdg0w3uu0mayuto8nd6zabnkhw3211iold0hrgu5z15brs3houidspta6vsxr3v4ikatg0h1kyyrw5crskez6jjq0ba6mmg4qweku2at3ahgmgdjoaarm1iewqjfwarwjp3u3i9blzh7mszzgb2p69mjm4hs6jdbs8bqonnusu1iy9w7hq4b90i8s3utlat4kgdv5kyrjr8qn6hqf4jwg5sw7urhba49qn8xy8y5kjsyjwclyl1y7qv03b7maeibkv5pjzuearp8z1yvw1j8l5qul7nw7z72730p50wpfbg9kr9buq005do7f1229iihuvsz5zqf3x4pyh4mtcyxg7avkya0mrlgopwkvxya2snd98fr2suatgbna7xca1ncx6cw7mfz7abu85u73lzlnzw3s8ncxgjaxg298clyvwnflidcgszq4dibdeuqzjfh1wcffklb87955wlvrbjutcnzz9cyjze6k9v27jl7rvejoksafbmv2zujhscm6tk3q4xbt5z2kxtfux40e9um8plq8cttyddd4um71jtb62jc3vqq8hq3gf283ih9cr9lae20',
                fileSchema: 'df7bdpg3xffrpcmtt0imiwdpvdkkmqa1g9ubcivl9yzzz7549ixqmvdjxpl131mcworoz1m4x5zkamzijdlm3qpe5lg671aj8pcp0ejecqgvr5e9i51io8ny9llyj7taeab3na8lmywp8isvusyw5pkkd4nue16td45skasl8gfuosksgtys4s9gl5uc2tf4u46vxiy50qp6mea4x5c85k4ut8373wi5hyxoa50x2pf61858ja8furcuffywtb2xhz2uqug8ud6sz40yktv1onwhspus4tfi0g0tw0aahvgfd7eeyd2tv5mh97jfj7ruesj9s6yvt1f6pbuuljz1uan1gvcfsavrmud8mrqmze1p13a72mlkxe0ip6ko6jjbtkei8bzh7wk35m02azdg3qa94rclxnloa3hwl8g4qaqj617hhejg0es7l27hbteniqm0fjh3n25o6nqlreawxlxcnapvfdrk8jpmkq5nep6x3y79uqk61zh3f8ysmmo2fsod2fukbxtxjgfwtzpjrkgze0b882hvosow8n3ivdwcfsoqhr1kdz64yrev85b6m32bcl0vdhcyrfzj7rlj6yxf5n9w2b6zu20o1qp8oau36l4sgsua8pwgopdd8yz4aayi49mpbiaell5wg8jaot804pvdybodiovhum54a3er6hn6mnow0e59g99kvwohw9irl183je79jm85lg19syvepd3ko7ratwry98ugxvtet4pmz6muereh2393a4z2rb9yunhxrgibyez8y5twu6y5867msvgjbozr57z6705hixafh88c4kbvsr8cuqlut61xje8jyd5k758m2zjoov0wzeyaxj5wc5myv8dfe3oa9vpxy8ahvbv99pzwir9aiffltz8oi5i3d1ol77utshgw20wwsojz6cu2bnepyibjhtdb6v0uw1zqd2ix9uxohs6optw3bx8xe9d6z7jdwbzj6i872q28mz3qw8p9y2au9hag853omc0r6p85xke8',
                proxyHost: 'uvzcimia5vt25t7wagp6i5xad5u35nq47i1i5wduxrkt23jr70yjgrt1ejgc',
                proxyPort: 8294664091,
                destination: 'awdso3t0zhj1s1gerff8wro3f62ij2uyj6d006vqxu9mzwt07z8ox5034tt27l5yq40826dlzwmkz7nl2asxea81tbcfq8iec8w9lkgf8ah207v7qx076g4udd65ic3l6iqml76t8gdjy4tme4jw0zz240awyjhg',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '2douvu8fplwqcn3btnvrit3pa21cndyh9twzc5gpejqf6w2pdva32bjhlcl8tb2ioentubqt4ykmszaepziet4ecwbaob61nyef55i96c3dhjc5ovfpt51h6tzgdoc3rrdpuzb2znksjn7928269joxbqozqvehv',
                responsibleUserAccountName: 'cegdkt2fpi58t0ksox5u',
                lastChangeUserAccount: 'e8ifqkx3gevfcdc8gx38',
                lastChangedAt: '2020-07-28 13:54:52',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'e2nkgsb2erdfjfu5639tda9wgfq1c4ot1nixkm8z',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'blehhwx54j3pdb1vwf19p0oe1a6lh339cb9nbe6qw3mvbbwmj5',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                
                party: '2k0dhwfddfuzdf7036mgn0v3318sne4slkom0mfv5zk191uba5i5c2tw9p938cfx1ib89hftil1r3nl8w7d1djh0vh4clkwizceikzi6b575al6uecbtf8c035vrhrzbvvi7no9avrw3dkc91bnvxwld9dyt8h0z',
                component: '7cs1bcpe3k7znpaykd35x10rttioxxzwkjyrs7hhrcbxcckn8kdy9fqjj6pnz6zvcs243if9o0948kmuueatahn6dy92n51mlfejlatnjshdxw0z5o52np62fl8jgbrv73ton0a0hm8xr2lipab94v58o6syk2g8',
                name: 'lowmo42r8gwno4myxz6vro0w7drw1sx0frkdbcsrkw3g6f0abauedixqxq468hl79x69cqwaetoqc9b00j5cf8tckd49ad5q8zm74fnqwezxeti1ic012xdiak3bkvtu1sn5x8ewfr951l99sqzwgglkqww5pqwj',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'dgni04v6mqsm2ip56caexbcj71sclqu9ihwaat3wgejick4ctr1yq6bumyylyhyhv86glk3qwm1tajn5cmknht3wr39az2tbqgrhu91494cn0tgge0vcg2l1eiyxbudr1o45lp576fgr642t172bhpghhbini5g4',
                flowComponent: '9sxfzusoc5i5xnozl4ashrluyq0e69dv037mou8hi5ns6x4o6cevi43kyjopp6rmpc70a0r3496ojjue6p667rbu59s9xlcqux51tot0be86s7uqizm4l7jaukef5hrokwlrs37o2muwi9lg2ndgu6r37pctbodh',
                flowInterfaceName: 'x645539a39un0ing5hhk2cfhysby1tmg1k5zdg1a05husv9gg4heo02b7x5ocqni0nawrphjqs4lvrh5wbxxnxhizd9o6xmg8efouf3u5y548jic3mwtaw24d5gpvqimoc4atx9eu74vufuff0toknjjlbz237pb',
                flowInterfaceNamespace: 'm6f60p6nkju5ydfg1f40b3rdoyt9rnbmnvwpnx2yp40iipfa8jgflzojo5vrwvgnd180ddt2cruvixokaio1pxssz1i2qjcssz3ltiox3frx15kmziyz0bz8g6e7tizzb5it0xp2guium5f44t15hdmffzu95ys5',
                version: '9vy1e5mgx9pl68902pq8',
                adapterType: 'tvrrjwmy7m455dkph5yqhni99yqfsikyzr6sey1tk88fa70l9gwmz7emazif',
                direction: 'RECEIVER',
                transportProtocol: 'yq98el3iuo6dimq2gmc4n6vepqpn0ckv4rsd1jxd4bnrv4t63hmi3sldlxaj',
                messageProtocol: 'ig05n4a13kalztjo75m3doj413onxgiizw7lf2th5wyflf40b3gu472txy8e',
                adapterEngineName: 'ig329icolqyrnsaikmpllwan5t4ueip15riy9u2dp8vff8uo3ufv9as7kkll339dc1ihvrj57q8ayjee0o8662mc87esbq89essfheb3hprm2p0kngv1e1vsedguk7tfnz73qcyspfmw0h0sy4jde6mc4radmnrk',
                url: 'hubf5fnzuctxraay4i8newitvowqqbmv427cvljuola1d4h6acvlbgyumms9rndg2fx6qs1n1szmwn18euks7bnf23vot6eua5ghpz2mwjrvdgbiiroyzajtpz5z92119k7cwxco05mklq9b1pnut521dw9zvi0tet421tqsw1g2smnorg3s4ixdxp5uf1koykd0v5su1hq5zuj5zr60hnzdbn0tpbco3oso52kqx29bzryhgc8p8kurl8iawdz08jlejw8k7dktlbnwa5q9mqhf8jqe48krtqg92w8kljw71ggmfh6s56yttf85zwl0',
                username: 'o2zlaow0jag5zrj3yq1jx23lt2npd00gu3ij0lpwod6uj2lghbqw1fge18r4',
                remoteHost: '9te6e34e646ddehofzqn01kq2iorn78wtyrkxv7qrp7ay62w3xb4oti4d5qupxogpqg7fx67qoguwlc8t96qzifpbpu3p7ajd45mwgwar9od0orpeu49txem2houz9028gmjqxkv0w5h53e5e5aifze5psftwdv2',
                remotePort: 9124179492,
                directory: 'rykmo7ibpnh7rwl7soje24mh7jp8m2x212gnp9xe1z4b2tsnh0ufp4j6t6wlytmoykrv8wjsklrz8sd0pyy6m66qtcxtj6xql4d43o6mgi7qefgim2ub81p38uxi6bjr3skfhcq3jbp56gofldi6fedzvmw05yjbx31laxs371w26cbghtelpevj2zelbk5heb56ui1rkuzb9cg4qnxc6mk4ica9zwn6uk3lgg42iezhabhawb9v4wj1or383q4er03qhe6jbriiyux65f7ln0fqxvinzjpkump6zyl11egooslbt3s1qoxkaqvaogxwv29p5adre0gy6zka2o39b1vx3k4dn8g9aszufm5kt3o9enlqx5zwgk5znyi9lx9kidlb55xh05ceiss1s214vwuhlp45rxwiyu9h8iu6rqakx5tyj0save8rag2wd2cezkwpmw4wrn211xsb4o6ppw2v80r943kd5b48ddi281w6euiggytr364wwtq2cvatp3bmh43m5zoew584krwndhn7aeoj8mlhw6bvbbcjrj4n67niib9kvsbtomzfwv3xzoimv552vqash1nxgn59bzqrwbeqe2ulpum7ovg5ffnvoxp76it6tkca6bwka5wizgzwbwrb7ra0fsam673fz3f7r2940eg21xbja0boo137hjmh4jid57wxlc84wa7hmvhgpsoeg6zsyz3f8we5e7zwsirdampka51d761rl2qymf9ikfmvusdba1b3bwux1qu7mz0pjw9r0q1e3thb3oqex5a49c3mr8n0a93495pq4z01891lop06lqvitqjf30hhezeirw97eyb24fjpez6ofi395f7stlgcz8vdzfnd4a12ag2mfn6wr82008q8skmr32r9q79visv0r3bv674y0ltm30rjkrl8pqes6r6z9qsqixc4jwmd14014e2mhvvsd64win2ltrgtjzrcqluliosy2qpz0mi91zk6i4i90675xkvhpntolryome1e',
                fileSchema: 'zmo2pv9h0psdum6mhqyw1m0ilhvm74nejg1lioskx33mvwti8hrd6n4nqyjj1x79s6ql6x0q6hjvnh9jh8pi5xc0rrqmwjlyjop2h3cx3mtflj9fy2iiof21d6yo5e9jqrrmbj974zqlgx20ds4puwrkmyt7ypw4nrs2dfy41hu2au88zrd41fy2cyrwfjxnx7tqa80sxjp1jsd9ou1093wd9f0hhsgscopm3mecj3p94fl28nmx8calcmsb3dj2l87t3mayyiy0uwrqbsbg3ccpbar77v1i71f0tfzrwvi061r1bwehg4ojoujmzsl68ikk0hs2gn5vo8piabjhgkescq60prv6srdf1ckbz853fs3sckfn0wzcs7mkyc8yxb37lomx3npuwxbvbxnptuz7h940ggkwi504fusz2f6bbssujy8bk2jxc0lqkvgjvczbzcfjqta4kvs4itd39hcvv9k4m58zjpdwdzsjwj8y4iqt2tr9jj3tfjf266st0ie590d73rlm4rw5q43f1opougbovc4v23ux1wva1o26o422iqpgb05jtui637172lhieucscbnc7nu6ie7qp0ty75rnk749ydadoczy0qpo8d06mpb3rrwclod3jjecp7yo1l6ep06u3w69hrnybkntsmtuio5rkwha452or7il8jnmd75k70slz22j0wg8rj7ykb4tp0w0hmz9nom4r78t69c62pb5od65kosj6nitumxd8tm61cpwu8n8xn2zisa74rj84nf2jiyrhkc2okff1hy05pi6841ipcgrjko3js35emsd0dp7d1s4ts78n5kbyk2vbdjfizaw0yxsvyslxrl5yr4e37ys0fqo1yu64yhjl56ccyp9awm0nedwezdzkhfclr2ls6d373kgrjij5rp7oj8r7r842eho8oppqytti9fzy2ii02bjhr9uliyebj02ajha8ukprooj0igri05o6p39lvx3xben1vnm2od5tg6i2qucmj7pl0sb',
                proxyHost: 'uigl3dg0568iup94ivae4wu6opm8jk2ispr9icppgnvjxy7puirn7ijzmub3',
                proxyPort: 9581444901,
                destination: 'rppkd0evo7l3ezibgcdhdb010zrkb3spjm1jb6xxpofcleij0mgckc0zxgqrcppt0enifogzwfi00y2q1ptirzvaajzwxo176hsetqr09r33aoggsmz2dga8sa2ugh8bxpne4ukmszzowmwn5i4qjzm7amo0y2p4',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ivkskuwopcos5s1pmdnqzqiun9ql571irg0hjsfhni3zslezw8dqydkz3jco1u1kr9soe2ydlarur9sfz6ye7y6q62kw3fvedpqpmll1dd8ecis9rbxp3820qozzxafgfuun4y68h13bnsn1i5eeehcu8ez7hrgq',
                responsibleUserAccountName: '5qvm9071eb7cfkrwdgw3',
                lastChangeUserAccount: 'cxv7nr3na4s4yey2knxd',
                lastChangedAt: '2020-07-29 02:14:19',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'ybhch7vsgg6v5pti77ggasu9jbh2s4lon741655v',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: '8nxfwz8cxu8yrqwuwndi818nfxy0qp9nz6hu5lvh4xodhxzf00',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: '34643tsiqsxgwvs387fw',
                party: 'kujx1j1bd2fcpwi5lyf1hy8lfn7kivquuu83kl7crbdjeyc05ui1vuih50fny1f9iwpvkxe18p3awfdk3h4rf409b5dnhh5fjhsy6bzt4nipueuy1af5kowujshgblgt009hgyrrg2igob6152q1dy8e3m6zwkfu',
                component: null,
                name: 'but26n7rsewvia717ttt5l7263ppdwd7k8tagzfuut82mheb1s5r302ycgbim0yhwohhjb3i5sdwayhkckvz033aufyst36szg02xuq9ot0ofaihes1na09oouhgbcol5ambpxkcg0t3in3oyzdh64r256y14vpa',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'fe6tr1gqec67t6s9x2g3j0995r5s0bqacoq7zxt2i87sbc04n2wqxhzo3cb8hfd9rcee2r36ahgi2syciqpmxgcpxo9eyesk2swz0aiht3kxinzgbkjaezpsosf7dw6k6a5vzy4z30ldjg3b58igj2qe83clu88z',
                flowComponent: 'mjcjg64rrpbfkmr8ci0gyaptjqtyz5myktsmjoe6i7e0if5f16tozsbpab0w8qpzzudoby9md1slmncz8oef7oulu47t9bl7jn2t636l5q6iqfyzdb1s8r18bk1wkkqhnvsz7unova8ejv55h1ocdw1vzhqusxff',
                flowInterfaceName: 'wycaeiosd1me2zu0zjcthtwmx1l4zi9a6eft4bdpm3e4mvxvzmbmm3zl3txhpv66ydlzpbjym52zrjlb8ejf4exi2ebrzyu8hxixdi0xq2uhoc6j19c3z0yngr9wuf4fogc7marzhjqrjza0a3nt463mscexyzjv',
                flowInterfaceNamespace: 'z1ljjq5hjx3zoe77csp04q7t6449kmm7hjocz7rfz982webbe49hfehphj0qsrhhsp3kvnqsskbf9mcy597hr4qpjadpl7dkqti1g74fn3dlsattgjgezeh5lc1jf1ebodni00ahv7rxjubzt82wxqwg59yawf6y',
                version: 'ab3owdjg1j4l6y89hbjq',
                adapterType: 'fxhsz5stns90ua53vdpgt60njudk5nxftwibzqh20n46xba7i10jw3ny6bwy',
                direction: 'RECEIVER',
                transportProtocol: 'f1lf2snytlyizxo9sk8nj730okrfi7wl3g1wqeaxi92nkz7p222jsx153w4e',
                messageProtocol: 'crk2zigerraj1ram7bbposq7klj9e78mxhab2bpvvxrsyj2y6sn5yqoevm5l',
                adapterEngineName: 'w5gw9nff9u6i3nmbf8z944vjm5bil3no4xu8k170g9xnbrl0qqe6j6g7f0db6859lhhuyylbeao02na4d1870f6bnd0cujnw5xb91p3jlc9le3qveuejm416puxy9za9lu5t8y2ig6d8zr1jveikj2mb9n2vl9xd',
                url: '5j60iemwn2liq978eagdvl3yw1ez7dol462p93h6d48w5xergvve3mfl1zib3nb7qukghs6rzp3y9okvnzr4et81bhrlji3ckvm3oh5cby8dr41v54ijretgof8vp7jcti109sdimhrmd12o2qqwyknzhbexmmtyfablwqcfcloilyvjiqhnkwruyuvxjemwo54mgek92k9tbwd8zcmk2j1hfxknp92w2vlr7nq13oonagxjgjf1ndvgya0h62d7tll4mktb892iov9ixm5nkau4hrd4h1sge5cdzs9x8s6t2o8dq0a8bhuyyu9wgb3q',
                username: '8e18kgqm8sqn5zasxsuh16w0xdyhghflzcr361vf3gwmffjb4iwl0x2qcz1v',
                remoteHost: '5kzw58h51x2wf7m3bp7jnx5k4af2lno06l1zpepwum288uklfgkz2qcqf4yczlvir3f95ad2eumd1crg8ju2ggfgqes4v7o6ifl94pmmj4tyvmd7aoemc4j9wp3901060cjcpspzy9dgwyowqsugrzqtn0zqh714',
                remotePort: 7435769854,
                directory: '2f2l8t531v61k1whlk5b4mdw0sqt4dtoms99lbg0p969w8qqzjhl8nbvyd3dly04pn1bwceyu9oj3fkiiseq7t2pupdwsswqhyv0uy6upfmaz8nt9jobdwzjlay6e8ltkw3ato5f2u9o1ekau59u2x6r08xqmzom8ffyannyrvgvkoxay3xdnxz0l659r4y7k870j7zmh1emzoxyq0rl5c7sv897fi3gkddhuhcjhac9w4fqh116t84zmz2ee48q9k94ws31wdbog2vf0rif1bs6y8sqxc88hgv1w74xthnuqwcf4n0n4zwt1zm6qvptma9bhsf2cnw33ra44vpz9g5ej3yx7woxuv7g427pb57k7jmcql9paukthelwve8trxduej6v9zlp9ay2xfwfa9mvd0vej26u5ndxd2jqkdpitmonl1ro1cwcs5gd7czs0h4n7khu7aogb9qsm30q966cbslc1mwk7raf2ibckwy6lbks1jg24jvd3n4yxw7s8flnxt2yy67t68qa4vekv0o8g6or0780lb45qidiag898mbdxrepb5qlanjdcc4i3qjyntebioqekonh4g69qlu09pt2b2goyysu8zvess7um82phnpx82uvnbog9hsnnya2iq8hhqrbt3eujz5o1xia67ys4ok6bzsa1tw6t11ut51dfuohu88xaasfc5idzq1m5td4djknm2y3tq3u5lmt6gdt5y1968e4ag5vq64flbgtar42gkm54tse57vhdnl17h02m5cj5xbu63jz8jt0z1kkskgwrdrfsfrl8psb3ot4mfukowwmlr41egrq52k47ugzm8dpq29hp8dklo1bc1ldga49y6vlc44trpya1cizyrv5gn2rudhy9x5hjybkh00l68phwceptzru0fg5dox4pfnna6xc6kauu94vik1cy0cvqnyerp7krtn2pxfcewr8d1niw1lesb63x26psi4n66zyibho47cd9co7c03kbm3sb8445u99zaf1',
                fileSchema: 'h4htfidqavhx7oyyq59edcugcfeb7hjdpnn6pwrhs4yyjz78nkkyqimhpz4ohpuj205u9ozehy4ldq43rs6x7xhbv7zpc49wdm6cxara04gphi39kb022ntew1vyuqvewn5mfxofefb0u0ett1w4bz7ck1vf2gn2wickkrwwt2vdzfh1gco460xuhfkuwf76gnnfd5l8i96o3q4dthn4ul5lnk8f40bwstnrb3ovvycrt9lqmqmajt4n0ztci2ksljjs1tksu0ji8hh3atemabdo5pfv1nfrg2ck8o73i6sv2hroq4tgoo921epyerf8nwpulrlo4ktt729kt3vgds1bjzjmp54v3z16pgc0dw024wk957tsgaza6kwvi6mfk1hlceigexjwxd1gh0fx10nybboy6shfqlpzdna66gmnmc9ioo2jx9rj44ax92u1v3thbfumz6b1w3dvkrkd3hh1ql8pqduoo3f0ee0zi7w2nhntn2y9jsmun86d1cho3mww33gilb5j8fhwjqan3z5kevm599psam0b0558n094wvw4m2zzomwrjpufjpzzsubu2k3ekfo19lb94ruc12oaujui1ijl6224pqm3qesoroy3o0zdpy3ok0nn4erpp7hrri7et4wx8dur46tdxx9q6hxjmlj7j2ybwj7egkc00024xj386edgw57xgmes30tvkbr4us3p5dgrm0mdhmx0v8zktnppza90fy7nvenkao4odawt67abpx9qvtitphncs0s49cmujty5i6tyjogxvcfxk5tum9hve4lubpwhd1k5w0iuowvnsenpo5zopiq74qqu9nwsar05jg2nt5a6wf8mzss03gfxvi8gjfa7cmy0vrg1rhzlkhrb95foy4w7jk2c0jqcxlyj6ul2sgdujwuvublpgf7vow87b17luf67e8g2ymv5qn1n2npnc50ix5ljxfgkj9a3fu2dsswehhm6hrkaxxw4pk9xzwulfbifrmybv931cr7n16sa',
                proxyHost: 'ri86394dq4ff52cuupciqm4acn0tvwk8ce6clw7ns4memo6b5jevcrqtcwq6',
                proxyPort: 2446347913,
                destination: 'o5ajlh6csnuowazpywieiutf6b71s0584djbd1bpw8sl12m0rioumrla0nq0i36ui12tq4diks7b7rfjuli3064knpjjxfslspqr7hqgsxajunk89lm2fr4a7s2ozi79ynbbqlp0o10a8sdwe4830ufv05omnqyg',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'yrbev2zjilmac0iws8wltc7t1v218eafkeoi1e2gkw9b2kw0hrch8ptqvt1ty3n0159d6zklxmqtw9jewq7qflt3h0o74yzmxs50zsacffp26bmrzez2cy59denxf9336k09dsvxkpzmh9s7hrl72qxq3g9my66x',
                responsibleUserAccountName: 'fzz9cggyce97a33n34ub',
                lastChangeUserAccount: 'i3gtxm77z5tfzw8drvz3',
                lastChangedAt: '2020-07-29 00:56:15',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'mkwq8e6vacolbwd8bvkniysj8jxmcdbggn06t5xp',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'mcwva81rr05v0y2ou0ot0jbsos0gk5wfaorol6hxfsc5winwoj',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: '5tee6pf22f5lenbpu7gq',
                party: 'k9hp7w4p0dolhfqil098habfnde6xrfx9m9wdtur3lc1e00wvcugq2izmjdt4by979vahg3w3i5aihmxhzvjp5xywpib1y7qezzxfjtlqofwu5pettlk9duzeuv3xun9gbpfs8f9x5qyoj5672blh3oqwt9knsh2',
                
                name: '67favosezwh58jztni6q8by1mj7izi4ekmxlxeponeukmj1qybvg5ovwqoybonxvqmhrek53y0a5u92r2v3xxahvl8mtq018lsiles4b1lljr7t5tl8wbn30abrp07hekqs4rxtpv9zw51gbpdxspmqe8lc1qmv7',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'ritn34wvbmk566226abgctch7nvpmqbd6vznxw7howu3ocqtwu7swizurqj3ip1ad8eho0e729grr46neg1enuyl3xlrjf3q0flb233wyixb817cvydt0g00jazhs1wnen8o5ublfrkc9lfvae19634x4o95e7it',
                flowComponent: '3w2v80r0k77425738fjgdrnueyaqv2xdbwqi14gjjsk03h5r72lus7qzmugmcgvfhxj4h2cua5zx9x4nja9ozvskuagpovj9lj38ytettwen5ch5lgon59h1sm2kcpdvxdw08bsh45iyobvi4nof5mje719pz4p9',
                flowInterfaceName: 'u3m5v33u4u0hqua4ck0he7btbf9d4j58s2f4bu9mjh77k3nx19jss9oe8isv0u9zwnyrklgts4si75h0v8qifv0yr6o2vuldcfz112ghhfnddhnpjo1pjv4ixcu6vq6hrimsi5hkzxz73gmdtdeoqo7qdus4o9ki',
                flowInterfaceNamespace: '3ngr3bn6bbstxxoxsk4ixmxbj3su1rtnx90jxzmqvf7x558f576o3zt7mgnzb7bagqk9yiyz6zhl73k8a2szitwrp693lad8clw0aq3td8nejnhp5xzoljyy25dxco1qy76yffbsevqtniissbi39zlcmbnkppld',
                version: '1n27i2npm9sfrsss5waj',
                adapterType: '9g0nicpwb1qyxhh301g3e2xywoasd254az23dsrsvghks46vk2a81th1647d',
                direction: 'RECEIVER',
                transportProtocol: 'rxu4pmpq7gmowtik01ybz6eumawuq2lyjln3hi79keim6xn3pmo96kodcfbh',
                messageProtocol: 'rcddj6kmwtrs9tzttg88p54014ibtgbwu9o7pzw7ytnmy0ha6y0ne22ds1lb',
                adapterEngineName: 'ti1xddwuebstsr36ayfnitnyzixa3cn6cx5y9znls1vtxervvgt3fqbyoyl8hl0gr8otfg37xpcs6x9peiflm6g9f7q8kjzg5mp9mxlsz2uieb267ehmajbo0kxg933snaia0p71bobbwygxg1l41qaagbmyg1bq',
                url: 'm592uiv9usu1peaq563n3ogoqvs5xm3xxi0wjq887ofvjncmpsyeiuzcd2aar1ybs3grq6aycoqpk49e7hk8wkg9hyal8lqo5jlx0gxbmkebnvrg25ytw6jxv6ipwxja0jxraykqhozqkebqw7tvyapc6xjn8r6omh2ja62kahturzy42c8vlbp8220fvqtniwhtxhumo8ugusf1965hxctfvs8kfb7mjpayh9oaenb94f9ew99bsfkg9lut57744sclxfvk14i2nf756czxia2x852j2fy3zlyab02vs5zs9chxwnxrpr1rok0836x9',
                username: 'dtksema8bn1qs6ndmlj8dd8y3prtpryt1mntcsgfb2ner9g91dehap3ckq01',
                remoteHost: 'c26wnc9cemuol31fp4gte9jqpu9ncm4ymci14lf65qa9oumdrb3arw6bhu7vgt26aenoae8yewqok8b999xpl674rdopxlolpw7sd4dcxnr0il5uq545yi78jsu52jwyxaf70puzs7ytf9sygh0hlnyhg5ll8l4s',
                remotePort: 6784877165,
                directory: '5wckjnsr2dhob31ce9853u99qn217mti5w2pcpujfdcy6o5d951eonql9nt6yxj4gbwb312qc35u22wcuct8b6f0bgayo6299w3jv5b11l1xdgz91mbc7bhc5n74o2nl0igz4t69p02g9xhg7m9vdtf5lyujt35d7b2pn3t0uda42wnymqicqe8pqazh3fx1t7c9ae94cdo9a9v6dr4m6h7pic1rvmzo9ickxfvkaqv23t2n27pqx4trvgs7uzqfqddok4zss5q38ue6yshr0w7u4sn5z9164tycpajtpxll9zaxxijsjau6e3pd06gmkk87ct4k5pwhl68l4tr1wrb2od73v0ebtt39ys276iit90471s1ye1mdqozl9xzxwdsrd30g22d6y65s7lf2qafgxjq1kce91b9em65sd62zp9cfjd8z350hh8oeim7zxpwpz0cadaemis5djmn2lf9qfos3xped4oj07mfi5s3pqtaps3wadyzrcifzvw1zq6wybtk9zbf0acgbnldgyoubk02hzlb7zm2ssh81g1w9ov7j0zhaujoge9whw23zhtnb7t30hsuh10xrsb6z7u39gzovsbxgxw7d9r3l67llb05aysl9gib7cdd42vb4pp974pp6iialdb0sti9week03066xpvpfaeqhxmtqoj6nxv210xwz85bsx00dfkd7oq4qgowotgc0onjtbi7jrhwd46g2vjoqa1wpc2y26fzcb4wn4y14qud061gguc9hv4cpfyatb97169xtu3524ruoefw92tmn7rfbkpotscjg76m2asqcl9upjnisyz6k9k2dpxsf2gtx3h53tl03o0k8bnmrw0ykc3y80simbaubrvmuusm48kp8rqr09pm5o1tj73lz0vs16jemgxdam5r7cv2ryvgj2md3lpjzr23z8ox13t0jv6mcnwg0ntat5mz35xd78zj51kp5lnj0pqvaf529ug5dxptml9vxfrxp5jrjdmlc8swqvjyfm1a',
                fileSchema: 'ox8cql40ksjo5ea6luownfmfnidc0d44ua8ztynahofj7kw30rgk35nn86drj6gliytozvzm8s3zv7ps6e8077wj0msuo1wiyx746mfzdm8mpl8pudmc8umu2aovg62z4f7f2xxu1q24qdj8on35qavzh6yc7qkr781lm4heqonabub2bkg84lhar3oy3meyw6x1s0q7ps6tx9ye9ltj4o5eqh0cud0rsbcegplmvimuztkgmwy4t742ztou0airlzrge8sxt8361vtebgdlawk6plwijwhxvz8e6in96bzydnnjl1hsmlufid5lboqeqt7rv9fsq3zga0gzn1x2dm7p6962vzqwja89rbm4doigohvhpapb4xoqe4uajs07qimyaz7i2bc2ex53iibnusdbp4n039tmf6owksknkvsdmzh6mz1cgyc2k3iuicmkohe6eq6iy316ocr7lz7v98txqkjqsnqgpqjz3l9y4hc957ous57uipq8zik3w5biv8adzu5jwv1merguo4gmrznk5ha1z34m1uaehofpa3eh9a11qhx1c3yg10hsobnc3hf8tsv15id0fak0xu0el1lfn8zvhpmupu6miv7a1uxu8q02ef2f5ye0qvkb2t7ivi2hyjtmlwgcbcu95mvm4ecqufwkm6gj7x6b8ranj7pfs4lrowtdqjbg7vtj2a202tbr75uvds8k246c3f3zpaybuam14pbbnq6m8vfwbt5avgtz16f9kw379swx8bjzqawwegri86j5v04icwncu6mt6or9b06etbtodm3cjoy4w84m64omukqjeb9ei7rlmb97l6c0q70wigc4d4eayss9m7lssnggvlughaz89dfgldyf31voqnlaihkbgw7p5dqr7d54013vaz1bjs6q1ee6tz23usbcmdfoja639nnxu3kdu56wtzdsnwpv2b71parlufx3tlbvmoncnyxol3odlku4gt1xuf7mwkc0dpk7o00d74f0h16es4zke9w6',
                proxyHost: 'u9q5y4kbr9e6tb3ed8crxdbxynet68uyhs908wglxgl0gmov4cie2v8lmjub',
                proxyPort: 6439111244,
                destination: '97kmpblacyfkr25lrqbst325gjc1a6pq4x5hn52a5pxry01e4rwr04e8bf1bku3cdaolug5124f1m58oxy4hloeq7dtucvcq5nnkca3u534jw8h5q9r029cre2sazi10ejadfnjd1wnph30bvi7vmx44av4evpiv',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'cua5974xbw6wy0ugo73r6b1f36zy3iyl9tbx080ejrawutudpl44k7gln4d7koskfwzdc2u06w4w7ffgz9p5jg9v1ah6o3ahc7g2wl3l60yqatsgr1t8nrckjux24wlsixz62ga547ubjd18hecnbubqz454epsi',
                responsibleUserAccountName: 'zyisflb9pl0zk1dox2g0',
                lastChangeUserAccount: '84qsesok59zqjvobh4ml',
                lastChangedAt: '2020-07-29 01:35:45',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'nu7zndf2rlxcm61wvoxgxmu81w5o054gn3gn2f8r',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: '0r69lnexocyyvqmecm5za8wm9dy2oi5bh07sdoaecx7o95v0wt',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'bmwf40nviw5dsaiadei9',
                party: 'cqukl6hec2y87mydtewk7qy0zi5cbrvpj4zx468ageyztsiw1vrhw95s8oaurqxq0k80lx64gfgp9x5cb68dt43gg63yzi87nwolwoo8s5uyqcte085uz97a6cye1crtbu5r59q1tbidvzzi76wcmgohekptc9ke',
                component: 'vpfi79v2j4u1juh7phogqyp6g8bvcgixphfxst8qcabz9vjapklvpd7956fl2tsgt7t9sxiig1n37rirx4y2a7pxinomxvvimmn6uouwi2e1h1no232kula949uijjzfy0irywor7ktf59ua0huflpe7m0r6ao25',
                name: null,
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'vrn63h4egcmapimk9egikpc5tigwbj9v7b7oy2c1sggvnqk5dwsvewx9yto63ip5kc1uo0vf7hbc47vbg3auow192wx018pl2xjezwoxwn5qaa1q0ougx75sw17u8oyvlmstqw79ecuj1lr0rnuv4x1nxhnhsxxp',
                flowComponent: '49ipg9npucpizkh4o4314sm7m6p21inq4tshq3aujqg6uczgxb9l87qfzm3ufqkwmqdqjpejaal3kqcte69i8hgvf2rx8yfzf7oz9i846q5iiy07r5kkddcloml8t6pw3c7xm44x08h7wiluo8fzrkr5megzi5p2',
                flowInterfaceName: '33g8c53j65j60ytixevpi816du1dghnkkd5ejcg7npgmtznpi03w19pg02hitcqwk0owefevw81n1n3bkrj4rkn7gf3e863cj99bakuu5kecrkl008naqiojgy5qvi7nnl2ok5fjv5kja6qbapbf1hb1n3qlwj91',
                flowInterfaceNamespace: 'jqqt7yv23wib62525fnrg3fszawb702iyddjm55n6ojpt40zir2lno0ply464d2lui5q9nnw6h41aqqbh9xq9oqy4drcyoiqkekkhht4n8gaca5fyopbn5idhlq7301fknn37i8tuat0k7dmhlh9i83a4kh9uby0',
                version: 'cj8p8yct03obv46e4bb3',
                adapterType: 'jg2y95wvobgp1mepoqx2h685jd2k9h6xkqrd7z0u4fm0rmo3iik794fswmc7',
                direction: 'RECEIVER',
                transportProtocol: 'muu6ygnspvgzgjuotx4jqzy0z2niu1w40wk65ys2xvk4th0leb9b1ej2x1fc',
                messageProtocol: 'z18hxrufgps9tovy1bb9a7ac5trr3lbyz5gbtw5eo2t7mwpdlfzxp0lu7032',
                adapterEngineName: 'uxnz0f6al05ku4g2wk1o4y3d6dne3elcev44rl1v5547w4uverx6jbvspcvvlb1maqtepjuz1trtksjc0y1axofksou9mgo6yqr0rz1oxlp7lrutoggsxhgieiv440q4f30tge5i8ayeax7e8rs0iitcqt2r1n8u',
                url: 'vh6n7383o6o29n0t96ach9bsmjeqy3drxqtsimqzcrsn3rdgmxxn9bkcx8qt4okpryao13b2mqcenrab386agpf84k73ye5ia2vaz6w6ldafxniv2j77s3n4ewwr2qamygqv8tqo1j82e9ctkzxsheuhaw023grkari28gros46hu67vq7ulggiubtp79lo1rlmh7y015s1aepehd5wl9f8tmuc863r08g5k6fksnzfoecryzqokz6uxjk1tb9air0mejj65mgai7mep38kemc06msnv6ligbf05bm956swk7pgwiddajy6m1bsx6fn8',
                username: '330ez7l0mp2arq7elkna5uqlus0w4ktnesiyw1qvh2joo7lsx86epccdfxkd',
                remoteHost: 'qlbt919a4h37jcvz7b0tckk2dll4lxvzyu97nmjb7846lnbjozbckv1icjtytbn3co6xqcnd94k5fqh1jhkxov5sleyl6lu2c6bixdbojwvyh1kre49e4uubf0fhgo9tt41t9d2um0r6sr6gls005d6h6x2r29u3',
                remotePort: 8825626159,
                directory: 'esymcaid2s7t9zldf5c0juo86ch3p6wmlw426nb49y9xo2p5qnx2sm7uz12nxxe77tr0sf8e122ylmb5kyjnegd1wkvp7jvxvmwpvfkldyvrmn45bk32z3zcl2hnkqf9fx4pmxa4dofdw1q1blcnr6bav7s5dwe53azcb1jnytmqjt69i3993lu2bjng8rpyilq8v0a8niouyf3v6fzmhctmq3mupab9ebzo1xc1i87t75bpm9796888vma7byhvvvwnxy7h590kyectimvjj1oskl2mgdp07yg57dfkp9tj6kg5u1xrxp1n7t5dqquosp238yd9nep1l4pyumlr3eoehw0q1nhsurbxdcnw0p6xxbi20zpo1f97puwyg34xk76lnl3bhg167vh4mtsvz447w5d4pd6u1f5ehltmo7fjj9li4lmyd3leizrtdc5lkiqzfplo403sby60l1s3iy9iii009ipuxlnivbmzbdwqrrkkvnenv5lfu0lxoqhx2zbxbiohre6n4zuyiy02f0dkj9zc9eohqpy6rlru13y1m58eqteii0lciectp7rly4m316zxb7lxzgrerphrs0vrg3sa7mct96kl0yn6wnllm5nv0zb2iuviubgpi52wfj73myjndfexx8sa1vu4b7dipsqe27ljpslixiam0jzctln1hro5tl7b3hhyqdid8c3ccffkyjlo46eltbjjuw31p07twfp6lakobkbi6o0wiyqld82u7y01tw0uty0c3j2c3abdl3icvrdys8tqvru5otkmye5nlj0se9pngxw6lxx43nnnagkk3ph2rekjskh7kqz2r49ryneyl5e6d9zgk0mgfsokp1rnt5trdalc8rygossieo8zthqot10ypj4dt4s7kpf466emg01u1epm0dvq3z84fu2a2t7zno16bzniy2jjdjsin2apguc1sg2cpa14fkxjanze75biqu2s1omtr8rfvnc5lv8d5x5twu8v47dedochcree6yes',
                fileSchema: 'o7n8e0r4svmf0b5igoxkccetypygym9px4ua2xjhn1rkl5ublh651labrzpesnd5qn9nut5wadf6hp1rpbmg0avygtlywjcx572a1crhrv53qok3kakqishprbn5pdwe2hv8gtns2hc7snl6akemuerlx0pgh4a3g7kh2ob51olgvhwz2csr05181wm83j66f53qt5mlcuo8kqiy41tb7nm3hxk0s2xxglk96xzr231stu5fg0we9wilwg2gobprcng0l4aho3uad39y4z5eh0j475tkhsri4l1c1yifugyp37stlal48i5x0jwth8igu97gikob437zfcug7sq28db0ivlutby1g7ye8npwnsndywty39ahe3w05087krr3qlmz81mk53h09fjwgapw1yh7jxdnzzbglt8n10u6dwre55brshj1q37kjdj1x7u0xn2icx0gzwvouzf9n05wtsxfqy7qhpn3st7o45a3ydkaxi31hpvtiqhf3zf2ad76xacigak5qjyyyrngm5czigi4ez0g3iyzvmuvwo3b46ogbtk3fvgtzz8cg8qlbzu0sk7v544qym3nbpss2yeonkhq2esj4mnt6mw8x7zyn2ukptyia1wvmz5zcyasa0hzgy757yljrnp61xfkb1ntt5xqpui140nit6vqmo4tqcvkbfqnq7z9e13kn6ms9knotfqayapfz80ylv41vpi9nkh30d6uo9xjyv9d08j77yqcoeqe8llwru3a95blwly2pq4ip7vnwp8wjozgbvrv3qhglnhbcahygb1z6dzkynjo4pyval49876j79o7n6vohczftnbujwoeutn12jndd7i0xhyw197sstvqcmcdz902j2ywinrmo1tm6hfjv06gm6y2v70r7ab3a94h2ijul9o8s21edca56vyaebywag9ox5pagmq43wejoe1qt3tiemuhwznjdjl7vzs3jm62rdca3sxx83kqjh6k7a5x5qu7s7etl0bsovb4xgtpi7sw',
                proxyHost: 'wutof9hbkhs36f5zuqgxheaptji2lvuh9fr5aoys8v0tf643zf91d2zva703',
                proxyPort: 1020989588,
                destination: 't20sv6zc5i8pa1k4pyzt231bu0iipi1b19dmmtuoxaezmey76ojpbiwhq6l51hud9ho5qtpk2rjxlt933xumyaaxmnuwrbia8nmju7xakbgio6dbey5sj5cpyt1stom60j6lxzag45urahly9pllzjmuli4evj17',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'tpicrq4qedvmj1c8k3q0vh6esskgwdrgfdlm2jzmdiktkdinby98lalpqprl0xaxipdg1uyegwdjr5g996kg86nxtraiiaqdj0xxkqgyqn1i4a735e0yf0ipgyvdgmhl1jhidiignyyt7hba4w994iydsd1ksaoc',
                responsibleUserAccountName: '8xvreztdr5p4cjjvc35y',
                lastChangeUserAccount: 'oq7i989kpsi0bj5elteu',
                lastChangedAt: '2020-07-28 19:47:59',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: '691n20ojxhag0f481jcp63pyta8htno1viwqavnn',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'hr9bymmo7cm27mks00zysz38z9c2jywp24tuzp850rvd6gqgod',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: '8u665zf3g1tentgrydrz',
                party: 'f2k8kfr6l0sqcig369sw3l25nns8nm0en317mrgbtoprlj56ky6cykj8uygege57ekh210t8fqi66eeexwta5107ngyjv815qn7fgtm4m89ejqdtp3n831iloysr5jgg8x0lb0hd7jfyqxdc1ccjl7f86ko9p7hu',
                component: 'bzs0ixah5dcrhouzl3jrjej9k2559nmrk0qzdsh7n1cky0kx089z42yohnumv3eqnvi6pj4jyfrq32oejisigw17wlhnd5l1jlmwbsnw2mal5pc94si09l4ahq374p80wf3yniwk1z7rsuug6ghk5jg3yx64r7z2',
                
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: '6wtyigvrlhfaevv7obwuljsagmyx8drn2ijia7n6v81i55k8d1k6bg1v3md7p2gilm4fc36s186aah6asmm8urzs7vkxhwev13auyzophdxkztg01z7hsu0f9sicybxd0c6sds81l8hauf6va5f1bjacvkyaz7ho',
                flowComponent: 'qknnnq2obxccgk7cbbefwj8jexew83voh2jztckr3o8pma0q2xh275b0p5x9hpu0tiqc7r2varhiirtmrjypa682h6acfcqa8w96ao7v4guq0qc8afl7g2fbly3zwomnjngwl53lvlb2i97z62n311bbic0kj9mj',
                flowInterfaceName: 'a3psxbz0g7328k1iw30ft224ngwprdcxolwwjf5lkfe5buftm9ysy7romwmvvbobb03afthwv847o9tk51l86myoa00gyqhkcbwbku8hp0hx40idbevvz3b1hajw1oyri0vbawramlhp7ssbclgixp4eq6siinrl',
                flowInterfaceNamespace: 's46qxmo0dy6so5el9rj0n9bht0llhni7adbwcnfahm68cu0qmnjfbxjcn429zjaycarbyqvincl4qc7qr7kkqodg75zyosdigjyad0u76wwiqfconfvy1bkf6x9nh9clvm94ajxfg1w1uo4o5xqyfz582ge7wciw',
                version: '5pcbc2pdf683ie2l85cj',
                adapterType: 'r1zsjkosdu3cb5nxqkouewrhdxj8tt4wnhdwnz0klderzenlknfglmzrlsp8',
                direction: 'RECEIVER',
                transportProtocol: 'fhnpfl09i83falbwcmvdh3zvwigewvdii6yeo25zrtkyydnbfs2f3q16h363',
                messageProtocol: 'n8umhamrccyhsfjus23gvs3gl9kg0tktb2msuwb82uzs6pnlh4cxuzq77dva',
                adapterEngineName: '5osqkfthv30yh3tzqg0sb7vrhezwlcqx4jijz3cbqxxt57y7jtavrspefheih3139d3jrxmqschlyd2so41uojm81w7ueyjoseen3gv62zsxm89usz8xl4oywsvdewcovdj6s3orbf96qjlriyryzm8th1up0i3v',
                url: 'nnqh5xmq5gwjpmscp7uclteq16l2attcgrs45aykwgpflgf10q9fz3x933jji188unrvavww1pyyyx997c2km8toib4go9waykchy660f7eoyb1z5d4kubkcrpz2r4iwsjoorfettcu4c4nc84t4xlio94tyeg6gysmpepn763219vh2mnw6jqrhwkhp60f7fuc0f9y47tnd6ppliugt76p0mqn8j1tn8yuuxjafx2i02htkq6u2dnhkjkyfkjg91cvvpt2mj5co3gjezhk9ewe3sx4jy5evscp3fd2f9ny5o5hvczw20dgwxr66govm',
                username: 'bx44e2rnm1v0aqcqdvijtlaje58s4tg8npwj43medsagnr7ir8p6mkah5d69',
                remoteHost: '9e2neye96vm02s24v9lv2na3t8q1rf1hzgxmn5w56qvtg21n35ksenlkmfywa8sm4pebxbmvnwgg22aa7rb6ya6rfwmuo3oaw58vuid8udgs1vdevqdq8esm6mez75gobhiog98v2r4nuhsy0gwu8cn83g43etg6',
                remotePort: 3403683270,
                directory: 'ecvl1go6q6vvx6niq2f1kyeccn478dhuxm4ohoe84dg4fefyyi7z60iwywu8i8t81pwk44sort2sr4ygncxcxee0p88d9jzpd223jc1v7tilq50umyfniejop7khvzntiu6js33okdwnheoqleu9ycmw1hfj2bsu2cw5xcs96ox36shhep3fkca2azl5jxrag9shgkhwmkvbmiybewuipdo0djr4onnreuy5a82jcyl3v27tq2hlticopbgkj2eosjo6qp8ssa0s4ni1z9f3ykkvcmw0jcya8rdmscf28mnzs7u7dup5o44w2bbacfmx9uhe41xc1hr994du9mjlmg4sz9bcjnvtmgi9gydu7yqzxwvhzz8tzrrsayjywjjccg999sk4dkvvu1o96fcts9dzclpenl13e6tjvefachwlmizxb10ahoho6c2fxmyo5m3gm32bngl78uy421hpsjen1152xh64k8hw8g7pp22p7qahe78pv6sli2oy5wd5aq3a7xrhvru8h5td2205mdcwnucidsly78vvx9qtt1h7o8lj5q4ge6r85b5y7wmbqa5nwm3tgdwqbocn8ogvyeqcv2yd8w7ra64vcmmlsv0epkq8v4um925rfcahiqd0uj3w0snwv5urgb44dtypyqqop7j2i1oxiaozvsm79w79yiv3fj59gg2h1w3d8czkyn30oguhbfvl2g0psqpafwx081xmmyc0ig3j8zc88r08673ad4owuyvoxyt2pp6y5pz09hva2rnqyag7xzdb19jmt2tdvnyvq13dk90zw4vt9op3uuovu8nqnbzwp83vjrmridguge2gmp79ka49uacecvvcfyu3tofljuu0fdnaxnsfg4ef1be5y91xbb0ahrcmja6fvzq2l4clia3ezixfa06lg9h2ndpt8qrailgvupagfezkwucjks05fqurdxjqa50bsr89eagpoiexuo54bzlf2p75xjpuea02gxemljtvzods8ncdy1gyqcei',
                fileSchema: 'csx84bpitlsn0unn7i6y6r1l0c6dm5z9oe4b8c2ahd3gtw4njtweelnngl96xo8mcb8z46vtialxp56uijdvwzltild45r708fw6g2l79b67p88vjimz8wqtiydxj5cqg0rzciossb3bon5gviiv4nyfm4yi8p0h2plkm34f114ut8waysf9fyjf8h8klhdr9t287nqh4aq8m0r7fi19n60sxn34hr1uryr4tzy8dsxzum34sgc9o9oto7b2mr9543r4v690ue1u7qf9zdduj2410gps0b4jnegcjnvbot7r2c33jhaq19v193co50if6r06sdc7rzwdwcbaira2jk83tzqtjn8vwpkdcn33grhvtng9kim9bm9ghl156b4q3j0yr38gc6r2mwxix70hghuya9d77jkfvqe95j5c4a4nnqjzeotmxryjk6nh64dlt68hjydlxaimimnjboiaylldhspiuohjgj8wupb04er95jrg714svbr8vshmr47pkmysd2w0zcjizzqbcjvi2yxf06mvhqfgagmxvy0lvilmbfk9bl51phfrpqotj3rc0kcd8xdo1x515tp0yrt0gi40tmncaildpjeb8bhct37zozy40bxd8kk68denkyqlu7dt2e4e5xhoanov1rcsbrxlbohpb2a9lim0rl1yo2xg5ru5xhwcbw55uknu3hm7g4802n1wsxs21pxqz2oj776zh4ddgwm41zufaqasnfc9yvdrrwouei3ti5fqzbgqeuohlbs7axeku2hl6jwdru88hkhhwkw20swaswdv2ut0h9188f8scf2b4j4slj5bngqn5x0bx4mu5h4065syy3f8zv4jsgmz4xllkdvo99brs16nx0iuee1hj59uz7o52vsw5exjjqitgn116f3keu0uturai7fyr2zwbr58v8ixnkjerk4lncbrpfwv7draigczaer3ge246pomzpuldrco5dtwnc3vq7scm0mbaryn6oahc3mpbzhov3qp7lv1',
                proxyHost: 'st2s06jqe6pw87unu16i7qowzj4og9vmmkwj9u6t5k77h2kh653znlqw8eoc',
                proxyPort: 6875591648,
                destination: '3orx9ozjmmr8jkr1o3iceann569ukwki9by02r0mlb0lvkqwesfb97mjk50nh2hee0t6cx742rm8yfhgqub82yho0ve394aq1jye918esors66quxe5bhhyzhkputh2hb38uj5gyl1ma8ngizcv6o6ttc8b7qce6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '6yfpvuzrqy441ynbu1ehm6gz4tjj7y5mlxnowd5pt7ggbylq1f1admvrir5srttoowe3xcpbe2txwxkclx0b81ft2or4bjx0deih5xovs7prr11hokkz2dfrccjjkah9odseskh0ishqj1xl43pv1h31hcsx9n80',
                responsibleUserAccountName: 'u28yxp2i7wplflkfmorx',
                lastChangeUserAccount: 'i9xsdlivsf0sggzdnek9',
                lastChangedAt: '2020-07-29 05:34:15',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'vx1gxadyvr8r3cnbhbx9zqim9sjmjq649h31802r',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 're127r1t4m277q5js9sh4nvue30ewdqsogdn1ho4vdxgggu34n',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'v54il9vkh76ypub6atg1',
                party: 'vh62exkbng7hq1nt3d0xfhjqcp7odxjk8s2cg70fuhgmuuk7o7ajwxj86vi5afwqb4bd7m3tcnn8ztc8x6gjqkmgtkxu6ymq5me2044suwnwj6bibu0yt9friumpcf3xlf7l3g2x57xg94i0io4l5xslyt36syx1',
                component: 'mojr0sz8f7b8g2emjnhfrbq896gjcbljk05h2tert15064yybhnuumlxlmh1fcy5yc2p4f2cpnfd9mo9hfzxul2qkr0k5pznp4f4q5ff6ne59yxi4q21fomv5dmmbp9a44ufgge38b7qo9e4llpweoikozir5uhb',
                name: 'jmz73022b9y9ewg079bqebqx9namncksvvlkit8l6e0egrela69mtehn87bjbigjc0f7m3sih9ptc5qwaeoigvv4itk25o7p8tc1k8e2bn3dpbhzjrjk349ll6bjtmnjc2nt1mr1nfdus7vbzibjq1u50kxmbitb',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: null,
                flowComponent: 'lp866u05j9zo5s9n0kc9fqqfiuzqg3vfuf6nmveqojjvj6y7ac0uks3v0rn4or1sdo5ujmcvvs91kq6ftb33ufzh2xvhp0zpey9qmkjwlz0460b8xvlckmbvaus3vbdx0ted0opr9j8l6i8sv9jtkadsn3qvmbrp',
                flowInterfaceName: 'wfu2fspyk2vlpueuc7nyphz5sngulo1vx4yqnuymmvimab0ug1dlmz7at2odt9c1mndwxcqjqcmigar3wuuzbrbzqynqn6vcffq3oyoapubyujn27b1g2hgd7fyp2hgptbyminxsm8ftvbbwi7qjf8lh6hxydz8p',
                flowInterfaceNamespace: 'l0kdc5cuubcor45blwfy859e8zzyub5ojby1np4qn1xpdswm38fur5w2uvsni0hqfly7dwrls1nke9h0uko8h4fc9012jm8092e208raaecnwq12tgxjqe89ohm05xnyipex3brj56yhmvs268e6dl1bmyvf0h80',
                version: 'b2x2h05qk3rmxwae16tg',
                adapterType: 's1abmt28lpw12r3fvvtp147fcx92xlriiintugu8c9xcw2csitxy38e5qhip',
                direction: 'SENDER',
                transportProtocol: 'z9gzbehg4e4zo2vtov2ndsmbg4l2ysctt50cswnm9vrlj4aw834k3tzqwcvf',
                messageProtocol: 'd4q2ycuicj3yb2xj3hi07la767ycs1xk44byeavjdnndwadb47xoc2uk6ihs',
                adapterEngineName: 'tw51fe5c746figgpz2af3tr3a618hfvaoqgur30p3e6mlq2iveja8ypaat8k0ab98xu9io1mzkytkwf526uh4o2897e5jtixbw1b11n746tlrpbyz3tewr1c45n3od9m32unhtrz5twpgqifmua33j66ys52f693',
                url: 'rq3e1rc8a3s2dgqjsgukb3v0h59o53ou0sus0q0w6a8546ayl5zglujwjnknihgocb184kmj9sug3fzghtojkt4mw810mwpcskciytzagigkkxgba2kp1f7s4dojlv4knz919wr8ko04z8z07mhctw49juxy7niptame0ck0h9pdkgr60vp1f8xx2s63f5x20fhy91dh26ozpfjd7s0k9loueld5wkr4ki4qhnl4u4t9akc7hppzts878vssehw8m5ungi9sfb5lhlti5wdbl1siayxbamjmubr4uqwf01f8ueoi5cs47g8un2fajfxc',
                username: 'goxm6mardhv8cz8wjc26j8elmx1v79h3y5atdia0cns5csnwogt0pabamm81',
                remoteHost: 'b28x3ofl5zst9p1po1utsl190jz45bl405811fj87mgefdlo68h4r4lq0ttr6362y7ucylp2xq66dtf4mzzkdww0uvtb7uawpzpa0ooy9yvz20h54a0lbjqdwver2de8o15hkqseiekc4p1gayah7m1kecw08hqk',
                remotePort: 9427940658,
                directory: 'tcket6lg9r8diec7y8yjagsrkh55osv7e2phw2zslzp9g9so5t48wiv1ovj4kpgufkr50m4f4tsx2hw1hcyxxa0fvonqo43hdlq845jalwksf5n2banfd00jpat3apfjd56228gb1qp7mypv0w9apc3eo165j069qarysvsnx0zx3vfh9hlxggvp2g04jr44e271f4r5snboctaytlpax3nm4bmog33ub1k0z5mo5asophy1n3v194iefmk4yrf61goam196xcvcwkrp53ckmdjeyzt8k54y91ocaelwdmo0dx0dqrloe5ughnn21ereucnllf4dslw5ilmgiiojcpijhz19tbaaeoo9mh6d7rzjwc1a7ul7gpd0cn19rg28i8jtsmycvy59dpfunb1bjhvwzz9qixihlfth7cm0zea1sc22vpw0euhclzy7zauiie7rtyvy9ibcpiwxzjg6vir2wt84q4wvxsm3bim32ckeo47k2gx961lc7sqk1lp7jdlp5d27geh3qtl983ep3j6zkblx7wjez3c6ajmn1g956k3jsxpvsqhl45kv4hg9hrda40i0z2pofkengd1oik3a9fvj7ekdqekuyyddpat3widu5gglv5gvzy8838hlhb8ut7z3ld9y97v788nykihkryjquaz8phtvyz60ckwhjw19m5em9gdrx5m5yqz7u5lvi04b7yvgf8qy1fs2oyh26x3g4xyw5ici3qpqx57j6s3429gg2hvf8c5m17tnx7rs0cgw0gfglugpnpmqqftvaq171eiu1pg8k6z63pt1wsvzaf1kufdynfosbvswysq52j9rjug1yb6yct6v8myz6xhtauab4dijxev4dk6e0exwq0o29vhvaxmpmkh9y4ijm3ponxcj6q2er2kho30lsh07qgnehejvyc3bx784xesvo1b3trgmwkxelx64fuiof150jgw7sq1dgcgecev94tg4qv00g1q366ehf2d5cism9xrrhfghzs9cyz5f',
                fileSchema: 'm4hxor4m31qb038mru2h21zqkg2p2uwvx6haas51w8qdi6pehshdmv7z8zo9o0enmempkfe2pgh7k7hgbxvp21wcxj7mzsu85oaxdt8oq13temiic3ivdeabbrfc58uqytl8juvhngxljzb0x7pr6nia6odohy7eagjbwah2sf6rt50j3ettr1jkzcu7hdprpl5mjwp61vr3q5y1bp6j9n9wk7kaywqo5m1q68phz5tlouvgvc7t8h89gs6akb775ix8mjx4kfgkge9zhxngubemjvkdw900k1h9h7ncrlnh15tn10u11zwib9ueot9ctjkvt4mfd66ia0a245bhpbx6ocomumwg3z8zj36aluhztj2imp7unj1dymdbcur39wpwpyvd02hxkubm16y045f6nt8qpro3x6idv6dda89k2bjmtby3uuibzwnmtj943j691s785kxlgnptb7fh3zsjb6wno4j3tjbqk8qj482yjkxzayt798axwsbfhl93xoeoagmz6c0cbfr0cu8goc3jb44thuv0npeyi4skmzzolwzigm4nppeouuuo1v7l97570gysv91n91xprfedoeqbcio5qbroj6tnlsanqusjb7srj2quvnoy3dw4pa39u7gqvuuf3ckqxizml08a7cs68kzurvsuvddiln0hsyfiqmdn9x70q9ff7z6vch9unh1c6zzxhp1qt84udivp6bxtwgkv9imyo940qss66jj6gij702xdzbnclipm12ah34u33bgijeop5bfs3riy8sxse2ss6osjocxf81jcq27lrsycjtohj6cfk1o2ozs1wnso4xnfsnsdvzim1q1plpuxh4joa788xxxc9ik0mdy9t544p58z9lt6rf83sat4mh81yuexroivgum6jwsvspnc6p5etyoshwo2wrdy81co14ldcfvl5khlztxjxpsf5m51b9qe7aao7twsudjj11z6fmp8ud5fjk8b9u60mzjsrquwvnxqcy8773qepbkp',
                proxyHost: 'vxvv0rsfrecytrspjcwb4u4kfpebt66ac5vs4dnivxyeisunnm0aimtq4ob4',
                proxyPort: 6770615925,
                destination: 'nlf7gbh3m6xkzt740p45ymmgsvw2pw3ejea6cjun7j9b9itn17mkzbylmfpe3745l47pqs6797a53pdu9a39exgow32pmpndgqiwz47vt12j1gpfca57xywjlzx0o0ppt6yj9zp0p7slmw0gbbx3k3t30y8avacw',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'd5alzvw823dvwd1kj4sjeh56ilzquc3zm9ym7fywwvp9oai3310dbeofawxu9nfsm953htwbka6et9az4i4hacfejxmfp7vcbtd9ysum8qg45jmfokonxkk1sbm7i0jww1e8itmgberq5wtezl54t1hnqqoe3u3l',
                responsibleUserAccountName: '5upg702s2yjkjf4fbqhm',
                lastChangeUserAccount: 'nyedf9jynr7jpbc3xz5w',
                lastChangedAt: '2020-07-29 02:48:09',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: '3l51a8amc8jj47p9w76sgdqurpgimk4d5x1gjqy5',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'ys6fa0wtizbl7fi9irjke75hl1t3dfc82wy3dfnlq3g7cpmcgf',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: '930gg762febotbtxeupt',
                party: 'wa9m9ywnrnlgen1ggor8s9qgh4oxivpjtma29h7q2q40snpr90t87melve6zsg3j05rn8ocjqfggj4h92lhifzay58japf01uzbrg7j0kz6ty3k72c71pimv8mq2tviz96tq7ryuqcmvjs44nmaatcw1lxooga8l',
                component: 'n2g9n3zktydpfedh8d7qr8fmmkasksyg7f3qofxuqwd6c0935r8jdzm7ftoztx954ai2qb5tf35lxiczmh2ggscfmbf1nm6p334ujreiw9s8af4lve5521l7b82f8s63zuabvqnadu3t16a94qhpmk9lz8a5kft1',
                name: 'ekzki2dqofqij04doa6e5rj62nmcthj9cw2nokabbwbh70pv71pqxpytjsjvi6p3b9fgbfta2mnqpmhte35vsg6tgm0lkiksqmgg0del0q37zof785pfu6byogj20hwrisc0r4hbxirm5sausdz4wviyr4bk590e',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                
                flowComponent: 'toilnpazj1w47vcyghe51xlluz4fygbuj1sej22eope3c4or292dheytxgvzrjaaeb0ub670if98p149qf9cg6br09e5ywskaxehhfxic3gm1vj2tph2ius98dwbyhvflnb62exefhmfc75p38yk3im7qpibvmj9',
                flowInterfaceName: '22kk5yg8zgi71dj1cqmn7v6dkg6fnij06h5gi8mrbkjrnnjxmqm39kn1kme01hi0r62y91dxbfz21jni7sq80sir8zhmsfbhpycuxde2tuyaf3bjbx9upblqej1dqq16fjp8fdts0vophz7q0gpm54vr3ly1oljw',
                flowInterfaceNamespace: '97qvu6qbs79tyoktn1ccx8y6qpttoqnovo4e7393a64lmy6huyoo8hq9qu6foj398b7aud47ftut3e6afix9gsmi8ftvf5l5u6uke469f2r4k5qy56i3fu6t96j67vnx8zed3yqp0v18a2y6floejkwi4oam8zvx',
                version: 'vry208bqtmfdu912m21r',
                adapterType: 'pc80kia5mbsojs0b4b7lumjlwvc7ny9exapklye02k2iwsv0krvxu32u1r7f',
                direction: 'SENDER',
                transportProtocol: 'p6zjr66ldsotjpnbref4xji608134xy5ik30f39gei0oo0g9oub6c34xm2ly',
                messageProtocol: 'vpzfu8n36jtlsx9it9h902rznyvzj3553emhuj1iw5os8ej4i9hlyzmry6o4',
                adapterEngineName: 'n9woefxrd82lfklbl0urx5j9oy7aahtn5sttwm84h14e08i894mjy9miqts28e8gndebg3i51v87pc3eq9cyvt4gf7n85g03jubyzggw3tq0jh5indeol24l8irwn3ph4i5b197n4kro71f1we5fzehbjo3b7iri',
                url: 'tk6z7u7ga0y17t6cpjd4p5tl697lh1cg4iox2auniyq47pzka0azls7wo4uipu6ye3fkk2pg3llsobpg3v98dt2qrll67fws2x3g35sm9ry541nes1am93htmf1g14uljc0xhj23njgznuywjnvdi14w9ce0yxofgory9g965v1aqzibs65m0bc9m6swu5o42mn64oe0pci95scyzv48cldfh6w9uzwo00w1czlth6l7455lvw1lbq11aftzij6w2xf55fb1ypetumxvyfd516tftdwbvg4h263genkvfmzne861jhn0l9ob4c4wiqwy',
                username: '57ldb1dw8lzfjltzftadyhbwvmqqh9o0jwv0tmlizoe0ehhmgpbwkvqwpx95',
                remoteHost: 'fxk94g8mo989btj1h4hayf9w8nqd3nho6wg3vducszufy1dsmevfp1lcf2v6q6ihgi6c2rgonjucr7bdw5kfdj1piql9x3lnse4dgnxb241kpx264am0ti4ah0e6hh3dgds3zgctbgmyspubqw31enj6puf0h6ar',
                remotePort: 8650978056,
                directory: 'j9hre1zgr3errikw3bf0n15q8tgcbg3xt74ai3zhj1qiihxemb1pxez9yrsrqx1pirb9pwe281o4goaaxqtw6sajlflicr0i9wpz83zb6rmxr8l1dtebg7t74dffga4usm2lhmuo4b3j9okdbfuvrkyjekxv4c7jrjq6vxc8q8bjwb3w1y24easeczx4b153hq3au866c19bnmrk6m617eyicefm500po35uvsc5xcoz1i3ci9prgilltfape1gknly5tbdc1z3uvxt31b7pe3fo1asuds12nfn0lp1kypun7iv6p85k077idql6uhujo30pchpurjui2rmhruigeyo21ky44jehr6lbzfdf6op0pnk17fv8ijxhtkqxvpl9c5mlgpgqc0bki2gmze5f0w9yl4hp907yoywonltji3ni9zl4ghqyshk0b9401ov885jbp0hftt4jcxkgnqhy6mf2rc2peq27bscdirronjhy3upkia558hsw3dv5d4topdmdxclmutmfyhs1furpdro4qnqd2dnoc3n0mcu674kpgclkvb9l4dijindms7v3mcgh44gtkco7neirsc6fp565d1esvcv8p3tu7jhkby15eg6lp8qhnkr8ljqqot7obfyzq30m6wfehe73evzoqqabsz5omit9a4n541fc2b19chbxw600mjt5lwoy7zi7ylxu5joj504n43a9hyfud9p23k7a9cpnct82hzwbckdz8mapgfixj7mcyt29eflah2dvz3z0yrvcyowjy347ie1modrsckjvvfi1c9nw2v8f480mozc0zw4vf1fyqvidazzsie2s9j8z4ipnwwr7ie56hm0awdhn6usrql3ngck7dvonfll1ipislutwk1mpb2lu5np01h5ryf17p1bg9oe7cxyfw688vbue1rou2ytt12pvo6oyg871garvu1g2vw9ofjdvifvj98o1ltbnteevrt7fakudg111ew108wfhirrwexy17efww4fbl65a',
                fileSchema: '6p0cb0bgunhhpnlmnvvbl3lvjar69iy34lgmimom9j11j76n5s2kkpl6j5hhreuhg73l6w3x4jm9fvl8wc9y70eqv32rjtxcz9qeryqvnou2xt56uo2h6n49gn3fj7zjg0lwv3962o61v7a018xp8racgde2d3wzk1jngs9ghnhubarjs10wthj4zi5mm7mqthsvst8w93a0z2iwrabulnqu5dd4roedq4z2al44zi3ha76r0k8ykvcvdl401qwrr8k4vq2s69alvlgzrob29k7demho1l9k1wi5i38krn4uximl2qzb1f23xi6tczjf534w6uclvc72rf914mlwr44g7uzhbk2tevst1w33rww0wcc01fvl76tyicuo2zqdyrz030mqwlr6p9lw72so23gr1hsnop6yeqjkbaseb0yxucpnbqp668qhjuj5umwj5hd36cckgpqlcrw8kxoa66tpstubynv5glfcw9q7nedza9sjlazsxwiz7hss3dl6iz5jp1grl67knrhxoz8e9g5gv0ttjv3v3dh72du69fj6kbay2opz18kdazzn0mhlx8god8etn4xrmyyf826ki2b6kw10t6d1c4bnhnvy8d6b4a279kjitg8x8tkvq442wd4c33ljcwfk6doaiyropi2mu5isemilhfwa43goaxd502w7a85aljo7gtbngz231ywsmpabn997ehxlg4q4z0qw5v8j6pzhn3jv3ygi2lnwt7l76g2v1sefne11mhmdklnvjosbqr8x8o8mr909fledinjd8xjkx9hlj994if656wa4yltd7zlqu8i65q2of6nfvdceib0uzhqbv5el1n3p2ye835y8cv7ame9opv87m5ibfybsqjg2plfysz1sy7k2uxnsgf653jyexu3n03pwtzwjbhiuzmjlj4ly9ray0uncjkqt3rb94n3zob0sacc9m60gi1t28tuyx5rvavm16lewvp6w7qtyph4l9tihh1resmvamrgiyvg1mbx4',
                proxyHost: '7jlji1tc4gpx1jq21jcsdiv1qlveqf7diumgca4okcap48jxgpng9fca46l6',
                proxyPort: 2099083847,
                destination: 'dzkgkjg6f0l6hiazbri8wnerxlrpdir0ed1bripzbiivjjyl77f3zzhlffjlj8q5yry8pbd0ibrdcdzws6l1ex3k78yzd2t7xo9jhoanpu4zda0zdnbedz37fc79icdo5vwppispopp337zkubr14ocrro9g55tm',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'no4pxfcuyejjtcfzrczoqy7p9wajb00yxwnnqaav2qtwwxzcpaqo7kw4bjy1554eb4ztobi8ylvcm6p9uylzz630k0my144wp7j0sn2t81vpnrwh5oc9bfiz2jt6dxo4l7b7lwrksfvbkfd38u8jsr7ugdva4usl',
                responsibleUserAccountName: '3x7rqlpbjky9a8g3ru4h',
                lastChangeUserAccount: '5vdwnxcbtabj3gip2dko',
                lastChangedAt: '2020-07-28 22:55:13',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'qadf9f56lf5brxxzhpjtbih4e5yi951yvv88uuna',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: '1kq4zln4mehevevqq8ag1tlikxnwuiuvvk20swedk4jhpil4tb',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'q90mla2v3ul6dgfibukm',
                party: 'cl783rbbeqd8z5wfbertwj8qpf4bdr2yi47mu4a9an58iqe9bgalptf9imx7daidf74fldhjx6zuk8irbtpoy01elltcnduuinxxo5cgskyzgtm3a4sza9riecbjefz5g5rgp235xgju9zmmmxdshfubgtosctq2',
                component: 'o403hclurtfjnfldsjn55iixdu8qff2ddlb181tp6q12xrbwgqukkovsk5j6nqhp4c7ijpuxrcqht0dw6ms6yvco39fsfa8lmx227sf6hix1ayi2c3f9mvu9lctojyfc8ieuekw3ylx70lkp4iyhhez6bnqf4jr4',
                name: 'es903d03gq9srogagwhfxvv4qxsanswjcyc6ih6feuskho2n1nfxhvepyi75eoif35rirpgpnjnt3b1b1xovbhdbocqjwookk8saty4dg5sju1dcjkf3lju2e6v9bmqtivisfwbmd2muq571kcqcaxea02spc8ak',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: '2v0zqfbi8po0fczfslqqbdnsgd9znw5vqq7wtxd03j86uhtn0rax71ijygyhlgegm0la3v8luqks040wnyxlj5jkiva7fk2oiz5vpik225i6vv4gmwurfp9dt5qfsne957q1zg6qsxhqtlnurmyz95h6a4zlyc1u',
                flowComponent: null,
                flowInterfaceName: '0vmc6xde6ftr04sfiswv78r2f213bf8xbiofd7aozj0ynzqz5cfkq6mo6gkqhnxer5hpxdlzw6ym7niocblwbmfhc7muqrp8o7ym5n6empk6mahv6zidte4dhnte1bs0egh3grrdtfobcxv9w8vz9acw0e2hwqs8',
                flowInterfaceNamespace: '5cc5otoieyd3cb7cz67ics97f7j19wr38kwkn7m0zjiud1svvuswhidfqzvu3htu1e81hxfh8xg7kleqbrsvv8ni2bvxh3qe9nbu4uad9q4ub1k982eoz86rv8sgb7xcfc8ly9tf7nth3tt89ejg21dginv8qvzn',
                version: 'ayfrlp9azgeupam5ecxf',
                adapterType: 'hrsd1cnm4d5f67kjawfcx99kc4kp4e29qrl1montcstt4tf3h63cb04ase1c',
                direction: 'SENDER',
                transportProtocol: '4r892gqi6xg7m4121lgvh3k29fg00buv6rj5x5rcfeqcse4n9rxmqavrktv5',
                messageProtocol: 'is7n3w5mrdj44eo84u13xm455syljjtnfntq58huxp70qyaicuqjj3qgkm9w',
                adapterEngineName: 'amjoe6b01abxenwa6tk4bjcyotwl27dz78nrl7lpvu9987bik0fwak70bqsp2vk2p0h31x7ijkp1ak8jqhg0d4zl5loqyekrl8xv2mfqbx1mtco2h6m3vnbrddvuvk8law0oz5tjqvc4k33sflli40pq63srszyb',
                url: 'y3669xlag3f2vwuzz1bp2n3iw2h2a7wdy447u0pfjseu3gqoxn3nukwwkvjqeeau0lqgeclp9tabq4ntnynx6emvsqipthrk2pk0chm7lis1jhwwwobsi0k0lzbw2sk6206ih3v2lkdram3uei9hvr1az0236r4uku2dsx1ratwg9y5pjuqsm5bdy7pu5yyakamj765etmtlzxro8ddkdssdmob50z23wrqiipbzjbfaylm49phyt9u089z5u5uc1bkw89c2lze17rwiwi4i0pun2hl36uqdtxry9eqwoz0j8quh5wa80c8avrz5o73x',
                username: '7r9idijekp32f9r31mjvvihqx41e0791gwgyb6xpffx54b5fjh1nywq892l6',
                remoteHost: 'pyo6kl4mjspf4ze1bw1idwumgaosvpd8p09znnzxrzkvyaz3nzej7if5exi4ewyjgfmfqne5ddhzt98uj04l50qd8xdsl125cdpuczw1h44vz93wxhkxx9t3sif62thktei9e9nk7sktjrmzwf1uim5b55b9k28h',
                remotePort: 4135049859,
                directory: 'wlr7ohamjnc03xcnyhzilbtkv1bt3wpc2vw4q88zj19jur6yqxd6iv6zdo8b48uubnxy46cve392npozr1o7wb0k50bpwubsl6qmb3heqme2604m28nsmd3zk7wzbxc7mhvkumwcqvw17g4eeyqfk5m2u4dvbor2sifpxoc36igxu84oj6yp0afw5mgm9oz0dewasem87jr3mg57pl5j0ysihe398ng7yfnrs7wyo4ccfuyyhqde2rr008jp6nd75hzth52zm6ggc42gqap9asz24iz8bp2hoiwfd5ng3lj3bgidy6hcbx3rk7sld217mtau96qe5du3y1j9wpxpfsy2ue0pw5qbt4e83022ms5c7iaiam21onz8cft8r5njz1ldtm5587ljw6y5610vj6s8if5ulp6ej95k2cstlcxgtrec18ey2oro299h93plc3x622k96v1iee8bzl890ify2tmzq0vg4x4efkjd5bvi0jh726d9duzbqjfxia63qf8eszmo9ccub6t35f5jaxqkf5yinlsqhfzjyo28fv68achkom0t8c861icgasijt7we8eaow4pk0tutf0mxvtpx33qide9rmbcdgbhpq6gaf588ssxunvqjoko733dxqyqm234ob7wnqdfpxf97qoakxj8alnysqohoxmokl95fu32bynqxznplkhh4hbkdrlhvgug78onv8ps0wagaqxfetkvrx5uls0q64nngyp6v9o0j0ngsp02fnqf6uxr19435nfq1saizd2ty3rroe9nixggx8l2emije8xgedapr4rsyg5cb521dfdu80hzi9tsbo1up7zvgnv0r4cjo36trd1svqjfxsmigth01xb6f3t8r424ksy5csa6p7vaye5jeh91xid12evhnoezb0g7rno5w329qsy7ij1kr4d2fycy6iefv6mbau4p4o2yqcy79no021x8jsw4uyczgd2xe76q8awsoiznfn6xtgbwbtwnft0sob3trqlmeteiv',
                fileSchema: 'fiz1ypletdtg3xcjv3r2ng80607qjk6kfygfo79x6xh5bv2q13vg3d95heppk8ikxdqmb2hsmmhmlxdwubxy7rkasbtkkv50a2dd48um1z9fjadkgmh8lg5hvg0dhix4walzy6kc4u0t9d13c3i9mmndks5zmw3hlkn6vvzrsugh11e1vqliuj8jcmzeseye62xcvqy5c82e2s79z8s9t27n16x1ffzdi8d1ju2ied8sxrmbnq22pwbv2aqc0yx9vd8mc73g71ngbqepa5k85x964n043y656svcmlf3czelcdoky8fybye6at68nqy06dxjjopp8oon3ytwq6ng5992w849rd47bmvxxkcdfp2h2hh4lg1xh56cjrss3zs0ulem48bsyukm4xpar0flppns2kn6vly542krmwtzpq5rtspmmfevut86a1i77pxsc6lwozf9f7j03hkm5qfm4ye2tx5b7arih0aoxmoy620up2xmvyiolvlx9zwarvz6irqvapj93xhleatw31yc0doexhs4for5s8vzziivm7xiqel7t141qw6qm1p5d8m1fikvus9wlggw6yhcjrzwfu9w7vv0v4fbw3zalcevx320bmur2c6u50ftt7fges448tk42hvo8umwb6pg0goxo5ybup09v8dc6r2twy2f0w3q4svnuwu5oxi1i96zzvpd7sc4zue41lb0yhdd8d82wynfynjx9qrnfwmp9zt5cm8kv1de5i394nzw1f143m7bgqjqp23mx6vvsjboelmwbvi51gguzku89t1cv2p6o2ewms3pxs6al633sbqeqnxw47mcsqfyxq0y1q0b59qkwh6yxdkqzmhcp5tl6jimwrguu5yq182ro7fblickl3kt4hxe9jzai9kx4sy04tw12mgnag80sel1wwtwdhtskyuxeprrbftj80pvff0auvjfp8yanc2giik7rh284psk8w34xq5bq4fsibjtfi84e6xsmrt88y8dui7cy1sfc0fl',
                proxyHost: 'xucf66p9eqcvueni4k08g6qnmg57xbwsigv28gyccybfyu9ce8zk1wrqm11y',
                proxyPort: 8603213371,
                destination: '4igbumxrtf6vfco4qtgpqe7enw5szpfqt1sgtc18hqwj3bqe38p7l2xjm35h2fnokm886064j5llbsw056fgrmt0oyb8dbnjiqsvsivzgywrgbk7a4eg7emlangm9pvhefucz9fx70ozl1nksfttrfej92oy1ndz',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'jamze9aizrh1eavw2e138udmao0iloeczkmrysizfucxx2kpi1oz6eg25npw7eryph5f3ypa7yxhlv9a1p4dax4pk57pc72n20scriab3i2m1zm96dtm1ptqn84pzmmhecs74ut1faqlsbiu9ovb2ckosoxkk8rk',
                responsibleUserAccountName: 'ubmgjwpm2u7g9hkyt403',
                lastChangeUserAccount: 'k5o9hm3p2gutdbjbr30t',
                lastChangedAt: '2020-07-29 07:32:09',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'f14d299gh70rrgzkxpgk4jnjzmch9nzkf2ztpnjs',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'guf6r03abbn2yllbvn2o3yr7ay7r6y6y0jazyskntrhwls2yz3',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'wyzpu519exe6q6t9dmqd',
                party: 'td7pei2r22fk43555mv7bl2dmtejm36ka1yk3jg63gxp3h8n1hk331o0h6inevadd47kumnpv1wgd4mk0tiplb8uk91pldtg8k1idycc7dmoy6hanc8blhfmic6mlmjh2jxu0kc11opyja5swx0ljinvwbi4gct1',
                component: '4tq96saolj1z2uppgmi2ak6k14eym38fbcnfkwio8lxbngimsk6jqmg3bhopb753d29oto0reuj2m3w4u02n4pkl7z224i4046ba9ow8lv5912658ewo6ydv2b2mev1cwf03z1yysfupi10li99mhl8u1euozye9',
                name: 'czr8bxm671e8o24psle3rs6j020t5z2eco1odyr3gpb371pg39jreg3fmz3teuqxjjdhdxh4v866vo7fer49335kky0vbrzw1vez6gplfpd9hgk33v68jqtkn1hqn5o7p9ugjnltkzyf4a9awi8c4rszdwykiucw',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'pgfxrtqz9o4nhzzyzmuwo41g9tcm0jmkth9t6ofjzjjofarkj5ogrlkh60sfkycr0tgymvuzcniwy1hrx7s767z8umfmzaolanfhs5sqnlb0p2xr0ygvhj60uoqhzkw1geu9ccoq273i5si8ve21yb5m79acn5gl',
                
                flowInterfaceName: '8oys36mespsecdmkicmny6lq2e71d6t6ksuhqgqhd697j5j9nqi9xa31b4suge69y1e46d8lby7ebpx5esru6v8n8jb2js51yur830dupsst4282fhwswhca8i4pvmkbh8m7mkd6z0myswitzy2smsuy9efayeol',
                flowInterfaceNamespace: 'k99r9zwpi9qhhz1i9tp41u164m4fa26jiyxa070xjx6x2jprlcdt0tdbt2xbox8vk5igan82dmv0gv6p8gyfqrkvkmitzg0k5b9yp466m65xgryv3mu86wqelt6t10ur892ql55rxfsszb1zvg28kfsuvjbyz9xy',
                version: 'rfb04qh8pgtkgt9g8pfc',
                adapterType: 'jwsaoxfm4t09penxt6vzwsy7irwe20cz33yz6khb61r7akxn4lkyzavybugt',
                direction: 'RECEIVER',
                transportProtocol: 'vqbovf9kqqzq0xno0xma9dfns952tqvv9z6vgyenpzb910q2brp65cp7bvg7',
                messageProtocol: 'd01vfccm23v5oehm0d383ef0inelluf2io4u8xvgrz7mc1vbxkm7hr8gydqg',
                adapterEngineName: '0kkf5hwv3uerv3my95vdxsj2xslkow58ughqxwl36dvlgr1kak3r3lizfumncumw4y2nadetatxdo34ou0yn2iu6qcrh2k5fb62zkimrszc5b1lg7klppextdl226ort4g36c6e78n0ovnqlvdxakhxq8fslzjqm',
                url: 'z49higkk6lvu3a3508ket6w0wbdwl9e9wy0sk0xyie03pr27vk3m7zewbbrvn57ffgfgibftq16gwbtq64r64met7ifnv2xnt78axd4e2qryxdk9bvahnlr157tdjfc8at08w47k61wvin3dtjxhbb064on2n5yg8b5h9hy0esbpzpq6xsb4jc15hxkvdi7r5k2lpqbb9gmy8ogkc2oxbxlmcemerx23p6bcnqaegn1az8d48is64kzzw4lcqzmi1hpy4s8wb9fc6lj5fkgn7pe6krbfup55hft3o6a4p6n7byi3jsums8ml3hjmz8g7',
                username: 'zvbiqxzb1rcs5rueat1ezwddn9w0562pihpp0g7wcsjuwqzm0hb5i4fycozm',
                remoteHost: '0a4of5zr7ka2bs2zcavj36zzm8afre56geyzdv7eb43n4uw6tf3vrdgxsx6y4k2vicvz6n6om0w1kful2zq41p4pf4fj26n7ofyt820zemur7sx7893z83zfd4gtqu6qcgoz2kn7y6r2pxtgiybk0ddtktxxpv9o',
                remotePort: 1668729765,
                directory: 'j55v0ja3bqvn7wyn73fbhd3qyfx549u8ara31c9tgmg00dbh2gg149kts1t0kbhbrbtcffm32nhycx7p1mps7j0jxeluaeprewgy0v158le6bwx8afhpi60w1ibp6gn7jhpty83nk9sjgfrnrkhn14lp1vtqvxov18qbi2tvgj6qsalzisclld30exr8c94vjz3jl9yuiz61cphvup7xv7x2s2aexwj1gh7x8hdx28nvmfhbpbgl0qm0nkruswicou2qxup0fn3rgzh5lahhcv3qh364xenflkyiant0wdt4ztv20yakg2bvqj10y8l7gpqmka6k0ickl3uqho7t16bhx81vehnir9s822dzbowliklumo1k9sypwf8hx54d3tfj2yj6sykhk5a5fgnpoqgtkuen8yxlwtxwovqpr7t0v31fhiwagt5w4rbleakzaz5ifq4x73ln74w4jo6fh4yglszi7e6nd3inrigi5ehwfcvnrm6huugf4ma0khsirieqcfc1yb2xojmk1jpjcviuwr8womo9yx723o48d52b3hyansgc3kyhv9d0dhbs11cn070huzm183n44dh3qd8h2sbhi5sg83kg8sn6oip8rei47db33egx0nqzn2fmnik5v24zc2doi8t8iuti0v8xu2ehyubsdmilb51isnrq8tz12w22gcvgxc0ifewi2vg0ockc2sb7smvpmlswwaudausdfr7emjjmdiw3b5d8bdbaezc49l39e8rr8x4hx14zqt9m8ur75v3ot9p4cxpuol2xqmomcazv3aozvcwxcz0mmo51rfe8790ee95mrqh83et3iyiu7g3n5j7kz7cs0mzpg2dgrjkixpl2e0023ytzrc24p3buczbfc9yb8n076x9t25rqq9758voazz0nbi450bszbhfq0mgkk2m8gvufcvnlt5u30spseec3vx88j7cchqjo3yx0f338x9j9b726l5wyrblqfhqrafjaetcr5oiayvy1v16i2cgf',
                fileSchema: 'utrvf6ckt63wfbo9r1rxs1knix5sxvjjsjl7z3zam9qm3zl0o8v3yl8v06fddhp572oc6dd3cnokr5pwvvzi5buo1uwrl3h3gau8ls36da4agg2tzpbzcyf8uma7edf3k81xfw2gw4c5oba8izzrsds923qkmncon8yxwi3ii80atu9yc9lz9g11aq6jst4j3shco94jg7iwvyvd7np2e8wb7b29s0itvkb5j54gkpz426871mavysfh4qz2n0pmq1rqcbnoyi9ixib2twcbnhywkd6wzkom7n6owvyy2dvg2q8dgq3a2saajtm5dpksou8s8536w02p6l11oqn7xm3j5b6svqgr3tctugi3ng54fqllrkq5sob32a9erniatral9hkcmrmqhs5rwm2eedc0xj6esk92xb6riv5ju1sfydlewfpysauji6lv2zz6ln4jpo62l37enl8hgaz0sew2u3rf7pnuopm9rzezhm8pbdbkfr0lfvwzah2t9phk0c3v9un0fhis1fvcndhbc5imkg2xgd9dtr2q5r5hatw413mfc1m5cqr4t35730e7p9y91f3y7iakix95sfm4ci6jyvalk3z659fxhz1fkt4yiugmqyg8tv74p7w3eg58cznu36cchs5xtw3t119ey3plmei4chts7bec9vcti2hfnzjipx8vgue6xvj0ty5b7ltx0wxhtqi1eh99ckrw70m1n0qmdbo0475nvabsvbzs83mdhr0v2lr6s2cl57csmfzduo7listthjirr9fitmfffc3vjqvflgnln9392n4lvuy13hxuwxr0z1e8u1grk17iudl2paymbw1a6auyz75bzmvluud5ta6mbb1u0vpe4smm3xro3mdnhrnp7j5k56rmp6yyklec9qz4x7v3ahjabr37l133l55sgsgwbq4692gxjwpoi9wagetuwm4c0v10n7irzzmls2wanmhzs3z5ja4vuv6s9x0p5wf0qha352tn6p3lwm9vb40ybnly',
                proxyHost: 'am6pljmfxe1oofkoyicy0el44069nuvpy8yfo3y18098hb5uulmd7jl9g680',
                proxyPort: 1640571385,
                destination: '1hws21thi94js191g1p4y47yylzu0cl5y3qwlha1js1o01b6f1fs0lc9fis43mt23tvgnyceilzhgwwau4hipnt2g2is4d43vnzlm34pvwufsfdfc3rjvv80tpqj9zjwkf6nsq9cqd9p03uy76ynyx8cy8rashrs',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'cut428nn0gglacd4kbi8twj4ij4y956pgpsrqv9egcq27u47v3a7h576yqvhn8u5y3z2oztw98q2dplaiqmqvf9yroa0nyc8fzqzpschnl10x7gpatl5v8ve4jtra7kupgp065jy71biab4kg11pg7isgjxlpbev',
                responsibleUserAccountName: 'lno0ohtmoh945sxyrwcu',
                lastChangeUserAccount: 'hqamhanqnont0x9qdsia',
                lastChangedAt: '2020-07-29 02:27:42',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: '8qux3xs5iz0if2kwjfatzfb60wel0a8ls5tq84ch',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'o89g0wcifs59l1n6fheo3lmepluvd73kng57cc2dwo1x0zwth9',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: '2v3ybkfuwhx5ljrq1gyq',
                party: 'v3ozh66kcjsinq19887mewa1x0114jfjbc4pvna7j6rga6gndpur1mnvp2c7k3otssr4ada8kir8rsnf24u7g2ck4jdze7oxfjssonosopz9oahx7x33q9edepe4lnxsznyq4x5v314qwogfsip7x5ulxkhv0pzn',
                component: '2qa73qlxsjfsvzssuvcg2k2pz4qqoin5jlnhlx3l0zw7nifb71bfjn5t2yeqc8bfqgmehiezt1m589y77ubi05te4nr0yc26h7cy2days1uyhn1190zgt9mi4c90k9c7a5hx0akqgbwhje7jzg6tv5ak0gvcfj97',
                name: 'mznn2f4jya10xn33a9oz5tclhlyn1kbbtmm70q1s6xisjd0zznjy7jqrk6e4drlsyd7ms7cedqad4p9yhrl7zrkv4cskl45mueh3i716q0nivlalv0iincoow4u83gz2i6gbq90c2x3s1d2dgy9u34z0pxgg59l8',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: '0t2o0e5em2fl0k7cmmptul7kwt2q4s8t82wjk2at5acx83nq6ihgzxw1bskgm65kke61zj0ft40cl7tfkoqr964cwsxtdp691zsh022j8pdcjuaarjrhc1hgqdfguec8msyjtsrlkv2wma8fnf2gw0zofmwmabcn',
                flowComponent: 'uf37kmgkbmuwcvw4gsbrvozo11vsqzoumv5iazgoyxslfq1wz6qo39rsvo3stdacaxabt9g6gdbodhr8jg1830f8mic3yx57vq5tq6tbj1qy0js4gt9lgk4h4g3p94xmesbdsg7x4xsfuirhcmwcvw2yrpedl34v',
                flowInterfaceName: null,
                flowInterfaceNamespace: '3koqj6v8z63907y6nrxc1wwnyq6qb5kpwkt86n8vnp1ua8x6tlylbrutpb1mx1sq9hkmionh7173a2p8bpz4em9qpbzx5oyaz2t0cg1sz1e1313mpjsqnfcu7st7hzn1nv7mky996hi676k0pk09hp1ouuyt2u3f',
                version: '5gb5xhcxepdfwy5f163z',
                adapterType: 'j5o3znc89l3fs5j90mqdwgdu9kpotxn00giz2lpy2kihytzdl17hri8xolo1',
                direction: 'RECEIVER',
                transportProtocol: 'm021qvruyu8y5zde9d2pzecaegiufvzl7b9etdz87z1gem2j6erhe7ulkis4',
                messageProtocol: '60fntqfk4byt48jolu06dmx67bekmt1l1t3znjjecd4s44ry2lhf3zyq3rh3',
                adapterEngineName: 'po821i4lw22bvtr2a1j6ds373nwtuwcrft4ql211kdixcj27ylv8e4al3ybooif64490lwlgpu7vrivg763sw6lh9i7rzv9ek8y4h841j6ousy099gmz3gdutrm7426c75eigm29vflfqy5krpsuwm9364qu333o',
                url: 'vccybjmakl3dhl52302qztojwhhzn9m3a1ih7pw575s4nftlsejng0ja322lpwcgvozty4hdct6ejd710eikzvaca22vcfbaxeu633lsmpsa1zmoob607gxti1i3pl3b58vuap3bzup1que8zyxjaifrbozlji0qnxza2xkgf00qy37h5aj10jddcsbqwmvrn828dlxnwx8lbzgbj14iyb79cbi28y3eou3fi0ehqvy5o2p6hhchxjqy7r3jcfoz4oe6egklcdhlmcj9mmkg7c51g92ed7uey3h8zq0lna2vge4l4noamgzz8kydel0m',
                username: '1wrk2xz0kowbnmt2pt8326v02ldcjvjjhbnc5oi9igysysadefx5l5w7mhau',
                remoteHost: 'm7dccm94ar8mh79j80dkx9qyzygujlkz42avk75k8b0ojt41wobzge2d92a2vn8gh1y7wy50sroaeblq82jihnye3ssfyryqtdyfg66um3gttoi6rrrv4yr244m9pw3giirpqr9kpzxi2l7s34db51s7vqwbx5at',
                remotePort: 5044960147,
                directory: 'xkue48b5djfo1uio8v2mmfktl2tp7ipsqkum8eb1vi0ctmfei3ye8c8fndem4km1quk33g8mhqew9jcnur78tuikfy2sg4qea2f47rmmnitsoesqz8f715vkrda1q5czh9uo60sisn196fa7l6bdo4q39iu1vdudbnv47acsi8svamqp4ti786x6ef25bjpuptnkdzfsfe1uwgyx8nrchavq4ptnc0p0qsqv93falb8c8c0j4gfah4hzg59v9o82yfgv9rufvduq89fxny8swcajewqx2jaduwetakgpma2rfm3ijvyb2vzy3pz0ofor7l3zihlk6peo4ktym78tv1y1z84tblt39tyx0k4tdmeusem5yvaaic9h7kilswxvehcb6064rpyxd7lz5uwbel9liu98tp1o3i4nf61s5zj7c81kh0ethtqrgdysn30lx5ekcdhz3o5incj9i6bqlis1siu9wge6puwda4dtnonm7qqbm1ollfzwun0nhi6j5n0t08uk1pgu5zbdhc13ea05kvlntzpablf6w1vlm5h4heame4rvum29t5k6r6f4hvwzesrinhqr7pgrl2bxekrl5243lg5cb6q5rothyz2fbdvyrn28plsrsz6outu176nfo2zw20v7e3a3ydg33x03uk17gne0ausih3318xk3mhs0x5lygla3rlnovknfen6111y94clv3if5eixb1khktzdwffekp4pfma0pgoct5m1qsx5i2h1uwigibxc4du53jya966bmjzx7cu5w2nt5zi3eb164qmvm7zowg1inyok39wxu21wc610f7mt4ao11x28axq9lrgpn26hremiyfg8k2ae530a55gcwhvyazvlbtd1i7len2bvagum19gwzt129j10a2jxv5kd5ihuklz0yceeazs9g2s1034nqwcjbixss0oax3j2d48mh29h2rq2i86eyhdf519wy8nrxzs86qxz4467yqt9umy4arsttptyef6myx8jfdmxo',
                fileSchema: 'x94rp7tapzawa6x5eney82h094l36lpoiu8a70gh4oa01cpyop42gt9db1vr4xfxwbgnqldlu2x99o4ly5l9ohg1iwhcyt7tguxo6l67dcrayhtwfjdpn7e7zxynldmmy618vtifvkc3opsevcv2jwqk8j88gl718qrvlboaxgwh2hc4s8tgapr7pbecdurcnpvy0qk4sfr0vhgfjr7wlvrsis35xt70zf2v49kcovy1o75gdl1a55jy0zxn3rosdv8dzlwbpgxbec3izi778pkqp4onkl4uuul9pbbsfk4ys7zeefvxm95kyher8m36d7d2q5h4spkcur2ue3antgwd3b5zpibxpq3fndq1yywwiu7qxsjct7fypprgvvbess2xhe3x0q2eey2d327dnh2ylpizn0r1g3fll1fqmvx7bxoxyylbaw5osaryye2wdk5sborvxsitdkrd48t7cnr1i9hiawzorm2fsojv0ixelunifp53dyrm4vhzfy1d7tncpp2ob548sgrpz11ioyztq7lmf9mcx3rl8vs8ca5agaznh4yau6saj2hoeulawakdaexxwa579dhcpgqlfh5vgr8okwq49vy75ileho1l8ripflru6dhpfys5kl5mqnlkzf70dfrfnoj3q7ystf1dj2gxq8nrk2ndi0489a2p78v6ahyh9f53rmaivg05gv3ib3dh7o8u1ccz7zcq6t67zqgu79o802kl13vv0tdnaiqzonfp77w7iqv248zrj5uipntmehw2go1t8zlg3b82e8n0hyy2zqblde1ycfatxznvkvv1i87pw5x06rg8thfnnds1vmqiii84g0b26wvg22tpm2h5ptdpjgupeymclnysmct0befgp4pivv0rvtpnsfcsvds2ayq2byinpliug5knyikqaod1c1bo493scqiuhgg3bpdj7fby2qd34fgq7oxuxcugea0hgtbksxpiyferlmu92u4l449bswfesxst71tzmkcb6jysnz3n',
                proxyHost: 'v09w9k430vw1m8u35nyqj6o50c5d0pfn5tebei4sc06ngxt01wxbl35tnz7j',
                proxyPort: 2362874339,
                destination: 'tu7mzmbtib1jeoahru6swixfnr5hst9pxit5nycbqzoqbjsxdyvjeevmrf6449eaua8oir4ttd6ubvboz445ync0v8nv5rsey7k9nyic0w6w2fesmqz1s8lnnd5lnxuyloogu54429om0xrapevb59fwb272kbc1',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '4z8mvoihkfaofz94pdm4qiqk19xkhaok4pk6isiauuc1uy5jqchf2pmhz35nbycfem3huw6n87zwqtv8qsmqso2y8gh21qzvu685nhijjapd44lwq4drxzjpudr8zca27zytjabo56jayx0jmr5oadyh6gquhrde',
                responsibleUserAccountName: '6v22mjce84ei35wi4hx1',
                lastChangeUserAccount: '1gnyc8q9xkoeclt4vjg1',
                lastChangedAt: '2020-07-29 02:15:06',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'jseptpo984q3uqzytgsxabnxtl54yj2u4jw4wubf',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: '1uy1wwiud8ndtqebokwkatsysbmygdbk1qtwp6z40uk1iq2lza',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'wjrmfddgsu5wz9cuc8f2',
                party: '5fvhhpw81ax1pu4044dmpaggzrlnmq27i9h0ru927k12vkwsxrtt28u1k217c16oeng367vhqnvbrvyw3ggrh366217lupzwawbxb2u80g4vnjs77dzy4917cqfin13vcgnb0rb9znukxwrsj7m27xapnsgomvme',
                component: '1j0lsbq18kfcr545mn9sc97nnl0uln0fdnpv9jyh47hlbaqa4tcan7hfasayb754x19xw9mjgccidl96dcetv06qir9aqq1nowq7fgtmozdexz0x5nqx6chu4ts85kiimwnedcer5a8bfga16xw1fqd6ldihlyza',
                name: 'lwuxyks4dkvz46tyqof4kcwwgn2jmhxxx3ntnrqa1gw80n76juiy8gvt6u33lg1b1cufvv2p1izty5419xnajqs9lteuiqgtgw0iryv1dwplwxkj7cmttkglbhckew5ic31nnfuuaphzfo41ib6ojwpwcekdedgx',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: '75u2p0xblbpaqpymt7m6l283hru9xyoow3wweaa2mrmb21gvrb176glhn5hijwxgtt4xcb5lq6cdfalgouvjfs3bqatb18zav2v7uubhqej6big9ktkhsz63b7cqp8ggbnrfpaictrb5wt20hlcfp9kupsouwyow',
                flowComponent: '4yy4qs3vftkrodsslzzhfdudky9kjw7mcewufxjqgygpo4cuaikh1t6bkja1kn85zmyuiqh38x1mo68stjsl1oahu10ill9jdit79ukdcgzxznwva0fchjsq3gx5gjsu9uq15wlry8gm9q3s7nf2djfgrzd1ffrb',
                
                flowInterfaceNamespace: 'el540qrcgcmnsb3wqknav6wk4cqtg1ba9vvarmhnh9xfbnl9smgd934mqa8n0tk2oehph4hkw4jt2438j62fb6nzhpx3jzgwo0z57zmez61qqtp0agkfvozg26h1xkbf5sq9k8b7w4tzs5f7d4a84iwx6uqalsiy',
                version: 'kxcd8o1buhkkjqci8bq4',
                adapterType: 'grf4s61r87jj7t5lhhj9ld8uknkvagmom5sgm5u508reazxo91s5tgwp3s3c',
                direction: 'RECEIVER',
                transportProtocol: 's80ulmh3i2qs091xxjb3k25gd87r5dfo9m9vqfaj3gsx3vlgzbt7ijemeg37',
                messageProtocol: 'gqoqrao3wske2x42o0mta7pp758tllho5fdyuwvo9hnd8ekjrim5pu92c94h',
                adapterEngineName: '73pzq9aqclpcbu6lgg5o1bvwzg9uqx5hmbsv49wfq3hvk445hzw4hc52bijmm14flqa61erzcsh97wic3cd3kcmdy5a904wos7w2aa1hhcu0a6768v4pt3omzebkbrnb0y7o2q2f8xslhyazb2ed8704lavtjn0t',
                url: 'gphq1ddka2aw3o5enenat4tzqch9rinoketmi3k7vdm334hiiowibl0493ggo3oirtmu2a832poj6gzdvzwyx5bip02gtkbgb6uisl8nl5c5rqq13swe659rkwi9q86q1c54k2iwjmc699fluyf2bhvadcsocvlr72x31bvufgv8eojlnm8slglfmpytdyf45k3lmstnfvocb8xarotgrznw9nn95jx9ywwhn1w2vbvkgzsw5eh8jrdyq9qd0k0p88zkiyy03yjiep4yw6i9sphwrwoq2gfzqsy2u9rsuck4e22mwc5f2wfy1puwbser',
                username: '06klslp61tm63tzd6inle1t2tn94ny9rb8voe4le9v1et6kpygyixkrot7z8',
                remoteHost: 'x10wjo59w3ayfptxizjyxnpj4ajlufbwyuo1er5vk1phgabedwamb1zm300yu9a2xamhw3y4af1twmyi19pvlj7sh3mp6fsj1aidimg4rri86r4yr070oq1e75afh2qi0pcy8b4wzgxabjpeu9ojhmqnff8xu9kz',
                remotePort: 5889765942,
                directory: '9b3n89hmnsydfzbfvjaecqhrnpc0medp8d45u4zo82b5w3uwdnz1p70qpd4r39fpifnc3lgprcbcsur5362z2n1ybn8gtd3wfeikjzh5ytyeeilbur5b5wnhxtm9wr62xk0ye36uwwyulifo8ugh7dhiokf7247aiy86kidvamr2z4u91zjmo82xqe3lklpdl5ff4yss0dmboo7iignuqhp452hapcutpfbf8j92r5orcd5f9jq3gcrrbqpuuzcbh4b1c1pv835pqdnywft5p3be68lvl7do71w25znps12jftlafujn4ozfn4k9zmcrqdvikmo0dwyza1wvdht61l1y2mx5q8f8ccbqv5tis88ojcxqp0p8i8z739q0ku0utd6wfkoawwonnycdj2xz4dw573g5s75xizzyeiwxqnrcjp57z4naggdcx09iobpnhdmmc4ztl8q8n7tfkxu9ty2czq6i15mpfxlr31xu1hdc44esawhcpbfhsgj8s2avf86hjoeqom6idlb5elf3unl4xx4xamzbobonhgi3fbljx6ojgra4mn33ps235yj2lpjs4fccvfpxbfdgfawz3i6zu24j5xx0pjomudzp6paxrxq7tgkepvd5zybu1t99p5id3zhfmjnf1xo3cdz7ubvk1i7r8di6xv1s22tlt7nbmam7lra1nlkki6wxdryejoetfvwcrp389vs8tuxs79bdvt4dck6ta34kyhaflv3oya3hsewmyq3ld9g1mo1yj3i1h26h468zzm4hwtzmhr0gzkuxxum8t7th3368cp7yimbijimh7g5no8eahuirxcee6id5lmygimzye2zc344u2lj1obbxb7iyup33yv366ir3h5c0u1r291eqx7t5loytfajsc9s1zwtbxtibzjztjv570nrfp4d6hatof3b3o62f9dp7qte1s0i8becmsowtexfkf7hn1rhfi5qg36icugot37j3bxpayj0d632gfipvgak6u9b8wx1199i8',
                fileSchema: 'ic6z4oktrsgc5opb1uy8fxq27dvqo7kqu4nc5l28yfgam2kqbarqeek5zze97yckodcxxl1gwymmq78wd7evktjyhn1rjyjfdiwqtkxgh9cbhb14gc1w1fsrn4yrpq2z2b8elng689jkabxabx7ugrno50me2gnaagg3z8alqzhqdarzseizrd583yfaqel6z9c6wifp41die44e2u4hb6ys0ml9apzyhm5g6j2le9gue5gx0bkvu5yc26ejgc6c7wktzcyx3ea8f5fjt1gmdtan1n2p5z6r7wptso9kw7g566vaju3u2twd2p4x8yzgzdlfjjgfk1ojfs6c4xi44v758yfwmqu5l627rwvzmuihjdhsr781lh41fy0yc9sx7qd9men26y5ty6mmalkb4ypt13hm2vplqjmpusfws3fg5p0cslyc89pgfqw7m5wj77oqww5a0athmn5m3wdilxm50yvv9fbgvzidpq2kijhgje392rd61w7hyazme2n360xlw3tn1u67g7qqfs5dhs7rkvhfwu8g2jaia0n5tnehzcj702d93et0bqi5x94teixozouvjiy5fjvfax3vvq6r8j7g46h0qhotwlt35bkm3xfkfqgy1hjs8kjh7fnv4egrg6vrcr36ow112e4tp2xwsbdxiewhbu0txj4mw6l7lxynktxekhy11290z5f24sy1zw4oljw1w79krj6t8826vg60sljt1yrpyo8yh26kkikqrd6mk3jy3ekwyd1lwisv6zhfvaqgy0dlppa6xqbbedc2ymru6h8a435gqert39gn4po7ngrbpchsub7zc37qouy0xd9rnwxci9oo88wd1dsit9jbm7pu1upe1ju9t4k533z0qc73tzuqq9urwmr0i4hfl2322y409dni4vi54ki5vmx7wo0vgkj6i5dntqo3jz7eiixi8az70n1afzykivt71x6qwkhebzjagajah38xlhos03kqep45qpusg5iqk3bjww65x5hhlkq4',
                proxyHost: 'l0nhbwunz7r2yxyhaauo17jo7abt1lw6xd9sfp1dfjv03rd5j4ow22jbewgl',
                proxyPort: 5656010502,
                destination: 'z4dc7wcg27es8rp05q7b3mknquic1bbgb6izp64bnhbcwigun70hj4qviv0eht6ngda86lp50a2u9acebagsq9akp9qkcda86kpaxncgste934fllmf5kiskh47n2x7xynrqpnuzb4huzex5l0wa62ypelxqo9wv',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'svk9c6lez3ah1qxf7t2nedoolj8flgxal8i9yh3ouwqvq5f1rc1nnzb39v22yi61ltkfzqh279rg5w29yvc3axoz88nipxtmu0nvyame2vzz0blstuaym4qillgfvvxgcfj4yeedyw19t06iuwy1rjfgftzjsjkd',
                responsibleUserAccountName: 'mu5mge2h3ktcbpcqwmf0',
                lastChangeUserAccount: 'ocsru4xqgwv2quc8igps',
                lastChangedAt: '2020-07-29 05:16:36',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'zibz4gjx6u67mg15bq6xbcyg4kwewiaw2katyuxk',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'lrk3tfsvycwhzhlwo2t72l6cyibhar3p3dx1vauhg4zp0wrew2',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'qs12yokug5oy2jwo0spg',
                party: '2l3kuqfl4jwoto561zxemidigyo7h48xb6ngd0jabchfbxhwd3umixgz0al3r51ybkabzviq96219ulyhcqikop1b8yce7qhw0o2n96wplubwjzxz2prduvlzsuq0s3njs8aweu4wu2ba1uds027ty2ffkzbwhev',
                component: '0owxc5lz38tmpmqn415uzvyojt0csew92o8l31lt6vrtseiznu4n7xbdmuw8b5p9cdbzmsq405g2nrj2ok1exvm6zkfy2yfleho6orsk0ylucadwp92c2o7u48t8qykk7cyfm91n3hdbv849ye3poz3abo6z1k5t',
                name: 'au1o8ow048gyvkue7n1h3snldkn9vmnw4dxsdedrc8ugqbpjdzn598zt43zaj8oif15hq0kj45rq2oadxet720zzvun7563edpyr7zojvt3sm0fotahzgnko5o0yfjlufq6lgjdcc6vf1r7x8llrbinry408o6b2',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'qswjl7hzakcvi1ydxqi1adt3ljtgdvgrzakjyuxv57zj0pnmwq5x53gdd9adxxjrz7cxuua337f3kavez51vi2kn1141nn1ym7lox9rbdh1x5sd8flteicyf5426yscwtor89ablfv9qqvrnfs2eeoonkwi6nhxu',
                flowComponent: 'jk7pxf2z3y313r0a58i6b9nbie62nccknir0eq5v1z2pm787d1oay9f1gxlx2et8kse3vuncgma3syyji73un7gw6j4z9ujt8n5r4qxkf4bjihj3k5sghau3lshfts8deg80m0dt424afn9mud290m6qnbj1ll06',
                flowInterfaceName: '4aiet601bn2hwwywql3pzpjb1so9p9t798fzz02gaucisdjduhi8rdaulhliipmo2rw082nju8cjy8nqsubg5v0ncy0qwndnacn5w2h5wx1su7fedz8ism1sj4nmcu0jotym0swj26ookmv5kf76i6eyjockmvin',
                flowInterfaceNamespace: null,
                version: 'v6s2d6358wrhaw2qbhpg',
                adapterType: 'glqk3r8r1tuxs7fw46qzxz45fuix4aqvlwne6gz1e6l3w0a2fr2c8o5unr6w',
                direction: 'RECEIVER',
                transportProtocol: 'd7aw6lq4z3roms4orsqo6scokx5x7i7fxspox9pkgp9wej74qs034tvksm2m',
                messageProtocol: 'jl42gg8jbc9ww9q16a322slchxut7d51jq74d8r5s69t47gaws64y8qxxjb0',
                adapterEngineName: 'ce67cr1inqxrteu6pvqb2addbjg6rnd8go5y4h0m7pv1ojcsxiag32ah1cvyfwamipru49ad4vvafu2rizblt0za4uorbxfjoye48mcj0zgmth2bwr11eg5z9pgcvv06aakjj34n0ub58stog4ffw2qsmkx2tk71',
                url: 'nsvhqrxed6lbdnmpxqo0agahqh5g76kygcb0mpfv42f9u8q6k9fyniofk78v1au6qhzpj4t90dqsa9d687schkhxv867b6v6x4j5nbrql9u3k35w4srukgixee6nnvc74zl55krod8jkbu60crsko3kec7ys7kictneeeol4dg2qybsimwf49xom98tg5726zzop05x7iz1tsh0sb6tiaftc2j7lj7fmwm3tdmrbdhbyjbphj23wnld6zsridxuuc2tfxgs9iot0vb28ubz2jrwkxdn07n6ml0avt4qgp207ruvwm7xakn9xb6hpo3o5',
                username: 'f15hu4zk5klwoxpx9ycqpgbbs1uzbp65ajv6n01uqdxvc0bdpama4lqvuhkm',
                remoteHost: 'yrl6nivln854vxqozm3m2egyhna4gunt4hmb76o27caakxnzaecnvnn03qntjpfpw2pzrw86b4kzcemem7zn7hwxbukp1vejjktbri34fjy4r33z085trxjv9xza2lck6u6s5uztzuoahpl583cspf7y5a54o2bo',
                remotePort: 1751598102,
                directory: 'ukve03sn6zapyy1rm7pa7ed4w8btpb1s40dv2szxxv1r1pfbxdxpw331aqmofam966d6nmktets5abo4uk1uc688cqaomts04dlfzb0v6lr5dsk5dxka9y9rktuoyatpyc4l7wvoguccjsfnbzjv5q8jan8znmomqn4n6dxcfrj673akj3850vok2l3tlyr0lag9ya50lgk7qe2n8y1sajosllufshrrvsdrdc60nfufoxinwxr7m53v89rxo69t3gt58gqub1vosbr7exzne36z74ocvml2y8hen6e5m992ydr97szvf54js5ysb5yoz218la8pzty7x2pn7zma1b7y0cscem7319yovm03s8ulpvdzo02jan2uk7oaqkaqx8obiof4ynjs98rocs2z0ns0znbjtip8jhvp8b0xb1satqwr2g0pjogi5ihxjyk7548aj7bhs8odstdhtq13daxegwh9tkrgipgifbsa8tlvylmwtdglezath6vvjd3q0cxjklfltt52ciei1x25a2z9ff36ev97yjyut3rc1lvuh82w5dpoydp5i058vg4acw4906comjk1yjkkze8cs1v87g9dq4ozfacbllk1vbw27t7x39oadd5p8qq6xnss6p73xxuiob4y3kgortsfriuki0smqgsqv4zg9moqj8c5dyharevtu5eq75x941gyv3z3to6530x2wvhh8a8xfpibsw2hj9q3xe24whlncrstkuskjrw5mjcy1ttr65st528miatt6fjexk3wely2r9vcpjbzoid0up6592vfyctfgj0ylpjvtpamjxpjoieq01646iwgcknpruubpdj09ft28ig9hm5umcaw3nyzxoa275u5ao3ch4g9nzsxehv8ujc15jj3be27ykjyvtquyevhql3qp5ompht3cfxgcfbft81af57m0wd22y8qaofhxrhlii11swd53j6rp045p10kqb3o6wq9qoitscrrytyn4545gyl2bmwg96wgptun',
                fileSchema: '6qtnj9isuuc1n3gli7yd81cpasq05odb2ezdxh7bj61w975n78xbk0e836s1l0suqnhc7l2mjv3hnlfxtldzlaro5q88teuynceguvqphc1a0vi741w6jg01mi8q0pmqifzuioheg1zss3xaakfav5e8sggzjxbug51p4kd8zfnn7cqt33xsfsytct4hj0bx7310yazzdffkrcgqvucxdt98di49i6f4tc3zcjpkt23nbsh65g5cja7lzeoqb7dfseiaq2biax03hwg057szo1chajywwxklk9ylvnz325036j7nbwxi3m5ykg8tdkuw4beyqy6v0mw1ja716szdffvb2xykyx1ny2dfo2ly48lfqw9u3tni4o1xt97rq7hed1fvywy54sx52jl1m6q85ajdou5c6xfxnfrzzks6wzli8hjc26si21ul7hkga5jqbg2f88r31dbof3bcpptbhrxa3b0ydxaydrsa416bdkmpxe7386zg5s5d5chpahjqvbcj11uxbsnjjd81qup51nrwtohpz7vef0hekxonqlg8pfpgzgo8f01wg7swrwgjqd2ljkpocx8nrww5rsx6yxkowfkzg2aauotsha0nuiqxdpvtd3qzx8rl1mvr7d7vrt2fe5bjan8kxogqpzw6mtjou65rv1s5nb26q4mr2ve2zve28m02hpkecibnq7jttpo4hmxshpi84y8m18i6k6maqvgofrwagev4715mmg381tbzv4fzomygswbysxl0tygrxtze6u2oqdqv5jag8tkx1iqo41e39scjwogrxrbjxnmgpab0ievov3npebwqynxd7e271osr4km7hwas2o4s8d8at4wvvxap7nijxxwwluuzy0wed9ho0l50vbqskbl12r9rqi4fjrmfqb9arb2924am9mmmmdqhz9ppcgiygrtmajfehx9lysnu2mx0jc82tlca51rsoy3g83v1hckxz2mfsrpgkybps7mmo8xrv8yxfpc82yj6drx3nx4r',
                proxyHost: 'mjz19feiycpafq71gtygqenkwze97hulfzvn9fc38lnr52omgp4b0jx0r2c6',
                proxyPort: 7384526682,
                destination: 'pfqv24lf7szfme0atiq95er5r11wu1xcngsh453gintz5w59adyvs9aipa9l75jgd3ly51vl6xvh1y3y4gimxk1bp3i86wcj38e9agmhlt1xk8y08ps31tewrjdndj7ejle8d0j0yawk3yjgl6aer6c1cilqss10',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'hecsonbr0151jweaiulgabzrg87q6vvkb2nvwemnbu6p7iwu9mkrpbi6s3zzudfik3l86q7hiovmu3rjx3c99wnz25vuyuuf6me7664is7vvgnerrdvy77ybpi07cn0numcj1px10hvtfm4m217gwb8wn99oqbch',
                responsibleUserAccountName: '0pv3udztsdc2w9zovf0w',
                lastChangeUserAccount: '3fqr3f2q7i8q49o8436j',
                lastChangedAt: '2020-07-28 18:16:47',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'yls4vdxmom34nfi7a85mj13j694uxmzzozwck4ab',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: '7k5uf21mfa1yefojbtxn7u76id9m0wct60e22g956dd88gj9ha',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'crfpspuupqmca203kgur',
                party: 'xe1xksxqnsf633cer7u1muadpjvaxpfyh4448bbs9ug1zzgx9u2n9itb8xj2hhp8s5byrg8z51495zj2vtli8ekmlr5e8c5zrvk9odgzh6wkdv94sqzk5fs1d3xtn02cd3mwb58uvzn4841vwe9nkyehk5my5ux6',
                component: 'kbdmtrib1h4s808kktmr9tgkg7kc2wjwp0r377217ghzkwhpetk4pt63am9evltdtq1d5aptzash9ogc3b4opertd27ao79nupk81e1qxjbzg28pxc5l31voesf2t0fg9cjzm6ihhsldua93mury5m07iyyc6cvk',
                name: 'lezxejgv4hh62vzdxwgmxc0y83rknn2xk83bb7sh9l082sazg98l6renwftfwivjuj3dspwjwvzrdmwd0fi5legbwuzp0ug0qeu44s1za9ypnqnrju0fs2cql831ov2h7b0ru25eos5swah2rgrx943w3r4h542o',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: '0pcxc2yklwnzj0kf16pd0lcwelfyoqhi6rz6nx5ur3w63qmah7ruf4tvem1tiwptp46lz2rwp8xuieaooshk6uk5gbhgw3b6pm79cwex79bnz6lzceobh55uq6jni9ojffhvqjkh4psza342sub7uvjbkxrv6zuu',
                flowComponent: 'l2x1qcdzy3x737infirs4uclop4ofkm0aarm9rhd8ibzeh4sn6sm7gdqygmlz3ymy91xqpjp1dfxpc2cms9ixx4ilwxnfz2s5jcmv0xxxbg4l75t47e94w3n83lt1n0m5tl21rtty0chz7dnyocu6d3ep9bkv2u6',
                flowInterfaceName: 'rzkufaboa560ak28s0aq0vyazmdfagn5ql35oua106xr4h8l9dds6q8hc2eofymb6fce7myrrirghz01d808yu98ai8s1h7nkhlugtzxptgz7xk6ie0b7od4kna36o9m70odr9f4kgs1hwdfkf48zc39sv9o2y4g',
                
                version: '9dhwzavyv1j7n4cqnnhp',
                adapterType: 'r3aadxzkp1q4g6kk9bn1bawur9q7rj16uqag21w2tj7od31l4nct160409hh',
                direction: 'RECEIVER',
                transportProtocol: 'jo6260ua9hidndr0kx9pxzgfw99fkjc47o9uz014tbaby1hhzhvrfoedqkn8',
                messageProtocol: '4vzj7cwt55xky3mfkiq9mn370izpgnmq9dssxwzhy2a2d565ktrrg9somice',
                adapterEngineName: '1n5j8nnded9ia2u795187q2q77630jkhhwi36hc2gm9jnnunsa1frsuz7rjba999v64dxbrpzz3pppfh6sqnhmowe65y9sa0vxmky3pifm8tgwhdllh944hwjk471h1zyu6oypbt17jb7y3wrq4p05c6ffrmytpc',
                url: 'tfdvm2g3dgiyvzb9bi1pjxbkpasp7jw8zjrfzi0i84didtru87mglro4gcts9i5q62yeoy7hf1zunllwttd9g7l8dctx7y1dpk99qje4l1j4em0yuxdr3l1ucgwixxtaw7e1zx7o631ybfkoy7ntd4dh2w15f5q01csfj9kjguagn4mntrr5q7vmh8pf75ujj83g3xciw3hvxp7wlnmu4vsfanh119ej1eyilyd0hm87wdsrj68vnap8j3ehgo6kbgc2f4t64u3oxpqgf3wmgjb5yyg52gtqpndptdwjtec97w53rreykshr5s66q4w3',
                username: 'xkn67xlrium1ea3rbopg9fqzhr53o3fktuk66752yri1y57o1abnhf9jkint',
                remoteHost: 'mt1a5a7071xau2o2l21itfjyq1eztsp9vaynrl94e649ahb1daqd45b3sxm9c2qfb5r7bz4i7kgisettffvmqn7bw3pivvqbs0xyo8a5kq9dyop2rkj7wsnwxo58uyrce2n7ba29rxjnevpq5mte03lo5nafn8zi',
                remotePort: 4503991144,
                directory: 'fu3xvz72avzeu4rj1rn2e31hfc5cwbxbprzbkmah33kqvkq3gq4qxcympxzqdpvp3dcdlfbzy5uddx4kbfxcr848y42352pmegjivn733s2gf53v4jb42vweeztxlikt3i30i4zh7rm9t3o1ngcm9rt0mij97mgb59io3fvcxi4sy0gaq88c5jc9sauxtv6xf2yx4h4b57pim09ujyyf29035ywua31q8eolcraiuupmvpqmbuer0yyi91a5izfr1txod923qrydcsqhxa8otxznzlcvkwp8htl9igwha14itwi0iymfhfzhifxzvedtkkjcnrn6gnj1vhof129znoiy3hrno0khuckz22ifoy87k4rj8r49gfvqp029p5lzz5kr1lut0927m85lyg8xi3jmyslecjis4xuxgixw9bxvc6dtqpwd6ebvk5a3sdl32kcxzrgksr6ct1z5b4v1xcq7g1tpfs5or8eoa4h3890r0tat0z4bxtvlpm9wbhn83wbt0zxv0c51xvrthru8k50ib1t44g1uyqau4q6i9jrsmbmmgx7bjhfjkidmbp8dbzyvehsacng9j6p7470acrl8r70gskadill1cewpwcrajz92hho7sgtmprh3zhjdvduodepuw1knqx9jr76bvv4qzv89lzzxuwqe5xsptpg7d2g7hqtcynm92xf2ryju49wpmd99ym8ldcopg8p2geesd9e2e52oe4v2755trdwki7burbg3aclyssyk5cxngu0jtko4l4w6m2f8bmkr008vutafhb58kt1hzxb4dkjp62znne5yx24wnki6ktz6vj0l8hrtqepl5orhrwqsmb54i7f9sl2wdx8i5ndcahyhnat5no3kdyjff5u8znyvgnk87zvg5cljqbxkmmkue6x1owp5jna6ks5kl5f6qmzcjyybsmcnc17kza5ifnri0morv631ycn2vzos40u54jre1b18dugvspqpkcp2rx3v9e6ryhoiv7reckm7haw9',
                fileSchema: 'alufucvl3rue7gewqddd152v4icyrfh1r222t9h8tyqlkx3iulyojfaii6w2b4qgbrhih5qs1p801stjcw1cdq78kwcdv7u13ipa1vjh8b85gbaoy4myurra3y9tlfrhzhl5o5ef1th68vu2cnohj8t7up6vr4ou6fl8qqwa6iqygyshvix8bts2k5af7af2n8jlr1eec8ckds9q5yr2sjtp15ih7jfjtkny983o91901ev4n6o7ww7fh1po3e8xgmvt9pzg1754a5o9axr3w15k41edb7bggyr8jtaxr067m6657t27rox0s0x7vpaiq8v2qt4lpjqg3eobrg3unhqy85z3cfi1dsu7pibw6tcguqanszw6w9zh22wld2i29qga45jobab6vbyrk5hkz78rthkg9fvq8698vsdl7r6uda0hgqxmnb5j3ysyg07jylkmyo08lji9z5jjs3vvln8kms35comq5ab1ev5u3iocvgwqob01f3bsvu9tmthmahfuo73manmya9l3puwdmow10sjbpb0s5qa8oa6i2x47wpm1h49e6i52a2c6c31nqufimr54yxrvs0wwy82wfy7xlop5tlxhoqvs5a6ov4chsjnyn5l7ezld6nn5d12r038orsa6op1eqxic4n7jk3fe4r7xfkk4176rpehh3yu9cj9hdvi2bbo6rhnhlrw2uacyouzjyv4ak1msnuw6k4uhq8i2ibpxddz52066oiwpg6x5lmmc409v9hu5j2vojudvr4qgy187mfnaxvnv35n65uwlgtniwmu0vioazqe9mesl9q0v7xnshu5n0qzkyc9nggnvpa0bpsab6oh9altnf6r32d4bhff9r9yxwk1gv6caro3py0g8u1kx7si5p4kk1rica5nmo2bx5ph7hs8j4rh2pe2ilm52qxwlscqyd3tj1mgkm9xyy8zy6pzaz7t48hm2z5l70ic9enpjvh3xd9m67uzw5b03lph9ow09krouqb8xifaiq6us41r1',
                proxyHost: 'i74j0zbn5097w36w5ghrd5jb0ygkbzzkbuiw3vyxj6s38bag2wowswz7wfuu',
                proxyPort: 1191420207,
                destination: '3zq9537x8ay3272pb7hl7f5wm1pm51yttkdqf8cj8ena6s0lueg09pb5nsrwx4yggeo2jn9fwj5eu9iggl1uyfqti767b9qifrzvez0qdtd6f99andjq55noi91r5dmmt1h2wiil3iyr48lor350iwx6bz50j7h6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'aqwouxy6uvulyf6o8vgvm1eqepqqyc4i83t2qevht8mn2ydlmwn4mfdj7t2nrihl0taeeucjbujscjpr5dwz753e9qt58i6od7kv49gp0iiwbzdmm6cec5r73w8hd2gbadv86nb3j3r0pnv97ft3uu7qag9p7ppb',
                responsibleUserAccountName: '5xc5yh16v3cqc8w6pzz9',
                lastChangeUserAccount: 'v7nx2h2muupklx06dx0f',
                lastChangedAt: '2020-07-28 13:30:09',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: '1vqi5hpirgp483yn0u2nodqsr4wunuifrl3rmgx2',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'hhaxigzsgepehrjjydhkldr31w59b5x62a6lgzhfy3aq1ttkud',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'xsccfglizkur2s7qsdds',
                party: 'jzclaymoi9rgidrzrrektd7hicgnx7tc9gl37ot5x52ytjohx2x6wwx8c9leo84s4z3wovrnythdt7vv325m908d5iwzqk9bg1wneskjm3c41jgvsuswb9q3qtikcuc27dhe2yvlvc0jh9vwmhk7fkn7ah1xg3nd',
                component: 'ajhc0zyff42ahzhsn1eljybn5zko391o7o9l7n5bo49b542qogm1jg8igev47wum6a6uej96timot7pjzhg248afzkvoqrx2burzy8dl32wg1l54snc2f3druofe20txjlnpaemklrvq11s6v7d93hqo07jzmblp',
                name: '63ijkmqw412pczw9d5uvv9b89k7fmguo4uiblhx293ih2050p9lrk036wf9w8dpq5vuhpf9gh0su0d7zpt1ei0mvyx72pdrnxza61d1rzsavsvt93o3cofs57y6xtzvqkdurjb7c7fmdg3h12gwclcjw1gzl5qaj',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'rspilesxq2nradf8e8z9nw2if5d0nau9u9g2h5o2ivj0o38rzkgaefq63x2q75b9p84zy2l4ydhp210tn2xkb7y4o0n6jmjz7lslivemevq2ua6cj0t44o1nbhd2l691r9nap466j7pcwonx96z18lay59yye2jn',
                flowComponent: 'a23u6cq9htd5ku0u6vv0lgxnrch4q1a7ikpaizdogl5l3xv0jftalzgxqokqx3j0qmpz0cvdtutz4lgu7zlhdzmb81cogfl7kx87ww9xeiw5dcgzh4nrh1dfzgnhqfg5794dvx2seok8a0czq41jpy8siitvkogp',
                flowInterfaceName: 'xmwuz65e2g4tqz2mdyjojfzbbo0a1t8vyeogquejq2nalliz0floisfkk201nof7rxipjbwidx3lc42ak011o3l0a9nozi59j2fx31cca17p4rgtk4eg8d196iaggepq3am31es809vzjkb92xs3gyrff7l7s1z3',
                flowInterfaceNamespace: 't3z5frf59i0urcnnsjzlt4z91xfezs03xz9j0bbbx2lb0htio8vjs05iqjghlagxkt2i0zdsu20z9p255yuugd7kwypggj3l9nzrqsa3r699xt5ug5tn0wv82wma45u52nveqly5ngilkcrnf03cr7hhwte643ll',
                version: null,
                adapterType: 'wd4qgcyr5rkibak7kgjozyfadt2gk59m4zbs86pd9fgrvpbz1qtlyharjxx3',
                direction: 'SENDER',
                transportProtocol: 'livjmvhcqhi7p5s5k2l5t5a6wwt2y7hh6703l6mwmshuw3udbcjp8p12y2f1',
                messageProtocol: 'brgxg7wrb8lyymb5q09ztivgzx0zidf2coyc99pzs0q3vl4e6drtq35ifrl9',
                adapterEngineName: 'gbcm9djkqiq74j6b6w6yo944uib4tk5u4k9j5pvk0xez7rh538askn24crf0clt8763oym73797zidjsqb76qci5mso2fygeqsw1eannbavglcdpu7ex3pfc98cpwcglg3vhy9dhyzkisdzfry64397711wlyw2w',
                url: 'wfrzk6stlhqqz7j8rojrgsftlks3ribj8y3p5vlg4weyy7ccrrj4ltmmp23sg93qiribysz3m4rth180navs0ezquivj1yp29tlekhy4y5jejd4lmyzoni9ac64ot35x48wj3jlm2u34e6cs1bccyfo6m5tebfnil9rqzr14i704w41kyg0q5tuo4e8c2jxbtktrqfcc4n1nafw9l4fjvhbb2638r4b6po3a03m7ezfd4g91fq5ekoiotaok3b6evfk2a1o845wgxzwxvq9dbd9oalg7t44ocsnagut86lpn9at1lvcn6sc4kj7zi6uy',
                username: 'x8nmks5h51fgfjlgc5ghfbnlexrago1pjt12g7koekgszpsq5tjjz9yau36c',
                remoteHost: 'bw7ukm0a05qy5ne2raf2c5og469fkeo7m3r4i61gesfnl7duhsqobpj7nzchvt686u50n6eyfrtc7ebk9lffeny08jbmxwmfxq8e3aqp1nflskvfof5ny1lbbhhe82vhii7k201ldtvolm136g299hlgqtm6k1wz',
                remotePort: 4266599854,
                directory: 'bpu7txw8mk8zb1ewt2uv2dbaleb12148fqh3c18wt1ga3x80etjwtjvry3mmwakr9brlahmmegsxxd55jpa69l099o24oqyy1n0sko0bxq5snu98e9fjieg7nd6gi1yylmvipig26k3izynipuaxtclhinua8juaogxwx2dkgchb7vye56imiott4fboggse5sor9pk4tjy8riclouhjgetywghawxrkizr55zk1ccwr9ep4wug0jug9bj0h9b8y5jcwsjnbpd3sefj8u7cn9z1ynmwdtmrcr6prtdqf88ufz0xdoq17lrw3vjwm99lkefn8ct5fsrxo3l46g8cv01ga0vrav297sj6jn1x229ig5ifhcbhdc40zvckb75p4ci73go8ybtvvct5lc0hzkqeu5qwf1gzcon9jmelk5d7zfx3x209x84ukqo4w2mdjvx3u1gufnf38qdcljgg90s3yw1u72c47k1qexw9falvp4zxsdm76lqqus3hlkwka76bmjhv9ppz2e2mud6hc1hui4w2ue6vxcdgcw5gvlyafq02cqp40n6ph5zqmjuxl6w8xxmwfl2ogqhkbmsfoabia9lryqffj55cxl66hoe20ita0hy33kpdudekmydbk6mxinbpwqanyuzh7fq0y3p1zokucbgos3ru52f1bq4f5cqfz2nmdjwugou7xeqyubbj48g9dt1uylmedbp33jfdc5dh8f1j6yy3f1mp5vur7ql3gzj2qgy1e7px5q8h4ulxq9f6t9jime0g48w1iz5u6brqq7ttcgx28bkb7h9dwn5phkk8ppvu5rxv2s4lx8uv6knopazypfyqzinjuubeixy8eay2dv2ebjn9w78eq3ld174jvghhfmlhzr3o0zrmjpukr3up7jf1ahtift264vrmok6oew6stg025f7sg4fy8uxm27ilsq2zbok4g6vs4ubs9dw7wo74rcrro24r4o4fsrc1j4eplq6jdg4t6c6xr7vdwvo9c4zcv8bix',
                fileSchema: 'cjf454xn7qgg0uycde4sm30x1yosmdp5s5hj6lz2d8o1bvi9mfx89ok39mw15z45fwpjzzml51u52762nhbsvlkljwhblagpv3cmsh9cgdi19oh13a7evcylmes19opt6tt72hfzhtijrydbr0lm7p57a4krhidnwd9iokqn2zttfzdtzky6gv8tjaq03steiweu0iq847a9xypx6nsu1sm6lph420a3pokbo8rskmfo99m7aldsy0nweqrnwcpcsdzsbsqxxs2mrwks2bewigqldju9a06hcqw4b5bka022cmf6r95acfn1s099vygeegyyp869fpskg6xgml4cw28o8ymzjwdkf1vjwspkw3twool9r3gz9cpxam7fryk6iiwpr0aqlkq4bn8d53c5fdrlwa679e0wz38hd6a0eww9yifg5r9ok5g8uwp43xy5lu0arahg58eoeldrtmj1j8co66wjo7e7jg6unipcyk76p89drquckqpzpcy2e1onh27n507cgiiesa098p2lvfe8pz3aygu5iiw2168x4h6qrqicxm41xfgnegfmhc9xd2i20pt21b5yeaqfvf33298wy2sxeaxs2yv1ip9xzixu6djbig9rbz1km6m7k7hf52h9x2x3wi9vnpnj2runmtqdsdqn0g9rus5tgfo7n8u7vzs8zbnlk3u3czypnl32kuuy8bvoaifh1q08oefyd0bfusubon05guy6t37qu0wbcrpninokh8g886ubdhf9qu90lhedcn3j4lvzoblhb0pzer5mg8xk4vufqq2o1k84ihzsuyabd6ity8p3rbl0n6kdbwlm2zbbx9u6ibyanfnbtfbyf2igrtfsaa84e4e4pkgjn7mqxw2ni69gxv6wos13j1z6b4ydezrh2wu0stcay7b3fddemsujfyiadru53ez2t3c5pxt6tddrx5dmv1hv06arw5cld8x61xl01s72qoqzt7oe48ddx6gt0g6grevhnbfl4014mw547pmi',
                proxyHost: '8kvyuo8ai3ec9k6z8l263ehp42weov8itthvccjeakau4va7r9lqpf35wayr',
                proxyPort: 6526195032,
                destination: 'pryke8zbd3oq84djse6kntts1g9zz8r5lktzgfiu0v1uy401jmvp7dvoxa48nb4ushto1zvm35nq1vhi9j60do1dtomzwu1ua6rwm298r4m6chzxzw1tbb985qzlap9fao7iu8smru1u3cdhntcafarxtpd3ichh',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 's15n88y4oap84x41eclv8ccazn3yndsetzn3273axvxb9mif91ni1u25gyk9rj3vnndj7kn8im2h1dgrrnaw7pwu6lh73f2z6f5hjkkdrgqw5nbctbxzbn4a0r2gyfrrkbwnivhezssb7pqlkwqzcyfp8rk2liad',
                responsibleUserAccountName: 'atgh6vkiycn3nhlq6rt9',
                lastChangeUserAccount: '489n2hl8yha2eo9uoja2',
                lastChangedAt: '2020-07-29 03:34:48',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'frx2hylfjvcda6brn05ojwh2w2cjb85izkb3ndb0',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'mmt9dvwhfkmbjn014p5rar5xijxwbw11elr27k2guhc7280ljd',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'ffpw6p45nca1uogdd4nb',
                party: 'gsia6aa4qz721uzdeymtwja4qcbhjtoj52y2rlaiv4vge1hudl5pfzohtula4q836fbguhcvjqou6lcy2thyy3rpsx0snmmkisu5fiscgy3cozzoidt6kzbs6hwyug2v4lusy07x5xkp4j1egwekr75jdf9w75ix',
                component: 'y5a4xoq3yqhhyfrlp9rtd0zdbkco3ueje8tqv5dqn1tp8t3k32pauu3ktmfkllj4swd04liba2r38ietm774cd1409n9covirrvnl1d96262ucs41gpyal5gkkf2xlfgv87zkd0p0j62gwosu1itwxuorzmzqn4v',
                name: 'lgbpdoham4kx9oy5cjnzbatm5pdz3tngmg3vbltf5bwle9sv67or9iw9cp1n6zvn7ypsaheakv47l285s7s742t7wma3pijehkiywsg362kvewlum7lco7yhxgggxwtebzieuc7cwintz8zzq2mmbdxkluuj24c6',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'n1yodx5rgguz417ymiczj1ko9e55bwl66yuqhyo96r8fc71q4waq4h75qfn890vjd2bpwhkpv5cn5ujbt1vnix69pt91n1lnycf8561stf40t33w0hq7llb5czgqjzhn23q7dsuktuf6s6393tgm5ltfap4fikul',
                flowComponent: 'y9js31awzb0nn72412wr51t708ln8r4811ee4tsowx0xf3m2l7kp9soju4nr545potbllb2srwuxxnnd7g8fyaek7yhnhsaaqgp6riiyxyt85soa391mhinnq74o8bt6f8sy1jk9xq9n9iaxcwigrcpxkgflas25',
                flowInterfaceName: 'y0afqpddwzapp853dvtrv70jl09vgza03hsb3igl9syl1vmntmgomizs0dhldl3cij7qlajlxjyn80t5gy6j1w8qsldzkgin0wi9p46oxvgk8urigbknznpkdebwhla549ii0ezh69if1quwvlrs1z59jkxsiqnk',
                flowInterfaceNamespace: 'ls37qgo685o97n2e1f4m7x8hu2auap5v73iron8t1o3pj6a283qufj303n35j2p0c78s9l4mjdqenvn9fpsb2jqrm9wpa8rvyhmidqzmxnd5x2aofgcg12g93a2km9dhxotpk6vsqaaqe92rheuh793bl3f2cjz2',
                
                adapterType: '3z5oiqjy6ms6lc9ayffhjpnzc6yh0qau01q5t1pxckd58oglnwxakglqisfh',
                direction: 'RECEIVER',
                transportProtocol: '9zox8mtihbfzi3d0bd65d6ri354b60m6tf3wndv13yy15qf7r309yd6gx6w4',
                messageProtocol: 'tc5dt8smckr7sv9iqs1zz95v1ob5ewoyfm6ni4eijanwdslv8htz671c9ocn',
                adapterEngineName: 'w1io0g8rzhlflac7y4d88wygik285avrpsder0mat5td581aa3jkor0ip7o9yxjuc41h5c71z0ahbcmywykndppygckekn1yh6jndigbn23oflgd3vft4flizlachfmaynht9mkm5yo11mrs5uz9n2a37pfocac8',
                url: 'rduo24rg7e3kohddtmguexrxan1rbzm7n4177dbsk3m6swoz48y43wb03hyxz5njcw4pjepolehfejq99jdvx4557b30upr5c00ihzoht79muytub9suh02i01vokt4bdljp079zyllgyie5itevr4phe3oy7qp6y7ed1ami962i7yaaf8t7zi5sjm6ilmqkaoiszlqnj8618wj6xn34nq510wh2vrf1vcj6z2sfjus6pdq8ymc8qugz7vxamtyr2ehxpe2zc5eqydjv4ku1f2ayhwyr72k381003dmrgpd8p8ter17b65yf01s4uj13',
                username: 'p47brr2p4lizaf3gswliixfrp2ohbjkkzp9ryyo0k3byyp3d0wobfi8w754t',
                remoteHost: 'ti8frrohvlddj6eiupnw7u6auks38vv2i9ssqjf3ix6k5nyg1pmmmwoqn4wlo7f3b3sz5at2c673lxxddetr1lt7axudeinlqm1hzfjb0rv4ot00dhc09w7jx8rlh0i1gow12sn51og6o8mg2dtotl87stii2f2z',
                remotePort: 1691992356,
                directory: 'gu1exe5hpub8mmqrgd3atleaud9mys6n99xzn1m4iraj531bvtunohvwkfxx1zlqcmm20toph2d2sajwiltjctp8lgez29pg93egyq5qx7ftis2xmfho08nnks26m6roq12tsb45g6x4egoi4lmfxi35r00zuzkqvn49240p0fpma8uifs32gqa9mi9vfsv276d06klh5ziemsf9h2gfgballqj8bal1u16s2stfdemjw0gri0a4bw97gmf6lcxm7ah1lc5lw1md29f91qb3spr3nniv1ufa03siah3lpem5fifqlhl9iyrlg36j0gome5oy0oavykzm49q17g4s18ixp4uwbcbcpw5qweec54gndmqrcoroe4dflat00s02tck9qgduod82dpe519jqubtqnqb7wwa35q5s95wtuv19cz9s4bdj9zfjbtdumzekryp5ha88lyr5u1kwfnrpk5xonbrtzupnixcj4rs4hu6hlrgpgoi81o79p2rgwex1qzopc2ciqvh3n76gf1hqmeqw1nrm4ujc5dkgrjf5oz94rnsj0m9y7k56t8vjfouiz9v8z9ofrsebgs78otdr83wpnol2likak0t6fep41ehgx8qgtvvr53b1vql03hv2887legvlkm8wzetna28n5cxh52yx10jisqihmdd6lcifp2jkfl858rg14fn6xi17j7xqhm01ben9kgu7zximj7ouegzio1c715rj1x44np161o8g2dwwljbcmdo06umta7x4dgz0t7ydiws47cofotrlyltv5ka4i1kcw8wx89937cdohqoer7i2e6l703d9ufgcgjrbo2ke9ihrrcm02sh4juh8byv2605n22n2447bq58yze0hq0fep0fbgonxzk4uqa4kr24qiwoksvl8n3dgroq621vk9uqe8rnyl2uzpuc7g3bqlh1yq7x1l6ou2s2yn2efdwg5krmoctngahgh6rvlv6key9h0rvevp2hsrdnhfobd1w9vr1g3nkil',
                fileSchema: '38w37j276tonvibktqz8b4okro2m3s4dlpbb1ci3p1qda13nz6shzi46s6cqxvmcbm792au16m27cpmjosnd6nkrfdq0zz2xmy6bp6t7xbrxpn423qnftvr928y41tsc6u6xxi5b57amxm34v8uixci5g9g6sx1mhf4gpf6ng00ipg0gmqlcjgchj15woula9qdmvs5i3iaichj1zdsyipg1tp6gopnuzlmqkslt1p4bt551xd06p1hj8d8uoayhw9mi8yt8ol8malbbdfz7hzvuevxso93748xardu9dslnoejpd2hbulxsb0qufxxiidcrokylr992tza6agbajezs6h8ll0o73ke3v1b4lrfbzvl872wvkmpam0ie7p6abcmsrqcfefdj81j03l9sa7y1ao3g5ggjr8m98rwj26nn50mjav6k4kvrpan1gv1lzzv5jghac3ll0gi5bf6sl7wmxio6z1on1l7vx9fpaamx984kyz3cii9hrmjn4wvyzzn0ywyj3qdrlykosuszhp4v3yi9o4unnr41d4aei6k8q8e3njr74uziavvtyt148z3k6e3wyk49a8295vm51brly1ebdjtkuq19idrkcdsjzkpmkrieypxgozwzd5beyyf8xvni8rp5fu0vnqjijqfh4pbv8palzjz4eb06sgchie8th3dkgfdzm7hdy3la03c12afoa614ip9bel6muycqvw40wln06g5pki0mkymhgic8719ztr3xu9ihbjhyfp1ycjz69xye96vn9eb3d34lh0mwfiezeop7rd19ypdqpgu688oidupfcper5gyzz52x9ignts1jprr7f4tj3f35fdqv140z1wseiti3ttf663xvjb690hvvmzr76glzm3ux3bqqetefvzx8xd2p3cdys04tqz1pi1k7tjfsdvrw1sd5zyfo51hn6o2fwraqcuvh8jqpr6kdy4uf0kigvz2039z822fa20jmq759vl3gckqkpf09o2xwtgdggdpw',
                proxyHost: 'kv14xwzohw7ud9kwnf0kf3yh9a1fnd1u2ixq2t9km2va40wrun4p74os16mu',
                proxyPort: 6127995918,
                destination: '2zxv297dtuk3il4h8b38vr386y2me3ep4b8tvcwo6ylqpgbrelszyp3nn9h84b0igqddiou5qxianklsehofmmmmmoykz6okuovzgs693j3b8nlbiz6w72xcwdv43w0g1ddj1vxr8aq6e99vlb5bwu5jexylvin2',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'yrum46itsyaci5k1pvuenp9v0g1kubk9897c5112lsy1oud53syqdkhdkk83g6pbdnmj2jb5m94bjohx3p4ohta674xwvnr8dyj1dmtp9gqqe2ytecg03iyt26u182ihprhllsqlwcfa0zkphb69u3gbrxzbkyvh',
                responsibleUserAccountName: 'frzipe2495r69q8wa5li',
                lastChangeUserAccount: '80asilgx5x4i54qnjc8n',
                lastChangedAt: '2020-07-28 22:20:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: '2bl2twwayqzltstkhopr61mwvzjhfn4km0b84590',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'jjw2pcck2spflt6til2bdq0el3x0a62tm7eqclibkx9hklovl8',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'wbkcceiuajtht9qisd4m',
                party: 'u4jrcvyk9qw2vs8dmt0q9eta1zb28n71ujlp2zs0unb23kpxawc7uq1wzglznitj8tflv8c0tsxuvemmxlot1k935fx2b0uga0zq1xa8uowmedy94dbohbn93sxgre1lhnu8pjm2beesiyja13fy1pe192eee85x',
                component: 'pf8t9zmzpwgx8mk72vt1vzjxnpwcjnytqrb8h2du9aelhg8wns5j5t28lq7bgd0tdh8e9mie1oxrdxb8bjk4ls1djv6sijebukr24xyp592m62fxqrnru63snqqcoe4awx3z0ybon09bgj13w84jhn7nj6efz7su',
                name: 'oqm2grgn51bgrjyydfiq56nmw97ge8c7cxkvnx4cok9uqx7kvnnn1eri8fealgwq9522bu1z47yw1uy862fr15ugvlmeow3zp37moiiwwhox988syia8ger2kmruc87eglydfur2s7sj4kmusxq6b3fyvgmpew6a',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'fhfw0i6lol8j0al9mzix005hlr3s2l4mvquagerjwwrwak33g15sjo1e95yegvbfue4w8z460e0zr0bw9rrlitxqvaf4cz3khidj59ft3l53etvryzgcag2mw2vl65b6okkkqyw8p4i21969wjty2o28uif4z1ny',
                flowComponent: 'wsw8mgy895y688pnsi8l2k3sfvw1e0xblrm0kjs8904iibehlxkx8pp5tf6vh9mzt2uc2rrde1tb7pg4zhqs12eapgbnlhod1xcr9jtyi8a3x5slwal5v43xx739rnw2dzamk02xv0bocsqxulb77rnjcseixzc1',
                flowInterfaceName: '58gavj6zq94kq0o0o9ol692o86yphh1puu5jdw15w3dxjd90r7xt5vcx2f4ryakf40rvwook83nxn33bu5xjsbqr2i3pa37u43weu77gq7k3cfzlmddhalmj558jspyl71bdce2rnjuct706p5um36t5utrhaq01',
                flowInterfaceNamespace: 'plct7idhsnwuttl8typ8qwtjhg51wnyus6574oeiyrju2modlcjm7artl0hf7tcan8vyqxir58eru1mq91s78kau8qdpri6hmsu0eh2hy5yl9pifade57m65gx0rmlt5z9oy11gciuvavqolkzua4ka6supda96y',
                version: '2rhy4c7txc1m7disf5qv',
                adapterType: 'o0bm1o8ppaoruwdx4tf9ev1bcer358fc31puofb9w7o5rmfypvcj6ui1kis9',
                direction: null,
                transportProtocol: 'b72urjss5qv1p00px5unzo5fh6jmsc62c4v0vth8aimqz0k8nhw6em91ojep',
                messageProtocol: '7loij5lilkng10qdtz9xdl7b546ll3uo1rc7vuxpir6egkdeamfrsbhuy3f6',
                adapterEngineName: '952clp79nnxr79tng6aocbl0izc6v6zcm3dtj1dtuc1go9ho6l4cnyjuuw9wkh198v28b8rm5lf5wkrvc17xm0o2uwxtqacct79kanazil3xn8t5hp3t478buxjvc5mjpagqk3rvesp5p3jwoo34n0hupji37z6b',
                url: 'be8ld7flbwxytp0l1dajvk9vzqcnm1y1x5jaueb0y5oq7iry8237wyif0ws5ydh6qkocgkg5bdy4ktcd1z2bl1t31oivxd9ky37bruw624ws8mncyhoh0ojov8k3sgfyw4fqk8u2tuon62ongcyxix87k7z0iwtu1n2cfx3kl9qsv48cql32mkh41at9t7une403xewot8vspiaagcqu7k81sqqh174gx5faprixr9gq3875xt34sk0o923e8aq3hx94pc5sfnyi8czztfcw0dakleprakivt2w9azxozjknizgpa6qwfxqcgcl5dbpi',
                username: 'zshh6itnwic8tidsyx6z5vztuzbzc1969y1e8zbi02ait8y17nzpwikk8sk5',
                remoteHost: '6laer1byo5u20lhs2fcc7iafi24iq6782morwmzyappe69ndegnxk9clk00ekjagpqmnxbhwwnnn6h9dhavmfj5t1judxmoqbiqxj3s372p38ewf7hwlu8ll9b4uukw95fc09ot99efb60wsfsu3o3lqm5v2n76h',
                remotePort: 8080230908,
                directory: '1ejbbjtusgyjrhkhsvlxk95lx32ng634v6h4bubfd5zpkjoxxb345j8ewcvjswmlmk3puri04ht25aibmqy1cep4fbgqe5d8xynimy45nxf7e71aflvct7g8grqnvho5ghgjzmm3hveidjngcdzqz5i1g74nlfyg3sjqy05qqg5tvpfmbrpfa37i3x1bnaypl2xyblfyx8yypz5ysgaozmwhpbdr9b3mll4i8krjsma4idlnhlazwf9lte9byir4zgf0s0c0gzjzombur2b5u9xwji9v2xrhnndcxem0iqtszn8qpcxr8ashez4gm7fnazqkir8lpskrvlqvct6ei1sihu0p7yc67j8at1aiv5d0vn343mm9pstprcxv64tpun82fepvt3w5idl1vbvc1xjjlw50fb7hc6fzuwf8d9h3mqokf54aq6xv8i36xntog7kcl4zrnu60pxn95ml2pa1enowup6al4abfwciwbqc2pbnx5xpt7mhxrjpgx08xkmrbacrwquv0mqlcm42z7ujeirzo9tecpr1d7dlycu9dfajewrm18z4m0jgxxlhm5b45ho0843hafkzoam02ui57pk0x608par3cuz2yso0n2f8kfnppxmfeaq4zea7ztaupjgfs3e0gfrzdjz8etihyhpudb3z8rt66dhu5ixdsg9i0y3r1760zfx95536ra6vh50271nezn1a82u4389ejguf0kxk4x2r3nf6z3frsn0w85g4dwl7pu55nxa0fx5xjua5h2ph0ju9jimcch3e5n43xkwmnwlgjac3uzjr85o40der0n5g7ua04ja31qrbpzx7t30rpikdwg6dwnlqiausuqa2xirj57fib8291l7icemdorove2hb5ogxmmj4l9srelffijokx3282c3u50qrrt45tbxh3zv0eu68ei3yf2g9ydy3yyv5da27udr2mvcy3zmlhv3cruawrxxhl0fy9ai3v8cilhlec6pcow7z3ezmm00fins93799p',
                fileSchema: '3rf5iwabqm1mpl2a9728yb057a7oi3wuz1kwqjeyuvdm74itr3xp097fwqsw1yoybac66jnv709fscyzrcx591w3fx67yoqdt56xldqtuei8mss7bto0f79cvruqaasm4o7g85xzqwdq6o2hg2zrzbfg98rc0rht9pdxvezuimkmnkujhqoeqeo1o39bwxmd88oykmwy77aaew2xoje8mwdtmgi9rcdpcmiua5yre6an1mh95vntkefmkhnx06yyfwigq3aibp4bloizbyoyd02rejq01rp11vpu5mp2x8teqwuu6zkuwsu7mmww99c53ub8svr7rpdmmkknc6j7i2qn7hshhz6wxnais6xzd8lsq02a21gr8nm3cu2a0br6rinigk1is7svaue0rcg6i4uchdy2m5ofdxhrq93uvno2uy28dz5gin35e3sa2tfpunccv0vzvflkvbl5h80c1k0kd7h7c57hlt87k8chrmsbrsw3j1lg9upk37lvsnd5wbffomnwmechfyfz4bln0vo55fz00cinjq9hk6reww6dsyf2obcom5y90eeimtd7rn3x27u1dmas7rw9k2ncs0bxxmq3pwdqyp4701mw120zm8whzde3v07249toya5yjde0ph7tpquy1wxo0xymt3bdid55g4ellxyevt6o61j88ddie8hr4e5hrwitr59jaseny1k58813e5dqgduto0xnw52o8d4770iovcfq7z8bjlechp9hjuxei6i704s7iocyreqc2ts81wl63k9u4nkeu0vq953rs6shndtnqi8u52mmog4c86nscae7wl6pb6rnjkb1sixcw7s3sab7x9qymn9r2z0zjmmjhwp5acbun6lr3ynepirfoxc3ms9i2eagvxhr7k2vus7cqmtbbjf7lhz7vs6snt9h0entwvfhikdfdoosc4sjvd6ybz4z1g19a1chaaif6ji2hbmrlqtzrk4s91lvs7cnwwrtd4krrp7dnziedjh50mf7025z',
                proxyHost: 'co9p35euhxm47bqtwdmdu8e6os2mexf3o0yrmsrce96p3mkn0t1u4xuu8r9a',
                proxyPort: 5276988116,
                destination: 'qk3eizy6p2lbhz0qsf93s7dp4pln1jj924ciuf8oijj6vb1if9ng3gbv5p8maexjdymtyt46945tpcbywgiplxh7wtwl0hv23kbkmio08lcv6zo5iu56bktsm8ya7wvq66hvdyx3kuln0h70kljo1dawryox3pmt',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'lc3wegf5b2z004dlxrw68jea8clusdjwte1ukxoy8icbs3s2htemwi4vrw67xy1bchtpksdq5kui696sq362sfhnyrhf8xbncnvwklyr7jdey9dszxyccs4elvyjhebuamzbg9o0z06hjk1g5553im7csfyw5zud',
                responsibleUserAccountName: 'eeq1bzlgipen3jtnua47',
                lastChangeUserAccount: 'xhmx7ifhy5tztg8wkmkl',
                lastChangedAt: '2020-07-29 02:10:29',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: '12h9tu84mfet75su3qa9d5g0cl6dmjonnx9bk0xv',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'qs7h288khwx71fxzqtyd0o42f0pl16p4d0et5ndr52qhq3hsf3',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: '3hg91wjgqyfe9ijt0wld',
                party: 'vvhggup4mvq2mujtdxurqyvw9cv684h5ngbpuyhap8x3b84ve5gmdh77g6pg3usay3zbhc721aroy5q9tdy0ejtcnp1o3bdyfammm0bx2bgf9qduxul3r0mb7peqg2l28ft76uaea8q5w0eycoo7jrbvjw56sw8g',
                component: '588j1mgi9zd3bk5zdgcpkdv702yct0vsndw20otwmiqxoou9ks80jzqvk4dwz9qlkel7ng3zk43wk0xv411xwz1f1es4i3tga1ezljmbtffanfi60jty6557unk5cve9icgsqd4d3dd4eb7bjx0wlu2gio6rnxmn',
                name: '771ehcu4ovfulguo1zydssxdkpu4gzb6un286puzsdxbddg19986pfe46xydgpiseke2sh9wtecu7myn49f2tu17azyblpvh4ca8syzoo2pa9c09ntsb09ptny0ms8mcpf8vau86dhzww9tvieez5opo8e78rb03',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: '8g4lr3bjpkioh9b73wi2o07er45mj7cbwpcujtgckrabi4ru15nvcvv3lcn084ntyh1yc1755e080r3biejp6izibuirx720qufikjzvauvge2sm3hnebelpb2j10cuuctqfaixv9qzcqeu2gzht8k35vve3mtin',
                flowComponent: 'iihwwgte7k5rx3ij3n06uq5560ig6pgc7bn9xe333xygj3btrtzvqo116jrebc3ses5b481z2ax31de7mj9n7utt7suoe4lmn9x776em6z43gkf8ykzyqmmhwvdv3grqp3zfggpmut1fo1rjbcjd6k2s4a03xfr3',
                flowInterfaceName: '7awy1tjicuen97ko5hdcnx74ut6dxiu8e2b4rvsj4xpvp92wl9d40vrrwyuk18vslf67s94yesms6jx40j42okq8ml0dnptk15zwql454dkrv6y4s527hbss26yix1txbjmpywomg3xlu4sgc01bik7xiuyyjo8z',
                flowInterfaceNamespace: 'f5moi4kc2u55d8snmac8blpy68j2nmd5lgaci5h4g98c8o0wcxiak5isyws818l5yqfcyj0zcip9yes1shawbvg2s2c9kc0cxjaiy5jlfz6iaqcwhy2npn54cvixkiz7fnovitakllsvj1jqlxy3uhxxqm5nwksy',
                version: '29b40um06w5nzydr9yit',
                adapterType: 'bj32pxeq5i5k7ru2pjrj32zqf773pte4632ylruy9c1e77930mcfiev877yx',
                
                transportProtocol: 'n800r2d0v7f6m9f5l88l7uuprtxdhc5ic7uvtim84rshuyxh335vsskpfux9',
                messageProtocol: 'xj55zbenmezibwv6c47lobzx3bbanadxz3hb0kqpj4i5ax201wav6sw7y6lc',
                adapterEngineName: 'zm8qmeicehjmurcg1tifk4fl17mhmbq1p1afhxxtwxaft79nvtuhx4v6yhtgb0zcm4mb123gzuzs6q9pjn2o8h77288dif7ac8qujme8og42lm6jxr6m04jej3pfpqybf6hjorlddnexf7xlzff1fugnizyaq13z',
                url: 'ftoi13plbx946fnwkneuz47165oqhjvup34aaedafw1z5ad981pylz8s6lxwtjkywrk0e4foisnb14poqa4dvp3h9vppsvpqa5fdagw41grerqugzpf987xkg3ivtfmo4pe9q6do8euqknz45zvd6ix73gwk78466v0fsfjmtgqqsucnmcjqxm20k3ldpbc8bojbeo3rsgztywqjnfh8z8o9l4naie3ib3vvuooy9hjjqdxw6kw5arojnbf72gkeydkqisszilsay1fuvp9w925bulm40a6tkynpfhn1zh1f96zuwt6og955us0omrok',
                username: 'mqtmupyh26scvt7ig8q562hjvjqm98exs00ycuoi1rcorgscwpbdcu45qx25',
                remoteHost: 'mv5pbfnsct96zj9oi0l4uiy1o7jre4xj54060hd2vq2m1rmw3ivrc40we80u8d1y51csv5dsyj0o0gj5dn8e4pcf0pmc8e17ucnpvsjn8fdx7n6uuvtcjcpnnq8sehr7b6wtaox6tmrxeslzew2e7lrqk5fsq29t',
                remotePort: 6036475016,
                directory: '711ecbxssg7kx8t8cxd7eu8h16tf8g7w6pcly66b9qeasv4xrk4pie5mp3sfy0qrcm95v280vje11hpm2wfeg0mk7pv2sczoj35qbutapztjr9begyub0mr0moa3290gnx4lbyd83yr2afez3e52dlwi7k6otgd0azjacu75m3s6m3141ni7u9g27ac5wmgm4bkbtvpvaows3xmx9blhwoux87431jtyu1zmkdcxpdadw2ec9axpbacjm5p1l4tghkcyjloq5zs1u0x52rv8py9fmcuduurqwcv0rntsvi7d0dmz08m5ah0q1ksmh7wlpeaxpce3hqllanxhpj8yvqctnn6xrfe79p6l1agjartjae4hrkn6xyoy1emagd1a9wsl5kmoztk9juuuz32ps2u0ixvqqsnnsrbvmb4g5ywj15sk88apeq5il3k94u8rgnwhj6e7x1dp9xla1ugs5bjeyilvucibwc4pkng7uxwi48rzk69s91o2vnh8yj620ux5heth3xjxraere0phpkin0gc125hl2pdxfvnipldipc73w5jqtx5rozkx38p56enjxfr5jk4depxczfe1c8p6y1p7s55qc0uvqfemu3k3ihj64m085rilzmlkbpb5r2cams171g531lpsv7fkdeshru0xqgir8y805chms0124m9umilbxi2ms44ilu63h58snuo9bczyfjq4p12d1t6mjin2tai4z1irj0mls8569j3g0s8badcvezq9cdgrg46okn9m1536o3k09quor0763ga4a7hkdwhkckxzrssi84flwnffw5x5gt10ck181q1zgmtf4u4oeuwrb7tv58gtypi3tt0yrnqlky8fx8oix188vtmjcdup71gw9jj5743m8ldfsjwynd7ow73oalxnmxjotb0pd22uoky9rokascc80f8padsbqe5azszxlqoqnq1u8kpgkmrv6d9fl651wfg81bndmidzu1gbxh2iljig439de32tqkmffb1p',
                fileSchema: '9aolc4rtrlzkrznzgujy2c3drgnx9slwkk0h7z1urdg9gvzwooryjuf01x2b6hohxliq0f1vbdlhft3hw1qz8kwa17m1brromo97g6zt25yafhql1swq7ahc4ykrw2rispd7738m0rug9662x4i1yufrf1me5o9k7c59zr63p0ig31scn590mcz4almcmb6k9kfzldnv8imvjkgreou1c1eznfot5jyznm4vohxjsb7bobb2p3xjfgmdykn8ew5si9ft60m94ejy1tdhh5akok710j76nh04p7cfy9i68petn0m1icnbumu5ih3awkx4tj56jjepmoe6o0bqpy6cah8cejhmzrciugsm369zigqbb7n7rdvubwl9py64tro57eqm4cj5omokt11iypddahhj0zo5qlagfq4na5cutbm9w4kqjkk7bnjdzor0a7wihnf44qt38ksk2ikijfkaia2etqsb5cz8tyoxigehfc0zt089hlo9unonlcll54y7rsq3b4mtkoif5x73u488w2n4u58z9umc8ks2xhsupcw27dvf0oi722luxik17i05t5wpqlozuj5bwn7my91suqcmcugdiia5meaxhg4alpg6waq3lq1ji5j3vs57ir53393rlryza3at8i8h8qxdupk6cm4r6mubbzuklpr4fs21ee94f0bl1paqsnljujrmdzld9st5tv1v88i7537c9i9up2jhp0coygcw1g0ucvzyze03c0h7ik8g0mmuvkgl6d0bkylhvfa1djc936vw8ahys93xfdf8t7n5i6a2hholszpsx5mbp7wgtrh4yptxjdll906ydg9jnwf53dki1t2mdbae9ws2j8blgfh9954na6yrb6ddn1yx9uqozp37cmsgsose5w7gu921yym7cvdii2aeo4laejyno1jgrd4f0yk1x8cwidwc3tvzs5tgor6i2swcpzs7e0qh6ov1zuaolhba65xzbq2ttl27mv1neq5shkuwuakyn1g44o6m',
                proxyHost: '1lbzc9bt9wcqe72gnqlihhdxhroumqnu7e89ukpxurlv40vorw1h1ow4jyq2',
                proxyPort: 3287905010,
                destination: 'b00wg8t1jwoui14p2dv5x15zodcsviza3fwl66vexpeb4zgluogj3zp4t024200yt9t76a4pltqj59lgsfyb6bdp9d9kptcvszh6pi370q9lwy4x5oru1y5y3qiwf4773k9v6dz7rf8i6htv1anc38n0dk8pag71',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ha8d4c0fuhf1uhkr94v8o5sdjt1gpblcbl9ddvzo02lnu5goaqjnlkjq5l2xjldondxnmussgk6kqdp5a0w8nu7jlvnn5lukkk5dirpnex61zx3ole40o51wx2kn0e516m4x2a51j4cmcgyzohzajhrfs5596108',
                responsibleUserAccountName: 'vsg6i38yat4uim1x7y3u',
                lastChangeUserAccount: '0lj51do1k38k1z4vx4ov',
                lastChangedAt: '2020-07-28 13:35:11',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'iww7bn1v82jcfjrw0w25f72b57s28l5938qe1jlk',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: '1s3w1jidlhke75hevidatx64pltu2a70ah06km5qzegb6yn7fx',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: '1bafao0ft8rpfio3hmg9',
                party: 'kelw713ac6o4joeq3wv75tya42etfzabw0v2gmj35w5csguaxbzl8thf2uuop4trhb08b3olu42y36tznmph3ag4wxd3mvz9otmnhv3ibjhxluqnufpv1bwmpnvp10wp7q15tc9t7zz8aw6klgjbffcpn0n21pb3',
                component: '1kxyqiefo4vfd69n7i0xmedrawcffmtkvmlj51nkble1hfw4rrnupjwzyfuwc6gmbjegogjoajamqzi2ei6uda3lqxjxdvtri52mb7901uzg0inu9l6i9qr03u79fn29ouommll6ak12vqn7i8ua4nrrgzqdsngn',
                name: 'kmlpj9bu3b1jvavit9vg4m0fbyvhelwzxfplm3ze93zio6i2yokqrf8o2hvkv1box9efbv1yz0bzdwgfkghiwd6vlncb71ch3niibyuyrv6i3vlzsikfywtlde6q2z5s0tlbgxb1hqy7fwmvylr79e49emmr2zww',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: '78d21otw68iewapgwbjo7khhbirebz29y1cju0h11776smw0deu451pm0yns66qr9sjxki87shloa2z3mivrbem22d6p7x80ix1qs8eqno5fusqkibgwuxwdtwbv1d1mxihjk06z4nmorcqo1ra5gs0yk4dwr7i7',
                flowComponent: '1116dqwvk7w369uwggo4kz9025wssgetoyjsx3d5dgnins7qx6f9kldzoow7j8py1gm6n53gal8lka506z085bztxciy43yq6r9t9tjm3lihrrqb4in1wn8japvppwgppfujinxb28dmx1dkgw8kcol5ujq2l6by',
                flowInterfaceName: '0ekpjpjmug5dg3ujkqo6hg54w8yifjma39bt8ym2paky91wpl7qs21z4k6qn5h75anazdci2h518jabo02n5vvxu6fdrzm2fyjjrrv8xpfab97wlrwxdyi1l932t0jai28wgcqvxvrr5qx5aeo6jrcskrlphxne8',
                flowInterfaceNamespace: '9vp1jkwkmkjspfqldd9wz3k53di3kysfzmv1xs6u545ylntu27jhj69lc5ih7uanzx2uyx53bbthacpkrb3vq8gzj5xnsltvm2kpm2skpswnr8gb8cu9ek03wnrf6p1guy8qs9bv3rlfahe0xl3910vevh63olxt',
                version: '5cpxif925fvbbjizha0c',
                adapterType: '23g71gize8ijn7shtk5d1qgl8l32rm89jf5smu1wqa9o6fytbf83bqj9a1el',
                direction: 'RECEIVER',
                transportProtocol: 'd8878vtbvtdw0dodef6yk9re8r7d6eblptsd4zed1htmn64v70b7xwnz47cn',
                messageProtocol: 'd9jhaqzltdypj5ry3nczqgh96o6z3y0u2r8lr1u84a1462mqm3fdl4u3qm9t',
                adapterEngineName: 'zrc4z33r38awog37nedndwlt5ga1mbthx77cv9mensa8n7fdeehm33bmrm8125696m1qrbt5ghbh2i6csqvrp5p0mitwi3svj10bk1ge6c34k8jw3j3jg7v5jsf2w90mebunvt68yn8ok17zakfr17ud679zmid0',
                url: 'wguwwdikjl7eoj9ljzrbd6oc1aqxrwglq6kqpyvqi0znlit30i4spfvvhgahf9iijals6wl9bft478289kyw1gsg20882wb2gmszwquec6ix0zu9g2ufag42lu54ilc6ihdzklbbtu36jd1w31be9dpzyq26dgl5clkcpj11wv5030t76gjwvyicv7wnxp9an0g3y0mxddvl5vklgdbv47tlnz3h8evrwjqc16w2ygfdk1kiahr3ke5oyt2mnbpdgfvp7yrmu55zwsu623mbq1iujb25yig022ra7x3if5993oxs4w9ecgim902q9xd9',
                username: 'ki34r7d25kjj02a6nlqtz7s02a1obe5pbeb4j8majhs7jktfrcmqxchbmuq3',
                remoteHost: 'gdjxtjt06kyuaavdcxornthtvre0krh4p2t3h815k46xnh6pbk8rbyfp7huhjmo6qn8cgobfneq24p83sfuk5x47zpr3v3npqy3izyoh2fk1gb4e2gp4qlpr3p56qoe6m5b5vfowv9uz43imbcjvehmib266znbl',
                remotePort: 8221490966,
                directory: 'phzyygokyh9hu45qyg85yqapzi056j14nrx7h9h7th4amcpd54m0jlex5l2i3mbmnr7aojhnqoup67buoq71nzz4ekm77vs2hskj4igp84dt618y04zhrephgsjkqunerfm0wl81lhghg0gomntftwcym5lhki68tajang2pmhodjfgyh493b6eank3qmdxh5nyz4dgdw3ji1htixzeo42c5p0z7v3llx7mtczvo7bt5ad8t9ojfaraxytnmkd8mmtim5edczs62pi5i6q7dvgyfygav2ewuz04lh0n4c6ji0ui0wbyngiw104k30kr1unilptmsimzfsyspi7f4427grwhtbn646q8yqtnc5alayo5hgyq2tng770dpuulfygp7bsqqbnf6rbxmoan07yrb8xqudro6dz0t1005focomyhjbxx8mb89u6b8cgvgxzcuqb1dgvrjtgno8801zuzjjmr0j6irzse4wol6u2a4pi7bhzhtazrlr6mw9meoh1geeaby579n4kvwgv7zkxpgcoqgb9srkrhorp071hzkh0hp98ax471rnqb4bwfvvrwrizve2bj6j8pd53btpifob9xd9g096mjs7yv2oi4d22l5p7sy9ds8336ypfmplm32glq33nc472hsczr24zkqbsjx64jybzhe2i5y2p561ebga3g2o343vrgferlt3sdwu60da47lriplacib36y3q3dson4zc2npcsbd4en1xs6a8hbfhmkkggoy29rv8xyl227j9ytz3s0om1zjnqcrqa3lmrc3l7jggaa0af7n02oq4eukcduroivltusx89233efrz2cxlyhtac7lhzujbr2m5dilwgv5xjfo7e8zv999sukislmkk8d77strqsmxysf0z2gx3pe6vjfi2kw1cncz0o8r7ho1ohqso3oxmx1dunluj2rassczgmi106m8e2psxtb1s15ezuufnue93luume8956hksczycjj2plci75o5ysvoeh1c79vr',
                fileSchema: '5jsparcrfo525i1h3miegpr8xms0kz8qqc10bdji7bt4ny02r40sizadujgqnqbdb42ohn4tquywq0qa3y5hl1w962ekh7hsp1jiss0l2xpnx6k9cy32m0hwsief0otda9aozp9t3l6ivb6fossm6y0hdd85wwtcp6l4qxh9tb6goahzrc1gvjwuqzcrixvrtoi9wnj4u2ealta98yoqdfrpc8wdme9059diqpop3wcz516g5qnzz4qyhk64dywujdjykzfszpt8o2qi1luvakqr4gkyyod4x54c49lpy9lp1wtofmu5wqio8s6y9zvc1le0psio1dr21qz31dr00xgmp15e5vfastmt3uqvtb9lfo9hqyy3uqckwmfo6m64cnj8qoazibingwcchvv1poip1lur199yydam4egsgjajhstlu2nuzzhxpt80xzrp3vtg07jylm8i0kg4cjdch2yiwbnqhud4l7pomw7abet16xxw9jd8xv82hl2xtbka8xeftiueiy6lt2hm1gvnu9gnh1erwpr591x0h0298tvqd6pn5cys1cbjgb8kt4wexck2k0l52d1yl13r0bd8lwrkdtvyi9varzat815l4e2xdlly7byw8luczxrweij8f0ph9xq7k7yj1g5oikj811qvvf7wgmyi51aqtvky948erdg8ezm3qpzqmah08c83ofp5y3ey2sxbebxg2tcx230v6f783l988g24eb2m1kut21tirejvynbzydqj61da0mmii8qn78atstd6yvhsct8gekcw72o7m3nbd5clxm5d1pm8c5johx30zo4ykp4d7mo36e2qud48ijypz8ixohxkrgydzw4kxvred05w82a8mch17vzc7y9byxk7dzim0323c2tfadbg7ovi922q5may9tmew60jdljw3zlz2gutear7hheu93omb5ochzz576u0z7v8amt4stlwzj4qa9bu8p0n55lnsu048royfu2nh06zm6b2xyv50bkot35s',
                proxyHost: 'q5syvqoqozsexh08yuj5zhbgacrszhle6j47gxc5si4yvk4h4oq02x1f1b8j',
                proxyPort: 9561109399,
                destination: '0hhfo5otkm8m3cdws2yq7ynheelg7um2ekk1d8kby1xrrpp6w24t3a44ujiel8i0lwkch4k2gh38q3uihz0w8xe7fjm9qjticjlvy0tbdk45y2c5pylegjw7tzg8zanlgw3o2vkrxehx7a0h6emokkn6xkxew8sh',
                adapterStatus: null,
                softwareComponentName: 'fjzw3nejqb4ey4emkbdhnkrsfbbnm7myvnmllmab2ssxys09yk5ivb7084ynjn6yjms4sfdgqr8x9xfmudpzj4vq5jqs0g7upg7etzxjzapzk632u8qqtlk5c9ugs5issmfw6ugjvkgjwbepfsaof790q7o4npsp',
                responsibleUserAccountName: '87g5xf6oswyk92a62zvx',
                lastChangeUserAccount: 'bxt7al83jctl239btbff',
                lastChangedAt: '2020-07-29 11:56:20',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: '9djdqbyn3ivo9g9km3cfkcb4pztujtkd7zvmx9k1',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'ie22qmt21qysvrkzsg06r4ckffxysznm7260titheymsiv44w4',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'm2jppi4nryzmlolm5dy0',
                party: 'q23rts7pnoa5tonjcv97cah9j0we0qsdveqnbshewa32emi4itvfk28qjayvurpxxc3lmq9dhpvb3trrh3crc8tbetexp6b7bo9b0nrpkwexworgynsuozdqil7s2zqs9d4q77o6skbjcwl1mci0l5wbox4c0kos',
                component: 'vrbjdpzkdu25bueo16dpmjmbpncw88k4l3m3otb2j70q711fmwf2xv9xloaz3w3k8efysds94c6aymfbdfrfizzzzu4i24wpxx1vn3bcx8y59shv1doc0krlsdbjdpr7ib0ycyxztx4ksmnr0vpwf7bdxgwc1e16',
                name: 'qn933a30bedznysm6lzfbiwy42pun4uxtzpd4zkm9gz0wwd5fo9ottitkx8fa2n0w5ppslued3p91lr63e6ytn47j08xai63rzui3ojdi2tcwk05dcjirzh1p7hrlu465d11mc5zhn3j9joty9xb6yzzh9gjo404',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'bkbl6ns0q0p2qoeq5zc1jvm34qky7kp0fier1pzo9wob5g5asu6bhhggkg6ldo6tdchoznbzh3vqo8shgeqwnbehvw77sxvfmulk2o6ccsizbbk8phx7eltww30dyetbmyxjobxieu6rx2k1xzu607k00h40jy5z',
                flowComponent: '8xf8nj4ryfi2fk26b1p58zwnzpnqksygujb25dkk1hrwo85kqtwu8s56owjxh9oo5ic5zryu0iry92c66cf45al4sejhh9duw43exqevrt9wh950jcur5lko8a4fw5vluzzm8oprqzmnwdlwe3v7hyc3edx5sc8r',
                flowInterfaceName: 'ywsshdcg9mlzqrywjv8pkz0uoddg5ucjh56ul528203sb3gll6aen5sc0lzgqvgvwkzmyw371e5orut0ij47py22yfxz98p0tqshxpmowbrzbx7bhkbwuc9ys24zpa13tk6ilb1zt1yq2qmkaqbbcqb5ehw3aoxa',
                flowInterfaceNamespace: '2rnnrklljik4dyhqtfwjzycdjpnelb46101yompybvns6g6yzhbfpt55kp7th1grmpamlunhstx6ojzqgxjhsm6mhizy39p5imaka40xl01hrt6j95b3yb7e9bbnq7hkhuv8rlelunde2j9ceiacc3rc5xykxa34',
                version: 'omzni3o7j20isieu813c',
                adapterType: 'k9ixi5b6stn926jt4hg2fatu2te2jpxhshl9opqwwgax0lfh0ngby9u4mgj8',
                direction: 'SENDER',
                transportProtocol: 'z3wr2m382m2jgj1mh826nvkfvc9v38wp8psxi51dg8hv85a3oisr7ozehwms',
                messageProtocol: '4gp8dr22ygf9kopcloqv7vflz61nn27t8kxu28ag9vsnezxybz62ja35mpi7',
                adapterEngineName: 'ozop6ksr2wsd86vd92w122qj4rkj5irm3p837ctk8vg5bh7xsqspiw764f3o4926v57ft6f3pnrs2c90zmct7s0z5uh921ov2vvjce2txzj69jjx19mxw8doh02mqzcg6xjpx21xk94w16ubtwlu5jb3jpcuxana',
                url: 'glit3qv1bo8da7bf3dcpnyrvd9kyz0qt5tbdukntda94gdd1f9ucakxr88k96sxbp0c3z4ui2lck4xua2o5ny9d7egyh6pg921jkt6jhcztvs4txu5ky7d9dy5w7cdtt4iz14dxq12z7ukmj1o6i7l5e3y6jlr5569w3k953i1k015f2o1e6ttyxu92h2f5n2qb7f3dmudq9f3vikdn9rch352zrb7h97mob6j974qeqacw7rm80zoml3k32ej4shjj3i33j8xjx0wbj1xwnv9f5juk1mg2ghg7elf59namqkzzqvthqgnes703ojpkk',
                username: 'tc2mgkasi7zsq2f9k8afnka7lsw5vv0bpe19lrbhpw8bodkip9g8ztj4tswr',
                remoteHost: '2akfwjnbjbdvufpw1tyakhj2ad1erwqaqvuu0fjk8coirggwrvj8uak635zovud1w39cddxfbicvyt2lpsngdfl5l8kdl0wybpgjsf59akf55v4bpfmaonwntq0of9zbf4sxacfqtpy8dsowo5s2qbyjhlj8y9jj',
                remotePort: 9502439514,
                directory: '5so2k168n7cs968yjug2612pwcerbbr6p7my0vueo4ddby44emu8qwqwjawpux4gvktw9v280dye661pvb5ao6truyahnee4tz7oirtmtdvm6ksc6u4b5owu01ji90ajtoime6l7sanj0jc5i2iposqq1oerpwjkyvleqvprfc3f9l9lthq800f8l73ep7h65be8i26p79kxhnl9w3wo5dnpk0av23il8kbdk7j7rq5bi7y05aiz5jfjnkyhqlmjr04lc2np9zu9jydvx9xo72qhn8ivp7yq1nih2gah3naufy1ns8sf3fuypt0ujhxvlqb7br9z9kslegj9fwkdpvf0pbvzuovmlvwfompm8pf510ggihcd849j790iyhz47b2dcmaubvbd6huz6qo4caddimxkd32o7nbrisk2dd61zogk1omzkpmli1nwodpe461m21unlrgbpv66znxjc8ueetojxll6lwzx4svkmr5wnqpyx9oeq97x5jkfo68a2hqs3umkish5v9lira9sz2i46dmckiybmoez71snbuy0t36id3mt4vn69wgonzv44wmoprgal2sc7yigpwd77aaeqwfqctz5zqkc22i0vab11h1pojh3j81k9my0ymrpq2jabnty4ukmcmpruet0xvm43jk3rdfgisqd7uba4ipej7u0sxlqm0g0bhuex7xvtnrihu89yt8sed446xtei8kk85o8a6a8jiira6moyq65pc69tjzx3kb3rssfa7wmwgx4dirgv99ldqcur9x38mo4nwiqxobb95a4g7p6oqcns55i4p0dgafliqfinpq92v1r3q7ryf37zlviisay55x5bwb5o60lxzua4w3q0mx43p83bgwkskbespx592plpjx1zvhtalx1okyw3enjn1ttqscfbtcd1olqk7n3btjbrqo9dnltuy08jptdwrylqnshv2brqp5ggjh9vylcm7lx05nc3gzkinc6j9uowiyintd02c36dyv7ljx0xqe5',
                fileSchema: 'eomzipe6lhf8ouhrl23xlmt0dlzmg0z3kdml7f78ms3n9a0ivwjv4scpmmm96jak2m1dewkqp44nfxrzoxd6j7oljk7fufr85hrqcl5p3iuszmhoal0dlv2ydodsyc14gnm07sa0nep5kme42zd58zc2owm4vkd2847rnkktrnccegfx2ehhn3dru2kt9g6dt5wz05fu70djc2t75v9qj3jdxh26iqsgoojva3p7fgdot2map7qg1nurbs6ks5rmjqu19582ij2ohhr0nhx44rh44unj4746iad1vsksrfgpgniqdvrwupwf9kmte7v6r3cma7x1h8a3ik5nmu0r2pt5ryz0zwv80qjg0c5rdvsttb630b7h8x8skz51795iwu89cnlh6pz4fc0hjk06yfpfey3ekx5hrkygdvp039ujnwm3fl97y792712mxzz9nwqic4qu7989h2a224udr7v9w4dmt91kfajmq45ax5s0xowt2sm8mw1z2grc2ep3q4l3ti5wrmpgub1996rydib3bfy4l02imfer2ghk72k9u7liuu05xcetaculyk2xs134mdspeqphjo11nzb1jpznu5jz13wx3qptor9etjrbwfo2nto67632pk11w98sh93ckix7j9ie9p1nczmt3sxdv9jd2n07xaqljhktmj825k6torr3xzsy4h1fno7brcgyvos8kbk12tb6d5aovrq19jdk4vbnmdmn8us9ayouir3v0eurnw8o9pimq1m51vyiugnff1e5l8zk51zzvbi7e8sv7dkgbhdqnkxsxcwycohdnnle6jd6q5xns0hwtyqju1630wy89llb7tt4jxedjpfwum46b89e1luv4f6f7teoav4fsv3lxy0ozxfiyvesgmkylz9w58y2fiodrdzwh7e7juhb57n2713rqaodmlkny10po3cczpppkz4ku7r2pkxl2aynojn779xke22ogc801dug5itfgjd7ieeucak4b7cquknw52n00gmv',
                proxyHost: '9dtk0n271kx6se4fsznbe8lutcg763kgpztq3gzd9m60sjf2c8vn5nlxeuyd',
                proxyPort: 9632170147,
                destination: 'ccu3lkdyqpg9nt5lmab4zko2uwc4urfctx35z2bvwjeadjx6mjt92ni6shji7osqo5sdvdby8u7344u7tv0nd9zagrv1lljfmjesngs1i5pyoin751btk1gtik7n6efa3ptnchyiur89skx77ndaksu0gikabs2c',
                
                softwareComponentName: 'efrevh2ar24qcr7fubbx1z1ajbqffmbhrosx3bb4tctxbodb79ky8xggu9i9kesrux94c8137dekih94zp7za02tkyjl3q6091rlnnrk0qcqb74siwe1q3ha6pltbsgrniroevurzqc5oqjfmyyttupjg5e3gydd',
                responsibleUserAccountName: 'bn6yzs09pbq058v1ahq7',
                lastChangeUserAccount: '78wqsq38boog73dppfh0',
                lastChangedAt: '2020-07-29 08:10:59',
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
                id: 'bw1glyhq34p88gq2zvo1xr1ud2qnzy22hcc0i',
                hash: 'nwkwv9flb4dea7h9alicesfp0sbsq4v2xf16ss31',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: '55y4nuntf59thwaum8lda3b49ihxu3mxtjbdhh5cl01ek676cm',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: '6eae5d5cxhdvqnoplbsn',
                party: 'q7ecjc1297trs1k2hu0vxt9ebp7p2mzyktjli7j9wu8e0k9kiaiphmv8wfot8cjlyb0v1266yaclbuxpkzifa36ptvnveqadh4kpjpwabat569mv14zol9cei3liqnywyr99hzawbgp94ar911r6xb7l7n4vxbpo',
                component: 'pk6bulavv332dqx0c57r2bbf6egnjd8f7f4vu5hrx32p69tc8y2r18ed0fhgkye8f1zdeunvbgxse85fh0wmvn3w7j4p4n517eoxla7pihur4zx2i4m866zwuh7y8z2u2yzy27uhhtghzzvjr515p8zqk5lsr27x',
                name: 'zpxibdm2sapx0nkdty9ouogbcj9j1dutbb4sr36u8b092zz2nj5tifazyz4w27rvegln7ubmkaoek5qcqoao6y1d9ve4ul4jg34a6wn4vgc65d19dr6eia9jndqblwa2mibdm75hw4g1ktbpgmymfo848w1ruq5q',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: '1o9chc9tmv67jh5t2kcavtd8l99hn3l5x6i3ub2zv6cdf1u4cxkkhth1vq0fhyzfoangy66akkbripe3ee2o0o67esu3kat6oinsvk8uqw0m79tvme368ax3vounu9k21jn4kq0tsj29yotkvzfeddt4kz5i8j69',
                flowComponent: 'mhiwiq2ouqgxf1rqk3fxouei47jj6h52ruqw4ngydhqez5h163vbuykyqh8ifyiyclsi44jalm2koo38921abjh22zzmrtp75emxetumk37ae7x5xef9mg3kgimiwax0khjhwmxibll72b27dmz7sn021c41z61f',
                flowInterfaceName: 'hg3dlm998qxbegbwsv3ut51e4z6u0dow13uvtvr6344of16eksyl495t5m053m17l7deggh33n0y1rcthptuo0ijr878lcvu9rquwfrpqwij5mfe0m7yl2vgldlfu1gf1izzk3xzj9cw0k1ssi43drarrojcesmb',
                flowInterfaceNamespace: '4jj0445bwtnllws0wws8ag34pvfw56pd0zbug54wwvtfr6ww723hj1c1pfkfbbtf96gfmbrf6nyph0bn50w0eagrlfquetzawgrvxfqks42oj5i6ix2dffaknvqnfwyogohxklphkdkh299kmh5b83pdhcfv1k4q',
                version: '85p3flf7ufy6xgz5zckl',
                adapterType: 'r2mgo4ca0i2obcy8xx4f8txd48lsx1ff32rdoop2yd0ptkwd4rofkmasgami',
                direction: 'SENDER',
                transportProtocol: 'ghd0f8b6xftj2vrd0fxt6u6abwge3l0bd8fug60brnahvuf0hhynaxx7897z',
                messageProtocol: 'dq04qrwpi7ie9dawsg1olni0xn4st0xr8an1x4fqbw6rjldma26co7stuqv9',
                adapterEngineName: 'cb8euu2ad6c8t46dfq3jnq3frri29sae4iyphupnsjz6nd7bj5fqjhtszu23ornes9602zghx5vdelbkqv353rkrxs8w1gbrxs09b4il9g7ix8hcheeeb9bshevsl4cqfwqdctlk5xy0hvlujva4jq7ib9nf5ti6',
                url: 'q1g75rcpx1qalhyn3n5r9ulfb32d0u0uchdxoiizhes2uv444dbkrvrvsd2cgng38ju3r1m4tlo65w71q500haufmfnspnxum8oz6f10czf289te1r8sxr15xz77m7ijibx2pxurc9l28lblmyt3fpanytij17jzipdcc6gsm6g6q3bbbhqagsvhobzzfpld6d3uel9kd7ww4mxvqp1fdsoexhto7zlm35lcqgp15upcyw9mhvriz8vyj1rbc21bxs6tafd6t0rp2zz1negsqomdlr5e7nrra0v82sncpb17i1tl03dfrlewfkjthnkg',
                username: 'i8w1pz1e07ns1bfx3n2656f0jdz79tvwkzd7kkamzm7loplfa3offt9vgu0m',
                remoteHost: 'rdjmk3bsbn7y2i9oiahz65ielu7kqrucnd9bd998fh5zsgdlqqq9hrmhu0e5r8no4cyg3yila4s8nuaivc0apc055prqe6w47w1pgcw17n05yy73huf69nqc3r0ba22tgtchz3mpcwu16f5wv0gb23re79i6toj6',
                remotePort: 6029935339,
                directory: 'pebdpaltd3cix3awbe5kxsnvqani1vbakscjo4ypz2y3clq24mu00cnbt95nefkfx4pzgpqstibiak6waj393yiahrdzedud70bm6y8jofmt78207ag8g7dx16mb59joguxn43452q5c1r2qd7bh5gmkny5e93dnr2qmg8hfbojv1ipardvmqq8b04qoxpsjsmkzpi6kt21twkdp2iukpuey28qwm7apztld5amdrjti169qf9gy7w759n664ee67ro4u5q3aqv6h99gfojebixc8048naackx8c8w64r4bf0vfvqjqyc6m9bk1yy339ifkfpvu6dajf9idn1c6axo2z8jzfsdfypvw2k379eobdiw66n9o0s2dygg0iazjkw6yy3ikhi4uzl22r3ix1aig7obyt1gsf37hdo6l4jkh39srzm6tx9anlh2nr2mweuamqtnvhzxtn9d2imi2ut1jdrcld4zpau05qt95iobcx0qj3m5j5jgtdvy7skid7b8uw3rm2g5uvsnw3c6rwdfip7c54ntktkti9z5hmbx1z52gcs836enwzf3bdvvr0yiu16utfxpnps97z7voyx8ubo9wrpm0xzc7xcxy5ip2tu3s9ur347s9vw3la243tpfz9fpgfa8g8g8g38i007umvhvbaz9dr8xbtpc0tjfvwfdsogmnd6nn9950c2ch5hpj6l4q1rjb7a5lcr27l08a1iiyonp87av6kk231b2n4s2147a79yefhu7irx01dfoq6iglx5nc4zheh9nih3db2hkj8yb3gs9lm3v8a95xoep8gfnkykfp6l4udue4g0z491oh54f9t9y5vof01y92vwyp5sg6adp82tsfy9g897c7nchwzqcroqqhdjoabmh96inqqjpllmqri0hbi644ki8wbvv5b4xgav5n3r2w3m06cfix63ah74du1ne118o8aq6twatob4e9pc6me0rsag272z0qub7bui1w3fsg2zffh2g2h295be6x3wseh',
                fileSchema: 'l506tpmj21wsa9cn0sbnn2wi0d6fvcgja1z0879sfc9rdtkj1njz8yor0umj65ahav5o7rjponz2xdbi6vzxlv8w7b54cdct7av4rkffulia0rww38003lkff959xi61yhfocwyrqq8v41zfxqbaeqxiiygnd5vgjs4581quy67j6lpezz9dymw5i0ls14jbpgtrplt3n2xhdf9jndjvwpmmbklrj9apznqhg56f7ofv0w9jhg4p3477z3dm0e2sf75e5b41r0h8p1ut5q2zdxpvzo1h1ncir7rfyw7b7bw4c01pkm9nxbj1pizb7uf94whzoaoyl5nd7mddyycmd4v58a9u2cpkh5hmu66lzcuopxqfwlnl2d9i8s7xk6jn6di9dmvf58x63d05phopskv1mbl3kvgqom8teevkftmpmz82eke0y8072vrucjuqgy2bvtqoic8qu20i73chnxbtwwzvt0fc99o3e64tk5q0esn405b4qlf5vz1dcllq6ydl9v3scfr0m29jkhsarctinhtqsar5afdwmu29s4f465yfzrh4e8kg0waprlfz0srtl4pxxfq6rce0cd0pxcb6w6xnmzlx78uzpsm13njdsi63vsp4fhqylsr3e9v778sf6865ac3ozjrk0mo1f2yi3bgaukse39b782l6dggl220y9y6gbdf8z4sphamwa23x9mj2e61hlh1dkjj7wtkllw7i1bqj58wrytn3g3r5vvy2tsesdw7t0ulii6a6tt1mb4gos1yjk2f4posg3jfwqdbudwf45g2hmrss431nqgsdyme7kdf02qdy41kpgz96l8i638793jsz2t0lpr61zb7rzhb09zi5hcnl2e68k2sq2t6lwdrj2uux27qbzwb38zr0qcxn532mf903fl1jqmomum4q9rnfkqusucsg5rmsze9u8wkg5tsixgpz4yatiqj9ags7c86omlgv4gess5ll6wwg4pkqml59vhqz2b3s10zvqejuqklgf68i',
                proxyHost: '1u1xkvp8cz7xcjfsodn3hwdbhv4xh9asu5krw6r4hef65gi5k4udf72jhlhz',
                proxyPort: 2852878422,
                destination: '3md4uugsaxhz6z3mct706dy6lm100c2pnjdr0v2bjn83m8uaforrcef2pt36t1525ehe1csh0aei45le5rwmy5vcf8xvyfcmv8xmolzvizzxnoiu4i6o8w42pf2kla0s5ds1iq6vl2u63h1jn0wnzhp3vdhr2cbm',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'l8nvor3s90hc80wrs4skul014x22cp917m7mpo60z527sbphhx66zl49milinqiquj4mivprjnt8qrkjbjus96oxxg06c9scuyx6l9b5bvvbosroevroiyvmnds2alc919pc7w64u6w5onn8lntk1k8j5a75kyl7',
                responsibleUserAccountName: 'ryn5o33ddpwd64yxbq7c',
                lastChangeUserAccount: 'jhg69xh5g1t45e8gl6lf',
                lastChangedAt: '2020-07-29 07:10:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'eu5oz80defxmx5bppbh9dsyswik2a7hftkmm9o7r4',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: '3h5i2rp1ow1m4mls4pg5roi4t6u2rvmaifquc0jtazybk7nrpo',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: '5ic5qt9jd8a7v1097wea',
                party: '29b4uax1xkd0txkr5q41f8qhss9dintfzyzqxw5ucbluhpdqntawbs8c5jqxtio1nrtiizlyal5npy3qcurgpmw1731vd688b1ng8ls13lok7p04v9k8612cwac0w72mzqsp5ydhxu3h3n24c0zeq3sso62iglqa',
                component: 'dd2x1en60sx2vzirasiar6t1hxumscpljfp843g3onar97lz1e6r0cu7t69k9orr3ri2m7vx0n0vba7u3acai7331g79w25jejwm0qj9ahqxa7n492ozhwybe08cs2x058cm01a55axornh0q3p495gut83k67gz',
                name: '334la61ddt8cx8wki0208zemb8pnnzrg8dvh3ehb4vt185xi8eng0vj8d8x6otwrdk58k0cfliqg8p47w68rfkjt67v33vnoj3ph1eb9pjkdazdpng6rlvd7eequu3iryvitkkn8ekbgq643f3r1buyembdkh06c',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'lpr6l2gvtwjsg4zxume3gx6tfqpwc44l1a5ppp0lh360dcz2yicdsqvj64v0yge3928mundhoi1uq3xopyxsqs055uk8l6ixw7rc27lr5skdd4ac5uhufrfikk5whexgisabiped6n4vfyntmrccke6s4h24srad',
                flowComponent: 'dddg6aysccifpf07jjnlwlmodeopctp505k9e46kupfs8ugmsgm6aktphrccxybwaz564bbsgqe44c4uzqm4zofa97h0elbi8j5xhyx3dpqzttvw56d3in98d9qlzf70sul239f900ot1bonire5hl77iwbp8193',
                flowInterfaceName: 'z40nuaybjvcei5l4oizs6cl3xowo7xtge5us4iyttd0zx3kvzhk590asq1plv03wg64ck35ce634lfkc3jqvrwre43t2ekwhil9nepaezbmgc2ocsmo6j35cbcyf2qfg3tae03pie00w2r9gyiejct0cfyvuiaok',
                flowInterfaceNamespace: 'm9ce8wi8cv7ox6fsmc6l1rcphi0vdlu1ktgamwwd3tqq6b5k3j544d3e9syfphlpg285a98q049xemxlaom6yuo8i2o9aw0zh7u6v796hr6s2cjgvhbq68se47dj96qj9jvywl7x4b6tw53k4qqnkw51jvkcdbk6',
                version: 'bh30epxo0ueddx8549rr',
                adapterType: 'sfhjng2a1f1cvii9pvpr6elop8q2uo8tu1zucw7oqnthcxz49v979w3v9kct',
                direction: 'RECEIVER',
                transportProtocol: 'nmzcrfpioy2a3xyls08qyzq6sa03lkthktliqwk140bjqp97lbeebj7ngpom',
                messageProtocol: 'gtqoqtuecbtfbq4t27y3q9qrf8m0rqsykfytz3y8ky9g22sg8yvahwjsoquw',
                adapterEngineName: 'lab6wy5hfi1vmpjiskkqbp8e4tcf5sb2qdqzhjluzuz1m55y371izw1y3fo6yvtpqv2skhet2gvvr0jve4f47p1c42lcujeck070gx8bng5x3cjzvfdfann1k49430yq5v0f1iatl87pm8cvv2nx0pwduqfay0i1',
                url: 'vntkiaw840f6c1tvbv0xss3gnolkv0b3qr33cg84gm1d78y331z131eas1iblm9h01a695q103ytclg0x6lp1xznm7x8b592xgvaapwvgzqni6wmw8wuhzhydux9rq7jb1h1exw2dcl9jyov6w3sr4aelo8do091mzn4b5ans8zqkiluazeup0jhgzauq2y3yov4pr9jzue2vuqfd5uuj3e1kft0rlm49a5yonm1jzieoe4htix9dh8am7q878a007oj7pg1a9weysm8ikrwu7lzp0mismq0uh6nns9cda9dlnryjcni5pxw0pz023hl',
                username: 'fmzst6x0uibq0j6o5frqwdj6raul3xr4ipcjx6jm263bgahimj3ydkxcab7l',
                remoteHost: 'lgaxgjx6eiztwlcfz1qhtnj4o7kwazxdazkw0fzdlx7nwb4jki9pl1zcfalw7tmt66q8xvdytwdr7b4chsq4oa8yla2vfref2hswax780gcrcalkv7rnk7osnt72plnjfqh5ke7c3xelwpc4dritrbrfix58nwd8',
                remotePort: 7034771584,
                directory: '0w1nsie33pfczkmig4ohw5nlv43agglfrlh9xc51e6yrjhxwpffv5g890ab2oal8gxeldbowmn3t8cm32mu4s03069t6kbdi67antxvtz95oe66a6hxrbh5oxpz1n1stjniafbp6olsc62q3csm9t5nvkuicuyadzttn0a9ibwgwmktctqvaevmc7n658u73o6i2bi5lqplngcckqshgfocmcey80offc60zpfii7lfvmyv877p4s6fwst2qego9mezvp2kxyyx88us2qenem4pa9mro9efachaf53drqwpleczbmtuy8oeltnu1saypa4f0vhb6gd8xqda3ia6r2u3ftzbogle6wnd3ap01jwp2k2afei85ercsi5qhnoml6wcdp9940lrxf9jumvrq4a2e8juh4lkjpf43nvujdfntj088ey6gav6aiw2myjel481bhr8kmsrk503d2qe0y4qk4iqm28brnwv8690d3rcj3fihv1qaj5d5sby8avi4j5o0783zm7m89dpzg14mzhv2p2d1cqiyxt6eojpv52feuz89wnuj942cij6uacbmwk4w6oojt149kngb194fow5l0aj7bwdikp9vsllsp66dx87w6g2u7wehg56bjqa7bh7c3s0jyt31eqnckp2t4ncraou0ee0d7hgkjo076wqam9obbaagnks3677f7ypfamyzojabc9vpbkifl3jgl8xumwratvddnmrp8qh0a8k1o23ch3w0wubc6obvelxq4s6tp2i0phjf5uhrjo0ejs8ft18sv6ilq5o6adxvw5bar96ph8d03mb8lnfxgpt7bvmk34ygu6v02p49n0avj1y7cy48lxopsv4dz4qpwfsh0lyp6js5g1f90e7x4bvb3skg5ap27xjfrbgcleaxa5cpw76sj6p1rp7z0a2yxjkdi0unol1avdfuhydt14g2pmvdtnyu6ulx7wjekanxtcl329qbsm7pesnbx7to1ilrccnj58fz8bg17oavzmgr',
                fileSchema: 'f6qlm4gjza5brlkoevb4gwuw65pr5iypz8zx1rhm5feqrrop5xhqz9z1ah447kfw4z3xnl6vzd627520t0hu4926ab4o8ahog1yt3gorg60h8ikm1bk7tkny090y1k8h5gubbnxvhltmad3aa0iiyzy9954o49b187j5cvagnyaif9klmkzk27crgdix3wwksga2wmzhkd3ofg3239zxt1yz2xv9d2oktopd4ia6gbmonm9n7dr02w1h84plj75iflanuseiyezqfklbq3t1pfljjxjh54zra0ryjijd67kyvo03a4d0c407b6lnu6l6ikv7gxxetkqjr1hns1myitcvj6x9tgeqogeb785yn9wr33du0bz13fyp4g72znkeuh6rojg3epqlkixpm3hxktz8nz5k0oixbrlys49zyaf6njwmdu7w1rwav6mjg4io8o11rkfknomnh2dxkg16msl0slhy84ckdfajug6l3recbmyfevinrzmfcdxhukxu7yfhiaxnxiqz91fpx9tog5efzoe4dz0ev34cgw9uh3vit1szdjlhztbo0jii5tdwqvgp3nc8o3wxnsrgnhe7b4avhj84s8nm6wcjrq2ok24f0jm73za6awctic7seyt1qkhv6jygjqrwlj9r6b8u3a2oftkymtq12a7s6ltaicw9mjtxyz0p94r7evpn43ks6alqz9j2etroho3ljz5pfvs4f4m9dt9fdxqc4inysyt2iu2egx3vmkpznxo0uzfckgqsck0yv75zej5sa9vleg16wvwuzrk61dr2vg6w8i6f3ifk9s8ctgazh1d6carbmhd08gsvlvcv8hvp8d0mcpr00pm09epps763s4a3ttt7wjijvw41p8f068q9q310rk02zzg3e0x7s7zjl7qdmxq77lfo2cejndfjpmhc8l2cngmwfimit8uo52wrqx3t5hxzojn65y4sclewpc58lqgy52vzivkb08193nats5wic5i6wzgaurpapg6nt8hp',
                proxyHost: 'aq3vt0wilprqujq8x5dv5tri8e4xoa5i0r6soy5zm3wdeq5a2qydvyjsg8ep',
                proxyPort: 5065405230,
                destination: '80iypzb9zl18qrp867ha971ijexz8w21hbfd4nck7vea07z3lt3eo9290al21w7svr0pflg76xdr4v3vow4wn4osxeuavx6oj6rvj4uutqxt53gecec70rc0yr3swaw8spqvym2wcpjslrks0geqb5ti7es1mx1d',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'x0posogxqte4906ipafgpw1ypzxqqqpj06nglulrfeqejjks0n74m2mnar3i93lrpusxvwmff0z62knnxqldu7c6apvjqq590x7ic2stzc1xf6u7o5g3ppo5bk80ll2nkjzwnzghz2pktvlqoey7zk21oiixk9hj',
                responsibleUserAccountName: 'r9mgezm7vbzp2amr7m12',
                lastChangeUserAccount: 'j2gqxs91dyuxjz3qnzg5',
                lastChangedAt: '2020-07-28 13:41:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash is not allowed, must be a length of 40');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: '3i8gqnf5fi13ty71rv0hh19htbkpkbjrzdhnqvb1',
                tenantId: 'cuv029bpa43bcodvc74ep23y1ywt9e7ahwqcr',
                tenantCode: 'ihdkuzwvl3sk37e58u4lebgx2hrm06of12jg6zm14la5wgurw8',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'd7x5dfn7lefsfo3969qb',
                party: '4wylfk4tjbnmebe2emwdmc7k6t59yap4yjglq6yaaqdqpx9spzejf8sgvj2063h2aw5y70cmc7gizjv5am0rzhp0r98sb2fmszv0jmekw4r3190log6efrzw3cw91p76xpi77yagxpw01378qxz6mhshpmcl36kw',
                component: 'bek1dhjqng2ndyl7t6xgqhhygo9y10aikbsy6b5kna3phtuv1nuzjjolkhs809jk8h3v4op0srmsh3ot1f418d3fkvy5j3yi56hzkqlv1dp3nwi8wntz5r0crg4qmtqysrtj5xz3gf9uybuw91ar53zkky3nhiwe',
                name: 'tvwv663y728m548wnrrh2jipdsi9vfj6ejl59nyig14vgdh89mqgrei1p3mkm8f9c298246iijzoj3j5q41xs24vybazddi7uabcsqn265ex2mwrce2ifvc5ww9yurw0pqd643jab5idakh9p30brfndcgtcpwa9',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'vm0otuljilap54096z75mjzvpacsg5xoo7uqcmivai3id5ooy7htmwodsn6gs505grkm13p2n2guf532oelufeddlih5d3lmexk47lljktpz5fkyjgw5wcrujgiy06b0c8qmjyaus832rs430pdobcn5ksk2183z',
                flowComponent: 'xxbmqusazxf102aoso7gm6bgjixwijxv8rsg574m5ee54qilu9o53viz0itg7xkb9u24un1381yt0gql5uny9t4516syrxfqpugkr8xob7ixoz5es0lq6y7jluu11oo4ns32xebg5lxif6d0ypd9sf1d2p42ecy6',
                flowInterfaceName: '9614wocvhoj23lbg7htg4ot3iamnnpeyw7e09ywrfdot3gzpdbp12p08xzvwniuldd3za027051zaa1phg6y2xx5d6et24l82c200oywkefonyihzj7qepsv58758aaayy1upkfztut0nsldlouj4t5f1xoap0s5',
                flowInterfaceNamespace: 'l1bfvasngapjrf99vmzmpdv99zugg4n2xx7b9ahrga9ymjtcozg6mjpu3eqps7gtmwmpzut03kfc9wr0gxs4egf4pj8mviayezkrknmgjwebafgl569l6vxn1qsp2o7e807fd9gbiia4f84hmrnrzh7clzf35s51',
                version: '7zvl6czk1l8of7xelssn',
                adapterType: 's0o4lc9qzbmgf67prkqh9fpt5qssjy8uxm63a0z7nnis4ljs8d02hftg8j33',
                direction: 'RECEIVER',
                transportProtocol: '7yzdqhbp7kjyk628zctz8p8gy2zlebj2phgxbwpvf4h6nrvtiiekqbipx75w',
                messageProtocol: 'n0gsn99k6yu2h5o3x9ra0g665eh1wzfzdewh1aoqf56t5pd8iuto6oe8mqgj',
                adapterEngineName: 'eene6fsic5ijlw2sqfsom68dei1uh9q3by7p6bg5qrnw70irv04ec61ry6f8kgk94xhqx5ur54hm3axh3md1sltxrpu7z71fkx5c0nw5h1pmr7j1kbsinw863j9o8gezl7ienbz7xqjfdgeotlclbnh89rjej1o7',
                url: '05b4e9aicpkusnzxzhoah0mwjy8qveph7zyuvj6efc40h9075i6qm277k00obkkyv65xi1ftr9p38ef8ex3krhqer27asx4auyamb1j7vvvgz7v3eojr4pkop1wzu36ijve79l2lsre9s1ia6mxr43cinw8dj3qr2ecsnlg5v76rl11qj7fyp0y24f9imweoszh1rapnou38l6pandhtwlmcm7bkd8e71kg0miz4qpl8d74q4dkmm5xan4jzp0b7sv391o9966cj90bukdrr3dmfakl0l5kcw6711nrf32rip06iwmf7ceugufii54o9',
                username: 'rggqokjy70ux4i3u2md5v703rx7xv53nflufg9bn9b0vfjtf5j57rrxevl8p',
                remoteHost: 'ta3tvooln42zfpzcpg4vifwsjfowomrxpfez4gy8kbjwhj6khalga3dpitk4id1qm7d9x7dojfsltcxqmwvtrifoubpk3cxyfp1vs94ne3jf8twsyiapsd1iji80qtbxpifh4tlfg8ak5siu61wz808slu3goi50',
                remotePort: 3329177064,
                directory: 'kwnr6839fmh8njpgxheh2ay99cj3dicpzqisfznw9m4101ttvic2or709u3x84hq45m9o3wmlr0r864028d2rhc7x2ik9x4r2rpbtxx6ztwfdnxh852vw5hu63xno30r937pngp8n8u3xdhdcurqfdk9yvxvokdesnoscude5xuq6gb201r9wr3k9z9936nh1kycgzskchkaduqdp6274kyku156bqkga0ebw1samr2mo3a2oxic09czfdpt6ldfyg17sa3vdj7x9abzf7sweum14u2qc7wp6yqhrntpng3lalefdw58lh5qhebtk8b47bkhehbks44gdvdcxbwx3emvgfd2sb3jb9mowypuynhtjkzg1bm0b6w7my9jhom4y8m93mxs0x70mjd1pxxniy4twwrasmvjmq8cai2orlvija3a2rlcnrhuogfel6dkxn4wcplast6ilhn49r8ap0qnbhcwx6tlkkibmj00b19dxceczqvgq9j3kub4not3k00czh41g1fgq23xwqut8sanvcztmi8oqw2msnvmaw3qc5qrl0dapcenjyhvwrzqpnsk03ylfsi44l1ilshv14btttybhbdt9vi61j38e72prd545k1gheaz051x3ltefrssbbodck9u277kp609ue61jbzfazjn7b8mw09s4g0tpf45kz7tfuamfkbeq237ufcikkrcp069gjdicmv89wtpo33sc9s2pjmb0raodlt6c9kr75n3j4vrb9ffab0aycv9cbugbrwax088e2v44g4g7tl48f27eax5ob6ly25nue593qhtrs13nn25uw7asok1fbdpxauh8hp9dfbvbakpkd6spebb1lr9ykn4uiupbzshqbqucsz79nwqbltiiihmcadghztsgy2kvgzejl2jd0d2q382f44wdr005fs37qro9xq8i8px5es2p7mi0sacxwusw2wm6f9vnlgwojerbjbk52evvqr9kq972j59f9oar72wd46jw2xa1b8f',
                fileSchema: 'ure1csxkyo1z60ae49hv60mbhwm1jw9fc4wx52gdzsxq2qnffxq8y09hnchkgwbldm6wx64zkaq7br9c5rpuekv98oc8ggnye5sc60foahe0tiia5bw62kveh2ks7b09ic1pkhdytsm5iglv7kfbnde771rt7j7658qzudatm4adf2awfnhzom8f1mpnfz2dw4h9rribafwje4fsl1r4le2j3ghufbw2frf0eiwwahg6c4k75f23eni4c3to1zctt620tpqpjmrf8dcslt2qozvgqtezer8xfj80fwdk0z5yjje3feu9ge2b45o7ypgxzk2sx6xnrfropy4xoz69wjzedmcislwv8gp9fk213sz1mtv5hl7aop0d71hajn569sbnixwd6cq0bfiv7xfsq7jr8awos7uxsvqkvao8biqwwezwkomj7s2rr89iqmj41p0hkdiaznmd58fbh4t9brqsprti7amy6umh8sltohz4zmhkgw944x76i0h4zwlttpp2o45xtbg279z78r9zcm3fsbfnm022hzet148fbjm3nu3jwaudfwtvdgvnpvjusl4vbo2bu6eetl42a5h9444exi3jhnw5mgco22r3sidghlfrsxytnsd21iihhqv5b1ltbrcn2yb4038l1pk4c7s5e83h7y8tgypdzunarnzmsa266q9tb4ykm5n6typ6bgwop3q1z70866vuub8t291i93z5p7z3knqtxmx6ywzh7fdjk348wtrsg2x0xmo5xco7r8esogxsefvtq60witqbufm90qib7j3a7ry4uln5ct9801srtgzhgzg73tgt6g6jlnauvq860uufkvnnawamnawm4ffu9j4q0e12zfljweaqp7uepaiy8r0bod427j1q8qqopxi0x67of8rkdrg56e12hbzn8vd46pwcazl37a0irmj62h0wmul0kiejoigydk3rnqawq64g57vlgm7i30wvqsj8wm2piglr9wqejt00fu7tja4b0p3xk11g',
                proxyHost: 'gnnapxlx443gywbetuvfbzn4a58j65m0x4kmwekzzo1jnl1xehpstpz84kzj',
                proxyPort: 1697155258,
                destination: '10hvxo2fcv1guqaf8sh023gz842cyvm2fas2x37r1fhzu6wrw5y79xrbttzedu74emddj4ur78yvyt3zgkmrl60fvh6dx4m6sbwsb21zlkzgdkkg0k22jzirh21tuizrno2euz8z0imk25zjz0kwrt9syjvw2ki5',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'll5och5d19a39sghf9a7bx2eklfrcfmmghzyv3cchly62unv8vjgmr4udog9tky6n73pf65ocz7gahazrqbik3wkm8ebeb8fjzzn0h15obg95ykh9oix07mzxm0to82j8391ifygyotvw641s8sdmskc4kviq53n',
                responsibleUserAccountName: '1dlvns7rauc86acf64mr',
                lastChangeUserAccount: 'c8p2uzbu6h6iqejvo3r3',
                lastChangedAt: '2020-07-29 11:24:16',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: '61nfbivd7cq7sa9iwh4qgupt42ucgfv81b1xqzd9',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'hzia1h9bwzom4ss8pdzpzzvfxew3gsxak309fzjmn3ke4nap9w',
                systemId: 'ne6euynbmoach5ffz8uv5cm9k670fxv6ves1b',
                systemName: 'r0j7urq9t6knxskgfd30',
                party: 'z7irhz3r6othm50pb16ac0c1otwlwj4ueizutc9llyxh9bck6ipwo1a45j32swolp6wdly731jp8xidzlo7f29f44oog8p1uhn4tzgmm50w43lo47gospgme64qn7w7539exymara9qkhhya1knxsonlfqrdwflm',
                component: '4a2cwlnw8a82wx81dzjz3ko7cjvmyioujmq2p68r5qzt4rwgfl98ryxvsgx3bj1uqclihrteeuc687cieqzmivsgl63iajlb8me3nu845rzixc03d2xvnsv4ddt9rwzyhaxl828j6w9k6hpyzkgrfiwzoa21317l',
                name: 'ftdg367il5uazpvahn8xnv1vgi55ze0amctunwkbe3vz39c5qup4w7mvadcds5pifpx1bwvr2brqaby43f66en93nshkba6uyjzpi3vm0heq42ex44k17qrrfx8yzmikmym5mydebgvw5csma6pgt5of0ma02vs6',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'bqhaqz8l3dh9e8d4ickn8tx4qekhyt7d03i6fe0wihk7m53nvpc0kvrnuwdmk36oj4yk9pws81egby2hr6n7znjtx5aeu354nh4xvod1f29y9p9evyayz03pf9ybdnznev5upj9cdmt3hr6sda29ytpwopro1zde',
                flowComponent: 'v25aryzqaqaqeag9p5ho7964t5wff9d92dopaubejn0dygpnraq92aglivn40sho9x8ud3yp2jms7qvgeazeyawrduv8td24t1xd6j90lt98oa5j31snesxqrwiitgk2kd3g01m2nthakp96li518bavfzf0rgit',
                flowInterfaceName: 'alqf1al47qybwdonfskrixg7rx3hynsixut4yz6hhoqfnfljfldi8s5i5e5jp5wlt5arw75fefmi2dryonfwgklwuhyvg6wnxgxii96h81tj434sr5vbsy4ohkd0zfdis5olo6u346qgxqhkaq58gc7vfcrgiygz',
                flowInterfaceNamespace: 'dpjk4o3ewdyuo6r9rulg14ijpfkmp5c1y6tr3ovj63h8a4ykwxp4oz92v75kf5dip3yqlhcdluv6t6prcjyavdzhypo69tu0mtqkg5qvmwdiupbfjgmmfcpjr83r99id8rngljnnkgm6dawuxhf46lcqwkxi1kf5',
                version: 'b8vhxunvn63zpixy9zqu',
                adapterType: 'fq0h094y9h92x0343lwqrld97aplsxv77qs3mhms76ez4re8pnoxxcffdkqb',
                direction: 'RECEIVER',
                transportProtocol: '8iwr39c9nkz4bapdb57kglone3ykiqhm4l3esx64pwepclccnst3sbwfmp29',
                messageProtocol: 'hyevlbojixxsudtuu12d14vc1onxy47dz9k61vh6h0c98soias5kbp0frhlm',
                adapterEngineName: 'tycevmsp2ejyjjvo5f2iq9ef5qu877r0ftkla7xpzw7dykgve4w772d8kys8ab9vcn6qvroepbhqyc3t3tdresns2q5y1yrvuuoh8qtqnd3vl8lllrt5492kyavstopypg28wx6gsv6tx0wwc3thi7g7qwt9riki',
                url: 'q7jq14wvnys58zz8qdf5x807p1xqiq6mzxgqj6i24snklzosl9rhx5zzt2c7gztlb0dxuxntkxi6gg8gwjj2pyw646ogcykwaq4rreiauiz7k2fn7frw3kyhllmwayy4qa34osm1kuoh98menzdv1jijmoev7esyhj5654hdf463mv1uqsmyvm62yr6lzc679h9f2oveinj5wl4rjigozafq85a0xm1setm2i20s3e4pblejbnybgy9v2inprn18qiqvu5viz2kh0dv4sgf6t6xipugxcpzc7506ifjuz2ztxers9tapbailgabmvi4o',
                username: '822mw1t6xqstunftj56aki4f09me3k1wpmos3ryi7f0lq0snnsvwh846oljp',
                remoteHost: 'qfu2dxz5o1s39s2vo1vubwm3f7wvkwb4pori2wctpu769l4e481u3am7t741wojx32xliex61wxagz1w6acn1ebmj8pz9nmd25nijgdjc23dqpvgca3ezwatyfs2u5v4zk5gj3lvlkylfb4iv7izmvhauw58nt49',
                remotePort: 3512853475,
                directory: 'wnq7g0dednr6a7zajj4ym0gpjmxcf3pplhsismqptyjbic5kj7w7u15obuxbh9a0kdat6fukncrcffjmfuli1fin86ddyxwgwu4my87jprdpyp4uptirx018810hmp64o7isvzjfu543dybrrmp1igxwy8a4n2htbu5grsq9e7i26v8rr0jhvcoelq71hf5e4gk9kiah79soqn5f2pol0ly62jrbbkt99w0ceel5xr6d1l0242ztap099ghafi2seqqfp87ioxaep4yu5iggukx337vovmbuij6b4o8zq9ajk9ru9rhduiwd5ptxewr2b0kudtc0al9xlqch8je7axi9gdy6atbd52646qf124b8ro90lxs3sdyojpjoci5uslo49mh2j76ep0eeclwbcgrxodx4ncxebmyaiqek0p2sdn35r3uwykoi0gvn1k20fkdbuzf2q521ttrbdsbqn719mdaoqglul3j7025y1q2g4mul1jzju8z6xpsgbopj7tz0ju8aqx0lacct9bmddzgjapwopuvlhxhn50tvd70gkzx68t6a3temw4d8cszpktff0m3jhnvxr4i4d154mefy5jkc06do3w2vq35i3xo7v7rfmwx3s7s9uoidpcwdssdg384jzun10a5vu3dcryiouyk5bcxflw73d119jgfo7zgybxab0jk8scwoj3mz4n45vcjzvcmwtxom8g72d65kdwb1rwe6f0je771r5gq6xzc5ca2avap9hvx96njn61lww0sf705hq753noqk81bz4nnvgrx3ftwsjy69fkggp06runyslb2v387s05a2ol9j1d4j2nuzfip95cpkn3xvlwq912fwkpkyezvkczvlabug2kanfxmvh4df0ohwwsuo0wtwz6s8iw854jeboqcbpgkk7dq2cmf6ubeq585qvrjkuz7v763g4l0dbgapjhh9698td0e0bsicka9abp5hdt96wddkya808oykc34li11ghp0j653w3sy1ataa',
                fileSchema: '2rftasx7epac3bpbs8ayxc8bmjz63ryssduov9ke4uga1emqhbxm96eo1j6e98lo1i2ii0dwlwx0ihxysa52yxhy5axwa10ya64wg4m8acerjnlicsveyeocn9jije09eyt91a2blsm2fg9cxo2k9nmq0ik2ob6snsv5shgyditf8esitzpvkkeyk52sofuxf2ut451ms47vqvd0f96c9w0nuyqstkrfub1wdq2d485338h797jadetdcf2qlo6tvijliziqxw7li9wqgvba6s4gnnd3jbt2mibpz5h8eq1erxs6x7d37b7gzml115wc31zvv8t2nd85v4ewarb7nss56j07hs12c5nnphd5hk80dp7d79muqofwg50375klngd7rr5xtt087v47porch71ltetzmsvfwiwq1g4zyiatqwknumbsn26gz3qz5p7o1ripr4nknmxzzgj542a6bmpccmlfbdfmeof434zhkfw1va7ao66di8pnge5edst52x44ta2sd66w6d7imeiydam5rklpzrub8s4wmu14x6htmh4k91nxs39n4mgohgif8efiz9rp5kgzam28ivzya5st1jq7s7vidm5fpu8q8bijlphyik62mr83m2t587lpdjoykcs3vvzbdzqjsiz7k2psglsdf0ujnmdt20qyij1ncv4ggojyc4fjs4eeyyd0autq5246b9v5kw14cfv4368jm0uz4wqht4x0da1tmz82q3giuqf93cpg95o42868i4plcvs9jc0css0zgrqjxc9o5me36ummrpnh3wxappotj1x62fts4ezsrgvoeab9zis1l4xqv263179m2fr5bh1c4phhmbj42vkidf7vifwr4q0iy90weipprb1eha25496z2ly2uk701b5qq71xhr2y56xakh6r88hiez2mv0wvaouldw3kqrqy4yik7n2t35wtp9mfadc15wolkv7hj5pnxa35tlouo7od9d30xrl08uzb6fjzzyviaaftggl2',
                proxyHost: 'og1hq121mybl84bwqqbrfiht7cp5dib7kz9h3o9isfke4r7faclp1myzaex2',
                proxyPort: 1028369780,
                destination: 'enhngje9paa1dilgpbvvnxchthur5wl7j075v0xbghmlapbmy999ukzjk4c5wbtgq5zhccrtl53mjk8i6bchgpuz07l4fxgzt67rkx4x2qzta5p0vn7hzfo57z99axiwtbbriwl97n7hbvuwd6vvjqjmsy8mbhgq',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'xrryobwyuuh93vo7e6a4mp5bqviz7hp1b3w44zanxnkkhzuw3wcjp7e5f73elciy7xpqe7m9kjlj7l2g1fy78pvt4inu6e8gi9pfnxjm5rqez8myr32nbj979n588fqcxe5n7r5zn4iyt82lrmk9abxwrbg6vwmf',
                responsibleUserAccountName: 'zngk5htfrxtnaf69dcex',
                lastChangeUserAccount: 'yu5opna3qr3wevcwx5u7',
                lastChangedAt: '2020-07-28 16:49:33',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'thfv7hgakr8zpmo8c3hnyswrt70x81d6s7g8muma',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'hoivvmqsf1h1pgsaymdnd9v0bwu3tskp0fahxhm7nxnbwsooj1',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: '0wzqz84n5te4oe90nmbf',
                party: '2c6ng0hcaoeb8zowjtq54orje6myl3y3mw0ncpf0anigq3kfi5b6a4al8y1b9qec512bj2pui20wy8f8hox6xogezrc2kgz9ez4lon3uhwq90pb9w5egtakhdetalce6raiw9a9m90qwcn9eve2dey6zrm24gnio',
                component: 'l1ahyk6heyzc78te7y9n52gzmr9g69ppj0vla26hmhj7cdxrz5w00jcua3v2iun0mrdv0rtzs1cl6u3e6lr0yyhqgubupgfc67d9en4k4pe7hnru5k5vpe7y2nlftht4bdbww9sis1jsvjd0haajkeg9kyi1r7hh',
                name: '2btl84h6z4uun3dexfuhgmpun5msuvu1giug13198jvlx6913nj3wdnpxeddd8xw28xiz3g29wbdeumwkt9a2cci6cv4nj9jv4plr90rwd0d7y7maydd7ri5nwi06k768mpy44cr0nx8afz575kwtr4x4zeda2bw',
                flowId: '92723vctce7u15fmeih6v4y3irx7eq99r3v24',
                flowParty: 'maqobaj7182blqp1znh24rn3kj8c5jg6vzxq8kisgeu41ahkuwbdqfloi020r0m5v5dcey3ypadwoncospwg7fnvh8ut5b3cfss7dhxrz7g0aodutmcpbgc5qmb3owg29c405nsvbzo7wq9ikjjf6l8044kbd5gn',
                flowComponent: 'paop7nj6kaputsonxdao3bkta64i3nkpli8gq86s1l864uhil58voqaze96gubks1fgpnw2n79rjvjc7dhkl34tpwudfbxl9xwtf7afk6q47aghxie5ei0891ibwplbh5uecluu83snq4dcitdcwzqhvfss4jl5j',
                flowInterfaceName: '3ndq874fe5v2bh8evdyajx00m285flwwf89us2cmpj4uph2950rbxxvr6iugltwmtop907b2bwf355zm871a3bgff3exbyjh4on3ttgejd4gg2vwsq90t9ha23f11t95k6i23k4bo5i06lrq4pfuwoxq17zdhy35',
                flowInterfaceNamespace: 'ek3w4uia48zt4ute4aby4fi2jefqe9e69rs5hi27g05tpc9a9agdj47chdmpmgsdwx0mqhlrk3mhgh9hxzrt8lp3ytuzng8fab2zlnwqdl0gr5invl38y9pl1sdpjatvibzzpbhj0x6r0q6hk591wvxkp8pgtpaj',
                version: 'jc5iom8gpn3lv9m8d58r',
                adapterType: 'mp1r9bfivuyqmmwjy61h2m4orvd87cujbmb8ecr85iqkp0rrqeqnux5fponj',
                direction: 'SENDER',
                transportProtocol: 'x3l28tgpiuk82qzwd900184yn8wozjugs0ehzqfpo8dr03god8j7id2hcoas',
                messageProtocol: 'zrb4bpekny4gdwwnpmjcw3vqjp58mtaxwkd2i5uldhee1utamavp19kgezos',
                adapterEngineName: 'ujxilhr2ersrmrr7x8c8hsiq0n0yktr0hmvqi0mgkkavyg5lyh9pzf37cmr33se4obo34xgl0iu9uke214toioje0hhf4hfnm3u32pinc2fdr5fffm1kd4h5hjcf9ce31hf7q5uvy3oguf36ee41halklowrlsvo',
                url: 's8ti9xfkndirqestcr18mi0u2f9n66znloxtfxkj6njtmtqhotv828g9qufmx27hz2zcru4xvbxf7u3xl101ins4560ed7rkwpnyo8necmzqnw0ofy7gyegjb5j6qjh0d5fxmu8abmdh9z5re0h480vev9ymnupsr1djudfwii7q3y594wev9zcaxbkhrchr07ph03m86ba8c3lkk6w5woeece0ueoi64dvupus310hqmid9j7tdwoojizu6dm67qje76bg795ktxkrsycojdzfkjbf33ev8vbe0wkqdlas92smul4ebr9m5to7zfhdo',
                username: '3p7s4nslgvdims1t3gw3kh3t2htglafxg5uo9wi10ua21254g5qcmic121rn',
                remoteHost: 'pmgi24rjj7haulzhbbhzdsn757x8w9hwvfh2wingbtezuz5bqqi6n5ckldb2d001stge90gajr5y86pt05dupkr90b1lsgtwm5qi6ss479njjsatve62l3ge82pg4jgze7fndu3wxhzms3g3gam797fy6tbqhgk2',
                remotePort: 8585258988,
                directory: 'rnzfxy4845bfndpoymzznaq7eoz50t7ir2yf50yyiw1bef6cyrwjh6she73qva6am5rxaynrg96h0xx88ea3tjmflnrft4wdxi193cdfb7u2zift94k03hypjhtztnzjbhcfisjyb755cih1m65qvbryxgbhmlmkij4np6kkt9ax0w4iad334fhsr98uwepfxn49v99vx9q4yawdk0phloewozsaas609059uav2pikb4qs1gfchgz5xoeyrscu8rxkxw7vpca2pxguk5ysha095t32afmi5dhkuhzcqyik0tlryzxfk9g7gzoy3l4eigubnbrtntvbg08kzlphcc1rmsfiaih61ccl764oqxvwwip5u8xh1kja4d1heuv3v43hant51g1crkj9ezu7mxr2c5mo7wlzr1suo7zwzgojfhif13r5g2ajy0k08j9xmvg5rrfz6ls86dhjhonqq5pvmxfz6113u5fe495ioj0h31mybc7febroryuad6l1dq9qp50ciqamifov4zhfl1k4qj82xrx74rne7otzdtmce596our86p0ajb5ruorlroyo52jkujlepp920zhclz3xqru2ldqf5dw5bbuvwzj386nzhqav5zag9teggt421wc1ybyxc3a0a262u29megiayxbqnm6snsuthmq349qikwatfde0iwvv48ku817x9krdqwklzp1s0mu5ivou5gt83y3rfi9rjdh2be85nnpl8afym004t2fk5h1tshk7btkxh5ykcto158oqrgka2o8nzmdol63h2oo8nxozlspbl16fuddlrmkkx07myrlg90e8yrfr83x26mm30evzfigryr7b6q5nbe6fo93endpe20mgfr2ffcsfkps3pupvntlvnudn5uqqdrmeq8p4tqy0a4zll39n3grdco0mjj9h71e10x3u99pxl6g6tec67h8ndsqz2mds3sv30s9jbk6rvgcl7m1do8qjebt4ofo1uhnpta9rmil8ew1i5s7yk',
                fileSchema: '7dunb6rcqfo1suc5h7xzlrwrolvb9yovjsgf43akma5aqj65orirwujww3txlojhctho6a6nfuj2w4c4vz1sidwmwmwa9h4h4f1hqgvyrea5dzyic05n0a2ntchl3krkvbwe6dzdoiqb2eril3yya1qzsm65ut0yes2qfr0pytgsrkj5v4233tesa7ps4he43brst977sxtrzt5mf55nqa5cptynsfg8ituzjf9tcaip8jsdx638j4mv0lzb9xx5vv1l0ud7ei6widopxk6eq2m5fz7dkk25o0c0xry0s6tsr8t2tigxo0jfp2oroh975xohn5wr2q5wjh731tpt0kqznafwbdra3xun3wlpvgmqpd2rsvb9fnkxoobsp3vymz12a25r2yl2iuxor0hcqu8s0y8bn472r6t1imacbynahfhwn645vv2n2w7r62paej3xht1rpezwio4d3ed9txvvlz7eae2qr8vkuxgrekp53bipcbdn12d6oistm474zxyd66yez0yg37fcerqltjj28dqufdwi6aua6hwm390ry1su57yk4gl52ztk9brkxa03y0mihkhovh8o2vkygrahtk5wrx6q5r7l8zp1w7bemr5vvk0k89eb3hudzxkkqnknx34ed2kwmymfnlliykskr6b23ep95uwzxmtje4ougxx5056e4od7xtmw9kvichgvlj5c7kbhu8yahs4dhmsrt0nnq6gg1g0mb398gql0zhpptlgxrd7j9eyrft8rh0x5p692e1wdx1gkh10dof8a8qq1xsnc7z60ki3vz84ts1zxgcm8shxnwt3xnzyqcs1210y2y36kl79itlyl5e0naet28mpsa596xozcc0pp8t72hp3p38tr9lrv1vr995jw2k1vx1z51lalvefg84pp8dcr1miawstwjtpkj8aerqz54mxpdnjnqxh0r7c3md5dd6n3il15jpa1p6lyttucwgr3sfj4x1ual96dvwmsim92cq5ltgoa1zi226o7',
                proxyHost: '6j50tn1k6lz3vt9kguyd6574gp7roghvvg43rlvvm6916i2wcbouutpku847',
                proxyPort: 7300416019,
                destination: 'djiusa0xtw2t12kw6n3i7224kp0acuub4oh2mxw40b1qye7ppcn3440tjrtpqksou31qre6gudxtk4ggdgx9dsqdge0d9afxx3cyqswevyf4ngvtuigrcgssk6dbhodt0h6hk8i7nxgyxz1hcq8j3avi31yar058',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'h67qdo23u0q8talg6iab1optiygsze8bynuah4e39zgqx96o9qfr5qm1zrao8441h0itla8t6o76izcdx905lx87yccerprt63vnrd6lo416aolnyuftrn2we36hmm2xz985vys4qn8dfm3yjcq38s1ps7iz8ppo',
                responsibleUserAccountName: '7ubwb5evakdw9spiff1x',
                lastChangeUserAccount: '48anzdp2ub8zdtgkb8mj',
                lastChangedAt: '2020-07-28 20:37:21',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: '979953b00z8ed45l6v2gxpr6ee7ojt880xn04qmz',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: '18vk6il7rh07pxtjoa3atbpdrmioh7tp6w3qug134x3cp5lkb0e',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'kofjeq3qujayv0utmpnt',
                party: 'tz96ixwfwme3melwrq1fmjxtrxq2akcxqcv8a9yxcunsi6u80n1wbgsq84lkvf3hyu4fsgtepxnugytls9gated7yx657j8udx6905srsj4bpetmn9pjifds01t39kxiq0fvnmprovyezyx9qk8fqyg9gt02zdwn',
                component: 'zxkoyqdnnihma8dznu7myewzzlc2h8h5gwvkmlh4gfjvuoqk1pa4xiv0wbb3rd0hdnkx3kjwwrwrdpcvcpgbify1ru42cbad8n84gnv45yeex2e3ouz4i1esi9ko3wh104pfv2is20ujx2lqrdcug5mikk2bs9e6',
                name: 'acr1qpvo4det0izjmcvjwvwqg74ik0h538iohg4idc9qpuwvzk0qw53dfbeyzbsnf2ehcbnvgb56pazuk7exzyrchvec389ncuu4blns9uezjapnjn2z61y2lw7g2qxla5owr6bqkftqrok9t9x5un998a8dqmls',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'ue02pfta4dkvhem96gp7a2wj9rdtrgvdzby7f29ep7gywxynaavtiahmue1u69yolpdo1lsjyxhyw5jl53lx7jeby02lpslj7w05givsruitssje4gipnqurwa397kif9ivti3d0hecxvufaxvgxz6fuamlhrr2v',
                flowComponent: 'ueg58gvcubawguaq18keom2r6wd23t74hu5w5vkny2z7gi683r4m282lfvscas0grc7gswbtk7mt28jd941diix9qmu03zcy7tmnm6jkzwerob85lxpmswyd7r6gawxo1juk2vz6n9x1m9tdy9qp23l4uuoz4f4r',
                flowInterfaceName: 'yborqjlz6e7gdb3i19a6e07fzbemxugs7vrz7eem92usrnnlnii0vwmrr7thcqd9xpa9j2ycjapvcsrun2fdrk5y738ti5m1m1ljjuqljg0l4vaxr2rexdth5fpwqkhaxoi90z2kmmttnl418mrl6c8jonjl2e7k',
                flowInterfaceNamespace: '0gfrtdnx9i3tkddw5n6slcdjh5t2xhqe9kbsm2bonenz5rtmeca2v6foz6sw3zi28619ddwjiy0q4zonfjp41yau0zsyc6s1rtz136x1vkvp67kwydqgwnznmpjyoi1e46iog4awsom21tpnrmkd5g92tpb427oe',
                version: 'l9m91jkhs4h0p1awat8g',
                adapterType: 'mqxcb8bko2cpus6py3zpup9o39w721xbf7lutrbxwvk863mnh43214ti56w8',
                direction: 'RECEIVER',
                transportProtocol: 'ofbisvnp31jkcn8cw8nemjxgtt2548x2phyvm5sse56jg2eke5dgwt22ii4w',
                messageProtocol: 'itg7woih053ebu8mt5iuktziit11w7nhaxp3on7yghslj6djpnu56rseassu',
                adapterEngineName: 'gh0f9ukw3y5g3zq21k0cf8byw36nh7xwbq2zvjjsapw9mnta0hek44bmlbjb9dyqm9zgiyyvbmlxo8w2rv5ic5m2pl37vuwnh42iyonmkvs0ehlf663clac8dc57cqizj8yhn7vc9dzo80g3dz6dp7ecqehyn5ds',
                url: '4qhyhqyly16bo4qglvsaxio4tolg17jcnm3uuh7t3x7gwepf90upqk7b8blk6jp43l8hkgyvskrb4ovn7spvz3ica2x3081065rjmv43pp03wsxueo77zntea82g29zbnporcqwy6m0qgy9u1q5dg4ihm91dtitgq97bv5cly5bhmzmrariqic1c2pnh5qast5llsrmb3yr8wnhg2nbfo4ngg5tvdr9l9ixlbhkqhsclyxx3s3otnj70hgklvecl7tzg09ai9xg43t3uy69bhc8ftu9jybis67dn5jkggy42dhkyb1c3s32jww94zvy4',
                username: 'x15ebwx9120rxvkhf2591kj5ykjxd7s92mecfw5m264zo4agaugv5lc4ymy7',
                remoteHost: '6kx6q4w3uxw2rmpn6vtihkirmlnzomlgs4z9vt2e1yktoczsmy8gskkbpwbxqk0lsr56lk60nls5p2w544pug2zbjxjfccd5693vmpw7d61rqf5df0am0ot74qpqapqvdwt757wu6fk7el7y4ic9aw4e38ht9ley',
                remotePort: 7117352742,
                directory: 'giqf58bv01gweyq0v8diwevt29o90xjtdcuug3g0xmhnvjk1xpxc1dmpev3tnsle9eqimafnptq0rbnc3lfprfo16g9zpkp29n62letljk67zpdzsyt8ievq24ytex01pxnr8jo5o5p0a6vpfq4i0sso02vmdgq54k1mi3epmj0907gr551lcqhy5xyahnju691cicf4twerpy3a7bksunttx7ce8uqj8k92cfwt2fcov1xxyr411mrg8dt9kq9wnbvficdeombjq69nwswo7i0149u58028u16hytjlwpc0sii3a9fcum8diow3m2vfh6pr0fi1271uiihwuqo100lfz3diy6vmctxlzsgk9wk4grx676221rjbuuzz7onhl5nkzestei038l74fi0qmy3o8w4xqi9ec6q7uq366swjua2pb2v3c8lbd8v1z56u90a3gqx7u419ofe9vw6xbwgki8a3rags9rxcwr173gmb1r392lb4revk3nfhiki1i3es1bax98f0u6vm94bwj1ycp5motzm24val1zyatw1u873bd52l6ebz3bb1bysj797jak6u5yvghiahd6e7hrhkofx8oa6y6zhuiqp2yikhpe6t5dfzod7zwwpsp6172rf5ta9ixk3gzvkzzvooibrj0vro6vfae0cnp4d9g2frct34togojmz50h7vjie75ezoz6papoqmtgec151il8cz7xnlqjcxti06hmscrt8bv0giqkbj67dz6ehow98qu1qnw92p3rc16pf6qyzyy63eqeggrf5m0f62nj4gs6k5jg09t4a03gehzbw6tj0cepga0w02c2sfbyu16ag2knwlj1enh3lq1dtuwu3pmz4lzy8gsifo6uzzw7619ndgw76vblmzf1dgpa3582v6zo3yyqvc5yva6s2ge9yuzftk5egjornxqdbgfukffhqney3k2or8clahipqfxnary4kpr94daytu7xudcdfsykjnfxvjbrt0zpl0qs2bcymp',
                fileSchema: 'ois8f9mjb4581rau96szaq4v6e8rngxqgrz30zppya444eatrcrtybpvgwtdgc5pmlheyfu93o3gi707xl2lbnzrwr3bt0vi7vr3v2fnzcvl0z1nyvh6lx85ceenya9l6mmo3i3nomh2gm1oz1w4gkbcaa7rqwefbcn1bdlw6alqn0gk4o97zmeg8rlyte1v4avn8x3htkxbs57odxujvf8m6mbis26u9ul1kig6lm920hqxjca2220gyb00nkq8p11nrw3581alu5rveia7a94aez9c5w9wl0hd1m9m46xsj2jfivok3m5fzgvrueethrwzpd99yqw9or0fr8gu55jddjfrre8a8dat9dtl6oeaq9xhy67gzzxyede90pt8sdseidrnwrgdq3219xy9tb74lbdun9nxzx37jgn15vg01ptk5h5d44yeixc3szcoptwv6ept84gs37bybdrh8spziar5fnlxv1kewhzicp4a0rxgfmtapkl8w2ol9sjaqkpyb8yez7ss4qd5qokrjl4bcg11w6mowjuv7hjdkvi8n032kuxuhc9wgz09bu3m1jt9q4jnkvxhiaxnqbvn1ao7bki1s7uey133prwp53dmarllsq7f1s92qs1x4o925gkcps2khyxuj72dpagtw884u2cvu0tga7bvl0k5gfvhefpx489rn5ynmcjb2hgikwdn2xj2u7dd1wqv9zjekeudzi2ek4pfa3796699e0of7zw0ioyrkg924pd4si09azt22jxv4h7sgasxevkty025uslt6jk846yk6nv3bxtcgk6s82ohzm99tkyszfttj9na21rx2cn853dutvy7miztc18y1vhwebmckp30p9zst55cpvo0m5o5kc4cp5yuit4htziup1aiehhg130jxcsgppt3vfryebtoy1uivp0jjbtnvmb8hukmyiabnqzd63b3cm21o43h6lgif3ty14y8vh31smizepx1z3q7oq8no6x09o3rf1hnehmadr0h',
                proxyHost: '14oytxwawhveqwv6i81la7u3ewuq92kifad7iuo5fei07hw28iq61yudrh45',
                proxyPort: 8079279825,
                destination: 'cab76tlltosjf5wwqs3do3ycubxriigdh9gmebpcgavs3z5qryinc7uz62eohchk9pojeyv4l7g2fz64dmyp6v2kziaemi03uw2zyi82egja532nxn16q9twpvuugvzoe8108a0rnj0bmvmd2oyj7e2mjkfj6xlm',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ne3h7ku93wgn42x54zyaft2fdd5ckkoki1o64hixvuvfxjw9m2figto13tvd5ejhc6yp0w9rnv3e79o842rchg6m6gapvf6d4s8gj7syg0vax5qznff0nv23w7yvchcmqfjcqa94aaz23h41jo7c2lpl9kyg2emq',
                responsibleUserAccountName: 'goaxwwogtv8khw2ubd16',
                lastChangeUserAccount: 'cm84wh5fse72mmfn033t',
                lastChangedAt: '2020-07-29 09:09:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 't7o0vuh82m514jwgr6zz9rjsmkim3ysym7k53cc3',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: '2ghw5pclsrigh6o7cpvrnh3y20hy9axen3ej445cjvwf8yz6vu',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'qmjm8ywhlnfjr489gnnin',
                party: 'fgzc0w0zpj2wrt1qbc7idmy1fmq9wnzgo0vmv2fotd6x6erap8uz2634mloku28nmldwxudzzsco7opcantvkjpywe4bgztqp6y95jafnpbmr8t3ff8kkywgc08unyadcrnhwadg5xxjkpuwnqcixwf7yy1l0zfy',
                component: 'mo91v0pr8q85ultkyyh69dze193nj9sesezeoqvswf4zqwg1jv78mk1nhfopkvyu7l2u6rzuefb0cni4f003t8iscdtot4zxq8hk88pzg3jkyyee7ocjmawe9h16126kuzc5oioflk36rrv13ngmq3u8485njp65',
                name: 'ak3y9zu35sl2rx00jxy5m0vlmw12urjrv3hpt42o864gtxgs6p4khd23zq3y95n6gbvmqawez47wjq8jkjvokeshbmvzaqvg11llmdk0ea38mk5zg7i3j7503g9crdbfpnnrs24rv1g16g6n4fxjeix4flku9nwm',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'p3hst0myf3lw30iu3t171jz218zofypm3sgvahcccfyvbf97ss6k2n4r4gknpe6e0hm7unxjma1ebbjvy9wmqulg6qnofkbouwxuvt9w4anbbn6nx6otjq93bz6ua6ujgyuvvnzd4pv67af8apvum9x2unbw8kqf',
                flowComponent: 'ztcen3kasoko52ry7c1mcfghxwv1ohibm2cb32dcui6y6e7hez462c7pyzbqudn9b3j0r4l4js2p9dwzxjcp7ym7buvpmu04d8l6n176q4k9yltgd8rh6uvhil76o7jgscs67h5p13kodiqs0tnr822xk3oeq5j6',
                flowInterfaceName: 'z0p92lqx8iz1xuq6br7duh1zt6lfwjexeuy80lvqkdr6093v6earpwg471krj5aytmbz7r8wox98ugn9yivjsovfpjvvuo0gktw1yz9al0buci83xf6l7zsrew9mkqeqv204lzkt8f8pnzt01ew2lbbti1yekj9o',
                flowInterfaceNamespace: 'goxkl6aveon1o4d5ya1a0h9q20y2n1zn6r07683bsqdujc9ryklxmvjv8ujxoacciancyjmyobzhnov51erullwp0z4dcjufj53u132i4hby94tb4eom2zre9ohjw5ddxo29g7at4wzlprf6404k3xjokff0ffg4',
                version: 'lgtifbop8jb7txxmxc0c',
                adapterType: 'bz5f5s0sy7y4elxlga8y0ftuwks52h5nxonc9z7b7221a14717pfwzgb0f6o',
                direction: 'RECEIVER',
                transportProtocol: 'gkpryxnjie1hsgw6fo2mjs4rafb9pgnneiqs1s9a80jw45vhyneh44aihccr',
                messageProtocol: '74ixp2x5r1gw8yd1wl6j4aar4ghlyxb2d4adlfcr2qb96sjh4nrpwmime4v5',
                adapterEngineName: '7movfhg3ai7yy5j2jzo2wox7jue72ojpn69sm9xgv3m92m8lo4wnxwbgzhbw3ta3wln5d8p81ao64r37d2o8fsmu4nl2qjgi58dq4sv445xrx6qhkgkgqag2fxb3zpthb88rmwb5mtwl6xcjajhzswj7ws6epef0',
                url: 'zfz6rbefh5zzpkcjkrqxyzmz3t3yjrydz9o7lqo11gfpi1sant5sfajs0ab7cqicba7545kxnepfy766ibd4661af5t4tt7870fdlpyucia1jq449xlojukiv5vcdlvun5b0zmy0ecb4u64cev510ftino8coh0kw54wv6j0d7avggbtm660615el370vcmk4ppe9o4scf31tphusccssibilz8q63ah4n3ayfg1dth78oi60q0n8ihbv02edm72gdcqtvyso2olro7c8j4y6mrq11tsay1aw2e5l2bi1va7kwb1ne1l9j8o42hibsor',
                username: 'cuzhtwaz3la2yn7yznumpxdre5o0quuz913znd7e1cxpl3j8fra43e4tk2fa',
                remoteHost: 'w4jr4d4oaobs4wz925xjufxpn6bhx93lcc50ybdc2nu13m0hecxqm9wg6hjpfz68ap3nme8afqnncb4sctdtv1kkns9wyxqj78su52r6lg5irjann6cuo1xb07b8mwuk0u97h92apfjfiscygdu705vwt6e20o8p',
                remotePort: 3128008275,
                directory: '8617991dpnpv0maa6myplfynxdm72me1xsusp0s32rsbqbyfbu2qjve4rwyphu525n8ot6hm4huvp7t91f1epdyc27yyqa6e62bxgyupbvkuu1ksscwcvk4foppp3idpr2if572woglyzn8nakobwm1191s5072jmocp361msx2tosl595k9z4tkztfxlyp2uoj2ti44puvtjl9xcc8qtu9qcid87fx8gz4sgjbzfhv983mdxbxxrps7gc6nr0jwtch8bbjm2zgvrnbokf8cncdz52t6czmkzlli3ed6q47s7y2u86qitzxcb9g1c5lixi1gwfhe4xb5acsvbh7emhamewnbs85o3f4ucts6in0mjork3l07psybwe9a74yfqhbnxwt6lp7y7fw8hjvgavc3vttod4csdu4pvituy5ks3htm7umytford79g1db15g0mczvm2esz939koawus7tofsbs9a6t876nmyq98w5o3ww3bulmb6xc5yuwe181fxtxbgv89eo1msynyv27tjfohmg9qybk6y80rm2xefflem3tobwajvbfs46vb2on17jq4mdk6p0t88o54vv9739hth53698udonn3wofpu7bkg1zjja02hzyy58xanwi4k2aa7a648ztggb64qeaxb0z0avxe75c96v5ocp502d2dqex02brgpid8detgem0093art94mlqezwsw8goontvize1g7iapeqe0cueqz2m2x8fp7rjftcdjgxops2d9slxr4ih3ue44l6pyjhkmfi6qz26qvezemi9izjond6ip6kii2fbmhqmpxg7y8nvlaq2blnib84vu5y2mfzm5kfgelzx4gy62a947hs1rlutczk9zdd71wars3cesmfe3y0pbz6kspu5z88ufujet93ffvkee815jn1luqpmwwee9udfv2rv8a81x50bykgsyvyiexuqqgelkfdl0uden1vlvesg5hs8pw3ew1zwpr32p9cxo0tajvcpyzcxgj6pt',
                fileSchema: 'yafwpd6938bx6fudziw0rj7kywljjj2iwt9jqiztysm378og4adx4pkj44mc7sfbo5onwaodgsqasjnp4oleyidtu00x5d4n7rsvgfjv3o89y4u7080jle2s9uzxopjo9tj4f8a6sil84hrs74w0f3i30yuem9ukqtfqqy4tzqm0zuf1defvmv7vd1lzprlzo1oxs5xq1r2w9gtcn6lt2d87x0ks3vmxnlz7idbx9f09h1ay1yczbg07qnycnhdekuggrdyfif4rrvu5xvzobredkshs0pk99rme6nuud9zz8nc6ffcyzmnmmcbebqll7421gecgtbaitkmnnhuzac5rqtw68912kz2fpaiadwt0o57zc5tfxtzpgbs2jgwuhq5qst95403dpepvbr4ttg93tkm2dbb9myukfalrf2qmfznnn7oakha8e4cwyxhdszagykykfa7o56eebz4aco6cz31nr1mbnjdtizd6h008t4xpoqo0b20pl3il61bjftfpa91yku9zwper8pxkda1bbqas5n62nmzc2ifgdqnd6fu5qnphi6irhqmhqq9dxxrc23tc6sloegi3s6qapmbvdsv1gu03he3v0c32nah4e3duec103z0714klthlyu32ajhpx4drhu5iht4mly6y0ubcot7yas1ho868eibikux4g0reu4qdkwfhqu5fpknmywtx492jv68wzgzb8k6zdxnjz59lltjkroknowtz3f6ftnaxac2dl4or00zimbfn69pzz8e0bl2ng6v3pbhobx7bbuxscda4a2jy7exq9xh1ii21updfdkuqevriutgl9yjm5ecylqz1yby5z77exbovaauplne6akkemxr96ocwkkzg1bypuo4786c46b65gh9359ms9a3yzwq57mlffrlr51e2vd4l4c9dwx7fvfmembo3gazc0x8hq6ntkm8y44716epajzii5r7t7qj7134vi302n6yaqa6ybkng8uopxcedik7vcm63djwtu',
                proxyHost: 'q5itmag1cbo47zuw2mrknnr41gu25x21m2fhdanf0mzl1therqmxao8damo5',
                proxyPort: 2174240884,
                destination: '8tw56t4j5r3wzjevkffvizuvj28apvx3yyfkwom7h3i7mukjt8di5zlia047vyun5nhvqa22u4vg0hp7q4ivdn2s35meata097h6h917hertn1gst3xuvhy3e1r7ymr3lseni8uljezbc2zpwcvum79xrhcw539x',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ywujm1lyssgzmnjee9bqyd60kupiownrqlwn86x6bhn4mgk63phveg5urqxqjjka7666sv0vyc7poceedy8f1156ndmuco7nkjyw3bqzsqztcuckqhbk8cm8883f34bvxszqrcoy2tkm5j6rucq0ky806cz5j5u7',
                responsibleUserAccountName: 'xoz2diuiyv8lac55llmp',
                lastChangeUserAccount: 'irc6kx6tffi7oub5l9v6',
                lastChangedAt: '2020-07-29 12:33:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'c4s6bjgs9xqeyplmle0eenv77w55xr1qkukv4afx',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'ipxj6geohsygubfqggmi4qiqfqjw6u6fevveve3vswiwxbfkzn',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: '9rqxbpduyk0ujp1ablcz',
                party: 'sc20qqydku1wl7u58hvvvfuy0h7o8hlfs4hhqmok9vepmn6od7mlyg65cokk9gq82mwh8cuhlhda664v7qxag2m2rl6kefnda2zy57f2gaat7euaqjdzco3rvrnx1egog7nd7qikogowcpqgvoip48t8793r059si',
                component: 'in8s9we3b0he8c7zbnuw4uybw0hxvcn8dekj6ju9ce5hmtka3obd49yjgijzkdczjov7epjgqexll2ypcgmmj4xytvecbeadn5mrz4gqh63ohv2muv9djf7ndyumytxwx85ydxkvejwrybl4md8rynfv3d0cagch',
                name: 'z5pckcjekgio5jfizorqvpjx86umcou0nhwykeycf0tdhy6fg7tc60fil2apt73ocbgbz026i7lyun0awfvo5c70fl3fqd2yh37v7kvtcoqsy8c5kesfkiknzbnjlnwh3gb81yacia3y3imztgldqtfwewtl3ese',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'wayo1y1cudvn6qv3l58rbgxrkqifd16t0f1w3ae8n6u0itq5yaiucqnpl09p52gytex8sqz5cc3fffqhg4quss5gwtvfbcwpjh50b282463b9btqbu6lqgwwiaoxjet6cah0qa8nz7rhpf9mtj912vbxwyagbbqv',
                flowComponent: 'cdwsek9468ic04c4njc3s150xtridololzqwcd4tiu5qxlx6cprkwg25tcaz1860e29mxcp38gun3gid3cszjtv8gez7zo97ua3r5gylequqo56pehgjjiaiedzmhaf4h68dufem4t2r27db5o0ru1r4ouaiw3q0',
                flowInterfaceName: 'vzxywqdgfqckfiyqo30lt9h1ki1ne57ak96lvakgcvoi4tc5nsuvx9nrs8s8eushwpwq38yac8dszbcy92fz922uwp2afv4g6gobr0f9xyd57pwb6de1kxeslu5q641ge5h0bn32f2m4djwvntfzv7w1zhlj7upv',
                flowInterfaceNamespace: 'kxr63jz34vhu4qs4ojifx5p14ujfak62lmvsdb2n07x6nvb18sa1hyrfu3fktl2vappnmr379z4bkm1xa8gwfalva5ugh6jedpas8m9yv6cg6zhy3s2keu0fc3tkev6cyb19se5knexohkigo68v9ijuz94h86xt',
                version: 'jzh5vpanwsbcpsvwx5wv',
                adapterType: 'vdvxe44xuxtv5nukoeii4jhxsbvtg8c3je8jjzc3s42xft7ke2xn63heq1kb',
                direction: 'SENDER',
                transportProtocol: 'yj5qm1o8ry9taz14zzm5y62ghfq86qcr7fvdv3bkaaf09ufampczfb0a2588',
                messageProtocol: 'pusyvhk1xwv4drsz9nb0tso0969z2p965i51xuyzf2u7swinmjpyw8n0o1u9',
                adapterEngineName: 'l9auc00s7e4bp74e6diwr48ax8wy8svbbxxfxezrvh7wqozoyyy3dw2gi7blyq88jn53eunkp0nh9s4n7872n3krzuvwieuobgjufp2y8crhghocit0grocgwkdtmdsfo7p4a8zrk8lcj6auo2ut4ms59747jqdy',
                url: '4b71yf1yq179xckvsytcbhbbqncj8ffj403d71tvs3l0f7697ii66uh9h3ikr1832zm6rhad9ogvqtrpakvaulorc7c58xkppka0oet46utvtoulvchm8iul14ovqsva8uo21976w3ucuez3699k86ol5ryseaya42bc0613v931qd3wspn0ewwvjv0nx34o69cf0yj9iualygsz9iiik5bescjr2k6sgpn9lihxiyl4wqinmkimvk4dl3kx5654bxwrvpk58uu2li27ehpj1rdef1l8fv40pmpdtg7k8lhk78wobc8wnkqrse0bu9mj',
                username: 'zgw9vcg9fjm1o83jkj504n9o5l4x56ex8zync5irmy4ngxpayht27bzeradh',
                remoteHost: '4f41jkhmiqlkiedd60fq9dc1cec8s7hchsef0atb9fciqex2eoi845er86e9h3ympjpx6izhddjs9sskkars599ap3gd7vazvd1z3e39l96jqigzz6b6evif71lfq7rfi6n42nyboiee1ehljm3i05ws95kxr33d',
                remotePort: 8990951856,
                directory: '2i4epgj16sb9ycgz91lmudiii2he2x7i06k02vl6yssl2p3wzq48v0m80oxg0ywfnmhby2ur53x9ccwisjip6qow5h5w9k1my7ig43udr9u94t045atvprmc974tshl013v6rq879o1verrwiu9liqkn7oizg7agrphb4vuawb0ngxz5edlzrzzq3yg17etb38pcdzn73rpaumjfq3yo5dg05np33reay48qpj9s3m7844zg2smh8aul2vr0abhcc55xko7tqh9pu8oft6tlr6o8mgy2pkuaa0qavcsb5g0fg5bwfy9mbb9jjnrcieul0rktjs95wp61214w45vo8j3sjecpn13nmtghraau7uqr7qh0hmejg8jzad08y0fwvpapfpe9m0asc7uggamvvliftoqmrz0uey0fxaf44boledc7s6mk5gs11s2qajfpld8wgg53ti9pz0hd42jc253x1sa7l0e0eikiz94nwbvhcpi93c537rfxn9as6t3t30etuexn7bg1zftt83zoa3yvw5kd1okizfhupdt0s9epemt5x7imfq0ids7gfea50zoyjmjhbkl7nyqkgrdu175i0ungi5auzkcjo6a25p7wq2k4tebxw7wnrxp6ek9zybroplf3848ktewpo4lckshofc7d9qn6v6xl0wduu0wy8px5i161w4pebnqf2dkqoj8iapdq4zy4lj7agpjom4bu7upyghwvfies9r971d5tly5uda1uef95k5qf9lla7dfygpkez2696zbhnal1am3n2crtkqo7ungiu0oehq94t8o8p9nur3fti71ukc2px9dhr07ldmyecmxijk47i4ch76606sjtoh0n9jgasz4cn58jmzq489cg2wqxa5krwiqgjfn973xns78tse672yo2totbd1pdcc4wqh93qmc07ri2fdhvrcu1ri669hb9eyajtsxdxfczk3h0bzqhn4cyeceh0bat7xcm6aogwps16rawczqdx16hhfzeo19e',
                fileSchema: 'uqyw3mhgl81dliopwssc75j3azv01tuyc7n1egomgj0by2ue71lrwtguk4ju9ox4pl2rils3dddteshnooe1rma9cxnkgp3rdzoynio9qh2nkyb4vg097rhl94b16f2xhwz6a5gccxy7fyit7t9kyiqoz58q65km281z1ogndtvxhe85hwgmx94zl18emaujwewe4l6xtuj9moaoadqghc6u76d0hox54wm1pyfaprvui6m18zohks6gbtpni1uraamio6uqe9oeph0adccln0qgpaxgc1dydh7z8tbvfjoybtlo1ppddlhywl2o7h4s06antnp8ma9l16cg3rr5tybup9hh8xlkbkv3htzo0jsaux2znnzow1zrt7jxcy42nwhbxj9x4iov5bkbj2wlhao4kom8obgjyzfv0d9954hebenxvgskl10beim6obxuhwpken5a3h5ul61lpxk36gxcqztaz6crot1uiq2tbxit1fm42hknidzmd912fuxougitxzd93c0sw0mslzs607i65hdnnas7a804xwqh9payc1t1ge93u8y6yupnr30d9uvbyhf4asrmrm8khqgs1tm0l1y4cizniqthq3c9y5uwc51jwn0ymrsfgycsb1oo0v1kqui3givhuk0ojzctnqi6uoxcxamg09foxnzabezt1yhu7dca4c0ekpnlrxagjn00dkq4tyxswssgxdpg55iukjb2hf8sizgree28ukdo4d23mepctawrnm3sfanl8qbg0q3w3la3w8k5fr7dmklex7voqir0daje34oje0xctpik1sow6sud9987k4aazsrbnyoqtmwzolafvefzr0xmf7e7vp5ku7al0komsg5w96p76g7sb85ho006irplzhwn10q3t9x0f9q80coyl03erah57zucn021kdmprm7zqz9qtk7e0yxit6th0160acgz8w5g0by3nfru23z0a3dh03bzjz57chfv57ascs6uvzwh25wcmbtblri11g4m',
                proxyHost: '16mid0abasi2zzz9ofkvxmiff9x7chfb33csgjeqzpk7r8gxvcjom5yi6vfh',
                proxyPort: 4898980096,
                destination: 'rvcr2mkk8hdr47clr6e8bd3qmgqcntfgfm1vhb4y69fvspym18w9wqh2078e9os8idmg0oeuiqxxsn0sli0mstl1e0mp4vaetwcxgk5ys0rgbrg3het44dr4ova9yoywr0c8mebsj46irf4je9dxok0anspp9bev',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '8flrplzixqic0vq0qqkz0o9pr7jdc10v8glq4xmlrmb67zy3vzuga7ozi7ntfh50pi6moyuhvjkvj46lnvq047wcd552tb7am4mw1wsev72hrhp2fp8eovo19578kpht91ekfvcs0v0avwvtr70rq7lqw7ydozcp',
                responsibleUserAccountName: '3flwdq3vr9jkh37amkok',
                lastChangeUserAccount: 'p3qn2ssxlqvtjc7ive4v',
                lastChangedAt: '2020-07-29 08:18:13',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'susv9hituhrk47lyjzue6pdlkledo6ffu3c1hvhi',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'xswkdxb789utblyco2afsy3dwnaueo4we0poc3jx1aysppuefl',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: '8qsjodnnsd9jy8btgcru',
                party: 'dyo86yym6a0ik763yjzyz0rbpnmgtzv1xhebikzg88kly9mzgkkvpaf8e0g75l2baccisnuz06i967oq9i56znfczy4h4ns3buojqrc50ff29uqxr6upggc5dns5p9zlvjm8df9psp1a1mx9ie99c9e8lcm3dg1o',
                component: 'irt4mrq3kzowh8b8u1p16832myajipk62adev73qu4344zs72iku21n7kdmd3qij47s61r4unk9o5gnuexv3hr8dgu169xd08i99arbbdhsnchgigy6ctkz6myhpqvvxp893rkyfx4isflkzahpbuj31ua9tdhx8p',
                name: 'u00ea79alh51urzdfevw7m18r06zx8fp5hqy3r0tyxhsoplcbgzbq438b7xpuvgywaam8hjeaamchb3trpgpkkomht2wouksz5pogfbgbk541fjgl0wk53ukaju9sixlwf5q50eg0qjvlrwougqgd1su88iqttfi',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'fqiajbnnsage1y3jneu2yxzu8tlprnb3gggxc4pffocjwyeiooqegaujqi8er780apq5r7vbzjvh1noj6h8knnyimx9epjzqcmly8eujtspewekucxi169n2mod0gkrhzp556zdqq1xskvk8hekegbqdljm7gjof',
                flowComponent: 'psxb64i9allsaeosjn4jfy2s099b9qnwi72944o1xo3fi4ousx5jvr3uvx3jundnkrwkvd6r992l59zv59cgetj30i3o7iii5ho0l0ageqp37tezwhiwxiv3888i3o19ytixl3kfv3ytbhtdy4rv9gh4oezhqu7g',
                flowInterfaceName: 'y7vrbxhojdjair7ljnfmk1ojfxngp9vvzkv2z5e6dqhiwc1q2l3bfe78pf8az4qf7a4oy2z92s9aqgvi9vu5csxkhljtye04hhh13077dazlw4my4bdmgihn87wsnapwp2pzkna59fp5d2wrq8vpm9vrgxzrc8dx',
                flowInterfaceNamespace: '24so2ism1bgezyij3l8ysdljcovdsggiglkqhjuw4r4vt1bfvkhbu6c1l5est716tl1oanfiy2lx11mic1ba9ebuk82rur7umx2cktccdeazi0pjx6qcer3s33063qtahaqlztzryyv65v6uyx4cox0b8b0y0vhq',
                version: 'yvgygfyhnavygkskw69x',
                adapterType: '1pqr57lxo7he1gly3u075agyqlrk1teqhcnoi39r4q26ijb7k4y2ifm8cnh7',
                direction: 'SENDER',
                transportProtocol: '6ru5m055v20gm6rszhilitimo8tbqh433ohhnkze9tjsjm47q3d1c7odvg7r',
                messageProtocol: 'own2yi4ohsllgmfget0470s9n1rols6ou1wz19oeo269f4g2df3zwvdmqxqt',
                adapterEngineName: 'akrndp7ella6iasv27swn92knpdifal9hvbutn6uf6eyavnn5o5afhj9mu4oxwkpjj3gatj9tbcnfqm2qtprg7gcwmnzieu00nxr5co3e866zpfclo26ev58r00ojycvz5kiwjwrubwns1mo6dby9zn7mcghesh8',
                url: 'nz6exi5wbdkw1x89roadizukbpkc0f9938sa91qp3wgj1paw46dsw3g6kglqbu8rgmys4qqzvbhpimxw5pdpcfzj3pdu4e40ogm1r51t7md30uvkr86aatb8sbsu2rev00fp7g41lkpwdmrb0m31zodh2ytlgt5b3hioaq5dw9j43r7f9wt1zfmad26v22ena40gzlnxaqx9j2kzdlf9bc0fd0up1jc5x2u5e2gp6iuauavsmymze2h69ounm9katyqfooh7jgh21ll95fpg57ierr16rsldq0y9gl6do3mk3dsxh057f3vxom7ix58c',
                username: 'hcqx6637p4ggyyykiicpvderdrtxf7mnsqwjuzjgsjocuegvcoondoq0n244',
                remoteHost: 'bobs3ymecjwstrym6b7matj8jukhsqph2etts4kxbpkdkg0f3ln0m5p6ahlrly8jxq7omwd36mn6o6p43h4zcmq3rr8x577kwzlbetcu8jd2rn0fhjl5rfzowxt498n4z7e9e01yhg0a86idgod5yqlxwyhbiq86',
                remotePort: 7665304484,
                directory: 'pilkonf6r98lhujuu9cp5ypmryv84dyhsaly45kqk9ps5b4yoxkhyqpds446or8m86syzl6a33x4ztdgwh3v7vgickqizmqmq0yro00niv9g436x51mv9lh0yju8sdl1mhfsa0dylp3dg48d78ypxn96a2asijk3cdz69lnd2z8io5jgmwic01f7hnztr99g7bukh07r55l4fjpa4wjixjd2mi4jo5l0y9koxuxi0vvu171og6a9erbw9la4ddl76mm40j1u4lvwe9gob8i0ddus7n2i3433v3i3e9n1yewbljulwghy3lr1ya25nz7b2ya45pyt8zt3rkkm8xvbjmgyoy6x3vzqshc8347sqdaphx4rt9t427wpjl8tz8lyimpzql5r5ddpp1c9hkqyvxxoos6oj6rw1qvpdowtoj834appv253sfh39xq4d3ywprgdoetwkvzx93v7fkty3cvden5gzelbmvf5bt4hqi8nnh2wxibt9li4aw5i6msh3ritfo0elb7r7vvyja1cpepmknnjwvmqfd91y7tmqdjfp3dabk4zlqj3fglynp8xkiq1dp8y2snxntbmm14fc6pu3lnvfhl2d9g2qsdikequ2qy9infixmwbx3ettrpqsaht1igpejh09hjzk4u4rp7q6k7l4fkivosbqbn2dbh8uub0mxoer30rprsw48adt5nfqq6mr7c2bcy51x0l0ownt5d74dewbdkxq9iskih3de3cd2sc1kloe533ci414wfdbef69bnz2q4j9h3fo58k1d3j9xmi8184o2ko8dp18utpiml96pit2dzqgymmy05t9h4mremla2h4zlnfqnc30caz7htsuq4mg24k645vv3m8xohbrgyggyw6v59zixn3ek2uiigbkd5mzz7ktsbqfmssxu4xf7o916r7thi1ndt6zozvmvujmizizqq0koooym7dgrvoznveijp3pvoyaq2gbk94pvfciy5j4am0jszmahfkk5f38uftgj7z',
                fileSchema: 'y6y20ni0s98urzfz66mk2nmc0ovtzgkqh2ma3njsuimfrqcrgf8upfsyxqhsn8cdf7pzcz0ppew3fsdr4hy0nha6isb3c1igxjr0frhyggkcg09i7es76gmh1bycyu6eim34zn5j3dyachpat32n59j2l2payecwruopmdkkj65xxnoj26q4ajied91up1d3wgcpn5l8hlt9j7kp8y9u00xps7c0pk26uu4o0cezo9sxmtqkmlfq4cv045vcyeqfk9tjyv11hh1g4mpegriukx1erankumzdswa9d5jpdo7j7p5bzfomd184zve01viaqzi4c1zin3214yecmsj1gmo97ttjzhuq7mse5baktd9aiv4wgd0tmpd98s3ys0oa8x9wwe7addgz17q048zwvd7mwqxsnvv74amhk7iuwfjhfsfx6sxggu6rfzh24k2gr727s1lby2pa7lws7w4e2n3jim37hy4svadk3kcza3ftmqqlgbdxn4t3jg3g2twvtozijeff7ouezxxxdlleec603hrs7kqeonsb802xvd9ovb1mfdqtxauolkbnlxjobxow12oxuep7setgnlzifanvgla7vljh7dhb6zdw0py9bvb0hvfj7gfmt9c6da91tawn3tf05fxp8r4k9z4chftripbo15ph8sf3ss7b38s15n7swf8usjzcfs19lo5sotaz7eaeqtwveqdtbwymncpuc2stmrhgwoznycd9nf7ltilgzxv8xhxmoo5um7qtqqfvz2qtcuegwtvuxf2eoveh4vs791h9g7u5bksr88l8lhdc635a3g0o393q4cecsu7zdjb3lngubuj0ew2ops4bsgt03i0lv466a6anvzot6ltlvrthyobv0j7fb1ptlnlaxuq7lxzh14129n5yb3fg3vhr1sqrqk255kkwuovnp2p82aybey4g4am9c4j9u8kk7snmt6yfhcmg3r5h4b7ysw7kghzz9vbgf6mijt73jbngzl1pr6pzpwy3sbfo',
                proxyHost: '5wtwpeii0ypuv1q04maqz32vyd85353vhfqozdk2t1te8rcevac22mx8926j',
                proxyPort: 2578808491,
                destination: '2dsnr1k9tcsvepn81sz5wirq4nw7lrkeoez9d7d9eme6zx20mfsnkyln695ilcarkmgwe0u4parrxrv4wy5ler3xcyv1pat0fhtahxfyelhb4efpuwzra20pqj4xz4a0q8418ynwyuzgmcfdtpn3ch4b4vxrgl8z',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'rr3bcetvq31fv09ms8r8ve17dubxa6gju2mgnr7b4z2ca8sxttaexpv8sus65v0xwxb3homdma7vx8i51rx1qn0t3url2busu2svooxziubmigjioggmnaq50xra97084erhjjqlqi3qg6f7h0v4ac6ipwxufmnw',
                responsibleUserAccountName: '5vwzc9xg3zmjsw6rt59w',
                lastChangeUserAccount: '89nsmxrwlbqp92qkde8t',
                lastChangedAt: '2020-07-29 03:48:17',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'g1lss8n8vqhgs5l5hg1wgekkbynw0c93hv9hsg6b',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'nj0g9k751i8fha0lk41hswqk82tgdgub7sz2kcsja4k0ou07s3',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'c0o4stgqxklaxbfwdqbn',
                party: '8vh38of4dv3495d9uyjg6vnec2vn7eh1hx31jlvmiek2lsufpuyj3vkgdb8631s5nz6bfmnfrn5y07lm23gxxo5yri7qiyextk6nup6f2g9kxjakqlexourocy4q4zp407qevjmtrq8ok1jon0cpoo0g1wh4nym0',
                component: 'fod9tc8kvtqrc64ju1t08m56nwcj4tx5hcloqo325lbmtgeoqphs4dvne1wqr00b92e79c7v8h5077bazbem3n81numml32rocoq7puiao8rrxzq3h9q327pinvv1nao6xf0edwjxx91vwy078hm845yt3gxv726',
                name: 'e2rpz7c7jhg7em72r91qfrdtdfzar1d1otsb58rnb1h8fmflx79bxtmqrgo7oq2u5alpqyeilfqmw3vznyke4x4hthiqiwy08ii4khpn8fr2r75dlrsu8xr6aa30wu4nxtp21feto3cx2smb9n4zkdfpknzlac3pm',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'pxax4ctjshpdgy1r3l5t2yuburckjpwhr32y6fvqa5qhbtpvbazurioyjxnes0g0bjc86299h410rlid1jsklkxpbsyxwapjrd751hppkqkbmck2365fj3kx1jvt783ni1bvb77y5c75r7htr0hmoljolq4r2zt9',
                flowComponent: 'n984nyjo9und4lh3754ctso8i1zfkptl0ab7xsh26upbb3ke2vn3ryxp2vg8umh7mdr0nkpwmadfgbjhi3ifbwg5x5axj7oy0wc8khxgkj192huyf4hu1pkpi1zikrgh6xamkdw1qd3lqiwonkhsd8hwpw7ggecy',
                flowInterfaceName: 'nvuaqro30hyklvg3hwx1sf231bgwymgzebjqgxy3fn9b71ls2w2erhse49lng6uvi0u72rja5ir1a9mr2pec39pzrmyf5e42nrykidxpytqwi1f8e0kpztlr0ybx9ch7sbd6jqqieu3a5zkxz8ipjyom5fl32mjz',
                flowInterfaceNamespace: 'dghipo91ba1yqlehvxnl7l71bpo1t1z6pctacjv20xiw8lsam3cb201vbwc3u6ogo1rr0u18v1w2odc7ejt4ciljaao5t9qkilylpw6m3s7q0uwmdljkugh7nq2hj93tcttnbs6rizkxk0rmi51zrytbmrewoc3z',
                version: 'ysnj9hcmamtoizdc4fyh',
                adapterType: 'udfapksepuiw9fpimt16hazd0nw03d499757sqhiqhm0x10t3m2qsxmgv7qu',
                direction: 'RECEIVER',
                transportProtocol: 'rxyquq4s799wpltwxi7q33l0s16xq8woo6t27p64xud5f1klfy6s25i19399',
                messageProtocol: 'vyfiaoxthhb963c0x6emw7kyqvbjuh145nzzh8yupy8o2pxhhswu4xojmlg0',
                adapterEngineName: 'lzxi7j93w4u29g6qw37hge8x7i8fh1fwsfh9ps1qdcw1ptz7rhhj83wmx9gbjjhry3wbypi7d8b09t9h50vc5m22jhujb89iim98orm795vg1kdg59s93lsxb85o83q3jasvyfe8tdkhdexs9hlx916a3hm43tk9',
                url: 'uzbux75iot2x8dequhllt074cr357hyosmilv3ezkul8t60titn75uov738uxb92s0qlrfgsyye3kmms0i2zopz1mv958cmx96yv4o36qmv3v5gv73u8gzgyi4w30ra2o0vdwsjylnet3gxc0ss8yek5t48pnrf2avhmh40i1ravo5nwfdx9l55ihmycnjwlskv5eqfx1k4j7mile6bwgu0pv46kml63grl3nkry27fp1b1sth81cva493vw4w35csbyolo67dd5gvnivgk4nq6789hm7hr4qyy7m5paigclhigse2sbbsvh06oiqltt',
                username: 'y34hlnmaur4tncj02fahsn5zmqky97icp78gh1nzi5yxlly0m75ofdn1xvwe',
                remoteHost: 'tzojyahexfdkmjlswkrr7xlxnty186p7qzlpvbnutrwwawauxpfj9bkw6rj4x29b7w0nc23g5nmbnkhsedf63i2x7fevgyzvug3rvebpx4evbiku1x8nnqe4nhroznpy2a805suokfpt1bt42cokvei69c6lxfbt',
                remotePort: 2852516159,
                directory: 'j02xewiisupo0yutnq4p2impfqiwte0jgbbt26wi2w0r9bi2npx486yorhd9ovm227yod9s1ouixbqw9akl6aki7uelrd28vbfturs9zjtgsw2wtkr9deuj26gizs2ufzf2vatvotqzwddi9y0zifoaf64gahb2b469w14xlpxezv3vbm5hcomaecmeajkmpzk0y6i9xu80dx8849axb944xvtbp3jbd2gvz1iaip9sv7kxgbcxgi81dbsl1k7ieludmv5souk82n602meao8mjqrzfriwkbkxburzsfffwnt34jcx1p530mlr0sj84dlg48w0wrtgkl2ed08swdl4rna4x9gqos1vzny18unji4op0h16ofyj22n3h02sieedbrg0hnigbjgwsxirxpeyfaxibhpep9hpgyt2evvt87e7wu1s39q9hlxuqfaox6xgddjb3rqn1jlpwxkr57y9oy2ov2d2tnuuxftxb7v4kuqpwrsq713r56vlwuxf6o21pry5h8dc0ng7mmmdv9qk4j56q93dhiz71y8il46syb1ekb8vxp1xm5veqlycygf9dofz8l3yidjobwza7dojtw0yuuvsiaien3k506reo1oe99hm2rce5d9nyhk5ju1xhg1cvsuhydtgn1qza46zvm9g4g8i06cn72o3obq6cgluznr3wc9gjphfaz0vnbs6qsi2qpioqlg1uriwm7lmq37g8ur6ntvehwb931cugnhqifcxxx5y5qkusfs4ikuhl5tdqagao30ppu1msftd7lba4ig7yl6jks9oamw18b8gjj98qqx1n52jztun8xeqb96vztww284rmzecc059llcjr9rwf2wew2fj9a21d816bb60gv8zdqzxjlir89czsa046mq79fvsf9atyn9xnk0m4amms5oateavuhiddavjlufornuvw7hnsbtzmvj8asybcu93dt5cltan21u5tmdiv2z91orhvmvtfhiv2if2ky49d5sq5bit1oboby',
                fileSchema: 'ay4latyb5xjyhqdhrgqd7g3yjl1l564ctlyv4rdyz16au5c74ihappss7y5pb944ylv8cwu49owkchuvpd4e9rcjh7mo6nggyn8zkxmg411itq262f85v1k3c4lf27ja7wz5zzi1j2i53smcsre6hulecudmyd1lh6pzmaxjdy23w040ym7pxtg5kwskuy4tpaatumz47ke9f2v4vl6usaz9zgvslmt24lzcegy212agktvsey5w7sev28im9x8gvs96zgbdnajb7245vrjat7fqogjhnp1ylzob402r28l57689ilwzul7dvmcbuu6cx1kukk8wxsabd54uom96ttn5whooxpps2savqt8kacez6i8qocd65aj1py55dyzlsmlwlnaeimktxjgu94x67r0nunmt81e1wzjyqrft1wactd52mkn9dg4m8gzss1ih7ophdzq3r9uod972rurcodih2sdxjpz0nfmgv8pzfu5rjxwjr8mkv1u8x9gvvw5u7bgqok2ts8k0vk6z8ft6zs1c25ie0pyf38p2aga2jro62xd1l5k18yephqowprf4gkc00kiw00kayiyichznz084rf2gypc1rfpfkjkntjsu66yyfh5083fq9exp5botnsrws5dvfhsio4wwsdoma7xt4sxlreme0cuzea0uaqaj6lx1spkrvgsp83p2yiftz5kmmh5ub62e1vct8cphnh4dah4vxkrampeb2dgdb9l0wxg75so1pp3nofgc4cxqd5zg8zdguoejz7hy4c3fzf2vjuctrgdjtj4p12btm7apu4u93545oyikasbbmbofj67i3lpg7fsjspztckp71eb6uekebsjc5zbnjf9l6jxvibtdf4a0wrpoci084exes0bjrtxzqtpn0bmo7t5c1423ft9fbf4kyta1hsc9bdj7ahrculvis3ukqvk7ui20wos63vpl4j91xntv2wzzhi11m4qtu54hydlptqvbjkyh9bbximaiqzfpv8fg46kj',
                proxyHost: 'cy61xv4tkwodj0yhec1mhhmsld0tm1z0iw656yzj64x473hjm6x9sxvjcdao',
                proxyPort: 4476977530,
                destination: 'lcna39ubasmoj2rjgwaicdlh37o2zss701rhop929i76uczeqc9afb9pbcqrth6phyx23wxer8vfamt1ys5c5sl3qfztwa5wn6cc7u549fyhu6aw0cb8ok7r2fsdwe504aaa8xbfp2xaqe2kt1hv40a4hm5gsjrk',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'eu65a06pm9u7dluj63z96owqkldt71mc3b1bqpxxg0d1tmd4x5g7r0h43tj78irygi69sgtr8pisc4g8plve2uepchegfh1au8fcjmwjzhfrd29jerlrpk5d0cwkx5mbilehkuynyuagd9x2lf3ioshw4pr5pfcn',
                responsibleUserAccountName: 'czcj51q3eccjcvzeuuvh',
                lastChangeUserAccount: '5ei66c6n5sm1ommz01z0',
                lastChangedAt: '2020-07-28 20:42:53',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'l0x0rfd032ey9b9be153cszbkqeopoxhlhhpbj45',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: '7ksou2ah9cmruste0pn9zv2urrdcvf7w8ah8seaepuodrauwsq',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'faanxj0pt93v0i0fr74x',
                party: '1hehudkttyb9kh8vpacc0pvln22mg8yq3eryofsyn3fdeucvnp035e7lubk4ag7q20tvm3jpqchihcz2cpg1nu7v63br258hmntlfybfj86xtvf90aoz27hi31f8fxq8oudbfpq1fw81ppb4tr76vvc5o2x8o8qt',
                component: 'a86fyxmqm7urtjsqe0tnc59wx2g5bgpedlrh9lglsbno2pwh82890j6i9nexjl4rx7bnuyhkedumg0x3igsyoouy944debs897ahmraggt7erb8c2qdh0cax196rzo4hnrh0dcmd6u98g1shik1qqo6knf7rv7vq',
                name: '1j22awr3c4ed5jh34ydkozn47d1ztjamfhsgo7wuu2imq1z542l50dt11opzey861v4im106jnswa7fvkf2ti1wysz953pa9uiq0a0w7y8169itwep1xb7dzxltxga6rhmti3u4pvher92ye6fm65iql833s5zor',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'gruw0k3usu3v661jxrq33nhl47gcps12591vvb0m1e7muan21b16r8zu01pdvm52p6vkpt4oyzq0mwtblshtdwu5qbzokrrtw6gvv6prfvfk1so021x12qp9ibmv5n0gs3elmk3vxufypshuaxgka1b2t2qa7luwf',
                flowComponent: 'xy96kyvpfslshhh5c476el5v2s54hxfi9hejbb5tg9u3jctjeh00o2cbfyh0l7tfp4r359xlng3uvmu6l1h0bz9nsndmbpqvligp7qxmvhn8qxrnk6sjufj4vutwt5iyhezig1gl9vrk3yjsrwq1g21co9sg80um',
                flowInterfaceName: '4t760xmvhntvpp6z4fik2tdm0lsoi9nqwvxse2zstg1butwtrtdv2fo2edehrq4hniq44rwlx4xyywd4ytlfv88kfdo0jzk4b3dk7dogw7k9r12fcokzwae54z5p3dwdlbghx3wyk0f0pbxb11fg7qll2s51slp3',
                flowInterfaceNamespace: '5hs88fd41s20i3tg2njyi8cydrdn2rtbefi9v4ytwr6mbjpzll8nsszsmipi1g7ub5ndkwmgrlhr6xxb0gmf2rvgg31upq0jhki1truddoutm85hn66o40fp034mx2tq1yrpe0ku0ws8cspf917jzulx2wrccszt',
                version: 'gppjew1vqtazxnawjbqy',
                adapterType: '0whxb6lbh0674jyzjlp3cm33tlrjuik7ky3juz0nynbi1mfeumsi70b8igdd',
                direction: 'RECEIVER',
                transportProtocol: '4yxyhxk8zkze54nls2704rqc4z0m8qk3yignh8wgch2p7d72ymurgm4g00mm',
                messageProtocol: 'xy0divku9vko5vk9lbmsr87x79l68ex6n7pw3r67f0i37o52r29v3wkqnbi3',
                adapterEngineName: '0rdf9fonmoatfzv0ovzebf5oxlu5bjlpcdf22pm3s5yoyht9n4sw0ip1juhkt5vcow0mfxgbpk2xmwikih3hgc4isbp9t1deoy7nox6cfnzk53aazkobvfn5zbpyxl831webgb6jqqdnmpj3m0i6zk2e49jdgxnh',
                url: '7oky9jnxwsn9ej9xyebgngzy7p5tqpfgul9mrrukumhk89dpdz44wtybpcrsquyy2nars8udeluny7xszwudbdvpp7z7ozi9qro2gpf6cag7on3fb9wia6n3krb29xofl810s1ys0xntmy9daoou8odb68uejavek9c90tus03b76vo35ez4yl0f3uruev6mex1v8mdbcd9vp6wzvry68j0ocfq2cbxp4fypo6olhpl3vtgopch1r9a4rvaz9hx6blflfj2lm3el252l99n0xac47i7tmr9qemczx3qimo8ioz0ft7mpkc0rx553q4f6',
                username: 'z0ip9ph0twc5zcj11nf472jqrboi06c775wuml2lslnn5ytbdg23frxx3sf3',
                remoteHost: 'coygrzgit778myllo2g5vzzrzhelg92psv9hacdra5gt0n04m69axuatckdt3to33qhckoyxn2lmk7tu6jxxihh9rusnpqsdehi23d0va7w53nrlwi00zupm3hortezgqxuf42sy3r7xs5iohzaso8mhnr5m35h3',
                remotePort: 7460002898,
                directory: '5m1soarb1xs1j9cceh87dykzic33bg22aew31svgpc0794kn59hl2k6lqmdpg7ppm22jze2uu58oalb0yy9k6znok57dam5t6jo90w93yitr831qfoqb3d4comu0bwwan5wonn75onceqhvejpwqdlzn9vpk51kosxyxctsvzrne9bg8o0d58t854r1wynx1jcnr6hzn1lqpi41dk38g11ycpir4z1kw8h027kdg6qcz5bvha5v6hbli6rvkzlzbj2mbd6vet2hd8qnxqb7og0zvyqhk3dqpy79repznndwtwcr3985ayvmqp8ao68tvlyrnkkgc4la61rjvrpitdh28v2o98bp186h1glcmo5u1ae893x4bfzo8v1j58ienm1riiwli5ujk023cc9z9klq4jggdmop1rwsfzuu7gplu89dr4u37o2lh5gf11viqkw285xkfs6dnfbm2eglcs8kup0fip0mvzwcligq0fk4b5v31jz7313wa6dasagd4qxkif3uz8for1wef5x6s93bt1p0h1b57hsk3hxyt218uvzd3zytv15854x7yzddcmf0cit1wq2qru8bfv15q447fdm5o6m1ssfckci8lee6sz791nvusb1virzo54u7h2ivn560u1cln2ptgsjzfh6ak1ioakj5wfp6o0awtzk42jb4wnhxpbhnr3gh1somv0fn3vujw4x90usbv9numw8rafatqsx107ml1p7fbfvsphw43lhkbvuhwkjznlluxpa7d5sx2j80gyftcljeymjadpwzcoprop21moras2tj466fwqfugzhp6qfde7tqip2vmvdgmhtkzkx3gosel7klin47vi94tcnw890gw8mxe9xwzk2y4j4pedklfvdkds3a2l95he0j881944093z376zb921g3qvsa3dns8fl29jy8xkh18tnaaj9rucqga0tze6emeadza0caaxuc1w4mr62dxjb5zt8yiuz3jj6s7i6sv5dd1ycnonm0yct2p',
                fileSchema: 'iwu8c08uihahgom9rki388hr7jef00311ryf41tsowt8s8d52a5ab9jf6m4g50ibkuznny1ufz1kc2pfzzdcsnus3mh7fs2yuj2kt6tdbkk6hvgi2klzgkz5pqw5g3kyjfsdb60dqpqieaoesxoft5wgvhps51gaomsbvtfd1ojr4qcznp7jja7ypf5t1co7eye2p43h2n88g8574b17o12w3ipamvdm6ed3uz702l9qi493ndmmx3syt7foq5pqkc97asd05omp1iu45gvksepq97bdyfr5kjiy5gvyr993fhhuq7bxghj90ic12qj32y4l3kjwlvxi9ba251frly3g2v5lq3timp7eu69z1jfhfy1ec414nyghztl2qcs0gt9mqpumk2sqz1p20pd4eb5w7jkmvtnwuf0orwxgor6v04apc07y9ftd953h16kxmmd8grz60p3bidu1ml1h4s5rutf5popugwv8yrkpgar313rpw377f3immtyibfv95hjktiz80s5n702vmdnoptvt6ahvzh02cjtobz7lxhvcb0okunq9leiss8xcjyk3wv23pn343vurfkm1vwm3b2hde9xlhi48jadkg62pai7qp6r1mfltk3ssgzcm52ut8u6h5c3cx8ucuzicli1sdpftxci7ir7b7zrnt9wvn1ougi7m49d8fomrj78eah1y0byp331tyxmznpti3jw29158sj6vzzvsgz5ssuq8sj33m9rczzsbfupgg5izyzlkmhanrc2npwtqros85bdr8wm1rgvhodzcnt0hvkr1s56aqwpw2exn0drkxqgpdwq0hxfe1cp28ep47vrtbsbwrl45zqh34fd5fx9e85hs59enypwuv5hmakuu7uomdk2cp4as0l8ij6lbnzwodnbtqcnyc80z7t92sjws3uv7stedy6rvt5aidhqvul87bipzxoz41v067yjch4uetaikv4s56oh0m9xz9lpjvhbu2n7jm88a0vhao29fpx1cxe7x',
                proxyHost: '8kp3hwvtyrx5z3uxe9m1riwuvib48lppt0e0zhhl8vjqm4mubegiti2er174',
                proxyPort: 2973665869,
                destination: 'qqcxdtxbieyxrpfg9xlwrhgq4cqvgzsodkixwr50ukxe43f0jr86uc9y0aqyboa6vv5yggahmxwmipx06ln3c4nmnclfn2ejwrpyy8jzx7ewhvvdjyq11ekporvb1iep5xf0r35hqq3alas3bygnqgwfw07q5srs',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '488apakxqri88fbupmx0u1dan212sairpipumu1ydalthhs6lvgdnqjdcba0orsmozp4lvxk1dmb5di6zn1b50j86njn36uren1w4ht3lrbncoiwfeg90p0lqypukue9o4xk8mnp8rpcbrv06luq1p593oyqpoav',
                responsibleUserAccountName: '73lx2eo43jghfthn1x2i',
                lastChangeUserAccount: 'wppk3kn1gf39f97mp11i',
                lastChangedAt: '2020-07-29 10:00:01',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: '85nx4f8h14maes81r9jkkarlu48d29k6dq0i144q',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: '7ymiwmwx1m30qamz1r6rcw23jx7z4j8d7zmqqromp4tph1ljqq',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'mqvc1s1mjrl4eed6lmhn',
                party: 'eugc93bsdhox6ez5m5i9z9bjujjk2rlw1xemvl2zsbhjixg9mz8zxznxv5ai1p7jdaq125gow4izgge5uogegh01fvva266qxfuq0wqk6xxeyi1kyxjaewvu6b24d8o6ffyjb0c04xt4gmcdwuagr8autifzqdu0',
                component: '9zufrj8w8aouoksoygqdua8ugbsm0yxfz77gxr8vkd6f6omlttbgvvx6k9v0qlme39fi3gz9ihu749vaxlgx330x1osuvh5ysljvy8n986fllm744d4f8kdrgmy9h72xvm422z4cbibqlvijw21g6qiqwx9brqvf',
                name: 'y47qkyjuahgam525z00ck4fi68monymthsnnnl0smv0aienwxb13mba7u2qfkdniv1jdmey2gfum2vyox1n5g7u69s0kqr1j75jrxwfvfze1w2wii5thqyr12ljig0l8mpm9mzba1sod9hlnd3sxx6ks5ckbixe4',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'p36l0dcuwjoaak2sb53qawvmf2n60qk5djs984megikcrny5kyndnp0eg4ruikrrpdb6e037cjnt5do2ie3fzcz0g0s9e1vnay8mke0rxn8s2kkgufqaq14ixbdvtvtwxndzwk53aayyp1j52gcx3ncxtq0yulp8',
                flowComponent: 'k3jye8yopq7wbswz5op7dcmla6jrvujazwnruxzr8jiga8lns442ppjxpu8v6yh99y6k15o71i2wxtswi3zn39jpximcufa69lp125veed9gxwd1yc99ozxp7jspqa2r018gk25oc22y17tvkvzmmgfze4mfw1rf1',
                flowInterfaceName: '2a79qso1tu6kgzgocps177jvyzqqtrujhra9qj53l9z0b2pe0mccli51jgle4900jhw84w0obm6ds36boew68z2g0m084oqael7gmddibm7byi3jk56uyzsmv4xg4gapzjivo7g3uvdl76otmztvfxxrsbsspvp2',
                flowInterfaceNamespace: 'kjdm1jm8xfwl15feqnv90caz2raqf5m9kkbwd6kawgpwqgz6fgt15jfm3u4aodowqhro7a4tn1q23hnkyxqyb2vlryl4n4liqja8da9x0j09712sz28ypkcncvm316s04x62klhrq7fvd5ovjf2srag80q3rodre',
                version: 'f77nvuxlabkf389s2rgn',
                adapterType: 'yq19zlnptilq6jnv4362mwd2ewiihg75bl7e7g07ax2y0fm6ln3p5wfhwihv',
                direction: 'RECEIVER',
                transportProtocol: '5033w9bbo1iuto5ovedrad5e6bi27pumdifg752j0mdrl2jkmr8ubjlswfzc',
                messageProtocol: '4f68daccsu6hqn7f1yz3vvhnsynjr9t1mxtx776idu23pqeop68xvwke0szu',
                adapterEngineName: 'tk6qosvutopftu7s8tyx0tq0xny9qnlcqimy2x5bqt2drshlc0lwz6u2bdaczjpzzsid3h33q2zc3nj494tju2gcmczk6qehsoeqxrwaawiiz59uozy05wparsb0syozgkxtl5w6lbmgg6t3yr3rzw93s2muln51',
                url: 'ydp4ovw4vxjm1atzzcwizl912s6ay9q5pfkngwn558ri39n76setxkp3gy6fcyndda61tte3iehv1zqm1f161ah4wllntqaubc9u97c2grom0g4jhei7aem69yi9hfflw803qt3jilrj2j0p77qbl974tsv403rc1c7gk4x1om2bxq4n52sbqczs9a0mqpum5mhstmq6da1ljp8jalqoc6u1d7cuijqnaogf7pw7vgrjpuxivrh4pkp57qfqv9okbuq35vc2xlg6ko1a07fdp5lc9sg7pcov7rr180vlw3g9t5jjnk7wxm7gzkm2f9r6',
                username: 'inu33f1l11etb8x3ylol1d3giwpt2o4gd396ntb0z5nd7vidtfqoxivl86g7',
                remoteHost: 'o5yuzcmfk2u3fe344x1zsw4svx1fo9vjefsbk5cwsu3gn1pvik28ituj4kjutizqs7iow1zt22eexp9qgd8hrsc3z3kplixz05yk4qd1lih5wvcspufge0nppm1isz4kqlrsdfeyfurg4ws4lm3ep0tf0uen46yy',
                remotePort: 5088754744,
                directory: 'wsdvzynocjfjxq17mu6u6oxee9cwom5g458n0oq3tpb69sms9d5gag26y2yxlph1o91acultglkciwle65nvbyr8mun8plq56wytstrv84ovjnlr2wx202g8buhfsgdax2g0npmcb2snlkjkhykytont6ds9uw2p5mzsoo73rxw6y3ndr8hd454rhpiikwsncci8uje2lzsrprwrvpxystoq0xb0w5shninpqz3zvkueaugo1jk0vqfadt41oz5jj7tj3anrwfxh56evo2zzaz1pw60jmtt1y3s7mmuda9xdws9gk4alcngyz2l6f6d3owzy05tabr2ephd5q0tw3efuezups0yw1c1rbvggxyg6z5ww21rg1ua50tunghehzahl4wkddkq78e5fsdb6h4wfr7qytyps77qfesha4kjx595fpx4g8cq942jorre47n9r85b6b0df67w9s3ewjg6rp4e3b0jztfmfu8op2q6k5ad3ka6r7zucdrkzzb8zgetbz8eigvtry5ctjgfk2dcoouawyivhoshtlx7fetwfliqvp1kknrt9suoljoxmlb87vnvcisfelh9ji0g1pte17px7ueh8nz0d06pw0cyiklnga961gho0czjiyja20qx8cwou4z4b8p70yarh0zfui8ybrc6ra4yny8rbuxvoxwr0yxoxo51br38kyowpbvmz0q7uqq1w1hk7wmcsmnpm8ybvfsiufh0emmdowpw50fkdw3mt2wm8f32iycneafliy5jlqtb2va3tmhm8h9w2oa1l0k9mb1b6oto9k0kw4asxf1h2w3br6ooovxud2vhee00dbsnd0mkdvhs1jktoaxogikatfi7fscxcgoxpmght88vw1zbebdn4koqgq3q8kqpjylm2j7qmg5jtic5a1exvotnkivoi1ra5qesgqqq96flvl6q2vp27hb8fzukbfi1ebasf2z3f6ebbmowidgob6qt3r82f5ciwrkq8rjst055m3df54ubuppsd',
                fileSchema: '1y15c1a5ptdf35plvmb6zbrs97wjpcwwvetgjouqtvhf383pii5wkipqlt5xhmnnsqg7w95xsiwaoitsdhj5wxgourgllvgc1cwowtoilc7gqhsu9t2jgsl9ewk3zom5k07yf5gt6m9goxf2bdi53k88e2cyy3vbqw7jvsm47gbb1ygvqk2jj6fenghss9fkck0cgk5dc8qcit8742ffxmkf19ia5l8mlajho4fk9qm4ua4sdaqmfmxqg2f3yth0q76i63b2d4qeb0r3al17cwglvxop4xlf5g3u28e2pj2owec4ohp051cxynx0djyawt06sorkyzw0aov8thsk5kkoim1rjzl774cg23zmlmcemdwkffp3zgapcdvsindgo522pcy43dthyp0f17j96dy9x489tfolt715cgv9gwo4jltlvygiyyn5ul7gadxbrhj480v3rur72f5gahkyg66p386uki7f9gprted4hqofu2oeapja7hi7vxwmtdz2f88r18qyxgpg5f19xavpjfyvlmzo5bi4hflbnybftxqhvgut6pw2ljxtsabnwsb7j9bheym3bz4f18uzzwrdavqqbgbzaiwpz9sinql7barafzlvdug8mtpcmaxqwx4m4r7qdm2a58wbjmqts3org6cyz40zxvpqmnxq8spuz2oo9tx58809al8gev7t5e8xx7swohw5njb43tgfag6sugw6rvx85lwes1ct432nrwj4dynuvr2e655b65gf23cxrqqeqiafnd2r69co3kelp5fxj9sjsrb8uibe1dl8mg78p9so4uw2kzsfl1k7g4o6e0b7vd07txonomfbl9rssnq786zc7ae6l8q0pq4tuqukhudzihx62uxncnw1japb9gnzykxviw1pg35xe1svlhjjq3o0afygwg42vuwom0pap705qqh4m2xf3xt2fm6595i2sjm048rtalwcnrdh17hina0y3z10gzdmbzzyxiqyeknsmlt0cz5lgyobzku1',
                proxyHost: 'au2dcyyxjipiawtmlt1qo5wuc9cuz74rqkvtkwowi4pc8an02ihkeekv0fdu',
                proxyPort: 7199118176,
                destination: 'nkiclxxlv01i6v63kmslkstldnhmxb7pa3hzpgd0vx1xr8ao9y2bqitnw8v2q1oehbvwrzp5axo134y7dmuoakmplbd189qv9ki7ujdwxvlheqv4icql5r1lvtc3x9dzp91fefthqnob6k1i64xmr6wwxug6l1o7',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'fbco8mh4rnaf7kfpb94oj6cg8m5c01ygr95colodzan245z75ikmquvug7zxtnrfa2xoi790guyir01qozuxbs6khyqagjj4o7dwtumrj1ufnfeqhcant7p671gmrkj9l2ljqbtnxs53nsj3um6v949llimrnqns',
                responsibleUserAccountName: 'rnxyw1vsxf3parm4foom',
                lastChangeUserAccount: 'lhfqcnztaq38dzcf6z10',
                lastChangedAt: '2020-07-29 08:04:53',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'n2dyu0bawum1qar1wq7ixnkx1nbwjtzfylw7ymio',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: '0m5y7u212ah369dj26dpesii207xnt9tvfwuwrgtp19siwxd3x',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 't8fjxxjw27ee771gtltb',
                party: 'fson3m6x3wlvmiykmj2n9gd0fgipafz6eki137b53qpln2mg6b4wrmgrqj7i1gjo7jagpd4rr1fo6sbes2o03hpcum1mf7f27fxyegfa6nv1hlqgnxlgt4l8e4nmkxm9z2g48y02p3y6z05hbammdd958b0gq3l1',
                component: 'uem0mhfcga6uid6ehzjbkfbdt7nvofm9737emlkk3v6jr9yxhoahcq6etwtjplynygn29t028hyojpqzygyd69pi41y3kvlz0mod65dna2nop4bwpln71orczdbbouv7qu275f5q1vgr725irhlu0m6k4x9fgblb',
                name: 'oipnmnzpkwye3er8w2kav9adcgul9ikwq9t7beoau4c9krymb571yn1cs1k8fbj0srq15i435oyq2av0pumm8f97pnj15rg0154stdj0nlqtzwuka1g670769u1br0t9mp4octandrmz4o4fl2k7znmm3n6pl360',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: '5co5ep2byww94iasuejx2urbb5fzyryn83jtsptocyo3y50kc63ly7er53ye3ke6cf9shsjsv4xt3cdx0zt4h18uecbepjraj3wr9v1tqkrjashdrozooos2x8nl3z49dn71q5k0g1thzo5aq3nopb6yfnc7ladi',
                flowComponent: 'r5whhj3cj31478fqf6t8nnstpvb5q7me2kfrgodoktjsq1vk29v05hh94fxpsviuxlatkf13mlpwlx9uoen44vqxciec6sjb8oue71xwq1wd2pcv9m6e69luozuy21uhaov7pg3l2ogickt3ul6bfbsla2ofh32y',
                flowInterfaceName: 'izadxzub02b66a50gaknkxx9kbyh6uj4joox9qso5i92f2mxre0adralc3zbdiph3qlvas3zucs7unyfllr0bgd36xkuz2brhn7mm8f9tutpnvsnqpspld2sitkbni4j6bw8uvaskqbja77xub0cx5t7h688g69y7',
                flowInterfaceNamespace: 'k94dqzjnhtep5lxn2iaipwbjrb4glybx82itz9ojwyxauiu7hl2mqm5c0aryro3vtage2q2miqxinbqw3ilbqggq63pxfdq0wptgi1gq6a4j2zinkolgj537pvyqlau2wsyfbcxagw6u3g08erfylg8eojz9o3nd',
                version: 'cn89t8jeqdu49xqkdmnl',
                adapterType: 'aaeeiftn58jeieecnrgcv7t0w30zef9cl9rrues5lmub02cn9i09cvwi44w9',
                direction: 'RECEIVER',
                transportProtocol: 'ss5zltlmysdmfqty0few2d6pbn6bi727bq3alls33p6esjkgt9fnuie47bl2',
                messageProtocol: 'fa251fqd3l1rlxhhis7mxyhjlhud6e12j745o8t8dnu0m8110qxp9pyvgn86',
                adapterEngineName: 'czi40jp94hnpoip5gfwbwrhqdqbp6ksfkqn9wayon5vu4lexmxiat1sb2yqec2fq3nwzihhc36e595udmhy3ig545b4v89v3b4pddxwhsgc4j3q0phvbikjpdo50wkhuyzarpcumn1a26z8xuoscexxdqxl6igbi',
                url: 'uhpyzzniljp21dvamudx7x4sf15ze2jahj9v3tmelwouepwqxw5ez6tfoqh3mrsvhbsuwrf8bypfpcfao95re9j2eh4h773igcuqp1bvg2ogv46lhdjqmzdh84e6tm97gzcyv0gd97jihgjl539g132zic5reim1hvuc6662dmmlgyi7y3lozv5ykvns3paj4a3l6rce43yddcnh9htox03h6t0h008gtxqrudzcqir36sg8c4tk9lq9bat93cv404i5slgt4rh96tbahyjrltx3fobz0yyzj39eoe40nbzsk8r5cavonn7g3615s560',
                username: '4fpk2obphfitq5xqkb16bobz0o8iwwg12xvahzxp88ubnw0f9c5wqb5sc4jl',
                remoteHost: 'nl2uxea6spxllvjwgzhfnr4dj6rj37ahm478zp9cr2nnh3wj74x0bkgpybmn4lkl3epm0vxfz75xpfzx8gdegdd9iob5bdvni68cb4idddszgqi0osvmeyi5bvmswil6vetmqx7inzi2fg8crswpf1f6cepfbll4',
                remotePort: 9461183309,
                directory: 'quebgtimran8ykmf7kfhcf8nrnldzztsosvqa9uc2zm15051b62yeeqs9g52n0wacsbf6b25usnb1sh5jo8dhljg736924om4vjiouxwu7i92z1q0lhvc5q79dgzmev6vsh9wflynut2f3pajhat4d6fpp059kusy0se7ky7exhxzxgtbwwpbnqkg69ujd6fial76n7byk5mn5boemnowmofyt7k3kjvwn9iygiyuxm3291qdgyg5bds72ewb8qxsne5nqsvzk82srj16ebis27morx1k2tgtztyyxy7529pfkem2jelfyvo8171drqg9c33dd1o9lqauke8pg5pdlkd7yvw6kqhms4kv1jvgz4r45s3exia46871ywr63lq3m5ndmlvhgxxy6c42trj6poogtoh33z4g5dxwbdeclidqvrq0ik7wl97dit0a11qvd8aqsvf73id54kdk0w13pzem1ibt4zi49oqv7z3rfqduij1o4hzyjd50u9o108oipregfoidn4aq4h8xfwb6xqj4jit782opfr4zo9z27laeeagvrj7jpsrhuyhg2yhau5u1vz6drpgushvaq8coup0pv66qeykzupjfq4a78wpnuv9myrh6byp3vh9gw7sp8ogwm29s77c28d0ik1d2eetc4p8038vly9ktsrz8kyekca357pvssvou4l3gntccwhaech6p2xzt6qj11d8stppfubysjbqxultj3hcj3v9qkb6xuwo1fdx4uj2nt2kswo7ygcpmmpjw0jea7itgutejvphe4cyfr592akoiem4o1lm6y9e36qyzxo1kdh4ligdv77dzoumff7rlb3589b888vkrqvdrx6ae3cu55qr4pdgvba44miqs9hmcvle9ecbz8p4kd206myj4edi1vcv1hullaky38cuhz9ktbojkj2pb80oneg091vsqy00ahifh9lwfrnrkg41rldppgu9we36vrt63pdoj5wesmt6mq3ehlcr606l96a64jxy',
                fileSchema: 'lx95o1pec649hfhh0rihfqh3r2nbo742isvthv9aw0hzed6675nc7i5q989a8gg4zfnxcge03odz0ll1ae8g4an6cqr4vf0dwjzdgi2ke0c0pp2t05qeplg1vdye1bwe0xro60bdg0e7cgzzhvi06e78ey1ef7y6kzrrnso9uhfxcr9o6hnenappv6nmn38xgw93s94rcvyn2rljlr9mqs2zzay8pofizow02y35ky00rprm1q2f51olwe3lh6capc8clfsm4velt6utfpgl86xd220093sjtclhbxzh6321npmh92nzidsg9kfpdxa4vifgp0jsxf3hcsng30zblzi84ovz9wf7xbem7wshi2xce18h872ham5wv9whguoka8lxoctqaxhda4l90uvlonkvkklb61pp2g9via0000k7cie0qciqo7qrhhdzkdxhc0oqwobcf0cacod1uegzytrahylr5mcs1obrojvkoxmd909t5322ox6x8vxmypc123bm5ostu5eo3atek50gcse1qnd5ye7sr6hk8ms7utyctdwajk5ekwumqzgb4km26slx4dukxndpr6udmck80agizw0yywfaiwc7j54crelds713rpwnyxmz4w8b80tzmerrb7572zbryrwf4e6wdzboc3oi0tct2pz08i0puxttglma97ik2ru2wk3woi5glhd5zk20t6q0wuart3tr4erpvc79wmhw91mb7gbtm69h7kpcsyfi9jg08mbynpsg2b1jdbvp1avtxxwyju8ypq09zbywk95jhfca49qyjh1agcuwa3vn600kxsa1u7y4l58qjdfxwz0qqwtws3yjbotd7n86vcgyhkrw01otocj2f7uw0z018zb71jseot7emyj2ip549tf92mbsvraqzve5t8qrham90tbd8tm2rvj72bodugnz0rdm1xvhbzv88ecgxux4nkcksdn4tm5hr4t79xpdzhq2lvy89ucbafq1dn2mzhlcpkykxnhsuo2m',
                proxyHost: 'fqldmuyqr3dah714i0j9itzux4bjnmmfhlz67howzh5svdmw0acwb3qbuvzv',
                proxyPort: 7473489188,
                destination: 'hhveln67dsweee1k3x51onacgfr94pzv82wp6vbq6ddbgx2qh1ilek849mbmirv99xsdsrnd0ffz2unlrv03wgc55szbgo19fvw8q4dfhujiue1tqmyevrxfnygady53u4q21465nbs21y62r2m071ll3d1q9lvd',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '8xqwfyv0o3fnffswh7n4khm027oesr62alo6nwibzy1uwoz3a1em3jr8twei44r9nc4cfyh9k62sxv35e2933h76kedo2r42fsztasf6084y46b298mz35kfsrgvf98r1qm4zd7c4a9p2cb02de2d1grpnfuqq1c',
                responsibleUserAccountName: 'wptrx4vjrby9bnd7e3xs',
                lastChangeUserAccount: '3h9mnn3hjchse5aizo9p',
                lastChangedAt: '2020-07-28 20:56:13',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: '0d1pjyu11z74obr3109of9s1exxk9netz97unf6a',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'ue0orcwtij2r4s1l1b5j3yyika4d3ou47qfbz2fok5xp0f81gd',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: '4p96kwt3oddco9clu4cf',
                party: 's41h3oq84ng2idp40fxky7g517jdsquxb2gqe9cdt38adxdk60ut771adx3tqwhrn0o754lnqq4wkc5vnzuqzjfiejwhamjvfok6r5ng91b83zc9gvdcp92qcps8glm8nysz1wh9h3m9mmzbe027ycrsrlywgl64',
                component: 'm64fua830yphatxhaxjsi4x8vm6n1l1i1wgn1dytpa1zzd7fba5hqy1yh30mggkd1i92tdnu61t9aecpd8101719d3fhnb7zu34zm4j4c8w8svuuxndjtwigfvqu30pnr27x7llau6pt6n2woy78xpu4fnnje2s9',
                name: 'cpne0s22y5pw4yn4rs7mz3iww3k58wyrqc5j771bf392c5j6pgddvjf4wazobubj6o6gp3jrxl0icwezg5850cwpbj3h2zgcze15p3jyvneyi2buih4dui7uf3txxjnvsyy9s1dro49131o9zke88ts6te9jbo00',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'f01lqc0p0vgrqx38619jdpbow7qezco9wp97zj5sqmyq1ketq2h2gbhrdswt0h1x8y9ugebrp1gcyib15nm675976d12d431rej8c6eemwnjw1pt9ls3282n79775ei5zw3b84bivr0muc9oy58vtlaf9t7np15c',
                flowComponent: 'j16zfu2hrorkb4oaob0evozybgd4ntdxjfrozkywz3ejuew8c1b3ls0ly1tgqix8nffgrgb358bfnlc3m1avul4cwk1ncv7pd5yir5oe2dcc2n5q5lv6odbunj2sithx0lr225eauh3d0a86268x56d7q72zgcuo',
                flowInterfaceName: 'rtryxi9ujq7qa25lvtcufm2kcrjuud06si761vrlz6mondcgt6t480lbof6xgbjp9t5y87ja04pn76pvlk0sgokawgngl7ci7ukcakkcm3w3ldp4im5fppo60amnualun468wq4t4rnwyu22bq8gksec6l13ort8',
                flowInterfaceNamespace: 'lbtk1we7xestl1cdnzj1juf5zp4yq8wavbwlvzb1ex6s75cz4i6vkcoi1h4dl55eg1vomge29d8kv3ktla3aox663mbym24k6sbaxkw41gcilux3vlzgx3beka7hccpbd21u687lvtm5htxbcu2k1t4s64r3ih36j',
                version: 'g7znf9wsna4emo14brli',
                adapterType: '5n89h5gb5ljfsqo9ztwzncq3wldnremupqc3rxc59ymwh1anfvp0mjm2sazy',
                direction: 'SENDER',
                transportProtocol: 'o2fnd2kv9fae3emfx23ce8zz8h1frgr9a80brtyiwjhha0vwomhdd9nh041f',
                messageProtocol: 'o2g7qmikph620gw15cb8gqpkm2cfp5kx18hg3fjiaaaiojc7lddb3zb5md69',
                adapterEngineName: 'f2wmgvm7su65xs14i1ws85ty0q7pffuerh7zc3t4dmxbg8xlppl0auaoi0n05g71d9wao6bw1zg07u29n80x5rvrqmpqgsc8zeth9o8lpm5uhln6fp5in3xn0hjnlblvsbbd0xz2lo0nb3fztvcgjg01ag4rs0mx',
                url: 'x65xuisynkcqmlmywwfuuv1wp06agck8i3gnf86dr77duerckyl6ow8oivx3wbykjgofbrlynev6q6b5lp6vzg7ae5lw87tucso5fu8br6zjc7algo5v09d3szh0vazlyg62mzqlk72zwvfaqh18x70g1ysnik69ojvdqus7ujod8fv3ru6hh95eoqr3fy7yq7zk9rz7urjodgeaamm8iefmcdbb0n1giw6mxmsw8pqw2a9mzm7ezfyvcw48kd7bmxad8s0dfywwxe0ng9ipzlh8q5lze6zonzs38qjle5sn7n2qwsxm79cvaq2zvf9k',
                username: 'czws26efospbu96cozwiujt7uojvzwvcjiyjjlhulybnpybytckgdqgbcxkm',
                remoteHost: 'p55otbojxqtckhlgdylrg7tuyoy882zd2976pz5t8ae3xh1v03z751oc11t11y2mhjdwo7t4tegzrfny3mo5fk1alu3h8nxmoyhdc0flrlex8kx0ji0hras5ppc8q9qt3dj2uuks37echk5qg8g8d29ame5mhcs6',
                remotePort: 9104073851,
                directory: '6mox5d58hwi2yvuq6kxrqatxp7q9fmeav0mqftc9nmzxe4ifzq68oav0pbzcf7ihf3letgh3rqg8jb0z5crwm9v9xmk6qmw8x9fvyexgefh4miwl4tva29nhvd8dp04riucsifu3w21vrafp0ybpbo9hdddbacaw9azzhndgfyg7jnbggrom14v1qn1wfrhvhsmncrz0zbi30kh9lz5wylcnl6iye33fdgj9cyehf7i6ofdfxsk6705jb0spip17hwfjsfmbbipfq88zqyf7cr0udee17pbnyncv41nstgmucrpdrarv6t60179l7vptf9hnvw1m85oi2j85j0dijotwavlann1sbmtnoyj9uvfm2s9ptls360o4snyjtwod3gjwdh61ul3fg4wqysjwfkvytt7v5sx3w3nt9sg1nngcayao241wdx7buroyjytsqrre48yiafci5lokqp03rgc4z164ssqri5vstpm9osgxlr69ifd3xwcwluec0mn19sxaexx1p8gxliwz43evhndylckzlzrxjm24yqt741fidjmhzv1vlp1zu5rapi6hr15g5w7drvl5406ab7wgzvrn5jikdcifey98egiz7cejk5986jj1d1y1ub2b90w8vdihg0m4ipkoiurj91lfzqux4qu5sje2pi4yx8hbtkx1ckapymkelift0saq9l66tjcfsuu0yhwe47s7k6fv96azori0ialttrxg972oxtd76yhmeb0jqn3ac07pfyo25t87zd7jvmus18h8tdyszj5w30666o9ve8xh2cxbu5e7y33zvemg7c9u9fa3650gwj4g166pfm029u7eaj1nieemyhngv1j3hngnfqf9fiyyhlyfk861ucjiimueietpv3rv30pv5uk7nfuv2esuh2qbkh6moo3d5lm94op8iqh0q9madvtnk6i5rmwi520p80ruj7psy2l5b53ty7170j0adhtmz3injyxd3kc31jljx04zyr1w1i3r00xazesr',
                fileSchema: '82hhtv4htx35rxipftyr7j2glvgkvp6okpsh73b4tnm9wf1wybserfxkdmf6rg0255u3o4ek6ou8bup0yhh7f1q89t3a5x1hn4iwt4qzf9fy3nuxjnmi4eqxg6iunna1byp1vbpje2nd28mn8il2bb7wn28ja9uyr2kxcgohm966np70xf5wfosixcyl5h85sadkcmimk4vsyljxwf6a3exu6bn4mskh0e45b4bq8hv4k2chofjch4tyv9bfpg3ynq0sq32ip5i3ti2fwexlgnpx3f0vhm24yc6fondjeha3tdvd3xlmhbp6fgxja14sts9avkbio5o4a826l1b2u567wngb42p1jv7qvxch77d1sg871vdsqtemewqxa7rzow4dz00s91y7qf99wgqs28443efqyvcaph8sbsm6l0lwgehgrcvjhz6uns3zh0cw5yp1citf3czf12ncbsdhrhp33w4djolec9pkmbsdvgkcyaj6b4i68t2tio14xt76a5vkxx93zqv32i2w9l9yvqqvxeg2710tvwlqnrd53c5majd6gl0x9zfhdqhzgtomppd6hl1sef63pt3y3j1nnahrc3ywadxmkvsx3dadfxziqskh5j5yqyxmizzvl06m4tmb3qtzsy9pntqvu9aklg5svf41u7s0i1c2fsup1adp7phtzb6lu60hx5w7d6rz154xzkzh6onaw1l9cire3yjw645b0kxqm2hs7bjpfnv2kollzwoetjhvvd7jrlxjbjw09gqqez3bgi0bpqa1ziofbm7vmdhz8e93jxa09r5ociq947vbf2hxowr6cywhi73v4vrfxlzkew4inhuj5adwny9cbuavpjx5xp25xxhcpk0r0ulzaj1yo7glz9tv6l6il5zhvkffungv0gbfftrgriwqpcy4whvxnk02acrjq4018v5qjl4eh5nqrk89qrs31nl2fkzca6kdr40tpstjg2uxdokdy4bexcmhg8sjucoqjvzid2vw9syt1zvx',
                proxyHost: 'w7jeukvc8ilbbvprtbhcnj6aitmi8wcoirw40f5lor8vpcv6xhthhkwgywsl',
                proxyPort: 6088434374,
                destination: 'l4a5x8n0qw9xb1hz57jaf9cr125j9vjwhwsfd24ht256qua6oy35hff1qigrjlag4stlcs0ui633d0xtxjzmtxfgqye8ys20a3gn5d3xn6dkjiivq7rqcmz8j6cmgf07pdyuw60up583fik2tlfcv0x73q25mpda',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '44q5fko3ekpes6k7jbbubf9yslhbig3hpdn56zm8c3snp4vy7yypjo9gn8ylonu8dow64hdia4bswmontc43ta3pvf2jfaik4culrejrjicvpylorl3ghhvjc8mn337mvb47o24lekgkaonj6cabnix4d836xesc',
                responsibleUserAccountName: 'fkfflsp5js8nkwmfspew',
                lastChangeUserAccount: 'i7oz3bywu7g84rwubq1t',
                lastChangedAt: '2020-07-29 05:21:47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'maq92u9zeprnsv7ceme9athkfhc0f94rw98m65l9',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'ezy9rb69ckb63bosrcnw2erjdg4ae6vr6a1068vhxsx7wbexzj',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'fdf8sr38ur8wrncfjydi',
                party: 'to2vp38oawv0auqtmmsfm0522n3kxf7qir14x4c3fptmkzyy1ipc57wh3zbs3n77u8n46qw7p4rumj2gygfxrmfv5s905mw8vfh7hftwo6da7xqwsyspxjyyf9ccv451x1ximzy0m2bw2jf5njvpbix9wobpjrjz',
                component: '78yml6yu24ivegnqxqyyjdjxvx7ylkqekv28ttvp95hhx8se3erf4asccfpj1ra1qrpy0mmaaska08bnk67q53illihldwqhzbt7nluicby1gxqkdvfb1ozkyk4ko3dv5k6iu4qldynyljytk9paifo5fkdqlid2',
                name: '8kszuic5u7cr2p4timtluk8xpev6frr3d9f33lqsyrfw9v3c2mjc3w15jxmh5euhl38kp1jvyu89636olu495bqqiguyqhbipq7txx8hrddvof76ytu0hb573ps5tnedhn7iiwxnktuax7qhjsx1lya9ghttsflt',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'rcbmde55ah7nm85yrjsrdo7eyi3fnthjxdk1bcqbo1xnahog1qzox6zkb9riotrcbowg5j4rgv1i418ekmbwd2mhrruvaue2snmmoa0mpdvwdzm0v93netoc8qud2may4zbt64hadia4qjtb31twx4huc1s2b2b2',
                flowComponent: 'go5uzluhgp0xx4zw715jpyrp67c6tqw662cfcygrpxcdg95w91xu2gkulsjveksww35w2wywj6ya7yxgv8fok7iv2ehkq7lqwu8yildfsyrz3fhuxw4jmip0z91nnr29ld8e535cskv3a8zmume16mk9sgfurzan',
                flowInterfaceName: 'sr3yhe30kl84182jl74irix8cmz9pyl3wdl8ig3uojwotpeegmkeypkm81u8j60nwyqmfa21xgqw98yd9xemm7nnu3ngogef8b1fb9sysjckdnam2mhr85fs35ej705m22atjhas62tdd8gcsf7spw2wyncqfboa',
                flowInterfaceNamespace: 'y3xhj642m79u2y1cs1a7p8fkcofz0kghbt5frbsqzu8zjx5niteu6ik94vcv1og6dv2kchdbeluf3ipjvdw9vfzsvq4goj75zfv981iwax6gcf84cme06gr804npwmj8wy5gsnzakyutn9tt2ctu1gsb3j3ool2c',
                version: '5scpkguozuy3mo180tjqc',
                adapterType: 'xduoh230ufm35h7k45lwoa6mz4fqry4ruynjs1kegta7idudc3hwd2pt491w',
                direction: 'SENDER',
                transportProtocol: '23aiu5bj3lm66mod14g7blxfnfbt3ittel27lzhouzafke3qeei785s3sc5e',
                messageProtocol: 'ee5m21agallkz5q1520kfsz3csgpuats3a3yjh9gtxzrdfv9ts3p0wy3ffw0',
                adapterEngineName: 'gg940vte6tyu9zk4ir92jk4dtc967ots0if0skpl5fedrp76zb561hs60lmvkinhtlqud5cl2isalhqpi63av3hfxxarx3yk2mexbvy4ax1iao5lezm1nghcsay18mb7xd5dniu2qkj14c5e0j4d68kjqk7rr9bb',
                url: '763qy75sta4l5eitlab49eor6epdkgpf1z67cqzrdolma96h074gryz9hg0cqrk6x7npri2qrtmg11ftazxgffsywpnd9kz32ntsbq6lv485e9vy1a6e5bccaipnsw7c2an0x1oxtnjffvdp9mgseoxexmw8jh5g0fj0m1k3quhwfgkg38om5s1c02lml64r7sdc7f9738ya1fquu0zyz30ezv4xppvf4mv69utsapep7m3d7wonkb1cv6m2vjeq2ssj91xzsvvviw7y4uprnoh9aj1wfsnly0014rnlt1hrnfdjgfxm4926bzagdyvx',
                username: 'la7kr5imn73oy9lb9gmqdyqr55ou19eaxw8mig6f72ii85mdmggz8uel668g',
                remoteHost: 'jjns2yryng8xeglamnquohdq98kt0r1ra7574okaa8qgjeix8fp4oyhkioagilyasely6ns9wwe97p3rhyjw1isx5022j9dmvl7w0vpxbw9y1488wtamzvg09hgcebtjjkgkmb8vfsznkmppc5ciodsm7mvqxm86',
                remotePort: 2885569424,
                directory: 'ro48mf3c5wmywqhqoy458oa5nvj4o49m88q3lzioq7bimbl3v1p58iomoamyprqkofwee8tnyaf0hyrwrrtreimv4ekvot2lfcmj3okx0la821nm3siw9kuarwu7bu6til5dkfgnaki83wa8rk1giyja72rj45ou4rr42zvq3crtdshwxgbhiux55s4ty6jvoa0zxbtriuysb39gscwqoid4fj2iepmb9rxko2au0916oc9uy9r0zc52jwwpt2az13ny8v42xejynznqcq4kzb2tdbopv6lqnjudkksco0okam9harj5opc4aeghfx0drplybfya3hocp5915koj9i9r7a1udgrnknhwkfy0apk6usp94lfv8xudw0uah855ibky08loq26jmzndw6xwlullre741osa3zqzb79xbyq73g1zasxhpbqdsuaqut1ubvx7ib7uoiabsed9mww3lcvhvn0umkf2ylqxe0xed1jt33pvfq5s0aayzscpgkwmlslb4x5qya32lq78udl2ym56w0km9m2q3qcuudwl9vk6k7z1iux9y08zrb43o30muelz04nr3sdgwfnkgdlakhh75zx75qbt4tx7yw0xm7m9i49o511f2moyggh8o05ax13jwod29ha1uvwr4ao94y93w67xfg33crjxaxmvkmhgz1y5zeh9lsawr4k4s6wgoge9jumdojk3y6a970vx02p48b86la5qwirp09trv95p6coli46ygjy6jinglxlpxahcjt19at7zy7zohgoc00jwpj70ofswt7c4ty00j6g30wikc34m0utavro31gw8bm9slob6pvlq8052a5vg1t14dg0ghftxbu9w2j6wdogfsfwushkex9hekd83zrd145gd0t22vc1qo5whm12g6bhxiuiu57tcd72u9xg8ep8z7lgmy6vpeglcrk40kajo7aqs84kghi14bf1v9ofmj1qmoy83gpjpxfx1ofm45x1ntdw9rrwgs8xarms80szt',
                fileSchema: '5sr1qyau43ra54ix50l81536bwie84ya2lqfoxe1ictp18ogpaquokxtx531bj7dubojw98ha45djy5lm5ndtztpd1vzkij3ozl3vewgg9i0r33tq9nwvkhlf013qt7v8kv5nc7nmbc0stngwtchxnngjpecq5u4nobiolip92motkmeltkli93u9kxanulum3smw40w9a3uvd835gkgb6p6vqzsixhgyajjyyftyghsg7rbyyxk9fxqal3h9wo2n3gbc1lj7wfpq1xz1kkrt5ex7pzv5wn7n9jtzu3l3bqv32u5vf58inszi396vr4d0fmo9jhqbsnjohtow6x528pw5pohhuooshs32uex15ghetz8pkhm6mksqzg8f5phcp3ngk5blqiwcp4msuzrmzedxvpsalxnt1qwkfmg1kdl66jvzhbbs6hlap9wu5m1go8v698cgpjry6ez663qsl5sbshug1pdonoq6g55kyeydbfyevc4t1wnmvxj8y4yq2icidu5suskemg87n39usqa189ulqxp2yu349p99m18pdes679tqpekh4sp7johbq7plcm97jycct2u15px8wkq6k1ahl1jeikth4a1um0e1p9nufd7v6ypepd2tz8m9saestqdps3ryajy9dqys7sqnf3md4xil0i08gjahlrutj8kz13u2p7cfu6xtkgyqu663soyoqr4y1reip5lr6194etzjgzkuucyszt7xjytsvhufofifgwnm78wm7lnm7140zvwk4rrrg9ksvo6crl13mccx77cqdhcxf7iz8k8dfhy2gz5kvv1n4zshi2umfrzdhfs0zefpmtdyhxcbnski6x4miq41fkdmss4tikjfe7s4mqb1du7gm1oyuc3wpm8k0bbw52fr33e83mhxqyo8a6g27iuqb4xz6wqzowjsmqrzzzs3jr5rjmrj0xasrz7fhnxylor52xjwg68appkv4yzy0czg0h54uwibn0n6rnm9r8vhrx4mubkfoow',
                proxyHost: '5nhfj9akphnqh5msj78mncxoo4g5a8trxiejxllvtwo3evi58uxdzxcr329t',
                proxyPort: 4372329034,
                destination: 'exl1f3ncmowlfr2f9jypp5y3gztrk89kmurzx7i4jo99pkyis3me98zwg05lg6w70s3ovxitha2f6ym79jyprwhlh402dis5jr5863xih1fboza4hb22cfazak6z3iyzhudabvqiba09ijxdkuuoecmejcfmzo80',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'isgylr3saq30yfy5ay0xkdtlii7hectaxgbh29rjst7jcwyti411nou2sv5r9ri45wgfq0s4dbq43eunxeatub7w7lessc77lnq2iydqk9y4wcfsjn4bdfwpdyy80416o8f2austjae7bzdmsfguozjwc439lcvm',
                responsibleUserAccountName: 'p2yamnzwwxju4uud3y4c',
                lastChangeUserAccount: 'tnbya8aqxd19z7tjrmrl',
                lastChangedAt: '2020-07-29 08:44:46',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterType is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'p07t6oudhqsg3vqiyud3iv4s6d2tpeou56txicek',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'rslvvv9lpdlloigsi3r8mk84p0kv5y9kkx28rcnf703178euzd',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: '5dt516fnn59mpfch2c5l',
                party: '9idu60key8zqtr694geiojzddfuu0d2eawnusquqsoydtewzsf5jat1xoglql191eaeqdmqwmywlq01lnne5oj8hilxnks5f91mlr33965jq36czezsxni3ry2o6d6m5ynhij3j5g6eoa3ljx9smk2s6obk403o2',
                component: 'odcyqjw6r1d06ptcgm8hti2ds2ivmvdiooyqwa3czsrowmveswh31bbuy7sfviub5msemnp5v9jembmbwb4mkbdwflrkkp70m25dg8s5bqcpfgj47pl4wdtt7vgcdqd3it4td4fbtdb0j258pauafucgl2y9uwzj',
                name: '1pospjk69u3csg4txnl8siw02he7siri6o0zcjxnf07b9iuy4ojxvi8go74ljmm8q4s566ow8awviskhjydugx1oniwqdkiw0466lmcmkty3ghl6s3mlfcum8579ul0hagu7eucgt5xea41ksby2emsvhsv0qqj9',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: '5gpygk70grup3hwj4adof5wyqto049o89d2wnsn4mvh2ik5cypb4fsm6wzt8xg3moeycv6dsngxp07ofbj7liu7wkz1k96m9j0ruwveksasbxw3t3n4kf9iv18pz679qwsxodp37eesbmnhlqdvkb46vbnbl9enk',
                flowComponent: 'w9lxsfsik2bsh6bjwem6lwv43rvclkf94low8yuyndzgf57x46gyr1t8ivpy5c07k8p0zxeifcxbfmo1n2gbyib1affdiglljp0jvk0mcuizqbzsv1vmc9pm5qnqvsw2re1pdw77dpl834wp7160y54jnvyeu72t',
                flowInterfaceName: 'h8lurdxoevnxptk6tqechlqtunqs6u0w1vib0n82ajvgke18ec17g42fvkc6d6nsyozs3x1kcicxqovs8zoosd68vs891693lib7qa9i10cvpc3z7axmnhdaj4ovtb0eh0nhnejxqvi35lm0971kerdnrxc6hpvr',
                flowInterfaceNamespace: 'wnzsoetgu4sk95c87ua9nry6acsoykpjislwfxlh3dxtf52t1ctbai1conbtw9pirtdww809q7ilerv8cdq89zmbgkqhxahdf0top0sdk0xygy3hfw6uu1shi7hifnawuez7i845aexo3c1yb54tzqsypoxl2bpm',
                version: '2nzfjplcewtwlggnmogr',
                adapterType: 'rm3hbgsj1vysbhyr4zsfo6vv4xt5rwod18ic13a5tdve5bhn7xpr7hc0pvy8x',
                direction: 'SENDER',
                transportProtocol: '1n2be6o6qql7fjdylmlvc3z86hq0ykhfx1d14qltyigbkaic72ns8rn9r8tx',
                messageProtocol: 'buisfte7e8o175t1tfzt8lppus3srfj1jwwtgirck89z0ibw93jzol3fq0ko',
                adapterEngineName: '24rvccciqrrjobdnuv1jt5jmtic8yfn1sutaf3b5hcw059plqnm265dnyzkc4y4150fxlls2ewwey9ycv1kya0nmk3wvcfztnqv20xhqsgoacl54ybwloaqmfoowc9e2pic1bfb4fpi1vpzoqt6w4xe72e0kvnpu',
                url: 'vug97ld95vi134tte8o43r7l26nu0aw5xze7zulqdb951b7h64r3yyq92iv6kf0mny898xu1envzjbsvlm9p6fyh5gqubz68g9xel6behg4e6ipf2fmzywqzbrhf5xesvjkm3zam0jgidcl16cjgafskzuqs0rbd4czenijxu11hjpq1e4d4txcuioni7tmb57kc3dtvbq8jajk0bjbiun3huabaghqe54536053ihq5vacfgg0d1tvr3fcpeinjff6l5ri860hk8ar55a7ndg8r62e2w43hemv5a4el4b3r4d7xyeyzi5ik6vxf1udl',
                username: 'smuq7ek3b5jfyw5t8a7b8w3sj7xywytm6lkirau9mab8vfllwa5zs0apfdp3',
                remoteHost: '49rhp8g2zhet2vdpo70omncbaxrt5gojugyrbnmjln01bf3no1fkt6ornekw33h5e10rn42r03tjjogs976rxsbtvl856e1v5fnbje9weuq0wjujja50d6zj94r5ed3o4otf3oj3t6wl7zua4gjhdt30ge1zg1w7',
                remotePort: 7603967824,
                directory: 'zu6wbto6r6agzifgniyrqxzvzojhq2goo6apefnc7jkzlg4dx82v90denb2tyga7a9inyf0218vlymd95auq4vuql64bymum00gek1m6z1qjtg9jj50cr94yx65xuoe9mlwuokle8ea7cntu8avijma5goqn4v0f1jc9ti1etcjcknm0iec0pri5gp2f5xi4j6foxi26du2k0fb97y8hxb9pq78yf6bn3g8vncombdsnrz5jufrv5v2k0185m2iiol1jfqjfy0h7t8ieuc6wraa45n1z4xcnwdb3017jxtx2jox9vf434y7y5t4cck6mjau1tx3u4rlechvsq3oge2vq2giquyiecwwg5o9hooyomxa5felp1r6rkrdzjn1hmnr0eanyhz0vn77ynjtyuppumedjakgofce1jwkql2je2qy4fl746d3k4h24k5ufvh4o3rx4zjvmcev4lecwzliw3i8nb3m93eaz15e72yvg0d7fyxkbij5peuhago48td47pfgel8pclz3m0vdwkyl125y0d6pbz9p3we3bjaex2v2ug3wa9kxfruucjtjvh6kl1j6osq0hwo7l3j273lf3ag9y69c97voes7mw505k04d1iok12qoxk9by94l1yg8c4njyp73qhlt21ndgfwcjowjs8vjmdub9duypizgheh3w13u8z5dy3yhrugiftnmavhhteeb19oinn2lbqx3cpwjpvltky2vpowz7757si3mv162vgms51k2p4avum6kv4oqdd6kkymxzijnxzsqew561f4mbvynt163hnlwvqj5b0zgr0d4gz21e2jxr4whyf2wbryz54n1lf6r25nimtbd297xfodmotxb6nlz64aj1wmcyj72un08i0av4r09lel4fz7xqkj9dsun03c9b203xrpwb59wwf3br27gdi0bnbmyp9lk6gclby49pmhdyfeyd8b6hwcubxmjrrs8csxjeu7ukxdlp8ghrxvy7c4q4yjasg1wfh2f7olyi',
                fileSchema: 'vyn91wa54lq1vcnwdxauqe87ep6s8yonm9tyvkf9devoy4w36yuo5mqmj1iznk07sklzadtcq5lpd9t2g3hqzrw4h4kr9ilcws85ain4v9i55biuu2otefdjzm4ccwkuek6xj3sfkhfob2ms64iot41pcxc7dgnlgc25srfne5vai70u7k2yermxjs7jzh5bl1g6mctryib1g1me7eurm1wlnrergi05t75vazs5btist9hkzgldflojr1jv2i8cqsjm4xup8o6f5gxdgtxm48bjw7fjrr4cajcjcc7kqx94qdf1c2dzaq73xogannarbu37d1ev4tg3wb48f5dp6c2woggwtiai7ul9ntdf7kgmi14fa39e2bjtjsc9nipzn0iw2pffbbzysjvroqfk56dsdm6t87izbkys23nu1ktcxs6ls03cqynnnepif89riyr4q2p92ea83rp6c03scu6oougzcputuixz39w9lnzynxzy2yybmxdy7qiyezaij9sqtabbxk1ubh2guqhcq0c2tgx8gqdl0bsw2h9s9hyn32b3gsit2lah6lpoqewo9gz9tt0prkp2hbllr38vybgoiu3ddvtv6vk1czg5bjv1o2gwjjtpu369u5auo65ek6bfau6px1plbgcs2sz9ju4scbl5aumik5d1s9v0ei33dwmahakeuhdjnv58yf7cp3ssfl08q7ugvh4h9r9rn2dgljvxaigtnybwfjv9ku47ixaporjan18ej5swdg746y85njelparbl5qh8zbr78csl4gy67n069jjf236yiogvax5z1uaz94o0x1wywy37hq0uegf8ufs9ho41perueyzsvko0n5tntxrmgrxzjnjfgvkoye54ybpoiz8dbb1di8h6zz6029etncpig99mhgp70aoh77c7pci8p7exlm1r36nj0mdovr815rld1l805ovxnak5mi8c8wtgngcrayejofmum3uageqnzgy3vy7nuorta3117vtv9oclg67',
                proxyHost: '3oxnx4h0p3v8gozt0574spj1y68kh941uormq3jgs1flinqix6ngvwz1g16e',
                proxyPort: 8510114039,
                destination: '3vy1mits5po26jsvsue3p8qymh44p09fsku37s63i9shx3adoehub3934o6f7e8t4z7829hurfbs4fg0ggb1mwi69srcecwf109ii9lpkihprk8r4ep7pzkwoabcr964gkc4dfeu5ku07avf0mflrf75q739jk8m',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'juzgpwxmgd6jixpzty2zw1op1zzs0taoagvm0nzpuxe32sw7jqfphkzrhqep1ua9fmyre63hald63b1eb38048vqtnl6aikfmibpxyplu77uxetgcknza6ixkipynsrmkdctx057ygaa7j33ylxty5pyg0xvociu',
                responsibleUserAccountName: 'xaoiwzqgkml4v4jqt7n5',
                lastChangeUserAccount: 'uvfjt0p49u7i5h78ydvl',
                lastChangedAt: '2020-07-29 12:57:28',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'zq2rjw9k6sxtz2f4ywngpaiyppi58jy81nkf3lpp',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: '9fiuoyjwegj4f227j10oghzcdydanv1b0m8pridoh6z92nizh5',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'i1lne1yc0o9tqyndtgp7',
                party: 'qjnffkhjj94voxdy835aw4m6gfkxqh2g3icdbui5bgbxggr34hlsnqfq49q67ga977sa50xcqds4w6d7bsgjr7060ad3gbvj2288o8d6flqj08adzjjxp88g4g3rv06mjfhonhevcutktl0eodtb0hokxnfs58ik',
                component: '6fru8xwm5riem9dq0xw7wblvgeva6j93l5a5hsimnh0oq22lsh2f81wqc10wqujdck3bt7vejz9hccotvv7qjf1u2d5j6zxhswast4hsup1u21m7ncc0fjvbga0fj3gktcy2rbi6ff6jb88z95pjc2qmevtnrbzu',
                name: '6a9vpejuv4hru03nt31jay1qjc8il50oknjlx945f61rmcgmt0gcelekzrqotwgnhjutnsp43buan3rrkgmzpgdnf2qrfsqb16rlr7xvh4wv0l5pbogxelp8rkkptyfuby6sy1b8dv7stkbac4wurs618d4by4fj',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'c682zv1wm2jq9ft537pwqzz5s8uaqdha95t1nqr9lz9fxy1lu2hvq280awvtt768pgaspfko9kljoe4a8ec6wc61xsr64jw93cugn5crq40016itztw633ul0iah2z7ogkklnvm74glc7xdkb0sjsb587ua3bcrm',
                flowComponent: 'efqs0xzxhg3qecx02c8r7qj4to7jhtbohwkco7bcl4rzzxx33uhvqy88kjqo6vkzzkm9lutb6hrav1699qklvz2ywpdfoyoyhpdqvxqbsi0akbxb01oozbogivp6itredklllc1gcjk4bh9r98y59j47hqynxlpo',
                flowInterfaceName: '9mzfhxjy04u1opzu17g18ggck15mkyovwgx3dgprdsyb5stqrgnei6xj6gx148l99t8nmjf1r2n5y3equtuyjmcgoubnbkl0mg2h7pzfimjfbs9t94xnehnnfz0trw20cad2zd2x97re06oqdzfr77e6j1mo5j7x',
                flowInterfaceNamespace: '2rde6a4dwebec9n8u4651yllfjaqgxhx51h0gmdre6ge4l1slnm63jxpzrxgjqu47majfvagczc39izy29nnnktd72ih5l0s6q8odbpffpvhaly8ktswopab0mygui8vwgztu09vhc7uarjau9uqorr4po9hl1rj',
                version: 'lf8y13akpz10u2avk6mm',
                adapterType: 'p8wzc2x0fnd13iajmo1wahhxf5qmlpfa8gxfrzwmee16hxf68z5415y6bavf',
                direction: 'RECEIVER',
                transportProtocol: 'y0djf9agwqbr1cvnhlykxtad6xet6jvf26or6mrg9qvmyrg7cxudpzzjwxzlm',
                messageProtocol: 'ogpb2rz9z0aatli8uyyrr4c9dysfnrnnskbgit5xjsokzzcjmvx7kebe95t4',
                adapterEngineName: 'h0wc753dsz9xo7p4worovwxpunc358vmongtfod7k95fgqo3gwmcls8gx5kjjn1u6ifl0kh0ia8mbdofxu3pos9udrafkc9sy26a1v4r4dg8wxv9umorvrtp4c4nsqe8d5c7c3wdbhv9re8sgise3cuilwyzk77w',
                url: 'neczqjgjon6wkqxwlambodm2rgbay0urq3djthpbmx32nf249tzvgdpt6nc4lilz5plvx7qhnd0kw9dxwivtsepj0igazx88pdc65nynmzyvgj0kev3pmd4wsd6jhw70i4pq3zh77zemfyf2ydqgl66ckof0ktwlf7dlya1bf5fhnr3nezvy8qwdhckq55wgbysnixo5go9tpuw09dlxmtka7grfgyhnxc75j09ltrzay9j0s4hqdt6a9gilfo2iz317txb4j3uk5126t3kqs0cb5sd16n6mmlfqgk9zq7ti04ym63xqiyb2vfki56wv',
                username: 'q8nncb3thsnej7urcn1cm7d7tmiqe35e23e6aymybvfg6l7tiek0myklezrb',
                remoteHost: '0xc45nlo7d7ylj7nwzt02x1dj3mhwyuplxxap38rs4rqyvovrpvpskkq6ldrg9sflfo7utxbg0h21e4902zn5x32xnlrrzaidffkha50tmlijzjqgr311t6tive5htm1qhp9wm5m83f60tyuc9lsob6slu2boy07',
                remotePort: 8866757118,
                directory: 'qinia4925088zr8jagk2zxjykpwdr7ek7592xc698z55o81dq8yezi68eezkn1b1vouqbnh5nmagkdcu2ax22ttwcxxpjpqx01d3809nvz5zgaxwn2t1vd0jbjbrc8mszz0ryk38n0lgbwwoas22n1rlm1espf4yj2mz7wu5ldyohptzzm0p1ir35om8u6zduhpjyczqrieqmk19j9rn08hlnz8rtdrse42t6aa65qdzq0sf108pr51umlqhgsdj9xl4umnrnpypm7e4dthdpen009i31hklor6o94rd20pwgj956mrud3t11dhfertnp5pri6q4lzqij8semjsdn8hx79xbqvfjn4o2nl7x4is8txm0ghxxw6m330j4l2o6xl4iea3xzpraoirphlyk4l3cbci1quo3rmrwty6dsk3lc7g4vhdcmwk1k3refx15o2z1o1124cre1jh73fn3f7hpbv8bfapo644ovfo0jlnai6uufgihrfpvjm01ccn96wg43i4f8ylcyjgc04n4aylumftbicqug83sascujimw1kgqp7h3ja5faq3pw80g3sgz0spvej9339cxmehyfqrcyiy9xcjpd9u2v96duhauchitnja61qvkaly19d1a2j0fvr9bt7ujtmlcx2idp9bh5korihk96swisb6zw355t1x6miwtq3dqlp4m71zwew134x9dlwto8tqwzh9xpjilqqmeyi41dz5knncncrlp29ejn8a93je9gl9kt57e7s745zolsgi86fxp4qa3ndutksq4ixc9k66ahjvaq3eocz8czeztj65ldxa6zw857fg2c0wgfl8hgrnmei7r1stgw9ap3lopgnfxnogym8hmqtirdkoo9ew4ewlc8vi0n4xt8i6erbv6pv3kge7d7lkfa22d24r68qk09esckjxyqkk0y0q2ybxii47mg0gam346bx9nl2edx87at7f6aas4aalluy7nmenuaa27pee3nb384y9mkamigdn9vgle',
                fileSchema: 'fxa5pnb93e301ddj8d345wb2ehco5tebg4xson1l5h7s2ts4ii5legqtq4gq8hoyovshsunqat75zdc728bpplbgykm4btszy7q12b9mif7wn41tczyk9buaarw5eix6blijhwy1rz8swlui7jbc0qg2ghnqy002sc2yapk69qwu2w1cm41doz6yll4poxlfkljehj25m953lrprvroniuqbtv47aivvtjav1xk4dlwxn1il4xpmejhv8n3ll3cuag0psc5vdai40mcmxa8brg8wro0r392sy3jlpoutsq265yn89vtoqqbuzr1nbmmf6r5j8dbyp0rju50vh7bqdsso7861e1voj6xe9nv8zex50j4hvv3at9a22zt457vsckvbr8xv2lrzn6tg6acay4t46avw9seov63rmu8h8bvueji19c96j8r0q71mca7otsgqt5fp6s6l1yu2qntemsya4s2hc39wwk1lsa0orrajsm9j0mp7bknzif3n1h9o219t9wxmbcldou9wqvqez94xv5flyfgg26ojd1uu63ear2229d0alp38gzrbbidfmy6yuuzqsfkim8r8xy8e7xz3pzwpf3ryut9okot3e8ixqs6i3yu9oxgh7crosw06t1ndblgsy031drd36ivzsbf3ujzg7ywsc1hyyylwrgr0vw6dgkzdpamazvjz0jg5zo0j5qwo9ipmjwshi8r0hp1u4bza5xji8z37ju4ta909b94nrama24l3m16389mkoxd78nk2yaxfu4f3qj1ms95cwtgr4s8854i7pyyj2gcqpil7rq2c04j15h9h89tlgyauaeyrrrxa56jowvwilj5lhghzi1m2x9yz9z9bkcd0b03k8jp6a8m4a3zqzjdzoxt86qi2cxgox66ygt0mrh5oqsrfze5mvhz96oqzr1143tatpp8fnubr60zqkifr1wtq5l7mzkwdipfw5q5wxc2hqpkw6pslql7s8dc06z62k9jz76axguj4uv9qp6fj',
                proxyHost: 'pqb5gkdbx13lzxa6wq6vsj8ebgfqn8i9rqg3vlbw706p7fo3w5gfq2nscs62',
                proxyPort: 1388668978,
                destination: '17hcq27q4due9ql23xsbjg5r3pnhz6hnvd156uiibcmxyriy7auas70kui8mg062sztao5aei6axtn31b1b59ca7hnrbxdb2b2pxq8hucyd5174muk9xza7l2u9557u9wxwkocogn41ng4vcnog4qyxbbo1skrba',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'yqj1dwg0fz24yz27wt09zomp91yrkfy2au6p6vilbf57dpomadvlt0qeycl8ydqdso3mp4zqzq6vgdrfy66tp2sv678blnsku3jpkt3ozeoz3gtx4a00epkbly0r2j2out97xh5l7vsx3ag6lzw1kxd9076hqeo0',
                responsibleUserAccountName: 't0zt9i2pxg78yohgdsfl',
                lastChangeUserAccount: 'fwtgxx9wd1t1icxzaccq',
                lastChangedAt: '2020-07-29 05:08:28',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'cyzfzcekc6qbdhr9xjb97h06jzpoafej50etvlia',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'q8t7yryzw2c2g73221op8df3yj642tknxrkmsmilvgirpbkjza',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'guepwp1orn6n7ieh5xsl',
                party: 'pjp7p8zeadbg9njndx8v3zv5vimryj10kvaetr0jw09vqr7bcqpve7x33f22a26ji37edzr9nl9aeetewniqw3rn0g6orh68766g5cuf4gmhjuros0ccrr9wk33bq2lol95ghkhq1uv77z5h5pbx0irhltmobrtq',
                component: '3n1okq70xbsk4i7jtsogwyuhluk5ncq2dzj1u06lni7h94vo4ua6mlhjrpxpqhuw9r3jqb1usd7h3k1p8rcfinitsbii3hc8jorx3tds6i8rsehov4f89j0n4xxjvcd1iohglri1vodkoqg8knp9rjw82out67rd',
                name: 'twg9m3n542204js48ms59b8luuax8p4hx0ufisqfw372gnrkd0newbv2w8godhxgd5687580xaog4mjxkiug423e8nqilqxsk5yc2ydmrp64eotpyqj1mlkmngu7j7obpip4600y8gqd2233lfm0sju00gjx135w',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'xk6a4tnjp9kioal68va6f8ni1cbtas99btdp29frxo1owddn9ntavcn7l4q6pqxnr0pv7kg6cyta6ze0308ifbm29cd88lft85cvn6heiye2g2kgo32i53brrazyz04ml15xx9g3no30pxg41ek68oskn8gggya5',
                flowComponent: 'calccuxroo1deo4ynio5ickna89buexhy34z5v1ia8n11qoq95leih20atqpfjkje2ovire2hd36z67m3cm2ypy4rlo2qeyoz9o35lf2c03r7qugypm1rbuxvqwpwttrhdaxfoijcmik0f5jims0lfxqo79if5yf',
                flowInterfaceName: 'bgtiwe11g1mp25brttmsvdg8rk3uw3ev42vdvsjdoa9kabj32wopozlk75xe94jpmv0kl9ofjcjg416tg78w62jrw6eezntd5nrzxm9k403ntsbuaa7k5f5avumcn50t4fz7f7q83vhi7zg6n29321l9wg8mcmfl',
                flowInterfaceNamespace: 'z6gremqy4m8dhiag1tl15pe0fbintejd4ro6x5mygcecihr74lavcpal6mdfyn8nzvkklquovx3cmynguvs5xox3l5smiirmuxsneswk8w2cix0d8nizww4amfojj9mc5o2yqg9wqrqqqwxrfph3o8zzlduqj1t1',
                version: 'nijnq95k7mgk9phemogi',
                adapterType: 'njs55kbm9bt3w730tnvzhulowg3qzbu4mcclauwgf4uxfe6d1jj31i9ffm5v',
                direction: 'SENDER',
                transportProtocol: 'q0hl5dfmky6t5j23zbojc92k2kb3dbm4wmzga0pcaaiy9cnsv6cjeab60lrm',
                messageProtocol: 'pfq1b0od4fntvb9gqet1oeyzg5933j4vfd744cdwkrmleh6lbpqc94w4vrszb',
                adapterEngineName: 'rem40fru7r0w938yd6380b9byipcyv2hu47c3f8l886udwrffw1iy4rw6o605cy3u455p90o58cep616fy4ogkktv4edj50m8q3ir1798987063l8k4ns1iabeqta5elxs9laz3i7osgvdmz0reh3x4le6hp5bj6',
                url: 'zsvibulu271wb9xr8ekfyc18xu0srq2no7aph8rl1tgbd7nmuubbuhrs9xi7syeo3lvfy87iw2lmvqhpvs98lzcn97vel43iryov9c42dq396ww6e2kenwrm6ngi62pyq2bd5q4eb4y3pcm470akrycg51i2m5vkzmxzp7jhff6ymho3h4t9xm8y3nqig6y4tftdjxvvtm3mikyce5fjxyoqa4dokmvqsr8zztwxsdf7018yeb1vupz1dgnotkd1a6mhxo4nv0kybo6w93uacjx3rmly6ezya0wqtbmkkfhjiqkq1p8vdwx4m7z05e05',
                username: '8lbtbbuvzor6i343m9bqynqseb8sc0qvtbyjceybt9xscri1hmpclktooy3w',
                remoteHost: 'ljxanld6fj8h70g7o7jpp90uho9o3ajxvi82na2pdz1hw8lwir768ahjedjxqxvfgk5xtfywu6akihinhdi4cv9e3zvevnozsqqf0ag8vgo6l2ikirl5cnof7p6q964ilpk840p1xzwsbzo3jdbvh37inf58iqfp',
                remotePort: 2234167119,
                directory: 'q7z1p77lgxuwkqsbfomok1nzd1ylqrva6f0ael1pnzpq79n5nzq5yyhdakvpnzodzf0z6ng46tw512iz0o4eouj1jfiig4fvneedbjo1b5svhrvucgpqaiet5kzoaco6j48htprfd913h5uweb0wj7phbn6jfor3qlevjqruh5b7fcjwr0o3270ayzh094pgm3ypnlqqf373tbacuqirzllvpem2own6ulb8jltxbqth01oeqt2ou23mo135qajxjoq7zvuw5ozxnxsecft02w35in0kkps5hdb3y4k1svpj178vgoeoq0i53q257cfd5foszgyv7p3jvhz2nz4ljxabnmyv7j0di0xqdwucjahrpq3wnwniehnre5y32izsgdh31fe90nv8xp42hilocdr6drqy6hfqdo9t78e1rfys0vhytklk28glrezm3qgobzy2i6rjsvl9g45u66vzjyn8dt1iscbn384jvya3u59p7m9xj5c4s76id1g1af0e3vrt24bx3fr8vucwzw2kq81nnl7j6cxd3l6ap774a0iigjk2fdxeb0iy2qr8hfxkrdwkb3rm9y5bwatdt92r0axicksxxg0rd3whq5pvbu9r072t6l5xfjm9hdrwpfn0d29fowb7nyhc4lfmvpzed3i8hgi1eeb5m3rhe1o1g4x0z38vc005sl6mrm4vvru8c6p6l2jg7s2jzgqnc5fvwr9fsm3m9yg3udev8p1drqb8fs3fod833jcu02yf5hs1kn05vbycjo73swzf58yt0d8yv82ejs92bcgh4nbmv5i4x7tvhf57ofz1hz3id83qz4640tghwa15myibdnw6clu7hzzmbfgwfj5u8muecggtkntzcfhydr5wenzm1b76ei9e5lrsdbrev21cexd2143wrg1fc752e1475blxyuybkair8wv1ky3jkj71tpl88gjxrnmcafjlfu3ka0u66hgfrtme4qxknqgob1cmte2f2k08yq9tfyuacz50498j',
                fileSchema: 'bev8dyslwyxmphgwh77f657arfmvc1j6bsiljb2bu5x9sbc31m17jsl2zbqfsbldlbr9ow1pc0801si0srh3e6jcmrjxra5c3yxtwz2plypngbhjeqrtb287kzkxag1410ga09n2byujhdsjadlc7t4bldesmvpmfsqwsa3knuojc3wr0xwvzml0ruz5464xzvj7w464ju7qy4j6xyeoxmqnge89bzo1koikgk5jjqxxvfgpbg9b9aaq243i75kis6220i6jq3h3f27z3f77g8hgkdmvd1q7w4di85rd2f425e94905i612lslshzwdunmso6vucejvhdgwoz2ky49ct74qu9k6e5or63o111h0wkfn3gmx7g78k6bj3vbmr3edhy5a2u1i303uw3p9nqhoe60seauxb6l4ei1ydt8afma7llucqkhujtnxmxzffzul6ccx5tho2g1bjetjnyksewc2jld0q4x4c8zk4tzds7tbynjlf2y6texcc3w1710jk5mw1l3rbekt3m9ftvbd9qgxzc7t0n19vapdr7rj546qucgapqaph8h77a2xxkctwnzh37olho0eqz7ihj61wxnpjumsz1p71l9yywlan2jhiq1ai64kev1zxwuuofargn485cgken4e7p1we1xg77nlhcp3xhwr1tryfz1nqay3mlcavwi3pj61smu02wm3s9xzkcwqpwfp34wogve3upq0j1qhv8ncdb7dt638hhg6cdenha0o7c9q8bawvqmqe2qptco9wgr957jcxhgy3stacdlweufvg23pjltplvdys953bnmjfj5ory7odcz6f1q0od8sfaydd96d4r3l9bg7a4iw025vm5dbagfhw705wu8xld63k9zzk3amincf2cztpwde9m43u7u2rg21jnxo8evqm3e4v4lpayznu9hvl8b6vpdwhohaqs39doi7tq3cai6rgbhxsos4l1hiees15d8pkr6j5k06qh1tamviri30licca2ak1a8di',
                proxyHost: 'pra2itgz9pseyae712oclkg65ipuwqz9g79rmekszx7vc86hsnpwbcxbdtuq',
                proxyPort: 7789267526,
                destination: 'rd12qo1qusup6irl5afjfwjx780mxbm4ngz48338wyitt16czrqw54qrsaiytisz73151yagegy80homgdguniorwkg7sztvnmtj6qwa8dtxzy6uvdvdqntqssfm0pdj35o59twy6ugfcborrcmddp74p7f40aje',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '9rqocx73qdhiiz1cnca27g9necr9r81222oco0x2av06al3i1uq14hq7erapawe6yag2j4rmy26t0kw1zcdc5b1xokazrfn49e6alwesddu2nhtmm8e4nuw32ysa2w7s71t806m1iaeufad8xihzrrta7cmhbwzr',
                responsibleUserAccountName: '50zn2xhzfkfxi5p2gcs2',
                lastChangeUserAccount: 's5htbw88zxpkfupr34ps',
                lastChangedAt: '2020-07-29 08:49:36',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'yvh82umw7idkroto89efe7p14z5as9vtoxfbqgdb',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'ulfc3dnjf4vnl6fikcgm5t74tknz6iibx2obfwxc68zt82ylis',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'taw17yr4nfxqewct6853',
                party: 'my2qassmhqq2d2ohjfk70vj8t606685pjem6h6gopiuieb4ie2buhfrmm4i9lay6r1841bdbeifal3vme4e0y8u8a4oo1y25iohd6q2q0x9i8viz1hw0l7ji3npyfm1pb2gkedkeiutfhwqrx9uz470kcincillx',
                component: 'p3dhqqt2by38xskkalq0x9p6kzj9jr6m6uwggyutnsx1pamtxfzc0lnxa9j3t4z8vwenbd0gfqiq0fbf5q02gaep9rlel49oigsh6pizdzabvqlynibxh8d3mrflw8pxch15uhmtbarkd0qehm6yuwbi2v2zgaef',
                name: '6uth2q4axk7vde9syb9ak1z6f82nzg84x7ppu9wialheg25pr6nhy98wtu4ogg7elgwzar4qcge2e1vk7gsxieig3d3s0xohec1qrus22vlrnemvuh25yatyuctb27wwsoyq44z0jnsrcfgnwo3x9s9pssfv3294',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'c6lq3lbmf4urd46lmmtbwdx0g51y2o3o7td5z0f75e83xqmvl1lb89h41n9qbtl7vnf7s4n4biar7eb0n0bky66cor3can54cqmbu888grcgixdkhh0zci8caj68k5u9wjx4whbzqq2cm7fh02y3rvsts6esepf6',
                flowComponent: 'ngbslrcg1b4idt7r3mogkpvl902i5z14kj597jpmfbwsy67rzestg9nqytytic49tst8yxsx2ysyfdpt6y2dlgabtlv5kmjmono4774k4tv3lw0lu470b35tyflwrd3pnq5326ig8qn51jqdjgnnn7f4zq7ldp2i',
                flowInterfaceName: 'hkx9bxuchit9027a3urc9v10h1uphvfkw0b6awvewoxojksnsu8l8cveae1nn1mdm20oyv6qo7d9ioh4p6pz93qef4dkxhta8v07r72lttz4rz9q3sz248mjy1hs29zdo7q0t5vc932cl31mfwdjlc790xae2di2',
                flowInterfaceNamespace: 'wi6smgb1oiuaqeom78cpfj7eldbtyz2em0scj93go83v9aqgqxkoz6une5k1cceh1eo9u6po7x1pltdqh7bzkoy3tlwuoolf704vftntlbc673p3vlzenrjh3137uy9yf9aqvasf8lp7xmy7endeq44ix1n74soc',
                version: 'tmucbfe2isnv5tnuldmr',
                adapterType: 'yfv0n6l6mbdkeerfts1qz06vnrk44csm1pdhirzt5zoxzd5s1j7kkutziu6l',
                direction: 'SENDER',
                transportProtocol: 'db1a5uhvzbc83conuepqtwmb1ou755jknhci9x4kok7p3ewlbm09vcx6a0k0',
                messageProtocol: 'tpfvqp89gppnn0bhxnx7b9d6uwokxdqikny5g955222e8shd5ffrzs40v7lv',
                adapterEngineName: 'kxc5ehvwybgj7eagfyntwju8fl88lqi6qcjzfybc3lvk3p0u1dunfzzil5lu46m36wy5p41w0s2czpcuss28najz3kvgp2oieblc90yl5euqfnexemy8mgow0qg7j9uvro5wytp0smft90kpuo9knpjh8tydh58r6',
                url: 'snav36l4zha2rkf1ttk1tv8m18hdk1i9m52vpueth8lmy4hez6j9hv7dlod1wnx14s4reqlj0qxdofjmtyts0ns8x0m4l1ealc4ly1csx1eno9c4moh93w4iiq6u8xork5ej9pupera8tmibgn47mq5ny6zhlqytg6dvhnjmnwqum3eh9sd8gjankloxqsf4rre0p4q0srrnwzq8h2ivujngzitia609o46jq3xyurxb0dh15avsmkxqfct1unduyh9hlxv1iol2sspqvbhdgxruxk46oxkcvihsbttsyoy5g5g5h1v83az7utaymv18',
                username: '1igai4pjlt835j0mtevaoequ9yi1ug2javiav1p9bw5gs2wksg0oaj2c354k',
                remoteHost: 'm8phjwmqkj2ackbxipdkmvtgoxqwqt8b4h9vgr42kkz29e4slmwnu4evw16bk1hbqr4747uvcdlwe3mo27oj5aks144g2jv7xk0zlpbgun0tw5cpqq34w47kdbd6kkhioieo4e8toj66ysb7whvjrain57lneqjd',
                remotePort: 1200981797,
                directory: 'mlk9008nl6j2kx7kakz3o8j7uv9j5kg4roru2u39mprirngvg21lpgkznf3n4rmjgjciu9gc7ko383zte8lv2va2h21j38g74ots1d4qq9vsp5nge3zk15rowa1k0g9kxb66nhtedl2xwmgokt4np3rc069ymuc3ehtew3xy7ukp242hq1e14b5h78s2cama7s1fcwrhyzbeb67piux3zner8up81iga97zxwgn2q84v2fm4ttz2lvmmfjtq9n5y0bunpwai2lmci8as8ccnw6kfn8nfbzs7ay02m74tnc1wzo25ms5gvcmb9je2e0psn3jx7eys4clwvwd08ztw44mppjh9q8jbv2jj0jwkn16u2qnt72kqpdj3ypm07w2f1hsieecw6nvietoagke2tipgvvt2yp0ft4v754s9o2r6minfyb5pbdo66tpc3pabcv3mtfkcv01ockznaclnckfg5j3ugr9rthkgqtxxrc8ow4qpezegj5r3lggqk6ueju39ghulsdfiqwj92pndol55pgt34gtjwzsuatseaega9s0qbsy2nbxx4dukwo6y7m5ttdrbjniljqog3yyd53fshxxnf4b7a3k4tbl55dq0j4s9jt5d6cud8rvev5xmnn5yrvyjrf0f7z9x4tajq3ohira8rl4jj8wyolq4c32p3kft6rekzpfjqwf2b3rdf69eokdxuceeg6g9bsaq106xue1afxtltpuyjcblb7mpaqcieoyk2uy3p58b0lcuvhrvirlc8yd6n5p51e3oqhh9gont7bla0epry9fiv39bygekcoahyyekulrd8rkjjcnn4ktkiz55wl83i2jmnfx9qzpp0pej92l4rv5g3xvs2sypc8gmwtjvugmgkdsprl0rddpmmycx4e1hyj9lsqmdmpvq1f6je4ahjyll8q024wlkff1bnhaqfe80ptfum24u9mxhqqhbr09vl69lse49hie6cwmlv63kyu9p2lkporcnnumu72rsn8iygh8s',
                fileSchema: 'ro9z3uctc22fp0r2x9x21x9i4c1xudr002d9v94r3anyokxwsmbk0mu9zdxiuv0i1ijr4e2hidmuojgxuwawvdrkg0l2qfuu2mgnlz39eymnqtsej7s5fiddtidn51v99uiddgbewmz1kisk0qhdohwqkmxzntenuzzr7wglkok56gkbpaqen6opnkw5fdvu84xx3j3ofn684xck0tfnxzjlj37rzrk5efscohj14xx6h98u31wuoj8g7qtirh9izoowfecg0lgp72e2qbwsnakgnlhis69fxw0283syhw2ux9vpgl034re7c357ugpmcqi6plrd9ioxygo9xqm82u1gwwhq73ovri296dshzequmqldpe0uuvl0v509djm3iint1wusah0umlavvnghulhhwkutsjmx7dtrbvtilqqd0my28il1zgd98tngt98shi0w3plh17hanri0xyukvye94o90klf7vaorwrl4yuhdzveuq3boptq1gb85pdw31ps2jom3qcms8xyy4dlxc8zxwxrhyf3spe2a2rlfhnx7ayxlylzmw77awcaqr5l0lka51iszdvtvy3sg43q36eiby5pukhp60x4soelt4vqslhyjxqi572nbx9nujcrd9l5l9lrc3ouqtyw0gvoa7amycu49u1230pdzrmydo68vjjvbgfbhmhm90iys9xfjsc77j57zhopsvddojvpxfsbv5svpboulm2sl5wpe65rvwe8tdx8kchkto6npt0afb8akrsphcx758l0o786w9arcg3nj0lapaqxqr8qppin18nos1ogs1e3w9jqwcscddpuog1h0b24wpqukox621gkknzkdbsxenafh2lnz5fecx8wn0l5hdlkhd89n1o8ti9o3obphw57franb1wk2jwpdc098el8gjas53h6xfpi4yxi6v6y4lmeeoko2c07l88e272ubtw74hv48cp7nb5kb4rxluvjm7xbwlqqw3n7g3eof5eh5uh3ybnqwim98',
                proxyHost: '32q6xz65350funh5sbajp4bpttqp5gyssbbp44l24hq35rzs5p08dckutknk',
                proxyPort: 8985193164,
                destination: 'bvhokwd79vn2sdkg36fzfx6asnbres6k38tc21xwkzrbx0mbkyrqi3zi2ddef7at2wdfwo0g86iusy2rioriwpadmyxz3x7eu5snpdi8mdpuhs5fmv2immpzk03ruhwvbuaeue5fqxb4wa1q799t4v2rh2jt88qi',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'y1u4j8xx5uj4kfne5966kkg8h86zsaig7rc88obw6fti48c4ubugj89ifkcmmw4w8ccl4xhhx5ykdzr45mo48diwbyjq97atziss2eik0b1gqmdhbicxfxod04hslz46u2upw97bertvegftxt6f035d1uwn641c',
                responsibleUserAccountName: 'jma6gfhqsg4dwr2n1b2s',
                lastChangeUserAccount: 'fontqm6hhdk03tgy6dad',
                lastChangedAt: '2020-07-29 02:56:07',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'cf913exqto9vcwyo8minalqpwq490a39ocagonuk',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'cstwsevsfiz59kbkwtya8zoevoj9iga179qqokkw9xy0fsjk4a',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'oiw3sprqcggs5iz3o4mr',
                party: '3tsyeec0rzwvpdtvil7we1sy3bo3a2jvtkqywwro64kbq2quv81qa0gyt0gwb4dgf098tpb5agcy7jcyq1vfzpqami3us86thhexnoguzxgotegzz4mcya4mkbxaguxf44m6ntc2508i52g6lim7jjfecmlm0cuz',
                component: '1zh30rcfwq6zelenr6kg8kcom2ebgzr5gu3caufu3qgr5elye1pt42eccoesb7rhl3t7umqkx1nbeh0qpbeak5i9ywyy70j7js1t7qkkwddv1fj57cy5e90nq7uf5bxqk6o708ge8e0oc3xvcm5mlb9nd7zef9qn',
                name: 'nl692w1mchagn029kr0b3ellleffxf0hfeyl4mc8li5j069gg0eiq0c7w4mtwdllyx2w8b098cary9j17jdmoai7rie46vv9y0ki8w2dp1oel3rthra3ltm1ox3u82u4u45571rkjunx4mtzn1v6zgyip8etlo22',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'brze8ag7s9ae1w3nhwtlhaf8s68j0vajvzahz4zhoih1wv4i76ztyifhq0sh1op7qml0sku97h2e2rqx3lc385rp3h663u9pfcm4t0x2juzggs6cgw40wj1zecsjk4g6e7v7v6eq2fup6obha1trc9ca6k4wgnjr',
                flowComponent: 'f97o8lnyjorf0lc6oh0tru5wnozbltgolrz9wzl2x925f6mo52vk1xbhxeewucza1xhkdoze4hyqc3w3gpfub2l29wgbkcyp5x9961x9tzjfiegb39r20inr8m21kj56jihq0sk7kpt10q8126c8obfai6elwqlz',
                flowInterfaceName: 'de5l5x8k3b0cx1radsyqu3m1hia1e997nsxojtp56k3w6729x6ryqnlhxgtbvlhdvbtjybtr5qj0jkkg7kead870n3jtp6b71rxkqlbk1fg57fnzcuhug7flbkelv2rx428b7zn1z18i3uie4n904se1w1pkepr5',
                flowInterfaceNamespace: 'vk9hppp61xh05tqdduf05jyss3wr71h5j9lid1yphcu6g80tb2i355dzpnsyt8qqotrbfsp5oi31ammcgj2reyblhwrld8c9kyxyzarp0vdfjy9yo6ljehg4jnkgdqbkhupz1pfdogmo5ykgmkr1azd3w5w8onuy',
                version: 'ztu33ewm6alxe6ebisfr',
                adapterType: 'nu6f2jvq42mc4umhfj5mgqc3pxxkdkmmpsaqva3pvctklyreeouxwnbct4pz',
                direction: 'RECEIVER',
                transportProtocol: '7arupcl9gqjsh2vyjkp7rscmze98bt1fluge0dulmt2l8x0v0xqpd3hmtes9',
                messageProtocol: 'ahrhlo56fgt6thfx4ipixrd0gatztf7mjno277ijb75o8kasaczi9vr30nod',
                adapterEngineName: '1atuehxnwizjzov30dc8b8ehdd3jj0c62bwjyq9mcsawsjdqnyb2uepvmrnr6d6ayjx0xz75e4ng5mdi54stnsbv2fvwhht0sqzgn6yl1wdsy2qc04x52tfgiyrb6245dl2u01s2tiuzw8pn9bdyjnigg863np0h',
                url: 'o2b6bcb28bwoguy7798fl8hvsl1vpsf4uh2onl336j58yvsgfocoey21b69jtn73g1a9jv8cn2t8xtjo0od5roobnzbfq4c72p0ip7ys0n7wkz884fb2zrfuuqqlu0vmluzxgquy032bq0e5wila57w4em74ezkgxag9l5bi33v1ueigf9ei065po61c74ij4ff8tbcrqh9ectiatrzout80yafkghib5kykultzsc34e82s2380ufnsbdnq6sf9pvlg5im8yvqk4x10q25a69887ikwpowvd4voixavg00f6glv3lu3ccj7r6mub4fsg',
                username: 'jslqqtew3brktynhv7wdziyejlw5stru7w1864r78v6j3him85p1j7cjyoww',
                remoteHost: 'l4wquqsj8lwqycet6axu28hmc9otmadfu7goz6fjv9wow3wfcys21mjw9tk4h1q8h3m8et98g4syugt431w8qwobf4o8mmqrwyp5nr0rql26h3kpwa0f60tyn7qln2uxx8bz36irfrm5q7j532bnwjgntf24ko7w',
                remotePort: 5036666278,
                directory: '66os8xxutmoupsho26m28k8u1zcdewamjjk7mf7707dxdi1fxr0hmycoxb4iyhdkdc7u8y13aa69lijr76dp4iwnrd2eccfxmonozq1d7otbshk0acw4x82ztezggjhly02g1hm0v97jgfng45j7f151cawyngwnictmnife1ha1suopnmuq3d4wxtpbof6c3urbnc1iq1r3lheztd2z0pwzsggsvvcem3gwuvvtw0ii02tp4yune80dhepyylxjqefc46ozk96m6k00fu2iwbdmyk99eclvh0pqm807yqwfhcbimriu6tek7nbab2p90bd2h6tuuqevlf4ngr0iy7a14bkuvhsh876wf8ly4ngypya4m2gltsph8zslcouovc02djesd2p2do7lccktfzu1l8u5elrineit8ed4o6qtqaj7z4rcuzwidsqraiwevqbxklwdw145kqhv10p0x9yvhejfjljf0fxo4xez3k2ietltdwx7f05eedus08wgtsp3xqfbx4r1lnvjbok57deu55sra2r91grxjjsbq7xky88y90otfhuqnpn33ptl1wy5vep548s2cr3t20pw4as2aj4yzjnnwfbeg7lycyczkkb65rbegnjyd1a1q1nhetggdjqdjind6hgwbnacrn4wca3x4qstwt5bpe7l4x8x4g3ur5ttl6v8avz6baprx79nb1nqa3uxjd60g8epzj6y6nhpgaxkg5i50zazpipiu19af6qa6f9twuqf9rl3egto9mlvwajgndve30ivs96ckv0y8uf1lue0djqd9uosopk9xr0h5uea5dx1fgq2ekqmvtv922lrvz7jbu620cgxbun3bv0hhyk1tt945hnnhvakyupz3rilsogd8nynwbycueh10sgdj2bf78ng6vku9iain66q44i0ovt7ylsv83w8vmdtsosmmrc50fm8rw5v4ns68vhpsb75rux4liw82o91jba6roc6awhsibqplgk3n7szmqkzlpovb7ga',
                fileSchema: '2ktvaxkrrsgsx01n1pudjrorbe0mlfu6s5sjlq812v04vsbrz4s7xyzsquuk9v8c0yazhoh70kd4jb9hq1y20yalajoikp5nr1o4gxaictjjzxl7r79pnsaa53x9m0kzpv4gcccpy2oqfgtl227p9rt7ntb1gepat8p1h6udynktd4w5yc30yizj9lw5t1960qaprgmj9obs1zdxprm0npodnncc0g3648nvgs317xjbzahpltjaiynfio993ng2iec5hqyiw5l2gxi8t2zqjjyn8t2xat4w0gdoyfr4lni8la9b40ge5w8i4xf667typsl0kww6eawu734unreyrd3jt7pao18w4ghwo29bepvfhd4tuzchqy9x3gpbopubg0uryklfeseo8kshdojpqvdxgehpg9x3fp5nhmojvy6oyv1ljllh9z38ewetwr3bu7dtm30r8jstyslyby0abptcr5uj4vmcgj0ycgsw6cehla1dcn574vcanltpf5015hpya4ywbq517q07traggar3g16wj4zken3l9vtqkc19jzyw6siwtrdkcq7r8e3ld4m27p5bd8zco1q0qqa5ltliir0fhp25uaolaaavagb6ziuqz991hjqeap0g8h9awrijsgppx3q24rmzs69gv1rl8o5jbliig9epsbwc060ipgslhar9kem3ych26mgqgi7i6qqfckf96hgpbmy9902xoaoycbrtgx4hvn3eohjurx0e91ac72j2azy8gbzxfqgh157apk51f8oyy87atncsz7h112bi3ils1yvuxlszlb2lxfm3n7h7yjd38itrajog3nugfv9rj4m7unlv6vh2lactmo7evzcnhfi19aj5lr74pkrpa291ah8l6lhrtujjajx5cm42p4kcbzxmval8zmhb2wh7y1cz4g7vogfgkyg7gvt1etuko74cvrmalv8wse6kmy23hxyfbq7shvqwwngkw8mmjg9ntfo4bthb0gb2orq51fky62k4a7kn',
                proxyHost: 'qwr2yxfh24jmnyrr1uu1kf4lb2e5bcgggguj0oy10nnhqhpd3r5kw6np7ie7',
                proxyPort: 6861851588,
                destination: '2u5qdawmtqmxc06ij17qol2485i9k3aqg5bjub4m3irsourzrwuvvcqozpb1cmem5bwk166alrc9378cs918y08moy211s98v13ojv5fwve2kiam1zrmkshohm94x2waaz3yn3zhfex4wwuo55bjhqdjug1qbw75',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '1zez9rp3ald021y333uckgysboxywh2hxg16p4oht4plmmwpnlara2u73kla6t8rwxn7041s88ymd615j1wdrqfyxnojqnrf69qtvweau0dggkicuinzpvdttifzyyfgux9hg72pwslh969ics51zncd3vvzbk8w',
                responsibleUserAccountName: 'p8vqsafy4gj3m9ti89c7',
                lastChangeUserAccount: 'v53xl76dz3ab1bxv5jk8',
                lastChangedAt: '2020-07-29 05:50:33',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'fqfln0xc6h1lnuj1zr2a6mbsxqx6cx6vnlbuch75',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'cp401eso1wbqyeu9ym2pvlwvzbrzkvi157zd99f826ixk2gvkz',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'dnkd7v9dktruewr3cn38',
                party: 'zhzxgn47uq94vgk8k3mxtzq5xc56rq1dgri0qfocztc5gkt2c7ux9ohhyitv92mjntq0n5gvtxwjjwsajbon6ki8p58jkh0z5t4l183ft7l2hb94i6v48rhoo9su2wwcq6ladd3adp1mqtnv10allmfkmihie0rd',
                component: '6g5k5oy954m6myeg3y27s60pthzy8d6uidg2pldbjsz01y9hm6peho3jolr1cchx8hwyvbvfozaokwpf4yz3k6qnvprf4sg1cz82r13sp5k3ff2i0f2l040quak1tpzetuid7gmlkziiy4wlm5jtxrqo4wkk7glz',
                name: 'ki8nwqqb2qf65yxzqp3bkc9xqo2t3xhwezvxl6moqtmc1z0yrfh7taqbugor3q8oyaj97fglii8jf1kfb3h6cuk7goibjkd6au5wmf35ljrg1d0tjnbuvsgwhyqi1q0nduiigls9i9vsi7b5j15t1vril152r442',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: '27h13o514k21xbxmvtjbbz8wfsk16srr5bxci4jq81t9fbfjh6w9aiv6dzuf8jv0rpnoqmtg81eyo300krwcy9kqr91d1h4hj4wm6v6d57bcb5q1m36q1tlioly9x9hec2jtcayrzysuigl87sf0j2fdrcp7wlfx',
                flowComponent: '7ginzckiltsee4yzxraervk1g9dnb7egufi8rd5ssxa61ujekc73xe83fsi6tsbvfn1to0trab01pz7mv3oc4sifklbpn8rh8irlawwp4p0erv0m16u00p5c9wn172rk2107wlyh71qvkvfxh1wbq5ka53ywp2lz',
                flowInterfaceName: 'wqhw1sm4drrfnk8v8p5wk6rr6yuulskd25czrag8dlvs8nj3pcfoo44rcfk628krdpqjwb0e09oa9r8py27n87lig6jqwwo3wwh5f7xxoqq514k4hx5b2wmofyn5lb8n3k2lsxyb515rxvflufkgu63w18br02gd',
                flowInterfaceNamespace: 'vk1xi8yikhf9n5su7av9qxtypefluxnkgttsx16lta32qlm240nquxh0xxfmj3eatqa4dba7bh2lqmn30r4roloq83o9u4ddmhnesq9r98358jl9ergjvgeoi5bbtnxcfuhcaynfp4gdoghi5sc1yx3x20oeqxfz',
                version: '5lltjqygf9ylrldhedql',
                adapterType: 'uhptstxcv56onlpcc929qnfedu9tt15z06d9tzjvsnn79r5d905tkvdpyo1d',
                direction: 'RECEIVER',
                transportProtocol: '6x12cys6ua2ya61o4trn0t40xsgmxjup653pzfutsk00plfvh0mqjl5qecte',
                messageProtocol: 'h5jighvykbhm21sy9juajkirdiwd410oynrd1o1xdoh8c3sqphw3nt9iizue',
                adapterEngineName: 'cc4dobdn5hfd8gztqm82waqdlft4x0l95836t4chssft602tzfj52fjxnr27qtfi3d55icu3q9yquth22broalmnbypc7tjjw3zctjxkgspg5cn54rapyt6r4bp2a3aq3p04rl068ek9gp1ll6yz1i7cgvqhpum9',
                url: '1hfipr3n0zzx5zmwgtii6hi83jsekic87mlp40ubdpzkin3oklymygzu29f72b1y1ldg0a4i2h4h50ipmkkw2y5gu8jhh55pom2f97vff82hu8jqq3kd0dtk4ttqkeil0r5v5hsblgzycfx6l0tivk1pbtuqec5o7s17nduh7wa6tu4u0qtzzjuwr00scqvib7vh48829vzv1f6h67pepy271wrhzqs5s73e3r214uot6p4twecgokk4ajmv2f2qseeiqjuqflb8slxw6wj1pledf96h40gihyg4fodntb14wmwcmu2zih295rhvtovy',
                username: '5eur90qjyn8o7bou5qa3tczkpcmv09qihopfz7a0ilufm32h58aiyx17wpkp3',
                remoteHost: '822p9q1amed400phic2k2pb0q4lfa8x16wie6cnbaj7uxejik1t4sopsqz0l8j4gq6yqw1tt7pkv24y8w5sslghjat9h1nsbczh65sitbt5bmzgt8jm9ioo4aplzzebx80pcqhr8jkwko8uopi00mw0b3ypzvsnc',
                remotePort: 6582356742,
                directory: 't1xbook7qwtsgyf344h720mre2f1c9sl62t568yunt9xeuu8irnkxe36cywb2h3jxvkntqv4qbz2nz25yn2hgzjzktmgvg9ts5cpu3a0hvk7txcggfs3zgwnwgrwbsoudkkyquxajdi37stjoo881eddoy4umkgt2xc51fgrz9wa4syz2n9wxqsykr0bznznw3fddeefcigxjxiqhrcokc45fowzwgjubocaplihcuyj5gpfbszfoul1k1vjnqiho5hgx575rs54an34dbd226gtxxm28pwb7g6tugzt26u8g55v7ara0ydn9k7lqqo2tk1o2ugaro587e3x2k4tmy21l19fenzdabvaservetpmwj3yf2s7xacicnfs51u5u7ddbwkxsicxz45zqr9kg1fm6e7bagddobum2wolmn572agvj7oyegd17sx9l93o2bdgup9kl9nmsjo361107qhlmmycu4iby5wn0snsxb0a6go72slej0ycnltkzey28ki8v62ooyld8v5z7d8g4wo2n5jyigv5b6ql1vr4f7cigs2lgwqzfaazb6g2gvcv02uxcjxp9058bj4vh64zwiu801kv30kej3p41cxibyqimeeqdnlwpg073huga239r2c7vsx4sjo76pmxd582a5e4hg80mqt0rj2qqvekiwipb01mcvruxyf6hhsyfl2wbotg2scu0p6ltdvmqydik9ifyv51aqmpm5z8ieqhp48wtv159itx67n7x183eg1r5udla70tmlf0mpjpwes9j1we5kwcu4jg2n7j6lrd1gm7w9h0ih3u16krz15923p3bfk52sikn30rzhzm6c3etv46uyupjo46a08b1qc42nft03vasy063xc41ry26eeut20vxk4y5mtrq1okajx5kbmjowrfa05lfq81ynegw1s1yvvpxiaxap9re5qvp1l5f6k6pv1o0tnaxgmgxdvrv8im00o4bke4grytjhbx2tt91nv0gyta9fdh545m1hg2',
                fileSchema: 'yg85oqfg48sha2xelzpo9oe6w9dd3i0ewl8wbcbbaepprque2xjv4q4aeix2px0sz2i3qnk7599k1albglmokug11ixo0wum8eckbu2dklaqfzr9hdm0zg9jtamc63qtovygw3gmxwcb2j17av5xzupxaziw4nak77y0dmblbh68driytbm0emzq4t2l6wpxwd4uhgz8xaml1xecef268bm3a0ui08tnk7v3t8ph78yjak5uo0mltx2hdtpz7p9z429zend3lsi91qo6qjb65bldacclr49our8e44y4sslwhh9ajwybqtdfmtmf838050caqe1309iw7ap4g11klur8u5yfrdvmu1bheqlodoph4tbyrh8dbj04uzpwowv6ce95rer5xf29m800lu3v0xubow4fgsbx3vduob7idzxog17fkhu2zo7v8xhhy54r92ww8xlldka6izille1zo54yhpaomx2udmyebb40x8fq5ot9dw8npgccps8jpotxj86n2acuzjlgxcm4lfwgerez55qrpnuu2ll6uexrctmuzhxz34swciq0ufoss4trufio9kii8fa2gcz992mo6a0i5o1cqdoo70oyoh2y6v8p5k739ce9g309u85orjos2mtly1vvxz8j5d5qxu87nkbm5dkpw7maacphgu89yt85o4teckvv1rjbypnqekorywy94wz9xfesgwk5ko5hkbfqjgpjck9sjnell5sviwpjz0ic5hnc1mny0bhsggrjk8txxk9r2cnk44e92g9p9vekjnvh04agoqmw8zqccy16nxlas0z5uothbzd0gdmzyhdwnw7bfekgv96dpe2gevsf2kaoh3akqckt1z3rgnx6kav3wsuxqmarj5z53qvnfst104jyi0ydz2r7pv6iyw7v4y6wsk85pznm8jstul8v6y5jqddqf1eoao2yiobwxih6euq8oehd84lp5qhpifx3392vs6cng1p1h91h37fokr3d862h6rjznxfgf6ii',
                proxyHost: 'aetbgoerwm6099vmpnn9wpv2z7iqrscv8bgisjzvjdwgzls4oga6xo0czgjg',
                proxyPort: 7574930879,
                destination: '1puhfxaf7fxfmhb9ejtyozc3i0u3tr9kkxrrxpyv8cjdrft3uf6250ge0sqmxum1086ajxm7s4vi4rmkymkxzuu0qqk1quborxv978h5tncysagvrcq2725eu3yy9u5jfhmjvulzs7mfghmrot6s5j44imz4l6nj',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '3gd1sm598tyjapyja876m073dwozqm8or0e3al6qhrpwq13dabxetuu6cm7r7gd2wp6eczalz8iyb85a4euko3vo80tp12lsnozlrhazgfqgkrqmcps7ngg4gvw5wbdfu9bzeactikpkd8ee5e7fch0z8haxll15',
                responsibleUserAccountName: '6ye4z1ryxqjmp4oulree',
                lastChangeUserAccount: 'aith9452zh3jcqfua6vr',
                lastChangedAt: '2020-07-29 10:14:39',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'pxmjmrordooa6nelnehu0txqp9vy7ui25tuns65a',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'c1n3uzzl5onz4k4707y3t084g0yiffktdg2cu9672q67sbyq09',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: '9wicp1t04t74p5mtqssv',
                party: 'vgqfkzmji17tlfood1ctipju72i11ldc48t7zebgsk8gb58rjawmg47ca1c6fyxtr18bqp7y94nqlfdnr4joxo76jsjqvim974raqnv8ndpjizcv4vzf350ptutsiaik16lryso4bblntdpfs7kkbr081iluox2x',
                component: 'ecyg5xajccy253cweg2skr73cwdbyqvwc5o85r5jez8a3ex228sbzsn5omxjy589ee2hxdy9rcw9szq0tewqe24h5aplqcqrtvh6yl2r7xz2ybz3kl0c01ofudnn2rkqc47u1pnmsh5suzn6eu6e4mnch6i37vax',
                name: 'wjvb8hx3c33o6m7dqbcla6mszwjeki2tipcs2pnfhmwjhxa9pbtraqr84lh5v74wjgjmtgoq7bzhmnay8rkkewia0h7ywe97md8adjges9z0lnrwb3arb6pfr74cg6s4ypph79g9e4p7qwb2stt1tpmc5ooj9d0p',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'ha6paf3bsyzma2ymr221125yqxeproe64nj8i42gvg6naerwyxeq0ky1sgqg01pwv8mak2rttlk4dvo9ag5rjklbp6wc147fonhwtg1wkkk39iv89d49rzm9kiwgy2w8lkw3a5r9evlcqna1lixu9gpb02uh7n2a',
                flowComponent: 'pjhjt75t7gg22b266fyuveviz96fwn47jt6bs9nlonj3z4bhace0kfec6ryya57qaukyis8055f7fw5pcde5xm5lp2c68rltnihy9u690xmo3q05w0wrdim5j4z6bezy55ecu9rn4j6zz9vrjec608ldrsd9koty',
                flowInterfaceName: 'icuhdndg17anp4h4ygp3gs6pk1i8nv0hnbjpndps71poow7k6q7r377drkubw2i4bnvuchjrifglo91pvf6qkdjbufrs8xodbm1kmd9eoyulpj2h77usrw45xop3akwlpwzammufx9x4ybhg3dk99dv0ity14vp7',
                flowInterfaceNamespace: 'iwn8s62co38wcrnbbwjxdfk10n3ixyz9y0skmekhd8beb6ui15i546qpjooc8m95pljw2f008vndxe3wfa17cwlz03hzdfchhsbo5c1dt9jfyehziwbl3ioq7ltxfgyf91t1rg6qvjfadnbv9zqedxo836od1c2h',
                version: 'hb3brxefj8v1wa96331x',
                adapterType: 'gwr8vz6ogdifpqpbonvlg229tt3456v1u6158wkt8619yxgtp9jg18q23cf4',
                direction: 'RECEIVER',
                transportProtocol: '7pobkhad7nj7fovu882peusdv2opapt49l0m55wz7hnoy1oqv87j0759rwfi',
                messageProtocol: 'gbyg2a7m8hudzesjmdafq4bwhhftzxdixp1tr7ubbn9mywe8s36u1rafz60c',
                adapterEngineName: 'gkdykcqco1n1qztcjda99vbfepzkfg036n839047eeuou1yex6hqzv9nxnkjdl5wzv7imdc1pw7qt7gerbfeukg69ngdnlufkj7q4d8mfqqrxk38b47lc145s17j8wfz2dt9x6akfd87gwp223711do4oicknxu9',
                url: '55bzf5wjn3af1qh8mrsyx993yfv9au9hvkprxtyfh52sb2ma11xc2yqwdjtlioxd9q9nxm670tj2trjzay8qhxbuuhribzmyshcfx8bw97vxc9t7ntwhx8cw9osprvqm4umufp8cd05r5j4qitofqrgfioiyord4qmf8lrtvwauyv8xpx6dac3v4dlixix1twh6iao989qrqyslv8ei7dz3sj293dob285tbqiyjjkijzmujk58wrf4v4pka2kt9lil0zjx8ca6ixuockq6dbz197tdo8mz37n6eml0vu9m22fj4453xlclhmx9dybqz',
                username: 'da6c0p60tq0eoxe6ya87ufkwg22xfk8j2c6utjc9v2fuv80zqticc8gsek45',
                remoteHost: 't832a08jlc9lhstyfkzfh1sw0yflgbhnyk9f2x8js8yqlro6shl77t64venei7wlk6wf807pqul620dh74if4l0v9tgy0edd3tbvoi4xkt15qti1gq4yqyzudrijx4ovahqw4g8pa55p22owf13svm33h5t2t06xg',
                remotePort: 4421385566,
                directory: '8szmojef19udf9p6kdjd50dg6pnhq9m208volec17an0zl134cabv279orzyv9kn8kp4r7xcqplba13enoua7z6g07sbb60v1v5y87t6f4va64ov8beeds2ptbws5fnn1tv811lkb21igrkhbjkbdvrllztshoa9ulptir6iauxf5rb39h3oyqyo2q5sg2go3kvjo1ry9dz7sw9re7du01mounp35dta3emitbtquqtx8sr1yea1enouk9sopzonb8itzmziq1y8fj1o1337e5oxs60sa1szl9lbrze21stdqhidn93emwbml071dkzie6pv9vyjc6w6n9vi81fapiqovdzi2g5h9qpwd1ugcbt1gm1udedyyvy7j1739tfhkcfoa87pjldr90jywy6i3pq83nho1olvxap6ky1c4qprpjhlw1edblrwafutzboc3ue9j0vu8ivsit7cjzrv4mdg4enwica7m4lv2wddwo1iulqj7guhdl6ltcbzfqb7y32jibj1zrwovkilpzaxrg7e6snkdgx3ii1u8o8l2alri4ycgb1l0v6nl7rq0hp7s5wtv949ls0pjd6l09ubmw9z85ss8xwh1t8sayzktrgbog48shc7mamkwwgrbp28lsm6aa3tvl7pl4vcrqc3kqkhd63pmbxvqz1hv7sk8cycrmouheuj8nw7gajo1ss9lphan2pefkc94luqqcty070qnf8p0siudjokxxwvkwnezxp13jev59vbcvfuvl93lg51u0pojkfr6lv4c0962a8fszfppsd1gvlq01brltcm0u8j90wow9ug587we4rusb0foke32cz88jnrqcq3b132jk6uqe3ebdnydka8ooujn5g4808b78da1q0g4j0wku7kamezafyxyvtk3phj2wagoxmrzs5zb8e0ivl6e71csdg559n18pmz2xs4nnynwta44zddvaq7urifohcxsarsvu5b81l74uavfcnfmd7a807bhs5287wk5mk3lefo',
                fileSchema: 'g3oh03lmuki1qwq24xs7rupgiy7wrik20urr6l2n1ievy1un1mgak9lsb887k9qnsuu9obge6by0vzhbiukz4ux1rfl9ax28cl8koz3tu74ktqwnojtknprab36tpa65q26v42oxq21tid34c8w05qp0221ek2lvac489uuld0k331dus72hh6ngbme7wir0agt8mbi5yzmbncxhh1v02wal9ak8d057477dilusu2hb4mlefx502ellay93evqqrtegukxroebuvqkej6dxi7q0zvnr8dwjn8le4kiyzr18nes6b3uug61jq7871wkkau3mpzy3mmqadb4f2j2h05cjtlb1uriqbpb2poukr71bc3cz3azrv22z0oz0ziwqfm32xidlz5du3huetnvffe4i0wz6dorvqlvbyj40rjrj5ntr5ugygvs7h7axomf7vllvyc1r81w8dr1jaux4qval001w5vste2f7n7gtqntnlilc64ac1lrk43cx2idzzyuvmh7bdbj6fh7km8u726whbmkmfluwy7kiklqslr4dxe6ulob6hm93dy916ax26yjhkb5gkie5mzi3ni73pstr16gxy7qfx1mo5uydpdr3qkrtzlgl4tyju2lo46m62w1r0ttwxyfh5z06bgk0wuab1sq3mmznvutp02k7rtpwls086qxvh09sqbyrbm1wg67llqcyoi059jwvaf986txd0ichpfra58sza42zagw23soj8gsmep7xpgrd4fyt6xku8v8kxucel8z13g3c9esbcwtvikv9v7qum72gsoxx6kx9c67a4zcyeexp2kif9wks8p9thvh5pjm6xamf7xlma7r3jozpphuch0r4jrxrio9qvdr3yps4g0p3j5mpc10s349dphvw4u9tlgtuvy5cv87oo9vax3nfu8r6d89qohhltrjylni9pc3e04u3a9kdnccj0407fe34hcemr6hkd686dr56giaynvjmmqm6pd2tmsb3qnu7vo9q1cuq',
                proxyHost: 'amu4ydh00qlmcwxw3munmc1d6b35542ekkqc8m06wl0zx1clkntcp483vnpk',
                proxyPort: 3039735262,
                destination: 'xk8bf1s1wad69e7376akktxudf6glkeqytsknxfnmvwnvu355twszpfwzpkn50q7xokw5xsq6pb4qind2lbt2v74mj8xm1keh0o3ycx5jh76sh1df894ywz3t1pqet33yxkknvsipra1nsqsv5iqvaickovifzoy',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'tzfwqrdhep36o2di9qdeej01p22aty4meahvz7w5b4rheer1w109un0jibnhgapzk1ql724x5l2j4l7xwtrvlpwnxams6nx9mevkxf5g622bydk6vv22yes51xs20uogkjw9gbz9tqntr1i65nrc63ezrdlr62nk',
                responsibleUserAccountName: '2uvj734pjlqhugzyeq3u',
                lastChangeUserAccount: 'o13e4f1ycbhit5fe1jcj',
                lastChangedAt: '2020-07-29 06:26:46',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'rkl0gbwlxmpyk0b25jyncal04u5bpuvebhv4ufq7',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: '6vk7b2ebw9krvzmmonxy6zuw62fz9ph8btjz7wzxox9ebb5cec',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: '128usd5eh5qztpcvynye',
                party: 'ns1219nfyou972u8xj3ty5zgto0nlb1i4d36pzque46c1kjfjvj5pfwff8k8zn1q6u3u5l0i1dcpadgfd0ijwsq5csaveiq5870jygt1yoe8r4xuznz9oony7wn2mnourg94u7q8iqw6y04fruejm9b3eqc4a8w0',
                component: 'if1zu2qob32ngti1e6u01bcin018z4jnqpi2xxynq49yb8sae1xuzfyi4t5juf1pq5i3otrlfpceuh0buqyuwgcri4pm4cdp5daoi4yrqy7r42czdjalpp3qes8ejdyq4zt9vl00dc3mdr7sm96g9sg4165dkj6f',
                name: '8u6qytncn6b5zmfwomw71heigku9bheaoj994gdvv8sa7lslr6bjd1j2sdhzx1un0vlha39fyzvmbr5q75lpamnvwrlzo77stzlkqmyqo525fvklzu23bh78jk2ti1zgkc8i1fcg2o1tja72qzlng1xz5dab7mgq',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'df9jwloz6d2b4g5zurl959ah19iwio7f5pnylnfkxxy0gf4z78bhmusndqwea94arcalxuahlharvllu8v7ay4ksys7zyf3htj4gu51mrv0cbyg3216san75lozp959ajvf3bfm7zc9hapbipsj78cpkb7tnukyp',
                flowComponent: '7opnveoaiuzp2vd695wkp3a3sa4a3qjgwwza7dok70ier5x6rzh3tjwv9fjb3hjlbxjp3wp615g0z36qmdmjamqvazy8k4rnk55skiq8okzgibyml34kcl96mn3r8lts7xanih9kanrtrv2d6mu9h65cnp6nh97a',
                flowInterfaceName: 'xmxvr22to5mq5m5b7yh2ah5wpfksjgetlfonh9ck75zvcne6j8zuqwacj16qmdx661iqdfix7ktijt9nwu9rtd3jble4qirn7cqm3215ffec93bwncy6djsa1xqogsiqvu97hzirg00pbtwavysdkhxu7qv49c3g',
                flowInterfaceNamespace: '1nhj6a3kkacy2xcnir9lr5dd4vrsbnie1hhtaw6odkz54l4ql85zqmgbj7kpt161uzixvxbk689pyg8nlwqq595ha8ad3mdcd9silz9u21h8iyu0gvjkl2qokkldwsin95jk0q7t4vbbi8049rmiriy257epeq7g',
                version: 'fqaj1vl3ewk0o6kbd5iq',
                adapterType: 'xjckf87ov6c7crz3ysftw8kkso5hjlel2ixdx73nsxvzcdlo8npwc36gk3d9',
                direction: 'SENDER',
                transportProtocol: 'jgrg8mphfj1y6z51h6wvh88rsl51o5f7vhkx87lzn8r020xgvtrgygb1y6r4',
                messageProtocol: 'gn4d6kw791c5nrshzhwec2kmkautsf1l7kf2ouppazo1l1ip7z8t04jbzkck',
                adapterEngineName: '4e4kghmc9jdcinj7js7dakekikh9ca04wnewgjqy5hwv1r1t67poichgxkqd3zr1673deta0fp9fadsu7e5jx2wh28xghi9oynfqf5k3hmctey1ayoweiym5jt4w3ljea06r3fo1dv3wbvtcwsaufy8xdgkxgepo',
                url: 'jy550vop1q3vnwb9m2ibk1mym1rsjvc85i7f8kestuolatro4o74qn1msufy2g9sncsfidcsa8ytur4jsyf4t1x0t19amt6iaeh3hgka4nu01zmtyse23w26wcazfauez1w78m2jccx4xak664ud0avrslk1kfxxsb4ggqyk30or6rnh94na2e1txhw8d5od9akqc4fbo9yaje88145py52pxr918gzhq96ovlt1f8lrk6xlio70p4yzgzz0abq92ptmrrvql10wuogcg31obkss3lqoakkdw26yh0l62f8a0fywmh2fsz4e0ndjysya',
                username: '0iiq553f37uu11df9kdo4ur9wjdsfogpbzqb2u01sfin1v14lukxa8r647gs',
                remoteHost: 'us5embnx1yrea71l5qyuvqnrd8gv0douy0i9ympbc46x9mst63meclm1yi217di8uam0mwx3di2my92przo0d9a1n2mt51v3ubltjopytvgrbcvt8ulq06ge3szu9wgulhi875gt3o40q4scf0zg6ev2kdr481uz',
                remotePort: 29949508418,
                directory: 'zwwu3pxqxkhd9488ipatf0qteskj2zfi0v2joqwmvvz0a39f2tsa8u5x6ryhqnqul9e9guhy4cyw1awd9zc595yp6e400pu1d3qm94zounb0m3q49gjz9xj1gychh6366zjg1wycr0opvnjrfk7wxrsgbfmbyv9ttnk9ayw14mxy6cw2vqj55grfxwppchybh82s7hqud7aklu3pzxfwszzydimyt0bzo2va09f9c9nq1ozcdlvfgo9ekuwohlekizyjot3lue7gdgwuylwnvsx4ctdsa703epynar5je8azkq3pxkm7t2y49qg8rtl3udvfgurqdl46my5jv54giwfjvjcptnnn1ca68u26zd9ae44cj0488040boolvnv8ds6e087vtart8pre7y5uvaezowty91ld95tuhqtjttr89su3wge24x4sdzhjshem62et9dy2r4tteo2hbzarrvk6otum5ni9580pmga1l2nz3ybrdirut4tolbztv7swfejjh9owzo4y1hnu3z2vpdc1afs4rilxqgr14i3v8b236pyox5p303bcwtenal5o9tbagl4bricysv9dpphrq1uogcivgox5df8dv7sp784ei1xxdnu6af1wkkn93c8wta3ndydu5rfl66uyncj2y8tomn4n7r83og04ulfma1c37juay9dt3mk1uxpm1r6xhfmokwse1jflxnb6a563h4kjo3nqlkd026gakxfzrahnt7d29fntg2bb5wf8dhz6fd3353wsqyll1kc3at0z1i8ua8x9v2lqz118uuflwqyyyevahnbyvqnyh29uj4t74bipodrrbzz9qjan1l3rv9ifp7mzdds7gejqrw191exzt1xt25bol3nstxz5cc2658l356l39s2qea188yecfrx4hz13e8fnyvz4uzblad9io77tz7irv9vezr18d7578xr1l4e2cno5idu3llsfq3p6o40h1rgh9wv9w44uab63nv8egakcbjk0krc9ttjn',
                fileSchema: 'ajtv2aowroo4rpyjwh2pc2th7dlkqobd4wdtz0y9087chqbwhzd6x6ygqv0lfpti0mgtcr2i0hcq9215ixku5o1dftxsgpt7o8rdyq1i4g04u1y7ot6yalrvwoeiqfx9rzbtzreq7v5coj143qfx8d7dz0gf067xv9qo0s0gq1eyo6s5m6xn4dmn52kqn8ugnp13exftn1mnyeb9ky8wf0xchmwf26hos8lxdphwzvgleboh5j8gmunk8ct1dvt04g1zr6uyjnm2ix61it4ctg6q6w2m9dzk26fqlgyltrs12ste8lbg2n9vfmxl490dy90mifgr8c7vzkawb8txg6lmr2pgjjl1yj8nh39wk581v1sh3r6isx5ri5xxozetiint7b3vtn8182vctcey7630ket26izt5phcmrin3ay2zgy2r10tr2xkm4d3q01bzm8vr21uu0vg8wh5u5j0rtcjfftfbvga9o49jfff99vp9w9ddfg4bxahrtckwg1bmj67i7nlwaci2kfy1fpggtsu0q80z0hqisy1varrltgpuqc5au502crktiwewti7slljdigo6h4d0z6feizgrm0j0309noipzzuqtgl5ontv3w6agc82qlqqa4to92nibtmthokm8xel4az37ccnr084f26blfcy1i558v45rx5mae0p5rhtlqwqspqdvoomhh1xw4tm591cwq3zwmf9ugqyx3k68gayzy1yr3c67q96gudfet0wwaptctiqnb7bms6vwdc8edd4t1g2zlvw5fcadgcuuraf07s0uzfx4e8ug94u3zc70j1gat4pc6n0bhq8ol1x6isouvd2irwy49qvyx62qqu5e6549zwlxt5djzkvyr7z9kkzuag5teu7z5mqxyhxraxl2o52x9q6eaa899bfj8k7pt9m19xr8kt4g5mkd9zane4s5s9jijebf9q4zcvohn0xwmytp6a26f3zqmnu1eaxmcm5pd4jlc1v9ec1nzx0fl6ezgl6sg3r',
                proxyHost: 's9k4q1r3irkdvp5ujte35apv2kzemoc0txzmlarjl1e23e310utm8eewa9cy',
                proxyPort: 5299155712,
                destination: 'c7pqrjphbu0s9tetf3hwd2c4zqujrfehv5p2pcfs02rl4fap025z1qt8eylsk9i5ggun9m8dcd1vatr2y380uefxakexm6habz8ur1oadfswvgs9vk8yysxlqz66njqk1h3v9yl6em4hugoe7ha0svy4d94kpx47',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'br8x1p67k5avk36d9zt5uww5m2ppk5e3f507aftvk69mw432on1krcbyo3r7rm5siu455ittvh73sun6xk8rrtbcmnaqwrinuqvd8ohjqa1jeiy834w2ihwlaqovptsuftehzx0bhvkfm6nckx8n9rz9wpeevtxx',
                responsibleUserAccountName: '0gykfrqfthmcwxro1nyf',
                lastChangeUserAccount: '6gxam7va0e12c6cniffq',
                lastChangedAt: '2020-07-29 00:45:11',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'ldzspxs04kitipl8hmlgrya9ktm6dvnsmkxa8sb4',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'r48b29d05r786qy77696p6h3aqp6q52k592j1urx0mcjhe8nyf',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'pzrrt3eipvlg0wkypfje',
                party: '7f4op4lynlw6e3u7slcr320tf6hw9423m1cop14ysozdem1tmhaam1owwt5xwtx0c6tizwj1mv9co9m8cee765pglwv4bakqg754h4bu1elhpuydrt9vdsda6tb3i6005bx838empbkwtv76dsrdn7l0k4te85ie',
                component: 'fen2sxl9iajj411p8rl5yvp2sk5vlv5xewj8q5664u8f8ywk28l09irqxdk96ttxg7ann2pmmzfoedbjvnn4or65q922cfb4b035cwyo42i86faqp194lvdtfjmex2t44zwbtru7d5m4r63z2lao9srhn8dpvi13',
                name: 'y7yn4ztg8562fqqosphrbch6hja1vjdo59sln5gtjh3ryjiciz4eows3rq6xggcfs6qisjhslkydqiq2810eps2q4b2vcyi83a1v4c6lj1ymqo1hs4elbenvn52dvjmjvda3wj7ivn6xjua18quqyel4j79rtauk',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'zm2aimdriqw12fhzhz1ca293g8prsqj3azfzg4vztooka6zyikiz29jfkowyj4wkbbvhs50bdjyy7kumkq0ym62m6w8wsvw8r24m14rq7o44b64mf0zbjsqdys3apf0yw3s87lytqobnfp8gq2dqh52o2rhikjx9',
                flowComponent: 'c2uqmbbm5vxfxt8yw5n75yaq1myy85qfqlwd39pw99u7jc5zazmx1c1t8pqvjpy54rbp6wn9zm3n0c4gr4yv3250yf1v4peakc8vt0m6en03gwqq3gnl0ddq4r3jr2vl5765jr5gvogkoc1ssjq986pvzulwyz6e',
                flowInterfaceName: '03yaluitn90tf29jg8syteaqskubufzaoiq7y89r9o1gw2cwdxi6q0wmhgeq9fsrvud403yq201sodzgenau6pfoxufd8wki8uipxq6aeglu1oz5bwjhewue1mpcozxl7vjie12o7my0l4i6t5eoc53hhk6onx3i',
                flowInterfaceNamespace: '3at88t5pgyxazvc71ycdtjr0xfh0d0uo5r5g4u63hjpphcsg7s5x9xyvmn2zmud7uuw6v9m9fvt4eb9woununzzx4gkp5iibgldoz1e5yi722eb8b9iukk4d25yt38zcn9ssglzf6z5ifpfm9tibw8l6zwqvn0i4',
                version: 'j6kzkafxpg710w3wzvdr',
                adapterType: '8b339x2mz0o48a8xkyhaa1wepcingi64rqx45p1guq1whbelogsjaz8hus4k',
                direction: 'RECEIVER',
                transportProtocol: 'dkavfjlh7mzqgr22ux51xzz6yhfddlypfruk9p7ta5lapir5zij2tw956isc',
                messageProtocol: '80ncxsl7heemibn0fmhcj2d6avk68dswsgmu4t3soypmsc58d6s1lyktvxfk',
                adapterEngineName: 'bulvs2ekv3v26w0de8fmobnjpymps8qs6c9dcce7razzapmo14fjn6p8keynq7c7zhgu41a7eevgsl4zn9keax02269hif07vafr7qo2mqxhb2md1o2mfzgyd23i3dv3845zikvu4zsmgkuxfefmg2gsdiww4ryu',
                url: '270k84v5vlcy4t69cnbode0lqrhv40zozo0upobv2crbpwti6nta0cud8ai2ejkranpgp9eyua4w95b9iboeoez3r2yipphh783ttasorix82c6yhdtkp5u7jif7ulh4jcu6usvgtm93iwkeoj2sgoqbddjhturayksamnvb4pan1wnkycbgmoowq0lkw54s3g66u6zj2xds0v4h7u44ulwdl5gsz2ldcjh99cj75tx6jco06vh3259isro9cuenq9m5hl1jp3ebs12c3433u62jmyj13ca7hzjpj11b9dk50n221t58jnxewrd9fqyx',
                username: 'egyz8r9synwdg7zev293xige2znvtocq3aat0gv2f91aeixnuli54s76wkry',
                remoteHost: 'qz5zb8ucazu9qklozg1pvdza4c3cwae1zyihpzf3q0g0ugoktmlwp3jsblxzgxgwgnk6e54yuyfr1c6fbs307881hvmw58j57fvi6u6ghn11oxqplk7lsp51ra4ye73qgdn2wf0ciad9gvu10zckh53aqaksykr4',
                remotePort: 8242123194,
                directory: 'iv4da4st5o8f2d6k8xzld3qxfzggmodyryftd4hhwew2f3uv89sfcovm2ffajfwmyhwoewtki40mvp5r2cq3sapdksuaeb8nato2hi2icy7ho29ihgf20xh55prjirqmklyvv7qzzavpahd46vf7k3y5o4fc27bd8g9alxo2o1ght03fxpezwvd2dqyxci8i5qh3r44pqsvydwkhx7mhyg04l563sm2207kicess8h6k51fgptpvtso86dxw7x7fkvrxxpbd2yx8yjgyk4eshti7pch5724ni6pk6obio0k7izn45ccydkurmubfn0a77vmc8uvd5w280unv3ym2gyf794o90tq2bluogy213gvjjqohuu1ifbr6rfek5e6hzl3tunyyw6hafefmcuqgwxe6z3abipfa5ut3if0mtyn8pfiwc6g1m9isfvuk3jmgftvh3m3nn4978e2yljjw8cbftn87k0kqy5km2trp753xp1n811yk445co5h5ub65nl8y3r0jhrrv3gc99umlbvagyax7wpahairibmi6kaavng4t6wkm7qlswzyl45881gguhxp508dlijtbw20ev6vj7i6c616j4ws7c86s0jt9h12mhqu77ufow7off0xuvmniqdcrf9eapi777dlbnrrxdncldyojt94o75haypaw6osp5kyyrc9omxkm2p5oqi5qsct1q5vt8vdgucwpoix487zzot6z0gpi0eurg6s04zc5clnnsg0zx6t82a3lu7bni2nxxwf0c8pu4rdrkaxx4g3ac1q9r8wykwsnidqcyhesqatg5cjhf9pntspmxe1gpmqljtxgo1e1n7612479swinlelkt5btixpvmi51sf4kccndr3bbamvj0gf48l0g2v343ukt2qeb8edtcu2nthqytdhfgb2mxieese1ugns60jb3m36olj1gl1lllu130a88aezbh73frx330i807fq8ej1k4qx688ysfjgygwqhax9nxdgosl8m05azs',
                fileSchema: 'jrkgqgx6wc5iy4udvfpz7z9mhjm5fu1gehc2meljx83poy50p84wbo9mhtcltcmwlaaqo2viixpmoe0fdje9wbllsskx02t9mrlia5whr0sglg03nj3gwxtlwy526gf9k0y5ttmlr2knft08rt0lg4gymikhgv6ceuo0oscxqt4w1rstsojckruimimn3tslf15ywpt44bkdsbt9bdmri4r029fsi94g4y22psqj1aubqcmmjm9fzbj3kohn1w3g5a857wcya06mgl4sdhvpeooy2jyyjc5hgsqog5saew7xvvt1bvxi9srnkv45ep9ek4429oq4jysiq2exvhk3rq90em2j4i56k9ju03toyyvucw77ty403h8795ne6a8ehidjcb2se6spvn2rrxkwhzfj6bfmj35r3cjzvebo0d40puhv1miofdhc19osy0eqe2vupralwk9n9rhf3vz42tjxp9g2ig41ke61jdoljf4dq8kln9t76vbnl8160ycth0xlonpyr7mes0gpmucabzncp13gd9jljz0x8na6zkpzv0mtlg8bc1f4djz8anb57sllfri7d7aeagwi6v13p9acvcjn04lfa3mkg1mtd5egsu9970eje6vmrpqqw4siprqjq01mj3i8r2nv5f4ov8d4rhldwig55em2gkwheh5wmairmswtzs2agxctm6s3opv8m8j4irf5g215hd0ds1n2j6ya71bok4kmh505k0y13a68qygjpo2l0o4i3v055azmt8jy0bz83i0dxuywzzxy132qevl2oe84d6h9ufypomlqtmezuuggb6sgjitut38xa9h5xyi9qaap3odw88k2jh00ewc45ql77ai545wi8p74pizk9qc5czf5m8nwknldm818yfm9s95tvoxukq4vok4xslxiwrjxtzyuy62dsp801q8d4n0n6nk9czjvu6lq421moojd8l5se8lv8vizjtfzs21uc62pykq4rhetydiqakzorrfjzg2yghb6',
                proxyHost: 'ebo5fffloisjity3a9ovih8frlk4syqtw2197zlslmhy641d1wlnls3t7nr9',
                proxyPort: 7639232724,
                destination: 'l7hx7sd0c1om592mtgxhetgl9s42wg66h7ed8i374qaul1v7xdqbp8rhkkraa8o891f5z4tft6cbogpdn0p7pi5mne3bc0yaavzelqm9utdkk8t8747hccf57sibot5w08d9c4gabtk9mw5q88hgt5iyy927gpip',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '6h7rscweu97mvnzd715in0lmdmhgoevdngkf9dw71nljsci42d6ov4fl6ols4i7cyhrw7sf9bu0oer77ei3pa8351dmxr4nptocfqke6mvx8lgxax6brht435i6t2sb7hatqoq0ertf4qkb8simtew3ngcj3uys2',
                responsibleUserAccountName: 'cc39dgb54aur8l9wzxz7',
                lastChangeUserAccount: 'pvh6ysx3aen8932rpb4z',
                lastChangedAt: '2020-07-28 19:55:59',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: '5m9gvfqgm9jttzijdx45j47c0y8rd0n75j7i1tjy',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: '6s7reu0mknp82ky5dhd4ojvqn5usya1zdbj9rgau0xcsdzzu8q',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'jmy86v9igqxyqyrsekm8',
                party: 'wrp9g0o4kseay3a8vscrowxh1od228fqnxd0tobvrwqni76e0nhves57kj96pnskbecwjlks5uz9gr3c80k0deyabwkmpgleb24nanfbehc8y3oqvntbcby7l13fjspfwcn39wwq8w9yqvn56b2ddbpmjsrdohs4',
                component: '80y4rlpqc2tlobcw882mi5b8fc9luqzeh7ggyjk0tsic6cdhnqkymgib36ra5vcpg3k5dalk3sh2htewx2ua9503u8o9f56ge42x5uwrsanmuz6cdu6twmwhdaqyit5tv8qyyaciojxarmsdjklfn97qppri7vi4',
                name: 'yk6ut2qx1x4ez9xi2gvzzo5wo1sfkqu8jyq0xd8dw9c6m20noun7vzb7elqqxuypq3kgjuzk6jq8343qmqttwi6sx3sci4vd0786t5j7dkb1ir0htjts6d92v915r9ukyqulttv0m5dfjozvxs3nkgfkibyunl2k',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'botfobnkkbx4e9gtslr5kl0qrlc7ygrnkq5tisrcs4z3p3wlry4ocyiql8lxblmle6zcoo5csb6d5p8gxwzkschckg6r9mulvdii6cu2fk94dgudqrf52x5hx0on09owl9qb3izfqbtfbx2n68uhw4n8bmyfllgx',
                flowComponent: 'i2oc8am0ddy91j22injve110kosp5x72hs5iweg1adz04z85v6o1kfeyu7olmsxi2b2vlj2llzbxy0el0ry0vkpx0836ur5y157hocrfqt1tvj5h5qzhvd4ikgdjssbdzuk3u7nzxctwm77q51292n03ybvgehmp',
                flowInterfaceName: 'xo01uj7sj6ru17tt8s0zb2rawquynuhkqs4qrc6y5x9rnv4vgvzcjiprtbstmxllfan9mdyqjpsegi2fkg2co3480tglidcn3nkbf1907om9fke0dgl2fex76czs9ud3auo8i6xwiddr9r1xjmbux30qdqb39ys8',
                flowInterfaceNamespace: 'sdz4dlepmi3cidi7jlnu895l95a14qgcty46s8ej9rddgndojeuwawphv1lamk3clyqjrmh702tltg1v5ufvqtsywuj29ypyl6vg2hefr0x31xt4xv71a3nae6v8hi42fsw19ybhhn8juqae6ivhszl6b6y4k8sm',
                version: '457xqz9hjf2zlz1ol8j0',
                adapterType: '4249fd5jmd8ix2drrja0aqww1ceob5wkkfy4974c0k7jmiwoexkia22bzavt',
                direction: 'RECEIVER',
                transportProtocol: 'ey3gy09zrcb4axk8bwd4henz7q6cjufrjzs39ulybzvlk9um3ng5waw9yuy8',
                messageProtocol: 'jqihrn5b8xvxicm9afoiib1i4p4g5rhbk5amzkwhhf1as4k7k9p4gjb5og5c',
                adapterEngineName: 'd0ac677p3f5qdhkyfeo0ovdtljsrkwaz1ky7kozdvyrpp0h2longze2j1gcpupyegxkwq1tbchd8t66zytiorj4sy1sfldxokggu5w5t5ghwy1o0jummuovyltdtje69kqsjd0ij18yq9ni74b8x2kv8z675cy9e',
                url: 'hv6bjn7gl90x77dp17sxvmnubdlyiu7tnsp95ddtvzmku2awlqh9gk4mg2l4j2r73x9t5kh8anjvy7zi61zb934hfn56r4vzt4sy385ykglbjkdpu6cdc0r7vr1z5wdgcp5s3o1tuzidbu13k1a68l2g7dhrn849y6zz2qn93qptgu2jg7z4so0tkjiyzdtpvhk4qe8v8taok8xmdt8jcjqiri86kefufqdlc1gpxzwgi1wv8aq514lfga3wbe3ebtcx5t1jjexilfu0mqh9c7wp39qgi586yct81psty7v2n6pw363lea7kvjnxjxmi',
                username: '5kxrvlqegv2farsq7ouwwwr7r2eqk8ck1chodmia0hd8l09hh4fbm1v9r3i1',
                remoteHost: 'jjpnb4ta3xf0k7yeazn3b6dlmn9elcw5odvgkzxejxft0uel5gwrm012zvwtbr5xavqecvqpog393jdxvtfis7l5hxqgy038bcud8n26ezdizqmfme0fg8ieigd66v6mf96da2r9zjwfm63cgdojnkrh3ptxlhcd',
                remotePort: 3210113019,
                directory: 'zzwo598b1s4ytba89ihgzqs3nfh82hlpq71j2qpdu7ddsy4jvt2i49p5ia9ev8ealu5pn4intu25ej31m1g8l6kivhs5n7loqo9k4w0ppuniuyo3qns1ikzptt5qsi1n22awz2bejtqx8ptne20gaje75eas3ux9wh9w4tt005ugv93wy2amkc8un25dxkvhhpvkhof5rguwmeevjxfxaz79l01x9awu9nhimczqk1pp07g5n9efn90si3lvnozrrxqrjdcydxfoc50r13h5q9a9lot86z8dgyd6iejmap2wgsod6ytch2n03vb54a185emhpy53uhfbnzf11w8o3ei6xvqqctb1f264gnz0ssg0ow2ukrptcbwuo4th14yg4dvlrj2bcn3m84tsg9g9o8sqoqa3kyj6kd5u0xb8i7tsijv3b8dnn4sjl7hztul3bz08sdk4u7q8t8zpeqb3yh3xancgjexcrz3z79iw65pynonkk49iynpqkazjvadftqg21qvgvgezxf2qu05plc6c60barpq76ieqghz9ndct9vzr17aonj35fub6n0fl6vdnt1npeohll4gp73g29plaaoftyjfwktv6uau4v1yk8gik4p2sl2ew1gj9qgw73udf320h3h46diq4v2o5dfmijzspsk0qzn1emqcnysb0z93sczxcyvg750evbbuygh93jxhp201ufdj9mkfyhizszwao3yziw5v6anqoaz25vsmbyr6u1ki3x3j1d1s9hghmlu3rhj686qmnar8kh7qxcbsya6qtelkua5c1ko9wjkyo2df22fyxrs49fe76sg3ysrvx7ixvcxaea16wf0r7359h88rafuh4l8sy6acfjqv2peurd2pqjr3155zm8t1lexpxwj1i8ewovzpgyq8mlg9dzayk8uhc1crs09vpgquwv5or0fafgu2a4zcxbikcgvpuzzjrahdew6zyr4dfoz3uc5evujd4ue8b2n5i6wfdhi6qq6esfequjogn',
                fileSchema: '64chhu9eo86y6ykavxwaksw09ypurkqp7ng06z1u7eifph3n55mz0de5esx2xo3wwwmhm0gtex0b773g8v25gioynvaxwqpzzcc9gkjs2bvjrcioazzprahkvx8o6bzmx47hism23igmzp7d2d6wbpsso14g6407bp5h1mci7exbso1qcyg3sd7u0k9gm86jol9ziajcfn1mo9w00lc8j6wpfroqpwgsej8q9d66ykgu9exvshdq631iwewxpiogdbtjs02nsf09lcst0gmia3lyfb5ztb8hmvysjhhs9yhaektlwp3s3d29rq5lrzveaaxkllhx3qbxvlrad8l3b1q0bbwwduv0imrrpea08fa40fzfzdlvd7ogwh6xk10m918hivh542dm8aapbxzg6o1ikz3ezqqonezym42h74q1ys0uhje6c0qekxc4wjkta4sj1h82extvtwk27j39y7gp8qctue4s9zm6of1cc6yx18vja0aif2z0k1o4jtu96q6aufhme2cxgxw4us67jyuy3vynq1x06m91wfccsejp5z3oxq3zyws84daob8qxeuojljmgtvllhvnwurxsjzstkftob48hdpipp1byxd0f3zua05k3ohiahcr4872yoodoahnzows1t2oygol496eurk30nww88cdgz7cbazei3gib4hxoeps5euogpole1ly77vgnvpwasf7kteir1cbt7avhj2t1y6zrbkyaouf1uh3fwtyy9t8o40sumkdlxyc20hffoembdebwkwlzrjrb9951or6adhqvki60ulscsmydzxrcr6cqfdbm3ggr49z96a4hfpvic7lmj9q7dguqph08zjjx2jdgc3j3gkjmi9xtvpcq50rmc713o3ghjbclwmijyndge8d4zmzt2dc0s11n85zz3mv9u2ulcdvo1crp9vh2z1x81yfd7mlcd3ldkjo3l1n3klv2wm48npbvqclhir6e2r2sl1x0skl0mbq105bqy3t137e2g3phi',
                proxyHost: '0ni7rhgpfhbocks2rthhew3b01dk56c0k7nywgy4kmdle241ecmgm8cymhdi',
                proxyPort: 2124934945,
                destination: 'n7jijqparkhc8rw9kx70fcie8pmgh79akya7aibmng0c70ku7mfo1v7g09298bo9a9isektjc108qkhctddzyts4ebcqp36mtqwm0hy2bsg5iud4oa8lbfpy4m8wx65u8husbj2d2sp3nrm9o1y2ke2z6hdt9o5s',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'qtf55l96pi11gxbfc25fmfgh1o4tt4ek2wuqxxrp3vc12q9lyd0u4dpz6sfpcty2erywq7isj240udc705qg8j20ltgp4c3mw714yksw3ptxbb3nw998o7a4sviuwwg8g14g0u8rq0x1mn3112w60s7m47k5uv17',
                responsibleUserAccountName: 'ur6dj7uhe3hwlk1zt05s',
                lastChangeUserAccount: 'yt1w30h8j959celwzqxk',
                lastChangedAt: '2020-07-29 13:02:52',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'm2y4ps74oxbcxcisfzrxbv5060pr8u42kz3hcejk',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'aialv4w4hku4jc5eyeyqf9dmjl2liqijx2mjwc6juktpljnk96',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: '7nxi8oavbo5gpfahabu5',
                party: '84kqpe94seguaij7czdd76eei8xb77xln91y9z3iimziv5bpt8bmyrtcr6o5uywez8d2mzbnu6zkivj22280jmy4ylrrsnakeq17oglz23jgo93nt7lfmzty36ov4mmq22mvm9p89069a2upui6aotk64nq661it',
                component: 'g3pvbk9a7nh4eqqz7gotue5xubl4xf9o8y76cp1cv07ypkyz9owg64a9knfvqjdceu8qkez1h3avgj3lluypymldl8hg4xx93jkkrexqu1dvdars4vavfplx20brxg09clm0yb3ixm5mzeaoj6ltdh3hpp83gtkd',
                name: 'fusrypuboc4xo7xtk4nefa1sv2mvgeouvml2gzm60yfvd90wv41i2jwoz9f0eav7ubab9g2azd6qo7ribz549uetj8xxhtfjd1gfnrq7aclcyzzm0jy4cgyu782zpp6smf1kx20md2to14j3xy5hklqlxgcf6k9t',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'jgay0a687xrhhtiaslheppvu6o0lxp39hp9p2djkj7p731u4do9n05blw1kll0ite2qi4qt26bgz1bgh6mimavhgtj1luegp4gv6scmnfftapleofts2cxr4l5p7kwi1qnp4faffkdmbhwad88wzoheisgky41sw',
                flowComponent: '1yiyuy98evi13zzpy8t9spkfwjhe692gwppnwmq2imzc9b3a1dglzina1hzsxdsz8rt05tk8r28hv9h82k04qud3my8j9kqgmt6j62xt8603tp5s69jgsp215rvu8tthenetad3ls2kkxvwozomn0ioi1r3znvhg',
                flowInterfaceName: 'mx69g4lhznqnq7ljm6dip6ro0wb37yov7anp4zyn1tp1jk8p9udk3hwwxay1r0l0itvuwci79x0zj733txg9w4s6wvvmdgaue6zf7g0t3t66fwhok3o2iyq5eevkxw5tasx1fwhq0cpu9mer6skhjlyfnz628pt8',
                flowInterfaceNamespace: '6ft7hu24ohqt5f93qdgb31r42xk0k9my8d843xdgncfx7lgmmh2ihvkqyak9dt2r0umadpb4gh0yxlu48m8y6nhhsqxdqtzzbsqdplncgdqasozfd9gpjekqwx4q8x9mzh0xrh7ftd8lskbfo6k2z7x9y87jbtk3',
                version: '18pty8smlf0fzlmvxa57',
                adapterType: '6jgzwghz8zb561h3yu7lxseh3nxpscd523orp9cyt04l5lfyx4ux5idh3log',
                direction: 'RECEIVER',
                transportProtocol: 'gyegu4xo87ktwcr5pem2odw0iaulnuyqul9z46ueknw9nng0t60z8sfwpaqe',
                messageProtocol: 'x6lcjtqj38eckhhspb8toaghtcjoz1dpsswkjgn9y1reftgfyggvzru8bgdr',
                adapterEngineName: 'kchfpwl3fxu4g9y3n38cqvfkfjppq15v260yjuq01llggoj2w5w4vc1ka5ij86nak3dziqt6612jkvz3vuggo3puqd3qy6b4fj06sc4xan3winz009mwf68u4wkvfv04agdpsotk2qp5hsc0mk4twchhuurm02c8',
                url: 'u50ep0jeez7yy1ks6ri80732d1ad2bsof63d4v4aodthe20b443do4cybm2ewm7ykza1u95ryhin5s26wr5f154efdabxa14lem04feo4gqd7snp3fuius2irixhuxro5hwc9tdn98j74w576zsibhs3021yemx5qywgn97lqfh688t2lgxrcrun5g1z9q69gg42cm2nxr7e1g786jxytbo0kbv1pq6w6puwpzq75xzewsytcib56ff69cuihtxc6vg219g0bo3in2wefgbahcwy96vmafdapuvvxxl42clqe642yr3zp9d7b3jszabd',
                username: '4oq5xy08nqfgobfm9yfcdp05g9y4cp7l86er9xstwrlkoo2iblk62hrp7f21',
                remoteHost: 'ig587da2bbvkwoz9b2spn5igievgmg0h7xg3e0elvd1t5jsoqnvaube6na4gwxla1v2xipg784bd3tc570xfhbp4e65b5ptcivnznartibi88doolxtyjqsqurnri0mwlfup9v8ad7aph8s86bk3ji7oy96prq7o',
                remotePort: 7727617918,
                directory: '9old1oqqkfox0f5s24qztpjga1c2n3ro2y7vwyn0e7gdna0ahki6burmejjdoibpvv9xxcj60qockx97hwrlj0gphgadfhu6fmywmec8g3c3toyqotitxz7z4p5kkjf9l9qky8i87twv7cl9pxqulyjtzmsko7ixntn6vxhy1t6rdm45zi79tv92g49eifm47e3cy55dd2fllz1airv1h1z5zunv6m0kw0xyt0a9hue7299uwd75331r4saxqjohecutyfryc3389kzk147pi8h1ufutorempsz9onj4leak6zgy1a3e2o77a4qe4epatxt6otgesbs9l1zz09bx13v8x084qbf16nb2b0jdqmlahyirzoa7ehdgws9ox023y1j97azrykjpcwjjbu6eo1e8v2he5r0vnkuprnv6ue68xkhy8dh2jfv4w0hp0dsc7qznrcvo8sfypjto4glb8rm1wa2e3ten7lne0s9ptit6b6pu2hryb0bkv9793l6t1hat40hr65x8nku5rmihvneq7m8ah6xcflcbu1crrl4ykoenloz6tz651i5tje42ozrgxju6tp8o23rk5itrc8bl9z1x4oai94vq8q85mev14etkktsmwahqte670ev6hekh8cy7ffss0mujjd22oawzep0l04pbweo0qcn8a13hgoejlf8d2dpr58r636llpmmyyv0ysv3n841ydckdl6p5fne581vp91aowmjc3923tyi4je0k7briscoinel5jelval974omj8ntte1mpps53o3dnvkrivp0b19a2gb7rp5l4wxjw5cumexk5493pjvkh9giu5v3jj5t116moias4huc9ofeoo962wolunz3mtitmj1lz4ly4nm7qkaut5jgqmkwtihf5qm1nwyj0f63dpkbo0o4dr022vg7jjdovjpuznkphv1936pix3ad4l4k3629gfsf5zgzc62yd496eo3ai6ee040d04dfshnb6e54pnx5vuuzhoqib429g',
                fileSchema: 'y28685l5jm8pzv984p3vfcl23idcwxbeos2c25dswhfpww3ahvl6ruvaaadenqj7c69qwurddjxpv5rxl6xjfxx2xvyob19hylnwtg995nzy0qtsfs39u3pwxefafng880rk3hmsb80oogi62qgody9g0ucg9n5agia992pg2ackkv24rwuxwxjmt12npa2er26m2cft4ezscgvc01ovybbkw33627mex3fam7qnrgepwoaynpg2y9gmloskubnf70t17w4ynb9zcna6wpp5k03cvw2fjn4zi1zqmxtvl9vc5ill4w6ktpmwyuow1jnogndx7udunisfh04aycax2jr3wih6uu0zfeb227rz5155ulsmpur82qz8j0dpeoergp3bxcnfr4wcbd60euh1i7n0y4rtg9v4mkdv4lqgnntw41csqkz7vw621slp4r8j9n34s8odcj0j9k4i1zrd3vdp9qwla14ai64oat60btmy9y3u7xy6kpfhko2jhx8qr2ym0vcmwrdy46azrx8t03aqdiptjpzwis4mj3yfcxkopkh6wgf8bgd6ekvdrwqyrzjc5hnsn4ln6q3tdoze9jhmxwhwou7ciohoqgpm0p80crv5afgu3s2i19j7mx5r92pb0ormuixlwd6xxigm0d36szfea8jtop32t8bpdxndjuxhjoyo5t82q8oljsa2a5wuwmtkuwtsekog2gjq8xi9zsyr6fgvmgv1fxu9kywbhjztspto1f6uvshdeyz7g5xc9ri1wm5bm3w5ahg7nwgl2j3it4ect9cvyq228rl6t7hc8kg3v9qv3aawwdv8icfeoivpcfg8xo5zd8c52enq8d05l6m8wnxng7zi9df73l5wc2ix50qa1zubuey6vxspbigdsp1xswyueiu9u5adzhhd88bfbvmgw36ah92qmny7g591siy0eky9xu3su92sd0vwtmlhl26fsaf65guzx40zpb0swcwae0vz3un4ax9ns7jf1ykb3mdb12e0',
                proxyHost: 'iqzviafwm6ew7fse2r3qm79c6bnct77rfgmbkawjqedljgjjr300ngpyv1ho0',
                proxyPort: 3335915419,
                destination: '2rm5jiyuy6h44dveepod9nipmpuxd7g197xu6qnbl2uuevv1nj0u9d1pwn162ib3c6s4k8fmcckeos07iquoacwkeeumtutkza7n4zyseoljg2kh1vmybtqd5x7rn1794af3j9la1r9x94fpe0lvzbxn1okw4pcv',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'txdofa3w7r8iaevnyy2ffl9mne2dsh9hos5gcz421dttcd4wy5whxvbqrdurjsjvf3o4e1dzj85ji1uhuxu75ff79jgexh6lml0ap9kmd6jwqrp7led9ter8qgz9w0j7acdq5y5ovf55nbmfejdfr3lqlellropp',
                responsibleUserAccountName: 'yy104sai2lsrnocxdfjv',
                lastChangeUserAccount: '8stb3g5rw7zkfxdnbjga',
                lastChangedAt: '2020-07-28 17:19:13',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: '198inz5ofwgz1xxf78u9hnb7u7jk8sty7i9dl8sd',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'omi08zh8dtffg3b9yrtqkpbl9wgvkol01e6t2g79xly6sg97q6',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'h37o8p43lxw5xh1rfe3a',
                party: 'ci3l056ncdno2eor7zha3z5n39zxeheab1vhvtjgysm4wc2co2lqytl40jmj8jv19qi3rtl07gyepuejwhc3zzmf5rivfisnpqvjx19gxt1eqiem9q39iiih96r7t0r6evcgto4b46eopml7nbcqu138xzjhpav6',
                component: 'foer3za4bymr4cdfxx63n4p092rt0nfjz008ftdakgmjus25p26ur8lqomvwfjt8mxnbkgzv5jpai8bx59hpdm18ffwugjf9xcgcx9fvix91nt3i74l4ph5a9tbwm410f3jvwfev2tbh2xsqpwhws2m5iuhptxl9',
                name: 'm4vazza7vju87frw4xbyq187zadidnfylz2595i5bi3crjbt1ug10gy0zdhdkwh9ayl8pmquuckqn74jhjf4u4lmmz1f35wrnantu7pmkejutxr42sa9un21gaqzi1dzj40q75zobhkkxge9kwacxdare3y4atv3',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'g8v70335xbm5eqo19ywpw124denspkqgrgp0rdww278wdd2nbgoyew9xgjfj9td0je2a6azet9i8pwt12ub1uy42negtiy9w7n0jl26xi2at32c9qhkiv81rdp782rdbrj3wqw7ud1pylyb4kk4wwr9a8mr0z99c',
                flowComponent: 'r0jx4d1yt5dg76d1v8pudc9mrokwvtb73ptih6turzzvxu50yj6n9q4pvn8phfwu9l1g11y4llx0rqoati3rq2du4ecdep2c0lzwt39o47r0crytiizzkotuen8xeq3z2hplv62fnsgyq6t8es2wbq2l02obnjh9',
                flowInterfaceName: 'f73muyt5kuybo21c7uc5xi8jsinwiet89joge8mbfwowyvse2m32ojk777ebg53x09g5ty58we7vuohvrteiyihd7p9400robietvbbp3s6w06m5tzg38otlymrhea391gmnpbvoahkbu5toiiemlwfmkir4o0ks',
                flowInterfaceNamespace: 'wpypay8q2t2uy9tkw9889eo55t4x370z69qov8mnwabpz2zbgv5tq9lofm9dgr7dbononnqelg69emjdmsgupfe9jre9agzylj0kdml3h7ydysremgqiaua1n4lt5na89vjytdtjl2324lrlxn9aru1heftfrg1w',
                version: '34t8a3yc7ju965oy5kzu',
                adapterType: '4jvzki470mchrdgw8sor3udkf5t4qor6eqrypkp6w2n3b87fojdg9phy0bz6',
                direction: 'SENDER',
                transportProtocol: 'u0nsyzcp05g14ftwtpbxqu9t88u9ucgdhbsbfhj63wa02gunvju5lcc1tq0d',
                messageProtocol: 'skl4cm6mv0fw5lcuf9g117n6p5sm3guq0mi431hwfk7noq2odl1ad0kxkdu6',
                adapterEngineName: 'v5plwwigh0080bl36swd9yor6w3l9lodhn5rahd7xei8h8i7a24yy2tyq3lxepog5ri35ns572wt6mv9hh3vj3a5d31cnzqaw0lyn92tyusowq3w28p25usqotp3s7rkd2kmk5sqpmzcbxrs641o0pgzn4y7fc6u',
                url: 'xccvmztky33yioihq54k0x8ogbc4vnhyguyrh3hr0wgfintw1sga00idql76uv8fks42juqvr77tyrditau9e6orkr3swp50pg4qyefbw7rhxd71pgdn4qeor6pskz43im8lhig131vz2bk2gc569mqegmvv37dncxfb8til1p9rn1oxif0rhexa368xz6ro5pbfsfqnvvjifnhh1zv5lhphhrfo9g300xfus4cc8muz3l804r3j1noh9xawsnoq8c51ylw77v2ao83i75o6hfmykjeazo4mbocoumap4qxh0h0c172vyfsq5ltpz07p',
                username: 'u23magpg5wa2lhpgatld40lx24in6nkb3lzpobuo1v3oxqdknsbbw9sdcamj',
                remoteHost: '5apkeqklao6yc3vnxzkg7wjxgz8rdn1en5e1u1c6o61ngtd5rage4xs2xcvst18m0tnkuuetulp9f00bvxsexw8w32yl5cn6so0mr7rt6wvafv7697g41uxpuuw9nubwdnw9t3ttg3qlhk64r25v0olsun0rfxj7',
                remotePort: 6532451491,
                directory: '385ydlpo18ipp7kn5tqqvc1gzikfpjjzgced3x6b49ghdib2l0m7fvgn5lua6egq8kz47v7tpmnqwaw0l16wnygk412j55h3768zmvifsz5r91b3n0xxxhzebdb2ww7tz7jusk0uktv799nspmxkkp7bawrev95bh60qoic9bmbkudoykfbzpwbvaz0eonpzl8pkm8vnpn7gsrfe2wlm05wj5uaay4n5yy4p8bi89smflt0p7vg1qwoq1jjjvd8trgek74106bcj4ewcn8kl69hswwa7x7bszvqqfxyyxts0qif7l66kagngq3m9sugyzngqx3lmn6hls5aq1241oa574payznjgny4uj8jdlilxox355tcqs3n0pi74cbv592eyert5kvlyn8opiiwypmw3i6ygm3ccw8c6luwfg3k5vv6jm7805w1wmn6mb50jbg0zk5wfb7ghl9qxbkmm5mhbzybdmn0wyos4hxzabjy445mcm6ehmkhtg3qgeefivxd240d6q16t20afej0btvpn8oux1v3ffs9n0fhw00s24xdqztkyl8w6lajf9eyyomhcla3oekd3xu0qs15zkgyfp3ii3i3j1yckzekgrgqcit1zicooayshzopu2ylibfkwyfxqzo80jbs5m51zw7jevjp88vkpncl5uzabe04hkebe3cnv9ricup4vzryiosmuxbigucsbeuxjaq61ucrjw53lfdnrrkgxpdni6vb2jx53d7m4e4lrvf9vjt8bv6bvuez2dy3h06xsyv17vtjp4g4uwvds5xzoxkmx97vrwp7f5nv7hqquvktow5kfeoofr5l00dw0sogdyb9a3ffcj7v6fn2wyznlnyykfq7csypleuj5jsq94nyy3iv2ixmorsqchuh60xavpitxdb8yiakcrlounsnlr2mifyoxtn6x43ar49m99rolfosfks11l2qqm57hnx0yhmvlh44qciwl2v2i4mvicssxe84zefmvp5ued3szz8owgyuv',
                fileSchema: 'dmbfqdsvfo7drtgdtc7sb0ayh17xd9f9vozyev7d5nwf4dlskrqx8yzba20ex7uxl5lwczf43mdr4hov5hm3k37c766r686todi07vq3zfuzl33vz2ar0w3pew36asrkecblp77l34jwiqvwv51wccxseldsdu7i2f1bw2nar466eres7v4nsmfk5rmyqqlb29y3hj2ee69rq0r0mmdwoqsk11hcn3eqzx1mf4hhhu728i3wyq2na1mapanxmfrjinf3kc9mwtl72o6myasp8ncfugpoew5r05rognfpe449uasm5pr9yru4fwo006xdmuk7iasdsgnwuhgy3gflr59odzu4ty0bs5od2isoyt2wjig11esgczw4q1kb583j6qm5x7azqr9029s2cemg4x503k2b0qks7kbpawcyuuqf8mc09gy61rwke5yek09pjt8rxset60r3ykls5i5ios5qvebsaszvw0hq68ec3oj38zwimtgi6lsg2loaq68zp4jaz5vtk538wzzezqaopkd4nkeafi39mogzjrvorv0gzmo7cchusamfsjkt08iestd15x6i99bs83rgddsqdsi3cc45207wgm2izr8v6wikup12ys0naxe93y9lx59stytmxk65hkyofg96b7htwp8187tz7niu25pegf0r9aza3ghgdqrjw5icpxf09x6ajcm5bgguwku7yhm8kyqo1hss3qum8s15yh6zuz7qe5zi0mrdtaockyns3lh3h5x66lj2qx6buod8gustayux8nb4ccpsyn88av42mny3jhdt3io8yqaj5sgv0kwsaox81upluv3ktgxhbk2p4a5ogukkr3msqzdmtpxdooac0v958icfnv7lo2gvc5lkqjav420mfncwdxfkvu7h9sfsuxdiux5ei8j7luuzkvera54hrmdh7o12qp5b02t0yrfxuw1365th08w7oltqoxzqdl72k0scgz56we7gmn9ktl9a3ln2raydb6wqvralhnjn',
                proxyHost: '09tpfqbjja0nm7u9th0w0634agz31fluk6cp33w1mrubjtl66ud00gzxgsbz',
                proxyPort: 88116626944,
                destination: 'eg6ujo8ofwxdth4qfa9eiq6qxrs6thfbr67yipyr6nxy7wa1oopf7y1wmw7kq7iqlbraabhe45mne4ft0dvf9lmu7cjx0cc9lwwhsu8vz6t8nk3cwgq4g4d77zc7rvvyvsbo2y9i0n5bkbsst3jcf265adj8xnkh',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'vea8r9ydt8wfiluoh3s9uaiotgh2nuuffq8omtg7si93oiev60tadzi52aoq1o663mp3kblhtahn11o8njkg7r1z4lx7w3ddicwqh73ip7rabhnt7hg1yiiks6yg3fj5160s9meo2isoeqzw43fb9cua1m20kiq3',
                responsibleUserAccountName: '0d9z9z6gftt5a24uc0cx',
                lastChangeUserAccount: 'hzek69yjir1kz8nnuxgy',
                lastChangedAt: '2020-07-28 13:35:33',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: '22oegeau7fspbiyb0z1fz6fxmbbib8we8yx7o5ip',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: '6dl21esa7p0vns7ymmbv1dsaesiztl9allz5vtpgtdh7m3jcyk',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'glswu465susd52922xma',
                party: 'io75jasrs9akdmobstx4j9ygtpd1x9zq30mr8g73ni2l8xoylzt11f5q6qrehyh27l27hjp769ny8470t3gg3034n7ka9430tsz5rrtpn64obgzlu1xo56gppv4a4utaoap59fm104vywoircdn4607ot1vqlknc',
                component: 'hnsxm28gukm4gyhqmg6r6k5od1clv6rx8ukpyr8o4wqmcmt9cyylwqe3aw6bdha8hjdqtbkqhlmdg8juknohlqeydclovk7sscczx5rmq77alm2ecmvuwe5rimenzbrt49cpyqqab3q3e4i4zwq2klscx5eoostz',
                name: 'kyltgi85axf0nautfu2v3jk0eroypwve8advt08ruumnmlm3oevx9erzdupodv74mdumllg0l2ir4xp5np3v06an3ay4ekdeh4c1f3ovzmswjwlrrx9vsf1g59f2xpdas73t5sl1rdxycvpctzdrh4qutfc2fj9h',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'jnxzef9yio3rxo5mpa9fnu9wca08gks67w6wmjm74bffoxpao1mbg4e6iol8vb0hg217mlmaulr4chmrsmsow9kh6eqndhn73z8vrhfitot0s3h4v1l56dez40uhcuwuodi6hi4qa8h8npood4p8hw0j4y3lhxsg',
                flowComponent: 'bmwf9ynu5x7e8w5h6t46s0e23kufk2137z5s5do4r28korynq7ym5w3h953rgq8s6c8lwjsduibvizjaghxavl5hffvsdtuzswa1idsh8w2tqzhqni662ywh4n6t4vrn1gyj6a6ig57m2w4uhche25v6vgegj8zt',
                flowInterfaceName: 'h5tg30cqdnj80ngfuy7wl4oxt7f6nop5vu50rn5n5yai7uwf2dxjvsmlowhq5ial4d4yxad43rwy4tmdaeqagyf8bvl9pwjg5wpkc7sncroa0mainotrepgfztztm382561yj987xanqfkgw1ixgm45rn6svmsdb',
                flowInterfaceNamespace: '2i89jcfslciy1aiziwqmqzue5ynacq4nx886ibdaswzbzeuzmf738kso5tcztdmsbgau7sna3e2dv876h2tuj8u6yuqplsy0hygkty5r0nv85qygnh65fndt9bbql38gjhbg9u3zcc42wvrqkg5ofciz27mtaa95',
                version: '7dfs45mlz61kqbve9fkd',
                adapterType: '7rhm8v8xnoru40eclm2w1x3ypyxq6npsvt9vay3uffa47apjoubjklw0bsi9',
                direction: 'SENDER',
                transportProtocol: 's987z69rwz3x9fhyhovu7yrvskbko7xrvqslg08estogi6bfed1o22m1t7cl',
                messageProtocol: 'x3nlwyjj2ji1ysxjs35ywx19fwtzz6c0rne30z7ltrtjje9selyb6kifti5q',
                adapterEngineName: '7c7qnoc6qvrvbnebvmd7e7um5o0whcvcdo6qa5dta766pb6oxwlqy7bmnyqyfbcmcyjkz4ynq802pd220p68b61hwdtyqfsuvperng8gp4dsabs3zlgghret8v4ckv22so402y32xi7rr7fc5f92a2v0dvrl3bvh',
                url: 'av7076e4ehqmzmzax5qvw66yz3l9kszdt1qcixz1nv5o6ljeg27yix0c2hwhp8wv5am3i1x3zh64q13t666909062wy9fybroz0wly5bp2wvd4bk89xojr4kvcuga9wiec2whc50039lxbp0onca9tpg0eox9j8gwm9pi3au8pnn4rcj36tfw3de7yc78ipy0i9cf9v41bfd8een3g2c503wf2l68ul7v7ibhuh426j7ulkgy883nosgvnnldwlt9hl7lhzu6v7qo04moy9h1ig13wgqfbudurdvljx90ylpkp24kowz1mwljdj91ru1',
                username: 'tyyu855nkid3jthg8h1rp192ejz80fsw0qyt3604i2o7t3lwy15i4n0w2zrk',
                remoteHost: '8hl4spf3mk1wi9wccvsz3sbv8tcko270v33375welzxb4wlyynv7en1z2b5hv1ms2ehbqejn495xts3fsqn5oxa80w6r1b7bre1rqqeuh4ee8qb8mrjwf8r0b92lf2hbjia549emo0w7kb76win11qtfpzg5wdpj',
                remotePort: 7971046853,
                directory: 'pukw8fge1vtzodaq2ez5kk0jivk1xypc6g372f6ct6yrb3l5nun1zn515pzb77jwqpy7w3oxu3mtxqr4vzl870w5ee9m04hf0joz3noh03myze80e8hrhq4xmcc37qy7gs94jgj5ev222ugvbku7zb3c8mdyrmq6oz0fzc14nmi2lokqxzj4a5axsi219cxq5p6guaqk6dhvqpj0evfl24ij0dh1oyjgarru07q3d4g17b04nrrokgex8tg1qh9t1onlgvxs7u2q25n1snknp4injxd87z75966to7tdfv8ixwcb0kemn9f80qq2tk7lv290jd0zenvp5yznwjnz45jhcwf9nhdbfepzgby6q6pddawy1ck2g99auly0ya6ivrd91pi9ytlynpt9beowoynbp5561c6uadno28ip39657l4jc0t5g6dckwzfkv3eqieurqmjs2dmhu7pwrcgto0hpu8uhv62jxf6bqooacfsygkzpk1n3wtqjswd65fv7y1rcy3lvwt7f4s03n3vojj6c0t27v6jzqmyo2z2d2ppnkl3mlovyuezv9tbl3xmtc1terokl07k8lnzrm207qtot8wyf3n34d5rdgckkxbg1ej35kw8b31dhkyqrartsftrcmhl9ycjv36apk91f3xjo4rdcqbjrpttg081oaiojdg5zn4qmxy1dz8ay6y9qla7575rn0qmx6u9njgng3o8nlbcod8q0sy1qb5a7zqxz2u2lnpviba5brmeyq7hwoqr7926scs4ivlpobmlsmrzm133byar115c0037emrlfz1w7f798kfe9mk29fslfhxcwzy8v2nxa24cim15qwjytuo88p94m10ec90h2rylrz7ptgkkm7a3r4vz0cq77enmyofngy8zobr0w3bt5y9bns7gx5iac64mmdzxn7dj6ba4045njidyvlwocmq1io7281xyeb8rs200bwd346axzhr5jxc9dpssw4a4zgsfbwczdlr3wxwvq6rzxhyf',
                fileSchema: '2m9dx8crfl1889sxo715gd60u6qdfbwjcrp9yz2hdjqi21akcqwvdfnsv5tsqb7l6qx8x53t9nmmi9nx9wb3j20w1g4czhijms6q8t8x12mihkot226126joo0af3z9ykijz4m0qp6o7nbe6mjp6svc6ccmt5lb134omj46r4e0pho6tvona0wxiwqwa430by15ge1xjmhx6w25bjmmko42c4buup20eldj2ckmpf024gwmomlhxcwycsv2dfe01v3n60ujljnx1okkuyl2faftsdnegrjclqqj9stp3ogtbm9ntv8i4qc41kdx6ya9zmh1fapmx5k325gthipi2blva47wo1jwq4h48jd9tn78ppp2cl33jdws3ba4kuphe67vuezr939vozsy7abisvw1b66pju14kdn2jap6pdfeo1gc473sefcuekk3tcljzgcv3rkt0j1oln610dzcp7u9pz263mxq6i3jjh59rd2vh6i73pfexmmo4igl250iy2rtclcijw8nfzb8sgu0mfu72k2w8bimrnc9kv17l1zxlv8gcpxhsre2v24a8ybghky7l2ngcoqi4ndmladyxrajfny6vz02k72yyk1m0cze7tzade8bfvaeb3oyxrwboc9t3skapblha028ar95hrvzcijkydehy35f8p598kzytwdk2ez0z275b9hno9utg8h2uzmfvqu7pjabj1uepqiity5ba2dzb863gngufqcyfimbuqeu0y9df9frqmohexctgzz2fj6e4ufnl25tx60qllbqwkntooec0h0w4014766fw305lly979mcodfqqudbj57ubezgxwft4kfqzyisr4uoc9zglll11js7uyt1rge783f3h7zk85a1gjsp4wn9cghdw06oli4rvc5897qlzc5cum90914004k86lqi697f227zfii2cdrj3mpt0jkhanetn1146x2c9xu4oeuuc81874zxi9mqbq3a56wz5s5dym0m1pcsork8kebt8',
                proxyHost: 'k8op9lmyr4rlb3k0rzncduyzlw817zs1uhurtjoaw2fwme6hwe8ygwe759ir',
                proxyPort: 5859338932,
                destination: 'i8kzjuy6qisjd8xivjjjcd3m4h1zzr2i7u2ab9f0lhssc18ukgmsixf82azeqtwfn6theb6uj5p40oxrvt9sutjkyf1olcjh0j9ufvvst1qdlbce5fpwwzuv992hezdjohrcvin26b8cudkgtac8l83i74yj5pnto',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'epvgzeixkogageq0g340oz58qsx0pk1uog7umu8a06cdkk683h3svnctu3y0c0pgfxcrhgvkful5x7tbp3pmytqlgrub23q8yz69u7q7mkn1bfdvhx9jn6t6l654sptn2pixxr6cm3du97cyeppz5ow3im0w8hwy',
                responsibleUserAccountName: 's66z0azwubhyz9m53rhn',
                lastChangeUserAccount: 'scxrh2vbtc85euxr3bbc',
                lastChangedAt: '2020-07-28 14:11:31',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: '42anqofq2615e8qcn2tocw8jffr6kfgtfm72dtt0',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'fp2wq85eutgajb87okdxgs9u83xllwo709gaayrf1krbq70a26',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'xjq15oun2qv1j1tpuuek',
                party: 'itpk3glfezrlpyglntrm8r0hjy10opq8o2oo0i6pvy9ii0k9yrhm3mu4z6zy0dbgkf0k3o2e3wdt75vvw92snreu6mybc0togwepc5krh9z8h72gi9z8r7u5b446a2rsfqv9k452irjx4y0y9p7w5scuede2zx5f',
                component: 'nmolc08g8d2og4kfl50f99p4k4bfjccol3hbkvs8w0szjomi09dbl4wqgdagkom9q1kcoif7h5z9p9fymlb6fvbybzn7hn3ieexg9ibi221yskam82lyu72l58i92ckm3q24buggsq3a3crqe08wy4ee3bnaq9oi',
                name: 'hhdcudn26i1wn23wmdv6wn004cl3e6wisrtgrstg5vaq0uegakjdl1wnetg14ix2te2ic005gvaukqoy3msy1s5jiskq1ix3s053yebisgfble2cme1vyx2sorbh1mjlpqhq6sit8t74fz4q7zn60pct01ccawqo',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: '0dqayiun811cssuuzoof0vhfrr1muda65hzq9ydnyvjuqmjpddla2y1igecvy12uhkjgqj0ar23w5dhk1bvzkfydk58oyuiwz6ujb2frsp7k8uuuc3t9nvznuysqrx5uqyufdvk8ia69wr36i1p02syxzl9t3d9m',
                flowComponent: 't09somhen6o6qg8ja6r28d6hqr64c1nz0qvbmatuc9kvia0y4te8ll69ldl7s99nbexjj9aqbr7zhcyhv7rtbc6bbu9dp6s1uh9trnpn9ewk6y218pfibl1kgzzrmz2azgail77eheql9q40suq2wps1dnhqd6n9',
                flowInterfaceName: '7ruqpkx21n7powv3ss4d5bv2rua92p824r9qcdxx48bgaoa95lgv9jfpliogxrb8f69z4h8qnxug1jicv0lg7c0shpsmjeoxe67b0kcec17ikcsxp6tz7mniti0ohpzqkvz9cf7on7s6nsve5owbb91ql5r1gam1',
                flowInterfaceNamespace: 'ydq9ku4gdb2fnfhoxbv6dy83uwu72x072v6nsk5g23sbtohmzziyjj7ow4u6ola75i430rfxbmh1h91aoomcnwid6gqsb3kzxgcfkqmfnwzd3pls6xtlrq0sapisag8bbtz4y7lrnmxcup5uj9f1l2davqti1klz',
                version: 'm81v6r5br9m29fw3sqxg',
                adapterType: '6wrxqsfq5ponwv1vumxxzqigs8vjwb4is881sfvot80d6arkicoe4c265gkm',
                direction: 'SENDER',
                transportProtocol: 'qb0l2ww1qln4lacb3hscu8jk226lvs02gfjlt5r9li6uxo1c75w1xq126qb1',
                messageProtocol: 'petdgwcuewygoa26aqhcdf36wa4y1gko823rstu8bm05xvntaqht35e9d54q',
                adapterEngineName: 'owjgouwsuyrmcx1rf4w79qrdjaf5wgae7f4qrq69qgg57gdouc4ks3ff1eanfp9jj2zlwq9hmvimdbtd35m1hmfv8xm4ijh8hka58cewoi6v0uydmwv20cvu0q16rihie3udxn0gf0qb72ut0s61yvs8lq3tyzqi',
                url: 'ue8yez5na3c9po95ryoq8v5atbivk5nsehw4xfduxzqxakgdjxfoefhn34osai5y6gasni01ekn63kaij6x4c4obs9u7eys0tzq3mz924neh24jreeoejlveldug3cyvaw8qcwqs371bd60t5xt44e1br494vrqag6zmea3zfwz53fbt23okoxjdomv32lton62n2moazsju3x8dpj6iajq97smorsy4ene1wmivxfkvbezn347kzzvinlmrc9wh2l37wjfzlleibdjud0pqxyjklggh1a2b3ictexwpiezwccjsfcczb6ldvs96ebgi',
                username: 'q1l9xwv532c3lq22cafb8076csq7icfrkaq0h45mxl9w61xigpqab29q8ytq',
                remoteHost: 'dz870nu2e743v18kmclxolro9wyal5gko514lu89v1ou9bwntlptajdxvkytzpcyqqwcy2s7yq1t5j9h2m8oahh7ozspe45nnvg7wsf52dlxr1qwo3yddocnoflufb4c6e1pdwavfbbvh3j0vyh8r10bxh08b7hm',
                remotePort: 7090618547,
                directory: 'vo02m2eivcamhho48077bagtuq6vq4yyrbgwdsbtr226toij8usq7y3b6ctmke9gf5cqfrrlkri75qkdr26dr9xtb0cv9rghdqs4hilr07v6b13t7aq4402z6e0746rr3wghqvo0qwfa2u8p9ozx7z45yyb374zll64lrs5nbf8qd10ovg3kr9cucndykx3rka7dd4rovas6ntv5bgjb5g0cd7duq7rthd8x8pie2io8s09ky3dx9jlphsifly2f8po51tjf1dchchifkn7j0bimcy7237zt0dbbx2bu565lqz62e4oar56z4qyfou3bpe4xs7i3a35grrlv7yfhugd99dtgvqy4vaw01ircy43xkn9rih3ueyt76qod9xpd35pb61vocq5mrleloonla255mm1kdzbe2ssgjbdmo28y46otamowe509ewwzyc2en2m2smyygyqvxv03nmb96gblbft16je4kyvo67hb0j1j5cv5svvnvq7f5nnovuw201mw0n2lr2wu4evh37tm177far18dggvrz2j2eu6e6aoyy9opp2thj4duuavggvqo29omszkgfx5qsmv48ik5v1mwfe0pfqqg1eptd45sc2eg1nufypchfki5ww6kadl5egpx1y3iri07h7exjyd5eev2s82qdx3v5s34zr8xx2u0n3xdjl9r34cm1opricx8rnilzdpc6owwnp5b88wlx2llqf9llou6b4nzlgka876b2kcagz6kg88iwgcrht1gs7jbvkjf7lnzhtqk0wgnyuc72nhcndsk5oqor8wpz50qf6tb3l9jepg3p4iaa9vc66e1xo71t3s638a0ufzhju8twkculullghome2tw3aphfz63jqcj4borme7ytc3xzh44n1f3fe3na2bwuofbv3i97yveaf0gu9dcjjy23i5820hjdluhpd13i6uv2u0tx398sd53i4axjbs9zjzh2862wcn7ucqufn020bmsaqz4suqtfpbe6pflxhuzk4t',
                fileSchema: 'kmrmviiiwfcycchbp6ttjna5hmqeez5js3lc2a6rg1waj1x1hej7pxdbuax5c4xspb1ck4qq218amsqoysc6m1jnrnm75cjn6ldhzdlcfpdyblkqw0726ut8u6kuljc5vvf5zv606p29xhwnnfg7ncajm8cyci45007ivjmnjtnln183aqg5xrboq9p42wuowiqzndzai06djpk6oetn27ifrvqh9scx85lymj56j7nywqm330nhqnsdiav7az660i2aw680iithbmlgp1cs4e4rxo8nni70gsk2enrfit9txwwmoq1tvgs26z3ohcxuw5ef47hqxn40pu09e61h6yn8mk3llsrl052nxribh3ijjuwf5o9rp4tedirtg6gatavyq15b0srlwo3k9syqs9vjofwcx4dod07obcdknc1w9kg68xxocn3tmrg5ahadmfrn164kiyb95kfdktb4athofugtg6ygcftdzx3bw06k5vjrqtrkxcadmpwlnrf1136qv1vf0pofk27bf9jaf65ebuaz6y2x4yxxbr7qnlsrsoq32kr02jgmv1sex9t99qfzvrr4cey17n1h1d6samu42arrgtwft1qm9v2yns8at8bq5eatj1ed47ogmxeasow1s05j0g1tbovrstw3vadaj50y7h2ro51jhm4m7r72iq8vsxy7a0u394zak0w8hz4oqvmk3hueqqu1z02x9qrdnt4hwchla5ehh38obflzusvi5y38w0fxyg3icn2vunw150443e8md8ilrm399bwa2fb5zp36jqmfkoaz1ty5c93k25ckfcn0d5ayey5utfaidjnygppb0ifgwx7ce30eeyk9d23lxxubl32rmr5n5cwdaaihu9luhg9oki48m8r33lv7j7uedcfadryfiycn92q2ug5azkio83s1p7x7zt0ilaupos90aic439obuo7a6d0aokh822obk8ofx8rmfinjln5bzmqjqhruwhg0sdgtse8a164kw5nyoz3b',
                proxyHost: 'hp1ccbyxulzynouqj1aga1lnn3jg2ceqybzkn936w7pc9ynwrk47z7b6zn8x',
                proxyPort: 1845739706,
                destination: '80c1c0wpnpe4ttrk5l622aakw9gmpltznkcz7j6chjbch4vkftl3wgxle7ydkjwjj77bhf1qrfiyjq17f920mhy4p8yylolpml6rjnjkuq44nkb1jqbpakkbzlfy613bzouiwb1ob88tq9hzdi0ugwse3aenyr2k',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'dvuandiwdlq87krwku04sc5uey2powf7ejzis8kwu1h5qk7mhgf7z704w1an26fqxoajmkdss8ltv6tqulwii0j96fxlcsrfz2w27ikf4mn9z05tn5afubx5f9yqn1xh9h0j530dfqvf3sps5m5fmtwrxs0wgyli8',
                responsibleUserAccountName: 'hxvki2o83u2exsq1a9at',
                lastChangeUserAccount: '17bkcy6dev8yede60ps2',
                lastChangedAt: '2020-07-28 19:15:58',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'asgvl8j49cy62sc87dqd4hee6fru28hw2ez5ujfu',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'exsncyuc9ks9fofaj003szkqmv0ydpftr1iecnz85zqzhygmpa',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: '4ym4skrlnb0idu5gl0le',
                party: '4ntnm855btnqh9bi9uynjbcqct2abhnwsp13a7bjdpvoljytidvu2xrunny8x1qjj1e6dxkqkdjocrl0kaxarp30dvch76ng8xw3pg1k8b6qz7mirr262hvf40zsa0w00o9ste6t9wlqqyuspgkatwwa27bvu1ds',
                component: '04z7p5bojhw80vtfldwga3yp1ey6q6y3ka6seo11jiuj09keuj9j2e6l3eswk5tele9vgirnu5518p97zx9mw6az4dsjehakon2ng2ks0ljxeoo8sdt0koxu5usw69424amtm2ub7wzc4lf4t084mhuhe2cmd7id',
                name: 'ut7d2rwgzgx1lmq5im5ab9xpnahi65ah1j5jlw4vv7b861rtrab8m3fkhifjtkn1lwj6nyotfqmp20yld0n7y0uko3ufsfsvunu6rcqqo18g0zayme7vn5hzd8y404rmqow0x80l2gw96p2iqhlaetf87oqv8d8u',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'axvvp43io1vlteg53yomyeb6xxcxj7qrhcbcq46zgro4mvo4rfgak9ibthuzu2ptsqav2z3v4auz3on2hx55c2cejqb8sn8974cnp45i7emxmaar4agd0ux44f1w15alfu79m0zil21ecfh71l6qs1adnowubzaz',
                flowComponent: '363jwdjmpxfg9f015owvqj87r31paswxwfola1bhs5yupgtvlj20ws8893d0uvaw065qm7fww0zirwp5ru1b21rwihw8hcw7sa0yv21ltdmd8cx1w13m4by0kic9zbizu7cmh4f4fstl1rinnp284g1i0xyrds81',
                flowInterfaceName: 'ehgp5mwjbkhdx2s6bl3mwkohnsc4gczq405vt0xoc8od9mapw7gssq5o02opy0cplqyaqt62si8th0vwi4t3e4ud4blia2f11mnljwbfw2qcqywjpjxh0vuam3b1vr8jld70ad6rd0ehj595077asq5ytww7hhbn',
                flowInterfaceNamespace: 'r1binzpsclczi89d4l7my6zbbq5uyx1yikjbnwacaqpgkiqo8biekyyfswzer0jt44ktvemsck3jpq5tpdvn8ap0xxifqqfxlt1poqt5t4p9uptv7ddye20yfkomcqwt769vphsud5wsns8tecgggb0rugot1vqu',
                version: 'u3hu73j8zm754hmsjsbm',
                adapterType: 'ffotbgx1ukamkqin19wb8wblua5vzjrfytsbwupxpznnm8che401jxc1kdbe',
                direction: 'SENDER',
                transportProtocol: 'bfwdwgpcnm5s53tywizutp6pt18xf17c99t6n11b9dmvw66uks9atjv0ge1r',
                messageProtocol: '866t6wq9ra3dayfpb89irxq1lzz50df7i0ykdu0qdjffhxrzwb1k1l56n83p',
                adapterEngineName: 'yoti9fj0f5l2griy71i2s7dbhwjwzbtn8e2ozb19f544k3rzhgq9csu5y0gar6q1xcni27p1opr823ilzja34q6qrybww1nc1pex6jsxgrcw5qy0ixalh1za5ammwp1yst5iucy0ubc5lm86hdd4wq6il0ciglr4',
                url: 'yqmuk335h301agb3ck2i4tqykief31we81bjtef9fon812dg7nnkkemu8b8wb3694su2ud24qp6l7rurahv488voyk0qi3j3vbxuzyyymaf7l1qcibge0ixlt9oottaq2nnhct6goesneyl0d9lwd5yhlxak1ydghwe1pzs67gofu82zovn2wun6rqi9po5hhpvlaqlgeltyruw09z1j24cpl3owib20i1e6r0j5atvb21d0tq8dgr2ml0yx6ej5cu386pwh63w0bqtgu623ib9s7zier6hpb4zxsdnj3viohdo2rbkzfnbflvociffg',
                username: 'eq5m4usmbd6rglz53ldt1jtei3wdrcmkm4b17xyscxis35gokgnmqnqc9ur2',
                remoteHost: 'zz3pt4xsyc0sfghrcgluj5xw92h8kczxobk30nn3hei16lg78dsd00ksc0pzymfgeey2tkl3b3sf5ubkg1dn0qwsf6d4yufrdjq1ocozcthybpxmmsz8x4vp8kz3385to6ppi1d0v219ga1cphwhnj659mzxii9b',
                remotePort: 7079078846,
                directory: 'yclbhdh3skch4dica5vvz0yalnel9b1r6srfgl0l5mh1kcrvyblo4tdglgxzme73kows7twvzv9yh6dawpxds8d65aozx15x2v3qh9lhj8r0r8bekeoxo9bbh8pslawrf2zdydhoaq3a045xqjbxlqjz7skj0as5chf71rj5820dgsm3tl1g77mn59v3auhteeq12gpleqqfe40dq7oy8fefzz76o7rq6z905c5yb9ebz6u1rej6ergd4m6wbhysbnfalu7jokqwcimblqlamkkjf7e51uuh6wy6z0ja4svqzcp0vkf4zdcvssrugsemxoane8mzksqzcm737inpqjl4v921g2uveth1wj27zjanfxi9w4yfqtdu8oaaovc9qz7ryaq4yxh19qcwd8wsfhxa0okht4g3o99lz11kzaqd7fsd7v12o7jikh6v98oi0wzkqr2ex73u2uukfoovacu6h8064stutddxldvh7n18w1kpbp3wjhxzd1j5ec8bzjkzi0a5uv98gv5jqy8z632bspxpjwj7mlmkx35ibmhsoeigf03gbth6sjxnyzhtknzdf1ezpertflmj7f70afa4o2g9k2f5f2qddq8bglocx18yo9f8hlxpdhrxl7gl5llobor827q3lu2kwvjv85jieb4pyhf3oehg447p1hx43wb9yx9wqqm7l9ess3l4kchkj9faheivhxgozy2379irqu085eekz9f4skc2e8xsgakfzhysxqc79wjehmzi1xpbupz4sui7k56r4f793w83h77qu2c8saluzhz3vearsnyslow0yjl1zeepxgsi9rop12cj5e5uk9867jmbvj8hnhq0h0n2p7qpw7p0d5yb73p1396mqcdjahq0tozhxfzdob5gzyh58fbt410n0jwod5ma5wmhsbouysxhjlcf2ruwpekunvi2rvmaz61m1v0d2absf8ky8aesqw7cti93jqgw42ac7d2hjgnq8n6scqqpxm7c2vvuxp671tve',
                fileSchema: 'bbcvipj3y00r6gdyoku13rzbsdhzcu0wirlpsiputab9ce8db4hn3dvjcdvu2cpfti900fyubyh2t2p3f9zdchrsj93gi8joovch8tj4l27ibbyys6pi5by1hkhfqam6r4yqiwmkejns2xmu9qifb2p1ic8z500wdbomisqlrr5bqpklb76d8e2kx5jigb68bbjyxpeb69sr9zxetkwakfx327mhi67181p65erm4uuujvzxd3x6v0pw476hxugjpmr4f1s20abms5thsoucfw9otb7jznb2u4367iquchnaimem4o0zxdchj58wwm1m9fx647dhgxnne9477cflk2bhp4eocrrbzcw638h4csko5p6r0z3nlwukzwocrynmebb9mze7l6jpdeta0sw21ba92t4mgwqo9oufh1ac7rvc93o7tbfz8dyup4cwz3z3lgrn3uva8dixr63enbi29p5g17qvcqopn9hrnmbso4lvz5e1g346zkuofrh8lkrbngboxht3djqo2bmhj6kgfwd81dlxi5d9oxhwziukkja5qs1z3hv3gbqblg74hn1w160fjzgrqtyhmkoium2psoah5e3zcymp1oj51v761k7j375rpf8i57pgizo0477s1r8bnywd5p6oyadyke2mlv98kiiskll0uovblj5nvlnr3758f8hom0gpties7tlp5rnvlf3wui9ibxzhd2tiugi27r81zi3xyux14h3ng4wez1i2uet6wksrdm9gwci1kp8p6er96y4xmwbvckwe459ayeg0m5rxdqfyqkzfxza0pp2j1if1gia170nd65t92dn1k8orbsohtcnk2wy4l5kw7nbdpj3eq2u0i3u8y6umguszbofqdtx10cp20232dgy5h0l0c9opgdt0o8mhgo3g07mez6womw9j4wyqvlnldrvj41663c2bf6xn3gfr259hytp3mq85nzswca1no5mr8d57d9qkzz2qs4i69jwjg0pgne0p8rm6ohesmf3s',
                proxyHost: '0lf9tvhpg73hyliq4p2lqxouqfn5lklh16w353xf1f1fcofb5dlli4ftw8yr',
                proxyPort: 8411578288,
                destination: 'lz1e1a5v13lmfm2zsf983gnhu3nscpir6e8jdlsstr2c1hqpj7isf0ruqtnlvj1hryoe9l9opmiggoiqdtjjewd7st7fl51kpuo0ejk016qth65sccziollo5q1p3bzok31vqdudgo8j8wvubltj2uadtwpkw2st',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ijf4t3bb8m93xb2a9r5gv87uugdaaejjwridxl451a1ru6uu42n66fsxpqxlg3nrpckf32rx551bcywzscbot844qqeauhvla08mj5vthhdx1m8u603kdr1vrc3u5j2jqzbmo6s8pkf98ec5gi25x0sluwaygsik',
                responsibleUserAccountName: 'i656f11uau9jccqi92p2p',
                lastChangeUserAccount: '6vl7lwv729wa77o8mtyy',
                lastChangedAt: '2020-07-29 02:06:13',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'gqfc7qo7xbd2d9hplj9lru6nxjlp4ifucefswas1',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'jzdrt8lninj5o5w0mke8qqkahf5oen05ule7qahwvehglxkmer',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'm3vd7y93fsvvgzx4ikqa',
                party: 'vxxe531syl3n14pn09gg204a5pdt2ukhc8x5ma0xt1i5tvbs8gfac1wf23uxwa53vc2llmiym8qpd2azs5ma7gs64zb4bs6zth30rq5sc4x4yzcungw94ciou4ewa5zbihyez5730ldv61v3kyc6wj2jxq8l6a34',
                component: '9j76485ekykkv20ukkxdqukch7ermq7ewl4aujhw8d6lyjwpjtc3hhyllgndggyjx45ojw0px4ksz97t27dqec7z06cp4zfvz5hyeqzzx9vqresko7yflek06moaquz94z0cqrsrwaz9qfcvm33bbq48crjcybk4',
                name: 'hrpylds4nymh82j6vbkpbivdfn15mhgtehkck5icf22kfuit9kqpl84rud425scz7dn6ym97qb6gs74arjvfzkop30b65gr6w19ku4rg6us6wd3lenb4jkwexfvf6ld95jqx1z0aeafydjkuisxwe1tltpn36f3o',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: '10bmkwbhpdc4tk85l4g9g1cw1z1a37fh3jbqklc0wjc17idbdsy5b6v9o19vhd9twsu6wyi0k2g2mohu8m6a95i3t2h9rrrawuh9s9jaetpps6v96rt1ikllaojipnf82i72jt9dluohx56ihyuon541x263iqx8',
                flowComponent: '7lz6bowh4dt8nk67o2gidn39byk61pdpl07o1kihakcdyc88fcrrlulhnk21h7544clttfq72l9ogc5jiy11zawqk1wmqlw2dvs3mjq2s5p8v86qev8tctbgtmhjj31ybp6bwigolhtc4hl2y3rlju3zshtxmmbf',
                flowInterfaceName: 'ai4zgtwtafuw7i7x17jkzpbddt47uua2mjbb4wdrl7y8jcuihd1ham8165e5p0vp7e3albrwgyyubjdlknygbjwxmuuepdv0eey5zn52m7h9nq6jinort33tqp50aa4b952dg5bp5g1lyx4ul0o5rtpt7c0vb6jh',
                flowInterfaceNamespace: '7vm5lois68wnu40w3foyqun296c97oyu6qmiqk13u4o3qbh2nfgrlywaxskxmfhbybqa82dpruaangel2rtd1dr57eeb0leq9xgposft72z0b4qxh3o5yeno4mn21mj2bky5r88rm3jcg3hvnun0zhgrcr0304yr',
                version: '3rjnzkpnuqr678guu89i',
                adapterType: 'vcxblfyi943v4xwilkxzek97fdxsghiyaf6jinmmx0gh221p3qsprgwsm9qv',
                direction: 'RECEIVER',
                transportProtocol: '274drsrr0q3dfvuby6uwxesjsej2kmtcm6b178u1p3umjrympyj53bzzbqz6',
                messageProtocol: '8vph6x1p2xo4088a5py69fbq3h4tsmpr4nprb5xibhnf74in365jmqvfi5dz',
                adapterEngineName: 'ozbapxnogfr18923j349eynukr7mixii6l6nh0o1u001d254ei8pxh6uwr80t331v5fk7cy1gz7235w3qn2odyxofh68ipf9abj3xpn8i8170i5fulcyqoi7ni13ep0leb32yo20x4bmm11908a2wb82nj9rtu6u',
                url: 't35048lpihqnnc8zz62awa8ua1h0to3xssufyh4piunpkvmih9zqvuhbbpd8ezhtewhb72wna8c3vho5k0u69tknhcmiynj8cqzbjuxrczwbl9isjav3unycj2qliyl58j0v6madvipmarsu8ehhqjpw4zmp86sn1u9e1diaov0dvs0mastt3qwhfo94jghbdlr3znm1abjoulh4qp5q65cd2cuqz9g8741yy218x13zsyyrek0kiiawpvetvdsht1x4gfy4u08cmcu081eixy5avoul059qvuxo3rldirz2qi892lzc36jufmctr8r9',
                username: 'o1hb4hxbu9vt84c3jzenbgarwh7zlzvwxccaj6r6ho9re9mj76r2ddnprpd2',
                remoteHost: 'ex8g6zo6f72je2yod9oi9w052dzlm53vev8hqd1f67q88i7zcfnpden41z7qpuw6ylmgpofnvkxrncs25pb5j31ixnj8bapqylarpyd6pusnh0umm1z8uwvppedxv0osi3s8yanqt0tg8q58xqka1jxdsawtbyir',
                remotePort: 3227753009,
                directory: 'fpgbh212yqa4a1uizahvl36epodhri0i21pehbvqbph48pf117e5iq93thhxj6ovjqni8txutbbc7tccgyfbgq83ntbodw228gxw9ldxblzir451r2t5i7lk6h94kk0h343x0wfx9g3f445uve10mqnl7mfdx3atwcrpmt28bjj27lkqe6kswmvxl3mssij2bmwd8mawfob6gli5fxqzzclyilwbc3wyledvzz8u070vejql15in12od07z8wihaebatpv7gttu0eawf251csb21ujc0oo8rd1l4joj60jx3ubgro2ie0ubff6cbxwe6369ofnlafhhrrx675j5xkfjmr9fcnwokw3slerxmkzmg0hhapxy4hkoiw2idq6deq0x19oxgp6da78q8pk6vko7rbh4beq5b1slt9zrrqtipvl16oucclrlug66tbjui99ql1eyesx743yacof8fz8ffs9lf1lx01spo6lakdchfo3imxtgeko2alewiw4s1xsv3bjgotjl94kq24yd89kljadv8jzpmw5127hpkrdg79l5e029dtrmjuche9i4uulkjguynzt34opkz0d0fj5u3kd7pb0lyfgzajmr18oq42eefkg6e3iuujuttjira035dxxdp85d7ui3h65mmfddehfmi9phje55tsrc0o1jw7q86uf79h4n7ayuqcz13zb7r9tw5uc5h5plb1cn95d7sfgfs1zxmhoz5qdbhabbocvimpx16o5usrsjkpkwluqmumkpj5uq19emwo8ekuu7s6be7gjewhmp3r1dthyt42pfumdpnid9bm0xhh0d8quag15sezpbq5fa3s526vj98q0sa626mcuc9d4qyfa8g1v7ckurrxhfrg41v9nj3nn1gnqbmwf3qgadintdrmzezwipqt4rw928yt2u21syedehz6ak4wazipfg0i5vo2is3jlezhm2h82dl158gep6atlq7wqg7h1c09y4x20cvhq4nsnf6apjn4i0ojqbz',
                fileSchema: 'rk8e5wk9pxbk1ufd7vzy9fuqgnwisa7yzxc6s075dzzct552x0xrysbk1zt9aae01kw91041h5u3vng8stkqp85jn5bscz6dr1aee1qfzz25rjqmtopi0yt5smvrvhiwvcw9t6b4el1553v82dufv55s237nmzysag1au465ga271dutpq6qq70zfok1r72zitcagmvhaepavquo238x43a4ho2kabg869tjs8kovshhrwgujrho3ssq5cp3g9ofuleg4aodcvxyg1cqjx1803te436d8c6f1lc4y90dorukvdcmdu94ir565kud3ekhp9q0erohrwg94srny0sor7nwattg0c8ogvemb55hgwmqet8vx07kat74m5482p92me3v16vp8hir5ajk59ngmqnjfpxalhncnh62uvnbso9kuk6t38izspp86qbdzxkcq85dqocg7v00dtu0balg3ervuv6loaelxeqlur9ct28tfse64zx4xw1m630gl9tqwbqi75bvejrdo52vqltb07re6qnwscyvixvz8c8uxig5zdt46ue1eoxfeeun3eqvuwe9ty9nuyet6rdqzmb4c9mgm251zef8r4so3zdr80iaopjerj00npdmx0ap5ddalmn6xb7gp7jki17s5lomerh222lhxtriyglf84u8ldjqctrsb69mvezvpw4xro8ayl7afncq53gj6vx2sppesllku5zt9lnogqcbpw2cdkvlgad5xdcn0g2dxy7xox0d4iemkubo91vkdbl93737yi6wvtkhfcqj3do7lw5kpuh0qorfcb3nthr3frrq884l6t2cyl1a2srayz019e1da4b3doa9wbvnn2o3tx7fpafua7i1ua3irh7wqzvvl3pl6fac8sexkcoemh9mjaqerzkk4fph1s30y34aqn028hkx90fcoo0h5qg29ryx2435ft1qqh9q5rbux24jbiam1rvtjlk5ilskphk3s9m75gu4ad7pz37czfz3g0xhr7mo',
                proxyHost: 'jebye18b0mhmvtcjig3193emygrb14jfirsu6rlfffgly1hzoq70i3ouh4ny',
                proxyPort: 8927129712,
                destination: 'qphh4h1u30b4k6e2ez4zevud5icyt961o5mmgii3c1y6tqi18je9umwhqmd6m77d5iqjejz85o1dsm02qzid2fo91xjfx6xso029o92kvctuuryzh14va36rwkghhc04ap7ljvpcnumrb6kms1qr5grnklcrpu1k',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'thn4yjodgcp5uqm5coc2htb8582nbkqdjip9dvs0jq0u1ebw5ffnc8fqhwhe2m75assw2p3cz92mhzmqhg1pxop0qgkuiu66cvxi3sxrdnw0o6kv5z1o4bfjhfa3gujfcjbuyhe6ezf7w9t0rjd3uzcrozx29soz',
                responsibleUserAccountName: 'ootji1t0441ktta32d72',
                lastChangeUserAccount: 'flkrv3spqjcsrejza78sx',
                lastChangedAt: '2020-07-28 23:50:24',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'uo5e7kn5kiu6izfuze9vpylqv2wprgtd3ioejo21',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'cbhql2gcspku103wd7o9bnq3xuhaeizsm4ub7zx3gbzxmalzw3',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'l3mgc1sxjro5ufs9jr6w',
                party: '7ndnzgz9wzkpb34vd2voop51yjn1yrzuu7ldn4k47jo05che0pqw026v1rt6ezcqbelitzm0uxt5yzmkqochhdxns7mdeufwdww6f44zhnl7sd9z5k0tbzjlmqgka4edepon7op21igcs6ok40umkuv16b16idv7',
                component: '3a50iaaub9v2xcs5ctj0ok42sxpzcevd91fzoegah1q32jsfbwmw9xdhnhq9yho92aci92qq6om9rgsxfrhi0ujfcf6ecrys7105zd6ghcjh59v2f8p17dgkk6mm42f2ozzckktcay0pvnufr8m1of514n0wuobo',
                name: 'x165tfumkjyuhihnesdsvh9fndvyksobwpjgh62wxog30remddhd7f7v9vgnhcuaa6nkai43aduhdjvckox1m8z47ub8col3ws1rifqmco0uaqqkqw3wfqjb335cddfanpw30y9nss8binqvabpsn40uokfhxgu8',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: '5s44b82a70xkp02du8pr9uh1mw8v2s7yhwlwoe99bdc6ufeiohqqwn7yq5alduyp5yyompfovb3d8gixattohrz22ncypre90at1zybca7lx0hbjz3cbo87digd8u5o5on9umjsa69qx0zzwy44xjs086ndliyn3',
                flowComponent: 'ojuedk33yd1hhat42mhsjsw0xeeiokg3mpsee9ihid585e2drpvaff54kzuwyirkgbopj47hdnzdfsmj8azai7z17ao6ys828ts4bl75cec3ket68m6n2xm2gs8b16rumzxgbjhg18b8qifcbw4k5w977l9go9ly',
                flowInterfaceName: '4yefjpfq75xukx4yr4rdzgtmqz64285gzzfidev7v6qe4x7hunblj5nl1i0wvzgpd99oc83qh6m4f3cg2z8hec2srir41us7l72v1ppm4fwa1bpzljd4nyosijmdkpu7yqflyh4vyirie57eir6a797pxerzl11w',
                flowInterfaceNamespace: 'ordazxmqrusxa0l4lxgqajb2tn1eubbd757orx7a1wucnqngi2eszdjpx3pgw4fnuckn8cusmog5o3jmlz8a81vvehp33eef512noz0rye826voa44j5t9v4fhyy0khvqpsvrnsx9jszp3pg7udta6qw4pt01vuv',
                version: '7g40rquq6imy4iwv02kw',
                adapterType: 'xoybq54ygklg5anyfytweuy6o07lvsn05xpl0rfdyuk6262wfl12grj5qosc',
                direction: 'RECEIVER',
                transportProtocol: 'dgunt32lux5cs837lrncnduk9tv9isxzpcr90et601y7gj0mfwxadf8cv5ew',
                messageProtocol: 'exha1pju3fxdrltucouhe79p9ih48cxl76pq0vnppnl6mjdbcnufq7fbbko6',
                adapterEngineName: 't6ac6b0ruzoti78aphs04l8th0fzumxwt6l68l22qhu99dhm6m7j9wyvs0qxibzooktavulmu8lsbf7zc664vtp59kkemdmib3msa0vxt2xhdufc0fh3mo6v92wm51scubw4qe1ijv0p7lcfls3t3duwlh7c4ru6',
                url: 'yu8pry5ttlpc0g5liijvgv3j59a0khabqqpbdlk5g1fwqr56plznqi6ipq3ayksnpfrss944mg4lpgo2oemz01vo7s1pqj1a7bx5v9bph3oyclinp395rdjmvnc9djcb7sdxy01h4n2cazs2vd2rq27407gx1ua93bplzheja2gg0nw9ua1nbalnesiyhpskq5y995t581ghdflvdnwj630wplpe1twfqyyghe2wosoaxmm4irfkpbx7a429030iohh52h232jcgipbeqbbzcsajbolgcoqlb3bnmtilgcxgvf8djgtezconrfs3ln1v',
                username: '5fit9hhaualuuu01w4b5y5io17mx5bz20lb5mzx7otwp0ywhuce9myjn380u',
                remoteHost: 'dt45523f8wm42pwhzel1xusi9jq2p3zyx6gvjdp3kbdikno6kx70d7gldj0jzihe3ojz1jewmxdnpqmvxp9f8dnu8zc0qavfe35zqr36mcgza8hkf13tpuhcypf71bc281b7fm2xtj7rhnznhg12r24cw6zo1mbe',
                remotePort: -9,
                directory: 'qq8jujqduo1j5yrk8o9brlr2xdswn89pd80n34uxz8rbbmerq6wvrd7xd8c72k1p4wl30nsts7y02wjo168418m5nukmztefnphadmo07xygd6e8pxqd8afl0bkdb53ijeii1lhhaq2k9nkgmqnye6y7tqol4dhb85zuqryr5gqhkgp1ezbod3xysxneo2zp5kbrvgwwbnyof2x28ygmp8hwk3u7dt5waohjlb1l266wwujbf1ypkhm1213qd4kqsj7n0mjhslt6h9fzwin2y8paqim5t4tq55emecsaheb1v8eej09fewr7ci0qrhms8hnkqbi8g0qa0rjizr24fjwkkh3twk5t0o9w872wco9j4lvefuhh0ffy12zp17s8ujut10c7j5p3bv34hh2psah61bpu6u8b1aojhv2fqduk194cwx08l21baewxei1g89l1461ujwzn2uuq8s9ttqb4hyvnsez9qbatka0d9q6ij96ilst55wejpo0vc9faoy18nvuou2gyc2dsnkjldwyw3gjjx5tk18hrzq8dc1a2kc3q1v1fkfc171vhlrv9ssel6o29dw5md4186ek02zxflh204xpcrlk28ge64u5w5xd9fqak6reaxlmnkd7woeqsqpv2wg1a840dwprhq61d8jjndlx8qknaoqm5iwkuo8her9cuft0lx0gxaayb0tay56v48v3ot56qk372b8o5xho5doih3v4kqaqzll8km5qgolwrv1qk0r7s3n7dyv9s6ew4ksjhryocnaksqwzv81g3uauvfl5g8pcj9k05wpwjijnpgu9wqc7q64acknsf4nkycqe4w4j6jbq083hmscvzsh1vykeaou0523tcwx8zaoj47hjvied67e5pjaizsmlgtrigclirx1g4g30thqvyimjiyo5autuqstt2rgb6n43lnjvzw58hcf0fu7m8ujo4tor86xwrq4y2jbcrsu84ppttz0rl6s9t5plp05ibk8dy8dmnlkzzlda3',
                fileSchema: 'pe80oi9gkn2hwslwnly3qf57rbdnxbr8zb995riqiuhhlw6qsccmli5uqvxiy8c1z6ora02w4k0apytdhmujs69gsqkvzcx44ars6nbiuzl4dl2z0sfsyfjbd7hrgqmdvdnas5ozlu0kt1f99pfw1urnbgmjyhah05y7i3ghy1hnw6v2w7ld154aktn3klss0fc3trra0u4rhxkj7d2ciirtrod0cdztrrpvfenwhtpjx3nzgp4w04b5i2aztt8so1ek2416i535p0f363pm83545sjddkoe52m46xgphr3p7pa9cfrpu7oa8yj6z660013hcgwmdlvqauj075tx27n3lznqr8dgy0t6b5uql234lxwdtnt6dwry5of7an7x6gwny9u59az8mlslal5nz5ahcj402wlsr6d6fb7zbyxwh48lxc0v5aaxeq5drl3v6u7npq7ntlade13fet3mm3i5z8hce7yq1fbtvhpyn90y9nx55f8bj1qv5udnnjfcuy8w6hkqu4ymv3dadatd70a9ebqrf3ok1gonirn1cc0u835mm06xqddl9jan3mszi8irxewz8rbf7hrd7hmrymyc2ct1rjpduleay5wzngvoxad3yei1cn6t7i2kjxqnamsivbhqgccl4m55q88l06f3pyf7ixz0mx6bvq2pk7h301jklelot3llu85qmeuprjpsn3k096v3vt0tvvkfd05qlilri8uprx9clw7muqdx4qgvenu71el39g5knwh1973meu6i66he7hkx19k27lfmznegtzib0p8lvfd5pnfdu34p69jhk6tyhc71bxs6uzf9njqqrcrq4xe0cmphrjf0qqa2nvkt8omdogkfk93i06tamlwldf144fb8wl28zbujdjydb4ywa6nbrsdcuez85ysdaxaseff3hj1n5xyjt3rdgkubqugds9v33iaph2y68plt6lkm8bx6lbx1kazjm2j3cskmaf5gnrc8voefkydfoo46hpb0vawmk30y',
                proxyHost: 'lttrgve265hk13s5l2ct7xjswqf4i2bl3ynujxnlk2cmsrjwshw8bujoma5t',
                proxyPort: 2318770775,
                destination: 'gw1ojcw4p82oezogtkgbtpvrxf9wop1ophksm6921s8ff1tmoy6d0rgbftlaxq94fgcv7siphhehq6ob7ay7tsy3ekb2cu8hvvu16dwctxxc92xefu5hna70ktcn0t8n4b1u25ip1jozfjfkwp1sbpfrvm7ysvnx',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'nb4fw25vf4b8rqitqkcb05yw9z52gnzudm01m3ew3es9ej83t5exk4rjid5fxh8p7m1b0yetb48orr5tn863m0e8ra9ro43lsotz2gm2zq8m0z0k90sopmu1cxocrh7mxj2tiymn5rasxtynyewpapqn399k4bvr',
                responsibleUserAccountName: '76giv9vhov396l8c86i5',
                lastChangeUserAccount: 'muyx8nugfzl5d6cmsyj2',
                lastChangedAt: '2020-07-29 12:23:59',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'bffxw89fxanh8fouynke1ww9bvbet2cy5aar8ksn',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'x3du1t2a5qsdimxqgjlrqzfh2n4c17xgariu3yjc8b1ovn1kpk',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'k22d1je5oo44u6zzg3pq',
                party: 'l4nkmgncm9hii6n6iias200zaoxyysaxi9di8tsupp6jin13p9a5qqvrveue2e7fqe2e6hn5jje4fyaaobj4burlvnfrf2fcb2mnwnu8eeofm03zsurq5t8hra8u2ars50qlv6ywyx3m5okmjwkvafllnxariuuu',
                component: 'mhwl60vb6dh77rcjhqb7rc3vvibng07siijmlh830anc4vqhmziifeybpjemf1sy915c7fo489oluotpnvqbh5zs3195cla9vszhkzypnq33zgs8b7xxcgi5veyaj5bkym3k2v2zz5hwcl6q3hk3nmsgxogzbukf',
                name: '7eafqt8883ey1fbasx4rafcwedwv23iogell0icstg7irugk9xjjfhju26fxee2jbohmjdikkkd7qont4sxzb3eizq8km4hbb6wculcqfmt0mdjqyap2jxikcm69c0gmprtxchv698cc0hm7uz3r1c0n7ume7mk2',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: '8fgdn8n7dxbo3jjwesnv55n7vs44h0vosmgxurq458v1wktnvhuyucyit6xhyi0qbaorpq8qkdmxlxnlbf4qhkczty9na3w60cqpmhul4s567pu2v9jko02jvtrojygjjobahqq9416dxqqj1bi4h7mdnvprongi',
                flowComponent: '77dj4ffohxkeh5eoz4s6mbznupjm0d9cpardbx609fyxbsfm1it49pmzuw0qhncb28qdbew79aukqm7qgetxfaqxx0wm3tjtwgjmi3ok9ls9t4fya7tyrnskyxaw02hrp4dyd154dk4q3azsydrgt59u5ic0k7tc',
                flowInterfaceName: '4kucyg9iu7lxhjs0zuw30s5cqnexgrj1g7ugigtkbiawxivg69otreu4ocay8oydb0z0gqrifwa2yamjzy9yoktgxfvm0pu72rppdpq9kidwq8ez32x0bd8604ueh27bi7dvhtmvsjswbtf5h2g3izprxs2usoug',
                flowInterfaceNamespace: '6v4lgikpxrvlye4q7hthlctbfiio7anfqxu87gyhrl4rhw9pt705xm9wij1qjd4dxa6r9k1kahrx0nrqgpylwtv805xp4oqjn7ovdzfvo13myoz8zkucthk34whjsho6ikpwwrjeotph429y9ia0x3pq5i33ucoe',
                version: 'jn59fww9nu96cfgyv8h9',
                adapterType: 'bd4dskcz81c0hdlx2cj0n58vqwngoaodfemubngi4v6hrrqxxetzwbwdc7ip',
                direction: 'SENDER',
                transportProtocol: 'pq9nqajl6sj91rri3lvbpeyyy8xik6o65cgbmgehjn0kjyorcpmeh3kulf5p',
                messageProtocol: 'jyezqq9knv46v6cw9ks7gk4d1dtb7j9ctkl852vros4bcy5fms72bj42ezo6',
                adapterEngineName: 'uqhsb404f6fjogcem74sbdj7idw1gst9lqoqobfc0bkt9p3vvzlce0ke6f8laex8u07c64oap3i6q9xfl7w82gtdvk7kesz3gm6ho7w0850fdvwi21akjn0s4lfbeokfk40cgbqty9l9mrk7gw9aw16rp9hg5tn8',
                url: 'dlanfwftj7dp18v6sfm19l1zgc1v3m9i1cujb4wsfxoookzwn2o1zbnh00qfh89snb1pmci3m0qojclyosuxqto8haje54fbaausb2fs18qw448u38bx4gvj5gghaupvvm8lia4p36o5v5orsrcnw19uyrdxfetl74p79lrbygv3jiegjazhzllb7dx2hr1tijb6nvo48cii4teg9eyc8fzy17ypezpggz8s4wn6aj7nooqypg2w6ybyk1zbmjkhmvdvjoozayopbnoqrx4we5n17o2olipqaxj7qtspudw8o2l2ud41dbqrfb3odzmn',
                username: '970c2ahvk6h8y5qc68f6heuak7l2u1vpvitoshl31ku5svtcl4ynhv8iaxoo',
                remoteHost: 'eoxv2ttdrg6r16sdyba4qg7lwcxitb9ye3dw1fcwmoc0ay1g7uxhtaxvmokpflqbcun7oq4voj256b9j0ovrza95jksretqwd60l34x9um99j0849ihmq84pi4ney3wexc37os1sfb780arjn7kg3o320kkna5p3',
                remotePort: 9147926792,
                directory: 'ejlaxlq7joore1o3ubna8nmubbx5hcybi6juio5tliqr9wv1vifbfxoh8h0o9883x646z0u904nziuvxq8x5r1h0au2m3rfzyaypznufltrchdswqixkw192g7xhky5qyv1pposq50el4e57flhrfpiyrxjrtxzidwsslc9zp5os3l0y1cw8ix54w84vz44wah3dwf2qwzntqdw6k4qylumsyp88rn4xw3dtgn5ivzjf5ng63ieutk2h78cnlgtvag4gy2o8o9yh9bm5iivgqi8u4enz7plen3bny9vtgdz5q48pet0n4bd51jtmph91246v48449zphllaad9so04f0ezjxpi563amluge9w3xte06e0cm0hzzw685wnapbb6pzqzu4a46tj20mbcynpfujqm71jfcng596zxzm6sehbx10m18x8qm000i07lo374dtvl0upb4uz0aq5222a71p4g2bcnoxz95ehq7hezjgplgqfwylf7anqmr6zbm94xlwn4zx7aybcuw5cawmjkwodw94hiqkc43x1jhq73ok2ibye7d9dibu4cbylskr2du73upw9qu9qgj14twkf7igt18y2r8d0hanpigqgzws6wuygepm8mxyxzln2qqnstf36w17lclp5bd4bms2wmnah4wge6a36djwxwp71jln2lyy1hi3fgpkyoxxe3rsahob210ejzblceygu3yujqm5jizl3lmhuanvdmtmf82chgrphk2itp9qzpkjfwzbppcstwj53800n1ycz49byv9cmq8jbf2fr4b9d8sqwmze50i2jg56qv4408q1npu3k203tcl92llhnafoct9psaxmu2m453f6jy3hdxsxztggop17f04uliss7r9areqlxg5vel38iidnkdbd6u12r5ldslug1aagb6e4l20e3p5b7q8llkynyb8p8c42xfoxk817y85zdc6nily43eu8hmopq4go9zkv6uihewk2ciq78pa5428nb9yi6pd34jgx',
                fileSchema: 'd026y3binf7zjny52b7ssy96nmd9zpwlhmoy0gfa9vdqc8humnhlt6vfhuzlyge8ujcfuekct9e31i8ffbnirv866ain56z2l630em221y3fc5vqy7188sjqojhyoui0k9wehmua21ji04qpvn02vjj2ey5mtu2nqwlm6nr2ut7govn3muohr3rtvdt9s5nlyr3i9ameco1rusk917fbdh01b7r5wtrdf6q0hblhfchobhpeqnw07sdf6zfm8z46nnnjmcoac03y52r8p4fy504o0okhqaqjhloy97xdp0fpmjkht4prr8w3svxwdljicslr3f2lmjb6bmhun2gfnplr8fzobktq0z83i3605ke6khqcxaxvzvufadmhggr49g0w1h16vp9lmvihuv32cvablr7yzn7xh76nzxdf3z86tkbdwd4v8fcqrcususp1xx7k02t2bljq0gyhs6z5045jhjgx3lxtnlmc57dyfw92v0ncw4xpub6dvu3mzghy2g9jsdop5ofkjgb8xzjcyv5yuc7ous5yotj3npvhjqkug33sd7o2r49oobucjmuumnzobuawm51fj030lt2ri5wr55wk7d23kjh5fhg963batn29ahvomz0ifi7w7petuwfq2l9ndtxgeo9s14cjbe24k92cfxd5s2vi508sbdj552l77e6onklxymr4woa8puewbg3xhwzj8cyhbcitbtofr57orer9pd7law2qc7gmm4h4ho8cmp6asykwy5em9rmdaltrrg66ohddhgu26qdbkedu7r04pk5g8zdrm20zidhcs92gv30s3ifqs5j87p7ggya0q6xkr747525245s6fgb16cgd1vz1ys0pa4zy7vg9899dl2ppur49ae48uj7rqwcsklbr7zzd0itj3gyot2s0gxkmjrmcbt96fb15ca8ykaf8mubnddql1ydwf1i46mz8lc0ni33ctkj7gfkvt5spu7wpnly35dpdsaz8gvo2uhu1mdz0rkpwxmok',
                proxyHost: 'pjuuix1h7x4osgmcoh5nlp372nkhhl62sgtqk49chlfy4jzg09rl8sqdb20c',
                proxyPort: -9,
                destination: '2jxjn0c0b63kgb8rylqvvl3vyfouwsnw6htl7h04ssv4k2tn5nm63x8fk8muzstuuqnon0zcfne9mha7n4vclzqbk4nk6tqapn6at8ubm56xz8oipsiewzoar5unzzii4uomsc6t1gvzieew1cscdio76nzrlxke',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'k3gc1zkpl2d6sgugcmk25zhzg2lil75s5dke8i5rfyehfsk6rzs6h40nz6jb2j19zw7ib3amwnrwnngaaqn6gz9x4oh77m6txs94ihwhsxjw5ehhbjb83hvmh8z19jlr7gvx7qkjf44ywy3sbd5z1flsuplxy30i',
                responsibleUserAccountName: 'gbzjutd9ym07us02ysff',
                lastChangeUserAccount: '6azogz1ttlld42hehotb',
                lastChangedAt: '2020-07-28 22:21:14',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'h2ejo3uvlsq8u07142bh8rcnerdjdhxs3numpsr7',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'z5rmnm14fmligmacwj3vnj25m4zbnlehlp3xl07zq61u8v25ve',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'ng27r5pqxum2efbcc4vc',
                party: 'o2e3j2yca10b1n8tfu9wzorystpmogkg393j0f0y3fw2mbo1juz8aw6n09jr49nylbqnzvkmtwxbv6pla92t9avqvxsjnjd6adgm9vfk2s9okrvbrldj5jy1xngdrfa93glvgqvslj13cz3rkba38wh1vdt5vlhv',
                component: 'rhci01fhzjt2tykqqx7ruvpx4o42pr9ndhpjh83esl5shyg82lmx165hhycgrwl5yge6ion8770z4lilklkkkdw79k1wl1xkzurfwirvu6mob7c2xshg1c1d5cx6onomiage1ejdougyihnuwlnxlj7ex90rv76k',
                name: 'jcxjvxljuuhwiuc5v4sqrz3s14hxn4e8lxunwch2robu98dv2zbqn4ohuaa5cypuibno1kzu0eqxy8bu3hfx6ebx74yic6rspvvb4nnc0epwv5897tyo5hq177i6wfepe7b3m4yelx7f77feyoxwkzyfqlik8et3',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'vgtu4pnbohej3zqmrgxhf2qylc99l5xcn7peqiie2vpessd9ojetj5sylxxkato5jlq1dy1kji58owss546d27sljczz928q4h5zk5dh7esierk94g46k7zr23y13t58bpiajt63izn17ky0j66xgnrh5re10jn2',
                flowComponent: 'sempyq364okeuikx5sp91bciyx2uw0d04hxnwsuyyoltn6vcclzn863ojczpk0hjpx9gslqqsy7dst4lv8xddrf3e23marawchzb0mxlks107jyugjre4y6fh1jlckh2o736v6597u86otvr2ehttc6km5ss0chw',
                flowInterfaceName: 'behtw1adaxdqh5ql3a3lk7t3xltq7yvegitx7lgeh36825b6aln9qcxvvtwwkw3eczoqbvg2l98dban3fhn8xpeyvtmwc0fja5155hdn5evmgntufn10zaf25kxob1nje7329vz0kr03metymfp0nomqfj8ulkyy',
                flowInterfaceNamespace: 'x3hwfvb6308ubpsfc4obgjrjrsox91h9rqda1za7hx8zdyliqr3c7v1q9t9g6c3x29fj458anmo1n4gb9nnklth13ooe94egabqdz7458z3mmjaz5346knfu5np4eo6gf0uco78vt8frhh8o1hmwbl4k8mlsntdv',
                version: 'vxfay20gub4zu770zj8h',
                adapterType: 'p5rupcua7pcrwgag0788ymel5fyeko082g48xidpxys8fqxc5tapub01qaju',
                direction: 'XXXX',
                transportProtocol: 'an6ojphmggmg7zlmv1l8k1dyu2x9nppsv335sd0f1c80tegokqzmt1zpcizf',
                messageProtocol: 'k8fyx9ttvjd4mzor5oqs5almnz3nfax2p9xh1z4i5bo9d15bio39vglw01lk',
                adapterEngineName: 'yh3qdqef1va2reztzqhzdg2rgeuthu311dribbzexzybuddfkvzk32ivufa4wv25tfrp6gsyun08q7ai5dxo4wckx6uc8phn9j0xxi5v6v459ty0868404ownasirk6ze6mkc44xqmvidwr327d98j56shgcrb27',
                url: '2v25dbpnkugj05qu2e2l9bhqpf51uyyi9z6vo00cfl5iscwsbu0qj06eushpnxxdt4nfud3dgfu7dzn2bvumba77mrxr9aj5i8c7al1gaj6afd2pib9bic3v4wx3izogjrfnzluicqq6veruuzy5af1fxqhqvv5jf9sdklgrmpoygvvfr250xgwl531h3di22272od1d2flvzvhubel8ujp5v9le1pfkvh8zofkojnnjwexpjoxtiyr1qtqjul1zn30xxgzrktui6e6jxfghav02pw95lpme317rq6i4jvkf0l3uywfj2wnd1pejry9y',
                username: 'yw0udheb719id3p6g50wfp0qs4ddeldedvik1kkrrfiusltfeb1h7mld1rmq',
                remoteHost: 'b7mlj646g9eyqmlwzesdsxm6iyfnsvih6jz131bca1tr8bbrax2hcakyyd2dygg39vgflex2gw7ixnsg2eerqhu78wr34dbp1av8q7uunagapvsclcvlnsmlqffgnbyh014b9ho5oz9eqxrs8gws42dnjq5ycz17',
                remotePort: 7237433981,
                directory: '58bxv1kjo1ic5evnklz66ojorvk8xqkf8zowl2n9g6qpmqd6owb8vs0zjx2vegr9f0xidonrv8rf2n1ni5zq2xgbj4tickozd6e89a9yewt70llcjl8tmk1wlcglkbotrrqhgh3tumslsky34iyft4zze921vglanghyg898adfsvpspnrdtg1pyx9wi9vs553ba2tjpn8fg2r3oy75h6my7hv7rlayq734z8znpwrl4dfxdwrwyl4ir1t8xwal6476trwpx0j8xg73oq3fp295mzpcprounzyrf1hcpiotzm9qwr8ijq1w4ivp0a1jorgsdwkhbni67mxuge3m9ljmqh8ga529b343vk6ghi7zm28fbz2v1ybcvil0gg5rd1qatp46jj2vusf5kxzrrqxp7ig5fjb0cijkopqd5ow6v0woy2js3qtzrpudedgt5qlm93myzulqvzxdffl6ko3a0rtfg7hi68s72q8l0gs5np10h8sqqg05f6prs01eoloriaso81bx8ptesfvpcbsm2hopp1gewey2kfd57s9405hgwl2jzxp7833g62lq25p1copsvwqcwwuqxz9ahmgirgra6l3oq7gxphttcfba44dsfw34nuydt3l4trgof9kp13q2lr6espv31x6o3p8btpoa0xea77tfzjjp0wsx6jwoy5tycwyqftd45mtb0jvcg695vladyunvj33qic5jbrm78d59hdduc4yft57u2pipgckjwzx8p7a0pxhvizil3vfzzx44flqva2ghnk0czwh8gf9z0onrs6bixst5xx6bhpimvvp28du9ojz7kon1scuhcxkuneyto3jl81ndxd7fnpfeg6f6lqug6b2qzngsgryi5sg4pbh97jmymnkp33m18vh0tnv77sumpb5537y4b3hcgxp1j616imo55x4djgvgcmujyc9tg1pua3qum1rbok42jde2evd7e3c0k8ma40t2bppwote8vxcx0g3f1yha2zixevn5tkj6e',
                fileSchema: 'n7eg907tozknfvfih0asdfjfq84nn1d2up5p1z0hznob053mkbl83spw1z4d3p6cqslc0v4iw8pl06afg6ussfa05mskfsxafhkfow7psfkr77jx21qcrdnaalhbop1i099yudomhe9v63prziano5gu8np6spiqshhvo4nbezgouc1bcesupt8qj2da44q8e5ckx8cf2jlm3xc2gfx376ogeff280uehbhqyqt9wcii6f7bpfb8jvowa5scwr9jrixeklfn721zgxp95vtlfb7ov3oqcux8v6u9byoc116lk58fvr7dnt8opwsncwa8otz92vklugw8vn7o6a9lus8iai60nkki3sqezs3wgf123z2ww4vzg57ebzflazdz9jgnvrsl8ajgugdzdvrjcmitq9l9y2lpes2tldoqlls43vnthsupswdalvyxawj467vv6feluqqyqh71zs2rdeiu8ybd2mqaqafvuu5vknpb5fehocdlogiefjsc0547rn8j890jt2uouxk5vjiumdke1l7sp1964umc0gqz0xfd8qpi64g4j7ya16azutri3rww9xtuskj1fer6jrins1jkatw5dbiqw45dwt9xyvgzqil4red26xpwbwg1p5q8ta6587vaus02ksh7m5vro1jz3fa90sewxzlsgdbwhjonqa0h5z86ej9tf5z6an8h6tgjav3j3quycy5whyhjvbm0f5fsoap6cb27oqwyjsx5q9njbbk0maegblvaay6o2mx4fhmxqqbdtyhbgsttuxrmzngdcgk2lrc6uu1eo6q0ienw68x1ids5y52z0n05injt5umex46ocn0xyw2pvqzen2xysiljxmddituzm6uwtm2hxy0irqiyeciaenfgsq2mt905ivc4loy5t1dh6tvc6st39a7luwn7on649a749xptdctthheaoefxtoscax9g9t67wjyxn3g3bffbt4r8x3bflirm45ahgbn26jqj3f3kl7xbyr22slmyo7ex',
                proxyHost: 'h7t04c51u5jgypivrv1j3fxru7fmomrgqm8wxv9ao65k8nde9l8omw9pti1c',
                proxyPort: 8089869012,
                destination: 'o4cjijs5b1tukmvwwph1bky1r8j7eo0te8rd0xa3ptwzq90rgzyyp6h696lzqofccfwrkah65dc4t4iou2q6fae721ycge0texhhsqcth027di8odwwdrtq8xygvz5mzvgatgokmvzvh23njxgkhr6l3r31dsgau',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '0f2o5pu2ls40u4eog5n0ru78gi8k60moi5pesf4k1lv3w13zos0m6fenno9q631uhfriul7feqvo2nxpwmr3vjtfdfh1w9yx32lc8ycifeauezlqrus3019gagrjdfz55i3k18bzq1o9enon6uddvaqhj7wghzuc',
                responsibleUserAccountName: 'fmmzf5z3gh7cs8a2dym8',
                lastChangeUserAccount: 'mecnq9dii7mxi84rocyl',
                lastChangedAt: '2020-07-29 08:43:50',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: '3xtc3eml6rxc6ygtkq6gbqsyzuicd2oevjqroklt',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'hcvqmy31mapi6boyosevrd7wooljm5v7xr23s2yf17wlpwwjdq',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'j8whmhzbs0af2pyb6cef',
                party: 'nqplc5uf32z9mqp6d2pjepx1kp4kvgillcvh2a1eiv99kqwxj5za7ywvtj851v8frx5quc64rwdzr0algltlznoxv5fb5f119f4d5hu4js63qj7erwyoj01hfq9u7f6ivdohlyhe74n82qzkcktdbeb2p0gr7g1i',
                component: '2srh3i6y39c9n424o0l1ckc9w2bc5smgulrcf3ovou86fm0bp9kn3qjbgz6imnunonisyq7mpj5pqjmlj4hbvw5hzahjpw3a9mie7x1g3ncjxtzjev7mu9h24z99291xesnk9epjwvwt7ze2au79xcxx3o2cl59c',
                name: 'zm9qq4mn01byqd0cdp7plp0tqdd6bannjh6vqkhxhqofgkjeracda764njipko9b99ya0qe9cbdmwptzsh4nluckc1e656123u2xk962v4vjvy9z5lejpiai3xst38602pq1dcyusq0tpdoqw3kmukt441mxq5x0',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'ilgvn55icttmiuescrvhijgh54b9iwm4u3hzhjprnlhk4i6f2p5rxueoxmqtu8n4qezgf047ax0x8yhtcmcm1ttm6u9bpb9nhrxx8wqxpb73bm66kkcpoe22m1rwga4hvc6mx97m15mef2j82g1tuy504cnnzc9s',
                flowComponent: 'p6j9emt9em4cogqn4mcbf6yqw9k06hvunc8kjkntpku1gqf8zeggyei39mmtln2r8mtz2ozeu00nq8z3huqup2vj8so1bu0e9fze55je5559l6prblhue5kru14pzk32mmau8fnemkzfpuyyx12lcfw2et6lyv4k',
                flowInterfaceName: 'v3xnpqnrq0vjryiv65iqye3hvi8apx3925xiotn6vgck9s4sgq8loo6jrlp6w1wybyrvvilrbyp8tt5zz8185yz4e0rgwl8s6bf58qzasx1vhbmvu1uf0pxmcv9orwlsszurdnrruzs8hcj0y2k43kj6qfa0eq8w',
                flowInterfaceNamespace: '4xc5yms21ky6xe9y7cc59mn9b94lh7wr29c78io4unoz8v4e0fz3lh5ixiyxzs3h20kavzk4cdstho1j50669v6rd85znp7qfuxc7zcksfzcp80sn3le1ew1krzs9lkjpewe1ek3ckudjqtavyceor3w7e4naaal',
                version: 'ls2qxmbbddij64p5uoc8',
                adapterType: '1101g4pzuajz0mspfruys1klgg5bko3vqa6fuizmr5e1olhp30f86n23tqkp',
                direction: 'SENDER',
                transportProtocol: '7j8ys9ysyaq1yje3jatlb8zc1pugkf0ivq8gqs0stm4hriq7uh6vkbtaby8h',
                messageProtocol: '65ulj0dxhwwv06sss9qbt6bomtt92pa8s91vgwjye635dibdk4clgke6tfqc',
                adapterEngineName: 'xiddjfnaui9oxjstdmlnyi0z2c4d5dp57edzic8zsp2htfx325ppusvq0b81lfs8b8umhi7jdtztgqybo6bcr31wvbplvvec01ooz0oicy1l1h8ds485am30q4czclb301784l4e1396kylblwaynpc57o89vlyn',
                url: '6gr5pbmxgx2pzi8kwlzbxhrvn1yeckojlthih9qacxyk3dj5dsvodtb65dzuvfqukcz1die5q9yiww3qxa9i67t5auam8ks603umj65ovdgwn2sz7x0pv2w3cyxou0w286uixu8j66wmb0nigd8mk0cceuvcqxlpsemu1i9kpvt4c623lmyptz3o5cgh6j1diz32v1rq88bc7rwn0evesvqmukuiypbmg0o9r3rcx1df0a1d61k392hp0pwq815mpcabhqlew7qzpouq2el05v5zk0kyxk62khsw3jibpq2b3kzjs1k8qtgemtgr7hga',
                username: 'c6wzcmpelajdvfs1da35anhkxxrcuzg0k5o8gmj8uof6jcfzf8dqt1qx70gr',
                remoteHost: 'sp9d8zym6nimokxzm53z1l3ifxccofpvy5vd9zkzt64f51bgvsadd75a4ya47lu39znkyo2nuchgpfxqibrdz3lufv1928a3p2p3pbzx5t9vw7dp4so7w476u3j95hz3wpmkh28naarofz0gdf1d2uouic83a9cb',
                remotePort: 7470309696,
                directory: 'hv5hnrmnlrummcuq94si6tq1m0zepg1pwtxrbwn3sjedtzgu5mo5yy9x1oma4ue042yddm57b169hkj1za7dye7e6qmj4ac3y8mjanpv93q0m3y9uhejb4f2qwebf2onn7nshaafw0pshov0ds814gknmswlrnxxqccfkndnrq4jo0n1diepq3pq198sxgxfr4fxbokj7n4orsi0if9m253f39nf3fddwghlcqckrx2atthjpxvm2lilytzoxzpxzk04xzjf1juxxl54y1on4n596p57tr9oonh0eiqoy4klv4za6a5dlnxtixk32s7htnkc85r50yhdrt6szgm3chdy6vpvigken5lzznc88gk9akbq7l9mgpkrfejynnaj71gq5ifg1vtj6k6zu6l4so8lbe3aah5ubg4sxgsuuha9xg7ro6a8izynfsw2iae7omlu71nwdeoaexoa337jcfbqyraori8sqft6vw3qxgp4mm2x9pndgs4xed8sjcoyz99gx9uewb5rilxfp62nrs97mtykxflj62e9lk838s1719yy3quyvv48rmbl96k9a0zca29il3hlsqio7j18jkrgzfken7m13wjil2cl347p9um24bl3g58ehz3wafynfz1nsvihnqmbgofqll4b3yzo57ax59hl8fkdqyecuxsb507kmrn6cpljyz3xf1vu5k9mylcxdiyi0j525t5pdeeklfk1rtukg2acmexqufrvith5ogbl9qg8juqryp03c9f31090qz1g11xu6lha0j0qap787uhq2uihg17f4a7vwf3soq7131himh136r7qhz7t3hwbd52pi4ek0ba1bw1d4xqlpan08bhap6yf1pco0r7ej7b12hkgyoh3bi8ed31appybymeja7xxj4ofrfo6zckwkkblzqkiic6jykefdtopnoik0gjd46ttytsiqv47mduigqo6aanguzmf716s4wpfb4dflyu06q7gz950p8es00eetk7vpzb94ik8',
                fileSchema: 'gfxrhq0m5u45cnwe18aldeayc31a6gnbu25swnma0ki9jux4mj6a1dgwfx5tr4quqgvxazw8lsd0tw6paf4levbsokft96b7ewgifmd7i2rw6ua621b6kyb9kkexrc4rrdyy4mj55ubfur130ufum5w1owo510dxwzha1nsbdj30onqihqvzj6bygg4u3344sgxfonmznhe9r0wsbfe97rkxrdzw1tlxdqkcsjeamqwo8y3ysehrvkimedz85tk9456c7csc6xkxswxt7xmpq3bien96vij4oi0ipgxv8abkh1vzpueaq6pvynayho5fornezh07hce4rzolnlla715yhmi6l861vg7rej7vtflwbdumdyosdw5vrun2s3el8hetzeo9carw1ahbl1lsdzzk0yf8zx021ma4zpv8aau556cj4e39cdjouo8kf3b6n4ebb18pr5hmm2u61flc7yobayjre861tyvo01k079g52d67h7e05sfx16vx7fxxj2vssrslz28vlhbmu12h32dmy6xznf9o2o6zegu3pbhgnf3ryr4imyrs8qxt0ldnos3sx60t1qanovr77i0uwio7b12kadp7mwn4uxvsdhtbeuucbiark7jv2inxkskjgojincb3gbut9v7rtx3kfyczne93rj5wn7qkqva1a1w1d531bd4f73tc5pj5zuzluqtu6e63yhbfp65vywbnxc2gk3bscxajm4mvl9prkmhzss1iqv3lhouypyfo2tb70m4le4pjsws49aneojh99vpfdjxbziz9slq91lwhpbqh35g26go25eibki15x6ujjan8z8aqjzyqk05z3l2d89zwmmypbar5h24b5adt4fvmmn02z25u5p0ee6ft75fzrngyed5dsvx8an6gqzhyncuhvjbyjdoc0cc685dp8peeipe967h2j1zcw5hlodc3kf78m0k1t8dlkc2aatp5zce8dyo273uvokcau2e5x0809po53ll1j2ehwk84zw3u',
                proxyHost: 'pjglbn4wkw6i8kbuj2x9m7qd2eo2r621c9f7xcl9sv700y4tttjpeu494878',
                proxyPort: 2455249288,
                destination: 'lc0n7h2xo29xo2gjz0flu9fulnygd50ua871o381kdgxw1srud8w1nj9bwopjuca5p7w2gh4rmu630u3yrk3a1dtg0ap0qk7x2tvscqqvbswip0zxzk3qkuqrc2gfmc0a5eh6vst8rkjlppqn73s1qcsgll3goom',
                adapterStatus: 'XXXX',
                softwareComponentName: 'zgx5ofostk0ps0o6dhqeqw8vsr1z0nlr2ntqzk30e75h0v5aabbucid9z64gy62e3n1bxs3qjnvcs2boomh12ui6apb7rfqba4n8axyg44ah63ql28etnsn4fi2moqcxh9h47urv8dl26uvduqmyprkvosh62fm5',
                responsibleUserAccountName: 'sz195lkbrmbb61vl1qyi',
                lastChangeUserAccount: 'vqhau4lq79h0d34fl97c',
                lastChangedAt: '2020-07-28 18:29:51',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'f4idfn0imz8r6v6kb2bnt6gu4xs35a85w1xsn6mt',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: '40dshwjtfygd7x8myk8iiwqcfleiy1jex471zu4oxi3sjdp92n',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: 'maxjndxesmakb9apygda',
                party: 'aeoi2qdsy63hvofdvg24ww7hjcy6yk4uzwlpanj0bdsnxxnaqlgy8frt3iknmpvr23ndw7ebletqc6p4at277cowhz4q8et7sbeqxgw2x3gttev24vrg2i8skzonag1sslon2kc64a87d62f6kqzw2t7l31hxli7',
                component: 'qjzf6jr2airkbjfg1agn4yga9guk8thnl7ckjq8eqsjnb01je3gu7i791hhz5hlvpd8ts86u5nyxly7ub1qs85zs73mtxm9w36wv0q4ddwdgvsl6qsvs15n02k3r01eyfoxr0toxxg57qr8d9khwppj7m043g5p7',
                name: 'n5aatjhuzrnitgoljykybnm8qvpw1if895ii7xs6p3o6fgnkmgii5cj7l726tjspoyfdl0v4xj70acb7r046a0jemn5nj7px02jvhsymc532oghx40j24hcijgbk79m31lfl1svh7u1a8h6who70rivt9bmf6x7t',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: 'wq97k8iqku665759qqhxsl1rp3ucr54muhtdc7j2w0w6zv7u9gdnm9naps1bugm5s9ccpsc8o7u0jr2ma0nsfqsiq0pxvkp2qdhy7jynj9x108thrv25d63n3thg1ulexedi4c43o9uqdmbg7337plvn3122273z',
                flowComponent: 'rh71ar9hdm0f7dcjccr03iv394iaabzshqqfbridgnz4ps1z54n5v4l1hru7ut4cv5ka5zjzdygzdq8b7e35ugqi9dp0rrc9a2menqi72nqthn6bwgr1hqnd6dil2hk5pu9lzaxve19obbuhybmih8hxm8bkzarh',
                flowInterfaceName: '1vrwlxw18g6ygqgakjq6pq87hm2hd77xs4zas91r2j3y2trsiznzrkkgw3sqqxvk5ev0wxn3ejjgznyaqcpnml8tywpta2j5u1w3fevxz6cgpig0kkqiski6ijimodrmv8lxbjbjm5t8400urwqdki7i9mi9ec81',
                flowInterfaceNamespace: 'b8fmukoawlhswq20dlowtmys39vhdyc3l3d43u2uwcuoejndnkj1aw527eanwcl6gjpj0jsgn5ij8lm645hogh4nm0ne62l3pnm3zooputtte95tnpoq6hqneduav3fet14e6sspnh0te1b7n74by1kpuyi7bepl',
                version: 'u0y9dib31u88k8dxc98d',
                adapterType: 'i797v0uu12l4yl1ntaaayagg3l62pgx6wxkgeavy27wwmtxje113ay7blzn6',
                direction: 'SENDER',
                transportProtocol: '1a6uafr3xkcaxt8ue2f1z7zzdqih6q7s4kwc4wjbyj38pg0jfgv7hsz3r7yq',
                messageProtocol: 'ku92t7dgq65k92nwea06ekr0teorrajofbyxoapw4w8773jn8c97bdj4116t',
                adapterEngineName: '5wq7ulrgd32irrorczkv3cn4xti7h1rx2hwxyyr9kps9lx38d4vcs5u66npojxg6zfzytk8ma3g50bar3hl9fsmy51udtfq2t9do1umegzky6nu94d74h4jvzf80jjoaewmhnpnp0p9yzmmg8nxhrmlsqq7o963j',
                url: 'juj5vf9joqbhkgrf3xvsp8i692gh4s7448ccu1xnsz6wvnstiqymlij4uxze91kea8uwwfb8a29jfdflu351ao9j0yhlst7n8bs8zdat2c5epaxyrvnfa3gcvld5wokvhxhmr7t98s4jn99w9nkkqogeodokvgy9adp1es391yo5ujd16nrknr9cn7z3qbengrr4e7eju2pmv55l5zazk5w4lkg49enhmefisoqip8c0vdvcitrl7rwefq1uglc0g2gtaxdsya5yj8tgfqvqcz9p5c3vn8dm1j9zs13qtfj2zb57cyqz03bkb5tx6a0c',
                username: 'x3pmfumiv4ui58pwqlylh61k2dzt6c3sclptd64ikvq5o3sc7f9tqlm2pnqb',
                remoteHost: 'qcm4371r1a3m072nixn8l09kh0qs0kd3e5nonkd0opglv92lojgq7ijbt40yvnccmlo87vqu06wfuhcs5sq2v039crcspna2g7lcg9kyy6pa6wsap2wdjt364caaphffhhuijrimfapjyq3rzrcxfczoy2huedtc',
                remotePort: 9354197764,
                directory: '9wmqyaft9h6ipqazobs36734313vet7bh9z7affldops2mz13k3l18wjj5b1hrmsz2sgqz34mttb883kfr2l0mwk17aosi6hu8sn45og1r7djpjs7ujz7d4wm4eutf756ks2nibnsxzllf4kkpq5uvlwpe13ksb7uglgydljrc8ffx62ikun3d3xl29jo9rmcmrfi6fcz5e0uhlxx50vzidt6c1v07hz178nqu8ryzeao1b2h1o0w4fkyuet7qnq4mwx8q0cg9l9sucha7zrr6ai3ugl1jaonoqs71yf86rp5kp01v91utwuut98c4syr83xrorpzua1frw865i95njhc3ut65x2dfbhfkp4vam9o9owghk2hkb0ko2xaprlgfkqe40coo5mbo753ujq9od1negjmdjl21raycyfjjv1wx8wev6vwk5dfup9arezn6qjxmvnyhhw14et1f04fxf7n5zok7mcufrea0cwfab4fm8dz61i70wqkqa95ntaei7kkfxhkpaqgtqdl9ct5ygzg7mk7t6y4ceq1n0ii10kp30zem1o5zg8jbctycy1eecvvwc3g0gz85lmqzpnqcs2bvu8mrpkt37xt611mxc9qmfxr8sddwisyyshybk7460ebon8ra7frfnqb65388pfv4b6x1q8nafwe3hl7g2jcg0imyhg5yogcb4uotqcubwcgrt5yjq1iwwlum0gy5asskia3qzy7bni4aceskdfl3o5yz5157jt99fkkza7w5c1b1wezkxjdn8giuoopo0wrkilwf5u3q918jlwrlq0txqu021lwfh0x2ewg0xhiacqif0kudhsihlk89a2vtvg8oynxjx1mk5y8d6jty4lgxeitri56fqqbyyvb9xhglf9gh3ynylph4rqua0kofn397pjyqcfqqmrh67dlplxjrlrtjdm3gkm8f657gc088fvjjsjkd8c59xixankpovzulsbnu6fr8x6gixipclcg8kw3flvo1jvzq38rpw4',
                fileSchema: 'ix23g6dp3trt1vptz3lx8n0hkccg9qzwxl8eo5kmw07ufdzbuc0a7kwlhrl34atf3u0h0z0h1487s47djuh2iq0s24u0aoxg8flgby8oagjczr2jhrnun01wdmvnfq2qdngmre6vyvu7zy116y7ycleuwdk0xklukwmrmw4sorpk2vr3fl2idy2oc8eialdfhcho6dc2l6qvvr7pxlak4uantjkma280rb8zkqy8msueh190getvzqmudduva1bengf4tfpv1pw5x7yzbb2hc4mikz85wb6bmqdt2lq70y97wdpzcer9sy4f90i2rif484bgzksgkp2pokwq6h71o6srx6u9p9upmts5hwbvu9jpwllk0cu26k5x4opnmekkhthd41l2jly7dtw5es84sw68baz6koretiksy68pk66xspq3pdxrg24as8n0x3qqjeko6qyygj45pdw7bw59gxnwrt44cmvrgi10lgupdn02hl856r0d0vuanorqo5w3mve86tubgyvldjfk25rfngbt08hiat8vi8eg150ydv1v64z33dqgj8bbli7z7vr0w8o9dtapbptyh3cl65udkbxxibqjck0ifaq9wsjrn3r27emd50t1qfpbpdv7fmmeei5q2zw8xn16jmf66cvvxz00i1e1nyiouuyk23t3flrzdlbu4080nw9lklydrxix0dehgb8g33ij0cdv891bigpfx1ed61an3dkfe7809aqgxua5mshbu4hrs45h73vgoi7fcrqa4zu0o10j7eyarblhjom5n37am6c17xpqclnxuzqkrznyinvkj472ymhr190zn0xiq0y8jrge86n9czv28d99swwxj453t3jvpnhrmzouv56khcqzm9js3lz2rn48drx5v04jy9tqkbrpjp6vfu118uwyp2o45qytg61yb96ablsbh213v9wrl9rli3csn7xmm6k3n1ejjhz7kv0me0jzx8ufogfdu7je0m4qqqjjafm1qlc2kz9wqtka',
                proxyHost: '55x6kxvzke3chbaawdbsirtyj6229ewmoz9umt0vmeoysklymqigk4273o54',
                proxyPort: 4711349675,
                destination: 't6tbzx2y1i14sbqwhkj31iqj9xwfokazzs237uy3t27r23ied5tmaiwtnkzqgu475a33bell63mnq4pya29g3gc3yytcuvhea0w5n75ej2af0p41chm7pxxgg8wluzlgr3tnbxufbxcown5qx2247k6pcpb9xm7s',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 't6l2705x0erkvpifch16cdwfsrv96jaxkb38i5cea1i4fo5djuxbkdig59vptj0bgj24tz78cigsrjthqlw19aq1kh15ic0r5tu5yqucgl8jt8uaki349fwzsv20mh8mbde8k97yxggxm4i8sq0yqq0t5vxi5s9y',
                responsibleUserAccountName: 'pq5y4pn8yat3g5agd4zw',
                lastChangeUserAccount: 'bfoq825b3uyg7q0uxvum',
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
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'lm9hci74xcqsmzjuzmf9iv69m0nw1gpuryq7n03o',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: '7h83rjly412e1j9lv84kjuzs64rnghj46n2a7ccmpv0sngopy4',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: '6v9m7ci0325ek51g8p88',
                party: 'bpr6n6ltl1womsesyu60kugearybdsh3twdrtgfft396me5euj49zs8izx7y1udggupxsqe2qzq5t2ormoxp43p78sdco88wftmvjyr03q3syvnmja27v8972sru1lh0hh5y87ojg40tnxhsfjlff5pnttz0iznp',
                component: '3bugmef6uyglgfor9xs2we4rgegwf31okn08smx6cwoa27vnggc6oajwzrnlirvm399xbberticjgcvey8hcfin37l4vopdyzoip61ub44h356ajbis3mkkcyw9tb7w4poxhtdpfdc3mc1ymph1ic5oiec7l0vfw',
                name: 'gunlgdet5dni8f137j88aw4x3knjomjn35kblqt2a6qiypwrop5wvfvi09qs1nydbd5m05sbh7vddfogtoqwdupwdlhg51y8twbnq4e25qr4vaqybdlp3kkdb0tvev6fgilk96j8wmtp1ozzvyme2t20jkair13b',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: '7lv76xvwakwfmii6c3c470fpwnqjohs9dkv77lgxoe6ir4t3y1qg4s9jojr4s6zib4jsm5vd9yp93g4fn20sxawdl5sb3pzzuwfeeta41fd03upwjvbpms71jzyepce53p44qokz07aasn9k50duzx8oi5juvu6t',
                flowComponent: 'gic7ma7picuvgo7cjf3ocu0vsv79ydn9p46jepk45gwwssnifnqlsiw8miujr9m6ogvb4ft8ov2b5jv7c0xk809ejzsve1fjb12lxhc8rioane1hxi0hz2yvbiw3pstj1akiqf8sojbr1kq0nr0nwdhqux1qflet',
                flowInterfaceName: 'cyh18x4qzz2oywyji7nzfeh2yeep0cytn4nm0gyyt21csqcmpq7jnn1cxe9bvojqvmbkqnusd84q8ot7mf5g8kfragknz7vq0gyer0wg30tkzq9xlmji1o1mcqjm2d7449ut9jdbzbjxt38zeaw26rywzxo7t60y',
                flowInterfaceNamespace: '2593h4if05s2g8e4u88zc9mmvey1uzr2so3zxh3eiwjhg1djvndnzyszd748kqdu0mvq0dav4sgxvoral2zfrfmtbrfthjjm90r471pc6yj1174hu154g142sxs4eoxkz1i3sumgqyjqaziqpl4ohwuffhb7q540',
                version: 'ualk8wfpmelubf3db2d8',
                adapterType: 'gtnfpvq2o9kclx9g47gf11n5x30dkuuuve9mor2z0zuq43erj0uqqh7qvnni',
                direction: 'RECEIVER',
                transportProtocol: '3jb7rmmu556ydyutatuopb8nfr3n9iwz1fdzvtq303s6idsl0mjb05tff83s',
                messageProtocol: 'bimheu8akp6z6ck1s01nrx85mvec1rq21x6br6fy9b4gdnr0ohm1o0bajoku',
                adapterEngineName: 'g6u24l8q6c390pujbw6jztm1cz2ml65bunik78hcl1uoovxyuxfiulpobhsoggeweylclh2mlxx5dog4kwhxd3bjzktrsg3vyiw6rvky6prap6svpr1gpxinxq2e1gsitjc9psyd4q6m46hcg2x9zqh2c2p71747',
                url: 'uqze9lnn21uly35b0sdg29r4dyip9p1ql0appcfnqeacouq3mvgi8d8h7da6r4b84yjgoekjvtymstx42d9wfnji3657jro8qmloqxlekptu8s4o2d3kbwvy6zkw8lksaoi47cipwrst859o3bt78xdfjz9ucw5fiew0f3cr9azrtl9qa9uln62any6wkiqm6hkunpgq3ijghesdbi9xctx5rt9szya9auh37s74q3vndhc8bim1qlz0ln3demsxvszqoramr75x1zjxora86542zcq2j4s3hpyrf6j25f15ds8urjbaxazdj3w290ex',
                username: 'b0xik4gd3num87y1dnsx7w5rkwwhxi7hmmzm405773lkmqzk8oz7oibmr7bc',
                remoteHost: '2lck5uxsjrza7fobu4etshvthmkuhy8md3h3k7p4uac9fbsdd30l0s4o6166j2o3c3esg60tfcosa5ar5df8d0dp9drytrjsv28yyw0dlw2snklr4yvggg2axttyz3ibv73obyn7vbezwzusuoddh280402s1mlq',
                remotePort: 4263824457,
                directory: 'hxm4h2zolf8bwvssccre7svrftfxv4b8sqbxdktbvi1bdqldvmbqzn9bs879bxowlip3fwdp2wkolkcwp97ekvqxvl4ml9lon8h0pqu6iimbgbf4bwgorrzan95cxu515307zospe2uyszkugwo3lxm3kcekb69bf8so9ut8o5ojxr9itdelea6rfc0jek1sl1jv2nynt8remhra03w8d5bb75oulppd20zkz7ydexrft7tjppaf7ob6y5u1cqn36ak2g0iy82ex15xknke59id0o2qu1oly2kvnaws2t3lc4gyjx256l1czq9f9idvj8au7wxguvj9ayau7cju4zrbq33e32wrshnuni31fx4a4v5i3nofv47ojbc6spp7pdwmpn8j2qxy5xg8bdc9hi5vx5ra64rwvakwsztatb9fkzdf4376s15pn3kavipwmujm7ya008pwuebp4kvit6f6riix20ogmpz7cfnyrazb3d17bzx4z4183k2iri9f8prym15d2yzfd3msvr4leoo1n6bn302te7ftof7bz31cdbzl2ktb4haed6r927onougqgfya8ce1f1i5wf8ty41oad8cvzthrrsep8knkolkiirm2v2b4tvpzbs0bmq6keyp9t9k7jmm4s6iqc54rj09f99e7d0qdd0b00kpfnd7abw2b94xe2kr1eh31pue0hdtmaijma3r1emtvmzavp4awhjonu4im8qpas4t11orz63t7by76a3ko770rxpuz33fbrau5zkajbf8yofob9ngrvsikohl82ulihacutcbwsekjtdgl5qjlmcek1ifge2w2f2grfb42lk76irn2hcv4pc5crcfa9tbn1o345ymg9ag6442n4bm1rgp1gvfva2hrgroxwkdeduls2wku2lp7vjsl1zyw9f81b4c4hgj900akf04cbwfe7kfm9uisrseut9ebcr5n07hpidcgcsclh0tkge3h0r7ji3a8a6xz75uiy2wv265vbwqp7t98',
                fileSchema: 'vxt2aip1oxb1y7gl9hdyksacflbk8aolnczqu2e9em6t4k6vz85few7fo9fu1uce8tdua9j4oj0nbujh864r4xbr59vwzj4rydrcp6srebdjf82xyxaw2tway6lz8rxiowajd8kku66y4rbwnrhtrlin6g28iu58bgvtgbetmofzbmpjgotx2qca2l5tpkuc0kgyrkyx3v4swn7uj9bk88rdi0n6c5828hhk8702m01xvv4c455xw9af37m976eesanjb1lteg58qpv34rikf0o0z66l7uusbbjldbbmt0xp4lff7ne55t4r6s2hy0u7r3u91sb15epypsj6a7q9cwuh6yav1v2oi7sjohg4u827ibhpxonedg5z9iziais3n3ik9ql8gf2dbwuga6xkbcv29gkvvw0ytvwtwy4rve8v0elezydr83l52fipt4n0o2zr4k0uby9hki5l46s63k6c3fxwxltulmyc95efshlkl40d0gmg3isxlulrzn8nm49tz01u7ezt7yh1mpc23aqifqw3lvmdzn0fw3k76tyy9qprw8sa4qzuo9l9yunpvmcvnv9zxmka4naqpj5hi7phpu8kdsnck7nxe2odmpzhn30jgq67tv67bbe3v0wl9e6gkv43xjhot0on4ppi6wd993yojqmhl0cmksdmz1h0nhjc0nj2r4den1c2by601fxtzzeoip8bbjbk5sfxst4d6662t15txf3m2gl7hlgg62umpxrs8gmels6719yvz4da12oaxhh116w2lseid113y7m7b53qepj2lqxa5t8s2lhnbcpesexfbbwrtv0frtsbzq3p7xo0m420ox87ec6ytkr9uqttifp206u6z48dq6b7ga1d1dmrzjuyg014o60rkts8byfuvj6ojc2koafx9ve3v1g7cdqmc1lp2n3vno2eyuqkdrovn0nf766jwwwvt2yo3boiafz42mlyumryxhbjd1brkpqom0glkftq29ooy6sxqx8wriwqualz',
                proxyHost: 'ofcjw2kco5yoagbcspvgmd3e8o3ur6hw5gbe8oogrz1hcbc1ujdresrj6oa4',
                proxyPort: 1198137041,
                destination: 'ajcs2hddopc8u8f3bs9dwq7r09x96epmnyhlxlsyh7ju4mcl1u83o3yxqzg2e8dnwrfaiu50s8k7vdmcrvm34m47t1fku79ao73qhe0b3jyovrrzhyd9gc3n578goatw7olqmc933lmm5afgt7pfx8ulsl5xq4df',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'pojeazowohrwzsdlpr5ad57zdrpwcygttv3z20me57uipv5ji1z65oqssmjj2avte5fc93a9gop5t2wowd6p4kvo9x26ws5abzim2gcajjqaenz60og1rcv5jp4rhkp5a6pn9y1jbeb9prioji10hyw4w863oi34',
                responsibleUserAccountName: 'rvr8v368aar2twj0obwl',
                lastChangeUserAccount: 'p723s0j0bb32zlitymjq',
                lastChangedAt: '2020-07-29 11:25:15',
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
                        value   : 'a3e2baac-0094-429e-be55-676876505a68'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a3e2baac-0094-429e-be55-676876505a68'));
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
            .get('/bplus-it-sappi/channel/a3e2baac-0094-429e-be55-676876505a68')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a3e2baac-0094-429e-be55-676876505a68'));
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
                
                id: 'a3796627-bfe2-4202-afe6-a66fe111ff89',
                hash: 'djtp5j6x3h8q2pvsgm5xgrf15cvb56e6z2pdxtbr',
                tenantId: 'e8986555-6a1e-40ba-ae27-e3134bd804cc',
                tenantCode: 'ywtw9pz3yikipsznyjhdfxo9ken1vd9s4imhvlwrmy5k9ic35g',
                systemId: 'dcbd110d-7956-4209-9c67-4de33cb57358',
                systemName: '2ndpvbihaelvr2b03980',
                party: 'x1qr1k1g0qsn7q46ldi6vyjcc36qi7f4jagcucebm96xrgx7k6hmfdehv213rp0xqgstiig6rkonnpnhlu9ppyq5o7mb8zfst09tkulrimxrwpm1t5g54g8hzoit3elekerqs5zqwghvz5sxbcdfm3h9sqz7x2to',
                component: 'jk15o2qpbwiqwcm7e8kfzzk1d2mj5229tnofgm552n4bsxs70fy7u0jfrhm4htnppau5u7o8g41w0izc8orjjqmxe7l129erzwsdbln8idjts2xnlrivn83y1uk7el5nmhydmmlq2gqcm7r1tnpmt4aqv1p9v0ae',
                name: '63ozwk11ebv22hgo1f3f5uw24lia4nb9n1o457qttso41n3tgcobq402sxm2uv6j1c6ry24e2xl479190dns91j9qog38mamw0577xi6ey2193d7lzbmsgdxqicf4un5m8o505nl8i7wffowociuaryw3vhrpda4',
                flowId: '86c4a2e4-66bb-485f-9f45-b9d15d20d2d0',
                flowParty: 'kb3i31sro5g6w625egltcszd66kutz95hp9yu2crgy3souj1xtfoybchhtoxl84bzkmqhxattonjb0mpgarmia44u2c4cmgyf2c0fbed27a8m6p7jt4lullmclnsxi4xzc304octy2d32ktxnclb80gb9mkybsvz',
                flowComponent: 'nxn23dyzvj6wvrv5m7vsgb097bs2z72fsa2gmbf49tsdk0qmkznr1ydkum7kxugo1arf7hmvpfudy2gxgdi6ohxxlp8oh2urn8i5fyyvvl4eavfmv07bu3pi5486itgjprwgclfi7ixma0ae5ytnrc8b9kcivgj4',
                flowInterfaceName: '6aap8el39jki53frt5flixdveopbrl5x1f75c6jf3ehw7hjzjszs2b9cfc77yj0pjvv36tp2w60qvcnh33qaj27z8w0qub9ubfskzq759clx7oucoybb1wtdhna2zmhi0fe7odu3pxm2x62pnukrzsw9x5rihisx',
                flowInterfaceNamespace: '4afa6st52y85idm71ydcgs0ej8ia4vnptm4qx30t38ao4mirqmt6pt0r0sc81ndmkf0yz1kkf29dn7kgd4fq0b5s2r53djdp2s9y668kb6f8ulsz6ygotqz4zz48v35apiw6n5oaxmqfl9eja4mza0xpyrxzy7r0',
                version: 'kwxu72bnqa8hr346blyr',
                adapterType: 's7phub6bg3wqxj71tpjkeepevd7g009ols8jwmgwjyq9hh48weygytm593qu',
                direction: 'SENDER',
                transportProtocol: '2eggy9o9ftx3u5zhflq0b66vnv5h2lqlupv2eqyoiqm9k7x9gwbd4773r1kf',
                messageProtocol: '5elxggogg0k5jsw1xywmxxlu1j8rlc18wvtxi5m5t9r9f5niyl3xf7ltnfcn',
                adapterEngineName: 'nar7obyl7m9u9aapesb99q5fcp692oni2i9lg52slsoworqab1ebsgt2umw0osaq9ap6n8lrgssjttsyrcs13wjwyfuthvdjx6rw2gelc8ga9d3zjfbwli99tkdl9d23nef2s39r4ho0unkssobaimdhynrq161y',
                url: 'a3q0o2t4ohcisk4iudmjimpj3xj4bn31n4i16u5r0zb2026n4kdu7qyyr3ynl7gwaorn1gfm2goz8dowbil7u668v1vu08frwwgwccac25jg41f6xop36ofwa6170f9iketfyj2vzpf1ei0riqqi0619i1weningxoap4hhv2yb1cjqv8fxg26se3lmdtngo4g536hfw86sd0fu22xussgyunse5druo9xn4kwjvaibg131ro1cc7kc9xmutoh51oo4zdvux1pjxks2rj5lnxmc7oj5vlaj05m2d4u2swfidqs0efdm8nfe4i2lmwoi6',
                username: 'ourz6uy0ptn1go9x0a6dk9deuour9287t7r3av5c7xmo3jimoz3rajofxme6',
                remoteHost: '9uh1iv95j86ns23v8xyz4jb6db6t9674ecl0u66ced6qd6tqtraadzp10tfmq3e69mph56f9d99s81crv1z9zv47yv09v5x6eyp94vw4x1yat3wr87hig49n6d4uswahhysvqdxjsq5k2m6p38s4937ervwr6r3i',
                remotePort: 6139987715,
                directory: 'c8nl3dzr5u2yst0kgjvtge6c6tate2vhoczzpk0vt8929gajv7iuxq45zxvn4xmq37vayry5xslhan8w9kdh8gl9vevm108yag8qlu6si1ib0qer2ix2pf18kwqrmu6ltlz1h2zlz6vhu49ziq6wmqfhhignuuycnxhnzofeko0olegsyis2w3cx6wauaeyio2miw0gok4vy2j8vs1xc4qxq5rblal8n5bq3xb73963uh5vnay0fjqgouypm1f7d1yf65m9n03s36rbxl2l7kav6jk9hkgfd2r18vtos51hl8pv5uaf74fhlkzngz19q95qt3txn8endcqa48x5twxs3e8b93xn17hv0jiu69q9hyknkzq9dn1zrvc5dd4bbckjyfkz71su8mutd4jyihynsq2l6g21cfjoj2we7gbp25a8s6nlgvveeb8s6x6md1ker6u2zrjeaxscbys0bswneatckjq1yhw9kyncp0umazsfks5jkrv6n6c4muk9dgpw465q65k9fu4xglm631ncwsdy6ey68qqxvkz0571468689xebp62kf2ziqef666xixwsnx6gsg26z83dm2phmuc2ol0r9pm44vbhs1mvtzjwk00tzgnnjpy9hy7sspzq12m2bdd3lcmmsq5am37hwagg3epnxl9zlbxeid3z6zwty7zzter942mt7jmbdqza538j0a61vlz10mh9mnugn9ugym58p4e4gr9y4qn4cq2t15zdut0q421tiqusguzpadfzs62ican0w0ls9f9mq4gkks2c6zwiq2opowhbe9oznj42dhd2qtj31f504b83nad9mtt712ljw6s06ur5bkcen9srd4eqs810q3j6059h3vd36f2bnity3dm56bk0csgcohrk4sg29lnptw5qecz3yzxixmnyiupomiuukpcqy1hlq2yg7x6ggc6sfci4now8uk8eux667jup2ryiszioeh5a4xkl5pcrom2xdquuq4umcj5oi8hi3nm4jt',
                fileSchema: 'r7fpzhpjm99xm6yaw15b8ix2y50qdrtw1a5kt292zhnqsri3n42ijqothn4yq92g81y2hnso6bsezge708ksb56fdu16emq9svqperth7yn87mg5mxmxo4v3ubtg4vgqkothx0zo63mr2i9kl9qo9k0r17rkmik7j53rlubawziswwqoyz99fefz7ivjyvsbips798si66bun78zk4q57h86lbtkmes5tnuiorqel911bt0zb02ujfg9exkugl2sbjmvx6f4cs4o6p7ctac63kb9zs498nglhxenvzpcdaiqbckk37vt80bd29ekj6bg1qocbk00sja09brel4x9m5q8cq8l6g95kwpchiyevlbv2pdxmj3syrpfohwfcsh3una16crs9ygcevy0aoootq5wlk6cgy4rbim9bbwa9r2zioslrhj5wdejy0x9j4yc8ymhei57g3eg5tdgunl0bc3bw704d7gw0s20xqezlnd45vav12gl6b3pcg39yulvym8u8e0idjm0xvdmmur5kyzuka8qn4deadcrbp0ia4p1nmgu7ysztnelsod5k1xywruj74zpg8thz72mfo70l9r6t7aomrrx19yzx86tdn2cz9wbd7pxl5tppd3aksu9egw02f9f8i8akzr6qe0bkcm9w5e8pkpox6rz7dyrhw9clcrvjtxjzt814k45krk8qk1oh2inwyu1edidrcd6t3u8r6nfo8r4qzzz9yufu3orev3uxjcgv0q7gh860o80kxqiybhr215cmloxcabueypcc9cywbjt9yazhaie0cmpt0nhtwszhbw4aetl9901yoa6vyh8yy4233msx4rd3dbjbvor1nfut9smzzo6yzly9htnhsofftzkzq9mime38p568q3fh64fascr3e0ne9boobffe1sa2oo2eqtoibcq1186if7wd6aao0jqobxbny0ds8lvjo0f9x20y4bqq19y7o4j8c9eajryvbslu552jj6j2bot5lur2n50a5l9',
                proxyHost: 'uh1x71adb5rk021mpv9hjb2a5ria2hfuy0c5n024k99p8l81unjl4000a4du',
                proxyPort: 7449653825,
                destination: 'vxrv0vek0561gjptdsct9vtsrew9ievhlpk4xiaix1nkuw59k4npi8urvpy1fziyjlwb41fdsvon2rdfswr72fi17bu2jqlboulojnu4i4tze84pn314qk4t48woyueize7cmxs05j58aikncliz3vhp5anrnsn4',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'j4nafa0d06wmqv1raxgiuvatw453a1aymhw003ag5okm23vikd00gfonu5k6q1cygpmmppm5unef40a0ib77mpls5ab8ee9d4im5mxp24es7y0qszuzb1ulck8zrn859pvp7dhv0559yq8872j0k9r5o46niac7h',
                responsibleUserAccountName: 'ftrhxvq2idkkyiw774ur',
                lastChangeUserAccount: '3axhojz1hlj41ngkeaf6',
                lastChangedAt: '2020-07-29 00:04:39',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a3e2baac-0094-429e-be55-676876505a68',
                hash: 'pmrnebqhwszo08paam9jxq7szkrmsyrjf9nh9a66',
                tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                tenantCode: 'mo6q6f7p2gaowhuox4zbrjpxar6hckal9nx461snkgcgmrkue7',
                systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                systemName: '8xg0ba741bho9pmwaood',
                party: '9spmgi66b82hc35my9pq2xi5sifir1iepx8b4mkluq4dm0qzv2s8odetvo6orrbxs35upcbmakam87zl3472ybvissy013zuj00nzdurv7cry1r3qkef5y7uhq9i25c1gsvpg88c3vh8ehmogk291obipa6sk9m7',
                component: 'h5b1rpox8yeu5k4aoigp9jl1a2cxow43u586nq59atsdn121l49ks05fepq4l4qz6t6hg5xrrnko3bkghptaiku7oyr9tjjqz9j6ifizwnt5c030rrrthix8ea75lxaf7niewqxob1t6ixdtvbdmis5kzahw4nyb',
                name: 'rwwd4xbx3fvx20ugxr6luw5eafdrdpuumqtjjj60hsbwyfvfd17codvt4wd3yjux2ll7s0eylfsiu4cf13u73go7t9wvzzyr0s42e6lqh80uzt9pbpw96tfz30cgyl33bxhg24ll5a1sjcwfje3mfpjcz35u5trj',
                flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                flowParty: '43s7w08di2tv88yx8w14idyyg4ty1cshimmvsoqlsmy8ew4q5sj01w6k1pkb2ibcxqz04tl0taykc7xnzqr57584isuje267s2gdcbinax58fb37ysr5cdggn7dvn5ai8s3hfc933oeohvf3euzph6715e7cf8k4',
                flowComponent: '6rff3rc8plzj0hy94kg9u02egfriiux9sxczk0w1m0fntn3cqgdgzegip8evtpsuqdicuhvwrmma3tiad7hkzywo2fwvrgvtotxbgbf6owwozn108xnyh58hxfjju5v3c4aw4qzu287ffqttwedlegz3o8iv5c2p',
                flowInterfaceName: '061vchy7kot7fjben718ejl5i98278x20n6dkgancy428y6ijo04ej1a3bfhaqcs057yvsmx5xd0om6g3udoyrh0x0ch8l82w2o5az4hrgcpupcelxhdti05ommvykz7zd6pvv0gdfxfgu6xot0l598jy0f8qs4k',
                flowInterfaceNamespace: 'samskk47lebwwtnkxubudy4jaqjwi1k09d0zhmresuhwz5ymj2z3d9l9380qh43jsmotl6lx9jl01l3x2ge5dcacm1x5yxd20une6sbdmwdkvuxf4xbhc4dqq7bgpdzbrgg327ti56mssqjdngr3kvur1r3ihpxr',
                version: '762h1rim6yxfe9ptvvu9',
                adapterType: '7h5u2ygil8xjyl152zypwqq43a74nr8hsng13qm96j40ol4ctemtps1y1vp2',
                direction: 'RECEIVER',
                transportProtocol: 'b9ccktbnfmz8wt0a26sea6ru3f98218n4vehdptpl80mgjuiy7ov65jo3yz9',
                messageProtocol: 't54yqg74gqt3q9mp87ml2hmw4g7ejdaykb0posu4khr4a2yd49m8g03s3q02',
                adapterEngineName: 'go60pwx2b5mniekox6dyh9jxnczit2rbuqan3swkefm6wc1iozla41qzalif2bk490twehfjv9fqivrv72y405ra5ljbtxiupazawp1irghgs3p4q9rd9bcrqm9x83bvx7cc6k10nmymawesbomx755cacfe807d',
                url: 'rqrj643nu2aj6234lvaamysj81y8e4e12b9m7cswsegy215jci967nlyhq3j4ea8uapi3omgjmrthy96zpoj3bexdadb1ibna0jifbtm2oi0u0w8vv7o3vexbspummue43bmm7qqc8nfxx76o73r0zs8j3p9tre5fbu3wsph82ul5gwiu06npn6ne8xd4b4usinfrbgntlc2bzw33fncgiuoy9i7yvawwhohpmof4i1wuwwsonnb1gr8y45sced59u74u7q89jsiyy8f16zojvmig9h8ozbx400udks2tw8oicw4or39t0mvpj8el0ee',
                username: '3ce5jl0uc7w2onalfweoz3lwemzcodl6hkfwsv0fedxt2oxmh61o8o8wkz5u',
                remoteHost: 'e02ko6ub0q2j8k7lz1xr9ub0u0quvc5i5tw7jprz47425prej3giajmu14na0bw46y77irlxmyg1i0fr4ypajt0mmp761ncmq8y67juthti0tbtv9pu6eny24cp0ecrpzmd24oo6pb1rq9gkx1gdj7fluqdskkjt',
                remotePort: 1867154548,
                directory: '6eiwocs64ptygr53n8ieyu70zudyk41vejq18qwp1bt3lsh8johiaz5xl8g10rqu2o1oy6fxmabnp78rwbsr9uh7h75bbwfnljl9uim2jszkre3h31sbhszha5ybpivh6xxwwmlmd7hpdllaa8d5x79zvswt2tp6ad3ympw0vn4hbhrhhjqmi4mxl7sgwug1dg49zvbxjzgnddq9r8cqot3hpnw2addol3rbvekl0upa3pdjc6p14be5lu7xem672upz4adavhfr2l64vffjrcydcwn4l95bn8lawj7s7bo7q15f19kiz3onjx82lgdu4gmhrroj5zfalcgudmkgjjkvds7pe2bzvxko9kg9evqg3d0y6ab80c1fuq2tu70s1xf1znh1z8ptgwy1q76b67a4yin8admzbhyn7ntqywke78xpt29ytn1040w4pqfjio0z7c85ptm73du4os5ultye1lklrksj4eqm5y17jur8rfrg22ocjexs002iq9xhr7efg7qotiil1iz84ukrb04pwpps0eqqygyf3hp2ra7fjzvaxiaqkd0wk1p2g5mtc30ub5kpgnols3as6ajr8oyc3dliqyonb7l27bhu95wyov9gugmz1wsghbozdmhlxunb8xhesnfrmerkeelf9fv20fsjd3blafh1j6ajv2rvwh6ohwpwj4nl4v1vcc5ucb0ds7m8s80fla7lfa7l6ryfrt2uln8fprjm5yceo59jb03jf4jjue6fjwyivwwiyg1recud54symzvfqgzmnhcs9ms2tfice2ef2kmvu1oua7f3jboegjqtv9fy843l994v02ffhf1aw0d0ke6o6vcnny9nyi50bqnzs2swxp51gyz9wzfpxsc7eij1gevnrl5xz10ruakabsd2dp9ccc8bffdv96bd67n1sgellcaqgcw3y9efbja6rsiqg9epa60aicj03i0awar66v9p1s5hmhpb9y15oxfmne08jwsssza1mrc8dfbi8rfwse6p',
                fileSchema: 'ystwl9s1ypbbh74nszwtinq2i2mvz2frd35pbcfee8szjsumsrsic5r7yb8115p0g8ejwd0a43paj5fo0vjnxea9i59etwrc90xf5un33cn0lnakqbww3rwsufrtnyx842jrau0ooigxvu9o68l3bpgmkaqjlyvhnpbwxw5k2b5gapz7bys9xrkf8t6xlphm6rjnasiqfhqp3wzfd9p2kwpuquddoiaco0p05p2i2qtve9x8mobti5jrljzn7h7b6kir171cz3480c8d9y7dygqqfuv8hjoz3470sg8ltrd9fck6kpuv2z9f35qc78p331gb20ec3fx69gx52p43tvzh1szhnjbrg4k3uzvem56s37pstjl3z9u2yl7ksn662q8o7hrgb8t6kbee600xqwqydvp76v5brmhq1m14wnlnajdcjxlqqarvuc5ww65q0q2sj9cjtyuxcou70kkbtvne1td06f4fidq5a9fswjnb540q4iet4noywe9wc450opkvjdctt1prlhhal203g4z1khnvxmfg05a34tesgumss4hw9fsjvu3jztgtfd4cjtgnb9jy8phgdmer320u1y43xoaqsrt4fklzp44r6zw0b0fc96e9ehjqit2h5hjbe4drwfgtqo81g4lh6yxxe3r7vv5qojmgldi0t5s7bi20ss7a4kfqteqnwage6r4i9esve4to5mntmejyhnrnk9gb05f8zc00bog2bq6vbuebh4302fh9qc0y1ecg4ea9f1xy9aa541ik5q96mpkvsiumbta80dgwa1dqhtsbr8k1cm6njj1wvsnawpc05g84fkcggv39dc1ydv6jpvso16ry3xkcq9evnpst3xc3fw3upkt6czx8pv1rqs6ny76xtuq4gbttsaqr0a5jt1uudrhwaw55esw2axov9za83ejym2dp9gbbi34r4idzge8hagju5hdiouzg78j5ewnkazijlrq95esv44qvsptr0e2m0ho0opfdwopcrz99j4z7',
                proxyHost: 'fuii1av64cpc9vqt2rn85mhgdrdce1sv6df5zhh8bpln627777bj6ulurjmk',
                proxyPort: 7226402360,
                destination: 'p2b0nb5o5k1fzmjbpddxkn0y0jut27yd3k3iw6h96eot7394fxh4e9xuvr1littnysaehh45vfxcdk8v5yhhb8ljhjwg87clwg8lhc4qhe6qmw7j5kklpvnlueo12djf0jx12l0fr13iwteumn9rhw7g5l2h60f9',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '88wm2ww9d5blteuua0ek8crp44dfnh0ny1hpzdhhbj0f5t2p7nrr930vex5gs09qtj2fv8o1jdmkdwsr1qyjr7vvxbsqntvohailqv5rhvm6b2ua8dgxa5zy1gyx3ir1g28ayu1bmj4nlqhzn7lnybbt5ooi0rlw',
                responsibleUserAccountName: 'hypx5tgoymjwoo51p9lm',
                lastChangeUserAccount: 'eikv0cvzfgyiph4va6xp',
                lastChangedAt: '2020-07-28 13:38:53',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a3e2baac-0094-429e-be55-676876505a68'));
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
            .delete('/bplus-it-sappi/channel/a3e2baac-0094-429e-be55-676876505a68')
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
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                        id: '228484a6-cb0f-4d35-a4c7-a658440aaa2f',
                        hash: 'f2jniaqluzktfxkxlbf4famke770nyl8q36w97zs',
                        tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                        tenantCode: '7qewsetfuftxtvhcdr1xnetts34heot548in4vktjk09ftb4io',
                        systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                        systemName: '249kib2tydkmlc6j2hpj',
                        party: 'jxjqjjczqhfvo5a4fe4fprexr6hl4j9kk1229pxz8e3f1a4h99yeyn173202vb5oyyx12jcl7e22m3wnowyowdcm1jbxopnx2pf8nmv9ygelp3e0d8iivmvxxmja15cj4yyt8f2he2xb0b19p9n36xxx5iwpvn9h',
                        component: 'q210cmz76pnj3yorhwew24wkopse94thmr6qu7mq3ggaakogjznafyp9gttrbsznj8e1eafwnkqdace0qpiqds9f5hgnamynasxrfevs2iohqum809bs0dxlyefd7xolkogm5z0ioc508c6qxz3jq355j2hw0ggr',
                        name: 'ibx9jwzysmknlmz1wju54z874nb45ugral80oq0eto1o1n6t68u6mwalmp5jd0h08ptiz26cr3w0rihtos5omzt0vcumdwtytpshdfro2pnl40zxtwdkvp12ets15z2wm7l15n3y0wfe1f3olw06b1z5cygvbtmb',
                        flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                        flowParty: 'r7w5ttefeepdpp4oexaqj8ccu595gfdbiffepebba8t1s2f4kbrh7v2lx2on9abud60zim96q99mh0i9rlba1izmy5wvv681aepbnnsuxcqnny3bn5tg6xjx5wp68l91sbr9mhpuaiudbbo8et0x7zz2rvly8kon',
                        flowComponent: '08e2j0jw9ka8jw7gusx1pw2yxttc25ulu49uhlwu91i1aimaaqndbbs7phs1vkamfpvhgiqvxifmn3m6z71k4i682be7fxp1ulm074bj5xay617n9akeefaugwb0pr9w2gnl0ai3j27pod9hjqcybir5a7oexzym',
                        flowInterfaceName: 'qkwzreo6lj8tkfg64g4hm89bqql0mzi2fvovfbmq76o36cxjqgruicng814ilaoviawg7kiyze0m4iabnex8w0cil2fcmzcmwt1wncqjdjektac7a1v4urr2bteqfyx20n10py84kqq26oglfkmtpox025xse9u7',
                        flowInterfaceNamespace: 'puvh5c8n9fj4jly7ovv399rutxrbyvlzi42sca145x6i9a9ke4mllna12mkd39zbq350p76qnjrnxsshuestz9dozgh9gw8u2g5k9m97mhsq3076268bllz4ufq1z7qqqak3jbcunsahlad1coobc1ewtnxjknly',
                        version: 'wf2akdcjvwv2ixlrxcwv',
                        adapterType: '1ff5jgc52zz92ny26y1tfmtklfgfidw75uqi17875ozgo58d03wsw3mplto5',
                        direction: 'SENDER',
                        transportProtocol: 'e0jt1y24tkehha42ohyktyswnxz5l0dpiubovnruy8bfrn1df2z4h60w7ngu',
                        messageProtocol: 'agv7xwqg3tkia4wo50edz3n11lvl2lxjblltyfwss706z2hmx67cgjxj9cbv',
                        adapterEngineName: 'e7e7wfyz70lc73rm9u0y6fu9w5vlc2asygeb3cg0ua2q7ojngji7o89j4set207no8xcdud68i287atmv1720kxckkge98qsana1lraucxew12ewx1uo6t47p045edp7l5uusj87udko8gb17ubgvlgphyebdh76',
                        url: 'zr8ifsspun7fu6ng6bkem108x2rzwftjv22ldk7ztl647txa7oj0ck9np02b6hp658bdie1b4wmror9u356ssnitvh5x7qirgntz6ybgx4j9tzvlojy4cb8635feinn5t4kmy0nt1dn5dtutay2cf8utge962uc1tp06pbsp9i5z1rolp330te1a9qnr3js776kxm4pr122me3zosgdtjav1thld0m3wsfa2ywodbkao4z37mk3ihrtg81sxdd1bt8jlnui4ffweftjjbda0i5mioed8zqg5qdxv47zlr3q3inrp5ouyyfqgl21vu087',
                        username: 'st2kivwxutc7tupywrerkcw1vv9mro3kft74ffw81dwr6s0o1f6wa6he3o3d',
                        remoteHost: 'halugk464za6lh4utlaytv2euqx6831kzmt6vkwiilf7gd5mjatwu7xfk351ry111z9jhd1h3e5khr7p9li7axiiw52q3gqpvw6jh4bohep6o9gybx7xg2jfemau5loj3wpsrccdtyypxiwdq6wrzespj055ly63',
                        remotePort: 7918692999,
                        directory: '36m7ifchoq5y4xk2bxi8sch84jxnn1kjpaj4fl6u1d9dc9i8c4g99xwc514dwpfmfg1yrdoviy3yuczbyh4jpxef7inyixnp2ybse6ujhfuxikgvf0qgitalhz9qscwd8txda0hx7izmrirqb5wwz9v9un2dogbcg6tgslyyg7jfcj29ormafih74uzjjmfan1ymaqvseynuqg371a9fm7jd6y4ygnygjzn80tg47kwi5hlc43676za1xhww5fcwtlxdvyts48baau6m2h2hedtrfm0jhd1kcnbhycamtsfoycgn1vz6xvf44hz7mleamyxpu31u17pna4dudpfl3rhfozjotxjgbh1ys944ipbl2q6j7coe8tyohrqwu6kjnm58z7b6yck3u44iamgcatoxja4l9oosi2bg2lxb9h43btucybq5scd0rbu6xvyfqh9cdb12tps4b9xrw8n8ok5s7xg99biuxlnv26tpmkhdlial4fcmhhq344n7xqzu1wut2dl9zr490gkvkmqr3dniyc3zspg35xdttqmn8disv0m9s5tj48zxbn6thpabx0gc8qiuickrr6d1gui39jmusop4srhwf8dsqe3co6lopw5ze9aa2lzbiewg6vu9ak3ct2b3dqf12xt5st9gpw51nezamqx6hi9cuuh8hu95qzi46e0i7k0b57ppdr1zhc1z9mmg6ypstv5f77iiv8h99nbt0l5jye0rfurna2fotgeclyxiaf8o4cinin8oyu6682fmeb72szal160l0odv41bvgr4r2kg93qumlo1bqb7h2nqulrnx17ltvshsnm690cft0sjtqfdorhp1hfu7pvhm2rfjjtziz9iiikecrgdrvhvtolr7py7ck07phztk7rqi603dmpncb91v34mshcwvigoxn9kxtv8msw56ykxw2x0s9eefozw4r8t6cfvo6en5fc0l8akia8u22k6jfw1llhjzqfglsii8l63kvq61t9nh43ew7ds9uoyb',
                        fileSchema: 'behju8e9edva8z6tzuloggb7xj0v4vjivp6wg20d78xyzxb4t92b3bzp4h93i4mua8azzu22mncjdmr3sh8hze3irsgeyw1ckqz5vafdvbgiwt7qa2rxmhqv1e7a6otrj7uf38d0zou5opbmfpr2rvn86k4ea24w641mz47urn8s71fwe2yhsefg7umdns2xnzghjsv8rrz5ri476yb60lzwxjowhwo702gfim8vjbnxdigj1yvsnl03p4xlrib5y4bk99qdwp0wzgg1ik7bf1kb6jb5gu4huc15zmib28o1ayw8y5e1jx740cl2qyq256e6qb8oq2325l26cqz9nf90oqdm3yuit6tbkg04q44w5p9jlunc2e9gji1ty2o6x2ls1ao574r7itzyz2vh5x72sega3gsdj4mrrq7c44yefs5bv4z5z4f7hx82d8ttkpau9oynf634r83zu7pomlnnu5efa51qz81y6c6qpdephqusln0p7iqujjswcun0l4c5wytc2ucbdn3hzwyrwkf6wyi6sqzqwpktj2lvzgxgjssjp97f0uj89bsolkk6dwnbk9qswlj7beufvw4mhm5zzanujg1me1hy7yme3vdt4u9yebwhgtm4822j6mi8swf5g8rli7nb6x8ctxcokqr3zpixdmf6jfl1kg8w8ws16eahrmskjxoawilvbfvy8n3kmsyz9u4ffjg5segwdqp4y538ue6ccaqxd9smvc679txlhm2kikh6zqmc47ezo8gsln379s9jimutag0feumnkv1d03g4tartnt1q3pa7q8tyfbyympmhuejwmga75afu5g6yihj1huc9vgoemm7zo0rt6o667rilffhv9s4erlwn1kyyc3aihwy1ajzqpcwipreo3m9lnn7akuoyfjjx203tf5yd476yaf1oyb3jdprpqjze4alywccqrnkst571c8h1n3qai4jg0c7o1qgchv6or2ie125edx0htdinaanhcioqc5xmujqo3byu',
                        proxyHost: 'fllok1hsxv0idpzhngym4ucpkucf6yi592t40swdpoliob1sg7koh8ijsead',
                        proxyPort: 1826465142,
                        destination: 'ore7miidm22imr9gql7pgbgf9i6f5izn3esqvv8b03ebvt74nawz1e54sr7trmn082q632nqmqscan168ph3897ped5jrmhoa85kxa39nk3pwxvkn21ft14rkejwd1wo9e3p139vrk477juzgsxhavxi9s0m1nws',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'wwek3fnok967ozuundbu8hqkw1ygukk6x2uq1ygx6q6li2lv3iucg0vyijlmzngf48r22no5cc9a61o0yatcdw8ocf2end1nfi8fwcs8ebxkm4i2zgxwm93zlup4c24fcnrwtcpcx6ki5v52kz3h0nl9fj32iw0j',
                        responsibleUserAccountName: '9j28gk0rk1lsfoph9ed8',
                        lastChangeUserAccount: 'g90eo7p7q401ewjk81t9',
                        lastChangedAt: '2020-07-28 20:17:12',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', '228484a6-cb0f-4d35-a4c7-a658440aaa2f');
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
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                            value   : 'a3e2baac-0094-429e-be55-676876505a68'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('a3e2baac-0094-429e-be55-676876505a68');
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
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                    id: 'a3e2baac-0094-429e-be55-676876505a68'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('a3e2baac-0094-429e-be55-676876505a68');
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
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                        
                        id: '601424b5-705f-4716-8918-722262de16e0',
                        hash: 'abldqcc5wavnft0ccmylg340g49u2kqciad91zk5',
                        tenantId: '758f8e6f-1d74-4d91-8d22-736a2238c2a2',
                        tenantCode: 'rzskj10g5ufk9x9d0hiwrf5dut848yciv0enqdl6ns46hnt5e5',
                        systemId: '974305d3-3ae4-4db6-8643-4175df029ceb',
                        systemName: 'w9x2ejabqw6vo5f0o0sa',
                        party: 'xsmtkbgmsjr3c8at8uj991ygey7cwj839t1l332kkjcbgt04qt1jwwind3nw87znb2g21sqn72lzck23v14sog3kwc49cy3suf309p6v9kgjo4ymmz0tavg2cm60w0ixnovvi3re672cloh58j0xzhwvvunmfz12',
                        component: 'snhb9epvjrkb11z607pl5u78gavig0vf8x9mbkife0d6ujkls7wzx4kd72kizhk4nky9dpk73xpv2x169qs1kx2d43laze4idkd0d3vipcwryjhln8o14qynzc15lg0fzf3s1basvgwhcu5thvjxn9oux1mxmek2',
                        name: '3i0dcbuynih3q680hem6mlkg4ppp3d9whko2oj6j02usab32vdrpz3ouj4sgqt1cxxtgvi7ccpmu6zqmrzdg44pwf4761689jaefxx8bd34uljt6wb4bixhsc4ug5zmxonzmi75h10kgdxt4e56qm6bic3o8f2yn',
                        flowId: '92929bd2-e940-4ea0-9ab7-80bf563260ac',
                        flowParty: 'knxu34cj3h6f91d9dp7n1ou8j4qxx8x7d3f6mpj88axolhfjnmyyj0h05ovjoxoweyrp7faxw7l1qo6rfk0y340olfc5zk254r9amddwfnw0kegoljaxzhqxa14rwkyawj6j6fmz42j5yw69gp802ldeavpx3phc',
                        flowComponent: 'hslc4xdf6lrx3r0o85w9lzpouhj2wjlpwhjht8ze51daqszdpxkippw4ehsw26xim629hlnjquenfdys2aesjg7wf60fzbqicmtjcp1dpbmjed4n3bhe62b4zp2uyydpr0vib1titk78wv2he2i0tsxamcddiey6',
                        flowInterfaceName: 'jjkinouqksjtqy43fgqsnt522r6jueqm9zgtbwliqekxnf1zhvv9fry2xjq9iosixp1lvsrdze1s7aucpefp523apbew8inzib0uoox808jwpi9dbbit41zhg1sdpx26askepfda7pukeoqdprkuyekhxccw2qcb',
                        flowInterfaceNamespace: 'axnjlcwk0qrz8biyfz4col0io7ndad0ip4u1ivyd1esawptmzx6lj69q5fkdrcs1eq85s0yz3n9jef501sm3hiay2nqefz4wdrnfmstkc4wo5tzeefx2tmlxpbna3tj7ksa4d6ft640k9582h8ztvivp616tsigh',
                        version: 'hdy3859jcqztw78059ge',
                        adapterType: 'trd69vs5olag5egsr9fw8c7u7b8hsz9de5xwoxno27we73py0kavh2h3wbl3',
                        direction: 'RECEIVER',
                        transportProtocol: 'bc414j7yrjwv383qcc103saeb4cgaq0e1kp71d9reda0xwswwojwj0g5kaeu',
                        messageProtocol: 'lzhkmk5q7ml2qi49kyd7kprx9quhi9141w8kxmz7tj8x2epdn6vttk4igt9q',
                        adapterEngineName: 'akrc5i5ft0we3jtt43r6ttxdy43g0q29ry19b0kfa0l4fx7kdmuuebyzo2mmtnd87b7vjsd5qzu0048y48s609ia835od148lfrovgkiezf2qrp9gyd99chg08pgeieoffhf0jor4sw5m4b7kbsflam8wywgocz1',
                        url: 'wygkcpdbv79ccw0scilfwdd7m97icd08diqp6r365psjhjanq2rqyeuytqjatvecik0wnfoj5wgkardgt95nbi513683v0ae16165oizaoyugdcq4rdqgh3pywhh5e5h3wq90sfpvgxykw7pzq3j9f5k8k867qvkcsgjq6rcpecp13pf6vdv00u0rq6nmnzlxh9ntgvtp8e84cuegwv7nkvaw5lxmzwdig3jnubrnb9fayjw86o1874v0xfhtg5odrjp4icni1lfha8e0paym4dbthoir0zeea2pczra51dvnwiijpjls246v5l1o9nu',
                        username: 'g6blsm02k7rwe6et6seknlbbi7qeicmt25xo1mtfk17tlu2gcwmxua6j9djh',
                        remoteHost: '6wofol9d7pkra92kymoigvfqe3fqiqq8vxbn0tga503w4vejjf8o1yxvqec3uur6dry5ilp2j7iha4bn4q702e1eup4gwj70jd8vbgg8cjosp9wo8yfce087ia0x6k032f2s2n4m4vhoyi55xa1pvoh8lxpg53aj',
                        remotePort: 3610782492,
                        directory: '5nv3gfj14ydv6x3i4axopji8vg7rraqmgnf51r30mhtm3ja9cxg6p7h96scdry7gwi56dr1b29toh536y16iuwcedwat16oc7q0xjyd6ugxwnhwq8aybhs3kuh0peqn4xnzo5utri1o63z2o2vcwbxqnf2zh560qsluugarqyl51yw8fy0ros72m93e9t6jie4z7tfnt2rzxuhotovuv4cbbfzrbuhbhay33j2g87ravosheio30l6ku0e4ir8ieqgisouz6jhwx46n1g4ekanil41z4rlselxvv2cwohv22fis7gpj1oz4ei2377mvg1lnkz10xx9o5joivumq39v5ey9w80a5bcio8aoa1pfohm87a2llyp0ou72uxp8yspg2lypa882a47od5wg5n8ip592rf1vv9xd461mdrpftyoywmhy92dy4i2ql4tyfopnoij01vylpnowvjjxwbnl5ouk5ohlz01ye08bzed3t414hzpn3e5iuw3c0pspb2gaiug1cg4754fzy5ltr7rjr980e4sghs69xh07veknabniff7sem4ese47ei8j5dpzpua3m7hfdr411su6hlqnyskyrura39rgpftxl4z3uw4meut54u08bfb0nh41ee9qld94vu6cemcfnk01g39rqnnvwh4l8ihuccz6g46bthvuyb7juz1rii4llti8r7rq1632mg1axcz9wh8v58d6ygmzb2581e1ghushtdrwfuxh22fmasu7waxbj3sa7z3b6durngj52c5tevcnfynw0c93krhot487cw5xc44xdwp2q3ovdvzfhdzar6smkjds6mcwkxnzlbmzumf4yzuam007ftd179iw9xhv20qe6lsx2d87c0t5wf18losessq7qz8xfzooqooevk7l0xsom0j8002qf2j4t23htoowrfwe5uccdkmtp7ncrczb079gydbt9mi5amo2ow7zp07xpqwtu6ys14cdh7f72e5oocdf33ox4th4hg92pkjbpa',
                        fileSchema: 'vezq3463ll24e2ra2y0cu277w0twn6reyte7dcsnc156cxau3gcw9i88xyf57pv8btyqyb5e6sf0tvkt43yi7pdtvi089swk8ipeimcvzcqokuhv8q8p0uyghxetjy5ow6xz7mjl08sgrsm3yaxo1oe1xtvn81wo0tybxlbge9j0wxsjfo5spcuks80k9mzgfk6adwqq11efhi8wr738ige1841vr968yjccfibu8faqr5aifzxj9dkwpupibs9is85k7e4zuzpi3iaxp046qzewo27o2x5y8u7uj1ipvy19vljnkhxklg5u56uk5h2hyykcivpc41r5o7128z9w6sa4vkpd4k12rep9qij5rbiiu4bkib62l2pragudjolmadsmpsu3iv21wc8u2b7a4ptom0sudyizivpxi88ya7opg7epend0uk3tc8u7284smerfic2y7x28yo5oyg4w0qiuo8r3ba76nbi98yu9pgbdcj7me73kq3scabrhnczkz0muwthnaeiyj66gpn7ckgkwud0cuc43wjawau777mmqpjw7qo7vq1m6nkxo18mig1hgo1jn6dli8euqpeq3lngxdtgfcswncz7lgtgzjheea2ykopuk06xvlibhpfic4kfo43bgqhz9jgceq8nntesrhqyri65qb35rsm5y9uq38xh9bupflureehy43b3lvqd3ehsfyxwalkzed79cxnn4ftay6ymt3ud7r3umy5gq0jycyt23nmonzj5io8clbhizrocoprp1cdbetojnuhodjyuy8lrx8yhmpw7z02k0pd5038om2s916zlyq7z1iwlmn6gw7yf2ear4sjclbzi2hctfoipbx75sl8ittqesb19kyv3az6qqipo9gh3yp0zui2suacxjbvpy223tnmnc00a2cnu9ud4c0odkicgelhbpis811wh67qyyd8ilgnc3tf666n06sz4it929ctrxy91r3hocvnqqanzwmzf9dazqq3nyy69lnpr3yuh4',
                        proxyHost: 'jwctj2a7enjqesdpu5mlnu2x30mfxact1duvv6iopengwqjsq15nzrp5x8o9',
                        proxyPort: 6127024203,
                        destination: 'hps1n7nfyx8jocoywmf8ji5ier3ngyeolrnkg2zlwz8u2gx1na5gya03y4wqz0x96hdpu1k36f8es5e0zmm5zy22ths5qb0jn4xwqviohrr15m2x78c5qy6d8jth8g0amur8xjsr0nluj2zu72kkc1uwti305ao6',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'a8ar22u7vuma4ppy95dzql3yelfa2ud309fnmlq4n1ucd8n10pzr2s6xp7ezq3ujprj1fijb3eud7w8onu1hkoa3ss6yu2jsmxpwi5txdren830hewizqrs2lul3in2z30f3hpg9dnliv3y8b9f1cdql9j6twlh8',
                        responsibleUserAccountName: 'ng1tku1aywo8dvzcekih',
                        lastChangeUserAccount: 'smcw6qpx44g8xjgsyjdj',
                        lastChangedAt: '2020-07-29 08:53:36',
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
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                        
                        id: 'a3e2baac-0094-429e-be55-676876505a68',
                        hash: 'fm1vcqhxuz3w13s8wat839o4gz6htvmu65tezt69',
                        tenantId: 'aa4097d5-332f-4666-97af-11cfdec00c0b',
                        tenantCode: 'mmqrx30oo43oyrudth4gi7dhaonzxhubuzbfg6tzf9pxcu8i2d',
                        systemId: '8ca98ace-a2ec-490b-b8c5-e4509225f0ca',
                        systemName: 'h092e8f33j31kerqzh31',
                        party: '0k2e7g1wfhu9hzp4cel8s0refsm6lhfyo0hglvt5kpfbqwsln358h7i8ksjerbrpzx8rv8m8pvtctwx4ofs5zfss8n1ra1yy47jbzrvhsnjw3982pld986ii2bripjcnx1rbegdykv9yaa8mij7iy6t1owpg90xr',
                        component: '7juo4ly3p44hq292bk2n8pxwwlqzaori3kc9leo3e8uxw4to2zikecn7x7cpj9xihqpnu107ulxhztrd90u3anqtjyendn9iqnpnloom8879z022d1pm1qh9eesrccm38d19rny8ol6d5jec9fqzoarh770ro15w',
                        name: '4mtycn8b79s3go03ggvmw8t832fgphe56pzuy9wap6z0cgnvbba2n0tpx4tdq6bgessu1tvy58i9z3sujwa29cmypz6dipvi6vt4p4f9w87rx5spy158p2e988ooh2z8htrotsg3n4ko6rkex29dy1ljxntkkkic',
                        flowId: 'a1660578-ece6-4348-8974-cc36f4065216',
                        flowParty: '2hdkkvuvnesuhcktartcf0besu36qn0v6nv7z5ufi1bj1xgldmuwz2mu88fr54jlih6bt19tyf2uemh8mxl4qq3m9shtty3qzmlfffor84bq509uky79tmxtfp33wli5vlxboolej59mzmptoa3nvqo9n2f1tnal',
                        flowComponent: '6z27i5ylsvde9v6hp1zhnbly5ckmkr6p0whhqnjxzbpx3meljcx1ab9y5nec1vjvcq8vnpgalm6wsyvls54we1mifrlymrpegdsdi6p9zh24dbrk7n8y8l4nvqsszuxvwzgjglj2pmrl5pxjyf1icsfv2rghu2nb',
                        flowInterfaceName: 'ppunzupkcut1jda4f95czgfwbr1k67klyjxmpuhn81yzkeh71btk3gw7os5eii86igh5s9nmykw5kx4a28f391j6u4g1j1v9ye9mbpaws9ohzw7vcjoz3dltnau47wi5k8orgeorn8j8ebihauwkrdhjn01lqf6m',
                        flowInterfaceNamespace: 'h65zn4i7gg8dqot2im4lh3d1wxc9gdh2pbu72i4e4vlt59r2tghu0oifortvzlfovfs25aa5yzfjptcgz0gptg3v50jv1l9cgao48to4wacu04zhdqw90veer72bf64cx4zqm57ddnuj4hjbj7z4vny56cum1xfh',
                        version: 'g5iw6cbh5ku8scalea21',
                        adapterType: '5b8skv50iwyi8xta1ox0bovp6gylg2fijwyj3m3wgsetosozh6ck1qhchh7w',
                        direction: 'SENDER',
                        transportProtocol: '9xtjb20d3vmqrut3hmsijoff0sxywh6fx5jdko1g3ku1txi4mrlb0ou6coc6',
                        messageProtocol: '38ykzgaihtr685kzl2mwq0qd2b2m71n1cvth2ng1y8w2pblhkxrmuy3o5qvw',
                        adapterEngineName: 'z9lefq6z3i82y7q4f48oo50cuqn61n2bogdl0wafjvqvtalnojh1xscyt198nkiv0t7t50zlvvlzv40ju4sb17oikzpv4si0ztdhziw3tsi5xo5jalu6ugo3gt5b34hyq7xpqgw4rdnebzy3ya76oxgn8f1bw8w5',
                        url: '7od53xypyw3rqqz9qajpwb0jfkyqrja118cs01bbwwh8o9sd7zfzyvcfpbwf2zp29c51vpu2tz2b3uq6flgnp9rmw101ym11mcv5rf3wdkv2tj9mzkprbfnjf7kwz2vaspwp73mpu5rip5l9by5xz6385du4ti4e4i09wvirxf8awl06kw625jmjmao60ssr91qib148qcolc8gcvd6iwb2w776tdddablqguhr2c2cimdryjfu0j6cd4in6985mbsijn75yt178gfwq8pkvl9fsbxwz4g02yd7f8eaeq855c019nszwfmk60e0u82fp',
                        username: 'g5zh75hceu1nb2f0sy5swqdr8mvnsf70tmynp9cffdf0kbbqeziiacbqcb3p',
                        remoteHost: 'ezr9wzq9u7h12encdbl1qr0odq63tpqk503n7kw8nwno2cx3gumugl3hee4apirn4kdwl752zerm621lpey0z6zk6wx9ipejqmqom6vvauqb9xwxhrdt0mwx3jre660oin2zxnqp1ila4iowpe1mpv22iobdcs91',
                        remotePort: 4301221064,
                        directory: 'ppli7s5zaxkh1c0yu2vft6xvvyayrkirrtk996fym5k46lobbg5n3egglqjoggn29c1v4rhdkh2kagab4j2y9gxm5av0jll1xanx9an97xpsn6taz04eokzwa8n7v0r58s08h02shu5sclln76o1wyb7r2pyv72tx7bdp06q7hluugv6wtt00j53rhqnu9n1mo57u8g9k08h0w7fgp9ehn29lkki014xfpur44o0gltk8q2g8e0he6vuftzxnz5b300pxy6dqd5hir2erg3ozbdsdn52tyizd0cxal0nt90uzb04mam24ktfccip8e1f6a14nxyu06xrigunu5t3ovdgfi7enmd96eu9ml1demy3a6imsx9r5h7girvkkcieugn9tyhpf1md1zpdwhvqlte8iq42p3760ygsm22rmkxow4u73ypxowpjzlqy4uuvgscb47iq9gh0j58psrw3wp768nbt95z5qdpox3hhav8bwnhkqe548l81656cnbqap4zlvr9twhgzi7avbg9ji6lq7i0ltqtpjr20uouclpnevsfr51s0z5y5qkfudk74y7cs2lea31rtuxdrd6y5jezqpihvf05lwwj544dnsmtlwl94xbbjbt8oq9xfr1e9x61klt40jtle4km0moiviwwm2tmu6mtz270spajt1zeka23c1h3t9vs3jjgu9l4mzhaf8owif6sdaa6i3tmqor6mdxwgaxg8jft927hj0pomvqudwk2cu5zdt3qo3x6yjxglrm0qaa87z8exok88oblraqyoh15k8cerp8h2ud4na2l98qmfptxb6vmvjto8dqn9sbq24fooq2aas6en60zqjned8x89di3cdfr935j9ufzs1fwbga1o5gob3m6ivqppojoyk2o75evjn8gyz00f6zmbjqdnkfpli3lsimlifmel3nez676fvb7h6lru9zynm14u7abez58pmt2ceqzrswoqn00qral5t7gnc1wyou8uo72xwx2642vledjj',
                        fileSchema: 'b28qo0rdmvl8203veflru0qdrzxiycl8lf62piosr3dtj95345kat42eanf2lfh7027jcyiqwaux7nx6g11u16nx2gz7p60sr0oaucerwd2uowilbnuxe1k32n1144q9uhitz1ywk7c5wshycczkrf1cohlh9afbkib24sygnb1h2k8enx5ecaeqr9cmy8kelyi1lf5cf5kiav0noy009pa032irdsg70tovj80z94g8rqds9rvtno8z9c9cg61vsuefl3kvhbbjt3d13q2ivluljy304qbzlwulcjnqvymuqtzhroddzbsyrdztpwgjd0qs2j66ivrdmu9438vo13f0tfhz90ts9s7d5aiytfd5kclfoc9pl7cpdto3bngs016p0uhw9412ket2fm9gszotfglq1aulvsfsoe5vufdwe0jvgo1hk2czdu1ohg6huyqx0337napgcoomreakx4rxv1gzazmdo1xjjnnmsqdz560sahlh7b2795oj3ief6dc23mjf3vr94m66u1s0p5weaks3u3d68oljfpxr38vwdzj783ry87n5c55zvz1ya1fg1escy1fnur326ono4q2ap6l8s98kxke58vvkxtmopuhyt7dy0ey1pfufpq3f573q8e3noyr3mz3p5uihl8cqmvmk5sm7ik0pit13uiyojsbc351vp032wzer9uchbpya4j8tcxjffmnlink8l7g91mvel613gcfuxh0fn5ij8ukx6wwd90b7olk9roig0e5f6k4wvr32t1hzvmfe1hwkt86kmcahyu2g78t21pncpmi5zigafo9mnth0x05b2o24uqlvpkgkbniqfov3jy60shysk5olri5zkw28stvenbdexafnrvc2q4p7kjjyrzbuq5afljrrn8y0lgk90qdcx6x586b6t9m516f70us0a18t71sjqng0ho7mdi1ih4izq3j239kg0a6rzxr2icg134yw75weplrzpzyswtnjifdpaagqzwqjn4njtbxx',
                        proxyHost: 'yyeoxi179isx9blkfleqhk1x5r2j1zsqkggq1ma2o5n5znj1hzq3cb0c4c4h',
                        proxyPort: 8085781382,
                        destination: 'vp1nlv96ev0nzggxxl33xqn184c4smbfqw0cv86rq6y8fnxlji2jbidu6m41tqmpyavixkusf13j0wkz071xy6ea5t00rz923k6qun1pkknspj0fnhfmjn4ye9qcy0bwk1przcgi4pq0pxkjwwnpxteh6fhttnrs',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: '13jg79ird525tfzezrba4swu78fx8yvu107bkhk2vpcbrvd1sgsx1u88iopoj1gzcuiwe706a3ra4qwhlhls8dnsu3jwi4gkbf92z2u629wwfaysn9140ak995yl21z1bqt734j8w1xvos9jjfatffruh59p978q',
                        responsibleUserAccountName: '69kv8cexvjpjvjywrkza',
                        lastChangeUserAccount: 'ie6x9z8ptf2s2u6p4n30',
                        lastChangedAt: '2020-07-29 04:57:43',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('a3e2baac-0094-429e-be55-676876505a68');
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
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                    id: 'a3e2baac-0094-429e-be55-676876505a68'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('a3e2baac-0094-429e-be55-676876505a68');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});