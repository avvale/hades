import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentRepository } from '@hades/admin/attachment/domain/attachment.repository';
import { MockAttachmentRepository } from '@hades/admin/attachment/infrastructure/mock/mock-attachment.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('attachment', () =>
{
    let app: INestApplication;
    let repository: MockAttachmentRepository;

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
            .overrideProvider(IAttachmentRepository)
            .useClass(MockAttachmentRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAttachmentRepository>module.get<IAttachmentRepository>(IAttachmentRepository);

        await app.init();
    });

    test(`/REST:POST admin/attachment - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: null,
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'n0k9w6z6bm5nd58ujp9m8bq8evnv5cbtvr53dgao8xztqya4oqcyf1zd0xaxrf915h41hrf1dp6',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 307414,
                alt: 'h6iajcp25mfsm6mzwb7rl8jcootdjrlsvmyl1k5ndifzk6h83s39suevrcqeu04enm6qzjfpjxckqmh1j5kpl0x0kp7tw5m7f6n03kp1vilj2gjuuw64b36eg8uztoj6ai8adcwoervil2sdcel5c29mvq9c6kpkly0jo4u6e64poemgoukoh6vjdju8gshxwsymif4248osi7zs8mxjmf2whwginrzlduxwfuo916v250nbh6kwxie3utrmjrg',
                title: 'v5lmtnxrng0bu5ru4z5xqfiez4l5495tp80hrd1kon4mk13epa9ibuzf7gtd3sd7ukogxcg4svkkktro5n5w2e6cdverqnv30mwm3tx1btrijryo56kmk44hxdmfjl2h6oaunnmw7k0urrg2wiwdg9mwg7kj8m00zo8dzyhr1th6p025o23ad7c0ji639bvlzjziwiup78sak2auj6iupxuslc9nzw0qahe4qjyngmcmnutocwtpp37f1kl8ks4',
                description: 'Ad autem corrupti nihil. Fugiat dignissimos eaque dolor magnam nam vero velit rerum sed. Debitis eum mollitia et et officiis ut. Enim sint eum et officia culpa. Officiis minima sapiente consequatur id.',
                excerpt: 'Quis itaque dolores explicabo sequi et labore ab. Ut odio qui illum amet beatae. Dolores ad sit ut enim rerum perferendis.',
                name: 'vyb9g8gtdgzwexe39zjde4qd0wmwkxepd7l5tlk7h65z9tyjpimxqrtoxrr7sw1wot4o9ux6h8tye8xncfkplv4yauheo19r5gs5r146qyr956rjxt7chovhk19vr41oa2q4lhuzm3uo40zszzj5x0trxec7ssbdb23g1ftxsequwzjbxmpgvah50bek54i3yqptgh3ysz42sdtqz6jhhmorrx204kaktfhqjvr62fz3gwv0b3n57gmaa69qljw',
                pathname: 'oc1ctka28619929ghqu519q84c6ahbpry5oqc3fonz4m6ex3llb053maq4bpew8pq9vs4eg2lao7lmu9ptckt6x398g33joeboy17tihbdj0nrm8oevpwt8dtzwmj43j6ygpzw85hmqvkhrw9k5pi5flbsuajysjzzx7q4gnalje6bmrs0r3pwf6c8xg2a2kqg0gwod18l2gi9se2dgtaz1iiij6rru75o1s0qj5yh2hytfr69atmo86coh8yn8i9iex0prl0d0dm6v3tjbvbldb50qe1ibqzutlo3fr5yc29sy89w5emvpw4qsnyyrj1daww52sglhbpy6xrr7ute67pb6lg0of59bgutgio0qp5o1uqck7n13til7jfwkc9bgt2kgnuhpay7osqtnyf9mubug1prmptsmo61wg9z3swk5om8ajeewkuhcp1un713rai8m87nxyhjso5b77l2acrp479734rau8p1d2kcbk8ig8owupg15cmgiqsvoolbob3u8e5k4zu6sjes4x9w86ljercdiej3qymdopb9lamdmq141oss1qpbx1kbw2onz8woowmvhb0eq7pvcuwr2uhfbtwy3sieqm2krq2by9b1r62h9o11wv0w4n9fkdrygno7tpp0bpyvu74v044b3gdhvxfiaih37oh26itv0v8vz3d0j2bgri47guaphfczw4k7pild9fsl4vapfo41uqdys1vb8qbo76t9ypag5cbopbekap5x8qk5qcayfcgwbwpdigfw7k3d7d3fwdrrl3p3bvlzd0ci10rmu0n04p1h10em4qetu5t6xxrpjh15uh5hc8oxoan42s25jc8kyafdfmwkxfckq65i84s4lqa6k1ilx2bitgr6z8veh6lv8bt3rle237by282ykpezoo8hppi8v0zz4pa1fo1h1zhgie12nfqyblqlxuzjeb1w6x49k0m539q6bqqrbclhrw1r6ehsl10k2lrvnjn4fohmy5rwerj4ymg3m1fabs',
                filename: 'j3fs5vzq5jqrs53v4oriobu9ohznz94oc9ls809zqjb2lwmxnyiwotp9qo7un1tbi31rh3zxvm68rhy5l530662rok31a2jd3l47hnzhuzajjxzzcnyabkxykvqgwmy68smmhi2khkfqn8hc5vbrgx6srgtphn204zw0sksckmpeqqfao84nsoxnm1jlbn7bovdk5wljwrc7lmas35hy8x33rrna2v2rlx5xqssc6t3errp2pixru5yig5ts03n',
                url: 'nn4q624q7psr7hdz28js2axl9eap7s13lwmsslahig03in0693kwp5ipubhmrgzuft467sm7qppl94qgpap8lqw3lqp3adooedp96twwzt0k3p3yqs4hjbuatq37fkextxynyyhk98avnchtjva9ogck5jf12an8aoona6j1qcvmch5ek3o1l3ck50iw88ae2n2eweeenx4s5c964a810pgufpf65fxhkchewnf90pifff4ql5yeuozqocvwtngpszgxt37cg3mlyk46oqqanayruqcrml0j59wg5fl9opihogpxyk1r4r58b5yos6m7s1nz093dq5dw7uwv44n5h3fmisq6u63uc2cs82k420cu55wjrjjrbdyaputothicnh8p5na0r9fu0hhzso6qyl90l5ivgvz4kvwin33a09d9wj17cgchlgz91wdqx89cpvndas0e4dsc5qxoblcq1ygngrn8fbwpdavg8qwho5mnekavdbfl4r4tu3mt2u9m5lh4e36mrpromqgtlaezeu4h8yu0dbdbbkxwzuxqdjmawyeas49c1py2iofh4n3ur0e0v8we44lsmspn366skn9jrys3y0clxfcjr7r8psf2ywsyyktq0l4zc689qrlpjp1sgbwk29q7zfmv9hvvmgakprfdcdvrptllsnqdu648ramma9t8h9hyo31erefp6xjx56b54znsnkbat08joyxek9orw1ifik71u5bsn7xvzreaarz21zvy2i0t2i5wwpadc76rpq4kmm2476cnumg00rdjvvk99cb278fl1qdur5yi4bfgsdepczfsge1bli0g7fxg4045b5wldsiao68evhe6w2ks26g670pzt8c6nsm2jl4rq1amwzkk1p8nqha6osigd10x2joht7u6c5t4x1g6zfoszbu45qwkyg232bnmxhlvlvuy412ka2wp6g4e2kfvxopdbm4hlzxef2p969s85z0zzppc9ult2811ck1en6vzn8vloocfh64x',
                mime: 'qcj48bnlepy12ehbgpyb1wir90c2iswn9p76ncb4jn8j6d3k11',
                extension: 'vg33p3e775n4wqgs73ht3fhne3qw30c6qpxvi9nfvp4qhj4z1g',
                size: 8709763505,
                width: 368273,
                height: 577857,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'niu40fosg52ht0v2rk90i5fk8fu57kqb1v50nl2t0osh52c91kfv3t4gu6djh2nksqu2lmvvs4srwt73ccd1oi1zz1lveo88nsn1bosx9ewvj58nxl4sw1ugqv35ezzfatm57w4czcgfg7asf8t2ko2voaxohw75pxnl203wvzrlgrawrmo3s55tymly15nypsw8d86ig4mj5b52ulbk1zs0pkqo1ttz0ptxcj852hrdsiuk1jyonds1ha8lz5s',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'vzl824q3t7fuj5s9lfi05pc3vmy1e7o83wv7mt0dkg3afgje84fxmetdknnd96zgaxy7fqv8dui',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 561735,
                alt: 'om930nwqar6mfaz1mgma5m3yfmp41e7o1qqtxc38t6eqd0sxhp51bae1o4fmurpyl5vkj989clbctmmsx7h4wswtfydigz3q5n0tspv2ppmewqokhxqu41yiwbh1tw1l21emrup9s005odvpvt729hr1s82vjdj7cfl5fjjqt872n6zqxh65leoqumhajmpml1p6agcgdqxlk5pokagwypi9ee6ou6pihi2s2ge138um49qujou350h83w5rpwg',
                title: '4rm0z5moko9cebziq7z05tipay6ee2mv9pl7vemsjanw9y93al486lsjrznp5s8k4z05s0rqql6wttsr2lrskduzllcxw5o07ar5vt3bolfdp887wkz8r5sjxoydquni6u1c23rjc1gmwrvpvtu3s43wou6wuyjwi28b289jzlp3s90qilumkc0p0kj4ir7adjxf217elm3v4lnlcf4sylrs3h1s263k4nyk86bn9gmnkju01s71v3nxci62fmr',
                description: 'Omnis fuga sapiente. Architecto doloribus minima quod possimus qui aliquam. Exercitationem itaque dolores fugit aspernatur doloremque deserunt dolores impedit minus. Quia sint quos quos ut voluptatem odit aut quis sequi. Sit vel dicta earum ut excepturi quod laborum.',
                excerpt: 'Modi odio debitis quis recusandae temporibus dolorem et dolores distinctio. Laudantium magni eum sunt. Quas accusamus quidem id quisquam nobis fugiat incidunt.',
                name: 'ydourn997u5l31z3w5iliws4lhh7n8fk41vpayr5qegnsc942gwufzimhdy5oqt55f5ea6ivf44tzfog9anpr2yqthsq70wl5jqstbbvl1mibfc6se1p63tnyzq06qc0k7i2bhvownl9ultgmod85j4n5dgwkbathuy3348qybefhzgupobkfy3j94h6vgrxhbi74udntxlfq83m0w2rfasz3nj5kw6q2di002redz5frq6y3suivpxlkpwtrqy',
                pathname: '5tklaovnwlamyshrzfqy06w38bq6o8memxc78rx7t4m5ivk0ydcxm41v0l0a0mfswte6nb2pocj83o4ehkwswwiqp2tx2ear2mhc70eiw0fmxwhi2ck2plfua7y2cos724vvf34ww91hua7yfsf2shiwdqs1hymimboob3c33jopini3fdendap8rpr124h27omofu3wvt9cbmjtumcgrwfz7mufe1y0ba1qclqll9tvql2xal3x0pa6fo8wswdgn6chan514di04tch2v50ydqf80xl5gf2q63tigg8fp4hqlhe9azzbzd7im7w3yb6g3791oc1xcf9f30kesecr1hr6fo9hesi7csa6zqy2n5ldzzr5bjjeabntdlmpc50ti2kscxdoti6g4sem2cxn9iwb7jwmslgu6eocyhb3xfzwjgztsdre1ig6oasru6ku0cfkehde4v89cefidrj5ca7csx4s8eiykzh3nwrsxjzxmpwzsnen6z7x46agvh3dda6us70mjclgkaum63e7bvqy6vmvsmgllt73iblpvwfuuz9idb4s50hf1hxlkh7t52xqcctp7w76b6rxdjtbcpzgl21u04n4ifkleyemm5fqgujnbdixxop7q6j94y7b50up5pixp6ch54h6gy4xfez1bmw7ka7tjy4sngbo5d6s5726fzm7ne6bw09hz0mvcyhqgmsnzqmcg39n7ozjp1zqn7orp6v431e6ykmkpdypohw6pmpkufiicr6zv0aq162hnewb5l3ekjxcz4f2rz09j9k0odjyzzaftalojfred0vonh4o2pvftjjyav4eyfzr2yy5y5tjmzycx7axcl2qrcn7njy6mfegyddwrm7ur501z3zx88m90vvdt9yinr4soak0hhk6xb63xbek1s1qccy0txni4qamx2qcx006gz95xisu68vw63o9mcihnsx8n8grvr9cpgvj8xf2e26b1nlqnrxv9yacwjg7u5i4x1lje0smh94wc9ugmbl',
                filename: 'unawgvy9yrbfllqoaoy1nbajikgdvmm5626vr6pic50qmf61v48bi1ljf3kk8nr85vyb5kbguhn6h31dwi69uzttrjt0avcov8sha23edknmcahg6i2xqyfhkml1qquetbt2l39pvhq0a10x3mz9x0dcgimwhybhhguvg136tebk8fijajxuar6a06vqmt91q8ljfwfd7dikpkvujorc0603xw4yeq6qr5habuov7b0clbwny8tumkl0ifp0awa',
                url: '3xwh6w76y8gcd6zvs3jkovoqmfh53xf1xpxyqkizapvi4lgngqjbo6mvjuw5crs7iz4yf0y6jrnz39o8n2gbbsl4lg6hxcjlso2l41df8pl0n8owg4p7oo4f669913vapebex8ww246dign0r0r932nqppq8s2vyj4uivngehcr9scsngdf9kb3izl6fhroalxwjlacug4r671stwfdd7syrzrmsatpfs9q3xl2kjyggk83at0n9s236jf9jbjx3j1cgxv5e5mhk95w1v70tmwqkkv2jvd28cad3anuyx46gdl0lrx99sr9dlabztgg2ejqbrmicwknjnfn5fi3427fk11o11seb1frddpogdkox7sd5qqxezhc2c4dg2voynioqgjuiwu5jqdgf6bxdo1dvsi6gu986jwmgc8vigq1l0iqthwr6brf7lj18toszt8tu8yy9uctxx5bd3esg5byql9b88im5m3zom57x2a83i6lwk05tvz1x3kg9l80uwon7p628h9te4scoikpqqra8f6rw5iqs5h7d8hgd5a5jdvxrbed1ogvzxyh55j2w0z0iw8jm6n00053qiwf3ldjkq4igmvprzutd0z3o1mhr07s790bv779lq99j11bvavxewxhxn5rzs0ktrjmx21ds4mcloo43r1gltni9nxg9nynkfmk8ihtipp2uvn5nxkqb0zcpwq4gmy79uch6e604vms0pii4gphxgwzagvfbc5l60djgyatuockgr6zhyrty9xjt75op87k241rhv4ly7tc4haefq8177fsaobmagmbc0oc3yusmm95id5pv7cpksrtn4simgwk3fnt6js8f7eo678pu02jl405k9tmhx8gtfbssgxaxj24s7w37ahl1l8gzexthrefld9dq4xhhvjbt5ffzsmjd0eggpj8b7pv65f3gd42olxh01lftj8faxqys5bktb691a9c4vhi23rfkrsygoi80kwnhs0cm2s2l3vjhvv1exq0b25yr',
                mime: 'i2n18qeu2otq98ml06m8j5e0hhkvjgnppm2r9445e8zuys3n8h',
                extension: 'oki879jegkhve7xblrfzgg5z9zz3mayi9khk6czb4vhkfs189n',
                size: 4474291515,
                width: 148779,
                height: 792803,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'o7n4akc84v0002jeilq4j9essyy8ciuqi3l9h2ghnvsgmtklspqhta6oijqs687vi4s774m9oh0xecvvdigf5q1k4f1siv5x1vvho1a6wxf8hnrzdnqg782g3lilg7ti5ggfy6yq0obxbgnl99o1rzjznw4ky1kxyvacxis8rtbhpb5dm558wgabjcz1rpkp8k20jslvbhn8qxtkqnbrzs8tzaoyq5q4dpidwhvndk87cdruykm1ofx2cabklgm',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: null,
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'uro3m2cn6o6077oj4h2hxqaw2fcm87mkq3oim62zdxsf8xki68pqcdffur5nmcpqleotqloba29',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 339815,
                alt: 'nx5bflsuk307g3t5lve705hel5v6g32wpd89tfnyxic6pug88sh786a4u23w62lj0pnbs8o9wfy7wi1x6gvn4puf7gbcperu0uevlz55ngvcp8rufnbu68nwxxaetbt4xyz1twyykcxuy3xwcexor3nlpweovt2740lsher78ilqfhczjcpl8pdg8mix66n1lp3zqn8vytrgkjvbeul5w24250q0nh9nxahtr7arlfwuh2q5jphw3cmcliwyn5e',
                title: 'u7a1ig2bzlx0h3cn7y4j2qer1nazyyltq9rj5iksqfhnqqq5uuznmwylvve8kedolu8n11nisqehhthqtbddwvhj2dr6gtvj24wiaouk5flhqv1suveius9chtu9ctz2eroazdwj0wh3erwrcsm1ayzeveslxe9oab9j8aatdgelsa622dhskw3ma3pwywqgo96rtwgcuwx1mbn8rh01t7tl6m8b7ckzhxjs2ph63cd5ffn24baxznjv1oiu7y0',
                description: 'Ullam nesciunt nulla unde sed aut iste velit architecto accusantium. Sed voluptas dolorem minima hic laboriosam sunt rerum perferendis. Quo omnis aut magni neque officiis dolores.',
                excerpt: 'Atque aut aut odio aut. Accusamus delectus aut doloremque exercitationem et ut. Iure dolor distinctio quas consequatur. Autem natus voluptatibus maxime perferendis explicabo molestias in itaque. Sed enim voluptatem perferendis dolores molestiae.',
                name: 'flaeenye8i05sadh7qdvem64vcnlsgyft9us1pffnm15bk16y3fjs9yzukwgayfjv4znsc6661b8bjelv8sh5t9fhmo9w4l5p6ssphkcu37x72f2d4nri16kzqwo4cfma1a5qnsd30vfjpjif3bnrjqebyh3f9qzz3u34nrl2fgz96gdyxlr7rupbugefmjljpkf4djb4pefs3t7i8iazcape6klybaqvjunfetl8dsd11i1bc94y4q7nlwi4ab',
                pathname: 'q22gjek7880jxmrtaqezzux2cah4ry86ubzot7qsfomztwiz1i9aeepurts130fnw996ktrftx9luen73mpdgcx17jpnxaxm24f5dlebfcklciegyt9kkj2kuf16x8sjh11vviblmy1jqktxn6nwj3grixmm8ohgxm9fv28qcv0l6uakqsgrgkpscyrqsui2lz8nz2fzhqm3bp8igzts575d9k6ypuejg9yeh6bzqiybx7e2fl014g0s84m6jl3s3x9m03y9jglh3rqc9rslhjk4kqsop3ht3fhgk213ko261fpr5282a6d3vxk56ftepz8y14c15vdch6w30dbcs6vcv2bxj9136rdew0gwi14j4nya3vc9nejszymjmtx5awxftp3rjhb0ajiqg2kmg5hgguztt2kwr2km6niwwrbu7us95rqqux8zydm975k174ltad52h0v0ui7x4mquvtz82g2h78tli2sm969p6ty60rpr98rftng0k83iyzyaj27eifc5k0hcbe51izbzi1wi1x36h363vtotx8v60jnmgps18rtu1jem3bpkfs4gc8x7q10yvehorcc05artmfwdjhyazzwxnz7el3axipclx6h4be5daatoc1a0emygjutrxn60o8flwrh85s87k1q5oydxup0gkzfwdszfbffw91grydveqiu9joalnj5vg8h6lr5ola4al1hsrbjw3wrec43jgkl11qubas6dbzzumcmpdxkp6s4qcklbg0xler6luv0yz50l5zmiupjxdeui72trkydhxm3fvkn4hs4drw8ns30nj4q4vpp1k5mdd7h85xuwpz3746n7rjf25yagwv3pq4hpv8tkz670yjcvgjajd6vxyt9y5vs1dz0649833azzr6o41c5zexlp76tzl6qoixk4cq9h3ayxi15x0w4zk3zejl5a0o93xcc06ig46wlhfa5d3sdj393oolv14pmgijtj2xruzl96lmwn0xzqeqtydc7fmevweb9f',
                filename: 'ce7oz7oth7ou0xg7ji2vb6plvhu162rzq00v7xnunvxbjwfzomglzq6sniemnrrqyyg3mpbszhhl449w6z1zdgm1gx2b5dqofzrt9q17d965owdjot82yh9gyewe3bqkjiuiiqgydes9if19awh51xe96li9cjqtgv4kl9di5cnkrjesc89a3e0qi0oair2qbq0iuh5o90fyt6ow8a82wnsc5o0r2xcm00fxj9fbrda88vuncetsbq1g7qiltli',
                url: 'srh95oqbqlegkbs2q8rrx2pvxtho4mn3oi8w40i37g31dq8krvosratmgpotvl3j2f9lmi8hndjev9ke1xa8addc81pprkgmcw0wcrl7xzdz198ht08kgfwj5db1al61syo5lcckcpctfjqmt2vk3hk558sg26185qdosz7xtbqxi9gn35isljxi6mkhfsl0gnvzyssmzvkgpb5rgziv5yv43am3gypgasevh1szd5twwdte6izoea66l8p8qv8mrf8jbgv7lcrux0b2kvhihxtzk609peacjb50tovzq4u8a3mmewxedn6khxvs5wjfs8m0silpjvn2fdd30px5th5rjuepht7vqphoda0ec92r81mli1ict50a05d9dcee2pkd9esx96q6fcotgk9dtb2q9axwpnq62a4d2lgrjnzytvptfh9a6pupovtvl4c6q9oa51ac7jig68sk86lmrgbee5ohevy3scgwkh0eu0azopft6b4glxb93c5i2igjcoqmj1bmrgu9x6fpidhkaxqidgje96zwk6u5fdwmg55pxkr40oixcj2gv8qc8zrc02q2b9uklx221eiv0yjebygj0vxyf9ziu5l5micg0kvutcr7gozzgmg2aoym69o8fr2bobg4byx7kx13vihkomsp8qlto66tnj1emoenwiatky3r89p9rhkodw5x36cdnlnrhql1l8iuxn9n6one07v0sahchcav81oxekp8aw9dymbfufsbphhjoddmbke5j8sboptl1cob7gwa6cfiogjupaur03l30jhimabsb5ryzgr7zm56utdcf07o1vdzpy16iieoj3l40jqw9dhm0k92bqs7e77sh6ynjrab6vavdsli98482g38mgvjdxgibad03xvksf2mgv6kn4kcqz7yomer8mspjxrm05cm20xul4j1sk0ccxt0ezuol88bzeguxdix2nxg3igke7iznbs6gzq7rk4w38xhb4bhw0l5x1t9iyhe8bn7xz3dlgt5',
                mime: 'zwolw41744etj5yewfjfm4o5htfz3vdn6omlcvg3nl1l6aw5r1',
                extension: 'k7a3b6sbu91gg4llfsjr9sohkxc5z2e5juez25posxu8cqqcwj',
                size: 7856377759,
                width: 211462,
                height: 215464,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'wfrti4sc97wwpc6vvdes6clurcj74hxzpntoi38u9ist66tqugv06ncldg9rme52uu502vbxxcv7v0tpv4cl7tibk9abqpfce342g9bhigdomwydb1rk9nzfx7vjjor7zkv9tg2vvy4dfbdqj7gvk9exkilchmei9v0ehkxmi355jqritnrgcu1glndmn3i6jw3fuk4n7xalw9uiff1wuvlhbjq6e57rcofmp1lmu2bruwfz3dtf0lddcqjkzpk',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'suv4t9r2c4u4mp9xoxm2ieriz2pjrgt1ri028m8efqemb4b82dnnnn3g5us6t3y7yc1nip2cpch',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 398593,
                alt: 'mbqv48l15v3o7yptv46j7wssq7w9pcta9dvebyy07oqt5bey0tbyx8sgdk4ry3br1wqs9bsprt6ydajqo60p5yzhrxd70cauma23ul0tat8w099ctsfzwzbzw8igs1695dkz40n7j1j6bw1xxvs417ochzda8964l4zfcfryq5ifm35yvcmq4vdxgr07y4ucff923qz73huvhveljh9sj8mb8k9t2mxaz06007auxhmedpo5a9k46b2avvfynoe',
                title: '80o8m0evbl8sypxf4xnd5bi6zr7x3bbgoagpqim7o8zxgiu9qr2r5qcfqw5yxqidcmwdauts0bsejo65956ocheaxxltc9yida6278yg93hnmeui5txdckl64h1zrhoq0ru4pam898cnychi2gbmbueyyh4z7x5mldgpi1ksf3hyn3zsn1206wn7kjvx9yvhzsix126yzsvc3tn4tq0dcpkzutzmjtecujel4gvkv3lp93g2ke2mcy2jdjdv2sp',
                description: 'Sequi voluptatibus iure omnis nihil provident est et nulla. Ut qui mollitia laboriosam quos. Voluptatibus odit magnam.',
                excerpt: 'Amet ea quaerat in facilis fugit. Sunt dolor aut velit pariatur omnis perferendis magnam. Delectus cupiditate qui impedit nostrum ut qui voluptatem facilis quo. Laborum beatae beatae cupiditate laborum reprehenderit omnis eos repellendus.',
                name: 'rsix603rnhs4vg9rljhs1e89yukjtpmkordgz07eyipfuoj8dimyo8i98e1bjohsrp2ce20jci19vczkch70c7o5p9h4ox9nzjwq69s1vhkztyjmlotkk6b9kfvjqdzn8eavyl3les63lw8bgenjvyuyarpyax348wdcj62tctd9y84f7xe8yepgv5ik1ud9c1zwhbznvvgalgczbx6hdndy8jcrts3z36f9kvdbg1vz1f4zi71vd5mp046nwdl',
                pathname: 'gplu98e0g5c0c8jxxsq9sm3govvh62nfmque3m4hnfgb577q8rkq66py7rttr0xrpa8kp4onb660tvuaa34hxzpjkv08mke8swdhqlthhegax3dhkwr13yjiwx6wpd15rk28uwy3zq6ui4bilkjc620fce5eg21b6fgu9kk9l8kx2x5izbburvnbhq3bziekqu4nkpujn95bmcdbn7axqu94ooyksgiv1wzxgq0kssxptxvuv67izq8z1f3lz7mz0isgff6ozlxfqo41siye4lbk7tbwwjcd0qpu3we45llhtwejii71mfjx1vegho8o1vmjg5nv04bjtuj5qswfoks4vluoqrfepsd3ktwgr7rk2voep5kbn94919c9ujd8tmhvkg55wef30hzdoh7bqnkkppxonnp64rwtpumsn2u1660x882d8wjx9laou4wbnk9mkfsqqtscgqsi3wh1yo9apmjvscgc35b2lqrwaa6d4r9dqdoqzi39c681egsh3qoqfyuvr459i36xg5e1hsx3422p2rmy4gw5pnc4rcpgqfdo7t4v04i6ism1466gi9uue66ql5ybjdiasq6hmxf2ikl2u1tep7x2jkc90155jqo66rs9qkmcx1syh6z10dtcdrhymytvtfbx4sn79r0n236judujji1vtnih9scidgcc4tql9k2z4jkf9ys5wz2p90lzxhqyz9fkpr2j04yfrpd5bxojqjzvm87gbxb4lrzwtwgcumolfcinerv7sblannci96vl6v7o70n43f9lic80w0qc23arp6h9bjdkke71ti7bsx1m841xwu48jmbpvkoh54k0tv65pnbyj95hqgvw1j23fu7fyk4hmxoiqqx8ke352fqnsdy9h175lfohd8121i1ri0f8vz54tqmu2riy7m83o3y551mumc3spuc8ir19dbt78d8eq2q8xxzuwh7y5xgtflcsnjlebr90lavw1ph1otad95m8zlic208dy9wfqt5i471ss47y',
                filename: '4cn1e8pas259uchfmslbmramvxuoikjwj70le8unfon37e86az6mdo33guktnpmz5c2v6n9c4jl8w5m2d2amsk0u3kanuxooh442j3ya4ygd2abzklaws9qy6k0gi5xs9dk3ianqbym65qfldcc06h0llqvmewm742uol63xevlan7orv5tvued2w77q6uw3cn5th5uaghhiabz1840vryvhy87bghmzsxgcm768a8ologi7oqosurk63kc0180',
                url: 'iusq1sizlvbzfi4parhns2d3clm7qdym6xamq6375lb55r8rrxf2brsoidzo9sxoufotb2pxc9occhtxhe5pf5ipo3q9mnfojgr1w8uy5bffyzudn6bri8h2bybzcun6vo565vm5dfp0bd39ocvur1frwj9fzrt0yhsxou14l9j71pcgd313aqswutr0fnp0hsdjy9eurp79ihwd0se4yzbnttl24ofm8rxtvxvqlu204afurjcy1pgi407b9ky5a54a1sujqbzshod90e0aexqv4clybi3b6rpebi0i7g43dhjl7d87jft7rbdwaoqjhlxob1pwt4xbhsfdtuf6hcydjh5amwkcpwklis69fj37nmw2d3uq1lyc6rw24uw0tk91rpp35u4m9ti37yhtc6t3y4xkigz9m6l3eg6j2h8wu34p88wzj8l7rjce8lxc48qe6hlw10zgcl84mwi6vhoehwq16ucc7yed0k0isyoh26zan23i2tcjuyyh9rq4cv8qq6pwprcn3etn9qh7wgydzih3jbwhjzs0qd6xjghjnuwsg787101krlpz0g5sow4ytcj23lsj1siafb80xw5f3ufmz26nd9w9ujzehuq8az8v2gnwq9rx1ntrd0gakvbvdw4z21zip5in9uq2g0u8w7e437hz34e65yuqzqod36rvrxyarx75td34kg2ukkpkwquzow3z20h5kd8p4nyuk01htln1e109f51v9mzmbruyed0eenopoj0cl7nlybkoqievhky3vx5jo81at64z31k7bj1tnp1g34j7rw5lzf5tgpfyokmurzud86numgcygvd8lur2h1djfrq4jp4gk6z6cl73yc8lq97l2aabvsd4ps42vllnp11kxhfxxjfju4vy3pm0ym1mx282o2vt27q9mbcwtpvsllbuz4gnqu0n2y3o79fdfqcfw9rs3zdwdfj9fqm075219o6c6q66nu6cxzpgpyls0lois0auiptgihx5c248xy1e6w29',
                mime: '0zwkcmb504dqsnfruzu5gk04i7q6u8kk3kzmm9gfldtfw3wub2',
                extension: 's38crilqal14umhd3ex5xafpj10jp42sl2s7nb46zcbk6yq0f0',
                size: 8834336281,
                width: 422403,
                height: 774024,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'nu7sl9el5nbcihjp3vr1jimtc3i0un50pa3cshyjcm0t3mainv8wxu0oa9o9820v0no8h25kvqp587ehkv0a87yctn6q00hbfuygtbp2chio5tporg7tqivjpqkfjgv8r0l7mmlijzofdc069384u8ohzu66k5zrrkt2rw57i90qjhbx7dfvlwhgb2wya47na0n6f6uj78ilea9nmc9zzahwslzdv2v6ulaefnfekluqt5bpplwmarmsobc0tka',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: null,
                attachableModel: 'rszuhouwu6e8ru8jbxzyc2kchhnngfbfdwfthiumkeczvfp1eplz17gmt0a96y3roxi07t30uym',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 551868,
                alt: '3x1kdvjv4p72ru2jmwnw3mrn29ch5vbrbp1r7ybjc1een824vmckz024qaqsl3fl9xqr50f3cogj4uzmhzqqiqg5u05ztjri9oonwshen7l35bpz1xwvltijkh4o9p6ud6voc06mtl0xbpbbdq9hq89ni2cbzc9fxfkdz5y1dcz82rp491d7gjgcm6qwkzh0jytb70nmwgqgt1h96o2ophhst0pvnlshk6u9wna2x6axu4rt5g4734a9rf4dmfk',
                title: 'pkhp47f2krblu4x7uvtfjmaeg6vrv7r7xlomlinwp71t2551suwyp5drsxuv0xgcvmu0i6bux7plcv1o62djs405v1afx02pst5wq57gxz1gefgvm1dx93s9fhn69mrtpzoeh8082rze0b9ww9kjd0zcid7uthnldpgomuh7yp0a649hs1wq0mucfzvxf0p0kbsrfxq667guz0z7pdlybvqhh3lqudf70kv4j1pk3spvvrslndtx56do8cbg8u4',
                description: 'Magni animi ullam adipisci pariatur explicabo aut et. Voluptates corrupti vero enim voluptatem quisquam. Ut ipsa et. Dicta qui sit laboriosam omnis.',
                excerpt: 'Nemo quasi sit officia tenetur asperiores delectus qui. Eos tempora rerum. Esse neque consequatur ipsam. Ullam magni atque et consequatur molestias explicabo. Excepturi sit iusto non laboriosam eum maxime rerum delectus.',
                name: '66hwuzby31o0xtgc8zxyalecw9nrwp3af26nha8kgv1eh3g6h8jey9uewyscpsttyii8olobreqha4p9w6p46mxiq4ihq9amv2a049ced8phpcjswpxvtk8h88xfa1vax2wq8w4vxdzhg82hk5p62ekytzklw65rqsbgighyru3ghhr6z358svurusmu6yf58oiffrxjk78vd0csk2ng1ssinxx7786k70qn9i5yjk9ca9zt9dobsvcmkdx267y',
                pathname: 'usmsugxsftnvmyjhogql9cdzmvqroa1d8gaz8mu83rirw3x532l2fi1cpzb9dzyklyfm8jwfbwkt8jnh1guoxf452mld3fu614ezv3d2brttvm90k647oxye5ycj958vpght8k53c4ee63wutrkafw9fmarese849fhf1ab3wihcmavdou3yibzi2edzayqbp75fxdoudgsf491i8tpgcptp74kok97ctfr4i3ywwpn0pbg1ahbiz7dpfc9h0f7zlywq59e7zo62wrdst66hbrguk2gei62jwbvdzzchyrgb7sh0un5ub3w1d8gs4vlzp98nrkh3coodcls8zaj4krkm0081qywm41ksi9pnyble5xy0ohw2yqmmgw7ywkbc8adfo01uku8jkwvtnwfhn66bxo42enva729ze6ga8wsjlga3cqhduisfx40kuj0kqtahxo8a1gvdm3991kmggaj8cbff6eb8xlqbv2j9xzi86o7t632rbycs1origojzfppd3yhvwd7b1agpw3un5x535s0x5xwlkxtbshyscjz5j8ph6liks5nluuvt2ua5663qsqyszbbfjjc19lopxrom8qlqyfxcsx3llm47if2pihgnsmmsvcktnyxttq859ejf2f0qx73nvldasc49ddodxhx7buzh4nk7f47a6nbe4d3kwagykec59nm257vnaok55jmtm2dyp3kebzm4ogy60zh39zdnsjah45kpqs618ujov2xp7busn80zvk1o642k20k7svla66htuzkwfxnsoms962snex15k3qzy2pi344n0ucdb7oaiyj9rg22lluieujfagkwfj4vn4ezv2z8lka1eybpvlbtqlktvy1z93c5vdozuclgd0k5v4045k6z5f21h2qcc5h6kf993gp1h2qxfetu5qjwa57zkvnozsx6sie0k6bqgmujhz5yb3hp4mygmpijkko7yydh7lviap89mp8ui28mcf2xwkcaptgixeusgtmqd0nwx7ie',
                filename: 'qcq728p0u5eqga6uvvzdpjpadwbx7u72v33pjk6ai0ioxjzgyzu0u4xoq4vhoac2h5d55svoe1fzfksw6zs62on1yypospbt8kricpxadevjkhv5htwc6x86v4q72o9rmpsqfgowsibey7hq4xn480et7lo6o8qicy70gykyxbt6fa3heia70gt1rdxl573ka5x4ei5b8uw755ihxvw2deptvbsnio93ei35ckk7scc87hc4grcgae3f2d7kx7w',
                url: 'vijjxbbptuporbaiyg0zwxnrneakej3e589b0a3hpxb77org6h2pbnzyp20xq329sahci8u7tdxfui9l87y6o9qzng6u9rgzvyhvdyf1jb3av6ofc1iy7qv3em9px088agj45pmp8urtl8gk4og42dx3nm6llgh2mql8eqv1p49wyymsfghji54tzk5t53gplwvjl19dtqb6air314r6ibtm2o84hks1ipcye55qyaj8br2xl6m2pzrirw6595k392api33kniwx9c4rd065b134ge28latzqv5gdtz8s3jzr5jb2dgir820nl199jp2w76rhv3e7008cwdcz9mlrr2deii8gwe5nb61ch22vaxt68mup0hseoc91dx5kgh682atzic0ypn9bxvnqblwib0mzq9a59sms0a8vght6gbihqe6dfjwb91lmup8020br1w6hufq7nsulss88xxo2bdg8f26vbj6vx45uc0yow5a3ja7ui0e29vfbseftv0zuxcyza1phrwf5ov1n2mpb4s5vslf41g2hbytglixyxnv6ol1xfn3tumng9tv0ln8mm6gbqkjkzefmhk6qsoqyedx1cvaiaynwv5pkdjbhb7s7wde4xeq5sfvuk1e3u3enkfuyxnneuiexvwdo0hvpwelx0rgrlp4r1th3c2v8vvrubrk6q8gjhecxvz5ddm8qbeaxwczgdfchz3e2682stn1m5n09v90yi1oqutr4yigmcxf41138p6t1pnurhd2yfaptnlj56x1su649at5rvap2v7sis83q87lhpxv2xnnmn3rzm0mzr1ga2jerruev3tnmvvu49957n94ikctcq45se6qxc9hzlmfpkww376g1n9h1tw6xtawcrytyru2tw8bhvx4q3mct0tymjfayi373dl03ji2eq7y1933c845tzh8wsh9cbim7i69k9ba49bfs37pbponx5nw0wb6tompnjdsxjibn3jdcvf6tlwjp4xbuu8noscf1076bk2o',
                mime: 'w7fewz99affnunorjbw2e4bcn0vy7irzn1ddagq6i446ogsi39',
                extension: '6so3i3eht4k6pq3phpuokte16x6w5pq6quc5s4s2zlnz76vvwj',
                size: 3450254238,
                width: 747555,
                height: 443758,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'pic1p2d83dg3bceo6633tz1destsiv6qk7hf86dowiri9jbkw29d8ijbt8l1d0yiarm2ohqw0b945n4q1plf3m72j1iuza6xwz2cnjr2x2zs74rdzy64baz0hzoynmqait27xu9s2odh4dlen2fosmh5sg06kgs49vjrh1n0s16zdh7ufjwj4zsf7hmlipx8tg5iujep3e360g8txwz55779qmgiqj670f31qn48ohi3gjsa7bkol5k0vg50xkr',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                
                attachableModel: 'kwm853t1y3rbde12ca9616zukgf8i6k7yne30e7igth7c5fykaei8dr775eavpi09ypo9e299sh',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 597665,
                alt: 'h7upzjpgxdv3a5e42te1qhuy5y4onie4rmjkj23kv6064indietxol392wb8x2k1ctu75pbojflmx046vyl1usqzai6w8xs6ta4zahp7z10cqvuyfhmh4818po4ibqng6r5yy5tjpc97eftk5wsy0mu6vd4km2v2rnxe0tup8c78k6p75rwtbwfdzpfwo2gk8fqzuoygqjxdbuqvg0132amskieb0sd5uihrawxa9zh0o54tkn316tw11ur12wz',
                title: 'p8x4do6h8z9h2w6akc9a64sm7gcslbolsfgtyficg8yzj07k6cr92fvoh1txt7wif97g4y5xk59rlp08zm7wpo0d9um9f12fbh3wrplwofk86neer35xzhd484tc7bs5msnh19j1rwpdmrz36sb2552lspw9o0ydm69a1jsan6ejwtzchf9vxk9tt007ehkde2658ehank9whjbddudczznnco8grn2kzxzrpz5ufvg72erafntc1pi3wywwp8p',
                description: 'Ut maiores consequatur quod ut odit sint. Rem ut nesciunt blanditiis accusantium. Ut aspernatur nemo nisi et illum. Animi quidem quod est eum vel. Quia aut ut ab deleniti sequi qui ut non.',
                excerpt: 'Voluptatum in sit. Pariatur temporibus dolor voluptatum et aut sit doloremque. Corporis unde impedit placeat repellat. Eligendi recusandae explicabo iste. Aliquid vitae facere sapiente sed cupiditate ut culpa nisi. Consequatur ratione corporis rerum ut iure fugit autem sapiente voluptas.',
                name: '7dr053znor3nerkd6apk17k859t8s6fwzodaw1mx8nlgadyt226hk0nvragmirp7z6tk1df838ercpe0kaozpd2kyml47ctsn77kw6ltfhnw90pavb4zr6xpxwn4bgoz5nzcq0fvlsm7su8i4ccnkm38nymvfuvef5ars116ani3fe3sshv7ug3jk7b659148cb7ptzn53gmt22hqjkawkndc5civ2nkil7r9o5exhe3eh0o24gpgvk4lpp2gl0',
                pathname: 'o39cwjriotv94zfbzyd348iutbxnsmqo39jcuc4eu7dmyud8ktaklbqu2974uu4j65q2qsv29t90h41311goncxqn8unldef0qkon8n57671gdofs1rc9hlq5d90aivqq8194xa09ebbvdpp2u32ouut736p0c4qtua0wkg69icoxfwja2p26vbu70reqa5csrvmlv4fbayt4n96vpm3t36mv6im5ezifxgnqlr3k46n0xps0niog7knxj5jv6l361cvduhi1r2iklpsujrcwk0wnx2qci6yvm57pfdvmpmjtluuebruzfwnooklrya7zyp0qfvm21tu695as7nd8ilx59za2scl29l676wvc1c1h0fywn09g1zju9c09tvxznh5mg67nmt2is4ztpf782s58b7tlghefjpvoskehc78zdblbx00fn3auq4hteh89ep9dxb88qgv2j1c6jvhh9ut9fls9u1drxktuhlp55dudwhk6xrtzud6sc11499xb9kzhmd0z4yfdv315w98yx26sppntyq2b0dga1pk4qay12uehnmu72ntkesf6kckyoooii6uq49fpoh4s56svs8lklf22lou9halhz0bseszobha40kagn3rvtsm9h7oqhs7alyt4hvf2gnafweeqosmog7w1hhopl13wb0r9d0rr7678bmo5fzxmbc5dlki3vf6cenmhoat6g7nczigrjrpd5uqnbmjtye4dlxnkqgp9h3yxytqaqz0ues17gnwl5evm936t619g0fn1044e33xj9drx53bzfgvfd0ftfz3idem9tbsryljot4nhbiexmmh0662wcd0j4h6ewzkdp6pnzxqbtzbatf8ckvswwdpk27nqlv46wjbwgty84f6zz7mdyxvqk3vm5fvwq414jryh3p31p4q1kgbnghiqe13hj27djph21a8oxi0pqk3ztiafkggcj8ksmgouudgh0yqckurzax0qlw0b0yndlovt1m5ry6ilb5327t5ibwn',
                filename: 'eikp5lkcorx98x6qozi7s8besd3v97529nwkbu6p0lvh3gmo0m4uo1pg9481punudnjw830fh6a2h2n4ly2d49fvay2vqocxvacymzqt1vjhtetlyytkcyjdp4pdwx9900fi0jejrc6u725qp0pmp4zkcak00dh5l34cvi0th7147zfjzjmxiwtbv8r86s0cz8m3dse7s19vd595y3e31psz4s6ompf7nqt8ej2nnb78z6ef2xgu6azy6jaxtrg',
                url: '5d7xqo8az70eqama0ehik36wzj7r9w8j0bloxusw1mqdct9go2luu4np6x571eenc39zi07w5zk2w3ia6lt72r4mg92gl92qhfn68jgggyrjbnuokmv6lew92dd6zg229jdevxhyn7zcdi99vt83jvoez4kydxfmc1uet7jup72z18zm3pa4lv5i7w7lhtyq053dw2cp902uyz1ih1b4swz3txjsbroeyn21crzvuk3yo0di2k7o6c2wkthsbmwxt2sgrasct2x7rtye7gx0g8xosyplycg9t4bj5xn8ux1s0dlj4sfpxoyhmgqjmcny4bge95o4vormqwgbd5s0xhxbfbx77y23m62oz2v3jllzp0bb3n81j3y3cvj7kj1nlt4eah01u8l04cnb3n7xc5yqbwe881s2ggyyc9vs578ruw6lkm5wpiygprud4h90on4zom4pbsvb3afa7cqpbuo89v0zpx039sief53zihsf2ulih8puavankkzdsbffu54pfdfm3nandtwbz2xshj3g90ir2vxa6h6szyb7ikkqmk9seg87v4e3uyvj8xqhw87ela3bzkkxvx81w7kzuz93ghzdlhzarwjrc61lqvukmkcc66n0qbf81afniin7uv6flp4mqcbkhb4w7rtj9xgsl863cn78ofod0vklgzwqi1kxhy87ec4z1yrnl988qcixy3fxae0iyqtpmoxqplx4c93yn1ntxwstpp3qiwmei94a9iyolftwcm1uz0ehts89big4vs4odhcrn6dnl8zx8anq1f18bdb5r8h7bxqjjf02dfcp1x9pm2l16ymf7c30d6zqx5m474v2rk8pikv57ohl9hru553kkbws98kni3dfasw8f83m3y2nikvurw5kw3ksyz56joeevcmfh7sfs8liy1sfhzmxl6bzgg6hjy0ocew1z1o4js4thp62e8wht5hnxoytysvs8osdkgeoa4kyfwd62tvung392v4ii6iousl6uvikngicyd9c',
                mime: 'lh0bne0hr8qzg819tal9105jam9wtmw7fez78onfx0580togbw',
                extension: '8bj694rbybplwujlelixc4sxupbttahzc0p1utdehys1tikta2',
                size: 2704759328,
                width: 906898,
                height: 321426,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'br9y5v5ksmabsdjqm7t6v41vc3dtdekfiwmez7om5neuemtgubmfw32lhswsjobtda9c24jffsr2za0n448btg3fqus12720vx0kphyfrmq4colkg4466u9qpdr9him59wynou3t8p6s4o2lohvfqfibft0qg8a2sod3xsyjr4za5v9armm81hhu9gy2tq7t1jwlxll11td5jijeyqaw156i7und6rfkylef1mk74gdohakh2orgxv6fzdpyuxk',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: null,
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 543113,
                alt: 'z1ndp0ckddxabpjfkdiptfemthonw9cekerng0jznbxs89gebavwfxi9aq8v0mel0bsq9c7aihpr9nlgancgpvc3pyn2n454qgp4map8w5d9nrhcq1o0dapkcnpg5b5gciy8pohz4iynqx3q09l18csxc7jlie8lqcznx5hz9f9ylxuhrhu2p8g4hcl0kh5qtdmlqwxszid8a7fdznio0r56zmudreipn6uwo8b6xer8a7te0konl0azkppa74a',
                title: 'ejkcrr27t6qe16jaa37qk1mvnhhjmj2x4vo1nd266oxfty3445h54henlwdglhgvrv9ecvu3ddtm0jmyoli1dgad95h6y6vejbojlnapf0vy0s268wc32hkcfvl6kfxz89kx8b3o08o2exsk3zmtcdpbdu5qovvbpwqextulwcrocd2u7lybu3y7k2b3vcf36dpzp6fsyzkufzemyifktpqhfg3dhskuip2u42hbrhrzouh9fsq5e3k5szhzjon',
                description: 'Enim eum non pariatur modi repellendus. Voluptas voluptatem iure deleniti eius laboriosam omnis. Esse omnis maiores suscipit amet et quos similique non dicta. Et dolor cupiditate facilis dolorem quasi et natus quaerat molestiae. Explicabo aliquid maxime tenetur ipsa voluptatum. Amet et deserunt et dolorem numquam magni omnis.',
                excerpt: 'Vel in ad voluptatem error. Aut impedit sit tempore veniam eum quibusdam. Est amet quae quisquam facilis. Repellat eos repudiandae hic velit consequatur est voluptatem facilis.',
                name: 'qkbfr56o0dehpddvnj71c26scqgrxpud0xjnon8gijtlqmto4bnbaio579g488srogxc7gztohvbhuf5vd3jr4vwasnjlvd68onbgh3qq1yyxdf3ubwda6hqznctnbpf9nqo8vckmhmz0wblw35kvi7efc6nsoedo3sadl779hs6hdx6d4etyjud9iv3ash451p44x2yimoessosxwbicarehbmx4ppl0472n37g2m5oiuby5iy33e50nx1x5b0',
                pathname: '5w87yvjvdcxojz6u0bri5j6rzrxin5csgfumpcglx8ev1moxfxxq3n748f08n9xvuzlrs8pzpzzzlc286ozvd5e3cqx6wmbrpkv1kmxfc1bc5h75j8hvkadxrdfxcsvhb3s38xbm9c386jbxm25gon3dc5222xckfx2sp1xsvgcdzy4hn5s14goej99etwz6zjymuq13cfzikb692b0fx64v8h28w6zcw18dczyyepb25rsd544zk62b5i7vmakopo8pwjtfebb7go82rceu9t4fdf8251aemkodvcgfov5edgl4iimk86lomas7843l4ntxrb28w6wkxamgsyd8byj26n8egjxyr4wdiijzixbj8d4kv6n1f8s5ezljukt6590av820v15dbeu7a6z8pa75i90zmnya6x8n2liw1x34da0mbzol3i38p6pkcno0p7p5rqwajx9nr0zk59w6z1u55ut71qz05cbmle4pq9oxnhy5c84tme9s8csy5kzkrkvyaxplhhuot9u6cf2qddd14e5tjkwl5jobm2zagnkexp9pdzci3omgwgiew3luollwnp0lvw6wkkrm1pylq5d3bwwlogmk4giqnjes9bsyazxa4to7309eq3ytoxxo998grevpmk5g8rugys6rar3tgwrm0a939v2iwy78qoo3dvxhd4hx5174iur2b7xs4825wfsc2ewodfet7mzg1bp63hp3mn6kz20c16z7f2v43knj1soc34bphrxguh9s9t28b3339jzr69oz0g19w3e2z74zl1e0k12ir8grwnuald827bcry9csx6q3jbng7jppuy3hv5if2e5mk3zta79r86wbsnyqj0rhe1ds25bejbnw7w8hbcll1ivv7yam5ufh4r0t0q2f5qxpkx1bi9oladakswfh3blifue6luxdsyctx95n9xk91fxl4fvftac4lqwmmmder0z3msk4j9iyrmyayfyx8hszm93sqt1puf6ej4bcppy9h8yj5jua',
                filename: 'kivcihdnneufr6vpr0t01v0kkfeftcb8ntb9badv8pnevofjre5l4hfd3sevq2z3zka2snfm6axglf86rubbuvp1nwt7ganqm09tad6rxhs0y4mkwa37a08uiksatnvjy7za8jeujeamjk6pkuutl3qjmuwzx1jp1sdi0xjkfo718sqlmmqpk2rhta1gy4xhpncyk17mrm2pgh452h6fn68f22wbhhag5hn9kwcqli5iiwckavta89291thc2sp',
                url: '8nspz7ingcwzr4d6t4iphobbpd643uysyn887cax8ukfgo0enw2s8vcujm7p1kpdt232ju6fde1wfx2lah2p664qjo8oeurwc2rkzfn3lkrinvtke8j59yo3fskdw1lxi663dug74kcegrlf4ag58k3z0ljwnkk674jllpcqy8cwkv0x1nub7v0tkr78pj8fe6d2lueduuiys4v6ctqjdo1g1xsp7fkt632xe71mo1dojxi1gqg4pydxcvzswfuj75fmiopbya7savqh1t6fhdigxsl7egvff1vjfpvfjrjorvpae88gccc60ei9w52bfsgrtvga62t7x9ft9rcpavc6dpcdcp5xm6jt0afs6fcsfgd070rr89nzi595aid79g8rrdfjdxrk4ubvxxvc48q1n14o40tks9gumjj6segod5bn8yq46pzl7bggut0m9a6tmdo9w5zs9gimh1usw1oll6egvwy1leqq6nx6w5jcupsz1nj84c8miffw3g3sglx03oagik286bo0v1kzrpniw7xqq92jq5o9k0v2os0mhdqkrj7ltq5to6n9o9lnc4hq7d90fnqgilwacihdbf9kn2pz5d07r2j45ytqb27ek1f9iso9zifpom8e8v6dwkkl6939tsc6h1sgnxaytasrhqj9h12f02dnfx17ulf17ms8jg4jeltvfj5ejnn7pl4ecmpm6u82799yzuacc1ee9nc61j913g0fdmzzftkplh2cjvp6el8sj6ka9qhk6lrvu1fvt08pydsjno7rn5q36tn6rrvvu7fe55d8og7u3tfglc10bouuqqe424m7mymkvg6hlu5hzhjcervnhcrni32fbz60q0ya3udnxow7ncg9i3eg5guzcfy8y1veimdzlm7tzyzmy4fdz2pgru7z2zo9qs2ckfpdhppllqk9iqzujxtn97806s8r3e9m9e4i1ki4y1ohe6wefyvhytw0v6ghb761i99on13u0cf648c9fv7m5r3i0j9og50t',
                mime: 'x9bib732psjifp4x8tzitacpoyvy522owo2foxiwht31er6rig',
                extension: '77iv44ja5q1nfo13w3h2guw1ndv9vcaj2dz542iiftwjsrf9kx',
                size: 6733423353,
                width: 386264,
                height: 715394,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'et7sgnq593vq2337his5nu8rg46ogoysfrd8ti7aq48ma0y0cmam5igkdhnjaozndqjgrbrdpek465vq2ebv23z4mbx0m1rhu2ugc77xxroxlxd96dyuxu5drac5xwjn6oy436kuuojalf0kogrnqv3q3ppnp1t5pqaujomaou7ezoup3p9tv9kldi6578jlj4xkvzt93yorozuacbi4dlcn62vyq2f22d3wsrjpbp6ycwjc92u1alo609wqjh7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 781121,
                alt: '4kjc7xv8kmvwcvue23xyt58y4yfkr4wkeue3s052n1e9lh4iucylw2r1d2xb97kryy5zabb5kxmvixo9cbdnp9omnr718p5tmfzzhedsb37i0buf1kytj74s3gzejo7wqrhzc4ac4jak3xpuwf6010oyoro29pbcwaguq182qz0zdftp5r0c58skb0aa77wf4u4czf0d35rewl7z954un2l7ies56xvktuusvbgroixhzl48qeiop1zvlcg0yt9',
                title: 'pw15qjyzw4cfhs7xe7ve96l7ptih4y5k7qw1884ip6giknzgz0l37g9861fc127lfg414n7bztqvdtdv8nukkola2ghrzwxuer974dfstikddpgaqv61yx6hqx5mlacf7upfumczlypo6idcsqmg93kn58pupgq5efcofpsjnx49nziab4yqygutw2efygq5wugyw1vsujdi9ww61cuvcpnxc04fsjv66b2l77n5awo08kv3g3ysv3h9z2lnalw',
                description: 'Temporibus officia omnis autem ut magni. Dolorem sit nobis. Ducimus corporis aut et. Quia ea maxime quia deleniti rerum.',
                excerpt: 'Cum provident dolorum quia placeat consequatur quia aut eum. Rerum et atque voluptatem quidem. Commodi exercitationem exercitationem. Voluptas sit quo enim qui pariatur ab. Ipsam aut illum reiciendis ea architecto modi in et. Non facilis dolor quis ducimus et repellat blanditiis itaque.',
                name: 'kv48na16lsvezngukiabn23se3eu3kd322kvufdiupf5t3w0f02krp1fbqgi5q1xmfqdng2528kiobkldpeqq32xgmawfl1or3nc3975tf4o4t7fe5dn3qz44bdzik6weykq4qyjhvc4omwwn1dhuokklpu82wqgedxy9utg9hdy3pxyhx7fp4fyu3bi86etxznypafkornh15x3nsg2tpavzsy7jejh4a00of56xod94kwzsq3oj7arp0gt9wq',
                pathname: 'yqgvsotn8exts2wzxtni0n2tsya1zb2nagh9nfpy0ikcz20gg5qjzspixw0dv3lohklye3l05vn7hmsjh0271l15vr6xsaqp8ccwg8jqgj2gm6wxfow0m0yxruusycwide1owc6q5cf8ky2m39o0rivl0ld0mt41yjulwcu9mn431yxn0t6tbh1hwx9tbt39tli1ikhifsf9e41476xs0j7vrx9x7unsg5klzxrtoujkqf7wu2tvlcigxvik8n34cd6elx50ybw7x04mnmmdtzg5dhv0rp8h9kjon7pukxkd7opwlj69h1ghbzeub2zb74pe4khl7j632kz08fxuw1bj21558hz5yupqjcahp4j8ura4cj32gaia2iu497e1t6oh7qw2sqgk2dmwmobbwfoouaklq002bl3yukc3vzpg7mh2mz398zbv6iryi9eoqwzc6z2blt6xadve9r6l41qsjt711voekkvcveu3xy26q1q74j50aqr0aphae8ke9kolvv16umgo7e0xizlvstsjttojn4ojzhablwdn0brc901ro2fgueyuvj0qtl9v3v9im8f0vc53axd9cyu7sga2a34a3z6quemv1pwcbanai7l5jw1x3xfpuoodedy03sj2fcn37cfpfzihdqvk6lyoxvzxgzrslsrwo4ydujv5fedrqxxcw377yuyqwiu0p8zuiuepdnbl28iv8i00900si1zdmgxifgjixrsxa352zu81v6kqk3fdeyzgubf8y445icpf6r3daqyp6docdl6g62wmdvn5xktnaei3qc2bppzqq2w7gp28b33li6jypwepyzohiw5ty3a1hy49lwkrae6dv2t6wasjpat3yhl30d70h3hpntfv7pyb75v84jfwdbed9mqv79jdssa1if8s84p1tgo790tte67fa6vsbkkjphfu8xk95zp9kw4rsddh2vd2dkya5i0aqbaqabiqfb4l7da5oz57o8wgeu87l60ru8gpks4ysl7k6ie5',
                filename: 'iv3aaawa5tae1e4q680j2v3bdv048pc1e09ujf2waoh8fe0oi5o6o5hwqj12cx4gwv116mv3zg598otuf4t2dx3acm3y7likiu0shrnle650lx2nr04bvl1qtxytzbn9nwm48slkmbetecmxocs20s11jwk7epp6k0gow59hx0og5y9xm8kjhh2ny2eeygvu2i0627nbord36yfkzybjyqd7edgpzcri04ry9ga9rooph47xmfssn62ios7rhvu',
                url: 'u4n5qm14ma8rai54vh6vy3hswthrb2eu5img1158y7zrk4f3nizvnk79bipst6ll2h783upcw1ix7olfw8l7b4fp5em5hlwgxt9qnw6hmc2bmacck89tzn2skio4spimas7e3g9sy54cn4x7qzc0l66qvml40b8ioofknha9tcld9x998q6qsgw6zqjhmafcl3evrbsnu8rh6lux4xza7vt8wit85qbpfz8yi832e6pd9axhxmmcp0ris9tysywc7a2lmvojc3sexjdkuzega0iuv8r3pzw7cjcp51grliysfshigtq2pyxc88r6097alf8q425fvvy4uot097dq6ay6cfl8sehj0equ1qpm3svzxweyuykseybwupgp3t3q5nhxw2sh3dszv1cea3ngegh3v6o13rlijcj6916as09sav11jch46nz6xdu9j8thbkuluwjmkdr04otand5wt7y0za8aols7b166ur7oe1t0w00054kslj8htsbt8iwp8jvu5kz4unwlyr3ifhlc4o136c8atjc8oeed9gjd1cxqorzdecfk2yc9pu25rlkgicbh85skt20f3xfbcjdr3k7eds27f55xyp1oewkwcydztyn40kurwqvzgvit5udlzgllhrzgrqqw7jwxzol3ii18u0f2rsvlwoidrbi47x8wqnx2o1cwiwalc1a0aunnt6ufsqbxd58o3jqz0rhst12d9fcu93yx8l3fodzhtja1siob1fkmma74bvcskn96cwo6jwv48slitbn5cebfd7cibw7ma5benae1evcevwu35jjxa2hlgxawwwjmfomzcwo2f6uiiyt5rtkl62ewgzn0t6xdg4ide1dl0wuymut9ksqan5lza7y7ma4vvfz84vrlv0rldyrzmbbvgiuxpaspia38h3aj9owbgcfzcr4iewnhdwv3fl0ecfvev3ak42awcf7meevonaz9jdmdnj9e967sjtt61uw6xoqoxda9mwbg60kj2kjjao8rpjry',
                mime: 'ck5e5bwerfn14nb645hmrova5r8yw3m5wf0ad1iht18ozacyes',
                extension: 'ggb1jq8b3ribfhcbyak95otm9kvzx5o7dzf9c4sdossmhherdn',
                size: 6373519261,
                width: 320401,
                height: 551452,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'ai7wjdiwa01n5n0mfgndhryjnnudpqkcodn74r4757qphoo0z6lvmw4myl60blw9hylvvjswfe4u1fl8u5puvmouxtr8mwiykbgewuslz2zn6dy92j1xs6hxe1f60fpe5xjunwl9xbobcxuss34nuzec59ljvyot0cjlqma7nck7c5u0gyrjy9q5hyds5jkrw4i0nghexf1i4qze6gz5fy951b29kw427rd86x6xl656ulv3s4aclkxe7tq9s3a',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'n8cdl5j6glw4m0w0xggicv5o8jb7omjz3lhnw60tzpqayg3ljvyy006faa99k0b3xzutziin5n0',
                attachableId: null,
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 709342,
                alt: 'qp5wi2a8jtjw4iqs3a4y0fsgpspmyeqz9cy8h4695oaj9gf1e2isjaswi03745jxxkspp5ysnxi1uh242w53zr73hunsgik3h0fytpmk1o8nj3ygquvwpp3k061cjhbwu8yfn79p4fsjzzo3otj5cr7ud3tu8oziemyq0gpuwjsqoveao0aau7agkrpvzauytrl7vqbaeg035nsqaibl1ranhdartd5x23x87ba4umx2wy93xs0ddqnsc0k86sj',
                title: '4ou5sftfd95l0msme8hpo8ju3vtt1ua16cwnvxvn7jisizhesw8wf1df8e1g6lz9ys20qdjvx0dckjz4f4trs4zlm6r3gm9968h3hwrpevhdoal6zb2teo51niz512y610pio5zv2divp2oyuripj9ngs46udq1tl7ev1nnkzjhde7gaxyukkenh3pjf7euhipo1wtjouqj9kk5u3usy0di1vudatle4ojd1hlz1kmrgz9ijs7iz7511pg0guio',
                description: 'Dolorum molestiae sit numquam. Est quaerat quia aliquid amet iure quae. Omnis sunt aspernatur molestias est tenetur officiis.',
                excerpt: 'Aspernatur suscipit quia et et sunt accusantium saepe deleniti esse. Totam qui provident magni qui quia pariatur ut. Facere aspernatur perspiciatis quibusdam aut quo vel.',
                name: 'hqtdudyf53myby76zwfzne49lciyg21a8lmswhjnvprroegdih8t0dyfyi7jlpbkqdah8ryxji7jsfl80zx6q993hm1sucspxzbgp65uya5qb1kdb33aub6u75g5w1m71pbtqhfrt1inrtm5oqpytplkabnlsntejl7tku2k1o65pfbfc9vm89qvpzz6ofeyl1wnguzkzyhd3k4fva8xivsakpyvgzd3p6g35isusamsgd9e38llmrgjsoatwnx',
                pathname: 'auk86oxx7mp136qrrvgcqr6u1wqfz552e7h6g9z1wf516gsug3vt7axfw6e0vozzzoq9v7kfyscwmdsttsgy8rmdlb62qw0txh2bagpbkz8u42j230rzjvcxmxnf1tposogh7ejjs6ty119ux8rmsnxn0xs4qm1v2oasg4tiuujkasxc4f4jzrjhxky91mnmkdcenzh8eae36snvt4lasd32u5jf0osmg6qagvz1zy44rl1559kbg9ypnd7d8l2df6tdgyp2vvtj3aw5kin3eff2rorhx8kk1740b07o1xcefkqrrn3jo7vy22qokdofvmmgvgspyiymgvfc4z8dqx4y0o8r5b4b3ytjseqp3qhhyhwvx947yaz3io1l1incqmd3nwb4jr9scoc2qhqr9bycm4nmbo5w48btqtuhjrtvo3r6c4g1pmu1q9d1m0yiv6v496f5f0i0koj6bx01pjux9z2p4gy2szubne73pjk8lva27w9vlidotb6qorfraihvpn5razmed7m9h0h0caf7zfulkkaf5n4pg8ckcz4dnnxo0vendoz2978qjx62j0lqx4hv992qnt6q8aesw4z5aw28g6qa9j3j6vc47d0pavcjv74wq7mu1rnwbc93voq4w7e04lnmzf2zayx0qcee29uyy4a5rqqq2vpv9w62tqgwr4w7hwjaimqu3jqy91cy199uhxp60rzkwbsr9rervt7y1tc5jmn9vgdxam2efzgpjuewj26tbfwvb529aldgsp36i2aavx1gwzh2qjjchjxk08bpc5z86x8pcw9fvlj76mva9acjv66cmd8u53ha1wi945g0hgydewqajtcbttdc4v0kkgiw8v2fm57jb5a7ok1lp9l2d7dcbpf9u0ujf7brm81kvdbnly01fk0vi8rbvtumbshhn3tganikefx7jfcauld3d0cbak3jgmauhry1se9pg3ml8j7pi0iiwye6igfjmlozguw99ga5lewgakf7kz4dwsonv5r3',
                filename: 'ju3grx8om18626x4ft9brg1kkmgi1zo5v2qoq96l16g1aq6xfscdjab01xlhw09i7bdwfk2wnvhqjpktasqjguebstp12r0fvykrxuww0p8dksyez7bqjakcf2it3a8f64x228tuhxisqj94rkjqelphmxnadd6bzrdcd0o55jdmz3xuuk3jkwomp36fgfwspdmddsve1xn4qmig6kk64lbky5w5rc8ns8nk6vmvgxqxd2zt907n3o60tg6fojb',
                url: 'rs5u38ga3qskh0vbkrbtt3izjr77fb08qry4k4ih5o553u8l6hfvqh91s6rtlgkfvzfp4io9zre0mm22ookylw9x9uep1jq2kykl3t6lz2zuc0jn482zqfgn69j0vdjeu2qbc6s81zs1jv5yo6qc4buiqatsj37oxu8l1itdmvfe3slpvwupw1cwygiw3xbxt6p38artpw8w56pmsjnw5ha2qaue3dx8nn99bik0amty9nzzoubg0kyi3x17l9g0y0r3431zxy99cn3zqm6fkjyu13clunbuyvk0fry8lztwuygzm6kkxy8q7yq05tx2fh08pxlkienmbwmz72qnbyssllgyq7xrvtyg8tdbma1ea6kbb5xhswok05yjwyp13go6vhive6t8g7qv3qlf3y2nz2ocvmoab0nz3o10cfs49lzfq4v20tucbts4sp7wiffq2fv5b15b2ahhttnc72dt2rr0jm6zfr0lj9tx0hlnnsapia4z5ce11mgxxgbbtb9ctllv9emt1s1tir9uvyi52xatmxv8dsgu21q7mwk63yzme1tcxrcwfjdgbl0ld0frpqvu768cq97ayvu2k5b8wx0uiw4wvp0g79l0u09j9t0xr3gyd6fd35c8wtzhf0zfci35ne7kauq6071ygxdhlkeh776ip0hozwu723sw3ryn14h44xry9vuuvtjza0n0espty8miti3ro4etda83xvd88injheipo0u6wlektfvccwc54370nmfr6kpoj36s0ky1tj98qzu5c1l0y59m1tbeow2bqjoh1xhoarw1uo47kc6e1z96iybzj0zttvq6wgw2ay2gun1rhvepy1pjqm3z4oijee69cvha0uz9ax0cn6gls074m16ul6dddwdh63p2iyaru3uwkl98e9vu3oefrzg9ovhccvjp3321l60jr9et8mnec6ce8zrdt81ynhtg5s1izhqmezi534j5h08ha67airhcv28q1j9fwlez83xwl6vcvad0xqgw',
                mime: 'wm6qwav5jlkylw3ld89zkevb7d6qo072ebzl745v7bdev4x029',
                extension: 'zbfw0tjk2jni8obieu35gbtlhg63ix3i6y2b05hs28kbsiz4n2',
                size: 3427186091,
                width: 661712,
                height: 682333,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'hsgeul4x0dtv9oya7wg1ijpuur41ys6os3h3dh81zkl69833o0bmcep01k5m8mmq50lfpeg5emf57nbjz7s2glltu8t2nuc03yy3sscz6ahxi8js1omyej89v62vpv4p201e2i59p88k7csvn7m97jy0k9jrhhz8a48917qgorjy0ey04b0a6r6sscl6k74i32adm43gicump9611bls2a2bqzdmve5s393abarzl1hcbqurt122xzzqdn3m4in',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'p53lc5q6k22onuqqomie7i8me42v0q6q53pm06zo8mm49rkfbfto8hrm13bbe1sdhfzll8givra',
                
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 534627,
                alt: 'kybxzzwrcpiaeaypg5e5xw459dpsh1luxrbyb7ciy6sr2fw4zy968kx2pgtj52p5j0yz784gwc9vguws4hjof0wy8g27d55da1cbdkz1amilac3umtw27elsxm3npj0p2nkzgfcaw4jx8f9le1wii4uj01t9yjh5jkut7llhr1qaqw4nxf908s73ia36inaiyi9u10hk7hiigwc0w3r47dr1nmy3jaxztcj5wjzvf4szwrp8vl4ddp1evwihkni',
                title: 'qvfpuw26amtuxqvm8ye3yi4addpbopd91epe2vcmncegxmum2ygq0kzip3ldg2yxeumgjyrimb1p8lags911w0mjt4sdk73o3yzjr2utn5fg2p6qay750ik4k01waa13r7i04a90y5gckxx1l630lsn619rkm9uftgu28vm144g8jfk0vzyu1qfbdj5xj2ptm2ote33mma2f3qy3054zl5voofxwx36x4i8ihwgipsm1y2e1n5ooxb223g26mb9',
                description: 'Doloremque veniam aut ratione eligendi deleniti rerum optio. Sint deleniti sit dolore sit culpa quisquam ratione occaecati suscipit. Rerum officiis dolorem voluptatem.',
                excerpt: 'Modi error aliquam sed. Omnis recusandae quia repudiandae voluptatem. Provident praesentium consequuntur id sapiente qui cumque. Eaque consequuntur maxime. Aliquid reprehenderit dolores et qui.',
                name: 'eai3adfsdwink09e1tqvico3zkaunid00op8t1wx5725a7mk9zoxvjte35pahjv8qbq04vc3qggnsw1e8c48m84c4dejqhmwlfjlm4w2zrdtrgfee3awld85k8poyqciz2m5o20ttoi1ta2kdbjix8ochpojnmuhnkqkop14h567we1v3rs009awuvfb21uoxi7ruy0spu90w10to9b2lwmxryv6amjoxdisxbn69i341txo9kq4byz98xm15wm',
                pathname: '7lpuolmiasbebn4e0dlj84608l6eithusz12xic4yaxlm5y3p3gvax9rqdknyhpsz2fkbzzsuvylga1rwv08eol6l7bmaxnqt3ovejuikfupxl7rpd3p4sw1geev2jqd5306498kdcgu2q49mhdwzmgnpwvgel0hmtxnmo9krelrmbv1frzujjywsnnftszq5gngu9p7cgzrsyoqwqrf35sc6v3bhmd06ytkd7s7arao7s7hpbkqy2dxultxejykd4dzctyk5kslrnv1awdrghcm5h8gmen7ctfu13fsiwe31at7g98opzxfzow56v2q8nkinb9bwmpymt2molweg03x02d6fpz971dc6b74snmehtvanxt8m3ep0n08qe4kxkr2m5mj47odr14ot1zawv2novm17jpbjd6l4lnioo4c2ptyg4wxmgqg256dhzwpgb6yw9vm34btmo9wsxqktx3ot9eog5ls5xfhbr3zba4tczvd3cnp6ygegbgx5ua2jz9kkxipyk2xittfyw0uaqqme34i5uakbcfdqeivjgdwoxre4stpb8vzxfkxiyd2flm7jwfxjnmznz5a3lgviuzgpun8uxxri6hjtd1fhvrsn6raot5vo7brbgc5ofe5wjirl5lghv35a0g05xulldtwcfy4bvtczqrnl4r6vea080lvym89qr3okvrducsitgpqamd1gdsoraal1lhafe92akev62k83dogo7l7gc95n7ews9c10mmq384byvo6qcbky1lb1di339gaoma3dxwkguvnvzje3ru5251rg4glb9tk3l1lf76320ik45d8j4vdol8rkl4pdixglmqh6e7v1bmzty751389w49qzh2gxksl06l4jccblhs9asuqgnw1x55ybyp11t7392nraj14v73blneyilezvfjm8qpaftdug67ua2x86044csoeormwv3xhsay2ct0i3rll808ajlf1zi1g9wl7mtvq73xm8sp1b7g3m2epfngbabpi',
                filename: '80zv0ehrugwwibnysqvg1euemt3bven2z2bo3lejux0a2l54hadgyj23nvksvsxsvx4ovwhm8w66nu72ec7odud6c683inwxpigzbinsx493qcarltf52tdp081zc1u623r8h4ydi0f1iug7js86s3ogtjwvt8ktkfxxt23rlrxmvgauda5vqd4ndgcl6z1ktp87ebrzd6x3ieb6o5ba0o4jxawdwsiicjjxh88bnp8y2inah70fhtyiwdqlx3x',
                url: 'uuxvfcs9zie67nbt18hsgrilrfwywqst9572ixnghliftixdftx9ailum7gm8v08g0jxsf9xskbknisjmmhiyfbpsqaueoacqkkwkfmtb1ce7yca381oop6d6gjdmsb4ggobcwrhvpbis0mvyzmb5w97jv3zlyb2cszgwtb1cfs6ufu05c9c0ogxv5bgyswavm51inyqluz2m7qrqoofsx63xtnatg1vx722j59ow89p7y47z91o7c0prdrcxv0z8c7u2qo3zf2621d12qbdtrxiwx7zyw907ytp8wiyw5br784j0rxfw5z3bjwyhn3pzv99lr7dombxl752c8uwyp2aoo0loyk8m4xbg2pikv4mlz9jahajooxhmap09qost0hgfi67pbf7xahm9x80xsdl0zn26a3b09cfg0vu6lr70h1l7n3wbvu3denlzixl8it3ovyovw61d4hqq84bbx5hdc1m9ozw6u3if392ujmpbleowk2mwrmsph98i6bpog16xxde3fgl0k13rheygt22jlcp6zxwlizdjaikxc5ngo7hre2cxnepdbojsc9rbt9p6o8y24g5elsxhjv6jqij1oxzk8mhn7d6j1y10i7ajupdopmhu1vvxbiqykvn3kuo06fcipmf0gjesjjxf8kvhymzhv93q79x9how37w5nmy5qqcf8l2zakhgyrl9er5ii49au66gceh9gxjzrvmrejq1e3n5t5ctrwn9h6j9q1psq46raylr4qpaak9e8a94fosvbfdu8xjffsmf4guax8sjwr30inzgzdlx5p9ab1crvw7uvtlrwc5pel3vpjbmismbcurb4pj3pyj4k8g2n5g72wcyaygt0fis3dmv93fur4qwtze729tftttbe39vt6bo6luhojaj4u1ljdmgp1ss4immcm7gmglflyn5h9a3vos4qhws1qc4189y3nuyovvwffxx8ev8uo2btbla7jga1mf4irbm3bav7n1mihjjrhd2s57h87iuoz8y',
                mime: 'h3awark816378kv8w60biqtkcrfvxdhq809zc10euzhdq44seg',
                extension: 'n1a5zo4q4d67p876jqzsv7wonxgcjsi65rntusg3agcgj6afe3',
                size: 3002308621,
                width: 311113,
                height: 738785,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: '9ddpufckf3yzxpud54nv3f0mubdjw5dlkdt2ilrsz4e6bwl295rgpwyeu8ratp8mfbgr87aoqv2e2i3t7xe2vkms945w5kr8p9yt577fbuyzfzzn3ymenoe3rz5z98imdp0wlws30cxi7gvrevlq5h62itru1a9gnj1sgm4u91htsmrcfz404u3nlgkohnalp2idchmibvvccwh2z3sj9ffxqljmx00ygsmco2p8njwj5kgh4ceutxi609gopyc',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'ds1allgp974bpbkz6a4gxqia4qfmj9feq4tvt62pjok9rzmbvvmfkdqvertbw09ij1t4nck1ncg',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 540179,
                alt: 'xkoy42si7gzger0i89mhu63qej71xa7lovv7d64mq1aojuzmnmqohpqwfub9e61d66d8kk5qnk5j120ie34hfgo2hxiut6z9qof0g67st0epmacpurezxwa30bwfix08yp9se7wyclhwqyrol95ouc82hqlq80zk8i4ecwu4fwpwwclvfgdnja46h5v7islotyfxle9633e2v9m4ptp7p176y1ehg13xlx6dyric0j03fd7ykj8dn01wmxe5dx9',
                title: 'mow105fskwr7xbtt4f55rmguxfhtydk361zj16ujrqczb7hn3fqbt63alk2c6obtxq6qvntlsi4hcfzf7i3pkysw2xxxenmt8bxxq7ldqabmu1lfdu67uwpgq26u7n2zbkceddwflzdeq81paprqyuazfev2l2kxkkdi7u2z6dfta470rrcnd0nb95fcpbjbe5puj3wk07fc31r7zuh1p6rs83csdwbu66wpc972lxciuqykhl3h6fh786z4w12',
                description: 'Perspiciatis error aut cum distinctio. Aut totam omnis est mollitia rem facere sit magnam ut. Asperiores magnam pariatur molestias qui incidunt et explicabo qui. Aut hic aut et.',
                excerpt: 'Vitae perspiciatis similique et ipsam totam dolores. Omnis beatae voluptatem. Recusandae eligendi aut earum similique ipsam.',
                name: null,
                pathname: 'i2qr1ytsj6u4m8ga4t6tx11j4f2x2ffxt5mtjwzc2mcav8244xm810wij9hqimrgwe5agmufvdl6cj9lq4tez3wvjzvqqdau4w77hj00ii1g8w5jq54o113ggj3rhnbbw6ja6g9ebjpvdx6soixpw2wnaw63owy4uv1x1aavj5tsihkl6w5893n1xfk5bpqliz5ne0wfjmmmsp02zrzikb2zi8ar89f2872ic30r8r40g4w6tvnf6rkudlpp8ndr7cc7qxcc72u5f300jcyy2fxqu98c3qxl9yn9iifw82pkw9bj7owcae7nr1lf7prz90hgf97mxg4rvyt57mvpo539xfiwzti5dhmpu4ikavsfklc46muzy1vzc3rei3llnjw6f0v0b41euknvuaclphv4pr88y0g7o5bn1ic78f6igxonfa6h8d3c9sim1lqcv2m60b8zb5db49j5aut9nnl9l0zqunh49k5yg3esxw4wvghx4xwo0lvmhmji9ohfouage4rda9d05dg182qg8uiu88ytwivzga68c75521hm3c1het4w0w5shnlj8lxqmj9rjc373aefie2brksdh492o1il3pwz5az8zztz3fha8a68n8avd9bou8vw3jai6cp7ef1ndzkdr2tdjnzqqzm1564lvxtxraopkdf2vr0g3cggla429bv9czxlhpgxclqoxh6u2pgfuc5ele6r5arx1cdn6to7dfdq8bvsbrx9dmtxn5z4kovg2mialxgksrmv2x85vi983layub31hu5ze0ss3yi05g09329ktw00e4b35o5w29604kpm0j8qjl8gheuhs6p77p69em1t3qzhz2ezeqjavhq66ousxhm7opy78gjosfolujg3s1r9v0f7q57ldgdcnsa8laz82t1e73r38xm9pa28esc4fe6yfolktd7q8kv3jy0i3nphzus9jz96z08p6y6usqt29g9ya9padggk7tohc3gngfcxfe4b3j7aenzgbtfu4axk',
                filename: '4szk31n1f24fn2oaso8g18ddhl7k8h6bcj3a34ul3fzj0n9mzqkknkukksp3xn6f29q9o67qf8ec2n5ou3yyj8rw2xnghdv1yv93impym1bvxt7y8agmk61b74nah2a3smax182g7xokvm9n45nz4qqdhk6zuyi2ryxv44sj0rol7m9dgecz0sejf6164s5pmqhjif2579nu7l5j61v1bydza1sdq57cdxlxuvpctr5oo0m0xhhqbvvkko0soj0',
                url: 'mk774zkyc7o7oiewuvwj1chkalfsl5eudz1j70xmanx6sw52n06tr0zj6atj2hzbobpbcv8nz58deodgjjtfitaib2zk7fg2ac3zbpib9q7t1mavfzcxf37g1rg6v63jd510d55btwuurf4dgfw59ikrzjbrk2umbqdwhrdgzlinsfm0aqua2sdxycm9d8igfnek29fsly342jl0g3rd7l3hot95gt8plsn3rc1g7r1ymdphz7g0c0zlu9wm7xjzotxxbn0h8tfcbmlzirfzkkucrhnaykw2vtkcvyfgy9lhksxw8gv9ah002f2vbrhiw9s7lhqhcyrse1koacj1op8mq6co323aai389svllmsvaxomk68e64vpxtb4wekphvqsuyywi7jqa303parwsg92aehkuqwzz0n2w6i575sbyvvz9je5a36mddrch61ja8w87pf9gv8mp7r8rgh20wwv8gqsy8tmk75mryo31msatsq6l7di0u95jc5uvjlei9spgza5xq6vkoycmaoa4gip2gdqb7812oftzisuaj3txv9rh0jc66y72knson5sziq6fnyswk0fgk0xzpzxd15bs2g8zj3a23zhqujwb2gnzye0my8px14hhel2ilt8enhy8ybeb4dn49gn0ob661qrffdfbwlhpc2tdxseua31u4g0vuvx9nwr7aujomytshsukymz6xrfvmci5ekshl1n0qh57zy27saof4m69uov4yd9y975t7m0s1wtkufs53nrfcdl7yd8cllfujkop6b9h7fjhck10xtv739l7yqhtw07gqttgt9gpcpozh4zsoirht15fsk8w56mo5pg3y1toqh1tgufg1mynbg07le58tkmxti3fhn0ro6ufizhf5cxoumidsuwxhgxgn8hnfszl56ismoa4mqkfsyx3kq4ztv8nmo0mqr3kmj4hnietvrthm1wrt9fxqsgbkcelxge5yqkrmwi7wr9uz65xr63mu6mjn16lqe56jtgi8b7',
                mime: 'echcsra5q1u6b087rom6s462sqbiacksq2zdejbm7lpgl08tie',
                extension: 'gdpn0n14rc8clkefy2vs850mluvrs2r4b7fjlsny0tmd8dxhs2',
                size: 2702880829,
                width: 178502,
                height: 458516,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'ut2gz4zpycw5v89h1b980t19zkm17hd2slpxbmvoivudg145ftsof99c9j1fmlrkl1vhulpavb6zy80vmt2y6x1mr2hleyoxwneyjne2u48io5la71ty1socv9tc5bdm1bxknhl2elm8vr2ov8ofk17ho2hdu9vcpf3ywv4gi6lclkt6g046knpe0bu449b69336t9wkifwfyhinwbi9abv77a7hvbpl1fg6atns1hzq4rqx02slgpi9ahu2ddu',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'v0bbt8tfn24xr0h1uph0zfkki5a1jy5xmzfia96vd6rztllwbzwi3fx2bjcoprlqokhek2lbsib',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 844114,
                alt: '742kbv529abxo4s7734vekn4g3h6lizsbguzr2rswl4p3aucq4ratdh8arhylwskqzpioe8otmr0z2bnnuuv06rbqrg20yyrqfp7e5peor25adk2m6jp9nsu7tiwihzimm68n3itdpm2nb004nqauqljgz65j5pxpao16abgjxe5ath0bcek9uiq11yna06rds4n47xj3ygok09mykz6jupr2aizwpmqeqcxfgo6qm81goka4l3am7ruz7svkxv',
                title: 'ph5wrqdelvtjtrwd9pvg2iatwa8w9dg8ceekfppskeenkoayw60dzn4c4xjmh8lwn54ilu9p0woutbxne0h0djxtne0r0jgvhiha66jybb6pnw4w6abrw0whybq0xalbwhjktw9uc12punsgf9eljp4f4ypa5blbq044wx08m3qfzael59uieego292a7vovo27nf45w257cxo26xaerxs7aur832xmmroylykpja923mor8n5c66cfn8lbahn6',
                description: 'Omnis quos voluptatem aliquam inventore. Pariatur in ad. Amet magni doloremque ratione laboriosam.',
                excerpt: 'Neque fugiat eos incidunt omnis soluta. Ratione aperiam et ducimus id odio id temporibus ut consectetur. Saepe ea enim cum quas tempora qui.',
                
                pathname: 'x0q8tn60anet6ogmlk3ae1gjnp2nyui8i15r2goxudlnrg8996hbrqk2sb84ejbtaruh3dvykx1mps9on9m73q2pk8justedjur1zrnwtrxp9dycrruajblt2sosy55xy3wzkfdglvcxig16o4cwnrsp1tdagmudsqe3ujbt6ek1bv5g388qm5g76o4km056qvd2dvso6y51mt6dsqdrnujhfn436ebf16addx8uilua9p3sk68qdbsw5vmesqawirfpgy4rmxseoviojz5vjtthiyx0dq5b8h3mamv6j832q6wwd33i7ze2d78eptuzbawp6fm3fot1yo3cw3cse13xri1eohjubbv1pglmofe206q8kw57auoqkw8ta0cmgar2j0mnpidovk23rdp0n3n6ru0rowbtm7610uxn70inkm3fclcmonnz7y5g8knylwfthaihwkuw7ckamwwctsii2ygnwjhge5msb5hi4ti0ph08ail284lhy61dcxemcb548w01i1641doib42qfpe1zjbehupw5yiz78gjykt7y15z5bwmvxyjuxtypd1lfp2q9e2d1ikyvcbhw8zc1td5jyfmeo80ofrec9iy0xmvd6me3hpuh4sphfk6pouzlf7hl8x1r8oj9s2d03meuua3upc8r4p9wleamvxm3r3g6ebo4scnna95vnf7sg0nntzajucv3reiicksxzbdmoo0v1a8yauzlmts451nkmo6903ikok16qib211cwdi6imhifk5m2zff56ghezyuycwhcrh5jvx2mklthwwfogrkvrxvces5ovvgrj1tfymbr9py2xecda2fgnvb7g9r1n6dlre429hng86tdun68q6eberhltur9xiyipjuah46u8mzyn1diltx8ckhcj3c4um71n97w2kguxyiekirwnb0gn9hk6220q0xdt434b7al5abuwpeqnxopxwtmdg5ivcfcud0qea70lj0xi35scujf0ynxh43tyd9qmk5a4nw',
                filename: 'r1123aoym7jy6abcrj4m2ijokz7s90mnwdijug61g3xne5dzhijmp1acegvrpevkl0czh2f6js7xitngzhik6a44el67l16q0k0di3g5ze7teln1ddt95sfyb8ad3yb0u81qp7aeijqcipwuftldi7ifn3fzolv7ec72a4t07fw4ewas2utcz982f7lyh80nn6lsnpaf5xfbe1dhexnj6qxk058syt1130e1gi0n5wre462kgp3r68svgvkkmdm',
                url: 'v3i64z5y14yqaupsjhi6gj6nkzwb696mhc7tubd3ipgwfh86e5glxes6w2sw3994iolqnv304kegd16y6nbalumpdvuqviz3nmtdupyotwd639opahvtkkvstv76zpxk230xineca4xxffqunnux5ingbvyftj07t0vxo9gj99ip526dh3joob21pf1tdoafeape255ji33yae8wjy1nfjg6p7iyt23m29sjlffumjtcxfl5akyei1pyz85l7xxcond4vzwdl6xh93baxeyiu558335h69lry59z4f64fslz8f1mejy9u5kl4p3rgxztf8gfpedocw6njangn1nup3li3pp4b3mu3hx5hczxu6z7mz39eruflnxmh1hez5plgwr7g3aep0mav4khu6h1hb55vp2mypu4vcbtwkzgfst8g9a6x0i0snb6i7mj78e3kh4q5d9ebbbxh4tgkuzbqo7u5of6limhphcz7efbxpcclh8e1lzmy2jfnemvimy2g1fxtk2ej64v7654kx5ou8w174ezwnqnt69klnd0srnzkjq7xt3w1bl6cnwen5049bqf2i3c9z9ojs4yx2zjm0nb3wjookhf6ayi24qxyirncvjz1098jhkxnf62mvr20h3o79nmel60m5tzhwtxhfqdvk6z3zzvjoofceil9pkjbn57gjrk7dx88f3p9zntx2zdjnjooklpef51y3psgpr9vd25k4k09x73kj6yr26lrp8u4kkwvvdkrfsxrqu1032yzenacb3lyif415umgxtvrc0gfxl31e5yljpor5fh5qmrlun7nq0urqtqfazaitq4gyv301nftjtd47gdrmpra9ws0zy5le9tqlgbn9svmq8096wl4zi1365emfpd1bumz8mr7kcsx8o1ypunmmk90twtvldday49k9kon9q1tiivwviooxmh0g1dvuvmpi08fw4bsigbqj9ef5d7aebl3dd3kwws6jba9aclbq3m2mqgvfee7z157j64r9a2',
                mime: 'fl3lh1bee88iow7kzuymt3jopevje4y1941rc6q2ppwsjb9ou8',
                extension: '7kcpjgz9jhmueejs1zrpislcoojs4uvojrpvgr8fbnex37toc4',
                size: 1980591667,
                width: 123680,
                height: 566820,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'ibqfm3mok75xl1cfdp4h7r8ajfsnus6arjfmdbmphee0ncgrfz88af0v2j4jx9je22xadhpdy2wj42k8knywk2jigqiaupqskdjg50qf9g1kl7tuv1hzwhot2bwxhjjwwv5j47lyq3xuaryuy7pt87ifcxbvkbr1p9fcu5dinw8yu0rxe435euhbd19v2u8hqszjkrt17ceqjbuvinf3kj5lbsvb0fb9ke9n6kgc1a9qrxhyjeimnngo0bgpf5w',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'w2kv4nbef9825mmq9zini0iczt2sww84sjfp8db2p0j0ihqytrcn1cwltukhvk5rvm5mpxejy7k',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 465404,
                alt: 'epmig3pdzacjct4li50xd8va4xd4otyfkphhalkoi5too9yygzn7gviwauced1tlhtditewkdkkmluc3p1qz2f0eqwsxg3k2twzqublql07c32o5crfjoa00cxp2f94l2w2pum778v9zbsg2ljpz7s0s0y9fp92qi8wz7abyklcyykwhhw77c4qn1tkgmy2602l4qbjb1ysf66im38ksolmifmuax5n4xykiwflfu7h9ko2i64iresxne6v1ly3',
                title: 'ophop6bnt3rro41y6na821nrpo71lrqiny5iqjrt96giynoschbr0ohhhmyw8twopdbcx8qf995qe5sedezeqp1jzrwpd8sy559dqu3bsm50q5199euojgsv4ivqevbz2h7bwl4qg5b8qqgtb59mm36fbzjlax3455crkd0bs5fnq9neo7u25fmogkygq450baihwxsf6cu6zzykc9kiwb4c9x20f2b5kouqghi9c0uomph0mkghozdwy6u5775',
                description: 'Et voluptatem et consequatur ex beatae. Velit reiciendis qui consequatur. Dolor fugiat labore similique dolores sapiente et. Distinctio beatae error iure ipsum eveniet aut iure. Accusantium ullam ullam tenetur et temporibus porro. Impedit ex fuga id.',
                excerpt: 'Blanditiis provident quia. Dolorum officiis nulla eos iure nostrum est ut. Laudantium esse est qui et modi aliquid dicta. Tempore ducimus laudantium hic odio aliquid porro error quisquam. Nulla quis ut pariatur quod culpa illo voluptatem.',
                name: '09xf77u5zmv683exr2luwhkzp79rt2ga7k832u57579czhzx956ghm8q3544obdpq89s8vj9ctj4rlshvp8yya9q46j7vt53hea8bcb845ng6ayd3ed29c9or067oc4zmcbx1vk1wjmcdwl28y1nrhllq26y4l3y4sxh4lrsd2aitq11yswfmkhf1qvn8w3fest67xx89fd2dcdk34n0643uiewsna5igtblck5pqmwj4inlpn6418behkcbpal',
                pathname: null,
                filename: 'r0wn6b8wkmuddcj1kpwx1dvyya11xj9l3z4dnvpef0q2kve3b7q6bxspvb352qcd4ie8n8n977iny7tsxovlfd3hbsodxzro6la6w29ulx88pgi76e1hx2cpim84xczos4etrax4xewtgexgw2q3yok5rufhs1k4pt2t1vct1fqw1odxbp1u05ukhh5k0ymuapod0c7og891ev9f4y50svrnme0r7nvvlqmx2x70lm516vlc7olosbhkwcdmrjm',
                url: '1r4htzbo0ylijyrva4nvz7ewfgisiw33pyomli8n2c71k1kfzllokvlncfiyw1begnuo9nu9y4f2n6t4r5wjkrw6i26xfpp1uczbzws5sd13asuy8rjabi2kg9o7cmhtd56sr73yqv65c9igl3d6h5wz2r4honxbdxm2hqvvu6jfskkynu920p99bf7k7wxlxxssqc9n0buhv5x5txge9omf9fptolzins7ffrijgygf8dsze86fza16as1i6b5gf3q362fbf27d8ne5c1mftuhav9qkh397uq326d1wqab6dzyoi19f7t5pvox5yra7j27bnp4di5lc7xm5et45z3cyglirlr2dfqtf2lp7fh6lb3yhblz5pvgt2f87bhm8ir3i6cswy43y5xn5xksybg4ds22q6r81lb4clnmobmndh465oqc8lzayfuo26f4xqhl2ho2qzj0l9mv2qd9vaxra3f0u1766c0479l4zna3pnjlqm0z0s7zqwkmfadnpeo6d5ho3zep8853a2a2mnig3ocg3b361ej2hf5cqpuowauyocurnme0yl5d8ztdh7g0ujb7182t3rpz82gedh064sqzzox0fam1tjx5t9e9dr96nfo5m9kbxlm0nkeghzd33dv0r2zuwa838yj0lot0f13dpnjho6c732hi3f733fxoi4tgt3cc4zfcfuaw2xrubleju7qb2igo4irxzpoyfd1uqddgvyae3jkvi3lhrmy4k7mdh89v4arbrc5pcb8u8uupnv3kcb3dcdl3aupoilqzt1d71atmhlqli97mssjwn6rniuwta31v1dkv9zx5rt8792kj8yapxrt90tumkjw716d9ozgih4d184s75o9ndurnw7jqyh5zwresikp9dzu5hxal8f08qu2td3w3i6uzzyditd89et2hvisjt4gzlh2mkv4phwb3ona5oq55lnbkftq4vlyp0aqe51rb27ullxdpczdpnrgdyy1gprq3n1c72hjv4xwv7n4ek',
                mime: '69lv8bol7koo89hrb70v0faweq1untxxnl2q9ekgb09jeb1irp',
                extension: 'dnno1cyta4ynq8id8f5or0fm0powbkte80ak92xp2q2zltcapg',
                size: 1987380143,
                width: 164783,
                height: 169231,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: '0hf7lesz08dzahu471rdrk832p7dcqi6562zmwuxlcls7wr9pghmjfh4dxva1seuvxgl2wned2vc511se55wq9nqr12w5z9e2artw2a23l1pcwda8hwrvf4lvsxhietap8gfkxqab1krlqcmh66ojh8rq8ea4o7tf90mbhjtjl5eu53udk9oyged1pipqukbpk92qe2neqb8kji3lr4dixz3sbw12wbrt0bfxkvdxnr6cm0dts89ifmuo81bohn',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'pprz3s8j5qzxz5uvgf0zxn3w5ckjlp37uemq4ke6n7f7h9j4wwmblgs9uh12mv5qgmztd5ovzp9',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 166715,
                alt: 'bcvbyzuj3xc0prhzareu705yyc8ybuman7kcczaw0lkz8nm9h2mng83z68hgxpwv3vlacf0m9zk6nt3027arypc9wqf8kdx5f570bji69s1kccxwhhil9egmn5bfmcxbs80fq9721gicddtvdhinhkylfxxqnr8c1yqfc5f16jx8p2uwl0ig39v10sgv04kegopoim5hr5fhos5i52j8tdcpjeg0ppa4h02k21ivtzg6dmireda0kj0xvwh34kd',
                title: 'bist17w82qo9882ikk7jlwvjjk81287t3yw1bk349l12qudu35t7kwdjwwj2xm5jcv03pamy0atoto6u3nqz58o271hmvp33vkuur5qlh8ohxb2jl0phpwxkobz4hfn897z0rhkrhleygynnbcu1js4y31bixz9m10776qnlq5ncevrkiwr3dq1h9pgkcx9m6gbxzima71zwpjyw5m2o67db4eu8dkw5zzx5t4nt897ajj9xe3ei3v8aab0kqef',
                description: 'Aut est et. Ex doloremque expedita non. Sit et deleniti id. Sint voluptatem et.',
                excerpt: 'Impedit reiciendis et sit a distinctio. Et possimus veritatis aut aperiam enim et. Maiores illum deserunt labore doloremque rerum rerum. Et mollitia qui. Ducimus nostrum ipsum ab recusandae et distinctio deleniti dicta dolor. Doloribus voluptate eos a repudiandae perspiciatis sed aspernatur nihil ab.',
                name: 'a5iiyd131wem2emqf2g2xjwkvpyhes6j1nn6v609kx8j60wmc9cgzh16ucavzjqkqppelfraxmmt4zpcpekg3evrctqfj25g3svwj5puvgxfqvrwwj3nv6s01x2htdpywsk2s20jhpz4kbrpevjxi1a0tzss2eiztr16rvv1nqvs6yjcri841izwmi5d5xgscjasmbz66kg73cdo2g8dj91bz8q95sgf8yhmmd2dkjsmzry0oowvyp0vdc14h96',
                
                filename: 'gb7bek0m0le1i9jky67x2q45o5ee2drmxk0v8vnlwr0evhtmir9nnrs27jix51240dl3ftcokck0zzpwb1nvw4kplkxwhdtsynpui8udqzpee328hbt3gr3x1tkio83zh5s9kldvyrzepqrxd91yxer963npjobajkxf3idkjywlrgxr2lotg6ys3i184lkvle5gloc130htipyzx6rh6d4ow7dsiiz2c6so2dheshrt6dajwzkjfy402nlsh59',
                url: '6vk50vpnevnl5mecntzyawqpqsa5ps6kqpqcpkfpj9anjn01y6c0dmjgirvs719loibeib8dryukj4800ha8cbg4klydyzsy35wj60efnbzgleyvi6ucc7k3yvtph3ctzwcjffec6gml5dxjd2d1egj3g8qmjpqygajtoos9vj85wdvi89ga65gc6pimfzajpuzihiwesxqpe90zoll29go0030f7mi21l7rfp8zs04xwhpbrq5quwgl3c5dewj0xep4cbz3mu071lyzjl5nm7kojeu8bmrzrfztjakyfns7f73suq64nw7sjpewlqvd9kiqfykm3njdhpzyqxzdhi4y2i7stp6mvebgii9hyn7xhkealqtqmxj1pcgox6bjfr36hu653eddcbx737zgpuswl4k8jvfqkd8efffljxee12dc1i4u0izcp2vqzka8ta2okxqultb1pmm9hl2gol3h5wkbiqifv2eyq6szw28jodt8q23w9y35yv7z4662ic7yntu7h59dbj3c8r2c8idkbzglhekaor9fq7de53q6frwjsojvs2dnb0gbwmlhraf5lvr7r8s9sno1qdojs3pazkgq7lq0alyqiwtd2mjralp8yxedvj9j2tvk502ct7vffxob4fj8dhmtl9flhf5bemcfrebicexb7p3403renvp7lbykazjw2bjskbarnll6x2zxis67nozu2zoqsiqutedxhuia1xn71g64nz1ukjudgqvyo8dk5on6ak1ee7ootbg96fr0d1foecber8y9dxkymrus9jmu10rio476jewux4ph4mfbidgljeqr59ad5pdqvjm3xg97lcwon0regwpd9gwaarrc0o3wndfr9a6l84ifpxha9k3gr0ew4qmnt0dewvnyxkbisv29a0ab89bk2f6ider7jzfi5f9pxipf4jhs1u42ohfk5v425p8xvq0ek8gei4morcjwlyfl83qjes56gyeva6oj4lxraf643p1yw7xx80uznc40',
                mime: 'ioai9ovh7svkquqv1szguh0vhios8klwb5vruegm8ap85sj2ai',
                extension: 'i0is8rgr9ckfqpow211tqvegq56bs0a2g3abd1jkxm28k0bltq',
                size: 1014765028,
                width: 280728,
                height: 134965,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: '5vpfbclkqmeg3q9mg4f8a1yxrpcty2qd1t41ukb07cav7x4mvqieb4axyx1o468vfkt0ig8t3kozb89y4y444dvga3rzeb8j4r0it2918rz35x90611gcvvc7zb1f5vbdii6y0eism9spdcrbnmltt2dcrdomr3jbra9d6pkw32aqlgvtz9hs7572vpbxstv4r6k34m1ys6xewiuu6rza9cw1v7lzziybzc5m0qbmw64y7uqh7y2q7tcmzg4bxv',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'e1g07b87dk6s57f1ms6y77djjnjl66c0urevd146eerzy8680xtfqbpds4sdtsjronxp4w703df',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 777256,
                alt: 'qtmaj44wrzw7dzg1p8wkbsnbr00q3f9rz3a7u05zvp3uicie0m1k3rgmsjje0sz0pi5ajxi59o0r9qx6ihymnk5hijliuihrjzapfnyeeiw03g9y8n05c2epqqs171jwekdf5exzj0svdu9onntigkfpnvj20kmi031n5dsr2hiz0bwk0qbxjjv7hxnscae6o0kxsx20rem09yunecmbfsi1wajz48v55dcehehjht971wwnucibtgtd73g9uad',
                title: '86qouycshwcmycxlgq0vkq8kwl6f8fa5vmfqaxoofxrimiy84g5at49r1gjguf37on108kwky2ylqgeqdu53uel5p1xtdg2qq433x55m164986370arvla1wjz1aq27h56c0if7yl6belv9qhry15v87t0nxuyj6u31mf60dwkk08hdqaocgpmputzmhg0q91dvtfdytrre1r7cm95i8j1vmqwog8hv50an5ccauxcp97sc19dxh2wcv4o1yn8l',
                description: 'Fugit sint rem aut rerum ex. Laborum aut maxime voluptatem animi commodi et. Aut sapiente laboriosam assumenda nobis eum ut consequuntur in aliquam. Qui facere quia sit iure nihil. Dolores est cumque voluptatem voluptas vitae inventore.',
                excerpt: 'Dolores dolorem iste. Et saepe modi qui. Sint dicta soluta rerum explicabo natus aliquam. Est assumenda quia accusantium. Eos vero qui error.',
                name: '8zv7li650513fyju4zvcbnofkva8zqbqfkktau842qrqm72sefp8kemr2q2zht4aihzgxm1ahw4zitide90fptfbal445ylxugirpa5h0vmpbqbbg92d8pz5rds3emxnzzjmqcp5lg3igkk27s8in065ge5iv6h6jr9l4fgqhp19jzdn4lb308j8fw8gwsne9af6xusj6twiuuta7h8g7yzl3or4dy7yyc49t8hlonev6j1nmfd0g9ull47l8tk',
                pathname: '9p0lq9lmtsxq2xs5lw5q051980e0sr4h0z7hjpeh64u3d7k9dbkmr9hcfy056zttxhtbcooe8wia0he14y641k5z8pxmv287venjknftxlq1i8c4a6173oqxp6whigwi87gcsrb6ixlsfovdiizgpq0izbo26apjdbbrom69x72spx19z3mb6tl8bayqo8c1ibm3bfv84ru8uwr78ssyso6iy37jeyqx2e471ui9im9aawpcafl0uaij8nxr5p6k3lder05augup5bk47lw1bake656205n8leyuqa6ylsm8xs5ph54x057ert2aeq62y7nnihsign3v4ognhk8a9ggi2m2n6pee852sqp2u3wqzmgtdocnnldbhn6gy997tuqom0agwkd37v8odbl0b404f9mb7efzh6uvcd7tyw59h66g0sr4hdb8s3jb0vvd3xs83rvuqonp8udj8n8vq2u819dprgsrzfmyn3ls9csid2mnzpwozwu8au10c1spkavjifpq5e81tkabrtu1jrrqvgcqt3kjt1h20tyw7wl6rb6pcl2h77i7ujpkp48t5pi6oeyfjzqnwhmmv9pirxggtlu8l8h7f3zv2rlsr8u5uh7ubtnjq7or10ij56cq0dg6sh26eefu9e7j9w7h4w21sh79iv44x73kfgi83dwh2zw7xza7s0k9lkigro9e9ag1a970q9bdlswst28ydf9qxf0byxw1h3os8zkscsur9fnho40z1c2bm9p9v1dxhhtbb0o049lbm6gbciqhwrus6py9ou7ayp470ntuewo6akwo5k7jmqatoeq5idfkpqxfcudu9akpszcv9zgy2ocyt1iix0030g1gv0drq8avn35ahccciwb3ife1se1ws23j6q40snqi0n7egyo15lhuaa2vwa9nlr8ffbrt6fz0u4f66z0dfd3epobfl7mhlz639es752cartvtaqzmbn9gbn72tyjmvqhwex7amufbexdghmgn5gl6g0dclak6z',
                filename: null,
                url: 'dcsnohwvki9xephg9dup1h8w2bgzp92gq67naljq4chzleqc10cev56cmsu6hny2kuyevpuisth4lvkzfcui4cny0f7s7hts74b89fdzr3alm3jnlt0c7rj93kww77tzbkw3yar8c4y0srsmbkxqjjp1uysdpau0xjluux1ikkm1s0i2ysjrt8ovlp9xuwjj18zvroae07fsifnj8k14h7qqhdge5aeo8dm9qe9r89yo75vasdqpdftzu8kk77n1x71ckelq1r9oakyd5rempn5rnejgu3o9czbhzc14dupj8xx3yyycv2top6bcf7w8h7lr4ktdxpzkhaalwdq21kzt5mdvh73va7cledvk4a2zsq8gwfgfnuftve6zsl7czgx8h3ku6u09444knddmn7k537qmjef4bxpd1wjuqx8mwgsqjj184tynjcmf8oa6oo7gye81ku5volzpy4j901uvkvec2haa5y3l7i5h49lqq2f1cj35ngsz0h2ueb1rzycjkuub3drhkyyxeuj735lduu402xsx2t4pmrw5g1cp89n2mhx7z7hxqptt9gdz9bygg89gzix42yo6flkr48qag6oqsn81fckb43mjbbwegbz74l89lzdc33wvz92w3puvsxmye2gt08j3kcafjrsapbm6qc0t4r2kliityi9cxe8skewtl6f2ilw2j5gdalac6xpver9ltkvg4jpemrtb1d2jeucv7i65wpu5ine3aez5btnr6rhv8ywkbfcucfp3qq773bv61x0mhq30jyj2oha125f6gjcus8y15brx1fot8628pzwl06olk8olmn45203pq43r85l0q97kiy6y274uzjkv4rkx1trkkdd0czphe737jbqf0ut7ln4ketizy3vmeaqi03y9c9rsjd970y0ic1ymce2c3gu6wb4e8cf8dmc8ciliig78sp71ylg10u3q8ma7k6h0wvb1sscy770e040p4hsispkr5t2m41lgddipkwof13qka09u',
                mime: 'z41y1ugd52f14754x8ojjw4x81ksp48hmdy5i48245i6b3disx',
                extension: 'bxp6g9qt32flbzi8vgrkdn9j5tp4ry3eqn5n7ax0latpcbwfkr',
                size: 7430990396,
                width: 257437,
                height: 489467,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'fizjnedwz9ryvzlwfmdvquf44457yf2n1mj16edptmwnvzcpxzmeb1xeb29yiquqvqs1ivv5ea34kth5rvgupksy4rji8qcl9j9m1lbtqawi3upt64ptjxwuxifp7b0ik2igrkex0hrg3bzlgxk97yjypwomakbe5tm83l1o5emwnpgzpwalizz5d0qltbbsi8q36l5ey0ouoxj5evfrmuqecjrd94xkec7lfollpwj694jnue3citl33iao1xr',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'o4bigom1ixv4opkvhk6hgt5sb6vfv95ohrpd68c0scsrsf0gdjpwnxboyuceeqik4xjh8vlz7sy',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 184184,
                alt: 'r1aj7t2x0y4di518ada8beegheow91kt3ag8ss4h4626izg6p4phgwop5hm4p2wyck5dm728zgi33ppqn7908ret3cb9mr0jdii5wseutsi45fk2p75g1bml6evqeu4bqqen8pnxt0qgs25lfs8b7e10ctkj9ytch86zffvfnm3pbsj4gjabmdraz8lkdphq1nkrhap6oq39f32pvofz5ougx53ookmicdi45rsq2duqaryw7sogl9fb1lnp6f2',
                title: 'ngczysxdmco2tdvlizrzaqznkl24fm7tymtsi1gu6bl1lvji2yb5htkm0l0bpvq2lxbi14ij3dzy96xirgfa2jzawtp36qwqg5ami08rlmns1cpz2te4z1njncwapm7rciivhuc44tnku2a5pvq59qvfidd0spciejnmpw3968a195atdehdbzpiexhxbbpo4tby5liydm7fbkmgak5p6nl5ay09s7wvyjjdeqjax876bhwh6t47bzy0ttksnho',
                description: 'Facere aut quisquam animi velit. Esse odio molestiae veritatis natus perferendis dolore non et laborum. Quod voluptatibus autem. Eaque sint amet officia quas. Labore qui sit animi quisquam.',
                excerpt: 'Ut velit ratione laboriosam fuga tenetur suscipit voluptatem non rerum. Adipisci dolores dignissimos et ducimus voluptas architecto culpa dolore. Necessitatibus aspernatur est id et neque eius atque non. Nulla sit quis perspiciatis harum aliquid qui. Magni dolorem dolores earum aut similique quos sed.',
                name: 'k6yyg6am8ntli1uyisf10rd6gm7770jgl6x69qwztja2uzduqjtqvlautnso3y9j97cba2l8tuhvceo5h0ihdhf869718l7kbhz13mdo617iyt01kdamkxf4qfm9ukjhj9ca8gqsh2c6yfk6z42wtzn3lsarbd0hc8xd7tpgayfki6lnprpp7kinln5o5bb3t4p22ud1lpyibg6jir2d4yylb76worz4xuff3ztd4lyqwwhsfnvvahpyqvo6idl',
                pathname: 'vd95dvuzlw1t371wthsnopg5t8gx8ovzsl79pjwc80pnxc54gzcscahkh08ml9tkxrz8a6sg6ego92gb6pqnbtuzyikf8awbmln72bmouo48ytru15ekjchm1y1yk530rvzabyzqpmq47v1xsk7z2nxuv5ogzl80qe3oximspdfj8szz4lwzq2etfa6mf0acgfrp9pqq2a7qhu4htards6x0wus2lk9i2xjc13a0f869q2lx3h6rv0z30y7mcsdg9y62yqdx07cym513vnkrrj4acvisacc0luuaazqtus14xrpc8rx3ujok7mrf2h2rj2iiawxtck76qsmtgna1i7aeseaqixyvyuj92dljeqy0kpohgmn0tiju5n2jubavxdpkkx54lv9zc07gj5vnhkilno4zhymfmavwlwfmz4vbodcteth43zu9hwhmiy19b71ld055zxvwp333wz4e7gafofp55glscb1in589ajst3sra9hp8tnbrutugd45yr9t6shqgz4uvftmswt3zrupg37krbykmm720hg0wozeabz7qag3kxo8dh5cacebg0k8w84xamy7y7l4xa74owa7quvsptutsv4kmf3j991ll5dzedsualikenh0mnyrdhij42gknbqkikcy08wt3g7qja6zt4dbjdfeap25y52rp0kuht1bs86fe4rioq4812fgg79ubf1dqmezkglmz28maem9e23tszjkfjmbam0iud70xn0uhb6cuybousil49cdeohi9xbohrdyk7zx57f02sxt5m811w36j2xofne8wisvg63od6pp3f2xvmmc0lu8wddehr5ulcioeyvldg4bb3bvqd0x3slc76ilogx8c3fhig72uxhichx1p2cp4mp3pdbynqnr1o2yvsea6k9gzx5unm91e0kn45735ok37orj911gqsoi74fvxoot0dne9472wfq5btzektjjzv237ypt9h2rlz2swyjjng6svnc4erqvjz6hxhn71r12u',
                
                url: 'gvegnddczhc0mkoled6a0v0tusu0dgau1ekzvcl92psm90z6o5x73097vjic33zxfoqkg9pifnoh7t09dei50q4u9v8tnup88tmiam5q20tsaibdpn55m7kiaeel55pbafrd2o1ax33t2d6m5cpf9c9c3b3e5omjxa3a7n46u5y4z407letvboodnq2oxi9s3ggadbmhe9n2dasag6dmf2jvqwspn0drg9vj5yxeo5zjtr6vqi8hovcrvytfw9h3fau9toywdazazy5figirx5od57vlzndj6xh8wqhtrt6qbef3f8ph0wgh2wj9s7d1y0f3jlm3dt9d9zisvnuc9131o02uzbb6qgpire1ofypdozyyxusxmlnx0az9cvbs332q24xb3lq1phtlw8nrdjjwdub5qp4crpipwuxxuhd83seu86cyczlzs3hjavosvi5ycgh5sfjplvneo0xqf3og3ei46s56i4hzrj69pe6xyyblq0s8y8qy667i91ag5qjl2c78qnrcduxxd9l8jj8tbo3efmo3ol6cfaxsygpjmab4hlkbc1iunr714ngzil2d2b204753drxt3ffqfvseo9naaokwid0p5l3nxqwk2z0pwn8mz2sgzjraw88ax3jslws5to8u147rzuts9wb2o36avym06uu39hndqxnlancj1tx0l4z4pko5rdrcv1qb2yt2j3mph0g3bwcedgvchuoh4xkc0i2y4kq8jwx83m59dt9w2relgmpfdeixnnzywza2y40lcxcrza2665p7cosuye1jbtagv0aa1lsdad215ny42o9xncy4b0t3imgtzgvxzkiyqzy9h862olrvo2guid4g0gjfza7qn5w6hih1sek4k7eplx3uw845zjazaee3nv3x8ku67hgp49s8om0vtsnp7ymeeghm1ehfxfsb01cf9hdeh6t874l1ytjvp0g6dnyyeksw89wq2nl105dvlu9nspxqf28kwkyfgwot6u3n78n7ub75v9ye',
                mime: 'toxt8xxdt4efnqsty4d3gw7i0cz8dpiw28tuu3hwxefob40gyb',
                extension: 'baeq8197zx5l7poxxxssaiwjx16nobsgyj1pz4cy4ydvs0ypnu',
                size: 4873710729,
                width: 882595,
                height: 296406,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'oorlk52ja8qy24agglqk3u1t3doi3hdnulntoisbl82ti4n99pjfxuusoalftn4h4pvq584lrwu3ffng999virhiam281x8n6rcopvji7lqqbtnk5facvx0w65rncjcytl0mao5ng0545m46h6sor4coklxkwzeuv4w6atmynxzutczu032m2u3zbd3rgtqieydeck0ii8mcxqtp3zx41fkpa5kvx22ku1zpiyruiiqi0q5zgxdo3crb1e0w8hy',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'mq09nk7vv4fscph0jqjykwyeg3sagu466minlt63ttn6hovj4ug7ihue7x2t52g1oyoner8ip90',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 384966,
                alt: 'x1uox2xbfle72u8zj1r0ts02pbpmnrp6oe40du9fplnvjomeywisixyltmmsv9jbjqo56njydjyflrjtaa9ywgx2in4egxs00pj1xgzmqkwwf3sxokirg0ncqpslyvdnvnv2pojse17ns6yeg43tubbyxrm7f99307ex9jdtlkwhs3xt1fcexhtz23qr5pgeiw7zbuce8lqn3hpwk24t05bietvoms67ffsqq5qq7aqnak2b0283fjcbvqsquai',
                title: '5xgnr9pu67r7w8o83ue4bakwcesomhew148z4ooc7vjlpdn9olwt9i6z1o5f5iworiig474t7by43abk1l3joiq66pn36ku0vlysnwckzw2d4vweohwaewekaq3vu91ybxedmop4bh3x4sykzzcr7flg6cogacg0pe7ru4amqggj1rbnyifbymgg69riee7g5f9suhlvwmzxm7s9de4v6xvozp681m2zaa9t51ixqqbg9lzm0tz9xjlywlevk7m',
                description: 'Et voluptas exercitationem non repudiandae eum fugit similique et. Laboriosam veniam sunt ipsa eveniet. Voluptatum veritatis eum officiis. Vero fugit vel ut pariatur. Placeat eaque culpa ipsa sint molestiae non dicta.',
                excerpt: 'Quas sapiente impedit non sed vel tempora officiis consequatur. Non modi et debitis fugiat et. Deleniti laboriosam rerum voluptates et quae. Voluptatem temporibus nihil quisquam voluptas tenetur asperiores et. Commodi quod porro consequatur et eos et et. Quas qui sit nihil.',
                name: 'szoivaqbidn3s6sx14kun5nta7x3ke69wuk2kltc1nyvnakpwghk7fsk79t7sdf08ih5srsbcb6azrg7xeyvsb303wfpitfhaa6vos6rlgpjjai8q6eagiuf42pt1t55dtkszwzimdkvbm4182h1omdx1kzueo4n8ysijawyse2sdhnafqwoqj8a5zwbjwxdpbpq9z3stxrohv62llyshbwi4zvxpme7q8lbcb6aogecshdqtn71c0fa4hbfnrq',
                pathname: 'e8h50s1pk4ttb4v6419vkpd66ccf0eap626tegzoexvt06cym1bh1w8wqy5jkpma81viyhgk0v6ydqllkt8o8d00jh4mfyibivt1hie8a1dh081wtah1dfnt2vq2y58re7af7plw8e9pdpe6g4wagbxmtyn7rtwjwn5766i9zdg2mjlbbpmqz25m9b30xb18g34ikgy67yt7f2sdfg3s9bodh6fep1wyilacw6tgu4o1v5m5o0co2rr9vrvg3cy8u314f9aa3ka2hu4fgy5a9r7tr7ghtueheynlbc4ayapcgy2zvejjp5h6g83uo4e3gvvlsdr352pssclfo5fhjsm07j5bi0cu32vr9r3xvul1wuuznaqqm9z4sqhdjkyt388mebw2lesbf3pt0qwyeoqvow4fmqkqhq7oj188fuy0yybapkeu2eoa5r03giome6gdwbl5i8toy71qjhlbmbiz3xu396zo1blh8ozgt65ja438w4uq73al8nu4ss9lk1zqoqp8eudz5m0abhxjvvkdyti25iqcpl8xrt0pgtgzk6hlnwpd9nkiqfxd6br2y22bvc9w3l5g0d49sgt2zdzbv9o7yn7uoc2sa1f531tslzg3hojd7i860zdkw9kjfpr4z46svsgc23r4rwqy5ffy2uueftkos1ih70q9q533q31ikxjtw4w0gokifrl5xt8un1p4c9wtpl5idqjmvg3q4hoq6vihbcwfxhl75vo2uy07zep2f4mn5kuj1ty8tu8kupbm86jf16648nnox05c0i6ckqry4zqzh7hovdn03xw2b42zcddgf2rda0bhqvq0yvd72wpzqxkodd7bli9vgzw56mimf6u5dnkvqoxs1b8gr02ouxmzkks8tcgwp12z0dp7jtvi0nc91aag6h1egy0v3c9nx92z20qm0vx4xjxedad4ms18qr6tmik8r1ez3iazad06hs47xy2th8d4b7dp5brfjldz90p7rhicfveq3zqj5ltehd0f0l03',
                filename: '01la058a2ko43udaagfwarh126ijhf27w1i5qcgge8bs32hz7xcr6pwjcnbcq8zo1l9estyfah4xkq1mgu82fh2tp5p34inpz1hbg9aralk1gdvc82h38v3d81822ibz4dv9rhp8h4vu6snoh7t89emtpolyostse7v8c590n39zwfmzdekg3wqaqk4ywwxee3dcyhvuv9szz7bn9yi19egee70a4wmcau1ud5148l7gzhnw82p1s954ibo9sif',
                url: null,
                mime: '4pdjje3uspotldyj1fdh4e80i6jkq75112q618t2xpkib2gsaf',
                extension: 'xnro5rfuoqpkfvkqr1tw2vxzau13jk0kqeyqat8m2vc1hztdfd',
                size: 4701277917,
                width: 861720,
                height: 926620,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: '91bfeu77j144eyk1ia3ceatiz8be0ebfkfmv4i6k6dkwhmwr3njy0asbl3ibdyfinjaoort3hume3kqgn04m9qpqt3h7t0k9s5y1fbbr3j7jh62gc0ovho7dbbz4i3t7zmcj6wx1hr40enqhcr1vb7lw9g0jxfexvvt6ry8n4i1fmzslmwa87itca61obasvn6zpcadm101mb2jdn1top33dxj0uwwvaqpj872ri92t1ps896sgotfixwo7ilby',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: '3gue1why9s2j38jq0fkj4tz4fnp6kw9s30wx6p99f1gim2n2ody0zhhiw06bxsrjokped2s84n6',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 737368,
                alt: 'jwxoufl9207nws93wtitojl34xh062x0rduq1t7liergbsiq71710ptyfv30lckcn73n0ef5tw3n87zktgu2q17y52qs80x4jgzn1xwl4svrxy1hxi2350131za7ggwl1wcw49el2r29h2sg65ageupb2src17ggflgw13f7hldr7xn0ih6bpsvc2ocovzuj27oarqhc7rgx5kfq00b8gvhaj1r25tvurkjkpnkywd4iskt6crzzvreiupq1l9s',
                title: '8vw2d4qq4408b24gu13vxdclnsq2ynjwwp1sx7ursyrqxtttz7dhxnqgcjnfgks9b3lit2o6exdhuwkpqinsqaenkby26aotgwbsxfi3u1ozauhiipv6lddkphaz9ateolikdoqd1nimd6ru7totchypixue7yb2q7xkilk5aj974ywbqq1zxe0cruvln6v2f34t24zzgbk5es1u4ac23ywns9u8t9tsw4ozk2khigjj9hxm0tafudilhylod7v',
                description: 'Dolorem enim adipisci assumenda ut sit. Sequi aspernatur vel voluptatem consequuntur excepturi eos. Non ullam reiciendis ut ut consequuntur quibusdam et. Quos reprehenderit tenetur explicabo sed dolores qui voluptate. Aut illum sequi molestiae corporis. Quibusdam harum numquam nihil qui neque.',
                excerpt: 'Perspiciatis iusto doloremque doloribus incidunt. Ut id doloribus illum tenetur aliquid. Vero ab voluptas corrupti non laboriosam et vel consequatur. Est ad vero autem. Ullam aut non qui. Consectetur voluptate consequatur ullam ullam ducimus quia odit repellat.',
                name: 'ivfddt5ebneq09elus8gsff9uv67ni00ctu6sgaicw87ivevvhdsh298hcpeefv608ychmwybw2zehk1st3gl8lz24q9bhj0bd0vok6xul1ouwdkovnejaz4b8zn0mscr67xvp655xky78x4ffulk8p187luf0id4auqbqtm0ga27mtpj1s1je0ev3jpvqwqzsdsk05vc09ibxefc5685g21j48oo1ec5g6cg75eeu0vi1fqwrh6xvaa77w3tq0',
                pathname: 'um13ft3fucm9wyf7bymf36k4brnu5v3oolmp60s0emn5oo7fcz5crldtdavkfhxejapcehi5ewmlz4ego01dl2fufr613ge3gl80c2l79qzoex6nix8567z7b40kcwvw7exnhzcdh3nc1exl5log39bhw2bvcdlk41vxoyrkqnakos8s9ff6jl1cjctruw7blpey3prls574kwormax69mol9l3uwv4ctdnlvgf9o78cgzn27upd7d2gehnnqhljtr326ry081xqzky02xkqagae7qqq0i1rykuaejp866gssqrevovoaf3oxsv0el9x3jyglyuq8usss3i04dnn5radqbsix6chbg1gfursm17azsj0qs67iyb60h5f6wwuhfpvwwkggz8y63lazfm0v2pfrxnizeauln7acxut343iw1c9i7l95qlkr9uwsiiqkkefgtd7binf6dcfq94mghw2dh5gw4knox9n8mpl7hmetdjunz30fi3le1nonsihm9hu336luaebl75a7423uvk1895o3n0nfif2ly5o2zybezmfsd6x6ceifufqbv8nwmqfzlqmzhmwj4eeq8z8swn18ypqt20x6f6lh6h1wj6g4mrs2gw5xdctbeooh919p8jr6l6awnys7e9j6jt55tz3g3svabwv0le4x8r5p4a6f4a5xhwz1n51njqyab7pzisyodtrjl8rpn8tdf0zpi26y5drlb3pk1s958qsh94113eob0t931ibmaq4hs1fex44plg7rf74st2w696j9l5kslkm7m8d700wjpe04cromsemnly8nnz8t05jveahg0ycipy2jttk0dtm4e7qluff6uryt01bhyyz4jhbe7knepu7dre9gsojn0i90hqy171shhsj039m79i0rljj3yjje4mymtztitorzbc3pm6k435kv0pmbupkrzse3mpkz7mch1mkh77qu9xzffd369eyqreiq6e1blo7ci48kdds6wui05ro0335hwxbpm1x',
                filename: 'mqec7busxqtckgv5ovtu0nikisoetqh4wwbottur6xhwo2018c93syl323sflrshmjfpjulnv37bqlaitv4hnlm058teswg900lrrc9440z4ei4260mpds7yqj1vd7dfl83qkvvnaub39tcsgrsfomac1o0vhoosxm9nkrzz5pkgyls5wyb91rg6unqqsvpzvv1bkecxya7y4ou25ftdyrzh8pxt1wb4d9geto1x7ji4elntr27r507r0l17ql4',
                
                mime: 'gy677z5lhn0dze4189gf4sw5hdihjshz95cpnpx1qfatuic5gz',
                extension: 'x24e6w9djfr22b3cxoz5gjr45zoj1t75k9jap1tadmairq7mk6',
                size: 4020964551,
                width: 709115,
                height: 429254,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'h5e1zzaptfb1z06vgpqse0sm1jxfoxn6ukludpc8s2ovv2fw1l667irlboyqxats1t9k6ajn9ifoeyb0q3wke9sm11w8jeg99koj0egrxww4jaayuxja9wuo7hgleuavyt1xcu377fzyrip5s5rybdfkrh3nqhv0u11dzxwrh3yfs69vg6lhh8fn2e7ix9q24i3mntgvs2gijoxg4wl4r4widdnsiyex4pbp5nwj4j4ut5lcriadjxtzfrajxcr',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'ohr83ety4zss2zidn0yei8mdypbc8gdxvyyi11qssnzzxa8cqcikk916wlt0vf1py5l9v75d5jb',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 493654,
                alt: 'z9wstdrjf7mh6iwenp4ypv4sflbocb1u0qxf7frm9gt4r8tvgzc4lsgjgbrfk8266o1mcsex53sbjk3pyarqwwqcrutj6vf3w9vqraxr07brarnk6w20gvvle9rcve74qhykt8grp2f1f4cukejwzjyb0thgn7yes1cqxxqeo3w95wsinse8f1r24fy1k6xwsl74tc00wra3wktkb5v1yh56h8nc1vyd9q3itpv8o9d7v6dmaua3zxfsyd87rjh',
                title: 'xrfmia5g9bxpw5go6wnoyxtofdejuc6yg28skdr6g75ehdhi9qgqkwlxcdcg50cgjz0coj7ke84iyeb5xjue93awlgfhf6v46zzv1mt066ubhl5hhp3mg2gs0tqggrn69s8m1zwo999fyvk1knt3zb1ntnez3juj51gqny1lw53ylr7ldkn56pj8ar9pthdty0tceuuaouodmekmff8xm40k9xhhaze5wos0v85cot57e01u7sxsfhl7lfopnck',
                description: 'Eos et similique. Quos soluta sint ipsam. Architecto quidem autem aut sit odit modi.',
                excerpt: 'Eligendi rerum cum eius cumque consequuntur dolorum reiciendis. Quibusdam assumenda harum eius aliquam eum voluptatem aliquam est ipsam. Voluptates eum veritatis omnis. Nobis dolores molestias ipsam sunt et optio debitis non vel. Soluta eum qui laboriosam.',
                name: 'puuk5ww4qef387902g4ayt2t7pwh4wa7xavkf3zqq96qv1xcska7x1rxn4dv3omwk8j4zarce1d69upugbt4e4x830k79nr6vq14dq4756kvxdwxrawda0scce4tc15h61asfi88l07qllrcgy35n3c1meu7v7fh2fq9tyyflbglfo79tix3e9qwrfwvzycg80570l70f1tomjblghqq5dkf4d1kplxydkevoiyugvwta6n0gm4tap8dgw9e50g',
                pathname: '774wtzuvl5fze9r539a4cmxblo1kbvz5ycmlnq0768yrr2jezvn21wniidbx6bt6lhcc5zv8arg3gk12xei21l59bojfchmq68ph6s95tqte908ji5yqbesa31clo0j7ozlm50yje18cs86exjb1f4z6laki9buu7stioqhiiwwt3w8a2afcnv938ff7q97tc7ow9tawb72fuppfu36df2ddon4rqoo5o06d1flojvklh6bm41x64ju6mfp9miles2c9lya1zostg5veozce0g1wwljtmd2gng8u5n99rpdwb10nxtk8zfr6pegpabwn4ut9pr2b4h1rzs55cszjpe3ili13whl5vls7qhvebaplc19tlb0y9rxyhp78o1gohsb17vdzfne7ohortl0wzmvvzc6qmm9ehjadqy12n8tlzv79ufiy2itp0we25cs2oa32hk3emzm9wx9vtf8rayti8hvb0qjki80sazsr087dblo7xgxvtu3ayh458ssm3yjbwicfh3m3w0sufvd1srm3hyg7m3upeelkxo21kul4tniixt9agkc8acpwdf1sv2wiks4nqst3b6or49fusr5b0qpenim51ggtykr06cq9g5zz5129002ctv93f9vgfdwkpb80o3nqkya7y18f2c0uqr9600imwgcnj5s2c1b7du92lmw1e5nvq4d8ouav6kfhxdrc7s47tir8pks8aiiyqvl050kkpg69psfej9s2p0olumm4sop5bf5tvr0wxrjvhqyxdb53guizuutyqdc11sth76vwui4tlyiqmfx52j180t86y0mpqxbpw3arbzcoos2adrb963p14e8iu9y0vxsg0ucwjoc1yxyxqfe55gtoysm0gz6kp28a1wbk4u7bky0m977xbia98l0e00oibhpjo0kppv7zvabhhuzdhw6kumarp8i4eibcimyp0wx9z10h197rauqgb8dl831huos5si9z9cben9amzjqqzvap8cupajozgh2w11ns',
                filename: 'y9dyuxtgfif9h23oqns3506fnyxyitgbh7577awwr9hk6utykhopos3ftcg4grk9puqj480loiht8wv9kk6rj8g4m04dxgztu8w1aig1lt00bydsnm90x2i3nyktucv4bfzexw647p5os8mjswgvvhoo41qaniv1c8pplz2d4biclrvi2ylf3tp8af2z5e0iij3ltolu3ersbklb3433prwc66k8v0b8ssxjweja5tamp6y6eenk7y6e5w4j9qr',
                url: 'cdef3k8uowh0mpckuzf2dl7qmhg3uzzk31t6g8gtqpf3b27zvfyt9slldtb4ujw0l4gyqb2k7333o33qk7o5w5ijqugiiajt3ie05s5gh1k8n38dhspyd2q4i5dicxsep079h8h6if8ed5n9b4289ignldr1m2cgo466tyg27nkpnf35qdeo47o128duozqargh4pwzyexbzo6qog39x3qn3zsoav9t0qpgf5isf2e16tnssfqka5bcjnrpiazgeyyid37f0hgplp56mirmdiq75alfefc4e0pf42x82715ap125akaw2dvtdsfwot8kfiagwno36w9n4mfdxvku989vnq5oztalejkvasl17tyt9kp0suu1tnkwch7ixznagh7qsqfcksl6p8a0a0otf4sk1adv5rks32m0hyfzew3qacy1b0y5ve96ovt3828xj09eiwyqukhb7797lyojr7s9aabfhm29tjaz05uqkupwp30widf3orwkx23uzmnpf588pq8dgpiuy6qfg301m0c7fo3a6beg6wsiy099x6l9n1hty5rz0framln38s3eaw6viwf9bukrb292p6l1nbybymyrmvz1kfwr0zax50cxgf7xjbm5msl7cvxg7t3x51phnfiecbldztmbhh0p6m0spszacscev8h2ddaryhwqofttvldygdd9qm7qqad4sm9mgddlsn8yo6nq6sroizb3lu5ndk7gk2wprgoit53vb7k7w00dimt09sriye3uzfv4nz1l1dcrbut6z5237iruhb5vmduen7unfx2thpferkewqwebk0qtiyati2hkpw1cbdkxnb9r7ph00ftv9raibvif3dha6mtnwxi7fmmhnhmrcft9pv9kvy03hi8iwfqijvv43ow1rbmfdk71559p856gfwi053b5h00bzya0jlcn9tprpvkyiu44scixe6h3arynruvg4ll530fyi8lx8c1oggld7gk3hjklxwivn3uekekzphj1kckx8sgf',
                mime: null,
                extension: 'njqrv1bgoja9cn3tl4svoqqbwloa8d9unq50iw4v49z8a1f99t',
                size: 7004352970,
                width: 728555,
                height: 178889,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'mxj97ae63u118n4w72fi1jyrovw32rba75nwjd6hypqma2gqq714jwr5kb4eph6zmotmsz19np7sqhs37vbn9ftrc1eef2cm3879p0oewf3oe5lsd8d7bobt7brhjov6kpbxc18h4lmc7tr7fwznnilx9pj1h1of1b97vxdcas2i7r93l1b7bi82ouvntfssmqv0bept9okglyz1f7feidxyxs1mqb0441ld36pbok5fz6kmyhoftn2dv60rthu',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: '9ct2q3knzyrkq4vmofkdym3iu9v3j7qdxdvzm4fgv8b3bajqh2jdlm9iqq9d1pu1qbukmjk27e4',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 844509,
                alt: 'br201q3dxztnrp0xm598664igqzfxkyapkkxxaj4xhcqfw7r8xy6pdvkq8wvwxl31j8op9fbip4emkyr0vk1n9ysqw8ofs1iefd7mv1r08mlxswxlb8euay0sl2xg1702x8wp4dj1dgj4a1whucl2ydmmqz9ea07erpnimat5pr9b4t6bhzoqhk9vaj89rv5lavklzwborszv2rh835zpv0datvnxmoxe6tfokk89ujq5expzbv0dle3r6pfgcy',
                title: 'wf7i4ds4bcmtcc02wpfn12gmawikker5dcv8awhzxooj147ld9a5n6mlpacboxz7ahk6zgh7a4t0dspun0hvqnmqh4xiqjw1mlz7xxw9wmgispzem31vj3k7v9tec5jv1s5fh7wnkt0zxdvi7bjabud02spxhhumfj7xbc3z5oh1qiftxfd7077ai5pjtso9sqsc30tmvxqvqnzfah9voo6saygrj1i4k0gcllxf8qa0lahpwfod60hnua5w45u',
                description: 'Voluptas doloribus enim tempore cum dolores magni voluptas veritatis natus. Quisquam sed velit et praesentium in neque laudantium quis. Ut voluptatem corporis cumque sunt reprehenderit.',
                excerpt: 'Expedita nemo voluptatem nihil iusto et. Et velit praesentium architecto in corporis earum ipsum. Iste vitae velit est harum assumenda eum et nemo. Et modi pariatur odio exercitationem non recusandae.',
                name: 'vzpcpnelgt1avpjultusbm7ytur03vk4xtk9ydjpiu5ykid7vlrqmfenzwjrvb4xocv6h94u0l7nytfxofjytpgahgumw827f9vxoeyd4bgn1310m8vurfwej8s6oxmpd8oazq9mx8segqt191w5qe4enap5fi4sisu4bspluwn9beat6g2fe1mj1gpgfnb854bbho9zhy5ubb0k18ntgdu0exmw1xz1iaht85xq5mqt8vo9g4olp4dbl4pzxtj',
                pathname: 'cgc85fve8647ghicepkeep5l6pkgakqplidbrcoqkcyv19ynrx7qx19gl2cqda2nmokbefx50t1z8rtzs9u4av3qu8983604hssqhimu72sktcdhjru1rdnflwswdlnh26ej3lkkcr7abt7o01uxvul5vtrlfilyrj3azg1mm7iellcsj3vso7pnhi539r9t3cfbw90cqkmcozuanj6f6g66pznxeh2rnaivq51eeiamnurmifx6nke216n8lsto10z44humf7plgxn7tvn62ow98x4dzmwtsbop2icge6b7aodjgp7pvmse9vri9p1smvck3a563xkcb1x2ngfi2nbhd4m7ryy1ips3wwfugrb83tawrri7mkjjtpkh37oyc4p27jh438c09m5tqfjq8i3khvi92pekltosek4b135gnclbr3rs3fmx7rchmq7fmwfrd68jnn6o2zghq8209kj1riovaw022thtaafs7r4tmy6flx63q6onx4j5dpi3g630554uhlx62m9xw2cxlf56rsycqxkm7u0em9h80y6s7eg2tbi07iholg9r41241gbb81t5k7mh4rzc72upn4miqbg8xhgdjd5ytu08jr8vczjh393n6gkxh5hhwgoy0etcz863knoigo215yfabmcaruwfnij2b3dc3avd1tcns84h1dm00x8ikjt7ew58h6x25c16gt4xjmtcbcsqno2ll1syvi7xj5q78s0hd1so5evaya3ql0n0ohxivh9peg7aar7w1jqyto9xnohdp8tc4s36158r8vjiwfh7p0s4536zttpk9sw416hsij091y1qkf3slrzhhatl1sf1mqzx2k9r4el7zvee10rc1ov861gmhlaebijo2i76fz0k23g4sazltylvcwkwxxq0mfv3zdmxh3jpxh0qtrs8gyqn7lq5u08vf6w5qfmtsra90jd31o08jmjfnwc0eg9dd0dbe9rf7pd32o9z2mdtqib6savxefba0bccz55dzjg8',
                filename: 'btmnlgp0zq9sp6hytj4cu9b838ykl9iz912ro8qxdo5ntdhtscwtoydhexnhbdnwgjf8kmnlpl32bg1z6l3gx11if3v9cg67w1uuyg8fyqiy2if4znoej1ttmma836g7c1k3cczv3ey2612zb08q2q3zopzdvcyp6y9rxcxcdsh9pszqmu1oxeu0k84zimowjc8gwsp4dz7ykuik116m6as4y6skios0b90yjgso030c8u6efq8kwoxz7l4csfe',
                url: 'zcriw8iv0wlsbufi7snxt50w51n64y209zbq6r7vo0bisuei6jblacf2su4xxba535caiyqoayr494e0sdnra7deg7p72hc8d2y46hc5m9ghihiuq44sxrfofp4uc460xti513c61u7ckz8b4ioj939vigt2ztfwhvbgjsidn0pyiichkfctltj1nmqxabmys9jbogiscvswwiomkjxobhj2qvd9dkaqd15nmotqz194g53smy0u3r3jrzbtzn12yudewryreyva74jhzmx2zol84xbasufbb148wak5e9hxv8l5d975iwegra23jwjhps5oxk8d5504q8k6kai0hwmcub8jdnax20lhljneg5nqvmkzh6mbsomkcc7ioj5538y6usajd3m77ud8nslx6xv0a43yzk2ml00pysvfmu17be7sclxbftwva966w6q3g9aqsdn2dzkpyvussvlhd84qj50r9o7br8mbh2je7lyhwf8p872h5q8l1hxvwcgcdg2p6nimzellbyke7fbfcl2y5qs2r6l76chyvwy5ln7ty8hf63qalp2iw9epwbdko336e98q6nznefea87xiz5pf55pho5kh2nsvf2vnf81egzwmtt2pi99kv9uuefcqbuindma48w1was2q5hjxjk833vnz25bqkc0793icr5pfr84alsgtyim6rrr81q73qq50eqavov3mll0qyfji9fg0fa54142sxmc66yck1a0d38lf0igeo4i9x4ktzxtvpt93lg5r6wda8qbxwq0yzc3za6bb675xyit1xz3vf6of86yauvxkqvj8capnufxx9f4bmi4ssbs5tk5lr52acmfwmddgmij92woq7zibljlcazx1bgr9xi1947qdkri6btg789rhi0gt3598sxoelkvf198jvlnv95y6ku36zwxicaj4bvkuo1ocsmzqtw6aoofe1mwaxsw3gtos3m9v2to1jji731istbbc0o2b00ird2vftafe8wdko2n5uhrf',
                
                extension: 'hyehizgve2g9ggcpor8605tzx76yi1ciprtj9tg5caz2ckdcjx',
                size: 8682197582,
                width: 230118,
                height: 154347,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: '9dgx3y2rj6l0ski8feo75iyklbom1q0p3rdw67mqzgdtfdo6wxwire8c0pqz8thf4zhragwvznzcuxqxlzbdy7gx1vcwdlgktuo7navljznvdeiedyxiejfteif0xgtez75vqjrqpgoz80wq5yvxn1n7umuxwh8sorz9vxczmfzxtkeuqnoo3kqmbro892land4girmu6u51rke1dv4z50lagq9798u1t5rndfex5isezzpuii3hcof08vj0rir',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'slc9y212672ejr28gzobexf40bdjyqkfk24skk44pn48qj715m8muuuzqfza7k8hy6fehujlz7o',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 952718,
                alt: 'udlofy8qfx3fbs24sg61xx9fc3cac19klhsbf8y82hg5au9ai2t3xsjtvmtt7em0dyy4m2wnxs9etyg6dbfgu2f8zyfixs7jj1n6qwvjid8ilzna2agi9gcrxor2n5squw2g0apzvzbqzadivsgebeea4ktj9x9bw0wwl9ea8fmhsixf8wvsji3x7hpu7cp67cvv8r9urfwy9tokwvhbs8yeqbotc51gavxrprdv61edlvls5vncwq82021vchn',
                title: 'f2hclxgzdbho7234bsn9hbomx55y1y4pi1ej2g5m4qf5e6fc44xzqh2lm2zi0opubufayyl6bjlsxs8ty9ymyiqotr1mlrlvdnhkqjt8l5hdem4sinczp4fddmrlsr3kdlc7zomm25g6vrnajkasn1bg3jvfmxhzp5dm349p88krxt1wk5k98t3ew4fug78h7otsd0xwp3kk5ob9ha6f8et9b7pe0vtpwxlr5chk4339nxdi7vtgbmjih048i8i',
                description: 'Voluptatum non consequatur exercitationem pariatur qui quam et aspernatur. Ratione et est sed praesentium. Qui sit et delectus asperiores voluptatum. Placeat cumque nihil laboriosam sunt et dolor rem est. Impedit ut officiis rem.',
                excerpt: 'Et beatae nostrum unde. Numquam molestiae aliquam et blanditiis. Magni iste laudantium non nam dolor ducimus reiciendis. Id minima aut natus autem. Ea tenetur fugiat.',
                name: '90jrqielgatg6epqs39v3zinhhgk307c6rbqjqz7vcgerch4v717v9cw9aesf2bzmzmbi4l3cxhi9xiwfcneuf34r915p2dfx6i5s33ql8zc3nrsn9fb8lp2gfl6bmfq8ma4f00ptj5npoz9m1kuc4unkh8e9gj7xi7lu8goldsw9mfdf0v3et1ol0nd20taailm6w6a8pgacs15uf8egjdl4hx763sidcc7agvqojhe4aa7o5ytypmlgs1scfh',
                pathname: 'kpsde5dc9wsyywtsr4mvxjnpjpq0w3wudc2jlhmnhqsu1p5rbvnudgkb1cnzqgx0po7uz9crbqq4a14wxe4yf6wyjraohvmo31e88y1lpyt3xz5efu45qg6sene5uh11byy7hrl9vm2z6q28l2o2aigzseyheuh4m87ymfeqan228r38ufjz3t0pynb4orkbcs1whl3n9fl4ep8i0ttruywf76op01uz3ugki0g4wwngaiyx4kvb5n2qaencua6tymqghmci1rgoetgzixsoq0linrqv89zp5al74syujoh7i96n6eynkr4expcsbxa2qwge4mb8av0kxiobu5m642j57a98uwis4z7qzscq05q86i6lgfk1qzupyucxrtnppp3i2icta5wex0okq5bfav5g793p3e0w6yxdmnl7zs1x44zp4v1h9tc0avveg9yc2qgji10v37lo1sjipx50ezy176kqbuc9yiruepfk3qfrxkz6q4z9s2lr6cdijwwjk14jfyxt5rwp87bwepocrwngquz5556ietvaqs1m9non18aii1euwo9heaolm7g6dv7akp4ezhgsun6g891e59ve9ad16875fyiau11gjl2i9wu81p5v1q0hei0d5cxj1ta86g5ugiwcu37vo0mfyslt53thcajy0r9blypyuy25cxl5utuma304uqyen3dakrhefa6tenzx9zjozs2wccb19529qms9hnlcsa4pxvuxspvggyx8brekvrjk62r0yrgaspkmotihsfpc07nji3d3crxw94s6xyhy38os7ptucdrrtvnhrgawyrqvbvwse7onsvmznbkxma9vo0sxcb4s89baln7h6rgjq3nd4j8g5v3ds596qbs9cj296wgdpbjw1dding5n9x4d1e06q3g359ywfjaij9m7q7in1pwq52i9804uez3hm6x4pw6w4lum6ru0m7kcknf2mzd276pm107lclpm6cjdkfzwhyc8m2rhn8fs5cqrg6a8pdcv',
                filename: 'zbdaz6fm9j07tkojynela6giyxa99eqh9wxcgz47rrj4a0lf0zmpsjet131nz2snutg94igwhdfoc2d1aocrrq7bugcjvhmadlytk3xxowfdcnrmf0ad4aqg5708o1w6iztif89b5mhp13ubdki83fnp1zh5t8d3hhl2qiew5y76f4v1t1m3nj3lwz4d9tuqdo1zt9yjuac8nanat5hmhlwr8xghdbl4a3rmwkl9nd2hdoqvx9sleaadifw1b8z',
                url: 'lv1icgdockxurdz86qt4fp8a78wd9kagibjrqscw1b63lsi0za8m61rlqtoxto7lz7vbyegail77kr3z3qc28j980f5xi3reu9crgg9d3sbpmqik3uobvo80fyapyepqzveffbt11u8ddscs8q2wlsqwhf5vt4r3w6h9sc2cm3x18d4brnfx6vpzayrbf2qfrwweul6q471mp6b3pt8h2i32losqshox3eoa1mz49oihjbsqu84y31k55pch1j93xqmgapvbezhgjuivm9cu99dm6bdvf6r9rnsskoceboaeglqlz819qqfkwcoc98hd8jiuss57nz37oh3sh9s2boep5pmg4r145sx6naf6ck9nl1g5v8xgkxpgy9ollw11kum86vyp7orp9z7my18x36nrmqkvhq9259gut9wjkkulcspjv7e07n8brpk6lwrnqxqhcojayqbhwrdnr5j010l1hk7qbxevcompmdi74ms24vlmqtdpap0u24fpkfuo42zixx67uqetmwz48lxpx6rabsyexi3z4o6sbbyob0taupl8amfwljsjt1lo88cjexejvnaqyerlsi1pvv82m3wrs3a6tr9i3xggm3nq1s33m2dd5fen0xo9x4kh0d79nv5fa5m5219u03ewy9s51worhy5vg8t1kunae2f8cvfyv5d8s7tzmlnjg9szgdn67xagjh5d2jw84en9tde9o9pix5sf3lr5swufnu4hu1po8zo7265x2ork0uf8n7k6qiik49ftmctelkjka2vgh8mcw29r69qgjbjnp5aiur7kethn9ypg94kfsqfmkdw9gnhrlohssov88hy51kc17e0zd8m030m8udjtt9k030wty2l6rrc46xr1kigsxke0fvgzeg1lsnhpmwu2202lyc5jpbn6e1lhdqrazbifmvs20itz8y4ib4u86ayl0voqkrwi2amtssfltx206diy5pdx0j4epbwzdgubpr2wxnd67o73f1bl3g3vhl0fi054',
                mime: 'zaptg5bgefsrp51e9hmg4pnis7hqw3ih83w15r76heuze63k0y',
                extension: 'ed9g1jr8t2il4vr4yw0q1ak2wny4c62hgne13jq5tlocd325ij',
                size: null,
                width: 911290,
                height: 215695,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: '0rcqu0dl41ih9d1ygm3sjc3n81lqo78lkyxnph17amu69buhzbbhntmhi1z73x4cexqfaj6n3rghot9o821us7q41bfwlkciria1k86sb4gjdzlnd3h67lbutvs21f9uyzugoe73tb9ux3vg7cmffrvktjvpqjv733t4kdxab2qx3ufjzdqix0b72ubweafizmi2uchcpvfp1mz4bmw2sik66qskkhmldlume945yn78qn7i4jcanmsmzaap0z8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 's1rauxttkmigm0pmga3gk37ck15v8akx4acb5l78v6clwvoxanhl1g3lb8m7c6fn8hbd97ngvos',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 100144,
                alt: 'jof17g1z5m8vr1gabd7bqgd8bbwmrerhdhd8l3a3o404gp2mx5q397yx72qu4cqyp5wgb9e8u7ks6qk5y6dka7d8o7adolfnr477h0ne9918tkx3n3181p35es9q35ln1ai50hgfo3p89456kg5xuds7an79zgthtoujxy46anc5sd7kve3c7nsspvuhdqkee500emb6q7rv7yjpt4j8jfp7cyy4ude1m8l0b49q3kzgchfpi38c4ain9van2mk',
                title: 'qv5mylhiqelejxe7zq0kf2z3bg2iyqkioxgotpiisgp61d86qjwb8h4kopu67sh851jmj9axw6p1ys2x3ev41qozrk8lqmjnjdezfti6y3t8itqk0le0pkd1l4iifcgsvm9qrk4u3tyudfe69t2mbllvfmarwqxn3nw8roswmo3c8pn2yohrhmmihgia7y95g8zdf4wnj6w8ijtmjabmx1jzyca7ys79plw5ptp2khznwymlmvvidj01cwgz7yh',
                description: 'Sit in animi. Sit rem dicta eaque. Nisi non non nihil saepe voluptatem cupiditate. Occaecati quo occaecati velit. Consequuntur ipsa sunt fugiat sit labore itaque vel occaecati.',
                excerpt: 'Labore quisquam nemo autem et rerum harum repellendus quos. Aut pariatur aut nisi culpa tempore. In et hic quibusdam incidunt. Eligendi rerum quos ut minima et.',
                name: 'y9mlwbn5l60zm5ukereloehltvjwjnls43949eyzd8xmkd7xy8stl5zyqn8zskd7t926b5c3huzve7vptncdxb1zu3bkl733ze6q93w9b4idj7qpu8mig1t5g2qooqeb4bip21xqwkzzk34cevd4ws5ipcf9qi1jd1lkxizk7fd8e1dxzbh8i92ejw3c8q4ytgqvbmba6jep0g0ewf7utzsgf8fuatt541bm49jvdbl0tjgsl6avf74jl0ixwxa',
                pathname: 'x8tvzqj7qgwgx15jrm7r6i60qi1s2fi6s6a05dckzf4hm938zzrnzavmx1chxvl252t9h6e0hap7wqjfabid53h21mi9x9762b0jc8fempzps5yb0de7ya1fgoiltrm1mnbe5xvh88t9hamiksmut40n0z56x3z54g7qcrlsplz718kart67lfev9a0swx7jir77fqk7zm65tkq5k4qb6no3ndz8ogvqukq7hac9aaauxrjmtc6j8e0ee6wrjjls8ijqpqnonynatxly7db7wyu7jujsbijj9iz0st25gzy4wl3gu3nk3rdihfkq75b1ixxl1j3iojxfyhl0eek0z2g7rzv62f3sngiyr6a3bw1bt50o5aszyett05sit1xob3hkek7haulhgqqmocdfs4vzame09h0sgurygee8y22633aqppotbs88ejiaxcw5bng8rpn8u87wxafuqzbbloy9zinzaenl787qlyvuil1qm84xbu6zoexvzedjdz65o9jpjbi6k8k4p82xahskwy7ro92znfirmlmipgfqm1o25lthtjtinsshyxmfvpfeu3gcpscbtvto0srzn1id7uq8v8contcyavdm9oz92izg5kfis5exg6p2t7saa4zf837gqie5hh7ngemp0ow2c93ou15fkmrwn3jxtg5krs02k3rmcxqpuxsdz9c7ixxxwdeg0bekxybh0of53tdabh2mz67d8pseosn58ubvv49zu6rhlrmevobz80vcgszta4sjctrzz4l3dwm42vru3au6jlys0xx3hc62rbedk3ww6fk15xxyjz0acrr004s8ku4pocvp1srv6hccuf3yawvj2ob7ouaalzg8l3ihh5viexzo1pdd45eevqragz4lnvzcez9ntsgplyqblo231or7iu2ysjjubggs46z5quyuuxwd4yca7m86rcv8jbze22inquhf15ud68zgrikc4xpsd1g2eg0gfuic4yi58v2uvov5cwq7ryvwt9wvdk59',
                filename: '4w539kq3cbqjpwoouppp9mb004rxhts5bhcjtwrxsxoyqp8fhopgkqialygnl6pjn7xx4wz70zy0sxag0jjnd0b47yk99qns1vv4cu4iuel53thtkbrce1crbtuqsv5rdbrnqokfj0pjx4cv9pftbowi7369fa1d3kgs018qriocnqijvbxaouswuqy2jy045br3ruqdv0hlid2pr6qr31zlysh3weloz0qfc219n9zl3mksst1dgvj6mb89tmq',
                url: '19hc7wqtcz119x8e8v3jvw6tm98jci9ncnn9gbeb0b9typfgq2mq0g4iuufu5gvsc55futbm5bjnxzsie1gccffna08192jm19axf7jy4op8r4n8485yjdhr5rhm0up403wtiog9d8x6f7tpa7ht46jwbotwyyzjihz1k79g63n8de4ph2euu26agbbiybvjcoio3gcm0a0sod4ubg0jbskwqyq783bc3kfznemlsbjn1cepug2zvekph5xf23awqjoqbxniw8kks3zchlwx311of6v9h29740v9yfl9jdbdr1no6j4gwy3vczq6r19c7t25ygxq7sovihezmzic8sylxoaoem5sqdztgjkyrxfzlf7hf0xrjprabgvxcl1yd4v0wnmk908v9x76r4b2pcxolgzzduay0rsh4h540ygfjwqt5vb10fswyihm6mt4nwrlovhtov7ih9l1bxajb7cbtp21el5h9bwv5noayoq4p244zgug120l6i1e1fyn6aoxtghapevf4gk2tn14ze0i6yvfas868cmtonjrfc6uq5n46fxyr7gnsnf3o6psiozi2qzc3xg3yr9ue0dv90tczfapatim5k4828l4atjm545mf5zuxjxz1n3xqo1mh6r396w97xx3cbxvosl3u5f8lheknmbwws8v0418636cxvgb7xdutdsbm3wsomlq79ivtrjg6q6bz4g20hrgsu27wa1mmz99ermn9vak2dunenh9gu45igqzlxg9u3eo2cp8mx49iuvrzwef5d1vehogehjp0lshe1e8utj9wztyn79f7clhcg995hw05rj7k9rmz7t5od5l435f7bryeiczad1trxlodpab6k7ub7bw98yvef04yuznvytiinaubysi5tfgw03vuukdco1n7x0gnkip2a5gnlrxc56y765qj8n2z30nf3njekl1lzbetvulwtmtmxgbhictdyx6247oplii0i06rec0vi9x7mqixx5i3ph21joe0vgljfsn',
                mime: 'h6kzoze1rhwtqnk1dmwkya3cb5qf4l42a7buruerkzwng5zlx7',
                extension: 'jn4uzt5au00dyi1dxhhf725aplb7ktuvswjc0uzl6vzg5dvij2',
                
                width: 268096,
                height: 898505,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'lnm1aztpi9zq91tbv28ztokng6qkwxjsly1nze66vpw5t7sds4dwjbwlsbukgfj95z57iiemxhz291papqcku45dd4kzh1eo6sbjj47uhc91sk7ajtme4597nw40kyfafguljo6no0f1dyxs4ngrjsrey5q3jq18qaaqrgf213dwxiuzkumm9y2p67o8k8qt1854zasg6alv05fs7e1zvmrigsg64k8ggvtughfqzfs73t38e6kjjp539vggwz7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'hgpnfv7d70awoxc0idjk52cdk4s0y9pnkiyg4',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'v7995orawo91gm17bs0kjwo9cl96fndoo1yczagnb1vlaw2lacmou0qtvancyb3tx0ay16mbq0t',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 195553,
                alt: 'chck05rfdhajlip1ihymazqb63d43op268gzx47l6v84dh9xv518rpiiptd4p9jrbym647h1xy4p01mcd110nrhsnh83sqx8lg2ip22lgk3w9c4kdm745q6nfdwaktok1dx5whp2xwry39oniwcmyd8kp1tki1t6vbs9ojnh8layvpqcy9r90r2nqvdgm5esilo1hv21d69evetc4gac6vkm5yejs539cm1ldcfb7m06p5yymd3a3ciqyde91cd',
                title: 'u0o35hs7cbh905czwzsht338jtys165l8f4ii97kf2uwzp4pubmo415rg1i1mxj7tq6hfowl34bfb5x7aepejzkivyhi6zz3exlkqo279el829ste97w5bi5wtcl4hph7az6gzzl5dp6k9pd550qb46sigpa1d6ucbnufftfpwrl93216niw6jppdmw88kfbioi8hj3p8frqu5f7ku4wg3vgosm3oefknrorg8rfj163hbat3aofsouych56vrn',
                description: 'Sunt nihil fugit. Voluptatem velit modi omnis. Ullam beatae recusandae in vel qui.',
                excerpt: 'Veniam itaque dolore officia rerum non aperiam at nam. Et animi repellat ut qui in dolor velit ipsa consequatur. Ut quia id voluptatum doloremque beatae architecto. Tempora ipsum ab. Et dignissimos non cupiditate assumenda saepe laboriosam molestiae. Eos officia accusantium.',
                name: '979tnxgvwd5ksu1dnllvzitsj7vienu9rd8xf06pfc3rijufiucifaign3f54o5l5qzs85gqxub6nr0bechps3fy858nmpq2mk6vduz27kxm5eh7e2hgmx88p42ol3r9jrkohyiz2lc3ays0irwo9zh3ovcw23dz4yp7sdy90suc9y6ne5d0azrin8oesvspgtq5yw9wdir8tsg0yc3pnllm9lkcan5dffly5gxkq07bok7h6ub27uspxmriot9',
                pathname: 'l6qoc5bdfqpzez1j3uc4iyjtqbp9r12fro6hxeosur6r05ohtrcr31u2zwyinhr7zqw6f2fz4gx6nw10o5ywd2mee64yw2bvi2upcxrksd5lnrzxy2s5onu84cmvfj3yyo5ww9ed03rz79q88ase8tihqxj8r11d0euim3a9vfysbimsxq1b8vqtwj6790n9dlyc1ox7zco5bm6djax9ef5qbzholxo66hz4uak1hs7cvk2ubdsu60o82ev9rwk6rm28evaqdk01690rh6r0yck5dqd0t63ew72chvfq2k3u0qnlec38kolasq7brig6j060m6ac1olmyyqdlbka8x4y6j1mjfu8l4yr5f9tm773e96bk97rf29s7cgfsjfhcioe6izqav526mex4svef7hfnxu3i38a4cwe2gwzqbb9b08qdu6m39wd7j6g9lc325z0s7hzwltsceunes5u02dhtjiist2hcjfc78a9jueron8tpmh1w6mttsua10203snacoz2mp3x2s6m7nvn3qd3555re6drtxj28h3qqtkyrxv2rogcbhasr1bk2zrmge344d94i61kf0f68d4cpx0jqtjti7osrk6a3xtqw1h58h8rxshphs7e4mey86i1kgeffpi5zrk8pbbz03suf3744379psbt9rtse7j9cw5a8zdhq9bm637vb8aeddnbd6t2iig5ei7t24hvue60y0sdh7m944psiibk8x4pp9t4t3jx0vpuci7tpu72fidiba5jt5xuzl81ovj3iupzm5g3ioy44q39bp2jrz2fkpcee3v8jmlq6q78fuzyuo68oxxoexij5ucwvfv01pfpkvknvzcms7yy0du4mzb5b8xpmwh7cfui60riexgt1imukrf5gmgldbrcptwq0or0ez6od71l4030votqrn2dq0kk3yngwi2x6e1rt6mqkr6ip19m0ld8yebhwn8j33r9v6u12bpc9bzohcofx3surqwlb4wt42nbxug18jmbgs5r',
                filename: 'szz5p03qypxmzh0k1z3717qnuo27sh7h34xf8iuzjctl1wln4vvee153gn7wi4173kdb7gpm6hstmhcwyc4l0j2t2r77xsa9080c66fo0qilssjqb44y81x7a7cdp758n0geokzx50mqqzi50ginka8hq5wsw61bphb1zg9jd1kfwk1m070ufn41g0wvnjiy9wk2h346nbz047w46fku8uia7ts9y13eumgp2mniyl7uvprf2phhsk78pqmcqh0',
                url: '7mk8srzlzky8hn0aq0qg0ewqvliyy1lbexyt6w5ulhyse8kfcih00soe5ev7wj1kf7isehthpg43wr4zbe5ibexesru3cnh71efx0k35kg5s4waaei7d14mj0i3wje7l8mu5pptwfvu1jqvrsoji7nm3lr59s8jj919f6vdym9vp1lfarmtxovljwol3qtop3o92yp13y4pd2dav59fvnck7k1qd3nrjem7bhyhfxiqbj8wzvfbxbv4gi7rmvz59yj0dpcmxqsb5odiretk68nr8c09sktlx8kpmk1f2c1ksxucttooxidgrtmn39rj7u7mka9wpr9yd7hlv4tvkf8okwjtya0q6zduhf84xwk8lr5bh2i8leo98zcymor2lvqye2fiohyzvjreng182zl10nf0yulccsqqz3fhxc7mz48hz3e7cfrcb4mquodse7xza0sqiqp1tm2w95ra2vo9m0kddc26msuqzbcueb3smrb62osi3b9b7iqvk2rap1u01ns462dbcu55j5ee3537s7un1h266b8rbdn4o2hxkgetfvo4xcecvwy7jgblew33v3bi2e9p6h9bysp28r9gvok0bh0acoywjxisb0bvkdz8jaswfdf3sdbytwppkkw0knd6r8n4jv6h6v1hubtqpivvak31b3lbfwagkemp9h85gw4vrdgf7oxui2rn9sw1tvfrrzhia0t499wcfsumcf420b1n8njywbx45ziozdoo91cp6nv91b9z443how20wzibnrwz3mftdd3qrvwtlftp8qp40l6ml5a1kszmt313dpt0pc2n6nmbfgtghzkaeinsv11ktuo9gv8uumlposnccdru234bdbp7s0mmsszlv0iuvys0sraxwbnuk8c7vmipwsf7hfcsvzjj9u9o19hcxp0xrkfq5sm5nugfwtawewodpwqnh30traatkk0yi9vr2ccheq2nm7wblmwq18weuh1l2r0wyeju9odocf9r1aq863ikyh8fs2rm8',
                mime: 'k0odp110yjv0npmuy0eifbo2glrghm6kff9lojcmd60ujzbb2g',
                extension: 'vv8p1pnxbp4ae6jx5ja0099iht0rm172l8q08z4sjmeigymqbv',
                size: 1516372306,
                width: 227282,
                height: 793847,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'noo7qtc347tb5owg5y0a5fd6s0pjsdm5d2n1p36nd8yi3hvq1b3g7mvaybqzmx9ol94lkovukjzgkpp4k2490rgf3bw9vlfw0yafz6pcv9h3alq2z4kxsbhvfg2kszgq4gwdtbvwrlfkyk7n1r7w8yi3fhtxhflvq9qlqrivath92sz5j2givkxg4mtuhdmp2uq27vvnuxa30b24gufzy55mr5q9dqrq8y16tazaqvze59rdizxunqgg3rg6wpm',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: 'ai5vcwl18ra0wx4dxt5z12r7uacaraoqcqt2l',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'xcm8vja1dzoeyxpq73hhzni17k8if24rji7dfccp0jm2lp1m23swj5jeekuca1o6cxs1lj7yslc',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 957846,
                alt: '6wpz8y6pxlfuki99ghygieunuqk4m3zfsahspguhq4htq1an1aa1vqhz1aypzcuch6asz0epqvvs98gzc66sqrk8nmm78yot0ukrwxtnqevc3u48ikzje2iulssmd39azlbspskjs1y9rz21lpw0nci1z0biju01kewmux5mliz32uwucngl9zufo222sqtja1et236xrvcdoll018okir4dxoifvq636eubvhos0cpsmklbatuemobhze2rqm8',
                title: 'lc7pwtxpb03lye59qpvmdvrgoiw6n38vqviwh8g7iq3s2orh7vnu0t3g6axj3fh6q6w7unp5nazfrbpk82vemaoaljdikg0z8nbqzfczka4zo1za125mtr6lfsuxa8ec5ga8hw7xj4up95owlar3uie3r9qfbf33d5365h5j9wteoipxts3gkznfxpfhn4jmmnxhfrh7zxl3jvmizqwozh5r930cbwyi37kkndha2qgudyy7f82altmfsbda050',
                description: 'Accusamus temporibus quibusdam consequatur reprehenderit eos. Et vel beatae sed perferendis mollitia corrupti amet. Est ut voluptatibus reiciendis non eum recusandae libero quis temporibus. Ex incidunt nisi et dolorem omnis. Dolores voluptatum rerum excepturi recusandae rerum enim nihil quam dolorem. Molestiae voluptatibus commodi officia.',
                excerpt: 'Mollitia deserunt quis deserunt iste quasi veritatis. Quia et natus officiis. Beatae ea sapiente aliquam rerum architecto dolores. Libero unde ullam odit deleniti animi eos. Unde nisi iste nisi aperiam facere officiis adipisci qui id. Ut repellat itaque alias possimus natus.',
                name: 'bs552b5aq3vbwrjj60g3inpqn7r61bxoegklxu98bdd9yxa6cs8y1asg7tympkcbqmw2dw5isltxvw0izo6dpept5jscw0kh5rsvtaifhd06m8klyjsd2is4avhxmele9zi1nsvosvi3sgvgqbk5sj7aha0cdv179hzwedtcd7lfb470mlm6k35husqzn7v66qvx6kuie28mp80766ysq70wq9fbksran5t3eabce7cfphi3xj8999h4l5ft82v',
                pathname: '7sis1e7hz1wnm07zh08dbqok1psd8x95z5wq6dhos9i306l7fdgvp8zujbpw98kp01jvb4ljb6q0qmhgzdow3pgil376b57pmtfdk6kbuu1rmo1l04bj51jrsec0625wply5ua5hmcsuqi8iqgsuiqywkwrn6400sltl06xsspx6bzhpvqdujy7pwni2wvq2y8fkpymzc4z3gfrxxc96khwlb8qjxmbk095fsvd2o1nxuz01crgcud6h6ukt402xfzswwjtrhac15qu5sju9hcrj78tsomg3pl6fksrs4nsk0f46zpf30e2s3xvsddqigfd5yxtlxhnqggnat9otn1w48v3p6p2qizq2hawl9koczvzin7yr7lmghpl0redwi4e8ztp5me0r09i3rojfbyzlmjcfa4s7yt2m7lvkya0lzle896nrn2lc155jmx06qi0ejzid4fbzdfotbwicpjg8q016ni20ady7u9l2sitslsfg9v4gts5rikknvadlrnchbvm9iwkwwto7aikcdj9fot81jj3s6d3yl3j6612zto5xwn7mabmmfz4t87g0z849o3241izm9rk46w2susr6n38j9bijlfrc5t8uazma3tt8tfzkvq6uc38ls6zpk75d8iv6qshr214yrzj4z0oy9uxmf5nxdjmpvdfbzzk5tzq7l3pc9wz6cenbabzqb51qlqlx2y9rgveqb0649lqg3l1odjv0vtk61604ymxcrd6l3uf417g7ux7v87f8bul9kenrzl1ryk03sju3s07uf8pka23c11iqzddw3d8sbgkql1lze0bz98r9khhl38tyj26p2e6uq1d85kosgvsfgij9z94l4v9g4j2qfafxmjj5kc2qow0qn04rpubrwv93n3siye7vcw93xuorr5x4ss5mtayjze4e8vsz0i45gydgrf7ytpwnk3sxx4i38orrrawmse0kqnaujq6qr0td8koqxbu4v5gvc0ziypjpwnvursjynouddto2hthv',
                filename: 'cum71ge9s5hn5xekmyxrcrrykdkfhsojnd4va5ysovuidrasnmse200vk6gegatyf0zwd7p8b9npv1x2icrwfr9ayxc49fa757sc8vl1xneijn6waey7cmkziw9kdrx8qw2sqwtdmcafej1zeygbr0hwy0i7bbflijbywo7zpxbosdnjgwyifzxzvb3txr3q4fy5pcnq9mzxaqqutnf11oei8934c3g31zily8fum7797uud2qvqbyvueemdzj8',
                url: 'tlzzhpcke79uwvtfsjt4pnt0p3eutcsnw9ztc9rn4qvyw0jyur0dhdnbb1tg9rsipm619kg1irw3zrk9i7ol0qb01eobyisvcp5feq7coth07c5rf0z1w5dox73qhakoti4zsdh80mz5exanplzozvtw1wllyvg3o95l35wiri3bplw3au8pm7uec6lghhpwbyyt72xtopj2d9fzvtwgvt27omg3qmg48soke35nilda6kg78rj2biy5g8emr2gmk2p7e83mda0rl9pzewxotdtdsytrqne2ltdyjwjmhe1i98dk1mb9zeestbqdbuzr80xe8rnq2grzypbs950tjsrhfmwwm6kkmin3n4h3xys6daus69ar7cqq1174rsbw33279w7qjfcpwqpdljnrr81oic8szcz3aazdsgtxw6vf6uo6tn2381043cumdsymj6ww9o3cawh5fu03s6urlghb3fwghis6ggg0d549ypr3s7l8o96wfkg2oltpa80pb11y5jym2kjlne1sbja02vg7vrg6f948j8s8soyaemlg16tydxmcgn3b4tlg2o54lh0tlcb7vdf61tbdaqg4w7oth3bks551gvg9g97mw1j7tnk0i80us93p372ccreftmrczejpvwxaqdmalazi3wj46ra26k4htju4fnt6u30pnw7bx4vk8efk21qzqyo5iadfm8va9mp5cuiog9zgi1eus13mfg64vmfa74oz32ot0dk6fotg7f5lov4yjb65qb99obacsbat7lupcjt6beuc4cjmzdr1d2xh6vr73tmoikxt43s2uviy2xmzzmhl7dozta7enc9wk9e8bgwjikj01f8jprwmy99d78pbeceatqr1qcg32spo5kfaat8twld5d5krior7yro6678m0eccjc24w5f9e11vwpwo2k85h2wkzc7dxlqix7d49sii0tncc7w4suzdq3jbnc87y1cbbu9zzjnye58spxzmdb7xmlab8ua2gb61yuuaz9v1',
                mime: 'btq3rwcxll82z15ds8o5728mgz4v510odxys86guqzzhyso3eq',
                extension: 'hynfzvlf4nni7wzv0xkb0ob1d4kllhrozm05wl67prr1uiej3e',
                size: 4393093452,
                width: 577495,
                height: 436756,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'e9qo3uyup5a0y9rkt9xx0hkgkoi976djvu406og0dmhcq95apmz2y8ny0pv957o4yoxy3nnr9ide8x6s0ob6k69kxm03ijutyvhqxx95ob2dij9jk9w001e1f7r8y2hdnva24x20n482blycolc7v4svh084gvauuokfsi2nazhh94vk4zga96ln0c15mctug2seehal3srwg6jixoa6ad2jxrdbpijb8dpovv1cgk8o6y7znsxfwifiu2izbxm',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '9lomq5ddkajc1evceqtk0glafenx9yp4rbit6',
                attachableModel: '5wu739dn82cjiz7gt14mz2ojci4biljtkdyeyyf46fv6jzmrm925ko7hzzbumkorbyd947sk7pc',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 862056,
                alt: '9u7g76ovh3z8rhhqepak77lf30kk1glc8u1re61rf5lifzf9zgkid62ysmhox725cf5yhmfqzoc9nhjqykm4dbciy9wykx64npsyuosn2nu2rpwoim1h3ndro2dmbbr039zfg3113f6ruw9v5t1v00iv5mcgpu7l2k03k1rkc3d6q6omah88lpcitnc2e6gzamkyjblo5vnfm27t91p25d9zvgc41hcthparyprohrv27kqjbj8r4kloz5nkkwr',
                title: 'yddx2f8g7uikfby9crgbae0z58kgz7jz9za04ughgifvk106hiuakeygr5p4ki6fclh4k04u60csn4pa8rnwnmh64g9pmvv7hby047v4utc9w0cwayuy9foou935snm3jahmgpav9708vnmcqrdc4jp8prfd6tb578fwje4k1bxupyqati62k6kj9ckqgd2hxhnp7ka92w0cvzquganobote7lrafx1q6s0x75qzwjnutftkarlwn0d1j1c0dtu',
                description: 'Laborum odio ad. Dolore non vitae numquam labore quo eum aut. Dolores rerum et in quibusdam facere explicabo voluptatem.',
                excerpt: 'Provident delectus et ut voluptas. Aut velit in provident distinctio. Sit temporibus fuga quod optio eligendi.',
                name: 'iunkgzak28h5i9ay5b8zshvo4tpjph0fvsf3knm2eij1l5nl95wkrlx6oq9hqu6q8tx3xueud3bli3becjx54ej1ikfpyhayu19nl11uf8kxf1vbllifyniannfvovtrqkvo0lcji72m1bpbi71r7t3j8fse6a6mhvspya59763vfz08nmnhhdrevdwj5pqdg8rofk3far7eos7dd8w8fz3j5a6jy6nltc5uiju7p37pl92gss07w5vnpbklyjj',
                pathname: '6rtw44cjux4kguk9cx7vywivz1sts1wqsxml2dui2pa868kfstnrdmtwjop1yja8y4v8jcp8492ulhi27a8mh0jyp1n4vfzqvbpq4yn9023ji8w1w3xgq5jv8j04hufjyl2xfk8tkd1orguzq1qhzf26igu0lq33ny5kijktkrvqvmn3tw4wpebnq4th0s010e1hrz6ubh94xlq87e5krbgv9pybirhyl6x3yvtk8xhk87yr1htyzmojtuievme3vge9lqnhvuws1orki9t3k21kevsi0renwx1bs653ee6gj8yxuvn1dk7rw07whkr60nyfa2hsjrdh2r525ft4naq1iwiyjpsquo65oeiawbbaz3x1ghl15n7dd8yzvmec8w6c8d5p53mk0wlxzp98wmaut7jmfb0ldj9wqf6ahm7m9eqil3lxpgdlpnnuocit269ydmgf2town1atmvmx7c55o629jhgphnpbw637mtqblwienhz7jh90cu0iezh0sclxt15xwxx8dtrocf9wit65wqjg8vqtxrvrkr6kmzqk2f2sqzfqful07u7qxfbnnflbxc5ehzqv11mmcsuek49tyndnqsqaupumhklao42yku84zroqq5fwngj29lncb8r8cc8i43pvoy2uihw5u1jhgp5zs25a8har8xfc66no3zazh36fyx8fr088m4a7qd0wlmekscuhtmqlz69clbnaeei624hk5mvwgbc21ck58qz4gwotp6iepi38s3eopr6vlf36w6esxlcfpd5a240c9fh6l51b2u4wrsizqexzcizt12n3dj3sajyunhq1q1nt88qng42q3oospgqnqs8fkmu01c9u7wuio8xgpmk7c8k5p82u262ogh9kvf5dj0i63eq06r248lcm2z0eumobr5q43vcakai0f6caxvu9ywmur7wmbzgnp61al11ta4b1iik0h3qhzxb69quyqiektivqk5h5c0z3jhag7t25m8gntx6ldqsvhu0h1a7f',
                filename: '97g06atnz62ecc21amv9bvez32pcfoxk8n0f9i3vtypw1m0nuymxic0pguw8hnn6clemdx7udeosnjrznep2pek0ev2tvi0w5mpfwkrg5d78m0bexvtd578rgxiime34hcz5hpojkgxx23p57m3giev3ju18hmnh4d68xt0bh0k1c1mclpau12rrkvf6pe8uicj6vys4zyxzrjefuakbl2r3jjk3mkbg3u2pnhrulh24m03603e18x9ys6d5pp6',
                url: 'jr0qohd6hzn5l9l2qs8tjrs7z6z7a9okw73mp840k7rg3j6a97kry07yafv24dlxcqnpogdzccddxrp2gh1i3wu13x0ohcd8jynxjjapuauc5gmbcw03j6316xdvgojqu9amchtjuc1d9uv2mt5cnla6oml85efo1qerci9wcu53xdx213omg4bea9cddjnyr9ejzbg2xql3fj00xoa25raf51n3yzq9fv850cyxqmxeacwitt406hvnecc8f80jh03xx1ketyvuw93u1lpk77nrqm9zm8v8rqpqxx6yf323kt49z3nv8i72nswpeh8e4g8rfbq3qw28hyywdexk9kumxr73pie0qq295k1l3uxr2s5me94y9uxwqvg8yf8ofrkruk2w4sq23r074md3wxare4npewvuvayvri53o1va7dgpxe909plu2c5b0rsxzmbk802afyds9krnag3jp57s62u2sdgwc6nxjif8qibtn63j18td1nco7dmr3dtm4bi9a10iaktpx3qpzxcz7d3cxo0vwh53447wbittsfb55gr4keegj4ch1qxcu4o241img2a0thvz8x5glcmhieya9be292rj9vt5h49ioj7ra0zjmxkqyzwtjh2pig94wwl44y1b1rrmfe5nbdb9jqz7ggpjuy2xp1iw41da54xlf503agd40l3zw44ps5dl97gijtw58mys3q57vwedwm9tvup0ikk362r9s043bcuoihaz44340j4mdo0p5ue6i3sdney671gujj604nc52l0svmrx5r2pp8saxh6aaa4bxgyacrkk7ob7a2vtitdboc3lqy170al2y9o0kgfswazc6uxpoka79xfxxcwyys96w0pnctxtpt0j8e0ig2sax536iuls39cx2y10g9vwe6mves1ehmudy2abjt8zap88z42denj27shjd2y6seyt8m6ie8qhe0df8xzbpsatumfcuyhtqyncdz9b38knctlalkv2mj7evckixsfd00xe',
                mime: 'qv74yqfijva7vwz19d15lnr20og42021es9w8kljtt6roam719',
                extension: 'uvkyhdfliatz2bqze0xbunjsurwzv84nhmbsho6blq7j59pqvh',
                size: 7852463895,
                width: 479838,
                height: 462173,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'kj8sjn3uwmugvrdsfua9whfxcq12k4y3ux983o26ipltb1wiz9wlpe15cj8sdkufo2m38vxuk1yci8pnw66sbciws9orz6zr2q6a7a7lpsb25hwgnictb2k6dsxybdgd16lk9nzrakq5v6dlrzgdkbzmdb8v89l2cxouj41qgfvkj1unybat5tw5f55hlbu7hr661p3vq0e3yq5nwkc8sniws9nxozjeet63dn1jmwxyllejzxqzxbwy7wv8tnq',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'oya9p99yq6yzzus1l84yoceujzfl0740hmcbeaumv2df52o5jn0tyy7lag2ck2mhev9clzinqi4',
                attachableId: '2pjxuxuggdqm3r93ilouheprt2lue1s8uman5',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 771041,
                alt: 'ssugyd7nrkn4mwfakkxepuku30yrehhivewo0igdccgnzg1pc8vktnvmyly213b0c4p41flpdsqj9utqqzz8f5aoct9y3iklra4eu5ni5szs5n20unnfgt64dvmvgemjxazejvy1xbx0tad6yhyvqgl4y1lqv0utp7lcenpvl3nm7y48ehazf8zpavyazpzgex5huafnq0tn07ler1pz6nyilohn97ze4ml1zx67fsihdn2yju8a7ujmcvx2fk4',
                title: 'ql7st31wmuw2g9yn9ieu0jukzpyifw5gag2d2vxkb88ssckf2ml4pe5yd3ek2ls44uoh25htrv44ijrm0prpawq4foknuogtvl5oeleuopqd1apcic12ir40q5n118a215x3b0bnsvclbq2qj0lor5kz0cbg39d0ljcmkvkogytrfeagkgn2p8etoer96pbhm5y9dcamahczbqt1dxanv4hkzsfvt0cw4vxyba3x80abietvkoafno3j3tnt07l',
                description: 'Iste voluptatibus sit nostrum ratione architecto enim ut doloremque id. Quaerat sit et blanditiis odit ad vero blanditiis voluptate. Et voluptas autem non dolores placeat eum non. Quisquam repudiandae ipsam maxime voluptatibus modi.',
                excerpt: 'Voluptatem et architecto sed expedita accusamus suscipit illo laboriosam magni. Beatae perferendis cum dolorem repudiandae nisi quo omnis culpa voluptas. Magni adipisci eos nesciunt qui unde illo qui numquam. Voluptas quo aperiam consequatur.',
                name: '22bms33fj7pr1wmkirc237v24g7op09d5k296bij5tgdzfp1glz1u78whf7457c6yb52tivdbxlnwe574cn4s67x1982ozbh1j8txl45bdhzopegyaga4j5rljomb0yb8yuazo292acf182ah3hv9bxzo4l2wnr9fybd9a46dkzw3w05p02ranvspuccur8bxnu2fpzbe8a9ygexx37hdz1y09zt1khmw6y8embvntdcuip858nio7fqaxkjwro',
                pathname: 'opkq4ga669cdmgnqdyepa9f0ujcztnge52ws4abfbo3b4f2zb723zwejbroyojc2f1mw0y8kbk81w3ohc2mmzeyl5ows4hd6ejmtfb4vs5ar7rujcmp0is2isa12oyp5m79lw7vfipdsrkujbjmbhxf8gtwlt8drpu9epjaj61ilbq6p8csfpcpd6twra0nra9i2heai8tuvf8lr7mq3exxwr15ymdn9erfaptdbcqmimczfeb0w908oi7bif5ux2hmg3sr06vujvbz52izn6o9dgd3fitgx1tnrbp9qgi8qvy3tglp6wja3c8a8io07uhvhytefaw1fmdp16hames740tq8w6s3twt8b5x1jhwyyq406gv13h316e891o1p5tbpt1jlwwblnfdz2tvfrdhvi05a0sxlzcttj9xr6ia68qdahu5iy9x2wh7y5x1x5kfahyd0yxk85vxpc0fvicg49a4nhjffsshoq9c6t53fn2edbrhgm2saq6uruxotmrq26m0qgzepzv6k5pg74qpokyoi4n4ffrmluirwcguyjlaeox5l8zwmndygx4ferolpbofsqmwgn1pzolhwo6qjrkl0ym5hzkp7o1rzi83hdtwveax95l752b2iq9svsv7klhqobbo3fzdgn49z72oh7hxz4m0pkm5j3zgmiqbxyqpomnuojo5d30t91fhhq4h6pl8l2zkc53kr6e6cr1o0mqy21cw6rlrqdefqml9xk5hf3zxgskf9daplddstl8satk1l0c6zweh4hyyi2pmwdlmh9lk21mursn7kb5w5ptcr0pnfvisnhfedrupldj0rqjmh2hga5m3iwbtxf2r2vkhrprun7h8hvbrrh3ckfekj1pie37jns2qthrpqmjmu5oblbx7yp3c0zknnf3amrghenzwfult9m33uc7lj3xkgzy2lm092mnepl374mqpmy2alocb2ila9jk7rh8rb2rffef137oe2okibmn2vxghcopfp29gxwaalnoq4',
                filename: 'xfg1l98puaj51csuobfmldvh6h18289h5qfmc41ycy6o83vbzvhbgi1o0tn1p8jpxmkqc74jr9k5c4uecgeasp1g1wmlh5b4phcjkt4tesalpuz2le14w6sv4cup7a2gxpe2gnmiobc7mtqyihashljby7dikelroybtyzp2vcbbmv087jetv4q1yjex0m33agmuvsomm7mtjct47pxav4p68xj50judcc0j5rx8ukf6kdlfssxzlxkg6fh0ej6',
                url: 'r3xxurmmbr6kl8aybwnah7hpjhwr7rebmppktbqqxlfftm2p6gmdn1fbeuyrwwf7t30wv6d9rsehyrkz0m7ey89fg7fn1bsi4eugcpsm71djymrqw8kcflh864xykmfqmpd9826c2ksylwlrc179btxzlpcwxi6iwxdye2io7m9lrdae7qd01twzkn1qgkjfcwonbdkd312kzm49filnfhv4rzb8v90lqkpawqx9mqi2pwlg4c3m9da2b0dbktlbhdud96byx7sv1wwfjtujthrnoryykghe0hk31jfwpygpp2i2r5awj5bztnbbikhhc7s5bmvqi7kok31sr6hv8j0whcyyhlmxqt5wo0qn5cgwndyddyli48uc2uge9ec60bu3lvg1ss5eglwjt2j5t8gyeviwrrdkv546xaubxzp73js2roghtsb6ockdgs888m6mctkhvubw8u0kicvalqvyonn5lznwasfrmtd8cq59kfehzti5tr3sia8k7z6s8veakucdy4jf7rl7ci03u81p8al89e9jlk6k05vb71wzy9ma4ydpk107ut4ur1wcwoqkfsqjcpfnxr7oin2wjeq7hhs2e3cuyw5alry2g5zoe9q4da9te5nd6u1iygcs21qk4akiyeuq71q1yx4nqs4sm8t3pke2zbk6jpl7sp6rre7a2m3t8yaf4udfx6l3yomtemw3mue15jbqm9zfbltngou2ffybybx6c5l7ximpkxziyrp6s0q6lxh67dvx2wwcyqppuxc5jvo4y5klkv7bi3rykwbffwk9naslqrn9m5108lrgw03nufwxr5aa75vouofrixhygohq1ov37pgj04dmyxyse4rvpms5l8wf7pnfhp775xlpeq77c94b756h0q8afxzovhn41c4bh204u1oy8hklzy9ix9p4meexrjduc9606kqf91ne24mjc7fd7xmgey8pqiana1j0telw26k45hl8zq9ib89i1xx6mch14dr8e30nlax2gydq',
                mime: '70jn6qvea589qn3yiflcwyhd849k44a037nsyapdc8me474ska',
                extension: 'k1msvelfb0kl6k5a9hqmapxaho3cgtyu2hwd5gbepj36f91wbj',
                size: 6149381358,
                width: 476350,
                height: 320373,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'kwzef2wyzgutpjjmkfdvb0an4ku98zi3d3nopkyivd2qt09evhdx8drs7dfqose6esp4i4csc8csbxj8jv6bwrm54ol3knqs381nywwzauyoxbhgayccxpvrhufi8bsyx2apjoes5yjosqhhm971oflictkpl36jan6yi6ige7gih7hw3ba6brf3ah2rn0q67g9vz374fubkh4f6kyeqfpkybrt3jfow517v8ltytsoavgkx8paduls7i5a237u',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFamilyId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'zp53kwrzuati7by76vzwzxy8ycu5i05kbw98fna82uqz8k4viyze1m95ag34ow3a51yatpbhz3b',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: 'ar3b9zlqfq3pzk2grfx1egz821b53hg9i6muc',
                sort: 612286,
                alt: '0d8nze43dwdxeae4sztw93r53md13l7z31fujnm5o6iqzmzga6fzdb6xegchip2wm07hhhm0kmx9hkjynbib98j7osil1xbkgih21bnypi7koru4kuidy075e3vma05hu2x872z4a2pcbgx07yxupt3rugrhnx9d7cllv9zkfrqrdr72nt8qnej339i8sr0pgg7adxczydfgql5laydgkdpo4uyr0c1lj0wef2xetfv6bafujtw1jerkpple4cv',
                title: 's5suxmsfkd1bq0v282yi9k1te7zwrez4b7mhia4lcpqrq46ihqextam9l4w3t9i1w56rtza5mcu664a4aoy9yujyixgj74na1ror1x0pztp4hpksmmubym9nphmo35lruj3nhqxqehc305m916bfj42sqxel1l115bujhcp2s7cwarte7vwgkkz34b1le4w1fsefwg8ll34bm6qlxbck4d2p7iy644xy6pd5v0cw2s6dcfcz31qk0mndzllrh16',
                description: 'Explicabo quia amet dicta consequatur. Est omnis ipsam cumque suscipit aspernatur eum aut minus. Dolores exercitationem accusantium perferendis vitae odit non nisi in. Sed veniam dolor est qui mollitia. Dolorem et beatae perspiciatis quo qui voluptas et.',
                excerpt: 'Ea minus voluptas commodi delectus accusantium voluptatem. Quia similique iste et qui. Quos aliquam a consectetur eveniet rem quas est hic nam.',
                name: 'uqvnu5u2vet1jtwezfukn1qfgjyzca554ym3un79t9qtdpckbagxgh4kcu2qnwqzarwuez1gf5vbd75y2qgp29ymngrchzwg4pzqly0xgyjg2qtjxu81hxu85axkl68wrc2m2lrsvetmhlmrczdu9vopp7dabgfbug1fx7psw9yz70c02adcu5f0lmu19srjjyeg71k2lgm2id6vcfdkg2q6iixddnt9maofwoonzhac8ojd4f1hhbeaygsba1j',
                pathname: 'xll9nm2pl1q1anvlkdnsdelqliv61hctgg62azgdkel6qttfiiha2x7evi69v9fk6kocq9qpka2rp7xjqs1htv73hvgbs7tmazlvtqgahl9yu8puqha7hpioohlq67hp8bz1szcsogiocfzyhpzba5g0sm6hzw21fv3fucc69axwwn0pqc49llzdtsilfyid62gnu1an3blvf1hg4yy3rwmtqlcqmz1jqdf008luhv70ucj3jy3ipv1t7m7kqq9si3a6m9ni52exdnsnxhu98myg5gej3kqep0i9zir2fk3sxvtpchy1q5sxc1lzxkfr864n9e5if3164rh597eky3stzbo3pd04ncpd9u8y4efv8b4f6pungxdor6qdle3v12hy71b87z7tukodc2mktsj5vesbfwioqeihdyf90zne1z6zpmekqlbs9xwm5oz9xbfroykql2dt2ke8uogehyv5c50k0vmlnqqzua96og5nioi93xubw826eh2vp8ejix92ydy8i6kijtyc2qw2q7tkw0zeb21vk112ia8hkj24m2i909scnpxkqhgr9l4ub92i9ddgykcc8487wae5stvzejdwp8y034cwcl188ekebd19iv6n131l6fr0hnowzf3df1fna8jlh26s5g1e693savoavts5akanasqgsh5e2xjiw3s2u3xqfipshhh117ca9qtu0pzdwcktimd4xlfidkfpybk7xsqeu8y8y1gs0ciio19pexkc6oa5qllj2hwx5hunj7ug17fvhax5vcen94e0svb5cm6vlir2ldfe00yjkz3irzxaf4j0m44o14j5w0pj923s1nhxb6bzec1sf4xhzpnaxf4qwojhlx16yqalekbnfce3fvr6azo016o3fogoseefgdm248o2l4352e49q1qjkr0xnfhukrw01nwo7fxlyzk7rzrhw76qdxgdctjnwhslfe7tsqbcv53s1o8rg2xf5f42e2agj4atcwfj6tomoj5gvwi75kep',
                filename: 'sshx8uxnep41p2u7t0jskkri25zkpl3zit4gbbhulvwesgswjsplygnu3whsiz7xjwfs279ggvpp1yqy358vkehrcmz2rsfnsaklazyp8hogau3j35anv8yw2g6iasf5aum30dfc6wqs7mtveamegdntl53xf7bhzbz32s5zsdmt1hq7tde7hvx18u9ctwouri71aj5or3xqgismuq0uwrxtozj0dubg9qhe5ml0me0ndeu0tgd64ybxkb0r5oc',
                url: 'g9q5qazq7od27k158cxmq82eihql5qhqkchbuh6xjur47t5qr99v0f649q7g798vrelpuo36xocxmje0tzmq5frjlkzo6a4sl3obvx2vacrpubfx3fm8ewfqmy2je26z01vhh5q1hvdsa0qnfh59s2jlhlucr3py01avsb7m0d3qq1a3sy4xnov1ao6e78rwsez5tiafgm5ddy5dhtsrseqjvz3fuxtsxg33paepake4d2z3xphoqe8r384mjbv9eiiqfbypasi92bipnwybxaxir0j0f0owqrkojjmagrg90j7schi87fihajukymcali2tderuh33gqa2sbh4z2w4ktenczp723y8xqfo876hpyklqsjgiesjwda1xpuwo4u1y2zpm5ts3sfcge6l1q4k28yk7kuvt9g9wi4jlt0gl5x9yjf1kfdgf3hoymg8y609w9d9rxe8cpempmzxxmck68vj9649uqionnaxe7pf2nfh7319ratctalqupqigc8zzj98t4u7slswugm2bn8a6y4vknxjbfo19mpg1xkjrssb3wojedyu83yx5j38fh9ltjei67912n1yzt3lepq5zpc5bp77fma9zxyph6jj0paer92b0j9ovvdfw7fi6ksr4ef1ggblb1teao34af0k6im8ih3twvhyb6qv9lhm2q1aig0f5vo37xz0bbo6nakov455697kydfsp5em7b11bfynwd9etkl5t4e2yr8smtorv3cht02brvlyex5lpqqyziur3jkufd757q79ibrrwrrgyo3m748yipeje278kvupeoukv4pnikebvlvzp7c8v28vuqrrm6x6t83ty4ketx3h75unvyp44uewe2sk4gr6nsq5b7cqq123tidnwqvq4ywm7g0ewm750y2gney112je4rxzfvt7ajon3bouo39zqdm3o99jncu13kwaadgb99ia7glum13eewk17zqfqxqynce8buq1g9otjyvwqtldtvwmsj05xezugg8n7',
                mime: 'zlf8ci7gdki6kob4lp5r6vwhzam4oyxbybzkeap96kij4blzg6',
                extension: 'xm4r0jyfxyivtmq3xx8qif43rz3phut6n313c1bhopp99qk46d',
                size: 6759359413,
                width: 948252,
                height: 248969,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: '1gyc0uyoce2o7jndp452cmpd0qg3b8c31b69wt3t52o433hl27l9x0daqem8xob8e8boxis13j8552bbabv8jgbmhcyzmypefcas1f0o9ibsce9co2y4hrb7a1upq8eip6ua4ce2f8bxlfqx1h5lac0htmgthgb8sxvs6wmx39wyim6zdxmoy0spu02fub6bojdargb71d32vh5pouyu2d6qad1qnrs9wnkki4laci8869cmmxhnwb7q6ua5pd9',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLibraryId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: '9txora3i68ernz0owcx8dq9pigp0kdfaihcnn09kqqfb1s4170t5gs03hk6ejz5jo59fli287a9',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 595361,
                alt: 'mcsr33l9vj18dsl3ypdlvou0mabtbzp6qywspfqd99qb4aul5v630ekoz8fmvi8nr6372vhk0i8fkw2nan1tlmxqr00if5l0iexvkn8kin7ly29b0rdnvq5n2gmoenv12l5w23d7067ug05e2xv680savdqov8f36zxzlbrrabqpcaj6zmzscb0bb49i5qd75ywma1m2qys8u4pekrjo3tw2h42szdyxh7mobwyn2s40w1n8ks1b9w12aklzqyl',
                title: 'jtdjszi5hgp41nqs31ccxn9eca7s13m5rmmoixhsc96zydwl8qpn1bxig8clrevry6qgr6t131gxx18vr4j9cudk60bkrfzvz1vs2xgf08cwz5s614ost6m1rhuknwlmzmtvt3quronnq2gn96apz8bgos0wp2qp090io2z736sde8x9an2lpo0yw08ea1tkc49tddrdii0uoktbe71n3tbw8v3mu6ccqc0ys3pxmnoixlk7sg9891vxzhyrwp4',
                description: 'Aliquam nesciunt illum beatae veritatis et. Nobis reiciendis ut incidunt assumenda sed fuga. Officia debitis autem aut explicabo totam qui voluptatem. Ullam voluptatem sunt nobis optio voluptatum fugiat vel quo iste. Illum occaecati eos.',
                excerpt: 'Quibusdam et et omnis cumque fugiat minima laudantium eum ut. Dolores vero quis. Quia tempore dignissimos est numquam tempore ut asperiores. Voluptatum qui beatae quasi pariatur provident et rerum voluptas.',
                name: 'swcivmzynm4hxfpvw48xbnnlif4tk2be2htcgyicjh2in32bmthytunixps0q06voo0kapqbe3hl3ase93u3mnarex7n6g59l60gh35e6y5iu3j89s3xxjufqtq2wu5vk7o2e90prfq5tjz2bu8jo0yipn8d8ldzx10zgyvdexl8ldectsem2jxs3l7bbdq8msufocijm0j9h6zxd1a5lvu8s5fmk6dukb1xsncky817lolz8qp5l4fh1zw6t8n',
                pathname: 't8o63nzbmm70jorz02qdj2h0jt15cf1nl70gft7ddg07w7qf7fca5pur50i43zmbxrhgs1jhorxy2qg1yaqx3f9hr0cwzvle2ptt18wxj2yphj70547ou93is6nq899sxdu6gcv6bkl5ap2sdmgo7jt75hd2dgeuk8d9u7vusd21lujbvktxefnlu3l74lgxyv23e4539at8b7ss68bdr3w4mdbuaqzwpps35voeeosy97mgqd6eh5nr9d3ap648z92h24s30yggk9edri1o9gsjnqvlo49kungy940dv6o8b9nmkg3xy3e8hl1eawv1nixk7p3w3kes3rw7a7z0926497h9l5ucyu9n28wqrz9m5q4fa72tg6eqwn9a6fh6f6qbr5y92k9prkl7jnziszgdntafyjum8e2ez3yy0ikku8wzy0bsicvmgkyuizw1ay2p9veiccf4d716rqlgnoldlx15suchsq2cneilvq4zpg02r339uqvho92p02uuh19evzunmo9zvy5aq8ip7jlixrgcqk3vwgws1xu8dtkvuj1t67zg08pxf4jnmjx48jq1ezee5wbiynrjdq7e9x7piyhlvh5zogpzuyg0tgexdlvrwks2o36f8oslm3ct2dpe9fwp0roiztdka1wqyo29wujoi414adtg677y8iv9inshmdg1a1qury88jotf3je27g33dht15c8unfn0l8hvmn3pr1qisxtixbqlp14xe52lg1bx6w198sgx3p9kopq3jq78dy2iw7w2rch9fwhxiexefbf1kz2kg58t2oavf6x92ce0dydiqy17aojiu29j1kdo65bmzc30rkl9c21nvurdsrhvsfmy7dyjg7qrsa6cij8ief7n8bheufdb2weo9gxgw9g0nqklbi6vx2rgkhmre368girf1pwapqhivnma2wzltkf34n5ctu35df5t2wldlfx5650p6blhi8a3ac4fhains0k18gpik8qk3c1ffz4tas20a6tleacr',
                filename: 'xtisyzf2c0bi1ag9baau5v9gf89zgg99963sdbperpw1315ekdethz9qxzovdyhpxi4h55ddf6jo0zapffv4xezb694fatwijew46om72j9twm2c57x0sl253zyrogcpkch1z6reg138clp1t8yxlfiqcl7d7ap11vne4dmnvtlb6m4pxa8hf3oxbzgdcqn961z0rvqp9439b4ujtjxm4rnm3fjsnd8b2f7xw5qjq87iycn58e8a60szji01ow7',
                url: 'n4zdffi6ioixre0nloo8zngs5vrripx4hx4yun2a9lwd8ut88366is6kslo2tluwrvlw4wgh722dswjs795rlujxbnh66tgrgdybudrap5qogv7q2r1vqk1tjvonjkaj9p8qrazv35gxhdkkmyfy3v00znwmquy5s7q8v89lbxcnl6zdmh8wsy5kbsm4hyp39zluu1n1j67i2ea6lesrn3d9cyg9un2j7xb7ct99f6l5t0v26ab8c42odbq1idfrzimad88gkkqvlzpl7pi7tnqw5rz8jylmms3112qcf4ibqzre1xn04798d8tszuq1fxje5ecc043uxyws4pi1kk7f0ep7f12c1imqc4khtzsmostfvd4h5gyjqw9levp4xjz6n99rdgudap263dtmi1fbu6rj2l2ousbcl16tofy2qqj4u6f4jaqn9m2jenauwjgn4144iolbkz6tnlvg0oai9y835k3humswfr0el7vk2mq9uzy9vlf0ddvxty49jh67s917ibs6at1ko9gsui5c4gg2fu2oaxhz0fmsiytt41str8yitfsmqt18apachgc2kvuvfdao6wo38tak3dsjyydjbnw01pu86mtdrxfskzf6cyjuars6a4g5qjje278hq0oj34syxkilkp7jv2l9gkpnoqf0d9ie6aifg53muv081qh48jhly61jfyvmozhymx64spdur5e3cb37vaqxi18lvd2wb8zfxceht0lxy3o9gkhmknsysl4xoidsafoj2932wh6ncay34zuakfv76nbr2xwkyhdl0ghc1tx8xv44kvtnqdc5xdevplneh4kdaouc4siunwgn8j534xpu6jl6dnfll14vmgqm449oheh83jf2x7hjym9n8fko4dq6kpyruviw209mmfuqpl97f9ua2k8bi945v2umdjf33dni3cl99yrmeg72ok7iw1wnxmhrydgpunnkoi5p9kzzz1e1gs2eq8hu3rhm50xdyi03sxr8ujwswde0iky8',
                mime: 'hk28uu9oqtcmzhlxrs36p7ujwfb1r3e8451zsviner6iwwhmqt',
                extension: 'xe4jv6nkp9tvzf0419rcamyy61xr4cx88az8by93s71pk0zl7c',
                size: 9750372566,
                width: 499930,
                height: 667587,
                libraryId: '3vr0zjqz4ghiytgmunxc892oxq4da6jf3mcya',
                libraryFilename: 'trsgmqgcou7ckf788vf8z9iu3ft7o82bxfe2d1862o13wky2aw3h0ev4lsrhhaewykjnnigsfbjrtna3l0z8hpa0ezaom5mce6rqy8kwdzbvzgxww0nfq0x3auialxp1m208zlaqkkglv1rfd9iyx7fns9jwhpn6ovv3fgi0s1amudwx41x18qiu57bgf88xqe916v0h6zjx3yltyz5iw2o1aizq6fax507zfmfdgg43qlbbf69k23wrf0u5dbk',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel is too large, has a maximum length of 75`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'fgbhajnoz652d33s2zilof46b0ft3umxy2rplxlco2ja80qiueukqwjlw9tq1u265oah9okigsz5',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 467918,
                alt: 'sydm49btx9gj958oqb9cnzdggcpydw37nnshjfzmhaz6x4volkm847pf07lac5hkvqp4grkcdel2le02jxm0dm8m14nw6wb3o8er0yy4pzqoaumapa5z9e2xmb0ebt0amaapoe8j2rcesvf8v9kv31phbong66bhwqax33dkq27ai2n5zsifvaiiqns71ihcs22mf8c0d5zfkpdofd954mgjlkdb5s4lhhj3a4nep7dimloc8lb4ulvv045mql6',
                title: 'eb95izy1n4j54mkr4c0vn8p8vogi9l976f8r94n5239jmwh7fgd7htn2wna7tbbm1pjeotcm03ir0tvf0qyeothux34qhmztjw7rdjw6ypx7ny6qh4k9vkokppee0vy6ydmfbmlhf4n1jgx6ij162ga6591ktljwve5d9iajujrek8o0skj9ojx0f8vk9wx4rv4skp9xufukvhcrrcmjtidmw3aykkdqex3oqlvd1j6bx0ga938cothvxq0nn6k',
                description: 'A aut sed tempora saepe est eum quas illo eos. Blanditiis et fuga nulla. Aspernatur dolores dolore similique ea.',
                excerpt: 'Eum quidem deserunt repudiandae numquam. Sed aliquid ullam. Et distinctio eum temporibus voluptate id veniam beatae quia. In quis quidem impedit praesentium. Fugiat fuga laboriosam quia sint repellendus expedita repellendus et ipsum. Iusto illo quas autem molestiae.',
                name: 'gelkx8khvzxd9vjhu8utk51kce68y96k3utx2ux2svtd1fkfcm1uwpsaqps50yxnb965x2sat3z7rjyjsex4h131zwo6vnyzwbvxpm8tlmlcpc2s9onyyz16ovjqhfsmt6fn76budsf75c03iuqp3sb12jocvx26zj3eihcpi2dc2y1z7v3zm1ypcms2yikfyd77o05tevwtnbn1izkut9k4m7wetfuohx0csqn8vy23vj0zpwyevogh6egfeon',
                pathname: 'm8qsk1kn1oqr5rz49yfwf47r1bdzc5rzf761u3c4ya6t5b0epee801u3u7mbcquywf5o9kfm31xezqwdnhuj1r8q1gekeicihsze2cbs25fpti3tksxqynj5n9pvo9hwn1ceruyq1crb3syj8yunw9yry8u34zg3uaqkfgt4pr8y6k748uy48jl41z6pwb9751ozqhq3vxgkelobihixtngfatcqh4uta6j900w23l3jdq540ykanz0tz7mnwt3deln93z7e6cfmfh7kv3g4c1zbm3phzupslihxqhjlrp2ch11x2wp5wfwaztsrm71ptb96s9kwqretx64bulncb4tt7pf6m99im7krpja85aen8x3w6d9nwa3fe3maj6m8vkz7gg484ucmrrws2fn6f5ljbwi1pofy2vi7b3klqf8tbws7dvkjfngs5f9naelvnsgz0umzapitwb1lqidgxpw44jd73kew18kn7lnhvk2it80uar36yooau50h0u5lu9tgwm9k2mjraxxudf5qtagwxnpnzst0u5lox9oewnclu77n84iv84hokzq0qq6fiyu01fhqakoa7rtyx1ddbfdi7uxkva9z6zecyrf8tyd61z0imf3z78xxwv7v9qme9iqctdcidi2ejrcw283z8stit878l60q22y5vqfds77hp4e92db029as6a8utejjo8xbx5b280n4a56se1p6ct8ni91mphe5ixk7foz1lnfickrdfsewu4kbxkguw2pdt9nttbosi8kt1af6e9b1jsoxlct0odrfglbtrg9m70oap0rnynlm46xf5mc2u3exksnd4jvqmm2b1fbwiu0dyad61g0owgo0ddwe2tw9own741a7yih6wtllw1fkdsb057jb5al1sldpiay6dsf75r42nn4abozq6qqd7y2ake7sjlrd8s6qt3l20gfa6g6e3wuh695decnwn1vg6ub6lgvyuxdr71mszf1w5svvdf2xa8o9k38oah6gg8ae6a6s',
                filename: '5kgw521s71t4b25k8g1oa1dkbnopf5nvykirhyoypuj972p4urg7xgtexgog52xe0r9gxsy4lg8gwesl2w8bjvfv43jkc9jwx9to8qva4arnuf1lmnbzrjsm3jg8ubuhasofat5h1goszuotjmyke6df44wt8zla3zqczg6ior90wuvr99oawzkwu5iri13dum99tdk4ce48un37mzbt09hqmpnbkcqk2o098s7p9zjm6k1apbr7nsdr1knurge',
                url: 'hkc43qdclk7xp0wg10ef6zgwg08mq9pn598xg677v9749iqekljps8r3u1i3pxawvef0xlxvuirao8k2fkdtcbtds7enw1vt320zd7e69tk7cd4ezb8gd5ggqhcyl1yamutqyhevsjf1v13fmnniu5f04r9uksd459gu36rrhhzhx32lhwx85wexjxe99e8af3p3jvw6idc2q1lh2rnlwn9t3m4k6uiv6mkjfz7pw2f0b6qgtzxa5vnvoo8ry56xv4xxen8dvi4n0vf9ex5hkzwfqxtxju4hfktclhezb2xau8b7yiu05s70cscj1mlsqibz91otmzuq346sv1rqnlvat5gjswi7k77l4khd9rz0rcdo77m09ip2blv3750mrwzc4d89evsho3slj6zl0467h7d0w6ifya5n5dyc9w3a5t0sabgq5s6r8dkn1ogejoo9s3wriabdjkyfhk9k8h9p9lcqrd4r5zsxbxzao3u2oeqlt2orjjyjqbuc0miw4b0u08zmguo3i2mc9wm4bgue7zxm0ea6uums7aflbtym3pfi4lbtp0knnekonhyjqkoc79oq3dq3khqw26tgub6r10ggt8hnn4gxsj0rug7kghmc5t6qx6mkhjwsjvt6gwkjxhjq1cyctaxkaosu8coqs1al2mc5jn3idmm0s2hwxp2mucbpjnwmutzjp8rblmbyaelimv71mkxk77osr37o7vbh14doo6mt4mn5nf4gjwd5erj5whpyh2xh7ho4a2ri7xgoj2w3f1pvkemrl8jrv9mupvn3zb49ajf2n65xcgugvcw3h1x868szs9obmg99zbkdyg1b039r8ydspdzy8wqswulfxmmakoz0th0gd6r6upjir5mu85lhffl65rhx6mk1312wmqw208o5gecw7vij869d44qgey0d7peogl623uafq162wveyipheft829byrztlhgqh44rcc78x3uwhsoh20snhpkvxune612m1iav6kf43ql6egdf0x',
                mime: 'gtjy8ums0hgk9oamilue7w10o7tje0d56w342q3sckog5eyndv',
                extension: 'dabtdavwwf2j2nso6hyxj6qvm0aytjaber3ed6xag0its90k0f',
                size: 5900163334,
                width: 143104,
                height: 640247,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'y2ukf14862awfz6jutf12qzqacakq5icmbrrhbmvid0owvddi4u54wsx51urt4hqpjb49supj2qnhvnwyylhnk4yp3dtn9f9541dca2s30a3vll6wihvtjlh8yaucqk3uvkz2p0bol9ziijczzby6tm8el8cq8yi6vjovu5nkvd3jhikp64ymp2ktbbijgaofft8xspi3mwdb7b0t8173xi3jsw1997qlxxp9bmyda65dnt2tfk88hd0he0sp4l',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel is too large, has a maximum length of 75');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: '5kt9be1w1w8htpg4lxh8668nitsr4qc44kxbt2ocm0h5jsrczq2sabu3mhrx4c0ibe3kp950y47',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 8801220,
                alt: 'mzo8lrfqi0s8ry48jhh14dtw75e9rit6hyznw2hrkiex4a60o63o80o7w2pzf4hjohs78fmpttvid3gyvutp490k8u1onhd6yv1mm5g54hab656r448f787vetzalq7ret76xs5wnml0fsogj7yp8ye31xx309s9ln012s36xne5bl4naaat2rc6hxhxstuq5drab1vcxo495g0coeqfc2ff2ng412flercyzyp88yjo88u9lpl04v4fknt2lle',
                title: 'gkwax036xa3wua72a9i9g4u06qld3c2a4s24461pyq5sz9md7bkxugoklht21qpxcm9owul1chvydspks8v362xduzpzzh3rnmv9lm7o231z3k5wahz0y2ffxq5b3ssrq6lmt50k6jk9pwj674h12n7u99bhl4ilngn8i0t24zjzmqul9r6j0i4fbmaulo5sfra035frd8ubiqpp8qtse6cww24s6ct8c19fb4ugl0x1hrk2a017glnlkbgo3gn',
                description: 'Ea ab et ut. Sint sint vel tempora iure necessitatibus. Vel quibusdam et dolorem quia.',
                excerpt: 'Voluptatem dolor aliquam eos fugit numquam sint. Ut ut nisi id voluptate. Tempore asperiores rerum blanditiis. Dolor saepe reiciendis numquam at quae sed.',
                name: 'cco58r4w4x8k5in9s20zzxqup76xti6wpcai64ergz3k9030px4n4tbm51q2uo1sa781d313b0k4hwg6xb5stcvqy6fz27zt1pot0aag9kih1zgcysek9s3ynu2oyh32232hbrllupmd380a5xoqr2s9m09fg4a4ifeo8bs009mhrjywjes0wfrdt35nl2buy0h35jlbg0xb686mebdigvnftzdvthr0iwde5v4xt2cxxokw7b22vkugxcw36dl',
                pathname: 'iqtiarmsovr0i5my7zf6qnmoidmk7ffwvjuax110bdm9xva82v91manaozockqpc3jwxbdgk4dxrkj3tumz6vrv75cqeugtylyqwycp7y5cil94vwqrz8gw9s8u338wteaqzps96lrqitt2fx7qhefj3lniabiofrma7dv5esa7b1z4yvs5ctj4w12924nspdbdisoef82iw9zudznz15rmuavmjsn32s1k5ph8ecqn7azuaf885slayanbm0udx9sntiwcedt8g1s4l720p66cksacx4s8jy0295opap5qx7lukci6pdirqq0xx3f2gsl39khsdooplnciro6s30xe505prz68a6mjfc879nlu2gcr97e6f4djlz0uvqno84hxjec1xqoe0ovuxe9xzqcjghq2iqjcokkrlia6kxcl6hiwag7lfvhik447uyuuz8wvjeuvm3xcpj2dmwt428r9nqw0153uzntmzbpcwpet6dgxs0wz5vdujvy67ircnakhmletmz94jelx77o94rmcjlrc4s8ey6nz27qbmwq24ix03pjgfekt7qyellqho6cxxm10u03ddx63ekghckgbif6pmm11pxosoqz69d3lzy1kfovffzn3kwi96u9ulw8cxbmd1we3v8iwz436fjlu7bc7j8i7235474j2vvjxuhx9cjwal6lui96hg4jinfjenh4wz6lerl3s8u1cgc17ng8jjqce1d4yfymm9l0dbx2w1lvdqdfz3yl8nieyq54ju0jm54uqlw77uljmo1tokjp6f1h81wnhw734176g9azjx1cxk1isjy6whhbeqicvxsn9qx0k441f6etj1qhguaj0lnr34wrw9k8pmgsi5ic941gfbe956v2za1c00yjeaq3ykfqj68ywablgblxpfekntws5imjn0w8p5gp5ifkm2ue452obs9kv8u4a74qqfx4f4891qqqdm0py4kb11ybdneqxv7h352f7feaw4cyy49t9yjwjotw3fq5v1',
                filename: 'dds7mj2hye2cetmp7t5abr2b03menqci5r5pmiwxqmlxzp9787xnxist2sh87yibx6lkrafdpecbpmlck8m5b3kg2p8itnco8nv339eky0mr1xpjkuo5n2k6xietu1hddx0r14d9ounmjtk7hkhtqkxz0hmcv3xqcfng2sbm2hot83uqvm05ir3u0qqnp33hclwwxxtwrnbhi1xyss3psq3bilz646drhqmw1hctlwx8yb0q31c4e3k396z2obg',
                url: '03b9b6yc2ysq2gegn1e60ix1fuhxo781jrweu8eebq3mtbn5dbvs2gpu0yy1biwnsa21blhcj77iyo9w26wr6od291jq6j4wrh4ze1jm9q7zoc9000gm289wezqwzplcvky4bhc6i9xegvlls1qgiajjvsiofb18wjnlm33yxuhmsxbg0pqys2qjkkl90em3cek5v98cug4yzj36dx8pvszt6hi13y797kjsoj2wiptekebtbyp11q4zp7uhqemb7o7343a7imsvpjdxlv1z0usfobrio8ismiybtd76bzp7ncymey340bcbd5n7w0ec7iqe5a3eyly8b2307hrnyrq8rz9engku0qnw65rws1e8lg46nxfcsfr2ytag6k2u0x8at1wrnnplhmermk4pfe3b7hcy5ve6t953ffa7ibm623mfo6r2o9f6j0lo2i74bi4ya9nx3p0m4pi2mtmpwwsdftol4t0g3vhv8xfxblzxfp8rq82gtbh886tx2dmslj5suiief7uc2c18rbt2axx84ohym0o8p6g1xll5um67ntzl79h9pgb48vq4bpw8bekya2la06h8c70vic27x903m54l8oaf7zyt34tyamhmo7678pdaw37d06de83baspbe3eytt1c5rz3oi1ar3da7r7eicwg86gz39zyu0ll3imk0o0bbsvw9vdrthuwx5m2bt2qya97boux3q4vwcxb9ziu0ljtjr1z9shqmv317embnoq0orqkg2qbzx1373nvbhbtj56uvs8kxcphy7h6wki4oy9539a7k3tn7w3ic7pqjzpcos0z3u69qi3ncup4aywsp7rjp1ym8sijn212eejzt90u0w2ou5vf4fciirmik3lohzaln5odixkqtzec718szhx3x0kujsbai469p0f7jlwx4l1br5n8o6jgo4b4omlntvy167z6kb10jt9ikc9bifbkhy8c6vor64yxgcquxi0vdt0mve46kryqfr5luslrg7fu969i3my6p',
                mime: 'an36tmr29r9zyotjcr9o184bj7r6z3v0o29ot79gz2iwk2uxqw',
                extension: '4i3coqxakgeaimochfwqboxej46vp9fm9ozibrh5t3ee2mohcy',
                size: 2235429124,
                width: 586548,
                height: 277830,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'ca3tw1vkx0o6xrvvu1kiy4zvb9n5u48an85hcvkax6l22ns916yvoazun1ur67cb73imlci1j2lznc64lpw0ezns5nn15m88ox569vgwxdx7ffl70cauxh45skh8l9styov20oh3zu4pxut3qou9jcj1l94t5tmp6mrz50rtbcty6jzic64w27c3a91u7lt8tf20j6zn9asrjwmzr7a88tdr7111abr32z6vlhahx9rqfv0zdezo2ytbv065643',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSort is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAlt is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'u8cfbp8v6od20l9i9xcc1cuo1w0uh53qmtnss9eo678g1zqnrki5urf1lak636emdsfj1vphx2s',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 168940,
                alt: 'lbefsczosn1gk6fbqs3afoxnqfuwl08nc4maqjd2bvvj1ic0erydz7s3l6ayxze6hf747n2v6yggsaa92lmem8jbmbnc3lfs7ln9784stupojwskhizq1bj5o4athboi56g9sc0dz9ymjw4r2enayt90j8cyjzb0gcohiqe1khrhm9gmvacizg9gtnby2lomzwuj5vq9bkwwu2smxxnhka85rvtv14ee7onr13ik82xyawtsjhbwpbsm3e34qh39',
                title: '7ffhhv3bw0mngvlv56k9wakso2qezjuc5jzamw2h2nuynw02c9skwhqto3mnu36dsyppx1xu2m8kdbkpauw9x2fnuixlt7pxeefl1r5bpvbl9h8atr351udks3nxv29criyktm4you5eb0kl84ejlk27i7euu47xydb90nx0nvyjm3hocvaktjdikjxpvq86pt2oqkl2xu86lg1jd4af8kwy6gh9suf5eucjonrbi3dkkjbeehdkgzkia98h7ko',
                description: 'Molestiae facilis cupiditate omnis voluptatem non. Assumenda voluptas perspiciatis. Saepe itaque facilis tenetur reprehenderit asperiores amet. Aut dolores nobis neque. Voluptas recusandae deleniti in est error aut fugit deleniti cupiditate. Quis ducimus est quia et asperiores facere rem.',
                excerpt: 'Corporis ut consectetur neque id. Aut dicta qui assumenda maxime sunt rerum dolores architecto. Et odio error.',
                name: 'hx6pbol91kwp6g4kqvfzn6rhfa37q2y1xmgjoag4zfrr0pvw8ke6jwnfknktkv2nxg6hu3t44dnibnni65bcw1jijljxtzkijydu8bnwllh77gl45to0ckv9j1ita219zk5bkkry6punq7d6v3ie9pui1pdtzrdylg1hdws0fbc0mtzsjhhnudz7nbwmf7r9d9pgpf4h6safznr279vc7btdffycwc3eg3d2xe3xpkafmt2ceh4n6w7qg7x6tae',
                pathname: 'hdi2i01900odt8oo04r8484pl3o0ddf7z211tjepg0z3a2zffv37xbpeedwf75ydczln3xq7b4qk9lctaxtmlklld4q7rayzelzazgqpfe7c4y2ffel2dl24yq3hst5irx8ay137xbkrzadvonjobpz13tb1fzb8gpovdzf8yxv2h1p20lwqeizsuw416esyu7d61a0g77a323v2zbhvweak0r3qd0e3n98faefwhbi34u1vzu46qfcd8xhi58suzw8drdb18br0w6njlo686gdxsqkgg0guld8zkuxzbats02huzesczb24452g7afgxzb561nl5xw1cfbirz7wbjmqcnqkuxsgd9sv9lw0v3sya5s2wbh788113mdujr450hi65hytjr2xaxd1d2ph11shx76o36ae580o596uxtr5fhcjzh2h3m0qhfg1kjfs0afjz7yqywl8tnduwap1xhu7c1opdkld538r5zrzc54sq2635k5yhmoc95tarmlc5u2havgeb75tozt3ucym28ixtmwa31aktqfzrqhi3z1182s6u0oxywrzf15z7fjzqs1znar6vg89d93yway57wub2rzyk89mucdhllaq8luwdbfjima8peiphnnao3oasska7m7k5xfxvuwa6bcjatpsxkfsjviw2xaulboq6b56ogrt2muzsc1ifyi451btzgouytg6x94oy95g1xirvkw1ckplm1ey9ngop0qcikaiwp7vd0kild6fmzjvluqvla1j0ud1jvawibtkw88ux80ud15ato4dl9j3amfssck46z7lrq9fz077wpcjpm9e4kjdw5qmt3jhq3ycw9tlmqbsnjn4l1ogx58a70v0iugsbyqgt942jwc3mpwqld7f9srqi6f85qqozrxkm730ev143h98b4k8pfyyj0p9m2sc6cb8og8sgcjqryp2rdssrxfs6uvo2usal9rmhoomaf05ghjommqpb4sz9bteeo92fi052okp0oaeljg7m7kv',
                filename: 'ikyb1m2hxgsm1kr7ajmh1mgy5d92mjt6mzb86t7ghmn5x8dfe0dn869b06nt46pz2h6ka34xbpav9kul5xc10spfd7htk8n360x1wfu9lc40awldim8r1wbt80q9k83wm99wqwz15ywahed4adangorfuvklmczkhs8qm2h8mr7ku4iht3y94t9aw2ftkm95ioxdk40410wiuycp2xci88pjkjoc4hbobs98ujyc1jpbx28f0zueqklzgbcq9jm',
                url: '2b20bexhegkkrn5p1dm8aubgp4ovfvc4sa5ycwl3gf3seea8qr21zumtsu4qub2jutify8g5at2e0s7hhxes57ogk73o2ve82qp6p0b3vs3c1dlgpoiazv38g7ogzr4nsysjfvrws50txlmm3mmsczj77fd55hlmn4s2t0vvt3q0ft8d09dcw8gutfl2azb6ndjwle6dubo1d0qefydcluokxgxl5wgmxbizvta8va0k6otwu4zgzhzt2zqzi044whxr9cxx85uj81na9eb48r7ikrmrufmpz7x12mk2uwmtbkgt211ny5uulj4kvryytk36ydup2k7ytyakverm0ssyhlzk2c4n7yzovifac99p2o73ihe7yq38doa8p8dw2ysb3yhbe9ujizdcetvu34baru6r5e3b5u6xbkyx2g3l7jh3p7kemmknbvig8dc57mlwwz4p4wi7r1ly06a6nr6grdn93hkehmv3xn2aix3d4wf2jux8cn858q4rvxpmr9en44pconoyzvhji5d0yi7dp8g3m32hxdzxuvi84dh9ldejtnq4r4lumlw7kvf8xkf242x5zqhc2fbvwj0fnf1scaa4moby930hzktwncrncc5w3uz9ci4zovs13m80y12xyb6fxsnotb1qgi3y4a81s1muovee6x02b1r9efj93wfz9ccbi42jmzyzhj6xnc3o8750rux6c1rkkk450rmsvh6v2g5ogtxqkbuopo3nmfozycg9kakdlpwjy18p3vpygjahn8mvmoisj6w6bz05ebv5wye99ttzuopbyj6qri5r9fnfe57f6dqslbr662tumfu00vr00s2irdqjaetulskkx7e13cxh0qjffuk0p9au88sx5qba9m4robta8adagjjeukikj5j1b8k6hq08qeqjxdxikd9ft0pi0gbd7ewg72yobswrlziea0os5h7bjksagcf75a5y0t5bhwmc72fg5v57qogct244wo346cank24w8xn8zy1eto2c',
                mime: 'epen5aivk2jghelq5ic4djx91u3itykux3c5qu0xr9nq0kryxk',
                extension: 'd2k8qh7ev3h9yvk89z6vjsjepyhyr9h8vku2s2omsdxtqqvx4c',
                size: 8360743218,
                width: 125773,
                height: 413819,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'ewu94n8qtd9v3phiud9pw2vbsjxwdkcdge5z0fbmbo13sjbnva6fjqolfbicgagdqlnob8kc3mruweq9e6yy7u5yjgxeqmu2m7qxyc116fm88o33dczmiy902anqwi2riif4jn04bpg8tfs3ak3j4hyfcwdeza7bgzceu4yk4tr7vg1imhgx897sfv1ew8gx4bpxs1q0xqkopglzukmpbahn1hh9behagfjx8j9x2xr5b57ki9curwl7dgafny6',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAlt is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentTitle is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: '2h9huqn07r46e07z6mirdbw32ci9n8o5bmt0ucn79uembq8i5vw8y2pl8pzu4al1phcy3siv8ne',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 712636,
                alt: '4aovs4dun7lptl1q3i7vwfrz10y9x2sei4s17ao3oqr6n8wa6hsnkmsx0m3umq0pp8kyguruc9kzkdtu7qf5nft46o7i9uemk62c65g8efbxlik5j41qkfz86grqpa4gy2tcewqf28xakrph5cfz9odaww9n3sfscg3zpe7jrjcp521jaztnl2m8et6gczh74161iyi6fwu4ebrha6s6mov73madaspn7wkqbgci6bcxtta8psc2ixxja33c8l2',
                title: 'ag9iuqruvjp8n8pz58z8akbb71k6x3ll61wuff31gws5hvgea0dpgjgoybitapudt408xso4wgr5hoa935e7d7wy4w819vc9fy1h73j4o3xl3dy0m7dc132ypcgkn7gptsib59c9tzmuvwivcp5unigzjxe2zw1wnwvlrrhq20948pg6d1s1grgwax3t48r939mjvkqzkknt92o1a58adzps3zrj0zef6g1dwpe5zor0vbcs8b5ccr2tui533oxx',
                description: 'Magni unde est et culpa aliquid. Nihil voluptatem et harum fugit iusto alias eius fuga. Architecto porro ut ad veniam est similique eligendi error. Magni pariatur minus non numquam. Dolorum sunt vitae atque. Rerum culpa qui neque aperiam quia voluptas.',
                excerpt: 'Aperiam ratione temporibus nam tempore laborum quibusdam enim ut fuga. Est et aut enim fuga voluptates expedita magni fugiat voluptatum. Similique mollitia rem omnis natus perspiciatis. Maiores hic soluta quae dolor et sunt. Sit praesentium a possimus culpa cupiditate perferendis minus dolorum explicabo.',
                name: 'y9t464ba67igio6bthbzfq4dnj8ocosagpn5kxlmrq6x8tqrecwvjmu0powvwjsxa7zswjukwgn1vz7x04azv1k9y1so16x4bvxf3uqut8okkpr2xbd4frnhxf23qtotk002wkzwi7dt0o7t8biz28bvdznnc6nlji26r1kpkmj20iw5ug8tkf582b700wu1a3b4g2ed0ae9n7sean18saewsnp8qp8bvzob212v9emkgrezl2u5obl3tpslszk',
                pathname: 'bb1vb59p39ddtl34ypannbcctcnmiad53k2u35rk9nbfuqjn0v732ykfedn1g4agn41xi26k3ucptb9dftlfy1sg8wkjr67k5mzpuivzc2e3syy4bta9i978vocbv1jqkdn8aqlvun8etaciekevvuaekxa5lm0qahfw7pxsvkqaeefqg1grwpb4h4hx6sbdh7080kh6eq1tbw6lch4u3a39js35phtal1g273qththg2mugdwprhl7eaq8ftos6py73f0qnow9pjq5mwnt0vwlwkld0luojifr7gu3kjy7firztvjvc4dxqakdhkopcnbiotli7n17whls13rwt6s76v4v2jfei5jmjqb0n5vx75644nvvt8nd2qbeovrzjm3s4bxo0rowadg9eywozzioq5lmftodbnhzn2mo7xqdsapvqpkkxg8cu2aozscaejlhid3avd8nn4kp2miuvhojjlhn3n339sawc24t17kgz3pk4tti5zproy4cftm73og37zqam1hrhrwm8fp9t79aiq4wstuqmdeu094jp4bvalno74djws64kdos28w2oogt3czj8itl6mrxqftei5jozre08gog732kb61fg04u110jg8p9q3s8imy29nt7we14jmydlhv0z5vph7n4l0jgu4mfi6wwrr7054vrtnyzrdan8g70e626idzh02hoktq15igvsm2mjrpgvh8iyp44hd8l0aztoqnpg4zykax2y1rdn4w86j5g3j4jvl0fk22jxn4iunis1sbc4110l7s2euhzrctswsjwd075qt0o4xu2usk72l33dwmh7vkug2sa8zqz2oopk12mspylhv8n6x4urk4c7nzwy9jrki4ng7b7ck6d3unz55qey0x0wkrl5m0wd9z3dv0017cjrfpn2x7cs9wok1l4iyziybze6jq66sividxqhvzkua35smjkx7cvku65lr6eqsodqswp07poa6shpwol8j72b4cr490oz0cq8rbtlpz8hks4z',
                filename: 'ow7382jp28bspq6ac9lftrc5e51wioemn59rul2oa1w5lbm1kf1iohgon08nr41ecgef76wbbphofyhf3s81xy4503vrnbabjpk9k3eedffg37fq7nntvcibf7q46hnhbtg83azfpjjyaxjw4i8us2tpawm0bt8f13x3piin960mvastve05cgslidg6haqd4pk0ldiqids0c6enf0tmnta5tsb1q992ok8or4bsst1ojg2bxqhcibjur9qissk',
                url: 'sceq7q4i03s91rf1bamqz1fs821vhvoiklvxqvdjywucic6lzibtvjwz64kpdg8zgja695tpxjrpbhg0ftn4tbnvla8lzw7qbrh3nngkebqmla3y1d6eeeg5gubiiaktcslbkqs5o8oa0z81suiz4qztjcu0laidjcqiw6rdopeh3mhy0ldqwba1stlladve5u980pdqqd6w8om4oni9pffvucu87uoscmm7yty3n9araw2e89k9rihvuczkqtjvqllvffu13o0ep299idgx4udtdq9z33ioqpyj2yoowydw59vvyzg6i888gwbwmg4ddzv774jomspx8xlmmwtxl1f8ygthq25q0ky5b17k2d6xubjmvcjc0r9it4cvjgtboyqselxwy6z22rezl0ugro7d0i6u8jwfyo76m8iqtfbua65bw8urnesp8ntl9204kit4qc8xkrs1e4sq3l6w7q3jgif1jrvq0ivlumm20sd7ydeur26jxn79jk7jyes64et7e3vn2ctq3n4mt79m6sy39nskb6p1fug5b0q67daaw306etae441k0m7b92l6kfiems7dndazwaqucw9ywmm3enjdzs4ifeyytu9hhrcmpxme8whvvq0tk2is8qn4131sf6fmvfcqe6ltn7ljx9zancl6af9ym8u6122jiof941g5yrdlot71dz3ubewx3q5tt1p9otzr5v1yk8ows2doxbhe8idw9dgdbocipxn8mylislzhmg97e2tkcibkct5u6285etxvhmas7n5uzg3bm0kdgxubyf7pt7vzyjt5rekhp7rt5qfpadpjumy12q5ztik7iivxlw9ctnqzd37fz2qb44wtano6p4i139isbbbjf3cmy0k6ww7unf25jy9sdgvpzx1m6ne1j8p8ogq0nyd2m7l84rdk2pb1fw1vxaqtruo9uljc1oo2xcsatr0ntk65agxqyyv2izdj9qh7te04689u0u7x08ledmzwjhuhjfm1wtofcln3wguz',
                mime: 'mjakzos10wau9vcbj0o6ddh23ru3f3d1fmxz2c5ekoo34pwzdr',
                extension: '6decb1zlv1ecrpgnnoqwitnynkeior5cuwft3vtv6pyj065glr',
                size: 7003217613,
                width: 928393,
                height: 387623,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: '4gqfat7sdz3ctygbk09y793e8upwaz7g2zgjw2nrwwf4e3226yekuzysvvk57vamumeogry4irzjodcco7c1e5xl02ezcvosnawzt3qa7ivrc0ssddvq4ognvrh1gvcvqi00s609pisd3fsiv3xgl33kche7cfegx1ldcpycxqpfx880pqeccdnpuhjqx4n0hhgfuwebq1i7w0yqc4xg07swx9ww0mj5v1nflxaq66vymzh9d6hemtjy5d5clf1',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentTitle is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'zm4gv10g7xjbao8cm2q5w3aquk4nylfspv5u528z5bo7ydjibpjm4j55ut2l8anzklt05k889g9',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 272242,
                alt: '5unop20y9qf1jjoj7jfhn33qfd64ptpfxwbicdq4c9z6jxnr914ol5t2dva000mkos7t84xi24to3l4br2e6gqm5tp7ecvgpva7fk4nso57vpqt5zlhl5672bc4xsa47xkakmw7pfb3nji0cc1cnsg947n82wln06ui34kk3mr8nhqpgjrokwz7hfoniriz1h7w710mo7xow14s71b96p5jm62k54j9i2bzxax85sf0byc15ed7t38yhckgmcgd',
                title: 'xxvs5s2w5j79y0fjwl931px08f1jirtfqkaojcwu8dfcctoipu61fn47c13vyp4lt1pgoiy7pwqd3dsme20ukyphy2t8gkyasykli35okzbt0z0zyytp1ochngr9zrvg5ony0jp26h2onxi6tqlya1qw4vr8nnoy9d7dceqt3i6i1ho3ezijiewch4lvoswlqq1bna89t39hooa1sznx0r9cd9e3g29fcg2ki2408uag6ugury806wezdr4a7sm',
                description: 'Ab autem ab odit laudantium vel numquam. Et itaque dicta voluptatem ipsa molestiae laboriosam sint. Facere perspiciatis aut est id. Minus adipisci aliquid dignissimos minima dicta. Culpa ut dolores ut eveniet quia fugit.',
                excerpt: 'Molestiae nostrum est voluptate autem a quia. Tempora rerum quod libero molestiae non. Tenetur eligendi velit provident sed.',
                name: 'g2vmhqdwslwps0kwoc4j02rubnuti7aldvbsiqihy9gxcws2l4mjfbtxo8y3ujn5btf2ta5kri87yckyj9wfskvjrvfa9n2dzu1v0yj5koitcwwz8k1jzvs4nn9udv20xgel2v06w36gldpuyvb99wh7j9upo1lecvk9gwn3hwygdeovt6gwo65g7fzzo4x4u3dv6l3z5zeim9i68mf33ol2pgsxv1lbee86d9u14kmzn1du2yllspfpii3islyt',
                pathname: 'u6vgrjucv48qn4zht6zb6gdgno54rda5ohp8c9sm70pqnp3xdrolsyk1ptkaypi7nm39kfwr535yym0y7xfwj38i24t0cmdaeum46htoatwqfv5lwiedkfsoyf5luw88eqqpydgw4stedk8jct9enerspvonpuncgmo8kk8twlhr0kr0k0r3u1qy8612hl5imddg37kkf9i3twffpdj3fqh3eke4eotjxblggswhstoiz6jy8qydunah4wnp44dksj6yonkypkvf7u6xuet60z1vnb2ctc7qjp25qs8wze9kqlfp1lhj2wqg7paa6xra3gn7nc0e9m0g93s8hy9ti3amzyb9gt5ztdfwl5zg4xcsroj47w9y6u9bcvupou0rfczzyhxxgih0byjxovwhaqt20au7alko4y39xmcztpx20od1bj3l9das76886uvc82w8k6bftx2ukf34tln4w2fgcw8rdp4ibo0nm10ctc506ta0ri4si9fdzs48nz29tyjhdyic2jj2xituyzixpchtwn5yc30bizkqj55cql7dkssy1e3ykutxhx19ruy97jpg30jer5pzu65yadcix86r6q5tfst3o4wnieu218aqbisayr9wmu2ypkftbmrp9267rljaqbwavhz6qvhcerkh9la23g1x22e5w0f7l1gu199vrgde67mhz8t4qy4f1ovnniaa7b5u9h0y3wa5aey7t0ibdjh05zj8gnt503cz6gm3nnqsd47pu0cvli23qpeh9jj7ffvq5veh08s2gxlzx9p4c8iikg1wuk0pcuvy3awzndj26ykw206j3dnj6hae0q3f1b2h80orou2vafmmznajhruyo03ytqxo879tgtt0yxhk1r4n54agzvfsaq14arqlkwskp5zrfurybetf996hqpm2lzfctdtydqj2r6nrke550ycwwwcsc9mav28udmo1v1opzs43pktxtniayjijrpts722ghxp0reh42httbsn2q8dxneerx5tc',
                filename: 'sv0s1myvw477dubwsax1b8usd8mx7oecttwjiygp7uzjtcs7ycmak7r67wsn8xdh10ad43ufdyydiq6fwwpzyjuv2nkrg4p2tp5h2hn9pctoe11q1gb9nykpczzbsfjhc4nkmgp3ftea6ndfa4fddneba6r6m66utwz2313rbi9c2iyisymidtaht8jf28ofc2iagw7kbc4eiqol98lkp6s8gglhhf8eo9lckfywecmtlgopng61yrdpfv7lhiw',
                url: '3l1o3bcqlrrpdr68ick2tibtxowt0nb4wln2nab5fmwprv3av0kf91dv31m9gbie9bzv4do65egb5kht63rjpv3r256ieh69so25f4qtc2k4qx698bmrnu3gl5lbrdbgvqdgd08tqhbm9lqn1nii049qyfvs0rp5v83s7hqxwdgy2h8q0jfnzhp62yo9k5e150ie9uys339vt35zss3y2wmlihah8ksuup8p2p79w5yk5lu619lfwlhqs672wourojkdvpxtgrm8d9opzguwg8qwg90hjnhmpgzedatlcef5hpw9442jpayquga6bpwgv0qnzfuavr4bhm9bzfcm0o1hvtld21mg8uezvdml6hx6zkxo5vwrmvk2dk0w1u1hsim5gp8nqj06eig4bk6keg6gvwep7kmxv9xjhv8mkeqlsayi6pl2lutra22qca4bqw060nrla82kvypj6742q0v37xxir5b7g2eri74z3725oh4m4pmaiqmlecgy91g8yr6c9qxo2mor99jq53mozspklsjuq5o8m5ny5b3solorphkie4k8p6f2kmzzjj5aw8fnmbx5ff4m6iiwes9haq2nfbrh5vt7e5au0wmjj9cvz3tn3rzlizpn888s5hez512fbm9i6l00ersfclb1b2ah71ctld81kbw6hjh4h9i6pxnrxuz00lv1afcpkg5suwz6vtk779a6l4s012ycaf4uzund0bptr3r8d8t2yns9b79ae350ipzakyo676vrvf9ymlbvu497zkeb7cz7ly2t1jir417yo6arml8nzjqdre62s58ru0fcqtuztjf9pdvbtz5c0e40dglkkocack92a4tvztx05y3lasmtng2187hfcsa1npv82p8pgbfrd1mzfce6oz9vkepqx5qggy9b1a7pn6lhrkxbl5s2sdvtj69ifmjdnr29jpblderfn1syogxdnju7ebg56qj36n5bsxwk3dem39tqjrz96kov8xajkvshdmqef9az0q2n',
                mime: 'w0d7rm9j990y5lud9gcrr4hj3s3fygregjd1ty8jow17gb7aji',
                extension: '4q8c55y06dt3mnf47wsqslh5j2dx6jym55292bo5dt7pyratpt',
                size: 3803000883,
                width: 481839,
                height: 885728,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'n1hm5wjbs5vxfyh0kari0be760sl8klni1wmup4qylztjhcbd8ajbcov2x9igcbh1mtn4xt14lmu6dwepq1jbn14342d143ng18uv658wf6c21pfputcxzvodg1gwtwcyw8wad21018ktti23lvtbxeg18annrn3skzsjseod5zhz9j6qyik7hhmbx6rc2beu5a07lltrvsysbx8f8yvgxanm9lcqhgnu2hlgrywymln5az2uritps2sfxeq6mz',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'rgd8sta7o0fp9icue0om4kzurbp4rxkgo21drylybcd9mxirjv7jm1qzzdu9sev2vv7dts2jqbw',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 825041,
                alt: 'itpdemvo1ltcc3rwhydsrln7citlpkgu6doslxjk7vt7yan0v0do3438y018jcpjm752laepyt5gvobygc3cr6hmwidmfcnvx1dgyru13q2muk7zzovbvpxsoyhz37h30rmcg0o9t7qdmjk8tjvwrui9o91sgg708xqc86o5xpu92nunzt3b2vktn6yppii6vipoqan2h7z6ulpdzipxcknpidcappvpom05xzsy3drsc710r0z780g315v3jz5',
                title: 'l5g61ylxq6v4qatir12df2vcak56uyyr69gjtww8zm329vr1i72s5aru14rei33qy6wg9x9oe0vddgkc2cjjgbgtu8xn5unvmazwc25ddt9je59qckveoiors30dlq87lotyvq1q54rfzwb7edktdy7fb6uzfhw39z27xnl2nb3gepqfahwf2rrh23h9qktziaaieiqokb66oaihqrg1vm2ylc5oupdecncq6qa4hhrdbq15tjfbz9uag4bu2i8',
                description: 'Dignissimos ullam mollitia explicabo hic aliquid. Repellendus est hic ducimus error doloribus voluptatum. Nam magni optio molestias. Porro eius tenetur qui. Sed doloremque qui dicta.',
                excerpt: 'Ex reprehenderit ut quos aut ut aspernatur est non non. Amet ipsa molestiae animi et voluptatem eaque. Voluptas quo ut omnis vel non. Ab molestiae vel inventore necessitatibus est.',
                name: 'oqnbk32lkw65uoh8otujlyzm5h7ui8jj1s7m5iavubiaaps365l9xgr6oh6tgm6mk6uowxkog0unipx4e3341h259swuikotjvzevpy0aocg33mx5hc0fjmmgx9gf8xu2swz9yiph7ac6r8nt3unswd1v1nmk90na7icrb18zf1e40eyebgkolbgplsuypgqvwdkh4g1ppue4dh0f11jjtdpeyrl5gfp2iridxnrhgaitbx5ewa3zogtz3di1i6',
                pathname: 'wg0asd4w738neovk4tg32orulr9pqx9e64wy4jtwcu1qxrgq71k1m3d9ok2c2833ztxnges616hxp7q74s41k1f79c0laekmnvrjclddyvmutz3gqydb3vgjn45ugzu4qz1isovv35oy5bcggdukvvdurtegxmadjcmcak1jv0kojod499aba287rwwe9bak05143xdkdfvrjelcpm8hea47wkw3gjvnbxfektug3j2oalx3nbv5595s8mjv3z6wn8dnvpr7v9jznrmf4e2j4xhzgcgl475389yg4tg9cppj7tsbn17sy6bewvah975t9k9256f7sbeezpfxw2la5xp7fz5vj6rav8xqhvjw3s7g1zziwao3708yrk5uwst2rkq18a38t3zzanmw85aw55s90uzn4tscfzfe2t9d1ugowbi6r1t51uvun7rp1csbe2u16a8c9ih7vyihjby8jt4juxx15x0cagmtxd7gi5z2usipbzzav55a6q8puw1lhmzpc6ycu0ix49pneoy4t1x6389600cshzjwpp0ee2lle6d1n4fz3bn7wjlgorroamqubl3tcwmw36tjufkkuterfj4g9i1s931ktl9hl03yhf7mmhvwf1mjwb8fnjzh3nxhj9357va4ihwoz04obw8fix0uvao1thqimmvmioxdxfctc737ujzyv40k6kursac3fjp30qm9r08vu7sxhwlh6rzy3isvrptpqelljpwh1n4wa52f7zu2fdevtg9crjxa86xcf5wskdd7mfgny3rjj1xssivvnohx4v7s39ugzfrzvhlu9mfrjgeynrmfuwbe7v149ax6n9fn8csfrh1cwsta6zbbu2ldj25rtgvw72lmxsw5abe2acv9t6ec8i1kj74s23v2faloe8pauorpq9uwl5isfm9ehm5n7qq4ihgnweoqd0ib1m532a8bqe7xky8g57jghsy2uakifvkkn1j2oh1a15iqzo4tkyzxd1i7d5nh5uiagysia1py8',
                filename: 'haq8rxjcst7zw2gxt3utnrwb483l37fyhn63pbxi6fsby7d3st0komssfvxir3tmz52u431vrccoolfwflhepoplvm53qmhdjiyxwpayrqzrwwrefsqrszzc0h99xjndws2iorhylack1dzxtosz9qego9ukis22knzg85dh59wlsj97c0llrjgjpk9d9bfy8dhdgeh4hgd04p51u7vneciwd4p9ak846dkswa9xltr9xocpiq2u2ggflva340c',
                url: 'a35h9muv8aw697tc3n9ufu6vkn2geqnsvrpqmzgnnvllbueabbko3wjfovrz9bpro1ymlva84hwf71wm15iai0rfj1be6n565euysv2q5071p69qo9hq8rfbpkm2ja42likbvmakadnq2h1sb1kfy08iv75ccvaikafqm71xyzvouq72ye9xviire4k3cn1b407393scz9woluoefbzdr7p90vt2yxzlsrnx21an56rdgqvxj0d30r7iocmu55291xu71p6yfkr8qr38bimdh0c4bivolkpctomwqfjtdigcq3r1q11srwffjkcml3p1jcecx58rmvyz3jim37r38cxsd3iym9ptczs7ts963lj8jfp1wzmgzxah4aen8u6x4rqw3xryc70mx6uxochl0hrsa96pe7nnw870j3ailiq4jrp8jzehckhnoekcrcsd4og2ckluwhj9l2p908z3fbzjsfcauja0gfio0h7l0jw9qmfy52razhb7konr9fl78xexeszk130uf08cs5y4y8fql7zoigkoyqy14iak5v86db8w6f99z8yk1redvjgiks2u5y4e82zhje8yrzk3h15byu5jy08m8ztnoxezetd8c0ophgc8au2yrhlkmyuv6g5m135vm9kd0khp49z77okwvu4upqggtptugmw4sl91mgyuw2luabuqzmozg2o0secsv1mh9n6j2fcw2b9ch4k71o3whuk1seeefvtxdzd6s6zhr3m5lliunc0aj6rf7xaa4ilfn31yutrgk08lqj8aayd9ls7a64fbkqcp26zrh6sykoh2gulfza8ofqit9rfcs5agwhrwdux14mzaevdcfmig7z30p7kqphrs3ymk9eprctazoz5yk7mip5p5q63s66oqz8y6648ecdcqjfxq397q59lwkddl1c5039ihi0pvbqpm6t5hotgdgjd7vdsd3xke4ckt1ohenekwdt74avyg36kaioh2n15w6mdygeo97phvxtxrd45kfohf',
                mime: 'gyk9eutcc1fpr9vtbhw285eklt3l3xfxq67ybpondpm60ob58d',
                extension: 'kp5lf62ng9d2tj0zy2wa7m9ur1f7uxfz4tf9uym4ly5e7zsqxn',
                size: 3115596842,
                width: 946725,
                height: 335876,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'ggk4qxl3ughu5hs610yasginri79v9tlznniolx7k4w2stepie1j4p0q5nk0llwmywwlvse47wa9l3lmc86jf2qr8e1i4t7u4pf7060r17cdxnarp5j590tsb6oru4w3ayl8jw4nf716oeeulpqpe2i4pfw1en75yynoygl5cgjr5uwvy7bq0c8pmjtrshya2q4nmp9ryadtf8cbovclu0riybhkny9bptgmh1iy646wr6vkvjjxy43xnsxn7xg',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'pltygzv61pk2xd37rc1vp0zmhjddfeq0llf1rtklm4r9ptjr7g30nb91bqenc0ic951fw8nbgw4',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 421875,
                alt: 'sqmfz122aoejzbn150kpekc5t06x822e07is1j6syyth8eqdstw3l3fbq4fuvi9084md2x5spi389sxwxty7q06rz4hi3idsar7xe9pytxhshhjfloqn7r1dr8akf88kyr2nzq4213xjas2zjchdzb8fmgnazgi12tugcqeqmvw4ov6z519dfwxx8y5ld76m7mqvlzmnyiopepjkvu03p9z4pjkgb5q5acaerbkabii7qnxnmzt4bmx30rsbtd6',
                title: 'fviv2aiaobv8j0nkdvj1u4aztad1cvg4yjm9yth4gezwhspkfb8w4quh9yt9o8u5fx5mkx1xgsriqctgmtv9wfe2s5djxeos28jc6ff2oaloy45xnja0m3ju3ck76taled02olrp3fz86o17zjakjk436jdlsr8pc4tt8by8xupxfieidhku3wo79rhxppoiaob6mix09qs3gbbnhfrb3wl6rsadtnz6j1xtabzrfw35xa3oza7nr3o7e3k72cv',
                description: 'Ut qui nisi sint ut inventore consequatur et soluta. In omnis unde laudantium sit. Numquam cupiditate ea repudiandae aut officia sit voluptas.',
                excerpt: 'Veniam veritatis velit aperiam nostrum veniam dolores quaerat. Et minus doloremque consequuntur facere non. Minus impedit eum deserunt animi fugiat voluptatum. Quidem consequuntur id earum vel ut perspiciatis eos. Magnam quaerat consectetur voluptatum sed.',
                name: '3z32tj1n0svjl9k4btxejzk8blim8as45ro01ulr0ngkziulj5cd1a8cb5cjuknz05gorbftcpvtaq74hxfkw72irysf1mgjy8kcw4kkbe8cyx7w8co78gjz7467fl08a3ggys98ncarp3l7qhd7i33x6zfg050ii6mtuqpvezrl0fqtl6gjp0drxqqfgmak3cxpy3bzgaz28fjw12gc09sdpz8t6iu5ar5lab45yzs2uuf7n3aj3c2um80nq94',
                pathname: '82kq4uyr013f5oy5ozdozdvpahbcc63p2yocxoavtqp7yhghehvho5qqgkdx72z4w8al1lwu4t7r502mjy5mlilztidd47qfxui1mm8fcrkvh77x7ricgtb9olc4g4hvl1f8o5uyzq88yu7q82nb9fueozp95h634d2wmo3k6a7ejzyjd0ga1jrpbiffr1uwg9d2xa6y4mtwif24l4bq0ab2miz90i07qb62vefaklruj5z4f9tyte1aqv2os2g09obadk75jdaldm7yrbwbv665jrdy880voso16n5v0h6kyf692zzsom7f98jao96gqfdlkutubi5gyxe8ulqz69pzh3v1rl2hcpacd7lypl61q18a7j9fjsnama9u47jt8vse460j67m6wwbo7u6ijojidwpl0qoxxf9vw5x0sr8pz0tdth6nbb5880y0e6ihzzytftc3loblhwq2znkqu2po8g0ap2cypp1sen70od0wwdnpol42e4t61pjs7zanfz3ful3s8lebi5nckff5ub3buvkekopwhr5tymi5clxh85hk0ye81hokl1ar3pfhmusn0u19tc9hryit7ykavczv5mmb17hicii9n4apy1fp9iqnrdity89h1ck18ajihz1iab02ci6lwthnkfx9bbwjop517vqllbnzdf3mukq2m1g9rn1otnapmyokrokxqltivcbwj2qex6685bqrsungwo7ivb0d6wiuhrubnur2t6piv2mb2jtb238q6m2mkbdtailjr5w5u4tyc7m1i0kq8qxan2mi9ae8frruu812zsix8jsgtw8d4cqj2vjf31zza3nna6rlsg7bm73vao57mgjf9tg4a2lu6rxi5rco4l8iprdcr4mcoacfylya63tk6wzt6d6tkn4m00epqq5lsg0pxoflxb6wrg6vx4exe9r3qo0osez2fxuoz5hd5dz4zs9uximnqdbgpov1ms9cfp2qoz9dpt5yot6t9s2hnd19ejzus46fexj01ed6',
                filename: 'la4juer47mmd4hd7800o7cl0125k8li414k4hgovumiq7pj9gy2i4d3yxo5mxenj663qym5vk5giuyrp61wxxmhjyjchayjj5zy3l4svmvg1gilv01jz26strpakxytbgurn4vhrtgi9oropmnatk80zpwbvuxtc86gnsyjfhxaa1cydc1edgldtw5wmmnezdrzy0bmdf30ph9wr5e8j9z248zko76iylxy77v14hohvnktkt0vcjhbjet42tj69',
                url: '4jjnpuinlcymrp1b2v2t8imqt24l5a02vnsz7ng8o5jufmyeqhqi4aieilu38qcrr3qelumwfj5j6pdfhud6m0cd92dwpqoya2n84kuq9q64rxirm6qjwya08dy3qm15zpbnfqyh2o8ccinafhun5gh41dqkll3iz8hyi5a0ntvjfiz9v0063h750egf00azd3irxxb2rcg315ikbc2x3dz49bviq9j601vygfx0q3i9cgtvr4k3hoiwqknik8ht59ocpwxbnq44ci2apq53fhrpslk6890w65n5r2pd155mwyvfs87n1nvhxufnbovofy8bv9ay1ivd65e1cl0aw9nifiojsvukakh7hktnjb9i4q71wxgcopyjrv8s4m4qcgfv5yjg896kkb3l7xmhv1agh86qkyj311eebqwjtrecn571xerb6fesuem2oe23xxcdpxnd8cvnd6tortcpdulua9qg17wj03eew7ab9oszn01wiura8r4xqzjn3wjij9d6q3f8f9bxtbx4cjygif78jat476k2e981x230gwhud0q48ctkbp6r3dp9ty0bpbsl2g1cc0qf1j8znyhbc7zoce0u2kxudcuxsf4u1lfs2f6urp00283xq11xbsz32h4h6fogvwahljyt320smsn1obewsyq1tegh58kq3yo8fvnbloazw7r3ebtp1kr6spzt4930geq4jnr70k5qcilib3mdic8achnglfssy82emfpgx83wi2zhcc0pefn9rfjks8bqj0xyql7o006x3rfehxoucneom73xte64rw1ifc5onn5ffnssgq1wa1k5mlq14gphyghdc6hqgr976qqi0jttdr11wmqthow1hmoxsc5om9plcm00argwxa5avmatesa6cd91qv58zyjs2f5hkr1aezugzbki78neddwfkvlbye93mtxxvdj07xyiw125cz45ioy05l4p7fqs9fgsoakozqwz9j8dsxh2drm1sp4a7tlkpcd08aldwjr9',
                mime: '0rq2qf1xko41pjaczo0xhrdxairm2l1splmkib63z2f3tkyl0g',
                extension: 'jglnmgx8ac2evhkoi9oyxvv5lbcarukewwzplxr6q0iwdqjpch',
                size: 5699105325,
                width: 106810,
                height: 658351,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: '23br26uce4xdv0eew2zi6c2uv74xncikctfbuupqpamwrpnj76k94z6s6mf9o0vmm4l9ooepedbui8uf6uu72lbi9ce5j6rai9btvkdatvgb3hgfo9ov708c6pfsi1xsxvzca6vivs0v27eerlgqpfhi4p5iqhm431ff7inn6j9jwrqzort7ynfo0c7ld0uwsdawva1vvbexfqnbt6rolzfxov9insk3vfqd0yjr7hmfjokpuyxt1yx46v0kosn',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'nwx9jh2zh7q1unw0utd1osm1f9036hf1cxe82ifzs7n2r02439scw6epdfjbv9nsc5ezdh5goqi',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 191506,
                alt: 'bz84egwxsmmr24audgow6ikefrnj2ojt72z8twr1wm3ehnzdxnwoim3o5m34mcvcjloefxuq08qzgm9qld8qvcacmvx0g1f7wq8qvbxpmq5gdr1c9don1s9ius7xwfz7xgcxwxd23rdh6mthkhwojb2g46tmensjzrgbnnm156gwoq8g9gy6r0oqcrs6nx9803ayhd0y15i6xmyj9v5f79t08lavpc0y6exsohuc48m4e42axgde2n0c6q4gzzy',
                title: '5ikxajnx626sfmiffe0x56epyglvbpapu56az3w1y3u4os5a6qf8yuy9m6npew4rwy4mkyo2yldngzrqctnko8jkfcjywr05cchw0tngbgvdbtkyso8r9vt3aanm1buepepsrp8sjwj2wptgq9ta7ebkj2fjevo2uw10n4y1f3s9u35qepfshv4y9czr87woasaes4i09z66kx05jsvtrg8vilhucjggpegk1lxk63sdtaa9sqgdyfqlv0youpp',
                description: 'Autem sed accusantium modi voluptatibus sint possimus autem qui. Sit commodi nesciunt porro quae. Quo placeat reprehenderit sit corrupti dolore doloribus optio excepturi expedita.',
                excerpt: 'Eaque est corporis dolores hic qui accusantium. Occaecati et voluptatem impedit quod est. Nobis voluptas maxime perspiciatis et voluptatum eius itaque atque. Perferendis quas quo quia similique. Nisi rerum a eum sint. Consectetur omnis ab ex enim qui tempore.',
                name: '359m1alxnlakyhkwgmbk0scf5yhnnxsbnwyb3p7lzaci6am77h94zfm6mtbag2vjvr7ndj3o3w4d81mseozxwrazywbj5zatgr70nca3g6fvlodsk9yp4ef7x6j7a5406ihx8w86jbpktrrgaimo3hhd17305t9up4r6her0kgy8tvw449n7z3oer4v4irrl7c5tyqcdyfl5s0y274ce9wllbvjon2xgv9djfqtqn2s23y5mbzp39rkh7aiz72b',
                pathname: '68hhh62066e6g76djlool2yhl5y1e71gce4qvbm51avgg7jn4sf0znh2yqpmkb243skjpfb5armwd4y1f4uzny1w8uefe4w6d5c5aoow6qg3koqa7jp5glrvn2vlkicuw4w72rxlbjharyns8phtmjs8isq8iu1k2d9hdsv70zmph70gifxhlt2eh6yw49mjd3ftzt6nhbxpreyspfssrxqlxmmew54kbq2mw8fr1w0risz2ufobhaa4459n6mid4b7a9akmlm6dgipy6w17miwtw6cwu964a27ctace1vjhqnrt4dscvz24lwtebx33hihpozp0bi5n8x18po3eqqnurpcof5ssx9nvai80y9onu2d10ibfl9u6o59qdiosrectp3laodjwprxzeo3y0xg15eamtmf5dh9q0ksdh2fiezthdiau81eg4bvln4txy4wx4s38butc0dpz55x0rsupd8mzbexgmr3f7as90bl4l267v7pv6pzppnpg15ze7h8kagc41bzeykq94hifpfgp56k8ljrgoeyw294ltstzbub6h9eam2xu7cvsujxjpfbhnk7nglovdnpwju2m93f5ydt5m9dsufxlx5f6i7zaqrp8xot0he40tam8f55k492soag6t9eol3xiz4h83ubohy3teq9619splwg47rqeqdp068sp9v2tnpcd9kt2otq1otdi3j6umnw1s3hplfqdow0t181egcs6zgfihp9zfn74vnc5dcjl7kb0jyb0ryuo9up6ubeqy6h3wy1gbo06p5l3rjmgrzprhw021mqaac4e0qzogw8jvgg25mzefukgvf3ycjemxnpj08nkky5b3dj7fzhdoaph0uezgif4f3pkrxuchet7w2q4oairbftdmr29131fe4bu9y3xpff91uvusxj0ysh4skog1r48szrxqv18bmchbkfb2wjycl9u22ajbk3bjd1zyfht8ru83hy8y0guholdt0skh09slm6hdu9ny6fwveg8bhp5',
                filename: 'j3imtmfmapm34mw77en3exarr1b2zrr7o68bo4wt9ftm2ac02zqwbmd56s23jjgydhmrj2njtt7nlp2v5ffxr74rc5wi5kvij2jl65a0yy3n1na8rspuc195hjyify4fiyesjh42ukme905i9jyozggd7lqhh3r52mwq4pi9npq50pl4dxuz82hftwfnn6besdet9bpp6d31f9osha8yh5i07nluqkrexwx7u93tud2jzq1cml2eejqwgg3sx6w',
                url: 'lsha0cjuchynff5r63mzg6ugdywnc8mwoh77bok36yaxo5cmm1h6ev7l98wu2bc35i090o7wrpmutpwez764dl902wwl0i2gc4dslcpkaaofihqemdjsub02e0uoebjuywipv7ifa089h1b86dzorxxhl0oweg8428g0hxzqsxo3p977y7ujpyglyarxj1ihym181mn8hww3nktstwz7hajatxrz7cbkvh2ie8mirzja814x90h5tafzfq5318gfgzj4uzmhzl8katrd9gkh3wlh16szyqhi2oe2gz55xj147o5t6wn0o0t998124m6ki1m0wz8ksyu325ck2xulu8a58ugdf5lcp93yalsu38qkrrwfcni6qnsaur75fxx7ryjjtqp1c1rd2v87ts42hj4uzph98nvt4gv7xa9xyrb9pycogd00gfaoxlrbctl8bo3wkv4ie397s5f3e9r48vby4ecdpugh5a95ri0gv815t71hnh6di2rl3sp00ee83xd3ipbmqgqt3ikeod411auqed2metrjtccg3ygo941k8jae7clymk00iwideh2xq6mc6dcvjs03adwbn8tcusocxf2zlnlem6zjyilttnya87wdrdzq7tio4fsv3qma7ectrohvrqmlbuvl15ylgzq91tn0f0e6t34ailhkivfiq1w617kr0agybwjarh2r9a3hxlz7pbll6pftndyxwlb6o2w8g1ms4rathpgz0lddo8venb9j2zbvh54tt9dvhu52xwcgq17zizh3qd3w4u2uz4iwnvld8239fv251ft91zbfbcf0bislk9eltcd6e36b213aommfxbs6dyvbohc5xkutoqx3rkb9rljud9kydtnc2gsh3j877at4j0w6g5ee4118bj2m31zufunzeli6l1c6kjhajbx624f9z0pxqoudr98u7ix5na7ztktgjiz2di6vjutxpf8l6pp160ok8qsmht958jvjfu6n087tp0lv6j3gose88lt2n561e',
                mime: '9s18pdehul6ffgbj6bbqh75ozq66dxahkqpb5waq3h3g25cyoj',
                extension: 'bww8h0n498wlghe8uivyha1z6z7xzoe8t8oyn9kds9t2nbkads',
                size: 5394711468,
                width: 405524,
                height: 382924,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'eyay032c88e8f419jb3mn9pk7ifs8par254z6afmvbhzq1jfxcu5fp5j1uyaprl2vhsyae89pnlhgf2n3lo4ocfehhhunyiw074b0or7y9bd3g3bjneejxnju4qm03sadyf01j8t69lntoosnop6bckj4pzfobf70lybp1s2wwce4vot01td6crocgqttp73lbysp0utlq1hphz4wewmxnblfewm08n8feibjthck9fnzbrppogpnypwm3uqsbu',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: '1aijotjql768f69yxhy5b7qb1oaeod66x69vl471hw9cd4l18jh8ofvv2h9smqnqv1h1g8rmig6',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 400441,
                alt: '0zzyiat6oj9v9zauz2jb5lhbpltvfiwxc0yfvf8246nns8h0i184tlu9x5ds8qwg0608bsar3cz4noq2v77y4h32l7nkecyx04j0lelnirk0cm33krt4opzodsg1tem9h41pdlhvrud3dc8f0yj10x1pqr7w95pnyoqseilwrukd6tzoltqjyrsotp7vac38f5trj8rydpw1gc7u8e2wdy105uj4ecnwp9r6wgql16l80uxy9q4e6p34in2dpgq',
                title: 'fkic6aaz48z5huefs09fv8ar9c1iutf36ygb8098agny76j3qfzha30fbzjaux9ux0s78oot4k5z1e3r70ioxkk78hz0ezzvp0zw6f2yz3munlnhhw41zwgw81dlp0al66wksw3cnj8sgt7dg6ou5ikr05eubo16obx20asy1b36a9lnbm9oqw5u6uuhj3uug4wb6vp9ihcpdllvqko0x5kean8pg1cpju7ymtrinjmfybn8zax4xld2y2i0gje',
                description: 'Ratione est laborum voluptatem. Quam ex minima debitis. Eligendi soluta distinctio debitis qui. Repellendus sed et explicabo excepturi eius beatae. Consequatur repellendus voluptas saepe quo quo cum.',
                excerpt: 'Culpa qui beatae deleniti dolores laboriosam dolorem debitis. Id corporis soluta id sed expedita qui dolorem et. Dolor ea dolorem asperiores.',
                name: 'nh4wkepznla8lbz5btc2uivbu7kcnlosqejb0rvpejvg916j784fjvccceocwrvech8462edpayubrphw1va7a5xmv6669n3l0l09s2yeoh3ctall1mftnldnuyktqpbas2lgnddwepcpb9o8z3sx815n0xv3btj6rse8ttztqwc66pjfiirfdx41ls7ln46ed3jukjvc7t7ccntms9fhpuaxuuwvm4ig9esjjx4v8u7obk121lkg7h7d64246j',
                pathname: 'emjn0okv7djhkwzvtl23bwhe67zy79c3qa18u0f7cs9o06tl3sx1rplxiovxxwtiszibuh2xl89p4u147eym6ossqg14mrzohgqlevfk1qcthaq1ya8mj6pyyokrz6zt1ty6tx2symfzfefnlj9r78nt4p7ser9eh57nuwf19z5omw97nzxh4wlragr3bhotx90mwcst1mtfr7ag549pxnhjcivs83p5ckgweqq5r6pvw2iwi4myxod6zqnfamjw5hayn8f7bkyytgm05burhgu9omon1zxbvrjqb1ss2i5tuaaslz2dj31fiv6yijqaa3vflo6cvuajp9grqewqux85xd3djl2ratjv0zycmn4zddal0w0okzv2dqx788eus1j1vu7yc0t65429d0t30z2bbm5wq1sxgwwqxt7bgy6l8wisa6949z5o8qbi9hq6kkmw3x3p79dlx2hagjweexxc3yzxam0sx5uq2k92mc0ovwwz1ikq0qo9bou7rf89waqkq6xbycmq9ncae7ns0sy9k8nuurldr35ypy0s7jj5r0o9xnmgckposstjyrkgmap94kfxouhnoi4050yo13vfk2kkbxb2c0zrnfi48x0ii2eufosprvdv80zdzwi747en18a4in41fngv4hy1pag69kt9obp9nxwy6cwpy1ry3eqf9z61r3hv4tx8u72psh63t8ko9p576iqi0rh5kmdruauchp3ajv6s2fjlh3ptvvtj8fxtkltmmb2eixavw0mpblf3k0wque0u7shg1z9khzkmuaoqrcrrxsevi1yagbjfat68osmzcqgq8yjmi4n32hhdlpg12k5ipg0ejc8ktynynpo4m6syn9jl7y9638sgktxfvoeqq0gx8ujjubn6w28cypbj1ox2j2mz1unnqipcz48z0nqh2r9cey6wjfb4gxtiaviabjdwhwhyiu3lqs0yp32313mebtnhnjqwhtwqzqjb17movekb7lh8elx69chu6jbv89qwb1s2',
                filename: 'zdwjlvwfnaxgay8nnnix2kej4bg1g57h8v3uc2vnfnwfjt8v9vvr8jyr5hylbc00r1f9zr5ctvdnd5mqw5id1oqf7ejemjh5a2d1118btfti1fccfdtigwp908cra5mapek1u6fzigs098qjpxvibkvt9aevfh9eobvd3kkyhlz4uye15gywx2qdrq05c2nxk8mj9gezid7bezf67rolypt4i2c11igzsht73cmu46ydv5hj9520h8lfxu975nz',
                url: 'u3g51azfpt8kuw08w6stsfqp0t196tbyw2728i97dtewqclerkamtmhk9ujgn6zn8qpmzr7gy1kgkqhdviamkfgirqrua7b6hshuil8u0d26a62i3nwjl9z923bozbddbwvwio8ffsk6k64i2uod94ts6yvk9ad5kadskx3iuf3775i2zbmty61lbfz6v74l6mwxuptw596abna8x8a2rmcunm22vk42kg2lkjflbizon7lco4cp6y92puwz5ppn8gm8sh60e1ku0brm40tlisiewm28twjqwo23tmkkscav5glwcwr8617ex3u0ns1hr6q0wnz6o78v1ej7sq98q4wo5lqyh9pzwdczy40hwz2uyls67ainwrtm2bj1hx73lrz13r857uvppha47oynztmwwrd0uqe7wjnpx8wm47ww2c5v06ulsax3cmu4veopashlw5r8sa0r9e68ii12wqezhb04utilssl28svhv7ecc8msn09t0mbb1hb9c44x61bawr825uohxqm9f1gpkaxe1i80dl5wgboyhsjfw24qv39ods7jwxwj4z6iogbxf06mqh1q0sds1ozpd3hdmkxu08fvradijegmozmu9iuobz2d3dwte5lwirga7ivecsmpdlmk1y19ccqbfl4ki179sker6glu5njp2gtkhd65i8acznavnoryf2h8p5zzj1qs6vf3v37vqu9dnu3cngfhcy534hldomec6ypon55jp5cqscj0nf2qxuzvp7v0jlt3wd1cep936ik0gibebrlw67vo6jpgl75umo3gxa55i52a7alrfnrggrajlnz94gt4x2onxs9krzz47rybjfly73vmezgqd01zhm1uj075jwpm5sji7dzswu6h9w080z03mq6chm9nl0epammplqgajacjk55596e9y909azjkjgjnz8bwrqo45czw9e4oz2pj2qx8sf5z3w5622xa5qcxq74xlgrgw2khvrd8bu606etzn005t2b6b3vjun5d',
                mime: '5rlbnd17h6em9t7vd1skdwz0eht12kgbmrpkrvtztqn1tyhejv6',
                extension: '6ymv5hjzmrqi6yetgex5bvyzcoyezddgnlqhjaewaogw03zg8c',
                size: 8115357433,
                width: 626513,
                height: 412462,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'hjfq8emd045bc4lf0dresjnlhefwqil2chl65459efnm3qvn63z01h6na37raim1nttvjg5fq6lhhpred4wpkx0oy1hfie1ai9zfhbnmeyn5l2lrsmwristy8uwq51p7du9x9tdejyut37ynsyoydk903nneozylr5dfmdmvshyxowusseotbd8fv5ayump1uo25xtehuiijxypoc9n2h7xk807wrelu6k1elfshjijf75wbwgj0z8wfi2oyy56',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentExtension is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'zn1vkck78gij0n4rtqha0dho79gjlgolghi6vl0k1l5le7bpfo5nlh4j9scx1fc5x1uhmho758f',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 101486,
                alt: 'n9fpcjagmp12yc5wxlwt14y5hx7uy2ghwj4qbaht2p8dn66vks8oi1wlsbj3ond3ha9zuhblzph0s77a9wl5b3hfxa7ztyagk6p34b7iwo07nannq730u2z8gpkdq8r07bldh1vxnzahjizi0l0moygjop0k3bmd8q8rcgfb7103m6zf7ka9wr5h8hikrc7vbdgjav02zvbzxd5nc18uc8v5tk404aizrx9o2cfczu532oo2g47qskuetyrort9',
                title: 'dgzw3wsny4kpvkwjnrfbwxxpb2abwmae4grre0u9zt7dpbx0t79qfozwdc3diiiep2frisycrk4r9mn7hk9k49812odmdwkv3rxeig87r865r0kpwcvq320zge0pjgkiz2rde4i105ncdyoyqd6xsj313rpysd7ldtj4aj8o5z4m2ge0h16ol0c326e2neb6gbhmrh21wrwjiakpteqj2xy59wpzeen0441t0jskxnc03ec5lita3sy9uvc4er5',
                description: 'Facere repudiandae debitis est et dolores excepturi voluptatem. Facere voluptate est ea adipisci autem sit sed ex nam. Vel nihil quas in voluptas in odio recusandae. Quo eos molestiae velit.',
                excerpt: 'Voluptatibus voluptates autem aspernatur occaecati dignissimos sed et debitis. Et molestiae voluptatem totam facere. Quis non eos. Quia repellat facere eum fugit quis rerum aut. Voluptatem enim quae est nisi eos nulla omnis. Facere nobis aut consectetur eaque odit commodi voluptate cumque.',
                name: 'fi2rmvy661b9b291c7f5b6uztfgv0zci2hha4x0cfaqibl6iqexq2768mkmrozsntfduqam8y35lynxmfn4vv64207lb2k5j37s8ew536ztfq9k2chd1ygwfzfojw3hbegu49tiso8098i9m1qk39bz4m169hd4p7lenbeupm253te6nlz20f7iaj86zubb9xnnp7f3sp4kkzxn3krlm4tcqe496dtz8cc7poqtfqj9pre0j5q7evjx7c3j3cn7',
                pathname: 'nipftoem4udu7i1isyfuwdbmmrltitp8qw0s1cd1cd4fyidunwlm9k9pcnkl2ml0xu2lzvpwgpfx4df8p7szytzya380ljde6j6vqohsgkthjnbg8jwh08k2ky0i5xbbz3vyifmb8rb4vlm2b2fm7j6wq91ifcb5weji06q5oje9ue6x2yp6aiuiatmito42mc6nnz0dlim8m5jbnfp05x55k3y98jcrodaszmtg4ayiymseoi6dvag7l8lv86yjz0up13u3g22hy5tlxjguiuhbnq9v2sisuuxsa66a9jsui765r254sxwz67scx4vt1oidy8dkxyibkfrxcj2yoq91mlrcoaj9212hkz4bxiakn74u7aguzscvkhujq6tfavwftbi950vfgakptu49n1dlim4uw9xrm7wdfbwrvic6t34md4rgnaeekv7vk0nb6ngft8wsi26vfmm6qbnevamexhvwrkhksw83csduaglglxlcnj1g2vb4aorqaym32pesvhkbuy4sjaeiybyyfh3c98weqxdelhdn69ziyc39jft4ogbm9uydmqxwpw6z3thnzm4rkq0lyovxq20c4z7hw0y42pja26u1xg25dcsowu3n8m8m6646zzak77xfzza306xu2y9n2n9ig2golbthyfb0mnbeoe58r5yez5cdm7za5nooex38stvkqu7j1qdnkkt7jj8930joxszs0yk7je1ohjk3qoz43de1pbcdqeg8miu8e48rzv7a9tzni6e4eoc0qsasoh0kfd02m56tbb2kg4d7a6b8o7uw5u6ae4rgy9h2rry0c33xmkhj7w8xgfqpjck7jxejs909u8bo2vkp6fc7on1p3zm485d9gcpjawjo6gk1s27luee7bwqe2ole6nc5u8t5o6ryq4qyvsbb8cpc2krulv5n8fh4qoeilop9koxx3t9a3o5d9p6vz6vk29g6ipj3fvooqz6sy3i9eyhizz1qe7keynjjdfhge875yvhlpaewcoy8',
                filename: 'vjwnotngpr0gds57frwgveiske17rpp8m2hxdxuswsuddvwj2kk87ai63ekvou2cbqte6ify6mhj848erwrmgv1rbnd313nftuyjfh15hhw7nrf4l47z8u2uoccmqjqdctuvo1v5tzk4yym2bajfv95fc2facv21xuvthmuqlzpimqj9t6z3bp7sv8mxo9cyp8icgoj9eq4duqjkicqo8vy63eg0w8crnj4i06993gjmw81tffqeqs4x7849po3',
                url: '7sqipnm5d5dhwf89ohnd76irzusz6hrdhjnivkzr8zhss9xkeghm0yy0p2v03di4mxggwugt7twjpfuzds5f7hbyntj3iycnt4cdob8fq7np3t4voo2enzsty34ci7b4gb3384sunng6yqxkbyxtfvhzqch7ysr5d6cmdfwshsxmo7vp3vyme21gdt47svqos8xl9ytaxiq64rl654mvo5aaln3rw53lm5t2pyr0a6rysiraii9cv3bl7dfqb90iuvpotv1vccrnc72g85lolbi7t5qcog6hn46011pemna0dkmqkafyrp65s8jr0l99x4w2kuoy18hzoyckjq3kqifjsb4ty1rjhzllr7p44pt81ec9nf61lq35zunkt1vu8zn4nf51pxozql84yk4zts0zunz06p4lzbvyhu044e23xm4bjrl02ddp2ww7kbkxhvnljx2ds4kw9ei08xogkbewfp16l2dgg9mxhu3sp71dqrcvyw2w1sxy253slvin89q5jb4a2xsdz0o5il27xu6gk67sl40zvryc1343fuc9a49h8zr708scg905qnq2w3ufuevfx6867pl56tat64nztqwr1h59xjvmnvf9uhd2tyflla75nm0cgwa7nu2j00xtvsqflautywsz2fzn9ej6ddyy6arhdsp3hjtskri4nkz46fg3mbt5va3rk1c7m53dmbs5lh4frsexl8mwc3t9s1s1d7g8uyd8miwusy888mgopgy7ujkf7jr0h2lr6y979j6rwc2sq16recqqrpey3lv3u7i1mn49z42lxh9jdctxzfxfkng5gagafoey46verxznwlm7y2iwxxs4t9wjepfm5jqk9x5s375ey7l2xy8qstwsjr1e39rc7i56y97h056xej26dnm0fnk43be66g4z0r8h1amag9nagqdzr368zyvtrcje81erhph4q0054c2rvkwsnaewcdg57kpbkmhtkbd36rde5diab0t0zq5aeany70mocosmuqz3',
                mime: '3uzqrhlyebbz9f0uudbjchwfdus03f1tj2vv0mtdj7zyp2rd3d',
                extension: 'ur9sl6vmwb7v47xagsl1vfwe26mwkuowx09toc8cbzhuu2eflaj',
                size: 7735196247,
                width: 219246,
                height: 219819,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: '5umfk96lc93lywiwnes8hohzbny5883jq2pwsb76srl7zx27geg0fvt6m4fpnoq39vpbfwo8d1ct25v3u8hr0xpg98oq7vao9g3nsl91w96oc8r3wj8e0q7zofsjnabmdi3x1ac247ins531lpo8nrpria81ilwwa2u0ges8f4nmsvn1qbbkng3q4jbr0zqk5bb1aojf99rqvgg3pilcnhopumtnz2gdvgmgbu3qbzej0lwuyimmaabee676hoi',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentExtension is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'd39x0pchxag8uuubgauc1l1oe2agwuq5kqnb9mglntty8wl5mfd6rrhb4gyo8ojj7swodmewbqd',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 678995,
                alt: '9ijnqc8gckuanxy698l8z4l0dcvavfkpcwm7nyxze64s9cptyl10umzz4dw1xmimgzcxi9l2kohksqi1vdya6nqavffg931g3jtzpd827fnwcuwhv4vsmdkk6cq08i6lqspp0vg6ejdbi7mpfcy90gxv75qajd922grep0aqw5q22g4wvxu64zevlhjf2tl3i27g0vxvmplshowmpc1hrt3b9634u3adayzvl15vu3s950rtel4uowljeq0ljhi',
                title: 'gcurpilctv4q5up6p7c5wjemz3x584fxa3p6j8v2pb525xiaxv19dnewbv7bu2zpcw84mxi8exon6rs0wj54a7bmt0ntcfhdjustc329c6xme2o5hwdz2kvmyh412xy81as2k6g489xy6o8u0o6kr3klhauyx7d4ao9y2166cibzciewl2988poj6bx0cla6ef409et4a84k015f94g4jregetw4g6esuwptjraax0w50qvxaz6wu5nlo1kowgn',
                description: 'Ratione molestias omnis recusandae sapiente sequi tenetur laborum et. Accusamus culpa doloribus rerum voluptas earum voluptatem voluptas. Maxime possimus et quia tempora corporis iusto.',
                excerpt: 'Quibusdam autem nostrum inventore. Repellat molestias quos maxime hic. Sed aut assumenda libero quasi recusandae expedita qui dolores. Repudiandae nulla et voluptas qui dolorum totam. Ab dolor quis. Quidem eligendi eos nihil natus.',
                name: '4oa2dsf9kksamgt6fl22f2obkcdzp5i2kdmpm4jvz55stenyj12i39ox5ezlg681rq5425m9dy2q9bl9sbphe7frhvd5k2giq46nwogy1mj9d12ctd675dt1ysmxhczl36r40mr7ptwbsz7jjwuokqeohdy20jqixsymreheaiibl00yu9ay1dpa3x3ecwfea5xkee9a4l1qz7cwgg4arh8qx00jow2kqi9iyidbjrb2nzw1fv0uqr9jzd7mnzv',
                pathname: 'ephuoxqvyt705l94hwdfqezkjtk5stbflf9lx4wqy05qw5cuz7v3ygze3icdk5d7i63xvbv84uaj83fax56borbgyadqbl97ta69uk5kf3z8tewzop7eflmqifg1p4iwuq07iu871liaxru1r1ufgo2jltnhxc6ta7sahcxjeb46t1o8u0yboh5soxhvi5hczh3hv5rddyjem0ykojjpac8ram94kv9a8ur6eae0manvdkg8k7e1rp1x6x7l0ntpfbg6vrr31dp9t77nv1931bpm0uujggwsqardhoyzs4nsw55p1z3to9qii47910tjvfn808tflagvexni38js2jpsw021rsabbheqwvsqyco3mhg3aquw3u1ehtph3zr0xy3jh7w8vr97olgct7dgb9tjszofmmhn9ntvhde4he0gtz0rgzaj3hhsszuljq3ysl2tgi2ps3tr5pl8n00p337xyjz6yme56pq9n7acq6snvrt7qkkzgd8sd3ksx892qil8b7j4pl3mg7m88n5mnrl4zyut1xqbtt8tfwggwiwo9s1j446zdauu4f2ah5m5692pv8s4el88xj5zvow09ohwk99n080t8uzfc9dcum6knap188b3mj2xw4n4nlms4jxzr71olkfupgyb7ipap1iv2vkwan50inrzvnkija6nff19gpc87dl9swk0or2chlbddybodu1wcsfi7uo9t1cljf85xr9aq3mo8tizg86dvs9yqkbllehrujsvdbqw66e61ozqqsesfdnfmu4c9nrrwsutbizo2n9a6hlt2q7pvyqm0nja65ua5auar7nqse98b3r34vrvpf96w5d9havggvk169aue9tknlgxtmiswlfw940gpnelansru0w5g9wstxtvcebm2zc6a0cs3yp4blxdqsvh946iei95x3g12ooov3gi1qyp5svnl7e0ryognox6n10wxlp0jcit0oi9xqs19o825mffhq7hyt0o3rc1a7rh662jzhwcln46',
                filename: 'hjbrc6b3flwdxs7i0rbhaek2cum9xqyzztnbf8o7t6v9cd7orpz31jmzl7gn91wdk37j4bt2ztqjtz7ax3889byi3sf3e51pfwcjtkx6xtozebwjjjfbkdiuhph8n0scw5h8uud8dq69bt5edxmoybumunoshrjsz08cmh7dokk9othmhtgpqfwf57bc3hhl7zemrnu6uj5e4s2pn5dplctq0p8e47k5lgk1spf9m0jnb0i2xrz0wu7cg0h8tu2',
                url: 'jtur2edbytlcdqvq46ju2gs8g2tmjnozkrwybtflw4sbcgekynn0suingbuono74vtvydmddjhpkdkw0bge1lvvlihshxqokbjex13nmaqw3osflufmkch1w6racemxfi94stotjrk8xgc4bw0ozrkcbvcut99qmroh63sih56b4qv3po4ohwzluarkx38jmetfhi4099fqy4r4y2305g6t2ckur8yazho1suwxk8vt3weqec8auhksxo6vzduc2dec4iezft49uizov6rjw64ynr0v231i540tcxcdp4kogebflan232aikwk47hexwrdxavno04dxcm51zzgw7iylb7z0v584c9qwykqbq6cpqujlrrn9dxqedtiu6ooqnmslujmws5tyw694ovimbjmopo06mj60ofvu3r1mfbi1wltwrt3oyj8y6xes80hizqb5untbb9ht56m62p21z0d1p6vd4ojgaknpt9i00m4j843oziew5zb97xja2p9sfyd9jy72m4u3x5ekctqhx4fua9q10ki1z4op84kp8emxcdjyxf42pd6okcn2woxoo70uet6r77tkgnbyw235181ilq27p7rvkbrg6dok1sacu9qe6etzf9ib6i6vrn02hzb3huibbg5qbzacq7164nfyldzi04dx80hyx0wakh5ulowb4h2rojbfe2pqdg33x2d3kwz9ixhewfy6rlpuz6lwpisfhz34g1p8pgpx9m2zwpv4568tgy4z4f6o98ov18iopseom435ruf0ca2bhdirom1sjg5wk2fvj3kthzdbraz6t6yxg0fbgz6by43w70ild8b70cpbunun7aq7j65kj1mv5rt6wtztsdzynz87w3rl41gfjru8aqy7rp9fsoichmxlmswcdhczjd1bzwdzggwjs4c0ow3eegfsxikh7qooyrwezbibqiae26mgj4e9cwcqy1o0ps41gneqye6fgbwrgl94faajowsvikel2lic84plyyvkgzopvo5n1',
                mime: 'p59c58ophlrl3d160emz4aijvmtaw38s51nufm052mcjvrgnnl',
                extension: 'ohv8th28gd4pismaob5tnvr37eafmrpu17y2fus4srvytp1p5m',
                size: 53311702287,
                width: 768387,
                height: 361305,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: '9vy1iuhwea61jbx4n72eoy1khnd5d5fekx8hu3pbo6a9n00nj8yis3vz8evt6dr5unfnz3llo36388onzw45z48v6fy9n2051f1hoygx1kyc8jul2eu9z6abrkzll2hqecmzmdllo0tilm2swa0a4k0pctsb09cuta0lfsuydr30s91ai9et1t65eubgutg1md518srjbsqfguzqbnd5o0k7wm0p0yzvx6t1iug9lufkwah47x72lvr8lpr64y3',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentWidth is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'zzrbky9061iac53kyluao0akk9cskkt2w32bt0738xu9na7padyaoxxor2u209llre6c9eixdu3',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 165636,
                alt: 'fossdmchfg4brbf4j1arnrdbzr0s84k8b0lfic5wis0l87kwc120t4hi1557gp8m2bso90aasaibz9969un43jkv8xq5wjgp07sjad1wc99cpxjchkxrp3jdbyr4c3xfj12bznc2p3rvge8qmbmy43kgpfqtr5a4pw838tsshazin7iopayds6as0yym1hii0jnknd3uyvcen7asgzzo3mzbqeo1yjll8oz5x3j3g80opjvt97ama281sv3vt2l',
                title: '9vcxsf6opylj0qgkfrv06cz9jvr04mb8rsk8fqj5nkucjppqk6vdrtaxoy4s3huk7jxpoxiv2bkz4676wmbqtvb8o4qvelb9dkvnjs0tyfnevnfhapj3oahlaoqgvfye1tkrk5pdyrymntxysoz9z8bi8cmkes6whvc1jb8yqo8x4shonmi618yfokbku2h8b6eqatemdkppfua4qfhy04df173vtgrf4we139v1omb714p78m8izr9uk2k5w8u',
                description: 'Corporis aliquam rerum ipsam reprehenderit sunt nam tempore omnis. Ut et ut non voluptatibus voluptatibus. Quasi neque quia iusto rerum repudiandae. Repellendus quam odio qui dignissimos mollitia. Laudantium dolorem voluptas vel ullam. Id accusantium ad unde ipsam itaque in aut dicta.',
                excerpt: 'Odit quaerat nobis omnis dicta et. Quam voluptate eaque saepe asperiores. Vel eligendi qui rem eaque eos alias quibusdam natus corrupti. Suscipit necessitatibus aspernatur unde expedita quos quidem possimus dolorem laboriosam. Dolore quidem et vitae neque veniam ut reprehenderit quia vel.',
                name: 'wl88u1d9zhnljfseh9pb4iq70wzbvbc0wqepvchrzh7gii846rzx32iiip09n651dmdx122oh9xvwnv0fnzg8rhkts5yx0uq7p6hqgc4k5oujaorf2fkyz85w5a4qvhst0y11y68vy8jnwrfl4yuco73ddgrpl30aoox7oab3cn8aekcie16x62qp53b0uad849o73ythevn51wpnppl4uheq8p05e07903qcoxd2ot4zwd1uo828t6d2uzbidm',
                pathname: 'f1x6txqvhbp8kq4zuudzxo9qg5j20tnu2jrisg1qgsutf9y5dgtqpbyzossucnfu8mrz03vt2ybrumatb6pwxd28x4ps2k13qum0v9b16s58hwqcjly8qkgbkqdeq0oh5p8zl6ib5qp1p7v1sk74jt09hn1nhjl0nnoxl1ft50liudhcrfh3f9s3cim34g11j27xqjw7yyack622e72fpegrc7w66zztwwcp61fiueji82dtg0e5k8fdatfttyceq917o3ad133wcrxdhn8wjae9rdgg1ju7yv3relk73jrrm4g9kkz2bg57kp4v6594lbxxjjn5jzg7jf7bfgfezmvce86elrsc066sbpcvc8d3of7hcd7w7bedxc80u7gkzytkg6dm6nfyywcy3s3d5ohyy7yep0n5swvv59gr98c7d96la8gutudxk5roak7qyy5cynj8mg85yejslx36mq2lm2da9aitmruten1189nixstv3ugsopzgwj9hprcszpcp6ehjbysobf1hy71obbdjxxd951wn5pl705pjdasundk3b1dzebg78m4txjytcn4y1w0wh3au6xsuoxf4vb2v9vn4uzsqdhqtt3qqwxz3p4pxblc4qqcapglwni8r0p58wh30gxxzj2mrwt8jmw6sx2at7ylxwf4hjbyetlrnhle5697miuz7octq7umzzziafiiked3fyp5dpl4blpkz54u59x8b4eekmjnrbn46cn0iwuub75enaildvem3s98jsc4x2jnasajcdu50bp4falnqo2iattqq5pazof2pes71fv8ih2wtcbxptyyujgdxonfcc6kk34as7039ntl7gqdq1qches1nosllmyzk9aqbsnu2665k93qzsnn2beykz89p9kgxpw2mn6otbdq42aljcn754ey0ixgyrhnygnnbzh29j73m3wmpaqb33p9sdi9dzp96q8bd304228li2cem8eld69jdapngcurpndivy3tcmkt8glmnxf50',
                filename: 'ho237cq6xjdx1ampu6a2b211xdbxghu5des29tir8r265aktqr7c7pz7q39tkxv9l200yn9np3gxb4aza6qvk3ekhi3ywopfmvssxui01sdgskq39ozh19ebfgjwr2poypt2srxrxee27o18r3rdukqirv24c21r098gddd6jytya1zzducc48denasa547gubr7fyoj58v3fmqlh4kao6mq41wc8et9dxu7xuh7utvhntmnd826bhy5lvrt7g6',
                url: '8ltpo66iyliz1abztmolv4exp3gpenncvnkyt9fur3s4ho752mohq95pzbyot55wuhj2xnbntcpmpo9ym724f29y76xb7p4y2la5s9lukjphcch26hx0qkvvxwhg3q6962cc3aoemcxf1smdzw4i7i2a934mhej21y2hzrlskqxmjqphvh0sgae5vdfy3u4vie004r2i8qz10u036zeymdroke3kh42k67dsjv0cbs1b2g6vru3jc02m10fzs0vp1b6ug05rwrdrzok03iruub7fvlwa046pnc4msobu0xz3jtuyvwwavwxotlqpdl7a471ry5z9nt46wmb0lckxpngxhsfifg7bhp76p0qzdyfbajqmvhej8wxxvqoodm23a9d1ik242cxgq23ox9lckc5734tuzb08qnyiw7v26gnqt7h9qjlork0eb9ku5q39ko2khcrye87agr8cxq1ayd62q08igyi8hbgvtzq9ptdgoq0xvrkfrhxy4f66x26se92xlppqyivw35rer5kk47cflc0e9d2x35ylportsysz7fp1nitsl7x472p2yfeq7bjpoddidokx0i56kf99qc9ice513zapggylcw5qbnht86e2oyel0mvnzd8kmlqpyzep09jxvp1ytlmfkcaixnnx9zr7btk5yr9a2ywzulb3oztuwxlvob4ls48xmydbk310qko8q64qyfdlqdkl9j0jg72k6a6v2lnrb6nv38ipnhulvy10299a80oaocxx3kv6lj0a7z7sui6phxf40kc6ltnrcl7dnjkhh2go0xlgzpb8f45co0grtlll7qeko0t53on05qxid2y4j2q8jzbez8t54pi8ga578mz0zketgj64s7oavzpeloiocrw4fvefjtue1t75n1jecyf0xrmt1jsf3mqpwaw92sfj41q29t805496t9a6aa9xjmdd42409qu4tdgic1c8imyt2apb0xe4wi1hlowwy7i5xely886byezpevwun4a1a471',
                mime: 'w2m3oq7gksqls2stonpxt1w06dky8vlyhfypjoupks6ldx881b',
                extension: '8lg3b80nzg8g8s54oi0tu74ecegnkpervfb9hebawotip4pntp',
                size: 1696547465,
                width: 4923929,
                height: 959065,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: '7ggz7rrnmqcamq0hw2uj1y7ai6wor2xqetjy4xf7cqvzbtsjjgw26lx80wis4mdq0yxbmrah5r406ean6it13nmq3l3i27a2ci3uuae30vpi489x4jxkrwucfuiseihqxgo4mvod48otnzmwouggssg6ulzk6aoa7vraoef047hfgn7ijela1a6plzcohn2j7k2saltaqu9rh9tx21o04vawwicg7tppnwsr16r1trhbru9otzgepf7mish0r5h',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentWidth is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentHeight is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: '7q4ft4kssq4gmytxxdzvo1cghac5wmsecw5xjfg91736u4xqi8t6e4wmcnpk9moc0d6jsyd4n1k',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 618318,
                alt: 'hn9dvypem7omx3059meieaipkx15vumwcwayeiwwg7876nbgiivz8uastiih9p5396dfz304naw7eusrl1xv5jmvdd0cm9obyl3me1bz4hm1ixkkgt2anylcrf88ni9njcgqpuoyxx6qf5xbgidkdpkfx3m88lfgvud5w6s7pzwto1hm3bcv6c8vyw89ije8epqq17zeki6028bit8u9isdj3pdm9jfggvtt5qfhz2cpl20mxuuej9xa2kh2a78',
                title: 'sfx5lnk0r2apopcebkcaut7uk1xqg0l4jdqij5bz6ohyuajqxcibrrpj7xllet6959w7kaacntmzgachgj341zwusx1h2sl8u7cdu3z4ofmkueb2hlvl1m7wczk1zl0sqz34la60sq09rrato4fre48f13j97t60hmjav8dtsr6offlhaf8z29nftddnk8pef7uccaehzrui6g83it2fl3k1dc2i9bzslfkv4b5n7mwxavn6nm1xqpgqan39omx',
                description: 'Ut quia molestiae quae aut ut maiores sint a. Minima enim tempore voluptatum sit fugit ab perferendis. Perspiciatis voluptatem nihil ut velit officia autem.',
                excerpt: 'Rerum consequatur qui velit vero. Voluptate distinctio et. Maxime cumque dolor consectetur et.',
                name: 'p7zdkjskrmopyfezkmgozmn67yshrwvy6q5as7032x7m5nkraesbqugdf3l0t9tznt5oyy9ev660f8nnj23ktxcwbj8g3cwszztm2l06d3tw7frs89ctgbjlwy7oqxhndchcq9v1ige0wkytdqmkqvu2x33h6xtswplr1tv1dkvl2ha91npcpch90k0qs4m73r9m0ic3aozhsbc0dgsxzd2slk8g5nnuc3qna2sfehdwxvxvxhmyrly6u16deb6',
                pathname: '0f2x28gtivwc2ghewjgu73qq1uf1nav5o6pqexeyk0r6o2ugrwjk3tj5k86pldzlc9od3f92ov0gh2u8n9wfq984zui05yc2v6gtarewb9s1v8sur9hq38cwwz4pwqtm8d5ngqiuk7lg0ugmrpbsd346p3kjfpj1y5oan32b4grpgtefqeifhkoti9r277l7c80unqur4s9m4wkkjp8q7us4w05n0xupsdveakpitc767smuljioifwkxyfno3y8xf5cz799tx6qp8ez6dqz5i1r8c53z6mhpw4j40mclnwhfulz8vrmqag907udw57cozgxbsrgzkobcf26uaig4b8afvfypr9p6bilx3djh2r8722hh4k8tddunj4p50nms4ogxe58pe9tkyms9s7u5a3wn5yh806l25wboset6dmyco11uewadm0cni7txrb7qus3lbvy1p38ty65lt5eqfyauix3zxcjkyetdob05492ojx9dgh7apz5m3rhs87exs5k3oncuwu8kutijcxg6hakmqzc781bkua9sp3taxt31hk1bx7qpybhz42yab9ymv2hj5q5kyftl8j7kzxwr19avqaq2bhagye22j4ktz7sx579c5kz4z6w65pcgsoon1wxwby910q5wrtvtq7znq338e6e0083yx70oi49ql9qacfybalpoc0cu7dd1emx4x8r1uz7t6q9tlg3ltgrcoil559tt22061c1mer1jmltds7to1l67zc4a61cdzvnhjdn10z0z04vqxwgk17cxofwyv55xuwx6pm2fcbdng6wbkpphqc8cwmyhjibwwchllexcssn9btqlohotvjpm83gasarypkna59tah1ga0jvfymozc21mb48cmvze0rmagefj8o3w2isbvw4zgpn1ue4mawwrk5lz0ykg60h9k7iqvi170j1f8bxjabzctd98omv4h40na5kvj1r3eup860hpgbtepgu6mr6klf9rx9tfvatfs3szbzv1vs96572',
                filename: 'h06xvnx3z9j7i9v1vbptblmf177ck6m5u0cv44qijvab3gtzt43yx3iqmrf285wmxsj86uh10uo2knjd5wn0b455o81zm1zantoa089gin15braru4et1f8cmzxkthp7taapeietm8siinbtw36lunjs71mymntmyw7dtgt7598jb22vf9v4emdt2oow9ezf3q65d7g7tegvd4nk88lt72n5zxf7ns6hlv7tc7bobkf6332fump5r15ekosnooy',
                url: 'fc70x6d7oqbs24fqksg24i8pfaasvzudpu6fede0evm7lktexv9k7ihflcangas8969u4bdos87ntiiba7paunjra6ba9h64v29ow8cif04e8jeujur40h9el3yxw1qlbwnzjz2ghhhao25ci8umppurk3vozba4te30hjz3mntkupwl2kwob9k42vzp2vyo37kino8blyl6yyts45qfeed6h8xjibbfjjhxj2xwjbnfbfzv0171gc0n6fknkx6xxo54vflg4wknhe4cp07kfikdqbyo3sjtp381mnp6eblh9dco7tcz3tcu3u20he5ahmjpemhf9gldblekbuse6r99hdzew9qbzuzubjcgdd5rjgqrcjpbpzeeecpnwpduz065olftzzqf0r6spk63jhs7c7u4dxm1gsi54bm1bx15lgk5pp2mpb3tg1ds1au9un40alcs49v0trscscmq6cljxzkue8ibqstrkjx2oye372h2mkob4xtmxt2ots9fqfcith3lqrxhofpw3miiw8d28gui2yckfwljkov9drz9x24w5nyb5ircx83xb4si0xsa18c1egayuvcq1pi81ye2nmvri139ml7ust81i4ygm6e6u2awn07oj46hywx6meggo0e3g43vbwnwvwwzyezryvp1langpjzdqwx6g4ku1gkn7n47529adur40at8zrcybrfoj55euegr7uxqdjuazkwsndcrbay2vdoibay13cq2hv1q17srgds1efo34xu27071ojv43joedpisq59mpd3475vuk4u2ufdu0ytm3w1en96hl3oif3u5l83e9qsofvgwz79qf5dcrnlp1s5ql6zaqb4xm9jbjl8m2dinzauiw6j97gdxuvl9x2u37hq0y109pws5ey9nk8iii5qixkqo9j0fv7czcmzwkxdvk0bdcolin6zug24y87dineghp0v8m47km9qfp4e42m7vyyau4n0cp2gew1i1atk0sw4en1r9n8gkmtdfjm9i',
                mime: 'xmm6jlefwrz7br9zd3hv3jhdoy8q3o2grub4kzzts2jrg83b7a',
                extension: 'ac40qqmud1bl6zl7gp5ymnfjxc7vhtvuv00xm53rejhe2ey4jz',
                size: 5675014020,
                width: 651188,
                height: 8541690,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: '4ghpoyic5ewh321jxdd71i1s1pcp8qqc84ghg66s9axs8v9p0q60ryfxol6468x6fyrdzka2dnvlc0e5phfu7pvdwy93p0omt8cc66i9o5bycljew52sd2g6bn2n9pczhhqr1l8nxu4jp4t2umt7mu7p4q0kkx3yuvl9oa9990ts0rkeedj1x37h5w9748i0cbuvc9un2ls7zz65fha2c7qrf5baaiy0zo9xulfiv7sqd0j00kh17dtrwclscf6',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentHeight is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLibraryFilename is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'x0ychbx85xozujpoqsjusimql9xgr5gexbcxe398sdllgfv5ga515m74r408elmnmocip0643xk',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 283457,
                alt: 'ew4947u74apd92keaieai1vlugmyq68gunuxni4k05o2ne93ff8mmy4xmxa7oh80yhjrei3p41i7kg2n0v7v314t6t2b7zkslmojxcmilio1l9630yezd7p4466f6bcbxdxaqxmvzf2z4olsxqxtl08rrmgwe6gv4p7qx7j9sqs5g478izlseih73ox1qpxfnu6fmmb0ze5cgj6fa3qqeax1g5se8hnch4m1ze9cswu4kmiak8mg0uqbvguy5vr',
                title: 'dfgn4ymzuawlys8uz8iepzq4fg3fe53rmp93h8k9t3nl6lup0mz2i8uu3e8y8ghwukf52z4qyrfay35m3mwsi10r4h9tpt6qoi8gn8gqdmvouf3sw07ocqv3krzb3xiphj8wa2x5nil08engy7kwhzm619lkzwufd0b111wgr8kewefsxf6z94p1yw2hnbj3oskm63ojddcjfzlajp81n53flv02tvu3ziqwhb90q0m8y7vb8muhfh010940anv',
                description: 'Sed ad possimus optio. Facere doloribus enim et. Aliquid beatae in unde consectetur nesciunt voluptatum voluptatem.',
                excerpt: 'Consequatur non qui nobis sit. Exercitationem asperiores facilis. Consequuntur et ducimus dolorem. Aspernatur odio corrupti quia architecto ullam optio. Aut rerum ea non odio. Et tempora delectus impedit.',
                name: 'jfgmratoy2elsavg4ujjx1iob2naqq3u9ngh8q1ca0b345txypvgi6a56vpa17wqvyfz1jg7vicuqj3bvnvcwpnhd2c3h14a7er0i4r7ing8jy88qo0ghf0ickywhynp953uh9ubeb6a219msev96w07huavwnjxrpv4p5sz1q5fs0rpjpzkgxgt3ulrjjhi6pjagw7cesq27t6wtm7nf0e0dpk4ny4019kc8v9ss2jbo7njx0t37fu03xjgoue',
                pathname: 'mrph5mi0p7s6vcaux7k8tciwotd99xlqou4786vq76kkrpogsriq83siqvby3a3fyi0qwvo9cspqtne6p0mzkthbc19vu6o6z7qpye8533mwt3358kl0vcbcj81o55140eqgpgce8j6rdxryejwck818n97f6furgyj2lo7i093wsmfl1772wo5jgjsvldmmiug08x88alvuio50q61odnjuy64k8yolvhqd8br9tly2novni3r21slop8napeax2wbuuy2pc1c1w7q50fauxie5p7oafm03vgc0hmkbcrsp9x0azklu58itkbrts5rvmp4o83kihjg5qgqq7r0xv18yubypv0rf3aihshfakpq1hpbbch69hoyb3czp1h0rxbijcist8c6n1fw92lo6z638xp020v394t2pzsejny0k18007a26zlx1x32gng2v5rrr35qgj01o68zfz0prlvueahib0l9k7s28zgbbai7uooy47hmlmj966ib8ukamhrqh8cn7by54w7d5k80wyps30qv6q40ppsljvw17i928q209rxk18hrumauxvao285ncuqj748l68bfyni0glx4u7lmwlt8qa03hcxavapxvk612g1om8sw2v90rdnhaexjvq40u28wz87ikrko6onnbubhpd12qwuaxuugtpltxxhp0xvxfqds92u2x1swpsiiagscqqx9rlymrl52odpa7qwa0r9zz08lqgetkihh6yw52wm5je3l6li3zhr8flz7wz66x8ut9n5s09ywy0t4gvdex1pj2k4p0t2fp13wmj151ds2pig98sd49dvrql3c3dku1r9n3tfc3s48bqq2li910flqm4t0wxu3ujsqvzp9xg9j9lo0npdd3ianqo6xbh3a2u8cxgytev47517ufm9ao6q9uzxb03xbf2d1e1e5l4rhgr0er6eonomr4cd2a2fjbxujdm1aahp43zoll9tedyeu2tzixi9h9dctgvh774hoeggbrwrw01cdl',
                filename: '5aycegvto4l24e2e4w2tywf78gpxewo3o088fggbrxc5xfa4pndoa7d644akyjgs3rqhlcmsnzqw53re2gwfzwlx8219khbhi3ss21jy8e4ca5ykl16ody127k8vvg7v46wajvzroduffdvjt38jco07ql1xidmxqilfncl1m81dldiwxc2d8bjwskfgosy20cp3j0g8bmhwxx5jau71w0276p3ut83a7mdrjtsthxizdrlgxuk9yujfu02ooip',
                url: 'b8v9gzkn8quiixouhvl0k5xu1scnw91afcbs3whp59x3l6zt39tg8jey3j48f9r1oem7enszmlmf4bwcgr5c6ul3dvckko3nkg50f28nbckk9j0no7aoud0cfl7jozpqi4crwvhui3es9nuru1isj5vj4z076702apoik2y24iaj6joq3fujkzsltkrmuj1cqxj3a1uuynrc2pf1ssqzrs4falkyg94rkn775jfvmq9ueucygnivpv6f0pf70zu2rbtcm0qmpxpve4vig3y7kkpkcplurlzqvqljzf2iddsjbgior7ygpf9koa9y0b8gto691pxreuj5minc25lvif3ygn9miua2lw26xm79dkyt29q5epo45goup4b29dx0lyuhmkf2e2aibw93qj6wfu9hp7m4jzbgpbsrofc8d6pkl4z8um55a6tcjsit0qynsb42gi1p9w47k3p0uu2c1et29wh77fr1cjof25lf39blusem23xp1r925qy0o3wgzj3624wutaqwxq12zk4hhmvjf6nj40drospwpbt7sr6qa01tzabsw7tyh7a4r3mg6xlticlpwif2byodhj9azwavhavleckk7g0yjwo94vz69nmqea572c2ys8q992ak1wip4baa9uoz5dgrjimfhsvbyzuc0gzffcww3kyg2i6gzpmesueoqo2q1zwjxbyri3n1qaadlnguf3gerrfgv0h84rorkgh9kiu5n1stsppad8g933ji8cgzw17rn0pfn5vi8wze1lpgicwmpigadjc92hfnozvktvrppetgmac9ujjhm4ookbyd7guas948uzl446vsjk4hawnno0fxhaehd3zy5n19ttv0nid7i51e76kzz14iy6f4y5v1fxx9qor24vlfao0g9o8ibbkzao1bjy96sy2xc260a5wnqd90lyehqfiqrlvxbndos6nx7ztbnt2cp0zdm1q850yvskgf0osdqaybxo962qkdst6tpbp2zby6x1haj9ec0dqx',
                mime: 'whel6tl9k79kczp4zfuu3kch2qi8bq27kd0bgw93nvmg589ypo',
                extension: 'kaalq86brcxqwo6egv7svzf0s20y4hu8ire3kqbjqvfid4ix2w',
                size: 8565935717,
                width: 493315,
                height: 139451,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'nmanl4r4qlyu7tmaabrryr1l8xbowhmjy7rmq0smv0r0hn69kwlrafwv1w3h4benazxcpwp266r3min86crjt37moio2o7cvyi1kvwqsx1t2doskxlxsk858q12otciqwvo6dp3knilgc6jpv1f67cnxwhvsiwxoix15wgbck6nf7qjkx4i3io7i9bno0hn0ow0kdsyu07hmv1egmszvqphmv01v0e7irhhv9bc9s9amx1q7biegudculcbenwyv',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename is too large, has a maximum length of 255');
            });
    });
    

    

    

    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'fx0zm4jds36h9o17wdy92ykr7tewi1r61td5m1orsqw00xyfrsnhtjiwgyjwjpayfcnkn296v1h',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 793602,
                alt: 'a8slx9yoq5fpxea1bvjihebvt2icwx0vk8qy5cxnr4qvcrb11kzcyycn8t9hbkc3dpf6j7r1vcjxepb6orizcktz3c843vznocgaldby1otixgm0lpaxacy1cchzq82laegubefejmdus6rk76zolbbq3ym9yxi5xquqn13sx3womxz3st0u8isikx0izpsr394fmfwpbhof86vny1b8eoi6af7ywoop47m80oltgl9qdqem6iikg48wqojpkou',
                title: 'aod0ktduiu0st38qosojzsorx6ae77di7jrgq99imp227rvesz6ruw8b262sc4771e36i7nw7ut9qqjx2qze35i7t7lidwl600nj1o3uchozti0pqvuxathdiyynxyglwc5d74tt19bhv1cymwj24ih1vqioiufiem4bgd26lfzcwip70hwxin30aunzt23v7bgoa94ul3jxdoj80w7ma9k4i1sbt551rr1ey9jcmawg2fv9276iunt6xfkesv6',
                description: 'Aut aut consequuntur eius accusantium minima voluptas. Molestiae voluptate voluptatem esse omnis quos doloribus magni. Quisquam similique et ea recusandae dignissimos. Quae consequuntur est ea quis facere velit nulla. Quisquam illo totam.',
                excerpt: 'Occaecati voluptas inventore et omnis earum ut sit. Autem libero error. Ipsum facilis omnis. Dolorem iste expedita optio.',
                name: 'ukq69161bxu9q90tamaqowxt6qf1qzngxjdl6mvrw5m9y1rvbajxop9xdu1tggnagrkrl6uwydct94asxaun6ozbd2vw0di47v41lgfy0jgf11vylyne7t8bax8gfxoocty28crk19wccrouxp44vytzpigc6nxafiq4ahmf9rg6el39tesjpigfdf8f75bnd12k6zia2lunsrdds71spjsa5civdgj1x7lxd76ldi13aeoh92ld25661ivapnb',
                pathname: 'k4itbmqeicyl68dlg5jz3k43f8qt64hrs26nxwpp14dl7lz5xt2khl0rqnzf05xa3esipvvzylzl8yrmudz0p9evchmipdn2341b488wlygtg5hzwed2ue55ww1schx5kreqiollu0hu2a2ecw3x7ucvwn5539stfl5o72se7qhf1xk7fq202b1w43fm6xdzd7qtwfqko1p00a8s4fwwkhwgjnk7xg6djgwd3eov8youxchkiia9auhy6goljizgs6s4m3o158bfj9mv3we6ovu0dk4uh485rbl87v9ez7ibmvg7ofytez4bezn6fczsuqhx1sdwym9n56qz0riudgkj4h2mczyezyinljg2g9heerruk7b2qx5s6e2vsbqljapeb5rmqmi24a0cj75emvaltw6hpo1v510t3ors4tl0s4zwloaspartjun9oefl71hrznwjq79lh8p10sccn09zjquozuxwip5elt04w7w9neml37yvwtah7xxtn8mz3who6ddqbm91ac4ety858xsp716v5n5sy49q5c8s7b11k0h10u8bfdty7rxegluxb9e3cgthcls1et1vluhcvdfmhl3gph9psaqpjcaf101pg2mu331esqc2ric3hr66smedn81ckq52eooroez50n4sx6nnfam4v2y3je6br43fub4hmkfl8x8qzespld25oyvisgswwj51k1ucqu5lc0yfce72kxtjpf4djq7vobseb2f1h4ly5piprygtbaei2sh4oawcutsg39qoq56uvfahc21axti12jyiwa8yfkv6r4zjijr7yp0np0x24l2o6zjbruru1c27l5b3baareuunisu4u5a9yxv6frmaf0vb59ig8v9iuby1hb9remkdp9seeqhw5y234hy4s9jjwo3stsmc7wtdgdrvx73830dg2apkn345t45vv5vsd3hs81igbr2axg908ig9gk2823g8c5i84sjwr5ciaw4sxw6oar9jyu3wdszvevh9h9yc',
                filename: 'trj442qgb5t1xsvmsp38uhipnx46pebk57sb3c4n3njkrp6xb1plh0f5nl0l3q3cbses9ryukgp4eql4to3hwj6vascgizr045p6rl02ctxexpdms79kainavnju94agyei920onxq4pp0kj9b3chs9iueu838sbx20zrjucx9ei93jv4s5wo7pr17lmot95m956l1jhgx56avgtesme9k8mf7yzbw7hfpgepk66avjpxlsx0ita21l79cz358n',
                url: 'da4zydiw6thju93ro4iol8s4c7j2777ddrfmu8n8ff02kt4aydhp5vk91mz4314ugmufpm0uf2b0l2p03thp2dylp1h5x0jrriooy5f5txowhuiiqqs9dhf9hhorifzluc0ek6no7y1t8zshppebqdbjze0ekhsebo752nh8k0l0qm723fo519ukexaqygb0bkwnzm9g8nenzijvaylpznbjubkxr66kkn8koj47mra4oytwrjm4dyniavt4k0ikz02xvb7cb7j11rps15q8vba7hi2zlbhir5k1c9f1vpczuta5i2xyemkghgseq97xeh28ishyddwdcx086fzpky4284dwjez5fg25zoj36y0366rbimq5qa9pd62a8nd2vlmrkq4sryqmatryup7eppl9g2jx5my8c10oudtt4jhesfjevrdyrjbjjge1yloceqvdgrx49ahhwj37rl3mpn3zd9jkgvnq95cupuf4jslxgxyfoisr64ig5id9522ejtyeagaxoy2hy8w0x9gllyvk1ys5y1y7vzct8d5dbfu32zr7jbcafmykov747a8m10trydo57ncd9x9gs2gjh0xa28whfddrtp8gr3kr26f4xvn1y27yoi3tn3dy1crwbme5n7ur79mcvpvww4jtnamoa2pi8d3bd88jn6cd69n0rcqr3hguop0b1anqo0o57o085i40zb3pxh7clxm77v1v4a0ok3vtfemdfg61je6okcdjtybmzxkzatafv92c7ly2mgiqwkhmzgg6rhni699xwlv9o25fyvli4kgkgrefyl0odulya5p0cknashvhz2k3gkt6djqldtfoex88qvhl9g9j4xmz26zi71chikixtlp55krgm622u48gncg94mfnfm4bhmjnfju7winvy4tj9h79kp31o3rbr9egpvm3xtq3fyfen3j5d4eyon86159jwgav1hnigybkt0itke7htnje0askbqo6695ngx3ka7jbzvk90c9d7kulhq04',
                mime: '0f77i15doimys3llgqr6sezexw1az9hpbfaiyxgnv9paszzwlw',
                extension: 'r53aqvsdckusqppgcxt4bpkammssi2szjyxuxdcjgd2fdpbl8x',
                size: -9,
                width: 107016,
                height: 352188,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: '6gvvl1dsxtcaufiuc31ijry7u86xd0opum8c02zin8b49kfoelfq5e5edfb2cbqwv1zb6yj2p1asxy904min2zd26w1d57ksbtgwdn41n8rejvd5j8isnn3qi3lm1966vrk0u0t9lcuip5y7b0hpapqoniv1d4rph1kpwx6mn884bl864sc8ylpdi9fdtdvpb42alezjk5zglixqyhmj5uhrmyeuy43fbiz4zqb9wtuwac4c79a2s7gj9livyda',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AttachmentSize must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    

    

    test(`/REST:POST admin/attachment`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'wd4u67ls4ayxoestunltaai7mmm98y1tmoyqb0osvy9kkv75jn8ivlyihxe3habi6r68z3p7gcb',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 858170,
                alt: 'k9lwmsh860b6dwmpn5jjcclayxmxf7keevc8d8a07iy6xr1ne2qlf0xxhodqpdou0auma06ft34nibzgaokfj6x0vxakrqa9ozz43oecqii3h662q99fs9i3ilq6tu0qgctsy73lf5se2lj0cde0c9sc0r5l05tw10pwge6f7n64ta3w8asyfubip98btn8os6zsrbjux8sj8tlbmdxodbxsngg5w62awn49vlyrrql6sfyvh65qzqdrv4pjm7t',
                title: 'mdz2njc3ddjc70g9qq7tzpk61zv5ka8zv70ks1sqocxluir25p1it5t8iz7vrjsg0b9misdlvmzim6ulakf3x3ycvz4phlj5k467mcpfwljq0wdkna2jgnydb57aa8uxvkcp1qp0j04gtyrda7vijja05kc00qb738tkat2idfmbwyqv63sxtxk2jf3dmmtfl53qalyswt5lkxwiuv72y25wfsewn2lye0mg3zaovg7g053kz8i76dxmtkoiswk',
                description: 'Quia porro minima est eum. Incidunt cumque eum expedita. Commodi in quos at. Tempore et sequi nostrum quos voluptatem est. Reprehenderit mollitia distinctio. Voluptatem consequatur quo repellendus a quam.',
                excerpt: 'Quis rerum facilis reiciendis error magnam amet. Optio velit asperiores sunt sit quos maxime voluptatibus officia rem. Odio laudantium sit facilis enim et. Excepturi modi enim aut tempora. Sunt maiores corporis voluptas temporibus assumenda consequuntur at. Alias voluptatum assumenda accusantium qui.',
                name: '0qqo6bro4d5ubre2dxutm76lo8z02bwvrzzkh9z9qz9kypbxz9v6cc8h7h8l0lu2rs4tlrs4jfer5d8n0rjpa8gm0lbegdqw9kraoa96gns8n8p3xmda54jwrx0jbzpkpgoa1w5hxppn4h7k23y0mbpvmm4jrng0s5od7ukjz5gs0i2pftvrwl05s6pfr4rxri9jmauv3aajnbrx9lnlwtu44bkcjnlqh8m8nhaoag84oodrrlsuz9daawv11yk',
                pathname: 'eqroq2ck7br2tp8qwaocx51zdyigswzkmjj64gcr2ymnvxd2b129w1kirq33mnffo250k7q9jlo2nnn1rx5e2b1ra9reryz9ptiq7aafbtryalfxre985fhd7mcc1waaienzls00h3gsi0ekn5tain3tvsyw29ldzixbx1gqrc07fh7p4yg1w7o8wzs3pw1de2a29enztqhpxrju11mxoar9qjsnivlbj148znlg6xda2y45cy0vmsh29f9xk25bi7rgeim3ci8go3fd25pcvkzrf15fmfzwew561hzzio5y66hz64a7bm0ub6ydrrfkasf9k24c8z4q2waaspxcizsiy4p6ug0xdqbhk1h7ms0up8ix2qkxz1de23232v185c4ide6lrwvfiqkalo3rpv9qh3em87hcowdlz4wipjc70j7u6yem9pbwcxsnoaqnk2qa0uqkqytvamglrdmhnl6lpjwhavnmwodoq7cjc84zskcz7ceiqpxbbtn7qa06a6435qxz92jjg6tlruajp699vqzj49cp4ewc5g4dppnsihw2n0sp1j6rcqvwnpv39f5ney5jk06ujigxy7fxpyqn70xtqltg3vy3huzan2zghywazu544e0ehzdy1oc175q14a56c5tu8c82xz5df1huv06kkj2st3kqvyzrvrybfreh69x8efyu31baak9d3o75ltnigqul3efudy4idctcwz73exjnd2h2htluze97yswtxzn999pq6mi5gco4hao20rq0l8wj22rqw2ykif5by2mzo5kwdmufsyqlug4mj95zpvobevf5b0xqe9cm1vpvpzmq1f77yn4k1v6s31y18m5bzf1ui9ycyooae26hab6zvq6i329h3vo37mnm0fefgv1jkur6a94qryzvlsuqu33lhlqjdiqcrdgzuus27tg9lw4bcm23xp8tf0qoym6s4z2u3natl5klw3b6df2p7tpdl4kk1n1ykhb5fkalsatwto1hwg7movpbtzlk',
                filename: 'a74utymbqzyo9c5x5d4yzf4wu60fw9uep8340t6i2np3iovfqmfilk828lvmqgut38a3f8hl7caacznsg83vy6baj7ntzorv5vl5h9oz5xqr3geaery5x2bgdixn4daa0jzk9edc8h0mcpp9w6xmk3ifs3v63fyi8rm8vsabcb7wmruz9e0d1j7vgq9d5o6sssvsueanyajn26uunkav218ct5e3qmomkrtp2g7g6p740ih4ihelnerh4xr62yw',
                url: 'kault9q20xprgflif1zhf00riekgtpkca6tcor837etahxh36s36kknklr3ad3auzgbruuntsqazoa4rjajrz79uzk66bzceitbprjufidgqmtte57xfsg7cndqev8x64f587da8gq75t4tcaynck9ei2y4cn0r780hfbu158ghyrc56l9k9xmsxtutpgzfmf9hc5mh4nv3vl02zv9xgd0n77q1xaaj8z6103s50pcpm43v07l3hd7ljsvf5x07g0yeny5kps3asrhbgoq2qwdq26xry6figrca7r1wa8abjtcuebtc4wffazfji1jnnj3yeqyq4p9po19d4pzx8xsxo9fsusouxit2wdw94g8fmg0ju8hxo8likp81b936krhjr8v1kkvxptn77mjptqkn2igv9hlq4ano6i32g0nkmkz0djppv1v9becde5nlp80cx9tydarame828ark4vfpte0liyy4fljdcug0dvbcxblvf8s45ollz8dwpg8cdsos9b1scw70j4lgeatfbgzwjr9sopc1sowuaua8bnqko9dqjelhcswxvu34103tzv9hz8dv658d7z4khiklzwzf2vn0sup5h81nde1154lgrb84brz2flvxth9j8bv66u6t91u9l05bx8e4ruaaltr15m9lb84ir12faubwzq1jjb301ibuvcwnzxgk4kz7q9i8qbdapkevsyf22qrv9k6dmaak12krcozqb33ri4vzgjzerp8hhhc111xbaa7odixamy29mzisk14uj6jj1mo9uc575nko14wcaprhp4fkezclrgtizxnhmcri1kow8zvt7zrejlv0p8vqz0v923noczfizj8vq1vctn3ekq3um8r22947ajlfcvxdgl5hnica7qx16vqpmg9aunod9ocp2cdj4zn070mcw45rku45eg33oxm4k1818rt6blxuhkgqmkcv32tpzkkx08cq4z2otudwjauybvwf3arcwmi3s6z0awcwkr2tdwgeovn92',
                mime: '5u1cjku91icdx666djnp7l8vnmgvrv2hgpfskblgf7j26oe3kf',
                extension: '70t4u6lpm1d98eahvyz36q4gm8k0jii9s3eq3brli1g7big92i',
                size: 1667844844,
                width: 994265,
                height: 374627,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'gky8t2ekghkb05hk1m9vvxu4f3dt7gk0i6ty28vqtx86fg7gmkmepo6zpc4awchfqlhg0lknxtkhknolq6dza643ecf3je0u5t1757mckysaammpxkgi18uef1mp9wnviudxmjgq4fvt22qtx8pog3wgmdzl35m1dri8m759gjx5qqhbqy6gbfartu3ddept29rvxf7c9s9jtdayyrteygwmjje3rj6hm2otn5zcj2uvkrxi0e4x9k2nvqah042',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachments/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachments/paginate')
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

    test(`/REST:GET admin/attachment - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '3899fcda-3324-4f98-ac12-56ca003e88db'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/attachment`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a'));
    });

    test(`/REST:GET admin/attachment/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/433bfc0d-6038-4710-a53d-73eef351be8b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/attachment/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/f3dbb213-3d84-4ea7-83ef-3f8d29bba34a')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a'));
    });

    test(`/REST:GET admin/attachments`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachments')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/attachment - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c1d8a145-4dd9-46b9-80be-0bf59aebc2a6',
                commonId: 'ce4399ef-fc21-46e5-9a41-0886c88ed09c',
                langId: 'ecad4ba8-6fba-4906-99e5-e43ae4cf6870',
                attachableModel: '7wh6reh7jyayf16oyfpsecb2yzk1r7qb57xb8ipl1t4mhgvnpejunl3uvrhagss81jjxfosk8uz',
                attachableId: 'd4f66b94-e237-40df-8cc6-c6bde17580c0',
                familyId: 'e7a5bd78-838c-4641-b3e3-fc9c276eecab',
                sort: 173166,
                alt: 'tefnongp73wyk4m1q9jvmsy7hdj9vj9lvzn0abxiwn0ipxnk9b74q8nm243p3r5j3opjmzo60mac0097t5thh0a2k2ccr6fb8s9lcgpn28lfqnwta392x88kfix2mr3r210yln81cwyegja58rrpfglptnl3o1act5lfrpz8gm06fp168b9ekcpywqvw5yol4ckyz7brxgngvdsojk3su0yi9q6gsq1gsjw53jviazvnljlyg65uk317z57klbm',
                title: '4eh8w72w54gvc2j0kbrd003q235n6e7y551b9pspf4o1e0wxin4bfn02807cwzv2tuqjuca8kjngvsf3nazao9b7utr59qjo32m07tn8m7qy4ea02s552762x762xa09wetze0mx9h3ceiq96kkda6xx81lcsfzr9bo4zq8w42aaz5hp2tgb1y07p607kayvlzy17dehyp4x6ljxk7zvlzlu28lgbqsu25h6qziub97zoinlspemx5lv0zih6kd',
                description: 'Esse aliquid et rerum at. In id quo odit quod ea. Cum ex aliquam qui ex voluptatem sint sed vero reprehenderit. Omnis quasi in voluptate et maxime sed dolorem.',
                excerpt: 'Reprehenderit sint tenetur. Fugiat officia est consequatur consectetur. Facilis totam et blanditiis doloremque necessitatibus odio est consequatur.',
                name: 'r2udulop5kop2twxhdjd8wnr9j6owtkchl8grwsa7v8mnqa2q0cem7456wvhfp8nja00d4yk864q8mqq813a6vkw4ihpcqwgdf7orlclffi8i8564v4fxuobh8ulzzlh49br87a7a4urp8b7mxj65otib3ger40hu2qm9gu5r9hpttq1drg85ihd37svlur7e4jgly9fiuhji53rql0dus6si0b9yiqaqy52ea4bpndkzyab2na64jp1udo4e0g',
                pathname: 'pazrmwzsb7kq28ssnraq30y574wn3scn0f6eyen6vzvac1ebj1ogj1d2ovpisktpfopgtgwwttprw4zx8dwpglfwecohmmwod8930rkae9ckv4uebqto2ultmm6hpnfpm3sm5guueqpafow5i2qrln7bmo8al6c2i9xlx332o2dxufm3rmssxyyo4qec5gwsbw4pg22z8zg36glaqgl01dsttzzdv4qo1p7i4c4sn8xnor0etx047yrbbpii4cl0t4zawl95elmz4is62kxacoobwd2hhnt9315a22i0ppn7ek29cdrur2w1te4f1gb3mro0e48xoqkxh44tj4jg17w9baje7h8jwh6yxj1s0ky6pf3nm5xqu4au2e4m18au8k8kkfbzodum25aapcitntn9ue6luef60pqrbi05i3iaegsp2tv3abvl9gdy4on8872o64jxuzyrbad4vjhuflbr5ntol4pw2am7e2vhrtcbi8weuiqbdllnkzrjr07q9y0vl9u9n11gzh390fk2co1nvyvtv0289flfqmre3g4g72nrbyg34s2knm2wsmektfa8no03s2epxnbv2xdz9ityfir3i4dxha3ud0nxtamiuqg36hink226zyzth2f719fjdgk6e6nv47wiuqpkmnt1rrvodge4k9z20qbwe4pg6k9k0kpzzfclnhgokaesk8fnw5sm7955b7wmnabs66ecmy5zm43kk5n3mmxge00egmggan3kp04wodg3j6iwri057ishez3i4j8ojd8czb2booatxhjqlx0n1lfn7d6a4tgplgjfurdsd1ykmcvl1cci0m1w5zawil1rrmthjn2q5dcaon6h4hbk86z3nhfpgx1up2h16jxk86p5pqw2gqk6fp7rp4x46t6lcyw0m1dze8qo96orjjbor042hilvqjjf2ub2revxza635gbvkrazibzxyzwabooi5pnerg4bl49km0r3rqetcq3j9pken9l2n210qlzaflm9vohp',
                filename: 'l9ctpbxxyz6uam1t5tkcgwuesv6t1bq9e79mchg74cb56xu5cma8paw6w647s0ef5it56sawn18pn0ij7lbvvcm7ngt8mtepi15ord9wm2ppp6fzsra9mphi6tdplmjksrx3czql82youppvojbdh6hcb4zdq85an4j7asb0h735oazamkc4tfsk5k1hx1b413l1cyebatgb7ncbor7y2rakt5bv6bouleibrc2x7e1hf1zvlz2w3jt9w4h94rj',
                url: 'mkb6fx3bqtkoyzgzzs7zakfglz33smza9xzu8plllbbe43elpa3kh24wn1p7uffo1kyxgzszzjv80g68mfryascl7mqwxu13djin7uck29lv1zefvz2tv2buldm8ohw0oal0phug0zyyxksucqxs8mr70ocjtvnh8vyjqt4alwdpsvuedvcr43tjxz6fcu50atnm23ybxa55zumarn5edtvag7akr76xm54js6ij26gys2cgyzcjzdjx20c85z8wh754kso3wjvu9nahtn2ng1mp0olk9uii1ri9da85os7x92687qpofcx04atqajn8dwcreji8u8jb12g7qzvr6winjfsywcl7jwzn7lml1poey7kfvi0djpdqseg8tl1dn3pfofo8ee5mc05s9zxz774bqhel8jt1988rfape0vs1zfxny16q1ffn2srlgmp4bxfe4g2hg79wz284oibdlzttpa2y3rr0tj7zu7012ll5ayj72xkggmcgx03l3vlpbub6z50x7jsswbmnq8ddf08w42gxkwypl5j39jcbfqumiooy98tyar14f68m8n8dx12857ijlhebwqkfbh3azdejpumf2aaqt7z702aueb8o6api6p4iy4w6yunzr5j0pn9jbunzy4o368uztjpib4nfb0eqf3sem7ul2bgqvio6h1v4a932zxw313xtnam0wncla7gbtfbnahmd6rzz50innqd45zicfgpllxinlnky16wpgdt3ug0iqsrurpet9essqrbha84xbjyb6o131fl0cox830ekf3n19qze13q4va5odyr8xpczihnte3n1anskhzx8fhhrwq5alwqjoyxhjwptv31x1hvcamnwxooraotmou9eql1bnipjymyrn752elpgy8ik1szjngjriga7sliytdre64hzzdonekhl24f0lxcwrhjnnu484mdhcfzg9ya7ltmz3p5nd1iimilfg4r14u20gnrp9zluxsvlq9o9oww9q925ckuoqg5z',
                mime: 'miz3j14skicvppkirsxncszfjku83lfcn4tixjidrol5q0yqyi',
                extension: 'w83nk8jcg38lps4dhvd7qvh3jhvxw0c22fapn5scip2aba3k1y',
                size: 8848905884,
                width: 587444,
                height: 158918,
                libraryId: 'da6b664d-c807-4c2b-9997-07feb7bee5f8',
                libraryFilename: '7cbnu630yq98qrecdz51ilw7gohvkaixaxu694xgknbx26m3rksstkwnu8u7uzek1vun1jas7b836e9ofjjajn5g9nf5qydle4t2sz9r53xy6fo4qkfrarnp37was9oh5zykqcy7e6298a77kwjlws4574a1z03ri7drf72wet7twjezxirvhkczw8b284tknv6jthlnqn6kck7hzs8jqg139i6xul7z8hzmk0aez4yiblhm4gpt9khs3wuhpcw',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                attachableModel: 'b17r0e27nex6rexjyng7klz1oubdphnf2tj0f5bff071xb1t8xaltdjkgzqce05u6u7dolisx8n',
                attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                sort: 278667,
                alt: '8lj10wu58k3qzaagg1d1dvrtreb6f7jvt7bajr422abt1ajn88l2dl0ube07fkguxlm7an9ylzqa67ge66ujvj37sxbe0rfv1cjmlc5wx7j00qi8fksq2kqvs7pn40r1znx6m3qds9nta2ikab033iefxmxqfbe01e568bamzmd0dfby4uqog2mu7p62eilht3ftv433xvolujd6g3zn5dwpm2ytjly6uke2v1i8fdlqc90rme88di2aqjrtt0q',
                title: '086q4dk8mvnokr16h6zc0c6tw47xauweedlidbkordglhbux49alf24gb2viuy25066f2faf2ed0yy61p8421hibbg9ohgfkr6eh8cldpcd1yzds27nwb0sksgpxrcxl1sbuopme0r3cql695bibi09r29h0fd9pvah68pr26xlskehewma15q2ua8b0tr95tyzuz1u86j4wzx447q6b91qc8q23zlvqmlh5mpwvr47nepz64azab8zl8vnezrk',
                description: 'Aliquam omnis est numquam dicta praesentium beatae dolor. Nemo non totam quibusdam dolorem aliquam dolore. Neque quo culpa voluptas aut error. Velit architecto perspiciatis voluptatem voluptas nesciunt mollitia. Incidunt suscipit accusamus.',
                excerpt: 'Alias labore sit veritatis eum quasi. Occaecati quasi sunt quia et dolorem suscipit sunt tempora. Est ut qui quae.',
                name: 'exmyc8vzcfo8hql7t8x9qnmq3gnt8s67kjb0h2btzjps5ahj5madnq063vlf6pomwd6u1crtsw07z8ha58hdmq55j8qu63d4hmsl6an8e918w4ds9phfsez6s6f97abs23ux8dmh7d18pjtmr4bwut0grbojzds1aj037j013yuot6dk1vanskvq05ku7xarhhkxymwdeqrxp8k8lb4ib61iery0j7wet3nytqqrij31dq0m7i1yb5x0hujaiis',
                pathname: 'fyzr5vk92idgu5t064pnnt4lhzuhf0w0ynp8yh33wvh6l9n3z2fl37gihe1haz20ha3sgqzf62jexwjj3bkcdat3pccwfw4nxce5okocuhearrkyfvi1p13bk1s1g8hk23z1ew067z7r4wa7no2an6mi8evaff9su1tgm7pqm094bzxs06k8l9q09nj84mqxwlnkvq77c967rofr5ioj8vutd9kohbnkkxoaixzb6417rqm61zbbk6x80i1djf6krr5kmdgbvqvklfoipvek37u9722wur41fhnjj7o71g5dxheqou9ag675af4j7vvw6lruc4nltyrrpcz0dda3ts42ynfzc22on1ol4ctm4d9crkxs4tdabpyw7kdv1mpv9okfzmg1gnfl3z64q3oautbg8dqp4of4i3zafyot9kjliuk6uirov1e3b0pnmkzkheprc4w4szvshe1amlk8hqrxmhtfd2ywc38fmf6xooz3947cn9tgr8g54nz2xxgl19klkp7fgp5hsmsawvr8oahkw2nhf48wcxxa8kaarhnf2wubsuwoskj4t3tr54sevetrjkop3cnhcz4h0egsulj89cck5oqg0suf8q645d0a8l4mayihv5w3k5fikr50p97qltrwqarxfezpkty9iisvxvzd7fffijrs9hiqeuyg7vexq5w8saouyi7hmhftzvmp7hlbxbhu1uqwacmycyg73wawzi94chcazzxhe27e0edml18we6qa82lkldm5mgh691ditd31b7omrxw9bq4hbsfo6tkn438hv6n7fbm3agkmh7cehyrrjz8e5qkfh9990fx4fcigyllccelnt8nao0fkjl2bpl6tft8zizv7el6ujl3nekgjmyvgf7762q94k7cgvhhfu0qfib5om8w2rbk7lq8456urwplo51dh70s5fi5b2ob47l8kdit8s5lo809setgct3xt7hlfvqx9zdzzsr822xendwa4fwbzwx2ngzjjqj05uj0v4okq',
                filename: 'plarybvbs9wcq8i29ldrik8i1lf89n4fr571kmfuv57g6aqs0qv5uvngycsm4yz9qip9m9qqoprd1241owxvyfxvdj3vmk0nihbz4t3uj0z49sz908tctnniv8jj62y7ovu0yuejdekjskfq97dmqv1y73q59vyue1zc3jmtf7phizkarxn5ekcu2nqx4w57coyt2aw1wd22ayic91563uuwi2brkcbj9098nxg0h9crq5ziruj04u8rcbagbp4',
                url: 'njkzc8jnga9xotq39xuo64rg03go50uzbs7dhhq2ptbxjmn3bc190c2sspr7l4ivl76w6t587olrm9y1mqc2wu81qi7p5ii9etnsesh05v9e1cn3l0mhcx9sb4cf7ipbpg34eiqwcqe8ih86yu27z2qc1w4lo8qfi1ykurmnbrc29roxmf23dbggj4zxooegezn1qvtv8su6ttdtow5fuw0zlfi5rfmwlmjj79f4v2xstpcai5dzfzs5vd7soix185xe3x8bs8oqhnyjl48zdxj17h5x6yhypmqqr2tg45dh5xg1quxbr12pxs5afhwfcsayhcztf11p902wvxniceghmzh53i6z8gfn2jhsy1fw4lte86b7ns150pcp5hhujpjuralv6fy9u7h3r8u4jnbtmt5lmyvppew4qk4ewrs0xm5c0izmc7pofgrlqp6y92j3lnvgja9vpw8bkxn5374hzkzav5mtg3s9kvg7dslpgh7coyzc7c0g8kojnj6o34d4p2x3ipdcyv9nqyfm6ckucjk1kqrvyexl6h8hvfbenfjholmt574mibfrc0qzs9yakc640yrd247afgr9fdau2bqskjk0mf90nb2uu61a12k1bfk0aeeqpz9e7jlg1p10538a2cm0fm1tft8b81r8i59lx7w4x5wh0g41oed8de23r43utwhfb72mbkx9qn85rojvftwhyxn8b8d7xw2qqnecxi7dn17wqhxs1hm9hf6bhq3mq1ckw5ognilclcaaibkpg39etnk4hj0k502e58ptqybtkc3wibyn0nw8l6e6z7f5nz78zdbyiu1xdx9fod9q13e32tx4buvi2gz72ia1im6dgvy8101qrzhu5766vtjcu0j7bq5kjk33ral4dylzivbzyl0v96t2sar59x9mo21jo8nfpnimk1fjvjocsih7s5t9odjwd5nrl6m9kd0rlf6lzxndekm5950axf4ti4r73i8smu04d5xsn7r933djifxo48wkccum',
                mime: 'bacdqc6lw4klfnqmg8r98j35prt3xesryzl2dev8l9xkkt78x9',
                extension: '7f84yn4jaeetmhrix53xrv5kra6kjo0frcnq8vq2bex5zffegt',
                size: 5069148525,
                width: 881271,
                height: 666881,
                libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                libraryFilename: 'tgxyy3yyk0plpx6na8imxspjepjskxl09xj6h2u64vi8tim0fd7i1sdndv8slygtkmcatahazkyke7pec39yj7uy1marcmg1cryqx9l3p72ndznn77hwi6m68rz1oeusobtujcler4mpcrqnv320xaia5hnztvef2wuks18tu3p4aw3d8jblww79ihm9nxfag92gr77gi8gd6cwabz8wctfapx3ghmxnc3wclwhnar80foppfi0iv8b8iyi5z5u',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a'));
    });

    test(`/REST:DELETE admin/attachment/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/42fc3840-be6a-4456-8b39-10dcb1fbef60')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/f3dbb213-3d84-4ea7-83ef-3f8d29bba34a')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateAttachment - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentInput!)
                    {
                        adminCreateAttachment (payload:$payload)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
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

    test(`/GraphQL adminCreateAttachment`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentInput!)
                    {
                        adminCreateAttachment (payload:$payload)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '9d3f12ae-f872-4b80-9657-ae3eba124d0e',
                        commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                        langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                        attachableModel: '41ge6crpborqo1hyvixgs96uykp8x3ylyz54n89xd3yr6uwu9ytyf4rlpmb1d976ueuk30rcdwm',
                        attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                        familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                        sort: 736250,
                        alt: 'ftfc4avr2i0pxwpsdby117mpe2crghvy473gnererl9qlwhph0ah1hktuqxmozv8fovi8md6l5v47lnae0kjj5ludoar9pa8fyo4x3zhjl4jk4ort3eeprzwa664y80rup6ps498mo52on04s2fs472nisqbwjdc6y8zgvw4vp6pzhuulhrak29ojqrprtokhixgxjc7ksak1oxeggy62t8d2iiddhze4mp070mfuklh2spv6gky38uivwda26w',
                        title: '7wlyikxl79hfgd7r5o40k8ig07215v1domdwbxix3vskagras1uxnrdvd9ete76fbqfd53um141d41zbvvjckc5wa42dxyywkqvbcx5c6bo9h2bjwk6v453k08aivst1ozdyrss6j9whec3md335emlzlsa419r0sg4ridy65m8gvvnqybwhn8lxdath56bi60ns6rcvv06mna88mmh07o8952fgfb6u1b7vxn5zh87909qcloc5z6wg4skpxci',
                        description: 'Architecto similique autem vel repellat tenetur ipsam omnis dolorum. Eligendi id at voluptas. Animi nobis maiores accusantium.',
                        excerpt: 'Quisquam voluptatem voluptatem quaerat. Sed rem commodi quo quis. Incidunt iste ratione repudiandae nemo necessitatibus vel. Aliquam dolore dolorem esse. Laborum est laboriosam rerum laboriosam expedita voluptatum nihil vitae voluptatem. Maiores dignissimos facilis illo.',
                        name: 'odoczi6pkw5um2hrkf2rcqux1d09r2d8nk91p0dtxocmj4x2tiptmukroyh6gvmhxlpwv12175zrcd8gat29ep034napod8ryoj4mibyjtav7vl9nmwiiac99tta732uab1a332siaqzml0i84i25m0v4e0o63s6wk7to06bjxiidlizxtedaqcp4ikb9w88di8mvkr44ky8ep0x41vk8y9qugfomydbmu0ubmngpogv3nlvz9l9ax1hyr5ntzw',
                        pathname: 'obddsex8xmompvnjpdbyiln9cayyssfg3jx24hkfym3lwlc88hrzaf7snkpvgmoe1640cim30v9c50p0k9o9rxciqqpmhhc4w9piha3481dn43x9hxhbip10ukglqalg6jwfu9l5qm3nfxccwu8dcf1s4gugvlnmk9c8eu18fez48ixgetvdg102swxth6n6jmmgxpb0ssgxh1ubl1bdohdre6c5d8l65pzkn879a414fsxxdrd30fekuu93rznn0wrf1zh6bc8vdrvatmtzdv6iw5vnmltzt7zt9hg9kg7dkegw02mypb7datw6d5atwtlb0ey8jgzbpe2ikfw8x7tcfno6bchpo2vgufytdhl6zz82p6wwpj3wks0jkrf9oig2z3jr6qysgwms5gb7z4q4qksnw7h7up4246uf59wwcweizp36w2leio4iqxazfelpmpa1hn752mgh5344dr7d5iewkap486fv4gzbj1z144r9w17p5x4g0n102ixe3coiegac6p4ylol22y98s73j30m6qhen2xug0jlcolj8nbjyg751xn4wgekdufkmz1kqn0cpjdrkgxawn84o00h86qww767in606rqffms7bna1b70hkaqow85gkzccmpehzmrcz1b604swkuejpdwa3zwudk1vkcj0733cl7xcl6lojmow70igh0am5pijc2hs4oib63ysa6ioki7cpwgzjfx0hpb8a3jjr9egm3akc7oll4u48c7p0ojbeidf0ixzvgw9bx82ucm4w6xdgx6sgdze4hwjm5jmgiwclnh2wrkyefgnv6265a5hrvm7cskmjhc7kc89gp8dn5l6szq5th9zdqlp80ickyiswq8qrv9g3uy68bqficxgotwwmbd44xoo9soqtj06bbwwuzv8034330yl72hp1st0wgz8acfoldhlvmpa8ocsbhbshu3839so5qtipl2ti34kncpsq6wjcex9fp4lr3ji61ds5z39j3u7ptkoqcfmuvwdr',
                        filename: '0oy6duqsk79tlmias6hgy8gtq7a67ib1i87h59injr6yelfzuwcc0l7okhi3ly6gyed30kvmtb5fgxbp0cf41ena4k5bsc04c5x8wb0crilg7t89hgf7o19hah54uar8obh7d98qm48fpd1nxchsfsu7qf20xmxur3xo9065jiizetunbsobbn974g7kgmll2m520v7vqmyrhinin8zrl15n67gpfz7rspsfjse0nau0eo7yo1bf703mu6yev74',
                        url: '7y5yr6y6ypydpdbd4xn48rls0610b55zj4326xfdyxgs5d8atmmhdssyr3eeaat8i7ouecp4n0qh6h37hcx77ivojxhsh6k7pw7mq6i87fnbfxzb4nr6i2whelw2ivmyinynu2640ln8wjur3poigm9t9oka21lxpa4ojhvnl9dqsh8u2hg9tqypryju3ze0949so6xddzcdoqlrz8e3m7rtn2zefadqoshlzdhgobwly7ntmx2rf1vg1ircew5q38mnhv951aeshx196v8g7qfy5lfjrkv3b3hqk9hlozklq4k68diegrryd31su2n0h06ri9jto1uf2zsktwzrbrwcb4wmt01abutwyh0uknp0zi84zw5v8qifvr7e989soovtp90moxv5gxfze52i5jo7t0fs4z3a4ok0jbc8tci28304c1licbychimsy7bf4mny47as9w8hlppn4ufiwxwvyqmsepbh8j1uzu3rccw71kld5pdocjip5jfnbx6f6xd347engtlxermz07h90egy9rqpwa4uehbl327gqtiqlx59aih6sykp0jsrv7caui1f6gex240z7ry798hfyp5pocz5806xlm07cfnf3p8q3bqwh3l0gzjbre3pqtoipybt556k0h4pq6cmlv2jpowl1tk2ce69at3slxwtpqzh4cxuu7cos2lxfdkocyqjsx0ligfe9wpk01738ptok5ovmafmx6dzft4hus07zbvvhktdjqng8m3xhs8e7asi9qlt82fqpbf065ekgpzz3dylp28s6t22rgp4z3h85qpih0z5qypg0u5d2ihxnvcp5yq6vn89o9132aubugadsnh6x0r2nxkxqdte7024o4dwl2ztot8y3j9xy0uef3tkc1mhosh2ieknz95ygp1x3qgq0zxhgce5si6ttt98rsmnvm0yjtjfnmg39uzi6rulsmhkbw1ha43fqe636bcr9by0ref5vq4r5f0dc6oec4ib6h9sl2velk2eiteh6upd',
                        mime: 'buvesgai6k58w3keqvzelh7n46vr9pkpqnb4hkzsrf3h3ann6s',
                        extension: '6ojes2spex6gubav2l02gvyrq00xmifftnnjh31n6bmqm2wb5n',
                        size: 7541818401,
                        width: 488915,
                        height: 417624,
                        libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                        libraryFilename: 'cn3psu68hy58i0kpxufff3rpu1iuzj15zf0dsyozk25ciecs6jmudumkjhbkhd5o18a8ukniyu3ddgibhtmxxsautr9af6abhutypt8xyyoejys8zpaiqxpyc6f5vi76dl1l38lbfxriruuoue7352iw7qivgmooeusk0u5womujzfg35s16zx43d63ng2cz2o2slmbt5hoy7z1vxmalm1r8mbn1ql0dqqeunws7z5ejfgltfs1oxc3hndlson6',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachment).toHaveProperty('id', '9d3f12ae-f872-4b80-9657-ae3eba124d0e');
            });
    });

    test(`/GraphQL adminPaginateAttachments`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAttachments (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAttachments.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachments.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachments.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAttachment - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachment (query:$query)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
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
                            id: 'b4e29b14-2083-4781-a9dd-9cd3fa25c82f'
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

    test(`/GraphQL adminFindAttachment`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachment (query:$query)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
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
                            id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachment.id).toStrictEqual('f3dbb213-3d84-4ea7-83ef-3f8d29bba34a');
            });
    });

    test(`/GraphQL adminFindAttachmentById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentById (id:$id)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a57ef101-21b4-4242-8334-d40b451faeba'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAttachmentById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentById (id:$id)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentById.id).toStrictEqual('f3dbb213-3d84-4ea7-83ef-3f8d29bba34a');
            });
    });

    test(`/GraphQL adminGetAttachments`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAttachments (query:$query)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
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
                for (const [index, value] of res.body.data.adminGetAttachments.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAttachment - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentInput!)
                    {
                        adminUpdateAttachment (payload:$payload)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '7049f33b-5a52-4791-b4b9-d675e45a6398',
                        commonId: '9aad2165-ab39-4229-8ba4-2784f2757ccd',
                        langId: 'c582df5a-b946-4b81-862b-84fd5b7d4e6a',
                        attachableModel: '5d2lkqcysjlyzlbk5gozbu8rtjqnbtgc7w3uiwxf8u8mzxkqcpx2wb01qhbk25pqe09f1m00ii2',
                        attachableId: 'f14a9942-e215-4fa5-97e2-faf8be36a84f',
                        familyId: 'ebd6e082-c5e4-46b0-8cf9-f006905c9374',
                        sort: 303253,
                        alt: '2crhbmfci3z0o3b4fqn9thw2igp8hxps2bh443rpbv6mr40vqs9q6p49bvbf0ibqdg7sqsi2zkp1b3bif4x72iimvm1g9sc2v5a6en91y6lnz2wxw7hr0bgcpnbtw8bmzbg5xi1gj9xlb07w7iql1rbzksgo5j74pvr99dzwqiwve09jg7l4q0c8484y09pturfih6bv1ug395gw71aq1ell5mb3xvmlt3w9nbem4dojfacqvk28eeh5m6snevz',
                        title: 'g1dy5o9s4p4b9l7ipljmc404bqo9so49fcvi45hu1kufoiguf59mq9auonucu5t9goxr1ok86jy30k6ac0f146h7hpjr6nr3kniapahnf48ew1m3037kz7x6cfzwb2fnvbqq7qkuhc02am0k1u5zdmu2p6i06fiogcjzo66dqigtwscnqwa2ujejy9b73zuazesb5f8myzrlne4eytfrnjg5aaj6pd9o56tle0k7eom8ohvjqzkt99u53ojfuan',
                        description: 'Et vel qui quod praesentium. Voluptatum nesciunt quis reiciendis. Animi iusto voluptatum laudantium illo animi quaerat quis. Rerum voluptates voluptatem pariatur fugiat id dolores exercitationem qui. Eum et a tempora sed sit error.',
                        excerpt: 'Ipsa numquam rerum. Rerum asperiores qui voluptatem eos temporibus debitis unde. Eos et quis necessitatibus hic dolorum.',
                        name: 'i3y6x3x6uun0c7gzklc1wjfmpvuv8xfkmhcyr6lgbi27h68gne9x8ujhnhootaymu6l3qp1ts8vymiqhpwlkegz1biflk0yo0wflnnsthwyzoemjixg9b46uerplic5v1vleuyu4xrbw6ybslv1yahhmpvvotw8psl5v3zqkbza7vz48scx8fc0avvo52k6loj72qzdhvg5bzm8jy7e0y0c5nc3rx2pctrrdudyklq6pync2mwb7y250qusjg2b',
                        pathname: 'ggg0frdimwjfoz0ccq1svveibk3uvrulhxsts4ons7d6ykqav0nxtuvzfib11iiigi4l6zfsen51vtu6qivxura3rtt5fu72f20sf36c7rxghis2qwpk438vey8saz0bhf41nt5kqxwow0s71eaz49fg7ynqgzpzkcirus3aeh5cueyyjrs4jq45nsrxlf9nwc1zfumj4nyiqk27ac0wbz7x784s8gjrq7gwgmoxv5k7ozva5bc7edd9pa81m5yi5l5eg5pik0gs850qxk4ycvbmgw51q48enn9soo5zeehf2e836i8lvu4w6kcp69yvs1bd7kt63ru9f4clgzwbbru10nb9bcvjlbmv8my6wgx3q3nubh9p98rfreq5ar9wlvnavgslk01d7bwrqcy7jbsaoaihqozhriz4cc5lps8vwvudqmgkx8em2fdk8rpovuhoskenklsoqkwx7ij4emgt6yblqakkt4o018pqmvv09utdo1u2ul7m7zsyr9hl4chquanzgisgilqpm769t52lr1zzdhlcvlgstbggffhnb48hir22vy0xbnbtukho8htetyw7k5pf9gd730koiqj7eta62jyhaht1cuxixswbewwdih5q74g4ejgiuuvdqlyymsnrhsuty66xpv4ha0ocho5u5l5tr1a8bc7sg0lx5mibgwhdo36co5k2x2i5kgk4rsnqq5xvu0wbx1ym6xrtczelf10hkrdk26uuuhtzncak9ej3qayff92a6n97kcri1jv7529uakgop0zq96vomngpkyfe79ax07dfnlxafpn7wpkqf1adgs63qeq36q8pqis1ewgnet20r2uix22oekmzrngqyhzgxomkt6l8n3nesbd8dmfarmkr05k863ls43dnpi4mz1ik6tk3v92z7hv0jf91secs65vla1o5zy4y3os1royg8f05mfhhfi7ldfq8q33x3dcnwulwzd16z5y1x818jg2lflegjt6j27tsva00qjqu6syegt2g',
                        filename: 'nksprg5ahia0z91dqw9e0oiwi4suw452rmlyl6xlo4oggbikxt87y6dwvr5s792hvhul76muad8h4tdyn9qef7ze1xl0owl73mpao4ec0mhoyatxgqgu5pn14v3xyzryfxd98kivkszleaznsr824jcbjdxhp3qbc5fqzh04qv2w96egolvtn28y46w3ghiemtac3ya1pcgs34mx81bo26y3imdcbv8qo1e9ohnexzbmvv9ziufyca2kx7yn0c1',
                        url: 'io58k2wmhrr9k1rgpkx2bc959bzc4al3l0w101jd4hn519dzfhw89k9r3nv10e9ti9rle5vw4o16ocdqww5rz4qhy2tojkszszaki9midvd238kvggo9ktre2qbctcehrso6k16fdhzc5acrznphmyueib8wwegmgcim7ljeqlqqhp7tc3pkzg9wd1z94iop9tsas5oneqksjlmdgicup7q21s0f81s83nn0l8ahfzskh9hae9dp8chq1srwrhw6t7f5jlf7by1i35j3awx4e1rlm94jefv60jc4hrpgf0mcmh2izqm4b8gmfjhcqg585mhei3lgxi1z2l0ew50krc1e6p5pdky5i79l9ethzz9y8r1grg44qqcxvv6es9hwygcr9b7mwolr2plx9kgkhva1tx6zg8zzv27bzv0cnjfrytskkkoebna3ghi45qmu736epq5jvqkp05if2ro5y91z5td3peoxovvqbj7e4khb8wtla115sinru1pv61w34ef1f7k9gag7qo3fp8sjpj95yw6hxyjjixa63a0p2hunoqrtq835odm4ge6nvd21pwhi1scxj4hc4uffvkb1nucdhf7zeynq349iosp0zn3e8b9jq0foowkzdp56f4cyhus7tmgaa5ka8mp6popqzx23a7vtw09ai91c8zux0hhtetq66pl0kdm2u1b8oa6m7gypqzkulpvyoo8dx5bketaxje48zfy5k1zkxshx7oe2olvb8ehjh7oo27a8izerlm5gfprncsfpv9x1on0zr924yn1z492eg0mfbqkkomxv055cgo4u8fjylagwfqokjwaevsctvp6qm7amhqc5v4zknng625lq40ia7dfea12afu4kwbevysbbiebot51uhqyw165uy3dy31tb734nd28ds4uw8uz8l0qhyudnpixxjtyg1kybl7ikb1joyo2pwko3xl85fr8qf25k4mkyrxtkfu47dtranv0dhgbls6l0ggaphi9ywd2jae85n0gm',
                        mime: 'ts6j5sd8hvfatxd4xh750cv5549srfxghu9ted59n7oolytxz7',
                        extension: 'gbosnytj2h6nqrbce15c5yinfv3dry2s65psqcr1r5gcyb2nsg',
                        size: 3365577596,
                        width: 384501,
                        height: 579632,
                        libraryId: '28c600d2-7b32-4150-97d4-5f702955552c',
                        libraryFilename: 'ljlh1mdoccr4jhvr7fadj8cuoac7q30iuaj9pz479hbjxlotikrkugl6tbl7r2les0fi93eeuwcewrgj8xwo212a7uj6kq130o5yrttkm1qh5zujtad2x7io23t5riisazxj3nk3kcm9ix1lkll3miltd0034wrsj75q8mmt0ucjpwx3zjvzv0khvzmbw49p4jrd8uyve2qua8tnen9e94463kl5bjur2m7am3zu2mgrxhovr0z9ubacireg7x2',
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

    test(`/GraphQL adminUpdateAttachment`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentInput!)
                    {
                        adminUpdateAttachment (payload:$payload)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a',
                        commonId: '308f2b87-8e33-4fec-8642-f8bfde2ca05a',
                        langId: '188b47cd-328b-4a14-a1ea-e8fc35ad86dc',
                        attachableModel: 'g0w458vynd8l7nxoahy32tgikion15d7l0acfkerzzyk174sc5qei6a0cdy5b40eiugk57fsk6s',
                        attachableId: '004a8e97-93b3-4ef3-bd12-edc4e87a8aeb',
                        familyId: '0667f488-0d6e-48db-9884-9a3312cd6a49',
                        sort: 145787,
                        alt: 'pc9r67tr1aedoro0l7m3d5o30jxjz2d8vmmzaea0z923m8pdxlz6azldhm4cmlfdtmvq1ykv2yhegznffamcqfsqd28va9wgk862gib8pjwo9stupqbbccdv58knzxgenb61ib56x6jp120ea0tkj8q4716j6em3tp1352bbia6jcqvlovfnzccdseu9y96k2sw1fcwcdmhxhxzvw4b3e18veiax3tvixmk6do9zzi2cd0no6g4pial8rry1ncq',
                        title: '6ul7o7ulufqko2iob2vtd8t6ttik9608g3o6ioothubtcel5wwvfmf7quhevokqfsjdtymseqzx6p44mdsbdpmjhe9y6s5m20lea1k22tllmit095m2jmk9moskf0l12wi2x6pw16gezfr3s2xj7zzjj4x9pzgs2bs5t2e9xpbz7j1pc8he5tokm5wmtcd3mdw7f2emjdkjil5toolx3kja0wycml1ze48sf4211xtashh7oi3zojtukw8fce6e',
                        description: 'Cumque impedit quaerat. Dignissimos voluptas minima tempore vel sunt. Illo et deleniti. Aperiam commodi ipsa veniam et itaque illo et porro. Sed voluptatem modi. Sunt consectetur ut incidunt est inventore voluptatem deserunt.',
                        excerpt: 'Quae voluptatibus ut reprehenderit id voluptatem dolorum. Et tenetur hic natus saepe ad natus. Quisquam dolor aut iusto ducimus est. Enim deleniti sint corporis.',
                        name: 'aghyrjqfpkpgr4puh2ub1t4sstpubpujcoha07694zxyaqwp3f094r6072oxyxa1um4j3ws3ydka0y6juoiohrroct6f6vgpssd3f96on1u2nj84f7y9bk2q88vmpbn4f8glcnowwnc8yqdhb6jq36j390q79l5n17a9jl1mmawno90e572jag26v8i8n48ym7h3o3xf4fgvany5pa5lmqjbxwpexmmb5rmn1ttkvdgww9zb80jbexruq1r2jls',
                        pathname: '95s7eowysl21073acm3ugk0wf3c4u8mzgdv9n4y4ev2emh6w05ck674yd6tk5muff6jh8bcerolsocwn8vvrofw79hmgr4p6i1gi0xayfze2k5k0qf1sjewyibtxmxznlgd3dn5t8dkvn8mq7uy0iahuo7hooi96lg9fyh4xpiiu5qslrgyg34w933yerj38b3fujtz6jyl2mzo55wuthrvc93as0pllz0vge9bsgevfde119da666i1v5e5ad9s6wob5b9ijo0rt24q87hd8txunmyd42u8ptahggz0g7bxfmvw4b8pveexmza77ckm3q68vgkzsbwd495e2cbp14iggnwa688fs7n6nabf0xucoo3h1nrpsqubugqv0q7uotwwx9e3gj4l6imstdhlqyr82a68q8nipjinpo84ku10e727un8h92mwxw8ulxt5jfh7wnx0bkgq9gfl6qvbd8rw7ywm0jc1fdzaczzy98vuebwhuqn5902m49ilqa4yjjkv81p3f57ugogz4p3u9beootr3j21uh6pr5mdzti94lr6rz2p6x58zxpqihdixeldcqht8b9ggk23hm7ifqy42jw2hm7nydo7lthqk0cdw7ofv8jz4l17thar90vv4cd17seyvtd9ls3kubl88lalr8tulie3wf6sntjibv8jns97rve3s0ctp9aiic87iocmci8om828wm56s6pvrw8ojssuoqa2cya1uibkhlaxa29zaz00bg1g7s3nft7cigwje26let19ywlnddqs93xeha24mm9nq19l97gq5uhrr3lgm8pnzxodwwamtvgjnvvxpishftzdxcf0vrvesoasmvoebi804p99e83f2mt8qh3b3auv0tosemc8yph6nme48sdayuwyg5g7rsx2xrco6vkvktbfqgmmymxy63knzr2rtstf8mg2qfd2ayb4os7rkuq48hlqeu4xj0zybhi6hyv7jdl9rvk9xof9wi2fhp9i0ouj5ahk7ys4z16i4',
                        filename: '8kx9m4pnbx6a1so6aofgjvmjx5m8cemcyuowe3rqjs9wq80bz4239pgxdvlwxovyrcb29vacr67yp9287ryh89g7h6di81qt24lo2uaxc033xfo32lxsk63ooo34vw3tk9ub5oq2jk2o1y1n868cd8um195u3jjf04saqo53qrxqdbqilhjtpo1u8quq1ur53fupx9yia02hpm83oow5mm32qa0y3j0i6jwix5nv4cnwk2c6h99ofh1y5nv5ths',
                        url: 's330s2g8cdm21n8rllrupo52utgvz6ypw5fk2ho2js8naq9p7zyk4jhh1ezj4tfxkhsjdk5duoigkc3t9qzwen51jwjjeyx47fkgzuehhz04oc4i20zxr0gqbpzewgqvenfvailn0m7cms4uzwaykwi7inwnuz1c9xx9ue2eaxzbx3dz2q38uqw43rnt97tt4gcg1a5aubnfuojj8mlbntp3xnp4ult0a5db7shw59q2jwhpb8kjf4ipumh13apo6h3csshx2ginpnv09tdblwom1c270m98rvp6q7wsl9xkpdnndbj4g93pebnvf2gfbyyt7cccja4b816mjgggyt8abcfhtvyic1rn13jmicagy6xbt29i6crh41l5o97727lppycdptpnttn5t0dgye9o4kmifkeqs3cidgd9f262y1xgo5accrvay1qpz4uoetlv0a2hr8th2vs2zbmg3lda8iou844clvrq6r33hsz2wjyxfwnc1c4zbmpl2ir4hyahkdznmzv81cjp6h330544igy611rox4g4la9f9flduw7aiyin35iapbc6key8tue1mx2vlsiiym1h50zruinpd41pwz1930xx87o9bz5yx7u3j0owpr3j9fevqwpvr2ietytauxvdbl6w1ui1xts5iw93lk4d9j95s3vrl1uo7ft7g805uconj46jmtci9nqm0y3n79m7uumdk9g3la27a63j3jg5f3hmdf0toty9avdayj0qq553mzi3mhyprq544dg6ljle6nvq5nq9582qqsp0hq1rqoiq3gl98maun4gtwggxeij0lonfjlc13i743stuk56p9jesk6m1gzad2pr8eemaaarofxrjva0expv0zb8uww3zxdeeft4fgknot7qx4j2ujncgm82dnmile0u0f9kqhjl2yuas5cccpx4hsw8hb1w66vi54mirlqkqsqkuyugkyj7xf78p9dt8d28e69m4sf2imd722m7y3krrspeu8wf261toqtqd',
                        mime: '5crmoyadl2jfwod7ktc7b123olvrjebt96e0yj804p8ets25dq',
                        extension: 'jf5n92ezy9fbjzttspmw52mf2kfddcavqf52mpg0kg57i1a7c2',
                        size: 3685264357,
                        width: 363223,
                        height: 776466,
                        libraryId: 'b5361452-613d-4821-8d86-f257a8922009',
                        libraryFilename: '5ltybaxexmgpv4a9emupj6jpszg1pwiprfiw2hu0mxw6j2tvmr5hjyf5vltinpf4baes8epsr1rs7xu9zlncxc14nm4430v6auvwyt1bja0nlrrdslbnqeml4oyw4w17wi2yn45r40swlrcftc5os3rsfxmdi1k4dg8ddj7alrvdq18lj5ajnmjvqb7cmer3r4u721fh5b80sf06gkht7zeb8dcpmcd4qrr399isvqwy7cwnz4k2vmiixzdwdda',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachment.id).toStrictEqual('f3dbb213-3d84-4ea7-83ef-3f8d29bba34a');
            });
    });

    test(`/GraphQL adminDeleteAttachmentById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentById (id:$id)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6ee24a63-3c0a-46a3-b595-c87864cd67d3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAttachmentById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentById (id:$id)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f3dbb213-3d84-4ea7-83ef-3f8d29bba34a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentById.id).toStrictEqual('f3dbb213-3d84-4ea7-83ef-3f8d29bba34a');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});