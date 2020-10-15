import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelRepository } from '@hades/cci/channel/domain/channel.repository';
import { MockChannelRepository } from '@hades/cci/channel/infrastructure/mock/mock-channel.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
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
            .overrideProvider(IChannelRepository)
            .useClass(MockChannelRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockChannelRepository>module.get<IChannelRepository>(IChannelRepository);

        await app.init();
    });

    test(`/REST:POST cci/channel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: null,
                hash: 'ao2c6jp8v6bziz8458uivqhai9eoayu4s33jv3x9',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: '8rjs5946de7eg2lapag66pe4qava19iok9n5jz4595mol450ws',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'b93owdlmiea9sdtpgr3o',
                party: 'wa1k63hwfvd3drb6w8tu4ycjtu98qhqox8h0lphetj1zn8q16ni04fcj2fb9xv5fvhp238txh8kcdby7kbdwlgyn8gpow35xzazxndq5kwm8syq2g2b4zkejg07y09jng9mrfkypdnb7aec1yjndf0yb9iuo4gsa',
                component: 'babg9t4ejdryf64nnkpmk6woruy2mxtrt57n1sscsj4ixucwbicprvzbe0v847sbcp0wdxbzfe3ve9ur8b1easckatitk8ge5h65rbygb426czc6iscs41k5dbnp50xvwksv4sc9rr5qumjuymv2g66wsjrxdvmw',
                name: 'xeom6jffj1odf6e8eq6l750hkk5wwz8wi9im7k0p0xccy579xmz1zu6hqijva5au9inpao93ctwwxikgjmfcv35882pbb3zhk9f345kd0nf8rord2yai2s6qqnltad81taqs868lu6sf1hc4s9x7nvyka9doje1o',
                flowHash: 'ajekknsl91gafbqcawuq7tqivc49kh3nydtp3qlg',
                flowParty: '79enzfynknozvqyn11cu7wb6zowysbsbh3nffpomlpveupqdoseglj4p1686aik9ixxc5dq3880tkilus2i9xbo0lleg6ue30njftevju5a25aksi1du1besije2qe83m0aog0j03p1qbtkwq0v4d2823mtxnkab',
                flowReceiverParty: '1cbk9qje3cb6mljsx89trztsdh8khkzjyvgtahqu2lyp5vvpbbwefx2mxr1v1mg20ss2pxwmi4b5gly6pj6pja0tgpp7xfsv9xkq3zz1wohid428nrjsjwx3mbfds6ibw9tnneqcelz4fgz2z8ar1lcdoeoqrddk',
                flowComponent: 'fu5outarrqq7w906vcu37ch3kspu3zebv5otujr9qry8r7ojfnhdga8xq6o7wcj9nvf6hvdi02s3guorpbreq0lrgpajyisyv7hgtjhx6j3s6p56bcatm99mrusxf53djed5zgt3saiq2e8u039jxhudk3v0v1tm',
                flowReceiverComponent: '4lmt248m351lpf1p2j2h9a3rxkw6rf9gnn5v9gso87j5smofpz8gdtpp2pw73kptwi41j7hl4z0acfhf8m9rjceitxwyc46bdq2t6fzdn44ubvus8axdx10lhe3ikjfei7k8s9bc9e18vaj119nnxek4k3wqt8bw',
                flowInterfaceName: 'yv9l10ndnd6707unsnwrfhx0wtxqmxzf3ydogudrrsoqvnzseaaf0slt8hf2li1h87k8zd1z5bq23svqkbuifax3losex3ukm1bwur0hc4eny4qz1dxybxs61ryenlixoza27plioz6yokmsaiiosv99f6nhm4m2',
                flowInterfaceNamespace: '6t51dtu8hm03w7anmrzxjck6metz7y0ddrmp4o6nk5vd34in46gx5tamozdvkfgn5tlvaxlmuxwjk9jtbu1zzss3bzp8twisbnwvihq8hwnc92hkpm76vfx9q7bzt8oys55hyfigkngrnp4i8dmibopqrkrgcsjj',
                version: 'u438y393tic0vjq2z6d5',
                adapterType: 'u7sd9x319aajmqsb68657tyfw81c12rn44kbbk6hgbg1ld0rv0no47oinh6f',
                direction: 'SENDER',
                transportProtocol: 'fgk9oj0r4dxr2g04d83kp2cjx9ep185p0mlh4hs8svprs33ymzn3d9dp7em0',
                messageProtocol: '8448lchun3pderhq04nnipdcdw9q8xt1mgri8gdj1vf2gwpkfux1a1umn4zz',
                adapterEngineName: 'hq8fzm9iy1li4q1fnpj6kypt84o2abcc670s5f7ek0hj08mo3sz8x7n5eliae6tddhsfiz7zzru43g6jsj0qo8t3ebcmh17j2uzge423fa8dcu7icjk9msuqyv96ttghx2mqoopskbj44bkvsgljey1ygh6b2d2t',
                url: '0y856nq01w34wzr6da4u65u0uegi1edl668zsh7nqtryf8vije89po4irl02v7af0ap6k669iom1cmfhdunjiqnqtfscznsfw6l1o0uym598btldrvuwjk3m60x7rhxkiepy60w2804e7ntg4eeeln9li8apiiafcrbdzjz7rt8zg5tglyro59i063d2mb17p2pwq1xl226xiyqfk0wjy7uc1xbdpef5l056mzpo6zls207z5r3x8qfgn23m0qj70qyyr9dpe4sbjjuyzpsr8n5qxuh5xwemqw34wnk1mn8vrbco2zdtmex53qyv4g50',
                username: 'r7wo08g7b8j51mcywtppscczviqdoi7324mey19khkdqp2354ggk5zbiby88',
                remoteHost: '757iz3bge9y5gtl7y5nq8a3q3b7154hoelyjhcobkwp3srclxm0vidttf2lmt7qt9h1ul8s7j3db75vs8fi7pupnct578ktr53xoeju4cr5bvqzb1nd6sz81nj8bd4wooqsd96cpy84i71b1yda15awn1e984oyf',
                remotePort: 2365735295,
                directory: 'bd6ahha714p5pwbkwsr8govuldfw6kjhb62w82kruehhemqpq7lolpjih0djf9zty2ulbta5lcj68e0d3o80fdexrciml1wbnveidjiqbbwsrbf4qpdt67rys2c4jww24dn77jovcd2mcb1kv69q2wp1rggulfcs3jmk3wcdwuxqm2wkao6a8aw5ccdbsc50xfjrh1avkcj7b070003dru7x4645fa5cbilx6pmdyhc8gb32xx9qt8keo11yv1omv61lvvcetj5n07uk07xnmayibwnz4i75rhlzi7srfpsstx3lauh0l8k1mjxge5065szymuu59zvpu5yffh3slypy50kb3svcpfgbbx0xajrd0qd3r0fjq8ylb7p53knb8x9kqtk7jg9187u8uf3we1u22pbgph6f61cvwdbn2d9xba2pwab23z84fh3pkv9vn13buk19tr52pseqo8ho41w3bvoqhf5pb8kqum8hzdc0rr6zuz75z6lyg0nbp3tlavy9566jycm77kfu2ydap0tr3rb0mr7hbedc9i3phgr723q3474epp4eqe3dvxa6cl0x6vatpnmcw4t55to498dpw47g04zlhz08hi9inynlumdqkex5jjew89ymiwshegyp7m1luk2tu6e4eoyodlmld5whgqzzdt322y9ksm3yxq6azbhce3i6sit5lopqgy1slag6mukv17k1vka9lrmx2sfxbojpt05k5uargcr9t8v1wbcajyp31vwy0i6leit21n2i3sb5tnm574jo0n7y4wrl115fcaq72carmhar04ppmtqb1mloc088fjvpuduvbybobcfqt5v2gj7yrgvi7zvm7qtk6f219jlqi8hlbv9sbhm7346hrald49zdn7kj3ypkf0zewi6jnxt7xb9249vk1x5vc9oos8tj4ergu6ig0bd0sxllbag92ds7hgknywab5yrufhre6vtfm1dewjlw8kph7yjciwo78nugjfco8fmddjhpzewdvag7',
                fileSchema: 'd6howfab0zx6z8xxh8p49glb2zery809902bsx4fhj2yj6pd8jjl25ftrupx791snvy519e87xyzlj4ir7l1qyrz6wod4ub2y67tfzv7l838vo42x13c1kv83vb5wjge0v8nrkd9eb2dez3nw8n3gz2fbg706zocytintylbdtinni4o00k1rciabq0hyhsnu8x9457fm5ayigb9dap8ttdf7yj3j1hd9vqep46hd9xlltfiw71vphmz7yes7qybwg0ahq1ojr8gb7iq6r4m4cwhf8otwq4bxvs1p69lchfn545j5cv4uvvrrlewxssvzr9dksgczhsta9f8fwrx48o8aznyia79gr1he6w0zklft9jfeaxflrb1ukfgrrvdtto6xqv93mh4mypnzv3pah3ve5d7newhggdzvvgqfzeahc8no1jefa35chqo4xo5doyc8xd0ban557sfcknnm0fem3m7s34ufgtgjm7asbz857jdsmcdre5s2eke2sbhvg7p03pf0l5mo96o08y3rnjd6hwgvw7s3bsu9djwwhsdtd7tp7c6krko42wppe2zbqwqvm9aee4g3gbn6s0ytkcwugdi8t4flyri27u2uozjiwiq274um0boqn1y1ic0d12cto9rw3yj77741kem4ra00j790mmb7pvmpi11462tjjcc3qfaxnr3jaq6kjf571ft6t1c1oiy0sgyras1d4vc1s0qrmagkfbgibytdipsc68qqwj9rmnms2r56cc778t8j8ayrzxns7brutkvjm0c9gmv41jt28fay6sxhyckh4g8jdxwklqbmrkgivcerwyd82hr22m23z1kulvkx0rql45palvjj0xc79i51hez15tdwgo55sadhye0stkedxi2c43i9syt4l7279zi24cw7o92bw233jupq24ws9e1wht8zzslaqu4uitozrabpx5sr7yy8ly1v46jicd63h7k0qgd8xeh45mwsj4835h8pcjwdkoht23a5hz6lhcv',
                proxyHost: 'tjzccq5y3dttkx1kwafg2os003x4gws5wpkkjsaq7kfxbkvsjarptg47882u',
                proxyPort: 3042919067,
                destination: 'xliz21jvxpxris6x36s00udl4z51z5l6r5a5vallv7ongl6y8t1ak6vlibfsq32ixldgl99itkqbetslilhwtn3jpan9g6la2iqgzd6szt90w16l4bv0v9et5mkz5ib35wylk159kpmio8jk2z4qrruu2498zwij',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '3dli7wq68tpnrrszcj24ea2hribok2udfalzqxce5diwxx6ifyp2577aafezuvggtn191tdg5a4jbkir5yz8r92hfsrq4dtkd3i1n0idwc6drk42hjqrbleukuf140eefycjjq798qakgt9lh8l5rjcrupjouwu4',
                responsibleUserAccountName: 'ignn0e119ach5jwfgwbp',
                lastChangeUserAccount: 'dhvwhf3l1zfos9xz112q',
                lastChangedAt: '2020-10-14 08:24:21',
                riInterfaceName: 'ozgqlvj7sxw6gdt1wm02n3rei2jgqa9dfaquz23g6miyqhhwzfmwoaiywo7krogjba0mzcjzb0gtqe78jbooe0fi2q76jj2tgisbtrfuu3p4br0hu25iq1nw98femlco4k4met97uzx5j7p7sx0da5vkpue2zz2n',
                riInterfaceNamespace: '347xdp2smwqt77tsg4fatbiqekst9sp8q3cf8hpr9bd280hty33s96psn6tl8ahhcoh5378l1yk1tp5z6qoh61uctbyhph4arnbir1q85iavaokztvwugx4akqjjbiip9ae20yp3vk1sha80717gvyn6i6ng710n',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                
                hash: '4m5e8s481lt5jefvd0fb1g4u95su73lmlo6o6zx2',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'z76j31ia3oepasuoixp0nxy5nsrorc0wrre7pqrtivj17kwjue',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'h05hvun4tqgove0i1x38',
                party: 'tirpl2k4nxjku1pbepvy0wm170z29bu83k9mbxjvk3pkxbto2zen9t5ya9a4n2g910vljywrjsgbgqtp2w22sekhpjcawk2ml9jhump7d19k4t2pouzt83hl0e8dsq4h3y2iyxhc7ozd4ljp0p032zee4p04ok3x',
                component: 'vra6bxnkvyhzasitboktlbihvfynedmmc77le3iw5zgbw4p7lyl0izwvgodhtouz2bvvlmudl7zbcbt120ryem8jyo7sm39tahqpcfw3f2s9gu1otlw06trvjmm7pnz78hhk9z8nn1ysjynvt84vzzcwg12xvc4o',
                name: 'qoyi76x2auw1dgt7jre6y6rgnumpwce5lgufpkj14no169zdbbdwc2bei1z7f0yrs6q7qg66uoggray46o0q1i6l2gp7dr762d4xluxid5c0ny6un94da260pjh3j9cgzvb6yzlvnogpuvygym137xfkz91rblf7',
                flowHash: 's1h7cec2j1znlqfiq42xvt1s3eho8zek1wzlgae9',
                flowParty: 'aavfcxdakzhq9c6g7nym1u035amfhpjd6vsc4av9n711tdn9usq3aazvwaecgu90a3608ew6ufijt3wt59h43iqufckbhc9iyto7p6arg4iqw1ykg0duh4e7gb6vwxtlib25xhu2y20xemw2apyjz065576rt2gs',
                flowReceiverParty: 'v8v5shwq6hnxytd5f6ca9597ukmo4qzlsasmlu9f7vpk1mmg1stuntw7d6xwnzss7zeze4udioc5q3vgby37lcae3y0mc35nqjhbvsex547r2w0mlq1gfxp7szmugpl81n9amiq1oy4lkbq0dwwj6m89fh98p1gb',
                flowComponent: '49508vex668tlscz4d2s3eilmr6gu2dv7y8nscbpg9woc6ikdr1ibi529jxtidg45js39qcwjckgeewxqycp1pibg7tfm52bge8vaoxy4ta3xrke6l45y79u9hhyntlb2j0r0m34wvuzy5shed9kb31g0z5j7zmq',
                flowReceiverComponent: '8d8u8vhussv1ygvzjhbad5euk9lx1ceh1vkxn9rp4x3p9h3jzida8t4k7u5n7v1rbq86780tnj5hbm2bsqq1ja52t4uhc8gtu7y3q2crrescr5dhio8r27hoqbhe2kkp20qll4gnhn88ksoekhkbexb31u8zmh08',
                flowInterfaceName: 'j6lucgctgx091501nbdh2hoteq61g2lznyqcsyouxllya9a58sx8ggepr0xk5aihex03e5jfsyevsj1rnnml3u2uitqrb907c1jo2sudvcg8h49owxa9lt6zz3l3gou3ja69apcgd6w23jz67gc7l5acn9qltqad',
                flowInterfaceNamespace: 'hwnvfk2fhv5elyc29x5ehj9b1ehkb7dgbshv03k47mmkfftlbeeca5m6o20n80drvblaxqb51iblazv0ybpqiqb2b1zmn94rzwk5x1eagmhn8anrun6vvwci3l47aiecxtu1zh9k0xz1j346i10ptv9xfk0dxzja',
                version: '7g4r71wn5gw8cganm2z9',
                adapterType: '5hc74ul08hxr6k9t30mukh7e6c7wkrlt45009739jssuksozvss6mmemimxn',
                direction: 'SENDER',
                transportProtocol: 'oqhhftf5fcfg8d5ztgti818zj4hkzgov1aolavzlke41d75aq8g9vvrc7fyy',
                messageProtocol: 'v39qmlujkzll2hsu0u21fjogjg8mk9j0qjh6ky7wsyax7fmvmogwwbb60x06',
                adapterEngineName: 'e3tx87p6glfal0pzrxzhazazd064x9nevkxj9eyuwnua97w81jta8f29ssw08sdbremhu5dv0cajhi08a1jkr1ueubitymqq2hlzk6mn7o9wxtsh87hfvgf913dbi9sn4nzfpc9mq9fuvfk76sfe8zpuhsr98ybo',
                url: 'g4y74tk2of4fegcj81siibpc5ucqi9cdv3npv71wtgi1qtc4l2pl202havete61boqyfrn41hfhb613kqhv852mijyavp6ufxmtvsga6klhw1y5ugxh8gyfp4tgkbdpmuitxd4n7copevo2vefjw2jy796k0850bmtot5yz50n4udgrithjfxmdsvfl5vkiq7rwj4b180o8ri04qxr5qv5x9kihy1bg3fcavwuipwj7on6zbazbiowljwkffpdx7vpznl76vx8d4ar2xd35oiqacsi7f4kaz1ez1s8u2z6q3d0kjou2sfhuzqiihs3ee',
                username: 'zfdhbnuuelg3ue59ju0h0mklxwc0l6ekf3iggqvgkybwu0nu9dlxklavp0vw',
                remoteHost: '4avgsmck7ryp35i2k2ygfnp6u83md0s5o6q2vm4dkrohmrtc4osoocwm9a6ojg5yygjp7amz2mrj5o1uwxxh27fqaz7w6e61p5ht2xprk6bxdxdkke9b5f6uomtorhj8sb86jnjtng54j3ocilw6gqlmva6ieuxs',
                remotePort: 7587776100,
                directory: 'n7nfua49qypvshvbh9iws3d2azz1y0f3ar74fbhmvk71l63la0paaufjq4z54dyhpi26sjnjg7t6yojvnvjpk7iy9jecn9f223a2aj7gqhil5n6utua9dp3ufv27vvrgojih8sfjeetc2lwr4tjdkbsdpoq3spwjfh8z2c2a31j0o97eonf3hd3ep5y41n6jxwft1hr4j10pem4tzo09l2bdkprv8az7aeriy7me37xfm2fqocmhadr67w0fz492p6giup2czkzs63m6ir81dnqw5trzjonjpxa8umdz2rqfnms76x7ombxntkq0l2yqlmxvpja5lzaikv2dovbxpw32sq3xbwoe8d33hgkh05x8ri4sm4ouq7gm9pai02q2sjb4uyfmzqru0vxeavk0q0ds8zkfb5af2dh7jghckcsrvj4j6um0ntzi03eyc3xwg3k7rew6zzcj36uo38vuhaboerivdq9x2b3dl6yrrvqsia3lhmkwywqseav9hygg83wncgxwxz2ov1wn6528qa8hbu7mgxmmvknqxwldm9hkpz7vghz3pb07k9hzuqn2nhh9j3tw51ckv4x918wln64jrcjsc4hlx5osk3grk7k64ugdxdohwv5jz8dcarxp8udckta23clbawbh8vhyu0iaynks7c7jmszyiv6za3mgt6pezqw9uhu3cebkohp0pcso93sts3xxlt8g8n4vphph3x6l3kdmgcga8qlr83hvuklucqvwqjma6jpzrj8mfzwiq5idka5ehosrng655mtepv063udwgy22yzqra9mzbdbxgydcu6iihmalur4cs543pio8ohknekwmc73hieygzr9zxpyuyxtleiwwm1n4xx2d47sizqegunnsq8k0x40ibvhipoeihxxswpqm9jer28be1gxyzlncgpv51esp7bzofuxwr3j838b059fri6ezuc5guroogme9sxne7f7s8hh7h8yauyf2cmxdykr87jomout9zws73z0x9eo4',
                fileSchema: '6udf9qkldakntjy8bgadn7uiwrg6vz90sgw3va9i3kj9tp88lz3autiryhv7eybq6z9imlp1m9o66dtyuwkce7eqs475w2yqnpnlrrsu7vgrww2q2ctun5pbc3on68w4ier0pakkfk7huf88bd6mxz87qlnofeodjdl29khf0qsp93az1bc5qn04g3iz3fk4dnfvax7k6ttwus0smjcu5zag76gw5qik8cggawxx8kr9ulx0rdjf8jemslnjj7dlw2d7jmv8wha41a9k137swt4umtgwexzz46xlqsdohs0shgvqtj4hzjdcomlei5onqvju4ef8jd3wjjq3ajb7gglxon0rujns1k8tv4iztvcdl6d7zfqwfk2m0455c9m0922gadhkmla5jz55au0z58fmcx9auq6f5sgvz9u5mkap2w962brzo0nkbpr85u0puisznh7zzr2b3f217b1nm49u6mddsofhh7rinkhwq271e5gsqr80hy2w8f8ht46xulfllespg7macq7dz6wzyxkcpjo5pz8sv3mdjajyojfngjauxg1apsclbk2gor26gokrutmm2tyn8dkb5a3qj3cf7sz70h1uygjo0n8an3swjh5lb3qn06xyqzr8zwu4usgw50nw3bivv8oedjagayn8mksaobelltt2n62xt4lcq6f9m9z7nmvwgb6p4hc2cp2394cxrg3thpb34cr2rogksf6oqtehrzqyqxuw4rupia9bpphgbi408076oirfecvwd1rcx7h59paqy1ctz1qzpsx7bugup38g66gqx2l9tgrjjh3pzt3zumczvr9oo1mofwwry6rznjuxhkcetx6mmrpvz5ba3nkfvoutecygs16qmm9cu1uz5h66hm75khe5vayjkpzr1hq2b9g9nyy5xdb8m342sctrfsui6gy19ouduxfks226j4zhpiubbyljcin4yyvyviik186ptbe0eowko43y45fuqes91p8ydbt4m2syqxnqzci8jabg',
                proxyHost: 'mj5ii8o8idpsgzidal921yg1qvxbgpdgknilapu7z29olhh6x08hxd5intfv',
                proxyPort: 5306444721,
                destination: 's015cmsric11k3xn6k8frfe6wq8bysqr3hkln75osjccmqzu50ta6o6ghx16mnfn7tl1ml9xythruitjlfey3597d25ja7drlt293hxk5qx1ukqvgwadr7byjlng0u7op88e8s1k0gtjzqaaxdoou8fhs30p3g4m',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'qm0bczrblskisg6s5kf22oqn3vri8rzksp1kjs6oqlw96kjl323pqot9ftdxx04dhfpej987w2rxmd1dezabnoakec1ro03yh12udw4ohaeubpvx4a96sa1wvqowogdb2euhinznz0ugs2hqgjojix2pj8yzmdh7',
                responsibleUserAccountName: '9a40p9bwavj9ixh50tds',
                lastChangeUserAccount: 'rb3lhyximq4dnjktv89z',
                lastChangedAt: '2020-10-14 08:39:16',
                riInterfaceName: 'mkiq6tgibzd02e6fyefmcgwqeon7bhuhgcu9wi069d1bb9iu83obon9qmc16fd31ywudn50h37ecajsxyc9uh9thhk2pvqtanbc22b811bpjuajynwgeieszgwi2stxwhoehx98gkj2aoca2yd8j2t8i88m3nh85',
                riInterfaceNamespace: 'ax3oorqytmhk9xbclk8wiwnupey116jjyw24fuqiv2n36p55asd81sflpss92nc9ncz73dx1ip8qkon66yrcbs84lnj3qqrldx8tbybblyot409vycg3ggzsg2yiipbzzz7k6ssy9mo5oykunf4c97amla1sr8mz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: null,
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'm4pbc5f4r4782a0amgz3twgbkpauxerc9nucp95omfafe8qt6s',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'et4tlx3kgafkant5ww89',
                party: 'ebmn19fjsb9asi21rvoevfr71kx4t1oi3go16g85jbf6xf8xobz5tho331l9sfu11uci6ys736oi1rdahojtjeftp7kgdlcj3d4wn499inqm182mfx750vpyorknnsdlz3ft5d5eg6603u65zbepe7yyk2vbk4tl',
                component: 'b0hboexdhj009kembqjgt6n4bjtrkjo7kqcu30xqzzhucnq7hjk02a8jpsntkhicq62kdfn4acroh5cxykkzstx51wgowy44so3cip4qg1imo3a4qjnz0atu64e9zveh98xeses0m26kc2k6n7iznc0xxwagl7ew',
                name: 'k4e3h980pac9z3dbof1otd0el1pdzyio4appazht5s23uwmvp3qprvcr27ez8s67nxcsc5k66zn6rows31jdm73kzfbu3ptdz2uu9qxilagbdji9docvgahs9s9udwkof5t785u54xq0p3ohoeyzftgixcvhzmce',
                flowHash: 'wjwc6rl0z8ls30z68bu8lkjqqkvc60485okjnvzw',
                flowParty: 'p6wl94at30bo84md1ihovjli6i6exrgrkstqx0w1pq4kr4xrmseoyoeqmp2hk55x9591q9bp7ttbwt41lqepnf6rr5qarkud3dpjwnlelv9r0nxbgrlhq049yoswdtl0t58qjnlcskltfmj2zkbuav8v20qdmfa0',
                flowReceiverParty: 'j4jhso5w5ldzltol39mibc30kkxld3hfi4kxqww0xrfckenczqc2qg9flh0me8si5atoi9dvui6xy8wcn5ppfwcjyacfz5t2f9ccl82bmy7gdarb325tf5mcvwvp0khb4ulzhs61gsopfz10anb58criimvss0iz',
                flowComponent: 'y8j4k7nqqfmhfke2pdbefxmm8r5nwb2br4mit6n21wqz6jzv43wezd6f8otee0qc6pclmx4zodxmi19p9qszpj3uph44vcfoa9hjv1qghmo4ajo4ionx2si1n93m1e0sfbkn853w46erp9btpmvk5cvmx049thk1',
                flowReceiverComponent: 'wkm5quxe9uovg8sud52whfm2cl2fc9u39ghiiekhpoglvr6z1iksuk7jqjysy5ce9cs4fxnx53eya806butcaftos13m0z0oxacuu3ckhb2tleirjorril5w6qadz7528d786dk8ulmu2a3ejc7n6fbxh0rl5i9w',
                flowInterfaceName: 'w4omn1jtzpshl8yeju0uyjlyml1n30j8o6xu7gyvxvkepujz74z0fcgdt3ui7bei0qcuudy507n9auas9fgfk2p835befzye18hhirz8sncm0povngyqte71wr68411ediordipdb8dhe6w7bffl88h4sys5ot8y',
                flowInterfaceNamespace: '0wnea1cv0610rtwenm7z1h5j094qecnied241x3v3kjow90xgolp7vfsonk82es0zc81olj7iislfzyyvp9benk2jnii8vyiqacelx9mpembkrxp1olys8noidyquh5kj4n47yde03nbthgkkknd1eh9k5jd28y9',
                version: 'isila15hnerbr9el5lyu',
                adapterType: '24kwkzxc5e1vocasavr3trnh379zunokwf2kjmym4tycihf2lh4v4l2j2k15',
                direction: 'RECEIVER',
                transportProtocol: 'syv7dows0khmshcgo747hfhf8wxhbn56tuiiwcmt2hf83f8tppraeadv1r0g',
                messageProtocol: '4k1hzkz1tfh4x4nfbga42wtk46873179z6sjic2ts3ptosi3nhwrjgfv1gt1',
                adapterEngineName: '38e8ukgu98vfylgznk9jkngfaa4gw7cbn5c3wggsqtf8coefb3gw89u7pypwl6twcv0t5g0nl3hds0a6pnd2sxtk89k88vy4rw5smpztq2gr1btebezxg6vzh80czwuk4ekr60s35fayddgzr9bidmovl5fe630x',
                url: '7qlckgikk2sq4s0qwpulcc5j0b6h7f6pf028yl4m4qb6pc8mcczgsxhhq7icjsyrrtjgufeuy0fd2379on4sl9h0iqm9maj1cxlde71wae2cspp2ji2b0gy6z01ddkfwgb3334vi71ggaze7292akey5tq4409wf9wrazl9kjlfaia864hqixn2dpylcb5bhhr3x4vz5x160auavorlqo1lfcznnpvj2y1pt6cs78hfjxaw3znq0objfbeg5gxt58hoj7wms6vqdhr2slgmxn0gfgu6tm5506k012rc59wpi7i4ytyj7b9l8pbmu4pfk',
                username: '55fx349fix2j98kfm7ydlaeijr1mma58lelujieb43wcz2mylh7wxk0hngja',
                remoteHost: 'e0u5f32sf1bssatwzmz3wpdb5rav7t32vb8sau1y3cpw7a3ogsb03kixn105hmn2pjk9pgh4ibyfzi60vzku9kxf6za8ifvuxsnktx32ye6umypcyy2zj61t28qbf5fb9t7ag2d7vd6bvj638qbh38196cqux6h1',
                remotePort: 1505717254,
                directory: '3oqglx8ftmb8jizigbr7crngjvr1mgksttauwaikoojenkzug7hyhx9b6x83qi84jk6jm37oojgvejyhhr7j4xs8oyh8lllrrs2wrug1l6b28f0fsdni43oo9g3fd5c1amv7v7xyyc2ndp9wqzwntd7r01kcnkirykswimddcdftlv6j40e137uvr8dw1sg1n4ske7kwnj5b3a087srsadxwmthndg4bv6oojfzq7nj8zcip48top9udckf86k50w5l9ffuz6dl6gp2uv5qejwq138mthm02s4lnxi8bvxb7couxcc316aw91vcnf9awoq794m7zjpifppg9j6xvol7ex274ldnzbo1i38kz8xiu99nlyxwpktw1ydrdniip6xwzk7ybp3k30h5r49d37r6ehwh9gtj6fohd3afq8yhydio47o6e0anumjue75mlsxcu5jlw8z82cu0p89oy040k8a2oomm73ft1zws6xof8qf555ly6ggprn9y4z01y0flc8izu05u9oz0uj4vukmqtdwtjy3baogqzy1dvthww2w1mzfzaigf046s13neoxszr0p6n641pfn7awvcrj6d7k777n9jc5r4k5qokg4dpwrxvn18svhzgeelr9s80pguv9ki4035vb1rve5kd389xf7lfd7od588wvrh6utssf5a5qzne4n2v8v3znihyxpw7xataas8uj3sieo7u9fpsiy9falv4crojqkv1cifs0igbmcjs7miz8okillk8rhaurtt5moziyrn1du0csyt4av115qwh743c8dggqzy07jzx6r0yvdealhk2qbnqvuuo0x0so39c8rprd3dz82608ir668q1o983cq6mqm42tlijatza48765hj2n6dzmch4zd62cslfsftx04tm8ld9j2s5hje7cwdv3b8pkxqxsyawubaieeln4eyfhbsvsu7ehuw4w41gbker4fkc4y0txrx2rkb7tlf8wdju8a7tit16yejdpqcg1awwfi8k',
                fileSchema: '1s5k05dxcnonfxzf0nwmcvdjkvpk9ev9sjt5m3bqcrhh7d6b0ep5ogun9339nt91vp52j3nbk47243ci7l7ue0h31yrgnv6e4a9whvpoq8fesqqso3dpchnr0lnbgagphyop6sd8txt5oh9u8sfpuveaozvl6733f4d38qp1uxsqp23g0p1k4tgfatwywjyz8j00n6p4crf0uo080sohinil62rlylinxria7ldszdpb07vz2s42k4wvywjqpag9eckyznppu06xudlgyj48bnotr7kgqmnwvc3e98w0a470w6xr8qtqneh90rwp0itp1tja5ub62xf969sf87gt8llo3pwb9gxy6f4qbaurop49xrhn8864ztohrzeiswchd59w5d15hx8lj3liiul5g0cfe9mpan5sozep4ygq8ld58ifp35doiv99vyijw0ye6kbgokfqv57bgr7p5ztqcgd1nuy5xtgzz3gdm5rquocwf65qgf76t7bx06tivkevjly24y78yw14fv9opny7n8suh551rrq3l0lb6wzxbvkmhftad24yo17qu3wrsc8c5qzuqdws4ntob4na3df8y5kg62s0ix41gt9ag9fw0rdcitbt3dt805x48nyz4bse8r2ezs4le4e723yl7hwr36pi26j5k5pez6gwm2vdsksjkgvowm8lyyo3u4f9gf3g2xsj2zyl8mscd1zdkaxm02n0vgucf3bexoamw4q6g4nfxkmcw50cokxrhq281c1pgsafinixszrs6andeozf9kqwhz2qjjdetycv0zdlidjgsfwnw1ik6bokneh30hcmd7i4xyon664ibxn0l68rj5xz9c5ofki3rzzhg7n4ng0cra4d6iy1eu6ctirq9qikur89bxi0rd1bhf3w74il738hgr0gmgnhjsn4wsb8p0y0n1o0r6lcqh9mw3ij8fyyp19n8pt4l5kzeyfddloipq412dfeiq09u5iv0quldk3zas1gdyb05z9xo6n6r3gg',
                proxyHost: '7pzqhn32bjx4hkam8ohy1wqdfdn3u78vntzfcocsde65v7dqsaedb5gxso9h',
                proxyPort: 6274957650,
                destination: 'bqa8ia0f16gsyxaegri32nygxx0ml9bmewxeocvyr74dvtmzq8ijq42l8zvaz643aoop7lttqzrc2yfdd7ocxuleg01tankrp8v1lbj0k4ntgvjo97nglt6h3fg8i1fiymku9pjt7y6350t6j8viakeq7hij6u3w',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '0uq3m1fbkua2tg7l05beu4h3l55kwfvadb90tofmupcthyb1t1pyll2myjjpe5ni89mf2c62ufmvf45uuimu8wzybjlf21vf5k1t1eia7k0wiszx8swut23thmlt05h9drcyh7c01t3jgwg0gd7rtifs0zexykol',
                responsibleUserAccountName: 'ktyanuzljd8jqb7hinrv',
                lastChangeUserAccount: 'ilw7l69eh0se7odoq0c0',
                lastChangedAt: '2020-10-14 06:40:13',
                riInterfaceName: 'n45hem6oo7ur69npr2ve08win6s05qs85vrmgjy794pgw1wyz163kkj4qnl2p34820s1qyp0k1gmogp6b91ee0mda58n7pcq9jw5f8xmwo8pngnm404erd2zhhoqy3x7rtdfpk5i0zg42z29a7qo1tgqkod7daz3',
                riInterfaceNamespace: 'u56x3gwxqsp5kxthymrmz3z6oytvaquizm2xwwe7wkgdcoomp8sns7ap1hkek7dz5daehk6oz7o5i4rcc5xard3ccaqe32otypcry6aoeblsuh2a5ycpxse1njup30i39fxohzng5np1po1r6twgd9ipr28v01qa',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: '1dic2a09ui2qewdu4tu91x7pcnqrtlltsx1x7zcp9xv7s5x7lf',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'anv9601nb4gbdfy7j5py',
                party: '207drh6wo4snommy090qkt7utkh7icgbn8aannggydcla1aaje43xpnjxuk1iotpiscy8ca31kp7gpdtp2mev7o8bboqe2b84efv9nc6jmcroktyz59kbaystj2vxnwof07t6u7217iw29m7bsmkhwseahr2xjri',
                component: 'csoe0rbk9z58pyirjc0rec72n6znf7q8pl5rzcgzlv2xf4wqwl3ach87a55ax2ycnaxxu2dmqrk5b1imh9qfeibrtnp5qxxoarsucclqcvf3lt6czu22vzkmg8zx8z6y2uivlfavrzx8y6n57flxaejjn6kqaigq',
                name: 'k87s1x7jyxn5vgzlfytv9j1aaqxzhso96eu9p4jlfjkhybbfdrz24bz2fwekw0j23d0hnqoltcx8vv8h5w5i8u6742z6lj85ndbbmcpo1b3s84rgrjc6khxgdepry1w80qc6yatd8dck78y4ja9qfsidiy559p24',
                flowHash: 'tfmphwk7x9vn3q5kxikuyql8u7msh3oaefdzsr1m',
                flowParty: '74yjer2vhapnez0zcdho2ca5vhb5xvfrtii1m8nnvhqdrqasapyihrmmmlxt422lx9nmeqh53rgk22967243q4qbtvu3mjgueu5h0ncnseuxnt62kdee49e4mdpwdd4z0xn3osl3rl09d4qzwhpdu5hd3aylm5l6',
                flowReceiverParty: 'qn87rv1elssma38ddvy89od5njgoib8hi4p6caz1twctodttst7xc8vg2bxbkjn5c3lb7zcwmjp0xxydlwkmlsm5u10s50nrn6gh2ap5xhoycenwmv8iz64jrhp7t0qgqk7xihg0x6nsr4ix8yxjgzol67q16wgq',
                flowComponent: 'bbgtes9vvn0jbu2di8lx4be52wqepaedee7clkr5c68mx1w02xva7co85tpp1l9k6lfc9a1ohls3uxv938fs2j145sb0hjtkbchea28l2vocxrlflq035je4apo4ta2h1joaugkmy54hm15dkf86l9s2fe5urgcd',
                flowReceiverComponent: 'y5v4hd21hvr5zzumz68f6af3m1e0v6nzgps2adxwwis1uzfe339zkyy6hni1emhacjlf46n5bcno70st5alk7vd3gy61jog2k7m5ododqudufw3ak8sgeci7dmrsallmc4rq2ckjdk6ego6b3y0lvnitiapb0o9q',
                flowInterfaceName: 'dq9lrqaaijndee49cn631y8kjpgdlimn44ju1g2f9gwnwkqltoyc5cwtxedw8298m4aeg7kr18tgl7nga13ey6q89rmtlbbtpfmbvgyqnujp3jxmmdophzah768v5mi67pzx34cdig5llzxf2ivgk9nb9tgfg9wc',
                flowInterfaceNamespace: '34h384w206smbxme8k2jaa0drwudl88jt1d81z2i6pri8rwd5a79ayl4e4ti45lw68d9r21oxo0t1efjdxd22kc8ej22k8jni6m4vlp6k5nltul4n4aysvcasaxxiiu8772fluinhjblx5df1983a9z230qc57f6',
                version: 'z1ig4zxpgl4qyf3oiksl',
                adapterType: 'a234af70af0z5b8907u7qn3g67rugliafnjlnaw687ar86xfl1ylv4vfgv3j',
                direction: 'SENDER',
                transportProtocol: '258isgk4mczb9cquyra4gc6u5s6uxwpj1j53dvlxak16h7k03sv2lda2z4a3',
                messageProtocol: 'nt92viu9bx3pp79taelflxhtvmqe3sdct9mnmi0h5dn8u56nczvfkxdoegkl',
                adapterEngineName: 'xtxqk7au6eyavlpoc75fj7qitjykiv5lv8c4umwvnpm4ffmcs329dmn54227yigwlzdj04v49z2e0m8d7cy2fs9k6kan1q2uu0q6jk3zn9883ckxbu1l8gw7saf6qcih96cgv5ac29jbfh7lmgujj3sp2pladknk',
                url: 'abs0gaskeha97x9h5j3uu5z42s4544qwu48nn4wkjkzafoxkhgfvi99nr4x8n0iz7jk21y81wi6j6sxw75rjehjs8iiftsz6pjxbg6dj3694vzq4wv1nx6jj18ksdqpq8bfg4m2qfsmgpn4pw24f4umrv6dj480ca59ny4i9sfuwrpz9uwyzlqkhivwqx3lqnkknxx02kf9a5loj4bf076fx9r0pk5njoacpd975cze5tlhg45lp240anp5zbz7bxk92ulunu97376ah7euonogiwgyagfg9fzwajpbx18a0wc7mt4kowzhc0p0fvfvi',
                username: 'si2g6u92xdqd9jozgjzt1vbd7j5bqt0zupck68g8jxy1f1woj8c1vfehe6yx',
                remoteHost: 'sxbf8f943strl0ebkj1ljxxdb453i5ncsm72madcsvzupvnazy91vrvmajigdowxu1pkx694a0fsox5bm0jz8nvljbet4s4966pndvr25qwdk1v4whn83f9jkmuy9lkjww1econrpm7xdy8egrstzj0o0n28fid2',
                remotePort: 6696885466,
                directory: 'qk5c4od46jvq65a0rssi644ie7a3cto94ocmmjzvv33mec868xke9oiuvhzp3be66db37m3pyzfvv9vz3jcxk1ji8s12yjj49k5d57vp2eaoygb5wpaajh9j8uz7jung2efng5d0l1pp5v29aen3tfg3rxw4e4vfj2bkocs7tzbz1ebx2ywm5t8vd3llbt7yl2jjh9zx320q1j312g6i2uavr7jgaeoh43pdkypbudyshpej68dfy4bappsf6rt1vpa1yq97rtu4abenqvs9ht0pgbm7macg5mcokn9ijfpfd0k445xrut3b94550gj42kdrmtzse0gt0gug76s1oe8mkk0z1lq82d79xsse5bhe5zl6nej3txffuxlxulp2135ijj3e8tl6nbq916g7i7ajh4hpixrembrqg3g0icy0yl1yay2o0to402x636htg90uffgcpx3tl119jgrt8tb9ul37un95q74ce18fvrrdjesiohv1uxk80vhjxoox2pxksj8hyubb2rmg9tk1a9j6aeae0pu7fzw970murhq7epv81ui60i8xeine0dvo3eglpwfkxgq20xspki71eklgrrkrbgciv1mtl92btiy4cgjtwbiz0aieslirosxi5r39p6c1628otm5blez8h3h73bwn7kd366dogm13xh2mpp4e2e9c1p8bgflww87rsjlp9sxcdfaowev98536sk7foshtks6fxm87209vgnplync4md8074r49n5av34paby0nyud8vahpi0m79vnhqwjy66cor9lzphhoko8i5k62t96opl9akqh7eb6uul7s657oid82e1yg5dc7e1i2w5iwppvs1ioezamblspcxpomvys0ht5ol4p04ipn541g78nzi8cpaayqioxjrv24bnay3tm4n95rmb0qbh1aza95vku8b2rsg9fxcovjcvcw9l41ehn72nvjrb92eodnxpbamuyi3qvoktncg3plbn1qrsjl087rd1vlieghv1c',
                fileSchema: 'y9t40d0efnyztp12ypasylt2veel9c9dx0wgdysqwu0nz4xjug2mqq38vmf428t7k1teqzkn697xndjs21i394sb9qk0kn4oewrm5db588jgnbgjpodoad6ukg9gqf90z2q93lehvd9ezs768y9zwsth1uujefyqwzrsqnpeagdv0gf4b0offb7k807vwujv6w81qacy2ik8dfuhhh7r30dxx2gszht2exot9c4jj0sgaa51g58u02rbr06ffsy4vf7m6o8v35j0dhrarkbo4n39n2x6cuqbftymhfcmaz12kmweuwrxxqnv0e5w8iqp3qq7g41flbxk8ka2aqxa5gih6abf723zcbfqbhcxwj2pdmp08zux04yhwtjyh6jgi6grltoaix8flz761q41q42b2vkp1hx46ro7uonxj4k5cx2wfo3d5fo5i7eocd0jd8n4s9lcchpy963qy8nopoz4qix8lnmn306546sa2xrd0ngt58xf2fz6rbrbt35jkvp22uve0trfd77ed45d3iuacisypha2rakz7o3t3sgyd9czdy9ktrwxwfqr1ta13wu3lgco8hxeue5iufd9nidd2zhacs8p9w92p899959b2rz2i4r2cbnkk0h2sfvtepctfxrdazbhc12xpwxl4dqah74suo1vrdbqps8ibuxir832rdpqhnxhvngv8dboe6m85gkrinbns3itpgvb3zc1lsiibxhgdn6p2botwxzohjmobryu9reidrveyklcqvac4swc7gyimkqysk82x73lw975b99b9skz3u2gz8sdsswkynvesolm417vf5wh720idncqxc2z6xy3nyh33mbtrswnbm6nlx6neuxfekauc7b4hp686dc87dzbzin5a1eb2wbm84ev210re9tp99gui87r1jsvwcz1ec4br6ai8mabwu977b3v81brlh8aaz5zaiwg6z52og0ndhnuj0lqu5dp17qylaq1bzqiz2odhsbfjk4fkm1pojamayox',
                proxyHost: 'al4upeukxnnsos6giujc4k4jfgn1ssbu91l5yff3xiwpqg09xxqn7ol28sg8',
                proxyPort: 7428038196,
                destination: 'qqzfjqd7iucefd5pop4xs1d2laz6skmnisdakaqwnqiagvdorz7goh1dkve6paepzw570917riuqp7fmd3xfthgc4pqp3wmkkd524m1ha6iirkrs9ar70qrfel40fasreq5h58jjghy9rnh4ou646mk95lpq6wot',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '11y4m0fegxp6hykhjvvxej78qr30g729swfruqgx35jyckz5pahoxvx4jrgd8sv7gbn65fpupmj3kc8bgkjidtns4nffegtverjidafyz69o00k7oz3scogaps5voltllvuzmsp3s95rlcldt9uoijzfr0fydezw',
                responsibleUserAccountName: 'xmgfsbfsoex34w1yld4f',
                lastChangeUserAccount: 'sf5pt5qdr5ven32kyy06',
                lastChangedAt: '2020-10-14 09:35:17',
                riInterfaceName: 'z2sw2i8ivima63cvpqxolw3lnq8nf5g62t1a2igprfe6ve2r56c9wnijvw2kcsq56q5rsxjeylk5152t7aqqdcyyti5eaf9r1dbevvxj3601iebn36zhfdwx47sij73m6zofuwzgjz5ke2g0q5smw5q0z3me2puf',
                riInterfaceNamespace: 'tovz9ebpesn9urwn5exvwhspbvud0y7x22cb8mb0mpsw0eufy3xfr7rzruo0vmv9pm898d8ip3w81s5mjcb8pqxuoo721wrjxddch5rcz436qvd72xeckb8xywee8ps7bixsikfsxkeasqxj3e0dhq8azuzl7653',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'cflm2zlzql5thym591etrrfj2r1wuniaxkiy4gr9',
                tenantId: null,
                tenantCode: 'kjruct5defcbbx15zuhde9fvmb5eux8ofns0gwbbdqj0hckn4b',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: '38xomzignmg9q30ark8f',
                party: 'dw19tm8e2txdr01fpl725z7ysil4ztou7tk3dabzi9yh7f2tb38beu4734fp5h0va4t18e5epvx2e5pguky7960a1er0lr5xzjigwwtw0ayvjly00z04eh90iteeyhskg10fo9t1p46ne3blp7to6a6km9h15soj',
                component: 'ne3ksa4w9a37d0kngtt24hcmy2yolzbzgk3qb3b82mxps369x5rmzgqctbze4mlm5no8dhlse57buq7ouspjwimgz8nzn8zhiwym1c9us8np5mnsq55ywdy71d5z9d7uh4pkv7lzc25te491aieb9wyfpyasfrt5',
                name: 'pdimu5w1r4s5qy3z5z8ar9ywjb2pm8iz2gmmnw6gx1jm4tk7ytafe9cv4prp4hjn2roe7jlp2xpb0qqm1l05vyw2fy718uyiqc5s25zbjntp2699qi90c6axbbeyd608d6tw5yztj661ufwtcfzgls78bth1snnw',
                flowHash: 'styzaa6u55fs93su3nno7p87p92l5d4t0663gmme',
                flowParty: 'phqzho0zn4tsflvcdonlucw900ykdktrh9ul8shgkym2zxpf07ev7f6v0gth55rety9sln23qfqh3p7ju9zohnscvs14oiy665l5jh2sgngtzqav7tlu9jlbjv97fk569h7yn1vh1dkwzilof5urq8ec7r4zq3qq',
                flowReceiverParty: '58a3kaask21lq7i0ndu5fijj8joys38ujjf6z3padx7mnnenxtrylbi296biv83avib8ezp2hz9ko1ifp69rhdlv8l6wrkfjyxo05mqzwgq5pcto4kyfdwzuh5zu8wr2p2kcfsxpg09j6dv24kgjytqg54xtktl8',
                flowComponent: 'zdrqwdhja6rryvt5h9ybggf3wnayj9szkohhmz6edggudk8wzi4h30g5g4e3kmdz2v2jv5dk1kveqpgvjeq1p2vr3ac4ordtjvzfebjid40lehiamo86t84agcsoj8dflirovqnuvqgowmbbcbt1uxl821h61jzj',
                flowReceiverComponent: 'ux5is39px8vxox3937e6ud4yy2pmyn5r9wtx1m6t2a91160wygbijov2ccjf480wq01bngv1x91kjthbfqfwtahkzdlg3de8qtwyr3j4j30xv6qtfacmztffopdbu434r75oq5xprhflr9ezvswmu3fajmsfh8ly',
                flowInterfaceName: '9dwl560zd8tggvss5in5lwto63mjlqz6087vahwzjlavhg02d6l14ii6lhjkews32wp6tvztrmnsigskdbtng9u6nv18tsit8nz7ooakv9r5ft4dq1xlxd47h3cn3xrd51c02thinha5uf4c57gmtguk3kzbmnrb',
                flowInterfaceNamespace: 'f060tjg50gvn6d645t20roekmluccm7elcuwuyl3mhg3v1y81h7fshnm0eg7lsmfamo69rmlvc2gk7xbipbtfnqsacwhmgcv18q6vs8e7gl8u6dh36ikvw1shdb2yqzv2ci6t3tnghjy21w4nag1c9uo62nranm5',
                version: 'e17gcswnvqhohrl931js',
                adapterType: '1bzg4jdhomdle456i4b5jmy4u7hm7ynajss1rukrqmikql513fcdcarn39uq',
                direction: 'RECEIVER',
                transportProtocol: 'gwa5fo5e5mr1j1kbzmjq7im4j4xlpy0vd2jgv189m1l6ibxlfs23te35k8oi',
                messageProtocol: '3jdhfpy2tbv1xtg4kfqsw3a93uf27elpabsn9ystry14kmgpfccitf8cmikq',
                adapterEngineName: 'gw71jhwo9a15g768ctosk62gt4jvgnczr3w94o6olkgofg1zt9bk56cloaz8ymn5c61p3fpox8oi3zmzdkforvmzcj4pjcu4jxnaofkmnsrp9tblnde32ehwicvr0clp3hlde4i97f1p8odtswfou3cxg5v1be9r',
                url: '02wk6i7zut5ybyijhk0ty5wyvzi61pyq53uoc5vj0yahb10uvwoiv488wz7m5m7nfi1r6jq6g0ydzhtidooi7u1neq70kigexsjwdnosugommpudzgzkkp8ulwqs2tx1tq7e474c6agxz3skui56tmxz2j2vdurr7mm1xtfj3gk11tq33vn4dc9uk1g9e06kzdkm2k5p4myvc5mqvo092vtama3tedo0qzp87njvrh0cpg7v26nev2rgl0pbbjrjn4gbcyc8o1fed5y1i8skgyr1gh8govsfn9lwut1b3wokkxpyiou2hnes2zjaup1o',
                username: 'mq1ugrcy1okg9warvpwtg45r6ge5dqcn03fhxic9x0i42yp8x1tn6nihkcwn',
                remoteHost: 'cbjc699dsqci9by13cazsggkx7qp8dej53chw38naogrsmm9zb3dc6gmiiic4b04n328e47daf0l5nz8bka8xts31eg5qaa8j82m3wm86qq4vndvq34hvsyiij87d46h7roki38hqq8l831fe4uzy5er01rye9fz',
                remotePort: 4860319306,
                directory: '0i24dt7u4tpf4uv8igcp0ukwjl5gc1udqp67329t91zh04cxisa0rrq00d2fukfrqwx6e2ih1etul9o0pt8eji3p08h815mcd1uvzb4z7y2o3hpqvlcn15nryhp1dg9ayw17aqwqqznc6o5eovsy7hizi9v3xgznchnejrebx38gp7g1h2bza3c7suu6xwjl3mndpxkybiuphv80kiv568bq3ut2ecd83sg469srg6rcdkwwpq400y7zpdo0xhe7cswva14jp8ub9r3grsthp444u73y216qsmmox2f7whgc1e7n11ps1rqp4w94vq0isdr1r93nj60ufu1qls0gqp4sora0xr0pqje1nb8uezvj3dvt4c9lzwbx5c7nbmmnhbjobxihzq1v3d62f86g9lpjn2o0benriu6lfr8wb8p9rew0wlgu5vh6v5poo66upftebw67a5d8lwq7l1xrkb5k7b24btxd7qe3cxvosqo1rybl6ycbxm8i8bylw80oiq40ypgs1m4nfg0fdcq7ygvpbo787xyq20e8rkqswd0zn9ygp1wq5vfbglwotohw4r1m27iulqcee7hfr3yqwzb6ne8f5tb77mr9u5tc2xwaoqzjwnsti52sp2igb7ckrbpa4c5se7tk8n19rugiyc3cmjehrsd8r1bo90fq3crydkunoaeq9osq1dr6abccnaj5cspq926wm46aa588nayharb5r5tm9hooodeecxppc6jw6l5zqko114jifj32yunzcqmz4ntnaahkqk5dyflrs5ffjfoownd9ggx27h5t7lpdcx3p95uu5zcd4frbzxoj43xj4vu8ngfkvghsniguyep0nclwpmkcvik4pcn1v7xdt8qh0lwq0ozyvzrppm44c34ufkqo1a08b66gezxf23hlbi86td7avdccjtn0zur6rt8n3tuh9cujmrym7coerijfwkw01xn724vwjv1i50a7run8b67qxizve6f81ni1swmay66w8q0lpg39',
                fileSchema: '679uhj8m5ay8g6f40ysj2kplgigk3z2rbh17wlya07nm2glaqedtox4zq2ja9bf3gi3n5h1vvlg2lq4fxjl0obdsorhm1c1h3yi9wzp243xao9kh14j1wwvycvdb0vvtqqkaj5w12u6cooubrjxwe98ngr08oxukpqe0cc2ztwo6rwpnz8s0dy867iq5d2g74n6mxcrvefezipqsye4t4m0evxggq99m1rgblzsyszgdgr5u1286bg0h2rc1qfumqotdgbzc45sq75f7ja104p73fwltjitdz2gn8p7v16bnzl2kjvv3k6ahq3jz8tg22h7xd9v2x24y56p4hdoe50mt8810tdyp73m2whnsgcjj0r9x4t8922b6pgfvl8e1r8hxqqugspyrvyz4786sq6rt9wsw7sfln4f2n3r5mk2fa3cukkimchqkbf5kmksh5wn0wqvwf99xmrsz6f92frjtc9g6ugd42lhyvq28uxfqpzj0dd78dhn6s4bw608yfveo8ww5ckzc40ibzgginoi6xbudb0m0ggwhs2u59xr0iq63f8lz8hdj1v44xo3wu113lmh852u55s02w9rrdss86k1z5iriviidm9lb1zkx82p8smm09qai37rzjn5joxgenkho9h1uraxyg090y8ca86qr0n52611zuzpme16u3c9h48r9dbocns9k2evalf5of9sbio8xv3eve495ft20o00764axs63oahqnvmp1sm3rfbgnxsyp9tm7if7mfvq60qiausk2r2wp7pcekuyct3l0g8bt55fu1aqxd31t6v99yco4ywdfg10kkjn5iaif9cbkqpu9fu3ybv2ybxfndgb1sniscgs7piwv55lm3skqtpez2db0f86jno0e22wbw0qqv3cequnuaxuk3rk3bxsicr8m3kd8p2bpax4p65wicuhm61h2rf5999pfe94drs57h2jtgsdmzx9l0oxo2yf195xmegyos055qhdmxf75qlxux4ygds4jc72q',
                proxyHost: 'go2qxt50i4do9l72i7bw4jcy9yjp8j2mcifsklm6nlxxe1f9zw8vz7y0ok0b',
                proxyPort: 1759769831,
                destination: 'udaab3o9t3umghjb18h6qbvqgaa7n34b7b16uei7k4x5mpqejamdlgh7rsn1a39h19ni7cpku6vjluvd16bievwnacyntpndj1gxfl7uqp8ll08upu7dtmygavqkls55adxpoh6y90wh25owbi59tvu66f0zmcje',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '086dcj2vi75xhf4obs12zkpsthfvqwcxz62xi1pyepip63qa2kliguiajedv43iwx2npwyefrnxakm546rda4f3g9qv96u1nctdj9mhi0yxglef9qm4tiv7mf2umsfr1hi8org1myyx1ip09ncup12yii15zfd1m',
                responsibleUserAccountName: 'z77wp57f9dm1uub4q340',
                lastChangeUserAccount: '5tdgge0mxp2bnrqkyknz',
                lastChangedAt: '2020-10-14 08:26:06',
                riInterfaceName: 'cm94c9rri9q8ni3kb4wgp8u7rxjki6csxgcmup9rcuk7mxkf6mzvl8mx33ex6qces5n3tt63jy44ecuv2u5jy4dkbmyxjc1w5l30qhcaict8aw4epjfzat8ux1f43n0nyasuw268hf2uppwrc46tml6cz2ihl5uk',
                riInterfaceNamespace: 'r8r0itlc1wxiza5so6yf6erytw09f8czymrtmkrw3vmnm46ovu7ndtow24vzzw1nvn5wvila1xzc3nn1b2g7ww427ttm8znmlxs2n2nbs8bdvtfnortn0fsl3h7hp7tviswnhnl1kr6s62smu1yjnvn938983vnn',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: '5xzhd5ww9jer2zn5pk8hkm0ly5fbfpes0qbiwlwx',
                
                tenantCode: '7iz80uy5fh8vrlpvazrqu8fprj0xyin9nntzr9zgvn85gnmfoi',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'ozgil6wa68lbl3w7vevd',
                party: 'w2c4a63v41166eiyby5p5482i4x5saaz066qhgm77iki43am7ojb2hhci6w9gugbwrqln3ujw35gdqtbje98uhne3tykqvc4rpzsyuky597gk5dx5exy6twfbigijcr6cq93n7zqy0xekas7t3maftk73qa8ujsb',
                component: '6hrt9dmmjmc3ulcpjw2who2mngdq4cqeuwfvwpq5jhg4s5ywuunxv0sj496ckx9sr7kf7g2g2i7z610jyjt0lanntns2g5c73z90rn2enahn8v85ree0cqfzwbfeek6wgxct1mi687gutd436a6f3imttytbkmr8',
                name: 'sgtn8508cur15m1rnusbk955akpv1w6e6b2mlsv43y6h7nzw7nb4k9u1qrje2gdzv86778nervawygrqv1emwxctz51tquchhxdhlyy5nlf7ecewjkeiowpaegm394u9ztcmwv0vvkzru56q3v0ahczflfnyxy4f',
                flowHash: 'vm5sp9ekxl0rj6a9yb4nfcqdg2srzqg39qteyf2t',
                flowParty: '0v4qjqlyaz3l7qczkl97x3tcjpe4s4k0p07lnlc7h3ce9iguitf9yqkzrtc5hfci2yu7tnwe4k2278as5u7dmr1dmo745z7c5xzfezmxv5o9kgor3vo2942p0avomghm25726pvfnfpra5fa2qws8mgmjhrnfp2f',
                flowReceiverParty: 'nt6pvw90se9bdqf2c1oveabzwygh6ajkwflgat9xi6go7tbx7cesw9ry4hl61l3bl12htn2z1loa7j6mcfbo070ij2yt5o3w1woeh3gtyo2k9rgt82ikvftr6itgawo9jxiy28b35abawzjipvk29omoghj7u2p4',
                flowComponent: 'dkpj8s8vzunxtdqoow1l0x8kkix8bf5dcgethyje6mucq9drfokco3f4zz55zq1ge7y3crzue1m9e8eev1eto2x2pij9g1vdngzr9qkiwkq90lupvhjol38vamph5a91wfznugek1a2da5eub5oarj7yf5vqcdla',
                flowReceiverComponent: 'axhw3auqzbj7mrchn90kxsanmvejzfqyzt5g3ur61oj6mnxfvs2xd1plawxzrbaz9oerr34pdk984ksaw6q5a5vqvqyaw1acil5ohswf6vgagjxy8aqod6tsd8cf6m7k6c93jlz3uj78o21n80ymdq2o1xytd6u7',
                flowInterfaceName: '5h0y0awwtz1mgzmx5rbqgtkvpxdpj5qxtosfm7ab5lqw8p59oxocixwcvkcp70fqt7ko2wz9zd3fr438qojuellk1plw6n9maka8ddoot839vrk8xpg2f01uebf2vzj4toh1m4fa8chawoapzwfa2xce93c0bgrl',
                flowInterfaceNamespace: '3ch6sdhu1bskx90b0fztja4gg1kn9jurjwc9vbw7zxdl39xz6qtj77jnqlaksval6cfeu4m4n0d9kaqjvzf9ijhygnz88xrh4qdk42x131skkdv0w4vd5scbpnq2oinsfa221rbb35z7s9isrfql7ywncls2cgro',
                version: 'rrqzadid2me2v9kaj9b6',
                adapterType: 'nmk4pr6dp0asjc8v6concsrudqw2o5mrf6mfcsifvj8od5hn8576i710f799',
                direction: 'RECEIVER',
                transportProtocol: 'hsqmxej8g34uw8yvwyczwsioed9phxzi9b4jlb3tmd9mmqhntz00li6unwzw',
                messageProtocol: 'kxwgj3itithzepffx6q5ljtp9fi0355f8zna10a4gsxivlb7maw1ahh4u57k',
                adapterEngineName: 'zj6unjolmknpx2i4c9gsb9iw6rhjs1wbxpml58cedmq4l7etufzvcj7982z636nhw231sh6bck01q3xhfjuwe5fhl4h7yd89zge39krlx02v5xwjwzvauy9ha5amyrpm6ahf5dxg0q4i6uabzyldxqyog2gzcye9',
                url: 'rjwvj6hj5z03b6hpc25p8pi092dkzcq5bvgt8nz2f0cw5w2hwgobop0l1rxtguqmcd91rbuoxfgqkkv64nwfst0u0r8oxmb5sm80gjs96wrcozhtgenbt47rsy6pohyyh1zus5cz0xwrvr2flux7se9x9n1w3suled7zabxkr2i47pfaydl6ga39ma2hv1r04wp6hpii7unnhz4q31m4mwgjtisrb4h1meg7hj1yo4xd445mov655wx8lq3hyrjau5d5q469fx9g5mcm2vgxlcbouf14hci5778sq3yyy5hfaqwbdw9kuippb6u0l9ni',
                username: 'h86u2wvxocc97gc3nvg7oz6xrxj69b32cpnjshnl06sbq88eohkhkypcrnht',
                remoteHost: 'jrtdahx52j1dydcx05gwymm2yjq78z5u2cn6itc52v5pukcy0ey30d1e9c7izs0kt7mswwkqyieyhrvpv1g2hldiuhdqer4p279tpqfhn6r8e7l0nnjyeey4sj1hfykk64ohi76zvpk5ouw857b79n0gure5ooxj',
                remotePort: 2456093032,
                directory: 'qlailydj1t79075uod2i32gfq56180mdo2ewhgvvxf5uwic33s7xp4euzhu05tkhdlms7v2sb7nn4b5e63ytu6o6teu7xw8su2h4j99z2glqsavz25mmjgiyi3zixgasszq1iulo649a2x1bn79ng1rnebptbxi1dgyhw4uzmb7mp2htbbjzin4q8a4gx6dvdpa616ffqcuv2fl6jj9msr5mp9mzqznemxqn7bqsxiq4v8ic06s9v4wrrsut5z5lpoxfediotuanvxyrf3umru19bb4sa4e9m60uj8w8fqaf2sa6haz1tfwpl3ur0i91lagqz79iju8ech8nkyhu8pokimk9nep8ux7zwj7q25xmk1i8lbea030pnbjcwli821d26t4d24oebm4lu1vnso4blhcyg4fvj06cmudgirx8bpvvtg3w5voawikmhyg8bm7fj2vshosj4bmzy7zazju705tqtsr7jsj70o4lx8hov3ayuqtdzs5rtyb453pgfxtdhgwpuzxgoqygib9e8gcltgx2y9qvb9v7yh8f3c2uzconzvv629dk2xma5kdbz51tfm392fov3qay2hi7gubk69wctv4ymhustud8uo2jd46ixx5hbza4iwndkmjlnhtsq3b5iqiwoxiqxv9px0i7uwp77gatm84okrd79ui6hkjd821baw71t02yhv71aj0yk5xotr0cmwx4e9v6bbjq3rtf8zw3c9igud21udmkn1h7tmwcnkrnncsadl54277sonp27l3m0dmhqwt5e6x8nme22pydmdjdiuiyxagvobt1kih47nt698qchuz4ujlrjixs4jry3qa6jjrhcvx6m2f8ek7290u94uxlq52hru7xsulusrw26gil1elzu0pcjvajr9legsw33qez2yehi08l670bxg204uaan4lc27x0edrcqgmlicsznf8q3reoxcticjn5xda48cm1jtopbqb38g51zooicj6bp4dipc3npsl75340gdtx1v5o',
                fileSchema: 'lr76dfqrm1rlbxfvgicdqpvqdbtdhnpvjvuai7b11qasvvu7c9perqsxgu0rwidsjihiiegv3jpong3ls5rtfnfo15eb3q9v4c5ud9wneuux8xt5ohk662icxvwbhm80eds90dkwqas74n38kn65g228ab030arns2kbhy5vu9vb6yps94uejbae0nw70m1i4hqovu56krabec3elpvbj8bg0hzrk2dtp9ge818ik4tstocnqr9v0s1pntm4wx0zfqx06jchi8wl9saajqfs33qmaq9jkpcor6ohtbiwutvnthiaczp29gnd64lpm8or1zifm02kx8bg6ilalp398b7o1ct4qg78n0q3nag4xadiagh9ml724et86k6w0q9oz8en06707mrz5qxkhut38kb4457e4d0ggrxvs41z877qvgm1vcht7ylevplpaozrbhu7yj229hudmu4bu2nokzysdnl4423nj3oyre9ysupsvfjcwh2pb9h9jybaupx35lf40578uju5ll40s1gz51yrjhyk46guxr3v5ufkce3jvompkvazbeghqk5p03hhfmu94yyeywvu97zwm59gzsgni5fu0q8s8ni5e3yc7muzv2we4i47w25otg7pc4jlaedd7nf5qpgxtwnwfcamzwtpkiocz9misenmy1im8r7yqapesiizw54x2zci689zlatdb2q60kabipjzgrhqb2she2f0h37x7hdu7ae3e4nkrp809ovwlqaccjtdbbrlbdax2rvzveqm18mggid4lp7ylmyet3qu6dnohvjzazhuvc7tpwikvle1zmjskej5y0v4znxdwq7z88vpgo7e09x7uxg5ffqndlidexnqcuks665k6tgm1h6kwqv8onwggjl3p2hcgy7j1ud3kwbj4cs4ha0j6x9zss5k5fusnirod3tprj7xhrtx4o2sl8pjeg15si6yi5ahd9wmh9x664efb2ydp1douihsix8k00jlru6zy5zfu74exfxk1o1b',
                proxyHost: 'cnrvmlaoy8k6a8h0mnit896uq614wpndxrlg498wqwp7w7er9ngx3s1hadjd',
                proxyPort: 5776555292,
                destination: '4xlrolpoa6m74o466pbklfxy9tk6480zxbbgc3c7zu1ihz1x58ckhaqdseiytd1nossmmpx88r06gugm2ylgec5bxtuojnbarve4k0wi48svif4qspuyylxbj8xxjaa59w1p3pdgvkdjlv28g6j77aax9gbtuyg3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4m1iipjb856wiqk732420bxb1rtlsb5uahdy2ziwwp2glca0imy5i67kg36w2zzxrl5xjf686w2zwlobtxnzrvixzs87tb62g07whktzdm8lipgdctwfdudntkpnhj8p769vady45bh59q5deis2og32r2rvjby5',
                responsibleUserAccountName: 'gi2u4t15hrdixc60rx2o',
                lastChangeUserAccount: 'uktruifjaq8z8mvv6qq2',
                lastChangedAt: '2020-10-14 01:11:57',
                riInterfaceName: 'gk1zf5km44hz4n6hjnacqp0apvhlftaak4e9ww7d9jenp6p9mo9bk1mklzrq6d55i4dr4oj2fyiivknfnpg38x7xqqkwc31lwvkbqzfd385z8mgofnlv2sjup401nw37wsoipepygzaz4tfhehcwfy3s00djt89g',
                riInterfaceNamespace: 'c729ozkn3ghe4v2dvzogdfkj9awlt0qk39906detmvta4nfp87rn6euxnts9svp21tg9sw68g6qdv7bce5co01pwpivvp7c3qfnwqm8xl9dpnri2tt742dzv3gd55das2aeslgkahqltlvhu94sk6uc6bdgszhdn',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'vn1pyy31qbhcg3eqje22w5b3xnn0y7kn4yefca49',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: null,
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: '67onp007og5wqj8wt88t',
                party: '9x0733qll6o3dyyhkatmva9hp9exodj4lru343y52y5nlgjngamusqfkettqcawca8s5oe28x5v3zxy6o365ifu1idfs86j77xexuol7hcl93pbn1m379va0jd94rga8cwhnwoat5jpyz2748wbsutj6fl51bxh2',
                component: '7ebudde5uay2a6st65adilu5vzzuxej5q2b15mkeulyctungd2av7e947ezxej500n266z053y0up2jlftdv1k3hjl8f46g070hlwkocwozea0ehqjqnrmrw378z7l08kules811e3pxllzy87t2782fi8nlwtic',
                name: 'iorswfhq818riztwzsutf0qy7q2ik32nxwyxsmlb38iu32wwjjryhl8chrqeap6qshhv6jxm2lp3lmfdmykbhsa92dc4n93tdtliwmes6a82befn63dr6fcv9pz6ehmagywgoomqqdwc29a6kyqgsf1m69u0tedk',
                flowHash: '9mhlpl642b7kcoo285c2cu4edk93lc1gvs5thkm0',
                flowParty: '213j6gortqa68lqqm8nilbc7cnl4ucg9tw7245jly591unr61xpvvffjd94vxvlc2kcmdwaer52jniwrwy9ah3yiciurvy5en7bzks69y2pduhmg6ncwxaik0y6hy8e529115e4xbx4v2f7yq4g20if966futzod',
                flowReceiverParty: '41980xm9ctxrr5wutxrgzko75b0c0m77ymev8ju96af97nt85y0csuqxm8hbdfatv793oinyd4txctfixp6d5o201tuj6363gm0ua7ou1r8860fdnei59xorazme7q57uulk18cp9nazl0fqv9t39a01ibmz0rpa',
                flowComponent: 'wr2wpeloz5fuejg5ks4y1mmo1c536f257sko8r2ai2g4dbr0mypks2t1zk2f7l4410z9fpgk1v6w4dw6cdoj6m6z4oab7547uyi3d6n800z1wu54g82ohgtchcj44gwqsvogw7kuwj8zgia1fposzonlg7aizxxs',
                flowReceiverComponent: '1i0rscavpg7yvcvr4c8itl9qeumhnkmczn6zpg530d5y6vcx48hmitxx1f7r8f6cqhfs7e4g5cl7ivbhux20nj2g87yt6i331k127vqyquussmdfq351lwjtit4iwuetmpjd8zbj5ilbc75tesspabydupqihps7',
                flowInterfaceName: 'qq6vzbhnuj4r28g2gi955wmp7egpz3c6rwibf7bwxm31jr8kxc2uytm9v8e4irqihviwxnb5i516c06mmz4b383zzy6opvo5cp9c42fbmzv4s36zaj97w3at1no2ekvdppopyrwr8p8r1qqvzuj9wyn4k70mfzwn',
                flowInterfaceNamespace: 'hpc6y2twjfgcpt08qnl5wl18ge6clzomjp8wbp3zoezpxy1e8rb18x6popykc1kolvxsh4ubzaplbbrdm6w5okq0yi4ftgpeiaz8vatcdvur9grzg9vycsrvpwksjjtwnli490uvaw6qr149nh7t5gw2shwfrrsq',
                version: '9x6kqecfw4kqp85cfihv',
                adapterType: '9vj6vfo37euhasfxt30r32d1fufexoldhka170xj7295covlq6f6uaoy4nz6',
                direction: 'SENDER',
                transportProtocol: '9mkhomdrwrk4sgxp5t6klzucrdbsxleb9ed9sm1q5fh5315dcbdtrtsh4tck',
                messageProtocol: 'lnkev1enjs04mf630k4zzedodd76szw422nplrc1l69zni6f1bx2p2dldicq',
                adapterEngineName: '6cqwnk39dzxk1242fsk71aox0xojrgy53uhtax117s41t0jid47gcthfzcuwgr1ixusycagjar7dp5ecdxetjhzqukgugg6mcwlkgx9nopixkja3o6xw5wpz8bger8vr6ccsm7hwlbs265fcx1d2lklgw1i8px62',
                url: '7nw9i2uq4cvickv1tbnik91v4o5jppuxrg6p1vmsc9fszsu9ju4hwj0zuticr9zhtylqs6ksgmk7yxhnt1ieejdkrw78tm9tjt1xd2c1hxj2oy9eczn45e2e46epvqzf90rvmz1ymgowvjtsw13hyrzml6e54upr5nb5tl0o0vzmla51k0aukqji24v4f2h8759uhkkftc6qzb4488sw70ltu7m6b09rr4390t1fnso75hjvnfz3cqz2gysxijd3nlvdttqeg2ebelwysseghk10cv48ydskzjk8rfh7gbjkvpza1f2clt7k5l6y2bnr',
                username: '65uavicpr8peui4xr8568b0z5y4thm29ylee8xwy38qbthj1rfjbxg8m318n',
                remoteHost: '6y68lal6t6jlnfmwh2eonu4gbbzuqp4e7cy58mzbo7gdi23r4c9ddr334mt5sx51dvu2px7719ql9ujtgs9au9qmq6qefu31gvy790jxgi84ko293nmzrpcn1s2cnfec9kwpogrbocb2oxe48r334omx4lqzxbsg',
                remotePort: 4119615291,
                directory: 'd2q7pppu5wf8zo3fcu5pv20dw8x22s0m6jkjruzwwig0dbz47f4hzso57psbo48nbchammcxwys81qcla5nst9ma1d6axntoc0qado316zg9qqaff7m844qb9tmt4asbecyrrdhotfmtbrzh8hue54jdt6ugnsgtcttt2agy0hyf2x7f8rhluegwwmctlowbbrvr8r90vads3biya8yvdy0yds6apj5w1i4tasdjt7llftoyibz4bw5gdzquvihzd5tl6gd9mc8qcbbw92sm89wx7hz0lyyid96mz0kj9fk3joe8tqun4ur42wx9luz3uxrzspm255j6wjt56zq00r0iyt3n5yfuoe356pkg8iao0r7wil1cqkyv1ka55f4ulzq6j03mpcotkztzxxgvjgpexgnmc3z3h6qzdt58i65p937gs0v5ejwspbw5bd52peo0xloqlk8sr2ig7e99o4u4hzvy0crfw6teq3puw4i0gr1yn4vy06apye2tlwz19rekybpf8b8tn28wkdmcqjb4th38fxe0ph4h5eio097l0xltxsvqx4wks1sqfmgogr62gy7bbjmt3gy197n3i1h2gkpu1vwu6xetztbfzoxpsfczpypogtqxiqthhg9d5zcq0trgv4m2yonolvak7iz4e2sduw8vn0qf08lott8cwhqduu7ujs90qrr7oy10b25s905l9uu0e8des30l7irq8kcb76aozw3dhf2yszqgz4vfxclyyfpgiioqswlo8tqiz1q373kuw8vsue8zcumm0lbs4s1sp9efigjjnu5mktl4ep4e28e3570njwezgbf5gt58k4feq8oe8o2ryqq5gf0zgyzlhll51ak0574he9dkcvtpcfairfaa4ikyvgjfvz5djzrrljsfe74dct0cih573byz70zm6179qtg2gv3pp3so6iohazh83ec97nh0gi3ms3bts62vg3joi5wwbd0zd92arzcrzh6rpunr1yq8ju798gc5jlpm5xwo',
                fileSchema: 'miro6ckyk6hoxvy32o2e5wm36lkjf37dnloqujyblg2ll94nxfx94563qtyxy71fm6hapqef0w38kopcf5kmxnuz3meusagunmh0uayoxrb4agilznhfui5ed3yasbl8iiv7qnmw3gp5137p7e2rc1hs3o1wjqxb9212ow9jr0i95k767opz3kq2r9kelr6qvb8m2apq330nejyk3uhawjh0gyo7852qlf7fay9qguy7k0r35gyl1or8x6kqm3wgvxnttc8dmf3tt9767ojwalcg6134pokntkkqgu13ymarqazj7ukxrgls49t50cdgso2jmxmbp9pc22s74syfn1jm70pnco4hxnjj2xb1tlrg6o83130onr3uzjnb3acscx0md5scyf7n668xx5w71aygrc4vpndes8iu7b6u33kg654c95ah3dy2i63jnbtoxaukldkizgrkswyjpuvdvj86ynbb733me2t47gj1o49tswq117jbhrqgfxgkat9b8z7hc7wmh4fpftt7zu0u3yzorici9hsjmfyc5w7aabzof8hb1da46qtiwxy1jdmpgw98ik03sazwcxeyc0sd9pjt3ebikjeh1wx4ylf5xyu9vg1gos184rwk4jru6v8zhsbpajyw8wpres6i9oxtybgm0mj9q1dxcyozgfk4i0o645d534ozeyirkqd4usywcarb6nh1semyu87cpddyts147ssyxotqgo438qnc4pxzrszqae4qhi41hq6uk2naxawwp8si8ww3x8cv5vyrrezxq5ine1m69t6ps6bh49q0asegj4rzog9f8zaueuu2lfevlg4yocr2ce0u6txl9zdin38nm3xz7qc9v79fytaayx510eet80422owcma18arcnsb6t399x9t8q4wkwwxj3ftfm1htrtavouqqqu1ngrugrim1tbe4mbqvcoorgzgddv97jx4rf5lqny0yxq6mx5uwqn9letf2vbjg3dd2ncqlkp94mfc12p4mjzm8x',
                proxyHost: '843pmkrqtb0p4vzm0z25fplarfgdkuq652s8gkjalonny01p4q9wtyhydz1o',
                proxyPort: 2672154806,
                destination: '2ckx1nhxq1u2q0mp8s74qcgnniyid250p5uerhccb0rzdwta5oho3qirc0777gr693cxi3fjywq2j83c3hi5xjnszyzu1tmyoawmsx2xgkdyudcfmzbo3bzd1mn5g1c00r6bspdh6f2eas29wlcqa5rgbbjdmt2o',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'wm9l9nlr6ohw86yodme0shln3wg6kvontl9a0r549wwf89ing5hhg0gbiixnsbj67cd07xizp8fpsyi6vq6wypb3uhpa7l4ixvf3wo2ox3m1tlirwljjmd42v878prdve0hmd8f4043eozammh9w9gslk1gtq4eu',
                responsibleUserAccountName: 'kif76r1b3wyikxilsz0f',
                lastChangeUserAccount: 'l70bq8iy6xlmmf870tea',
                lastChangedAt: '2020-10-14 15:11:41',
                riInterfaceName: '0gkdi53k7z3y4osu7kll9g3tjxosdwx6jmdncx6g90ndt2yr8axh2zm4l253p8cuhnajpv1fn0v6b4xfyah6t4hklh9benpowveqi4so7nvwj1hkrwr7m7cmslhanvnlh9dxl98sg1v6d0pj8phnqckyfjiqkoxn',
                riInterfaceNamespace: 'o5lqjemmjhj7txv838i60rl2cc6pzqaiv2r08w906xhiluj1cah3p931tsx1h51hfuu16th0snhf8z4ydw3twnxskiow6ydbi3stuzfw3arys4ncayiqjlmxsskjvam8m18oj3zwcezuc98qojq4ref7wog8u40q',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'h5bhjj1juqappcmfdfky57pey0c3xxiqbm5r8gye',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: '47toyo8ohn2pbceubeiz',
                party: 'miti9kade3o801dn7a7jicbhpmyr5xhcatjk4egnemlldy930of8ra5y33pzufuttkrqufepoq8sm7ddx5gaj9d0qqenqc57ii2gqntbjxiwncey8ojtpu1vpvmqilkqs0wpf382ap6opdab7rxtw9jreh8v39qf',
                component: '0esmn13iible2t61piujq2yrpkc3vyemfneq1slla1b1w6wgxuzm07ganl19xx22gpjqcfy32oijzysroa4t0wv5kvwq8otek6vnmamgp0a2jctos2z2kl8dfdfaf1bovmtyeh4zora1fdpkovlqdh5lq8hl2vns',
                name: 'f12dkx6ary9li35lw2cxpoi6x3wa3phm78oehez2kbcpdjo0rua95evfsufo3xhm20n85qw2qf0mrztx7mheezvstyv0hgq5jt3ppful2i8yqb4dqx1ucfur6ny7k9kzorr4yauwjtpxbqudmq07ja9nntdf73l6',
                flowHash: 'put9gbrf6w31ru2fxlvood0rv4v0sztovug60e6d',
                flowParty: 'qdinus6k46ih5eg0ti448cklkag5wc7rqb787vugl3z968adzzy9apvzhh6zoc28ctwwmce1csw7xu6thckf2gljisc9mdynsddgv0n9j128ufokops2cnt2mfv3obpa975pa0nfftrbhc80lldwe1xsjy462ipd',
                flowReceiverParty: 'ku4jxumehc00ucdu68gskfpr8arg59b9y43xeb2xdhligfwq8pu7n8vaegtuev2rmniftg72t1dxw52imak2za9f5jtlofnk2euzxsv1zbhwz9ff8ip51qxebp11tpzk7kwoyalrh69kvfpthqxpmbvg951yiaq0',
                flowComponent: 'krxuc25vcbk70unn8y55kkg807huwl3b2dqn5ow1plth7r3b0al8ux3tkf4omrx6usjyffbrp5nrg9hec4hsdh9mt7v3mcrp6ngenqtdakfp93cqaohp56oze1gaz55ks1xkibl5txubwx77g5q35o7isjf2uzjd',
                flowReceiverComponent: 'zegqdr0572yze7d41p4cdllutu29yzbo6irl1sch2pchq2azsy3fyflj7cbj3li6uywh8jb6fy28923p5utfw9l7cayvup3xhyg8plnpo5i3yc0ik2531ffbl2udltkpvbd3vt5blectojcrkxbphxkew97is3w7',
                flowInterfaceName: 'ymgu7ishwipnat4jdhahrbjwuwvd2vs9t0gy4srujmybludlgilab41qeqrv38j782f84po2uyjcleng9lv3gwg3isvbu7pa1yamlwtyrzmtk7w9b6frscugrepradrrhxbofuoz144h4phnk18g99jfpo2or4m8',
                flowInterfaceNamespace: 'k2043hvdkhbwyublm3rqnckv3fhmamk1nilwy7p61dmuzlxozzfpgirt6gk6wucqju4u71t8xps40fe2phh01hw7gyort9u386kn88pykdhsgon5fze7w6q57rfbw753in2g0m9hs32cdwqh63vv4ux0z2c106qz',
                version: 'fkyxe6ffmwxj24ej225m',
                adapterType: 'aeb6oztx5v6dzy8vpfvdrggxqy0k3kvukyrvu2b9jttxnbepvv027w208sru',
                direction: 'SENDER',
                transportProtocol: '2bznjvqlpapxzkwjhnwbj3bqgp6urf96rqs7vw52j1x1nk59w0ovdklpvezo',
                messageProtocol: 'q59t1r18t117cpjprh01c52q877g89ltddf9w64wx4d82r85z8jtwnw5zcub',
                adapterEngineName: 'ilo2wpa85dppd6jfnk7vlcg4nfu0ydzq30fr9atuhaawpjicbgqzkdv0xk1qm9ylv2dbyrljxwib8mookntwzrey93z00d50wzq5mgr11z0hlm900iogorlhywgcbh1zzhlldtlp9gsemp386acvdt5ygzon64dq',
                url: 'c1ygmikr9u5hd60x8vq4gbadi8s84q0knr4ptav0gy54evvlbzfw41hzgfy9g8k7ulljymvtw4rdfi7nnv0zhox51ki2uo4rfbjakjm757fundl7uvufgspu85dt8thoi0xyxoqzpdlcyh18s4w6b4hqswj831r3ivxyhti4yez3j9m06z6jh528a696cvw86d9bnh6v3e4dsd4x0q05p0boxmnnu2undc6ahe7edho8gog5l73ipt0yo76k8ac7wkrwg1zg8f0fgw9jf9dvmbhcskw4ikjw5bpi521nwvr4qjyut0bucxlhy0s7lnrz',
                username: 'lm2eetqyaw89k98u29sif7g0txsp5kntxknupr76lc68vvyf2grdouk2jwds',
                remoteHost: 'byv4ordxwoyws7pee1aoz778ai17gdd0ctxqd8frsl6pcrvoynon8el3pvoz2sh6yevw7lzaf54iunb1hwt7w33iq6buze2vvysw8g777wqc3d0wnxrwdk2txbtddbauo13km8xlak218ge72ts12bqf880r3q3w',
                remotePort: 1614567687,
                directory: '9n87qqfoldw5npxyilrkuogd8kihw68ih720zo13mbp6ywoqh6y700ekbgdt8kr2lam00c9ih23yl2ltnhj7iw8990tcn0atp6oh7vv4iukeew1itdjywe5nwuq1nwef8jcuu9gxxx0enku8jy73stygnc4giwp19dc2jm6mgyqvkwlwkao9jbfougkmoptrjdz3r5cxx16fnawjkyuqtfgnkzcfpybya8bhci3h9fnpnognao9jlw3cxvo8o3ev5v9iwobbnf5f9grpi09o4zmlknh47zi5bgxj0ayn0ccuy9p0dzciu67kahb7xv1phlufqwlx6dvh2v40lgkclwzhilpk8r0ldxqzjqbiead61zwkwkbhcg6cuv7w3pkdd29cjhchs08055oi5klg5phhmubem90rbo69uyz6628nwurq29p893xujdoxgjw9bse3ledkjbo71bkwbxe0oi2f7wu42cz8jwrhgy8e7l3bdkuttbsdjnljdxo3umrn7e8jk8r77kpj1a6ji6ffgvbilskuf0k4b3ozp4llo5alnrzcwrozrtvn9ajlwyqjsl94j7yb5ufwdvkgsbm10l4ggka9gqwxcv4yj49ra0hyia5xduj9zl2wkyzm8tev4vzdxc9msnrr2x839j92ictd9h7tr5klzk5epednhnllp3wgsu3tve0h9vp8b5n6gaqhp4zvn0t10x41h6vh1nom41c25fyykraexaipuiy0l0e7ih26nge48zf3zsh2tc7bq0apie5ve8ugle2pic0lpiso0rh3zj3aml4nlc9mtrgbm1asr1wafqq2ho0e1f9c3g5jf95wg1cb4vwgzaslvbgn0m3eam7l775tyzdcldsg3tshpgdo54lo4aqeifqwnsx1fo48wz8hkmav55a2ppbu0hk0nl0idmbdb9k5m58y6prbk9280g4u9zdodgo78x6tp5azivzu2fngua2k1ningwkoj92stp1b8l142eud8w1w59hwgqqxyc4j',
                fileSchema: '34z1m2lze9z2baxky24a4f2pzpi3itxm1vxbaduxflfp49lbgt6hfi2sgxgtzba0liebzop1573d8m0xq67769ken0irv0597l2l1jepwo63vml9pnwyi82we3g59mtvnyr7epzr5630zg57iq1mop1k60rm1t33i3sbtrvbla40f5uoh1u769rua320nwq9ln00uzry3ivh9bgiduyevxwakigugq1n28e1ptfn91s1nsdmr2fa9gj6netbxh25iyevte77d8hc0aqbwk0ayyzf21zo30y5wuqd1gi71i9a5npyizd36tbidzwggnc9c9wufghl8c66itp35fwamjvff71cty1y8sh8o5qmffljqngws3w0t1ixrffbt1nykjl68wo07hnniuebumm0dlpn6sjsjrxt58mlz22wldshctpec62h07v54mn6forkersttceww0lsyt6hutbmmrnklhewjkhqnghbhdqjps80psokhycrdnd9qxl7d0g897aa572hsecbwcbdimyhi7abncg2c0ag63rqbh8lhfj39wjls3j4l48eodwbu8g1knt6q5rtbe4qrdbv60ej0ytw5t6cxu7xigg2iegarjf0bw9mdpec5ytch1bw50dyu819vwfrwsq21vfwad7rj4wlzz95ox4gdg5u74ppx9uu7hbou8gdpin84w24am51ja542umy0wzywovtqqnf75lvrzzntxcowi6tgxunz7koo16rd3t7ephiyqb8aueggoj7g1rxsi5um6mfbredgd4lg8trsxvvzqc6efdnnaeku943x2zrrqselv4hvc94yreedh9gx7zdzoyacbg8m1sz1gmfjpll4dlf760q728hb7vzy51rssjces6g7uq4a7np4c0pi5bmsvzpsrpvmvx288uo8sr8buw0q7faraq6v9ihzcir24qnfmi222u2h7t4jkz0k1ni1ep38mezdhn9pengemtvxp8s61wd2b8kvlalxxrchzi410oifnp1',
                proxyHost: '85wgcfji7zlltswuf8jlwzzpgxns6bq6t32xse9vhdvf7am7oeamfpdegnvf',
                proxyPort: 5936579239,
                destination: 'eh9te8wpf2xa5ae0qg3sbnm3y1rbfpl2i998fjtv04mkhf1640rylmovh1ybnudhtehwdby054a9wyfr5w53jxkrzjmaylnr5qd81x4ri6852zyonw14fq6iqhn2p0th4c183mfrjgpimkwaj3zj5yzdpl0lp1bd',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ry9ygg5erhmw2xgqt3862qspg580huw51et30xe2dm02cpl1erm2howluvp8ouxjbyc8kmxxw3xmaltpjfasyqeosztoepfwzdx2f48ramol13vxjosy5hzjfvheojhxu8z5s2oidgkdvypi48xq7x7eimk1uu89',
                responsibleUserAccountName: 'w3s8ucsr9fy2bp82bxw0',
                lastChangeUserAccount: 'qc3xrbzyakwnozi88sk8',
                lastChangedAt: '2020-10-14 17:35:26',
                riInterfaceName: 'ffozk8br96rnqgudhqonquy6k6kwewjhkxhl8ibo6v4friuu0nrmq6fhyg6qsfmy6wxyr2fr3zdf05doslewrjxz2lr2gbb8c3blzfamyzxzi1tsy9mseuqgady4b92h94298nisozgnvqbn36q33vyxy2ti9dq1',
                riInterfaceNamespace: 'nlgfq37l4tpc12t7rso5nt5ath9cb68bdytatecc5hg5xz4kse2stzgia1lgnl4q0nqiyoqh86uuhouque7amgkufe9wc99xvvue2o84waoccr4u5pv9l2ma7wmjexmqv42n3n73uvsuimo9ko918tqnxcbbylxy',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: '8rh13eq0rin6w0lww8coowm1n1ha1x5vb1xu8mqn',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'by07iutnx78cz2wgx1tv05jdqh626y12vvx0i5s16ambenltch',
                systemId: null,
                systemName: 'uz8omf3jx17wjklrmyk0',
                party: 'cdvli79m0v0o4m6kscqu94hggr7db9mv8g8n4rlii9o428cin4foxtng19q3hdyu7yv3hcanv1yoan03jtow1101nldghv6kmytubje0y2070a9e7g2hn0yvg9zqsobiemtvh97khm67kc8jbjcomcjcen1s1xz9',
                component: '0vsvozgfow5yhvjp6k4fi1eq6hitt4o4xwf95uibd9dhe4llmmdlddbdn9atag8hh6ze95jd9ly75l5xj23andzyk8b6e72ah3bka8oye6mwbhsmqbegkxgrmdu3z7cxppaf0u0dj79fcucxst5xffly0o1xgdot',
                name: 'qb9fivrhrb0dr6zke7rpm9cdyd2ibdm2cymybbfzz40veo3s4akgmvdwiaahm55oitj2y1mjm9kjgxyw3c02jgf91drd44tfq99d8xkesg6cy8ooypxax1xej3qnrada1nzut8xk25oh5m1ze5g5uz421et754i8',
                flowHash: 'qsmcrkpbku93lc5fc34vx0a26u3snddqt62obs2t',
                flowParty: 'xgjg9n32fs2762xyd4zbkpa3nzd5liak63eedgtghbgaqpiqlul0reemq0125drnootm3wmj7redsyr6t3yu7du06l2ki25ucixqpziw4dbcrqgco25bxuxrg9ztcyi5oz9r2g2su3jn2ovhj89kvhgn4ex0y27f',
                flowReceiverParty: 'nvx8onsuvztd78nd3z5xbks4g3680yozh787m7vzza6ztaibc9yx58yjeibpyzm1iuipv46ykebjlsp1yrn8mgkk9igy0sn6l8ob5lnnoespfrg5htbki0tewk4iudvb5wagkz64s1ag50gegtxhxkkras0ko317',
                flowComponent: 'a25azjvqsja9ukscyskwxs1nsda7m9xhx8qwuz32yg2uu1eq4hay52nol6igfl3l8yu23ffw9r3xrmfuop7qhz44ez09o7xiboww1qikhrw685qqxtnrhgy63j1aay5mnpgtkfmneg19ytsqfe4hfh4em0crrwvh',
                flowReceiverComponent: 'cutsmpwfenyokkrpheo5jlbrxt7fd84ze4ioantcxrfs0dt13lsmxx9zqurrulmn6lwzyrksuddapi38rcq0w5hmlipdgyg7cxvriillw0epy2ak4hgqbkdlh852ddw6sdr9ac4xlig26km1h3nxh8rrva6lz3i9',
                flowInterfaceName: '7it3zn0asbeoghxmuwwsq1xwp7xfkmw6x5hks2gbumqigxqg0dsrvpad2i2p1cq2qvnq00zw1lyl7kme98pj4vkuy64o9wlxe4xucgopcafh89q3jkqd2hdgt3vu35xlny6snayb8nug0cjxrj58ph046696vdn6',
                flowInterfaceNamespace: '0zhsv3jewx0h5jqgkkdjy0y4qz7ivugebegprtql841e2baysvk4ah8ybp8hvbma8fhuqgjvien120w2cxbm32xiclaad5seg61i16m956zg9tu4l0g96yw5342d5tudiqt4pom93pc7cra2x9lwez3t8c41nvf3',
                version: '359qzrth9e57ch3jqz1r',
                adapterType: 'qd2xr7pf9gryxmg8tbhyfj7cm7fum7o8z32yynzs3ef8njks61ifys36i2gs',
                direction: 'RECEIVER',
                transportProtocol: '0oil81echtvuheb4szqo8oq2vbw0qjyyslf4kwtx9jm6qfwx39knv6mj6o0m',
                messageProtocol: 'ko1abnci7pokzkq7ns3tksi92bey7sb4ov58o7ke762wd2n29c22etv0k5nx',
                adapterEngineName: 'fa5i24lq623u11g7tcq9d2x8241ifgwguzwfjd4gc3t3loeb9ttkx1x9ttvsil3bcuzm7s1ktgfw2brbe2h8f6b4p2e39w41ffca2k2uty37l3ya7h0t4lfviiyhuj0bpth6ggj2w6g5exd2yhimqdysl086rp33',
                url: 'n5pzop9bundk9jb3my25wq1jcfbpr5q9wxunazem3oqcq5obcsp3pk6i0mk3pqw5lh1usyt0hw5h42r14m152q8aolfkxnrqfp0rvvkoy6aq65k3hrs3hjkkxbrl1r2phfhvztgoienzqz4sttaca08hx7qqi7cfd9z7exnsj0y53z3lkkmumutwv3733yryzcpjvwelv8psoljhtko9in7vnuzwfxfkj2q2415oyel64x3e0wncbwloihhr894x57ag4zg199hw9425iy2h1xcymynufi4dt8v36cv72hjqmlhu9c15lmuqum43hxgr',
                username: '8nqboa80sl60ag7bjwb1hhllxvhq4bw5670ksjqnlaciy775cxr2cistmi7l',
                remoteHost: 'd36ib2w9pcn6kigwsgwo9ob1iepjj1bbxiiphq4lq8dr3zozdrjkb3nfkx878r0pbrmadmoh8879v58s369bvlo6d2xmoe58c906yvdve0p657u54yoxfubcwlxv0otmny0mcbpxydbkdqz51knzciyr6fxq1eqb',
                remotePort: 8317384782,
                directory: '89s6ibjv733o8z0g8wvd6puo3z7616mhhpu2c3gafz6wizd9w9bzh575chgzazxdj9mvph3gbxwmu8ej5mnkhl93w47fij5fw3yxshjkkj1e42xoyh60pl87ad8w6k32vr9zf3wxf7viveoj6298q493m5wzksnjra1qefh4uv09x3vyzt1u7tdhkmnswxe47eaido9is27gaepqo1r7hg9224pnm24a4pz5ru16o93969bstgpwtc29u87p2s53tdog1vruxz7geo1uhb6htguuqp91l91qycf4sln6k79qx3lafml3fi3rdbbco6oahiftxd5919ry18eer31lpxexfb90v09lena5bt2lwjvmh20mydje5juasjjzbgn6jj1c2w1whb8andyw0hgxrb4g1syvf6ppzqyzluu0u8k1dz6y2qalv1r26uil03yaxnbzjqv0ibky4smlhcsigyy5y28evauge0yr5g1nk19fsxoyehv3hu3s3bbeqfu7dgblg9y5inastc7k1mzoszuwvvrv0puw9o2wfyb5zxtcp3053epwpdgqe7o9hvdela6mxyaomh1b2iwgysh2y3dy0hd7yj5bau2ff8ven17pzejcgl62qf0ykg9kkg8f0dkm7ldiupw5hr2ygxj0uk2b0iwo6tg2xoxnm66575e78x3f7okrg3xb9sx3it5muwdc3yzm27sw3zjf2a3xndzj40s8r14xk8h1h0kdrwcfwt0we0a04jtpbcmqy10epxnywayj4k4gay6n4k9ok8cvjowe5owi11qfgwyszf9o3n40cq9hpe4r30nafscgmezrhe8ib74bskn0x8c8xrxmo3ukm152b5oph23pvxcpcedcgmskhlsm0ejhocrwnerpxaue5gis5d3f33cqail7yhpu3y5bpq0v8m6hdr1sai9zvl17hgfxfvnogapk95jfbrqy4fq28bbwggjjtur5d82124kevp3obpqvfb1iehzw0mhonpisuus735nk',
                fileSchema: 'y3u6wqreszzsow9wsoq5njl1jkxgp9n63byseg0kvl42i7tuoyo9gwehen910jb437kz53qhrz3j7bduexvtocu0xk8x8c02j9me6qf8nh0nguxmi9jl2add98jdcrzlwc6ucegxtyniq1wzc71hjnv9m908tnpyku1of0r0es139nk1yztutluwj1jjmvyxyn0so17sk0xbumwplievy6bn0cc7arbacu7yqcvjp2c2ikat3k81tmswjnz5gokzj3cq43bos2a85a6yw9uqgs6ayl3d3gb358rmnabxb3jy63xw24256qi99cpdigxjxrllntihyb6mgr222v8q3cxhwoaqsjv0mlh5kxl7jiqe30cyd14ui2p6wm71362uf64tk7f4cjwng0c4emzqd044mzed42e1gainy4ra0bk7brdz3ix47atn8raeqmpiyqi8obd93xaxrkeot3buscwtu89xcepmoj75pp9dqt9g8ewy74usr1j7tq4sca4mwb0s6vh55um3wwghjv99kb8le3vc0elb3zhqi1sveloj78t7yxs4im9zgc6uaqvf8umza26vj2ol8ynlr6f56qhb54zuwr47g3ajz8is19dt113ndu83thcy23cwrdc370vd50i6xchg49age2whag8cya6hfhf1uds4ffced857g1yk3q47qyp9p2eij7oc8rolgg9e4t5yjehka8me5njzbe5wh0dfakw5rxbf3yt9qlaa92w106hkhq9eea3bblx3vii4qejuyd5j9nbzbb6kf909zdxkbab2rvpf5v2qtegsm6q0pooqq5u4bo04h9jg3xfpbzr12tiipf8e925vep55vokjnttz59gntwsll7at3m55g3twkbomv56gnb4klyu4n7lcz1a891b5l83iskvvdailpkuwm021fxbytjp6fo9ru0ok6l818jkksi6a8szesl4ojyv3kev8tzwkscyxtz1l8swyv2ls5m8gm6dt10fj7u0m1c21e34m',
                proxyHost: 'ix7vuspusq388taqk4yihahg6swrp24rkfugqcvsndx4l4r9t1yn84iaf4o9',
                proxyPort: 7104828543,
                destination: '4h9g5tbg3x1gl9rhk49k27vuy37aobg98fwim2uc5f9o1hb7n2h3qgn24j0l3x328tuh0183pu2sj05ibg8ih1f15skz5iqorynbi3r4z60717fdhjg53r7exu7wpf4813mbhheyxhgh62o9580d6o51w9hy2j31',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'cs4rguq8hh38ywssbge7ass3xfx2ghy6zyr3tfarokmlv49h45h2ihu8vrc7z8x8uqlxcpy024de29zw405ogwinwu1or4uuzx9603wl14xajqi36f8knl4n0kej4mc53nn8453nc7355ncq4llqm9htbc1unkvr',
                responsibleUserAccountName: 'm6n25bykqj9c5f9qgeck',
                lastChangeUserAccount: '3v59nzbbgsfgxck3vw69',
                lastChangedAt: '2020-10-14 13:43:31',
                riInterfaceName: 'loo2heofunbycqnds40bumnendj6xbn1aduymmua0gghz1obvygadbq4z1n7k5rcya363f61gfzu9uodgefyjclhp8vnewqoakjwbuz5djof7ulqd4flacoi23r613wgjld2ts7hgz81rb1sxfyfo18hhy4wnohi',
                riInterfaceNamespace: '0axk52w3zn1zrwkiqoxdcezi0d9woibmusj06xr0pyywqw2h6mk5x0crh4axlkgtiz4vjs2y3vc1g3yjxratm6la942g3qn4vq0dw32k2zfveyz727ezj72vjybd32mpxcpn12yrig5ejnjs0ycg3bwliw16vy30',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: '9ijrgjf9fypy3zjo10zbmowxd8rqzrhx5xutoq6b',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'qcz9ahirumndl0ylmwjg4oqqdtpnyidb47dertwz1axvaguvtk',
                
                systemName: 'kqoxttm0y2u2823uq4qa',
                party: 'zq3hpwwxteyy4qw3h8mywxf5ttjp9u6t3g87zehqfflea99vsi0z28mf15aiz5uk9hswk6tgro86x8chy1dnyuoifwgbxx9p0331lyhwpi0aqg2sznqblkviogzb2bqs0jv06u0go7pkfwyh8hlcyb7izd3474bq',
                component: 'n3hmxzsgtjaslji3n7b80bxxnbn37o8xj3sc53mfiucgyjcc8n1e79fiahr4qxlttxkwh8p54tlh1te8g2k3vodschbnckhgxrtuv9fipj1vozciwfi0ubh5az3ucb1wh338p9j92wbe36cat06v3g2n6s53yiks',
                name: 'zcwmox251jkbxm8ix6lgtn2qmnhfa27fipnw9n85mc7u0ggau0b5lcfssqk5a241rw7tptf7b9lwelun4k6v47bjq6b4vtkswqtni32zpgs8d7fandoirdg6na6cxfpjeov5l67u19lw4hqv6cx5vz063knziy4l',
                flowHash: 'e5bckw7m14t6iw28r2disb8riezjoxv5dbuxhvfp',
                flowParty: 'fj8roxdo8svbxkeemiiaa5gheg3anvnfhcqs4864fan2pd3y1arvbyehuj1e0f5z94nzirpfbbt21ilpnndqggkwd144efjh0gxiumes7db0ysi74rqmyic3dfc54d4uwncidzupnsxygy8s6anvdwwyy01zhhfb',
                flowReceiverParty: 'zq92agd78vnupn4lysnjo6lengxxhpvh74mnu56ro2yyzedj9j4dbvjv861us9l4boxko6064k2d6ka32dcv2no1c194huiuuhczink0no4czwp1kx23vhrmr8yefrsmimj1ehp364bp16demj5fc71q5nwtn2j3',
                flowComponent: '4uy2gip6rw32gfe14q8znqztryehiiyu798x1rn0ljsqkuu6on1hnps4w0t7xedbbtyjyp1xk1g29a9ic2xlwp9yvp8tgtv9up2dcv0iy6bh6kn92jmr1450vfd77spjxt5ymcdkriadvk650kpcswsk6yc4auas',
                flowReceiverComponent: 'f0u1dkaj18mc35o9svvn3an1n5sv5i4gi5brpae3mjbt12xr22ubbay3xxqgbs2m8m499lqbqq1zvohh2dupv9hcle76m15e1bp1yhqaf2lysvd0hx4uenm1ckgb4rdkvsikswbg2mkv5zx65mjrlrjogy5bdo6e',
                flowInterfaceName: '97x74e1sng7d5ibz4adh8svsnsgc6uvl8xh4qbw6q7sd9cowxvncshj8s00dza4fuj6v6pofcfbrv8igl8babx1qqxshcqmpnlcl55e9cbr6g3ste7as9rj8kmt77bwgx8cccmo4y8ayl9c9816iff739g0lm29r',
                flowInterfaceNamespace: '4tr1umnpuzi2gui9vjbt4j73br4nev9bp59pprum9a0xl8fzah55rm8zt8xphfimba2ys7sh33k1fn77xufl3nn0v8y8ed3tjexbyp0ig2haijy03bh6nuevmutgzobbp0ompvhoqbp8kszkih36v5bxzgg0scby',
                version: 'bdhgtgdcsvj3x9psjci0',
                adapterType: 'dqan2cekuaksjqmyhjewcsiuhsvr9wmxo9xft3rhnordlxt8szwm7imfvmqi',
                direction: 'RECEIVER',
                transportProtocol: '87t7ztwodxek8ufyxjx28cqfpt8rvfw56y6frt1we9mch6pt4b07rxoylpo7',
                messageProtocol: 'z2m2hxwsugzyuzqgnp5bapw758e8rye0vjt9fl030mzs6nmzml50lazi3kzm',
                adapterEngineName: 'b4c6jw9meazey1gmw3i5b8ebal5rlvlzczrf2sfi775cmlclqcnv7qq9snen34w06ztpiodvr4hrj7s42ozcmftdt9qsqj7uc802l0r8zhmvz35ddxdstfb85rst1w9nki75dk5i26h3qisdd4bq04f8znmxdg3g',
                url: 'mk380zee3yjrpnan0v59rv2tjgj67e95jm5zitzbyx3hoep28tx7b54k0b2ly0wzpyjtk46x5n0rq6wqi56x7uz7c99ioh4h82f7rc1sb8f2pjxrzxzzmjw6cuq1sv5yiblrl0y7gucpl9gqwdlep289zox1e2yhaa9fg2jzx05dx7865dqxnb04aszvq0f01b7d7l3p44g7jrpf5mulm46gj39es5yaxi40ip0pwa6i1bqg5yychtpi0fikrvdmdayy0f0fsjhnuh8r1bblmyd9nbblrfysrtlcqb1qfylvbnv7vl4njfib7atsi68t',
                username: '9kxt1kleg8er2t5ijs0vtg6j9afa9m4d3k643fstxtv82xco8h1o3mizykyh',
                remoteHost: 'slikkmq7jy1xatti4j4icb59a5scxpqz4xq9jgtwmdbp6f27yewxwjbb8v7hnvxjokv46dof7jw48771yjp3fck55hd9fbempbe9zt1zgc54a48hwfhif44n43ijv25csit660ibvl671didjemn72xmcnrwtgmp',
                remotePort: 1255946657,
                directory: '31xq1t9f37lb81zz4jml4glxbmcjk3u47s6bs82lup2fg5z91kp9vgxz90e1h81cewh6087qtp2r9k11hepkeyhwrmvl8z6tzku2se4c5a7j2ohfmtcsz1epltvvob45tteqoessmvff06immv5pikrjc6ra7fbvycbneqvj8mu8oiqq9n02pdeggt8e2ampfgep6hyt8ic6dxvnn3it7cplp0cwyy2tgokh6e8gs2t92akkq0rc1pbsz9xahwri23gebrza7kvw6szbogqodj1akt64wka3pad5ff84cirnfmuq1tvukfv9ee1depfr4zu2ujuj1bmp4ivbhc6ciqf8oad4t3un9jrwaubdm5t1ekelbr9aokm3rpreupu437hnn9umd1re3ky03zqdmsdxbr1j4h989bik57q4vbxw7ldf4aqumjdfbbwn97ppauu2nkam5r49ovqvglf3u56ulq99td4ja14k0ry3i0kact68mye485p5e49186f744r2xa293sjts68z6z1u88pgb3ezd03e10hiikbo65xvwoaf3deu1gomic3qvps1lt0qo1baript673b6ycq4kaxcdrbpp7tknz0wafm3pyn49sj7ynb054pdk7nxz2kf3qunv14t7re519sfrotb5krre1fefmv57zks0qajj65f1zab00e5qnpmhteysx9g6vr1mmgfo7cbcd5juvarhwam8bvsuitxon64iiylz9a4b6zx2b3yitoo9w19o1749bkebowhtpeam2yqdqxx06yhldnh5mrro6c0jjew2wle5gylc7n4s77hhdxww8u3rkbw90shh5r2a4anr7vmaq15xf29vf1t5pj5vanl27xwcddbm7v11r79yzceoej5jv6kzve9m6p0knt1bhzezb3eshgqmdk3xqc5ulivmydtsjer2xdpez3i8b51s1cw6z0uk221bxct0phx1a0mjvwht4z02mxae7zz5fl5al9cie4hrporzukub7xtzhc',
                fileSchema: 'wgig59wsmu0tuxuuc0ezsxj62i3hk1l9zfximuswk3ghq77beki6s1gz1diz4k2ejcz90olddxiecvxbxw31amc4bs53l28mkz79361f2za9r2v8mowohxdb3m4z94eh9hv36dw7llf8j8ydjvo6c8w2mswmz9x5ttvb47jt5pi5hkr089mp6fhikf6c4xbiff68sq2qiq1qxycemkdbarrg35bnad4kz9etaaqijr18huoak8q5lvb5ck3s64yldaykx2zl3z5pvqarw8jryko1vucpma240ijnsejqnvgmkuoyez5djju8avl3x1xngibhzazh6kh2q2bwg9a1pswo919n9qhstqu1ihbv4efoa10pf9kwdyprxo1e5em9ngxbli1g9jzzme7mk8uup00y7e02vlii9ubb7nmlnq9ooo4nd6pger2qlbpo9y0b3eg6vt2w16iegsmv0qr4fdh6kyxx2reynua8tm9ncy5kj1nk0qj6jsqoh3gjr0bauh80v9xfvxzw8zag0gckyfgd0gog60cbh1pjikx1eshc8lpn7nuyq7jv6yzvunl9d1knmrea72i39zgsti4h25ejf9b6l981mle257xyq3lvsnbkc23k6lk68g7no1nohvwn0x2kag5lohmndwigg0980bowal7cx6lxfq95nqeviq7eo7w22vn5xujmp9pk8bdknqwh0c37v35w4d1gkrfdcbq69uvpjs9po0rn7bqouxnakqkvnskipt7vikvjbuhufzm5z5hkjqul5esd6arsw0bprgty1hi8v6r79tv65jlo6f73cplysxfvyr8fuu40v51c863qm1jkxlh9u80nh77bmvc81u5sof8n90gqft7fiu1zkp98vbonzm714mgjc3w8gbdnfbxkvgbitbzkmch942j6xzlsnzco36xsymqevjtzh65njxgq640rk4yj52y2ozt1p5xtvitrr5l70vg4by3g9bnyub79pva6us47v1t61f6x5hbwxtf3',
                proxyHost: 'u2m1f1jh1ix104wjwf92mxz0dd7l8gpdflc58fcjcor3mxgeti9ox2hpe75l',
                proxyPort: 6844952610,
                destination: 'v6zibr73ccnrnniuaukjeq04lwrhne9r62jjc8i4xtln9mkpm904hci59zerxv2xdl49nmrf3z4ukq4c2evgdbk58dqvvto7grpu0420hmqmp7feycub6byak7ms3bq796f3m1tavay27869dpeq4k5bk3duxh76',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '0zmdtl0o2g7wwck5iciomlaofr3n69kqanblumx3jlk4pl78iop0dfat4dijjn8uralgn17du7odp5pj1k50s5n1w44gkfj4vtwkxjq19r122zpwheee2uco32gs2ht15x10d7jdawrbnsj5jd7xngholgcgqxoj',
                responsibleUserAccountName: 'iag0026d8qbo93l5q8c5',
                lastChangeUserAccount: '501k4avm53xwq2jndcmd',
                lastChangedAt: '2020-10-14 19:15:44',
                riInterfaceName: 'h9tgdfm9gxcs1q4sa0mehbk93crmzr89d1uls2aoyb2ns65rijhw4jtzd23lzgy7sytmjl044nns7g2038tsvissy8w675p7xdbcrt7g0qo4cb0mh93jshdhrnmuj5kl53gx0x8k3hdzey8zh7eody0pntgjx4hx',
                riInterfaceNamespace: 'iztoavubg5beugizzxtc7njibuqnho3teq59i3xxv3epc5d9mbwwaesme73zlg1qsebd6nbvgwy2jswxqnw11u0xwg5sfw2vjvcfjqcv8mozm3dbe2s0ewf3xmpsdtogjiiisqdgj0ywv3fzqs65j3wzmqd19sjl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'dgos3cdybk6jsu9ft737ethk2vjx8v8txyqssuqf',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'z3rdpf8r3uuwce9k2pm5abpmo363e29u3mnbu89i1g7u9h48sx',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: null,
                party: 'tfj3shgkqvd34l2nimigylb9wr3ywu6g2z1vo8mbte47kshyy8wt1eatb3bp1oonj8se79b3gkkx8bfd75quo7ovsvc0ez8mfuyy7p0pcdp2mr9bgaopg7ikfnj502dhkeksaevm6n6aqul2ts7yawiuthufvedo',
                component: 'f94h0gy8uaj1wpjexl6wgqsjle2s7kq9g44df8yt2z8ua1d766qtv0f324v02c513da2y9v03jh50lslko250a1q1j34gi4b54bhwjifgymr3x4wktj01ypte5iuthpc449cnim5eqo513n2y5mbx6ygzv4zelh2',
                name: 'x242adfdbpchgiissdk49fpaoh8254b9a2fe2otdesj61mjjdjg4w62b0wnlzn0c0vwqa6cowt3dp2c41p4cug7ztwr33b8n1lxazzo2dz3rzuta4pxd5r1cquycjzde7b3tvcbnu0s0g9czhmurdcrk0reog7re',
                flowHash: '9njplup7w7z68zgrcu9ux1lbikls83vbvj6tphsn',
                flowParty: 'faqt51shjvee9kxn7pziwhjd82p4b105nll1669u1obsubm9rw6ab40d794g06mpfc2mgywlt4p1bwfwag2noho22103plym8ctavjnl3f79eufesk16zl9pq54kz3vr0ml9qaulp6g0ejka8ubrs10lok3hq8pk',
                flowReceiverParty: 'gbczceagp70txnmx9miykcsrne8616pmabngkbfp2ig0xsz2oimb2m9ke6rvjhponahoneotr87ip4yli4hpic0yw6lrub6wws3r2gu8zmsoslcviylqp4ql8pi36ftbdvlyhvredd86dgioc0zjk4b1bbr301ly',
                flowComponent: '910qjecq4v3hndb29wwd1cgdqfy6bj3q3483q0jk6jk23b3vdrqighjtw0thmqpv23e9e07xapiaaaoxt8m6juttabv1syxumjwd9bzs36np8ipe2ktv84nkz25dy53v8uzrozxiv9bglkrgfq7bflnny8fsdq9g',
                flowReceiverComponent: '6okacvq8nmf8vjdqvpi10msacjlvjbz88s7xa44xdsyhyy0m7f7iv4bhhp64vrlnhzqw9eelna4iaxp3dez56vdrbcgpn0aqkmapobum95grof7pjgwehn469mqw2glqlcj61n0gfivgsq39tp1tq1rbbv3zkdyb',
                flowInterfaceName: 'kzpfm0dxu3cdiltojbjkgl3qsvj6tr19j8t5f8klsd06abq272wuktsn8anlu3ch45k0gsgl1ao16etglshsj4pthimoweewyu2tk1elb5bu3pwbh50r5tzwj5egvv1up9oy13dy42oxzf2s8mexvymg3wyz0zda',
                flowInterfaceNamespace: 't6i4mhgivy0qct1v0c2wrl0jfcujn88yzxuke2ym3skgf97is3ucmthq056h1ryy0fkct8120f9n7maibmfttie7bjmuxee8ly3hp51r5sg1mjg4gtjc6a6j2zus2v6w3uzedkk5cfg4z3auzr2aukahpkgfokfk',
                version: 'yekuc3vwndf9qxizwvkz',
                adapterType: 'nwx3ub9n9z4booin29uc5wqijmi9i65xxttiguilb9eo0oyg3hxjpy7cisdh',
                direction: 'SENDER',
                transportProtocol: 'gk9ckqlmay9wpwdd95xmwmjwfrhppq6970m3tnmmpitvxs2m1281x8zcjfxq',
                messageProtocol: 'mqwq9do77e99rkr4sdywp2ozlnaqm5m2b5g7uksgqgympzyyovy1sss7oy45',
                adapterEngineName: 'yk3t7cx88q1k3a63m7tc26ibu5qpnpl3f8cga30jfmoemzzzjqgcyhsqjfsd5ub6sz1es7d7i1ni4md3ug6uzti0bnia34pvq2a1vf77eszatuhuxm6jywfg7mrxwpyynpq3yqjszjju32etw48yxgo208tmwxio',
                url: 'pllekodc8ro7b3oiw5p32r5jtnm6wfr4y9zu9ai40djjek7xoexh3ef1bw2quix8f8bz1x2o9ymgmtxlr8r8vch0j35kl4uu9ols0hceevxoam9wdmlzxlphmm50jz9ojacm77z0h1wex6tpuiq2t21dgb2dj9lwhr9n8r4l83qak16b6x0lhmn7w0z4ufhc6hxoctokbk2tibdlwbl35qkuz5ehqpary8n7421sbrx6ibdi4eyrfm80u2gn3hcjjt8zvv9jfpb2cahgtbx97803x04b3bd2e0l7xa4e4i54xecpg666fdlgbzstuish',
                username: 'm1526kcikx34cb9rqsiniy5grn8v48kx9z6pbph3xxzo6grdmicbk2h16sty',
                remoteHost: 'kp5g6cz5agrajjoaj3yw9k77cujnegpvd3spn974hx1bid2f5s5os5a87si8t2ovjehtdijcehsgciqmejz3fjagoveotuuuvkgai8pfrybyne33xwgj7c82lb8e98030uogtzxzsv3l7izqayqqb45p276wzo6w',
                remotePort: 3114416764,
                directory: 'zpmrrk5mkh4nnfk2zctsxb6qskolbtn1jy6k262hxbr0306mseq022win1fmnnwnmtnbgs0be0x362q6bzrzfe5w2zzg0sk23sloqniem1d5ppb4m3rb25oknawiu7ju45p7k1qfj4nlzecce2wca6a25jz7eokn2pbrur7itme6wvpmvjgtbl9sfc757m4alive1hgentjvvcoof66rkvn5h4sbm9232cccfqa7zln9vcdzkw35im8v6mxi641vf8vsn7wj3v2200gq11qigpx4w695summpkmzjbupk2mtrar5cqzxeei9akerrey186dwaf4fiw6ngncqp3undeywljv65618dcfsb14c0wy2i3vuwpw9fsgflildy023i99ag10e52bsfl370xj7j2mmasyvhxmzzcew0xu6vbnb15sqmpjrmpis47pbpvoc64plk7w16tnyx7gjitj4p99mhpb4p37yn7kakz00jyxhs7gu3tbfvos0he4mionwv5eb5y9loze3q5h6wfi6x24c40vsn7zdru8vcgdsk9fxz2gzf3e2ikw7ljv8kvzy556qquqw2kvjkut6gtdekwy2q0fzdpqppdh0knkhi9fk50lit1nis2nzqhoqc4cvyqk1xfj4ynpykbucg1n3nwdwnrdu4j1m6figoeve0k5tvi8kjhpp3jfx5295jfe80jcmg92gdvmyl6i76p8bfrd5zegt57kxrczc2hh0l5s6iwqlcns1lo0wsk5f2gnrn0mo4bo1fo3cyt4vxnx2y3gu7roeesqqsltdfsz1f3ae1himq9xdof3lo28urlf1ybkl5sy1l8sluiy9dzd6i0nydyhuz2zgq350lxx4zje4r9hkb6phiihbolsniigndczbvo5ja8x3qf41hntuy65ef1nso9pumfudlpq77oa1mwwc4mwns78rs54ijtb8ehwjo3iyu3af0vutn4bo7zetdm6iccjgezm09b0730eif2vbkr1j69frfpshc86w',
                fileSchema: '0bzmcu3cd70ugyvtclwda7sys44sj3nyf6i7j4lilq7por0l3nkm3mx324ss9v4nmkw76eb0d0aeveijc05pkq8p9mffbsifv660ec3ziu8s8q8ocupz0ltfh61bhlysc9si5nh90wxyasahwx7kyspud2qlm7uj59iuiv5vbd7i4n6zq30sw2kvx2aomj6zk3uslhzn08006v039hhsacgkc7r3w0hihaxivlyb987vqxyne9qm11926gptmlbsnn1jg7uds6eqkjm5k64mkce4btm10pckp2zq2dqopuhzhgmn2824d52yicdj9hycdywryohxawtn04bx7xait0nptm2x0hvc7p6oncxrhvrs9ob60e0yu1omroezlkjd69o0eburz0cwdc0f904yvd3yb5z8sduoq74uol3wg9maidiuw3amvsc1xgrullvrxcszg7qhhd080rfekl63a9w3i0l0knfy24r0v2awze4xr2dyhhfauiuce3nerk0v5xrus5ftw0j0z5otzduvah99duc2ti6v0y7pq65lourisjf879u6x0ij04b204dr4yqy5ygmyfivpd8z6dfh3rs6fsl9u5mgoj7jjm22zld1v4s7wkhy9v031qqsn1cuphbipbl71bqhg74m3xzpkoadunymj22c2x6tsxn39tn9im27zkdd972rc1lg89pvolspjo2q0uiy2z2th4b523sm12pj9siccj5fpxwz1amnsr6g8tstt1lzp317p0n3trj97vdb0pk71bgauzlajjbwpvf8z1w00qtdaajtqwom8jpku0e5o7aay691ko1jwwja4mfjsj4k90tpfn7mtbd3w31vrttzeoiak2fu4fqeleoq8ykh226jghow1skfycap7l22s9lhtybuuj6zpi7srzxq5zo80ujdh5mtu8baios08bl57pbzdgq4op0j6llk8bjo7wfmhcgsnwfrz48clj8vowsrv8k335vofng556th3xv1t8s9ujdgs3a5',
                proxyHost: 'u84i8hih6nhh4azd7qtixkux30ludfss6spvrg0ox5mdv1b38s402qef7wl5',
                proxyPort: 3455266509,
                destination: '6qscsvg0v2we6y85z1rmyxuhf1hxw9scw1r7oknrtirlyos5g4g4irmxk7go3i234nd42l5ma2ciym2vpx1mtb13x7t1fh2fh7o16g7wqxvjszux48vwvrduu0qxzsgemijmy152lrfenjtz8pc2kf1mk1ezbz1n',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'e81l85xm7inslt81jqdacb5ukt26o5wvzu5ar5z4pn9mzaos4qfk9o9syb2mt6xgeuy7117u84u838nwq8glfd2f82h8sqr9p4zt5qdnxphkahgq0fqiksoburm1ind27dnks0rk5lw7nx5xxyr68xn8e8nta3nl',
                responsibleUserAccountName: 'jnbp58xe8ijwceq4xdf8',
                lastChangeUserAccount: '17dsg213owvb5c5hd8mh',
                lastChangedAt: '2020-10-14 10:02:49',
                riInterfaceName: 'fl10uzfztivsj2zgqnxd5iw0b8vw0fkhttwumvhlckwi9yjlyebs43xpwbzf60c1osedh2jmif9rd5ghkjnt7zwe85uf3p0iacqdghdg1n2sx3q74apizcovxuaixqrn1az1tuwpx5m6wxzulfq6amanog8kyeim',
                riInterfaceNamespace: '2yjjkhb4ythfu75iu4fsl6kfp918yxzrd3diuofr1fm8rkfgmt1zy5bkzvx3y0zkmt4bpmozkj7nbabniw0vhpxi33n0cumx88g04jqwi2ygrig7t5qudb1g9hsnpepuy9np7op2qa1xqmsomztvbcg043cxdaer',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: '8n2s2g8b2cu4lxxsabkqjqpmvynlzywg6evvzv2o',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'hdfyzmgmx02g69yfkgvqs0lt8q4ahensv36ae8s9fsb6rt1j0v',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                
                party: 'yqz7jdtxq1kd31mzgt9gh69sksakvlokiwdwubdts2qmttq8vs6exprnjs9amimzadaax2xpgyjcj5njllr2lxyx386aetbvd9ei76iwxbe61r3b0druvamdfs3jcyt9dnjzxfim9l35v0ldgv5r58lupsy5i8lj',
                component: '582rmhij73y5uh0955hkt829ovrsfoyo2esameayb92s7wbrkjt32fqw0lznlddfkmlo5bqqku7dal0z7tgnff4z2ami1zz3e4k6dfniwtjorrfnhsikbvp6t44iex7uzr9odlz0mdgfu2nyc0r9fu9649k27v7k',
                name: '40lx63hhi0vg5f983dg7kdrify3wt21wci695o8740or9ekr3oz0f3i3d2gp3itfgrl7b0pxh67k77hv9jse2wdpcf76eqboecxjjuh44cm8sqjg6mjdabv4mgc4neih600cgpwh0k2lxldg1pvze4zhsgzxpjad',
                flowHash: 'aroytu2pb1fh7ecew9iaya6jqvu7izlmxqq6w96k',
                flowParty: 'oy3ad85ivjparollygvvm92qft13crb3frjn5ukysygvxywxf0h9l1gw0fmqv3v9l1x37cqm50j52v23trtfj1m5zvgji6wk8o1boczjpiuzoo4whel7vt0nlyot0uk1dj8f3rasdmghe91wpyykbev3uwoigicq',
                flowReceiverParty: 'cyfu7bz0rhykdmmsuhqgojf1g6mo0wlqrv0ujlgd7dkldz144zsb9rsdc1516rrt9tlrmw6ksebcsqhmfk43tir6gdgz94l7p2jfe2sjzwiel1ju7xb2hogk4ntzhruomca4qr9wrsat7hd4c7hp1hytgp8tiyeq',
                flowComponent: 'j2h4tap5b5lij1rhi5ayxshcl86b00jzgmas3we6u0my38aiwfrftm5j3z8kiv6dilfawjwltnwx8pr7maxyg7zjnfas40q7gcgamyuq9cjbk9yene8k6semmu8oegcbfqprimvrmzm6ryx3qffw9p1rl8196spu',
                flowReceiverComponent: '04axhsra5jffhqscg3tyyzsetwdb997hsfwtly1p90hvlrpfmnkf43ie5k63dyozotjyinnuxai0rber8687u7h63zxqzjfs88gi6tv2gii2x6pznjv3xigoeqvn9dvy7620hkfxd9d4gw119uxqjak161v5klvl',
                flowInterfaceName: 'j7p1m4dswvr5v1osedp30872h7xkdfe087d8ioy50t6hw01ianqd00eq6s0crmbhs1x0udl8i25cdp8v08q88xcaurbqwq0ac7u20wannk8a78w6ymx1bo8lsd279pm2nz64bvopyxwnl64xjv02iy40dhwabr5b',
                flowInterfaceNamespace: '5pxo16y4ydl2pxwfgllcubuy2cmfdxcpibahds9m5tbmznnw319jmzqpw989z4pj6tbvbehitvci6ww8okvpld8kw6s292ggq5dhhpqmcvgidx5ysqcqg3wsf5fmn2pc6vtpnigyol1jj4w7yjoykn1jzll8v6oc',
                version: '167pbwlhlggl68p1scla',
                adapterType: 'giz7oi1mc7pwgxtx25nrsa31qh23lhn0nf33lsicvocrbab1novr30kg63e5',
                direction: 'RECEIVER',
                transportProtocol: 'zpjttkdlt9esfecwyj472mq6ravglxfp01qci8tyhmg5a8k9vceumvnhl82c',
                messageProtocol: 'wq4kp4z9dtchtmj69ywlfefvzcig90nvoow9shpakq8p6f0gus0yoyu2a9vk',
                adapterEngineName: 'vy3k7ly509w7dlym6yshv8486zw44d48playxeyid723lagrpgo95tz1mzqmu8u39k4m0xflhdn9b7hamjr0ivid1l4dyvqjnnh2m5efhymgji3ihaf7kwblugp7gplodeb3s9ya76dddsz0kykh6mmujhzwd5ny',
                url: 'gwr90ennuigcciu8foe9f5x1owsucheb8ook2iiyj5fwazspzbpixgggfspnd1i6i5o2m7j1ytoyz4brh0l7nrfkr8ajtxfro2x8bhmw634dp8fm0mip57fj08xwy2b0a3u4yc77hft1gixeuwqq9xna7sds9f75ifnizm174qhfskdiq2kekx8ebg7jegtru5yuay3n0qlr2q53az2m07x88opzmy40puffn1sd5qt4ysd0md9f2hcb0lr6jz9lmoxxmz6bomftxtgayyveqms06qctgfqdq52wt43x9esbp39sgn5j7xaa35fv5d9t',
                username: '8c90mwfaqavdqcivqd8zcm2exijskeee51a7uv9af2qx4fnyg68wmzjb718g',
                remoteHost: '89s8xxvsssdau9xshqkdnluccdx713sigufqf5ptmnjni3f678x7y15y5dahgi2zuivfer67gfb87m62nb1z79qevha80vvuy711jlsqhw22i1bqtr41puipsymm46uxpictfvfc6x343c6eobymhndeyg0g8365',
                remotePort: 4604610842,
                directory: 'bh7emqn38ied4y9rol4v2xclvgfawv5p38m3swknkz37qfrdq9ybbs0uu1jpjfpx2j1ylrquwdfi331hji9nkysca4kgivay9ic55z7zzw0up0s1e2zjy6r45dy3szi9d1a2bxawpyd8ywh3r694h4bialeaxun00p3hyn4pac8xl1rhaahn8t0n6ldn727z14yxcrthhfq3rw09b68v14wmn8pulxuvsilva6m2itnnc7zdyvi0x8tlr9rq4ccafeb9t09ova7o0kbw9ov0m6mnpxfp0e4umhftm39hvfxpay430wwc9tertcz8vmpeqco1q4a4zggvqx56zy940n5774zt0moc1j0vs1x6yjn1jkrdkebuols4mtql62uyb4dpnrppx6axn8hrhca0q5v88hqtfb82u4g55jd9wykdolq7xqp8nrd0wgla6ej5cmb4m4gipq0brviplakeypxzgxu43kswa3sebfar3df8uczbbbqdunkapdlcs6qr733a78591ypd0v6jmosp8owbfqqzdge9snmz5fj7j05pfxt0pkkhdhfi6l13qynf828rjiszfdm9obdsu2m44q2z13m6mre39gfnome5iytl2jzyrkqi8fsi9n5e42wdgny5u688h6lgd5svhowfgdsxkh566u7mxl2fq4dttkwt2idfbt58afqcmbs8yrjb0hjkktw89lc9w6d4d3i6xd3exgufayaa1cm79k3kwxqt4iz1cpudaj8dzhsj96yb1538bohhvs6h5wzh2hn8y6ciworql71cntzz2anvjztouw3wpwrchs0kb6k3oqz5g0djw6yeuiulk9y8s7hniz5bi8r72ubr5tvwv61l076528rxoe7t4t7goiz3417th0k8dl8mldjvuvaaqrszf384khp7mwu9d3k017xuq5393rgke954ak73a44gvxmgxidnzu3sh7miy988adiwp9fu8vrot7ijng6wku7h5nt9ofoq36tqarwhdten1wci',
                fileSchema: '5jsoyq9gf5aksnmtg3jojv1xqo9ymy6uub48yaq5guyea6d66cmtih7pfb6fx7lhf59fhtfhjf4lqz6tjleca89t0wnu9h2jutocu2bi0yza1mtp5zr8vkawn5ak3vvrye32de6pyjf147q7i57gxx8vr6o7qwx7rng8bagq60478a763em1nf3q39dbn6170h1vbnjffrpl529ttpigfmfzojwdo41tzgev7kpbw5dn69prbsq37won09pnsri22c0fdx2e48mlak616k89qo4x9mk3i1rldacc5r6wnu94nvt0qjjq1bvqo8noqxnm25f5puz11tq2956m9b6uwotx861u2cl2q56yiqk4snpmt4k4lmto5kani8uqxqx3d5yopajdt5f4mqr74deji1gur2rdslx4mz1ozy6vjxdiv0d3ify1xwlgjyee74p8fdq0w72x8t2kw17wgbt41745nlhmv2z0p4q2kdbu55572rw79nx5z3r8tdnqy4hrdma3t1kmtii7oq0vv3kcewud99t9w6uv50sraelua22qncip8cb1k6yryjsksjmfegtcthh1mcwjstfefcja7gw5mmrlocof2xz0rq9czatz8zr8yfjo0swrl3r1gizi3foes8ry1fwpuad0egzd97x0d2c65ukkztrgfs8s27zrcdn9huonnhhfg5a6uszubki5b55xixxrgajouche28derxyl8c0m6mpmhyl7xba9shri7vefpc94fneh1sza00osbuwu5zqzs2ywh03523tsscxrwrsbfvcot1tphf02jtmppztphxv6egael68mvynn92d3vilf8po8tnzu2q2rbttjjw1v9adxp61v0jwlrgk4c8dfretiri9bak7v2cx0ytk1zhrx0bgpuhhg5ky2zbxtemm6j09cr0sljs3y6t5aibwrsrsibbkrrnvrq2ji7bunz7peif1t8tqx6wvajknjl7kbqojqw10zjbc0lau5hkglebckvbo5an92',
                proxyHost: '5ehduw0jtfp6gartuoezkcek61bna8zvunk6uql7rrdrqxf4uit2185rgfvq',
                proxyPort: 9983573845,
                destination: 'bha5lygklow12kw5h1hg47ucxxytfklrxm6hdincnn4uqtlrg3xwpoih42p3kekvn195ctq7g4ytgish617fqipxqaza8ouv3rzje2f0es4n5hbpwza90k5aukusymhc2lpcgycls1ht6xgm0ch6h3eh7opm4bdh',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4e81za6r1ywti6ytfblczwv67kwlkyxykn9s6djb2rgxdhs8v5m2fu9ctpkb3w32bkwp1gd4fmymeq4gusbs2adoy1gikao6r1vyghn97svmvlc9d9xlk72205ek9xziqulstm76qanbag3f5qjs2rlw3iv5wj6r',
                responsibleUserAccountName: 's43hg7i5o9n3rckzeowe',
                lastChangeUserAccount: 'm1wiy0ti1auv40l0ker8',
                lastChangedAt: '2020-10-14 23:43:49',
                riInterfaceName: '4st2cx4cjz106jk3yivladlb0mpcffijtfm6zyothi40oq25o2ons331ovcfxlikvmpf1w2ec8ntjsfqaeyh3gjwo522y3p1xyqh3m6avvyzkx73nquy58h8djzc0hsip78birwb3zlhpwkogkczdl3luo0uwp1m',
                riInterfaceNamespace: 'g7iwciep4uw7de2usqcpsrdbbj93x4rgvs1fmoflt0q4wrursab8v66oaeqzw07riulc3ep7mrr9goxf8474a33vt937ulotnltj16a5u0jkddwc0583896pwyzpjv3f0etgwy2489qowgacm51mratq7rl8mhso',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'kjo7qerrzjdvoa0odlutnniobyme8i7fxpyr8hv8',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'f4lh1vcgvaipcxd607cpfhwuzlbk6s7nshq218x07kesydzbp3',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'cjnbj2bjx6s2r7yr9ijw',
                party: 'iiraovm51gw85epjg1x2ccwghg5c8dghi3rgfrvh0aa4u692wn5kp65jkq9p4dtu1j90kap9grfk1y27thw3lsxsiu9vq3glngf33r5x2xfn595w5ki9s52dxxv1osztgh3bw470z8mxd16n3orqmkxhdocdub0v',
                component: null,
                name: 'it9cqhkd5ww7udom5o68zvrch34bg7iabunqht2ntl9euo9o7ju12z02r3ah5f9t5jmlwacikmt6x81s2jl0475lf9qg0ezjn38ka5u5m3qo1duwq9ckrwkm07qayqdxvzqn7o0twbd6abx58smz6v6ndz5dcc87',
                flowHash: 'sazf5v71t8l6lguke4cu4iq8r111zhy7xcwcbiis',
                flowParty: 'vdtubt78cc9hfi38d26oopn21eo0rnl8aij3qb3c0s2wobxheva38fn0zd9qepp5jn7ewzndrv465ct08l1sfunnk44hk3r2i3rov376z26k8r9qztca2d9xbuyjbjete1wx2rwujmjbequdohq4aekmoaza5evq',
                flowReceiverParty: '2r5ynngn000ymybg3omqlmj3002iptrq0puod7d2ceejdrh25h1lva8mcabvuwlejaf81jhm80sn5di4biwvla7u817femx5s7zm40dbeyb3tadkyzh36girtqg6rckc12i4xpupmgtsx6ju2fib8sg8osx4gxw7',
                flowComponent: 'em6o6q8cx7e269283v80sf4pb5ai9amh0p2vmhwzmmurqsooc2vwndrzdgbzh3hg10le70mafotzct3pqsozn5xsuglxp6udr9mk0hxwynlszxqxbakq1mt69lj874n71hrmzprgi13poze9b7l71dl3q6exyawm',
                flowReceiverComponent: 'jd93lftg3ldd90za6ug04jbjo4ors4j5nlxqalpzohy2gzutijcq7trapoycza4vvjscdmxhgst76h95pko1dlacrl4an5glwlsaaq92gtr7eftcrzaxicbn7i8ssl7vpukv4xxlk3vihc7snx6ujp5gnparp33z',
                flowInterfaceName: 'tluhm6s5ut5sqalzisvih2smeyrjmuuemwlenzzjkwazw2238qdfhzt4b8r81jh9c1th6y3cg1kyaeup3kvu0oayjuhk2dyhp0yq4gat3hs4cgc4szm1yczw12xotgvon17mrj6vvx75mz10d63gactko1sswzlc',
                flowInterfaceNamespace: '8xutax40vn8mdl9p5c64nw95cqcdgvxjtqyjx633ksa1idkmt3tj5h9w8y8bt82vccnd9mxgm7ww7nknoug5izsf0ozquckvd46rzkzfdzhuidy3yjn0vul25asjxeifb06yfnyooyzdjfukkkj2i96olh6enxlz',
                version: 'he13de7j1qzmnij54rpr',
                adapterType: 'j3swpa4wwofa5w10aocznikubgzpp0xamdh87bdw71emn7lcijsbzv08n37r',
                direction: 'SENDER',
                transportProtocol: 'f91gegar9td33fro3gfw335n9o29eggco940j0l4dycjdw7eos0qk3r70owh',
                messageProtocol: 'i996ltyz7svcx0p8et31v8a0nfa22hq5djb86ink1ga23z3vuwdgdut6llv1',
                adapterEngineName: 'wlm7n9om4g2dtx1gpop0ipp1d062c5nkz3388j0oarcks8yh5pvk52kbi6i10d8p1r3xl847dca9m4re4cymujf176g1skc39wbx97kzi795bqevm9wj4ign66yu3a0f1xuex4vk8nyszineuz7l2yyw3azxabki',
                url: 'dv63b1qkb3qqfktc5t3tcp42mfi315xdnv3pkw5a8x75qxibng9i6t1286ujjse4gej9vv7kdk5zkaisg16wqj4nuu9g39feh8z9np2aqotvrdqjkitz3zabayudl5pm3kjs9tgl6wlojcslwhmbddk2gjhpetft32t22fu6kgqf42u30y8v9i0l50h1zsp6picdd5fb71akra476y19o3ekb7bf6uk3llczzmf9ibee1mw77mtqy18obsct4tp65ifoh0gdsrg6bmdjgtzvw699m987ulgibaw73lrlzo4yossl5b1fjktbkozffupe',
                username: 'lp2ycr9yb53uy2uc0iiupnir67jsbfho2jm9qbporvltju29pr1jz2ycuk9r',
                remoteHost: '7uotqlm9rnk7ymz7fh7ca2d4gby16jg2rujf1nt2gj4p8ma0iywdcuqjmbymugr44ag6tqo931mf26xxsc8838nf2414fyqewol2zqfr5pcr39maj2zv23gixjnlnqigv80sfffbg6eilu012xe1mxzd2qpsbkfl',
                remotePort: 4106737486,
                directory: 'v1h65fgvhojuksr6xz73jqvld8vgzqsq6vu5m0twrmx7qemzkpgteq8j8b1cib7usaavkzk0h1imgtt8b1enz29bvspw8he6wk6bmzhae43vzrqytnr0ldwdfv57632bb2q0xu6m02l85z5nfwq5ogxhp5iq3lswvxxxmg5sy76pwlv1picqpkgg6cprz2n9ibmv6qyjqr80jgyvb4wcwocaf4d1a0yil2j3m5ro02b2hp036obk16zp8mh32uedi0mwatkx3ev1bescwykkrku89ir0mkmbe1kekivplcygaz3xcbdf3qntye99zna82byaoct18b6x60i49cgo2iimq2xa6gw7xg88lnzh99c5avi1yctsk30kha1niwu24vqwhg57m0nkj5jhjrf6k1ptj5jb42yyvvc09xxubna5kie4d0n4umjsjipbutmy0wh1kxz59cqkzbfgmfk10b1eiaw6omiy83evbexgdit0ussc8uw1myvz45q6pf3v0qynuyp4thsbaz43uiocswz9m2d3qi89e0v7c1wj503n65w1foj0eqg0agdh9zx7sotg834hm2ugj85jl7sf9jhevh45pv3qbdeh7i0l8t7apr59gike8trycoc5m4scqmsla956dzfpl73s0xxfpnbwg3q2z4ljrzl6iyxsf8zopib1vlah01bqzl5cnk4zxloxjbfkro4ddt1bi3hr5ja6tiz54i3087v7ijl0xngllo0kyuknfiv8ynrqvi8zltv93dz2jgpofbtlidx8l3fxv4fkv3vo2ejatquz94vdcyyr16lmikeru4m2z14lvofsz34mp3q56rzbg47fjxlwzwb4n0ayxzuvetf4ehtvpusbtiqktivt8zp0ba7dyw107mfv6g9xh9cwxwtj6ev2quw3umaglpdamtio78xssy28t0f0es3vvggap8e1qka8et1fh0xg0jhwz2vqu1l8hfvob3dgynxolg5syatjlg1l8ctqckxze2l91ffk',
                fileSchema: 'ehqztr1dqki64ikqtcv3jnarkvpnh1oehs1lhrfirmha6mm9pvd424usxn3g2ofz1ybrkvzfxpircd2qhbp3lfnroosxgj1fpbyh5dxhjqfv1dxbafumulqh8z5he2sh15jfqfnwh6ygs8ludnxbk36787rupzhdjgxyqwd33iehmlxqpzew51e6mp7bpgymo4t5xrfmoxq5ikpbmn7yhdy9yar6zfhiagowml975ruy5il7y94tovi3se3bwak9qeld6av56ktrnkwuk218rl99pi9jfcssljbj0ab8t5b5qrf4qbj3ligpqpn3asm15ohyf9zm5zftslseamoem78abfw93tvuf97qn6loipm3ahdrc6gxiyp334tj0aem8nyc3rjjsu6e1xu42mztg8zbxd9uujsmke13re561m319qw01kv5hhbed4a9uv4p29waeyfikd47jsa8xw7y3c4y0fj1plbybjegeiq19k2lv4mpe25gc62t8zb10fsbbza7ev930iei66p2i2zf3acg728nyd0twqp0i2lof8qoqft4o8tczzry42703t2smho0joun4n229x6k3160fvqem34muktlitkesfu1zoy96nd1bbbmqtql7pqqo1f7yssxgrnz2c0wt6vg4i4jfwbknefbirb7zk8qqfu0hpuyj7mjxa7g95zte6swzdrmlve4z0vsvy72xwyh1pudc31w72t5yqsqsflakpccmqi4cx02si9kb4zf2x1ljuyn0dz2wfsxeh8c9o1fxbjyetyb8jr1cszpsw1pnzo2g2tl7tco4ru4hr3cjup8kemnk38zg7f31uoucns8tcl94wv7hwjzrxudbftuauas247fmbid6gvpfmekeup5w9jyjjy8yhtxypza9q90u7utcwl5txiljb5pmfnnuv7ywstgp05o5yvbwxnyyeemzxhq73tnuznh32wqxrglbsjzxv1jeu6hx6iphl80xq6dcm2p750b0gnyodgnddqzapyt',
                proxyHost: '4h73hqihejoues0ia16c4fn5qp3g1nqthmw69qc5gw9i2uhbh7iwjjz32v1j',
                proxyPort: 2335322076,
                destination: 'tpljcf2drdatifvmmhvgxrv0elahemgho6cmq3tm97oklddm6bcg83ozsv47zi0euvwlkbbfeudt6rkyrhoz7vx54r1cq79d3of8cfdr9y0zn8cvhvacl9y0v7lqqhk5dug6tgsk747mrqzqyu56n1en0pu2w0j9',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '74qqyepa0jnng1pjlr2s4wvti59e7e228c1no6bpk2et7bwvrg2twc8vjxspymxa8eh8wb1d9vff2jefsat535mfao5felk4ej2utcg4aaulagivhjpysjjvi0fdledc0w4gibtkkn9239u40nslydqd467xpmag',
                responsibleUserAccountName: 'spfa5s8ltf1y047hfz9g',
                lastChangeUserAccount: 'nqy5gdzo4hyb3q26zbzx',
                lastChangedAt: '2020-10-14 22:35:36',
                riInterfaceName: 'ftss2uwi7j7jir435555f79cfum0fb9bu76xlolbkcygi4nfh1itkr0cd6692d813dddz6yw1t1qx90i29uap2ymoy3tx6iolq3943npkn41u1jxvhq3iac12jqyah965ga3pv108viie2xyzwr6bczjjqgy790w',
                riInterfaceNamespace: 'xoekethbb4un9ypvwwok45l3u2wrzv43k48bd59phbgeh9n60orl45wq5kv15x2n0f5djfol5aog3evw6m1a60znt8l85znd7hjpr6xegpizhyoc4ah31zfb601eszmjmh1jjmv6bxchtq4iyrcogb0lmw6ksheb',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: '0evjr7hckhhnx46gfc585ek69dkv7as6fsxku3bv',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'kirwmscfiwfauz1refpr9rilaz3oekfvl6gbiq7l3qhjty30fo',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'cd0qw8x1jtluy2vyg4rg',
                party: 'f7q2piz7saa4u93j5coapxtcar72bl2qkv2uwaszt8no3uhyiv74tjm0p4tzqxtoxrw2sfqk56wwwjmb1rggnk4axk2w0l9atrbgv8necvtl5srzf0p7rfumsb7hcc8ot85x73ri0wbzf0sfic3i7pjffl1j3644',
                
                name: 'horryl8mfu6rdbskgj91sf5mm2et4rnwlv958xzn9okgl8drj9o6zqwc0aeilc009qvgp267ekcpeg1mwdeoi38tixcd0rzw7aqztnqmy8chm9xjucymq8g6w3v3i2wwi9jvz910ayzepnebk0fm8ufda42vqsya',
                flowHash: '9ructvowgm6rxeewbaz7ua9cv3jbvhlvjrzr8ju2',
                flowParty: 'n3iw9v9acepj1j5zfpj0f5rg2wmu8wcin05qy4r84dnslqbe9586uk8vc16xlwdhvlaz1hehpy1v4cnbp7xlp2wwn5n8r934sxpiu2bka2jynj8dhzq5ceyoae90u940hb8yyhn48gdjrp6uzr6ebiv1t5a4nqlk',
                flowReceiverParty: 'msqusz2py96i7elmcbjfaj968eu5ks6nds0gzgiqe42u2dv1nfs54s97hwhhukg17qulatdkxhwu5igi5glci2a780sw7pli8f29o9wazrfkukk1ulgnmothqzgu3umday9wqoakqprcbijfy9d4mpf2ga3cwczg',
                flowComponent: '28sflf1nb60v1re3mt4skkdnv5t08bbbw5bqw815iwu1j0vxlzod8crprv1pn2ykkan76dx7jtmiotmpg6ybwg8yc2jll3ss3hmj8ld2qfsdk4ytzjrem9llz0o4x7w8ybhf7f020crilx69nypcf1kfhf2ti51a',
                flowReceiverComponent: 'hf6aym3zt26pkoya99i6i1kg0vds6osrfd42cc95sl6y0ifqp0qix309m51h501u7nv3pv43ohes57k9hp5ig8i8g47bkanpr9rc4oefa6t3gg9onk2k2norjur3f8o1wkcyc8hlcz00wlffgut8rc90gmhol2pi',
                flowInterfaceName: 'r2rgcb1v7ahehwzq6fos835p80jexqp6cpohz9clglqy9kj2n244fh0jfz2blkl5xn55be1vqwn8vwcvzv1ungejcj1dvym2xpzimapamo85ivuimf2f6lnahcdnv4ezy3c7bgunzj7s771jr1hq8yp3cr4dd178',
                flowInterfaceNamespace: 'sy0b3txwi91gvwub5dcr10knnhqycl2239yfzkje9mtnpombl230gx11yl93vg83lnffy6zajehi8yh7lrvn9oc331d3oop67ljqpn0ae3ojlu0ds306ppc9mpi6p87a5lbuxzwx3t6elblw8h7gpvhznesy4xty',
                version: 'tr9se2s44l0u1meaizgj',
                adapterType: '4nh3f8mfjlgvjkhkawlca2socr3o0lk401zgjbcpznqg24e2zfnjwr4oig7b',
                direction: 'RECEIVER',
                transportProtocol: '7tyfvxn05fae5hzo9p9x6201kj1nag0upq522th9yw7q5sh24o9skpm0cokl',
                messageProtocol: '026c683w24k37hehyedk0l3lqsz8uz6qczgu7lwkgkq13iqiir1oamx2nsiz',
                adapterEngineName: '9w7iqm8ef3j0j4htcuutr5dvhgow7nn65zdk0k8lleopdopvmiriigcq9cddozp7z9s5vfr74pp77c639h73eavxkm7qjs5itqifpzjbmen10wqemoyo91yz2i5emxl6gb4h6su0zm0zx9w76vim67ori53phjz7',
                url: 'csns3jtr5rqd6jsi1857u9hfoszwsxmkhhiz6u4dnjhrldrh4e8z8kjzakotsbp6lapt0pogksmzl45p7gy7meb5fpt2xfh64eu24azajgax4cphur41cbyj589n4vmyuixuhqy11zg43g3di2mb100zlrflnryauvxwn67yjj3en6lkb573s299avu5u3rgyqnt9nli4v65g6y3t4zw64eeksl2j2xdet8nlzg00nh6flznyzcproy2nhlla33y04h43zldcxuancqfo96d32ra0y271ogr5aa2fqzt069bnbamcpyas4b20rran8lf',
                username: '29hvze5enctknybtfhn4zss4rmt0ux2yorl7idun7m9x4ars4f63oe48xfqy',
                remoteHost: '20drleu8lr542yawef7ax7dkbz6ysiqp85dijg14ev7xsybf3ay58lxfbdsy111wqwnandei4diwuiroyflk6jqq9p8o0loy6lrciaddjdsb8n16vkr47rzmx6rtusntk634iyogxizs7wwb0ttl126f9eoblquy',
                remotePort: 6612391166,
                directory: 'xpajcwy3l57ueizrgzvcrg8n1dcac1o0s9jvnzb86st9wlo68cmar2v24hxzjnu9q2aqqn0e3lraloa3nag1q6y3e8c6awny5xj8dnlgondgr16g6pi6ziwv6sj04zcbwa3lsu9az9vunojmh4v15tzj65d30snb0e938i3ytdsd191atb54dg4rceq1eqek38714hqnuir1krxmevebty5v3a9orbsvdypdnpkz85ucknu0b0v5o5gksdo215om1phkf81fgwgw07wjdnd9lpdtem1xkiodrp59u41lkvlor0h4b7cjzgn57ldpr06o9v0uzf9d5qig08i6hrxtgtxnhnyhbb15xlm6o1g27f7ukpckry7y318on2r91pt80d2vdpr12t0hdhr6dqfdf7qssxnt39kl4ra34idrgut46aufzd275n0j5et2kdtf9nnw7qyyy48olipzghfrgj8t1ef595jv5q9fzndogf5oftk2e2myzb7psrxbdnlr29eflv9r1cmgmtz0rag073i8envedv7z08n4y64ie9vd6xsv7ualc8dlcvcgh6hpgy8ewqrzeyp10iu5026qlj4gkxn1ikz2o48v52dm7mvogj0vv4l4vlku9wcz1zv4for7ofai223ki1zhr6gqhjazc3pd1pgoym3g6ult8z14ire1h13g1sskta8gx8smy1gg9mbh9xmomou846x9rqe6rzshnvzbqla3dvyoapf8nl0dlp2yboyfao60z4hssev6j9j9usm24nd9q8zu25b6sdg5pmc5t4ckcx8z4jqdkk5qwbauqkxekkmfm856qi0ia5oc39erckj72nthn25sd2i0vo2e411oyxd9oijp3c184mmut8isznsa24m900p4zoxy05lbta559g4xzq3hem9nsdyjqr8ht4xxck10c3nkdcnvt7hmm30zi8w2hzr4qol2ro63iym8al71k9yf9fje1amlkny69ynbbcc14gvqjsakwyzynh6tjja4',
                fileSchema: 'z516cgrfojzk77j7n4uh9tofz9bjaca4yos4gggiaaw54234b8gpmi599tln91awq7y723vnilsoc80sk8sksb91lo5ltjzzbla2bm3fpg39pcibbip34sd2gucaxn0gb4r5prc5r92e85xts5910mnoi01fj7zk818yy3yx1cb8yfscgc61uz1ratdumi49pp1dtxc39p2osakly3yxkasqr68dx392pljgxlfidtg1s8huh5i1qg9b9z936m1pzshxjgadmm5q5a385rwdkesf2zkrog24tqzxt6rcs1r0cm5x5ch73nez02l0pbt09q7tkz4ai7nh603bvt9q4z8y7jx0hzogb69ff2zd6slq4bidak6l3awazs1175z3uxskwkmwv421l48rbsx97fpsqol8w6mbqqru9lsvapjbkrzj4umsuxa0nv2w9gvt1brkb9sioro222mhw8nlyn6ezhpvo5awgl3oc5aozhgffluf00mno3688ld92f5jv8hirbdggz612xto0ym67zh3lxd9wtg5qvsfagslbywbzzpj7ydetr2dbko7i3r9c39qji6qzbswdxf0vkzxt52b7nl8g0wnx04sg6p73kp3sjgbtqu63rp5g0uu8etdre3xn0d1y2fh4pnc52wqwvomdhpk0n3u1t2sfsdagtbzpun4jbe730mgcjh64hfkxdwktvpsi0s3urblmk4mjqs3jamgnmsmnxsjocqaz34hwt09c2iplai5yb4awzzkxv3bbef6oo1izkgthzuowqup2bzlgs0slwyudqu1oi1auvedqvo4r0xfbs0monqwq88lj031b5j43y4dmu37hw4ezx1577vk1f1ksya1i24b062av0b3chr21jjb81pllnpx21q6aknzn5hispfj1awzycibfrhlrww3sj8jf6poomj0mwje1pc2sbmjzrzygecvkebbao4b90sctdj3a8hcd0bw5viu9z57flk0rgvs5sky9szmn9xo7rlsg0dd',
                proxyHost: 'o2zcp7pqikrk6t11am7r8c7qcn1bu8yfcuidfw1w633shskrjexkc0renp5i',
                proxyPort: 5933814983,
                destination: '8yep8a6wosbwr7ildyygrsfqk9ae6hnz6n2g5ca2nh1brn8brud4gxy21kw1ko0pqv15ld7on9bswx8d5mcplx1iisb1l1wlnafqw7j8ldv6wrfoobgri8q92rg8nwphtfz4gdjsdf8z08uflwqroopb86c2wy6c',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'yi3gr984srt2exqchqqytu40zadrtwyxtt7f2mv78ebfirjj1b9qew8t36wjskj8x1mcd0v6094ufhvd2kyy3dm8frsm6gswsddyjau5b90a500rp85cnfzhxjv3w4u9qugap1p6us76mda63de2eb6ve8dqcghh',
                responsibleUserAccountName: 'kpdytu1w3czksvggt9z6',
                lastChangeUserAccount: '2xhwbp3eden1p3vekpdc',
                lastChangedAt: '2020-10-14 21:56:06',
                riInterfaceName: 'mx9z8z7pgkmwfgszut3x0llwsejil384hv88jpx470ldj8p953la3dqw0dltsaa0dpa698njizp2776cx852494xsuq9rdzfvu402gup3v5xr4ctueoapbqs3es5s945gisx1op45fkgpgseu0onw3x03g7x0vbc',
                riInterfaceNamespace: 'dwd8ekexyhr04e8cnmdyazizr9df09b6v19hjxa0xq1sb2sp4jnenp5n7m0ze5kvus9mgazf290pan5t811xcscs6yk1ktb07ekrq4eu3xgi18jdm62apfawm36g8dqcnxith4fwdoxxtjxnykup03tcn25wqt52',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'x72b8qyi86rvbaa4vznt3t4fnsdoko6gfu6vlepl',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'ohh4kkgx9o1k8snqi59bane4s3lrtu77a7dfhiel5dawbin9i8',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: '2op3gvtciwrlu56pjfyh',
                party: 'jxsf35l86y1rxmyhzynn4fd7p0xe3hpqcpwf7ra2quglf1s7wsqjqstivt0hw5biwv8kcip9qydq5x2pmsxlt254q24c9wmqkztb4hguus9286pifsdbp5ppfik758etnvvs78cwesh9hlony0tq5uevmkpdfh3w',
                component: 'yge1jxxzs2e5u70fcaubxkxqkzyky3alut0f7rnyvb66y1v8zw8d4ufyyve46l3t14o17wh172ywdvzf2rdsrtvko1ybkocpjoaiw16mg7awge2t0iazd0jwjmieds0bk99awzvoclpbo4pq68x5p1w540e4pfa1',
                name: null,
                flowHash: 'kjpx0k6z3pwyjacguywnn2p6gbqcz3jwzxfij0cb',
                flowParty: 'gn3bsybcoafarmv8mhsfvgjq9rfnfwgsswwoio6xh69rwwenjjtba2orgco8odiz4jb5gnzr76b3lnmckleursqmpipo1qubw5ejp1f73x2l4zhdedbsyrrms0izahstbofcuvbkagjiqq2e38fs7xz6pqpej2pd',
                flowReceiverParty: 'c3gbsqtbjdg314gog9c0hxhvuya1oj36zgo6weiom4eu8l1trjpqhbu3zl2vjngz9ps6jx2a59tmicx7189z9qcjfzd273oqeef62d1dve8vcjdvejqryr155j7saczr58eqzpix1i8g9bgza5g8a0ush568ng8k',
                flowComponent: 'evy23d0wpqylunk2z6tdmot4npuvhuk8cczoikcg0jihfm79a1xej6cvxlrrzxwawg4lo0w6r3cuqybnjsdye06prgq4r6s4xl8ofgrn6t0prriiozcanm9o1mkqojzh33kp6c29j47uen62ru39guat18u94ler',
                flowReceiverComponent: 'pbvia5p85hxzqk2squp1um4qzgq66k6vmfudpztrpkifg7ye1k264fdhph4d22x1v3onr8w1r6y4ahsmxich5o40irslpcx1qz115a5pc7wc9tf25t7hmzhqde2t9atjyscapk65487zskqk32t92bi5l4mv97jt',
                flowInterfaceName: 'c3p1epzxrh4flqcl49ggmb5686shzbqnrewb8olo9gdq651oicb4w8p0fq18hy14gb4mbp8ct9930y5grvg91f8ja6bqm4fmnb6laq9gm9nshpz7e6yhg2vazdm8b4q1xwewjghuuvgpwiyd9k9j3rzlm62yiqq4',
                flowInterfaceNamespace: 'y1wmwqhwv22f6eczmhe4csxvg7zhkkhyee6ryurgywt3skv75wm8p339r0ajufdrsrldpcepwh1726o4ph45njkvr4bdculyijebs34qgmbhutl2p8xz19pud7zpzzah9ci62qcoo8ohnbiarow6qa0fbqqr39ep',
                version: 'zv93v8aiyfr0hkgdu5o6',
                adapterType: 'aul81jqb1jkpjsnx56z0vemx9syeu0qnx3oom2s6rtmivz9mm6rbx83ful1m',
                direction: 'SENDER',
                transportProtocol: 'q0ekjxfbfp1rssws0rhfo5upotjz0bxzmyl12vojy16spmf5a60ar3k4n9iq',
                messageProtocol: 'xft12q0ug2f0xs0nkiq9rozz4psq9vxwyopp6sk168l21pxdtgeqchun27pj',
                adapterEngineName: 'fa8asma2imwc6vgy1wr7dcb49oh30m87oy8tdg788jpk3igv22svwo48du98np898zjiz2ezogor5whb9cqdymf50prrsgo8ywc5s32qpz6foymqoipzp79s7djwun4idgwnerbsg0tebr15vwoio53dcfuact2j',
                url: 'bwf0g6exriw5b1gxdr2n40h2tj7cst6x83qa1pgf972t1qu54krh9befd3uk8hx7rubrmr21sadm5gcpczj4awa8pfrg316lnjb23o93rk8l6zz92725c580wxnauj5dy801ufv8qpsqq4iusm33ax5n0rw5791ej5dpz60cjbabdoq8tul81fc1bf39m40kjkfrh841jp1wftoy2gpjsel6xx4psdzemcvl1794jf0bhvd2mi6kxn2hw96pn72rbwkc6n7p5lshk0uuo8kcbprqk2sbaq98ltpwikni27shqo59tm4knt6pxn8qbvlt',
                username: 'gdh1kqkpeocb5napsglcob0oocgf4xfaftuuy4jvum90i3ofd0oitr4qggz3',
                remoteHost: 'nncrhd6wrwm7nwwfdelhggwrh5gknhyd602nd9arporm35dn6jco3t18fj4slfzbtpcxups5oa1lzr3tncuh2o6h2axkg534yt5412yprqdgy7rj8kll0rmwnqyp3w4m1jxd0gjppq2uzd5c0nopbazxjx4eq3nw',
                remotePort: 7234497555,
                directory: 'z46bspi6lkawpfxhf5fth2sc455bqj2ang4vdx6rrc6hq6ziym031wjzro8na3gjkc361orrxn0dqvognlhzaijeq2mgavz35yjvmd00z6uss3h0ael79dk9t1qczige026uwtxo60bjn1svx2k4wwqfw4ixsszor5nti9c5fdsfzzaw0wjdaw9z3oh87zfnqleetrauwb11dbdbjjhmx4z8b0h2pee65dgsboczja6w3ahycnk5p226r7rvlvqhygbarmlyuzez9vtl5l0s3xf13auh3ul8h0z1grz1lz1675eegy0ofyognlstktnkca1hs12ygkusikfs9sxfvxkwhfo0e8br6609szld1ycoc4whoh7l9wxw3xuolhdxdlpm3flm0zrsrmmzl8panz58b9a3lw09pygxn1djgyaoisb6g9tcxl6eck0nbfgdf90nru5tzu2bnf3xkvx11vdxempe1z49v3uu9n01qu6i9y7m8308eh0zef7ddbf9vcd6bm63eunl3xcthlp7ll11gcj8jppnno76nky3x9pleq3mwdnybibx00f7pubfb172szsy1subsx4xujdogfk13dijdfghia614ch5qth7wll5syc0ucupj121bvavsmp0nckw2vtl4iulhy3j6oj6ieb88vqdwli80u8ant56r2o1d8apa9py585c0pcsv750ztbp4pt0nta2brbgg075hkhj9dx4uex3enjmm98ct021el9nuqw2vjnq8pug4hvoomc5sg3zbguywggf0alpeqys77j319ee0f6vajrbinwv23pyp6syxdqs19x66nupiq6194wbr0u37jp09r0nbux0mob8uii43en4gqscwlyaoplmtdzsmwf4xasssgh6zd06wcbw6vlz2b03wb5zvnfl46dkofs6rceto5oyrj4u5hglkwc22m41lzzprq9b6mw17zahh8cxge5e7wbpr67ar0eiqlc3mzy19awrxuww381v3c4o6nor7gqe',
                fileSchema: 'hi48qhpjm82llsp3km7udirqhgb5yjzr3fiwe2ibkp6kkq876tmn8tbwedvjxn7s5x8af83urxwnz5e7198nv264o6edilm6l2a95ph2x9um4bfmnoner7sd3m6srox51iphl2oi516bd2wkyh1eanpld6valkt477p0lzv0zmr8ef6fa8bgfm8n3jwhdvvkisdkgzjup8kc07r6fgo7awveq2c1bqlw8304rl7dr26exrh9q8gjvyyjtkeifvr7rz1f31rvfpwd31itov02aruydglu6nauiyfnqtla1dbalxwpajr98a4houyreqcpi57j5z7ui0vl5k6jphk0numy71l5omyaja06pksxmn768dddktnsdankffbqsqnkrqcwz07qrmcwmnjtuj2mkfqsg1h7fzzbtn0kg4wtvvfyw4g918ww50b04k063cmd11xwii0yqstgzlaroh3pqkaehy77z6jntdf5o4obfga2gi5gap8xe8uey4frh6px5mdno4wrmcno926wjqimd5dvdhjnlhczkw68fyhhjj5tulrg9kt1faws1g85nhnit0hvfgdmaonjobsyw59veo9xg0teyi0hwyiibcy0vfthl3wbn5alv60ovo5uchgnkw08l4p236n3xh6bssrxr9czferhzwwlyoau1exdh08j4i6bpdnxpu7dss09xsj7nmarlqwyhubnm6p9ecxqc31e2fa2b4qmxacjdoqjduv518u23wqvvqospibb7wi6pmveqb6ryhgh4d94gl6n5ybk4kz00y0n0j0ei6mkact3giyg4aot1blkj7oeafne5f33mtazf59llt527td0vlcdpmmv9h37fe2wez0vbgzaibnw3rfor60w2r147d9uszz0zb2rux9szia399ofzvxhdwonhhhbh1ojb7n99igclom66i0fbvl1dxui2lf6bjcolg804m3arc362n7l6lckl8mcbhw7ce0bd77s2ybtl4laf81drjkkoayzp8mh',
                proxyHost: '308of271p0gzueamdtkjzrrhkkt1go5cr6amxigeu7wxjwpi8dc841y9ph9k',
                proxyPort: 2928949216,
                destination: 'k4tl9p02jz1r10gcw1vir79pap6pp2t2nkemzzcyoe71fj4ncfh5gqpgli2db56azf5bm4zjpg3a4zn512lm0570e5ojplvtixz2oy8lkq3fkb6njzjqtwhb4s94hhors1zzbrz7fii2i8prc0ljo0ham48uqj64',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ken254gbfpl85kf4odnknwp2pg12j6uty2zc0ybokgr5rl322m7nsucio6v70daat8ficx89k0qw5av3w4187dgupb0mukjyydkmrxa68jufhkjq18egyt1du2zujpnf0lffz8cu1162n6ewq9blt4fsp401k7vr',
                responsibleUserAccountName: 'gor5zz2259zbx9suhtr7',
                lastChangeUserAccount: '26hupnpigb06qoqptrba',
                lastChangedAt: '2020-10-14 11:44:43',
                riInterfaceName: 'waks12p2dipc49c3a90z95c7sgm5ychdoedbkfezwyy7nmlxaaflhlp18xb84g9b3aja07rwk1helqc141xr5lflpjppnhyqkqxd9iwst0bzhkmrnujkz5fdnj6n59ul4la2twrhz7okd3ig0dlpya8s4gw5v7x0',
                riInterfaceNamespace: '007zpch65uoqouxsnvfsj2sqgmk964xg06fvvzxsoqnxjflvrytg9krj4p47wrfp8ygc8s904y927idghxc38a8dbi2dzhluo4vfpliy0k5kjx6daqae7xgqoi7bg167tkbu61fyk6t20t0r5fe0lqn97siymlbe',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'ulfqs4ofdk524jelmqqvlhuu5jkaju685b8cikfd',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: '2wl3fe7vkc63ua0ds66h9rto2u8cc6a1hlzivp3q1fn33io3k3',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'ysxia31ddfru1tj3punf',
                party: '75y35cwsvr0pvcg9d54911od6sz7vkyqk7rfed84rq44jb7cy3rbbj34ytiexqwih6y7flsrt8x26511vmkow61sr8lmkcvu4o2otn13bsal99a1o45lreb5jicla7brqsfg8fib9g1h28t0lhtwxrr4xzerk5a3',
                component: 'nx7lgew9nrflohbpr6ap9a8db3naps41p5vdc9vx196rztt7cmpqkkmeh75muw6fbrxwqi6o28bk8zllu6mgg88gntuplpo1isu16gvli5qn5qm7pbrt9ppmjn1lxpxxh1tbgzdyzmqm3p83hwy2tlgmui3qyt9a',
                
                flowHash: 'q1aw85ja7lwqsh4incraqt1z0emfcvvdwmb56teq',
                flowParty: '5sun2des5bk3hpjbx18q5b808onayofkzx8lfncxn0436fovzxb64a7a47rb2xkfnlk8unp9b5gp0l140li2rwy0smvxc8d51bxd2artugay16dkohl6uqz66krgaul6os3uq5llkw0f1y5r9aeroo3zofc9nb1j',
                flowReceiverParty: 'kfggxlwfrwzm4cpktgr3pu76knc7gxw2qojkdr5g4t3ss64welm2i1kb59orilt4lggm5va37ps91byx8kjn448igr7c2ksj47uetnrslm039g09vemfp4f5v8a0tqo27yav82547fx4d07jkxrv2kvoxx5wpxqi',
                flowComponent: 'zz1kxb98beiucw8n03dvut917i25wsxxzf0fe0mb6y56cnyj84w407np31q2wv47488774v6ivd8a4se14lvmcxuwgzd2z38zsjril8lwm6rx2lsrhxfosh0j4v1lrqki69uvp9ta39sg8ptbnx3js543i8fwb1v',
                flowReceiverComponent: '9b6biw09wnk4g7ofptf80dfsiim8osmvs9viksevmc8rserug84oghela9yny4k1tp4up9xd61o620o0uqowx7ksw5kdxqja1d41vi1ez2mvndasis56kmtrjvkfvohxbvlt0o2015k4a9ng3uiaa5f6aj3dmarc',
                flowInterfaceName: 'c1tr7ys997ou5v9isqggd5myixga5kmlxk4vtrd3ecxvfsu436qrezfaroblmyhe6uwjcw0bpwazs97soogcb2f5elhqh4dn19hb4g2t6dvoablae9sldxvpsb6jlx57o7zdwih3p0akungqfqd3jdqmfii7otsg',
                flowInterfaceNamespace: 'w352kd1r0657bbg0cexa0zhpqjk6pf6a9tn12kz62bdfsq1o1dw8lp38a4w45uvp5l58l5rqvnry3v6j1y386ksnitp62yk0ebuzydr3hb7eg4a491rf9jey3wrvg0qtccdt7umngj2fqr9mydcyj0eih6t9gsoz',
                version: 'xs1pzd2piukdw9ykmiql',
                adapterType: 'zahumvew2bo4ppug3lqisrczp3p8hcgz3u27hisj1az77boovyxmn57bluua',
                direction: 'SENDER',
                transportProtocol: 'xux4czv76ljxfbhkl5wzcdctazgdv239q8r05qew5iorulkmu4fva43h00iw',
                messageProtocol: 'fizgpkz85ttsu4n2lxw6qgl9864zxj1m8if6z7701joky59fpuiwykywr2w2',
                adapterEngineName: 'x4awun281jumisuyr905pqfr8uz9a3vgt6m3wlmfisa42i13r5g3or4mm1m8kutxx3krj1ubg1aznm50wpf0nish74jqozp5drna21hnp0foe1bsskjbzipaplhqxn6hleqo756tkjz46uggi8x7tf41ylktx002',
                url: 'ezbnjv6puldmbfqlxrjkge8ftteppndubwatnnkn6tqvv6aswmst60lfpvergaovp9z747gk1soce6jjgip8to4b9had4ythvzhpoilowwbqo88qf1g28tlf2i3epux4a15qdp28azg4cxzsdnvpd68q2orbcamtegqqvqsap51smt1ohhs0xbklik4wsabv3yidzu616qsifi7hwry5ak9qc31nszjfcxfe9ndi0g6wwznt7zssdddvjq75ijeywgjbuyl59lahwetdhy3qr72u9jh3o45hh6kixpcvy9ao22rdikxi52ybn2c35occ',
                username: 'p8xzcywbrmux2knlj9pbqs2ajrjcs5qkepmga650pxlcrzoyg0p27pg08j5k',
                remoteHost: 'n3zm4brxstvhdnp6crge48dkldwt1j72n7bjpaw65ndzq1glwrxi9mh7n1lom2igeda4ong1c5mggzqfgo5fvub23e9pcfi545jw1us0ohsfyfhxzbzng59mjn749cae530y74xgaq3vlto2gg5itirvuae0rq31',
                remotePort: 9679183247,
                directory: 't1j5jliu5j4lksevei5s8dfb67elhdxzfow15cqgoxrj1p0mf5gaqcz5e6b6r14lejj4p010zp979ech2edo26unalwgynkzloy5jc4gkbrxfo1m6yoae6cyzrw0d0d986u2gi6womkk5bj6ssrvwi2vaw5havhcbpqyejrn5wkui38gf1rk4ndjj45cfb6l3w6aql7cdsv8eb6p0x6fctu1hrgzuxr0abbkayzeaykjspvqt6gagxa4yb72vnw7jjepjzp8k642wovoj39ov2fmhplervt8ccek7v8rqssccu4uyukkw2plv7xeva3428iobecv60413iesjv4xf2o1si4yk30bu8l6ezjl3i4aerb12coxmegca1aa9xmxaksj0x3xu276f7priuvymofs33qsktxx4y8v61mc2t6pt5kqmsv9w948hah5skwjwngl2s59ghtad5omra54wiof5y9hars31o11jrmqoge6maln3sez2j4gzwkjtcxawr62ryea20tyg8c9gahs7a3ti7uws9i8uo9tx5t9p2me98fbclcwv5nflf9vdd2k1zvsikya42cruteza5miq5bxcqn6s6ja9pgeys2d1ba2v4adiuiixt0s5w2ao3o22vbrkcbtkx1o7e7dg8c8te94nr193blwahrzg68apus57d8htmqwipir7e8u66noa7mfagfm9sfqw8jnt1pdqrp300564506yhgt9uq518e1silu6ul8ti4p8abpfpu5dc3yw5s2jb4gv05vnwr5ohcew0yj9zljlfqqlp54i8p9kzd4rwmeim1klcid1zw457qn03ahol0ejul9b5dilzvgmirdr7fgp6il31joi7yv2535wqj2y2xc9h2b0dihj4xeq06apusmrzc4bbalprszyc31rauh9rb0foqhppzjsjaagnlgdbmz73z50bw5c6nh3urwoe8rah5jvo9q2qrwo5817wqrnuvv1sqyg7z6tgpaaub99be5avkrhl4e',
                fileSchema: '43drw1ii21tvlevl71v8z2wt6egfzlfoheadqxe803b769bqzc4cp77c776g7favjpsvus1uuqfrwruw93n1u10lo6bn4wel85rvzgx1vu6u28hnonzdk3qjj5f0l9tayn36i85cxdawvl43bck9iqj56vtop9slk98xjisb43uk4n69sg3vgl5lxyzm9c0mfvk37157jk1a2fryx6q5s1xdy8e4krqhnrhzwp8yjwnw6bapu9ninjx9bn2nav8tghauh54n8w654wpi32044hc49tjpgm5mu9ysf91n0bbe7wz91ijiikg3euisrrdx9zo7zam7nnm78xg227nntvxf99q3j95n0bhu91zya88vspcs1bcf63bwo4gtb18jn60l0za5h1znvqmdg7l7nnwr3p8w3li4mxpr4yan5m5g9ccrt2cad3d2qbld7688vjui86u6hy1n5km9tyitqtyrpem4wo2ar61gz05qwxsgy2xl2zv5bycvjbm1gngl0kzr385vjb41yj05tfo7nremx9r6klath8vh6av0aq1vstg185jo1rrevuvmvk04vimvc23wz5tyor1kvurc8wya0zxpb2o4niuxuh5p05a22drirbbiclal13bb5z2w3u6f8kno7cyi7i3q5ap7htzwvn7635ewoi4i8fiaskego26t5mbclu7i7toq8rzspj68pergsfp0zr87ip9k96isr0eex9pb2tesygci9ci8q19uvz9yqx4r54aj3u6gxq2yb59quhvllvhh5nz15fuy5x1lgcsghc2iip2t8fm2rlpsbx37y94u1bnieavzdyphweqrtjp0nr7ajk3bf9rfo5jaxnzjeay7doasa0rodtkm431qp3qrcshr7fcifrue1f4u30vbg98rake7sysa99uqp06h1p2tbv7xhpovekddntuzn0m1hx8t8m47n0kr6wu9yycwp8jjlohcx853l6u4lw1esb2dttotxlkx7txdv8dor5whclqj57yi',
                proxyHost: '0hbzmuffp99mwe4gkre3vmk7pe2nuslsawj07z3ookmd5b3gjtah5cbbdq5z',
                proxyPort: 5631286367,
                destination: 'fmhrkl15xkgcea1zuubu61pgzxv9s8kfkb794t48bk8yxn5eabzoyfywiziysgxtb32d93vtxzrevbcdku98yuhtvlfx6x1u6gtciljce9xubtrpxsmamwiyjaoy081kkgxggj5kiq8bo6x7t5qh9fxcfuq6ltbu',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'dpst0q51a2jjxk0fzlvcgnzq3np8lxjo0ig43uqrpzyvhgf7giyirrs1x1qqmc9y51f684v3ne5d16r8e9wk8lnjdq4ljh40gvxmadyqqpuclqqtxuzra5sd4j2p3zs5m54mu77vnji53c7bu6gu2ehpfkfrlr7z',
                responsibleUserAccountName: '359guwnaxqjhddcyaflh',
                lastChangeUserAccount: 'v4nfp2pwiekhqbhui5xf',
                lastChangedAt: '2020-10-14 18:35:05',
                riInterfaceName: '9xa7krl87499najdfbldb4gjru7dxt3u074ci4ad7da9p5453amx6sl99hjw8f36q8i2guz4vyiwhg6b2yz17oqilb80anflz6nltbksmusn2hihnhog868ukcjqninfz3o277hg1crwcbb7k1t02yxtwpgjjszb',
                riInterfaceNamespace: '8t18mpt3o16n1z5qsvdmovcn4qeqps7zuoupxqem0f9lgg5j0jbx75t5b39k8k9t8cie8x3ecvqbkhjx2638l4t47kni6qe1pzykwx2redbv6o47zs4mwvebiaa2wyso8cbjihuzyxyuk3pq8cwe5yqgo78p7mv7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: '51osakpdliovyi4lifpm569pmde2z1alxihwt',
                hash: 'z65ckzkuv4bmvxu0pcuc18s45n08cd0wmik5l572',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'csuac42ejwci9r644xgbuvnc6nmdn1d1qj6y2esfy1t4sq19fq',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: '14avwiwvznqtd1hvpp6z',
                party: 'zo5mga3f238xc6957nxvhyubcx04ns4x246sx2wyk7nd7t3mx7gthytgcaiwzfrll9y373x6tionp38tzzp4snlh9aw6yopjl79fwdvwegeeptkkjfexk90a032w17oehbroamjxjy08j3zvul3a4an9iayyqsk7',
                component: 'eudqyh4my3ks9otb9oagm4ly4uglbmjdg0oy44jds89v4sy51nt3sei4zkrtrxt0ina5icwu9g97xl38y6z2algwg0ophoap4a5a89mcidugsirvwz9jj2qoeth4m8hsj4l64jb7lw3ljgs7x1wurrhivpafb8zc',
                name: 'j6g1fecsdjtd01280uvfjkidqo9uyeylt0bisu9ovpt8z5wmg2sfsqk4uoyv1hdes5vifbx3w62jcbkucrhwzq490k5rll893asfr7z5z3xdcvhc6fdcunpm9dx1dy1rm0yyprgd6tzd2l4de9ebbazpq81v6poq',
                flowHash: 'ywfm0z6pdat4zpvyie2sgvgzkpvzk07eiper8bnz',
                flowParty: 'l0v5t8hhvx7b4zqspwtz8v3ykcc9zvdakpiv7p1wf58a45r24zqludq584fc8ws58sm2sclfod7ikgwvxx6an3qahiqafshdx7y83lcu98ay0nyvl9cvr3hi56pk66l7h3dpmvyycifix7hawqu5c28edm5eox10',
                flowReceiverParty: 'nw164ml78qft0pm6zwv63dhei6mksptybb0xbd8yn2lfjizuad9jreostsukgcilc23xmvvmki5thmmdsu1ls9v7ea784v2eljtb9y63au1qbb7qmnpx6d0bdabw4441qv7jccc5tn7ku5ro4stmuz3d8qmyyl2n',
                flowComponent: 'su7d7s08j54n1oq3w3rz3s2bo2fud7armyomob66q88d6k6v9bc3k1n84rgyuvnobt5tvnu4qdlln3zxszhn0uvobzgfamp2o79mahncaj6h84dphezjj34tiofy537si7ulpx5242fuegyntearm0z80afjzvz6',
                flowReceiverComponent: '215c0cpnb1kb9gewg9hqdcad3h7tsq48ktmrw90fltsrvfczbsiqyices53s43mugiqa4prpn58tg3gzjbxnjcts8vzrabunilgm44nmds1hpi5vmg8x0h0qehx9ti4dece9x2v1twvz4lpi7a6eip0s34ybjoyc',
                flowInterfaceName: 'aglu3iucyhnar2sp92sq1lw26xzxdqsxq4gt8azgw4wxaumz647rwxe3jc72ryaqj7mn3ujeyomhg194ugu9xfd03potzjxys2gpmf1lqykfrm9yhedvx73pvts6xk5i7ruus60347312b8aud7cv78xtck5hkqu',
                flowInterfaceNamespace: 'aka7l92t218rop25n5y7fo2bvm9o7uk65tn7tm926y0elqt646g0b06eb0f6oyj47spbnrov2fv0dqdpmlvx5uckdv4q233uf9039rb6oa1yyqxy2vym9wbvqnwh5dlabqe39hfgeb184izvzzc2kvphtt8hhad1',
                version: '7idw2xqpzh68x0im30zs',
                adapterType: 'oeini752lsgwnywtc6vfa66ani2i7h7cfw76gatdxc9lizpdjh64ca0eb034',
                direction: 'RECEIVER',
                transportProtocol: 'cdb44u1m3p3tb7y8d686n4hg2joh5qph0nak8wicdy4d3tj2qrcnwbcdt9jz',
                messageProtocol: 'ehfxd8sk0q3p26k6s44gnjyvva88mkzowiddptmsf0gmdyf29xu4hs0fnq75',
                adapterEngineName: '2qihnxqc510zkgfryl1zqliy2hn2bntwlhl0bf7fxbvd8r7s4rm2mmzjeip0qztpreehnatxr9g73ngm8v8p251swjjv8f4c4ma1ykgmk104vplbrbz8f5jncaav5rydd91l1g7p6o9gzkhf912t7oodakkagiiz',
                url: 'id9nv5pqee40xdkmow99cn6q58bhrpkpv6dugvfqavsv3z2zm6xuql61xc78stz2jt1egntia6ljks4sa0w3n5vbivwf5aade37wg9u0b21kt9m4o8y7s8s0cf2vsvqhtjj490a3nkuj89sovi1pv2iiga9cgydoogphlva21sfmkf366uibc3jj5t7l4oowa9f64t84kf5cra26vov1edawtjr7kkgnp6ub0bh64jx1hfvgdb5n93baw7jdth3z9ux8e8td74fo3qpskfe1myvrjaberk9xiy7a2pyxi96pq6e8frdg21h44xclnueq',
                username: 'mogb1uxf20r7wu0qll1zmczgo717mzd73x5gc8fw5j9i596yfx0vkee060w4',
                remoteHost: '0y4mbvczgs5p50j5g6vbquq0aygq5bdc55ph4n02el7xtbq004xkjuu61c1fx5361h9rteb6r6wodirtjznwo4ydd0z3t1r8ossyx8o20iqkd1zmtf3ibj5x3lmg1913nyigfistctba9smzhb8dbwnvd6ufyv4x',
                remotePort: 9672152938,
                directory: 't7stcj9i25k3765cytnb8k0h7rp0kl6kcy36t5sgbl7hhct0no0s9coojinn22vpytfjjt465tuyp22sy75xtif5ay688z2k3qaxq98himd97uyjapi400kcuddxbjbgzt84m24u8x73ed5cgyk65az7wk2zrb0wf1wq08411fhtrf4m015aouzpcoxh22wlcpy9182tqj0hezcstzak2mktt9kc2fkrri4y7piho0tzo2y4ce1mos1tqkuzooi94810uvkyo0yzkificouaon3vmy97jt0t67zhgehasy85v3qjvk2ekainxur8uezcrtx6iz8d6xu9yriybgrireunb31u26a8kd81b68z7m9yvnavyyv1ov0fwmtxr7qx4xc63xtky3652hspckt3n3vv6wdk2zwcym4r93n096640c4agd4ummpvhruu0bi9dfmhbf4pszclnvfautqta78ktrb3z5519s4mff6pal8wmwxzgnsrzrewfq9y5ykig5cqglge2sbnldj4z6e260twft8ezbstxw38hjp2cjksf71d5llfriabcjx5fv1j00rkptc4vla36cmzc8cewbhcmiq7ob2cs198qpmlyo4d9ztxmqv7crnrict5vaacclt0u65w0x4xlc9c7gk3davmqdmgw9c2rhw132njgt3dljgxztq05nw5o0jsjbaj41nkjvbwt5ar0jk948mvlswf6nxf2di922nq677zj3fufq7cnx9gacbv2stpotketm7ae9ggpc0j3oncxvzpej1vahj0ae84lc4uhth9di6pzshb0a2iro918xnjmm2668tcu8j3sctdu8qhl2bzfk3p1xyih1cbtv5makwbtcfglebvt2zmn5n79r9ibq8cmhqybstfpx796u2zj448c2uad7j2a5ijpy5k5iomz49r55fbjkgb3zc2ugdzr7vxs0k4lim5znmdj7s11bn7s92jrkfrhqbyc6ngevd21udf8f0g6obg55tio3rbjcqi',
                fileSchema: 'brvd3n97k4e9bni39wecxwqb43e187xd240s5jamsnc8z0pqe7852hn26kcx42kq1qb2dutw2hfwu6zmtabf5bbevabw7813ng5xmd1j7wzwn1y0tkxvw4lllc1wl3v0i6nls2j0kgxbs21g2m8iwq9oqo3l98nuw0gb9lq8bgdlm2ldv86fx5qqqta2yup08rof1ncdg2ye4s6k2wuznvyl97845tqdveoze3uk8zva561e09k1sfpfw8yb40nnbrdkbl7se2otcrnrn2vqpz62455mvinjr7f3z4w6r2g5mxipg0unwxs839e7bacc96jyamcua6vp02glqc6rkednmurmmpn73matkma47g6g6ww8x0i40vwt4b2nux7rg7u10i9d7lg8wzrpnd03xebshs74osb2jn79hke0cyusc4eudq50f68l35amiov4gi0oz28xyjhqouh15ncfziw77d4yrsi068xxyqqvi21qlk2gaig1cakbmcynd0gv39n6z1v5t94a2g548suasfgoliwbt6pshpoczhf3n6ikce6znadpap4moa590j2q94stuu5fef31rhnnkz4wwzrelcurfvc8npx00mdjtp7o9hermco91yqw9h9yutm2wfbe3xelwe4dyr944r8xfft73wdt5sdflexxd1sqxvxzd3s83hb4twgvbwzvmwpkqqkmmm6dvkkkfdcm30x3lubr360o19nfb4plgg5dn0h84i58jzyu8ip9vtxdj13sove71dlmmqo89vhmhtp6774u4w9rp3d94lgq431gdbkpocwfq6ttjatl3kc629s16vqlss8smubdjtmqmbp9vss10jpsgmiyb33x5qxh7pln3xirc97tskugmgqojaz8flpobluvpmdpm9jit2v6zck5eqx5a1jlbm1m2g7is7gk5qljrq8j18d5j3jiead1de1j1opdv05h54vf8ol45h6w8uxyxwljvca950llprg8gg6pjtgllb8qter99ci3',
                proxyHost: '59c9dyd1ihx8byulhhrzlism7jm86vcy1bbk6ztjrv82rji4pefyns06y378',
                proxyPort: 6289073888,
                destination: 'hgao1q71j00j78mvvqin9em8dgjyoat0tqygpxxgcrqnwioordadu156rk3b7l13xcntf6rjvdseotvt7j97u57s429t57drs61d5rwhh3akt2izbmqye2kdy19xac2fe5wff6836jgy5di51vpqz9g4k9ym1yot',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'w13ouxhcyjxlfflzm2zg0ixd0ckq20ssrybhohh6wqpc77u9hu0otvfsy51voxk0baciiwb82tstwbeo789ky3fh8i0wqwydvhlidmvc7dd90js14cof5pkpuny7j4igapcccpssfjyfjn9hk5g3ogo9dj7e9xxy',
                responsibleUserAccountName: 'nib8uyepls4rfu7q3fz3',
                lastChangeUserAccount: '65p4ge4p2wk1uzvlg5gf',
                lastChangedAt: '2020-10-14 22:59:54',
                riInterfaceName: '1l720hge5g7552xzqhv884pb1d39k1jm7wnfycqjsih6jgi3p6f0hzaoi92lg7sr6jb494uqppmxl8f00owl87fxh221l0r32r2gtx0w1s7c791fg10dbnxbj9g3n2m89dm840u1znc14kofqyucu6pk9vdg7x5b',
                riInterfaceNamespace: 'nvmoiz2041q8dsn0yya3q9fjdfgt4qnnz7cls6xsigtenrh38e62hfdta1n9lf99epnxh3gq3ru0t2fj7ckn2ko8sho5ihz0he1k27bt3as236ovfobzzfqybw3ezsw8u03ppvyk96qj2akyeskz0f5jccw3nqvz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'gxy8yuxf14y4681qh9egk8jp8kbkm8jj3k0z4c8kv',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'm6jceca2t0fbu4mvyc69bdl7nbwae0s5b2auyn3h1rwqge9syv',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'le9zol3fg98b564jql1s',
                party: '0f4vd1ht1vz0lxuz7qo1qifiwx678ywglpf2s2751mv5huomm4gz2ju1v3l7uu6aczgay7ko6txtx7x6bwkli0w0rg0u82bfqzfbh1bxrruayzh0v4fhcoolgw4prvutbufy57qcymncniafc8pez1jseg2jphx5',
                component: '4wf636dtbzm38prxipygo8ivtkodolurlaeynm8z9eiik6nfh3h5kkkcnqyqxe9hl2beuccfjzu6bm45m9coxgjobo0xzeas4d1etln0axaylo20379oq46rerb1cneiwsgzyjjtg8lgb4xeqa0ru085ytkantdk',
                name: '0x13qiufzieergmug6kruksclubschd0f4xwht0ma3acwwemqiltqeqboj9w0qzro3etdkec6ythaqf5o9626zvk82r88eb1ztwvyqg1xq5r5gptmngyc1xscxx1gk4ile6na7hgvkvem5h14iqz8vw6ux65tdh7',
                flowHash: 'ghu09goduzr5m0x9ahd8gnhelnaw33kplxbqtzfp',
                flowParty: 'lzehimc60rk90a5rwod0rki21mkroofofr7xyalecdfdqilhikcms7eiwgpz9lwsnf95xrvytvbogif2ygj0pje3xbq169xyadnqlob2rerul3yurc1d5214fgwgn7u7unxz7gy3zlx9memm4wps4dvsb7nlypkq',
                flowReceiverParty: '71x6apu53xw0jnxoddjv2uusrfz6c0lhaxfe8jx4sgvtru7afu4t9akh0jdnm8cw1bntqu1onyntkh7jr1v8dwzncewosjj51zq85zhbda0zs3saddmv217ygxdcsth0q5liyekxbgy15l92lawzgyev8u154r5x',
                flowComponent: 'mn7erurvtf7t6vyq4nus8pogqrszmmexph9hzv5yl89vgar9t9o5sr1vl30acxt6akex341tur9pna8rxkrurnu5xjk4h9v8df1elks7jnctny8l9wdeo0d8itu6yylgdcm6soemrp9xnjlrs8an73d5fhusraz4',
                flowReceiverComponent: 'q4kj8hybb93qarkdt1l2cb1wf0x7tog10tdl9q1ioerjxig9ci9wtaaykqy51y2p1h6mpytyhix6bio3bawdb24n2o848jg1jt3joy8qu3k0nikwsiej68rz8e9bz6gk2av5pfobq6hc5j8e26h67cvlraciqgya',
                flowInterfaceName: '6hiw1niquysuy9ox4ip0ksuvdqk63qxs9tukcxqy99npiwqfsqlfiq4o5as4wl9v7pvdhs2vqn4i8k9blbof2w3oxdhkicas3puse7zkoxm9pgn2dmomec3hcv7rvnzxkxm48adqysecf5afvvckn5pmvyb6v6e7',
                flowInterfaceNamespace: 'da8a73kpvaan30qvzcjrxe6nhvlvep6i793dxjvy85sb0idn1z9h6d379pkct4umne9oiaokvcedbryomhtty2hyy2725y70o7fzkuv8c7lo8gq7ug9ymx3etqzgjdzsayfe29gelqh3j3od9lp2gohp9vfsuvx3',
                version: 'arzt9oxtgmltx2w2g7lp',
                adapterType: '2s80sxb8sd8wxmmpl7kajj86gi690bvvo6pgxdoazf7scg5dtk8cdt1cm1lx',
                direction: 'RECEIVER',
                transportProtocol: 'begih4vyfuaw6ayn42oluoo57k80mt9x4tvos1yq2gdxpplehul2qm5uyyrq',
                messageProtocol: 'i59e8oshpjzb1t1w5elw3jbrzn1get836khtney4m4mfmtcowkygkk12pjjq',
                adapterEngineName: 'h7p0t99jxrmpp3dm6fw2hffc2jl1pya9gb42alods18sy17xmfa4for2fykav8vi9nm9sdcz8ep7ihw0n6jxv2lc5o9h2ocqeajol1l8x9xc3ygoo0vfrjkoiu97pjptnleauci29o3qcul8mtkhuhr1iqhvjwsb',
                url: '9xlt45ccs864uem25d63z51qmsdkw6aetd4v1qty0ccvu4jp63d0s3kbn8zm6w85fmnkz6sqil4zkr4rh22esnuxm8mu4en8ifx80w3hwvebxi16c7m2wax53o4k6w1jcx93qq4shd644vloz3itjbz7rgbjx553c51j7aefr3jiux7xil23pt5msv1azw4y1gui5abbnk1c52y7mecguwmvxgdzicp2vkb3x4il03zg382lbpg3od28xswivu4bekdpyhnqgysc491gw2mu5dif7vz783z2y22986f7p224tw7oe5zwfz8hqevqujvq',
                username: 'zhqayfxgg4gq63mo29rg9hupq5bvt6no3qiqwqjptc2kolhjccp51gkvit28',
                remoteHost: 'aqvx5qqqsepid65dsbvxrdy3fkaxlyfb8uit4kuj4hynf0oic6vir9pou31utryy1drxw7v0guevnfwmqwnk7exvsi5onrxb1576x33zhjpv0uhe88qufg60j5cssfgbsa7vrtihn59ixiuenm25yegclz8amcwi',
                remotePort: 3549974165,
                directory: 't4e4xtwtcft8midpazqoerbx0f6u2sadwlw1odtwf3du0xdvd0flg4a0c1tq90ro6fjovn2el2zyq9k2rvehcf8l0j3tiomq2um93n0w4ohv0vqh0q0ylh3raormt5r52pk6ysppcw91h1mmgfddl9wmth741ka4o5m1qopkgl7gtsdgegu2zx5dcl4n1xasvwtiekx0m4971w3xdki3jzelb4z87v12k02z1vhqsqzw2velub5ojy2ojccfe04abuhuhsr9w8utf7fznibr7wsxak8wpflegxqdtq8oy53new4hz16og3putkt8fhwcacsa1bhx28krx3ui1c68y2wzgwwi5fo3l46q6v4a8etxv171p88fvzmw6huhwqb43bn34e519niwfptowuhjp804bb1up6e5dwjkcdpi5dfvu5vh665phmd3pp7mj0oy9m43hfnrwqp9icv1qbqcrlpoxnjcdj8ocwvqq5x0lj7j2yl9qq29behlm96tcp2rkbb0km1zrsp50nq8ncxbkzvld7qc9er455n6p7hcb9624bte6acn4e0yqhbbfwe2hvrc49vslsgy79y79cq6yoqor1mle5na44vx11445h2axpng3sh4qm7vdj2u9ndl6sy5jdtear17889b2iyyu08uwzxcrob8xp0zx1semsc51wcvutwcb7w3th184kc1lfskngjf76uq1itn75xryxsg247t8ijt2wbcukl0zbfmkyuggdyk1zzvlibbc1cnxqcpyvtnnymdzk4f5s5alpl1t3mjqqp02xjsr64i0ibmslwesdnsuzrroaotsx02x5hgoch6u70ne91tpkk5gl07ebwe9zql8560da2uvq3in64dm38n5a5f09g9q4p6px1kv9f8e6zlzhkak57wbg9r1xu7dzaokc8dpo7g968iti1mwwwtn279hi282v3q90s8jp7bg4ju8thlsk7nf79xuje6sqtgo2tz7wz6jd943em0pvnxygviqbv5iw8q',
                fileSchema: '6g4s410u2xqwf3ixmekyr6qbil3erubk5j29s2d8njg2l9dew0ci2b8l6eb0ar6kgwzy7lt5q2mks1q97i7qfkta0hacl5qbwjges9lz5slu37k3abaixvuwzdpthpegpz6mppu9nc4r2xwd3cxmgp9dpgli99xq2algcnkmrvfayjflexy64l4beawv15ybsftp34p7jcjfdxochbtd9isf6sa04pr5ui8acuzkofj3fcgu6phej0i0eskgd27ixen23p5zrthdomk42p8j77clvzovvspno208k19ebz4jzzzp8jqnq1w1br1e6y1x4g2cmjxvprjx91pi2hwdfcexkdge6lwxrwws7hd2xch2hqp7fvz0949lmy8cllfhow1ift8vkdfjzd34f9cioxtpe64z0fhmiger1tvpy9x5jo2ybwgcqwnuhu45szlgd2rbxuysohp9k2fgwms6i3zn1m6r4s7l2865edni4zn6o6c8yhgd0xgmyj5eokjv1o90ykxjzu2pdspvcj8nzbud8bwj1n3dd7g933rdnps21zohwdm6pg6dm7e96anyxnlzu4mxi7nolioa4qfdacddkjdsfor4efr6froe1oaznc465r89mstmrx315px9l5hfxkvlqem0rbslgtg7fuzq2yi90kyn17fnz9dpe2xwsd8xvft1rh3e6uz0mg965duob86wf513kj7nwkgjakxruwt608zgdpntrlvzfh5x6ew6z3upl5k1cmaqhsy3tcww9k4blk8a5l7hlgy32f1jrusfazgu65fs2nkyoda5tshudqxractu1a8ef9hfyip5ln1j13s4qzyoumaq8wmg1ws7jubno11v6slqj41www674xtfudktvckiwdlpu6m4d7dq7sgcm3oblj6dru7do07wficzuvfms8wxl169sds930dokrwk7w1eeix95c5kejqsdl6m3ttzup4f285nv7dgx2076gl4c4pcjimkdazjraxbb6v1t2nobgnk',
                proxyHost: 'jgbp23s11salpjvrht4kwd8pmwjmn2k6inzendx5px42g20zyfi5d1bcp418',
                proxyPort: 6511144754,
                destination: 'zrt4hnuxyt2776xbmhxiiwfv67mci7na5n1v5nbbj7yolfhzopoxkex4fv6khavb62fjp5p480pghlpbc771403g038r9f8mzuvti7x00c3iwg1eehwtxnbyv49qa0xmhbmvdrvp106m8ukp6ki2ypusjtpkkh58',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'dxwfekd6hdl4ap0w6h3guhigqr9cf2n2byzgz606yqsu3nh3e7z3lofv4olu7dxx427ytrguaciye8xg9kvfer2qxi2xi7p1gz3a46e328lv7po566rm2mki9m0mrn88tr93jaxezt78gqj9kz7uoasokex9vbpt',
                responsibleUserAccountName: 'qkhylm6f06m424f5t0aa',
                lastChangeUserAccount: '82z3x7hwjkg7fiwsx72i',
                lastChangedAt: '2020-10-14 04:58:55',
                riInterfaceName: 'z8h5ziaql5pamyvt4cmc945jzuczhq91xl78osqt179ciu1zsec7sxugprqw1ybwd6otiwldedcqn201sa8upofmvfxep687m128vclm5jkmd7x2gz86xz5vo1s3i8scp52txlemqvtjgmdijhr8r48d1r5z3pm8',
                riInterfaceNamespace: '14blny9irl9hoh0qtjvui4c3fu5k8msrcw9fluk3epjtheldosl9iiqrscmzruty09bifqd8kvjw6jrm5qo9cv87r5sxx0qkh362qse5o23gd87di1pbcniccww22l9t8tuwnbr506ap3j9g45zev681xhquag9l',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash is not allowed, must be a length of 40');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'rrerarof37s1t0o2jji0u69wddo381d4rehfw7td',
                tenantId: '1uxncgbtthppp3pm69refbv24zhl7z06v09c1',
                tenantCode: '2o3890jfkuf7nxwer3h9282fhuy4yfdu6pcybklbbkl3949qfc',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'nivb99oadlpngzepb295',
                party: 'lglskg0g094its3nkpsu6m0xwqu3wwlxxxxbn2v4apcamsvr3n0fgjd8lug03eho7fm66mt25m4iu39tbqh7m2yzbk8s18ghul8f0lo3xsavv8hz27io1njs62u86mupdki4nk9373p4n0ifjiw9na05p8k1f02o',
                component: 'enaryetzdpmlp7uqmjg7itf0wvjxzft261k86bfid7umbbvcyekk04ubfvddcrf9xwr4mw3aciyy42ggv3bzto1yuaasip71xz20jzh1iyor5nohpf1jg4opyeh1l2b8ky3fsf79j1q0zxoov6ptci512vtif82c',
                name: '0z4nd3aqrmyjdq9mbabwlefmtkv3fhonrox9oa1w8svv0mjny51ec5fei62lg63ihny7l3ehhuzfaibhvj6y9vd8w5eewg2kl5trohymu6wrmkg5bdpukc5ffqv16u6oaodj8fv28qm3aef4lqsisqvt4ih51m5u',
                flowHash: 'lxsghre0zlkh9ybvftfa9r3glrz6vahz9xjglsgs',
                flowParty: 'ev1i88fld5w63s9t7elkb56nk4s29kp6iuihlqpt8cdw3491aw01wfl472d1ufvnlw330m205fwfadjpovme3lv4ecax3zq22skfjbnxr1jq5c5r4gcz4i2kshfiybm18me8khya9nak3rvulkn0zd0ex31l9omu',
                flowReceiverParty: 't7a95y6yy830phzqytrfbdqqbft074ft3lu1o50shvjon7zsyjis61y44jx4jehoql4ij0oeg0xfldhf3erh9kzcgb6xwcs8mg5co6rh4utjnkathhcmp7cenribuof5anscbsisykilxvrbshqjhxuf5tu3wxd0',
                flowComponent: 'fa07vr7yyotl4f69cvxkzhsz4vpifeiu8r00luaiv7l8jlm3u0ybjmlzrtygfv7lpewe69tihowy7utj5k38zpc8f03esywy63d5r2kc5dz2efdnr7mm3co2ikg3z6s8umscvqzrk4ud7gxdf95h50dqz9xyqzjs',
                flowReceiverComponent: 'afsrmk91zpjvrrdqdqkyc0ozyun0sgame6zk7mb79mrnd8uiafxc8tl8rhscls6l3odpvag11f9qmphqa7tl26sh747nkphc2iivf1lx9uc5kk7531ofuo8cqw5wds51o084u915mnhdovcwiv7xw95ex08rx4ub',
                flowInterfaceName: 'tzkn1gzjeabaa80k8bsk15tucprjwvkf1v95ydhd4pf7dhx3bpx6jhuvz2q81a7ul6lia6ujqvm3xovrmpt57v8zw38yablvq17lo2wn5kbhyyp75yj3ew9hxvod9ygndnxq153apbd8sg4c0mq9u0esy0qnbalb',
                flowInterfaceNamespace: '1yek6fvl6e7s4y1muienm1hlt3xsa8kift3lz1125j41khl61863p33zp2dgiepupioal8naf6l5m9z50jpropsg0s29ohdqwolwzkp5zyknqy9btcbzuf7vjvvmt35g02jwdp5ke9faxom3ualru37vb9ar8tdt',
                version: '1ed3awssh8bw7zz5n5p9',
                adapterType: 'o91kfc65n3wec4drnqosdcqivdiw6m7utvp5tpe5uv6724preyunepxi15k2',
                direction: 'RECEIVER',
                transportProtocol: 'qcpn93qq8ubj9psi1qr3blmgbq7n0p2gja0tz27gnzd20q6zqdp3yvf795ii',
                messageProtocol: 'omrfmrmq3ip3nvncc8tqdbyz5qmwh36g219mzk3q0ix6h1ibthnocty68iv2',
                adapterEngineName: 'y6xd6yw5zxsl9xdv3cxe3w1jnhzwvk5c6wquvxz74wspliz7n6kqoxt83rpkuw7ch7ugv85z59763jjjih68xkq1re9gsfgrcbz8joj0cwpy6xpci9ibtek4bqij82m1hh7gcl6i7lsn930juypuw55bue6q28zy',
                url: 'r6p5ecatoyo8y5lynb3wppv0lm4pdow1ahfuang7bwgp8cf8dq6b2tjrq4kzsz30ycpxq6w92n8zvproik6uoht44tav6fzwpz0689pusk5maxfkbu02lged6ygdbufcymqw9k9mu3m8k0qm23t014y8fnkq1dc726065k9ci85zwmr8bw58a1efz9wimugbd7f2v3dsz0c0kdxtvf20xpuz7p5le5ftfp2qojyoxoyeb8rqa7p6ftrk1o43gu1jyy30hyrcd4mrc34p1x9mf6ptxcmn3sk596q127rzyfi3f1lj54jnpa371qtq3r99',
                username: '028ugr906bi2akhfmbsr62oj0z5ff3hznll5w7cbjsprdkyi1to4hzl39gnm',
                remoteHost: '1k1102t0zb967l15f8mmndl0c05nl3eush5bmke1q1ielmys5hsswr0vagi00247m8hqfb2yqhj4ij86jmrf2vyyyg9cecvuv3wurpk16lpsk50giivrtxtihfu9a0c7m8k6pc1bt11hb4hahtsel98dv2sqgusy',
                remotePort: 9830592453,
                directory: '7nh5mbrc0d0d81uvw55ull5coddpucfqaw72ug2dbvjr6zc2t9d0dg5p9a31dqqwoakyrw73zjn8d0jl3eimmdohgdyc72g4vei0wpeykpzs38yajic6gcshkkpqlhcs90xx74kx8cbpqvwzzeuhj1tvwx8itm4j2ickaz5m3sxax4ipkve971gytq7li92l1vzbs5vq0545m9u9864cz84yv52we51np9t1rbkn27wx3ysi4y78x5itxhtr8mfyhwf3r0e6zlyozkcpkyvaoddpmi1gbkc8i7bqnk3em28p0fs5z7p1naml8xd9x1ujiyuazdw33h7p1pq25l3hq4j8aau2gw7u88vfu9twg1wtx3s5g62uapw8yz3l1hte6qqfddlscsjgxlqgfg6xa59z1k7dg4vhubuhqfsnwrm5l2glnny6mdjl8o0tr53pui4qznzssh2zgjqh1b05zs3oe4vsbm86g5dwh2d65ljteht8zsk65q8pcbqp1uupcldx4fiyiw6h4v9opqlqndjpbuzmp26v2nz6sjsbky8lidlr0w2a74cf04an59z0bez639avvonlivtknkgqod4vba6n76ymtdw8naed0mzt6pr6qyorzo1ouz37u2eydbfkhlzuuprv42m155oy3nd73ow4k94cxe21ootngulwtev8l08m7mbshbu9q1ykjpul42ob700cc3tql7xytfd4gzioaf21k0velxfgzd8f2uzglhtr0ivyf83fp4ln5lhel8zd7g9j865kzmw007totniatlo8oj29kyffkqqg0xs9jy7vboywtdk6e4omv4ytnyifbnlq175rv03rphronqjo6deel3gexnzeb71nlxmjbpvgzcmzi86g469r26cuixxklqtljmz0c2liea8a15slmvba0semctltobhajuqr1295ewpwocgnn84zx12vzrvabcvhphz5qwy5v73ii8bizvvf2gydad3r5zdvfbpmtf3sde9j0fdr4git',
                fileSchema: 'vdndgz0ei50m4yktyilewchw1sujfbnxbhehajt0d5b5m828tori1fpq9o7zbkpwqohsgfrshgd8efjg17ygjxa2oppqr9x04gk4rpd8dg2c5xh829wivgutc7vj9attz3sf5aj0f1lsqrku53nz83nmliqteehqjm6k928zo6ck6kigrytgb60cbtp17tmp5rgtzruq238eeak1s2ki1szqigf22e1ag9b5p0pn1q6y1ffrwi0zje4rcob8thppp5mpgme3zbgieu969kg7uijzsz7ulpd2wkx5kd41koymz7fbbykcb0m290higsudjqc8knk55yqp4g7e179v4kps0f267i7kpudny3vf600ofjw2sh3o9js955bm1t5b2p9n5685vw6a1herrof1yvugnfp4ouwg896310k6t09lfkgcuqh4spk688m8cbnnyqbgs0g8mqflzobgdekjihj7cqp65tsfkztx80glmkhmbel8w6kcs0h6e5v1qd9nlh1llwuavaruzpqo7043sfdp2x8ba5v111y7610y79y6rlvqpmjgt1bi5uh6uip098o7jlcfh7rktxbv8zr7r091y054anbgrhn394a5xzrau4ooidp141cy3ycxw2wj9sv6m30zpmfs8ba9hyyynwzarpolqm3t47p0bxy8r7qk1a97yw9yexai37pzakvh5hnsuyu2q5z196rv8ssith7tmawuu35ie5xbxfj9fzazoh9ymr0524fd1z4ujcj9beaqyztef71f7p0cbw7rd35w5lwn80idfmm23suitbg8u0zdj1l5nd62u863oaurdneu9w6hdy0sxl610fk301533w78ndc48hux4uz349reqnpwsrmsn902a11xz8f6v3wybik17z6f223q0n5gxxhm3os4lei1j93v64ixm2j7w6rys16apq4muwan37edg52rllkv7tz8cou89r4zh0xtejjm36ul72txa3qesvowmfqxdu85fv3sudnh7sp8',
                proxyHost: 'd5x5gw886njqzfsdpsopajmro3dkgs426oelsjm8njyu0quweba6fa9gytsw',
                proxyPort: 3163391713,
                destination: 'j9zx3mu1h7gqcwi23mq18x5lk7scy1wlhxzr2fpjbbnp2t7zbvlpjbxaeb5j3g5uam4ag39hyi5e24btk57d1r6t7dkun1u6ca1y5lkhl460jnlnau2d5a888iuezwugllkbbqkdvyr7vkze9zep4fp3gfj5as0x',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'k3h54k3a5qzxm90uehsflqypmyw0888d70hlbo1z8lxym5rdkjqe412bf6a8mz52fj5ddoaidnn29sw8l1ywhzcef56lw5t52wrzxns2oo1jirqe936thwmumhfwm2vwbsbokjwqywp4rdsw0iwnmyg407dwbztp',
                responsibleUserAccountName: 'am63bqfc3uy4vuqfp6po',
                lastChangeUserAccount: 'xndwb68rdny57dvee2bw',
                lastChangedAt: '2020-10-14 21:11:09',
                riInterfaceName: 'mgf69e0fclej6ybnxha66bxtmqow27b5kbfv9aa0asa5q6hwebvu36osa094jspne5h9i6shziplsca9s50ug03v36h362ntudb523ytzf5inbk9j265kq7af7t2m00nf90iad81ij284gdwijst8nd23pvykxmp',
                riInterfaceNamespace: '6lclh4nsw0fmmu82u530p842ka2gc9waxykep75yqcvrtk7v0490t0m98ycsvt8mx69qzd95ccwym1il84iax1fj4lfuohscv71j5ithvj9xowpm2n4brb4ijclhv3v5c1hdn8bqj40lat0ub7m3v1i08dwkjfl0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'g8gjys6z2zm8vlew4i53wb4sgbo1pwz3e9zrtpuo',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'hfz9u9717hw0o0tx4hxqk6frdtey95el1slgynesltxpyiavxn',
                systemId: 'ddktcob5ipe1zamopjdjfx0bmabtxs4ytz0ac',
                systemName: '6020jxl5cfrk4quzadsd',
                party: '0u24pogc5rbuqpfhrzsq34g5l48rf0pptk2h2wankioct4b1gxoth136krm9jd8lgk0doedjfuapoel902sm0d5a1jc287v97kuhiv8vn8oskepyonkuc3wprpxvnixb3tqy49u5l3khqcqpoax24rqfuim9o283',
                component: 'x7bsh2gql770gm428zdq40uqitdgy8brng2nowob0hpyld9c16jtj89dfb0fxgkgmgj13632k00ores4gtiab308q77cfznbmu1g8pei926bzwh28wy879z4umw0qleewqr6qi1wzwtp3m77z5uczk60rz96p3fg',
                name: '31sqw79blrucfdef7c6n2fo3d2g7lzg59sqdcc1zgdqsab1gfnj99s9co6firskv8nmtlyg1opxei12dr12ix6qnbotydh1ur1jgqsb3vddhe8gogzpjfy4eknrfft3rw2ixq7ykfygqp8wy8fmgdtkwbgmxa9hs',
                flowHash: 'ksxhhdanbpzqrwxc0e2i20bdozc91rxkljwz39tz',
                flowParty: 'cwcwo07ge4au9vkj05ygsgef8puo8dotjt1jj4coq3stfjz8mzolngy78pw8kt5hqcchi74fnup64bnywk7hb0d2anax39j0epnkiyqio1in9exjuuv7sa6awcxmroxgconpe0kkyldsj64kf2483p5ln5yrpm49',
                flowReceiverParty: 'vzso6m2nlrsqt5eszv3gtc2nxhe6sqox21z9boliyvy17a5koalzlgg89tkd0m7r3rwwvjiyt8uu1lw7uy5s1tez91zxrlj7kietzrxn9mxv6z1t638q2zrnqkx167ajjvlv46imt7kszx2at47ef30yslkucys6',
                flowComponent: 'von1fuhumkzliutg7q6tu9deuexf78lseh5bolsykvmg69xn4htqkp403udhwcdxs91lc29mgx0a6sedjjye18jht82mp5dsu04bbmshtln9nn7rvctiv4ueyye5qh6w1l4zxgh4ahihep1uteby4d4mpgwoh70l',
                flowReceiverComponent: 'q5qnoknp2fcy9zv6ui0pk6t2aobk3k6wth43o0gy152zebmhq2v6aw38ojg4ynfv2w5i20t0ugpc92o68nqeeola77iafye8gj7ua8y4jhusm3vaqsn1s146w02hku3i672gla9l0zb5q0apizvsizz1va77m1jf',
                flowInterfaceName: 'r0mi6gcbv24wovv5b98tafcb287e9y1skf4zkh4tm2wap0nczthdulxzly2ba8pt6bp82bfcarsckxpl63klrnls5l5p7n6p2b3nvrkqh21sl5hdf4e9ut0anyv039hq6ly5a4n64p7cj32v7ddk6koh3wepzlim',
                flowInterfaceNamespace: '34kk5qgkm3lcs7qu1gl2vxcz8ve2qcjif3nw575qjnkheatuao3qt97ujh6dywd10rxoizqtnw7u9hxj2na7ni7z20tu5532myqt0qu959mpufc3um59va0972cu2p5p3zz6jjtg66nsnskt353lwopdolfw1h2z',
                version: 'lzzbdv8p6mmqckxjrwwb',
                adapterType: '91ig4m4qqvin1bjrczmqu0ce9vnqew46hxwtgwe8gaumd1sfn0750hdqiw4j',
                direction: 'SENDER',
                transportProtocol: 'e1atnet1gk8d1mbdfww26infyq331mbtxh57y6aqn7zj63ir0765ochlgsic',
                messageProtocol: 'jsc81ej5zyjqr44076w2bez47n5rpq31w1ljwllx5h0qubzd5bcl9nrcwdu5',
                adapterEngineName: 'j61gvgmkicxpvvzmt8qot5kqwt6nbto6yxq7fbr1woy727iu3t8vm3kde3u4z1cks5sd1d5tt9n711uehxpty95gvg39iv7lh0qsoramca6a4wp82sz7gv7mbgtk7dxzlrnxn14bn5asj5paq2gukzgh35l98t78',
                url: 'flf3goq3sm1aus8z7dc5n2dlrizqedwdf8grzigyzad8x1vta61xx884eb5ngpkn9x4vjh1na9nqd50yk09j6cr4arakvlbwm7cp6slqjaj3mfwyy9z83fl6o81ev3rt9m3y6txr77e58bqcr0o0f9w301jwm6kv1hhpa2gi3xe72wanunxcqg8dvtjp0c5ftcoccfq1wtd4ceqhnqvd9iv5fd7rsep9ezxzv802rtu3j07s4395pzua7kbatz1abfqfp4kcs6rsxrkamp1kssfs1n864p2msmw3uzvz8wggjr0bkzez2zqevpfszq7g',
                username: 'rctsp2ief0oog5qo85dwrhm369g73g84vi8viq4qvzx78bsp0b2ud84sy5fb',
                remoteHost: 'pvg294rudnptcwovxkku28yx5woq6vxo7v90hl637zoh61lae3zxxb1mwolv1kvtq9ypik9ebaxg9i9koanxeovqj0rd64p4gsjevu0dcmm96ugdfub3aycx8uq56187qh6my6qg7c5ywacswu34ezdmbui4u1zd',
                remotePort: 6809877303,
                directory: '2e9gd30nocc5dfh2tgegpm7hpvmq3a9u4ufrefo83lc91yl1q7zrjt6kpnfyp516jdymr9ps5yistb9f3ltsde2r8wl2l28bg3zeg0syhx3gl1uis8v5gf94jmikfszrfkblatgrs19x90acx9xi7sybhvx2kv550wh75c16niwg9357uftd39jmhlm330jwit0w1xcvh463wycw2cdvr791cwng3r9pcvl99ojg8vbye75rd2o5vtrni7kjgutz6wv4s44ku8lxxv3ubwgiiidqzl2vgna6ko1ij3y1fnwujq27nib0coc0nuogdpt02lqk97v52rfgkfjkx12g2h2watmyvzevpj39ye0vuqii421zofgms2oy70ka0ud2k3wd2wvgxtm9bu8sl8a793jpxk29tbyu6e26h7mn355jpcmgjyun18u12kbw9s6pcobwkpq8bv0zp68dtzr7vm7r055x3wftkpzspmiw4362875wxlecr0dof0ecnggyuiu9gnmuzozzhwt0i3ugkx8000ty02dg3b5tuglzci44azs5usavvrs48flo2bzkqc5gvkjxwuow7icc1tm0jtdtxleb1v16hlvbm3eg1loxy2nwppjd70fyy70951bfzc6755l6wuthqy6eajcbfbd1r8le4kgi1k1zxx8o7c4038c2up8p05n7aul9tp22gcyi6xlb1sg7ijsepkk1cx5q7mftwtxwjczchhjoehbatpldt6fovmbhvcd4i5u2ttvi5f1rd4ynji9d2596twu7a9dynrthzs7n709q5fzsjdym9u4gqnx5wyctsyno1aq2lwavbd2jaohr1h2oliv8ofr28gcpu0wgadf3saw8wofoo5ts7q4q7xg5hkl4mwmfep84mpawty5bdqfz13hjeanw59az87b0bc1nvghzloykh5q6vz3a334oa878t326uxwp4r2npnwcuw2pqx1858g5teievgu4e72s6zmyhxje820s1ngnxls43ipm',
                fileSchema: 'm5rajeqjxqhqpaoflndm4ci03n7547qbleaecgrrvd6xafw1upe75luxwekh6tlhimlcyex106fsn2qokxl766saea6et6r4yqh578hyxybqo5x0boj6ggepjyrzol1gizqrq3sgi5b3swl7ap2e0q12pasfl5rhytt2pjk8v05bytab9aowyjb7h5o8u07exwqdqlmatg8a8fg22ulnhn9e1xebsny7xj78yum8n02ivk2p2if01ko1d7a1vdi8nauhyhoikcl30la4xrup00b1ij8m4p2vvldqecwu47rcjth0sco0ox0z6srmnxll8x3lzazk86rxus4ebp0st307jmnxbcxk6ovvr6pqamb4n2rap1u63y7k589oufphalykd3xrvxdaay8fvjae5jiap0vu5f5az1wpd3uxe16v7hi03n6rjpx0sec4275by191cfvmd5hq7uy8pbebkl7thivppxa6oxv5bmfgfyheta2k971dlrgusgyvzblkqmcnyyp547o3au7tffluyzef0zgp4h5tuqn5oeyll3afw5c970t9xpgargfu4gv62api34zojuobku0sdanncvi4rpr1qkfxnn8zhmvjhykkqjtg068p2wwe6ynp4ha9kuqeou7d1u4rm66dqvmtgxwi89ki9uy4xs5ey50ktmjry9a53j3mcwbox9dvob84zzg15g8fea9cbxbd7tntyq6ts4j0irnxlkl59k1f2y7abtwhh9l6lu3tdk1iywa1wgmb2imeoyln25s57fxyy4gfoepbcecy8qrrl8kt35ee9ai0amv0lugp2nlgqwtpofaljjvhdp331vkt0t55t2b729273gxo05lgwnzzlyaumj5hcb3606jhlrwkgmw31uq2f6agkzbfnapohae8se7vt207u1efrwqop28prk2671r8g4exdbw9wwi2jcz8twhd20bm8hhy9wa1s25h58wfjwd6qi6v3e4zh3qdlrhozkdfxx1u5pqvi4j5riy5',
                proxyHost: 'vtv0lgzeg98v910lbqd7nal64du51df09729icyl6dt0k088smsalwx3001g',
                proxyPort: 8511278024,
                destination: 'j1tenzw5vjx3da5dn2z59r17iqwi0thkmouidxegff9ofqoadmh3zxlmwyrjxxprxwaq3gt3ixdx6s1l3wje7oiw1l4cik3xpjk2c6xs74w1k1od2ft5nngswic1973om7xbg45w3clhp4ayx2tzdjs6dare9epg',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'l8mda7arukfgr9i1aa7r435ss7zo62c24mf2kbl9byiqy9a3xrt56b8ybfc0hqeh0v3t5qz1p9sr817hlc8eb26kwe253sagk3fln81coljkja3p9x2mbwahaiwpcz48vzzpwfx19amepw12d4urz7jk2p81r9xy',
                responsibleUserAccountName: 'iu7w5lig0mmn65iqo5cl',
                lastChangeUserAccount: '4rynrre0ljjclr9t3mb9',
                lastChangedAt: '2020-10-14 01:49:40',
                riInterfaceName: 'avu39vp1ou21brpv3gfawtje0xfihuzp082wr9j1fiy4eq5k3scdsqn3qgdca3wildf1wgn0jc6801esc5wnya6xsejyv0z2e72aog5sh6wr42xpjdjvknvah1pbn4m37uug3mz24rvt57afy5njlmnzynwppcez',
                riInterfaceNamespace: '9ec5seyj0ykk64sn3yq91u7ad3nbstgwzqwmlf2gukstuj9zv1cmfgrzs5ohkuj3snlfyohe6cy8e1ac1pq2m3bljajplcpelchdfzxu9vu1z4vn7v34df7n9j4nduhiwn9k51lmpyt0dts038risfjvamvw8nw9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: '88a78u7m6s7tz6k768e6hfrbxyp3tjxkutufk13i',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'gpe1i8j6t0wi7j6gbgnuth80k98pg3fp6xcsfxl7sv2m84yrzl',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: '1pyco7hrh6vad4k0p7lp',
                party: 'vpsoccn798z7bulmdz5lbaxyhcj1ifc2tjepb96oobyb80s4vybl5bq80w5hx7gsvb6gk2bgevc3872mj6asm2r14skf19hnhr6x6qu1y1xb87kwh7jt0gqvoko7lejdphgh37rl976wyc0vu8z253krvuirvomb',
                component: 'vzia8g56w6yaiq0jkobugecwopqldv13pt9a8zauzik1xipspglht9fwvym574qgnheih26o3q5paimhwe81x2vz81irsb3dz604bmhvk2ffs0wybwbh1ue0ri8wsgooqc5o334pvt7gb6p910aq7ft06jyruzzz',
                name: '4ayq715qb09pm79cs73i89izpvymwul711gdirxudw3vhcwapqtitzy8vkli76tm1wn9bdnknv69zcf5y3nlip6dvjch8k7qo8li3xc33m0f47y5vy465j88lt5q9uiogimkjfkxyi7ou2324g9yhski1lsutx1x',
                flowHash: 'z98enf99msi113de0s9yjn5h405foo0u1qkc2i8g8',
                flowParty: '82pb3ar7tnyt5yrj02q1m0ru4p05k0z44av4thbl8l3yxlw3fhl7jq2uskovdgedilg0tmdw521tbfs9pj5xu4iv299er2o1xwfxy0j156c9qskg5d7wo6o4tt910u0c3r6o4avpty5kqraz18ioc1ytcozmb78h',
                flowReceiverParty: 'rknq2pn0cj5v82ge8h4a9s5lsokwuz8j0ma3r0i5a7c26gbb2f9wn0qfgpk8l19k51v3shmeqfpow9n3s2aout69yqyhquoodp3tj63gu9b8emthzfx64p0x5cr1eir8bjz68ewmbwrdxxh7nsxvf0javqv733mf',
                flowComponent: '49xpki7ul0zr0khfnesaepyilb1x5zbc0n1f3ysfdkrluq2bwc9z6f7vbzr2w4je4vpm8u52hxon5qymzmi6xdkckoxrkwipkw13781qc5lyblz64913pv0uez89etqdip95o8vryuzbk6b0gbbi7djy3lopdxj9',
                flowReceiverComponent: 'z57nsvrivoqy0otdq7v66ic3gca3ik4xqg0t1pswrdoysutqfpqzetdfr8qo5feljc29ac9ewe5zkx2ebqgu2fnmwiobibu0jlki1l29ouaa7yyokqb0yd62p73xru21crggky3nz8413kelu7aedwe1udl7zgb6',
                flowInterfaceName: 'eqq4yxm8iy6xthjrf0gq10xlopg0fzxl6yq49qdr0ch72dqlnaeis7e0cme5rjdws1lnex6cfyne440aqusbj8zesend0t6awr1exp1o294smn6ne5n1m8eq03pvev862qxjzubv4f4srti9rdqtn3w7yscwnyos',
                flowInterfaceNamespace: 'h82ercnltwmt6vkw1942d35tbdwq4004zxb6pyzv004074vcsa5k1w2h862msar013yfi2r8ehcraeni17c7fc9ugso05bpyut5hddg3gvkzjdpegdcdj47d03wtq70r59px0t9zzbq9sk4ts3y99r7ycqrcwaz6',
                version: 'fl414yiajwsu2jqib78u',
                adapterType: 'tjl4h2rxl03ei3q22ntoogs5d4wk6w0p5nmmj4i427b97kl12thcuzsd0g23',
                direction: 'RECEIVER',
                transportProtocol: 'g2cvqgxix5dnq29g4z8l02m337yquawl9mzgb9gpu4xf4vmdf1aahnn68hlk',
                messageProtocol: 'y2a92pffmnuhm3mndf3mgfj1wjotswj0ymjneacxvzjqbfctfjcpp3s9w189',
                adapterEngineName: 'g6lgibehncrziwur8fnmsk3d2lxp4hnejnauy9t47hcpo091amxu515wsoxrk59mldej995fx4weh7nr0uvn1yyy4o6b3bm41hrh8yunmg1wcgmgbv2h0dl62bx5wywdhvhnan1vh1n97jl80vgnkbrb8zdedbc5',
                url: 'afttnrxggyxu070aanoc78uxsbwx9vkqe1x74kqfx1wr8wgqhbtimkzzr0rgkh0htyphhan7kltb79o1uj5uro9uzkjy4i6j5s7adxfocrq3dtd5wtdua8543kl4i45esonmvykrghys18njz5f2yp86bb3k35o81yewzu3tzp0oyo5mnyi3ejun9pxxdnkg4xbs2lpeg81clagra9asiy80micflzjx7m5aj6was5tapyxisqaea6z29tz977hx4g9wy4o82ebnvoovvunxxn393r7qqquczlmxvun2diarape0nwgyj1v9dwnhl1ik',
                username: '0uv5qlg2pfulb97mhrqmw7zfluf2qu60alte30l7w65xueax0eriq82cokwg',
                remoteHost: 'y60gsdw5ncb0y9nsamlk53fllhjp5rds0fzdjkez4crx9hnn4nbqz81hcemsj8fya1ifmzbxsbbhnouba2xy7j1blyxio8qwglfo197lf30upmhzf1lrcgc136a0xezrow12ww417yk1hlgxfgwmhx8lusv7qhi4',
                remotePort: 3149548747,
                directory: '3rylwedqmbel9oicsf4m8qz4jzmx1wjqczjwe6jn3z5xxo2jkpyyvzd4pnfz78lnf9yi7oqzu6n8kismal84nm2m0t19edok5kg23wr9h8s5wbd0b2dykwdzu2dpzegohyg7zeq4uyw9nt2gekdl3myud9d8cec7gz3tpk1r7dinrc5dducxpdmmzqd6laugh1zgr6zq4jockqpmnbavb3767a3e5jgjz46mrifzqxhrg352wxfc6idw34q2r9exwv30bfvsnkmclnvz1fmf96aaiqaphmwv8gknges4ql1sgp81t5clla471flaa1feosm6bhhmpanrfo3klj1phjrnvzwjz3yp9obxmw9efxf3ubdq9y4qd8kkpupat7oeah4vwld0rrurxfvrt0qyok9oz3p1js31nas7nix2aaye7cn154ah6h34t5vs2f9bxpcv3u8eb2vqauwk78i3kot6nh1jc7y9qtckepvr248tbg1rn3hr5mmgoelwp3sap5n5n0wdop4lvge22bhb2zkv7za1zspozv7f72d66olyt20gumx0zf3pa7hf6cvb8mmo7vj6d7azkc2wwj3eva40iua8t93azl1ldtsfe1owsq5f4nprzyc1h2ycmavw4yioq6pedcqhch53ume3d6r4xhh5s3bbrxuy8ypouxnh79dpi2kz4ov5yh8ajym5o5okg01bs6166bpg0iqsr54o9kqyadlwuqsw7625jps0bdeqf2vl1kb6c8kmcffyuk79uvmq6fvqxraoga0virn32ph9wvd4qssf5hxmeussx8gz840laapctb7jjteyre9fgyouybhctzlzkwyyq94eeegx7olupfpa8in5ovn7qnd99756g34583s2k6f8ry469p0rfbins9c5pol8gvhejn67i9mnmvxmqjvl0skips7melvhb3mu3352zds5fhhsygw119564zvuon8r4oqr11p7665ej5bbj2mvk8rs0ibpykist8eai6t3vu7s',
                fileSchema: 'gfbbg9u4chr2qt421pv3p4in2reash83g8n7066t5dze9ddqtp0ljxl3gjjt5bffw56gz06a2wu0lcnlwm3ct93cnx2ynis8y8zlca7oob97zemkf9umb45uy1mkzf2yy0reiofcragjqyc3l7b3vhxs5q2hnkt6zrm1hlnv2k5hec9zu0wxhnmm8gao76ss06r3csv5qhvuo6ncp1kl87qzararb7uhzaqy1u44r37x7gmzr6pkiqiepu5s023qy39pyeamm5lcns743ar41ux011c5pdls0cfyray6fswj3710kvkpryyf4f5ppb49cj8isonub8n0a5n0juqsm6lgg8ho56v4sxiu3l2wf7a0alr9vzqx1x7zu0z5k9pv45b08x7n7uzv2dpuodk55ev1y5rggw0vil2xidv8gkw05od73f2y7bur82sidh5kz2gzewvkwwwe5ceplnqt9sbuzz1jtkgqmzneczcb3ay14u1l82aiv15as9yxmcj2lwof0p1xg92ox97na21bztkeaxvg4n0iczpxiomwhcms3uvz0wlok1lz32nejb4hyb9995v5dzvrx6stwzs6oqu1el6uy9m5yj9yx9yqk4gasgshl9can66t1qkjqhahgp2v2phszbnt7tpe1f1re5k9iezvk768h7qjb8lpr93yskvjq4ng8me9iyon05lqm85q5xvkbum2zo6a3igtk8b1cd3swfy69culldj6zcok5vxvyc3dipgnoglpi18becakceyb0i3a6rkyxlcq729l7r8iryatbeg0wjht0pj6eyt9dsgxm151zvnagu2pvoyzxtvzr69aj2zj4h0c82h82gy3xyl2gl45dt7si4rf48yat99pjchhp7rpjaguk0epuig647c5fz5mk32x1jhvyqhhh01k5v8ytmqsazwd7i1ex1m6f69gqiqkjczvrexkff91tropq4iktiq315sm75gn9rd4hocfinteho61xgcc9qc0iz7ouk294z9r',
                proxyHost: 'vl411u6s41n0pca58ji1nfaq1cgv056vx6j7ed5hmr3c3q5quz9jwe4ivp1r',
                proxyPort: 3551543956,
                destination: '2x7tivm376gzkly1d7u7ylem5r3mfmmxvgr3ja99zrjs430fjref6jwbkfp4mlco7yd67zu6y9m4nycku4y9njnoc5acu25u9o87zv5f0pbr36mv6y41ttcx4u1qz5c2mlc2nvyw9xsaev2r4sc3ro481su9l3z3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'bfzkj11crqwptkglhot96lnt977rj01kz8f4rxtm24zacdyufttqbwukjn23qpfn590mqvhwosw5cz00e7gmmy319rt402ty655jslbbf5upo7tb7mg187lz8ltjw7lt0p5up9lypan9yjx01g2jsyenjb9riuie',
                responsibleUserAccountName: 'cogzxqym0awce6ppunog',
                lastChangeUserAccount: '1b7lm009e77x9let0mwr',
                lastChangedAt: '2020-10-14 20:46:46',
                riInterfaceName: 'otas2zusaneqfvrvyw8f7hiitlfh4wy0y6xuxlr2pvuj9vxr4ns5yy3pvsgx5p0rv88hgtkk25te17dco2uljwmp4qqjbmozcmkyh7y1gstoz8yr0p9dxn4xvacyoj2l74rgm6x0cqqw63n4dh0hxxkyai36gxkr',
                riInterfaceNamespace: 'tnib6hdgdu0bf72797ph4bkpw3rjulq8dx0s1thj79vewivceszx9s746hc9e5480wnt4b9up5huhy4lhozazwe0reyglv9b3alr2l75eovvy2hrt46ij656p5yammez7v7llcd4ox67ub74aagu2kvr67cdb2hl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'k7q6xl8sl412o577f14y6i6l7imiq93egydj6vw2',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'k4j7qxvvafulqpyeiwbf111lf18lll2dpmsrhvbke8mgyvt1j0d',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'iyt6ixthp5lpkcmb68ws',
                party: 'j7d2r1lrr25k78fdwjn1to1o6c4va44lc31o1woq5ucunos0dxpxgidj0ayt2epu9uznvexi60hukosan4mv99by0l0o0kxuxvejub4cyladyyprfavpjoxsqhkdw8dkbllj5qrf0t08y35o0morhve46z4jg53g',
                component: 'kenb1ibc9z5yt912ztkhdyygmjenxab6hr3n9wr0dkjz0twx95fjjucjt3j2crcop71l91f193d66v6vxjx2eiel9pmmib2a72s3ia8lj7rri0dikmo6xn0mner04qydfcm71dvaz63d8rvdi16p8r8q3q3i12un',
                name: 'v9bcw2hskx444txvtq1uyza7h4ka4on76q7lamyy5l1yt2en3v55773fy1uxabhjnzw1rcyym53rddzpw2jgke8tn1k32gfc5tt0o8uxna2hsaickf4v6hxp3vya0jwmwc4ek5t1st4u6o5u9k14rtyrvr0x8y98',
                flowHash: 'nh6blzgn059ywjrg2s0f4nlf36kcaufa7oec3s51',
                flowParty: 'kndkoo2wzmmp5kpgsvd6qpbug9zcbj7gp3mrlp6vopecgxdb8itipukw0q7enoyt08x2sw4zdzs3nnaueck9gb04pm5g70vfvi8jebcfgt7j5n1v7d1efzufivx411kl1rawj4pj9lzyq9gh3pw1a204l5ikzfdp',
                flowReceiverParty: '0k50g7b4swom5pzfd53adbtgdno5u27d9vz34po37rinw46kj4dv6kqb607g3oa7dkurny3l2m2g75wkp6ebg12ysmd6n9b3dw5fl5u797no4pgfb28rq6krqyktdciwdpifi9yzlqow7v9q0dro7311z4mggc54',
                flowComponent: 'xj5yk41dtauyjpeslblstftsdgxocfzxxx20p36vwdxh8byfw5rwu5zpu1uloq2vn29i69vah6cmadk2x1394lxng9pttz5bxsi0r3uitox7otq9dq1fk0wyc4zurzxc7p5imin8pp6u9nhdxybe4pp2qmuqppmy',
                flowReceiverComponent: 'br6jm3b48ruwrqeg85boxorq165ogsnanvj7r3qo2pb6jslvbcg4fu7wwm6lr8fgz92jtwc2bz5w1j5cs1iuln01dvsj0yuwi4tuet7htlzzf7z2sqb5irudijdovavte0ttxz6m12q8dfnsjd4b4778qp08glsx',
                flowInterfaceName: 'do6ss3sy8zjnmutei9xqrhk8tt4qjf09p7v84f65eohpsokw96r9sfc8h0pk0mhptkornp3xidbo1vb5yf2194pzcn2kmjqe17ak5mn7zuudod3p2jwo6qts82dmmw04i6ckq0ronlyxmizifkxfux06a6ee4qel',
                flowInterfaceNamespace: '098wwk0vk35d9stpxpgxev2i9ih7j9cnzv03w8txtvxmpmtyvhwl686efym3312hqkln5t3td67kupfz8h40wdno1ycljoicvp704l88s7e6055k5k8jr1dw5daeocqf3j4n20j5jnea1igw85jnkquovrew0dd9',
                version: 'eak11vtdw60hm6xt5hbk',
                adapterType: 'vsm2yiiwfcwp861gi0c8ghfikemhqkaci7cc0x98gk5r441w9291tzfk6uz6',
                direction: 'RECEIVER',
                transportProtocol: 'nfepxhw1ompompmnoorwccfn7lreycva34ezpi1h6jew2046boa53t37cqko',
                messageProtocol: 'dk65fp8jagqtnu32nsg81eqrlga7c93y5s3q2oxpe6y98mrvvk6t7dogsmro',
                adapterEngineName: 'jps9qelruy9nptn8x32zdsgswccupsmy5tv4am9e7f789h61ulagpa20tlci94l4j0cbfhhdpvopdqbhani2naxif7zvp13cb4k9ejo34op4kko652gv632sv25ckyyoh7t3j0nha0y9qbxvnmx18l5v8jazyue4',
                url: 'rkvn7xizeidiwyna274mv9tgatwin79oblf9trd5d4jc77hi4tux9fq2h0uhpaatv6y5uo9xlnct5ys4672254rmy03b6iyhrtpheeq2g25ku119hi5s6s9gem09v3v1e4i829qj4cyt3yf8o46laa5fv5uav4cu316hn3ydq83bi8t88n80p2v1wzetrrleq96bq622m6ysw0staofs8kixcgmlbvalt0s8gxeh4y96xj4jqumd90vp27z87dquywmctuptxt9ysnwhswx1cui9emvrsbtct96tjbzv4cspb1yeyom1vris6cejj3ra',
                username: 'u680j58mzcuzlyvgqn6juxt3qpv4klht5fx0cfqs5re7zz7nfl87hh87lba6',
                remoteHost: '0684c2wkrz70wa964hkrxk7c1pcmn49xkphin19cal7a7k0ezc1n1wymbd5fupa9o4fyc22gp45oh1ltcnta2kzihqfxrspt5tw2rn0uzwp3eo02z5067hg5mlgdf3tjblbfrhqdotxhz4vqqi5of278o4wspqj9',
                remotePort: 1101798436,
                directory: 'bvc58is7sb5lg2y6xaxz14z1ubkmp2mylhg5kw1zmlzi96k0q57858xqrb3kpi1a4y9pjtkeukkvtxvfzjyo2a7le943b68zbzekbcx0ihws6kqatt0v8vpgjbywqpy0fjijkvq5wpugtgdqnutpl94g25bgh7mtudfi9r47d88f3c2591hmfc0phl5hnrhvjbcszvjisg7ky180po1eczzaxryb3t57ddtgiyoc9lk8hg1xc8it6e2zbbbcxg066dye8votzxv9l4lw1jrdwdguyt8fdvbkal1rflvy5bya1ld9pvozmdn3rcvz3td25wamis8x35ie6v2sgblekprb1i0dz87mdy0pwqbowz8glvrli4ta2mda9f5acgbbjbj37n260j8ya1qsgahkjkzji38ftb7aroqnzbkz0klty8cweppo587uc78mor5prro5n5341q6vp2x4agofskuxzi5ysungv6e0p5ib5uiocg365n35b88ratfviw7p0vkfp1lbl055401vhk844e7tszg54qiabzqyu58pyauxbife5vz80of8byhc0xrb27magq4re5v71h9x2pwm75uvv6u445ttv28boa3vgfz2dv478jdxrj4xrx36dppf5x2sj2j215z023rvmztttgqs0tfdtlbwer0ivcn04h3vq13s0y2mx95l9g8pdtzccaxf694lws2m67jnuucr25sa9dum77uunk8rg229ma9i8ua765o5i1284dsz6fb38sid9ehxqcje5s2m7c087lve9zt7tejylwfa40p4t1i7tk6ludzf0valcd9qsectp0uyla48j5vfoqb32t4akj371p9xhtrgvmynq3oj3po40vrp5abb0odzhx1kmha8ntwsbu5v1u97t0q6dpnp944w1ey9384bqqphh1tzbopvx5vhktmtxowh8xpssc9kd4uyjxjltlurncqdlszih213o8vmvsttpowpcdsa9nnorpafantw584b4sdtzc5f',
                fileSchema: 'wgpm01zd6wxjkc9of5qi9y8eglvy47p3hmu10bjekqmlt9ycj0ppp6mtqdg5ojsb1epkjrwn267ywcwujsz2sehl8d8bzexz3nd4ev1dplunq6wyaqwie2kv7gq9qcss0int61oegtmmaur5ivdjiwlz8hda5jx6ggshee6n285oswvc0f8hvx53i75e5pym6dhdxfubr2jr358nlp506rny5nexd4eqpeqhx1f50zzbkyitw557c6g7kuu8oasaq5yojpic3fo12q117qk3vwv8fidgh2g7b7j76uc7gxzj5aa46dfgs2115qnphr7a2l1hky7t30ndmql0xmn9ulhu70myzgxyy45h2urrctpp0zhsyjhgjl7lb39k4wducwrzny7cs76nyywpd88bo8kqhnkh5u2yzayh2ljdnycd6rmmt6qfa4ghjfn8f1dy61ynrsa06eyqkzixm2njr5he9t3c2izzreys63bmj1dldkcnzm062ykd1aii7mcj862s788oyzjqwpj53l6nopuvdgbwfmozu4lsz942tmen4verojgsean3fit4pa9ea58ivie5af6f25et3y5v6dv9x63yqipl1fcxp351f4hp8cb0cs02jcizkyk6ukyoj8jbwhmkkuqyorljimpebzydxtvyucobv3gje02864plxm1qjfhtaq4jakrigvsjkapjc5rw98ek2xm9b23u3wx2ofvib0ibcubpqv0mvegmrk1l9aqzt15yzx4d57knd7zd5mwrfwyvoc43sdxupcypt0dmwx49ruuz82a64y0sbz7j9kdgrpfk3k8qjacw6bjv1k7szlz26gknflwdjcm3h0cvcs83gb9po42ov4ur9e1dwa90pz5ewixp8usu7ao58wimxn1l4cv8bkr2d8l3svzuk85quqsw096zr56cq1s89dkos45qyip1fqx96qro9pyjfjvea35xo6bsgt6dwi3zv5pvdn78bqbo98oyobwwaoyth3cgucbn417y',
                proxyHost: 'hqunhu6wz5frrc90invjs2o37qzz7pacuc1tpytwa0b6g3mlnk50t4keq7c3',
                proxyPort: 5586016491,
                destination: '6qeaokx43lmr1q15nnylayz7cwmqyw5xp6w9unuj6cjao04y5ibuo996qdv54c0xqnf53rxlsdxnc0d15u4ln9223wtj70bq6thkkkp6hhf4n08fabxx25m3lwwsepbl2rvqa1tbmtrhtty8znz4sjfiqgs796to',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ikuk4ac9ermjv3sm383rvhfmuvi1a5g7kb0eyphhtdbcv22ugqru2b983wb3yyxssafp4qa1y2fbb6dof3k1121uo8y3nmphr59n4a4s6j5yd63fzs63xhzygpedqplitqo08zgntgnn3ao7wl2j4dew29ws59ai',
                responsibleUserAccountName: 'toev0zhetrmidn8q7rug',
                lastChangeUserAccount: 't9z59jqscpl3saarbp2u',
                lastChangedAt: '2020-10-14 20:13:40',
                riInterfaceName: 'uwwuwblm6djhxrdh8bfz3xx350tp76dg3vaiykb7quscoqugqjf69979xz3c197g9a5veffsr07ohwsvwv25vb7einkzmc5bh0daxnaj0w0k8zdoapkveqi140yzehazbjnlzqocrhnhabexat2tsprbxeoog77t',
                riInterfaceNamespace: 'sndna4yewm1dw3cxolwvh2e5uhouc9ojijsq3wzrmi3zyt5v7lcypkp13xdyboflbrx3lv0xdgevl1tm81u38z59igpz8xr3rlv83kuuiswjtuifmcu422ioqpoefz8nz1w48ejympig0khgj0g8rucu3l0mnlct',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: '0nxxz9kwhlbmpapyrsrbpsuq230oxqalxjss0sfj',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'j92ulqlovj0rm93fys885a4a5oemsx1sxhqnvlieh62plhq9ke',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'k87sbmfi644ccmc3rlpyk',
                party: 'mmgfsovdqjjiet2pioeg73ercfh5zfqu45n1kgzgg2d8tgvnxq9mwx4dzokxoy7f67v1zd2emkb8qqxbsgqvnktsweyvskcn7u8a3f2a6tjq1bppg0p63soxvh292qjpdq8o2uhvqneolnsxr5fdehwmtlb5852n',
                component: 'mspsfcsb9i37meo2dbxncg81qv18279c1i66gdpklcd2kfxr9t0ljd5t7l44sb6hkaqu86mfm116np44kdb6hv6pxtyx74gmsamf2dc25yxpwp0knv7olg6p8gvw3e4b5snmuhlddkncqwh6ghd7z3p0r1urpngr',
                name: 'tuqmf0ycn0kydzkgfzrc7y7t63s8ax6raz85x9neebg280n51o86bg3ly0i6zw4w182tlyy7j5xb2ms9gm5odp45s17l78ns55tt1rb59h4kf0jqxq9r7eabo0s1ds3d588cu6fqb8vaa6ecchwffhp6mumfhimt',
                flowHash: 'conh3vbswpnniwk1lgpf23tql1yee53v1agbaxp1',
                flowParty: 'm5ndg827x8x9usjs5827pro7dmum1ee32pxff60otog5lg7r5ui4v5rfrnffrr58m3rfnwre6be1ughg4upl6pugepvvzfb250k0zut9ebqitntv7lm4up93g1i76lpfrinm1ale51ot5kb55b0cd32xpk2nknzn',
                flowReceiverParty: '3i83sbhwl8wgrytsxnx4fbfvwwmkqkljknj7unkw3mgiv9whyo7cnnby41ktd13t66e3t9p3hodpw6fkhacoo5h2tbtkzyeq9gcxaadqo2lichonfi4sdjinpc9mll74etuwx7opl3fyvm12d9o4bf8byfn0vg0l',
                flowComponent: '2smu7jn360nndlk0wm5o049bkwfsnqgyo1z2i8st3z1nm4nlsi754vg0cifkg58uush4eltmekmjoayxruc7ovrmcrmp771ao3jf2uzwdrhyf5ypp96fsv2e45oz0m20n60uz5f5b9f5lc9fkkb3sng078zxgcpk',
                flowReceiverComponent: 'z8r4g4sobv54z5eb4e25dnoxx13awkl7d8x7y6zsz1dt4v0ovdw5cxi347pk6oipyacsoy79pwh0u72l3y7zptcihzoalcjfe06q3vyl06rfngbmva6qhfucxsuen5idmm8rns9ux62b6og14rkigyq6ubk1vhq3',
                flowInterfaceName: 'jwsaufvrm4ojc9yxfvuu7d6bju16zojikpw6aamninf0sq7v1qt70s1yud3mxvpf0gg4ii5fc2kvqdgkkw6jsq94yvs198s37w9sv01l8f7xly7tizrshw4t6yaxdfmbuwawfmyh0x6n2baujw038cpf0rvu0he5',
                flowInterfaceNamespace: '39ough2co0erwjv28ds4dajwlq3wir2cn22kqebzjzvv85qbi315kn7cbj1jynui5eg5xebhvhfhtzomknwt0k8jbim6t31441buqijuz4jv227pgewx95ia7j7rfaepce19brk40frtvmmptjciohqfx3ylm1cw',
                version: 'haxoaiqo657p25xiwpn1',
                adapterType: 'nddooeryjds3ssphty30e3vg9qz4drdsqolt3wmofordz2bs2pig524x24rg',
                direction: 'SENDER',
                transportProtocol: 'z08t1ldf564mvowgfwzqf7m32q4v65wlfvxbrnc1bt5709rx05sgfw0gj3do',
                messageProtocol: 'ut2z1b6kk1kwwdimf8v3snr2am4z2ja5qq00z7eh5sxshgwne0l16dxzb3wi',
                adapterEngineName: '3axbcotqcfk0d6js1gcjc8aceqkqkz114upg1qnwyauyqkbmcw3va0inhyngs0imj6hei16h8hpaizsj1nhq54rsg0afcpawwesrj8782gflnv424juh3ua1mxbvurkns66er7fst0htnrr1ownwmdkfzueyz15b',
                url: 'g61keyg96dmjl4rhtp28g37n57v5zygtcwq2hqxm2wlsrykg347xcxp0fm4s742cgs4c9msxo6x8x2jcinlxza0t1mgww2mkdfbkx6weovf1ithskhba9qnlkmwx1ur81dkcz81w8w2rsid0w4sea12m8ioz0c3dqrjhfav1jukd66ap36j8qra62sz018hvflxq64k1ubvr56b9y3vu8d6dcf02qwu9pgv3uiw3w2nwobvymjn0yp7kw1x47t0onna7kjmd92pqcj1baw301xlt1a1q6o8ruzbqda9wa1dlfbaqvc516ibvaxll91mj',
                username: '9m2r5w6uk7a35zupwno4vs63zael3ates1cqaqkogodhwitts23855uit89b',
                remoteHost: 'w78k8vkb5qpo12ne9j5f7gf2q17sbk3kq8t03lr1jf83oakk11kh2wpxpns6dksmlatqdtd0phbaoa7inmb3n3x2uh1v9td527a27mwnojgnht8zkla3m94ahvjl6b8nvmbotsf0e1d73pwvx3u4wbea4p6min7f',
                remotePort: 2458376391,
                directory: '520kv8dhxwmxuv128181z6ydwp2i66e831a7net4vxkh8vrff38ixo6v1bnlfy6og8rhxigxx3w2g6s4o1iyfphdjwunoot85zq6ghasz76y6gmqv8ex5gw3q25esmcq9bvv0dq16okjgrstmusc7k7any75kmuqrta5hh3or58qlmrdb9uj6vqvncagyu2b8xmfnn80j1g4uuprlxwgreaa5yjagqa8bj18gidw0rodpzhz6oh8wmbv6y8mxowh7tn96ssfke90624zsoy4mc3ilwfayr9zbz6oa10k1abm3brpl5larrqg38hvxnjjmadsipiexgvmlnnmxioaekvkt49sqrlarbue2dea74bx1qwvpzyyt0jb736ifingn8542fdgqbqmp1riol2rpnwhazav8w8vvo72lq889uj717c4o9k4eb4p67cgom0r15cf0npcdd6ybanohv5re6q3z06v43ce5zh6nnrxr84jy79gb3ls0bn5ca8jv19mcpeq9zff8yvot8effvo6t5538qrvb478fyuxybp91bbuamsdm9jsmh7phzvbsts79rs98hrsalbz725bve9in6ed9d4r0t6eszxg6dzogdri0061pv94iyjcr90wo186vg0j2sv7ku4au92nxm66wcckbuora55zglm1piegcbcipt32f4yz904rg42ttsr4x3m3441tudizatkfuiyah7v3hyw8dqofga49ig1v66k7kpzetx919dsfz6q0xgd9y7qr13f22ikax6i7wlm6rkypjej3xvan7ornrua72vyxkdelik9uz5z9jcsubwt4fct8krxut2a42t8i7twxjk2c5s2u4cwzvn5h4lzevjnf66qpiqotcb70wwgh4w71q2ud16pg9jzz3moywxi8ukpcaexdyivahxp0nraa5fdykxan7npr7dlk6cv8uhgil4gzjbsahlcm7fckin3hpcx3cwbyldvp0vqyj3ebkyunq43bgp0yui6xgqglgcpj',
                fileSchema: 'stxedi4b7xlz1icpeec1t9c1dcfvhayc22hbzhgbffhekbf6md1kor1tjbalox5jqqwwylqek8thipef04wkdi1e7hacbl4rkmyti4mhjysie5wn2kbbgtyj86kse26f7k66zhqhoi5qlet7dqy8hyfyagqwf2i2d7tmqzpwru03ejpc2zfyc4ca2lkxpoh3g4o92irwpn2ty5zz8suhljaml6s4t9saipqcz1130s5ao3kfs9abo9wdie31sg9la97hqm4k2dfuem3lj3y8pz6o0ku6pisghvzf910prrsaecr8kuvndtylsbzb3pk7sscyywumhzo59zx02ky8nmhzywu75d86fu6hny14j10jick1i8c5w3apy70wkoige426k80nwknu3p2moivxe8jl6ecu6yn0lc5vvg7w21kvepgnj4jixqtbliwn8c8khzpqtjh8omqday3efz6w6ak4ffa2qrdq841mgidv3qjljkdag9v384d8xjti1uh3xzau9m245twp6xz5tj63vr2cbstrb2pwuzmufdkf8ug2t27gg9yfq8u5nflhm27tys2d851ixbnl2hppllpm7592wznpnrwc91m4l4xudygpk72ex89ljushia70u1cp6kkeyco8oky85167msyimhw5dlpjnrvc5yt9ba3qkyd0npo8pthnfvm4gy0oghftwsews0wtptp8bptcpo85eq7m0fbj1g461u9qrtjeaiceyha7w686bvfl20o352esvl41k0scoebrq10dugtql77axl0cw8u0yov3invgiz9z0d4zmu8d1wmp4jfj22hgca7avy30jtd7hk1d74hn191hg8ip73ofzs3ax9k5jzrd8hw5dsowr3yvzm81sr0m9i1tyq1qqay9qye01i9iuwkoiai1mjphjl0riy4eebget5qym61cyd1ltfkt77snhwh9cijbpydrvk5hs2orc5skc9j4qy46y445enyd1381u8lhstmwo5csr5ld5nld',
                proxyHost: 'd1g9qohlehrpxzq4nek90xogzuril9qz5uvw9ihws8gkflosw1m8n6fmt899',
                proxyPort: 1357566830,
                destination: 'jy1mmcqa1fjrzp8o5shjro5a7p5br5vq3lqxl8q0askpafi453igq67hnxy1hp32dpksldwx63rrmq3wjsz8yahdjk5aiqpm886qlgytrspym6pkoagauqf1vkjqd4s27dg16xkm0vpsmx5jdz7wwkhdc2tiljqp',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '1sgjgpeemafzcr9vgrjph1hd44vea3yjk4c5khfs0246bebqho00sma93xu1iyzuqrwm90nfmc4kcw8kaz325oolyqjebx554sw31z2ldxra7qu1i8dhbq31zouj42843jxupwjn3xtqigdp4ed58107t90fceah',
                responsibleUserAccountName: '74g1tc2x898s7qu3frt2',
                lastChangeUserAccount: 'b9gje59l8stj1x45kcd6',
                lastChangedAt: '2020-10-14 04:43:37',
                riInterfaceName: 'dbewgaschy2xdesqev6js51o927ji2hazayuo0wjnj16i5hfixwy7gq8j4fzuxdiq5zgmvazivvtnxfzpwf9af1wmwb1342z63kjq1e7ifoc503wzf2fo45oaiyca59v0c5tyfqtfym3gghghn3lfoqt6zxl8n6a',
                riInterfaceNamespace: '3ls5y8f8icsh3ucr5mrxneifiabt8xcrmmey0cd7yd69wmc19ehhkm69m6clbvac335r0hek7zoxjjs46d9xmzw3n5txv40f42f9ksjluuw6ay5f6t2m209za9qst6zc6dnheidoa33lkle5yyc9xlw1qbhy90dg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'iw3ap8a4cp1nsb8dsvfi5tyh8gxx4x8sbddl2re0',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'cgdez9zgqaxd1psptqn88qnnwu3nx8jpht8kl682fzo0dez7ab',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'kpa7xfnfw9ng0udyg8lv',
                party: 'y1t340q49r0swhomqucxyiou2bqlb4atfuauf4hla0ftab0iuq0rzxu9wsp9yj75e8gcovttx2tm5ed3sjg7my9bok6hlu9jvq2wbhlqmc9d5hng1cqk9dx9nqc92iaw235f6ggdr8nuvpj5ff21fmgn23m97juw0',
                component: 'b2wdt49s6o3f6n7iin81ddihfex53p14iprzd8znuthuvdr8t7exy3f4azzuj7l2o93pj529jr3rj5olmbni0tc8m0o6tjfvg2r93kvfkex06gus1o5nnapgcexm25fqv994rg2vtiipqbui74xac0xwol3yvt9t',
                name: '5nfnuipqk73yev0f1h6vlotx6e714qhhgkjt8l18r90hmtc96f3pdyphqim9a0ikyrklgvjemowaji78xacoo18ps76vd173ebodfpwv2d1b2stzn2xcenouswruq88wdofde7bo8r7pu6h098tos0m9caj3j7fb',
                flowHash: '8tdgbdngl0e23k7lel8apqb5kypvr3not60nuf5a',
                flowParty: 'kie3sz4kk74a65728lbkscnyvtfnu5pf7twqqnaoa2lcrs3980i9dzau1db65mlonrs8t3v91m1o0dlx39p2olv60s8ug2jdwvfmy2ihtgfas1j8as7lnrv796n0m8l727blp2xdfgld0lujw1jrem34boot7i1i',
                flowReceiverParty: 'r1hncyie917sxv14vneqdxoaauj4sjizdfkww3mov3js1379lcei9w867h3wnvxowc73fuetua9vbzj2uu9991n10utemavg0k146i8p8bdow9ykgq7a4xf2ro2xoouzx4ygskiohioozzvnxe6ut181twanf4y9',
                flowComponent: 'f1ytjh8yrqj7g9olcsj8smcsr4ecrjdtumteokk5zdke74oamrztf4mik08zk2w8nrmi7d5z2qrudnpojix4hhe5yi9ztp3chubxrsm3o72w5bvp31k96hy7mrtvqbutn2igbkl81p3gunrahip1oilmirhaspkt',
                flowReceiverComponent: '8zfg2ymd62q0fw42w3dj3if3fm5yl9xpzuxmcgfgi881tdtjd33qjmgqnhe06ak3jbpxrex9w5288rkmdpejpy78k8dzs1ij9ehnga2osclwnusbepchlncd0vgnxlid0flkaheover8nw9lw0ygq6aphyp4h32t',
                flowInterfaceName: '8txnsnytxzuvf5c5fdjucxqag9r1fmqcu0ld1wlcgykt56x1q0ufapwjws1gweej6i1zai5a5kzp0zpteauy5s1n845pix8eg3qozx9mef6q90wi0k9d4jpzq9zf5da7z00vg34fp9wgizkef5bt7dndmgjwshie',
                flowInterfaceNamespace: 'jqgqc40junf4mjg0be98ouq09mi8t68nadittgg1yghk78hxmru5qys874kbv6vse62n84owq4rrjta44wpqiwtud42p98nhokcm0fqyhftowm65lgkxwkj3cgzze6ek5pm05m9qz6zrss9kdrlkord9cthn8bwt',
                version: 'r5l369sw3qnvabi9ro5y',
                adapterType: 'lrkwbo95sezv3u6r04zn47nmbse0kzbhgdzd77vdfsa884gc9r0gpka2axl4',
                direction: 'RECEIVER',
                transportProtocol: 'ntj5mk0xqos9rsdhpca0cv5u59owieca1gw9ylzd0uspx8ra0n3i0bxebas7',
                messageProtocol: 'mvh544p6axgtk0h2eklks5minmluh9wfqj5a01tng0b2qam0g1lzioi66hmw',
                adapterEngineName: 'xdnfp06h4wl6zia163o2gysu9iuaju8x4ubuuezy4pv7p6srsnp8vimgq8vb03ff3l33akb7y8iiukdr7xxt7p6hs8n0w8v0h4y027dc776twz9rjdp71dp1v7ohp8zubv36icxd1w5xlysrdlrfad1f8fgogffz',
                url: 'qusit2it63cyuri73jhvjocnjjz6pfd64pajihh0qzdkrqlumt1klkmkrahij4ubkly7bgihbbwerypxazzh0ef8v82uxntx1mfe9xblw52277d34bgblwio64e8kxd6g3p88338sdvcvqiqqc5vnvthhqo3jsq9yihfu5c5clgu2o5lmnw6cywmz0meottmch369bpl9rbnu3vqjqch5wphz7a53yqp4dmefus7cwmb8kdwh2otuzhw3mpmu0totj9xl8quciwuxrxhab8vj8s0s392y9w79h685k8hrol9mb894ohgjt2l6k232yc0',
                username: 'fqrrxulsl1ibdu6x2p761wxa6xn5aoijxth3n48onfmwpdi1lb2xumezpw8b',
                remoteHost: 'p20engpe66n4qt5osjmh9jbhnx2k21wjvnmviibes9jemdyfthxeahsj1i4t1v5xgzwspvmt7zhkenftft4hnswvcca6a2260jftuc4slo3rhrvisko6n88zzu7y5btvxvtkp0bxrniy7td8djuy171tpr9aktgy',
                remotePort: 9331910780,
                directory: 'fmvugd0w3ydegqk06tumqj28ouldytrys2nq1d4bpg9u9axnp9ojlv28pgpf0hjnz1qtd4yzr3emqv7rfv9a5k3wt93pqwmclse9iqddu6nohafgyk5tgexl86ah3mo9z3aec71p9l2fxednhd6cap1zah68qvnbk4kedf9yaub09hrszv4i46myruiictjix81mm5y1fy721kjjpjnk026qrk2knndaoyszoffadqbs4x1x58wv0au6rnw18opa44wziwgk99u5m6cozb9uhne8xfstsxrmnkujjmhieqmu76er4qezyn8qo7uwmsvs7lqk0v4ovqxvy8ancbfh1oo0r9pix21nhyf6aznjztw29pmdoa388lyz35jz67pzzqahw7judjonmhayig1lo7l9orvl2qbybkpkcxiia88c9khwdas9x4g46m2f0sjzka8zpst7w16lotgrbyiq3lf5yv1fm5al83n82e4h707i75zdr0kmv494ul50kdpr96alwppj7657t3p7nhnc8k46lh04qkkp3ho3fewo0o2krw337uw743a1umo195z38ufgwjha17awmyv9fxwltuf63e4188kcfyk3k7j6wllj9ik4o39jzeziyp81mf7zpzfgvx4ad404hwllk238eqharhyg2xxsctdgexcci92q3kvus7v0sr6oiq5yn1h8tng7qism35z1qy2m3fgy2rd3nzy12sypinj81e1a41b35tyhrtee23eqkrz3mpvo0k62hvo9m94wllhkq11jcr3qrap6cy1s1cwljt0egx7il8brugw5gfqy7djeu37iai88zprpykh9piagv0h747b7j6ft90pylo8od8gb05o3bmnmr3udfh9dj2wxhp11sfrdqol5qtgfnht2t0stgntxp8oi2rn7orjhxhz05szhxemj76vxjgk1xye7p5fiuezifs0ts9emem7hdjqe2gg3ejq5h1telzullfn70z40q0gp4emfryhr3m54fgve',
                fileSchema: 'z7u8i70fov3wudbrm7uuta5wdjqzo43sfwlsyfahw8kro7osz04h645hu1jme8wih90942say0jc60ttu03u291zpqygptn9flh8yiz9ybu797bjsu807x5x9ewxsfc3hvh1acrd3ionp9goa3ewf2ybfum17lctorhhtuodalsqfjufjxe8qe43f91k204k3nwoncrnxfr0kso4vs9shm7j84ejxksb30ytw69ir9xc5zrrvjrk44shoh6in404gri5ouqf5mtkgmzzt3v5v4gd2sm46filwvjp09hhckz4nkt7d09bin5ue4zlkvzzkujbcp8paphvg2ivmleykqqhkzwohy3j5wseihuxcdhha7efs372kiudbhqr233dri9bprnbuu2srzb3c22myz4zyv6sjd4e2lixb4qsds7lwf5pdi9b1v1gd1kf76ygrsfqlpuvae5l917uq7onxjg6wssd98jc08l7dg0qwzmd28cmvw68og5hmfm4jtwfxf8nv5z57mukdqzimj5mkpppv9zcrue3kvxdseydx0xfnjace882fhnyizba580n9laxh48wckelqiyoopuyp83cjd6enrn7xuahtg1j4yo8ufg3cmstqxcztb05iwvubrc55b53qjyd7bf6v8pq65qybhpr95h69muobsfs3ir8ib8xdptk0gpwh51w2pirq9n1cvkp13yx9l1e7r7j7vveq5ex7rzi8vh9kf7y1v0om7nxk6rj0mgbqqymt8ncuncor0c7gadnwmpz23uymk5qqgcg1crv8f67nqeg6fdzctwlkru0xbkiurmmjazd2k0lpk0lfapujy876ezqtju3q8mbpenfh1tmc0b2u7gr920gnxvxk4gn9p1tbrg0vjx2fkmrz87or1nynicq985y9v0zaxhn6zfazlns2q2a8z111ys2h9ftny6ngzfucrgc801dwbafoa79shv4smd284pd2es8papwmw8rkuktul01tmqvvngby8jmonnq',
                proxyHost: 'v5rxlkold3bxfhgxzewotxhi0a3k0zi5eu9v6oifdlglxifo96bnh9o9vf2s',
                proxyPort: 1642811778,
                destination: '7qo9u1p3ce8cwt8zdu8hmpfq1gp6p8bea49u2rsuo1axjkqzjjd2ltbrat55y3t0y3dent6ws77a60zlul3h8jnaca6aeywkmuitixs38qj6visinc6t8ch9q5lbd3vq9xe6ns3djc49udy1btmt3xqpj1v4zluq',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '2vx0ng76dci8ae2g5255pb4dh9qkbmoz4pntziel8zoayjk4qszly7mmb0cik6crjgccleung5tnk1dr3cd9hai7nnsa6p2ouaja47b566gq0o78pug8c3jitv3dh6el1qi43q1s2par0lo84m9h5u927d1uvxpc',
                responsibleUserAccountName: 'lfv27sdh1f92qgh3sk45',
                lastChangeUserAccount: 'nzbxq7i5jkrlsye8hjdo',
                lastChangedAt: '2020-10-14 18:42:16',
                riInterfaceName: 'tvuqzhjiubzmphlzjlujum2zn14f01itdmff0m5xmwke85f25osofxpr31hgy9ebua3viiku7g4j6p2ljmbb1ylevyjgpnoix8de66168kfjvh16e2acoqe0xolx1kydwajqu5gl8lays4a22ih3a75ttx4aorec',
                riInterfaceNamespace: '7ssteqzo87x7u1ipa2s2bcddsxyhuyejomz1v3n5hsbg1i90x25pi21zqtv4s80t54i5v0togbuirknp4jgj49w9ljqb9d0azcy2jdqlcf2wuewh3om0fcgup24wommdvg53qp5w8ehda8bxx595sa1k0ahfbu6y',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'ppvy3hn9gm28j3jj1w652ii700r4wp29mgolq2cm',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'nmxwoarxbdbfjda0lo74znynwbcq2nefz65njkh6a0dqpfn690',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'xer7vm4vcp6lr31cf62m',
                party: '3qxjbashuo0w5ma17dbvlks5ydjm5c2qz68kw57fpaykd45y95v3qyzsk7ils6iv2jzbmm51e1v0o8kniognvbzk9qcvrxgod3j0sxakwzjxlb43wdsiauvzdcit4999e6j2tg07miibld4yvfudjpeuazgj185c',
                component: '1rs593zhr0cimgzjfys6m1fmlz7i2jz0nc7hnd1g96otgz7e8f0xhp6crxqpxc6kg7m8jkj8sa5dccerafg2bozieb8ex038gnbdvjw0bcdnozil92055dt83fblmuq6ty01kiz5nj2oct703kj6cn7w08ry4kl70',
                name: 'ttm0m3zcvlir9o2vd2z6aafqjue8t5yfp2o944ve8dv13y4bb4hhgg3sn7c2r9xy1ah6n6bstwltuh8x309ezchtva67hg3gh9ioo8fkzq6ncq1d015hedtdf489juujv7nh3bmuf5naxmu1gm8lo228r642iq8p',
                flowHash: '7m4jowhec8k0v12okh15i7jwcvhd04n27yufqwnz',
                flowParty: '4ox1zrvb3b1cmwgvnp2n0j8yb3qj3thtfvthqj9uhkd5cj0t4n96hforybzcv1fkv916usdn2szhfrnfc2d04qvkll3k5u55zkezq8fmi7zxbe5gt27wa5x9dikibcujrywkdb08a6roxekjolbvq0jiqkuim2zu',
                flowReceiverParty: 'se8bxaywde4enqwtml5352pmctlb83f93ml275mqek9hol8a9l0ewsn3njjauj8fzh2xecobpgeifxhskpuu5plj5vw4opzqpfqhmxjuwjncna1lc8wx01p5831wgchicwnxnm4w14chpcql8roh5ylvvdakrscb',
                flowComponent: 'bktyabzpjrl1p690o7kxdmvs6otzhct7ng8kp5bayc4eysr40327huc636deyem688p36g5rwpatfqfra9sqqd3uuda0djluct4w2csz9u40bxylckrcpxs36mzbzof87okf9j1ojmlc0sos392f80bg8izl7ff0',
                flowReceiverComponent: 'cxuk1phtdt5zzcsowwplf3pwc5dmygsqfzq8lqc6vlivsngyyf06s2rrm3bu2xmacbb5vpoytc1jnrs3tfrdsfzqkfyn9fnozvqmua6hjh7qvx7jvilyi55shysdbkgg5agc6wtpb65d8n22kydzycn7xm24bhyf',
                flowInterfaceName: 's8ayxet53rhe2kfyhv4te6a1g6e061dgund1x3we7wpcm9idnqxpxlcfkhthgdxzete0j8xeof82t3ubiwfi243xat0t5ke95guhca4vgv3g1xj5d564rffjeucvifb6cdssb9rf0cvljdox92s4ag3l0n63t9pu',
                flowInterfaceNamespace: 'jrthk6gfvtf6aidbbi52e7icow1kx68atylvmocss1nb6nbtqtiwnz0s4b2vtrzzibbnhr01m9bevxyc6qh41k9n2kx0juttjgrjj6hgq8if24b972hcs2unh3mfnxlp17wohzcbnjvyhxu2jt19b8ebe4ga1it4',
                version: 'i4ysnljf2ygkg6kdv1zb',
                adapterType: 'v5u0mu2qh35smiegxxe8777vag12n0b0d34966x0u6ln62shu3m9xzx80t1o',
                direction: 'SENDER',
                transportProtocol: '1wford4q1gp045fhmrcd3kpa5jtqdwadn4kzpc1g7f20u0amzvrmh7i5teui',
                messageProtocol: 'adseyufe822nsoe99wr7ss80ypl5eoi8gdw12fieja1hv1tz2gx6ik15gy7o',
                adapterEngineName: 'qxmxdftjvdg3k47s9hnex0dltd2ddncd6q1cbsy4k71wfvxat8e3qc36itlblw3a8vlshqft1bp68a85ez3uts262tj2ubnr1dlgfxokgqm9kmiq5g4qfufj4jpp3kiek5lzpvwtbm2rr6uzpwx5v3d8k4dw9184',
                url: 'wyjye34uei27jfbnfmcilr6ghz1jiude9g8v4az7lmabjoj2jrmqty5pl1nuos03h17inaptp0awcjcjzk8fa3sremc2cws07wfc8bp5hkb3krgxy50bobymibnjhe2w9x90obg0r12de0mr8h3lked6lntsdt3e1l6vc3oa74zwb5gggzrhz124cdpul8kels2z0wciylsm8nkwx59ct3g06ardmiz94p1d7vipa23an68hw1nf90m9dmyvxhnlwus7abhn2rl9t9cc0obthb64zuqwzt07pb3y2j8mejtqjbz4o6jizmpdy11w25uj',
                username: 'vlkio80bjzgjo6lc9i8c2xtqnhamio0w27oybqe78rur1yrjlnxh7ni0c68h',
                remoteHost: '9xu9ql09xbn76rcly6bvp0x9zmm1logw52zpia628o2y58qr1vbwizm54ex83qc8oqpuoos58gyc49n2wdf2xodtmvfvjrblxp8gl7e5g8od4u3qh9glotib6v9t3j0pmsh45yvfldqiococi5s7daosdzv2ipsn',
                remotePort: 5076323984,
                directory: '9vxu5h5thx7l3enn0z3jypucbyf9tpvamxlhw3jvppqcizhx07ubc70bak2kw7zp0vi0a7y0tdik260xowf39qgna0mlw2l4xhz9f3zmqfwwfbn2p1b6w48lqvvbb0iv22lqo5ztl1g80g0lgxnutypg959bild1bnphd6nnpn49nz46usc5z9i01wpuzu4wr1qyp7wrcj0uzbs1z68ytw355eiiheeun3nknula27x54l506yh8ou3ymomem9ot52ulm3oql9rgwfxungesqfsbp8exqaoteczqbamxg1f8e5u6gaibss4bwu2pyogxv4nepgnkqovi4og0g2x6rr2w5457p6o2smvbyzwbalfuyz0fwrbufmad8jcc18thsmqp2x8d4poplp41l8jhpuvvycgsdquqpt7p3uc1cdvqpgublt1yjshch3gpxhvtih2qwq9wcz14a2wbdqqfpnx3wrdmeylbk1ms9daq0ql3vfn9yahyp0o07spmwse2lcxxsrytxlzuhq6172phdx9rw09fprsvi7o9auiapczpslh96idsteeo26i58kmedz6v30v3h91s6w21v180vfhzo0fiacpohmt7xtu0zcf1lutrnx0sd1xuo9vm3iocgx2tmlgnd5o35ff6of5u6w581yu0ysmixfdt2uv175stdtsmhqc1wthc7s697et42vwzx95n8hw69ma55ofsbh25w0kzp9zrdl4a8tf964mp4y7k108xuu5sxk3gffgukhesscbtuy3a8fj7xjigjyl4gz1zy26fsrygk5vqpe3blrg4tbt8wakziwk2ae1y1a7s509v8qa84rzz94pq4aqw41grzs8cf7a0xrmhtuod0719ywrelr4dvb8j93k4vko6m16bcjsqd0qwgpn5xei8wt8mx6kw4inxau5n4xjn2gj9cwzqage8kmmlo3dg259wnm9crvtzhps8oentif1y16maouh6q2udc0o6xwa15mkj14j7vvrjfzdh0hit',
                fileSchema: '47b26719cvd1kc33i7sbdvrwmw6hxw0dk7wwdhdtho4rpmalr3w4a5icfryj7zkg44drz3jqxuplona92lo7oswijqod0951y8sg9keq83aqai8dokhdwf4sdu9j4kgbv9qj6dwd8744roav4mmyglwxizsav5soyvsy43qqt5errf8sg6n4jmralsr9n4cupzjz7e0i79lclu0o5lbkqwc0jdzqhufjfn3qxocb97a6c3pj829p4f71oymaks38sq4i62hhon69dhtg5oyb0qaqkgfjdufez9oyng779hxlbzfo4rf5m5nxtfw8ldrbgfjo0xs4drjhwebtzk6zhw006rexrantfiyfy6ma9jhpyui113ov3mxoilq14b04gcjsc7sbkf5i4ptpkbc5pwrqa4brj5ndof8onjrkbcckrelssmgmex3odc23bwrk1376sp0zpgo21az44elr6y04jdmkchai141n3s2n1zc1kg1jurekumeoeg4yr1tu9qsllsutsu2bkmkkv2er3zji2iv3z3hf6j3kbu7nxx9c4u1tys2n5cy5npq3g4de5kswohl6o5d46z0rg53fbtk9wkbpgic5pe5s0lg37i2z9fu7c6hu0q76ig2nxbd5jldpsbt80bbkzygxu6rmmg3iyj2zgrm1zmfureykaaj3fgmaqjkx91v7ua1a2qo79ch85af74hh4nfxj3m3pjvu1qiogmah8hdhodvgogu5nrz9vgv5b6o4embdynx8ozfsokueqkjf9cp3ctsax6lytqw0hi05tun0ot8etoz2j4eyrn8vdy04jd29qwix70xwzjvc7zniw1lvvz260k130gcnzukmu5m2pj7fdui2asbl5kwhef1obbwvu6xty0h9o96rmczj3ejvtbzegcyw0yd7g018g4nehlfgrngdzsmn4ybf7dmfk81vr4ldogasvjoj9vi9w8z0ql4kl3xr3ig3ul4m5fydvs6zn4q8i7ohj8veodip8xnffppr3',
                proxyHost: 'ocnj0l6vajepoy7oeo01q35m8xwupa7gtfaokzyjd9fj1bknwqw08wzal927',
                proxyPort: 4725343038,
                destination: '3tjgximbxinb32c4kdh0421o8j9f5pg3bf1woeoj0crx12ez03oz00r4t8actpfrbhjz80s8foadtzag3pk82yd211r2gvw8lauzwbi01g43ptaeskr1xyh71ls6p3wnjpgi1kdhfrn6nn4yt6vtw1yszs60h1lz',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'iuy3i9f69mljhrppi6gqood0j7eoua8ip3wun1llpjgvn6u7hn81p7ai8rfe0ncpvhwxazff6ilqpl5up09au0fg47slivlsf021ftyphnldehqcxj6fqy5rj5jkjuw2kjrmlpdgj59x5e702knxo1o5vk8d721q',
                responsibleUserAccountName: 'ymrw67kchmvsa1c43afy',
                lastChangeUserAccount: 'w6065472yvt5gwe5ce1l',
                lastChangedAt: '2020-10-14 07:04:20',
                riInterfaceName: 'a3w702uohm8be89hixdellgfzvoynu6uuise9gp44st6eu1j5h2h3z9atr21p5livjdepyillgc7k0vkz6xsysv2bydq5u6yilhewefvk7zlqd11g9ebjlsmtcrui1w62k4axf79itel96k1qo5lxlkctjw8kg60',
                riInterfaceNamespace: 'uesbjm8s0y5rf76mrjo5e0agcrad2otszhekyhyd6n48c91svbq5wb5d3qlb9n3nwkthyi9g0mqcjf5wnojc8lliegx8j4g6erc97twnoegikts6kqti71z0d8dipt5f0m8jwc29p9vjug5ibc6btz1vgcw3w269',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'b97nlbk1fe9hb452umswwxkqs6fjcvgd4jgubu8j',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'vyry872a1jouz7bob746t6s2rrtaiac0r068zvnpiv17v01hgb',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'fpw378h0np2cfcn09sko',
                party: 'n60gty34e589lxxlp6exeq8rbczg1s1t7zywxoj7zqbft4i8jh0lsm6l5tqnrisqg3hnet0c6zbn60384exmssscanc7586n4xhy3s718i5qy42dhapwxn4mb52e790qoqkxujzmn01z25ks37p3xm41lr2gagg6',
                component: 'fjbcwvb3vt3wknhmh8jthhl37rrjptvf38bxgy1kszny3ob16ol72qwkrjyxdwdtxox6eihei9hv93o79m6pqn1yjnc5qccwcvo5gsftrt29wyhq7zfkmoc2mbx6zbympt2mafrs5kk1q773axurdasunzxgy466',
                name: 'u4oelcle992fc9u1w5hpwqv3etjl9tfc2vcmnld4yhphdnry1zz4ygx6qmtsrjdcxv7hbhx67xiv5k2mlop5bhsq3m1rqi9ujmyf9g1gahv49m7ks7r93mkoy36aoepha5788ams7x52ljtihzxqo2u51c7kgasqt',
                flowHash: 'ldue0zjer68henueem9rl7lo5j82atpsa3vu6sf7',
                flowParty: 'ouh38ygpmd166e8561rigzr2xrqww19jwysroso53tu5sp6d7zdqq9gjrp97zfc84zj7cs1m89pxg7io8zervvwb3lbt2roceunzhks8ay55gd0gzk78fxrlitb6mmz6t1j5unjatzs8dyheynwu18fecmm1sozo',
                flowReceiverParty: 'oz83auvc1z89jsungapaax7ns06ghp2xlrq9qit1bkfq1n6xu60sowdx4tzg88den5dhf745a6u9brzo1vpn1rkpjq9kzpqvpby20t3kju4v86f796nr4u19vhs9zlf1prq6tsrm9nwio9ly6344hcgyehn1ly39',
                flowComponent: 'hlbopnm9zgd16t6jitu85oumlxc1a79ercsgsfqxtl8vk556dlmvuutrn8jon0wycpytr9qgx5eagjwg2olo68glpnoscfx0n0xlydihycm479a3g2agj2nqtzzhr85mier5df4cj0aes5ehdcdx7xydiknfngy0',
                flowReceiverComponent: 'k38fbl3g104dfk8xzzct5fgd266d0mrnr95omde7w63xwfspgxvew872g2a8kduhrpm8g89oxwro7pneuy4sc3w5epwljfhly8g1jzesg2qonik8z5vb19e6h88nygphi54qg5euxbj9ukr119jr9wy81i31jbw7',
                flowInterfaceName: 'qmopiafhepjt0j9q5xs1onrmiv0v0ot00upx763xi6odojvqk7mhn9gac95r1nq8lwxretvatdg6k0an8isqf6ftrbsonsqm42cplyldhzwota0d1p72oxmy7qhxkc9dciy0sutn08hzuy5q136dvt41rw1zmd78',
                flowInterfaceNamespace: 'hihlx1oa9wpr6neio3rn2xeyhf8pq8s8wqz2rz88hu48qq8o2cl6f25e2e1y0tza7z5q7jk2jxdelel09tz6vzs65n4j9aecala5bkh2uirgxie4h2v0rcxbkhtwkqq3u2f2xwd1ru0muljvejlexnito5jx8xe4',
                version: 'zbuf1nqsjfy52erx9rbh',
                adapterType: 'hwbe7dwxx1er7pepf9oa7njj5uzark7sfw7kyarqozqfvsvqa9k0ovnr9lle',
                direction: 'SENDER',
                transportProtocol: 'ibcuitauq924gysvu5hm4g47xpx8rpgdz2stujhut9paa0dq2tb4fbk5lxau',
                messageProtocol: 'i2lfqznul55dv0gn3ip2iv4c1yi1xcozqzab9dxce1inrr9a2bun88b6sg0s',
                adapterEngineName: 'ifuenyjn8cpcqtryxu6eor7239g08qem5y8look8j29pi5zo6hlf0qtk4xy8iwsrbtu3q3qd4468f9osgngq64oam91g9tmit9sqhlxip9guusv4a2min7u3cwy18jz9ncf44cenzdtpw9yax1vbblwrx8t5cj4l',
                url: 'fpiomlmynphb9toxv2rupp4n0ppw9qwxkg46cbox5hwhs5v4bmhi2jce3stgpn8hefahlsalp75ow7y91idnot29rn2a6pdrxa8tdibyfhmuj7ugruaqdn1hd7mkyzvmn2nu6pdbz5yoe5ivz9osyjaa99ajmb99g3jq9mmzqs0oaeizd3l6hszxcxy4kkp4tzuh1ko03kbnwlhp4nijun4x94ajwurcm95wohykitun0dem56y2e49q2d6dmwslplxb4eu34feykm2p3e56q2xmn2mi6w3roiogq1buzy539hn3nm3lmbmw17lp7e1d',
                username: 'i9hpx986khsbp2uf3c65jd6sobv0mihlg4qbxd72keyhafpjwhmrt6crq45z',
                remoteHost: '81o8l0dgdf6te2umsgcg2893vzp4x29gfd4n6d6s0hco7u87qeceuw02y1u7lwq2jr78icywoqcj11y9ntszk5e2d71xaqki43pmkak1s1eyfm3oi5r0frfmrdeaehg9f86d85uzpc7dm6iouwj51prh26y5ft72',
                remotePort: 7155110664,
                directory: '1uhrkbbaq132lch8uk8osixl594xkpytj7lpebll90g8kvk50s15slbfnasb3vg7hdmlp8n32t3c7cln1if75x5x8sjtdyfpdny3emlo7a15tr66e4y6a3awhbff8zi9e9c7un75dpnxbe38atl3d4q46y4nul5u3u5pcwshf596f1ln230n9oeys54g4blnvg2z9q6wfddenz1datik04wabd7rq549q07t83plgfyu50sd92yykr0h05amuxkr4hz3bwh0760ze7234v4hgx50twpq1shzckbvulp1mv2kjtu7f1r8qki4y6m9872h3ypmp20cc252zmjzfl3i4qrlogzcini76eqnz1hqd9i5hueb9rewzxdrvqwbr352ye4jypktorv4vafr8ae0mu9lrdj77h09p59t8k6fp2fdpoglzpqqboxi54eole3qp1tbuvo46zagl2efrmaq7bjyjmv4hee3pc3wvjzirq0q95dgbz3bdhkw28lbbui34l0d6ixyc098a2a4e1p6tq9yp5oxnuxjs8x1tc0z2mco6fbrdfr4eu58lj5kklichc2btnc0xkor7kdf3mstuvxlbzbbz8hl0p5zbo1wxnp2yt43dj2ddvmxa9ca9qd0f8jbg0dytrftegw886vkmrvr4uuu6opb9wyfr1ng43dvmdifv9oe3xmoth76s2ederi85eemmu0mulxq5pi40ze1illykb863nqbosypuv0cr4t6c0gol2jlfqbtkvf0kpp7xdazek8mdxthquty04i9gaj9iyzsrr83gfy91tvonye3rzxg6nz0hn046meq3jxn6zdm4vjnbngt257u8oto8kwn7mypxbmzdqxwnbktg0d6d3d9he0wofnd56eh18t0hpcdmnatumo8q8qydg76ps6767jky9qljuicb7pkefzgkdjr60j3zzo5nt6n41n3iu034m16hyvcwsdvr323sxval10erckbern4dl2p2jukhw2a29v9zk58z514',
                fileSchema: 'r2hz36jgj3k22n143g2sd0qmtimhu2oj8erqwsh59xi2c2dgm9fwzcp2w7mele4u13avtmfwxo6sp42csmgkg5err5nnwrgf9ob3odrzdob4of4pvz4bdivz2q5fl14x7q5jjznumfr6ehjo4r81n69n7zrszlvqk84ju88c6eykm3554kfvb3mfxrrta6teafyjr40ahculgs2x7vsac0rbqjsc0tco2hdg8rb1asy33afuogx5r0tg9ayfm373rkyhvo0ygmpl4xfdozhay9stdrgv2qj26uf2r2d2soz1iawns0gcz5ivz127jurib8y31n9ri9np1wxklk1q7f347iyg4smrt3pygruufs3o8bsocgiasri9aitq40hng8touw1jphmif0to1dxmpwp2uq7sfmm55dfmj6vrhrov6zy045ydj1rdlnhd2qsnwwfc5gj0fhmpazdlybdhknwqaeqocxft5apeahpax59l36s2m712kaef8yt0y7ruvmvjedym8phv2fkl9v88gi03sys7j1b1jkm28e24dysvcg4q7tarkvaw9ge5t6tl2dis1fv6002xb63e6bak7lans298uydhmo9a386nd22s62oo6c1lxrdbwubcj2woq24otjmh9mw8cfa4fls3gj5ek54flqb4ftnome4sixyoycg47p5q3kuxs4belb4nivoxsme32uhfdhaey8yc1zfszccwc6x5qsgbf0mw8ip3jxjsq7zsn23m8mb2knik5fp4ddcnow8iv7z9zyj2wu91n0wc9nmunp88undlgtfpcz8hserc1jhw7etazpictw783ns7shbdbwl87s38yps4oykp1sou5m256xn9lwcna1i2qa12779niyfd7s2gf0bypx4eklf8mnbl5x6zfbd5i7hhm9y22ed45x3ijkl0h4mqatgs0p5lv35f0r7xiigjoow6c7ah467gg0h40pyp75x06sgi7v93pjbtuj5cpye83d2j9eo88x0agyoh',
                proxyHost: 's8af4eabmdfe0vcm7t5m681mi2wfchr9gflc8hvmntk0e3vjl5wmfxxed54j',
                proxyPort: 7102302516,
                destination: 'jg6wsysab8tcvyd4vax5hqsogwseplk35fv85z8izb7emaso63tq6wg6147searaurhvj6zjlqr4oxl9i8s2ehy208lycvay2ab71xfj1m1j7u6wky9unxx93873w69r346vihb1lu2y4jprqo49pwjtqdap8v07',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '5y0v6dzrbo7vc8cxnliaqm395ku2c3ffwkx31m7r46piiojky1wxssu26bayfzaostvf34ru2uxrsfzd4kavtquq0fyro3kkabnj68j2rqca3twnh7btuxnhvmxxzyxab5up04rpku37jdhzkjsano60x1471960',
                responsibleUserAccountName: 'eczb3yz7as6et2uywixc',
                lastChangeUserAccount: 'wz7si5ggfq18gnm8kwti',
                lastChangedAt: '2020-10-14 23:47:46',
                riInterfaceName: '6ed7tru2a7wveyi91ip54qhfxe09hafxlnamuhaoloyd72r5bhnls844rt6mdu0ervsv2be5g9namm1k10kbxyqvcwf2y6ksu1x57hs68tw0aea48t1vadgve4jvyr1yzgv28mvp7chzjwzm0ny5hwr07qwsi4j2',
                riInterfaceNamespace: 'lt83rqzj1wbcflgehyczno3a05iucswdtjw7w9hhgupl4axi6vsqyedilgirrxxt0u4vhn0v2r1by3gjuq8t5hul1e9zpm4njszgipxb54lu2xwv7gxpon40xssgy9h771m2kmilyyq0jf3g9132dfkcpmj7a5c7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'yeeq0j5zsqn819841hezzljm8mrhmr5fpd7siv6x',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'v169w9o3pny5pq9nz0v2t937x1xtpjx50o3mah7n9hi3x94wlm',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'dq8aip5k2q4sq4ee3ioo',
                party: 'd83x1nagyjv0ff0dj0938lz0mgci0td4mjd7ntfyx2c0zv2u4g5hvv1s523pieyw319dtgclp1d2zdif3zzyix4hw8pzgxm40j8ap3tjk1bduw84qeo6760dyjrshhum7ol3klmagab8e1aud38g75c6ryj8y4qm',
                component: '2d9ic013t8yztsn266hiquv29izcow5v78bdaxy5vn614xiaozhlzoiv9d6ji0xpprb1vh5lhig977utty9t79t8nmxrt332o9og65vzlxn0n4qq3qdnxmslas1nmxjcdnn42nctoqp3vvusw135q66gx5en6rny',
                name: 'jxn9sc8f6045lkhehpw5a1495sd85qjle9i59eshuid80j47kdf6lgsc9r4dnc72xizn6yu4zgjoorolurcf37kad3m4jyiiqey7xh2ewqe2axkzi6jq7znmkcvk88sbiw6ajgnsmzjqo6ir6zbhhogbrbobgqnd',
                flowHash: 'mfrswimj9xjt02bqfl4ncgmgmgj3cu1o2dmwc2y7',
                flowParty: 'pqfbotgrzdfmlgqltqwf8us1kxic04smfp0jmqfoticl2cquxbbah774d1436i03um6mrcsazha8lg1oc9dw21irsjox1v3aqyn60mefi8qpzh51khucotejb9fr39b9vfp7hum80970ucv8mmt2br1zub2ci2f2i',
                flowReceiverParty: 'dlj6olwbhe7c1tvzwdmocvkzautupsdaiia1fv9l3p1tgpmum1gu8miolosugkx8dc0ou3tkg1j8kkk74vlq24nfhfamdtw258kyaly5nn3b3b294fey8ig3i7xnuowe32pa63v511wd4j00abmq7vwz2rfa0ql6',
                flowComponent: 'o2x74hkw2p1dpe4nt8pgzldin72b94uobtkzja1f0y98n0wdlc2dearsvpfwdovn8i4rl79p6ifhbztyqeodgqufssvz46g3e41kd3gv2g6m31u6stwx0w00wb0pzyk0n91uhstrgch8f5xlyh78ukbd8b2sh5oj',
                flowReceiverComponent: 'f3rgc9pldwbopty2yq1ok4h1cth6jmceaytqoo5kvg21ne2essmnhrjucdem34thyr385ev89jadtwb8ilw1ods3ynthwqhsa1jkcfxdffuv3psourz4kfqdwo6p6zjm1fgpue09ehvex56z3ay2alhhmkub14xn',
                flowInterfaceName: 'gdze2b2qs5dljmqjwh9zgnq24ws0lop5cbbmtq1o4bunst470grasxam6jdmzbvnwq20u1ivj3jhy5i3imllj9vwp4g863ixx86di99gkfw8apk25lrx8pc2n54ebcfqly9rzbf6j8no4gq1u3oz8z1lkpu8s2vq',
                flowInterfaceNamespace: 'a04uqf4f8ox0ygnc3cauggavyjobg4npg8wx7393szw2zyxw2cdycmk82nw9mqberb5cyxhmrtlgvdpawaj0mwcs6cu2mctu8zr8mksnr7zytqp371ma7bd7zjluzsjdyi5c06kw3q0l6gjklmk1nokle7auuccm',
                version: '98epmhno3les4gn8fh9e',
                adapterType: 'g9cgraj044sxdzwr5gackr233qj2nfw201hu5kwzi9j099n6jhpuuwhgz1xc',
                direction: 'SENDER',
                transportProtocol: '4mt513894fbar6f3htx8zsectvblst9tkp0ijdbrzzqity5tgsngd5n1awer',
                messageProtocol: '0r28fdn2phn297meg2pnzvrc17hthnu765inpev426pmnsv9reyr28nqpovv',
                adapterEngineName: 'ho1s1fq5xicmxtfyqqyzfn2qvfu87rpvo0mtenzy5nnlgxgg0hzovuv5xc8s6khdm72dctx9lsaghz1db0ryitaghkd3rbnzo6oguqf2h4fekzakr4plkdrk39n3pvvd0qxr74cdoyu4hfqyuvkv2u2bgbdt1j0z',
                url: 'wuob8eyfk1t7sfml3we5v1in53psln4fx9c3h5w0t6oxwcd6qf6hwuo4psp95eftni73nvqakdgqvon1wv49pyc4dc1cqv44eqt9g34ya2nd1lasjjex5ifvqrvek3l73vpvat16jcuq7aw72lac2j0mdrh9w6x9h1c9m0wtljzwzvgnv8ercqqb2cvqh5y8ue11xu95b3y2g1togxdbdskhwbeigs6bk8s5a3yiqbf9htk36zlfpoctxxmc76gcfgck8qzprd4ojz9qph7rhe54ug6u40u5hsk7gfifnx8n8tkc62lw4ggdvwiosz0f',
                username: 's6jgw91v7zlc2zl7s299512psq9ezn2c4kuj1aet1dp4pmq9nxpmr27o0ads',
                remoteHost: 'xohar5grzmye5b960ugm2pk2rqrx5kwyrcnmvv54kb63umurmxy6qeejrd3prywjpfvqoxrnt8ssdeouoaao368qgu5jgf5v4uhj2zdupnp22zkuy74btsc1rekac3csyf8m5fkx11l08prxets87ys39plhkvrp',
                remotePort: 6621946826,
                directory: 'a4cq8bbumd30wljh0lsryf9jmm5cpmwy6kqczyef2ddtyfdysb57sr80sodk1ksarf4nslqa9jxfzlydzluyg6n7urt26qy4xg2sw1go3mzpulwlvi0ogfaa9wynbjn4ogasi6m7g2khmg87is6bucvob9ru6qsg7r4gywz05ufl9y7ujgeu5uak8hxclon6mchlzgkfjtn0a0c9i5ninhp9gt49fb33bezniqk9jwcngx7dkngknl0pcpgj8w4hobsqcjtetisd9soqypnzd4wjdxbae05cf6rwdhz6ej4wrljlyxjak6vyrf51m9r40t41mldwdx14n884jkddfwewka7gimvmlx9ya7om64sx0h0f3a8fpp3bf2bd3lxdy52tfu0zl7wuasoz44qp31pguc1e3lpqs3fd0g2741fnfkfgo0jomw7lijsl8mhnnqvmv3svuyjb7p96zb70878zlj8ofdkgfzovujx1byx4n0e8uhencbvknmq7e0yie37qv52svzah3b9wwbptn8aaq0v1evy9qdxxchtiybrp96vn4ftac5gj1idwav5l4vtvx89q7jc3l4xed7olwe1a7cryt18hn0bxhui1otyl46axus82tlq74jk0usk3iqdea551106f01m3j91xxx2d3orpke0ltl7xgb4thrpvf8gq1bisawjr9njlcl0fibwx8m4govwx54fj42igdze1ius3hu93njfhtttml46tytycqcly38biil5xtvgsgjnz4dmqzeehznb2pk2pm9yiai4k1n1wj67t1d457r96c82u2a575q0k6l8n2jydypc2cwz10nkux6kl8g5999d2k6fytz32yu171xe0qukxvig62kj53szipohld6bidtet4rbsmjq9l27zl46ftgukk278e0h6dgut6aoq0vt88eibczq60ddfn9x40oc7vurfzs0kp3azogsynm3qqm89k7r8xo00w5yn8viaeiaugxvclwkci4m15m8p54lj',
                fileSchema: 'b18cmsmrai0oa93j1cpnlk1hrlgfaow254kh4ukmyqffrzow4x1lldhidkgsqy75fr43g4plgpa6hkp87yfm9nkql7m62qceeex38mpkilokejnpine6njaatrksqtz194acr1p98b2k8epd8ehi3ay1klf4620vlai4m7g3gpnauw6u9noqvoajmet05lqghblmkdsa7zf5ep6ws70xpjc1u7237f8gf760n9toaf5rvayw4rp7pcf3x6g3s9s7h122a0hv2i3wm043k1k7tqtc0ldwrr4cfmo92kq70zovzvsszq0nflhylao1lj6wv07i0jzhck9pc5g55ba80q2khm82kkm772js4squocygdc9gvoykprir2kk248g4lx6omnqo49ol6zceoqcadyu0cf9cfvrzq03ompcy8cy3x8d9mtlleoyz6f3rk23b7gdiieg8z6jmid87lojz7cdc9adkxuf5bpd4z2z4uax6y3wg5oip5ntjzkb0mdddfvztgblhzyq2wtmbtzsi0odgckkz0vguu4o0ect97sbpzq3l6u8zvrewp26plno7bqv17t79ozcxoyed4dhnate5m96coam3m4csfbnb2y13npku16pmlxkppn28v23ka3gjfxpem9vcix4trwdunektbgr1e10lbejp5u9qmcd7urjqdpdiajnre8q6fhz86399hp12zpfwcnm2pcj31orxgxscmamhliwvlv9a2gafcuybpjxgookkjrcmuksvnk65lv9bjw1sjetkv8ylzvtqm1pm3qqpofqe7hngq37ot2kgnlwa2mndnjwxic3rwykpfg2g8p86gjjq9hjjev3b2drwcqksqb5c6lczb6himjpoccojgbdbluz0l7ddn4tc4cdjpu3vetzxvd89bw8xpcr5rkwn3txr3vf6mbk9yq1xzba12398fvb5hjaewdy3fxe3joulxjwuygnikfmrbtlmd4gsc2fvurpk9u9n2pevei2rwzavsjz5u47d',
                proxyHost: 'qb2r0kpi46ab6ceyb947lfl6xylj0qi88qqg3ee4rxfl5ivsb3inlh8yrs74',
                proxyPort: 4809561013,
                destination: '3zkzs0li8wgbjf3bnbble1soxf8u92wxxux79wwqcpkxu5yvshw1ac9cmshawi9886niqrptq1xhp3exe43d912wnecy9zbk9a9b00hn0al4i5s78sc0at0sav43xp4khtfmwkvtuvz6qlvu073dmlitmtrg12bm',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'dgtkjv5et0tl2jxq02jdh9fu807l2mm0j1ue7bxc3miqy8277xrm5uigrhxpyfw795an28nmen2woy16fw6jgqzqmcdzz51kfi1is830i5p8vd4zbc8k7n2nmmgxtf1khp26kmzlwkp1skg0z6l4bzlkmr9mbsth',
                responsibleUserAccountName: 'euu9eqoxravk60wxgsc0',
                lastChangeUserAccount: '8ndm8wqv46z8tlewcn6w',
                lastChangedAt: '2020-10-14 09:00:25',
                riInterfaceName: 'xufts2u73r6ot5uqdx6u0f0rkq0kz97u9ad7hp0euh69pxxgukgc5vk1yuzb1vonelpzwopwbo6rkbwvn88l7zyu6im8pu65g8y5fb2oy3038z9ph087psbgdyx4iwq2nlspwibc7zdkreh91q2gsz0hlnrdp839',
                riInterfaceNamespace: 'nw0066fp6lfmn8xgu6iy8ajdfpd6a366lmqfn7lkuwncpo8o29mpbpyjb78gr6ozzd1x2g5e8763ajlyd6ekgxr2d5oguok55h591fuv2ctn2wf09od986acqsaekk1xg3ipnaibbyk8d0gsbqvx99ah574p7oey',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'ld6siv8repqpalsyq9z7yl1dgq917fe8lddryk2e',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'dsenvosgb8a17f2cw4svb2shu0b86xfkoubdv1e5wupsyjs46c',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: '2h1wnjcf4y1pbmtjosjp',
                party: 'o0cu0ez9h2mavds26uyc156fgclhvgnyofd9dfur9ldkvr967sp3oe2gqcgw76ukvypke2anmih6d0x90zmohf4pgl3ef8o226n364qeucscw5h3rzj5svb37tc1jfed5hpnurqy8cb7m2hpgbcipsym7xbhwyva',
                component: '3h5cwyvzwzezrt3txowcwtshp0gbe0ugjtnm52ptvh73xs38gop3gkz5u3ykk44xdh2bfu0ibwgci0ms2agya5lrtl1i8uedti8yc00gzgkbgoocu3vg0fp0dwqn5hxssov1ywktosh2cyqkhno8d0yw6o88v2sn',
                name: 'xh0ixs2d8p5v4i3jxinuqp1vf049969z36zq8qdn22cad4lruuutwtbk40yn3yn3aurdz2qapg71s3h5tkmfctbllnag9nl97m3vi3a74bxu128njr3dds33s8h7yvvxvza5rh2n4njbvovujft034pqkwzus8h7',
                flowHash: 'opqpaivorhflv0m6dm5nfto0tlmt52nio6dbze3z',
                flowParty: '4g9u4i5m3ykx60dtc642tzzwpntr04io94yeeasvljq7gfb6skl237tq7kfn0wsgnzlldhwwk9l1t5ee2uz83g0m20q2j2igai4s1u4nmbhdrzwlwmxvk0gtlqu9dad4gdu8j82daj6c6v89xscxvi8jlv1bxk39',
                flowReceiverParty: '9g1cb43242n1l0g48kmapvc4w72gp9hhitjfr4uk6a0pjotwjagph9cke9rv2vzsxel8rzruac5anb16ekmienyndl3f0bx8vycr9srztlmupsv3qfz4y72mv0or7fetwzq3uaprjcn4uhwom2tb100jpa929pbkb',
                flowComponent: '8y1citgzlqtbrnhv0mfrihkgf4y7u5v1zwxlqricssmgl9gz3r3nd9038j8ki0s3ee3my52srx8hndye4m0difmomg1excv6lk3dwpisszjh1xf5h3j0nwpaljt2aiahgbtes2fn2rhr9afqcxqunc7ntkkpf7g6',
                flowReceiverComponent: 'sezmrbrzglbdmiusxf4lskusxjpnbd21bpfk0gqysialqzujl6acf0a95yj541k1a663pp9ksgupfscr2hz7wwjppjz7lzuqfc4mwa94l9zb4xzji1na9c1l3pznuk9uwrfnbdixe3k8fd3257gwwo5zhbyfyva5',
                flowInterfaceName: 'o7hcjark1fzjcnjemwj83wuzsqbvo8hutqlwfekzw9oh1z3pyh89vfxo2cprkokr0widvizfb841zoazit1f9mhvz8imw05f18ic6bv3v4t09rkqh0najcs8mtddngjnsubbl7xrpokzfae6vo2uuyfpt2xtajme',
                flowInterfaceNamespace: 'vhh90sdxckj8ilqqb400po68qft46ginbir6fl34sbp1y5wukjsehx0zswjgfrxblbiowfkkfh4yqzzirk73hay0bsvr3kmv91ko3qie4z3nqhv4auc46mq04nnxeexyhi1xfrc2xvihqy9qoo42runax5ck6xcj',
                version: 'k54ppcokbivsve68ku2u',
                adapterType: 'aq7ztr7piu1dmyvq0c5yv67dflp58sxcl8ktwd9ikj6tghut34mc89ffynoo',
                direction: 'RECEIVER',
                transportProtocol: 'd536lwn3yb7vf88b281c7t3tpnnqppd119r95cg8ce0vadgp3v7a3bn0lxog',
                messageProtocol: 'm40mwgj47ylowp9qtjg6so5vdn6shc3efvjjkvcw8wj1glpvj50otefef1vb',
                adapterEngineName: 'f3my6htzlsq6xgnl6bprid08nvw4gqlz8b5rf39uyvfkl34kk3qrr8qfr2258o7o4pm4lw6au1u3svbrxe6t09y4zsz8otjeq3rn39pjb16qk752jlqfd6rolsx7hvr2yr4inrg0w960lpmytn4vbqod64tgkp1n',
                url: 'vplwf6415s8ez41xzf0u5pdvbhqlwlptlrj80lwd40foinsge27fpnyg20a7t23gvsaijgu4o1jk6559qe7sy691kfqoph9rmr2ll80meee5w9f7vh187m30jm39pi2afdnexpuhjgwoz8gz06fiaxlujeeu3pzb0gaksownzphx3x5h7g2g7t1cf7fgfzyua9mtm0t0g6eoavxnklgbwpblvwpzkqhh8m2vjoj087elfpki3vga60qjc7csqy2yvx4kazz9gt4d81bplkrridyymmgvccpe8k7q4ni1r9ufpzf1owvx4vkpaehxoqp0',
                username: 'vmlnoisytoq5nm7uh9g72b9vpyttfvx7nffe2ea3rrw2dq0xqsugcsxnksg7',
                remoteHost: 'wztf2pjnwwvvm0212nqy0ox33c0ny2bdlcqdilxd74ayh4mik84ftuywl8ro58bnep4eb3gzhpqvzv09r8ogebwqgz4mhhil830b3klxihz7atvm6ap62oo53yxs6kjw79gzkck8i7s7b9ygnfmwqoikz6xusobe',
                remotePort: 8239468934,
                directory: 'osav58hqctm2f348q69gj2c6x2xx1yycd5t6pemq08k0l4pxi4vhkavfuhtrhoi1d6zkauxmni1m2slsgdyn5ss6hcvqtgegwz2o2dtzzrvdbsyb6wcdecpxi2lvfgze5fngp0w16pe1hx15kzk0x7hq07wf0mp20cy69bdq4mmyxr5t7f3vxlkmbv1mzovyurqijynyybaoukc074x9ijsj5n1w7gsky2hvwizgeyxuuy758qzcyy6xh2c1yopsjjc8wg10d0t0va70w58ivefcfbqw79ovs38d4cbp95pdthax4kz708qxfo6x6kiz8enib61ioiazbd268tk4827ztn2lrmey5myubw6uittzi4a33pkc2ilzivx5bto2czzb5l2fxy9cf1036m2dkyzh5nir56in0qqhnajkxaai82z7ffve2uo8365u3zf0y8r0ipm0t6mh4xrxs63v6ptq0nuh75v42v8cugmo6kod19x39gk98752b0ckozvidd6ropn0togih5cieho4dhyqa6u2fya0sxeie41al3sz51dl6yv3qsh99xcdfdiadh93e9xop2ka6saxsaiefylqlct0xa6hyzjnu1mh8k32dy7gywty924pkkt0rt3gwyg4i4qoudeabr6b06hqp2s3lxxfgvq7amgf09ofyqkurpnssjrsd5n5d3nebpfe7g7enib0guss0vd5gdpjipkpzhdnl4m9cshsi84pwulltw6489x0n0g55w7gpg6vvxkrsivi50c919y1st2nnyys0qmoeo0470as17ttqx2mwe237k4rsvzlwiff1npb00shv6fyqb7q6d8kjwdiwchpkcqi1fney1stxb9tl38g2gxyr3dfq1jg9nq5h3imqp4jqddzc0zo4qh0x0dmpmjqh9u2h76y2rn91i4z1luqvby47r7abhokgjocnpchcexif53aiipzenvakdxsbpkmesisntr9qgmb4ath66rxk3wj9svnwwl0g3cbzv7c',
                fileSchema: 'pc0z39ykoqn74zopyy9lza7luoieq1y8b4c66vkwkvds8r57r40pg9n18vlnv6p2jrp2n7rtjv3s2moc3weoie5k3ixqtejhdjvwh4gizv12b6oegecmuopa21lqn0fn26baztwgpnf93eyz13p0thrsp0eit5d6fkh22c3mv0r54w51mx9ltngyybdl0npev1idzowkl6nppie3aq5bg7eueinbylf4vw5p76638950w6agyq3vut94r6w4n4nsjufdnx7a573oyfka9p6hu12wc0qi51zjldr9waug4cmvzyt23gmegzwunswsrkuvy563nufjzsxatndizojkec63oa31is624ul6ft7ylc4k2fpgoyfmk07gch8s0ve6tucwgj4fsdh8ereby9on1899aemxihkyymre4nvvwhk833ceplueu049ya1mfqned3icr8c25sli7jletmdyj58r9t9p0evvt5hmbzk22y4xb1vm1a0i2hofn85xs77j3u98slkxkhlsokj4rrjldhxm9y09ddn1151q2none3b5ydjd7ao99grsqfs9n5gpw25rmzkx26aa36j0s3ohid29qnojeqcp5flauau0ua3xr75nxjijc96zs36cjr7v3pdaez6yyccf5kv3acxnmymhs9yeizajw4fe3j9dd05ei65vxxd627vnt8khj5322x8wsofsbsaav87kdlluojf70g2wfgkbakkms73pb5oxomzalz56juoai313he27an71ti4gnz3jatnsk09xlm427mwb0dp5d2dupnrivl6nhmw2z2gbdta6qnohte6ffxm818g9v2zeu1ufpbe1tusiz81r1s48xy805iwypd7yasga03nykdyd0o3kltnphx7tbd40pvqypoacy0sllc5f9pitqukhbuy1bac3s4sgrk9zk5bzc3qaydbo9yyw76lnu9i1204q9ruzrm8qmbqnioxui9owtrwowb7q9xtbf246leoedwbj4f2eoe15',
                proxyHost: 'xror5978iibadonajwc3ei2tfyzb0z3tjot8nq7pyogvjbj5p3w5j6v1gayy',
                proxyPort: 8963441329,
                destination: 'bn81rgtemjkpbdi6pc5rjgnhgdn4x7qkntxts5nhpa404gt0j75e47yss11qo3rlhrx56w0my7imhv7c713yv34xwpdm6f6yzukq8xj6wuffn89opns8v65mjtc7j2tob0gqcijgn8o18eupl3lkzr71vax05zvw',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 't1r7c1r1ac89gfkexi0vue54iojb4luenabhdx8c5wx2iklek9ehm0p10sdlpapabzr6f9szz0z2gle0jwydo373xuz3clrgcykwr3i5kj60rpr253gzfk17mgrfk74kfheup4coqtcljy3zv030h1iqltjsjmsc',
                responsibleUserAccountName: 'vwdlrd2adrp1qimmd4am',
                lastChangeUserAccount: 'vwe9vqvvx66xvhmracm7',
                lastChangedAt: '2020-10-14 22:33:18',
                riInterfaceName: '6a2xcgza5eyh3ztf2dp420abtvea78bpz9hrjw9r0hxrzs7bhehjivbl1h8aofv1lcw7cd3wshgnkqng8e374fz4bq45o9vehrgeae26wem92126h4u11pu1nbnotuslk6r5oawn8as18q6wu3buuzwvh24708va',
                riInterfaceNamespace: 'h9jt8et6tss0numrpch6my3ncirq593bb9ugihv7tpdwrig07axavg50nxa4rlh89bf4s15qpsz92lbb8r9tszff6df8fuyoa0b24kmexilym0fx5azusorzb1joritu25kusp5ddnpo96s4086nuw9kyza84rxu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'brn40sw1y7g0pjuja95xzj7p4qcbyeu7k3q7sedw',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'kwnu1rf1d43698320or0fp7pfoqxs53npcvu3m4e3t6i3wa0hl',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'uc2lsjpr6kwrxlb2xjq0',
                party: 'gs25lwt7oc7st0y6j3yfj0kcimmxnuuu9w61oqc7ol33g2uprsysq23kgdqrsmea00i921lb6rpdmz0ohmqu8tnncf3vlcldo45xrnavoxf6hgo97n9ksf3fvat7rw81j69r2mcgwaof8l5moaqtrbzj2i3667bv',
                component: 'njivpii66dwqgscyg3iln8eu1tohova3mlf72s22n11j290k0na1pj0vfh2v12xyoydpdp1a1q8qb9i8c1qtu2g6x5vgnuyvq7aokr7ctp70nwmapy1sj33o5jrfx1oqxlcwhchpb61nqqwldyyv3gu6reuyyndd',
                name: 'r0o2qq90fh0ihf8ja6vs7oh8jugw8my6da7cn2c8fafnfu1zlzj6iu0zxki4i7do7r2vvus752or7qgmzrncz73cksm1qnmvzm5esjor4gupxh69iy2g3mzcguu37fafhvyd7uske5g385nzv4y8tnrdekv722z4',
                flowHash: 'bi7fhds0qolz3a2dyxqa9yqs34brto54i46dioo0',
                flowParty: 's9iwaajdwojpow60wmq9x1qi3x9qymu6h806f2jeljzvdhje6id7399gwwi0x7llyy7picosq7vo0smiy45s9p8fg0clvy4znl4e6kqffq2gclmfbesfa39vz374e6gm0nixou7ijki8o0zyshg1p9r9dzq8jnwe',
                flowReceiverParty: '3daieaaalw62wdt30qe68tmjme4ulmxn65fl1w93kri6hjtgwbbq8s8thsagqov7jgd5bw9tgyj4mozqn0ux6obtfz8toywaxgc5kq7okxrygotpbimf1y1505f0i4qoa1s7gynot0cdtuy8erw1m63lp4kgdwf4',
                flowComponent: 'z6wf1j4kjl64d63c03yn1zjlm5zfm5xlzzsdu7iieo6vkmbatt2l1s3jqm18zzf7eoc9dxnbm6ck9qbh0orvjf8k0j5ewa5mmzdnh3wv1mgbo3p9yo16zz7vruhc3l14b94zmsms0p5tfc9tuq4i499c1tk42e6ue',
                flowReceiverComponent: 'qz0weaxli7svp48jp08ohcxigbj3z7cu1ec8focsykpgxy4q30hnoeay2fvimsggo2i0vx149nsfo6ltr9vdr81fozd04lzh7kyzbcmze0b4764s5snbxntpla15sv9cec2c0kv7rrngta3qikxkwstobl4ad4ft',
                flowInterfaceName: '41gniufqnf0jvah7v1rt23k7v1tw85ebpkrllf178d2ctriwdqnkssi0g0ekckp9adfnkishto9rr6e011wkc4ief0qb7d3is7bmsktwf99sff3i85opysnhrr1q3djs2q81w2rq07vaw1ukeznevh30jqrfsmng',
                flowInterfaceNamespace: '86acp1p1c0208wrt10em0mrq4xlfhnccum16ebmga0k25vla3n7ogkgjvxpffrr69y4rvskckq7hlc2eauo8suhnfo44azmsn21rybvxq9jxz4sha3gbkpo8g9g6e5djmj69eqxgqwcw046lhc00gkgyzop12lz9',
                version: 'qlvs00f4h4i1zl2bgtbw',
                adapterType: '1q40gk6th3jti9kcji4ekz92g5ubgc7g8mtuo74moobhsegbrgba8hpxi1kl',
                direction: 'SENDER',
                transportProtocol: 'fzghrbvf473byaqnl29226ybxdtxup2fzbnk0qq7ytwbd9dc9f5e9x4fpgws',
                messageProtocol: 'hcco77cydn9jc3o1lb9ui116qymdbfn4lffkw3gkctmbwoof8gj8xzdx9qss',
                adapterEngineName: 'cxnrnanqtwoarx6gm8p499fhfeca48ulhqlcidptvqk7ay552snqlug1ia2qmcyvgf6frznk3lvmyavpdz62gdkyakva1amj9mfkw7br8fkwk1dph6cy5xb6hgwv4i53l2eo50avy759lqsytzzoqrhojwethixh',
                url: '3ud7pdwpy9hrb9pyhsbw8z7omuptl2kn5weykwko2izv4actw67l66ur9dnpihl4jdu7zo0y0niwpz4e9uxf1lq6ih0w3e10oz52t6u3p16pm1fz07bzg0qxb1qdeqkb0mxu9gsksen2zyidhcb6pwxufn4f6vegvps1hk8ujmsggxw9sph165myy102qx5ywneupz1tk6fs8mnqgrrwnf2ug2n9d3ze9g86vub788wdiw9xsurdjq9z3avzw5v9sdkib74nblggforpe7z1a4032eh0vn97tff57dgzpxegi920gzukspnenr02z7b6',
                username: '6js91blmjdjzjsz6n0ecabpj5qyedbqwcd2hatvbnka7xa3m2ro5kmwlailv',
                remoteHost: 'jo8r6g886jkrdbbw7o0z963i4b0opkwf809xuftreq9cpm1whtwq1ydu68ny0i5nd5lwc2txjjzp0lay65u78hzfzitrkxshrk6pgmgwwdf6towz0b0ufqspu7bjb5rssfzz9pj72jda4hwj7juymok27t7zm46b',
                remotePort: 3517877584,
                directory: '7ugr6jtjjogakdb5mdz26mit70quefgbm9dedwsglycyj3n52bea67b13s522bhvftdsn5l2g6sm9mfhsdkxe4vdn2kcy61s64g5or2es8z8yvcflypv59pijzih72qil5f83khb07xm0z69kj37vcv5dbjmxo3s8mj3ael3t34gflbrn2ou7jwzs1pgys5w6h7cvqsxi4jhqvy4xdke9g70ev0x6ab81zekgehe0o0upx9ldjvti2x36uo3w3ie082b94pwli7k1hz65z9vudbf579jv4f1nprn8w15a3cpui65rlucsih2o823knhj9y1vbmxiklezu8k9oe4uycy4j0ac38m25j7l1vypalv9rnhwlbd61s1b2a22b7fos7uzycnw87czzth7ja2uyy58knbrbt0ofr9e7d8z6px2y7m0c5n6ppdh8hov2wib09b7ju4elopozwnn4mrlnyzdkrdm46wwg81ytrp6175z418dyxk88gfxevxeojorg3zctyezcu3zeujemet25tbg3doq655wm0o81c9nfnwcu9z8r7ljljnacvf45a82n5wmdhzj0n1np13fgjtlzzsno7zp9lif9by7qjoqa8o2vxarb3uy68bb2lt0ud40bpdxnduju2p5v6yqcvyu1ucts59phm2309tymx183b8x9adrvhm4tprj96uzozmwt27ud7isp6h8icmer1cjdnu4hx6mpvb1yq2x9pawfcb3yycqm7h57wmhl81vpeayalgsgtxv5j11e7hxhgd38vdfyalqb7dgm3t6p7m4yy79al7bdo9pon6oej8h6iwq8yx0m2blpc7eflrdbvtmfx7dl3zit16qf9ki7rq88w9t66bff34r2r0hyli3562rieswggxw6ovxwwywvekflfb13eqp19svt5a5928qmeacyjx28dysjmey6kqz3ees4sjqqijkwq9fa4crb5l54hm4uimg4lr851xshm7s6egjvflt0xgg2mw9uageguxp',
                fileSchema: 's9vgyd6wf4vojv41mkiie2sy0on472yq1knd5el3r16am0muwli2oglw396bq4wqiylq85e9fm3w0axwe097a14c0um4wsxk4wheote9snj6m76fdirfdp0quyh0ab7bmitg6tz17olzpj5685cps4idli068s3ndb4efi4y8455njwfij2975kmrkgstzx6e32ivqz404igqmds14z6nzt353uk6d2pq58jz4xntc66rhphe120syfolf967ycaj0djx6z0fq2c0ujlawhjzciyx9a7jn9qrspuszlzm29gz3xkm48zjxptdpn7wh61bx5sc88jtakczg5h5hwmp0cmimrhdgmzqa3gnwocojscpdy74qeovccihl6cx6hwlmm4axg8aah7ipak3y6t6vvmrnun1qpznz2qxjqwi30h51epgrakthqk37zch80sn1m85f0zy16rubh4btux4ixyjvggxacapt6bn6surkdluka3vpts281d3s3820tvv0jv8lrmgaoq9etph7g8phryn4cvozrj21ply17kk9i47d990k16cd3185de3qkcbbxv9upywivm8s42gpw062u856u0gm7t593fgey2ximfjdw52hwty2dxttedg8zb30chpdly8h1mxijvtcuk07ddof7902m7w2e9wkp9ttzeea9be1b70tmzwdx3wv74tq8jq5s3vd2tmpxss29ekuz484bpitngj88jxare7h7wqe2q3hwcjdtdrh4cb94w87lddvkdr3ypdc0y1deh4t6c583vu4kd7xranstqbfyhcg19lqmf1xi7g8k4o5a5gzsxddfdrj8573jvkgqi7i721mrsb9ix4r1ev0l9midv5c13w8bnew9yx67snzkdbhrzij29wpnxb8o7w86kj3ufh2q1u39kdetgfy9z22kgl4v7kax9ldowz8q3t11jd8p4fg3fivz4kzpmqttaezymi9s2yc58agoboibq5jn8a30w2ux4xikxncwnbjff',
                proxyHost: 'ncx4ejty4g9ld20j0vz7ciht9sndhzqag6jvro0vskcb76n9eeb81gv9tt0n',
                proxyPort: 4026822724,
                destination: 'mrcnuiwk5suirhxbkx7zqenvchesd59ju808o18x0nwyexdh789lyewsdnmzj35bse7fmjomf8ipkg95kopyzgu9eqf9ow006jm5lx70316f0srh0on28kyrpwew8gpbsz3hy0nd4c8j3mnyyuehqba73o48vbjg',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'p1rjbvi5j1f2v25y76yhj2d4uohdoud1svl62envcu3wjv0r4ojsb7fu2148t7zzgz1goqdn6gyqk2h92g0c68oonxat7410jiayw7zcgwqz74auwvk771m2r3ytxmugpqbbqk8vwx63ammlq76qo9aqiz00zlr5',
                responsibleUserAccountName: '0rfsvs1zutluwi693w1x',
                lastChangeUserAccount: 'ei7fxcdasqd0fay1q1o1',
                lastChangedAt: '2020-10-14 04:56:44',
                riInterfaceName: '0e39evryafs8hicf41tk3ixslcm0r7v8oca2sxn6uhv7jmuynnmrvwt40ofmzsldikemnqympep5ts3iosbhprvmqbza7r7ooilgf7tbr2atg8rdjvtmehn51ee5fjkok4q3chort1iju319k9kpesfz42fhni6u',
                riInterfaceNamespace: '8wvmz3w3759ur46xicwb0iwfimeeis33pfg8c85k7gwv7jzv0w5nuvsw9dwdomao8n6fwlsyw6wunx9fn1h4dv2xmtlw591gpr6yvgzcj1wixzesfx79xrk33xaqcq1c9412rxqvdohhgd91vkkg426xa93ssivw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'zw7afh4yg5705dv9pl4rqsfu9mwhdttcnnterk8s',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'yx9s8m0oxgvjeybckl1k0to585qo8mxxs84mky2s48k207texw',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'a9bqndjqgrj497gqqa2l',
                party: 'a96oj1k5veefhrcdiz6hc55ywe23otscl02z609ubtwv4mu84ftfdb298ggmdmkcqg71zmb0ep628b82sy6f1s2wr75e4r435hdyh2i1u28ry6a1jp02ca631i82suqj8860hh6vk8ks1g8a69d9u864qr4zn90o',
                component: '8hgxfv8bahpgyt786w6hxxba1rblzahk8jolwyn70ziw0cwr26mm815dg9zag4nwb3mf62jja7bguyo0xj7mvw84yufxft3lkp0u57c4pdtgl0rjiqct52xwyxct6shqfxzpcu2lz5mznrsea67y2ywm5yg5crx4',
                name: '12ygh8px581l8f570nscjca5krtbukmx9pqwdva9slgu9qvh2odyp738c01ekie5npeq2g161g7q6dbmvl2lak3vvi8v8mi2ecjjs8vxw7bhr6wvecavpv6otf17mvrmm8v67u6t902dz7irh13xeugaw60fjxwm',
                flowHash: 'if10tzyn14uwdb64dicgxgzpomxfskehtfe90suy',
                flowParty: 'ah15i330m5q1pd58jptr5g2cjjqoybkbm7hb3epy2yqqz7qq8dfb264yutou2gcpcr9pvoawehhklpi5u2sn43eizcmxqs3raw6xe4fu5f4roa67a7c22w2owddexnm8x6pm26yf3hkzxriq1lu24wl8bx88mx8g',
                flowReceiverParty: 'ep66winap4mtwuru866fjgincg7jv7ym8yom1jnligwa3c5ysduoh7nw0yvo4blthqg3i0gx1g0idmu20ltw9pu0kqdyhssmci55aubdamxcbzvietbizbrb8gqm3sysxzbx7akxqyoe44hfw3kx01yvdkuxq1mo',
                flowComponent: 'wpurz3vsj49ex9b4sur97iwbwy5dp8vrsbab10xp4loj1tz5jvdrsmn82ingirgbed47zw6e9b4oy1cv0in6c4a7r120gwf7l4qfdnqt8fwtou9nlmt1dfbpyusj0mbs1d5rk0bv1ridtwrr44zftakehd21vp5z',
                flowReceiverComponent: 'kjgxvyhtjxajlm86fhygl62mcdbrqongrf4r1absy18emza370dvs87mibwtxvk2mg4s85kit0cjt5u2wv0mj5q2wiwsmlimhyx92b8i9y5wicfcnzx58eb4io2l8veo3npw047rom8x188t3qkenwkepgu02095w',
                flowInterfaceName: 'xc1sa32krwyoy068m40jmg3ut19moqbvc7ba115pvkrkt6lys0vtizq2te57pj7ymf54drso0c6n6wccwsjyelxxyo7db9uy6kzjj5ey058r8lmiq1zn5xla6brwg692z36lepkipalnci3svvi6e7bg56in1q1z',
                flowInterfaceNamespace: '7kh38ki6c8oujsbn7q2g7z090xhee89x5hjjget7z8cr84vxzgf4x0istxf629dbze7zl8hjc8ea5se3exlmuh1sfwge3riztd40sic5mw2ool3us847dfn4ey3aww4ypkrfx6h8ma6ak0706ojtt6d7avxphul1',
                version: 'hb6n259tvsyyk6cu4mwh',
                adapterType: 'c9exuch1vxeqyw7fsy91fgwy5m1xduosqiwtrmnefvjekjq6iocsiirrzncx',
                direction: 'SENDER',
                transportProtocol: '0dim6rxhb6b3kqysmxjb42qzkehlufuuyivfxowz0wfj8hm3kkz0c918cwcc',
                messageProtocol: '7nw3mdqpso6dyuol5x1feqbi9vtyod6eye7txckk4uw3wyiqsakoldq3vxfo',
                adapterEngineName: 'm3iuhof6bf39fyv716x06yzg86918krszy608k6x1s0qiw6zhrcjvs3k2pqq5ou2o73s9eana0mfhgpjwhpdkiq614noaeofdgwbby7rx3sxpoerybv2lsq33ld2jrkftkgfjbdu9tfwhxzlhr5vastjhjiwwvcj',
                url: 'gfcvkvnz0deua8fh95rh5vpr4a8curdlbumzf095m0xquq93lp0ye7u0wxjv8qx47otkfi49pigg4xserbhrepqa0mm1hrt1mikmvu40mdyahf1rbpzskeep095995wq01f859g6kgd8sd1wy5t3ge010kziwehkm1viua8yhr2oacxt7cd1zh5kddie94qh8nifz4hghnx3qcx3wdmasqy6wqsdsecepyxq6quflujkfbp4pi0ilyi7ltxlilpvml71avfhbzer1ogpposf4bqkfmxv5s9mr5qk86n0qqbwgkhxbiltp4faxxdw7x3v',
                username: 'hja2a4qqvy289nl8amarbrb20tyozbo4e1d47stdptijmduvj8r6h0uc528b',
                remoteHost: 'wel6n8kdahheohwhwvsen1nvu96b3u2w58i7ejy9uzhgfa6r5ev1rxxcj93js8dg1rpceiuixb7p221toi5uxdqk408h5fq040ujpm3xtiyesboxxa5uesmcljtfzf3oky9dlccoiijk4n6kxrd1dy87u1v9k2ub',
                remotePort: 5832328243,
                directory: 'm6ramkn8m7zla7djpgxhb8uu51c60mymr7ugj1wk1rjnhto7qvrsa3tn4mkjl8a9r9tp66jj49r858q7b1lf189ykehbudeod82bwmiu3ddy4wzwaq4vhtcjo4mdsh8nxt4y0qigaq1op2zdgycx6ic703v4sb6ui9akc4op7xdnh22lz2qaipkus0m2k6zzwvgmmy41u9mapwqkeik2wicoc16j8jhqrfxo61u88pqsgr99q7l80oy1uxgvi78ausjalelyopxk8nx92qjqiym690cyync6ja1n3zmjblt280wj093eejetljbgc8etmp9tbxqrd8stjwen41wbtj4ki2zjqefjh3honfzh5seiyy8e7yswp0pj28wzzkcq72wbqv4xz93bhxhjtmdrm3bg0wr5ha1g0pxiqjc3edxug1vfnl8811dlsrua5pavr010eqo4vutjk5qmghox51cwu6ohvljd5koryw9nr28rfcu0ljhto72rtvnh5n2056vuivqe7etlz8bmhlr1789mh06et2xtyw6s7vmvib27wg5s108okp3l1dm3srbs78f2gdr5uu0flas3qugqclwm1aif7scki3vnrqtl2a7aixmfzl5wk3xibszundr1ouraclk9nu8no0p00kl3ppot2rudswzqmb6zbe2r54wi4o4jnf9gokk02si3q4gn5ucjb6h6k64vlbk6iahn1f8y6g97no73v5625lifopg93nrz3ass33lmjl6x7gjl6q8yt1puwn8yt3yjttw42kldx68wsnr7kvslwfpt2dmhkpe9j5919v0xci9ug4euskg6zupfndpvk0xuwih87sjp6kuqcjqnpewdg1odgprrul23jki94k0o4tm82dh65nm4uoivknbylp7xpp66a9cc6iemhej30vhqli8czxvzppwqelpqgzpo62n4tsg3nr3kx6v70s92jrg13ytevt0wf26wa7qkm0bqasm4qex6fuz8n2hfgwa8y97612hi',
                fileSchema: '45cqqgq32b6ezsqdvn9le4jtb30rtyguumax4pj97e56a6vwnqkne31xl146wvg6eloib2moqdhhf7ukt75rjazir9m67y7emyx7t3o86xmcqjjnp1mfuvn0lwnlbu8s005kexmw1r6nexk4gu2aua4lam2iiz1gijokoiqjca6w3zcyf8iwgrmz1cu83lm5af5ynmwjeztkiup09f6kbb1nxjuzrkvxpt7aawigptxp3xqzvdb46mbr7q1zwuol9fppfspoxhtz2ktrbaxteum3znvwi8y4ydv8a07krnf9z0vqwlbxaeecwh7b2pokxnvzvcb7tal4yvqufmx6kjv95a59tcqnw860mllqwlotk7kdwg9zd4yc0xdjxqpn90cfqrmt8ltmn76r6qsms37ng65ai4hsc9n5t27c1w10ltuj1pghlgl1qhtcuf8wzkd8le169q0f4enef3d0ig0g98v30tvevgosp09kqim3wgztwcs28qxeme78v6am75ralo5m43iqc2t5gdq1uctdk4608xnuvke8zi7506f91xhbvvv7kikd0r3rwf7qsajn134umbcn5ozn4twn9j70svbs9t8i2rx3g20ezllqtsxin3bw0ozu0pmy3edkrssi2czsjpwckp6e9hfsdenu8yv0teod1w6ckohci8i63l9s28jkbu722kvuzcnwwjajahnbphz8039fzhzigjpco55m7k31c7142r8c4ubl6s5e0yxbuv2qze02wa61q89a5zpujfej8lz261svbk5ktkkzcqu0nsmhx6cdak9eh3kjapldjdv26rvm30uet0x2poi8pox7tfpa3v5g6ld3jfgut3yxeinhwt58na3t86yqb6nc0lmea7jhd6v0dzoqtmzbzbjjt9az189b4qbmnllza34s15zlmt7h313n5ef1iplax7xaybbuas8zcwi9wfrsko2jg4dpmezjtnbg743jcjuxazr0cz6rtpvo6tfw4if895gsmxlwpyg8',
                proxyHost: 'x2o8ee9ax23z4qx1vkpuuaqihkfz2kdy78gq65wws8eyjy0qnczunkh7rvvq',
                proxyPort: 3459817673,
                destination: 'rq9opur80ia9wnrkp6illqkrvm97xe3fd0sd8jimoq7frwn50b1k1sj3ka5yelcthlkivembxqz2i4ihvduuarc5un3qnwopdfonj44bwe9ke3nx02wsnqhu9f9aadz5g92xpm3pnt0iu2ao78oipsypyox0pmnq',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '2pnbceh11o0x9q59vbmezupub9qju8302zoylvxhwohpe1kwskjmnwy1s09n5ik7fzkpsi6v78998g3ml5l0i1bkwl47vi9mle3nk8jsp722gc82eek6hy7giu09f1m5ldw9bcq4ls6iomz2mow50milmyezu08a',
                responsibleUserAccountName: 'evatos7qtpnu27bn74pz',
                lastChangeUserAccount: '4edfdryzw4rxms6teqi2',
                lastChangedAt: '2020-10-14 11:30:00',
                riInterfaceName: '1fc817y953ht18v4zf1g474uk0kaldelcjt2pj47a4uxj55dhn0i8ju8lgicpkzpkqfgkg4wznrb5pqno4dx5id4hok6if0wdyz78ptpq1r7qagh16p0n1omal85jw8qd6qnlehfa1o6fjv5hqn7ph646yz7rebj',
                riInterfaceNamespace: 'de0je7ql0or0f3f2kx5tbjxdoxlb0okguwh9s7n6li2mvwpe7jyihpx837h4jhhrot4hiwza363vu9ik2uccfqx0onf64fmjyegs3z8px1gldd7xte1wed94550hofvw7vsavhi3hef1u99j3y2z3zargwe3y9qh',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'sys8r2yff1rat6mbw0gwon2g1bqpkuz7f385r0yg',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'd6s3abosergrjl1wtl67l6g74hi6sdzpp8osze489r78nm1wbh',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: '6fpnwcpzubgz7zevd4bm',
                party: '10kb6d0kzz7oqnofgf38d2mnbrtk1tp00qqtkkdmyb5ff4606lggoya4c6qld7g3gobi6puxrke7fy5azuwpcr8rw8yxb4yy3520veztj8otj7f697sa307vzhvtekmtyd4n9oqxjrnmk989mqu9wdh5uyonbqlh',
                component: 'estbnkg63kkljr5kw8u8t6gnoqfie29wg9h7t3ld6547582dqih7c8gp8enstb6fu9tg42z91wgcvmatww1qrb2ok5qf8cfozz1iwxzvk4q2v8edhd5ng12b9qqp5bflrsqh9haa50xpdcqdqc9i7kjtd2l1pcio',
                name: 'fvf8ohppv3wikjmfdomjb7xp0ht8f7jhh1kc2uamip73tk8f0m8r5fi6kb2nrwuyt29h8f7yunfrizhymo55m4baichq06eno7qg9vcckc44fnrv8nd4zkztip2o2u6qfjubjx7s83hv75dxoqtuads0lqj8gi61',
                flowHash: 'prgh1muzdr4sgyuzp9mh3t4pt768dz5twk6h47rx',
                flowParty: 'ewfu5cch5x9nyvzwchys7s7i8kapgtqy9l4y8m0yhys8j0pthdxcnc1774tnbllrrtavwfc6rdgmnvqq53uc42pjbm3d7yzullahoiq5q1h017yx00ntpb04uxsfnfevsk9u0lee4m6fcu7blr4p3fsy6h2i4pxn',
                flowReceiverParty: 'w7ywh5lvwfntea9co8t0vmcnnnearuaqnvb60rqlnqi7si5p0i69n215asjbu9wb1s71ujzze23twb9gk24ymoqwnjpqewltqj4dp25lfjqm6il9i2iei5bf6rqo1oohxgnxcy7pjhl4nsmo5tvn4x27994g27wt',
                flowComponent: '67lbcbrf5h31sr1zuzub754p1g0qwna2njw7qlqeqreb4ghb7nsujmqiiayeswsvviybpbs3xv6c1m35dr0gk20ebrlqyx8ll7kq8c7wtj4axhcv9trq3dgeqqbnsgcgjmybdsd5xcoph5psdngnhqon087xtll7',
                flowReceiverComponent: 'cdfz0vsmrdqt21ifwi8audijkkbc0442w4zfxnin6f9iz04j6s9nl9dei9sdpp4pxt8fh9biq1rnlf6mvouibez6p4yjkdfqurhyrlmeqzagefwmhn68aiiob959qddz6085hfgvuyvcyb37jbvtn0x445wkvswf',
                flowInterfaceName: 'c9k2set33fsu0a03gprtisa1zz8qkjhsmodh5wjga7y4jny531wv5xboo333n5lq4fzlnn7yq7btzgpy7oz0c95dslijn3rogqr7bfm6bh99wczuc5zj233zaqfzm3shn62snfn15g97ngx4sgpfz7ovyb0yklshz',
                flowInterfaceNamespace: '7ykslg688v9atqp74mj697bdjyi68ii8jgr3yjmp1k9iosj0edkgl2q4mlvmkg3f4jbue2q003xve0811rp4bn173b4ywgezrhia8iw5spo0b6426ahb6nidevmoz883edep4fod2acu4kss6xvmt6d7vsw4t9zp',
                version: 'ln3t89m24kba6h70x1hf',
                adapterType: '0hfn0oskwedcr2nq1asjm7qvatk0u343858bd6ku7r6urp3tx8l1ijkj0u49',
                direction: 'SENDER',
                transportProtocol: 'hi3d5bppdz4hzpr8dwpuendptuglbpx213wkqxyodwr7srqydl5dc077bnui',
                messageProtocol: 'dcgcgizi9jy2ytfvu2lff3mdu7zp35tjdjcygwm0phdjt3z2r3dhgorl1290',
                adapterEngineName: 'ivtybkvpdbqu4d5ds8ctuuetzf5ff41tsct21ld4kvga2d1wx7gvqvvcr5v38i743wskm84hyqyswim5p5uj1efbu6j9t54x6hcbqgrdtr20onnkjao8znrtk5bcmubkt7pmoenjoaa5k34gyf6ja59p0fx5lyij',
                url: '6juyafdn3j0b0rlntvd7fdxk37tppt89ojga40894vua61p805e58wx9hkclhyugt6803hp9e1tr2sz7fscuyphxw3hr48bwr0poz1ogey8mjyd5aqtqcwg3g1w665s0o5nhn7r2ddx2012vryacs73ru6gsnxwqhibj6c5g6a6g6n45s39zbpgbbw3ncsy65aayimephbgolinff68lpmqiqw2mlv2ghqt8rg8ju6dwy75jta29os10z79wexjf9kjj2u4c6w17jyzf4cq3f5ent45xbih4uxe17z44ndy07h69xkluybjdhbbjz01u',
                username: 'xevhs7uxrgr0m8ajphatg61nfy9j5o21q5j7ugfwjgcafs8zqs4jl1jp5pgn',
                remoteHost: '1dpeid9mcqq9owf9674c4p9ru5og82xj708b1qqwv4v7tk3ic7vo8d2nkw8wqftrny0r6tu13xu3l03cmgewjd75xkdtpc2ehyucb97h5gwq0jh3row1kll22tczlnmeuxtjobr3eatttl4jhkhnur8xyxsounij',
                remotePort: 4546231851,
                directory: '4g5sy5lngfq86goehcqzob98mnm0n0qfxvi7seonflpxg15z7n2f897u1qro3t2o3bppsbu99majz9hcjeayppf0p8nllkl6xk66jiv7968n99mclta6auajychkfmctzooukz43qme4tzxr6ac2i73bpq0miowq52z9u08bi9no0da5iza4mfsacn7cur8uhiqyxm3pxefu7fwqrd3y23ehc4joywn2iz3r6h3s8pjvjbkjus9xzklyd7g71eo4aknqyxo1d8dlxjpuskxeaafvj826l6x1smtx8ahyhmi2iu4x406yb4s8z60j1ywla4a4wg215djdpcz63y4m89so8knbn7kegvukvemonwpq45k8gjkkn3em88zx2j1q8c0ax6ro38fcmpm3hnvd2qs9o24cijymbdgbdbtf4h88mmbf394dh9ptb9nhwise8dsz6z6e21g51ukphpmqgzl72aqyzoi6k12ppprqd9w87u5f2ak4yqtwlcrqnxltiy9mr6ulqeznm7f2qzz5dbvwa68yt0jjakk8y74nrbiny08nwzapf5rrvaykyvpgmbz2kb48br6z032jyl15tlbuv86mqmf8ilgfmrbjb8jnvsemzp6aluhk8ppbtxbe7e9c35y0mb0zilnr14gmi3a53cbk5617iwjo4moopnbd6av7tbfx33ksafkkzwklrejrfuzbb03vhhff0gvecwmoljqfn2zthudmttwpcpq94tfxi4jby48fnymrdqcsa7etq9aas4jm7qhk3c3hgv3xkfquwmzjbz6xmuo10l8qlhopm0n0b994v07vgha7wzdu9pvzimb95s0wvhmi5467982m06j6kgefh1ouddg5ludgomormcsk6va36nc5h2fstqihcdkxhs2ze6eqir3t4p2jforw3i3wjqaxkgf1ozyb9pktttpzivpfi5f3p4m22etyhgftdycqqn2xt9ldr5vwy5cfcdkbav31roec120a2g0vy182095604wc',
                fileSchema: 'ila6alhqvpjcprz99gt7ma5i44fw25tzx0plxaxh7uv59ye97fxuyfnpvsxbbxqhhdv24uho5ohj4n498qmrqb9f1z92ee83v95zvoxek4zd5fv4cu299qd42uqof08ec4v7hvkth6wo2u1c0g8n8k7v3dkzufbwkxdael9g8rv0eo0ib8m1k1wsxxubmy3wyzc6iekzker1dgpwem6co53odnojnt9h8eppbl9fobp2b52zd5n4xxyeta24p46cwoknyo4ppm24x7wpcmbkb6vubbge0lqbfndvb1v767vibysh06og0yec2o9j3gs3d452ki5zvff6hudmzw21hhxdnmj41gxkftt2hda57q7q64z3ezdqnsoj4l2uwirmbs0ab48lt0gl70qgwuf775k3n0qpn75j8p3sx4ieaadf829axewqgvobrrtj2obddkaq8qpjnmuntkgszh6742ue1k69xiuqd2l4p1zfubqwpook8ysynqs9s9ycyh21l81bn7fsfz6cjwiy1dzl7ky7qlzsc5gn9z2zqsfv0e6ds6gpky5bs3nbm3oh6buygu9r612zjnkhfe72sm4g1nekv0lqowtgp23gg4mkolsu50uwtrjviw382bntvj43au3fdfhn0dxxiscsmjvmnyszfvgdk7jqi8smvjjej3jrmf0krtc9a36lh7tdzxptdy9p2bjca2bk01g1kfdy6vgwsx0d6huh4hxpak8tnrxnqk3t6dmqj32ubjiu6rrz0d3abonunoea773jdcnle19pm5zm8rlbngid4y6nya127rhkabjmo34jvl83fdisot508297bipakqfq6pmyp48b3gb410lnpp5i24mtbp6iqwxam4k71r2zjtajbcnqdan0wg70pt3b1s722lte13apuoes7wtjzdjebdtceftcudmmgyy2n43v57fvptxniifa27ihreppb10hk8n5gj1tcniof8nvem1ulkh2fzmhrobcxkies3u04sloanw0',
                proxyHost: 'eic2qm7ymedj8z3rdqvy4rsnmza3lfosf6z7ejckliys24078mqk0x3fg6y9',
                proxyPort: 2566867875,
                destination: 'yf6k1vvs6tnhgg9ahpp7hdfzohdxs5zxjhk5ve3312j52it3glntqbpd9c2h9q8m3ab42c6fu1m75ezv9vmjjlzbo6vix3ds7kjer6vdnpja0z326j1xgpvrnyjie5thyayu58m700wjy9md0yt50mnbf91tqdoh',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'nrndtl2hy2ev02me5kiuix7044aiuuxlxugydvp3ojtjo6xw2n2yijbd4oh1fachk6rfft9ujk9erzw63dfxh8a98wd6voal1pyu3yfa43a7ee1x7jbn3il74gp6hoygh5voqeyzj95fticxim6xxbvi5ip7vsln',
                responsibleUserAccountName: 'g0vzec36ggypn5erc1nr',
                lastChangeUserAccount: '8oa6tqgp4c5e4wc7f7aj',
                lastChangedAt: '2020-10-15 00:11:53',
                riInterfaceName: '5f13z9b9hrce4txl9hma0hvrvj9v56n47o9mtw1f2yeljqxw7a3d3copvwiwx4fiqxs2ie92n6qks0rywfkbcyzxb9wobjkjjd03iu5j15zzmai8u0dbfgigxk1pmuvrsvy5rhs18s8gwyojqy1w6dofqnh5y8c3',
                riInterfaceNamespace: 'ztsfnwoeh30gb4jzb0ztbamw59ga0goaipzv2yy2hkfhaqzkrljs1tx1ajrsyns9i0boessc18bnt0hj50c0okwxr8t9fk2aqefpb730cimktg98njzoxwaa1h7jak4oohndakum5kcmdft9j2w66n2ughujyw2n',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: '87nixj27otwbthvgeqw3h2imvzylm4lkcec6ib38',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: '9vecmh8axttmv4th2r098uek9m68hccf8a6qdb8rxaz57xf8ec',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'wp478obb31d4g4o4649v',
                party: '3eazxnszg2bxmkxx22znri7o7lronlnkxbbid7r97vghc8jpwi7o0dulw44doittaf3dhbmhdwwwb7ncjb1gyv2x9d6yr2rtdmre4zibz4cwognjfuzvh03e7vh1fel8fy60n3369ydr062u83t1af7hypnwjmqs',
                component: 'jnaxqotiv1r3l0g51d6ne14un4colapxuzzje0f4wsacjrg0xbhrx5u2i52l1vy5qh2bsu03o9rc76dmlrmkexefvk0emmsikqe02bzs7lt88emmjdylzq3yp0xikgpqt6cikdz7ijg4pczvkiooa5trq9j4o0bu',
                name: 'ri44df78p72inwbkfpzj1cba0um3bzzgn76lldu190witavwgdb2yc8fvashgim1shb7we374eya59vyj506rglpave1fo7espkxjsja4usp1gtkh43h67hg4pb1dtpvfxi01h8zvrcy6wdkakvd4m6pawch3bmp',
                flowHash: 'jvwbuq6nh2ikrpd9zoyeitf96lfb238pslz96nld',
                flowParty: 'yv9nxd8vt13fyopifs4v2fv1ldlmu90t3j4yj1l74e8ncrfxx801fd177g5tktiwgcev3i35bomhlps0eg4hy3dusm87rs0h58usqa8onzgvgaobdwc6f5tx74bwhxbu9a0ctqedtln21burxo0bq01tfljd7g8e',
                flowReceiverParty: 'h0td1d0g1g31if94cde7vf3ufy0nbm8wthydf0bkbs26y9rx227aw93r2h637bnr1o8cm6aaibfaodiqg3bfe8qc6o6toukwqq2m3mwei1ndq7wuefrsfw1mlp4qsjg012reex8zq7n4bbebsth5wpmmw3olzfcg',
                flowComponent: 'csq69xjbegk1bmze121mzau1zqpxlcer9ry1hmcmpz79r2bxociojz616ei35qkilg66on4nwrbat720fkoascgul8orzur4a01wwkacvjstw7qd1ayn6z54te9q1dc0th3qdy4r2la6aywrnp19li0ovfc509r2',
                flowReceiverComponent: '6z7815lqmn6oy1kh13h0ifzsbkgr5a0vg5nj8xbwqya3m84ptrcog8tzne9pwiux5bsffbqyqbfh0zmt08swk3f6tfngcc89jjqwj5jf470wmbnt4y3f78vca304kx6it952uypu8fuye0whqagl6op2cvlcqz0b',
                flowInterfaceName: '2z8yau6hgoto4yyokmnsk40txnl4b226kno7f848j05sl3zglm9qxtn33o7yyjvxyznccf56834dt429zj5upalaamfa6wwy4gpl1ip83y91ldd5hrla7k8kfcspnjwbm4uz6z0t3yrh97uxr1h463kraao3x4wy',
                flowInterfaceNamespace: '0la4exkc4kdruw0wpbk7fc085lc3yx3so5gdks539vi02bw9v5ny32ifgbt7mme2jc5mpoawi4holoxlx6jiwq3cf7dg1o892znjaa2xtfeh71rz9zgmas1v8dyodtsmo0fl0yhb99g6d43iaq24gx365ejbz47y5',
                version: '5jywlmkb1fbps08jar7z',
                adapterType: 'iwmsileauntytequj1l5we0el05mby4xp2gky0i06qt0kbvj9i9nw8r7n0ae',
                direction: 'SENDER',
                transportProtocol: '6rif95797fswq9af3g71lbyc9u9g8exv8y5k6v3qqmk4kfmdriz09eex367m',
                messageProtocol: '6gzydq589xob3i3zu0et51tu81fszagnhxtp0u184b5rq688kl6tmg3rthhv',
                adapterEngineName: 'b14boe76l8apjpr7f8w6c6kmhp3fjw7mmd6c4inf2cvtkx85d5lschry1m9q2kcqbssgul13q9ibkone9ixvnkuruwn2gtni5mvwc6u97eydi02yq4pz4lm2wuv94fbev8ywsycodzet67i9r5r90gl53c1snimf',
                url: 'xgnk6wcodhc559j6xz6q34hjnvg5lxh4xgj5js8ahfs8njv3h9qqeu3b8vmbm9vh326ti2n5jyi7r4iuk2cc0x279ha1erkkn5k0fuyw889ra78z3bqcpyb47ywajtxl9h284zxae5wo26s1a4qsq43ad3zpj3qn3ulhpyke7r6ahywp43b7e6c5srn3fq0o699reqtmpr5t76zpqadva1dcv1cjv68bjqvkuza1pbe02t28hbhp8o6zsmnp3amtc37jh0v2779qhiajsg3ltwhrb3klqq80jblw3uv3475g33ux5gqciowlovu4s47z',
                username: '9n71weirjgm6tnl9n7ofmhba2v60kybz8y9ok5xx9ilh3respru4shqhwekc',
                remoteHost: '65xmtd3z5sj3j1ebmuq2xako20mdyd5gzt54olweer3xt0hqkvlbdze8h7f9juilel96zq9irp7tggpli51c35k6z6nuxzmh5kygckxdnwn6bzqubrd32id3t9nc1dk3dv6j2blvbncixqx8qpn3grkm53ehoopc',
                remotePort: 7831556108,
                directory: 'hioqhl94tduum8qyanzlmtmeoojuvkcu1re5djyk1xp9qatkoo37awqoscionx0xu7diwml8nij486afnxoe6rp1kx4hidq1ubwseldj5relxor1ktwbohsj15uiftx4uxnrz36luo4p4m5ne1tcrascgyn7uv884g8cc3vut5dd7ty8i6ip2a1y3yl1kjlrfp6716cp0agp4hntjpassmfgl7ig5bbgn8199ad3fy88ls3vmkzdgw83jdgdbn01y77cayy0nhtwnrno91g1n0pnn9mu4l7srpnkng266q35o1p864ayq5qy6zgfv4phgivzrop9r4dl54rape26j7ag5xkl4u4zxiysndn6w2gzi6g5djoum5htm1cc15mfxd68e22s8bxuz32jx7mmbl0c1fl2isah3vml1at7ajlqi78zsae6uvy6d8tj1q0jpfdnzndn5ryif988gq9ex0e2ui0sc0bxtlz50n9c9b3njiitg7oov9xa9viz18s5k4y88jwy4nyln7tq9t0czevk92n4bk13i2pn3vdfh8a9mr58btzwh8sasetq4v4qmdgnficcw5ds2u05h2pyp8a6j0ajmzgvql0uj59llo9sfsq5se913mkv5gi8itpzaj9wj89u6dt9w2iz8xj0blcy247aicvkk36xyme7fev12sf7ual1fzfsz5nz8imomvmi9j1d4w19cwgtd17cjr635kji2k4uo79sb3mrn3ygtn5ynl4a0kbhmajqk05rixoswh7wd534fjgchutoiutaebg3ede1rwfssi31kc623d17l7jcwrna3evmy4wvvaabdseq1tmudvh667uazd24sarwf5q1t1ntzhhim0n420y1kk2jzdk95yqfcboet0okv297jx0blvs5o4dr8jtqf1yj8qs09qut1mrg45i8cllit0rf5bdfq78zcxdx1sdmahw5zgk4ipz5740ck42mhkiq3l30sunx45x0fynyageun5cnwr5d2r9tq920',
                fileSchema: 'h4pq2983be41unpr3la7x8ykc0xouq7bbancz54jr8qal2d3fz2m0thhdr9m1mo44u5nszm7n7k5joekra3qfcgxl322smk8cfgy83m733flzr9humdecf6icmjgwjplo8pwvfimupbx0kd3956x9t6c5pqzbgtbplt6a63abmcg2r0mut4mgx0gdow4afn7es2wbfqotx8gqqwpdj99kbladdl0msnx97ekp65fc2fqc0srw240fo9y3630piqiuurxbx0zlhdjfuz4smpx74git40qh140jou2o78dt3kgu4qxxoaofq2qlkgbmxvuw4iltmh3p2dmkhrks6cdznn83azpbrd86ozufol8qgenv59gcm6r85f7m4xa5ght9h943n4r2hyenqfemjaj8luydj442eh349brzzob460ma5apb30jrvsex23u49qlia3egmx6hwqe5wc4rcghjjhgwjzyyd0vphe352g9febx4xqnbdjgzjzy8r4r7es0prra7qgs5cz9xw2pqd6ffunp2qgepf4k621xsr0yss8mw657qix3v83z74ukt3mb0fponjdqt6w3gr6k0f7alhs3rb4lmzgfogojc4vrblec12wuovp6bs5fameujlr22cev8z4r1djtz7e8ktyxisos0zxperxbv738rb6q2e4crjbtpoowguw8u2apnovu6p1l44a59stwgy2iamu8b4rnhofcenw8uamjhn3ttpyqbby3uqxbgjkfsi1d8vpjwlhyj1gy9gxih2oc3azjcnh1o7rguqq6qh7wnhqiut2vyyfx6ev3f4rezup2d95z7lzi6xcrcl7zwtc9rtn1pt3oa2f5zzxk6goajkkmrgazaggh98bdogtm4qmojfhxhx77xe2umza0i9ormetg2b58mws4msm3dakshs5dp0kvwpo3uv72n52x1u2sui7i2ygk4vtat1b9o4co4zfo3x3jalx1tuptbppa3sir593barxdbdeeao3h18hg274m',
                proxyHost: 'xne0qoy74qkjxo33twkqcfdef1atee3u2oeb3216vl53ys9nx2xj0e9ct6dt',
                proxyPort: 9811686932,
                destination: '0hfyrnm0mfrz29rkmcpzewb7yaxgrsnmxgot7rw01rr7dkimsf6bt1wjkieo5eq6j755fenffsprephkqfhdsc26m7wq3q4cy2klr6gprigd9dh24jd8z11xr8hyd3u282d6fbsvgo24ut01zx56peclhhll73pn',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ag8c0bj6kkpynolw8d1yyd403d9wwqj91do4lhcm4m4d2x9xgu97zlzwogq557d70qr4iq78x55ujzaz4qv3qo68hkazfon731zri7apl24z277p43et11cdtu5p2pwucvt18sfybd81umb4az190fnr35zj4bxy',
                responsibleUserAccountName: 'pzd2vo4lyvzgpougtqlu',
                lastChangeUserAccount: 'mns90n84hbrdd0p6bso8',
                lastChangedAt: '2020-10-14 16:36:53',
                riInterfaceName: 'gilkitq75kg55xuiuuubagqnk8qik3mqrynwug5pubgwshv25si9defm4pxcoludqigqj2f7cbf71ykmglcocp21gsr4xuinasooje9tmm4wt8ismumuremebzd240igd8onir5dv54es28k2tuvk9rfskkruyu8',
                riInterfaceNamespace: '1zpyo9fh4r7g4zciaz1fwtzhu89y7kopul9g3g6dkt3htz6sw7xfer7hdnp5aip59n5b428ykjd8vemexi8trhvicbv5gdekzmokl6ixpfj2jnxnwxq6np7qzfhfy49kc5f5rzc0m9386xwk4pw0oqvybubajgpf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'hqih288cc7nqmnws9ykbur41fz7i31y5buphe6cu',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'nwryvny9hpghaqe3mgmxi8yntvc2jfmj7ynujtrrpelaxkfx10',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'qs2h3vkndzsqf6s2fhkg',
                party: 'dqzgmbstgkhlw4hcg3b7z1agau1wu50zz7hv03c8bvrq63ncrr24wffp1gy60jmeckedumdyrckbilcx6qo6gw8s3l8hgccqqknakxragh6ubfyo55vqkxywfswl1cggi5ailapwbynw7pm3tp8xa0cf3h1ondj2',
                component: '7lsrep6zqrf7gppe679ybdwv7r22t4uebtv99y5f213hy8x0fe7env20yv552igorz8thvd2mr1wwytzxce2mfsgcqwo87966byapbze4xi3bylsmu3i11mgvfnbjs1qpw3kggs9mptnnvvglx6z7w665yejl4qp',
                name: 'g33wziu3gd8q7bgeo3ts8gmphlltzz513entbirrom6gqoaptobi3197qrg70cfv6cmbp03bjc84ty0fxktemxb3k64kpyugumy7mql1diqzps9qya0wx613uqve83t9yjr05esj6gg1ak7747r73saffvsav57m',
                flowHash: 'q34qkn87kf0i44b11otvhdzlrrqok2awh37kow8k',
                flowParty: 'j3iiewgtjqrhp8xhai0w5vki2api79fmney1s3xandtx97dddksfzdwme8doo7y0wmbcmfxnf5krpf0a2bj3glc5189pjepmlbj0cjx7q6ph99fz5nplwmrfv71tsvc1epqsfwb3wg0mkff47m19vis21xc44nh6',
                flowReceiverParty: 'z24lzewm67gecctfglm72sfq3hu4c84jqom874gxxoolple1a56wnxbh8pon8ysb9qv87mw499zviiu6kfu2i8bmmdcexzjttr53apfdzmkjhnh3ndkjyh6k5lvnyhspbqixqkadgflvkztekzmhj14f6ycyivp8',
                flowComponent: 'hy91s2alcy3vddu8zbhh7a43yioxadqywo9dl2f8lsb6otj9ribllbziypcpv2nsfn50tet3trgr8kxc65f6bxml03sftc9ozg1mwl4g2b6ok9v8zam39sax20tam1tx2gk6nz51kpcbx4lfppe0li9jvhqllftb',
                flowReceiverComponent: '8ne7yux4i14ysjmdypl07rap811n3catzj9ulpepmddxjqivdcztxpk4obh0xh6zggs2ksk9aou1xn7g5yhsnv2g0zlly5hxle5te56zfwvrx0wuzvxfb1lu03iqavaq3ep5cezm7h6v5fj3xq8idqmis7qqraqa',
                flowInterfaceName: '9vfyre54dkewtrqzmvekqfmbqjpudp2lxbkhxxacz175uum3z3lgjl0uoyzbi0weif71vd2ql04u6k5tap28hs38r92y70a2z7zo3bpd24ebpwns4yr4fyn06eq1gdi6eizeo8cv0kjwpc2ynxfixp554yjcvu3t',
                flowInterfaceNamespace: 'kyj0mkwmdv72qxu0m3l7wfgr413fge4ie4dcfuhtpo4y6c7fd5t0qwo1b4d8xu1hdadhihb8nhej3etkrc50e3kvtnx2juwx7hv4mxylijwb3byog911ejp0g3huyjh7k2wysbzg2n8oxyt81xvyobuie6v1med9',
                version: '6x4i1gh46lcpdx6rhxtok',
                adapterType: '7r9tnu1ik39sps2l3l8eni2ds9ez8gxqpnw8nge9wyma2b22xje0qviqmbgs',
                direction: 'RECEIVER',
                transportProtocol: '7503bqcu52d7pbewprri81aqlnea5f8ovvyns03ilfnvcnluygxiw2tt2dzc',
                messageProtocol: 'mphc3gnfz0fmp43hn4ellu6hwllo4vuvzftaxzt2dyrsq1p3xuge6vcmkcna',
                adapterEngineName: 'vhyk2zxfe63hq0us9h2rowmg5b08r004s2f0eihdjjf7pjov7l6pj9d5o6d95cq7fpg6nbqxxwijst3f0c02zhvkndf85oxnc5xvtol6sdbata4bbdkvvugqky0z6nb398x0dv0tkiv6ef5e3b27qf5cs9ciq59z',
                url: 'x75fc4ewm82lco3wcszdjiow9yp5b4oy8cmd1b44ianmolx25qwity6et49ydwyi81455qs7a9iznqh14gdj3evkg4vzikf7k08i9upw0wl8q5mjh8dmrrol77oz1m7y9bpmni9bvbq639y03bwsv7kaj4r50vmou357tyykljjp45pbb7qcxscyzfzxv4edon3misxnwdztwghqmwy7eht1rhidr4kfonb2k2fh2hknirqh5pwd49z4nv2jll2ds3y8gc0901badru8iq7cc5w5lgvhbk6eaesmhohupp7xt9s3q6gaoo5bsim0n3d3',
                username: 'rh0yxxj8lngxxg3xpnb2ol3rhvidalmm5js0fzlauoikz4fjm2dqrsi8suxv',
                remoteHost: 'x14f2yxwx2x423mux1gkr2je4peycziu5f70pux7v28k4bhartkie76y4oj0bceg8cmrkah75fzd3jh9q02kkljl39q5o4a51qkx2704jo1vv9l7s3ig1u9cj5o05n2f077xps2vpe1g53gf084uzc12by3ocrk9',
                remotePort: 1710389406,
                directory: '8p3soqm7rlp0x8ybfg6oosgbuud5uqfscjrviy9idpy0mailfofym8ano4ezwgzovbwerpunjcihlh7a0q4asq7sq7tt148mvf5ba7i407198d1zb24t057x6ng0gh0k0412yguucy97l5pt4i63ev44vmuohpbdf7m0pwovth2ksyspaclsjm45vyfdxx1ekjmienende2m8kce3df639yv72aebp1hq6ksaa4dm64n9yzuwgfx2tz74at7cyn2ml7cl5zdn8oi7lbp59474g1ljc7qsu1k5ros02o6z3k1xqgqx40ylc6x6ha4r2nrvfrdbq8t25u5qj3q5faggmbdadxya57irfhrhbjfh0wn7lgczrkcb8afityqqtfjj5cc90phyxflgqbalfmzj1lwkq1jfcwtqyccqfohjrjrjlgaz6l9moomtnjkij0dbvf799z33b2zklajxv0fy1wc5l5y6gymc6qy62zz1glsal1rfn5u2ch948eia6ja49i5fpz076gpn0azpgyqe5xlq0y1f6jgxqmtu1v4j3p8idf9zpusf0gyq7e6rh2mvc3er70xfeu917xgu4xwtnhhq6zaf3rkzg4dzz9b5p3rghcmgxps0xsapbnehssskesowka0gglldsasmpdrolj20j0eq2mzom0md8mzebw4nvt151wyjyka600l96evptr84qk8910fxh196irmvaqej3383ogn62e8novfvupy8atj1nnfc4ktchlbmkr4vis0hytn60xxytyiu6dz6wlzmbqppzlglfsrza46cg8cr0pug96jfy7coqzeqsyen8myoz19jkknl2428drn7r7mlwq3en1vdqv2d7kfkg0eo6nkcgd5j1qmgx4krtmxik3psigz40bzamzbwgw1arzj6anojkkt2mbfx4p0cygx8vj5bjvljdxe5az9y3ovp1p7ufs7bie5azv9i5mnvkhtdhqpgzskj18gv9jwaisopa98i2ankzk0e4m3xj3h',
                fileSchema: 'xob0234t9o35f6slyv52iuzn4bpppfm1l47im6i5jxy6a46fz8l3vfisyl9tapte99o8tw5q4d60qpadz2k5t1qmtwq7yhmzmodjrnus1uhh8tgklelno69mtqyml354rnc9zed3hkz8fuurg25as2ng6d1q2vn4x4jh26m8wjwei8pwxce6c9kszkb81u4w0wjeu10b4kp5seer59xlhrvys2fq17huh5l30fo1ohh2sptya7cvk6jozw3elre1g20dezf5kd8w4sbu1pgnkvdco9f7soggxa0j0sxe1dbpdf8zlj9p28fogdlnstkck0nchiut500n7bqfm44l7i19np3gj5xnjskbqaylq70t1u38dmazez39vjyk91l7qvb4gcn27hlg0i75fxhjoamygx3my2rcpmasfm4kilgbyhip6j2tmm274cxz4cg2ce637mpco0vnhomwxpnasu9fd3o1f81x5hor7git7yjkb0cf40jrzxe435fy4s0f6wk1z5zx6k0rzevt5f1hguulo2jpi79wfxyfg21t48vkykj70gw0fmifk2sw0odo3n4ue78eexy34vopht1hm9xljax82r9ue59efcxtt4g83g48qumd9tugjzb6qir32aqa19gbq4ddjaxz4a82gc3pfeginf81mrrozxv02ttq0s94v2pbx5brrl6x8qdxeuxokz7t522ys0qhne8kix667pwq5oiqhxd1iucset17sicpo237y0tuik5ptblvz4q5xc63h2ivmyt61nwm2gtgtrtfx18r99lw8l3hnlgknk2snvo7edcrb7i4o6hf04tcveeimzq21h15g2clcihpw5ot2od1t9gspb043y9x3idfntbjr2yrvaq3dp0mhp41xps9xk2p5ox9zxl8g6b77vq92xdktkfmvyczwcdsopxsi5982reefetgn7ptatxfbztrx8csozm7xf0ncr0mobhhf6o4zkif7n4yvxd36g3g15he1ncyuezbwlai',
                proxyHost: 'cli0gmj6ct09jvh8mw5ktz0ntfukxhjvv8c9h9neu7n7f4hs7chaqf93unao',
                proxyPort: 9995768094,
                destination: 'h53jnz0084cl1xsjbblavx85ckhk3qce80tj0d4ml47wlqqur8c7p2yn65l9oeqsopyqdmc5plsozz46tiyqvo1nfyehtu0sg07eqd1jwle6cvlvszhnngu7tvyhfemsyh620hfq60po4feyywmz1950yfgxu6ia',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '6vi6mpptgfpb86w28ln616323hrae92qc3flm2slvz6degn898tn3ntj5bjmjoceziaab2ek2dhmrza9ixt5a2gndzctkj392fuuj03k80jkgfvo27ecl9nbkusi37eiz1u3k0higzpuwowraa6nswev4kbgd3kz',
                responsibleUserAccountName: '11bkvuemb3isk7pnzr89',
                lastChangeUserAccount: 'wd0js4l4fjfxbp84xox7',
                lastChangedAt: '2020-10-14 04:50:43',
                riInterfaceName: '7r3hvbk5b9ztdhahr3mu548703c4pi9d9lbvlwecly0wq5b36apy8rlc1gdc542kwfbk7ai8fzbk9rlfusbzvlcvlpcn9inggru534bnxzies39cjkxighmr1tlss0p8jt6dynsigx1o2cvvk5tswkpki9vks8j2',
                riInterfaceNamespace: '99cjnh1mdgyqcl5faqlhg2hv1zav0r9l4ia6ac4dkap08e5iohevjj2oru8rg2s8mir0miuoln6zsl1f17icl3p4r6omfgdpod85lldmt471ee2bvlj742iwdlmsual2952l0c0iegrbgqstktdevsap2thzsfpt',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelAdapterType is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: '00tjlof1wawr5xex048ni2iv9j6ii9f19ghf2n5e',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'o8n6thinblytspnagmmufc3amun0n0u8hhrf45zjs1p6r5lkn9',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'lyv6kmbt5o70jm8lh5md',
                party: '7abpvokdk5hjwl3eij13rp2pnu6xn4tolzod87a6r5ordz48tet2pemaaxat0ay1d22j5t79sh8cf0iqffb1bj3mbm1e6iruqa6oscf4fmyzax9m59blvqgsrqa6z89pg4h7v8yna5687r7k362voliuso9bakbo',
                component: 'qh8mkxfdhr6u35oolo0c7tlq0qdaode3dx0fyrwbsob3kuf70fdekc7o9vluxznwjvsp3ei2o96z21y94pip03r3llmhgwicjcx9sklur6ywsabgdjguboqk0rnmm4uggh7lwtit0kjgcunriab57drqmdwv169e',
                name: 'vlzppdpzk4cnoljm652wwbjftfpqhrpcfytl9icvklsivvyssx7x71rsajm4epksjgte71zf19agv0rv21vogzju3lw4ndl1vzprh2y8kl1z8n3fnufx4xhsfrvh6ilnua10mzgdfrppj0mq228e62a5s5v7032s',
                flowHash: 'zex6bynz85252t0ceh7rssf7b3safntyn9jtqyks',
                flowParty: 'ljgmtamwnnjavuk23ekg3cn2q9oiubvzdqqes71gwb705puoyqfcp37dhxd35yhake0210t6ezr2pl1wt25mu2i3c7bpz1v0ih35sgw3wsorty2ayntwlxez31stk22bpeahgski3whg8nvy29fgb2y1lig88r1j',
                flowReceiverParty: 'yrf3pl6wwrm7ecq8dyvyg81t2xd7u0xol5bau57gxzr5kr9l3fmcmap4snnb8meng2n0tcjcl5jspb616c4h20kw59zp3vfor46h287r5luffjwjvkyoh8zyzjwxdrev8nflo0mh76k3emmkapkbae2wdtilvmzr',
                flowComponent: 'nze0xbl2je0u2y75echaobcl2v3w9ws93loldeoq9vcp7c1k93zgtlevbjwtwckh49ubotz3qjvx7jfzpautb4iqh4gsojdh7xu9e33v8zr9fh8w1bcjcxxwn6w7rhbl40m1qqjihsfndniqny1ryazd2o8r31c4',
                flowReceiverComponent: '8dmkgqrtgu7vnkj2m3tmpayir2s6etlqomp1hb7eixlq4q0nhtg38dqincj3c4hhuk5ugrvg36v4nau3l29flzmspdch0x54p46nrqf3b5s9hy5xn9huvnd0qbl1gx1kl90aljxkglgka97mn92mu4b7cjelmtat',
                flowInterfaceName: 'lduyjmis60g5bax4ebk2h78x12qw3opntxko7wicid84begwknezu2ujskh8hn8afeql5v49omli8w9iv8w21jvy22qs0oz97ryp4fp43bnjq5vg21wb034ia5a4ha1e367wiv89t02o2pay3nelblrjs1sq54a3',
                flowInterfaceNamespace: 'n85qnqc9ha7k15bg2b4d0dr9qhytolggcyj2wvwb1vlee0kujbs8xljyhgezw5k502hg4fnvi9bxecjcc5t1517s0h642skvkw5bun0ab9j8vww4tmwpn673rduwf1gr9qeixl8wfgkxjvszl9qjzrh49wepttzq',
                version: '8yyfl5yfigfsr2u0maxu',
                adapterType: 'lmz1l6ac204879yvfk3s9n0cwlxoh3n686kxzfwzp2zvsew69xs9y582bdxbd',
                direction: 'RECEIVER',
                transportProtocol: 'r0xjtxvtcdfn3sqfmljofm3p3s55nhjboftcuoehw77te1pkx85c0ih2x2d5',
                messageProtocol: 'f10topm6fgixz7xv7a1b7xml7fm07gnpsaozocwrjfll4ywf0m2vrz8jftbh',
                adapterEngineName: '6gyuxpl94lc7zytami97m6c90ed79pmd2atd5kzbhljslmkrxz9us8wbt02jm2259bi1u7o8vs8045ybu3pd9hgyrp06uenz4l9asose3lnjxregtfvkdvy0j4kugnat24hi3xx6o1qy5v1kv96qkxnbse9d63pf',
                url: 'qff5m3xywr0gbvsktay14fdkhqsi30irmt1t4kqxe0fyusddn117v8mdnh051icbw8756eank4g9crqz9eu27oletd4nabns81px7e829khxtzrrrbr0kcj3cn9vetakn3ns5qhorxo9ceqcma2q9uch8a4mhckn9fily3bengdvfuzqzmnfh2y8490s6xk10t4wfwkrb4ehax6aqlddgqmr9634oi4kxa1luq1jde1gu71ccb9yhzlcmqm2v70q0yiuczhzjy481h1jibugu12ny01c0pdvq2ozg2zrkqbvfyqfd6mscximqjybmko1',
                username: 'n1ugph8tir6p4nksm6gbcs73uefwwnfvk9qdx8siz9xgxrqm6ejtq18ocuhy',
                remoteHost: 'ljqsx0blmlubjd806fvk31nklutdvkdqrjispo1ibokrrl86fznrt0n40lt2wsdzg4w3nqtb7pfsh0ujaqlgst1kts0rfikuk4aq2osyyvabouluhyzg1ixn6uqbfyyo6i601k3h4xd2cghqkaub2fs86w6gvwd5',
                remotePort: 9925124518,
                directory: '05n9yvro6tee8c5va3g6zz1lzic40xxnwi2n43jhe90t42lget0y4i7q1wxdep6u00ugmzfnu4emng2yee0jotbvpn0l3i90s8vcmuw5c8itho3vfwndcha1hoh3ccqy7xguofr48cdpflcttr0v5b2v7ojetrxgpv3tm6zf31fsyazc71p874mu0po4tejjc6ngsegzot1meodzr14q715827ofx5nhj2b90n4pm87ikuz16r253kwfakk0cuvxqt1mvqiqemajofpr7hxypjr07f4f452yoil2eyhj4t9ntt96smsia1n0b582npqqq2oygxl3ssncz16srykcpo4xkqmf54yhkf86g16davryi4h9r2ssbjz38huk1te45dtowpkqcyc8r03f6fo2rub4undaww80l208ya99yn2nnhbci1i3jh6o1gvacfl6i2nccjhaumnn748vqsux20n4y9ouq3ty42hj5qi2j9lyfiqe4aic78s7wlmwy9bf25pdww677k1z6odcenooz97y58e03n75tie47wg1nv2yd4dnl23wt08ncczdkpnm8i0a6mo5knivp78bbugvbbmefdjkc2qmq43ivweenrm554h8pxiibdl9exvny19x4hnm0o9892n9nbqfslszharqm9utm8z0zjn7ni2wz9ksodbxznxtsz4vaacsa9extqwyqghvem4bpkrpjs6hgjvdnp7ez42a75fx3e2kze21uouazwkzs44otkf7x5dxba5faz4kdday6ht9g8g1csl6lct9t0eoo8cwyq70f3r5hjdxxwosm9ptbo0ff3lz811w9ovtxv4x2lubfn4z5je0a5t2sb4c98y2kt8d1xt7l4eb7k91j54l5p3clbsgc67shcb5c2w5t9z4vknw3w3bijewwa03qzmz1uvg9ddn6plqll4a4ajhw850l6koqrrgb40bmu3nus78r008bh6bwche5mdepuw5jy0nasbezptcdw8q77e0e1waxtew',
                fileSchema: '2k5gaszobxmb12er44esbp6wf59k9zev5xo6l27huwj11n7vfuch9jxwt7ijxpw10g11trbeegvwhytukrc4umz7fj4sbswg5aly10fac28hfgsdeygfrx1bs28dysgcv1z2gj7ziol4coi7ge2v8kxngbzkqupcgaqgww46iu4i6ng7uajkhsojmx46qmmhptb1bcrs7cfs1adlh8h8p89hdiezmu68ezged97lcppnb8a0uvna3k0qmh6plbsbca15m5nxft0h6wq76cx58551dgcdk0gx1k2zb5z4vf54glz9wlr4mhd168v127irwj1m2y1tovf5s039r6qtzzizrq173pz7ca4xezeu7spqjh2s5kushkiy9cnfhx6pv7bderj6ylvx4gh8l616f1uj2zqt21ox5u2d4ow4tnpybje31d4kssr9p82j0zzmu3jn1rwjgjrxq0bvpi1whntb66bp3k80v28844k600206z4ps7s5q7t9flurhkdefblii1775o837484oflrotdp60t5eis4cwyrn7br7xbc1nvv96wew22tme7cgqa6qe8ij0l0yswp9g4s58zfffpyaa1f2a3z0r6w7i2mm3k0gkx3t04ehf81ic5gnltj0bro3g66o0oswg8u3xkk24km07zrasm7fqs76t5i7phh59gm7ow90qohpg46q6coxyp4xmmjknjlha44j9o34us5oqw6jg94vt0lrnb4j6g6a4i1337erzpc8g9zckhn9zx3ikhpodyvdl3v09pl96245nvc1c2lg4gz6264y0jj9n58mvtqk3nrfrnvntpi5uefk9wce2shtkkydiscgckx1yrzspp4gqpd4ml8gf6mjbnspvlyc07kdi7noaai873iwynmh5zmp8jrl7slf3mu7lfkpmjtp5kjsr36rsuiajdn1sga780qxjsa5dridgu5nh8dwv0s3bs6esa9qpzxtgvuuulmxkpceypg5a62oi7s66mxxxius8fe8kcq',
                proxyHost: '9c0k6kr89srac90lftjzoas24w00e0ozwea7eg7yuddz1wzyzw68pgnkhx3e',
                proxyPort: 7863550587,
                destination: '2n3jueq4j0a8gvjjmhb3ilmbata2s7l042yqortzzm3xmn27z9h38rv031klhockrbbfy0fbzerlyuid8rynqud8iyho07z15our028d35cj9e6y5w5cijjuurqojfx7ppvj6cdm35vaeb3us663yqklkltm7yds',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'j4c1z8cq2w2uomvcnpltx5n0ztsejmvfeuratvrc8jkykuc2ff80p1669kpbsoq748ysemy2xua43jr8kc24lgpc0b0ftcex47hlomqu5ofgp5fgpqcbpww4unuioc2lletgwjrmfnlhsv2lcokxhlfro13utuun',
                responsibleUserAccountName: 'mvnic0vp2azdaf8ee0p4',
                lastChangeUserAccount: 'ywr36tlbrxq2svx0bmyf',
                lastChangedAt: '2020-10-15 00:41:49',
                riInterfaceName: 'gd3yut8mxcaqgmm0m1pum68v81bcc0dsick7zbms15xckmkdn40hidjsctji66hfykv81v0slrqluq3yqpyjosz6ybai4adf6871ql4yjdhou5hvp5ak6vwsu3ulnnzewh8kvd88uu5alzs0cn1vs711em5vfej5',
                riInterfaceNamespace: 'lcpxtvv7waey9tx6xgsukwnw13i08bp191c77chljkjlmumfjrf8n5hsiy8vpyndzjcovvhr1vm0olo8s8jl3athojlmobd5trfd2iotvofv9w20g1qubho9adt9flovbee4ze9kqj0mi8ba5sj2dmt68cgey3wt',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterType is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTransportProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'amuzx6jj74xtew6rcdrvpd1hceak9hfoij9i09mt',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: '0u10sic8d2uoqmhxu52t4gwfvh6ectmh5otkshngsjvpkq47df',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'iridmff7qidqmmdvsr0l',
                party: 'fmk4b1j052gwon0l077uj15s759lzklkwn2tq3lm44t21r2itrbimtrmkoa6m4ktmytdu88jjvo66tdkui4yvip10bvpujwyuvjzjf9k5c0u4bxw5xqgw050mkulpkboy2hj6wc6g5lfwgd4jdu99p971kh4mphn',
                component: 'lq2y89x3cpg4w68akmv59ke8jitbtpd7s974cqe9io6nje80weyatvy8l5ffij3xsrt1qo3osef4jpw7ata5yq5uqrvdnpdqf0a1s4x41pv0cmexwrd5qhzl0nnfzo8xkrcf2ot8yed00ty3y3fn3tcze78ndv9r',
                name: 'rkp1nkf5zfq8chnmj579ys44dn55g6so7l0tnilwqjwo3xps205xyqe9asr90selyy0nry0yc5fe928zzj4wwyp3gb408fcrpe93exb3rb0hvj0d1ls8cw7y6li3t77adfwg6pnpdtmejxdgomjfv7i0rvf8cbje',
                flowHash: 'mtbq67q66bjuxjtdhe3t0rtwuerwdxgi4vo84hri',
                flowParty: '2g33ibs408g4dfxa9hm7a30fzb0dg3p5nq05mah223pkva7psa7kfbbsbzv4mv90139x0g8hrk975wu6aw0df24ncxwjxwguc8kiu63w2rtnlr42zexc8a9o337q7ue1dejxturn7i2jpv6tzn8gqoiepabtutei',
                flowReceiverParty: 'u6661fntuucat5l1anr9hs6wadrt7tzgcj850t6w2f9rcuhj9g6tvkco537ifha61216v21cqwtel7aiqjhkmi7ozs7bl0y7a6dnczz8849q8ejjhfk0rm3g66mezknrqx5mxb7yn7zp9uno9fshts1yaqddvz7r',
                flowComponent: '29z32zg9g4wfd4wk21kkeelei18gq7xp48bkpmnyxaz6jdlna3gxdfgjdmh6gcsonhq3pa6vuccdqzffvycscm1gcm339qynnurhsr9agylo84pnkkivw3t290upjlzzgwmo4wrikjrdrxy57bbzng38nz81c8jt',
                flowReceiverComponent: 'v3mi46e43z38hx9v8qrkzwblikd8tb2cqq6k331aakfxmhk80bhqavpspz2i83c1riwvwhtzoxjitfteuzt9m4fj6qt0fhd9xzkzisnb6oo5ti9mdqa95r7mqwmlue44xnj8vvs0p3tbsrjudxb9mp7csa5lre9a',
                flowInterfaceName: 'wg2bdhwlpo4ml0xx7tuj5v7ze646rtreu462b1ymnk46xt0jv74d27g0t4hxxmo3w40pmice75oa0r1l5tvvebhxm6k5y9z0wuy86ey1zyr4wpmmpinonslubtu4dsyj8e143d5hdx8ulddh3np5ivuhl7jflvnc',
                flowInterfaceNamespace: '1mlmwqps50d5th0njtayycp2cgk7041sxwbp5f651ydj2dum5n4ub156aicbt4mo3v3q9tw8pfkzcnbyxdt24s0t02p89pm73rxcx2rt7n4tw5o1xgkergw0c3ud0tll4wklmzrjuyi1nv0nyt61nchwj7oaue9o',
                version: 'x4vc39o62znucf0zxluc',
                adapterType: 'cqpl3h81qm8g3roo31c2uvym7qfk2mnx5xroc9dcjrsepi9ycr698c1eglc0',
                direction: 'RECEIVER',
                transportProtocol: 'ebilsginsbmbgevzge8wgs8xvt018yoqzvqdfvcpg9qce8yvk9tb6cq07dk02',
                messageProtocol: '3z7ftiislavf55qdx8u2rw9cvww6x0t1wwvw8dp9rhhmahd5r5fuhx256uec',
                adapterEngineName: 'vql86ahsam7ba670gtipnmq6hqa3zg62sfzoweqw4749nxb4mq7zkg1fek1rp9svllrspxe93f27z3t6aep2jtnyus5ilszyq9v5hsfmlc9lzb8f808a3wvu1vg2ezpz2ikdknq6qetq530a0tx6rxjem3zqc6pe',
                url: 'gmy9w017w7ozj3p1qpul91mc5e7r5mzq0rl0ovc1wv3mapsofy81dk6q2jy9fyhryhn6weah2tnnckbx0sjpychs12xv7vpk4u5tsxx2mf2o5cz6eotmxb3m4unjet5q43l78vq0md0ztm1nqcoolt1bqmn8bzhzx0qa0tp3gai8scaj9i3fweo548b5dnlz9nc6ll88ri4s343bkutvze6jew2zuquz3zvg5uw4fvyzwiz6b7bt0zyp1x6d0fsfnrqvtoiqbx5usn54qv324k0ofz5pk5ojwkgkfkprbe9q00frwvi17wkx4cu63ta6',
                username: 'fv0s9qp7a3f5px2ce68xjgkpoa0km18yhhqfy7t7qymsyow3u3v904239s57',
                remoteHost: 's5v4kibrd9q1t2coxn5e0fpgnet0bmits0zuz58aj0997wr8ih2qbf9zbxa9c62iv4pa21fl8ioquktmn28a9q7bt8mwtqp0gglf81icm4nbnjuewnfz043qxbmnv7bj0qgrwnwe97p49radhavobttk3s1egzc6',
                remotePort: 8112989567,
                directory: '8f1h6dhw53ps1vz7ozay25m1biu0985d2v1qx17mv9zb7d7jeqw6ff10dt9ckge3hl8ywbul1cn3x1anrz5dciaqfiggcfamz8d217gzs14muixqfc9gx597mtmeublwvrgba2bm9bbyhpibuizlcfwwpnnyf2xs7fqu2jk0wllxyzhfrocpx3bxiwg7gmkrzc9y2qsrkwfbdzfkc30jfhkjd8rgmx6007hc9vjho60kchsn8pr7jiu9kpuutzn0758kc5vtrfcm3jti8e3bb8bv9eznvk1j3ow7hc1ytraq0dfopqk8lz1memj2tvu3gb5g4uxbesaucd0kujakt2yx6h60td70suu190du9eofjggrg30hd57mb7puzye71ovr0q6t7xohtt40i1plwzvflpjh1m7gdy4l4tquil9ru90sddc5q3murktwpw9x12w3pj5mo9bpfczvz3nh5j1o0l1hgvdnl1ysw7p7o7vfpp68nd9ozz3p5mw0q68cfq35jgtupon5gwq7d6e30hfppi10rv7672ly7mh35c7xf4j31ljw5fqxz875ufxsr2dmywhf41kp7dyq3mux63qo9pyagahe50umzn0i1hy8y09i1rumzuem4lb3p36nua319svo6ey60e10e14ctx6fi6r18kvw7g9utexy3tcw5aokps8oxe9tb8w0n70xs1jnv609lix3u327lpss1qxvym8cwbvu5tmnm7sgec63p0n579w503nbkz907okgh3ngrtgi3j3hdk2a2ww87c01oh9mnyxe4gy9bzs8883uua2ev6351pvd1chp50xp29fo9djxu7ltii85jgrzhk18f4i9qxn1ks0bzpa1wmz5oqziimpjcwmi959hyzk8idr31ztnn1asnd2my8yywxjpz9be9zfaez9w2mbsdvhltxqdy79xmtvqeikq7xpiqlfb0f8qaoz94ra86m0bs0bpz1j8zzo2p9xdr9hkcnavm88fp0wx7oocdb164ok6',
                fileSchema: '0fxlvy4y22hrqwy4ggd5pvhnk8zm84a1yth8vjkfy8mfrg8rjly0wwg7u8js31ibp3d5og2xjf2l1bowwu8f66p0rthjhb876dlsd9ue4yqj1ckm3nv1fkin2ek0u9dhlflmxaxmmllqifoaotdsagks6c2c78yvj0q8dmoht6r4cl0lmc64c0hb93vg0uvnvgcdg2vvt37vqrue1ixhdle350e2zm8nlnw5r5sppvotdrfqmjwsaxw3b4kl3xg97w8p1cm4ap37megdy94swsm0418b22ftuddcqbojsqtyxr2e8ibp71vctec04v2grl9hmrj7x1fo1ppli1ifh3w9vhf3gn9bbt4nnym6bt408xrmpyzkgfo4m6o33jeja7k2dfubg60dqfskn7altnf4n2s4i0clqsms3p05qwg8fnxjiy0rmk3dxix8b19gkj1z0yi6k20al3upwv2gdy1nyqfimrio5legq4y7dmxstvc121h7yws1t4pe8kqt0kxyqt3fe2cd63ihflvbu9t9mlkuj4lmr8gxa92sel31ohbnytfdeg356zpts8ib67x5kar4zr6gaji4hil16w8oazs818gxhz4horrj96czpcr04sukygrtwp2qk6gj57enykwetuaclaxddslarj7ui63dwa43qs2txxjfoa3c8c2d34yyddryzx3lpx3ii3pk5e6zd4xf5nz35jy5akiew4v9jrpalmm5v5rymi768bb8juw5z5bn7x9jim7etkn9xk00byo13t1ahlu1xp749sznmbgbp6urk0b0g8spit9vnx8d1qxptspcaagkt7nzhopmf48oqgoi4b15i4zg6t3a23c7qi0ylhhsnf2iqtz64n78h2sxy1jwt4bjvgi2wfk4449h074qbbtvgkqe5nrxhuxe5mgkm26m0bqq5va5savf2ohh3flrngnjma8hto2zeytm5d6cg9m3ze19k7qowzft71sfh29e7swnx4tydziyr9vcj8ry3m28',
                proxyHost: '6l5udl7uk17775ea6tc64gfbzsbq3o2a2a8dui6uuipt0tfwtmqs3xfa7p53',
                proxyPort: 4411458940,
                destination: '41two4qbqv52ip438cr8ywfuvw5yhizmpmiv0gwafgx3sqgnjch5dg650hybgynwjscy4qvpx9xlasw7gslwkid8x4jpke9xgy2bhy0jpghf8dzzb8b8ydjjdz3jcs1c135fymdwuansl0bwze7v74yejhnrpez5',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 's478oh7mdivf2kk35ijd0pjrxbl58h15shg2x49bc2qthy02lz5e0n684hzrkkxm8lb3tv9xd9j4l4wor7t86wm10690096rkg1xkiu20wg65uwdjjfvk6z5uje7jisjqv5chl9do9p7lvlsgumsx2rojxjqspi4',
                responsibleUserAccountName: 'pweiy1sp1yjk3filsra3',
                lastChangeUserAccount: 'xl3i7kodr6l421udj03e',
                lastChangedAt: '2020-10-14 02:14:52',
                riInterfaceName: 'qwutmbbdzquenmwwopc5ybcvqsmpjxvc3l0we2wbnqd0anydfz022afqc7lsc2h1vzztyyqxff921oya581e4ku3hne5jym5rnxf3p6twg60zk6r23tafu15kyh2sisyqbc6qiyqggljxvkyutjwr1s7rajy4ufy',
                riInterfaceNamespace: '4wdvuyr0488zh06hoenqb0vqyasqmyda3ju8vsi13398xtp5ba1gzetxy8m71n4ytbjycedvis78f3rvf1nk1fmi40tclkgdus2xt9hepohq6du0hsj13b3sexs19kbcyys861w3forjaak9vuh9l45otpira8ta',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTransportProtocol is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelMessageProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'pilpi0hz1dpkdn2i7n084t3bmnfrr0w6xge0cnbl',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'auoeuw7rj94q6ojg7flpaehho73k7l54q6hpcnq7egwgmuil9c',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'fq5ko56jnmfph3r7h3kk',
                party: 'k13jpisbkbjevkzm463kega4lna8rei08cm0dqtgbbg5jw7ftwgy9kii6ixudim8sid1y8210b0yc7lsi1zg8ruzzp205vgqeap5qp4jyfvxp7hcuwy0p3qblqz3mtih97b9e4etxu5x6rpm0sc14js4tvn19piz',
                component: '9ik3bs7g97y6jwlwpuc6ethk9xzpta6kie737tr34hhwv1yutmvi58hixda7n77sxx2pwh5ppxn6lwsuu2njztvjasnig960ser7v1mqrxdev16h8vskb1o4ct3yyq333kxq5pv3r2sv8r6fo2nkf9czx6ilnzd6',
                name: 'j6cbxjceifwavv34df9kw3wj5gdxiio3yd61317r8jomd0wfjgij5xi36l5v675s7gdfdw2d9jvw6mzijll7bkmjw9qn0xkgdqw4f41w1k31isvj44imgo5bnc6z8bccml6vkqj02iq348vd15uvz153lbld13x8',
                flowHash: '1mk95n3okxdak4wio6y3njdmq29wh3sub9uf5tgv',
                flowParty: '3nfjommy7fipnllked8k9qvnhp4t25vjg29rvcqhdj77ni239gzejzfz65u6ufs4fmtxbpicois4d48u58tduwnppw2l9jwo7exy95ualsjbyv7b51wmf6bpphgm9c9ei6h117ix0xr2fvb1rybv3w7hqlh9h38a',
                flowReceiverParty: '8rgzupjsw0csijhktf581cubjnlwzomhn2iu2evnvbbce22aus2fk44v5v6o7fqm2l3q6lkn5r4ltu7yfhsbup7nt0kwocl35enodasssvi1vau92yc4gmmntn5s1f9pnpws4u2847kpjmwxmp31o78alnkrpqb4',
                flowComponent: 's1g6mzgpj5ael64qkgktyx2u372cv5f2sbroh069dcunai3j2340l7kc30dzrau3qjfh1boiruyrvccg1b51ymel5p4tepvvacjye2ao4aiova501533espm86yzoqeks8i4j5dcgv6z59qpd3s6hffsdmdtob78',
                flowReceiverComponent: 'cnhswrawbkkpxwy42a9newakqpoyvnxsgy8581d8h8yoq27f1z60m1z0rg08fog2na8szy5jq292xyzrb9h26qz3056dcn2z86qd4c76watt2qlv9nrocn5u70baxjhu4iftv97vhh5ca8dhk0pg91i3mphuxhb6',
                flowInterfaceName: '4lkogfn54xc22l41g6vim0oj2p89vqt5udww84849x796tp0tnfjv809zi1jp76zek1loyoqb1jq2bzf2fvp38qhzxtoktbjo6t53j4pzbrwxcwdl1h5jkzbxt52d12yctkg9s0zp3esaxwb3cj5eiyoqc78zzjl',
                flowInterfaceNamespace: 'bbaj9mocxbng0ns2gxls2sx3mq230bhvzmpu2xkpbgznnd653alwq39om6jx632lcomdehnluudesoeffb2znnxlr7byifqfpyxgsvfnnas137y8jn9gmuc48rh9wtrr2v3uzmyqh761wdg9jtfjutwirwdfmr8q',
                version: '6hu5zal06vdtx0kj9n9k',
                adapterType: 'abhkqxjq5fi3ass9v7ywtsj8bae3ojkx1h9jn8dyjy9iykoi5g1rcxyia5gd',
                direction: 'SENDER',
                transportProtocol: 'pdajvoowpb7qqu8f2rz3xg7k0qy8ktddtyg0jrqi602jap0mf3ygarrtc4q2',
                messageProtocol: '9e31y365w1p3qg9l8v7fcdy4oftedqqjs1m0yzesppd8epwqfqo1m0bmxzo77',
                adapterEngineName: '3pp3hk66vtdiyx8oez5q7zgz8qq4vn5q8wmn3tgdr3vk8dkbvomxcasgj5qxi930k12pm1ql9lxgpl7lej8984kzwumnwjicbvvlj6rfhsu9jdwu0kn8yrk9idgvihzx17gu99g4vxgi89dpyvmgzoa0r60yg16j',
                url: 'bwgtpx8b2aq0evuxooafzgmgbgkvnildkaymhql8rykj73p5pfyoawmt5k65smq4xuwf3w2ek0xuqtm606pouqjookn50x8plxirvcdu5584smhb6b78m2nnjt6xadudfdqeq0j8w8p6mgk0vwe6ecr3opfainbwe0qsthg8nq4mjxr8g97hcdn7bxuch2cwtono2rj0k4l46n6jtqwkh064dm72ymxb3n6eenujv7ziye7ygf19ueadllzcmz7yjlq3sb64s306myuc9cpuaz46jakydncuj888z5gi6ubm5w8j4dzczbw40n6n2fbd',
                username: 'la8fvci2a9ohtysbtvswu25p237b4ax28s0mbyoefbz0rb89queyiw3ec0cm',
                remoteHost: 'kk69ecxgopbraq0aep98demrff89ybv939uugx8vuf6rygewhb65mku6zxkc6vhbxuny5mwe2f1r17occ8wkg48ftlwm4rrvoatt9j2c729iwk7j6uapeal6p3blrhsh4lca4mos0wp7v1fs61ww17o7kts9ilhr',
                remotePort: 9170312748,
                directory: 'ie4qsb7d9pawb6fo4r4714d7bnsnvcwyz86smdcfjncwp9lbsxc8it5see14dtxmbf9ia7ygd3pp8pelobvhkbqlnbf22f29y9purnfl7ydpza5u5huxbatvpz963w4priokw33e6pweeivargi9m7ylyxg04us9s9tr4vnrn5e4dk04rotdorn37l25389off39tlm5t05ouem6zqw99001abfpya762bwq4lvzhw8qt0qrm99gzpwjh073vhgv9tbb6szln5xa7sjlt4b3xe1ifhkpxro0w8f6lmeldz1b584gqba7cr2zsq84puwpf1n0ojulw4gqhd58muhxv95t4wf2bfifpyvor60bcagzirtjil0ubzszt3bk7ws6n8n49l9klg68k5u3k220qe9ygu3rdqy98ipczn8ljert3pue9we82l3z9tbsqaqbhkfy4o33wiv0bpvbybswj3lxujt3445vw9qb9ygtzzwpng0vvmy2a4tz3cytv61mgada12f4q4vfyezgf3o589g88s9sh0qg1hud3hbhdiyrdcfxx8dgycvazfnr3lucy9v7qfh0lg3j2s3cg9fdzr87ztkhvfjl6dt472lskgni2196zczds7ij7tgj7edhztwup9my8ubw43dlht7m895yzxbjysik0jerj1gbxl5podwrbauuse2mrpkykctlkdgzo29pzot6ajsfporsxxz5uh0doyoahlvp9i1u89wp7zea1oo486rv4kuhlz6rsv1yfvv17qto03q7h7ps5gz9puh9vk8vudxzwxm4fnaq5mujuczp29gs6wx634dr8ujnzyxymr4v7tdm02toe82opyvhot300u8dtayulgemnrh1u6dchk5ehp86udnhuyktvqecdee9p43hrturxsu52uvxvfdplfuvwy3xj4w11qb4inc8qlq11eih9a89qk8zoykzoj9m2q171a1ee09yb8xaz2rw80dbhn24q2dhbibd4k7fxzj1pcuqkor8',
                fileSchema: 'xusyipc4ts6h8lp0asz1ewz5exru2bckr6k4ay6sp419izvlg065mpbbyu3n65w5zgfpwr4plylp0i4x3w105cz0a5ex4h2lp7vx7px3m504doa6h8qc0lwoar48k6ixom7zmw543yrys8052lucssnlvelc8khadaj2mr6zezq3k9csrp72gmj0ikcc65479i6scp32scg4ui7nwvmbxgk12s1gkfgdjmlc2pm11pfvkk2vd17a9xijil4he5m1tnjsyq93w7w1pnrfvjyrh7iifw2d3rllqun1vs1xsrbotmiv3djjuhl2n5cjuqorifaeh0l0wzrdmqyj6v62btcsmeochhqs9a8gty13ij3kh5opihzy0xmubxuym7c29rhn4ucb8kkcuouhtmfg303ntfo1cu8oodgpf66aeq2y3q4bqxx8tnh6yk2sjfce1frtcw9345kru7f5w1rkqmqnjq4e0mgy4uxy0fgqrkfptiqimisa96j3ezf06kijpvk25wppbin0e85e3mbjcu9lqh2ika2pdnxhy25t4zx6sq3j0y9ey0txdbbdbe0yirua7dywvzc3ao1t2smz6ykm2ghyrb9qguyy6lx7jekljfqxzgtqwxiujkbnl1lkbcyoyu9vj0li6dafyhbzlu7kh4ij68z3k3c2rdjotu4kxpt9v8jfqbohyy5174ctbv9uzav6riyyxq7q5ehvf8dnnj5lf80f9fzvoio6i4ywefprbo5qzs4fnmo5girg1n00zrk7pc53zsoy02pt26wnj9lq7w0h9op9qyah7tz3q8vb9ukc7ecz93q06wq2t59ro3ny5ijr6l251jg4fbd3r1c46zjeqy2s999d5ytr3z7dtpknt5entv5agwd4j6mj59jpxt3nnhsrafgamq8rdnor7fjqjjyy3dgw9owf8u5u58iizjqc5aclr17cksfrqgm4nizpyszx0fy960o30nryf1f86b9gjt69z4lu3wijbw4nhpd3axbg0sft',
                proxyHost: 'rx5i5q8u7k440a5pdvfq218qt9rkdjunxpf8q4fh0ik4v4tkpt2oectqp2sl',
                proxyPort: 9370575677,
                destination: 'nz94wtem65hakgx1z4t1uo8k1hvdotnhey2lg9s2vnpr073uzs2jfyyiq3ims6dwuc18pzvthxckm0ko8hlnq6kvst2g9lmfelkbt2nvdwxi778eu33h11sdo6cbn7ser3xw5ah8l491262ksxb7vmtcgdxa2b9c',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'symbmkgpvq82wq5gyx2zwhgyjaeowi8jxcgycofa4junm9qmpboz6bf4vl8jexro3wm3grs3x5dv7gn0c8pllzkvnqxww6r281pb6ujh799xv4st7lo46loz483iqxhhsn3lwjry5lxdbpbs0d3fy4r151c9diux',
                responsibleUserAccountName: '53lb64by42kneqw1v1q0',
                lastChangeUserAccount: 'u3hh6uz2vgk6x03e9jvl',
                lastChangedAt: '2020-10-14 22:53:59',
                riInterfaceName: 'ic8iztepa8f5cyf6izi9e7xalxmz9i0t0juvac86jnz7d42ut0hr0qfa778mu6hobwpkcp54tnd4px3kn1jdbnoh1ki6je3anlw242kzd2nvmudmst9n8pas8cxyhij4awy5wss1g7dp7gdicircpo7a9glgwgcx',
                riInterfaceNamespace: 'in3wwxjxgq3uxw1xd1lvxt1uzzh2e435kt0rrig4ev6fe2yitxknwwdxzrlvu1b8hy9ya858zcnph2t87wgkbqo4o1a2k1gumbb2abma7ze2a1s4x05g87685c8q71mcnlskhmb5ku9yknctr5kus8y4zz51gbwm',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelMessageProtocol is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelAdapterEngineName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'h10clwq012ed5lhowc9ickjr5dakvt0bsd95ylar',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'vqt0y3ix3wwn5ixzogthzrhhx2yos4y3qlmedpp3gg4bzwwjjj',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'qhd5h5c8fnc56opt7hw3',
                party: 'hh55nkl4q5gskaq62ld4l78v7w9su0gju0si3xoakhu6a0b2gvnz0tqzvj8q5ukfawuoetwod6x3w03sz0odouy2072rwezhfc42wb1ooqy5fjmm8pbvbech4nwzsykjvt10pdmz8qmt6vpoy5pg3ginunc5qzut',
                component: 'askxgvefj6wvh6zxdsr9d2y1zwk2jelzlhzsc446z0f9llnh5toat343k7elz2nesaoaugl78qcvsbx4ev8vxbqfkon0geefawvamkmdlab6ylb8pyq3p141ikdrnor3o3zma5esae2b7b3f4gfybbgd0w9e52f5',
                name: 'bj64hrna6pgq7zfy8h1att51b373kpst45nszhxwqhr2vumg2tz1mgjt6lmnlvd2nkn8f32wcv96776agaorq7g4tf3yplodzmfjchl50urbig2patwtvrw3p8cgtinbz5sua7ew1gihrhhu16icns629vbncffr',
                flowHash: 'l7wfu1ndohuv40k42vrk98lhllsux21n3lod0s59',
                flowParty: 'dgih7c33hnb2pf0bwz1npey9op8r7gmqk9iusck7nfazyxamg895f9kfxy50ymsartc83ejsn7emwb4sj6lr7t2fsxkbjvljpu3f1jh0crf31j44xza5p0zic3aro6dquq9y7kq3vxmrlz72n3rr8ftovn762dm8',
                flowReceiverParty: '2d7dxvb64cydri5dou0832t5le3silxtrxtv000zkp7uzbll9dm1qdg7vt8u4gn67u7u17tnya3w5jk1jaxckj4deejtvbiz8vzy26wnf02q0qpbiwfwhit8zjf6wuk5efyvgx87x84b4x30m648oc6n2vpjgrhx',
                flowComponent: 'p67p4by8qc6lm0zojvcol6smia76akzglvg4ohfxed2hbh3p2sv8w0tvoaai69akk39esg77dux5tdxviut54hcco3fetds7twxq5qrowtse31s7247bai2ikzt01ri2eq1qbf6pdlf6iyr6ev9wq5prrmfuxodc',
                flowReceiverComponent: '8p3hbq903qme6btq20khfin8jonwcwf9jgz1m0crivm5dm706ymxqzofohh4fpidym2qk626ag13fuwxct3cqew4ilm06392weu2rb4a3ynjcm5i5elwhnh7ccr8hccoyrliwxlrrpu4myxhyz1fttrj9e2jpapo',
                flowInterfaceName: 'ozylxmmjc61vroc6egpswx9ky77k1q7x0xwe4c3lgzxpcwrh3u8jdjyi3uzjkiljchv04g4k1u2qsrkxnl2i5tsfpseh1ajdrgmokg4ealdw5a1cn2tuqjq1s09t3761x9ppz57h3aiu6lbxl0gbvh5yb6hcpcxe',
                flowInterfaceNamespace: 'ceftdrezlx3zns2xmuixbhmipi8nvarwxyne12hhtjhfs4ahfsjk7po5mlnsv9dvkp9qyczkqf4zip253skbh08artkq5tfmwuw6wmpai21qgrawpcr3ioie42e92uod499ztnoc2r8d796vsggru7hceuvbyuuw',
                version: '4f8zuy3948v3cj2nt86f',
                adapterType: '8ru0b6iqoltqj0gp1ev8hzffpja8mv2mwczi0gufnfk94g8pydrjb4b2f38i',
                direction: 'RECEIVER',
                transportProtocol: 'iw75ri11i63rqqdt5ar16lld3a3mahjthx24i9xc2uxyonjsc1sxjyklblx2',
                messageProtocol: 'swcbt5b7aymxaf3ueq3x62wpnjj0dvou92qkozqg92lgwaqo901y6y7z2feg',
                adapterEngineName: 'v3x6iy0tw5ly6am1mth3g0f8s42bg1dahf6z5k5cohhjszr6t8kepoyx39gjvs0i2txwenkobsjkmivnktiy9hv5sgwvuk4kc0n28m6t6l11lwfujcv1kq433yksiah98lrb9skzi2os7sytxnrh0mp0b5raz6qs0',
                url: 'gbl13ymmpk1p8ntn2fpl7qffg7thig9qhqqk18z208ujzhr7fbsw7086vppxtdcdt319c2rkvas98n3qjv0uatlsmqq6e2br8zoc02h0ivozat15on02ntvtl8faoru6f3gqprojo8wnrgq51ib21a9kzur0858h74w1p6ynx6zymi9tlp9ahe9r5zkbq53vo3smskvn2bh5z15o8q7wabwgz843nj35cakq2o51yznormmczjijvyi68qvp2frgno2o8shpptunm8eaw5fjbrqcbef9zlggl3h5z0iny87e05h1i9sxrihpwwqkf13k',
                username: '4p3vzvw9e7pyx05zypunm5o99u8mpwoehx93o9cd1ri25z5sxxcawf74a1bk',
                remoteHost: 'jyq4h664f4vmyfkzjqnsxo0b14k73q70eo6wjecgedm5ipzp67whpheb0n95j446t86fj3z4zausyye55qqd8tphl7zc8ylq4z5ejnowv7s7ymyau9fx74vxkwzj69oraanbw2x4b7jscwb39atvfrsgeqiuase9',
                remotePort: 5656549377,
                directory: '0xgydyu8lweak2wx1znr1hxmqm1482jogp0bbdg2argaxye40uq8m1716vofifc3x12lxw9dw42hfrvgqm6mvbbawypb3n1qffpd9c9jzz80vjvynfrfulihxftubmrmsfvjl4rvgzrqvm6zj3bqfymj0xzbcbblrij35lvg9z4zrcv42y8scl88aatyei7xuolrs4f9vfljcl6kzfqzwp03ayzdqh2m75a9tl8mrzeydp02o7596o6b2kwbeuds7az4gyit6vgrj6qplmdzni957gk1mosedssc0ifbcc5lny4dfj7qnjikkyb1eq13pnjdjrfignfq8irvuanod3ffkkhpuwf6w2kdc4u5q8osnwulbrq7j2sisle3o8qv9c7dlcnhew49c996pfi9mgguftm90ptplpltzg7gp0w31wxay9clffoupxlwp9i9vulu5cjdh3ljmt0d0zsud01m89cri1kf0ks83e8z0auboqkadpb93a90a4dnk2zvfkl0qtpglj2l7a11465o9b7gy98v625141lsz7nflxynivhv69sacr0ugqo3t4jsvm6gy747r0nk0pxw35v48c3zp2wzap4rjutc977svnwhsz0dnsxs0ikwun3h0tshuinofhkoo1j5vkcykyq1j6ibadiq0vxp4hup43nzkthf1bkhmb3l9u1qbxc5xfdqg7tqsj26nqvgwu69z4ci6u3e0w8ple5o494fmadmd9c6vzkgpfl0c6dhiphbnemhcup5d10yiu2goovgezn32c4oxcaas4ylhrfiqy4hbmvmvze7fis9ebth1pm0673moodcdygjogre5rj1dkpfuwsxp9ey3sw7x3g1frgmo2wn62lyqernyrcm7ukd7eq9zjcv0k6dz6dhhcbyi4bg925mb6vspo0lk6t5vermz4rikl9a7cbgtnn300hzj9ma5yozf3nf1e7ntiioe2e58ny9v7wmzldaijv7bgvwbnnj131enf6lw3758b3vq4am',
                fileSchema: '74tw48i5hvwwj4qihj6f6cinad9jzpz5xara7ssh4oewu1jnx6mxixloocvdgjadbtv33qv7zrtzm7vfqbr3k6p91tahgy0kncf79g8ouktwrfm82z11pqkq35dvpznss8xd9hg4tjb4h572bacj670h6ti3vq296fc7cd2yhzgjxrrjhzugiteastyujbdyrckaakdxcs5jaxvhc9xy9swx0jir0e2nm28plf2n1j76a1qr8vuv3yvvktj30vzdi5v1218zxecst4lopwxbqz22az4yv3r4q7kfuekewzgtwoc5qio0dzxkvd9vp3yiq0gojdmh6ajnsjrbb36zgkhcgfs3mz6oa6lqu8na3gl138h0asrgavab47j8a0ym849of6pv5hjilt79benqtungpumo2rrms2jejcx90eaoc9zobbzi5p7iumg4yrbe79sm2j0zea31yfjci0w8ilu2ogw2m0o5635u43156zo4psdlll4dxnwortu1hcltj0jbvftk33yner7ifc27a4kdwdmc5v9ojb7w2qqr49v3oc45fogaopbrjstl2lo6w8jdr1jchp9jbumr6hr7yfb07jl23ouh0pulnetyzcvi1mfmntrea4s7zaienbch912gllm5w5kv2p49kqc868u5oa26gnveaxkozd0sna5fnumdxy7331tl0sk2zqrhpk0fd9xhbuq1d2omc1lukdn5ji2ju4f74besgh38r1n5czdkdu7q0isf8rs798be90mum8z1njuz5p00ho0g94xfk2k0dlnt1kyxfppq4dad3rsmn34d7ikuznibhk42wrcukzy37o3vc7dflewrkyf7ezet6c0ps76h9yihl0h90gou5239klx9qg9s1xzlk8vjei805mh9guxhvsucn2oz7eo20nwrqrjac0bvion3fabi35rn274mk1540wdj9szi3qkkfj5rcbgad62afnmm7nle8gw4gts37jhk77lvy61obgyj63ra3gtpp849',
                proxyHost: 'b5r3zp4wbwkm3bknwfqdxertaudomos1jx2kvfx6jc9s1zce0axbo3gbi52d',
                proxyPort: 6630287961,
                destination: 'cnleo0eega17a8v7uq2t2j1q08jh4wf0n4vnyjdvqyooigl5bdmc6sg3etudi6d2ffoh0uhvj4nu9lr035s87501kl0ivr3nf8efq3ap86zrdqtkn4ecpopytfbxwaldwhjtqlqtol3v38sfa5lpr1htyvi2le67',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'aqva6as5t5ryejhqtlob6fcu634oqoyt1jgsdmwgxj8yuuue89goent0vsmlg8j8qv24z4ki0qt1l930qf4tdx8ytmpeeu24xw8ff8pp6bx20gnl39f4rh7n1xhbfxq3lf0oowgy9evnq8int5szu5cyt36y2j1m',
                responsibleUserAccountName: 'qbsgmy45ju86ktb8e6rg',
                lastChangeUserAccount: 'lxxr9kx4ei6qz6iil4xy',
                lastChangedAt: '2020-10-14 05:54:55',
                riInterfaceName: '8dzi3h4h73fvu7jr0mz4av98k0uubj3rf9nunov227dff1ayb8hd05mhy0zjgjonen75r7a6npaxb5q6iat6ao4gtmkqhdo55vvs2a8iavzd9t712n3tcjgri4enc3oa37ilezfru0xtcf0ip3jo5nddbjrjbz7b',
                riInterfaceNamespace: 'jg084mxqo009y5up6xkvdwwnb07hwoka54rhk05basd2mw64sckqg95xp16xu02gcbrmg0tqtixgnlshkqnan6xl2a0oaftov22h7hp7816gp025seqm7ytxfpokdmkrfnjtc5clo6i0ihrdhclyu8il2fj7q5iv',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterEngineName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelUrl is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: '5x20ymtkaywe0bnhvkgknec7p9k1vub6snpb2xta',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: '65e7y4l0x94fkcfpg6mkw6swwrxpv7so0ayfr9wznlc0yjh6k2',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'tpvdy1rml240elmggfse',
                party: 'bsaxxl95moxtyah1na02tmriy4auf6cqofx1eqedv5ik9qt99al4p3wbblfhejmrmd0gl0ae2lh74luorm3aktdbyrl0lc1uj57p2thz95pul5cs9pzvdrfuxd7qu71cy3obgs94ak7ydu8r9h98o5cpc0eo3ys0',
                component: '65kmpnh69iuvmeaej7zsmwo23a5gbog0g6a6gbb2vx7lhsygnnnc1kaanzvx8fg7v6gl425jsant9h9znxwic806fu4ub9w0l8arum397th43unx4tcllnfcej7axjchkplhsiyms4a9l27nvpoq80jev2g2f6pu',
                name: '7l8oub5oqbjuv4bt94xxx0utyltu1rsjus5f1olpbkkrx6lcxkwvw6n2hsd5g9j2sfs2cvhb387pu5y4o9bgvbqxqbviux4lrwwcg5kwnpcauk95zl03vkwqpuaipck5dsdi35adfikulvlfxvm0n5q0t7nydwgf',
                flowHash: 'w0yniiqmhhi075hl1zhr02ns330uxkhtbb4ojl2o',
                flowParty: 'o827cowwlbjrcd2ch1osnnn070a62fyg4hhriq6sy6t5cmx5vubujqztuyqn797lju02ehb9evo47ftyiglxp1yxvq92awuy2rw6tz1vfxvxv73ls3wezaq20gf2f0luojby7dyx246l73cggmk0vvj4aapcizhy',
                flowReceiverParty: 'sm9jlogwf38xwmsyr03d0wzk7pqi4rbvr9qla4cxkwjzkiknfb9udwadn5p42hlqumkyr0gtwhtr88xxsw7trj9fon2vr0azp6izw5o6deca8pskfpytxwq44a6w62vh5kvboob1z86w2ltongt8hnkqygzfylml',
                flowComponent: '1az974br26tmb6l2wboxa2mzrndzoh32zezols174v4jg951aml9hqr1sd40woad70jnhoplbzfzop8621h19uqytlnfncw8cv79wzpggas565jejpogqq9zfdh8j8v6r67oxgjlkse0kyhq0uflqj87qfc04g6e',
                flowReceiverComponent: 'fgjo0lz55htmccvjde5a4t7scqimu6jr60f47kyxwfrroa5ueluw9apjo72jm42h68i0iwqmlb3x14qc64jyhqudo3nhtkajtoy10tok87mbnjg333t0cl57kpk8ofaihsbxu8yarw8kg9asa80n0o34hp12bz5b',
                flowInterfaceName: 'n783ei04cikpbmmsxj7v3lmtiz3pur6wbbjgt3l7fv9qe4kn4r9pxza3rcdwmqse7j27tsr86h0ra1vvddcbn6xc1kx4lkg538sr1fwa79omgqphm48z689k9b5evdns0zrnqg67kzslq9d453mhmbk9rkkgc0nf',
                flowInterfaceNamespace: 'i404cf1d65b0y0wt6y35zlbkf017bj0nxy0yoi5zmnfj3nutjv806auaeqe4vywc8igozzclpobtjr7sbz8r0xlk31nkfy1ypevsh33kjf7eociqjhqseo8j4msvnin9x3al16k1ehdij32jmu1xwcfg6x6a2oak',
                version: 'g8dqdcki1ggc3r2h6la2',
                adapterType: 'o3xsxyscfzsdqdr176fasdarkvj5wmuze16pixx9p58g3ocf1qjx8modqt57',
                direction: 'SENDER',
                transportProtocol: 's8s0t1enfwbueo3jsp23k2bjzlh13a9lp0tcja3dcsdqv08436x9o2b0bwu3',
                messageProtocol: 's8fmqt0xqgu1y20fd7uh2445ykzsoyhwgtmndx6n8iufkm6upo5l8mldz6la',
                adapterEngineName: '7fo7yifm61dljk1ymch906326emki2q3iz8q4mbe9fnxxq2mazvj2de9dxolbb3ssxogze5y4ft9nbijn1z91b6w8242wvmo8ef3w2t5r89dnuk04mawpjp57pt8ngry3f9lp9qxsn49z79uwvp5q681fxyitd1l',
                url: 'tpg64ecb0d1oyufwb00up90lke881r39487rqdyxkkhdz21q1682u8tchquwljbypz1264id7z2eh5f6tq66z90k04et4mvfuypr4jcz1gsevqsz6ebmy390tn8k8o0tvbhhz9dni1oicvrkga8u2dwzgstzxzfspqupb7pgb5d7arbhp79o9gbvaaqlhlbgk4ycdq3p21e7ag066wtrqnbl0tou4kwstaf5gnapdnei2k45ztkn8xqidk8cg8xx24frr0nqv0si8domy6p5qqzjqw5ctll974b1hs1swvjaicsv9cmw2yvvd9jncaepq',
                username: 'y71f5pksw1qdr9uwlic62ku4xgv9yeqyo6hcffxfgccjxp031o0nlw69oudo',
                remoteHost: '1xtstevvo157qtfv7ul92w9oyad17qg8rprcsortwsagk46tdwcprkgm7a3m98ub08855w4j6n8hql5ku0akwrm71otmpqzjpaks0ggynj6yiqxzbu35fjpo0jl2bjk4buq7vx9clkwhiigvcbjzzfhptopq6hen',
                remotePort: 1369188457,
                directory: 'm6l6k3jury9nl41jasef7fld63lig55bfhtipoymkqs0liefj5ojtnfg2ya5iic3j8j3j29ls4asdluuz94lsyx16mouq70gdsgqjt120ygtd4hgw3cn8xfyf6zzjyh4h34jnp7npglfm4ixeztph8vhkfp30k9vr0irl0r6q2yczyv8zvj350a1lztygm2be37s16skqq9k3j983l6w7j6p138w68ypcmslzf1hxc4dq3h1ebvaz77l6fhebtu3q5hstf8rjz6l4ldiunypznq5wr37139ljakz9w45rgtmsvnsfnzfcl8caaz66qsv43kq8j6yc3l0k32l9zzjf7b9bmckiwzcmt7kxawn4sgg4oawznm0bs7fwgv5ab6q32r86kvkzhkvyqhn418ce35pkekaa707ew22yqx9hrt5whohfwnu9l83j75i1b7ytwsio9qim6hp5wnmz0y8mk8nsk2wntzfo97j5635ozl0kkpfoz038h8y6788o9m8yrfvxd5i5jshtmfvt3693qy9192qykcf5uy3jipf8s701dr27z30snryojougtdemc70tavip1vahtw64o4hx5ra2w0l0vs1wue1ihv18mmr2x1slxypyo6ayde08fdfq9dgihw07iakcl3tbe35fx7bv3jr9kk02kcldlf0nwwu2o8kkjxcq788k09dtz7etn2fohxo4i0pshmvrak0hmk0ezsvwcoevi5lp5w7h4gw11fy5ulrhjk1jcar3yr0yinf5pb0k827rw3d7eva6faeklt4gbm52qe4pfhxoi5xij12imyl1h4wt99jjqzosigexdszdjrsq2uu02rncgl2mjbp0k14xp4ywcfmslgjf3a6r9fu2607k4c7aumutxibtep5c3x7vj5uvd23wkpgjsqahpyycwvtrq2dl2udmwhl6lckp7fdfn3iav3ipnfmqrznvddj693f7z1l1fayxk9frxpa2mgaaq9ij13ks7ebaupqdr81yc7ozujd',
                fileSchema: '5b7dlvy1u4dlzo3y1in6xh4vuhwo7agxj1qvxs3w8snusl7gu4iwis45aavv2b0q5v0axkuch24ph1setmn2glcg447jvxlxwsslzm67m8qvykhm56wy18ldjebwzrzfpeu23eps9m2qvgazdi0fi3b5qtpwbpmu9i64iupi0fz66j6phe5ocvfuk4rx1em8l1jp0w0245otlkubnpb2gk939i028bl9f2hhl8gdmr5vemn78fib6g61ln0efiuobw6isqaj8rysglvtmzfdrk4l9f06q70efpjs6t7lpb6q0ckxb5v3isg78eg9hi5de3asjcpezf1zsj488vt4iarrsy0mzn5kkwi4jd5i1t5s55l36natvkvw9z0v2jaol9ki53ydpsjok7bzvfwkjr9gwubh262yfxa1pcj123dnd2jx8y3gyc437i10le3hdq9rjbnouyceah7zoi346wzmqxm1zuikboco69yrd1oqz6zlqn5g7plrxcbdrf7sf33fs3sco48lsohopk423a6q56l035du6vyhs6uz81gdq2anzjuq014rmud57ocp7wg1sdlsuio0ek1wrgoirtg1ubpynbmvkwcfe8gunhn5uezoq7or3thn7ehmn1i7iusbyi8hupl1gzyxtshsuef7iy3n0628a4szy2plkzmisoc9r4et2otwbfo5gwcawhry7zt8yz7s4su2u7ut8j3vzw2wvyd5haa7tghsd3yhjks5jmcwh065xtjkn6u1ichluwl80efzxl9m2i9o3nyyed14hs4jxlzgrsh4cdl5uuhaqrvr8nr27n0gjwvw55wdnmuq9qb9g8a6ah6v52se6wgg8r1vhrnkuafq4icdablzpacvdqdmu0x2czss9e4v3xelj5yn4b72lwa3tz4uy55kblaypdzsvb2i4h8i7scwnajpg8lbh4qdm43h7xopn0vyr7tj5q8tupzalec5aw4bdddtqtl12x4ov1j2asaoru62squ8bxd6wha6',
                proxyHost: 'iysh3x2oczmzxnt8b67p05rzs8x025mqxx6wwvsialvjbxwb0jpxna9dve9a',
                proxyPort: 9517075955,
                destination: '9i8zaq0ofsmi2f0rfn9ri7qd1pmf5nn5sboi7b0qu318xhpbyrcv0fqyogz7nq2iarzdjv8l2l2t5q6h0s3e6w553qdi7dfgouzfrgzm23cpaxi64paz9bcgjiz8ywhkw8sntegfnp4fmm9lm40nmum6sbooj5y3',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'rfa1n59h7arp1qyxoymr4m62blbz98e4q9qg7kbwyyexbhdj00xzanszkv18hdoi5xbtdp5bp8vbhtk5gyfe62bivoaqslcgkodn1kkep8dckmiw417xexzzsnx93o6t8mjg38uh9agysc3n93hjsjhyatrc49qi',
                responsibleUserAccountName: '2gogir0a24bynvlt7pib',
                lastChangeUserAccount: 'u91zqhxugbq8o3w8lkc3',
                lastChangedAt: '2020-10-14 03:10:43',
                riInterfaceName: 'yu4rtkwt4d9zahqz7mib5mdwl7cswuuirr6gkya0zwjef89kj0hd5giqyk6wjqlgvnxsgqzr44k8wftes7ayv756avry4l4dkg4grdsl0yp9avu5s03xrrg6x9y6l4wsmzhkjvl7rzs4n8z19yeg4qe28hawmi8m',
                riInterfaceNamespace: 'lxkutaipjc50r5sobf9hqk7ihtukkgzhwrpp9yp3q8kgrwoxh2zq6jfd33fqtlsmf91m72vw3hitq0wejjaeefv3dohvr7xva4g3mrh88qhuae7sbthzuq3hybj3s4eyipkvmisz5brhdw4gc9tgv63a02w24mbz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUrl is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelUsername is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'hd01on8rrsm0upkb32e2nas13hjfgnzpta4q00hd',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'lwqzshcw4bbbid0qv2aawmraaldox3lsshz36luiatk0b0v5zb',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: '5vmsutpiwn94jr1e3dr3',
                party: '3s3ogv9su1gjo96u95c9o66x05217joh3t1jhq2ncei559c7knxryitr237pr3xa1erw7a10tdmfwvq8vr103k5068v5y2ks61hnjco7gw5c0oyz8bj2njqkd4qa1lto6g3cijqrkig1ca6qe4be8a2j5zogbre9',
                component: 'h4hqfc3x7gjdik0jxp2v7j0dgywe53osajp002bkbwniq4zsnq1fmm1vandf1murkfx0ulwnvy97bn0yt6il3lsilu5rgm899d37moqm6asyk38q4me5faz16eu3s8wh99xkx96vo7ey9ybmi8pmg37ea0zr3ne3',
                name: 'pq8p4utoh69f9wudged2zyf1w5mwandztpuacfdip51sn43g39ddmrsq02dkyhkowvdic9nwc2ooxighh2ok5pjb1f6bre1q6uu3ww6685hgmqhwyfdapqhumnu3pv5qfi2ux9evuuxf0tce2andeor0s0okyd1t',
                flowHash: 'uv4jy8dgvbrmjydgipii5om8sotd1g0x6imxb7pi',
                flowParty: '9hqzczhqwupz8vzsft5kiwwe1w1a6042x082tau0kgo3o2b0n0qt78l1cjxqvxkmr39c9b741ss3604dv1b714h5oojv5ksduw54c8hpa3xy54f0c357cbalpy6k9t806owsr9wydugkn5ucpnor45x95opn9qky',
                flowReceiverParty: '5ffmt8edgrc03ezhezesus09xgj6ue8l8rder8c9fvj8pg9prhonexramo02p50h9l3fznb4f49j9tx9ywe0ihpqyx2bqueoj2k1st8yc23r0ga7lvlgfspjhkgh7w17xbzm5timdyk89pymxy86i0frdslym173',
                flowComponent: 'j6y8asplyz0fm56pna5pwr8m5yio5punfil4gx36pjyh2yioh4nlbtsb7aes1wat4z97ijc5dpnkp8h5onqupj95kgpzo1mcn8urxgbtv6368u832dh9ibxx56e7k5ed5x8t92uf68jjfriffx1q4rtw5ihajjxv',
                flowReceiverComponent: 'wze6x5vtxohoibb69yjxw98luj5qg8icb9vbhqljdmx9ycxzuku43fnfvyk6l5pnv6ehb83gcipgiwdhoep8aeoo6ye2z9uw8t6bft3xr1q0he0hcai6jlywhiuk9noslha6y2oe9jl2m9m3a71box1chy4nu1lc',
                flowInterfaceName: 'vnywuj5txfs8wzi6y2dr9bcjk2umj073iu83rby5155bdbfh1njvihhbc2oiiwwg09f4hida6dpx5h4tb0jnc19vm5c4hmw696du36kdq2fhkoa4n17lu9a9r5srygf87po6xxa0g4s24gyiawcrnmfuo2of0xwg',
                flowInterfaceNamespace: 'rbwmyt14hnbc1b24jru1frp5g04a7klgx5bhiwmqc5927atduywpgcx7tigebbpeezretnpeav3sqq0kqk7i9vwsqsruyk46oqlycyednacxhumcbpmv918qx3a1udcmcdhf0ee6wq8748xhkhrzq5351b4ogk2u',
                version: 'axk0syi52ylmc43b99ha',
                adapterType: 'p0zxeey7bpjdms0rp697b872aeh1ptzd4mpqwwyn41i7rm447ye0o8p90cce',
                direction: 'SENDER',
                transportProtocol: 'a7apvyg6b41ochhnrlkvd9kbooniuoktyjy897hmcds0go7h6x0eph92gda1',
                messageProtocol: 'e2qp8gxnp6ogohko8idqpanl7l3f9724loxl1n5piwkh2edb2mk5n65jeyzc',
                adapterEngineName: 'kt26aymi4und1j8mlqif3cactq6vgpogdrsnr6zrnhzgupb9il1i0xwalyvbg3t8ooaol01jqpysd2w0a0db0gsp1h935bzywduwsptv9ondsqhfis44gaq6566vofyw5s2fralx6wod5wrthxrzpvicjfvwpngw',
                url: 'luq6ye34ikodkwlsbdrrjplnm7t3qt2z47e0gpdb0bwcjh95mxtybpp0jz0lrrr3ywr5jdk8wqfg5dof7xucl0dsv3fbvq3e7entp5tmyv37i3gx6su0oq5ol7jgs7ytqxfn7w2eo5lypd07pnhnkwf7tkwdwdh3bjs5thfo9psb8l8oka3l9ng3loewc5t29ev7kkrcqwva0dubep59sxyn8ac98en21heduonz2x59chzqq00t4tc6eagnwq98m1289y3qv1rqxhkikg9g2kvuuohzmm3rr3zq87dhb9u4ao1xywrangd7yhm4i2di',
                username: 'kxvn6eelvtg0sgqt3ttzcdmv2d1ske1bkvqc95au5twwohijbkj3y4kfua4d3',
                remoteHost: 'tly55zi2zwvajbatzq6a7i9sq5sf0oov35zmc7nimlrj669noqfzghzoeejvmcsdgq51a45lo7tj27zc77qx2138uutac6jhj7a30lq293hjwe4whv4se5rqcn5z150qsc4d7wgybtu29uq1djsduzflnyph83tr',
                remotePort: 9966657725,
                directory: 'qoklibp9cx80vnypiuc9leb9z4y6ziinwgwpiomcm4gkwujv8ggr5k3rt0vrwy45k6dpkyv1chj0w73hhstdw2dhcfhfk37foen7kcajoav0ccb6ebgwhmo8md8ut37pkft7r15wroswkfo85z7pmj108kaiug4cnzfefke8d934nr88rcc1neukc0whk7qcfywisgoh7qx2vht7jrbr4ys4k0295obre9bwby3mqzj09c095j8a0cb1m0h54dctykg1t03m9vjv0dp219v2wp52izhqpsm7qnyd3gulcyvdr3i7i9j2i80qumhive0ugqf7jx5b3gbg66h9h9nr7k0ruwtnmtja14rtw4e9i2jmpql5zsn35k1nzaz4x63q9isogczh3m2lsfd9s59ks040a36akjpxufifos5b9qeuipj9bpaudv3e31nphu06tlhsod9bcqz7i77ruzpfetbue3ep03277kmsn385qup2zrxrfylhbl7t8b82xd8wmrc8ogwduxs4pu0jvn4v3mn5ysq2qmro9bbvgy024cbzdi79y02v89i9von8vbqckb2qrwm2awerw4zu0ha99d749463bwif1wy35ktsdwvs8xnlvqiq8isa3szb4ig7bfcarkbnklh88y5oaa519qti1bynb1lsg2hzk25u83yyzyvmglvpgdjsma99y0qalivrhe04jd9uvfm5k8nt9g5kw2bgrz1qp5rm1s5cy1isxlge930c2s3sp7i15ytt5rq4hiwp6pf1clb8jex0eftufbqcgt5tlkgqkqkxvup4ba6lqrth9056ku5h9db4gldmq09lmi25zqcvv4lsi5fn5gpmui7akx4cyme3o3n13s21x7aytt6dtpgos4wg8y9rbvlpjf992olnqp4vjz9490lpgma5u8kn08u2pbmgietnlcsxr0xye3lpsjcz1kswhzn4ls3nqw5wqhyrwz2htp772c3zmqcxhyw8nddczmtz8pqcbzvmt0xb64m8',
                fileSchema: 'n9wb15b4y0xm1hxrkieg2m2vclmomg5ghlxlcztcf5tdubug8pzjfk72h1tp3y7e1u2e8mzk9zkbhybr3hdythvunwppfm66nv4608zxb2el9t59gf6q681rdv2ub5yo546uk5c4dcvcje9jvbf682zbgibt8hrxjriacsqld8lvndkctshz5fpq8d87d48dfdppjcvxo6br5rj7nj8zwtc6vklpps115520cqygosha8y8emcbchtre6u6dg3krnsa22ywkuc164ixwtzu85agklp6r7ld5s1q19078mg58zfgoqd2xsfjw5svc41hc3334vgpltoo2zdyhilbbzx6e1h0300pfp6rzue14iq2x4wd96i5chgjs5jfih7kzues132y5fw75qcfosq1yn2yp2kt761o9s0wo3n290ccak1uyo6oxxrlkwsu7jhthwu1rz5o71g0fyd74vs0dsbjpjxc61ztud6u6nvmjaiq4sgwfzckdosps9ochygxoemjho4ahjrceh4i8kw5tl6eoa91ch3qzyvcasfd937hh65lhlrjvglu5a87w2m2q3xk2rr4t83k04zqofhrs4wovqnbk9ennmhvd70e7gemgylbu61qqn8cs9i405ngqgu4gr6igb54d8m65urjxu4sxe1ib8pas5p5nfzaedif06bunfhdlbo3o63z1bwx0kg6hseovnitz35125cclq9ouj4ykiz7df25xj5mxemu00zmlgpxyj2o4n0c5q3p9o0xmtyemzefncij8fwj0ojr5lpqm4rls93lpcdn01jikz3274a4xm8z9mini0yszav1v8g4gkj7a9vx51ake060vj3i0vrurbhwxkoqics219ilpb3ai7wnlzbx8sdqz9eopin4bkuqscn6y7uufw5uw2ms6nuivx18z1n2jz3djjfet7dbu0o1r5e9opv6dqnkaupiy8x8iqbd25u0zt38e2u57wogofo5458ccxkgwsnibykyje9v861d20omo',
                proxyHost: 'jyn2pqsd5rbfytpic3b3yznx7s4640f60t9tqnxadxddjk4msxcegvjs08xg',
                proxyPort: 7757016776,
                destination: 'yh9oiiz8gh5qgp5py4wfzc8rw8xdphkni7ntnk7qt77lcefe215p73gldb2wxx4a7drviwzkik74fm5kxy4tjxizv3fqp5xw3n0chwge4ng6lo7h6lgea2xhf8wiuk4zsf9kl2h5atj3blf3peeym4b6q83m67ot',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '5evjiv5j6p2jmsescjeac8zvyp6nsmpf9cjp2ahnxhyl8td8i4lxihqevew8jeb0ibkyc4rgp683d3z6rxh6dfs1vh09rhur609g59nljluh15d51ypurcxryf0znhg2imdfbd4kt41rkh4cbl01epy6itjc80v2',
                responsibleUserAccountName: 'd3ud5q1ffh59xhg1phrv',
                lastChangeUserAccount: '5t4g3cz3zhcdgmhjs9ed',
                lastChangedAt: '2020-10-14 06:50:28',
                riInterfaceName: '0ykf7k9wd6jh4bew7zr2nwkyh0z4dghc4tsvtpn1rp2waarbx7ikmkgqxgkzf68q4ntscmxdm6hysifwlpnbr5z9vhfss2vydsfebwx2gf367w9mzcg05lrjln6ln2mjmzqu4zagru394jf6dbgft0twme7xkfa8',
                riInterfaceNamespace: '6wgkxyq5seqbivl7kmylsqsguj2n64bldz4ch8jyaspyc12mkp97zbyfoyr3b8hwh6fokjz1f8fq2zi8k774il2tom5e1qyy2oj4fr8ldpt8k7tx8i6qk79hx8svnoroxp38pfyxu7feaz62uhu63k1z224xetgk',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUsername is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRemoteHost is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: '6krttfq9ihdjb4g3wlvp1jb9sdycfdcl2sqodvuj',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: '9rdwv44oh2qp9kdiepzcvi3757v2onh0mmi5e7o8xubuohgh8x',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'xikl2z6tzks8q59lyoh7',
                party: 'nggeda732ygn6rsbxcj8puxehzbgys8idfmyy630h2g3faldlk08whnse236q0fusnd7c1kz0c6d8u9ucecmis2eqfgzyyxy7t4vy1kq26uylakkdsfrejg8j3bdjefjbnenf1rrn5piki101lwx12p4ci74hlzm',
                component: 're1meg1cr3c6ul10blv5f1d22rf6xvh0pnsmg0pnefbkhluu9rf8iqw0o6cz8hwy4wrc30gvcmwd50iwayhw619bshsyzer1hfffbcqr32e995y53cv8ajs3csre42yjli4sflc36jtoqld2hfocpazhnjy1mfax',
                name: 'inqx1852awb65e172rz4i36u8dsq6bcq865russ1x95ngci8d863f7g208gilyqtpj0fon6zhwyxps6qpzsj29jmlfk9venehpihvisbhchgfvjk1gu6l3vr14870tcq77y6xwh2ksglic4jmbmjfosk7wxr3kj3',
                flowHash: 'exxfptkrs9t5wn09un9in94bwxl51e3bb5k36zgu',
                flowParty: '56ysnwnxlpobaul4jcq1e6srq5r02m7pd4iganul16gj6k0js058rpom5sipzoxq168qwueisv8vueg0afb2qibeq28oh99yeg05udwm6izfqkuwqud9qmtv1d0w5kw7qtnyg7f5vbpvkqob1dk2bxyqau8xjn1f',
                flowReceiverParty: 'ki00fm37aswh6l5tsq552grlwq7bg7710rb9pii9a99uojt7lxon4aq0xoek35qb7hn1eltv9a50cs1fff8mjomvt112s7abg3xghlpuhaz4z3kgd901n46aminx64yy6gdesf0chzdbrod8h1x57a4a9sogx8hv',
                flowComponent: '9maeknexk8cvvv5el3srh7aryovo9einxt1wh45mkm4ws58oo2vji423l1k376niinvusbf0e77rfxx7g3iujvvoav9u8yr2dkl4jh4xzg97gahn7qm8ndrfov554cs9smk98ggpmkeblhbz7zl0fijksalen8vv',
                flowReceiverComponent: '6z2pafhuyobdhdwffcgb7c5xpfzewbmqyomwuxxni6w73lef06le9pk3uu8eokvi5pi606hdm94wbowerr4419m4f00wc0a74xhh88pthcnm7u2jhrilujomg7f59qutjmw5pr9l6k3a4k8okk86wq2zjyelqyq5',
                flowInterfaceName: 'g2ixk7uy6h9bm6mchteczucj2frkdwkw648i151m2lb5rfqxjlj8o14d38uwp7rul68hjav1nog503t44hadkfv130e3uxga41t621z0r9qu2b0941opsw9wbxuc2jn3hk60wl16fnuaar0b2bgnzrhbqo0249o9',
                flowInterfaceNamespace: '9rt8hj5136d0asx1asfhivzsixicndvfnhbyyxuwz64utaipq4io0ze24s81l9ujm5ghn6ky7amgudonjqhlr5l6fzjt3ja9j9ya5vzk4nlvk1486g0reddjkad01dfanwbsg1u3vqynds6grvre55hxskokyvvx',
                version: 'uvlzgvn3jqkql4u6x1b3',
                adapterType: '6izm5kc5ggrv72bub1xjpr7dl9y4uyog9ngxifzo1jaq6fm1xruu4chveltc',
                direction: 'RECEIVER',
                transportProtocol: 'uruiz1yblapbed45u46gytagfh1quyg56e1vj2drn039ew3wji1f0apxzcnh',
                messageProtocol: '7i3nvp9l096xzywnwkr1iaqmsmq35sbve3p81744ukkral520pbf6dv4y417',
                adapterEngineName: 'jgsd58vtiktg80tzwl6lba004zh7b95ttno3w0c4htr94gdk7oc5kardl050es9w06cy3nm4ermi12muttk866a5p1vp8gr5x6wl87ckwhboyr9njm3zhu8d076fbhk3y9fkc3gu6tosav6qy4fd23w8x9vgiz2p',
                url: 'e0ml9hj4ayi4v4maaeljfdzmu1113lh2dg4ahm7y8zfnzyaumloe1h3b8cc5lxzkap9j7t3830sh1rq7441ph5b5v9eue1q27mpvj2clnx4auc7j67ekivdn0y9nvybilmrvmxf4gmeo3uxzflzxkqp3ozlp61auqmol6xtrskiv7neqqb1eccsyfyjjkecc0ony2hu0w3me9b7r7gfqpuprdxlvhl3q8rhz60z1wjbttqfnf6vbj1czmptbpbg3mk0ni5jhhpn7byrlf1c2v69iypkckqwtv5m6d2y793uw4zvxeoym5btr9p8tck5l',
                username: 'll26zzjwooguf3nq9inqserefzqie3f4qg96macypk8r7r64i0ok3rx8qdu3',
                remoteHost: '2n7lsqdwvg9t8vnyk50bn4exy3a6znqv7702ns3u8jyj5x7ln8b16rum56ako44bxfmupxvzroelrc9tse341mzwzy9fwzpmjq1ws9m01zcm3dvzrit2pd0f8vq44w5ti1n10uo373m25qi2xi322vh9f6pekq3gb',
                remotePort: 1381706664,
                directory: 's6gd1i89hh2yo59z6000b0amxfmuk3crkthahr8my8mefw9k3vr3oajchucjafxlst17q5b29wtydhga7fn5bv046cvdwowij0eeh880whriiye6atjtgdyw0slb7ocrq3nqrrrnncqfmi1i9ky3rammmuym8t45jzpuvmqnitptj0w0rfnacvix7omv5oujtr92srrazi2wx4rumbfcsfu69rrcd1ybrq392o20w6tmqiikgwm6vism6670rdilmglqo79fisfseomg8yr35m2hi62qmdguc0x6j51v9km1hbqytmm2bxmck7y8m1kqo5fiqubofvxsz6pv7qcq5e2uu3565ri73w7fvk3mnc7dw0kzxi4esamvtp9o19gkcn1cgc63xymho7c9nbraoj8p30edffnlr5or5g4mormbhcx9q4h2zkqn3n0oh4ggg57uw5sq0xtv6plflaimironpkts1ahdfdg02cevyw4fnt5ducw2vpvf4py7rrngbzxga60sflqg7zm357vsc8tqum3z6kx98afps85r13ufg1zc97amivsm2up7e5xwxirfweyuoecujxymfifxn22e6vlpp817ugyake6vktqkfsczs1hqt1vq892wjgs0q05ty93pei8kfm97wxu2dn2ear1j2yynh7ynf5650760p94nyideod1d0d4uurdvdulqee7x4x9kepxkjej8hjwma7ywaqemar8a5ovnhqf9au8kauh2y80jjlclr7379y7ub1zxrwricabfldpmz6xidqbdu5h12v98mqvgyhubz2zuzzd9xtcl6w7b5iv1ibzaqi0n87q4l4svzd6u63etctw4vfgka47fa9flp7t0h3xm7e1qaixb4xqp6ghii00f88sb9x23v61uou0d81qom9kfxmow15tpqnsypa4lg0rrmp756qmgcq0r7pqafbk08z59y4ck07mys9ta1gw3kjpud5razt1dum6yuawini77nqqlwnvnhim94a1z',
                fileSchema: 'f3juc7p0115xxlqg4rb2jnrox40d4u2ec9vq3mx7xxgsmvodv4r49zs0irs8mwi8t3o81acqqe1n9p1o7og0fw0vcfgudnd1x6y3pj65450joqa5s5oafa8ddqss5oxg31aujhy1ip4log3dub9x26yhmpoa5x1sq1rwsrujhe0gvi6ue61w7c3c87t5worqlw0jmcdrpuktr5vzrb2c7cwbgfvbjv656yboxy1uuo0y62cp6gk53g64t8qku5m9suzwyfrf4u66alzwe1ajbqk4wxoivi8eyg57gxkmwcqx6qdmuy3jczyy5xh34m3cynndof7mysalv4xk3rea9lottkfqebg89c5cp0ilokhb9kt5le77v7j9aq4fs51fvaelk86gmfkmyld8zt0o2cp6gl943j2w16r3ygnjat93xrsm0630c8fdmob6yaf5kqk247houhsrgszkdpx0tddrc92uqd12623bgwqz16oqr0mibvz5qq3icrl9o03mhcfsuogab7fozwbm2dxcn8nhcomws80s7focfrcu53g6l2bvm8twyzv4wzwzutdsxeqhjxvr3xtxhwe95739eh1n0rb8frapup0g63jvuvbzykhaybkithmfg4ybf0qxx9k9fgsr8wbcol2kn776cchkmvk2gmud6djquwo088edv735pdp133nx84073vsx90v3sa0de3o3r2aoj13ht6eivdan6nk5dbyl2nfwg6nwk659s7sog2wu2bu37bpowvh3zmok3edtt2s0dwhhbbzf1hk3e7zu0ks3uh20r8eaw748onoc1wcd53mxvyhww3otx1n0oy9x844kgxhl8w0ndxzevtialw1fswhplwx7fglkvshc654zuh5gyjw2n7g5h9pozo5b2rhdmbvepdzx2eetywnsxa1hy5ooaixdbp6i8atbe70j6gziqbe4f7ezur631tidqufq9apllq2y3i0fcjv08z3mq17677zm2reby7gpwf91u6kuw0as',
                proxyHost: '40tgzesoa4uh4l1e0f18t87bpgyuzinw5mjfovtejp5kycyy64e8tmcr1xdo',
                proxyPort: 4101289019,
                destination: '7ax7hrk01g82k6kromshdar4p0oo50fu07txuz279fhb9uho2wnpwbkim333847bb2p9i834990y7l5i3tbu6ro79n553ntofk4wdvt9jedtw2cpkhrdijgwedzwish9zgg3pcgae6ojb5damz3aktmtd6hcatzv',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'shqfw5tqbia46v8uy4w4glbu7kggh3wwq8w5xoya2ob0vur301t2ou189z5fwwwtwnywvz6sjla59066g5eqmmtpz7qmfkm8emj5qq2xdll3ybqfgnl78uk0b6l1dj85tb5oqaq3ybdlell7fcw53s5okqcf183n',
                responsibleUserAccountName: 'ezfbrdgub8z69jvjqrhw',
                lastChangeUserAccount: '1piammhbzqheepmi0w3a',
                lastChangedAt: '2020-10-14 21:57:10',
                riInterfaceName: '2agkiel8st4t0go29qlg7oae040cxz3mdivzc80u51cdo1kf7dmzq6ltxys3wjrumkxndtvkqgsqcdusj9n3sg0u47mkm31aoku1et3szyfafro55tm1junmfi5ge1sp8xah07st3jhc8ybwxomyhu58yegq90gd',
                riInterfaceNamespace: 'vyw2a3fjrl5qyfkdcgnz9xeu2modp185z9hmh1or7nqi4f3u0g6lup0ey28adgo4b878m9w134quum3nhpg69i800m8j85x9ywbcmpsgglfnrsqfxcyzqgp56lgxts51vbxyi13dlacxp1clt1srtv3k7s5ibz5j',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemoteHost is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRemotePort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'gjo8bl1avxqwcdppcn7i9k5op7wc0xv2gg89jby1',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'a3wwangc3fldez4pot39hhdue4zf2u5pemax0osazteid50uc8',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: '3gpthp06hxrf0ctcceea',
                party: 'usupye20t2q5apratlua99imrexesa8uyculqv4g17n68e4sr0rhff8g3klcccb5i3j99lq51oyxritj5n2bsfaoeay2za0jecpbkvyryh74tq2gh0xmdxe0ac561pkuql9ulhlhafcei9jttbqpulhpxd80u0dv',
                component: 'j7wc18txd514b2s9kuhzgsutzoofmxxtgpk029aifzura3spvyqaa7qsa4sl9yej7zxwlghhvnufr5xmbqjr9aizmex3rjtq1ixzktbehifhtnlqqdur187s5hql0cxh6sdfkxo7alyrnhtmwvzlxmfue2k1r2cm',
                name: 'odu6uar7m1w4my09u5p5lcwjb8c6zfebtzuu8k6m9hpw9dmu9r5wffgrysmo80yxonqcm840feh2a29ah1s6k42i8nvnwidlh2p5glllggiwgmcwqx8i6f4ll8cstly11rig80r4j171q3naxtjy4qqe25tdjmlx',
                flowHash: 'er1xhhsp5bhehj9zksevx362mipy5fujz18kzv07',
                flowParty: 'n98fz37fvdcm1iy7z0vhlzop2mselitf0ogatwl66r4zq99hlvg7o229btqnojxihpetvaxgxckerwk6tilq4ajfppxvdu8ew9djhegn42js69aozqxwidc834ss4yj0skhl7jiwszpd1pkthjd6gbz3sh615o7u',
                flowReceiverParty: '4ipcwemykt7szhsidnrcpd9cnbas3q8pq14sv2d4qiy967469k2lbtttlwy2av0n2yu37rxuuuluz97ylkm5rig438robxup4nwcic9gh3qus8o0d21qfbtlzuxg4oo7o1t5tsclhf15uoninh5ass6athqc64ci',
                flowComponent: 'rb9b1uwpykk5uphzsmansyg9htcd97jw6eszdnsjn4spw242otga1zd6zxbiu21ue7o1g9ffdrjyaa24lmju876890zdrvip2dgsugipheco80sf2qw4tpppl8r0chlghoz6emdr2u4cbph736j38rpizz6ty1q1',
                flowReceiverComponent: '13v6j0konbpdqvc4joa6s7pev5l009n7mxzsmcm25kl31cbgibwvzzolkg9u96eujqkhsycw0j119ao28qzriorppkkwrgpkyzm6avamg94lg221zc40cad4fmd0ytwz5uhton44z4wdqvusgyupfjpu8qmuffx7',
                flowInterfaceName: 'fjgeq3vdaihywtjjcmwectlxg0ep9wp1nbga0d9in3rmb7yk3o7px7q7uj7cvgd3mlkhgklg061oe5fzzmn4lhuzcvysj1ofsedt25st5atu5l8g2x6yjb5chssov3yef0y4veb6wxlx28hmjqeytk94qnbstwbj',
                flowInterfaceNamespace: 'h7618q3zt951sthzjyl5rltgcuwtudu446bv6sz0d80dzp2j27pt6sr3rltb002h7ysphpvmwneryt7f8k9ehtr1vmlla0itgb0vfxvc50eirphqu3rzf5346s8vkotywijhc2b3w2ibc0he3yx9czg9fdmusu2n',
                version: '91ihwxni7xrswpkx6imy',
                adapterType: 'kdtjsx6t7hkseobj2pkbt3t34m90nt7ny1gvm2e6qkfjejdf3n4y32gda83d',
                direction: 'SENDER',
                transportProtocol: '6rb20cg2hfb03gna26wt8y0s9dlnr8wd26mozbb0xcc526qovrdz4yejz49x',
                messageProtocol: 'kiov875llgvapghpqos1kngg6ry3hsfjgl0xdvraq6cxzs7olnqu14c5cfal',
                adapterEngineName: 'w0lf9nnvk2mvxca3l327ahvqz3zjwq8yqqtk9jq0q79pp2pixoj4pp5ngk167blts2clsyxxy829no6970azxcr085wmgg3g7x38qutbtgwnk1tw455wv5y9wqf1vueuk9pvr6ll7n1to4y5m4h5t4ytsfx18vb7',
                url: 'k86j4ia45as85iz5hg5hpykwu1924z1gnee3lv5zbtezr13iun5pp2ehg1kzuvekjabwh7aij3qnyfwlkl5plahhr3na5ip09at0th6ov1dz4qbn4sxxj5rjl72oemqrcfzbylzxbvv8dzjf8k0ame85nuk5iw3moet8btu84v10thipnxjqe2xdf0aes6kqylsigr8jxsklgp2eirdjptr6qe9egnesjyavtueii1zllyp92yfxc50uz94n5np5b7ltu4zips5c4ffvgvejucmry3tdm3wgdd70edjoogwisvzhrkaj4qx3g3fzbnxo',
                username: 'wrnicox4f8i0f5knwtpr49pa3svxssmsv4lhz15nuezp2a65zkpb5csrxu1k',
                remoteHost: 'mwydwp91e55uy2nvih4bil5cj5uhe1dxh2401jpqjxsxbyqios7p2uh8k1txj7g7v3yyznablobcleyai9p8v91s5v0snem3bvpis9rf5qx53zsfhenlqwjsn357xagjqpaleot4bw2prs74pbwejk62a6p5pm3o',
                remotePort: 66317411192,
                directory: '3pieidjfwz2ryobsv146ohhnvjnam0ifrwxgocd7ry61xyjplgn5ten7tmilqshdqawarohkepyvt3m31st2qgjldxzularijme7u29xfm836qez3p51f6mxn8g4ri4tjdi4d6l0xwmuczcevjoom610ozoabxc9rxjuhvrjh3kbzr8oa2sqcud13xdasdgsm3x1j99z43p8ra9tuyaa8b1uwo19l3m5i6pltd10iw4gfwlae3ggab2c7di5i4vcoo4mkwfypx6rh0lzqmvs1nnta2rm1yjv9hbg6nwh5zokmjfjs5v3sky5b5p5mlykv5sq3dtdbu687ryoj9s1kvbnp62ko6vcyxzv7vw6wax2j98qrfhuwyc72sev4vqe2z7ygy0ajfx5uge169vuzwi682m2b6p3qphljooja13rbppdnqcate4sufwg2okaiet08rv1q1lewbn2bzo8bb6wz8z7ccwg41gcmkjwa0391tuvv0htry1hcviqydd7dwba0ciwxsgd0n53nbzdrn6mkwpcx0150k388ghr10w6qh3z1atzva2meqjf951h7pz8nwjhcxtdxy6a8q88rkzztvfvsqhy2xnapis70rjyeongut2uv7u7k5mr128qa91m704asaqd3ak4k6n09o4zwuwz4i9ijkzr2nustbxz4l8ol2ttwd5ucj7muxamde4jbs7r15g1vyumw3h8gi4lpc19z52m7egk1lsr0iha97yjp2qptdmgpcfwn1cp8a41on1ppzvtpp62lljg6t35mokf5jaaimih0usn7ntpi3ge26flzq64j9nofnaixy6p1cdmeds1hb8uj43qu511pr3dl55ix75pv3pbmoop4aheid8wcdlfn23f9m8d6v0vtcvdm51vjxejky7rsan26n7jm1qwcybj38m3wjx6bahtdaarey1xte6fnowrca5elks18vij3549ketj9wkbnnyd06xe0622uydiln9pbguux6rriblbqyweyw50',
                fileSchema: 'muoh0xdj4gsusl0suhn51wvbx4b7hnnkmfp6ft4lsfvrp1kvsc4rkclw8pmzho6caof8216m02llx7c3jbeesfi90gaxc7nt1iu462e9ti1mo3im0wicgxmr36wotrgsp0auahgkgaoqobl9vlwrz171ltyi7chqckn4kzbfmk6o6kgfpw08f7kohey66e7sio8ly8m1enae86dgimyybh08ug9uizwrmvw26v9i6az335spz90risiznbdtuydm43f7dqzog0rmjqqx738o9422gp55hcfx4wlnbc7sw5j8we18dxqo1hovsvhzflc0zkpwqadh7tl6o1jyxgoiotzkwuch3gc8od62cocfmbr0m7rmhj81ckzvnm06jvb70ofkrhqe8ymj4xs917zy8mte8kpdzttj8ikq9k532ye3g0pimq4imyx4ho8hc3g8xgfz0niudjs2xacq3zfkw8k83diaa4y6x60g7rav0ql92lp3ez1jd9ttkwy2za6byg1ivt0ig7ofr859pa15mus7i66h60n5jvy55figxqu9umpdt16el7i9aph7pho0ym3c60q94hrtgaunnxk9e4m65djm9mof8mhjgiko2wjpzdinte1jfp6vsv2515i1nxi36yukid7mzuzetwwrelcbhszg2lt1bi7wg693anqcdbvojyh47nkvzot96ukz3bza1ol4k17f0n5ruoitfjym43h8zuuj0ma0ztlwzkihbs41mdhvef1zexw835smfpt5kxm4o5fob28klvrprzjwsmnzfo7yhtzwmxqay7tbuh1b6ftacssi69pav8ttrbuy3nv6rt7mq9n5j5iqwk5q9fob8mxx8grr08qwo3kqrhu11rzxzgf2uga75pgyi56lolyqz1l70baaozymjyu6w9dn4x6w7jvu11w3mhy19jpqjjes4ftfvd53b9i000ckvwckcpnmu5i06f86bjcys8stgc60msei1qpjo8hcxw8cbeihcyzzxabjw3wl',
                proxyHost: 'uvnaaf8j986g8vni1h8kwvakado01v9gi3mkcfd3uhpla0qdds1yos11akrv',
                proxyPort: 8205970993,
                destination: '7q76c9gu470cy2aluj12lymqqx46ssbmhh6lb4s4bii491z6g9496j57csu8r01lt24u2mtkfjkpq5u2br8txgm26v6q5maqjz1ykaia40v9jzvolts84877qs9fucj5n66i5tn0ipkwgrlwp0u8vd9oal6kqp9r',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '1kvmducd2trv56uufmi55pp6d70usnotcpc3nxwk92xfl1i54263duk1flz34yjhykhshm8zd12yg3gtb7dg0fi7046pbp49uu7j0kbqffk2279a8slbbux45tjd3vm8hrlbj62qw9kwmb3a91nktqwbvizykc9m',
                responsibleUserAccountName: 'yk39lmahvi35tz8s3u9b',
                lastChangeUserAccount: 'i961y0d77y6r8sn9rm8i',
                lastChangedAt: '2020-10-14 03:57:49',
                riInterfaceName: 'eqfxu1whfxivaigbjsidfibu8hy6yiwe08newadj9qte40pa7awyknskqz54pqlcvstc3h2z7i2n96puzeiy9witm686w7vbtxuy26ih8vcamvxk50pjwlg93e5p6cgjvojo525rxpqscd2s77eh40lajfuslk10',
                riInterfaceNamespace: 'gnrwdqkt0kbtbccl3bbtdb11c1s8vzb0hwbvwi3r41j1c41ihfk65a7gaq33g6hq4emk1h7wjivmrdzqtkvgcfqeswxq3vvysnilartyjixiphglg8cy4fx1oyxdvbjoodfjzdfyi5zlzc04fqmtrgoxcbh17zry',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemotePort is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelDirectory is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'rczyr9otac4moh63uboc1097367k81g2utlyoomw',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'igl76wwoiwwhesgxcjmunabr862q5pu61cknruit7z18ef2bk5',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: '1qx5hasmv8039zarnjxz',
                party: 'rmg55nf58h98k754x0t5chhfck1ghoe8jr3ev9bjl2w5iw1z6le0rla6fjbolezszba50sbt24sizh28bn93ccgqr3tk50nooz8d64raca7tykd1o8rxdsgd2bvrqsfl526l239pdm1wgdevn41vaj853mjpp87g',
                component: '96l04nfir50uopki0fff66tc7e7y65vtmu1m3htbiu2os8jpfjy5qnh8fjctuee7oe9yj13zlqos2xg95dxlvhsai37mjxvtie96wdwusyyft62uyc9w1z9692vglfxe9u7qbwrh9cobb477b790kkrh2g1t5bxd',
                name: '3q3geb01hbx6f1k88leiqpgu1qvr07e9r1x0lfopbno5fgw9v2iql3n2f4cvz4tvkrg4smhxm6p7l1idnf3di4y5gstp6odtn0zyzyxpqthfcsf69i2tweamacl590m2k5c7uy3dpac95vu6j6058zi68pchfyds',
                flowHash: '3gkw7fih3aaubg16jg38fzgxbk3kczym3jqjzelj',
                flowParty: '6bkdy34nc1yjybfw0w1jxvyzi6ovsvbascbhh6r7guayfgcvlaik8yuujhumlok1y09qr1mmqzpmcakeekv1w2g5qlt7txcjhxfo8w0b4gpaaqcl2i89dszab5cqcfbjdqe71tkn11bc2b0x34e1uyt34rofe5kp',
                flowReceiverParty: '8cb47066ufqk0r8zl5szw4ysirmu2cv3givsk2mycx4k6fxwvi2ue47nw1hfr89g4bbgh813te6v1lh6ujj1bj609p7kpq25it7twjb30qsom4h6ygg2srx8tesmwx3i8oq0bdij3xw27vb8a0n5m44mezmg5neq',
                flowComponent: 'kftgi2omd5syv220q4g7sh5rupuw0glfhgyjv9tamtuguis9i6x927y2izxwm48e9r8850469hln9tadnv1wi9orrraw2f0mkzr2ro9cpkdl6wxkkxxg403ov1bvlj0jjdcgwe80yj6sy6lk0bd83vw0gh3vt2e2',
                flowReceiverComponent: '3mf1e3xlnxqpsf9gwk0uydyyk8nculyfeymjjae3ogwfzd3naqljggchy8jigmr7wdrpblvg7phszwub871ogqf1ac5tepfas1m3htomaynwbl3azrz4fe3qiahtyljhrqjr555zofcy1e2pe23avdlfwdttxrmo',
                flowInterfaceName: 'abwnsthbuc2xhxetkb1278q6x7c9xkxaxhem7rxna9sv956lv3zzc8rwxpdp5opat7653c0kt17o5qtjiktal0i34orsr5rryj9eblh5y2ivtieibiiqyo7dqzrnvq3l1i5y9ki082ik1wcam1pb2o4716qm609c',
                flowInterfaceNamespace: 'll373khqbnh14evll9dz5hvk2s79bw3vaan1h603xlxemihhld2ve9xralcvuld133e14hds8nbmdztik8d241p8svlralm6388s5174f6mekowlg5as8jpnsldp97k722ok5cqo7imusnhiwiy9h6a4o8mgtcsc',
                version: 'mdpjska3p20b9fggdv5j',
                adapterType: 'gbdlbsbps2pvovnabgp3rm3me3e45xcjhso1tpyptb505xeoy5hvb7j2v1o8',
                direction: 'SENDER',
                transportProtocol: '5399n14iostcn72hbmipulczx6wnl9rxznhozpgytw6h9raimokm8faun7po',
                messageProtocol: '2gsnavgzt0paodfy7dokfgy7ury6eq7veuyk3694gm60wqterqam6z1br5en',
                adapterEngineName: 'ulnht0ld21dt1ih11t0aex89ik9crb30i9cph7r3yv3u3ktt46ehqs3xonwf6vzer8272mbpvi9al1mwbnzhwmf71bx6f2mgzfoh4v3t75trwpnzm6svxyveaksikxk2pvrjp70qc2ebc5yibntwe2smqnopmudl',
                url: '4napm5jkx4f2zo3sjwysu8jfiqkr7bow7mhqrwkpcfxbvajg2pstsydd8i5sz4eismix9yv172lxzd4mapt8e4dkuyxyvs8jm9v3nifh1oy46j0jnwxo0dkctmuvmm8tgvpcnlg6687imn2ziy1d0romajynqvkjky36pklfafe3x4jvnhoudwm6wje7kf7ommyw0nostspeckigobwu6p6wuf3n847v77k0wndv60inhmfk7bfrdgt8xl3q9p1wxzqmq7drqgz36p260jxs95hsga3sosk4j2frpesr1yp6obux0vftanfc27mnttdz',
                username: 'q2xpjw1h8a1lyezw4ykdvywcaigo9hcavq3luk0x5igijltnabmcz5mievek',
                remoteHost: 'aam6twvgblsc2fmoi5qi9800hkigp9cntw6t8a9otiqw4wpex6bsbnnge1nq1i9hv8d1x2rrbz5rbg2tcae6cvvzojixgl203oo5ifd06opz2g7en0oefmxy1qvxvugbhtlehifp7f0m62tgi0orsv178lhtyrmk',
                remotePort: 2314169027,
                directory: 'abigc0siudq2fwg63toqdmuwe6w7jx8q8gkahxevbq9qo88zzp5sniv92w3yy2fd1kjpsrsjg0q4izk58kng6u5v7j9wfmx1omm1zhqtj8h32ha30sx03wobjxmcydv79iv26fsafbi2frunt1umj462zb8brzynhlprrk5s2xafiskgsz1l3wx1pyk7pf0slkiiw9540m8q07ne1djr7f5cohiwo149b7o2osf1ne312fx5y9o1veelzk422m6pv4kqfhubqsein0fvw9t31wson7z96lljl529denea7sns5gturzpbxy1q890z0z1jwtzyoxi75ogl908f04dnvvnwljks22bj3mo1ltr52z0jj423zesvh7ae5ntg92u7mfg1bavdtav8ejto1s819z5fwkzpobat43lcfoxeyz783wijvx7ewzpzra4hflyycyfsp5iaqqg8qcqaxze3x2n3474ay7zr3voqjnuqzuuvx63ajg2hv7fnzyz38zqsee53hiqvnnmzzctqq8kjstcgzchxi4ntkppl4h9p79ru3xik5uwv0birqhe0ijiztr88z8vf65w0e82m850f9abzbvz9yr3d3c4pb5elw3s179mcf5qo2m1vzuw6cw3gvhvshwgkviq66piof1zbxsleb3907kduvd6tg0cbvbrtz0jp5gubkedyxg6jnnne5e7er64nlu0mzl1mjl58i4qus860qk6zsb3mdjmz26lev19mnjvy978bm6gv5l7rg1346yojzl59pynsicr0lmhkadu49ludbwbip2bo4rkfuf4op88mt0g9dxahk1vhjx0eyjhoh7az5iy15cmrrr2vaqehubceb77ybd69wua69yer0wjbrzmcvkc0m7frbi3pgz0e9zfl1bhu8ulaj33rl5sfhki1eckf2czt3cgcciqwwehqdgsgst4cav92w1ov3ax8wkxzm093ate7fygblwxs8y9fa7bzhljl8jbyrldo3tosepby2tq4pt3d',
                fileSchema: 'k4kouq56weuatpadslhtzpcbch9b5k3p7zvu5pq0q732jgkfgsirvjpf36ydxhwqpyeyvq0ujdt5fzm6eyqnl318jog47pppasemqbwpcu17su952p9yp41baorsuhuwwqsbcfuls7kjwvqf05p5d6d5qqxfanfax7btae4tsiw8hcq176py8prltk8lsx7hbqqajjw32egbi4qr5t0vdf10anagijffxq3g4bkw28nek6dweph2whl4je5mixep57rfus23ebrumx79xrayii6b8or9j2fu4me2v4nbucqmaxbtbia52rlqcuda66arnw8fywsdqmuk87ha0uu949ybrgh2oifghveki5sm5wy3cee48rgfs3wvutr6udp68ci5f2zsl5vvqcjojuiewuw391k43jgvj2yz8gex3qjhcvtzpr8oh1dx00we084csvr26h7515fw7dpl2w4jnf0g38gcn49mj9a4gbwu76ta1m5l2t8lckfn8z4udqevcmkybfrw6cnfiy9qd5vzas2d3jx6dn48rdt6x435gjak1see3guy0q0j876o3wk2qpa7bdvoa1i31ypit5g32h5x6l0khyfu4y77h18kosslpeya7acvg366ssxj0zkhw2vg8af2kd3b2i1zb48rjb7cuiqrf5tnko79hkbb3317ij7pjnudygt2pia5hhdd6ac468qcood3bm333n89er0ohf3vmetybvwf7nyyr82ax5008492w3v0fv8txtevpgei6sy2un125aw3tk5srojz5h8eobblgiuomrhk2ofea0l2c7k72c941yfv74jnrl6mxilaogsnxz6zv333gtp893ilralfx6nn56abacjfeftgxarwyoxt9gscvwvk25rmcpuvdspjwy9kexiez5sstgw7x31hhpo4en9fra8hynqlhv97x1oidz4z3q9wqhr8jwsdmmmw7oh1va6rnr0gs3e4u2t0uzled9k2ihz7doq0tx7b5ittzg5jzts6',
                proxyHost: 'xgkihbb4z9kgva9u5g4wx3tbg37lww1ozntuu7jba0fk1w9a5s9niv6o09jl',
                proxyPort: 3832744446,
                destination: 'cxx1rhpw27q7ohzprk9hlvsu7pn3ozptvru0cdkk7rw84zv86nu2nl9ympol4vqojubwl3mfy3d0wqhsfjv477mldjygpjwnib3nuld43e2avbjai0rmd76geilryc2iizrdnjz11yta4v6c5qcggx5wjits5vty',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '95pvwjcbq67g1k7fjjn3cher5bv2tfqy0oh1lwfke2lobjq35povjmbxy6vqcdcixrzg1a428kydyv2pmuonbzxltrirc131w7majjmj99zlbmyq7gq76ndoc8ewlsngly6mrq1lqt6idg50d7cfh0h9cnuavnu5',
                responsibleUserAccountName: 's7wsvrxjt9wcebnodn5c',
                lastChangeUserAccount: 'dco38wp2kx4zxt8u5zc8',
                lastChangedAt: '2020-10-14 04:04:52',
                riInterfaceName: 'i80x3dn4rnaq5xq01eplmt56k34jlds5yoz5k0o75pajmdiwoarp15xae5bj0k98d922dosx2r61r5i2tyy9vttrc5gmp06xdsequ83b9zu19wzhf2ze29wwygggh55txd8w0yqwlx49yac028dh9zfsogd4sos5',
                riInterfaceNamespace: '7bwrxytfjujodeguc7f6nma5287m4vro9t98xc7o723hb98yfzslu40wnf61cn8mf3kyviarjkp5sbgvj74yjp8a4og6tiopdzbny65jbc206tn9ednvy3ny1lzc7okhxtq0e25pv6t6sq3osjvnqor5ssb3u1ur',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirectory is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFileSchema is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'hzk7wjky1ds2inax6e6d8kxzdnqrfle99wbn2r5s',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'j6s76z0zn8hzkd2cfwrjgo973cf0arts8naf0o008gh7x307he',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'fe5boige50empbtb3p7z',
                party: 'bzjdwhdwbkolone7ots7dlory6rtkchrrbrkjfolq7eez4bnj73y38p4j45iuch70urt68q6qlp0ibjphrmryvprlk15xkmyqwxk24urze8131kwwrmc71twd4hr6r298maki7ku3u24w10s6wjjxepy0zy1ppim',
                component: 'uz9q5pjwahmf1jhs3rk482z4naummwzccxrjuz2lygdy0kbp1ioeoxh0l37j86fe4uva16cwg2vxowkqrclqg7rpq8ghm2xrnz11bmpiiv4fzmtxjmenl8ryyz06hmj4duiwhrpq7csetqs6y7e7980012vo874m',
                name: 'ow9uyw08ly7li38jgaus1d59z3hhi09ggh0lxyjwr5el5zdxj9fwlwyez2b11k3v55hnwh8vk1f41g84doft4ipdkjw8hny2iphnvwfafyrf5czv5yyzg89czykiqzcfba79fy1mfx4upckz9balfmf05b3uywff',
                flowHash: 'ltxj11ur7eextrwvmknjow7itoip1c2pfn63hq7i',
                flowParty: '0qnfa90y23o0p8v6du3utklikwjfo98t69okja7vmcc6bckxet7kea03l6f0r3gaiuczpo1dpaswwsox6zkup0ng3bnkdwxek3phdcibnbm3t4zs7v6mvb2cd7l8p9igvtqe033lo0xw58lamz2cgbms31yac6b4',
                flowReceiverParty: 'ap2iq6nsivjqlqnpydu6bsex7ja6dbp91du81310ma6y0htkkt9dlbnre6uajlewx8iz10ziozujwoida2ldbl7youpsi7emx62c0xj71fp3700t5gsm9u3pv9ugwzivl7d76du5ch2stofm7gel8nx3cfj73wut',
                flowComponent: '7uckmdtif73lsf6jo8hon1ruypuqza5emx4j3e00ugp5yu7unidfiv9m9uqozrfzzrom8y90yr5cezltfjllfnd00tmn3usx59b4xy0njadsvmux6oxcxu3srkgsiokc4eo6u3zqg7aovjvs70wliludvi7y8chb',
                flowReceiverComponent: 'r1geso8qchpg42abwctztywobauaxi9mffz4das9homl6qzcgkp5054jihah1ajzhm99k3zjpclmfh5mcmbca2n9bky41it028sw112bbakoq8jom4fjyjyzcthguzznvpfu6yiv9kpmonyaq699dpikuursma5t',
                flowInterfaceName: 'vs0shuozzlp5e0rkdxwwaidiqkja6kef2tejae1opbhujc3h4qrf2mfknjzskl4ivyyrwguuhsujwz5cavpq1xkd3jfjhearcfan88t0l3qysrtxsjo7ao4wp3i971yxzdhliy7kt3hll98jpp0vjljzu5pfh25r',
                flowInterfaceNamespace: 'x55q33hvwnxfjcf7gqleg6t6ch24eubzrljrrfcf3fbkbxvflzs55ntw8dpbkua65uf7r72jlg9nhlyq7r4wxdv4c9r7gf4sm3km5sg6levg9d2edjgxe81k4d8wxaepgos6i59mmf4q6mu2ymjp798d4si64t37',
                version: 'xr0kcz6qa9d5m1f4u44f',
                adapterType: 'xw6b77sqrca975qvcm5gocww31aecy4a7m1vtqjz1mnvwlbym8yplq4g62hj',
                direction: 'RECEIVER',
                transportProtocol: 'ydrva1qcxc7juoikbnb8n8thcohvsaw91jve3zqexmpuz70dw1darey9ugqp',
                messageProtocol: 's9k9xn7la062cans26ahagv8efch8zxapkfgcd5ec4ee2fkbwfdpbsurm7s5',
                adapterEngineName: 'bhssn472xsx9xt991fprdn54rv7jonjml9lcf0yp9vbswxqbuhemyd3acw0flhojrpttm6g91r7md80m2vti26pvuov048a2623bcm41xss3knggqi4zhmhfvlcs9qli6poybseqqg3eutt1w910wm07cn9pgn88',
                url: 'ewgxs46lxaq454j5mdahla62hz4hicurv3342m5u2g9ximqhssi696yvfbgzvsukxbx1j0ge15i0667pkdkw6zce08mwh5lrafza182cflhg8scf9x07av4r8uqisux9wnnp8frlx5ewgxa31d34i6k8c9bpdeu7flycvn1ms0by33l2wiuz93tskgihzt6w6yh778f347ue0fx6ci5fwjgsuud0my91pob02kfl7h9fd073jx33osbdzcerp3lvbwiq495d63a6xlts5jmi3t64hcjwk0xugedh2igcbeckfl6u2drv5ruhqebbne32',
                username: '03kfzl8dl547a35jess31to4hv2a5u62twuawfmpq75a7ig0nty5p6yix3m1',
                remoteHost: 'xkcvnyvicnw5clv3qj0xz3eb431w9n1g7h82ziv800vn36a6qvtrjhi4kj5dciew45v13srfeshdvv4ilgg25dk56svni2f4fqpnpkthgviqs2ufltl5is2tx7swt8dxdq23c38q7vcqzi82nit2x86upb7zt2f2',
                remotePort: 5050945919,
                directory: 'ywyub4ceortyv8ahubmt3fi5ejgr99gem1l6effcj5is0flwiofnrawq65b7if6ohuhxm4o5f54rw11s0cgqiphwg5106i9kb2lofenz85388kr64vkypg6vl2ev166zmv6grn7foh42hqdaaqsnvxgiccmcr0eoihfu1d03uvsyzqh8njobilbuab56ck9jd2op86ij8lur799o5emwvtved769esxlsirtecwnd97y15scldgb7o6gg6b9mliahewzx8ayiirt1l2bqtt7qxeosw6vrki7swkjji1lqurt9k3av55yjim9zh3hioookcrvix8i9njt9f1e5jfre1ffzldkq9lk62exx5plliypdyykktm5gq7jy9iful6q1gd2ek7oc1vpq7ocvrr1rx0hvxfcw5w14zfbtoky9s1u1ao2zge8jj3d435ac0u00idqplafifdmovgckie5xvr6zd9vqv7044m0dqi1dc47wlnctupbt1klv57315b1pwwc7gmvwqc8di1oij9tqge0ch03ijsutq8kh8fd6xrepm7r4zo5qgbdj8ee88zg8ax4vcfouk4xe19g6j4gia2veb9vkj683ni50cmh7whg4243u7yoluz04v3e5icwi2wz8wl8v08erhrhcda69tu8mp3bac3vc7zk4tdu2zgcdnbqex5qaoikbv0nkn6mx2djomaknbz5fulxiqcuxw4g0oxk67472de7a8ibswxdpqjfud04ratuec6jq93pm08hhh1ovh8hedbvqk0ip9098yr2mqpvryvnxioqfm6zvbtk0qwu62lt2a4vjap5y7rpwk4sg56q06sgh1c67e44gbgvyq4lsrmyl87hpfvmg7cqblfdtror6ig79x9p81265xcp9qnq6s1xftz0me94uj89uk4j7djah9zfceumod7mdk6txe6aqn1msvfxlho5lpw73rtuhq89wi93wn5fixhj9uzcyfhr1io3045uc138uuhcn98ztr7zq5gh',
                fileSchema: '3m5wqufwl6xokmee2od77jx1ulvcfpv0c5mp15w4081npfzkg024b2nwk4ohojghkt87pn88jnu9yq7gurit6uhusny9yhc43aza86wa90uxei2qnj96gpmt22ype30jibmqgp317osxgeolqedb131rfbhg34h9b2829spshs7ut2slys76yhq98d9ngjg9qj3a8udqo9b52hg3p88akfiwxtxq5cp3xtvxg7qu8ygjdmzae094cqhr52if0rznds34fpnsufqjd59ue4cdkm98ufqv7osuooisih2fv802xpe4wgo06q8qjeryt7xwr4xoxx3j37xn4omjtllb93t1uyluj4w546biqufqu53uisitkd3v5lvwbnrhg8amai60awhahpezrs6i2hoxbsxhob77zlpzd06qq129oqkqeidgti2ehmob7bsjaww0nf2xtucxr5g5esmjesnvgdje3cb9p9dfkjqglkqfouklh32psh2usi4p2yqiydpvwqjavq6v53ch2t3zezqylf74mnqcn2f47wnnukyhwi4y6kroms4u95jx8znpmsmqqhoa18xaq338vo0o41sm5qwn031ckvuflk98tf8o2equwvpgcgrfq4035p8g5s30ilq7dxho1tcjmpy771lnhca0q49vfq9pwdyuk93qyneuvvz4zh3z1jedzk8tndyb7ak3w64mrfnwokg2367qn455pci6km425l4w0la6xvn5tf54261omlv10pdh9a8hczj55x692a89tdcl7eafp73dr88a867oz6jw3fprbf70a6q3v3wln2jy9mutl981fb70c4oz9ue4zhwthh56aiu9brj57hjq3mc2pdash3qpstavge46yc4z8a3g4ziid3x03xsmjemcffddgff51nspid5uvlwm1bxpjfdu8bhwc1w2lebicokm23h9hpdbjkp40431s1v4rdseacj8q7k27um27qslh6bg7lsvbmytaqmzezmjqdft6ctkcxyx9',
                proxyHost: 'a8fs31by07rxvebizc7detgt2wn1badvpu1tlnwc6gwlx1qmx6wrjijx92x4',
                proxyPort: 1199325399,
                destination: 'vbh98cvq6oggesxez80vsa7xekqgxtw3ilbktkdeztltszpfuag9vvniyev7yakzonsc4ex68jejf22um3jnpp46lqa9d155lp9stnbqdbijyk4kc7eyi0no6t5pere5m4zsx2mqbtk38vqlea7brmcm9143s3ri',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'r6ey79lnqxzkjocg2xtrau3zoj2yic7odi8g6hbzswejs22szs1hw1w40qgis9aih5sqolq36fqzbahwopt3oyuc6ayvldicfkot1rep5bapa8z5n8554ndnfmdxdw3uvx7epdgd7wkpipqxtft2v0agxgr1rc1a',
                responsibleUserAccountName: 'xcik05rjukbemn86w53l',
                lastChangeUserAccount: 'o9xepv4vxrr0sixx93px',
                lastChangedAt: '2020-10-14 01:30:21',
                riInterfaceName: 'typp86bltx5ene3f2ujyo0cru9nmfsad1595n98qc187iq8atb9ty0ervnje70j2r3hqwvhd7cgqblm34lci4xahsrom1b1yz2kvd1th7hp8aofcku9e8rxfs3320htxcu82vx3m1j8lo4kh9i8yl05k7ftp805g',
                riInterfaceNamespace: 'xv6mctvgei304t0jrssp3a2g3ekoyu347hnntvjbfzdvui7pxkbz0xtylr0gcguzttvolby6fk3ubtn5pvqjfr1xe9x0xzgqelgx11097s81ks4rzp0o6b8ku2zoyw70x0z5ixecqo4pwgxig2yzfrlqcpdx5r9j',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFileSchema is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelProxyHost is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'u6ywe6gxeys7uj8uh4m6nexac2x7w2wl4jwwqkwz',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'vt58scr5c2aviw4xamk322qw16ih54ea93kpaooeqktn4mkp12',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: '2yv2i12n8caeeym5apc7',
                party: '6tm9j61c8mvtr1mqx7rvme3x6n899zh6hi5oqn1gb0e14ymhjfdvuyeda1hve1s3i63vcb8r7w219yr34z4y53oiihyx2uukiu4dqidpn4chikbbt0293uq2kon6ghvrz3jty61oq0ee5gu6m3mku3yj7hg5b3cp',
                component: 'zlyxsrni7ri0ojo4xtm7qh9pj5a9ky0jl8neblebqzlcyqyzgfgnio6arcva4jbpi380hbccdr4wd9e0ygeewuksvsoyrx638ovf4y89viyl4pbdehi5gmn5v4zeymyl543pguqq8lv3qbkcic5wdyk2jevuvkfg',
                name: '2fqi24qj99p6b74n9682afgz4j9vwy0jfo8twmscgtmzlygzfhpu0h8j64h1o7pgmfg8n3p80fvxxq3i32ouk5dhw3d1mplp24x1njr644j9n8xp9bblnjj9u21wmci6fwbha8h9uan0n5io5t55r6n38913hibt',
                flowHash: '0vywhc9fbtkhivsqj86lzp2hiuqflo92ldr3h4a7',
                flowParty: '3qmundhz6767lr2akfqk1d9n4fn8b2ff2firuq7w89ejflakptl338hy4eqnfafwof407nv9cp2g674axrtns7de2wyinbc9tk2os4savicscvnou0e0qii6taxb0itzmmiywtciz792mzidaek5erb9y7gpe54g',
                flowReceiverParty: 'ymhc3lsduh95zl6xabiae3252sdwbroardnwq65xaqv00cenh5sxgylnu6v2lwwk4swog0hsgt9dscqslv4thrh616tlhm8ket1p7pnsiz30lql0njc7drx2dnn4ryt3c8dutp4l0qkzktxdbn141qi6djninv0c',
                flowComponent: 'l2u6oofxwk26vym28mh28oni72oiqaohtd31samd4ymhdwhxni3h059g0jvap45l53g5kc9glxf91v0d81uiovfzo10kw0qwc1yda8qqpfs1kssfrc8rc6bu4v9hx445bikmtcgukruvf93k43tjxi2zwgyl07pk',
                flowReceiverComponent: '9fmpzu6ayru4vpqwpqe344oxsz0sgtag3sxy89p9p0zs1mmvpp0nu5u8i1rpgljklnnr5i3c7fnfszxf8ylfby0a7x44oj6sxn95m2lmz8rwgkwfrov8iu3fg2ahgmypz3bxj9g4saaq8hiuh72iwz1t5ageekfj',
                flowInterfaceName: 'r4el264yvvyawjsy9gi4qhcgoe5pz43ax8nh7avguo9yzxp4cii39a310yiy1idcaxhblablth2fdepogem89ozgiju400r8yrhcp1hy61k1qgmoql5zdxzaci24s07x1n986f0cmd05x7o6hfw25qz1zv0nfeuu',
                flowInterfaceNamespace: 'xdanc89jsx4qrgctt342qns7rccbilvtlgfutmoyczhx6ufi7u6x7oxhoi8cnevqdd39h8o8lac9b5glrbvmb4os8itmily74xdw090w74rnfm1gbue0sthog8lw3s6me2kmt8pcj7cgzklii7tv34dka2ojlxmd',
                version: 't8p3egp80mnxepngupot',
                adapterType: 'yhnlhbww70ubr6vqm1kvc0fggyfyzcc181s7sq5rllyda600af6jfxfg574j',
                direction: 'SENDER',
                transportProtocol: '4ezg0y3ym8zeuqgm4a9xb08nfqiyt77rxq27teodfhirn608pjpjyxhw2kl8',
                messageProtocol: '0mle6tykudvsd1mdnyc07j3pnqeuporzg8tzhp035hnz42uztodls9l55plm',
                adapterEngineName: '0ckvuoa2h2xfqm31poyuxtzzfictfgrw959sbicofdyg0nt5cd0q2ynasn70p61xfj0gjd4wz5faj5rkjgyz6zespo7ewwh4gzlhb73qkrwh03h16svudvwnedhm9h6o7fbtuvrycr4p2o4zodqafdmy1ma0e3gc',
                url: 'yb0bktq7j1n4475nna4n1k32p8ekeu7282tl0fd6t0ummc8r5rj1qaea582b7ljhejme7sg4zc8ogoapartw8ug8a3x84idql394ilvs3fzau8gj2po55gu60y6wbnwfbzy8x9hcx1yfyr3nobjzmhq54am4vvzrtxfz9ghpz6larozacq56n9759ian2dwwmjf3fcmzoylxg4te9ggnno9nlshjaxxlov4gh47gdfjur69ts47mq5ktcwfxje520jk332f17px2x0wkgk7urss24d5i3s9prao7bgt03x2u2gunsw45tx5d2hf0830z',
                username: 'fhqj4uxlm4yxj8tpwa7ys8an29fzswuzahf2p4xsi0a5p9465ao7kwpl706o',
                remoteHost: 'ankm768pee9fr7ah4clgo132k7njdo28dbhbnyy05x8ucviqq2fgjzvb38bs7xiojzalengi9p41oppm03pafuarzl2y0vna8bvov8wcjvb7zg1ftupbonjdwctgl1fc2k01mhkm2rl8vi9sxkikpg8yutfcmg10',
                remotePort: 2571256162,
                directory: 'mcs01dpzfih2cyjktgasic77f200obnblemfx43189bg6gm0jeyz57blwcbg9mpe0ly118o3i6s0wub8u6vh64bgvnysluzsow3iggbnatepypk384sii5gv6oc6ruyp96ijgt0c2rfl7k5f14d2zvp4mk75z6widv2degcynjzk617yqbto0lnodk8msxpjym22fttfnag56nwof0foe8evufcifxfl5whnq6plbge85dwuk039xe8ig1vlt4uir8we3t4hk87zdsgqplldtugvufi0f26iekmcw7ecx8qxwoeyqaxxdu9jze6jwht1x0nh0cretx5ab2hosy6izailc762zel8pjodqjxxfeqfg9owdjwa5h2ugihhz15gweh17jb4fjbmizksvzonln52fngt1j6rro5qhlvys5lag7ymhvkxy6bxvzp4qb0lvx9r4lrnbdhaixmrrcuh8iv3x21ekkm40blc4ichd4kenyxh72i535v8dcfejzcmkhbgi38pnkwq2lzy5v4egitlas28kn8etx8zwsdeokcunhl6j34ytpihl1oxemz6mav76wblo0u51n0532l7zwb77aqxa8c5wn5xcwadxg947zkdrhhudpk1k8n531tdvbnqcyhvscrqlo6444sqew1g4awm3sxdriak1m6piy9snjp625q9h5ykr1hhcpto4338zx08kkze10bb4cmmc5gvmmyrpvao0lkwskjl33duyt7fq87c8u8isxwgp0u4ohk1oz62w3h0934xfo7ubh1s46dvijwvk8ogl2i87yqwzn2lxfz35t4jll1jh7doelf6w3qi6g92goy0a4kd6e00ocjri1p1sadq96zbm8kjtmj7frhu9fyd5fc0h6332396kth05gt2g6wyr6i3ylojo5hgiwtrsy7su0sr6odbtlcs8yd3nbl1wy8hx62j3q18vecrd6yxt0tl4ltsot0gfn1sskl1qxbm0hu462pfnt40laz2wam1zmd79txa',
                fileSchema: 'v59s1llwbbc1yppxdwgwzoftl4idi72fqjt4abq8iui1rtozue1z3u0e8y0s0hion4gqxovghn5pj436ggrmty41w69fo8c6oj2ysz2zond2x6ouljlrm3jweghsh0vzgxgl27llrjvqbboiutpo70qdyq0wq8xdec3snz8jmhy7q8grwyz5e13lfown6g7pnj2chzrypmh0b4rwrpg25myq6mejewlxkap36ymbxvhzreycy3epgqd19tw4ojhrpa9vca5ve1niezwz7z39gmjo8ph54oyyvzajey4wti5iu8cnbigfheze801ixh7g83nuyvlt082zssj1jpyckxlcsmfs8f2owibcqakoupf04tmvb7rrvm7aqelnullc5w5hwd35z5nhvrbygzg3f2qkn3uir2ix26qj2f56bje2psq566nxnnqk6chrceoiz1246c9iypo6ga3k6qpflmedsbjepkkcl86kfh1045kc7lz78mevb5ui9yq7zypyp663erqokph6lwxdumtulqcf8a8z7ktpf22nqfx5px79ugb9ejiw20l95oe4aomd670gr0p7p5h67rotwleyro6hbtm7m9ew8d1mqsmao39gcdhiyzyzuu8hvn9mvkqdl175eexvckj0xeqbb8c1y3cjf7ijalff6oag0p3ckcak90liey0c9bkuzv04lpni1c3nghl40tectwnzivwfub51vds8iab2c4s5na4efyjin7qczvy4pnnv1cqhetll34ud1xloqcn9ks5tfk4dgm6625jn9jhq8fpf6kweyi1lgf7fw5anffwuwhi3hjnbjq1zfr2rc0hac2r6dqfc9jxofwmokcav7h1gy0ha2u2z0ekgdstkrrzklilkgz72puboo79ho4jalzy13t0sqru46lou66r1rkhvzn4q7sbens6lglch3w6h37sb9oy52n7jvzmdikohmqt1miz303ozluaqomim4ltcoi382apqx8e7el2avopqpwhsfnd8',
                proxyHost: 'm8km0yr1qn10if939l660sws8uv8reblvsibq3e7v12sq6e0io9y8te85w18m',
                proxyPort: 8735835229,
                destination: 'u2jlps9c9p1fej961vwcj2h3r1s21wuaf74zckmcvjzy2a6uw645bj1kkk8mx87zofid4c1eeoxvrevelnxcevzpwbolzy1uqplfzsfnzk2ggi2pcsvbv4js33efcbodaz761xkjtsuzyec4uxw9ibys2zcmwobu',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'j8u5niu4b5giq7zvp92648vl3zu50wx3380bywycm330n6e38ehh04nzmwl4tdqmn7iitjjja4jhm4c4n5d0j3r0h6qe9dw13ycvuwmf18sjph9prfq6qph764c1bre99tq9kyzsqk8yddzxar97yio5ikeq7yrk',
                responsibleUserAccountName: '1mjzq39wtt5yt26rq0rk',
                lastChangeUserAccount: 'cmxr5xhyhdtq0licqnu5',
                lastChangedAt: '2020-10-14 04:37:00',
                riInterfaceName: 'bigzwlwxqxddp48xk99vf2zned34fvk0xw88qzlmad53llaep6ml4dr0k66oyq8gfihurazm84lfz495wlur0ut3fqxv55g31lxcsiyq32a2302021j62ewromnm5xk41jpk5e9ekw1oft4qv5sxmdg0tf68k2rm',
                riInterfaceNamespace: 'gf7s6rjtasftkr428e84kjr2iv2ghthbndvssy692y1wqpvr9qy3xl28s2xpjtkm5kumju93nbn5sb3w6e0cq5l69kze3h0yulujogeisi43922lc8c9bobsrpa6fi3f7mg8b7nh3wc6bimkw3kktsyb0kvgf760',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyHost is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelProxyPort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'zqhyyc7aht5hgedes0czobflr1eysedk4ekq82c3',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'w0alye6hbxaqsxvnedjvgz6dcxkn3cn4mdcm63imag91ev9h5c',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'tr3ng1aktf4q12xbyxi8',
                party: 'ge26yhjym8yjze3yvrc9mg53sxw9oj6eskm689ejs2rg1ef6x5k7usfb18g209ke3fpr7djdrrshkkv6lzxutpdfsuwmaxkznrgzyipjafox0ymnaqsokwv6176tbwkjlq9kpat55ekcoj5veidhl1m1nqlayplr',
                component: 'hq67vtnz19laqznai8qxll41x1jx7azv6eipl5z4g5jadapts8pq72ogjsu10pjz73uy8ebblc2mfai524acopty7ct5myfzti1uz3rwgowsc4rmixuxe6nl3dxgc7aki2fftycsk9po7ddh4lyi00x5f63voouc',
                name: 'z1ksjnqm6ldto1zf1ttd2yhm3apo9jk772lw29qtcql4mizuzl2m7ooaamiu3cgqdchg7mggbaqupcfoh6zuslq3jkomhv0vwkmidzpeozzy2mmj8s58bcjzarzr42gef6lp7vajui728bpzg137q2krqioanl8x',
                flowHash: '740a1j5ltd7qcwir01yehzl90thrcls7fd4igtqx',
                flowParty: '2w22sfb5lelp2138rb1rncqj06u5cctk0oe93e4wfs9z1p5xo4a0kn15nnoiqmvgtla112jm79wxorah6r7pihlphzn2uy6nkzlecwt3nen8gri4gq5wmcbo4vt9zrxxshdf160uirvbsesm4ur2zq9a4u0emze2',
                flowReceiverParty: 'dzqddfogg5jxr8i5xq38ejc1pnuzzfnkyfxbzn8ao7zolrz88it6oehc0myrbhaqgeko7h5sp9n1oo52amb3y51lwkcw675ur0sbaqvl5p3tp1aruzgri668biop3ubtlwnxyun3gav0yac3antflch77t4hp66p',
                flowComponent: 'kmlvf11cecdk0u1hgujs257z18vfpgiifsa6w3768643psroqg58v5qzqcy9hygqgn0mj3toa8ezhivv69qr8wg3uelvq70lyj1b3dkxu6y7l577wqwz5dvm6i0ne2l0i3xk1tfek40zwakvnm4lcxzg16t7ecma',
                flowReceiverComponent: '9xgonvjgvz2oglnniap3515rcn29a5ygp2g9nphz53pxak6mlv4dokwakh8aamu2r0gwx03cmpbhe4bzz2i86wefje6iyez88qn4ftecu30chbnjea8yrkc3wocex96nzk3fj577xq87oieaceyy4ca95cqurenp',
                flowInterfaceName: 'u0lb7q2zhpd8cq7mh95kpytl6nyqcu31fsmltu8gx3abrkvwysizbioe2vxmi5mwi4b99yx9mrbtucwjh78hlhbumih7ah8dtwgu5oim97qh8s6kbx9wiaxna4fysgo0adl7dnx8zsi8hnwx50y9oxcx1xkakpv4',
                flowInterfaceNamespace: '2wfe2mrmv4xjugy60gqk60irp6wkvhw4ix27woyo8igwhonlhqp7useu4u2elj4hvoph4mapump3ucky58ugi4ksszsr9g4w32crekrstgd1rsam7kjqqrgxsoknsgkmhjfv93icnywahgrgjqn57kai8mvom9ti',
                version: 'k33lpxcz53s42ued0ius',
                adapterType: 'dw7npkjwrv5pcxxm4txvkryq9391mwo92x1u4e7awd1ryua24h8n5mff9uai',
                direction: 'SENDER',
                transportProtocol: '9x1vhtjkqxwz9e3qpxzlj1tofwkrzugnbtyd1kj7gv4prsm65pkf8an32zit',
                messageProtocol: '7e080247pse2vl363p7asmi1l6746owo48sgw2qpf544st302ysglh282hkb',
                adapterEngineName: 'qeizrw0l3dpn5ofjdjd01sxzjepqjt1jv8eym9jd81wuhdnj27900i8m0hgfjg4y2bd7vgmjnx88d4xa89yq41qj7l200lrnpyu3hhyrgn6iu2ljqtx13hj2zfv4jbzqgttdmulets323q5lziqsvg8cspllwh7n',
                url: 'nnvxqxos94r48x6o92nftpo1culzwfcjhqbubpevky8yskacp3oo8xygrkgty301jb1bz7sytnemrbtp4nee7paee69cm7vmqqfcr103f9wveau65s44rlmedzm9xb99a6lf86901eop178ymaz57m1c3p0im8biv20vvooyde2ahbz3svjy9tcop5l10469jsysc57kwhjkfcp6nm65xqfobvqu13owp9il7awldgdfgnesgq8icgqkiu2y07u9aq0hrdljub6e2x62oa3iu9jurt771wvc15h4aq9lae4k4kdk055utstsjocqc2m0',
                username: 'w0sk4kyz2vxyminuvmyzun1q1mi1310mvic36kfzmo57kqzrc563xflohqvp',
                remoteHost: 'ttpfu7wgy9phasbwtf9vwx4891h4nes3onp2kr0xe35cgvjpmm33z8gwsm17716lu0sidrku1dffxj7ehzqwqoengtrzpq959v10lt7oudpvgorqu7vihkggaq6t2n89o1a1fsncea2bynl4wzzry203r56pz02c',
                remotePort: 9513385753,
                directory: '5x53et5hqd5y56e6b88ku7d9gj1scm629762z5bzvk7elh1bloi01ndzh66ng46xzctoioa8t7reupx33v5ud4bx8o5m11w654fzj03ueny86sk420f7z5fcbq2t2vv7f7fzxmx7m6vg6ow6vdxhvy2yn8a5c5c0a5u3sa86n39r7i8vl7nmo0a3fy0cvuw0m9r57s5tkyb3z662prmd6l7rh0z3yjig8a77u0f7ovmf8zhrlo991sh3c57zszolps9dn89bf51qwjc0k32w1et4vu224df8perphfz70rm1bsj0c80f4efd2l2z5htbcc7p8p4214mi7delag6jgoaastgn7w8mz2x4b4fx0cjen8ne1bm1fbnnfyznkcft83xgj0li5l0gxm7256j13yl4y16vlbudvt7ijaxt9lxd26ild7di55ju5kiz40chbo6nwcb8828cu2iedatupp996qlw7uju0e8d8sah2vgediyb2x26qe02grn9edbbwsv8dsw0wmv8n8c9ns9scgkom1ociitaos1fzd1ddfjfaqvx3o0asnt2rbwdh00jd5cttppfe7neldu0thdigqtztcsutsm3sefimo6dqcpw4lg8cqik9wm8db1aw02dhuyx870m05ge13nz1fuxfxrvfwtw39uyb58sulngpu29h5205kjq07mbrcruhwua2w79e8p5637ssj0sq785tnw0qfjurxtp3we3pow0mtzxe1yebil94f9cmudewegknyig88rx3r6dwb59uuvwwk41v4w17ceal13yavhwrcgmkiqhemb3sdmkj55uamgvx5tjvi6kaoysldrhkjqqc87j9umjiphsgtrcsb5dpdqh1cmxyot7v67veb22rdamufqo8hp07jl2bvo7yo641f3ye2xgxou5xaerr1e1sbp5gt5ymorq39f0xm0hkbrhjn8qrcoyvbtimd8bi3xnl7v16r1xjvwndke3ehhq393g2p4n3eavlos7pk8yrij3',
                fileSchema: 'svthyfeefnu9uojs03f0vo122djuz9hupwag04ri3a0let6fx5fm200x7n6o355qxw6y744m7234rbsssporqin2xzn0ybfym8lj63qzcp5ggy4920a6zlwb65ao66p1tijyh7c3haz5c8cgut3m3j52x0g1bt03u421skkx0c98hjbaoviv7phfqq5ehyrqd6jgfphpdpiga9apaep0y7hcj5m2iub40of1zlo00rxfp5lqoxxtmoz7w5s0mlzv3ob3c3jjx1ws02gj2slykdurgngb6bs8uyg88mkb03ymeqfariiw43keq4jk02sdfsvsgadnez41ayp6bf7s89f3fg6xgcer00wo70eboemxmm7n0i23o4zcz51wj29kshgryon244dudggxttu0cspl6s1hxv1ei1xfoxkondu5zx3iict4845glygqvryrw2l5ue9ovew5nrnyoida1iybc321gde7fo0wlrdlwwc4l5r4avsslv1zl9x29c1q706tctymcmgxnytiorrvf2d17cugnxdlusqobegyugbgrevwab7syctkojuxee4518hs5ikmwmezrs4vh85tyh5pf0iba9yesu0w36jxp43fe6v70qw4hlay7319on3nr2qqw4rojbwt17al9tz6k0ayh21himtqjr9zrugfj3wl8hnpls1hv1atxqo0zqwjj1tcnr1vclwyg3kbcm2dcl8oysmht8xtdfp0bvswpfji53f0l3e405bt20hpr3x8hclcghg7scqck74d06lvurtp6fc0h0maqbhrk78ypggzcyqxpqr5agrfpi48v2hkyjz6pfv0k9q4pelf2c8ya2f9hij3fs0ihba13caeic5zti6p35x0v17shvwen56dm6yqvhg3s73gqub4ghqzcjv4a6io9w3tlgw278zptdyqtresou81kebfpp6fhci66p423j1syviqmmhbgoe0jawm7diyn22sehxr2gb1nskweexhxgoc2q9c83o8ec4o',
                proxyHost: 'nrduic9bfxlq7xkapvcegd11qxh3nrcvjir8fx6asalw4dbry36gcerpfznc',
                proxyPort: 40870548831,
                destination: 'cr3m3trcmkx2tqhfqmr51q9wexehg90tv7387nckf431bun4lum4tzr9s49n5atg83a2c2k45gllsvopqmgn6mu4xrxw9zel15112jisw4ayyaas1tj529l8simu67h0fec3pzw4s6ith7gln1f45wcng3i3n75s',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'yyk6e16oxxrbq5ft3wo2xiefqiv0i9glbmccyhxjq0fll7a66mztquyhrylqbemlxy3x9o9lp5kjld3wg5dl5q6favl3qesfwl3dqx9sapl4tzvlsnw0uds3u8qsuh9d6z521kgjwuup0ucrtdzuncy9rt4ibrg0',
                responsibleUserAccountName: 'mdzlmzumso9ro2qbzrca',
                lastChangeUserAccount: 'bhgkb8fm2kt5xn7dyokj',
                lastChangedAt: '2020-10-14 12:21:44',
                riInterfaceName: '6g5crypj3czpt05zj9zyp3fx12qwahpjqrje3hif1pn809cfekil0v3nhggojsqhfqqnqppdi8xl72abfa05yzdw59b9yks9vqjnqupilsfxebhjig5ztx89sd4ax0ffn6d2yu8z4nlvtycpqd3zw2ftspyqkxbe',
                riInterfaceNamespace: '1l6o20ghyl1jrco6vk50ctc7b4kigtpr6wurgfudjqxm28x05wxdzf0hi0hdc2lqc2daxp6fmph0yzivfavb89fvde9rp6hmm71gaj0uk5qomolalzhtm6rcs0kk0afvr22im0h5faubjhuqqjcwl0waicfxa85y',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyPort is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelDestination is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'vup1slb08pyk1x5l49wr1bp6cxe06p8x52drzufi',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'xuvhz0fxxxzs97dsilhq3mug22b15hro8xzhurr51vmpzjo67d',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: '2pu3nfc0firraqsxt73o',
                party: 'd2bctzp0fzjjn0kda4o3s21zzbkayk9869oc24ttoy7wrrxdkp1z3tsyppt4upno7q9k8e000olkuvsbl4cqqpewnehdoilzzem9udlxw15gjgnf1bixlrlzkv76b3vzlhr1ya63ydifdovq4pg2lhbemmnhqv8j',
                component: 'qsr2xycet6smclzkdtl5rgbtf2g863at4k4t8a40ant5ju84pel7cw5s2dyw80k9zb1rf7oefm2jcd3p3uouzmsnt8i0w947kmyk366j252e3pen1vrfipnzv574up1yme4xzttapmjf8kjenpg4hm75ekbi5r7e',
                name: 'h7h5fw6dnwa0u1p88ssju7s126ta6b9lg2ou361m32pk0i3kxm4vz3qrs6cmdwid73pdr1fyh0a3qc12b2af4xr2ov42bcqg2f7liahqeg83evdnz9rgn39ypqws9t71rzfrbpup3jpoa1jt08vhaqosv46cyxwh',
                flowHash: 'if56r6dujapn9f8nrptp436vhy2v0ykeyiu3wi19',
                flowParty: 'x2shyj2amvcxnvwr0lqe3quwrvymxzh30foadgjd8csdcbq9ekej8l7wxyxg5894mt49tp80fy31gyuhtmt9xu720wksvpd6i8bz7bl6uzmm10xbpj0ugz3orum7w2raan1r63hy6tn64kqphh4v4zbzqtdh1ngl',
                flowReceiverParty: 'eu5pnirr115cgdnqarrj23rsvpalr431shqxtygjfrfr675hfiuch5c156qw9x7jmg6796zur1xc74m0fp2g9v50to5m490dwhp0zntv3f7axtw2goptcp8vbj3yl1fhhz047l2hkl778edmlmdwljunzowafic5',
                flowComponent: '1hk2k2q90d9rgqj4wmr3f4fn7lcu48f58ot8m2i6y7qs1qx8i90itsj6izcw2ljjlt7zpv1gzcv8hpbubdzhp2fhfoeamp7rma474tzrev09lkejonfelkxthg989t6975cacg2a0pngl1zevv16p4g31bfejnel',
                flowReceiverComponent: 'gof5ziobytg7xpuh0wlvuaz7fzf1b8tf0ffysrismf189tqnb4o78h76phre0buaku4svza61c7docb0pf8wecqo5zuvf3qaag6s7284u3mmfx1j0nt6tstf1sf099oaujcc9bik7f0mv6ygslueqfpox03gbhkz',
                flowInterfaceName: '0jwd8qpqzlq9w2tg4b85e7qajk7u028nw89pnf6rx3g1oztr90w10sy6kh9haaxg796jjgquzo7om8cil2b04krivm306y9qmht182o5xq5eas29v0vm213zelfmr6tgqjcjfp8ngjhtt1y81e796ym5d61unu4t',
                flowInterfaceNamespace: 'mygva6x05aarqf8i7ql15qtlrfzm2trexva6b8ykyr1oyv49ntv6viq32aaehjtr2dojz20o7ttv3tdfj0rjdukiulphrhp55cly5si0s20g6ru6479ed83d658wqu49zx5xupf7rd7ni8e3f60ntpc0fek4qbn0',
                version: '9zd99nsrqik43dkr3y80',
                adapterType: 'gnim8h1tvy06aqxdy17hf499jo32po3chnq2vqs17txh7dsbvtacvwa0z4gx',
                direction: 'SENDER',
                transportProtocol: 'vy5h95v5h18x367ej65xx8wkjdyltboorlytt6q3lpk53i8bjjxhyhu4cxnq',
                messageProtocol: 'gqjhibjhv89rtvaxwf4rd3wvhw7s2gjzaht2xllo4x8u40sbarrphj5k19s4',
                adapterEngineName: 'ak06v837tm4gfl4ypvy057ogej5dmd4wg5fcegmhmhhixvd4x968dz599odveyseh2m8sbtf1bv7v24kuqof6soisvzcjizqheoy6gi3o6q9ssd90wwqnblz19s9qgdb4ioo0mkeohhf40bvgy1u8dxzmqhq1ij3',
                url: 'k2dxwo7za867vj0rzifm67zkadl07yc86qjequzjxy1ecdr0l3rd9x3hg444uw4v44dtx1jdyvohb4o45tivqpinl1lcmurz82g2j0s9y8hdw48dod9bogh6rws6pniv2z6v41w9q9lpjev5hup8jugv5d22deq61x74uqi6hipu64q1odwr5bvo797bujwvv275wrhun0xn8pw8k95ba33kzvx60prxda5odr11xwqn0oamxe5ejnfdt1l0kreujgtlidbmkom8q3l4vhvjklksclu9uwf892ouba8wvwgj9ccsl7b25mbhkzkhbj9w',
                username: 'b1nhay60heykv9d5873258o2akt93mlgekv26j33lrot72t3swhqnq477jv2',
                remoteHost: '2r44ppa7230oijqbac2uy7ssfkpbnv4a6jaubarepb5rgxsuzhzxzryzsaa4464icf4zutrl5nzyvbeee1tj9xti76i3hz7ysyejtf23o4lilcnh0e3wi5nek03hxt3wt460qshyaefz0r74sqvppj0rk99wf18v',
                remotePort: 9234935707,
                directory: 'q9gj4hfmsesf4htkkgsfwsa9ayc9adsn35wzkh3cjwg2g25shfn240syjmh0ul0qpjqsz45yoajzmlpofb6fsavkpzrynaz21svvwo6bujfuuix7z1gcaa0k05hzd8g9kwz3afxsf39pe6f0hqbnes87vmd5fq4b8jko1gkkm3je3ux2vc20dcqfkviuf3jmptvhf7nl4xmqnqjrkfgq0gl278wja4i8b24ya2xtyqx8hxtbv8xppz59c3o2iit6sfod4d6fuv8tgfytyho9v7vegnudeja8p5mk4x73r0u5mkojsfok8w86gerr4jtcvqrmz8ctfj134u9p7j0ip6sp02aby440w6ibh7br9vvhlae71j09c5lpm0utrxmlsynt9vbb691qm4myganjzqhamy6cgqoatxduwor1kl34soi7h0k1kf29a5tozu2zzkcpma4uabpgp5tvx46t1guuviu3qy1cl586ucwywakcl13ywcf7pnj9ehz4creebtnzmvdfhsw50dj7rr1d9v0uni1xulve9las5omuyfuyy7rrs4aqo4jphs584a2b4pdp3vbc0epf4cbmn2ti39tymoy7igr2yguci0v9dx346v37trod0i7rhvm701ixe3yxzd1in6z2icsjl64y757n0pw69thn1jf1g812gn1z2twyhssoh0pwpxpby8b0an85tpkfrf3wwhr5tqaramphs2mhteg0nnb7jsq5tgdvriutpsb0j6rnmi59tgapjmpremp2j4s3p4wvfs4l1r8low2m24lkhy40mjrzwgb4l1bsvc85z32gwi4tvslfdjd5l7xy1uns7e3qbt39aaxiic8fuvqe3hkhoueuejbbhxrosy3ym0g718wvifout59eh7r7mnrlfa4m0pip23eio14svpcrkke1kw6u9rkrphhgbsjsactsxy6vb4wivgq3ebp3tc92qt1pvqfl7j0bof8er5lhn09tk0wekelalmqe7uku29841abeljpw',
                fileSchema: 'y59aqvsir7hvi6j1d3t7fgh51a8zyu3e0ejlhs7cgpu71n7pwlvxiqvdxr3g8qi0lik6uilvkjwzfp8nm3thnlow23386qhelnyvdxoxz5l058sdv7n5nthf6bybutetjwdqp3v4t14qej800aar7qq2p9csa3zx27qbq7n3gk4i1sj58h8lr2vwv0tu5krrwyqx5avfpepte8o8pvyix2lxoin2bi54oih8erlc2hpn73rcjdei2rj85ufftr53ggjzn8qwroxt9lc27lwca7m2mjg41j9oel2qpevgc2umw8p6xz4wa4nwf7xnprxypn5ogu9n6qto1nlq8wdovg0am9by6n02e49kcqwxb56jh23odxxu0rfbmz5w5qsyxi6z1h9k8hfx15561npt1ktbpvmtrifuoo72sbdqopc59bmvevxe7sr9zy23lgnhwmrit7m1f5jz7uh9k25w1s3uu1znanhiyvp2o92uoddkve20aln6tpaln1fc9q776klk442pfgqmp1qhs6g0aq8mof8zld8yr8jliymy0mvl2klzeruaz1z7b6qfx5cerlxmhfcq9ddhuijb79wjhbj3k5no1zqzha1mase2v9k91mo2928g3ampsbtold54v19zv536lxpycrtu2tbluz5dhcksyxrp4u8zle371wp4z6tcojt8topjdqqga70yyj3phqek69607hkk4r1y7xkpc0gu5tciqyqhvpwizobgfnvgsi3lq35hjpau60aqxn7r56g87q8vza9wmqie87q0uem76j631yxl41wq1dffl86qlpsoin73l0us68otwg7z6lkeixv6qzof153g0rxgfjpkwq3hoazfov9kj5d42n7wzipsh82jqi5pi813d7v3c0neqx2ei6zfb9hd2kcny3plrtzhe450s17ztx8ozm5r0e6bpw6o7qbtu0v4lkstp3ap40usjxs58ybg2avqeeetfjfeueekvqul21ov0fox8bm7a8g92y6ddba2',
                proxyHost: '8ilqtwvcerhv9ww1d25wpla64xrjowxb83f37k2j2hhetl787frid8r7xglw',
                proxyPort: 3242986845,
                destination: '2dorlvl8weywvhwj1ty3kj52w4utxmidgtmy7w2ezg8woeg71l9pt2b8ceer528kbh8ma32zz8s0u29cqxamx3m0ztp5i4u38qt9ks4xb34lm3zg025yyr5scbtuqtubfh6gm70xrlexbz38jdp792t0p2jl6hw9d',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '5h0u1qtx97fhvsv5301y1fskprwdoahvht94ervnxuwawqxpxh8wy8jmpvt1e2ako4onr00kd0mzke8g4zozrttwpqd8pxdthxhxh4wz19ja43osvnenbv4i4htxk5xdgaqmqjyue34t9agee9rvykg8ypght50c',
                responsibleUserAccountName: '35cqb8i2fhur77zxi34j',
                lastChangeUserAccount: 'ikgo7zkg7o1rwpbvjag1',
                lastChangedAt: '2020-10-14 11:55:31',
                riInterfaceName: 'kfg9kbki66awacbtb6u5slm1y23e1melamwj3u51uh8ldrgnv2lw2aqf5lukdorl5jlfd53znoghkndmbzg7n0g62y4u37y1dlpbksht2i18dl3ma1bp34j9eiob7g6msn06yqqvssv7mp9jsb4epcsw8103pkgd',
                riInterfaceNamespace: '7nnicp59gsf8mcy2q6y7q9bzicxi7atpsty16yurey66yfu96tmpxi861cke5fz3slkuusf7jwirmmegwwy2rer4rwb9czrhrg8nyqshgtdbkve21jix3ucoawe9nzosazfdswlpwqiuras6cppqf6z7f9zooseb',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDestination is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSoftwareComponentName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'etak16cj20rqcd887aszjo90ovyavt4k9a01sb0f',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'puzft4l9yok0e1wmy6o130bk3kd2igpdy4i1gqqfvj7c3i1ru6',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'kz55914up3nu2z19amsj',
                party: 'f1wclbm0pby1fnt9zuul5b9p4kei0cany7y6xsxvmrgo3ih1p4qjq1mgpl7ihbqami8q8etjdvud16vgcc2s3z5r9cx2a08sda7j46taqkv3wvcbrya58opstxp4cz7996gjfw53qhrdnn7c7asli98z2s3zqir0',
                component: 'iuxud9qe3438p3d68idv9uku5kj4o9zcf1fsedgoeaz4a735o1abqg889dpt7lqjs1gp4ss9indya5lczsx9umhpu4n6te8lpkgrhw28uo58fm3sre5rxc1erz3kkn8qobgjftx6g84hzn1wmii73q25d7729huo',
                name: 'tb888uyolytykahus2nb47a5ncuhgszk5l7l35vufs6r3iv1z9t3rrewyjd0qudbppjbsslr6p385nkazf5ecdouy4x1feelqb43n8rvmnyna5p9aeuotomfaj4ugspi6nstf2rykv6k98uy4s6t6cyyrwbch7f5',
                flowHash: 'hjfwhmz8sh2ptvc4d63iqgwerd5n88j8v0p0rm0h',
                flowParty: 'govq8lvg27rickv63cpykhghd9y74v713j7xeramf41kook24k76qs7o14j08q0wsks5vygc7yvxfgu0m30exl9kr6h269qenw2fflze6z88roet523u55fmfmk3oc52kxs6ia9nz9xppj6ttpi6sito72yjilnd',
                flowReceiverParty: '5b3qxwdxa12hjemxxfn84eub4zwz6xl83lrruva16tw29mylnogkpoubk62js8vncptswcs05e4aeqwcbt2nn09uixisq7vaihtbpeoxgjferfr7lg3bwtitw6s11l0c13jse4chswz5echxmy0smionbxqmq0ts',
                flowComponent: 'xe3g5o1u3j2h9yhnbv6j5tmxk7rqgoixi73tsf6lsczq5pahopk80r35ly3j8mtj5xg6tv79ljtz23wqlgqxbg5ld5l5wiavppdoz3msmpyxjik93ngo1dsd3g9frixqdvdajn0ezbxxuxxwfccgffryyuooihlk',
                flowReceiverComponent: '4tpqega79rvtf6xnzbr1gmiw2ttwrrnljebvbybmdaxwu1j7rarfinqtv9kzixmt4zjwkh6m33ytst6qrwss9evo3mk5f1zira33m7qu4rl4rn09uz60o7zkjo3nxwgrt78ga6fodhk5jv2qtgr5s7oplx6thvyl',
                flowInterfaceName: 'tic7unw6p3o75inibbcch28zcnhdsw6vg59m7039s8xgi90267xnimepqwp1hmhixpa0jxujzu95bu3i22qkp0xlmtyxs0titufkyuo5yzd6guh8ghr015ykl7gis1gym5nq5874nc4zlgkozx1ev8j4i9ioeww4',
                flowInterfaceNamespace: '1g1ekrwd0wzfk6afacvwgkq3p18hobudozhpxj9lr0145myomntalh0pcxjj8ybs8bq6gwdxj4ria2pzks552hqdp8ess9ko1z0v5tuf92q3p7p4kikz8jcxi7btg38y4wbt3jpcobny6x63iz6tr8dhu5uij2b2',
                version: 'wg04b513baxhws7emv59',
                adapterType: '9hx0ie12l9tnrp3qxeu8usowvd1p2gfpz9k17yo39hva2cmbllip8uk8yij6',
                direction: 'RECEIVER',
                transportProtocol: 'bslitn7dt0iz8hgu0y6byqf6o2itp9ocfab9fj3kbmep6xt8qrxnxng79ah7',
                messageProtocol: '9jpwmcq09xo0v82s8jjgmcoa4dkmboqzt9e82vrqneid8ouus2kk3q50ibec',
                adapterEngineName: 'mrfibndwm8rh2wm8lnrymu5xrs4971ip611cidsbd818zik6hb4h4sj3mf004vgt15rjnvm49e2yz7hc0j7ol39452ftd0hqex4q32szpcledt2kt8vapu51p6t9urnc6ak9672rdr7krwnta8otmmeg47akzjau',
                url: '6c1xc12t0xafef7udq8ali5hyqbwbclhtuz54l73rfrmbmuhc0gm6azdhsuqy061nv92mr2a1chkyt77dz3l3zawbr37dqe48bnc454geq5vhs5byqc5c1uqtj1ai66r0p9zih3vu9srk3y7kygiie6g4gu94tqfc2nlqwzuf1ookl3xlfixtq98y15au7un3igm9ezum0irl8ie4r25hcwl0nrtvwz5xee1uobtihcp1n70f3bx32zu1nfdlecq4m9oueu9dd3i3h9dcivlgxkx9lf83id7nkfqsatz2hz2b29wl34wjrcny3i89ooz',
                username: 'lltjwezhcj31zn0vnl5bldfos7gsszwbky7yceg19e4opfe7vl0wxumeivhm',
                remoteHost: 'jpry9i3uo0d4kyq99urpwm7w9ionkle35mciv32wamp9r04hh829en2rjaekzvlzrbqog7964vcos26z32fk2zu767fub0lqtg0kyi414byohnhca64p6f9p4y6ylw28gta327ve2huhbrmuoedysv7o9kf2sqkh',
                remotePort: 6061640906,
                directory: '1kdpvbzta3raof9bt2xuxxt1hbtm81y7y6lzw9jovintlldr4kikmlxh9vg6npvx6bv7zfrpi7f2nsa44e11djg7kquq5lw1r57uimw98rgq7x2ian2p7tdi6fq9kj1844nyeo3rch7uvmkp2uaduz4cf7gqkd8wn1mpc7y8twgbyms4gf9ip62hos4a92lmb3hsgturjevkzr00w7dlkycgvuab21xwxw8hfua1i8xlmsw06oymx8k6l676xf0b06x2fdni41lp3wx2vvz9hnl10zy9q51joz5o5ee4ij2fxgch4oxr0cem3rxaj9bv5nol21kmxj2l98bxykqezccwf9wz6mglojpudok39gh6qw36xh185c2eitwigftzo1rg11gayg6oon1tahnd08rzu4ydumbrt6mjohx5ul2str2o4s26zkdfo3eh7wc0u1hs3h873hh2mcrttfad4ksww7idyi8ow8ukqspeu14mpqsc827m3ain1mff7e08vvr3ragbikbnp970tyz5tcscsm75iwyqfjyatj60sboqyxrdgvoqbxghwatmutyeo9vr02zzs7e6bxteqj6pb5nt09plbg8pirzrmzfpv26ywrcrl0icloqnlv6zuf2w198qupuqc88zl1gaq1vyzvhmi4ed87d5zyz2um4ziwzhnk43enjejrldlynlg91pnx7w73uslmn0htjcbdsuad0yshn3qvwmfdets383h79ig6o7oz8kwbbenvh3qxy2rxv8oifcykh604e4ps97uhtazz5i6gertjig4up1kjlba9oy3sz5zu9663hyn0meiqx0rmfl17yl1l8ff4wjxdz7wkexyz8kerjx6mhtm99fx9pt5jo1iocb3j53ennn6t65rr8zsi1xi3z2b3yxxvq1u3d17x2b4f87g8w7m4ym3tzp0fhoaq18lsazmrp4zsqf6jtzr7x9hql7fd0omibntx2z74khpj6lfuijgwiwthn7nf7dgfglio8z0ggu',
                fileSchema: 'iujs3ssq1ydx2ggc6u11jca24uoo5g7rmo936zyn6m0grg7menvegqexmdlqnp9pwmzplqh38n6wbtv82mhwamlsdoaw0zwli4kno0jk45isnf2mejahquouvla3o17zg0amy3yuaymj8mri2q110cs9rdpo7yn40n6oieovu36lg5dqmax0lbih8v2cttro6qfwubuitucvujh1so73cnrooq5gslb2xjee5zhynymm9rloukwj7l76y8nsle6vbuadpks30xstun8epfhfgshdfif5b65hnttheepuo08snh8e69a4iuw0bapl0mmqvzb06t2ximxvmcwidp1c5lo5yzw7oe66dbanjj81sto8x795wmdeuey0tms10c967zzigu3ovlaon2mm14728s2e66v5vc2u5zf5rfce64tt10u7m989w0jrhmwa2l9r9palximvvmmrjz5c0qim4bd91jpwlzf4cflalhmzvwvxsv6rtwmt50qz1mjbw77ls5hnar9l4ydik2g4w3wky9qk6rhda4wuc4qumqgkmkstrthoorhfvwofn5b88c596ur5xwwloiu7i3o883w3gr223a3yu86zg4yfbds3snvjbejc18ll8a2c8x1fm2befma07qcqbtgsxgkn7u953idb3leif9gqp7wuzqdp2cuhnqapef9gtjb88ki9b1l8dv3qm0q5551mk2p0j3rpytbias79tnj29sesf6ayb1z8pdw816zhiv72vr8qdyq8m33o4qsss15giaysmc13o6bzvflns1wl8umcbyi7hj32dmqkd2bc7q8rtk5gr6ly8hvkwvjid2rff2btmi0y2haxvwb6jxgu92pujgpo1v8sb78fhxezb7km0lwj5rfz5ep61xpledn7y8e8kz4hh0hfofdrezdzo0s9ngt6a9q0u2j06y0dauncqd3ihetx6vtu655q22r72tedpkdoh3pkaiy568lnfpmjrp0kcas7b39m7r2huwzpk1r0zjp7',
                proxyHost: 'atlrxmkelutdsrcmwejn01bsz4wb24jo11iqrmu4q1tdr18ywkhxisskd7ab',
                proxyPort: 3884602959,
                destination: '7ws668s0465xuo90dvzr2qhaveydtsrf2nmki9da3kse3nfvb3t1lw0ncbwoik8vr0sckp5zu6mtbz41go6e70oqvlrct1k820tplkqf7r76aub6hu6k6ppvggu4merlpuc21cw8ggwk7tf9uh0bu0gv71yks78s',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'j52p0485q8fgcbhjgwsan6ri45hjc3wt4kboz4emm8vwjjj9hpeb0kw695aq14tm5hdi0oxr2pvlexzolym0nfp72tc598s42l0k7lo10d7un7nslg5ehvst77cj9jbe9fx6k27iajc5xpbta5hr0lbfdroah1226',
                responsibleUserAccountName: 'qs5uy0ki3gzx1vawt6nh',
                lastChangeUserAccount: 'rpgo5mwj3t49o25qwxtm',
                lastChangedAt: '2020-10-14 12:44:39',
                riInterfaceName: 'eq7xfd0rwueseiwcdnyiwu710rfu1tindrp7uirji9nfzp2o18oxvqjl2glbctz7ydbgtirckhnnldkofbsdq7eczytlnsc27bb4joatz023yopm3odffk0z88pphr3805j9l92cl46ftksmrvt2xa1tt2wulw82',
                riInterfaceNamespace: 'dxjwofyycffeor93451ihopkji6kde2acm5fitmdsrtfs6od1gs12g8ys6ja4k0fit1d6843lqj2kkx4xlgxz1vlu5f30h0c1idvl96o4155np12e203ypuwz91jfz0y7favwzic9prvl5kcq3un1mbto3c6v496',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSoftwareComponentName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelResponsibleUserAccountName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: '56zt0myylk830yauv18dribk8alcs95ggjiiu7jo',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'rkbgbyluq0hjka9dyc1o5cplmjc36n17lqrnl8fmfi81akhm8n',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'h0dw9c9wdl8u1iktvz2b',
                party: 'ncex1ry8t6z55hpevnmg5i7v156hqw226pnqgyyqgg3w1vfr2bdj35xh36w01u8fb09klxsvx3k6fduzm4stbwxe59zamw62eremz6yakm5fycze88gxszsvy19d9yd0bc7xif9r5wikoz9jev2b04o5vmmjurzk',
                component: '2xd5zlcyqmqo7dqj8uchf9r2c36mlww72y0n5a4gjo27tk052j97u6ciuz71n4h2tcjdpibq0638p9ofgy6zrypgfo7bhmwz0bgq4fw5q3ngyqst9017eqezw9l4is5cn7p33ntxn1uj5kq8q3kgtzenxz7gui4d',
                name: '0znaz6wumyw25112kewt1ai9gu2tw90xk1r87j6dzzrkyd55ss5yu10i86dsdjb4i0bwgy8znkssi00b6gnxldnateooaijddjuos9xfdwke14ap3qeivj7rysfmkpsb24l7bqwtlxtaox3vyegi7y4hdpzjmn3o',
                flowHash: '5g1nj4kz2bh97jddcf4ua4qcwvjv5mbsbtpzzm1c',
                flowParty: '4mkzegmtic6qgvec7epchu6ac7x4dfvr3lzxplz1kzp4exhoegq5ukcqwrz62ap1las2hyjj0ufsjg1i5r570r9tjijog8140w1ot50scumdehhglimhh7fkumk660axz9pywtla1mfxq580xep7955ypso7conr',
                flowReceiverParty: 'gcxt4fkifroedk6a7cgfareqb8p088zh4b26js98fwmtka8dmb1aczrrkqfzi5s1pk3492rlm4pk26qm1tjvi8kdodtm10dyhh74c7qgjxtvge3072quiadbmbikrqzeeib2utfyu6ccus7kbxqrpxpue3saho9y',
                flowComponent: '73unold3n0u97zfwd3s7um40nj68h0euil123ta6crk7sfgh3w9ui22lyk490x2z31chqex0gxvrezd57l7wjv0hnqngq6l6t1rukmj8gdqpxrcqehy7nbewf1hcfeuwt4vlyytkta12pe5er9rncg0vos10rrg0',
                flowReceiverComponent: '34jexg5gpw980i3pjhdkxe2qsstuow5rxqplo0wsx1vjvgj67ofuur4zb6qm2ic0kx1jl1fn5coxy33n7nac1l9lblnnqv8iv6enfbl47848gtmxizx2aevd32j1wbzc0a7idtlym264rxtfax6ohsimqeh2dihv',
                flowInterfaceName: 'jxyu1an6mmmqicdmav0mvkr1znva3adjuzaa12imvzuz8gzlw3twh86s1tph6w8cdizl90aswyjl0y00gn95o36m2ikfyxc9027edzx270imtkl3m98klrnbq4zfi4jmbsrwnsthvi3an2uft04m0j7noon74ic1',
                flowInterfaceNamespace: 'cf19s32ohgex80zw58ahmix5q1f6hevmifevix0vih41wwu5gwq90g0yt56umgl70wkh0k8bwjyxapgse0yaufy9drx8e80o5vao80ep18e24xwcy1codkg8huiv6wib5b3xishdjy55u818s2qonmu9ylz141ng',
                version: '1xlcmhdhuahqe2ovfxdw',
                adapterType: 'iab8ciexb97obnillpmv1wexetlemhflsapkii3rx3hfgd876zx0dhcuz4p6',
                direction: 'SENDER',
                transportProtocol: '8qpvx2pmyhrvg2wr7a3ukd0pz39bvr6hxntlha4h8f4qny0r1b6xwyhvepj8',
                messageProtocol: 'z1owdpknhbnndg04prj3jg3jmq1jt5hqrl1smatkxjtf1m6vb13tznigem7x',
                adapterEngineName: 'x8ack3pn8ksc2b84kamo27mt58rpb8nti9lvsdi3xu8j7vkqr1cbd8l1hq8cws0flabv17816ba5katahrt3kzcn5ie96wtez18wawf3fssx00rcgfb9cx4eclgnspzqiv79an61quaf7rfaj1dzzoa76jplnkoj',
                url: 'wsu0n5232umyheorsvsohaogwnhwpp46aiafgpl32aab4xd6q50ov44o25t9z0latgoacsfuyc3d4kmxwg9k6b5ip7cdbvf0vaa51ns8nn2aqejajvivwtrf11j9yhlz79dsf2ar8tl3dyfr4rxbr0mq8xvy6r32u61s50krx7tmhdy5n1ehnzmx2ysv4stqyy98eagdm199n8af5fekvqmltm9k7ly0pak6if4baft19irhdxbzgqwxk10e73g42692j7ttnbq8guuqb5rozywsdb3hs5kumfjnnaub081px4oavm02ievovu83shk7',
                username: 'l7vyx2vnk30ve6jnzvpxt0uebavnmnp6q4f8s0ovk46198qoedlbfm6n1g7b',
                remoteHost: 'l6srm8q3i7r3t6v4u3wqi6016jwzyxw62xjk45pcp3p326pw2j11z7gmkh0xwctqsuph9ox6ttaexqfmc37syygr9y0um2obufafu06fmb8y5jhat5uwyhcli8gu54p59f5wkw62q9gd5ar39vfey9th87wxy0hl',
                remotePort: 3568912589,
                directory: 'yuwugix79lze2ky4h1en6a6uyzdtac2rgd00z5en4ude8oli71992chiqnzs7gom6yu89dy0e85nca7fqvm5g6vh5hljhkl8hbdn0rss5hpwu7ky2b2tpoorgeuavri9jbr0yc983gidmrcee1psh704uzm3gdjl5v5avl8x4p1h53zunw0y3atu91inqwe5x6tromynb5tayvewqlz68u9i0ljg16vehh2qx7sxapu6dv31u62ywuljc2qnz4dqi857wm1qmt7yr9ik7irnobk10ic8493nc4d2a3j0h7x8vrics2jhn5st2k2l8xqeu7q4hz5qzq7ricxvqnskdj34zwzudalkuz5zy8wrkfocodv9gmi6v2mc03imd6ahsddro9o99sedwkb1bz3feg5u3i312sdl47w26thvdmuyuklb5a3oofk9ziznouz5oxeqz0uwlb8el3rgpmcrlymfy5xgqqk95ot5lbo7oz0koe1anqmrzc4tjrsz11g56c0kz1q9zu6sz0b8ybfzf4o24v2a5spmibp1moja9qllft2xls7s8iooippt61bekwe5szhntyva75nvp8kfrery4v5nqqdp83t71vhecrdj4ceteqxjn5mvbe8zul810b6zpya4v377tjqpkyglyftwlmjw08xohjebg9f0b1fe83qae4ahpjiuzv2mlq6zutiqmp9palvemamv270imkm98j5pbk9uwnzwnbyxlq4zi4053cmmry39oax3ioggevlhnno566km3rz4x8t8u09bz79lp0n9tijcyaur2l44ou2dp89i4uheoeh5sb1q515yhkjo6l8o671tl2kg3seh8usiicj4odn8ms8un24u16nuu1cha9fr7tqfa1478gcz9cskr32dx3de4dohjq1ej767gzjslva8tj9k4mbbnc84rpmvwnra10zutrnai2akl4kk6uuqxk08by5omvt0vpqbxtrac4dof0herwjcecdpdh8dtp6yai0gek44',
                fileSchema: 'wxj56jb4usmh2r7yvpbkt9zl2u2yawtnt8mjptn55oeu5b377mnrm6eu4wioiebk81n9u22gtajiby1drdmqjp618nhfkyiee58ezjn3jxjijo3splb5qf8b17mmgys4t8lwit67ht932idekr97afwbhd5avjdt571mazogp0piz0wanytr9oo7e8nyvgg9cbax7seyz8r7sur9ebgjfrzxph8drx0tyycvc82vsgda4c9dleaaz1zc05wr3m1z45govywbjum5ftbi32ggucywhgikge9mn255amxbz7vcmkj62ofraw5d1njufbxv6lxlo3ernlpb3zhnk6623txirup33597zxqh4gkq7x9mvvxef9m0obebw63usye3jl5oflanithktx0doe32e3hfy148f12o2nscduyorvuu7gzs7hilgyrh056wo3avts6nv2y4o90zio02qtrm9df80qv6ishpdhj01gh0kjsujro1d3dhpec6ce1lb1u760fgru5x9hb38eohsa1dwa47zg8l61yv2ohk6mlf8xmth1tfdz8w85hrao0z9mhwgiqdy8c6oapeajcu79kvhx0f6x4fqlwg21uw34raq8fokhtmqx675e9jilxdm2xcwb1gye98giododwgutpfvafspadjnohi9f1lt9qoyuy8x848fga8o8yunxxwqjt5scz14ac5bfin6dutzcuv7qiwr11jy7ln24b95hy6vvqj0nuntjj9p30ip07x0ll2k7v8j38yfg421aiuj371lnhd7ty3exz8hppfubea7lo8ji6lhz7l5m0im94dled9tw66wmlwdph84w6yeelv496jrtp7fa0xfv8t1p5pu7m8q2ibqjqnzpofe3koiisipjgj4ay0g0khqo2zpl2r09tplqzbhsjs6cn17gd2wj10d2lbjgjpwbkeyrhnd6fvkl58lxg132s3hlhimwgrf0v7oqz0627o1r09665rt84v045biv8ytm98oietakpw',
                proxyHost: 'ezntymge09bh8tjfr22fyosx7t6drpy6i1rxov1s8w8yyyk5gv6juiojr5ms',
                proxyPort: 2964290199,
                destination: 'zfjzzo4rv4fmr55cmvz68tp6gy53i8ej6z1ppj8e7fe0o05rwn9d2q7lf7ap6t3yict91eeu2mf0cj0jpogi7ned6cthr96oyk2sakt9abos68rjfdztx87lld5n734zonip28b246i87zz3nmaw0h3szd9qpfeu',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ti0cbkkmhlk8jpx4w3eb6ik3bjg0amkqqog3im45v6264x9mpkleiocjhpov4fwsbfcfs5e5srm0vwvgt8zh4y5fpxw3229c3fk53cf59q14hgri364anlbapdfdorq5r586803z5p31rcdhnsgx81m9q2inv67x',
                responsibleUserAccountName: 'sspqcwy5f0qp28z27f0j1',
                lastChangeUserAccount: 'fvxjmw002yxtzwytsde3',
                lastChangedAt: '2020-10-15 00:52:36',
                riInterfaceName: '5wdog0sahxgk8aft8k35bzhpao90n0yhnx2ecjd72sshgvcld14xj8nuvffnxqvms4onjaio5xn2z2jh939lm8iccdwh55clf3gqtlqpt8g27vbazu7hlodox4tomy3z6g9n6vme814tolfl0f0h4toz5q16mk54',
                riInterfaceNamespace: 'tuhl6f1sthmbsd5kdv2ax5d5r2d9og5ef2whexxoj78gs2vmpexxsgykind9rhj14xanpmp9wyryirrn2e4g6ysgv0s9l2ri5lute2o4kpwobf3t8gv0cet40nnxyd8wo67up2c2a2y43gqjc4xvkav4z5mz9n9q',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelResponsibleUserAccountName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'qbs3yyw3m4l80fndf3kkusxdl2a31nun7s3s4w44',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'oa3w3c72ehycre2p2n79qgkj1rbyz7rpqzw5ikz56msjjflclc',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: '57p2kip6s34u20yhjyq4',
                party: 'rip3f5qcdkq8o1sk3jdmhbrac3syfqspdyw6k32803r5maiplulx9i410j1cnt83f6lo9gjofjigul2drf5azms3gg987ybw0e2je7wjp20md9rurn3ha6n94pb4h6sgwlurtsirin55wzr9uh5kprq3m5hebdys',
                component: 'wbet7eefty9c6bworqyznw198dh9wr226dfknvb2dp8kvrdq5ei7jmefuaa0eiu45x8m1d6skbh7ahz2yylkgcr4cnhbw1nwn38r7zyvq2mmhaq4iwl1doku7mp0i3y5tkmt1vm6bdyouu2gp2xno22r1o2beb7l',
                name: 'koehmhwprld98tca3h3jmncs336etau1hfhgqtwpw3mysv5ywzdyss706m6qne1s1rou0xgx6e1x5fvgyfk6cat5ah5oxmlqihreeq7yjcf2i15e0u24lr3ygukyx19l7tojl8pxuf7clwboejrjbzuq32ewdxi7',
                flowHash: 'tz69xdhv5tuhcxwlbhrf15t4ztub7slwvgvcuugn',
                flowParty: '7dth8y05zy1xn29w4ydnsmcfzkv3vvxbt4zafs3ih88hwap1pdqntc9ddartpsj25ko8beom8rpmhx72dqpzp1dwfs3c06o0zo3gb20i0ngrkrs0g0vlct07s5az9uje4s60fhp0ye9qw3q5phy5e8mx2frym9sr',
                flowReceiverParty: 'zf2b1m9kb3humfvjsawlrf7y8xlvc1b82aj9v3fkv7393ihj8v0sg6hep0zxrp4hz2clxz2qh1t2sq6ctalg4e036tiej2a16yywt1ibtntlr7rr2av788mlagtlogh5ojgj9lmyobl5r2ie72nagyadfy7odbbe',
                flowComponent: 'n64l5ljwzih4rhgljfk46up9gdglbw0oud4jsx72fp3kw7w3fvuucqkgsgagpnbk8u0r3pp217sdfgi01l5xsajqznh2sk112f4eykjafrs6dewxl1045wpz2e2mkis7yfe0bfbnj3ix22yiz8rj0zbkdoeo9a42',
                flowReceiverComponent: 'fw4gs6uuixm0cov01j7mrzp05tdc37zq76dcryzqhc3po09rkbqin5yisoqapx2e07oyh4qgv2rmp5gckhjxwpv7su8dv68ak3qxtje6wijlq2msvrj8uh4ux4rgbtaq4s2xs8i898uo5hxj0y6tsn8dd01ei89z',
                flowInterfaceName: '7ibpehncl4l72xv7i7lymoc8x6n675fwjchp5pqc15hfdfyyiyxyyafot4qidekc5mqx2ws430ankj4lk7xn37a7ikrv4ck5l58qgmz8afrc1e0iw0h262lg9wyitmvqxlv93i1nfe9lpw6763rh7ko474ti8gzd',
                flowInterfaceNamespace: 'n0b30l43julhuesepa7ir7xzq2r57luud1gqgy9lq3tzilg45yhmmgveccqyvj45rb5qyob821i8du02jwnb0cpqhq4gqk6sl6fmbiwnkchvuucnfv6q38m3slo0zq8hhoqjtyv5shgo9ftjgifbk36mxqdxh6fk',
                version: 'cohhg8rbfbth33ga5cbi',
                adapterType: 'nq9rnnq4t8ckdmmnz9nvg67i4olk8n6ugl9zi2zv9dfe7ikavvtsi77yd005',
                direction: 'RECEIVER',
                transportProtocol: 'yrplmr3y7aneb7p5aasqamnev3v8a2y7al2emq43wljdh0tcy3zhpw78dpcc',
                messageProtocol: '41vhy9bw8ic3idmaogrh2iww54h7p2cjg4590r58uv4z6ca8mrp4ckg67pbc',
                adapterEngineName: 'c0128n5umh48x9vm2yiom3r32rvbrpnsha38g3r780qdjbnu73incxn93kq0lp9uxv8mcnfu3j1ns4th07mkvdwdonuh86le77ek83c7dxsu29ki0w35ujx3wuhge2wbcbovmi07xagt7git32kgbt9js4p41gb2',
                url: 'ofgwwj2b5nr2t4xetla5ku44vfqcphxc89jkb7x4ed9oh9rvibuv66vq8ey7h12a830flfmnwacgfpop7c5g5i99yd005r38bhk3bwslp15j8f1zlcy1vsayiwlrfou7uauix16t9kfi4im0gmffltyug7jcjjrrs6z9e0a3v7i22qyfnf2ghhv4lajkv7odfm4wn25k1dvkk80qj0q8z5a64hj9ufin10imd9gh3nxeyi4nac7b7cfngj95oslo2rfacw5ogzmxsay3nqqydizdrz8gvrk6wbzt6rs7dlj7oxd0ibl5d71vzy28dokx',
                username: 'go6i4rylok4tbd1qvri302j1cepuqehckzyu3kufmxcoashit2me6ml1oxk2',
                remoteHost: 'dy3n2s8mi9lvd5vns4ryx2tolg5wvbh3t20hnjvjvqar8a57je2xfwt0134o2b6jjpv31d10tcq69j9a6t384jmqxzajd6hs88dkvj4j213omn8erqavzorh2glz2atef43wsktobutat4924jmg0z73trg3l2el',
                remotePort: 1258804352,
                directory: '2kdcntgrkgnmulkyzjvl4uth6v2cwpvp841ztpj9ep37zhw74o28eor4hnijxl4g59a7v33lu5f5le0ihq43lsltare79v67tl4uwr4yrwu115jqwk2u6wskg9e1rqm6f33ionfkaobn35mokiiwbqzf4qrtbv02276ccexma58dytq45kiwwdbs5be3jjcvegcunms3b4x8cygdqspj7qxtjguy52vaxmio1aw1hwg52z3sjm71rrxgf2lpw2chcbw6nkmexujknjybg306gfsnhqqnchj8886wsya1cetyt5kopq6z0o4epkiqlfgbpoji9ln18q4z1kvctm0j2sungokozmtf0ssnguw9udajz0vz4p84gz2lcjnr1v8nvnadls8emb1ifzba75997mvx50jrxe5df2wedo4ipf6jq61bohx6s6bilf9z9dq4mov42zb2k41igv8aluca595qzlqd7qmrmwp7z6xfuxdr1dse6lly0lb9e9e9j9e2jl6jnuz2b2ei7pf882ta780oxsm2zwm7cdfsc7qoy13ydee0z2ydmpooyu59h8r8pbhvoer9zzp2hjuqlgdjjkl8apyfd0hsvhqheknhpevgcoht57bwa1k1w2ic2yk7ucim5mr2xctqbzvcsjbgzv7oc7wirfjfod4qhh70e1fq9t6qz8113am3ew70jw6bnywhzxfs1njtubahogfnczq8sb3kvvx84uknnheqk9xs93t4dxagffstvsfj1wnuk4s65qro0jok390x03m04oo4ehjaefqfqarezkwjmnolhxdad2yuw7l3ocveagiggpyrn8siwauiwkia4wz2fovqeys94roj2vou5d4lbmk0s3uriiefe10cngj8sfsgeh4tz5h9cvev6vxcjte6nt46yakhzadrbdoossiahgrp3ocz4swrqralfo9zhhiqqpdcljbinq4kfxx8fr0yygq0u6t2g8dxle1mrfwone64d3bal3voeooiqz4uzkoe',
                fileSchema: 's93f72xe8m4g4n937hcvw0by8tp67sm3f2y8n8jhuz4boqlq52bduvx1gelmkghhh3xyzkaktddur9x2mafgvvllf0ckp723tta627bt5zywm5vp7dho4rqib847q755oq2vg1ld0pdo8se7c887t3hhouyix5d5kqng0krr8a935hae5riwyihqkrpbyudnojqnl8au5s7oyozp0kvaieghdlmzj07051om8tigbalxwgddavnaz9xbvkadlgwavxk2whs3usvs9sb4ohr7yueo1qwzq48lmwtm33e90yvo23hob3nrcvuax2wh2jts5eh4xmbsplk0319tdjuq6usbve7aajzbn79bhwhsjg5xluhavc04tycc42sjdq9ha9ssi3a03yr3tbmyh1tl3kkr7a4tl6e3uo160dkv67zbyvzuqsuwatppcq99gwugfrwiw63wk7kikn4btyj6q3k8rymbinep4y2xo05q4wvyvt9uv1wtwf5ac882uouy651mfgmmrkgrh5dmo4tnkfp5wk61mi4sw2ajom5ts51kihaq4qvsjpccel0315gyyl1utl7u0du6qtew8tw7h0of2rtz0nnjzczvne7e5bqzhvav0455awz405mc69ayzdjw01mx2lwdq48dchhn9mkk0rw9y86diqdlynawo6sf4mdfdi506qnbv5o2rsdabid7ou3z7shcswu1i2sm3b6n22ozoggsn4g7kmdkf2dac5p4hzsfsb4o5jsvhvgtsq2ruh3yjxkc6kdlk0vj0bsp9zgjwdv72asbtw63g3rbd1lonretqqoukafw6a1iu5urbgqd9x9ok56c17vdf5d6bgx3fhwxc6p0suyy83eylniqwxa1lr2oiasu5bw8wzedgvjxl8qozitirem7cjjtafnakeykb5gg479vfq9tnmptrx7y5ylzx5bzizy3b1c57gdgpha95j6v9azu2a15eed386iliow5ugc0yufju2f2h243bngw2gzkkf3q',
                proxyHost: 'yem3srcr0nlaxqgfczeot1os1u28hkq86cvd9b43nvh33l7hf07yes3n8ht4',
                proxyPort: 1158934612,
                destination: 'x2tq7mrndbz8tyv573u4lq076fwy8km2soxrzd04k9e6q9mghinrz3q8psx44kni6ts4olwv7pjak48s16w3kcfh6vi3tnvcuasdudz7x05bmr4vhl2fjl8jx8vdjp1iv8c97x8lnrjj0ntyhcwhunh0s7u74m05',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'gfb3stz5n2exxtdfwv12ichaek34fk990ewv42tqka1ulymknr0615xoqbdiknw7w766fqxf0cgbv9568s1r9hw8xnqhh0i7cak2zw3pp9yfj5wde4zckn5j90jt8r9xpq5q9h3e25825omp63lkfb6omb4sp1ht',
                responsibleUserAccountName: 'acv721a16ra11gzqhz6z',
                lastChangeUserAccount: 'xxpcw2g8o41bb2ydj034u',
                lastChangedAt: '2020-10-14 02:36:57',
                riInterfaceName: '88fket1a0bygd7jlge0k5on3fyb5pou7bzdvzkzq98a5ac5174jzljv9c85wqz97a29pfvmf0x51v17eefk02q64h3dwbcfg93duw439sieoagi99noka4aqpm28j4qn6qko1kf5qprn6n8uypjq4444v8r88yte',
                riInterfaceNamespace: 'rcbhyz4otj3oyl3ecwnl9vq3y7tla1uv41wviqqymzwtaxckqv1o0dta7ldyv2bogez42lv8orjt1wwtjpn691a9qr7e6hyrhim7j9oarezeikykzodbb8as77eap895tstoxzr13d1btn42y210dfhjpnu6dhzv',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRiInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'pgf1jngqz1nptpg7a18951dkb72qxa77u23iwjj7',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: '5av2795pdksvr3z4xdmyrzsk8y259tm5kzxhqg7q6yzcbdm94h',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'o5qc6nmmn4e4vjq090bl',
                party: 'i68jxmqwe4eh1guvenugn5c2nuqr45equll5a6gj5u7zba1pip8tnamin8p9m6glb6s57o94s2iy2mfmj1r1bno055rvvs02eziwxjy2kyu6s822qxj5r5xvjtziky7ah7br6dom1dziqln8kex33uf2p6sg94gj',
                component: '6ilc4m7dus4qk2n3r52ft2khuxqft9dqomy0ahc2qxw131etk4sg90gpld7c8s9kol8hk7t0ifqlajmy9xdtzrn05fx5moy932senj77szagsidq4wlkzgug0klygwv31i2t7cdj4ih5b7d2pqrzov6qngqzot85',
                name: '7x2j2jz9qlaxfv1rlhv3ltnxuh53o1voqypz4mxzqw71yb13qzn7737vcat5vxzj7wvlxsbdvit0r1vhdseyn015zxb1z12sz74ox0aqbsn1fesvc75illx4ch7mp91w5993ro1wrplnd2zwfbqrmzlyfwba7fsk',
                flowHash: 'ilms1lw7wshuvjzsy5rgoxnpjrb060mh90cy163b',
                flowParty: 'uw0kt20byh3678dr7emb7atyeibpphlxvwg5w0mp4hkkch6zbjh9g4x5tmcj35vegaxqi0so87yt3k0qe31pmzpjno1wdlecxwsyd98gj6q393s2ix3x4lrwrhf4ld7ww1anjj3gomhc201dgetccm0d4svhvszx',
                flowReceiverParty: 'bh6kqagr3w04rzaz1xwqkebrkcmdmsh4nke6his3s9lhmypxytam1cyvq631n6jc1uofje09571wifu462b3eo1hfmleihy3wyyp1qgity3co55z1b0t9rmr3lkkkoccl3syu88qlsdh79aq4yxkgs456mp81l5r',
                flowComponent: 'kherqlfw0ezeavds8e0zm69kmkcf6amxu8c006fwqilah8yf9ri75t71ir23k4k4q8i06r3wq7g83b1i42w2bdi9fkm0akkbsjs088ffc3b96drty92ta4honxbxd97uxdrqxohrhewahnsalvbnqv0unapy400u',
                flowReceiverComponent: 'sjgfnaqwf8l2eirpd20ssy729ze49aoqvyrn0bec3us8ax0y5o9vi9u8nk7pqrje3nptlt3s6r8rgjmzqdsegqq1ur7nvrjo464jxoeso2w41chkbxvbxsmq01ruz83w36ya60mufk2xqju1nzqw0xsyb2ep5uiv',
                flowInterfaceName: 'awp9u2qefvdp8p2doih1zbo9oc7x61o7p1x7o9lkhbet2m8m7oai71qkm7n3lc66dsx6v1s9qipix5bcio2ya3wzvqkvhlt9m0r6u8xi3ffe2ox3a0iv5qbl8yfeexuwd2umm5wr7oqe3og5784qxbh5r4r42hf1',
                flowInterfaceNamespace: 'a2ki9y0nfsczhiggw4wcd631ol0vzfi0xmklhyy9sxis6nklqe97vdk4x40u2jl6garrqbwjft767zk1w6spvya0snapixgntkwt4eud2jeyp3q187t10ecrw2zajdnvht8c41pb2j9wkoaotxkpwzx7f0gt96tq',
                version: 'y7ery6uvwdrynak1mu7i',
                adapterType: 'ioqvlqknu6trdeloam8h0nblgrpjqylmcq49iet76h4rx96mzxqezeflh95d',
                direction: 'SENDER',
                transportProtocol: '4twtavi9va2dwss4uv0dlpsjrh0d77etron4tdzvyhr9lln80tw02agogg0x',
                messageProtocol: '4u8jnm56phhxs5kfif46o996ag4zqgrg213p83dyoa8fff872bc3m6vquog1',
                adapterEngineName: 'sk6pwe550vstfu7xep3hc4xhv9g36c9vh279u63ywljdk87gfkgpxwmp2bfri277e4ylr6jsfkwypq71wjjvi36ljde92un08js4s0kcw5e0lw071mef28g2v9bb8d1oap2zlkmdkl7uv5cnft317pgfa8tgrp13',
                url: '0bld871nectoug214ofj2u2czf0qzjju14o7w121ix9j7chuor4ti0egddo8hqs9xwkuvjek5r8ebun77t09mia2mh49212h8eukhi5p0rrmhiw255g4cquf6jhg1yvvu4qmw2ppn0ukya6kb0szphp6l1l3ei5nxwpi4hx06cw9p8yyax3i1jgvz42qx095wqhyiqnqm25sd9kk7xq6z4t1hvnftdwe6jqv7cj0h8dfg7uvocfhglqpnvyu8g3555so1b9d2gsslqaw15xof8ip4mwpcgqajt4d9hi4bw6b20war7xwp3oe86vmsvjp',
                username: 'cz6cvmtyg52r36ipg97lm4jwrzqt1a1iklpxizcoja5bfbwliat6wgqgnuo4',
                remoteHost: 'wolix6inrdabi0gr25gn2tg2rn0yrre3t9cb4m8sjm4nw9ungbsyurm646j7dafsmvhq18i36fmkizid9y2nbvj9sa4i8c3t9z2cxv2v28x900i7qyfqivx31wavj5rq5sc2t7lnurenya7p8ybd0os928a269zm',
                remotePort: 3482643107,
                directory: 'ortbxvwlkdeeralnwjn9d9yt4ujddlje8u0zkxqz92bkas5q5wrejjv1lk37y0gsxqj0a44c601c4qn0g56ets6mnxpzbb3dl3meexhflcetsw8ndd9kokr2i7v8o8tfjqx8drsr2seb21w5128mmoc5ecim83nk9v5b0x5z39chv32aqu0ketv8v9ltutt8nb4t3lhka42i7m4plpju9hqmysnb8im8b4dy3rwmhd5hrjk09gh78elp9gd4b9w324b57y51303bqka38618lpxc0aajty6znedwkpsx06k46w5u4oocyy80ug4bpavsk9m1mnp1insf7j5vws2upmf6l1nmfpia9p7ttm4oey3wv69zmpp3fxe6mjvrfelivfeoubxto06zfa4v062cyl7cds9b1n1zifmdm1yrb8q6n6dix9b8q2yaq8rzkss9chdtt6elh7amtr24bjvk0el5jvjyf3xxr72ao6dw9ea6mnedugihe9gl2vtcmusiq60avu7rgldxumf2et0utf6rf515xgo45p3r5gsoww1brdc9t5jb115xq0w1zwiks4mm9to7a7vz244dk3le1xxm9s1xmzfveh3mar157z39zchkxfcfodwvv75ck5g9diesnjf65tzrxombme1t4zfy4pt9q9ymrc8ml3ekdsdyvbndfzv1l917ek7bb4pcyeq9i1yzf9kzlrhnyp8u934l7vxsyian6ij50d15xhgxijd7cxt1b6yz8rq1140mjkvp4mc68bx1f0jyw734qrble93mn2iraqqoy7fa6r8o8qpngwpuxt73leds8cs8kn69w7b83z4i5x1p9xnm3lc9fn3dsqvlpswruy2u7gdyiupcqog5wijmk918ju8qjujqyojxbu1x3xs1gd8eea4zhu48jrnpu1yc0m0xax8tlvofbn5fl8igo8v1lm915e0ql649xzfx7xm1cg8i15o23f09z661c2djy34z1n72ipebrymamlmdizqggx25',
                fileSchema: 'md98llme14bpqecbhpfui7f4a22fw41p6v9s6dapyhgk33vhy8v2po0z26xzf03hvykapnupsgl9n9vwfn5bycibi3ojr4vz5xen6w6rohzfu1prt7s1udsd2tko1kskaqpqbkw3fi7fsrfkhlvettm123vb44prekg40oam7cmclhkjxb5agzdkmjc31cpe0kaiq4cgx3yogmhyeb7tjx3p4q0ifsmq72memmr3kftvgpusuftrlq1nsliahnrngesjkvmbu2yp0jr30zxl0phkt972lfijkxpoa0ods8z1qpqwj0p3bahb8b6qw6ivgkc9hnn54hmeg37rt6q4kqccze2gx1sb1s1jokrtczopv7xkktb5o88ksnx628kmedk1669aq1yo8ptiemllk4i5r8clmu59z2by2ohktcdq6b4jcjmqpt9r0we6x0378e3gbirekgb4kubrod0je2ltbbeaefukt07r6ufnihe1ml1lufya2kkkuc41n0wrgg00p9cypvqofldkg9u2h05a6vwdxviytx0fzqstwzvs3u9gqfwnjh9iddgkjsp57ntx9tfkhn9fj4l071pafjlu6sm5cdt1j6qkeesawghk7t8syktx47588facufhviizz4lri0ypfxtpyczxrzam77gkecxglpy8xk5jvfep6h6xrn2b2quly5qhnmttrcgr8l6migkovw8jhwskjia9kmwwjc7na5oyqlpt9e6fcmekb99r2dx63r2liioifh60diy57vjt9q1okb1ehvlbwlrf6h9vr6wb9eypve2k0wfjl834s92dwkcid0hxbiqyevyzp96rlwexx5a7cpo6bzydgr2eeb1yjj6pt3n56d4k33m1thnshox3gsmg4qfl99vu4g9j28zf8xuxo1c4hmghn17tfgxdnoa0vh1jwr3uj13uub7zv7n2j9jvphxq3boflq9lcw3en6xv86xzflkrv022fpe866ogehaxj5yg0mv4wwokvcg00ssfk',
                proxyHost: '0rgqr8rj60qr8xmt59lv1oz3cbf4a7qu7vmpaubca0p0i19froy7r1zu7dnz',
                proxyPort: 6249751162,
                destination: 'sl34tzkopfz4so2tmrcnlks58nj194f1zvxfc8qm04qgkht3b3pz2lskz5d4ro20w4dvnyh6m3qddwxa573jkkbbwetvyvhrp95sr5lxw20sld1yzpcxw68ut2lg4q1oywdke6iepgrw2ihgmofmxbqywl1q6xa0',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'gueo4koflkds8bn1rv1ah6g26c1zsxk4rm9mbrojivepkyw594b5vwr7aytzcgj6xwx9phcgc7zgf9aud00nr2vf14usjbvmp6ai6hct3qtrw6uir57gm75hrtdg77tk06fqmxtj5ts1b62ange777hzjci8fgev',
                responsibleUserAccountName: '72cqc7mas9gj3krgs6xw',
                lastChangeUserAccount: 'e0n7vh2jdyegmtyhnu9w',
                lastChangedAt: '2020-10-14 01:42:02',
                riInterfaceName: 'l470j44d3a9o8z5iind3f7jpt6vifyv1w0hgeuvbpz27ohmulq0q3bulmbhnzkst3dpqlm9hilzqffj5ewov8way466wd7dytg25r6mxmg1znkciuy55ff16sz2x1kvxdxe87neuuzb4fkup35k68ekxr2v4o02oh',
                riInterfaceNamespace: 'l3qqwtvpt9t9oxy46eu03256i0diky16xs16mvss96jcfz31p9bvyv3lj04l5almvg0jbnxwza3k48u46ovpqn8o9gjsyinlmph652c86rc4o2prctrstoyad87o34tjddz2xiyd6e16kn0cynae3ruap02s395e',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRiInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRiInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'k353wti0epp8b3o8aiepxcrrgko0njhzqh3gigwq',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'qvpv2mjmc4tsf1yxnrzce7kfihpx5ggmllol49lmex2enqz50n',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'pjutjaddyedepw16txne',
                party: 'cs6gbo9zr954c455pgfanx9nob7gh2zhlmjfrkjq9mlouiika6oos4odaxtwzdqkw5tmky3du8w6xhvrt9grsd8jd7ac8va9wl6b0qpcffqkrz0xyyqjdf5ukl28ttocak41dh4659hudsxvvt69w4942wc14bb1',
                component: 'byt60axw50wen20rkpkkczwsxeka5q6wh0h6af5hpa0zf2st391i2z1uhi89axdhyer3svsreeyejq1rbo758wjrqct4wxkcht1r9d3oaza3rl7p420fxle9yqo7a7wspwx5p4yi2vnh77v5rrhxkwflvmp2i9fw',
                name: '708vv9z3d9jgmj0u0f7akwxrx1np3mxloy90k32f8kgoocsdbe2vmu1t6aeoogu5q6kvzdxruzgwpxbzx4vcejgxoe0wy884e5c5lwmkd08xl9jve7jv3j2t1tlajylwdgxoisal23mktz9qteill9nhb8ndv6j9',
                flowHash: 'lgazhyz576myja5jbau324se6w80ugnn2zpoawo4',
                flowParty: 'fe76qwuo9vk0ycy5ixesoq7cnmer7kwa732o6rng6wr03y1fe7vr566kge2xp2et1q6qfai5704gnkj1yvicmyjca89qsrbg4vpuo0t72wkwertx36tkomsgl3d0kjdr4n4zd9os93yf0gby2ygtzvfro37z53n5',
                flowReceiverParty: 'fedfi6jsl5ie8j8h6yvr1mtlfk8q5jjbmw7jeyzs0n8skvxv2nr1w068iryjho01xxd3cec4q01bossk5lm0m8maiyyklyfipdd9ir8rawu1oznnz41obtw7rrp66shzu4ge8w2tcr77w1bgbxhlhdfrunp0jz6e',
                flowComponent: 'ob0a0bxu0vk11ebnlwrwu7opynrnk1ob7yhtskee3do74uv5smplo8fi6hzngiq1pa26d0bz5z0c3q05cv0mi42z82yt05vjevviblwsq80eyc0ifdwvb14yem0b6e0jfm8m7qbjjf982ss3tz5onvvsv8qe9dr0',
                flowReceiverComponent: 's0fg9hz863yx23kf3ev5sylkxxc3sw7j5nm15owm6y9oefc40y34jllyenvsmehifesv0m3q4ih96uwhlz3g4u6vf83v3mhqy3pgyx4ojnwrlvuoz4nul8xy1jk6kur7kkkhzbr67u5vtewvmboqkmh2b9voo4tt',
                flowInterfaceName: 'ech55i0oyv75whe8gy7cgt9r2gco3xv9b6an3f9ft1ekq045df7k87u21axnm1g3l252jh8jnmdpfij2nsuu99am58nwv0wsh4npoq2vf3hcvrg2iakdute8vua0ya0wncgd0v5lho5m33e76y7t4p1k9k7tk84d',
                flowInterfaceNamespace: 'bpiq78flftxgi2sp3y2i4k2e7ccxg0olopm65tajf0z9k9qnb9w5rls3tpugnssybxssq6dceo28qpe6ba3rd3z5o00u8pz0mgwt58y2r7ys5zuvgpmjjocjgbjcuzm93jw6rfiovx22495sj19p45r1cuvz5thl',
                version: 'it1xkikm0imr7wp3yede',
                adapterType: 'mtrp6k8pqom3zyo9b9s460viq33hiq49nx4y03rr3wfmt8h0lujin558b6z1',
                direction: 'SENDER',
                transportProtocol: 'w5si55cghayyrngbt8vwnt8dyxbtsc08mra5vekthq839a36q8ijbzc7xu9q',
                messageProtocol: 'bp0ukl0rlmfwycfajkexwhezyp9m8h2sgr8p0prw8qoquqkppk5pa9x44cgs',
                adapterEngineName: 'yaxz5gtzfn4ruunt1hkoduv0pbexl90yzae0lb0nqry08wle34g52wxf4hekngx2ijhabtln8tfbxdub3a7f2bagta7n5xp8bx6t2dbfwlwd69spr2bfs46lefsrkfy3icr8den8v2ikb3r8l9fzlgbx6r5pdmv1',
                url: 'dz2u9yarcy6w2qwtnlm5r9t37lmh6fjje6hgtqdkhtwudoyqmj1q5ppgsnbkalrpvcnr5g8jg0w70op5y2dsmfmzcbd0a9xzy3h73gqzaqgkk1qacilb655fa61syazcmt2wd4c6p0g7nvinl2264uirqjmshn2ox8ilkzlm14rxp2l3l91y54rckc60esjv876hylha1sozq4uphzx2lrtke5p8kw55qf6fik5e75zamorcqfylmxgz017p2zv1is0jqngeo1d1mh5681lqor2gqc13gx0wo2hrin193bvtjbowlhtk72b0ihe4a7qn',
                username: '5c6plbg8dx7ior068r1u0shh58e7c2zbg5djokjivfrhuxj7hhv5gd266pbx',
                remoteHost: 'p4802jxzsslf9c7nfutl71r37hz8osmkoiapt7zq06gvky4q0n5c6b6jleiwib2y0ncu89hperlrkauawibdqam07q9rkye85gsuzg0oz8zbv77njdil73y1ggp6h1xrpqbl40e984oxgb6gojr4oe699p6j9lma',
                remotePort: 2676177143,
                directory: 'gfpqdvlr91rap6fdbes3tp2kdzbgc7d61171vb21hdee3i40hwefd653jv51ov8f1gwcapi5ie9x1tktnmgwh4zn0odcty3hpdtv6kvr53en7mda15nf9ok1kcnkkubojmf5o96xp9vk91o0b9r68hn4qbd7fobwkr0ehdeoceqxv87prow1nfzcub5oni4f8ows7a55elgsv3vydm0jufl70dzrm1vh9x54kfbsih8gkexc04zk8k49rkewlxohzeac7bqr2tfo3x0sizuswzlnz4te1p90577erd2zsovyumv0mh3q89t6gb1187xf92v7m5xzjkj4zah98iz9u2qkxud2igydt23xf3b2bik4orhtc4gm56g9te6ox0aflpyexuylvp1y43ghwf9e6v5ygqysbs4qqynqeav7rmf1um2k78hjx0kf11gfza3palijt519q8d1mrsqvdlrn070am5vpgaj2lwy7rn1d45c9g6o3xsazzu6zud1tlz9tkqt8d48re9evduh36llto1vvqm3zk5zr5ol5hs37hmaxof08gpmhicgk7dzog3fdrhpr374kx07di08wonml5hciy2f93lw8wpwncfbjh3m3wwg917gxutao3ivrgr94n17is4zi18h8tau81inn4mlmiv66ns9pceq6detqpqbwb36o2l2xxgiwwfzhi2aepwg7wdffxqr1ab20buivoz7kj7z8fry9r9m0y9shr9nuf24si34sxw8s66sd3s4g80pij7xupep5i5nwv6vqz0vvzkd1tpmzqjyrzf5pxejqlad0k5i5dxv9y13w1v10kpvs67g9kffrp4lsx78z4ljq5kpln591fjh436qvj45nrzb5fzrdngg4t40cae6zozitfe4qahm2a4s55ochs5nj1ix8qq6u5innf2rl0o9c7jwvlwq76v5b2p1s2h3owtnkvgh8nb2fcxy2vjnvxteoygtj9ho3rzdlnswfjce43xa4nvj6kkk9lwf8hyt',
                fileSchema: 'msqmyflib9bdf7zrqfx5t3m7g11wjp4ta6bzai3db4x4cgdtyqxi2w3rkjtkkchydg3w4671cg921ohdv9ook58ckzbl1wkdexxhjuiriq9i55tzizg03g4nyzwxxqmyjcls8lv3g3muaxqku01n8rofx6e2sz34x0m60zoxwzktt7pz7ejrt4dgdzgxin4qaefmnd522pk4srtdaysxwasoaas9gryp0yf7mgnfjf5b470bhxycc5xbd69qmcboh87w3la4e0syef2yyg3brc906vx0axezerdgvo1k5wh5ypu2xcxkuy9rfv39f5w17tvrydqi6jxb328uetmpqp0ejd3bo2uam1o63045vulir77ak0j8j451x8lb39avwfv6mix5yswjqu59vacdunsnngevtslv7cjcod4p2dfko932kl2lifqq8nr62x1a5sxoewf7ysjo5lwgd2j9hab9c15jrlzxzexpa67yrfutxr20wwjssb9ovmd62s8gqhzo4v8gxvcjn2zqfcou460mrn1l46j7pbonxglu2oj1388n11k0ike75pvi81unll8pv3oekp78urminlnolwp8gnkewza9edcmfqoygyojxqpxuq4zyblsqvnc68k86dx4rvvrl1t18d1eku3vdtz6d6mz53c4urscclxjiih66l72dxoj4s3wib6nggfizgp66trndjwvu7nz1xvieqr0r3qu4jfyx3pba7qbvtmfqlqyby1fm2teorwg4mgqpr1i0phkpe8acpjd9bte2zgy0e281bzyy4m71jotumd6ug57wu8pe6i51043s11ecucwe8fufomdqh0li8s211wk5wxdkrohkze879w120m5gpz92zy48tbonqdy3frm1qntio9zd9lw351wh4sebdol4p5t6ek867iuaaq5p0w888x0wgnykzl62eaw78h0r8uk2setux5jht7kpkd80zhkoif3r3fssu3y1lkb7ftz8cldhuivtpnyta6r4p6f',
                proxyHost: 'qa8tphr0fthpq7jsw6in4cf5hs10pfr3mci9jy3e0pg240wbm20px7f4xg0x',
                proxyPort: 9462159985,
                destination: 'v5r8rmqzhdidpby7aoicxxbiqgcqvocrj9mx5zvid4r6ofi14rwz9q26vscobh1gk3ph8p9byhw6hhdjf9ajgq6hmdx7mifnpzjba8qpfyaavt7ibjf2g8to9ci5wjs9co8h8azh76ccw2afmxpbm8gj6bg1fujv',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'hqrcwhborcn2pcc6s9okcr5nmh8ko7ji7jd805ufazpj9fyhs2dph5j3l7goxx3jw3jg890zakmfie35e0adjyagv1k4wimnb2ixz0083bbz33y3ycocanbufcyv3notpvp40ufucdykf02c3t282ams8du1vbv7',
                responsibleUserAccountName: '2xzir1ytp5ogl4t04gw5',
                lastChangeUserAccount: 'o7e97maavlynv1o5d5iq',
                lastChangedAt: '2020-10-14 19:11:41',
                riInterfaceName: 'b0pc146m3179pzipmqozgwec0b1r5b3swzlgsgaglhusommdrjwtf9b7v6hvosuc7b3a3za3d1qrm8axoqyg0a92tn3rhtet3m8r1i57ir1mme19ksbcicf1xoqmd91xz73r9zmmvshsomu1stu8y1tryo4lk681',
                riInterfaceNamespace: '5g2h5demuu50znequ2jo4q0gfasujrkjbrwbb4mrxrgjcsj60z0z3q1ih4857uh50xigcoxj9116jftr4de67m3rabxpkws5kko4st4fyh37r2b6cbcsz7097bqb97hio69h3tunvattw5aioj92dqikwai89do4o',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRiInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    

    

    
    
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRemotePort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'kxc1i5uhf8a8ijif6fwstb9enj3m9yd4s04gve7o',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'tmnw593oqioer0eeefbgwt9pdjazt9yvykilm3dkaks7zuxhtp',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'omxy0tuz0pxr654xwbr9',
                party: 'c5dkw72j6mn6n79l8sjjjujnfp6w822g6ls0thi0x6tdcp5k77ivbk0e87i6b09dhjba935ctyrq1isf5m5osbx94szl5h9i9lqokhm3roni9r10bxr2n9a4hgbuq5szimdkojhjrbikvmz70rg04m5nt5ufs7xv',
                component: '5saj4rxgzrvnez6oglktda4no435vbuqh4rnwd47hv4h1p43rrs1kic0chn228d8ihi0vm79wzaptlx4lhaagrsm2l7ajhjmnljeecl01bxxr3fk8x6wt6upjs4ic9985fpxe5qf0f6f0ww9qy90tf3m9exl6tht',
                name: 'yycihgi1qf1yzwfoybe43h1sr3w9qfdjxlg28vnjxpxjqctzu3mar9lflo5ykfb16tlfxo8bi291sm8hehnx65yj6k7of8zopjvtuul1q7pd6kuklelchmse78pavf6lebs22d53hhac4j42dua08or28nii7ojl',
                flowHash: '65iiwkxfitp1noehikie5x3zvha3hpk1nqfp7bw7',
                flowParty: 'pvvf4iuemgjs1fbdjnm5foga2pxwvy986kr1w65htrx1cq8de4wal56wkaw7z795y018pvzrfus21zxinxfzw5cjfcdkb1s4pbsnjlobgxrc9cq4ta73odrd3ff4a7lfth90swkncncjmk8y2oigq3kr8arixx92',
                flowReceiverParty: 'qcmbzh6je2wrx34zivrenie3bmmmk6zqwy9l9bxxznfuxzya0gtj3el9jgpvlr3lxzrvy49ihrdaw1xr1pbelqfu167mgds9h0dssf0fhnq8d8v5eoa1a16q5k4vvo6cl44usk794fi9e7ukds1er89z3cmj31mq',
                flowComponent: 'vk93l08wgamrytj3z47l2ig49zjdzyzvc13h4qjp4938m29r5chojma75yspl69i4wxfgtn54nl8scw4g77nbz9707ns5ul18lrtdtkier4yiehqmx207n3ktyx6cc6h17s7v2v79imt2ftmfgbznaescbviiaqa',
                flowReceiverComponent: 'yqzjofnz7myds1b1c6p15qtyfp5n69dp56omtiux5i4dbttbp6cepfj9al6pruwzr2ilkmwu6gqqfyyugtdpe5yadi6j7b24du6sqnp0wenugkrk0rue26hbaiwqz3csfentm1jv9uoe4birmsel37t17mmu9hj1',
                flowInterfaceName: 'pxrhlxapyj2h9inyqwxkslr93lcwyf0bf6ojfoascr7wdjzjoyanfj509vbq9rtfle46r4egrypy115zb07g9b3vgxobhygcnmi71hbnp9ljobbktnz2x6vl135vclbdns8gvejul2e9ewd5gzjejs8vesfrjhv2',
                flowInterfaceNamespace: 'dfy7p2a8yosggirt3zb4sqqbkcw6v3lgfokd0pbc9clq2aevrbrfh15yjqo49pqjoncymw6hwgua2ov2vib87x65osicmm4nuvtec1whca42zfe731tgy4g70potdf9ybhtzu07arvuk6bjfbts0inqd0lfrf4ul',
                version: '31b91nhz41nmzg5fjcof',
                adapterType: 'vy07qs3mcqs8c4tbe8i2dxg0a6tfmjvz3vgn57d4pbq9svujdtttc7hfmmye',
                direction: 'SENDER',
                transportProtocol: 'dmdd1c5xus4g4ud7trpli7vy5ka6yh9iu0vypt95627wj8lptoryqdbhyb32',
                messageProtocol: 'm3h3dl1d4h9mcraq4n6umusnzf9ehgkafeioohjy15u4sayvl5t87sw214rs',
                adapterEngineName: '35vjs35fvd45dktkzypw3vslko8bwigu9k1be31gfk574g0td2ny2tet4b0yi2ilkpj1hfzjmuxxumtw382ok0jtm8r48nt9rs9awzt7o4f8qv2pcsljtqv80m3ple1bfy3i1sditc18trjvgjnfkcvowu8yy3c6',
                url: '8az6xu619od37jo11tv80htipkxfrm15ivq8uha54f4496ox2fwlsctmbk8jrysrhq1vq9danvi0fq69x93gotsc5909rwgpa9ygrndk659x71miter6xyr9dkqpm0g77tnrha4sbdf6urw9uep0v4pj5blqkd92978rdot0o2m5wvkir2tnd04auciwxfj173oyag8uo1twh0ycow02migutojl69ynjl2til4eejblyq2pqyv3lqf741b1ucfmcto14srixhibtynn2dbcow6jjomhklbfhkz3xmwtr9sw2olm7gib46ncrkr53s58',
                username: 'j0y2yegom98bxv2tdxdjp562os0ixfft8mxgmq4me96v61pzkzg9jq7aq28t',
                remoteHost: 'qons4wvv6n5z8ci5p32mpvv1j5lo1mj9te2j1n09h778z1je7a8j23uo209mq9p17x19mxolqn5m3zyjbtdxfsk2uez2za6kuhpi57ihvg4h08xos4gotzljfcfra618sf6yxhyndwr6rb4zfzf3z342kmj2mizh',
                remotePort: -9,
                directory: 'mkhkm4d611sfoebo23wjc05n0p0ellv6pf287fasztph9p0dflbii475i8q7329bak69dc983mu6t0r6evivrq59xlp97ouw70fca99i79utv447sdropsmarqhx6viekrgx4qictwtbpzsqiz2v1qpzlahr4hzkbv44r8bjollen3t0vv37ss0qrv3qf09ir0qetdt30cmr3x5ff0ulmr6ckcb49ebc7ucwc87ff86muqxk26w6kgyghdhku3jq9zqjn6vc9u4pxy34a0vgne2k73pqd3ykgjf8zjq7u83jobpnmzdcoz0inrwwftd4km9j5xmqque3y7lz4vaynp0u6n8w47u3mnsv1ipp58iqh1f7kz2q1dtmg87qcmn8kak8crkubefas81geodg14895gdawcc46dzxv6musxbcsblj4u4mubnsj51nywv5dtu58v0z21cbnv8b0l2sqx1s3a5ffo6b2j3k3vbxsl7a2aw1nt5ui2jt49iev0qhus5taqzu2ptxfgvifijofb901cef5by7erq7jjwhxr2h8npjh5758eopez9381nz4tmf61ns4oe22d9e2vufxm4drkbra8b7avp6x486t2qbeb1v8n2xreqrjivr36hf38jvyvqsxbnyxwmq4xhgxo623ak41wfzlmz1y24uywdkdgjco94lbm9pboxcx84zno2qelob9xsu6gcj7dk6a5au9fbdq3i37qdfgahuoue3myjhpniv6gfgmwuam7kehonyipnii3cz7sgvtp4bss78tgmcnr0bcsse6s6xutmgoo1cq6yobax6qrony1phb97bxkxpj2x31ekqudgmnhwhg58npatxpxdrs8emgqwi4cpzh1m0l72237tw1vyop91lugxjllfc6wasl89qpht3gwr6177ezq68ra0442lg61kkc116i1bxbkt6w7j3spfaywrko1a37mh02lnuc42ycnk0vh96g4r1rvjtj3esfgmjfu30lh2z1s58jxn3',
                fileSchema: '9w8alf43cf94hw4p4ecphh2e6xl65dhf4pfs0khse5ksotk4mulxyp7uorgot23uhrbhipvs7xdaput7ne177f77rbe8vq8w0qpx352ua2c0xg7m9g5hm3lxz9hk2a9n7yjozs2koqzg5o9m476pffcop41m1oa875ygunp48ylbkuk3s9uncy0l1w1x301flnbreu18046v777d12f2082gpaxyep36bfnn2t9ww8l873ce3j46t56irjea0v268yt21v77l6478238wecsib1m6xb8u61z6bc59r6gf69rovtjq8vayzsuh7odgamebaxfn0ukier2kb0fan4dt4td3pqtc7c5d3gjg3220i86hekqgm5zobiva2qiewpamf4q5pl3dvntk0271in1uoelj9v1kuxqgfc7t6rixgaanw2tcvnffwxbem9jizcvxhg6zrqng2rfcwe83b8mw0kznvyyxdbmuep2k7mzzf1zw943f7hnbeqzt0oi9jwoeneu9lyu9qnva2hciyeudhkccax76ids4w25w5nmffaddrr4wbikzw2b5md7miw09r9fwjuzb31j0nmjp7848v1dqu183buk7skd3f6gpitqes3xo23wgodmf4eswkzysyxh3yibbgpf0w0yli59go1rum4n4zgrbqlbkkxepwwpy0i3ucjkfvsn6figm470p47s1t0cr3d27l3xtl5kmkej7tehujy8z8oymhr5sk6gxw3mkzofvfeeidrxfgktj3116x3rk264nvxvwc0uq0a3tjjk7ja3rd26lv0n49irzzxte1xn7g45zv5wfp0tx0017eno62g3kvdxnp8j7lj8nj0epklp9xsgk85a1mqrxia6s0nls1h5rt3i2mxrp5r4hpcpbavlk6st3dne73dagp9s1teo9at9d4y9cre6nf6eneo9cwii8os3qopg9o9usv50899l6an3fwhg4p2pt2meqce7rfzfu6yjbbmni82d76rhghp2pt74raz0',
                proxyHost: '80y8awm84tzlk0031rjd1hj5p6lkeswuyz4w2pa7tttzijurwgex9h14f8dg',
                proxyPort: 6789187842,
                destination: 'iw8zkqjx9slwcqimjso9cifhsdnyufdktgq8e21er29curngvieaw1czh6wx4q3yq6hk7275ctivw2no1dfri9hrzlbf2335jn21ywz6iy0xrw59lzio81uuq8tqzhl4rs0mreh2yf7kelsig441gkxy3f49ygou',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '7tcgq0npgmejw9p93cna2pbplypqgyxx42zyco2w1a7zz8d4szd8vcpds79l9y7wxdfxp3m4lx49ueiy96q2wprtdm6m5qvgbcdg845dbp9xmjcsqkgpbd0m6h8r017o1qfcypn8931pajkwduhvey88ruawnk7k',
                responsibleUserAccountName: 'wmufemmhauhwzivjbhcy',
                lastChangeUserAccount: 'wmtmnutajyfflwszu506',
                lastChangedAt: '2020-10-14 04:02:48',
                riInterfaceName: 'y9hd8i7qm33bk16knu59b9ma1qdpdusg8sb4obwnmv0zc0or7hjbn162ml9uwih8t2h9vjm1t4o1yby219aokfxr8i5jq08ruiq8n4sapgyftyub9wl6y1xawz6i6vcjc84fg6yvvspu6lg53xz8n5vah5v3p86y',
                riInterfaceNamespace: 'o0r3pjiup6w35fxwv0ikdl9uv397rydorm7y7vgi2wjphh6ro0blpa1w4o4g4ebyhnzzp19xdg3tit3fozrl3963e8xuhcqbajh0dy81712p29cpnvxhcbziqwm6w7u6waeew6i70cfx62ha9pb26mi6lxwhjv65',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelRemotePort must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelProxyPort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'dc4drkjwvdh0e0guljiczznqsh10hdans1wpt0g8',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: '38a6fbj3p9lxvw4vctsp5ed69bdglc7x7z1if3hvgzkcgy9dn2',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'hn01zz1bgo1xcmejocty',
                party: 'r7hmdqzlhhwawakl1xxed0jywc7wkfbkxi32xzryes9sunelwkgbfcoy6309hfnk32q704bxtwkqsdvm1514kf7d7bhup7qo104l9zm2h06zon6fz4epmd5u69csqzbuif9z55kpkbixk7zyy2552fviiyfzok66',
                component: 'fw57i7s72c3n7f6tmqyf5wifmlqrmq6wy69oin9m0xvciuvws3n7gmhcfawfzai7lnt7wzbu5cja7ui15etduvtcdwpergvypzpum40w3l7koxwoi7li2mbsl884rbwgybplranxsngig1q1djhy6h6lvnm1axzi',
                name: 'o2mh7k8mmy9ofs3p5kmqwt29kjsukuo5kd6cmad1wl03sqtnulhd8xi9uzwc8ctc5l20hgrk91eqga6si8p96ubc51lz45mm3ay4h77ta7qv3cl3o6w5zz76x995vy0lajhmqdrunifppda2fopu63jrtualc1go',
                flowHash: '19aiz76u5e96n5mpiaut57epkl5g7dnc6zqo6p4a',
                flowParty: 'lgqca310cwx5hppj6xvpehxhymrf341b6bbcj49jrpbwo3dkmxg719czs6yut1m9p3t2dmgurfx7yn023sfolurpro7ti4tx3wuz2eb2yguarigcifdqsmcsl812pyxu50y9rwul217w36lzvsi0zs5jzqedsmcc',
                flowReceiverParty: 'gv7b1d2noke9b0j3nekpp9mpb3gh1k6zyx6fvjkxqox5thnjpaas07a95ivpw8zq1wgl1idyff816dmpb72yy34q856g1j6tnrd6k9wjdxh4wthpig38ssnmquorqetotf1t7urnf1py3j2c7dcnvubno0jcnwic',
                flowComponent: 'up5tcfytzxtgakx5ogif6qmeik47cst1dpd9du0c4iwwy0nxo9gk5q2abwnesakj4y2r44gvct6gxmx9jks846ys1vu3v1sn8z2hy86fpvmtwmj4a21nah0w111xzimw8h3i4u2an6dtkeb5ys5fvke5hxkpjpyt',
                flowReceiverComponent: '8l801addyg1syoj3h32d95o8ad263divguih1rb51udj8s64zk1nzb8fj4x1l30e4tpay4rn1a4aoqdxozxd23s8xpgunfj2ai9zrub40n91n965ewnzhku6qwmjsnruvp9zrcc00vvcargxijwi406tqys6x4uz',
                flowInterfaceName: 'dkmo2bvtv3yjn3hawh03iuophukm55n2c3o1xgjg4z6yuqqwrapaak9exkkkltof4t8ugpcuqpk8a9qxqasvqbhdq2ito1s9hipn8be70yc33bcltcvp35sacj4nxswxup5wi5utpxjdkf7ubigbw8e9c9spzfrk',
                flowInterfaceNamespace: 'v6qaw2gdxlasuu1eqtuaqfb7mvkhaplz3a1s5ooswj7qpvev39u4eve6msc7peja3gx1jgp5blhqxblhwtksrjici54cw6hyuc0sqjyeq1qjd7exevrhr4umuuoa6ou65dzc2a4o487u0idoogoewnwnqxsc0iga',
                version: '283flm5ohu68ld7abjhz',
                adapterType: 'g3ifthoi2v2og2rsnngbm3ll9xicdg15wzmua79twtqcwoilb9cimtv8gwau',
                direction: 'SENDER',
                transportProtocol: '8t6zoy21145krouicax6su1nvq3jm95449l5mkbk57dcnedu0dzhfdlapn3z',
                messageProtocol: 'rgtfo54wqr10xjp31elmpi58v779cfoksadxc8ncga6razorrb4oints8gmk',
                adapterEngineName: 'env7es28g4tw9uztga8rb4j1wwox0c3rbkfnh5ybbfcfd56hivi5dz1zomsympl72afio4efd1zrzhssrmr45nnzhmgbwm1w03zdzyvuvvkkkb1m640z9dfihyfr9tk1zvpsd161rc8j7xhttdql7q0pt4aj4x3x',
                url: 'pk6uqpfhp02bhoz7nrp0flgpb5m66yadomnp5kpomy1c3k0lu8vetyqwtpqo2of5tuynmnqtthdh8qp1qqslgvcckeorp9a3pg10glic8zuz0i2aehzq4k8di7uefjolsdwjbdmdltu10iy1cg5fwyjuwg4z5n37g2xr21t0hiqchjhjdz0p7idkhfeyfjwzl0vsfj5wodmqbnf9yt6i5p0anxhr0powkurdwdqboix8c1q9y1vzbpmht4ey8clmwl8oa6jl9t4pwbap6rf4b4ip494rboz72nelkvqqvaiho7dwry2cb1e82l06jsuz',
                username: 'ri86ax9cpdp5pmef46du285w4x25ag71dsrjuxjwr7lssloo1jq5a9ta018p',
                remoteHost: 'jmrkt3tq1n2vwwk1fixshit2uafwgqzvv0zizcfhnkutgnt3zn64pbtiq61g1gwbr5o82bah7zh0wrzmznk0atbswizr9j0h83ve6fheo4863ciz5l3djrofrhd4sf8f1frvcm8fs3smbbmd3s6y1ic7sbnqu04j',
                remotePort: 1439371532,
                directory: '8ct6m5vjv0lwojm865kfuw4o6n40ykpwbdwcd38b9seo3ncbigezqfj8oat8436pz8ol66kgmbx3ypp7lzus4729i4bsgjxxmolpr6cyqxaxs34qzm3gxxdju4adh9th6q2whpzufxzsiimdp2j3tqd9tgduf934f21ep1wgnjmwkps023my8gg5sca7v533atp7ppqqxovqvbej7bde9kq15164bjfzx3wuzuns8lpbg5ile9jp1iv5klk9ghv32a1ht5r4ur3mpzvz4wq8884l32j3s71qrwx26ip654u2bp7hxlwl7kv2cpg65gw1ppro9cpjlmtd62tcv56k99yikd3ekg4kq3p5h68h7ojfe38524w2h3c8a3ycu49y2wl5a2dmt84qxw1rwkcftqo9x4fqsytg9hlurcvf6zbf6ibe4ab3wr8zqpakumhqxiip1c0gd7mfxxca5i5tb5fyasj9mgnmrhdmxhav7wcffzkfab7rmal9280iljf0i352c463ggo02bync0zcewbtggicqzbie7wa9u6rczk2amtyz8cox5r26v6hp0xsn6iwkdwoiw9bo29bxzc5gjo9ewhkd8vjbou63thps27a945gr1zrz77vyym86c2z46lsep8r0uf2v4g7ptug14zdaag6grpuspdiqw1nnc0sxt5zvgmksj5m3qwndvbo0dt43dhfyvelmj08r172xwvhl9irx7j0gmn2orm8ugd77trb271f9nxdxqrka36b1uui6r2dchrhrp9urpdmtxxl7tmtdqm3owqq0des1c2pvlc9cira7qiebrzssnqet685adbyufhz3lxnaz70dcm2fj49ltikdey95i94uito1atua4q3wl9n6h2tk1ekxgonxyqm5mcpok8afi7b4xs8k2ygebv998s1soe65d9cq5jz82my7foaxfaimoqlcciyiuecm3e6n7xoplsfysim3uma2pwtxmrnigjxm3pm0lniv3nq4j0f4bmut02m',
                fileSchema: '5zntggsrfgy1fyyrjsknr021865j2zjv5uat4lwfdtyj84exsmg6ngiqya82xuv4reyyds1510iq4pi94tfmd2xm6kw35rdhfli12me5hgf4xyv3nezo7doxqcmy55bh3sto990kzbh1f7diw4w0jvd07vm8zuog7bvqtyymmq2dca4pal2kvgggqhobkimtqsqv0hz8u671wwxo8sziwqsensxlwum2v9c0m9jk9l525tcxxzyp1y44osgu90rv0kvkjza7717jpxr5i375cjcdilw0xv3qzb3epvs4odt68uv1mxj8b3clvhgiwgnkv6hl6zhhtv0j0fi8tvqspbk45o1svlkgp805u5787090unq0g49h204xaqgen100d8g370qvrlo48ogfwvah5anssk75zi5scg0zuvy419w8gtte2vlokbje8xjd4rlsq4uay7g3o6levsvbk4oblyw3xrv16ss9cvv72i1oadpbm96akcgpdaixxebdc6dnvzlxz9u97uw3im0ge48nbe6bczlf51ooftxwtijp8hcl71q514g16ym1d7tq85phvmoxyciolasog6pf45ut1vuhjf6kbac8qd9sb120fnu66h0w7xhepw1fl4xliohkh4wa64lmbxsnv3zdj0khkeh493yt936hdafqh6hh7xi1cnkpfpspuk33oiemsxs6hzc7uno0wcsku5boddd9zdlftne8vaharaa37n3c9od9d1rttqhqiv8fd6bli2i1vk5hph6k76paxurx4d2w1op2k4ntyvbrkd2pmi7on5dw5kawg4katapkfjvtb1k15ftb52ptqlqoxzejcsl7oqdxr94sifi9yc2tio6rs3t8zplw0n84syoa70rhvncvx76n8k5sim4hjihuh51ltx4sn1cbeygtslh12wmc4peyj6ln47k9hpo1dluys8kuygaspkpe0fkhu74a4mm0xa9hpbn4vjtmtwudv1ty4h7mrsviyxvt8n0ebkhcgke1',
                proxyHost: 'ceor21mooqdv1svduopkls5l0hu5a1cy9n9alsypj9h7xxl780jpjny391t7',
                proxyPort: -9,
                destination: 'crxl8ys56ogcz83o8t70o6hqdt5thq9dfy5ity8422msdbn035gxqmxwkkxfhg56gjbvb18wl7y0fq3gc2hr2sqfixq7dxvqvda7mpmzvsu0heo3mypphvqkav4dkojk293xz85c7rabnlh32lzh89di083kkxve',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '165uracb7erg6kn1u1vd97sw9r4vdzchbbuezhg0eh0ekzados9c8ut3bi7sy0epym07sof5looqgw30zstz2isxse1hgq8pea5t878tryn9qsxjoth8rgwu4944vdv5ya32y90k21556kexgy579y5bc2v8c2k9',
                responsibleUserAccountName: '3ikzqa2i3m2o9emj3ikt',
                lastChangeUserAccount: 'p59jcqztyn82jo8g6wrb',
                lastChangedAt: '2020-10-14 21:28:09',
                riInterfaceName: 'n7cwmxn4akwbsdytk00ezjuue6f4t1uqi5o8qg5dhm8c7q2f03rn1p0r4voo5gsg5reygix9r4fbl0wvg6moi5e8q5nvrgwlol1exfdmc4w9uwtuu8dctnof77ngw3ecpzx2llw1krjslwmx2gbl39zf6t6teez7',
                riInterfaceNamespace: 'rss96r13q37mghc6h5om8kdw62n2t1gpb89zpoyoklb37s0c2f3cvzb3urgd3hqulypy4na0ews9jdoic7dd098idzhq05x4zc328mozrefnlk1tfmdgcrd7jvrrkmvcdai36wb3v92xcr30537v33vnnfhgz7hq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelProxyPort must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelDirection has to be a enum option of SENDER, RECEIVER`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'x7ga5i8eq8xawzomxs90ksuyi2vlad2u6x3g7m77',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'ymjz2r55bkguvtb2faiw7ogdk7wg0vao229hxwvrlgpc250qek',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: '927ye3raez1hep383cxg',
                party: 'balu7vggr81gst6twdfhvyi2b2lli1dhw96gnqjs17dnp4q5n1owcfxs8dr42ctob8zdmvswjfr38v3s5wzp8pifa0u2x0vmepk9n52kpwo1td77yz3mawn2m8nzlmrpwc46q6z3oy1589mdebnarzip4qkx9vuf',
                component: 'lnoea1q16lnbtnqoeobh7wqkpy7v4vc4ru6ddi1zfwp5mjqimrhzf95n4yjktwcloan3ur6iv948n2g4vdvqmei82ct86a6wy7c5gk59z69pvia1050rxsx3xf1c5hiwxbo5ak60eca5sphvymztbokacq6jzgxq',
                name: '8gk4g1xirlumrpvjpzioh9c2gnsqz4j0j2k2tvsji2uhumkqmvuhecomrgr6q1ec6leqzp1chaqdurfl62yo1hivvn3hkfqqvn2renjtntfki0zrdsk3vcm8bpzl3h06unc2nl0ed2sx09jxci2h9ao4beyib2zi',
                flowHash: 'nh3tgxs8m9l84c8u4kc4orwvmhtweupjo5xjqg7u',
                flowParty: 'hlp0h98whjy3j1dlej93ie5zwmd4u1hdrr4h6c2mioajsbzeb612vofzz5eze0s94nfobnsac2g6q6tfz31j3weooo8epz9cso483781dfqm276do1z5h18ai6ubjfkz0jp11uvppw35dew1okqcnlxe3f89qiml',
                flowReceiverParty: 'vr7tyy9u8yvguql0j3yx7h1get2sjghql9k722mey8tcrmn9zfos6wdmnukoshedq50gol4jiai8ve41f5cflf1mijqun5h7onvs8csw1htvmlmrvv0pqr9b1ot1dnl24629f14m7vopo6gx1jqbky8g3l7zle3u',
                flowComponent: '9pbp4qca010s15daebuc0m5nw89cp1yo59d3duv6lxoieeihsw9539lw9vy9fso6oxsm5m74vgn0ipkabev41tcy1h32y6jqtjgq4xbur221c7zqiwm445hls3nghv9zp3v39utj30pobtt55bl4t3pemk863jic',
                flowReceiverComponent: 'w16s6eui8ee43nh3qey91kzdiij5fhzrvxnqqjox80bbuzkg3m5e1agl9pdlzzv2qjt602mz9s3k39lq4a1kmss13t9yv4ak31ohkusbhl5d6dpbwbe44p5cf3qqwfozo3j5c8uhlsp6m2oz1ypz3yl2fbw5ej3w',
                flowInterfaceName: '53dsv0y21atwh9uez09caeo1m76299rv5zwf6cxjbitepi7aq1m2ggtlpw27ipagx71wc2ls8ukkfvl4stckcvs9trkabs8kgrnrak7jdjn4utt7l76y1j011wljqe03plxnjhlbyiqfqqwvmswpu943u2jm4l2h',
                flowInterfaceNamespace: 'jmvzkhd35pdmftnvdw0zomcvbx44a0aho5xs3j565020jkv9jodvphn4u6za43zv7r30i3w1am6ansj2tt18lwmg8lebpx9r0stcbkm4gm4lcu1ef3jqroy2w8ccoay5i6rvnyypqfk79ilvvhdssphbzhobfehm',
                version: 'fam4nhadxamccrrir4rd',
                adapterType: 'kdx9lppffv1409va6vid3r0gn9hv0nzjaa2ncw6a2i4dw5xa38p57thicvor',
                direction: 'XXXX',
                transportProtocol: 'tfqok7n4ncfsnnwr5hsv1rcn7rnr02yhec50rnb774wkuvubowipzklqz8p3',
                messageProtocol: '864ayzguicafusfkut556dptou73uij9kq9aacgbux7fgb7k7ivi0aqi43wy',
                adapterEngineName: '77owcpcuaz9vhiuttzvkym4akbf5fk8r3mpsmm1jnu41i11hf8hrjc0ftxcbkpjy5l8jxnzyh5bvn23wh5y70bfo3gijwlywlgxeo0hbzc9xh94972jorwishdsid9sivwran4ohl108x1ddbsdrfft7mm3gvy6d',
                url: 't4cm4iljpubjr59ae3gd1r9zs3n3wrgjz8np7yyqg44qmmijugtwk8i7e4gt4il5bcsmrajmtp319bkifn4mezjb6azk9im0zj091i6b8w6r7zybm1ksp5syyiwwik1hfl6zvpeza27vvesc3uoelos3xrt2cq8kg4pjligrdpbg1xp2lmd01kmbp0adxmn11g45abry1idmselh3nq3fuehjc98qopkaat0cf2fflwo0asac26o5hnp728bqr9nr2n5i74d88k02s2qqgog8cbutzgsopjmouspfa5yz7eeuy22r1nroir8rsm9hp81',
                username: 'tohf97pso1rs4lx5so4hwi511eavaucnkrpdg2ut5qt0gtnzoeznwo4f7z87',
                remoteHost: 'zucxqzlbz6dtwd8azkylplv4xcu3axu8jql9sepj4xpnota7pnyvciqc2ft3ibswk8q7pwbd8737oh30ef8f6nixv8v3gz8d52l7qxu1fbtid6rduq821gyp83ws0lvgsj51ci2bf9112votz8eu9yjg7psdyiwr',
                remotePort: 2164053747,
                directory: '2apoyxkvyqlgjbi5lpdmu2bpquvr0c47cj8nv25wpwz25gzuodv11n2bdy26ja982gm1fsa32hu58b4mw5evv4vggvtqvgurcq5zsxxtj1501qrft0ohn3n5llhoxsoiq2tje6qcj5501l3pkyzofcmaf9pd9vzbtyc78mbnu3f9sn906ga8hqg3ckv8l2fh0fz3zy12t9xo9xzsafgiuf0p83pwsvo1244be0amr7g5j3p4mop155myeo1aectelq375xxz11tdysyz1mcnid79bbc72tgjxtojwksbdwa2mpquan6gut8pzsp051xaedd2fnsqvs02nhhfbez06u1jdathokkru65qjheih8rs8oy9bb6j58mamm4m8pspjmos25j1od19hsmtmp48z41k02gktja9if58rc6qzvmqftgf8j6s70bj2z3wxmv5fpr8mw947apbj526j7bgqgbxao3fryn9lhi7cooit1xf72mwy6kwto8s6rsjsn31i3kftxa6huyl01vtfev5sil4edzkrmnm7za8tsp546tgvwvmkptuackx2hajtjppjz43z5q54vq34tfjvmimwmkkx7wlq7cmliz7dde6jle8n8jixsr7ug0tzitr2sd7ucy2mp2vvk4fziiiot12j0is0247cxyg5vy13ne1zdgt66vjqd1th9grtnrumienuiihrcoraqmqyq3sui69f2gp4hmgo2hkhxy6uy1rm8iu2cajn8hul45d37inrclj63y1i10lz82a9v7n7wb87w4by8ettf58xwga99d9s6k05ju73n92lznf4rmbyq3dvox3glyvqze2t5g2jorjqf30b9uqxgshdixem2cvw2sve2wucfsdnn83nx99aovcq6f09z7rseve78ax55rzga7c4ljra66sidowx8jjclwo4v8grhf12skgfnkn3lipt9mdbf8hu26lgunwjdsp8qvwi6yl8k1be4pkxv2dmb3bnx9nc4izkxm32tgtlnai',
                fileSchema: '3kz9wwom6dnxa5cui4lge6nqe4vhjqkc88qjs19twkqa8z95y3cjbiwb0i7cdec4theaauk202y6mvjokn79gde8wntm6cilpb5k0dgd18hl6ymxej5sz1dhnvkb5mpyf1cyzw1f79sjgst40ayv93xn5l9gk5rm8xpjt8ajzjvdsecfua03z4mdkjxxt24f06gyfp3ajvl89odhpnpo6ylpvhg6hknhgxhqqjsuvjun0io0dnxwq5r5z14lfnf8qpu06svrx8hbmb9ag6cmelfvz91349qo5lai19tts5kcex069xls3luu5xcm62c40z9ogjiwg5f96os4e0qp950wlmz5f97efuec32eb9kk49aspquxb20vccmp7km70y87n1qti7ewkk1s6znyewn091fydcqpb6oqodfy9qrn6rpyocx57uk7nda07idku7w2rrr0l3myetsnc5irgu5gi6x7vtb1lhemnlaiv0jb10fy327ff7nqi5w6797g78ogaslskvcrwkfiisjncfybckk9h1ze2bdodoch26gc7hznlryngwxzsvay4ijve0vkpaw3rj4xp0lxsfzg3oex9jgluoay8qnteevgf0p0zm75z5g7tmuq8303asyfm6o7j8a5ev1ow6f0uri9bpbqjzekjzgldk9ztr2qzwqfq8e7r9bx2j50vnkgmfrqfvkgax8a9jms4insy6phxz9wesgm8pkq74lxwoucrew29w6ssyl0as87azinc46sm2psjtm3i04s4qmie5x4jbtagqtq37jhwqso7ac5x0hp87kbjwgczcuwla4bsesecspoh9mo2m7nwv9wssgln2tb0i4k04233fhx1cnz36mszsitrgukaopcgttm4s85uyqmsuy9d0p4d1uooffgw0sqvir70qt4yvnf538gvy16ban7nsto8siivvqu9ztcch2683fj01ppne2gv9muiosrfthdurbuumm1t7ksfez3ult7k41qf07ugwcxnqxy5',
                proxyHost: 'cwgaswc6pytd25z4h2rr5mke8pii6hsdrxnqtz23lnrmgg7oktd6v30yih4d',
                proxyPort: 2697398396,
                destination: 'av0arjlutcei1isdxmm72segw2wd98evzolfzjsh33rkrxapwq2dj428mioxq7yeprzs9a4kmedsb3cjy6q3htztm6fugwg7zwlnuyvkmxtfcby2zcb9uedmn66feh3eeyfv0322len2c38swz2dgipnnx7iuct0',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'doplxsss5w8wyhyfzj5q2wl27a4tbv6lugid1n9chvy5l3w6fjeb4zrzxcfb0chihcdq36uo7vyx25cyzt8i47qwn70n5gjspdlsosix27a6f6grlnw1goggnoby6tzis8dzts3r63861kays9cdyyr6xlssggx0',
                responsibleUserAccountName: '3qf4bkiuz5jg4m2rn3i5',
                lastChangeUserAccount: 'l8fhp4qn3we4n5qjw8fs',
                lastChangedAt: '2020-10-14 23:08:41',
                riInterfaceName: '3eje35z1it0xi0penev42w0xua2v4n8pey8vyjpxxg5q1hdmbesykg75ra8fgcp1rg0x12v91a5enf2h6k3y5w0motb3lroc9tf1d95poysup8g0q8b0jigdbomvzl0jbgagh38bcktdva0q3exh4b1kvb407mbe',
                riInterfaceNamespace: 'tl4kgivcf8eivex94567wiy94or66ti294mibgvs8x89vop52mrsdz322dxcrbdrlgfjk8dcq5l5ym5sa0uakn81v9kjsd0txlj3r0zcymapj03al4sh7q45t19yexjjqt08lv7xbyi25l16smxp95430nj0i88s',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection has to be any of this options: SENDER, RECEIVER');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelAdapterStatus has to be a enum option of ACTIVE, INACTIVE`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'r5dldmwdl7x18ckfwb9v1x7u3v5pmm1cdh7emrpw',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'f4kukltnzw15pe3m5m6o4498bgls9qgzfex0lfdm7ueh7kljut',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: '06knx1edhl40gv8hh8q0',
                party: 'bddga0tik1u321hw55fmsvqitobu91gj69x3h8nxlkvfy34b7r7vmzq4y5mjxc8vd6jfyat7zoz6bpybashtjl76clh168wj3dyhg93ednruzjuzn2gs388yy0lksd8do62bk4ji7jzz3hncanjn1jr20j6ke7uq',
                component: 'zrjvcbcr852alleork5k9hg6v9vnfvq4itm7mkaozctc8qz39j4jfwxo37wtyc2zs7tmdkuv1z8zbkz76uiegaqwk5ypsl8gz9i9f4xnjbudc71otmsp8m8e44a0cz6almzhnpjxdi8i289548f8thg2sfvic7hn',
                name: 'bseln50wces1cije1u4176wk9q602xjd1ra6qboerysd3az3a7kzh46g4zycr3hxlrbkzz3nmkc3widiclb0t4zus8h2p09j7ej2hkex86xfkohnuah3mg8zvrmmmrcquv5wj27807wfzwk1k6pirdb5tnrmrh6f',
                flowHash: '6abgayoqwrug5pnd4r1q8527mznjzd897120wyuc',
                flowParty: 'ntybuf3jojbygxt2wosvqsg83t8b7naltzhyjlc7lz51fnl3p8qz2iq5a2xbdwncnfmhv5lzjwqlyon4a1j3wiikg27jhkh4r1w1nyu25xeellgrkclprweegcekf1zw8arfauodps2t5v9prqd57twx0y1jy7hm',
                flowReceiverParty: '6mjbaq5gyqcvogsqwntqx27xkuua9hb8jkfkshu7eqh9w493ehjmtbtiolvrsuuovhkebdiwsvg5gj23ogw0otkv24di9bmo9r2auic9p7n3sdfzcd6o9q6nghios10qh0f4fp9z6cuj87x5dr1crpndywmz582p',
                flowComponent: 'jvd0vsvg42whaunycu43dlweelh3qituln0cqp3nev8j43r4v9mwkktsrgaj01mtrc6ktjhb3wejl4yn3014zgagc40c8dm3wax2d1ogzcnfalifc2ilylyvlliq6kvuc6iz5ec6svhsd86z0jz5ouxr6pfmz60l',
                flowReceiverComponent: 'ojpkd6dkbpaa2e54cks6uskd1d2k2j3pwecaf6fc8rk99g8o3gr1woiax9jnzytw97ghsegvtu6llgnh9whfgk62x19mchb2pqp9o55i557eh8zr1crw7atnt2ce6wckcifh9w5yw7lsrsshqc4xnvggngtv1tat',
                flowInterfaceName: 'q5f3jxqt7jno0v13u21kejlfvgmx51zywg6jfh3vvgyd9o8z5d9sf17icukulu20p3mxfo31mbwi0xcaj6rlb68c1mg0v34y6ojnacmnmqluq3vgnhnsx7mw9v4p8xlasqnyg8n7bt2vxax3nxtwaj8msuqbvwve',
                flowInterfaceNamespace: 'i9la5h5rll4qkmi9n38p86jmmcais325j44vy9h30lp7vcbfmdsfguepmfoth5jz5jqi38u8vz9ev1mxkmhestcj02hx6faurxwor9sj576618rns42cairm53xl9io4y9bxb3i19bonle2hgn2s6es3d4164kfe',
                version: 'alcdpsxwh2p05csf5kf8',
                adapterType: 'lk2vn3yik9tw381y212i9zdb9ye3f30tr9rxn1cdllios9yymiz0rwwvcn57',
                direction: 'RECEIVER',
                transportProtocol: 'nqefeqfw2efm855d00b0w6zu68ibl81fsh475n0su4t90h33kkgl2y0zmexh',
                messageProtocol: '67khio1v93au9f2rbqln31hxigd9diaqd8ehzqtpfjb5tqw1m663gbokg80y',
                adapterEngineName: '6q8sx5ieh1wk1xevac0x77f772o98kpj2o3cxv5re7f3xbwh7w6uh70iqfz14gyouwcp98n1nuga6eg0ruu067e4rqlsfj47432r4xmzwtvmr3b40p51axt1n1yzpv3cjumoo2rlz0vj7cavnv45t4qhdztojspi',
                url: '4gho643gfybs19my1tdocupvajqledcp6x7rgzqzoyic5h7fedhq6c9rbmfjcw4bsfydxoetuqpsp4v4qo83rjylljzo3zleusr9u002t9rqi5ia6vbk9uz3z4q7hl06dcfb4cgktossgz8uprp88hqz6rmctc1k0b7vhhu1b1wmohs78mdvo5k1ehgofv6l2bxrskhex2jy8tpkq16jug3fsa9potnhcoblzwkxlu48y4mwxqs1eh3fwlk2wxin2lii9e5a1wl2am2hpjbo97swgxupe4vdzg5nvpm3f6bd8du61fr4do9yj0fd20tb',
                username: '58zunpzvzd9d4epfkdx25q0fcdm32knek0lilvuqtyx7zh2gcwkm4eshtwun',
                remoteHost: 'a7t6gac85l3lgir5gdv4vuqahrzkl1krn5zb9r82iqhsv33xii715pbfbgr4q3xet5rylbvef6f2z49ql5dxe0tigmiqjjbdmrwg524t344mof7wuksu0xbt28ae3etzt7wlbcd19l6qyw4uyz9olp74nkl540y0',
                remotePort: 7378290136,
                directory: 'urvymk4b8cjrcxb3p0mcvjlq8ujn959x6onjg6t7up4rea8x1ov899jmg6l6jok901q2isqc0fy9rci4k5opxft6bmjvk9hzxajte4nj2kqyij9mgs0ydrnm3844vkobfpsad7wmhxb9gg0zbg9lnbr1z7xpv3o1qlvr2hhd92ec1fwmi0g1ut59g50u0r59gqgu8y1mgxbhce8e1sevdmpkqo073arw6nilvo0lkr1uabukq6jtzb5ouj8hglygp9bdsiu3howcxbbx1wmrctiz5shdi5h3jssqg7o98t4uqruvjd5n4x6pa9ahg26obmvw1v8id4f969nrk23wju2vr6c87fttnwtq3oaya5fkjgeaq0ega5v8hes9z4qim21s1de78cwmjgnaelops38bc8ff3j25mmelg1jzktrwtifo198fla7h4qxov4jutb37g9yp26jp5t3y85f4devvpacmbe5k4itu7gfvu9958zfsrrc7aezbklp0llymnpqvlv91wqt2jbrg376yavz91edcj75ttzhnm4wfmwhc2c24m2p5n92qovgobo2fncq9zm3r7nvpb546nw4lkc2in1o81il310yek4s1rfavqvpare1lgwwjq3r08a1ljbr3u4dzv1jr01zqvyfui974yco7vc73ymvujnjzo9d10xvw3ylfmxrkdhepnpe0t5q2l8znobvyidg53ut0wtsd5kezhp3tpzo5ip343voytcat72p06nl64vvar2mei1xobwuqmigrvy3ko6wvqcxa39mow5dx64z8ebkxf2tef85kl487ci72qkwcbdxwka4zy8jhfz453u4rrauxp7736bhiz5j63d5as3lliviyk9chi7y9i3hstiven3h3jcp4i2vf388k2ase6dj6k3nj1oheutbd94et0o0jcu35og5f1nk0jzkwdwql4ltwi468w0cfsqr5dvu7g2eha2w7ai2wcmhzgr6mfe88nn4aeyzaxhu1hjclts4hdus1',
                fileSchema: 'ax6zxqu68320hkwydgmol6wm3xuxf87z97l3tvv1n0q19a52i7wcnj6nk5szj4i7rgqxl9glvxp4kzb0wk5t4t4oejuoirwdczjnd9xasiw2slfhvwk67cz7pkeas4fgez5nvix7wx0nbhiss17q7hmhlzzlhrqcnc2bzhxpdf471sw1oq6n4d4lyowbq4tzkkwq07gi8yu99w30xjzwycgygp0x90xsani0ade5n4f4pay4c8w73lowguidn78ptwc2dsgf7n7a90rfr86rg9pvv0o1gz8icuq27sqncm35p0eim9ok6qkemslw15jtgo70yvzig7rbo38jccdbjuqv9arevhgrfk9wwow7s7z2m4vbpbpu6c8kxwdllgjghnsn2yrm8ajm9kztyv2hpvbfyxk0ei1t6eof4ynpnsdz00d2bfphm1d7txeh7cunn20al03we1rktujx5yuimq6s40esea9z1fnc9d4hfzmij0zjq6gkrk9b9vvpz72ltvxtuvc3hbqistqt0uw9k24wr4p8svc2bpsttm3vbkrb4nia0tamw30u52wnn9zocgd587dungqjqph16bam9n4kkbq2tvn4hu9odymmutt2wit8bty0j5bi4ch58d81p4lby7akkvnnmfhlvqjufcsljhvahnm1ccgxsi602ft3a0l2bcwn472b9l3k1xt7d9vng0xhg12fqak9keuzs9z222mubsupwtp4u0xwz4c8aoi855x85z1e9785dpthh2uhahbpcngvl1kfpc35da8dibnmssix1qdem3swdyf9dw7ebdbi6sr6kc7hcpasfx334329a1b6eidth039qdtzwqwtxzjfbiy0dzin652b817ivkw5dbfbauwb7m1j62ug0c6cuvmuga4e8ucoadoxivlim0d79m6fajxj6lsj7udnx70uz6o42al1mx8halmd6bwcws20p7gw7f468id75127onklsbvrqb9y0tt6f1uhp05yq5nxyb2c7qwi',
                proxyHost: 'm44r47fmgmmm9hflxodgrt3ksr0zxm5tg58ylql02gyrf8pd9uq2yw4uijjm',
                proxyPort: 2455866239,
                destination: 'y0mh9332phwszy0gd58quuxhdaw668azbnoklzuusqexspptsz84ewfbc26xnpbdk8bu7oibdrcktz55tx1g2884136gyqyrrgh4pny7ei5oeuixlnl7inlzo8hnud8vp8bcr5u6tov44z44puwmhvq9qisy49nz',
                adapterStatus: 'XXXX',
                softwareComponentName: 'y7rnyzbie7dj2k5akew8ufgqnbdiu4utdpzuttgieugvw0u2ghwdvfu3nfrcypzxrk0fci08ar8lshhl7vklux29155c7nxt2trki3n7pvn8msbpvhos3c9bnzhceuo3nb9urb5mrksk96klf62hawprezpyo5q5',
                responsibleUserAccountName: '6nqpt3gnitwvoknuwcyr',
                lastChangeUserAccount: '65w8gt52zc0yjr80684o',
                lastChangedAt: '2020-10-14 15:28:06',
                riInterfaceName: 'bbye8ielr4s2j5ygmsjhu73j649lcrukakuzcyd6w99bxh0nlsf8lkdtj5m456d00690m5w1p61h8otjpzp90oa9yhi7dxd3ijffz6j3x0oxv46xn34lh99fdxpd089775zu0mr46bpy80gdpdy442xe9qvkde4u',
                riInterfaceNamespace: 'apv4c5y5rj6nc3xej6twxmgw9iy1kk33ncvwqs8yuz216bugthm20xlc3xcm2n9ds1a59ztnd7qqmrpxnvnccva0xsc77cba2irzbnk5aj5kj6eowvtn5t33wkan5sh5wu1mokgkc79btptud6uugp0ultbg0pk9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus has to be any of this options: ACTIVE, INACTIVE');
            });
    });
    

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: '3jh6faaejhj3vcbps23etgzg312ypyjeb66crtu8',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'xwoypcpuvudhgnth6csylcx5cvkm19ywuwk5bi8gy21mtxpcgj',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'r415ptleljnj8o8sqit3',
                party: '5nnqdtgk8xcglo6zwygle1rowkmztp886ze7yjm4u1lkx2qrx94ekw8jj16dxrbluaqvxc736txppirbvam4vz6hy9mw7gyk9findxm9euol7s89lwdbthq0yeoz5fa723x13h2454batrtz6r0asgqwotmg4z5z',
                component: '75bqgp4i3f1pol85grw85dkkpm0pgsedumm9zami1uqcuf2ny93l3xcte8b3ml3kctzzxkjrah3hez17g2n7480ipzpe6ic9hb0xwo9ev1cs9i0l2eazxnircuukcumc7h133bt7bxcnq87k6a7ewhtp0xf7j7zv',
                name: 'lnj4m3u9ogohnktq20xi6askh2eqtdi2toyhzy91grlhaguvxcampdrii986eo653ppow2ugv9g5ippmopzuodc2ole1w4xrstjucz3xxvkol9sr0ga64qpe2836f10dljq9g9061kyubb0sp73hvhw18p99krij',
                flowHash: 's46z8mduuz8ysnkerssux5j9tkmpi0m2v5jbpovk',
                flowParty: 'bnfuxlpr4klx2v9on2sid6c414bpyk9vy2eq2zogx6fxg01jkli3gamdem06bbqal40wst3cextfp96b6esh1bwzo26up4etqt3vmu7xrbsa9vf0u8zr8mjn8i6o4gui76ir38v65pr2xvlz01qhb5b6t9mcaqvr',
                flowReceiverParty: 'b1iqqas8teu4wdv2b5dvyn94bsl4wm2xju1wdxkkhrd1nrkkcvammf3ggm3pcxchpfsjcd60wthln84jmcbellsx3k17w4d5idz6w0nad2x9pcpajk0go8bwsrxijzzf59tg4sc7i1pro12vlpqg4klsfslntj1a',
                flowComponent: 'j55zsaz6rcdi63wtx86o2idninhormtfps9pa405gjjpmdsyq3ixh6pg8wgvwooy0li8qfgxi9refghvhq4o0mw1wiatlp4pqs4m7pofg2ensyv34p88o00jdv468t38vvvonv8lqcnzvczom0ka0eo0wdi6m75y',
                flowReceiverComponent: 'gyx1u4c9atc5sc317w3maf93u8c85qtu4vqdv2cxc1se36fnxblnya5kk00rusmemoh0q6nb3kjhtyxrzv16f4s5ohvipeknjt6q4tf6s9vg2l9aidgt7q2i1vrkpgn48hqhdvvjeaa45qtmqwq3u4ghn4nrfqpc',
                flowInterfaceName: 'tyqbjh3xnkzkj2mgidh5yhoocva3yywo0qshh3n0t2es0mrotg9rtptqbrmwejno8dynd3542gxxgmi771gcsf29a5lgd9er7x2ik4deg64ne2iqa4pnvrzlll8k9c0zuu4fb9rgh4eudpby9w5y2746fao8agkv',
                flowInterfaceNamespace: 'ulm0lrfj8l1zshwm92c23gs4qb02rscrw72l4fwy60gq0wlxwa062jukdqltbjx5818mvk87yhc4audg0rghwsy1i3k1zhobsd232r65imyotng5atg6fqkzdp3lhwctjusjflukf38fy8kcbiae7uq2cyph4rkn',
                version: '6arxy7rxgqibp71s5end',
                adapterType: 'aqtuet5tohccyunwecwvnugvhkjwjduef0mmt4hjhhpjpc1lqg55lj3gx95i',
                direction: 'SENDER',
                transportProtocol: 'x54a65t30zowz1oou7sqzguyxaihdxl4r7i0j43n9ltuq9zjha8cepegoekx',
                messageProtocol: 'win33iuwus2aemp01kyq42sxitlblprivacpjqrixf0g265kb9r1aac73g0y',
                adapterEngineName: 'vvm8p7jp2mlald4t5p42iyv9x9ibnmeocfth2tu3i68w9cnv7b9mus3wc9fpgr0tvtod07kyzng7bycdwa50tn571qf2cvxhzuk4it4bidi1cf5oo1rk2ipd8g6kdx1hob3px1b2yqofr8iz598wn18jrno47sk8',
                url: 's8ndym2ulqhgawz01m98w80leomkone06manyi0drcfdk4v4mkezqoy8q6pd50hn7bz242vfp4yg7vnvxpc8ysen9n10pluf9x4j1rl8cx4y60s5fsqxdv1gpamfmy9wmnanigjlkvxzsywb2g1zf9iti7umv3ga9vlk8hg6t545ylhpuztgavqmhj3nh3covnfi2gahljd6hvw2nr63y8cgfw0z79l68avjudt8huy1pia34gwn86l4hxvb2t8lt2ukvjv7z9oy8s1gatjr8199oh1ee2xrm6qxspjt9iqtdprk9v2yvn18yjwx50mi',
                username: 'alpifjlw8c61r3afruf6un271gpgbelp08yb5puy82l0oeeqg90p7sa1dzfb',
                remoteHost: '2znkc3oe4f8hoajdktv6igda9p7xx4xsvsibb6n1lvdlzowpi1wo3daggsg9dim5d43sviiiqbb5vp9nsm80ggqkfvfv0o9u0oebsu532gdqmrgus97htopbw205gfma0zwawrbbkm8wnd2dhw26c6czjl6yoa5d',
                remotePort: 4203181081,
                directory: 'd26vbz8ba9y72r4q031sb8kfcn15spxexqa3qssws354l00holgy9j7qrk3yk3ca38tko2jq3v7i8lyg7croknwklra1m9nluttc45q7el5xaanvlnxf6hlvtnkodyto0kis4xz92thj0dkhdlh0545x3lykc2m4ftcmrylmj53ljblkgwkw78gzytnq08yxzwjw5p7wp1bwoqc18hteyq1kvftaxwzqlhk283vqnof03eym3dgpu5yf27ae184a3ki9vixhjq9ity4l952tx0lpc4vubyth0kf8tsyj55e2pq9nyj1mrjtp3k1h4746cfclj2y6j8r6la7mo0rexfkmdcch2r27d8q3ulzfx58ok9j4izlzqy066qycmjrtif6a5t874fxukeipylzjafu1cqkxa28i5kq3j0hxcm6mwqk83bylxlmkrhuq2lu0w5aorn4lxrvavvz10r0m3807cc54mrh89jxofx5aqouu1hcd32zw2160489imfwmesxdjaqwe95evnov30mhv0bt73det2gu730m0wgrw0inzvmvqmmknzt694d9b7cn2v1lnsaj6tqfg0t0ndldfupnga8vpw3nh6drk7dsnq7z1wo071hv6e915kzr2dzb7qyrkp20w2cigbz74e7yu4q9im4acgd9frgyfmif9276847hglvj4ryl1p4e4c491ad2y6322843q6dyvxww86fnz2ks6mib5fxldbvz3xp5xb0z3h7irkechhmv6h81c1h4d9z7cdqdu72oo1qb0h0h46riao2q6m3qkrlcjpj2vaxl1yjlnyu3xoa3fvg94kw4zscnvhykupmtd9xp0zgou2d15jnicup2ktzl9wobutvbgsipv55wdsfus3svd82dqq27v9pj02cuuinfmmz6bqwqspb2giwxkt8kagzfuq4pi5081hkz7l70eyh92d3wnch9aaf6dc4ezhx2gxnrkzvnbazizfwi5mtjd7aakuxwv3mr8ivg1tklsimb',
                fileSchema: '3ak39k9f64g6d3yz50x2gdjibeq9i977cib7qvtjhykpmgbwj3qvrz92bgcleun2co27xakxa65v1ine0l5fvupe8qojmday82m17i0e3b41mhces73ejnioqlq5gu8a1y2jgz2ftpb8bigevinpcdk97xx6pki0qjoa83qldmue8yi1ykq6io15gakvm9vmytw2g0fl3jnybokfjuai6ybbisstpk1gi2sigko12h6bjdwjnhls7t84ccyq91s0brizjk3o80ecc40ufjfqy3l3xibqnx9aghnwdahmf2l7rzn11plvqukorof0mv35xoo3f9l8t2cyflqlvtz89dn9b5a64mtn7igh3s7j2913tp1h4zxq87rc7cbw08tiw7748wznhpwm6chhuoswc09xgzq1qxzpkpsie74zjp29ulkby5ywou7cl2kd7kg87h2ne11vei2is0baekafrtgcv94rte3k36uh8xfxztvg5tjfu9idagnxnkarffgfdgtzjdbalra8wqy143h4xw8t1hpy94xh755nwikm4q6ll3rrxunvnl33tjyeam3mg8lc1ydo3nfadl9jmnm6sphommkhcw7dkaac1lsw09981fjgn0waepe2oikssll5bawkw5rfu1fm0zmidp3hq09pa46cd2rnpkmnd6ag6qq5t484hbtxvd9r1lw00xn2yaxdzhoajebzt31cesa6wxw073vinw9ubdm0o5gsdsic1qykvr0xfrh6ytvjob0lub3jqv4zgzb99f7el3349u02ywxxc07kabozhidy3397az0qcxgy4l580enzz894051jj74pqywtzwmulbxzq5m3fqnhxpj4ldetz39cda5ehqwbsmlrt7zvb2xrenb4ivjkhkzcyoweehkcifhwhrfi81skj5y2yrku2i4ore4qzy9ycffkrh2v76h6r96fkxw8npb6fjknf0ptt1h3hiqjw4l638wha28mlp7jxur8kz4hmkqsjwvja5zq0v6w',
                proxyHost: 'yycw9q6s1aptbgl53luj5hx0bbk7o13682ibjk38cpp1d3ru4waakt07l171',
                proxyPort: 3994560215,
                destination: 'cq6jlw22dk7pa5mqmztqkilcttu72r1z0lh98gdd7pfntieu1b34jh2ofgv45lubci0lq20he4zfu7w6g5lri00aq4ku4sv8ysjxwzlvlhucg8cowunuy3ptdg59252o2ax5m5xi1s4ii7szmno5ll1p1oooui53',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'q6haanevsi6g8cb2z4uox6hbsbovq7uxzw5dzimnoo0tqyr6jxis25hfymi0vsbhyn4w9rbv0zlyt9kw54zbnnbb0f63maijfvbnvvfdz72m2sjr56y1cqngtnpigk20v8gwfsqr7bdwxt547q1iac53hw29zu1w',
                responsibleUserAccountName: '4bkli3u7p1rxmdtxsn34',
                lastChangeUserAccount: 'elg5ptqci5f4bpuveksi',
                lastChangedAt: 'XXXXXXXX',
                riInterfaceName: '9v407phaj3yi2054g5xs4ny0n5yy6agtay7h0eq945napt9v1sa3ml58332h2w0sppu5gjweguaftltd6k5clt9tux07detcr7p9dpwkzy72lgq9ov3c7rlpwutb2gt89wb2s24rmc0ybazf9gkj04gunwetil0o',
                riInterfaceNamespace: '69v6zulbvb94v95k0wbi4n5xmz2rs73rohgjuyg056vgghd21efyv6uwam2tcaj7ez7jsidy59dazlz8o0vw0zuqwtc1f1hpx14sbt3n5522xjg5r1eouq80pyxsxgor5d2a2e2osk8ibr47i6cyqz9ciky9qb82',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangedAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/channel`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'tq6vgzirg1hy4eeb861377nb78s73swiyq9tg2yr',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: '9h2ccrjub3gzi0b7fc17nimozz0yvfdcdmjsmghnfovbec59gd',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 's6ax65cndlbelinbbxjs',
                party: 'ay1ejgr8j50c1pi0xcs2keq7gei8u6u09g1wqb4up4qmhjvtvrfn7yf6kss0tcbzy27oe2n8oxghnbel2xewfisxh0qlbib7a9lbxdojo4fkhv4lp5avggepntvomz7owp8x51k120n4ddfof73f05s1lxtn4luw',
                component: 'lz9nab1fh8qu1h61gmnui7xfqkj66oda3t8kp87pg4z8wythgrveljgdrhuzs62x8o6r5cfaxmamsqoy7hqbdi1o174iyf4uqcffuu2xi36a7sd3kfl8m2bz9pjw3o18dlbljb61mjvu1l3x7aw22yklppsp61zr',
                name: 'k1w9mwd2o616x5jba81ykrm42crhyp9t8ig9ox3uwnkwi8dojawvzuk5mxwn76go335g7iubium1bgtb9sl8ol8j193wxhnfe14ef3ac1lftz3nc3x84jsosr1dmem0pcnfsbse7x0hfzdohlkmcf134k4xk3ubl',
                flowHash: 'smcytoz81xe77shmquyyajxmg1r42h9630soyahu',
                flowParty: 'n2zfixuko6iktxhuqlws9tt7ekgso9rilkuy70aoun3gnaxwg43vg3s0m6ygqpcskavoryi2pj2gc4yuooxtc8t52w31ksvukrh95buol8hf2ugac4e2zn7ldjzovldvszhmbhaw6o4li8anghd6z6chi2v5ff2l',
                flowReceiverParty: 's5a0zvpqobmc2tqfr4eg62fpneopqn4shpcvqodcbg6rxxrak33ovj6f7lliogjs8ho4i2z1g03i3mkya1qu2jkg3fbtivu2yzj5j5maokv7868pvo3vhykl8eluyppyb9o8q8uqmh7bvwlbq6hs4frg1vfet0q4',
                flowComponent: 'w3i1cqrrs1oe3k97mic2fy8xjy3guik5cdw4o0qr49uxugl9qhtfdcc3n8qevinwytq7ljfg09i7k30uh5estsfwdfel5sbjzqe6dx9cbtmy7dme7rwafuasudopyvd20e4zso70k852gh1wwdawyg6hgpg90cc7',
                flowReceiverComponent: '5iwgibywzrqij4bgfmto83756ssu21v94psqc6149ei38upg60o1sb4obitbsudsm9y9633sf1hik0u0g9yc182j3pk3tyaly7xejfzb40o9xpxsd151ardd2vituqaih1bidzfoc5pxx8917af2pk51318owgcb',
                flowInterfaceName: 'h0ub7hxgw65w8tc1025vhfljgu0klofmoqp78sbu0ededlietostshurtgqg4pqytmmibe4c5ju8cpbq8cu0q9pd8r7yy0617vyfti1eqsbeh5k7fumvc22cmaaz1594ruapulgpuih5r7yn9ebpmn2so3sa4xi9',
                flowInterfaceNamespace: 'adzk0hyiukb12m0y10i6m0kguxljbxt3wdoia75yz3pzp6o252gy2ud9d44mmglicdjjquvwlebizcy5xwefubk2ue55lv0cfg6c4otengs10e7a2xneegphl1mitpzg7lvk58ujgcnl20gxskmlsgra6bjw0s5z',
                version: 'o25vfdx3iawgtwrzwx1x',
                adapterType: 'rareo1o2k3tglqtv9p0k9er3dq6mxt7pv6msloiy3xd2gjjyl5ine9t8flku',
                direction: 'SENDER',
                transportProtocol: '6yt7rkhbl1a41cjnkjoyw54z5uhu51iyp0escffshkgkcl2yuycbsrcjmi99',
                messageProtocol: 'wfb7c7j7h6icq4uavhjrb5o077zavbcfsxid57ocrqb1e3czuik40pgjkxyy',
                adapterEngineName: 'tq70jf5hczxwfn31arxwlidb77k4cqkde7p1f6epz6vbh26klhsi4peo9e9p7uie1ahyxvm6le2ygc4txtv2mh02wdo637f27ydf4r03bkakancbp00io1ywcg06n85aez79w6w1vmdyle3gpjxampt4m6bl153p',
                url: 'sany3ouc2s00xn2q2rjcof1qjlct2bd76lvbd3f1fbejfjeiwpdh3cv5w0xrklsolps26dn2ra78erjj5y9oc5kirmet4x9h8zrnxc4uu4k3g7ieq5a5c1tpyxrh77x3b83up43e9bvpgr5obrv2z9fvqa9x3tn0scg9dw3klet2cay1519ntq1gnsh7kf2ntw4fftubjhxs8m8zr27p7cseba6t0a5vynoryk0a3j7bzlned7wq7dldzsg2oup57vgfq3rjyribgnzab6tjlet80264urw0b8jg8hhw93o3fkuthxtei4qzedz4dgr5',
                username: 'keejgf5m3ro7ojvrydls6n5nsl4o4r42o1cl1htchalcdl83b3awz8cxi70z',
                remoteHost: '22i4aftmyxij6drwe37ncx7z9kl480xdz9und0ll7eyg1fj3r946glxtdvywik2a9ephtvltxailb8c81xwlx20ibzbsthb1p5u2ulc52o6a0sylnly80yaw89wgzf4lrzaoqkrhotdxb678fhzbon241lwll8ip',
                remotePort: 5013499839,
                directory: 'ccj2hhtwm6e0q7har589pa87ratfvht0juhjbla4ynoo1aivov9slkzs65ahnxajncmizig8m4qyd4frnndbrwiizo7y4jamn4fcwvgvrjzmbzaqru04fgyzul3zsbn2rt9c1slldf3gqvm0p6j6ekrg3j7fbbb8azfm87ut0dva3jzrorm2akqedc54c5b2ioxjeibvt5lfh4wv37oboodqqi11c0asxrzyibzjm0lhmkvmbk88jhpnvv9a5bat78wyghd3uy3ub9m1s4xfjvciz9fc471xfwc87t0vwlteuwrmg7gqxwtmb6clfvdjeg757ztrfdo195o4b62eu4f3habl5cxbft7vwvsj1fnvx8m4rm9jm507nyrk13a7pkiuf14j2r0kvc39jtktlgnu0yo76plj6b2u9g59m8w7rvqwurjp4lndfpxc14x02kwabd0s0p7hqaag4mep5mcgbrg23o8j1tur3q1aaofcl0odfr616adrstw8zyky8xt8pl7zk9no5rt48n1fhgk54lsc7m8lz6rpivqjr8lnayk0sc7debmyoy2c9im4fvmqmadrli6507op4c1rfzjp6tjqv1ryp7b863jiyqr24813irtxa8y0xlz1kvn5ngpwlhf7hea2vaqzz117ghnadrlgjwthcf5ye2uxskqjxxeobrfk6mdclrm0x3yxmkuicyvsl92dc3cbwzjjuzirut3hq8c331x0ggwr3yvvq2qfg9frt1i12lgq4jxi1p1erm9emixjb0kxte6mletupb18hlmpoo4253g15uoact08bmidra7o1rc2pwmnrc7hx7wpylj674iuou3m65juvj1hg79jluyo0e4q7cpeagt06fhtoem6hl3sre4x5xze3jpd77bm5wabxxl0y0ty84ox5ntf57juak9f9vwjkxtb4c9sky5r201k6pc3sozs0p6rmh8z1r0a928h5fz06cd0fw50b5hsrjbro4c9h5owbz5fic3a5plcr9kx',
                fileSchema: 'yv1trq88a73l5ki1tqrxaklmpbehumuralv8clws4dl0phbeewyomqnm4slkt6b4ymbv9pev1iww9vsrhop91ot91zurm0w7e64sk4ebunzn10ux8jsk8pcrje9rf752i0vj1zwlzcyhtvmvvaf4o5vg78owhc21uv4w9bo51mkmxs7c0y0o7e38qfi1h4fy8u2imd0efikms0rexwj2y94vsmjik0rn20jtvuhf6tzr54g1qckpmqvd6sz16lk99wfb73p1ayridqy143hn2ev8mjoseutzlkc73vxkd5ixjom8hzogz4lj9j8uycxe0y7auq69ciwf2mj4f9nhf1bmzboheq7r2jgvgvvowxhfwiw5ng0gte72zxdmotuoawcbrmhm3i0m5jhihdb6701vt5yyrcrr0l6ai556llwmi7ls9lagl2qdi071s3a6k9fnht45uyqtug05z4q7s50s50m0lcvftiw8z68jf60a8h47btduczdb99w1nxcc1unlcg1ljlqg9x2wfs3lgj72ogwkq1d8riocb8niv7b88n7ht5j9av8rsacccok2u0gwchahs6n7p3z8bln7nlbb5zv88u96617a2rf0wzphnrk2zge8cpkl7jpy14xvkbge3g3dtsjb85p7ksvet6jv49fhtcc1hbip5blezc6x9v1o7r0443fn2ab3izkskmztrq8rc111r1bd939qabjlk5dfcqy9sal6ln4f20008im7ktdfuxvwxr9hnxto1ud1fnloio4blzzgygg01qq8aukoqiexamvx6n3w4nuvmj3srzlxhlzxqfsmexm0ev2wc7tf4jdmli4fvo0jike60d19wf4lbrffh0t77sq3uma357cqudc8uc9wuhfxx400h31whcw6pba88uczde0r94h347zig6j08qya7yy99uco0vn2qean14s2tgi3h5tumeq5nnp25uh6rfktsac2mwipiybmutolred77hlk0f2w02d7kq4d8nqpjhah',
                proxyHost: 'qplevkcnuwb3z03qc3canu0yhckud7o4ept821bf6uyohdkpi9ndx9m7oqts',
                proxyPort: 2418300586,
                destination: 'x7ghx3ytowbt18v2bmyrryxj6zf5jczng5fldmrmnd2fil7lcfabj65whxsbot9d9rp41niw34bitegcb8wvnf7uzj2hb7b4sfr8vfo03ehjt3bnkck0vyg6kfgjj4uhahw2jq8rlzljxmf8oc08hphrjj1dc975',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'x0w6vu329ice1q2np8zydwfekvb5m8sje05ea4qa83rabfm7pb07r6fhchmvoh6fed7up2wp2uf7fw3wx6cdifad73srqn5se0htqkxq2qcqmt5583u6ysjmy1lc0ndk6fihcflvvuelgq7kbjbvvyz289yfvlk5',
                responsibleUserAccountName: 'zs9sx6c24x92ryjh64zo',
                lastChangeUserAccount: 'xa87t93qcl14ni2ix95o',
                lastChangedAt: '2020-10-14 08:50:01',
                riInterfaceName: '33jskxhyonpl8f0tqmg4s99whw7rvev08p36d7vqjwyrpjgi7nowgjtwnfxncjfc426i0wfzqpstkyclcczmm5tn4gpmc30blon7rzphephjw8jjizkydcnrgo3s0s76skouj52tuoqe6dmimky2h2y8udh3a946',
                riInterfaceNamespace: 'zeibqy9eu2xpywoci2c5vgdqbdo6p7s2ai4lih7607wjbe6iymnghluvbtc426izwlppt4c7xrg3krpqr54wjcfff0lvkcdy7oaqa1d5eolmef1709r8todez4syf35wl7pz8zdf3i2v0loblfcn0zyhbs4eklyy',
            })
            .expect(201);
    });

    test(`/REST:GET cci/channels/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channels/paginate')
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

    test(`/REST:GET cci/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '64b4a11f-77ca-4c79-825f-2d7df5345ffa'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/channel`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'f05a1557-8577-464d-94e0-93e3f7d2c056'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f05a1557-8577-464d-94e0-93e3f7d2c056'));
    });

    test(`/REST:GET cci/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel/604d0dcd-4afe-46a8-8523-ff4902b00834')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel/f05a1557-8577-464d-94e0-93e3f7d2c056')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f05a1557-8577-464d-94e0-93e3f7d2c056'));
    });

    test(`/REST:GET cci/channels`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channels')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ba5941a9-c0de-4c45-bc90-44d4f26dce5f',
                hash: '7yn8e0zt0676gnzo7lsvdian4e4jl3m1m4ixk0uz',
                tenantId: 'd89e7500-1512-4aed-8dd8-169e6c2a6f14',
                tenantCode: '5hooui93y7h1i2sv3lit4o1u3mkkqz9it71kkuovwxi8koykt1',
                systemId: 'f41a1264-ccdc-405e-9ca3-e31915dac25c',
                systemName: '6pa6vmyq70oyodq5kh0e',
                party: '12xk6hztw331zg9dlr8ti3a4rwsscaddk230mxraiz6tw6lv29ar56o5y5uoqa8piisib49r138r1qi5odutxprnb9y8xkhdqrppiepsvd8saupsslb55kc1f33wk0xapxu1nw4ujphq78nu800ccswfu4trjxx9',
                component: 'n9i0xy6algsswwbspy4gi087bevfc98odety3zrin4gsgabehwwodlrao8yqq144dc6oiy4699n3fle7kd8fi4sgontzmm9ubqdlfetuz817at9woj5oe652qo6fzuk35ce998ubjqzchquw9jfsa1lgeoq243wl',
                name: 'mf8r8kgall0ot1wey1xyd71s7rw0jdozh4zevgh8nkdm8mgzjsnze87755oiuunxta97h8z3x0cvkp45f7xnkd9j7lfe3lujnw7lbcyhn7g7bzxt4pde71o02182sytni6o4xms536dv9qyb6m272xz39gh48a4t',
                flowHash: 'lyem4wrrfavdnvs64tqj93vluyn1fhzlqalypuj6',
                flowParty: 'vzs9rd5khcm41njwhuxd96r2t27atwa5spkta70j50brn4ia28j0n0eou91piw1ni2pl5oz8f6me7ih3ff5m7x0b1lsyvx5rcbtpl7u7v4encmu145penuplhvc1oddjwlhrsindrmy1grodbreje6lh9fxxspf2',
                flowReceiverParty: '9yaaj4u9bccc6eyggtyvyv1cqb4yh263qvwaystogy9aauwicg648khtr5o1utikpkjb2wew5v8r6fqizp2niujul7dnhl1hfq4r7lcveqsqpi8a4raqh290llxmcncr2qybqmqifviybpxuu1f4f8ijf3h2qb0l',
                flowComponent: '6jh5ra8ue0bdvd0ix8c1y2cfquax91jdcd59jvd0fz5kijheml5ym4uf3udpkszc7cgnzxv1jlvgpuqybsvkjvxz0qpit8koqs4rircmpntz07ffnhn3uq5unjnf4kpwvbbpmyryw7v9un62z2mia9liwpk8yuna',
                flowReceiverComponent: 'z0h9l15jeq75il576yi3dfhdwg4azqrkyq36p7bmln9wfyr9ai4e7a6slybokjuvzdp0x1y9nf7qlcfoxvymh3ddo71lgvtf2rn7vap3ujyage68j6o46sevp0xkdd8vc6kfzfw2qaix4p0r80m9tu8t00xgey9g',
                flowInterfaceName: 'pmhku9f51kf1k7ke31j1hfi5py0gb3wodo2ml63peur1rw0jlktkvdv9cr18hqkb3y8ouwx0tvnedv6r91cotk7n25soe00gn0qejmjcs11zud1wktyu2bp8ctgjc3yf0uakuipz6w1zazbkxedf9smkiszj4fpy',
                flowInterfaceNamespace: 'i9x8ywipb9hrqbepy21byddlsbostdy0yrylx1e3xdqdizxemzlrxnn5cmlaiu9wpq0cnuuvgw2iqxpnu6xwagm5xdcdtexxegunk5g478pzjg6fyzs81z6b6p3bcl6s9n1jtqlc0tj4p6rn9gd1inmkhope6lua',
                version: 'ozc5fe066atp3ly7u4p2',
                adapterType: 'mtt87ysxtjsy74wumgp6va26ti34vg1x0g0czrz4l9sswzgsr04wwtneqz1y',
                direction: 'RECEIVER',
                transportProtocol: 'hkwreb4lfetvdq96ow0c1ylmfwgghi618tzzku2bvd0mqq354xc0a9e31ft6',
                messageProtocol: 'fw5pg9lwlt8uqua5ygazzfbtirujtwn1l05w5iruychcvnf9krm2r9fn684r',
                adapterEngineName: 'b8vhle8t0ba8187c9l7q00jfk22no0ufjhvhqf2f6p4j4h3zbq5u3sauiffjtagettld20rfo70r8ebbg3tnadtwlhxty05t644gxeefbqjzix67od6l9xqs2ce7qjqmju6n3q8ab1mvt0v2jdzr71mb3u5t3eze',
                url: 'f5874o44ahuev7qo9qmfufqedwboej6uloiiodutj236dv46zgh69aeigdvuctgkfdivwi3aehnpqmw8z4d3onizgdb8bjnrjnkyobdzsdd4zz1zb7vkptih5z5claaou6jx9dl5kikzvtlodrpuqtph9fcpsg69fq7vljw249qo1ik2vp0gnbya4gfvq7t7syzftjajddew3k485xwyzcjj0jddd6wdgto16j9b38p1uo42ewadotu0pkx8o19mea1802iyw4q1bmwhcai2i07n1jje6kjxykjwd038bdq2wmet2hxkpudrdc9v16pn',
                username: 'xhb7p9atcbxdxzhymugsm4xemd4kpike4fvdl0dggpm1bzi3x5wrvmia4qdm',
                remoteHost: 'bdx46q1mzgstvkkoctc5s0rqwv9803j83la6jwo6gkh7qdsdmxcodbm40ct9nktihy8ul2gkebb3q3t70s9y3sgmb26n83bm6nroqeemkr74hle19g8u1drzc62z3axuerukvjmbmtqdcgx7434oc9sedv6bl9fu',
                remotePort: 5572699451,
                directory: '6ls6u06f7b8lpm5evmpt6s20bz9p394g2b6ngvnbo1zaohs1sok2wzpteff3px525is5ejh537xamf0yfswlrdaj88fxkekrwkmn5uz1c9lnwn5t9sb4somg9z0enm1mkdopyxgpekfohl2qmljx7ettclohblfc627xt5teipcy92xy5u4m5s9nuese9apisj7b4liuf5t1y7sz2uimqrtpeuz5eaeqx39h2ubbcezlr3motb59tte6vnnq2c3pqsj3hzsod9iux0gould0kh7xe53vpm38qpk04vsnzzwsszugnqaxynx4hq1fgoszmhvudo69lw9gq33deel2kemokwd7vkdr1lq3ysleh8c24m45zv88nxigahzazpi3tg5bnf3blo01wpzi3g6vxhq0fsu64kxqk2kohhb3zfqkip4fdvjh0e1gedcn5fpgpjaxdhfm3s08hrbzl5hczgom13x8ggqli2n6m2fkq8ewn3i2j0zg0c5sdxlxnwntmophanou1i5silumr1yormon1p6tpq7ojjeuy5qq45difkvl8rxov1fdqd9p0t50qzopr0nru8wyt9wwq8ge4i1zeypivz7x3wr1k39xtkdf61fsae7s6kiqhp7m9ebf1qzj99et46yqtjlo60xuvt1aiz6qwvzq8spofvcehiawz4ua5iq0gdkat7rksp01z9kvfs1pz1e5g07yz1pgo8vj8ex4uv6mvg8cg34ki59ih8ms7s5kbglyh00otszo6z1ypfso1df5ca9lagihbnday9qga636e0yhvj9pi3t2402mfxsgi4tdibmojydr0ajddi47rllahnjrlj7u9wtapry1ohajgfxr3asxaunv9o4eruaahaykppiuavauiemur5cp2jxkz3baeczq37ne2fzeqtgyk2himaved7jridkhwbp539i6uitwvnuzpgjhmxvb9ifw5ip4pra9pwrde86spil54cpcxtcdilqep8cqzrrs1q7hra81qrn3',
                fileSchema: '0m0zv4pbuvgp8rojgnefx0uysd2m8bua544wffyqtbtds379jpajuq157ukobfvc36f536q1wnj2tssf92ph3wg0wiokukrc1ot875pycekb0tcl5dmaev04bofgntqsdosee9wex4w460chq2ssk7w6s7mbsxlqmozr718viwejjtaf0mreaanag5ign3ig5isy9ru1t8j7k2t2pgoqmppmai5pudy7tk9tq32353oanuo2mvd6t32br8qo6h0oti3upzap18wfmfbae9m83djknex0stw8myb0gm7zt0xviof3rk6zilkdgmbhnnw7t0cfbwcup5aei4967j1wsnpdwuwrbqycasivza16rd4wewksfrl7deu4btz4nt72390xvocn3fg3rcyic3qvl0f7yrzl2yzikca5sufpuyrfohkjyndn96qqropjpy4sfude2wz94ungmc5vgevdbkespynz7h4wexnh8obi1hss2lcd8m21etpvh18boi72tpm6xujuglfr46kfnm8hjtyu5ygvrmkbn0wly3iah8widew8u2x332burk2zfe60n0mbdk0ltnefsb0p26vnkbqbkeclpr85wamtdbbcc628goukb9l2r7u45d3xyy3ft96ym9qmgcg2bvvlrdxt97x4a9ehxr497nuons1jwff4dwu1hoeq4s41pj8rnlapfls9h729enq4qnntubklnmjc2wep5eefs7i434smprlli1v26e15a90nheneirbcw58opd6u3dqvsi66w4w047va8mvaok3rv9rbwdc4jd9e8c6lmaz2tad0yinse0yek4rgur7o8fncn3ptg4vfrsnlcxlcelv0l6oc13n9j2fr21cg9ewj2neg7jjm3cu3ofpwsypii22hrkd41nsfhl949fpphfs61y8ovydogo7soltvrls5r3tu0jgflbsg7apnmuoy3qzqxi0qvmjh9anbzwai18k6kdurnqgzizo3khib9olf2rz4a4ua88e4',
                proxyHost: 'wtm9vwwqn2w9eviacfx3ou5mmb2smuy84gbkz1dpnx21v4v1d2mabx8auua1',
                proxyPort: 9111825698,
                destination: 'h1aiyumnixk3l8nxay5jrtijtbce7upczie56ozlkgkdo80j7a5r1zzqbla2sxqdloj87a9wk3igfgqteiinh0os9jt7affw1pqtahrs36wn87h82ehlhk9f9k7liebqxd62t07puygsuma9anfj9ca5zarmjtgz',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'x9whg1ahar1f5p4n2hf4ytbmrb3kq096emrtxvvdw67csviq3v06ylbi99y9o8jkjnhq2vy45tgdgzv7rx4tg02vhr00mt3adhrnaskdy3wrjxppxxfdpnh7111xmpv3ipqp586erljmgdna1ulf0gfqcowlg0wq',
                responsibleUserAccountName: 'qfvml7wru4r7bxp05uyc',
                lastChangeUserAccount: 'oghku3571vmwum4vv4ni',
                lastChangedAt: '2020-10-14 16:32:32',
                riInterfaceName: '5gr8a1p7qrg54gvjxrd6mwkz67kt2eyr67obl2tejnwpdtjmpehsjvvsxlyi3yq1atgv1b8tubi2vjcl9cvly7zl6q03s181l9jscj4dmnbozfzkz6rvduzagzpoantwi2qw5viz6nrduzzdse9m3n1qutaivfjl',
                riInterfaceNamespace: '0ca88440ypdc2j6j2f73i7karp17bjy0xvzy8ea98e3gb2iq2vwvsjdrja7dkcfupp06s6kzh8v9jl09nljyx7gnoanhp6447gbk07xrudnn0970iakht5l2wch9ly7xk2d8e0bqegslh9fb7jffm7jm4mmdb523',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                hash: 'koxe84txkku0z8hp5rduwds3fxgife2j4vq3putf',
                tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                tenantCode: 'ad7rxrptfp21jxw8dhr83sryv7lqp44ugvw6ludts4gu0g4ggb',
                systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                systemName: 'dpavecho04n1qxidt3tw',
                party: '86re4pgyrtmbhtu33uhoi8e0km7uea97d7x5t8fsticik38om0ufs8yiz4amtbcxdgavtc63qdd7gn0t56p7mfyzdtshn4o5paypabbdvd016r3ufjh9e051j0pqooc2briyqon5dnoisranlc5j0p3sjwyv9h0p',
                component: 'x7snbv2zyh7asz3bm22ms8y4e46878dno5t0z4k03hjoh6li3cgutvxkx9ywjzbp9m9ndf0i948ospkq09b4hk42y5rvfri16h1ndah4bziw26t9hdj0fneg78jjizisp1r02iscj39q1zkgao9i89w2whwdngmg',
                name: 'af09at5wyyuwnd0ozzpyz3tq6mp9kaxstmk3ckkf7qlpbx2xtdf655n3sjjw4am5g8mogw4606utvdccd4jha48l8ipmib9p6c023s0ewumw9xg6dml6e3qluh12jlax6iyk1lsprtd5bmsaujthhx41qnn1bj6u',
                flowHash: 'bscuzne97djsuftyeueywknhunktzvtxd0u7fmpj',
                flowParty: 'o5hypc42e9dqjqh347t20pug95r7datit9bep7ycel5twevtroq3b272vvil0dvlg6f0cilqg0hw6frnrtrg9u6c1ribvoxaylkj4iyd4abt0i3nkthrm4qpfloifh9e1dscop2y8zi4pz4snqgvk8pgqiqzesdg',
                flowReceiverParty: 'lnq5eyrzulahk8l5dher2swqnxwhul6e27jqvc0phbsy1458vo1xj8ugr909di5yngesmjux2pzamar4t8waf3wmqhoz1qio2vtiunximiu6g9r7aa78ui7you4inj4ga8jzilgqiv75i3ekm568iwcql6jikuiz',
                flowComponent: 'edkmdegpdnpze2hn3otw3pdjn49qupngpgzgbka2e8960p7qoj5ya7kv9rnh5idcx7emup3om89badgbgoozk254l8fn2j06h0wavbd3bhjk58dj3zpt2g9gbotds403ithg2rzj2fe7wpzneo8u08gw07lu56di',
                flowReceiverComponent: '0h4rmfrchqve11mcqs3wtvl0tcuvf43mwro770w5elhx9q21ussnesevmiyxn0usk5qrxpn8wuzis9zllq5r3j8enb13js1ths5dqm4u3zelo7nsc2b9h5nn9wonj2yv7363j9y1b80bgn6zoan9jh2tbveh27zj',
                flowInterfaceName: '3bapeqn9uz3m3s1seom35ww3peq9f5jzimberda2bi05xa8ni3byivhd3ldwa8p6nr7ylgy31kbqh7r7xo6lso0g4d0xlhocplkykf6wb14kfv11x85u5ge4nxkyw1173hqzj7m1glr7wpto22wu68ox4ud32l56',
                flowInterfaceNamespace: 'qvwnwz1ez2ptonoulp8z5d1199q2le6fixwkzejnm3sivqb9wdesqfkvsghj5q920kigyox76mjevymagwkf0vi390nqfg1lobilt2i48k9x8xj7tgwjsy30swgvbzllc3mv2av46szog92hg3uixinvnz9vt9zi',
                version: 'mxjt31i8dmf5zquhwf3m',
                adapterType: '291czvw29b4rj2esl7pul5wsqir9t6zdvp5ysypcb3uh4qi06yv00c59tgxq',
                direction: 'SENDER',
                transportProtocol: '6r3lrrpto9zuz1ldzhhq2gbr22qjqgxwss692r2f3cv1pi8335gmh7cwnmsk',
                messageProtocol: 'papkgm3nlskfr1mobcrmdgqxjnp340h819nzfugu4vdegkroe0zur5y26axg',
                adapterEngineName: 'ueytn9l6fsnyfuc2xy745osy136h04a8zze805g6mta4lyti36obbea0ygsfkvkm468amw9hvjed45vwsxztagetzcrryu3xnyb6lkme64dffhwz1u9isaqqlewp200ym5k311wn16hsolri80p6q0kwjepci2df',
                url: '2rrde9qnksna5dx6bun8avprtcqk5atges7bocjf83k0a66rnmxsayls04cwm8jxdpgiq3zirijf2bnlxl90hfif9z5tb1l6000z2nn02h1nluvf5ptp7uj97nls4crzss3b6l6g7jcxb0kio1gr66omlctieiguoqtpo026ww3awsfldpj2iq9pheuh6b0dc33gcn5pfl30jkzkyl583n1a995gk1x8t67jhqq1ut4hbzf4o0pvi462zeazrjbdmcsy42av5ery99k5us7yyq8n0k1x00rgd4fxauekv337j5bckdrprfbdyi3439tv',
                username: 'ul7mgnlpch7msuwvaflz060y1xdiadx2h5t7ar7e433pqc38f8d9diq2kcy0',
                remoteHost: 'vb5ltc1tg7chee7vs0zon7n0vljd65xwrguq7w01zqwhzn9ax8l23m6wuc4tbuiyp9tjwi1tyosi3fc1i0ok06cdz2ok5x57o4kzip8gybqpsi378vqwl5a77m9cfqcqtew97wanhbcyx8aso66r4wf0r58wli7c',
                remotePort: 4410560710,
                directory: '6twkmee8mcfvxmvormmexks5l89py848dlwa77ya6uuiixp6fpufy0f7j0xnvwmp67p5um0hze25lrl3nx78ddo7ibmmuepcqxr98lirkz5new94g01cs6jr9difpuduw4gl62gw55ulp780jiqjgm1ts2qkoqdm37v4yk3lrsz51z54zp82ahf2bgtus2lk7bqblpkn6w3mcbnav0s0i21tzg745scpr5p201ldi6iq33nqo9y2lcgfr9hytuhu62s07ocz6ewlioop3w3apn5bybkp8u38cn6fnnc78an8c8l1erf97q1xhkzup3e8fnfqe7rbavx8nn44djtngmvdj7mmnyx6weez8d53srmptmt5rr2tvk18byqo9zwqcxj6c9waml9ocx1t8m6j3arqmqffb5u30oxwfi9qbztjb91wkgbhctjze55wxx7cinkm0sft06pbo9ie9ww3awvm48ajmrdqhot4yp3kkmvt3juqvj1uz8taknw91k6pl60ivp98hkxh6q698lkfqa08gs38lq442mlvufnb7h1u8k1xyusxorul3bpdrh7ftzrjr0lcweilteeu5l21bpqrsis99eukr0fls8u9q218ab4vlowuocg6cu0vwm5twomtsz15kf930k0ao2yckses4rplodrsuoc5j2k8ranbvyvpkx1tl5qx5gfl9sd2r8jkz76jvwjbcdpgvmw3fhcxw0dpct0vckii6k1ad288taefzb0xyxt2ckal3lw84pvffocb9q6a0jrv4sxpi31c4f42kqhdsb1dqulp2ivupepr9620o521epe4ctkt7j8r2645i55gzvapu4qxwir4097p8h9r12cv30yuiovdkpzrbw7pmhfyaiivvxof8t9c5zy93aap7pts82zz11hnt0p5y82ly60b87u8nns96wvn4pzghium6nlek2js5jryxpn5etzsni6804drlmrc8rm61gdhxrqsga8oqt5h379ohzmkwf7j4tqr3n6l',
                fileSchema: 'v445rr16xnvrpdgnydpmak22kal63cccqe0kgahdfqf2mck2mbpwbk0069a81exdz88qqhqierajkocu3q4dzagip6h1ciqsgu2b5yb88k4d1zxich6dvop7rjb3zsmytf5jv6qqge9kg3ctowjh5gqnqxg8f32kvcabidslisf9yinutozcyim3jzyw9i1hjnqh1tucxpi16u5jwvqs79sqkbb267x2w9t7yt4tffwh4u8my5iqzsw2y5tw9mzosn5sxqouq76ksmvwhivnlzr84qwa4io02jqy32z63ysclund7grrrqp6x9fdq6l13otr1dj00qmtksm0tvvrx8dhxyuu9cx0omk77bsuyd9lzit35ebzuh6p2ew6k1deiwx8mpdwhhpbaj0rylysodivkp1wj0wz9me89jgk54ip5re7x1ktr7sjvdpnr4rdlx5wz39ni7myzf999gnsgwnwzx0mz3475dsar80gjb6a4ijtuztm8vi2278esa75xpas571l8ryl66s2fhvmv2s6219iw89et0fe3vh4dpvx9oygyfkrri600dxtwtc3j4vn7w0l1aj7h6yd9wj577n0ac4rvdttw5k4897hyyq960to1xasaamx008wawm6la6uty1aqv8kz0jsf6gxb7sn4bes5qhap08jch3yu2qwcy44abysz2x8nx5d16pywsg5hrdu488mounq643gm36yvuiyyek7ob8zfs61478dcpimokb3uko4qgewwaxzshok1xlp6by7c9p9172po53y5vo41m1kc9ze12yeykuby6ri9v5b7bpnz2ia43jtla75fuh1ok2h3blfhcswyhhviaduzo1kfwxvdrfp0gbza5qaad45xtgifbtz5vw58r29gedjzrvb1que61moe6qnrinkajqyuwjum0bj47vsuawxm5yvlsthapgxm8pgu7tqsd3w6yw1in32ut72628er7tqguvd2p0k0afsv69sf0z8iuq2put5hf43gn3s',
                proxyHost: 'ap9hinoekk037632f3cvbj1n74mdncwwpg62qkj0wvnoofagt37w9ek3769s',
                proxyPort: 1397332301,
                destination: 't64xmv6wrscsn6u6nwpcn2dh8s1ihx24s4pg8gp4lpe0i2h0k2kg7p79e8eop12r65v3797hzahchyj3qk48labqmrjbucwviwczxbu9fasqwxgavq6v3298gl83mmwc20geeqc05qyn13ak4lui1i7yvbyxcy7v',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'qngci0au1n602spep72va1mh19aiepqin6vaiesqqzj05u3mh3kf600f3q10v8oo2k0m12few77w83os51h7k16lmdarvya1c81bgprndbp17fwx23a5ac0jd411kcj0694sh8g2hsrk5ac6ptdbfnhmsgche6sb',
                responsibleUserAccountName: 'f6ubed05xhtn8khu3l0q',
                lastChangeUserAccount: 'ugc6mdstfr0m6zlgywms',
                lastChangedAt: '2020-10-14 13:59:33',
                riInterfaceName: 'v18eds1b1j7v7agxzm4ulzsh83lx0jgyoiktfurafk8cqjgnpv2k8fay9ajpuc7r687wnw6z11eba0dy560bjab7gloiekua62f0xw1d7ehlaah5br3zjo0ft80i4kx8neuf5m7pu4sh8xtlsy6gb0qnge1c0qlk',
                riInterfaceNamespace: '0z83n3vpuxny12bbkciktit8uz7heuthji38dodp7a440q1q1mxp2hj4d0199xu2yq6vjdzg3e0jo0kflb7vice3lczwcba03zpbg0pv0e7lpuwr6hp3ob4h9sf8w0wx1vtcsovzo0d29mceq2y1natv35ln2ez7',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f05a1557-8577-464d-94e0-93e3f7d2c056'));
    });

    test(`/REST:DELETE cci/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/channel/bb0e3ebc-a282-429d-ad2d-6a5addba9606')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/channel/f05a1557-8577-464d-94e0-93e3f7d2c056')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateChannel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateChannelInput!)
                    {
                        cciCreateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                            riInterfaceName
                            riInterfaceNamespace
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

    test(`/GraphQL cciCreateChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateChannelInput!)
                    {
                        cciCreateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '4be3bb25-d25e-4aa2-af5a-ffabea76cf51',
                        hash: 'jgyglhabtpl61hbhpnyuexc3xwpu9rhjdzi665j8',
                        tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                        tenantCode: 'r6ppw61luhb31f0rovsg22gt6j91h39eyisc5ya5fe8k8x2ojg',
                        systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                        systemName: 'g2blapu60ic9no9iik6o',
                        party: 'v96ulbeo8iv36o52x4omofbgtk16hwrwlhjdqdeckimydbabevve8iw28tnrt1hw0b78a55e7616a0yyc38x1rvsyf27bym6et9lbhkf7d67crrlxb7t4nhruj1xoexmw88tg0j3ghh874r1c0sodbsamheven5e',
                        component: 'dun4tfkc1ao6x0h7l3pu0q6b25csssmtrnckwl45hhrn1yk82wh1a6yy1qiwsre2u33ynlvg2pfzlcaev47vb3fmcdh7uwthqrbgnpax3lcoby83q949shpe1k1ucron6g995aw41rcwv7xlq3emuzlltalumx4z',
                        name: 'fy0eycgw48ufyba9docsuc1sf5k48hxt336unges2qug7r72sp8tiedy42khkons2vkss5fvefjevwsitzp9r30cabrf95ndiudkds6dwlsoyc7zha6px1uezcrn53t5jdve98yq3hj7phsfe89re1yhujpsutiw',
                        flowHash: 'gaw5c40jk23pqk82c7q8ft3onhyvxlk633qk9z3f',
                        flowParty: 'dj3y4ns3ipm3suuq4q79fegge5aiza0srmab10iwszkpool4g24wg3rfpbnt4e6uiizs17ykwivh0lbl8rc45xqoc2q5tgldjg7pzxynkf9aa7i8c453bj250mwd4etgo5jb3zciladpwuz8zdibcktdertzxehe',
                        flowReceiverParty: '3ls89a59exom6cxu55xqm397ki3s51u49zuilu4gnfjnk6jktuu4hq67gwyqd65v82w89sd1q6mmuqpbbmrfsh3qbyyqy9g5tvkgwkkcun83ax7qlpkinn065oov1xu4thtlfhnmaez7oo3pkcoujdyn8j2dr1n6',
                        flowComponent: 'mngan1qusgb6vgn53jbtd1i5qa30vzoxq5k4f2oghmo6rvd7fcjssusg0iqma95wahz633djnr4ov89kp7mq4ueqxe67unbwwif9q79vnl4isw0tn2cogejynpixad65sx8mbx1jmi6bxi6or5kb6fojhxo3l17e',
                        flowReceiverComponent: 'f1ed84dhgme2s3r24c15leujm5f5u54y5vjzt4zl1y0tpphcgcs9cm9vel2ay50wyf36kufk2sez7ui2dtlwxnjgmhdtb9ifjfrsjkb4c26vr0rsdr3psq5e8qm3hnj506i9bgf9a2798lt6ivr3p6aazvkkw9tv',
                        flowInterfaceName: 'v8l93o1071qe4oow9r7nrgdew0a2v5339k43rn77k0faupf6o77utdlhanhyr38ygsboz5txq3i0dgxy0pnhvrncty3qke6wvi18qghk2kyror2qh7i6c0o496iir16ttfpp8g005cimymd67a9bmzlqm3h6mdou',
                        flowInterfaceNamespace: 'tcsofu3x0cucr832ototqhy28884jm3rdcdovj5fjx6vroz3ydf25psmfn0p4t9okgmhlfxouoagezk14obyxqprevmfzzfhdvrc2ymzazl68xi25mopufmg2h50thpltwxwgpj1o9xhx9naxfa0kf81x6q2usjj',
                        version: '3xav394j6sl0o9r39ke9',
                        adapterType: '63nkcq7o4ohnli8y8bhnwje17hi2thnmc3wxv972katbpal3ag1kykgdv107',
                        direction: 'SENDER',
                        transportProtocol: 'ou46rxmaycdtxo37cpj6rdjlkti4yeyhm450h0ihq9ckr7l6qr1wn1kjq708',
                        messageProtocol: 'o4ixlsxw96ffmxnuorbsf8o4zgj6faoh1xx2vk09kxegrsd7zptapfgtepx5',
                        adapterEngineName: 'y29hhvcnpa1d31hz6nqfini5fhz9kdshpf4alex9fbmr3h4gaacfn5tafk9f0rlvvlcthkc2mzahilxwci3ec95iq0la8qpj5jmcf6zjbwia2ose1q6yqq911mwpetlyhoox6ythnkc3rzpgjqdls7b1hpkikj9j',
                        url: 'ja4z3s7euu2gr9f32b2wzzfzuecenscmiws4g0vqli4i330ttrjyvap8slqt2a7rvmbaamnw2qltgs5dnhq0k7fdjw8bx9o2au45eypih1if0o7pasept47nwjezbqpqo1ons4185lkc30xkds0fv62jto0uxi3goww51diyinbzmv545yk3jdgp9adneksuvylws1try1xnx3y1tof4i02ki79x3nczai5y0t4mkcwgky69p4uzdb4s7rjxlojyjab0yl1vqmw4ra29x6c124ql9x4pltxkqitf8jtqg8rvobwwv62k2bdpujm9ja9l',
                        username: '1pb6lz2xpxli8xc3738inatppdpjwt2l041o8fp04ktxbd846pitxbu0rp5l',
                        remoteHost: '3wpuccic8bpdfa524og5utpoh41sdrrj0z7cocnh3v18fruv3p9qe283iy8941yjtekcjzolejo39hayfcefd09vllevk37jcisi32sgotv9p5aelhaqilwn3z6vdscz4xqvirhqlr35xvtyqpnn5on36gapp886',
                        remotePort: 1943470565,
                        directory: 'bpvhoahav4lnrgrcfgfkl70ss5id3trf1fhk7zuo5ldiy6jay7y754vr840ymgjk3jvj52ugd36b879nwyfmyd9k4jat53ml2p8kkl13h841rvlvf6qo7v745826aj2wxu12yqfu0gxrph4sgqjyadp07g0t5qy553f4tk4snl41dv4wuy7wx6ird3x4n65djppxq4urjwog327z28vw0b4srpyag8sc7ldslzssepm9e50hhyf12orr32c3e3f4k28fcglxkqe9x9ib0nwlaiw14fppvk4sl18h2n5zlce35ixiz66qjs2blhikkyi51f65d8xgmz6625zbtmtt23oywo04ozl7u9ecip8ad3vk8c19kzumniurpk8ppj9y1dni844igtb9a5iyk4odmsgw4jmdkmznim17ifry84iojjdwgdj6pqox27pkn960tbbpbmli2s5sbfkcgevo2qgwwrxr08ithjk7egsbl2ayfnn7vfe7br6lm8cchopa1nq1kwo12yyxmln8lclv51fkri5ypho0povq4qdzlj5i8y4gf5ntaauyxgstvwxys7vt9bzy4luq9i01qmoy5pcqkadjgdevij8lleiejq4apwg9i4tujv86kwn6zr8dy894sq662xfqsrgmihrqqhncdgjo8xq8ensoiklu9yz6ydy8a5pip6znlxgaigyj4cnzr4kla2h22aihp3mn4svoamkgcww4b0beyqow2ts0gs45skykcabblzuo919jd1v0fvno8xfc5ris969fz3fd4tur4h03nrtx35rkqbd3tbaagyzel35dzto4286t4xpqrz6f1rpv7fhzc542459ny41ai9wjrig443we866fe9izusos8eo08zzpfid5qlxoj00p0n5zixmmp9i76hv38kt9jkdtww6f5fczivk0u9guzixgnzd67u07ascnqly6ei50rs8mdhv9qklt9er2hp861q89eag3r3kkg3n258ixr2xpog8gv30lj0uh',
                        fileSchema: 'zv0f1zob4kss98ytqsp77rq7ymxrvx1imtrasjp541r1uka2cnetjj02szjlcuk0v99u9fyhu792o5fbf3pv1rghmvctjtvvx6rzcmphtkdyqaz95ealsv5b4gxoy3tbtwhuo9pr6trsyvc7ibpj9m9hsrloi1y48s7qm9l7ldzvrtvbkzfkhtqbcebcadxuictcg3c75ztu2ir9ilhvroarzy7cega8fwk1axe3so8526u3fwa6ovfprylr50g9mkohngi7mud6rsfan8b3pajs5wqy2aav3rk0s3qiwmirf9i91sgxr5k99cpxefovrh9uy7120nebdb3oc1au564o3p31y10n375qamlvioj6iody4qllzog1trwdfc0lcjjzq1n1h8kx33o6jvtib9vl4b0ardtdp8zmv19luntwt11uid8p77ebnzxjkezty4ltafq0qvtgm9qxp31m6aiuncyk30d1dmowr8qbm2g8q87a3lrdmmcwzcpnhsv3uu2c9rtl6l18suqtt1llvi9s6ta28i1o80lavyywabs4msqnwhd3o63279s4n6fffueghrk05nz2xuch666s0e2nqghkfbzj6s62ofizqd0ftfd970kwgvjs4a4nht3yx44pq7bdr289xzjcep6se3s4oa7w9rjnvqqo7476rld9a3xac4ni3dwtouyv60f9pnfqhooebpxeoxlzzmz6vnl404kur2b8ykmq4s9975s7dgqv7tcmlk06ex0dh6w77j3of4fxxxdwsfgm09viwbaac5zu8e1bnuv1opk2em1llyojk9gsww53ds78xyqmqanx78jknuam6t5hvmjpr0wd9pzwwx2k93yk1gcgn01pcsoplleqbr9gnsyxv8r5sa6x5kc37h27vl3lmxusfocx8zjdth0l4m1olw15xvmscu1np12xg2vivulnhkpqmm7avl7j7j7p5cwj76p9rfgyiii4gnuq32dgmopmvlxd4k10qwl2h47p8ma278gz',
                        proxyHost: 'zxs5wqjs405y7ht86exqz85oqxv44r38514zb8xdh6xnq1gsl31acvyogyzh',
                        proxyPort: 4108251154,
                        destination: '5mx9qh9juqw4vobxhgogtwfka7yclug3nhpia2bc2u6bcga93k3kx4iowzm8p18l4yh5ul6t9s8tjnmi57fh424tijsy5sh7awj200vqq1529ob64orinzq6jx2c98cbkxxl5k6iijr0wm3xbuyojoqfupogxglt',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'octaxey4awdr8h4uh2tokqhfbiz2uk4wptvejj20dqff24w8aydbt0zqeo9ggpcoxy27nf9ktk8icgbu06zp0x5vk48l2897uqj10590c2h3jyfy53wdas4jds8fg0qw5ailt3m5vdxuig2arayhxhg88g9g28el',
                        responsibleUserAccountName: '9w1geggiz1lc8xk815rk',
                        lastChangeUserAccount: 'bs09awg9339o835jai61',
                        lastChangedAt: '2020-10-14 20:41:38',
                        riInterfaceName: 'gldu4bmilm96gfmvdpk0dsc3j2lu0xv2c4mwdisk4q1skc9ioh94er2e8gnnp4vpgf96sc6oksps6os2wivomdbkcwkv1q6064ge52uzp9ejs9qko01c4cg6ogvdjg2vtvcqx0ykjq5iza1rg4y663sceqaolkuh',
                        riInterfaceNamespace: 'up4i5jspz4wi2ujc6lgi1n8fcxtrquctvq9gyglvv9p6g8kzmib7vur6no4pqhpwdod6p014z93146p4mqqdvzp6rxazii7lor2ijvfjyoftunm22x7ss4xq96fi743fgmfy3waesxdimjakyz6otk8gq9lr4p3q',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateChannel).toHaveProperty('id', '4be3bb25-d25e-4aa2-af5a-ffabea76cf51');
            });
    });

    test(`/GraphQL cciPaginateChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateChannels (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateChannels.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateChannels.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateChannels.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindChannel (query:$query)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                            riInterfaceName
                            riInterfaceNamespace
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
                            id: '1b15ec76-72ce-4e76-8a4d-8fe64485ce3e'
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

    test(`/GraphQL cciFindChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindChannel (query:$query)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                            riInterfaceName
                            riInterfaceNamespace
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
                            id: 'f05a1557-8577-464d-94e0-93e3f7d2c056'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannel.id).toStrictEqual('f05a1557-8577-464d-94e0-93e3f7d2c056');
            });
    });

    test(`/GraphQL cciFindChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c67655ef-38fd-446b-93b2-d318aeeb5740'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindChannelById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f05a1557-8577-464d-94e0-93e3f7d2c056'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannelById.id).toStrictEqual('f05a1557-8577-464d-94e0-93e3f7d2c056');
            });
    });

    test(`/GraphQL cciGetChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetChannels (query:$query)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetChannels.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateChannelInput!)
                    {
                        cciUpdateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '1d13f40c-93d5-4d24-a63d-38dc61216d15',
                        hash: 'zqn8k45apzcczbwpbvrhsiks4f1lrct7hhdruea7',
                        tenantId: 'e1bf4138-9c8b-4f12-9515-21704224d299',
                        tenantCode: '757222pssx1ozfmw93hbnl27zzf3nr968bgnmq6tkl1pql6b28',
                        systemId: '3cc6a02d-6315-4cfb-99b0-8f5a7418f39a',
                        systemName: '0zd5s467g9cza5ee1cgy',
                        party: '91g7wgll3jrqd51n6qjwkwqg603mj92mm3g5xsi06ck4j6gkhxzzdfcrl75gdw54tsuuenwm8jpfyo9u9rosv43i53jveth70xurs83nvhjn3ukh8kjzpq6182pmfiay8tj9jfceruooxnukpa1dcdl9o7hvl60s',
                        component: 'kzl5x7s5xmustap2g9dd6x4sxnqed6dyzjn07989v5ibm8dg6mrruxrt9cylre8bqag7n68lhjf1nfz25rm3yy5vuauneo6abndxrxt0msrpykhrl91u7p8wwp29scesfcnpq5ls93rzasyv3ek1t17zl6hemlf1',
                        name: 'w9bfop478a3ytwjzime9g4v42ow3o846ewq19m7mfo73sefm10j794p79hd2jzsm9kh6gvls4zobbmzifjc64o9q2vxg4miovo4lwy6zzmnedd2mgxzpqu1kgob8a0n6bndrcyup95bm40ksn8d0zym6quscrnee',
                        flowHash: '4068sccg6klqnpj0qb6v9wlzf1owzixwwb9536sj',
                        flowParty: '8ezl2i2prbwn1qpvyhldl3zeiuriokyfoi1a90vbtugkk0ci4arhbi9js5qdg86y8ey51hx0loi7pivw34516kmtfk7w0rc9s28n84zhvxsb471bwmit63y96mfkt0lewdxk8p6wk9zwe7qxeq24gdg129fu9j7t',
                        flowReceiverParty: 's8z2f2u0e4ifh57xitbj6r2lecatnkpuifllor2o97iokxhxsw1ui44apiha6a87me5l1kfs3n5eyu2t37vpzvah4a0sew7mww7di671jw62cb2gt3sse4nx7ju25gn5ubo9sjlgwsyvny7r69vvecwkoxogs9pq',
                        flowComponent: 'a2gs1alubm31xic669efwmktt5hj4xsmv21r3yjpeinpxzxvourbqj48vo6sjglpu5zetz5tjtg3qlf9zit2xfn4444ots7h2gpvrmk7edtvbuxz3653xiffr2as076tfmdrfzoel2irax6lkfol8zpa907gw2ag',
                        flowReceiverComponent: 'ghtn4b5tf9gop6d3j3sqqwkg6sfnwgqxvj9avklr6crf6ejs91uyllcs2sid66iqcn108rfvxbwrvxsdjr26ad3ntbk34g39bnfh6rg27nt7m6i88oo25dk556dx7u9bkyj4zkcn5rcmccbrgu2l7b7kgg2mi8h7',
                        flowInterfaceName: 'f0i2db95ewjdsxtohh4cuxfkhg53elc1mnnee2zv00jx3z5v8dok2fh39z92haf8daax6al905fe8rqk6kjaoua2kb05yupcakylkrzg7efdhmowszyiflhnixq6y44c7svmwd40zacod2dcw3jz6nnx307g22yl',
                        flowInterfaceNamespace: 'fwt9vjokk0nmvzbqa35i9nlbjpk1shz6tup4itz4ga3zeyf28dmcws3jq04vv2dogjcw9oc7dschj3lquuxr7iv033f7yxj9qy39ch69e70ek2tn3p3pq1t3pz6pnhk3nyfu23fb7ke6otdlquvqinuduatljnf7',
                        version: 'j3eol5imagf99owcs8k5',
                        adapterType: 'dowysje8swr29fjo3bkar0nfwybdra9s0nhomyv5by8wd5970udtmuf60tvv',
                        direction: 'SENDER',
                        transportProtocol: '5crhh0u2zytj4ly79lt28wo219bcsnd0jvph158fyimwqw8rthszsikjkagh',
                        messageProtocol: 'ck4gm7rmko9yah0g40n76ean2ijr16r6g6u1lnccugke5tuvtmgxd4e8wvac',
                        adapterEngineName: '53o3o4d8iqoszw0mrcq6hag5p3kym9ow5mn1x2op103725s3ap221vb6xd49kdnyx0biyby4z8ereayi3fqu31oxql0xk08pocybf9lyzauthbr7mn48o7oyylrk1a6mgb9mljdf11hgjwe53uwurii3fhn0efdr',
                        url: '5s95xapwxyd9l7yt2mpw9ttvk5fb8ibqyy42n6i7ilu0gyphyldlfdaejjjwj14egcaij53ki3nr4kp62o9sk67vzqpnf9w2k9fyzurmhwy4pbn5x8e42ukn4ev2d9xb2ocap32mh4siinw26bxpxsh90k5cobos43le2k8r2j1hp7o34mq9ufb5yl8o0opi87cv6k24f6vyzfrwwlfkfj2um6v4dm8jxfrmjzffacmrq7z7jzm9dvvlgonvo9u2buvima3tqu6uf65126ay66b5fq4si5f05l9iv5feseicjed8msg5uw6m1911lvtb',
                        username: 'ckq3fz0pjt6guri64qxvgytcnrg82genhis83q0jjvuahqzyjcou3bjo26kj',
                        remoteHost: '6l0w7df42ysyg5qb499w0fy2zdtpliiglojvgg6condhxpanjnhtf2840ux1wziiemkmmuaz0usxgos0mneimdhxaqr29605hyjookn8k8z0rr9bqjpj1jkgqzzhcz059rmjtqh3mb2cuaiizhf1ugm1g8tnvacw',
                        remotePort: 5630205391,
                        directory: 'wvw1naf86biumtv3bv4iwr4st01zlf83n9vk3bbdw2zqrhdddvy2w8m7g1liajkpirv2ffph8egac4qa5dp889j5t7snb6evugds3ys56lyx2kp07tq85f4vx0ckg8tzkgtwlqv1tfs9ysan7kpaco3e0zw2edklsyfbwkofug10b6sfa733rm6rl4we3ef1yhjifbi6x1zgzaibz3n7s3a78x45q1qt0fjfithee7c12mbv0rx1f5kw8459bdjz1ttuxhv33m7stvtyrn7nkf0vlaks89grix31e5soy1c6hyvzoyyyqmuxnb5eai9srrjrc9odvm1foqlrjdpw8qemjr4v8vkk3bqjbo4nan2leymnuzr7ny230e940w5ajnlqnpq6z5rintwnb7lmqnrobfj5zlnt5u0w2qx3bc8o64uiny45zifhb4mdvb45crageznyr59ysomw52gusloaw9e5n9c6mg01jcxod7j0u7i2nm0r1335w6wiflye1ga65t7h8600e73xa6weokbuang76r94caf44zen48v063bgmsla0oh46tdr3mm15qgzsw95f16fpttd78zwq5qi4ihr00003hbsi08z27ks1lw1xbhc3xxpp0hich8i0q60zwn45clkkbhcz08oku6mwh9jxfynqxpspkl159p6kusmv154gnmespykzg5zj6vh8vdppv7awazr4wv32tua7nrvfeiqips1wfyer8mqvxcaijpd1ncuew7tvy78trwrdywxrq7mbxoipn3jbea3lj2yc1h2qw84trckrnc3yi4tqn5a2o8syikio9akw2viikc1co9fe0lstraqm6tmke6czepcb5o1eofk16ipekvtdzghhjiuirci2vmkx6qdpaqxy8tfxhy0qq92b036j0a5nb8b8eb3dsxjzqux21mcpwso33etk9n45yigas6nrclov1s77pq0qelmg357vvnsav3jnjcwegiapmwlr99xmb49kwysnsstsufj',
                        fileSchema: 'ti933t7nqoh6vh75kv1s2dhevu3rswmcbxrywd7h3hs4hnmg72bpn2xop0x09jlaf0p856n1c20dqgldecp3oqfc6rj1je6rk22a7d9u8m60wtkw8po8frzocyc3p8x16cwe8ofjgabc9xcaw973z3373pco5pr1bmnlyrm8a573cj894zaqwx872grtlxzpjbkxhl7fh8rooz4vvs1l2wd9ljdjc33mt2ore2tblpyr7kkmpgia736qr4o7cup3d7vj4bookple5zomcuc7mnamwx7icy5z1omf43xr9a0xnbv9hqxjdni5c13v9s7hkp9pnbdph2da80q7s4rjhc1y570cf89sa4bxbozjruigajyuibs5hhbtje57wwd5bwj0jia89w4s73jvup3fkam2cjeoa8pourrvntciynmyz5759yabrk4h5n39a45pp6buxbelqchjifpbbi0o6i10sb69wcumya2a8awt6hd75l3hf8qrvz92rwu8ha6b1gwmydhz3rnpvia4l2krx30cpxp3bxp64aeoud0xthqiwzobupcknahnu3ab72em88c2o710wju5gnjvfwzw24sn5qjvydo6r76rfd5rt85q8qagevd5t3yq5nitrnoi25wofsnau21u6wqqoy46744z4csrwoa38muoxv0z8rqbath3jjy0vlz7gxcux1oanxmeyl7dhwiwzrrbknm3066j4t90gjhiiprdnk2ccgi7m463svi4w8813xswyjjgrchpvhyvjh98e8ckp00lm12zmzjgnph8b97gcq4ngnt9z281pue3yftll9e8pi3vwyat442q0kti57h1atsac9izywhpi9gztxjtw8g5w50f3gh629zjq0kbeyupl4idn3gyiguvq867rlxj2kmiaahgphwh9r3pqq1shok3us0gtkuw404sw1jv606sm0sda9mm8e8d3nc0sp1kaezuecg4b7b5hppbkf1hk3if6g8n08x0lvs2p9mgtn7vxlkq',
                        proxyHost: 'zqkbouce56vkdb9m2y2g38z4qc449azvf60jbnrxt8ky1i1t52su9za9f4ny',
                        proxyPort: 9964512143,
                        destination: '2hhuvhnjzaamm6ttmn18vn15gowztzi30kwntoykvmxjy6agze5o4sqa9h9yiisf34lpkn8c4vnkhy32fc5x4v6q627v6642ze4ug5vsd0jbpx8ptcc6po000faq5dnlblse8o8j40fwbgbx6tw6rlt0n8j52n6w',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: '5n0d4l6iqqc8jiktvfjvrildavhruz5flvvt3vt6x29l5st4lejh8liszmsgtm13bvjku3e3izkydgvaznhjkgl2m42jwd15dv8rcs86lnlyibhapempmi3tu9tl7y8j96us0kelhbpypwshq6b9phcuhdu3u4ej',
                        responsibleUserAccountName: 'ytvm7qsuizte1vinga5h',
                        lastChangeUserAccount: 'hutvaamgic0741bplthv',
                        lastChangedAt: '2020-10-14 05:25:42',
                        riInterfaceName: '2oq4skrjse5a8r2ioxgebx14ys79g0fjjfzcz38at5jvk2godig2ojwxplndjku5vlbnwni8yz3dtzrwfk8kweh9ze6lxqz9ccpw9xp22jfcygt3hq33qfdayohtss1kohy15f8dao1xtki8og5vpoettvvlals6',
                        riInterfaceNamespace: '4h08wq2dsq09z0i76s7lgtntkro1ejrxtdafrtb89hyhf5v0pzgnp26jzd7p5bjpjwwf35ew0d5oglewtsdgxfghpli1bfxngivne98vmi9269loz0hj6h2co87cyx5mz164ik26qstfzpfrn7hy0l9r7nv51ryj',
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

    test(`/GraphQL cciUpdateChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateChannelInput!)
                    {
                        cciUpdateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'f05a1557-8577-464d-94e0-93e3f7d2c056',
                        hash: 'xt5dx3nutofhdspne9w41t84ewx3x9wz2p0bm22s',
                        tenantId: '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e',
                        tenantCode: '4oel75obz5280xd6nvsj92g9ej53vu72qylyyy2pgfvb402mag',
                        systemId: 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d',
                        systemName: '37dk8xtc5gio9q8hpck8',
                        party: '47cfekwtnfduzo3ugce036lrg4qb4z6emdp8elgzicvck26uvydebjjgb482e1hfzrw4yssmt8i7x4qw0579zcw0hu9mkqy1kyihyyg3ak3uwspq7d9iqu3pbhxi7gevs8hj1df6y72lnyv3r1vhc6iwvu2j9ack',
                        component: '03pwujkvbzw9id35qx84crod3o3lxqlz72rq2j7eww3bea6xn6trlohqzcukg09cgn5jewohpbq4aptwuryy5bxtqeplw6ti7imkft3dp1uuxjdr6vpl7po7o79sgrttbuo74erjyy7bsjau0hu967hqk385j1cn',
                        name: 'jucp0js2etnqjfu8nfxodd4d43oukbjk77lkozoe9o2b52okz1djdlw4k60h5vc9phzr7jvmpnwklqbxpjbqhutiacddbh9qy3kv7giisfsz3bdf1gcyybv0tnx1txlr4h1uozftd8znal2g6c7s7k3q9irqvdce',
                        flowHash: 'frjezfql3bu9qselueaub852t0lfcuyib6ppwx56',
                        flowParty: 'n1240rm1tr4zbdxz6z2879azp7khks7vfr3qr1jjbc23qv7csht3ecq60ilcw1rqde2rbwi3vqpih3773vlpn1k9qqhshmvx1l1hf79kp16y24mf0dsawnskk7ztwc52di9114h4rp5snx13twba3azzt0yovpw1',
                        flowReceiverParty: '9lcqrzpoglj5gn5mg7ov94c48519inu2x60kh6o4y2pxw3zp22c2sw010jz7juwg1093d3empat1ot66awdxrb88bqje1u0iipew03t9hsh6apifrxje8hdwjyb91xojhmr6je5bf15ho4ddrm08ic8vfm7nokuu',
                        flowComponent: 'hsfxjn9zpgm6sp7ap1ln072tiqkch53rpd4syuornvnwuxv8tssi8lo0pqfp9it0qewyfl2vsu00b0k3zasl7pcizegbbl1uby2qdz4imivy2v9isxlo93mfhbw40nyr9nn6441cab2er5bi05pid2b9tg729qgo',
                        flowReceiverComponent: 'xzhszchezqqyj4y2mwmdv5yw84onv7dr75r9qm8psfh41e6vl6eathv6jkt889x7yosxxf8d7hb26bmdkofcwrr6vo122jk0kmxvkune02fq8mvifp4moesyfnkn4q5oco5o5pk9809ycwdc4adqj1i81ewb5j4e',
                        flowInterfaceName: 'mbqw73yn7qtsv78wgeau62wp838y1e7j81hvxno5ivqjhwo0ywj5sdakk707i11ehfk589u6ib0epvp7k6k6a5dyta1yg2m3tzmjb7z8evd8w7ggo9lqrpy0y0zczi49ln4v6avgi9rcv4slb2c8ytg15c7even7',
                        flowInterfaceNamespace: 'u8wuet6p0b1xbqt35ygwth7one774gpy1h1jfbkjnobl231cwl3m9irbrmk6zm5tckmlba7t0kiah1d5ax40jstgxfhtkbuxj4cejv7etd90iv87jde7z9c33quu1cepowzq6snfa743rbmj8osbu4rwbs9ik3ec',
                        version: 'iyocsv90zzhmfw4dvl1n',
                        adapterType: 'jlrdzdloy6el3cv5saon0k7co51521aku8eehvk789kvbgx406ivkj6m88c1',
                        direction: 'SENDER',
                        transportProtocol: 'kksnmmgxmcr7fuin8ocyvnr3ohvbjiryokktc7l6wlmhku31oi4yr9rzaym8',
                        messageProtocol: 'u6kqrvj349s0orvsyruh7o4jg5bidpnwtlwrhyt8o3yrcvsgmzbfm4tj7y2q',
                        adapterEngineName: 'dmw2whkv4sv8ppl2ixbj56s6klft8xbhobblxlz09wenu9v6v4s7r4kgnnuk430kfbmbic7jhkrex8l9yytor5jcopgfoczlh1mkszvuo75jo3xpawz6adqbd2q0xcsrjqwa3q01qebzeimifp49y4dj4sjklln6',
                        url: '8szu2936i38vc0e3555ghtbv6e6qmd640jh17r7hv84937m4vpi3994z1nkeg1w7l3w12zlj9rvdy4wlgwvwkg6wc1mb690uwbhn7aoazj11kfsy05y2s0wqyn0qo46bowcet9pgoowd4rud99eh0letxvtiafvy6osac9p65i1jr9ovrj831nhsut5cq9rblpq2pmnxa63epcmo39pgbznfyumbm9oq5jejr1d3dp7b02ouifsfvfkbw4sg6gyf031ok17cykmodwsnpg288koue9mnuc7h6q7yvy85ulfw3w03jqayuwbvqffyrol1',
                        username: '5fp2jja05de1rdlulvdlv8voh1ejez9qyohwnhvjn4aasr0sckq81nm7c02b',
                        remoteHost: 'py5ftf38gpae4j90qb5wdegrpvxxw5gw1unyqzn8p35yxr3uduqku0zhgjjyt8n772omtl3cfdzht2x2ecz6f1735v4htvqak2su6cm7ovl07qhsz6b8ffnndmqlkd073i3g79s5kdki2zpe3sa4sr46fa5m85b8',
                        remotePort: 5873386647,
                        directory: 'zj3uj1nwl7e4wxi2wk70va7um8lk33bj024l8b448zych2yrbk5n02uyfrc84z5p9mi7etrk13vxg5ovz7d8ocyklbajp1vat586xe1wh272pr0i349bw6cfvoxta8csjg4swkq71xyx30ozc1f8sfs4ouru0hij3d4ukhwz0kq88t38aqi4knjmkj6tauu9u4jg8pmtlva8k3wacd1ll64v5r6e5watu8j3zcff620we0unqqy47meglh4ya0pa3td1f71ax7rpbpnohu91drojdbzh5xy0dqlanu8gkli7kzec4skwn8cy3t4bwb6f5zglun9qhfnkicm9bqtpcmk1gaskx47vzh9rbgw40jpgdn0darfc61ki8lzlcsauhppd671jd2f9yumhi0hewdrxw0j757t7yc8rn6rlb9xh1sd9wb03wnwfbg6pjq5wf77qptx7t2pxvtr4vthlnkehg0ahojptak04l0hbxrmz8bg202ht8pmxqs1c182l9vgco4bqemtczneud8ljxt2w68kq0msu9qp0zdno755tv5ftef51lfbmuwoekymrynl149qmeggruo0js5iezyc9c8u6w66fsyqx4mugywyf2glxw022xpg1oiyzfewzyfrxhf9m5gd8axg780wckvrsjh9shxkwred4jqcgxt2m9winpcm4t6vm9hgrggaway7o2ytgoux9fn1xnnoyc515vkqj9hiikjeh2rcfxa4m8d1mk98145uxtta89p7aswzx7kuomsqfddwelmt8anh10yosigwpspf3r8y5gll751cs1560qn64v5v1vdx2hbc37a5o9bhvxebgckq1olzpq3zjbh4rex0c6r23s68uxfnmvj7h2krrwr89hwr6uyrx9hv97w2zkt4xyrinwgstux7ncr390cr5i1qyu03j48wjlmnf256rqx53kkpanbn9kqn13rf1zgjlubbmm266d225e9xsbi9ogl5tkz2z6a3y7j0pv8f1fx47v5vl',
                        fileSchema: 'r9m44lia9pqpsava5nmy4kbgondyt5v23i1vc0sfhv7qc7lzorfkjlh28yirs9ngj8nzdtisqvasfish0s8wle50i2oq6je7zcig7d1j3wrvo6hsh3czit8gk983ay4vvoea57lacqqxhf6nrl4mxcgqhq1romkyriubhvvmnjq4fq1stfe55443f6w6zckovpskds0wqxwifg8s3xgjqh2afxhp46md82k5b7nt8btuvr27hsv2ywo3lqp99w67vraf3k5pwdbm7wuoqtdiwqxhcrdjd1v818culrp678ika0g3rbi84r8hssbu8ya2kv58r7t1l0907f4vm3hw3t0uobgt4lx3ocrksa5hvfhpdr765z7siy4g9k68cfx4wt6osdtyu2h5osvxuo81ouwx0k16zmdmb43hrv2xhuee4y5vv9ekjzk7khi4dahh5v0zbovwexth69l6ssx8n4zbkifhgnh04v64sc95ptzabyrobh8gefx35b0wyskk5p0qkr65o9gr3mzpfiqkrhmk6wjrvmiddr9a5jeca107vpngtts4kwnbtbudwehcbehzjku0aq2nrspbybdw6naqd4kdjg4mn38tl0vo8kcm4zmm8g5ic3yvadj3kfrgujq0b2qswa1d0msi8nkzakzfvysarajjclguf039hnki0jou5rqq9juqhg9c7t988qs1vi8tc76o4j2zgxpjunpec0btorw9vb2lbql17ceo3s0xlfvujf6m63krxdko44jkqeq66by9b4kd34wuc4ha2tc77ku0vty2jwg57if4vckob96kz8zt98rc3xt5gpowe1546nj9108bd1n9t0l0xesl0zgprzhic7ysxnnv4w3p2peyae9yxf4sl8g6efkcokoxhzlhb34upsnxmhoa0g6azlxzqw7eq00pmlzpj9dpcy3e64f8dqwbryqnm224grr47h9d4m9j6yesfzm6c4ljp7supmk4dnhcbe19ntes74n5d28g65u5fo98',
                        proxyHost: 'wj7jr4jw90xtuwjsnd9pjp5k3d6jvxvd0qvhc8jtcuykbwabkg5jlu93kp9s',
                        proxyPort: 9159653614,
                        destination: 'y25uo3h35lq2ait1h98yb1prgd1ied157qmxonyqppjldivr8bdh3hvvijy58ztlzoxujphyepuyuvfidz9g1sxowho7jvq886e1r4ak2ci8mrvwjop34z3nt6a1qmkv9o5riijol65bf2mz6xn79xjmk1h7moti',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: '9zfyerd2bsap7m0l3d25ogkhb35lz3hhredy1c77rpz4vpw528850r3urxaiomixy0s8jcj9w39xltlfmxrn14ikiewlnop2ooyow4ua003arhb92endgp12lacxb61l31cvkubzddcc5fkm3v08ty2ecv3hz79j',
                        responsibleUserAccountName: 'ndbpov1ssdnkyx9fh7iy',
                        lastChangeUserAccount: 's51r6rux92e5i9v1mavp',
                        lastChangedAt: '2020-10-14 12:39:43',
                        riInterfaceName: 'py6ulni7bzq2yajaarhod2cmlqrxp0utrl8twqvfehf0jxfm6trkox1gny21hqho5src1vohlo7urm6gn7pu6sn3neqtn11pw46fang55t8ipawd4tph8loa0wirc9bsr001svv77disnq6eyld2fl4wd3kojrdu',
                        riInterfaceNamespace: '3oneb1fsgzuida2unxx14lmegr4lxhb28n12ifq2uzhvvu4m0vai7qisgyqs540xbtjl1dyq3cqcckddnzuln40suxjseflnmq86d3pfhkzjqpa7g1pab9x63740pgz2rai4xbrterqxyitihar9d86co7ls2s3k',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateChannel.id).toStrictEqual('f05a1557-8577-464d-94e0-93e3f7d2c056');
            });
    });

    test(`/GraphQL cciDeleteChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'aa653c87-019d-4ba8-acff-e322ee963ae4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteChannelById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f05a1557-8577-464d-94e0-93e3f7d2c056'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteChannelById.id).toStrictEqual('f05a1557-8577-464d-94e0-93e3f7d2c056');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});