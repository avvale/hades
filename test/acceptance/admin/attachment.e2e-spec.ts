import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentRepository } from '@hades/admin/attachment/domain/attachment.repository';
import { MockAttachmentSeeder } from '@hades/admin/attachment/infrastructure/mock/mock-attachment.seeder';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { IamModule } from './../../../src/apps/iam/iam.module';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [];

describe('attachment', () =>
{
    let app: INestApplication;
    let repository: IAttachmentRepository;
    let seeder: MockAttachmentSeeder;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRoot({
                        dialect: 'sqlite',
                        storage: ':memory:',
                        logging: false,
                        autoLoadModels: true,
                        models: [],
                    }),
                    JwtModule.register({
                        privateKey: fs.readFileSync('src/oauth-private.key', 'utf8'),
                        publicKey: fs.readFileSync('src/oauth-public.key', 'utf8'),
                        signOptions: {
                            algorithm: 'RS256',
                        }
                    }),
                ],
                providers: [
                    MockAttachmentSeeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<IAttachmentRepository>(IAttachmentRepository);
        seeder      = module.get<MockAttachmentSeeder>(MockAttachmentSeeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                attachableModel: 'uoufcnk9xmks34c766h6wi3y938tvdauja1yml9bvzikmeogav5bvptt8qhnitfelfv95taq98y',
                attachableId: 'f93821a5-8b93-406d-a347-761875b3a911',
                familyId: '38ac2dbb-9ad8-4615-948e-82c0be070f20',
                sort: 287023,
                alt: '0k5cbosdnmjy4wngsc95pzjc7et7iyhmaefpkaw10dqoc8i96178l37q6kirhds46dt7zz9lbcfwc0o456mc2yzfhx9gmogrendhq17kt1rqal8tcdrw14r4w2sq1jg58fcu1oy7i4o3dxcszzks4tbbqdz9qrz2gb6liq7udqq5f1a0mwizsff632xmoecep1vaqa177a18upkiq3a46134ydyaj8w1eueh5hh0bm0tdvmwi5drl3es8rez2oj',
                title: 'lff336f3wud2tqnuddmmwhbx1jvzre85lnkm0z9jidpdxb511m8025eduew4qjgf2pnzbvjslhji3i79i2qa5ow9zbtsk2mj120iid8iut18uzzzx2xde3vnifzu3k52dr6a8a9tmawu5xm80i1q5arhph4878z7mgipnoobpob721cisw10dd1b5usz72yn5x8gb6f3etb0q67fr64i8u40ltqmbjlju12n9lqu172tzwpr2b0s5i8asqaxemi',
                description: 'Dolorem quia ex vel facere a consectetur odio ut ipsa. Quisquam illo odit. Porro praesentium odit asperiores et animi minus iste voluptas.',
                excerpt: 'Voluptas rem qui temporibus culpa quae dolorem. Et et alias sint. Quo voluptate consectetur enim earum.',
                name: 't9r7vd9zrr5pyc725t472uut6yojpskjqe4c3ujmcx1kz6t2c4fgjfwwcr1n7knelaguwvrmluy4kq278i9jbsn9259yl6tattvrv4pamkjj5f4r0wmxe4xp3hwyd2943qocm1q1yoafe5qfldxyl8qr6u5273gms441j9t8hi2todw650a0al6m3j32aqdk1au96fjtil7ka18ssh0w3uquj80c0mwj3boccerrdukwm59sgcbjea524ni19nm',
                pathname: '0o3vj74xmw4td6rlhf4k6m93yh9ttxizftk6x7asc3dhrjpz8699r16s5tvmlgdmjcmfmcj5s2jx9c73e3jli97vzhz62aaqzu1hjhqji1phhfskqpz6gf4qnfj45r123xnrx711wysli5iz458x0pt2yihwkrs7pg6vchz0sw3e4vfrbez402k018xtlm9hfjh8he76p2przvetrhv6i2txxzjjquxkv9ektqn10tmkrq8xa87zs5jd7jj584q05l1mb2waebvd16palqcr7jltewztmwu1pg1srq4b367rm14e02joffja1o318mhp1e6pkb5wgk00515udp6swx3jm0kswfrobifdcz3195u3f44nrme8bviolc5pw1iy31dipe5zqvyqe1w53xlz1n7va3xts2t8sr80n9ulmar751mx0mq2dcqc7umyekedjbl3vuckty6dyr6hy2py7cyadmxrj6gswfzhf9a8u5hddey9gsh178xjen35j37bv3bz0oc4p3b1d7l3t334fj3v2imhxe90g55kygf3sqoi86wizsec6tlrobz8ntbffw7wnd1pmq1u6pt0l12wiglr5uv62tkvo8mo8bmd87lnbmk8wm84unzd29ixuuqo51muszrx6szhxzlfvfnn1w680m3e8n6w5vd4grah8bitfkg737zbfs6s0ff8zwtzwpms5nf1zz8hh9juy4j38sur8xoi41pzqx5irhz92t31ufgepudcypyezp25vn0yhn9pyuvwjdymoqlwmk2buztk7u9sprobyimebs7lfcch71kwcc39wir7kw5da1cqscml18793378o9mzhfoucg2kxao0nwhvolikgm69u2945t8cax287jmcfhp7totigga0uqv0ndy0skd44ftc35nstgmb77o087rc37h0qxwuqurx993eo6kfyo2dkjzx5xaso2ru75ouvea5jj4qbownyh928uoecc1bwqholoowauzg7rh7w8ae27tgcpr3',
                filename: 'mz0kffhnoiznmpxqk445v9to9m4vrd7gq62t152pug2bczj6ziqx2q8xs83e292ybv4mkngk7xtxhfoav9iqwsynixh7a76x1w8uyv6ib5hlsb426k93ass06nj14xo8g4zwfujs2whc076vcb8n7bk63cmnn27gry1ys81a2qx57qt2bq7yk5ao71ot19lga6qs2gz7bvhob5da9r9qyisz8ezqnbqxskf27yb5r7k3yghiw50ri2x8wuuvczu',
                url: '3juqanlfvz0td2ntdg9pqho1i54hnf7e7isok1z7mtkk3iw6vmhbjk4jrcqdwvew0ea3ofkwg2tncx5hvk028pqh0txwacdxte4lvdyr54sla7myyeu6pj4az1xj69o7k5jwh29ce096sh622u6f070vw6ujhd0h77kgs5r95ma638fll1xzy0ahmz05itexva87cu3unblghhzvup6djzy6uubji36iduu54irbojwsbc3v5msdqpev62ygv15le1pq5jjghkp46sn3pz4dkbh3juzy356cnrj7b5zwuiucatb2ooxwgtqnqdfzbdch1wall1gq9avo8jvrqkamzvhyginy7idw6azm4ehu24hggoqy1nsmovxjfxyb7sk55dixy1smeye70yzw3wvuiad4lc4n5zjnbo9o694xpxmrfgxjth6xto6fygqyy5oukuifar1nlvszv6ah9355w0tl17u80ccndxfcr32r5udmw1ldzlj0bwtaj4sckz4nr0my6yj56n9ww428vy7logwgq6lwqshmb10vjiyn76g16ql95m7hrdibpce8sk6xpcl6b28b60ql83vvxpvm3mh7xb22js9n65xapzdqw5xfigtpk50g401s3qiwlloku3dpzbsx4e1y459w44yt45vx8r8yn5t3nltycib4lcyknbe2nq78bwu5mwarhha3gy5g2w3z0krpc6itdmhzxfluv5ct8v1aa66vazrtyvo2avo2rd2xp0ul97fvebjpxzhupur2h3ujxbboczsn68zjzru36l7j1mgaegthh8surbi078rlougw9fknezhvb92fxrd6nbxfqga61wfvvmr0opqxwyq8tj8lwbbnmk9vzwrksu7usw9f5eys6wktuj2iki7nhaxzfxdy9v2sj7jwupglim6uth2zru5coe3ylt3fe2qxix9vofsymde80rzcsyofr2wmdycmbscr18bpgku6x7xukx8welfrgsmgztu5t7e72my7ic969daa',
                mime: 'op6a2qcrh3bpih0bw42vghixpbqyd0dghnhoeyuxo4wohgvuqr',
                extension: 'uydk1ewmh9ghnofifyosr9nvd2mghmgp0dcls8oq8rhnvb6u9g',
                size: 1480182796,
                width: 791462,
                height: 447180,
                libraryId: '49ddc3f0-5d19-4414-ba74-9cbe83c4b41c',
                libraryFilename: 'o2qtnsgbvufxsl852gutcxdsxkds2k4705mad7hxym40g9l55jrrs5m158tih2ve9z1qdu5izgwtrft6dthdto9bd6vsj5j9gbbrbkn4iobgpjdq53mu97h7du5l8bl6b6vinxtu7gclbsntmup4ofo89r1rghr4ifirhtpahpopv1voyo97nl8cr8929e9pxpdy2voqjm211of1rohvqlnd6zi85xjdyapjpy406epz3y8mzkw22jxeoys6ihh',
                data: {"foo":"&ZM_QIvM@q","bar":"30tuCRj3$\"","bike":359,"a":592,"b":"-1Hs-@@pA7","name":10416,"prop":"v%Lpr4Mad,"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '97c73c0a-8a04-48ae-b659-9f8a36a692d4',
                attachableModel: null,
                attachableId: 'af4d9ffa-0dbd-4c30-a25c-952e913b5693',
                familyId: 'f729c3a3-7fdb-4f62-a03c-b636523ef663',
                sort: 937055,
                alt: '8mn6fglewfzeyw9ckkkxmv9iqoea7ehcvxzxi2esli0vkds1tldwoepmhsiu2nx6dcaubxhg741mz5xij0iiquaatu9rij75tc5bqy4r51spw4foq015kd5zjga89uj75ujnfb3dl9rk5dzywztqc692sudgqnjjw9xr008lzacm9yt91xaycphs92uiwepevxj4ae19eg2x8uq9jjqsdb7dggemcg6106ukmxbahm69hg1mbx0tf55elwih1ch',
                title: 'c14qp23o53h6cz7pf32v147l8tnk6jyu9zekgjev6bt06ikhtokb27rih63e5nndsikjwz4byjnkhtnmhpk3vsftcihbvt4qrqapnwgglg780t5yirg53tyn1cyqejlhqqqg3xike7l3ibbi87yq5a0at9wg4ad4na4yrjgo1j4khkpspnbwgc6xvkx65eqdlu0r3bpx9n92e7l9sx4zifakto2ozr87ynhzkf29ymolpgkyx1ei9zovjpcvrqy',
                description: 'Ut amet nihil qui. Voluptatum ea doloribus quis temporibus. Consequatur nam incidunt. Perspiciatis dolore illum. Dolores ut omnis doloribus vitae temporibus assumenda. Et reiciendis accusantium.',
                excerpt: 'In facilis quod aliquid et explicabo ab ex qui praesentium. Vero asperiores porro numquam et rerum natus nisi. Nisi quaerat voluptas voluptatem. Voluptatem dicta consequuntur molestias est. Ut odit rem molestias minus voluptas.',
                name: '9rmksjctwuujldpmwvzfphprnwid9rwnj3b4j5jreleruzm7izywtodqeeye8rjzwl95i1j8w2s43noqt97d4wzw5uq1yuaw02yesyly5b3zrgjrjjggdmafb2qb54mr6yllbw9s80ek0b0j5vjv308sdfngki3730mr3g1rpq46ehiom3eoqe571eowt7w3c8kjcbe0jo4qywaosvuadbwpkftemmyuujy3j8uz9r9l1hrmhno9ylx6e6xzgol',
                pathname: 'git2c1tq0rlr1h6l0ugff2pnq8zb1qg5qgci7wz581yliqsuymuhrtodte2qd9sk3p1mzxiba8y8vb1mh0ncx6ua7ywe5u3ekysygpitopm6ewap784j1scbgdxlt4bpjivlcp8owj8x5f6qdo9viinmxvorwvcvjq4j532zieuor45badkbuzz5qe4qkw3u87zbrhwlaaeakunnawclfhxeojcsgr1zrfjkocaio2q63adbkg6jgvj5syle9b60agwl3fv0gu84tohhzbw9a6h6njsvntqg3rmzlg5ftnq14cydjpd986y8ttyynukfzth9378l56nz3qn0cgmw2pafekl1mxfc6cayynzd8xmm2rhvlcm229al95ie22lt2dw1gs15qrrjs6wi7na6zn1zi636r01yv5so4p24pykvdg0rd98jyp490dh2bf5fpkp0g3r100jvabusftnj4j176hxmurt5bcpvxibhogi7rulkushnk9rhlha9h01vd58t28nu6ttdj0wso8tqlks9qru1pkui0o15kk5c19dtm5ean91j8ew2phgk5kbv4suqnostb51n8tr465jtd7hhgpvr0umr5a41h4tdl6hn4ntvs1e6upekmpgoel1jcykyc0db2sqa74vhfnn8y8wa1zdh3v4e561md4bkgg64qltu4s5wjlh0hf289sxphcxe2p7eimmgq13ul94y9pi4598u1hd40pzesvfusmviv8t4r19fgdldw4lq4wwlczgbj4t6ulrm5wxp88a4dhtlx5a5ayn7uamhe50wzlvk6zlhuksa6r95fgwpwr8bpbkuc9aixvigx2p5x534w37wq8hdruvwqp7uwpzqm5r04r7pbg0yud8yrpya4tivhhgs5yxuf8bbhxjlbvl58pljm2w6h9hs22z3l6p18of3tvahrsnl1mxu43re2t75ogx65cit8qwnmakcupi8ww0ueafxhxcejcg1mk8j8oguc35mq7vsq4kfxxaln3bf',
                filename: 'z4kqofzudqok5f7wi18rijchpwtrl55hlihf5x1d2zx5cv8z3pbjcku5frkdtqnv02qb3sva89ml72bnlxhcrsfkjuxdk5qffo43f0ffknk4ud2cjpqoutu2mrgq3yhojwgj2bap4oh6dz6kr5b3huzpy95l6e52ory67m1evrhcygoaqlswr7znpgzz7gqiqvjskv6vo5jjhawih9w8berl3cggagztahgued19oepg0i0r8e6cj3eypi8bld7',
                url: 'upe7ymwex66960yerbrhre570cn5anzhh81vo2sq0kjobnrwhbz86ggqn1miipjzbwd7cvm80454b291q1oqqbc6392ydyv53fpsrrtd5o8o07z0x6klv8bpzmc22u6edhlavo4kpu1fofj7xlcmiwj9pnlnnb5qxgrm2bh90wbd5284dzti1ksffebv9bygpnz83rx21wmto8b49j0622rhb7x1nd4sl0p3p5852hx5wk8t53n22ftua5fwp9xnev1qz7rd5ayyu5uue83h11hlk3gfdwpvi8ya7mgn8340aa5qo2fvqnuxj9857fkbdur8hwy80966qntwb7pj37kc0ftt8en1ynk6lyvbiu7xx5n7igfx1bla9ldmrr6k8jz5ijzg45lituj1n5zsr4v1whk7qveaesy8ijlee2499ovjq1s3htmsu373nfy8g2pvm5alf4ipos6kiwi6kk63oatuzmljbo14bkc7dlvynedwe6dbzpjn9bjdvys3bry5o7iwjjd0l6gib6tvlwimsv4ikwmeph6wqr4zb5v3qxi84t3c2tp7s258uvdfs7uu6oyowomlzpxk07tgrxi4mfz4e3dp8938p5lmxvvfyqcx500l9enk0d9x8psv6c9h6n94od9fu199tvoy2w30gx9enfzyb771nnl4e0ni6z1zu5fkppkhebvb9yj0xc3suifane1h1ntim55ma4wco21tor9mmedbi92m9kyrxp0z1nkjn0iqovwo93g8y8m8vrkxo5842q0fwdhn0nqc5kgn96xu674kv0oo39lwi3bwzhumda8pg3hvhpo6x096okx0gvulvg2lt4u33rew95ia6f75xzvaonr0f1iqzq0kq5ugq0k6925fkjcxcitfd5ia3v4o5afwprqd6omgt5pwoq6yfauysosdmjyl8yj59ex2yf0duof9gk3m2z3pld33o1780qm00z58gcwgfz3n4r13glitcmmmn7wdhl4j7lkux9w1gvb7pmhz',
                mime: 'zpw9xmmwjzd8ojlyb67ytmtol6ori84sdb3enplx743b4lbnvw',
                extension: 'az2wze75971psuy1px064eh5tsr8h94qa084wzxsu6xy95v7w1',
                size: 3087951357,
                width: 927168,
                height: 574101,
                libraryId: '42fc115f-d38b-4069-9d2a-7f1e4e076276',
                libraryFilename: 'olousadu9bwuglco72gl8cbevaywu21wm8dpk2rg94d5pgb47ko34kbpcs0zcy8sh9u2gvmf7l7frbn98ddihgo2422dcq7fob8ohrz0aa321bisp5wnqqhqed85j5y7b7k25nptsth3ywruvzamg4csvwwoyyncd8dka5ycy3f18xwrq4afibfxd7ilc6g7qyox3fwy3x9eo69ak895cnjszqbcv5kjgg1fyl6l5a3fvpu4k34q3bs42wy11kk',
                data: {"foo":"_n#QX)7e;U","bar":11318,"bike":"0gu`ccSoAr","a":"rZ;F,)/[FA","b":49008,"name":"+8f9)nbkEA","prop":"'gB$BP?1Yn"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fbab1033-a644-434f-bf36-73fcec2354eb',
                attachableModel: 'ak1t0rf9qk9c0ctb104ip0b88n6ffbu4kwp586a64y2xqxf97zzq007jj8kuo34q4ztbjtiwnjn',
                attachableId: null,
                familyId: '92656adc-4a2a-43f8-9282-368e0ce165ca',
                sort: 631745,
                alt: '0c64ol76mprj46zqw3z4vnsvo9c0d55m1r7plghyok6u2xr1d6fjx7q67lsyfbwv08zvli1s0n22a6qhjhfevu64tbqv2ix3wv91ubp7v5xhx2yv3cw5cxme3sy0sy4hq8e2lurw3iw6mduhvyti1yxzjvo4b6cdcqdsxmf759pdd22axwh86ixuesmgijao5gusv69w8m6ats5jnci6xisn2m3ex3p3qp4nb22qgw4876yrw1yshzqp2kng58h',
                title: 'b1sfp0ru3g9y49vzye0ccj4pqvx55od1fln3n0571cbbgxi5uryc9y6mmnxr7kd1sjzvmjwn3b7bb76otkvinf8pr72mw5z9tsdzqnidqx6gug2860noykjc4poeezgu3wo8pnafrdierx84k0s9unubf093cwun0uja9k8quaofskt8eanb481hit9isy7cd7awwhqt7gzpk0wy85ygkp92kvz4gftfjktovo6bvod4y7tc4othe4sd0pe6egm',
                description: 'Dignissimos molestiae expedita. Adipisci quasi quod ratione officia. Corporis dolorum quaerat.',
                excerpt: 'Esse occaecati excepturi adipisci quod enim quia. Consequatur tenetur aspernatur id corrupti tempore. Minima omnis consequatur eaque earum placeat ut vel consectetur amet.',
                name: 'lbb9uvp95895l75ytdo6ng2uut1bnbrxb1vafhobckdb3apvy1coc609h26s5mvi7zgbohvedc0bjwynsk9pt1ne0fylrawu61y4cgf2uso63qpe716rocn9k7m27zgnxahhwdrthhz6b4uhpitcizjrzuyxsj3uwhupo7otelpgqfa69t7scns5l3mvj81riqo4s5ff6iiqh037z57pcd0lfa5hv11u4mdatjf58vpxei0k9606j5ce9l6ohjf',
                pathname: 'codd2g1dlod11dtw1s7feh9e7oy9sy5rxebybaoi9ya34qabqvy2c0rhb9bo4qiggh9bwlnu27m4hi8u09ybayxyea8egmzyfwq1mikot028jn557x17dzrwajjrk74bxoic94xsji5zg6yiol97zdu2jor0yjkj4rlzucxpirwqdfygri4il0ayj18bob2g37jbyftn1thdzyg2rp7lsqd6fqvhgqc95jdsd5iadzwzjmu73ixv6oflejga0pat89j887kju3dmdv9wo4vwzk3xa3x4r8y1zzk4k4s46ob94r9tr7gzh6oui46naj6tkqg7w26amoqrzz0n58sox5xah631lxj4j8qlhvqm65431l9qpl1mz6mky67rrae2ptaucdmyo13i7av3gru4k49ul498igcveyrbuqgpcls0oq0vove0s4fga4nl6pwdpf5i1r2qnja85mzrnhjshmtm4o9ylvhmnfcjiylmn22abq53j162tx2z3dafsvtz2g2ndpuilljk75w6coww11fvriew0t15trx5dlekfyoxm52tiwl2dty4g0gj835pzf1v37mh8o2ipd6mr27trs8f2d2djwwvtfdj855uou5ikz88b8tl5ylsht70oygn65pqs413al5mxypdw1emqknhtij15xlu84xwqc06qdbvizbqykfua1x7rj1bot20dztuxqa18efr82bdcakg49iq9nv77pss4a4pi86d9gdiw5zbcnhvt0ge6jfenzwlav8er54azuov8xykc2wqjq7c5i0ruwzxde2ob4yw5lpn5vs1lg3orqv66wk1m58s2mptd10dg1tgyehehw3t0qzq6fl6jvfh5u0627fd0pirjr45exxdh09zn0px6gt61qe5z2zqjw2vqyu31uuany4fp52rdr2u0h4ra8k2cnkdjha8judy68e0igpnrp2v7mt6foss8z3efbjls9adfeu6h7gpesakvkipphzk5d5pcpzsyzf2onih8rp5kwav',
                filename: 'gygup3pbwe2xrz3o3lp4orhnkna2xe8jdvy8oaijljtpwhsjf8klb153pw1sr880al6jppcg5xdpvrzddiiceg8kb9vmd65wb0udftkeg0caitfxk7yownk1pjskna9x3ltxi80u0rl1tmpezcfaq0jfuw6ba9b6o189bv8ison5kamlintt5uc2kfbt5f9tvq3ftngoubrx1n3tl8kfrf32aoa6h6zraah8gu19id1ri2z44nsty7lpyghvyks',
                url: 'kjghib8beqlqc3l1iziwqehq5ouh56u3see8l421ukfxss31lomjxmqypa2opbs3dpby30rivaqki38ts2zbz5y72wcvbs2rph3ptdh9e9m82qi02ky6q5pvctkx7mpkm9a8rqvg8eiiz5zvlq2532sg08xak92znknwg18juxez5795h161j1nuvfpxsty30wz9blsfh4w07g4o15di4z616dupi9zx3rg1k0pyj0luu6085nwu4g3q6oackaoqtejs8k3rprrzl3sa13jxoey2i0ozl0hhbwjviuju5u30papmna701nn9xu8784fe5uspo1up0zf8bni11rs3r5ralc2vfede8i5z645tba9pz0nrpij2u63pp06pwsfz63etn4xe3o23hwoojl2b4g3llsg7znbx3yqh82dkq4min333nyda8raiwy5eribbmwd2ac946baj3xifdco6vqppx5jq08wfbxh7r0mes16hsxuatm7doatne2e8939t2ta3rgy2nseuuc9zasqg7hxjcmkqw95tbrbs2frzlohjr4jmeilpkvp8fo6dd5827q1lb2nnpz296l9u3iocfabuznx0oyodtaqm78ef23o9lzrqqwn08h6edklmsjhnvhpoy1a39drejuf8p4actouljsenmarg0et746g3brn34r0u9tpm81cvk0s8trdeu4qwoltb4i59gt2y1392ydjf8mqb5i2ago8sxp67jyn32yq5547cs9nfdfxlm9tyzu3z6l9n2vefknzc2h72ahtc12qfuz8nd46jf5iavpl6tiigxcpvxn0b19e4iqzim2y0738lhz8h7xhsytdfe6ehnoetij731hlvgxr7ut1n60wa7qi1kmpj0uszutg48luq8chv0j41wss4v651wvvfq3ruz4gjjmzhdr6db8ckku07u2rfh9qdqhtnw4djym0gv0wy6xd8t7m883q3h9ksah2w955su4xgulngev9u3ud3d4apmoa0uy8qt09n',
                mime: '2chie4ie0b6qpcpqoqu8fogf4gbd8wcro1r1o763c31g96yue2',
                extension: 'gdc02sds6i10oki70fxoatgoaw6lont57v76ici2gdxsk8arzb',
                size: 8415409668,
                width: 134799,
                height: 163493,
                libraryId: '50d08cca-cabd-4e9a-9c1e-52e432e84fd8',
                libraryFilename: 'iw9nbsbam5aebz8y1644svuu9lf04ewdh6omxytgrg6r64w9y1rvmcc1f3hp7jabs6nl4sophsmnx44x54xedxiiavlfi1wyb739rc3e3bbmqocsbjn6do44pmhs0yyxdrj20bapazmiwv43jynm94t5m50upggis7bz5ja4ep65dr7xreigzh0bbaj58u1913i8wbafy3xcug0324l36tv6hvkshpc4h36rvovd9gkyjnzvzfvtwkc8r9e7gyi',
                data: {"foo":"5_$P]R54zV","bar":15086,"bike":20017,"a":62375,"b":"0@|FW\\ba=D","name":"#`GiwozEm)","prop":78814},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b78f1210-8ec8-48fc-837b-c9541cadfc4b',
                attachableModel: '69r920kef2d8jbvlvqqfkpncts6ijcii3arkgecu6aknr0zkwv2n56kued8ek2uvwyd2inz7p8k',
                attachableId: '181f2ba9-ab75-460a-99a0-1de37e7db6f4',
                familyId: 'fd65ebff-b014-433e-9628-8f96c6da520a',
                sort: 923189,
                alt: '0nb286ium0dx4kf5xmmtgn6tbfst06659ltxg913738bmoscjye3y34elizwmywo67cs8kctbhhqkr5aabwtp30bfsgxmlniuv21x4lom6hltn3ux9bg2ekq52yseym7bo5to1nd1xivq6xsnutj5ar1xj1lou7xocz2ykm8v11p0t4oqj8io7eqvovnfw8t0bgdv09amc88puezbwp1rcnduqqxov0631n496xes1tr41n221n8urva258vpq1',
                title: 'xikbc5pepo5rhf8a4iforxdz2zdlds4peiohqg0b25peuhj4zmor49pzonbpg7j9kheg1rdie075mhf545m0bn0cabsrax7vlas8dcd56husyg9wlfim7ldogd0in0sdjpjmibscigxz23jn0415y21baxxnrygsva0hm7a1u5z3jtbsxmhr84cxpyojgt8h0xehb2x0rqv4ut3gfi89elz5z26mvzs3dwjr2e9y4ijk02xda3drj642xeq8p4t',
                description: 'Dolores pariatur labore sunt. Sint dolores sint. Rerum consectetur soluta odio nihil porro sit nihil blanditiis. In ex nihil omnis minima voluptatem rem at voluptas enim. Voluptatem eius officiis placeat.',
                excerpt: 'Vel impedit dolor magni nisi atque culpa inventore ratione. Laborum dolore fuga fuga beatae dolores aut quis nihil soluta. Neque dolorem animi non soluta et fugit in. Animi ipsa at voluptate ut fuga et. Aperiam ut maiores distinctio. Veritatis iusto quia possimus nulla ut dignissimos qui quia.',
                name: null,
                pathname: 'rsdcz6kqdedluvxaw7m8oanjj12g4qjl4yatngmlkb2sb86qdonxjzi06dykxzj8u5zgt52h3z87l2roq80obhsk0vrg65n5emsse8uor395i49f2f904v2re0gygn2talandocdpxtbfgxv78n06xcp550c6487dy44i4w3v5c3ovnvc3psh7d3it18ybq72sdxpx94q7srsbua7tt9twdwlbdojforal38ocy8afbo2f959uowc76purixkpjy3eh5tigaugm0hy2ov3i9r19pvud71dew0i1j261ttu7x4lhzohljaa3j6j59u7w4i695o6m0d89vba7t7xlivhn8jinsdneyzusav8vwg2o1xvlkvyftet1i0txhxtossl26md540luwv6vxgm3cqj3n9zpwf5y3ha2vpzucp88jzcqwhnuwwfv7lntq2hwgidmykja2e62r13paeo6wzcxr2l2zeegc4wp6tb50a10y8kq09a2eywb9nmy6p7y9rvk1px1t4z0srbm1hg1oi8jhi22ng2nun7kr7nuwb8ymkrb9fvdn7k31232j6htnvlbt2d9epn5x021iovaxbycrrh0ffv5vjz3d83imkjlxclya1vd6ylp45e8nbasgfvttuggec5plm6d985l33u9lnbox2eljdweawk6uqdp1hcf6k3g5x7n4y9z6kru3cb72li8xqqt4xq178p0iu7eiagusd0eexnt7ef7hu5rck0a3jzw4fb420nl0ta4gpe36ho3mmbr8dzallimzf5hcl31k64xsqqonv0s37vcjwwbghq3r9w8151w1tm04ysfkpk74muaa3dhpcnjje00cihiq0xl0d7zjmbtexxwb98xia4xh159wu1836bbgauyxdagh4r4tmrek4oysf68bk4f0ixj8lsettu0xqtvsba1iekhdggq9254y4mt4phupb129dx0otp73x7iq47ygif4bojkjqms0fduq38sw805rx2jiiy3uk3ot3slu',
                filename: 'zjng615hvw8pm6wbp7t5mtutyasbyg44chs9te247qio98bd29iu5rzgcovzfdfv6sbhgkbrpdbcmk6nliyg23uaaw5csbkp67odh4t46zj02e9706xf247913kn96mf0uz6n588g7qgw1begzos9fsf390j6ntbeu83hh0sk9adpet9a705kz4bxi8ntwfsehc26ndoe11511t3zo4kqpqv8d3e6m545wemh2tv8xopo84gyvrrazanty9yggu',
                url: '0kry179tl8kab0vyoku6m3olcyv26zjawj0gvltqeoemhin5y5w2hmccli63i1hnzczxjtfyfd5rnljdbqpxxe4o5x0h2q5jnftaj2cwqwsyd8i2n1t8nmgmnqst29trbk1m9yl6ezv8gfbh9gjbavl4lqo972fzqmepnh6vd2mafvqymfbxyr0p1vpbyxamfowjrk6a393q6w65w808qzic9nl9gqlnd7z5yex4c15r6dizy9r70ghtd4wr38uj4zlot7o4c3uefzkea6mzn1iyunztptg6sbc6m3q9unaxhscbhxfpgvrnrbxh8ebpqzq1buupg7yjyuu8btu87nb3n610saei96fsgq0e0jwa0a7ekdl29vt3amb9asicwypp9h46xvfg6rphlgr94zep4vlui641qldy5dvtcuwv038qbfghz6mlfkzwrmcr0q7455707vhfrxzc4bydlxn41tgmtkb0qc22wn4b0hw33ftk7bizcllw33v2d354aqvfpc515ghrxut3dlmsntldf37dazolyo6ffteou78437m8y373x5bv379m8jvixutckqobhbfwjcqmz7x32qng5ia67q9dffhgpxj7v4r25utqnjnxl8uoacno352ann5v387mislx6s9igdrg8i4tvrh66stq2iyl792m9z5iixredfyenkdsi6u7uj4ugc0zwd34a3y86sht2acaupjvbwbaktac2jbvkwpjhnq20dhhjn2qcv2l2rmzizl119q3fpwyy0x706guqg7x6d25e9r9douf2e7422ns19dk2pjq01a3k5i1e18lxl0tust7j15e7mr836et767a5hrzw6or5bu5jqvzozkxvq5s54don8xvgnnuk8lz11em8jwh7x7fqy9yak5ann0ll2lp0s4ar54vcrikp8xsj7vhx6hkfc6k2s9th38dgb9em46kgs8f3mg18a4qde500d5kyr447apekj2c6qut9slw0ut7r5b4sspd3qi2y5li',
                mime: 'wg27zj40qxv43fqc9kdntxvy58wz4vdq055kppwq76xr54axp9',
                extension: '0yuxssuwoav0tq7uyhmi3a1s5d5ej22fm9ndio6898uqukb3g8',
                size: 6566699934,
                width: 672438,
                height: 355169,
                libraryId: '049d2809-140c-4985-bf25-6685da60e997',
                libraryFilename: '2ttto9u19wa26loq5hv1vohfq93m8b7g4gcvfctdqfirbrlqce3sd7bf1xgdt1v7eg394b8y87mktb2jkf5ofsy5zqpfocqo51be8we7kf2rpe49jyfgbolhfnlzea1oprk7y9mm7fi1try4j1oweg3t47v3v61phqvguufnrx6b4pkr4tmv35d0efrtjvvtsv7ve4mii53qkjiwwq2kosi23fu1klga66nsnm630zvz18m02oxxejs7u5xikiy',
                data: {"foo":4719,"bar":41297,"bike":50974,"a":41822,"b":27286,"name":96612,"prop":28698},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fc6cc889-3eaf-4b67-a961-8c09c20d1a1f',
                attachableModel: 'lm4qm0m2hal0jyx8adypkufvsom5a90rjufb47i4zfj8po7w7i9twqhar0xmxcgmqd6ur9mhc6h',
                attachableId: 'dfa04828-7ce8-46e8-b0c8-f05202bc6b55',
                familyId: '4b2abe7b-babe-42d4-ac41-9886a45c1a2f',
                sort: 983626,
                alt: 'ib1hbg2qr0343nsnfo07xsi1cnw8o1ohtwdnu4ptn6jnxykd9o1jek9eios75zjb8ytswt1zcir2b0m3jsoipx9u0lg7hy0s09jiz9ckor1gxcknyr97wmvvl3y7ohoscf5moxx2xvl39yqr0rx35g2g4v4tvqzxlkovxeuycgy20s62gyekmizowkbptrajf0mgiwmwgcenty2tj8tr6dyce7tkexul523zgdap4i6sczjsed2bjnsn2lyey1h',
                title: '503x4qwjj9u3jrhcwm33rcdc70ftngetvrdn9cgsisk6h704df6fk95r9o79cnozngf3e1uw1vp3nhxqr57w44e4z1fhc344gjjbymxr99qewbutafxch7vjn5gk54bxlrmob8k9y25zt43w1kvt47qp41m9t04oyru960dfl0329f0obtqoidrcn3rtxavvsedhw86dq3arltrtw87hov0b82yjbjzrxsjrcmgxggzynxhft7izu5tlp3uj5we',
                description: 'Quo minima aut optio. Soluta aperiam dolore deserunt sequi voluptas. Corporis nesciunt reprehenderit dolor.',
                excerpt: 'Illum nulla beatae ratione praesentium omnis ad accusantium id ipsum. Doloribus eum ut ut. Perferendis neque dolorum. Dolorem et minima exercitationem tempora dolorem. Commodi facere et ea impedit natus doloremque omnis. Ipsum cupiditate quia odit temporibus eaque iure consequatur.',
                name: '2cu85q5mlwx3ucjig3w1awtol64e656nvcnt17nolc82hsiu0v702pi492cslh02cl0e2ns7397738w1t8rnblvhxks3bkcm2bmzpwxui6y0768sfmnzkr9qtis0hhxuepol81yjy9z30ie4jm9uw00m4krghj12jfd3dd2l0773l9jd5s6ulurifiycae9j3r9t6opks06mi8w61ot8qmcdh569lbe3m7fs0qu81992cehakah4csp8tr7qhaz',
                pathname: null,
                filename: 'm9xhbfoiyj5ysqoqhtqlxlcudt16diw9n8q4q90kdg120ydfgwvfw1z7dihpc6nghlhvn1bf71zr2nei5smmfrz4kc7gz414z7y8919n7i03wp6p0xtwhjuda3j8fwvma9nv1g1tkwc2o69trx24xz35dy4jp20y4w4o44pac7g0otrvrg3xtxn08ueuaya5es9tsdt780w9qb0f9zz6bzyjib10go1aj1uvdcuvcxirbgq010ljyklxmkt5bp0',
                url: 'ecskjgyo1atkq754t11rznq7w5vhtcigzfq5ijmjclnz58w7cyl7175blol3flf76n1mjbd1tlg6gqmdfzxiyppr1mqg3nyenqy6jgolyf9sjfiky4eawr9l5lozeqby9u31x9n14riv9iaws1akcgsjhkimldx6voeup66swzmu34ycstvip85gcm26pg89neitkof5awqj2pwyvwxjbaet8di1xm3gz9gkbu1c9h36by3a6u3uhmnm9lixs1uq1lwynzrjfn2ig65c4i2ebsr6x1nwq6haxt0atwylv9pfaxmhsqnf0xi2nrho4qe60k240oxtyi2ip1fo1oawzvld2yzewbdvil0lh0xlbsysq628qjamx352wdf0ovriawjz4ugfj71j81n833u1ubohs6cf3cczc3syo3wju2kvf76zj6t0jh04j10v11lkyxiyqfw8vxyeykryaspkpkbpof27vfsm58qfwf0l2yu0lktrcjrfr9fy44d24dbll996pjzca0ceohatp5oax2todk36ilvtnfaua27wyj7yyw7sx2kymzis2zzffuof3yxl7gl6xl92af05nn2vb11pg17vb3lyziixcet0llxcuvzukutqne4j1megg9usnu4xrhgsmpvluzsvn8cnm0ukcx8q03xo7pipaptfkt1c65omi7jjkyu8cprjktgh4i517n6k1e80078h2wr7997ll0dogd67fd5irqpwhbur49meuif9k01y733q2e3cqopxddrvmkrucv5vfrj2we7edwuaigt0uktog8h064hma2v0k184evrr4dwfu85t9ltc9rwrc83jibeosqnu4e23rkkod4szd5gp513qtdloh2l9mmob3eqiui90m6e9nwyxug22gcnpf4flagt8bobl752jrn7oui8ty2ai684plj2vc6zgnuev7d6tkphdrhrinacgc1b29wgkrdhkbh91nif4ruop0jxjzzc3psa51dajhzcxkahvikp7e7se',
                mime: '0ogwuz77feua8otpmjapg9vwpr8wegviw5o6szzs932ghrr6k3',
                extension: '2sc3x3srzc4op07z4cqr9vgwcrio4tne226dbkdwfq1ylop5s3',
                size: 4786863757,
                width: 566798,
                height: 328298,
                libraryId: '1979d920-c59a-4c3b-976d-4719bf4e62f6',
                libraryFilename: '9mn2ha45roqfck7ap98ntj6jm9ydsd1e08cgt6zdql99sfrpylxva3z2iub3u3hb4gx4387wtqtrn5f6b5a8w5rpneixgudjng370ck6beygl3zyfu00qm0hffq9klcjpxeci4eibmph0paqo2cdo2ark7ndznl1gw2z3h8hjlgg9bb338ssguozbxlefkhmfvx3xwa3yc3n0ul2jlnvnrgcrqn379hduzn8rc6erpawxc92l32vq22pq23hvkj',
                data: {"foo":37517,"bar":64986,"bike":"|+xm|UH0kT","a":90999,"b":"*Mmd9gk$p^","name":"LZ@@&/Xht%","prop":82701},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0f1ce922-a1eb-4355-9945-37bf18948a22',
                attachableModel: '7ml4ioofrq97edecifr3rxqzhqj09by7317ooodo94gpsc26y3nq97lvjuu3dnkacr4xx0f8lid',
                attachableId: '1c993a3c-adae-42b5-a9be-f4e9dcdd1a2a',
                familyId: '70be9b91-be22-4bc2-8354-98935d7ed04a',
                sort: 268949,
                alt: 'yln9almqo76qgjfy25pn1sku621xhebr4am3y9i8dhjac71lrbmbubbjni4zni0ywe94brgmgmt9myq4tfz8j5b3p9t90idcp0jeazmlhlofh0ex6qc3l9zb94nvnvfb9477ar09yeeqkn8in3c8jmwisbnv24bk421axt9cuj96y5j5i090th7t72sueabh7zvj64jvpyxbfo79xo31y1o94zs5mp7449lbnlzqagvbc3aiciumcrrj3tigwtl',
                title: 't7tnzwmgn99jnzbk8mmyvk0dspiposixrqs3iex6e08408vqwius529ce6warxrgo6xzj191zh92xb8x15lwy9aztev8jzega3p0khnl99q0ynv55kybamdau21lcsj10usn3zgfrghyxwjgx1ga444dibn7m603cv955ks98v455w0pwdoiw19ncs8w1ioytflebu8hs48l9xgwfm52qdrpk4lf8fehjl6uzpo42n725yrusyhbwnm1qke5eqc',
                description: 'Similique aut similique aperiam. Sed est sequi ut. Corporis sed quia tenetur molestiae. In quo sed.',
                excerpt: 'Tempore temporibus cupiditate est officia ipsum. Minus inventore provident et commodi quae assumenda quis. Dolores omnis blanditiis quo nulla voluptate. Et cupiditate dolor perferendis quos omnis esse fugit esse.',
                name: '20dc2006kd1tgbb38tjvmkagnogbs0w5v1q26ipdtjvxd46vj6nv7wpbqlurch38rzhqiykw2ulpgn8aexi8ipa21xehq07qfr4vm4i31fv0x2x7qm3jlomnjs6w71u0eco92wem9hq9x0sf6wi694p0dm4bxee6ruh28eiy135cmj95ox4ged9vb7wjw6juadch8z4qnkmbwlw4aqylr9px7fjdpi72on9cfol6rpo62jyncmguo7f0tx7m2el',
                pathname: 'ozbo5nl5xdhzpqx2vnvzum299ewfl5rq4ul9a3wwdvbhqf9x0at8zxi4lvscbslwz0t8zxoxuc73ezws1stpono6ik2r7jw9mt260y885u7ey85d41r3rnvgux8a1o1vmh94g26llydm4xr3ofp2s2k9k8qmmda6xnl90q3y3rfeeysna4brqyct5gxe90gijsm6d65e6zvxk1vjhdipede3w4ohovqk9221cf9osm7x8y0ha6k4megelakq6rfsyrc7x48zb0hph2hob83nfp5mupkog86ogn08lpfgft78kn1c21a1065xudlsryg0usc3r6izq7chbzkn6hloil8iqsfvwlxbnrp3xrq2uusdh34iwn2h3m2xs4s97gir5p8zi2rj6fymxnfu5de2au0d10y4ftenvbvrvwkh6aa0ietb3fds3mo0apnkezab42dj4msvwzexyxxklvxbbvaurh0dbkzrspchepneotwxy7hxoahuqjc4b9brfb3hwia3zv3xf2tqtfjcv3hidjke0jb1m9hi4k14p1vbontnnv5jp644nwjbvth3xuabofwreabww8bntjdqncejpdb5eepqvivqxa4xev8i2o6xqqww7hymolokbznioicqag4co04l1tu7g6iuym8x7okwqmtm7p95xte2r3xi8d70xcqhya1pei8rp5lk4x6zmkxt7d9hcfnm6kyl52g8jpq05thdc2y45261ltw0ivk9c45uw1roswyxj45wyrrmk3i31tv3umdfrq8fro99z188ehdsgp5kgjala8pyl018tasgka81at8n5r9cnu7gsafxe8a6ycze1ltoprcq5zzlkyot58kc2krwx0xijelpeg0nyxj149y6pfr066hhlibsb6b6cup32squ5bfkzh5hfirwy72mbff6b5ztghi7fqrnhe484flaljcck6nk8nl8f5wfjyuoprdk3g1uqrqy7hvbvgw0ne4j8fjofmoln2eytj1efgfnrywsz033',
                filename: null,
                url: '097tv080l5x720ycotaqonf5jt2jvet0a0hxz4tpb19jhypo3kpwcl3hc5jk33jjbryqhgy2n4l3q5cx0cy8hwwlhjvyjzzbmxi7p4pxlj2u9zfxs4ramff4m20yydoe8xmurd3titzrp92hiq4ktmw13o3gjw7aenl9r742c1r1knwhzwu0qu36lx3v6l3k1rmiesumetwrkps1wgp7qm3hxps35xagouddxsw0et448qjxm4p7hvb9lm6htv9khnrbjq7uu9xyuxqggc3tzsrtsaxqdmiw8tyqff0pcm828w96phk1z0rquaj8bqu9mxclg5vch5hfu1hmcusuu06ud86lal80gj2u66hdb52paj38plu851g5w0yexplraatc7znc79y5pj3d3l14za1p2018awcyu29xd9u1fvwixhfi52a2bnyd4wfgtnejhm7pxdt0ri04nbarh4j6o79gc5l0pst6ry7106j3rekyeprity0te2ziizz9d74qs0wboytp8im5fkszet4y2ex0m2k097nkkwxeq32bq0dk28pkxe6id68xhkg4amrh1eff9oeek8hd3n4z3ogjs85dylgz0az16twf1jq0u89j35bi4l3ou2ze9389ip1dzyyk53hms2qv35nddijp7s7iyiigjz9mmqqc0b9v0uigfewjzgxusw7om7movz8trdtnv665fmz8tiwhub9sygei3wnaoopfx03d0k88540c88mkjxivx0udv6vflclb4zxzvm11x9584jy0k7phi92wc9gotndg5q2itls4nx7yslhm16v9yrzxbau00bgx9higdhqjff9hdqqhsy7mhel4jf8nv9ia6pf00hf5ne1y6hpzyfpnaoo148esj497587mxs77kgbrg1uf1uiw4k4tmzfykcxjje0ku7euffa3m5we3to0h5shwq6moi8pr9dotykzfrttgjf73z4f0gpvs5q1v2u6amqqim4zaqvuf2c7pwo50sdva8cr2sa4',
                mime: '1rotk28s0886k27xboibnvw64t4mfwz2carizxsaluf24swusd',
                extension: 'hhzoyesnof5h3jvqu4wj3yecdq5iyj4fc2ho9ytjaynliqcrxc',
                size: 2660676165,
                width: 453852,
                height: 416828,
                libraryId: 'b0c76240-6569-404b-a363-4d8ffd2af4bc',
                libraryFilename: 'p276jpl5gx1xq96k6r7pnd9tzv8yat57wnnk5uy1wkovtvdjlz03r24y316rgcp6orgjwsklcl557jt3gcmvxztl4v623ocgd6uqk2vqn9uyqly3tzlg0kgc26b12430csy9bbwvsybioy1pqqi5wfpeck0x1tdnl87hlekomk77m9mcrlufesyhgf0v9nm7s673mkf14rafx4awnhb5za3ukxj1kfrbxgc0cbxo7mg6ws0wng1brjzeexz6c74',
                data: {"foo":"&y{]KSOG\"z","bar":43862,"bike":99684,"a":55533,"b":38650,"name":37865,"prop":"+q0:T_X\\-p"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '53f1a65d-c3b5-44b9-adf2-2a20bc1c6107',
                attachableModel: '47makdrora826j1yw5pe6jdmiyahdg5sku4aqlo7ef84sagee6gk480d44gbd936pg5wl6pafsh',
                attachableId: '53d1339c-2e45-4cd5-9ba0-793eb50c2419',
                familyId: '2bf45f38-937b-48e4-af3f-164fb725d993',
                sort: 465604,
                alt: 'e4qaqb2ymmo57nburlkqw7m6hmg34dwy09z5cbgqhsxixgcz7hwf6iykubkab0xv21l1zzrg1yxozh8u1k7469fxatzhm28d88q1qu6kl3qlnscl840x5n6b1rkbpix2b2vryw2jivzjyw350ge9mxlad2cq2vly4mr8hmkf39xzuxvy035xwbgkdbchdjlb1epwsodvhunzh1bnwdi21010qu4awb8w68bs1tsx75i0lq2bgjan1ps00hzps1i',
                title: 'st8xxmxc4u4pyawo31lb27pqtl6tj8btbe3ahvh9zw6urnv5zyk72wt55yyjr6wcnn2of7lrmj4xrlm6j4ga1oeqnkxc1l8nl9xpxyxowzrrq76s2s48nkw6oxok17fppzgu1ps1ntt9786rwt508u4u0tvvbhp9w9nacet217r6xsani48wzbwbek9v1fhrbqnqduu308jvjf5moe6wp3npfz90mtfqpd921fa953kt36of3xyw01fw8ddwcm9',
                description: 'Aut deserunt quo consequuntur laudantium sunt repellat. Et quod veritatis laudantium ut delectus facere. Et debitis earum aspernatur est aperiam dicta illum iste.',
                excerpt: 'Aperiam enim aut voluptatem blanditiis nihil consequatur voluptatem repudiandae vero. Officiis autem quam facilis quod in. Repellat ut laudantium accusamus sequi. Quam aut rerum rem omnis officia dolores veniam.',
                name: 'cr4cdtsxibt4aj5xxs12xny49t9qh1d9kuwrubo7ar477nprjhngy2r53e8u5fj5lq8lfatb07fu53t1qzbb48af7m5n2oyw7ax8kyf4vlz2n4rq0k4bymbjqf2ns34qo5w4jhdrx4kvovnigpp3qcizuatlowvmhm4wwdrbu3k7vfqpjw8kjcwnygaqu6frnjrefo51kyukovcjeauyurxx15qweei9wb6tucxrxhuwmhlhe5j8jquz6zi2ee7',
                pathname: '3dlcc2ba34rtq86ksy6gdyos7u6nz3xyh3bvl9xqfps65dzvhpo43vrkfoqwjsvynsip0k4sdx1xv3a0rsumtirvs7awo6vflqs6at3wpztht4j0nxwxgw6ywztwpvvkzb4ogtl98ncls781pgy4otbw7uockztablzqskz15ft8so1pj26vblz5yfsmsnpkcy2mmql4ivmykefts8y8qw1zbnknu98hjyo8q9dwnoeexuuzcoflot4jfaxtqvfxw4zr6ffgn0zil9esgazsthsxhsc8sv8o3ekmzsbkhwn9ohwz66t6nl8sxlahrk0vi6po0na82okvanuzceg6t5vrexfsjwhxpbvdq3e2posxrjg4q4rv0s6cbiicbr8apoadoyowd592zo4u97xldk58shzu3cofzmdu5f4mapd0o2an0bdzqsnbcuowylyynwwg2be697had3p20q7in2qqy80uygbo4lnwwvqfb4uyeos1ltehhsxx2rskqv80dp8j3sammylv1kz1slsikdajvr2pymuznd7pkswxzk6qxzmr9xoxmwlb3ndrg0a4s32jsfg9qk78ioqbzcbs0tm276pv0tlxcnw9zet2hco49k3oml52rx1kq55onuin5nsib76m4v79fptf4algeq29gbtw4harusvb3oqhjnvsdsst1697sugsyfu1sjnpy84t9lto1vbzxr8vi6du8csprkwycb6vycwqfsmcntp1qduxor6khv6zunyv62i9bni3xtv0yop9fy6yjmr1kojqtxevp3hfzqgoz7zwizzkhwdnrewutnbxcmbjfehh1veafuqlj6vyee1drenh8agj7u5eqrlha6krh5orb6ty1djd29oramfj94l0k1y0kxlgo99tugtvwcwvyxswwqi0n55xn0fgazogmrgfxcl5ifadpumh0mdww2otludznmdd0xq2aal6f2dtq3l4x2oki48z6novqjol56a5d5q2b0mvr2nq6p11e6oyavo9',
                filename: 'mn1j0y9i7u6nmx07v16yf4paf7phcg31i69ifd5uzlqczihzfjtbxsmwb2mszhxd8ylvuc555zjs2641rmj0alxvsh7hixdx2b97jg64gzo2393mxh9otguz6wd0xhkjrbvnfqsodph1ew4vb7gfj1wj1ssgu8qv8z2bope6iii4w5pi2ukuxkbe4z7o5b2n3oc7cb4o8ew148jz1c3p8fm64fwsof1xk7iieyxc26fhfe89vktz8v8el6pg8r0',
                url: null,
                mime: '1os5borkwhdrw3keno4r985yva2abxa92i9htxnmsg94w96spq',
                extension: 'hlzlpzqh3we9iw73dtfse4uxp213yfz3rn7p3z5xeih74f6360',
                size: 2628584825,
                width: 311434,
                height: 200584,
                libraryId: 'a4865bcd-6580-40c9-9137-bbcf1b39c8bc',
                libraryFilename: 'fxmqxyy04xkv1v80yahqea4iqvlgzz6uxnrh6tylol5atpuyn0zq58hn9zq4x9xdn1m0o0t6kamz2j6lxjkh24swws3bmveyg7vtucf606klk5c5jkfokml3tckjrbx24nykkpsps81cuel0uilf7vodm5wfhyhyw94u8dupppel3xcvdvwlk4c264vuflbvdv081zejcfc0glhlhsc7ucigpn6p9n2fpesf7kkpa0n4fvgxr3f4pbm33o1ooxg',
                data: {"foo":"ymG|H#hRC3","bar":".):]&o=4^L","bike":"l7cj,/VMQp","a":"\\>_`=|'aqa","b":"/m[^nM&A(O","name":49127,"prop":30726},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b6fed0f1-0a1c-46a8-b048-be88306145b2',
                attachableModel: 'cz0en1ndyg3j1kqmymwled92rjwtar8i701uxjtxh9b39xof7e1vna02xd2zt3z41brt3jdnoma',
                attachableId: '213af65c-e004-49c9-ad1d-c949dcea1755',
                familyId: '27b27d0e-c635-4fb4-a29b-4529a6fd1cda',
                sort: 606173,
                alt: 'h3pzkiwmqa0i30iknkvjsh24cat4gx5j3jl9vq59ujzgfjakeozy2ilijzvn0t0d35in11mr2yxfaegifwtejscibfaomo9u8ci7hcm8zg34f0x24hoznqjcd1nvp1ht8s7g3ejvrq0obfh140dovc8w4w7iql2ej7figggx0rq1jt6kgkr13evl9wsxhdajefbp6iqn33w1uyemribtlp7xrkw5b2j0mosado0df3g4w2z45282peccx7dv7z4',
                title: 's1qqn7z1d3t9rj7kqf0ms17e0ykvz5jnmuo1mjtrwvy5v90tws8yk8b0d9i58lkjnyagwvvmkto13gck1jke3fi6t9xf95ezq49j0zcn1382opqi7f9kp9g4rcbu9whz0r6r1ddggybg4phbvoh98g85jmyt4ak7iu9rk0303sutlooyd2r9ribgwlz6ygg4xjjdrlxz5mpz1s9g0yjl91qk7gmiwj35gdlk18hf2a51y2us825w303al6lb1fg',
                description: 'Ea eos beatae eum et optio eos. Vel voluptatum sunt occaecati et delectus. Tempore perferendis deleniti nisi. Repellat et officia iure repellendus rem ut est nisi. Ex natus aperiam inventore esse dolor est ad. Ea inventore dolor dolorem sapiente omnis occaecati.',
                excerpt: 'Omnis repellendus maiores ut hic dolor tenetur et. Aut possimus qui eos veniam. Ut ipsa minus tempore aut. Quisquam itaque sit reprehenderit sint magni. Accusamus et rerum praesentium error ut recusandae.',
                name: 'ew8b018dmiftozb46e9ndkt76b2jlrjujdwpgilulpjgymqnupc233ybv7740eoctov8s7ht5y10ntfh050dh25l8l19vksro38l0l90vlgiqou0e5we212o0mi6uihyu02a8s1tk4zk7107hgdkdt53gp8v1iv2fr4hxlzajj8vfv38de6a8lbssk9ju6cwcg1g462tue9tgm7udeywl79ms4sgbout5b5ions8420sqvkr1gm0phh34kg0t34',
                pathname: 'ww1qff6u12reala3z04jtudmrsbofmgkece05figihc733pyn1kzlovvmn95kxu23gk6hgmtjlg6yf3pia5u5tgcdkasg3v9t4w2q4m34c7dmlqcaontjh0lxqrxvzi61b9b4qfrj5tdpl52jvj64pk5jt1ct5ed7r800fa54jsx0nrf7242nfi98r5auuh9wio9g20plhto3jujruea4y2y1pift61aejcaxqn406y00t75u2bys8nvhwn9dazva5qkkfo50zt8b8sg79mjcptdcqv5fe2gdjaowonbv4y7vu3ocd9awhwe88qf8kr0cxs0hcx63ih7fql9rhtckifgsdpu3f2twccxch057bvh61ye093mvjn4o81k1krl7l609rnw3bbjx7xauf4wmedbueouexko462z2y1v5atbo0rjztxqs2vtmirhxeqdnoez0i7khglbasig13navyt275vu7j85pybw7qhtgcepq8mvvizy8uwftvzfbi7cg5j8nrga6qc1cnb13ffj2xlknvazic12wj1xpwprlfexndpv59e6ef7uh4vtakduy5swgoqflvl23kolyab7pj2vbtgka35h4z89wk59b6mst415nak4ojowkwth68ld956uvub0404vtpplpqvo8nx34dp3ncdrs71mhy4u9z22fo3ym6hnci7zxcyd2in0hgk67r4hnit83jvl85xc6zsn6j818dy0cxdef7goeqfuvdpdgo832mp1ck19s7se4u64ul2gmj3vcxekrleozsfc0dzy4q02bjqpgeru8mrbd2ymqgyvdyvovcb7049uj5uv9de2i9txwzmsgp8776f0aweykyx8kkmpvdocpt6i3xg6zeudpkizy8std6se29kclawtadtr0gb3efw045mdhxskgemg4ytwwm9s9v58tvqqxh276m6mgmacv3qllt54vyg3mw7si7bxnq2bjeeuc3lljjhaf9qdawyvvjk89swc8hjsasho5eatnavz',
                filename: 'pfux4ft1dsu60dr7yla35zatxa4kva1c2lubu97ooyku1z8ttwjfe6o0tzlr8n5smpstfosrgxnvyq18cyguhyzzn5wd7jmllr6xtbadvs3hn9c2cxbv31n8l08s35pl28ql6f3t20ivokevmpqa4pewv1ydi8g9azb95pjq9xqghtq9dujaqcvxrqj0u03l8rkthu200i26liv5tyzy1qor2mfdxsnj6x6cwi8h9tlbulgve3s1eliio6emd0b',
                url: '3swph1oh5uiucun0w5oltp8kg3bhtfoe3h44yeh1tytofpqodoqbvk469246c6mzpac9400wkh8ndc2v0udekptspx6zimjxaroggzwoo61lmkgwjkrpcff7oub7wx4fc7uyu8fkry95i0m6v3usdx46nt7e2q5prs120csxd98ufwh0wow9d8wqryahhu8v4n2iu4xe5bv4it4jtbbkjitm3f43c59esa3istmaqi907hqzg3qyhy9s37nmxw7f0xt3hrk4fcko8636zygtmshjiqhi3iqnu4f9xpnt92x5zmb5coglgm7cqg8a6djuk1jbpuz16lxl3gymnzvcnzmuc4vivdgwf70kwhp3jytzg3w27n7tg89x8zkvkiq876f8nxvprougd1mfy6xe65fhjhi86ntv4nkmhm8bzhc60lsh62hgm0nu5oqn6hr9x8i67tuayw3b4gsnyep3l56amy7gz1o2ljoxss5daag9xcx15ne2y4ajna1z33jqydek6d5hehalwsdd5mcz1td5eokoa2gx3vda771c4alitietuhgtzjito5zd3wcgy050i2356nszc57ka9itsp0b77276o01nnuehlmownq6oq5mdrvxko7vopjx2k4tna20km2yzjcic8bwuymu6va4izoutf5lwjwmikt0px0zm7w3uhhttuadjkw1hi1cs6azgyou1w28bgpntwl4p45bdml2r9n9xkhy0n9s4cysgnvar9k87wfwe6vk3cw0c4pyguv86zh5zjhk4nirb18d58wrg5hsk4h47wwkygdudd539nyj24sh9dpxmkjxsqnljcv3cq90j017jdkk8q5qqq5pcwcvockjizh9ojw2mfj7a2oqo2n022jccstsx8lo1v0enzxi4qt81bd02eq0s7qufshcwogqa1mfcc1xo48esz55ekp1k1drk331gu9q2qdzovrugu7ibydlp5m98b4bwn9fplztqjr79rjuy42qx84h8ziyo5uoytma',
                mime: null,
                extension: 'ho2fr8jpb1yuphrqe4oprw40e1wnu86ut4yijjdvg4x3xls4iq',
                size: 6293604518,
                width: 427988,
                height: 856106,
                libraryId: '8dc4a652-ce74-45c2-af0d-49d45f4d8286',
                libraryFilename: 'yqenvyk0byt9mqao90dyqa656gtp0l95rqf3yn9slybm91bmkreyvekaeht9f1yp00k2piinb6krxr0j2fhf4pygvev76nlobdmj5a54werj7wu0ltvpzzzpnsxxy0db2hk1ctze917ksenp9fpznsdquxpne7lfn6wwib5v5q6zkgvsvgv792kzqmyknnhkh69vd4g1rv7vd3dhsrt71ap1arik0g1wc5c0dnv15vgd9uac6y508gps3u2sei2',
                data: {"foo":"\\?:O:8;cpn","bar":83584,"bike":12349,"a":"(o=&JBa.-o","b":56993,"name":64309,"prop":"OOysUtJsGx"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ccd69e15-a260-491b-b642-e73a0c6f1fd3',
                attachableModel: 'hbbpx5ttyyghqjmm9ywma8d4ssc0b6s6h9oarxw5smtglgti65xzvntask3y7av7kk6hrt59hv7',
                attachableId: '81464113-9309-41ef-a574-d183578353c8',
                familyId: '0800f59c-bd9c-443e-9822-c30c4013fbbf',
                sort: 254290,
                alt: 'b1ol5xizp87tbpzkjco021jjmkc4lli1muvbart1u6euccyb7whb94n8vyb1hz6iyntkkyipjii3e2yd77zcg541oi57syoucpi36sc2t6wlcwqnhxxpto1qs1lubcadojbyx06ou5s0agypb1zp54caxaxvjwsj0c61pufgi1k677zgft7rd3fseux5sz91vmkarpw5eb0rzabm9n4zeb74hvvj9khembp0x2sccu7lchtnq5r0sf0y1mr1oi3',
                title: 'ctdelx6gfyyrrfs3crp54xm5zrtytt91hu1ldipeypx3trio5vjs2icp8jjb9in8vyzdzs5adoxy4da0zfu0kxr4llu2f32h8z793jkawgawfy7pox4xr5q0945k5h0x5vy0tnun4z7d5hvst398ew572n08agqepssto2v79ws6567ygm8152qrgyoy3ztxt6kh3lbizil2gsnj3nxybec2ytkc76rux33cpwxebdbjjdqlc45hb5c9jxpt7hk',
                description: 'Autem fuga tenetur amet error quis nobis eveniet. Ut quam et eveniet voluptas tenetur. Veritatis temporibus corporis. Exercitationem earum sit sit assumenda fuga ipsam ullam voluptatem officiis.',
                excerpt: 'Dolores et repellat adipisci hic qui. Facilis pariatur ipsam. Eligendi et numquam aut et in in et animi. Quibusdam exercitationem porro qui iste ut consequuntur nemo.',
                name: 'ibjhz7ox97gornm5l8dbk4de766hamyg9gzb8ke9d36j3b6ugzqcnpriwirjn6u8b0akizexyzxhmrrjfof8q9c5wb43fyfaci9sn6so5kei13fmq6ck7lkadq9mxptf1fd0k8jqv612cz8cab9po0jppyopsqt586huh28k6npdaoy8eazd2fyitzeumc1gtyo3reho1zoatrpjemracfu39wjeibxu94vkd3nuhe7fm0k7qv90siq4dvsq3w4',
                pathname: 'l8ns6u4rlwd2xbsziim4f8l19o5yqbdog29ckt0oev97rf6wtihp9opqk53m9f9l6p2u4phqegtn6b62ucamx3vaha1hobdp78gkaiq0vmf8nlivo190tmq639u3f9jc3pyeia1lcmxmbtk8ihlnw4w8qp6z25ia3i8yzl6scvfib97xu5ojdwojhxqyncjnkxlteff8f8nsivdode26qjhl5hd805jalzvs1u112qzwi9dxlo5f8huswcxlwbi2aafzlhvimnwqjuyajrxojunli0cyajypqovrjp49nqt3wnsyjobijn18jdrddw4q01976uqbmw7zv6h4ckv2smfdk2n49n7vbbte3vic9ph8vksm4417ypho4ahxgmy9gl0adnk4h3dez8ko6jt58c6cwe62st5znjx7yzrl8tyt22mnry5xfjnhuwopxx45h3gfbjxew4fk950b8dizt89oxyyg4emwzyoqywxiev9a425zb7948p6ei25mmlbbquemphcp9gv2usyhencdoj9bfkc9lbggc4z9kbmjh4lnryh66n9qswgf4fcc32e1vur4q9ru0gsv9tkgrmmm5lahst4y2h7xdgxsu5bys6i4bjeo57c2me7jyyoizqjpndwd2cy0k3s7xpdi91iw87lae1c6s5lmk5xl2n9ts4qlh6ju7mqusw1ishxdihup1vnmdt5puvq07zjj9vs68yfugogp1szs1zu0463v61ozxx8d8icxpkil88fqxp43xqc01pdbck9s3blsk0tllzom6qvi8itclrg9n3el9y930kap74n0dal9mrhyzbfayvvvoze88okneivs6ej0qr6gt2kihn1980uihcnvgug61f1ft6o15vvfemlhxljk29jb99pj4wqgtb3ei2gk58ihwjj9c7qpgae35a89nofqshf7ff4qtwguotik4p0ejbygysykjuz5hoazqh93ghrj692fqz5u3u1s20l14beu02ujm0g4bcwj17t9zqre',
                filename: '7bkqkz1xp3ln8w65h800pfgqt40fjmsaxleth9dm0pp8inp5h780ixnnmc8s7zby7pjlq2hxjwkewmoal796aeksdbdf4monay2zoyldh8zkixes5ezwa3yijxvpxyi1j6rxdca9pngw1xi5if5tvtzyzknghwtnvvrzktuttg9thes1xesrvs00hnlguytt596u627uh22gtlr8t9tuzznp28pf4me0hr1q9wketiv62ov0ee1zojewgqmoodi',
                url: 'yt3fb3ehwu8c00a42kqcz0p4cv6v96x0yszs50o9xctu0cwwe3x5cbtx2vf7tfenj1lgcfyq7fvblcvb14pvw4r2bsz54p401npnnnza4gtecfmmggvlr9umu7prylsbqto6c3xdgpl7yqcn01qi0g072adj1160z1jtw92jbyzixt3864yzs71w9hc9imyx9xjz89t9nqfnx333iqjs9out3n7p6ye8lf7pz6xc0pfjdtdnlyjtfwby1zcjc9x9bgyt9g8t97qzyowbw19mbjrvlcjwqn67atgub41zywqf0xvj6wso1atqn4w37ru4gptrcf6616bolvzvbpg8f1rja06rr31w58jpdifarg49scp94eg87o1sfiq4rbgykz3mn64a3j14bcng0wasaxrk286basxentebzjs46ucpnulwdqnphxhk14hhdd8dg2s0vxpnni00u783ft4n8klay0xnae4jdfaqsey7wxfatkyrq6v0rag3nwlzxsoaarr1ydtrbjdve1z4ipi7c11xh0nq7du0ippc9lt4o37i5iodzmo0viygnw54eppewv2ssz6efj3g2lvr8kvprdkgcc9wphkaa8j2o8nv6r8apb5gbds46mtqcfuygha0d1061rxqqgxuddgiw4kkil2q0v0j1w09ksd6s8k9zz4z6o0bljestdfrtb71w43ofgrb2slq9qls21vl3uzk0lgb3k0n9sn8xfds9hpg7aohcu7xqkwn2fm8g5h684hzn40oojc79pgboujrvqxa3jq7z8hp8i9jmhuumowokysc4b1qf5zkr5a6w0ofrjf0l4konvxyh9hauxt0y2j7onhfzia1vu5ocxsqa6a7ba84lxek3zrgrgk4n6kmqtdatayme88gd5emnorfko57653biwv4piejnhep17ahaaqenkvfflcnh41tcb5z4rmgajyu9ejwt1irbl99d1fflmfypqn9plup0o7favkhpoq5r4nnp8u9qgzg3xoi8n43',
                mime: 'uov1g9r53f04bmdm3hm8q7vcm73j560mapcds4g9wqwvk81cp2',
                extension: 'xm7h38118shpbldvcgh9hq77kfvt4bz7nvty7ubgaoitnyu5rf',
                size: null,
                width: 705918,
                height: 606246,
                libraryId: '5b150c15-4203-46b1-a401-45b03acaad36',
                libraryFilename: 'luk1nil3a8hnt7h5asqsv77ckpxbiprkqbngxswxm4ivzbhe2bzy2zytoy9bivmv4s4luiirr4ldb8a48zq0ojwef58paedhcbqrxj5quood3nhj3euzqb3d7jdxc7nd8tvwq4hj1ovlswem2mkg5vs6bbe4ah67elsd637iy3w1xnvm2waggt0bekciwvjvpz3bt21ng5j7lp0piar24n3dvahoyz5bxwbs50omf097a0x47beq0o3dvhzzmek',
                data: {"foo":"fN,fxgn`-N","bar":"l?m*zELG$.","bike":90108,"a":"5Ad+/wNjZa","b":31017,"name":"oPr+a#\\HS$","prop":41033},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                attachableModel: 'bsxknhz7hbnnnb9un3o97s04vjwotbzaty4zdh3uckya9afgnzgn9e0r4bu6asy8vi5qydqwlp9',
                attachableId: '92bee952-16f6-44fa-a365-23ff3bb089db',
                familyId: '38d31c47-5168-4293-a6bc-35237a54701d',
                sort: 609445,
                alt: '42swf5fdwnqojsxy0k5bfh49480ujex1lsh33xgn0qbv71qgu5gfyukonxjdulrr1sgs9aa2mf18so4icm9qzocemxanbe4w09p6b1xheago0elo6mhgh5cxedto8txka2ibg3b3fgyyzl6he0jqefj3xu6dh36tvryw5akt9dlgz3x7959ze85rfdnehtwm1ld0drxty8gyu385rd26ynt8sravwo2yqfuu0jebjmn6axty9t1mvlz8xig3v43',
                title: 'a5drq6x27muw7aftk5smq8fwi1mijcbfao3ztf99g6udqm5jwykt9j280jjaydtlxdjtem3dqwhaqlg81vqo88tdmf4dfm0iiqy5e5vvfcbi00ulvnmurbaid66wh16680c9jfm1z5gx2d5jlz71fvuok2ozgs9t10ode8hc297trcnp0wg6rn7qhhfd8xoq3il9etcfpo5mjyeua7ygb68knm5wa9idp7mxwnzpkwyi9rgc788mhii28ofnzyy',
                description: 'Dolores consequuntur dolorem doloremque est. Voluptate non quae. Et reiciendis modi. Neque aspernatur adipisci aut et assumenda. Voluptatem odio sit omnis aut quod doloribus consequatur.',
                excerpt: 'Commodi voluptates laborum expedita nostrum aspernatur perspiciatis quis temporibus dolores. Quod qui sint qui sunt commodi. Porro quidem nesciunt vel. Asperiores sunt impedit recusandae facilis.',
                name: 'dkgyf7dcxsnunyrf30ir97jsrsb5q589hoqsk1izdc4vtkmgp7yochx34o7reutgpr6rundnzdubrylwrlhukf0k8zigxk5ocgb9oqd5tjf53cq9hit4eriglfridlc1cjebx8cky66eefga7cirqiapgr34le0k9dbs21tjjktym0vgbcm6b3pwzwfehyqe0lotdcd9kw86zo039wkt1te2icypny69aja189th3ull17lil8x8wwdvbxq3pux',
                pathname: 'kzvuav438dtxoysrkbnczyscedy7vorv3kfm3kor2teq97655yob23j5ubuhca9zuz9tjy3vz7jo16fya30wm64m7ztj8f0esprc0xzpql0qlvvfrb8kd6jh0sogqbg8huhssqno12uy4cse5a0ttov5z3kr5aiy41o3i70emj01dd7mxyquxtyr6xsml86ilgtcyra2izhqju4s3io0hnpatusc2h04kpr24j8f18a9xkni3hyzls7rxvk71dnsp96rzjlup33bx6uvbg30bpepz4k1lpekaflxk9u7u98oleey9gasiuhb4hufuyztgm8sfc2knumgbmeri5fjrwl8vtb0cbxoce7pazv96qnga7czdalgz4zllasxr7d0sc2hlyh8l7a48siq1q9kpaijqehd7tkbqqcdhbgef2hkek8bu8ihigza2osju09p0wew61729feq6m3cxxt8a68mkss111r6ky2bust32hvbpmap4yptge76oeropz9wuj95s0lo8xu2tsfz1q6ylk3uyfqm8rtjluooibojzqysli15f22g6hd818zutmcxv9nsly2yjw6vnx3ejsbmajpbd36hfrg32kgedh66ue7qhj9xqmzywpdzdmhhhral3vo4p436h5dr303pqlbol4wnaja6y7zlxoerx01inax0m8x8vy2z9pnlbj5ljm4d1dptlhovql6q5lmzjfjuoa8gjcmyuzkgyvgc0d1dgjaiovd9amxp0f50zi8s07ydjd0kcso3heknl20ns0nfhavtbyox1l3sxfcjw70ysfptxd569s2j43gx47xax9o3w5dmpfb0a2bz94e7b3sn27dk7uero7su1aveb2weef6uqp8ag1n82bn8khvq63fsie93jsuxgays5o5p2sx07kv42llbn6utoapn8cknhfa409sqob2ewau0gludq4a5acmj6pkl97mxti50mf078tuia9oahkbntvcf5ijm121z7infud6bxp8qo29csqvf',
                filename: 'e253zhv5bu8llwodzi09fe2b9y9ev6kl6er5k2f28gqmbaqb1zvw1rwkeix3078qqgod85ytkubdtapv4kamsr8otifgp8q2g84vxymlmjdn6jz25y2x4wlxorvptcwcvwx4alqz5z9j69vzjdoatecl74ulqswtie2t4isyqsg0lboimk500uel21lw6ysqg5hpogi6ke6wg70u9zhv2r0sbn1n7hfiezw5rrmobni8ay5wf9x6gu4g7giiq6f',
                url: 'nbpca40fjrv2oyu5hlmeoyikay8c5dksi846cf76hkluw7huf3lnkovgkfc0uhrm8y797kvpkctu2lp7u6lineouaqp5h7ruc0rp45qalbb34smrezjun6g1sg4xhqabn3be9r2uqrpkdthulquyuaanby8f31t1a460iosvcicu5y3e6tgdhpbpqau1fzt751f3rx9v6vn6xlmpldy524777tf8w4ltgrc56yhyx3j40tkjxmpcrwmb9kqstxbrzwtuofwmjpk9td3wbx0qd0vndv0fkxlxv7qmvgr4cnam59xvolappcqx3wkeyhopavr5nsvoe4hblw6gyq751ykqcamzh8cfd99awkjr7kdni7xsiqv10iv0l7n27jyol7p71fziambx33unfysitl6c67b4egrpuv25ddjzrymz332yh2rqti78ywcka7uw0navqu83av0n53jf9fuo1xkjf7trjhxlb56mxv9wim660qzd35ky203owf98bp3er5tmkiy1rxlwfymouvbbyckqf6pu2nozddiyv012nd33luyen1plv19200rvvohrfzmr4flyxeot0e807rk5qlnpopuk3j5xo6jc9yrmu9cztgcuw31do6ehx304g0uir108iq6tc1ox8948x8s10zts7y8wid0op0qnqfqcc8ro114amy41fbh0e8xriiby7luq2xe2qenrd3ystl59hmf7da90wxemcrbl5w3wend13p6ipa9tihffq9a1e08487rohxir9oy8wr7jiq782410cg7sx09hk9ysi3wf952at1uup4rygejw774ptfzbe1ag48ubxklltptalw5ek40he8s126bd1xbd28rb2fh8gb2m6p5qsglns03lz39jgof5j0pg0rqigzq5a3240de6kpufthpesj9uhcvjxophklsgyudiyqun06f2j4ey61ineh2shg651yl1v8qdmrx7vyyt4ljfwis8ka5acul1iljtq1rhnpmc3vr92lok',
                mime: 'qfrfgbqf5juqdg5nztvo4gukszncktrge9aewsb8xftnclsq9h',
                extension: 'c4lzvfftkp721rr6lh54gzb89pvtrbwm8v0g0krjhjl0zxt3sr',
                size: 6634244767,
                width: 490996,
                height: 793036,
                libraryId: 'f56767f0-e729-4381-a8a8-08f3590b0abe',
                libraryFilename: 'ql46ljflbtmm0xzfo2jnlyg128sfjauuygpjgi2can2k6ivpfhf7v2ectsqqqnq3yi6e5e6i1ws6xgzbc998xxi6d86m1l2mvg0ky97t6tph6v12w19saj2xfvx99dnu2lkas2saiyzwsx8kzdiihsufflorcpcsvhccoy57us5bwea8nhi4z5v6losmmvhpjtgjxsmlx2auvca3hx3cbnjvuwmsejhr1c50rhi1t33w77yvuj8jthxrxskto4c',
                data: {"foo":34268,"bar":67292,"bike":"g\\.x&4h0*i","a":"mfYON#K_=)","b":",|I#x(K^:X","name":"XD|R6c}a*m","prop":87894},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9fc33785-7d76-4867-a894-e9b43e151a7c',
                attachableId: '5c472f41-d814-4e66-b582-8bab5bc3c509',
                familyId: 'f3046c97-d5e4-483b-a6b0-d3c445f8af02',
                sort: 590477,
                alt: '8qq9m9fryebc4mwjbcgwcbh6q2qld143t6jgvt0hws0n5s7ovh9022j4iuvq5ef7i4vsko7irsty16jvqsx58zx8mkmhhajgiba40hjx7it4e98vxemxct19cziou77wyivkmlut1y4j0zgg8kzgl8ty0zinmnh4taeqf6fp05vszyq7o7sqz47mojtjj0idi89ugb9dkpjbuc8tz8rm4redvdow93mi10mblr5qygudaiz0d4bdc5dtiegy649',
                title: 'qmmhsbm57szodq418lwt0sgadxi4cbm5xn1v8oiaimzee6spcycmwpmnwvch8skne15di1svi4334z2jpmmt480t6z9jwtrh46ewq3yohclokqprzv9nnxgciiotmao1941w3bpf87rfreltkjhcts37r6ody5l3t55z1665utuiu6tq9cmsdlhu2uztv1om60t3ngb0b1gz2o8gav1bx8aajq519rn0cfwdle3pigrs47g9iy9a3pd3oquvan9',
                description: 'Asperiores non voluptatem et. Et ducimus magni modi molestiae dignissimos voluptatem distinctio dignissimos. Rerum eius mollitia libero. Quasi autem et veniam quo in. Cupiditate at rerum dolorem hic nam iusto repellendus voluptatem.',
                excerpt: 'Nostrum impedit ipsum consequatur qui ipsam culpa ea totam architecto. Magnam eos ipsa omnis fuga repellendus fugit explicabo tenetur atque. Sed voluptate velit quis veritatis voluptates. Possimus eum facere dolorum dolores quasi autem quis sapiente beatae.',
                name: 'bdv47u01n9bripxq0sznyys426asqh9rjpcvz55q9plc5cqindy9b3mso96e3sz6pj3aqb2bzgsnd749j6e1c22uzhunbr7xl4dw6urogq4mkowmpqu0hzznmus0ja3cisoo6x0513aqwqfh0s3jez6vrxvfltc3z2dxrh6vifzmsj1yrl2biiec315a2xwd5g5qw59yp8diyopuha9fej9pmpwyyf4sfnd7nfctc6w1e64xvog4e7lnex0xi5h',
                pathname: 'npkl33ynpez2edi370cw6fqrrujhicu17hwiyqmlhw2se3nzn98uo7g6jesynuwo58iduxmjdavboqqbket3d6tn3nvg6tsuu7qhwpbehb2citdgm78my2gui025q6f1nh09e2c3y0ammq4eekicueygrobhb4a0kfmv2bjuqowryk8djxwa2s3oijsiev0m1w6147fm0ihfw77slueesvs2ybqvql3k733kiohghyi69gzdtd5gd02jra8z2e93j6gk6mjhtzs3fpsfgpl57goudwpqygn50b61un4u6bea3h7i5jeskdjga6jsbu1vlocpg76hg3k07zp3jmq7ngwaw92idikbxw3e6wqlyjyj16rw03iqnxgmgfomplwzddyb3j3v9um2qk2bxg2513z9ols3izc4hi9eeb70vwvlr91ft7fvvncxi3c1xxveo9w1x65zilwvknvl2tpp54tbhtntkvhoauu3q9tdrrng9izmbnfuty5map2ii9dhpc8siicixa79jxsogvvm593zmi3n5jo97trbt21ojrhyqgng5rlb4xmmr8evz2q1qqbselbgzwp9vaq1pwvimqbnvrliq4idbk4x4jfcgt082l56dwyjj5m3z0cahfwnk9g7jfmqrx1wrzazhtw9oue4nbxdnptg77d5fdfo3pg17erstbu5lzkxlmqd7nwgp8op67fpo4g6n9qlvk7gm9hx9zf6ym9gt75dohc3w9nyfd16hk8ybwh2vqj27ybkpkby9k4gaga1vx4hnqdnrhr6ipq1inwzkadtvzuo0jb2b17ki50lki1x7gj35s3l7fmps4xf3k283xclavnbdbzwajcxx7gatwk6w6doiqj1r2ictqejionyqkhn3cvw1mm5d6ivhqq8e24r64bimkou9647i0cqffth7vqewe97xrkgguchza3wsfuoblcbez9qct3f0flvybt6sao4gm2vlo1two75sj922oj0nyv7hsur0mjbdr9zr1ql05cd',
                filename: 'si4dxi1uxmd4yuo5a0ri5mbqv5wxw5tef7jdv09p9h2fmdj448qlh2o1w8grqks2s9w2po2umjr00q4x9s6oq01ea3ht8jznw4rwd2yxezaacw9s7fl7ptzw1n8ypf06me7204htisce36fip2ev7yyfg7krdbgitfetsdejqd7j5fchditpwwratdskbx5unmmc4cxdqqt6jcokr9ghh7f02jrnhjvs8r0swwr1jrbh07ou8hess5s9463dj7q',
                url: 'iy56twv2rxd2aemsxd0b5508wkqnj9wzp9xrjq4192a0bfdk6xkld24anfs4pltwzw1s5fra5u5npfv7n0bbhqf964hr159o6kymbzl6rtxf818gxm8jyiqfa4brv28pqtbbn7vtlgjtmhqpl4eevy62gy3zstkj6sma37ljarbnlh3lefait89pkefahjhsl3sxvml0i0rcje4901s5v9dg90c3exgf3c9fjg02f1nosm0qzuzmfowv5oao6fv6qycny0cg6w9mdxssysdd791hmxbyb0e8kakryzus3ti59ajh9ypxtdg0extpryctxbbgjq9cpq86m0zs2yzdqr05p30whg2knfiqxf8sqe57h54zjyz8jrrjdfpu33ik4018gjiyn2we5rppizoodzda0peay0lhdcvk6wqk34tgtusodsupiqmfpaioa9cqvghkm0wr3dt3xsi79zr74rhejr8mcz9z44s7t82o3zqfrrbb6sc1qj8ipihgk10rtg3eql0y6n6vleai4z7blijtg9txw47pc8t9s4m7zrq0mj2daqwojj16hamz0ng300s4ll52vnnidzmuq3n0w52r62gyqzehi7hw6sp7p3tudu4qp2q882kjrj8omtis6oae3w42qrv2h2qdi0hut7h088fvxyxpwb37adops899men0mmas0bo24nboqy4ki33h5ev9qspg0lwzytbkgi3o0fze9r0zzpvs530f802h2f7jj6zyj8154idjz7icvy3cuajxlhpk68g2dbdi4jraxpu933laxihkiozbopaudxos0x2mxenevc1rpgm89brqf2uq43d4lk1x7ipx3f57hzadjn6qgldqwbwf394lqlgw9vyrs34a7erm52e5x0a5dimyz6y613953xsx7jfviw8peelhxaf1qkspb4b8xgckukoeosukqse7nsz9fosutjw5xo4lev65nqg6oqehcuygup71ittc9uvmnc968emhoz2ockdohzqjj89d',
                mime: 'zc786di3f3cam38750lig482h83hbty1b5bxef6j4u1eo3447m',
                extension: '70swkjucavqrjxkf1fgbenql0ht3s2ebl4lmidkl3aafy93pmq',
                size: 7891077264,
                width: 718974,
                height: 799278,
                libraryId: 'ff5e0e03-c7b2-42d9-963a-3e6378e573b3',
                libraryFilename: 'v2iavv8bav7ii5r1ien8o68tqnm45sfcri027mlkaveys20gree52wo2ejn6virgyxo9ecvbgbqy47h4jw7jh3er7jvfymwznoc3159dd4n91a4pbzfrim41th3e7t8ilmfnbpfj6kukogpp2041hx4qj1msrn1c8rqzip75ndeg98feuomabei24lsxzjn6qv80w4xswyhvskn96q2f99im1o8vvw3bqcf6exf98f4h1dxdapkbfw2py6xdlf7',
                data: {"foo":"U'@+M6$7'c","bar":54736,"bike":99669,"a":"m7-T@%D_Co","b":51281,"name":"Kwe'h5>f'+","prop":"I^%tf4{xc^"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6ec2f123-ddf9-4c39-b4a5-638f7797c3c3',
                attachableModel: 'anmksoyl4v4zegpme5c9bsz7kckh377w6uv0kljiokvmjq82krka5xebwx022gxzv1eekkl62ew',
                familyId: '42f15e1c-f79f-47d4-a103-2ed82443e2ff',
                sort: 945619,
                alt: '6zjctw7unecuyyzhgmzsu28vwm41k6fvgbchs0lvo9b7175nvtzrtib4e0s9u432wa8zv7n3hxwa5fv5c5tj0aie3s5uy1c9am39v0pfn6bxfg4eurxacuc8wbpvcstiakpvqsjxwx9so07ya56umb4pm8c4ndu79q20qggtgu8tsh9kxjpuil829bprk2jt94335mwn4k2lalsxh1yexmzgh34m01lffkelmjltqhl4rma50q3t75x2dv9nq56',
                title: 'ax358acsv2d2qs82fktd5bkxrskt3qg5l0npxoazv9pu5q8acxetpev1lcb6fwznnvwn6lsv2tij6bn51wuqkkh060aqt9cpe8w9srqq057ga9p8u3r7h5x5ofo5rvev7dpua9hy4nvsdppwbuxicobya0h8tkjia04dsquwxu3ve64mqorvb1m811r699mxtddtfk9mgh32oj9r6oo8pdbih1rmdkqk6yi5bgq112lupkrsdelogmoe6thf10f',
                description: 'Sit aliquam nesciunt quia voluptatum voluptas veritatis incidunt. Nulla maiores quis voluptate atque illum. Quo eaque incidunt quia asperiores. Sit autem dicta dolor. Voluptatem molestiae et consequatur id animi incidunt.',
                excerpt: 'Incidunt ipsam nemo aperiam est aperiam. Aspernatur ex veniam est et est quaerat. Mollitia illum ullam a accusantium facilis error ad esse et.',
                name: '2t8nnpom29dzzizjt1ua7ywbgb4gp0dpw48ro2po2wn54wqtnnb1fbxl1nccfp3e96yu281kvznjkk9tnvm9xddt982dtt574iyfi5wc1q7a5q8ynvydutdnm8in599pmzlzl0d0vpev87u4vmlbae0tjdsa5a4x7vdy6ibm6g1nyprrf53dy5wvzdh53jibtbxt0vgjzj98jpvd5qnpm1vhkyd9qco2vodk8cr66bjexcu5ee9zvue60kb1hpe',
                pathname: 'ylkgzxh1soz30v7cyz7ozz7rnvudswoexbwq5r8wa033gf9weqdu5g7u74n3yxshbhq9vbytylt81zvjs2zkmxe2dw7l6cxau8anqiw8ef7c1ato1nn0m25gmrnu7pb4zuna890lolpt695uaqz6us5gaszboc3m9wwrb9vualxvk2deaiyzf6o7keg97v2s7epn12yivik4j1mg7rlcrtzqmeeq75w2kke4ywywoadov7cummvth9yr5isdkrqxpqrf4k2y3rdbpodg5icbqoiv3g7sadh45511o7srroj1nkff7fz6rue9fgwp79v7fgnhhb24k3kapkmbf52iwbdp1447z3dptid62kyrjja9sdyyk61pw5y3oogsww4ui2b8vha2adh7tpohlo03qd17fbptpa07787ma4qjaxdj3ucfx7ply0ze503dp62nbvigk9x3oe9x5xll1e38yk8bs9nshui53fy7isgtshaqksuhblkgv1hdjys07zeczg0spe00u8gba1dh7wzgnu82d10x1k5lebjzn1n965ugk3cm523redle12qe3qa1wdka678uyvakamomawmd8ithrcu3rze1citcvt01mjebm4r3g36fcdeha8tm3qqxp83dzq6jk9s68ou484wix85krfc4evyk9p5z5byzu6nubzqdjar9ign7q49c2a5nh18qlvtpooegqfvk07lzetkbqovodjkpvt3y4etr2pg9g51zej1b6uii7k0j694fvjqprokbv2srn16rqppnkddjirekmrjr3x506ngt1u04w7xbs9gprm7gtac0y7e4aioz08cwqbbssy3lx92v70c1ydytpfrdbpvnjdu7oyb51wvac2t8lg424tpxjp0hisujk1rwh5n12uxkrjum3k0pkmudq6cr8utrfyj6mmfi5slsy5f74fuxlfdo2gecr8o02i3teefb27k8kf3ewpdm4jwy288th5fsm9ryjd9r1s0518szyjtlfzd2lh91',
                filename: 'wcpx6uvo13kk0f7erm3kzvuma10r6fxyyyqmgr7jpws12vewn93gcvu9ggy8wwlg0ttfrqpgtyu0i5epqmu52nrgzcfd30tafud13thz07tdami8hhkk0gozi6ropdt6vxgzjmb6kno7ekyc5tay0ph5l14ry39aa15ooenng4di8m21duwm996lpgnohppa6q48zv37jztilsv14h62zr8lkrcbppsuo7rovfi1jud4rg0wm27tixh5vh7uvjg',
                url: 'lfromsuwgrgdynvbx83brsndvkoc08nka65yz5at3kev26j9cgl8xw0qetktc3mc33aogkz1zpjh8dlxkx4b6wrhi0wnt7i99m9ia03ebkwgpeaw9fowwamph8iiy03x7y49233s3m4cv14yr4950ay68sxhmkyiu0v2nkyqhd5kchzdmgeapwki5a39qe8yvyhh22zsrxcg7akjl1y0ljjrx31thbkicqw4m5geeffvs2g6tlcxt8vk1wqbqbvsamkwiob1tl8lscxab276md3nbrdj88esodotztrj7q6pb44s46kxhq97pehon57zb7sedg2g85jnl964ng9c0b9od9foiue8rlfqcx437k0nzz1exq2x23gakylxgft6x5vvqmqg0ckuprc3wqp3vn0aud8d9e9sm7mw55vpmpprv3l5fsnzr72j4eq54iorfha8jes66ee0r5bz3j21wtd8mw1baqw79xh8hvif1khaxflehjm5675qhwa5qtj3zgidb2q66pkytgac73qf1dynrh08yjvnbfga876gf92168u46e67d65upydmrvaz8ihkhdjwishbmaoh6f9b7pgv6h494yh8ohujidpxyx0jreivjpwg591lwhtl13k2eoge7sygfdvrpad669fxyfk7k7n3bthbf3clwh10up0m5dbxeiv8xi10v2ate2lho4p6i2j1m3ny932vvcoqzkacmmva42mcsz87t7g2dt20w4c42e2u2k21rt6b5jdnu2q3k28x2s1ohe8eiiugk9v9m0va7ondeehcquf059x80eoqmr1c5tl23n3h6an7tdk3dy7iyb0hy8hqhe11krdi8230aqep7p1gz2xqo8liay1hbrndm06dyo688wr48gig86ynxj6vls9yz7847sanwyu61u5islvtz9va87sc25diwnuhghzjwzhplnb3tc67bmwer4s59lymmxkku6373q05qq5mlixu5o4so1v4ahtckrq0jfr2n86px7jh',
                mime: 'w8gp6f77e9etf0gpahtgh5ehivahf2z7of45r2svf7z36am0t6',
                extension: '2ffimi7vbz8m4mcgo3sju7xnwh9fw55dlpo7a6cwly06ee9p7m',
                size: 6082814950,
                width: 986312,
                height: 867843,
                libraryId: 'c48b8f64-c730-4e48-ac7a-d8a95a87fab0',
                libraryFilename: 'qv9s2ogx804qus0itb8xo7y69ddzf1ltib0az7qle6b9sqp5mn1x3cvjqwj4ysfpsqcj6mgj9zr93g9dh7o080zdgax809nefroqzgqv4ikd2i7i27d70ttsf8pf64hk7mbhuu03vno45tat8m2gn7320vj3sy8kbn1putaf0upodniushp16vs7883n38iu4pnyy5iu3vinefym64d9mv0dhocgys6d2gwcsd7x1f1nznne0rbwbiajh9qm3mx',
                data: {"foo":34429,"bar":"diTrqFRL+(","bike":",)|hZ;I|$%","a":"qz[|-s>W)p","b":"7)EUBDN+a0","name":"Dbk+ovGK/8","prop":";``f4B*ZxM"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0e446b92-516e-4709-977f-568e1f9d10c5',
                attachableModel: '9zr5l0c54qw3eszfmx8x39n4ftnh9qzgetzz3cgvy5bxlbq3qef26mc38qycjwewwcsa8xm5jqq',
                attachableId: '176eaa29-ce33-4f41-ac13-6d4ed5de22ef',
                familyId: '3cc42a84-90d3-410d-8be5-c09af480b4fa',
                sort: 669304,
                alt: 'ua0mknmop0p6jj2efkz0n1am8wg1javwjy11bqzqgue5un3fhrrmb6oa2iphi6s6582omhu7j3l25neijdw0h8zpdsky5u7antkhjmzuodc7t2gfyh2a7jvndxfjixkjax7u7gjo7jen5rjt2wega0y00relihcc45m1avvauybwp6uwrrlt47ymqxqifi6z1pu097zsy3iea6okflka1iqaqsooslr5oq1kmrdf0p4k8q9iyeeeueu4w5txxmt',
                title: 'qyqhrttou0oonl7sq7yomqnb6dftime5shzhz4dz6xmv0a1ov2z4d2206m0x7rx47era446af5tp380reud8515eotoo0uiyu1llpb0lcqcx7dgtcol6wc3ihtfo6406fls45d8f9elr3nixo70anjju3cxat200ugjcuhhy92qow2ti2e73biv8gpznp0rdy8cdbufa12gw5i4y96l3qi95r89kfdeu3aofptcxldjuwjocen2nqt3dvphei9i',
                description: 'Nostrum rerum voluptate impedit dolorum minima dolor totam inventore quidem. Ullam est iure. Ut corporis veniam et optio rerum et dolorem omnis minima. Vel pariatur quae delectus delectus quis ut. Voluptas soluta velit molestiae. Corrupti tempore qui quia soluta cupiditate quisquam a qui.',
                excerpt: 'Consequatur officiis quia unde ducimus voluptates atque ea. Explicabo consequatur facere nesciunt minus. Cupiditate temporibus aut autem odio ratione. Consequuntur odit cum ipsa natus ad libero iusto corrupti. Quod ea rerum quis voluptatem voluptas fuga voluptas fugit consequuntur. Voluptas vel quisquam molestias fugiat quasi eveniet placeat et occaecati.',
                pathname: 's3htiqabkfjsv9fv1o6ks8vg4uwr0x4hek2g59n44nog6eotbsgss9rid6f5je5npqlb8zj6wxs61cohdah4t5jc58yr79b6bm01fwa9g9a2236qf654jn0007zom3pnedx41ilru9rdmy7e1q1bf65392fw3y6at5vgx0zpgeye8b1m9kcs7ql4qmkgsr0y9nudpbv0f0f6u4k6ruv4qre0gqc86zlwksyx52wd2wk7tm3t7p65zyogrjbmkcgf6vw7osdqqaq5jzwqckw05y0dvt0pt8khurdj8tnrdzwxqumccg17rfjpulxil1mwgupam8gwpgcju7yhvgvsk0o8lyhem6b6qak9nfkzhoi5nbormx206w7g9nctdh2gaqjgbpx7wpdp6fj06z1mobzp054685u4j19qmh2jse7orbp0i7pn8yghplt95ioaiawrsczvnftx4ymchzhnl0u0ped0euefvrn4dyk394k5hpdwrp6qu4rlvk58f5rq6qnr6nyur0yay7fcatm64zbck6glb4mkvxj48m8adw1px4j0nwdwh1qs7un7zj8gg17a0u3ec2qxwygn0sh0l1dronwxvplqq7vxi30e3wibadsdxo4nzjtywa8i9kjnxioilufr2wurxb77re03072t597unfdnw3q5e7wv9k77nx21iv6jnkghs2weab7zv5kgaz1mpilh88omnm988oex3ksfaiwsluy8te7upb1ea1n18tneu4ouych24y27nutel4aqp5v72f3zy163vry1moddtcquxvjfcabj01odo3yn6jqhxra83foe442yvu3wed8c064n3cza9lw56aq659v3jugtmy27nou2c39vnouky5h6onuxfugv3ea4gfh9jm8t2ywv517hge1xx65ig2hju1bkwh33kks7yea7es4d82g4maa3sglyq18j31p8eg3i2d9sxbdjgmxmaiebml6rmzn3qfqsyap6rto17o4o9cjbmp4ktofk16c4',
                filename: '8qrtbx1i3pu0112frhxfnhpk2wjwcx44tr5ud8qm0up9x48ptcaaqp29t9hxrrujzgjuk2j2nmpi6kp0x5i3vgsruhg8mgoune8l3drvankbw032rz923lau3xzauhhtq7ynyzu1rovgq6khixtxn46xeusl113s099uvdefhihyox57c0mwbugyiyeuix3is40t0rlcpzhq95sd3x0i2dzahmaa661lmj3xq815f22yh26wt2q82c0rn5znjdq',
                url: 'i4zbhv8cpyv3mfi8d4v2f1bm7dam5wcwxr1xj4oyev1blfuz9c2wjaisp4c5jtrnjygdz18i7bjuzew06sj1upkn3zfe2gi0c68hq5l7nt53kn1r2106u6q59pcstvgy4s4cv15zzjf9qlf01l8v7m5n0y127z0dnkq6o53byrck2ctst8mlfyvaekvi5e5eqg6kmcet2ra3epg7v1s9zy88lwa3k40vxrun9aizkgz7sczmzbzmdtjghf2t2c6j3dnr5j114zwzd4uvyighfnb49nb1sch08ch5w5hujbrclnx9rj43qszmmpppiizzmm6x07ctcc1mnu911drhqtphu7r9vv5vonc8jwyqqiaqtg31ne3lpna8ojpxmqty840bt0kjk6k1j4fs3u5n02umdhs018i0p26stsm9vc77khqyx2jxpd3g8h17yg4n85mp147rhho6t3czjrzj7bhtkbckzpxrp0m7iv0x4zw98b6sgmt6h6ifbfx39yqiwfxwwweahifx0jk0j9192z5468ugmrzhe9abvfmy292yab4zvkffqo7ww3y2q7kctte5j18c1a1dpjnwddt5ni2f5uk7ypplhbypknscnn7mnouvxfd8a9ucz326k89k3z3tsihbgxqt8o4nuxr82nauxd7uh9zcpdbrx0ykspg6gslqf5x28fynes34uqlftqlt2abisniwev47v66euw47t5lzay1sa9hzu1xpdf636vm9f46oofzk0b2xlwttjoc7u9ku165c36b0uw5q7vkjwvnedw2el87guuidfwndyqu5k96pd10clojj6wdzg73rc9te2cpnwq5cgo8mhy9p3s6mam4ovmqbj0buvxzrme8cjswi71793ahdwn2r8pnhael1hh5ppb2cu9gx7ww33e0m49j0e6qqj16tghtlu8n5orp4euktxov7a0f9814x4fgnd0muhaa3t4tguqyi16qtd91biklvrhbei87aoux3910fpentlax3braw',
                mime: '3i7gx6kf3p921smmfi9uz04px9bfwtwmsn4l55qvu70g7iha1a',
                extension: '4mjbdf00mdeepywiwntw6lfhfxteh1c0wzqdn3oi9nieirixoq',
                size: 5344577789,
                width: 689701,
                height: 413909,
                libraryId: 'ffb23ce2-e0d9-46ab-af61-4ece24728985',
                libraryFilename: 'o51kxomrwch6nddoilrw6w1mymnr2pzt30pi88l0f2j9kpu6laajpftstc9fupw541lzgo3xirr82ge179flejgueigz93aecxk7klqpgxr13kvz2uthsvh6w9wjhajwou7o6frzv47jcgrl22o3updj4v11p8u1u5xtz2f0rv9d7vwjb62ivivrayp60mutfi3nwenkx8xqey88mwr0r4yy2szc8s313pidfhgai26jit7k46glcg458gt3vng',
                data: {"foo":"HWbUOh/^Yc","bar":39428,"bike":"j(!x_{n_9A","a":"H2x_y}pcA0","b":45820,"name":"l[<o`0yoF8","prop":"3=_8*$Pz78"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1a26dbf7-f115-458b-b3a9-a0563b1b56ad',
                attachableModel: '3jz1ptmrheve674gia908igh072ahyuc6xml8n3p4cdpcr5tn2ht3kknnx8qnytcf88ppf4jez7',
                attachableId: 'e30b7956-d0cf-4ed1-b99f-5b8802342e1b',
                familyId: '66923931-d393-462f-bbb9-9fe80ccf68d3',
                sort: 685490,
                alt: 'var6b2j1mq3d58sy3tbq7sdp6c22pe1uvyo7myz4ruu2zizv8tp5wp5pmvlar4db0t3bu32sft91noznweronctcrawrjd12zxubb4o0tk05h3zjztgp34iuu4gcdsuh1pznk051vbbh7xv3pvx29uzo6q0dl7gu2q4h4hw5obdjzrp8lhfwen489289dox3p25yewx6ctebv5t7rk6p509s8vebdnxpi8xegx6g1i87err1oykpuumvm7fxbf4',
                title: '4v06it2sm4h1dy46y95q1ja7js859ee4z6waqjx3ukntz3bjmnpl1jorupa4ov07281e6z723pu5ai9c53eqfumtk4q5li05kco1tvmcojm4y4uljdp5tcuxjpe7oaqstxkzumo1xqw4h75za9zj5aqitohgn6kl30c5kytub6ulqr7svt6df5fclephcdbfgwukszcevnyl4ft88621tj5eenb70jm2qj47wdf0lxx8w7bj8rh4m1mch75vb19',
                description: 'Minus pariatur ea aperiam aut quidem recusandae nulla. Neque placeat omnis beatae qui quae voluptas aut eos. Ex cum inventore aliquam occaecati accusamus.',
                excerpt: 'Asperiores et fugiat. Et non corporis aspernatur esse. Et quidem ex consectetur. Est exercitationem quod ea facilis sed explicabo voluptate sed. Odit maxime ab ea voluptates ea optio. Ut sed maiores.',
                name: '6zkhr0sbzbn860tav16b3w0txl8xcl6onv2kwpc7u1qdv2gyjqq1tz5rs4x613hrpkhdwqnza42dwy3tz2hejpmdtpp8frgdan39vyukhk6b18r6s655wgupiedlgh7623hg3bm0cq0e2321h0tra5kd4dekazstj0xx74qfozqrml60fwqtg8u50h62gozpmpcy2vj163e8rys34ec831f6kyvh1u7db95db7pcbwmze26jlpre6hcsby4kt9t',
                filename: '9cdo8zjtscqxgtkzm9s5p6ysfyrd75pv9zgfm14vs7luml3163u574rztnz9556xih52tc7otvdsfye93kfppq0voyf35yjezxwg1p6oydxzl08q8sn8n6drti3hdk8uzhmlhxulboft3hvwiw5w2gjkqjl1ab4hmweavqvtd5rah3laa4sgdl8w34riab7rerlw88bn202bmz36eafopfsamviggi4erw3s9u8aqeocsoipennxkfjpsn3tw64',
                url: '4f4yhtznnx7agsrgytj3q751fhmbipm03q7y8ibf71gw07p6hpog5xnohn5plsvl17a8ocj6bd1nkfzebkrhsz3yjxsw8etngwnepw25yupwtlbipoabdfzlttl2w59gyb36qrwoeejbyzt3eui7pjui5jz9aqiywa0toqo4i542pi9qe3hxfns0t9h8lprwqvqapsc3tg7a4v2hq9rju7sem0i8x7zxldjpcig1cbe7xt178mc0rm90xq4sfmad4fxw7e6ktaot55o083zwtez80rhojqrv5q80cr1tvusgadm1jlqoxb5u01x792pxqccq0b3xnwlq289i0w5ytr0n2xn60fndwbvh8m5phj7zurfpwmv0s0m9pk17j6idvkk83lvi59hzcerup3ext5cpzfwgeqzn58lco7vih1sacagzpc4qsjykcincu4178fqibea85xn89267ygvyjon7n4zsc6haq7c4o6ug9m0eprkoxhfbjq9u2x0t5pk2k2jk297n19a6gp7x8m2cqebfc26iefnbsq0968ayafpk4r99xsubhktsd7ifc5310t953erbk2b7y88ntqrqm30topnq7e9m8doy8vurhx10alnzawjc4mbs9s9k3055qdzyxirqfuak38gw2eknt6rqj5wowzgpdawl6pfopnkckak1zjh21in87fe0c7xvtfusd7gshjjtjahy7txpbog5v0cyh260reh2kj06qt7nic6zg5cola076stxjpbzo7t9icnnfsjofpwsl6zxabfthgy0wszhbumdcrh8ifm6fvrblftzimry0qgsigkxkfoa22v4zwx73twwex57t0bqntyxa04jetdjcwzxi8evflrgoz01ktx7d2fax741n43nghs0vzslsccvzxd4y0jc0cfinb6mq9pc10l9l15ntvtt0ziyrc1r9wp2ybocejkejsqlhds3ep11a124p1jdmto7tgthyxcgk58ek9kiqkwelf1lj8lrh5mvpdsf',
                mime: 'xwltzyi8bj4xylqawxjsaxz2n3fqrhrizrz3dlczo248ozmuie',
                extension: 'hy0uhms585z57kvkkwui12etteoza5kekrhego344lo88t9l9s',
                size: 2528405127,
                width: 826128,
                height: 825806,
                libraryId: 'fe940cc0-b8e8-42a9-8a9c-9c6e13ff25ac',
                libraryFilename: 's2uhs157htjecqsig2hm90rgmvnefdqmgqb4lrt4buw7p9zfhptvb3yrcitpnwqg48xlyalgewieo677bzd9g2s17r6ianz76sjw9ardcwkqhimwnhovp2oqne727v9idkk8m4xbqehatc62d1xwcv3k281iv6j3ywdhsag92odias16xohbf6krmtwwh783a116jynf5gtq347e37bmy0scktlkom6roqu7r5wlv52rkox3ceywu63s1x4z777',
                data: {"foo":4158,"bar":"L{Da&kT<Iy","bike":43565,"a":12355,"b":60164,"name":"VMH(k%o-W9","prop":8429},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a64a7340-629a-48c1-8b3f-2f03cb9815ae',
                attachableModel: '91ojthm7nk78wsfi8ss4x959vd5tyz828jriqev1twfi25yglw0ijvxfkov2j7qsu8jfl2qpqpm',
                attachableId: '0d24cabc-f070-4638-bc03-718bc90484bf',
                familyId: '17495ffa-48da-4b64-9b18-164542095fad',
                sort: 899037,
                alt: '6zr3rvo6e5zplsae8l5r4qith6apxdg4r62yh1xema5y38nge01sr9vm9t8inmw1unr61c84zpj8fe47o0fad43nnshlvk7otvzy1w00qho416994bteddutczvda0qingbbdnkxtwxtcsaxt5ec78dwd0o0y4hnpgxkmsqkugucookwqfzysamly8y8dc06jc7hirrmrzhpuyd2elnd7fiqiqkqa8nrbopriazvw82vdd6rje7fyu5gh3h1qb8',
                title: '9u3vypv7ou53wii04injb78ccc67xmtwyz84kxdfe3ou48boy0al7ks3mvxx1y5uchkpq19ir13ozne5os62kxywdl14z4jlfxojnetx0p5h6yra8q88l8t0su8lbq80zoonrk05l0qwndwby2jjtt47qja0m5ipi32baoq6v69f6ot3vt7kvmuvq4mw0s1jfjkunxbh6817w9u0f0f0l8i0292ibcu962hp3xceohaw3gr6gozj15qyryf80vx',
                description: 'Quidem totam voluptas nam non. Ab possimus eaque eos consequatur. Quia et corrupti aut voluptatem aliquid est sequi impedit. Ea dolorem ipsa.',
                excerpt: 'Facere vel nihil. Culpa quia corporis hic voluptas. Dolor voluptatem quia omnis quia qui quidem beatae. Iusto et earum est est perferendis voluptatem. Tempora repellendus ad. Sint earum repudiandae nam aspernatur asperiores natus deserunt.',
                name: 'qqwxmhyaqgy97xg71ekf3en5mdbtr1yrwj0w51zyikr4qqkasv9etxcizf6w2le3nc31iqapjb1ecdz74scuu2ojsvwkh01cxxskocjf01w7kqjlj33zsyotsxzgd526vuogfy96wc5lxo93ax0wqupwexzy5en3mbtuyps33tjvrfeqg4e1r6vfjgdka3278hpnns1gq6q6hvs9k8wtgopq8ti89vs15whq9x51n7zvhrhqa0ldaft9hxi0bwg',
                pathname: 'yvhae969j3ghi5g451x11xfp4v6zlw1n0mbefkr4lna5kybc6pw11iix2s8udopkmurwmhyyjc8doqo6k4wg68potjlob5mlu6skdx0pc590hjg0iqmwcz7hxng5musg8cnqq3wvfk06by9nh5l4bdekzwovwfrvvd2e6v91uotipt0s7fvrosptz2k9amru8q707jgxunuure09qyhlv5eqf2gfrmmdpb145lswpookkqy4tvh50l0tfgyx5dradvig3gnktlycqwgytocvpr7vw518cnkx8du3z34ot5zcg738ozp2nr562755aknr3vcqbofu1evs59disybxiof3a7tkwnj5318ccs0o4136lawvmj650ysqh28vh9lqpbpifpn9rh49sorg8f7xg3vsre7c6ofs9iht7rsprf242oe0vwvkglkvoseq3ie4osb8lsu30zwm1mluoshjawbwildylvmxrznndr797huvn64v1y9qv7unvstlr2ek0l0g75yaxo3mwcvp8ogr0l4riu4fdpp5lo6f82uh5vcw2lokam4a9q3jsd8jqnfm535ydsnmtm94cu68hmuy58c3vjvrwx8wpasdgxwnxom8gpvi0upzhey8pop08r4z4wqqebjrnmfmnyoa0end3n2wgzxexc08nkju3gh10nkydk2dsuw1yh07jfdk3ohebn9up6clmc0k5cb4plmoclmxf8aryz87l81suobdfjbq8d8uqkppdza1zzc2eo921yq02hzm0b3drjbt9bnubaoh8u7m5svztbtr32wbydg5ss9z9gzy2wjv8ffh6hv3x8k4jrzq7i3gvcudhulvvgt595tgwpyao8hdn0d056p3wfvshbsqatlav8r98xcdkoxreb2mleeknnngbtpx1adp0v388n46cdyz146qr1n6pffcyhyyr9i65btfkj32y80lhi1t5el2wdkmpbpswju2z1m8ujuy9fzfdun4jerdu0ykdt1drk2gndu3jmie',
                url: '7bykwtaxtyhbx12om38fz0b4zo8g64sxmu8ald51ljklaw6lguu5gowrofumkn21vul1z42wpm952im09ofo54xa6dsx0m67yekhljbi2fyrunphi8gkvzzgublifc1jxtokxq33etnowr0nj3scjv149egxfc3bjooqb823twzrdg0rpug8l3dfuzhqx687vd2v358qwf3ybxm4660gflvscaoshvf6suniun58wtyxco0g4ch7m34qz3nxjhlu7nqyjcdxkpuq1d9q0717l9zniu9g4msnxy57nlrr0xo91ubgb1yv6eif9wvfc6epklwzmnougxj3sb1d6azt17ic76l6k08gt61w2bwk30js2egox4l33ybsz2ebq0ewhlg0bkxwa5mi4h41m6rzckoku7ve1blhosvz0gxxhcem3gs987va7v3oihtn292otrlhi4abarj571ggcmjxn2efc2ix8yoaho89b12rlgwtejbpejmgv4u98bbaq74abp64g27udtau7t09zo0u61vnyq2o65pa1gg4mpqe61avf8rhpm60xf2zisojh8x8frhqx8xjc4knfbfjzgx8gga70w3db36102wiy39wyjw472dwj6jnr3b92i6fzved4urszvnjul8s40hl2wmik9ngzqxbu8l9q73mestym45x7mn1uw2lhqlgkvzmnvf273wquj84z1ow6f7lv1sxdxty9h8mpvu6tvnyr30ytoy5m3lak1mrzrgx1y165df6wus144n7cj9o01tqbup08ewy1buhok590ss4fufonpi151a0rmfyo2lqjb6cy2cboajx917gjqay35f9shdon7nzcwmiy2mt1tiu4nj62jh8m6tk1nbtf5epignoxgoxfxy5gpwpbhqpbh452tzzt8lcoj110hft217ipz8xnajiznk7o672z5r4yzq9yf1q7jiy7l2pamk2hi8c8b4lfb9kdklo4tb5b32y89rn7lfu5difymy0pricghd074od',
                mime: '1fh6f86utnbb55ogen78d12bmu2tcg2afbfq4fax8ae72u7j86',
                extension: 's6kqyfy3lqvhqq8mw2k7xcyouqpyw2e20kssspwqq7yq9ncaiw',
                size: 3850512786,
                width: 610708,
                height: 540884,
                libraryId: '4276aff0-70bb-4ea7-aa53-62bbbd9cd6df',
                libraryFilename: 'csvcjd7324goft9bdd0qtk52pa02yh77tjpckffd2o9bu7xuwjwgs1j7gbzklvuiwaieianw8fmu6h5qbf8965z3ujhqjndt3zcp575kc79sku5y9tck064s1f4zcytv2hqavk0cbz03x8ed08mvbk836ji9eatla2j2928hrzr1o55dfq69v6ywm5smt92uls0we8nhkjlrhw14q9vsoe85eg7oafpsf7umdj2g8ta4em5yamuuog4jbbc0inn',
                data: {"foo":93264,"bar":29177,"bike":52542,"a":44230,"b":"r6&qyF)#He","name":"qe0mY55V&^","prop":"4r`C>\"?z>4"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fa8d0703-1dbb-4625-883f-5e0795ed8d2e',
                attachableModel: '67oh1t2l3jzjywvmak2spfqcrbxx0i2evi0n1y2uk4glysnrgmyhbyjzso0zr6tfdnnasip4pyz',
                attachableId: '0c50cad0-1cf7-4132-9050-36df4be20bb2',
                familyId: '5197c4c2-bf05-4eb7-a631-f0a650f885f3',
                sort: 695613,
                alt: 'ewzltphv3e8p0kedaylabfq4y63vxsnotci251o6602tgg58t08p1ly46kxdebqk8xgsnwy75v205pxpjuz93z02z40oohkonkz1wogxlg5l7mai3eq9ms866s8t7j2eua6llhy1i97rvn3dagawhomom9ogjl3gn71dc308e4fhgfupy2id868bekj2g1hnq06ja2soqia5825smkhn4mt0as5pzhf3mnlmr49q8vxq1koaa6m4ftoy3d51kfv',
                title: 'k5b0vnomse5su9i6r27nnheg3w3t3i5omcld49n4hkl8cui6xt8z1oq1602wgc1q44klfb9ug0bkpxw0is7loydz4w2em1mnow4bm31v75wch1bpcgoqqu5zgfji4rgz6tin5s3x2nq39fjez7fh5ev9jpewgbfxpuddwoed925jt4shxinudifqts2eio4nw1dhaxno1kdg7w9ekdvt6rt5mmti367pjr6vn8oyezxzhf5phofm8qi8fxv00uy',
                description: 'Nobis quasi voluptatem pariatur. Earum expedita tenetur praesentium magni cumque. Quae sunt reprehenderit similique est delectus quos voluptatem.',
                excerpt: 'Placeat rem eaque nostrum minus. Pariatur mollitia eum quia quis eum harum asperiores eligendi occaecati. Et dolor dicta. Cum amet modi enim ut vel praesentium.',
                name: 'llista7uterl42vqgqlrrscmawtwajuqqck75ukzucpzcrnp5j0pgdvby0o7jvczhfg7j9fdpahdrx9frxoiwypfc8zzadiwjsjwsx2ks3nimmjw53vdm7a7l2nf9u8hppgn9wds2kk75pwad5v9y3lf6iwzesq2xzy6ktm6sa7ri46s1noxfl4wg3yhgj7gxdzmn6lcep519n8u4v48yqsxv5og5bje32rh64af471e0tp6e3scaqvjqsyjbn6',
                pathname: '2uo1wl32siv0745ie129v3eqbnnfxl7udlcv3rp9v7a92m2jei29gt3xgo45wf6029zrysg32p7bu77yt9fcsf7htxwh40ywf8d33kvsuqasdtktomq3lma8pzfjiecov8i2z9917y5sr29l13g2k4ku3uz886xpkn3a9r8hlu7n70odo9z6f2c0v64db87ck5y6z269qmtfewvhzijvm6alndjdlglqtfiaorquvdq55sqktevxj0zo4ufckgfy9p5xw83no8mvtto8b771rtf0folo2hre6ct1m03r3vmyi6baxyozgznxq7zedmuwhrjkyjp91l9zuhv218uyb4275teryv1dodjk5gzolosndsb4z9jscx1dizv9pb0b77ftup585y8mvdyu78j2p15kirhel7adpigglx3b1cloxcwrb4lw4ngtj7ta9wtvp49r0dmapte3tzhmzk3ad037a0m1ek6wydgb0uthqs09xyyb9i1p85vp6xu8ihf9k8g2uf0hrn0d9iod7qxb2crwa6oefe9p7dqgp8t9nxyn29rm9owov9vffhsje0sat9hegw1sj3g37ci27broq5mlgfwmce38pmyfd9davc1slhpne1v5abgt1ynq1bx6l08kz76wlusj1ai3dedxd21ki2465a767zq3cnyilok9m3h5ov8cvu73hn9fmnbsv0vuazewb2bvdj8y2glgrilbgddmqaq1emxj5v9bmp1qhrtc7fqbq2sk82ze4o3guyu5guuqdeqemi38lvat6hs6n3mhk84b2467c3eplfkkduql0s23uitj6s5q6nvutt34dzsiopyqjkwhrmf0twshs4u4pvhhewgd3ex3vil7c5ebjc03bo6lzh9ia7s3grlvgga4shau8wti2h6mq0ab3ms35kld7fqukvbpdq0qkvfdbsp5ycwx8mqmilzc9qsvt3ad9hh1i64ekqfvz202celd2xomxe7x6qbrwb9fu9y6clp1ri4pxgzmkvdj',
                filename: '8g1m7l4emrs0wmlzqfw9edb8vz9ifx3hz3imx5c904p7f76jfl2cv749gpzy4q1um58sp7bpegznoztk3qhni50zsgfskb8u7g7n4bc2eqtd7zt7ysbrzwhufg4uycbgguxzkeu3au7ehpeewhj9klznpklzu0nnp9mefzrxsuojy7yfolvndt8t0hga56mdccyvox11618pnuk1f46ollcmtspzw01dnbnj8w97t53g6pzgifcqj2zlnwi2z8h',
                mime: 'epze2ww53rai4e318l1x6q4cnrvh266l0zfw60hbeizewmu0x1',
                extension: 'fzz31yhrkriodyh0rxjcpu9kao5g873yiy0h44mkajttnd0fpq',
                size: 4912414620,
                width: 765343,
                height: 329576,
                libraryId: 'd918293e-a312-409f-92c0-0fc46d4410cb',
                libraryFilename: 'xg1kaca9czg4fdoqkwdw768e5794eg9rl8t9idpm4hi333xu5shuxqq82j5vvetwu4ryxhcrg20cojptyuksn16rxbrr3qjc3faq9asy6wz9cqb0c6b374be0px8ke5lfjl3magzhvdl4stgf6v9v6mek9rpnpum7b711wl2n95urd8ywrutodhdo7c13hxn9xovbn8q0s87lenjwj29e9dza1q1tto3esmyc50h9px4bi5o5z1bptoxc7fwpgp',
                data: {"foo":"jiEW]q1b2F","bar":41405,"bike":2133,"a":46007,"b":"r$a.Z4{&Kl","name":"c3!9q7\\nr#","prop":"hE=$?3K7'%"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ae9e5117-fb28-4dda-9b18-470e03d25a3f',
                attachableModel: 'xynz55ddvbtlo98pesus8riu063gcog6b0d85zjgbe0hcb00oipzd49wx1fvn4och2d3qtznd3z',
                attachableId: '3709a30f-7c29-4d34-80c6-182e18fb63f3',
                familyId: '99aa941d-5ed4-4178-a2db-f9b07af1eb83',
                sort: 833044,
                alt: '0gabjrdvna1ybg9ysxk5vwzcapqjxdxnyhgh9wvr5uhf65q419zjwzyerw5o1zprby5qr12zgm0hjl4wdxdk29x21ru260vlhmioiqqi1dy2cl9j5tnp16kx1s42yw02i9zrcegmlqriqmp3fk0gz3014bde79lxlat9jf84trlpthivhccfjuqkvvfntclfjni55q1wu05a1ziwmnudn4dk6m4nvypv4e78lyjj2j5x2uil07khnqho71pv5o0',
                title: '4mdb7zdo40uptzathumgrwfyzm42ztssxrpdq4eleajqxwsuih0nptz4d239ivlcefhnzj0fby4x12101s5r1sc0x3kxsvwfi0ukc0k9jqg5z9ovhl9k0ossgxb7lw4qcqn1lmgu21vqva6iu8rw0372k4khsi63g8lsjkf810om11uoxbdd1mona2k7fuhbohts2i4alsaatroo86sv2et00pc5t8aaviwwytskgp07t19owcfsk5g4egcxbd0',
                description: 'Modi quisquam asperiores rerum deserunt in inventore excepturi. Animi qui non assumenda corrupti vitae. Eaque et distinctio repellendus voluptate sapiente debitis facilis.',
                excerpt: 'Tempora quae odit cum esse quis enim nobis aperiam et. Sequi nobis ut deleniti porro distinctio magnam mollitia. Iste necessitatibus optio rerum beatae aut non magnam. Iste maxime itaque adipisci atque molestiae reiciendis incidunt praesentium delectus. Laudantium autem reprehenderit eos. Quia vel fugit sit.',
                name: 's4azx59knyuxcvpy49qitbt57uzyc1sui9qvwwjp5yu6rhh72av6326fxjdmkc9ecq39jyf3w0ckyy2fhohi3pmzl6qbqg6bi9vr23i5dmot3bi3jy27kf0sx8a1sala9kkyvgmx151fm8tnhj8h351ovo0y5e0f5kb1pmcijb1gpuebep9ejar42y0p4i7qbe2z6unp2nit43fmtuzlqcd38nvdtqfcg90u3anw5t797r1lf7av2ioqoyaz5ux',
                pathname: 'jimg46i973fu49pgysrwxm2nv0v098vnvjxslsntdrpfo53o21j0pxqruxtjnud4ffnnmgrcqfqv3d4otspg5z4mjo7yshvw785slwjh0nlknecihvjt3xayn7w0hlgj31gcm4lh8nmhjmmv3e1vm32z44irl2z8ivnev3ft0ezfw3zwtoyrqye6zoxxtzukg6uavsg7zlspkld5f9lqn5y088mcirgzm4qg43ija6uzf1yizvmcx8z7upt9cxk29gllzwy2867z9jguq9dydgs575vw33vsjzmf6kvmz6mob8s57qii2k27wz99tavgm577f0a8i55nrz6ydev0x5gzkcwaap0fwyud4soxpcg5gvi1ndweuijb6c7m0jcskmjd9cb6o62785v6nay25dulpm8z9kmjp2d0onodrjw5flk4fvtrbggyqj6wchjbyvdpjsq86tub9adj2jvpdivokuvcl7owf8pugaqnx04rccy6z5mrb0ex0tvfhkdljdu5ycic1azvjulftznjhqqshgrin2w8b4hg5r7yqaq134g51f09lbteed6gyz7st2g0isk8oefabycl3ccdclufqau2pqa3avgdxxir0twhex6rp8o3ph8upafh0nr9n6vs1sz15dkascq6r7b3tjp2kpqt6srcylv7g0ss6khxfjpijjfc0r2b7kivhim5osl7x7fgx8vaz21r9yjwxx8z6tbopbh8k2liv4rhe4106886tie7xv99doh3nbhd6n77rt8yjoh6s2hngoqt8rvsik24ay29078x1lr2062knj4bix956x0qlcfewmoyzf7j12yw2qzz2c60fd1cq6xfvw26rjohsqmmq6lylpn5drk5c4ero1e5wi9ubac19r2eh3v44hgst4j5798c3w0lj8k6h9ts7b6iicjqlhulzc4zwwt7xgod1zsrjes7k3ljaax5ahn08dutqdexz98sfji32dcv92txaxobc3c0b21gudayvxm9vi7s2q16',
                filename: 's8t6cxclon1fwvppsu67xspakxujz32mc3zg7q3h9pccp0odqywez1gb9p5e8jjnar76xca4hnw2c5l769ajhj88vlwth8gs08mlmh5c6cd0w8c4oeh7erkrumiq38stay0qkrdlj905mo9rbzodwnzqij1ovzvh3sxasnbl3adpu9o0xi779g5t7h28v7jnwe6lq57iar66p01b6vyl0bl9kx0hgwjrbkaa3lahcxxregqehh4d59992ivyn6a',
                url: '1dzlgc2um9u90m9h31ypgprzhpvq28doe7q4r0nisuh0ywe56q5ysdz36ap7gejic8w72kgkramogkdpxibyu4xf4gqwp6ym87be2azqnlfwb17acqtsysqkxuo96f0a93grgc29u7uyng6rv9mqefn2xfqrthsii2nx6f1qvpf8upg4jlfhsjyreqpyre82jd56fesee1unekj04ar4pl4gyrgd93t8s0bc0iwmbgrprpcdd5r69ejs00jm2n8c1cvzzrsxy1oj2zap9uvpzw62uhr4s3b90eum2jhvtvmyiwm4ou3xt468oc0lv6ms47bjtrk193p54kt0ntke8jqtdk7s9271x2c7ob0u94zimd80haxxaqvuzo6vbdy4b996z0urpfy7d973xq1oy197x9tofcvlddc8vjtwsop3ptnhf6iufn3h2zt3mju35uakfywml29r4vr5rvbm4y8pt99vhbfo4k6zqo9931z0ah8khpcb2ygbeiffmc574rmhin48lqmjmxks3t8dk1infez301wa4cdmoigoz22u2jubnhzynln6omh80anhb6f9hnb7z8fm9sfgs1yrx0f66eluvrn2so8h2jumxxu7w1navqrw4u5uy9vgaxd7a87wgshn3zyl7vilu79nhyxb2nrfp8t310flqt1bcgvp7llutyfjx4hfhh8d49d09progexmd4o4jt31zgqi997xs1wa5ybvwnq7zfprtls34czd1t58h3x2ib0o5jwqdyukcefs0zd51rwliv2ur95s26ajgikiovsfu5t2p54otpn6y1uh1ine0p9vqprnvls6h1xykbhtcmtahjb4k2r530vcui3ctcf6jehtgn74x1fa8ga403x43oe010shhbpteaf01xszdewdfq8cs4db01tmeevn8ppjvg95hkq2wi4wc1y0dwcl8529r15qyxuvpwc9p1eo0lu9f369oxjmnw1z85gu411k9s2dv5pvqdm7gjodjz5qrjn3jb1d',
                extension: 'yaa5rt851cqnzjskgpaj6g7c4vc2ukj0cya5zvyuzih1sn4bx0',
                size: 1012742175,
                width: 905498,
                height: 939372,
                libraryId: '5bb63a2b-e21e-41ec-83c7-1d0abf496940',
                libraryFilename: 'a1ypqgtjt7v6fatngrwc2c6chhtcikhvzho1hlfsmtl441dvd9p1xiwnwrorw0frez259dhsn7ohn5uece1tr80fayeu06qjd0uhuf0s86bi1ghllt6943zhg162nx969w0ww00fvsx0mwsxyl7tntadc2b4glzlngixw01d26s6lteb0hkqh9ob30vxz66pyup21heaj71t9lpxbdyzq9xemv54587bupktuo1ew99bpydj5b0xm83zxspsbib',
                data: {"foo":"\"[Ao]Q1&/X","bar":"#;(IQxz#QG","bike":"UIdJ/q76{S","a":"yJ8Qi]h%Pl","b":"=Ac(4G-sTi","name":"l&SF;-@I8=","prop":74232},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a955446a-c966-4d46-953a-86fdfe45586f',
                attachableModel: 'j4mq3xohim3f10ma5v6c0fuy9svuukrhkbbzkhcgj296nuqwax2wg2g5fkpih7e5qh6r02bx974',
                attachableId: '7eedbc69-1f7d-4378-9c0a-244f201de0d6',
                familyId: 'e581df70-e795-4034-b930-3deea7ef4091',
                sort: 981125,
                alt: 'm3hnwakkc9s7u9krp23jpjjl3kxmm14r7jl8omqm202xbud2fylb126ctfjmsw5pjmwfk524zv9nnt96ah99kbnuponddfv6kj9xuihjfwi59qo0ooz3rp6ahokuof2fz555qod1stn7bh6qehuagyho7ius2b7ivykd6090p2w4hw2f97r4y9m3k69u2ygi0806l8wyqlt1qat2igimf8wynmsxwe5rq8kg0n6lqmow08hnfg53twi4k0u5q4s',
                title: 'vszrge81lk3g69cep3bioam24usnrbsqta1uswed1gnarg5jnixubkn1599petm1hq8nwpn71tctszh5vam7yr91rdny5x5cmgx8e0xaig23lwuy2zbvjc63qn7xdf0qitp30hyh57fmdv3az0fgidb90gpwyh2jn6yaonwvmqgvx20lz5x5az5b0o36w96tv2mhqozx1r0iqrzc2rj65mjvjxc55ftd7pwrwrznppgomsy1vudt63bb91k2dbr',
                description: 'Recusandae ducimus qui. Esse consequatur recusandae iusto adipisci quaerat ad et magnam magnam. Aut quasi minus et autem. Repudiandae odit aliquid molestiae. Quasi modi tempora qui vero. Dolor error inventore voluptatum hic et enim et.',
                excerpt: 'Incidunt repudiandae quod sint voluptas maxime illum eum. Deserunt quia aperiam officiis. Beatae maiores sit aut quae. Impedit velit distinctio non natus.',
                name: '0i8lysj2rbwd7p4xgwf6fxqd0fat8oprr1tnfgnwuhd81tru3lc3kjlh1bbnua2zkfjf9try99ss7i8wjtvg46gilevwniszelkgba2vbnubzwwbqq6n5jfq9dy07lkwbpln7r0tlybzhdqu7h8w9qb6nkxut896qad6yteqz47v9ggpp6brfp1hyqf3r2zlmcm6gx5iltlyo03pfhhpnob2n83pgxgilg99o4zrbn9sps7grrhunckebsdm0k0',
                pathname: '6db5krg1ehb5vef9hxv0ae9m3qqw9eax6ge8a4n4twysnz5940u3qaug56f5krzouudladiu5qksd7h12ztdp0troq75fuwk6bfzbbvhoqr65jo2sslwnqpi56uqfvqw90c6w5bw1lux2ec98kmtfcq289pwxmlk6pzyt2xk10e3e3w0erfsksc9639rkf6ozlix3ksr8zldgvfu2qymb0amzghrj1y070m0ay4pvccibx64y53yilcqvv89jz0tpnl3hvev1ix1tgh58qgw5wgywlgmu3zl8zqlvabaqwnv8u86umsbeibr18bo46nflutpdds6m5xn20i3j68iqtw4uchp8sg7m1k9xquf1jsgj6wkvkuzmqlvd646633ksk0m5lk0i6rrrpjpcnu49ense434xfqq014k9o7h67joqswl0wb5l6zzjcne2d7l54i84j4ix9dhr4dyuafay3buu6yonwgdigu0vk5jody02svo1rzop3xlxwypsga5ml1tw4gle36iqx79uq369t8aut7m9yj3c8tbjeogok0tw8feqtaw5g5hglzasykw25ntcejfb51xjfaeywltf6cmx7uee22xwt83k8jru5fr371ionf5w7zrotqlp126khtyicvs9s7fe92pxb0z0ot9o6296zei4zktiptf8i5knuzpnthkaupz5snbua2csvym7w33d2xmresouh3qy9auh9cyu07t0e25c0jgkkpifxwv2w6dqedt7bhvgiqfys5fyw5z34m5u1y3rxis5akugviow1msmvfaf466y4jtnkvj24nqzgnee12612dnqqwz1ezo2b4pfc126mccy2w66jh9beih6w1ug9y2vc134qonbp5c990t5vihtecm4wrgjgnzqp1zp3rcv00mp0u27lsybh80vr0s1dyup0mf3pmxiongckm5ntfvixgxwt4duy1uvrv7v0ilc7c86g6q3dxheix4purl3lwpwesa2rh3js20lviz44gyr1dz',
                filename: 'ro329a6vxngne5lffu0kknl8zbr2ukvfk95j28vkj41lcisf6lgrlllywm9yxg6lrso39qf7m6cc4lixqh08sucia71rgxt3w6mo6f7mwvmvbpsmdtlnt9vmfej0vtjja9vx2hvpx63cxc5p2ci18yeh2je9mmhoyg0iopxk1w62rhw0bjiigacwhcb8lvvonmpyjazlohmbduyx6l7jtow6pwo3tf7nx1rj3wbugofvhytcl54hq8dhd5locmy',
                url: '8ex98fri3i5ec6a84p1zpowxzvrn4kearzddtwjgux0qse19p58w026pe8o56912knjx11xasto884oak9yzf271bhzv9gmkm5mv07c5jlx3d6jvgnod07tspp7k3x2ny13p38m62jz81ovijwvzg3rmis0tbtz2exiyuxwt30a1mv7a9cvl97p6drmfsn9axysp5fp5pjzyigkh9qqhial5xaayno9j4w1lsalpyod2ajse5i4c4l273lzwyogo407p6g3ck14nn6k0iq86ebxss760mfxoiabgc3e1y3vw3m6ltir3n2bwz3d9gm08b5j603f06ju9h2gdyo33g4h11w6dyfmrkqrkgvq7ltp3axn2xwvbirodzv5ij71a8n0k2ud5kc7jnl4x9zkif271o1dfj5d08fh3sfarxujstz3clhwq08uh1xjc35r3wdsmyn17qzqj2dswrym8qcuhor2ncxudcs049vnbappnysj6m6dxhu5tme665tz9jkjocpov2j9hc9w6d56xhwuojuljcnb269grkwcjidnh3nbfjn3epd1wxy0gxumee2pi0iyz4qruum6hexxaw6iruym6igi5lhzt601milmsawze6th5yfehr8oe8if2elpcomvj60gv8o0tzfgpfq0k966cyxvnk8pqcb2681ay10vpy6xfq111v73k8zmosd8u4wqy0abucovap33o3n4q5ro3ni31nh1fvtshkf9iqig51xkkjdaa0w2bpit3vv5gyp2uhchiifgdn70pxaqb8wtoeb1jfwix9sqjqxl1pgcdqsd80k4st74nuvqa0o9lxz9vx2ui75k3l76nu24yp55hbzjpgpuspcm9urw727zh7om0foictytqchuibhyauea1bg3rfrgknj3h8jade402inobuouy9d3102nhcbz3j7nd3yv5lcm4w6uqon4xwonkbu8evmk7c2bvxx4q260p6qffy76omkgkirngpow59ifbrmmmxzm3mkj4',
                mime: 'r16gmf7emzx5nofhbqub8kj1vrk5fv2bks0mcee6zhg86a367f',
                extension: 'l8uqanwtfzy2rph9lp67uxzghxt1yt87j5w6x390v5y4gh0ud8',
                width: 404558,
                height: 276513,
                libraryId: '1f925ccf-644b-40a0-8970-834ae1d61468',
                libraryFilename: '3p532mvukkyy8fhih8x7q78wbprb19xdbz6uiwz3wwjg8dhrp1a8sxi875nrb6hmjjzxee2yz1xk8j4pz4y7y0z1rjfr4luks5wi231j7had81fbpahlw9igu5g0xvwqchh96wzixr6efeuxclki5h1av31aod37pslbccmymncdkj2ni2gzlclsw942lsy66f959uigei45u7k4xlguhq9bydw6p1gpgitpxzkzq80nv86tayj0cda3klmcdsw',
                data: {"foo":88950,"bar":"2n}O-8AE;5","bike":26293,"a":"}g8YbOky9=","b":84854,"name":66151,"prop":"Gqcb0p{JL9"},
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'uoq0k189mzyvx2f3ixidm2v4up6peohh778uo',
                attachableModel: '4050of9ssrju41i9jfm2j9y4udr54leekz514m0rxsts0ueol8d2a95mcoxodscjq2kae6sp68e',
                attachableId: '2864d289-2ffa-40c5-b639-616fd83fab3e',
                familyId: '4a37e391-c963-4f66-a633-7fed996b5096',
                sort: 864854,
                alt: '0yfgfhh4c7teur2vzt6kwwyjakr6v2vct0j6bgtgfu4mt03hex9dzlxaez5rz71fss57gzo2mhph60iqpbbvqit8a03scicdqiv9xfsobdvetanz61vr289oivwzbgw9h9dsxjwtorai2m7qn525uprs6sfqo28jcdhk8jn6bz2uy9i4wu781fjj1a7i6ivy8vyv7chcqurl54x7u3a27h53rh95n1fihs8vg799vten90ujyjf3wav9hn2iktt',
                title: '04kug1o3dsds8r58hcdwaiffbv013ek13rr0dsnmf253i0v27a2ern1p438tp1vbeniqre7pw3ey6nqt59tic8deq23goiks6c05fd53eyvljxdj5xlzkdm50meanxriigm4tkmff8a4mzlokx6v4thwk6flgt84zj6rjli44hkzti2bwgnia0hqelpbwpcbi2xrkhfpgo7mtjzm8zsdhz3fw9xnvgp3aelq8wja4adltz2df6xktngwkugrpbk',
                description: 'Ratione asperiores nam et velit. Maxime deleniti quia dolor consequatur autem iusto. Exercitationem vitae commodi officiis culpa dolor. Ut praesentium vel et explicabo suscipit sit. Vel perferendis aliquid.',
                excerpt: 'Maiores esse qui quidem ullam sunt eos repellendus est repudiandae. Officiis rerum voluptatem vel nihil. Deleniti eum delectus excepturi et porro. Illum iste amet voluptas. Nisi omnis ducimus nostrum quidem expedita. Odio maiores reiciendis neque placeat excepturi molestiae commodi.',
                name: 'ms2v8epjvvhdo69076czqyxm5nexzdnq93xgphrfegjzu3a20wn76gl239opzge7hb84jono7otj0h734rrrc1st39l9w68w3a9839jv9m5g3g9pzxg5vh59xcts3kt6kmabapoym7xnwforuecx9os11t9tkv7g9swvi8nfy46517kuq7tboqtngx6ds3p2vlbixgzu3vt0n1trgql4b7c33mobh6nl38pdc7ovss52yjig3u89ot8ezc2e7vu',
                pathname: 'arzuw3sy72ek85kgkqodg52qzxgg5wlwnes0wwdlkbovodskx83mdq417jqx560eyvkbrrhrq3831fjn9toxijhrw3wr2ifyfbq2azny3o0bm8gd4g5vktx5tzsrmk5vhfbr1stmxpokk61yyg1oqajei35bfzf4bzrm4kyvhwvv4j351epxtdkytnpy9d8wkv2spds1eqoganvwag92i262vhudfqg4p2a8wg4jnffbl9kusuzwbcenos3h9fge4obim11uek141h9qo417829a2crlu9ry10rjtmfuu3tprurv4mdpid92ilq7ygnlfzwigjt8gikqm0w9l9fed1wa6ih9terps4qwqw79v7hdxtw7vissi45kc215tx2ezt3583pgu9ovjdv34uu0m0fkujhlvdxeaxoe8g6dhtzvapo0abc6loq40nabemmkw1xs7gd453s1zdzik8n6mbiqq8kkwwe8lamnluhta2xmgzse960aewli824tz5r6vvs0lt5tkbxmm1mz5sazkvw97f4e4xb296en6daeoskm3g5rnyqd70n4dfv3ri5hpqu1p408voh4os9wytbmfrkvlc0pnj1ascg6666zam685zl8c5bzbyz1osovcilkhgsss4ncf1lkzzvl0uisjkyjgwyipuywuecd8pjhimc5pmmt0jzl3058gx1b1ykggtfxuvc9wzhtgar9pej36zovvhh7fflv4fj535dkdb9rofjverwfz3ub1uuw63vol14wyfww2m458vqr91vwkcg2jag0r692ss1wb3cjfa8ube7zpawe177u8g40y3kzy7dzamt71ok22ejuupvnqtye5bihi3tf00qpynbk4qd642r435ua5l4gns4bwjgo4jns1qzu8ffs24ugwv4pxh6j3ujq4eyoxxftuey2fc9wm1wqxinnd01ay7zrfcrpoo8ccf5u336rba8sqgy7uv9c8pimqs2no1vq5ez0qn1a49hbx65mnj17v4s9d7gs',
                filename: 't2vugy4mxoee5ai9lhm703sxvorp98d3ma4p5b2p0t8y5rvn7h5pr8b77cz8kxlgwry692mzoeirgfkbwsri2fo44euo7ww4izcyozpgiql4xcshtecrllgmzmcbapeyod8jdg5bskzxufn38gkkbm1t4yrza6ac16zy1jbjdaedqdj8si4u3kcjzmmzi3mob0nnf70bkk5sc3q4bo0l090l63s5ykx1tzrsi6lkqqr3qzyjv00imkdmej3idy1',
                url: 'fpbzzfqy24twi9a4vot4zmdlnzyoodysr9kstxhtm634m3x0onlbevihau4h7cuusmwcvu5qde7wsk1fxig023i7myg824t3ntgk6t5cn78uzcf98h5ywuwurb5lykwpbydkg30ltnhv3hvvulm84u8mvto9zqyeppj5fp3v8u7ofm37gee7ix0z7r2w2c3wz7lfqho6ur8w5nz9xpti5mze936munm0wj0wgocxl4wk5j0yrztom4ocj3d1fou7ait8e6gohi3i3q8yxwgjiazrwij427eaxmmkofxou0e6p70ucj040zewzez7v2vmlh5kw5lxtegv2fl09ztn5dzmxic98cd20az81vcobs3u6gx7h505562avv2k1eljs2b47jwmx8xi2ccrv4tifzlkley6ew2fm0qysonxo0ef61ftf19wm265kotl4j2cs9z7um85kyghf4bymds4s40f8fy0cfegjb6vgff1537bz0qihs685qf2068a7wwxq78g6us60s5g2mm536lqb1p8lcdi72bfst8bowbc8uozop71x4q6csvaazy6jy7szvh5geg0lhiy34mxrwnbhz17s56vgkorq64vm9kndyn43i9e5hq5u0rxcbtig9w676vg3scvrxm1u2hawyr9plsdipmdtxdybq0jukzcygbpeo0153evi6hiuzqdvwhtl73qao7ahphs70jmi6p859x9nd6gb7ohuvpqi8hxsppe74phi0t2a4vzcw266j15t2l7a9441yzxhtuttr4vxcebk7av6aybpdjolpvawb4st2i8207t5w8abycruqwfveqn77y6i09xr649py9ekusa8a5z45cgtb4c56zhlroi3rblyfvmq5tqhcqqcg5ivuwl0q3j0ib7wbi8ggmockm2eunfxjgutghzfde1hov5quzdqiafxq9u5t0lbf3gs9bxy1rbzbir7isdshpzi74wgpcw9olql2fztw958m7fvlhgfzf9d49tf9qbak6y',
                mime: 'ye3gylxmexo2akt6053tl9pakixtw4hd8j1czi6478s5i1ka07',
                extension: '88kce13kjcfhg9mdgilovv42vezfuyeqvwzrm0z1wqdo9rw4v4',
                size: 8129899642,
                width: 267896,
                height: 985378,
                libraryId: '3ddf1199-9469-4b28-a061-e3052d7f270b',
                libraryFilename: 'w6iyq3gkdyx0pkt2wh6zon61n8p5mqw24unce3bg1j3x6n12tdhx75o3mf8lraz1kbeyal9jhvzuapmdn5zqcw1qqwbowprwxkudkwa5tip7gpng84wmyo2wkx0a05sraf3vtup95jbeolshdrikj9jyj497iqwqvr2n8apakcvzqjwe06zq8nf9alebsplbtfpceqws3u4znpc4utdeagf4ka8ybb0npo0bpkxlmd06vnbx9rg9oe0brw21xtx',
                data: {"foo":"1qJ7J$N!A\\","bar":"qc3Ck;phaf","bike":28327,"a":204,"b":14784,"name":53057,"prop":"GZp!YyQSdj"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '00752478-ac40-420a-b132-5dc2ecac4b16',
                attachableModel: 'b1mgl8r919sas4w972atdsykm4diwq6h410bexnhtjw71kg4xey1piasam6y5glt172i33xofg5',
                attachableId: 'n9t5p2e9sbnldpddq8btvy3tf95qzlcg1w2ry',
                familyId: 'd71687d5-f729-4e01-a6a1-068f82b4fb01',
                sort: 794476,
                alt: 'pbta4jfv10cngv1tzrmcea02u9wupwmcsj0ussepqxl3cvhvcnr6urpgjolul5xz4qbsv0euoubffiwqe0dccvegoydbqypfilywld1ymmpeviqjievtqvcpfx96o2h94uh0s695bddo0afou517g9awmj7zsmh382poeuj5zevfz4p4d7if2hf5cpbvawzbuoexq68aa22qtp01l2de5vogfojr0ulqg78ltfau6u6188e5bt6zj3exq1l2ufb',
                title: 'c7pvagwbgh610mc91vspzbixobirmr17d16jlwhtcm57qe4ilxe0f9oqyy8h5ka6vb43zihrhre4aptgsp887sed89f6umgy0j2adwmup07bwxkim0mp2lj52emc5chcdoz66efmgp3x297e4akwwpk0kq4rj9yziv3khvsbr5p26zt8lbfqu492mkjsroq90zmkvl3sikrdetddx1hrr4m7h77bda1pslg2o02okkfaeq1pk2i7jwhd1qu2zpb',
                description: 'Sapiente aliquid qui. Mollitia excepturi velit ipsum assumenda minus ducimus esse. Consequatur facere ipsam dolores sunt aut eligendi error ducimus rem.',
                excerpt: 'Qui ipsam eveniet voluptas qui ut et sed. Qui soluta magni alias velit inventore voluptatem voluptate. Odio quisquam veritatis quidem et ut facilis sit vel. Nam pariatur porro placeat ut autem officiis harum dolore. Sit aperiam similique earum. Aperiam provident nihil nisi omnis non in laudantium veniam voluptate.',
                name: 'qwv24kyib5f44bxaq50ugzrdgbk0xty7b3nwmtwd7kw375pv20h9uvycwgngef9rot7kgyf2krtdywmsi93m477yue872519v2evtl3w0p7b6tmg4ladppggb423kwnxzf9sioc29bg53ico8f0lvuqc2rqbikam2bzou44xctiy9n5rsa65vciiuqq6tul57sj1hp2f7s51ylpg8uzus4gw9vpmsmv2kmk9687si04vz5mupmyhi2ph4xq4ftg',
                pathname: 'hv3bbis6v7btlawn0swb8nghxktzrllgo65rwci75uf4gygp92bxo4n3x8z9bh9axutgxrhv3tbogl24gvw14jysqlegyqgrkzz04cqyeud58jbhyx5ojijxpldw9ulzzemvzt75v2bvpysacav0xqq7833ehxzth1rbvcrikzdx9bxkdhqahpw9bkx63iyllap6aatw9defwmzihfijoze985b9avm8hg4pjexl19418lp83xqky7497ifkdr5tei1wsq9jc8z1co1whl15plpumsb2ljvmypqehcg9jfomndstp0cilrwd62mdhygubi6hbyixbvgh4rskhsf330740ki1onfg99n7tqr13105sm7w5lbinlyem1b8i8wauowc4p02oe981wxzqli94sa62pqnundijsf6rxp4agh0y15csz07ivwkddbljfrhipbineilyh2bnuwgbjt7nsl31ruq54l74ctypysmqnftjrv16d6pr65r4iz2u7b70njokiba53g66aacnw1y3pszx7eamnw78rwt8w8gzqzck1rkzn2ln73obrbv6cs7xhf8vmqbcchj19b1oywer2nj0oe0lbs7ih6icma5ob92xnopavcddjsn9e4zykm4k35puspu38ut8qwzffzgn9yroicrj26v25nyszfcjmrc87j6ahfn7o89d64yartmee3hoqs79ik6hqp80gmzb9fg97v4fvo2xtinlalxiy4v2ps4c0jmff1f5rrsmf54azkuu9kwtmnd25w8rupka3xykyw55p1khpktgfegg96bfttju286erxgkozphffcgnfukgfydy64lvdy9vmleuns23lv47xwwg8mg1iyoed3prvf81th0ykc4rnyz0sjwus3zkqv5aa3vpg8gjnxya5i7tnebq0f987oa8tj8fa3hikmtfk911cyx7chiz0ojsd923jomlc8ni6a132uyebolnlzynysjoutfxpanjoknnea5k1zd04xivruzeqw',
                filename: 'wxlhy97p8d3bforhvmwq1wzminxt2rr49u4bbb3uh7u9ixlncgx5m8gny8qx2apbisg8lmn2njpjljwyjx6fnp5388wvix7huiz2j3t5xzg7fraf4ofjsn5ynmqwcewktkbebiiq9jfe6m6xqsg6uimsmbjroi516g9by6te7g125sr39f91zkd39lvgfec6oqrbhfojnna5xbxodtifys7efp612kmyryytplm39l62gaxifl9li0oe21plkrg',
                url: 'x9hmtke8hxkwyhkq81r380es6gcfm6txjiy0fntg6csycfrl6z3rf1mupfn9f4s9jigtoh2395v3cmb3r7mxgnxlziiv8iy8ggr78uyag0u7wxe4cowtkoknjh0dezdn7c6bwg7p207xfkksf0u3sja4g0lssog0pepxxxaxgmeaxalx383ld6q1ze7vbbjfp26bg7bqkjf5hur6b7h5u2zquyxjn8t6xb05hw83nm6s4fi2wmw9ix4hllytoghi7m624yv6c9kozwqacqlgwuxv0fusfs3k2owfwxkjuqot3dszkls65ppplzftrbi0f4y68cwv91enlyqmijz01i10qhfvl75xb0yxzsh6nbuow6z1gem4wvu92sgjpg1as369y4aq8fg2y3a5jied9uazi07bs286vu6vdhpp6hwnwvzd05dvngc2jyk4fsix9hbkeb0pugftgwl5l7rsa0amdkb6cbgl7xqxb6jz6q159cfn3w81hq2h3gpn56hc2h3u4540k8334rt6cjnrc6cnixejx41wend6yamz7yv5qodaqjsdcoghv05efojaw17ogrg233znxt42vlqp7nksfxglxto5odv13zz3hqrqsbx8p8auhrhr6xbr1lna6kow09o9yajvgtm4cuzc4154ygizlv0y4u7rxk3r24bp7ij0okiqqkxonlj8w8fmndkqs833yqpkzgrz3yswth0swgi2cmtjc97p8qideb5qm6blckq0nyqds40ryxdjek7jy74zc1a7h18wlpxs329r9u4orxg45jwj2wvzjtcy6qusdhxhemy3z3fwfum0pkjwilt2pn4vqmnv2x2s1o32mqdcv4f8c5ucm5bi8baouek2wry22iyazcjdpdg3x4oyy8juhscxuvlytie5hd09o7imf5leoxjoy3ey6weey7cdf95t3qnt39syhlfxisvlzbnvrbgxoqqox73b7d9xpm6ftk4h9975a7bc796trwc1fgsj3pgp33m3vbuy',
                mime: 'o3esw0ts8sgkmpbwrcc80ao4il1fr0zkalegelblf4nakmgasy',
                extension: '9ylhky89voepq3gqhfxvnlfegwi2e4izxksm3vwkwp1giw6sb6',
                size: 6417330119,
                width: 884370,
                height: 872118,
                libraryId: 'c3c37136-ad32-4384-9b7c-33e33df63410',
                libraryFilename: 'q9maxr1pf7gc8faea8l66p94jjckttntiwv7upkccyfkxyxydyeqyhmfqfntbfkkj393v3rl5wcduo3cqu9m4qulue7at9jfr5jv06kyc4crvzti2ubil2yoe6iwgfj5z4pymxryi0svf1w06nczzj0dinxnny5t0p88duwt848vg8bdavpvl49is6x5fzwh47hb5bzraaccevzhtx9ymwk1axblm2raid2poev3apr3od16zn4qhr0874gih3x',
                data: {"foo":69835,"bar":76481,"bike":58023,"a":19446,"b":9188,"name":"MW=6]>v5%X","prop":87129},
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '68acef7f-b40d-4010-a807-b9bb38a91972',
                attachableModel: 'l1hs2634hxj3lpjh15zmtimf6cc4m0gmr3efsgmb6eobrarf4mn796vbodjl00dbxpinfrvutpy',
                attachableId: '4be7c83e-3d02-4e0b-9c70-77ec505e7181',
                familyId: 'dtf2ulbtxahkvoa1flf0lyfn5d5j1ai3lrhpa',
                sort: 508326,
                alt: 'aaexr53mw1035a169yfcc79c15a22n3gpvi08efbvy69vt82il3ymqhhyvg72h86y7a1tn14bfk4eutvissz2ja669qqcok08qclrwqdzvi2ft3aetq0vsw1x01uq812xm05j7zagitid6wkihwzji2fplu5ultjpevv3hpgxpgrgh6mwhumzg6opv99xawsthvtvvm32ajpannexjap5bww4yjpdzh3mlr2rkpon2aw8yovbz87f1y9qqe43ob',
                title: '8v185slyg30qw98ofr1rh6ai2mtkbro2kd2m4tm9e5xqeeaf4vgwijbw86j6yjylaig0vdbx6t1j1a3smzt0ggr3yzcr3xzk7bj5m6k8vh4oszchp0obvc02sj1porivlpd0g7f985fykb60z1cdftqusow3ngbpwibuepzu2bmhu05i7uf6fd74cz68ww87hrgjp4dyia1v7jn1z426b9x02b1w13yhz074xq9ai11bf9kich7jd6p6tp0optv',
                description: 'Quae et ullam aut et quas. Iste ratione nisi culpa voluptas. Necessitatibus rerum optio ipsum ea id minus. Ut id possimus quia ratione quibusdam ipsum.',
                excerpt: 'Magnam quidem ut corporis nulla beatae reiciendis sunt et. Qui voluptas eos sit aut voluptatem hic hic nesciunt. Ipsa dignissimos inventore rerum perspiciatis. Laborum error esse commodi maiores.',
                name: 'odyaul7qahkeqgoc6r62dncc6kx2qelotk0zknx7mrfyismkrbn2vtfnty28zdhe2nhvnkb9t5prbyx37v3tdjc46rn6jgp94sejr7y6ahembib8vpqurifqm1flhyyj0vqgbtohmw871buwkqf40fa5ig1uaagjmth5ewz1bg78miki5saj95nqljhf4zpgk5u7nzv1edldy7xcntlxoxsw3bx11ucywhnys9b2bl9d7ad0vq1ge84rrt56f3x',
                pathname: 'q4stepjbikdbfv4z5vobe36frg8ubxksd9l5mr8icc8qvj4gl0a8k4ff3norm3540yr18fmjyf0ufy64fa3n7bt6st1rtp9s6jj2d747n2agin7nlmo98zmd1w39h16nu3maa4ds89m7riet6msy49upqgbb274qrs3opqlouou8gr12qz4i482mhuy5rmonjumo1wkzym9l8g3oy1z5vgt2ab26ttly1cbj25hrkdbsv05nua844xb5om5xp9ehnssub9ubkyamnaq151phzlb0xj1vn4ji0guc5zulmgujysfdu0qj7jc9ow6ab022tdzwczoclqwct42z972pe8atjdq9fshq80w7folnvnojghb7eetie63hbv81r880qit1d178nzw9ntaugiz5tf4evu13zdeu318z9n2xxhukq9743qpbnoklo041fxtlrphbk52u9l5l0mdvk1lzulcowxvf1h1pv2x7zvki1tzoxhp6yk2fwbz8bv5ff9ujj09wyxcp8gug5yuswexbmrk4e20aoccopu3tr068a067rjxfnbj4uxrplnkpubykqazrkize39zh7tap397ai8w3ogbhupwpdo28dafouqrb747s05zti481hvtsvf93sc7k2qvs41xkbehwceulq6c4319dbm557bxbn1bnh18j85xfxwagbqx7wzqgiido0og89cjw6d8tlbn14ubgjv5r6wyqmstvfz60s9jhpwqxbo16scwxpr9aoednsr25kmns650jmr3ya8s7gdrja28d437zxjelqira6j6bl9azq76gdamp3w89cqfxkh7iwfce73s4akmntbbx1rfcevsaf03hz3i2jbo5vwmdkpetgmdixglu4tbaj0qg5rih52dd6q8sm0jd4yc49vloojw7qyccvcgp5xrkbafcl15pgedygu51tro0rmq5m04uglg71hw6qhnqgiiemyorpb3xb0uiohuc4op5epn3cwye15beyjmnbfe3gt8ajmfu',
                filename: 'glywc2nfqeljq1r52esdjwhwnuupaevn5qcfghzh75slh7rlvi568qp5kofvqv8wazg962lcbjzye7ilzu0m5asbvkwfzya151i90w22lt534jbr9bg6kte8s1ss1kf0xjg32r6hdbgw0mqtbc5gmw75fhiwnvhqxhbd6j4q1u1fhmndf6gk37km2apbzk4qji8rytefpjctnbuqqrdpdldzqqhbezr7ndzeyp4mwr3ml1d9tmgb0t6mrwgafrj',
                url: 'kfn3hzt4a3obtflro8sb5dvbsrl3l7xnj16eciapnv66l675cmvhm4fh4k31xtm2p0g23li80sh2jxgxmwvjw8l6okuukshqyflglzs62tg0pgdndd70nckwrizhaocyi2azpnda5kfugdu7rf98rulwr0cxbp5fde0q8zhf1b8seuqxxsj96gnaz0l8gqynljy9laa2yt6z578dwep4rf0shcw6z7wbatt8x604rryhrgkqtb6momq1b55y9qqcvmvkkuybccp9z7chbpavz0u10eupoob2w1d71jc4okg9277b79n0us1xfm1yq97g1zp5z8oax095z1rlyw3wop7i3sjed1nj807sxd4gui0c4k3qced1v6wswinrn6zla40yyas9sy0wgitwcg12vxpigtfvahp88gylybyuz6os33ycct3yjo5d671vn4zyd69w1uhy4zvkw0r1j10x3a3ecjcan586tzll95w07z5jhqhr54hbvb5nlll9595x5umzy1ds1rhjjo49kz6rktjtb7hy5swp0j90hkpa1pbyocjcr15c941ln69pw9ujub5shy5vwwzezhawkyrwfh8y0cxfqdd2otob8ynv7vcqm51ymgkhp8kwlg728tv1la9wah1tcl9vnxdv213azlrtbb7g896088bvv8b9wwgfqyqguwjej27mzytu7en3llmv9ewxhoaqquimh1yxa16bzjyvcavxda5uhq02oms7r1zx3eevvw5p8f022ydv3idh9zasdh7j39u4lhvju9hgx5hp6wxaaabnrq5jlsjxyks5tndu9exzjinz9ynb12t5j1ybglou215iix66kqtdotnhcirij5uvzj9l4xqolqgld41okbeauik9yuutgxwhgvnjwqjwtlwvpus7aa9p3m3ly5h22p0kfkpaoyjk3a44hue1dqieft7cw1f1oxzi2xadn0gxn17ln6uff8kbvn0velh97hky3ehfhm2v1dqnj7ohyf2afhtgifvt',
                mime: 'xyzq7jyxxa8dhwh9s8hq74wahugdp2ld35nu42v6e2hxlt98s9',
                extension: 'x0unbtl2l87uiozq6phkf8ouuakj1e5qlngmoxn30l5m3tzm6x',
                size: 7507736539,
                width: 419383,
                height: 803611,
                libraryId: '696facb1-a81f-41a3-a8db-2b0dad67669d',
                libraryFilename: 'll7pdypj4s7jnycp3b6wl91we4mtqkza86shdiqqy8hky80ss30uq3s0cq05giuuwgfi37occznho7v3f16ccq8fm4mkomklko2d65m5tkke9qzxb2iqjen3ztprup35jy2botg6oo6m0fgkkec2wj8d6yo1lrk8tdd5jyx5dswz7j1bkczxesw01gw5jll2nvh65kl4ag7i7ewksrzq8hd2zctrjk8641dchuoh1y3bw96v05we9il251hbnk9',
                data: {"foo":98998,"bar":50662,"bike":14569,"a":1304,"b":50594,"name":"#=yV\"W=4!W","prop":"*VWg\"$Kw?\""},
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c201500b-cae3-49c3-b1a1-bc9471978eee',
                attachableModel: '8rc11y14p5omjo1b58olmnt49kkxzn5l6xfseve3sqz8o0n63ucndw2v7aafczeq9cxutfy5umm',
                attachableId: 'f87f803f-c05b-432c-a7f2-90f5c218940e',
                familyId: '59f1b78c-f8e1-4fd2-b628-ddc6f140f4f7',
                sort: 590234,
                alt: 'ma8p8k2rlly3jqf948dmzcgnwhuzgdvclthnb7fo2d98om8a4z334p1yem28aym5ajajxvhbd5x4r5iryme0ligunuqazr07ra6y4qd3q9wce3yurvtgspzy9f3j9dq4t33vtdiflmqr2gpob9z4vn1jduv6rfwxfyy5xrtgtf84m6yphbau1hdfycwmb37r648ildqwe9ge5ic1sojczqzmjzxq5hge8yhjghhj93fnb2pb55db0djkt3fm7dm',
                title: 'ehftom83ys3k1ly0ujg8yl9ukjb3s1wqkxu1e8kmu9i1g0brno17a39ehbx2vv1bppmywj41r28tek0vlzrs66f7r7t6ngaoec9a68hw75ylafz4kyjuo42qv1xae41nxl67a70gne0nkisayn6fd8jjsckoba76gjrxa3l3qo6r13cljm4d17zq5l2hpsd09yu4rg1bowgyktjh43u3qasqjb14lxdm8gtbeknnawtnxx8nggi6r5o2g2t91c0',
                description: 'Dolorum voluptatem nulla ad distinctio consequatur optio voluptatem molestiae. Iure ut sit rem sed minima necessitatibus error et ea. Sequi a velit officia soluta ut ut error. Quam sed ipsum id.',
                excerpt: 'Aut illo corrupti et delectus nostrum saepe natus et. Eius nihil consequatur ab sunt. Accusantium unde odio provident. Cumque ipsa quibusdam non fugit eos totam quia et. Autem expedita repudiandae quidem dolores et. Ut qui totam ea modi.',
                name: 'gk9mh92p5a247jq224lcweo3qfiqnnnunsncljtf9nmkw7o9lj8va9f5g0uhmkhpg0u9aa99ic1fncu94rdpp8vlla98f2jymwxjjj7b3pie0pwlr1s785immuwis2isi0ouovtzndrzbinno8u6luumxhyfqkxi5ov0vxnnfa8miaru5xha76n32mp1b63xg233r1xpla0xea5nno7s7i6h5n215k5tn5xilzv54rn0e3c3g5yunb9gus0ca7e',
                pathname: 'k20g6b6dnzsexnl8m753s6tqz9uumjynwixsc1dt8rr4c8ab7m5goopslvetrqtuj27lopobdopvn2dymn4ywnchdfwt38uixcsrvte7g3vpeuahmpu3682dvhsnx20g5e78fbzn5c969pgz4fyuylslp2mtfvwcbkvx365aokd979y5hpe8l8llxiye40kvvq1pk77wfdfvh0bt0z4lbg89gsymeag22mg1i91desqmurkkkve9n12w00tk0dcxz9u99w9lzaxjzsnqrr0qgxhw3ifwx5ij0uhpg4iq3u0b25zvrzraincg3tlylgzxullljlkmiwx6sdcxjiqir3wl1xzbcig9hlspr8w2egg4lovz7j1x70zsoihwzse7fnrxstkd4cjnue7tccnazrgn7fev9izokfkjf0c5manluj5g71si6gurafsfr2qenxzwoori2ako7ba2ida3xitgch8k9xh9mnvotyuzu29p263glz4nhg7wlwnsyjyoqfe20sd2rkvwfa5fwz3yfzaf72k784cduf1d1ezovo1ch3udfofbse8rouvecm5vnvo0itbl1fuy52xnfg2xvw1pfz1603lfagddqrmija5irf8e57y0glrt15t2krlhx31ttypcgjh1c28gnttecld94qnezbayty3huw5b38wz8jg311c23epa60frqm5l19wa27lhzt2ausr96ezdhg6cniwo68jcnia7o7m5d01tqkhi0j4qqib4vycvh5djoj1tgxql5sqgcitmr738gs9moubwyuwux4cbxryupwamuq1jpwhimn7q275grzu5r79sx42thrio2w6fz2cxcbf1szecmsif1v3m7fmzfpdpbguhh341uq0nfnd7dbuc5kzgeq2e1dq1ynxfglemycrkgawug7zdgzeo0s0128lga2pgxeojei2pl21ol7mcfi3kvrujc6uhkmwfa88zwq444diti2rq2s9u5uyvjbntz9lh7a5gy6ewfrw2lbm8',
                filename: 'vvvm9zl1tiyr4ps2r8pid6bnc20u74z5ei4yf2j7i4yiquxt1jxg62hqrxjs0pp86qlezydk8cla17ejmlvmcoujlk1fc305wtaj7w1x3ost5lb13f67h8ctvpgfgbv95bxxh75akocrc4h5c6mpt6wbijsk0c1r652cgt8fq3hcvh0dth8oo0ar6aoy1xdbrxrh1bd8pu9ztnsz0iojv09t3wf2vrsgeghc3mdc1cil0mdpowdn9vqktw6wxds',
                url: 'i0vsxk14k0ngxbtpgz4vjg0qljolr86sgqlkpw3hfo6g1b52t7moqev8zw8nnsjbnqm6yhk081gg1brtacqvnjr8ona9e389m74njftux4q39fqpiy9qg4rh83swllz5r30l2h3ychlzin9m57c9q60m6rxteaz34iq3j31tf9dx00qgcmdyc5wlgeknfggh9p3xuaw9sxa34nzo00saj6910t96w5uzh9oixqucrnthkhn7kkuisudge36o8ak1qkiwuoceqi3yveyl95k78bgid57sb3w2dl5rjfhwaak4irorr6343rnvtewkf48rqcyt0ppjjae5kmzjsbwgfbrl8pkjuv7plbz58727miywnn5joi3286dw5r7h6hllm0iygkhzs3e3diq9bj5pix3ubk64yynzkboj21wao7uslsa9qxqryinm1kpp5g0lb94mo3zqi4uuu2ty8olz4k0jydpeyxtulcwnt8l6fyt84gbc5zmwchs1p2yyhgtvgpi02vt7hyj42nga839p3e798ql99ut7dkad3vbs77b30do1dvl2s5yph1xs3sttb1jxw3k8oeep3ausx5hc1ol0jyzoxnufzco0w5saeh1ctp3mgasw662ei6l5zlu2xeu9hwzt8666fii61dzn4l4wkljv6n87mc40k184jbw79ngz010fdnbu6s739xf4owymf2ko82ajckvwg8g0ghha6k5hjhwbft4zhcmump8gu9c4evhwwuw36e642i5fcxklzp6p102dlnk3rm3fjv673f5og2p0ksrtwiis7q6xghx0jbf6t5zsxirnjfutnm6br80zwy859a3sofwgo13ntmpf2ovp3d8jf6jzfa6p6bqdyomuh5mzj1cy3kmjbxuxkdhsf6aqdkqw25a543940soaqfw9g83zp9ku03oof8q4zc4hqghwvmuc7h2h7tz86ot7dp139ai8gvvaafht3flx39lkjoz0mkju4nzjfoi0rpjf2qwj1tvhod6t',
                mime: '4l8xlgkertz7ef4ntlrdo33rh7b79wganyr813hojejziqt118',
                extension: '0uix6l465ep1rb5mg77h01bjs6n9kv83u5ccjvv0eb7pivh6df',
                size: 7052822997,
                width: 553715,
                height: 874090,
                libraryId: 'qiq2vj04kesqw5gnc8hgnvucp851c83wscb4s',
                libraryFilename: 'j4d6zksl9i9vygeyr402pgs81x4rlls95as3w2kq6nva0xss2qhpvqomjxnngds7cxwe4d52t7lsg7p68zst95pqm8xp7haz2eicc009pc6zncf7fog57mo758fqwsiuuq8roc7eye8ste5o9rmccgjgh11e605ix7enbh50jg2glhjs2u3chfjb7a4cjva9z4picn8gbto3yvenex76vzgek0d7qkgdypmikwc5jhotr0d3ilmmdbfzlesm3wz',
                data: {"foo":"A]=U[#|#GV","bar":"}[N=F!osh]","bike":"Y+sdCAr7gm","a":3491,"b":1615,"name":"1Tk`LfvsI>","prop":"c$5xT[U3P8"},
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '73a2d7b5-f8b5-4b57-ad19-c6f6e65c94be',
                attachableModel: 'p1sa1iifoldg62lle2dsv7ab8nnf9kvb2y64m3qh9a4ao6txqfosarhsqmjskodyki4odwg4sppo',
                attachableId: 'fbad9de6-1ef0-4ffa-b0dd-149f827361d6',
                familyId: 'ef27846f-f701-4d92-af6e-8649c064b89a',
                sort: 272816,
                alt: 'lr5ylw7fs5f8p5j2q6i8qkl1ob0185ip1hkpusvpmhq4yduri38tv89kczj26byywbvl9mwt0igrqsx5h00timn3r5b0ia3p1n0yy6gdx462a8mcwjqqm2leq4vhrf0pta5m0zccvl832qw6xtncee0j6i1bw9sg0g9nxwvnlfqu016q9keauo2hsowm6phb75ixybbtm99r333kxx7667djdsoovdhscvu7bl90k3bw8lshftch3gtdt16n663',
                title: '37xgkz5g1edxce3c402ph0o2q31tvo6o2g489ok6bhd539fsyb948pme072jfhfit3ga5b4uij536fcwavtiqqcy1i5ojexrabsuw4oz1vh06kzyrk7rz47vov4eumx3uzoax9zrubfhrfchlrl1p6jezc8jwogpsvx8cqyrm2oio8po36ln1i1q4w5i3vd4utv9co8bsx9nclzh2jy1kzkvwh8124wk17al7ctws7rv68j3b166cf0krrp7bjh',
                description: 'Qui ratione nihil iure. Quis ex enim est optio aut. Earum eos inventore. Est sunt est cumque. Nulla non explicabo facere eum consectetur enim. Praesentium tenetur architecto ab ipsum ab sit est libero.',
                excerpt: 'Vero ut perferendis. Numquam placeat adipisci molestias ut aut et. Sunt accusamus esse non. Natus repellendus cumque officiis. Natus sit ut distinctio harum.',
                name: 'nnpy2oxz0h3jrqolvfcba0xnimrqe8mbz5cnkxppfbhv12fnohiu9we9kuemmphicz50eo4jbtxicoojc0xk1kshi0r54uun0bpiuqnyaha2469ka7lcm0dv9h2wcji3mmu1pon7c2m4nl7o9q5jq0z3jelg868mwwc2sue5yuzmntgy741mgg7xtz6iqk1q24eejff81udt6h372vib2u6fs1rl4dwsa8bmq6c7d0xm2t5i5ys921gbtlylq5f',
                pathname: 'jssk6lf31gnr97fwre9gkrm6ivzo86zjrdi33qkvzevpaujets791qoklztibyb9ldz1bgnrxf3bz3zhc9oiv1x8jkxeyq9t9a6hn1u3me91pirtz159vf2km9y94rwostiq6r9ylmymgsbmcnwhl001gz57d24edj9cuttgjjn1b19vi9zibg3umnrrjprgtkn89f7bojiqedyzr1ut1r8thtrcx8s6xhdge6q8qoll3yb3t3ywhujltfa416mb1rj8b12zgtijp8jds5n3f6eujue9eg2e8qyhhfb5vcs69i0zbfqivg8pyv8ksagzfsxwqjn0cjkcyp1rdxpeiwch8c6pauuj8prox03swwqae9kn1xfwn9ebt46yhrq1gpa7ozkwvi60ik8vto9d1ckeg55x02n2mm3nc3bj7gf44372ksjc21a9kudfxfg430mn1p5yt20olg7htsx6q9tsk6zd90b0tioayo3n4vznno2p46tkioaftp7n7s16igh6p6zh54chgzxqemgpxrwnifbn60iaesyyuvh1eiluim8cdp60e33pg78n5dr8vbc8hpnmuva5akfo2ym9gxibxf1hrzrc1seze018j2w2zji8zo0022lzg833lrc9vg89c1fzpg0l8yabrt5p721y7exy94huev25mzghm40umje0g8uuxueol0ddwc5yj221bu1odb7i2govd3ukpfa1h4zrma7yrr9sfjatcu64uu0giu7c47d10cyy8ow5jtwkq3n92mpulazwdzheu3x81hcqmqpvdagpr2ebfbvdo2q4i8ybkgg9uudpggwcikkbjtjimi7mrm10nrvr4w47avusa829b4k8yky2wxgqh02zjaoaxfi1v2cid6who7oq7pewv10fix79fraiz5ehj2tp0r2s100cnd69aql6pt3kdzm4u4w9du3qkb6awx8rhnenp85pixqy2o4sy13109ctdodm2bgu1b7pi4mboxl4wf97wrq45rmx1rwn',
                filename: 'mrlsgvkxmxjcjpj0wbcvuw00nnfweijotwbrkh9rqp4gnl6r3mw227q8lvkdygp3in9g76vcng68ho5kn5n8p5vx877mg35fwhy2ngfaddtcau3jrev9gfzpxsto8g0voa7cccd76mundf5ji2e6wcwgk1bxrrz1sb2ko6uhc8ds0fkrjyleeiszgts9hx55060bw73qvnvtlp7kfoqjs20hcwln42cb0ye5v9sofk0ae5gdp5ghlfmd10kbqbl',
                url: '5zus6mnx19iqnnhugbuv709g3lk71mmotsol2z0okpxc1h7ddfg6xm79tskye7o1cv037got8dhovm111qgo3xbptooeaemlzw42kqwof3v02k7rr5ejo0g890agt3adqctan0v0w6ah24m03zgz084wxdkmb99c8m16rhtym05uo2yr8v92oxlfbwvlh24gu9u5buoq52snire1udir3ip24jemy9jx1uegi1796r9skrsg1bsku60yqiafqgi4kin3sxuq3rd7lvjseo7yuqpyrlipi8klhi5iy7tiul4gymf2vq6rib38erbsysm3nz6df1zv9oyc5m1ptuq5rujhv9ishturx8v3s7h8jg8au8l56dnenhsao58nao065psunwio1i78qavpwa39e8ruzgzvwxtev3cpyipwtrrcky0fmg8xv129xydq6r5j5fetvnqchv7vlbplytjqxkwtj3pj6b3iw6gddeu0p62grmlar3nwjftizuvnh1w5jo4fscbjpiz6bee8o5yr4ay5ajlb6ctby7letmqj4wda4c0jurwdjqmp0h3cqzna15t9w3euayut6f3wbnllzoscec07sssds7zb8oxyx4ikwsuczq8o2l9kxovidx0p4dvxkqm4oxbuzk57sl8dnpwpwbl6dmjd39xz1i2vwlkunrmngx4lb2c8an7zvo3wdp39fgc4g4myvp2mwj45lynux0a2sjrscs08oenu65sjv6xoiy1m166k3gkvoozar1jf1q08xcl9e2av70ya81ty1eh6qils4wo9677kllbauy8kmtvo9bejqr2oi19dthjn7l9wpqoohrnirylhs6ijhqici9r0n3dclpts2yve0gmnjtcjdeb6gj0hyg3dlswwn7quqr0l9pfyw2z77q0filtx6rsswd3reqo54mz0qikgq4ap7d0thfsg4hc52r9h4yelw2ijls1lzfzh5ec296hvjt2l5tj4wztqyxpo78ox2rvo99y9q0dre7um',
                mime: '4a6ajw7hsuihkr353x72k5vfl7qgfg08cac5h55h1ifb63f1gn',
                extension: 'llu0ircrf8lm3osy5l83d0pu6k7i0x2qmqp9fx8iwl1o8r81yr',
                size: 3397515767,
                width: 996178,
                height: 696554,
                libraryId: '77d198e2-a9ca-46f1-b9bf-3e28c6011d33',
                libraryFilename: '5ewl778rnix1a59a1ufj6fpox32d068t2lmyuazhit7qvxw13as4gxqaz03yvwxagvveyx4eka332493z01szblrj9wiziq4vjq1xwc8g31irpabh2lit1w62dq7jdh9vaql53vfpccigc8i1djuk77z3vo8tg7doytvlum0w4n3vayrle3bj973pf8254l36r7pcex7133ypldoq9hzwmixq47ilvqe452oyad121ogalqr183qdj8aivqrmaq',
                data: {"foo":79048,"bar":"9l<M<1|F*9","bike":66094,"a":13913,"b":7650,"name":"D\\\"<ZJ';sx","prop":66679},
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fdbcd1a1-229e-4fb1-a770-3b0705fc3e40',
                attachableModel: 'vk8eke4oaphp5ri5ilcaz3hilsdw3e85qvxosmoxbgbimno38ylo0d7ntcw24sskbc5ywbetpju',
                attachableId: '7095f9fc-cb80-4e16-ba8f-e6b5bb535a1d',
                familyId: 'f49f2327-0d4a-4461-a041-a7ccc35f03ae',
                sort: 4116270,
                alt: 't7d6mkfn224c3ie2nkyhjdkpbcpgt7z75vf9999xos2dn74zz0hct45optger2artv8wj6rwk2ghsoicp5dy7io4kn3366tbmr7w3wms7rwcz4h5v12ubbr9rmah2kj7d3luhctbiqnre6n5zz4wn0l98ten4stsmi87qmrj5p32zez1clccyqf3nx3so6qkkhytvg34dhsp8k4q1rfg8e7l55ywxpymnn2psn7iozrlaarhu4hd5wezvwfr4ch',
                title: 'lkjveyhkqjb88jpct3219of7sx7v3r0i94njcqh8mhf8j4kaiehnz43dxxzn4qch7xcvmgb8jxkcinogngkf3v1wehowfnumgy5ay8hebczrliohy62kg9mt827ewfc9yfp5lcoii9rmp46fq28mzxqpd9j0hp4wltd9wlax442dhofokqa3t09mhg49z0nydwyq96rakgrkzwu587apepwuuc2h0klh7lw6fwacdopmcu2dr7zp3pu2j5oqm5x',
                description: 'Consequatur debitis a accusamus ut. Deleniti aut cum voluptatum quis consequatur nihil non. Officiis suscipit consequatur molestiae veritatis suscipit ipsam sunt alias. Non qui dolores sed qui quia aperiam eum. Porro aut quia dolorem. Magnam necessitatibus nihil asperiores voluptate odit nostrum veritatis dolorum.',
                excerpt: 'Sunt quis reiciendis dolor. Unde asperiores incidunt non rerum necessitatibus et. Ducimus recusandae deleniti consequatur sunt a in aut accusantium. Qui fugiat repellendus qui et et eligendi doloremque. Ut voluptatibus est et eaque.',
                name: '7orkxds8sv21lqx8iynzkmo6qc6vrodd6xqdu1ntwhh4gwlsanzrfln3jtqaas96ypud7cme84jlmhaldilguqftwvllt78rwzgyxozzv7ucbkhy5awbjon7g2zeo287mf3h306fyft4hjwrc1nvyj1x3v4wq89d5urvl56bbc7jf4agy5fp4xciy6q8btm5sps9q0mr2taqp4pgvbznb0rsmusdd4ajikc44pwp3uidf640j1rvqr6qgkqoq0y',
                pathname: 'l4szhmaostt1hxoudb3zpmwffp56kqnbbovozo7gmqk8stqy7yyovt4zv00ec89bruhr2gj02ltvyidyut4dqa1o7uqug7w3twr4pk2jwvrapqrkza5w1xu584b9o7t6bw3ruosjj96bbp0wi1cln4ffhcn3nwaliavrlnmccw4ecrpuwvrtka153is1k2400o1c6gx6aal59k7rxc1rpclyaec05fztf0fj4xmvcea95banxsmh215tzdjpz6sse6pz0rw2rfju5229mznvvc7699wju7cnui2i12jow95kidbhs9eykzujir5wa7vwv4222dun9qfz5iks5nij07gi4jy1uo6kfk9b7eb3j7ehfbxv53i0dzvcm11euogj2mqytcn5oe3bdidm3i9s5o8n6qz51hv3mhw801ybbumkkij3i17w9b8oxjk3l1y424zudioj3rwsh0klqg6bqohtirq6pv81uftht5sae82gyqh80onpcmt0ljsjvegspeivnrhdv1oosfnfpdtz42zox508cexcv66abh2upy659a1u5karr42wnqh6c2gn98lpa9b35v7i1p8hafuznn4wf2cv81j02zjl12dmxgqfvvtikyhmp1rudh8bg4ez6w84s8r5act2yycx4n5os0dy9qa64s7btsjknumg6dv5h0nwvyn9kciqnz2qx4xqhmvzuqnfw8wimvvckvgcl4zzofhnz8h6jqmkjvzwems4535g5n7mn92ggis4copz7shc112xyerk4r6jyhg97b0bvup7v66gqnbqf54baxhck0vtczjj9rqhbqbtdnl4qznggch1khrjvhwjojxl178tty55b1ug4l8b5qcenbltrhlixcnz4l1oas5es56krdhritbwjhp7i4xgzxks3tvcn199tlqmjz0ljz9p8wu4ruq7mxamerl5l2723bjts4go9qqjq0qwo7mdksvkprdwq3s83eumz0xh0njd1rzjr9rzh02illmur6kuaws3',
                filename: 'nry6bazpd8zthcderd6pyf4ci4jcygxxzhtv130slyw6ak912wslyq2wdcb2o4dvi5v8ddncy2mzz2j7hwnp62vp2moqhi11otmo3lv6vna9cydu4mtsj992jgy61walq0uaw0al1do6jc64uebouvqt72vhmsda2vcy08cutvb9f5wa9slk7hazwiu3zkmj30yuqitl9ie9lf6imshin1ynwrs3cbpcx9ww951wkeuicejg1riw60oqbf6k05a',
                url: 'uplql0h0sg3436rumsubzb7er6xpl416q2v9d0cg8yr2hbi2k18eb3umc6b3ooe4muke1t84bl1yfaye3nt2xbgjypgrup21w4v8jt2zamf348bnnkytovxv3ebl6gc0b8gb66m8unh7i50rpeca71dqh2hmu8nwihlzndohklm9kvf9yim1c0cnzprbz05sst7b9q9c3ei7mjeleet3rtdtku4m5fn2n0kq3u0ytixzttphvlftj7tgnzbx7s0pgj2uajysaixernn5779r4fme0rgl2740mnipldjf620cu0ls17dg6epa5l1pd26um0hd04x7eeh951zlfr2079c2tn6jvxlfvtovz5f22wauxuq63vu59m7437v6g27tc1samj7sgzfal1xky2wmh9dage9lkym2on5y6tf8qpfqglfba6otiev95is71pk0hxq54s9zyhnpoghj640emk56gmjnzjyczclzjl01b9u26eu009c7q4b3hxpg05tva1ulgp7cufjorsowpt7jszk8uiqmlepmq49imz2id3vlow921w1v1aw7erlk8ki60fazsh7fdks8nckcloeawk30tpc62xzwuc0v0nh000iz46u1cnsbfbfkipz76rgws4tj5oud7e0v6340g9cni15hi8uq66p6j693qp8rr4km9piirwpvtnkmpftk2z1yzy1n6vo3sjop4bdv7rpl72bxbpbyq741bd84rqz9oid495nrj65kx75kobnww14ql2gudfzqlqijkyrs5e3kvoae6cyx7k0y5blmcg8xdy45fmcytrvm25es789fggnaplld8ddephugl97ivbou0vqljqxbuk9z6zi4mst7xtt4oppj5tl1ov6cr42lsl93y2g7fl5pzbxxn6ps5rlt2dz1wx5bcsz8bun0dhwaidtt6u2v7ebuzhqg7ilrkd8yg6l88v0y5f04bi5ccxnqpz7k3w5a9lrti87c3uhnpf07xn1dcr93zp8ny51kfysg',
                mime: '1xpqs3zmjsen58h3bcrwanu7dsznu1943om008yflk0ua8dus9',
                extension: 'vlnr3tdx1tngf4v0u7exo96xlvcoka0izcqnyfiwy6ba5p6sh7',
                size: 7008282689,
                width: 854552,
                height: 777625,
                libraryId: 'a5add567-ccf2-44b2-9d49-0ac609b65e30',
                libraryFilename: 'rbvfszr98solnb5suyxfsymlw0im6umg07prfwhzm46lf4zu7wprk9nrpw5s4838qarv7nlztg9hq9fuom29vkg5w1nx4rjrr8j9f5n8n5wr313adec2s37ancpqhwl0yef3tlgr27bezrj9ti6gkn9l8c1s8gzrhhlylurjwj29e0mt0qnqyypewget2f95ixk4df0rmgkdgv9lowg4oj2pe9a7rj73jiks57zypxffev2q9aukjni4mawquez',
                data: {"foo":85095,"bar":"4Kl`CSb!;H","bike":53958,"a":"Iz&j/.\\=}z","b":79014,"name":98617,"prop":"-lVt9wBP^j"},
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'de975dc9-ab18-4af5-b505-e48e14defece',
                attachableModel: '06vpe0qthc7h09p22v5wq9zzgefy3nuu9kc0nh0ii327h7elzjkt9r9dz3hwy8um26hlqq56m2x',
                attachableId: '510f7e60-df9f-4580-846e-1728babff96d',
                familyId: '7b9a2f28-20ba-4874-a1e6-fcb57bc4fed9',
                sort: 352747,
                alt: 'jmob6nzkt9rhjvl9y0zmmo7f10q3e938segemiollav0yn139hkdfxlpzz9kaqcqi3dksv1pxuu4f1mn0rgtf02ofpgdxrmdpjeg9e6pa2dirvrqlc2e1ny3d05buop0w85mdfu6cr850nsuh40x6x7iakyzuuhptppml7yrze5ihjprc2qpwp6a0zcq690a8j10f6mg9s8y6bs7annrd2cbgcl1um8bhjqizmff8zwusq8uquff5ronelgmu6ot',
                title: 'wah9t9t5fymxykwogm3tqxn3kve51tj0u5vvezudmapi7mt3xmevs4myuhdx4j6diqnjjm4m4jgqmtdbppcnrrlrpar0h4l6xxl1o77tnpbbiafyg5dagg8ycp4yvgcwmix13ecc8rf978rmbdf7gr2demf46wotbg5fmk6ycs95q9yzu2i85gqyakootpi2m1oqjyam0wos5u5h0e21qtqt2dtd7tdkgpzzbyzvyh41l2kq94dyzbooxxuiq0v',
                description: 'Quas ea aut facere aut placeat molestias dicta. Quae ullam et. Ratione quod assumenda.',
                excerpt: 'Asperiores labore non. Architecto eos magnam earum ea provident quia. Voluptas illum consequuntur. Amet ratione voluptatem quisquam quasi. Et cupiditate doloremque vero ea laudantium molestias exercitationem.',
                name: 'deotk3uxxpgrmvtwzvz6f4f6hd53w8ofeqowokuac9kpgsc93q95n1am08au7iy2y81bedpq9ungd2bjmfho27cthuanzppdyygx5a81oq3lj83pjh0bvsgvuowl787w7nzn9hybji247auv10b7puqu1n1tiep7gejrmjnxcktcbcu0aacntprqgjslg6a3zeenovhncflg2jnrvrt981zulzdgqu3rssjkcv2bvafluirwarx052c9rae7nhv',
                pathname: 'pa9ir6bl9sv2g9qvrrj835cz2llv4dg9fpuldxrdlg77zdh23rxou2zhisdw3o9yhzrr6rrv5ys0z2052kn5x81yd5s2zhs9brfhqq7nv53kbe3irdgp6yhfj2zv8a3ljwjkf2hdrc8g1pr5rv1ud6hsq5nwtqklkoybqen7g5wk0kltli7dyglsoc24aaquj7vwp0w5h693jybnyazefhoveq9saqhpn5d0e6ps5w4pmv67eqx8ddlthl7wpzy2ua8mgpeho0030kaz61ft7u4et3h6c892ce008y4w4ghw2te0fwc1gkia1m1rbsgzadujuhp104l7elfwgodvt98hmma9aic8kklavc4eb588ecv92zzbuv4jj3h86muyzkykhge18l615vez8wv69v34iq3cd7sndkzb8qn66oxtpnoij1c0bhku20w1i50a8kc7nmrdvpspl7idmm1svvfuupssxfaywa6qs66i3yuqyk6vpg6e1oiqcwfyv38gwiwc19l6ikwv6xh5c1ykzmts0ddz1r5cdsowuw87y30c243jbwbzxotf5rcrrvma0vdmmr3uuh1zveu6hsva0m1tlmhfzmmbprlspswmndfvwlrm1k2ywiz1u6vcjvijch4lpqmos0qewfn9npst6fwfqbyg77ti9s242w61wt3re73o6tlonafl0qocw7pd3ghc5rlp5cjet1gbk5zgcyedmky3nzipy8y7foa38mrdnfokt9snv5khglrx38dx75rrut3pgh758c013td036d75y7zym43ogzntf0qzey1qq1swz5x0444irm6yfkqg8kf4slrflhpj9vkox1mlav3rjsg8krjw94cqnd06rnde8h4uq53x4hon246udz0op2pu6rjzx005nvmixxs900ldmomkbbxcn28rrepoft0bjb8vs5f2f4onnkg1gacgy31zgbzvlxuaiihk1phylfuf2ydar9u7bd4556coczodvvbnvlaqrolmftbevb4',
                filename: '53pxkvnezar9apgntxhr6lz3of0vk9ft4g61bg9hgvuqz48w8ogqs4ny57h9mh4vtu1v4iaha5ia2r5t8dc6jiaothg9k6yta5dq6zelcz0mkxv0bltflibng0jep0h9twrund81tgo71mk0jdj76zzee0hmy0b2kqdc0zbjyotjgjrtovxn68p593be01f6ofju6vlgtx853r6vlvpmcyyaia6cqzstxlqzx4uchwpq02k5bxydhqaqqr90lnj',
                url: 'w6k575eoa3ifyn076h9eoyzan297nid9upxssz0vzynuou88cwupwmcmliekkqcn68rcdlfstr9aa4q1r335re21oujv8arirf9kxdqdsqt6czoqrqyj2x3m0yd2dxxetyopv4dlhmks5a8ns0r7065ulnpcmpjuvxh0qnhvxqdmxad6gkcinq0if0pmxp0ayug4ro2wxpl4jnkifbzk0ciuemf7vpig9xotm50825p1lrdq6xpmcj0ido53cqldw30bmt51d3bgurvbpcqpg9sj23b4wama2nkufysoprnw5az1i98qiqxu6vcm524o4smwjs4y3oytgoot7dij8n6kyqizbx4m0xs6dumly5v20d90yzmipg7g4qireneiiyxr1xqccq1nxgdbgzgvceowp2jvqhzn6g87hp7l865j4xpg8m422uhue8fn4j9fpjsrkbzyogiiz0cv98yslinfklximi1mj0ohhrarxfb2qduabmh8lm7606wn6gejbo54kbgkjtm8sqllzj61mzw971vike5zv1firw0t6r3zdtdskvrgi0b9746d328o4c1bebxqiii42ajijg554nws7g3phoiofhfcx9y5nr9jffze24cp3w61j0qwulozwfp84gjmp19appi45fww9arfee55vblmzr1k7j6oxr145hbb71mu0ardi79aheuk12ry3yz0plp29qbvxs2h1hhh793xnizypeqybv0i5cx39p7dgkxtqvcsdybgwdjpfi6ffjt4b71wzauehxezslom18g9d8xsqz3wbz8y0tftwq5yjr95xr5md741vnz9hifx891qkp617ksedpv3aeez1fbdgje1emyiov7oi1qqu4h78xy8fxh2abt6lh2cuvrkdhvfhypo5gb33stkc9i8eu11vn6g6v4yr1mbafytnvv6aswpl4ulo2bh06pn0rfobvhosqd8b2oe49uesyfn4o2za9n9u5gevpsqjk13t0y4nwpyeaguppj3m7lt',
                mime: 'xcjan2763xnlpnkltupdouhpfaia95hvgrxxm42ow3gdgoe9uu',
                extension: 'xz12pktxyujpcudc3ryo2ls7ht4qw97j26ucsn3lr09v3kbu5b',
                size: 5560826091,
                width: 655761,
                height: 154640,
                libraryId: '69ec007a-18c7-4658-a766-5ba5d5cf493f',
                libraryFilename: '5wunba1ln3thu71hv5b8doruhiguq7k9g2r1cghvm2ckqv5y94yd7puenh5va6cnvj3ewd576rktks2v6hg4enqim75lney2d9cpvml47u8negebqm10l22z4x2wzifdh5q3hzh8i4upt9ks4cohjzkt1d43v86jwshvqnc3wc5c8jmklgjmoseuzf4cwulbl0z6cynxy1gromrvmvjvejs1txvfvcim6tfckl38iv4z7w4mye2k4v1xftoj85s',
                data: {"foo":"ot]V7bQ.\",","bar":87099,"bike":"}1SE_+n6!Q","a":"21sJVWk{,d","b":76442,"name":11703,"prop":94907},
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cd3a6ef7-3b8e-419f-a438-a19c40797361',
                attachableModel: 'umnj34l1dep657yxs06xhkidfsatlp2nr39bzrtnxtd3frrv195j8gp8bx25saywalbbjx8i6gl',
                attachableId: '9071260d-ffe8-486d-9b81-5cc8840c972c',
                familyId: '7c6a9052-84ad-49ee-b186-c6c4233a7024',
                sort: 188970,
                alt: 'mvn11rp8s1cz6q847ad1967rc5w5s3qkzlj2suidf4f72uccadcv7wgqc2rcwgb1w7maem6e5t4pphsrdupnc290wx0xdlgbyqsgagqjns2wfby4jyxntmh56led6jmt0apyuycjkne2mfe68cv2wvouwx02m6tjzveifwqi68surmmlnewykmwuhfuvvdcai8m8vcxnbjhnt8r0vvrxnoziv2ci5x6krlphp119i51675kxgoaym0nhtqstbt0',
                title: 'cgxem590kbw5mffma51nw8ytr5hrsxff1uqov0z7eozslgob8hr8jhlx04p403kglogvufjrn4bothn2zvb12sxgginjf9wqbhzwliz1ps4a1p4kr4jcticzvvb0x0ownmoyi4bwmwummvlffmuyesb8pyrjislkdjkuq7pfcynzetjro3nrx7lmqtrk095p5bkvfi4mpp8hfo83kf3d4c51h3p1ff4sex9o7j9e0oaxen9ogjt8skvcusxe452m',
                description: 'Necessitatibus sint quis autem. Aspernatur voluptatem consequatur aut. Vel consequatur occaecati officia quia. Officiis commodi qui et error. Quo numquam sit tenetur consequatur ut quia. Ut enim itaque tenetur nostrum autem commodi aut.',
                excerpt: 'Maxime maiores autem officiis eveniet. Corrupti distinctio cupiditate consectetur sit quam. Sapiente sunt ut ad.',
                name: 'bsgygc35namprsztdgki2vpuzyc3juh96ifeagghfbo6nh3cm2rbl2wuhcnij0p52iptcc1ftn6y9kn22f650ilewd4v83ie50ju95yhixkg3w4z97yv68pguytp50gc59a6j71jsjc5azdnrw988yaw2v3plhcsoe8kj4em4w1fq87xu8k4kxsxar4m51ex51ru1o0zs3wtmir6j9sc9njuy979tyeq86w9shidg86luf26srtdmsy0wbd2824',
                pathname: 'chmm73g2upevj5k5boaz04d3o64h3vz7zezzd00s9czsp9ri7glky32h4kmw426munpdpur2h9d4swol24rr0zfuco07lvm1c9mzyx0cuie6zwi9y5xto2ug4sashkaajso1p10ipyan0nv0psa2s9rx4r0cv90oecrqnih4qznahxcdj8syrybf7vpfe1wyjd9vinlfio2bowymbzlv6zpgy6wjbjm78i91mc68zfkawmvmfunvgkrkfmoglfimqgjy22lpblwy12wq2zvzceqafkj5zwyt8id0hen9mnhv9oad7sqylmjomguijv3olmwrgu3a2gsnrmbis4e7l25276ms50yqbx1vsvk31ri11gzivepwt5ay51z89gsqyx9rok2or96cs8mjdv8b1xonq0plc61si34y7tyr6ohevl9jbstv3zc9jysmuc97pm1s7ydahroya5gifugl6frt8c9f0ghkn5hptr1etb57s6xwcsuthc3fcfdl9hh61zvbg653mfrhlgvzszrvpkz60n2xe8fng7plh0sea7d3ebe7n3xij9305cigflgxsb49h81da8fyd5xas33wlwnhje7cuijwhvu82055xgnsk5gaifcnjkdm7htrnqhzzgy67o5yossleixva5m0wzncnse3a8bni5fiqzkm1cn7ehu3k22jgfo3sx5g1y0a2j3c157uo5itsgxhs6zxogvosx816l9h2b4y8by36yvhhba778qt45ax5pjp99mgekbev1m04y7q6sfm5q221klpymrry2slevz4dtljwmpjpuyv9n96eaupz208eoapmntrco1mtrrirvblpq7e8drrbxdt4vsssl6co2h2skdkkv68c3qol5s8h02uh65e4yuthvjlc5ub3tb3hfmgl6t5eadsi6acxnzwj5hpdf0tarhx5e7gtb622bv048thhgi3rnnfd04axawb5y6j8bukckzd7m8gp9q40x8yzj3618mm13mu04nbft9gyp27',
                filename: 'refqu1hvto872wp9qeq0c3nnlvdq0rneoxjlpj25p43coql9hm44gffq14neq112g2qr24c8rbz933fsauo557b7mg1fre6q2vkgfstjs8hnxxbay2zsk5hzjuahdcuem7y4jfd6dwi2ypftqe08izi3b0vtapbqvbr2gpn6l4wj60uu6zvsx1bdf0m01ai1qiweznz0a1at6rnu74hioask503xoa5koxpqz78rknqa7z924mzlr03fp8wblow',
                url: '4mlfbvrktwy7cvvilau0oslhu96sobjlkdcuut5tp7047qh6sfuejhc0j0j7tqbyxwzc8oxxa09dyqc8ue5smtmbqhz972vq7zhsqhaa6rgmyzyc5mpu6hps40qwef71khswgjva1atwssknm5wwr9qjptwrewydz5fu3ey1ir7kczggxn2wram0hi6yjsafa4h5wvupxhg20gc4h77pvoonzs48ug2pclxoidykdmv7v5zadj3qci8qvwwxq15wdvbzvtv9wum2ohvlu4rgmv258rgbdbyw5sj5xdkvqrupu2b56qvx8ekyvij1zihvszprtskhf4ozaqe29ecc4o21jci9ltg83pk62sskliq0zycqjaeokia1uangdb3cs9ofh246x6xyrriiozsh8wfttpwy6n349d3q54xbe2qhy1oz44esxlh94gp0wfod0trnt3femqcer90q314q6scfbuke74o81kl0jb3qu71gtoqy29qq5kumsmkr40i00a3v8ldebsfm0af9m6fhbnu68ptt3pp3w2xni0aw41dy7pbrla8bqcaejtflhb35bq3u5u6xr7xkxbq6f2tvejz8h62h7foh38o516xjf8j09j5mlw8demhwztwimyui8epm2tnimg3abuzw36bu8yzp1ogj06hckz4gtpe9p6euej09y6b5m21qz13v0wcaokwyxqo6wbfkfmz5881r94ji13etwo4zznmeyv378drvai4dewe2n8cwhgbtqdc72urfvp7dwfs5kiqn8eb5gx79xsdub0srt7qk0mmnyok119a4j30e9qjoy9tba3sf80xbje5bl39np5hvt157ht189fup3xouxzwaug2hc2z8c8m65kc8iwejbf26nwua47ljhmq4ya88n71z3ejtggbnvvbn8ir3rg5s25k2n5lh4e24l308hsxlpkvuxlegghxitiqi89smcu2pm86bihv9yc7778hfrf1kpchcdxeybpb0sutswlf5yqxuwblj',
                mime: '8g2qj647ccucma70a4ek657c3rg6upqc89xaxcx6kc3r9h6hcl',
                extension: '7toxr2fgq39ohhzuw5sjkxmsitru0eofu8vqowlsol17achtj9',
                size: 8227176631,
                width: 715769,
                height: 515281,
                libraryId: '31b0a62d-6c6e-48c7-9137-106232ca78a0',
                libraryFilename: 'fiahj3s5plag0gdb6cce1bd7qedhll2feqeqtbfoh1h252jq25c4pozem4e4kis2ezo26uxiyq41uvpesh92ou73wwu3sjrka97b0ddbf1ulcr3azggi1evqtelks2b1lro3usdyf5uzfbz9n7law9zso2i22zvvtg0b8u9qmx476ciegtao0fm08gy9j8cl6my6on6vwz4v4ee572jnq1paftr459hiap2s4n40j6dwtggufz0o92j0sm8barv',
                data: {"foo":31275,"bar":37058,"bike":"9xO}@dCE#6","a":72834,"b":"a_!^0mXNla","name":17843,"prop":"FNDJLG|`|f"},
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '808c2f63-538e-42b0-b34d-b183efd21922',
                attachableModel: 't2au6i5uucl1wih3b0x5g9jyje4djc8h8o2djkfub432918gqxovpgi9xptckm8ly61f201sh8t',
                attachableId: 'f50b1f39-1cf1-464f-82eb-e13c431d34a5',
                familyId: 'c3decd1b-a756-4c99-96ed-555a9b26d51f',
                sort: 145089,
                alt: '1pe1kr9z1qtp1lpx9bz0iwm69u0wrbjnv65dfigds8cogjw6bu5yhi961lqu6pfjovkluxkjq8sshu9pduquf4e91s4lzkrv6ky4cyvj89hcbiti2iasjy714jhz75yh35upf7orb081ovzj69vesxkpmja91tmxmpmfxzzp3p1myk38tqtcrn3dg6x9sgt2t2oodgk7xrlv5z18v93x9m2gcj3j8wxzb9g6lyji4acedl9z5k4eqpue6py96w6',
                title: 'vtsxihb01sfipjjdwsnxtc6od20b47eod379tq3c0uaum6o5f12l09vs1p15shsbykh96m6k4a4jzvzq3jmosfstgp6aamk4xwkch2fyqmp6y4k3eor7wloesjyy73v2pkqta7i62puh5m3egazg5qovkkhpo4s12b0ippmv7dl4u8w3ukg1vvqwox1nhdtxhg8j2qwtpiq36z9o9co2wfnmzsjj3qp85u8hcf041bz0g7ow838c4wq8qsyanyr',
                description: 'Enim delectus voluptas praesentium dolorem distinctio. Repellat saepe voluptate. Consequatur accusamus et assumenda voluptas nihil. Enim qui perspiciatis rerum et dignissimos explicabo nihil natus quam. Mollitia corporis voluptas velit omnis magni sunt.',
                excerpt: 'Esse et rem. Expedita vero fuga recusandae quod optio earum. Natus harum delectus in autem quae est repellendus qui. Aut impedit optio praesentium. Et aut perspiciatis tempore fugiat quod. Voluptatem itaque voluptas reiciendis rerum porro nisi excepturi mollitia dolores.',
                name: 'phi78ufcojipr4q4p9hlbg1n4zjlb619acssr7xi5n0rxd9bzy4eqn7esi72578q5nlo6uiuja30kzew7yo2uw6xikdny3simstx6fyfcswp84svigto35d5zdoua3r1xqz7f557r2vzrjilu4a8x302ew1m62qzre0oxgppt6x1pxgrnx4om8yzdwxtmnl9jv4ik5f9olg7faog8sen5xfqvsut2r0z05eztayosczzsvi6sewtdc2pyh8gx2kb',
                pathname: 'iqhh8yuk91he5bkbx5bxzznpf1r1w3sk6vvvgenvyw86mhsczlbz8tuiohx9jn3gpwru9scx0rwsi11d2f8wkynrdvppmoocrhkqtax5vtlbyzqd47ft079hmae5z7ltak85y58xwnipxoohc8w1znupd5h99iivgoal6la0k8744yo3mdxxfe581lbafaeh0xq0lfq38whbnyl5nyiigvo45cmf02z6m9iezirw6ee82ee3pg4bl85yh5sdg5mhacg1pc9sim0a4aph6c2w5o6umiv0ji4454lfi87dm7tx0wfpkokryx55gs3dsoj36xowpvejo55fre8i4ropf6hwpoai1puj4931s3irc1tf2vouvtexq6nuzxdes2509p31twgk06k9aqgjv2himo38i8ov6jtgc1s2d23wyvmtv3goe3opmc7ly0pv2mu3d28jvlfuxvqubvelac1tgz8mcg3qcnk9cvxaa41bho0vtg2tregsqw7dpod5nurdcwnehkekmv031gevzge28a3xdwyj0oe1ow4bppz1hxcjtxbk3z2rd1dpy6rp2cuxx6vgbp1njtwutnya0u72y05br48mrgdowc8bjasza414h9xvdi7ardgdq2cg17ijfyigfwg3kh7k3fyb8yzm24fn7x33jj3gj057kv3q0xeb7ohvefsib5hi0o6di9gdtbhc7iqxwh0jih5hw13yo3esalhjazfl28l6yotrwdjq51cvuwtdfymsqibn469ccdfsin1tv3kzx6fuaq5m380k7bz6klh7ealq5b1f5tbognoc9yvrz6i8j7vrd72azfbs26825gqtwrxmixbwr49q29lo7bkkwze81ntz0u4uk54ksnti7xghizc1e3x8c9k3ml3sml4qtkwt9utkjrfdylmg7ycej9vdzvh0bqlozkjrjksmij5f4l1kdaqw2h8gvten5g8939zjs3xxreiw5uccmqdm2p5qql1l9by4pwkvwlwhmadbycqdx6yx',
                filename: 'qx41vopipqn4ralmysni178tmbhjzujs3ial1897lr0w325cnp67zeqjnm9xuetguc9s57oishiwolk8rrjhlg7sngit6lime65f2dhjp1jmhlz9hiq0l1tk0k43ejehdij2ea958g1ke3x1nx22f7foyly1zwrfut3nr3h4pinlty3zmbrxmzw85qzbv4108x5tsuj8rrggnnmc09qsm7zo3xjt9mpibl4dmy6g1nbefx6hk1zgwnw134m36vo',
                url: 'axbhgxxozjs9nyvhdo6348oana1px3zc98gvxkdckgv76bwr1kx4skggw5gmvd0g947rcntnto0htbmm8rmqb3v2rx6fpl8loh6w85syi836wb733z2b09fm23aludk830z67j9rek53cyybwq1ke50hoyc2hec6w4c10fc3jkgdxx5pdbk7oi7i954bw79478jntv7o461j87nbycminagwlra58yjsm6vu7ljnjto9ryp80wfg2iqc0o5ma1j9l6f0g2egmvn0v5u5gq1hmhacgstgs6jxz427j433fzxh634gl1pq180dnvt8ztnd7drag5ss7ujs3htfp7s1nxupgxuey7eyxj4qlxlgaci6dnrw2hcp7tv4riu87efnhqftpd1tc85obhn8q29xwgklmlxpm3hijw39oeg0cdw353t0frhyznqn9ui8cgh1xk0eoa19ln77mw0zxqe1vblgivxzbfjyuaorr9w7unfps5j7ueptq57p2rm6foylr84jkpz8wnhudmz9ke9iu6s7pnyewhodx44rhuydogz002kzq01cy5ko9k74cemwd9k918wlxhb0y78tddhus6aorinyw3v5nv1tu4bs862xfq9wo6yrp2w4o1a8712lx7ovl6do6q4yshdsoqjnhli9ps7nciiu66n2yhucgzvcnmadi153qw33knteu0z5uzsofbx40j4d8alh0qbu5kbauu4mjwnfkzvz7xy7zlk8p79dmb9mnb6tz3o7ledwb9qn7rfpa4p659j1bwk39ei65tqer4weow6ybrm2ih80jp6xuo499fwq0ruzefsl2lrykhr3sfhnezfylbksi7ch0zty07sy8vpvpti3v65cc4phs3jdarq05hbcz9ell1iqojpwb8641q6v0yhs3974afjt64fybg2outvx8wuyporl1war9o3lrdksrlbmhljp8387kg63jhe9abjq0h59oo0iiyln9roh5jfsxci3mscdoohwqnj29m2kr0vo',
                mime: 'cmfsi6ov0dj5tjsuu1x9b4nx3anesrmx0ar6m6vahbm20suixn',
                extension: 'f7jw24q7ld8i3rt5tjxc3t3t7doui9tw2ewk3d8hz7zw5vonwk',
                size: 5325644619,
                width: 723828,
                height: 467060,
                libraryId: '336f016d-9b2e-4281-8eff-4b13a49ce3da',
                libraryFilename: '2r3bbd0q3fppo4von9b74s0nma1x8ck8hvtb6qcfky3sz292bd82kkcu40iii0dihfdyum6893i1tfhp1ic6e62bm7lge5bq32hlr1qh7hth89ia0feiu6jk7gjng33z5uqak5smiw1dmcp9eg8zc65kdnsmch9uxkjyba10hodlwj7gum3sx4a92pv1swh6i7fa8x9gp580yvf36fx5kanj4u8107sqm1na2x7l5d2971unhnc1nbs0f4ot6a1',
                data: {"foo":74515,"bar":"f}5n%s}&o*","bike":"\"Sq]'H'PK2","a":"y.S<A*ZHGL","b":85923,"name":"[CFEj#q,GV","prop":87742},
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b187f2a8-c588-42a0-b79b-fdea6a259433',
                attachableModel: 'otk88ezchikl89jqhtkbt3ol7xgfybppp7weydlxca3umk2wta2cnp79326fpb6b6s0cox6eilf',
                attachableId: '568f853b-afef-4344-8327-84a3ed89c1c9',
                familyId: 'ed066251-80f6-44c6-af2e-d421304035e5',
                sort: 960094,
                alt: '2warquyhyvthl8k848mpbdcf6v097k3yqh38kkcj5ufigrl478580p2go2lva92u800nnq8finlveekfamxit9caszri33thumxzdftgonspq6kv55o908gexbbdsz4165y110dv5gonqeymm4roy352rjxch36m69351x544v9edvybno6pmd86qtzwiyqwmzf8icqc5lclcmqenkklnyc3yoe5st2fjn58678ka5hppidwd59caow0otpsqp2',
                title: 'euaqedxrhz0houl0gbcgviy5lal715osmofqd2vhbj9fq8kvxlwh2icrx7bdzetrn8dowva8mrh2b2lbpm4fm2thd1x5kmql25kcfkfbttam85ra7svl2zx80jbz5fhcfxxwehmxr2joxke017vhw5z3psatoh035ke1oywy262uy6tcf6i7j6gmv6hr2lyled5ukz8cnzg1yet0kwiou0817o089zeitka2eep18y0odka2qsr0cubrq54yry0',
                description: 'Praesentium quibusdam officia beatae rerum. Distinctio doloremque natus. Libero voluptatem accusantium ut cumque. Autem suscipit non dignissimos. Deleniti eaque et blanditiis laudantium quas modi.',
                excerpt: 'Voluptatem totam aut tenetur in autem laboriosam. Et explicabo voluptatem aut repudiandae maxime quos porro consequatur. Voluptatibus sit provident deserunt voluptatibus dolore perspiciatis est quia sunt. Occaecati harum incidunt id fuga consequatur pariatur laboriosam. Unde commodi qui consequatur et sunt. Cupiditate quia similique consectetur quos ratione nobis.',
                name: 'jp8gul66tfo9a970linlnr2owlonlbkrpx53ljk7h8ot0y6m035q1lujbadwiz2q3w0cbldkhqkgg3h3grsgnnut0zy7ticfo3nhudnrvzurneaptrzxhde0uwf1oxxjh0kxl06xnpdsmqhfk13t66xgv6l4wrr0t4t7k3dtvva0ci4oql3bk1a1hcierxd4q341y6ytln8a7n576rfpvebk653odqk2ybom9bk1xylaj2is5mi8ojsdztd2qof',
                pathname: 'jrp7tgexq6r997xf9i13fmjl6c5a8skpoleec7yi6rq34f7hobx9jqltg2gbuhh74agom8yd9fuxzmdnrevrtc2f1yuqujxh5u5nj3h0alwt1ekkbbz20emxdk542r23102z8ag4ls89svmaiz2wifq2n9li9sivrykk8ng2xjcp8ee9tf0mug1hpnanfxdwk1a3fo5yc2hfd8670yjm4eenkz2g5tb4dbvxnaf94m5a60exdhdjbx5opuu594sqw2mwmppfj5obbjyjiyvfs32ugumbz0vsayuwj9o2085li8oenuzs2ramago3uvlwt3fi0lccnd7ybbsbvtky0909y77ch9ezw5bje9z6m4l516ank13uyq82iczt0spiko5b8s71uf9v8fly5fgksofi3ill94g0xtzux2trm7ldzx3u1xy9jy9x4jq490yz0j4z5xci8bdpum7myyaprthqojp84moapdm27h4y2rkssshye9rw2sy9aumkh4l6cnvclmsjmkudy4ugjbamr0oeehvlnlh4hfohuxc0dffnu1gbxho2bxvzggyaizjfl9glpw9pao11rlltsq0uawsohq0dw7q4q8hs25j6ztzhqd80yk1j8e7rxthan49zoex0o2910ol4xlvuc4fmcjxi6okol8d16ptoy3vqutzho2pga8s96x8qey99hna97ttn9b5pjom12v594iordey1djr9lpk951dau1lf3h8j1lne0vjlzgjyobhqu3g9k778xyvfa0ioeqj6dz6ggzsck20k7daj6aqxwnleujukjjrzrimd4yh763n1gkge63kma1eyd4pxvm0senil3byy330yrdzx7xwojqxzj01u5sjoyp1kdfsr10jbaztkncnynsly54xzlnrkb9sn6ey6dzw1spu23p5kt81dmmhgfdqs6ojruhyp4h79u2s4ean7uyib27a82gm7a4mey7u6l865p0g1gjvmewl81kqrwzud51ib9u8qcoktvhzsw',
                filename: 'q0o4ds85m5uandgzgfrzfiprx9ac2od7torhaqgycuw4casxd5azok6h0z1daymvdleyblte8h4wl4r2y8knmv9uw9eof0nfiu8awo5j91u1y57xxv9u66oqnoosii1mtuokm9lqmfge0jimohqtmbzy95wavqn9himaqtg4hixw3yh81gxz5pixxv39ixkvl0s49jfaklhlmno409duttcxnk4q208q1d6bo3tc39b2l8k69rcf5ka0gpxybrf',
                url: '248uk59n6lw9ha22xfsqhb1of07gy99tmqohes4tiy48ld8msy1o7ddn78itpk83unrp5hcj2v7fdzbv1hthps2fyixwk89ax4sng5ehe6wjmragbej8tohr4ns3we8nefe0pd8sfgjhs886l55i1h3xoguwfd048g7w12q89iye7q1e5ft1bfirs0kjrsu3487vo18hzc8ntqaluu5weuaaoxllhwx2xszq8afv3v5cz90w61543oefn6ie1ckqo7ga0oskl78izfv3ewpwx9x7v66x30zj7cyhfatiil02wiur2me4wxr7323mowqtmwqslievgtonbieouon97o3sng2mca3aaupmpyk8132n6b3v5s87h1ujqnvaculqfs3ijh35wg89n0ls16i705c30uob0aigpynruc0zqqgop2o8h16kpquzqf5kew7i1zeb342gd25qeu6vmyes7w6rofxquo76kud7qirqt0u198w2muu32t71av01uztfeyqjfon0me2xzyc164hyjf1jawodht34xflhl8hz2tq8w5v3t7mnyny80tptmmsz5frdcogj2r6ztveh8sbl0eku8wa240bbudlwl84xex8jzzn9oj7roegpst0aizey0hg342xllm85ed1m6kbte3dfsewm87wb7hjar5ge06p1kkvdy0y4a6gjw7vdzklp1hvggymshwp9b9n3t3f7elrxeo0c0tz3s0fzezjtv1g96cy841rars918zwxmo8bag6rl0j9dn4vqkeawhen2vblypeer3591hadj2uwbajz7inz4sct4gjzlaeepw2vnkkooljelhj5ad532mwynd9pgrizh3wk64q5i5sr73yzbn8wm95f3nytmnt2ped2lmjbzv2uh89zoeeyv2c6k4kchdvt6k2pnu8sy219q0l970lwhnnhhgilt23t7qmezd8jtd42lbufac85oq6833dathre6bimelvuutd2x0kn4ynsgqw8f67nlsr0v8wc',
                mime: '66c2q5dv5dhgi6m6bbhlftau982olvejonnwsp08xrxvq12y06',
                extension: '5jhe1kxw49t4k77l0teayp5b4aizk6e6qjxow3g7x2j7pwc7n3',
                size: 2414360252,
                width: 615521,
                height: 820499,
                libraryId: 'c08dea28-e0dd-49b7-97d8-32efc5d17556',
                libraryFilename: 'lufg3rcahdyxejkx1ds1etcwb7gokp68sl80rgkdgi92k2cksrosvc5cxgpws1ar365vgs2vk7z72fv6td22gc80xbun26ezz57oqww2e7v3b5xe996t704r9ayajwjcxc17py13h7cz9qj48fz0g9ivzmq23vjktvzcwppuw3s73b1sj29j2h2phbgzal1dhi5hp8cjatn88xqhpa8zngr682gp50re3l76eq5kvdmvaptvuiy2jt724xmkdnu',
                data: {"foo":"5IqZ1{)HQ|","bar":")ncU(i^L)D","bike":"jFq*VDj/\\|","a":"mFQ-rN}/um","b":"PT-5+.T)K!","name":58579,"prop":"`V@8-9u[FS"},
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c74e1622-961f-4f33-9b7d-47fafa1f12d2',
                attachableModel: 'qx4lr4ar3j1gfjh5bdsjjdfwy5yqbbijqwbqf2kstm9weht1unmfisak43awl8gx7vsbt2flek6',
                attachableId: 'fe4fbfb1-e29b-49c0-9975-c121fb24c52b',
                familyId: 'c8682da2-14a8-45ff-8f1c-1e068a3380cf',
                sort: 958148,
                alt: 'gjztfaqf359gzh4v5ilo0sc98d3el1faegy7r55ytc0gf6doq3rgpxl74da1y4j80fvq8cl62p7fc88ccntd51j38wje3x4oqx5u6h41kqbhrgm51fgwg6jz45su626ymwaxznc40v8xditdyz65zjt0glsxtcvnidixi42n3gcoo78usga9zidhuudwclhwyz3sb98cwmio3eobjizseq8xm62rviti5jpoj2eksuwjfvhbstiilgsnw9gmuwi',
                title: '5blcdpt2t9riyi434h0ymn78dfstg1fjt67mgjm2mmy7oxktus03yrol6yvssegdnodkhrvqpug1z372nqjixzmn9xfyektbqqt4mk5naurprxzp4t5eyct996xt8j3f3mqm8j57q1acbmjmoa586hn47s02vu5niro3j3p67erw987fsun5heg0ksgk722wewa9ilkty3y83z9umm0tm5whc0ffe6pjw077r0mf20gnse7fw3drtu064efa0zw',
                description: 'Et voluptas atque nam consequatur numquam est sit quod. Voluptate est voluptatem soluta sed facere ipsam. Et et eligendi ut. Nam velit officiis libero.',
                excerpt: 'Et enim quos perspiciatis. Aut nihil sunt. Sequi est beatae sit vitae asperiores magni reprehenderit.',
                name: 'kw5abc5nd3xqtdelqay7b7qtgjht09bzaziren2edkiosooni765e5ro43o3janjtlbxzs79z56fk4ls2hyhyv5lv4r9fd8ybdjy0ler505klkxvi8kp8h6pbwb0ubxdyksb8ts55tx0cazcuusc4xr9xfarmejyw3wk96rl05st0r0j240pfu82r69uh3bzghabojgnln5n89kzos6fpug1jess9i2grhfaqrm3hw0rk6hybes4rqw4x1a7wr4',
                pathname: 't718wxh3b7j721ggkleikr7ba0u6p044fokov2fu1bu86drcgvt06zyweh4zpv75p9p0z41mxzuqvb76s3wn4b3o03vw0pdw0m13ca8r5yrav0uj2uijvdujw0tmb6xzp7zmy4tddw619okc6zxzpgjvqjcl08pp45gr5bd4hswmixvhs2juun631hye53orx3qxxbtg2llurl4isa8k8kv5rxe73cgoymws5hfez4uvpppwrrxiki4hk7ksjpa3ntzcvwyjdim6ww1n6gigmo65teleehdyw87khz6berd3yqrvnfp4aw1krb897jrbgnyhli5llurkqe2m7a4o21ikjjhfzalofi6w5rfenfxrs79dtefl4bkpqbk0u52974ktx0m4nomvg9mijc9fv4au1tkmn71x89t5v4hvi3qr4y5jkechaz0cgulhkwsqyhb3pohvbl3kdlq8tj6camkxqno84xydm71ykvuc71c5wed1zop6np678uioq2wi5nfc4nbiry1bcplc5lera1spvtjwedz1bsa27ufyr59pdyqlk4twbwrm816eppz84vewqgvnah0oxjlyylgh9cyvqcn59m8nydv06t0f5lcmr0b1smcg3jpzmvd9cl6fkupksa145ajmxkmnbch3p47xc38lz6bxvlkfavprlr28vsk8ewrt0a1mjjo1zw4lzd5ru7psldljq4v5gyaxxuz450e9l1tk487fy80vodcxl4plwp4jtgrd1wimravly8j7v2n5230aeiwh3vz2kk6jkfligp0g67xms7klf0ni9npxdmd8r6xtbxzcsts8cf1n1s4b2is93t4krq70mq3yx38zpl2w1yexksecq5gbflu6c8vn6kz57vpc18fptlg4ush3fcblyck6zockvc9wnzj50cpsnxc70972v59x67dnpm4eserdrolas7knx60zkil0kqv6dfihedzas7wef9nc46stl4dci8rsjh7gtpondi73aqfkwb9u71eq',
                filename: 'z8thewln19b4iavnp266vbnu389quc9qtxqp21to1e1xfnjp9n5ju93mnbhpgdo06a87hjtnm7t6gsrnycznag0xmnbvf0lfcheyjwjpyy1uujs2lmdxw8ztdgp2bgpm4l12ci9b6ahl7yt4wp7xl2ns1qq8b9j3k9r2bpjvb3a98yws0841q6yca8or70ho9b4y02ve5tlxocaig944ittjxr65jiuezncv9lu5nr0y5fwq0nu37lhtjj9u5icz',
                url: '4vuc0u5tav1po602xdh281jrn764s15fkirbqek7q75jor13idiagx5qxlmdiyybqkhuqacetr2o7mto03czhde1c7je2y4v9n5iogsq5viu7b3antrtcx9sy3t59605ls3ib1zsaqnuraady1333uywkzwl1hi1in3grgehffca481dlvd5kzczan96rky3cmld7en4vsftfk0ef1kp96y14ryyd8ofj9ae6q9l1opo2z22yj0rhl2oxw5rose0v96t6ebd0lzrygb8s4cmj9owq6jyrt17r8fpi13y3rf2uioecwi3st191ize6zeldanqpr9bk3za5hjww5kp9zxvfr37t3mwo5h60m4ycp47hk2f20e6koihbpgy1w0z2efxcc8hwqjw22bnf8dvlxayhhy402gnwn2kwzq7g6sprnljd55z4ymeibv111q5uar7cdmlhvn8mccousfzpjrzegl242e95l4231n7kuwxr4vqwga7w2iewj0qv2qhyr1ffijn35nlbqrbb57ot6gg7jtamtelx9zml08dptspd2sy2tlg39q3836tkogvi5v64u9s7483i902x2h2da3uw3qa18m7dgy05s8pkg75kvct3vtqiq26nmgnslwqqs4c3960hcih8w1ijtea6aol7mzdtq69xg92l8gqmxdmds6q14navnsjecv131vlx61n79sjzt9h8kff7mwmwxo38t6uv4x602wva54hch8r6x4s4x8n7yot5nmq2tzcm1kmhw4vwxhqlwsui67d4elfu6b29hq2nqa10jhukhv3o808t8ml429igcjpfwpweny5o4rgebe6x8ycb58xfvoa0twucb8a20utpllivnvyphm6ykh53y2j4fumgqfz78t8innvh2a63fkcox1zifx891xqxuu4myub8lfyo4ql6l9kbggot9ju1lv13wb6wblzd6r0q96j3lhdc6p3co3yw4sbbke0nrx3e527tgdvq1hmvoz9rzfxcaakz5e5',
                mime: '9vp01nouorefecn8uoeznm9l13e564zhwvra6m9v9nfv0vthbn',
                extension: 'pdt2kndtq2qmlggar5izxcr67kvmf36et42ojo3dsgwswt2pk3',
                size: 6308624527,
                width: 216157,
                height: 230130,
                libraryId: 'cb42581c-8029-4bb2-b720-4a8b156a4515',
                libraryFilename: '5jaood0157r4n24a13x16u7bdbt59015f3gyuazb9i8ta4ftnbdr9sd1sem54yrw0kphm4f3xlhl7xf1fspryu80nvasxg7a1o2rwa3sderhe26yhjcuqzg2xuqt9kmbnzlf62zu14fpelz9qvn62mv1qv349vvgry5rh9fzcw32xnv3j01cqwllazg1bdhi3bajxlop08tqlnuz8zbmf7qxhpa27wetmduzek7hat15ya8s580ave7pr100oid',
                data: {"foo":46556,"bar":"3'W#@ZJrl4","bike":51230,"a":"N3B`}to|0l","b":86186,"name":95508,"prop":"7R&>@q3$t8"},
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ab96e7e7-a40b-4ef3-9d4c-6e826cdbef35',
                attachableModel: '3tj0yzxp5e1d3pefzfmp9j7odmaffk58tp13u3f5qzq026jor9n0au97x092qliz1rjjsd3prgr',
                attachableId: '8f5b6f3a-c027-4b4c-8430-ca3fa194f64d',
                familyId: 'd39eba07-7d75-43ab-ada6-8ece3554873a',
                sort: 877245,
                alt: '8crn6j79sprp8xc5sxbgptxioe39i7q6rit80j4dqo98qi26sn98k4kdzb15aqlzlvpmdc7pzm3g45j69fifxl8f8ndj7zmcem16uh823721v1g1ytl80k5hwtvc630qlg6qb1jxayplunh1a0gfvccrq2yvo8gm4wh2iv6qfpc11zukrp4mf4wjl3selefk19kp4icwykoe6n7n9bvxukzykktlcugpibhsn2xjjuf8ky5sowjfv4qwqte9zvb',
                title: '07epw0eock9u2qmddkq5y0s3goycd3iw5jk57ftlum7xxqlplborv3cmej2e2v224s4jfxqzxkz6gfj826m6z5sj98t8x8aai04c0g8g1nji9r25j4huqsuw00g9ltdu2x66ma44sjpyfm2jr17179ab1e3jtpe0c755zy69uvik24748qqwy2pq981zzgx7dqrtmzf4ueoaxpffreu40eubhpe1bzj21kewoo3owqf3bt1vzmzzop6pkpepqa8',
                description: 'Eius ut dolores non provident ut. Ullam veniam quia aut qui veritatis aut sint. Distinctio voluptas sed eius quo veritatis.',
                excerpt: 'Inventore vero quia. Eligendi at laborum. Veritatis omnis fugiat illo quia est ea.',
                name: '6rdyqfspf1c3rtk9w41016nrjnj3er5aidpf5qe0pa5i172zamvg0nnf9gl727g09sf36km1o5lxjx3og6qf4etza3ksw6eds7nzobxe36jh3z80mm8z62pexf4pnqqrkyscf08ejdn11078nna7v2mqf5tsqasd4bamnuiqurvgjxtsrdw3r42vzek0fvp0j92kane8offg10wymar9e38yvtct0gjlgf9i5gg7r9hq10967gqos4jy4mg0tm0',
                pathname: '1ebctyd7sm1r7fecvogg855xb2m1gjsaqyq03r3bx4hg3lc766jev4104w25vzf848kwrpz2s8ne7x1biujsnxxnntgqmu0lotzo3k7nfnuciy3dvlde4lyfm1atdnj4dlmq53kvaqap3zwf32tf87byetpqohv4hqh1o0u7urcm8tmik8c4v4ul0x14d3rab2yvqjkw7uk1r7ewu1j6hydtq5aib76qpnexq1lodqilweaidctwl4xhjbe9sgt4urb88u481rxbi7w3h3073gpdp50xzaz4c4mvrv9opqreaie8l2fvqf31l05dx5mb5e09is2594qrdfm2bhy91saz4j4adfbly6ze91q3pbvg1ncoubiaai3acvlrpq1cvk5pwbjer315idbqvfay4awr9pyjyst3jxqbzjjbwzgj2kfka6asf9b5jbs0m854uy81e0y77r1fzqvx761p9gwxwh15qx5kdlr2fskupycok0dl85nx86zcb10nux2vp1oo5wsr8v0j09xav3xbos4tpn58nymkkfo58h2jrnf2x9ap2cyctowfso2cw6hrb17e1ea5cgikylk8mqg3dallx679c4d0z6i760dgwphz79am3q3st9t3803d201l3x0tvyuocn4nhr6vomi66u81ptagxenmdpe1w9tlszk6uwosd5aaynmh9vtyg8ynmnwlte8vwoknd6pl0dv4sri592pmdbnzs0qb58my0wfkoj22dd3ei9rnogkbz85i7uchzmi0kcv62nub8ham3z03gc7vlwy5nknw77893eal3two42pu0bbdguskqk5svaw4p9d75zjkj0c0hriu99yhyieh0te04659nvoi0kzmg8w95th1cac31q8watm9aooenzry70aawyhgv77qvh71i3ifu77kghpx6fgqc177jv3uavgb1fvq8du9gwnxak3fzed6rozp4jqyifwv3mki54c6s18lkl81brsfohhyux12dyq58e35hjnb7vxi',
                filename: '89yqzxdhc8zkvznicfi3y474kes02lg2kjk3tgfapwv3nmpftbuhtqpj6ztrdevm4nbkgq89q1fu4muj2xb18vuiphgqt5wy8s01ddyj64pcyl36edympl4hbzaogimqr9poyb6888pdfgyjcnvk1ikgmvqkstdxgeg1pkoh6kkhe5qgbdr317xj1nxocztvwe890mibtizsaqq4w7yak35xpfkyo29dzk7hkatix9k5zhouqwf3bmxuddnsmjk',
                url: 'aiuv9rf7pmlwhxt32ws2pvrsk179pzo4xiubf3vjo8tgvgrsa87ilws4sasgthgyzyfz5c7zc885bkreq9ts5dx96gguk89yaaly09ui7yf7tw1ksqfpd1wuk3bzorfxei5xnnmfz80cn07xo7i7imvbfhvq5pb40qy4j1q55t4zvn3pxq0igj3o4f47k2wjftc2h4y6trvsylwgki89gf488s3bfflmgdb1ic49xflt5gzx8yqa4u9ky126260t26ijn6j4sobia395g6fs4jm2e6bfm7sq42mo16h0yzy4o3wpd6fjozc7qaxrigz6nm1i71hzyst5jw4nl0mhx4i6klz7ldaraa2j6f3msf212ajfg0d0jwslkit4oishgwkecz3g46ovmpmq4laoa3y3vmyz5c96og6gjpoee7qva5tayqfbh74txc4ixkntqxuthuowyciyw9mn4duzr5m4sp5xv8q2ulou53i2n0p5j1pisvttipg29pwjobq8lhaeppz4q3v576d2jj5bw9g76orikvv11e8dloqnzdtmf4b27niv4148v7mijpqnnr9exgekw77ngx4in5qlv50z49ql4bxr7weqzz4oe63zvlahcpzn3wmzhz9eg7s8xucb6btpakr6q4b6kdof7h66tgg191xq1hpldc60udvzzc8ojwj7ufp2swu89vs0dnv08ar0dr343wpp5c5huhhyt78kmynlx58yrscw3c7vb1sald0rnotrordaix1rkuvq5n8y78rncnrivobp65ubfimuijzroww04qgw2j1uef1qhs64ypum5oh03jsqce4voekf39nhquih49sm7lq53esz5v1s4vo9drie9gzbsf77rz13n240f9isc1tt4mvcycz5d5kfh4h5jl9luszsc2joviiu1b4wsnnqvwb0y55ui4mip1nrbukohe13xh43he4hngft0e6c2k3r7vl2xz416z2rmgomouxll54ow46mpnqarwxkcg04m1mml',
                mime: 'y046wh3vfykhb9cmk8iohxbyg2po8dtll2r5b4q0fest3wkxsv',
                extension: 'obgyspogodnou1y8gjg3sq44y0slzbt4irnsxxxlk5chsj2a6p',
                size: 5597988047,
                width: 538975,
                height: 756291,
                libraryId: '3dd707d8-e74a-4179-a4fc-8999fdf7fd0d',
                libraryFilename: '3lx644o48y839ttcjlheo3r2urezh3i65y6ax8ccnwaazy0m3nd6ydev7hyrbh7dm7sklo5pm7zxy927wb4f3ladzyrkpt0g6dv8j1qb91pw28ra6be4vr5b3z3rby5ofxjdxt5se4e3a3hhp97lavus5v3p6a0wvryrwxdbivarl6nw32ulcpyk4uxfxaxqgi00um91fqo75jprnh9gsyvubc203lr42v9nfygig9rcyco8pdc1y8iqeq76z94',
                data: {"foo":25360,"bar":87260,"bike":"3>3},v<g^9","a":60579,"b":40601,"name":"+[K[>n}[2m","prop":77339},
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9ec1a631-169a-4ecd-90cf-c5bf80518c6d',
                attachableModel: 'gcmkbg1wrnxbgzyxy40o7tkzc6170dmksalxe2wggmz6eww4nrduutdvohj62xm9qyuj7uwtwkj',
                attachableId: 'd97f0231-c351-412b-8a19-15f279d26688',
                familyId: '3ee31777-9849-45b0-a059-f5058f8ea8cc',
                sort: 775071,
                alt: 'ynlq4aws37cf4iy3y5c10flfhoakpi2q535h20cnqhic5p2jksd5p5uobi7r47j6fwjafuncrbixvayujs63fa14qg0v9fg78qobvl0ohfxs29v3pnjjho0mloe5974w902dz6lwxjkbpn7eybwh55779m3vomk33f9jn38baoafnhg14cswovzsh9b1ywsv0n14xp98yjpnide5iqtie2qwf7tx5721tp5six8s94yl49wu1290f8kq3843y74',
                title: 'b5bl62cmjlpodm1jux41uy6zw59etn0sgs8b7bi5mr5tozu535auriax6yqdwjopv455cx32f6snlhfbf5055vmv5mkcowo888vex984y6hksvrmecnq178rhrtlioh34ol4hlkpgwvg0rqdmtd7w42kaczjhi52rhnw1rga93h8o4qlaag3oqekhafggubqbfokmurudfluv4vuh79ycqyck6prc0i2wf0pvz5ae6qp6bwguep4c2eddh5ot2w',
                description: 'Repellendus eius occaecati. Ea doloribus velit. Dolores consequuntur corrupti. Aliquid porro dolor magnam ut explicabo iure quis.',
                excerpt: 'Ex adipisci praesentium ut cum ad id. Aut ipsum deserunt nisi iusto ad quibusdam fuga exercitationem. Dolorem eos veniam voluptate recusandae enim. Et hic ex. Consectetur earum autem. Molestiae eveniet impedit.',
                name: 'hdb7ein5k804gq94yggrqgpqf1u16tcl50n03iul3xs06f3jxkypoox34ru0799oyt0yvwt8ifbyacrmt6xrw9wx7wmq4as0r6u26k1dose7r6zgdplr7l4vdaacs1bi53aqf4wuu6cgp2cpjn2kydco8av3puc8iao6eiuqxbn1kmlyj7fzkf4ok67gd3wd8fiso6e1d5rf8k31orfedy0clyjzr3f5d7no5b303117tobzinllhs5a4mtk72y',
                pathname: 'wrc4s1g38g1lwz6796jaxx13um7nfcv247xwj4rfvhmuwdonb3l5bvsaebross1lqtsfizej31pf09i4szqts1kk6nby2qhl95hjngsaqe3h7s3pf5aqikpbh88ttzcwz1fhz11bfcaa2plpqfjee725f87l7d47yrnfww1dknfaskarn3cv8vn0tp9hnc72zm2k9dvpg6jglu8qw25y72pxv2vqeloantnx0mjakbysi4o9matmos9ya4sq0q9hbq6mhkja36d5rxo9dm9hxweugmmh9r37nm9dq25h0tzvdtbhd4213ndig9bmdu6ckewnc9khc89oe8l0yb9rnba97p89uvbxtj7pleg9uzu7frjzve73h4hxotn8y7ldjwmks9oro1linzadacfmdqepoaj88i047qeqr4gmt6k8kkomr64ptraia4280ip3mkm0ytdr3m031nkzhpc0zdaufng97mlbdmou1m43ef03ckdzgix4d6r3kzpl4wxlsg28zvsrnd8kdy1c97tmhor8qu6nffb6aq2fan0725lrsqbom150viaw71uch65sjhtu35937y7y4mxghrk7qh8de7mh20bjitsmo3igvobhes9npoxb3kthzma53rye1enneejsskdzod9zbv178bm2pjndstnpmk8fosiozzrzj3z5l0z1pkmq4iyrlinmbd1rjihwgoj4h1z55l8xfyx22t0sedsrbowa38ku3apwax3o4ckd3xj60g7nd20dlyq3oblg55g8qre1rzqa5jzlyob6tispea6slqclxwd38eh6uqpne3sfgxghtd2uxneqcn4hoadpm4rkxk63q4h1nyetbcyragd39t5jtv4ulzegf988bn5mi68d8gkadhx7au1uswzm7gct0w4xjl11onvzp84s0midxpyl8tssepnqoljfpow7clhohj5otsznq02h3mhi6aenzwvr8tajjxvoiqwdqnnqabacgfv3ne50c1sdvg3o4sqaq1tj',
                filename: '1rwlpm1537y3hulpxax56ec4e3jyrfrs3uagfhzvlrldqjc9062wh495pcnnqjzwda0dhd5z0smk51zw1tinfic3k0xy8mks4illcsda4qx5s1zmgt4k2y9ej4jvy92jgujpr7eszpwacuhoeongx7b7s9vfpn9cnb85u8wfcx90an1t27haww173emwp68fsz51pbgh5ad0glklrw4uj73jgqplrbkdz3zq8ley93sccxitkw4rwp60vp9jkr8',
                url: '8xe8udikdj85suvkpmb2jw8rzqgtvi7ul5go9lk5zf6krhq9w26boggf6rxc8mwv12nnmorsvm9vevhtgvmp4yj4liifu9yhfmvnpoyvnx1pwj6pv0skhppascm4iged9guzy5bw9s16f9kqa58p2xomi6p6qscwr2zv3xuyoavunq819p50gwacrkz9ywqg027cy6uhtemzf3i4dyrxn4kbqq3zcgsr5edcpaam2knnow5gpd5iuzc97g1z6tb5p123e8ptpzmrtjrzlgwerzuc8jss0c47x1mhuwvzxcs8u1qvs3bf5qwgih589zabx0698h0511uf5nhz33mz4yuwraysr6g172k6gaummr13yaf47g1zuhq2j13ynqm4ukq1eh0r4lm1s91hnszvvuhp15t0h9feqh6zgz96wtj6q61zkadya6of89k3q0r6ftpr1c1o7ms0a7bo0t916xj1e40odoqbjkrokmtjuuniaorfvyaeuhat1x9h6yos7hpwc2ageatjx9g811e6t8dmwsodtajp1bdg7gec5vr3rup6zr87kg67v6kgpqzjku1wjzyil8r3hhkfjmqzhza6ov4z2jffqsezofn1c079cqgxs59sjq1o9mde15pw0drox0acqfs0sbhcd1ol92spvc27f1fffdwwswqv7zxl344a15vh809bbxfo93r3h8pjdo6h1hhz1ef5y6q7gbhfkflwfbd0csi4tanwtjk1mvodmjjiq2ht79uo19hvi8xnhr3w65odeosgsjt2aqng8gfmfpd608q0r26hft51kumbldhaq5ih4nxkawly7luao1rpk6d8h4vkz37284yubg3pit9uop8xfkmfqqpto7g0gjiwuyhm9pfnya5db2srhqf8x42bly4g39ed5id7ze6d7hrh46thh3ci8k99fe6w1uem59f8rmk6yey8yqtvk9p1oh9l4hk7vhy1vx07tpavza1kpigeqzlegrpxnvfpq7zkugzb6njot56q',
                mime: 'lf7ut4jt4e6gmrayp03ouwby428d3mezbjp0eh9qx60s8gyuec8',
                extension: 'dl60q0rv2atu32wlmujicsdvdqc4gjojjz345l749zhlfgyra8',
                size: 2686166763,
                width: 230487,
                height: 253470,
                libraryId: 'f589f8f0-3b94-4bad-b775-a6ce5e5d941a',
                libraryFilename: '9mdltq8ec1czekfcowcol2854vjig8p621mvu4uirrlmapcp7f2z0bne6jjit3f4104etwj33vwt3wy9smfqxgjegnharkuz4b8zzzn0921jnhshfkb20gwgzudmqx8a7uwn5t3kesenfhloaauom7r9eu7k5h6jz720vld1jani0gblgkel5o1g2ppk3we2up99p7ffyjshm72g44nflze5cwa1d39r8eg296hgao4sfv2dmx8n58xvamh6f8j',
                data: {"foo":37634,"bar":14737,"bike":"dyEf&xx4VS","a":"0J|+'/a,vg","b":80053,"name":76327,"prop":"z;6|XT]U'B"},
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '74e0d364-6f75-4919-9528-eb8468464205',
                attachableModel: '8pd3fbv0m8o8ftlju2qztunjq4pv3cvbtstidr502oz1volctwa7fdl32p6kg3gs512o0fuenmh',
                attachableId: '88408db5-5c0b-4307-b144-5a96e6a99362',
                familyId: '54d13fa0-718b-4a37-9a2a-1356c2d5cb45',
                sort: 853041,
                alt: 'lw716tgo8yuemphjk6538m5aptyhe78ypz0gqwrpceyf44w3njsq904dqy7pdftr6opjklf73y5zn8ony466g684nq4tywoxdxgezl3hjfvogekoeo1x9op9sv5evgotctszxs3sf65y3otg6o02eyk011srce9xhgm5acl4lb0q6f8juiggs3hiofvxy5m8m3h72rew3o33w7s74woy1lu25308kg1abd6j9h3hijhqwc5qncerym2g1t9ekvm',
                title: 'ghfv93jn75nhhu983byea5h8q9xyyu8waxc4il99z5rpkhvdwrlgwrfxxjzal0drzwofskkh97gectsr7q86n90r7v8ed2mdg50yny0su3tsdg3e2w16nwesp7c6gdxukd4bfxlom1niuybk4o3mhprhdbv54pigvimao0xai3ws3c2yv2x9culnd9lz0w1p4oi86kefo56m7bwfsl50gts6e7qtp3qsfmchyz7b02hq57e4jktr8morvsvvyc0',
                description: 'Laudantium a et. Labore totam eos est dolor ullam possimus dolor odio. Quas nobis qui rerum labore tempore quis quo beatae.',
                excerpt: 'Dolorem et cupiditate ipsam rem dignissimos voluptatibus provident dolor. Qui doloremque aspernatur magni perferendis. Ipsum occaecati impedit deleniti in soluta. Beatae nam aliquid soluta dicta tempora at velit omnis fugiat. Atque et et eum. Consectetur autem rerum at.',
                name: '4eh7xi4fj17znu0difgsh7qxm371dbcz59r3jawxc0hzomggmczny6zrdh99cl404pjxcwdvlsok56y89fz4wtfls4qeyjsnn6yvfdeth6nfrm6ciblmf33og97dqebkow13lv9tlhozy9ueee351ajatm7pdzmkdlpo34l7osw71zakrbgxyefae3uhdmku7o3qa2eap7ur62a52cbu18xvm7ue0i97v9xebny1ul71zx7xi27rp48rcps9dy7',
                pathname: 'fdgexdyz67h81mip06qchi89wp4c05efhh4qilz1h6281schgz9fzhfuyqymi30nau4atm87u4x7wthadwjepti526qsrv5xl09d61362klsnrfowtkevd7mukwnrvutexajgtfl2hioj2b58409hl1x37rnmfu3euey388t7xcxdvfm66kxierknh67cijk6o1gzoknx7xz0mynjkvfd2sbht7zgps085vl0vrcg67q5tnxtopr99cvsxk7et7r5gov8cp8a87n0jkr46q81y8dkd2ks2yrfyzwgiuxpbnrfzd7o4hc4nws4so8x4ne5upccfdmh4ckrlojlmffjhhjgn8ovkdsah862kw0qm11r24ui4la3yp4b941f86k71e9ilqttp0cv4qz1bbm8bzs1rbrhucj2rzvuk9k1kw9g3o40kj2p2u5k28u2ywrqyfm0vto4en8l56n5izvzzdl3no9n6mu6pc9fea27t76fvvs6e0pawpdfrxo1q5gh8fijw8ohoe9y9lw5ygadfxz66ckbfe5gmjt2uogfcip2sshp46w8bj2geboijbxsq352fkbligju5ixyynzzpps3zcq0128cioaxd30y33m5bcphaj0jsoj4btzdp10mwzk4hx20lw83yt2kyteepbc8xrjymvwpomtpnqg68vjodv02np94x3kqjhsdmg0uk295nod0926t7ty2lk9s8fti27m7ok8a9bqmbqfna5e6ktcpiudwh0gmky8rpt3oj46nrj7fbkdooalh366jg4py9y3w4c7l14og123piqninawbnumtt2r2viay27jza05w1f585pcn0wz0ejf16a7s9f1lt95t5ihz6bj4xh5c4y918qag66oxo560an1ggcvnb26g9g22pcpelp5bj9fflryseqjr377hl83uyzh6rc5udy3tccv67jopdtq6l7pwfrxe9k7a4aaqqv4fr2tkygo5xpv1tl6sllc6c3ig5yg2b6yac8kv6oea9qy',
                filename: '8xod8yt0yo9g5grjc2tvg0zyn6o36bsu9v0qv9lyyiqs4o3mdg5p10uqw8dq02g898vamlhppkz8az7dkh9pksj4gazm05ue2udlp3wb8bvwplaps9dbtshtdcvkza38zq4k66l6j5koe8yso9uhjtnasu19iur6rhq7ysjmk3ggbrr4zqoplgsg1i2qpr20ub0ih4icjrcw8cydmio0tu6wzgbxhu3jozjnb6hfm29oz1qf3cfc27e5fzpqkss',
                url: 'i22mafrwovks873w44tc8030fhxoqz61qu9o1k3nos9b269mrvz4df5cmc893wdaesl20mn0obnrqnn9x2g1e6exoehslkhqlahq9k7q6jbmyoznomy1d3n9wbjqtkyn2njc9vbly6kyx6fygyyjsm2wcyiczt7ymfrn2q8miz0nu3mtj617cj2dthpmzz0nw2zgpqqz6jsr65xzd1rx8qqu4k3287geyusfbkzwubgyiez00en9m2hc4xe976ja9nogj8uyftqtayhe5ef3el5numik0fqhl0jr30xpvf6sgolajtqoyccd2jnrddh0nv7flpibupwwzsr8q0vhubbeuyip42j8b54sqp3x2clokr3s6gfg0fdjjaoacisqvlrcq8pxayy5553umlegdo3ug6o6qunkuk1extazb59vy3ky2cv1b77c4bqach5s3c8lr1374e87zn8vwfnl5yubai9ucv96dqmvuf1bjqemz7rk31mlbiuum1zgcz591dshvxeldkan9scfyqwwwoewh6a7q7q3gegnttbochz9yq6qm8q6afgh3e0jjlfxwrn4b3ykoioubj9kkobasd1tlo48d7rkwd1adjtwp5x6tm0wrf7w55bhf9og1j5yd60po7ws2ipbmwb6nfvd985qhkyn8a2ia6j4f61y779cwato3gkwf11lr4uekrtpefqkv01s542emsw351gb52ifhbuh1bfhmkpo8o4lvzpnmtvp6izbqikwzh1rv77jpbuos3ac487r8fcf9z06b762ny4jue40ueiwtjq3qthe116w9uj5okn9tolxb59lba4bfb1q0tzwfznvce01qxise0ul84ql1v376g4k1x46ar46lfnk2xk33wd1xr9lkycivu9flwbwjvyumix24laytw9pk2ogia7sncv7v4ul4m1obhuksq9jpt90volxa625i6xj1aiza8xbqgtm1bu7ybd2uqyq24dlg26jyxr541ewe3cwne9rqddscbcp',
                mime: 'hvnlknvhcmz7gr3q1oxucrlpflkrgt7tclfdq811x783jn0zqa',
                extension: '3ldi8io72y7lvt23el4xyr5qwody7r3yssi34k8uiv6gltlfymn',
                size: 7987160096,
                width: 845367,
                height: 238732,
                libraryId: 'ebe72409-2e7d-4516-b7f0-d88c83de5def',
                libraryFilename: 'r94ouew3uu8p57bh11tnxmkkhxg13dbnrze3755sp0govscnlx2qesqqq70tp18yq967b9ppoesw14jzthuoqi85yaed6r4ct9cqaylnpsz37s0ip8zc4pibstnf22q1e8vqi2ic5rqr5mn5x4pe09a0tdu7cstntb6xogoz013k4tht5mefsakgzyro10xuuyrdvj90fznv8g99og187v94h3znp5l5lca2nrpja28mfwsmtaua2n06crm1byq',
                data: {"foo":"B=,LSnLm,#","bar":"f;%}c.$7S$","bike":"B\".G8$RfCC","a":"5LsGdOTkml","b":65003,"name":86259,"prop":"#,y}!fbOG="},
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '575748e9-b036-4927-8ea6-cf6971780734',
                attachableModel: '31s85pm638tb2zg37jlkcxh8joqjyxacfyv9j20r56t6n6oaonv4l8b6x1f6coxjjl5ausbckxr',
                attachableId: '304f305d-8014-475b-b162-d146c8b4d37e',
                familyId: 'd2c4251e-e741-4b46-93ae-a3f374afe23c',
                sort: 606591,
                alt: '61pr9bszvjilicvq6frb9hj08w5xqb6j7l6ill7vsgxrxsgnkqzw1tzn088gaqqzr3g7srh8rpbzfprrpo6rb2awu2qwkaywn5uurv4wkci0gsr76sxssd1mi5b6ghzcqlp4pwvoalp39syyejfibkd3ky00tt1iqwvyfxae94qklcgc5zzc6q1kycbiov5qrt24xdanrvl9cjkmq29563gsutdmn9jpdlkqhgt3l068x2lmha96i9jpl6c4nea',
                title: 's3gl0k0er6xe2j1ti1egb1696ukorcs1e89bqcm5d29gbz66z8zc834wg704hckwli63y1mrmmvt7bipytnzdbipy5zb1a7dv4mtaccci39lvogeqtsz3th3jgkdfypalu5v4383jaso977n4j1o6focvkhkn90kmdpcu7ielc0fs3wqa76vautqxxmpy8yoe0nz6386toijfzm388verjbgboeeahey3yvlb8agft4dpjc3jyy5ik0wris81y6',
                description: 'Necessitatibus ut quidem animi recusandae blanditiis. Quia temporibus et qui qui. Maiores cumque ut quia est. Reiciendis consequatur molestias nihil quis qui. Quia quod voluptatem.',
                excerpt: 'Assumenda et quas modi quia mollitia nostrum voluptate. Mollitia facilis est rerum exercitationem quia. Dolor eum optio in minus harum nisi. Autem et voluptatem ad. Est velit adipisci dolore aperiam enim quidem.',
                name: '2agfhnp9vbsrrjluypspzkxbvoazsf8s6jwl91octo8o9xue3f4bd1e076uls6ypd7ojxomfn2iosru3wn18g5lwndw8059d0kaq5an132ch8w71c5nynpdq4gvwunsf6kv8hsige8qlus5redt6hy9cie2i7ll4hl0ha1q70yt8zqh1mznduqsc0ik77veoj9bacy18deidda1v5scnyoq2utc3s1sgzthq3nfcorocntn1asa69o2ix2drgt4',
                pathname: 'uhtcf5uj08nhoihe48hpvnew4owue8mlm46uv8czxsv27zp62qq1qpz0b4nwo0srdld80ckzctairf3egpxwjso4zniumu8yqvm82ajnr2uijgjtn8xxvkdnr12qi05x5zh82h254vzc50wg9x7h60oftee8q4f03qt5qsynixekly8pk44qyrt15layvplrlpav8itom4s3wrd2g4sv3hb48c99ar9ulc5pi6rpux6py5gsy5hw3hquaf560vwm6t512xb2y4240d6p3ddnuemusw91bnpziw9hjcbkbb83t1bor99vmkqdficb8uhyuepgmhho63853pi719svbd5j29nbag1d1wna1ktr5huph916w2sqgteummq25sfayywz5sm26sq9lzdixse9fgmdv6cqv320gehjltkzcibn4bbbjra4uuan0xh2r22vwiifudz3syos8wnhce825pv64edhw9bhdtwjh06bh281vt1acxz635ol6zbxz2gquu2gze04jfb0eb4uobutvxhvr626x9qqkgcizk59u0p2qeh9icwtz7gz49drcw9h9sj9ctl5u09ympqgdu6uap7867knwh2upmfw8bwkfx8ywrjjvbb7kaosjoj4v2i05eeybkeu3n223zdta2forc4esrw6gd8zjpykrgffkbqorw083qr9qwsoiz5f7pcv6jjdd71bmtjv7mut7qbg8cpzsiocoseboi9e00b5qttdcik0qqayoige3mlo3inb68fldugru08fhgyf5f9e98gtvm827kvzszedm6wym7y4odajxli87wkkqmz991yk9rqi03pbyxecegb45t5kmasjh07czibadc8fchra5icvb825n1zcrac96ls6x6ebt2wcmb0g6vetvi0jafsurqnhirxai73ocb2bhdsajx69n3rmtiys7sn88a8i8j5qdx96af1k37qsr247z3khjisu18if912qkb91kezripij2q8bm7mytsec7p4451fh',
                filename: '7jrank351ucccx8kmq3nwn9m1a5vz7ol94m3r6y49s33ym9am0x6091bosb4pcw3v181kt6f0han7aemo5fa8vz2v09qxrx6thxx9169nnc0zrkzk8b77ny0dglfnm1b7609ufm7963q4umf0r2ca1q0he59q70joqax1vtvrhktgcnm3h4li3o6jgdfgktc5ig0g49q52lvoifqnbsr11y43ur550boh2fvmns3ha5bip4dioaznkbv5wj77d0',
                url: '0kfrzwhnnoy7dgq4d3ioc76jxz5v1oofgvdtsly5ehtu1rogks9en0nqg60ewqpe1lkttpqw20uijdj9ldjeje28yps9ygab26hyqcinmof6jn8vq9ynfh0au76ja3cmacmwfpepqpd1hw58lya0tx8ao6n7ad4y44qac34m0xekn0csb20of7k0fbs7ccq6yny7m00l40fahbwlekhy9xt88ds5uwenjc7zmdbpg4sjfnq04xj1boz3nrt8vye37djf1bv1yvo2dwneuwdbzj6l75vul6wo97sxi6kb4yo2cp39z9qlabeiiotytim9wl74im9qxdaemzrsqv7104ug1eiy5014qgvswe360ebzp40eggxitnoun6sr53p0w2684q89022ts2g7vb9zrhwpsepl2hp6gu8m4sgnvgjtg189lj61gua1x199eea4gsfc0hinrvr4csgg83z61p3dzihtd1lvolcnthqpbg5dzoo5nkkck2d3q1otiyz8ahpgds1y31o9ysnfcdqentkgw1gqfg4rvcvv4mxv6lpj0f4ptdrc9yos0lyvp2ndmqkpplnpz94xex2l0m3zd7faig78b6u132a9qvfyq58n4o8x6yjg1d8ybysd8w6xdlqkwotx5gbpghd680fcv8gcvwllft75kgcaubwx8iqmbebw0ris08dwzbo5avt8ol6u5tme5jiyxikwyzk2k9hvs3ch6vrdt4v86sftce78bfdrwe86ymq7gib0f4bp40h9q38zga0epzi2ts7vhrslrb6z7pajqkcvta3pwqf1w4vbdt0a13kagqldshs89litz83fy30y7q3r6qx3a0dga04n7jgb43s5md17yseckesa0j2tzhz68hqfppbb8qn72wrmtcijymdisxo5g1sw3uvni63tb8gzx4z9gtlwgll4cdu1kod5c4rykr5ah28ych93jn1taxquf2jrrfy5ycznw1kpv8t0hc7puvmqnnc3zavbp0w71ygci9lz',
                mime: 'mmo84ig0cmotnk7eeayk2amemgzesrjgmeg0e4nrevfbg237k1',
                extension: '9ekfo3lqopv28x6nui0z8o11vfr0344nm8h5xy2vyi332ziiw1',
                size: 94962063417,
                width: 725509,
                height: 699713,
                libraryId: '29f0640d-4835-40fc-b065-3cc0f6c32322',
                libraryFilename: 'k2bytbofr80klnfexvmt36y1savk8efmmqv33wyakc74y53xp9904ff4e2qwppwvkxlmhqf6e9ppawn3lm6lqw2vfs9r0gqygahogl1j9dr108xcwgcje551083cdlzb8upga0j9bckob9jbqaa7fphkgqcotxvuygk6s7tfq52st9iia61hxqw90goel69a135jpq01pblcw61slmn29npa4k1omb1mi39qna9f212wkgpnkwdybb0f3i79wws',
                data: {"foo":80956,"bar":42037,"bike":57047,"a":"k$$]/R`_(X","b":86411,"name":"d>wf*{2^@{","prop":78559},
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'bb749707-578c-47f7-bd3f-476e7bbf86bc',
                attachableModel: '55758k8i1p14kuuyq0e58bq9b9iap878njapdk7zyoc8gq6x55hdm0oj8x23zbnitirgstutkhn',
                attachableId: 'd53e56d4-6edb-4b6f-a00e-536b170a00d8',
                familyId: '7d040075-5e57-404c-b8e6-53a778977cb1',
                sort: 563180,
                alt: 'jz5ik9qrgrhkjaftd9qj1scg8souj47ih3y68wybhoug3gjrly5kq3c2dhpd14uetmyevehdhldb6euwbsw5qa8l4d2yyl2fvfxxi6ty8k6oi1f2em3n284trcpqzdfn00panjg7beqzri2703w6qdcqeag1olcv3q4xnw5bfsf40p4ke62qe7w6yvz3343qjo218juejse6e3x58j25wcsb9eo3oztyobke69phdne75v4zrsuntn74g295x2d',
                title: 'lum0inu5rsjzg4ynot5ae0wxhlv4auclpz527kl8qdt328tftl6xccxn7h1okt46f442csr9ywe462hx1fu47eaqffm25xqdk850r1d2y2ryv4mr1mttytmuqcpyiauwzjhyupqg7t1jnmteow00io2kcgd7hm76fszi6e0wq4lh34ppctccx78iirv1rx6p4qift38pkklyojv1u3m49go57c5n0mt6r2xrrd5wx39p6mr21xoag6h17fv31vr',
                description: 'Facere sunt et sit. Quo officia ut quia est ut deserunt ipsam. Facilis sint qui consequuntur harum expedita.',
                excerpt: 'Qui autem veritatis tenetur dolore quia. Dolorem et eveniet qui aut. Qui voluptatem maiores doloremque fugiat harum reiciendis cumque.',
                name: 'ij70lsxhio5s7oettpfy5ldlgv4viyecfpl43kmhzd9ig08mflb47322p6b9hmw703obtt3xme7jqrphfsnxn3awv2veo9nypvtxjgv1d1a3krmlwkwq7nyoqo02igklfio9biu2i91644i0gusinlr7w3a5vvvm2ykotacexliehf1kdhcihrq2vologmq45io8l2rpkyw5tf14h9k0hqd92hq0zpai88lrlbbyfecvg50nwkginr3luf2fo3y',
                pathname: 'dzymc2bw9sc1us4pij8fowl57ictcyszokca06jlcckwkl8tax33towdnumsqx0tycddh18iq6ypycg2hg8b53qwv2abbkigzbmw6c8awx9ik5xg7apfc6whkjd039njh9vbgp3lbbm1v1xriba0wfe9ent44cy8atv1awqz2muf7htx7nnmv6lnketdo2tllorz5a1yfkf0kgl68jjva0cck42ce5sgg3koxuea82jehqsne37u96d0k5zx3ejmqq5yb5kd4tyx416zursucuhfnk57shlw1gltjtfbmnvcy3v3qj4chmmpicmpsxt86atjz9931s1lmu5wiiqho0l1uxtxfocescxpjzclt7idmtnaljo3awsparwau5lweerxj3sc0rmpwo522xryvkbdd6n3yh1cattvvm0kkht9b4kxgtcbvttjlcl0y71h8cm54a6tc763mklvm1hzadbsvqoo97jzxyi5pcymwtk7wzwssory7g5kcxwkjs8fyy5mupt0uc5y7jf0zu8g9v4bvugd9bh1g4v75scif5iuatqhojpglz19wnsr7yu8y291fwn3v04lompad1u48xdu549y7aruqudwbpjlnofim55chtovc3t9isbb6r0ln1es453zfpicx9gqn12jxqtfo88kd7uvbud71gdsv1clrte0mi664hr9r8kcishxoncnwd08ig9yw0mxsmwfe5scv69ueltlrqieuct2k9qwoaio7hbqs2i77vikepc9ke3pug9yq0hqj9duui263m92cokpnst5yge8i4p56vuu381s5e54zrsc9glv1l16qwg7d5or59izamea40y88xphyblhr91iqicjdfxreizgqxw900l1q1jx0mcstj2fwsnqao66m0i2l0ytdk2e6vvh6k09o4uvzaeemho0aayj9ugqglw402npql83fxfq6icddpm8uifco6jixt1egy2yqzak5d7g7dqvmffuspx71phbxdcb81mitv47s8qu',
                filename: 'wxkmhdcqyrzttnoqpsowk0v5053qv9dlaqzp23ze31995vuy5l0bk5ksxeebx3xvcbap49uttn6qtyclc9g4tsti0uwf2dy5ril50mtep5ro8gm97p9d9m4p85bcuy34x269u0h7q68901gypdlx8l1kr6fsekklc53tb3upsgrfqz7tmzy2sqqcvmkno55abtqr9m79mueia9807x1fcukr2mcouo64m2x3s1yuls17shecv4kdrbdjlwt8zb6',
                url: 'dnyrq92rhvqkp65tfh9pe1gebu20hhb0vf6negsquytm9r69pdr6lnsqx76wnr27ucyyr17ka5z0ghixdpz6q7aks9akoa79yoxli6y320m9g2zvgk48z7xndld0p9nw3apzmfmamt32ohrbz499v6cinp6a7zupdzrqvpdt5j4g3u41fj76xk20pu3zubqzz854rqxo0fmnpugdfay8nek2hea97ueqg33g6vjl7art40degs8uxm03dw1qtev1ps7d34a8rnmctg2vkntyr3sm9eipk94ibn5z4vyujt4l8pcfispxhpft3nfb5la6x9imtxcb2exd4d8q25qt2hzi8fzu8v419kfdk4lzvq0yxwsa6yrrilylbis1wwdo9iu1tru8txx01w19ruqx1b2t1yhexk0k17w8xqvik6m3tkyci3diulg67stg8rxqq1e2p8dbhzexr1k80rt72ytgv2ok9jdma9ngupo82cfz7w9xjgfxv44ipures0f852p9ajvbqj14e7uv0pjwbkygglhil32tt08781h4d3do7okdfn1did5c59y5qwoegbmr8uknba5z43zf9i3c82h372d00xg3cnpv6qxze7bjrnqwwvxd02xb3675oyfwoug2nxtxkb6yrn8ul9pr33w4ielxbztqoqtelbyc14tt9dr7wnbh11uxh8d70n2blgpd33ysqma6gh31exum88qhu3ape97qzk1aa00p9uwyeskr79qia4zzcsmlfwfukfizcq38nb16o6mkzy6dfy7lbqizq3wehgl86v4u5s08c8apf3tw6ifi11mdphn9t3idnx2ob20m8qf16qdx8ifatlmc8hlq7ibcjealf0vsv2j4w4jpmsre6q7j6vx1jjxxj0v787poboo9rjufig2xt3ry28bq1gz2fynjjlmz7atxihccvgvkuo9gwmtxbf63ms4uvt38aewipz7mgnnstbe3hil7i6j6lnaeteazpd2g9hrw8kljmplo2lmf',
                mime: '6ldbq5hvo9hn5g3y5ywxhfubwuc9i30mqfvo1oce1e71xy7tp7',
                extension: 'u9mwzhb531n4qw4x12wa6nlcmq2lfcim19xxr73mmdqxk1zb6a',
                size: 7535100947,
                width: 1664961,
                height: 496720,
                libraryId: '251a3dbb-29c5-415f-afab-54b832925904',
                libraryFilename: '2luvncjvdwidf7rkpcga47f199xaaebg8i6qc232c95eobpfhcxia9kqan4c15x2g7ec4z2aub84hsqthsnvs0owoqodh81ib6lbescdwayyekbnbqs6idayxvfz3k83skrbmm6pd7qvqjin5e08bdqgukmufu0s6b5s7pca5vpu6mugn1z7xm3mch6lzlghs7xckkqt6z8uuirm2bpg54q9u25x02x9ly89az0ypo62ay3zoz5o98apom844wv',
                data: {"foo":2013,"bar":"sWP(g\"\"BMi","bike":91343,"a":24773,"b":"UL7>6CwBKt","name":"!ef[M5dT8B","prop":",{7<Jq)/`o"},
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1a3b945f-876d-49c1-8d1b-efc18b8973f6',
                attachableModel: 'o16y96qpiwtuzos0it9jcp83ng8b2luqrqaeykuh8jce5a3yambvf3vbr71m3tphwfl7vkee0a9',
                attachableId: '972ec72e-5c9e-4642-b534-b44abc2270a9',
                familyId: '3efdb392-8341-4365-beab-39dc1bdb16aa',
                sort: 840074,
                alt: '4ls8pvszb2n0zdifk1qoe4ekymd8s1iqwlvn9s1x78vaodwvavcfmf44vh1u7h65ovf6g1osupwasbxwmicvql8ja1b9j3fcfvq4ebnbs8gxlnldpxl261kf6gxpyw7cv18fj9bftonby220cij5v8i92wbcyhqb9h4nlrtc2gp4g31witn5nazqpisuvvv4j48t3177sa94c9xf7hsb9yt72mkw5cak2akxv05z7q70wb2a0bqlgoi3nkck9ke',
                title: 'z5c6tpa3xh3onn136y80s96vtup0rwrnmygwwy5udyqzsntjk3h5ll1mk8hh6orjwanl6x648djghvjj9ebvmkdnzmhgx83jtsfb4w3hqrgfcmteqqdn7fozzsp5md8ukifb6lz9xabhjgxqti0qoy77osfzd4om2pa1twhte52h2tffug5pa5o8y00j7i37q6tzwpmblcn609gutkg0bvp956z8mksf4ixlozsx169clu3y7nvctv5abazri94',
                description: 'Unde quasi facere voluptatum dolorem explicabo. Aut alias qui veniam non officiis fugiat. Nesciunt et sunt facere qui vel blanditiis beatae. Optio sunt eum architecto alias similique consequuntur excepturi dolor inventore.',
                excerpt: 'Assumenda temporibus et doloremque ut harum consectetur placeat a. Hic aut fugiat eius. Numquam iusto aut.',
                name: '6ca6sc99ghk4jsimhl49c1dagwg2mbydqqolhm9voqxg23gq4f1h7u74zu7xpk0e4otkcay7nkqmzmgy6t8u7lksxgcw7jhgzb1nl3e2fzrn9zxsmj8viqtx7vj56p7c7037ns0c7lrj96zp07wsetgnkl4dczp2pzu7i5oo2pzlyg0q7skth16pp9s09c8zamh8tx6igwmzj4ojczqyqrm86hhfar7n7igakhr0agmj20l4031yfy6a9h7lmp2',
                pathname: 'mf50r4rf1l6ksl0gsr6dvpibh771ne52nt2ptcxk9byo9235139meae4ud0jblqf98uzdear7eut3n13tprgz6rt4d1no9lcd0tyby3xzqlbi7d28cbsue0gj1up0ri26yoc9hube2jwqqi3evycgg1zdiivdlriaovgx28h0gznoljs053nx9dg5u8kca8sz2xwf1srpzcqlk4di1tgy66eihhfy7grwkrgjzj6kag480leflj6lzpkhcz7clequas1azsfq08k3fl8d9885ykrsv2ntfjv0l9gnxd4rjwgg0svz8hdy40j3otxl1qw0vnehb0ld4i0mqo1h9h77o8546hxnmpsu80yu83gwrfw5pvyfvqmnw44huvzukxr4e5v9zqe7trfya6ksiqd7al55uctjpprxizwclzvch8o1kk07dtqht0ryy344p1qvv0etjcidr4qhv9ue05jl7ocevv5vxzp9lzqzk2zf6hrisrjeqg2nh1n2h17ax72r1a9167pueyxk9skce0m6tb7c6n00ssfcs00moeo7x7de0mrti5c8y519kelnig2e6t7se82zihqp5581qpwt6nppbzk38kpeuzgegd43g2zg63l96tykjtmm1nc8n7obgv2m7esh262tt8qynr6ndofgpowd29yu0478ww216w4ii7159657sn181op9klpikmkbb2jh3hrg41u6wf7v5os9pipdqls2yx6dgo5wfy21msxfsaqfiv1k18zyxd2xyovzesxgu08e2ji5z57uzbccrx1sxekxpjeb534e50am2kexkjwzqja2b0frk0ohaejhtk66h4ga02x1y3yeoa1d08wm5iy2upae8c4qmgo23ukhs2gwhylg3ywnm61ne6r0jgf7rp41cignqfykm4x0vlyck2pzbyhpo4q3iqi22u8q36wkbq2ocyxiinag9fo811twyv2rxtn57p19adze2403cjr6dp3r59demdazcw495vr4y7fzr37yw6u',
                filename: 'q1jslrotu15g4v7u9x5gi4fbnrl1hx95bfzzk4a5woapjhdai6t6urdh5z2u0l1adgecmgzfvgubnx3qyesceg7uvty9jynaprn15t5majlm222y58i3r3rfpnuvncs1tnmmc67lr3ovt2krm36fh1etckxex355udkn16eljynrpptvl13pryt18uyn1iynkab2clwk905tdm8fja9abnk3envyzo1lyp4wisv967dc013m5h6prbpqrzdka27',
                url: 'nnuv17re4n4x7b112lh388lc20k65yhrv3359kg3sg6uw876zbdpl687rv6eir3710gl0dqwy8byyvn8dgv82h4g2vajhj1djfl4xr26lpabh50fat8ef8d1rvd77ulgaqgxer0mbf4sadht9r9n9tf8cl4m17a77k4krj10bhpxt3ae43jw07957nih47xxtjqtwgco4158amv2wnae0yugqzcvcn3arl8xjyv6twhxhnhavwyabkafq5altjchhopsi20c6n74hhzbybg44kcxqf54bq5nwwjzfr9v5ys214ulj3ued1325bd9ttu07q03tedg386z79zw7l6ywcqkkpqo4ilqz2798pym7yyzsdfj3rwhbfjuzwfq6ruu5tclhp6u3f54u1fwfg1rbvv5t3lxlprtvl8h412kmps8m2xwyxoa7x944b85kcv6mz0yfbnksfgsckt8cs2fr0i2y1seb9nbd5by99wcnaqwypqqr0ksqhhrcimz6t654gp0ln2g5thdpv4o3giic0fsdrmq8o4vpn8ndty4lwc55q12g01ceygzmv59yhjncrmcnpqn17euglod8bc4puk72msk4zj0ir0et8go4iqdrokfdpb8m70ysjhu8r5cw2i1984pihqp07su71ulmx1l6mggvypo6zuezc0xtzdyovpizf4ojo1gq21px8h8n4ewc9z2plta2spjbukl3rpi1hdzkw39s2xqn6icbkem4061mf432m2eagq926djexf9zqtoqrvupg4dx5f3s9rrpxh03bwwsfdpmbfgsmjkic97p2j5irx4b14r3vg4zbq1ltk8120gq11calr6oo5c14fzrtalpyjh1muvf57axd448xfc71nlbr9xmeznagy5zoqpj4zdfxccgeh1af0ve16c575dqaxy1te8glmvzxl76ie93j87uollsat52eajed9lw9o2iol7u1ea0e43t3xfq0slzoxv65nheumjhikvagdpjou6pv3kk5cj',
                mime: 'hvef34gnkg70lbe9s1a8szl4jvqzdl4ass3xaztt0k394hqs3s',
                extension: 'f49kirx4rvbkbft6xycooga60jmnumdulsm5tv5jl2oz2rzbyl',
                size: 5126324124,
                width: 852932,
                height: 5299815,
                libraryId: '8b063d5d-8d79-4033-81ce-c218f82cebcf',
                libraryFilename: '91cu1wnnqg1rahr0c07v2j03pvd5fahe05t3lmvlspy60dsnjajr74d16bq3sdreii510ex9q2lj5j1advzzi5pxbdxrxlapil30niq9caaldh6ro4v85v26oy6rq77y300rcrobuk1cqls8rxal70wo5flbo7zg9r8hah89mecnofhzecylevewxykurizvenrgnelteqi5bff0i089vghnyo8xy76qf7ge0enhhgtsobqsgorecwa2pkxpoy1',
                data: {"foo":"k?X;-*PF\\%","bar":"#/Cb3mE^\\_","bike":"G_Uu<A|VeP","a":"N(628^r\\&z","b":62757,"name":"N<8fjv;J8m","prop":18846},
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2e24d456-c9d0-4da3-9531-480c930b0004',
                attachableModel: 'qlpc80ibuj6ij0xe5zchj9xursn1vkrz6yu19b20e6379dxjugnk7ieme9ko7ivqkwu059txuhx',
                attachableId: 'c034e9c4-3070-45db-bef1-64718d814f3d',
                familyId: '0ddb34a0-23c9-4476-a12b-f5f8855dc8a1',
                sort: 271647,
                alt: '6z9xtui2ubxa7s00si0v6qvmfqhbxgo5i3cq8stx6kp3wekxudth9h6xf45epq9d9h4o7fjrtbgsvmiai90labevvy1mrve0sg5ekw3em0vg5fokd0z5c0p8gt5gm7og42irafoexgop4sppofxhvbbg9txf1vnpxu7ei5ivxclpcesesx51vd321e5otvn710bziruspkyift76keujtegg7wp8x3xsfepjsmd0hp2qv92wvo6u257wjjcw0dc',
                title: '1ey9dt13h1k1p10dnjtrtqmjjwsk3404k3iw8ahnoed82vzplaiv7l6wo45aa55rpbnw9vcyyv3u3vcvyc6m87ua2lcukpi2quxuqw0pgyjktxpj02b42e61w0i76i82oy1xnakkvkk6n5rgi4sgnh2br8tc11zb9671tt13hisw925o5v841if9htnuhviekuprb57pbrsr93mzv3tkvw506y3eab2t8trnjixg38zija69r375ahirp54lwao',
                description: 'Facere voluptas animi non velit quo ea iure. Ratione nobis est autem nemo eligendi veniam. Similique ad vel reprehenderit nihil non provident quis. Voluptatibus ea voluptatum nam. Voluptate laudantium reprehenderit exercitationem ut cum quo consequatur. Quod facere et ab veniam natus voluptates et et praesentium.',
                excerpt: 'Aut architecto aliquam. Molestiae voluptas explicabo qui reprehenderit dolore. Neque voluptas eaque amet ea harum ea alias pariatur nam. Adipisci ab facere suscipit modi doloremque non ut.',
                name: 'dwfx8q2os23tv3xt1o06w8mrc4ikb9a604c2xpqve2wkspaf3bpo1ywhrh1s14enyhv8u2jk29uz66yyqe751gvx0n1xipg2fnam59yf690iellnx6lobpxc9f1rlt8uaz5kcggcjs77huom9ks4bp4pr3cqjscrli6i5xkm4b2jsv3v0qfzgwzatgm9qn5snmgxeq7b2n2mn4q3xprruntfs4ftxxhsm27pw3s1lz48yhonagxkpztmh5pnx72',
                pathname: 'saoepgks5vhnrsfxurvxzqkuhc9fmzcnli4p8yfpm605fwl4yxms6s3h79w5e1zanpk4i03mvvsem1lvbpiwlxubhn1ivt49il4u54xflbvn2lwmcoycoodw40dpke1l28ldtcaub99qp2yj6dncy8eno5v2o94y94dyq50uelqj5glez1bs5ixflymdiddl1r0d9iqxhy6mftofnq4at2a7uealtpnmszaeiwfqyr06hebcc3auzhi8np39jv94of68s89pqd3mziu0fehq6jvso5a5utkkau40f509npbqlxnpu3lixholpc1ikl8ng0jqppuuk8dz7ksi148hroh0qpt7h7xy0c29loo3j91ctbs2l9j9seug4u81yvz9jzt4w81nwb5oxmwb3fv935mtdvbw707jzkiowovatpwr2z3yka3mvot7zgivbyjidmlfq3ulu88x20st7hrhsh0mohwyi9jxagwpqiysr3osdjm1vzouusfmkairu47ntt1td3geotvfeyxsk5lwtzyyzj6txlf41axmz3ycgi6d26hmq2dxusw2ukjmk95su3we27v7rkiy3b9kpeuq786a3mdhuz8l8dtdlm3sgzvn6kmqsvnhhjlnqk1d0075n79ntbw474xgq4z1tmkkc2bs7cqssyze0slq7us2eqf6zau6v05fr5tk7kote04mtxsobrssq6t63clodwz855853ft3oon4d0l0u3ma8zp59yek25a7syfzqs2thagkr2sedhqqzaqqjgeed9h290l1t448wrfqsclaudklgm8c3pds2a4vgfs64i2drytnq6u6f4vue21ydowdpzornydhtksu96q62bj4xzlx7iykrt5fml1gemierca09vu9dw9wxlvhjee4qqtbz5bnsh0ki8jrzc5j4ajc1nnqcn4n4w15ktormj590t9apc8d6m3lxyy2hepsx89wfrruxwwlzjbp7w0zbjwrj52qsr71ecopk8vdt7ozkr5n8rlt',
                filename: 'rvd5rv24kp1gwmch9pj1pv73tb91a68iusfkdtfmvxxovloyv4by87wic6nouzwq8nhhvibfebj8xii9vy70s64ummj4il2vl920fe9ml2zp1nqf36vdu6pnlm0xakljxscrce4vetw2ic5tucjjb6zord00lmrc4vofloanzvite2yw4y7z55b5sey1cd0m67scdssikglm6iwbolqjtivx4wxi7s4t77u8465zwr8ko4bx57hzhnhsa5scqs5',
                url: '1wrn0h1bubhs7gh7ezp6nbf271rywg1o4mc4stv2ai6d6yn3kq0zkxwdmdrwuupcsa8dcghfnjp1n4xcynje88shv2rqkpzu32024g40b1udbftpah8l8nsundde201ob07cwdlrfn4jjdko0jdi7zhdevlzciqys8bc5g7hxymf7jchubrxvn8c6hqcsn42fyxec3zf1cy2hw3o0vwibjrgyfh6kuc1buzgsvhnwsrhk1dksr4vx0vibex5t6pwbq00j1el4bsdiv77d0felhtqczza7so68005n4pj7hrx02iv21mm4wml87vznu837pgb5vy5t7sqhgbe8g60v79f0axcktqzormwhuc153l9yxczcwr4c5yv7z2xygg6n7koc3eogqmdckduvqb8mv9a8tmyudiq9trtu7hiz8lwnc3rwz89ean0etqtx9fhesg35c60qcc55qfrnxj6r05brravkd7dlf8iaf242ykrjkovks2cxk8yp75j3vkerahstoc86o6mpw8vgzwiblipflfsn02b9vi1yrhzjs1qindq3y2afoytbd42gn679368je6scfzy7w1he9e1xns6e79ij1x1j87a0si0bg0pdx8yk5x7uqbcho7qq1xnht1wsllma4thammt1bu8mby5rv4s6ksx0p0ccm7voexlw75o1od3cgp7i6kimz16wgkwkgcoykntzhqtnv6bjai9gkicl47xmybcy2zw2yaapw7zd3aqs69jprsbjj6hxsj1kgsh21rcfxszkmypmga560of2t382iu2rkq32bnulwawivyqixkbu02r3td5xfrjea7y97jb0wfmxdru2h7myo96d0bdpfseh05zeit8v71kzu93onlbr1q2iv3pz0rp0jl2okqg4pmlsfu2wxtikuxheym6xk6it5mjd5et3okrks4bvu32zh5zlroa9pkcbhf6lsxk57m1g6aex39uvw6hh41xa4p4k045zzo5iq2f0grksph6upym1sfq',
                mime: 'oug0yvau84h1pyixk4mr9aitj3417ii171ojkpxox5wjgylpgv',
                extension: 'xdighczcwsrqj8yjx4l44y1dx3l9fpmtfptvmo2nuhbup7smzw',
                size: 7011853805,
                width: 698833,
                height: 435915,
                libraryId: 'f6be2d79-7dd8-46b2-84a6-557b4341ce13',
                libraryFilename: '2izreo5xuhm3mdty1pd1kpy64c496av074httx995n9fckcn3so34d77lhdlzmhtjn3ejwy1w0tnd5ofjjjobajyda1i2gexcx46z81eawcrmjuhlnlejkfruth9nnz8kxg3u54h1yrpa1sr1tgvsgyci7jjz1m0936h6ilgdmp55wzcblinrk5f4hne546mw11dcc95wyjke7ckkyi8ylbis9bmcmr6k8juocooz6pefo8sci031idzxq23o89x',
                data: {"foo":"VQ(;}4LLoE","bar":77480,"bike":94839,"a":"j99QS}-V+0","b":72757,"name":79568,"prop":"}n$v,aMzGE"},
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '687cac9c-15a9-4c7f-81e7-a49bc1c85e49',
                attachableModel: 'jr7arvmpuae7f34snqxxwe3cocvcbwokflep4hq1o369p1bjpsmjsy34x5qwxdddinyctkfzrul',
                attachableId: '190531ea-d6d3-4a55-95df-1ab2db3fb9c6',
                familyId: 'a4144cdb-0503-4ad6-aa1f-cf56f0a017c7',
                sort: 276899,
                alt: 'xl01t9k3pelh09dgouh5xkx5etohsop1t2ogbxfa350ev7r4ya47u9we8bqcxt1cgttg5zbnteu7737a60k6hc77pyg7l8ub2bc35ryj7ryabpkko15gaishg5fx9yl0mzthkzq9wogt3p3zlc83ufys9fuz24uo31ijv900imfj6l0oip63jwpmox1h1cqd7xikrhij9h0guu9ueo62j42zdq7sn6d5eayopga4tnhoktg7esoan018v58rfrl',
                title: 'bhi3pixueu9sdqkcwvczb08dpav197mvz8kumm7egw5hx6st4rmp2q1tbjbubx3h6c4rlkhnx4eckdchaboh080ap6d0xienoixjs7bi2gvdrqchpgi7epku37comzyeycjla76nm85ic19ipidkezwoul2yaghxown0duya4mq6okypdxwdwuvtxuekzptpy6g8n77ic3vhxe1f23av06ehqa7q36v1lfxfi7spulmdhy5cd2ihnu18h2dckq5',
                description: 'A porro aut in sunt possimus voluptatem quo veritatis. Asperiores dolorem deleniti. Temporibus qui consequatur doloribus neque nobis consequatur cumque animi. Est et molestiae voluptates ut iste adipisci dolorem et. Magnam ad soluta dolorem.',
                excerpt: 'At ut aut delectus consequatur sequi sed. Quisquam maiores nisi dicta explicabo ullam voluptatem aut aut sit. Autem nemo odit eius. Impedit qui repudiandae suscipit qui velit. Aut in nam quis perspiciatis dolores reiciendis harum dolor voluptas. Maxime minus molestiae asperiores ut sit cumque cum quisquam qui.',
                name: 'bgjlveb49w4q3v55cshfoc3edqdnr47alhd11u8bmbime4vb4wwjcu7qe7ad4aj49f1tgx16roqato6body6flb91axi6lcrz7cina046xwnlylk4upqzhrhqgbojcpsepozftr0s1nipmi8sqrd5le27i41izhaz3txyy1q5bxddnlzebhe8w8qoar6l6le7txk8nhojzeqqxxlgnqlg73nuek84ghjya3rgqc5es00b9l2ffeksacc5xtz0er',
                pathname: 'wqgw1fpntuagr1mao6fogrnemgwj8cqtvfmp1b10skh4bno1zz8jss8ccl457h8sy8xu31layjj74oadlbty7gx250h7wkiv22mbcd0q8g2znpdsfgeejjnc77vlplbn5holwm39d2sp1std389kn08se7u8mjcuc9wzfq1m2zlo214la747n6v6eh3ixbhh9s0mgt5scn7jbsozvfrdzf3m1xazjx098ox0qvitdnziud65gncqqhflx89l95xlmysvzbjr6qkjw6sxf9yvlsg3iopoxwqdlpdlxkdrz2x8s7dunine2qv6ciqp8zv20kpuhwi844n5dspr7gkzgo8f10nlavok488uq7kijhmf60932qqbwa4cwzm8xpeixb42kuic7xe7l4540p0y85pusu578ayt3q3gef6t8dafjxw5gh2ja6b3wjlymfhrmc9inijxr0p9vo2iknyvsy1502oxl32ke397xzj7xmhuqrc7w3giso0q93gnb4mhmj94gzdfb11j40n2bzfn5713hswk7gqh6t0lblp7whbigoibbze0v92vu02fx6dtnyo06dcb77tmbh8sw776uzovgo54hiar9skciuu3lt9nai7othd14nmkkhwi24un735fqpod0kk17fqv82gytocs8cc0jgvqhfxsvqyxfna1m99nqn7h2khzsm99nrf83gdqx78ujd09p9zl1ywbt7k1mvgnqygaqzfbfxu3ci9ckdaahzcjzakqxeic7qbit03z90orcwivvby807fwhrb39w3rtxofnqoiv4pdfktgiah6ggjwlymz0lh3wzyhlyy0w0sfg6ty630jhj94w97ek9v6bsd3mkgoi1v7jpv5yw35ewbpiflfdnllgceign5lquk2ow90a9nttya98v1irxivxyuymcf4v3wavxrudzd88b8nysnzmt3j25fi3w09or5tpj880lj088zuf96l2e4pd7hxbmxii189s1ny1x5ahd2ekair3yei6b2q',
                filename: '3u691uebpex90apf52zwhq924hm7iz4cjfuhkh5ktug8skgjmgup3ob939f883opii90hegj3c3fos2zi9fj6wamm7t78a3gkp1uqh5u0tiryb332jcardzq1045if0d2azp9a5gsxe5bkbbyvsyu3cc8094rqk6o87f56d8imqniiwno1rzuf674ditlg04womievfr3bemg69kzbc7cetlsaqtklro9rz2agvmp08o6ivru4a5u2ld13qt9tu',
                url: '5nudgvynr18xezsy2klhjask48tgprcihocxk7a82pkboun807r16vl6pt4ltjib6x2xl80u71lg6lvpex2ifg8z2m7xkk7exesxht61zcje6od96xgfft7rasvjraeedbhpyhklbghu24c6q6t0dz69fdmpy1ym2jcnwb9w2uiw4kpbiyqp78iicczp64uxp13hp4f7m95ayuq4wr6j6ds1ljmw38jbyze35wg5hcwsfo8hjs17o3js06uwy8ubap6661v5ktc08n2u4g9gi6h4idc2a7hu25srnvpwmdezya89qpeqlrsoo45ra924x39e2sfn7jdcpqml0bqxggejciece6oypm9cajckv48sropaopwxk823g6f1ehfwyppl9tniqa2bq3ahyz32tzbakw6qugw7lprgog1o5kjalpf4zz65q7mut787awlpzul2z1m44ofclgdarz74hlaukew5jw2g4v7p8scgmttd1jehjzhx8he4bnzwd88xknblcnkvcfezpqs9ojvmsiokkqsyzloqf6gjtu5vlzj1qbv47m0h8qegj4gsytpa5a921sxkv3s4pxcuq1la5t8dxxxgr1tzz52poi7gfii9t4sbxulljkp992pyyzp1igm5w3bzk2612n17anq4cfwj38w8dl7k5h5xqpaswuqna6zic49hsl3qyy6mwgv2asc0vd2zepmacgv4e3ohz1pvki0wgqfu12rkka4pbn0zkpul2ofvq9hlm11ocqa0zdc3dzy194o5azocmsme6124hncboi9dq6mbexnyc3zkdtwrw1irnzy463c3t8l0fv7hihvi1frc5p2b4oezvb00238pv8zga6n78jmt38srf5gu64lhcwvqauafri7dhke0c0m3b0lpo8e3m1nzrdl65hdpwt11dtgy5y1oei61uydlpvo3ljihmccixx93rwl2862emum0c4su28x77mvticyz2nrxshx26ngrsoecj5up47wxd3bqtplwfnui',
                mime: 'wik3cgv2ohen4263t1oblhht82v27vw7il44wqhvj65pbwjqn2',
                extension: 'bada1xv1twjbba63xa0sbxgd8q86ut9fv2z92fl3v5rt1qvakb',
                size: -9,
                width: 996536,
                height: 155275,
                libraryId: 'fde26551-a9d9-430b-bf02-c92e1877d3bc',
                libraryFilename: 'tufsal3x7er2ygkhug0anm7veqdrnne5mg8v1gwvohyi9r9anlj1u5pshr50rfyut37i0e1b28txew4qvvrf6qqmjrvfi89ciks0gtj49lplp2ywe7dmwo0b2j365rrk1ewsuxl2o8ui9bza8j29g956qaj8rra9vrb4j0kuia9c3j6px9zbo5bs6us9mlqw7uk3pjwy1qi9zi6j2is70lmdb2k3sf9u0l3p84smu7qsalyo42bff4tawevza6b',
                data: {"foo":3616,"bar":"lE|aasz\"A5","bike":"?;|WhBK5\"L","a":"CG{Lo^+^3L","b":"Wnphnl;0Z1","name":"kOKV'?h9l$","prop":".cBNwD!Yj}"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AttachmentSize must have a positive sign, this field does not accept negative values');
            });
    });

    test(`/REST:POST admin/attachment - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:GET admin/attachments/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachments/paginate')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({
                total   : seeder.collectionResponse.length,
                count   : seeder.collectionResponse.length,
                rows    : seeder.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET admin/attachments`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachments')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
    });

    test(`/REST:GET admin/attachment - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '371e48ee-6102-4441-9efc-e17fc103346d'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST admin/attachment`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                attachableModel: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6ie',
                attachableId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                familyId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                sort: 250359,
                alt: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                title: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                description: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                excerpt: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                pathname: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                filename: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                url: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                mime: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                extension: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                size: 2488113228,
                width: 855183,
                height: 484268,
                libraryId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                libraryFilename: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachment`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:GET admin/attachment/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/6fe54ec6-6b68-4680-8fa2-555fdfb2ad32')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/attachment/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT admin/attachment - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                attachableModel: '12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f',
                attachableId: '125dda91-89c2-477f-922a-5aa69263a1c5',
                familyId: '6085f6fe-5991-430f-bdf0-96b0633afa03',
                sort: 596332,
                alt: '2zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkv',
                title: 'q7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncp',
                description: 'Temporibus eos exercitationem maiores autem adipisci quod. Modi et ut. Sed quis est quae dolorem deleniti minus. Delectus amet voluptas. Quis atque rerum dignissimos cumque nemo qui. Dolores officia cupiditate quaerat enim.',
                excerpt: 'Quis quaerat omnis expedita voluptas expedita corporis qui. Blanditiis incidunt sint mollitia culpa. Rem a esse delectus omnis. Atque suscipit aut.',
                name: 'bai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrq',
                pathname: 'vlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzdntq2d',
                filename: 'wpfe69m3t43mgjqiqozv988o5uvrvzar1sn5k5inohd66avgziqwkfrh5yokp5zfcokdax2wvhrolweqcbr4523r7pxmgq1lpka4smtlwwoy2z1yp7i4ky5d7hwje8mjrpcsxyqxcafwoiphu9onf67bj10ih0r2czpwg5xku796d23v2fei7jhepble3wu4exl1x0zul5p0qv2ahsrg3i6x7r6oxhxu0ox436wmc6e90hg1qzprjqegqzvxybf',
                url: 'lf53k64rl60ixc3yoyaq4b5dsnppzhh0xbxsyi61qmqd8xwa7ma0do4vxf1z4oqahtt2gnbyg2gqc383b9j7j58ilxh0o635ynbj3p1314z4ruc5zxlgdcoh4hsr8rzap39slxzj92i3nx18hn9hbt8tv3vuko4uxvvr8x2yp6qei7j14xbrti9oc9y8vofpxqlihxol63jjd28cnmb26u3cr1n1wau1fehl2jqe2kq7kddrcscxpi1v8fkk0y7wdzv44cgydt008h03qs6v1s3v441yuxarbxog66bxf6rzih1co0zrwmjkki9n0xafrh2tts2ar26nvhfkoolce3bf4nexrel1vcoekekzvv1jjhs9u4hfsdddm8a39ppv7xyaqfei961o369koum4imkc1rwsnb9udmb00415h2uwz7a70e309ux0etr9w04q0qhgr1q7xyavsxfmvtbul7chommvhfzwfi9lvwdsaqvbzknq6maqnsq25wy0mfgd0f2k115ic61q8pv27rolnkrburd6bu4lqfhbti9hdp863ipefk7u4y3r9eq1g5v533zqn2d3nckwn48lxkgpbbhemaoidurn08vcel26a4aarh150mtkezyia1iv9wz3jaxq3p8k3gk777c3pip5oa2t18jfxy91m5yjzzub21i7rudhhrx9h6mdk15q3b1xl8o6isub1nvd2sjanjdxnzy6w5xf0mslm3oo200c2burdu2hzb86dv8bz89y203r4lz15ox4syb1otjzbxr9rl5ys1tbh1sm9qjea15x7pg5p7hciz7rlqb8vxznizh7s4opar59gc6lpgvr297siy3265w1v2vtn6kwoe948o67j371bj5umen4uem0vfq56fqgfuedaosd98bn5sgja46113tk4uunvynd3frv6jzguefgic7mf1litwap9qwrwqkhf6brghmg60gp852jo45q9rtqs91wrs9hices2f07iqddtgfm4d1n1x8rxot6',
                mime: 'mq4z51hblu578t7n0ufrm2480vd51tl3vld5avxhioook57742',
                extension: 'o1sx4qzxwx5cxgh5o7wcw9m2ove6nku7nm5lgfh3eakk1auiq0',
                size: 6206689607,
                width: 420083,
                height: 180917,
                libraryId: 'e87d897b-30c8-4972-85d1-44799cdc37d7',
                libraryFilename: 'p70srcvzkkmlu8ykwen9458cyet0f5mddj2aukgrx8hyqhqd6qlprxssxoowdr7mqpb8uqmrnfh8us571ankn4ia4nw80fzvzrtg8auyirunqjrpm241k2gozmljs9ngt8aw4owofccs4nqyyx5hoj1bx9puuwxqlb2dr41buy2whe59op1lzvhmsuvw2qefw8hvrad1pqrngmyos6r678dbgjooxjv7k37xxwapq77ouufx9rhbvlmw3qs1213',
                data: {"foo":28215,"bar":"_%:vqjlAEG","bike":"IzP{g`2\"qH","a":8664,"b":22019,"name":"BNZaTKZpri","prop":78136},
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                attachableModel: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6ie',
                attachableId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                familyId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                sort: 767169,
                alt: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                title: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                description: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                excerpt: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                pathname: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                filename: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                url: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                mime: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                extension: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                size: 8422930274,
                width: 411099,
                height: 858128,
                libraryId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                libraryFilename: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE admin/attachment/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/6d4a12bc-22d1-4b1f-b410-0935d6a11e40')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL adminCreateAttachment - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAttachmentInput!)
                    {
                        adminCreateAttachment (payload:$payload)
                        {
                            id
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
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(seeder.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    test(`/GraphQL adminPaginateAttachments`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                expect(res.body.data.adminPaginateAttachments.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachments.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachments.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminGetAttachments`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAttachments (query:$query)
                        {
                            id
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
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminCreateAttachment`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAttachmentInput!)
                    {
                        adminCreateAttachment (payload:$payload)
                        {
                            id
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
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        attachableModel: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6ie',
                        attachableId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        familyId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        sort: 427911,
                        alt: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        title: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        description: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                        excerpt: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        pathname: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                        filename: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        url: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                        mime: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        extension: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        size: 2467912523,
                        width: 723721,
                        height: 575081,
                        libraryId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        libraryFilename: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachment).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminFindAttachment - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachment (query:$query)
                        {
                            id
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
                            id: '236ff14e-1629-4ff7-90fa-a36e08720721'
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachment (query:$query)
                        {
                            id
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
                            id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachment.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminFindAttachmentById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentById (id:$id)
                        {
                            id
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
                    id: 'e034bf25-7d8f-4c73-a627-bd7a1d0d4a4c'
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentById (id:$id)
                        {
                            id
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminUpdateAttachment - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAttachmentInput!)
                    {
                        adminUpdateAttachment (payload:$payload)
                        {
                            id
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
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        attachableModel: '12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f',
                        attachableId: '125dda91-89c2-477f-922a-5aa69263a1c5',
                        familyId: '6085f6fe-5991-430f-bdf0-96b0633afa03',
                        sort: 663889,
                        alt: '2zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkv',
                        title: 'q7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncp',
                        description: 'Temporibus eos exercitationem maiores autem adipisci quod. Modi et ut. Sed quis est quae dolorem deleniti minus. Delectus amet voluptas. Quis atque rerum dignissimos cumque nemo qui. Dolores officia cupiditate quaerat enim.',
                        excerpt: 'Quis quaerat omnis expedita voluptas expedita corporis qui. Blanditiis incidunt sint mollitia culpa. Rem a esse delectus omnis. Atque suscipit aut.',
                        name: 'bai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrq',
                        pathname: 'vlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzdntq2d',
                        filename: 'wpfe69m3t43mgjqiqozv988o5uvrvzar1sn5k5inohd66avgziqwkfrh5yokp5zfcokdax2wvhrolweqcbr4523r7pxmgq1lpka4smtlwwoy2z1yp7i4ky5d7hwje8mjrpcsxyqxcafwoiphu9onf67bj10ih0r2czpwg5xku796d23v2fei7jhepble3wu4exl1x0zul5p0qv2ahsrg3i6x7r6oxhxu0ox436wmc6e90hg1qzprjqegqzvxybf',
                        url: 'lf53k64rl60ixc3yoyaq4b5dsnppzhh0xbxsyi61qmqd8xwa7ma0do4vxf1z4oqahtt2gnbyg2gqc383b9j7j58ilxh0o635ynbj3p1314z4ruc5zxlgdcoh4hsr8rzap39slxzj92i3nx18hn9hbt8tv3vuko4uxvvr8x2yp6qei7j14xbrti9oc9y8vofpxqlihxol63jjd28cnmb26u3cr1n1wau1fehl2jqe2kq7kddrcscxpi1v8fkk0y7wdzv44cgydt008h03qs6v1s3v441yuxarbxog66bxf6rzih1co0zrwmjkki9n0xafrh2tts2ar26nvhfkoolce3bf4nexrel1vcoekekzvv1jjhs9u4hfsdddm8a39ppv7xyaqfei961o369koum4imkc1rwsnb9udmb00415h2uwz7a70e309ux0etr9w04q0qhgr1q7xyavsxfmvtbul7chommvhfzwfi9lvwdsaqvbzknq6maqnsq25wy0mfgd0f2k115ic61q8pv27rolnkrburd6bu4lqfhbti9hdp863ipefk7u4y3r9eq1g5v533zqn2d3nckwn48lxkgpbbhemaoidurn08vcel26a4aarh150mtkezyia1iv9wz3jaxq3p8k3gk777c3pip5oa2t18jfxy91m5yjzzub21i7rudhhrx9h6mdk15q3b1xl8o6isub1nvd2sjanjdxnzy6w5xf0mslm3oo200c2burdu2hzb86dv8bz89y203r4lz15ox4syb1otjzbxr9rl5ys1tbh1sm9qjea15x7pg5p7hciz7rlqb8vxznizh7s4opar59gc6lpgvr297siy3265w1v2vtn6kwoe948o67j371bj5umen4uem0vfq56fqgfuedaosd98bn5sgja46113tk4uunvynd3frv6jzguefgic7mf1litwap9qwrwqkhf6brghmg60gp852jo45q9rtqs91wrs9hices2f07iqddtgfm4d1n1x8rxot6',
                        mime: 'mq4z51hblu578t7n0ufrm2480vd51tl3vld5avxhioook57742',
                        extension: 'o1sx4qzxwx5cxgh5o7wcw9m2ove6nku7nm5lgfh3eakk1auiq0',
                        size: 7070035924,
                        width: 560736,
                        height: 284409,
                        libraryId: 'e87d897b-30c8-4972-85d1-44799cdc37d7',
                        libraryFilename: 'p70srcvzkkmlu8ykwen9458cyet0f5mddj2aukgrx8hyqhqd6qlprxssxoowdr7mqpb8uqmrnfh8us571ankn4ia4nw80fzvzrtg8auyirunqjrpm241k2gozmljs9ngt8aw4owofccs4nqyyx5hoj1bx9puuwxqlb2dr41buy2whe59op1lzvhmsuvw2qefw8hvrad1pqrngmyos6r678dbgjooxjv7k37xxwapq77ouufx9rhbvlmw3qs1213',
                        data: {"foo":28215,"bar":"_%:vqjlAEG","bike":"IzP{g`2\"qH","a":8664,"b":22019,"name":"BNZaTKZpri","prop":78136},
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAttachmentInput!)
                    {
                        adminUpdateAttachment (payload:$payload)
                        {
                            id
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
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        attachableModel: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6ie',
                        attachableId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        familyId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        sort: 720210,
                        alt: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        title: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        description: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                        excerpt: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        pathname: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                        filename: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        url: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                        mime: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        extension: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        size: 7280252090,
                        width: 932148,
                        height: 945601,
                        libraryId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        libraryFilename: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachment.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminDeleteAttachmentById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentById (id:$id)
                        {
                            id
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
                    id: '28a5b370-a56d-4646-80ea-87198bd738d4'
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentById (id:$id)
                        {
                            id
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});