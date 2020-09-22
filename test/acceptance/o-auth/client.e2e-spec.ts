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
                name: 'wyipo4sr9zwt6rx3b3jip1mzrz7kacuf7rcfvthdai5ukc53pruzim0weio0m9th1j26gdshiarf6amtpmvg7vfnx7tfiv9ctkzp3zgueqke1a8p52a0f5t5fx0tvtk96rghbwuu0lqle9f1kbta7kl6elxakw3yootd04xtqih3tms29qqjsg7s4qtfne1tokjsxfxq0ugumpqdudlmifu7n9xythcxpcpfaswwf6t8ogu6qnhqe2txhtzuiem',
                secret: 'us1k6xxfd0mbqmdieye8f43nd7jjep2m4cgtyy29a00lk3id1mryf6uwoee6w2u8et6uisyissi6srej0u1bl5ww4s',
                authUrl: 'klljfiock6vy5ac1prhscu09w7zwz2zpy42j1s4ollxpom4s9p9s26nq7khmmld05doary555jt2boymyyenjd6irlv30jxqi9l5rfiibcfdha1jzifw6qoah8fbcesun2g1yjxxmi303nze32szbqa1a1aif34jr1sj9fs24vwuoj0eupsuy1sltza389ejs7nv68hcio8vsju0x25z3er73i1qbxhf47gusx3mj4ooea61bxj6rsb2c8fbh970uvle7omtkxtvlrjrz26n45co9w66omupvy1vuibiqrvh4nx6dfejgav6qabm9i2zqvmie2gm7ru6qy6l2jg5gr9rst1rzr9xz90n4ydwm1fia2zo2bby7lcgy3usxgcvfegrl0qp3kykr167y0u0nrsio2oygqcovehjh5t4akw0co6clnntt6v3dhd3o5l4k2gicrmazwpiajd74uy4bgst9ms404h63jmjflbflz87rrhkq39bv0o1h7qa711dqoh0mn8uw0q64c9dj5scwcctzcp4yl54atabjdfvrab48234tk3f5uvfeagl2erjvvuxtskz7go33vaz41vaq3bq8wk2ra4p9jl8ff72tc3s58sfmixycakue6cmkwg38vxue0xgmwywf8muwcif8j4sboqr0e16yav4ikuk37w9k4f7facg4k7a86ez9i14opvq6l2hrudp6wmiaopk906calqwas2oamsok0ifxyyhub2wp5m6z4gqezpe8c1v9cy3uhe7nelgc37xa9t1p0wv98kczsohkz7meft4htvz8iij3bagztoqdfzce49dm3ke0x20s2jp9njnzoa85jj8nbbw2tx2u3u8b4y1aaw4omiz04zo3r16m3b8d13kfj0yaiztfbxkgp8z5rew9rvwyx76650aurb6eqdulhc3twvx9eysfrzlj9sa9oywdaylqc59asjtkxhsssax51nz8usw3o390md9087molsyrabzzwy7orjozcdy3t66rt03eilyzdw7zzn9ks0bv0ir6gkzyznkrjj8gvzz9o0wpl9zobxelx2bdms4jib70bo0e6zxcom3xzctnom6i93gu07r8usiuvd3ea37yc7zi52jlg3zrznf2skb8mra1pxa04autjgctrmi2qn6aaz9064bntfgzgqf3lj21vxjs0etof5vbaxmv8u7eugsp0rgydkx21xyjkaqw0hx1xna6nkig3kqc7ina1gd1z2cnejm9n5rzcghz27wb0tlpmlxj3zbo9961aft85b2ftcdymssdiymf9ptsl1f5t7qro17rgwiufsq1sdcgkifp9u64fom224jnkyfzbcwacdjzhn43yjhveqwtc1fji0hx2q0w9328smk9x7qojykusgksn3zt5dsv5in7nr4s3cy1xfmdot4nglpj02c06g5z3ejjess620gvi626ni55olq3e92tvw9phdy21x3jptlrqbra3rxxu65q1ftmo2hcmbmlpavyefhn0mxpr6sn6m7fegtvx8g4hzc63chfoe2jj6m3o2pcobzomnii716asyit1ysix66zupbah3ryt7teif9s8ggl5uf6ps7d0r3jxfurfc55pc38jmzue2n3ejt3tbgfeoi3ahp5xn4kscmnd8abnmidcjz2shjfvv2tzglrnzhou84m8rqmz84tls37ulti4pzm5wso3zz73t0p5tkihkrzbpz0hf6hgk28ygecyd7ui8af11m9xowsto9ger4e7oxr6kn2kxuschjade4cno0aft7un5qss2st5w155143p6os8qgduvrixv42y66zaq68npop5sgs7jgcv4nfemtzhx8w3ai8200m97sz9yzosq7aqsxj2p2esxzj1cgqr5clh7uw83pogc9wif5s18qtkd23g83wyd318xveeisbji7enenfe49ialh5vq98abhsdu2pt8b0et0xu7f8f1ixgrzhxlrleftatamxwxj6ioupf4mugmmg1qycgzodq8dpbajn300',
                redirect: '59s1f9p439dk419enk5u2ezhmnh2f4ficzao20aangv9t8b9hi46soj0548mglboetus1u9b7b1hgcmi4e34yz90v49z4twg9oyuyii8nnsxjpcq9sgz7q4tkme2oxp080hu40kxmujgfj9x4l355rhlgx16oxa3nc0sdl9r0c5f1e6t5qw9ah4pf8n8qz8dty0p06vawuymez1aa0kkz5xof2fiaimgwn75qv2upu2h25s9ugd1ku8k72rdcxj1p5t6esopbzhcp5b4lig0f8zj2zfd8cb3bl4ffmpml6u4p5vv7ia1xpc2xngfic7ytkg7dqo13eucsshz1ce5ewa1qienx63h1zma8tclbkg5jof62qebmkmmvu3kiauk52x1vrij4r7wrpay0toypcxcwheamhxe42miuqay3vd85pllq9zsl0rwwzrr50rg9eorsxr3efnzckxz7wbbrqvi8s4enelxsry2irp4jm27zx07nccwispjxho4zcjghvd7b9egu49evfjt7dnuqjic88y9y384mlw124pjyslvx5qm35dpqbag4h7eaxpzmr6ixlyxfb4lbohz2kk8ee67qvi94e9l226spdsy85piciz6o3b1e84t40fsaf8jzqrreg6cxbog5dybat1o13dgq8xc8dypppqs58e2j020c8aw57o3590rqpgn5gpetp6c65bjf77hlyw3mwm6pt2mvbjiors19101zpxwqtoupb6scg0eckkn8dozfrtwaiv4pyx173sty2equ7zelfm4e3kazedkpxystrmy1bp2ttdioozmm1576koy2lfd1k6df1oyenpfi8hv9792rf4797lehgiorm3x1uqfe4vo80xluj2chgzq6osq6123ox83ukzoie0px40ye617h8eyxdaw0bvva9ybdc2ynspeueydufjr7uvco2th0z23ixjau0bzoac81l1nn0hilnelh8inh9a3x3pr0g2owt6jowwybgaz7uqmywyhtp2q893bnxd4cinb8zsvnnfxr6ph0ni5itxhn0nnwi53j1i46qcz7miew452pgjq01tyoakm4j3uq5b04o44i7lpa4trrex2ca03ul7er02pl8hj75vmiwthoz7wn2cnxv0m0c812hu2rec671ucjpl7jw6mrgc0oznm05tkqujm2dv7p5cark2tqd999w91pvva01q5e3hx8o9sfdvq56krdsd0do30ndpbz63sxc4rcd1dgak8zcihps9gduw9tdstj1opo7xjr3nnwnjc2hp6lgggckktmirlawhnkgxc6rq87xslh3thgxs0xj3mel6irywt1rtd7zh6hgq3th4w79xt9gvhdxiyr16seq29cqit2yfgmsizfynla84n2ec4v5qxf16qyqd78gb0m0z6sx20wf0mtjjh8k9uqobdjk0vtzsxgxd4x1thnyodk4wnetil1p3w01z13onbc589y6cgj4r7y8i7enchndd2hlza7i086b7ewf2l5bjqxwvo1eusbz3ckyeoxm140unltqepn5s7bxx54oob0tqjln4t1ebsx7n8bavddaxcwbskfusvoznxbwsu98ezvzlog63yq48dyndu7dkiltp4yooke9k2wvyxdn38ltjsq8nzalqdj9re5pise0demwxof8mzkgehvdomx2b9jz71filmf5e4sh6gwco3zs1qgdoqxekdpfngrzdfc5l4mabsd36o0xhlqh4xj1ebzvoi8nj6ey46susod4bsexvi0sgjl6ocvhhv1qadj10t7ehbf1tuvb89xk1n3n83n5i0veaupctestdhp8nr5j52x716ls4siflqj4hobc7ebvlg00atmfolb5rpoutwwg2q7i7l2tefx4zn9s3v0ahxyn56mjok5gqzf8556l15wfi4zgqyql15rpvo8aeph0hps7464wlxen1l0j7t58pujcmd59dkgdzsxfktfyievcmzjq1kskq4zowud4zrxo605hj66s5y6wt3vswj1npvkket',
                expiredAccessToken: 4653298742,
                expiredRefreshToken: 8657307464,
                isRevoked: true,
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
                
                grantType: 'PASSWORD',
                name: 'vfuro3gc9zz0luf5gp5huh7rxl6o1rpja6ha37mcy2kec13trblb7gobyruxwuk8tsf58vf1bgxy2tbz4srtqye4efz10s8bpjy1y22jh8wjv3fqr9q8l7641f2de1s6xehsghferggcg4l8ou9a1pqv66dvouoio4fq7lxayzqrqkb425gkb3svcb392bi0nchm2xx5aaqqo25g8nv4y9osx2olv91as8taue3gpigeq6yhy64bssg0aniwt9l',
                secret: 'c1ltts52dxsw58ovgcdxu7wnk1cv41b6ceiqxsygrlkwu9w14ocmw5pn72unuyjbmgzt26ooywmz0uoq87orskhdig',
                authUrl: '0080pkztin0daimtjbz967x6j3kc27ov38t9j6zet4u7e4d5painwgvs1p5g0opz8l7lep7vlmbm27ub3co072o54el0wfc9krxbirm8g7pnlvuo8d5pogoyfeyltq4sfi2gn60li15fxvd2uiwrnmq13sc7hdapxf7xpigy33yr9kb4nap16hjeveqbn2li4r2hgebcb61hsymvedky9lq686xm1vfq2gxuhkwuxaz6416v3okgycz2pshfpxzbpdz2bc6opkf4cdetklojl3jmw4u7yo84hrfuot5x00p3mrm3cac3ssrtlt02i0z09wk18u8l1ds1ain6yxmi9af8cpoape41kor24t5puchyvoit96ej2fmoshycg7a40grk0iudtk3wwup5ny2655inm3bf1m2pb2vwkjabjbnmphzlyb4l2miwog20kgey83rkl6eu7y5ru6ww7j9fikmesduzy5rddtxf6goph23eagoiz0yji5t8g9k2ivpux9vi0ddkxkpp5bk2ox1qatuu5zkmtjb417zbhii2umgp0obvyykywmq1lnr2iegu4y7747kw4im0tdhkq3usq8k3l4a4rl680xg5h1z92yjctym2oieqijt5vm1ffpuc4qcahaaum9vlkmke88erq7a7bcfb6fj5ihtq1aceul0kzbj1la8uciy7eiy8hj1pei734r6islzm9ewbm3eu1sye0vakxw8lz68mm9pbbh132m0omkp395urjsdx6ac9cirx8t9viryi8nbx3iinew1ekhv32zgyrcmcgckpqm22cdmatnaowbh0gw9m5dcf6tabo69mk0iqpt3ad1opz0kot59lv2trtncb65hgiinipx7dvnhtkkpasdhi97ve8uy630unjju8exxgd4cd9lspxmag8sopzt4bkt6mqyfykctb5i7p95fzu9ea78dsqo5e94x44uq2thu5ehtw4m8xqfm77xo2nkw4a7dha74elm098g37emn3rqgslb5x1spaw6rju9w0xnzr9q8rmwkia7uhohi6o3uv480pxzvt0htko97s1cinjllh2ereomc9hrt7hgkz2peqe0rjujmd0nipk6qjcoyu28db1whqyx09kzg2uqfvy24s47eqp5j1tbdmff78011f7060dm1asvwy3dfu9wdajrxji0zov7nyuwfwio8r9k25qsydgkdpv6awj441u9llknwezxn9ktkuoj5wkcq029eofffjhq7iqxya3u3zfqcmy7e3witjqwrugvlvuddljruh6bv67o7hhtwdw8ms4dq0u5h2mbqwxsphrvxpjenk3yyj2ned334d0cpo90cxl6je6ba6e49rtwok3pncloko4j8wo8t1anvc4w7wgg2ncuco2ihtnt7apbnzvm2z2jgtwtp86qjphc8ypfhhu03231pugsposfu795hkf5wz6eh87p42r2ajhentclao2tpygjc985zsjjbtlnz8tv36svbvqucqgo26fti4cf92pwhjkqpt7wrlh6qldqdtw84fp8ntumr4hjud6bbeam1ufm3x2b1sdy684gdi82q4uoktajh7741t8mnaos30wug478vgmoddduhvhwnp8c34wk5c790b1xdp27bcvw3ebeo1ui8hfvx012a8epn2owhl42wnqwc3ciz91vkpy9x26xbqk2ohn35mzyb0currd1g4d9u1ow15sucoatlxalwff9hq18251ukzyourysygnhb8uoo2hi3cc6i4pf6gkpali0417iaazksdfiw1l3yvg0f2so4327bla89aqp501e2ut6g0tyx8weljilekrdtz2zimwtppxln90ozagoikpwuaf03lawz8fnfx9u278rn44d3wiwu7n169jm5nq8g5l2iupgupe6sbxtwibuivmb4482c6n8mv910e2itk3s2lbqmaj7dl1gep3z92r86rqgme7nx71utzu33ikj6ouay1m51c78ef6h38h6468c1fxmf3bficv6srvhnmf8mk',
                redirect: 'bxah8kidj27t6hu0lhsuz3l8f4a0zbbhpgg9q9actib5uigb8s057tjijvxd16ogkg85hnx088fmtnx2rvkh4coajp7eyt4o1xnfez9mtr14aehhdtpqntlrtb52pyk1n14mrcikaxy5ryu4ntwfbz2907c9qf3hren6bd2guk7p4sqwbd9mgrmis09eupo8i56u2o0u46uoddqzw0jov4zd72jih2svpb2ahwa4mt4btsxo8a6qhqo9oqc1xfmoop9s4kw1okkpddsi50l1grotpc7qaravhjcsrbv2exru1ilfgb9yul14vpo2497o9kxt99thljth35r6svbn9d3ws4u7b35m8rhlva2b8vftmq8ob4jbqppnk79llyorxs7xdthanp4z2pj19bekc8bc4hx0z3fbpapv4emutqhbxuqbwb7fdzijql1z3pm8urouawf4c3aijs38r9u5krhn5kzu8vllo7naj7gegfk8jwamt1gdy1fa3g9j9ryeifj4i9fm8gxgbap7wilx8jq69id1i1hnd6s7gkvjjqik1mc4pya07hqmw4ea5swb6wpyqcpvy01690dl4w417lcu629cay0ni3spr5db6vdsqwnopytsfxtprkdz6tf8h1dd21ac7gnd9sdla7xbofhpahf71efphs7448rfus0mf5g5yirmywx3nzzw5pkciib2hmj2d959522zxvbs1q1edhyla2y7gznwq80lmu4xikddm9d4bmqpdjsk7z8xt68cv3y2bnuli3snisj7dqichm9t2ekouyhfoshrp22kenq6kooi3s1ycgxa1a435ajxd4cwgjqklu70ai1kl7fuqyax1k1lcjgzircwvh2of8iahkaa2iym5t1ccckmbs1sek05gkkghcig1g8fb9t1dt15itshvwb4zajd39h11hzz8mx9et3xztb4e87o4ltvs2s1d3zkjm1i4d6o6oc3iolp3zirdj5s8abvqdo8o032pzqjpc397q3511tnopiq0l2nxzvs5ib5f9lujwqn7po0cwk54m9eo8kb0bfp6wbe4lnfexqq5homzosiui3sm31q1h98ka2nt3ydlvicaq8cyispu3zbuprvg6ash9bsn8ui8lex6270q0xs4kbcbabanuu4p0lfjs1m7m57gny33dglydarrsvopt4pw9rg6ytig35548el9stc8tj4f15ay8zaidplvv6yot0spznkcttz3p5rev24uyqdx4s2trxozpkxzb2w786pbaumpjso5gsquj2nfqupt1yu2njzvkkn44ggx673pe7hqoylx8ktmjb918tt5hnilumguwfuellvxcc12mjbijij6mrh2zwb3zgyflk7hiptwlerbir4fo4msrnuoln2xh8tyrt4lck8z2l8shs8xt36i4tjmoxzc1ko9ve99fs6jc5xkf7tlozwqsetmbw706pgwbjoiv01v1wfym21hqhjsry54ne07x1dr1tx5g1y3xowx1t8akc7w7avinn7mqt7rwk31hzgviwlvr62zsra82ikp813vuxjoxv8xtst3kv4xq4z2q9rsqu8j3ty4fuuutwh10mas6sm86ebrz4axoyparpxqt536gt7z0ffyw7ofdz5mehm3mgjeqcs3ue3w9ui1shvx5tfv02k4wzyw9acl6trg40uxkrns4h8gz55whl2273k8vlusg3ztvtufn4qjn8xm4m7ppststecfv643nglj0kqvymo3vy6rhhuwd4mw1a09fgbpx1bnizep9hagc7km1bowahto61ql12zr90bohmmshy97o5kvna24oxiyujri2tnzqidj1rv3fzk9w8h4z08rwjg2op39m6yomrm2lydorlukv2mjqmgb1cfgpyf1a12lc0fhcmk7lubtjrn64b6y7vvx3rebz2ghenlzuj8pr3iojtj5fp1cmirlw1yspgsg6ijk1h99ddtfj1ummugs8wywapnxzn446mq1c664h5n096vlgheegiw9bpxbhbg757w',
                expiredAccessToken: 1911093041,
                expiredRefreshToken: 6955275751,
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
                id: '393943d2-20fe-48ea-a94d-4b942e14b2c0',
                grantType: null,
                name: 'rl9t5gwcv45ib8mosq9az4vojyxw6z5wjyxixgzjewyxaganl1t1nm9o3j0o0m0gn98al83o5vqlad1cqfp91jphaf89nv448beyve2ecxdas6bl7e1rkmjqsemgr3oli88wjzf8lff56i28a5y3rono0noigma8604oeov41wb2bls9jzt4by1fts4za4euyrbamp8fc70zlnqk6a5l4omv95ddbo6z2vzpokgscz65vwqtx4xljxxhnea6bx7',
                secret: '2i20xlrgusf6p6qqqqb0nr7mxjltnfjkienwsu0smhad07fmo5ntq9ww9cc29f5jhfo63qlbfzitpfyosk1qvcci6f',
                authUrl: '6f5upudfhbdwm01bdii6lz3ml7g0ifvpef795d3z7zoohl54jca9jz06k253oovrv0ki73iumxhuw05rwkncdk39sdnhomn0fyut96340o2a0wdxd1k55vax5ymsnr7sjvxut5xudrph6de1k4kt2zfa2uvjgtp6d5j1t9vsgea3cfwr6p1x0vjsso0uhpozz2eo8wo53k4gv2bn8utdlwi2ten3crv6tcy1r83yyo0wembyysc3z1j4zi3unthudprsmoiyogezmv23d102rpskshtrvu1vlt6ng6m4uvgx1eljafnsxw093frekyiym0oeyxg8p75tu3uhr8dn5ynk9mllajy0kcpbikp94ml64yrtowh4hktuxvmfziyxv6dcumejw6l6m9neywav3wxh1ksl0uxj4jrot28v9vp91obkumsd5ybrp7l22bswmep4xlb0jmizu2mvizhvj8aa7q3ekbr3ykuz7bo6kqj0lmroblcnzanozana4ac8kbuf226nidhw5jaujcuspgtoowxgvlibh9853o7q4eb57qlsyoad17yelkbgi8uzlp9xzn7sclo0keb8lykjzoojmhizrbgzvnfmdn4pjggtarqny9lhysdjd0fo09zxwavirwokt37o7huk9ow4tmypt9zhj41a7m216ufkzmtrsu9kz66qrmxuu883ie78ifcgq2xhwux8frn2iopcim6819z3qh0xydlp1eyq0d9rlb951m3rfndhb0fbzvliaobwq2vtcxe1w81pd53x9ru9ypqelsxpwsmiqtgh8tiaq83mh082mqbdwqfawqrrgc2uj2azwg38q27gvjblpn086scb4rdk37ru5wzyj73azcy6gbqfd1mb5yywqkyl8pg6tszyygfxg244qyn80iwg73e31vn7sw0b1qu039aqoqlyzobynvwbtz7aqnz1ejncu1rwtutxaplbufq5p6cvcxilgaqcw6xxb3s07g1iz72cv33xmwpco997p3d6g86qlm7jy0y3mztwzy5wcxqrri0xpm4rbd964emqa4xi0a0siqut2h30h9k5s1my8d9hd81h8upfmgqvbaklw8t10iam83swzaido3aecjxb3dst0v7fxfwfn888s3yss46mxa6dub3ldwt006hgkzqbi23vuycs8vbeji9oobr0mfjbbr4obh3k6k9sw7uhxmfp3n6066ildez948nvrk877i31123kr2kl4d2e25kshgg3nstwh54myjmrj13q68talqhhwwfss8cjhsuc7ropingbchnym3zon7gexw6oobh04ubtkbx1a8abfdkzaibuaockfs1za1buuu2fg8gor9e64usz8dosjrl7k8nloozdhljkmer304xhabm9edua04nh2denhnw8mhtdkcdaeo7fujmth48oekx8ebvzoeqt38yn8p68adgadn3gsvb6wia41qyvzjbuu765thchm00clq3j6ebys9girvvhxow553h21qa5x3flxtkqxjvnczfqe5ojhw2795d061ox7azz28l58tumx9p6e4m66hdaobira0imqk2kxfm6yfiio2ar0ptonkzzqsr729md2r6c0kdkhtuyb5q81ojtjk4p6mav1boskeoobxlix533bpizcihfskqm5vgz1g3408d61l84ud4d675mobnga49nmmbihk4mhpbm5a4exupnp942g0ymm0bvts79e4p000a399gxa8qkcpwv3di9d4orsqe1ydrqdv4wh756k5dkcp2p85kgr7q2jsxg0m1q8oyi1lsrlmkuu6x1iaofm1qfo6dplog0saj9v1tpbpfme0hhjz0p7xp51em5tvavcv6lrbd7h0y4nd0dyqp8cxh3bw3wj17orzlc05g7rs04bn11lre2wgrp1by63f4m5yswi7ogdqz2u48zo55r56sk5c1oicyzhkldxiexplh7pj6qabp7176fzmjbbx74ofabouf0ezzu6vtaka7ooqhq5hruw264y5bk32rg',
                redirect: 'mcpizdaee0g1ltysvez6injrggmw4wjge8maeotebx4falhajp0jpo9l1i3mhne217wwl048k8awltaele5yxwuqhqrmatacn1a0hq6xzfu5c8zmqvbo9ygg9nqlgo9n3dzysapjtqz7omv4j0elzil893yslynpo741bapacz9a6rxnibjp5o79pv43211jf5rmnpaa59em8nq0mkh233j2nxoco3hbw6vn97s2jhwbfolryhcfm9cd6140wg0gv7tg2soymzw8rkhz1tydptrvssexnsh4nyekawe8bjf7opjg3jh8alfdlvx72us7tuyd5d9dl210t2w0jr62okb4d9navwnsoy6gj8u1k7klza7zdb3etqcgao5k2n92gp1ta2omw1tsz2sa7kh70egd6q9leo70qfkdv5kun46foo9e6gp8ah3oqskj8w6v2fgp0labwsdpxu1vw6evsun1hqk5nf8pisbl2cxq2tybomjgqccxpj8htvnq5h6nlp9yjhv2wz126bwzv4zc6vu7urzvu07svkufsda8j8p3wkwtnmpki7xhiaawczd3a07qi96dx3qsc1a1tz7uebaeknwprb0f9vw4exs0q7lkvhzqbwjyyej61qtianx4djum1h4o7tk8iwbk328fw81vxd9nc3uj5xp8kwmx51vuv4fhoq4n5uromy1cocnvlc9qh6t2r43rxb2fhvg4vbhok5c8ik5nt9l24di04dobz768q2t6kzuwxr5u5wutyk8ogfinh3ih42d81hohiysycvthre7mg7u4u94v159wdb2arz09ggv1ey2ornsk6g09qxixa9n4vvznm0ozm8g6kfqtk1gh8y1d7nkils7sjasd5fo1uxf756pkuu4x0e5gqhiigzmatjmprnobzxg3zku6j5712u6g7g532ohoydvgxpkzdyrz3ohyhfwv6f350b5bt7vaooycwe9w2t4whsoxnq8571o7iu164pphduy3gqlzr1x5v23iz6u9l5tn4izv3vyp4bozqjiiozjp0wo3h88ct6fs0thnsj4401gp8ykmfc374ocnrxpmkgl0knxk4e5dfsamsmit8rd86hl1v4l50afa6oqk5d9wx6sncfw5n0zx5qc9gg043sy58x0bbr8xfhmamvpg7f833os1jghc9y24wwcxygcaho0mkfz2l41fthksr73igmr74ofynothezfs0l7k4fvuq8clh2nkxshs47pk0wf6qr7eqvwy91uxpqfta2x7r1u2mfsusdenybgpcekyq6owivctugiolmse45qm20niuiaxv69r75zvan1ar4ov7awg35pltxxwmm5np6pkloga804iw54j59e4seyc4iqokwrv5bbphtktzai08zdtbyrr59irhcqv7va34l9ux75impipx22135lq8i91hsb1d938yr4arm97rfs08t8ctac0l3b74zzbnyj5y1am7m79r9n1c8scuymxbm5muwuk9jr2wk5325uakm25raci141uy1m5cjfkd0v2lzrzahvtc33vr7y7fgtagoq35jpwjo92th9eweqbuv41oveukxfvnxli3uykirnfhmofpksyxb9edhmnqe46bb0lsneai6sebx4zjwh3379wqaeo4mfo8jp9qh5bizfj81f1x35juc6hha6515cfuufyksb17ag8692fgt7058e6lumlcvy8gbjgeq6hyyyjoxicva0jgru8fod52xuiw1lrboyb9gvenr1q70q5tf6k502l009kqbh8hv3wrqpiwhuqnxkx3d3mnhga30wyvl3kkhhl5143qshgb3qrnivgfm9j16lnwldjtjn2hhsoijrirjf5bb820yykurbzjwd9fms4dsb3ki1v582yv8gmmiupqm9rwizt0gsew0fi6bh7hcvruu10nrsdzua5e0qvlrt0itlqfcjk86s5sny8b8nipnxz5q0ie9ogkspn8gkcy9r1wpon4k68fezjqgqb9bgbo217b0yd8vgigu90g39h',
                expiredAccessToken: 3109516136,
                expiredRefreshToken: 7169809465,
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
                id: '393943d2-20fe-48ea-a94d-4b942e14b2c0',
                
                name: '3p03bmso1aahth1cxg8b0q0204yxv49ewefz5d1wsh3ks4tjtfmpj1odck4c9zmha6he2mil4no9iy9znrkzf71a9pcrn8ucpr7hpjlaj4fgezu54f88wlqmiuaywm9ruinx8fjrq1a0wpca7lzu6kk8mbzb31nrcfb71k01u3s5a95z6iqmycygxoyftbwlpom92vu61p7rnwmavsbqp78o1d619w1bgi87grtpkcefx05dve08apdo6d765ht',
                secret: '29fjamu7r4oh3fsvxfpit2igmdnmefc98ypgswgd93nu5xmatoclnalizd698r9s44wi79lejc7jc7p7fug337ylot',
                authUrl: 'uk2uadsvvsdnnp6liic37e1sit604hxcssoqbjbbhbq8xkt9iv9p5lq0zqg6j7vfuratm8t1cmobgk9vcn6kosry483z97kkj18n4hdolgj6l1t1xsbk5mdy3ctg66h1hr0v5sa26sihd2qxilgbsxfwxcker5vhbcm1qrhz23ikislosyd0pvcjxrmj320aubib0xpcr20fs330ufiwpdmxgf5tcdod8wh7v1jaup5wzseox9rhlcgwxvt85fzp9trm0zrw23j0u6ww9kbgnjk90cav7vabdmgpimlzd5csg9k17vsuq8ufjdhsk340oxwdf6nobe4ajadp8l2uvp1befyiwe7km4r9m0q3yic521pswwp9eqwuejnvpsdu1xdn9yuhqpvp9b8fq6mcpwxwna92753ovh3rwneu3wput73a5vomvorxquo9gadjl6sq584rbcvsnipovgrts9s6h69egva0lbjablb5x3uaeo4u31odcvje3ica4m967691hz35wt9at395d4xoluoj9n7iav8u15hlejj2rv0z69c54mq4ul9vjq250cb2j0f1ohos80f1yex2pf01yg6kddzzgw8jy8hnbow8tszqej9i4lkmij21l5gru1p0hn2qt46kpbfi9g4tlhwf0rhwelbbj6515977xnwwqhbtlvwwwl6j8wjpcbj2rns6kp85rjiydcps9vcs928jefnr5mqfqgbn8wdwh2bjs8hnyycy04cu0gory3a5dc7ini059syyok9oeaiv6b55mbw4girr1kpiziln97125dfjdntoa2xbxcb3nqz0o0bvumiu9mhhgecqkmlyine4flukyzfse0s4q6m9m417j6glvsiha1yqk5h0fv5wgnndw0ze0evtsnzj4eckei6pimf0nw91iafkozgcs8d6ii7j3r5vrldsgnfr425v8io1o17hqki8x07r653kdkbt85pw0thcsylyixemuocx48pl7zl5remfzxcjtgvlh8afs0592kkgenyiyhk65ai41fkzasck8iua51dxsybytxz9um43oko2228b8vl8elmb7qlxuxll902w3yde8y40oxe1jbkews81j7nsj1blihiq3j3eqq0306npw8p1nq2atjqfezj2ot8ibsfw8khory8urz174di7n90ditp3ge3hiebdxsw018ko5x47crol5suchibvwz11uogj0vgcssyksdom7am0rgecic4d30pq6dw1zt8ea8yw2z6gwc118tg7lnkonaiiqzauskt9mn4u1t3h1ralhc4drp690ha2ornf15mgzwoogi850f04goqa2d7w4mv6t0a7n6g0m0gm2zlvrh8b2helvlip23cjjd3l5jwzoj6vxy75lo2q3iawinnm0k136zh2pkmv9sh5nz3na28ub9s3zzmd0zmgkp8b3rcw7md2so2oalsud1snvof2odgcyxiabglw6oe4v77n120r6x0llwy9knz1qzzb87boyi7opq6avencqtcont5gsc5vgep6in7hrjz475k2qmbgkul8k7595817hahz50afehre33lbwjnflr6z8fnljxenyzinjvu70fexndhnazvxfuj8t8hv4kizuk38krd5rkann96qlo2z67kwp4m56tncab0qx7323lmleqtb1w0k9siah9dqbs4d2tup2b7g62watrre0hga0ggm9vhqggpebwklnzriasipmwamg8w1p3csy6z9jfrhi5akashx0iz63l86x3snkzbfblysqg0w5j63mci9jv89v1cmj26lilvuzb0hvfkkw08zosroh87eat0cwmiie6gh2anqovzbmbwwgqge5q3syjqsbnwybfuo3ibwqweyx02hxkszqp69rrc5ierlcw5e4kubbymqt2iy1dilq6ri71cjxhzfdsr9ndun91fzuouyhz5uul7q6t137biuagd2knfxj8u38o13kcbicy2untrv4t3b8v2xpwne5abl7ikpmpjmgnse5wnpff6g',
                redirect: 'yvqp1axvahy7cm2yh9hrizxonkhzrcyqpr8rszdc6ov91cmsltypdrdnh195jtdgrs5c25ky36e0iw4rp0jlzrbs5n20dx6g46wiwjacm2fo1ezfuqn183ddriammzogqyy7dqwsxpv2gw5sazkcp15sbbrcb4ms9ax3x8do72cy6t8y356qfmtx7cxh2h1kvxbqxmos0kv8yru84lgp24xg7hg3tfzs5w6o9dsvqfvb1lo1ux7xeko3dr90slhs5z5n5r9akfsa69xfuj2c7virsqmbkp40mrzpsrmgy1t1wniq0d9rge31k6679e834pab01u1aklu7un2m0plqc9vf1v57aw4i511d767uqanzx557lkkhyaor7zlayjlm9k5ifwuavnyt2xzx0ivtjevw56m5x3ypaswbgfezdooy9tie9z7pli0qau404to00wzt9mf37rkaar788qzzg4w1i961lc6e8clgqnuhmza8g32881hsnp24tiifr1we1hul4t039mlyo0ni4rp2pi7xwh3i58irti3u6ddakkv8cn7ycz26g10l0m47srsfoy1ekyknc6p6nbp826w4wnlowj8qcz99gyvoiaelcdu1d1c68n9eoy8yt8m4fquhb1ur49euk93tegt22qt36r3mlfjb2bzjw9xazxlpkotbn7y56y9ifzrbkr7e8b27wmhm8xsciq3potu4tj7bc6tf0sh6xohs75p8e9sxio4gaqmoppmtz25283ofvsimf3gl17wu4pfheqytcb2ty82270hg8voft0vkyjrq6l1i99yuaz6b90wdixwa5vzdu62wil66i4k8tufbwp5w2ylsbqdrt7zn06p5qhsrs3cedn0dl4jaqnnoj6bt3mzrukv71o8jdmi1vpi1crck2v8phg46924jr5q1e69mfv9nvt6hlgsai5cqn51usgslm33396bkfreh6zt1imxyo1y144owpczu9gbqh04famx38q2krzz9kobf8uezfkjdq8ni7jixyeyypsgtbadw3pqohfuycc188r3uyntfa93u7se54zkoj9ie3tckt6jnpfc08b2iuh9ly7o6m2qhbrlht1v84fqylnez3shoym2z9v2mk5f4mg15y2wux8m7j662402ffysr3g04hzps67zawv93ybu5bdsyf7htmcslb1wm62wpw0oh7xyc0p7wohi1ie7imraz241wxfpacsg93cea8p9zez1z5shm47dke5s4ru5fm67yg3d49uke8nwmssv8t9y32ztse0564r1qwvb4tcird32wjgpbwy8tmfyo1v7gu0kwhv1s60i1981ov2tcmn3ln5o7za8ha2adnxu2nm78ecvm44ybwouk0rqsuzjqn2rhlspoc3b8o72eyscmp9yhw30mb0u35z6ucriwccqzwthfm1oetgb5ok8i69af14gsh6pl6b70pujdmw4efs8xu0lgil2eagzw7sfoih2srpi0z6gbefzk67k94d9iyjoxd6w48vs26j86pgitmc2pz8yqnqbwky3gfjum79m3r34kasfdhlmb7bxrhi9bpw1xndmy2qs48c9cncc09jjthhp04ybin7v0gkf6c7puecz52837l2nzfcwfjkaz8exxvm26eys2ulfmyxh03n7fpm5wivjbotf3esl1ak9nfwfaar863bsjpfxo12nwsz2k991n66spzaxl91xubzsabsb3tc723foppzjqippdiio2gue8u5jf099hsdq29nn7t5sdjmifec96fk70t9c1w5ny9vc1pjwziy8dyoq91o0bzjyluruuxfarcd7nqphw3yerdepqg09vbd3k4y9s9g14dbcw8knn0z6yrus90er3rl6xvfh5zcudem39t1jap9rip6zo7yqvkekx9w5avy823emetsaf7hpf5t6sdynpn18vrq1uuo7sf5mpd1f72oo7sep47d7u0a2f0kfwu5ey4jvv7ju0oestj0i3dnwug1c9bim9gncm40jcge2iozr3c36',
                expiredAccessToken: 2186510239,
                expiredRefreshToken: 6561548661,
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
                id: '393943d2-20fe-48ea-a94d-4b942e14b2c0',
                grantType: 'PASSWORD',
                name: null,
                secret: 'xmbj9dg7464v5c354h2te4m51aa3lum4liz6ozau7wxlr48qdwnue73ljy35wwzqab67bfsz040gtiuo3x1qz5simz',
                authUrl: 'vfi9p42tuimwxe799fyzm5ghjrvlho1j1dpnj176d4uo2xzx3jf2qq7hm82j0sr4syxa3mdta3m3yjfxvdrgrcybxyp1atzfrh6l9e8w241ttexjrwrumoeal30x1lx2r78ng5p2awwcs7hp3ry4zxge4av3fnepm3dpydsn6q1dy5pkeln8bqabmemvb37pcansjgcgda6h8qnqq87zjt9mtxk2oj0t11ww9g7gndw2tisruizp3huolacsan7cmdjwen3eucvw4kxgmgax9aqyvnx4lxzlx03fiq0ze955hxllgjqa1tgdpxconuk3pzbllu2713jvz66ozm56d85s2l3p5lhzof0fbe1mw176yth8duifmhii7n40s1zqm0k80l0b5g9uk5g3s1iahtprqbnwkyer2a30m3bcuy6jd08uizj0t4y9d9tcjmcx8rk74gq1azil1obgt161fbm020duyge7e4u7w4xrbiaky4fsnf6b8qepcsne2hor3n1pe3mxrsb420y8t1fw5rivbxlsgfyzt1kiub8e78z6x7lahshuc847syofyyva3ooioj48yml0l274yry5h0nqc6w2lpdx85c6j05d9l8pwemy7wfl16yu9nmcrcd6cctmmhz3hjwt99tpove3x4g81xhl4r3s5o8zu2as9dobm3jqueraxutdiaykr5ajbyz9f98folbmgpnl9idu3c75atcjxyyrnj75xrpbmmmnit9i1gt9xtsgfar8tq7jlvx6yhxbwj0sxni0ek28zb4det3or3pfzjzhoalk0gy62qn9xfvjo7nxn05zabhyzjeh7sspknngrmbjb085rkw6hy5agsgs29lzo8wklfxq6ixcavof0w6hefi2f6c3ciyoz97135uisxcryjk017qbfu50a20018y5rze7m7xw466b5w38p4lv81ir5gln0ctu443rqs7ezu3bha3cuqdrsnxkprnaifb6ydj136xiwfqup68ohz7mt88kc8b6jjbh99s7m8hvvp53tmf48kkltrgp7azvwa310p6hmoqm0o5thz509dw659lfay3n5swket1nxi85gtc8oc4123odz93mtpegy3w7ueqwt1h1m52dlvu5n74q745o1i10rjgpx3v3bj82o3a1hs6yzlrsx4s0arkle452bd1rc9ri8w0oiocpxfo76l0cihfwtu90p6yegjerq3jzz5s6bfgfrsroqpaigkir1k6fmh7y6pxdr8piwuqbbapx7pxfe0aykp2irha59yepgpc9fzai0lrpaaapwbdqbqiwuzfe9q415uxoqc3mnfo1xk3s4c3mwq6kdtgh6w9chdrno2ys8toxg0wj51qs438vtdovzincufr060kl446ca7yo7mceqm3uyclpylyliuj7xrig4kcnuar6i3x26d8zkr13g574gapyloyvi8vo8jrqaa8fazt7hb3od277v6yeh9o6yes9scmov5p5a20pyrfyb9o8ki4s0pupqplr9u89gw8ve1rrxrawnq3az8fxqeqcynl645ot9g1n10gt4t9ik82nix3a0aclw9n4gigkn4ofbxp2lf0onow9e90j59h26u7ee1en5sl45rj2bf1v8t2ad0r4tzoqjelfid17875nabkq0o12vcfes7wb612hhlm8cgsgcne5i1gtjxhhs46haclrzbtj65by0kzrxhswnhae7qdizd9dtexyv1gz8jeaa521kq4xbsmldu9qvqhrk4mf7a3n87aoyfce7c9eelfpfyx9mxbf96j0ard0zlgpa0khx4ccyye9tmawqyt20vcbcswuucp2sh7o4en1odhehi4yjugax7lbzc1gf7nwtxzep8z48m929h023hyunmz3r82ocv888emcum42k6022e39olwnx2pfzkuasy6f9re63cdmro1hsoxha5wyoku1emuvl8wat6npfvds8qhrqbeuemrlycvptepe0thpok049qsk838m61606zac39wuv72d05iavz19',
                redirect: 't0ul27wv261y2wbajllfbln5z6oqdhoymn5xqd0sotz84wnyc65bbvez68drih3cgwosfb5aoqb46kq9x3vzjq0bfcauul2y9qe0h10g3txcr57j3gbgm5se8tx56sw6gjygrsms0m24sbg5b9rs58b7dka44u1pughi53d2yji4r31ihledppc9xsm7nqyg0ghtdyvwi70yxrh2uhy34if3opsm5srwujkg6qrym7q012km12omwi6wn3xbuo8prz970tkv32hqsvlrae3eimni8cg50raqzgpuzwl9xpldw5q0xq8gf2bhaccppiurovh9f3czsneu74itp3vvyxv81skbu8sfzmxykngruf01b0wilu0fz5uhc0xzsdgdyh3lx73z0n2mthrfytfst2ifwrmbukom3p82hyi4ia6tvyoe6wzqx7uepnc6n5rgp9obqw7cthuweka6rs8le14q2w20kkhtl44kaaeb8v5zwzwfb3030anznhd7n19byxf0tkndfe5myobymxl1iv4ojvyzsdmsz43q6tgar5fkqa7jmm5ndn5hff86xlce2px6m716srbhwerxw7rb9bdpzg9ivcsl3naanldla0gyigazptkcr08mjicfm57o8ccksylenmyki6y7o8mi9eopp8seglecu34xmuck9jweiafddzqdm3tvg8bkuowltx4zmzoud03f731qb0qk91l5czmgg9ynx5xlq3m5sckr4kt2b4go4xwn7nqiflupy5o7yryys1lm0sx961rd8drnbutttdxvu3cfstl0g6vo0rauczqmffezp67oqs67kzzgv2n56q9wfqf7wdhlfy4ackjx0m0p9dq5cl4kqedzrlqv7fgqclu3lvkncws7znztotcw6hu70800xjkct9yyy2onyteoa1gctnh1zrj1jtsftutb6ltiz3i7aia0xhg1l7x56wvhiuhpwe7uugrs5p2eyu0pcd0iab1607495vrka8j7ik6suera1d8gpagnd2lgywxesawcpvbks1glgwxh27e5hzzj4hr8kt1l2mu30upa0ses3rdvzwwmprh1vi882uqeev0cl78a2z8jv0ppocy0gxtcpu29myr59o50viyuadaxqh7127qs7kgvecsma1hc0n914dhwjdcs0nsjjilti225qsqqbi93cueg3ewducw5cn0ep9be2m5f012jkix8681qmcg2pxhqqnq22ga1ei2i7k2mahsn4vdgfr55edwkcygjw00g07wncy77s6r0nhvy6bo8bq6tr0ytgzpw616knz7cpytvaghf2rfnkvmmgshit4nr5wa7a758kgzm6do0vz8ru0rck8kyqpegg5t44ztztj7b4rty0db9ly3amzimg84a7vczor1rd4uan8xmigogfkez8gjk42xjtxxi8434076cte9boo6w1ch0czorbs5vx0a115b1drhtewql48rlm3ll3cfap00i23d5qibtsiypzbc37s9dalscr06kgojxkh18q6j4xq5e14vz6qi0diwwva1uen0vh1mhvbius97mpcuupk1flx954e19xy262f3dx2dym53tixawljoz3aii5pzgyes5s6mqwsnbpj7nrwsw382adl58ctv6t0iiaqcpovywv0e7stk1brrv6x8arlccuw39mys5iv8puvvgyxkztxvaddc52z9stk76bbouje6c1ffxg1jdyknatfnocn2g8u0w6955ri6qwcg1vo8lfh2xw0ir3tmlikw524z0n9r95w8s6spb2v0tn9aw2a3b4up5n21dqpkwj391d5h28kjcl9cczsxjkhzyw9j7p1lzkje9wx53avs0zed2apihh11d0oov3usi9kp6opyiqo0oxdf1j2rtx1jjjl2z062lyhtkog6lysvprmub006afy217nu8mfrcjvd8r48602n72rrpe844agql2swhsfimzphdnk9n70dvlguo8ljx24dvyuw4pnlaocvo2ogc9264hm38tnp4t54k',
                expiredAccessToken: 2835923154,
                expiredRefreshToken: 5527359954,
                isRevoked: false,
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
                id: '393943d2-20fe-48ea-a94d-4b942e14b2c0',
                grantType: 'AUTHORIZATION_CODE',
                
                secret: '0w5qs8rpaingv7n9jn7iinaa7s77eqwfnupyaqv44ej1xo1i5iuvzlj3kxs4op5gn0ohgj43csfr0z0svjs649rgct',
                authUrl: 'fvtkv92oub6aghhccre0styxmjsaili7u0lv11grluj3if743an6qzrbj3291hbfxq0sg9x8q9bvjlv2givn5bsp05fw4ua6zoqgjkwv81w1ly6x7jtayqzp8o64qd4plnrpdnvgraki2n0hm7vj0jcvclumk241vxgpn59m8eod2fxr67etemabolduhyyqlvpqwxw7y08h23ygo7jt15gyzfv1bv1g2kejz1pxa871frcmp45s3wsf5gtxnsw6wqnn5700z7xhhrtyaea8mvdk5gt2uap0dzang03d1tyzfh8u9vhx0zpgw92owlftb1kx6vm6uhdep1gd62ronhjgp37m0ueyg6a3xopgcyt1sk2sdvqnqo06hcf6n0d48hs14ihg2028705wgcaf7sp7hv7h5qao960lxueprvq78jfb3mnx8ao85oi56ib1ydfg9ob68aos51la74ko6w0pe8ntm82bysmy8nlm8wdd2bk31uzcm7dudgzhj8nltdmidfqy9d2ahw3jfzu3s36c89s9xuqxb7trc3ffgabfd2tubtmxjek5acb28pj9g211n8e9etfbvadv1xuu0h6cn9ucl7wb8rab53vb630cyvp05it9fdlsjc8m4lz5ryo3r61zvikvl6pg2r66s5rcojnmnhm8725hyajnqoxrcewql43707bfoqiwlyme7b1oxlfvvxzmxwnhgk5al22686rzqdhsynqnikphzyvlqbqletbt6090tibre2jcjshmyxx7z50wo1zjtfg5ykzg16xwa40fianazylql26m2c9axhl8ir80gfuo72dvkfi53bycoxpdf6tx297eggb3fsg4ylnf9xng7hom3osq1rkh1xfy8xjfq81kfhv1ujtw063j9xgtwl1xdcpt4jlh6n0ti77valu9zva3ed4v34ctk7u18x0sxhcq3f4ib5kodrtkvwmdx30e7fkp4a0ksvje49co7a3rwcbirqygetfftv0u0nwkc86on1j5k12kfensswf8k77ygttzckan182b3rdso4hv93wzwpxa4prlggql0udhjkft3xtk26ebe29lfhjms36w1u4zrxptxnuh6p39bbmuqrxc80ltqls32qbdbzvqhmtv8iajpyhnh0e1qqq1b1krk7bil80wx1rvbi5npb6eg5ywqf0h9d9idkowejutt0ozt31eqp04tdw29fad9rupy58dojyf2r6oqkk1wf2cgff7o0u0oko0ez3wnxasc7kyycn9726enp9g07a9vhpy3qg3qxmp51s15mqeh2djzylk7cwpsrbv26faqp1z82pc0kushs91kdb4nhu01ggcl7p8moe7o6fnsk6ymaqa89yws8rwqnmggac1hg57brydjxj7enmpaq63fsw4skzwx4v29llk64qlra97a1hzsq0cjnwl4oisexo6frnav05d82faebbqrhz9haq26ylhfnt6z3r9d55bumdjaj6sxh922ty78nrdcj7h9mrl073cjho5xyusj74nbndgbncbuaau8kpure4fkfyi6oioz8m6ktgjvidjw2t8okkg11di03sgdx6j5lhqo6rk0ia46xankujj8otwaxknrxat4w2250xeakoj9celxl94x8m7z9qe4h0jinkieu2wr1ej911riv1mwns5clzpcip8jviv8rd9p3o83st9bosb7zw23i8k7267bm5ax4noyqdptawvv54ozthodnvdidaebg0okkf3mpqhicoui8sng636mlcv5xh4d6h0o1czvbn3dbicaon121srjowxol3p21eq4yh5uz134ibtogm1vj1vauftlecdoallnxt7gd2qytrnsb5cxsj62x2cqu0trq2shcr1aqtnsse4jjzh1kvxngm53pgytg3g5997xf48ormvivsrbry5jh7zkk2n7zss1hem1jjhcojt2yuf5x8tfppqu53jy2evg8lhorzoqzkrmd729gep4rfk0b52sv7fphqflqimikg0289maoncjyjp',
                redirect: 'jhtu3ighj1rva4fq3wy1kbid04vn6pz3qjpikfv8judn69t3t5n17sv2q8ekp7gscmgi5yckoy39ll1dxkkcmwtihad3cocbyxrtbhpi0lq96u086g19mk6fhux3dmvi1siunfq3czlkd9lllroz42xrb2vpz8ks8pbae5aqzjwn367cuculujj3vie7sw2ww97ohydtv9l8m2birj4hvila2suj4v37ilxq005dws8gngyot18q2nq4pdwm9in2t9tip7btzwrrdsaemui3678ca9b0ivhqpp3xzohf0rx017ql2yuvkt8mo4nsktnk8hhbbmo8hlau0ogx60qzy3dwn6h2mqu9m1901gfbudjq3nyhu5qd7fed7v3bz5hak2290l6s25lw6c1kk4ycfytsga25vvqsl0yfahvt40n4bk9wbkvg57lmmn7h4t8etppug9gq0akjctqjioiedo6aaw4hi7fuayaf9dc1c75frzknnn2uoxxfsl6nd88ymxyklzughxcq3bv0x4erlu2ic4i6srn1maan7u52jcydeq2ld0ksuh019i3l5hvm2rte4pmlpqpft70xdmytjhybfmhnkqafrf5qprks23nc5wl5rpmt036ryj0ct88mt6qs8bw25kiz95mfeb7j10xd5fve9vtprl7e41n7t7t1db8q0wp94j8yza7xwo7yau3i48czf11l8anxnraugvqyyz2wxv32gn7ya3lp3jdey527yh4rdmm37r8myoc6nswvggmij32zuol31b121y7u699vw0gjylig25dho68htyko26obf1gxppi8lxeh3uu30tclturhw2zhm5rhp7ojc3269wxo9pp3qdgx412cmyaouvgeebf7r4zgo728llh5t8gg3jagq9l0u3bw8jqy5o6052e8kkpouwqinsm2zwwzn3repdfzq2sz6zj97giaj8udiwl23d98dwmamcnmgomca3p0ahqkmyosydntu3yohz7uwyyj90gikyt0r3sw0d0jvvdstzh8yrz4yzglx4f52wrbaaezt1y6xzzez9dauptjvl39sk8bte3u407nnd0erzdip9iqwh7lqrrjfxfo3pq7ilw33oz3i5kp8qvkhi9zcq5wknuks8j3fhlphmfianhcbops92o7ds702j4mdxw0h4c1dcfu3ga32jctc5na98iiuzwhmwh2yox09hwtvi4va7q4chr1klm60bk3ofx73541nk4gvjuescifna6hgoixr6u4vionhtxmw9tij9rtoxhu2x0si6gx2gk264hmgjwci0fv62e58y9eq9rm7h72alva3td2j1idx7di77qzzt6ilxfoe48cah88pcuw6gt5dnyr56th5ykmfum2y1uy3fxwat07z48fw24tm2c66wooh91afca4dz3v3m7l6d8kju8vcebanhqk9vo8zld84b2ktdjnll4cjpculmizkh8gfzht8rpbymh5zdx1p4wae81r0ea0znrd10apzojjrykz3w3oqh10nebmmr96fehvmwqj01sydtapbkxfzgrs4deyywfir58mw4kgxpistye5l96dczycl58ri1fvp24bmyiolzscczkxdvqosu1k34104okfd6rbo2aav74gwslgah9oxl1rojxtv9vaebe85okn57anhml2mvtjkxfup8bexdbu5bvldwabpq6ovscdap2g75ijb67366qavvi30y2gzdla7f2altw7i8366wuftyi100al0ig0ct62173mcixdqvqde8a7hg12tgryti6eprx0vhkf9t2740t0g88u5hed8bz40surzcxctpmprr1cm5lpt8jzprunhon3k02jijrkc1fw5j47wmozg4syq5zr9uk3viebefac8orf4o813hyfco9vo95tb0n521gbfa3b925smla38fdqi7yk7ezfncvlbuded6tbtt4rbei1m388qminbjdi65uffvjp6d2pdxlh0arlcq0yzo3xh1x68t4pt1zo9ajmymmnp26u',
                expiredAccessToken: 3388228546,
                expiredRefreshToken: 5064491732,
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
                id: '393943d2-20fe-48ea-a94d-4b942e14b2c0',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'qsca5iflopvbjs2dy3a0kjrvxmoflcifo12ngtff161d1ezz2jy3cvknw2p8u3lmprhksvcaczv0tnuo9lw7uexxxafwobx2km34ww1vjdbthttsdlsy0gq175oq3sw3zaea2m7vlf7mddyoqh2tj1x5fki5s3ekz0jj6lmz4gw6hb19ntedspfvae73fy3b7bliu526jk1ba163x0kgep9vbe114bpb2n0mb33hauwr4bucmrgidgokourbyo6',
                secret: null,
                authUrl: 'qdljeiuxlmt1v2702na9zsoki6pobcxmdr9d91r6sd39wu1e3dz1btc7hqzyihiv9lztdbvxw1v1bbw7xuy1mwltpvcqjj6s6gb8ahb0ccufw0z3an5uhwwuoh6fpo3fivxk312xbjd1s0fvb5l7we7bgflfiig9b139htl7cd0m40rt2j8a7j56gikjhqhiwbs99t6xrwpkwcg0y5ddippkerxa8ajj9olta3r2j4yghe79wf177df68c0aypksgjzi4s9rjsneeh9l70dcws8y385xm723sowmoi4fqzqp7qyhozg079t0hp6tpzay5wpbbvbcyn1o5r045nykth3kxqqeong7mx4tg6lq0txw2832mk03tm2vmgkudi3pksxmprpjwnfhfybabpy4sobszcnl9deupi42xa3v4rm6g8fx9kbtcktkwg5arkvlnhhdx4rpbs8p0tsxqb11gsljzzhx8oee00pe1q28eysz0456jtgy7u7ad6vfg5e9uhejywjhlymgcrodpne1g6uhxx0p8zt234cmbrfrovur2ncru0sv79q3l8qua6ezewpq4tv8fzygnxzvg10mdqdsp2zs6it2mziz33ua25ppugt0mqansgehr4w3jutxpbgehd8nbn6yyzm3xdclo9dc8jtze7u77xilacm98ascw5kntqbzyvy6bgb9i3hm41zdrrtf9x6wblfgcpur24dup4ujxlv5pm85nm6gwppfn570u7niqp0duzz4itevitihv7h5wxoe0tjxat2u1fivfm17ih7yof1xdo5zflm414ny4yqyl2vgghou30c49fbu0l2bmmn8jyr2yf98qopr8romu0bwy2qdkcyixcza0jbfq1mmsv2ugoxlurfzrugi6a36c50z2r4bb31dqajnep2ea1qofs5ijlyn3cxzjt7ao52dualyzdbub45buz4o77ecw8aqowilbl68mkrjojd02609b3aa5qftmgkyqpao2ai5bmv3n1pwf065c3p0l6kyjdxaftvi9i6hkqjetovdzoay352ajmsvtnewntna0i9g7p1oyjtaeratw2mpzrjzclybd4dx4gkwo1iw6a1wfmfzm5c8t8nxnaiqnhp330kkpotfodlgfp6qvdhsk2aw8zo9woux4j6edvdpgcqn70bno4dtm4hdq2xnwq6z3c6x16dkiyfkz13d2rqipkqynuwx3tlj6a4m8xl6hgqwtz6dq7315z3ijp2bi5g2kjcw6zit4esmon8vjwaxxk8pldqfdij0n1ey0ujz6sme0q9209kx9m0vfif6z7ez5igenwc78dq29b9k5o8uaz3vnlpi009f1ginc5fuljkebsrfkaqbzhgruypokgywhluagr2jncipslte6e601opz1py6voml5kd93de47z0h8jfmqsbfwx7lodzfsq8fb7qum1y006s191seakqq1nbeyj2yngclsjnnbf6qitov8svmnvlcck5fb2swxnczz6c9rojwkll2l1feva9nuoe63rtv4v5quneivzrfrga76mlt0u4rgwr64gueyqmkbr43d5jx9ypdbxcnm1p1p9ch143nsu2ty062emnxs1bfra054bo1f5ukqttwtdc39dz7a8gnd83vvx6wm8rn99yup1olitopcelulcvqahketb6w8kcpjl63bo51g3nk85qrgmgc0hkv48tlxxr55f12qsciy9yktl540unvwrzqo844adhfnatymnc9rodmohni9z5lthqbjora9sncdny8zda0b2ush5e8rlo5vb5j99aeoi8l91hc2kv3c80yni5ffe310xl9wszk0fqpo6996qkp4y996z7genr0y1lveoqja2g9tctkpcqv3yyryn8po59e0aoezujqafxrkmvtf1vtaw1vbsgnrnav8vtxfosmnkq9azayi2fssl0tf5nhothsvkhmd9a9m0ir5yp79uxli1vv0kucfe301nq9skc78vd7ymri253g9p99ptr6zqh1e217tl9v',
                redirect: 'q23epmkupz5vjh3dpgbd2q51teqcknddeu04535cn2nso2ydx3nmqfjftct7wf3l94a8gtduh4mg5dgwizq9d3belfhe0co5awjq4j927vqny0sohkbn4inv5fc7gqm59922l4el8tqy1p37eo1403oc3v99iq376rt14ux9tisol0q81i0pgu6g4rbwrgq8crcxhe1zg40yvfozb2e6ryg3re9erg0deqp0w25uwadgpt69dydll266p5ocqg6hlakgxw09zqxgy9dfallcih6mwy4c98o6ctxwswafn4aunznk8va0hl6ydsryv9e2jqjwuj9bt2pg6g9s0d9t8biqyuf5b9izewp2i1xjmfeng9c94oddv14um2psl2ksa9yuo2kb3e1qk1wo9sq8n7pgyg97cdm2sqb35d39o9x1i55nz4wsvwyeseekav2f617btan6lul4hgs5afrw7o4y7dyhjdxrwifr2jl10gvm4oydi5ohlejlvfzy5q38y91f4l61l26lko6v3v4v04piqx986ubqlnsfkncf7vv5xxozfop98fx6xv2w96swygg8baq82rpyfsth4c41bimljp19tbhbnj3phhbe1vckzssb21qozyf280vdjf2l2k3o2dle0lkqx19c2t3vv5xwvnq27zt9stgq8wg9jg6mq5qvtubla634ky94orcgb2aqwyii70a1viatlh6wpytt4ro5er5wmcmckljpg7gukhs79mrk1y7kkjtk7p4i27r43oei4i00j022x4zpb4xhgj3fvce0vpxnbe6zgkmm8rds6ar0sg921row131rtsdwzzwx6bnskrf0gnvgd5nhgie6gisgzg72zgww2g2kfinmp69n8cnziodiuxadd06tb4yxuvx29motf906jw6cnjye0ae4kct0vqtvcy15n4ft9vo90xj42w0adixjy1iln46655z77ifc5wschcz6c3twu1cbsfmemoe32wq6u8uj1mi12z3p9r0aooabtsgux7z982y7tqalkn2jurgcrk6j7w125wxlabwvbrgcvsexgrxvqgyttef70jr6fzcku8rss1jwlu63gck64iubtjh3535ezi5ynuqw29ubmdnath0mcmddx4234a191obzj2fnmv480ctylxo0crfwc5c5d4wtblawwsbu5wx539ng647mtn5guzgxni5tvxni3pg8vrynavmx4sax8c4iunsjip27vtchl4ekiw87nbpbo8tjm2dv5gfvvtziyhm65fgzjtav704gf1tpcm00mngdskv85cd7rew7rmx28h0lcff81bqvx86vh9ncaskue6i2q3tgtt21t1itrqy9nzessvg5drbkiqtktc69yfiis67czn196mpxwnvh99zcbab0q7u4mxubqv6842n1l42aqozuu51gnipr0hqjdibfd9qhtrl0tq0vucnqsary7jre6laka5nzk1emtsxlx9jppv8pkf84az5rw5ba2q2wzwwz7oidvnxzhhv9gko4p5nvp89l0i4caja1mo01ylt8crrcbxh24eod8vf5baxfuv5pw1d39mtg22283esi8zn0vlifj7l9xvb2v9g0mzg5hwsw2lwaptuer401vxtx8xqaol1dhdfledj2gfo9h7z2dskuf76mlhp4t6x6i1xwzv5ga9opkm77j93hfz9g3ojhl2c7azkb0d83g54lbchd5kd6teo5c2qnbapwhqkvs40g9sgzvtgyedceraxgxbplnnwl86dzpzrecufvp1hhr3t9cp1wvwzny7cw38cgmav5ek0re6vzv43mgsbssr8nf0f582yzoj0mro492fvkbng13k6inb9atgfod7bxfnn1ns7o0zrixc6vf7zu0rjfii8fvzhohxav9ki2l2fmxnfzsfqcz22h5kv54o6gkzm675263f9d10nbn6udqvcpvull3x1icncif4xlz8xun49hie9kqjf5wooakciwp8yth8hs4mpztykopqbxyw60nb13tntxbhe6',
                expiredAccessToken: 8299213146,
                expiredRefreshToken: 1022171250,
                isRevoked: false,
                isMaster: true,
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
                id: '393943d2-20fe-48ea-a94d-4b942e14b2c0',
                grantType: 'AUTHORIZATION_CODE',
                name: '3ias078infxt71423gp4icxmtq79jhzjyqqtl65qd0xm4kpd7rgrzuzd6tqs0h2xqsp1og73jrol07isog4kyixar16jci84hip5clxkfrdijzi28bt5t9unqgj2hnlis9urbb4yqpgu5g11qytj1fuf7mmmv18rej86f70vcczo9vejzopr9nodqhh35jwhycyp0xug9adaedmrjgjfq8kjkk6j3jxcrrlytwb6nu0u4q007ugk08d5fehz72b',
                
                authUrl: '2nj0f8nft25h78spdawdxako372i26juukki1ffxak4wlxpsicb12w17593qrow81k8qjtjm3yesxbx5hytsedoalkcjrqo1vacocc8p1y8d2v487jz8srq18jy7fzkty37gzsbzo674ok5t3qc8e2kw9k689htah4qb3el09ix334c6flj5cmucnjlw00lzw1lp7xd49fwcf9kku8opft5d62p8bmcdpchult0qqoan3howywogd9wal0ckn890xgiqtnd5gpcvy13nbcj9k5bd0j8kzdopugwv0n6qmv1kfua4xsb62b02anxj7g89lq9mezolbhdstaliei944k0luqr6sjknl506f9mdqupd4ev78rbrqyor4f3my3chc83kgvkqlfzegtgeeg43mgge4pflya6ghy4gmff1wfaxd2ah4gvc399qpd7fw4i9i8jimn5zcbicxrpkemaw62yld5ys8bfff56fow9oif96nh00ke4rkgwgdaw0ompe643nfk1uuresrkjddalji2p4edoaorci8jwmmmrj4rv7u4w5af7qa1kwzqcyt41hfh6rbkrypf3iw67e6e2q0js7p79kxlrt7kw2sjc7vmu4monr8ft1l64wjfajk0ldrpyclgkmu5ytpmqwvunyuuyzx0hertnc0a3e7ya0cj547d60rf3euboxawb0b9tx3equbq1l70um1jg9poiic2720vls12twm1dqz8zhz41d1pyh9i0azyijy6klzyn2s6yuhvbckidb6sgaybeunkwkkuztxjywoltefvis3fa2959obflnuzkzhsnmvg9e7scx03rv5ekq67a39wvvcr08aj1r53x47makqgbi0acl0yskxqnggtvlyplh7321b5k18pu68fso1dsal925b1u1pxzl5wm8a9cbujvub6dr51rav1h0yndy4ies03hst32yo9c37tf7soebxheznf06nw8twipv17ov8zf2k7zkcbcqt4qxg71l3hui7f0h07xqfmw2sx8q075yahqaxufowciouxag9qvwm0anyiiq9eqnskua5kmq5y25310h9ryk1z43l0hl5ulu63nzufpm41scb3umuagro3vbqbh5g8spnlisfwjvqz03xf1gsvbpyfts8m9xs0ssh3c57gk6uqut67eu7blkd43375g92k29imzda6od3mommvqe17su6ojbkrt8n18zh7gyfitfzcpme1vg5lrlx9ht4jd5dn3h123zzpihqnmz5zrsmxjhofqlgwmpxc3x1a10gymqxnnej58kuhyyf26vtria25dtovya38feno169w9st8yrj4dga5bkybdegh7wqtzhyh1f8nwjcz9vsx6imr8r5siyu13wdb8zpoic5x78w0i105yo3b5mcvnhqylhkweq827yro57hdl0s9nqkr28ah7ktjzkx005tw2ku9qslz9yb00ygodsv5gb3evjtb93xqr17v0ef7iw7bpwgxlwtj4twxpx22wnfzggieseri04kkhvatc1yr1k3ldq0q9ormf7ah85pvsrpw5ybqvi25stopodxxi33pmft2nly2ls4qmis6k4w2ewv5adr4th7694i3brma4ms6dvzl2w96ir7rh5m1zi92tl3b8tvvmt9734vi6du0lzo7sa74ll41vcpgm7cvl100ftktlhuwsph5x7in9mu2cyckb0cbe63kf1svbadggn4aegxuuowl0i9n249mr5e429n1z9c3cdbp8wgv89ybjlz0l88b98rhz2ocmfsxluste0uda08mp07j2paxm7fcga0cmpbwrr6taua4i0koqeav5opaiiv3pxks40rdrplp9r3wi6d87ig0lai4kawz9hvgytf7m420x0fby39wpa4ttofricqbf8auhzukh9s49yvv4prj0t5qd2id91011cp9ra9d9prtlex1aos4tf7ns8vicr9d6jwanpfmr2h0hpjybnnzop6iihu1a3djd0uk8cko1mhsxud9d0ivsa3iij',
                redirect: '9gzkmtg2oe3cmmfb1nl68z6h3kwijayyjrceaasfc9mmzztt642b8z8zi27qj2pb8feea28s9ual2furpxnei60syqg91ubust9v8nf5a63d9e4mwau3mfymeq7d4ukgdpkb4nu9weupb42ksaxc61362rj2qtw9u8o6dwphpio3t6rlyh45zcaj20go1q749gqgl5808fv5dqu01dnsb29ohcvfy6ofddead962jdnzvvatuubz78882a4mr7zsg965srfk6krx05pm0su8oebbwtrbzyj9z95yljfaw1mtmd9upv081y34o2n4q8py4hn35jvukdbq4pn0as2misfrzdbtlnfdp5wgckplq9tcewgkedcraobizr3n61rdgofmlh5y8r6m3ei89816jteyvgyjxuewj6zn4hv3u4c6zxhlw9vhzdvr6fhbtcl0jww19irm5093790nnke0bjt3n6zx7uwcqsock9a0koyrhphiu0lejwtnuluf3fev5yjqomzkqgenio4d5rla3ao70bkjcc9q1gzxtrat6ynir9iv12afk35i5spd1owpv8xxo9c461beuv42vagqx75711d9c6s0qo9ecw4j1621swy0d44v1iphz6t1xw1rxre0vuq195sggn0addx2tt6bhlnahjvam4d8oddt2vw66gow7tqiftrvahveil9jebaakfrfm7y73naeuvl30r7wwynwg9ye6q81nhyc71c9oanlubjfcjwa0iulupajgeu1wy0vcrzlchte5zdohv7hjwo9lmvau90e61362hxg3819s83l2bdk4ubk4zipml10c0mh2cpan4iucqkz5pmqxugu5vqh8g6sbpzppruova7yvdcqzqp8faizdaqzmalz1h8oxx0pkaq4a34lblp1v9oy99dk9ensydw2og48vjt8okrf8494ny6c7uitnupyhddijvd6c5molk9ifixh6zgmcmdf0chuhzze5o5yaqh13m3img5kh1fst1krt3sqh2qxdv446u4u5v7vho3kut6se7r13uapvfo6d9vp41enryck8ze9hvcmg4h5r7vryncewmgpcl1l09o3ppq35msb0hqes6ux7r3030ml6gqopjb70duafsyktc81jexfc0iv9e2xcpv79n1jdks2tglvmzi9ok36cfnlsuxg9w0bqz5ug0hdnyuge7gsm6ts4tmkrasp0hrfnlb3ha207ne4j2ejuxcj847zfs3z2l16e5rwm543pr5pchkwfyy97q5m33oq4i2dt536qdnmfouov5han9y74tha8k5kf2ue4j085898fpryb2lb1ro661b4hi94umwe6vxhxjqqkyoqeyflv0mh6ko703x06bdc7wuogjrlommv67qm9cykz9397dy91afi0oloubpq1twq7ol84f6wqczx0dtkv7fqnlvenbwez6u09gw5m5nsqipmylzjjb1cwsrcjefkurz69i8peusv9q580kt1erhz7dkh2xqdcg5x4hcgpd218r1lsmrsp0xrdmoryps31tgszsjti7i4y1dq4c5tl5za8o3mdigvne5fenem5olkonambh25k0jkarl5nok8dxppibj0n2oopolrld1njrglsxw7qitrdcrup407d7axi990tp1a5m6l80j8uw0fnosm2eqdyn2hsh77mjwersntkj2wjrhpeo7b9gj64l6i4ejox2dsx2t0wbkx9am1xnjk2vzpullrgu5w4zujh9nzogtnrmfcxaix03x2d2nlnk0tlex7bexc8jxsyq9lkj3lx689hj7k60euseuv73ho864qg6iidgearda6ups2xc5hqr2ppsfm8tbwzmztqfr04slbq0ncdoy7pufwbpen7fcjdz3gugys7eximczzww9bvhkoccyjgo1i5cwtar55zm6anhb5qibsocmsz3c00vi6q2lbmbjb6tn08dm08cja3qxgd1robxjss62adxx1osvgkh2f6tquhzn3a6iznstn2cqmpsw59bkq',
                expiredAccessToken: 5000547332,
                expiredRefreshToken: 4822054277,
                isRevoked: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsRevoked property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '393943d2-20fe-48ea-a94d-4b942e14b2c0',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'te9ify84fkyhn6fe89al15f2xnwgd5g2ys27icgf9jo88hv5mp6akj5s99fieir12awni7zaccgepv7xito7i60lzk5mtxku730tdh2twgsmt5c047pqpyeg2qwsjpyw9r69z6ohamxkl0p79oubasen6j0ig5n4mi776t71vfdv9ikhagc81jcgeicvqsnut1qhdlu7tkzy42m622ensxgljos5o8zzuzjxlzscva782545d1vnladf5sbsoj5',
                secret: '2l9h3wbne8j2u98j0osw55lr0f727n7d0cygn7p1d8y0me0zn18igfll42cxdago8ru2qyku4cqkgjw1h5ileqox2m',
                authUrl: 'quo5toadax3kt7v2bdhv6f1d309euj40dlb9oi2vqpnyjur5k90y2fozhlb0eprjdjv3pyqpee9ylzptjntxlzqkd15dnln9t44mp4o8qfgcejul7n4t1qehd8d1bos7hb8ftiu23svrudoa5t1qp4w6w744j00yyu6unvmr25hukmqda82kre989x9welh9tli6gqn11f54oy9t5duxcgck0dx8q00zzqz1ffnndlybjipbihu96n7xbxy21ortoo2x2xygp72os88ff6kz45c3027cm1iibwa6dnfjcj6pu9u6rkacdw9xm5j0thdmwuko61dem47g0ejpnu1t3s5a9ow3j9zo2cxlhyrq4j8yibobqfnvqkzpxgdqdm3c7c3trtzq2nbf1j6lpd1z4udn2nssa324agr835m8z0zpntqwyim5cmde407vb491n23pjyglvttbo81j4jikco1de2llpm6ge8jordimncd5unokcpa9syw1snqpzvlyg0pxs81y20ee1ucdg4totjdlze47lxn3nrdwiua6hys4d5e4pgt1uuox6ta31vcppdislirybbt9hg8b243gw6f1ptfsvthjlrx30nkrxnd945v6fby5o5yaumh6k863xn8rd0wgbknvsy7aqfq3tocm2nz3v3rvrir7wvhsx3sj7i86q7jronv1to7yhezlq0exn60l5u3jc6u9xq4ky2r9isjz5mkgfs77qw9qoa6kkhpwwmfpx9gghmzcq8cw76g4vze164kl3uo2ett6uhuknk3yc9f6mu8y69oqjcvf91dzcw4me1gshqxekft8k0oqbi67bjhaiux2xbskda0016gxzr2qd433wcy0ery4uem905esytf4z9udl7y4zkvs6zs4orpzc5l2x4h7wn2gb35audba870glpxachsa0fyxfkv4eev60ewj0up986yni3pso32pn6hdkxvz10eucbijwhh1i2o868uvtjqae4dafb6pepv31wybrqi85t14wxxl6vnqhjmhcsgoxtm1i88ymi5gjocli6e8uih2hhj761wvwlcsoyzhvqiit5agvwsfnv60mugoba1sqt68ej9shrht8b0ukfavaeaiyezqoj8jj1s5kgqgq2504g1p296n1q3zdn7jj2oucokvnngr6wcxfltc6dco4dqbzd8c8ueq12rgakqq3l71a4dpe35x6aqjsdu6ki5f93zleopf4cdoj3aie7prvfpvja1kwb6i8f5m0nx4sfmdd3c6m4177nt1vfqor680zo9gbarxpqfl39cg5323828z14mdngsgs8d2sgsbr0q1s2x6eq0ije07zptscd6w7uqtxogbkhekdp5fi4x1aji7iiwnf4bd0fp4wql4of00xdswpiwn75akrvnmkcif755snrmicdvupzv5czc4dg6z1okmjn9s1922fhngg9b1ncr85gr4l6zatcjvt1fosi23i55mvot6758ghezev5xbe4cz91836d6lzshld5jzjgmqlbxuxzfqzw3bb3m3j1gj8cuc14rdij79smlah4mfyr7mvfxym0kyp4g7myt9wsu9g3zxfhcw0xoxhkh4oprtwv39agyhjlnkbec4b3ag9dm4pch72ntsjg2t3aper2fhhujh837vlidynr152sz089my5l6yur39c6tz2rj4i4s3w428n12hcs78iwh38yg5vhzoud0s5jnvco8zvzfok0hudhgrqffs2a0wzzr5iwmo1i19qu9t8kdltu9fl5x8kq747gcl740qycfofgaodz9e75me9slndhl311odzmucl05g9u14bo0pz902aaiz7m0l5g3eozm66x5g99olzkz7f0ab1caccqx7vphnmkn6ahlcv5vna5nkixyupa9uycva3m0yq9oqapav1xoun1paqqbswwjewiw2lfwskfnu865bpvxfsy5bh25wlo1p46hkmdgljwcbxkj864xttmndyswk0lg5ze4ii6meou5ktmdcdkh4w7b16sdc',
                redirect: '0gq3iuug5k1qct8xqlm52f6glcahastzk51z89o4kxfgs6gfgcsl7j6ayyyt4dsiel6jtkwil53w98eyrn77fqfrl9twog1wq39bspwsk8yzwkh1tzrj0zkfzlg7yccziipxwuu7h7kcilv1t7gebgjsl70l7hc3dfdedrl14jebmo1ndihcavqr7mudk6u0y049ygq93uq2nenrre6mvnibv0l33jeflbta7shuf86nam0j214ms7444pr2crl8l2yedd7dsp4rdf98nebv420tcx2jslizqcu5ohc6ug6f2nzfumbc9iaan7cmm81qvezl1vuvvosz4i3bamzcmth6knqty1ftljrqm22wea0mm73unse6012y6vqbx7us9ie1fvln31mo2a1dsavperalu2y7wycqr29t2yymzga8scuigqetltj952ba1bsuuwc8ncd0jq2fkordzjjbl7afxd9o5352346odk26k5fk7nqtjkbcxm3gmluuh6n3z7b0kp323al7u2vgh8ysnx7ds6f9w7og18hywtwlxx5uw33xm4u0i3ajvsb19iv5crtka2lrnuxlk88ptuisvil722j0puaq351abbpu5pzp8916u5v2wkeeaetatxlkern8t4kp96plewsn3mwyc8akkodizxfgqcl0fwlag4oxd5i29mpougq6x8mgrarnhxpus0n0kwtxhlurhxeznrgqah6c3nyo65n6js6fqaipdfqwnpplojc1e6dcg0mua5m02cjhjjkm46h7oh5osy4ka5zqaojzg9sby9zuit72o1h1ucc76zexi7wxsg5d1phaqxn1jcffir4kxxkfb4jqniz6uszojjim4atikmr3pulrzu193a7gjr3h5nkusgdytf883w9lac69fhhsqpmoufhq168oxa086ud317k116aqtlici0vc1ok22l2kco1vge1mc436m59rmseu1tqdh8destegzvrd9afbxsa5zbtluwprpj9o51kgg6niykpf5cheiasx3lde2fuye7v23nrvwbm5goahvwuj2291oinv8k862f4ds0g29h7fimc4ahqbp77esbzskhg1g90nvgiuj3wuwwwg9954bvyc8e86ly8eknmacd0fb219qjfb7j2nynvaa3oqq1tbcjz3zixsibeoculvyke73qvbx5x8syb9xjzhvq9we3ztt6u4ykegmfdtq1o08nkmn8ppogr8tz93015mzn7b4fjk6wgf19iv33mbox3bqlh4hmir9cqs2uiyt7mbam3iwpzc1vq5zwp5ots16wmcmb37bw8eem1ebe8l4fkjiu6zixinrpxhvjweqws52a6upa7o18ny7jef3p00txcxkqtbn3adv92mvgxikovu7nq6ia9klcdoq9isdrmlqafb6lajx95eb0dv9ef67rfi2pwkgd9tvqh0s50absu2t24wgxhjv5wlbux8g8vsyc0wizj3e9inskyre2iromrxhq7cgehdm13w6e5sbee7g6u2t3h6im36w8aeqrzb1i1o13wefidmde4pgnghn3ecl3c3hk8vogw9samc1i0iq9za83nvxwdm4ngmqyluh1gyryv3q8cgtgn94o116gxh7cjrdshoe9wcl3589jcfjb6b19q6pd3zln9ldbv2gyl8m10tvfu4ulohyvdys6sctr15uczkjpj03ruq77h2asbktaakr4hs6y6cslwirwbu71a7pwydxw238hzsk6ecotu1t9xzm4rllpdv9svll04tmu8jnxalgzylzyxvnt0zsxslvgpz0ke00w54k5aj1wul65gulwxxoecrt574is21dbxl83f9jfgt4fn0obaigw60vddwg6ot5g0f39lujmpy25x2is7scvnhq4qpo4e0vlehy1b4r8m5w86foj403ji3i8q4vq89r6q1cj65x9ufuxt4t9eg2ckiewf666ncy2d0c9gr9elbfantezbfe460916x6rovr6juftoyatr4w0we22okfl8985s39p1a',
                expiredAccessToken: 4567362437,
                expiredRefreshToken: 9610426338,
                isRevoked: null,
                isMaster: true,
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
                id: '393943d2-20fe-48ea-a94d-4b942e14b2c0',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'a9r328m3o1o5yfir8icy813xjb9xjrnh28ndrt17mgg2f3131gna6amjypra6tt0w8zq16054gcgsx6uzo2k1ofgn3mhd4qdb0bqe9cf6otqbk1m3f3am5febf5egwuw55b0l93r8farzgjtqyq7lvwybmc74vlcfhvoyldegbzvwe4x8e84g6eko4pdj13s1x1gj62zjnfx74vda0wilv26890jrcjaycq1i6pvip8dustu57ta3lkqqzmcssh',
                secret: 'zpcuo7yu2xgj1v3ysxqplt4ykd7ux52a8y6nkqvdibdpzcnclclh3scl8nkigrq7rvgeowzev7sdmatu3eka8ol62r',
                authUrl: '7exnggyhw78vqruhviyi3w8tqgnb0ed3dp99sdeybwpzf117rie1h79d666aq5cnh3bkopesaicwnd5e3hvealqm4t9e4cetnb3phf2eaw3l4lhg6479zju9ghwrcbbtbsy9v44o3mbufcdk4b4o4c7axyelvpb2a5hprqwomlpwt39aqubjefjmvdev9kbdc3naxcdj443dqf5cvubeeupag0fr0y32fp0uskcevtodo6l6lqbhj5b926ulmyxfl2t43v1ahmxp7z9gd7uuiav8j0b03i0sgsqggkb2lt3i423dwypp4dcn9ihizbznx69n4iyjsu6o0tx490gqiirk8rp4yifli0vv271l8woehniblgnzj0f79qb4iywf1luaime522m1fn1l0g2vt9yzz9996uvas288hcepmo13sd0hehs4id91vw1ooabm3rssanxyqvlby75ixy4meh7hlopg5lvd6a646bnpt7rxgttxvfuvwdfi8kl23ugw84fhb6jvyidrkqwkmrdnlw1anjfryh9nhzqmftwiiboxfhzontorokg1150cby9u3x0x85rczwcj49gxkxgx7f3zz94knxm3omrd2znmhkfg5rjza0cta0odcfnza12q5it6ddflzyo9e7e154d2pl15it7z4obkskd572q8ljhmz517sjpi37e6iztas2hl6q18n0h2rdnwawfk1e0r5c5mrwqo0sjzuqczc9z9493vimulkg5lbk2ah5m55jnjmdfyj97brqy9mx8l0pw3wvbpwbit9m32o4fz8ux90qauqdjsm2gyhbxhio7w7lb9ktj954l61r35l78fgcafhbcnikg8hmdnyazxh5056z1n8m6psvb8v5osqhbr5s2lwsfwvdxhjrcmrujvld4zyjten82r4owul8ufk9n9czjz80fhkcogt7g2jkua4ygn8fircl77938ag1mqaz62gsjjkm2liggiysyr9pskokbh1sy8bctycst2bc57coljqfd5hrop4rnrvs9d0o6qykfx43op36lzcem55x9ujdw8aietcbedo2edo6ctmzw46i28z9t2dxby2l9wbo0wns5u447z0x70ohdu60ltl22etde5cf90n3ua79h5hpgd5ykvji8wokdgqdxspw8pwc1j2jqqlf35g2n86v4etmqr7vgzvfbxm5ulysqk59q0j1fdt74lafynozstcczniukex1b8oi0a55sgxzwv57jxw1el2w6tzawxfodqgpji0uo6riupa4782pp9v3pi3k6spsk2vugc6shgljey9svjae9mh1s9lkl3tpbqwhhdxq1byvk6smovk9xw3gai5m4ynle25gzzfyr9pofry2y0b939y193cbdp1gj1ay0dwpp3sg8us0ky1w6t7mtzjkgd2h7skyrevdwhufrnox5kj8wlucley4vsv73btnr2bykrsnfrkowsmdtplup3ngt5rbe796yx2cwfczi0ohmtgd8h2akrobuuwwm7k9sdrs6n89rdxonr0q96yz1rskcampsh0k20wt5bha04kvcxyk9mf2b5rx14hec4vn29v02391wgp2jzxfv8d44hu8ij50ctn1f6360ee0jd6mou10m8264x3r4o8m3hq9onnvoznjhhuk0egvs6lu16p2uiw10szjuip32tqscmmgpaukhr9g1b65etywwo2vy1f89dlu4ymrxfpulwe77kfonrjeehgge07p9nbfewyycbhszk3s3j1gt0ga6jp9ft06bfcvrarw6futbw3glbyn5j54vsa56a2yg89zm46l2rwc6je8q26jle2th7ub2mvyjic5xfc8nckblq1of9zsi4w30sw489u8ppejydh706r5td5u25g5mowd465pqrvbpitsdfcb0mr4sc2mz4bni76ogtabqehdd6kyy92yrma22qukkh0tpdj4cwsa5ha5tu6qbgpo720w06sw02256h6kno80tx7qw0yirs74dhlu37vl04ki13ddoxst6y',
                redirect: 'vhqys679l1740p4nuxpz6psfr79kt2qrzsl46dh6yvl1ewya9nxqv483rc9fwm10vk7y8r3oexihb275edp91k8vbahwfncr4dg6rpq037bi0cve4ymfdej0ymiyhm9cjzheykm6dh6r9q24wx9egggqmwdcodgwv1ugwmedl7noagef3pn9xocdvtkevj4as5efm75ijoafnvgeaxbk4r6jqymsh7u0ty3jqhat8go94nurxk3uub522m5xno7yoxr4bd8rdng3rx8vy2xfaeo4iil9pm8eozm0l25gwwe8mo75bkk5a7qio1xtmbdl0hkyejlx50yc4jtk53mamq90v0igd0ri9fa7qpql4riebnbu75cmfcpi5vtpujpxet6uuslv72tc8u6er6x21q34rcflyjjvuqrs1j5ywqyc7cufrz95b4lr1ocxfd8q9izgiixhcjispod7of7uo8d127qzwjj03csej8igl4ph4qph09bt2n37uvx90dm4ojcw5gynuerof2ypqql1oqv4ms1nawjkbl8o45otkhfhb9hhek1psquxtwfcrz7rro9kzl80dz0ytbjn94q6tycimjbg1r4xff2umysla2lluwi1qdsgztdogrww6odpfgiiorb9gmr2qbv2ff1ojcezdcivmdr6bp0777po7beuhpl663s9148k6wtythbbc085j0g6g653tp5516ptwbix1alguv1eauz1pig51x5q38j4x87jcer6owwjsmeymwwmpef5wej8fgvpqndo7qvzluew7duotit8puwiqp1o1pn8j49zqx0tndgrmrjix7m9d3bgjlrekbj3daxkzhzutyb7pp6jjd13cks1rebt7zroum69tve8cfzdj533atauiquhxdzyep0b9ptsqlcnwpoxyo113umyl8pozeuypfcxkxmzugz1ntm5co4gkacnjuoac2cjfqgeigzavp4pz9h4heorubh58f2lf33os4clvx1gpgpq8402dwcv73dxa9qgqzobp5wywock87tbtezc1v8s6n9tbhsstvr2714hfqrv29knqstl9afnqcbqfmz86sd3wznz04hv7c09khvvsj083k3jv5ykp23okstdi3mcdg9a0pqxdc3zs6s8qpp3wm2mmz41gy8mapt2ydcmym8jzwb9qqsgik5gv7yloq553kv2nqn9g8tv33n2gotd2nlpfs8j8fyn0nrppgyr1bx5h6cdwu3v176dnupw4opsa2hln6b95keorkin40s0btbe5y8v035gw6vq2wjwx2beaws7k0xwy0clfmjgsfxcwx8lvtrc8eiix3uz291s5se8id20f2f9qb2suzx31xq06fbtd3hius6aituvrkgc91bsxowibaqjpujwlesc6rokjnc04m9ldvcbxop0h4ksc2qg9os0n7ihsqzdcp8y2zkweh4uovshmu6ck8puvo2xryy4z0mxuqfag4up6my7owcmw2di9q918knim59nel3jx7las5ldif34l17picdvdyhd3wvnsrmxwn0647bizztenp4md88h6yxdnjgsfg89g524bebs0boqzh778n4eq6bwgv41nwa1i1mwfjx4d1w9tuohh3zehpc5yfe3zbakx5bqttdwgzcf2kggtbtqxzswyc2bxvb2w55bvejtrjg2sbrxklcmzz2iby0safyfhgm6nzu1ahw9dcf3d44lqgp1auupjar9cv8gb87krw0ji50t916zjlqu9j91pyx91wbqfzdrwgahpz9cff42u3u79ccfdott8a6r6msi9bab0p6jn5ednqdjclbz4n69jrkvq56gvasz70cbqvce6k2csuqafwvj6g9po88vghajz9wqwvdocyb4cac095r8jedalxt78x4ydcqcfyap9p5ebyquz8j1l1ug1yfdw7eebg695ju2johwkfm5lqoboem1teeamg7gn27l76k3mfncwbmyzl9vwuc6g5pjydqn5y98n2so79arogipoi6m5gugxla1',
                expiredAccessToken: 6530698817,
                expiredRefreshToken: 4197289686,
                
                isMaster: true,
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
                id: '393943d2-20fe-48ea-a94d-4b942e14b2c0',
                grantType: 'AUTHORIZATION_CODE',
                name: 'nq07lqii9qkk3yhsv6p288pen4d2l851azr6a82sfdiza3qom0ou7pn1gf5qom2u7lix20yukk7kn73jymn8ftt7w7zzbps7xxylhs3z71v87wubdr2bsgchn7zq06dajq0zh0b2ab2jmmcnjymdsza3khtq9u9igqur7m7lv5s8taavugy42zk4iwpk844zcduguo869t99sma48vx17i023btom896xuw7r1y8t4j8d5z2xepkz9o8r4ho7lh',
                secret: 'nnzc7wz0y3p86nxhflspmnfanrjeps528ydts1pdc1jv8xnlo1uk6x7ndivuh48lefbk3um2v2sb01jkmjym7yc20m',
                authUrl: 'eyw95bazz0sgbodjpx3cgnf09hhh99sjzklcswqrp2j0hf8vyt2fix77njhuckrons14vaqmnjm588sqf6o6y9qngyq89nblohkw8bhrkizrat3sk1e2xzuict6xc887wvgidfnd10fv1z599iylb82bbxmssi5ad143ldks0fw3b8g215ekreq3376ohjq54q7aherbbjf40o8m0yt1utc9c9228gtilg9ab9vwzffsbj5p8x4ui1lrkv8icl5kk9vp285chbfw6a72oilgsrnmg7zv0ubeay2twcuip4txo2bndoe5n1kbcibyy3gw0pwhohxuvhbqgiyx0o0fpho6cvczse2xwpxunz3d7rq1tz8ypqd75rao4s08hz9wz2b8ocdcbzey2niwxzth4g1ltsf67b17mt625iant0f0wl7ij93jxnnyyf14gwsfnnvtqd40onw8uuwdxiuiwo09llj0kmqcc99o32nqvq0sywx84s3tu9mrxn6oql6feqj40iqt8veh7udu9ky03dj0ewo0hdrzi7tmid6164yqa7zkgeera9oejegkykx821hwa461o4ulfzd4zrudveps3dfj3o4xp1yr79pzfcxyvw1g8brqip4ylmi76s4udybhxpwdl4ia45t6b25lsn07inwgje7jyume4zjcbp9ixlivwr7mdgy8jmwomgtsizgd9ufkg0ez9kkx91aym2mcglg8jbry5pd8qs6t9eshry77kjptzthauplkbrseyribn9pvrtohrbfeun5j425nsfn8de8uwt26zcgftffh8srx8aaoxkfpmo2n41ch5hotrhk9l0onac0tsauvfck2kw7j2k2ihj0cxlq6gigffmp8t91xeebc230fove50ps12hrawqb0ih5dkbu5kn9ez4odtzkisvdg40d1vdkbm59fn3rvlkydpwenpttjgidduem59x52olya6bbmknem7dpcyn4vs77ok5izfi6az951ygocp1wtkwyjho3jibovv9ogxpm7q5ibx3p96u9ix5aq1r0sj5ah37cb460f9zot6i68itt5n3f8idzrcwh2on9guvgiplcr973gfkzxxm2umxdytkhnr84799b8jfpsalii8u800f5novwx0ptpa2vxqt57fukl02rxohbdtlut1h7x16dpao63m8yqronw8zl2rq1ao1hcuzlwc1ynrj718bnv2qvrakpzh10v0ortkkeuisy3e6rn8dro9ab57dlkfm7k5hxio60e25j6xqkkkax71j0icukxwq9h8arcybysa7b9z1hm7qxueh9jshwi0kaiamlwx8fxgtxo0yt3xe8ueo9632nyuh9ado4y7cprugzfxcegywdc1gtc7mcw9qxrvdgnfpf1bysngup0lqmu7nfk4lf0xtivxk0m4mnnpnlfuzpwhgdvoz35sz4fq4fbdw5bznamk5tikoe0itkrbi2a05rqoxg9w6uydc1mftu7jdczik668jllvby2f0ssrd1xw64d25ck8751kwuwnf3x5y9yqnk3av7znwzwxibruyhqbnl9n2uir4i3gbeyh29x8hh0pf0iimkkly11n1gt45swajwda843tsv7xyb132hz1nhpq7u4n819h3of03ay1wk8icqphz34kut84dov6p5t1pzvj88tarhnjy55bquxi0z45qf8s5e13rmoodvakn92vvsxo6ihvvwmwuppgnawt0x8dvut7c0u9600joynnur1y175qbkxwi5quow21z71lmm6146oemfx5xexsd9nq81we8ngjq9gwlrs1qrx7i1mc27knt4ka43p8szr7thkd49gx8t4mor8eghm12s8o3u5hd36piach900l4z9ld3sk5vxgb32smt7hkq0vvm8w3xtq0qpvzaaqg3vwvyk57byx9fifhj7qo5oaaapbrd15k715r24jg5ksh69sd6yjlufjl5j0psik9zjyouuy8f1he3fhz00a08lvjger81a0f2rdjkrmcbsiw00k7q5',
                redirect: '5gy2x6m0wlur0b5qr0wc8eexow8nfyb2ukbs2dgbwha9jqitsz1cb9rnn35pb7i3cf4sg4rgaww4eqcd10csgjay4y4vhu5z6jqvr8bpra8cs284sgyxftororh6kkjy3kzi4404gvs7epu7437uj9akltir0znylcv7mfte8w032z45nw5l6zxpqum0v0v9kjxo5di1aivh21jyjo8zhqxt9j7bzh20wrpb370ch3m0zuk2oozvkijakybhei67kql5yp3lol4w5h8zu04uwyrlsfz618lp1udydx1a0a4kpydvb82zyx85xxbzrlr55i6i87tz18nzhl79istaggfwnuecwuq4ci1msokktvwf3j2sonn1qpske7ndl2a70te0pastp8xr07zk0j8krprz3fmewpzcuh8nwympvlmddwr3kk738oeansbkq4cibvq1ymcfybrs7i7tdos3gwxymdy6c4ksquugblkyzv0inagr50wt5551zeyrd1zeauzsnaw5qm510m8uclnksoftphezp4ikfry84p9qvwu7abeoccgosujut9ffuyuzelklrjh5b5posky5gm99s51tv7k5soe4bthnt5j7tg7dvyqib9s6qf4h258rvz5zpzq11ekagvu05drgeqiobqqhi0ig90nfozb447y1y0l61c2qx35cqo94lhudsj4pufrqd494xfyrznefl8fqxtl3zgf4oo8b3j177x5m6flkesk3qlyj93byasdincuf3d22mn1md5rkdrq3pkvk84r52h32l79l6cs2sdrrs10h7s8d7r5xfg0z52naaytd3fsatgr7ap8dcvhlt8nb7sc1k38pj192e2fnnea290a3bz9fzn3jgxze7vnyrc1tlki78vgcrn9bm9o218sb0ysmc1xtgcg3u9ec1ozuguhxom2yj8vdfofqxb133bpenx9cc0gglgxe323rjgeb4n0y3dbn1m9y7v2mi4t5pe3me4ivaqnrjxk2d69kjh7giqtouzhtuhwfn1cbpp3lyecnu9anoypyj1impd4pn0otg21cg53psawmwe563z01z65i2sy67kcx86l8t2dtazn0z81se5dv977b1us178rp3nhauj81fewjqfwf7ixjtg1m8dvnlgw8jypgikm337cgdhziijsmqc07uw4do7go33yd2v8f8kjpayb43h9lcelss80p6vzuqrjfn7fbd6gur1dqi8ns9lct7tv2ivndrpr4mjcqsxnjdsxabd0iylzxlvyrtl22gouf4myowklpbqa09pn8bgr4x12d1dyjy0ijduateasg9pq11lavaz6eromzhdom6cjhbw9o8yw6c5hf7cave3p9k7xqwp30hwakl7siir9to701gkvrhlycq3ggf7dkboiceov7nxfn8r1oy9dyldzcdkvl6ip6blqxt9h545oy8fjjbnu2rwpgo7ev8dv3z4deq6zea5p5d2k1r65l0iyozpth3hwycfk6xo74k3j6b5u6e79ovncwnbott3q83jiuwrnfhij7emaw1r4evek5jg1dg1nl25r60qyx7p7luy4phmr94610ieaef55crsjieif2yt335gosibpu3ls0im6j56xiugoyna5quewi6sol3ii5106zo4sjuh8rlzjkc705230paucpq2xc18lvct8njpryvpxy594hr4otjbkpcmuk6vwfcpl359vyu844at8gyncz9fw5cxbm032j2ruyjmzbfge66woozgg8irw5xeslus345f9bqwr36oy5yh12kjr9hjf9d7mltyh2pvq8dwvsl609gez8mzndv7ebm9pkwhkiomem2f0dujw7tbkxpwk8duyfa0tzeh3i0wj6rfh7xk55z2ldcd4pw2ucv012p7trouhl98dxa7kcangozbs4203sxzzrxrig0rs0o6hhk9uo3kehkcpqbjilnvbcl24fhwm235q9mw7yspjpr0y9rankgy1e6x4myajtwf70885cfkluudsiddbbdjzb',
                expiredAccessToken: 3436038969,
                expiredRefreshToken: 9749564560,
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
                id: '393943d2-20fe-48ea-a94d-4b942e14b2c0',
                grantType: 'CLIENT_CREDENTIALS',
                name: '6tvohfdzswo1oa5e2d7vbbwkff7ndezgo0kxvfft3q60f6z7anotuz4ov3ml9r5mo6l4e1huvuudtl5bguexer5519q0mbxx22uqk4jtlp5t0lbpmvmhbw6y85rmegnl0vlzkziqmkn4g9q9b3ze48zgjxnrtntdtd1tvr6gwby8iydpx5fh65nzqblsn8s0yfu7w3auyqaspjzmldr1kd2gk2x6czm0qfyvni2mjcaozldpfd9xc79q51jt6ay',
                secret: 'f4dgn30p8kiye7ee2l1l64rg9lsgvqwu6arvv42pmjc1ywk0gyz15nj6xmahx77uv02i8dxkbnsc6eh9dvurjcgjkd',
                authUrl: 'avb2uenlqzb5woorxxg7xmu0rmjdqmwg265gamwfbwqpna2agqfcoumn1sn9mhrse4ayq04di2919u89fp40a9p76qhw7xz4bbos221inldttmyhlxrto4ywmuujy20gryz0mpe697f6i3wlf4bqf5d41hse6mset8tspf79ndvmq1y6n5b9rnie2k6hutvsddpsnlmc44zdoaldzzhv93lplg868qx2g088yntpansslsx78yuw6eokqmttf1auva98i6xgoymk37bvlmhxo113xwv8lh57jdwo0v5f8k68muz2g8lwbl40jwfw2fqneem99xs78qhxerx6szwip6fw704pdaaq8585mutiisodunyil121o0uh8d0bccj5oh8t467or378isryt8tgg5wp7w7w67tyxho34t2jo4w7d28b4cztehn98eaok7ptllrzmy650n96dpa7wvi6tt95zhyunkozddh28gyqcg8um6ig915qhey0vxbqkhzub35vmfppm2dmwymry49l48lzsrrxihr8lipgk4kz73qj0cqkq2rapg0v1t5u6amg945hn4ipzgyiefo0dzkirll1mjbrwx3pyw97sbn25grqhmebs6biyjansqpjodzk9o5aujwyktruzis5qmgw3pc0ljhx6f5vsrvs169zp23dl346np7118sa8x7y8j5h2f990x2kpyk83d40a0zwkohn836jh2c9qw4ozc4qv511ap68vmzqo9c8zvtixmwexsqucnk384136261sag5s9imqriu7ah0bz4kl1e2h77jpkrqyffokgh8l15qgkg5a1m8s31zlvyproqs22e78ib2w3etcfgm9wpd4uo1rjjuwr0tfyv4xvzx98db3a63z236x1j6tq84uagk92a6t4em1mkxav6tz2g8llayqajmrzc7w4gdqii7bzgot3gyakoeb06xnzyh1a1wf85vfemka4ylc4hdiea78de58q1d6zrwfqupcz6asd7w8vl6d17md9wegl49un8wqxuvravuzaxa7mzyp0axdmjefisd31dnb5qjxmc4k63qygx941a181aa8pbm5ysuq02iy5jqmiryse7lhupfs4x5jfqvm4r476mlvymzm242slfq3yh77zk2h1ai3me8sdgf235gl1908ktsz34zzln4eg2dnu94tmp9yqxnxwilo3yhexkewcsrdcrn3zb221duejywxnas9ijfdvwgc517wcojj8qw3om4kqi093y3m57ftwji6utttsccn9qpfqnzhwl0kl0wdya8frpa5qqadi2ouxbdd71xzgthworo8u1g63nakfpqama3kibi9sxgtckw8ew1dh3kgxwqwb7b39vx7o8nmo6pyf7e4de7issvmyxe544i6wfcy2qkba48g8pxr115jcnk0nzp15wnn08mvsoll0fx4k76oeybo17jqtf0wi8qkjsfp8kptaoa9pd2uckzicsum3efq205qzt0oxjjdvhbaerdb35a2rlf39vz7lva43v84btyfj6prp51p8hdt9if4zdfkroioca28udvo1qj2pze308f0bcj1kw8is396b8lv3txd69cph1rrmiamonh32umakt5rwbk4u0c3irl40311lpasyzsu99ezhlcs2eboxvyeetv2d5nqi6dumga46w1rxe2y2fgpfhk83lu4pk81kqi2kcqoozgb3j8bxn9i1adltler7997sa61d401g0a9kdqtif54dmawjl82uuoxiqq2nijzf2kvu62pflldwytihgta9hx4k5mfhl95peahauh4j82b0lyibh50pp3avq12b380w9bjo7kk0vqlcm7umkwxtcmdq37xcbi1j2lx3kiia8j1l516pxwlavfaonw5wsjhvuozg3sy6je8t5tqmhpbjiuzs8sa3261hyfpl9xzjtt1trsvb913o04jfm10r5fmlrkyxhr96z7h2hbs4juf4ug01za2w2of37fjueyl7hr2tmanogihtp38hm4t6q9',
                redirect: 'weicg6ysy32n4c1doqpqwkfu81sf3ptnk9lj8oi2j9bjzuvtyzr8ay5grwojalefkf9gmuf32977u913vkaxooqyqt184x2mil26l8zdcq5845wzil8khc3fuavto1afv2n8807xqnd8ffrxskbqp64b2fjwet1b89msc3474kbsixw4h4gjntndbdkm45zi8d6hf6sapu6a91sc184k5ao6ytpubxxhllltdw4o3hq4ltnfecupvtezu63wgjx9x5ujdmfbaitocd9w7pnsvhv9g7asyi8wsywnd78k1h8xa2adpmnlx86180u12nulmr2dtuo2hdtb7wvpd3g0dgd0g3n641t9qosbf7hoygjzynynhmwtw3cinhg7c1nrkh9wczm1xhr9ck3iaiar1di8bprr88u8s1juqsa0r25ow0d4mrx1ffvbchahcwxjru2k7txpv7gk2sp22xnto0zl0545kcaas91wwncix7v0ubbod36nk9wyerxmbz79mlon596774y2raipnxcar7nkoidx5h8n3ce33y671rkqc4ue9pf1mxbf36n52ayeqb9vojidqjdb492uawdf1g6sju78xx3xjetoevsz1c8yhr63vlj675k6f2h4qe1y9owmd1fcwze1yysi9yeuu69fkfqy4nol6svoy4kyjaivsaq7brv048gfnhax9pfjjvloi3vt5yuqp6zziazsmyh5skzcdnmhsyy6q1sigk7xi37mur3s5078yzooz4itbo4yodvudp83led63bltwbqmyfdyynfaeilb9os380pmzva92y895ebqukxjr8xyec4prvxhmtvshzouqrvmu5upmb3udjuuq8tjfdmgpinscegm3r94upnx24xvkbzi3emm3yw5nxze1446vro3a8sk1uauzr0xvqc2ro8g59i50p3kzqiohlveuxi9icxtsu1eaxdrb9navf9b0w9f0791fk3t1earwj1bbkq050q2urby7qwq3ewmz0a1c0xi0j45m70ep152mu0ftd7frzw19os6zchcc8pspor0ayx9efm66xyl2fynpolklqr66gp0n8a6vz6v37nah9g6vnxqi6rj1bbl41ku85smb0iczna6tmfw0md7hr1u43yhyf01u72o0dkxw6hi8l7uiyj0p687uvx485uqjx1jbrzv5d8fzsxnck902fa7adpbou6luqzysa8twn3s9f39q58dzz21w4hixxsoemohn3ypo9mc510m7qklqtpx42u7zb9dovpyy0myqv2vbz6mldeysq517pi1ai9lmiffjx6oy4o1pcyvvhkuyuzm4aoggedyuhuhwm6s4q0hbdfnd7okulpvcjbikv1n4pxxa2k0qk1h27v3aqjhj5dt7t75idj5xlvtvohnq68ky1a0j06rk2wf41nt9fjwjegvkfd6zlk976xxikcnsyqyhpibyn0ebht5aanriesdzearvj3uxl1eria0z9m87o7q7nuwlhpgchi3xtmoana3uf18q10jt55ei37no0geqzin73onfsvjndwesl4uv3f4dxovqqcwxqah42dyrtige45vehbgedt1a9fmhrwiqem6cdcwk113yfvv4rvi9wa6uchjpug644dfkozsgzq9ujhcf5goyf869buyav1veau2uz1yujmenr7ra8xcaae66ep0y68bsbktq2uk8h27xeindghnexdmppce18bspf1cuw0338tro002aqm235gn7cslyy0qdwz2i7uz8y1uq5g06oh66zbij30v9v2feqfyv0obo3factkxvpyks7fcogl34xkiv51lmrvj4iqzwheels6b1ilsj0gngcvxpytlru2vnhgoeyo2a7mzmiox54zmf9zlwk1p2lrho0hc2roabzkz913o7643z4m1ijcyfa43c3u128kp1nstks7d8grsf64p92ar5widjuausfjn4jxsx14xo40qo601sh8gvj0of4ncqiplc4b40cvyf3iz0owh6v1gx0v6dpe7wi92',
                expiredAccessToken: 9157265443,
                expiredRefreshToken: 5195600670,
                isRevoked: true,
                
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
                id: 'drmlp3kj1561gdj4tr7p21vawazso7yfjsa9n',
                grantType: 'CLIENT_CREDENTIALS',
                name: '1i0cpefg60xrfrnbn4anpljdi43tadrftv6cv4qxadvd3u9s98r6czbmlg2hy76kuh8tasi3r974jqpq7tejf27i5vfv0cswalcv69plutqvnm7pa1bwylokv0rgw6pydb2713uy052tcg9dpsdd0au129vlp8c7rbr3dvkcfzlbmx39q1uyeomgbo6gf7ucxf31dmbinnl100jjvw6mt2idyfpf7s4nkr7x72v9z6vts8ymno42rjqv5nljlt6',
                secret: 'i0afgrmdj37j1nmtnilx89i5f8srj26neg47dso4hc58y0qd7ijsis6vn9mgkmhmbn02rxk9tb7bguqki5ixkhviup',
                authUrl: '7lwyldn4o6rbsd4yomxr1qop1ke8kiwjqiqmhe9m9t100n9qnjphisgzs90t17t7vj6ps888rpxz91wul9cges2q7e9fbo7280x5b82cul4r7beum9fatyd8ya167ljexhtdam0i2lm1pzp37y1yce3p32dgs99yctd72ifv7kwz8g6nmklnlh7b68whe7qeytntl0uf4kps1mn8oq6dsdywlu1q0oq1j8j1zgvjajgmpblg63k0a9qdedu15pumtkugoqzilkjluvc2i72stmj1j78sk0lsbfw5a70n9jzxefc25h08j7icy6owuvb7gq6hgwh4q5p3xy7fkg1f1e9wf14ntmucegr9zlmlre9j7k6zlib5ib9y1g2l0rspzu8cr98q2t4irn2wi9bp7yfli3d3rgvm3w1nmrryqamwmks81za2its7u9axhb39dcfj7jw96001ro0tlsldmz6ecdrqx4v9hzr1orj9lhhpt2ibgv63wg8vy1g8pkwapssb5hfcshzxsfvaiftco98pucp46xup1qay7b5xwhbx6a1hoqeu71ql2z2kw3vfpyzv0l49bt3ubvkjvb8kbabnkrud19298el1jwtrfc0fnfpso0q38c86wgv83ujjgdz8o11i3nk7zvsdp1m886lm07prfcfdr4511elaurh8l691b1obfkevsglkxhcxu16ihm5eyadm107r487op3ztt752m0rn7pcaf0fit3j0lehm9ybpzfyxbq1dom8ymc00z8zw5ulmsokoack1mztvl892kse8p3w6g8biubo3rqkz4v2ezbiaop3dpcc6x983p504hfe6n31zgv1j1tv2ru2j483e6ufrfc9p2fac3pdllxjpm55e2zyey1o9t30dtvumt1o9wlgb9n0djasorag6h438rutcdgzpsltbcewojfve0nn10nxau5taphipg5mth2oc5zuad92u75a0ueb8vjmxt9g96ap4ul8xuk7c53rn9j81ja3fupn1fw92du9o7fh5t6uehto1dgmz8nxhpmloamvu4964xhwhi2hpi5cwar1rekpf4hsbytvt14gtivmckc8sk2pjp9othks2cbmema8ukboqi2ae3nlvsi0zvp748zse8tzryks048rrmofh7g76llushqs1y93fst15zzdryh4xuzr0a7ja8mv5f2oxxnverzjju369ljhbuafll9sdm11nbwwx0x2x4557lf8pvcj3hrlevu5t9xz0blfl75uh440dy7vf5xsx1g33e9np91477pzbjj8er52yhjcn4lcj3w0nykv6uveampqw62fyhgjywj69uxsk4ntqqrhi9qgpjh9spszur5n1iaj40hg7arjjr3jkyq6m9a7n0sdez2s19v0v4abktr9hynyyto7ofcy1a99r51bmhzr2vc7w5e6jj2vpakkl1nqffnwx9pgxjon0j5a7wlmfoe520ekpag2xr0iutxn9bn50pds354s6aq0ap3ypugd5wnqp3sl9d3spuz0xnep93sh5opfgmjfz8e87aq7nx27kua2drvzr8jymeli482qwv3n18lr6lu8bnvlk4yhcdnclwrt2ai42d4nsj1v71n7aywmqqo3epm398v9toer0njwyrlm01jwi8varnn6t8lnhb200t840v5a13lpnxh16stp3bbfkmsf1fqbcg6p600t0972wu46j8qkb0zrp1porgcrwomd8zrekzdnze7faplv26y7q5dmsws073ljyf6p22w22rvkocfvzj69xecexrh2j49irijbr07pc4wy3og042lgw1wscuqv63e8vd0ghckbgx2ttip4l5gr8w32gl7x2euumoir73z08lbdkocbvf5m82fu5xyv98wla5k75matbzcqedksoys8lblh975ikf0gytglkj2by3jo1nt0qa7o844yiktbyhgvnx6syq1wi96m7urhbuerzm1zbxw5a48jjtlwxci7ab9oinkanyueag0ed5ylihm6xwila7pjy',
                redirect: 'ohb061c0mw673sl5iaq7f3ouklpqt78k6fo1yrdogi2iwnp4d22mmqbb81z63zichdii86fyh4oeq0i1rk7fzhflsulzf21qttx2sbcxw81l5l9cwype1oubf68dmaln2ytzk3v40zevy69byxh99m0zdgkq7eh103jfhjhjlm8gzh89dobqey5sy8h7itmwsbpok14h7y1y5mo60hvkehuhlxvnxebsnlsg2xsb27nlkk37hn1add0arqgfu5v80cxyr7v388501iv2qadj4ms04zsce0fe5k9boen812510cnvm9d0kvp5prlxuv1qipsfg05kycmy9w1ms79hn8zi85g66eql7hhwtmulsfxnj2p0845t6k9nx2buu67045j0z3nv877vfqhuxxq5mff1yvecxahmifnsccrtvdx5drcqxyzb3dgt2p9tssr801cab559pi4ww5doso1o1zq6a3kbj9b6ihdejoqik4e0jjb49knn1gv9sldejvrk4fn3t8bwjkpjl3p6tyis28vmzcsbi77xigqgyq2weo6vh8bnr3z6qxncbjlhx7abb5cjoex85qtzgribkk8j4bhcf20pnae8mpsrth7ae8jk2ungoqj8k6k1vp2hthfyn1s7sn8vl7wvlyqvp1axgeyndlq9vxrqthmhjj0lu7ka19kljr3v35j1hbrxanryac51uw70qey6xpdh6zt3vxwggt0ha27ljaaa0t6eccy9jgixz7ji4xtcorvajnrg7wyhjo2mu3s4lh9y2ltqltnov1lwcdzprghqrpy7642q9x13brxzxpakdhwkiwkrp5lcwut5hw8g4acc9tgkksvnnqhjvrys1psd11mor06ww8jsjhqrd4y5cmxuqhds70dei9sl7s978gmdokceaygv8yq6jueizc3vnv37smzhjwh9m2hv99t6z9txua0dpw9xwltnxlwxefj2qtzpg0klvk3scfiull5t4sjsc2yf6k252e5nveshh044p9hooz1tpb530pu7381c8yhvb01bgwo8drb3qm8gamybp5zjyd68baebd96wduvb70f76w1e4o860bikjpgfeu136ztbd1ast4llpabrc76jy1by7bbll460chp7dpp76irsc0afxtym503oaq2j5mwzsxokiysb47oxznaj32upullva7zr29yype7h34rmh4uwyymwvl3xyeiwspeu5iryctighfw90i1xr97ro7w01s9dv3d72znpynufsko7nutkpfdojfxgkpc3nx7d6tvqz8n1sya74leqfui52h5jyzh099gaxhtgcw256r1053zaor2xynlp31r245sb0vgnql3acuht9n0eniuioba3lu5i4pnahkf6oemueovjnxgjxy2tlzmgxm2ltt2c1erm6etal16dnepnxts9zeoml6jiuyvayl2pt5lkf1rf5ytkyenal0egbvtm5tbq949yb1qxpqd9ety0v0qfwvm2mw7z0i9otmul86yjbr8u5k9qwrqwczog44s02zj04k28cndej8bb0f6kt1s19kjo44ncro6q9pvv5nykkv4xczg3fh0o9oo07gwetw6myqa2gt6y9p04lqcokc84nqcw8ib1a21hcq5wgb3w75nq297ilh9fuo1ijy9yun0bbhm0e7susv12kda0snoiti2gckf5smncfhrfc806x31448p5311ijf9qywlmd5o41hivdx26pt25hiavmgg7xjbfgf6t70dqrlu9bad51wpwn5jmayv3cp8ljmhf1el7ow9v1vxdc8vj7kzowwb07leetxy32fxxipzex4jbt8b263f0sdl6lnp1fdgish4xxvwbkkgrkgxwjjwoz5k9naihatkuzd3cgilyt4rlcpac6q2hhejanzentp5jh8yb6y7wzvgbl35g1afej4cwsv9znfiucn8ivsubxoxmtu9civds0457nw02d36rjs8c4b7mhuf8443wt7m1tvnmxcptzild8mmcoakthtkr8aang6ua',
                expiredAccessToken: 7907753829,
                expiredRefreshToken: 4943762243,
                isRevoked: false,
                isMaster: false,
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
                id: '393943d2-20fe-48ea-a94d-4b942e14b2c0',
                grantType: 'PASSWORD',
                name: 'v77xz9nclfeuopveeygcpfghb3inmx3c5twpjw1sgywkoqc6ul1eojgjvw248xprifkonex41ayfz5um8bmvxqh35y9qjj9uyvhts8bly0m881x84shhd310vvwgd47g31ncgb77e2fmy632k0ghltsiihonvvr4jhbx0mc0p6hjrxlud9n4dsfe8uelvs7cszbqqcvvinwsmbol1fur71me0srifxen9510adeygvnu766bgbq6lau3leeoys7p',
                secret: 'psyoroy2c605usd500xl2ymlfkqepr60y950vubifkv4tdc9kqivxpk9dwgufex2tawm1wiojqs2mmhzk4r9qn18yk',
                authUrl: 'vog847lqvffl6e9x9g21aepvblm0wx3p7mhs39nikli4npyxquq66rqmaja3efchlr0thj6em12e1fdu40k4j92muvp0s9yelyr71rlum35e13j6gkzeq94wnrukj72rrhgnw7c6evrek8n0u49twbap8pwdczakcla74vvuv1g86ihhuk7e5hbs5641ndl1d620wwytelk25krfxc633i109vcw5w95251d2sysb8scmsqwubhlerhhkapt6eledhg86amq81tvua5jrq910k6azenta0ix0qxlfpq2nde3iffgmko4d23y2hi2nyv2lr2d69lblay74fyyf2vsabgxw75zxp8gsg00dgvu4vzdsyulpp9dzt6y5cxueoi0j886he73ziu099iuzid2xwl19l1y2vq8bydm72ce8puwy42tvzi4se30fjpuey664z7sm2td43zsbs72njp27hg4vddjfzn0w77j0n63n071ipjspq4pdla40l64d4gnx9g9ibl8lnjdqhf9h9pbaia9wbr8xrcppnzfb88w9dlmxjfz1tf6hhsvts5rhyenqn4xngec5bgjkibxzlui626dnwngc35wldl4dfcrjogyz5xydnz8664u7eb0zvf59sy2s1ce1ut54l7gg9pateu9w9yl8otyn2d6fx3ccg4gi8ijq0sw5c4czci2wq5kl41z7jbwcbt56mwftf11hk08rtwieiixx0wwr5j6xemsu9z38znx8mkzdwj6288jz9ppk31wrd4hp01a5v7wyg6ohdakwx25pkitx8hstr9pvuys4y14ys5ru8qw3sinld3xadru9w905xx0olvgx0koonfbixjkvhb7cq4armzmmiv4u40xb2tqw5ybzisngjbxrb9etknmrpyj41v3xue3qctwwvkhqeirym8ki0m9m06a3tlqgdqjxevtqsbx43dp11d0hxj8501mxdvtxaob30h0hcopqs9mad1704x026eiwhkh7f872yondo4sz77k9zz0jzt28l3ttw8aj7pjjmslypfyh7dcifdb246dp83l2p9effu2c6mfvnxifq2q49rlfyfzu8s2qvwy7c4et5w1smc2217l3y6imhil3t4knuvnd2i7bqe5r9ul279kpbpfjdwzasl515b7ydw0p8pyear7gwh4tezgklyvmlgnw3cdngyaek63c93ga8u6h1ifhwq23ufxhwmwb9lf6k0p9hsmpmtv1v81y2ad2vmgtj0wcl83162qaerns9sr7k79dvf97a3yvp1bi1miyd4m1653xn95hl1gq1dfbngh4qgyzwn2d4fceofu899ktk8m20np1r824erk8t7m96t0r28s95639yk32egs2b88bac328yqnqr72y4lorrxlxqpk2jl5t67pu8aicxhmulo7yx6neldj6sdgotiuhnp6pzp02jc6rkvgssillmso8od7jquqz7kiasng47ci7whiqnifpmhn0g0finvnpzhmv6w92aky1pmlc171yxhfhi6hvna4uu9jd7hpb66asoflml4d5brhbt53mbkfs4hvuds7s6kgsqkms2b3bysoh89f5udxr6ltnpbxyh233xkarc535r76dcd8h2tc5yya6t27c7cc0id6uhfisavxopo3k04lqs9v0br1dwc4tlyljaxkh44dqav3i4n2pflp9p91bohic36dhntigt8rn2s1bartlzje3qek5jfj6rzsvj2r1xinwomfzt8hzornyno97p6fmyydys5xwrc9mwtndy6jku97e2udk65cd5wbgpaz56rjjo61lt1xpd4tvlcarxj58ea57du8xn7k0guc666asxb4ro9cvc49pst2hizeu096yuc83p5q4eztz45tp6da537eju84iu41qzqwyu2rqyzb6rq3efdnpudhhxzm8b9eb18eo3n9eanq36zpcdbjdmd2pfsbq9gffzonmbqrkinb17mhcxlt59m7yqwybpnnt54p9a1usueewim79osw5crgs64',
                redirect: '3b7sr2szc3lqn61y10v08p60wxn4wk1gkbyy1nj9hfj9qsbhulfqo2910ztomn8jdfra3txwgjyz6z08v4iozxczs91osl4xybukdcm1pynzv4ilsjxpd0szftyp44g8j3jts2fnlzet64zz1p93dxugocwf9k6luvaymvebxhxhz43vid1n3v5gzim5v215mfc01gji9e5csa5axlcwh8c7fcxsw8rkei2asqtbafgx2hpcewshbx72mokl8iw9o7d5jxuzxqgnp7gkl637594py1h3l9wrl5qcy7j0zhsc7vix52fiu2kzxg62bkqyr1zq9meukwujwb91d77lf2vmjr4jvvyfrjj6tlxniavalxeeg0wo3d98t2ggfcx9mzt0zdjbibtxz7ffadamjtrnle95carc5yuaxaqxfv41y5uwgb8mhf1rd1qmobb3wdy4ksxmbdl3l8g0l5jwd8zlgoq4w6uzioozhk2g8648umtiim1xowoqkoi4crd5f1tcozkb90na9afa9f1fbbukdwq2yaxy9bvgqr2u8c96k2a3dksjw1lbivji9xiukoq5b5hhw2lrgd3rgw3qs4enkgg8vbwtaehox0bkumv8ce8du8dfgk6988cw2lbo8sfie9ts5pg5otoy8eo7tgvmic8oghpua9hwruzbns4bxsd89rkixi6jvhc60ljgk2r19jzaisfx2qhdulfsw25bwetkpb558m2bq97yuixkz0xp1lypxtoe1op06hoe64k8x5m6bw8l471hoyzom7mr2rs2zpdm4xqmfsw1v0tagt5ifxzbj394e4u9fnz9tsx2euqnsznrtnfdb6jcnqzi2lf0yno2mt286857m0h7kmmhihu166wi41h8v33x6y9n1hgeedlxcv8jua37ltc97mpl7c7zaqn75wrcz10jwcxfsfbcicnl5ti3ljg0r28l78kwpvit6e2fg17n4567q5axxy1bk3vgx4dyggmuqlr6s4giwuq3vzc6107sdofr2jpexgl0t08ig3jnxb3suuph7ek6spbj8qi465sk768adj9ywx7a48p9uwcm4d6xvpu6r8qijbtpia5wf2pna6i6rq1lak5qh63zzn4up096og5aha1aruorfzvorrurfpdrjjac2u5m1wnntyq3wd49xktt7pmphl31chwp1o7n98bhpz4mrf4nlavbnvr09ccxt59b6dzp7v5hbxt18l5o8ktldk2ywt6tsp4ct8icbfiacdp3b6j4aylg90zljqybyrm64n1iibr3eciy0c22bioii2aracshfq0uby25m3aylo640ti7f9qwxah345q5lhzgfx089r09x9k9pmv0nrhvvcfom1g4znp8m95hz9g3abpdakbidna9ct6otwv00lclbs7p83r0mwm7ech1i5k3u4ldo18uak0hcg5jm6t23hbdipt77hd7f4f0x1qivrx7eifnsvwfbaj0i7x0jqg32rb3lh8id0g98f43t23unwxw00bxufa86djkm23c91nour9c8sxpahhw616fz4jsyjcqm3w1aapydn8p4bt70jkijxej21jnhizqgp87b2j96gvz6b467p1g8kcfcw6g9rx3dy5apo2dcjssaadf2meokx2lqv7tn5mepdp8t9rtk6niksbnjgj2iu5fwuonm3jyelko8f90b8pba745bwlw8wpvqbtalu9gf0sbbq4j2wlboerdgkmeccabnhhj20p3ugdfksr1d5ui7mt75kcg3nqtbkcijfw42f2v38ws3286vl4mnxqfa3oaxsmp2h0gyw7ngdwel12l6fmhcy2wokqdm6nlt651vle9dtxw4v5dqb9ymv2y6e70nicrs98xmrhxp1emcl8jq45vesqy8g2anz76jk8hr5ctz8nppgwksmp680g58e0nsddjydw64cxka8vbf3ty5aetuu7w2a63s4brkycs85rx53kb4218nycvl4utmwhy3cx1w7snlnsexorj46mfd5pjur2zxcfpj7pg',
                expiredAccessToken: 7957280920,
                expiredRefreshToken: 9080520864,
                isRevoked: true,
                isMaster: false,
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
                id: '393943d2-20fe-48ea-a94d-4b942e14b2c0',
                grantType: 'AUTHORIZATION_CODE',
                name: '0eeaa6rorosda8s6geab4eu3xkrub6eqq4vzwogmtpn4i7v3kaxxgfqlc6tzdxpoy8qiwk7howdvapal22mvjfawb4ogr88qtymfrienmpay29yzvlin8ty3uk7tdjes5bd47c3ke4uqvxdgmvtref44hsajmuw8od0m4uk5ff2s46injtji3bjshumzrdyf0dl2ufc0udr1kjqdqodlsmkgczybehx3cmlaml0fe7hvdea4mlgf5oi2c7u359s',
                secret: '2zbc66ac6a9g4w6ejnnf5hy6iee1qh63haehozebdg8y0kb9xp5uapniifzbahp2arq6shuid64939yqhga8l6oa1fc',
                authUrl: '8ki7gksyswdea7xdy7lqe92myn0va0k182wtsnqy362l40wo6wdx19bro4pdpcnrkqp0nhk2d5qke9mg8tfwmbilg41jc13gitinj6w5uk30zvsfrgj2fxo721kblfn7bbu73w3inoeld140xxcoxuv88mzexryt3s3c68f04ewarhg5ucyduiupb1qacsb0ahxt8kptecouv8k07tfjobxo4cgrk97ktk8t1sve2s2mfm4f0lcz8vpsxiv1lzwyjwrt6yjz7mkfg1g7pzsv5nsrm0mxzdnpn536pczaftbzkvshmuef6287xhmm0lfvqeevg5qcev0ak8mou0u2imi0lwrrqzht7ct5i2nesjowgv31e5ref267qeld5drhai1ygx6i40g395tluyn8gthdtm10currpthbolr3zng13ih2cwdtce6qm3rwy2byck526050djyiyrz248jhiu43cm3twkgx1boci74hob5dsjmehiyh53wu7k4a86ps1k3x9rv0gfzpirwq1vvc26vclxyap2yiw0cobrhfxbj4kdlyfq2hgq40x46iv6co2er4hf40i3zagh6qp506z3ej9mc21oumpwdap4mfznbbbt440rkmmmrj6i838g7rtk20wzy3lqrwkzgdv254a7o7d2jy7ko5twdssbuekx48g9zuae2lwocd990j2qcq0dn4znqccdp5u8u069djj0jwxhxrh61z1sv5f5g1aps9b3m0tnvuogob1svg59xv9sk0erpv4z4q30gekhucivl5htb8ixyxjlb1ahewxc6ld7fppv1kkq7wg3p9buwgmj5kmdjrbwrc7pun3eippe4okbkrnyns87fofs85mviszpotul5apvm5yv1qtidkdmcww9nb3ji8m25rgbqm6gwsk4zpyy6s1molr5acuzyp2ux6r6yachrnwcx5pnzid8dxortsrucn0ziqv65niaw7fsqla8iza9ioti03ptj1o0myfpgpqxql0cjnyx0qrx5ry9dtrf94bti0lpe1qo5s35wa9lr5shsglf9kcfk94qzrynd04704exerqltgvhucsmizki5b50y6zn9yqh284muc9bkjvgpelv6va7sx2hnc5zno4v8aai3czmub23i67jfskceip507darwsgguwsnrr82i901ts2miir01zp6shqo8vqhscl8c1xff6nt0w8m5n6ct6yir9i6w48f2uab5aijq2apamdzbpya4oy36fxgatnn0nsdxf8t32v60y35ikt048shq44r29hmkx1j866vj8nd3tjf147rtcydsyw4l118p6krxw10vs01i03e4qmft4o5dkh6m1jdt2zlcqekm9pm5kpdzq1eyy6a8smo4db9ompzti1j30sn992vkb71vuvcuadl1h87tw8o9xz3k16q2mgrz70iulgz5dc9fmma5zlsvi5vapg3nn3228ccithlqqy8hg7puhoq9p801oxg616zf6c0gxz49kw48hncd6vdaj2cxxipuj0ixqhtuc8ki3n5ndhgg2nn8efq1w4833x42rade4o5ih5f1w38bf8rjcbqlrj5q63xap693chbegdofxb9fa2f1d09dbhfsxi1avh8glfx55cyjm7en9iso16914zkmkjzgzadq4h5xgk4qa8po9f2xcbcxiedb8pk3fulwcwtsydcfq7wr5qpnnt09ck5ha2zful1kfwbed81smjvlzr69u2qdfiz5pvxzd5x7kmk23875jn88ujhyfyl5ixpdztxfdxk7xace5euvx3dbkv4tm5kq05lb0032zv1cy1lq14u993w295ixmvrzghseapn0855uizyp98uz7rs9y8bhj6b46or891fwgvi8hprmbsb5u5t13faeyit0maddwedf4degimltukpkl2fmtbptbmllcs1zle8wp1d7yzkye9pjfl6mxjshtxy2eqvsfkb50vdn54i262abdburw6yh8d9v4vqmxug3uxcxr01kpwnahb3lptmd2dew',
                redirect: 'szthtd2cxeg8xu0o030vwi314snamoqnz4az7mmsk8zwtrielo95j9kne9lk9xxbzu3t3xtodyqcyh5mtx6nd7lteukwr9e4yjkzkjqag1blypn6m67rpfxeakjbe8xxx5gvkyxkadpd66ra06eoy7o6t94lab3sr6mb07q4npdvwsneq32vott4lll87nydh09fdetaq1lhnh93n8ws17v4sb8c5nh7zzswv9tqttt22vj5c87j503ana69g7os7qqh3u1r71eh466xo2xodp35d4ltq61ei1g87gbmwgfzq5zj1imoin7czhi7x15gid2xbya7ljwqadxpqo7scd4vi52nudb6120zn9563b3bks2hcmgpoz11p8m1b7cdfwdndodb3lwvow5apl6jm0zx2ig9481mwrc8xo1bvnfz06a6guazpuaixrla07wung6mcctdgdq9plj0n3jcv42nfexesmnrbtrg5xegm8rjwk5g72d1qtrpqm823j58tgazsgo1mihmlqd58ceo6w194npojlhoyb5sdhs1g2f8ysz0c5zq7smogqy5c6uhifa7zjm8z3wfeh0l4ugod590dwhpyq0p4nhlfkkedukdm8h44l20gti5e4xqqcw5odza506srgfucbfk7wuhgyrvaye5cpkx19r6g4po2aumnbfqli8k4mwa3vpd3zkt6y3r589kbw86uzlg7i0s3y650j75zqf2sj3nueumhe9e5524pq1uu4zv4mlty7le4vz09zaju111v7b6qiieqkklqrlfpo0nikm8fxyx1h3v0rpiad3i4bsd641uowel2ad5vzicq5z5b4mw3vjtdwx84rkwx2gk3jzlgz653aukogobgqrgp0yai3of1qykgebokbj2ktkgnloemd2p9tn3nj3t0n2hwzk2prmktu3rpxq2p14vw4oqp5fu2y0l2g9vjevr1uoca8ydkvdkyyfah47po9p4ble91vd8t3sdwr1lktsm4p1x6usoisuvcbe2dfqzid48utixnzxke0vu301sw4a2lli0zw73ao47sdwzzfdyy21pbrfv5syw0gsq8fgoixnugaf0nm9pdyelksgnso7nzr8a74ei9yfbxnv21ojlks32yqzgux7b86gggs5wn1fe0hdi1y5nv05702gammg6f83ulnma99bvrrwe1gus4zn9zo4lrmiw3vbwx4gi7i0gz4u2dfm2qk9giydm5v3f4wojoopq09yp0pu548ira409c6rat97xwwshp14mlzlvx0vk6bcko2iintpunb2h869moxp98s5ofgqs3otvi62q9kftv9xlsem79zmt04bvrm4f5kx09y5gudimuyy98asfwcq8ufq7js0nj7poc9x95wrfym2g8budx891xegcx78lssd0v5cybk6lps3hvrhv18e25hi6tpvlj8db8yci94i594rt2uitsli6yz4rnj47cx6nel93etmiabfz8mw9b0rdypqatq8xkova5aicwqr93bjbwda4epekyoi7z1kvhexh4l40r4f9eebgej32fz8xpomk6xczlzgw43x3rd2n9kp84rpz75ys0hrsmgt6cn7ee4zlnaf9llx9kmuirsss4ldkvnx8ua9tvhs54h3eg8beeg25m7wrjjmuxhyovq4ykq6rfvvgqmuaty3j653i0ppwi7dkp5cvb2qajvrur33f9wuod880btke5dqxqfupe2agd7rfxw5npa97x60as3doc362asl180i1sdo46ijbyf73nek1gjvkqqkqhdqy9k1mhj49i6waxzoyv2s0smtb3d4n4277g1xg6akqaznhzt20tf1yl7pu5o5qekow4wm5u07sng7jbc3q6rlav9uo08mulzgwxydu4v2i7zqq8ztw9aop3xkwti40fj11von1tc6o18ldy1479otznvq9ve3mfy3rtpl48ken4qesjdh4uly0opxp25brqr2gok1fk3a1pl2j6n1y7hcbbef2w96mz95qh82mhi60u3fq',
                expiredAccessToken: 2921568191,
                expiredRefreshToken: 2426941045,
                isRevoked: true,
                isMaster: false,
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
                id: '393943d2-20fe-48ea-a94d-4b942e14b2c0',
                grantType: 'PASSWORD',
                name: 'qiwjfxdbfle0fwf94elfqg9po9x8qyvnpqwqcrw7tbm60bdelms789zm81f1heyqikpnkb3wn0ypg8fc393z91mrkfr3wzxdc6spqwjaf7dtip99pj6b0luslflcm8m6m5zlj3yqv0bt65sr5aemizuyvf887d98w7u8flcbr0ujoi5gtd23aouhcr087jts931a51tml10so2uogfr7xdrv5dfqggtct0u3166xneic918ukov2izi5j89bou1',
                secret: 'wimhqjcg9f2moz6mbbt16p34nme8fsmmcowzfwbgwoq1j6vuwl69r6xy2x12utze9954p3gelx34cnn2t4lttqbxsa',
                authUrl: 'kviwwt8vm9l0numpi70rfavb50g26y3db8nph7ekkjahdyiehdc3ncumcjcmg19ue8834rixnx4s4debkgega18myh0twjihxlr55rjt9dkofrx15djve6xn6zbso3v1ezb2xpuy07v1qa96f77eiwrmk5hyje6gmsvi3ecs4l7y4bn9mntak7d7upfh8r77arq1bl17x7u5tbyy5m2dl19wr6ab01dfeitcl0dessq7yj5urovgkcgj8ubm5a8a00arsfk38kb9ie1rlnqgygqzpiw937u69c4o99j00dqcolgmptqoqqf8dfsfd6p9pvda1ca0ioxmjtunj9to49gr0mmvb0v2xb7z5yjnc1jp43jutjkncrltbhr6h7e4o3iolpq3ieron9odbgzp50wc0tbiyujekkemnxmjisloeymow4pjrvzczba9wlwji63andl8b77jh9114mqf1pqfzvzqvfb12hn8i2ij40m6bsh91rr0n7yrlglv56rso1mvry5gnzt06aeaegeti9dq4b7dr3i52tujvtwepsl0ha3i74p680h5dtjqdaw1eqjy6vc7sjp0mi8jrtnnduj8x20430v7vcwz4eguxbu1zb5bt7usmvpskm50ffh7pq5cm2qwovo5bhqflcy9ze5f8dk22ytgum6ytyzudbixs303jxtlpyfde6go5bc68tavov645boys3n92jyuaaekcnk765244xxosay1bdtqaz8jmnxgnlgs6sh6k4ny7sf6jfm4c08ya5mlr65yr17u85etenr0mu6ci1evbovg8img5n71mg7ww7gwuopfj12ofaq1t0zp4tv2bxyfcpn16j8094gc1jna4nec9yjyk8fe7d3tzcwle6veq7ol2k9m3lrnls0xbk4dgv6mrc155bp5vc3iotzmp6upz4ffamoy0kbv6hkttxxe8he7gsrfdk6jdz7ac5g0ookpx3rh1tbdq0lqhw5utazbaj3sjgbh71w7doqbcump6729ij4e07z9e9467nn1nfnsi8iev3lxnx94twuxt1ec5avxmmk657ffy9jmkqiuiobcl79kk8b54h0ai0b3wnd5hjkb881ufji8wok0il9g5ossaccp03ofqci1kpb9ukpzkx1ryov3de9fpk37nkibfcyj5ouos1amzhpyuunknqbc9wog7puzng5mrqnabkuegmfydrkoi3eoy3367vl0rzv2khfdiujs0w4v5e4eps6019n2ity4wcqj742kuluc208dudot8ai8vk9y9q3av9ukdxtir0gtbpweuxqbx8ygwxa2sswrn94fcayd23h9ypr06nsl4c1b766gjhqf9yd8y4s4bx35r2hz695lfrpbj8sakcz9s75aa98gocawpo0bcbswpfda8btxo2z2zp1g7zmx0ip9iudfwgr279hgdhm0n5b115falmvato4qy4egu77ghzf9ubqzr9itld9w4qjeoll87h0o8ylzewt8c5kyzr3khv0wyycpk4o2xq4e2epbu6tk86rl0g20dmm2bhmaacq254htedpwqc0ixnx4lcp0undxbu1m78aonr6mpsfwsai45etg7d7jtxnfb89rrkajk8yp4fie26qsvqbfxlzdazsub74ft39sic2d566g6sykrekcwo25gryr9qe9r3a5rpsa5mz4sbulovn7y65qg525e8er3i67kgmmatjg1p691vc33r89sl88n0g149rivtytio2t6fius0x7xdfng5o8xrsbz75rr0g29fqj59lmt71c457hwmyrunq28jogy0ydowx0znoruj16jxl0xz6xhubl69kzcepantbw0jg17h2sjq89jv9xk2m3z0kqfaxrnmrjpp1isk36oqfhlwzsgrqcweuyp9o9e3jb40h13ygs74icvg7foi55gyvi5ohkczltecyqvlgq7wult48gyv3sb7z44tpmeh2xbzjbtpkz2x26lk4ueah2jvxkpybj0d83ga2wje6gbpp9vz1hvac8hp5rn',
                redirect: 'i5j23270ys5jxqsgc8qzvv01zr7pnbcu85uets9ezbdzmzowvifckxcd4mdlio14ehuhlhv9061ykkbel39y6umyb1hok6jf4lvaksf0rci69a93881gxwgom7lwaknls16dghwgbl8od6sitjczzg9gu2aofq92c9xvyn5uglxy6f4vaq0et96bk4pur6qsubx75x12k01jg5iy3nxzlm449qdgiyox4kp0c4ky26ag176wxy2x6c8vi7eu5tbhgyzlqv6c7z5sa5eih1z79snxuzojn8igw7pbuzutwt5g4voiu1vlp9quh70tgm7pz4hybh54zglo24d598l2pbu76f4biq26jq3f6c12q8joxfd456isvm2jgysvhe3it5ok4l1utn9cktycanfzbmupwbfmyeh7my42vl6c0662k9ev1qes24l9sei7omzhiqiwti6de2abyf9x2ejr165hj0sbh1cweaeqijjbx1zu9bmht5zyaep90eyrpebfadv3n6h95k2bjy4a7meaqre8c272133mylrb00091yzqbnpdr3fk72o04a5pnxrbyo9wjhby9aj6s99ysrua3sngxv87sixp0te17fx9et4koexalthherb2wv81j0crtdeyhrujla6vd2p7nrijdx7nnh9jypk5oigwobfg9rvlql28tsab0gqe2nnst6ked7ow2tl4qrlaf2znfeptwfvxktlydciizionb4w60nybt88qq49hgy3rrhvvasod5lejiseu91rhq45i1qxip9y0c8f2oy1jy7lnvlfvqoh2o154ztt6rej2pcom6nckesr6uvaml3mvb1l0qeu8wj0kigqsnbyu3s0b4ey2k3j4ttgllteinv0mqnkoba5x7b9rerpbrbml5xayk00p767tqlakus7exqex20wtd0omuv1eycm40h8ol3o09t8aw9f7bus5bc47wtnlu1pk7u687880seflnqlc6aohi1iieooz1e3rszldkpf5p9559thdfyad7waczpitowvldagv371tnzic4wwz22q4panyn6k6oh4xu1qgycaeg8rvrx4d1iqid4nvopur7cpgvmoasxshwzqz7hsf9i69qskc6f5xyw57q5xzwmyo1bg2fbkwql7behrn0beak9etjnzerzrlz3q36yassldds27dcfvffrtuvkx7hzzpsuuisxpn178itovxapwie602rjlliigayje61k1g8o6u8zzlzdkyviofrsem0yxdki4q7ubvn9bcd83exo76u58zt5sjazmfdk4w71esob039gs337bttcnbkqmb22kgk4hqr3f8s7uqaxi5bjohai9mdwu025lbhmbon589t88f7cm5jk6mos7kf79it4z4lypfi1e4spssi9ei69gflw4nkp0mgi1oosjcdw1z25kgvuy8x49g042gl88i5ismv3xaicr0pi13ggu8cf9srmzhgqzwnuex4l2is42gh42it908skdbjxpvuldrlpq9me9tfoxzgt3ameg1vzf0bf3b1lzzy0dvq05lyq79htycdsnt7g71jrsqgcwaq44dyvpy4xu91xs3rg4i8bghslv34l67c5b7nf8z7r4mtxygoycetoo3hufr3dfqg4byfh1q0ep2g0099lc9plin4ayof7tgzyvaanvvt84hupzun7gjb0d28qytkdv8lu6a6d2v2fje3tmgv1xeencdymhkiwzs8lxavlj0fpjznijb56r5305rcbce8txvv4f2c8r20kxtgnaetb57mci0xgjszo0h9kz4f7gh8u2y4g4a0wo6rwau1mgmc5a118qx0ki20dr792mciuv9piuo4ud9p4ivfzrios2aftbb91mysmbeyx6icejfx531omkurzrw1hmsi4ps70b2xvizbajdqz9uk154dthoafs8gwciu3o3r28ldxogf48b8l589ct1nyxwsl0tuj3m1s2rp9q2mobusnvetdtywr4lic4m8y8vytrpskxrppvq98m9hza3',
                expiredAccessToken: 1369910013,
                expiredRefreshToken: 6501200529,
                isRevoked: false,
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
                id: '393943d2-20fe-48ea-a94d-4b942e14b2c0',
                grantType: 'AUTHORIZATION_CODE',
                name: 'ja4s20cv5fxix4nly2fgtr012y53rwme58lblsw0yzrom5ch06bjvfbkz036cyyx791sw6szi8u3jco09hgpwmg07rafmb4yjv8s5mucrg633qjolo547g82ya8k77su5ogg0e6gb6tnl7t8nfejhotzrybt6ugtvyfb7nfmxvei1e3wh42d4uz3kp58fi11uilrhbyipuavhjim40tbf62r3jw3yz7ppbnb5ubdpcimjkqodvjio8fvmi0xjxf',
                secret: 'b1quafn2qns5s85shvcbyxpzy1vihglj6jvhx5aar9ijko5cppgzqpmjfm9zif137dg1188mn7r3fcjqwrv0j4tmmy',
                authUrl: 'g6hh9g742g9iexy4hu5chwotsh4adys7rbvtegmdbop2gy6ypkfqjeedsk9veng27i4l2tlytsbaqlnpi8gzpjk52pdi3yviogo1raj1si2lcrfkccph0i7qrkalsg5ejm36o0jmsiq6rz883qjpkr7f7hgkkjoabrhjps5u1o5vzqzv4pu3t14u4t6mxa394lqfqfmxdev8tgghcoykbp16yd9rxpljbktqrfr69a99jf9m703nu1wk4xy6znqc0r3q69o5fus48qkqw1toui79xgh3rm0zp2l79z41187tjfwflqep9hl4czc8zz5erso33ge4nuiokizxp2ip4fxs9hcuz5ywcb45cikn832c2qrbw0979d7mu9abmoymw4ly3pzesf4prg80vlbt89fbqfkbtugr7912xlhqvtmny2ht4ymry6mluji4q80x7thvrurcgbrny3deygnz976s08t3w17nw7h3gvez8tcxp2yc6byyn788m6v55lqp7nq1vbp3mvl0jbdkj98ohhlk412qxvmvq94jvisi6h35rp9jqyov1z9l1mz0gb677b9le06lekvso4wqkt3cnu6pl667f7h6eytv5v1e3fw77hvbuh3pwnzr906p6xwraf99k900l51zr84yviug3ccnqh5atakym4w0v1uvte842rfd0becqxif47sh8j5bmikbuhn4l3f3iuz9ditrtvo9op5uvcxxc70sbioqqakarvqxvo1shyhk2brstykdyzn9421c6c6n9tixp3yck7hmlbparjwdcw3a2wifzk6g61nu9tllvrcyh7dic1z19fxgxew4kma9yhf2dibvo84nuyz83i8dgx6gp22alxscnewktd3i9aeq2gq58thyur0w7uhp38qg0m4kav5hdo5dvp1if056kjoisljpip99q2lgumyzu2s11k8sj6e3catyb85mq6ekc2ask2xgjn3u0gnybrqoh083dd9z80awapfg0tgdzkmmaxumgsbuqs07j2jeyqw9k4pythfsmuil3jnyne8oo705vxibyend59tthg21m889tffnju725oq0culclkxd3698lrjllkfsxdojoizfl9skatot187mlnz50sbb9f1bjfpxxv06aqf5mzbx0h5grayppfs97lwtxpunxdz0m60ncgppsy1fsng52qody6tbob4zj3nuu5zcw00p54pca31er55geeb2axza48zrva227sn1t23qcgmhpqj9bvw9jsx0pj25qqtsgpg5fe16i7lxe95py0xj91qh2ujvxtjwtgwlnjlazi9sb4xl5txuh60o1d2ztpx5r5mg8eoz800jbyellrit8nc18z2xihrcgl98rrqfsreqy7kmb8qrni8r3ri7en81ndrntqbhzamuothsk6hv8h0lon2kadtdpw3w3jfld76mlybg4u0zcdd4ktkhayiipq1x6gtwo9ee7r2ii45b9etlh5hql50j6ht5uokkr2oulssw95scq1s529mf81ma0ylc7mhkb01e06sk5mhs3ehh01wco5etod1f9e8nf5p3w7ax6ib85xief411rem2miuca5k6nnrc3seuha0730larmwfbow187bzlhtyy8xi21dyip2lo28ugsxxbqx1wqiqudh6bp7pi1s5k7hqm3dev6ttl8n2co2460bjeksk8y2srirra1uxxto7cq72s1faxtfq8f40vumy74yqxljh0bjh06s2egxjip7p9mwfhq631khqkfdl14058oj143gd4s6l2v2cghzrf4jtn9yn7c3ae7r2qu2ulopeputu3xi3oxh78nw8kk3r701whecog82l9pti190tv65adrl9e9vr03kuhtpmdsu7919x7ojs12pfh156jwbe0mb1c24tfabpfykdx6nxvy7ihpnwwz65x5yhuntgpqxl3qjg45hdgy0uwmvpn0eg1y6j7o84gl1mxg2z1sk0l63jbh9dfzng3xhlo76ioec0jbceblgxqpnpuh0xktli',
                redirect: 'fj7dhlvc73dwjz2cq4egwljrq2e3ys0n2b5upzgwo43pdlbp3zdl59ujgmschccfxe7gl2vpns2zztibxn2aaycz4g8uvla09cmejb74c9senzpg79ve9b4b7luw1fhufcpuiwskzsz56plnunh72kdldkf3l8n2wjua9waubnutatgaliztabklx6l5ylnlhqrcs850xjigiszd26izgxl0ox8cu24x9gzw6ysex0zdbzpqzi4lleyjl4nd9qf33ecuhphdh46w6dsw0hkilshtb2ez6rwmp5bpthwgytjas3ows86hoegzokrqb686sht70oqn8u4i04mmhdafzujr16wascrvvfp1z906waef0u4vs7xsial6i5b6f0o2jwmwhyc2ss6ar91rkv6463r9v32t41l11ifg8sil32vt32hz0pz139zruuvlhwxyb4sfu21men4ig6a4boax695flakl3j6n9o96du53wwezgvysluoaw1wa371ss6sq3n0wneynyqaerfmlgp9g1w3zo4a7etzjzy0jziiuku1ayri9igod1gz300km5u4s3qw4sa8i5kdb10gt9fqazmo1eermd8uxg407sgpc46hhpnxdp10aez58j4dldpmfnhvvfa5usq8achtmc49z0u6y9wuf53yzr22k3acyalqyupg564mo3bbk8qxcxojcl6ejz8dg2g6w6u9e9e1syq9zwkdx4r526e1a2llby92vxhh5mch7gwg7k77e7bk53n3w1w84yhlg8qn73upfamjvop9z0zmkp6xeb6nvegf9czc7epihph82a91u0atfgrb18jkr2d58bs7y7pctues89c0i248t7dtrqd3zzyblj19mvi7ckd5g3s697tc6npm91x8rybyj70m9yvorp819qinmcxvpavy6iuyfzy4jzaii1r86srrmlkg332i4lwy1kamq67jvvbnxs896175ij74xoa42yeecdvnv7t5hw3mmi1c5jgw9teeuesmtr3pku8sm45znbjkd131zekzm8alzxxmq2u6zjac3bm16qugtniuh7tml0mgpeon3xxdidgagg1htv7g07rypjw0lr0md7xzca5uhwctdpc5lzf8g81l4hl9014lbs3rcna8ntk67fe43lodsr1prdf3u9a52j9whmw16iu083plzbor3ztt62iqwuulfx2e17tj7emr44f5dbnsrrbj4i6lnzp4bpsn9ohueal00bh1q99kjsdrxexnbbecymxni64g4nxe9w6c0gl212kjc0rc4vrh4y30co03p7fxbmtw7pv76c8e24gq61eekiyuju45zdjyo6zxoxdd9yoblvruqy5kromap3w774g49rqw0bk2esy2jiiehqh24yi7kmb3f3n6obcjovmmf9t6aljh14juwyimmh88drja95hgjbnzw0mrmr0ksrdcueyl3frl003hlwj1igcz1vfqwvooixh4ppcqkpfesho522npka95fgjoq6udej15mbvrc4ixju68xq3s9pcic5whtx5xdnqu81kz8wqxup8nsrwto7m617qbj0nswwjp9g5x3yu7t5rc2mxzzlsy7ajf5nm8nm0ikx5f5sq4qdk0eazzcolihjzp2bnl1es4meqtr0oqjjwqq4hvgpore971kjf4qlrj8bo6b2foyym79cr21clvoga4m59w8enz6b2rrtpdx94tjf6rh2m93dweb43yw6khfvzvapz367gfxwrx63swrzc9yhgj4qwva8j9dfmrrxsno2g7ncuiuiwm40tzod8xxbxyysx5l2rtoric88s82m9yc29lu0025faruzeye70fat9il4epe8zxf7676q9q5irtzfjxkwepxfh1gfhvvn44nadrzfgbl5mob878ssms0ytup7a4wsfzylgccu2q6i4zvg3c5kjruvj12tv5bish7pcaf7v1zdtcjibrj9u93o67ddc9bb5k6ictdnzvbeql5nf2axvzb4a7leh3vtn77y02nvrvkzktwa',
                expiredAccessToken: 9466882115,
                expiredRefreshToken: 6373965334,
                isRevoked: false,
                isMaster: false,
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
                id: '393943d2-20fe-48ea-a94d-4b942e14b2c0',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'nfuyfopbjexkbnvhp8z4obq3k6n81wtp0xbqondmpmnxd60ep3f24jw26usjwllcam6pha18lsjnduimz5dvl14fyg51kolkuz4o42krohr6ji6hk8h9zlp0ont33m7qp3t84e0l25uyffnryt9ohf0h906ncc476ii8n0rw5rj9gkmxgcneiyzm32m6fxsm685jjrjz0b2cov6nns11idzpyaldii2whli3gnido6dmhzeux370ltx2zhxnbka',
                secret: '0bi4n52zhfem8vdd8dqjhcu123sfu4vkg5vg5o5yynq48poflwlon63mvaa5phr4eqalkoylvtbp4wemiv5agzggf9',
                authUrl: 'lv9rq2qgmcl2era6b5d1ls1r4urzzw68iez8xhcyj0g2bigomx2p3w6h2qk89ey7jtfdibye9lyvznwof7q0hdo9puvgcivmwa034qwfsdq71zgrhfx3urnmzabufd4zu3pjyi14ilwbeh5345u5d1nfx150xal6dnjci9sh8xo31grj45jhjt0zf7wgjjr4a15m9xpmcxk9w7u6qdx529t04ku6tukw5qdad74rlofxsqx7c4ednznhyz1tw4u96r3mo8iq2u72vgj4gqj2k3w0mzke0sdk9t6miz70g1wrzdnb98br5j4j56abznmwkuzi12hlulahi4ynxpf799hze8dk1x0esy0yfe345m5xpinhzpxkiimmt5upzvm92ujt3319kf5u63v2b8s6i6qq1w0h111u8jvb5f3pjkmmpelpdmpxbl2zv704gydbavotvbbto97tv16dke89l2bhc4ik51nsb67kuyo0oviyrlubm1dz4ky9ir7h3ycrozma8nsfaiz3uae3w4resxhl6c1smzg1lgvmxztfa8bhh9o5741po3x7ouplvyk2op0p0p5wqmku0s18hxshxvh82s4208hhj7jrl3z6wcms0e3myc0x9a2vlfah2xj3fae2sbmpzn2x7mwfaoga55q2jmworoqw5vg4r4odslh4v47pi4marss9x3yemwq6hrc3m0w5r5u8bs0spj9kpme2fr0vzogq8r9arq93j0iby67uu3kgmcvcwudoun6vr5th1dt98n0h2xwuhaaxksg4avzry2eoo96z3g0lh4lb1zdz9dpz3itw2nqnni9d9dy6ofrn3uzricu8sxvhoe5nphkcnsxdosro3p3sijyq1zvvn6vjebsnzzfozdvanoophpq3ozg4z9766n0du4kxa5pntltg4ybyo2sjmeg3mmdvbdk4lcicjexnz3r503ju00tp5a7w4x5jsgsgq74iigghw46b4wf1x32fgfaeppobc3nwjtwtkbrqkvgc1030206d9hc5d7b2cm31mtrfmcuinueq4dexpkaqmrzsmnqi0cydoi5fn07sz743vniqjjebc887k6src74mmlx1j9euqmv7b82c7fgj6j4lr6jmecgz8sv4pg26i3bqcwpya6jn1dkhswfcilat1k9puhxieoeg0ldl0ejxausjxoo06ffpdijcp98p2og750ssyfoal9pujadzii95v49zujek9ozm94fe1nor4xm9zvs85qj34gidazqj2vltatmll3bllcj1mlc4y2zhi30b5snewp0mwbtekiy8ogoj8qlb80anruvss3sk6f8p8gpdt4dvque2cibzohzrsz9m8wpo0ev8k3wv6yr7yqy4hmk1g7xc0fxn5a1n0gnw4bm6jpajrhoyi1t936oz6ltvbeksev1mmj4naovpngr6h0vtq3yxvfusahg390evm6lpgj8vm7138vo637eshy0xyn6hz9ts7k4pta4i0utu3agml938cpec4nu14l2fbr0x74smp07x4u3xbyff5j3pu486q1fdyknxpvmia17juzs3c4i2r6fy4jvsy6w3km3e9qzbbx9j2md4zuhy8xc2n1vuwkdmfp3mk0m9nmfazw2w16la184mhzjcu9chnru6hm83l6oxpqbt55xtop5rsxzdi4f5gt8tu5hsyeftrullik5obwc9m5dmz9la79nl1lct5zejqu66ay5b4m8ap4qquqfqczcruq8ng2xgrk37fs10uyq9qredjfaf9yo2o3pp2t32x9m3wg7wngkkddy8ghzgkcbutz5cu9ppvioayyhm6i1k1wu3lghjqg0hsfc2ocild5ia7bmqucalmj98przc8opd53o83j1pm01e0i0ntlaqshdeh0b2kyoas0sttepkh4bw9i2nhth8qlolv0gqb8mylpzfwfkmuhowb9duqiwv3gno2f03id8fcs59kxb2qfmgldzx007f8n47wzmkbq914iqkg41bldro529n5vaycp38lz8k',
                redirect: 'vp7ylcltb376yr8pv5y5xkievskug15hxx0oe83pc8xonpzd8w6mphvpp632c3rz0apoh1ltalrl1sgpksuuophgz9k74mxhjn8k37f57zdkiry7xuj2nlgnlnfp3yf2v9qkc77ewwnumvs1jou2e8ho7howm3risk1rp74z1r9x16y1u7zvwmt9skupy4hj70nbvffdkqoro5i1aowz37fi8rh0qkpi3zla1kmqu43m7w9zx83sws1889n9yq0wgqv5947qfz1mbv7m83566dey067y5z3l8pwr33qqi5iahh24qhpfwpsf1f0v1y76jew5s4kb9n01hbx349lscft9o500du39de904hr9f6fuoq61bljgniz7dry38hh2dolyclgi18gwr2qblfd37nwqle762xrxxkjj3a2j3jmbtnx5b1q4eqmbv80kdwov2qjhsj0got6vwu6itkk1j8jwq6394dsmw767312kc4vxcucp7ne982v0y73nx3vsfganfghit4dfg8yjlfx6hoqnzx3ph4x2vpwkm7apgcjzlnt5qn5sjq8cno148b5j0vj4eb6mkthirgjg18j0c161e1j2872hm5j20g92vbte1akhbnd1cr3y86btgjrhfkecp0w60b1yuc2f09mpjci9m6e869vae48maomsdfpu4bdrvwyj8kuona8clxtc3h16qybj63hpfnz3kvw4ggpga1kvxskkixo8qb97lj23tfke8p0avg5txg4x14co92u2ivhxejg14d6l2ujral2hgaws0kdj3dho67jxso5a9esb8p9ezmkz8y7mrcr0lnl095uotydsk9xcijvixbfbq2hmsdueu3m79u18minmtd0dktlg12kq2xk9bx35rfqku5c0dki1d4xnir1ww8c1ah45diwsxtd6w010pd1h3xfwosz1oua89y3qply82aqvpzamu2b07bk7vl6wccv6tanloh3hkeihd2ym4sitgu5h4suz766jzb6q3roi1r0pjw4bmxbkp0in9uwod5w2sbxl2lplzvvdpwku3e2doqv0l0q4hrbi03lj7hkqmmqe0kewu8pyyj7f9a3yuis951oohiuxznpuuosx143dl2v9nat0yzvp6e7schrdfd4h099jrpn5au6rgdazbh1cziutozpkefxxvw1bhx194hch9selg8k2ru6j5z6rue5mfx3a4r6hiid4fdoz8ncji5bur115vad0qwu5oixexlk0okzu9wrew4qt1czplgf1l09gru6vhhi0p1e1nb4r9sssuci230b58ek946qiq3tg6pnmsx6jj082bq28d8vnuynj2gx68niromal371mfy5tih33k89joohwpiikix1304gmqg5h0ih64lcvw1qtn3pat4h21sciiov52ceejlnhw5bldo6h96pb76cduo5pjpqiaho8tynzss5p90xuyhj1wqu0fwpkr1hxhcs5zr0q3kb1e98gvs0fs70gr3n0zyo19kk1uk86t8nchd2aultcxxt9melwm2zvc5tfdkwpczlwy679rc8jwirozuuvbc2i9jjknq2qw3w2u1tovjxoykhf7l7lgddet352rrnkb14693eef5hagej2mzippnspodfle3o5oimnmfk7ewbpk0aon9immd8baeq2epcq3bqknw87dsp7y22m8zottyl7wzer50zhiokdnwtvg29gk0abvdhq6cox4emt1w1fvjyt1ijxq6osb1r1s7vadtrwo3beskgdpxx2omdq5ud9e1aqpsh3m3ahuwzowrailnsoqklmvahda6dmr4cala1dohi1h7d39ys60abeg7tdmk2csywsr8uovr6shuzhvkcw5r0nbsaw59o4p8s0ntttydecbkkcqctxib59d3zl0qh4kziud9ljdoqldtz02h4t4ljguwumotfztqctlwjoz8tpv5xbqb7zb8luzj49u7kcts8ki7erreab9457d8acr111x9ua560ndv2pe5ozjpe0gd9cjyzb',
                expiredAccessToken: 83708575123,
                expiredRefreshToken: 3128673053,
                isRevoked: false,
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
                id: '393943d2-20fe-48ea-a94d-4b942e14b2c0',
                grantType: 'AUTHORIZATION_CODE',
                name: 'sixbw6av62v1enso24cjhu0akna6t9aend1zfewgc7z7k8wud618g3ua35n74zh55215e5dayxdn2385mkf4e30dp140plguo7io3i2m1n0v19z0fd8t0flaftvv04eag4n0zogzpnyb8ys5xmpab8k29cqgcbl65tgclixfg2ica5wpfm85701fp385zzk2543kojl001itkdkkuxv7l2ydqscqaxtkutqedupo24t81x15w8krm0gi7drtkvh',
                secret: 'x6hbzoa15pb4umsyndnc2te4obpva5on7md4bctvnu5v2g4wp6o6l4a7yn6owc7h2cc1i4bfe6cgn9wbp2e7dtr2eb',
                authUrl: 'w3dlom9fh7md0in2s9dp3tr26kcvlvyalo1amgje0bf2374718dtv1bx1tvopp0gyeboqgu5n5hiy3p9dfzgpkrp0323ofo51t1yhfcsfdeormo75rdg30lvd7dbq0tog7rtpv2bbvd7zu6j2koe92n27vqojwjg67b7vpvc9qnj9pbf1y9ta8nalvjtcwuq99wvqc557xhcv3kqlu8miz3w73mntpe0owlvdlhe4ck1696cylvepdby689mtn2mkoi7sv26txkpc7d1dl4coez246j8uwlga6cndtjjef80w331ae24jy1njltiuk99689kx6b10kafcplpzqwqdvmxyvfymksaq85zr9jdbm6qxc1i0ug3w6d5efpnkv06px3n1rlbseadr852q5dwkr3afkazvr57qkp5d9u66cu4oh4q5del1qa2w65yg4ucy3h6djuzc62w576wm63kk9hi5fttdt76orlaaq2ut69lje4k3wyv5d7i0kihsnocnburgn0tetc7kzyamx1c4hcppjf9n3ls2mzf5buj03x5h77l9igwrl6i247pkjvtxhh0j6crwyu4yiftc0e53uf4b5tk49cv16f4fuw44f2j4m0q8mihekgfyrixk6psuambbjr6e7sqdy5njekvh3n4avunstb8i0gtadl9tj90srlpfvexih6spg22w9k5xi6h23qmuzw481a9zbrwsw8kw3gyf0k1nn4ayhh09jezjptm6ynqi36kkdi04n543bmnm9ka956moumsmg1uvaks196e1cs1ynhqavdcbu4vyx8vii9eahe30b1y417ocouhgjh76jy4m7i7y3m4z6c8qazefd4yzti4g1or3cnvx34kk85atq8z0h1cg2frg4p1kj42xq3q3asp972g0og4h9i4w53khv0fkrkvdgyhy9moj4tkzvkhn23rqd3jipv643r93ur0ikjcm7lhd2675pw3hjdijd404kbdvoyqyg5w554n4hiajaibd3aftihff7aintapqpuoj3gsii2huq6f2bqjaxv2xiwoj3425gdg99nplsr6e74tmankexg9v7y26whu7brj83ngg6pfhboz2mo46fv0bgdggeq8fmtb6v01f6fjep6m5mou0ntlawxd8gllxo8mqk8wl7b1tcj4br9glk8zikhls063xjzv2cebuv9jhi3wvphx8dsgik3sgoe223metvxvhovsur3a7czvsurreuu8jezksocw5or9y595y642ol5563w5py3cmw2g185fxf7scf76wpitdi13c49cpklp2vnzf67hffy8853wscciw7oicty5u6zj9dh9if2uu1ch4358n3oqrg1bw4gycfr4cnqmxdrdpma7pq9sx89ow68zdjbjqhtqc26lcasmczey7pte067cxv4o6c44xw3rku5s2ajuioz0b9jktcvydx8084cotzcd0pr8uqk13dk9dvxjh70xb31h87q4gt8es7fhjnvfj3gg8e9p06i24972p5xdftuge09zuyx3q0nsy1ghduubezn0x2b3ed8bxptsbe38t1yt5zfk0h7fxrl9vr9b51f3fp2nsgb5mi0aa8itw9u6sy9osioxmzl1mbkgsciigphtwyjr2n602d1s0tg8pm9jrcfjmfkm4hnb1nhe7capck4tcqabutfftce3lj73amgqc7aj08mc0i8yl2l5p9g4g4f5rwhescs48ithaatg14yxpkac0fusw4tjkn4lk8mzanyuz7f44y0hsby3foed9idr4x01n2gaeuuv4z2w7q6odf5dguni50cgkr8wz2d1y83z16kmk2j34s1jlgyz39xtaxwchksgs7hvy9ew4vfxf0f1hc3e4f14zvbp5eyfo3c5ps63azjfeoh1u357fux3ono8w1pnypn1j50whuq3jagpax33b303e6ojf04gzppaduhv00eb6j4g2f1vajv0g6rbu27cgqh6jsxlsnwxoh0uev441tjh6ny4iqkkppa9n5qb6ifl',
                redirect: 'qrpep0fj7sr0v4zav9y5y4himfaiv4eal9knv8yle5hdp4nn4cnrpyz1v3yxsd2plul7is6gf1p4gmxslacm9pandkzno3sdp8uip3tpczzkzjabe4s3mby9g78m0c8oe5wlnlx7xdk92pzxhf3hz070a7ghbn18stx0f79vtlcdcudioyaldzewhif0du7v3lgqmsl9ee1z8ucvdid09d6rujljv0h3zoddqbptgcvkdj3jjw0aavg6rymn6uw1sfaxfveplevm9h8lxzrueftjzsk670hqlar16utqdtncpfbyia2vfhaptw9voegid1qyjo0lqi8vt0yg1jr354zymr403wrogjwnxeau6my1f4wdokgvuer3ifo63no5j7rm5i069ums2fhewq1ir41z6k0g97oipkmmx4pm8is3ptk5apbscxzfvi1t45eah7dhesytof2kgcm7uuoibrq1dn1jjmb7velc9do3u55u608sca7yhbfz4ag4op6fwqlol04lihp5699bfgd8c387e3r16uvnn98jn42p2d0lvuxpqv2xjv1wnsfr8qzlsebvcexlh1ez6e7v0xbgjytq2wfbtysa1wrqy4f4cfg3q32uo0kb4q86007s90lwl6n5rz8pnq2gpvgtknjwjd7uwihyecw6tflajom156zsw440akn1kac3m8ylyo6cnbwajybbkiv2fnz36h5tjxb9getov6ibaunqhaphguw5pxqb7lu7g2edt7xz1j1ikn4dxfpy0l3gf1661ohyl6mcp1kq2r59q2w5r78m3e1fqwajhshml7ogv7mg616ufbyl9sqe379dlsza3j6qt7gyp8hfe7fjrj82n8yn2tu4opdafcgpk1rmu3x973z6e9fufvbi5rsyh4wg454q06o0q4yr3m6jm71l6x032d1vyjhcy4fewqatnefro3v59t2ikrv6qw617ugyoyzwotnd2qrnp7zgkt7kdre7s6v2ni97v0afviqssotwao5nxiawv1czw8eq4cztcy3buovxoja55v8lu5qs92p3u2fo7oqdcqdrwy1huzr3spovdg9g30pi87jj8xie5c0c2uqida6u87ttwzxt7p1ry22vzvfi40njhek7y825g23qj7i2b0gr7kdvhoob4rl8u588n9q5sgf7vvqghyowltfodl85y09nidqv2m31bte3talr3z6dhnxihnkv3yolwaoxjmx0rjri2gs9i1gzgsttuadb29mpqfhipqvrmwn0tutz7tuix7uhn2im2gsio10ag4uhyz12i14daijqw71anble6mwus2jbk4cdnhhu4sch8anxi5yan1kgo69s6478rws8h90um1malq37ot9s0dn6aaccbxteqprs79t9ik40ag1841ee327xife6zjidhk3vov18p9iy3b50lzf7ew9ol2s0lts64cfdg63zbv24h0bm1aw3avhzrai0wxkjzluywre4tnkx1xfyw57d53leb86zbr2fw47sbe7abhdgiq3eoa8gfd28oydcajwjcoe0ads9fyzlmr04whn24elpp6vwtp3a7kcs8lmhvthxy25tkxa7lfix7rumlh2tldnm0v7ip2f7pcm7a5m9uefft0ubz0z9g2d63vznm1shhyquny2rx2im4fkdv5m7l80363opizioonu6zkah4jyx0zeh24hdfuyb4z8077hcifhrm8k0qc97jmq1su7527jkujy06swxo8jmzd3jktrbk3878yflcwkow84o7sf1nd0ofqd0k1catmfklmwgd59g8smh21q4e80x2z8q6837xfl41uf9ot9rsslb4r92d1pyeefxve27qp828tnrfed7vze41t004jdxecgld60lrui5hc66f5u8dn9bd731xyc6f2k9mmafklf1oizoe2pj07qd7rtrfiahmh2tx2xyzxzqt3xoskpgv3cn78tq7ip8f9kvj1g6d8f27n70bjggzupkoutg4rhm23s2ov1y6o0bpfezutuqzsjy',
                expiredAccessToken: 6256419525,
                expiredRefreshToken: 60755128304,
                isRevoked: false,
                isMaster: false,
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
                id: '393943d2-20fe-48ea-a94d-4b942e14b2c0',
                grantType: 'AUTHORIZATION_CODE',
                name: 'uq3shyh1af2p3sg8176i9xtqrnesg4fotambpi9njef1x4h7f1re40114wsg8r6it74h0h37x34sxo6qut8xiuniuccjsydsuf75rmw8xv8h10p7jkb9lmawm4z3ezbz5d6wet3wqkejby38swkpr3fhr2opi97zfn5q93waxa4ivj4s3iyb0if3dohmtc7solvpulynrblkfc674l2owrrjqa1b5j999zwxftlk70xmjhj3qcxbr1vmcdjcu4f',
                secret: 'jnn9rj4l56uqx5h04x13d8auz5ab0ktf1091b37avt79p72yqsuimkzwe4navapwb812pyy48rqr7wx4ow3de6fc52',
                authUrl: '5yobzqf3zyd38yyv02b99zfj0p0dakxr4ijbid4kiyq2b1by9qif5bvpgvdrs0zdg8324lka4un7nyh76d3nga8alcw3xdl9qy08zc7xhsg5z89s5za9phqaeakh1r8gk80y30sculkv3h352qlbijxeoj252adq6ypv5xz65j0r7ddmc8uvrseewfzhykj5yyqktz5kgyth0vnvnqlqneakcou6q0lnyyy0wjgkl6ntsh7h0kxz92jpq9clg3wgyjfefksjnl3baqcrq14jtejb3tec5n2gsf7tzcaw58hdwy4b0o5b7bfrxej9vbpdhwysu3h5p2zb5wnmj8ea7oiel2m8t6whg048k00a8s1h3gj8biftb54c9xtiv9e6utnawxakpuw4k1qmqa9ncsbbxpnlzpurkh016hxzjigvyxzb4vcdwpg2i85pbjhh8ngmh8ys79nhnzfna85vwsb70mte8t95j3ju2lyqvoextjwvi8m6f99i0qcf9q5gem4fjxg86papc6kfn86f1ccks94wv94rgk9w3ajnam24wqgaak0behw0qmmqrx7agroi25xfduik9oc2sog5fyh1dsrb642a0vqeaaz1doqpcgy4qibmma5fndj8lhrnwv69cg6skv033mve4rpyrm8goutvmu69jwd3j10w08422fv2pem25jb6pfg56b2itvt3lf5pm5eivwu9va6j2p0s6ooiqh6f3jau4netngrpfixj2m4iquqgg7sdgoo8l3zf31y418dfd2ppsxzeftiwo3uqf9doeqzeturbciehpizcnbl15oha9ox042cwuq2v9ry0m7nsqn53xlouul11aekixbcwyve6k0ttxld6hw6mf13w6sk7zrxalkrrgavhjzwpwr78i2w09wilxu0hv7plkx9d0ra8n8kdmj6hsdlxfcwkd1sahv3w8yt9inf9llf3bfpmru1kvbf2kzsruscbu0fv5dddqahj09lhu7z23k5jm04s7koa3zhtkdxq54lzt5ysgz6i73fxda2712m6jx2b3xh6844n9la0xn9vndl3rbr7m8jc35wo6xohxmuwazz08adpdb1beyp1duscj8x9d95lv4xlth3whrcokef2itz0r49iu0gwjs4gsszpgx8gnvy1sau0uoanmmliusywtihi8nhwwu9jnbiaj1ie1i1skn9fxawfsf3wstrr182bj49ayutcsxofv6js4ztjosc75drbbrx37h6wpfx8pllfwnt73t9z6zc4ccc4e1368lw78c03nvmsixpqf2gpurfscz1278y0q43gq30eb49vvimn61civl5wx7fi2ud63st0zpqokyi6ygkmal3ubwvartb9506zsavtlof5auooiulp4kdicte4l6ht9yixa06e1n1hu070ntop02911q1eln86cdkkpr1r62h02vkda12rmx5xmxilkdi8jrakkzlytoerqnkhik907s5as1chhh3gne84a3e410oaa7ak1ok3ej4gv46y9mvn2whs06u0t2bkf2xq8rtqr8ji7l80lgnoe0b6qn3z0j4l5mm7ud90pesdwbah0cx1ieljiofttf0jixk5jxhxiz6fu0cf0prvbjcrknuncjru4hje0koq2rpk4d7vfr7xgltp1bjzua2mvkjc57fycpnddhkie5dhpmxalktor4dd5x24ryo3k48gfyqzdrw5rzweu04biew8vyp176w9idl4hg9s5a0u2gpla47pf3yl28wysb7yw9u3tstzrzlr29z0eku8lqsabwx8re9tpwsmc9nyq6sfaso3b5rpvvmzc2wgboafj7jblzd0vjz7b79kk82ug1q1j13bwmjew5xm07xrqghpgytjovwn5gb6rdcjuzdzqrgwmaycnvcx8rkvogueknfq00xdcnu9yus9dc82ntx8esc87kxnhc79k4kx8vs4xghmgk8iw5gauh7j32oe5vgxsx54hmkykz81uel8msdwmyvba157alx0ros8si1qz6fv',
                redirect: 'iafpor4sw2cez02on7t0gpy3s641pchfu12onh8nq2clfb9gma0oum3ds90718u2ufevzidwz2iclpxfy12v349x8wuo122bgqauj8rrhibioy6r87pamq2zuob04yc6hxtfbeuw2hgft21zbw8u6jscdkn67v7o75icjyufcrejxprigzsb78fag7stznirr0s5izoqlvqrtu9rndwyriaoz4izoyfm31epul2a6m1fuhx5h9vexi4t41gkpyen0zirkh94ihbcxi4udgc3nk7w22bhjx3fniexguhbr7g5dgen0iiud3czw3ivddvfeyeovj4l4geiqjbizemc4p1qjkzx4zr6apnfby4grqf31bpw5b2h0b7329hgtjw4663lhbiimsyyoj6h8tupzygkyp4yi6tjb0mazepohaswnmil8kv748k2tzilf9vy8z9e2svw5x73wtd9h1nhstndk6pl3a3cczo0z8b3pmj2pvb24oakhw78bvtwne3gx1ic9va20u8ezbkstbgdliqa8ejycelbkre0d5m8ez7jh1v6yswuevym1bv68gzcc2fs5nfc1bc7377bsbw0wk19x5hk3w9zeffkinctbrhoywn9x751oc0fayr5wyx44483x4rofw6nw17dmd0fsib6qjsll5jjyvphcwp0wiswxdvtcqj4p5w1yr6ol2a9e1j5nkh2qxaz2qmndmj5wvkag3baga2t2zygu8tf7ci6nft0ny6yn1gmxvqfklkn2ek21hzvcrjo0wiyzgjt6l66v7urtvu2kiue0r8ozd8mbvdrlvx2i8rq1qhzjvcqr655w02rvj0ata1i74e700ge73fttnoh7vwb6l4nrbirewxvxc5ouvc87yd1v8j4kr7ei9gvjv4oxq4v15mpu13dfqgjn9ryhpozz5ku9p9esq93jk396y6ks8d1fbf3nodl7jinubm7il5hgij6ng967lvo8qabg1jvxrljdq2epaxexiosp0mh8w98upvzo0j2j1zcmsse0kvg1p1tun5snopfcue1yn55qbgrfvlrgdidcn149s2yy1irowqjjad8oqimylxy7f377elm7c7bdy7tejzdrnfl0kwz4bn8nn3obvo60321xedctwgs7nf3u6wys6j9wc6ddw2c247xq9pa06v0h4mvayvjmpi4lejuexey2u3lvbpquoi7v5mczjrceblx70rquwau20zze23if4ndrh2z3b8y85hf8ikwwujhul1io88wareua8m9b4l19lu27i3fh07edeflvtkb6i307hxt0bswgr2ptlw5lzwtjan71j9cpzgxu4cuucsk3n2igs2bqdenfobvo0kwcvl1vsp3xhhgg5ue8ym8xesmny5xu8m56qljcy5y1mbictbgpmqbdm3arjpdmvj7yjbksm84csk1y5mbf1aozh0fjarsol7i89f6h1tl1095f1ogj4plxe3i8o2uobdm2j70qjji0lkw2jesq44xzedaiw0mklrk5wmfzc408ohumfrm8b1450eu0shbad1vfr2mb9sipz2gudr5byh3uaenhrq2y8t8tih3px48o5atf764q0lq57y2qcvhh744tv1j2cslg58pphry5a4ao3zox5qgi9kxqjoe0sq08membvm24idzmmat11rzn610ej2rof70f367regynl8ydmlus9tiivxy8k4329xcikkee8uaerh8s2iyc3zooaqzje40ki6dr3z5zattpcjrkux6s2o3w2kbv78qf5oie2rghwix24c99pd7uxywpg7xm7tjk5m4fdinmfgftqmymc7x0n8rqawqh5kwedbtpa4q8j59lhngn0rk0itsek8g4k9q18ix5fj8598u5gcyxbvn3n0vlhsq3c3gq57ebx2bnanicol1z17n3g5o6rnosdg33nxwae0ilh0elkans7slq09uq4zu488fehsphfnstv17gaxaxegdsyxlm89w6ivcn983oxuc36wkh1v2deythxlu5qxfy9q8',
                expiredAccessToken: -9,
                expiredRefreshToken: 4907358926,
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
                id: '393943d2-20fe-48ea-a94d-4b942e14b2c0',
                grantType: 'PASSWORD',
                name: 'prhrc774nsf0qk5exd7ygdjb3kw05xbsettq9tbj3f3u96oj72po6gzidrstr5p5l5p7uzvuedd149ksc8hpnnp4gjn30txdj22k7y2shba04p7n2uljttf2gwk9loq5a2vsqy2virjt8cw9iu1hndsipmsg59ys6gg18uww1zoj6zr2p2ovfhb86khtxd42gjtprhsf22g44fkks6dzo3cjbs69y6l98ebjnykxngaoq39wuplwbp05l2j4xzx',
                secret: 'b1206q8bqwhc4xqgmppdotrvcqmp0plrtj000205zhc6726bj072dsl8ep4gdt4t7vtmwtrkd2hakpghqsoeinzzvx',
                authUrl: 'hlvc1m1lxuym5u8qxpun8xr3lixgqpgwfsnsmpthrp8mvt5vbq2xetq2zwuc22yul6ui872nxcxnsxxcvm8xiu315uf9tae4w8zoayy0744rgxn6o7vhybok1yq5o7y0nkhrufk8l3nmjct65eo7xo5vzezka1l38a9lgv0dnkdnmobjiusiksgm9ponz4cd6npjhi88yxzdj6ru5g0cdz90xsxl9td1qknb3p61yt1tz1r9mlemqn2tnul9pow43ei41v5t1o9lgzza3spzt5qk9geylf31x1ebfegevjj7d8dg3tpfmhup74h25gfmbw2so55ce9ovct801gjs66abe9z154z6bvwyjlqykevn9vempgk9z1e2w3distwkc46ilhldvnpcwztrwybdbam6nezh7yn07rht1lr5icfvxdz2hmvztub54yw9fzwp92pzos1xvx7c3zl9jtdy1h1rhas870hvds4bsnww7cwjmkdx3y5akpacqkiroob7mane6w7l5xr1tlr677l09djjs558c2ly65l0nlh2u1dp9bxv4vxyoyf6y0ifbvwkjxgbybi3yb8fjmp1jdyj9vd4ggbsi2j4zd2jjmkju8opaf8k5576p9c5twh603xjqwzv8qrgjjkv846vv89fbo0kwfl90harvtzilvsw2q6rmd5n1xswaxk5ydrsj82lc3uq69mzr7q8qe52fiqpsc32enkpjddhxh5e67la4besic6y9xol67zqc135dwaidbhyutjhcmbrc5cohunz6c3hsw16vkciqbl2szo84thevr8r54x8camfgigb93zqc75t0runuil6esidbsaad0aumke2tk91u38fulz77q9knlmj7po6auvjhs42lg7sj0lhmi34gt0qwh50p8luuxx5xoseaknl9r0cghixnz0vdt00r6fdpa98ybp58jgy49svjepckngt7yba9cnm2599e8yj3rdbswcsdh7qen8dkge4ycwugtffne5rzut3ddddr6zc1v2103wjygqimc31j7sf50gxukqhqxl5d86hw9rd32cwcfzc3ah51rih8mp78k3n9i423q5k3s3868tjtz36omvwalu928shfs1ddkyi252d0hxa5q72t99homtr1p5bih941diwn0uxuotdyngxtfnirjb3padvol8j8gaiay23i2bxah46sph0if0trd7my1prkosbw4mud51j3z76d6afa4gzwuzpgy8274ktcy432k84e9u9gcfw9d0p2jt7r5isufejgyf8ir43vg8i4pmjwctcdp9tesxa8o9k33f2gqv2kh9xt7af4afqmx0qkpbzylfkzib6vobl0g2gu18olaopfcd9hvxs1z0d4pxeg6cw8ngksbk0d3w44zfyriyvo6lom2uiqb2qmfse2r6hczx4d33m0kaa3hke1pgqno9s288mgbco9ge8vy555v6ldt6lwvdv8e3wzujdgaq2uyqwp18k9l1eowgo1gkidiw6d1xqnlwg1ucbt826v93zhuop8z37xwrrs5j6ecmno5lsad811u1v7tyl66mrg09nyj2tkczfxxxsaq6py02sbv9bnim1m7xtjd6dehyewo3jrj9z59yf52sd4l5nv7f9uoe2fwdgtgtud8ubh631h6j4wcku2hr8wdgowk93gu43afx7tplzn3vsdztaevseof57plwhxq3f3xbb23a4fv6gnbyq0yw8gy7e8kztx6yfnssahmj3th05k9862latz2u0cq3thrc0bwut32uzir8d0w0vfllqn5hg8d0xtfulh6xmmcdsbg2o93igd9xy32rjkxi28duenpn223bq904zyuyb7ymhrhulfr4ia3thgbumx8sxb9ayh8o3kie7upa9pg7i4vh5llhp4ol2zsqopfy0ki2fn2nna3yljh4pywoiolcetwwyqprwppi8xg7tu9vnq4ppi58q2yhdv4hythrjvizz5l8ij95ltd0s6ubxalpvp1cvqfjivr8nb0qdtkpb',
                redirect: '11pocem8y2lyw3b5hsy1joqqbwl7pccv1if2wflonohek4deqdnrvo9hq9f1ptnogo6s97sm4qhyf7u1glhh58qoxllticklq5hm1q8x0ocncdieqd2n53dv4mbz0wwz7fcj389cyeqbxl8dpvqvqr5oze8spwxw5vpcoq1sqb6bqs5s1eqt1ax90k3mwvfm4tah7zo3vbdax6s2gfn9zr8hwtyen9cdazv1c7shxmu8zo5wqhki6dcv8j9i6v7y64ndh3eyq68n7m99ljm6fcnuikuiel72m0ibfnwnf9cp4xm1i9sg9oqfbbzuu5surx72pzhkmqlocixmk2rn3j18kjx2hg8s04c8272cnbrtae0sm4tihdngvuxtb4swnpai5gzl7zba5l1d1hwxda4p5h40b7fac8gynk46l5fxd39b8yshdj6xi8sj1whk0fq73t2liq0y2o184vlm9ahampeslbo4c18lixbqwwssaf1v6plxcpjgoc79xwxp0orolbadot2xcg4vbkmsgr109pdwuan8hobvbpepro32rm40x0x3sj6sh2lxktc5mqj8knz25rj7uqy3fspav3hdkjxvf1zhsdntfpqfsr5gxvpsgbwt27jjt4k0vbs13fhustibvgzqewmo134k3rdbm61sxth5di1cqzol3nwgmck1zw64fgi8n0hjzfxnx3he585po6nqw04dq9yevvasmssgwytsj24l80w5wkq3gman2z5dlu8wp4egjin0dvys3ib9lujwsw8h8ipjizm04cijh9ys6y28qvnvoe3mlsdx70u07mlwu0jl2nl7uai83fg0jf7fdwdpmn3g6vf0yx3qduob3an9j6g66j7spkng3cttwnkpw4tpzatle583td0vmy25xbdufmgyno0kich0m3cd9kjznb7mc17n1g85ctfpn6nge7wcjjv4cqulg46gjvg88v3mj6ofwxho67y2on10b4mo0j18bmwm224isf9qoa8j2vfvki7o836tgy9s5ak0d92tk0k30hvhqld1tnypvnoevgvqv2v7bulp6bsmc2i2gpq7e7vmbwwnarl8dfzt3uzj15d8g1tat73c5qqe7as6tohqpd83kwf1l3qw6wqagqxb66oi6spqgolawgu1t7e5zf4kmet7l4f1abizduton85sycjddim2b8aomhlvmnl9m30xd6rk9ro3n0jhz29uysckm8fw9kms0lof4vobvyn0rup2uj8ogjzdmhluolqig24pzs74wo16a1ez7oj6bxrz7nzm90aisvubuowyf36lf3zoh6msy9sjiil1xhbr3u4hgj71i0sqmqji2jj1m3w7yk634485mexanlnuk66ng4uw82fsus2fkbvkgok29ytyjynmg97uglmhfvnfkp3yksvic0az91cyiig5l36rv147sfg8vtnv6hae133pw8ffixenf0dp4oaqthgbflsnajoymtwzntx2bkrgc6k4gi21ts6dph6z4k6ebpc7nmhpnj39wbbt4sulr0yzvopdgcm6atgs719grtywcpo4nvny91wdzcrn8i7ark8nk9cqehpxxb4tvfee0nr9v090920tlfb6ba9nt3g7dvf4wkzajxr3fwacwifuzizt2kyhd1xj7dw5mpae61811d9e3799u2e032rbhqeyhnda93razqvlucfritoijtbla6cpsy4zdtk6cbjo23914632313cz5cl7lo5thvmiluvnqtn6h1rjdtur7t0i3xv9ch28njnrla1f2vziysux3c5n1cndwctwah3avf6c85wxp2vkwdpn1ppjbwk2impzvtx2fumhp682yufhzohqd8lwolb3rihv1w4xplz356xiyfvj5cwdqr0twzi5afo0vlr5n9z1fayood6ivl103ikx54vi9bpan20bcjmm0maswjiwxf0yaunu12t0mudkk6lfb8yspcx4ri7327swgp2bjls8mga9ywefvr420djjjpuocotb6pj2hoc3n9w081x',
                expiredAccessToken: 4695361245,
                expiredRefreshToken: -9,
                isRevoked: false,
                isMaster: true,
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
                id: '393943d2-20fe-48ea-a94d-4b942e14b2c0',
                grantType: 'PASSWORD',
                name: 'j4g4un0kt77munggtv7wpw7p785iblylnuf30jedsn6dkq10i2zmham7qpg06ckkqyvzzwap80her1xm26bi1y4yjpq57i41tk1zpuxtjn1kgkzvyonfvpmlrdrwsd84ytnycq8rcv3o0g3awew418htl969d5u1j7rbr1lcfpt5fsd1aocs097za9f7dy6oqk6uwm33v38bi9548n5842fic85c92nlv92091q8aulbz8sqiucfq7gc5dl7f4t',
                secret: 'r9ikpj66ov65y5uh2jtc7bns8xumddfcynya1yk99qfcrb6i0ygmfd6te0tb2ccf6r12ymqckr3qu3vdkcfbtyuxcv',
                authUrl: 'zqqw92pvwup5zjw4iwz25kp09ln4tvvst8zdczboxdlopib5kmibgmzwvpa7ib9099wkj1q2f1ut5erieto8tim0pyg4esf588oip1d4vkhzaeiovm9z5xij7v32chyotyt7wxxn40e8670a1lanxnuedlkj7a2q4o8lw3zg9hi1jtxo4vuhol9l74c43xfx7ke2xmwyzvbl0x68euk8y80vqeomlbzfy4v40vf1kd92q0wdy748invwstz1shuhazd5jaz414ojmpi41br3o9ztdpiuv17atakfjx64p569u3tvgbdokj4bk6azm1tt76223mveyu899pw5pkcx8rfbsgrh4tquz1neo1tnaae7dncy6xam1vjidnodxd4flju2k9afms1euaky9v2k4b6vzngnbeqwdaoor58v08m3pcf9euq4hm7rlvpvrep69ko4b7w42v66131lieyde35qf6ihrqbcylyosndl8qd35odiqhf7jhenw0wtg09bgjhlq3a860rj7puddz9qi15wu586c50orikk0xhshzewgmhz994cy59bgykbk39cggwlxfwncuebpfay2t9js8pf2cg0mcw4fv3l994jwjnwaljjqpfc7rqfmiz5hbsz8kdnqdl6onrxmfy17or9ldjtu7m07dm6tapn4akzc45dirifqgcnsn5q5wtohwdbcumwtnwkvopo89z0bxp7uka6mjnz57wbkk8wl6e8sdyvfzh7xmg55ns5idk44nwgtoxwzs0ufqyot4uaw715vealma3pnhz3xyntapmkz89lb89j54csk671bomo2zws8e154idi06dgpvvftzs1w1qrpkp64dy085hgqlxui6fqfn9pwydvaacbx6xhbn6hx37tk6quyvswum6kgz6pq7kwxh16fhcfb6wegk5027b11c35va54eg4fz6mdrwk9fski6s3if7tgdyiwp65sp70nj93dslvxym43f4ynme10bmchciyri8bourdjnpqjp9dq9gt9y08hpvqsro4bd7a7vm68wzb655surdyz5c2vd8psxthgxjvetkhninh1csbp0x8hysy10xfwd6hy2fcvl9b44g8axplbb7kg145tcvuf5pcfnvx012bnjykavgl2vhkcduq4yfnhbeot3e8t149mj90lddokd4phi6fpwu3z4ip4clsbo375nh4u9sa3rjfld987mvrd8praqu1fz47w9wzqyc8aarm1d1srg3dnj23h8ktojwg8637pg9odse0xlj25aqg3tjx2k69wvykkppq11imwig52w9va6ffzyax0o8zpkpt4cl90vjjtoywbo45n5bxxcad6nn6qcpgply64q2orix8zgxxdq2h22mhmu8x55vl8l7e1o1qtvmlwa2h8vy1qf6bucojzqbj6j6ipjauzduye61e4m953raprewtkdffknulhs5lju53d1hqadwu9uckyj3okpdxzf56ngp4um18ds8ogipgtdm3ysk2b10lp6xy579ymyu9jpve5cqkl8d18s55ijt1mqwe0piynnmre0vlfhiswni18hhzmq6b21e9brpdix98x05m527sxqdpdxgh1qju6rddld267r4jxcw61b4f0f98cbdjavdmnn32mx1usp18ovylo2iwq422hlm8qk3evswlxgwjtz41a437fj4dt0ro29cp7425sfasy8lblpac3r3u2cuvqqtbu64nrz1ru8p5eh0f93ntrsbdlpglc7mkjukcdrhcp53m4x5tqz7hnotj84uobfetd7lnqofse8u76yow8newci9o9jnfwi18w3detf03dn9z6xxnk82c67fncsuzhzd3s3rhwo874lh0u418vaeaervrwdtmrf4hc0g12svv09hh3w94guqrik0np95ug463kwpe6h8jatdutjq8sqwx9d473m6bwh2a741ydcisoqkhcgyzs41efy7oucf9ebj2t8ty7a1pym8s6vmijafa7vxfni90ularb6ztf4ysdfx6z',
                redirect: '5ct5kss4qtg6od7ukdqprrkwxd09870ilv9i2ozcxvkqakjy8nkf4zxblnfw1ulmlul3xyx2rij60v7buske9xioagyfnnuviciqh84z1wqrhn0fxbobxsbmxgqwlcw6is5ffo6l9m851l1eq4g3ijb6i9vfod91qjk86g4x4efpjufgpij0gw9m5sea60mvumgk1shtxc39nvmaums1sddv8n7uju181f2dx5221gzspuuzxlkn0qr9t9k3fwuacznwq3dw62fh6n3j3fanw9yo64d2r0ektm9sbm2w98hc3xmb3vj6ulbmgi2u2jhw1u899biqkqjo7vydeazfqo2m2fp5e3bn07sqiqjooint4z165flu5cuo6jv1rncb9ejjatpuyidgsb5sr1f133dw82krf79dpj32ftpywjxi24egu32vkzenebjxlbzkvbitz0oxr3jocvgn3vt0oh5d80zma7qp5m3lqga4e9uwx551ngfwt95beq2ubn7vwkt6bbr45elgwwv3awp74nwyh7rnuo3ng6vts6dfkpnhxxx55j6sw62btioxomcfaw8uvccs3weo20faan2x7038t8g0lss7p97g55stsmp7kiqzkm0w6ot098gufcbpwxn427jaeag5jymr0hocjpaj9zf69gcumjmj79twpo8tsnwcv4xydjanw8hacrcacywwsoxnz5etk87a3j4mu6ino8m3iw36g26feq1ak4mgkk4ahxi9oyvq6rhdnsuu4lkyoxlgdxqvb8czbj5qz065kg2g0a1d7yws68bwrpofk4uc7dj6u7gxvofgma6rkvp204w5o0rb448381unxmqkf9ema874kx7czg7x0al30jl0fz41hmknscnhashw0d1su6ivtkao86qzfxxnpp1wewyaujzzj16hpw9wwe6xn8zhffagra8igo8o1g0dy092a7v95dq26e4xcz0yn8dwq08lr778waj7fb1mnau9xtdp2c10frp7t2tk7ir6umq0rlernk2e883buqxacjlh00sqw4fqun02v131xvybomhqqeekei3tr36mixvtb932uj5ljiafmcnrfq1fhkayk5hh3efq8jj74tamefvksd6g6qjmc2k5hnaxqneyv2eurqagmql5jvlvjp5k5338chc39y2u01lzc46ssdpxybnm31oevuy6mfv8mbqev4hrc9gd0r1h3rvabjhot0x2gqay27x9qle3n9lfmlk3xoqot36mtbv3e9h4di7ws3px6iejzof4e54of2r7uy6o1w61lhzf4udkbk7l85iagpg3lpiee1cy2vibnz1v5i1h8vnrjgc5dg8stk9n16y20u7fgj9ct1ilxjiz261w1ko7tlvjmip1dwv53jqcnubemv1sk1vcpmt3n4kcf1ieopiq24qjml79m9ufx4c3tqgyrcph5ta0mq3sbroe06ur3mtlqrilpjkk0kmpl9tlundb8q6nd4306ux0d4du8n4qot00140enj7affcxnebaqzv3gjzc9i5zqzys5eg3psg0hh0qpsvrfxdoyu8z71buht48atux0uenq0bb34fxuprai2wuafaziqazabo22bp3lo32vvj56ltgl8mbmyytrmrrftnjqswjtzvr9pto94aninlcmems6y88xtyzlxuq367da8xxsoma0elvheygo7a0yunzeq6aylcsjddpo9224nnvbn5pwddw8t5445whs1td02fv1m7sw4m9juckz2qr7hoqed74t3uhu3buaq27z5fgop29fuazdfazmowaf050ll0doefrh0ksnj0838mbtqh36mgq7xch3pfch4csehihq3mh9ifw2oio3v5m9a7pw3wi7f4ky1ooqmcac726mmatxgphnrjarwi37jeu17yovp7sgvoesx00wruj4oqrvjl6enm555m50o71vrcrqwah6ochbjo3ygtswdyoosu5abt1ecoxjj39ikif58n7oe7crazcbol33o9gmetsgzujwvlwck7n',
                expiredAccessToken: 9484838363,
                expiredRefreshToken: 6214961481,
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
                id: '393943d2-20fe-48ea-a94d-4b942e14b2c0',
                grantType: 'CLIENT_CREDENTIALS',
                name: '2gwb22f8thfflkiww7vihy3balw2tsh5n2nwt6k7b3i3mjhcvpbisw29gb9gqmfj9rxvj8y22m04k4adj5soxc21mt67b55k2fmoqss1kpkapes77ky6vykyrx44txdp9rn264p33m1alkxgjyk1yhmxi5nlpczooqvr1amr1hpp6ax0r2p9wid03bgbc3acnqyv6fau2vk5clp0ha6k25r853loher8qvg0lb65o72lzm3k209f6tb0wvpy2q2',
                secret: 'ugjcqfb15zck9uuduu7598vsvoskhbpwihy9s4bob7teioip0lhvyeb6p7if00w6ecalt465m2tdj9gpvnddt4xvns',
                authUrl: '7lydq7i1lf2a8vit43reht1nsofd6rbl4gawjephkart3kr2199v6u8r4glv1k7k2okfw8x35qad1hbcfklm1jb6hpahvsppkncf44colxw7hdz792r6m1u7n8i3hl7cqm5uw6or4dsz0ri1o186zmzs69obd3340lnbzqw57i621gvnhwvx1c5oowkdffo5rvrda3hbnxkrptq4u01993ikb3tupyolclb4aq9o2luemjyangcbh43irne91qa0uf38sdj96d1yuoilthn5gmo1tcfh4jw3ih9mqw51njxukq3zwg3mi9w7py6batuua1lpdr7xvwf9wxh05mg4xm2mrvasopwmyq0u90lgoawveywl6stxgssrbf66lxk3kdkgldnmk6bg24e4wg2bqqgm90y2c9ub0iga72jkipsmcgmhi0gsva4rwje6m138iz0xctnv7sa8wli2dwtzo399u2a5esakcv687k4n5j4vxsz33owwz8483ax8202g2z51bq63hgd1ficp42wsyz1ed6n1qnticm9o4jhscvzxoer4bqwg0v6w4i1r6hg09kv5veqat4kf6atlbbc4gx83uqyzwhk4ugxf5qm7wdkg6oh7h7lrbrx8bcvt2h6s9ypyp5z33eok29nvgupp1jy2le2gkcgcqoofrbcrt24jjt2xfffrlnuezkgssulrvges1b37102bxfs6rwvrjl14g6oy5p1fs62yvy1nav1k0z82n250dcnggh37stg1plji509kkwp690gvzhiwr09icxflwvj8t0nyn8pt37ibkjg6iguwqc52lmn4zemp41xnw97gr2n0svaate4vurc5rprcm66xu8pv9wusr90cxror8phjlfa3inmteynge63wnxeeyp9axes7onsvj510zzd51k6sarcsg6uyaj9m50wqhzmrbzuka33kq5kcdddkgp10tiyr2vaatp6q70ajhsue61udkpz23kbvnkv120hdq7yeivstyh3j59lmrasvk00fm9q7y3crhzdqie4l20nvhsk52eubenapa04e311tboa20twvgl9pfba263wqw3zcphag43sxo97kmxhcthdq4jj2yzlek78i7lxot1ppeybm17298mxom392i2w2akndlczltq87zgdx0f0hgmacxe8v4e2w96swvuyhdocg4j6l86v6xnsywv5yodh1h4e7jpx2zwsig8nomrtp64z8hzkh87klys9buigpvriquwfxne8vhnwlpbjx7np6vitrbkguhe12v7vvo6v8i3qjsskiczi3k0tlqicyj29jr26texf75mgujjtcht4myli3yh5h97iqvv4z8cz1dd3zvav296x9cou7bd97gt5x4o7uz69s65lcy4d4upcgjgfg1g3khteg3nfvusky04enr1fjjg4rcpnf4oi1uv0fx4n2q7t6aed7ak7yuelt91spjidw3ltcycdztc3nwa0iut7cn6u4s0esp1gy7gezn7qzj5gzyj6j0fp16w577lk76h3kotsgdympq5ssod4kzbq8ztzvrxu9ch9v5dcn6fu8hu82u9aez5tsd0nau27n812frjpskfrqo4xd4cgu8jcfk9rqn1hd494y1arnahgdbv6g4dscjrx4kzdjyl71ondy7zcgiob7pcajoq21sxt5s99quslr7anqmffaff032t706qomohmg0m7rvey4zotbakv948ocl7umovhfuilarqr9fp55qsvnp1wsubfrkrlin7g024qycsuz9974affv6g7dakk9aovwqkql1wn08tua4qz7bbt00t5t218u2phxut6nyzxf4f0rgjdi7gsnuhxbweh7uspw1xkn8c03jdslxebcck78mljpd5aj90dzbl7dhdflrwvghu6n5xoffped4lw8hnyu5zfsjx3phl9g6h106yk8p1mfgibtmok8vi200r4x25ohp0wh56oizsth3za60zf70qzt6gcufpg6pvwuywdcz990k7xufavpeg50bdv7',
                redirect: 'xpkmrhh9cc5xenllihipma014q6no7ql2j0dxab98715oozumxy9ltudr6ryhdwcii3eu9qlih67ld83ucxs4qwhf7yiuqb77k4uq04w3t0en3rklr4qagrxzd5ofjez4javvy0wsl232qzxfp8qijlvsk3fvvzyk84khnpbracvww1yyct8hosqk8dim6mwszppm6t37ckxug2ruvgaymmooniqm0blp3a69n7vyis1bhhwxrlq84jes42m6nq4dam1olgwstrzkisposbf78vm9ym596q6soe5ltpw7bff924be4jxspnqkl2w82hqr8cwzqr4150esije4mx7gj630n7zf7l9sirt4uq8l3ksxmt2peoiga75dvy2ogw77vomkfrk9e55dtarln9drqrm8wf8soyvynab6l34kdsmykjnqzsbbh967rt4kq00glcwj2ee3pdwkptuj7ykk3wsgkt3dylzj70qx5ifj9yfc8cv0ikgf2yqq94wbf20u6libqnt4phsszujvfguh0068yj3rnpmxe5xo4ddbtt7db1ibpijvxxjnwhq0p3j0stq8eazwemsbl0yciwup7lnbcefgrc830oomlgumiktv1er4w546sobqowivbpbi6wl3p04humo367f2bc1gd8kzzo8auhbff2ou6r4k0po068j8i3cw94m289p1wbdoxed1yba2h0x3dm46oyht6wp98eeynr0br0xv4qt68vcpiju6478fliw4h5a4pjpdrncyye3oy3v63nxqbdtujqu030y1qrq18fgjg8l3aynx407gr9a69wmftwo73t6gd1r2kfbadjo17to5e9lhqsj30aneembmpcj9m29l8jzg0wx3remzsq56igb6s61mtzvf6ukdsk7r1vvm554natcklzht45qmqlnpfedvpb5kcjup5zz587sp6qfkg2r44b62to2siyds21ar2wh8917y63l9xdtlhfzgef65e902nki3wqeun4yvckpkrd5570e9j9o1m3j578z3aqcj570rt9zlm8tlgvraazr4yv01jd29f2toqshpb3bpkojsd6idzgsb84vawzelbamu6dobyxvmkinxpk4m7v8qlfn55lywaglfd38n43jgmjd7zxkpg4jnca9qq7jrwogro9zo8amb8igh0qco654trz5wvn31ow7yyb155pxves22uniwsc7lat9tmxvb0exd06wwu52gp6lm74nkuyrljfwc7hnp0leeyzupsmoijgjl8yglqvn1zp0pthzmkl744cxqmq6449pmbo5f47awgcucwheee6er8i747uglj6rpanevp2a9mnxeg0xsrnqb15ogbykr695kaagqy6lqpbbh7h3gz5ckf6vzu0jzdqw0sm4e04dmu9jtorpx3f9nz9h3b5ujy5tpmpyaqluto0nlaykisbjqqq8qyt1wop8v3a213tqpgiv7cj3di7zhnyd1n3dyilmhuf80i9fbu1ffpdhiob7iivxstmake3dwid8bm3soyaka2kuecs35fyko6xo3p2pwdycbf0kexh8wyzbl3mu5m8gsixokvx28xhh44spgtfu8lndtunamzyws6jc4uvccn43790tigfyai9p8erzufsrhz4ofhi5ozzk7sizcb6yugpo007wowqht8jka3jmh1r9g3w0yeu6f1pbjog7nn50y7dhwszzczyyrupjg0mku2v9o9q5imbswycn69pcfi3g32toe88hybletfipeq6pc38c9el50ktg7ddka7ehltwotkage7l8rmx0ihtgl3ivl5qyo9ecfmulypyxjkr951krh3hrb9iks1zjtsq93s5fskj4iu9exwtrx81mhodsxsrdv7lxums3chpqzpbr59e2ey5i3l7efzbur196x1t4s9sbasjnt99vj9xgsthbt5yk9muyawz8z0fy5ut3ftumr3uuwtu8oeb6mxt0iy4ismhqwjwj1ii9zjt3y2qgr9k62he0uc5o2juaz6jv1rkt1jhf',
                expiredAccessToken: 4440361136,
                expiredRefreshToken: 9688134200,
                isRevoked: false,
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
                id: '393943d2-20fe-48ea-a94d-4b942e14b2c0',
                grantType: 'XXXX',
                name: 'tszrf44m6whg09frlqhpiwg3x1zfw2vlxtp8vvn4ftnrgie0k2cy8qa4tek57zggtdnujr3uheijbmyocp6q96rhzuwe9b6d6xa0ybnrfsbg7r5e5erdltiw8dnhs1oepg3r4dtaq3dvy66q5h4ypdfk51tt0v107vd8kmtuuf0k40u5mbe5msavrtrzequir74hkfol4ttrvbxkxo3xmr9zm3ixblgwwczfa6pxb3as6arrfzcmv0inhlv7ugi',
                secret: 'gmd8i7f0455rxshaarv68ls63hx043fytv27tn5hxdh0d6w6vmf4b8rl44vr028dv3qc98wz01vu84lb51eavgpcpp',
                authUrl: 'kjd9vljraofz8btiwd46ufoouehq4h0vnjgd9h5q74uzcgfdvoi5dbn4sobv0fu2sb9ufomtf6y9gjob854gzpree1hse2s41hfg22l930k1b7e9102brc2ft74ck5wnmir6n7mektjj405d3m3uzia3u0doxz8d1gsvoo0s37pw3yk0ksgdgnpn4c3pluql1pn5nc9uz3ydw36ai5070yotjmxv4qvfln8ptdotibpxwjo4el0q3qzat7x5k8bs88u94jc3syxedbakmijojd61ftwdvrhmhavz5dhj018tfgourkj8jm2il7k3xcj8t7ehkqakvs45n13u09tuhrvr673784p6hir68khsmov4bauhf48akvj1cx2f41asflv7rnqxg34b354k4ks8dtxvafq6dx9y6gzyu1qogms4r3by1dl94m6pgsq7vikmx0beon4dhp3dfv8jrmuv8fog7y0zksg4rcdrfhro5ewjpjg63ll9oqsdbpepy57s8zfe0j4dnakcf8wl4w1ngj7bhw0r21m6av320y9iwrupk5t6qgscd6yq9g4932kqu2xbeadqw8cx5xh74njt762hyrci5jgfi8c29aabqasrzrm9siz9dtv1n73pmgv247nn9lvbfd8s3qqyr7ziijxstmpv3frnm78mfjjc2rcdbml766pm2ojenz447lkban7dw0q83k6fs9c56ijivqvl587bux1bv0eve73f17a09rkshs599742a7s044a86a5rug5a18g6266yn165r4wgnx2jtttg3i5prlwl68hz1yawmhk6m3z24933gbwu0fo4p1igf516t43837gp7go04u2b3s05di2nce7cmkieutrqnnhljqbmqovmufvrfrz9t4urhgiw2d71br737pz1wygl9z61h9kkkqfxha9gugf9l0sdoenbetbkkxffkp8049bqetpybh83qv8v9rzzscren5r4hg2nj9po3ivl9phyfpic1lj53lrhkuhx1qc3ojzwt7y9fsg6cpk6tdfrpwaw450yk0vq1i13r1ciwtvubn572hvwi0v75yz70x8lr60dh7rw1sp3oim1px44g7ytsikdf920nuiw0ugoswb34grvvgvbeim0bh7g1j2oowrefpad35fu3shj9l5gr38f43oqkmigtps2s8ksb0s85g7oyhho58a22bbu2esty65thxiyvqgpwlnxqlp207cjqu14g1lih4zeol0y94rzqk4e4uz01wqdn23uld83e6eh3wdjxv5qed2cc308y646dzhku9v0iv54hihf6hweglvn5gcfk3qrn12er05deop41onodixefcpociazmebo54y2bfooiq6ozslkkc9tri2710cnqb3xuewtjvzyhmyssni6th7h5apo9sb9jxd2ukejxmkden4khuj4m9p26fifueumuhhxcwlnpnvt4mwmuq93p3jbdwazyoxm74omsvvd2qxorjp98jgg4zd36sb04dlrufzbgq1x7o78yluzedszbz1nrlwuginjff9frune0ohdj5hufz18dmld0u2dfwmrvbyye8bkao7c8z1vxdwx1ihif28ukvflfnz9j378jh68zi637ymb8og1bueyi1btvu7ezs9l410t60d939o6r2uh8y4jhcsd30f0eoo78k61lqyytggqzdukiopbpo3rlsmzu5h2kmakz5g61a2u5mi2qvz6d5kf1qrcd1bumj3utgzu5gjajijlvrdgm8g9thh0ele3391lym7cp5800m3b88ap8mbpcod3iz8gz44b3ne387nw1fp10c3opwaca6emqcz2xkdv2oh6srfhq7mco52czt00c7lh65jrfruf62l8fn48bsvzxhsrwrdr7yp6l9g1lx9w6bnowzsyrigqg0hpevbfjyf7k300ej2u55vtl98vjxdfhqi8cg34lbvcvi1isgqvg3565cmzgbxgyk22351ngpjctm9atroykvq9cq8oiuh678ovxpufh38wabgz',
                redirect: 'uacj5on1q2tu7t1t521783f2kxc6r99vh8e5bug806hzadjs8cje8ekyc6o9v6aqqsv6lc3wf6u5lg8qwgzf9ynnobqxug028d063cjj9yeq6h69wc3f62jb29g56de31zwk9wvu8b5hm3naz0qwchredkctra8kssbtx9q7gtol84uzjrgm6b45eyjtqwi42366tlqicz25m3ya87z2wm22avvneolv569wuh40mm1ycz0jfi2luqvaedqm77dj82vgz772wp4e4fcdhl8mq2dmr4xdlaznhn7sjxuhk1646ert1jlu6sia6f8tls1mqrkt6yyyz7dcnavey4dbpdkj5frligdbwzuxybqzaz7ny6dvydyoonatbp5v7qwezu1qc4hb0ijxatvarhrncnzc0xxypggmxnjpgrj4c7dgtgfczo2to2sl4uqhriidgy2m5s1bd9fn0ku9n3qplkxwh3eej1ihggjo2i0aa499w783s8bkztjvc5vfuziotlm662r9d9hbifc6en6qsbnvze9su931h2058yu8v3ixezo4ycz0gouqdzllt6rq94y7n8jasdw8w3lmt6mlv6llsd8j238v90skqy5gnpyofsnrl6gnltmh3z5xic1lydlwsbcgcia7ejoxql8ds3l4vdijgdu6czshdy56cq1hqztocijjd81vjrwkin01ygtkhsbphdoxslif0zdaavhl2ca0biu978mx5nap9tghq6t8uxe3v85xojg4qbc8sdn5ho175uo4kd7se92p8iyyt70yptl6xmt9al5lko8hsq21t75ilmodcvhvktrmd5fhyckys56cbxzdvoxhc8spgmdvnonga6mr18lb4t89hbypgdfchazpcpthiuqd7q8i0p1mit7f690wh7prc9x755odd6hbeu24hn9u4w554x96laus6vlimte8p84d99i02dlcyaou18tg9au8uf95gmh66o9vhn9z1biqp05m9swz0di7kjl2eyq0jikchhpyizduj6dcvf5bugq3o5he4qi2tjx3s93dq49j0lzj07r993mhceltqtq3g1looe4kf437wei5e7failduk5vgoxajb7r0077tnhqjcsfnv6o9ksmc514c6blre9pyusqswi7es5dj9mh9ic5o8pgp2tqmosmbpzmxx3l9q234c2zohakhbgofx14f104pomc4kqmzhfpwyw2yuftuibl88p7a3uxujqayhgcn6spwr2ey2cqm3ddikommfawx0smqr9dzm01ubnj5s1ygmh3d6vuuhn3fj6deu3zj7je6qg8cxrzksx05u3suy3pn2pu8qzsabtc4y8w5dglioh98dlfcu9u25r1k3ij1qgoywhnha9ybyl0bgrua92ubuiruxrhoutm3k8bb3l6wynbk3jmnhysufl85sk5hj1iq3uifhyk4pmjhi9xnxurfzp6l17jhbkale1nkv13nmq5xirkyjxa8nbtp55wekg4t2zrkv2lg08w1w6hzk2d3swvth5e07fkpa5592kefynzl1irw61kuwzg4yvlaev3zgxsyu8qpdrueys1nvjucsb88uaepmbua4odrnft1su9innbow8lbvx5fqe67t86lfcvszgv7vzsb5qhnwveeebx776iyvy909spgbw1ycd3qm95gnmgkx51xwarngxzwimkklxqpoef6stldoecyb3zho40g8qnc8mb7ztrz1t3bk91yasxxtimwj2nts0lsv9wlv2x0gemkdxwiuopffgkt732c6dv5pyx6xoudefgkauu6k67j76kg9itt86w5sk4dk9175j90u5i17ugs0cl9lzy565v468346bkxt97xukh81gnki7cfxm3cb6ovwq2fnd2xjqymz3u7dstte7dkrxpn4o02z1kfqtyc6n0sly5fvau4e9dtjjumd3ydv3xla3yrxmfgcxj1vn9juti79yfaxermx1vxy6prm72y6e4e3rjumk7cuni18tl9r2ae4ytneex50b28gmug',
                expiredAccessToken: 6200858018,
                expiredRefreshToken: 1732850782,
                isRevoked: false,
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
                id: '393943d2-20fe-48ea-a94d-4b942e14b2c0',
                grantType: 'PASSWORD',
                name: 'wgsf9yip23mxz37bubht8rtl61m388wcsfx1mvitni6k9rou42fsyn1r2epw3hwbhsk0s4k98i9tdwk77wuw22073amb6segpz2wh715cwcrraqdxszbf7y8wkng1q3y4qj78cdjyycbr95arthf8zs57ogxgy9v6pz2ci5bjqcnuya7f8girbdk073wz9cohfk1ksde2ut3fv4obr07hsg4v7orzkk9gjd39ewo1c2d6tgi9bec8d2zqj5265l',
                secret: 'h03zj0ufzqeoqpmgoidgucz19e509en9xlmd8gjzgilohs3s6jzs8kuicdhs6xukhe4eyjx7vxt1lc37wk95afe5jl',
                authUrl: '8km42u6z98361t0gvmayk5lp19ukwi4vmt5wt3btpb12s8yrpvsnqio8vz7xseoenw0ss8jhprh690sshbggq4z1xqh1ifeecqr78bjdg9l0l85yxckmchljxe8gfc4x7vtmrdo29a1wxov1x7fz2887cb723s04g5g1kr0q2oxmk5iw280cu39emcpo0ugi9ylyiaqrq7y86nnv1g4rhxi6gaxauab8ebjjcrkg0cg7ouevaku08dvlfnsav786l35le6f3p63x0l2wdtmxbi3m1r04yiy0wv4vfyxopw3d1dbq66trqftta5mvf4pm5sjp4khh5ehnmy3ecmu87683escne0uuxkyt9pmczokzsdsrebrqyv2x7wj7b9w1zougn6jciqygw4fdyh7bp1nrrgfsddmoncq8oi9stvfryegf2oym2ck8hiqfefi76izq7bpr69y88gfzaurj8q2bsgiz1ajv9gcoir142v834yl7mttzgunrbkreysdjh0fkv065rnaytpfad2e99723vd162gltpzchaofy12cl4mm2fxhfdtt76jku2ak5eh8kd57oi3ej0a6kvi5qqwr5jqalvaohw4zfzksbr2ld2yr2x3jnf6st4e9vga17wa844jrkojtyt3z55webw22sd0xqwvq5msk41bbvsdrntgpsg13eqw36t6ls7drxgyqs2wrklm35q4it4he9r7s5spzth7jehc0b1ao3hbhkq5ngmbrbctrl8oxnvqqme4m5ebsye23jl0l1r3o3pa3v0xatbp2qvq4ofw9bnzexekvzajwva0rfwa4mu88ramxkevi1vw5zlaipv4tfib836j3ri4zt8ldgoiqbfs87blsvwpu3d6aetdeoylkvi4lojwiueht2dy4d00u07a3mp297ubod0khtcdxptwtpyce6eah28eh615zdvw4dvg9bpn5y7f41kvmb8emllrtpr2ims1pue6yhk13n4xf1504grc2vcx8ktzs46dnyfi8y6k0j4onhswzm9ypu329cv7xpr78o73qtu4ganys8w6qfubvixg7uv494mupdjmzmp1nmghvs7a1iebh3q6lk9081sqy3yhswc28px4e6vhznvyw3jmotxopibogaznvaw0640u40nsnn48ksqpl8fz74mwk3rk09shcj4agqy7xhqwr9u221ug3t061s2h7lupp8qhpwojiqzor129avo8n23v3chyagfspleyr716ndlus48xii1wof3c2qfg9uqhwchnldytjpay233qf4i4z2naejfp9uoao425tgp1ej12x7xz3ov5zh5cbxz69vw0gz4x0gm4ygtia7xvivm0s62fdu2i8uqqx0xn6zqeyjqc37okvuz1cpshvf6vdznd7o0s0zjqrxwq4htq5ygi4vwlbjfo7nei20ywkypzg0tda4kek9rdruw377u6ooclu8k9d19gva3t45bijz8fvh5ikalyn0t06gr0ic0qxe0y37w3w3enyuxxqdgxxy3gxthlptkyavwplnxww4pjhvrg57hgze8u6uqk584cub4k3nofqcbwmp3fia4qkraez86darbuv0jc2imzfdnvlq6xksyr47mvref9oj7rt1eimf15feg9bl86pixclma4esh82kez215b2kplfp5iw9t0561dnv6ifa45ft97s5i3jazs3cgl70a7wvvb4omsl4hlhmzt55e40m5vo55s8ou24ackmlsi0nv5bxjfgtirb52x78o8t6qxx9wxfhj2yzjxn75eaxjuabo3t2f5tyx5vimwr7q7cbr6us4m9bt99jpimpnhfxxpp3spl72tuovn4qhb46knmuxsraaaocrsxno0vf3072wapih94yppxng2slxhi5nkb4am5tjz8bak2syl9gl05qnbxz1wse8ll91fz8ro7tuoh03q53ay9ml1xj9kgx4tn4x8lnfkay4283058x9wpxey43mcgxy5h16hylu2np6apfljn47vdipqpbdaqz1oa3',
                redirect: '7qkmjdgrlam670qngnhmtouu0blt816uiom07epkcc5ak3z5alifcwvyzv4hdxf2pkszh16qjlsv72q53cdx8q9vqt494gntpgkielvavso1sqwe8hniqziqwa1bwji3qyrajhrscyp0ty0dx9y59qte3q9le5nc6u0kai2f66n2tvs55zvj8xngfj5e1jctqkr21ugtwi99uj9dfern5s9drhqjys33utkx8o5rdpwswc1pib1xoxy4lcwef9skp92lav7dj8i8mhbqj1kiuep9733prg7rl3rpcrkbptd3si56epxk98kurmnglkm5prk4knl5wu94tvs4zyhd48s9bimagegujx7rqkg9lbdn8wt2ai95p6a9oraj4ae5eqr6t155fu8ui5juuw84cxtx2tg9svvz1q4wwrxlmpam7u73bm1j6mubuozh006x407hsfwont07ar8trpk71tmbq41hyrgztm81naa4r1b22iwm5jbxnb53tfq5b6mprv83ek5wz8q1q9awfwz44ectur5q5zbv8vxsfiplldxz6llmf14sq5pcjg51rj547pyhzzx2rdgv4kyqhsiivubecz0l47hz3gncww253eggsa3tijks9vpmr3uz6egmxgpqm53pcj55arsspeax9z4otmntw0ncsz2xy1prcilxcefsojqg61jayvlkswkn60zbdxttdw605ty55fx7kagz5np3toz8b0tecr3ofuq8lfmbnfla3xevq4nybu3c40haum821tb2vxdaf79y19wa7bhui1n1a7aocfo32tub9hl3yrdgjihld77hkov70f9r9itn80f9gz8ibl2pfewedvrghmexjm97orcj2wd6pzcsmya6prtij4fj0hym7sdj18hvrvzmpx888d8fcnzh79rh8wkcrj69f47pgr1u0b696dcvrkxpewhsaa6wo8ztzfrmwg1dd3nr4ka5rdusnkfelnzr9ltwsskuft6fxtiyjd5ui8j5fiqhivuc9c7yutirlzgmdfveatjd4yt7xnyvlkjtdj0z2umb4mdpvnbb3knk6kdsjvck73eytodhvntccabf4tixdhj0sljkqeosuyyhxv611i6gfw2bv8wwlh0zixuoc6lnc8f31wcsgxb0pthcszrbk0gra1smm6uoutyctkodgf0ixw4m3s5lc8m7hd7m21mh9bui7h1qzljcptbtnp05ympkw4up2x9kacoxqjggee6nr7u0z55c3p3w60d5fm1b56b8g712ok4sk58lxowv7k6wpprd30yy8gq4eqauxa6zjg0g9waafpnj8m6w38kifh33timkcbwog09pjps8vwnrtl5icyo5nc4tqntivhtnuknsoopsomffegav1ah3bbm079amv0wf4ggd7xf46fx5mxknxoy8ch2awayd10ds3me057rgztolagu3zt7a54jrr48irplaaf45da06fxbteeghxgyq5oprn8lmg5kbl6pexdkmn0n5h72g08lduxc9otb0ei2ko98z7fa04rxzjvnfhtncwxsn23tb4a18re79478lnpoj5r3uu2he4q2xxsfn9g91megi17w7cvcblcjt1jwfnbk4jbhyfmkfdtc71xx9eeb5txwtt5kqi7mwdf562moolc7myuidipw3mzrn4s5tdsbs05nzu1co9pk85eqmmzo9wzzg8hhciz2xtu8ijx5v7wtzlb3cccuk0q4k7fu50934jaalkzunva99m16anutm95xo36r57dszv2j6joa4igudgubys9uceu0hi2c1arxmo3s2kce22jtwnxerviq0bc5y32lswdscn0of16ou7kslepjnnwl2lpfe97y2zzpzouplknedq70jidumd3jy3byagepy13m7xnfzt0rrhxz9i6e6njol311h4vo6a8novkslp617vavayib23ycsadgdtqgcx4l5y2a0bjxtfe6hd9jvowb11elqx7plq1uomxyjfq2fmhn4de32oae3x6dvvu72ssx6',
                expiredAccessToken: 8813272244,
                expiredRefreshToken: 9725355290,
                isRevoked: false,
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
                        id: 'b94fff37-01c7-4edf-98ec-0dcfcfcad19d'
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
                        id: '393943d2-20fe-48ea-a94d-4b942e14b2c0'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '393943d2-20fe-48ea-a94d-4b942e14b2c0'));
    });

    test(`/REST:GET o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/c1c94d33-e1d0-4ace-822d-97c218a8c65b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/393943d2-20fe-48ea-a94d-4b942e14b2c0')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '393943d2-20fe-48ea-a94d-4b942e14b2c0'));
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
                
                id: '01190346-b1c0-4de5-83c0-8ebd7afcc116',
                grantType: 'AUTHORIZATION_CODE',
                name: 'x1sty49l5jaj5xy64rcy1p75ny6slffjpbjo0n7od3hxz1pllzsfowcrgojtltv64l2dpb13cpxnyxgnbywfz8r8qwgybtlxke5b09s0maecchun9irmz0w2v3n2yaz55xf2j30il50cii8zjd1chcda1fasztvsklmo9u7c9s575jhapyfopes9eo781uibnrlpbzg4ebjldmkhquq3udn7jntu6uc1m5txmnp05gukqxm49v4n7j21gnexg7f',
                secret: '5gf98c0nsh7hwps1zepkas5e1xe1wmr77g52sumygcba6ds6gj8m3ot0ie98a051tedtzv6mdrase1i7k8qh2gq6lt',
                authUrl: 'm31c54l09kcxgr4717zlmp6tgjwdi72uekvfwxw4qa9nrnsysbao7xpt6ckgohbo9sazv5edujc1zewwryzm5o9mqbgufj05pijk3ytgrqwqp0gw3zcxxozdgpdaq8k61gahdsd1dmh10we24cxt6tfnt6lez5n19osnr392jg9xwkrxe30q9jccenqoidlhdjdqffh2x87ein9s3qy0xq7gpkwsulazkymjtntlo0v3sdvw3wggcfpntwprzsuveuwfqaph10l5jjg00kr6m81rqcadrrd0yb4hsgie5cw8w4utt8x0c1dflah6opvsu0prsz4fl2mvjf2gy89xpk15v7gulf2qrcbndw55n1dlpzu02n14bvhg87v0oeyfdxj0652skyt0hsybrov2ib21j2kwbi1kvl0rho2ucqoihbhq6ml3s41d0wceny5ew69avoadjd6xixfdsiuvrqa7f6m7q7mblaoqlidcbm9mdbd2rm4wh3uidnvdx8c5n0klwc00krs822avd9g1xighr62tr1ef6o8xrp13excm0lw3wyaa034o4jd8h0kpq1sfjwzo4z702hs6ak27foejhko954n78cat2vx7gcq3swbpwjop0qmf69zv4sbswarg3mcwo3chx46f998gv98kq8tpcvfmlbeqvs6g5qpkbq7njtcg4frk4r9v3wu301jk4yol8gbfdhdsx82xb95jt4z0g1vvxd9dh38ybahpdk80fe8fbmgexqz0dk8044mklfwgluqr057zdgxnntuk7ynfd8moy9kn6txyi018qfhaafdt7diltez58mzbap8y93tjjieukj9lh1m2g8jdz6vu8pdwz24ex9sqyksqabdmj12r1v28r11saagx2eqiii7xxj6ly9tkyauwott9mfq5dzjuzxqnc49spdg3ff355t11nsltkesxxx16wkyzl6zohcyqqlr8pgvx79oj8xaw8bnwd115epk491z4kd75fvfc8wu4ahe0aw008iu58vasnhb8l2ldmun9h0o9mqxf8p30vtpd8svq93nw6gwvm0j7si2jn7lueeqr6q7kzfhqk6fwoy6900dmf1pes5vygxo6y1b1k2xnq0islwr1yx4ftfalmdg8rc3nx1fhlrd56ultpkaw09l3zd72he0n5t85kq9oclzlim3z235kl5dt033v5ubjgbvkmloh8v661gi1rmtg0hla284v1dsvwmznoifb7jbtzmz1gq2mc09jfqc9ssqrd40u9fi65qmwo27hqxjdp003ao3rp88susagecfiwf9ax1itquyuks2xlj4nte5w8xndggomm7ubw32as5g52mzo9xmmtt4zowprtgnsv2evym00vcs3fkvdvpcwzym1r5lx4eyt1es2grk9t94btuxkuauvkwe3o8y9asyjp9we7rpsc8sp2tdkl1r2omsb5tjyz3plnt4kvajze1g086yx01khl8n1ktt80fkcgwjqykhv9et5e09mculmv6uuuym50qzjkg3osuxl2qoeh3coq70mjnqkvog76fy68xzyjg5oki4h7cjz4io8iudxseb62a9ousq1s2oehai54idfuzo9xl975dg5ud1r8ant28o8a6bo0m8sg6f2vyckht8iyhxei6ze8lkj5gv0bg4rwzi0kgzumcx7owo9krk0movzpwp3ejvmqq0wvwscg2v2l5wit415ycaaisztu3l1zbv4pqnwhgs36q8s0makjsr6mkqi6i063uv1bwf8jrmbmr17tuoj9d40fy38omrjczu6cn625af7pjwtgkct6v8bwurjajsww7q1p07vkq7f53gafk725oaualavlc0csp8t70yzxkcntf47jjz7lq6uw05xr9bhnef61n6eh2s29cwk4udd3kqs29s0rydkwwfz8t9vz2p7pzwg27a91i4h59r9ei3i0gc7eq942r89kc3lrfoli39i8t4hurff7lj9p7vwghoa4y5wstedwqzvairrvnweba6vd1dlz9uo',
                redirect: 'ch327n25fjv113r6y4qojpqj5x8uyuyeav277vapbwbdd71f94n83sgqh8774msy331j6fn5jgspllr4kd55ah35y7i1k6hs5cykvjiu1tqrxb2qej2tu9izbptupizgaw2h7wiy7dtbn38xwop71vyx45phxqys4iorqf55s2xlfz9nkuavx1lusxp1350hsgjeia7n0nzqr2s2uq1arpwnwg01unc24l133awrg23nju3fkatdh5kegu3cq6ymng4sgd5f4xuszp970p7sakp6796chobtwm8h18duzh1o41lyck4x10f42se1il8xo76ekrsf12ztu6zw92c2ltqbqg28cue8lpg0wm11s2k0afb65mj9i9w6d0y9nil70n2emag3o4djfp2wqkacj60bvl3tr4blwoea8jre0waa20c4iyidez0z0dl0vntbuq4z1n5afsdphxu830k8xliz4sj6j48md6bdbbxpf5h1ikba3y5pntsu0tnd1c55h6hdjsiqm6mxw6w46i81hjtjemh2sx6937anakpw7kq7ifvewednmizte8h5cm4u8cwsch5kfna5fww3t81igca3vxn0cgn7g74caqnvwovatji9ys9xwv53x2w3q45ar796ang132avwuwlahila15vyckm7amm7koparqefb63whfhb78n4s04yebizkkdz1x7up8jq2kmbu74qulklunxzvlgjlnl6hdqpd2qhqgz6i97ai77qe9xkfpstqcr85h7r8blw6wlct55bch0mynei34n6vrep4aqfrn50v0cgo68wnnw7f16k1zygx1xbvo4oumqudycx9fhsii1ny0v24lc705ol353novibdjytqkp2y98y7rxkm7urj5idleftg5l56onxgdo8bg7a5t7pr7gj3ge94xxx9aidbn4eeqn6cv4kuqs3lp4y7lyuml2nem5fbkefqirxnla678w2khyvncktb31olbg40599q7lide95rqetih499m97kz9nv5k5le9fs8ahvfhqvskl5laq476b2vm0wcpiur2hqza3hs0kg2awwr21e8vxogex1t7n5nbryb6ya8t856desaegtr0f8fmofzrgfs9qpmcfnter839iiwug7c4r6uvu7ntyor2275s4at7odplezzjiqib4p3xrvb9e74w5chdhy80hzymbxsj9ckhtgt024tnfkcaidm5dx7azia3nel5t3v2m6sjeyiih29vyptagelsppuxcb4gxi7qvgs0q55aw45j8lhnhwloimtbl11vx5jnbdhfcui57s1af97371ixkl01h1enr9pt27cwl0h3qztb0z3rhaajbxywlpfoez4sf5g4q84f3gkqb0e3fwz0bey2kxppfeqxmg5fzul4tv5502d88m94ej725h8hnei2v7nptzpmy6dzdg6k1f7hrdvcf0x6z46akiotkjxrw3y848qor0mke35z3r5m92konykcpfp842ffwsj5dxbj1os0jkk84zcmdbd5vznojef78hwel35b5w87aaszkvykmmir1xd2pen9gi0t3k4ruqbwek330n9omg2gvhkqmyneu5t3hzrhjcehxttbaccvizvrepv2dyc9ehbi0pyscr8v2s6vt0n0693nnwzutrsnqkff70bjuvgeofg7ku81mbwkwch1b7er5cac16kfvqfqoadssoujvc8pkx24as5rsma7zhrnuzdj1hgxgke7s1s6g59sc3v6pmeuhyhzkn58p4arr5efr5hsoakxy8axp905abj3fmburcehc8da1goms7izo8jnl1tiimxosxx76ts021hklbi8xiktovz3c1fvj2l9io0yei5tg1qrbin8nmtzdj5umfnn33ya88pmfksi76n4jzvee4408dfgj937mf607wcuboxfwnw58122vhw3nha7lnl2zcpo75wgsn2vk9g20v25shig9sn0uc83gr0gu1p06vatvvu5u088at0g92obvxjz2tekeckz99ovwh1j',
                expiredAccessToken: 5396031630,
                expiredRefreshToken: 3296396882,
                isRevoked: true,
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
                
                id: '393943d2-20fe-48ea-a94d-4b942e14b2c0',
                grantType: 'PASSWORD',
                name: 'do7cujdfh56i2hzy3nj7ea4pfqscejx9gpxpjvm5n9b87baztgmjeirrpw9862dzcw2tksppf2opgxog13yxt100qwuzcc14ezfzpf8luhep90eke2srm3inlslf4rcpl06bq9e1fa5wmkkc0evbwktapi8xcc5rs1gyr5lrsc85afulmtnv0jl6fxzk3ffnr2becpq0qxiboiywaqiwrrxzd9w3tisgoffkxjd3qw74ctkrhb8zsxpgst1j6zo',
                secret: 'jrcdhk7eilc6kxfamnrm39zwr45z2ddz3ar784tvm8bpem3sjot121jzmnr0l7vfm8a7a3wy71jr7sngfv4pldlq9l',
                authUrl: 'ofg3fbfyvb0m2u77nwmz2223kop3rwtismc8qi1cafp0g67v97isjucenvbv5k8own1m7r0pr6ry591wzjnc7miujd8vx5vlizn93ps4jrz1gkxlei78cl35xcw50943fqqyqx3ju2a3hpraiaero7qk3kyfm4x6xibw9tvzig4ovybb4drwnz8cx5x1ckn38xutuu2jyx8uhhm9bexubu69dwjuvrx3nmn4ykqod73zi9s6dmahq37cebjlqh1tuldetswsl272t46arxovbgy1sr2nvuv66x4yv0qkochuujszrunl9e91p8x1cbmteulfaj5bvi6busil0l1bxcbv1lfz7xfzh632lzs4wi7kkr9s5w7dkzq8i2jjrbo1igm8gl6msrn5gayyqwzh6b3xwob3hkotevfpbymew4skhscxpaglf5fobmcm9gb9xo0q980lslpion0cogyrvwurpint1eicl6lrs97ef8o069z1f8gizdky1eolavm01f7uq7iasox1430mwgalcgt36b1fn2xwxfjmamjpappfhfpqbo9vh3yrv9jgd1h7rh8ly6ntkaqb7amsudnyqipuq1snao9ibm5zmp6z9zusao9r5azt8x98cv9ryxv3q581dakmmk4m0yviacwy07bny3q1b547wkjidio2dw10ufuv5rjbrojnmhlm9nb6y7xpj6sd5bcx15trmvk3ex9ic7y35jn29hsb0gho5t94v41fy76kc0stwpcjhnqx1hvus1a6mze5g0hekolq6fk1caenzqe6ly9ewzt3jwefz8mimgez8ju4hjecr10v5o1mblg8zpmf5rmk4igdsr8nnhqo3gkjdg3ipew3ngnvnrsc49xfuc8sc0fromo40llo78pd8xycmb3yp86ifj23g521flutbjxmfkvb7ox8easex3i8sx29d9833ose6xstvudbfkhaaewxtg0f0qxg446t5dc7njha1cvqv47t70uc2bz2gsd6k8awtbis9fbvfxf2cxcsuk15fu1x8jcvj7v817ms0abj885yrki5a66gawfyh4k94t83vp8oslkrrnwyyrmwt3m7v9y4q92xysoy8j3b1pklfxnocyxb0zkk830evy2oay8bs3imsl9407srgxow6z12y786n1rnxxhup4k2vue7p20j8acx7kuhfhb919pspbs2bdhf3yacqvbdz4m62sdwffatv56c844exhdf76an61eb4e3xvovdr2goupqrw25l7z0bthi0s4on8lzhyjqigg9ssjdvqzi3yafdu31f635gx7hvoabw4h7cu8eab68d63dslb7yqzreha9sfwge1wlkofzse0o4gkavszfb8muzjl8kl2vzty1a9e7r0mzkcoqb85fsdkr4buh629nkiehgvngvx1k1hwv8fd8wzwne7yovw66fuzbwpj4ruvfqivbrcjb6707x8x1873o9n2pdyyk0pnyydy6isfnlhcbkh84t71azc9v81z4q5aqgf3ij1iarga3exuuot3x1a4bheaqq95sv0rtujg71rkm1rboqilk5o0lj2jl4oxmmairnokua0myk3tmre6yd0z4gojrl3qpqt5kp5hyp36ply594x7hvsu5djo95ocn1i042qifqlmbmp0lq2n2v49ufzofbuq4ex0tizak9k3pp4as23tv2e0sclyoxrje6rk66fes0zdb5dab0b5llvy63emdss9pugc33n9ibpcsgvc044m8x3b90sf6w9czw00rlza1c3z14jhvfjh4ze5tq6thpdmpvp9f5cbe7td38u05glz5syizu4lobm6ub4x3q068qlwokm9rtdkocjbo6f4hj11lhfxrsc8zot2ar4raikqxdl0f8dqz3y7lep5vvzgag2mx9n9x25qjzs2dun7zobb3eyd3uaplkswvt8krveh59dltz6zw7z1u6uva7djfk1o0ikmw0vvtujpnj9wfr2crpqwwri820b5maguelv7qc1k0n3fjy8y4lvp6j',
                redirect: '9mebydy64gnufdy8mk4x7i1halzofc1dz5rqiakbu98muw27ou90y4unkt78wospkdowfz0z8j83dnassirta8s0fzrgyieb32f7w1jy1h3pc70ldqa1sr1kj39n08dugsfxsj3jzd9wvng1ckjm47m3pxtmsd513k2ymfzvyk4ih8xj0h5waacze06ls4iawaazhx8tih7n6vnr4cj7lfmx6j9s7rslbeywlajbpwz2fsytidbs7y17n8eucgff2qqnmeb8bd98y8ey3c233b08b2qwn4va539ezvjrucmu7muidx6d8upq04pf0nrqyxqblkqmqqbvil3q15zdkxmyqp0pej7tb4l7y0wqji1s2etu3q6j2okptr33pwf10giovnlvqp812ky425rfjqdy0cvl40vns0tl2y5tbcppeqeu65wgqxq89i6uk3c4y6d5gyrdq592fzif91kampfa806p07v2y6joj22vhetk3lxl2c8y6gavb9mnygsw76rpl47s4az91ahypxs8l7q30o4fqfmm1j9nl56vzwjpcp6xm41or9nnjhqsk5d560878cgfuz9gi4qjkyejw30r4j0vdl2dkasydwra1c7er1v888yrg3xgkmzbox3gloysxcwmqek8luweeea1ltyaquwzh4axytoloeb2evfac7bfjoygg02qbn8xjt0gf5kvqhg391fd3che3k855b7pcgk17o1f7b4hthicmretj988df9lln9t0d9h64t2a7vk5n5wsfvzf0r2zhbiyc15y2uhzhmd5cqq49tw1l6r8qbsf689ovbi5iql6ishawpufyqf97kw8r3yqnnfbc74bg2dy7t661alft0blj764xlagquny7f06dwepyumqn74weagmd96az441zws536f7cp25mpejkzuxw8rpqnxka8ztkcibfwwmg47xwx5f1j4rcha7b16gp3vhqcscqdbbzizygcgnknhj1z0ofcb1p6mz45ilr0hgda72irrjknkaz25dps75bw6tdolr9i9z32cgl6932c2gdt4o446ng0m1q7m7sj8ei29qconw6v7ggebjmeqn2gsz0yhb40uvtvv6ff7qkj3n1vcwz50es06o3x1c8v1xlk0usjl3na3h271yxfyp0nzcoxarx9gy4ninxe7diox1ddz2d3l0bpw1tougag9dlis0ay0wsdxa7pp9bpsfg6fsbdsbecdxh9tseaqvfjedndvd153ewudgahcmr6wruvaw36yrdx8tis070fbxzzkky7nak9wbd25bpqw6frpy4r7vmtrd2nnctt5jfdpfo9rseusi91g85smhq5udsq99qqf56segm2086oti93lcfehsvs4fbo2gvlxjxk161wydncj8fvd4hoxrrc3fb1q9dvt6uya10hrivyp6f6r8uboiy47pnnltclgqioqiqecc6q2tbp40tusxxmtk2iosip27fp0n9rkw74m8srkoah2fw68969ib2z79wwvh1r2mob59q0jyws6j5xcels3vejocj0bfpmh37gmv7a2wjb2k7q2lfoh6qpp0zlx0oiq9ymmpfns3in13lhcgf6kul7matgwhkvbgngmau9ib9u894p7aadv10cig2cfu32cglef1t8hkl161dw94k3d18a74ee78ccphh4df9ok9zlwu68tza504jm0g81p5iqk8t917v3lp7kxbpvn962db77n0mo82wqxucse3prikpp0dp0dveu75937vw8beqvsx4fjn3zb6pafb3ueo17ndczaillg7db5fry6ro1ydj8neh5atp1dz963s0xubroj73hex53f3ipsxmotqpimsbr38umpuqp2dxjl0fqboahc5izsjg7xkxllobxex3yauizk6ts97tarxq2v8d771q05fyxo5idwx9bhe8ubpy0m8xgp400qtpcehx8abti4ikn0keawui90r7iz4aau6i3c5zd51hafg9xbgkc2cqh9dhslps8jlb908axtq5som675',
                expiredAccessToken: 9593821075,
                expiredRefreshToken: 9497322799,
                isRevoked: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '393943d2-20fe-48ea-a94d-4b942e14b2c0'));
    });

    test(`/REST:DELETE o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/3b5f5cd6-fce4-4439-94c2-8a5ebc4140ed')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/393943d2-20fe-48ea-a94d-4b942e14b2c0')
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
                        id: '0772e1fe-c410-49fe-a19d-ae9a4f1044da',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: 'lgzphhx6xp1sjj1ngigs3bfnzjpj9hmp5je6yygse7xpflp25ju63vp2ko7emtjhin25r61v94q4d1t2ooru8hq0286ysz3ljzm0wtp6j8a5wqpibk8fve65wbcfu9i9v51rfnx4m5bilju869w8qdna4q3k2edd48y23vshqoulujbe45y7qk30qfx1pnb8mjmb3l5w2qdi8h8lazabrcidgc2pte9665m2y9o5enlc17q17vyyrvh5n7xol8m',
                        secret: 'lrs97mbaidsp12ucwg4i0lifaeq0yrzbzxjelsyzi7ghg2gebry0ns7s9sysnfskrdhcall4o587wxfdwbc0rsu1hp',
                        authUrl: '88emjc5iswsjiow9y54g2mfq9iyfleyiz3g0t4iow49r3v8zb0azkbpeps3fhjc1jeyq7dqd5e6gn7avjoed1s92z3pn2enkw9u3nuh05zey3vabvmzy4fh0out1hl3ht97z0ptvv4w6nqbh7bz2kiua2eh2on5dak3q11faaikrk4hxqcsd54ct5go9qtloixrqv32amuq6rjtnpwqmpb80vf6xx2j5sp8q4eslh019ss2naqqk99tc9a05x2l5up0owr77n2lnpouya18ka3tz9jkpj7y5ai0izhp62gtrum15hab4748y6v7b18bri5zshx05wzlot3sar25hz7mtcwouy9crx3pu4k5cdrsjrtflbvq7gik3jawyz9lzklwjeayolcvlg8kfn1ji33or8dehy291mnsnbxe6mzb1r1te8savglplb9wbzswr1qp6c9dwce4tmb7lvfwfkluge32yc96nipytm0sr5ix7vi8yoelxt9jd47pejrvtjcqn7jhfa48g76taj23mugt4rs0dzc19dhzrv4o7sqrbvqb7m7a4kvar4vfj45t7g3edvrlwimw7xfzn0ihfcpwa2i8414r7af6tzr0o2gnon9ufk24uhrlkttrcall1uq2noptz3itxryl69p1b4g3s2jymk8u77h3vcwi0miwpvepxndxrfaed3i16uoa4jujy6q2wt76gkx3pbzizyv53hx2i60lsvrt8lin7i7dktjxmjr3ljjc45izuvubd6j2fj29hx8ydb76qa2hztto6uze6hglscavt3tu9e6zy3xut0kumqpb6pundjrekox651oju48rnqp0cor9p9hw85ob9b23a326droibd286yx63y1x17jd57sm9u3t5blrg6vc6uat6f8ec0hhiae6w2churgj4y4237dnd3ruzrxm7zfxttwom3tfocxuh2bw8ad2l0iv2trrxjzz85aszp08i4r7sxavusp1s0mqdmx6j5khohrz7dmc7mo5tfa28i0746ibmiqcuu274day0yjfue99icacz209y8pji4maww3qq4pnjvk9bcwg9kcjbup5xvjf8y2yll6rlrgbr05dei1tgetuht56bc2iuoew5o8effbvwxc0q00quxlka80qu3og5qvgb88qau89uy2rcdqm3rwup8aco0ph5elgvukrtoqdwz1xm0t9ejam26oxr6hq2tz8wtmbi18cnipylml9myzjps1nk28lm3zm1t7hs8cqmqnhxuavbdqiwxqjt3cco72xq4uadkqf23y0g2psx9iki36kzfgrntbw1kd86fetwptkjuhgs358q39mpg8nf5vxl53jx5ucjq9d9zdwcqowa7a6ko9heq3uhq5u429ltcepw59t4o9vxu9o7595mwednc7tidkxiqinwqbgen7xhi4mhaq4fc0adhkb88gw9nurfxalkt71xffw5qqtnbkck9lfqqpva7mbv47zwr1zpq0n34ob5b6hjo6sgjdy4kqae2qqyu9ebtu47g0h99tzg0ps8h603m9qry6fyoons83tg6qcjxsp6c9px5e6tp3ewd03qdq67zq5bwrsne5qvttoffd529yj6frx0vak9vibpttd7xd1rw7y32g2y32xzray25yknzz2xsx1cifh6cig7dusy6qse8n7rqyk1o87j2e6fk18t178qqhtfldh0vw7569avuoyq0hg9zn95ex5x9sc02r3locu716zj3vwp09rk5xsu8bcc9zsbtuwrlakgbecchofgk1c188uup7froju036ldm3b2h4du750fls5edgzbh64iscye3arwarpd0urw7ei3qievl62qg58x0jxk7l1x3ndhl0uxpc8nla3x97ezfl12bp2l1fluokjxjrway3lxp7qjtrizza4utk25afveeq10hgy9oisyhlb77taq6d92fkzfwj3mdd08wbi5mf6ki0zazisktxmq6vado0ypfvwyu69jyktztfka2jgotl2plfvqvtz1mnzn',
                        redirect: '8akv6af4m29ma5mjv8swqv89grofq5v5bhj4xx6xmq50kypbghqjkl5wja3zzizu6cb6ohr0fl9s5y67bdt07xheyc5kz2z4tza0ggkxzsfxgjhf6yyjyv3xr1fz152znz8id8tcjblx0t6eh33c6gtbw61koa36dncidz2xhnonxzdvlcrpl8t60vkozwgpkzhk3h8cnlame1jy486o7w47105wudxcyng4kpks0e9hisiuuu3t4l9ywjwae3ibrkaznxlc6kll50fjh8itegzrr7j0uajsb6qg7f8xhs92c1x28m4icoz9gs4j3damkvbhp5menlr682xff69d9z0vp5j76n0g5guq1ggki4s52ugjtu7dpsqq122e8x50t0xeco75pacnssmrf8x4kn9x5mizbpnqalkl23ool4z95c648z6029m25i32mjr2rxfztf8ow0muj5kw4h3vdhs8ykup0o7p19697dyxy1uzg0b4q1a98gg2h21ht5nm684gs4hva8hc7h7eyjw66z5e3689of44e1rlul2w60g13tud4g2q94c0ezv4f46sybcyiq09ck589k3hiyqpu34ddvjrow9rs9lt2gkxdngu3yzxv5366yjf5b2b3378eqczvd4lv739g189a5b8h5qawzyqp0op1o3rb5g82zsrbcitewnlsbhl9ww49c3g131rw3elbwk030b7ave908w13pn9ossxr5ge7z4oj38f3lpzhado9okwr492wwy3wxuz5h8s91gni49dr08ojezsz3ea8c6z58s7lov6nqx907d2m2yezqeljjw6qcoh1aw1lza1wle8eodo432i3omyke2wn3ehk85r25p52ah5gtb9hw2958dsg7ljwa3snyv4f8kk7e4x4qt1nh5ww1gm8bv2adn4ggxg6c06vqzhquehltvjoq97cqno21hppfh7dc4v4x3qnanc3mxehn4ebs10ubxtsy7zy676l6lyszz059i5jyhy0zyca6m9gg9wo3w6t50jby5y24r5et0e1wewwb3wy9n4yfmn18jx7flyjxlknyptg61pf4wn65xc9x1ztqry05ktfzotntphhxa8lbwifwq25mocorief2cd6cujri4osubpagiwujdy0y3bn97doinx3g62ct7zhqpj86wf3qbqjom4jlg9sd89nmgk7fhgiuxvsqvk4tq0a1humid6dmgj0iujcmtw11bc23ste0agvox7j0f7vwbglgc5bl5pcubtanx1tl8ekxj64v2wsq18n8ab5zbne8n9il85elr7ihw87fu2o0bs684nav8aqcojy9u0p7ca223hr7ivzen5j294txvpxexi36kmgg77myga4hw0bzvum95kqg942glixmrq29o3hpsz1ijuzrffulksxs5grub02lz2xmq8fx9hb3sl3367578k6otxaoagj7wi5404njd4alffwpes1jzkp6keb79tpvywkz3qnwnrovoua0cimwlkwus651belriz7d1iyx6mwbr80yhnia76jjbnz8pmi8fodvf5xirsmx267scq30wdjr5t0o0wtgrgjq99yv1ja2pvv9hf7bs94pzx1c9dxne08csfwoxl8tz5mwv0l7zgerymjyza2bfb57i7c42np5tpknbas0tzq69qmtfkub5lvi89xado8dfgpt9m933rw0ewn7ixozvv2o81gvgnr5c3mk3c8rjze9kijk3kff7ew69jxp6glbutdfecp2y4h6jr6odujg78vml0ilir05anlfie1v5fp4l6u02mjy3617nqkgyuufiekhhak0ts4bll20ile8n21cech7ghm3rlweh0quymgqjgxtr9oabae8jqbhlxjqatduct7zsjxxnfri13syo1fjyzif8zal87e5u6qq9ov6bcrx6l3mvmnlle8n1jdvrpv7m2uimnyx27xcgg7ne1bgwut21ny2fmu8glarwezu9ryxkn3h0q6kpx2w1zt9yem5exe2j3eve4edsuj07q',
                        expiredAccessToken: 2134115220,
                        expiredRefreshToken: 3835847830,
                        isRevoked: true,
                        isMaster: true,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', '0772e1fe-c410-49fe-a19d-ae9a4f1044da');
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
                            id: '1bcc1d70-90ad-4180-afa1-aea944b6e974'
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
                            id: '393943d2-20fe-48ea-a94d-4b942e14b2c0'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('393943d2-20fe-48ea-a94d-4b942e14b2c0');
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
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1a451771-95f4-4ba5-b622-2db7cd43790d'
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
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '393943d2-20fe-48ea-a94d-4b942e14b2c0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('393943d2-20fe-48ea-a94d-4b942e14b2c0');
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
                        
                        id: 'a2763f70-5843-484a-861c-bc3cefeaf3c9',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: 'bjqnvo4b8a6kgn0rdux61fimtcvzl81qltlouxtbgnha9c4kcalwiyfr2ht37epye6umpyyd5ax240erudd0rqc1zpodiy9t38llthwdc5wc55ucmrg4unanbmpgm72arane54a0q7zlreq8709jqmx1a0w54ohy5k7ygh6grw49srqw85xdhqyqsn3difilbp3nl65xei1fm63e1wermneahscjxa68v1fs28klmas1jdam6x646altrgrflik',
                        secret: 't18q27495kje4hjgto0zyt7f7j8jvgdceb8q6nvl19x98u58iycqatfve8x4ej3ix4zpnrqdmvuy43fkw2o7nv0312',
                        authUrl: '9bm5ld9rysdee6pjkx4rjjzscoe8sh2cucjg93gqph73h5uq263fjmd1l71pa0iacrgwie3gxaxmw60m2aejacicw16c9f6f0d3i111f1ek3ilj4q6t0t4tg0lf8u1ta6txof4uhmgfdu165g82cqtg7nxp23nq0v5frbcyas29j8ymi2f5uy5m2dkwzk01f5nx5r9o9xybmqkyc2oa8ooab92c3yslm36s4xcg7iwqit6e7njp92fnghsi7n28nrcu37cxxxdw2gi6wny7gz2ttsbbd6h56dcp7f67pc50sgs1eq4y9lz819reufc7spxs7k404etpxy5cab75gsncflb8r4wnevz247q2gmg6ehc39h6cit4riofgc436vracu7n4vdsshubwqnfgeiap419oqpnviiaqes07egcb2n0i1bff3scdh6cjweh1xsgfoktfz1my7flq6nrh9dph87dwnh2aqvayltr2h7mon0flm2dag9wprrgqoxi1l06y0ndforqqzxnx8higu638bdsftkfmd8aqs6ex9cyffrce5lmcj9kmw8mzziyk37bllrctj7rjuk9tq3lfmor8j046qsw5aq5szruto9rbmi3p2kfd3wfdf43uis11baka23cytdy4x82c1nyz0p98nrv83cjb9cgs4i1oyha88q9bpxaxjukie6ln3ese8o2rmjg5fiarfam8mlr8r57ys4i1ucn39rrfbx1ew987qcbd0z1mky306iu7orvqq9uf4s66fd7tjqpzl875bx9w5fswqogskgma5q3xrorjvyrvu2a1ddxatlcdizd804it135bmaegdzozert0bemeergyjijtih8fjkq8upql1xhpewpp87xjpfr3rr6k34plfl480vponhluz6nh7x03uf48iscvxm9d76f9md1vn2xq6248g068h84y88zcjgiugnlmuvaglzkwizf66oyym6dmr3peaypafx80bll9wkbn0h207qz7eynx5dyw4vuqvzlomnugmcfuyr1q8s5y5pyzs419t7nvweh3nbqvxqcdfbuos1kc77rk4ry2xaofn3l3by68d066aj44cthxo97csapfqq1gewho2f2bo2ft7ptq3zcssuec2fm05w2to5cxfmnoffikyzyh6h1uzxc7tn3gqx70o3o19xl8n5mm7zr4li2vopo4lvgawoedg6c1t0he8ej7654yism4kckeey02ian6j50cnu3xuj3z4payisclqev4roamtc7f2p2ouao6qthaa4glc8z37tespws8hki9h8j1ly1fetgvkt2wtjpvqszejac5i3bno3ibpscripviwoppg7do6h1mqmqku2pk2vu994uwqexigjmgnzv141t5e2vrqidov67xteb4x968wmdd87ve2o6m6nf8vpvy0jfp8x5dlbrin9eeloub6t7poluffzdyj785yujnvsa054rel6h6p77d2v34fp8uupzip0x1xv5krahqfwzrjitbm09ins8zv7f7ylhi4y2989seyj9m7o639f5unttds0a55ov2ir7enkvzc730q59cgm289dxhx4rds75dwrmj0vc0tid4sfnaug5nomki57tz5b58hd8t50vgmk70rpdtn2p55q23ngmtmsfz7l8h2z89k1xvpo30p0rh28lvv2ywacahyzh5sohcmam2qnfcbpm1z4dkhks9twu62eycmwxn2nj917b73rntqigbb59rbqi3626v1bor12uxshjvmj91uw8t2oe7l1c06c8mbmfzcquetqm6f6qbq1z42nhnq0rtbid0ctrm3fri7psv0fhdtvkyc0pekegar0iu0k08pufi5l6k6ujohb9j1hnpb8vf4k1nrd2aqhkn502xbu98ucvdh1kbqnwhi2q7i3302g7whq9ss4hoxr8evmqouhrmdil15v0gdrfwfg8ipgwhc4efuj56rk0g37uucnzmcxkijn5hyjg6j287vh0w65umqaygd5qys5sehmul6yi0y',
                        redirect: '7cjdkn5gxxkxp8bxg2uv7purz18lu4owt7uavtcgmij1k7s9302176yyz2xgl7qjsi8fiddfbajpblhaajqpxxoro943jcquvltvkcqb49wbzjnhwvett15ove9oi0ddrm8unrgbwom71bzp6fm1ngndnyluvqiowgd0ekamh3d965wk1nba28sfbl9iyyw9otwe415li2vavq9ljrud6pzfodttl4zny49hti4afcgkfpgcl4xyp5engrhsb89lfznb1ktj2p4oymddut4wth5g91stgpc0ucz1xrez4r4rayo25szwb4at3z7assjze99quf1ucy0u3u8rzuc51mcxgvnybk6fxtgzgioe7vylxs1cawm1pg9hjknasm3rbt6t9k17mb2jft0t5kweb7msu3k060y1lfej9nd4onoov3v15lnj0vcd4htmttqyxf4tqqe2usgwqnq9q1kmdbegbcu6ptdm20lua8zbdok0fo11tntdz21izxuz06osiefrng6hoqj0p4clk37yr2veembh891al7r1kk9zg3pfnk1ipixw15is20eaxktzak3se9hmfb0lynpk3gartdemukjzuv7ybex802fatdn5etuht8oanhj2477smnor40z8rlgwyzx70iztru2dlazq95kud51641woc8r754ez87rs1n5h9fb3bmkzqzs4ir9rklcwt4j7t1atb5z1j6aa3fep3ls7se040qc6urdl621pugfrl398682kmbcqqyh4w7janxgovn88fcjb26h0cv54o65ixbfqccrnfwyczrbo5ynj6rauxzdx7hs4t925pnojkhy3gvzzn3eer6x4td2mjnihnhwg4z3o9gl9hevnd5gks15z3tcsb3aj483t1ptrc84lw2r8mbri7ufnarwit1uaaip5r9vwpdth0y0opi5y6zxx48f3f94qgjqr0l7wilqtkbzc5y4wut5401m4stvyiv8tusg1ywzpux3uc3pn0mn0apvv7jbc53l0ws7z40ip9rns35cicetfs2junywmermhfv2ckehyjyiz1fovgmkvbogbqqbmjmu1k15fjdoileixrddv4nq0lzmwuaa8g8jfjw7522go6ndurutq2b4m8jp3ayun5df8079mpwukc2qmgxzd3egtx5k9h43uswthxk0h192girm27s1givnrj8m06t7o87m6ex71wq1yby98bl166odtir6cf4eio7pq5026drf2a1ossh3nmchgnmuff41cjzgd18p4hpqwh5e1917issdlzlaj6pppufjb3hsybsee5upvd9e6k8jhno2pqgwl3empdikrtueifcn58hyuq895d31xfw0xrg9f8u8vd65zrfetuezvbmgooawncu1m0diz9iq9cz69a26catuqn8fc5rhptmtzgj1szupqd17eg3vjap2j6lzeo9qj6inmmqu3ihqn4lz8z98586skg7g1jvcf0eoo3avlcjl6md4nioix3d4xo5v6gy75f9lsemmmddjyhdn3o9zjwquf3cpqbpx1m5ezrkogb2sfmce6win11aw3us7ej53n1najx7fy42fw9hg067os7twm9rmrlscycm0oer05r6l6fd8j8k5mjufqjp9eut1wp8icgsa1w2nxrnliu6xl2g1jo6ibjmv2b2ac8eybkb3q6uihnuuqzlwt1s6pxs5sqocpcac4e198ibkj89c8dg890gk9m23aa63fhj2ov5y3u3blsdowc6h03y3vwhp1d2izurfjntiwjr4s9f5g0pwrzq3l1rr8otv978106gbvjxmb152kfpg3biojgmg4ndmhqkj2mlonbeubzh1t5vs54gg7bhwyapgqs7dofl9xhayip2xgpz0zm67xuv4oaq7nd6fjdzwq4q5g5x9zzmtj07rw7rhfqxhrybv7yk575nkhvm8et62pzmylkgq133r97950paqzwrrk0y1rfhfzjqpcmrp4024sq1huy27ys56boexdyxq7t19opo1s5hs4',
                        expiredAccessToken: 8742699441,
                        expiredRefreshToken: 9571746971,
                        isRevoked: false,
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
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '393943d2-20fe-48ea-a94d-4b942e14b2c0',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: 'dyattteeu4ggvrh19io720k0rurytbpom1460apc2js8wjtzb9qi6wdlkngfkb5m2qtd7mj3qtrneejifa7zvay62l8he3xwrxy9pl7ief20mjhnjsbwvv086p5yor2mr6ua1q6yd3vpwlu0yumeds3cjz1ch5kg27a25rtff3utzpuc6k51z044oxdvg7j7d4mgwpemxxkttdisw1s1ouaokh08fm4roqynhuy6u8bi4nr3zi4kqxz1b1pvzpj',
                        secret: '0wy37aqvt679qiven92r06f68ienl18mq3li7m7g2vgo4pki6z5uqrkm5igo9twqmzk3v8egm7tppwqr1kc97tzq4t',
                        authUrl: '7cfxtu0tyvbrfu56o9x28kery9rm3b7m9n4s5p9g60jcugw8347cfvykkka9no1z0d44fzqrimnchtscgg7g4s3yt58qt0dd3vv3ij07fdyfw13a8io2h3yq3z0dk42vk8y4vr7ayqhgddlqjp78m5ghhvcr449yfl4min1lz7krqoqhyh885063go8xgspibjltxqld7wzd32w05xvy3cba2erjp0yil5596vf3xil14pn8wzoi1uww5fml2ywlowo0g2fbpka7f1lw5di3iuy9py37spr1c1pvuutfeijl3j3fnro1zbweiyu23rkissdgarba4960b60u83bn2fju40zqeym1w3x1jhwxnqfmobgn911dsle3gny2alp2dpwl7oyxh9xlx7n9ujvm3ytgc45qozt0bhitusoybst0puq7zw0tdlvwpfjwhqugq1cpnlemh1z887ccw6x6apa226834d4dcyqtjjkzxx13eji5sk9fqhtnygh1hymynvglb7wwxa3me0uyc1lhqo2u0jcdfkx8akayxe396zltdwcxjcrtiwjoap7wwqfy1s5okvk3bmohsv0gxh7ml57fqel75k5x3l4j911n4zn5umvzwm17be2ml2gmo0qhoc9zxh01hcv86iciaqclghsb33ibq2zwg9hi4fqmk2h2gcv1t2k7fk2q3p28tc3xmsbdatl3c83zqd2s33f19qz5lev0x70plwbwhm5xlo9trjsu4c8mszdjlvhafyoohkzxashpq2bann62nzipwyyd9zbys0lmn5i7ourkvv9wdbysdrlieqmk1d5udna9ni69m5o6r7v245j1glfou1dncc5wrpzaf84jl4drqpnh839mblp2r1ru3z2xonzj0mgi2ngafyeafhrutger692d9n9c0mmr11ocko469qvwr5216l8flw5ue4wyguib9uq97lnn4agt7df9laalhazxmzej44mlfhgfk1kcq1vtg3vhfne1x1dint4uxm9kbtl1080cjrrhaem4yzjc2p9cdeakjqazklqn9yeaz8ry3b14zta6591lhg6twgmoxn73pfp91wfhbbzonjkiofb85bgp1e8ibo18kke1nm2gdmpa9wxblqwbmi2gxtilidljp8ei0a7pwajylibojuecdn296v4uvq3zqfnt5ym9qwqsztxuia13tk9abphvqgrvagun72qo4bxd6ssvwjvqzwasq9t3xwsvctgwns18f44iwo2gxzudot72gz3ne3wkfi4bgndkq4m0l95jgo6gmfc4pinlgy9td11ur32y0okxwvveqq0lgfz3ruxpsuicfs628c8phyt8q69o7qiawvq90m79qfn423r5m3900skb74fypwhhazy4u4sbg3wgea42c9dqn75rk6yuwq7zxyfb6yfkol6h20lxenm68rjmtddqpdh1uxvsot9bs23hspq144w3dtzsbrfn5xtypprtu9i1h7wy7o9d8vcx43yan70isjbwuh1zmdf3a0cs3ljfjolmr1vwiug6dpz53h0d9live9wf228j94enjo7yq4ak1f8c59ihf9y58m5fj7uzwahnplq29dlv0pqau0cutckwn0phgk5a5yj7w7uidgoxorgx0csq25vvaei0iwmkr51r7azm22np9w9ukx45vlck2qe15dx0mogztcfwswb5szmu0edg2zv0rxa4tlofc0ockkd0dmhjuumcdgw79wc1369jy7v2vgvxlxhepnrqohq40684nl7dtapu0r3hv6sktd5y874p4uyq87gtme388vh1ap7s4dqpe3qric36iohnwhmapgmbllxp5mtuefx9kjuom2hrh0p5d0wvx4kyobxzyf950jilaivbs6s7mv11lod0k2y4f8x7wuo2onwuqcv3dwzxbm1oftyofru1yaau0b005i84jyqjd3pd07dhh4pql720ddq6rh7omjymlifzzv49w4n05qtp4gxh0ydhtxkalyzmaf4dgoqc49j7oabm3h39',
                        redirect: 'x6ini3tz1ngnaj61lfafmthl0ht6tvys5g5np2qnnrubniby56ljs9f2n1ywvxob74z5m6q4303use6f1j2rvuexq9urtmo0hwbsfow6mf5k0tgen2gwcnglr1rdq8o7fvyo8u3d118qplthnonv0kcnk153z12p9vz8abt1co6httrf8sel4wn54h3o12531ln35af1z48p2qqrswonslsarcb70iogifmxxfd0efzllfdj7zip71to1x4t0zidz7e04gvpcd9m472j2tet4bgm5ht2seankpao8vf4855o4xp4h1rv711ip8a2mr1a56za43o9y648rtshc4r0tdzuruxq33w0kvyracv562cj88iq9dmk6xhwrt259sb9rkabf6a9b4np2zjhzcy4hjtvp5fw1hvlataem11hihnucjk8tkje8yyvki3gc1fidbx4rv0arc9h0zhm6ztlp7ww7m3plfjipdrgdxikc3hlf67o42ktz7nrwg47tiu6769raqoxfu7gynyssiepz7wsc61m6u78xngo76y9v798ek2lrfwva97t8ho1ahrmgbyn33kmycmi4jia6e9tw0v85inoidhbtru55i9c8ohojqv01g3oggev2ej912iajno5pzwo805sp2ix44y3ln8dzsie59dz0mtclhcpue1qxulvh7od4wchelvaurl2vvws3b9bi7p122q96g0qdxbdxxxybcfpsu7k3i5ag8jcx6lhgpwfj2wzqx1f88yxp9enpnwl5e0olhur7vis0ltlbrfl6c9md2jb24qtied9ieaqehhym0s4n00dru0r19jyostmksmflfso8ab4cl3h12ltnct20hgqhnmjkhxpwlsuqbsduxs4tpw9uoviwaxa5i8e3g8ojx1n5c2y3nww7ckpff74u14guhqapv9ldzwuw07xr4qtvumkt0kbh92w8ci5oocid3gbv3emg5gttas1ml69o8e7n84akr1fjimvlg3pgk01npwv300d6947sqyddi55dzm7ktur6h9j6ci8as3lg02o8jy2th4w1gkar0cd1prcwuhrpqws93up3948xt7b0apxth2n1743c278z1i55tgiv8yhir7dy3sp0km60bhjann9yjxrp6ghlb02y9yu18pgoxdkbozuoeftk0mqts8ouva2y8trsiryqmvzqp04conpwq4rbij7uljyas4jnkwp35ym52398ar4fr8jl7s94dq97izaqx85dhrv9ow4zycnoaaks6fxp8e9vt6ol309j3690h15a6petnii6qxh602evc21zhuiy9g7ulcu7hiu5ntvts1ch3ow1he1ua3211s4ydcamx6neerb7hmza7sj57dwcifiqqhdjsogepn02prrci56qcgchmjf8fr192snqbr7ohjgvh8c7w5u079b5xd19ksnf2wgeb6hxuqfpy2nn3n1f5luzr7ufsym38bsf0tz1ivtvshez06m29gzv9e7ihx5syezh5ieiux0girlf0pxjiv5bc7oaaiun9yy33au278snl6v56kfdrxrc91z3zuzqocxxqk2m3oa9v62zkmwglp6u7lphm41s5c68w6pdgx8bfka20joyghi13b0mplo46lijch81kqev7yoylqlg3hd89uomdh70ffg5f474lzbnf7h2r6x5g6bvv5g3k1pm5jwiyx5o4rem82asiumyc7f71iclz2wnsmpj5cn8xk67mq2c80l41r9rf15e8bh70cc1nr2l8w1o1kw5p6ke4zemilc28y7yhoxjm7vp6f9vzvmbv7en40kti0c740rlm21dvqaahuk50uxco13yvbc94uqnwcjfa1dte8n22dzlwm0jvrk37xpoh3wgfqwq3zjok48gvk3juo8dywaxcda8l9ydspv95f3jn1ggb6m36iz645rjl8w18ixx4m7ac20zwjvg19shzbl9l8a6c5m6qonyl7z8mdxsoe3mhzphl08oun8gw1a7ckn5m7r8g6srr8kougl90je',
                        expiredAccessToken: 9674823165,
                        expiredRefreshToken: 3006427696,
                        isRevoked: true,
                        isMaster: true,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateClient.id).toStrictEqual('393943d2-20fe-48ea-a94d-4b942e14b2c0');
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
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '671d6347-a9f1-4540-965b-2d7ecfd0e57b'
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
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '393943d2-20fe-48ea-a94d-4b942e14b2c0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('393943d2-20fe-48ea-a94d-4b942e14b2c0');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});