import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IModuleRepository } from '@hades/cci/module/domain/module.repository';
import { MockModuleRepository } from '@hades/cci/module/infrastructure/mock/mock-module.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
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
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
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

    test(`/REST:POST cci/module - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: '8c9l905l9j3u5j8vw4gcbenbsg17fgq9speh5ft9f6xlagc0q3',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: 'bkeecvc0b1r7f8gr1zjw',
                channelHash: '4hk3ydrfi267awqae9b2h39rkl21rfb9ijs2s7qq',
                channelParty: '8l8aqeihmbej49mjx4w8m7kixlzatxoxw6av63xfdz82atl4t7llsejd4zbzkpz2uuqq2cvvd46znd9r0efy2iyeda1absm4w4u2ktofskbzybus3wr2kig2pl6dhn4psk3149i5lyh3uyi33nny85nkdnnnb0zv',
                channelComponent: 'y2xbvq5fvk8jn9tyso6jb0ei45g2cu26d0mefhl5apr3c57psopr54g5pnhk97kav87pptd3xvwrccw1nq484a5bzmf49o122ecv12ppw56h06o687omf2b0jc37pbdcki0x3jjwyyaeyopu7zwcz417v9adwxt8',
                channelName: 'q33kfqvyavn0rau43z7n63hxjr631jdxmw84qvmvt3g2h06yxp6aayb2adzxvxjebj4v2xxdxosuus3e0rk0j4p6nh10wjx7efyxqea44jaeoanpfc2344vpofdh5ljbolfxvyjm2sr9ua8dupd0u8u45hq6gcpr',
                flowHash: 'waaut7kamvmzr7e25ydgymzuu1zu0opwgi7j24k0',
                flowParty: 'pm7kyu9b5c059hoqlzr6a2uty8dxodeh6uz9uue8bxu6mxc4ib7ccgfvuoqpwykr61k3ldgzwav8mymgebifhzej5tsfwl8hjao95iproaxgkf1d1unmxim7f4pu6yhm2rfw15m5rejfvwvmqmmrbvrsp0eps351',
                flowReceiverParty: 'f6hrhm39eeweka7c82gqw91nntkoy2niojk6sfaj39tyhgdxs2bshumn9twekqa2ksl27kspkftfd7dr3si5odyf1rcuolnm1ajhpj0ef1da4bat58ss2c4tamajs4t0i741gxp2gs3939elz9gnviavzyre13ug',
                flowComponent: 'apwi0z63eolxaz8dtdeh8y583im0fdy0m3qxd6d8myyspyxaeb12my04sgcqrtkcvjeoukd7l535tuikmruex9p8ia3u84g7jmbxu0pgu5zanuqvyp6q3z7h2v4ov76c8vcxa2ty189g9vx6dsykunp7vb996963',
                flowReceiverComponent: '44xgdmcvfhb41disoenidypxzdihpxr4oar70a8ikb9w363yykgl80bivuphd2g2wf4zcf4rpv18a0cbdzwqpduvwempz5n4bqlnt9kilzxkopzgjgp7p1pg4xmy5s07v9ql0lb3882t4qh7oht6oj9iq1ehezsf',
                flowInterfaceName: 'gbbyiyhbzj31miqs6y54pmqhp271mtwfagtrepeobbbt4vgk5riej1hatoxk86m68apg1mryn00sclvq03x67ma93g1ad9saxuypwx9tjptcwc8a3jbriofc8os9711q2lv14x65oaiv9upelug1b9mbn25x6m9g',
                flowInterfaceNamespace: '0g97kzx47t57ydpxfv2uwh491cp4dzz9p5jzeqi5ao0mspfjisydvtjbi7dmpg6mkppdz6qx0zip3zo1pnmxdvzumiqcqmxuv56507psebhvkj8f7ndxo8i41w591zqnaay9l6p665e1buwt42knf1xn75n9yvfo',
                version: 'mdabx08xu0wsn22a5gk4',
                parameterGroup: 'g66k5wcsoq4xt957zla4d3lf9ls5mk7ormf1gkt345cx3b42ee3wsfz5tazbjf48j1l6b5aweobbgzz1278wkpdnt9domdzwba53ce9azjfmgbeny1h9akf6en6gp1jxt7kxbyn1jbusmc7x4341iacvauum8d61bch9bzge1p4k8oisr2t04kyjz1gqcdcrbz2erqt5otykii2nhbh56o8m3vw97tem7tnxdv7109go1o7u4low6hybnu5mbx7',
                name: 'pkr3o7sbu94qurd9zfp4xhiidp89lzcfsrq60ogoomm365g5o9lm2y4680ljgptqxtjt9u0jeu0zwm0wlzjtql43njmt81u62vlelya2fo55frbztxicz4tozaqrm1gl0ej27m2lqyos9il5ande06rnfkx326ilab60fn1cyv4iud9am4mvkw2yfuq89j47pzfjqevrovewh6mckhn7xozs8w95vsbk4obcsywby4dcqoznc1ri2fohrw1xejsncbh9oy6bi2533wq0f4jgbhd4mwfv96kl2al1oiqi7vhy4wg8cy27puqc914iwqb4',
                parameterName: 'ai1ll4esy58pbmjc9f9hr7vds92htmdt4arvd7yobmho0zs02exvwy9atxwvwyg66tm7se10l5yf2br1n8s0mqh5j0nhjnlelnkznt6n9qpoma5f71o1al7dk22udh4fzvybcufy5axohs70q6ayn68ewp88mz6uld8408ab46xp7f1ymmg0yiahj0wgnn82736j0aet63hwtd82abpwcz6yj8vglzez414ys39hz7uzwyp4f6of0g39v9dmnuvptimuwiuml8v9ngzms9nnfmhobmiujqdwewpb8sul8cmuf3taw2qsf8o44vb97jgp',
                parameterValue: '4nmg8tog220tzkx2ug23h2nlq8y1g1fonrdme8xbviy9azsqdb5m0y7tc8sikaoymqmrry0g5gy7mydjojenwux184lla7g2i2ljex5pch2ikkswznx636d4c2wz32zlthevmnuwm9t1t3g2ggyh1tm145ux3lu1bm2wd5052qruf07dzd9p8b2ve9mlmd3snos6m5nvbc53cxe2pgpx2rvitm80rkcg6lemns0fk6gg7u0qazabcfza8qnb9bnuh2l148encbcsy5gan48pjhrzpdlz0tj0vw276u1nry4o3y19w4vgdjgc84req7vtiezzfpjsyj8w2iqrq25spcifz7znqfrcqv6e0a2oc5kbgryaeafa41uviqwqwk3p9smtvt48w1y1ir7lxvns0mvdzb0og99zc4dli5cjpt1xi8keuldfb5l7x7zw4qe937ky54zvaqf3znm7trbvktybm4ahlt6isxixpnnrxzjecbw70ney4e4wsxoxxawu9ja4w03efp2z80eue2nl1uudumzu7shb69mysbmh5exxun5fjdpf6ue0vkm017bman0vkiy5z60u9qtul9pf0cptj1r5trnahgvlm8pjkrr2rcuszovaifxmu5f4kloii2c2z0c6scboxvjsc1z0eilkfpga36rwzvali648vjp36z575sn3nrkdk720b6rcc9uzohce4xw5jgu81kaw4b3rohxy6b0jgka5l0gl4d0zdmp5k2en9ri8sgv9jg7rkud331ep44vri2d16fw48lqvewje2iz255r90i8q7rbbwy7t6f1s6rcyx2x57jsznawv4jxc6c7n9c54gli3o138hiuhhqljrlqekercvai6n1ghm5cny9djx0a0cli0carysqe4ru02ruov2z5nq08ja35fxpdye7qekq661ib8br7ofac47ow2eh3d29ddkzz5qqw6lnjlu6ybq1gz654lpzbrd7aivlm34fwe3s5qww8c949y7zh1q39th3ecf6mkygzsztdco1t4o2e9b08zvry74r4tgtxudpgiyv971tzsh43drvv96aujcd3maa4jl541guu6j27zxcyyhdhef333y7w6djergxrn04tnbve92mbqdi0olzur66ezha5qqet9m1rym84zu4jwt3dzhko07t527vx4ihxjb4fl4zf3kpoun2za1mi325z7y0y4rz92tx065psfjoy2z8og2u7wwmps8jzp2n3nojksdr1x7sydw0aq44ak2j6gj8j5q399uqupxb4bqls66534ntuykteexcg5mbfnl9tw4iv8n2abh2s7y4w8jb2afzzyphtmwln3718rt2p0v2uacme1hj9ngt0fagoavsedsxe6ge3mtf0r9d7kd1njgca7afstcoo9q1njaw6bcpa3wk1wq0myel94ih553ddw710m4f23p1d8vc36bpnuu0txoiu261aerp78vrsiw6vz07wi4fobe5zj7maipiz9vhm21lzbrenbfkkk32ppu1rd072lox4le55b13s0ja6x9la9mc7849ix1a2vmztcvxmaxdev3qf3jucf7eld5hk3iaqtcxwwxw33c3fw8rl6j7hfbey5fmmjqwvgc0z3oiwzt57pjvzu7vjlhon4105s69dyrk7q1k8r1sv8svnyy8dmcokew07l837b2nycyerxdbi3ysgpg8dow2h3labbbfe22u3mic7ggfp53pc2gf96lmfgytd5jw4e3a77a7yypvj4g76l61z9wfmyqn099wk27cxlmlu8v52egslm5inthtaxkuj47xs66yquegd8t3b7nkyzunu3a45s5pa4c785c7yvh3r909iv1hi5nd9dzvx68124rri6hyawo07sjwq77nms7tyzwaijva56fofltm9mvqic1ocsgxcroxoub877b262zil5s3405z4351b0ri01bpn7dd82pwze2nbyzx3k3tbtd48a8kbvty34ecjdsnsoignb3yuxqa4odotm969toqux1ack',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: '0gtpu7p0qkijtg76eotovvvy61y7k9yk4p1ep9af5r18jr5os5',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: 'zy9gkrot4neck0l2lxh8',
                channelHash: 'wocfae35xxoxw6mrj1es1qk0n4ivg0ewz8sg70nb',
                channelParty: 'hmikcfqel7wyaruznlbwr12ovmduj5ncs483c8ak9fiyqgfl4tkbxl8kpwb7l95kxm20je9u023uumuse384jr2zx5gc4br0yab86qv3iny2050iwm4r2rsu5t6auk7s4apioe5fw73guyw2kz4o1i4ay2ya8b4d',
                channelComponent: '2vtcjn79ot1uwbwoalayi4h69o3ih08smx11oai24ttn7288qjjjr6mdbao2phy9x4gxy77h90481xdthtmgj4r4rvpw7krx64fc6o8xajsozxestcfzvz7bsj03l9tobqj9bq2ez1dckhplq1evhfhh2qz2hynw',
                channelName: 'wysggyw2g6mj3lhr889st23k0kz441berglym20ae0llyhlykxc7rmlotlkiunwlwziz8h9s2ku018wpcdjld416j4xw8kkar6ilk8nrkxufzkevtp267frkpekj3792i7z8v7iko924814ywgv7tklohcgqz1z5',
                flowHash: '156jxjpb0rh9474gugbfrmjg5r0cwxdras1hsjmu',
                flowParty: 'e58wm8rh7xhgy1005nnp2ggo78s1orl8j7eu17feovism5o8plz4c7rkr99gwo65n0rne4bt2y0mfieqq0yizhdx7zxma6x1gx74tqrkka6t13tmkh2g9b1dv4i4jeebjl77nv45wz06wni93vxdr3yj8j1licbz',
                flowReceiverParty: 'wpzwzlkmrgwrc86jpaiyb90zi24ic0g549xpdov4v742nanwcogtqc4ltxzhzdjkfek42of5kvz4r2w6qtsczbnjjcbvt6ctrmeb264cuo7xqmy4qifozdsan0q7to8msfjnqmce9q4dmzpjwu4p173ul1ymtuey',
                flowComponent: 'n363hgup0x0k6vtontmzaydte0r1e92pf5jc7o0bc736smi5u51qb2xexegaz25bav3gb96blpqg660rfb33vt7u9lx8mhn14ogxvdbjn0f2qp2helflmnxt4225pqogskpid39nrb64z0lw5253srnca6hbbd3r',
                flowReceiverComponent: '1wkbu4m7k160l8syjbecy0hk1ev0beioc6a9835bcj3egk8jywegdq4znbgr8a8he8eib1l18mw2ogm9i7ipcdnjxj44xhqi0gsl1o0p2bj4xjsc6ak430yaottsmi1n3sg43wcqhljz14a62fij1j9otgsjh2lo',
                flowInterfaceName: 'usb52j3c39nib55vr411xoaanhllgwwdaky4c2vk85prp4mvdn9ahq2bqxxqhbj4opnjl7ujuka0szpj03r4f67sratbcm0cz6gau212v0aru961g0r24mahcux40rmk4wbsxdx35s3opstwhhqtk7faioi32blk',
                flowInterfaceNamespace: '09stgole6zbk7lxjhtzlbj5upot21n64oac9dnpy40pxa5jsgilnqfh5afd75mfk8mbp9kwsu8rkk71w4kvt95vqk794pzfv4jiyok63w19ckeaw6ggsvqvit527x9iwy53ttxr9rwsnkerqipcgvhxbyimtpphy',
                version: 'qgy1wdeaqisne1ne7qmh',
                parameterGroup: 'eobovwpy1bxybgcbkog3ufzq188fli57tsd2dvdf73hkf5utq6zxloq6z4i5b846olkekkawdygm1h0dv5rilpeulql2gqrfu1xslp9851gu04dr9wvks8fvisqzwetvo53lwbyoqzjy5s888swcq8q9cp8tz0lrfjsjllk7ya8vo8n1c07c2acbo1o5a05pz4e8eyo4zbt2tmk53pm1rdgyajo7f9ukuszh8vdvqku9zac9bmv7etr1o4imic2',
                name: '2snznrp7gmzuamo0gbmgr44ql48qjs4w0sd1g1qgg3n5xvgyt31mumyx33o05mds73f24vutvou9a229dlebtmobg6hvwi9w48ktnpdrvtu4qyeubw03g9cb0yoon27qd6zg79qa629oq2n0qge394kt2r0s0ouw8w2fe1xpzvtrksm8nvtbfm37vs8n16bsaufhxl2sza91ftban1lmtso1qw05m055l2p1aoahgqnety4n44y49scw3jerag0s5g7xo6bqanrqshhgng8sospvv2cm83klpws8igpkfkfhjfnbu5szpwif8f8hl20u',
                parameterName: 'zmtisttwytrids5czi4jvbgfz6r9p87q8ge2w7o8iagwm2wxw3biiomdjxutx92bfgmrq73wgi2z481n3cus2tkyt1ivhvt7dxit1ovgjqobhqy3jvivffq4it0gfy4kazfltv6i0r9i3j1vo2vyv0sfneys3sghvkm4834ls4r4kx4jhb44e2d392xhy2b6dx48ihgj5assvu691zihoflnu2f7ww2bmiayhlckbnlb3l7po5wuzmsp3fdtnpe5uvnghadae5t9sm15ygk59mq6qoafgsqil4pbsi12i5fmr5o80tqsxr9y7ffnofof',
                parameterValue: 't6ef820zfvotrs41o3dgxafy4ggcaeeq49jir1r6egryc58490kalx7cupysv4wko4ipfwi75xlhtizdvymraztgb3pmc2i8ftrg6oy1ban7jofdvb8gww6bfrlh3o54vjjzb5l4dmeng3u6cuqjoiv5pkvmi9pjpsweaxce6fd4n88vfea3y3snz9umi2khig0eg6bgxvy67cc3gm103tlk7b5xe4322a5zespwlgw7m5j2zqf0fvn8sm03tguamgzgvbs0oueod34b7840vyp4rcctk6o9okti5lup0x8j1b79brdww55incdu745y2i3hneds6q5ve7x7svfmk28mzuyus3e0acis4bi9re3rvig0g3ctaxdf8jxixnrx8b64o2hknsyu7noyvxkwcjfzfdzvq8tdwnvatxklq2sb5shunlo6rjshqhmiqvkhpxtgaxfnv2v803jqaysvz1kotgjkrpy60nv0ypk5rz9zavqlaf1q925dai67zd1cqlqah7nc66gsxb5d8uzdo7ggq47tt85cbem0sda0bbtmfyeh0aw1wvfrpai3wc8p819b5rhwg9j9pjk27rnzcl9rigfufhz1hikmotworqcfz379kl8h5pb1amu59d5vjw89dey3yggstp353ruf0s4u62msqo6vzj9x45qphfcsmara6h125wlxzbfg4b5cbopb19vurfloa5gxs6r1yr1vgx61j8nqe3sa7dg772y281xjbxsixy85u2lh87pvgc7yur8yrimhe90wtpazs734wfm6ieo3l95aol3soqkvponb3v0x50n1a0czd5vms8skdfz6hbxecfm0qmnybtor2xgzdi0q8pl3d03dxeb78iuukv2x69u241gzifuqyh8vzdkvbdu032k39kscpzknp9tgerc030bx1b3htqxek8kyyeafiuk1x8yqr431jzmmul5w96hp6cq7j7a1kradmxhbkn67u9zdzm3k54psoip0nl2p1j4rnijhvlm75jmiqztf4nzdw96vj1snrnu9g194pi2yq392z5oooc8oznp8ufo4c36mqn0j2heorjr6dt6w6uthnn2k4a9zv2u961q6g4glxxf8d1sj4ig0iexcoxik3k7cpi7pdafriq1ckggepaq2kzx42edd0b30jn4zxxir7x91vtnm3o1ndgmz891z9x7bfrn9y8y8ag5nmd3s7y6w8mt0aivqmihc3awd2b3w24z5ihdvfvjvzyrkbky8ktuusiht9hh8onaaw9nl5u227dpocuxamz5udpazsjrondq47bsgmlsphz1emqv34n6nns6d8ucrewiv57bdvee4majl6sf1dsntoant08b2tnm2dq7ieifzjvltyls1w4ureoo8yrc3e3o7f8ay88zk57lyzswbu901al7quhve3131ymvwkzu66muml76m58cy4rxnbyepuvava3jnez638jeml15uccvbvt7wv5fqxiovqfhrni2qo3vtc30apufugpotv00f3b2wvw8tkvms73sdse637s5ss3xk1gocmp5z0ryb7rn4ogsbwt2x7sg7jb2t2ldupufjxqqxti4h880j9kfvjpfesqudzciv9gpo8t2eca4qxgh2foe4zho2g97tyws1ercnzos1f6884xsdj30xb0nn0znk33okheg4xmu9cetywveyjva2etacj2bs7a7r13smxmzo98k34d4a8i5hs3cogtyl3vfyn5qpijabsuyp43yol67om37e2cu4g4ukey7zobu7k6th4n9gquw605vycjim7z2vf2ud1aeku9nutmrnb09fddenw0xd3v26psb9dar7vy254o768upxkdks0uk11jvgog2bwumfomgxgz2kb27vqk9fhh6yndaj4mynu32vgixtf1wb95ghlqrj41tvs3k1exg9igd5mvs141a18d9kkza96skcpfjvqpdxhry3uz0vjallyv6qfcf3y0y1qpcs1w5ztoibowyq2ebdyw9bhfo49kg9ileu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: null,
                tenantCode: 'gp2ffg01r62f082x9hsc7xie334rh0wggbwunwmjwaf95tydtk',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: 'ttm2f70ocg42mzkhseqf',
                channelHash: '00mk6m4sa9uisg6kfydzzab53oe1nb98wgg7dqv7',
                channelParty: 'g3xud6lz3xfzgua3t38g8be9axzl4el7vdbeythb8iy8d87spajccjvr6ih75r0eah6o2j9t0ui4pppr4bc9o5azsx65wsq1lrxleta2suijhdwtqwmeahq2r4xoilq399t6k9yphousqxctylnwqc8x23lmuhkp',
                channelComponent: '3q88mhvsi1mfkzz9xb9opdaowsm20634902uu908iz28raw17wroqej3msuzadkcfrfxl4krzzgvwrvymlyniqe3pe4539kntyfx10tqx8dakxrglszl5pihn4ijsk5kme3gra9w84y9ywzy290vr9yhnbuvfoai',
                channelName: 've0ixacwgkyokvw4ddqpcwapx2jb81o963vn6dc20ls5iknlba82v8hdd556hgkgcnxyavoccbtex8hrqt8akjhzj9hdzxq3ps31egeibym8regemmgi7rvn69ekbqyi1zpkx3qblebtwycy180wrrllgsz5atit',
                flowHash: 'y0l5hlv7togv6zw161na4ugh0b41kcuuwkdc1spo',
                flowParty: 'vt8d6722s1rfj5u6o7o7y9x3z4qyjdbb22p1ymm1oltwmrshepddjpolfyti5zkcdt1tuw87fm8wx88z6bwndio8lldxuerpbno5tqy4cjxsu64rrhtl3s3f3ntrfv24q6xk94f4tc278jd2kd2xvtthoocp96vw',
                flowReceiverParty: 'i1yqohibqmy7y7rtbh8rpaqrogue92ff0niwm2m3wfjserr8cj12ugteng49z21bp896vhv8a5e9khj6umwdmcgp7kjpnhppwg9d2wskxppv2v2i67codwcuorcy4pplfv8fr2wlmpcg4cgxpklt2y3opxzocovr',
                flowComponent: 's2f9skasfr5bcempqcmmolo5o8pt4onhm74qsdnmp7kl7qh7bmtbpzbg1yvgbxev2maxk0p8z9knrcqdurxwf1uryfk1qh5d5hbuo1bvfxuhgn6jy01u3m0cmoxfa7e503u53lr60ewaa8yu5vg7r2vy1mdwolrr',
                flowReceiverComponent: 'x681f0xfuh3dtxgw2s4303aeim54d2v4rugb5qm2rsh87xpznxe879w6nvh2ypu9obffrwsbj9oisa5jico9i7b332ioznigv9qmlj9vtz07knlwizobtuqgpp6fbg6ob02dkthtl6qn2d2ufv16zm5p1oe0pv7v',
                flowInterfaceName: 'fcx27hlveqe3j6ggir0sm1nhfagq3hzjne467nagybtova6sf2ym1el4mxdvlp4cmafh0wrwp78ec4i3afc64pqn3ve51vxe91tti3reawedez8wxt755a3nxjce0e6epjw66mji9rh8fsrujowpmoe1pn1y3dyj',
                flowInterfaceNamespace: 'efwtvzsc52u1qmfg7q75ueoef1thkopwtz06pb3mkj03ddbvqr3y5i9fwk47y6voafmuo4exsafkznmk3h1m2v7nox72c0psk7dl8xcdi75mptbk4f9ms6gvy4wi42zdldqeqwl0na2ddf520xoz54yj60ezasug',
                version: 't3bwzgvftu8q2trw1i6e',
                parameterGroup: '15h30uomq9uy5c0ldinpio3s6fdgsvbss61h5wlwsjtlqn8xgogf6gjyazqfsjltiie2alofl21lgo0iozs7j77pp1qadlns6ybbz90pao3ki98tlh6ktmaiixbhcbwiaynn03i41nindt0bxu4s2utmyghoosrcx4ox6lh7ln5yfugitt85wabqycllxr5dzfy3s5no0v8i1nn8ykdcq9azjasofkcwm5xlfr5sru3kx29w81fhjfzwzq1swyr',
                name: 'goht9il4qlejf6pxscs572t03ttjgdyl4n5byy7ogq23sw4zqh72nemx4wxkcvcq7aivwzyh0tbbe65f66t3pefddsa4ipf3nqlw3qeu9zfyei7nwzchwltz86sg6uhkoocfbs838r34mgc9aq00db4vmxe1k22937pxdt8qpzfpbndbbjdq4yxawxr1ql226g63a1zlf49zcyo5dau0qzfsyatgdv8zflz4mi63i0aeo6ky2lqfnjg385f7hmw955xet41g6tor72tkb3oio0km7ga0mhw6cft7w6n3zmezeavhs5gtwmgebw6uwlgn',
                parameterName: 'qp73o50xyvix7gi402crr7j8mjt1a5vybwf6w603mttaczdyb8sanjml8bxxevdn0yf2d5srsiqiyqnto8972jesdalyf0s8r8nqojv92wo8f8wndzkhx6drjdduo6p4t7grwunvn5hexh3cz41wmx4zxpphkf561xfua351ll1jxpcz4h7jeh8khbveuqcl0l4uutb8mudmel6x3aj770trote7ly01q9isdy8q861lruvejq3e8b2tkw0z3frrz2ol3bnrsig6o12qdrc5ovodmpxxtmplw63603hk0v0r804lxkqxrg76ut7i05my',
                parameterValue: 'gtnrd3s22m6wtfsnfo3wszzrqcqgbnu9w7x3rj7x81zrtkv0zc6d6depio2aflgtujorkour360t4gbrawdbgcrryfclts6ga88sylo47ykaam0foqjlukx85j4ub3kpjmcsurrjcpul7bf8l98xqljgtmqddzfsz9l145r85qqu2itb2lmro6gtweqz3bw61ut2s7kop9yjidpaahqho228latg28cajfh05xg6q55al8x158a5akh7udmroft89d22yj0iugvpqbju883alp4owm6a515hkxmmis92znzxybspuhmh6u1d1n740i0re8o5jplfpauz9vho3xkqyi3t3zeqmbmnae5fupkk8rygwj94f85b1hu3lruovkq8766d8vpwkbju8sujv1xfq1ashxnbh243yybnt5leq8rpq51ez4jr7pybftrdtl8kiust8if14boj2z4iuvgld1msmdrbnxc6a7cz40dphvk5ejf8s50fblg0b57uv76en4x3z4mz0c4v0e1p163f9ecny266iilzva4mlznx1ue3u4a3pkjrkdgn041cinsanpccu942nabslgxasyix0yxdt7vnn42zo2jsvmepayrspdbexvc64kmq5yxttql7apw1veuv43c3v2nr69tq3v39igbvz8rfypncc2kua1ejxnh11wzj8voqy5ggtrj5qp66u14lr05u0q9n4vesyn5c5br82ys1778i9940xhonto4wsyll60k46b3ozb47fxrjytj8oe8os2qv2lmlnps4uoe4i6in8usgk1iud8d8lqmf2aezvoyg0u9ht90z72sqazr062cd0zq8hj2pbi6shz3ttjoku7x20uo3t851h06yjwptuhlex0eiiko4irrmmccgpwpi6wkfaxkeg0srskwrfm5u9pe9ky1xx9octkpzrrwn41tf012gnmofzeynxa7nvznagisjljxr9fdrrk1dsj1ro1nrnfmv7d1ltzk1rxvyr2ok5bgy85bs53r30slq0aw8f4fajc6ei0o5bzq8aajyfz5u6j5uqgvulzglaweotg0d3uxtl30vszbsysso93wkq281dir1e7p4u0kvjcxp3vu7aey0d6vgkgcokhuiq1owj7uashgdapr4ryeotdb3i0n244iexx79o5t621yoyfte71ph9v6cm34w3woh4zfju2vmmy8k3wxgta6mjx1nh4v13mvt8b4l3f9twjbbdgg7wag91xfyzq1z4d17vmy6fedt1r44nvwie9g6jeoo0z2yot60bensohbdx1y57qp1lmtzgiy7fomr7vdos2zdnkar1wqui3q078s3mknrcw6bu8zy1bqhad5lw8ozmsh2l9uz1agoo5l3kzqftuw187zt0kzzskumcfz5n1ba9s6x213mzbxzvvlf3lzd9x1eida96cjd05dgv6jvlxuo0jhjwv3qll1aohhx4iuan3ikumfrupzef5te9alyjbewcnx7pntstynhomm9jtbxmi4zg484zyqc33gx41ftkycfp0iiydiafnr31nt2hbn6eb22wyo439mfmp18t2b9vo1365lpne49ilmg5gi2jzjuyo224r8h1f75kiyt4gt9fy0i7jsalnfjytkuvxbe41g0s00nsnq03z7ojlpts105fgat6o37ao2icy68o5vv8bj9zgd5knm57m8tsp0botz76oor3b21fvqvhr0brjqrd7xdlhldqaerg5nwlt48twcp8kug2ac9v9apyjwiqt32suddq5jtufdvwk2mudcgmmsdwz6x3mk7udmdxxdlbne7lbnpiue0atjzysowwqr06zh6h6g5b4lttjqvr7g7e8g1p6h5wd417rwxvynpna2rx1gw3w8t4fu1r5bwgd1fjjjpa2ivdsee04ptpxpyxsamc3rfgojs56dy7hqyjf3jd6rd9m98kzwmz3win4nava6uwninsw1jlz1d9d0x8xew0c8z3j7pm1oi6ev290m127xjw2sq5jmgq02tuv39d8nl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                
                tenantCode: 'oojhwoni8qjzwj70vl56yogkvk39lciuxm5104zngylq10nntc',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: '9b1njdxs8cdmx0wgel7p',
                channelHash: 'aouq886z1xwvivfa9dw0ncw0szy2dxcdi64xxazo',
                channelParty: 'a728cucfvvuflqslw5pt2xyb8eh38itnin627rymzplak5mrbc7w8rbo4q3scsja2rnq1flj3zz6u8qfdgdp5sr379nw93u9rl7q8covw0lvtizu4hw9yin2y909nu6c44fxmfjmj77nm8hr95s30a389otbzccy',
                channelComponent: 'sxde62nesnbsoym12mt2v4n57fnpcwv9ol9ypuzoyrjbph6co8jkhwrzxe6swws57cy8sc2ouozfx66pvl50b4b7e56t35i86lkg8ggklhqnzig089rety3vf7volh5cq6ll7ettu2whh1kwcgj7ztbvq62f75tp',
                channelName: '1lj4sp8b1aa6pwql23wm79zz1nwiwielp7xvybsr7tbkncpsba3r8b9g5jsu0z3sew8zaopxx6bjfbhxd5pi4otz5mnoqttcswu04xcsv7zw6hrn97t5yw64gs4nosjh1vyrbzy9i0ozbzwp21ykiisw83oi9v9i',
                flowHash: '12y5a04b4btim8yfm3mve568r3qmhtptt4oh561k',
                flowParty: 'vz7kdy5o48eqmpvopuoyc3dvs3smtr7dnc1nvgi2bpq3u1saa6jja7ybhx6vnexrsiv30n9k2vkcgn8rmw5tq05nvjwnwal34vnuv9bx3wz1d4uwr7yzsp7rh3q6ohrvg04fcly9glysxz0dgd5x2h4zf06jmtqy',
                flowReceiverParty: '4ytndgbs5z11mdcw33ibxmrfnawpf2ovtaz23pxf9tnq0ftutn6p854u095wz18pvyelmwr9pqdrakysum0nuf2co3a28i20a1rtaux43srsltf004q076qpdrclv0ylqcla11yyb15j3tgunzx5wbebk54ay6jp',
                flowComponent: '6204waurs6uf7tf68lpj9j932r0yul2te1y0cu2924ez903sqxq7flof5218a10z89bi6g0dbbvjenend9fv73pv2q9rlbg6ki6xxcv1htq828sykyy2q96qrkd53iinh6droomgmzg3fn3yhlefnpyxgd0z289j',
                flowReceiverComponent: '1co1dl5ws6nagt9dahmmazlxav8z98dondkv4whu16boqt0vcj1zrt1vcthq33kyyks8e81mw5zom70rdzvss8dcif9ajge8t38qzic094nk5tfk5iz1y7szvye0cspey863zh7nzvr4atkwm8cjuitmi45945f9',
                flowInterfaceName: 'psb96weffplwwehy6zwg7x5cpu1z1sq6m7bvkwfu1izdyvrryvzta2cmsnq5cmk1j5d352cvnldxrjmd2imsknul5wtmpjw9btdfnlcwow2cxxv5nvzd4j2qwy6b59q2n33icz0od2p6sacpum4t38wensp2fv0t',
                flowInterfaceNamespace: 'dmp35ai62wmr5rou035e9rt6qdbu5gf3n0cd5iod5c23bpf7sz54j3xcrz55c125owsbsmqvz0tx3bk5rq6esnrhy5kbl40n53aoynu1exegkjo036bvovhkjiik9pqrue7fug3b9zwthhk3nxi3cilsb112v2wa',
                version: 'bverqzxwjfumdqxcde14',
                parameterGroup: 'loderrioogsfp8rlrjvojuquwfwcrgswjn8hsbo7otty4d4pnzjqk03gekb7vrfnp2s80pdch8mpxqzmbkbapoid975i9osz3oju58iuduqwknz48f6s4r8m6xzqsq7kgzr6fzerk1rllole2y83hppn6hc6v09k9pcq7jmzmaron04iv1ibwq05cj7zi3b93czvm2qo792imz76p2ebfyawap6ioj7nbdj16p250oszgy2kw2tcnz3ozrjv2t1',
                name: '96284w3xt24o5uix1jm8zy8jbp7u9goi7qfij6xb216mg2lymsaur5z8ql147kkkvuhf03sexrg6eyaxjqj313fja4j010s5m5vfhsfh9xmtlxyb22lw1ilfmhhm47f73r02oownb1wg1ydmtrf3iyt7q6xit20u7j1zg2fr7045ja061f7en1uafkz5h2ypq92pvdxdin6d81ntfjlga5xs7wak2crp6duo3z0yuuajcnc01dazry74v35elftogoibl2y9iwwnet2npohvofch1dfwvw7nmf2e77ogq6q69peu2n4epcua0burv1py',
                parameterName: 'oi2o2im85ozbtgo1ylv6ww6ftprwa6oec6zc3hgi5t7bqw73glr522fhjkjg9zpvjz4ug0qe3wjiynusnzxz4w3gkof6d3b0mtehbccn949h1ayxqpcmws9rcns7d2857i3zu70t544hj0ac21flm06txqqan5ggdmf8gdnkv8sqykp2yai75i0tn4u9p65xj02ikim9bfts15mxcz02ch8g92c9lzfcqtktmsed84uty2j7jdp60mbcp1mrp1prhimbvw324bvc0mthhyph5sujgn1cg3soyhpgwsojvhaubwsvedsxp57l98hrmx62',
                parameterValue: 'ovc8okfv9afvdh0fpvht2frcuhowa6oo9ynfc0pvxcikbidadqsh6dly567820kvowd2vlzfnk0vxs1tjztmrjhavydas46fazapxf7nupsxzegod2lpv9007rkotz6zb7imlp54i41okn1kyx817hfwe8wcp8sc9wc7a5qrxkb4s3xhd543n32uheffvovvgzwbdzlha9bm8l3pi6t5io8duhm0cy0dbxoxlp8jm5aubvdhqts005ruicxg8s7y322yf0qshbbcb3b4a68x1bnykw4ryf6qzrbf6wd6es7rw0dwhcorl0e0x19qy12lri743vvrwe420g6krz0dym5i2zqth18dys04zl4zq2yf4xngcp7v89gqwk23vauqr0rspybqn74cl26sx72oo8wgmy69zga0d8e0eyjwsc1dk279ir3gyg196uvnp3xy8j6qkjqnmvdeb3gus302jv3moknuc2t1ljx4nit7ovcobf890kg83npl36wvsjnaihu5fzvo1m5o6kuk1zag8f4iyu243luztxatlx7xfhqcwyuxjath4byijj18ymdiylyw9cfglrtiljyhezjfyvr97b8lwbtd4lkmt2dwn8rznazm65ebu29c7xswv9zjtdwc77opce93vodanrhq3osaz5rsvruam2sh4xcbjn2m1j3tpvxpcvwwdmgdrzjvq5pvpg7aicxcou4jyexd1n50f3ut3160ev9ufge9vjius2o57v7bts8fqpvtwscziqdmg0dyq6ru0o8exrphcm18mkiaj9tyhdbqc8v694564t02gptebcmgu6xx2xyg773m4p858op54wppz6e37eqzj20exp25os78waa99741k6atlkw4gvparane59tk7chq1c4j9kqvqujbreihrhaxpdxkrnyr13p0q3aj2yjjrxov35zezcjnb0o0f4yn8y6j5y94xalgv5bw4givwcgnhcf15gmcidkrsmdh4xzz2ox8fece62qad5ushvwpligprv8b4b27v80v6mt3x01gfbymkqslq2unnm4jwpdzstt3sp46vjz2w72z563sokcr60mt2eqtjjy77g01uum66669d1ph9pgqzi0z8x92epq49lvkg6yb0jerowg7wxexv1iz8yeaj8jig56e4otw5wt2vcp4jt50retm31a9xi2r931p0vxxlb9iqr7vgmdoy2oh8bnla2im9q0prd4wah1l9e5eq2feq09fg35yg3zob8uiunlfmhmy1dcln69p3jga3qtk8uyym1062kne04z1cq317eweiagkzaz7e6ix5msyfd9kldkwhkn8yp064dyd37gs1k1k3kdlv4qlohgk6n0v4v4beut0y19783fzf3moqyea2acxnkagtd0z42pafvgrldfqavvg35sa2cfg0se874ycp1f2zz4xo00rkarpfyexxzwz0u4uztsi1splnyzzrnaczwd6do4jxduifuasemyrrqf2ef0g70bntca66rc60cwoafg3cd64p09kipgczsfb3tbmqrxb4vutvbjcpgz8jk5s02yrah98ke2s3nsglokzrz210q6ncci2aof3roaa8ab4z8funiwaelz9j7finmucr7rkmr40mmktfu7yyjs4cx7ka3rl8av1xp9ndiiti6u884be8mg0lhmu17z0sa9jsiodfinoqk1hq5be0dc0g7a88y4lfn1r8qrkbdavqxe7h8u8u24jyuhbfshmja1pgyxomoep8u3giu6yqvzm1o5athrui5rem2aetfpa1jzvfbmy2x7yirbhms85ba5njxqmn61xcj215n43vdqukds2aeybjgfymfq3i74z9a5czwosbpveybhw5d093nfp8mgsntml1digtuv5u5n10hqn2xuc3vh1rw5xw6b0pypkloizdiyryqqnaqd5pd4uxwgm8191z0i0xuy5il8apuhgjmeexs1fbb7607itrkbln3mid5odc88h94luov1dujgo1piqq137f0albls8esit',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: null,
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: '28zzp21uiqjc26z0m477',
                channelHash: '9fbn0k4dtayc32ftka7td589eia5pyg7xgmf3x9w',
                channelParty: 'akt5cb8ocj2g3je71ynae94vd4slpytb2y2szp9ricbdfuxgs3bq9p2cf8dlkbmau1z00syzlsnpbq8876ujfqlur54abpdpcldlkbb6qmxjacbfigr1hehhrx2vfkmsvhzz33mfmohy1f8oi9godj2q6vi8q40z',
                channelComponent: 'tcnb37uulr6asgeymjijv92c4w3qwa4u5t31wpz1l6hp6ggrr7as6lqoqgnmigsgl4ats8fl26dkszn2go7u8g3khle8rtc8k6t9sauh58d2vx0h7d4tl76dxgnzgs6tlmvqvkwp3pcnh2u3nlgk8oh3k3jfzevs',
                channelName: 'zdjiyv9n3dvbhnqudq5gn1cyxhxh6i77410z9v5qszslj0nn5fztt3i5cc514mzl7nls9e9t5p82yur1ed4isvstz88d1yarynexavpxutj6iqgc4s4wpycjwgm7s9o95d29u3fcl2ukl1utm5kyqptmbq9wf6vg',
                flowHash: 'srfwnmyrw825vqadxjd89bpha2yybhfffoi3ufjf',
                flowParty: 'catex6khlydfuye3hb9tqd9hrdo965tj9og3fw940j2nzfbe59a348ji9cne1itqz6gjzbclz1ck42xj85dgpe61tss8rzl4x2yn7ip79isj1iufd2ph1lzjpvhp4mnpfnkj3544egc8nkjbiiz3152vpmbdrt1j',
                flowReceiverParty: '6q203u7j6ppi2avuyg4rmsmq8vroxlcoj1iq1x0k9kzct3retxf5w9hvjebhez29r8qngwe1c9mukn31lphu1ae6gaek4bigbls46d8cl6k84m81276x0fi6sxtw7wxcoxp7aifo62u1xvuj3dbj3mu34pbj0qia',
                flowComponent: 'kevqd4r10k35l11n539jd2ijvr2w1ou6uath62ub9ihunr3pgroy39fqy3frkidp867kv7z4zh6kamviw24eqjwefct517cu3p955nc63mkegobv7llrgfzc95t1k2bpbpdyic6gtt3lhbhxhbru5htf0mc6omhf',
                flowReceiverComponent: 'jrtqf7wz8sdcishppi4lwpdsol1w52ip2s1t231cta5m8wcgquxc23y9jklvfngce3mawbbmuu18mljp3z0jfxmzfpmt3041l13ls00ussfqr29m7kws74a1mg9xbfkaio8sznx46dfjcoop2pioqp4b0isnwy8u',
                flowInterfaceName: 'gcwjnrpqvoo984xkta0kph51d6k54mdhyiwowy29ape8187xbx1mmequqj12huzwm9ylrtgxfn9tv3clttz4vspvtvsxlyfv8pu3g58bebax2nd5xq04i5et2nogcva6ocbau6b2hf25sjgfa9057e3zj2wfmr2i',
                flowInterfaceNamespace: '918pnkjyp7jf07e0912bho5jwaygr7wh0xco7l28r7od7eormcwfjxa20zbqwefymkwqsbvng213h6vr7237ftrjbs3fm5upsjfz7461oby06v2rf8uuag6ht617lbg9rvetcdkrmmviy1nhmyuzv0uyjjpo2cm1',
                version: 'hivdhmn0wucyktbb26be',
                parameterGroup: '2moxv9xsify007qx8qexum9fcecl519ljzatdxaeo5w1xc6pz94wp1ki90b0hgh4r2rbgbvesw2cc1j492cdjxvor1hjltvspldjvw1j2idyh0n6iuab71qgo4ldhyokewm9gv0wobfk3hmc24dulltqnkgi1tqjy4gfnq79qpczotle9ek2kcke3wsoacalmeh9xzlyvzt4abzfb5hjcz4gynkobscmzr10rj99tawo8slxyeikhu5d1olt5lf',
                name: 'ip9bmp58s8j9vwbzq6pqwbjwzpr97k4sk6w3u0d6ffm0yq7nzzn6b6n8emsjructlhw2cday3hxrcky2mq5g0arpe2x7gjad8bq713c46h79zx8lo3m444s7cgt6ar2yuq36hgldujtmqklpzmemjli169koxy231zb70apnqdua5ebgtklwfumpxgnlaaf080d5lll7q5eq96llw03j3pz2k75doelx0577v1eelqn3x02h2rzgqw3lazvu8tfz50qlngpqqogouveob2c4ggdhiwojnqk4c7yxnsvdgxtg6z0qmjj29mg42fy27e8t',
                parameterName: 'pr7ovrh4c0coy9vmd9xs5zjo9uda4jfxav0l60z2u8xas31ze7gk42vcmjs87zpdjkwq4zcv560zw7z66r4fnavzi33kaz75243n3vv693lwkokmvx9s8zd4m72cd2n9lk7n36l5evqxuinb4ua6ade0k9v0qx9ygkbifi3j7jd6fspejl9x0r4180xojocqcuuvz520lnahiq2lhbik2svdjfdu5snv4j5h0krxshr07veckf8xyhiy737rpyux8964up6s9y0b2hj7jnw2h83vx9dhvdx8pa94b0hqiyhvzjym1ufo71k7o5rov4xr',
                parameterValue: 'gkhup6ghgdrs5bgx7now0zto22r2av5vc2bh0y8mk140y4741fa1wilvo7zzatj0mt50lwlyl821pk8dvrjz0dn25pcinbuwnazrip336dmv3xkkikis4n4bmg75gerqo3qoik3nr4mv3wib8esf8uy8m4dus87x7yod4s50v0kediy9bwqf9vr9d6bi52wgil1mz6oy6hui57q8xsp0ah4b2n74gt4k9aglew0ojuphwwel8gatudy1nvzohrqld8ruovirx1k22nmuip4caqighfuiskn0dpxt4f1cyss243tdodd90uj2ggtuzshijgairedhk62mxhvxmd1loa4a794u54azuym8gl40aqlsptztxj44ks741hl35nxt9p82i21x3rzlwgt50javfb6o9ds5a42h4ylki3keff2rclwqalyhtp0h49jl3pbg4bsvt2be90hiitxbpyvlgjeowxvkq0bo41sbu46cn5sc2vvsazx54i5rlwk3j33ec3dcdvaanfu75pd2ipmmbwva501pypmkm3gehewqghr8vhq9hi5falvb9xo6frw266nnf68b9usrhz9xb1u8rho0cq0ie3a8i9bvmoranx9w4huo7rrbxu9c2gavqlis0kmi7uez97j09m56kfheft04fhsi59rhhb984ptldmd7cyp9azi6iycl6po0kzgz47yk3bw7tp7gxpnsicpqwkdih3jljbvgl85swzbij7amg0mmdeljqddsee5i59l4abnjc06vzhorqk9x0y9x0i05hcngb1a4air26x9rgpipex0ibua7s1qs98q3vho2vd3x2gx5yc3d7r6xv2fd69sooo15riq8k3rckgrpepxos251rnbskd71ym29xmh7c2flul6fft34w6swjlgck9pw8v3rlrgw14dwn381e6sfvj6mhobr4a718mcgzsqtk82l3heddzbs0v0xex103kfm7v19iqwflv341n1o2jutzfqgkzvgd91hz60gxibcyhmus4bcrtfz5n5n0ohmdxgdw97uor8erdjc1hmdwr55wal0tq2to7lz0d64arlzzxnzr3nfdz6tc7g47rt275z4hqyfl1koodjt8es610lkink4de6h4ajeyo1av0fy4ry24okhuf5jsvc7njv1ry58rzqvh4dn522w3y8ob6pwc387mgk3ksji4phzjmmasb6tecdco3brdr14kv3qqabgqs8rgzsxdnm8towh5x3ywybempheh08det0gpsur3yzebqa47f1cwqw2ukmc9f1dze8lmko9jkmg0wry171lbb2ngrtu3tc7p2un11chuhfpddmgbs0y7db34ub36ar1t4qt83mea0mtxuv31on8nh7jrbz2jugen0ntcak4m3mtr2v72mdljzlqanjy2nqtqgbo7k7e9uxxd5x0y5zdwhz1jdq24255rgvjpm1som8cftz3aalnkij3lxy21ck9pkzbgjo52y128q9m5lsh422m325spnauto1n5tad88mq0l6tvh8p8qd1qy386oikx9hbpgv7gnonc75i4ril451pulwv55lmlz9ucqfqtmwvfbkhyfijhf94q5380928o8zq7iiar8ekpv6v17noyu19n4mav29pdc2rer881vwgwdchwe7j2uznu8vv7nfv6ychjtjrq7y8ym4eimbn300fuxd461ce83f5sfwxpws5bdmk8y17b78klee3837iax3xky614m0iy8y8rnalfr3dgglf0jlb6irgaejlvtcyn04vqjnuy265de60th0rcj9eatlyds4vpue00241h7lkql2mc0pqkg4ne2976rfz5fusyf97mrcsz5a4xu43l504620z0cl16otbtfrpez1z177bdikmb5xlglafn0n2xmaitelzu2f9t8hs4ru21q7tg3242iidu0uy03469lvfz9b6z2dyqnrr67m2zot6lr8fo6aek4z158hjul5e8l3xj5j2bf89jxpnpb0w9o161at6m8xu1j75n85j',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: '0t6ctpvl65l2e6g2mv6x',
                channelHash: 'eaoj88g8j1s04kr26ws0hee7s3hc9pd24dm0ynns',
                channelParty: 'sk6d8s2k6vnwq9d8oeb101uek1rlbc5ey56hcealcdeeikwyaw9dbwmu22j4dhgwtyooz66ursy2tnvlkuimwm67twqzl7j0pqf6h1kl3izs3ote4m35rs9g8jx95agvcjqh9bdgo3uipm56wii2j78iwx80kt2l',
                channelComponent: '3mtmkazxesnmpk7zpzw2up2qfxqpkh3cyx62qnekxmfnt0wbf2dj5b0nqihcbqlpnfxp8ojijx04o7322s5zhy41s8ypwjra72rjk5m16qb8radzamhblpnr030m639aa60272dkvhsbmg4seiqpkt0gttkifte7',
                channelName: 'r60nidvg5yay432hczoomu17rgonse4kvha1dzs962eva6hij58w2g20o8xgcuuoqjuijftyx4ixusrj1lmlok7ev1si3wu6kjfsazhkerae4filrf3b84alomc5sdduo6u3g3lv1lncsdw24y5uhhyg2y3njebg',
                flowHash: 'ursio0v8iygw4bdqvspdwrl569u9se5waqgz8ntr',
                flowParty: '0o5hvwbg8hsogun40e8hctzyji22uov3mqrlxcg8us4xbvv6aup5l5q15fnrw25ipfz1wvwuxmzkcer8cb5yynb2rbe2m1nfh9eulbjrtjswoz6i0xsskhgiqo89ztgluhf3vxjiheezg0izkb79n19pymifwnwd',
                flowReceiverParty: 'e89edvpelq8iit2988juy37mqheewvjucqk7uh5id138mg2c7s4wk2zrv4b5pw63v4ns4wso86cc7zhtquh5t07uxjbdvmcjnawt5lq3gbcntv4b3mx7mq87spb860cy7wi14o85u3jdoqk0jpcwu2dyx0xaqgf3',
                flowComponent: 'cv6ld9knw6qj4nrv837y8ky4c4i492msqgd2etpm78137udddum7ypfwa7g6we2qjzj6mvf8o4graldnrdnbxdi39urp3i70tk6uoz50ykajdiquus4onuy11gq3447uohrbzhn86yltlh9vuyoofbg1itjaeixl',
                flowReceiverComponent: 'gxp6m71y09e42moj2uvk362a8ocnv6m30zgek70s1qhia0d67mqwuojnxdg0u6nhtqyeh25tptn7729w5p8je57y3w3w0pe5gltiptq6sj02o0g6m9qz4lh90q9qf4aqmtr324d4glnubpg05adeu5lcsl9j3rxs',
                flowInterfaceName: 'bm3jw38bwxq3js9s9neww0rwbbcd0ortnxopeyeyinwwibweb7bm81tcsiwplolsqbgezl4k7bxyndv2j1p5na2bf6ntoan4l21gqubisy03tmxxqs8huxl43267kjlklw0jcdaj2x3ydidc425jhywwqnytihe7',
                flowInterfaceNamespace: '7z5ljp2fgaojh8i65t8map4z3rn2vccokvo7tnlreh0mvk03mu1o44mtc03cugssg9ddnttfqh7to7m2ly4lzfjjhekukf6nerhslb3uvfn5c4ufyml9zqk70m0aaynnwl64hfnh7htl9w9uhbbtz71fot626fzz',
                version: 'w1ebwv4eawpmt0p1b796',
                parameterGroup: 'bgx8ky3tykhajtjn9mdpphds0ar79ehrfy3795crecqnisxr0v9fi425imo3gb2vx1bwicikhndest5rj2vqkhmgawe2o6tw1lxqtdi2rpvez0ku27x3v0j0z0sts0qc2led24cusdzvnba9o312tdubsxxyc0fwzlgltwx0i84bcu6r0u7a9z2lg7kjlsleroh1w8yzvh5ngnvq8lewy0juepjpoyz722zkp9z1wmdv8es3lilhsi6fpbliozy',
                name: 'mimrd31fn13u8j4jlphiv40zj2zl8011x5mie6hlz7kic57tn1thkyjonjl0ncjjzrmuoe9tg62ce98ofq63u5ai6d8a4hykra80f2e4vcdwkw8uxdihgmvusky4egj65r3bt54g0987trpmkashgyeqotb4r178bxln591ppqb9tkgjq4q9sr6dz2uvbzqlo8xfy7cuybqpsmfyq8qu8r7etukqhdu7olemrf3te41q4yj3dws0fi701ox6vf8b8ztsurouxoxljjvnwgi2uuad5ry5q2dmfuxze017ro6v7n1pa4f83k2yqj2h3drf',
                parameterName: '1m2gvy924h7osiqx356t7vy6o1loskvfnn7at97z0uxsfxgu1ljn2r06tjien4qy71ldy54bo91m633i2nk1hjat693or5sv3npth5ux6mamtd01zddydluyfq7q74ozwxkp2ji2khvnmh7d0qie6kv3b2z0z0msxja7p925uf7cob7l0bxyspse9o5fwpzynv7omvnof0gg9bnhujlpgw1qzwk7bol8t5tuwfd8xdx0bw7q6jw1uems6mvh1eb48uf9cptgzntyzre6rie7ipn02xuiu1keo8kjx6arcwinotquzw1l7gm70qxkcmxh',
                parameterValue: 'gp622a7f7jgdmy4nrltup9c8p8bgts88vuafwhhaezcngse5k4mseq8wwsdaljxm0qtdkntlyvsp7ek0f59u8q38dbcihsv99enrfknkz190u74asmrgwi2mssaowt0izlz6jfq29cir0p0heboihocja7r0a80te947v6aaomegrgh28n9byqg2q7lts98z1q3btro1bm1ywwau8s992t51ewpn3pan9i3g16jcnt6l1dlw297xmjcgggxsss3gabyoo168qzeiacj9iwstgal7nnmco0qysd6g86wwc9wglq4ca5apxh8370vuls1dyzzjf3bxuitwz833n3ojkwwfxz5zdl50jvgzcownioffrl3kmoiychdf6vpqw3ivxt3ort6iudlu1wjidbgfwk2mqao8v1s7soazcd4hqw3u4mv26lhafp7603yortjk6qz2k24ksnvd6wndu3x6gka2kuzqamsk69zroeg4pr5z23es59n4q9pjpqddq0r44icofq156qm4sx27b0vc8fcv6ut10o1nkw84zssnp4mgoz8qv1kmlslzy8dmh7gc6ng798iie6aa31hp2i97wg7yma7d1kyxq7f8s70udgoc6bpx0aa2k2hvkk7x2upyme2jxegmyvjn232ncrvebel7ec8qtm791v7j9rswsnifnc56unkbx1i6h6b865zzaklfgfjvto0536vbq1l8h8pjrji3ghpqpjb7lhciniosf0m7x0nl19j91yokod0nzrda0a7u0j1wtxl78c8wgsnbqh7dse0ejtzyeeek0348up163mwh790nutdspyieslwnvme0sj3xjtom9eedq2stx3vsc9bdshzvwu141wksv0r8b27i2468b647ne5w8pm4bvdlevoblh3jphwzakrc14cgaeym209hcekmfv9848ssnxssz3dlzi028kfnyoudziv78arusspdx3giw3w8a5jyej927fkq1vw2kjmdpv74i9gaa9e9vaig9fktp53hs5gp5p2tc78mn1n11nqa70l5bn5p07d6og51793va1cifl5iijc9nra2kzojyxzq3k2peueztlibsv4ukeqmzit00da75yigpbao9wedhfrte7405g505rtyjmh6evs0zuxlnpb6x3xwx7wak1x1xrebh0e3ldr9y41e2l552ypynaw4bwsj4mz3wpa50cjckze4a07svv1yf34szpxfpcecqre0d8mtn3ouhnn2warqom8j7mubau4yejwvagn1vd7w2e8g3h5uc3emm66qrk5v8tce03xhzqhqxa2kdmgdgk1g2fyta1ezrsejscwuxudl3a0pz8n5a81guepujb63k2aooeqbsjjp1zns21pihbt7teaxhtvyynkdh4cnu3688e3hpoj2t5khmpefgeqmflftamne087pk6c8j4cft4mtec7pycr4cg3fz0w1vlqeazuypiggcap6nm15yzf0u7hm521pjtm5n7ohvn699lrw7ncy89twg2t7glaspafntiqdakg8vahz9g16pbml32d0zv949ur1crbdvoqvigs064gz2klsjyujaaetk72ulsgcrkufa963npofc7hv4dnr5ejlwc6lv83lyhrjvr3o14jl7j1kyp5ko019ypiuv6vhex852z6gsfiree8lwe78qjsxp7i6cnkjtdd58pasqr2pzvivkvurvzv0fzwf2sn439933xhssldlxhhzwtytz2v29hankoy2q50ki05c4etcsknm0sya6zlss7h0ud6x01sh62w7z062gy6mjbjq51v79n0lh3q7b2qqze6tmn2huehh87wensa3ghufmnhr877heiqzc55k5r2vom9lgol2lfidxxto8mhjvvhx7ivyrhal5160ck23qu3cktqy2q7pzj8y7k7dfqcuxzfsmxgzddrn92q0ark757aszm6zo064qm3khn2y22o7wojb7t7kofu6ij1gqsohl8mt3mfmsi55i2152am2g1pl3n9xm8dcxzvg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: '09xzo9ri9aobxkencskx6vhdfui99mc9l8bvdhat05xopxknc4',
                systemId: null,
                systemName: 'vmkhp2k5hiy10g3a3xqk',
                channelHash: 'rrxukg8ifz0ym9dnxue11dgzo9rd2zwxinz3p5ic',
                channelParty: 'ivot79akif4xcgedpmr1zrzhw3urgu3893hyth4aaogbvu26psebvr67ufa8r9jjssvfxfgykpcj9l2ns9ckso72k0p1u0w0mkvs4n0v1j41tyrv6s21z5t1ktn9y8z83rkjjg5xmx1pfz0qv9g9l66vfyq55pmc',
                channelComponent: '123s7ji0v4ieajpsu7yv8gb92fyz8azfq0qzkqdpwk4vp8ucbtyuqwkuoxhx6aaxy2yer9twzvstuldzhqew39fli6mro2oujkxpmgsldbknk3jncu5lgyj8nxdpnd6ke72urbuk382qptvhmzxkgs73if0v0ckp',
                channelName: 'wp4tzfqzb33sh2mn4qwkpjp2msuzi8zplr02ummii6l7clfpgstmblftcr7p1962ytkhw4glhxpv83dz7i9ws3jk3gc7qtz9txibxs2q3pcdrw230qb2c00h19qh713dmi3cpzn3a04j5r87d8iao12009vxkis6',
                flowHash: 'x1eteb7o9rrw013d1nkgmeffzj90ybtuzj2vi7gb',
                flowParty: 'wjogwhhn9bmzxoa6dntjkxkulgc1ewtei6fph80dtrhilb6a5bpkvw9daoj8ur2ez2mlcnualy5ptyebmwfgocnfubzw6jr5x0si648nlepazivlpj563dufg8zj0tveh3jqp59volr6qhmxxz49ahc3rxn99y14',
                flowReceiverParty: 'z3zyljc2lexjjmb60b0m6xd81hchf44d084prxb5tbocogbozopsodyb34umesidojjx1o538060wycb1fgdcjjhvkouz103hy2e2hdso73mkc3pa81wlpssbru645ft76e2qcr2jl7cs108ba3tp6sz796c91dc',
                flowComponent: 'd3r0bzlvnpx5tf8neoixybkbwyshjn7koe5r6qag2hahizkfobgm9zpl1iqxhjsg4mwxt944m0fw6eusiniasq26dncf88fd628z6lcn4hi2v4oid0z0by6xdbmjlk6kj9u3l4oac9iupik40yhfwt0n6x93qydg',
                flowReceiverComponent: 'zxd606g41clyz5704oxupoilpybpfdi5pvhhjy8ugnws6bmbe5683svmunimyydxozebgjcnhvc7ta43ws19uubnezlsljyzi1gr2gpqr997km79eup27jk3ahxc35wzw1d1ats8sia1ap9q3rvrrunjtybjag2u',
                flowInterfaceName: '18opjn2mewpdltdh0miznmb1m3yp287v7iz2vzsa4fzlbodnexmtvinauxwgbtnch9tarzj6cuu2dq0m6re3vjsotnvmvmut9xxa42hdlz390o9f4ewstu4no2lou01c65kksnj3v1c5bgdchyutu9n8b2bmmogo',
                flowInterfaceNamespace: 'x9xwyvmvislu2sw6cs00m4f0rb9nbq7ovlkuydvvipm5eh5l3z3c8j15ih10ptcs2kqhz8rwy2lpk8rowmeju0trsjcdhwby9gmtr5mzlut13276bepok22121ue7qs3l28ro9b21lbbusp1ng2qnicuzv9jti88',
                version: 'y6t4nlttmcm9soxsjuxg',
                parameterGroup: 'a5o07w2h2778ps4fts5wf9pjikdozzo3r9uxyzt0ecux62tg4lxqw5kd0nbg5w7j5dz9znq6kd5def0skey9qaix5pf08zf87wlkg3m1ttt7yvfcrgataog2lfgvn2dto11gbwvphno2dq59idqw2f6uncdllengxqnx0qh3tpcnwchjfh665aai6h7sk654bsqfo4excbyzt368cz4az270knxk65brmsptr2j1uc0x4bbjbf6gvssqkebqgp8',
                name: 'q75up86jkrtts38qvrub3p717xw7itm6xz08y8vuitj3b7k0b9mzhkxuzqy9e3xy8k758o2z7uup92nv82qub53um8wpe33qfz4i829eydfo6srxnqv8sr78v6xtsf51yqw7qp8kbldvvh5tctdjeuiaklqpxdyyvr9gng4t6901us1rq4q4bdbnei22t7d6h3nygbqszl8mbd3k2bgicxcee6qr7oak32kmshwfd8bgpnpok34nh1b2q8xnasp6edb7oc6prk3rebwy4pg4fvuj0rp2ezw9ffxux87pb9emhgrhy3anjvjg17w95ccf',
                parameterName: 'r0jqgtesbm0u8p37xtxuvb35wwm39vazw1yw0et2xd6y5gcol9k7ttxbgj2fyuv57aq0ff8vt2rf4u2d74g2o61hn5ufg0iynfmjgx7yu95kcrbrcsu0zf7v4hxg6eykktci7kwbitrt0r8xhqdk159vzg3b9e9ewz7pvu74qx7o0spf65pecnyjgaa3hk57tr9x3j0esayn11civw07kx9roanfaoyul2395jeuqb5ug2pf09qqbcmza2ao958hhmbp9snx8gww5zuz053jehsnlbijo9twvhiq8qia0e96e6b41wufcwdjpksno79o',
                parameterValue: 'rw9umzqw64n6lkq9v94o7w6w6h8h8s23emjlvmv3pzdrklqgh2vh0qou4mns186kj4fkg1t4asndigrz2mle2k3sa3pcua5518smx5md7dgidrcrm7elzse18spzsf9srbwn31muwv4ftdvzbzrlzcaqv4i9gcmv75x4gpuf8u55tm8lyontootoz3nx8ii6x52iydjqopw4lup6aykelppqd1omfc6cqijo9tr292j2e9ngqyxmpo32hllexc405vmx3hpbzq68k4fu0786owxcgqfeuxz9t2q9zu915o5m97b1zwmm5glta58rg1houy0uts0on6v7nljp541xqcnz0wlndli7c5v8j6xino8hqsv88sgn2q7imn9x5yzlgta8bzzyq9xnnw4dkufc64ww6h3q1ts01ulvl27tyapptblbmtc81lmfqn9kqtmglzn2atmjyywaeknmzbntf8ar59kk02p7liifn8cxuk4xbpcst3x34u70bbc2rs7lfs50zgg0ewax65j8gkb36ktezhbqpm2hqwqduooww4ew552z2ibc5x2h0igndsjm25263x1ruwcjaq0i0n6r63gzgell0m1mwo5093ka2fy5hrz4igv2g5z2oxy67l517ov22n06dcp1ue8wrp7jbu5zu1gsxzfwozer32rtj9ai6jesgkp8ze23lnjlkk4djxbcgw6zy8yj5xs8vb62jenwfa8jwtfzbmmclps7h914ekd1tvdsqpzjtt9q6ffq1d6sjxv8id6jf8hyzjtdwbm3169f2rm8c6d0mjmeahvizirejpguw55ghnbvqabzrs6w8zv1g7m7xqppkhuyfo5kmsdcjellui5lj4r8ubytqaen7xwfc752n50jdw4mw4h7nnlfxhkh59iyxu0alu3ut5p1nr1cwm1i97j130gzvvhkekbie88r990st6l962hdso65pbabmc7688kr9c0fcds02irhmhdn3i4brjolzb3y70kpht2t6nz74n0fesxx2abnal889mnz4nsozq8d9cdght5fccv80oi7n0jluwnmcmkwtsgt5cnkgpr0ihg8736hzei6d0tjfsgzd8l26h48qx2b84zvup1aa564bxyg7ztcwiwtfkqlvoh12e8ngx62z4dlvhuwukm0l0d1vs1hcqcxzvdd3xzjb805zhc7nea3j019jwabqaa58w8fz6nke5it58evrvwdb2t1iq2iq10fw3nxdpk5i2jg5w5dwajcs0ijvcdpdz7mlwtzp9gll4lf61tj8kfevr3sukir1wiv9lilse7eyouhh1q8qtzw2mq3zg549qmtl5u39r3qxx2quq4lfx8xc74ow12ov1ehxnrgvrok35lz1vs0mqh7zr6xnqutucvda6ejy4cn01m0crqjqf8nvyf96oxxp6ceetspm8mpvanklqwaxcdatried3767s0a94b8vu2ybr66nar6l5xp8z8buyfz180h6tei1pdqirbko67g3c9xuuugq2txq8vmn31z64abbrol00r8kqph5k7vjsk1prp8089c8oj19uq3zd7g83a9n553xccmrxq1ebm96bezovlgk4tr8pp1508dtecj8t9itw11udvyclqbjbjx1n4ny9hv3qn8iomg3to6va3scl7uzvyjp0phfqk62yq4uhsxogqn16mqcxcvf3qftldanownpc0auj7uaq1as2fjd4j55nfyzxxjl1q1tdo6x2f88bkkiqaj9ponilm1ogoltduhv9ukvzk1hsazqlylv65eizsujsuzme02egbxingvbjp2halzjny9qtx91td9tjedfs2n3a0lknhn3td6jrj6mv476hbu1jl3rouvjhx1h6tuis7stgfyzngrg3r8npzxdqg0g14bbv968ax89s1t7y7cr5kcmvxjfjvphq1zsmpno57fgcrniwulboojknmzgx378e7gwtrhcuuwxtrdyaprjuqogijabyqjm35lxwx9z695i2ub8bvuo7gdpvt8h6uwj2d5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: '38telo9h0zyavy5nghgglp2tkzzrd0r4823celjqi4bag68z3u',
                
                systemName: '1htkde0u6bcjj32gnj5i',
                channelHash: 'vbhza2zu8vt5wcx2qa1cgky83k5f99gst85p41em',
                channelParty: '4vc7hc2f37h5agmrenthk1futlf97m211ncxu4lv9n9l1htqp9zityogz4x78o8dwzlccaatddzanmzud0ql3sw8rfflutwnwxurbgoq3jl303jz1kmskl772xcc8st3theawbaagid4abo7u0uc1xzob38r21l9',
                channelComponent: 'f8rsaoqq1fkalmgu89v00gdpa0iso0oht5gmbkhx9hon29xn1we7wdt79ay8v8mw6sj9tmzxskz0oobbdf4cn4ziligfl1w6vzr07y5x3kmjs7olvpmfd05f8dhqqxy529bdyrng8cdutr9nahnrnxhbepfuj8wj',
                channelName: 'd3vg2rd377w6y9l1me8117fdnd211i29h6756nyww47vtc96isdhn2tsmly4e15wab8ykzrrt18g00z67qyj7misfewab8jgm28zs1lje1ec6upl5jzzyxrmu4gpbnqoezwpx811px3nzjyfd5pbzapd7h31t1ab',
                flowHash: 'eyh54p8ak1aiiw8a1lyyecmlzkgxwti86jxnl6u7',
                flowParty: '13caadzjof2wwjwasozfciu6ba8z0b4x3we50degwlcevyzjsa0lk0eiucq26g2cp1ngono1ehs5cu1i5cgpxnt25pgsyqlb346azas8wo85oea1yts7rp3spjufnm32pvxrx56c55mvfe39y2lsm4kg8fwl2gii',
                flowReceiverParty: 'icyaq39s1oolyq6bdlqczq3oiua5nparszz3pvahmvoy1m62ldavij0ehwyu5osxo57uinlyyo6yjjbq0d9974m44jkv5tjdur9597olhqt1cxxfutp98ei92tolxsv7zl9lrj33zm47k22eopcfh46kk9l5scfg',
                flowComponent: 'rzwwdub742bi1tnj2a1jebyor9gr43wpkbuydmcagcb5dkbxpcm3xx4whpwiz5uw8tbr5qmvm2qrsdvbqlt7ypdeoc75ei8olds2xkwfwuff99ddw1ilojvfpr26d2iviws8obiempr06sfn1uliyv5fohti7bxm',
                flowReceiverComponent: 'ey4vbo578yyhny3t9922994iz9mcinpnvoyy0ka0amx4xu6cryh972cghl2du9q61fudcgm7xh72sl00ky86kikv9kd978np1e9bihfkbdowz7oxi9ripcuxvmgbsb15ejkpz47zxm7up4rph3sjrt2181t2x5kt',
                flowInterfaceName: 'haa8dze3q8um1al4euivoh1rosv8rle65obc41e5yiwz915g0xhgoi2d5tdoa5erqz1q1piyhz9pw0xb4jgleftn9ky3hqf94ow3kv4sz140bgg6vxrvg8oves9x7n16pht1uc401fddvlenq5jp9dbisilxnbpb',
                flowInterfaceNamespace: 'z3as07t4epdw5ewx7f34q2soj5yam19cv8wp6ek5m53nfyi4h0ks7b90k39jo66bs5i0g0yyqh1uj60hre7qs15b7ef41grk3oeba5pcgxkk9oty847r6n3a3jhhtfxcnsvuyxgsqyuhky1kdkfcgtxd2h2kmq4x',
                version: 'lf5wrcwa68p1iarklms6',
                parameterGroup: 'b1u8bvc5zzohopkckbmfhn2tmmh3ovtr2rrcfs2wtzljm2sxvc5imkfcycwqzs3y0fhy4cju4ck71u38avbqkdwf8skssuojsco7mr0mxczt71bqj4biny4fkl2r6bs1plia2gmoz0ihojqhn4x5y4whn2n598uybbr6i4lv0vfx6bkdqh7ylrfisruw7r1n54hpmn56j92j2htxgu0t9fz7m0n3iui7g1vievgfopatg97gh4kgilxhrb09lc0',
                name: 'czx0ns2me44t6oaukuwu1ecxmo70x256owtm30gacq65p2a85ti3pflto4bwh4df418mol3nvigem9hs18v9lrhrf81c5md15ym3if7pt446dlhgxwpf5pbtclqtv3najeim41o5kn1m787v9mr859339j0mx8fq1dhh75vzjasa4k1ie7z1nd5fz0jmj9v70gevvh2r1fxejeqhf6mswm69meh9cwkbk6o9v9hg32f1euor9yr4sikbtrqvm4w25w0wcowuv4grbu6e77q80v6purv7p888a8r0ocyq1os85naw6b6tgvlo0ipik16z',
                parameterName: 'b94qa0pregixeeumfo48bcmptwlnqwbiw4emsge686tc3mf1orzmt54hbhgn09ljua73ex4akxesp6qb8jdaacs0rwnprurf1bwpa9stlwrq1ux39v66gk9ptsz6dt3mys6rwtxno8gqtjj2efhnjg7gv0lvfdtdyezf42puw3arv2l0t4wuibgld18svwth9janf4oltybseu97acqaynv7s3vcg7auyqgi7px52q6x2lnctf2cv3eg8dttauz5dx8kste83xobmbi7nnm6ckwzjd4a5rx55dt58t2zv9ka1j7jixbi6d4dsnjl0ip6',
                parameterValue: '8q7vciliront6xgckbbbhpwg7s6gvlofn6cqut9rj0rcggolehxscmfb2lbkjwu7t8k3or8fgi73sc4zb5rixneiiguhaj5x28oucqb758t62ejklf2zn3qcy6dejfs5osooerki86ppvatzx2peplxwyehs05p589r2hhcrj9opslpqm74iyggviqbm0teh018mrz43dea2vep4s8ifvz7febpj4iqvfuwz2kvmaum2yg8zwxegwnou7wd2jmuk1ygzt3dif0q0xrq481atax0r65449q2227nluj95xmdgwratjoiuauk86f4w2p12o2trtyk0cb1ho8mzewu3hxanncz990ghuo0jjlck11hs7sp0fxa7qvv875v97pi6himhdyavc0sf0s751o91815nfmd0g9zybyllmktr5xfi57z4htwrmz9cb6qh6d97w74sez3f2cjzurwub4vld4f7ju2nq405iye76hg9s8ufyhy2btmw14uf8lytzozm4t1g0x25basuj0736ma78lkfybcej74yz0g9wm2g5frfu753cgyah4boskfdz3hog36sgt8tmoozmhatwdau1zu37lcbhlct2fvznaecglhatti9c6a3nywx3ej8e8gaibbgnvy237znjy50waumr1e9py4wawsbjigjjn5odr61n6apgin6c2kkrkszxb5kw31io4eesc9c17vrtavnptcy7wbaakxyyfk89x6kjkppkcl954i830a35002sckwuzhlzbhcbkzeyhd1l4wlpse8aac4v32i0qnra5k8l7l5pw15i9pddvq12fl0rj1lbcmel2aaapx81nli8jera7d0z4nco699k0g2scyx9r0sah2o6xdkr3ivkxktu4samninghu6dcejtbadfp6s9dqb8szbpexmmygnv0iuqui5wc3n29c0t8ybbfhyd0ml1w48pbucly31ai6b3ph2rijhvhdisjccuw8rk2z8r4aumg1kz3xvqalkwertng7cexdw0d92ho0eitk1l417boek07g7tohjpzaf2q51kgjkzgz32eblhnnxr8j8j8by8lw3wp1q8v22pz7pnxocbrxj0fa2doj4brjpj3ek5h1vzhvja2bo70xcb7mtlihcsoo9r065tgdwqsy9ra0o8ghzax2kvouxpqdu13f4l0jnlc3j38xfw9jol0mhouwz3adzod5obdofneb06gxb98l3uoext1unzzx49n8utoxu35giuq5ubotj6nh6yonsncbfhw62fqtev4wcswezh6m5zg21hm3l95fqg3d5vhha9vwfzwrikk0zhgi024nxz0u8ve6wb2b7ylydb1mzeec9urzp49bc3x1kp1l3ej2in2jgnqu1ss0fzfj2it2q83hrq6y9he3zadvaeaxkfikfr9ad8844f7yeok4qd33vhovm9jan6p9xbep9vnmx2h8kxapy024woaqqa7ma0dpf3ujrw1tzvb6div1uazto6jdhvskoa3ometepvxqfvdcr8atnpw2duhivnjyexyw59eypyc9pvd69gnu5fnobi1sun15jxqyc0nk2cv4f7wmj25ymagb3i3echurr97btcbhjy8enoy6haslot3vi51a34vqdzqdnka7cww8v3ov6xx5s6lbdetawyl1bmz3n6miiyyoma5kikkgnhxs2kj87w0a4xpnc80z77tt7zo324lucz0555edfplp8dnwh26hhv0jej4m7c8sfqaxn16f8vxe4ibr9lzjkemsanyi2foqxhip41ft5ultpfywvpf5be2tatofbrff3dw26p7ot4i3bhx562bwjb3b9woa5zqozpaq9kpkagri7re051vwpun0oz8h6p5kw1816sv1lp98h84otqvvpzcu7s1sgp3sd0fgu8lfse3sf8dl3tbdr3vx4oetj48e0rmq849g2xq6ir0rbjabv0earjzmwkj64rflztmmiqw4w1t466no7mvasv550dwb0ypn0ahhi890drv5o4136frrh',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: 'v3ym1fk7nl13u2i37qoouk52gg96hhffcr7zq4m743jii3fxhi',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: null,
                channelHash: '3ndgf45wf10ugtiknisp4bikp8epww70o12d22fq',
                channelParty: 'ber9awr1ir7tpsyvb46ledgf69035eis5kj7tkovf2rexrmiwfhgupw6bp21pkg0rmth1as8n8ceyfryoq7ljy8tn7x45cmzqf84qykcyo1yq9wx4palwjvjxuyndtlaqd5sv6cxzdqk2u03hb9t9fv5y3ytstvw',
                channelComponent: 'cs33r7pckapbebyqh22i3vm751vqdxriflxwo5k2k79bvgw23dfm5m38nt78zvag0y52sabk4skqafeqho8f1825fhb9k3jddbk5nukwe2g47s943jytul3s39mfjt26bpqkrk6v4rg8amtw1xslgi43t9h9ph3m',
                channelName: 'b4s7cpmkwmaqb1rbrx5568i9i8eo0txwn3fs7g909io0hi1i45449aggnt2jix1imbr7rmnvfx51msqhx510ze1hugir3s6b20tk2rjn2uc6ll1juhmtacas8hkzhppg915aglgmz0nogy0nh4unvaajcb0dr2iw',
                flowHash: 'tar2pku543ej2dh058bz8ysuipt2kkxkxym44ll3',
                flowParty: 'a0d1g2f2x545br7ttpdniyrucc8g26cp07qquu8rjikqsjy8cvgfamn1i51mvp7ae9h9vn19cof6aumvo5s379j2pipadofkgymijw1k1wkkqq3cmpks4g6dcvfobbxt5dv73euy6e4o7earv0x1cy8tps3embfe',
                flowReceiverParty: 'hede5b3q02vuwb48utnh19zrmgov6p27505saif4moa65f6jyrbwkcvedtzv4h5d11xqd4if07onrgwptbckhdt2bx4f8ztyr8hvyafavg33enqetuuw1jovw2u9mlb29fh16jelan5iatvcei4oktactsqqxgmg',
                flowComponent: '75a6uznkbj4d0bgiudcgx0exaft45zusncltj1omp1l9vf6zzxmjzexfz3qdcl9fxin9cz1bkuq5kk12oyow1ib2td7xr8ts6osiind35j94daf5h0icm40hsduj1txed0twusnu1h1el72acpkf7ii11q3dnq30',
                flowReceiverComponent: 'eu82zo94uqineh2ntr39r9k3dpb3gw1ns535o9e5i38lojjovfzrq8chpn7npl29yd9vpxe0vme5vtupz5pvr5ggwvgrix8vrksu7bnrhc12n9ydkqm0wk9y8zpiqyth5k73mljbhvh3cszmjv1w88c1nqwbeb0t',
                flowInterfaceName: 'yqpxrocx0qfzx6ow24qyqh7sh3zhurhq5qrf67btl37a5rj9zi6fauyp8qrkrcp8n27ub3qfdv6ow2j51f7fqudxmis4dq7y7n9vcihm0ko66l73gy6zr2z9590eg6eoixd5oapui1we6q7thk35ooum36pd88e7',
                flowInterfaceNamespace: 'pb18dw8ksdbni4msuca46zvvc3gbnyvipu4ux8pojbuadx05gb1431kdbd5sc9xb70ezizlh7flrljc69qm8n0xuq6i9n97759119mj3dwf1aes79hrxliwjkyeu2cto7t29k60vkstov2cndo9yn8dzgoty48zh',
                version: 'zxnwhottt0s1tlejgr1i',
                parameterGroup: 'pnwcmq60602i4thpxlfoub2tgzwdyuoe55re9wtqhiyl3qaayzm8sgkivqlwnf020cov6n2mlovdl2s5jg7l1anbek6hmnfjnqmtxjkygajjuuj1bwix13ck20xe3necpoxritmfdu3pfd19htg0io9zybw6378vxoq1bkwm27kx09z9l8ihcaoeriguwce41u2rqe67flqsv7rr61nlyxv20n9gsy112iivkmae7c06ivzbmve3yx8xl0vjxhu',
                name: 'vdb4aus6v0nvrpgxhbg2ard8gpiwww5ir2iiy73r4srab0cg7gdh7g8v6iofbh81ee510zgg39mc1kys71pxuplso521rt3ax3sa01nnbxghuuiirujwqgq1arobvmov518c9v6hy2eco59yz4152h2y81exzd0j0cuxp12zmvi8vccc7mujn9u1g2mfccoqxiz422nev6rkd50ijt80mnu0dqzkf2na26nfm9x0pzxcgkkw89b7wu745j5mi7dnw72o7a0x3war0vww5xlvwg6cwfzss3putnh90vgjcfb7hish5o7oczuj8yc5nyzz',
                parameterName: 'xqslj0hsoucf8y2lws7t3360oiur2zryk63h6byq9s206xfu6dt1ehcp7ocfkf992vpy8cshj6beme2vzz95lyfio03uhgc14hxaph016v92jbqt2v8n27e7qz9dhx2tqd5gun8xfrgcnytcxcn1x1qaqc829q9moybgjlwo1g4im70e67aw52vlznfib8vanb017c5hcid8spr3qjtalfa6beako4dntjrg4ps8x6pwlmee475a6cfu4zmvk4k61z3jzs3cwhs9w9l7gzr0xpbobqa7tno9gc7gbp4x4ozlbvqu9mgmhw1o4yti2jvo',
                parameterValue: 'qpatttdw07fe2j5cv07xbt4m9s7i7d11llibp0cbsj0y9tmyvuoyxn7o2nidpe99a7aw0ze9sigo1s6do3pwgg5tucnayfvuw44mbbpk1uhob62vijwn434eocr06h5dwo6trrxbpfvxmml407kfwtommpy3effuug41u51g27qeojxjdxm291q7rxndxs54byqsuydzx9dfohwthu5h8fs8cvwzttnwlyu4brnjh7mcr2m42hkxdfrdeavw67zbkgvonsy5ao0dvsjwc2dks6f1uc0col683q05aygpk4a03u0wccgehh9x7ojfi06rlvv89jfkvlk08g7yjazxzxbis1uwlzom32hn92lmaxvnwpmitp42mkp2ngo2pwnyy1nltbbs5jliztaeql4dg6p0w7svcobuuf6hkzchdys0yfz7xcp3zebnpkj5y5q4ii0ha9oaxw1nbk08qpe2e5708u90n0igtqevtqgoonmvsyfkfhynqgrlut9hys3hkdz7x15a2gbpgcxdtu2sopxs82y0hyhzzoj1nh1t8jb5l8j4vg03d3v7tzzsqle4z3ozs1vkmfa7iiwlvve3zsv9v75mp8pjr65kq0u202pc45n9g0ux27sju96cvkqambyry061e00ygfg8jnoq1n3y02ugxw5ksb75uss1xb6j1z846ld58yaeqjljz4nv32ldl5rksiezzw9k97i49mjyj6vwi27lt7b5uhdfmsbd5nzgpopw7x4ctip9f1do6dy9efqcxjhnji205cbyzircci74g21g37vsmaq9zjrji7ebk9g17k60ktns77vtxzinr98cq5h030ic9pqdg59hu460vzwtx2hro09c4vz2g9qje61joi6aejbh2wdqimerdbmanqsxbujook5at8ypqnwksr4d4f7umyrlwcxj92p5t6xywthauo0c0k46eh4ufxzaixy4jsvvnshsvezopp7joy12zrcaj0j47lpvbcaygze2zsdj3dy9rgpu6g250md9vqor88gitvdzo62oolwvbr9mbqvpafi67libbo6llkekwhjtw1rx8kjuyrkzg29o49cfyxy0qzi3mb24k9h3n1xbkg0231rkkjugpnrldo683nr6wokd28pxp29wddan0p1mfn8t7pnvxf8ruhfsg6irau2bi8z5kdcb2cood0s8p0lp4s3bphn2ev7jhwcejh26fqdkp97vx6ozqxynnb1vuyqjx4gwqa8c37152opfnwx4vfh6b3bhmt1zqzott1jwmwevrtnwhreq3fl9p4pg9cr09pt8vtpib4ucwy67sb6ig4p41cj0g73zqoowh4qseu53ljbz4nl2ayoocwvh3dua0zmlh7r6gro569nbjlry1nk74ed1kpmcb4a55uxcdo6llkcebcq42v3h4wh8z4z0t069k23h0gg0ujpymmok0hpctrwy2x3xucg2fpq6gbz7w2r3gzz0kbqnwp6wsbfdqwyqgmlb112d8f185t2f6weo1zhrg8kcafag2sedoygu8f2vcxlm7daf85n6x16ncga3s9n35tv31nydpb9g2j92yo0xspbnzregf9jqh4qeztks9agmsumkllh15ldd9zqeazzdbmexhq5ctqq5skq6ioohc0dkb7ihhw4sxpllw60v4z0eh5816o3hd0o8if55umtgiz8fxx8v7cvxnp0zgyibq9o7gntbj16dzq96drkftkhz7g4shu5hpqjuwt067y69demiso9yrns4mrynro23s2tg52dyexzomdla9zeafkqx7wcoho3enilqts08zpmj1lj7b4aauo83bft9n1gu39gybgbpd8w57jbj5zyk503lrzf0xw7s2qt3typreb1h59es1pdiz3q9bko3zuz0uotcqt41of2yiie3pko3s9a3r4iubjwksx1gtehtntqokleey6869cqiqkxa8cu2hl1rb1duygcudmka5yp5vcoq3ojf2wy58ran1l64jrs2r8i05aamzjtxtychw5a3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: '765xd6gkj8hcdnexx29vs6anqu3sa9hjyxnbrmzqgw8c06yh1i',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                
                channelHash: '0oypjitmxh1ih4d36h6pj1372mx9cuheqvd1cs97',
                channelParty: 'n07t4cfobafawmgjc6ic9iec2y2nljbl95pea65pbb1sseegdu3yek9hxmvk30tnh97bzgqh7jatrf0x967z80fgjgtbp6it3z844x98zkea0cli6diskf1xocgu8cvcm3m25k7sovhrikgucrnteso8kq0qcuvp',
                channelComponent: 'mwdufvq4sifrcxi8ovl28j6mrepriwfyssiyikmttbtkelhl30bx4pyv4c93sjf7f8df2dcpr0jil8suy6tl2w02789vq5ywko1c0x16wfen1fptxu8sh5khl6826brsjzjyqlafyzuqva751x4b6g7r4p3zhx6y',
                channelName: 'sm3am5ymqax0lnta31grsss3bp08gik9114numyctb0ad2fta7ofxa6jwhltbag94pwusv4bs9dy99flxfchh7zv0kprk59kfmbu658viukc14mtfhhwqexdh04h6foixqg2gyzy8oiyni9663l5g6wrtamtd394',
                flowHash: 'e9xsp27pxx1affj15tyyw1cpx7touw7ljv71qu0k',
                flowParty: 'bl0fcfroj9fof6pjm9lxhzzq2d9bty2j03hfk2i65dg611z8y2g99i9ah9p2f7685vh5hsu5lg1ezpj5mac7i52o40cx8devwavyruumlvv8ihahp7lple3y1j60qtp36ck04ignlpy7bklw26tb3gelf5nspa92',
                flowReceiverParty: 'd3yc3cndntxrkilgcoaw9xqvoplddbyg4gdaptr05c9v8km4g7fsbcxjj83gpwfw53oci1aqusficr59rjm759ksk3rsrk5ptd728f51tt2d8xgctt5otm9ih84xgghb61s40idqxvk4ueaeelpdpkro1ot0be3v',
                flowComponent: '6v3f4nov9i9afn1ax9cdmrgny1n8r8q7vo8ossfk5wemmi5yurx7nut84aiib317t4f7czsf20svzvhjuwhclflkj5xl2m8ycxpjexu0vngio7oq9lnu0zsgw6min7ymhac4q0mf4xvwqni6lmxxbvhy47wfvpoe',
                flowReceiverComponent: 'xvoapbtkwd38ek7l9qfrsjhbz8opdmp6wun9zb3kriy66h1upvphakgcrq4u9q9j1dg21xqlp1iyge2yoex69suqwb44satf3h5owilgo7cpw9ryjlb9q3s951yjlo0zwa0z16j3arve1m5i05zw2qzsu9mho1n6',
                flowInterfaceName: 'lobk6z5f7p8u5j89hmcgx96eu8ukwwdeuxk4ufkyop79ateb2ipko2lcvwbnocd6tfoje68zww77yagp07ljruasp75v18fa008r7yteduvw9x07p3d5ejrstn2uqqzi9k3ec83b9snolixtndz9rvhd2qcu8rao',
                flowInterfaceNamespace: 'ont4noq1u0qwfjattti1xmk6is9vpnfdyfgv051eivfero8dfycmmv1asuqhj8icix9b4u95b26smq895f7mqgxqakq4d0mhhnoqxnset3j8bhjxtkxuscyfb6st6q1p9pgq7b70gnxbfs3wc5wur7pdph2ly8kk',
                version: 'p4xhpyzn14kre7kx2tky',
                parameterGroup: 'dndwz8w1y35jur2uiqmuishgoh5zhqrv288h36d6nzs6e2u8a0gcucvmzi2ac91e73is698thaoi8iecwkwi2f9pt94nisuj5lkdanvl60d4d1cnlv4lgkgdk82y4yhboa1072h6wuhomhx9h9srw20hcjbmv5l6hbln9ywsjlcpfpea4hwe52cy6gntsrdlbk5f5xr0m6micbxt3k1i9bcssfd9dwy8fx0y9dsmdir3b8rfhmbx3q4ji9rdmo1',
                name: 'ylu6vp2ncmbu900agrt4if0742je5w1vwq5b038x2t11fkb81cdu2wt2q7c0n67ddawzigu4sm0xvpwhjstaamcoggh4hk4mnsgmbl1bens3ggfgodcxdaqpinji2czc42pyml7b6h3pmvjke4md6cbr3cna96lzllqronckgt6lopxvtwitwqyqv735hniaptish0w56umqfotme4ecel2jjyd7aku291posjw1scao11c96qxyp12ss11h8t7b3j3m6djqu3o1j0mn57meuo5victf8yvv8cr5qmz6kq62vhlnemwo1k1424gohdgo',
                parameterName: 'kshey7ou0xs20njw7w3yfjupvvcud0zenpr12640qn8pcndwraxoqblfep1wgbf6wdnqrgg7ijyyp7vbrftp15awlcqf2ordxkxbqon1te3hbf1txuqcqv3c84cvia9jg56qn459ow7x57pg3xu39li3l2c24cjmla8o4c6dhygls0sfdaak8nbgotjox48o9gfxvy0bpecmmuud2cmjeh8xyx2625azbepxh5pzqnei5jejj17wadb7y588nzdnchni72wxpfb4al27mdo0mzgabmhbp4xhbia15ogbu8e63wexztsqkrs103ukgcd0',
                parameterValue: '8q1slferx5sb0rc1kp0wucykp7mg8qcfid71sxijho9ftkoffx7azb3qkxjzemojtjorbzmrwk0kxyxbykcqrmtbyel5xwym6fitwuq3prll98hxr6343d6ue70ee7jt6ybj3x6ili5i34phqphjiastfon4769la4u5p6tmfzz8xa2jhydvbum1aolb5ns00qtnrg5km05as6rc6ftc3plj80w9z3zi4tqyz1ztayplq732ak7vx8m9onaydtocu490bf8a2vs39qujck09pouq6e5apogjfapp5s5xyzn4uff0xzwa49undo0hfysnva2x5hn7xzyv2dm3wgysg57ivxsgum4b99yofbce8xyzio43iw1vq8kqyhf00bjvqf2kq5z20p4kd83ufw5adu8tbddif16lhy7w373evdvfviguezz9fpvhnl80os31fz0xlemoyrt1vjm6b09ems1y3j6e2tyg68gnwdpu0zos4xgewh3thu344zswpabxr3fansu2rsbokftbnkajdks2wwxxd1ejjfec10bw15f56g38bzxosdmxlhp96h0ituqtapyy1l426yxtjr23nf5hknu4kvxnrsuo1891jwhtpg2gpgor71qytmlk8kqmlmh9jg3akl930ezv5hjmcluxdspvsd5hgfed1iluzyc1vvxyht07gp9rzhoavv8dp4zuikxkvnimomu3qnvngw3aj62vobkj3xb53h8kuzk9dfh5r0a7ofmr12v3u0hiqfzk03di60bevm0tjw1a47zbflqtuths71y7kpb2rfwduwt2zaqog30zvmg7u604g1xemyy2nbngm7qdic9d9u4mpig7mg2v1pqulvg8fg158r1xpu6j6bac2lxxrt7qu2g1cwqeoqzm7gpul02cq0nmoi6y5j9x5pk1jlv339kt9xbxibgek7qage3dbtu09fwhoi08i65kcivab4d8fuc3x1ez3n7t3ipyw4sngv2bqnejbzgsato1as65p0rx6gjj96vrosa0h8f75cffltfo39qtnolv0dgbx2hfffr53jjo9tltjs6gsn8ywi2wi86leufbbtniumhtbbv0yq1tu0y0xmrard4skwah85j68wjqjpkecqds5heyq9ddad9m3fl5xm0wu4j6oe0ffnjmjjz03k9zpd3867ilf4vg28wq3rjeqlowg1ig6zf1rxt35kod05ewe1byt83hk53tidu5z5wkp3phca5d85pj4rgqz3x0wm13epj9eswez2747mdgotme8v4btfi1clw9wcaqjjrmcg5umgobw1yislm2836oprzhekm1nmqtdggofed6y5npics1ayg3w62pmp3oisrqa751dhrd4bj9qgkzouzrbpt7t7lafbog3q24xy2huwmcin7gh8j551onjbwq4kgk6qlln93mr5lisfr38sbhgq1u5cdd5twendd5psny2jo9j92evrmftan4glj0x4zbozzh5ks7f9asdntdb8ncuy632txn7o8229dlrmgoku990o0t4ykro84z9hmlwy3ij46mmxsn7urwngu6rleqely062mqeg5t7ughwi81tc34axpov4krqzvw8tly6h7j3dxmqr30hjgz7h7ek4xadwhqi7pvh3zsuss0hyynb3ovzt9xo4896m14uk7u1w8h08hsbxghlb1otzjcsph50hy7ujzn294wwi38z6a09jn9zz5qqdzp0qdjcd8lig9wrxazxvl8ezds8ubenp0l1cotrno57jep3r5ibwafj7twh6b7ibtsnyinm25h2ga0d4eghh8fumt54v8zod2tt8vwmv1vywyrqdpc3oaksycbqw58fp8z6r8d2tasx2di5bo8845f9bvb7b3babycfjpcyi7opho8aeoq7xbi9d5dvo0d8xf8bmaiwxi0y3lhf9r8fdfjspjxdroywwseazvii1wz3phr4ncspon2clshzmkvx0lx1auym6djgzo2hk7xjovb6wzlvja2j3g77au72ubej70u',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: 'xx9ufq5g0yo39gzqouquog91aqrmtjgc8vlmg6qowi850o9cgi',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: '7mmki47arubus4uq3rne',
                channelHash: null,
                channelParty: 'fd2zm1f2unuj26e6porz28x7pqhc6pn9g1e3gvblva8qjiefzrf5y7va2btx2ea9bu9bgvvuaxhm1no2l9wtlt25co4yalhao12kyxcrgf8dgbh60uw453ehezzh8jqdv2ahbta4fxe0gznta1085bp0xtew8fgz',
                channelComponent: '2bdfaxhdy29r1w1jr1wlbzdcy3dafykv6fk883y41bekr8ie7s6u45lrbja0f2s0qtykpyh589ck99axg4joqsbnsx81xr117ovpag58se9c75kv2wtt2sqtqnrumof4in633g9vzrc6i1dmo2zl2e6zufnuz5f2',
                channelName: 'moklasw0efoplercyp0a9e792cdkf9v9gp4uf5zazlsflx2liratsh76k92lypq1uvtiysrxxpr3bze1v50wba2aub0iz96rmwjf6lepbdo43vjb8ji7ji6evi7wa9ya09de48rbh663zqv7fm064mx9ks4nnoes',
                flowHash: 'm02tkvjjqqw5g2b25iy9bitfkfgkg80dzlws47tl',
                flowParty: 'agadu6ar2l2ncuoa4kez66ibfkajo2id3bja3wsfojj4yq1038sdbvbnq7pqe2rpk00snm4fo5ewna4lyahddcn90nq2l9t83c3eejt3nwjs0l8x1cv8pqv454f5lz5eclh3areusgxev5k9i62m0ogbdbscezl7',
                flowReceiverParty: '0gdlh6276xk9piv1cr3iv1uwiah37lfr2vqo7xt70wz14za4n1npv2t2c6lk1k6s1ef8arljvm0igw7gf3c3snt1s8emc35inat9hxt7105wgnthdokpgfaz2zfmd2zntetsi4txz4paloye8rvlhmye7cwss4te',
                flowComponent: 'j7c37nl666aigzxuqg61v9n242zu39ji9bn35ulcszjcc9v10z1rbdwfvkku2djczm1wxwko51br9jtrt1fj6hsjmrtkgrxb9ksoqb6nbd21crnrzfb9ax78gfx7gg34gcjetjifk4hmmw9kthcg1kyr5qthavd1',
                flowReceiverComponent: '53qi9i0g4p7mqtfm023s5js4lupknssdcc9kun50kax0btn117o0ukwwhbg6n31j4g7l2lhjluveg28kejry8dj44vmzryawn9zc9bqnww9shg758fse59nbaicjb9nttr2itmowyzpczihz6absh1zq3a3c9ebo',
                flowInterfaceName: 'mtpxyrkxphxmtt0umf52kb62gmyhs44913o8h1q5xjgyk4mwu1s9ekuxkpda1xcn8qsgr2cs341e00jsio5aqja9imlp98pml6wzt8b3rovuo90zi20qyrihdzd21gewqsvsed2nxun4ujfcdtedhr2mwzzr4txo',
                flowInterfaceNamespace: 'hu6hy7jxgc53l8bxsw7msdz9ds3s3a0k4avz8xmjs668vpdn1m93bowetct0vrxae4e79aiz4bq6t5t9hyvgz00bcdw9rsz0942ln9arzo55gnfo4b3nt0sllwbaec17taju41m265tqfooyn1cicfqfe40t5tw7',
                version: 'eamhjcvq835shuw6syux',
                parameterGroup: 'y0ykivpstxbe32kxdbzgloq4scecnhnwdef5hf916jjcp75rhtd8bp37337m3pwnys0thdwt5ot5ojcdg48gyv2nx16qpya4pbsegnikobf4smy7q8vnfny3ykh2zigabi9514a7xitr8znrwr42vydqygjkxpy6qumnh6ahj2tzb8ro2vz4zexgd6e3y3nkvq2g3avgmh31nbsur19tpffc2nzhrfgd17egyzqmr2ep28mc2bxx87j4ga436iw',
                name: 'bp0owo9fbgxykoopsr7z58c0za3gqawk3cc5pey4qhiftvgr2xea6htccqsrqqf1xq257y8v1fozlezaqoh304ccgesl0jybd53tshkpsgb5qbb9yxb8ydo5hgp7scs4v9xy3vfb337ao65r4idqrhm99hlkt64rm9m8ols3gtnfj02368hojy59iivgcse195aim57zxqfbh9rs36lpu4dszhykyd2gpdd3w5urzdabbbk9b4q5i2f4bzjk86dpzuu0qy7lyp622wipg9gtdhanpwqtbi5ia5ubr6np85xsmcnpyut9qqszipbq0oro',
                parameterName: 'ybegzqnuyn3lwdyaryfijrtlb7735joai1wvtqk66bfup2ontaxaprsor52pp9edh53s5ohdy511ir4c6uz9ciwwjr2auv7tisr2hg7opkehic4apevhs47fb2b904z55zk4gghdjbq6pv72gzqokffhmabn1lmj68fbz24h24blfpyu4rp7ji6pcgis9zldmglkjdb4z38dde9ekpvdmdr2x4az8sx63h8zhhlrhaxezqw8qsr6kwpzljecz5kfao6eusweuqk07tbkdvovmnslobatidqtfiwcgt7zu9dujuoe9fbaw9saqijsrbgs',
                parameterValue: 'rp7870bxjrz66sgwiin1cui5pskp0qgwp5hymgcqc56ecfplyn7vp9x4lj7tmxbltcxc885xnwpf6ho711x0odvncn1usiz7086m9kcvofgjnjr3fecxoijs2scdsfjlrvw29v2wiirg7832f6oiwfa9bilxan3faoungcpgxx2kmt2m3rn3b46myzf5wx30z5d5l9aitt19oi8gcmq8la8w8p252rhrbmq6v4vh1q5xuytlde6d1u8ecvnj56e449ndciixkg401cqd913uvonb5snm5f55ivjc5txehee9ctnm7rj9r0mu00l8ztfp4ia0g1qqc0htw594gsctg8gv3d8rork7xttwei2t0tajng2tgppedwm0gazrqhex4ashz66ouql8hhr9e6216szh1zbktedyhqeyezv23hc85ht4o2ja39p1jm59ryetr1u2uovj87p1akzg12nayrry10gs16lxnlib0fydrq3yh3uvpmlxj9m7x10lgk0oljgk33wcb5mg0ngjoyipe3nedu1y5164pshczcfo033u02q464v0j0cwu8gdh4iuwfwr5dhjkhkwbghmsoowxedrag7vuhheaaqfz6ng3ycqvshdk52x8gi1u3x06cyc0ko8jffr61sdphtia8awj9r2s93nf3zbd5spt1t3k2beydakiwsx4xb3zf0yefl3bgfugw159jnw1e0i41wksgfbafdbb31v0uxv2fp4aqy7fmwfsk42c5iim176u9x2nx9kh9yk7wcyefcuco7wf5jm30gbw48dix9zms7r7937f9xd8u0skmfzyuylugewj65hahute64qf4v4qxiv29shu8wjuputuraw7kggo1sh4n0e926oqt9ys861wl4n2xw75rwxfdpg1e1w6j0c9gse39i5cgyf5iuj76qpxg7bflyr54ys1zw0ix7i4pdeimc4sf0emo8phyy5z6bbtj5o0jh71r6s7c48ccze19oig6b562vv61saqetxwwvdxls266a8y5p27cfs7iktv684nfsqro0kl2ir5eqq876x41r9za3szuq9w3576by1y7wb9nvltr2o0v51a4dbujp04cvva012egeow4g3z0mi16m88xg7uwl8ogqvy29xuz5midm7xjowtfv4kdiio1v7buskh20xzgfe8rkdznuuga6fv7141qzu8202jytkneh4fmvnwrn5qmdvbdgx728nwoj1ekxbai7nh0oo4qo010su3o44d0ynd86skosre1i613hwexgj72bzk8mqh21027ingk9mfkp1wpm0rv675it7gnmp5s5jr256zkyxqwlzmkvd2vip32kkxjacmqgswkohcv3ou2h1slym93mraded0s3ak7wfi4xwrcek06m3td1sjkr21bpqas3tpefgupyj05fkr4yjiy9zbmkgjp9pv66rfxbo1af5j9jmb2geob7tuyq9e6fy6gl9o8c7qklit322sapfac3f5t0al8f4jwd8tx4dnumyn6qoj4ymxtlida8zw4dmpcafkb6httrzto1g6cplatbgzcl0uv2f15ygoeifikpl6ym6lsu7iycmk9s1b3pairl2h9ggn253zpknmt52x4qs3bvmmg4c02tqefs3rhodoxv2kqypfp5091vozyx4qh6osu3jrqt2xri2jmdepib6ewlpobsd57xdg14y08uzv1q9njuwmp9ggj9cghzfhhr2xe08p4sy7tw0ngpoy1iffie8ks0stuh1zvook09lfvh3og0gjb26hhnbuzum3bqmae4n3d42u1wi00uswpc90t83kdjq4jqxhsh5bokhyrt8iunf729tu6j8u69y7svv2g1hc8ks1ddbsp01ec8219ioc3ee1p61uzkab8l7lkvzikyxwdcidl7z6rr941f2xn2ygti5oya51skc24mf5l2yozy2z2y3hglx4jtzpzi1vbohacguwxgazwgtd3cek9om74wkwlkbyexwoo5oai8c4r2dei399kpae1nscn9f',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: 'eq0xg68nf0newqrfqzalaz54aa9svsavcg3me6xb805xqcz759',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: 'bdoroqoinp50a2itw0vb',
                
                channelParty: 'y0zyovc9btvvaghdj49tt7ijuis3ngohim6g825c5zrs6wcqae6ucf3qb8k8gvzjlfavpss38xwhfm892lti46pad4bwuyhhmt68lc4f8pntqch3sgjzp8fjtfwqx6e0bcxctdgurfl3u8skqlfwz02mlt5i9xyp',
                channelComponent: 'n5zcctsc9bppg1kmmsfm90sn2i0jn8i76z5e8lo4vo2pnkq7sg5wuatcox8u1unamlehsx3a0fprzbe0ojal2ipt4ajxkf8hy6v3ad4geqq2h57savhpzbnvimggn63w4gah9f9flsh47isi90gx6gi2x2s0r4hy',
                channelName: 'nmon5kvq9fbci01912sin883jsuvevn1ji1w1oon9ecv5i7gqplgsx98yrczkq5zl2n2kphk020peii3fetmojuyk6zhxwekqvioq1820nnezgb3wh1leechm9ovzkvqt3a4lz2xnr051t13iyaajipd7ft5p1qz',
                flowHash: 'j9l7ppnuj5ld16ell1a0rbowlwefwzbw75848wqv',
                flowParty: 'dy3l8w4pnd9t79ja37aj4f2l8vcqqmnbkm7o287ai0yn8siq1edw4u2uwukp0r1uvciuddz1pbqb19r54vu3vowngkj9f5g6od2q69x69cc4jamfcxjmje64niygn3encycxurbcxdwh2106naon64489snbwij0',
                flowReceiverParty: 'w9ln01vu569hsjl10pg17kn3x4ij7gy2akpl4dz6kyasn8wwwews489c2cbhlqhigiqc2fg9eeqqkimfh4cs2r734pfokp6jj9ggoql4oguthvl0g830e56fj918m8ymgb3tiuj8suzg8r73dbgtgytkbuo5sbtm',
                flowComponent: 'wwxjyl9yndw9c5p699rwu4auftlbtrh2bgwz0cbptov7qvj5zzu9zgl2xrt98zvofc3mo8gte4w56f3sxn7qch5mfzg21i9j50vh3yic1r86yitve2jp7qazaq1g3mpws4v1ccw9jgpf6h05jfkjsi8qmx8ow6ep',
                flowReceiverComponent: 'e8p818qhvziyxkg28wi0q07va7jlvcy4bgjkkjvrcyxu3z2ctu9oiox4vcnkxaa96dcytuam8zn7a4odlhhsos1fhegiqr6grelj36rmi7a56tend7myn7hyxyz87y06cnfakxmbap68v409c1kzexabl1mshw4u',
                flowInterfaceName: '9kebna0f1p15hd3cfhzk75qgjgnnlhicze6wjkdby9pwwr22udbq50mc8a789iij4j7v1hylbb3eszypvjmdpn4ah7h3n5k7xssf0zi6g4duex7refb1mlkkfk0gvf2f6b4a3giiwcc945x349j8z74gbe8t3a7j',
                flowInterfaceNamespace: '2j9bxpdkedz6xscifgedvpfjw37q7i4uuf1kbnwiluqofshxdqnfej50g3a3e2h7qhdd8u9ph61s8slvayaqwe5neqx2w84i8aqlhz2wu9wz8di7ofjzu9ee9926n3wrmc8v706hs9v9jtnziybsyo9f0hw0is64',
                version: 'q7w2ld9urfwud8bevdfr',
                parameterGroup: 'zov7llvppeoymmgtsqdi99kz5iyl7gbq5prp6052j6s1h7pnawhxkdynw0decsdcjlo5yet3bwn0zzx1awwnvspon99bkplgharirxpio132ldczdnvb4chzserktzlcnq2z46ggynant1i0vdmv0xqi1g7s827em9ver91ny3jnqyg7dl9e0faz4teh5rij8369awggyeclq5cp3al44xzfj7jonhiakuyewqhy5itgzgexzpzri6sm8ba4yan',
                name: '63flqapibtv22vv7ddrg1kqytsqbmpfdzqcu4k556kyyf5yvcuxwvc395yszznqsqzzs3ddkjeu3pplllubbyrstx0340ej4pdop2gw3fhh8jvpunhw8jjymh0k1omkau6zoftvle2fcb100el7qlaf2uetb3jjf8mrnu3p7x8l8qwz7drhnrjnp2f0lhcp9u5izw6j5bxygxw8p1yew2ozcrtx0n5emje5nec0qaswtapfu6xcci6zmadr7674e378xhezqkket61k5mbqebgkzcrrpebfk75z2t0187gyhtrusnkn0b4yj9blv5oa8',
                parameterName: 'igb9rdk7nnk5tqb1qsybr8hccx9npb1pmfibnq80xaqrxqu7nmic4rnhpfbjyvtotccg6rgjlgbud35f9llqdxjznrrqj6wreo1tzcs7o95lgzgz2r2ctnmejv88jywhtyikw8pwteeeruib6nk240p3hypkpcrgnbxg3po8p7r6h2q3t2hpcwuqfhlmqu2m110hqq611c07xbcd9cff9czvxeizvdhwxdwqcm9swhlleylvsfrzigswgc8yc7fuim0cseofkkkgs3d71xvq6m7vigp5bn2nvjsrv1ikbowt9h8eiptf6xoax5z9n2ll',
                parameterValue: 'm6wnjrev62l1x4dachcq3t7q62xw3sck7lze71c7h0f3e8zyyfc088e9f4m850kbw5uwe81qb5gf1ef17upfjinmxq0syac1ave61rscvbuvy85h7d490dfsltn4xtnrxs1flvvy1ksp3vyui33mdli92oo1ud0wvstbl73h7071gz2lo8gqn37pnhcffc3pyy9l8zcqs80lck7r2zlyn03tmkacjzesgnkqbp74dpeatzjnjwko53cz904zsq0z8hzlthjl48d6v2rsv82tnz4ijpouobq6b8ya2ymtzpla5u8wyzewgwq2gmtc1ve5epaehlxqzztb9cxggmpw05x175fl4a8hqxr4aznpdcb24u5giucmchiqy3f4bsmzrp0q1gcy0at7unq5wkbms0a2m42vrr55nk7nh7d3fdr7j6jwqd8wwb5gel9f923w3fsbrlv7r20i8q1spkcojqm8azd0phdvf076nsqkcswrbp9ezzl0c6tn1511oao021w13d3r0pjtukq5btnp0afffbub3wtl7peklygxsdscxw7xbbdbkyqg2gt73p717y2dxopgg415566bek2tf6n1341i1oototkng4ucrv8if3wexslrkbybyrlwdcskby8ukdq920kupek8wu6odw0scxp4um6cbu41fjehuexy8ejyt7mse70n5dws9j02yck6buic15g9gs2szm0gk5vkehcqio5g3cnq6zmrujp8zggpxqlms6wahi6eq7glyj7vop7k3vi0gwsxyjfoynturf6wp5h9zjzjbnq796dm4b98hkza6aizgeu5y4ziwrdo2pcwwb6zxdm455746pirpkosq1yub3rg41vdltfq3iwcd10z98nogw4yhon34eicqzjrjfue2w173nvnb2jcojw1olrbeln9va2hvze9ahnyb0q0my9ssodbumh6i9kdcaaqs2l63jb8xwxjq956ndw7005xr10z9bp627vrfynoe9r07iisu2bkpynh9vuib4cwpasfcpn1f9hozypcgczwgj9psbij6vnlbhrtszr0gdrveb6we677joi6em13ew3mhzpi66t9b7hz3jc34s43v9jrenpp1a977stol1a69m66ouhe3mjg5uhho6e5y8wwe5xu1uwfi7dq3ncvye80n6k6gyuuxqwp3iok7soo9mzfr94n6a64ziiws4nxmt34w0nzncm2z8xcn89e80bkt7gmrsn05fcklm34vzn0jjsg6pqbcz7h7tm1y48srmg1asjsc2fb11auagnq0kfv36ia1kkm9ia1ihs3kdhjvg7ehg4k3etsuu9p2cyui8xh7tcfjvvo2fza1efgzoldtzl90lw6635iuqdup12criguem5akgn5cxcyzkiiodhb8k1mtpocspn1baxouaw59083crrriqm5iwwxqx7khos071868ez0cb87fd0i8l278n9g42llwpxhr3uuxgrq5nthxznvr6pltul84fj4c6zduteffec3zjs6iahdkl8eq21sxgjat9tdnajmmmg4uth1myn8bzcik9fmwuwy3vtbvaohzz3lpj37wrr14zx3t92xrhybetjirfp0wtl0venhvjy6tpzaizq6sai8so5nogu9tskgzdtq12b4l9m503yz8yxw10fepa7qqal47abutoevjbu44ebdspe739ba4rpnrkrwjc7bn5b8ir0wkshg4pjayf1rewu7ldglgdcuegq3wib9slwzlkstq4x2js5doj81oyz93ozsn514tn5wczxpzeedz7r1lul5zz4j7a0zi94g6q6uwbiskihusan5bgb93lfj98uk024yjpu0rmgk27zx5ypg4ugrh4nqozjrw3hn10na3owtmjniycin23encdd9yrzmzwmrl2i1nqfalemz2c7sf8r9wm3lzoxma1w3wizflzkifd840rergh3vfxnjl1en47f9p46hjoewfo9tksh0jux9kdllv6rcsezokn488e9ewwd45lbuxgrszaxs',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: 'pqfs7f77dpj044zen6ubpw0pib8ln17468e62tlvcuudn2579c',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: 'k0ieh28t290ouqs355x2',
                channelHash: '3xv38k72bctr7kl0wq0hgaq3l1468wtmbpdg6pdm',
                channelParty: 'ku7r8n3pkqvwchp1si0qem5ytvltisqi4g3fd5obpd1ds6dhrzfevz011kmlsfbjme5k8qt998nxj503tsxebjhbb3lfcigqvkmthf7v4sgvx1oycjsslygni6xuhc29eqtf3pbr0vmdg0woegeoguanbhbs7fiw',
                channelComponent: null,
                channelName: 'rie8rde8qeiettzg796vru087csx9o5a3lahk44h6cgdhign4xmqlzefh3kpvo65hhw5pip8euf324wjzlrts7tq4m7wt6ma1z8kfr3jz8w2nfuut9my467nxnznc87257gil46o4z7ego811yllf28z4040co1y',
                flowHash: 'futezbdmosh3t4qjpci57tadujefxpy7xyxgzr9r',
                flowParty: 'mr70ewkokcxscvi0spe7wyzcjglobubs5sc1ktl0lw1bvby8usnu3opoqcgqrvi0o9k10wqrqnulnbtnaxfa7j43i5e5mjityh3qkf2lgpem98g1px1xdk23ibe7qkytb5q62e72pkjs1j25oywzbtxgn4q35w8v',
                flowReceiverParty: 'f34hunshv23668u4ladt3d2s3zecxtqnpa8wwh1g0w0radhsqoikbabca61r8wpfkxxmqrt3wgrwzk2zne9k74st98jhza6ap8s2593z1xq4tosb398lkzqxlw4y9sj317m7ef5e80p6t7ace2q65miq9obg8kov',
                flowComponent: 'w5ho8xankt8mxw0x3gldo9jz94oz9jr1v2xoc5vl6581j4tzwja3om5lov60mde6rq0s8sreuqesif0u6blorf4i0aczqyvhr31lp6a0vfksoc4ijs6hl0ftwdu0g7bssswjyln6q24iptuwilbc59iog8i2kr8v',
                flowReceiverComponent: 'z0243hgt1wd8fcfw1rt0qwchsjy91iy6dbi5vtzjobw4dmb4uhcxcb3venixmo7zvpy8alml9qgr9z0w2f0ifcfwno94ufif07qg6w06nuy706kmngqptrtjl050d6oqkq4ftixlyrdumdtpdcsxwu7zuzjfywpt',
                flowInterfaceName: '8ro0gz86pmqr5b7vnfcrvt9l6nup60cslk7cyiz0vd6udq3tudb1vjga5if3vhjv7cauki1siknv4fw4rqtwghnw17w93nazoh0bldo6gt3qlw2opw2ht4s5dagpdyhq3chyzshispg6um5c6jnlgtiltdja8vpi',
                flowInterfaceNamespace: 'fvx58uxvdbu2s318sepgj7vh5sik7o3gv2xxldz1hd40axbpuo3os3aj8dz9432ouyxpedw9mhghb0a85z9ino5hu7wtbdtv2gnym7o8mo2f7kw8fol6bchbmmxiqibwvy1kkhfh8e7g3w6ildxjn5wvynxis50r',
                version: 'aba5ewt4j8txytij45nc',
                parameterGroup: 'cymbn9yb6nb0rb91is5b0vhz88by9fez5wvtqe8fuy83r1o889kvs8zh01ob8x5uf9c0fp21csg8aso2lh3o22xxbmx8f37t87o75kfdz38k94xzfxt3ehotp2r9pzk6pw26usmjsq3ay65sbkkpf811pqwh9j8hhqv9g2hvp0wfxdthmsjqew1t97sfhpzmsf5lr2krigjap6x90elrq4w3vixi629pi9tc6pwu71nay6x869x38e4z7dsd6ot',
                name: '82r7ilsn5lod3bc3vufbkmcjvq0jtpzu7d3bb19f6qsrgm42f3jzjam4b1s09b6k70nl0wg1nh8f437ftsaiwlqpyofuvemv81izckymrbco560fxw6xgpk7ztt7xq4z8vihzz03ntote1sfhj5zwb72mip2rro4pn6lmz6i4k91nf4l0br7fd8p7i43elpzfcnyp2z1n98k0ksgd86jld77ctl7o7xdlnei4qz00igrfauvpqw9ba5ec51nufsti8x0l5iot803c4rchgsiufkbw70g09no76nfb12b7ze3f5zm0464t1fcd9lrqn4v',
                parameterName: 'otklqxlr5zdaxcya98c1m5j08bah8d3b8bovw2bsb6ld0w3bm4vyvu1a98x98fwuhamstr1cq03orogd4p9ejzqe4vodtpffqicg5yll1q6zx3ivce3s560ro39zti050h2v30tmxclhyfk1j8nlcpaaef3xlrqatxpfza7z9g5fdbng6kw8xocpo156uvsf2o0qfqcrvy5juwj7hc8jdqeihhsuvkjhw55zfztsvudd9rn47ak8bpyarbj5cs1b22m7v2bjx4klrqvcsko349sihgcf3yy5eykuzij0uzzhbzv83v3v1g0h2shvp76b',
                parameterValue: '30wtsytn1ti8mzwvgi5uix9hnmn0dcfzo9n3jvyxbz43qaz6eth3jeapc7c6jc9bsxwvimbt5h8na1awqnw3q81cd5kpd7bxvkkbadezmbd9h4pind9l3nel5qpxpcfxqbvl6fd485be6864jlddruzubyojvialfrkljeycn9mavi34k3snpoeig3b4ayq8m2sakcfkfxn9d65nysxcy1m5tmmkfysa0qn185btzzb0imwgzz4z2zjy4z41r2zeh8e4zif85tyj8hgpj7c2j3qfnhyqq5i7o8ax18cg5ec012w77c27e8xe00d4gvoa73pwrkqase2d5lp7nwiong1xdv4kdzeoxj932gi7sh5v78ppd7pzz5latafw7mt5g7q9uif4upq70bjpa0xnfe3hqkgkdsndcm7anar1t8f6fzxyywiz6wpld6xskrq6giyslaoeh2syyk7947fypgsttdxkxuzx98lbc8cioi6mkeccuzrfo2pab1tfcv3qvm5vzdhdkllf7xm8lddzk87ip6lzhp1489ktce1a7rco1o01l7c74wahzso4m1p23vatbky3mqrwwq07sjuisxr2o9rihdgxmgskm9rbpqwu8bnytule059yav4blkleqrv0b3ngu3mi7t720nwi1tv1yqlvnabzwfos8o9hd9hha7noo8wylj24metzhmyu74r5qzr4p5253ttazlu770vayewp46ses5yysfs3c5kp7dr27feeeiih4017tcg76r2vkmq5c0i5kw9a65ty3ttxo0gu7kwiav3f2gkwpu1lrbrvj6irn6ypq1tt09gico9c1elxy7gvqvgjdelrwgvhbzxr9xbpanax4qeh0xphe7jm2s5ty8i9hz354pp6p6yd18ipvvmcrj0st6uxkc4fq06uzchjd2wh5q2xe6lefoer1yeyj4b0uenruur729uarcm3msd99epr28ltfptcqw34o0cyaf36c21kcralply9xxq0gp1nakdzdxn9od0f23cs49btyphqk1cscd4usmfjto20tlx15zj4914k426hwadtt0uzchlayga1usrwtfk1phhaf8uico20bzs86dwy2y7xgjdp690d5aqxssapsdx6bub7yoqki1s83f4a0wxnenhq6nhh24h8zbcjgeoatn46xjbge2y1tg4m3gmm517hly1tdf2xd808h3t2yzwz211xexbr9sqvvz8ntzeopr5464ipt3es2c107fdyc9scxvui0y10z5qfi4kofn3p3ouf7x7y09in72enblclp8ryh337p1za8ad1yttugl7krrchnox41tzqub1726pjxukw2lo8yulonmyd0pxgxowss82v2btqmikz370vtgyjdg2pl0usdjquf6y20iqi12a50dzsop0ye3r0bhs85ramt83cso1foxrw4m4uq0xwxkd4ptiq3z0gssb6zsbday6ztwwynyocyn51roblp9kvalusie0fb5k2gz7nh0qcm9e45zrusiffpqj37m82xml72qadkr19tv092ysuvbjh4et6iuc7l8sfxovway8c9hafjt8oq55y9msc4wlhd2lcaqy65wjhcmptuxbauz4itbybx2l6qsnjyxnn7ldu3zp8dxgr0eontkvrsxewfn8eqv9bni1oj6j6mkin333wistdm00ydgu0nbvlybtw48y9a9g8qyw3poc6liont0i83r59cycvy94r2y7ctsgqleitao719h16f127p9s44i9e1jsc0wbu1pqmbcp5q55680sdzxz6fhq7zpctjh1u5btj3sjqkgim35nq5jb15yq30ncfacbfgg3cx90qx4wmblk0p65ch2c5x6365n4a5pz8sx38q2lxhtstjza69a29vnpwmju96fgmqnd8a2hm3q4hewpruiu1cunkv581a70scn0rewn138uq91jkluuw5tar6t1fw8jasvfrsjo6ji8pe50rv12dmhr2u613ysxmgiil8pcjxonxm5az1yp4tskxrdjz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: 'g24jjy6e6vh7xhegpj64zqvhyzvvkir8m5nohv1hki3p1s16rw',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: 'dwhu4dm5k2ev8xqonfqd',
                channelHash: 'wgks7umnb4iu41vf3677q9xmq0nbnh8lq7xim4b7',
                channelParty: '6c98txnv7mrxt9gh4ld8czavpoi9bzzsacuww51gnb6ahnkoaikn6hxselsweq36re47nrucj0vy187vrro7zds8ba9fmfb8fimlqxvu91qqv13cduz3u2hfs4e04dws2wguavlpm2xf3zxaw0mgohna2rzlit39',
                
                channelName: 'ccn9fz5zhek4ef186r0c0il8opw5d7ujsidp2xlxrurum3dhmd8suz01otkah24ovdi50fmkm4uqv3gddeqbdxwlftj5wgpccrukuj652lzt99zbyelqfuu0j3jwz0whspqlros7kdgsvidkwxk9na34s0je0356',
                flowHash: 'z4442lxnquxxlq7kudgmylqit05ma8a1pz3ke1an',
                flowParty: 'lhf3lvizm694ukf9v231y2wykzajlmdmwmdkmqfd646561e58sn70oi077l9lcp79gknfzyeytdc3iqsz34umpffqkzcci8ztvog2u6uh7bi94in51slo9gwa776qs1hi5shoywtq0defah19w969kjsmqt92a96',
                flowReceiverParty: 'a3n1fvkk09umcle9u0tvlda8u451fqy3ykwflxmkiorbtwz2shvywmttryeihtleegvbhuxd18gtmfchwlxqzyypm5yftby73v17zl2pnzaloiw5h0cabn9gz123ut1m09xqcsicyczfsnlnbvh5yi4lzf0jw193',
                flowComponent: '5jq1xxkrhp3lhq73o9hzp77qe7g0gke17ot1m7jqanypwezvb0yehgj5en9vypusxol3z99qz6a8lcjeikuckhgmemc44wcocbxa95cuediqdd3sz5tx0mma5dgndpqfbninyb1fscw1t9pqvpuoww2si6eupd1v',
                flowReceiverComponent: 'ojbtb5swmdpfmwfa54v7uc02gf2rk9pjgylwi94h7rxzzs66iqntwot4f0yyeif47merjj2kydqbt9m6150wa56pb9w68y34o2age2tljbmnw780tsgpk91nq4k30hf9fe1944db5a4pg2kjqoaq9j9yu279ncg1',
                flowInterfaceName: 'dwg52gfvhg9pd3slozixjoetyc2236jgohmp6fmc82duppgs99jp4e0o97t0ou9j017nt4se6uhch9dw98wbsgu251y8wwftbfxsfbh1369etujjvjgpnjyp2axe1xyycbvbj63m99ahm99hjg5j1kkk15z0fj33',
                flowInterfaceNamespace: 't5nildkr9yttecsnn53fsfxd745vgbtw212rs7foat4rjgsj5vc843nxs8uhqngumw7xko72tsbjo2pkc9ngu1qtlcgmyx7bd57mwproeftf9r2yr2wgrr245hwprmqgocr4lfq0dp7k7comnbn81lz8jso1ma04',
                version: 'rkqmbhno7rjxcwl0s3ql',
                parameterGroup: 'wo5msyyjybxvtljtylkcg0vbiua6yi0apwjtmo5e2dgtje3ovgpl3ctxtuf2fns1upsr16n4s27d6hc4yumyhzd6ybaj0ipomazv5dk1m4j1mm6vbtm7cet6nthplngjboy6j8jt0hhqml79rcipqgo0lczlsoch0x8x58uc92bctjwnsw387t0ax22tuz1t5hcaf74wk61rmd9qf5tzvywvbqk2q2ew148wq8qbebkaigv7ubw4r7kc58xt12f',
                name: 'pbwxb97t0vtspcxmmuhc4fjgxrfd3fkmq8kwk7zayi4v0tpl8xan2rx1inaiy3cxlshjxux363g0tbq7cmdmmok3gwo9maczd8m3vjb4t56vm9j7kjeygb3p30vdul0x7l75dfj501lo8wizjzwrz8raz51j6abtwv7vg80h5i16mf8d53uwm0vztuch1hqozjohphte1i8jgcf53s65xszpcfbw8eg1d4do7inr2pmkhtxwyrxhs8wl5trhg81uvf3jngwmfu5cj0o753ruwk8oesok9wknsnx5e0l5k5rm7wpvckn372t8hnspl7rp',
                parameterName: '3d7ok292d2nu5whoyip5kw8ruptir8x7jxtguuzs92emd5l0qwtxm4cihu5d412gm88qpaf3qt39xkgt4l290d8617hy0ugyvalz7uwj1acbjs82zllxgauy9r8x84roupzid1it4axpc0viucrkfgffrfb8skfo1u8zk2bvt8vga4lqqr62ukxi6924rympr8id27r0eeixcs0dhlp7w5jdzhl8hasuw0q6695fm5bjvk6fv5zti4wqnfizh6qdvivcx62ud2yvsn0k4jmvosygduxhqz3cp55ey9hhuyf7wqjs843mcn20c0pf041b',
                parameterValue: 'srzy2yayfzksao0em8v9s9j595zqovxi6hxlnjg7q08141ibxwgwjoho82jlynx09b9mcshzglvbxfmaghk73jyqhuhprk9wwwes2mtax2x1zh1hmxnxnyoly5shhtav1oaa26iagvr2vot3043v1ntjktkw0smu6u9pw6co0ezmejtfaf7h56mr40szz1s9wfo0j7uu11nnckqbjkpm4368f4a7wk1yqqf9uk9dp9poknwe0pj2hlro5wnsl0ygb9yxsxdx2jnw9i6lf5208e1qfdgej6dwzz5pr3v649l8c044vzvh2fhr7ijpzmfg7nxcvkli2w2eytebb3hwhatcjm4iw4jl2xzoiw5aga9gcw6dn8m0bw3l9i8iu453dpr67jk85trlih0lg4u0yw18t7m5jf0ev4kv6nts8gcoo0zh8c1aqbk26yw3j37eh3pw05krstew1a2xt7mhodaoj47x9rn0qyefx7jld3pbyk0p1k46glrmgbcwjaudtwakfl1af5j1omwr75amdoqp0jq40mkbngbr95s4beurx0hjw6gcimvkb8vyq3cius78xlofn9ugydejvg9j6wfve85dchbbotpyuoeecbwyff7mrz42t03yfio1pewbt9qwtnxl8scdp6captrp6tf2xyw1x5ehf7bii7au3lnkt88euu401gldayorvet14k50hx8tzkxiwjset6n0ygonoi2dz18cvc1e4aft9avoos7tw60bdmulg7p6kkm3o0lipp0bdm4e0vp67xxoneardjrm524uj09al2m4zanzmsi48szix0vj0iickejnwrtubizexnarja63foe4mgzjj4g4rgtj1rd29k92laj7u22n6w36esuxqre5r55hyk2pk5iiemmpegs08il8xr5pd0d86tlkbk0ypif71co3f0vuhhjzgsr9az370hghpe9prcig7iqederhwo9rmvuicu98svpxgtsi1p59tstc70kldkx0a9pvzceduczadg5ues6aruqd745a23h1rg51dqd2p93gajfp7czt9cu4vells1t5gl7l84o3bklsd73grt5tu4zxq7r6xkpvfj3n361dn607bj2swidy09nw0hflkutv7i06i5mnfh1bzb9cn0koflml996nqtuf18dzqmbw3spbugpij0oz13n1l00a8vild358qbzhur5h1k7nfy4ohex3jq3tj7hipsw1w9bjqbbh701v6rjfh54ecbcl6f0la8zl8z145juiw48x4umjluxz6c2ybncr0pdkmzmee1veh2hc24sd3jz6a284aulycikr5jfqgj2qe7afgr5khcrnw9j6soq8dn671wb7eb38ezud8dkkwzlsdv90ecj5jdvp3vkm3ya40w4s5qeo2ta8r59051z8bgrcarmti7ki0tv1p183vn2ro6vm0ixbjfqadcitpksqfhviviawsxzlg98jq7lv0iuorlnzg5lxso8j8j2kb0ozfm2mqq42ulipf1qriwknjreqga0nf8c5nabgyblvh6b8z4pmcgpw4xk0dlkd88d2eekjz9l1s6whumslq9rjpk4a331az2aqba2quk3ar698vyef0sve4xzvgagkwa3cyhplq7zk5qyrvkies2gfvma7c0mlosxkmo5o4e22kufpfv4m2ff5m7dduxg3pok5njzmel5qn6w9oa41a9jm1faauvdi0t3bty0xqaj4550ogyue669tilqj8sgjmpwo1466ss2sorwiptoi6cifoyzl8hht9y7vlngx349lbvwz8ygrcndvm294ouv7zkfg0fmnyjm6y0pnhdn368wskf2qp2ee3gom9cqjimowoekt5p75vq9dqud0edsonyz2j9xs6v871avovbzpvqnh23svyy4v1dtcm6zhi2q77my0fehs6n6b0k9uumwtk3yotl365hhyi9j4ur34mn2p5ausfilq1n39fknx0j212c0h0tgmshbpt8h4dz31gmsuxhibj2lst91yglaecy1q',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: 'vsov1k89195jpqp1uwafeg8rzw39rf9d2c37jan26rq1z483py',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: 'apkem9siimjxsq8eev0f',
                channelHash: 'cx8u9konnwsaav4gyxoihmjvaizl6l85htuyg506',
                channelParty: 'w4qo7awq23zvhmxx9csbmvajn5r70xqgxg3wt3anmls1yq1s4mcwdjdgp9z1yhp1mdcufotngjsd03yr9zduh5tkh5sw8ymact21meibpi6elei41kx8gg8znoxw4mcy594s8s6rl8d9hagz7w6u8qfh4xfn5lil',
                channelComponent: 'wziwoajhmu8nylqdfc0y2yhc4p8s3643vtp5pfqo23kq7x317hfi9yljms9y8wjtjgg2jq7np3tuh59atesfvmgde8tai19e74tyxg9oz8ybcy29ugk9shw0rsbcrqow16dm6gu34cl77ukqdjbhu68emjd6hm1d',
                channelName: null,
                flowHash: 'pwo7xr15ctxffbjzc01q2343paub17dgkhnjdg3v',
                flowParty: 'rv3ltr2bs47p16rro86lfddl7jgaz8llg9y4vje7kzo38r0507dsarusupbimw3os7j0pyynvb3h6ckof9c6rq57f6ggajs1t74qo2i33qp0banon5irzzpma8iyl6voy6w4rk6bwcfhwv3wo9fflj55f3dnfhmd',
                flowReceiverParty: '8lvxufah4k7fyud8ns3xem0h0aafljjophcwzf6il4e4ufei6p221d913garph5pkyxlb4tzwg064txb4xy03l94a8b61cwxah4lwtk72oi7birq22l5ulgav6sf1hqxh4fdu0ye3qig5364i97la2xg3ozqcwdg',
                flowComponent: '2czwo0ejargudp5njspx6aw47spgb24726ovnf65sz9v7ofldjpbkaeiaih8i1bn6pl16tq6ftyt51cb8z9669ek304y7vc89fjhk85sksidps4958haw7t0osdkptnv8g4vvbkgm73hawstrsy301ckp7daen2e',
                flowReceiverComponent: '050r4mnon17swq288p2yt97g7u57or6ignmdis413i8fpa6a5e1tkzp4scz3pm8o6u0kzbo9vqs2k3tpkkab89nlj3y8wg6hfvsceej2igv8h8udjtgosid4iyk67p6403ra7iat67n7qej0x53w8sa7lsntdgxl',
                flowInterfaceName: '4dxkzfglph50dic5y8lxnxreg6tjzzlk3zz5yuqp7a6f0vho6wzy08gfe2othkdzm2iqizdf87840b6zscgh4p9jmtseeqj35if9x6w5of8no8znio6lq0cp4h4htmadws608xewp56w9p8fmxquw5t9w1qhjdqq',
                flowInterfaceNamespace: 'xg6q6sr7ze4tebpkjjithkky58j9qzi9eysxjjjrnza9oknnkiw78di3lx98woltcazu0oielenkl2yhtvwd8jr17pkicoph64m1z4osdaee9g4kekxhlclhe6h78ewxr8cax9y9tz5ca770vgbav61dpiafmofb',
                version: 'fvqe8umx65drequm585w',
                parameterGroup: '33qnoqx2r9f64ci36w8j1uakw0efpd3efmh7m7p3azqp1tvrtgkrbnu2yysgivvp7xo8x494gh1fsntnyvszagaqefkhhs5oudhhvtqaqpewo6hcpij3g364o2o534gk4921f1q2yrvurquwjfflt5vcrkiuj87htt2ehrazue3lfb9qj98ymsmw2r05e7jqkkfp52yapskl70s1ddy4vg5yxsr2rvbuuhon6x2uaxtabxfzvg003cv79bpx5ep',
                name: 'whxhtlauiopmur8m3tzecv5jpl73hiousn5sztg99yhxq3k1g8nb757dksicb054lrrgoisywf0kq61e24eq7d1bj6ubpu77kih1cweoxfndrduhisa7mjq9mjjsro3rijm2ntrntytdk8sribk6b1xlb67y225bx77zvk4yu95irsinsq2uhq3qztwu5l4k427x5pez1f964sli2lznungffgmtin8ygt3ug9ruoazfyklxdk8sva0u3n74qo88wxqitwn3yvzr0fjmu2rvph5wxp5njht0499n6p94jr9kni3v0fdvz9t4d99c5wvt',
                parameterName: 'cbag6tmz9c6pa235byhginbicxwoaidlrobfblkwa92hp6i5ca8e9e8vn4lwuw8lhgp9jkqefsjbm5njorvghhysaupmogtc6kv4zckcoe710cymj5e1vubnyocln4j4g966u2jfdojvnvyraal7v77at7ctpd2yl24o8kxah8zfwt5joe3qpn1z79e0cwq6jfnf54cko8b7ej12mgoht8c0b1q8uuidn0dyft7qf4tbhoxid0mbmo04svl6d1obipdzofzj632t0rxsam39ly9a667w2r9cu8duswkjspocv62drtlip7xuc7sgok8z',
                parameterValue: 'b19avpvii1fg73q4gat8eblmihh0rxcd21rrnn3qlp0lyt4ou558utthab4nipbmphmws00fr2m9ilnulia0lu8mwbli71gfxhj7jhaeqbhr1to0gu8zx7950orzrrg4zpbe14rxoxw5n4ukzkn4rty87n58jge8vq6mw9dszbrfzruep24zkxkjsmqpqhjn5aiiwm1dpojny2l1jvx8t3h1wpq0eerxak4ju39txbqfitnm6nnyydqj78rjl4jotxqoicffg0dfbm5sotro6o276907ux294yllj5q7nmowrwjd8eyas55qhiz0suhapkhqn9akwlawl9hgtd2dq63k1fy4sgqt6rlb7ryjmjani38n01suabd8f1j852s0wdj4i8zusylrhylc4eodbb5pf19oww1ts84qhv2hfunulpyw5ztqe9d0ictzbixr9jj98iollj4py0chq27ta0jeg44h2hp796vfxvyzuu8qj9y8ekdz9c6da7irs5cqj3pa26ijy7zvc8ohnq84rd3syyynq6pio90ilo19m39ve7c08xuw164n0nclxfdvladhjjsf2atigko7kwkqaq2bkkkehi4k8q7acdt185jn8uuz7wu5tjbrhs9l85mj7o5jhpquqfw1565j617qe7jvowgygncpcnom3cl1kzn37wwmaspyd29rl6rzy2bejsj09lijpwdmynk3t66sn90ow50gq89fhwph72z3ohjco8rlcf74ozqm4naqyas0v9itwarmx1qubm6cb2lvu4zimnmwhzk94j0qp7z5wld9db5g7dbt67wra5we5n1axldn92wpdfq2p8s463wcax1kezoe8kmsvrulygz1lt9jb8dey4tgblb8pn57c2dwavh0aoo4e8upq6ly9rh0cqfei7feu8kodk0xmje189ix70kc29dt69zfuuclbh2fstt76d4wsthziwf8a6756mdiee3zndpo4l98t89vcrqrag5rm6wyho0yin9tefjdlstlmyfusw8ixqlt5woci7l6xzceg7qiq8rt6lq2yvet5bdt0khywar05ebs2klqxi1f08jzaar8feucas5svw08qukviuma9ycoznagto250hbz08xbekab5owxfcov0k02pqqcvtdu9ih5666iq00iw5sclrv6hcbopbb599qtsfe92pt0os8pykdhw43js8s6roc312nf6d44smthi7q8u2jzfltag9avryokhtpzptpp65hn57xkwytwdkkzvrd0pqu9dbaeuha39ib0vznepnkat6v1w84k4h1dzdk58cavskg975og6k25irbyv254so59jhsu9hwfrc5klt7o06zemw74b6gi9kgp79bh8dk7gxthzrj934r2z2ofw81aqdo5l73ps9iivcqgedviysbam7xt5klax7fi9jwtep5f803oqjpevxgbea5i2nxgfos5ou8blol5rj65106in8aze6f0grsq2qwip0iqmpk3koedlfd0d6h6c9j1xsd7n8zua1kmorubqimsvh9u4cvzvxevzigvtre8n0qp5sgo2r4osqw72zm5a3eys0utiziwj33c8i3bto2wns04xhccbkqgyr7xj0wk61g2g3vqnmv91pxp1akudwzvic2lqzhx53sh4h6d6j9hbkvnjk4xon9w0tnq7of0a21gan11sxme5tzjvv6lfx9y8c9xqe00q8q7zpx90m1ltplg3jahjw0u48a7642a2lqh13g1quf4pum5l9ungeh2zanqf3bag0g756faj9o10rpc5d30chwpk5117sb2o3sklapj5jbqi66yb5jm8apu0mqam86hqpmnga9cl5srvs23cv5fwmohm6868tj8urz0yhyhvfrukkj7wrjcpqomqpi5mhago1j4co3m1tgqaxi0yj6yahimpwjscv7oi5xuqnpaxjyd2jt4qp2q3m99dcezrdpm8v1frfy57bv7kbm36o7qwnj96gr5wt18sx77w7qb9ibta16azshlkrn6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: 'dv2kfkjqkutt2b7o2aqzh2m560ps7wsvozsw6fehrthcr6a1zk',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: 'iwjqr3lvux2lrv0mn8g5',
                channelHash: 'vbzd4bsjhfgs0sasv8gjqp9kn4y1jlcxepqs7c28',
                channelParty: 'iofwzxrte68l4nn1sjez3vemlxx2uw9bdo3so9haglv79h0d6f3rxx0dr5ovwk28yf0pytlc1py15afhnzh1oo8mjnffgojkt7qlhhy6m3p4i347abf1lvdjqds69r5e0604l17hxgai8aoio6arp1x1inhyw5cs',
                channelComponent: 'jb3w8qk344cvxhvgcw7x3qfq7mx5xya7q5ioq3nxmz5bjmuhmaxuo9o48zcis1ncyxuf9th6eccjith5c3qfyfk5jg5skxrpl4kupa4dsqqyn6nhp1n9g7i2m32qf1q6am5ook50vmolossycw1d47cnpd9li83n',
                
                flowHash: 'tepzrob5h2bokjtij62f8rf43g5klb2jyin4el1k',
                flowParty: '9wseln4z1r8gewqn9ld16fwciokqlez7rzki5votukxma8v843e6t1rskqi79ors2wk1x6pxonn06gthg675qqmgk65j83gs6rwagh8ubsjnt27mib9dhwaqhbcv3x3lo3lueey923z27g3pbuc2beaiqgvabrey',
                flowReceiverParty: 'sbwdxitcv3qtia2459ekaxtp4gd3dbtkz5ab39g12q8t1lzuwppajf0c7wcabhv53k6810xf21fos6ceyg0obo5fhy7ft642fp7wsccw440zc3b8ai8ytn6o0kg28h5ii7wphr3ah1jyi3g8tnkaxvix487tunou',
                flowComponent: 'a8mtjhdz1cxly3qjvlozrer96g0ap8xz5gshusgqkryrhdf2778nqyvscj1rsi60ta6ut9nhox8pr475um1ul4bb6a4jxxm47c69uj25nkf5y3rg56exlc3yv9o1d8rvjqk7d0yl194f3ainz7nqv3cixvg3xcpj',
                flowReceiverComponent: 'cgiz5zzgp545ihfia949ni71lweiwydnc1z8n8ecdfqzj729nk71zvsb4duyyrhmfsb0h923fcyiv5poq43mx81ak4dqzcghjxwwv72wob6sbuw8chv0udvkmywlp9kngdyqjozkm0b6qjtgm7u3og52m0v5gjdq',
                flowInterfaceName: 'kdcw6d1y6xstlw9zwa4zl7qedbxyv8miai9g405jntq40nmipuki99105m7n2mnpmsbaa31t8e3upt5skkfi7htwulr3q9ci9y1imuhp75ncotgrovc6b6f8puc9zfueikelywzxged9l3rvixkfwxauoooz4rto',
                flowInterfaceNamespace: 'ppvwxolvgzatj8b35lsbe7u7e3ahyrtiku866r8x42wihfwuy3yctp6vhrr73v2cyainucdu6by3w4x4r2az6xrd5643mhqcem4pz2g8y15hes8hu2dysuf723k0ng75vdotrm21vc4rzagmtyiflecdf5j48d6d',
                version: '4o7xxe7l1fjpwwg6urvg',
                parameterGroup: '0j1cd8mtgh6i4lesql5st7fojjkabqtocks9dd9mjb9cu1fdgantwwj9xxghbmmuecvv6lrnn4fd3z6dxlu316mnihciiukpnsrkqbbmihmppce4u933y110g9z7zg7c2wzxa7ccrymaupd14rk8evn38i0vznfag972r0prfals47kyni2fm9tutqbur3z8941ctgjn6ewzlblybnsfl1m71s63aag45iwxtuhqm0j2vk5bizjovmfono3iwww',
                name: 'ds64gti9usyvpv50rmv9ce6xcfd0ksejgi6rvzcdkbkli4do84jo50trnyahhbsbo6ceptvf43ltnyhk7tfrn48voms7oyk1ahmlv14t8ektryyr3dk0rxpbydp4zv01an8sjesw49y7uynwx9c5zdoh0miqvypaxjixulekvj2n86v364r3y9vvarzy9vi1dfhhf6q6rpferjhu5kowxsysk0d73q0pee8n9vu5wqww058px24aclrupdi8fa0kizcwlfss88oa9326s9s1yyh9hrh9z02m9jgt3weemzs0ajw56ukq6hcw686hssmd',
                parameterName: 'skjwgpcxljqghgi0s9yekjiwnx4n5yg31alubu0wp3jne5zr34acn1dn70xx3jzuyw99sgm0em6xuwcaanf6da1kaowjg0s5hbbbc7a00er0x3yy4tfk2tta13xvb0tz5ittx2i8ig705bbp6jsfb2a3wplzwk0hqii4dt3avtgogp0zpxuaq7bt3jgxb7htzsoi4y3dcfxaib3hebcyvywykwfic04cqy9cbp6id9jzhvp23wikn4rrui43q3p95d3cc6819z8b1eh2718t2bfvux7lmada43c9o3pklm3yi98ki92m98swr1y9rljo',
                parameterValue: '9h10173x2lnlulrwemycdzbcspxaj239oj1wu4sfhil7px7eiujebfuxdmjiccq2q2yffb4l1wmk2it6cgz7so37my21rxlrmqt2jbhtveovv2is6u0n45hsvorbfuv9tctc73yv8dlxlj6qd8xq6g0zpc17uugxf2d4el7c8ydr31x4u1eyv0lkvgd01qom8fax2bo8s79slas5g4drqe23p3ys79rvta2tfhtgy6r4jrm77oo1npjtj5ey23ysdt0vksna15w6essxxwuhp6cfnxsqt6sv3d81kjct0ohpcx8amyqp755f2sii4wt5xkstxnua8rxwa4iccvr5pk19mw0npgzr6qtazrknf340ccnn8ijllg4jnv10zkgrbcbexexb4jthmdeg174msw94gyg0o7t8dszy9vml0qikbahrsmdfzasqmo5xrfpruefo1tzbs2mnu7a5aald80ulgdrvuqevhyqwtnwxz962hh8x1ykxc6gcpnryl9efhu1ok4wxwvgx5xe4dmo6or24uad2ghikczk7g84vu9iie0s7n87szoixqnysbdgmaiwvm75wog8s6ecs9pwer5q8mu95bxyaiu6ru24uz7l6mpf9j3noam4etafpn36rpytbbv4l17nvbanh4zgxui7lpvmxy6nq1an4ari5iuzm9mcttqhjcqdbdgje0pnmbj8w0b5cylntsont8xouhc8m67fisyuvix1aolhdtywlfgu7vssstllfzpbzbf8vss1731va6muq4hl2hunw0gsdvfzsejiio592oadg83j16ctvr2cbjflrc4rae6uvtjxfmk5bswchm1uf2gmprx82lmn43zxljknrxx0a0cwo6d192nvqgjtgbw9pbofq7m563wm67c8v27j37quau8w8eelu67i3br73z94cpknlixi6y2365d9ppm3cx0wqits8mapsshq5jwqykolzhkc9lb3q1h2oj8rryil6bobrggfx9oe2wxtl91cvdpos4i8fk9rxr2gzq2wwjbcgfnt94uk2p3wjlb9ktl9bsu1b17qkm7l6f17oldae2eurbrvl1s8tn4il3wv38od9l5nwakiamd0gv365su7yb184g4lbtgxpwqrmm0e7yvpc9sahmaxct1t2k9qvo05k54vpxsd2pqmfwksscxp520lsc0qezqimuesav2p5uzuuhewmt9yg540h6txg21eq2fjfkpvt486lgl52uqrywwoaqgtys85og0ivmxi35upghcd7couxcbfxzfj1b8yrjhh1ah5ibfq4as6ziaf0rd30x7kkd0ukf2r4w7ql4k1mmq1j3aa8pwlvvfbovu0wevcodbjn7di5kennwrheb1uv0b8ekpdah3c3as9rhzi7cg2mppxvinkfqagdwth6yvkt5sacm2rha51ircvvcfqbbgj18o0hx52b9a5u7o0dxm4tkrq8iba2hhgdso6hxj2obvf9t0ppl5lfz5h3v6aegyuob7rcmdvuoshuelpogyfphglant38xjerpr06h59bzvxonv3tklnqnrasgyzezzwphple4l8qcrj4wm71dvkufqvlmvir6p5h0lmbgsdbdw7ob1kymiyapzxicval0asevljkpm4qw410uurr1uhd1lnmstjvh0leagwtatni3gd1v9e8gdhrca47aycukwhwo2id5zmmyrubssyxufyw41z923friqnsslmzlw7sqgv9kzgt72bnc1flvw28zvuwvwgj1ijp1yfqrldgtvrrcj28x5q6p0yao8l25tiuwqf6q0etrcht7reoxqi2gggrs2i2n3b92pxmibbly2a3ws1wkyznvgemjvnowdqgg3pngi3tkzfau92gzi3mtrzp3pga7ykj7s7t6hrmkmws7s9jhot38rpwv5jksgriwqe38v7d55u6lv36pfle1nvmy8c8ee3auhqmjsox4ux6i4zbfxce2fpbwf5uupegvgk8ltskmgoo7zcsz78hs2govyp0h3prsskodw4e',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: 'm884bku24w28sg8yyetf4cmua34z8uxrmk20vddyqswnoh6xwg',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: 'krrims6ec8v628tntwt7',
                channelHash: 'o4nogur37gxor1dbyrmqwtzoswlqbbm3flaab2fp',
                channelParty: 'pj6zjjz8e4yfyel5kbwhrpzwf71ida6ohaeixu0ncpq88lovcor8tabqvoyvnj5gynisv2qlhhwjq08ayxfjg5j9eq93t695j09rndtloikla94070nhq0ch3mryqg7zigry31faiqfx1lbtzssshx6ba7jb63qz',
                channelComponent: 'n7tyzdm9adpu6eg5stgf3ehzfy4x6ah4nf5qgc74blqo0lha4nmfof5j9rrv8shqcbpa6oeal7sqqjgre7n9uc4g4pzxm8eg6w7m4009xbh1gos2kwz42yxt1f1iktfqu1j8x9ns3ajx0gdum6p6izss31ihh64m',
                channelName: 'vqgkw4gngpqskh5wmg0n3z9sa43xtenj9k7wunqkt1ryprexprwi4oxe7x6hpaj902c0k3cqe7np23ourauw08bemu33hbev37pox53hstrc19fdpz1ptsx8lj7pv2k5wnq9sbih1yw6zuintevjoofzmc83w73k',
                flowHash: 'kida3vc2ets5be2pe8fe58jndgv0fvfgfkvzk998',
                flowParty: 'm8c8h1284rsupzc87rmpx2zh542fjc3dv6u8etnt7n4c5zi1z4fv7d3q0t3wily8j7tgvk7b6o72624iqs2uz7yrcbgwrubeuhozl03ba5diimz1iuinl50qc7u3plmmeetvy0brb56xrwcahclxexukgez5j226',
                flowReceiverParty: '0wsk9iq6mjhjrala7ijjiizb1674n577tvv8cf5w34plp6m3mpv39gr3eja60x7yvtar2vywlkamgxeqq3ztsfl677tlj9zt08457maww9z5qaz7i759nfwbznezwnn85uf3u6jsinvqbi0n92w2vqvdcgfmqce0',
                flowComponent: '4cg03fgah6oa23d33qnd0aet7im6dxvf0cm1jtbzr99ftksson79c2ksqjtxak6uoibl4txdmxdg8vhf5stooq8a5136gs5kyaybmo9lpquoecz8s9pk3b33nf2cfi0wfxut1w7hikpmmf2dr0krgdkwjj1r76tn',
                flowReceiverComponent: '57u7lgp8yp3pgxfcsho02y7bysxhlwcddeyt1j0lzp1c3jon7xmm4918b80v3g4l0wbdjguibagk181h35t5nfg6ocso3f9ic7wey1moaptdhu9whhy2dl7hps4o8enbcyly0dnfbwf3dthxgcmljg4i2ixhd7u7',
                flowInterfaceName: 'vn4xjrzcn65g62fs4prsj94yoe419bdzzfplm7cf1u2p0x31wy3y5ol2515mivxz8c8babp1k0hbkwud48fomiupz0tq5wzsmkhwhqzpn4swncb3sft7soqtitkwcc2eqelvvnsucdxpn3hnimx6eyeeai5h2eik',
                flowInterfaceNamespace: 'vuojti5nmjj4akuv4ff2408ky96rvcju212g7laxdzy8euiti6ehxtis1i1nrllnd4zuhnvlpfjr2jg4wqvmk4mkd6q44fgilb0mdfuo38pm0xhxa1t6twj8cng8nem0y2xqqgg0qfkbjw0bo4gh0q5d7qri8pnb',
                version: null,
                parameterGroup: '3q79xgz39ttti4lnr6h69yja5xsoe2lclt5aeal19194qcsu7mwedrguteti9j56u50nn722ch9b85gy03k5gyc75h0hzdovxrjx2z0heisl1huenejnwyb3qxtanc7x1q4i22tvizr5mcrcge1isxfz078lsbip048h1mk13zlqwwgrexwfud8wor63xbygv9lr8jj6peuuepx1auqepkddbr6ni2g449fv4xfxj1gnwkhguck5gi3zcjyczjb',
                name: '0x0p0ry94kc5taac3a827m6j9r3ty35lbdirrn7dydoj6r0jdr6oyr7ncr4t78n8wbu7b6ioetrhsmp9hhtvenqk86s5x9ov4ag1od2ncamyhbai4t36ipcptq2g7rpcr67xilenloyxol3pliitm2vodk0gt5ppjbg57urnsp2ul0kg7wtcjc1fk5muwcssxp67jrcfj2klvgyutvsfziono3ixr3usrsfp48nnlfdzx0pcm7qna1dh83tscaivs09do5s3qnp8fcty82kve8zbbmzvtcfqlv3uh1z30vxf60w45c725o06l8os9xe4',
                parameterName: 'hwu6837sa2ziynu1nea3dcr9gay2mstxrq8g4aj8o60o9c00uohwf3uow9ku5xukbrj65y1vrn7v5y2md96b8e01fqs4wwaekh0cmvu0ohubwjjzr97x4esg8j9kh7hc5nr00t2rk1vhfddmgz8mno37sn61h64dsqs9lwlz1taenbhpyytirmle67pei02l3hgsdf1aotvksm1kphaez59wgpaa8r53uqhpk74h4ee7ajwtqt5a34eidlaqkda1odit4ywzkbox3f33f73jvu5bah3bviepu54xidgukgzcg3lrr6lfcms00n7g6r09',
                parameterValue: 'cthjsuzo0p6culi5xm1u1eelwmuyagy3agbvtkx0htvnnl2z9z87ymfg8ibibcrbjbt4715hx0y5hx8xnraeugwm0xcd7xcsw7xcyil4eevldd8iq3d869t9pb7d50l27ksvgz8752r7i3z8a4s3jam8x397roeooqmjtkhz3bhv7w7iw8bnbau1mqsp4ted7n0qex7v1gq8rzu6zmdcv35duasjqfv0odxx1hrp0ihhygm4d2ryj5etznujn0ar4vn8bew67tt14p0us1fnz01153r0p6id7ropgjw8uuqobp6qa9vxd9a8tqvlhlhlpx6ohiz1j2pxfo9fwcv446a1jrei9xmh3lej2pruv3l796gucwb3je4pk7vt164vucj1ou3gvwkpfcflbmhujbrlw408rvs4hzbi1eeejptkgqr9zs8wxzukyxet7dt1p4wse3psgncz27se31nngmooov09682yjsgxuzrjft95za3n3q4tohp7jn6n64woiu6ztcfc0j3ia5n0ufbt18u9t1zq4ybf3r9gf0ijb2xf1qat66bzha0lcodu9nexak2rxrplqojs9rzbflrb09bokl5z8vmdijt3kjctmvdxeui6apr8gx7voox6v9wqwgj9akmvxy1bl90hdamx256yzhe6grrmkrrz1hctsbr3ez8vchn2n9u9xc1yalhocc0rq6gtith6j2yp3wg1ow9qhe1aa179zquo9vcplh5g9wowiqdlzg5gu913w8y3r43tcwp783s18hhxk44g60plr8r7jzn88zyuhbxutoohc6bacqmut2vvtyfqerxbdbiogczojlbyrv883jheik8a1rcu6jsq5exzxqkrgoff8yxkn42w2ufm0ocgz6xs5nd4r71mo9ceh4v972scc85h73lwpq4phs0uiobopxvfrv81343yum829rms19c64cvu8lwih8kya81dy815kn0ntv9tae7ax74wh5mug6mf9c601asrhzhp83zu43v2t0koqv9yj9ik2ble2azq5hr6gt5rfxaz3aikni58zvifutzbcwsayy5abdtm9mcsyugfiipu519rkqvnwal331h5mxt9tn5961ghgbjv9j3xah57s2tslogiqicjaigaefkqfqg1xqszs57m1t7bgk7r3cdc9wjv3bdt2oesyibu0mh80sddl0fl1amyxuiogw3vms2o3hvbhzgsdyk9lyhaxfantkcb1vjkl2d7ze9nh9bhhymeiwmexl2r48ybqbz2i1j10hsz1jegpkao2zsjxycfnmel3g1seri9zlblbckq5avcpvqs0s3hg903pztzj9g1577s2wwcmtqu5cskjz6e32vj4fhaapipoy0u70u10witfkokl65m996jh0i5we890pr51kfu1e4avxi49znb9dl2kni2b4begiumfrmurrfn1pff4v752sw2mlhlpw40c77ttrgicyovppuumni5kt2io1oct7fit2i3v8ux3b2y30ncy4gzypalxfacnozdm009kulypw8ciktkc4pr0rakdsp3lh7lmkkq3xfcahvaby8t5xc92km2kp9cdn9k3ob6oyutska1yepeflbnbyem1r62qtiwlbwa32jybn8wt2td95jxxn96gpdnu2e8wudn9mp6bd7aa5t2ryvudzi8yzqh3pdejlye4oo3bw0oa1nknfkih6cjt604z7ln7iracw4z5ws7zxe6s5cg1vwe4wsyatqfxqocf5rwz4n38kf1no1vwpd1sb6bpsnt7ux3d4y40ajf5l5uafjoow7bp8m12pw71jl3wy7jl4hexw10op65wnb44txrsb9ys3rjzu6cx2hz6zvithwy6pnboxlnmo6b1bchb7nmvvx06k21adwmwjo7d7f8iyrffzw739gy7t73y8vmmpkfk2br8m7eeepajny306tjofhgqpgaxit0gl65zyma67ro637axoph28f3a0g6racovtis453px5iikzjvnmjfkmcgscyt6gfuqht3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: 'sn2en5g52vgginuuhwidhrifk2bcrlq6sulysvnmnpyknso5ra',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: 'mdng829ccll8hzwwp2sx',
                channelHash: '05myyjnk9p9g4hpm5h5kyy6cwleacs3z2ju4oat5',
                channelParty: 'guwhfmtzllun6eaxzm6j9mbr6zaht7ev10l09rqffhj8v4mnb2a2tawfpcmr0zh3fp06ayrwbmqubp82n6306wftp1u4sdmf21ur4hcocao56uev5a0acfm2aro2ozvumoiaw90mh854j53lo3dqx94tvg348att',
                channelComponent: '0t20cq5051h5pe238f58t6jgreyp09h1bym13srkhacsg0aegjqeruwq9zsqgh1xcrrwmeg7tgprdiwfvahurdmwxfshr62v5rbg6g7rwrhw4uhh09re6buauqwx7mfh21pjmsiasndra3x7yeti2yyw3w55xxbx',
                channelName: 'c3vra0phusou6jnzbo6qarfpc3o5el59kw04v4y5aj3uu2lsu2pnatz69smay7ugdb1lnjvowagqew0otomwe42mqr2ft0od22c1zshcp1p8d88pgl9144tytn6cs3iiuvgfpsdpfwdt9arzjncg2vqvtt0xyjby',
                flowHash: 'cglqiglf0vwvunn15ud99axl007md9z0q843557s',
                flowParty: '94okdfda6t05m3fsrfipl5u1nkgs1pid469ockn166qmnkspqcvfx9gwph8vbzu4pz9nj9ugpw5xcor1djrfejn2poqr522pb7r5rxe8ijano2vgno9kmr71lb3hjfmpl1rl4ux21zyh7kxpyusy6h0qnr4pyass',
                flowReceiverParty: 'bma4hkm1nswvzd9pilc0tbl858antj6qcn8nlbi7xsjng2xw9hi7w1lqewyat42ibttke6ef897hmn05cg1mwq0wdvg1ugjudcp110v3i5y7mxzxqqblddb03v313dmnsbmqd416ecg39w6tfjnvkn01n4pebd2a',
                flowComponent: 'h5m1dv12lfdjaitq1gire2gludyaasmui84a0eikvo5hba9m3b16wb7imncxr7ayhvljktfdl8v7vvahgo7559rqrpci04uurmq5m80yq67w6vwgp0l8iq3nsfgo2jmv0hazcp4gcuscv6vx9scys3crwx9yt77q',
                flowReceiverComponent: 'v1yxlota4wfs389fa7nvn0hbguzow8k4g5xp4ipmmcs2kllceykmaaijzgelm94896d8e52dh5f0if1xmpgh8ttka2lc4h79ic2pmwwfbipfx5m6y6qmhu0f14487o3y4yuwmt5u3vp2dyyn1gw5907n4z6lq2h7',
                flowInterfaceName: 'w0rvxjnl6w0nttiokhbx2oy81sozax40sa4gg0eeunya925jbrz6c0n44pjfpmso5hlinipkaniril8v9eg7yqkch1txo8c7xqolk81ds9ej8hq71v0h1jts66ty7bcop59z5rfkxc5q89z246m7e4v7awbs0hep',
                flowInterfaceNamespace: 'o6qylvzh7kq7u1txteaubfvszsvihobtxt0ci2ah8tezwby3bk7gqzyc2us1lp16zjcgkb86h7kv0tl1caz8gd88tib32sy7uculodzyl9oxt1fn2vv87v39qidhbao1jpsheha1lsi85qpr65jnu7g73zujo3vd',
                
                parameterGroup: 'fu52p054z0stuglwurix24q96ezx3ia7nl31cab593cc60ysmto6jevl12vt1ez8vytb4uc9lmngvdookikdvtqyzxan12w5umz6q65u1jjqk9i18xk66epsoeokw8ld5yrfz1jat12t4hvvwm75tucpxkcn1tk0bybuwydzcag5sdo19y5t4x07duib58b9865pp2sujz2nq0pjfvz29vf4mie8dm66zhjsqumcfl69x0phi7jsejxg8w9ztgd',
                name: '5l5wu5ad2mleuxpnns7xhy56o2odz44qrbyiknuz88gvskhm226qjgdgyg2hpzo6a58jlh2fpicvfjpao0onj099a20qqbs8f16ct2rhl7ct6tsnn6s5xjeufreijafjdjfcaftym4q4lsudult9qqspl81hi95sq3sw3rognf6dsrnhxbsdhqwvhx1ja8n8t28p816eptehxh4xoeggqphy1kr5ggsq10dc72y0j8zv7hm3eiab3jw0brb68957h69eap32ser9h9wd2hdm4s25rksqtnm36gtwtzxzvo436gc54k7rbd5cwx5es539',
                parameterName: 'vzadcchhbe7rgp4nlhxq46v9bedkeq8j0tbloustg001o0k7e3xvl688zksd3314zkz5uziamt0tr7j7j1y9wxk54t92i5r3erosnff7b8g08gbcdhdy6egyhh51hqn0g6yoq4nk7pmsgz4r853s0m2i2alpc8ne9up61dhl5htfzo5hg1rwjo7w93ubw2ghgmx6pajs1wn56tmt0u5w02rvkmzukux1py0sygd3pm2xp3qmp51nxpitxjfvxv98jdj6llsdna4prpebkicgomtiupadbwzg5ekp1927o35jcagbm55shdrixg86ues1',
                parameterValue: '0b91oqhhrucsnkmowgifayy853whdv9zaluvzgz20ha43bbf2gd9ch2deg9ryop85ryhmxq296rj1i7ed4gw6huxvnub1pizbwmh5ylwbu3b7sxzlrl12i1y2tat9ug4q5h7f821ff8fxryh3u4ufjbhz9zuyv55tusu9zlhwosyysvgtn19ddqpn8u443rmoc46aidc23jk2ugxj92jvsuoyl1mrr6r53qrqzbostsrm7vu9r8qm345jrtarz9mu7su9y6stgtry58o9lv4ezes2hd6mz530s0wo53nhrm4ob6di8bkcht9z78jgu18d53kid2a08j7e1rrgas4m99tchyhh8t6d6s9vem201wrb0n0znxi9m3sl6lieytbefvur5rqmccv0j3uytjvt2f8kmei6s5jsc6yn1flfj1rpofu55ljj92wmx6spryxct0os11t8k6dlpqhyr1yina53qnbq9ijkkg7ebi7fssduvwf7f5uqi9p6q4g9rz39cowoyxn5u42p9cbghuh18mecznhjaol7w7mkbcl3tebvgqgq7vdoyagcsqp3kbzt57ggeyin9htmpt2e2222sp6dpp37714ve2qet1kcwc1d5b9ff94rr7mwgp4gt9714c4bfpya5qi5xauiiq8wlngzkbri7zu5wstskc2b8ysqsqhz5wud9ns35rol5acd7ur9vhrqthh3dgxwal75butm11xor0qk6o0jkmeou0txq7pjl7t0xlvd8n36opv76gonqeg6qa87776t2yw9qtkbz5og1rnup24papekvcnssurbx3d6a4a2gvydirm7oktpymsbkn7xb1foq9zrias8w92jbdn7567sj4x2pso8ipwl8oikcni1m7pglh0aovdjht32xzsu1ngy0peplyyc9tgq0fii0y55fl9h5i7pog7lnnknslssr9z6k25tngbd5i60musrbw9u2dg0wymyfuemku5rztbid0rlnx5cah9fxhth7ma56ckkff0xscunoiyh5okhwyrkpfj2lwk57mnf5yfjd9czhop6db2d3wxcoamlbfeo2mpwl65p2a2i20sigpqvzknzey89tq09xyvlgae36okq6ljo3x216bundfksu3y0bwmoyaco8t74ep9r4f6x8v6v7eiem6tanjmbijsjz86mf7hx5st7axsfy5b6wet429ewc3lmh8el1ey41w3zg50mx9vgxbhxwyyqzvpn4u6vdcu28bl0xh1xlqgbia04ll9zwuo7jyw47x9j6493p8f15v7rcq5se8ylzjm1dos1c4ut6spefze5l0dm03wkr7hfb4z8rkx4gmqz4gfkqdz9v9nuwzivj8qdhykm3uxh91h0iea95pdy6qpn4mq0uaj6ih0st43gf72ynbxyuu38g7nv0tw4aib44a1t012qx3gyitjhxighl30a49teqnsmspemh8tu77bx3qr1toymkvuyeuoueakd29mp3y7ig2tff3bwn5c67rpdkjkgnizw7waqmtosjvzy0ujr78xumarlpi4faeuwzoylq8dggve99nz6a0vzkddykbg8d6pz3r408gdxlvf6o8evnnes61gv45p46pltbibzbgi1o3mcy89m55yb8g9l62s67c2z8cmx4asrunbkuq20fcizgdzou9l6flhtcr7d7gm90jig5gynksp0att7c7t83gpw0y5s7jw1ubuzaax8hy8ozhvfj3o0pv7rkz1h7pwm8pg3yrgepx4nscculyfisha1x5fpb52lyt333777u9cliu12om0coaeuvyd2wqwure5pm8cfu0lr6crnighuo0p2pbg2otpp483ik1bi904ayccd1neux0wxtuq5mz6alizysmsz2dxxk6v1b2zqt6xr2dtl3xu9vrn3eq4ems0twzttjawgjhk8cwfp26bo0zbm8omk482c0yjty6o80fto16ok76w6r9042qppt02yx2v1d0gsekq0vi4fksgcejmdhvi3chna3vq2ybsvqvfhgmt',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'zijxjydwokwbz2tb2xjgitnw9z24d9ndiecv6',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: 'c56aretw083hfo70oirrgv3xia1flbpnm8haj7dl9ncmaiijff',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: 'fxzyjix3eblkwbbqr83d',
                channelHash: '9drmew4npzhlldhwovz631s12hp4oboe6zhhf7pn',
                channelParty: '9pbf94pa3l839pduy1qtprn7dwtozbk0ewgkthyh8881hr3pslr57ex6n3g0w17ejq3oveujmvjlosuj6je8jmmqaqahgbt8w73xa6pyvzc11ttmlxmeme5tn3q57o1it4zq1fc8isy14uf2q8zi1mdbmoh65mru',
                channelComponent: 'luehevfi0dkzjt71afrkjecg6657hp9xqw0glxmd8g9ohzazsb6ozwqpkpilm3yyd4uxruo6h2662tnafm29rx3zysuo71p7vcmj2psl2qlume5ipqowpqh1ljz3mty3broi1u12i5fxqvlmqfkyv0hhc1z8xap7',
                channelName: 'x6r9gpuubvlqj6gls6yrqd4c8e22xk9afl1hezjgfm0jlkmyis0e97bqw2a7gii18mq54xqes2fi5b40aosej9k5wt0b58lfe89xi3bn6r65xz323rltixcvzf9smjifckjm3ngp1825awfkkwjf47itluearywu',
                flowHash: 'bmfy80hq3sbetbd1t682fh78julyzdv6100f1qyz',
                flowParty: 'vshtlfcd1t5n79wh0ysifkysb2496g5k02wqx3gq9dlo2dox3xab0wsrtp7lx7c6pze52d4ahsugw086wz5uzdg6pwyqz358t68axrd8yu5877ua9kye0dvtkj2slwgi9vluz5qgnak6a6r9sipgr50c4sbmgsrv',
                flowReceiverParty: 'vnz5lxjw5mjbe2zbci22fsamg672b07dzlrnmid7fttdho41umr4qhgv2j88cnfxddvas6atno9hc6owca7457fah5v4dafa88dja53isz85z1notbbes89uude2cbjaaxmcvlpansennwfahw55fjkuup1w8kci',
                flowComponent: 'nqdomdp7svwnf4hlqhlj3k975pdukrmvn0972vzt8kep8euai0oj4mky8op9bdwsaesr5elca3z7kj5y6kqe7e1fu05igfnj4sduj75tz6qd4mnx1p3r8827tfje5rgq1btr0t9edfx1rlcxm656vvlz2c4wvmkr',
                flowReceiverComponent: 'angpqldxtbbpgh2hfx06tca7851jfxwoyvqt6k127tk86k8oiknjez7ib5s6umwp6sn3zx717bmlyvg12ylzulisykqhf1qdhstpyeo78u1cnpm333p808kvvgt5w3ahjxg87h4xd0rann1pitvok18mw1kqcqk2',
                flowInterfaceName: '67jyg7mub5qify7wolui3vi4bk6g2qyu0pbbk12y1qj7r85cobg7uigdii6ro97rbpkmpwe497ggehp1xxmr6m803rsugyv0chmlkjc6vln91zzkeqo102raso6a6262ufj1j7iw935fluyrqkyshmcld66u5c82',
                flowInterfaceNamespace: '14x1e15ws0wu3zgpb9jet9ms8m784fa5d2wd2750o1ttxgwegus0qwq6p8hl849j7dbcckc5ar9awzzhm19eiy2yknxf2s43t4r6szd5qen2hevqairfktrsw3ak9rhez6nvrxqpqy7hhw81nti7mmt9nue28od1',
                version: 'j9jwy2l2ngv0x3u7v429',
                parameterGroup: 'bb6xo5bwa389enrp2ok0px1mdvh4iv5e7va9xt7egmomzrkhiifu4tv1cg2tjde0bxz8b8zw1a7mr2lp0wfqs4hkp8lzm34ty9y3y77m9xfe4fvvi795zbq9kcea2ivie82n8ooiegd3khis4kjqhcygefviy19ac70u631g1087okrmh7bdhrwlica7u4sd0chvhg3j8drmm7aae6cnmotl8m1c74u9jqej5js22g9ey6fwbkuzxkh28s40lki',
                name: 'tinvpj16a5jy03a8j1d6gpecuvri9o0lwzunvhn8vrsxhxltt3s2z4wa1fdt6ztfafju09ku58capfnnk76tmqes4f7qvrty40vrcdq9uf5ug6zy4xxvww6xdqhhueg0jowbbaazrmxz1uwqzsox19s1t320w1hblnv72tc05801h1rfp4pgjp45rr4577odk922aswpnnraj32nnx9ead2z3vib09l6ugu9rd7f0q2tbqkwhkqz0h4av0xlsyz4go3c6l1bfx63jxodnhgzmcjy3cxjcct0tbefjmwgexwzshxgv9cg8a7ufyxth0nx',
                parameterName: '2qeqhvdf4m098r3u8ntkymo0y3zihcpw0xf211zmd70x2vssa2lkcke9ofy0zbuvd9wukvhhm07qrpvbwy72tq80u86wwhuoagcd006xjdpevwwhv9tfjjv65pilioto9m84npohuedpzv63emghsetlfxh4xp5dd8jp3czdfxw6il9zp5l60cj0p5k4498hvoiiq03afsb6p5ij09t1vpxvk6vy4sg4x0uagd259b294730fax6lu4rc5nz2bv5ajzjmhvg5e0bj0ggqecl6be77q8nhrs4etv7gqirsf2dz0hlc0cx82unt3738bkw',
                parameterValue: 'pqdnndqwdphbcz9n0563t91dlqv0qprdwxc12rzyjmptv7yjrqlxy4khnw3479saehs83n1xj0arvx4pnhe16iuez72bosoogllvrvc3w4d6nq2u2hy5m5oc4kanhbji8dow44xafyr8pcc5c4dz75ta999udp9fb843ko9w3hoh6o4osqn886gpzoszps0bbtp423d9vox55njewt4dmnqxpy38bytwm9w9zh99bvghke7oglai5b16e2429mqazu54e2wck2w4twgl8a6jo44q7cx78wn5755us7lkmae60l76vtag2gy451snmxa4ihbgvbv0ajuufuonpfse8sov3py5dm0xmsxkcalqlpe4q8pv0738emh0atxxbx4uvd2oxezd3z6exgl6v8xcg6dz25ulxnq371xw144jqc9fbln1o6g41ay1ylb93txqbbg7jackpbm3qh7dcj5mfclbovmfpwx95vrfurzstozpv5tk1gpowhp3asfqjsbm4eud9qrgj0um4m2un6udk5njuoiohej604kpx23fvaxnhshpdn7q4nqjngevqq7q7wz8veucr9l1t3lpzy1xxfkpoujh9bwv7nyywg5td803l1sen5syks83s8mxl6v5a29t6iqk0kq478tb8wcwib5h3p4b86bb80vf4pmbc2k9kk4gxuxoty9x6f78or0yqi8s9fnq11m9ae8rfd2t84xn720akgln0yzvfol3bg6ooh5d219use7iquinhhagtpnaessqahw4e1xiqcvn8tnil7h3rhnxkwh8l8cwfa4m1rpchqkzdu65ezzq433idzr79km3kzok9xer40l77hfiq5aiojqa3e3vumzmyvx2pucrzgwe389bnh5rwtm3sjhmjyb7ajln6f402p0vayp362mexy8leu50ugtgpmafprju9bor6f85ld6aa53pjrvcx5vskxjye24hki27b2yx5ho3fe7w4yt0u162ezq6p95xzs9kmuq9ex2mpix2p5f9uwi5yy1bbuv5fzpxw68cqacwyhlm13ae9qhd250ivkcckjouthv2lf8s0ee3d9uz2xj3mofpplaklv1wch9dnm0aj8nlxqnju9c4gtuawe9r5ol6leqd5mmpy0vwud88qg2ff738p7qud6m7nfxy95zvlo8mybj0qikvieudb7ms6vofrcuevq6relkj7z1x75h1yggachqchsd6mqov3nn7esepowvtqlgowdl9xqn1e4ym1dped9vpgmu821486l6m50tzsd441s5enwzqqeuh56fszj790d9akffbk168vo041kpyht3zk35z27qgld4mssenr5wv307k7t2wjsjihing270b7cvcxjxei1jevmshqe0y9gai5m3xsqtd7iyzvyl6yr1nrja127sa1c3res7tlv3ngjfjqbb3gfj6cctfpvcdn2wvzcivmvl2k8b4noi4onzp00oj95sw29bsn9cncvas5sj6n6kxybhre9nh5ak1ub4u48y0csawbudxhd4fr17lsymhd72kuj2p3jot31bly57twco5p4ogb7jdh48l7jdtyrb3m6fdgo96isghnvgqab2v96382evrntf4nft9hy9upl81lcf6di8ut71lhwnbtq00pwatslzt7cn1djj2v5xmxneh6grk51h0bflzxwg22gzvaxujbs34sfs2zbpgzbjrm6stboh0rfvbzojuvq3ed1aeeqglr6q02mwldwexl7iz0ufn071x5mnwosizklj3f4d4dmn1xpw1uzrd7vo2qdstcdd2hfn509swh0pcbbynhpivezedgm9r3yldjuo122qyijmgrs37bi95cqmlp19w804fn90evaphvfbiygnoepujge743nwtiy8gfsgf5gcjd1ga9nc0k4sjnazxrnre0rjb7akzobvfp19ner1rff2kls930gxe38lh10pdmxn6zbkn2vgvgsi2bh1xundyhd3silckb6bqpwldtmksa67pzytfz6npv83woxyu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: 'y9i3nvmk3r1965pmp49hm6f3ds937qjpu2itm',
                tenantCode: 'ynabupgns2fnang276dp4d3k62zv86p0znm63l30qy96k0lkkw',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: 'hvga4vbbe7bji7aedt9s',
                channelHash: 'ri9s5qyzoqo2z8og4buf7mno2curzhhzdfzhuzz7',
                channelParty: 'vjpsejw5bvlu47b02k5wh99bkafxin0mu074422ontjp8hyieav78escq3gwjf6z7yeborxmsw53viki71q935e1utdn7te0sdku6yteqb86c3ztfkjvyx8mtbr71ol7quo5y9ge4zo2rm43sgpfbh6skbdl34n7',
                channelComponent: 'p6k4wadp5j046ec1rapv3lg0muflmvbsnh83fqlcvo0kzmcwl1q0ueyglejktjjp4bupg74osv65t7i2a58ao9lohzhf4r5p3krc05fu4y7y5j3umt17pgwtz1x0cuuee6oglatyydb9ko8duaq7rbvcmlg06sxc',
                channelName: 'cnsqvwwpypmp7z68kzjno0ehjkkz8julv4f5g0c2p76eburc5kyaf3jdz9qo0bo9dvgmegho8yowkro2fmjofz9plh6a836rdho2nnwi7exci17vs0khv4k94nwzx4c9skwbp7eb5ijyh8mstww16iz8w72p4ous',
                flowHash: 'js77dsm6i26mxh5epo0iusltzhg2lj1fj2ngr16w',
                flowParty: 'tum61oxkj8k8g41lcko3z8b5yp1gfuxp3w6xos6mmy4hgqs86hl414ll5e94gqtgubhhlhaga7ajbwgoxijof3jem9br405axichk7x15zx9ywc7tyz26s6f0qro62tlqnosmw2q8ljhwibarz162dd31nzo6n81',
                flowReceiverParty: 'nipi8ahonc3ra60hi9hpv458zrleictymf5uwmioibuaro3sn5arrgjorloj1e1vvahwx5h6rj98on3hdyuiq5yui3sytojk9exkr4a9mmxvax0qce233siuw9rgc8bautl0l9mj647wwil266pvu31y4bayrs2v',
                flowComponent: 'bo7oa8zqbkj5wn78d3t5st5kfcxiervulcid35y12g4afbuj1ywpnvfzc4bvb0pbnq5oi28u5j76otaexx52t633oh8ky4eryeviwwl429w9vov3u9wch9li9fpee5p4tj0uxx555af196irr6n144ibtslg8wuk',
                flowReceiverComponent: 'h88er1hwggsdw79zg0zwzcpwjkvwkg5872dwrtcs2wkfjhjzkzfp0ndv2t6ulg3un6f9ae3wr3xpezpcgmdfshulm8cg407ig0nnq4e2cobz9mbk74ya3zwpkug1h4ezi0h5ah4uwby112rro35qiyka17avhvp3',
                flowInterfaceName: 'b0kz7947gyvlo4jejfh5lyb8ytha718vq5bjz5c61ydmmehw2zaee14jr6k3j52a2w3180ewyd7ozm7u3f6as2p9qebdyh7ynmbiklk8g78x3xngdh1cqu0my7rmc09vifmhxwo1aiwj39tizhtf9tswvjbtwqr2',
                flowInterfaceNamespace: '1o0pymxhtwosf7omw12gopxkc34lndhmuemioz17eizr8meyeb5daqci7e5m1mz6ehn9j4julvt2mmo4kf8cgyuz2d16dpcy519u5i91z3k97u2mign8inuri6a49vcf7hqovrrh2e0mrfd0n7v1irr057g28h0b',
                version: '55tm9nyq2haqjbysu74s',
                parameterGroup: '35j2y3mhjvj8tzasf32gflg55srmc74649i0gaq89fk43u33dhahq0dhvxinf2tc6br1kf93yvyo3t5c2ieecut93ah5w1dmw85sj2ypj571qn3jjehxbf2k3d8uiz0lqy048fc0u7fcf6uksu6lfg6xwxka91bkr2kyxs3v7b1owttfygdigw5pgyoukd0r798l7wj630p52bg6pchy4xr38tw9sr6zcqg0w4snxyhfqa7zt7bdp5lond1crb2',
                name: 'y284t4ajmpy014eifejgbwbxtiwkxuwnie6thmodnll2zv406jppfbdf8695g388m0y3vibm2rjcs1nm1gm516zz3fv7sul6pyzhbzx5ha5g5z2mt2nteqdrgtbvwlydkec8dvdm0z2lcmlsv7jn9a9hjllikv61jb2b7f0ve8zev451ljvtb63zlaattn3ikt99vq7v6rqrdy6w67theogws3uas0321te1vhyxq02kgzi5jnktzo04vkphonsqj9jv8gccexs9rlwaua3sc8yos6bo6qpq2lln5b673ps307v5monosou31j35u1kg',
                parameterName: 'ga53a7y941ei9qyhs7qgf5kstjl359on6ckpi9p8fsv461senbybhqrt9tsigcpvl1bud7fk8qm3fyi0dr590pg18w37v7ldqwb84hwk569xxr1q8byor3ehyk1vadjvj48mcv7meg81nmzhm0sg4g6vecj460fbjixc2m6ngid2zsk3ju8t9ikxxiau5ezltezee49inmianu766y63bivz7xgdowa2iqom4pn2ddjxj1mg5co246ex4c09uh0w396rguh7w0hg4l2teuhwpvyti153h4kl5v7f6pe52u0jhqcx8aelm2bctay0f20e',
                parameterValue: 'd1s6bnvm2fp9hb1ybhts6caqgdoga28tl4nznwbfint3047ahujco346wvtogyo3usq7j5c0cmekoxqkklgk2ij447i0ry304h4xs8c7l48b7zuj21xzg156e88if65tvs2ejaqj7391wldjpqge7z2wkebhv8jw2aflugl0p7azwae25yd8ocgs7p7d7bs09oi33zb54f8cfyy2y7r029uqowqe7d76vj6jl9hzkwmt3veuw8luy8gr2xmsps1j4ohz5nt7drlm3bdhbkw8uzrk4dsmp5k0qfeie61ual0ry4ed36hqvyr7tlqxx5t65awlny026634vakar6gm5jz3p8r2km6sv2n6rjywxem8h2mdhse6by3lioevso5v8c5kooel4jfzg66z690df16y8q7rky6smw5ta8c9pg83ary3uq1iy5g15kwzzcg95m05jiudc7ukt2rvdkan26nq4dm6qsdvguh1ixt7sr1re7w1jmbk1m2cb05yfaf957nb6c7xmgaev1ygo7p8l4tpj1v3hrzxl7dvxmvdyjpfavo1trci916ah54anf9dix6fmf5qbck88a7310jmdv7se4i8jkbbdm4gnlj65w1rgi1rglgd5iovhylg4wfsrkk04ye4uon8djnvaxjxounfxunzsixv2w7us9tbd3oqqnif4wnmr526v15yyr8q9yecjcxh6vywjxf17gpok6yuan0wqm4ez505dyaz9xg28a7y352xt8j2ab05we8w1249tz8nxvrysau6y0jv248zc9ebcahkm5zkyk49x7nc8z5ux49wi955acq7mecuyou86d9vz2bhpfof48fzmheuyk79toxlgrntza0twqozzod3p863fl8ufwxwar3oucpd8wxhv8a8cp9v7ggyo9w3wp6r3aahaqcbrfdej6ri9ic7hoz5qzm71rl2dtqya0bldys063aswlhfgs1r4ryyglqzkyjcgddu6qzptokrzkzw85brk1hyfy8466lnlixs3wtct4d72jfgfvm6ux9bqrj9l4r3l53dw7wkidtafpzfy1acnulqmr2pbar3z4m30bd0yiwt9a97i74iimnzzqhaazql518svsz6kifhq8lt5tt6mmxk57p4kogbw24oemdeh939b4ud9be7xfhz9vhnih8g5qhadgcdb4gcuj4unq0et15yo0f2mawhicoyo8y04bp4u8g7u1sry9xqq3ihsv5u54d3a0g0b1fb98yb17mspxz1ltrcha3fxpipxtesnz3vuh0k8n2wtoq80g6lyog0f1t08pn0dxou5e1mm7mo2boey05mbtmmqamr4iejkupkwc56fh4qkv3mvduisbomoqjcu8yhgeaqe4l6i8b8fy6w79283wxkk59eg2dtvscoa6ywtbbuvfrbhcptmn553a6kqookq1nj1r8ywu1eax2i2uzo8bb1m85m24x61axw7jmgq08pfswrcbqw2newr7ytwypwa583879dtgm1boyuj1wll6a71wi96ygv2ouh88fyu2hhyb5ujz5d8ig2khm5rx9br0hit6l1gnpas90tptiux9t3k7kbrc7cjdgqqoduzw1uvf1r2ef7axokde86xoq14r1kwbmuvyvtxtn4ii9sg0n8xymnyhpvfpf4pzvfr0hs8ccoaq96no1bir78io164wo7g47hsd1cdwelecdqszige2adtsfw5skn6ykpo8hqfg4ntyukarpnu49moaktmhw3uiuwmmdg6aafuwmej5ic60zroqodnq7alyxsp3qc01ep248rj00ncqe5nmmfxh6n52ch0efok9rehwop1ux3p7nlqz5sdjjwvfsuy71oidut70c21eez7xuwnb7j6nljtxlrc494i73gmhz4od6yxrixuc463pvde7ufho9zj12lq2nsoyw1benewkzglhjnmb0pnskmn8u6fpjjnl6ss6av4iycztxczsk245ubbfjxvuss1fquwtr2736ljebpu7ismap4boykxk23ltle',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: '4u397j4v8ctl62fktpk6lfkbclenueu4pob1bmjosgv6ka2578',
                systemId: 'vbcyaf1c6u4c5ybz6ii5xpv7zb9qdb7snn6ag',
                systemName: 'i22p8f0tlqbtmxyvffs4',
                channelHash: 'y1crvkn7zt7tnfipazidhnsx734vxaz1mzmc9ism',
                channelParty: 'bkrhvr3gi5gl7uw1x8oqw6nbn5w371ga3lxpv85n75gds0r6uocs87bybvhw77xmhqzne6nadv2otbhkxx6gmh60irngyf76ojqglzogqamq5kbams8ealfxjs3usqi3nq0wb9je5v1guavd3kmgh2kc5b2busnj',
                channelComponent: 'xvkntafjwujwp4thd6am05zwd88n7s1dclf94oe6wsb1suxfldrxplnr55gw9559tobulicrx3h5ss94r4jnnlm68e51liqfgtb2cu2rhacayg50gkzvxewiwnwwva0081oircgxr7empsvk4y5vxvfma8064b99',
                channelName: '4f1xpiadhxtk38r7hm8ud6j69gcyw7046maidixdt85vuix832n4cwqjydng24zxcqxnofgwrjj3e9ydj3oxesd7q6rd9qglosfbvrjxj7xohhb6dngzzcj2e6vfjjjz9bcgc108l313i1pvh8ycy6wlhjq75nhu',
                flowHash: 'ofuz7lee2g4apvx9lo8saiinp2g3tot8f85ozhqu',
                flowParty: 'lguljm12zvhoock5nwqab01luvkp1j0sxdl0bfvw2macsf277dekfdqomskp2wf5w8kg25w86fwcsrkbwtt3qznj9ugeypdkkneaeidd9dl0t4if8o2kp84m1as49pyeo7pbt6tbvo8kjd8in20yf57y4e6b3iah',
                flowReceiverParty: 'q3fwez171yu2ce637j79t0fq1w1t7z3jzqw8lwta3p7s2br640xhrttav1a5snymn6tlie2t022nuvsxqrflldo6a0o02v3bd7mxbmos201ew89gti2j5xwo4p46mxrxp919t79sa0ajg1opt1u0z7jcnlcy7y5m',
                flowComponent: 'ds52yn0x9xf2pzmkvcazpe00o0j4cc2acb2j11l4ol4r2zugibjxisds1dzxxawxl301ha9osvmp49tyejxn6h1tn7kl3wii8j0l1f8zdrtt8aqoswn4okg1n16eksjttc8qffo3nuqrae672kil8ldeqqzqzqxk',
                flowReceiverComponent: 'o4kpw1zg0etcbukvh7lu81dftq2zlmm8m6hnd26kdk4kgse9l53sfirgg26brdjz5r4wfe5fhvs275d0wy6cl1cn6dvpgzqs9d1g8ea62wtkli75w4tdo00wtg35xubbvz3q4f2vssi6cbdlu2o63vitkf03x9sq',
                flowInterfaceName: 'irnz2xyzyfeu67d2ba2u8m4kdht9kpjn8y10upsx9podnrlhofnwmayfqixsvkcivu4syjfelllojusrlgx4ja3aw2uh5gkla1s19v5rnh5442cw1ehurwlzwoarjzuy55r832n086fr922g8w56iknslv6oap9d',
                flowInterfaceNamespace: 'emflf70e0eyytpmuyltyr6sr75c66taum2u8gzahmp25lcr3r6u8zas0hvt49ejcl3r8uv0d6w41dqdj6kpalidnskn3rtyxpn2cmivahm16zpeuhdyovk6u289pfe830tnz14b9fac63rn491ihtbtsu8klso8r',
                version: '97aac5dotaqn4kzcmdh5',
                parameterGroup: 'do1nutx66ol3cqzin0etiq05j3z9hd8ng3p6t0zbkt1lglgviip2efqn4kjpm76iwk6s9kc8ylx0jc02y0u2xrg00idc8aj3e28ux03dumbq74si7gx55c3qj14c5z39pjl3fhyvq2fcgqvbmqermowu80o7e6xqr4efxig3hstzyopu8f4zm4ar3gn7nbac1t4r68zdk4kmicq8sp5yxxuwyqxzo3xbdhpxsmigl2eufqrkju5m9gsnjckma7o',
                name: 'wyvkgskvyw3hq4c40yksy58dz34vy5sxy5dmyxycs0q76k9e5iagak3dbxk9255sz97ir9m66tkkrv78rgf9a45a07qw3gn9f3mx7m2ex06v5k3crmk2mwsd8k8kw6gu0mvymsg8srbw2gwq45mrbfzvlc7835oce97sjvrkm6jpxwd6c66b9z6vexo2igs2h35utwcjhd4ikvmhj2n9hbhpxskesbf5j9xsso2196s17jl5ez2a40dy9u6bop2w0rptue3166ahes7i40l5rnxg6queq3fh18nfanhq77yntc29slp454ryvue2sa1m',
                parameterName: 'zyfers1k2948q1swwa9eeqwmgihps4lqm40coc361l9nbalo4v82ee4a20enzgp8fjhdpwjxnb8syo7a13sd0cx0zkozyj5ceu4o0im010oh3dgwpjkkcyuyi94z1dtf3qjpjlq3tscltnyypiqmxjfk1dwmapg49ttlb90vmxhibk09dfxvuzklznf7cfthx67stupuj9fvfkrv51fs4oxpn88l5gizulmyc2xvjt4nm05q60nynkzqsy42j295ldv5q0o54j3zwoz8o5oyf77pwxhdzhceipco0x93cqj09fcona8xhq6vdh1gyf5v',
                parameterValue: '85sanaqv1tb94166cbhk2kof50jo2pialnkeztphs6hzvkrorx0rijage4lak2cdt04kh9doad203trrakinnp6dd64b2716zt5rzewz5gjehue1d0v1bx7n837ucm39krcxjom1z5iadg7fhe61dgsk8pw4h6na82j4a8tlxxao2yu1juh1egqotiyc9pvloryoz4n2vwfhwy25u79j00gn20r41qx8xjt72jpgn9e5d5l4pbjy6tnwrzihsob39q5zbsbx079apuvasrg6yrf5m01374feb454ar5mgqm5mj1sywwxlh6fdwn5q8zy3vyjb241huo97rvbfmu1oy68csicst27fz7d1pqvuzyb58xfprxq1jw8yl1344xlzzk6mme6ccoh3gzc1cxe6v8v2853zagoanff9xti0qvqmiwtbcjlxxhi8m4vphnwwlrayz9of2wagww5ajval1u5p54ayn7in9f2yt38q02uc97lewbzwzk1biarfet93ni4591djjqsx5hlu51rpsw647134ucnlswmpsby79zd83ddmt5xx7x6sh58vyp47qyknclmmz6dtt3tp06mjh34e2z2atwe0q93cztha64p0ggy40l8m7vu25io93mkvr7bcezddsorljl4jrfcilxvuq6i6ee49nlscgronj443274xwqfkmqb0okvtys42khhf327ulphjs8cymdtve4vq0dnyzvr9z5qmu75tmvuivsonhjovhcwucj0xlwjf7ifbcn706dtoiur9uouzx1culgjme1s7b1fucb6ujcenipprhozo5rmj3eaki141rxq7uw7hxmqcaflbj0b1h3x7tr9pj8b4yntdq05x5tlaj2e7ghmj138bonms1qnyibtlmm05smq4y98u331zvk1lc05rim5n6n0typ60gvzv5kjcc8s9h8pcv8sknitihyl5c167kwv2wlwt69m8qyyh774ai9x687mfsepxnzgd8p80k11386xnrl9zhxlpznzrpgsi61mdwol2j3k8khhv1w9cw6re9tx9ytk0ttwlgzo3n3gav24ekqteu6wjfd4h32q7j6ccwao9v6dsijkz9u770bxpd1yxf7jpjf9dhz1qu15589takgwm2dmg8xmp023gu4evzztbv1q0ixi5hp3ed7isaqpf4ocfbqzvwic2zw15gzyi24ryimex2dowj1tlmhu3jin7qhnkxraomqcbaqi6xrft0dnpaym2lhdpvpaujcsoo0b7i76vx9l5hsz57t2845yjp38kl2ftscmwjz5q6p3oxrwun6fhpak0nvkgmek7zfygdlezzq057jdw41euwcss1mrzv2rfeornqnkngscnzhaxvrmnienb049uwx5649qwi8d4e2i8rkg8d7mvnbddjg8e7s1ul6m7dtl9s7xyud87zfslicsbix0iar4eumtewm52rqb8r7nkqaml7ratn3l8lj4uvjvn8llb098xc4rj2diu19f5l2kncmt5g3eh1a1fj831uidhgbk2j81a0cpccv3lnxw9yv5lah5dsgzqr8gpwhjpcyfruw9a2oxxfbyj7dds2er96wiklzzbrvo1vrtcylinl4b9pzbbbmwgwi187vd3n6uxsuvmtru0ugks1hx2garkufpkqjafpuwc64fmiun689ghqmmq1wr8r0ndrpw4dulq5ghpi259u39qi45ad4dz0l34x2r3n8jphcsfg447k0vh649znp2gk92hs0bfdba0irt8w6h9yq02u43tpor66nuouv5ndw5f0yx76jwpsbfdnqvlqp75o05nh8gbkyvtvlhj0h5qmg17tnf9y44rnpf6y2aai45ui67cuu01q8jng7pkklz9467o640lt4xlk6t61yo8pg67yuxiw6ajs2br2g8oqe6550pciv4cukgsoxsbet9g4pyyk4a527ijgrvs0hdtai4lmqexegwy1cm1674hnpbxfhdhbrdga9oiukiagnzt606gd9cdbjzn4p5fa0abxb4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: 'pm32e8txg6lvgfsdhaddhe1uv1gwknnvdwq9roxlbm4z5epdca',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: 't68xr0j19w0fyrzakqgm',
                channelHash: 'paiftjjshrpsj1rzgt6r8rpe2buibgio27idsz2i3',
                channelParty: '68a2zfeug0t9prvlk2vv8w4mu8mmahpccthubvef1yyidek7irrswciaecbcifi31nyofj9xqzglb3lccbz1d8laagzau8zqntl1s8lj3v507evbeu0n49cdii6ayqacy50wx7i2pqlnma5cj4cea3x66xr7alik',
                channelComponent: 'wgcwykkr9673e3xk3r8m0jl78ydyeuehlrvzphw04hknkffe1608la20hthqg0nzp8oafd7trnyqjynk4vp4rnmg5sm6slc14k2vri3tonqk0osr8c0672c156wmv9l7lnbslv7f63l3de0b0cdebe666s98mewz',
                channelName: 'iv9clfkucg49327ox5pwi145ppavcfwnb4ypp4fg3all747nf4kpipi24jfnrlehytm6cfv29heymxggptbxsvr5mokafh6l71bl3sn147u63jal976u1l21ir5wjhl28lt3ck6zfsze8ii0imgqgpjoyoew51xs',
                flowHash: 'nt8xxcqddn7gx0t4lcdt5xwzlhdtw7bksbhb9zqo',
                flowParty: 'ww5z8b7sw2qo7c4d4duj70eq2dszbzjwplb7cn7mkkr6i5be1psuf1xr71s2bmnsdnqw24dx78bi7z0hh4bb3yx0ti8i4nk0ykmp4u06lu09d1byl3tzk44lftlf856mnratqbkj7a0pt50g7i0owa2l30hqdeaq',
                flowReceiverParty: 'j8h3jcqsrg34qn7ykfgqvt1ajir9xcazv4kg9unh02u3vicgc8n68i7v6ew5o73weujratxqxxvyiy6x3yhe3q6t65vvtoe6r4fl4s9lmaa30hifbayg11160znqtrweul8rkwb121kiqw9izvvemglqcuym4ulv',
                flowComponent: 'yter5oq3amxv0fljx8zituumvk1mz9b6p2dyrbuzym5e2xrxqgepb4rlehz7iiu8zjb7frvqeyyp3kyf4z9ahk7g9vts9rn8td9bjy3ak96v3hh8rhwj9buhwqvk9ccbulgdpi28l72hbjt2damdsyjzf3pjdudd',
                flowReceiverComponent: 'ft8rsp40l5wbf61ks4ua895kim2retyuo2grqewhrz3o7cn9iw9dzgsuvlf8obgmfw2mniut8vy9kc1r7xs9ivdt2ozxh571o4ehqu33y6pqbxyfh5zd27dosnn4s9rkoeup5lbhhkp758pwzpz4exg92xl2beny',
                flowInterfaceName: 's7fhe2kn1vdm155gc6ednmuhontaddpm520pol8z4g3er35vft5sjevaiayt4cv53hhsdi6zh5ughoshnlejnyo12252560pta62ca8q4iu9hz80tzflkfze1v3b23n6bkg1zuxhf365ux4pq5ljalnfrxmtnxpu',
                flowInterfaceNamespace: 'cvinq2pmbvegy50lwovxh0k9u50tcn97q360ltj44n2w9zr7qyq3ztidpkv45y0zf7r5hh9pioiwarprg000eatg3hp0qj20n7svm6vsjmucjkcw3a4455ihpbj2r3bgb377dogap2i7gkan0lsuaan7fxyzl51t',
                version: 'wjhjtzxg3olm3hlcro4q',
                parameterGroup: 'mvx8smat711kxsqn7npedn7v862zarwfqu7u5aibgji0zpr3duvy359tzbwn7ct4dc5nurjecylzx7gkbj9trf4k83bceei4yd451yksld8hjxc24puk0p1ms8209mdgfod0jc7awdfw3e5gmjpritn02wkii4o3ndf3m8geyt60q6k5nnbhp9vn6kulytdt35z59avhm9lcy3mkctoh2tx188nqfn5t8aa59dojuu54z2pgjihu03qhyn9c6n9',
                name: '5hh5ucz3oj8hps1ghhzp6hus36mucazecbzxll00n7ghm8mjxr9zak2oh27db2ehly1g08v3tn9qif1kwu1cowr95ai7rg9ty3arx7wggigz8r08z38rjopnwnl1o6jb5vtz81be7kv8zfymx3csj7eo3jkuxvmr1aqkwt6tqo0xjy4m52kblgpd27hrdrabevd0yfvs40xfl3bdt36qkb1iyfl9t8rn413o5rfnjk80u9a4i0uuvw5cwizfva1q60aeindtpvq7d66ihjkx9dcdkh3xktyg9kqt2fck4ctj0iaytfdakaj2uoweiqut',
                parameterName: 'ygz8ekf8tmhrwooz6k1fulwwqwlzlstup7bxv335tosz3fr4o2hz8ju3rtargax299u4dxhsmj7qp81p5n184341fsr8doraog5u173a8cmm3srp1013bzys4ey9ehvuwdmbbr66x363gfkn7vtcqsu6dt7w06lpv9303j94vcphsgtbao7ziesxyxmmyoj1aen2i9rsee57w0p6qzdwb6sto4b1usdlk6bfv87vaoyy5t7j08zt12lhjt03xrze87unm2e5ngfsuq8i25bgv8j3qilku12xd9sz73r2jekzzgeemn7ulz811dn8jstd',
                parameterValue: 'o4fbcio4b48497dzosfdx7a32xzy735ebcevs5vx9twjtttvd3rxzlynywp3d3mcgyac5w70dkn10vuhvl500ozfvj6r6w2bfohq4za8jd71l5k8d2hkoij2oi7truq38wh3vofpxlfbphchctut9cfvxn34y1vo9fc5xf305na6y1s9cwpucerh7yp2bzgnduxksl44276f7xdn2fj2cn1dp4bgjpxak2k0tryw12eyflpeo942pg6alm2xd9xf4wiv5nwh3k16ptr3ktp0bbhe595acbk07sgjp0zn9quie7sz5p7m1xj3wsylyhsm40kgux6huovwid1czptowqhewfcbfiiv1lmxutj2f0c3m5cryum7b4z10wdhdtc7sh93j9uvqurz34aa4730mkez7rd7vf7uj3197hmb7r2yrcm5c803pu8nrw2bccji5b94vxvhxtczpwftwr1ahxjoaq9my1v2hzqw2x722itvuqzx2xpuv13sir03cc3o8ivtb85oxd6e2w8wvs2rp0oc4h796ktgqzmb3h20n6g8b7yakyz8pe4bxgugnbir0yqxxv6o1i4jaesz5ewjh3sr3caxguscqxtlh3kcfcd7pwqlagmldw1bukp1yc3b13hprgoxtycboxdt7ti8hqibpwknc3dhatazfzv2v057if931v4n9yp95v4uv9p7frag4nlg2699ko4h4fmxhkcrlepcjxy1uzegnmp8cdpdzjpoflewibuli3xo4gqdpgx1r2y9bf9izgru5e2ue4nqd36xgw7ge3w7l65qoiy0b330phpcku06lx7p2jt16mclfp81qzn1ytnjx235iblz4zjadk8oa89tmijdfqmuxxvtrrhz49upai0s55ve1a7j5liirhaw0gqif7871iazsx5qd1j03wru7kxmm7u9eamojfhb5iq1sj1owoyhh1l0utduhlogabgq9yxvy3foftrt0543b6j3xq7u3q9hg90ob46fa7qtwmpmtfki09k9s7hi5abg03b61n79xbu2g199nyu6shk3bns7ysd9j5nou742ie8sozl7cyj18nkz2r4j9qxbh3e3mzfez2sajmfk1iquzu7oniz1xkjj3amhbldweyy37mxcddr810g1ju0m7wjxv5iqvkanycplnhpsxnqsoh2qkusnw7inivpyr166ia7p27ty81ba5x15f06nszq7z3v8xnktmbl75yan3js5rfiu66ah1ghzygwpkf3dsss0c8b7uaql0nic0ahzl06uzuc3u44dw7z2jjxsvuw0n34vdlqt9pcexx36oqnqu3tnz7fzyu9vd2ysgoewpd5l223qe3tof4tts2kq9t9ozzuwr3czpycixvxf72gt4bwzgb7s8g0qi7iv6vo09a36uj7ua8wop84jx59d02hu3ahqpghw61prrfpqpjvfo7jx3mssnu74xes1xkccxfyiflefv7uldvz3ssesavxionvjbysm4zktzl1nycfi0msqlq66h3s7z5zd5jktd78wvbq7887qw0rafhm4gvpus197m1f5iyysfapre8jp76s0dtkrnv2zhy763gdjf7yopjim41a3ajxgtk06udd293e1tx1hkofaivyo2706ax5u8nwwl57q41n8l1dbof64tl3oul8mq2qjxsrwq4v1skjff5vk4sp90gmjq6yff5sd4rvuqkvk6sgsiz56iddmuapliwm9ytgerq5j1na8ddejlo9tq33uefzh8lga7as7angsed0c6wruuvpw15ktdvwk26gjsa6inr6p91avl8pl7kna37iogor2awdjxo240lrqin768e7bnat84rz3h22jcucx74wxqt0kzj1ejygnf35u0ucjen74rxqtkdtv9eqz0mb6mda5snnv6rtt11ycmrvv59zfgd7sejjcugbzlznmfrfeandzo1suwktxfeqiryqebgls6y1zd2yzki4z2qne8ei9rjcqeokk3x1707qw1mth652tegofmpkq6xxuiadj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelHash is not allowed, must be a length of 40');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: '1nf1bfgan196oo6z821ju84yrf4ejir79d0c6zh825q16l569n',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: '4ggtjdaxguqnz616i5bx',
                channelHash: 'lq7ncjk4n81odg2s54fb37b1c32e2ioj3jbx7s9v',
                channelParty: 's2lxj6uj0s0e4ix2sh5j894035ukn0kdw80g54hfa4qm0h2ocqd869q29ay85dxl2rhxclwt5jdng4vbzqnpycqhk9d0n7tf5ls01yruhu2bkmyw8d39ixnm2m62m7rzlrdus1wn52p3sfo3ffmd0qkygzsw5mbx',
                channelComponent: 'f9z558rqo4u6tzauk2zqgc0p8llb6nvi3vywic072z23rgm2wkv6hsf2q8wpvyyv1ga9w0u41d2gpkf6z1yi4hh6mr5rh1yjqfdrct9knig1huxly4nz6qp791zixnseiwpik2d552oq7bbah6i6dxxzrdfmfs9y',
                channelName: 'w7fbv9ex2nl8bynt78qof0b84ybqfoepum2poa5bjccz6wff3a03eo8mgtbubqikerhclxho8z820s4k2dkqqgzypuq5tgsvrdnr4xz4ylgyizmjy2rrd8oq2syenw1rk6tiqaxlvbtx7iwuukrj3rda13ubouhg',
                flowHash: 'n4w7l5ecv0ti9rcjjq7yiqt9romv0w4c8z4lvmngn',
                flowParty: 'p8zhbzabnpxyxbr9cb4o9ejlk85q50c3eclawa55lzy01h0vcs21edjuc8s4fe37k2z2wpht3a7vq02s3nso71fytlxbd19mn75qz8ec3fqa2cmq2iwf2sqlc3k6fb1hndnyoh9f7dpy1u35imfb3k26ftjj7l6m',
                flowReceiverParty: 'ys6wzeeuyftexxpptbun814qt552x431c397je3q55nxpvyl2oavmt45f12d3hp4t8iktaz2en76tniavqalaw1gcc03k0iea3c4auzsz6qhbcmeja73dzfzn8m8ccutv8067sld22cx73z3qpz7men1tson7j8b',
                flowComponent: 'esxz8gkfbcbo36pjyh6sympwousydwo5vd18brnyb2cu9tjsnp1gnx50mjrqhtmssdjsl9pzafp0nmeex7t5al7jhgdf12fu7h4y1ngvof6ia2e30qsxnwjnuyedx3zu5fim00gwvzacl4u2lj54mi77m9mxpr6v',
                flowReceiverComponent: 'szre2chgjyo5soin366rx4obz72f8m9fgyfty5tk1nkjy6q4lx7i394z8fd913kvv2nf12yd58u0by0o8kddcxed720n762dac5qune8ifjbwv81r5riasap2zxjmwvzakgo4izsi0evkka54if2ps97gyh50rcp',
                flowInterfaceName: 'ibq81o6m5eyojakww557sffqasqypx3wkn9f7arrxlxwey7g2irjg0klj98wnx4lp2ai8c6xyil8iizjkcafgywfixoas8fbqpa0xdg1q2a4w351xpp7gon4z46ysisq9wcn4rnroubg76r3muckf2rqvye49b3e',
                flowInterfaceNamespace: 'dowf19xqboi9f0nfig5rroli0gn8smi4wbyc4pzzrg4nx5i3ky8q4vc9yh7oafukys0gdqd0d78omlv27fqle19m6qcrr76ov9uh0h6e4mjgx35fobphiomsk5iv22aceer7q5e2e5o5pqtgcqq4vj4mzylhzq5u',
                version: 'zwfqhr4jsi3il6w8jklp',
                parameterGroup: 'cc04apxq64c9i1uqxrndoat5k5s1acrsod9inete1z54z35i9lzrinn4tw8sbs4b73aw63h5spsxb70glllr3ou0p6ik9dqk3jzkmmfbmgsarue8kxgquc9m3r28ehpih3e9solcvd65ac8i8ln3ylsm2wjap68fur3npq23ro85zsfybwlncs5go4rjp2nt08qlrshyot7x1cfhcuks0x8stpd7o0h09lebrhuzysml7o7h6e6pdb4yz7ai64m',
                name: '2xpfg0pqqdtjr40f2o1eisfzk4g6r4dbgoh9j18wqg6aaek2vgvzr77ji8yv5t7k4hemudh65yqhh0z92prf498c4slwqeyjj8zgu3ztk8qj29pufown4q80yxz8cx1jak68siqzx9zlrouno9bi0kzatfnjvmkbmjkls7wwmj8l9io87i1qjazgietaxhjj2qot1g0806b2vjjkpwe8ikcxh36z1w4o61sekaaws9200kvc9u6x3upcjmx9acai3daim0podqioqovr33q4tqf5uqdxbsna2l5wof4glc2yjduw4bmltl1gat380fct',
                parameterName: 'c7lllh8itfd2chgbkjpg6nk638ij2jfy519pcjii7v79d7n2w9o4lcsdnku7l2ex6pbiue6n1eahr20fhdkxli24jhnvidbppo1asbh1p5jqzc00p6m0hrpfyklaxgaezk66f3oi5afbkle9fdi7bctgoam6qsw5c6amyudlz0pfmu1hpi9riu1fzruxe2fc7dzegpjslxcsx5d2u52c9qemu9eg55q9gy4cdogtmldrngvwmtohxrr0ml8a2gnh6a0y2sjxrk0zjciqxdpdpl3lf7ljh55hh8bwmzp4qbtmvkjtxnxm79oroad57h2n',
                parameterValue: '9wcjd6pj849eabe9ta3emitmqqm29qg6wrfo6m0out8fheehntea8zmxeqw6wat2aidweonefpl1g5i8pc72krbfqs4lr9r71l42f9baz6zdyexqesnqgk2cesrdoeh9hz84qlnds1hsncx5nldymlrvxyk84t6bo57wnmsb5hmbcrxmsbrbn7kox7gdptzb0ozc704mig25wuc09chhr6jzbnmg4yucv4w0g5ypjt20b704xoyldp1bebjurl10aeuf965vg68mntz10plrd7c0tlnc13hdmid33kw3fd3hrw76igrbz5udrule8w2shy1a0wjismsxsy86h2wh5z5w25mnb18nkujf25oj18gzd0ifttys70i51dst4hyyjutd8jocr1w22ngimcfz4sjn40mqkxpc29hhmpwnc74ulsa0kavhi7u6087ux9a4s6ybo9llnfka4cpnfn5izwnm0xooxgbc28hr8a9qcmdl1f0i1v5tx2he87q9mhlwt8rspnoqleg7hmttrjofhcfoyxwndarsjaji4ye985r9zjyen9idm86d5ji1fldqm4nebac6qc5e7zkdcqupir6vbkazgvmxsbmnhtjwcwkk84umpk2g20kg8lb48lzxy4lxbvsd2h7qq2a9n2u7yoye01u6yrmivvyn402pdtsv9kopeun59l8otfkyznvojby98k6wk8glpybfumr5f2d6o709akq7oli7ewtxdpv865z6o7bsas8dfrnhjf5wekyh070scgmtznx2azl4j8f7fbosmdxi5yryh501e9d2taa877e28j60dvji8g6ls6lkzjde37rpoi0h9h96ejn3ul067tn1wsrczw3w645s2xmsly109idjn5sf7ot6ac1odwqcm93zbl46j8j4nlt6qmg8rtcu36rnspkxq8ea46u8sr534petnhx47v759td03wij91bfif7fdyf46udvdmg4awemhsnuqkzx9xiuda2gq3clqe2u7ptqvoeciq3oi9piy98xz9c503cur6p2mqu8pc46ml7p2b5dlyq8pt4ddixnnc7rrri3t9rfkzmechwyp5jdcj9gsch72nog4645891o8cccmth6yq0donfowqwmwyt169nb6yvlrftvqei5p11ceesyccbyxzz7l5s4d2sea55niouzsuoqmwgmzfxbw2y08v73kwx9jrd9b7sloxnj7749hcnqjootrqmxb9h7q2qpknqysor2ntvegxm0ogyfsldv9c2umz1hfofxrml5fpacbotegfiqvaovog64x8n4pzw78ef4nte8t45d4tnmwthnnbmcoumfnv0eyq44pnor66v07s4npdh4whzf26nw8ypyuyose0w0q67etblr53dnoo47bn50ul5aroxx2n6od4sw7sk49x34jx2x3180j4ao5kofwy87vbzdf3ja8hzignsygay7gog14sejcuxaj18nmd7wuu9sxrvp15ubk3unijzzcscn5qkpu0285dpzlw72cmnvze0s24cjj24cpk8dignr99see9h5zmngc8nm2vgkdx7fw13702hv7kjuz8jqmfc9m2g7nr1m50y51p1qhwhccahvbo9ago0x0hpsshw7orug8lbf5vseqxw1iw7nuc2pj9u2w3s0s7d0ax1ab16xk7z3094bgpzkdaguvz8989cxxx8ghq528t459susz7fdsntzd839wonub5qwn6y083x58uhzh617xvjwulbk9o21b0nu1jzqipqqif025kcupvvbsfnkyvjrtiqgjmac0alpwl3jgf9qxfp1kjx246w0fdha8mgnjbyluwekjecmmi1jnnvqdjalxzik4nna3t1wi3yiort3qe1yah10j7k8gnbse6m8sn220t9dtlho8xyas9mpm914g4b2c7ipead13wn9w3lp5syrdg5m9sterzoi4c7wmq5jngjwoi6u5t9qvno5flwq30omg58i5rnrc6twokf8rt5ix3abw5oi95f8h0kouodomgwr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: '9z8tzpyd2jc3vq97rfj471a47j2hh8gdxkjoevymwgz454ltwc8',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: 'icimysq61eyi8z2cpknr',
                channelHash: 'ag4xc7ghqhbspg6jv9i9pj7cg4k7scz8jk21d4j0',
                channelParty: '1zwln6w8kbuf3p8s0csc1uas3n9xqco22ohz5xw89x1wap08nn0y775bf8zvnxqotv4htiqv8du64xzteo68x8vqeuf8ixut002a5thi9vg88m7avu8x8v0wzuv8o09b8bby8te2y9mxkj6xyhiuvjimfqqpfn25',
                channelComponent: 'eom5yf9ervcxw0qcl3yvmkcqmwqj8ilzvy06mh0s3n1z5xszl07ao8buldsear92qovm3fv00abc2vvhjn72srouyu4d9qsaqf1nxh5u2wwqzeei8nm5tazk2oddckorghfy3lru3oq7l0t4k2i47rh9xr9wf1z6',
                channelName: 'kyeqr7k9595sdf0j1b8n3mk9j0k79dop4ng61attx9jdxobvaedpps9lb3hmv35637iez7zmn4d9iqbdy5s11suwv2g5dz1siwjqal22a917yruibgkll8kjydb7zmmp275xpke4ys7m519zjrf55lnxp7mbqpcq',
                flowHash: '7x9b2cd28bl3mddh82ukb2vgbm1u9e6m30s0glxn',
                flowParty: 'f3uhwab80s4oh2nv7k9beqdxmxu1v2soubjugcp04h75bu4tt8p4laaqytqbvovo74kfp891fc73xag2dfwurpzqijovw06p7m4l009cityrv02xl242c9osde4kp5yj65sjr0jlqhni9zd85e1i4re5fs9lmsgs',
                flowReceiverParty: '51ondi1q7kj0v14ttq4guyn7m89kuojk4j246fmbndgsclnwsxtziqvdvrb5v4otv6ecih5tsi9xy1w1wfkroe491gfumofn3i8uf5birl3aakkcijgba8oebmf0838ppgtg9zq7nq7m3xuki084m520gdyza61l',
                flowComponent: '1gv2ull9ndve7l5b15mo4h5o9ibeh9akrtfz4i2kcrns34rqqbu7kma1icjw0txdw0hgv7b5vtwqba2kk8yezzkvjvoxev97z7djwtk12rg6r3wl0cqsni8rsbqmzh4mbzni1vdq086bmnudl9xrbev5tgwom4sv',
                flowReceiverComponent: 'wjmfoh7kg0bdi5iilzz4w2sxizw7aiboyu4nqug9semsvja30ji1p85ff6alhxcwgqqqf69m6mu42c6jhffq6kwe4cuwkz3rbctxgpvitwj89kwxu1yth5ex8hvnsb8m0meporp18eqf7oojjw3hi63dqyun12wn',
                flowInterfaceName: 'i0cccgn3z659zohqrldoyy02ex9pskp6q2l7lpan7w9yyxymq8lrzzvidwme7efr2w2aixiqz3xlx5rla8ucmitwrasaas10s5i28ewcvakbv8ielwsfscyxndvfef55a2ehizokju9yqzdez9q83qr2dr1gf44a',
                flowInterfaceNamespace: 'lsgw8d6awbq23xsiyzit34xc9772oxdqr5w5xjh9ml0v6if58yg81708dw3dqvjloqaxy9o1asvmfo3rbj1vm1nhgo0wiei7ydnsb6ebhv0u36j6wkyeal86vizjrcbc4dwtmm6wtio2uwjcpj5hphqd11d10onv',
                version: 'iupdci3qd78uydn9z2tt',
                parameterGroup: 'y8aj93r2q7xl6h3rhc3jevcb8p9tg444pe0hw5l4si017ofxvkdc53cuulwf0k0d5emt8q878b4nybesvzydi7tpnxj0s4u2ofulfmuo6ei8cechqba3l4ztb3neusuoxs4szn1t0dgj8mhrp02udgbif5axq8t4coedd9fto7sv6vy8rn1k5tx0km4ns41bkkwxh39iku4ahyhu48k8397u8lpvthtd1tqj8ivfvesof5qevu2khhb3m817fnc',
                name: '1855rqk0jnzu6iy4pjkuv9s3ume0hqyuxnhjxaw3mwgekw23uqq57sm54d3uh7ipko922b62ztdxxae6doz1im7misihiawykugcvdcagx0wwsg3gpbj87gs9a4iuur90t7ouolgcvext75z57gwzwblzhioscrow7garexwz68pzfudktoa7pmwcg1kgbtiklulyk7iwp5qkgxqxf9m74apq284d1kziqj9vouowvyr93r7dfdah0ratg8ugl24kl8ynlrhv4p637b2j944814orsewe4v85j6jdcouap5ze3t0mk7bl0k6h6nwmxdz',
                parameterName: 'z4nzgoqsgp9tv1of3n6u0hw9im8imu9tpzpnirl4xixcd8jeegfgipa8of53addylnm6avu81q46nr8r7l2t0pvf2gcpzij7rqkuys15spr9xv6i9dxz260i1ijlas5kf92i1qx2cy34sre4p4k44ebdawawg4ubgp4j2bhh0ur7fvyzxyugjdhg0tb0bo34ny758izfdhwquz6d2r6mxq0bk6nrmoplf4tu24ytlbwvu2t3dpv6diljbmm92lr9lnlng96n8agx950zikq90ai63vluehounqgpa65jkovk30903ubhwsipt2t5xx0s',
                parameterValue: 'alb9uer1kfxwk3vvhgq7blabue9k2rv8fb7yh9fij0ud8ym8edes3t1yibwatzirc080nvzajypu84qn61jo4pewnuov3im76s8puesgqo3scx3qig6qchhdhtde0d2rvkssvkz1elbg8ybs7vuuw4mqwg2l5a6lpluhu60gu5ipk15ef0jj9ynrpq6hsvausi1hmgtobu8tgvcqx2dd0tbl3aq5drdmartnr64xemm7joe1m2ubiw3zlukjcixi5wpjozezm3vcfoq1x9geej8muzmbbbp14m7bqc8ckxjy0p2knwh9uvsfy79n5paxsrxcuugeb0p26uoddru5ii2i2kg0idfxxmxv1m9cwj9561aw6okzr1vz2sbgei359gvdfwi6sbl1714w1yhxqr9urqerlrrymj7rnxfzy233pehxhfgxqgi0i21j9vq7u4x8v71m2epmr2pi1ir925znlg0z28lu0nenkzxxd2t54mzz29ocsymytf0r4lu5kzqc09qfp8u10r91o705f42xrgvsjrz3ojxqa0xgzcwh3sxlapidd228bqnmvxk885q587pw20uhb01tfl6130go5gsxgn3x5030sfbekf11cijm54nsow4d8jsj7bcje8d3ta8ff2524ikcrwz4lm6y8ckfwkam0cpzq9cfd0cogfr7aprb1olkjnj38hijkgv4957qyugzun4spr6m744wiahcnpjxz6o9yg4x7rq05im50v534hcn6rtaoa9i53x28o79jei4n2nda2x8axw0o1xkp1t6nf0cwx4iv47vhw453ezcuztzibubll83qx4x3asp224pfnultv44rm3kehvzm7o915blug2nx6fbdmfgt72qdx10ib9dsyc9zu0m9n5w7xjao9fp2w9bigakva8j68wtf0haycep3o8h1sa3w5r8gv87d7gbdy1y59kxub3k95w2no6o42tmdon8z7rmqvplvw2bj2qcztln1uncdxpa300uvjerof6uy70hv9yytylujkrxoa9w8zrs0pfqagkh2w5w9bsty6owsq8vup3hm66wpvtl8r2jv4133uls6fajwgp16313yf41v3xtnrygivcb2pvok5wtunlphuskyqhshrfcl4hzgfn77jfl202zf4dpqy0r0hxi5tt3xscw0eopabdz3guqeo78faw491znih0ruf45x0ktek0t1in4gfkrx554qqwiz9n2v1m88eb8s37omeeq5decp6gcs5ozkwdoyv9dbwiaej0yem4rsizw04gfvkkyvrlir9z2h01b7ba6jqz8vwzk66rcn8v1b7wmg87dzdrmin22243xh5tkoh9hvlkd376w38zybd7r1fe0ux1m6zose9qumml9gt83ym81yeib23m692ol5la2osfqip412p9xt5vypf8kowu0svlw9uv569cxsoxuuzxy5ls0wcknrxg2tjigct61kh4iip96ilcuzizxaca33y0ksb3diab12k7s8g0em30ypegx571qayvi7qrq1frfr5n37ssxgceico7db7bhgdjo8y1wp8zcpsuc36nle09pdtzutrtj2t69maehh61ili6nxz9ys7dpex7d381box8g4sllbummv7e4j6e5uuvz88a2t3s83oeqrqo09t2bocu1mm5uinxl3g21wjw9udy3a6eqv5t7jjx6yva89azmnr4ktxka9s5u3b8vjdu60wfpmor3hukcb8tb3k2pu87ay7m4dd0y4jla9gt62a3ya7yaiwqbg55slpwdfjaseqtkv05bw38xfrczqdtbw7salt19rpjfrfbg4zxfom590o3a7n7nkuww8q3otww775uk6ke1zdv9c4kxi6nyr6idldklbi2yppxj2nrzc20ota453uulpwhlobzubwdwqqpbmwvzz0pvkvihvt46plmpt2tiwd587kuj31c2s8mkywzf6kh634mnc0w74eaovwcseh7o2uia986j2fv3vnc1o8cb8kvluwg5xbsr0s5qscxq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: 'yfwknesu1sskfzca294fib45hbgsh3u4pp10ssyg6yvwaor75v',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: 'xgk6s32gsatyqykt4nrnc',
                channelHash: '0mubgtqrdt9169m8qipsrgdg32s79iovmzxc4hym',
                channelParty: 'ogcjnpzgi05k4kx3ahh7e8t74qdt0aehqmagdftkpvegnsxgiset28i8is108h53h8t5dhvh8ef7yqlam8vp4jj0532mhm2u20ug15zrwm6grfw8ilc2jks9iqhgxv2djhytnf8nre69xo5amdq3spaar1ssfj10',
                channelComponent: 'x6x0jr85o7riochxjkpoofqceejnumimx4wvuntfvbupfvfk71nm4psp6kyb0gltlv344m8pjq5rr2ply30md3113j8jspx6wyqcj1wgwqduwn3jsijf1z5zyqsjidomxsecm3yr58ysr02z1s4ogh9818calvow',
                channelName: '89kz6hs04et9r4dz29s8upqiob42qdsoucjkdqthwz66uulhiny29wg3jxe8o6eiymfi30hv1hvbm0fd31t4a6p1isw08mwwf3nnq8ndfozgt6sr9kaum119ydwk7l1l9q88u2i4a1asyn3uf4b7rs3duordtjjn',
                flowHash: 'dnlkmomletk6tmru0dpkd8jlbvojhbp5bm7wyu9p',
                flowParty: '7pqp1i0xea5sec9a1fggv9xqlz9g4tq9ruydsqdvr3g6ep9wxh2b4any9zlswhcb8fvbbwaapxioverd0uubp990l8gx29cia7wtmwsx2j0ueno1uke5v0kgwmkcngbnn9h0og9rfu29wfw3lae8atxywqcz9axn',
                flowReceiverParty: 'mozjqkjov8nh4dgdgf0ph3cksgose6mu130obauhl3lsbbxk37v6qekfpnfoq1gee55yq2wwwawpyr1qvqsitalwwopulejtvxrc8ub0aodjnrn9xzbir19pm4enud42wchxlyoxzuf9zj6y4hxf97npghu6elzc',
                flowComponent: '603oazbj656qoqu1g8tx4yk12tgas2cp82fbn4ioz87blf4sczs1cy1sc0ngkiawagvppjy7u2wn10sm0ssfu9gshwmgk85imkgrt2jw89wii08vp3ggsar3buuzwf9ozi1pdw167licwu7163dpt3k8pjx4rw15',
                flowReceiverComponent: 'u8ba90mie7mwuxcebts0gko630h4ojarlhn3im753vl4ckczggaufopjjubz0lhcrjmzskrk9yip30qigrqctt6fq768w4vvrim97z1cw2fq0ha67lhwiiqttc556gyb6m37lbd8v7500vplxlvmk46gek9qjp0a',
                flowInterfaceName: '1lcczthwg978lvqxz1xc8y0dy31v0uuksj5nzap2647x8nfc1ybhu4qfnkx2o2iiuh9o2rebsi0m0y7jmmq8fxyzgdgmn34gajg4mcz0vmrc8wnm6atd39iwcxjfut9ud9wuhgzklr99tuqdm9r21p6bmr9xew4n',
                flowInterfaceNamespace: 'nr93nxmg9e8pphnj3llo9i068ufe7qqkq33sxmr1fc9gjpaopf3soaav8d4b5a4ewyouh8hv8rdi7976r8auf4rx91l9s4ukc07its94cnjin5ikf2e8k3p1b85sorxf0rj5nf26a6rk4mfw2ngsv0od3k0tp3js',
                version: 'qqsejsw9nzga1d8wnzsa',
                parameterGroup: 'j6m1jass5bchu5mnfkh0zuxw5ecpny3hqoeioqk9j2fkas7szwxguj6j0ok7k2ofgog271f3jcj049hizv0abamwihi9j73p1w3jskywhdh7s14dlbiaj8l72g0a6h2c7mlpl27mraabcp52sslrdvrjflqyexf7yk5s6i4d8fi18g6bvw8l217yh0wwcoznngv9vtwzj8c6yezrx07yrcmm2myd6hvu05fyrnadxkccgus8viogdjch19yoq7s',
                name: 't4hu4f1bnrvyab7a8wr5imvpfyhdok7j2nqkadk501xusv6he9d6vt48k82wkwiuy227bap0gqzls957u307i94w30sy317mz4n9citii8imeyoymzid161hhq56p6njoh6b9eozzk9u06slowmbxz5asx8m6d4hbfymbv18k2fblg2eu7ov5jybkshsn4mq62kngdcqvix0ttrp3b3q1snru5jkpc22uuoi6pjatzoavhmn3avww4sbjwz8upga8aimvehfzliio22gywwwal49zner5hybmi4dbv1a2vvjani08vpv9hlbnlujub1i',
                parameterName: 'e43ysbu2z8uenfoi5v3ne8vvn2ij0nvydu9uhcd8fkknm3ojsp33du5uktkcowxfujknb6dukwdootyy15w67j3qzskob6py93tqb0m4iz1brpa06xvuho2ojqgggutef9dv31hyn4yeyrg0mxell6zdczsi5nsnw8qfqxukah708pu22f3ebdky4wfj8qnxzosex6dil6y6qhcj80uv4cmutlwxuz1jamefuk4s7dziz1ypksnt3urjlobfeqxtol8d0wsg3ncyscau3j1lu34x11xygpg695nh9i1vi9ehqhqmdqx2t4uqvr8vobv9',
                parameterValue: 'bwszlvxjcokdt138kygdvz9m0g48cnwm1tu5klda40hi9hxbnoslihn9ya3i6f0bn5h9kvcfs2xoyau9b0bksd44cto819pa1dgcmvz9id11xorumcawafh2qg0wzezb805lhw9jrpijcfwdwzb13i9vuva0xj8j39vcgsku5ud0sxobga7awfaillwnl2g97fwkme5pwofwdpcx97i2eu6lucq8kb04qdgda6pjofevpslx470pmxw17p8323a7i3sue357we6wtzgph31v6duo97hhfkeqcuhp5jhxbvykk6ewhkgwojy7g15lady100uqrlw2g1a4x9jcrn1bbii8tlvcmvee96l35mlefiv0jlnllou6shtl0r85853r4eaurfrejegij90hyz33l6r9otgb1ueuhmdl5aw835ytb02lxedkpo0ff7crgb6vp3smuzr64tm05oligtlzzh0djfhtnauxc1873qelplwk6l8dm6248cm1hb3l7iyqwslhfyd88skoh23q4w5sbxm9f6knl51c5b3lm4jbf0paqeb8nmoibo41ta51f26dgbwp1ugu0ezoid3muupt1dov9d8y2e3qdp1v4c88y2e090o2sp4mgo2y5c7xv58xf9qskr8uk47vzhm08y0fam05sqeteyt9od59d1g949uvdl4muapai6ae1pbflccxhayvx2j06lg99k2dihivbupuqcunzwj9a948htyghq69xcfmrr2fyzlz0jv7lc3tzhz03528zrypl24mr8grq33nc8t0vm3v53h3yuxjiiaubunonxo3kiawyql75bnw53c04iyzdfq1c44c07ssb1hznlyuxh5wzb7u642g469g7uuwvilke239fjzg8dvh08vzvag2hyo6jgte4c38ofy4tzjq8753028wmljqkn5xxtmca99fnim9tf8ia0pgf206nqdoj60r4xwk2dtinfig4a36yn2f3k5ddartm7w7q2tipyz2ecvjzp82gxyizox0i5v8kekfmx6v6418ztasdagw9r7ofb20oqze7oi50kg5vsrv731z3iee7lqt3xpcdoz9r7ghxpkyl8x4w46xhuhuivas12vsgpk3pyrkhhlscjd8jdb1sg73uynzzsw8l4erqj28jaug9vdrs8qpsiza3e2vjn91xbe87qt6j929ds79gaimpb9py83q96q3a2e4rbnrnref336xn4qm924ex744nzg361zrl9unrfdcxg9v6djlybxp8xerc2q8gm44s1ail0x99ihji2u8yt009htp7057jn6557t70xy68ubl9m7cj54hesxxgggzfqsigkjhj35sko9c1zu21vdn0xbsv1a9id180ki16m0i0vfox6q9dyu978ws4hrd5x4yit2ev42l49j1kxvtqjpifhkmqd628f5i4ny4ofctpf7477li295mqllxbbkw261ba8vzirffchucqo7zobidrymtms389zdej1h26njlqpwo7npp3ccalov1yuwesgfnfa4qyu9p4iv34zzko09na1uxrxxt29262e04wuvoe9jf97ews5k4gxiucrkp78mqixbfxjk8ryzax06jcwogixmly1ea1u8bq66xkl7dur4yckv5rmnohcbru6v4ghqko3olo0hktjm3onoy1tzjbt8k0mpw9vxr06xnzxfske97fj9r0o514lcrqy6x8ncq0yhgw3ogwgqvq7q8gc600gcivmoh1qlpikndyrsts7ip1e095r7e2zzishpj32ap3d1x6p2xa5pz5lmkio5fyn0d9xae3xnkygfrx1orl9tqhoslj1bxe632gh6f1m0vc1o2gh1cf512k3tzdpb634j807l9f2zks6t7lii1zaachgxrrswd04lagohxfh5zdqiq59eq4h5sttqvhyukx835ctmd6g44htbkapktr4da55drb4p5lrq0j6gcbkuoe3izyuj2817sovhd066gqn0n24vqt15wqb8l5ehgaw905ayaqp7dvnv7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: 'pjoq7l97bn4pqfhiu9x96k18h0c1lufg6kawouv2b8gsxtaysl',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: '5m1xojc7kxmjx1wovr53',
                channelHash: '3jcf6d0o46u3g4rav1gc1polc1feuzyl4s1ybfpl',
                channelParty: '6r0y1mxhv44t6ypimvkglvrmdux639ehv5rggifz97pjonv7cuzs5y6mtussgbot3d0s0l4pg24t4qtc2sd997vvngzd3e02q8ahh5unrkye0e5ccbf2d76wkeoxp77lccgixufhp3xke41s6ouz6m2wdvh90xlge',
                channelComponent: 'dd4qbdfpycqeu6b8nsw38gxd1wl76k8sxkwnk651lrn1pbxxekw5kokwtv0djzdfbg080p6zhrydsuztw1ej3gu38ghgb3xeuj4u1ut1oqhhws522ogpnekabw7ehn9suwp2ze513rk9pegf3rv5dkjyoavtgam2',
                channelName: 'fdrwogv7612vxyzftz0yidtbua30kl8a0724zrw4b82juovee7qi4swju87o57uzvdkv2wiz5tpcxop8i2uogp8rif0c4ygh23uh058lef6klw2s42w1pyzlkyhogqfnyi5fyezobe84libham0x2skc041a2iw3',
                flowHash: '0xfc6olz70fugqfi4eurgubs2vdkomogu7amd6kw',
                flowParty: 'osx26kv1lm23tp0ya02ibbvz8aqzhwmjz2hysjticpek9i89ysrlgmk8d4xxcbh5o8a84tp2v1bnffmlenrche0gfaonoqsf4kyd9hxua98xfa58bkx6gci6fyjsywbejoekcjzegp001a8yp397gwdizwbt6xdp',
                flowReceiverParty: 'u58hpnhoi8fvcgag8uzx3pr3yb3x04zmfj5bulqlatrj8eerjiuqeg8rsvz1ao95e9vo62i66l79a8hxllb2y06au5p00313r0d17pj00ukma9nr4tlqeoqjrgr2s25mcjo5vop1to7xkc80sahgh1zyrz5ii5rf',
                flowComponent: 'ofzhwptzakugs0x68vzkssmzjaopsa1jajl4uu73ucyz7ouphtd1ksaagtck9ln0xzj4d9yx37m7i0b3mhweef7kjma8w87i2z8cpk10cvqkhiugp1bdvaj0ti4jvi5vw1me8ch8g6brzg9afb04m1uz29sk8r2l',
                flowReceiverComponent: 'zctelxip0vf6dl4609s0vcj74znwlx22k2wi6c9hbmkgioqa07t2hb9td48mfff1ytghqd4apq5v7y0veiw4oparpb00w2h0knpvmpvlof80relexcdur5p6fb7ln3azs0k4gtzritqsp4iv1txqnqn8v1neh9zo',
                flowInterfaceName: 'a4ty23jslmd8j0b5ys153rklabwuxycshh6v1pdahu062smyyqpbe1p17nmquslrxhcbnvbjspgweeod4g5w8snqhe3kwk5ofvcm5a94zubkb39uwpinz4hyfhympam0ycuxgnqpzk0evro6y3fn2y3pdpkzi4el',
                flowInterfaceNamespace: 'j2978aafiyw368qwmjtgn6lvr8dv6fzef7kq4gdu3kusorp2x7xwu1fuwfunxuruxo29agvabysnmi2jyo891ls4mgg2xu54j934h4w8c79w6cpqj3x79o1vbxput26a3np0bwke1h52bsm3oxpcu8zw6i4jg20e',
                version: 'lf6lrv2y3m5vmrmzw3al',
                parameterGroup: 'dj93wfqyu2zb5cwqova5006b2pn16ki5uwrmeytm3nx9avmwx5mrujxu3q9s53ajdkpd90ww80cg51okg72t6wsyisqzsb2hrhd65xxzjwlmjwgcbmds6hahl3bx93limo4w90mdpll27dz5emx1mcftb9vm9dvn6glax4963e9e6o367k33hnckocbxcxhrej1gkuwnqdet10d90gvk97q5hj9o6i7ayl3ene0xoob9qb37rkdg8gjt19cc7dx',
                name: 'j3frpo8ufntzucdejvre82do7haq6igavqhzwrvjye12io23suhjd6nnaxkfgysseoplsfypmxmf8dawc42d6l5pdun9st7hmof5wuusfkc02je2wykinhnx6wbw4j18bbadcvz0rigjnvr3qmdibpis29r0wkaoresz0ck294huare2oulb4bja127sro5oa1uhgx3pk4y8r9lndrohxtlm0vdpik2v0mlem7bter4ane4gvk9f5n8p8xztobeon2gx8ccc5n1fdm7temcq6o9r3bakwbwf7phuhivzbqtjb84oawcqrq3gn2h8ldpd',
                parameterName: '6cpbstautce22viczrmumwboi0wtcnegg939xh41jecgl466rgigzg1in21jyr2c7htnft41et0t1ovkdvhu4n7rakngqi3e11ipai6yxhuwoqtkbhkwbdrxztusixsgqig2kmntqpqngmy1bgzrz5s8zmqkzco05htyjauywj50v0ilnb6hxir7ykvieuqwrv92u00fsl33ox9jh3tl09tcuk5skffvhxopj4o0m32obif8xq1wmwdukmz77xb7r45s0ynrkt5mbnxwjfi5bzbmlgio2nfyev7igukvzyc1dxwflx45jpxjrpdvp35m',
                parameterValue: 'q3tcat7p6uv1fko5zn5b32skawwp5f7ubokqgwuy35pd5hxzcx4uv2s8hgd6fygklcr0lhp3z4fzgu83498i4veoeay4yo1p27msq7ya1hkradruocjaa8pttg6a2q8lv67phl75bpw8kq23glqkebmili49v33hh3irxxk5oujs0yynw7b5p56hd87riarz0jylnn218wmcr122ek2e5ybgeaenc64usn8cx5pkkwizrtjzpfsoqdwlaoxaa8osi8nfmmsb8vsk4qtmj4jk9nbnpvzup9pyc6dq3xtegf4gq548xvm9p1m0s1g7qtqt03tm0ksmkjs5h9sczvqfooo9guayn0pg31b54h0j8zlwacwl9kupybqbfvzivf5qgp4p6vw7farf6yn1i6nrjg3rzt3mgvt8ozldr8cjb9l469p87cvvad4870sp4gs5ui43t7jk3qnw868ufpi7yiuew9tdhy3s8xazt5ef33x7qz69nmrazumuqrli6jiesoynowo0bhhsbjfnl7q3caluquip3zut24ngg644tbyh0slw4ekf9gr96a5f7nvwsx86vy6jiix59wsuf5c7dq7o9yr5mjw1qhtpyu9fu0146j3kuhrvorxkmu9i0u61et6om7qny6yxl00gg9bmpzckdvio3963clokpu1gdhxm3ppn4eaox3ll6ks6h558vwbmxbopfq3xz09o8okl7j8vy9pj0t0kzojco96yy6xjnhdscmucliklgdg4l6wodxsqt2ukxwjm37wwp2im76wtrf64wskdtyozx96y7x33mks709kpckeh7cvdxo9epcnyk9zx13sxfa1qdfr1v3pcddgl522ywzxgwtarqva4lmpeowxl1mhn4pmehgik6d7r76ennz20yk6ugm6s3fvybl8pml0cubkcl3vjbbuj7mxf864094dpfij07wucn6vn5dl8x00gwiu5g5slziqgxblawteig6rfqohlw15hq51o7d8032ur9xt8mal87s0ro03x4rqa9gjceftng0ynbewk97v0vx4ksf2gyg6vniove0v65724qeqejgiwa0i3gfzvlmxln57422tgf75xkuhuoichuh6rahf7ph519h1n2cag563z5o1rlxd4lbjp1swo1an4klgzmhsw19ry4mrtu5b0ff8s28m460rzd2utio9ddpwq7pvnhiif23br66egk8xtzlkdvq8ehmcbozmflpxdjippullclevftk32k0e2o8a964oloptjh0kolt604z0b3myinomwp5chd4uhgigf26owx4mts9adqswygu3w430ohzwaf6d0shn3rr5xwlwqdmih40nuan0t2h51l7y8fmsakeormr4g6n24o9ponh5yn6uj378mp4km66fmpb9kwcsl29uztvhuxm6xd8todq8haco5jy9r174jvjb2y9y4r48wiajl8amvwih8rs8euz8xdladu9933ritangbctm5hyy8huhnzoecj27n0okn5srze36fv8qymyfqfn9u1zt225nw8lyo66rgn14krqgxe4ya0wthkwrvh8eu9jqs7xpi62xatmsiy0o0cexlskk7b1vfpgxprmqj6i9ba57u0crp2xmdcwl3rksf45i33v1egozrdd8xko7rc9rq83sdvrcne2wz6djss9tj8seq2dllx17ul5sq1p6hr0ra3mstyv312l4ovfivmoicylqk9hfim2d4oy6e145zsh6iyxq85r852cp6kp9w2pu7aalguzchqoy9tafc2k1oas6nzwweajk216tj614z2p0ydx5y362ggoktbj03vxge8p9k1ghnqm74nzv66wdkkkmh4acp3pmefuc0e6ct7i9q3brugw7j1mbqg53uic9s4p3xeogi1wduc6ntt8uapgvgtplpzs10l6a0jvoibgim45nijuuvav2szhb9x8opp4w8p03old68dc5zrsfqscql8e1lk3fnka6h3n3f7v7m3113bjniblm5cz1sr6a6sp20h1ug',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: '9g0plzw47hqkhkr2z3jqmnvyg63yixek8jmmqquh5m0wtwu5nm',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: 'ony9sl7ixl4rg6m6w1qy',
                channelHash: '0nu7za30xaskwg94v2ii8m400qfstrhhb1mskvx2',
                channelParty: 'd67a3f2xj17gzjen2haf1vjtjn7enl49tortae984ejxgj6z5mvxak2qy43nyxbft6uj8n0f73cupd08iercjx1iqfbjtwz2ljz4ppyidhowac53xvc7yx1qbal014cbjqjyomwh4z2kwi3mdpcm22tjrypan1m1',
                channelComponent: 'jgfx685mqxyvhc1can7pwjb085hvoafp3kph92x4j0tno62s59w1wzov8m9purnjmlp1aap8ly9ldl5vpooy7ui4kmcvnryn6cubw0cms1ogas5nf7g6la0k7aic0xhsv3j8233m7sbz1ml0wxvw6e0xxkp4h9zqa',
                channelName: '8bj9llsndkp9h07jbvg986cnfq2xlfhvfqx7pvulayiolq8tgfa493y9oax276p540530anyyoakcgvh9u5jtvjzo33udb8mtkt7jw2pl2lng0jhslimpvkazpnnvu9c7xoeoql1xua9eulsl0dormp9j1ei06o2',
                flowHash: 'v5n34yg71h51txqab4n47mcn665h0iwps7b0y922',
                flowParty: 'q672vnpjoeizpkuu85ohviw012pa2syf45duy22mfe6v8fdrye7ottp9kkbyx0aq7vyhqvup9i2k86lsdvms962whqrlf5ud2j32ioq4asi1suha2z7wk0s0qwr4xmuahyki3jh6libg2ojayhxtlbtzmozmwwzg',
                flowReceiverParty: 'jylyx6xuxlzb8endvcusw2b2wab5q7jss5za7pcye16czs5qejrie3f40oxeedc0vgiikri2odvdz3f24r5n418wbyx111k1ln2vts2u3le43pnd6zqzlvbnvrwricwkhtutbreadk66wvcbv1xver9ah7425xpx',
                flowComponent: 'ksyw3bz7vq3j3uv4ei9lk4s5ek9x4fgmp2yu0ww67h4162i8wbcbofobb28g4f33jl2s03h21d4su8hu5aku2gboobysl7n9hpba4uorw03nk94xeatcl0ddgaiuqc7w76u840sc73mgpv0lg4z8vm5jimsuxnax',
                flowReceiverComponent: 'mvi8jsrqvl0b9q9u5qkgiyn15xey3hrfaam9hm8roi69xtkbw9kdgnehdgwpfgnemvzt7byh93778b8cl0bk7c1kynxuhl3nnne3cws8k3idtcrsyjyyhdgsr22m3cww4eonaupmv321bdog1epizn7xaji7d437',
                flowInterfaceName: 'wvkxwbany7eoojxirbugsyneymltm8maabai51oqwnzeypbz603nfs4o5rjftvypdjojdtlbqulgkh9iswtuztfjey6f58wwe0d8166dfmo1jcgk382dlpj7m1i6gt3ezyjl0ihww88ft929vdfl6c48zgcrz2zp',
                flowInterfaceNamespace: 'q90ba00a4pevtcjlynsv4jtk9gka6x8aog3gktepr2y5ne9s4jjngtjdjn5mt1yjk849ok6arw8fwjmoo1ejr8axnugwn4vntd81tw9fm3qaoun9vwwyn0kvbv9wpfvehtazk1bkl03yrsq5avx0nk7gzo9ab5m5',
                version: '50cr0d8cziarozmdg2c8',
                parameterGroup: 'fkrrcy2nmqdthmt4n97lo233gj9bkqe1xs4wtf9uud8ei3vg3s1ne39azjfbuox2k479lvw380gs4b7e4yaha3z4t4lzl60ue0yuq2hfndczkl06hjyyn8qoxc2asfy3pzw6l1i3szl8757pm35czthg6i8fc1tjsppzd9a3i7iqfo6iwow78ye2q3a2fit2aqd88pb4924p7pozpmfr7v3i218gr2c3lrqch4j4yqiixyd1o4mib8h538p3qe7',
                name: 'fsp8ymyn86uikl4eb0gnyaay616xa5vp4qu2hz55wi721pyxeolfkf85ufskx0xafaotpf6tcg9uz0a6i2kg85hat6ftxdpwbqmo2h63n794unlyyc8di9icuqxjoqh63due2djc2px16nuvuwpzddr0hu47ydotf924ylt5h01olcmaqy9kv6exhosyc1ywdifzj98kgovipsm66afx0xkjnx5wdscvwem63o4oro3jxu3oogu77qacjoft5mn1uwuj1qyrmym7orqjmbrsx5jhqx77kdixowkd9f5zj3mix9gbg6rcfb46h9zhk8vr',
                parameterName: 'yzcac8hf97is3m11j3gw7ns71a828u7rc02k4ey8neyfub5sws538w53oim6mmfclqmrs8onbcstruwb3e4eohzwv4r8cl0aydn9z8po0hrkq9jvlbdenzg6lvj235owzo24u0u7n8yuxxc3cy0ufpbo8gdntrq2xz406dpo63oawmgjglw9fquox3vkfdgcoqutbkp9cgftka7r5qe16l3q7is7acnyd2lqov6hgp40049v3iltbfxcgl34vslp4lz2z1j9jfmitspvm20jyebnm8i77snnqwurgepf6bipbeuazohvpj5pu89mf7og',
                parameterValue: 'qcc6f8oewdnrh45r1grhuafrztfsccm6sq685qvqi2gjsphotwalsyj1voihgpculs3un221unulcqvc7gb9rwhwkowfokpsz7tk5i54zlh4rdjzgm05exhknyz5vv1r57cxi2vd5tqml118px082bdkzy9pbdo7w69swpsn3afbkulba153eimgj55541xfmg33a26tynlzctdrccnri123rvc9e4i6h2vxj310ts852hhha4tn7e60zabcj1hkam3m3z69ztt7k2kt8l01xdnaxuvqosnn9hgtcepqr73ozhc3kizot8r4ywtya1zgykzmfod90bwkyx6lpvjdplt6nelo3qwk5rrlllpa2cteuhm7iderz6q7dbbqfydws58vzkaxo1mz4kbhlz6yu5qla5jya1bj61tospcb4e8k285zi1z8bpthfuzy9mv02nnmg8752vnaj9vkgbb4la1o5ryblgn4wlaf4zeq5fh10hjw1zqgz4004qyc9ljlalkl4eucymhhxcf8oqccsrdfiioh6jxlyecrd8gi71w1ay97nfyej3wmtg47pqh3x5dyd769oz5djh2bmkn2gehpayhkcm0ayrkir8vw7tcetjr53qvci8zx39b3iygs8mkjiincvgys0cvm3pf174afo7iy0piyou4wje65b2wvr1xgd4dpyshgnvav9rkr2ha1lbt9hb0clj26hnemr9uws1dgkxz6horwa8dr2jdsrde8ldqs8xfvxxq81ykwqs3e3kehu3nmzefhcntzizz10ofdec6ft0iij8s9u1fbziskaqcrypiw8paof0yit8qjatndhgdguitoi63c481yz8q8wyvlxelrklcnukztj0m24hvel8vo2y75qiiatd19six9410y0w71t4pze1m4ky1llk1wg5oseukcn56tqr195izyosaitdn6l6no878u06iwvtejgcydt604yb0fphnjo4gfve2iouzfs44jxxie28q9t4u23tbagpj83t7u983c64zz7xtx3cx7br4gniaiz7hrn5xl6x7q8bnzrxvk84chwl35mat3a9ffcx9xqc9hlwzoygyc9vmsvbpi5mg9wne4xg43jtufrvmplnkff6r55ffp6b66v8faxvokof0gt3wibhoydogcxx69hr02m7ddjbndyte4m2k7w36z9ks8jwy1kr1qccxvrtuxlxfm70oracinyi7npicgd78kja4in3cbffhbrkq2l1d2ag3v8w8nw1vg84hsi1orz8q7tvr3b2irer92fzesxzbdfs6z65vlwepyjjkyh70s9qkgyn64owb51vhgd38npurhx2t9gv4rcss8mbld65awqpe49gk21k1j6dw0it0dvyezftnwwnnz0wkxtwhwntzvdoqbnbr9xeq1h0h3ohztmvfdiuntsqs15ketj0s4fjfjexfpwawnj2rbf7gxs6wumt2611vphysax8kussfntbfiuz5cogq7k33zg24aoei9up6tofpqjq7cx75mn0pav69tv5mnlnqk04xi4v92cdemdf9amlcyjbv8tvmaqboct7pl5dqw20hotps6dvcm8ju1rhout2kd25stj4tfxj282tt204eh2pgd22b8ycdg4ehzsnb8tck1xj4y1xbiwdl10vj0qtrt8qppl21vvjyofs0psztm0xsb3m3p376un6gx69sve333n9vsryf80qryz5dfuh8fr7decradg58kt4a2hs92r77a3tdsbgo2z17cxhmias9oegdqxz28qi3esa2lu1pp7cl352358v9syu1qd9l1et18p95q9q6pgx40o1ai265qz7rhzwqvfcw9bjtkotf74o7yvqbejqdje3dfxp2o62z5f2gvdy8yqi5lr6lj3se7ctbe47a5zbf22xngp1qdu1vkkxmosdu5va3by2k9romyyz7qnfnr62f0hysjgzr5kgs9oxzz4yjj7aagqc5i48nkj1a5u41xifmide4fvk7z881rgtb24x2a2rgh4bp0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: '4wgqmobrlwekipjxn61wr70ruq80tqf2xlr988tk47dhtgm2fw',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: '3xl7viqiosfgpmkhvkjw',
                channelHash: '7xyanqo29ws4vo8l6se9u1boy7errido5p3zoj57',
                channelParty: 'nnriqk378jqr393d9mwumq7tp6xh5vxamwqpelzv7a0k7732xijjgwxa3qm8wlwiz02a9mdn0svm7lqbqat0k4x9ebwvfiukowtd7xlcig4g38to8lew25wu8d2zpwaxkfwtau25q0ziomsd0cmaoejhg5p6h1ws',
                channelComponent: 'x558bgl5fhhjzy69qiv50376vc32kxn7bowhex2ai602au57tkn14aczdp5b90ynom9h0d33rst12mduft9edm5v3ktccce05abvypq60p9e4e5e6qsgiuebnuynms5acl5ogcfemcwk96bhl58mvzmdbwqs2fu3',
                channelName: 'i6xmo86d9ilkv1yqbb5ohf0gx8dyjsjs7dkbqprjoqoa4nummlwkaovy1nizosa0bt4r6kpqbq0umjv7tkpxywa1fobwbqfjfu0jnqiksnb9q4qw2o1mn52s0rqueb5mshpmnl2ue7ayc8bq0y576v215zdtijgji',
                flowHash: 'n29aptot7ewljv7oo2p88xqj8efng4fr0oelb1i6',
                flowParty: '5hm1epicz18qjcgsqmw7zvt8mqb8ctc1dx8x96g5u4a4akb528w16fpyycyyy4wsiizx2m2zgdz1b42b3sqf4y38jfyhrikleyw9lf5wkyd5wtyw5bxbrg6ri54ooifyk3j49yvr51amowm2j2antc2sbyy4fniu',
                flowReceiverParty: '0fn1t8chci8hqagf91t8wukpfnrgkljy8t9599ua1mj8fbf06jun4fjnvy1likywmxe6k61lmdwj70ne6lmshp47q0pjr5eeuvjzcgscwayr771gmggrldvmyij6m2iowu9katg7qzi9jmspzfa24eka6xbkfxzy',
                flowComponent: 'mpgv610pbo825qliwrh1kcm9n7dt26tfmqxhx4yhff64h9rc6ouzgym90l65nqmw1o8d6ruaw00mr0suxxqb76qf8efkiqwl38r301n7btq3z81pc9t8hj20unit7bwvdgh07tknbklsar7el1xsjbpglonqsuug',
                flowReceiverComponent: 'l3ctvjd5jyj9c0d7gk5qw134mb55tdrhp1ep9tv0togpjmm54zralip8o8eyrveylq162tde6m2jrx4kve06biushrczl0k90v8b54us373gv8s3cne6jf1yf7wlcd21y1x10m5s0q0tyrod14jjf5oaaiytusqf',
                flowInterfaceName: 'j41cqnprh6bh10r21jlch92kirzv18ogl4pq36tee14h0s68gt4ua97jkbwgnw3xpicywbk7t4uj3luleeykwl1bnlprjcp1wap092wpar0o6wxgjqiankntrufyv2nysx0jbywu9dxwmmtfhug27vlwwmegdyy5',
                flowInterfaceNamespace: 'dt6qa885s7oma0bo568vebcoybv4rot8mi9yzksdrfvzcd1yjkhkrvite587zqmolfk77zytrrqjqrxajni4odshs7o3pwb26zvza9gpchh8ezo8x0pjsn0xpf182v9h8clkb6u57rpdv80ije7lr2xvxggmc2tw',
                version: '5ogv47f9k3141itop5bt',
                parameterGroup: 'fz8r3nr3yhw8xe66ajc63wgljw38ik0m7in6mdm4tbwk4r9v6trerbdq6tdwsdk9gmplk6e9utbgtleqn8kog67tgoqsyw5b6klkayze2na94ipfcc3p7yghzf936dt10clhtwypezxx3ujlwm877re9f28u0qsfntgi0sb1grqivd8alcf0z3h42oezag2b39dge8ll1ou3rovs45cue009937w1rj1axe147xbimsvs57akijsch3bgr6m7ym',
                name: 'lp1hr1ls18vk84gs48t28iv02jhfo5a5guonicb7nx8tdrcqs4vsp2ayfl2qg7uvk10x1evyh4libt0ya0sjmswszvtzbu0wdt7zxfd7y55q7dxzs9xswl1bhkidv2q2fiyc30vqrj52b2qx7dxnk5e3bolhrx0c4i8fnu4y3s30wxzjgkgd6dqspltvg33ttis5jmvr18oxxi5sqpa8byzbsog22ta0f6et2to690k9im4jzzvzt8i9sn4o1wsjxo8aizdqo7jxphx6wyp018fu0xq8j3jx0g2up0c270axot1kk6px53tuipjaxy05',
                parameterName: 't85l7jqvqivsgr7j8ak1e9vwisw50diopcinvy5cnf5jwgr86dv252pnz2oth56bl5bear1gmpfurk84pov8i37bork656vht61j552kqwmtfagkdj66fqhqbqlem4qhd8x4tz22xm2cj47703h9yqi4z10ihlg1473b7gcvhi9xn8m58ikbz8lfmlpoz3osok8bt29javbcruatvxlc1gao5krkfmilbveq0mbvjdfucjz1cc1a5bwpeufjyye6mmdqf1ezdz52agojhk9yb38fv0cw1j1hbf9ss24psvf5izarplas7y5s7hivhxar',
                parameterValue: 'pom87xstxk1zclm2tqw4biay2u4do1fsioti08zf7n1163eumnyld84csz9td806kiirs32ib8f9cpkxs92353wk9ht6a2psrpznhnmgu7rny6e3y5phzhi2io2s81bhlq64kejwpqo69qefhpqkgjd2ocx8qsmnqs5n9mi9v2euf5561cijufhvrkjannylbjijk3revkuhkwndzuvrczmeca3mdqncw6osqf9k3rliiuokzi1pkzq36d66d4ftz0dtinadk9vrchy68dvuz4g5af887jwvmp0zmrbfj52fj2zo5vhhi8yz5x42oq035ea10ouy4w1ktzftr0r3qx5xg4ecd9ltlze9kogeqiaw2jttw2gwwx4jxc9i47o4hm8f7tc4wb0xjqppbz2wuk7vdojx95hmspnupmemd5coh37w3dn5q0dxyz2t9qjxp2psmw5ch7x7cqp7o37iy6elpcl1qo6wg6wuqdq8ka16ayrwbez74jfxgv7z7ae2xr4ld1d2zqgv9gc6pyizueatpvul3f2ab3046402e4jpvzlwmxpzmnj6gbe56utaqd278zrirlqt8gimlgg8cbm4heahimi54wmnz68xrrugwirch6cq1wmmj53ihhqstclk52vjo294bpgf4e1jjv1qcznhr9dqr3pqsdxz8tuy15icuwmblkx9z98cj6pw917swtzistghn1h1axb4xamjbrwm9d38idsqx4olrpax7b7ax5ycfgby9rd1obku97yke08f4doi3w83v7jnlze4jguok0cijnutdfbaahq0091udhj77t6mtkf3nwx489lezwippwn54aaqgbok788f697iwynqchcxn78y6tyy81xkurt9mzw823ynga2g226i5xtd85kk2hl5rdo2wztmj01jf055zjewpiadvpfcssaoo5a9kvsawh4lwba8fn9c5f1wlzfywjh891p1vh429fhyjc54xxnkuvey4s41xntascm4t96oqwkcqlow78ceoxl6p0ngvtmprhxg8ydecojdrs2xb6bnztr3tql4ao34fe1hs8i48p5w8gy750avunt2o5c62y3lgkqqdyy3og1nowbys99a871vfvv5w4hxgpzcj9be0v9c1mkd06zdul5trwlifber28ugvn4tfaj911elo537pl7v3ziu87ubt1y67zxxr1tjnrv287ssaisuigh8tr7p7r9nxbrmm404mdgvh10zz11ref2c5rcezy81f97hl9upwym8i1fznc4ub0v2evxjabk07vw8anmyhqkvgwfuc2s15wtyc9wgfvqurq0a9hjhfabialt6gdlvu2ir9w7e8y9pzy8nk6karrbujvumqxo42gx5mfsoi9aktkakzf6gi8vjahgrx4o244urg4x7cptyxm4mjpotvsbk7sl7lx9586q6n4x31ggvkberg24bzqjrtguua6k8b8dipncfgfxslfrd2puj0zem759gd4pvz28dhakqqt1x042qo2t0lut5cgigrgx9gvwc7ox5nef1hotrglsy3fb9vp5slmqy6ipubkfeaceb06sji3sdp26kdy030rpbcwjlef8rqfbaiaccp64m0sbyus036vy1kp8f2as8198wawm7bzlh1ri3whnv1pfacggx54l580tpainpqb7pecse2jeznzifwmyoit9di1j7tvuzkoprhv1iqhbiu8ouja9202z6q3f2nbqwfgj46d92sxrzb3qkamseav8ngc9wxfkncavlecu0a4tc4fs2u2uzxu9yxa16ej1uk3zl9v3x6d17jr33sts2lqbvxa7mi32borbjhimpopvhi0le9ku3v9qlvptxl9szdislwdy7icewzeft9grrx3y6rj7qxi73pbte72q53o401vuqkssga7vlc5ahpamtdlndprig2tzbfe91wsfhytcgeaabrj79ecy0oxfofi5phufbgzr015tyupaacd2r8wx8ndbwrde51jrvdspxvmgxwegoevrvbmoddf6l',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: '8fnfq0dr3e5n4i1jc640tmhr96w7532e4t50vjnctam3ihqqhw',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: 'smh0lx1aig36cd1hs2ka',
                channelHash: 'fhfn06bx2q1a9c7vsavjb06ojvc48gd34fl4e3ih',
                channelParty: 'c66tqxbezy01jgnc1r4pieq4jonvd7c1to46z8miauczhk4zfatfgvdylohe1vv2lkommm0o7s74qqrlkrh5e2wdoy3psko2f6eekzvz3o1y2j94ozqwlu295wtupuj4fu81wth19jpmf8luekfmo7d4umf0jrol',
                channelComponent: '8zsqqm3ovqy31q07683ceh36846cu855vlpy7ewuxanzvltwwmim8t9wjwzpr5mpfhvgy0yr3v0ku3g9nfhdwpn9svkvtru4ftbebfpmtjxxx7qiua91bxjiygz60s0o9hktczkr2lz18qlzyfvy6bkz5d30c8ly',
                channelName: '1zapdxei9fs10vd85h4epr26wtb3i81estmba4ai7tjrps3x2ko8dsy6lhib508erswf4kb80grb24tx06js879h3cjr9eofgl7227ky3f03iedfoz0u8sjmlhja3yyk08mc43jw3a3verf342pt76smh596p87a',
                flowHash: 'pny7o9flg2zerdypv5n302yphypmrsoxnfe45yp0',
                flowParty: '1rpxrni5p34nuqhsqfa0ndcf39mi94d6eafrti2jleb7qy1ib1autqfnwoaq568sf5mvjjpjmt5k0c0pv4me6sume09nfl86s7b1t9ybvecjnp5q2wdaenedomtl61s5kx8s1vjt8nkg81pbghmb1tjhi48ts7bii',
                flowReceiverParty: 'xh7jutc4zlrhk4w9xptm7bws1h060insb9a2j5q9729gw4pz0y7d0eaxseiuuqbsuxdq70ndkbor3w0af66nlv70r0n3979b1x4n1xppw3m4prgiuon9ykp65b53nzhq5zwx46woakdgju72yi8qna6kox1ndmbs',
                flowComponent: 'e8lua3r5vvkagf1qrf01r0jqzbfguivlu3zu1pxxg3pk1b08xzvey2okqjcjva1a39fjlz4j9p0e46rsegsbz5e9odtjs742uebt5ms8wy1uhcj5ib5sudw303xk8elqrt0u9bmuhrlndgbpdbna5gbrvdrd97ct',
                flowReceiverComponent: '9fwowxsiyseygqpw54fwr9zsvbg3r9ffjwyl2ktwwjw48s9uwgiq4oo57loun7ssx9dkjftm9ud8lzvr1mnanyejv0y6odm75s0feciskdop5zoz8v2zo6g5mdj5ym2g0ogtn0ilgqbqlz7dj93i6hpcp0gahyac',
                flowInterfaceName: '0v8x4hxdnm26x0xz6zkue2qtughd8bery6tbeklb3wv5xzvhxdvcwduofbv3340xp8w06h3fjlu7h3ok3q0o9yh077b9sjbm32xk0hp1sucw0g285ajfvgn2xlheex7zjietz0i9tzylxwvpvkrh63n2mj24dxqe',
                flowInterfaceNamespace: 'mq8f7f9bo9f951g0y2eqzm5uiq2ynr4bazck2dbmmm3up017pqysfecrggyz12dnsmz8k87aos4aaytfew2b7kxlfr6cbev50i1345zc0jkmioefijwebau128oqwqlkzuxiu7vtfg3lwv4m8qtj6uis0nbwyp0l',
                version: '25i1s28jmo1lzlxscxnz',
                parameterGroup: 'udk8g1bwh9w7g6umy95u5jjz14xrgw3j94n4udhpbheegldfs495j6s8m50p7t9rigop4r7wtx5digxjk4gackfzxx481eh4816s392fuym9m1lmbvzwq2395ncyyxcwmce5u2j4oddlhxix5nly0xc0vuinjfbrcd083m609fur6iyjlo4x3ipuiixwo7oaf9gy47ich8e1e5d66c7rrs9bx0matczamvhfpd5r6k9l6rpxonpk83vqdp5l4d0',
                name: 'u9h2yxtick3taejokvtklwax6cmhhj2vp7msfarrcmx9owelscxn8svv44kk1emo8sy0ot0rbv221w95wbqvsxz3b2uvf374d393nfy3y0mmddxkrlrgefhcagwy094bfp9wxwf0kdor66z90n7v6qafe5irldcsjlxj6qeah0r8cd637r6jq6v6wm6cyces8wee6uakboc8zyuyfkda0sjfxaaa6hy2s8aeoa6v12frwii4b9kycvrxth2yrrgwac4o6fkesy20azd9uozsv02k558bcs3rjtq2zrx9kwiwtxa4gb2m3x7i56snxxmz',
                parameterName: '5k88trb4tn4nsogamkcwb5m66fk1t7o5b1hj79hjwpz5o0x7nq4ymrssrrbexry2stphvixdhzjx3xw1x2mdo6z1wui41gipxruiu9sw00wf3pe815lszoug0si5m0twb4psf3pxfgkfdb9hz9sqnai6s9a4o86jw6w4mbq60y9ifcr9vf3kfai3nsx5i4lumwdqqukdebsrj3xv4wvot5swevvnh97ckfr8x1wc0mkh2i5tzc73prj3b0oo4lhzzz1p23njx8uem48ywtt6kxgwk24c9so23usbrsbnas7uhv1ao912fu7gfc0g2nnk',
                parameterValue: '4vyl8fawl2o391tk275p1fb36mqavhcf8jlvut1l321csw0tmtgn44o713499qtxy24x635l49tfvzngfkd176l8acs10g9hk5l4ytau50cmtycyb9k79yjya1t8ptjrwmk378tr7ondg9mk7a7m037y3vfc50ckcunac1agnczxjdv1ltu2otbzptpspbgvjq21ag0o2d4paltwp05v5zokmu06i1lto6m8bacbcb60os97c13r6q42uosznasqjo7ouyptm2ppr8s2tnhdesg5g48sm5isnrx70xlijgj4xvydn5mhg4uapv1mkn76xkge4ushnk6h10hulsa6j15nv4whgfcoox4tl9cr5f25gpzfurh5un4rvkf0nilaf62gpl4jync3s5gcm8sgl26mpjfbsudngchp6etu2qd5hiqiube87tszcoo4q8gldeo6w5xj7kf9x8v046qw2xpvq1ih1f2zu62nflvzpjjygmkjb1d3wl5fufv81yimezt58ucryqyiolebcyzx0wa7ok707svp3c77g08qxnzwsrbr6fhs48bit9eqeidnop4prkzz807r3smh7yfo05kmpkufno94k8mrx0ovh5deam4s4k40jhdl0mhmsfgi3ti7y81pzi44w36ew2arcj42mdo2dskwhhkxj4ak4t26zhpcommqd0qcx47mc0aaw36tr71y20vpdyz7h1ja73lsjmkye34pfom6j926dphe9vn8uzo05rotkl6zfahrcjm3lsh0fjmfthl6vobgucedvcqepp1ne593xaxdvlakhoi9l5krzirtp2wx7pxmoid8re8acqewskhw7uy5pjw10caqlmyi7gwnl9ktdcbp58q4qz66ncy2ah4xbc93tnm17n9fyb614t0ma8vwgqabd7l7cv9ntdh2go4c2qrgq0v1sg6o1e9mbrosuy5xrxrwwn7o33kd5omjabj4y589ppfcrl1fcshk49epe5aw23kja8jni9aqhme73dz8j5vpxhw1ygz030r6q3tx17p4kznyaul3de80nqyob53cg5qcjy7agdcogwu1wapuidc99u45wux0vk5a6om6vh5mt52b8v6d678vhs2gbv1df857yz6z2ynuuer1hgfxegvgy8iq44z1teznbz4hijix9nb8u7w2k24ho2o5pl7s6pbq8scfs2a4nmcizpuecckzsuv7i8izrj6mw369kjannxmw0dh1zjzapr6lqc0tmxgg1arewiife8p02vfuzmxn4rmuq3eldsp1if0yry3kw1802c8cfvm4w62xd2ig479r62t4eq0xi9pkgouk0zh75xypnq9we3wqkrnze0oktcuezh0dwn3lo2192j1ilkj9vjds51rryxpqum6cg29hkx63vgm1j5g25po21vbn9qvq7bv6g4w0q6p2io433zx54xv7wo8010yr9ewoq4901v3l6fey17flese2tlcpoc9hah4sshr6cp9kh0ntnfvvsh980u7ua6oz1qlm4vt5j7maqc0y0z9u7lp1lpi6664cwgkcy6vejdy4aco70r4a0d2rpo3mkvbtopai01tp26ksvldjbnf8nylcs4248aou7o72dedukoyn16efn6uddsi9modypo8kp7kgf5iwes703pf51pc96a4xe3rxedavnygfnq4v5yvus1e01uga0dukcjq7rrv861k2t7fugja5ni8s8wz22gd16ewhzppoh8769y0zcxns76mny1gv9xokqkem8kzm6q3flgiz9hyhufjsqz4mxu0zz337uxjy7d5pzfez6i24xam862tutvnnt61ug0q02ekgw0x391uasvtm3eg1rynv0us9m3m9ulynsg087ddir2uhdv1gup6rxkqtidv52cu7mw5offze6t29mcq3jxq8lqnybf93tajn7op6ueplniit5fwf7rovk1wutle00vzfk8fsapjxej8ywz59v4czlglf41ci2tkzl3wc726obpnvxbw9o0hyad4ysgiyzpb2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: 'yy8afnb7qdcckihjultr7fwroy44aiv15u9ysv336ruuvr62hi',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: 'suutawfb4p3xs9nmq13k',
                channelHash: 'pkc6920akntvlia9lo9afr92sl1pqndwtxk1i4fo',
                channelParty: '40g9j4ghh5mbqw8lsu61ugl9pfshamxo89z3ndzhll3x6fbzgo7jxf7wcg09twz7ja0afp9a0rqdfqb0433u0cyno23ai63477ejlxorofpme0kyugwr2daw2wa9cs9tz1xo4sy6kh7uhevmeb06oc9e7s585lc9',
                channelComponent: 'zpahnwh7citzpelcd7bm2wh3i93pn7k3pad3qo1nvcwgib16u8esm4cq5kiq36sh2tei9q9ftkmhaynihudsctlzju9btabl8q71im3nviv2m39gxffqslk9lv6dlm59hvt3lgnaml25l6e503jk5nw4u8ge35xv',
                channelName: 'zgn8itfboy83yz90p911qixsfse1o6xtbly8cmkzktpugkeieq2zu6toft5bhlb55pu7a0j1718112rabw63kt02xtd52261vew74chr9am9ovcda6914q3lvznd21rkgcrh4ccbkif9ysv24hpfbu0wl5trpykf',
                flowHash: 's9eskxfkj17c7yx78md641jvxs1x1oruxsns3uhm',
                flowParty: 'sbjqda4hf3rxehkc2q9sc3it6bw955szkkp3sir2467a3ji7j943wqmbisqgz140938c1cnjinc62m1ehfrzs6qdp7v45jvnyyr5alv2zohtyx1tvgpr96669xrpbztidbhtrg353if5ynwqbzvc2rs41crs3fsl',
                flowReceiverParty: 'x08d99gsa7xjs1nvsj118776uqglz6yvh0vspg8y1uo3an0x8468paariwj5kse4wxs1ai2452dd22y3frya5jpx689z4ea468cpbq7rilmb1nej13e20h2mwy3n35vrsrjcppnlloi2nzuwc1bia2fzpr4jarnc0',
                flowComponent: 'iqrack300ypzl5obutv3mv1q48sr55vns2r7ck441cgigypogo2z3miebqu006f9f2l2wyhsw8kheumo5zovkgiwzyrvcvs6yt7t2b463uq2i1ozi16iucogotyw1d3g7an44ynrkqmomjsf8db3zyvc01jb47cd',
                flowReceiverComponent: 'todqolq5awcmmzpzy36tbt1jvvut4rtn9nqbv0ewlzr9yqoj2qxobg86o40ha7z9mqv5h79cqys062plzjzh1yf1qzq0bgmihv4osy6awzv5wlulgpu8tk9tcqokcwyz0hqvvn5ly0p4w0h9vof95p6iol52m3oy',
                flowInterfaceName: '2xbdi8fjs2kg3xw1gsma3l7dtn95y5hz0zn6nkhwhmwa0mb1kgl361swuo86q9d2ey7en9gviykpijm3b0y1pbg7g2et7eqn6qkht2xsgatwtglt906e57ddi1p4o1pe5e4enbm5pt3soemfmegb6vc5xgwvh6zh',
                flowInterfaceNamespace: 'scnpo0uzoblxrfb1tnmyraar7ciudmuz9814l7ed6rf3soojwt5jvdo5dh0fdfu5wl8jr31v58notza9dqz0p73et1mp02vpswpomwqdswl21j72n4e9bsaqg8popthnfkfuoy4yh1fdu9x33p4porrcskc0af7p',
                version: 'ab0seil3je7ehh3mup7a',
                parameterGroup: 'n184tydjzfbtssh6b6ps6d2fg4gkgf708ddmkcghn3nsqoz85hvqzwed5sin5obh1ogazkgearrng199894cceu49i3ngsm3iv96n7hsp9383x2scig0gcb3qo0qz1w2qhxhcit1die5ulrysl5y7xd5x3wohclcm5t59rp8tyjh8z1htz2xzjcgdcass376ocjxbd0uxexs7slnxw2wq500iopg5qwyt5xrr8r5uko62pchzyktuontz02mded',
                name: '3fik722yjcss7bp8otljf0d9mcerr3prbuiojul1k2ug3jr6qyf7s1ltx3ui8831ucj93apv2kwsc2e8b58jsflh9coc1ycj52086x2ome24afibdwx42k0zh56sor9u0p33ibzaisllf52v1gtv8yq3mamjfr5wb07i8l9ozqoyzhw7a0jgx7aq8979v6ta6h63jp679z7b56hl2lwoi4719jr22ozwuol73gzqyo2g1zkijnzg1sh7cypudx7gileeck3bf5vzkepoc53fm9i4cfwlnix3q4fkgsmgmd9jcjmklng17xbtu6ixuscp',
                parameterName: 'w1q8fc0a12w951hgvba1ibvm0h1n1y9itwu8j18q2qst71hsrwv6j0n5vh7or3p4ssi3d990zyw61ttiyirtnlkk1w3ylnsk2blap1e1ggrgcm4vtppxuyxmvp22oxrtlj7lvbntpt9fkqxvvmwhbocseyduq8b63y1tix9yi14zk9kpmiwems0cyx19jtl9m8j0cm1egt0boq1o44bskroom5dx97amox66a686vj79s11uz00hm8wprmc8dcszdoglrpgresyvd6ge6ja3z2zwrwee8vum40v4lhjgrui19x46jrnutcohji0gr6o9',
                parameterValue: 'hr7ftdel98j4abtvdhsdskh4bf55kgjy1i40nv49vhaonnwfjx3incwk3whe9zxqcqfm54ygd3olhqv64r30oisad2275n4kgpjriekcgkhypz36b1nkq2s8f91ezgi55iiwr89bstahlsx0dtzgunrdt7bxyol1e43p4vzgd2rkpzybydnopbyx5ihn8f3c95w0kgt9obuakr3i0pb2saaswobknvu7co1zfhs0vgqgd49k04dheexgnq9h4x2oamyu6mebt7eupcrtttb9kjyz2wjw4w2f8f6nh65zj14921tdf2twup5458ufb8c6dcylzli6zf3pn2kvdbenhn0mnh42imhk7ztejqxcu9vuhlilv62ldqwuzpeq12pp3awzb9tzi07u5ac8uyepfkzrcppoomaa23y9znsk7rpxsj2ilaq8wh606gbpilblclypuwdodj7qmdznqqazwiimbatbbi6epkl9nmomkekqai1mn2pv7mpglp7gfpgpu6ef1lhbo86dtjv8579oajkbtv6bwbtam686lr1wolxlxkfsvpv5xbh34rvrz90smhopo78sn20n18utz4ty561iwaobiedl0lg63xl481t2bd1c12q1prnod7sq8rztl7y6jou51tl1qbgi6gj08nbgasfiuyhoxr95eost5f0oryp4mhvw68n4f2kram6iu97cslf964zuy9cx3ml77yxrd4oq87u0wyhdii5drmj7sy844iz48sffrbbfvj10xqwda9zzobi6m2mvoy5yoxghfiby253ut0ykhfo6w15rmjtbiu2tu9qpib5kgqmvs0zme4mm2z5r98wyld2moogbri5jhwnygez3kaiy5f3hp4wkzs3dkx8sijrh531optquyj88oilf80a99404opinrmpe9y4rmiq8txxx2tuk0ticiqvlb7k8hkefgwpwo7p9cb0sah1gbm2qp5rbmjxrut7kzalb3fjv6tjbxribawwa6z192jrzv4m1zu8iqlawpq8inehlm29ylf5xlwwv80gsieuo3ekt4x6m9hvqp9ggcknz843kqhi8iligtdgpfg4y3qvk9vz6lkiet35fo46xndjgxknj08pqi35s2xle5551bqswzxer3lhifshqdhtd2olqph38321hbjo4dvfu8anxwtq821yg8h6kklrjluivwc3wwpb1ego776i838g3udzpzwp9wqz27cqtw6t50zeb7u9qik2wwpsqm1uuwsefpctrj1sq1ecgq3alcmur1ha6qt5awzslx1qjmrerncm92wk4tx5pm0tqfqrsnq765bbqv921hshvgwxiwamkkyh8lrbw87ewcvow8k9sto4g9ss2jztoj5ayecklgtyn6b98w5eslm45n334xek23y46ao5pxksap2i48y4ane67xyy9x0nyp4c53dpbfbee9jbli9b6iga4yr12gxggfx2g57g8brxflukmn6y06pnv3tsy80wleaug3qe4iw37cex3fg44wd8n2niwjvhgjbbyk1shnvhugtb0wvrsmp2h2jvdcp5h7v2skhu265vkva99adya1ggxziqbkbcl7na9kk9i164hp2cwcirooxfg3l14g7v5j5hkuamwwdvyussu4s2l74y2gpt4e8q6xz2zwhsaxiqmakhz6gb5ylb4dqqx1fg56u5amnar0l52ob10ddk6pcvt9zmbiwm2yiw3bqfo8qrqz9zs1x21hb3bohwtgjyqi8f9giyql827po6t7qzh64r6vstj436uxhxuvbruiuzc8jet6e5se3b80db0iwh70ai9w49hnhaachijhci0cdqdygsijqdpuv3oyqa8dd428ve8xee4oo7ka348kxoz45mf52l1thjwcjwbuhy2m2isxrf4ezfhrsxnymlyrl9gg4kqiigdcupz6k4beassxy3ou9jsp1k75t8ik2q0rikuiltf6r5ln0osqtmfm95v1uoa43h0ie26n215b5xgk87rmkw6ezn8grvad7ij5odq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: 'xd3ykmfzpu36t6ixfwexsypdglyj87t4hruf4t6f3uih8ycf12',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: 'y4t6jdobv4f0y7hc8z5c',
                channelHash: 'xo8gh6brjtyfm54siwactftlbvnul94gjl0vggf2',
                channelParty: 'qmqp9joalcfix6t1zbk9bl3j15f4ejjsoi898ne4q1jxxxkx6o4a08jqjbcdbnoyq2yst597dlau5g3imvg8t7tmdxtpcpt0n3tthkadye6wmqlrvxwjq27xww9ndu0p0gmxf44tk7qzq5jzp7ilnug6yz6lxg2h',
                channelComponent: 'fi3l7745185drdq1bl5giguuxr9rug8k0hlbbniugjjwhwvr9dekkqh7xafb08a7tc7mw1wnkvcokgfgsdkvchm5xhl4roesdfnmbmd8di6q2vheaxi80sjb1mg3to5wvdtosto7tdrcpb9634ekjpps3ua59m4g',
                channelName: 'sz235x5585jzzk2mb39mmhh889qa2n1zciv9430mi6kx9b7y8anw15hip5aqrms6vg88p3gd9fetaa09og3kifswngw7dtneaelng15mvyrh2kfr54lwl39rarlfnyil6t8n2g8jkbq3czztfs1l60f3vrp5kbug',
                flowHash: '861q91bt3ntl7iqlul1l7a9o4t72qzfaztjeqad4',
                flowParty: 'x4tc0d3j9gq5ru635jah2v85rkhlkhjprbr9piy3um0ypa54a3lv52or2xoonqoggp3mkktmk5mzrpys4tna2tz7jrp4wu0y2y6c3gj8bjtipki51bvdfpujvtt77v8nozyff03vmkvpy3env2ydxaoipdebuz6j',
                flowReceiverParty: 'qfbxc0kmtc89o2ap2xafo1s56hv5uwfp92dyklwi45f8whzyivma4zwfdr8amu505fgpdduidrt713ykek98v5aa08zgpf478fffji3cfgi3pebkq3n6g445jllydguoj5pqeapahrs8kd93m73p4kkb0j3gy1x2',
                flowComponent: 'ye484n1j2c3qyh9apxhten85mqtxm0swdzwr11s58q763xbee4szm6b146ginbxrelcchxl6ij2ayyfflpp3x4z66pdu5ghd4wyzn835y3zqoqydxwlhd84z872xtrauht7ul55ing35a4kzkurhby8iz753ha1r2',
                flowReceiverComponent: 'w8zlhp88mn73fv8d9zdddv61wbbm8z19r4tko96wnhzerg9uhhfwq2hbkz6hw6bb6t78smt6qcl1nk3h1mokh3uz4thrm8u2v6d51cznbwc7o1v78xdnwaoic48pg7ckoc8ea8eimpdruyzr163uy1ycicre51fh',
                flowInterfaceName: 'a0qnwe8ik3rh3xj6icn951xbqb65lif4nizz5euxqrezvjtjsp9mpd8290ygyzdckszphqehy9ez1arzzrqnnewl8jbbjrpqb58hx5hu1nr6iuut2l1xygj21nbnx4msvydnjektr95gplyh0jgw5ym5saws5k7r',
                flowInterfaceNamespace: '0030j9c9yitkba55ngpqmw2aj6vj05i75tgsh71mc0ybar7l88lee7trpy4tmnw5qcwv6vl6wl3d6c6s0hjqx3t84yqzysbwcbk7cykefdwe1nxdshh3ku35ddqdi17jsfzv80645dkli1nlc3fl1u3umxdsfv1h',
                version: '3amns9equw80evmnxe29',
                parameterGroup: 'pb13y1ofv8bihp9bjeq75qhmdwmnbrcm33mmw5s4lnonu0nbj2t4gw87anhlk09p0hbl6qk54kpjeq4lhn73lk6c78ub6ybhebz58t5wxbgkq8lszpgsfdf6qhms1k50acbzb56ngpq81q4cooqqkkg753ffhjij3r7otgno52s677h61gcztsap9obv76eh1zum2s9j8ajlxj8mbjhmtcd9rr072tytjk4dts77fl6sj7y81df3n3grhjoj15v',
                name: 'vfrvjihkocc4dz5f2jdrsyyamqqg1fgsyefl45db3xt2rdgq2tg1e6opcixc9lasbq2n47gr7sfftkhdv07zzx9zesya1gk6haynmjffaribh6vygxd8w8pc6qhaurkd43j2rluin9zs0jdtdfq5bs4t5q7mepwg7gx15jaf5gjcprxyitc7dcqfzfypmgq9ql0cmi9q06xjapip54j3ymlhxsv7b4ltgherynw517v1kqv07hwfcu4ebhmep7shtuauw9msfjlc5sq3kimb7rbnekjgtwo4q8ymovpenklotlrua8yg83ra5i0s802b',
                parameterName: 'cye84642xyuniilvkl9h8z4rf61bqmt119sq6e8cns7moy88big2lydk20ca6j3183g0bxvre8cudwwv3ihd1osw8xey7emdhaz55clvte0a75ti9uegon02x98epbq9wgwr3k7f2ovqxk09je5vg1jk78lawfr6szifm1p7oglae9hot91kphmjyopht6zf2eqqktobbhh1mrzts2zwc34v61fslmfnt9ltnbuv36xgktvuoqnehi8fs5z3tb416it3slhohveneerx19sqwuj48z102yyuq7oqj8mqyzkz5zvnwgxez9vyfn6br75s',
                parameterValue: 'sf9nfgdt1trt8lvri4btszm43eznf11sz0x9q1wl9wokmqj0t60pmx24i3ce93jzgwcsbj1su0iw1xen8f6rl1w481al6f8etcgt359vi28b6afjhuww6yjej7yecq2y7rwjo2ox201iywo2kz7wcus17mbdha7yavzb1pqp0ubbzbykb0clmfhb5cw5bslvt3ldt0d3bm0x5ju8b77vvanki4lfr5bkdhy29xmyod0v86p5cvs2cydf3yviyflxyo6xzrlwfdwta5jbm3wzceably51ero2a3mytj7tkp6268x4e6024o11g6mb3van4yayo5fad5s5cxuh5myrobnvmawq6vnx9xmw4n84udu2d6j7eqkav2igy5tgxoyalha2f0swr6sipzb8dq7qmov98f3a2jdmoqgnxpcixcguxuj6f2qiegyuk0pe2h13wp78gvw17p1k7eywl8r59yfdebw5q860crn5hqcz6o0pcna516yoqgvk28osdgnxiy88wvzgnvizj0dxoj176m6m56t4ec0zon6l1lfkwgiiiv93wusf7y8cjqpj7i44xy91x2myreumukxui1ldetthra6zhk12u3wy50flr8x17zajphy8bninxl8hlba0ix6w27ukchekpi57ogxxudpuvnlem4tpbyfc4c2i4igccjh1be0f1mnuif1mdf1jak2kj7ji1rad2ay9i440xl0ias5obyumvg7zu24u4nk10kxhowzasvymu5gshab0tl25l3w483h8ufb40s68ogbuf9kev83o6cbr0zxud467g775o3w3pt0ej4cjooxpggdoswlqjqnbowlepjbn6ptl0tft8w7vacc6r75hiqq0hn91l0x7qrlefkp35r75c4g4bzh4mvvi7iw4mns6c5k6ef9j76u7xm1iet1yyf8tyjsvgachiu9vw8mzjujq759ypcydaanx9fw36zjvwkfuea3o3li1sttcfazbg1ocyqbaq731qr23dogqrsxm2uw9fjirrh4aak4kdc77faaq627pogtxelj64nwszrs6ehx2q5uid3n6fg9sw1809c5srnohui7ttro0nzhqu630fmc9454we93iau1db9c8hu3gzc9xb3zpbyizqbuypocvvid61ih6jepy1icb1cfjk5khw0xzanl1s04ugycfdpsoijolot09di6ai3798vwhpqzbrvrrz4rmuavxies4q8rgn33d4ckuucpv85srw660uh2lonxxsqk4hh275a6yj45tmuwlwutazhsigb5b8vutucdv8vir58lpu0tv4h06538bivd9wjd34zkdafqsjiax6k6nirmnxntxhk4fukq36v5i6rzmuvgsl54kg8g01yx1jquyduoj4090lpfzsr4n9t3b0wttt4drr712s9ghzfim36iy4z765vweofojfz076p8qtk9zlet1t6rnt2aokazbvih0rcgij1scgjzmo8qxmq0b483b6d7sykdqi9l3hm0jbskaynryclrre1nlaefarghy6ftunbwzc63etm49wfp77cmohuy92h92xrk3yajr2f35srv2p3ybx93nd3c5xuy0xr8jkghe6m30mfkpcddn7x9cctuao8qtzci466fodr2zbh3eadthswf2fs40e5dzweqk7om672sfi1b5lb8fnssiqwb2c2qzp6poq106pfuuywxz14u7pu10zx2ojg2dp99vchjqyjztt3kw2llwy3rx3yi90knektu2bxxhqjb92sjfdkqg9db9ulttdwllpp6qf3rexiib2olc4ss5syjg9krqu46rvgn1s7lkuq4e34wu9scp3np2rpxshq1m4aehuazf8xsboaf7fl6y7rjg176sdlah24xz58ghpxjw5il5gi1pkp74967uav6bh2r3vsxir2y5z9es8oktceei321jl8d1c0e1eodmla2dl0a853gyxzuj942mjrwg6u2etr7zlyi5muo4xxohmc51dzev8t05ug00d8emlrk6bfsu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: 'jzvnbz3ofkt2bpmipq76hw7s52vseaerlmg3t86bjqradcxhic',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: 'ddi2kt2ddxx41d3dhrjg',
                channelHash: 'beas1bk1rfi4jedkpqq7rc54wfgj89w1nlo2l1ao',
                channelParty: 'jrdx9sigaf09janbg2nu2wafn52t4hg0xmstan601yaolfhrvzowhqgicy4pekeq8v6v3dkm55izxwois4q996fu0jo1r4332852yf4g0f049dvwfbptj5bx5win74ofj2vwe1rs5027sa609hdcxmne2kgt9dry',
                channelComponent: 'jjzu9nzctij2xdznxylcqnjw75l40cnfhg4fo7b65p4elxxnde7ypt0oxttfn87hmht6qhpd44vq730ut7faz2pf88j3lr1esvkgsme1o8ff391093bjsodwe39c2839y19bru2fm8dvpztukyg2p2samjxpjgpn',
                channelName: 'vhhfy1chrsq5b5jkoca6nq64372j7v4f9ycdd86wragbk8itk1vazlb7d5oadn0myjovsvwcau9jw2x5u94s4y6ectluto8yytfxvxddpq23lpiy7suonyhvbagj0ceg0d1lfjp9kmzgdx72zcnsb42hztsexu49',
                flowHash: 'ffryao0xqojulbmj3blkuvjffhkcbd0g9pbl848e',
                flowParty: 'fxzmnp3d8a17kz3lhp2kis4nntbgdtmzk72bb9i1knx4lnhggocl86bhofe97ybcek8wmyc5snngz3frrewqovlwc4bj96t5vv4bzied7c6sppi5a4gcap9qu186itl840bc6onhjl6asee2loizw7jzrt65jq1b',
                flowReceiverParty: 'yj23tyzing1aups2wupl5am443n7gnhb2urd88o8er8iadob9l9ghu7ll5j5s4boyxp34qh2gkkw4x73eip1i77i8w2h9aigedfv45hxfftncbfap3ksnmosbx5je2a02tzncukl6owunhuhmfs9ken36t8aw1hs',
                flowComponent: '8mxxk5ylmdnmkzrjpnxpejyki78ck2iiy66vzgbrasay3eqo1qmv54zmjhsw5gor4om88efm55u9bkgtsu08cb6wyyn2uagtoqpbb4tqhitt90xu6deyh7l22dwaqvuf73rr8st6hicn6al48t414aghwo1vx82h',
                flowReceiverComponent: 'rbz2wcme9rwoechrhmgb78pju0vxge1doxun366te87trjn65hwnqag8oer0qq9g10qa14ug7xuvdf3okr7hbujc5ghqfvpgfebfqz8mn4xuhy29c0zbonc75bxqlvg5fkg5gzah8lbv98xjqipqi5qw6gfomu9tj',
                flowInterfaceName: 'nin1uxoe08r6ckxnwp79d5327djgp5i783kgv6tkhyfbxl4qs923syznfycw3l92rnwjv2d37jiwx9gqai5qqp99373p9gvjl2gtphpxb2b9c7hvi32ildxaahvmc7i9af3isffwaeca8v7gj6msj1861cdwsca7',
                flowInterfaceNamespace: '7rsz87otbol7fmj2krs32td117qw0urpsruc7kwuytlf6sau2915ij94cpyjid5mgkh2xe7wggjxwx1pybldjxc51ai24tnri1a0b4ti16bl5do1mzlnuu4cu7gnhsb5wtmuz7jmynl2w711obiayz4p5ybnp75z',
                version: '73fiorjguo7243cu50l6',
                parameterGroup: 'jvkz1r2byt6shkkahg1xzmm56ij8sdeq5yzgko269wp36ii7ipotahamxiqp9z0xie8i9tpzacsjcc8oajc27sreq7is5jy3o5ya3czzy4oqcnh0dunha2voakva3gtp0a3ocgcublqp5fta1xcvya0ibkfvu80metplosl2dbx23zw2sju85qk8wcb6yzzj1ant6whmfg2bpllcywsku4dn76qqz6l3yekjns89j1srvph3obgnhzd86yq63n4',
                name: 'z2inqka4k9ff094flgaa5m9gididbpromya4u7otxzn9pumq2ru5na6b09oh293biuqb5xjnbdfo7qvmssnkn2trb8mzddp1l4vcnr7tlav6tc6gbui4lkcqa0ibxoufccm47t5e6p7wibqhr49dh2dgw51mmm5oihgh2e2ds4sanfo7umvyitwq3v5isq27eorvx1uga6aarxujcpqv1qwpd06nrwn96l0l6swlta2nmgnh6g6mf8jibuaq72qvt79l5buluhtsq4ncu7kjy6k99h9t6eruksjyx7i9efvhgrcg7bi94o78lgr6xy3d',
                parameterName: 'b4spqerkm4ee0kcm3u4zkq1cvdgononq99f1lwzmq74nvtsdh7liing9sinuiya1ulowlbdvmvmr2soccxcqeglls6gqwwz1xyjcfn8qjopclnutc2yk6bbkx4ex1x0ubwt9ch7n1wwrr3flist452pwax2tlri1e09fi8y77ozdteyrba4l4vafbgez1cp445cz6h2at44khc751sexs1z5u4lpmqh685glui5e7bdia3jrj1zvraosp2ytdrps40sh73p4uvgpp3oram342bvokco7n9xady6rzdum17ia15c9uy7w3ngia8cq2zki',
                parameterValue: 'o4ah0j4w3cu4oc8u4uhsy7wg7ltxhsqipbkf9b8l027k2ugq4l68p7vwmcltkqkwy069cz1pdw0ptl7j2mom9dblwr16jtc4zbi29vaj4h4c2jtq9fpg0t8317tve7qvh39qfo0p1wu37gcvfavpwm3s60v2d62i2fro371wa2qa196ys8z451j74lvr2ue2lhfcq53skccggaw1i5ig25g4b5y4s6i7w1ssqly33cfkgjnf2t8dqh9pwsmww99y8g78vxegvxdvvamb5odaemj659iac3tdrfs38hwk34fnsds31mjrm2yrur4oknuucsgr3a406bgxqunt374foid9pwll3h6scq0rvieqvkiz8lcyltuj2cf67fm3x8pju3ksq8mtw9qsa742u63s41vuuxjz4r9x7pyoro8ud4kt5cg9yn64quj9ibc5rvf31o3x3bx5gjzorgjxlp5cb2w7c28v529pn0wmwpgibhcipwkkinpp1km5v0p7e93sv3r5ju2emkg2i4dkj6vocok597eksq76f50tafgznp6iuq70byzadgzfiv1f575f51vpb59g3or46zzszlqhr4vlgml1ss6qqflcopz1eqric520ekhhxn45n5cunmbq56t8ts26xf8u0bzet8g4scytucdzpgl9eg9s7cisqu6fhg4uaac9ndjixepgf2n366jsklxtr99vneus7c8qj4vukbnjcaiw9y20qh9ohk4gy0qbn84l0eetwm45w2ez5b7v0n22zfkizdj30ocfpt6gmkwm8506qf67hoajzdtq7a54oq4hwmpmift96qth71rlklpgflg6w4oq0yachy5s0zxm25ptqopkukdam7uyob14s731huxh7rjej11v5jtheo90hvgl7nd50r4hhg3lar9a7b2hklcip2vtiy143w4025xc6929joit2qp7tvfw47tbiarask28y5ujlx9zrr2hjrlbve70fcnay8rcdshzdsgi8mb74n16oioy72pwy7p36gtqucjh8gj71tdsi58j3mm4vo5b9wba4o9ivfs23xxh0og4e4j874snmzjg9c6x6j47ck05k5synfiwbzaezkk0w8whx6i0e2jyhdz65p8npa6vjtf2wtvxtvw1f763b9xib90bxh6p1ycwep07j41askfdj2it15t6k34u76gr7tnik0rqgfaxrob3yxluwuiszhb9bsz5po1ci4hynggseegyiqw93u6xmvb5efgmatmn521sucsp7w29kgliee0m517jpw1j6m0z2jsk7vjxwbdcvhzawuhhq0y6w3g24udzjpqbs447vnq947s7fnjixrmsm5xaehvjem2397b9evncazksswi4enqzfvn2v7a4dgo144ze3lwzqmpi78rtco9pfm5e38mupm5dt4z3puzxpfgtk765elthf160z6n27cm921zcau66ygsouv3new65xx89srbn56ji8i2czy83x67n2i1qznrld830smc80zux95x123b96rxl8n8ncj5ja7n6j3cf2fqgqy3aqaoqnpjduf0vdjeuc0lqxk1g5ccvcol2o5hbfdi4nf08igxruihye5yp3nkgy78yp0246xzn3kczq6bijgtisnxoelnlgmzpn1cy1z9482v4cdpxehredm51ddp9vzgqsboy84jflwp359uz1dkttnywej4xtoldwh984fqsvu7pe5r0jxl5n7rsgsfv5f11c4by5yhrmu9crvl7ksmbfvaehomalx402cixu5537vt0uyymbkk2q2cij6nx0ejmr4qlhuqoirlzql51plg7z9t2niro169bhag485ce9sc2j57bz7l1t3dgxy8wji7kktobw0257ryu4kqdzk8x5uxfkb2v7pfln2fvyyk2r36gaf410mcf5uymlgzwqa1xcdndf7tvljnub32n5jk79erep14i3hn7zzzw9n0fulu7s8ekt432m3k29vwut0t0zqzgu0y2e600ifqldtwd7lghsavncny4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: 'whaik696u21i392tgnfro2g15chybhmkk4kthbz3nje84nkxmb',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: 'iq51skh8znfuljy8m2ze',
                channelHash: 'orct9zouatdfz9bz4efj6qe85jb2vij4c4zfrjiz',
                channelParty: 'y72mlqpw56crm2eul42em0uttfkvfkckg83480auusx4lgksw0bg78s6myno1tilzvsaaun4fujyrv759nl8pengisct4nlin8ac9qcn8md2ptqysp07s3b3dkvnchpyfd5pbqzryvozhqvsy1ki4ibi9j20arem',
                channelComponent: 'k60vbxlexmq7cg6gjlohk8f3jc5e71fglsew7gwer8jzv07esbqre8ktpv0th8205rbndlf46lv3zfyzegyp0tn6p6196nj7s5dz5nej8r541nb6rghj67ufvzr1c462fptgykduav5ytxv0s6d5q5fhghy2577a',
                channelName: 's4k3d86e915uretk5pw8hhcd1w3h08khs96dawfllbx3ar9mhd9rabw1yz8njixpwinuppjdkw6ntu0kn4r5tx09mhamxleocgb5d6qyywz7pp3v7r08fjz14w8vqqg1fbnd1akc84vbq5xdsobpd17evp66mb2r',
                flowHash: 'atzj5uhfh8mvwbrj5b7qcvzepcbx66zo52an788x',
                flowParty: 'pmbscr8embh25ftd9qmlnfietatpo9yquqet1rtntduyj2rfxq8at9xrtjvxo7axr8rbv0z5mcfzunrixu7bpvr914byu4lg7ck5nrw0pr4pvtrtcdjybvkzentkz2g521od4aa01fg9q7jd8l86x009fc5s195k',
                flowReceiverParty: 't4t227vu8tdz0gvv3pq1256ekei86rnjgwn1ei521qg36gvrc1jlxd18ym93x7hjirejzu28o00mgwm4sz9yvg60anufzlqljwq4r73zu1mdpb6oy8bdsn2h2hegsowkp2zk1vg4zppldirvk4gp4pte308iegr7',
                flowComponent: '4wbziu09l6zik3pduo3gmveh378zfrvd9ubo06eecz11b7hxxwjh2gu6sj72hjx4nxiiiz1h8w5g4r3xjxpxlo3g8to8nq6u2vtvmr0ym73j3ix4kkqvas10fvejjhjfqvydoreb2h8a3san7er6qexi2ghthcj8',
                flowReceiverComponent: 'cz81lals1avus01t388qlt23ngvu9rnaqmp1v6pradrsent8dwq7ulln3697vcycyy1r1qailzo3n8kroqivx37xgkmkbt0sjibh48fqrk47ayedl4nj2o8a2atwvh6r5wf21vsaugvylxxvqrxmfyisjwn4319k',
                flowInterfaceName: 'wofczjtlhnnp41a6ww6enqb99thbdgdb87adnk1k88u7mgi1c36yd81xgwt0f6ltyud4vupnm4wiqohbd34pfop7761oyapbh7oot9h3h4i35a5rhq7a5k74eico3xpwvwq4z1unshc06a1wsg1y3165r43wu2grv',
                flowInterfaceNamespace: '055z9v5f6il66bbud8kdga4u6dzf6jedqmh16zl8vstb9sh22hsrbafr48wxlk8hzdpnzc9jqkdx93g1m41hocb5ih7f5grgs1bmtck58hi9koviisi09zizjbio1agjjtljxzgby62mc82pij77xpfgl7vd2jui',
                version: 'wx8o8nv48gxdhtszieoc',
                parameterGroup: 'w0bcvf3h90mzqq9t4fj95jqzezb01dl15a9g4dwo9p9a4ftviqmfkenrtchcpiueorvb30oxxz3hwddb7crtdkga3af0l8hdegxksji86wp13cca729dbz8m3zm700prdo3rgeivg76v0ak5t88o291oac4j0puwun0pgteqnrjs2t1d2sugrotb4ovj6e52qtn0ccq5iye9qpmc0q5csgfjs8wi6ywb133lck2jwbpg5urja6x1d41ahidnybo',
                name: '1f19ws7chexxjop72dui51bqr3b0vwkvt4nnmv1r0da3ex13mq2lnynonysuae1wnsw8ipz693fjejhkeuov5qgm2yjcuuc719cc5epmhe7hctg2fcgg74rlmv8prsmlwrx1u40ly28x8gzb314wweh8ippoumoqmeblu8oumdgxt39jykh6x0vbl1ajb02dd8cbitce4pq4k6j73bypkrdm328nq6mvg7ovqfkdig7xww16mc3hrc9tabtatez9gdo4l10f0v36ljszotbiz05fraodnpwwtbaeodwus9kb6ssj5242m8x2f1cz5zgi',
                parameterName: 'pt5q0p3ons9ippx6a8kknf4c8k6bp0mivpcmukak68kh4f7liscjmaopk6lj33sqy94uz6olwqklgm6efjpc77gmsuwdbwl18rp6m6van8fi9ynq1c5kf5xt0agbu3jgmkj3wge1teenpy4jcdst7fkffi84q515sxvez4c84wyw1jw4vjx8o2ywue5knlmpubhb14mj1gx3gledetsi4sbmdx81jhvbebad32413p0zi2khs3hnxa37ms9hv2q7ln10sy1akadhcbzu4d2zyypg8tqxy79okk5eta9k5jl8lqst8xnxvfbmj3hhmvs7',
                parameterValue: 'jibg2yive0o2h6yygb1vqgc93kae5bk1k1tgsy1ygftfvzookcn2qodp3uym5ejwxmbazhh8nssa8uejkyxn2lt7z95ptpgxzuhf29ieja5wkso0uhr3q8ena82a4dz2wsp80aco96fvqtz1wi6s2sx06ef0g70l6973b6mht93jdjemcmruh3xnhqsjec7l43s6ggbecosfelbxm1vxlfewu4frgxdk56ohpusbezj4ci54k4oxy6c8v1om3gj2sy6vvli2nc5f9xkewipj7otbwofu0y9j9bmon4hbqabjmpfgidrwee4s2huczg5hqkf84b32asb3bzwzcfbjjm3gbn3y8rpjaoirqvvrzkgyll38uq0g9bqhra2j7krexpjrjhk1zty7ov9ttohxgdaxi15mih4wkzwspd3om8vg0p1onmlh5i27uont175pfmk7bw12xlpq1jabagrguxauchxnye82wwarg5ncbe6lp1aonx4zzkgrii1g7wgsiixqm1664rua9ngj3koqh3s83anqer462n1tznpv2fhoi5rpnulrztxg2eq1cejxotv2nmf4ka6ajf4fpi07pa1e72cdl6uvc3cadp796pvvz5rlc65udtbm7529ebj9vpnzlsrow55s5pamhmn95gdjy5vpnsa1dvq6dunkn3qzhf9u8a4q7cypni4yj4scqj7sk6pyx2gguyhzve5foineassjw37bvr3cp6t7gey7nvhmvvqecmwvczpebo89zsc3pa4ni41b0jetm8df2d5pqdvtypgvecwtc63q9eci4jplwctjcyr0t81z6d33icfxubqobq8igrc741ngdolxq8gbwxc3wjesidw9lgfkk4pwws1ssuvtd3ek2owm0sg9yyqlocj4e8xjqigwwulmwevlzqe4o66d3cgmsdw8wnm4ayvcba3x71omuwoinrf2e9h18ztbknfkmakfm3pr3eo3adatqpaafk1kl6sayrgfpc3fhu9ebdd2gm7nt8s30m12ehtr65kc1uf1slnzv1av0p0ffh7i7p8az5c5n7panxta6yumc9s2r006r8dbhf9t70skanepe4zzzkaprv0yob8kqp7c1mrl27ofv371oigk2g3htrbc32l4tr4j5s6jy01ih9f4mhrcp49shti4sfr58jn4hb2dezua49osrsc2dp7y5p4c926ltkpidqwuoj32mp7cr3q3n977xcdpxpxvcgipvmoq45mnkl6yuj2fz8mvi2erjlg4mru6nyc7ksce6iq5dr9r97mj9e7ee9vk0w6qu2rvb95k6kmuc8klef9kt3wvykenx40dj4f371g1ph9qczm63qojr30l955bzak6s9xgtpbmq1ao80ybxxws5uo5qmrtrknryvvjbh1j92zc1j2qn9qxa9kr840iemwmjpwp1kmct2arsx5k8zhljp5chcj1zc26e4dnktmj4tr0vmaha79rdwbp9wi9nbck6ahplcemgna8c9cp8qkdmsw0g4qc8jaoec84us1xbh6c9tvogep67ouqfhcw5vfnyfv6cfs8ax61u5log3v51502hyeinbuueju14ou154ysh9depag0kjvtyudneqmwue6ncbvsfwrh1oynomfmtc88yatbcun9tlmg5o2tlbjmkp6koagnlte117lef2i0th2kvkgpyk1ty3j89k8orjof8oggqthwrl4dhy42hpix6sk918lx2mem71gbxw29mx4mn358117rvxa96hru4edhoa49fwf0iu2n0vjjejovhum4b4gtye0otxa1jsyo67tvehjrw8uisvvhzu4sdsdq0lpk8izyppwfry3904obl7sl5ja82flsp9bmcroopwvrnczluamnses2qncx752jjn0774u2obwbpedlaip5wdm665ykrv2e7qflh1f5seskqjfjaulsxcon05haqvivift1ryrc5hbl7nd26dtwsi4fndj0o8w9gyko08apkwxwhld20desxjde5dgiq9zcehdl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: 'l8u8f7rj4fkyx84rzm4xlz09uq2dmw5oelf92w6h3d70iuao3k',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: '0bb7clzm00n2p85e8yi5',
                channelHash: '0vwe6j3u44kpzfngbqz9hhpal3g3wvu2yrpqf1pj',
                channelParty: 'aujgoxvmsz0075pqjspa7k1klaiz5lgwt7zgma4zi7uxm26abjrsgimtzpn9ve8r1l6jhlsjh06cdh8r0x84a71eirle6jlqs56x4y8mnaaa41c8kvzbt7j5vq3s8zhpremh8zc7hdf1qiym1edhmnlb7w9q6hag',
                channelComponent: 'nmudcnyp0he3mofrknlon5ifopf3y2zcxpbcz1s2j11ww90s4jxfod7ddvn1gkz6afvos7820uale3mhdfa39xq707qv6qbfijiumcinajupmx60ljoc6swj32hmgr1y5ubfe4gmakygmcsb99cw8cf2wz5tohlp',
                channelName: '2ykdccbzi1v1ji7n57av0qybc2iahk3yhurf5sm37goazk03c0bhxp23iaw0uu93lrbk0tnvdftz8mze8llcakpwey5ulazgo19k6oxg6wujotvjz4664aw8arggmupuxsz9m4fxutpsh7fvktw5g10zigctcgm1',
                flowHash: 'okacoai97d5f9rwty9ohm68ru4r3h5zccg9rh296',
                flowParty: 'fyui9851fuk7s5zhww9wnwd7ekgy2gy8nsvizf5mw3ltnzntx5ygkbws543r0g21fgfmmdpjn8jaei5ittamcg9efq4ir4touvhjb0m9fe50b6royiyfm0qtb31c7ltk7x5p8sf4ap925gn242brdo3coeqfpoi6',
                flowReceiverParty: 'v39osnmwyj54nvcwk99sgvassumo7qpuadk98rw8cjv3tzpz0iizjemod0uyrhngkzghc66ewl2fkpxrh2ovmh2ssamsj6ghaadei7203zwavj0bx51ue9vun3obvrxdhlf8n9rzibxy12dcu5hzgiexf8ih2qzn',
                flowComponent: 'ox7o3ueblvu6e7cgbborz68bvvujst5sjwqqdcic4fpi3buktpwdphumvfmlbakmq5ejo6hoqlpyjxogp1hv59inc17blalnzc2a53mquht8pvu03ezcxhzeg2jw1plnrqq34w5hkquyw0gjk8f5adhsl4wrppz0',
                flowReceiverComponent: '185vufy259hse3njp7ubmpakuwkfjqkjdbe5x7avz0didpxodkgs69xwcxyoj6u7b48my4goaw4ddos9uou6aaqn7z3tt49sk2rre5ytlmminvrjhhixtoe25rli6h07d76adof5mebbrmlzv2o8s6a7l66vl92m',
                flowInterfaceName: 'xte97ar9z7cy1upd4kxj95lutr4cr744mcy421ifh4yhlc52ucz4tzd75mkxkehujuca83ot40ae4h92of2l58pegynskg6g4ozrreg9w8fevtcp6jwswcopn3pb58g1wngnwib91r2y4cro711r1n2hhd818ra7',
                flowInterfaceNamespace: 'w2xuuw6x56rkuyiknef9ziyou27lrbsggw3fdpcxbbg8xedvblc1hslmh7gholqbxtxdm7m8thqtbuwpuirqne4d65qi4i7rz4tvg98trfl1j2w1asybqslk298dag2j8u0rhbw1smmq24p70j49jr54g596aixx1',
                version: 'xzlu3rxbe89mnrw7hjfg',
                parameterGroup: 'wxh4o1geg7mcw0lsjw1114nndm0vm27ko80ftoqqgo2ql5dnpfgv6smvsx7vbvzweq481iyuo7desl65alvlqyfwunam9px6a9s66hu2gwzxpus8ge1tbom6ukqvr2w4oj9f60fnw3u1qvqdexhwuwgpemop7vsb0rkwfvhs7gamd64rqmlnxig18m8ypy1y9vm37ydhtihbtjl7h95lkh3uu28t4djnnyqu6rmsfjt3c7isc2gyjn6jgjmeoz1',
                name: 'sxe5s3jbknrbhmr8hvk4i1v5awafqz7g0klzprgqqao9633auej7zr15h2smcd1bi8kjdet3a7sdhaq68l7z5o6l0xs6cqc3qoztyt5d29vg5crh4vtb7xqfo7fsit2a8ropp47m2g2paoluwqexf7pz4zrnb2k8q55liciu5s06gb8zjfdxsqhtemwxx48bya6pc81hn8lwivrsv8cqfn1qaav7f40n6li0ftluq0yo3fq5lh5s5w1zydp16rqlk3s3hrwxpiodzx784h70ue83lvrg9shuwdd3dbiy926ucdlc6hl720z3bnyou171',
                parameterName: '14t095j34n53rbo00b4loht3jw03f7fm8wt5eqeru1o1lqr5kgj5hnysdbecn8j7grvvo3cy5wucawp7ioit61ltf79qqerbeigei801vip6ib5bggnvmw2goay6vgbsvc2hg8n64fp2a4z2qd6ygpyrsslby69yx0bz8z4prsni3kedpvhjl1palv09xkfqym0dzby6iyou7iwsugl2hddhhxczs9yhmrd4gbx477bdi50qfuyiwr82q1rh6kpil307u6t83q35fke2rqv3rp6x3ree1g9n3qvklqwn7cjjf5s1j2xafj5lrqase9sw',
                parameterValue: 'vrgev82d5q8691zjmzp4erfzu3ts41ikf0ddvbkznljc373lznvwcp63w052iresujxrjekkzwt9usj5mhekgdc8hejkm3090nopqec3xyspvjqbv31m1086i303opofhnqi6n82swardat2dzb94gcukbqouo7ww73h7c5kifxo73kwzwwx99gu645sfbauluaa2wclpw3s7gc6jcoll1wdcss2puectve455vg4yvae6qjr9duasyn5xh4xxany0f3wg5svyhjt6zkhbl9fee0bp1iznzbsmawleiyapajhdzgjfs1747l8vgn6rj52ofxfsl6bll8adl6ed56mjl81cdto9k0uqjb6ot8gafnhtn4kw5fe1w3ddsf34r4hecp0uftl6ec1i862gdr7ej0dos2kh0vk7f3u3uoiahmfcc8urxvggf58sss87i8tvknshu0wqhxqty4fqm6tnfyre7by6ngms6hwxbczaguprbl0n7qex4b2huuekxb557k10gml7f5u0bw5fsovacs71o4htnr568ph0r9xphrliz9ehghtojdghn1bsgol91qh46rw410otd1rrbi1zd41w0e1hwx4kgmuov1yaj4majg0btf7xn16a7gw946ddytmm6ow16u3yw1le8kzgq5zlpe5hoaxizaquw4m513ipcfjl0v8mbedz6zcdodg8kj232plwm6f0ulruau4g5yi00n35shp01vmrnvf6qyc42gy6biolbwyj444ee5v1099niio5uuqo5b2kr39dkz2lctvj6jn2b3wimfhueaz1ffhsfqtv4zpz01c9f7tn9d5o9c7x4qswg3ls34h5f0m8ay2z8mrtkcgu82d8iby09fxr3oxxebnatijc9hyo4c5ix7286mu402255trgjxw4dl7e2q3irbr3z8i90rfptuicidq11tsvo7fr58a0rt5wkrf4br04orf92fxkly4ov65sy2qo4kc18dj91m3et93hipykww3t7ngr9awfkfz8pgwkoqmsg4sfkenqh8ll9e0vmpk7085ulempql2yk9g2e3d0mqtntknoshsj12y0r3aypktbrkvqg5bpl2w9229ggv2o92qdfeb5zbpszvyik47fxiagfade7jrfqvwepxj0et4w4n6thgt7srr43i2mn3lvfoclmedg1xi40x2z84m2awlenoybguybmgk553snu2go0yqadfmj2nhccf0hn1iygiuuff8xu14l4dbi4hoh32x4dpp3m3iyimhqv0dsc33esn6ektfji1cesjbjd211pstbxdusqydc5jojb85wj443z77xgv84eff99gxz2okrtgbdttq3zmim2dwkt5doib8xmyynglx8zzsxmk6gbi3kv1f5u1ftftmo6gdogaxgwkz0tob6fkaj9cj9w13njo331l6t41d51hdoghwvmwcmn7oyxqzzy9lg1gltinqskyyps800sa6sxak64rswfdpw36lkglxu4duzbnt2mf1n07ks3hlfiyr5ud3sv7q1gq5d9dmuqrhpjxl3so2o4qw59i9w9vk7zh6r7qrjplpbcuzsqux3xikre3yqkhhc94ya4l0jmrzs471nf9eiqgcp11jokaesauryfpvn21ptvqeqiy1d0rj8jwufd68pdzqhawdseg5qw6lknhg6f9b0igp6wnyo0mu17gv6h5qjrtovaseji348i7tfjs1aljvv8591c6q3o2my95tsd4a74tju1glunzmrdj0varixb5s4q0xtch3xwu32a8kza0cwi30ze04d3vtfra856tjmpyssf5ednshyh8wl161q4t8z1wvtf8at4xvgl0xxvya1o3htjkglfa8p9cyjsbshpvv8dws498tnylugnuc0uls0pz7p3lfr4tcys3xr9yoq825xlr0wy9v8wjpwchecpm4f16317wa752ulod8at7z4q8o5z9rjzwz66co7up5gl9yqra9g4cbz09rgensf6kwbbvosoley12nfmu39c0j8o5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: '3m81bsg8eyldflr9m4frwbj5v7ww4ilmdbolp16lqmnij2v8n8',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: '1r5waicv88okzf2mtf1e',
                channelHash: 'mihge2gxa1b3f7v8ubjf7mms2dqputll2prg0qbt',
                channelParty: 'p8rn31k1n031ef8f2c6nxhqgu9boadpo4auv05216tilb2znzrafda6uxqdwg06nblpvmah3i3ik44lo7gf84b5c2qycegqt0yl48zqbv4yaauaa411yw14nw0s0sz1zbdhemiui0pmg97awhp93vh2ntk3c1lnp',
                channelComponent: '2uvyapu073vtkjhcyiemalrxsh8vxmg8e85y4qymbwq6hrv3m5ui4c3gwpwvq54copcy3kcuo9tdll23stnkxektnmg039xflrv7hhvztnsxlyyttmcwxh8vnu4lk6jzisd64ui2kujbf87xca6dkpyz93drz09n',
                channelName: '5vmeb32p7uqmh9gvlh1o4xwsx2mi9fp17pxymlu1h2gsrje6cg6326rzapev72dsqlbcqxxu9yj4xy1keb5d0xstrsxo80cng2jubjkgl85wlce8r4z188bj6rvbx0c2xzst33dmqzovf98p9do3wzmymzmy7h6c',
                flowHash: 'gwxq0g1j6hnjiu0itt4elxnqrcsmxckx221r6tjm',
                flowParty: 'y783jebvcr2a3mqow8cwpxtnyppt9updwp98iujt8p6ml8fjxwsuwzh5i52fil2r9761n7aq5qix5p2wvyvmfa1flczoi8rxpnqja60pv18nt0xsn3e9jgy5tju5qj4zzohmrmj4c432z68gria7l5875okghdm1',
                flowReceiverParty: 'zgv5twhvhot5hoj31xxlsdb7bs3xe8ctyn6ff90f26bq3i8ry1dy6b0ktg2qn337lu2u3vfv94uesi3fub455ofc3t9h9m3fap7rqsf42t9slduehf9jsqx3sk2wl9lke9ikkbw2jsscgr1k2l5av59cyhz776wd',
                flowComponent: 'crq0jh4nqeis3v8zjugdphrgumw5wyaf7zwjw1gc4vty0tw9lph2wrjyrfipvahovo4fagarfrlsfn9hrx1fgxv74zj2cnrrjwzog3iw8iw568qtsgofa06tatxi39otgjnn7ki2fzcxu3bnbnj9nzmi6kvugrtj',
                flowReceiverComponent: 'bs970tj1jpilmtnzla01i5hinojgeropigkac4126fo9xt1jwpdusvy2nt3pccmbek2pws0rse5r7xihgummtxlpm181c63m0o2inxh5uh5a0q793yqmb3b77qmexhwdo0haq4bje9ube68b1n1bxk7y1cc87ot1',
                flowInterfaceName: '88294am508cfv2g0h4mamgqvfudfxba73onu6inzc8el9p729m52m0zgwp4v9yo5bp0tlddbl12wwnz3oug7vh32lwzhuu2qn8wqeqyuknyhd5x5gk524ol2jdkzthjjjx5ej5l99w30l01onn0ga9gqumjy6kmy',
                flowInterfaceNamespace: 'yd8al5f9e6s4dh4x7lp9rbs223p6uhgqb8q9vjqy7wol20kyvh41ndttw97xjtk7asr73yoeyldypfbw8gbniyqbvhszedcn3hni7ovwfk44r635m0z3mj8t9rp3nw64flvwb0drs3gkqvojtz7may2eclpreme5',
                version: 'zaxgzrr51uro468h0wgho',
                parameterGroup: '5abbjojp9kgq9v4n0rd7d48f4vh7j3308tr3l99h970n4ow9oudst00unxda8fzl5677uwj5xt4lzwme5f1b2kjzf6uz7b4aumgb3oil9nflrd0n6kxnux7nmn0y3t9hm2kumdhub1xji46lrn7ysxkhfige00s7tfd5erf49pgsy1k0vfnapyq3pdcwq02yy5611n03gh0naf9zc9j0c09r8le3489e4hwe77p14h35bx85foo3lxkvhng33pf',
                name: '20m0bt89o4h7wjw54761m4hxd3d5ref6os8ae7b8uzf5mtrvugbme6sb38mm1z0amo0ridujsi5wvi6blao79gh0axeniv3xw4gk65lvjcgkmjbn3gt0guh60v9dvo6vk80dft64q4he9s1hdm8ym0yzvnkbqa8lududce6dqjvtlxd73qhra6gm9gqbl2ee64wu7oo56i80ctt0lklc1b312kbk8hdx1apjbgddqakklswvuwovmk5fmenibe5opw8ak1uv1mt0asvmormbl6hfdezwvjufot8y7dsb2py5kjnrjbatusaaifxnrrfo',
                parameterName: '9b2xmx8doi8zrdbqmms9rj4bwila5iwxa18gvkt869y5drfu1yuallghypl4u6zrn7rj1ewiwfzum65rlhzsgcrh297wprw1c67j7nma5wmupap4re3pvgx41d4zwsa8ditamvr28ofkvdxnriaup5pktlqki58pxtsy0q7o6rpuc32r4tq7v62udap7r18d6ttiuvbgq32juu452liay13zpgcdmac2nqb67yo0j54td75vz7l59ifanlk1hynx16p6o02lair7cxfhe2qhyirt0d0v81jn4iug0mb2vk4myryjj7oub57s0lh3sdlj',
                parameterValue: 'qlh631ahxi3dsppgqvq5wkrdq73cpjl26ftyu5q3n5fw219gfxmgt6522j7gjqpcwhw3b24tufj0jmkw23hd2odw8da5fwbwz39oyigkp6lzlw7lun34qr47yuk84yun9w7sbb9j6q9zusfxrbotjbporopbs5goo0hk8pvabbl8ae36lcxtvuhbqgict07344klyyyp9gyihb8qmbeb1g1feqf29w3mzfkfbcqt8t1fa1cuwxu2kn61jnoboeaobotabj6wbouajhiecl5y7luaz65bwsj1cwmyn5qvbcducnrn5l72dtr4sruf3wx1k5dci7daxk49lliethfu9e1d0orcnm7v88toiullm8s2yjrvfftuaqro69y8d98tks0mpra6232dgckcr9mdexsc4dsiaq4zw6w6dyug8vk4qevwnpzc31z129wp7u5q7o69twbaa3zyfz9ba1t3e4kjjb8y9tokrttegpk5h6ut5yq888ot9se7udqreo92glnb92vjwyshwiqsvuujrext8uahm274nyb7dlghxvdqaued7ljdbf618gt4dgw1e02zrs0pljlwew2qmln0c9ivigcdcoa0hodbq5vqjh1tt50sbc8ctcfzys3eytmbvhdu0w7u4ox9ti38htujh76784u7irzh91h5pcmy69a4tnherqgansdauox8ftm25nubv9pubxndol8ub2k0mb3namxib6rxqx3y2y87mthrzbyiq4ngs0utlc3qj34qg6i1mlqtu5p2wft8v3kls26bhz36f06oib2se6ppmw652ms60z8pg64zdqv0fr1z3kdcn148xr7t86l5518d3n350k2f4re0znl17if9qnvbcftikgyzyu9erkw1275jx9f10z66nfc99o309jk7ed3junq1or37kyqkvamnmro3nitqdx6kob340ox1vcko4zrduv6pzw141jq9s4tt5rclx4txbkin3heus7no4ecw987euiyv60bb8axd3g4xfqq0he8h5l4roo1gglc0gr3u7ds1of14133b83754scx6tv4aim8rnxi0o1h0ogxbun5ny84p4idw8bsmzty60wn764egsuz87e2xdrhp1cnk5buibg2u8qpujj3lz7yzc9co7l9rtdtx6nz69g01lk8dtb0povmlf5x62m17ivj4rhuw9gua9xfd99ccz96veqgvtiplq4suqh8zkp4utfb1xfgn4cq29pn3wm36ns3wzalv9lqiyset6ernoq1dehh47p39f4ecf60m9ihiuo75clw1871b0ytlydorsg9kwjvifo2r3t8m9bghkxly1m8ea2cl1o543vljwapd7f6v98vev4b533l3nyuz7nsrfpsch32lvnq9tolv0r7fz46baaspuabh8pnemwpq232q29rceeg42b67j9wtelmuc6us5tm1z2yor1xxt54a38xhevvnffh4btbrp7oncth8hosr2gkmbl6gab432b2hosflv4g4t2dzxxxq3q6glkgk9h0j8i7okqg1rst0s4ea4xgmrq7n695aog1djndxnqsfugl5o8uoc29eadnrnj2buc55p97hlgnj61usdk0h4j3tewm3d95310x8hw4n9oki4uiiv7prhmbexkty8nytoywz1atvxnghrboyvxkstyq29gq07l13tlg3xkepbe2svch8gwvdhfhh07ubotfkxi9aybtflm7s4ge1al1alb1pyml38fllcl3h68bsiqxh5r5pckvbu31in1npnmx9jc815n9x9ofheskezl8xpjne9isgj1cdi0dibu5bizulyv2paa2uzxdyn19ykr1xgia99qlgjhy63euy2aeswfqn8bz55qljcf6m2wtl43kws4z7b55nhdhv0mm4drncwr8we03kou318jwg4ju16jpbinud96g8ap0ggrdzz4gt4vfgteglvtu5r0e8swjuhpmzftxz0kra5hhc3yqzludmsb1nhlu6hsj613ewbplljlhhtfhglz16qq2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleParameterGroup is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: 'vjydqg79xzzgayjotxvsedwb2gnu9faapam5wrupf4xwtbv2qo',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: 'e9qrb22ksrtn9547gc98',
                channelHash: '22nxcjc15s5ivtft14he9gksmuqj7e5cgbkxyo59',
                channelParty: 'i75r56hydkbgnyg5vfs2zcuepjio04t89rqylqt1inh0ommfoih0rrb23gif6z47t4zgr6v2ygvbf8w4m7bia60cyeoz3cylipbd9vjewvemsai3j3t7fe7dslspl811cjkwxgeiup4saavuewu1jhzk7w5bhkqs',
                channelComponent: 'iojvw9mj5uqxnyt0ssx5eyhoel9yg2j0qn9xzy4fb6r4p26hq9src630pyvjifuky5nbyr2t6c30qrsc4smn2ifs54cc508yfjbn6yoygg1bs0uj4vqe7pi9l2ked7oczs5ridet4w2f9sy6467tsnmcko4r2a24',
                channelName: '7bfmwpj4uma749adngkxuloci0vnvh1dxnr4elfxe83wckasv9walmf720jyv02dhb0i8uqnqwmsblsenzmfqxq7vznfeaasaf7mw6g2viar2xya3gs0oudoxbs0lsxjkmheh0so0a7dswh06s8sxyqfa0n5rfcq',
                flowHash: 'jy0mqwa6wzjuy064dfkblky3f4fd550cv04mfdkp',
                flowParty: '7yjapgnyujh2cmok36libcqurfcnlyc00t88231lgtvxtxcs47enfubmjkbgo0gyfc1soxojqalwzvufmclz3fh9vk38j1xeldr0mcpieajxnxys54vonsuxzeo8zcd23d1xx0ss40813ubbv2w3uiuyjevu8z3u',
                flowReceiverParty: 'f5asx79lzvgg35a0560uyvro4w0yh0wbosfhxhs9sc98rpte47aec84x0w1n16256g8yu3y7b55pf2x5ocpg3rj92nwdaufppws80mq97mr3qyik42on3p1v2ztmur06f6hzt7g6wrkojnyvs2ze0w1d7hbot8w6',
                flowComponent: 'm8poru1erk5rvlxt3o56qyjs3yh9se2puz8a1yr3ffhfwnyt0fuuuw9lws5aff7o14202gii7f4yyhj2a7t3j624z9kxto6030ggupey1c7xj4ywsqwcwri7e40mw9nn8qn5xdzj585dwnzuw5ivat8an09ddext',
                flowReceiverComponent: '3rh7gjo11lcyqmwsccp838nu8al7mpxx2oy5ahs43i3zljg060vjaogc2yp2ru9ebajjm89ipflyqsqx3gpcpnp7odehylybkhkcqd8geuevsirlthlx5dvofzud5bjnzuglwyqddgk8nueolepastql5qme6980',
                flowInterfaceName: 'zd5tsser8464urbwvimcvk0pa6pxj61av2oay914p2kfl3uddbeb8z0k8lrfiozxiqlwmqyxqrbvy1r53lkb5psda8jgs7zdw7dmv1djgrwitcwwfkv4j3ic66utvtv35nc6flo4mpjuftogg2dhove9gd5mz46t',
                flowInterfaceNamespace: 'x2qp2s0gqnxryy957ghu9yhgnk5qm0738b0basmgzdjvfcs6yd0mrqfj44db7z8jw3czr23g5y4ls3wrlv7cshbye3k6vrb6tnizho88jt7kkjopeli3rfiifxhsobm755ooa0mmh9uejcdgw3rmiobgse3jcz4j',
                version: 'x28qv8mksqyui2ktm4iq',
                parameterGroup: 'wjutywq1y52vieqfo6zhk9cvtwhxtq5km20s6t2k18h93ryu1kcsh4grmatv5e3g0vckp239zxacran96cmm27z7t97rnczqcbv237k27xzurtylvomr8z3bzr24ryn7oufv7q2nabt5cye2zjwah6etgpsfc8y9i1olpnmnzuh3nny14p9eoubjkzfn4iuhvt62fak576afuexwzk04fv3h3w8hu48qzan8ixnikh2m89290c4iw6f7kddzvg6b',
                name: 'yn7f0clki6cueb2n1dfw2s6a4c91ni1zopexcjac6ouum1b9b5pjtwapdk12bn0bkh60ghrlaosjqvebm79zqoppkv4qtqx3fa35wl5j8k9kfhe046tklpsaob80g6183kfbeao0ev0hiaary9i7ymh4hnvvptyhtd01svu5hcor125g0lncctjc1ag4bl6jzhxljxufvb5yofucejn8oe2083uqaxyosynubuadhu38eehura271edw9ttpdmknhmod8biu6lspf26rdw2dwdzqsp1ejkso1tmubrkksxtzxq84tl9i28gakbnctl8v',
                parameterName: 'v9deib39y61znz0mrj9muh253cefkm78tpdew2fzpysarqevw9nw6rxipn9mezb19mrcyvxyslnrdyqa2coalhd44b2ibxizzje85sk33is3tsakpj0u3fcx7q42qa2ai6v4xo67q3gpq3nxdh6vgozfklrf8lbeqhhpyf7ruksyp681e1t0hd8a65915ipemc7cxcot7fqzcbu9mvlp36fnxjtwu7ujr7hns138ehhvfruzcktymknj0dntyg6j7bwyv68l1z0ieql04cgadp4z124xh284kun6cu0li4v16a0kikcutlxl36ojk38t',
                parameterValue: '70didbkt4pxaf45dyn94s22lnp27rndwfvr9f82nsekn6b6ssr3y1mius008g7m7bznana6dj3n1gpva0144whas2pr4b7fk5y9ksd13k5ig7zdsikp7qdu4twysdw1fil6ok2szxmsd1hbqucjkavb1hgjfurjws3tk3hovfsj1wu8dgn8ham3hxdxzidbv0ub25lq1zdj93n8wtp6g08ablrn7n88mdxrhdwstyh0g4hvhbmuge1ktumgf9m88libkj77e4rzl6zkc5tgfwt1207v4mdswd2y3vi8tq57jhbk5lls6l9v2z28r833vhpaq9blmby7c4rmwkibpuooxouasoumgmlhb5hnysw7yp3djtj6t95zx4315p3lfjxzt55m3hhsea6s5fnu27g5n51ursnck6l2ckbfdzqfmxlrvpkvhnx6auhn951wxbdcdo09sifk7znc4sxcxwcb2kerrmh8pyboijnnlnrq51ud0zk0tuboub84w5ijv5xktzuka9k5qkt7q6r0hgquay6lom5higeuyggybqmhyte9j0pb3w68vyxnacu5bmqsbh3oiaw075slvgmql32q38dunhoa2ql2p4yw0qvfhjcsesx81kjv2k6v8nuhs5sldn8c2qa6buuj0b0dijr53oidk3028qj12i94v7cwq3oq0lkgz6sc87qxbfadfhnv9vn4a2vbps9ioohzmqvwn1bkz2u3oc6cr7i776nsnfwvf4a1ndcb20vxw3l23mu0g4u0jyyus64a0c4sfqpfg3i9gc49kks48eavupa9ksctegb7v3ax9wl6avlwx2lz5xnwiwt44o4bjlqukujlbtr677m4p61tvh7hufxui7clmauwoevltjir7y2zf2s987dk380uqgv0g2vgs783vgwvuipuzhupzlokxm8320xnpnt8kgbhj1kn1tlc2a2wnfjn60lwr8ebin03689x257z8tceekicg044zlxeno2pis79t0cw61k44x14u8upp0r2r2zf7osei03fpcqrxwmj7zbkobgg7g04rddtklwg70lqw7v4tonbbyylpkmnfra7k05vbcz90t2i40l0njuf4f3fon6baa60207g8nz3jm7g9bbfe3vu0dln8xcdbkgkiyqitlg1ho8cjbffgxzs30bbotbjz7rvbm81ipnvbemvmeaccdfqubzx8ojmhykes3wtrj7r4havjxmahtc39co5bnakrw0asfhqnnhuhe6uy2rk9kjrmkpf4nuroehmedkervul3sjgoqwergpccr9ebj566vkpck495juev0mz3axrjvvf8mtfmfx0rt8d2priwi26bjrsw02vwsb5r3vqreyuer83fn2d1aqhobso3p2gilj10k8aa9wepqn6ppl715bsft91z9rbxyt36dlme46trk6pwgpb47df0ad7u939vkkomar1vfq2ayek6t2qo6nrf9w8qbe6zjh6pzj67lkkpn45i63g2mddoqekzzm6t2oz6vs3x6bbn4op3ej7u93ehm4qkqd15rdembcdcbxsuskh8oyxjmg6zyo80f82errxx6n9iika3bj9qwm1cfru7h8qx1de7xjnyu5zzw089y1qqhlis0o9dsv0mz1uj936z5wu4lho1nqfg96et4aw3v1je4i3g96qpytvr4nmth9qvr4blpmgcolwf6zy9lltzy0a442nay10ob2afiz5vdzkd3gk6umb1jlfpc3xhe8o5asdjwrywxgfnl2rzd4eyzs4y7ajl5sh9mr8qgzoowl1ekpw0cg7uxesdob64nuizqshvc5x475fqepjl4d1vjhbpudxmquruvizce1ih46owg6st3cw40uyt5jw72foaxy6fjxnt2kwpb6b3jh71zg6mjf93r7qg16j62a5sswn81ae03uw0tixeo1tko1y8zx8v9ms7xmn3y8wkwrf70wbdjd82t5z3gxb2zdx3b5nb3xu109dzbuy92cn2ubshvzb99ey9ufd9wupzwxp0b7a2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterGroup is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: 'bl8r6qmwgbkmc82rouun55m6ayj881253xiijzqgolafvh0z4i',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: 'plfvd6g9i1p2u18racku',
                channelHash: 'p348rj0y6vh1omupll7b5x6ar3x9uih0ybjij95t',
                channelParty: 'zfhge62j5igzduuxvcdfjqbfmc8zigrst2i9e1o3o8gka3wo53zoluc1w69ydmosuniutc1mejh0xgk88r7j8bse1lu495ndcm00q2gng8c88spcyaph7krp5hty2rbjza7432szb98phffutzbmetgv1kw1prxq',
                channelComponent: '1n0h4nj17p3ps70l6fh40ruev3dovk81r9cw1souomi4aps4al2qe76dll49hur3bhheqnyy0nczt7jarexyegivtkexqkj37d7czcq4bogevylglgxofyioeewfmro8bdodby95bgy0nx9soa7u2j15ydayzxw5',
                channelName: 'gc1ndvgqytnkfbsc3xmamxmidclb5zzccsam2fcceuf7xxokoh1pgkysee9apjzjzb8i7xi071vqkgysfv7n3ardpj6gathp1b5p64c2qg5jdc8fpcxo8rp51iqch6zwhdtcvsem2sntcc6vxgn1jd66v1nvdwlg',
                flowHash: '2usm1jyw9gi6uhqakkhcgh5oam32bwtqlbpfr5k9',
                flowParty: 'jvl0fvp5ctjmhml0d2q0jtec0j5v3u4p8g0lbj0upsjeeazy2amcx4qu789zpgfpfbr9t5i7ptz949i550cxrg2iyshdl7a505rgprhv1qxo3ayql07g2s3e141c758e2ncxj8a4f31r1mlolqkq87y0n8zvfnj1',
                flowReceiverParty: 'a9wf49kvkkgm7s00942724yayo7tl3h6lfmkpfdcpbnabjxhcwlb7ycp49io7f4y91a2d50stwxuyipwp8trzg5yn717ce9co738hcxstc9k8268w6otn8h9il8vpzb3bgc4zgfk7m5a7n3cd94ht7m1pdgivoor',
                flowComponent: 'n7vdtprx7oeaviy8min9p7n8voxrounm53kri8y0v44s1l68u499vp7zfq0wrm0giz53yce4owakl3wis44pl134bd82tdwc3am2qo4qu314o90jo2tdv025b17rsksx4bosz2jh4b63bjd4o83pgfbrmcalx1rx',
                flowReceiverComponent: 'nbd0ug0lm49gxsvgzyuhm9hyu1qcdkrhifsus0dv0wai9jtiic0ug8xlwvk71ldpdnhcpu57w86hroamuets7nlb2mod26xyzoz122cci0yg860xyok05q75r4z95rey583aav7c2sy7qrc5u222rz6h0mdtwkxa',
                flowInterfaceName: '9mptn0tk4wehpj3w5b444xksxha1c6t8jkbl60wn78560bp4bvas96r2hreioadx33sebismlrg8yxr881hhdu6u7ie1c1uxg8pk1h9e8o5uknk5eixf4l540v76ldj7deppnl9x47q4zlufofi88ovp39holf67',
                flowInterfaceNamespace: 'n1p2s141ioybtaldumip1eolcn5s3sk03bhrcslsnh54sppbmuxezn2onnsa3n2ly6ggcwpyalj3fzbh357j0ln557okxf09k1pu70qmfiqcjm9icixfj527popd0okl6mt9t1n0h4f3ntzvg6ky9pwxtwb0g2ld',
                version: 'etthwty95pua7yg6kpv0',
                parameterGroup: '0ffz888w0n1f02et333zp1pql61x84z1auy7i4z29kbxchgf4bs41ey4opp870mtux88ppmz9zl2xxzjx3lab508u5gclprphvdbrdv8gwxx51eljwdw4dhsl0otkyem3njpkydskjujx2pq3gwun6plxeg7cl0il7parzda31zs08g9g35g0at4peq7mw4qawwm5a9isa2whic8d6sakfssra7nbr66wittx7vtv61j5i0bqt95g44nyshkquv',
                name: '46k3vpol440n3iv1a3v57yn0gcvm6zen3i47p114sal8sxp9nhlc0r5xbkkweja1no70cxta08ba37yce3njndjni4m2w6e712wuf0khwe1d94ia56n2x19pqrsxan7uc8jpt629gf0qvoz6611ppf3k836rjbvtchwju9kn1kom83bb5ihm5n9vm9vo92eprdxmhhh32b68ax5lsxchsuqs3261fitwd6bsprjjknmea24fmoc21yfuao13vpzjed3p0cm7mxqmc9xo2v6y0537y99hy4ow2rtue0vbkivdolmdvf6hfnxmflsqmi3w9',
                parameterName: 'qysr06vy9tjgum0paodd5ju61teufj4vko172drpu9bwiw3zzmcj1hn2r68jj1u4f6kj44q7kbn5z0gc80vpq2et2wz8986pp7yrkpglpbnouehmdh3pw2gat1n3j5i0434h19nw8aloc9i6edyiw863lhk21lgiec5tiwpsrczbvsizh82yv4xcae9u3uik35efvy6de2z7ofuflscjh5r6py801m3jolp6eyy5msggi5w0peo6k0e8zk65kuppixbvpnppgvh9phj2qm05ymy4zopr5dah9uswbnkuwi3ydhkyfvu746qmokf3d5z9',
                parameterValue: 'yp1t6z60sklfdg0vxmo7bp7747wzchulggxlixdd5ceodleqiavwt7mjdmpj6ievsof3cf22jfdjkezm8uxj9y6x345ieyqopd0vxwcbwjhod5remlcsw9nkx3kmblwimnoux3igdvv4cziv7tzmkz6686bpufdm4nl20gnhgsgjyoj719d8c10moqp2hpf4yxphbrzwolsu3dfptip1ogi6n8sb1p9ahn6a8l9dru1fcoxbaew91cmj146ai3xaeni3gjklg4bej9cy3pziro2wsf8x0munspgs1ygogtp3rjfgmjqnl335x922n3rlurrxeqsk16xgrfanpv65u1a7gl94tc3v8klaiiti4tdgiu4d4hrcqcc2apbwors1jhrn7tr7chogedyyfoblg8ti7q25r1aj2o1l01mux6ze1t7lofdl2o2bosxcojricjc5d1f9pbkq7o3vjy3xwp666fnrkhwmzjhetdc8p0z6nw9zhzdgxbhd6iyd1tifym3usrfbex6vo1lo0iy66b0x9ziifg2yhbui4533ngeyuhcj5rqspey5dhm9gtkdwqcqswbmlirceujvh18u23xmrx14gc1khaaj84iy5pp61ws0bg11c2oltzuzmcmuws7vz4xwamcw0qig1625b780zroc1j9tw89hfe8oxauu7tw9r2nvnidvik6wjpl66qxy3q8xziytzppysfrs2kpe2zkvgj71lpwrjf7uosjvtnyzo2zsit6e5r31cx47z60rn6qrlu00homgna5vwfkja17xzaacl19z9g3mdlmmt3orlzz4ofvwch735z683mkrzi34xkiw39e3i02115gpv8fsf6mwbrkkz7gyokakktk4ri42xakkwmis7sxbhllesgrcn5btz477fx3w5qcq052deuq7biywx122x1y20wvcsxan45jcjr3d60n9y9tw5fhl0ke9cvnbsm1v00e6fdhmj0o9kf0132u37noz9ir79cstbtu60ck3ug6wmetpnzzbbrpvwvocbedyk7ukstvlpbglu5lftxg5vd32mdllsetvrc8bdiu8gbg4oidysy6bb7aist16f0zgvnos94wccczpqjcv35ncsgmsa8t98lfsp7j3zcx511q5afhucmbnib1gol7y5emlmoe7ixiuktbk7sfbungl6slp2xcihf7hd7glgk7aos7vl9ynp53vilrhgcyneue05webfy62w6we27ch0wftmzvk49gazg6cv07ikdx42ukv4i4de4kkx03cduzjgxh51b6lx2tt28ylto7pkr75cka106efrx2i4gm27r6dv1u6rzwlu4x1ctet072v77oq6nifqznhi31dx3pqia52z352x3ggf114sp840v1cykucd644178o9dttiddzhi4ajxcgebfxjyw0dcbrn6xz29ync2si3cymtwvdbfpk33aobqiwzwtjrq1pesxlb6poitktqhssdkvyw2fpk3s33q4poqmqaahmoltv7x2i7t918z6d8qhwawwz9m7hfody1bl2fktaplsvuxlcr8d17xydwn7rs46hyr34iwwmgu7zts59lnbpkjx90ybt8dpxx4tsso1gzbfjvqzjyk9vqcmuj5dvuwcjhgs3r1nio6i4v17djwbmpudlfg8fokxx4o7ft4a35dcpvlo668twmttqkbp8w6zcn8l6tylmq098mr4iqp6lki6mcotlvzvg4qkf53wpt8bmvcinmhnux0niz6jt510tx6lvnzcfp3ste654rou34ltpwu9mygu9c8yny553mkyjbpxmnqivsgxfm997hkyxbpkl490mynkedad5d5hxidlwulqcss2lthn5srsbfm572dk71hwk2t7970dqwukkgpfyx3brtsfrjruscw058e6f1rf1hz7s3zrfuez1i4855z03ksd6jptye85719qfc1i4q3g3a6sdu6i0d84lavc7zov9x43xtxr7fifo3sufy3gk43kywxhxl7r0g62h2u38vged4qmj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleName is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleParameterName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: '7r8cutf38c07xcfq4a9dd7zcto1y402d0kyd7uf9swd5gl1lld',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: '1vmbyjtpvfguakp3pcx2',
                channelHash: 'gbtp0cx6rs73l9bwgn9bzhzeblds259kfoxi6hqt',
                channelParty: 'cn4058szxjmgiqhaxyplum8zenzo36m99yi8qfsl21cieep71wt9dmitk4rdkzs23zp9ggv21z5iy15oht4oo4i445a2xei3jq7ohs6ui4a5xef94gpbqyxiesaxht18f5rw21efbw1hgbu2uc7wo6e2xotd4msj',
                channelComponent: 'e9bn5g3mcb2o6pgpmt7d30jrjapp9nelgrbjugnkrfsmgzyzkyip3xxmq2jkt5uxvtikkgabl5pj0a8ywpn4rhj32sbos29k06x7o3n4dmivj75fotjfmuoi3nntgmovtdrd3xmoy095pz9cp73tlg3ifb41ua21',
                channelName: '4ydj9fmlmy0h14nje3qfsk67z6n8skjb5oxsrm36apc1mi9ptl3fwrgraunyorpyqq35w2nkgz2s2zdjpsro0pj48211flayvj1qute3o758sn52ctvb8rpgym1en3r8czz2g7ra25zmexkx3vnujog0517wgfdr',
                flowHash: 'c4l3i1jweqceszic9z5cjh7m3hzxnnvl8kfqgpri',
                flowParty: 'k1t134tp564zldf2g67syxzuav6dzdl3pv690g5y01eyjjahtkyjbgbwz70la23c3t59c34lh03vjd84hnes2c379w2avgyuwyf3qv9uc30vohy2dm8hgmazj4z0w6hipsmumwnd7xmyr7gt5ceqo9vb7psucvg2',
                flowReceiverParty: '08hlr1dvuixerpunk4hfy92ytdtx0lqxdf53ca8x48zds45b8twahccs2mwgtayqbsz07qjr9h25cao4rtbrobgvp1juj81b5vmwm2cvbdvpup3pbzffx4gipt6wpov8jy15tazbts0f5gktw6cc5h38w3u4a4p5',
                flowComponent: 'lkn8tx15jggpxs5efo2t66dij7lwrj6qo261crzidwwqypkqwraa80vsia87ylyk8onnifxochweokd8lh4gp5tgztswtyr2qrm12monbhupp000svf58q8cbw2mxhbmyjoeo1n5rrosc2f55gdgj46338pt3aiy',
                flowReceiverComponent: '6jweu5x0ku8p46a49601tz13ht8xz32arwmt284899ha0e5nt0yf64p505l2x9otua9gxhhpvtdseb28mdqf3uoe2o6gkw8ojrpyfob3ya3oq7jyi9fva5efiptwa58igayvhg95z2ahqftniqdnvyb7zoi0xlmd',
                flowInterfaceName: 'of9g3f873qboejdm68ngiu6bph4rjfh88h1sdkduzn63qmt9vg9tl9wfa4mich5l5c0nzufyj0h6agfrv9sdyktq1221v43uz0gaoxk320w7a2oabjezjx35bfxwed16iw25s8uq28sm936y244h3l5jlzswlrrd',
                flowInterfaceNamespace: '357es9nwwo8kq0ei23edldbhnakcwv0mo5dqtaztl58yocd2vply5ao0cie26pd4b8w0i0tpek4shasj7jgf6ka4bc5lkihvlxvgdwoqky6wlagniv11qzaqlugttzmbonf4judtxj5t5lr0lpmf2ajqevn38tas',
                version: 'wjtzeklxbbdwrm5ejb6n',
                parameterGroup: 'tk2qzdvv928s470n9awndxdih4z89am0buubmykv2gdqew2mxa36kaf6usvyhb6y1rquazot0mq4lfpvvluc10s08hcw9vpl44pdwro2fk7auwdi5rwo7fzcvrq3qju0b7en4q163al6dhq6srn68yun5i8ngyy91prnspdj7m9tl4xgxq5l1ok6w6p8r1itce82efc7cu9848nm4bh9xuuhavujc7piwlqyq25a7u7bdkzib0l2a98v33qp3ks',
                name: '5k4so8h3cdrz8xiqsps3a9i2o6xmzd44sqpsk75d6iemu7ii6no1eekpj8a5cmu9fv12aqydsgm4isq6z52yq8aaswdzg4r20ofp27zfghl3lxguminfxj2mm5f53tlzytzsnhhb0lkqtrp2ay2jljk2oh985xisovabl5exqqr6hf4zqh9uixmhduofea74o32ififywictvdujt4z1a7sa9n7g6hmw4a17jtuqk5i88k12g3d3n5nerh7wzbzk0ahw8hz9224bsri3ideh3w025rdhv4tvhtv69k1vrpqiytrbugtjb287jglvmedy',
                parameterName: 's60f43t7msp4gzpiebwgxbhcin5bkr9szr2n99nf8yqp7f3egrobuj874mycf7of0vmcoljyefkg45gwdlcxs8i5zt5b70dpg3ixf99i9m37i43prjr7cjv5xvde3j35ccch590bnjl2pr9xm8lsadqh3dtuoa8o0mz1luwtvyeahvba7rqpqfixdk59gw4x5vao0zbofegixxf8itm9aziz30mhi9zhc43yggcl66667vxindmtwyzdnqdnx5amwzfgmfswp7jpi9m8jil0z2en6hvrp1xz738y6j4um1zlzkyujgu044hdn5qo1nfmv',
                parameterValue: '3evfp6lzcu7rr4vxe5teyed6jm2jjow8lp70u7drpagu4kvziahksly5plgswkr092dvd1jxsl1wngz9zagntmjmct5kydzfxefq1y42b2enokvec08rb304vc4cgxypupdgqcracyvmyyhyu6alg4e9qt1a2mmn7sxb9r5mecj70q9x3kxt7l27rbxyqfzf0lcqnitecfg1bna8bhat3dbcc831bpyudo6rpr559fmj2h9ls2zdv52s3y81ycjeal9talvp2wgz617jd6fuh90snbsjz6uzh8c1rsh9yydl5o0sff1c24x5ptt6iysljbnip36cxvspk721xvmf74y4phjc8gawmvyqs2pn2ls35q7ry86fslgezf16475i1t66zksn01pzsh9iv91f8k3v7l59tnoajtr3e4apjage5a6hrlm3aftlcqe3oifpacrwxm1thfji4gv7egiw0er0fog96p3umlnx3ojtpb52llwpt6484clz2zjk0i33mk2cwsj40gm5543pnxee4y5vkwreu2grpqkeynnv6xdpu0x1c2tj6nx13c7lwp8ux0e8831l586g9jzjwlt18zgx2xuncd0fuxfh7rt4p2km51slvv4fhf3lz86mwd7nk1fs2u1kgwcyz1u89ob9utpu55ct5wc27s97fpqu4zzvbkc7aad8bg5gf012msc0tv2i6vnbdnnl7zjn76vr22a3qc7k8hjwtcv4fdx8mey78hmb2qdevano2x673hr1sbp8p654ht1y9x8ir0zb1ethu3oubb5ghkbqo7sdbh301r91o3hnduauf0070cy9zsy6ct5tis5c1qlxt0a20cjy6rlchkimu54mvlm0894pp6bpxldkns6exwh58etkj3yntieiurbt3f8z17jzlaz8r6c3qddqgnqsikqcui25el6dcwjfcnsb4sbq2imkywvph20hrs3re42tm69t6qhshhbu2r9zdn0cx7tdqj3cbrwj9qt3k5u0cf85p3zr3ro0nor50ko9tvso17u7tga6pfrxashcilpbc7a0v3djzapiy5dhdz3jpy6cis4aem5rtyifu1u6wbnhgjcso6qr0zkrwby2i90d4qpyexmnhsacqxrw6cdmliygltvuubpsit1huf960r0xawbg9ecfg64plhmfpx23nuw0e7bew4ieo5cq3in1jca6o3sgrt3ngszpt626xq5ohh41e3heob3kx9ha6j2ubnr3j2c0plwctdmb41q3s9q80wdn3jequp3yrovyr2x7v304p5cdw070q08mwmyuc045di8cuiub8idm5ot7yl9h1y54j2v3lbd3cvuomrdmrik6l7j7xmbstk2gvam8ms9e966ujrqqd4fqbndut215qcbk4la8kdz19l3tromfxnx4hd8gj53lfb8e1ejhtmkdilxbun5bz8hmk814cmikxs9gfh3jj611unkcggthflda0b60u3rl7fr91sq6027lq3w0wcmx5ifecwgrnyy9oaimx9klosb2mo139b4xm4ui0x9uwh42xs1gn9fp48xecn54yp3408ilpjrtsq2eikpv2ymll509ccl1zyd5y7ntme7w1tnmot9b77vno6ln62ms4wzeyisc2tpb7r5npcyuu0lxr5xvmdyrn5pz9893y0t8cxs6r9hk6zav52y7pe1wybiesczbiyay7456mhu4rc4l9oo7cqy54j1gj2fu10n7fkz4isc46mdtyfxjd0mp54a9jsze13389559nlg9vglr8b7t32g2i5zqeo27y6vdnv3x6t3l1qjrno7saqrucexfg4c65ci12k932lv8rk2yu508qiky1i7t5ucwhji1ti6jkif7isgdnhhixyi8w932qj77psgwnz6x5wqds4gykvy7h1ltmi6up7tqkxku72rdwwozoz7ysxnmu4iikuxamob9k77n4y3b3jy96mj6yw3fi3ryvwnvnlbhebr3h1asfr8ru0wh1lt25wyat4qp8k26md4van4lkql6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterName is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleParameterValue is too large, has a maximum length of 2048`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: 'oke6tl1nrwikvskditi73m3h5b09em4mzfrxqif259yam4slew',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: '9wsgpbxqy9wgtbapp7fd',
                channelHash: 'h8dh6lmhdqtc69dfts82gnfld28wjzpe2f4be5a4',
                channelParty: 'v6d9pwdifqoyydfl8gn22imdd5luvrbchwllzqtqe2id2zpxv5bppptm2zzy6h9knxdvthe6a19qvd14rs14peh5ry8hy8ikazwfludvg23jl5uotv7v9b59oamzp2dd1z1nkphbm3bgfg2r3twxbwu6j0xx5kql',
                channelComponent: '5shwhya8h12xm71g3uzw5yrllyebsnduy0bn9cldk5krchmubk8zr6amgrt0ed5czfwtkejpvnvt384szxjgodb1fjx1hb51pxqirnzn1ukf3xrac7e6z6vqjdnvozd7rrltnliavwusx3anvqpmg25nbcft63g4',
                channelName: 'htichageeool35pqsozbrggqidxkkikix810w2frc25z16biouki5gjjiojenjtx88n0lykzyuk4txfjcf7lit2gpk5vdejcximy8ddm20q7z5zzs1z08xy6aocuk83kyy91q5iq2lmn01vywsi72vtp6tfe4q8l',
                flowHash: 'v1lrukvuhql8v17wsctdrk3ojjph9e1xelp7vsqh',
                flowParty: '2u0nklzeeyhrp8sfr37cxd3i65sp828te4zwqijnzbhktglz54kut8vzijufovh56kwndzrso1qokw13pl3s8oj08afach77vmluhfqos1ay0ihrklghts7gwr346r52qz8yn7iqbxcooex93h5zv4t8nzzk50qv',
                flowReceiverParty: 'h81gk5zlaqsttrwdqyhymu11q0qdecowbqgzom7oyrevwtz4xce2hg428ccbaf0376qqcm95tf3mvpnfed0zt1o3gj44nex6craa3isk0516xbgbhuzbgfolitujyyqgnuskn1ywl19f0x1dklhium06k2jmpn4n',
                flowComponent: 'u65e3ii7ol8m3zijhfe9koeppj13wv757oi8uj5at94qxlbru97neqldrpud1cjj2nqcif2zp4uaewp7oh9jgly8cpzil5zxf1tc909f09w96jzym0hd83h80anyxaypg3yaj7w2s8pi6ys3v2zgb3r6qfqt28a3',
                flowReceiverComponent: 'z3n03z0tk2io61ghamrge0c5kcbha77j78wqa933gkiidr24coxgdqskostrcd7zh77v9lae4jg1o0r35tmvom3ektfbndhz6zq7smy7xecsyqz359gaf8mrjpop1trc7cl98q3ouphswfgigk24jhe8hn2h1m87',
                flowInterfaceName: 'w9he0ke22dw5oa01pt7k5udeg43dkrt0l0m9hkpqsk8zj3z1p0w9jue1g7awi9vf0cq2gpha68p7d8buhx55n8hdvr5919irv9zv8sl6o9w7mxlqyksdruuhttzhizemamfcawwnfr7q8fgg94y7dreimbgenpgi',
                flowInterfaceNamespace: '14tqsv5eb823trkweixapdo85orig7466earscu5t0fau2opwnvk4a7seuy7olitcc1nan6c2yg25uvrwf78cz9a33u9h1fb24160u5b2czajuhc3ij1o94tgxxlu5ppapdjcbpxxxh6ciywce2y2w5841oa8hmn',
                version: 'g831ovng7gdndkhgnyqh',
                parameterGroup: 'mf186i064n23r4ctnjr9rw6gaog24irh6hhfblriohgc39ngf4go9cgy7f5yizqojyi1gwn61smns9dbkdc063tveyl6mm7v7dwyq4pnhptr330fr5bpjze7eb404bppyrs4s8efiw1qpxcce5hf0q1xtva2r349u89x9ar1vdo6ls5spfv0cyvq40hkoz0xam6wiq3qnrd05x12mwriv48ztcb3kqxidh8jph0redejp2s683j0i036en3idid',
                name: 'ers7ynog0422atmpxcryz8oz7elx0lkjez07cqp0n187i7fag73fx71nejd0rv9mlfrur14t3dje0oyig58nqt84bm51ojfq0p3pgvfbsyhfqf4q6xmxlrq159ba5t8c7627dlz7v9e8fbxav4nh3y5sk5f3a20ha0wnkpq568lgs81fuc2xrbdgsl6vh0hu6xedu5fa7lsq7a8b9lzsatd4vz4mwupgv549x8r4g1qzijxx1trpk1ccvkp66kslgt2k5r5wfh59stzlpx4htk6w3hiizpwqgw04tgragv3y2sj4ry0b67ma5bnykag1',
                parameterName: 'hnywjfcefuijiaewsu8ho2zgnyctkjbv1aa7cm4lwky6dd3s63l09e94fbvixjeg1b23chm3r0esjb9ynvvcpeo72kgy5urjq1xfsbo9jtq40wnexwabqv76el6n7yag92rusfdvk2r2udir56zvg3h7ff51q4gx8cqlhsqb4rv09podq7k1baph4h5446edye1i6bv4ykqjqyssxlvp6quiajwpnbvq269bjk9pi1s37z7tgdyui0wpkkpa11f3gy94cj80q44dkg2t3wkbfyhe9dtowol9awqlwzrpxhmvtdsocfwky953vs1xvlc9',
                parameterValue: 'jlt4iiq7s9x4jh0mrwwx9w25ykv44zg1b3t4frikdgf0v0reb904nzc7sr79kgqdaa1ksdkiffhbflrsqzqmgcpmegczo5smty4849gvzm6ol6bu6k6vol7wlkx8xca4h13pan7bqpp07yx9t48jmva1y4w4hw6wjkjk9hx0ncdkjlk278tnqu5z8166f39bav2ovvc0x8dq26ixllf2crju60vrxif867ftcd85dgpc0refno0zm0on5c8lp44ldu24zhga63sbu3dcn3kluhph9bjfac557b43tv217xjn08ksyewdfnzt96hjck8pbrjiyhqle7dcqw51meqzdkoq422qmlto69u6fomrw2iknipuxg8v7n468h7sozujcb1gmrddp8mlwa27ihgni2oqsf9afkcbcpehz56w7q5qiyfrvg6qoa9jy2gxs2dxknfe277gj62yquzbnedtkmsnnri2mwtsvy1379ri7x3id5r4leyvjzj9v495jlne73z6tdav31nsfa0kmx7c2561p38ao3ovmout1g8jpye7l4hjkgk27e3y6vcrt6105mwfpmnqwv2z368a7o4mvrcznkj3bin9288fhvy29varm14oouc0r579rbxk2u39u83nllgaymgau2lg52o8wn5bq1uqkaoesdk95dxja9c7zj3jisg9udmzqa250dsaf7ipfzuugl0i466j7bvn40wexblrfdkjhioeuvefl4i2vsxqvvrt2r9a7ezjfrpxbxzznxz9518cnh0q04wc9q2f342cutyawmvxb0ltzln465gd967wr2tfpyfnir75kdtpg46td5mqcp82jpp7x320to5u9n30lnra74r67n0ja8vrtozx00ydel97jxj8lkmdmkayjlkpwnkek1x4uhi3gcgrewbki41x6l1xblmy4dpztzq36d54hnwwe32ffqvnjy108f9kxhjh81xs8mf8k0cyag8rdkg3bnboz0nbudab6of43cpwtwozkm2y2bjxb5a9inll49epbi2hspndb2kmg5ihvhlxkh9cgip2xucu7vkg6ewmxmp77dgbq7k59sqge9f6wufp9chnfqa7a83y2ijy2f685gxzs6zb5r29mzr2cqsbwf3fl32ffdn18m3vgv91nyft89iqsldsk5981u7yi5sg9ce4axllw5zcg0vrlvosrsrirem57yo3agylpoc9voja2ognc6ynliot3pzvubgiy4hyk8j87wzsqkvemk2y62x6g75eddlugiz9qgm3avfncqqgzg53mdqts29udqz3kwdxohd4ert93aanu9mqws963ca6rddge7t6ig8r8gqx7hztcaou91ba2vjv582rrg3s4faxy7623sbd2r6jec83xjab9xqj49bimu2y5zftrce168dl3tfzx1ms5oduunngjukcp153qxlidrjwiufcfx8mdr0x8bv1sbcogcboeoif3uxwf9dj14pwpsrdyoe5k3w53t2nnls16btdhh4w2t4fcc1futremxt0o9pp0gy8knjanou7aqxma1t4cgq0crupex8flftm68y264afreywii490yqj0kowx1501f8hv1844aq5lg9a6j4i85wdhkollx3p94t14b9f2a3gddpoixnhrclcl48q4ogepjgs1308mmdtock3tv07pd4m694mm74cf6xfn5z1610cygx93tjaum32v1imhpzznqgwb9crdc2fsgbdke7dhky3xl3gzy04aur3308jup4qlng19oxq0z9i8kewhws6asr1mn9m8ywsflnkp5cp83flr30clk5t0vbfvhapnyd7dnq3itlpjdgzry6qs5rrotht6yq4pccg112lyhwugnq6elbgjhi07vbioowx5abe0goiakfxlfs9wsa56dt2nttoy9wn03mu62afj4v3fg7ykvtl1g0uwaj2im81w8qy7k4do99fnebmtzjih4ogr0i422omb0jlucoe9valzkqgy2nn21n8nkqi71rkf1t21asd7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterValue is too large, has a maximum length of 2048');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST cci/module`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: '1gqj7vipuwbmfddt76ixblblrp26nbvyp0t5xjgxdz54v6vxpt',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: 'i27pdpo1sg9mvav84is6',
                channelHash: 'twvl27wczh28aal8mwqhwt0xt7kflcyz731ftsk6',
                channelParty: '325pc7pejaaa8vo4v08r5kyduklrh8tlzcaqzoygn4cqe86i6vq4cmaspczqn5sm3p9cpsto8krekdv9nyeteedu1ipd8rp4lmq9qcd62d0x3ame0h169c9nmwn8zg2f3lzyo275hlxxhtdii8ha53fhdk26t1i0',
                channelComponent: 'fkxt81kunwwwf1x0o7spt8kfoep1eu3kbwn95nj3ncy9twn9rdkybthmiw7do8ainom2bv7zebnutowvfv3w68vwtzmdsxhzno5kgr25b7c0nhtyfkmjk63zmablbd4y9mzm6rp2fetgzyhu42hfx3pxkn6l9v9o',
                channelName: 'u75uga7x3nynuby0z3b5oawccmaixh4ohjjif23m3buru9wdy2qtuor49bz955xkjdqny1alkr82k3s45k3uy0a1ns5dmkfkgq8km7oot4xf64sjtmk2yu7r9d6152xtrhrglw5h5yerk1gxtymvkcaxgwgppntp',
                flowHash: 'nwdrb4o583zf9kv5gc22kxomfss5iqg48dlxwavd',
                flowParty: 'v6fx288w3pfuneox8jsmilbu2u7amvj2vxoehgcvs2q4perud9qv5bwn3h5rjtjyp4e717t424bfrgnd0bcqvmrse96elpy0i8zwhow8e98ywftqdwmh764sn6ktd4zeertajxqsyw46gd9o4mnw0t8x99hx4nx7',
                flowReceiverParty: '92utp4hxagz2s78rlqqwcophtlkdlmfsam5k0azc071j3b5nnv8izmjgz4cl81nwrsr7e5j0z336xakg1p2dz3djs3xvhy1lk21bgos394iqk06o4dj6dt3u2rkor8gwqdcwinc5lkyrv5jn62bonctzeh2swops',
                flowComponent: 'z53erjmqyy0zukyali3j8anynlhv7cazfqp6mv8y33dgeexx6g0wsbbcpwanx6m9bp68tqpepetb2dfl4zz88zoaqsn1meib0xuxlmostqpbjd6cx72vzmbphqtenl3swwt55fkqvo5x2962r3i6p52mk00pr1gp',
                flowReceiverComponent: 'zsenhk1n23glf01r5gzzlafit3qnl1cd1eoxcambtptdfnbgoqsh0srlqa8miw10ajfnaifpgtm6hxqg0bhcismmw5pce06rw0ks1uxpm2c3vwul879vgldot7nfqds01fgs4m96bny60f3r0ev9orucuw1yhkod',
                flowInterfaceName: 'hfx5dchz8jgrmyo0i5i3kutitvphnzsgyjqeqopy8jtf3lvmg2ohlaoffj89zy2ddkgb44khyjg5hw13pakotzm4dtc5sax7uaj1sbne6bqh2g0sxp00y3r98jpba45grciukvk0w8fngnlxy00ww0k9xwogfo2s',
                flowInterfaceNamespace: 'mf2se5knndvh5lg78le3wxd7l9qm54j5l4ud7u7ejhb0pb6juf298eypwkwz6t3esyr9m093p7nat9i5myi13vwd1my5yyr0zxkxn7xa9l8se5my2fdcfdeq49ebt2wz83nrdfv6nw182pff2kwzrdkzitjergev',
                version: '606w28df47os589vzvsh',
                parameterGroup: 'donaigplhj8e8dbpudrbkvird7lpmmboypngvnvrz2g6kvy1jpq0tkig6yx47mp8hbrmttw1u15gknxirzyfvxpyosaltbujca6alhjo0w8i75dzgvnf46r4zjwp6qjza48qzfdhwbhvp80spk9vtw7ajq4hni5ejdoxe3qm2ilbc8mn1jiky247mtrqa7e3160la07z7of42pqg86zpbp8a8pe8wdxz8mfpfx24w0ldhxv5ri9behxbisxtadr',
                name: 'nol5nsk1zs5367uhnk4wako3znd5dsmv2j5ll77jm4y5vpv4a3fc96210bazzwcmcqwodiwpvle5tj4k569kl1pd3mdatevgj61t9zg1zq8dtvbdrje7jm48vpcavf1xlq2jd062af723ff4frcjdp5ndk0vwpn0v9xwvi336f04ie27m8ztqzcyfeo3m37zwyeymdv2qbthyse3iscvu6ykoimvj8ohl6jaov39fq239unq8jwlmkzn9imk0iwhol53fcegssdvw7w36b5fj4zc8xlgp9oy01c05fa0qlgypeo6e0ns75agzkihu8sx',
                parameterName: '3yf6ikckopfdhaqjmhqxv6l11y49o93jzbt7g328y54h7ncuryfwnjvrulkm4l2e41oj2g7y2w28b2ay38or7jmiqdmdmgys3qlielm5urwxk2c0tzeu012gancdb0d421x5w6a98k1nvvuj9o1otmw2qdmqkhj93sdqx4g1c9pfj1537bxux6b3qo48vqjg33s3l7kaoso7jlw7io9at6sy62ucr4sx29i30x671pczvr7knijmj530yiwb39g2f65ymjx1ehrdd1ya86usgpmkdc4oo974pad2g2qaafprgls1x22adiz0w1b6rbcd',
                parameterValue: '40o7ab27mu5aiz8a1mnv5bpypkllx5m8tnle1k31flpwcdgwj8b7a579mpa4tqay5vy2ml6xfgjul68ec02wo4u8ewzule1gichyr4tknbjz14x4ufew14keevxfha9whojx6vqetaeapp6bt16fxtp9ok3k17hsvszehfhhaaxg4t34c8oxwwd9jvktkdtms7tn5mc80yb2d7tpoc0amzz89m9urs65wf2ahb2mqzpkl8fbt13oilfk98bt5mkpp8v9fy73n37f6b9ggz8i2o5d38k8i76wz2vq1zkr6xgohreusixzmx3tf0isnn0l9ejw7k00u2uekb9e32lpzqkaj0nht45wx30ikas9g1ye0a4qg4daa7ccpyfz46wup0ojj2tysbapnv8gt4iqh9u2851hzbudgox0njq7znoad4la0qmqdqabl2f9vwx65hjtjgd110r9m5224aqtdskv8fme66xjotn1gfev0jmubtymwemxdbk7gxuzw5r4cn72cy4a4zvoydpfybtow4lsxr0luuije060cvnllifgi6u12e3hc2o7m97z71j6vaj5ikzamddbvcqc4ca8j93u2w1egh87seqicoot64jpewhhl04d3xqucb20o733j2coluunpez4njxvbtc29yxwijlndox2mxqz6nwmhe15bjup3y8f0vic7reakx43npt1p7ho4qdf87ustiso0lugow6qbwapli4bojv7oqhdvt5kp5jmrojot69i0cdb24m2aipswltgxj854kdn6rjj2v6rauehbw4ams40yb7o906djatn2c9j34ey5tueewsdfdr8dhh9lpqz8y1cb54jtqaafj588snzxk7ajdqoyofap54r6q56d2a2rz75aq7ke5h2n1e2f5sr4pyr4hzook2pkdsg844yv0bkri5879ls9z2e8vhu9wjf00j5nozmbdx229tlxgijtmkt6gr1ziufcsk18m679h1c02cg980hylqmw3boafkiohkmgapisro63nd0xf2o6mn2pjilzsevwsoj32h3l84srmpxt0h8mkts33ijz1v62xiong4uy4pad9rs7xg9fuudzaiypo6arbotv2gnqgdgq20dszrxt0apwaehpqkgqkeyit3jgbhiex55gx2ug5d49md5irjqcn91g4hau3ag44h3010rz85ioujnhno9dw5yn2kajwz448okkzsxwca6vcwzfgujwq5ueee0i62oc7qudg6hzg41oui1jx00dawa149lthuemmasr45m7zref91b5cusn119imey0xucdjrtm1rjypv0xrxfyz6xe1qt9jn1lj1gxw4p6gkiso1buglzt3zwv0jnsk37l3ap06rhtsk7z89z8bku8q1lv1xjpp2u8ygkm2y8yhih8zshmbtan2tsxo9y27if6n9lh0x9ydjmbqmmno6aqacydcgelwo8vmee4hqip3s7pwsgo4l5bqmuq0k1nhxqo3058vtpzhbeuemvsj65zewt9orpa7zbsofk0uqilpwkaebqjxwbuiz37iwtxrijna6t5l8nh6xovff4tokp6amymhum9wq03c1kd7c69be7r0963vbp0q4v5qnf006mboobt7gk2b4jhwvs5zwv1zwb3zq06wwixh3afa2fhve23450bdlnqsoh38ws7a6dph5y5fqqsdvtf031wd83k9kjjid8pccdpifrgiyr14pkhnfj5js3v6jjgaf9dltjbte3phfd3xho6drqnpgwha718yl8aepqauh3eavozx1j8o88rxhfmyww8b93pyq7xhlae8fezwbubae5kgojbfzabqtsykgr6jhlhibo9ik5ho7kzh3pyd2pe5wo8x6e6str0fgqiuxmm3v81f3s81a6qsk6pdeh3cf8q1oe9c8i9t487wqlz1jp7amlt27hi4c1dbfas9fhpoeqcns5ep7y5mrdo7dbh4rpjyv5te4vbpjx9yrunzqp838c1f6aopan3loxv8xvnjpc61e1bkl6iapa',
            })
            .expect(201);
    });

    test(`/REST:GET cci/modules/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/modules/paginate')
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

    test(`/REST:GET cci/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/module')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '74a4e646-8141-4cf5-a07f-f03ccff71de6'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/module`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/module')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'b4913af8-c04a-4c42-89b8-97f452264102'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'b4913af8-c04a-4c42-89b8-97f452264102'));
    });

    test(`/REST:GET cci/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/module/bef3c8b3-bad5-4ad1-9967-d9bf591a60d6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/module/b4913af8-c04a-4c42-89b8-97f452264102')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b4913af8-c04a-4c42-89b8-97f452264102'));
    });

    test(`/REST:GET cci/modules`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/modules')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '2fbd9685-638b-47b9-8720-5a547a7bbd50',
                tenantId: '97a80034-076b-4b80-af4a-e6d39398ec3f',
                tenantCode: '0cnxiudrj59mf5eni8vk65fdp3rt8ui7hv5otuv0m9xwybwm19',
                systemId: '59737fca-a14d-4070-83a7-3cb0a01667b4',
                systemName: 'gg2e98vbo1ck1o1h64g8',
                channelHash: '8uh4pgqg3j6iemdo79peh5wvq6zvb7ccn9q1yfw6',
                channelParty: 'cfugqotg54xsdg7rdwn2qrjbtcx5zsn1z61xt5aui4n43pazss5q6rglq8m6pf8nvvxrah727j6exlvvd2fi7v09e0fk9sh7c4c8q30xw92roq83rwq7ih83ciqokhmxjt96q1ds2lwc2h928yowf90m5eccg6jc',
                channelComponent: 'o7wbajb0lkzye9blmmoc5yhhgsgi0tbcvu83cw338ldqruaj2f7dulal6i4lwt75cwjaamdjbms4kqux8biei43cn6vfxjh81369ogwyjqj3rb3cwd3s3kx0wuf7gwjw4m8mw2vnifc2ncr7qy87ats2hzdlfz1e',
                channelName: 'j2yvv2gx9vasuav0ah324ncw16y3fgv9bnf3sreqf6lb0fghj9mpbntgcngmbudbho7ow019j6ci7gaoxzd9jnfvfsb99ih7h2sjfav5y5xu2vv2chs44de9lwgxtrtcy5bfgw1yvpoqyb4dw6yrrpvkysvk4qcs',
                flowHash: 'umwrcgzn9g3vkeeoec6a58l57azawfpp3ham6zwt',
                flowParty: 'koktdztmsn28m7f9ucy9lgzl54z1gcd98vufx4e94ld0dgvcmsfar2c7pma02hdk01g3bhr7ulrnrq2y1l7ivkoyzufcp22fcqa5ezpkfdsh8kkfyyctio7q0aufrc483pp76hq1s277mhmjhwbvdiljgju7qr3s',
                flowReceiverParty: 'ih07z93zijqv2rrhx84m0oc2wqdu1t6dvik8mi21c6aq6toon9ub7qm4r8icuc3bay2bmyje828n4t05xizryhwc5pf471lzuvl3xuql8qboami074jg5yyzqhozvq2t8bim7tcsxlgmsqcqj8ps1yw30vt8j4f5',
                flowComponent: '09nvcu6am8jh6ymxivztupzcewd2qrbag3aswmu5mf09h9vwtny43hbht24awx9kkl44xz8iou1wyp4mw95n65mz1csf6og7agch7lju2xh8hlusgotxdyhi0bzege0mqq5rakpiiq6vxt3akbg2jhrzgm8cy0y4',
                flowReceiverComponent: '4ezh16x7pr4tskkt9yqsgkqp3o8mjoaqxg2yv5pxt6netzyj6b200pftrqbhhgmlhubm78inpusqiyiil3lihriq9rft9ydwx1ca0wbzsdhfm3vp8tv83pid1xzb4roip4u5llhgu93lgm7343ikunthrncswsoj',
                flowInterfaceName: 'nonoxzjpvssqkmy8yukwmw4xgknjrm6760e61q82gj4ai9af0sg21jjrm33q50u8rkjyjnf6owk2ars8pwi013m8lsyebo6kqqq2e5a07mz99yxl5ijp72ufgrtcfgnyr4j4eq0azq68pihq6lmx0fr3diea9ldb',
                flowInterfaceNamespace: 'dkdnoywdublfd8vccbjr6gpk4qiwfgpuuwhw2t4ygncmlcsiccstd77ull39opncc5o1p1w3bycdd1ojoes2dtrlfx7cayfj1m0fapmzgsui4v7h651s88gp9rtgd6nqv2vfte08dmwf7bpvrpzj1n6p3k45vmkj',
                version: 'vl0b0pwxw3p7krkng2i2',
                parameterGroup: 'b9l23h46p8qu9pi2qjwkd7cyldbk7lrus0syg9dajxlpgl9vs4dpdbhy8vo3q7xgglyy5yuw85vk31ihtvkniezy7wks46e0iexufhx381egrxiy1f72e5tbrglarjxis2y09z5lrvguw8s6v28tjs1slchxzkcbmx7528hr7i6tipppxt8dp7l6vd4rq7azuilq3bvo0ks8jlryjgdzc2ozkj0mxu3bvcnf7fhtfje4r774b0jt3b92z4bj1ge',
                name: 'xfqxphe4z6d5nexegprbb67jq6qo7kin6dd078ptjeloo4xbluy4kurfttssw6cgj0o430u668973g03dzcdrk7iqjl3b5hegvjncgkzvkgg1s3hrj7sztsn19n8d2w50orobnpehymhwhti3aurcq4zhuq1tkmxnfwl8rps0891nfmovkx2k3kd4p3fwg5n1id5s9gm9syyd5hxixcurz0f2udt69d06ha13fvenlo9my0oni4oipx13st8m6wjvuh1zhv4d2f6s427wo8uhfrgv60hes7khkedqct32rgjyndwxv92am5tjhernni5',
                parameterName: '74ux4p26smv8uqwjwuu7e8jh3mg7bvcuk6i5hu4h9zevqfrdyk79l07bf0saz827cir12g2bj7p38x3nplq2tr7atp7m5iwhczzzokr6q3xj415gqs3hzyzq0p4f039l45ueliymcgz7ukbn1iyi0z3sza3gb5egxbkjrtldvpqhur05gf8dz04y9aqltvqs2x7igh962tdof1s904c7pqkstilfmur7doblgpggp5ty8iu29gbjrn6dypeg6k832numdkcpfis1gzb6i5w3ik4lnk02yza6zwxmkuwl02z7l403li4qyvle6balc8f5',
                parameterValue: 'w6wrgzep1g0ioz0mlgh32jyg22msi3itv5c0svkykl3lvpblyf8lpoyms5zisj9uqcp30k5chdbnxl9hvyopfygcm4c32rbh3hofebyxhckxmy3htrprtfxn05ptobcnr84sssvxcpwihrxik3llw9g8fu329pvru2vg69xxarvsi813tu0m73pbqo23o58j3law6mz2ohiwrfkx7n6oi0q4faomng4362wcelouk0ky97q2eqlsb9t5e0157cls4rkj4hhf2o5ucgr3c97eq0wcfvq9uy6g9fwralllri2ijmnqbd11u3g49p7hlg8toh31o1qrbs3vmf8m8t8rewuh12jtid42i9pbw4dc68n04qaa4agd0kg44788jp97yqhau5fto6cukv5cy1hnvltur53wcmwpbdo0at1s4ugu1qyohktix52xs9i8s7ltam5yhha1calzromxdrtgy3s60dqsx8o0ha6hdyzkvjcf3l67h21i7njm1ezu4avw2isea2ljl2u4ciyhxhiz2lhmg853k1se1ntk5zf94k1h4d07idy3swq9r6xl8g7kg9xmhalxflxj2g9ebwzkz1u3u8m54g2hxhwyrm4c418z6p2eoi0h1foaamp9r819eg3wotknygfgh592pnhjrf6sek4evwq3ei1p6rxxv2nc2c3hvcf74dnrdxrzvxmm768rpgvnb9cotc90akrc2r1c8nfjhjr0n567fjv6c3ty4slkm79yegjny9czpxmtfcs5eq4sdw67sdwhejuekc2uxr37jusjudm0o0do7szzirwo0g22u100e9lwcrbuq8ouqgtx9woa9ar1fmdr6owbk2yrdqfp55vv9i6xpjhuffh1q45g68pjwfyf8jpphdtuy226t74ijj71youw3mew4zq2pavy74smi4563mubimcbt6yup9vyh21hs2ofdlhuzu5sd22l8r6ez3k96g3y0kytqxq5ppio1e9r4kghtue3y1mhn3xueesynzv7omqmeq5dg0ld4e31jvhxn6uxrksskp8vqpdq25nshbom2a3soa0mr4i3gas19mqrmh98ahnabgu0v2itjo9gryydydkq28z8t1yz1h6cni062f57ymdnsadr1zvkd03nzzmtp8l0wnk32h5lvz047b6sk1bo9c6f8o7vwyg2v1245y727ke9an9tpqz0xet2ml4tckuanbz4keawx3y847m5kqkkzmt58696uvela338cpzk4t9luqyxglim55on6icvrsazldleob1gtavmnnw3jrw1zmajct3ndopgtjf4u4a1ticfhr3a3gnz74ozuup6mcvanbjw9qd02yzd2ulrdfluezw23asnup2hmcdp4sw9ry4rc4ay4ciosp21h73635oyjs8axxvxg2ly3pqeafkebm6hcp8stoxuhnetoq8erwobivd5dh733l51ocyvj7qfwktbaxqyauzxoxid2u08l5l7hnwqc83b1npcfb8clyiwq429phm0bj6x4lpxq0ojg76j151m0a4q4h9j21lj5jt96ezrl6qvfmsjngqmqi1f96qzax5gp95bntrpe5e293xwkquhuei9bppkp4kdvaazcnb5gha8j08rhnlgu2zw0zzmo89npppro1qqe5rl6xfv7mslylahds58oq8ve6z3yj9lmzu0xlvqqrq7ttb7cy1d23w4aonhbaedxym49nvr5tijugpthjt9vjeoo12vclugtkwdj5x9qbq8sy0xpk8dgea9uq4iz9ng90s0brji88sj1q9hgjiogwa58v9fdo8gj962pksg9488ya5jzhll477hq982gn27tea73ocv9b1j8vtzuiialiorunbzz08zs1m61oqrm69nf10kp5q0oa4l59g7kegph3oqh719r34tlvk016l6ed1u4ydvjh5is58c7dpmbpgirmf95bddnixhxenqp89eryjaetk22w40a7wf24ihscntaygkfkur785d441dq842ynfo9prvcq3duse9',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/module')
            .set('Accept', 'application/json')
            .send({
                
                id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                tenantCode: 'un9hafqvky0s0hr7sdr9vcl0cgryx6pxinm9w0sn6b0no4bj6l',
                systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                systemName: '0g9zmf59d9cyb7gnxdm4',
                channelHash: 't22lu038it2iwailhndqvpamabc42zcyklaep2pc',
                channelParty: 'ux1d34trbnox6m8iix2qcxivnihtnl9ar4if1mzkmb1q8cxf7l16swbydf6twhwja47ffglq0q7ztanasuy6z6arheyjvq5gyp8ewsam5zvmhbk963dgonzbp4x0zlkhhilzcufpco3pv3ivhpd1w4cqgfft71tw',
                channelComponent: 'l94329iu3dckglmjidpgn975gv4ih3ii7ea936fbcp08vgouwhebk48jwd642z1c222j957ij3wxw02hu2fom8obmazrcqitvcgv2dyvd98l9tse77t9iag860qhujhdgvctxgrwyflk0z9zh2qs3jb2aec6dson',
                channelName: 'krlxyuuhw64a3wp15b5e6k1wr960wlaabdecvrc6a9wmxw7b9yd0569oj8mziktdg5coahfelvw10m2y0uwecwolc21o259dtgqpj6bgh553jjoich3lukxicka8edfgba7r4nhi9iq9pw3frp4c756unmdb0uiu',
                flowHash: 'd8ng5bqrj1oj4tln25oz3ht501tyov06ze9jq6xh',
                flowParty: 'wbu5ah5u8svtyqan2iusmy58ykf8xqmeba50i5fwpdb2iviyopj26wyrtq2skq1p9sb4ltijqgnu0crd3prses2ui0eqm8q1qizwyuerikzza16bhpmnn3tg84r7z204c35bansz9cdaaltuybpd6vv2ge0d5g84',
                flowReceiverParty: '41dex2ja75f34fuamn5wxn6h9w6zniu7u4srk6p66dq097o7nkna2eui75noz3lfx51f97emrq1tlc13ztlqahx3f48fzfxdluhpug8vbotx8aoxbc7jxbq7olwugfooj5xzo3gl4dkrnak4qxt3hltczqj87qje',
                flowComponent: '05ekj1fkwr7pby8yhjoj0te0hy1z8e9b4lej6kbe31g2c6jjcr8nfek25zgyngequs860zqrp6127962gumji8wj1ofzv1legmrxbsq2aqmfclhzyb17r8iu53zi9pun15wma72x4licbnhhad2p6a5ygndyvlx1',
                flowReceiverComponent: 'n6k2l8pm8r1gdooa13h2dky40o6ytwjs6lucmvq9r956088dlemgnmhyxagumkae2ov3rszznfcu38umeh8jomgmfiuycp5v5qlonugx3sdfqp7jf5u097q2dnzijsae2tvx96n4u1awsry6aou3bmsia2a8sdan',
                flowInterfaceName: '98b5gmqq7u4z2fuybez5qx8h7s1l8cahmpjyjjrtpy78qanuayv46apa7qlpqnoojx6s898ktqu7t81xuo8yhg4uj8rxmzndiv93pqe3on0qu8tqem7xkin2kfcy5btmeny3kmnktqsg7hylryphf55imeh0oasn',
                flowInterfaceNamespace: 'cwo8ja4n17j0aruqy5a49vanae5ptpixb999v1vspb1zjr7r2z6m659t2ijdq2w02qcjwpb1cfs9w63ducnb42giziodxw9z0aehhxkbwg6aeetpxjdekcvns12u83zoc0zfqxxt6q5cxx7vie86qvefvl3zd24h',
                version: 'jh96e9qc4twb1pptz861',
                parameterGroup: '39lxy450dl97soge7rfisutjuxt1y5wpy8u4ei8vae16cfc6yr9qlsbtg6v5asxocnla4pqdls7vb6ic0vg6iw64btji0x6vqqyzyyj4anbu80e0ippdvffbtf9l91le0c4idh1h4qxid16kgpl0spabbowgiibqesdeiwc540aa96mk90l7zoa18lk3t59dehzr3mnzjdes7kz9mlrii9qc2spssisobuuql59nanqt15i2nnyeat3qjms8ieo',
                name: 'ghmr9un1kz4qltu0b3lhovxfz79mss4it1hdc0ymuc8v1ek2mo0yyqp0ahnr9l6jewoxdzzhxml9vzhigeolaifnkldqq3mhyd8g7rimnr53fbm9k8v8iqq6q7xjogss1rg8zvvqv5tt7zz2djo66bsokrx7om66tjpkk6um09r98ced73kthalbtxlcgfa1lktg0aj4e4ed3jhys2yh7djaimbrh5edzp0zjfqus95g736db0zcu3u1at3qp5m6zh1jrc4hkpx97jrr4xepbvqatmno0l3xq69ez8quh6eawc267w7enrs8qzf2nqcf',
                parameterName: 'j7cjyyc9a7m549xjewosamqoxok7t8n4w1etu16xclzkaqyb1settexzrserga3psr49i2enlc8sb3cvswck1uc0x1pjqz447wz1toxic5yy70j1ehocj85rnqrpowai1b2ewbf7fe6c29lwdlkds2xcrhh9qhdutlpaiyruhrnr04ixl5woxgu8p5mu27ydbx4takv0tgxbhqw7iqo2alshv8cpfhtdm0h8rr69hq6mcy59483rgtrfdoov6d81360dqpcjrwe51exiird33a2itinxn9fomrkmqqsj5ujdipercg20butn1uj8cq7x',
                parameterValue: 'jzugv4hn7fjpez85igjpjypx43e7ku8juycp1ry3pw8czox5vhr44qmnbb7afpqz4y6f9ticptlbh790lj9k8l6f68s2x4uj6jupbt8swdy2qzjy61m0u80lv3m6xpk3saimltwfs01wwo6ozsrupmcbffwrxpb069xyulcms2fcue70j8eitzhzvh84g1vr52qrzz63sxaj2x3l6fpci28i05tzhw56497iy20ppt1sfipjg8obomz2c3tg2mog0ulnhvv58uyprc8srlm8tzoy9tjuw9hy12fko75x3kxfcvfrrtc7zm11abbuvpbg82v490dz4ed8uzlnwyhgherwckxv48hqddx1zggmrmn9bk6v5qx3w8lmlxhrx364qo6t6ah8is69tr0aowm9ouikeykfd6y4sl05npopffve9ermkfn56iywuef147fdmri4vg4ih6wtx8ftxw0g4gdtjmxmm3bfodiayupqg25eiewvbbg6vvtx6vij1k3rc9xbviikxtsrgdd5n2a7f7hl0202mh7ncflpo2ph7xlwlaia3v0x78ioh9w0bjoaqwzjldkvap4kr8odb50n03u6hxj7q3vgvwh7ii9nvcspxwp188jl1yfxlnfasec5jy3clfngm6tm9wuwfvh8wjwagqroinuoqfp10e6hi85nuf2zyjaqgho80a01hzwql1vqxr0mx6c5ezxa9lc6k9qvvcj8f5yr8ix4voxz1vsl6870vncho394e0pj6q7m95ig39leic59i2b0c59rbf9rbcsqg17hd85x7g4rz50h71njm2rp4zv09xyl850bfjy6nnezejgwvn2n698o2fcuono0agswxu2k7ikokicbyjz7u304g0syvxei486wdrj8nq7q6q4evd3lqwzaytpql4xg77vs2c8upusyz2i8frdljimf583fllxq3iqvpa6ly9dr1t0yxp16ip7msmxrj56fhiqaqjsv0pu2ue4b8d7bu06unp23en7mcqce9e73u3ev86t5i0sx017nkww7gyo5jtjhsxlb16fx52u15oe4tnovhnz7kqk0u6reraasieoycpk7jmowupgv8vq7vkx6rsdiqyi0d209gtujkewwdhf8tzv36y1n3yqpfnmpo7n0kou3r5r3dchtj9j8wq9cyavoh3hus6npwc2ac931bak4nv6uvfp7ilboz69jpquk1806mrksxct6hqkdx9drx2o1zegq8pw12p9wvo17mp35qct6yy2anq9wr3unpxy5dwbfhmks31oh7234al9w8zqt4s54cq7q9p689kx91cdrr1mw8gbferbkf0c4xq0wbdalsvp8eea2j3y1b5d0szb6vt25h0arl4exwsjenoc1vpnd3efaq9drv2k72xrdm85cxefyk6qo16ttaxpy10p5yo3h0m3e0magc7eygb63z0pr460cz1ndezx0jw7fiowxkqlimaedc2060y0ubd4x4nkmnsixfhym92dymeif3m63wm6pjljzwjsievtpef7nncl11ubs03vy7ck4d4c2f4i5rf1t3zrkt67epcnn51382gzby1a8rjdbk35xx4sm358hrzhxgbq1tpauj20mi569hgmjlxulieq7sqqc7ta4p9818r3ez6lsfx55fn22k30kfqwaiax3i9aynp9kskpjsm4rcspelwi8qujbwyy34x8skknzi5o4y3y0rvcb42vt1krtrueafbxlnofxbwyyovs069y34ihmbg1yfvji05gpy5uxk0wacbutlxlxi4tcfpneyv2bceq80sfxkb885k9hek2kmynhuyznnnbgzl8ixb4vqeco49lk3iik1wr3kwad9uar1lvnziy5g9mt3imjldcl7g9jcfy943xiaoshd1kl7r1r9ene1z9gaxgurmmt05m10muxv835ita6n4lj8g1fq0zbfw86iy8b98lnapqkur3o17nndn6fpk9qq70lg14s2ynn8m8uqzane6iptc0mkgd8kqx7s2u9c6k3chos',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b4913af8-c04a-4c42-89b8-97f452264102'));
    });

    test(`/REST:DELETE cci/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/module/7645d337-69c2-4644-bb64-d4aee7ce1cf1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/module/b4913af8-c04a-4c42-89b8-97f452264102')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateModule - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateModuleInput!)
                    {
                        cciCreateModule (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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

    test(`/GraphQL cciCreateModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateModuleInput!)
                    {
                        cciCreateModule (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                        id: 'b7bd6a06-ecfe-4d9a-8cde-44a3d598e63b',
                        tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                        tenantCode: 'wbbf7qkwq60zyb6f1mdni6fnch92yndznxdt2jny1l6j2v20ys',
                        systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                        systemName: 'otikj9um4old8zz7jpl3',
                        channelHash: '5eqlgz2s8fuxh0erss6wgr2shv2k81xqi2gq076g',
                        channelParty: 'qpg63hqc5qr5ejs535aoutxdrplnb1s7wbw5oln3q2w7gzyo8jlt1sl7p4yazw8hru14mg4ifg0tukmykkccicrfh91odno4kqbkad7aawxpupddukx5l403cxaa3otu57a1mk8ggz8s4fvwhqsprcmm1t1dpw2i',
                        channelComponent: 'yxq4s4slywyz9pom0mi97lsz2symqylw2eg5n9tjp6349wwmazh27ckyvvjy8vloyrk26t9mimfkx1h97drzecx60zkq6l72v4kjas5drog99ubr8fuox1kdjcwwz3gcwhi7ej3anjhd9c2v96xjb4oz8l2ba0wm',
                        channelName: '92sjva6phiv4ejy058wcjsgt8rxuz7hs2x14wftwgze2nzuhbjba17sms3hhbsvkkylluj5tjr4o0uttadpd0l7nvul7yed08z3hoyfg3plaklne4dniakldts1ox0jkdkacqv8evi64gnqszv0eyri8oh3xqmln',
                        flowHash: 'rzv41yh3tjhsaqhkkuslm06ule6ylwux0h267mcy',
                        flowParty: 'n3xsfzv7w4oh1cpkqx9ayq6u78yfb4a95rrhtz4tw1y1vkkmkgoh83l1068zfvtxiorawhopfxptrhx8r1q9b6hvb0x53drzehyerazwvh72k8vq7ht892cw2a0he4mervs4u3uhxkbfxy2xzj4u192xkbngk48f',
                        flowReceiverParty: 'hbio89npf28gf5r1sg629tu10bkrd14305kl2re99iv6m8648idruutpu5izdockowryb4ssdl66d1s7bmlo7kps4240zqr1i5azudpae4ptwy32kp1u57zdmg2g89j11xdmu7rqwofejga3g3aw7hb3s84zqm7k',
                        flowComponent: 'qfsl5qlzefgv7plkpt1wc827c1fq0paw8ntm39iijd0bnb1ybhhb75ci0labiycceaz7cfm1jvyw2xsbhtj6vaanknio5suewd1yf01o71euocd1ph7nqzhujz8pikrthdfx5ax9989sx9c6ayweu1ggura7lj53',
                        flowReceiverComponent: '31xr95n3nuh4s40uneqq93yiwv2syjckzgrs94c86i130nnen9e1znahstzpszskkjyzgeci9dtuj8grwkktyotilzqp6mususcoxmks6qwctieirheqrqdoyadzy6f917pzd2tev5q4mi5mu8oiso1bp5o08gun',
                        flowInterfaceName: 'oot5e81lbcu4vhnp36wanfw1f5mlr6kywtm8jfwlygeggyjdgyci9dntjgl2emw0rwlt18t43m06zy8j76n1vvlrm3ulgiijo2jmbphw4xttkq611qkwawa8vf0ldob32v335yv3wef2r20vtlze9sbz2dc0zrys',
                        flowInterfaceNamespace: 'zf24v71ml54h4nuiaqppol5ghtz2cn959t49oh0lrj7eepyoymexsqshhm7h27h417gainafbkk4hy6nqhcvbw1jq9fky0xn42xwugc8ci0xj3bm6qan4zlh8d86sawdajl0v2v6t9ii0sauk23u77axf6a8fkd5',
                        version: 'qj1r15lz89klsb0awced',
                        parameterGroup: 'lp8zs0s3gzxrqetp4sehh4m8xshdix76fzkb7osl9hvzduyjqqui0wpa0854f420ohnknbbo40im8b242a0t5yzvwh5nhse2laqpu0x8243cq2t9m7ki03lmyko3whfqia0zmump7hmc7kmm5phpdgvbf1127u3hba322kwsfcilxqug9crh9thrgsz67240w9xm3ov1zftk7us9nq70pvd6d254s5tttdjqadlwih3vtlilm8s1bpxd8zu8vuh',
                        name: 'g3icv5skire93eje1bfm5kfovmt517wjuivse7ydz4d2rqh89qn2mhsm7k21hjh9y77o0559yydcjrhwf7fu1f5besfhor2du3ow0h7k7gtyg2tjv0qrffoo38sq68tazlmrqct3wowkvif7gku50j4iri1zqxbrylbzblr75cta273llunu7mgwppnet41aiyfvutaiy3x7tz6cru40hr3oss8ppgj6ytpwzlekh94iluhkqcio7ak5wq9qpq6qfdar62krl0736vjwazo1jlnd6ogyoi6niwcm6x4f1zu2x31ahupvpbc4sb7ixybv',
                        parameterName: 'kz4x4hzydy659iiq2dmeameh9bmgqjd4z1aw5ek573f6w4g2bbc7pjabaqt4lo8lh6j0ojj7o0do9eju9frv0t130qzuywle1yirobfbllfm28gesf4fp4ibwn3c0d9myol9i5eklk2v97onpv6szlr0ggbw57qdjt1544krwsk6eoxgsbt3osf1prmly5g6ug1ipvviyk1r90xls4fdetkxjv83f0g2buspo9cx8n9atw85qln5s82x8mgbsldx7hjy1ph72gm0163ru3q0xiloo1jb5d5cjwlnc3bchn4t3wmlnrvvcw7ak7bpdzo7',
                        parameterValue: '6f4lcdonbvy2epsq1yna7309xhry3lbmxxt7hx989w7z9xdep1dsffxwtmlk9jh23h6rt6p6nuc71f96f8t7yywsdrpyd2pcw4dy427swgx96o3jamhfkf3osuvskxnb45dy0e7kbv8mzzuumo5862sa3z5rk5inah8njs18psggr1xveddkhio602xb6gg6nblws821111yfajowaavzynt82vyv6h4k6x6ep5t0dbfk9uw33rebvtd77bzyufjfg9m6no8qknzjy2mnv160rvlm855rw7p8345nx1z3jia27sacljstu2upchv89fn85a5k2odpxovarkg4laewudktlqzjqqs9enosstyubo3ipm51k6rbb5fbr8hvh98v3qr4i3c45w1366upjrgu3131hr30a70r5u3nupdc116pvz94csbhnubtx2jt0glz1v8no0xam38j6gbr8ftp7selc5cwkvp88t390b0rql6txt68cr3gf5yelyqjm376vqbz5l3goy2mtci2usc4fse0ejki0ylk923rh9ylg512m26yn6mnlbnn0gshtaoehtx6jaytnx32iv1ojb00au7p9jlki9cbd34ar77elt7hg716ni5q26kqih1k62uv469afjli4kw69v79ecqst2sf649lcef2f33x3lunic5hhrnokcd1k360oeg1kjt1t1tqjmf2htolq90gzzicqq2sm02aki87tfiui3gfubb3nrzkeplwbhgo9cua4iakpeuh6l2y70sqkzbsrx973k803wnljij8nsf7v0g3bhgj4g6hqcpn8djb4dwpatginmy8zthskz35qdxgk6hpf5yuk5rp5blmpqlv4t67dde95sgxtljp75m1w074kheeql9k0u2u5e2m8vokr2fiu34rtvjdyvsnj82p5zqq5nq1ooxbk2t61thnyvn3w83rtgudu0hq6euyvme4umzpkvdtjfc1n44h3ms56qnzt4ehurig0qpgc1utuh2a7covf1l619exlk7dywwzi4wspxqcs6iqn3irgtgulmqpez9n99x904d65s184kec3ror9gxmtllyjr1o5ctp8mafh2n3hp43dnrqtsud5k34kxvg208wuz85etfm6418gc426exq96vmrgeq1iwlaqwjvr8hq30znf94dfmdejicmcy0u8wpg4uuvo8hhll5ea1hquwra4yatjp4jr70jn1a0n6ak9quexgwd8dfnezei7zb8aovjh6zwpzz103o229k37vv2kjk9pne6ebc46v32k0f9yl4xgq63q28b42medzd2uyrzhghtkkjd2qttyhzdssm1u5k0zm7yeo9qujw3tmp5pkhen7xwoforftit9bzpi0llnve1xlk9gtscz3i7rdfpr8dtqece4zva3wj54n1suyytfuciegn0hof150ws44odz043eze6j3f4imvm5c5jsb38dmdqg89ouk0jn36x8lhhtmsy3nmiik893lan3imzf2s7ocldptonk5touz500ayv2jzsnem2wvazogcvhv8w0xdyuz1mguz0dvbxzb3lndiysx84b5umm4kaqwy8je7juii5787019x684k5q00hg8h30fubs8r34p8q3lk6ezxi6buccuuacyiqvs5bjnjq76sreszv60y0w4fgrhfj2h0hx6hpv8rv97l27avfrh9atvsms5zuv6ko1op99xy9f7bb2hsl112uas0bieo23s0fk61l1fz0nsnxby5chrlskzsgzvv6tzxf6t7lkxg23cibp8wlzup7j0osa0637pliy9tcs7jqpwms4soyshah5q1g31937avqbymfwvfu7ij0qjvydodheoq507sxxms57gla2z93jfaguna7g7mmsx2tmwoey3yaa5lmjezlmqr5nn04wdzmv7d9vz2kf1w8epcys2od60j61aucxc2w62kurrysm76w2k6ofp9nadgxdi5k71mj79dguu2qm3c06j3yqa9kbtzteokqc00fdaqb0khp54',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateModule).toHaveProperty('id', 'b7bd6a06-ecfe-4d9a-8cde-44a3d598e63b');
            });
    });

    test(`/GraphQL cciPaginateModules`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateModules (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateModules.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateModules.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateModules.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindModule - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindModule (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '6a8bf1e8-15cb-4b07-9fe5-bf21d3ebd801'
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

    test(`/GraphQL cciFindModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindModule (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'b4913af8-c04a-4c42-89b8-97f452264102'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindModule.id).toStrictEqual('b4913af8-c04a-4c42-89b8-97f452264102');
            });
    });

    test(`/GraphQL cciFindModuleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindModuleById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                    id: '44aa335e-4dee-41be-801c-9a09c9416b8b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindModuleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindModuleById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                    id: 'b4913af8-c04a-4c42-89b8-97f452264102'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindModuleById.id).toStrictEqual('b4913af8-c04a-4c42-89b8-97f452264102');
            });
    });

    test(`/GraphQL cciGetModules`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetModules (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetModules.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateModule - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateModuleInput!)
                    {
                        cciUpdateModule (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                        
                        id: 'a4a39f58-8375-43e1-b77b-94b36ed05470',
                        tenantId: '28bb66ae-285a-4072-864f-c5cda22130fd',
                        tenantCode: '3yne9uh3pxb7dtjmcpkdd53jubm511szktsfauegxwlx6vczas',
                        systemId: 'be510620-57aa-42a4-bc92-75dc70372bf7',
                        systemName: 'fplxc35dwxc96gnu51hk',
                        channelHash: 'gnncidjmf9elifhfzttzg723wpt6z3vf2myc1igw',
                        channelParty: 'uiq5324talynx07m3oowjaf45q0jwdo4737fqqrgi755dzkwv1ra0fbgn1qndcaptm8krdcnuz3ir6v7zt4aegv0jaeu4i9s34tofp48p8bo34tkw9k369ifehw92aq40jir3jyijnx8tkp87fwjcwmr86s53hld',
                        channelComponent: 'og9dm7nbyu2dpda014wg2rx96g1e3joqx4rpra27r971mfvxbdnoa0nfu65wv5e0eg3jyv7gpr4mt1b0jz6jv1x5f6am9rkt10lfr6j9yr39080mfkt8vc7ypabh21nch8waahj7ki61kfyb0xpocuqk1xstu551',
                        channelName: 'jcu3cqaz08s9s3aqmeqqk59s4tknfn5c6j17wh432d7nnl3r3puhdkwjsz2pkb8ja1joc8l7c3tcan2hxipe43qklr3metj8l4ao4ehkk4aa2laobrj68y29tootc5n9sjhncxr3k3vt773j4xxpcx2fx7winh6t',
                        flowHash: 'hh46eo5ck9wl9om6dsm5m6aj3ljxx3ber8c1w527',
                        flowParty: 'yjhmmjo01qaiqb783o5euq5o92mb6tj4t1v5iih7ogobyzw1nu0k1aag3xubpwjsn8a8pxbnv83nq5f4gqi4698n0g8nw62cgi8tv5438n20ih4tznorlcg6d6uxyyg180f1anzxw9bz5im19pntfptqhiqpjwgm',
                        flowReceiverParty: 'mvrf33g4bknygeybogjowstxf312uxpl7mcsqz44rkwz921981ejntbv3ltfyf2abebm8i1rotfmfhkvqs4xtlh3fbq56etzpat7pnppvcoff45h5ejl4osyfxasav3wn0rvdsfo9k6pf4i6qmfr9ao56my4ek86',
                        flowComponent: '7gurt832my4rec6t9b5ndvfzmblhlz118z3il72pgmkzbic4r8x9m4fmzkf9x3s46auyxqt4puqpql4zq6513i6rr5jd503k2i6cuvsuu6hw7mq2e4hirz9pmalcx3edcc16y4gge0cf09940hrefmf63r8021l9',
                        flowReceiverComponent: 'nt00ouc7ouvhp26un4dmer1zmoaslf5cumldlfe6lnymbkd18dw0gpabdn77iuf9q5g5q7gjk6rg06xh7k6zvbty55953hkp0tqnk6eprtd8osiqottppy03ub3nkm4arerbl4ys1zkf69w68v14zb0ydprfsrzo',
                        flowInterfaceName: 'x9nqtbjzx2dv2y9uqj4dvphc9h486fr5hwrua33f6opiopd86qbi1txs8unu5cbye262ucebvczxlxim7qe9wi3japp5fxe9bmgu8ybpx5jpgkud5jtb3f6zml8btv4d3tk2l3wjwiyc48g6k3dga5y36a2wj1es',
                        flowInterfaceNamespace: '28js5y3zfdedr826hjw7bvkv67d4hiilzxkoqlrqqb1s1bki7o5eaqv8l1sy9g8p0xpk8utwgjn8e3avf68w4z322gxlya8kja5n1dpi547j1sy362g7puvnuiq4rauu2u4cdu49i0il46wrggdtbsm624kouspf',
                        version: '9j4i1txqt6wzgfckdca7',
                        parameterGroup: 'cyz16y0u040ek1ghq28ayfxr144ht8zon3soana338s14hw0c4kylkn395p006pcojqcb9w6rxp9ecown0h64ax6slq1f8cfablu7ytfe5vm3jac1yyxaa80ztn1cn86vhxtpx8jnge9qv9w7gkep253vokeov1ixfs63u3x2rc1v91s053bgwjqqzstyybqoby91q9otkkfp5j7wa2ypzwvo4z126rqydena20qfbylr7oo854wk0nzuxtz28o',
                        name: 'q8v6oef0j16jvd3ylva8qklg8t6uerq5f5ix2ffpyrihwcmuodktow680f38mldv7887v4wm27ejpok9eaam1zaf8lguu038zzbw8pzm5cmal8q759tnutyam4x74eecd51yprqkom2w327cuchax73htguutzkt1orp8wlo2p22ji1zdf5lqkn7adcf9o0twc8zr5dn4qhhsx71mpkw21gc5v041r0sjz48ljmxgmaw4ka8o0v7waw1ityvdmq6aahkoh6kjvlxz8dl6wn2r5kjw9yywrvna3klcf15ikn7043ah32gvbpx5the3ol4',
                        parameterName: 'ee8y6gp27idhagij720qszf380gtmi83w4b7e7pzc3kz8uykqiff53aeqg1kyph24kunwa44pv9el2ztjs6nl65bmrcow7beupvqcu1khi5wjeij3ke003tjn1rtlv8ckb8682uj6sj6j0jdl0qbuahc2d4hdrqr9uizci8b4gvurlwdvmlnovyr84aymr2z8qwwnmj01daorssrluhvuif9aazxcdtt4ti5qrltdahaxhx4h4dp0buts3jb0io6vnia2tpwklz43cdzdbuanixue4xfp6nqfzlxu7e28jofj9tlc77p93jojk969upw',
                        parameterValue: 'sh19thmricf81ndyfaa2xpctmhxtddvao9i6vbgtow4gxpp3iurex8zhipr3v90czemhkxex90082h9hqd2qki46spfyf8b279gh2t2pu8kx5sw0pq3lpr0xb339gxn2glfluhyf10npowervlq0fzysprry1jxhwj8q5e9jumo5ag99w9uqb888qu5pt12pneary9mktsyzj9qda51722emd0fqlj2cnfgf4kl5wfx7uwwl2t5or2f8guo4v41c2yq2q3mwm5m8x1wq9nb0oqt1wc19vvdw1gnx6daumm4nhztg9zcll3s2s4rv37lmtav35qvgfd34nnoow56067eqxyf0iq9essw3661zfaeua5mhe9qiootzwj7k8lcrl10c7k2cuemkwve5edum7k5skopcdsqcpgsc2wcfdnuynph627uaaz80j8vneavx1dgusxahwyh9ng7ad5ipsq2j0m069baup6jzdzrdzl1msqvtcu3fq2zg0u8nxmco3j8joiz19hzzhvesneswlalqakzq17nmf2f8umdm5s2bexow7cxxl9s6abcdvztic2skcv35p5ewiwmxv2s0e4hnn3sxh4ny1jfmdb24p1abob2b0prvnjan1runpk7vxoflgb6ddnrmm3xmv66jl495v88b3nicxh9l8zqywxzi5vv9kn218h05xioas6264xgnern2rpjbhovuhqhe6q1501rnk5t8aussru7jf0kunmhnl741x4bp0wtys2vjeun5h2tvlz3lrudo6vn2vi96z8ujwz6kzheg37oem0oa8u1yidupdh0fsq15hfdk24lqeenp0rz2eilpfc5j0q6zrlynx5alhlpfnunnp44i5ubeq40cb9vl5gma2deijarvbdcni8eja7219rxjlc00bzf7fdeiz1gtook6lq4boka86gsg3ucgwn2g4254eoro6mu5fp390mm09riws3wrto0qijcadvyo25momspsdwzkih693f6627u4gy4au1exx23ntzkahh0jd4tjdulkz06i7psncbyyyykpk7mm5l2l2w8aok71do11afk6jz46jjmyvntq2log7urrn86onsyugio5kbmnks4ho93uq0tpfwazi1n31j4wfecc520zdd1uivksasyg5wwhz4lt5fdkoo7b9dqo9idqhee30wrrfk7qh1xbf6iuwg77h8rsp3ug4mcl9b6n76ocpmaateo2822dlaxl640cr3m8hqjld30ac7a6guja485ugnwgsib39lzgebh5v3672ft2bdnpmn3lvh2jhz55pi3abrqcqcll2keh2bs0saf9b0yuq7g4axl6rvwhc2epy79opnhfp8tnr2grbvc0h010i0r78f2x7x86o5o3r3ep3fsqr3fczn02d8nvg6e3o341ejpc1frszilo0r64kknqtn28o5jpegjv1fw9nulg1ixotilvg25p4dtn9ox0wb1mztz6p3qq7whemnm4gk2t1hf6zaoo1hq38y7rvm9uefpwdpxf92cn64r3zv64tnru8t9yzezgwyqrlzxezres1e3pg4pmhk29bksiikfitaknmexv6sgm88a21g4iw18ad4np4fvaf6ps85si41dnkigrrqlxe60xsssrxvvbirc1740djvn88zm93re7xojqmebfvactgpv6sewuiy1wt2jk5qkdgcv8q1wqhhnzhrwikuxkj3ah3u8x5plxqo3aj3bqiag5t1v5qgbonoeajqq97k1xk8fibidgrxea2q5yzp7kek97go6bdkc8lvyc7tm327mefo30v9prmr9v2zpvujyavj35mv087qwe9fvegbh7nnmj8vldtv7ksginyz7d5xy0eslppcap1f1hyjltix9bx46aay4puru4s2iuf5wslnyjo6kwonhz38qjqs0qkpnrj0h7olxy9xu3quw84wrdw3rc0hg5924nw50hiky706h8zuuvxpodolu9ugf2tyqxmsnqq6j3s00nczf7y57tsl3iqezx64nj',
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

    test(`/GraphQL cciUpdateModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateModuleInput!)
                    {
                        cciUpdateModule (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                        
                        id: 'b4913af8-c04a-4c42-89b8-97f452264102',
                        tenantId: '44942e49-7ed7-4dff-9234-3923a5ea0fd4',
                        tenantCode: '39w7new5q7qmsa2yhdn4nrihmjca7kyt01qgpbzgf94hnowtpv',
                        systemId: 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428',
                        systemName: '30jhwb3sdrynz6tec5jy',
                        channelHash: '0mcdfc6y5brd2veknv8omjsysg2ig91kxcth1r0d',
                        channelParty: '8a0790bhr4asjhw85c1ly1i74cz0k4nyir1lf297ytv37nos3lvpgez69u3kls148vxhrnqt2s7z31h5d394dv2xjiasfv4t890xgayitclo23dzei97w6ve6a61w77espfgva4ny8hu6mmdbo5cna0l0zpsj3en',
                        channelComponent: 'cs4h0cwubara8g6pujypnywa72748e2w7oe4e937ii1lhtbkwl9oycpkcmbtz7q1zj85f3gn0q65aidsj0ym24ao2f3q9a9cpkeivbv3xabyfafz9q9vsg7lv4c8p6j0kiziyegazwmhh96uf38f30j5158zwt22',
                        channelName: 'ezy76hagnaxvfwjmrua38mgy1wigwr35b8nxqr5rvgx0ei2i39kl4rx66s1fydfq0b0i50m659qo6lif24gwddl1nxjv2bd7fompt6ynjyr274y24zcvdi0y35691mit0wlyfryanqsai6ogypwh0gzysfcefxyg',
                        flowHash: 'bphje96wcps5slgik1ghofb2fg3s68wd0iq28hcr',
                        flowParty: 'dou8xcztfxxrhn89lfesvatnwdb5rdqog84p7daz1v7pon9r3faifcdtlwvz44ill8t23ul6tzo84bjzrkr82iv9pulj6eiyuhjhodhglnv4wocwezli3puxflntv0x7cx5ecyxmj79b0pz007kv3g1fi3fzf66q',
                        flowReceiverParty: 'ejtx56qv2yukd6ri43u8c18z1pu4uo96k162v281xwu73h9rt9a4emoqc5o9j1ioodj5ilz8t7swhd6i1fkn2ngusldu3pwwtuox0547oq2eb5mecjs5ziimfm33d4bwj4evt9tlxwz6c8rwp6dpsqvd3vtk8rvi',
                        flowComponent: 'jqsa52p600924ktvvwmb97g2qlouyw41giuywyj2y34a1u06ovucuvoyzhcp73vv00bmegnmdq1v9xoldz1kb7z0e0b1dxqwu4beenumqzrlzam4fpqda6kq7cwfeubv5wnobrs31rm396ic6xjm6ayviicltwdo',
                        flowReceiverComponent: '0x1y148g4n6y6ybvrjn7v3ske7ttuxflhix7uciolhikkbqa4cfow0wvzijcxkfugn55bnhgpvdsj5fbydswb61gbdhczjxa5hvxihcsflc3thionglcgf4gmalb2oklai611xywttums4u9eyumvxpc7vif1ryd',
                        flowInterfaceName: 'zp04ui5d8h92sq4f07gwhilvz4m4msuxp2sml0e88tte8go7maqabi76gc9our2cknjpqczvtz8cnnhm8m939z4j42vy1ocrbuwky0uiqw6ewdve9c8qkaqevd0po7193kprdzoqedxjksib2pt0sitfx2edxv3r',
                        flowInterfaceNamespace: 'nolrasvzphs8mtamu7dkzbph8tj6auhsboq989p5wpbc4ahf4olcii16oge9ujenan7vzo5c526r0trroffe7srcmj44jkohlsy673nwoxzfcqmx3y1r6u5z71fb8k6i5s4u82p7pewdsxpd7uoxegkkjxzo7ide',
                        version: 'bxyitsemcq0kqpx6d5bd',
                        parameterGroup: '8iwqr8tnkxuovf9jzlmu9b94ntbhihchn4w18vu81a97183c9xashu477e1rfj7w5nye675snmjgba77t65m8ulswycq9p8ln1vpbr8ohsehh1obn918jwbi9vrdt8q51hgqubfv26jw43ny1d9uateqv1jmdffwusfyv0a9c3upd34ch2022i36pv9xel49m9cd0vknj7m5r8w1o5j0k3d0gtdwodewcdky7ioh8dq374wp0zsg11ia5hjfc87',
                        name: 'h56170tu4rayaviolazi30o4yejp6jz3qtqu2pr2dnkh1492iyc6a3hzhmaj7o6wlcht75mxe6h07df4i8nig6t04uuw13rwubj244k3whrzp61hlnnug1r822bpim8xejij9ktbyyi2uy928a9feyoxodoqzexish6oey6zy8w81nxbt7kcfvv4i25n0tpagq1dmpiqib6qubrxame52rj865kt003ugea6tqd3i1zm96vl7xswbloa26gq25kvqc46j1wopcgwrs59muycu57b6yrcuyznw0a781xpzkyda7ykn3mex77s95uen6ec',
                        parameterName: '221a0jgmaeyh07rpn537equ9ea7abo0lg9xl4x1get4xvt6upm077a9fudpdj1ig7n0vn9jlbj6jahhskvx0f9evpts11pl6bi4yt2qhy9oun9hqajcoq19fimgwgc7w38khmcunvsxiu068bi2onkzdqu9jhwr9o33vxadrkjnffozh0pjn2i763zfarr1z5wf8415k2hibof0bsotxd2fbqj8s2f8brp7eslmozi4rlnhktx9eqpnyozg1ip6ofklu1rjf338rqxglihm4j60wreu9mg3aewq2qteg2ort8wqjvufa1tjakqkvzacy',
                        parameterValue: 'h1stsgu29k93h1bywqb0x9ojqfzggcbcx5w3j06z2xqikt1yzb0uk0qe4ssese4xlk9ce8q5frrtx4168wedmtfa03ahv8mjlcubrgedb1c4gut84l0u8qxbhms688ss9vhs3rnchc20app5wq71yqjfg6zpz2jb1gnzy4bzxyzqjhjyvybdbm5myub80tki7dvb20b4xn4a77nhielwqblk2km58e371ws9h21tox6yedz7tzdwx8cjet7o2i9cliddyj5su9fud5pufu37im8zwhfdpnvo7zsyzgnap2pysi5wmz50wh2v7z4au3f32ig2pdapzpf1gv4nao5izt9cy2viczmcdr240l6rbj7ywbsmyotwpxs6u7hizswk0gwffx4vpgqebdssmcmssv7u4obrcaha5041sfq8zt9m47nvmle9bmqd9nrsch8rr8pumu0og1eua789u2z1lkbaqxldw8qqzqmet36mgv2ye8qlc6sf3mffam4r2bnoe8mgdy8a9vp9pfiesjfeye4aptxvpqo5rghqykrflh8vy9xfqfipjg0bhb992sd4y2mj1kkspu0tljbdz7542zken8qysb9zervlycwvrw3ibu92ygpbh5mk5zz2r9kyh34iwoln82ajntzmexakywqy9q9efl5fc0gsw1fdayylspgmkta51wfg5ydw87puo9dv22m66pfgccy5qnw9ea9fbsjxi14e32i6gwzs5hmutuazm66x3g5h8q7jwbnr3f7omcap7bzu86kgmim0eop4895zothru9hc8o1h2j0l6s5hhm2s10tmfqfxezznpuqp04uoke13arkun2vojioqiju8m2ktwrccahl6efdldtpan93w887kbgxy6oesx3aztov7tfhc0h7qeanysup3mkkjghryb3bahjz9k4nfnq564k6qbv4ikk49ji25yuka8pfthmb1mu8hyx0ymt2bqu89bh4ao0qz8tvq5cyjiqfylqxktgfby95wh5m0hfyp4o71g9pfup8m9boxczt1nynacknanj13rr1qow215cqpvu72zdxxfxyw2p5j9mfce4w7m6bsdlnrtiq9shbi8fj1skyc4ybzzhk6icsxgwaeb1cz7a4vfaigaxty6lttmogghttgf1s9pf37bww9apcf3177nhsrzg6zgefomme1aiwx5nkvgqiuyjt8xnc9gv9nvj71fkus5f8a1kv4y6x0kueearo60xv82xvd2cq251nllgxgw60bzvmeft6vz61ve2nlfkmx3elsyu3uhpbm2srsr61i25s0gf747pa77091oynpxlj2pm8wwfb1s6lmokxyrmic0c833r3mzhx1ogj27snh17556bq1s7bfvz6lejw85newjersns78xgdrtc852v2t2uoih3jptct0satvrqrhbsiklep2sqbnib7x6jmahbdoz15tiqnwzjndzcpei1v7ksrguoodoegf7348d5uy2kt14v8uyy5r9lffop0m7f3j4nbh0aw9eva5s71lc7kdrrwt8k2ghddth7l0jzp56s0gk496q7oz36yj9w9omwn9zq6sjs5yyosc90dbzgwkld5i9iqf37r7yt9ej81w7g77o1mp02pnjb7vzfyttjrkn8e1lyf23peysw17ne0g3dii1jxeyjnqcfzyfvh24adsppd1krn4yqn2oi14vxvhat68a7fxzlj35geu02pqurfwhtoucac4h6oppizs05uvi3tbobzmvhh0vo0sxehjdk5620o6ps6wzka4600ipmjgfk71zu34atlg9drmsemqz94o73tye76i5rs8fdp6sovnhskadtgolz5hrfsmiys06b49csmf6vov7spevjw1op9y8r73k9yxommdx72r31trip34q690shdgfkgvodz7tx4t7kext43vixc1d01am7li57hu1xng52z2bk9qrt74mahk4d81gf77mt14ue3h0ohicbrwxiav4aqkrl1d9lull5fcuke65verd5017nsh',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateModule.id).toStrictEqual('b4913af8-c04a-4c42-89b8-97f452264102');
            });
    });

    test(`/GraphQL cciDeleteModuleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteModuleById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                    id: '4c72bef5-5b30-4ea8-9305-9c396aee492a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteModuleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteModuleById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                    id: 'b4913af8-c04a-4c42-89b8-97f452264102'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteModuleById.id).toStrictEqual('b4913af8-c04a-4c42-89b8-97f452264102');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});