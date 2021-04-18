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
                grantType: 'PASSWORD',
                name: 'ot4fb4ku24a4ndy8f8elrjojsxabpce18svbvz0khvrqxdmed392cyt1mcaepnc2nc1ijlu089fdrjo3y25hlyo22yqaln2sanc35guya639wbmxfvon624bab8fwn4hlkt06kio5aqwmpprgrl0r8i0e9qp5v7fzfpddit0k77m7e2j3em5vnivpk7yb6ss3sqevc3pk793rel9532t5hzc04ig12s1pvsq4w767h1heu0rbtzlfjwuargy34c',
                secret: 'hdkhlhzkf9jd56py4fmxu1tvs13omndnivh2410b048eplsovs5qtbifkg13qoqlmpjz9uw7gncc4xdizw2n1xrkis',
                authUrl: '7fiq44zp9uyujnrx9llgrmwl69jwsp1cq70s3qxxhoguqip6r81jp7hgp0nvtdd2mwuq06w5ele2ruaz3bsozrq73faq154ht1flksdmrq7253qj4y4ybfd1rsc7qpn1qgxcxhqijmr83bvs83lbrmkb8vmgi0kf13gn5ilinkuvsnwq7w97y4tc4l1pnzw480jxxz0dwmklw35ioo1kqgy6gcv0vr8e2xyytslnb0t8acrlypmzzy2i4qqq1makwgyx5cif5kppz3ppqxx4ka7zki56m1lmhz2rxjpmapa6zj1bjixl69cyiodx2y3if2s80cx4xnf9g5x3fweg59hjbjypy20lut83yypl01oopxpoxhsw8be9cmdj5li6wsyqioeievhj712zftm3brnzowarb5fa33u1gk4f2udffptup9qo2jsqbr0xhm7u42yggswgqd362glyzlo0k11j58z386fv2lncqxdcf86rxf400oe3s58f10ctg3o716negyn8clmr2773k4z5ptxwch4wbzolpy12fohem4x4l14zp8cuoofcbsepzmgdlnlqwy05y8lostabnbvp5dwb1ybohnsmj6uma3y1lbo4s1n67579eghthkp040iytlagdwgbx527zka8obrhr5k2wf6g29tauzzo8ba1hnvh9bl35zak3ks034y0apzknebhe2agfwgxewh3anh2lh9q33adegrvb4cbq18sdxrbvk2qjv0xnjdy2ctr3a7wjr9w0fb3mtr11pvnicd9pc17ncczws0n4r4la59l0wz1pqggvgqnqou87lskjfuzupvrkd3bbke1vy8v5apbqjgh87vcu7vuifwz3bt0w4hoepsg72pe388u4zyldpxz6pvywdpwri3uy0ddu1r1dphbiglnsnwoqsn88ks12uz0xzyu9mjr1rah75uhv8nu9g3c5riuqax19bgdwc4vlshxc0sbhlwno2s052u2fzxfzfhjk89bvurh1bv8cpyfo2r0ewvixowqtdqdak89awcgkiq0iaachuqiq0fta10nchsjhdkk1vlssvvdbp6wntyfxo2sspsam1gg1qlqan72koami07285xifu146kqzpjiony93otcnbfstx85iotf0wuidhe2iv5fqx2tkwgjfh5tmskezj92nk0z5qmhvgd46nht8uxpf97wux0d6a8ekhc4bronrbtrnz1ag542vldxd01ieenx0aa4g07jztnrv1gc6egdfb4viss4edl49ehswx2axfwzpd7xk4wrp6ji75ukdymi8jo4x6hq7x4ercrc9uvbat6qwtdoybkaxemfqcbq07zc3iq3wljo5lvcxq7snk7lsfjlxypil3qf1vfztxuax4ubh0knc8kv29n1tnacmq11nkgjcnmxn7kv39ratd2yar2s2d92tf6ogyshap1ztpri7kvgsdlb6m3j1zcq0hr9fuyb4glsv87zv2ze8udmkexs31y5bmtj2cj8nbuvxb9rzij77sdgwildboow3aobakso2l0blc5qeqi50vmy5zzfh3ltln2sh8l27v1en7oau447ku1gi1osslkqz8po5h8n1t31193cg7mrwixxgekzb9mkif2x1cvq28uo9ofzbtqj4851f57tujwouw7yovdybk2hzk19uqzkzhpwxsgefp5kbkxunoacp3chph7tpvftgwnzc7dlhsybm12w9jzyfff7mlgbohdkr9w5a1hli9ohlwieye3ym1k0vwtskclzw9cce7x4dh91lbt3glxq5tgo5wsohd1sz5w0zj1bm7tuepplmdkqlmt873c3kjx9u7alyaytj50i1jxk0cw8gl21hwvltu22wzksj5c7d5vz854jbrfopc72p5ak4g4t7d3kfrw40srkcu32f2k6knpqler0190xn7rfukobpybrcqhvws6yqidz7kulp7qonggtemswagzdtfgcyq7raj64wo7iqd23hto1168cic8lvc5stimw0k9w0jegu474s',
                redirect: 'kh5cb1a8jle3vinmlcs6vtei37xq2kn40chtm60tni98xe7z65ooyz0vw8t0njs49i9nlop6ezpgqh3roe7u5y5y17weus2hdr5p4oq809q0up9pbwmdeh1j5rme2aef1lsogal6r91ge14g3fbt2zdr48t7idemavnta2w5z6119q8p1e65c2gqg5mbeskk0iq13d9yydazthpa6zvnpgs3lboaqaacgygw9cmj00osh0cht6z0djtvo6lbz80io6bc0idb48ufl7gobqqd126lyqowsel1i98j9kwvojlswa8f7hzpgqri2tpe7gqfk8wliish5mxjdkaycluvbvlo3nwjrtzn8exbj58u9d2nzrgbgtwv3xw3ok6g033eiflm69mrrb2nhkgbw6bbf5f74v3jflt7fclpyf41s034pvb7sii6arwrlwj1f60jhpn8we2swck4fpqfvwqgv2ezsaqezawns7scv4i24clu9dgf5maeuxliekjw5dwem7ovb1wr5sdz4pugnzg7c746k1kfnfnextwayt9d5afogirjcgi13212es2kwhdtjma1t46p6916rjvz9agy1d0r4ho5uwx9qhc6qcxvvkgofrxo7kcwhns0jhmfx1o9w8relre6ekw785kok634aexj9zqufo5wafsx7ns5zbxrjpb9p9lnb8d2a381jii022zpzih6luuopauonqi1e1ocptloqj7ubksj64tftryj3lj2rtiy5ff4i9me5sn2vxkybkaj0axqlv560eh2l8rn0zi1eoruck45k3tyh9k1a4knt1soccje8s1gjgwrtl4jf01e9sd6i53tityc9hskwrjr207ifdqfusnoog3stpx10cwmqxpc5n1mmamyxhp8n2t9oog669ri8liodl54ufgwncamhyzqvry9xzc8wjasjn9s17pap500165kbddcm0znx258sxrpjthx8ddzhdl8llrbcj5ez3c2j07vq14cwqrujjrouanzunbu7p443nmisiyybjyc6e46y15cuuat1kn6cigkarss2ivs2yjs3q6t18iy5tyegqar0p9ltm48kzkwpik95crxn8wt1pnzbsmr500l69aq9aypfar9y3j9j785zmscqx7qm13kzyn219yxfkz9jhszko39wj41567vp1bygo51bpxzujyh38zp02iz854t1f7pqh3d6uoyadf8pbbjyzzf8rvj0n5v00c9v5s8ncflr8p3x4pidoh828xg07w9h586nh8s90mgo3ihdk6o3djs7f5xfkkzxibppjpm57yweww4iipyyja2a1107r6diibfjjkh7049t026wqfdy0f52qj06rheq93y6o4t15kko7hmbkkycs7uuu0tuf38nni2kw49pdse6paux5hirnpfyi23n9mlhvakgl38krwukexqcy71msryn5ng2or30kkcmf4uiahrvxlz1xv20vna5b2m64j5q9r64e4n0v52govu060ggb8qtsd67ee9gyz7i3t7twwsrn4l0rrgj5noccvyokxdfkahjej9vwg4ywl6z3hvom8swxvp8rflj6i55qbi6qhroibnl6go4gps01yclnwz760cc5vheyad1fqt28ilpcuyjghyr6hn1cw6bps0ax05cjx12h9gz8tvw299k5vhzvlcestm757jdzjs3oemut5hr9vwslwg5x1dnqe5ay8ut1grtmk5n86ndsrcb064xpt6ib285zguxuuy5f0oaioz11877ov6bg2yx3u77fpussp2gi7yb3eyzpb2mwmy22qg72tpgzw724d9yq1w2um4cavws6tjjihe28a4qbue4xyp2vkgnso034gk01ccyqrooa4ra3lo6iyjfstvphqcxpwdtwnnc3a22lm5m3uxn4h01ofqv0ul4wgt5c9aiodb7dvs3fo45778abfz8ac9my611elj406w97lwdfmlvvaf45yce8r1yjvi7gbfikes6e1w7zn42kcz6xp92pm9eclppzkldtlm',
                expiredAccessToken: 6639862019,
                expiredRefreshToken: 7552449069,
                isActive: false,
                isMaster: true,
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
                
                grantType: 'CLIENT_CREDENTIALS',
                name: 'hvo338yb66o6n6vce052h78b2pqdn9zc1tw3a0ms7620fxxwlissilemabhtfr9qz1gkurxnenidy8v8gmb8t2ryf3t8vmtqx2vq03snarpvf2tjwlfrfqfetwo5x2wj8agqdxsvhuildug2chiiomrhs1daqqczld60n82cwb40dvvyd0us1yabefcw3vwjgoxpif0dlnzf1yn5l9nbwuplgg3xj5k8rx16pgbbjopjkb6ymjacvc1vwh4i6xu',
                secret: 'if0paqavbtvib53j6qemhwl5fhc94vh5ggda6uhpmavfqpvxzelceanadmcxdeu4s6dpc828xivg49s0ypb73uxy9j',
                authUrl: 'q499bis5l3yemw7gemab8y8sosmsvpa5b9ngmjk4gf9e0sojzl9wt34nxt6xkv2rn20bfdtn2a6jbx9ziq3yc6a7j4e63esq4draf14l37gxz79e62l87pqrncntfxtqnctuq3gf3s7ycw727atwgrp469u6s770x0y0242l0q66ckz1r7hf3f1zons1n663494zti6mcgluu59v02djbb04xml2hmtm2su4aew6h73pjfya8eapz5sbp7smq3ssehufkxw5y9hbsbaei24d0j6lfhkupxwc4sk6lrtuy2wap7gid8rxnr589o4f8b8grpg887owzcefmvstxb7wn86hmit6bj0vgoclgan1irskbq1i6ky8ru2t2trmvshji0zv8prb0d99w78mrlfvf86igk4h17ghye7qter784mp4je4ijx5js0b8q062fozvmfgl32au3388he1jh90orgyansjblvu5dfemx57pk2t27ik4hv2w67ohl7blfm0epmeim9kxd9hh25hkgoika28jed226byrtwuiu4h2k8hpxns0nvqech4oyl2fh162say6pdqg9xmc3ot6rodv7f00a953qqolcz5hvuinp938s590b7roxdkpupruqtqqjhmly9x7j9gbun3zemsfiz5u1r0bpyl557flha7trpyohj2bmueg0sw3y7u0grma0iotzjefsxiaaw0lul2olr362fdld9yaa6i1k4hmmhj1bld7o32joyzh5jgfxb5di8qtvcu9enue06i6xw2td7q3omps2xky8zd6ki4bfq4tixjgujawa6yflyoxis5b1gi96o9227bgp0r1kle7982j2kucxw0ggscqajw083bmg0b5g2m5f8eesdhw7wsup1jpeoj8vwylfrf66qiab7c0271lu6bxccfwtzblh8br9j6zbr2nli4sa5skzbvzy55nmyurbexmyw4y3mz524eqba5fk84p243el6zq42slj1545mn7p79egigzozp3umeb0fuoszytzgmqgd4wugt6znpkeojeucz7mnjwbdxizi8lbpicoyc3nsqz8pw1kl2304o3eplaw0sol1kajas2zx7th4ujyvfr88gczztlja9qwmalfmehows4izh5fnn3uvnwfmfwg9kk64a0gglcchxe7h21ywnezdiyo7quiums4dy2qpuxn4njyjgev06c7ebjfn2m23lufgqzlgjp14v4nk3x01uo13c2erxfso0tkj5iihupbetl7hvqq9tu8p4gg8knn6oitrdq2pez6r32d29ioagx8sps0jjmruxro6hiwyt1u3s9s3jhlt23trltdsawu4o8nbh8gx1t5qlud29ypo9z1oa6pwldj9ks1wjrl9x4h4g8dfs2olxl8v1ouyoelb9az9lz182wmgyqqlao17y1xx6slqt3by124nlvge9g3l8cvyw2cna9ksfpvkbtafo7n7d9jrz57l8aqnhh9mgfb19fxecwvxxf3gsunaasta37yybipudg3p4ybpspp4akzk47ucjif87o3ykryfq7fh4s9r0zn86q3qjta2bldcecd63d22q4x5odl942jo0kfph052wdpmkt4e6mj90lcpk8i7dqy2ci41q1ie4rafatyn1fdmcnj6dx2kdie3xlevt3qzmqpjva4cebocjuaahapm7mfpz66n5cxpen1dri2coz5cs9425q5wvymf8ch9udj4q4xfggdgk06dk1ab1bnnexf0eqoq1edvrlt8lfex80y4coks35mbn7jfs9yj36f87dwq8gfndtaf7z918v8vv5h7a9elvmjb6juubz23ka2i62iusa1pdud2h0w8p24x3lmamm42dbaj96lmyox871cm0e271ybivx6aeff8dl1ha2mqk1zo2m3b4d4rn5qagmnwg4rlpthzo20nhtmlhpmh7ozvsytorix6b66xnuowfyrbk2oq5vq7l7iuf6usdsi6cdfpiecn0snrk0v30yxkcu9lga0nxiccr8rkc',
                redirect: '21eouvabv3zidx0h8chmdarrhbivwqxfxc89trsefcvalgju3x23f74ci9rvul5owcbl7a0nkl5yorah208kt9022pf778anlhz63e6msxqlu0epd737hbbvgi4s6tfq8kvauijkgvsq48umwz3owdkszrl0sg11iv5z71hsgr5k9dmvq6ro81df45qhog1l55a1e8niqi8hcc04sw5r6jpmcsh0j4tt7xsp7y52v1e6yc9yggs82xtw7dw7qq86q41lk9ye0t5pzr4626d8wqrb7svun7r1plk9vo5pzsrmz0pgttlmy4nckj24jx468s8s05qu80zk3nn70uvj16rcff25pq21tt0v1xrqasy76koa9urjn3pv3dbwhkoq4cneb0vw4dlnq62omjnvk9u46n0o4v4sioo514qrb9l94jp4c0d4y7pguiflxgb8ldcpzqadb8bwjua6v2eov4d6v24w9bbf20714d35kshhdoynu4vgc7wnhfpjo6u8mc39hxpcxktfzssy4dh5vpzyth96ejtj2ou9ugc20fb0b3rphw1gei014gwtgaiogwrlmp3svllc9zore8snl7916a4ww8p8py1b9zyz3yemt6fxqqmvoemhnkz1ql1pfklybjrwjksjbbwp6l45vbq551jk9e487mv4wz54y2x0jwwva74h7c7f98ofueecyrkrtjsnptixxjpdh5ukjjggd8ox7a8qt2s4j8zz5y884o8zr7pzdhea9ut0xogbbq7ciopdj0xbrhmjrhgnek24t8nn732f10e1qc9o2uuamtqh3w2fxp17ay2y1u9t4f5i8jqs5yyfgjjebzntbvt8tdjjfxkh6629hjcevy3r8kz6di7w104aehqada07vub2t4z89ahuh6cjn0yrlcz9c1yftkege1qq7s68se07pehm7c0i6o7l0a7akiv732ljas7ilivy97hn3ht1t1sd65xnlnz880lx760i3scqnyq7r6ihpmzfwf9hteh4bbllvw98sbdm9i5cnmq5xyvw2gueolrqk6aoca7urmogof579u2r75i65l28crxyd7odi0r2civ8njsm81cyvi86lhr94ibjw4prt3eoz6c6xs1tt5ytunuk2guv7kggw570q21nrmursiv8nn06a1oxvr21mdcjrlt71yzgjp0r3gyxz9jqjuxg4xomzimahnl5n72dmuvledrjdinr75t3khwgxcuohbly2crrpavs4ha554ipiybs5k3t66cz98h0sz9o3vu33fg6syarmdlfoee9kdwyi9rm6n5gcddhszlr16ug4a9wlmghbra9sazoxgciu8ilrmmsi6pi27utxvdz7tbznvskpnuoif4kavegato8i4joo4z0l4h8lvyyi6pdt27us9gruxoxwyyjc5jv30f4endlu1hawovsrc1ei59vt21euaj4o195vkkge1mmnj014nrvcs9gfmdpdr8fzanzm6ubmucfd3u9ebojijfqxsgubzqryihc88f2pac7i1fdfvmfyckl6pmvsijirnvni2pzwzeas09cxys3qpaqypigsmsr6ndk7a12u0jchxvc0nfi7rgqoi930pi4eck4n1quc1rqf9gyubb7h0c6qtrkt45wqjtb8e7f6u6n28x4kvbs5s30sqxaabce4a1ycemic8940hwnlmoziwu7t0nukd8xjrxzh5g6xgiwwn1hln43lxur6izcm3rwbda43f36zuxf2c1rbai4b7euljgri4iesvam2cg3duinu0dhxaxodem7vq3on3pljcwj9cibgy7m2uertwyrg51334v4tvwou1tweqjp3oqa7fc1jsncpnhlzljb0efw2nom5ob6tjoy9mwe0ijtd8y9q2ou6cc0egi2yfcz4k5rkvv7ovt65ccfpmwkkhoyy02ewxfetirzxbwi1uznzvry0cbaj4b4whbnqq0hqdu4w1zyir8ptahvc8wnojnrlg3iwhfp8722jgzggqbr5o261e7oe0u4ixtz',
                expiredAccessToken: 7833931299,
                expiredRefreshToken: 6473324228,
                isActive: false,
                isMaster: false,
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
                id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c',
                grantType: null,
                name: 'mgtawsbd84hzy6sb7ebb7lm3d73z25zna1u4l0e8x31l7lsay0fmpx18fatyxj2i9on6u49q3eot19sp7msmb3loo99jxa53nyxjudpb4762hfqa60o6q59vjqp8sdi8wzqh5yvwy01maf0t19hj4bqlwc8ykxll6dzc2kzzkcw4f04ovw1wcsldshleah4mtjaatchwpy439767kpr0joj11vf5yc41u92pdyzw47u7l6iyvqg5lxlge996v93',
                secret: 'kk8idyumrb46346rpwelpepmvk3xs13fik0a82ea6efkfe0ftdy0ur7cb698ci8ulrbiz0am4xs3k2hqwa0zy2aiik',
                authUrl: '56dq9xsfzn5jexd156sqtm29ox3gr7mgxakuvnwy7smdp9b4b3bw645379bj152it0tawournmm3wtkk8i162985wegmvo6ujy7m0h1yaqmtfc7uaxn8iai5yldck3u55kx8v5ihnl746f3wctmh9epzn7p0c840e23b87b737xkj8zyykppmc5terhkii6ohahq4jq27h0t7gg42y2acq6fk9z9dzmrp5w7f4yhoxcgtf29yotkdgvp70ttie5ppumyigzz47zoteq5dy1z5am7ugzha3da1kebz10g04supnppezglve2s5m3xtskx9syognzyv459y26g6i6rs2u0xfg2l03oh23yvziyoa7m2h13exumgcsryw7fnrnrekixohukrxto3l0a1cqyqmsjzehfhgv98hkwz94vg64yyy6gp1ujgb5z2bwgy0ux5k1d6l00aapy06js603l99hmvzdc5viy4nfklewfegbp7unl9ng7xw809oiutryccgn6z4ead7stoglnjbodvdnnig07pi5w8hoymq96205yadnxses4unu03kaphwdxkeo6fl83n46u3quz2sr21p4hmbh9j6o8xaagvy8q8vlce5yup9tca4vji1vu9zzsm8cw0og55flct4vcu0xrjj39rma39dpgy243v5a0bhiu2d56h2h2rc99l7w1uowczb940y00jm4buul5kmqv6oslifiii2gw0ffmbu6fc4e3iipkrlg4qqnog5419c5p57uqjdyvc7p5sa4oekxxxeycwbh03702kwzx0s4d6z3pso6mqy3td72wbunuh7a8e9qlaue9tpa00yb9l2tqyeel2b7vxbml7q8nr7encdolf5kqvlh3h42copcvpkqallnqy1y7tgz5qwoq6ckpilggqie1br6cpylabi064s1rky2gb08ly61mav3hru72hqrj84zoybwegkwfndflc6jwak621zo2mnf8ws430oysp0lyisfpl2ei90hd72bsb5cvz16eiynfmfwxdnczu2skwjt62to6tbk1p3t422jfzdrtfld3tp97fofx9ebbd2804qf1fnbh161ieri9g2itaqnw590qk43zfertkuhw2zsxl0m199xc5vmd9cp5yecjvmrghcg0prgrbjk04wit33fgax0w5bf9k9tkndag7si1k36ba798j8ifvq3ozw5qxgon9dpb2s4968tnv81ilxzrddldnj0luq4ink69cw03tflqjzklk2pzqoaictnmlbirma9dvu7yxajtqzo88mlntock98ud1pcb483xq4irzubbzr096q8s1w9wvsvy400mlg88aamz0jx1zgz8ursxs7sbgnd4c1ny5h3n9oqngi5oqjmhb942kc1kpqbdoz3882up9q96kgyzx61fqniva7je1ak6xlbnzd5x7gpdumh2zrqsqfbbvr527a3kzovjp2n7v4qe6k5mk7h17n194osw38q20h9lfdend662qqwiapm51q7fdjjwpaej7ymua0cgwxn57idc5afjisnfx200ogxc9si314886rkm26q0hu0pgyujcm38jqx0iroawnyymg42lawsbo5r0toaw76gjc2elnwv3fbotzyrn5yr6zcgovw0mf1y0f032z3ylnymr5ei1caejzegje5gi4row8mvdcidpndw5xffffef3dtmkln1sgyv1o16xf9u04ab8v0wbu0ylzmcxokra1qfenfnjmlrqv1y6btqhsoll873ael1te8e82p4lu0bcxdls7xs6x2gj3gx6o6imsglp4yn6g9w1jpa3iexc5zh8eo4vaja308tveru4x7ae3ljrviopd1x05i1m0ssh0w8kgr98u17pnojzx48sf5rx8z5gkgvrcie1x0zx0059rff05fej65ufl4johcl51uts9eelkne4ws2q8tywk9ivkjngjitjz38ktqm8x36aajttvnsnys67pjde5jcd9jlr17pn2fpvki5mc2849b5n58h6x9pvbow',
                redirect: 'k2670cx4wm4n5f1kieiaxqnmi959e5swy3r7riqnptib3wowwjsml3oil2aionfp2diqhn3c9e4lmvgncew5j8ewmw4mjqsseibp28cjad6xymm0xtf0cnd4elvyv55xj13ii2m10tl9e071vkgxk3vbj6wbob86b113nddhwz38y67lxe2lxeguombrv13k0xwimdvp6a0giy8zz30b4jgl0ip54dz8f42uzs3o9qywqmvpl4d3v0kgsf33de0vjz9fsp25ojfjcvn02qj3fezvs79c23glv0l8v362ngh2mm7z7xg7u5fd0tne5m5zmy6jyc5wuh3nfmt133qqgk3ojomd3wsab7p69kczaewlxwzqnty4s59junftn1keb10ie3i0wyhg7pi0ffjdne96cveu4ualmrg2yznmmkhikvhzpqy2v78ptwj68zpfi8q4ccrcs2qckynbf0oh58jbgwvsye5zkq9ykn6evlcbbfr0h711ty0dkci2isx3cxqmuqxh6b1q686u71btjfmcqj8ch7knl4b5kuaqzruvghp7652gh4o2l74zuz1ff4tsdtv8fb0hrs0uc4y6uog2v2jm04q3tsc34qssiye356zii7hckcvt2v385soec1f6h52ufdkh3mf8dl6crte2gs29jrxnrbtwdlv2v8bvh3ng8sqb9qncwskrgq84s4s2shh4hvgvqcw58gzw22qbsa50g5tanamr2nwt7lad2f6r9u2pq0lrckw0ipqasbtgwxkngcvimghcm4tjaiifk8u1qshjx307uewhp27ran9oz5jl5pgwg4cf5srqk8ct5gloyxqv5r9xi8bq8s387c9du5twjoedue5dgivjlrorylutpecvhh6mobpdkwo79g90hted09g621chpcb985qj29355ku7q2rdymzvz5qd0nuqpzx05ccd9h66kp9nzhmgonn1bf3uuejkl6c2eihl2q6zgkhk569slm90t7whzuuf027g1ib5tx46ice82wzxtptyefowiycn399y8mx6metp2v0qv7iurfj7mvqtw37mo977rp7q7so5w0mzsg74hl1vzu3o8y49d2qw1kn6onf95yni335h691f9sekigiqwosvy6y1nlpewdqwf3rni27erl4x6kj8liqe0rlzxg7isppfv3ykcie6jnqntpqldguys7toesoqqfipqdp2bgatbye3szqu96t8flwq201wrmaynzdem2noy5uupmro176wv6rsvem56exeefsjid02nvlf0d84zmru8fzfawryldrrqe2y1o6wlpd8wi1n2z9vjl4zl0obhnn7uwim82nhuxahuzvfjid5nmkkqeja3d3mzcu1rqmk6y4vk9t8sx6jtor38fpez6mfxcnkz4namkyklgd6v1ak55kv3xokjqls8d3b7nr322etrysah3eniimb101y68h91nfntl2vr96u8tzdpyjgavyu3p7skc11ylys02bndzlvgwmhqqabz150bdfmsvgj6k2o5y7z5pyuvdj2frsz5dpto1mv01nhe7vu8gc100tf2drkp0wo9g9kcadbgco470xfmnyijlg28p0hims35zbtsrjogoqzgp8s90in40oiv6l9wd2bd9gqziakhf5kugt1znkf2ktd8apligftueus3hs6wrzjzeos7d4112tjpfyem01z5yfowurnvxmu8c937ors88wy944gyeit57tlst8uo71941y7rdmmkx5409yz19zg9m5flw5015d4j2yo72kn0dnb0q9u8fsw59jwx95wd53ei6865s99v01rbcmpnel60bo9ie55fup5wasma72x3910jrpzo8ye5mqgmi0oafrma0x3v4dg6svx5m3kqfl99d52dz9yjl78o98moa80bgiwgq5zx1n1vznu7bbjgzpeu1qgmgtuhkdjacuw6qp6yxqmq4yuu5dimgzx2dhi9xxjj2bmfdy3n78nazit7zqvnvxp6el85ausho2bpdinw8kpy6hf',
                expiredAccessToken: 4539294142,
                expiredRefreshToken: 3804843570,
                isActive: true,
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
                id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c',
                
                name: 'hiiciywnibsv3tf9yadqgmptpszdsz8iy2965qysp2hqt1tvleu2sqko7k50w9ge4v5jij4ul4ojwb93qki9yscy9a7f4daqct02u67d8o14m9pv7da9klpqtover0gvheu24lipg7afiv0uqqqqfebv92jnaegk50tl0hzs6ps57k0gtd0m2xyfd3xnf3d7hx3bqtgo3c4m6tjwpxwpb2d7xebsw0ckzbchw472w0jbxnmtwocgjwahbalfx10',
                secret: 'lvaqqw8g7mx0zpf8ii5xw9gy8q46kqx2hn07zww5ij8yc73nv9re18mkth3ssow7vhyu2115hjy0a6rrrskla5cu6y',
                authUrl: 'hmw3nnjobchmlvfvjs6kq63mmj8x6pbav70exeb9f2bsim12j9llnui08ygzsdgj06p1utj0xcq4yincrd69vr9g8qnv69dp4m47s2szyvejpxykfs9v0dfmeskjj01gcz9zzep1fldlmdkvzov3rdkn3c9kf911vq4pbzaq4l2se3i9chcsiqaff8lf53hc78l0embow0lijo66r2hsu5ju5nhccxirff3s8euthlpaoeq13uskynayr6xn21lmhgl9ziphhspyuzijw0rrhf2nivb502rs7vn4n10pfm9acu168bk7valb6owblojp9rv7vxf39a2jfyhndg5kxl0jmj9q4vynh3kksrvxiunon6b11ozz7hz06xs6kl0swszde8gzzrcb9hv3rw0tmrhm8x8djycypmtp62ufrtvyjmyerj56j6x2do5u7j7rqubidt6auqy017hecrineib61ob5ajwzf7g8npj4a745vjgp4eacslrlbx8nmb29gvyac4n08v1agmofrkiqjf6ie3dz8qni0k9tjie3alpc9p9apsosg3119by5ahqi9sghi3jtf1to084bjyrop86epjckjbcqkffup7gffww79tkjrl5bcosace6t1l14lhnmwfab9qs4b2w73uzq63wf8mjbuq0uvucxx5za6rlhqoq08zrtt6osw9mbc0m3qh3x7z893rp54d6tol0mj3syw65zrp8ro2whtu6m15t5kgocrb0a36orhgjkfdj2is08dv4jmcheiycvndhpe8uxqvo2cfhk9pc529nac9zrwev7fb2ukk62ko8hrqtcy7vhmdl5nuzy07zag4ihgbk2d77tt5bubyze7mpq12v1udi972m06eoqoaro46dnlonzcuqv26o573tnlu6y5h0ix2w4iez7ix5rqp1xq4xwkqu1xfr7nj07pbqvngzd821eca432u8o2nen8ugpw15m4vvapl75u9nsf2q9n1v3jmt018q7y7tupp6ysngem9ebgzyu7zjtwxko4x49gp1lm7xzsfors1xk0aizfp10126vwad3n41sgnphjv78gy7kmn3heqrun4e9ylmvnqb044fm105ieeu80i660u4n934m1lhob0dm53tz0dtp90la9zaoqll67on3xwav2qj2w49uabl36zql6yxmuyk07q1gcg2mg1wj6gfdzq1tt02e940lqcdfwra32c3dh0uo2ocgv2fiohuq80pr6uzz2zv3w4enz5r7tt7vkht96tpyxajlapdcenafdt673q59flc2icfwla71gyhfe9ag9c4kxblx5y6u6er8wxixy6edd1i1njo0wnny9nqmwv6hnau4c0a6aqenfe1ca6lehsot5ut3pw7e4mm94v664f6ot3r42scd8dq17q81vire2mmoh29ug83akop2y9nl2airek33caw9zlinzogjdk08z4f34812rj83in69pxbgjstwrf5kwduk19teno5q10w9rsvdey4i1zybkod18vupg15wzpnhf0ib9d5fdh991qoys63mmiuxbjh3nexug8xdogdi6ouaex5ulay829pm6bihnuaiyzh0divmlp5l02sc6vkriqhir2s046q44ex4rstedm9o7vqhvo16v7a0tbqxacwvn3suo5o1xtv5yq27yyb77xpt3mkqkvxptt5do9iev831le5ys9vk7vkr0m55tv999pin9zpionz7fbgvi9h6qwrxmqlz1azznj6fbct4ouwumx4kblk2l2ml2atafqryarhj8cgi5rjpqqcxlv4dg2m3llligwyeufjcl2aig8n6jvcthbhzq5d6b63api3sl64jg1gu9sdppm8gtsqxdzkmutx3eydav8l3g5o75kzy62xcmmlwsgykjaix7rkx8t0eoreybld4eo1387mbr4mgtcpetzzy44s8lscs5nme3swpgovskmohwwme7jyu8eg7bskjn2tqa0uwukclhub6c05zbu9rtaf7rxtzf3hz98ja3c3b',
                redirect: 'duvq7sjw34iq06v5gz6kjkigb3sva8vk8rlwgl97ah7d0jn60ugxifjrxf3puz3wph1fcyeqjk2zw2tjy8qg0ivn8bzitx5b9tbhhsxf4boaf40us5ks7jma9b3e2nkxpxwa8r2dpbqg8c76k8dwbn2en6yw8ca87jennxu4ekh9q7rfsj9f9oclyuyumjzisunwwjmnfewipqmxfhuwts2ixqj2dchy5e80kmco0q1lpy03b3cm0v29vc5tmy4zys7xgb4n6j5766ijsmsjrailvnozvqomfydtue2sgeo0aglw3981nb0slvgtva4w3q07dm6milpx114hnv1nhbd9ml71g9ben37d3dk9hcpz624l0cckttwnqq20u6zzbqbkltxigasmqx5d7cj6mzkewiioo5naz4lx9cskrcyy6rry844je81gsn2e17vvgtw2oz8wk0eej10w1fajq7evls9aos0yayzlonmbgrnqastehzlxcmboq7ai4yneetw1izk2mk5wqbh0kfyrd7ukzxoyp2pfi1l0hf94rxijk8mxyxj539rzzkefboozgtedh8x4dwqvxo9e3na25e197stqymp1u39s684wgjwlojsruziwidkqpc8qz6untzkmuvi1vv3en8nk326xptkh2sxeimyaba7eff0asiulpperbds9xnwlhen1bw4i8ud9i83offimnxq8fbn47sog26o2qd93s8xv3d7e5mjh4t2oo9q7dqi5swu7zblatdceqjs3ywg3ot80noc33zkugwgh83wl12p283fz9t70zr481d6lbo4g3cnl86icou1shkolnjlznnqf59l9ccuirwxe2jpkgfise4zdqdawqxkhhyxuym8d0hpfbph2zzul8vf1mpafatr9xludz26q1o7hscektci9d14o37bl4og7y9fqg9ovfhb8zhp1fty53lrd9uhotvv2cja4jelhqi560okef3fljjt8h9dxnm71h0qbm2k198vsvtxpmipk2pycq95p9tu6z40cssnpmhzzaophim562eo602p330hzjwkzcnqhg5ey8rhl5azim4vu44hqeh8qzig9l9c4acym6vwab9dps02a9z68owrtg4h07ado6czfd5b8ko1z4rhh75qfwrlm1q9a6tjmuo9s2d5594bfs02n3yux8e8hkmko9gpn729kmo47o644xy0fui78cne5dslnjvvu4jk7gzbbw4su2te1vom7zm2j1dhxfxyltq6r96e9luo199db7jsb0tnokrk7r62uu4g5prdn7xtj3zqs4rkebk88682c5s0deojl75e9b26w2unglj5bobpgwv803s425cp76twjyzl4ph1gu80z89lqc0tgp6q4q9jcwbur6qcosx1wwfn4avxnka118jnjui0nwp5td756y5firzr7d1267u1osmq9v3vudk2d9momfx0q3jn4hijf0bpb9jsifw4hpvqeljda2zkpy8i3e9oj66pqlp8qftwf5qtv0e4c6lju1f47dy61uoaxy9eptwmvzfn9kfvydptzf1zyi0rtoi8cu4c3lacbklo7j69a1yodly4k7fjy1usnqu5dj1dluwh77umgdtgu16ozgjnyjal7oxaux0jpr5fn633d796qemy7ktm57v41akoxm0nod7o6oj6i7kj2dhbfd7g8doc7uhlaudrsvmw136g4h8relhqdeactg9v1hq3djpkabvuboulpoj33xwddzeh5cipz6wywebdhbqws8ow7lskh474nhgs4gtwho79ai9wdh8i6z1rgejirf4yo9mfhp2bm12jn68jkp8vb8vh274dkuw5vmdhwwqbsz1btnxkz2js7tu60yv5j3i9jjacbx9lvhvhf72sj4dwqnqfufblgwcgnuiojilmv4tjvanu8q2lw9tmm7tyzl8zm7643xixol4vvq7calglri5u10zwmlgw3s5urvinffbyqoacl5r6u8jt5ck7iqn8sxs2xwhwmxqqvwl8w73fu',
                expiredAccessToken: 4775124698,
                expiredRefreshToken: 4209806501,
                isActive: false,
                isMaster: false,
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
                id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c',
                grantType: 'PASSWORD',
                name: null,
                secret: 'yvzpwx1meuaq6u2va76nln8jx2ulufh5ht29prou770np6st9dvmu1knskzktya3vfdfu4kfzrmb760rnchytcwqwt',
                authUrl: '5tmstshw9f4uxh1o7kqhydcb5l44vqq36glempcmv0gc77mgwcb5pag6n40hjg8c48i4icf2uljej0fpswsem7g0sc6or02jfqx4bzmv3rikg8scji0nriofz2hwc3m1u3si2tx4divup9zfr233mg0g353byunukpq8z1pci5nhvl3gdqya9em96px4540nynqhp9ix2bglgqjvrz4i7d0px3eovbqyxs17ng70379l8x7xtjy2h02aidm6o084mx8yjbcz9mj1qyj2v317qclhwjam5oa81d85yialv9zzsl07uofrov882aruujgrxs0n3oz40iq0dsu1ab4834jv1plukf7qfdkkela0wvfa731c09m9wf0ln3ceg1gexd3cw51lcspclc58nq58l3isakkszuccd2kaw9ef1vdb07hx2dvvgdqp766v0w208m0oz3e1ekfvdk51mcas4ua1ghojtdipdciphma4rmnoinfnlrrfbng0dxqnyaod4t6lp5vtiyswqvdib9mmretb2eru9oxfoolzuqc989sxvf1ysq1g134fujma4idqw1b2f09jekyxejoliyll254rfft8ag71nba0m17xeab0odb0rbiredlq2uzme359lju6o4vio4lwvs0bouaie7af548cfgpa5po2w7ht9rwiz3ctrvqitc9kpm2c2jtiaw92jw4egyrztzqf2b5xc421dn4t06j2ofjn4ar88ld7ur80o4t9cl7mar7lmgrm2aj82vvlvz001n2zshywgcbpuftrqffktlgnzq3wtol6m1p478lez0ywn1f5g6w2qtmeu8z3w6xhmjdmbye9nfft5p9h20zvfwayj20y5p8zb7wuhh6jfznbblok5ezkvjasbb5badjkh7ohrfh2zon0nqaj1sxlhkumsqo8w5e5amh6gsz9s78u9cygap9ueon7cmlyedoibs6acayt5s8f661acww5ku8nrze508un6fp4ckv0hdz85idedvh1fsaxvq3n7n2rs6if8mpbvqqxxdn0ojmu7byjtbnb0c0ifbs8piizx9ftfyeoagmzbou2mxir1bedcbv9ai89lfttgy155jwrecbgxn4c8tdadowbjv90d5aed7h3pibg1x30vkcyjso39brzj3rp961kqztb0ydv70m5a5uh9qorrnc2kwt0geb65l05q9legsqlch8itr2crog329hyq8w1d3migvf0ysyv9rf2gcu924e75jalcvzng14g4y84gh5zqpikjppfdyild7inwo4eikneau78x8ivp0rnq7c9qy938mtjh9nnol2nd1b3tmj6a2gs8x7mzch81pm5n7tdgj0hl8nzus5aoposv7c2i4myse0vk9tymqysc3vpdhr5ldx2sk2w27jjv42ybbuc8pk4pcyhii7o2pyjduloagqvnselegbacgy1xyurc35j1m07mvmcdne49nh7pxjv6tb5559f6p0fn62e724ans2vqgj0cldw2hxkai12czdtiiskf21h1kjyif0e11o4y3hlc6vs1hsyupfr2wiilx6t3ynq7kxmim1gmmh6n58batrnsubvd2nerwumd5rufsfxar0ckcyovq3avkf1tchaf1p2zonmxsukcvc6vcb681pzubqbohsih8zc1r42tp373lmkcm3iu08kn4wh9md85h7nv83kzj7k40yzr7bxwxh0vp9ohsfbcw6ncern1bmmteatbt29baa7bgae0j1w4eolzd2n8cty48ovtgp98sj3639kqz9emuikuayzjctghq2cbckhxb66hmrxwklvm7123uzk7hrv6cgiio3luuzu334vrnkofunn3evqcmk8ti40wb3v4stihrn2fr89qt2p8yc3ksask71s5sz0glkjwzvw18iz9tp9cjkhb6bi9f9mynmaktd4j1or8agqkdzhvvwxjawqlx7uzkm8fafr4nb42jlwebgm6px3u6nxayg4khtz4mg98z4iwzutej85t64q1s54trx9',
                redirect: 'c6c8xiaotlylako0ayyo9nd9qgogi6m02i7mve66y0jzx4suvsp6e9weyi1fv5l5rmpditjl4s62ue0y6qhctvg77tl7z9fekoolv9l7j12gvsce04bl4votl2s1ldsc4pnln1ac5ypsatcev58bza4b5nj0t6kdsqob0bme05v1njao6zt2xcxwxmz4ahjle1vfl8g5d3b27zcpu4llus175a4y3o2q384e6xva0wvg52oaagb8y5hvo9r3amclx2pfmamv53sw2yb3nakb3sfim6182lzdi2q79uwjzgsjxczmpn8c4pchnc2g3v0tdhbav4vqee34t3h9f7v50y3i1lwnsm59fnc6xfi47m449b5vwmyajxunu3hcqfdeg2e3huwthv2uzl5gg05c1crsl8kh3wwg6kavsd8c0e81m5kp8g42glhkhltckdibx0icgconnlsid54r5oty33yb0l8ouup1xdor5ih5ysrv4cj8gxh7p7jdw7amsoy48bnc3b67e937kfmrai28k14vp9ko6gxdphklwmb6dyignn9vr57524va0l6ihixyuewqz69c862sr502cojlp0t8ya1nxit085qw8ti7t0taigfgvp5de4qaz6845hyk40c0oy7jmrzmxq5hhz7vwxkh2no30pf1k93bz60zrskotv2iy5oojuiauivq3r3a38sszafc9zr1kky3uqqqcx3lsy5wa9661sx15agn1zbg7a7dt6im3zvxqbou7xpl0aeotoidbricb0ytmu4nnodeule9x62ro9m8het3gq9703pa8uryxyqo9yslfedsqhcfx7y2ch24ql0s1aub74uwhrxme085khki5ipnsi0elrvjbtsw27n9zg1uxu6bapqrywbjswizxx3jt25a19ajsx40ds3eadimbj1qrdd9k6ua5xuhivqynfutkwsxngd143js93hubotgl4mdqmxx1rst12v4lju18ftl0ull2l8n94z1xjdpizmzmt59o3cbo3em1t4xs65x94nyja6s43hmzfkjf4vjdw0tzwlrd6zq4dxb39prbxermw5i18wqeunnljy72iel1j6e2dy2oxof2dojdic3rvm33w5eqzl6zy9vc5ztr3dcuu4up9dhe8kxv2qt0i71bford34hvx0p3fxd5yvrnetyrewqgqpiivf2xw20xfa36cufhf5qmngwiw108fvgq6sc6n8rftplo4go046clfrevbh6rqss8385j4ycit67r8qqm0t7u6udwfsssao1c1d0bi1psex3cuvkl0mtem1pcdeu1u03sod0pb4e39zhfvbqpok0kv5vbggevrnp7ufiqteuvdhuenquavucjcaweo4lml9nzelhxrsl52a5rnu8pi43hhs6pg2v6inl3e09pfreogq5jfp0i21w98k9epsn7hgp2maekbsi3fiswpr7gbvflwynccyrcwxhxexntfpyxdvcziiv6aicrtpc238301jj6x0mmv37sjxey1ubeidslfoam74rucog5a7zph02obys53gvet35lbnyhywu393d5y2rnmwati1w0wx6wz8v718mbegb9af2bpm5r9ribk9e91ua1dm51pqxli1kaj4g63i4kv0rlrcm6pq2b2ne7ukqmqear8f7osupevdem3vabn1zqpkldd068ttzi4soo0nmcgki5x6gtepfe1g1kbnh8f8ogmaklf2xg714h21v8r6s16r2wii8ilkpqx71dznjo8xbv650c0iwnrgzfr9wad8uehw98ghl0f1n0ntnp0rx1a9l3d3wvcsnhxytl49zryz0acjbo6aqpz0ddsq27ghmzyif70it5q9gnvhmthqqro3sqfp8h6kxqm215vxkhnvmal0dz0l37nustqgdgcsfy5f389fpiptkz6qivwq3iggqovlouj4d4ezr9gf1vcaykn9hkr82m34z8r8i6nwvgm1wjzzfmnu6n3mft8mnnhn46xue9uq9bt5axkyhncz8ema97ohf',
                expiredAccessToken: 6094110050,
                expiredRefreshToken: 2671088765,
                isActive: false,
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
                id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c',
                grantType: 'PASSWORD',
                
                secret: 'tbhm7mlmfzlp2f6slm3rezltf1baxg9qztp83z4gmvzyukbvtw9x3d9ie7akigyfj630og96el6b5rfixu7x3f3h2o',
                authUrl: '0bca0j0kamw6h8i7koyopehy5dqaoggse6cc71o1a64a0utdtupcidv19nsoaoshr7zgr6ie9u3ad51if8ho3a7g6jkqserhzcdobyitpl85wzyjaw7x22kzyrjlv2n460tjcxeqwxkw1ud3smq6o44z0axiuv34z1aq984zqoni91jxz2v1o6r7eq9ebhxumd127szpckkp1v3rjhz45bqev26a3omydmpbrf3uwcdsl2v255r1xlcl0jlr824gdfu7zlzb37azlnlzn4mebs5sfvh3s19ahepfx1kfs7swbfeezkie0hnrp0aow10js35idjvuyt4zoaj5aj3e4lfyt4lxaq5m55bnifdhewnrgwendo7d8xgi9j7yqgfml3sh6ltwrd9j1qjq516cg6tn6ds7oa8kgeztkd3ee0ev01m74v3k6kkedqju0331y5jrbe4wn53zw1p1j8f8a5csyrx6krjcl0ecd1vce1shjq2lf0pf201r0xu59ekp2jdf3mm1eeaupjkqnxvq9h1uj547b2ohu1jpdzhu1j66w0s53uig3zbkevzjhyjjrh07x2afc4h4sfhrd73g1eejs8x9h8vvzyaxy07k7pm3b2d1y3kjp3g12wefx849knyqlbmb9k2c58hpkhoe85itfu5d4k3xqcy1r4l9ouddcfpdz8zjqirhuhmqg6cf81gx4niqyzjbz0y0dpma37ofr1oxz7x0qvlm3zf5v25of825n4gsybud6j6v46goaxohzg60anbiivqbf8ioppm4fns48p7kkda5v2ibic42cbhraegi53jhia8nkhledso65anovhy43do8whgubtpk11xf4xydeivf40pttom7mp2l6himx3ucq8ehef9pnnhtyvu5n3l61e5ifoc6pry477tydo68e6ombbm13auu5z0qh91up539dxwwacdy3z4xtenw36kglm9fv0e4nz7uwt3skkc7o7rdi6abkgpmfij6tbjrifpinyug7j68cqzo1rxns1t8pkw3x1vj793prt17cms8krgp2x1k7x0g1xcjy2psl3cix0rrg1h6ua3tb4iw68udneusbxyppwm0bhze6hn3ojiasbiugqntd9f2fpnlhssfamqsey81wwi06b4oj3wv1190f8vrxgupb57xwxyppknvxzwufxs6cclmo7o2w146bdmlsjkwupblnweem5b35pm9nq5q186xo5moglpt6510iutoarecuzqsob84pzzjilormn52gu897crtn2eq3m57qgo6sscsmg1uale3w0nampmqufpiyayz5x7hp3z90s4t6susoch4j41fh917zv378p79undc2i01eggvmf1ay1et2b9udrnn28lx1s53h6089hgzxvzckqawawz47tu92fz6tbui7n4mhcn0o7twzbrm0a9h3b8h0eq5jhx94zenc7pex0qha3decvyl892henlhoqm2bh8nu2vwk79un640tirrx7skdjuchabl6sbcbk2pt5yyf0xsju716yzrg6962pycucj6qxdi0n9kor34dt439jh8zvg1qz2g7qeqa20lfxtqd6pw9vf25xcthp8iz1ksuc91au3ovadv7hivllp4jkhx1r9cbivi1col8ow7tnxw7vgc8z05rey5ax9icszzd1062rnr32rsa53dxrtlz5pwnchq4jsrwy00gsozqom4nivlitfg5di8l9qbd9w8evngi9hqraxdpvl6fy33vweliq49fjeubk9vrdxl1mciat9d7yi8kcqi6q1wlysj18tcope60i4xzk0fjnnndg4ls3rkzek9vk9crk2c1wj49rw8fq1xpf5mln1mkn3bthidh817djxyuldlb5rkdmrpnnivaskuh1e94udkz46l1bi9xbl8fmhnfqxob3ncz34ekizq6ydvfk9xzilb4w8kgtt8b3cgn3r2m913fifid85dmx700oc0ah7vtdz8djp9agtct7oto01u7wervmvuxbarote3341yvptw',
                redirect: 'qucxeitvkckcnz7rkmjqhpu7om381ntz760fw3jkjcag5nt823uqgktz3so84gs6wwjf65y8tvw8ce6e37lvfiwxe08bdgwjn8ein7zwc7dm79r9s2bx22yvnjifnf0hcc21s9gsk8o9zn96nkyomgrbkfu58ihgkb5d0rmguyu80sxu5h97y1dd2j0be90bagqtil0l4eakq48h39opxutwd54vqnlskdhdolawjmhojnjn9j00q3yrq65wctddzvfrwviunvyp4izh2hwi8zb9xeg252uuf9vy1752u47vc6w86u67r4qq681whrem12ukr9assotnd8zdvne8drx043e0gv3fvf0iiz3281emhh7nlzrypnz6a5h9p6lnovnkvr66mktiu33i6jnavzpwl5orun0695qjmdqt0da6oq9mlm0742pcg12cie8a0nnme0rs5x0nar6og3h331ny6llhh64n5uouj6uexosr5bzj80a2g14as66a8el3y9g1s5nvvd5nn09rtt3sp95aheb6gfirip3qxv31t2kyjspvj9cagdvpronh4f925vtpsvlbu9zm7yccmzeyplhnacv48u7hmxzak76nhebawl6ys62ft9m2f0n9pl0mo4vll4b6s6m8qxlng8pbsd9fu2lkt5kf6yxdhqwzm9q2rvdzy11hqmk8kd7adqu537bxaus84adazvzaflxnt4gzzbacsacgt573lmy7pofupp44svh4nj01sc458phdfttec0nvoo6lnr8ilkqg36dchddl5rtboq12idfqrjfk083pv7ysy5mh6eez1cozgi27j7fl0uooqw0p45o895s9oppomptr1g5j5xpgo8mplfu5yxqhankxb2ja69zi8pso6regrdwm7z6rxgpiyop929gkwfqijxl1gj5wy52gyi33wgnraj0tal6e1ym0ya7looo3kl1zk4kzc5f1rmuuz29lm0h794nldythc550l7wepnfqguqx0gvjyh30m7wpit4w6crkahc9b5ln4vwn80cjqj9zitkigohrms40et3h8z4qr4rvmns2435dm0o6kqm8tl3nyy33q8x9mw6ibw24j2ewl38t7bd054sz64gkxkm6bzt5bvlokwbe83e8rac6uusk7qt6jcagk8rqnec3xhy8pgu0nuv3gtxwaco262d0ubek95wf1sk24urho9o14tzi2dvoo3mijpnannr43c1vhbxuujpj7fl0nkgeb2qw1g1g2d8i29akb8hw8ez0teanyjhivb3q0fa9hq6i1uzlu2eyv3tfpxejqxlfoygpj0tn2zgfmjyujttcqgas0pq5vdjarv1r0u3jp86hqmwbcuxywtzdz2qmfyxvcf3ws6ch3lvorx4ln76ssgshtzfj835njolnxvlhlphqtzyq3pfg7hkvh7ktxj3gj72q588v4h6l23130ld95nwdgsl70qe8q1pqqte6nfahvhgbt2w8u9bxgltm461rqvoarsb7mfmdgwxsooxyczcxi82i027c0762aq0nij7hmazbgi8uculddfym37idrsfhfkgr5xs2oss9ojn6sg9tcyvo0or0i4bqvlx5k90msuruvwpj1csqqcre9lb5w9q2bzwdf3hh4k9glahlgn9dx2uh9pqulu2uc0soq0rfnktyompg87j0isdb131n0q6dyprpogwvijkchav742f79b15m6nu7yq27j7o7wvv8vj74wop6kbun65a69sk12kh2qzs1te99kf9ewynf61atxsnmpohp5ssjt45or6dgl96dhzjv7et4ixodysmwm8orqlsldmr2zwlcmql9uogy1zeq4i7fqvx7bu2kxql48el9i6y2bg9azohpszwt0l5r5hr052eookii72omph7pa0phezl7f2yy0w39t9lq1khtiagmn0leb5ydeieftsovjsqyj1vkhtgv8qvk6ikege1pegowkm152rkmxvhu5xge5bo39f9km5e03zqpkvegmesx98pin4l',
                expiredAccessToken: 5752827941,
                expiredRefreshToken: 4074020836,
                isActive: false,
                isMaster: true,
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
                id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'he2iai23s98gorpw3449pxd0du8fakbmnulz9trtxdszd9zjtkehcp1bhdnrfys42tx6u6rkwz6jcy7a5wwzdwwvdf6itkvqht48vumo3loyoil3az25hvxcb63wcigoqex5ooolm4wsnijmqebmy16sa3evv315erviwgyraclqwhvkjwwe8muj1oj2ab8rcowl9fjsz7i0e8fnjs6c70yru69xa6f92hoyd9m1reys328vsu39j28f5dyduhl',
                secret: null,
                authUrl: 'jz1mh1krt9udvoa4rq7rep3a90y81hyrv0308182fvauza5xbu3nsk6nmf4r0f2nn7shjpweo9f7ybg0j52mbc79pzrdrtvok2hpfuxqgbk1xqg6is9abbagyyleput97dtvo07ylbm3qqpd8zcv80jf7x1jdo0rwpt7b43zrgc21gssocf5r13smik0i92b9bo5qewoank4dulxkd0sks96bgj1qfzklidfunlr24zlslfjbirx3u7xuj9qo4y44ortfxf1ic4oc8kek6x0y9rx3vjpxm1pqdej9bithwvf8l9cjvzboeu6nbm9xzfdmvqrojgeotnhakym43udtlejv3gibgs01z7gy8r28n08vdji1nen6qghzyb44ywsibf8wdsrua1hti0cagsd8pr21l452go7qe49cveeakewz2ickp0ozhoekfnklwtckshlec22qmth7p293s1appfel1gnpinda06ed1yt8bk35teng9a04716tazn437aenh9wcklqd9p9kp9a5zym853aiunlmbm575evhq4qb54fkqo5fvmz4yn6japrt767416ho2k5jygzu908r7ip8liuqkl8s5ivul319jtoizr2kpfl7sfkr8rermxa7gx673n9x5wb7yvawcz9iq38a0bn26ho8t8u461n4kfhoth0twbbawx6aqbdyli66f9ruaiv1dmmhyuitkrc7l2t3f657a7zuuod6w1ffv2nbvxi1u4e4kd00byd0xewx5so07awx84zpreijbio2lfirqlyg3f2h3wqvuo8pnxohrvox4p5iccebeht7c6d4oqagz8phjgl8evlt0wk4ecvpn6441cs9f1qrfty4474tge56u3af7t3s31vkjgnqmtte4qsibgsfsayrm1e732v35vw1s93t610hwf40dzl7hwh6mcok2aajudo2cagmk3d6k4kljl2dycg8ui4vgg7k0kjy8fjhfyxrxu707m0qb31fmjmguh64e6owi5196bne1of18s7mjhn1tg0a8p2jaciuxxxbf73vdkushcdphtuj4nsvcg2hbhw1cw6rwnr31wfirgpsfcnbzxgxhwmt4kx975nk1zecpne4cvpl2upw92445tbu1hawmefp1wvqn7xh8snd7qane2l2mda15290pduhrz8e44dcpknjlmkf52l06npl0e6csdjvwh16wy2xb7985l304nncg72lk9al15qn6swsv85x7bb6t0ypb5za70d4rpjtyauqe22451gng8bnrmhh3wowymmtkbkvxsb58yvap6ydpfc11y2q9zy750uj8wwy3hgv64ajkq2ltg6iypsepnylki0so1td0o10edmo7klik0ydiatmvnw4hsln7nq9pbrlzx8abhu0f77skhxkw7tmh2k30mywaetcgipvnqkt5xpf6v26jpi4irvp8o2wzwrlk2c3vvk1q662i7dw0tbyhib7fg3gjoouidongwvffuub08fdvdpxait6845lh5l69pddgezqjvxc9k8nfmzd3dyrhldgzwn80y5a80tz2xagnxklel217t83qkg023t6gm05vvydvk82cjzbw3ubp75d4ovogdlvnx06xykz38pyl115re17be3ewl66pmo71zsi53ypptwn6kpf94hp2d01rlr2x4v9cozq3sqjpen4x3ed0rz2vw8gu5zuxeiq5460c53yy9qcf8iisur5mqt3r0sxu6kt02l5mh7y25qkpb20lfgpkquss9r42fosq7vga7ohc2p9c736qaf5rspx079ygur5c1efjqmv110vzsg8w35ay2h8h4d7ln623cdcfqdd9kzti3qv0dvrqgsr11b3ftgrouun7oi6zwdl2lw2kir8lz9nbaw15rbl90rvosf23tk7rojyj7iceeqkvgm9k2g1zvajjp6xtrk7jcvp45gt8dtycrqymea2kd6ln3d6takur4rhz3y2d1cyr6mbrh9x84h24c24tp061cgxcp6blnjkskkpbpyzzc',
                redirect: 'prxv1es05clu5d6g46tgutt7q36pm7uz4090n7q41t19uv53xfodvb0ohiz3iyyfpuq8pkkck1ejqb8j4jhl83fvg2i6xdx6u292386eprhf17csczqwaq3wy222fxb8w4q434f57qgdq8bttle354kli6wjs62d207k2mmptaf88rq3dek2832ug8wyi9aiywnr4t17i97qdm7zx6vx0hggtl4gz9lym3plntq3vxrgxta954uezf7qundgfcfvdt4jhk7s7twfxt3s5pmwx1vhig1q5mspk9ui8wzsfjgdi7svorizn47ndzgodx8m028nissg0bgotxp7yre7gpqc6nffdu5khy9e3g274i1getanvccg7xf8ll759mqbtucqvkwkfwggu70pnhxn6q89j7pj6kic3pewyee47atm9u13m8xivfztnmpspel9laws2wbfgwi5ywoxurqai10x8nddv3sizdzbqmelw1m1n1pj9pphbjj6m0747ig68bd0llwc3zgd6rn0th6i3pp0i4w4jsjge5knkcx8mtrnwtzs7e96r9diaxu84xs94ynm404qzqqb16zrwbobyfjryq48kl5y19b7jrojdhe3riy0ytjbbe4k8pmic35c4vdi1mdathc2jmpp1oxj39zuuh1euza0apm4klv6xvm2g0a1qw401luuom3i9lto0h0wuh9ssy11r21wn4lobv8fq2pecs8labshmy2sfgpdu1st3xcqzshi5kbnx2zdhamtrnguhyb7r91ng1rvx038th3o1k1ornublxojrss8llod81ya5i7dolfnz9xhvucrar5vh0p1gvsnofm1hv0cpn17cs3jzsie0mo3ykbp2sdwt4bxqp4wntvbcexwazfhx478vesrf46zlt4limz2szie0hnhpvxtbrn4uszocktc9hw9w39885fav2beus8dficsae88dajy33u2h4mcexwoc270a5flr1e6z4hz6vdvx313pq4ree5yzlz0dxr9e8mq11fc34uutpyq1iwlm397ki6i118otqcdm72twhwv8jhd5ks6hrwwim5xnvojbr543p629zwtb5yk1k9ib9cjgj0pat3o0clymvm07639c6hsuatoxerpxpm89q9iy4ku299gcbp9lok32ma8qam755v0yclf2z7rwkasamc3bqnkjyf5946hu8nr7eqypwij0s3y90mhrtz6xcek4uil1wwwt0de2rpsqm8am43dynh8fao61qucwoef369rblwvdihczk8n2b0wgbq3fq8w0h77l8tk0eubagjtmnt0duuk5dzaawlx0j7gy8j8zowqdi1orjt4vrrclb10lvym7j88zuxkf3hr3guzs5azrjovg3j91tfti6dfo2noxowy8w40i99cpomqmjkb9aa3n7w906mpsu7786s4id2k8s18k5fnukl38e1sooi2rccsveksy01mu7pidr80x7j2vzeoyhplhymjhlv03lqh8wuadzbjgx8uvkry1kyr27gkojrq8fz1jdgetyz7xh4rigmoe42t842hj0ykixd56i1ptw9voz5f5qv8t1mhtmor7qfdlpgdcptd54i05ydxlz7v42xhtvy98l9o3sp3e5122icosirie0jljnxsunqic1wkguerikriqe6uqwgjzur6henoyu2lvkttc6xgxgmxrawxrqeeu7ke3b0bune56tol7e8iy4sbux1d5ouwpbb8of2ubrlmhskq92ludn37sdwqeg39ej2b2f4chaqrntw7jnrjlmk6bvprkl9ttnetqa05g4ajuj8x62odnq4s3k491h9da0h7c0mqadwo6ogj8l8d4vj3nrm3ow93srwmy08f1kngwd3bbd77nipk569o9zi4262n4faz1hiubip4hvfmfyvckusxq5d9hl2nu6tg41l5zwa1bdagl6j6r7egddyvirqhct9m72s7rblrd4umqowefv57t6esczgxa2x39hwgffiusojb950cg9iae2klwicu',
                expiredAccessToken: 2149282736,
                expiredRefreshToken: 9400170286,
                isActive: false,
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
                id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'i604302r7y6fbqc8olkwadgitqcn0r1yx84nudqjwjd8nldarrhnem9f1d4b3l50p92df6trentbpqylk0a2f1off0xa5gcwe3gxrfk42x23uzjjcj7tbrrlkymci8hc92jbkwzckb1enrm3iz4it7r1nxy6cxat6j427q0t6ym3au6j8yau51lx5ajc7e5q8ubeyarqbnjy421kzf9qo6w48gpuwvksr4rtmsi8naq0cusdywxpalcmxczpxs4',
                
                authUrl: 'k0zjlqqbme00pmhlm11cebgpxi9us2jro1mnut33areqsdb93617qe7lc1fxej4vkkikhkowhyr2v2upeox7fbkzu0bglfzqql16moz9obv2wlavjc1zag161e994260kqhfz2xjj8ovj70zc82pibay0ap0gmuom1sp82lrypquvznhgyhrv0v1amlf963w79ip7j2l3qxl1d82jz6zy1abcf369o7akbeqwmd5lzu7m3zhzygf6kduabl4hx9muwx9z516auswqent8uv8mg9m3my7i7g6qm7dtn7htjwlxyxrhzv1vgwjm26n3y0yd4gc08xqxk1487ads7anuxfdhoijktbd5su1im8q4i3itqcklk2acx6bec5jvxjefyruw21i7d19ubfszlj1q9wix8v4ob3rywo9pxnti8qv9tgwgqsfp9lmclsmk42b68gk74jaexsic1cj74gxycerxj9is6439ndov18lghhhveyrkdvbs0rz2pn59wjf5nksy44odq6twb6w3y56qx6xlsfyfangjs1a2j5i6dwmrw4xqf1tk0dh3339sp6392l6nbzlpl85wjfje68k9pd8iecmnw6f5a5gmgq649v8kr0s7fw7hnyh182kf31o1kpuifck9gxrqnb5orms7zo6p5h31te1vssfjho6ofpw88o4ipfbmxiv63kmm8n4tjofq0fwgzpj5b0cg5x0pwuexsbitirr7il18bmn5ljxhm61iuqc56j1o2w1fc0lqrz0i9e04rr3qzfg2gm3zv42zjx4s50k6pfviq1lx1003eu0lljtr7f8pyxl1oq2mdyedeuupqdfp9phylpw8j5ju2z8b46v5744j9w238ag3u3yhgpx2r1lml5tl5wsfjkr2lbmk7wo1repg9cridgautqc3kgx3sxpyhtv731pyvwxovnfjunhvolitevn2rqs9i7g3auq03fwoa5gvx19vxzlg9u1w0wvkc3ly5eycobmbnrw6w7fuidvkqkj0mpc8veiwivxbc4eqgmci30d30xrgohwk4r2xlpfnl48mmj4hxu4q7os7y8b5xouat43lt38fcpyqjeslcm7rwn2uyal8yxn2gh4pajo7izeqc3mxs7qz6az6olctj4wycqcxeu4rdisbne6d4hv5ljvyu6soml3jjyan6j5fxtjze7c5dv878wur9bgd8rz9pnzr2zl958fzrcv14g22lmoloi0jgr1kaqiob2pospadktpgmo9mg5sv38hc1azgky3cpatnayx7ilgvn6oqztr6z8r1dw03jmmdfsryt8ipder679vl048sw9m71p54a1hh6xt86labdm2jg5p7lwl0dx5z0x6ig6j3twok10hpac21f4ozvcv71sx2xt88alavfirf0jtjl0irutmcj3y9x2xhjyld153mb773xnmf8r6v9eov86gemlvr7z1z8i7lba824gz2v5b01bveqra1cevaevray9b0tgvndsd9de1zgvxtoxuoww56ky3d0ps28wdn8hax513fukddui0ae5q21azzqcetxcke0ucfek3iu2r9f14f7gcat53xn71ygo2dusc9lnujoz2pwuh2i3ccvnlzyrwtymj1ivg4x7vb51j3wdjvuv7i0ul5reonuf9gpd0ymppop3etvxn1i6i6t9tx19z4tcfug3h587i9vrcy02zrwablkmsljbdv0u1q70i02pvpobnvvj1resh9rf0zautz2duik9m7u7p6qt3srwzoi6aeuqevboctci5rqivn9bhhjno09kxuf60kee851351e6fnbylemawvh8uy7v186rb4nvz8bxmc6fjhbeuwxtpgcaud62rbd23ibjjyfvolbbzb0o8nna8dlq55gi6hhkw6787554v7viuw0usdbuwoiewuy9xkh21kwfpqr3d40xohc6fdqj524jr7p2wiom0lqcnuju5f2nbfb4yo8agvw3nk1di8wyc0akauav8tacjejkbb1gydxxz79spf9rarm0n',
                redirect: 'etfmiguz9a4q6thnavb49cq7etn957mbdwrk0v57f8bchkpkda5qufiuk4ujwyeuk09na6aui7fl18l38kcspy1yenh94fn6a7c4vz68pykxux3crik2qpdt26pj3jqnch72n15g4ni9nd27lehijv22zb9x65emwkmxums3zkzliejxhulh25ei1oojmgxikja99gdt43e0d1cgvjid2uwq09n5hdxwi6kz4m4qx7uk9xqnoa39bdw6isoldkasrmv7lm9oby07o8qsckx7rdzxicwxh09i9oi77trqjx9p7iq2bpno9xgonc32on00xhhiw2nbufmkjs5hdfvskbd7a5ca82xmhupfci6f86u5pplrp9wuanktrgy5rwjd12pc9njfh7hbf2um0e2brwyjhzhaux2yi0xs84w9znyro3eq5nyx4dd7cr3st7fytabthjtqo7dje2wuko3vszghbvfn5ilajvzy1n0hc4yjvst2g4ktasyqpboawfxve598oydf5lrysj1o7uetlsaqf8xfetpm2qhe4vpjls5lkwj6xzdsnf3m3af84evjxsjb5qoe82p6kqfwi18htzgo7zixrso7i6daws40gfjnuf9tpy5hgraeqcnsiemfxe9o4qtwbiz3j5kvclqt3dcvioc46rm3pcwbdrmlwjv23y6usnjf5oi1juyancxlr8bbrjwk7elm3qdiz9moua3j3zcyfirtjt6dtp3umvzkms041mdgahfukg4moxcoy1kyssvdiif11yp41avig92mawyu6pqvfae6fk3ztjztlp5eql80a3srkkw18kvb16ott0w2pd06p4r6l8dndau8ki3nc79hestf4fvyvylw7afwq681y94sds2mqp4yr2ewr0yysyahfv94zwdd96gyphc9ngepo7n9qaeyrunq9m12fhmafwxj3kg6546dnwr6dc124390rl27zobn9ah0b59z4ygpgqyzzpzxlsqs3998ewvi2ccc1tiskxdm8wjktu20q03sjvyhpo57rtxzcojsupxmbp1b83kpeks98tnokfq57xdy8ba6sdtxvdwxmqnsgy73hoh1gzlgdliekmqqmgjwfecnh0hueyb509eq24v2vmzubffsw2hxukd4fu49nkv7cbnef4wt0hqkeopsulh2trxbqxaapi9l4awb8rwygjpr31dz5121b2f5qbf1ppre0wum7sk37ffh2qoorvx2zrwowwkxq7yq5dalmrd0uz5dm7tp062i8rj0u3ix75ktrdqz5k6m2lprrdiyl8ry3n6g6zk0pnd8i2zkxgu49blere7cf7vj7qt0uwwvj7hqs70sqsy7qaa1ef6g5tvz7msuwdctmzqpn4skwdn66cq6hbdlyvyossd6ho4w4638qeluzfa4or1byv4a3hh6c59r22ix8e3rweti6r97clqzr11r5h8b0lfrcvj84i76ylx54w74t1zndu1g8t6azrptqi1ao4q9u15eiprw15ph9nlpfab98vhvyuop6o2kyqulbxrbzgqpkkw3c7wrmci20zs30mra4qf0nda2u6o61uewk6s6nhpffhd8kqdrpxqtaeup8fui2it3cc2czlusq1evo3wxcx4x6nfgccroia7plt0bmubgxrnm1entse2tmxor0pe1ug7zy5loe7g9vujkmumy8wc55xw2qasl59006c9vtdbov9smf3f49ubw2j2f4wtsas5mftnadqg4njeuigxa1ap8tbzwyho3cdhu7fw1dvobotnvulr3n8wvy7znzl1tqphjtv2rvj9fhljx3kzg8stbr5qvfw0rzmaf3jgv9nkkoz0xlbhrbsoqdei4qtylg90h5v9aut3c7dyu4487zmordb5sjk7hikg1ocev3zh2hggzbccuqc9hrw5316cullhe1kjt6u1au6bif0l12sz9gqaqjegf9uj19tnbh6zata8upv4u0p5yobr6s2k9aywnjlxqlfy3wgiz071e7k1x1n3ionikjnpwplap',
                expiredAccessToken: 7653598045,
                expiredRefreshToken: 3858462209,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'ihha2eyarfdsu67dmuto5ns2pr3t1a5kgqqv9y1j1tbyb3erju36l7towxr2g7fgsu1yqzojjw2xsodkjhe4klb92turrue3rcgg1h6d5ghe2zcalu22vb83jc6dgo7908bj4zn6e2r0vtkii8669ykajbafakg2tukn4c6f1yk6ds0lvagttcy3k83zyr9qxw1kk80ih8qy6euarduhlzwff7s95asvpchi3ix07wzq99aknvirsrdrgof0fgl',
                secret: '855af2yekb2ax4kut2e5535zshfihmv8vfj2chldjs80un3lqw9l3p1dkujm68simnyspku3gstucjdd5lw1mdrakd',
                authUrl: '2m9pnlq39hozbj4p9kfanspuytg5hx4t4dl0mj0xdf09n87so7h08lshjz1i503ne8al8iiqrhr3hot6f7bsp4t3ky8iypc7olc4hq0slgbbyyyndhkvjbmz697tqbqispr1046d24zt16i3orjoq80ruktj7m5qgolyx3lwt1s4xj1pvlgqemr9pf5kziqrmcgo9mqq97r85t1hprz1kj719zwpi6puulhj29gx7xjnu8jyuge1nd5b7gkk1e1yklvxriw4hgq0pon2bzt88fxztafknp7su61ux8uh42y1644msuknbm1wkvqz6ybi6qfg7dcvalgl6f7us4fi0ku7gslfrexq3aov355dciq76znsp3i3fi0kmkwr7e1fen1gsupb98ryznvwavgquf8i9w9m2e3f6fcbpcgo49gumtlf0gr5303fqu18wx5oxeqwv45r9bmyu63z5hs04lfxn1d61fkd2zn3354t74av5sm0ya2iok3zy59w0o5822misv2owpzasahwt93021tl0nxbvjvvil5q2uuwos4i75nko7uf0qybwmcoj4sjkgioyz59b3yfr4uxwlv1xcwjrpylqh1cs6v8mgy2cq2zihn332kndp41exb6vru826ub9fr70hrvarmujzwo3ba4dy7esyox94c62lzqko30jwkb2c75rzzsy71w9365tb4cgjbkbco0dy9q42j65ree1q21sd27285y7eatmoefyiiym52kzkm3brr9kmjbsjz1qql1jgnm7ud4mg8yb2eowooojmpy6b96mo4qo43hmg85tevxcxzy21q8e7nznz22ui8kpcnq064xgiiseawqbw5gshj90gmpn0yoji0p5zxf1aymb8ruypf68djunxr2daw75y4lo766kvlynamdizquk7ibbhmopwsj6w61gv7c868r8ro54xrroal46dxhv3s35knjjnx46g2k3hwabocg8vtnv5ixibaeb54yprsdfff45sljlyhibnnu5emxjaiz12b7gx5fqy4878kcp6xhqt1z1m2w0vfvkl4uomnwx788r08x1rseeohz3b0skra99218zw5rhl4eaix6i1wh0gyszv711fzikkyacp0f4rp5me3gkiwhcqxngogw47p7vg11f71973msojyn29jxr7c1qqmh7v2l8fdhi5ndji928v0u9bcd2zlwzvtsgy1utafvct0pbwoiz68u7gm25w454i32obrh9mrkwb61glfpufyyr5d994g125ah6fv808nwzp7kwrnkepi9l3sdcj0mgjklkmqjtmht8fc4ufk3ch5fb9s2kohsl0004pyudrhlkjxuf8ht66gt6dtcb3yhh3f78cn1q1uauhcl1xd677zd1jp514fhwnimcm0fjxmi43pif2yk4hyy5q8xyx8x0lebdelikn79u5f635xitciwjwgvh6h9139g0ofp8an9ih5mkxgljy54sbm2ftsuxb04vlslp516mh8zvt7mz3pihz0s3ye0wvz6s2dtfxfvbu8f324f612vdvhc2aleee7srpwwkhuxp7uc8s0e23t8z37j5zb6j9r7wvbmhfwb2slqs86h8hvaxsses59kv9liiwijy7riheiebik2rtclch404ww0fkg36b950kys6ggsnnay1jwvt94nrjvxb9jf9gly4cotfgkrmbqkcc4x47dyc9lnuymxt3hfmhdvpypiovue8o59tsm1qy8192e7ws2nt51j1yptxn17fpu5qwjn9sktji904qnryr37r8h9qfmkdy16zmlpl6jmpz7ug9v21nm0jou40npw8vhl6r7kenr3jb7624f06vnwo4zo6k9zmfapsfti03lf6ydc23qnhk8hp2rvdda9jtnzsmer2lri1xuys3o20pz3m43p2ynft97d9wxp8xvyb1eh1drt193153auab2o9z0c90wkdkbvl5vip9xutuij1u6b9ootjppz77i4omrsmp7rzvdcdxc5ptock7alyeh273wlmzas',
                redirect: '390argupl7uh2x4l6wzxr40zo37a1s9ooo6o5w3q4engzpv4jifnwsf0fa1wot0kin8wjifljpz4377yymtwiuazy4fu7nv5vx5ihqkj6abtryjtnv6am7qfauk0z61t1k98giog5ms7zsgk2xkhfqnthsyne7kg8xyctm7bqm5s18nboq46xv9bb7h0gcf9hyyx0h8kf40mud10ceq1laxjgvt9y8g9ayotdgicpak9228bnimfuk4r96b54upitbu4bxbkogztoq8shxhrl21ln5527wnu2qw58tvq32r1pczyxgdn14zgrtj8w6iwtnf5c1fwyi4j3fvdn05uejusqfrcolbwdpqplvkn62nys97axcw07ricr5ru3noi0mlutdvz45tdpebo1p362qft744fe38ga2vh4zz2pg4uszi9dpa6lo6aj84dheftf5etwyqs849shm7v0n3c1hiol2jjeh4g31d9imezrd2floo7nm5zgya040mryitbpwqmyj2n7u26fqvrzn0ybncohxy79w72q8ite7jy1ogcis4ooninpduta4haxrvglg56d74poupgvl22cefp1v5l9g8ix30mmle77a951ibrg3dwv7wcuboszffx8g92un5cgzvhv9dg6nerdi0w4kgn2cn1xp73at76ofpgtkuomjxeqh48aqslv7nguh1589uf6y9f3sepjqtqtuzdjlzivdsl99kv3qfq80iu0qmiz0azj3thvdy59wy3o9jco3dcpyez4j6iwjpthotzvjpw9qv8zy584un850vuekq8f1wfsjdefemfilltfzd2c71ma367m9ycsz888pp1lrcmlbm18m2iy7n1hk5s66m3t4yteyfvs9wvkpj4ar7j79vr563dufol69csr5nqewj43j8ihgpu5t1nqc5pv5nt0s8ksbb2nkzuhd32y3uxa7iwd8sd2lzcif1h6jbjb0n5rsbx3fcgs5pnmgjth3s3hvit74kq60cjr97bvvpmi81bxgvgfh55kdu181nedfgoeygpntciyhtdes0r6hcmw6cvnb5j5stl1a6trckhjpvywryl57n27te08i033i86q8sp4b09t2bmrf9jo6mow6d8tp0gwl59ganol7q2nh3rjv199nq6kxvss6y99m83sm188m4f5lhuvds9ai8ry9graw0x0wrrk821cgz1ou7cvtkt55shxbm56v7wsl3u6d45w28v2pmoc09h1rqbtr40yr0aow73liulykwtfzg4jvaukugfch2qyo9eevxqv7saaidtwh9lncem1etcsnwevjeomgdbj69yp7x6l93y72rhpzvnie0ezwjat6aa4il6l69s9m5nkf19ebh1gwrfaqxspsn21h8eccet1bfvl37zt4jkgjdi1k04bqeq55uqwa5zmy0zf3ygvmt3294jw5z2q243fvv4jt9kvlaofrlsu8z3kwd57dcx1rlpb00qheaddj7lp5d4nm4dxgyri2fr9akjuseday19ier30wfnf96ne8pzo85xutvc6eux0a03r4ehtfuvwjz76fsy50xr79mmbhyn0kzmg9xchs9prhkp0f3mdfzz8vfbnynf9lskf42z11rv1mi3dvb2xd5j267uos0grdmw8nmoas57l0v3032iqtjh6gwwlh36y989e7a7iz1gzsrr8tgwmuvfkt9t6ewj3s1cwsq0nx8ffc2ca9n2u99x7ep9n402scvoev8ah7ym3ufk0d7j5g9kjbvnfhwmrpzwmn4g8qp8d1qgualuom0tnzwg58jh8jv408metzdmnianmfeyus6eyek77q7rmvpnor02z8uxd1c60ec4075t4v46kwgah4qln3bdp4k957foejpka19ntcpk5i4l68aomc10bf1t4nj0kd8g7fq8dff63bowirvnygioxqyjdxpqu60a53a84evi440k635oqqmhaa9x6q0e1zgq65ijcww0xali9l431nqb9qxf7cp4li2jretkm7vpzfudhn6x',
                expiredAccessToken: 6736385852,
                expiredRefreshToken: 7932993826,
                isActive: null,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'a51g3hxtqhuce8jq8bjpnxyvn8jtn4ci932aynk6g988a6rnch76r81gtgeua3fkiw8o0yhmbkuexqdxmlgbu3itx6kwkv91akipjsnzr33sjuk3eq96pxkb8s4bf7pqwz4cl8r910kveq3b6ld0j8v03f7snhysty1g46iggulw4yf4v0im8gpsi4s6pegywr387jtxqlhlng9s3z2dfyf0oz1whq8e5x5ydbeoxi97p6pf7716petkqrdwry3',
                secret: 'lyaq9djyn68l4tn3q86mievirgzrg2zpngrwou2u7mdaipak1cwmf7fan5b2bkoskvg693pyfpwsyyof4k0ma8v501',
                authUrl: 'ps0wzfof2vcigi7j06k3wlo9tonj3tkuxwlex6580qz1v51khj8y7mcl0o6mcsn7m6yduv6c2r2m0cx4u3sgvspflm6m5872unh2ft6x49mebov8xiv656ljacufwoq89omhozutmly5nb3ydoz5gaajr5zerau0r4ue0czijgcj8qts74sw7n1d5x0ofi5ebouxkxh0j0rmo2399aicw0zwpdtx1fbpyxxwg37fe6qik62iqabt56wcrm8zeu3wacc2zmixtjap5g4wjskkk3jc3wulaipcw6wrmfhsqm3wj8bdhq539eybgghmym87subk3ks8cm2yq9ael7ycwk2aeuhczblq4jqszqblj8dman0svl2p42o1zgjvh3ud59ok8719hsagom59gkcgpjlp4ve19vv4red9p7ojlz053h0q1bxp6d93xnhgys6xjgamch3ke9m3geaex1z7ahya6281r1umibbsh8riqj6bywwkfe95xmlo5mfgcdbb1iptuk6cmtp84hei04mrzri7vdunud2xo2sw1adfuoyjnunm3402he8sxleuky2f0gjmypxk8cu75pyzyckedk7lexylrll3cktk7jpsml24cnyd5gzf7mwzvohdrts8wt8eajb7x7kff4eespjmhud8l0h3ogo6ycd5m4gzs03mlqp5jod6hxmyyqz8ygejio19wra96oixoo76iyy96w21dhdv6i51d5ev5xeynnzlarpskihgfq9xeul9g1nknvjwav9ow8505ok54qnt17yxbx3k9o36ue7jcizz57sdqsd1c9a4k2goowxdzwsycnfvj3niz7walo1epmrdiui615g6wc2onyd5eq7nm0cy93gtp5fcxyd9ej6ulhb9zzkg5gqjksyo120u0kaobsqpfeaycd1od8xafg4yj9nksxj5grl9yyx383ovmcpoibyper7kg16p7sjwl88jzhjcvuf16guy9xdk3tdm85g0zm4eymw32tejzlveef9r1ovwbmz2bti5w95fzcriov1vjxhma6mr3ut035b7wjxrmopioyi7u87588ss1ksrw8pue1wa12aq2948a3k8lzk4dfvdf0p7fpfs8mujq48avmm200ku4n618smrd1f1y15g282y02xvhc25cwrq3mb4ucuxgs02ibrua8uhf6cr92nqupitsfqmrxhaelwavrpy2xl1x1lr09ivs67ydypi71kv0nfufsjw7ywp8jrsnqsq1vxmm8uvb04c6c1z6uso3klumqoiaijbulqvs6t8a1mg1yg8aa5jrzc5pjhd5gi05p2r8iw7erjqa84pqv2mxgc09b61vvr18alakfv3hjhyscovtjmbkv2f1swzmjn8kr67m38yqr4dsvggkht62ntgcf0vycjik5lwed7k5fqn4ipyvz8zuwpw3jpe1v59rp1587ufdl01dp0dx4cnf4x3a61oayc6lklxf3nmaircm7w40fxvpk9uhox7iaqg2u3mqvpwhq8ssnu3ngceguhoczp1e1vlhbyd6m2tfeeu3hsh4isay6gz05pyspkne2g0szsdi9or103rc3mlne7jz2950wvpp7y5zzqa5jywjt2nfetd31tgbwtgkmgzhie5ru3thn7r5jybmh2qjaxlk4ygmu7vsd4q8vr3svf1enydg3xf4cno81wt912hqz17yas4azayrk6swz8w1be1i0ge2rvc1eueww5z8x1tca0405hszpmf6j1rpqjyi13vksch3yordg9er0q9zmwxdi1cw922c4extejix945h23j2h63xg7plvxv389q8vqvorjpeaaw96qksjd3cmbg5qqkdr9u3vcx3ceyetuqnf1ca0kvvr5z3b8ibhted4uzek5tfdxsx8n8kw0m0kxne1ymqtedm1w86drh3ps2f16dtd363n43zl5wkrb221x58ob8hsw0a636jpkbupyynit72kgo76u6a4jvkefa4jhuc3tgezvbc1axbnd5pvd2iv86vwydpiys',
                redirect: 'yh87k6ys02nw4efui972o9y0fin5m0k4nvbqwcwgfmzws31bbxio7sdorzpzbkp62eagaqw0wsfvflpfwcw1voahiwbillyxhykzzyfuhxty60t7kf8u8cdtsltdtt32spzeb74w26pjl74p18spzpsyd3n12cq7kqlrmb9iskauev5bvav6a9o64jph23cdo4a9dv7g9iudv11cqyeazvyofu5rstbpf1mshidajhz01p980yvioaxa43osfj39mli40rz2hdhhzv0m51f80nlveoyihoogeh78io6bspbhsluc5f21u74yjvxfwvo02p0lq8y8z13416qbowvufp4ock2br7ld6gpaleye8swd3593qujuc0xq1oytxv28hbuiqjuv9xn8mbap0v4i4judwk3m8paeaat2xqr44nathnfaygnpn3cerqka5y3kij86d85zbqc9bilshn5yx02qhbha0s57gt7i094l3op0y5yrqwds0qxf5y4bq48oymus3tlccszswhq9mb5hj4t5l4ptficmmwntd25zoilzme7t2xl4bl25xn9h0ftjr8b40qof74kihmhy8tz9fxu2nof9l6t97tjtwhty8aewm5ks9jigrrltyewomjmbzgqgecf8jx2m7ptqijqpl8d3o0nckr03vn5lnj006f3te4sre98fq4t5ozu3pr773hrrm1wdlirfqgpi1pl1rqsev2kgoav3frabzdxl2e3wpotik73fwwfpt6kah3r7ocpqx22anwyf0s9hjn6vjxoxfb7vpwclh7nq0pzxgj2khe07pjkbjzx8i48dsdhauzn3pod8b15mxjxf0j6x39dyrtr9up31ezzsylo2sjz1qegebzuwfzkvugiwrnmf2st4y6godr7eglz7klrppgxp6tvfjomawd0wsu16ksl8c2izep3nt4l3llmshs2vqp2m5liurkhpun5mk6h3r31cxyv03kzw22dqptcem26lcuhezxyxijgf2926tsb8hlw4esyc6vu19vnhwos7buly6wh80qk7dn0yicwg9m4pd5qlqja3bi8tuahn3nmgiemidh52cy0f2t88evjamqn7tp5ujgdvcgakd5dz99lsrnd0s9780fc78wcil5vaf7el93d3vqggatfiho2bg7uvjcputocy326gzxnpukbl7brxelwlgfvrngrg3vt0b27hyws909mcw9xq2u5mgk8lp5ig1hpjd8va8l55687eohyg41mww0wwos7ffgyw0by20ax94d81fm8gr2q0im6fxg9cgt8h95157xywozyppwzy6wxy6clfwdy33gg0mr2hx2tz6ao4xa97016hymkt422379l4pa7gg96qff30xqgr75go4w4rzh14e3nd7v6vpwwhx7w1uhlnkgb2clevqu4bm7ti53a5hlsp010iy73k76rfyrzek0osqvznrt6aobbjuxo2na0j045wb845qccxa0kbwi09lv9w6pul4k5lnfolgaxjesiu7nvl3p9kvyecmeklyn6u717s7b1dsco3df0d3tjrz7tqy7maqn5zfqbx7sbcvpv0w2w24enexqk13k7itsedg5ff52zvij6u1m9k5ry3sozvrn1l7k60w827wowteh3jdqwrsog1xjw4i8hd97ug2l3e8j8ydsqm2p7ug65pmx3mpvdhp3eldvrgvirwhldgg8mikq70gafq6uqu6sj5i72awz4ugmslkbgsej0q87r6xbswfb4fjq7g9m43nlyaraps9qkp0fsmeo1hdxqkn3qsrgl6ib683x59aewqslrme9ucmn9nfpdwtjiar3jtsobl82ys2xn13iopwqhk7dmc5cq4xeclo18i6bau7kllnz941banhcbeipxatqudwpt67b1cjelx1yovpkteikc3s3x75dfqoruh199bv9ba0bzrzj8pa8s7clk7bk4teov7iouusdsikxisuklw8h40hpfa2sgcs9teibcogc2e232ry1srejg68glc1i6j4ffm',
                expiredAccessToken: 6326180042,
                expiredRefreshToken: 5237409126,
                
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c',
                grantType: 'AUTHORIZATION_CODE',
                name: 'rbkqbkllbf9c6d2jst7ehojzjv6o60tsl8t457ac7nuso4rjrgwgg4mg510owzy9o7jjc1e8lookbyftkxqcqaupoja3gpskxrrrig1e37ebtu141rifu619avnq6eejikk0vfs38h2fq3xozpusn4s5xc7yiv9ann5zywvx6782i7qxwyskrt3tog9vrtqndz2kror8v23julsyyjjemax4zi3e32hto2tbl22i4ucfdxinjsp9kkvmn6s4is2',
                secret: '0tv3va2vin059zb0oja9er08ttxx2j3laun9ut2vyj17yb5b1r4u3fe2ifz65depwm21nl5fr1151w2jno7b6q4lre',
                authUrl: 'n869yw7nkyrylqv44ckqj8ohdh9b6dzjq1a7wyteelt5d1rtkam5fga5gbc84vv2nrg5004q0vgou3s2yiqyn16d53ah6n2ctl7zk5a28850c3oeda4gsspo6lsdl6b77ggjuadv7zs5jli833525f0ljleqgvjasec0p8lqnm929zynuoqspuxz1npe7v1y5pl88nze7qlxx9gzo2gafmnv651mrzfmjewe8nyx8jpwx62adw7tgi9eqzndprrf2vpagdymsax694qymkq4qfmmaz7dwtp06crkan5wj0r7qwo9rk8ev1mt2ykumbmnhjmew3zusze4zh6wm8nr744x456ob5jeym4vdj6nn4pvd1uiphw9jebk7612q3tnc3u5ebkxscvsi1zvd8f6dtzen2uil3flj1sbqhfm8emaaxkxahas6c8pi8lv7pw43welm0oc94n2826n5y155typb4lyjq66wbrdyc7o0stmxzh5ljd90tatr49c9mqfr3avluldbmzx1wdq6jh8rc49z4fqej9tbn96485ap5rrto65nc8uqb0jppaheh5fuhlokozb8k4p24nzyye3kfb4swkjjucll2zdyovrznq2388n2t95y5cd99p1vs3rbj3dwjc46g6yf0rzwel1l94fkkq6wbo3ecuh8oiexdn0ewl9kjmvqze068o43eywzrb8k3fgt76gywu5pncdcp3w2b3l0jhz5b56b43800zy27tr5qdt4qwmrys1kaylgf0sdre9b8aywi141ivpig6wndr55t23ogagmbyznwnzxr7381rlgvoorwglzguyl9bsr0kwpw9xv7p5zatin0e9jwqsoahui9e18ma3fxe4idxp3eewk8amo420i1kne11i5rieubehs69uy85jynnidqe57l2m9w69t4d7u76ceky1luo7shk800gzrl44kkdrqetnnas6svn7ah0sal1lr1fk4wo7pl9q474sw2nxc0v4kbj1921fzty8dduewe40viyw0e6bglnf6qh8rr2kwpybeiw5icdok4rn7hp2cyzajx5cd357o9od5je38el1u2fi5f643ao4dwjmjmhjhl29lnfi5dxrx9bn33020cunoxy5qhvkumer4906i5yhlkuo9fys6flxsn5dtxj78ap0gmp9hfostw37z2afwx7drzyt6c1l3e19e7j7hnv4thrp5arn29q8liklpxhvgk50ms0ra88xonfhnp3gn0t3z7msicko7vu2dfbgrbp4j9rrw80idigugbf2vu09bf29nsizn9dbvk2j8au4lpw69l3f2ug3yrv9ktpz8o0vuhj48c4mwotz7nc7k8fg30tv27g7w3xbfseknkbwrlcpttxpl0bgt602d7ygf6rewrcgiswdo7o8u98hcmmcxp65wrsljltsmjmag3em8qq870w08waioqit8phcjk8va6py0l7d4p5ennerz5cegahoo0smo8j2v8162pa9ufm6f13331ge6ixike23jfevhvskj81afr8r7djicndbnufi4d9qdur8wdsxx1l76bfsbv3ji8zq329rl97nrxhyc625ye21g4doqwfuoq4cxrulhfg958bbuq0s6p2ug01j6wbdr663wkn6i1ad16ep052cxw1m90h5cob5847tliu4w12bzk2o2aefzuz3qbutjcjipdsbte22lz7386feq1zkf7m5rzpe9hqr54lt6xbm68r2iyiati1htszo8t9k2hd3vedlxky2h4nuakhald4s5xrdv3bpwapdxo07ro5ydmn1mwy7vn8fqliizj04lz7d8vpzh3rliwj28w12f23t2bxt3xe6s5ml7gci5rffayz0darikd23z5uupn41bcdy5iqxlrch5pyza4uppnz2kpr6d04uo0lruspl2ooml5ezlbkeo1skb3djc4p4zy4uauo6sitpi0h007odogknx0hh19i8htczgic6rmcdpcpmp5acx3c4l8g19y8k9h5xlqffvercrlkc',
                redirect: '1jemw2r0ns2dpw1bs3u6v82w904fvjre90h5pzh4ska7vutm8nhvu0emfgvpzsa6jqk5rjq0a04zjrcsxonm1i4cuepc5is2002t1u0dc3fhh4gff0c2bjqgaufk1rlbjpg2frmqdygzwabnzxqzc621lqgznudopyohlbn9atjyfaxo8g5t70rq55ef4hpv2suwlq48qh656y0zut0y7o9w6e1xjgccpi83o3qjz1v6znxj9xikqgxv7gi0tx22h9451kef0u650v7pvreduz21onxxldfuijvpq9t6t3wvgtjuqkf689ivfmbyqkj3t8xsfu9j7rro5low3fomxzgpdkpldfgo7g4vylmyvty95xudld5pxbyw7qc0figlgd2uc7uora6ty5rgacevlm6xekpyovol58cvsoyuunq6fjfb188d2r7s2lryvf9y6c8bof9kt26l3otbs53wvjpvvzo2xdi623q1v0xi3rft6wvv78lez6780fupo05yidn5p96y4u0l9fvfe27nptprdalbmpvzxbfd3261jvntvgcfo9a5197d606s5s63k4z4kgttd55wmlf24cegdqm58xa9gqhvwsmb3yv0en7c2nshwfmwupoiampv02nozsz8b1aqtc07l68svjlfebynp6rauc7akpsr9u7lspxmw8u7puq7t4pp0vrcr763ou54j7r15g6fue50fiiivlinm3a11l9pbcldkzswuowhp87ez07p6xx377jjyk312frmtqloqueoi8bl2zqyy81wgi8nvgyre4n6vi2zelicriijumoprnezxbd199lyxa38gwberlruqlxq97l9f4rby2ea91wlv74taes6xpwx9hk4vtobp2po0gfpk4ixxoy9vi5lwwptyjb7csugyusx80biuqils1h25d6s2n9m3y0snae1na8bw826giwl0m14aqa9imhqc2k6n0z2wth7wgqlhbspewclrybcta7l671qj3x17u1ohj8iv7uvspnv2lvxfrs1rgawpy1q7ui1u4494x9tg04k83f128k72lsrdttn8qmb854udue9r11757lnvoytar2wdupxw6c26etn7m0m44wz88qnebkttx3v57k7dwv4ax4x8zmsjp73mce4z4kd1b617ilc5fu614ktldcz2pjvp9yyd35vk3drfsc794euj43e613120j9a8suwbuna6ntvk1fb8rayoqnrh8lwoq7pmfzi72q0zdi4npdxirrhkins21rt8hv54fgs0i0nfpay1mep25jdehonvh978c0zywnit2sfg0lowlmw43ewcs8u3nk10u63swri1x2toxcnz96k6opsht7fttz079ue5b9bfv2b0abi9cz8buive1h973tajaqjro886ebyndrj0jkbdioo1o50vrcwqop4nf8jfxy1e8nx1z6l5pd2ocpz1v0wbw1kruqnr1zgguhww3loktgsdblbnzrtr0t9pr1flxtau677kepzmkge5e6m6r22eomi2f57uoltceecewu079x4xhh9zdwzp9t4bk2fqos0odks91zfdbhnznhgkmi5zrkn4448yemmzr6kn33bkk5ytx7gudf1k3lcsn0g41yvt6532s3bw8l58op3fqo2jzp18fbhr422av7zbbx2mulz8se3jii36s7h108ygo7aicmmmx5e6pzdxpe7wvos7gsvbal8jd80rczx95ru8ktga4ctpcv65n5h77z2hqqwldebprjzzjx7z72y1b82tqpy5npf8d94p3vhptom569o8s17obytympuv8v2pncyqd4te9nzebnxqgkczthfn5lj2kuhx1w2fwhedh62tyrshrxs2ntdv6caksxajnfso6gceqtjbwggu5kjfbecnewtj45dgx785zptikdxedl0ti2rqg4qld5347vtbnpw3vwhx6qyj9o3ezdeqivsg62l38pj2z3upfpkvik6mrw5zdueeaifcd65vlmc992qjuddp1wcsjpuo0rd7p6',
                expiredAccessToken: 9365340717,
                expiredRefreshToken: 4473633515,
                isActive: false,
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
                id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c',
                grantType: 'PASSWORD',
                name: '658q1jjx9s2ltz8tq7bhnpd0nw3duwmhn1nnnb7npcos693sfoe5ebyepj79fao83skmqnt4qqoero3ub64dlh1tp6r78vlpuhjzrzwmje8gccxfaqvgq3cf1psnbx6yrcg7apkmty3p4jqzw6vcxu7bbzl21es3wklj7melek1d7v786wiytcn12t9roe9nkaaliagmykybn7ch5a4z1cw3ktfq278yjxfgyjy006eyaoetizdeos7qrq1wcf1',
                secret: 't5yfa2wh5jn7557tw8kv0gmxovsjzxd6esgs80n6h24la92s40cawclq2dcobr7eqnaz9eu4oak6ebzoov6y23eblz',
                authUrl: 'ry9fvnnacj8ngclq6sr93yinxxom2wbcihwsb4fco5qf1qj3dvwf49zw7v5si0cw74mcnkrqdrjjxi82hrdzascsz90gecl9blcjfzy6yz8op3aicw0vcc9l4vhrmf0zkht378rv2bclg2t4mi5dj9ptvfwbu1a5ysnr0ijadwgv3dl2tqitu7woabl401lnyswbrhzluqse5bb0guwfdomnkmtoy40ptq3j3drjxiahjehao7jqk21dhug3ido113wgul8rwn7d7iyf57dahckqktlz9faugx8746yw2eftt9759x9ynod1iucakyz1iyczago3v8mzgtzv19njhvielhy0oc2x9xp51wgngqmm0fw52s30k1ok2nkntyi2qw6qc79n6uvk2oxx99gf5ftjubu4khy1wfyccrrk60gek4w70fjqguut26ncmw9cm9grivmeivdsfjwlbv04xk7sjzn7g0ornjrwb0f3avu9kigfo8zbjacblzzkov5c7m6zr41vo1w87dx1vqnbfz9996ttyb1b4ocbi8xaxrkezcihuk71o8p8m6moft9ukopypz4dsrla2zznw0kq9e10r8se7r04qq0rjeu4ll83k5yg9hn1y3s4xtlk4ulpp3mbwcgispz7om7vs9e0gcjaar058etgichwhbopwx6dznrd5emfk4ddgjct2m66pto22hv5iny3q9c0ub3bb5lw25y4y103z1kwud3j7o5zhnj0p290jfrd6pulvh4rrxn0z98i103su8exmujw5lhutfp2t7xscfe7dw0f5ltecvmexx8gp7f1cgodfknusinjhbx8m8ier4gm8hao27y4nkmagmczvo0fu85z6xqt3mv2swy48q1d9txui3ru4rpjp0es059xv7mafdulvolt13if9yj1lvjovx945wcn783e5wy1ks2k6uoz1rz5dnyepsmd7nk6kxk5603ybuqf5jgp4mu2y520ghhcujjkgx69hz0k05f82w998e3cq1loctuuc5buuqthbptaqq9hy87o3crvqzefu4lh9ma63sr4i01z5h33c35b65hv7bj0eaax8kdjarrxv0w9401l3riltceipxce8m054o8y0hx1abmkrautjy8m9x66klqeou118u0w5goqxl4rwdd0k7eaayn9rwjvb928le7hz0kvmjmlbuve4ktduy34ejl48b7683obb9m6eooyyuoqxxf7utk9cu1fd0752lx9vdvcyu7eaxyebuws83v9m35ikdf4cg25xgdjszq8e3hi55j40u0iwza7adltux1wt9tltvp0o865mm77w0iwhj842n2077ksren1g4yspwunt41fkssqhyhftxnko88ozoyyzkog3an23oy85xyxzx33dsnj2g9b3vaglphn0jx43day9911rkif0beyxqm95wmrjn9hjjtotwzx1ixsbp7rntngtmrhpvq3rf893r856hml9rv2m08yf6aeis4105iv2req6tbcesqgtkerqu6mwblqtfhf4wx1pzx7k0i25hypase2nontcul5045rm30r4mljiaf6yis0ufvlpwxewi0dxg5qw3kfzeh4ffvu908yxipadf101sopxb6c1mtcatq8uvqqxdhtlaaatcs2vylodn1i5aym6t2gy0uy9ney7g6kslj38h8rs8jg8kxwsdx2mvxi5fak67ayjsenjp0q7erhigwwb9cdf9jkoe69g3wk29t49wqanhj2vzuitmchbpgakxlvtfvg46iw5jrwvygl17hbp2c7rj3x87zxsijxwfembach9p5x9dt9b7qwleroqjsx53w5rfi8jxpla84716dickkna0uw8s0rb14v90rts3vuuv2shbwmi7s2xywzg50y5gyv6j6vjjo2c2fhpyturz1wsg63f6u2ml2gs5jjwpnixgpqloq4nlbpk4bq434ax2i3y66507luez7jfgj6yiobqbxdh1akg8zwphtbjbv38daotz1l0gyhrnfj4cdr87ty',
                redirect: '8db6vo9qjgtn0ansznd38mrxrbh5q1m9iz6kbg68owbpfjxndcoizjyp19ceatyx825p4ohdsy0uspt9zpfw67vqswc6a0zbjvoavr9ua203hafw927shpd1p9i2p303iuq3fu8jnjmjwz3m01o5nmt7s5t4nnhkzom00v8gxprvvqls63qdexh0mot8pl2exm85v5xu89864fyfa28nk9kijrx7rmmlgbfd1lxy4f132pbbdh5u66n0uv45u1y31zfzxin5gdjw4fe7ecs30lo9ov0ey0cq9ndx4cqr9r0jwusa9csmsvqsqrytoc2zk5av45rm9qzvj6svri2c330ig3xdu3h216n4dwwhfrhur09hbqlzwltm9gc7ale9evhyi40zrwex1rkf8ja7s9dvc0bc57u5ru90fjwsdcbpckqgbhqxg6532cabu8269qnz152yp6uhd281xgzwyojmy1l3csi3fs7x4o4vv6e2y2wy2zekfrztyxnuat1424jd2rmyq9n9qmqwlti3hcd4c03kea5cn6s0tlvtnywpb9jukayeqbfxwt4o3ibux787to2wcqtakmxsxy2xtz0ty8ikankg7libz5vffvbnhxsels6scbq11mz6xrktfesfx69b193zi0tb1ebmhxj897m17whevdjj5jg4bq3vz48p1h65i5zl6tfvz6b4mrvbe22slr071mbcpiqbmvl0s7zngs6qkxtv80efj1ytncmyg9n4xzw8uf3cd4i1267cmjdful17b4ulh0vv9ccna3614bpzuth4sfenwxsrwkhw36idd0h9yymvyq5hrfrmx7g48dcz2h0u4itzun3mbst5vly7m4e9kkbt9cjib72e0v3kp1k4apr79ena4jita1e9q1xo8s73qstuzwz29z9cgtzzjo6jw1syoh72zr7iv8u0a4o6feoeiasxhu2zthpp9jm3923veu6k8tm0n5a9u18l13m1uy02inschekfanzqkziaysxorcvzsat450ss9z7nxz9zvk3ks6k1g9lpu4zgpe8zbh44q1n0ompwja49yeyobs5vh6wm6kf8zpv4b63sxh2tayl983dvw2xp7alv2bnycszywk5s0zp7u2pt760bwgmunvtz2l0zj5388s9bzyz8hnk064ug64x3fsp6ub7qerkwtuv6jnc8m42ecosuyzqkqznwophl1u69ewkd6owx807a2mute55w846s5fzsdwzr4a134zniamkowmk4sw0kcgj3jkreqrxt1qj7er969scjgg36c5yusmafiik9jtwa9tmnhm7maruh0iqmn3naw123mbcw143mt741xwzs6jfru6f8wizr1243vo01jsd0seycciye8yvizds5794l0hr57yhhz7ui2r4wj117l0dohiqa6dseovqlsei93c34kcr0im6i8jp92ecyu1u4hf7huhhiav76th2g7f4irbqoj7biurx1cd4haarndpsdn9ekna4122nzkuusvxgd8k8pylfhlzo5yx6h76i82rocpmcevbn27euhp6yxyawehresio8ykrkexzt4azekqae8hltdn1964fpk6npi752e56s269lg6wxdj21p8r7smub4blpzti410d30ixv32k6hti00ztocwoch73lvglqj2zd9en9jmzlc5o3ui4zhtcu2yg6bd338q11d1qr8sho8oeanpz30pdh9ex0k9n2jnacaqsos95b7i847rj9liwj4qlgk68849w71opunayzq00v9gu2o2njn6lj05sv5621itrgkblceuwsb9a63d02yef5fc112lkreu5bfiim9u8547mryalbbwdsvhygeo65hbs6uq2opn1t6eyjapf05t5i1z8tgq90af9penfk934cbxsg2xvt14sgchfeb5rvc5c9y0wz8zac8dyvt38jbfq2j7ac8o95hbw8hadf5vth942x32j108jyiaczk32nlowwom02133cgn2680atx7lkbrn14pnif29pcfxb3',
                expiredAccessToken: 3825260413,
                expiredRefreshToken: 6366138130,
                isActive: false,
                
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
                id: 'ij1xpp96um64rdfvsizj587i2fbnwjl2r2qnf',
                grantType: 'PASSWORD',
                name: '75tpu8k548z8laaagudvdvkzrn7ftc90ykmr579a0vjc3vz2ysp72flkni11xebiwfnbktrgzpvtkxdeovb7p1w5kqutnv8b0bpovkyz5boz0xcvlg2aakfs7i07uggrtxhswr0w56qcohpj92bkxklgkqqrnuovmhrjrpqnfmujhatip5bn20zeufix7q74o3dk7lvpavbtsvvsi92qu1atdpx2i8p891akgzt72ej439nwg0m1lzot5ukzbrr',
                secret: 'm859kpvdfv3hhbufsbeoqyyhi16g3dn4e2gk8w1t5lxfzxua0ymewbm39hbod0ieb41lpg6zo2hejrn9l4z1zkz0al',
                authUrl: '15mpqzpa94ge03gwmyzndt9p3ar7cqgg9ax5o4rpcegut82mix7aqlggongewhtz0c2843ooag25b89ue2xugzzoaprycsshor2t5g2xadox87i3lrf0dsif868r6dt0w359o16bizpzen9jv8zufg7ai27cw8zeqjxajt734mi9gaas5cl0kpcv6vzuk967e67dmfqdexae7y3qv80cnk0j27q0890kspeqg810gc14cpr41gf82gyduti1s8094ekopdzb787v6nbtrem10nb95rizo6vkck5ikjgidxdx7e1kvh36eldqfgtd3d1g9wr8xabv84djo8x2lgkcmb7pxr34bto9n2fcyk8ec9bsxzz5lgqwrlsxybjq9u8s3h24kadv9blddjei4vme4l1c9unzf6flg9j9bo3qfl9zzwlnkjn0ape7j92y50g4ti6ykshyhfxbtoek5nd4gn8aagcu1g276ocqvdussgk8nbw57gsc0oo2e2ppl11057pw4x6xprebb485f8obmfvm14iqkxitrvka08kfdoebmijuk8ktl4ml9ll71o0b4juloq1n4qmn3sa0jl63mg9rb9dge7tk0hpb6zjup0kqa1kjuf4z26z4tlxcqusro3xaxem068nb4f3lnhyd3jlzs1y7wkj92sll8nsww6jlu3yqklnk1zugzxofhd2ooq3eilr1p81x0is9d13wne9664jd4hm70g3jkvaks98epqm5w59gsftv3n0isy0we41talzlcxfjtef99gt7dn3bpav6w6m2rd5ekyvjzvqn93w7jtval4tiittav5gw3aiawrpqnfsf4lqoui9egzv17vh854iu2acl7kmcdochigszjbs1x75mnuo922p19jfhfc5bwsdl33i50tsc04s4oz4xz74lp324dyda8ezq8r1pusje0axtkbquc6rma15b3zang5dhvk2wepw8eoj7zbfywsrim4u4e5b4b0v5qmngkr37mjrhqhc6fantv0mo98cb0bxdp0u0szpwjznjbaui6k25z6ajxuj6pupf77l401kluwu3hmp89p7m52tg4sqhd6pgb83kt7a2pn2l63l90gc6eus73twlfcfn72lsuqlkucrqaa6txglvokl53fs5mwebvt75gx0xw7e9u0yyjxiawulb1f7qfmz6ei3rshto706qdbdudr6iv1r0hnlrhp8uix8twofbdwh893gs4umtbuio8f376p047zbv40xwwox3ou4u7xg6uosndmo18vj9t8ut8w5ip25odsylrkki285pqt9wy0vslud4bosgg0dko6bqarzwdh3uhwp7qkqfu4w2go4lexjgt2txpk3inwemtvux6i7z0v90faujd97osbgb994r9l5f02mfxolfh0jhzs3eobgi6ua2653r1q8fe05b7cwi9egph3t65hnn6j5xk5fx5qzix0jeaazs18rrc56teyzvw1c3bm37fgtw1p8ri1w9f7rwewrf235hbyz3quqcxgvohys1qoidvfkcsmr8y0gsoppct7oqv1y5ar4y7s2976egn8m91xabosbjx6dzwq96xtoj1rra0pvpvx36zd46k76puvlzsgqrffwqfhb0rr0f0qz795da6dv2rqx72zx6q48kib3lk6bspi5zq6p25cwzsbj2r64ohqfufnnzfhvhs2foefwm3b7u9vuu2xnab1esjgnuw79c2300getiq6u0v3hv1l8app4kdom0cj8g6kpt8yywbf0pz92hny0fcns46mmmpq2svdbkqj7ag0l5br5sk7tzbvwdnvhybnkttvro1evyd3selwnv6p8g3nx4r4w9l4q9hmv8wk2nzvsjq230jjdmser4nrvhw5uloai3l4ki2jqnvmj7q6xavxh6z6itd7aqvzo59k2zaoxf4lryrrajkjmxq7jwfl9zdxken3eulogc5ad12ld8666w8vrqnsv8r76ixyje1hlqd9c0otg6872j3e43wgbc7xfnvcx1sop4rktz',
                redirect: 'vfp5mv9zrxuuo02wamhkbwnxbxb3mox7rj5akxcohry5udqrpaw7uvxyvpspwq61y2djzcso4fjc4vxsm86qr3o2ey9lz9esmgv1tbehe5aunpc940z6e650q3jr2ffqhxxkbjnds0bort5ftd9g63h069z1490tma4rqyzevof27uj84lin7lytx7x65vieiqw00swdsgdm2kfjhfdp4w7hfohx7b7tl49gx676knujaxzsu4ot48kh7lh414vkg7b5xzvnbr9ev34p1c73j3rxzy6ohds88xc8s0un0vhmgqkwghi5tg25ovp4ny4qpif1q5ttd0o98ociw92cfen6c9c3trrlo4jyz6ht3bzxgfspe4w0lhuordg960h9visqvz4sk1u4pdyyg3pync70gt9rr2eos0fd3kiuvc3zztsrw2w89lz2z7sojabcp8s9nq5k78cc7r88e8cahlmg3xt41grmq47lthokkmh6whpaj1oh2zszr75ve1bz3yaba14pv9dh3v5bkzca3oyuvjd3144kur6374hjrs1f36k3rpwo014t4uvc70ajdrqhsgjp5natyky3cu1l8btgoy2e6tmfgr6ko78nj5gketqmgiew7hfdebn43blaoqfgmevibfsfzqzpay2hyy5tm0c4wggcc9yw1hpyr2zxfwjhvzzaunfh16gui0d68txofa2jxsmfv199tunobd0ltedhl9xhgvluieefvyq8djmmlrt6jrmafypyjzxctva008vhwc1s74wgjybh3tkmv07u2x461wc5tz9wqkz9xmb7s27i4mtsov412cjx4in0u24pfs8nq99hud6vu138kqpd9xclxhnmtjhck5ha3iwo5xs1bwiz6l29s4wzxo2be5gxna6m0ie71dsptsav2od7dosozo0w6a2lw7ac5z3w3cwnmvm63sj4ol8uc99q8hu4z00zvejbnedocuk23vua68q6u6x72gmznbn1v3ycpyr6yteyc80b0qqy93e98p25fq26v6j247y4yk2yk8quonwl3edeogpn4rpxwa95qyr4cm45s76woviw4gak8614a5h5mljoy4ail5j49atfey3d8jnf9og4mbnba55honnzswpxegnfk41hjc5zsvls9z4twbcdqobzdm8sfmysjm6h0c7fl4kuhuflud40jf1w9vb6eus7ihpux2pnclyjce8iimdxj4myakxak1ojmsbdxoo4maf79pukywa0m8hzeoehot8kgvso98p6ic47716tphx60prv77mjfte6nbzq12t4di1w1liytmg6vl7jq2yznj6z9uxrg3j2rzi575c9pzac00wirwbke56rcgfwgjwllnslchcgmfhxne6cyt2gnewp0t57qvnmnlvgejtdwaoet1p16adv43m486hstxf4maxi8yk9k9qkce2to4u5p46isk0dnvg46nhbvftkidrlbv7sqnjehjntu29cdzug0a6cm52ojpkqneug2ypq5to1qk2hjo0qur54lblw9zd3n9pv4sx1dkwwb7fym1xwd9edvfyig7yam4v353zt56httpj4r27wt65vfg4tuuzytsibjtnb5j4faeuv6g6wg4ea4du8jdxymp7dhgyqm7pwg6dcpm8o5s6a8nsxmggk95vr9june6bmnjh57eepg464uznnalo2v2qnmlxh2hvwjtkq5d27kuz9jt1o5i1t010n8ugjpws4uit6izdf3wjl44ogt7uqljkkdgkw1m2h6tgga5ratb148m9knremc00ls7ovhcvhw5mgakddak13fbmukfz119e3415exjy9ryk7u7udgfo1pmlqmtlb8jbe8xc92xngzyosotnhsmszi4nx6cmbpkksm03dh8oa6w39xnw01533bf8w1xuw5i6iyymwivudbstwbcm38spghkdxj907zm1qpm3kvcwyvmhn4ujftep07d98mo784p87s5d4cpyg1bi2jqezlt55kiariw1c8oq8zgxuleu4nbjw',
                expiredAccessToken: 9271684831,
                expiredRefreshToken: 5713586505,
                isActive: false,
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
                id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c',
                grantType: 'PASSWORD',
                name: '4ee58wluydrjcxo2x1vxk8zjiiwuzj6iohtpjkm3r86x5ehn3kzxrc9m7o7bhto2sgej23ua11hyech8kyx45rhv8x6fc7hbt6hspwsr1ip1jc1y3quxr9ftrk3o6cvpimf8kn6b1u19mew0m8d3fbdutieww6yrid4lvh9euxxgzhjrqxnujav7v98dr40p4lwcjjffhkvf6bpu74iz4tsawzktousxsrtnyvx5pmyvi6fdrtzlyqn6n8fsoe5r',
                secret: 'xx6ty07e9we298aswxut3s4m8vzplg0jn6deib8hbvp32rus1alh9pt8xc4w8aobccvdwjv0bp4e8ypwo8d9inp0x2',
                authUrl: '7gqs2s7dhj7a3qxer5za91mlvbicd78mskkwle75xxezuhw45octmqbg72i9pvvfp1rd2yqlenxv4h1nl28zugyjenn8sgrwd5tgu7nmlowqlsin5pzh4w7dciztljv8aquq00an0zkf6hi8i5o66vsc6uk5378mtk4yusrdpdwzs9p04g1l0rpkac8nyh94ru57qwbw2hed2tp05q54ngd0buxcbv82ob9g7t6hufvb9xpvez934a6o09myn5pqjpzrq39xmmxxi4ro6vbd8ai99rou2tqo2ou37u8wxasnp1h02hz5qyu5zadlpbaxczwkyl3apmb2rjcm4ycag8135d2f3fs5wnl50bi6pmwjglvtbnpzak2q7sxoluoebcqybyao17bwsuwvglgmgpy7dvob1olxxet69ttgytqscs5oj0m1nvm19bz983h0lh8rl9985jge7zar3dfy5lk59beggqkqdsfw6v3sbp8rhl770s197n5b2pw4rwrylez3zme3w7z3ne2zpjh0qghn45liwe9eftnzku7m86p4auo4yutodjmuhquuv0bjy0biubmr14z0qwzs65vxdgmg7waxc7slryin4yxe2mcv3f4rdwx6jykfmc25s418tux6lkxnaw3dqkusi0nn7ajlcrbi7j6erd6beap8737xs2hqe5bo895uw1zbatoxol1unk0g885lb6q7ueectna1pv3ykflr2mf6etcvm0mr0asptv61fu2j6p2oongulmhpoyun1qg8vtv6hc4t5gq7x76u55qubgzcaqc39u7fvzxzdr3zcjsfwhtrxka5nqrwpppa8bebr0jmc3frr0xp6w6bkhxsguxxkc49ysc8wso1nbjnegwo91mv8b7c6xca6rg3cmozhgp4p9vkiyly9u2zdkn9gk6ds9gwupdje6aablp1kgskkrqmd9663hwwu4swwopxacnma2845viafkth0wmjx91j3p6l6gu4v4vsgc9hkfcvkzjev2z5ejh856g5ck5xnc5gwhecp1r80sb5zz60ktgh1rqh8ve3owll9tly6b4cd7uwk64o5j7z0ws56z3mcutdj4q1n3cb8fktixsedpqtmy0bozp1koyg9663c1qaqacs2cp1eluo70k2ofnm33gz75efp7mbgxo7vnxh51epu50cm2vorajp1b2xzdcuk8sxo4qsnwvhhmvb2pnisi9iscm8whauoe4yt4di5bszlf5hrty6rmqlozfbhicve7e11ds700vfgnji05m1m78wmat42upp0o8f7h88u1szcb0no54o6dzmcfbyrxwbmlwei8irah7kcdhiqoa602wl1gq80mb15xt3igp8t3yoefot5jtcaaltajn2vncnxpju4zwf5va0llfthgfxpv0v65g5r05xui95xra5n3zyojbxhvgo9q2duwt5npl4k350bqh3ad4a36mio03t644cwns1s8di0u7g6trqhd0pan7ta111hh376jgcbse1561dwuvx0pmfp5wi3t0eeyc6mv02p28dh4sprnazmcqkdspz9gbfo5559jpwlpqxyhk87l2ty48ehg3ab6sgry2nlnt08ijguhr22upupk0dwumk2ewjfz47iqzjxh4dj7gz5fo6el0lih4ccvg8nmfvdmphkx6plocjjf705z16lzexh7w1lsvo48f27xq4b6hue4fd4bhg60uq6vg4l4328d42hivmazz63qjai1mlrpnuoswttv2hpe61bfspsfut5o3u4na66qmz62h83bs3h53511xxsg1hdou8xcn1nzvogwu6rnc85jp9myauwzmc9jb1sqv6b2n2s3ei0lz7ujbgswyzarvy5byqq0uooldvse3opaf89394bmo050bbnycuj052073cbdtg5qdoi4n6vqi2ufw0m7ksf7ay4taz44gc4jd4rsbzbj32j726acujw4mx7ziimzcs4xsvko5zxfmu2wf4f1afpkepy9c33elsn80jrbftqbed2s4gg0ek',
                redirect: 'ryizxo35oexsl63ya1bjyj7amqf3igmkzthxugyqqpklj30ccs06sqpgtmhc0z9lkt3ibyylwfvmujeroc9wtu412kk6u2t0ne214ogjn9evjs7ejl6mw23rnfv7pffun16h0sxgapolmymyq22m2x3iyfii21lttwo3ha4lwsrn2cyu05irjdwnt49o7g0gok30ag688ebrn0ozvbm54ldbuvp3rk4ir0oeupc78s3gacf3n95fjo29n84giut7lu6pmj5l0fc4qutvy8yqgdizdysvw43gmw3oifn8cfi404p08nofum0n696rfu6g578vuzqkp4knhvyqkokn3zdcztlaqafsw80vm6uegut6m397fuxa28q89eibcegdcn0gsavwh0izg9z2bxeclh1hehd3pyjc7v68xjyceap6j7s4x71t3cifa1e6fm3z7k0ejq0u9glxkslqtlj9n63cvavaf35rxtmd385ushxyjw7pohnsl8zpz5s4u6ashzhtamzz8m5judv0agel92du38pilsv9tn291kl181lpzlhbxjgnoqvmmwu1radzglrq20uigu4lb4jfyzpkay93h1vcdgt3j1mo5nkpzvyjwnab12pwv287qxeei73wrho8in5mk8cwdu6g7bpzucixpmtffwy786r9a7dxozkbm05156vnobpex37y4ed0m0z3gmu4t64z9vfaa2q4mzvw2sb434dys0v3es0pb7a984j003dw87ly4kfkztyy0m5q2tmim795wajlqqhwqufllq00zeiun46d0f97renj45oevfsv790rvohivvtaxzm7318mmu5akyt3en8rwro1mydj0jkoavgq5asmcnd53tatv66qni9bmr40wfbyxrhjbygkf41jop6x2c89woy5o4qpzkqbtzuhd30i7d0mfdq63m9kzprzszmc3jbtafpmjcxrkiytwrvb967el1vs1uphuo60wk9zg2cqt53xbve174rzw18akcdwnkfilt12mhve04i97ckdfqwe1erlu3z6ud1hg7hukxxqjevw5aco23jd8yugvud66g9cuihkaxujsrcc1f877uj48zrmdrgfy80ns3ljfnsk4xr0emt52xhgzd3vsbru902lyc3xd5hr59gg7pm4yr45jalztdusyscebnjzz2dghpxm9aaurbcj1ubjtwhsaxjd2w2o24721lgkj4xt0n97qrl7qy5w5wn0jtcdx8erc38lrgnoebalhv5xlcgydax9xqkg0eqizvksr6rrvxuqy9lsvio4tj3mh9osbqftjthasomgg0as94yxa9krt9z7iywawk6rwgufkyh9fi0slyia51p4dcffqjrirxg5en6gbrh0h18mn1vxg8tkbkzww5x40efnugz4fqqflxabf7n8orq1a8ic3mvg5v9jpf8mgn97gy9z0kffyo7vanyovbqoz865x9kipjb1eol0mgwxnz819p3voynxoh7gtlbk2gqqaziow45s4b3es3evhscvokfxasrhn67u06dvecq368v2h02ma0s3phpvrx98rnowurfxqp372fg2hk50t54llaj65a3se3w97oxzxfnihcm0dxzr1nf7lgslutxzkituvx3r4djwbrsz3o0hvknuo4dgrvz40iwcbdk5n6nayier8js9oks0zkoqrdr4fccncewj6wd2qr8l8j77yy1tfeqezmpz0s3va907ck362fb2ls14v5axs95rwyhdxwgvjlr19mlnp6exy9wgeje9krlnvayk9lf7kuj2chf4htnxxgwtmhtcu3uoiibws9wcv2s22fgpvyn8ase3imqp95vm7rdyvxdu1skvyi24nazpkv6o3y9xgzskfdqf3ce7w8umcvqndctozkhzup8y31mttjdsead8pz6dxxyl3zx34gkw4pgab2ookkogtyuh61xbekyls5ugusjncefg3x3btllt5mvoay57pyh3mp0klmtiyyupv5ih6jdsyu19jubw7n6cct8bmegq',
                expiredAccessToken: 4259380523,
                expiredRefreshToken: 8680054131,
                isActive: true,
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
                id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c',
                grantType: 'PASSWORD',
                name: '2ghc90rs7qgwr8rv01yyntfqxqvj5xow1kdat6fiq6y73zwdrbzcpgtzfht4e9ecul9iz8h0mjwp3iuqfrays66217ea3mn69av9uxt5rq53eo8ti5zjdbt25qgyulue4tnkk6fwhfbabgl7cn5pz3m3t8odpbehwudn58qt2anqypj8hglz6c674e65zxqtyok7oaerqtj3nilik9zxc3ba6ejfz152yvs2xria7gtg3bce3ljvbo88jg68xhe',
                secret: '76696x9c1vexpz4ab4vpee3s056gj6exahfwf296dgljduidhki05igihybawtr8xjwz23j77bzjx7l8sxpbvuol4rt',
                authUrl: 'vtkygvvazhpa49jngey5lzdjqinpiyw9o99bhq52zhskmxwb4b16ip0xn63d4twaqoutl8vx9bfc2gt45jnecs9qh7k0b84cxo7nszkkt990cdjserbup9zy0icnb8698ezg9908qk9k8zuawvsviua49ldf619ygfrfocmwpsira3x3pk8rhb1wzr6iuwzee79bjdo5yg3juo3vyf6bx38ll9dtr7eqesqm2xoz2u264btttheqwphveo8zmeq6lra7kogbanw9k2h5q0097yf0hisise1udfqn59y5npsxnnxmehirci4s0za2sqe52fhhjp1xhibht5n1weqlpk6huoct4lqet84dx5shtp3wteckp2cciunemhw4yzwukdlyp8ifkpy7nl887sa0kni00lee793xxen7o0jq1kl6p2j4i0yjaic0ur35r7pp8hc4rzwv72sa6sn86hwh7anidc7o1gu8n3iu8kkypg9lenem03o47hf3glortvsco86eupf8n097z0owhwovbkhh0jomm4paj2m7rh9yq54thyw34ss7gsm8eu6g44o4yp9pjlbq4ul3cij1pukye5r1kyxr48n4mu5u5ljx90w7gdyhxvucaxvwkgrf8yxfonipc5nidqclwdkepg82c5fo6qnkejudxc50km6f1nrkmwa9sv47rjfvw07rzd05akijtg508s2xlo55oe3b3hjaqk84rrwjwodpgxy7qli2x0l94kovpbk5cz9o4z2n297az6158khoy11uswe646yp1b9dq1492qekpi0f466raakmrjngib3data4uzotvcgldqunq4udjtsvnvx8asvnxfbjist253wu72uwny87vauxrwcntti7axiu4mckvzgxsjtzaqeaajh1w6caoev1vw6ct7rars6omwy4ikjckmcgcjwl3xl5ruwra4z6vj45bqhp1kpih7nxefr51heiskpay3164xyp73or014dncyw8x4v88gxm0woo3b3fbo837tf8rgu3jau2krs8lxqpaqhr93jyipko4yfame506lo6xz2p5e12bww2xjq9scrn7rpwn7fgp0u36ncogim91pb4y5tu85r29ff9uz94ps8wc3halhyb5sxp8e5tbla35o145sx43l0jfxshcw947yqzarvxw2fw5chj1e70do5hw1yhonr4in7f0c0tyg590qnm7067j23k6m7ciw4iboy98xyjcx2dez0gpc2s5m934qnwgp29ea8spkkbjd01wopgmxei2bgqvuhjt6jd1ops84sg8gckk4reudgeb10uw4u9g9sx63c8zpn4fkzerlamj6p5bu9l0v5ylnrnzr3006skc2t1ila63glt7sapjqcc0ztc12h1gjya03olklsga1b50suub6mz020py7a0w8xov8wbwi5ttgc1byumbzh3u8ryy0qczusmaogyjqp2atxrr3dzi4iwbvh0mq4i0z13xh5p77hrb1xosxvnvbdgrduku99hpp97fp5w3u9i0uchrm1tez9so174r1lbpzqjb53o43no82cxso9oku1fswzs4mqatt39zaq7a4yuj296obhclsu3kfgnhgcewpkdq8cz9zienwmpy4kxuwti7zaqzlnnacaqz3jq7o8o7dxxoxf0ajzztt4xzsivrhpn4i7uqf3qqb5jofalgv2bvurpa5ltqmhvzjwbodahse2j147hb23x3d644e5ha4t46ahteh79c22s71dwx3rckzloblw3z580gt19mb1cxvvn8tmfuyx6oqzsqo5llmq3kmej4lla6gjm5bh2xfcit5m1gi0nadufqjp36uwmdxeu787kljj22ye1on7lfw48uy8q92h0tted6lqk3r0w5lu4vqd3v7xqn2ob48ml9iua9o4iqzrd5dyi3qen7a9e3wmq8bjwiqpe2qz4letmbwbqlx6syyuty2shx7jab8i7d2k9ipr39ccl5zcuetckubkjm0qx3ns03kekeg640hdhs9dce6o',
                redirect: '85kw1cbzh8x9vbeu3tmi6v141surhco7w32eyykprxj1hdpiyarz445siexk1vdqglw9ggf0i8vbqr14f863330tev6ri4e5xz9jp5wchqftr8cbt6y1rym3knok0baqhzaakmvk3ie6e5qn2zc1ome1dsgvwq8fqd2s1ihhzk8oes33jq90enjke0r67ookw0uqg681yztym87s6k6c7nd1l156yfpbgpu6bexpl41mhinryki8cxq33tsy27dx5reng8myyvde6s2lbrf59kp0cjawhdl95xo1ksfkk7jo3u9e362jx02hrunplmqhtm1budbwf538ib1omd9krz8ygo6e7w1ilaivm7linz5twszi4f2yv7tquqq0nzazbr3cg5m0q95fgv95zihc62x9meh1h68vf013z8u6qm8287gnb0n6xjheo1ryk04ken07my52u8e40f3fatiqqrkl7d0uitq4cvzpu7exwu4jqv0z514zw92yr8iu6zj3o2xvjjtylex51rmc4icz64rqcncs204cbkb16l4nbtulldi0wdzyrqviqwp4mwnn85gvzgvqdjh3qnlhvdejzgn8ifitg9td79dc7llft3lw60neisqn3x9tq29f2rthlqendzww6jydptojxhm5e93w0uomu4k8hzi4a7l4lw5xu0kts5ywbx7lmvos42oov6rfoykump27ppyoihvkiydzgnixv6da74pisqws6gqkoqtzg6y9iyl5yzaos9vvsyfy2oqh6hwa5wekfs4uxhxqas2250zywgonivbkivnkl3zbcb3gkmftiskfb6kb3iuwee03vxtxcie58tvgzxkazwtjn4repnwtew9b0hx5lbw06f357tarzj1aqmy5lg4kj1cr9cf1yyqlopom5pt0xs88c8srujny4udtvns9rqft4bje19yrvfj2zw9xmjw3yt0zvj3ltl4ueirpaq70ix8sasvqsqbh3ho61x1p2mzrnu3lzmtsekubp3yw7fvcwn50homohavv9o4lgyayj8rjiv1rmfobkvimzanjdkvfxzaxbiz80ofr8xim3ksa67us94qa9n25kci2owoq07za5uivqsik393f32dtlat2d3adepdnm89eyycs41dhwn1sytcly5ktlatxaa8amvi419jyo1lgym8zxch1xhy12kathmo8gqohwibk7fti3znsfm474j4tfnst4mzk3ewnerno1zzd22a235hmok0rtpapugyr4s5c8s8rwgair5v842zpadu3aa3qai1wbdiychgwc4x1zxzevmywabzx5me0hdebx65gu19qejnr5r6ytwqimwic561h1mcnn7uli1bvp5loupji80t8aga8ude76iue0gwo4g4enya9p0py6ezwprnlt47br5bfxd2qgyladuavfysmnoi8w3xliq33r6nnjs4f2mhp84m1s6j3ir64iipsnrujjlb6oo1eq0zsnalnua5rkqwmojmfo44zfa3mxr6tefnivel0niycz518kw7gnf4yt5owhv78fzt40wi2efotf800hnom4pxkc6qar21bh46sitpmbyiufekq1cvw9eocflgi9s11ey622g1hbsnu4mxvllul07v5lp93vqpgc1bd7e02g0iwxdshhfkeq4hzb340gf3aifmei6p2aqa9yura2edwueergi15rya7vbi1nbrs094fnbacof7kdt2hk13mm00o76oidj0ynvl9uo9sl52sx1zvy0oz4h869wtwg0jpcwybtjor4nnzfbixygl6qqxs1vijxw96wxqfow6b29fee0tautwcligub83trus09o5gjyflea9467mxvj2a70f48t3t9hikftu7o4dx6kylbjorbhe8x6k0qqbxz0416dst93ny1od3jg6ijdm157fv8oyxk6o7cw6x46amqa5egn0p8yuc3or7trpa0miazdplr7q5r057oker2fmuyykz600yl62ohlem6xnbxm1xfxhglf0dzi9ugacs',
                expiredAccessToken: 6106626003,
                expiredRefreshToken: 7046096140,
                isActive: false,
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
                id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c',
                grantType: 'AUTHORIZATION_CODE',
                name: 'fgr1038x07gj8kehsyqhneping32xv0x987pmc5wposwsa2r6znrrmxalxzrf8qrrnmb9apzno31y5v0phpyaxtx0qs4fmxmrc19q5k0phx6zf396mf4cutp6fs2zgek7dq2uooycewncqom0z7tt95y2ah4jzyfmurchgizor0c8i1v9dx6n393j47mqc4b39biykuzypgvk26sibl7385khhkjufbj12rdlceyjb1i6br6fizw2vje8qedumh',
                secret: '9g5lmmvard92kjm9lsbhea6sv0iwjnixvk8hjkp9dkgowo0oaq8gmyk15oo4v4q4fdqhm3fcnq08k1utntmvnr0wzj',
                authUrl: 'l6g98qe6ze3g36ma1dvvo79olrk9sarkkkmjez1kapusqnsbex8nanma3d9pzoakx29twkwdguxa1nvmkkm0ck474x37soyw5uq5epy0vp0e5jp7nfqvqbb37ilvy6c9ltbqwwcrf3a0g50a2cs2uh02mj802479augmuqwji1bk433jlrnvl4noecz1y5joekzqbr1729y20g132j7d3nhjyyatjiof2p6n138x3boc3vhpjpabmxll2lphn3s2domzjr4enl7ls99faveescner45anm73bkht1wwyt5z5cay7pf7hvfmnp62tmyt9lcthkp48lsjiobt9pgalshwenjn8hee6jjkd1g529d1tgqj8dh2j0u1vffb4qxsz1kyl1ngc4ge3cxjpjfmlt05hsxtl3ucrp75rj5ta3k6em18xv28x8a36oj241bd42enj23upwza3hk2xj1dkfu3m766wmmw00h45oqkpsyznzspc0w7gq04b3gw000mofxnbw0x9rlb2zrvnh2l3p75m92n8qjy6hvstq9nwt4oqg3dvp3137divb4oa8totchev23dqs4fh74tepjum8rwsnrwcsnyof6imas6sae14hpfjno8zg242q9uj5le1y7ohja1i5tytsivfvwcu1ypxdfj97mlz8td3f312vng58q17bwfk103fcwezb9aae6vcqypbhce3uvhdas1fngswxxr5wy9c04u57s99ybd7tcn26jhxqp5ojw8cpvkd1rbxiw2n9fz2hzdusm3zhtrlhco8ib5d98jl7i1u7l27g7jzz6kwucefsqgtw595xhot0jg9wcikxk8352c8y1kik945f476daq660e7rbp1uz1n4p6muijecwqt2whqck0vmv0um02agv1tqgsdyy98o3y0qe7mndt6rylo97a06ly63ak7opx3vmaxq1tyk9mcryd65ys3lblcjj49i0nrigvhv4kwlc5gkgwt0r97g5jvpl8l748556oitfvgsq1bw50vbx359mlg488blhdk59uu8x2b4duiir7j3qubq0n90p1s4l27zvpibdwvt2jss8fo9j8crgsnzh7we6gwkevt15ecrfijb4wjf3muunly0uc7hzqujmv7wi4p6sdchm5c78oxzmly1ttd2gde9yy4s4otfihtrq9l45qriwu5kn7a7syovre8tcj5aupsxklcepef01otdrym1jt55osc2gbzoozvvjgefm72pw2kab1hktuy8ntv3w5n435dxx2ivpat7yl9rxatjz2duaymuajboc82zoiwqop7nzz4zhu54l8qdyzg8k0ca0agmp637vro6hh4smkdkhqxlb3i606ntb4kroqmzwvcn9klm946luwntzl387gy1nhlr3qyg0g6ns67qw14a0wjua1djsjefs7qnzt8tasvdblf86zwzk7j0re92lw734wzgaznfp0zdvjj143mxyagm2rd7toy8e6dolrkuk0oq43699591rzrt6bks8ifag0kxzq2cvs3bjn8verkmubcut3klgp4xr3q2567n3zq2ash3a178redvxuh7n213bav726fb7r3wwqregggiayie60nq3txw90hx4hkqc6zshpdruly55h8h2tmhn8k1pjfw7g2ob6xupqp8qy7s67ddht2s1sy5jv6h0vj0jysgc4uqackt5kib62z3gcgz8wzmorzgszcgjiqjxm081yznps4xzrdutngsk3dt4cjog4a4p8o54sz7o5mq6wk41ztfnbwa5oehct273h8xr9xh0mykwzd3j4g36j2kq5gulcrot2grh9d2bm1m88spdhyd3t2wjpyjhb32ca3rc1iv917wttrwdfhd7cer12gdxenecvmawflqmaek9hufj3fbytzyep1ic5p2x6hgnpd4ivrlzvtt77kcmfii8eqh6qwe6di3m9up9dcj3mbyuf8j97lmkdeann31qbvckhh608elu0lfdzrf65h4g8e02j5c0qnv3cl2m33ky7yr',
                redirect: 'c8eqf7265swxz859alzt8pmjn63bq6k5djw8aec7gwcziwfp9dch7c9kvt7hzvvqxk6m1vwopjvq3bqx7ecuhwrobtgu08bzjnokix720r4f7n1yaaahx9ja1fdgkalra55k3jizpkt3uss5ofqo3g8vz44x37zdk19kqut4is7gq0svg9g6642mk39kdfc7wc4t8fzr82775s5khwwuuyquta1m0w8bp77kce50imwrf1sqwwtkrid3lpi9qayqby74agnltjv9vcd3t3czc3lhekvyw0un0v1egnjzbzuvd84u53a7raf5qld6zyyjfkb9q8ies3jtxdirog3skg2mscr9puxebm76kc5jx55nicpym3m52ngqvfl5hs2x48resjopa62xsz00v46ei51h9f17mt535padvy4p92ezg20mn5del4u7zki0ik9cj4g18b5wsrwp7az4bl4wpp9oyeafoyl1fagb3za5w80x7vemjwqsojwbpo0dx070yludaxui9t8a7m3wbq9ir2z8z2pbz4ntl74leqh9yz0hoyilezxbfnj5t1sqf3bgeykw1iwcb2bt65y9piyhd8cmkq9b9mm2s3z1dlmtb5qyllnrqp6n1vlqom00fv9pc6kphxp6r2nstc18kifbwmi8nmlgmlyq8h1rjnb5gn0roxq8qjm64h51sqy83pkawnt02r5dsm03k1fwm35k5ddoua44qkaapnax99j7vxj3ytxprkzr7cd60isc8h0vl89acrn0x9z6pwwg9i857c7jky3y2sle9uogwr7aj8lhr060lt5ut4au9o6jgqu0ze0je4odagezt1foozp289kylsg5x1yg1cu50xt33x7lnwqg8nh5ssxknhcgoq21y2ery01u2d1iy1sk2mclcrw6k2pf2xno7ytnod592ekia9be4iw8efqhymr2mb13brp16j4jhyx93anio1fwbrd8jtl1t66ksac4reb7xy6u1tmzl6luafhbij6e58ztzndb0os7tmumyi692g95389g9evgb4dbiqysc6pnus5ubsutm7f1bsphd347vafvzxsjma1itysxx7k114c6c07lr6wdogvqgt9zncgj6nsbhmdftizy8151muy5q57ap2566zjtgxk6g7os3njg8ol40ke0x0fokvu84gbxb4nq331oznxajnf440cfo08vtpfisg6uhedev798n45i6imfws6u3vslnto8zc5e4knxw5a6qydbuqu7uj75jtgsm3xsa1jayv8tdb7cvdw9bk64bkei1wjesajkrb5ne3znz95ici78w8ei7490hbwqbez26gototjdc1ybctwphqntr07f22or1xmsxceep637xzj5ctqpods8zknoncvd3czhd9gmn98rsvuacscvbskqzfcockk5i7ke8o1rbxhpl67svua8ywyabcym8skk910vj2yf43pe3fdf4yhe1w0glaqdb8udplgmhmxmwdltcfxls5hmna8sj4pehf2vcqzy1s1pniea96lzogdut7f3g1j51gt5i9j2jmy79xqhq2drtay0e0btrzgpar9yly0kmvp1nup4ro4za39bwdsujq7h4ihl23xdkinyakjdvehv9yumoond771wnl3w4btgphje8spbdl4wmj9n7w3ukf413i6v7ams34j7ou74hvukto5n8wyq5bst1jjcphh1qjiq7bjs2ln36nw970kkr8rkk1ru5jof4na2c136ma0lss20721bt5tingkux927btohv7m4fj2lft2l66qtkeikgvhuucmeqdk6tkgvp3cg0c3y0vpmuptyjru1al290s833sryo9xntf8briuysjmgxf1vrjcvmwhwwt10mzereco9vwuh30mrcgmk0a40tfhc6sy6v7aasovohvfu9h2xf2tky5g7azrdnwdwmvp7muhnc4ewwtqu10tfsqpwah7assjhtevh2brkwb3h10zhva0fczzysxpq95h167juu93znf1poyebwe6i',
                expiredAccessToken: 7808591376,
                expiredRefreshToken: 1791562704,
                isActive: true,
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
                id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c',
                grantType: 'AUTHORIZATION_CODE',
                name: '3qkyd2cx6b1vw24rhxau49wjq6zubxkuyywolw8o7baua6zc1p7gkgqqeqfkhnjd61oq9lo15xv3z3b4iua9ydwmoh3xx8eeaoqq0myonfy3g9qcmlu52arowb6h1amutyo412x3em6jid57zso157mthy44cezix6h9is98li1ddwa7ysonup5mcainu47wox4e4lfman08dg7rhn7jzg366onqznocxo7mmb0iyoadr4gz56fsmrifkgsiorn',
                secret: 'zuhohjacbag2kyt9zp2g3c76ymonml1mzxuvgb6n64nftfiywkx7d2qt90lvw0tq50oz9zvjct9u1rf3bs43q9k8id',
                authUrl: 'tepm5zcmfti5kuxx2zy54wyct02twjs5nipjdzhuq5fkx7uxvwsh11eobax75c3m3nq98w0a0ti6tkplnkcdx3iso5ym0avaa20oz79ag6nzuh2g2lexwqdvh6cpclvf2ptl4kznhzdwk37wbf7djbqgu6whrx2fgq800ifi83f92ws7mvacy11hewniamgu9xas0duzc6b6qyjey3s997mp73c3zuumm6xfva3y5che1ac64238agyu1hlvpfcjo672ar9qyaoinggdag9m9roq17gavavhj7h9d0n464g4jhfrm6wwij3ueof864zrp73b9b31tfabcnljnkldv4n2xjirgd0rs5yreivkusci7w6fg2ehxqhy1o8p1uepzvfch9d9rzizw5zmrhsib0g7t3ebq928aorxjnl9evky0pgx0azme5jb2jym5k7ymlxik95um76b21wo07na7rqv1n9d738pr2n93y7ti5rhc7ly63ynl8mjpf38f236eei75uj5zrfv3ej1jbndida2uwrm70xxn7db3emd19yxhggeg4s960rc1o3hqajwoqa6r9h6ak3iykhb47p1tzjr1adb3153ehhu57wwtmzrr1yhx9mxq4dnva4mwc3bduncez6ko77exar8osp3cfqvmy6fnfpww0lnxko97lsvcsfzp956ubw5hades5cxoqg71qabh6nf93sgex8rp4k33ix2juy88qiobauyib7kbxl41m3fjm3f7m9vrxlvbpdbfjrjn1opkyqc9f7x1fk8lklync8u5ejiakrtmcducs7s6904qnpa26t09riu7hdiy0ykexb1oh21ioddx3vriv59t4n3uoiib5d3ktsi8x7934rivk6d7x71pmai7oaxxyof4z6d5j1e5fybdjnpfpsxizy9ax508lzcsrkd547aou045idhe4eomn3g8fe24kyb4dyl3wwzs8ex66f9ovs9flu4e7t3fhj89qc7hb9y21uqyemgsotyqoiv32d5xkfzcgre4eh4nvtlo3lvxgqojj1gdxy0dniv3op4yfmt5vz11q41ib9xh03hysfruyifg1o4hx3hacvf9dcvbax3u4rqqur9ymbkksh5hwdd3pwlxb1vv9xe3y8kyj9cxn7p1vgocpx1sd1b7cem0txy26spgk9p9hc55q7mfao6fsshfzl5fp1q8vjzw1bup4j3i0p9m4fcxzds75suxtx03ektlu64kw415f8dfbfiuv1rrvn390nq7jp317t75756wsnbr0xhvau8d8xfgqyuzsp9jks247ej0h7x6u49a7t4hazcj354yhzt0mt5854xt7t3fhqdfuxwt0lbi45qnrtx2t7g8birihwu5tcjeqscbdwp58aixwcjftrx4j9yw5mo1y6qps6yad5rz6rs4pz1bhvwk49lgwsgr9zzdh7pm412ingp8v2nbb9iwt0mjf24grpnki44f0724lplu91npxo0p7eahddoxi3m7jlifbgynqavlcguq0jvj6z1e0pypgh0qwka3q87guzxob0f7n9ybm8b395w8c8h7ppssgg8kob96imbzsi2sulhgs2gx3qxx3hhbodo6nuz87yv0296d7gtegc6yvfogdxxr65hlav57zbis7z8xtxiabf7t3z1p9nc28x3w4ta1s21at8hhn3f4lmumjl23oahnefh4rv4hv3okrevp1kctdsvyq1vrxntobk14epun6i7xvzot87xl1jlsrvmgdodm98kq50nninmmx48dr1u8uuey09deqm60v4b7pz8y0oa7bfbqyjxcpzhwbimszqlfyvpesgqah4nacj2w6nb7h2lvfo4pbjouazs4n3g96wcet16vli6lqrug3d8a2nuw2pkp2vcty63t9h64yfupyux0pulzcwirp5r2tjr1x1j10l2ma5qtqgq3ah6m5mpzmugtvr47gr9gzhm8pse2pj8rzrwl2g7g6gnw8713yr8xj8n2d7ue8wkyeq4sdmuabmwbk32l3om',
                redirect: '33lw65fv87lpnbxcs2yfz5tfysb55occ2zet5fqem4tbweop7aqzybsuudj096ki57chmk0lsr71ptfw12r5ifjbtfvvjjmmzqb38jok4ku9ap9ctf60fq5emva3uc0n58l0d4j2108pgn1a1souvysa2pwhlgqyzpbcba29pg0aufrs3ay432ryw2ymyd0jedr59zidsjgp3564qwdtn4zxy5dufd869azfc4s6e0gu0wov318c5qhmogtjryzbmhyd73z7c5z5ecgn8k5roikrtmwsfj2h45pqdkvpbbbspz678up98nkucw0s1fh8u6ux6oiq8trbb8skb964y7u0xexd5wqvb39517kf8xj1l5a97qty0c4jlyl4x6uft0qmblqlma1cnu8ip12x692l57wzdx33mbw96lwlxdud32v7rcpdy5vxheu4c7eba118t62vobtnzqj0em2f6fng3q3j5cp4n6odskwji4lz0xupr1kv8kgiw3zieg0lyzdkwntzfuuzjtf5fdhabt54bxhm10ydml7o3po60eow7j3wpse3afs08a9t2o4uhh2wvaftonjf9pqtjzpr03p5y4ix36jjx11aqgixlibmkddmf567mpc26tsw5lrl5pcl1v2pgihoiwqxo5zaxscaau6w6qfbwtg190awoebaz2f82r3lhk9v2wq4fwokt7fy5rz9u8xfgx2t1r0lu157m817tzwugupfqzedc9whi4jhoid5y3escvazen47yrsm4gixg55o5lrfl18cgptce35kb8xmrg0km25hq75eqdb27d7gp5o0837wu6x1jmxfvm49kyj0kqu9qqw9s8uwwya08fzdwbeys0xmkxnkzjdryzd1hcyjb89a2vxzoulwon7an0rofcziauqgnqsut0gptzy904y44sa8sp072rkyzasojlqwayie2djzugxn6kbpweq261ncmhap839h23sxdiiwkeb24kmfln2g9si1xc4wki98pkj5pgatdu5mfxkhoggnh3a6wy2e414ohy5ppjlm1bfh1l4iummenx657i2h0tqy56mnq73ypye4n2j6dl3tcouapjy66f87322zsf6dr66vxhri9xbfdysyeoog7qv6l8o314z0u1up1hjpgiv2vu40gjdhj36pdinjs3etcv4mpfktytojchivs5su4b9liothmi5if40t4d1g2ar2vg7xxopx0k07ytifsvv2ienku9kjkztp98uy0tiwedj3leetz6fuuwnor1qg9s6f9w9y79jfp2ae1av1is4amhm0ymt5io70egmdor07ybefna4hfkusqxj9zkbf6w2uv9735nhg7zxyfiml7r4fibgqxizmng8a1mwoitpfw1xrkgk2nidz9hhwg09ui32hzm9l1a0i2lmqp903iinhf9my50qj7d2hah3r9pvn99c1vkgn8k2sbjhvroinh6h1l0hnh5ogm6alu0aztv8jgvwqeb4uzzhwgc1ws4hd483wvig8xc8hu86w9xv070iwascsakggsziwca7tnfein1ojdjkrrku2b4beou5eqpzw8fvedand1nhqa4vktobr444hj9b6rqg2qm29edd0ukwcoskrfyol6ef8ca87ff9ge8td7osbzatrpxaxtj1mm8zy5pqc1o613fczy9d3b5hta65enik2d8hrv9cebl1ls045hvai9r4pvs7awvd5wdo7l3my38llz9ras99h6v8bxcnycq7hg6muynmu7cr7s6yblpj4zhr9lhjnfhmuzgzd5qdsyky4ujtw0jvd3m7kjdhtcjcv5a3n1g9x6ef3xldpguvi7ev1hznaih48dlre3xn23nvaa1llvc9f8u5amnmtf9eiuzn3ohwb4qeom2jvta3wjapxxxri4lyl4rgghhf8pah2k1gye2fzwry1e1jts2sj0xs5lcmq6wl0t3s54eja4keynkr50zlvbpwah7ddii9fvrs50xqlhx7cicwu6pc97hhfc8pz614wr4rt71acy',
                expiredAccessToken: 9727042715,
                expiredRefreshToken: 3540989482,
                isActive: false,
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
                id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c',
                grantType: 'AUTHORIZATION_CODE',
                name: 'ojs8yfypn0d9k1l1afea5ll9telx1wuc9h243thnynro94ocfdaactpk293gx28eyl6epz823gd1ivp70vinw92m4qsj193uhz2cgv1hip90tahdlafm3ghwabt15v4di1m06ztbthv13gnun4ulpi4vuc73vqf95l3lk51foozehd88cs5m5o4axzavn17luq3qb3b7sasayww6z2hww8zlvu44vfsphzv85uogi4iqw8gj5rp9kzij188l45k',
                secret: '5cfoc4zy3splbgvy3pd2jimbo5vsw5g0w409oe4e397bpyf9hfg6ifwr9hzh4hk3dpqiuuijjndfa2sofzp4eh3nwz',
                authUrl: 'dqjmldn0xus192ox0m54wghlkgr90iif1u9kwa3swkt4wnzb817iiepphxyz58ejembix1vjq9y1rx5eh7brzzm0qjxpxvlrahyby2mskl86rs19iyhv75g2nnxvkxjp7pbc3m6h125vst4r0inejay0dyopk4rxgdl3ybtnmslwef43otob4xzaq1vy744fnfgx34ty7pvkyfku2w2pdoctv28m81swh0xa96fxuci3314d01gqcvbfai94d5x0o2i15lwytcr7wc0jsiupmgv0epc0zlt3g4dk9yr9hwc01uuokttbpmmlt99l1j5av11luq4jfmnbwzx366skhz9hf1vxe75ic53c8rt42w6qmf50ykm4l1hqiiqzlvtt0htq58nh7vs4duy20kdlddlgmia1318caedniu63184d665unvjphf37nve8a1uqzq5xgw2oflv3rwgvec70fnlsxypktdjpzc023iad1pcgvvjjqr26i2k6or90i2wdqwfcdapb8rzsfzjlz411j57eoknkxqm7tzewkv8ez68idt98jl7js4bijhb5902hcgrfojqti08yftifdx7khhd6ttwr6jhuopk2e9yim8edrbi28l7pir0mpg0b1yyd2oa7crfqm2u009ftlhvo6x080w13tetg4suxgnoq1jkrhu5hzixvzkc5nftpc5k1o12mbmuounjs1ur3988r80umr7m8fqf90j73jq9wrn47r5h4fyqixz03c3x1k5j9m48kmbupyjp9izf6jvjtalounn7wmtw1pm5f3m5133h16lz6p1fx9isxuchbszi1r006zlu75xrr8lazkdxmfri19bgth7r7vupl2cqrrwfbw7qoun2bmb9e3m1vdugxpy5ytdm8lco7md85bguxewaexrrbdyay4ib5ezig1728rdx6ik87k8o1bkhyr380e1dabyr9xeq7yixgtqjdf9nv781x424ajc0204c4xik5id97fddi7xykzht8ibqfvn025cxxfzp7jvxlmi5ao3z7nti8qng5btsrq1m4a8s3grjjsq23f83nwuy0bq0urzn7qs88yjwqhkl12p9f65dnft6qppyrp552xfzdof8afnr20g5qsx7z8zqx0ae8p33al0jrepo5fspf7obp5ks4k6epra4nnd2put2610z8e6gwxwm02v6a8fygsemhy2ovgboljoto3q1bcnwdaqu6oakqjwk4i3obo6cjerrssr8kocuqysvob5gqtg4sx50dbk1sbr1gyx2in8tt3fhfjkm06q14vtcnfbz5gsznzotfhjfka6ffjouy7qj8dcmyrupve6vil7dz7aej1lxcimz7xz0pyj29tnxbp800xlpw52tg4qx79io1lrpj3t0rqvlw16azhfndq3meib4g8ir9e6ffmn3sz7mg6z9r63sourvzo0j9mhhx234oaluz5wlcvexub7j1m6dn1qlz6gxwd0lt4f1ywuxcqsxvltb6t2ybh1p74vep5rkz8ds90mpb3hfagw6kjef97nzifrvuswd8icw8v31lmq9ltw6r9pjgwrjssb568pzfumaq8ia7oiriny2wesq8wcwrgp7ppobsee4nkttojudsi0hciswllmfds68rz9qk02b71q2uav6gquprzdv4ij5h37ldmzqsvs8idrfkgn84e8xgk2e5n7gdeks2urcrs7aadrmgtkn0fmvrpdsnnwx11z4xk2hqg40w77q8ntjpsg5htl736c36jz562wquwnf0actv5awpkdt35j6zlqdgrkb4bm94ruzenm5cpvnupzlkrgyh5rknvssrjetlfy062za0n9knq62ptuvdqdtaxam7tkhgmlw7okmbhwlekhi0y0wkb3t77qml4gwpptms7ec864bt4fc3y29301p1jjzshjyq9nmcrbycc8qr0iek3pg2st3tt4ygg5e78mujlpd3878bngb9k830383rc8qyc6usl0ka0xi3p1zxysmltyi071nezli437xw',
                redirect: 'qk9bwozv4yg3df1lj2zs8c7kf0dxr4gtj5re50qdzq2eg4971pez04qglr95tsyb37l5e0mqpxzz76qg6bdnawwks6n7n2ms6x5xgsmz6up6y35qnnrbe60nv9s5z1h7aozoetmt7fy1fviovswfl0givow5y31udc1pivv7gn7zzgiu14zbf5yixp5a8ojo9k2vlujb68qdw7xkfoffx8gcamo7umwuyu1wvfvtc2841eo6sft5hhqxtjmv7chsho9yhp8nyx4mg5vrvqa53c78p6idczrj6nr6n49fh7e8exf9ejrjp3cbcicxkrer9j9p79qxamaxuyr25miicyd0h0omzdmh5t8u7xymv9dcfh8mghssnis6e6b7oyuqpr8kcs59dqvwufv8tjydcgnhy4gu6ud89wax5izc2fn61yndpaoth2ygi6pyffv7ftk9rvx7u0c3tiwbry91uo9t68mabrmr1o50hgur72os3w3sz5wg1lqy21pix48j0mjn4a72apw1aqsgy93s2yogfmoijq5wqxe7igz2zqjf38iuqoo52mu9q95qhprhyeydmkuaythg0tov9kxgr0a44fdm4xmhup4akaambwsj52pauzu3scineukdho4qtvkack356syzpq8qlq41dbmh8p0mh25rys8ycgkormqpyxqsi42ck54prxlir10uodjdx6d4axmlm2tq0fyr3ut42588jpo0wsojm1m6zfskxn8kb93na864vhzvm9ezb8ycabc1e4g3v6ujmhzeh4zlnsuf4gdoqr89w9la31kcfzxr5e6s5lykfa22inijgfzac80rntwq70173ipfb919rnjn9i1j7atkrmxs29cqj5nbdyn0dwhr5pqk0am962hz2ms13iuv5lxmdcisyelkqpd3u5hs434by5zcy79moeohh46belilcyioacjk18kn6t5pgcitqg1c0ywhazbv8euahqypogrkiaic0y9a3pbe9eot2fxtre8o8dgl5t7vpd18lzg36sipeur1ynpmmzwbgfzh39zm722vr9dhtikzid4lkiw4z24ltacre5tr60qwv4okmgnoqzc1fkknnlyhgvb5bv82bhdpj7hrkuy2hjzmq8pjud29yp1bpjfgp6kzjbtuxt4zl7c8jxswooz6uxk2rc3f6plqbba0g27ptxt7ugnhowwt7h7hjxazylqqvakubg4ei5la31lbr1hds7u34mksq1v31ao9yvgqgwhahf63skxla275q1dibuxswmzogpwic7q57askm2x6sr5w3kvuwp9rsccfbqtc1a8fhuopw938itzm032q7zd1in1il76ldkut86jly4qz3501mv9czmi18zwtkycrdwobc1c3komzia88x8l66vvar7orhxp1kj5tp9xilea0hn68ogtfmewn74ph5j9e1vvo0v4iq6mjd39g0gtvh8mzpn6mlxxkv1ef7kc5i7ki31y3931ktumh6qlnn57m8i704ivzipos2th78ovju5gc0pk16097zwl75gtv2lf7phhw6vv6z8il5vh9q3lw5ku6btrpmd7yxljpto16yglr3ziwq3xym7n49240qds64ij193a1q5w7b6r72t5e401gpz3y0b73fdep6resng866mlepu3rg0xlhcgxmsv3pju2zzm0rclt3qp3z55aw2s5wl0evfe4dxmi3oxy87cduh57poqmbdyp8lq9r79gjdcoa70xe7xuu64rxaoeisyrg1pbegpv5r2hubgkil15d6denlue7esnjw3tcta6svdtp6q0l3pue64kafyd75p0okn0sdgeq7x4eshfduid0hdimiq6b5eg6emga6qq285v0vpkwa31o90nm5o4czkzk0ur889491h13i8bfq2czw8it6xy7ihy7cfeqlii1jx7nfkad08l27vnoh8sq90ft8copuuma169l1vsw4ata7w94wokburq55k656k9l7bjq8gefor7s1kmv3et7m72ju9ttoxznk27',
                expiredAccessToken: 83444992657,
                expiredRefreshToken: 4598013180,
                isActive: true,
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
                id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c',
                grantType: 'PASSWORD',
                name: 'mtfwflk6ygqds5akimphcdw89idogcyjla76aqog1wmziiv0ncxdsx8e6aibozrfcnqtbj92xdh38yuptdbbjjpbdahxc4bphw9ycbr9f2ywct5shcdboyw5561pno64dy9v1s7x1ll2t3qi5mzwgdwv2vqt7yhgh6bx9bw4buwiaqqkobfvle4oh43xcoix28330j9guvbupit9y8halo4uy3utx314kz6eci1pa6rno7axzl42bvov362jqc3',
                secret: 'oiyos2dowai923ou3olgof13b5ihin9vwlnvf8haz67n3y9n2obzxrq8z4tfwwx0h2xi5jr5f4v5gbkc8qh06t93rz',
                authUrl: 'q8p94kqtm5h9ncpirecvuzryam1nrkktf8g36cev060eosexmt4pirxyukw8krbedb7nd6ol9ipn3lsr5j5al23zlaia1dyfuz4ydm7srdoil17c9ct0rnyjdmslz4bvzljp1yf8y35wpvz6zg9hqqd4eakosrdjioegrh2tcmwjvl7jab3q513oulphcreq01ur46htyactwtdoqshlkqwrvjxhcevo8w20xf93m2vgstwyt0cc64vguq8d33ad54a06sbpb9y51tsg9exeeaca0zhbs0hxengumv7ldai68jncwjuouehodmz9lhw4kaa517tlwhxumcple6ioqfcp4517q2w74w2vhlztoohgi4de8pfvbza4bbwujrph499buws36oahckq3pvtpr0b72tgw91quwbu6jisd2zk2qxfkdlxc1rbmmd69ofzswoppozt92b2lyrxo9eylh2l1e7b2we97mdl0q8ffyhs8vepe4s1hp4eat0e177im9gzy6yjjenk2ehkkqsmsnq1utnqx8vu6btfpt5att9hjtjhwqp5l6fhfsqxpua6b2zpv7wi0tfdat1i8dlhmpwexz2r8i621j89t27238e4nxhm481z8e2fw16r8y3ejzuo182up8cystljm0u813ytp758e56hwq99hx53756nipdcmzu8om5sjsh2lp8o5qbk6spjhtnuhg3i9k70glghly3a88xt5aptchbfy5wdxklozcy1p76ihqh5ddrngc8n7dhyuntsq4a1u3q14cdnur3pxosseb5j5zj5euteovoc6bs8pm555usln91r8kfuwl0xz4zgyih4rkbk5tssin7bm9tt9bn6bc1tbwbav63bbrsy2gvkh3kt1p8mlc103aix81rclqphrbyu4pkvh29hfu8y0pivlwtc4a96okhvky87t9en00u7te8xfad973x2b8kshltrl0x10jebsde60yud254w4nhvpo3fx053554tx8m4vysno7fx21hgbc5snqc293nxgedbn9vtno7tn1chylr1oeehn7fg96q5pxlhoaygehjugj3p9jvdhve4q1cjera9cn4a083io7u2v99e8yhjzjv2rfhavjde1dze5zf5mpm2go3c031zcfuy2bfwwnwj2syw3s1wwtzgy5aipj1ias11bgt8e8b4pmiw2iigj9rfq350h659nic2nnxz8g3xuqxrhlocra5llji4gjiccx4gqrat91vdm4dqeu75q7d0ryo9nystn06cs3osfpigxogrqrdi971fvz9cey1a97wwylfi7pfhu0zcy0km7n5qsio5l82qpix3kwf13lqwi4t4bihi5wxzh9kmj4zjixb4sy5ft6me0inbcy5s2ucbf5q0tgvqaj78y5ip62u9w45q5x0vpm5fok07zrr1t22sad3f8165zi2bpzzqsv6i3tbrxidslaoek3f30fyba7qxlqmp6o0ha63fuq2fxhlu64d5xwdalr879n3ddk8ypjm5ybddzrs5k212sr32bx68zrdzi2dr1g74snufie18do0mazhzk0qu2t2nsw8v73eaf84xc76n4df1zhtf4yqatdbrqhpgogj6o4qemrrm9p28olco7lzhwkqajxgoi55411t8ii056c6wgo90nrtor26xq9ogtt1n2dgvi0z7lfs83hp61e8au8r35e6ukzd64uskxiqa2vhr8bj5einzawawdsx7qqnete0zx6hpq0wu1hgrq55ypwqi5a8mjhpuyzywo9edx0k0c7ptvlvphkmuv8awf5urjppmtq5huf2z8uy3z5c4rqztg1uo1toa1n151ev0deabiatjpuug01d20av2mgnfppvl5yed3leencvgfpmnvq5d1wg6557x3dvn8grqqlvoe4jn2h30v3lzxlq9l9dak3jj7o6x6fi1kb5lfmy4rfefzlwi8efjdofiv1xfxlpyjmb31gx0v7b4cnd3goltywdju6gmj91i5rxct06h7ewtrcmrz9dhk',
                redirect: 'pnxyv07c3bwcwitow466ei3wjyijzw3zhm0nzlo8w1og1m81fu4wno595mekeak1m5gojoijhwyfzlzq3pbirnbavtdqrvtvhbqnmicxeap4vt4797mw8geszswzj3r8h3aj1779bdia78zsb4ez7avdfwugtta424nu12t6agpgm5k0945lw6972a2bolq6ux2rdrz43bgpqo8ihzqmaiykbxrc6n59q33r3y7pib0vf02lxt9nmnmnnwjw6wao28raig0cgufmg8ruc0gxl6egngz3pmyd8hzi8wayr03xn0vv8skzlo9i96bym3knv92pm5601tyxfgs6ep2i6i72ngrqkcjmrw3myzvl8r7ancho74ab4w6c3aqvevd565ohhivganpc6djqq5c6vblimr3o9mkjv96arupldz83yspbzjnh7zvlj17h2xzmksrvmlkv1nymvo7hluecy3ve12gtv41vivma7qhlsufuc92uewd17t28t6xqp8bmln7ixyjx9nf4wq3is7ulwz1n5vseyf728je41h1kitooo5dcx91gc48b157zavhtw3gigvm7gqk032h4eqca86bnvj6or936gwomi4fvg44nnc17rlv80rp5ks38e0hbwcl03n9g6byrt625rsgn7pfgl6juwzp39lj8tgt01aeoqa8i7443v28ejixiidyknmnrvifdqhwzhub6cepp7fzvd450byrs3bzfidrk1kggnv8kp88uvq8v6zsvd2x9vfuhpfied83heij4tdncit9iyge0meaaop2px22lf7iqmb3t51rslvdk6m5sz8w2y47izj0nx5efys6h8zm2x9yyelpfgg5wv99t7lc2et29rgz63yxmt1ezhcmk8j5gqzxiv6tgzpnn5nh4qc6iigbxnuqxrp5yy6suolq0zyc0k5xtq3hx13o3uztts8qr6aj27vbabr4tdmun6se825c634cd83pm476jfi2xeye5kpcbv3tfqf1lxyaynp5y68zdytkn176labtqv5a3caylruh6qh0on8ue3npdbqz741xd29zmylunrdiyxo1vdznjfe790toixxyil8oyslbwre5arpkhsf9kgqh4o947tspn13ndjyl2vsq4jhcb3nnjczda7xuqqpstuv0kwl3fbdoko9d5z9n23sbs0e0pqqu88g140t6y1pd7ppjvor4h1jpct5jjgipkxmrodw6jzorcui6zdp4pu6vczwqyvrx5zw0wgamiy33hgaba78qdb2bnrj7r2kyds927nokplui74lfs7itjndwwwwkrezv0rv346rlrqivp1v43zbpg3v5vigzfg3dlfug8k0b2k4a3n2w7yot3ogpu0f92hyzdvzmdipxy3p056jy5dg86ewzxg2qe50bu1iny35sz2uvfa892yvare0dm0tv2x32v0nqsxsxjcy6pmdnga4upvzn7u72wjeirdva8e0hncr5l83djkwmefksr3un99v5c0ie3qmmhwfp3o7dx7ber816klvl0zb6xu4em1woyqez7pkfpzjdsxyqp8f6gy0dfki24zue5nad4ipxoc4pq068setkem6wgg0d6alzeqcqretfeg7ei95rmtxomkog1dq5lwbeuh30gdq2pd31l1coxm5dv37hheifw7bkiogzric28ac29lhau8iwg170sz3l2xdzd3txj9nv6yshvql3uxm6zvxa8ue4ybhfqswqa1nvwsdsmdlw6s2xb7u7tgnlk5bqe2botp71gasawmrfa7drxzga487ox5n0n4g33dc92s7swar1c9ui4979b2l269c0xktfuibbk5szgyirmdjupibd13f5i3n4zvgkw85es9ashdi603d2xd11cpcpb8iuvj4tjvqy8ra68due4khpm4471j7t9anli0i1awqwmec0pm4y9hbbijdwku3wg25jvuo2dh48s6bjk0x5j9iv6xhnz78dn3ftsykypmdosoet4ttl8qxk09og9pr4x5ont02nwbqo9',
                expiredAccessToken: 6888719875,
                expiredRefreshToken: 33035766861,
                isActive: false,
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
                id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c',
                grantType: 'AUTHORIZATION_CODE',
                name: 'c1heczxddqpqc6w4dqfj3f09z82jivp393bj7yzesi51ekrm9zxl480h2pbnra7s4wemvbud4kzoin6uyq0im0dadmu3p3xsjb1c817uu0kf815pgrelar7p988tdahs2b0gpyz1hpgwmu2mg9tvghmid9vbxerlhwv3xkat3i87ydafevq2gn9qw5jjqgldh02ldl3d90gt2i0b32s3q3qilqzfrxr3br49njczhom4c2tdrznb5juu7m33mic',
                secret: 'sfvx6jkp68cj6gz7xdg0ha4mqyvo1hbjf18184lx7og4wvxwmfvvh7ow23h6wl3vgj65ko7pgpxuvu4xg7j2yntip3',
                authUrl: 'h6cz58xbp2jyggaergme6po6g6qx809vf5tknyqdh4yqysxps840luqv8usoqniq1hr5k2m0cim9yyvnm48uta63cvqzwqldks6yem8gros7dabv4us1u6v3o7zlsgpcm9yb3wh680xk0867fzlpm1vdr6tophvhawcqcidzv2f3vldc6c6v3uc6dc0cnq8j7v4lhlu1cgbvf99fz6a5y6eosrqs0rt1h7j1ctl1q8qemz0ee6p13d8mjobgdxjqa4c78rofzjgbegr72lcth40taj6qa264j13jl1f4mdz5d8ex8om30pbkpvrjoumftku89p2fp1upb9h9ilo8ct5ukz6fukrxgf2vxi6xlkge33ao0iu5g3jw8st8em5hcknkhuqzbn2f4dmxpxxowuhuvt756t7n69pgn8kr5oyn7r2g4nbsu5fvcmnn1fiuamzwq9cy4qi93mx4333rd83b9xsjz28v237yf7wvp8zyt0kvnpivgyd01pxpu0a8uy1l6wdkj7k3xc5jft4xufvmcsrf4h4z3e4be9cd5jeen7jic8t61tyxn2pv64p7mpous6ky04wwlafbkv2abnvwsbzyus24jx9gmvdcdlcwbp4p06erumqyxukvixurbfzfhvi9casz22ou0do6nlwz31tn1s23hoa7o9h5admw0lweucal6p9cnlhvyhf37l71cg7a2dm72y3rmml1996wx8fxtmzcczfisvkfr4s2w5u330dna19hs8v12lutvj5uxlub30e9z2bfzhtj55e6fud6u15nwut8oxfv8rrxcp1pnm5htbqgvtcn9kyndmhlzngxgolflugnk6uef9aj9sjat81k08qnnuqpj6a9lsj95igc34coys8i72nk6uyw1jpncngbylg7q9yffew6ubsoxinhyykrca8f8dab88e39zykigwb3lb725eztf45v2x1ja6zm3s3dnfu08ruzr804mj2erfstuvlxcsgv0fcq531t3jj9c1eo7h68bzp5tns7l05vj226q0hbl0s3phbdlohr49htpp34epdb3gclkgp5hvordemloqfoq36hdasgi39sz8bn3avgnyubdl7ymazl4m32lqbkr4oez8pubdh83ndm8aue69x0i9gvybas70vjqbt8rhfok2vicd90rmtbf2c7g5o4fum7ee0q2g62ode29c6aoy0gjazgqgejb6thnqo6menz8tpeusowixbpxethy85ah922mjm874wcnszoqoh8jjqsp3zpb0nz7r4wwkexwttnt3c209amtq7wtshdtoakumeotihs5oyjv002zo01nxri52b1y61rb0bvz6wfeikdkis2oybk6kjti253p4zwijk1j8t39o5f5xbljxs5rvri6jwnswsm5mrkrx6x1yv0rwnwocarlp7brvedi1zxre4cildgg33ak51k0471qesgbnsr4bny3ccc717e593nf00jv2ey83qdlcvnyq194kyvhf8murom6f058k2ogze5face1kivrk9536hcr97l9061m6d4jsl9uf28xkituk86rbpea0i8k81b85wdwrhrnhu92erxskezcg5f30f7xupbz63qiwxngp18s52d9yrz0d7xo93tfbm1u4aw8jut1h2eh6cojua9zlruduq48b154f81gch620upg2z5ubhb4kel6xrmvux6bru00ik0u4xpx2j64mqp10983ytsadijflbhve2t1r20myfab8wjwcigpgjuavync9hbsr1682l3jjtp355dv393thnvmcd9y7y4jnraxq3ss52z46gm7df7q4fq9c841o05l8ghr985ork2sw60nyifn3xqn884wdxswlif6dog40v2cfvxp6ydlmeanu0y0j4qz4af6i0dt8kkvgdemz7s7eb8114ei445wt449fe5vdljyjm1rcq8q35cn7aj6xyegv62q3um3ufbossiyndwmbpqlhjrleflcyuazoevwmmimkiphlhpj6s6jw55er9qs1r',
                redirect: 'ge0jxfaqdd5zbu6jk1jzcc0qizfzkj9358gv9imz0lewexva69hy9fobz8q28icudcdq5q5d0lr62cuvifsax8fvsm89iky78xrpxptqr93fqnnikt1ccs1cqadgmssk4e4897ufypdlboe70uhdikh421eauqfjuv8ljzkad6q3h047hupqgn29ij0qitbcui0pdz2y6bc0jt04gngoo4sybdx5zqp3hkj6dpztgf7sex2gs5gpoxv6bbignq8had3u761g3kqyc7xr2yliiwwugizsm7rj2b39xd2hhn9ky5ggiwhq0426vhe3yqqtsxh1amee2x6hjhtw5mlas1nrrw1ninxuc086jhr7b1ktrgiprec8468zhwr00zntyvgw3m3dgivjcp8bgillh3m9nhm38e83itxlcuhy579tyds1x9ev6bjy9fkul60511shh0kh0u29np9xtues7mbgixd96t0975ubuogbvq50ojekpgpq4mm6mxvmzqqh9l75925ksl6butl31cpyv587pcjb5trwmw1hm4y72zk73mpreridsknxdimxfmqm7sm4vettk87stu8iiw6zkxtwz90lopr7j5jv2wycv18zyo4xhyoujna1bbpxqfrca1w72d2lu60me4bi7ljxjbdem5sep1v6anq62cubepd6t5kajq0pl2m9z3ynmowta9nyj7gxzox66s64slrjpkdvqfghmufbhlwii7ww4v8atfrp8ggbb6p3rj5636tnqcrxkr2utb9zr9zz2dv3xwmycman55z7ilu186uh8byisf4kofs9r2ze9b7x1hu2owkfcky3ve7ujqj6xtcgr330k86avda88yqsolo2jaoaqjhfjac7ovoui5ccf8bszcigx48b00vavkk9wvwo17gksepy9qcdt860e9696nw1el8t9xy2sq6ixzlyzovyxe6029xoy5fl4v618wezd96get2qg7nxsl7p8rhvh1dcpy960f1fji18wipvcz1uv3yjt2abp4snq3am615hmujmcli3d8tv1hjwu3csqo4epvaymzqvxucsfsp0apr1ls99uq6gt03kpjl8rfi3t0x0zh9dt835l6da3cy2b6wya6solna4q89zkqzb4pqphvtxf9brmttzhrh6t8s6t4vgviz6vi6qb2ecgvo8cyv8plf58dr0mnzrmw842fy5j9579suyyejbqkfjs4qlo42dautmyuen9r1l57vb5vngdfy2bchewan8lbarq7jv0ydb2hgc4v2to5tkdey6lo4u84qnbp49xbjadpcydnrchsurumne8th8je8wqsvwnpcyvchamxbd4xjnxu8kqmuhrig952s7lj8cbwo49poa7cqeggvqp6axhckwtfp7i1qe9c2qtcsslx6e3fbrtdzdvtjg7rxln7d5vslrujlrht0x647pebhuwq0d0mvrgxr55ai45yq4zd6h2tzeyeu96yma7o48hagdn2fbmzbbftkx36gb91u1h9jr8vkcaze6vmdxrwf5abrxvh2wazowubi1cfaiyjfhk50nzq9v0a51r3bk7r6i19a773hj8zuayex0gcyc8wbts5fdouxtnlcza89m4ze25xabpyqzxad9as63figiaggg9zvcihpgcpsxkimh0ljpbzbwdyw305qa881uim8oq0i93aj8pxkxl56c932e6azenlnhe4h3lf9oan95ys4o7by39aoy85z3o67cni91p1djcqrlvrdf3yqvhiax2fyx4ev94g6jygbnwo36cecpznnuce7a85p64xg8g8xxju0exsv0vfom1qd0r1493o6nvbakvld6jvddd46gyysf9ftr99fcykkjmoojs2oyey2zn4hk8qzs0hkdcts3zjhifiyptb2jbzzp1v3q69nxfksc81k048bnk6mkbnfs6pu0b6op4pal1j89o144zp5l06ot4mmzgj6kmy9uve7266l0iwu5qcr6bddw5yond3va0qf88qx39lwd4rvdkl9b07tu',
                expiredAccessToken: -9,
                expiredRefreshToken: 1857970523,
                isActive: false,
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
                id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c',
                grantType: 'AUTHORIZATION_CODE',
                name: 'lzujh2s8zc6jbw1zhricdiqi2dvnjbzg99uthmnrvv1em1z9myeqa8si0drxckmyqcsqv17jvq91y9jrovbf3p5gbc929ehrhbz9mv40s90la6qkn4zrp7a6nudl30yjd7fcipztgipp58btxo6x3alc9lxvpfeqgwnqxiw4qhphvkiynhx3gx4vzhn73xtjacjguyni1qg98eeip7j0kzvpbqoh4ga7l92xp5ur98ba7nscr38l1rupvp7l0uv',
                secret: 'x90542phxat6n914o3jaf3us329q6b8oix1sxa4exv1lynmy2p700um0rh6rau1w6eehrwlxcc89oy7oeaop0py437',
                authUrl: 'fh476iyuhj8nyt5oqk34c8my6oriqvxgdlchvv74yh27x58zh4e90tazwg0v4lijatw90tva4msh3n57ac92sn96n5guz96gxb04bhl6gjgeganp7ey38bjwd5rfo294ceupdpbc6ig4p41woyp7fv7cta8h2wysoefrn32bz1d1s9ye892buri69wsml60sew5d5y693gxpyd3js5u2i1d6pfopmcjheqf5ruwyghpgj9um2wvwzhguflh4otzns1kvywm8tlg94isc41dm5zh3mkv9h2d02ve8f76cgiruuc9g6wgtj64us1pntrm37rl8cxw3ohhw5xut0tmszkx1aq5u6pljc2q0bj4d2i6cqangltx9bfgv4808h1w2jrovqu189kv17kw9gszgnfgsujbtypcr6rbtwj4iqd2nvdhpi8cjmnyk7xocm66t2indsce2043pm3bt5r2x9uzxnwgxh8yem76uso4t1a17mnb9j33varctlkcvjl1px0i36bkgry8k42lc4f5mareq4r69jxa31eqqilxkk5hukemwgvlik90lbp6kjgsdzjolvdw0tm877501j0xb95kik1jdwxims4n8y46jc2natf2tqedwbbfy36fwnzzprfl9ckr2yjifnir3w4wc8n9m9q5s0nm71ul7webotinzxl3yltze5mb2gketmptuu1o0c36z0uo6zcdi16wq0mqp0mcs86yq7fpai89vjwmmis1pqhy9a4yhhu79zehfcu673rrhhkjsurqunxffmkwp5ulxnwtb8arrk31hthr8en8t1ygcnimwb6yg0v373x77z2aa3ffyldk91jkuz2f824gaylyx5ytbh2tlx5mfzet7lkkas3q77o471gof9fn8fszjf3n30mt7ph9shg5osnf0zwftmv5c9bz4d4xy14u9t3bpahxxmqwtgmxyv0d57xf4k9h2oghndgvt3pyahlm97iyd0prujoyxj0obge0ux79qx9os4fwtjy4wjjouls5idfx9cupcizdzvsux06x0ahcyjzylj94fzhjs9x7zf2dm2sjzqpzgn19spny53u8ryeos2c9tou80obv2arrqr93dz658qlplq90mtdok82jp3h2rfpwu96dli3o6o4hd5q54q6y3eq4py5dp9ypc2s2172rqinrmipf12q3jv9z37v19304ij77h8hhd07hco38y6vurhy0mx0ymlmx3ysro3iz3n36odgfsgwj5pcp8h1mehacafy0t1ckqgwh99j62d9up0y1ug66bz3xol0hheuqupolf3kgmd65lp68zuhcf01deqra7kza8qsb7p9o8jk2u7e81zdk01ucpznmsnc6vr2b1j1eny1co6isa5u43byu2mwy3n9o0ciihu1yaz217s205fj1pwnardv5wj98orexbju4upk9mhv33o1zgn1zw21ej26c0ak3omi6drh7j3lk9dz8u0886ic0l6u5gumzwr3sv7865e4kwfwd0rmlr6ws8kltghogk5b3hsz3v4dplxzspb4t7pzm6um8bzsq4fy89xo8yva6ghckfaan2fclgr7nthzcyvnvzb8p8b3aotbc32yxtv41l84xrpcetk0rxve4wy1to1s8at3wer67zmxdyh77bkyebrv35lneaspvzfr56zfic28t0x77ou150vgcq1lkah2lcynxtab4r0ci0626vghnstdov3zs6id60cg7dbj6yt2x0ahskyz7qfcdq4u9is79kb0n94sti65m2ircfwjpdxs69534dvpvy452lswdyuxv1axt53qc0wgvn3mm15ydm6h7bym70bt9tbx9v66pxw2fpkryzuhbpl176l7k0cmav76df2q7cht6wbrq5me6c2f1q91mrz0rzyp4w47ei340sm3wpkyplpswucgwj9fu7pyzmd2xygdfq2985ohqnx1ab5bh1ffc3udxtui5myu90o2ijsoxt2xy1ox3ni1jzhliq2k0nief1kkwy7liy0g7oku6w',
                redirect: '90uwe3f5ibx734h641zrees1ot6q4hk2gml5w3qvbr4np118qhvadbt8wo3gehtyhpabqs3m1nzdwmxpo62qa51x5h40lnu9tihcneczhos2ofwmjwx28fwdone581rhkfoxu6flrkj478jb649la65y3jurlvre5yanap8opud6zmoify5ht59h1z3admvdu2k3chm4q5pw18t6bcabobj7b6qjw7uu1yssfnxy2zsbehogewwp6n831bgakusbxfhvl4l1i6sosat6ygk336os6iizmbtjop0vrlqcc4wqk4kncymmp4v1f0vd317axpkn1oh3rar6tfuh1lrvdyyf85iv4ndsmzkdxtba8k1kek3n67kkisf8eom1oz5f6cgu0ugl913b43vblssfl9el02uuije365wdoe08uxuw71k02hrc09g0bsz9eg8s93sni1up0d6eb8myn6e72up7hkzbxpr9rtgu9ug01lljn9wdeg9jvarplrv2kfjewwceef3f3y9pgew9nr0kvl4c432ic4uxhfkfqg68axzn0lfueicjv5iuyb9muhr4ulhcjzkonp5b3401gxmwold6c45gyj5hgu8h1bday4igozl9617q1h5621ctzjy4j3frxel2p46rmxb4a4yqgzxngtv0im706zqqdbi4e8tq5x266syrvu68f0mq7g3fw1rz05qhmiyoo5i87u6d5lcsfj3u7pkraswm46f2ojxgrdwilmmlynhpsld5mp13fhiba4wobj6jltvkh0gsrz7a4a5h12bm6y0jf6zdn8d2fxzg8ib1k63azhnhsdpuy2i2e22t8lfgqeq4rxsz11evjojkwjpfe6qizvwte9mzgpwlqz9ntaemtijufu8t0rc1ipjkb35f6kbtqqtkx2uasz3waeppeslyz3rpzmfjxqnve6t73fjzxuych9fk9f2wt1m6an4uy7la78lvl4jpp7jt5cxki9au461pm2mr2k9swvg4nk5i5ybpxal2qetnxw4jztw9yxhmvbohsq8b714ehprh5y3rqo0hud39cm0wwqq65389mhlyuuvn0kpswavklg9yr4wg246vvvo87edv954b33sc4pg81xb3rq53r68srhi4r50up4y60uunkyn941crl09q52s1k47lvnat7lnojcstdi4ma0auuqkec3ldyqz2vk93iobvk14j2f8ww4ng2i38ux5c5zk8rx93jvc3c0d64jnkutglwsjle3jqnitkhvee47ifw07m4mu0v9ohct7bubqyzs7mdll1nnrf4v9y37mxe1j2skka4zgifldpgmk6xjamtvuxhgx0h8mydgidow8c5jcqtijw7tkdxm1t4wk5tmgm8kqr2dylav9ls9vs4bte73h5oo982a90mbm4tc7l3udswpsy06kne6m021l01u0ktsh7tp9ipvgwv05nc5la5bt0oe3nxwojohkmgmu0jl1u0tjfrn7jqsc5v4du7oqiwee8ns145ljwpbczrgvos6a9elt9g6nl13f1g9rojjmaoo8bmmda52pomge92f2bmudsu1lx6q4nwq3npbw0ywtenja05rnam9ywfsa1j442c27rd36do19r5znq9bzqr4nmuh1apda6w5ny88g8mwc62xnkf48eikzeyz2c4yrexhwf2ademr12ogswthf34moatnwunrt06jtke0x0wqvygkknj86fito3jb4peht4j2l71xq8w74r8e08e3tojqhkh2jmxvaltiem9a18d04aia5fclf05i9c6xzcgq7atv3ej0ntaeepkxinnf4ez77ma38b3b2hqbpcrkxokopjq6g6d73e5hiie9wm4je6pxgws3l6owbmihy5swpiy8rp7fgcy4qbqa0ciizxc5akrxsd7tshs6ye4a2dzr4ufm5y09mmrez0rqnk6j1xthhr9ox2d0gn84o2rurqjbx5c8xfzf4smnzubwvd6whn440eyydtj68lo3bje5cpfye2k7byt3bwjhh0t4fe',
                expiredAccessToken: 1985624405,
                expiredRefreshToken: -9,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ClientExpiredRefreshToken must have a positive sign, this field does not accept negative values');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c',
                grantType: 'AUTHORIZATION_CODE',
                name: 'g4jxwmjp9xcs86k5ict1u8gyr7qfeqp09cm9pyd1risrydzfumkq3tztyxptk8nk64s2h6g6ddz7g393qb199glefxxiuzh77bbvu61u7ujkx8yb8ngqbps9heo4dx3ng6o5u8uxsy3mxkbqaay26wutqpwozlsgsaito7s1me8hem7zbhcdtngifam8yxol4wmgvtf8h4tb6a82e05dekgl2dwq56covyd34382vwnzlrgpp0uo88ae28f9mub',
                secret: 'rr77gpwgdkri45oabw4srd1krycsk5zs7k59zcw1klfgdnzro970kdp3a1x8xp9bwi4vdpnxeibkmcyuysh69nyoxs',
                authUrl: 'yc3kdkjvmgrpcr6rfq0wj86yga0tnh7bps3qcgetazwp81tqka3bi3yvjead6c2tuhkf3d08frywuth544pp56o606o1infjxxqypotqgf1vqbrv4xa3509mws6z7wt3dkkxfr917dy1vm7ij7sch92sae7jmbaqomblp99rvbuj009rtff90clal8taf19imgocz3b4b2svmg17loom3700owmvq8tl5zuanw9tdimd66cpfc6530rtwc9dlo89q2k1gjqzxukocfeoo5yu2taxy41irqeiisxh08bjylbhh1my7giot15k3n3394pzjh0bdjpchxljqsf4w0h73hklnoc01x7kqek8x90dlbl0aiy8od2b3f7rjys3m8ulk5gmyqyme16tixu460qxu37eedl42nefn8ppsh634ff8emh218otr0fyeur39obmguc6y9j4o445xnxd7ureq2ivda7c7gfh0btx4gpcaeyl76vr2gtm8ejvfx3tqw8b5d3kuxhmx0p6j9b3g76xu60obceeletjho0g55x60fg5hqkmeapo2itd5xzq9eblbonyirl3q6wg20tvphqwh0omtjquvtumhkl5htl0d27esc12wedojnl8a6nq32cmjkip8i0o2jaciykfk53yh6nexo2r0zqrcpx9b1dakxfcruo7e2ndjbepg77r29x6isokgzyzb2jmlnv14hmz2ramlav0pmqhk67vyj3pl606vc27y5c2sf5fmissqfuobpngo5ec7vfm4zpk88gow32rk8uilquiqou5qgrk9f112ksgcl9q2hawmmriojy21waf0l7m93kk7ax06dnfv9s6al2iuhtbvix4sussxcd1vvox9fld20pgwth3oostutpbu2rfiwbu0y23dawqx6nuj2x1go5eoonouf3vbwyrtpv7l0p5jfsqo5egwxevmxw24pvf6aof3xg5mqmkuupejrw2bypkuvh6t55myljkgg1ejblcy3wl43mw6uv0gxzmi5m6r2jmx6krpdvfx82hfdlhqgkyo7r4sihz3yw3c1oln1zcnx6dk5ynbosnq4qcdtq2a3xoqra6hqwn0807249sb6me7ufqtq79480vieotd4r0b9335juaje2wxl1hcb9mgdt8u3kbeygzvfiyg8x84gl8hnbxro5fz6735oz1f6b09d364e6ea1s46qw16pu93y857ry1vhlxs7cq6w3bu6a47x4kmj6c6hvpuow1mwwgssq1lpzfg13theso9u3fwou44rauflk9xcoikow9z8uozue2756txewbhujjjw9uh3quf7rfr3ms1jymfmyt0y9u3oo1q5u98wfz0hmv6p6q210g52b5rnndeez6elv4uq9wcbltlar8hulkk6bzft3240bodmhtn3utqgb3ym4iv456kh8sgtuho31ifknm5nc5bmpc53lj41q822f772dc3jkr8xbbmfol4rwbxzbjgoo95b4qataulbrza8cxzhutwaguzukpu6th0vraflboh15b7f6i4q97jscwdr7cotv6rehyzjfw0040et2ml8x97s0iua83plimt50139hfopei6g6tsbbj5f9l1m3kdwbarjd2ujliberlfqcg5a29t7nj8em57gc2sf1owftbq4houp5qd6fs4jtwh2gs8l867rmxt5ulvfcj0q0njtnkpr7abvdgz3p5a1hrau4j7mvh03lbgsjv4k995zkrg3qy2w3ybt4okxgoyqbmufds591y89ao76vftc0wglwnhfw6e0qxnxpzuga3xeptil47in6xvh7zqe4csuygiy925tp9dcll51o7hitk86sti5ipkctik843ynxa1syrjfz02wt08en88hq6pdnsawd1hls71sv7qz0k8f2a8eq78xldna9vkmemsc4a54lw0y5q718ed2rs13k0piyo22hgdi50pqzj7ribilmxo217sjr37pk90jmqiajz6nri203hdd2o3482k4vzita4mnglwzcqiirr',
                redirect: 'ryktil0gtcjbpugs748k3qcjh7vrobzc1rv8i5qc0t6c73kg606y3yij9uq60khxtoclf6ixca9eod0wpvz9wut9gku27kgtugbpoevogwunytmyrbslv9sryt6sfnhfqy3f0z6kd8tm57aqt9oh9of0sayvx4mdwlmhcddnjvcz88pfse7gxuys8hsg0u4l7i204ifs14izqc92mbpab8t1yxw5g3ijmeilwujmbcgr6htn3vw3z35o0t9pi5myf9i5e3fkjdeufa96hph00ovkh6x37sndzdrrmn74noz30uji5fhubii3jdk9qjfiwxl2laz3s57gquue64oc0c19v6ye0tn8lsicdr2on0p519h9vfptej5if628esd1tmiavivi0vfijcxaywualwnbwv76x69pm59o9jol7r0eqhuy2ijs6fcfytml8mbi71gf3jmot3l6btaiflwby75skkmqrbzx54q5y93j2aivyvvvf27150dehvbga5n6bwtqtmz8dt5fu06asq0dja47q5cu4em9le0jnt6seunqg7cx967bwr3s5okqv7vapwjysio19clk6qx066vcukowk6cnpo0hnygf4ejngfjabvpd0ttnrens37nl73e0x2z0imhu62g69cq4j7p07ewxxl8ord65xqr4jvwq0jl0ya27c1knng55mvalqh4jlibwrja1v1y4fzntfekjp7krvn7hhqyxn1v57517eu2606pfdha04meufbg854gn0qgke85j2jqhpuqbndgxy6gy97d0tagugi41mppg5bvut92ui98fbtfwtgs9s85dn9z11nvtb5j6ps2cdkujgu08s6otu9drmtkiq3atdesincyvbsr12nj9q8ck00pvs5hesakhydb9ujb1f2pztlb6gblgx59u437ixamksc0dtxvw61irtlh1c50xokpwugs4w7jg3lg549p3v32ic52iknigbrc09ba0bu2dgkv4pwalrz3k6r6n1wo9bi9cq9yg4sd024ud2ghs800mz1kihgl9mlsnqcwmzgd7fkdmgf0hmvcucyvjk3kip2h13hjidxwmrfe6iyzmwdf5lo61tn4gxs5whsf0esuoa43m3sicl1jmzw7pksvlyyeh4tqdgqwawkp2tqdzrb3n9pum7o1dg1f56y2xy99lru35dvrjla9hppntbu9qx37onx7cyj5ctouaux58w62og5xj0yerdols3ndese9ejgilg6rqoe3wr7vhcla2lc44tdero3pbmf0vttd7twsa70v84f3hzmux91ybe1cos2wlf7orjh4exa1vcggc9ap3dely6jzrf1klmnjv4fby0498co4ad1xxu6olmsqy7xqhh117swjidntcdmxtmthuy8xniry4p1l8cw4r94oa08b5f7dc22uspyarv63kru6qsdl9z976t8njgw774hjdfassjy8g48hysphlf75xsqf7sq226ymfy74ybf1gn81opmvu9s2dmja1yv6l2s86vpe9tgulkxwc31e4ntp4sy7o5j67bq4z9ujbyg0ojg2nwvhm9t4shrdoju3rd9m7vspcdabmf0syk1nncit03a00aegku0bsmjsngwummqbp9xxk5sikp7ixdrlzlyksmp1iptfhxw2e1e1q0k473krjyjb17eh8sefllu6w94xv09fkngh9q2ufuetqrm2h0oz3nfecu761gv8ji5jg9c4bwuin53h9ha42ey2u94wge8wezbq4jivjrwmsyto65pjiirbehe0sbxxwzoc06qqwvrq1nhexkumygnnbj3e8ijcjrzdj3dkkxdor6j4038qu0p6p6vgh3x1ttwp6mxa4ky7sf14k73739q6i1tsnrodv3l68dum1iianywi1h17ecn3v1b1mpchj13yikn249cc5sqhh52dh4xk5vg3x19yjvjehb51n5yhlmx5gk43h16aasnsw7otq16axtrisyhmyw783grabivqkzd7do9e0mm91p764e482vi62',
                expiredAccessToken: 8195325639,
                expiredRefreshToken: 7510166242,
                isActive: 'true',
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive has to be a boolean value');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c',
                grantType: 'PASSWORD',
                name: 'tiwqrdgwrucl0o0lgk1b3sn5lsceybt6d4ics0bw9f88ph8qoniy7hcxi1o9is7dwb9f4y7t6fggt754nnquyh660n9m75eachoovedyd8w7xbrxr4ufdc44f11872tlylq953q74ajwexlv3q2sgspv90om2o7vvbmnuwsr3khnz9rrq1757aofl1r0b7fr0tw8e7eaq0aohs616k26oy7ku1jdv0mfafwpniwgjvrxggpzhh97tyaq44w79w6',
                secret: 's0bjklyyquspcmjzamj93ebmp9zwwssnq9fpy6sjr9u494bm46sk4qop50n575z4lvjn723r3w6v5g512pbsslz7s4',
                authUrl: 'bbuo98d317mkcnje7dkc4zejya9kst9x5yavjosxt33jd82q1kodqhhdquevue4rwi6h9b4rya4ngrmoxx5tzq80um9jp3yhcc68vw7y73bzleahust8y7zcn7j1x7xk02pmm4n9k3j30p0t21qgbllwahs3dvm3u0nw4ecuhskpe1mnd40e2qmlnp6e4rrhk9glyz47y1e7qvy70si7iju443yedn3oc60pq67jzg0ligy1onsoggl9t12ermi3pl49b82cya7ylegu3d4dbdmsteiqu6s4yai5nvpsp2s3lzyr7luyzh9cbo0dzdnbeo1oiwyz3x3hqqy0fe0ljk5lp7iy2bsu0pqazisepwnnvswodlr54c6ilodnixmlmpn7aahy8axk7hwtw4sueaa4qcbujuoujfyvvdikm7wkgjfj79djfp1xwwy0chvo04ge4etjp0pa8e45s2x5c57jbj2nd54zhqdzr5ftgw2lxtsyifgg8920qts3vghii7uj0naflihm3p8okxw51eiagumn39l1wt34xu5jl1l3ztup1bcm8cwz0mjsngjiyknssc89xer2gxx4m1w1h8kkezjulhx688rdaergnn2cerxvxcrbb9ho0somrrx22011kravxa70vm6e07b1g3ua9pvwtc2tc5omc58a97szbb7hwk9npvud09i3ix2b5731yjfmn198xfpwaxk9avmrb0dagxntapf2sbq1v7252899skaxpj42915s4mzmwoiwqej4fg0xu1ezoxqgukote8ou7m564dr7qv5dle41x62vd37slr0jn0ny5il0zgb0u3myfu2at1vm2o8yo577mt5ad4j2ubnqnkoaukgb9z33wrzmt4x1fg4la1zlvetwrfi6wa1xg6ddbjsztw2ntez9q36omuyv3ixqd0bdsmoxw8ievwg229y8fuvuq1trvgif9iady9w75jk75ejc9b8o9yltyxazwusy98oyi79zqlow4h4bi111o2y958hns31pjzsofj8l02ayobpic68ywdzzyl9v38y4th7mf2w7m545mginiwowiu0kvthd3ratvpl4bttyxv9hh652xofkoknv2m6izf2rpqiatz1zv96gvjrkuhbitwa7rty8q5rg8gey2m7zcafvfcftlcerjg7fj7x5fmwy1ebmtgfg8dupciiads4b5jqflls6kwtdug0k8rmcb83ptpumr4egz757s3ek3abn7cfog1am6re049i544lzn4pb9hznha0y6v449dgmcl4uiktb7k8j4aa7bi271rm1eom6b4f0pa79gt740xa94blcgqdofpmud5u3thuwr5l269ouveflz4rc7oapusbactca0f15f6xaf5yid0grdcty60hhtfbb715a7yinw1g5gltjgtn9wxkb6vb0i50gi01nmp2utaddq06zbicb49a14iyzuoysj6qjg0k50ad8ob0c3tui2602dh0zqepvznpjgxb0cn0s053sfi2z8n0l5x7qdjghdui1zg9dyqdox9juo8afjq8zye2q9bac7pglpzs2xyn1br3v6jt3ozmegutjbermsxjb3cwyclfty6szmc9fknnzpw7obm9asewpfbh1wdbh1s2homveb7xrvsit3pwevkx4unsuv01or1b2eqy7v5up1adm965yrxhpeiqtd66afjmg2u6p0ly6kny72piapniujcj6vw7d26st5ln99pvimeqsj0ecwjwdaphbqtfas67jf8sof5k6hqpb11mag8bn8eo4e31b90d6b8y1xgqe7dpuieiai4e3msyzovatdyur09hnnt0ghze5y5snthd59wae2v52fputb8mv4x30wtpkwt01fgm7e543z627qtxy44h2tb5fylvgp3z8upw583ptutryixj2010ct7v33z2pfcp9xzglsl9wcmm3e47638dsc52n5vnwgg8ozn0op65e7ajvo10rv3hh2n1auut6d56yf7f8an9cyq1nppm73468u2k8',
                redirect: 'y0dlsbf23li8vib8bgudhkyu3ucg7osgrhq9e2117ppb6hfdmxs0hz21pzmxe61hhkg4fcom8x34v5r6pljq2zm5kqextmlb7h5yhp4a824c3ndovigxspj94t8oow5eoejehhe6hkefi51mbztsbw98z5rrxwbe3kj0l1cmiajr6gktw2lmdwvvfts06rxgn107vouz6dbvc9b3yxayumdjtvtcvy8refaeaqqbz39ktgdo5c4gqimcnx0a73yz9slj5lmb1sh119ywxywo8viyzhmkp144b0vjskfkr2te0rqm41by32wghr3ipkllzyntmthxv1ux7jo42u4eb2ndivrxdguo61re8tj9qpjkgkqimcq0zntz73xyye72pgygbn63ktxpil15j4gijlc9ycnxbfsfy9dwwalo8649zri28sxwmfu595x49h6a14434svxem6vc7d1s7db23qm2gwqcfzdtyel3a5wurhdk1qyl9nrvxvfnnxggscdpa12ykkq6w089y6xwat073x15bzj5yhigx0axk3r9p9l6wsssr60tz97yoieq3l8vvmaw95ta5m73wooqackjvt4w9g8btxxlv7b4khtzayn5xlzaxy5lizr7saug8e606sd5n7smlcvmugbdur6onbegrhunvryjb9r6gh6tql85hh7rg6tietqr4568vnkzf8z1eghkc7dinihzdvi1c5hisnoiugpmv3aexpvi7a4olboqiau9e04voralltjohs8zcb9n9vztp7zt7kvf08ndm4mjcsx2yqpui00b67wo0imyxjlxnyp2l3tbso00ngaz0slva7cvrxwxqgvwa2txenhuyyx5k9f71j9aitf0jfjxyh7gg16afkb77u60q96ixtt0nchy9sdzegln749x3g3tdlm0avp6pk8z0ac8u8uejbhov9sybkz3qqb4a98mb77vnen29a24usombn70kqnw6t1nkid19yhip56pc4uiwz6suh43y04sx7clokhph1j1v3tkmeqab07lzi83ppz069v0uprgkabnapqcqbzllq4nrt3zls1qnmapjbuy9wm33aunrd5wu3x9rdlao1osewthih2hz2vo86g53ne5tw47hiercaa6gfzir8a8pl5rllhivl1ypvlrpsn3m0mti626e9vp8t2eur4qk4gf40cuwqkwd4sf6d317toawuy0q0dwrkhxfvjf95ogd62chdckhmhpvy9q0nc1it4akzq1d9ifq3bulgku5n7c75n2plcadyeofxgwkdsb0tgle4m61qauvfez334si4iui8k5ojgf7yqkyh9g16lc9nfxrhgh10w3a97wnwdjbh85hf7tnugimlo74pz7x70alk8ipfr7l6hrp7rzypn7uf2t0vrczaj6fbdiyf534zr72zxw9u6fxgsicwsonrs6prvs6w0pz2kbcxle9gls8a8akxkgcon5iafaa3jpt2qv2zposyl44r26lmcp0hhcoewimy3178nqtqbntwfnhdsxje1a5spnhfrolvbh3o80ahpfyl9ri80zumzmojn18usrpi3ccbme5tbvgj0nr4ir3tnnssj85hoqz1l8v39uc2blrihrtjt4ct1pw2fgpqzpgkk2cfsi31ky9ttcnew6h04yw0g77m61tylqwr5mf9tmoyuvjs0thll8v4owuvyzkcapru5n88swhokel3enl5e2mz0nmz7589e3e7brci7wx6nnpr3jm8pkhn0tbxn7xz3bzfah2rp35u8dr5xxa6p99bniklc80lhgst73nqfoxsfmgbc4lgvpkegimw7ejslt3imbx41ekpki0x13cgw7evcey636lvlh4f3dsredz4586nqysemjfrdbyzqmyzl7j1l6pegvndb68izas8fxryoki4tp9g80vi8o8puzrez602czwev8vkykuqioqokapv928snhkkyqrh1ys0py62knf8nstrykvnt9a473ef45erv17lc9ouyo33tta9gdyxrwa0m',
                expiredAccessToken: 1517909405,
                expiredRefreshToken: 8385240636,
                isActive: true,
                isMaster: 'true',
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster has to be a boolean value');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType has to be a enum option of AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c',
                grantType: 'XXXX',
                name: '5vf2ijseau549n9ynsebk8zycenfzasalljr03z8yncgx6vt0lq8w6048u7smwh5tixv3ymmk3fg3o80kt4jqqf2npn5bh8knjy7wsvngnze2b46f30opxnflnbok96s8wmghdncl22ozm6gfhtngqkdc1gfucp1rl68ilmvidogrg4vphkbqorp3ybkvmmepvj89ihqua7my5p00ytuczciksjbufm3s7hyzpebjxg3hvsl31howa77ar3fm63',
                secret: '4eoho8woxxyxcesad6a55fhxdnmqovt5i14sg1w084v9ywkwaezcmqydjiru759dw3ey9fhow0jzsr5z03lzs0z09a',
                authUrl: '7p7xldymtx77ugooxose0u5mkezteurxnhy050ovddpw3g4fjlx1z23rb1h6adfjgjytus2wzbexytogv9diaev6jyaz6he7lj9nzd5056ffodyywsdwhzl9zgai3qtjoe1h23er0vb3712i0a4pueft1ddzbu87vn9pibyxg8k843fv3mccbnxhxqdr1lti35ihrsi14ox96kw0gnqe9vop9sskhgxiing56wwwb48dqw0bkndvluowc9vqlk95h1w46rt565d6dm5w3uf1jg01q4fqk152zyipexipmygwfw6jhe59b6jk07yao5upg1t8utbopuu2ix6h5ugw0tz8xbmvm8dfum9audkuqag9rmzvb3tg6ffb7lvt0jhnkmfkhqtrlybhi6aeuvxtacaua6j3sepkpmvqelh8s5rgt81042c53qefd65itlv3lj2idur6tjyb4bndb072fawduy06pw0n6epg48bez11s7ux9icp1txy15unyz8l18rj0poc9clsls1928dlwbdriqorh23rej9oiyikqj2hrbeqi0wv0qsb4ypbbz2hywn48y3o2w11ashz2h3g6f6hhz467eateuctij8tii4t1yvvtad2ppqdsvq36ge0i4lqg8yig7ju3lk3hli0ojwkycf2exwygghjfn4ikia1qyetba71e8xataz7tddx0ortx34m7nyp9zmpcwkwo1h22uv98j662cyfxvoa8lcsv00nivby9jpcu15kevpgtiirde3chsrpn5lxn0ctrsvoqnmp46pu97q88odu0iljao0m0938jbjx3ia3vb2j0l3fxyiwj03g26pfakopkon6une25f5iwuc6058cfssoaykkmo28etxeb0hflx11shogsrpl3abpiyw417hyycn4hydz048gwaar7dpxeca5cohe3lghfifnei7j83ejqenr7xolesuvp6meu6jql98v5vpiqhynrp30qexi1jq66mga7h7txzef8tsbqs3diw5jmcs6q86tfiz1919jg5oz3uhbq61peqvxrjm30kqi3ulas4dhfhymwjnbyc26zxk06r18mpwb82940f31tc51xs7kcbqfjx84eslc7fjey45wvkp4vu34qhdkn1nmlaotyygpbgvsv2zmnc3ot30rahc4vrxdwrk1wxd6dnvaebt3n5e7tkyy90j1kir9rw3bo5ipg6riu9n81lakz27f5n9u1a0hf0gs2ofg8vfz18wrwfwpddzi8ve5pirtsrr5ehisjtxb9xwu96p50vqwspcwag10st31xo8lbx43uc4vgslplyvqb747ew5vxv5nh25kcxzh9eahnz0sm2mvyhtw7t0qdyw0oesx4yw2d1ux95nnrxfb8nw0538bvrqiwebiwiija17l4rvz6a89romy6d54x2vqutk2b0c6xowkellnw4hqf0afpq5s5f6k87r49yard58ih77r4ragv3cmkpoarfzepzsrwrq5feiet88cwa1b9hxli8a6z170q9qfyrgr18vlljewhlp1o8ionukk6f2xm17pfarawajyk0fr5p1f5iqc4j22p4u61apgjqz6jm10si6swwaoumibg99w3hgayqd2nhilb1esv6shmy6aqmu1vkap2l404mrci1zvm6fzvyvt01g8u582zbv72ztyfnfjjsn4716tlbrf1iyg8r5i5yvvmplbplp34lvgdjaxn6qzcags9ffosq20pl6x3n78jdtd1r8bie75yr8dmyd9z67svjpfi6f96f672t6gtrtlww4xwjnpi61a900mm6lbd73yn1ulo6i7zq1cqpw6qq3wumh6v832xij3aj78mj1qdninpq1lyqu6d1157r9l7ez61zks86hx6dmmzs6ymvykbi545yvqd7dxd143j4fz9hdkuieu7oomd6bj9fqxxw2a7rmr44km7569ekebe87dyk3qpv35y1hap1zdo5ofn2a3hm17i1qmj3xnlpf5t8u7w2crltjeg2p9u8mq9tkvw',
                redirect: 'dxeobhv5sn4scpfva03otirhz9j3pqcppus2517mp93yelf80j1l6ym036db505dkrz2sxz0rym4qam4d7spyznsjvwdoqyukjs67iyvpp0kgpz8iogtbj7cao0u7j10g0cqtn55vkz92m5jjxqwoisaju3006xhcktlf9ah3wza3bgnnj9rbfegcycet3ge9dtr9df5dby7apv5nl7i7odtfrrd4mfrbgnuszmwz39ewqrqxmgdx4muq9af79y7ozwm1jyztw7p9y44sr3wmnxa6ywki5u7krz7ru5upggb4pxcbho2v8ha8dkwu3v36ss3hqcxz0nzdqw51xcm10ne16w3g6rh9jpqps8wl02n7vz5dcsijkdiymcjy6m5kcvds8izk62aiy1n1xgg9gy23i606m8nnl1dwu1koyynwty58znp7ea0v3u26kdk301japfymmdznrzll2n4mozooc2ry94z9zh9yowkedatb9l1nxpkb6d874o9f6f9k50zgntgoh1yc47jb5sg4w7nimf0c5usbe3sw5relcr2ud7kq2i9a8bdvipgl6qm4cwz4jbeb8w3d7edw9pu5xiyvzk0m0m42ryz1h5lsk09w4x9sq8smatl7i6c72a2ehiz91ca6z8lyy84pph2xv60by6mr1xm1hm07pc8bcugmi4fzxk6x2jc9dqlmcvthj0zjfv9btxteh3stnlopj0cl53609iowx52demfpxrvn0nv0flf0koi35r512kwmogtrqcewar90w4d9nnmu7ci3e0yxu7xtsn0ld2mhwtrq7g8ydx5j7s1tly7qhfvh88bvn5nip005wkfqiqpskp35ufztt16ssfv41x8op0gy9cz4f06aw1mewpjvvek2taevl07od0hep7doe3va35aq3gv8na8eknctwbr39exd25fj29mhwnbxfw6lpcamtn61l7rjcdq1j04b1rcr0fuo450tq08xxwwti6hocolbsjevcgrzhscshi7jv1a1iu05gf7qeu9avp4ucd40dhnm7qgt7wtcdet88m6t1p9qgkmaqcg8eifw9l2fi4tox1bd5husnqydbvilhm1fbbgeghag5i8nhrc7p5p8xnytwqu7ypjzokzn1r1qj1lkz3co3coy0tifd383sr6zr6b8fhvqgbpv3qvmgzcb9vn4i2fln7d7garlc58zp84lrjl4oew4nrngaq9yf645o2382yitfy96jgge6bsm23xdzhlpngq26x4o76vz2myc2tazabk1txowwokctlmpu3q5hz0dfw9drsmiet9yso74x1w2tlij2n9unlbfudq7yxgkc4culbspiv6h3iivh7bmaeb3tnpo4vy0p52xrw1wkznivdjoehkjjo3g2b6uxhmh08lcuz5eipbjxprhn3k1nllxof5hheahrs0fs7djswxbbfmsia4g4htfj835mewtglr2l35p26n79u9pjukaje4sty2u81rn4ovcw7qqrpq0qse3us3ljfxzt2d61rdqgsuwh87sswgismvd6hvn6p8zitahejpuwflw8nkv36rtf4rd3cm9g9vbyxgxcifbneq727usp6jwfttit4g1fz4rix65lxuuuzppck1q104bdmy64948y81j57vifxpbykk4lqnjaraoiqwmn4m8r9eky5y43vfbuslumj6rj0bxf4lxh0cjjb5pyosvrn2p22lo2weazvrsbpsa9qwa6jofukj3vvb45em1dohq1hy7ok6wxxueqtxwx0kgrz9cm41m9k7vglyp6qx9yl4cng9ygw0h01i46i7jx5s21acvslijxljskutbv7nwkrhm58fzxqbj5xf45sni7au58padsmp6i7fmlux3l9i0femfqohphx3gdb27qvw1bgll23av8coowcqsa9cwnzd96pjl2t0xps7ff8bllrv87a9r1wz7g20qfvok6u8vi7c3af2ox0ohtwk40vuxcqpltra4uk1kxtlsyqxe0lyjsek75w8swclau8ty5dc',
                expiredAccessToken: 6103653994,
                expiredRefreshToken: 8505901849,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType has to be any of this options: AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD');
            });
    });
    

    

    test(`/REST:POST o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c',
                grantType: 'CLIENT_CREDENTIALS',
                name: '5s6bfqauy8q68hov5rb1eih9u0eiejjzxod0tr5rrb918oeo6dlyvgfu0me7jew2vwh3rqqd22b9kvjg2mu2lmu3zu0bfzk7n3vg3u7a2b93sr5kgem1c7h8zxrbs7sdz8rydqr59l9pb1ooxpqya9cnki8ir1nj10e7jvr6kff5pg3g49k9lc15wvaw3esy1q3o1d1jq8n42lud77zmhr2hkcr98yvthro5wn6oofdmdi6fvyoa78r033egrg9',
                secret: 'ma3aa9h81zqq7co5yahu13uh3xulyod2u8x7doixz5ey3l0yzn5d5qpjabuhpuev30eo0rkvypj3ph8shc3jp18yj3',
                authUrl: '45t4efchf1atz9rdj5fzaovjm0nxil7jvzpbvauimyyi5apsahlg8zbldd2yh1vpl4hf2tcknxqlcrup55ckokusiik95r8o7sd0uo152kpwafwt0mch5s145eh12yxbugm3b69ha2mrg10ccfcqbhwj6x0kbufuoysidfpce2qbtu3iiwizqrk7hz43xeb10xlwyf41hb9nb9ytwvjn07hmulhlroqxvx5ist88tmay04wvnrgd33m0gmxvmxh8yluhnmyelccrfza6luoj4t1l876x9ve00tqs6np27bglm4aagz5d6n3ffjzyeyhw37wnzr9jomlp77uy7k8w4qejbgrwzpprxgcosamtwe1nr62sfkywwpqhvj31vye29ryklkzunue9dav82gxsbt0zof0itmxyno5yduf9ghdguu5pslegm8kbznxui3hz6q8bq2dm5vef0k8eqj4obzb4fkdx42kj1584vc5smwd2356ta022s1sncsphtwchpr3czkwd5ju7fw1cavljvntz5dejvpo817ojk18978reaiifuq3ke2oti7qwvgbjo3wcr5rkzmqamepac9acsvhu0schhyfc04zz1ud01pckvvqxdzcsm6t8r3kqdvqp4p1566ocrtlenlvjsawauc5l7a7lm1lyo8aeoaprv26joxkqucao4daxzy5ghf8n4gspv7u6hdcz7xkmi8q3l2gdqvghr4k2bh3z34qoq2kmo6uvzkbhq3c18z78hnio9e54jnvc4mod7po624tkxq27hg44wfxbansk5ivevxxv3ls51kw7jisq5ckyig0ywptkfq0d5wybx5l7cnjcoqotd3xdk27wskgavqg09fc6q15nifkytfjn4sxnqiqani9q3xf0pgumis52duhyvbblz2m6upsc60hrhtorfduxc1jmj5ch5bn7h6qywsifflajjq35wtt5dxb88pnglwg3ehtnuxwkbtndj36eehbj7djijncvtgh4aorsfsz3trffo7cftd2q66ddwd42kp3sl19nce0ladg4h6mh77i8u50wcp5gvo7veezexiln3l18k6g11wju6m71y1qjhs9vql6rlrez1bms3kjbf7cr70g9zbhe564bftdnotbqrnkcbcdrl8ag2hzo8urhp1ip201aaoobp4ynix1k12py6kewwmigtgx0w92o679sh99j0mj0c20n7xg888ige6g2ukei2euzlale1g7hqo1fjn5t6oizwua30kmbjpru6yge2j5d7hrcttl1li55r2l4cz264jzlc4v2v9f9p9tqcd43nk9v73lo38w50rh9o2zzjztgk4po4m8l67ipd01epx23notmdj73fzq1h9iaz1h6cfccalfp0tmue2upd56zsl7uz9bbjat3db4xm5tr65vfpmo7p6udsqejrmwfctjgrokx40s034r6ldkwzbfmmldebfc34arrkbriioelc484jcpeuzp08be9lg41lsi234poz5n530i0aphvycsveatquuxnxj8tqh6lzkhvz8ppqxqtumv0ff1fg5g6rf7xx2rplezmkbgh065lea4htr0pac5khpztwp32kmmeg00l4ynrk6jedf5ququzbdavsf415vf6g29qleeuetop43j8r0gyvdi1cebj8lgne3ovhw1tdyq1o60fnd9u63v2y0cfx2diidqmd4zpouby5dclbvjl3lygxm60mr1t3chc35j517q8jkc8w0q7mabhdxp5gyydpnb9fkdjt8ltmwxb15qo7tx5cqgz1wmsndqulxoe8ad0m8xp20ozmnqgn171npky8gnh6vwhskm414vhfcd5fyotcngc0cvefxw83bctv65nvu1n2kig22ukbegiavl3t8hyrtfj1p8o1t3kufnharftnyimr2b2wsokb1f4yd6mnja0mmlu5ncfm7ihop6zszaqcmtf378zbcnlo99m1npm68gcmzzticbh2pk8m0erilq8fsr1r4o2n8oe8svp67700uh5',
                redirect: 'mouzsq2lmp14ca3o969hd038dbf6fkl37bff5h9yzbto0y1p5jsjf7zv3w73417k28nxaiox3otcfne2gyi6p8aepxbr7kt9sb4yioorn8jvt6a3zk75ik7votzb9rs0e94vh59nesfkjv9gas9ltklvercga0thurvp2og79o0laescgllknlcwljxbz9pdzoc0b8g2ncrn194e4nbzg6e64s9djt31fqm9leydxvxjtajbfvkzswz7hxa86m680ubeuz2dkphql67fdu34613aj95k3k95vdnr9tyfwdeox8yhqdytb1t1hwr51tkxptmj07effjosw0uzxpbis4hss0uos99jf98avhmpcamblw87f5ulnkbc5jlt06s7o1lvrlnu8ma83gbv4gd39c119ox69xjnkldw724tg0s7olrjscysoi7luhwcqituj3qpvw4ursne8smcaattydb3ql6ueu9g5stp0tt5cm7vwcv5yzxbbg9hw6ck4adgvz9zkhksgwo31vn7132fe7a6q4w68ie9hhvjraeqro44kyr0v0l86olrf172ri490cgvuoa3n4kcl9utxn4qoxisdawikrh2a6s61880x3fp0l61458owuewi3z1eo2ometvwtiezbk9gvukiz9z88m8qarm6kaqfworewowfz2qbzc27lt602hmv48s8u845n31hdnae3wir2ct9ph4h0blb6ti0os94abgd3q8g8m8zkkku44cc4m75ldmom9weteki0hf5kzbijupx64v6ghpvp1fq8ru48xh0cmmu4vdo1utq1j5eug0167wil11w9gwb76jrpcl4hryc794iro4g88iyoesxs5joovxclhw6x7iknpisbrftftvv0mp5zzp244rah11qq9s4r1hd16czarzf3cz6phucs8sqfpl7tsqgw103fdh7hcr7nszlxnv6pd3jyupxe0sd1795tt2xfefkzpc8wee1id1for663o22fmy7pwmr0g8dobp7v6ndmxpl1xyjhjauzifo8wyahuwjlw7sz0628zt4nfa3szn4sxwdb968zllgkkywekix5b1fvamniii0lpnt3mdbhb8dxj7q0l8xs8vb4iiq8rmku267szii37ddy5kk071fbpt23k1luxp1cjj25amfddlerwa4zjeaebwh24a6wmq1autpo4kp46ct5vfmidkam9fsekq7ygktzij97clzuqkjdbvsc8y6qiqh4opzvfhdacnl5nh4x5ht6sy0h1b17jylhh980f2a4jjh29t8wsfxsptkb4yi4cc6eu9qs9v66ayq0ue871298gp0yl996tf1331gmine1p2puaikdytfoi5nzs5fitmjeg7pya08d37fo6tnrvbdvp7lkealy2853qqhfevnyosjuauqhh9egjf6rmbkj1osy1rft767szrkc33jw81mlcqdsi9n44zyotzyq8nf0dv2zh07h52003guwhozq4tb6yl6i73lq86reronpthrbatx7n6l98r2pblc7t3plv1jj74qe1tjrhivambyd1utp9kwomcicof07dr3t66nseaxzdga6hnj0ns6vfoycymp9yi7dyqtfhejlg6vtqw9uk2ka7sdbo1cq6vhzrvadoxd7j2q47h8zkt3ovsm0wm4kxkpb30442hdfqhv5hqf28ditl9u9juonufrf1wt4kstwbq01pcqly3jixx9ibabvb65eoxetsaauqblr1obaipzm5zqns3n2da46too0lfhphe4f72hyl57oxawcd186jq9eim7pxi1fw8bc9hbq2sdff6edlw3bhzpemdywi7wwhlw8kzqi15olwqhg9r8ds8tncws57jz8ns66w77es4450vak8jl2q6y9m7bswdbvxxnsijjmw0w9b81othtgarxwivch541wkrgzlcvrsk5sb7gohbyxh893rst5i546yje5ptauxy64zu9mtarx49kq8nv5nh5ey5p22id4qhdtvefsddmjwjkulw0mq8',
                expiredAccessToken: 8591045459,
                expiredRefreshToken: 5080935503,
                isActive: true,
                isMaster: true,
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
                        id: 'd6252910-9cb0-4d19-877b-bb7bd447d17e'
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
                        id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '2536164c-6bfb-49cb-af40-d039d4ee7d7c'));
    });

    test(`/REST:GET o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/26609022-3e7e-4685-8358-65dd4edf90ca')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/2536164c-6bfb-49cb-af40-d039d4ee7d7c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2536164c-6bfb-49cb-af40-d039d4ee7d7c'));
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
                
                id: 'd02bd77b-fda7-4cce-8876-7bb9a177fb31',
                grantType: 'CLIENT_CREDENTIALS',
                name: '1y9l11tysc64slxpqh7j4h53ltorkaunzvg4xgwwgrhtoxs5t0l4u10itgpknlct43n20vvwxtrf6d34os0rocqntopgv39olxqbhefl1oezasouae5ff96j3nq9ph441s7inqo659cerhdylurxm7m59bzci25swyzy2hghlaz6vah5z7ix5asp14xznrel1y5gm48epsa0pszhalh94b5dn7wd7jzt0qkuk7fc8r6ykp6xg63fowxktuob2v0',
                secret: 'yaj3zzaqvb1elnrlob6babqukiih8f1oa3v5qe4y8tcooqqrapzw8hvc72pbafrfqs647q1a88jgxz8frhmg9u1sfj',
                authUrl: 'iedwwlr9fqbb7cypjnstkluvo4fh3prqti83uefu5qtr1v8sudbgwugfge4juf2bojpvhbliv1tpvcl1zdxof0saq1zbadpjx5gy3323b76z30nqwabn06lawmra7dnnf72wdxs9ksf2fsk17vj5cue2cvmxq1vr0slb4tr3047irjev99p6ld1ry0hor5y5fzdaj6sagvtns73tsf50546qvkk1u7cfpgfpp39uiuetober0xfib5lraf1ztn8e4f89pz5pedtr4ul33r8t6gg6uvt6st05n0kv3pku4dkb65ohhin9xww5gdbnh3mcf3ypbx6dium988fbrxwbux3le8tf0homuiksl9a0y6d0mx4yibvcfjic3ngaokmlmkcw7tsix30wjfaedbb5q98793596773fg5twtkf65124gvk2w65f56q142obtuolo35yrnb29i1lyxyrzj4kpdaivfjz7c0unm1osq17ql3gn854jdjqreiq83gi9f5wxtfr530hge6bs9z11to15rcsxw7os66l6zrj6yn7kjob2py92b9mxliulg329r3kn4ibx8b0dfmyyw6o2ypj7cu1ka6kq9vxh1hhinsrpiukof76fbiuchyrd2fzkw5ic1v5sz8jixqwdy47xihz96juvam5yf241b3xg47vaa5oxpmslxzfb9h5fylilra5xwh2wuz3f8ifh2qvgjkvskbfybbgf4bxv33owo8epkzzettr4jic7f0l58tsexwd19gyjzsbwhy68kruvtorqe406fftd2x5aoo60608z6p64opa2fexom38sq8ddukq4dff7bmog339h8668hriwooqgv11jkfhviz4qged9s6z7zdvjohy7kxgzh005ekq2imdha2uaoxlshr2jvvipre6amrc60fe34s91ei6r4wfm75ndzd3ffv2enbkgq69widfuo7bg7f8cq5l4kqwrwt4vjxwjmz9fa1a15nkat5fcvqo8eqpgxdqgrtp9350jcekd6ug4po8ypt2biy3w6upa6jd0gs8t91h9w12ozlp07hrlicceks3vdofz5c09ujlfyjb9jpmo89iedi5s48lgmgyi2ztjp3qgn7terkg43ignk0z260tccxr5m63zjdiws89ejjeabrgyrdyyy9zbgrvolvg2kfntali0133umbooccdapmiff2wfk5gxsiunfy7y8kx54wtthamdk4jf2hr00p2hzsf2aig572t9s09vv2pg8n34yvnzhlropypda6kpbnnjdgnkhjj33d7djk1n2c9qq4zhf32c0qpb0khtbk9umq1wkzdbtffpuf0zskecb29z4sa5a132q8bzpj1ypfcg3j0park4ncihtokmgn9gufk8ip6vc524k6dlsbu8q3jjzli0uycf73jx1bp2a4ztz6wz0mzosvg62t0bmogvpyajjbqz1yl7p6hx5paepaiogtfi24srej3tvmlkzzzh8ya09yg1bj3xjfopg5drnrwymbf79jxopfvqamqz2743ksmwz2f8g67wm38cnhaa1qj5oj7xhvqpdru8kfsh7n30oukqtrxx62soaubodbcniu3k04s0vbblpt2qusuavkditxgqzghr8y2tywdud6vcqksnrbn8zvfx95c5kq2uf7no8sso02il2hi8h37jq016648qir09po23yr3x6b1esph4bt7l14a4b5qb6oxb0cuzfhy5tfyjedvkx6h7xnbz2flc1yasf9hi6c8qnh7kpcnr14tni8h7jzuayh1nevddqr84990r8c7d87i2aeib54swud4d4kbjtaku5kiptskdb3u91imypfsne9jt8m5tsnu10u2jxeuohpn05fif9ut5s35b3e6tkdublbf6yuj6yofnfvszyelyscpew8ckcf0hoyenyh1qs6gzp8h41selbvu9f3ewyu4unwvao3icfshmjioio2k1tlq6yownkz9e1xal5hza4v05kfo7h4cw9u6wekby6s70ns024mfthx',
                redirect: '797rmouvwmyu3rtn7fer5c0lymm6hss35yhgrtr2h5bbc94vhrj4gkkq9566f6f0sbio33uz96w70qvco5r38stvn17yzvn0z6ymhu7l9bxbc91s2wlysi4fgb71ooddb68z4r7l7srpj0ht9lrc32i7iz1ji9qah8i135zjk7svgw67enemu3ie8l8kut9mm9ezjyhamiervdq6bg9l6qhv8p5yptkkj9f19nvnpglz3f7onormuymoarxtxhf1khfjfiiu5ib0efk8gulo3m63logag4r4xnko0b4q2zb1uh0vhhm2go4koyt7p08h74fetkj6xx1x8b3kk8bnlwxlwu4idt3ivgf26evryeqx7dycfqobt6auaif1osjiw0pfvg5lywg4ici59gmu6wd0vg3x36uubbgcpvkdvy9snjda548mim8u4tuq1utp1mkdzf3enqrsjw4al3z9z07risyjnp7nspi9o84uylyp8tts6h5r02s7u6qlskerj34x533p643eazxnlakdw8sjeh75v25t3tuz3qk2iqy3oqpktqqpti27ojsg8pusaiiyqga6wm1o6lae2e2eyvjftk7t8v7n9zedyfdwatfhzhpekhpp3rt75e3rdrx3sfwq4qi4xeybstpx2qpzdv0yskdruyhzl7f88415m3fu74plmc8u29pb08zo9ry50t8f04p21is7fd5hlihe5n0xn03l4rlc1offk3r9yrfcyax6cdiyyucnez7s7efbzdzpurriv43ixy7h74302fauk5xcgmvexlncpja4rc2233dacph4wsfjomh2g3ueu966x0u2uf2dssczs7w9i70e9zbn5zhft7vexyvxnjsadpsctjmugcg5zclbnwvuc8ydxh25bkne6fj7vsvl65x3e282t53fpp2nimmc2qr7ypg4x0487k529kekjoesynvuycy2f5wcb1g6g1v5gkg6elunrxsrx9pvvjx7til7ca7hjh1x25af2ran4j3wiylud74eurt2dkna0urpzi6hjmr6ulsq977h0sblgok1mw5e1vftndnklht8pka1bc2jufvthmfidb3k5e5dy8g5w69u73sejn77j9tul0u8xi9dcnvmueoyyiaro14uqygxb8vrkptntudcwh82rb058ujy8vudynnamwxjghyjev71m071n1pts01nhb2x1z5shb1qswq6xsqx7ba5i77yu1q1y0qblhyxusonwfs9fiii2otup8basbayn9uyt58vtuqugbw5hz3myrlubxl6tsux73n49p48aitnpbu3d3p51n8bj73i31zn7efxqmixa9hcv6ba10dvo8anyinj1ij41xi9thismdumkj3t3cl648mrximd9d1yoaaodkr03wrdaxo0fqz66icgu9l1s5fuq9i97pbnlgut2thra9q5jg3c5cyvf8eaeyfrji34lq9scs5cqos5x3lbt50gjjlzytl9z1l8r50xyg3daps955hcsswcs9n4d4s7jnw2xt3284hf516owx2q1xe0db3u1jg951wmo0pgh4pzprc3wy08scjpnl8wxh7z5hxuxnxeq7ppqlu8jkgtuvzbl2e5vu6395wwde44h069rbb4azjfogsiojl42dxxailhhihnldsbx50se6uj2t0yp8c9b6xqylgh2ck9l2b5vmvj0n1gavqkmqz8omvxbb3rbsmzfplxn9344fbea94903qftd6vfsxierosyjstsqso4ul66oalqcjkeq8bt5n4a8fags0acvotltg49bpkw5tazkq8bkju051kxdvt5xhxht8rmpnjyge0bjlnfbrg2ut3r9vx7bugswx9naye9m0kl2cdes8lqpc6wjq1845ad58y6dh7rybxtt6slhhcev3gpu1hehlolssnyvdx7l9e3j1jt6jvz1zc0tnpiw1ke1xy5csw1hgk3l5hhuie5m11knyh3lyrdy2kyz7r285t7yzqq6vdsynetprn4jsg5j33mfw6dwe8v2ch',
                expiredAccessToken: 7483136977,
                expiredRefreshToken: 1928415263,
                isActive: true,
                isMaster: false,
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
                
                id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c',
                grantType: 'AUTHORIZATION_CODE',
                name: 'xqpj7kymn1ajvo4a4ycpuw036c0isjiwc0u5ifwgsyus08inan61m64gywq71hi5w8rslyoznqccjb91ev6cpt1hz4b6ha5ddrnzp6rumm4xhq6367fkgptvqxg4wjl9ymct1dijq9cqtnp5zjflm00af09m7qwatk0iy5dl8ppzykkkp90hljbj9pjvfzmuvyj4qfbxaan244ohvv8y5be17di3zltluyviwlc4a5upzgt3ol2f3b83w7a60pm',
                secret: 'xqjf9a99vpl53n3crqjffxoam5hy589zhr5hhrvohgw1c6a7r448ssqpg036gxopkqs2cbzqtmknjti7xwbqigq0sr',
                authUrl: 'dybhk0qhixwyw7ttlmaqajmorj5rmzs2zytna8fl6asbvdb7brtmkyk8c55n3yoi31qiu3ir5cvqtpyq4c7pq2kwszwxxtr70710n9hnu6fdddynf5p8y4p467ohl1or96wzd7ke12fl4b5efv7huu6heoxjqpacnbk8dwnap7flbrwz1gaw82uez11s6y8dglmg1nkjr6j10qt9ao8ng64ejpdksi3qvtpxglammz9st6c9uov8w8tgcwdw6832tjj312u9ejug8wtcksfpulzmqinqbcmdkxuja9lkbkmg5nld1ov26yfw7sprbqems5rrdqyjnmhx2gd02jcm5ni0781jvmremox3mqplk3uf296k6fdy4uqp3whq24syfqzr69lzdcyyg53njcdz9wa4sit29nia7a5uevavpfls2g9jflc8b1l39bcc83f0kxakt41oa1fx613i4y87b079pc4u18dl7yh7jao872t6htowa2jylg39wn6cy4aji6zvz0w92errr4payqqtyjvd6yix6gzj7recv7scf9sw2k2fxczueuxu0lp13asrh5qvlyb91d9idl8d7d4zbb2xwi59b4ku7g78fyqt1u6rdm0qg6nlc3u8tzggsynbg2nd6ap5a2he3so2xt5oxds33zy9rqagu0rksujs4ihbj8mpzhxix7j4f9p3l4otcwddeoceznfg74po9zzoe1dydb3tukalznxxwromawks98m47zs9ry7imc7g1tjj7x4k28mucv3vtrejltyrugf79b4ohb074k9blc7cjelszm4hgpfcx0tluuleux5tbzceq6sxnq3sw82mzgykg0facj1zsb8agwy7r9vcaoks935touaykbgur92sdu4nk9hum36iai4t1kzktfvhheev49eej4feqhrgyc8vwydpikplqr7ffygq1k7fgp7ih7vju239wn1x7995so4fd10ipmqddcn33ikf90s73hd2mx7ltpepest70do7bo62rueqk2dnf6muvcdjy98ldcc17qo23rd1p02b0f455tcinlcr122egnznfjm1cqmf5km6kw2p1m00w71bslkw4ie8zsj3a4sngu7r9xl27wytg7fhybvxe8666pypru8faa6kzrsaz07c9popm3qp4oew9s7uipdwtxjkiyq1f2k5d66x0lhad43qur7idn7j25mb7ng8z1rt0iqe8idjd7629st0pd5mlwvfrb0deymd5ahhz3yant46g65owb7frqp8juehy1fa25oxyl9k9x07xrhhyjonfhnnh73lqg0tuv9lkwxk46xxdjg67oowns9x94jl3j20ay4mz011wts7b3y71zplubgo2xxqbnlge2pdhydc22wy15fnwfqhg7akk63tuy467wgcufqwf0tpo16evahsat7g1nzn9ftf3kppj3whg3cajopt3q4pomjfqwjzhgjcx8xp2v2vr2xfyn2peo66lpgzv15lyz0q78a7unxtedikq6tv4aa6n6j0kzlkd6qrqhh0iyus5cuz0e5hx1qilyr5jeihv3f57wllugdwsj1n8hx8qk040fjiq4e9t11n2885r99vp6lgtbk4y9y14tjktvyfw60tu6j1a48q8duo73n70o44co0tu54c5r4rdnfj8vq5q74luawoh9ffd76t7oxi4n8iz19l4ulkytddbdbdqc6pysn3tqvv2upth18h5fi8lseyfwfpn7res1opqcag3livrb2dnedndlivrg08wq1njfwz8uqtghtfwrn7rv1jf9ym9jgg7syuhh0p3rljv7rmdcpp2raik6vufsudsp8slx5ez3ybu6g4ml5sfoy21cta3rok8v1xeaiez84sgmha01diwhdfnsljt01q6xxfv0855yhjcwgydyy5do5l4ymera8584fpg4wbz38qvx30medg72w7lxvohk8v12bka0avg75ktbql9k7pe62z76i7rl3iboso4qep22dt7x2on6pd75o63jxy4a1mleic',
                redirect: 'd6p3z1tx2qh632qpqs0r4otexmpdi7x5ds9eg7jahgmtm3yogbbgq04ya0ssrfky0yj54dnlbqxe44fbsbh0o08xqlz4qm8i5oluttzu3fbozvdx90u0tkatv2j5nga4snormj75vegkh9nvlf01pes05m39qrthta9niplaqq07jj1f155ww4dzyf4ctmixo1sklonyy7r8jfivewqma7vbn396h3vrlwk459lhgenyc3dwnwxy3qx64v8457wk2eabqrpn3wpwmq8g1t81avvoon6mh2aow1cxsifn1azyqvg2ayv5s8n8q5armszhan1o0lqof0zbbz0owbxkg5136ffz9ud1i38idhkolqcrl9k3ghv0jt66ybxeu0mrntio307a7w0cnbawfb6h0wijog7oqv4slar5f83f174jfmr8iqkqx4a40bv5ryx066xk6smie62zc92k9fyid4tnocvewv0mf2hziik3nylqc2fc3ojihhce128fxq5zxsipsre85tmv7r0sc0qhj2qmpb9yiop5czy9ri0bh5pczgciex22jfqer4nt4o5gxv8eshwn0jupkyslofbad4ipxaojtz799zet47yll34ugi2zqdr2nwi2g1aq8546dshnjevzozhg2em4knn78qi2rwwry6xr3nbzie70cpbmyhhf9859jljijy7vu9f0hgzyn1kbhzihprg70ch6x5bfwa21x2vu1ae6tjmqo3x46aol8ss8fbwljam1haonep6pdcffv0ew55b8b22eqg6wo56ipw97usw1mygw0l2o6cdkr5s60k4b9u99v6c3a0401l3rxjaku72b7ltoa1zyvt0db8p749rbs9bthkpk1g4rjznd3q0tgyi60illqmklluapru6lb23bhkr801ayha9v8jxtqgt5t0pi8lzf76lgm0hrjt3lu4mztl0g50pdpm57pobdkohornhbg94sz24gaig93nwhjbphvx5i2ce0o6g6ntxhodrnnispvmfts3upaytb6hk93fsz9bo3p7edw3c64ndzldu6gjiuexzrrywie7ggcqhj8jrybxzgzockye3t2i873xyagudid84pm6g6kwz7l1eq8dh1c1e18vvbxiefyv0oz3pae5hejtrvde5szsqyt83sg52i4clg68ef1eio16y3fs07lnlp6ul64ta37mggycidtwtsemcfvblip33klffm2yzlik1xgko3klpj06e2f7y5qs0fdewyzgsfy2uvgzatwtpecsq7byx8cj5w1mm0p950m9o3i9kpfhy6twedamatt04n01sswzafnu5okms5lq3jq2c9xebx5yu69trpe9yluo67e4tpu6qqbx4l4gtucjbtq5saur8cyi1h20s9kx6eg40ekuas39m7n4syx5uobclp8l8d1s4xxkiuax23g61yqknrhbsllz4e5hxvdqeiggxyay2ezjb2i7h50bwndwkz2caa65fg81wwmdxtt0h7q8wy26c5lg9poig0je5a8vvhlcfugqtmbu95b341qcnu343fh3yhd58m63e8btr0kgz0kvecupc6272u8v0x1hsi1bi1txdyc6dwsyrzfw3lki687wa14dndoesw4i1hyjtgclsintxc2hiz71yasvnn0kgeiv5umj45q7fdske73lsq4qyrm2xzkb0mouyamznmevkzjnfezbpze3u5ii05wsvpwzzvtddeao9ie0pqh32k96cqjhm42ohi3ysf9vq7krfbre0ofc7jqnvtqbtw51wbrbjaaube27sthro99ty4aqzoargmtijh6ldih0zv05kezfcslrkuozp47xjxec2odsj0n4pibnh1pi82v611zm6ca7ytu7xx3mksagn1i44ajujg3rpilgbgg9t8z1adc89gboxo01nfe7c5sgppb9oxfsie6gkgome0z5wvw8s1t47hyv98te23pp94xwl4xpvnop4g55tdxkbbo9vrgqtuiyv91cbh8v29t1ch369rfj2sk1ht',
                expiredAccessToken: 6026224169,
                expiredRefreshToken: 9077184886,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2536164c-6bfb-49cb-af40-d039d4ee7d7c'));
    });

    test(`/REST:DELETE o-auth/client/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/92f6c888-89da-40c9-ad01-956368947773')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/client/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/2536164c-6bfb-49cb-af40-d039d4ee7d7c')
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
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
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
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'a8e01cc7-579a-4e98-9feb-45b432c97ed4',
                        grantType: 'AUTHORIZATION_CODE',
                        name: 'n8fpwo0sm7y3v0y30j9ae191aheimbgb5sbqcus3ockc7src2k2v3wr98i152lnlc5vb7lsnbkojt6na5vy1uc55is3f1ygdsnyu90urxjw9lhygs95it0r96awh6u9ew2iv73j2env5xbxvnruczohvobem44cpgb2evjfwrkp9fc4tic98wulbgzw3ptfhyx7qnegzlv8j1n41qfzhr1maoxmzjya7hw1djrs3d2w9catzm2qggrha1wpk52u',
                        secret: '9tropq6hrvdfouiofta8oih7tcadskodzi54avef9cixz6c35zackhd7o92gll1zkrg917cfhnstfn5cgtg1sno0q7',
                        authUrl: 'twiblewsriaqgx3o7sxdy6zvur9t9vya505arx7g0jpngys57qxissqrcefk0uop2szfm5g94tdvbychd51w3eaywk5uov5hi743u4u3lg0iy9os2gr22olu4pgvid4nrnfmauxndcex0j7ucoudxilql1tlhb39wdxehoqb8lcknadu5t9fn5zo2rk4hr839ov8nswwbjv37p4ky2eacnnz7m9w7z6bdlzoy3dczv16ua017axz6dlj5lb8selpaxkxcmnjvzbl750vlgv6lteyqd7re984w68r0pz536oi9bl83mhwyw2mo41kln7avkds8ri0rqm1vjp6rg1pgwvrf05leobljodi1ywlga91zqwcd2n9r8ybfpo99vw2s65z60z10ryccndjo25m2shadm5prbedadj14ekpx62tefjwhcjpiag82bnq6mqjh055usmhurf75jndwlgy5wi7m2wf6175x3wo4ti80oh9l3vabmxa2qpwv1350jb3231qb1xjuq275i91i9xv37arb3zgbexf4o51sq1919orvp694ra82p6ynvdf42zrlxublmt1tvp5355lq2ioryd1fq7be3g3ukf9p4ayf8msb33mdqlo317l5k2mgv99qnrbndnmltu7skkdozz9t6hrb0anz08985wythlx15bln39m2s6wwit25h44m5h6lxd19g7s778wtol0hvpa8aiux0c9rbt8ib5r7rtfvzke2jzxgxd23b7nfr3pttbpkaambosgwwu3rxsqd07o0o8xjey4vc3bruscck6q631j70eny7v7csd6rdl05o1asvfbgtka5mphbad3zz3iu0eghilq4g54w85zlpf3vn8r79ssv3gzt4e18v4l3odsxv39lrf0n7eflsj5usu65cvqe5r0muasofkuberndawtgd9mxx273l6hczfl5lbuwccuiigrurkv9i7lzvo0gpwlh6sf6xuwd4zc8h8dsqynj1fr27vmzn2phhx52s4hlmmwz9einq07tzo2z601z7f0fq5tkfdz1dlcqdl8dssj78anppt7q7490kpp4h8l2qwhva94i22w4sfli8ccc46opb2f00z7jvl3qrl2a77jncu4xnnnrsoyk1kjob398gczxsz2mk39945lkijyrxaoh2ridsj9k6f1eds3pfu3fg8uxl44ldp6j6y71mpcptvmt5mgkkyf9rbr4tch7nshmcf4zsr7k8vxo4qv85uj8y3j1x8oywv4id80klsdykoosupc2a3acjwpvp38mt0mfpbwqhuduve8uphlarbz2y2h1ou9caca8f6zsiqznsz592yk301oau8pfb7p1h3u6hd9ivbdwx9hzzqfj2m49q64efleum11odrk72xvu7rxxzihmnwht3ok39bzm8ap7fcdy0wmbt85eoq9bxfjatfyub2sfohgo7wqlaaf74pg9j4x9io7pqdjlkfmvaivrv41o8cldeovydyf9mogwgj9sgzb7jft4tcnpqjs776g25cgjghfhj0yofia5is9k5qp3xwj7eoz7efjwohv9jgnnq5zclyrkorrvz56zcuydcte2pb5svi0h4m7x828ffxrauc5wojmvvw9ue96zq3m7cy3go43lghnvztzke54rtasnvtrsd61vgqfcou7f3pgwy3qozosfwhaxhdxcmd3twf2sdseigkxu8pczfgf9wr6s9q1zpin3ks20frxw5omwuftbpzgidp6umdwqp8c0wutdu3cyv5voi2k0xx33rrglapluju12livcayxqbstkk2syamwcjoksg4jga6qzop8kj67o9xg3q095n3ks0ejk7rwj0wtfewress03r9bhknli8rf166bwnrl67o4ug2l5y7rw12wd086u9sxh9ce1ofi0c1lkwdhkkmhhafrymw5ihvz716r21gl9j12zq7a5t74n22tgk771ym5ar9rugkuntln4pezm6l9euql4xbpwqfzkj39ezx7l8dofyxmlz4r8a9hfq4p',
                        redirect: 'pvcst8y6hplgj90iyendmztdq37uv1yrehzhc7q1wpmy1gln6o5s5uy5ttyk85nklsre54260ctd1v23c0wek0tazhtatr7sb21lp8ftkrd9ccty3kq71cptjo0xfb8gpr2q4psllii2z586qpfarkjjm0djqu9d8hps4zl9emesewcx02znlw0gcs2h2r1lrudf48r3c0tuna7sm4jw1nbspmfzb256661mmdfruk4unyfkuddq7wtfdrfkae663uze8mx8ozxid2y9xsvuhzmmc322g5bd1wa3yf4i88phvbp0ddm7b2dnnjyo4hioi4woo91w9ttmjjmmtmpumvho6gb2qsnn6rgbza4yfdbi76839pfidlvvgiu3616evo4gln3wkwa91l87e4b1yxzyfqc4aakaz6nal19yapr9zc61iwfbjyvk7o4uib4ptl17n2nj5r00fnlldcxslb1dwdfnd1lvkxfgrs9awqqf139r2ies9g67pggmwrvbnwx2jfndt2df2b38mrejlnktp1h7nyffsllxa95lviplc5yze7mgloi9rs10g65ls8b65s0kfymx30hgfwgxe83sk5v6ocsebuppjam2in79gf7g916uvqxjfx0fntxn929464168rsfj9wtjlgadxqamywrfgquiu3cgyo9z4nnty8kqr0nuua78y5ymazkz4cgcwertikryvnftleg9ti9d67eglnw4f53t3wwnxf05liqmluj1tw4di3l3pojm2q5nfoqgqu7yx3b516euj1kw2twvfw4tnjdkanmlbfzhhckt56rc8ezfs61jfmqwa6nvvttldz4fckc4lc5yr769af6al1rnn5n1vkwyhqpgggcr23fbb96qffc9s7j14uw9g59zntz1azusnqs8ym69ljyhxting9ixg50qnjso3i8enkg1qn73f99bio7urs69i21qb88d8u1l81xf6nno7rlt3yzkluibqrw0ezwx7szzhj68yjv21wb5i3ulj4t39yoarw9ssxr079kj50gcbvbddk7jossxzyqar2tdhqa1znlh2jje3dem6plaz6mycwwhqd7garxt2r1av114fcl6g0pv5xrqw4zkknkf20ytxd6ytpf8hh5jkrqqs05mi3ibn8knzlz4qionpzfpyjws7yuugjwuwmiu1p6al2k0rd5aqrx505abf6fvtui0cfaqujusr1trxev9vw8limykt4ksu9sjg4o7k0ez7vqz5ee6jjeax556bm7uzxldw71m13lv8xh115zomknxq36iszyma33vv1gxmwub6phn7iz1zl39r8oq4bdv1t27ewbbgcq6ddza9borsp0mg0obf8x3s62rs52wpqcaxwvpcnvez1qfgwwxbh5tze391hgsc6ehmq4lmbk3pje71fquvvefqe8dmmd2k66lmrrk7gctkic7uqfocl1mymwe7enxla1asq3dz8agswelh1mkmij0qzo79mg9z7fjoufdsa9dx4v0e891fh40khvo2flc72qbifx7ar2fd6nkstabipjmeljvcub7m666j7gviaciqlutk7kk051ehbtvwl1wczggmmftivtfz95vwz997d55zagy6jwkusjdpagpwt2hx2dpz4d91o5xlp7fiza2taputu8yrqvqsst7sjvz2ugk5eelfs8lavnf8y4ldo0zka7f4whp6013l2beh7g503yd3ynwgwhief2dh63m08tl4ek20lq6hhkaj6joo4ghexad7bwcvhiubw8hp9lza70bhvw75yfzd4v6tdhx8lvnfarmwxjlfzaa6s5pr50bz324fjrqtm8tjdogwgappayww3h5bk2zxf77ipo5dfvblcnwbn7fscjfr8pj4uuic6sr2tw36w4qyvakatm4dh205vh7a65z4q9qmbd1jtb9wm5imnndzgcufydyhimqec4p2gdnfiy1rse1g7qh76lf9u7hut8vf0h7lqnvxo1cayvg7uf7cn0qybgr24x7fg2aon7z1rn',
                        expiredAccessToken: 6670689347,
                        expiredRefreshToken: 9456384670,
                        isActive: false,
                        isMaster: true,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', 'a8e01cc7-579a-4e98-9feb-45b432c97ed4');
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
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
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
                            id: '16a862cd-77fd-45ab-bd57-3b8269439541'
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
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
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
                            id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('2536164c-6bfb-49cb-af40-d039d4ee7d7c');
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
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6cb96049-5341-435f-a9db-1f35b86f3c08'
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
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('2536164c-6bfb-49cb-af40-d039d4ee7d7c');
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
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
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
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'ad651b82-7f36-48c9-be60-29ad3011a086',
                        grantType: 'PASSWORD',
                        name: 'za8f25ek9kguocez2iyjwdhopsbl6be4lgcrsq9sik4v61u2zhal0b6bmy8zz58mdaw65ir6j3hcwmy2xj32fv6hvbsm8dp579afbyjp8ya3k2oahrbticjfio9r622wctp212973nyk41sbckxkm518cwsium8c4by5glk21kkf77wdkc5cpi62axyh1ofo0jgu8g4pt4sswigwp9eb8tanugvsxxq2pvy1opqx4alj1pvdp1sojxx3fljdon6',
                        secret: '6aoolw4vknj41aonpwzcdkzhgqcp8ukmdki7g0vo2w9vqzk2ao6hq6j21cyye3lv0nswrktzud4zngqhhn0dyp67gk',
                        authUrl: 'phr0z92asw02uxs9afnjidzhia9qukfdoe9ucbburl5t03tcnvc1hb1pcmsr3l95anqxfj0156bgcf771otii4ck0q3atrbm94ih95kiy81gh3m5txvtx3n6tdek36azabhvd79roatss2ce3zrp4zkn2u9fqoz8sxvtc2z8refi8p596eljzi88dmk27kfpi2p2mzvxemskrjb2ruvrheoi5j010410j39gud0ttl19tgerrku09g4ocikxl7oytxf9l6fohasdphx4qmtmyq2g8151i2u2hv033q9yp9768yw2csdlp2h6b0b6axigxzp47un614snypv0ykg4mffd9j7vc47hgq2gmwo9ppkak1nzjm0udt89wom5wfvd3dj2nsymdo668txib0jstfr7er629wkf04qzoa41ozumi5sdor3wrz90selduuj76usisz2rwz1agpwk5s0c8qdclgzp7akp5kc9sszixt0nz2mojcgpc6fkpah8yvtdeq70yyg9roxpwl65emgbrvo5btpg5383yqbvz5dopgkibzwjvusbv7j6s8h6ffzlq8zcho28e2skceny3hh1uj9hbkn8pdgoapcyh6q4fd4e90aot1iwave33bv1mbxh8mgg456j54u05jwklmlvioioe1txzj48atylmvcpo0d2jag8vplkwz7izykfw3qpnxh7g9wog02uahrc9ya4c4rpvwfxzc0l6i5swj2txg3brzo0utqewipydf3fu26y9kddiygtqe2tc4ag4hvgz06fym3gu7c5nyhnbmvqps7v9bgykxdvn59x17vn09r2hdq5kkpji19v8l0l7wfxepe9paovblk2s3kup8ttb2wzg7b0rluhcgqkyzlg4kvd4m0l83akqkzthhdxjgnbmww390yofverpfhp54vtj8y7tbv4vjc2pxnb9zi09mgafyn19udzpbevalqc8dxsx0mj5ohievaeqfx4e5eg6nns3eb31uyvmxikmdhj2m2h11ishsqq2uuqzen7uqbfhh25g3gfcsk7sqjf95ocaj2chbz32ig5flmmmwvu520ui456a4qkkkigcdvfb20t28b4cb19pby1k4fyjqd2w96c8d9drwvpj4byaytbdu3wremi8d81mgkjprxctx6drlio6221v1dzvo84px7t981w32amt70i0heyfcu4im122e64nnm6pl0idjv2k25uxx2stvoa1jpqfow4nf1ztniyhwgiwp1l0f5kjczyhxuxzy8thdv4zc3rnet0v0peb2ovcoweu74av9t6qlr3hu0sig32o4cari01e691w9m1f2wgdrfffr1c3oa3g1ukf0ychgt50m4qgj9lvkcmlii00jbm5ws3kocu6esyab61wiwdd0sb8rq77x6yvslw208eey0vzoa0nsplf1ryq29o70k7rgsictxr7u1dvc08ay46jbxxku0yshmcq8bcgdsu697mavo26q2vtujlh0pwd6zd05k91z80l9cn3w1p7wzuhi6pohuu7yvjvqqw5f8oyfv5q99pgghfem8fu1d03xdthv72qps3ar9phsl0d80iv1cn060ljwccb5danjjanzzmvii90m79mqj038pht5lllup99ahg6y4cjkjidjsj0mmwl6fub97kzbxa5pttmo8ej6idx8jzwm66gc2f48hqk9rn75ty93yenrwqs0kcsmqjeqkwtnlh1gr4izcdas2hgwloccxkr0kw9z8qgpx5clbfu6x0aur7p0zs9hvawkz3qfpue5hngn2i4ya4z5xw50mhzazp0g7yt59ewaeblquuuue2nmsa83o4s9jam8c09t6dw4dn04820td9kild17s7jrincdsni0l9g7akpoyc0urz9i45ye6ewp34hlqi95zvt9dshlyu4asa3iwcovwdhfv4gezqtnldkb67goy3mljeyco9wn4u5utjzifgahugev4q696qahkbvnkalp80hcndub0mq18jgrhicu4p9d4op41w68dm',
                        redirect: '828upex8jbibqg113lqww4l8lapfg9ytuv9uc6wzfpv4iwhtotvqboq7e4jv1ortn8koxzqvaby9f2nt5vn45e6915txwr33vidl8cviaxz5fz2z9k2bmp1mpn8qs9ux12ygbyrmdi60e07rpvv2r3f0k3pitlhyj940o1cyz83vu0wvlblme6wkeha77m4xa4mcc3a6i8ziqnwbxbz5ub1gfjjdrpdci59owesft0af7wn1lqkqzxniv7eyukgp7wr2mt4ppvsca873kazb8qrin966uw8inw28fpyyqx5egide4lafd2s54xynsa5mpm90fefk59mwpdy4b7qk2kbhiinxcnuw0sqw5fv2aopeauhvbtoc3735buqg7dcmueog3ado305s1462ikq5yz522ca5cx0150wyaj1x8ykoqko5h5krnihsuhnho29qpytpey1xiiyod09rs2s799zfhh11pbpb3rmkezp5w4w15af6c4gmca5nmq97vukzuf88fvimr5jq5gg3k07ukqg9uiqibmje0q7yna5zr1wdnkyishvc9vcocnmdmzssdopx66ccoa5esttpv7tcgqmg3ty8sn55tu8fwtomvmw1e6n5beyy4rozl70t2nfiolwdmzncstoxyg6mx4mpqzlwy2k19v2ih5akk9vuy5mcggiz0rogbntbigbvuq04xxxfz27aupeup6gf9dj7h3cjb4nq08bbl8biwim74u5ktobn53rwhzqem2fl4ldymw8c6z26rm2j3ulyqp4ccrqhvk86p7tcm2b4v37pa6z5hap1qw3exddumy5ljj4t7mor3ajyjzpn6xfqbzbac8la9h8cjvcke6dxxhfsu376hg5yzy44rzm4eaikq4ydhtrg8oeopsqtifcdgtsj4s3wrfn0x8wutsg0idu1s9l8ffbgans0pxgqm5x3oto7rrjji1w14narejvi4avjqa5qgunfhlvt4mgoy0oqgonqyv6gcgx3mxj9ja1lpfw2mx28yief2enogtrw8h29cpgg45hjfiy9uzwvh9s7k08oddj3et19x7scr6inf1yxh4swdhzaq4rwljdpaa3n099688fnhe6eqcoj1g1qtto4fz3yndhvkzd8i3jm7tx528dhtap9r05qslhteyq3795fzmeys7zne6qaix23rrwtqj8q9cpnji9tty9l5uj7w9mhaicdhex7oq0p2t33pi26ukwbrdzxsuzc204ptdjfgyqczk3woa8ytmkr1grkow3s3m2ffvjdvz1ix1tbobmlqjuatspfcgk03uksjjvxhi8dnsz1bj1zwb9wx3aw1bqbop6o53lbv0ubu1ag14pctkmjcx3dxhpkz8wmy7jmzpp6wm7xga1xsf8h9zasqpe68s35bl6qpmok9g92h8gklycb1wje7ly916ut1c8zf7jjkbkl91ue4x59ypzhed6n1mfpws4akd43vowj0f4ckjw7z31f3bssmm050pjhhqdg3cbv7ks15rzkxhfw32f7tkd5nmfgqdc7nxhsn1hee967mf2cgn8jxznq2o8ambor4ab6kcg4gh8v4nm2zacyh93rdz8pwgxbaw7ujoofvl169ght7o9ss6vwpkq0i2g2yteuz17f557hebappomfbtr6bfjsprzdutardmltgc5xnppg87axpajb2m9j3rok2vq3i76tzrteysbwd6ndbbafsjezcjd5vx5tw625m2b83pnty01s1n9rv1nwapviazvgukl58h44mpmuwo2a9pigxla53sg8yy04nslmae7p5dqdc4lvm830yljkm2c2p15ycvkhrh7nrwen1qld703d0ovadg5kc1mk9j3bsjkq8nk7bwk8rquyqszbxpopyvmpbggu57udex6stha637clpmk6yk0jjxdkvmj9i0yapokdn08e39ogbbj3rt6e0petjk3m4a9rggay6kvdraxndhfmbu4p5tc90el4pxjd2bla5epitl8qw0li0epnous4t504mzwtcv6s',
                        expiredAccessToken: 8069115864,
                        expiredRefreshToken: 5797268126,
                        isActive: false,
                        isMaster: true,
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
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c',
                        grantType: 'AUTHORIZATION_CODE',
                        name: '1hqi8qct01bqg02lwkzc7wpz2nc2glp12ne44f1h3ngub765sma9um44io87qeja47h8w71xquh7sgrj5twg9fbgti0lh822737sh4goi1vsrl2bgytboxu7qso25ayulwsc6wgkjv6kjvpi52wxsm4s9aly6n7n2itfng3nhu9khb93navn9q2jgj3awjfi5mm5jo1sega44eo1p5q9ykomhra9m1e1nna1xy4ifide180h5j24d5swn1p74zk',
                        secret: 'gdt8schag18wt9lvx6ulbavhlfq8xvez9cn4yf3hsknrvqmz8n0zn0ihkiobrbbqj3mod9diddvsa9o2lohnqo0cgd',
                        authUrl: 'xwugt6zjbizbqaltn01411pz25n7jvcs66qao8iuha25kjc9dsfkmo1d9odkngyti3vso9fe2vu98x1jcq4d0ki607wno4tz511z6fzhnza4vlngplvlzqh9i9afq4lvokp30u9naotunnrn60444ewzyemgcn0pct0rrxlu7w6fz65mxd6uzs24ipprcm56d4ri3ng54b1ymxr8ubbm0y43wcpq3kmk9jbedz4h5984o87o6hg9gujl8ragdztvaiy1m1fs6qvnvxpmh4y1sngik7o2dlf45uy4g0whp1y5dlxxbsn0lcz071caqdtm5wi5gw45snq7vdw0m315b2lq12wp4u36s3dp2c5kxw7w45m9mv6ur1a3mf483qvu5gwahcqouf0y67i7qbxtxtb45hgpnjm2lde7l7e3p97trkpem4knnkdymwr50mmig667hu7ded2e83c379b165syj6xrn9uibtswt0gyiibaie0ik2my422r3k3nv8kzwtfjkxakut4qqcug1fy7ynkk93qkgccdf7kd0iu6nbrj5yybxtz3yy2scpoue8qkdbzt0kr3mhtnvtu07kbvg7hn6qb2j5s1rttm7ghujunlsstgoijahcriy7j70bn9curs9skag5bcd3kx6tiiwp8094giej0p2rzzodhrg76ggl2bph6347lnjts32ii8cdl1yzvhdn7sfk5ns7k93blu2e3cwyve32u1hrtudv3khr742wquljmycol1el7241ur0jn6unrsw9m7voc0u2hbdvfq0vrkg852i7klfqvnqj39e3wc2vdhq6zzd293qjvh0m483x64g98whf1nmnlp1v74ozeprhp8p9ng9fkzed7vg49c8d4ygpxhbrjc33rj3huwtmxenc80hcbpnb95st2kfsrsqrihgh6y43hdlsjg19illd2dlj363400tnky8vj1qxzfbeaoe049grg03qdp6uvq0bo5vid6r9nz738a4ghx3otsr5bv0ndyut6grryzs25i7bfyxkt8mqnodbb50cvknt2v033h9jt9ieywewaenfxuyneij5wi5esh8ciarllvibdtxfkb9j8vtx6tandk2et6p84tgnhtojrg6fqytd51vmpm9k44nho49odjclfr0k4um1g2ldiak8369sfbis2kthk3iv4z6cdm6ti3qxz1man7kenmtkaclhgs0x520ma5vbpn6v85is14asdbcu3a43tdfb5scwqa56ry7x2lbh0b09apje9jjh3t5k9af7qubgw85nwccojeakqdll1ui5wlhrayg8vbd7x0y4r0i4rb0tw58x0tch3dx41vu05g952rpiosgcenr6jsp6ngj913yo8gnd3dm28ye165lg5ccu1m8q5l9t8j44p0cf6f9y5c41j9y06p5z0ajtlne0cyeq8tyt5ae82kvou0oroh2893trbggiwwuzuol2bzgrtshjo0kpb8b2xzd6qhq3dtzdbspbgtan81hdk2vkice2d3iv08it85gtd1avt3bcahzts7veweem2j0fv4uz663tz52zec06mhpk27r5tcedmethrzbv65t2gwt4h2yt9m04kfr42acqm7rxqzvkyfxxhzk8bwmfbruh0abe9plfyljl6p0fbp4a02pf6ddrxeu3kqc5lgurphlwtf2xkile9c9582xkejygv10bw26vm1w3qjin4lqfjc2srebpvozc0rpb0w9kc5nzxe8njr2nm3z2rdd37er9xuo1c5eiqf148iaggamnq3wdxso4ctll07ch22r0ukfv6nwsss6o9vu9rjpmzfuilpt4a2rb890l12xh4ye7jzua1qzgx88fwtvy3b1nybr0muc0lxt3sgo8s5n5euy450rjpj78h9f67xo7pdorxlfethbmkeeaq5p3ssgoanc1lp0lmms67fst75o403zvuv7nqbfuarai6subtdz1qpr7kowiuf6fahhfxcz5wmdyaetgfraecapddnjnrgfbby5gouiueo',
                        redirect: '5gxepx9ehv4uh1p0tk92hwslzuvfmvplp1es8gjl6ypetykp8hflrq4murv1hj2ese5bx7e0x8hetbxhb5ni4q21crqiftlbxm52krn1sc7fbaakk8gc4v82teqow22ytx0lujpcvrbpc1v6ftn12nyrakv4yuz70qxyowk8rzx75z3o46vn5ptywbbv95yeyubfvnupzzkk3x2l07y6chf5aevvy8co5d9xkxzp06elmfyz9jud9u62rxn3ka6b3vuyo9u0oyv1g4o82tsxuvi4kwqus3yskvl04veumcrm2vo07i1lf6ggk0md19ot7f5a99lyzv8g6a43rmw3kvc3j7uebxrheufecbyib3ttdyho4dddormsdvuxjqi57f9v319atu5102ob6qsebe4jzgnqvjkz2yexen50ob8an03zu14fotdyf5lmsm8187mc6xqvbcfy9dc5ox3qfdh9jcwc2n5p3dpc3jc4fr1hmur9swmotz7fhampvfrvht0jojtf0vsjp25xbpq6jxnys4bxlfos1fssvzaj7r4cfj008snvzxtc6g2sk1hekozb7tglsl2j14ti14a23872wvuarorli6pfq2dj7wluv46nsi2c3xqqxb4y7x86il73gjjwtok6eqvn7qlo0qbmc3mzw74ve7wi0v2pwqz1w2f218vgfjrf2jzgs5rx09gkdt3i5qq55tsmjgx04sk280aty2ohq0th2ge66btgnf64sgd1sqz56wasbhfn63nr5hjqwtirpr9tvk2b2nwb66vtx2qvnj34qlfl0ybtiea4yxsttwcb9wu0p2spwe7iiubs3lc7cdf6fcjuypaow7fe39cdn1rj5vw2779205kojxk7ualkp2e57aecfeepxp7jmipxua3gabo72hg7ertv9yjtfbkqyxixb44oj8gzop5ei7p6ztuluymugx7pb1ctcxn8ivwj2qqb7cxh6vhml55fzwe7cwl00pds2icl3vvk7ywa3hhk6ana07jdjp7250y3jo019foryj9qd6h9f0phehgyuwvdp7zkz8ij7b3ijnobnxyhslfpjm3vl175xbzhmadge9lgw70c8r637q90k3tv1n4k4mtlwd7io8m48i6887me2wzi1ug999yw3l28g29y1aitm03kmntk0d702u4b6x1i2sgkqmjb5v6fmyufcxafsu993wifjxgw1hfkbso45cjylafbgng1f82827yycyrjykhhulck5p64ljpcevq28sgnew8mygi3kozzw7usezd99puhqkmpxe1flqa36h3fxyi3ca0y4h142z4va18q5xgltxiavd19zlnyiiquwp3gu6wa3odtmknyt1i1voqg3kq2ruq24xuyse0p3o2i0ruqjrfvq6k0vz5nzkrzld32smb62h1633nequs46tx7dz0htd01ejqj0hy9ggyyvzbhqeshadgxhb5zpwzxmqb49gwy9hm5dndtgilqcrw6s9hmxzrsj68w11hj388fa2iz1fm1wxuuvbnu7xm7qsu1rdus8x1s74lb5q1llw7ij3e2vfdpqtmzhlftexex6m2suyqu7csx7rvonp4wzm4sfm5pkhmhco3c0hnpi20yjryhmjhz2fy88gqd3zzxedaj5ed5w6imo1jpihqjfmvwpmz1p7cq7d0dlscxxqvy0aq1qwbnv1rs2i58f7vldnga9n5rsus5h1n36yn2h06lg42fr4xwc0r7j1zrrb69kcofthcb65e9p9bcxppcjgybs6w9i2zalwlftz5m3rweqnhi4yp74vv9we4myi6s7cudwb4crw2owih3ivewoup00ezy2w8nuazar2c98nf8os78c9u2xy4bdmzja264cdltc3xoo5qapouuwm87l6eugkk3bouiydm9i12w4kr027dgr2imjh02vno92ek6n6iqxrs2od31bt4ptqajd80kxeajvdulyexzgzzjy0znytw4yu8ged9oyme90015m78xgutt8id6broqx0jz3q9o',
                        expiredAccessToken: 9693646458,
                        expiredRefreshToken: 8941543543,
                        isActive: false,
                        isMaster: false,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateClient.id).toStrictEqual('2536164c-6bfb-49cb-af40-d039d4ee7d7c');
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
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6e58ec96-cc1b-4715-9ae3-229fedc1f8fb'
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
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2536164c-6bfb-49cb-af40-d039d4ee7d7c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('2536164c-6bfb-49cb-af40-d039d4ee7d7c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});