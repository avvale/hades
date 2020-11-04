import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IFlowRepository } from '@hades/cci/flow/domain/flow.repository';
import { MockFlowRepository } from '@hades/cci/flow/infrastructure/mock/mock-flow.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('flow', () =>
{
    let app: INestApplication;
    let repository: MockFlowRepository;

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
            .overrideProvider(IFlowRepository)
            .useClass(MockFlowRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockFlowRepository>module.get<IFlowRepository>(IFlowRepository);

        await app.init();
    });

    test(`/REST:POST cci/flow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: null,
                hash: 'cqm1by58j6ife9j4rzjsxyp1w3p2hksevtdvfxks',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'rf2c6j9zjs7050a9iprudrc7dn9qyzsf0mwojdthzjz2i7youg',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: '5lhodnkvchisfbj4ow09',
                version: 'fzmijrt7t12px2h45efs',
                scenario: 'qzgwr5t5cgqy4tkqv8blwgupyqa8ivguqv74stv33qbjeq6wehg5x00c4tdh',
                party: 'tk1028u4mphchcf5bleecytj2xam9v4lrc5vyxxrdepjscyiga0vhlx7lpbai6i0hi896jkpqda6tklf62i3m8idrk5224w14hl8z3nsiikychrwy9yli8sp07fh5qpjp0yqap1sxvfxf2jki409lixlel7xyb8w',
                receiverParty: 'dyuomugylmpzqqirxyzkpiyichx1nfwvkfh81uvuwzralf7ej0d3x39u5pipw6e1c4hf6n7fl29ce9ppnzem074pf18mmlsmvsewlqr4vmnpv6xx2l9hspsyv8ngz21jid04gdp958z36jc64qrglbh5k09er41g',
                component: '2d3fu4nev8ay72mfo5ejfnzccnnxmhkzdbzw56qv1ay7nvxaz47mcelvykzoap2lejs81zckvfc8ul3jsvz6fvlm6qlkjx11lc4cofbs5g6pqooj0w3wc0oexzfejn2886xgdsl5g60x6qocwudj4q62a1wscjbl',
                receiverComponent: 'e35yaf1p2m8kufoci7hpkfmn98f6yafgu0e5akk1mh1nm8lszf2fnxb4amtthwote0dxqh700gyoi9cbt5hakexel9i8r0j2gv76vxsm49x21bl64tmw6krlumte4glh2z5ua1ez615go24t2wh5h0d46d0ce6oi',
                interfaceName: 'gvn2srf9ey5tr0lx2niemaa99fewxsg9jl0hj9qewus2m6hin9y00hui55xohgbttneqvi9vjaksxf1f8p6xi6r39lyyg45xyo4fp3626wq2nirpnza6ujjv0r1cup2j8yhuzk5wuo036qmmvdxufsqtb7qrtl1z',
                interfaceNamespace: 'i65ad47iad7c9mbej4alnzoea5ljhnp4seofba2c0tazs63frub121szfec01lzf5sh7cqx1pcs3kjcdppsgnblw78k8rpktvg9p8mnitpa3nzejlcl1wu8za413sejp6zmtqo0ax3x2qxu2l6htoovj3o07szq2',
                iflowName: '92591wu595a1br6mydk83ngm83e8bbu5ai7o8es32d5tcjuimmbvta0aen4vfxhbx6h8vblptmn30560aymbz6btqo0ysyid9pzgxa0h1nh9dh7vexef481tylb21okog1bjxne6r97q0dgc8575b35mr05lku42',
                responsibleUserAccount: 'uivtc1tumoonsysjiogp',
                lastChangeUserAccount: 'nwh3caxv5k863babluq3',
                lastChangedAt: '2020-11-04 11:33:20',
                folderPath: 'mjnftyr2z4a0goc6cdovgsyn7kt20pacwwpr2d8mpdom7x2w12h6q39wynp8m6bhykoyzgp0s3g5u8rbg2vfnz1c9ld0dwvkvifnfw74uhv5svy9fnd8tzgl7br0cfw2lu0hrn2tcujbmljtbe3b0x8qy434w1o0fgi9m31drda4xcpovx3qcbb670rrwp3yrzpqppubw32it4vafo12gkra8wu53jvhei33tjxvsma9a5hkrqq8hawyy52yjmw',
                description: 'ctc0h3bufpoo4ptgloupiddiw0128pslsv34e86b0cp1uzxkhnuuvcds1hg61imd551msi6en6tao58tzcqpou8ajfcsnnf8x9xwkfa59rfq19umz5g5ylpakveeyjc15zd287iaac48d61o6dbwgqirepn4rjzu0yy032mnlutpvzug1jnhtn2t5s3i64o6zjpfpp6iv1bki1qf1v6ttnmvraog1jc3qkjmy80mg3jparfd1mzobmspx7cr3h5',
                application: 'ey0sjpixt3806hvjvcvssdp04ez6bla9pxn9o8h3ma2h94pfknzd5uky0rdr',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                
                hash: 'rspzc3j93jm2dvxwak708x4e7rew4oep5qeo53ad',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: '4qtwa4xpqm2gt0xa87rm2ntugvgu6rwt1wl3bn7qppfmfngz7o',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: '3j5g613oqvokc72g8ox4',
                version: 'athc0b5ouxoznltx033t',
                scenario: 'zyuhljk3e6vx1lrrmasa8v4n23li5i79d74iw3fftlt15br4lrh0tic2g5q8',
                party: 'cqvxi7py96ejf3189z5k7pjp77bvaarrh8jhen4732f7o63ooobest740pxxq759dky8sz10c2js4itpwttpmiyj9gtn82tcy1d4jgezkep94j5fzpv29enxwfln925yqwuxb3likpejuiam2cu9chonfv8djngi',
                receiverParty: 'voyx5cb6tev5wzjidplmovnuu0veusu5jswxsjdl6enqaky120jzs8dugmtpa1infyiv722g8mrnlnr2smy3c2ue2behcfsfs9axputc6rw1yc3rnu9zmnqipci3tp6j5ka8eoeavnfusebs5yke0wdc6p08i2mx',
                component: 'sc423x92t558e10vfdifbex131j5ty7mvp7yi8mif1qon3ycor53s3kqkcd4dko4eokpwfi8shxpzb3ngroha06woyan8mgt7joxt5ww44nb5e40goo60kothxcf4ergxd0vd6bsrmnpfki4qzifhau3gbdjkkky',
                receiverComponent: 'szt24k9w1pqz3n3kl47w8jwcpfsfg5u3woe7znepefuvryjfcu9kg3grrckcxx6iqg1joaat0dxu4jru68u40x3wusvpo9gpngtjfkdcmzfk5u8i28ug8kgn6kkstnmpwtnjqd8hozaof177obc9g5cqftr3cioq',
                interfaceName: '4p1vnfyzmx4x0sxfg1szkfxc6hhkdn83q0w93muir10bboo0dwcxgtmzkttdyou3filhjx9x5n7dp5cdgq3lumo4dfnnj39b2npc21f9xj8yqz5rx8azoportjjny10jem4j987921r7x2rj4e2luzua0an227tm',
                interfaceNamespace: '4r1s43qnwmqlklhivxgjh3wg2ek3p65yy356qgoa32l9moqd249lmqzu660fmvfyof6lqup5bi5gx78ylp84ws22zbtag80w96siofijtgd5zgkvl1ohkzui548g5yrtzj8mv1mu8nkoezn0ncwdxsr018xz77up',
                iflowName: '0lnkzemlc9vr99iae87ro4j11bifc65q5udhyt9wjqxtggpdm1hdazdel7bt62o9f4yfezrbsqiu7rb69a66r283kq6h0vk3n89sqlt9e7y0w8qh3q9c562p7meo7zx09sexevmrdt5uxpj03icbg70qz36upp2z',
                responsibleUserAccount: 'nui9oprozg1ed2bx5nh5',
                lastChangeUserAccount: 'ep3ftksu6ycw8lt930if',
                lastChangedAt: '2020-11-04 19:05:24',
                folderPath: '6vdv3lfcq2josrj2woq3rsycz33ezc8uqg74wfdc6py3p07uj237tjt0aeebnxbtn7siw6vdshu512bajrjpn4s4q9qhyxbafuwuukv0s396hil7z8m1ghgpdfn3tfspovauvbh2al966yjl8gtwwdogc4na195tbcstll9lgk5123awa49b5cajr219qzse1yfqtcaz3lzwbtsn2s149wunajltibh0ncw3z443euqxboerzsbmuhulcrnl70m',
                description: '7b83pze6e8j0cy1gjd3dyororkf9tftmb5x5cq8db6fxet4og778sk3osyi1aqtoav6jicmgredke7940rd3ugl3x5xvx14zter5q6djwnu0j6b2buhgtrx819c2kvxsj5kp41odh52egilu3uuc5t1vllydq3jdweg1c0vzir5ejolere0hs1xr3d1llmw5yowihn3aaxpn7yzktwh5c4tb8pfc9z1sq5vfm127uxr9f8vcwz0igc5of26ifc3',
                application: 'hbfdmqbok8vkwutzhup8k3vbmmnx2e9phq1j9ak6qwvibufo2tqs69u6axxo',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: null,
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'e7yk674fdhfvvh7pp2bzntlqwaj3851g59o0b6isyvpnpxucnc',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'g3gmz0bx6m0ljopbb8cx',
                version: '7zzat0nct2z7v8gff7ov',
                scenario: 'isux0h8fr4awg706wdhdpb4b1jqsy78kzm792te5tog0goa7gjj4je6en6zv',
                party: 'jjal53k94cxflfjaneyca65fgryf3owst7i4yn72vdbbtu8u01zyb0504h2wjaklgnnb9w6u8ju2unslc8c4sq1bkbcoa2webx9bsyh37g2k727qn4tf6mlc82mhc8in6mcoosody7xs7usrbxht28sx0y7cd3fc',
                receiverParty: 'wc2g0z4eu6ca9rombnb2i5ak64rycqje097xa28o7w8lb9qv02igz76m6vlqzn8s3gn87u68regkc34ksiq72sczoz0by0l7v6ggyn6o99uuszqwdj391mfd7f5cq3h496j651lp7q2sx458nw78neetybjobx0y',
                component: 'thqdzg1kgznkg11ygoh8m106bbfeem3jjud45lef48wmemoc9g2kay7sxuvypwbb98l36bojo7atpzgxwcjdposp7ltoa8jtwmn74hox60omz4mttu700k14e6l2llm0dshyyjf2dm8ot7ny8pc3zk1jrcfdqczq',
                receiverComponent: 'rz8jlzu4b3l6o5s6ziij3wmjb4t16irt46ph377ijv1n8430goqtskgew6gc4hcejgddpu83qxe4p7wvnux4492d0vozksfxyegd5xlcmx0sx12y3quxqo31fhpcx97ip37ujw8adsjv49ndyigbr6uyscu9gq9f',
                interfaceName: 'qdhpq0glsklhc3un4wrgnfu5wnpdeycj5rd6tp7qh3wvfnobxcs8ilxs4aw263flhj3crsonls2vlz3fc4bf2nkjq3exgq4vjvw3c2d6ugunh3tzzpfiennqijvwsxv6c3xbrmh1wbw4wgwfk2ph8ie5argaplu8',
                interfaceNamespace: '2yl20ut7mp0o3h4q0nyn162pgnyj86g51qf0uu023svfw3acfuzlivhu9xgxb84ltitf1kaxuczozmuvqr5hhhin3aotsbug2i9s8yh0kwafbljqxpwwto3gkn06itz01rybv5ytrhvyo14fgu84mlcqh19n0n5h',
                iflowName: 'cjsgflc73rdg4dooottuuipbd4bs7u7mm4p13bh11rhusgoetf18at1ed4guts658ljl54ulskw17kiyx0wce6m7csm9pm39vfakjxegny47ajh1c47x7xa9gtyahkc5t681nnfeskxqe7vd7tq83h7khx7njw22',
                responsibleUserAccount: 'qk5n8h64wss8vxz3jnao',
                lastChangeUserAccount: '0ckb1eo15cfhvmhe0ffu',
                lastChangedAt: '2020-11-04 15:33:18',
                folderPath: 'ic25j1rje6s4zt1qtri75ng5z4omcclgup4dg6umvz0vwq8xxghgizzbivqougnabe9dx7uj463ziarl02nwotr9liasp5wg63gkggc31giyj9w84qrr6ye0diixrdkvgsg8pmb7283h2mgpwhzu1jm15rdt2z0ayg4ux5weqj34t1hxds7hcklgeufbpd36vf3rltvqlvidmwqla2h5cv3s0ii908rwec6rj1d21r2y2nzsvv8wai375207n14',
                description: '8dfaizt6nkxmkssq72gi7f1q5676s706e4699i56yti0grr0wpqwtczljvpap0rxaf7bqp9o5la15munh5nulo36jgrcxss5nmd3172zw08c7e74ghp5c6x9o5trr8igluj437p9okql8dnvy24j80qye7fieww1r5bz5foc9d8mex9udzmh599js69m3i1zjax7btq9wdkg9f5yz5zszm328h6zwzqk9wjh8corwv0xtwpk2fzrijryyq70ymf',
                application: '1vlxv6dw7kdercb0qz9oxzxpkw2oaaf2pxnpd3hv72ddvobf7hr3nyg3iexq',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: '2a3qg667pg5k151oix0rlc1untxfvkbu9sdnj4rhlwdttavv7l',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: '3yrztypyyizsteokd1wy',
                version: 'pztcbhl3yfbmqo8gsfkr',
                scenario: 'qd8wghgdl2l3ewjswjflb8kcjkc8sipzgj78y5yyw81ps7985mftp3jqmam5',
                party: '282beuia2d52kw4kfqentqeoq9p1wlujhm3n7k1w27pywe1mxpj628764qiq972txz0yudyeamgksw2on256rvd94k4x3abqnaguj7q9lgfgwnpr29691klsawm8qe3qd059927aa7n0z9k2e1mu6iogzelv36al',
                receiverParty: 'co7armjqw3h9s4yzgjbgdybpntct6mukbcklas53wbumyqk3qkfoqlo83nmcw5zix7nk0833tfz6sjl00o6ooqpar4yxijg8125rts6td4jrlxzt0vu7jq55vtmmyc365b82112o2wa9skgfbjqfpbjpqlg8mvir',
                component: '8aukyck1muaqtkoqc85whq26ae2h9p124jqlci1h6s1lasbhanrckdnxxj5alex8tcr3bywqnflr0lxqf1wq25h2vnjbmws2sp9xltrvg5bsfjuf69s7nsv8g0nhl6jewj2f4quxi09ylpgz2mjsquxomcx5rab7',
                receiverComponent: 'jaivaiyj6t6dnpdt9udd8fun38vo4hb0n8l7hw21htq6b97sftbudwd25ucxs1e5hi1ktw6egwvn8eaydcx5q7885khyztdwwxsarhg234j4n9yro1mmcl68s2o0893fey0998gypoue0gwivegf2mpvdiluclmu',
                interfaceName: '5nhv5hr76f5gxb0zmew6aato0wonx64kwg2whhrnyro46yse9c9rby6f49f8lz3bv00tt1eerha6m4308kzaqltxrhl6vhtxzwenw92365k11ad1p0w2bdk3kfeo1kpkxfnusi14fx005idubx5z4fe43bk7nafn',
                interfaceNamespace: 'nzyh2czjfn6h48gk24r0aa0asm7w8fkr9vd438fphg4n2jliqwu3748fue4qwfl5p6srmankxyqa3qauwtt1t7r2s3i9k5bnflorftmur8y3zpoks9hin7ar0ifo7qt0hrvk20x7q52yavsty78091867avaym2l',
                iflowName: '1lnmmhbccx20b6ln6sf37pj1is3tkro0c3o2fpi9p78l28romwcohuusfp0vkp04vor7a7mhn6ex11ew22gds39yz6fslqln2tgkvjz8v23m7ht43af1digf52j3mvds4gzk6nj4g0cl4xt4oytlywty2ugamcmk',
                responsibleUserAccount: '5rzwhe5w3uuprmbugiv4',
                lastChangeUserAccount: 'beenerpkh8ycdzk55qei',
                lastChangedAt: '2020-11-03 23:51:46',
                folderPath: '6zz7oma52f54xo3jhuer93gxayajp3qnkl3rxma1jp64v7pbf168hrslv5t10l40ubs8cegfe26upuskd5q3u5doqa3i2hjk9ahrbmo1fzbv3dtwlv2wzyzj42riekbubq0fvn7tgmpebsrci50ujpc63w3h6spka26ldakssrfzsk9612ulv4v2idg5og94e7hsryygsga1h9k7of2p9h9w7d9lz9q3g2aotr8q3igc7dr0t6q8bzp23jwpchr',
                description: '45tyynlgov9ewhp8aw2hzbwppjaiaokyut6np0uw929jdv8dy3bj4d7mor3vllcfhgsf8oh0opexvm3g4esvcs3hv8bez3lpujwa5428tbvscntzhmjvbyy0wjgbjw367qtg4q7t7u5xsv242x87ctmdqctzz6smjjpg0zuojwefne5bvvj37zfy3onattxrw5iyrztsj8f98c3eh90w2owr89kxlwyy91kuramd6xb4ylsziwz4ibhovg7ntt5',
                application: '84vx6y26bxemsh8x46slz0hz5fculyith0phh96431jzh9hpzhq4vr25r1il',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: '4btwxcvnsysauyy9ozccq17fhzydk3wpm0r84uj7',
                tenantId: null,
                tenantCode: 'o3ggjl5pv6em648hbu6zbhla60was761toy29u5k1zqk3g0o2z',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: '0wtzr10xwpnjmvn5jnkw',
                version: 'vnvn26d1d2c38dmmj6zf',
                scenario: 'etowt4s39re4olcg8gxmji01oz1o4xv6ulknzi8fjmvku3jx9lm2o57w05be',
                party: 'snkx08uwdl62b9lg217ozk76ngsspxox4fyw0uff70kianx668vyx87lv7ksk1kkc68rpabuzhv01z1obrikxtbbfz3i68gxzwptb013v3pymukftcgf10c8b43b3occm5h89yoccb0ukt3je7oi22voiqxrelq8',
                receiverParty: 't93tvpm3d0ruclt6wl51sjr304luybkyqnz5qabn801naxgwm99s0k3lbxfzl6x4gcp3289xf6fyne0a2iof0yejp97tow2qi7oq7nwz8d31yqwzqm90fz5qq272jgj0b69xbzl88ye52iizdpb1ummhxpu50zmj',
                component: 'lfaxyzthytuqkr3skc1yi8fqfexdgc1t6949or74xgbrch5p1s0rqxg3w7xoaovyab6uqi8kyall4sl8izfc7z40dr2bv2cgsaqo21jbo8qca4yzl9dihyvualpbjy3umroy2eh8a05jr90w1com3njxccursueg',
                receiverComponent: 'i8f7bwmb8pc0gzhsqrykzhi2eld4dnv8lhmcbxh2hw810t66mouzpzhfdk9vpd1cgpeuttir11q1wozjzqy9r1op862u1dexsn8zjc6xbk5bl00scez86e9grfdcwxlf3bcgaiiqh4c6te9xujz7f9u1okihh9jr',
                interfaceName: 'mn2dkl1d9fybptn7ho3iwqdpdkzp0qjmwv5qccv2hcph2ip4salw4z16ufquobppuwuiinm1jso2y6mvuyv8sb881gqgx32dhl6t1a7ieqgvyu0wde2eqrk6tfq0a00alzscs6p3j7k1xhq3vg41nvp1s1eth777',
                interfaceNamespace: 'gcxzht3lpfpo9dlsg3zhjnuy1hs0io9ekk53h7o22at1ddempydujepva0fe1c8dmxg04n7en3kjrsc1qr4ltaghwldbcx905xlresxsmfq3f6omxnr4noft59cmjgk8wi35jyiipp7qcj118s8r21rxgnldbnvs',
                iflowName: '6h07v8g9297m81rfxcn75wevnqhp0lr8t2lnsa2hh2z6z0ybe52ujj7doinyrzqnvnmig90r2u9wfdnq61jwavet91do2fm6xsbu8mdkiem2ufne021dkw8pz5ouanm2jcrnypnm8u7jhgn3nm2snldmst1zshg4',
                responsibleUserAccount: 'k81gkmcxn33jqv00e3lt',
                lastChangeUserAccount: '9fxsb1g3ixdgxt9jc9vh',
                lastChangedAt: '2020-11-04 02:32:19',
                folderPath: 'amot9c1ye10hyoy7r8h0cxaji7f4mwn505ud8jx08355ultgindhdj6t871h8evqjhkc4fxwrhoi1ti1pk8gmwv9jl6sbs50yzja2s4chpe7bd8vg0slmjwvggrtq15cd42fi01mkxof2frdtmzad5kq259glb6vnhi0fyujcc1x2838rvmjpnlheeyiwsj3wrt9o59rvu4eor0ixcdby8eid8xnovrax7w2oi9ljo30g01ay6q4apy1b7aryqc',
                description: '96v6gabskcbygppuy6bybcykvxwvjov8ixm1ihmhn132o8q13ny1bt0j6lkq8omb0f77vyj7mqinzjf7fjozrrl081ed6tjy19llj98klhm5y0tp5wkxvc9ii5s92sxramjqxkruvge4gk640m71eh6w8sgd4jket1g565f9e2qse5rt1zmbdtyv1sy7yn1uejxv1atuzdn6rjuix7l9ijhyn6h4bdq4g3nxz7sqqoyfodxnv4cs1iql8lzzhda',
                application: '0xemds54p6wbe7c2mte5niohzw4eogwua3hhrfn44ibfpp8z7zzckrxag5zt',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: '64k5b4avck1dwn48d3ycljkx2fv4clo5egg9vnmn',
                
                tenantCode: '8x7j8k9ezqubqdy0uiwg2nlviown603ilwc00d1x12j26ernhl',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: '72ws9otzf8ap267rgq6a',
                version: 'fyqlyb1gof3cb80tj2is',
                scenario: 'szvs8qajtsjtpe5yrn6lxnfhm2fy6ku9vkd2ih1ykv8iazymtrcwvx6my21f',
                party: 'q4i81bbd86vawlz4gzvsfsdr8alr0etzikxz52ydmfvqziski3684g9da66x38q97rvi7k0cg5z22pi2uqgotb8kehh3hies53bq1ww8tvp7un2y2nwhlm73ym6n23fljc4xm9l4mmm2zkx0ivhpnq6xfedndh1x',
                receiverParty: 'mva9vcaah3rnn9ykuoun6cvriljb3bdd6u5sag33aq928gh5wesg7fn7o27qt35t48au0ddkvtw1fhs5e0nspz4ssb1hr8z2nv538ds20lrmiumc1awigvxbdjkx4dsvp1tab7slvugobm6lu5wdsvdnic863fuk',
                component: 'o5m1fzrozgse3rph2sq5ipna0z1u04v85d9upoakfn8bfietmtqi2isxignjfw26bec956iqoqjxk6a9iu4if52rzukykvhozah3yzmomfh4sugype2vhlf2he28dzywkh5pfzczxms5b473o7bdhyn3l09rsblo',
                receiverComponent: 'dj4sk25ls37zkedup6721tmygml9ollxuto2hpi2z574c29jg2qyvluy4ypbo9zmrshrs1aiwzzdy9yqjzbn146vge59sq9snmxr6hg4g85mgsgcqjgczjf8dsismbbl23q1624cptx651h4lnc2ai2ho46pk3zs',
                interfaceName: '323o27vmhbbqmj8lc7gqg55gdit26l4zuvmvdhiroumds2isn3rdq4hun7xpeheene6gxelfzzc0vk3rgabxcu6ucv65ilpgur883pi9fv0cbqlykdfeyjaemevkcwfql4n6q91hr2zks8se4ig1q57dggw3r6mi',
                interfaceNamespace: 'rs2b6o8ektlx0o3w2t3omnn3tul1sd00sdulri3a7chtf1c1962mbpzuat8r0dyrmxj571imkx3wx374kx3bd6kamn5ze655teg0jgj8xwhjmol5z2esw6i85ue2kza7n9behdm6oaajuozv8bbablwndnqsq6f4',
                iflowName: 'rw2ut62huosngp6thydbgln7knt1fvwhokpp26rph4rs4n073werkxxlg9vqtmlyrjufyuuidtadipc6a8mtq640mugnuy5s0nhqk27ffehwv0109vvma7xt14x1b6xjb8zyhf29tb1q3cvx3f4j18kwngpvw1cx',
                responsibleUserAccount: 'q57i44jo6gk9pkugrvq1',
                lastChangeUserAccount: 'a5zwxndaa2kx0ea9iw7l',
                lastChangedAt: '2020-11-04 14:29:03',
                folderPath: '478rf8amxjdmdzrloxhgbepfd637fw4jl57cuv6ezu8dwl1lja2ze89t4cy1q4k7luq5om1sa1kbquzyytaf6ojk2l7uhiq6xqu3nm0g3di7uxluq2z8mwih5zym152ybp9md4l0ciw8s8k14bym6x2j3yzgxu1c8iu48fbgqmgv588sj6kytjiss2k54tq2efug0t1kzn8k0ygs8te6lip80szxqnsx06kxvke53acj2vsuebl55ujxz63q8oi',
                description: '43bu6clvry6a7nt3p86dr1isv1v5kr1wozl1y5icpcdoqjmcef76dbjjs2iqv18irsr0iruji8vtpr9rja214q7a7tqposkopptfmvnrc2ek9pmfds95f8ccvo958pq18hwxxx74i9y42c5y60kklen1lmfe11m7uu57g9z5dx6ck6u2w0moxitjr7mmp7ghoqekjo9m28ve3hccq46tylo05rrb06118n1uj1tdoma4h0znhagapxktig5vge7',
                application: 'l6x0w64wqrll2rkm6fu570wprvqlfexydd2hn8nxbvdmxc26gmw92epmtk7r',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: 'vybrr4hsc9315ekc5kkzfeq1cd9dpqqrc5z58faq',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: null,
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'sg6zti1bpxc2s7aid2js',
                version: 'd4z9dlapbptw7ie3ljpq',
                scenario: '4or1ofyndv5ruasqibyvuz9eza1gd7rvkw9fntspots7dxie6v9o4ds4h6f3',
                party: 'ijbsajvehep92n8r0s26y0ke1tdtdg9lm6b8zy7bka06zcxgdvjgqkr5m7u9d3cb5or53zzq90j6st6fgjm07j99t8qxfbq6n2ef0neu85u5a5klwkc8kxeuxc6vaititavoivpkjwagjjitehusvzmx9am1mz2n',
                receiverParty: '8mcisy20jfv7artc6zq1111vo6tdkr8mzt29sr7wl9lb2u9omjg1hsyveshvwivficne19t2uynkeq6pjf3bz4vrwsnu6zs3wbt1h2i0la8jml8wrqs6sfhpezajuvmut4awghkkx461xfk1ruilpdcdqt3c01nj',
                component: 'zq59ioomf8iqfqd9caiarf80thiqlsvurc2xigaxybaqsxo5x9dgqtk9pm2yjk30lu3iakeofm5wvhamy6y4y1exwgkfjsgt7j2ycjfuoyav6pfi3w7z644vosw0bddxekr41vp0hrnfh1esqy3n27mpihncjn38',
                receiverComponent: '7jiherbp6t2eiz4wqmb5482n308y1h5onitumx0kpd7godxi742uc98yktm24w1icx0z7yrsnaeghoydrlelwyymd7sgf1csst7b9mxnpwm2cczv68d19z3bzc98owt3a235ozpkzgz2eazu8xfsg5bk9z002sz3',
                interfaceName: '2v4qyg5cov8a0eb1hxpa6kxzfnpc8vjx6vmmpyp9j1yfedjki6cqeajn6xor1rd8fwm3jfqmn1xbnyyg8rgmkmhsgp1u7a7jp86z5pie9pyzii2qlq0je6gg1mp69tn66gwhlneg73kowu412oaytjv66mg5ydwm',
                interfaceNamespace: 'bze606gp4ot519wdk0uywww0pewtgkkyydqmu0zw493kvajqum6ssb89exxsyryfykt4ehvr8tata2d04tsy9iltean6oxhh4iau520fjbufxa0w9trg5juw3pshaz0jgg971g6a28b4xidi8ubq73rx9dj1qlm1',
                iflowName: 'ivq23cfsnoy8zkcaukxbqsjgys6ui3af4fytzzeo8z73wujrfpgg256dlpg9jwea2d98gl83ggug7mk8omog4x9j1j1tr7t2faoj6advnm4qr3h32dtkmytr6h23ftlooo40x8mrsrq57q1ugb2pe7mjsal8r825',
                responsibleUserAccount: 'uuowfb2yk5q3q1st2nfn',
                lastChangeUserAccount: 'himeycw09av4e7nbc5g3',
                lastChangedAt: '2020-11-04 15:45:40',
                folderPath: 'r8uwa63pqzpueoobf3f7stsmo164gkeani1duzutfgdwpohpcgnpcbymtbfxazshxonp7s8hha4h28qu2vr0bhmpo9j9oldirmcsm651skvvb5dk29u1nmlbnpm45ab0wechv22qi0qh6zayus96piq62sxr2qx8423kku5xv7pjf3pvqle4xd8dqyr99d3eo8jmmo05mxf22aj7dat56lwrc08ijyqkk6ptgqaf5va3vu612ane90flwbsxdji',
                description: 'tn18i75fg44dmjt8qsh91jlfpumm75keebi8p97rb2ktkfbu6q444mwppqd0ln9rt1y2v5456i1j7qahq4a4rxnntg2ujm2ws60111c1wyv0kxci1ocoul5ew9ya2y02idgzxnyt4xm1az55tx6m5p1g4b0yirt86b6lhjbyasj9niy69qvteme05piwa2t8hmuanrcs60eihr1ea69linfo9z82acf1ud55k534mfvr3h10aoj9i0cvdgie5md',
                application: 'zq8l9eic53uoo7yikj6zhzyxylx4pf99fojbr4b2o5gho8mq4hbi96zr3c9j',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: 'um68prqolzmvlag6oxuu0flx5rneu3cw8beyftnz',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'mp4gwzf2en5rzw7bhalr',
                version: 'gwaqz3xodeench6joiy9',
                scenario: 'nz8w951hrskg920hfeb3yruy814yb7vyk7hhnj5e7wxxgts7o699m1dku5k7',
                party: 'xv22mlv77cl7c1oxvn937vs1qgs5fpqv6eqko1gt4hmwr7loy4w10cx8ez4ddhvjdc7kna6j1k1yot7ypgo5oh13ebdjo23byor5lddk1ckg772qggfudmdj08lm5i9avapckrfqri95a5amtc4j7pbfe6dz1wp8',
                receiverParty: '36sxf7rffu2b3rapnf3tsd6slkhtyozraemsuenlsxy73gfk3lbf46y74ojpms8y73n14yzubd8fabi0exsr43lnl2d59qro2vjpuz0oqbkoxgpbra6bctr6gdtyubcwvkaqq8tfehnacrxtkmpyde6jgoutrsdq',
                component: 'dqtmv2m90envwjzru5ipze3en0gcfffx7zuysnh7yqdatr6hchh18i3jgp21xxap1mrma07menln0sycar4q9zfa8j35cwp79kttk1tleylmx0x4j2m997vkhin61dw6xhn3a77lortr47pd3zn3fnyhoh119wrr',
                receiverComponent: 'uj1maggch977iggj2svr2ltlwwit1n2c4ym6p2qgcls8uugtucldqgjm394pujex0hqd7yyz80rypbjg29owy2vscaxnuqzm2izayuvqjyl9m1yo52z90st5v5kazm76126nbpo4oj35e6akvz2naku505w09w0e',
                interfaceName: 'zx93vd5h4zdji998zvroalcv6qvghdo75v2k4v5mlmktrgrei6h3336wc736fv98lo16dgiwcoa1uf4xu596w2jj2lzrnykurapaehp6caq4vrkzud59tn29969jyko0bunkqcdhh73ja3ypr0dtevo1tepxesme',
                interfaceNamespace: 'ozh0j7m53zdcefkv1sjmzn7no8661q90gjn7h0sduq2i6jgmm18dvybo5uwx4qba5g3ftg4j0rmuqhbjgt7md6zmy4ssfila1ycx5ugr0yokrqtbzzjasq95b1qdtzy3rsss5bpalww6viepoqdlhp8eqssa367x',
                iflowName: 'lqm0z0k31ofwgmx05yrgywvolzk4t5mrmyq2e4at44ml00via8u6xw1m785bomskn9nsgl8efahs7ojjj07k5tmwoea6726akaxzgf7idro2kikr5piyv3ns88w6ppb6hh3acqy4eu2v9h8lh3c78nnu8b0djajz',
                responsibleUserAccount: 'pqgu5qw7vqi1vcdij1h6',
                lastChangeUserAccount: 'y793u4bb6qkcmh5dqbld',
                lastChangedAt: '2020-11-04 07:14:01',
                folderPath: 'a3vba8rirrjob9fqk7zp7x90yblrpytu0aa4vvaf6ocw4nnx2khjw2vcgjaccuswd5fik05hue1j99l78gg1bc8urbxwi4ot5ervrlw9e8rzxfy8gz2ucswadfk1p7bq39at0opc77jerbkjj8p8zw1ajw9x32eiptgvgcdz4rgn0472u8f53z9pscqtka7y4sg4ki5o4xaqghu6osynygbsvfcoh1vkr254o6odovrwyje3nb5dizmyiulo8it',
                description: '10ca77lv7fxjqltnipf2yd0simhs2wutchy6ih5a4lxuh7vio766jgj8kdjaugpwhye49dvw653tct7oysv2e8a2jmhkzwgfuwx8r4c1qmaj5g14n8lcaqy5j88jldw9p6givx7vt7gg7wjfnt8ah2jbblqaur0i0xszzwfef5ed011mdmocevs3c3ke1whre6wwpplz57299s4eq5ax7ivucxqbql5nmyn8slnsjokskzlon5u8uhp32it1gmj',
                application: '8ukd0d9zoycfhut658qmcd18uwnblzazblya129jqwrnidw3v6f3ualkatug',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: 'kdlltq2vspc3d4ufyn9njvzat8cbgo65ima05eqh',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'nrr3bjgccvkruh63v6fm4bjd2gqq9iexi1f2yz3cpjh0wz02gb',
                systemId: null,
                systemName: '4osj5437icnqhrkx7qz8',
                version: 'w8c0kuj4g3yw3f3hvxfo',
                scenario: 'z6pxy9luvozgyyiuceh3w9gqy1r99f9nrb67iyv4kvup9fycjakdc7cbd8vw',
                party: 'owqzh05ct9eevu1asp7siyx9dnr2ezd4t3wfi4jjtvkkr47hd7y1olw2jdkpup0lzfvdrtbyb91m4hapa9disw2na97isdb7vtvop2d6gi5z93ajj74x40xxe44y5gm8jcui7ypfo2287xnnji656okkt7tfk77p',
                receiverParty: 'tqqe0uxhe68bwqwno9qkwo1lhuqmfbuq4a2tfdcxob1xpz3wlom76ae3mt18k3yu9vkaomu30047n692dsgq651g0urn2bxoqthlq2jcsj6k2etsq9ww9eqxio6n6lhuk81n5he0k9i3cdcp3hohebrjtzvufsmq',
                component: 'ckfo7c0mqeoonpi3e25kozr0s8ejo75jix9mzmz52itgykpndjczaei0vz134lj75vvsaydet24uyd2ve6ccqvhbxn1e6rvkx3pcuprpyvojgfv2xhbwwhbcsv1ve70j70rrdks61xoivfsdk54wr86ljr1m8bdi',
                receiverComponent: 'bdbwqievupz4iw950a6bfiziu4pvolqbuxkp0t04id2rgc6pha98aeiv30bpz1z8loo0luvbhlxi3vr4kgkoseho7724iuow7btfrw9p03gmexr6rpajeqbpmeq16jylw5oloq12rlgqqmm7mcm09ivrv4ay2msq',
                interfaceName: 'uyiffnc8mijl733zjac0eo3p3qn4gb0kw7ua8bq3hao0azy18ou8s9mmjamynkcjk1107y7l7n01uss8ktvyiwstltxy7xqgjh1bdaml958t91k83uqx62lf5wuq1zt9zz6bjth0knqnqdpxthz15sock6fpsw5n',
                interfaceNamespace: '0n2mkdn2akevf34i9sgo8112oytft1og02u7y0iax1eqa0mzqoj9qbquctq5tealhov7ry0iclewkgnmetcpi69cqq22r77gsogext0lmzmv17jqnk9k4i53sx2e4xapbrnbdfnjt6qlkq6jjm95h38fqn76o855',
                iflowName: 'f4oieiil1iwggdcm7vyiaydzyvd46h6uonwp35o6udg6qx1pgqn0uesdb6xdsfq1he57br59nvaypko2mdpt1cpgnxelwknnnn7hcxoieaib7pl9kuyt4m0t104om5thvbug3s4k953fp1iym2ef4it8ia1z92if',
                responsibleUserAccount: 'ymk3uqxphqipqwv404u4',
                lastChangeUserAccount: '0wteu0lvdivc56223hk4',
                lastChangedAt: '2020-11-04 15:28:47',
                folderPath: 'xc9qq0uuv5h10tns1uyio033a19zdqdmc53dwvkuuaswdrwn5ul5q87kxl6tacr3fwuwby8bfpgi8zollwzrzv1xdi81vrgxoiif8u62jci3gzfvmwlmk8uu7mzeeiuqi21343bz9kw4zp0x42fmyuw7fyl4ut0wkf3d30y6a0x9ejbxlmuleb2euabtlexcp0ee1bvvsmd60bxdxjceepzqdkblzw6u4h3f3zq1bz1ec7m4zlev5eciwfx0jlh',
                description: 'hgs41t84koz1ededybx2n437xwbyu3yjkhbh284c15vmkcliz1jzrxnhrqyxrrny2beiihwts2gcvunxogmvi5alb7bpft1ismyfet4xy5qzqltgyd3xrjyh9sq34hric4q49t9tpgxz8roc4p30016ofwtnxd1uw9ldmkirl7xggfc2ebktj7y1z1lkh8mb2pq7tm226uldt7qr6ovwsjxls2bbaxbhpivdyhyb7ez73sbmrm8htrzqfi9kob1',
                application: '2zsretxwkkk157vi2iw8vuqcam5a9bac3fssxwehfeto1ppnqi51n10dj3ya',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: '7zz1lpamg9kqc6bos8g9hoawhuu3xkb8yep2w9ng',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'av8u3h9jn4uqc8i9783fn9fyhxsu8ohazsxjb0h124txv0ppds',
                
                systemName: 'lxs5m4tpn0itnhw06x0z',
                version: 'yatco4nfue0oayxoqdvz',
                scenario: 'gxfawovqdn0rm0railxfm9uqh9vmvk2im278tlzo33q225gz7qtif4mm91f9',
                party: 't02hextnabwfizlk1e69924qgge3cikcaf5lhwpx8k24imiilkwu5925cdjjoh96z2n6x6pz0x2unr4tyevojlhvzgj3s7vngdro6dm57oib45e4b8hu0uyodspacm3smm5i4qvo2t90dzqcrowxzo9rrjt481sm',
                receiverParty: '3d20r45ohi27zlrkncpv1btekd8nx0u86v2fd237dhcj89wkh1yfxavchpcd09lwtgp58o2bjj2hieef3ipiqm8zwi1ibbt78hut58i4w0g3uda4s2pb3kbb2ixiv4io41czzf9sdrjvnv9f8f3mo6u91y0d25v8',
                component: 'c8fio5cmhwcdrenp6jg6bcl6h7z0kep82r5dmguajuxx3nd9otbg8xv5wzjoac570gsu0n7hp5o5n4dr2580tunth7pzdn9k1ph6gmbv1n33qaq1pmle1pz9u85fu3u1k0nslvvgnxzzf89ki68sdr5ovvc52ycg',
                receiverComponent: 'wxgdlr4asok40x22tw8sd78fdiabqhakyky4chiabhvrn9hxt475e04gvdx0axtbsp9e1apbrgmzw3fea5jghdy08ugihwjfbb4dr4s1f12uc310z9nijrs7me2uvz1pdw30ve713hnxeiw5c1aczc71n47w6wyk',
                interfaceName: 'xi5vfzkms6b7usqh26z3p7prp7uz4j5sfkrkjomds6j5oa0y798rlf09sggrlvhap8oybz47uwwvrcqfmc115rrb4o52ck3b308ng3dabeyj1mf08rupej7flow2vgcbjnu4o5iuvk85a91z2fmqyvfl3j0rx1vp',
                interfaceNamespace: 'kgdn3rw6yns0u1uwd9ytqaqiviiket5naukl6jb49hw8ocwajwf1oxg21wjm92qzpxzhmh446s5v5iri0qhp7zgpy82szyddyv2bqfd0rfnzmapqmae2zoctys6h8ktsk6e9pw7xc5fr2hc9cvd0vkbitof69ive',
                iflowName: 'pfng11fn6lneghgxv6qyzsfgz8j0rc1eyz0izml9c6k66poajiwofzloww34vr211jej4yplbk5jv1hz19gf73rmadkxjtlglyddvtnb27h0i2f4ejeaq4iarcmd5kcgmvfr2pf4kt3qjcmssg2zs5nwe0def4pd',
                responsibleUserAccount: '6sypse44gm7xpxqzspaj',
                lastChangeUserAccount: 'rv55ji30qj09mvhrpfek',
                lastChangedAt: '2020-11-04 10:35:30',
                folderPath: 'drlcuzlmonb7tarywbijgjirxjcy668rq15ppxp2kervejcouyfpod51zpqyfmxq6hxlxbtshcnnj1bznpoaxm92szuzfncl9wogklj7jfb8ydy0beabd417jqk3d68v83yzyp6te6szg2xg5rya8qrjf2h6xfnzyi0320jn9aq1y1tpl86wpxx4t4bm87f389adbqexd07qkcwwesc4581jzgu6kf5q3j7h5o7rum5g2298cduzjm04urrsgi3',
                description: 'bqz0ta4emja1nynz33aj9c4omhd6bhwqf7ajdlo5xkwr9s2gfyu53w2qcq70gklurrto9j3d2c06hnvjofsjz0zk1rknkwjng7ca7vqjpobjnx0enzkdvgdmq8pogagq5lfa6ngslqvix6httzysn8e96eh8hwzeb0ixrl80y088onwrz5z0ri3pcnr6n2ig5ojbrhrc6zgr5eb049cfduwef6moypli54rpid71m9n12aa36rysvbqcvmx0pq5',
                application: 'c79jfneqi19mmtg65gycfkeabeifqaveof1f9s0h32qdi9qca0pzmf5sur06',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: '1gkdtsr3z8ybvn7t5qd15hd2hbjmyw0rzsfcenvk',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'pgkhb1ecflopcq52b6ui09134i1v0ld474yhkd8eif2kdfg8hw',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: null,
                version: 'mak50kt6v6yaya5zrq7j',
                scenario: 'bgd5esfry0yls0sea1k1u0vrjwl8j7rgwukqtnlvlasegjii9k8lqb62elgi',
                party: '6yat8ptw70p4k1srp5y1qlnz1m4x444pzdnuk5cctgk4r9phrgzgj7fjfnn6jk9dfjb5fro9bsi9yppif4ivoxjh7r67qb8ppqn1boyeubdbkr3y0w1ydpsh4zr5d510r5717d7g5k6okm5h11rgfy4zcufbuesb',
                receiverParty: '2nb7vk9wbx4u0e9ow77o4c2lvi8qnp7w2bb6lmeywwa96k6kuh3ejrpruy0mtipfkdawmenema48dzxpy0acjqvf1domw5qugsk7ybr1a3u520k1nqwfhi4stepynwxsws0adhvhe47xxel4v18nadegmcsldxe9',
                component: 'wf68shwhgt7m7dlhp38lqlzcn00ot70rffq0h7qmdplydn6vv7wcg9seul92lmvx1nranwfne9ysfwchd3gw3rc2hfjcdza1v3bho59fxb1ckiuoksy8ek7rrbgxlibkx1e2fd79pp4augsroj3kskp54vt7i4fz',
                receiverComponent: '6a2dywl9hyfkm9u8qd5grxm3br2m3dl7b6ayzicr5ggokr7rhm1p2xzymh6rtf4x3zhl9t8msu4zagzfwdv3v9a676wr38cjev5ttp5h0ztzcqqzjmq1w0wbjpssybxklkwrf8nxhecoigh5dxjjatvvo8h69oqq',
                interfaceName: 'rdthkbcmt12pqoufpic9alyk4fzc29gggtkq377udh317r0hm5q9msd8orvmmi13s3yrcroyj89ldmbnmv1rrbk802zadphdbgsmxrafjzsq3p7zwty2lyum379mbc1fbpc747brdeohvm6vuv7ye5do89swoms1',
                interfaceNamespace: '70cd8y7pvxpqbux2761dstdcz0o78af3p9z9dz013kufo0dqrjnv6fbxakt386tte6n6mhg1vcpm4bbpfhv7fkmv96wht5a1fx87fr25ozjj8vr4f8vn90dj8wfnyaac7rpoqj9raeu9rg7bnkpr4uxwqu6d73de',
                iflowName: 'gwyk6pz644ebo2boytaj9bq3sky0r9pwx6fv41gw0hakrozt0sznd4i8eohrdpvixzrg6gz04iy0m4wv4suhyqyjm4xro1sp5hhhokw1hliy9tde6epzkemg4bs6ehqkpomgdkcm0zts2f3f91d616dhw7dnh618',
                responsibleUserAccount: 'sntypf8o93bemc9e56zg',
                lastChangeUserAccount: 'eoi4rdiqvbfdxhrphcdz',
                lastChangedAt: '2020-11-04 06:05:22',
                folderPath: 'ux097vgm67wwu338wqc4f5k3m0jvubjddxui389le11n76imwzca1w0mkg0pme9nr5efog3xmibq8gslb2icspes3cwrjv7g5x9694rftc0q0z13b70ijiy34sd9jjtr2xsxha5pa4bxv0qsio4t226e7tixfjmraxsdyhsud2smg6uely8rqln03e4zbovfjmefj75r356o3cld65r84i4tz30p9meofna0qle37c5l8w4x2ymvhwf4kyyo92s',
                description: 'adlvtvshuwevwq1ipmq5m2r03gzhcsckqmkwx680fttjm3v0frk1c1j3lwbin28u6gno6k1fbcxjtnmhc1tek5qf8ks68nflfc5iy7xzfwzuc4nfik320euiu27wyaqdn92paonbpp7buygcw93i5drzz0htqfb4jktsu6amhzihwwjm451fwmdzd3h31upuvq1fud5o8coz6c9tslcpx4q1mmcwwi0yre8fkgu3c3v9v99lh5wkzvstribi4wf',
                application: '7t68seil037wy1udug2fqiby83xrjnbdsfgi57akn7gamq6ow6lh2z57n8fd',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: 'iwz3bip897kwgwolspwqd35sagyisc8hm113moim',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'ui5zlbs49c7pn4t64rhbnrjf9wxx4le8gwtuk0p3yg6j6yl22k',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                
                version: '5fwo56ny6k8m0sky41rm',
                scenario: 'uanqqeogew8uok5hqx7lzum6y0fkua3p45efq6cgl356xoguw6576okasouh',
                party: 't1pip49nksa4cqao85htf1vbqm32go25p8897nnacp7yfbn3aw90g2hoaaotclqmcajduzicb27pqru4std7tjofw65eg4picoixxcqtef1f3c77mfkicucwlpiv4sfyrbh4jwgm8w7c3ylwmb6z0ce6bjnsr687',
                receiverParty: 'ubu3i02rmkta9201f6skoknhggbk33gte8f4ocsck1u02vlbtuiolo4ow7yfqlg07rtsayvf0d2e7eazt9wc121msx38bpwvbc2hpscivzc0l2h6wkyx6fxufz7bew9j72rkp8a3lr2z0fg8othutdwe5v8ic0c3',
                component: 'r3bw4wb61a5k67qx9lc4bubq8er5d79whlub5ujz7rszc2fxx6l1r5y3eh8c7g3xf6w8bz4oyuoo2wwh11kdgrjr0pb5wevfy46todhwnotxmb3qhjgdwscg3vp01c59tkhtqm1tu56p2p3qmn5flut2794ecb59',
                receiverComponent: 'a0dah0pqv4ym4edk7mw7ujcz0neq0qype8ihipfrfmyv84zcusll56o1f54uu2il7v54sw9m4gtye4shlb009wlwi6jftss8pg0zxkd915abdv0zvihoyoy4i4if5bkmoyxda4bye08fb1uxlu7v2kff14nr1unm',
                interfaceName: 'omyrosn45155v5ob54ghu5iml3706figjhczj8jttpiul6hpxf657199tfntpi28m6g93vq9egiocrsz6sm0yl4v62hbtkv8o2txoj47puix6f2wv09eo0czifj16gfzzu10x9acnlygzpj3471zgcxgj3f2t9ym',
                interfaceNamespace: 'frbmtyy0zobu53dv71oh40bdgjmep5l5ds79cda7y9wrtjearg03bhfc0noxjcqgc7tvuro0gvr3wocbv9l48vzytk94b4wtyj6w71grhsod5bqo4iuvtm960jrqdtvt0tx9rske4fm8sm4rpdh5gtbpr5jzdr4g',
                iflowName: 'uvmd4er9xmv02463lb7z6edsnvoc62kyzc4clvr4ebw1pc4v8h1sbd5io7zeo0ponewpar5cldeyarlrrj1die7d0172oalgx89l0ix93l8g4wb3tdkmdmu6tlo22vrkjzjkoct0s20q21kaw5s4rhmozqvub93z',
                responsibleUserAccount: 'daf0d96rtbjsq0jkerxa',
                lastChangeUserAccount: 'g84o9mbg7tx0k9y7n1ib',
                lastChangedAt: '2020-11-04 09:44:45',
                folderPath: 'vhsgif8ji6abrt3muwmec7w9s0locze6tl4oy852upoejpi1gan21oz4tzubre6c6dggc9mjnqyd1dv5ehsb244me733dyuh4hk6i73rrazfp2onkmky9rslw4r8kt3d498kj364ogw7ddcieqz1eq1h73tax4jouzlt8e62d9qxuocd1zbkmu4gv38911ejdq3r26icr293eufh26tk3hgwqik9xzdleibgz6fcr1qbiqldprr2xwlbw94v5mh',
                description: '6m21ify55s8fw5m3b9umxaufc33sjkojfd9xv2mihs4k709703ct1hij1ubg9q783914ssmp9j8ip1w6m7zhd7ve6pqb0021ep7pm4rz3bw5a5ev6ftq3w9gonra8yv6je4j9puz4p9wiqcgvhhztt1z2y9jbynn1donn2wkrtg71ao0k667kbc4mqfcxpmht1wn45y1gy0h6api3ybnkvlge5gwk3uc3j2i507sl44doud77th4b0n7h3biixw',
                application: 'kddax0y0mk3js5395y4uz263d8tjkprt5vlxestw2nkjzi9i44rrn5r5mtuu',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: 'jhwlh5fw4t1vav8d6fubny1kbcbop98nnrln10sx',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'xmgoaoxzt50b82jhzaofqefxthv9i14hgs8uqqktln25y2drmi',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'mlronmxnme0u4jov3eo7',
                version: null,
                scenario: 'pecpr52xk2bf2bshxebara9zzlhjy8z96eil7dy5h6wk2vuzvr0suo7wb2mf',
                party: '99mgz47tuwrcfws7ptsx1yrfxg6yd4s3kf8jl8tb7e6uzpm89oj1gsivzhlepqrdeezq5izbzpocf32km7h667leuvzd945nnv04jy2697294rpefmbc787i0t84f1e9w9gwpyft2ng7ymlj3id1snwrnonw1z2z',
                receiverParty: 'u4gjyx47w4g6rvino4dy9jh5d3149nqbin57uq2x75wo1hqaujknr1dp0bjnpqy88uknku4uouxndkmz9y919ew8fw0q1r3ozqazj5ox57cc6rku9j5wzz9yobbuxiczvjpzaox0xqq11b268hw3v4mau490a02d',
                component: 'h8w3m72hggng0pzozkbrn4jcnwfo36lrdavyocuunvehhr1zv491ekrbkr6i1rngw789xb2vyyfsu5osi6nduwxzzdg9gpa0xdt1prft3sp0y1ius7s91sypfy22lrh81fimjhl90m3nijg2fgkj9f5i23skuk55',
                receiverComponent: 'as9wblghgmmfpz495kd3vdexi847gops8y4pj1mt74ap28g9638qej4kfhd0pxrf4xeewfbqac307xtkoa1bbqb026my87pfs6dsqivbhzy76z7tuyldlpl49tuvhay6vg7kw87doj83sqvq083ztj342fluxjkb',
                interfaceName: 'f04ijdp62jh2q2gh9bjnx25j3j73ed5pwux3h4irimywtajnq4hzjwpuua3g8lmufftx98tgygzk1nygpviie5lfxx8ktfegdsc36ednpw6b8epktw4hf5l4mksrnl3cxz8lmlbocz96q0dd2igy44yk2rl0idcv',
                interfaceNamespace: 'k3u88tkbl927x66damnyxsfbrjqm4ioxthvai4p18db7m54s8q4729veyc0rqgcxt1x69kfjoffm9mi3247c5xjfnnyxtg2qok24ypo7wbk6eezozcvf0l7e32eqe5tztc0w83gqt59jfhm3plbmx4uip3oezkoj',
                iflowName: 'j0g22tk5urs25zaxjm6de9wt20myrfmyf67fha1nh54joob68x6243xvfz43hy8fspls2ls9kpq26h4xqud3mbvoxmi4cmxznpk9bfk9n7ilf3jmgts8wd72om9mpaoaup2l1vs5o6nhg8egp5ka905vlkw46eel',
                responsibleUserAccount: 'mbjmz0dmxo0y8pegzr9o',
                lastChangeUserAccount: 'y67i9bi0yvwy90kir821',
                lastChangedAt: '2020-11-04 15:45:17',
                folderPath: 't6or8xfmxhrx70vtsdmldvuuh504ejq04kz3qwkqlrt4ugyt57k0f7cl9mtwsros8h6wbgvdxg294pfgqfvesu1haw9mp58g8hjj2z9zkfr8fh0z6xrpi84w7woexucdrji8yp2tejtj9anr5in36skv8pig7dz1yd2prmfg59z4ainwxusjcone193dx7lya23lp5oko78w3bejv89hxb336o2r7xltk0p5gk2gkyco9m6kfmpjel9dyobm7d3',
                description: '9irr3c3q3ojd779b8y7j3146kt08l6s134ls8yiz3g82z48gbivm05ppqvjxre3n75mi7jalv0ui2towyku4vx2qgsq8jbl2tef3czggpjfhzne2791if0zcpwb0zskbbq3h1hyaylrauln7kg1xnv1op5vwoodkao2zaau916jk5ng7xss46djy1ugxkhxov8l1z40gug7g2mxf6vzlcubtjdkz9crupufjemwnvblqyq158ib8prdn2d9hjm8',
                application: '2b0r0d2t7jt8d4xbh9qnceuk87u6t8gj71abjhjxqcvhhe4la86zcca5leh6',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: 'az8znyiu85zjp6w0c27snqsjrhp2bbwbo9ojqck3',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: '2ygjbkemfsam00h5cszxpjqu4yag1h1xiyz7bhs5xwkbi0ylzz',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'y6859t2hkj5lx1zjw6gw',
                
                scenario: '3b4kixitcvf1jbh4pshddh4cuku4jtnfs5f2vmm07cse2pmdjhxf5k4d320z',
                party: 'erfc7o02gepahs0rg13pf7dv5upv5v60riwv2ws781sugt0vdlxuhd2a35emquq8vvu1l18ai9wrj27f9fi5hm0rtwgdttpfpnkqx3jvncvoh6itub2gecta8o7z7tlohmzj23d0izpbqxvnrvhsdvie9kvi8fou',
                receiverParty: 'k56pdsboqr1aksflo2y0hps40rmxftj8dv5s8ykifn46rssnr1a98uwyz87tx45jv5x8901043eny07xgwbkvofuucj9ik3wgzyhsnoxhz0g5rmi591572a2wbtxna30bjl1gk83hvw74xi4yl7nvxh8cntccjcy',
                component: 's2owucvgiepq39oa58ibkwnbb75f4yxm6cap78hvxd54lqmgzottdsbrrg7hm1agdzc9xweo0x36xnnwgh835yp1qtrfft3c5j4q0s8vl200yop0l77lrq0kp2t95ddvp2oj8v2doua6ex224x81pl3sd859hv25',
                receiverComponent: 'tjtyzbvz6xkex4aw87jgi8975apozhm3j85fsxcq6drc1aiu6aqr9egq0rrkfqzvu5h5h5yobmo1xe9nusxiah5jsjft38d2dyjjtr6lfudrd8z3p7gxpwglz8q1kxb4587jt0x63vmeuydurbue7gpuh7zsc6k0',
                interfaceName: 'wo0flccytqz5s517eycwcmrbc3x9oeflqgr5z5y8hkr70nrjw4r9ema25c1lvgmuwpp1w1niwyss2sspr699r00wqk5z59h7qopcar9m0jeri1phu1muyax3mldsa2stw2fdq2cn3tjmu755ost6p1uzlnd79enb',
                interfaceNamespace: 'qjxifhz0w1nw8lpfp4f6jta31og8lu4pzzoush2bpa1be0pa864xyvuw2w5r938fyavprkowxah2hf5gbyfu7pihmtj0jtzzqmrs3n36hy5syynsrkmju2km00i1tejl9vczl9e2g4iw4g299ays9i5thm3tnjdx',
                iflowName: '4990z76p3kal8jadhq1lgvbxh2362b653vwglbider7zbu9f8nv3i64ika4jbf6ycagfgg8a9bn2638b8rpw67qdlb6t2x3eumjmyypmyngrnju4b0js7527a1an5th0fxityq38i0loghduz3f1uoj1xkjaqeea',
                responsibleUserAccount: 'y7l7yqmarqatdknjan1d',
                lastChangeUserAccount: 'ned1j2kl12jgrbma5bai',
                lastChangedAt: '2020-11-04 13:31:16',
                folderPath: 'ku3snphl0mcrq0y2eioxb03nj59de2vzbf3tgj6jslg6ohhqtjooq5lzsr4v6udxxf4ld7scrws2i3207qnrxogxrjv8oldbp6y692uwe0zybmwhlieehxh67r44601rl0v6mdlztsifiijkqpeeoxfedpsjjp4edlm34tli98al9x5q07w0knwi63r8h31ixqh1bm20bj2cki9brwf5pbxoo1rlxd4c9ppv01fbmxvyqtvi1r5c2b44vkt652r',
                description: 'vhm99ai7pitotm3hq3yabrloawm4x79ipcf51ic6tw7t63u9xp5havw03r7466376d29sm1pf9pk3o9sz9vplwpgsjv5w5o0rko035hyznxq2hzna6ezjry3ro1pi8bgvtnrnekqgg0q24c2knszayl14isdiukscm5tgyigq7pkcha2obbzdlwv4z8yfrl9tcrub71ajawccfwsdnvs5aviodbujfiozgnpr0605ohcwfz2hoqtsboix83ntxu',
                application: '6i2wqp3rrz1g3eoiwdmgy9ysh2c65tamtzppk0vazw4lsfvexe73qubb5cet',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: '6mqzg66rfxq61in684qwh0t3rvp955c8ewzovpao',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'qgr9h857lrcxof5zuem09rvd31fz1dm7o2rimwmzpmn7y2eo59',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'f60nhrcez506ue7ewqr3',
                version: 'vcpjcogvg3y01mso03ga',
                scenario: '6ebb9squebwg0my71w3tr4v4memodix3xw32ua5doxmblklooa89g7z7i1dp',
                party: 'q6x8x4r8y6i79uxur13oivo76rgojnxi01fee1p0ai9vall77u2xjcgz9m9il0xfx5ckbin8dyndaproqxfo2hgnchmd1ka2dy9ih6ecsatugy5rqh2cnbchs9r2koavd6b6nfvbp14k1i4zg43wfx5qrr3kngrb',
                receiverParty: '7rx5td1vsjjbt1vw9zctjx0kuipp5pxgvlhfirwb6zvn2ubzysjbk2wh9cqlvpf2pg62zh5vxstgvp9qtejahe6iuwiu8vkowkplct3pz8eicnme5mld67fvthotbk9nhy5i2zfx6nxfke78h9sxquprzkv6tio0',
                component: null,
                receiverComponent: '2zxi5yyxt01katat6kulgabaffj4787gownkrj7a220ux49edyzacs0nljmmt402svaskrx4ct671q1nn2vrwew0pi9rn9i3jmnk031ri1jsb01sqc37hg61bgjh3qtqpqtd65rlfr3gh3stxj9iu5ric5mpu3zf',
                interfaceName: 'p91onmul76twfpmg0g1ovldr89u4ehqhdsaj49qv7zbs4ect8z16ws4vahgtuvk49rb141vk5ubobxwquffpf0x3p37ebhs4x0u9ofdyxetb5h0xle9sybimpsyvh2qatu8a44o9f0qorwggp356dusbhalaqff7',
                interfaceNamespace: 'ahd0varjr94pq8ej5ex1p971hvhzeoqqnip68q18f7s87s9ghrxy344xtb5ah79hmccz4zyky6pvlcqpp3ix9nb12b1ycl3iy2baqx56b51g7bxfwe768f3o69cdsdeag4j2tmg5uwif4cpn7ru5hd8u1hz3e0ld',
                iflowName: 'r9145cx5tnyw62m7pj09x04o46kekpos0jx2k7livirx4454jfbqmsvcyyaulmj2r9010yze7cnchys8kyszeg8fkxqnz0cgb5n3zssj17p4di8ay2nbmdwmmdj5rynfme97vst2e3309q9ug2q29wuz6kufa0os',
                responsibleUserAccount: 'thola6d8749tcvhztrj7',
                lastChangeUserAccount: 'qekwfp19msdrjg6a69cp',
                lastChangedAt: '2020-11-04 06:31:53',
                folderPath: 'uin6ol9umiggkh2vffyr3xn6wkd85wg8oixjkfpyg6o84ycbzvad7z0a66kzx59gfff4h4um6t418h0636qk569sauv2dx3cbn8b8kmla66rs26fynfijth0cik2n4apl9g6rjgmdqxkwpaee1uc8ybhhi8iotqxyzdmmpsg1t076y8m6zffmajkstte65ma8by3ilp0nvpohq3ynksd1xvh03jt0efjvkrcnr3t1m4r3w70qa9d6fvpxlyx8cz',
                description: 'z9ofge6faqdi2dlkraijwibgk0t8w0ab5c2s9y5d29msm1j47ot2wytoxj43qdc6zv3c906wshb7i3hmpnxvfquk79irafpyr9ns3451kr08hi9cm8h4sae269dccq0gx9plcotygb4hpwv3zg02n40kl7fwhvjpcssodz5alyt8pb6zh17nmvnh5v03pfwd7rv6sxpzkjpbz9kj3i79y75byvm2ve3tqq01uv70zn72xrezpp06n971e0roxxa',
                application: 'jo8oleudgj1mhqpv37w9e5kafbu4xf7m58zxcpadhaxvf2lvny2l97459ra6',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: 'zu94dt4uzs4su1vqnbxywgvr4ur6ih5ey2h6viok',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'ty481nysy0sqntdek1vw5pg2zb7hbrygk079qo0mfbccd9q2ng',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'u47u5k37yqlro1ocqk3j',
                version: '732ca626og9fand67r23',
                scenario: 'gpuccd2z1zuge8mentqmhvgpyr533kje5a9q9xett2kt8qopfrv3ct3nam16',
                party: 'o343mt1h068ccycxq491nwe8b428z2twj9r27t95b0qe9iskk5w5j7l7j1i44od4l1iafxuqha9d7vpibgzl1zt9a5gxgmivmg6eqhnnxq02k7oave2wealailkr7ylk89vxc3vd5snin37sby00thweak16t81g',
                receiverParty: 'ki6v08es1ckz78z6wqwkge5luj02413x5b8pm4fpfa2sji27k3t6alwmp8ksrwci9ydjsip3i4lhir6co63fdvef6mdjffp5hmkdbfn5zedatiz9nvdqf3h4hbw9h8rjt044ljlweiynpjyd1qmh7nat8zx3095i',
                
                receiverComponent: 'pllu4aqkszuog8par3riyroccvnq6rb04k9cna34xwxwwzna1r64te3vuvh8m5f3ba91c97gidfvdn123a5yxu2x1uyfb334ij06gfi5aa7k2ruo352iqa6rnvrym2flzuimtcdujrx3bor1w07u3h80f0vue69b',
                interfaceName: '16cc9syxayw7j28u7emok9xk9mqzyrkx4cmu18ws1bhkiyy5pibey787mgy68p2ii294glmb0mbrgng71i625x8tmj8t5ma98fpa4d1u3xhzth56482q3olg4xunfqasgx7x722m3v7mbs2q8xx7hjfxbzrwuva6',
                interfaceNamespace: 'dhv8dn2hdnym1vmzwrygyrczbivpxbw3ukvex2wdkls435pmwpxxr03aj85qrl36shidhb9sa3gsh59nffx1nm2egsv5ztnmetxy1dfpsklufrngoh67x72v4b481p4hvwkf6oolp0l7gar3e4ipqlfbpsmp33rh',
                iflowName: 'qxjvlsak3vrhhu44ozspkjsocse8zsiced4iq8d1vvb1mgsmooz5k67r1mvwvleu4hjpne0q1lncnrw6k8u45snjair6fpae1e7ysamzktfquh0aaroh82lhwak1yjy68jfeh5jjaloz2ro5r5fprmsryr0dee9c',
                responsibleUserAccount: '4ed4dfivcps2a9q1zuzn',
                lastChangeUserAccount: '13r1ih1qlpgrlghb9wsn',
                lastChangedAt: '2020-11-04 12:19:22',
                folderPath: '0xq9k84824v9pvgnyveq7ldznx6hj3kjawwcrpctqknn7i5wtwoppcjg4w5km1v8xnccph1yrov3b8v6nug9g7ejlcbny4ussqsvm83oqujyn4egdacbswnjmo9tguv7hyi3jf0bfc8g8if998syu79j6bhzhu6h4ok9juqdl8f9jurkw1cgqail0x3gjoqyrrpir7x95gkgr5emf4tnqbsn6c0cylzeqpucwop7kotbxi6k04wuxmyv5dlpguk',
                description: 'x9gcjkzqpkxmnj6pedwkb3lrknw0ty8lm3034wwslp1uvnzwaxewa83zd1xg7lajbewlmbn4lhdcs2690bx8rsyrqj37sbsd6kanubrta90olsdg50q0pexme09kw6dhruxupdlxd8yq5ku3dc5tlwkg3196kmqf4b8xg81a24r1hgkhu1wtd4dv95tp86a2j801au190zjwcfeqfvtlt4atmh1y3pal5q9mizzz08wxsbjt8tdzil9djgtj7ld',
                application: 'rh8mldfkotvmpubfw5y7uw5fsl61icnqsnjmzuesoyajiq2m26exfvq8pu6s',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: 'hnoqfkaq8o35pe95sj3jdxgzb1gweomxqnykazqd',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'lhc3t8oj13y7wu3yavjkj6j68mpkqmed6roz9la3u83ldg56mb',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'eg943gsa8y2xw8l5qms1',
                version: '2jr1eix82j1fl0xocpab',
                scenario: 'xmvzzdn39wvg57cssbzqlj1kt3ijt1jxhlvlwukfwutzi935cmcrlr8hx66h',
                party: 'unliijcja8bwe5j68htypvxs4ittti0q9ei01gnj11kx7axas99asjlf8lqmhbvn3bxr6lijyzad7orsxdeckipb4ogdak9zn1r2qr6ewc6bl40q5f39mxt701mqpury9u5p9bzdt0y0947voa70ow2jr9woi9to',
                receiverParty: 'ijcgoen8k4dqvye1xgf4wz7i502k8frqa7kii964rp5uez2qo8zkgzipmv9w3zwbcki064kv7fi0otzx5em3lr1u7hgps92gz974a0dqnx8gokic1hrl73qttlooinyucepranedkyl23xdu5fz5lfyk4n7i7ol3',
                component: 'uq20paj8d2hs8l2v0k9ih1kb91dnfnjnm1a9rz2urhgvkowabo8cofx8r4r3axwiozvhkb39v1jy3zoybwxse5tz3tn30rjv9ut6o8v76c2h37o24qkaxfo3bqfs1h3wk8dy5slkvhpy7q13ovj9k3rdt9jx2b0x',
                receiverComponent: 'ff3kcu64x0xksmhghp3ymaarilvv8w24xdsv2anl0cuw853g3wlijhdcnv979p2o7s63ll2gy1cux9ijh7z1hzkjrmhnmmj0aw7ircx02j0pdhhov9zq4x7numlfp0lydu7c9qd0s1cljguy9j9rbvo7c8l71nez',
                interfaceName: null,
                interfaceNamespace: '3tymc5f6kogjxv290u3ufti5styv2gpuifuj4uevskt4fbwx269mkyco4p9c236r049d0u5u625nnahqdn5xh0djozpjm8ukgg93gu20k2kv5l8pwclmp9dc1y1eyylmqq8uto7mcyequ8puefhsc4mct3mmydvt',
                iflowName: 'zqmm2waq07av0hycgaet66rkvds7hr5bdk42zm7u277gkpdvxkjgygtra01jg9z257xid4ohhcow8shr6albopou13577zndv2d0zykrgjq7qx8ezqee2igmre2eygcrm0mjdo1f8ll2gmcjfnb9h6z1wsg7igmm',
                responsibleUserAccount: '1t8j7cdpd4ncc9pi3t5e',
                lastChangeUserAccount: 'wm56w5ediabel083y4w3',
                lastChangedAt: '2020-11-04 03:49:37',
                folderPath: '6qdaj8jsy4y8sh350b9601svebvgoam4kuspqp3awuomh52z0wnb9iop0xubq7zwrubi74oprkc5sp9h8d1cb25bdw9ngx0r3vqwqs63cy1hzv0kwldbag9qaqtpfkzwy2oruovyo9efh19cp3t4nq2lh837uq0yzuvfvtqi4wv8engut8ab1ezpsxaq8drfegjh8jt80p2gerxnsnc71yos7rv1brr7lvrculuy29su33grwmrkdovaxt6e1ua',
                description: 'orfiw8x0pokn23uigybb0bks1cvd5kay6lbkb0csmzgod0gvhpf2dclyt8fjp4gu6plzqlhotvfyh1pncexkiedjz857jmmpspe4jmywhrd1l4t6tbtew4z8zfrzo7kic69tzalxt92bqa05ej02ax8q5d5e3x41klj5ky5m8fc2rmp2cmegsnidpfar9p5aewagoz8pnzuh18ee5jiqo648hf9r4uf3pbi5jl3jdd8jty9k31v69e1vzzbdw2k',
                application: '373bmdl6gyl94r0pau06kzhkcgiv8rwp6ilc3839e6bsark3yl4cmnp714mm',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: '59ibypgnf9fov9ygeakm58a1wjie0pl33ftir3ww',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'blb7qphcis8bzm5o6jh3b2805ivrqpq75taky0epwez0js6g5z',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'hftbu4zo10p62d3adqz7',
                version: 'w3j52ntnxdzdrvncsd35',
                scenario: 'zavrfh2rlhm2ekjwy7i0duf9cdjruxs8g5x5jcf2js5o12k78t5ki21mzmvn',
                party: 'eq8k3y7z520ywac1bcuvmj6lhp7dtqu8hq8git1ljfiweb9rgf08dnx3g4i5o8vmozkg0f31x0xvaxhhf7ymza1aovmdhytsj1q7q04keywc6db671z6zfml250xota8kfzyat2v378l05torbtzl7ojn9abk2aq',
                receiverParty: 'biwjyfk3u1midhnmqx921q8tw2ymhu3tojqwaabcwnqnd0wbfpa1zx6wh3q2uvjwm8tb6cz6a73gcy5r40enqnajm8uo6udcnhh3y4dfsurxaykvu7fap11swa5ouzutaicvxbwygo02djf1b6a9z60o27tp92xz',
                component: '7sox255rd1xiseel0tw29pez3ovw92bi27vatqmd4xhcrl2m786c1stwlw7lljg1ml9el6csbjglf2loa0rht2pwvclyachkrq5mr45tmr5m5gv69fpzl7xwfqhvfswp8clbch55ciophbv9aemc29z5r23v4j5h',
                receiverComponent: '4g07crpn1maxdi4gmsx2gg9o7io0u9pv4gvc4zgyvrivmw8uc8zv6v3nw1w8bwo6985vfcpwn1i4napuok2360ovzfueqqa0y1lvzhri4ydd40uj3454xufptvkncg649qq2nuzydr4p1e3w3vbepub96mqjoqf1',
                
                interfaceNamespace: 'asjnibgn9vure1jsbp65zwngxuumgtertp9h6ocaq1jhbz5uy5i412de77y2022v6p9dlx0qsxb6ybyksmfeirivf0cgjuwsfrr2h2uvedo9bxwlxl89bvga2h2x1y0aolecp1jxsbmcm07qncuyf7xjlnpm92bg',
                iflowName: 'dzgbf9ae9eq4syjy3bv7xnlvljg4vqagauvmt1x55qsfie656ypl6bvwss0ue2x6rr7wqnz4wgpvejiflxlk70x4yh9y3g1vkj5q1s5027sa8sidb394ybqivex5d89d60g965m0qcyg31syyer0q2e05qtn67fj',
                responsibleUserAccount: 'z7wlm2op73p2gysevr75',
                lastChangeUserAccount: 'mf4swjm4ixld0imxwy3h',
                lastChangedAt: '2020-11-04 05:27:50',
                folderPath: '2ov2vx59etktpqzw17x9qm14t900tz2v4zz44eo0ut0fk924urzbamz7vau90zbryj6opm9b85xt9xrbj196zogrgqd8dwcpigeu8dwwymfr770t34jx9s3jcgv1aag6tdb2uy2bjjfda9ojs1kgtxwxpjahgv5e31muqpa1u2v9bwvp1tjxlhkj95hm7d5gasdjjduvn8g67kxsmpnsqzsqgsmjjydcbkclxr0rz4o1wwemzgs0otlu31trf7h',
                description: 'yp3zzqgsj00izzlidac10q7qotp0yj8dgioh1fkxgs5xb8xrljm4zvax5s16hm4cphm9ze1iaobpt3raelm5qnmxtx5604ow2qbgp07uv02dfwabh49mhwa3d3mtnw8b6uim86anck8nom6kh7v6wxq2rqchdk0esb4egg3f0976qd5h1oip4glgam49txtcbk244uykpld6c0lxt4gq0o1hwihyxaoaz3ifhpf4vivxralhay1hlkjkr0jmp4b',
                application: 'zp133z8savkobal7ue097gy1fuf69sukd3kvcgywcml0b5iwu5uhertm9x07',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: 'snuuexdeupsusw2w5euiqs79xz51u13xk31v0pbe',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'hnyf9jca5dh5b2hz32y1rz7eqyv7h5u0sldbtnu7wpx8iqp21z',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: '59yfqo426umtg0y4bruy',
                version: 'fze4zortmbh4svjb4c1l',
                scenario: '2nie41n9j56by8jywr3rq7lsop2osk0b5wavyc3orh8zgk4tyoxml4j0tg2i',
                party: 'vn4zibetog2k7wbxdtsg3wc0h9qwaz840z0caya5m6ksjo32sbks7gjo4p8jvptkndi4j3mrqdsuf9skep4w4hnscicltz1h2m6t24l0ga9m1w432phylezha24obwmke73al5xbrl0leqqxdtar4j6awy6wgh0b',
                receiverParty: '2745c1jzc8zxq97etpql3az4kvo8k9aqjt9gws6g5t25wj4nl0i0c6kapv736h05osolw3or3p12f5d2znrqg6zett57776fcsggm7tqwzylq7d1oevswf1qan27gxtqm13oziezo3bb0tj42j6wdbrw4tuv5pc1',
                component: 'yofcj2khw9pjtr932xa65spwpobltlbigy8xmsmsidmiyybb4huzmojf65ys0uu1r6zvx0l1zp999blagx190oge1jlfrabdmqxvlxxg507879k3upt5c079vvmtg5zlaaeyrnxl2h9omf4banimed9uq0jl420u',
                receiverComponent: '59v1fmh6mi7ymauozw6xoj8ilkaiy08zhi33p95y42lj8r127rz3k768mqqufnckqjzxwpdjtpek40n5xosvazirkzo4gbpaqaakhcr8brbkts2vbrhrfm0a5s7r7wclyjezg2rdfwt0bsf0f7i4t2xdz8u7r837',
                interfaceName: 'exeu1dli61ei5nltwqpjy2m6olnannm9h8ns7hj14tnkkdyx0xdry4inlsqbf6jlrwxcjrq81grto61q7ornvlmy9a7nyrjjg1af1by2mzwzpvhoito3vvr1lkv4fonsthe635w7vcbskzrj6zbjb8ud0s54rsrm',
                interfaceNamespace: null,
                iflowName: 'oxbdfafhh2nzkcpgc97m48r7mj7m6bg2hligbebu2qmutgni7tefqupk8xhlnyy3kteslcjxq8kozxvj7iibvxlynq9mojeyflk0ast1swnptnjotk6otbjihw1c9auha23mgr7rru41zx1ku9w5avveyz6tc00q',
                responsibleUserAccount: 'nsdtp564jsegaf7n7ict',
                lastChangeUserAccount: 'c4ygw8y1xdqa51fm216s',
                lastChangedAt: '2020-11-04 16:50:18',
                folderPath: 'fo3a3asxffxwtwda62363bh3ruufq72t7ox6lbqhtezjym1y5l0j6cysoh2z9jqobdd89ldqekrdyejp0yzho1yq65svox6vcq7y63zrog5a6v6k6fhnijmcnnuuzinugcw06x86stjw0hzt1ancihwknpdvt4899qe6a0q619oia82melgzco8uqdiqaoqgerqpithuc76to1tmr2bhu3t4hcdfhbct4g5epmg5zvzt9q55qdqzer88xrtu91o',
                description: 'huilymf8hm9kb53cywg0480rtodr6z57jjtc0xpktfflcjxa122nqclqgtvl095h9yysvcjaezs3j7z90tftz23p01a3sdm0usovh3t3jemunv7a5dbpx5xobpdpltgiz9fvf7xu4439bcdn86g12lqq7ydxwxawfcf972cs79obgemdqgh29agyx2qnuitlrqzyffiesls6owrk2zq8fx25w7eihahfa835lhxli4ta57srcg2htis7zznlyhv',
                application: 'qu2ac2riet8bm0sxzt7dbzlo7dygm4rm6fc6pw03olemb8ou5auw7pnh2c96',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: '8l7ukl2bddhumgp9cpe9b7cm51tvi7l9yh5k30da',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'tbov4ur1jpmaqu788ye33nhgaz4vzgjfczno1ojy0e1o4neuwj',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'qipt8ssn0dhwfc7swicz',
                version: 'fkyev97vz1dcrfsxrrje',
                scenario: '9fav4ol2zqgg8j52nujl4wy7372at3w8h4v4nq9a2t691mvi836df7jnw8pf',
                party: 'b84cyle1v1s1o3wq7w3nl6pxy26akgvox5de82rriak95zl9ao8p1yzqgpuhq2cxxmsbcxwptlz3cmjrxh5iesk6c9f0ere79utubxenyelz0mxc697yu6j3j8mhzv01nhtnfh5btuinkevzubeq6kyeti8qve5c',
                receiverParty: 'k88vwxa37k9ws215qvx2icw66tovrx7902jc3ibphgm2rlo515s22vsxrsk1u516uopcjnqaha6qayirfbaw919bgug5gyespey3spmh0fhkxwic4qyw2qduml80r8883cvqbbm8ofimq24ucq8lqba7c4ekfkts',
                component: 'lz5sa3uk988cbp4ujkbcjlalrby3egsb6cjizqdv2ug8e01lt0zol9ozy93maenb60xl0d3b1eumchkknsgswwquciu5dfnb49al117uohu3vqa3bj0s2bbjs82v5muruprbs18p7ixlzlr8ekwmq7i7b8nl4axa',
                receiverComponent: 'l6xvq2tirqqqtk0hm7ksg5yubg7a883n0jtylu2wcwhdg8bv727y6vsbrtspqhgo7gwpy6z93ohspv44o1auyx00v03i56lottw55sqfue2rapaguvdl8qx3fk0vmgbhww7gal5n2w4dbeddre39gjbp4vtlpgwj',
                interfaceName: '3nhck7s6sk9iecxmrubv0y3etzwdb5qfmthi52ydflyhedzqpo21s03nrhfjd6guio78tv1pwrvtq5rgvzff6zbw3q6a01ac8x0jnm6t9n54c8igk47zc5fj573izqkomzvbacrz7fddyj45jqn6i8kj4t0392zr',
                
                iflowName: 'n1lvce77nzhmpy20jve7w9swgf5milirgmsus15l7m71jf7aatu4lr5xpcs6q2vmabvtwdzezc8qtsc4b86wzomz2pygm947vbtof99j5hhuicrcd9s0ug5kfzx67bmwlwump98z127gu0i05o2ewk3w6lcxmmv4',
                responsibleUserAccount: 'xap2uf2bpngics2i0ki9',
                lastChangeUserAccount: 'jvkek9b9g07qqrppr71l',
                lastChangedAt: '2020-11-03 23:02:55',
                folderPath: 'vvkyo5j2cde1aj0cdz84sgsudrqoxd3v8689asxz6sd633warfq9fetrficb73c38xqziuh18k2oqmtj8nurxer9s826b0w4w9rqs20uglbkuelhh4wocmn2xculykjfwq8117tx1xa4mc7o0v5mdjm2z2c964bs8y9w3yqb1jikih7vutw9lr2ie659y6yar2v760qs3xdr3oap0p292rg9fpa9p56po60jhqce6mrmc98n24u8lx19k8njlh4',
                description: 'bfzujz4kt14l4ziqu7soqg275qm4hsr028tthu9kwhybduuak9e0bcmj9a5c988bumtsveh2cqi7f588swvdjznsmhmmq487koccq7hd9i9f1apu8qbtixt4xaw3q2mwkjv0uilt3fgwcrcmmy6nl92s3hz5gyc4eo46rd7jqdqaf6m3crpbzmdywzygsiyxq6503at1iasqn1jbf4xbdpqv8j6vwo7qcg0jl0po8xl49b38fuujrzkad19x0rn',
                application: 'vsa8iwv9yu7jpwddulkzal27a343h389h3ncafqk6uqm0w8ol4rbnng3sk70',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'fk9qnyu5pnyxmtsbfpw8e951mfrluhsnvfd87',
                hash: 'fpf6z2sr4altbhcg8rn23qfkwhjh3fi7wbjqa03v',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: '9ay84v435fcl4wqx1v791ual80eesc8z0gtof1pc0nue9ey2cg',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: '4b7iznjc2az28m7dusgd',
                version: 'dnqx8zahk3ft241va3kd',
                scenario: 'lckn7npnqurjr20zfr4se2sgm7ra9zc9ig42lg71whu2zuqsa4dcdqnzoehl',
                party: 'xj0qxkatapwpjxeo1wcwfta6nhp1iinhlpz29y951n32ld581d0srpfretosr86me4pew7hnl6p0ty6yoyt2daqpo7jvjeuz04xgz1x5rs3lo7gyqxftcfxk64m4rhes0cco1otrn8xayxf6e9saxc916ui7z7h1',
                receiverParty: 'f29s5fkcv9yd59ysiyjfxubguwfvhuelikzpl1ercym34cvml717fv5sbdq29ol24gyduqe1jx3o7ubbng4dbaht75lvnfbgle4xn8u65n7fq2d6qti25eg2ukgq7spjpn2u3rrp7t5et5wo2rd0y8rubo3l3ydy',
                component: 'tpmwwa5wn34q6a6zmwfbj5o0w75jcz69ingosn8vuoghbdxois189f0m6f9twyzm7xies1yw9n078rer2orqttq508a66bdhi9mpc5rz9y5ldh3udg57uwm30q0hxluum646sl8kvbe7v8p18hzm1k8z40osi49k',
                receiverComponent: 'ppxk2sqaxc58r7pwv0yupirxmp0dzg7dnb3r44hxoki9591b2dh5z5c5pczvlo7vx45cah7ihkbzrmrm30imnttiggtevwckb0cujfaksxezs1ry84knrzbzrdtbk2cqng09uy7tb7nt03skvqjjlrwexrdb4f2o',
                interfaceName: 'csk2k3fknx8u6mwr0goim72ny2uloyusss0ur24ougkj7zzjt343erz2p77icdktpknx4r4ro5gcoh6vuhcpul6ztki4h7m4tzn8y0mr9s9q63p1ypzs09q98qj44008xvnbyug23d43b2ef0zddle3gj2vfnc7m',
                interfaceNamespace: '0wrhpfclmydncwtantcppmvfu435dfdcz6v1wtwbbmaz79296p6zy0m3hkhgk8a91lmelcvuy9770on3cl4n4wfm7rurb8bm13f36ubqdy4q5cvl18b5g0z1g7jypkhef81htiujbffh48ndkxut43xmi2fgdne3',
                iflowName: 'zc86ipwo90aleeqy4vt9lz86p3bgizhct1u308zg2atzulcri5hk363f2ria1m706a4yh6wdfebmm6ctxh4koa43jpglddy7j5osqd4rqq7ak7h1aqnpjpiwfstvgqc9yx21t7fbv3glyg2ffkd7vhk7bwsruld0',
                responsibleUserAccount: 'byz3hpv90on1i433n8e3',
                lastChangeUserAccount: 'umpc6jm7l2ubu7pylkuh',
                lastChangedAt: '2020-11-04 08:57:35',
                folderPath: '3aejio66rkv1aq4gxb0n9c836pm9s5o0grnl0m4a6r9dvnlyyezgxpxezzlcn74nmndv8pknxmjmx9xdab0ncp083aaotxguxpkuay00i4aywuuode2aerd2ysviwrilzhzu7u2if6d584ugh6p78c6kqoeb1fecood1q2cvhb9wlzij1n712e8uqxfvn1k3fsqqqbh78639t0db2wtmfj3su46ojragyk4uck7dyrhbfpsgf1fptcqeb23pv0b',
                description: 'fbj8omhrk1q1erdemp6rkrd38gb7x265u1w8lggo91xatwtul8jqf2jksh9fatbqqohdg21z245q2s1c2fkqb7t5kowbk94b9x8eusfdbyhtp8ksekc3x1qi6ckjyllx57ecrygpu7qd0hfku7hamwsjtvbgp116epfq8q9y4jjoves1i3zbtltv3qqhxuosdkxngxilfmrdwlq42dheat2osnrkmc7mkf4be610yix4farerm2756kk6zsxxba',
                application: 'fkx406eswygaj3sxpulx38kcoomm00e7yt0i6r4o056hsazwkh4wofhz1j8k',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: '01v7tlchqtqme8c9czwv5oxlim459a19bz9pxn9w5',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'ebmv5xbhz9upxwbjpjzv7nmsxy8jkt6x10pc7t0glzyal6ra4i',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'srt58f54ey9x3u6ucrty',
                version: 'evcgbflmollrc6f3y1hz',
                scenario: 'tzju8s997sir0y3gr6e92swnbzntsv3k23nn0h899j1d938gm5isczhsb3v0',
                party: '7j7brkj1d2yc3znlk919yoby3070nmwm2frjfdmbr4xebmanypna5ew1tmhovvxbeoqtiyuineb0wmwzmhg9empctqp24y915lab3f18umn1twhm53zy9e7dqniij9yz00ltv0aq5h1d1weprhl1ztdevg9b6z3x',
                receiverParty: '3yhgkbtq5e1lzbwfoeox5d9v500kjncghp0fd9tckx4w6gk6fn3fmczb6akxk1d1q6hd8qr0b7u93b92rnkciklpqtqnm4qf6h3w8kye7eswrw21k9rc1sjtkw3qtalk7vnuxcvtl8vply6q3wilfcv236dsdkae',
                component: '2vy0bsvvsctk9odpai9n8oimwv828raw3zdrhb3oqfnbu9s0utifbvh8gafsc7n3ux8oeyq6xv4tgzm9luhree2jfgp16v83tn56qzdgiwxwhqcetg0fpefpypztad8wha5hv2jm19k22l1whf9d7ecmx542u4gi',
                receiverComponent: 'sgspq4kv7156n6xx316tz0dbv9sl7movzpbp5zs3ir2rrmrl8pi1ajl1uwniilkvj36grxr7waym06s4wzo4b3lkulh9ijajvdsfsix3m3jhr7gutzixqvse460l4k8s2huss4t6gn9gqwufyhqzm104h1xwkrma',
                interfaceName: 'bujvpz9jbick9ldmizkdv6g2ums45kwq1n9lhui7fslifeylxydqhfte8db8fypowixcko6172jq6fii6hhr1w3hh4gtiy1i5tmycqy5cdhemrfn7z0ejvjchvbluzqlj0qlerpxo1wjutispekk7qwv0txcj7os',
                interfaceNamespace: '2w1mt5lqc1q6r4j718r0f0csifbv7zyg272w4dzsom1cydy8qhbw08q4dfxw9e31i9ong6l4fa7wsi3ukdlcnwskl1v9fjh397yn1mgwhkhxkrg9xs3l9cp53gkyjw09p8brxh81wcuk48tv33h5zgtgsyplhhvh',
                iflowName: 'c1kr9hjmkimera7ubhoyaqs7ib4zdd2iw6j2643z8anokj7es5xjqnvn8xxlw2b6sxscztte42b5cw39cq5xjzmsl97zb58rrndyqnnhfb0u25s9vfygy1ld1nki1q6u3xdr432t386tbqtmori9xxvk6d1l520r',
                responsibleUserAccount: 'vftlj3cs12e53sr931oh',
                lastChangeUserAccount: 'o9nqdzn7520761u0bgn3',
                lastChangedAt: '2020-11-04 09:10:23',
                folderPath: 'j1lhhla35exsrk3r8c65sywb0adci2t7evcrk7iw5fzvr0bwxv7k8whai2urt51hrrz9wvemt30i1do38qpt31oi3j8d5ecpjw8wthw32qknbmiw87t4yogso30pqqc6bdvguv59t48mmow8d36mpc52h8wygqtnrburmskk360fo42z7mpcn8t2q06v3t0t2ccgtfxqtv54ohnb8svnjj3ior3uot06htidhipqnxas3e8w0htwhcr7vuvdi7g',
                description: 'tytsfombav2qpa4hc3n8b42ngnqrp6olvik553smokbjl8b5yui53rrclsxghz2ong4lqnojex15l359iqei7p78bqkfcl6kmlbwbveik919yjk5hgy0hipv2waqh0zaie27hyrp9az4rrcl4lq6r9p7jkkjtl44qx5gr8ydmvc9mrkelwwgdi42vm9n0i85bleg2xi7j0fa0f58kz90ouamulxz8kvdxue0qwt46flfsnfgkefee2klgp4tv1m',
                application: 'weosgh31ddhsfh4vfcvw8w6sh967ysu7x0co4ymbsjxgv8q1a9z93wjzkd02',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowHash is not allowed, must be a length of 40');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: '10kuz5weldf0icvk2qjf0hk70dc1uvn4t4ndbc5a',
                tenantId: 'q5jyeept1bqcc813gs0x6mobmx69n9goqlym6',
                tenantCode: 'ehbl2grj3n26dx13k1bjuuemq7952uodm00jj6o3prmhiyp5xk',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'a615kowhur2cmz9ifzom',
                version: '1jqndzgnrju9jk9oz5fe',
                scenario: 's2owsbwtvjx7w5q01vau1pdjd71wpq7ts31aulcze38nvb0qdfc7anb2y7o9',
                party: 'dtq8jkmfz3eu6tblcpffom1b4kdvm7rgloe0m00cc3an6bs5ozdokykmk62pjfqllsjfvfs7q2yuawm30hw6j4ug4awl7qq2amf8v25ygq17mzag37ubrkhb321xun05igc8wk4zjtnheu15mbc5szdqz0tlefeq',
                receiverParty: '8ml9ztj50nqu00bx49pddejx0q5hk037lzzk7h7l5t130opzgiyyytu0ylw4agcuhi2l93ukwk6up0qhm14i4yg6j7td6luhoao4tgqs09z5bjgj6eweldatt34z3of8ukv6ep42hm6ng7rcddkc87qm4h51nvf8',
                component: '3vo8f97z5frkojmmhpqdu4anwcv6bv10oqcw4oquvw98fzkvo2nlc5tz9iapzjah5p5s2kbdi560hz8ncjsnpaiub9taimvycucq7xmm35l8na1kqzboex4jj58xyiv962854eiattdnjfxvb3kt0mktoken3lgd',
                receiverComponent: 'ph7z0oqstoywzekeyaep278ksoqlcecqgb4lh8o2zw8ylc8rg2uebw3igqhm99zwm4raeeg8cdo0czmkdmuec23cdv83vh2ara1r570efgi8hup8b0u8x470hugx3l88ql65fw5puft0nsvodowzsik5kcss7g35',
                interfaceName: '8yj7hasgirx1979knbxzjqgkwms6que28dd3skhfgvglul00pm6xscuzjb0akdu389gfv0ubnkd71xbt9mmqr21g3afal6qxoobb803ut2nnvc22bvpksuf3lm30tq7gboen6xg1lgpscpnaxphfbft3e1j9opm5',
                interfaceNamespace: 'koli9e69mu6aryfqof9hre2iesxxufrbencdbedmr30d8q7lgmvrsiw8mbmmv2bjzb8518y1ns8z8bvwqmvucep5bs8qad8kyiqin5uar32k20hclmfi8caodr7f2yvjjs218sxffviw1r0ouy9oy5do2oxcxchm',
                iflowName: 'iwweaiog5rsxwffwloavfolf920q4jmxouae2pp0vgukaozc6dub4ohllj4v4qg1ltdyb2raf2qx9u40tsmvxg6fgez3l5h0vgt11g5eyqewv7aa0o7bc1fzrqz52lpm9yaf3e77iew4grhdcgccmvyaxoj8azlu',
                responsibleUserAccount: '8qmn1stp30ndn27pgfeq',
                lastChangeUserAccount: 'buau1q5kfhz34rmkacsz',
                lastChangedAt: '2020-11-04 19:46:47',
                folderPath: '1j4cpty34dfrcgdajnmcnsrjmitmu26p83rl8q5w8i5x8n2ha9kq6z2vvg0a9ojb1bor8klar0vvjki2z77zvl51fve4c8lofbnmhpm5xhhlups9nwj6ml1zsbgvw5scnzbq8htg3ycds707r1wnz1ubhn10e0hr5xp7ju28rob3s432wgwz6g5lgeto5zby2zbmh92kkcvhs68ri0w1jfxk6aaee2eb5guuegipebqzyhspdg4ar7r8kxoc2op',
                description: '1kfacyq4pvbvy683l61ukigx5ccalyaa5f6tttdc6khjz0vnw2hfu8raqcgtfpvqoqcc5qczpp5sg4qv2wbhc40l9rflg4qexwnyveh3m3olkxp8y78ma4jnwj15d1xz8n01r4opw8m2rx7sjibh30w5prpcs0g2i1d8llpbez2fd9d1uehy07dtmdm77eiexvjqrl65m4d42k20a1raqgab9t6yfktychhvk6snaa5c3chj59vma6k06o22m5x',
                application: 'c1zctvxvncolcllzu18fr0yuladky7rguvs10qljjwlp1vvt46ae8jwa6xxo',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: 'f1ljt5uy3svlgryrswh6sjdya59jbl02dhgji4ak',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'q1vgczw0e4rg1j1lf2u3lwg39lkqdcro7qmmakn3spbzxs61sk',
                systemId: 'eiac80jp62pswfzoov311hh74xbhyfgxfpxeg',
                systemName: 'kpy8jdz11s2dmrwdvuhf',
                version: 'mj1dsvl62fcg54tpw3xq',
                scenario: 'brbrit14sho2pwabp6onh0gl6we3jxswvxmmn901ubcfomkkzlb9bebs06wp',
                party: 'oax981cc7q5kzdn228h8p07cu9lhd0flul2sxlb5q61cv3ldzpjrcl2vyxjkms990c0do5xqexvpo3ga5asc5nb6s9w959v039g57t7z13y4yt5nwzqysy0obypd0d1a9niodo8axayl4nr2lm021sazrv9sqm46',
                receiverParty: '59mia1zuc55rdkrr00y5dnsmeuyyw9i5fmjq6advtuajmcd6b2jtujqwnc9dwhkte6ve4pjef0e9hhy9k4ly9kbtucdfn3qdjvbn4hb1cuzrhbett7rh2mzxcga29np3f6fefge2h94b8bu6h2n6vvwjnvlz5jj6',
                component: 'a071klakrtzlhnqz4ih83coopr669pfqd028luhgfmvaba3j018fyhf1rz49hvrhdqbs86w4mzznfbzezxbupf1s69gd5ryu57bkmtsihrnjodoexuss9i8ippm4c985weoh2wru9go31cbb8n1vwgh8gm040kak',
                receiverComponent: 'kd02k7jdwj9w7kjdmuw9uhjx4995blr7epj3mys2om4cfw2dpxrb8ca5prcx9k1fjmg8v50udg1ygrro1etkz9n8rnr5eszc7eteyx6dqh2vbtxml4xer0bwefd4l5pyjsu6io04f33qqy4h1382obmkdb04lvy8',
                interfaceName: 'jtf0lfwcviiz8sqn5fvm6c315wufopjf7dm7iu884uog398k63zz3ap06ifkfpu3k8jz3m7htrxopvw3e5t0l8ewx9lf5xu1vhxdstf9v1cu90nu0tcin910ovxgcroe5h8s74lhe8qpbnjvk149ral2fxts87tw',
                interfaceNamespace: 'c2y8lr3ibma24wvurlcrmc1ojzvgvscsfyn2ygtm70kfocdntxf0784epay7qjq1sind3ihn2yngy77aesu95ntayrfsy9n6amnjww0fbuco8j366m25lpu1klwwi8lx7uc8c7pltzzgxlo0lzujopeez5b5cxtj',
                iflowName: 'rtffu06lfp2r0st2r0x7errfjlu7nul5l3zj0o97ph93ja56k22ns52rz2hewn29kr5555323gs56pwm0hh5t750epppwxxdec0mxroflxwqbh9m5kdbddg1rnz3nft42i2dfai6yj4p301f0zkhhn78tnklzq94',
                responsibleUserAccount: 'cyg4m5e5wdc4r9yyldwn',
                lastChangeUserAccount: '2lgggbeiurefotvnlkjd',
                lastChangedAt: '2020-11-04 20:49:05',
                folderPath: 'hutdrz8rxwkj62zuco1zw8ytwpxd6du0zwe3hadl9cifhz4ajpwuyb0cv58tfqkipz678y3li1fzlnipbf6j4zsq26c570o1ju7g9s2vpxbceystvht018cu4cus6fw3j1fhd9bi5qe7om50mgttjl3y9cxzssdmcnskuc2szrq7ckdidpize8z04ostk9xxebm019uoxueuzprmq4kv42fzmehar1mcy89b372j187jlib722hmiha4utqsc1m',
                description: '8pywviw17z95po8tkvu70wnyqo08u5h2blxibc1xmg6fce32wa6d03k3ly73riw1jjyec913kbipj1em5ntzcxljgcczp4ncwx41uj6dt14npq6ccmi83qw76fxpskg5nqemtz27iln5f75w5x53w3ix3n1wqeh9qjgibdoe19kfxn0grjd57mb5nyewkpmzc9x2kglxmneriy9db03n82xxqa9lwb7xhobbm2wen73yjpnfsdhili7lrn1gx85',
                application: '57nbar92uwbknflakm1rlk12q86ui65pnvtotd4a3df4wiy0zurx2cn0gxop',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowFieldGroupId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: '3cm1e8flqevm3scqrvac18gk4snw8l4hhyz5giqp',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'lb7v4h2otexzpvyi0cei2rqao2dkb6g1jikatglayqvsr1ibsh',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'v8f9gud4w2bj4fnzg5w2',
                version: 'd8s8xop533y8eglbrehv',
                scenario: '8pfma1ytvawosbk50cm2v9fgjncnh9z4jab7iq51jjckn4h8qk8a7bvlbcfz',
                party: 'z0nnyaacu2tvaslrvhssvpmim4bjvd1pq02slnx15x1vxx2u5zrb6mkic3f5dosk0qigw866aueg5z2ja95p7h5uj78fyzvwy8hdedzyw1h0lywf179sd9ru7fhuabegse855k02glys1vg9dfl4gjn2efwwkte5',
                receiverParty: 'njrf2xaaq7k7d0xdzez2yz3afs8f3h05pbfzthlfg9lqn9ihh5emecdnchwnis7enrh149ghd4xf4cp58i79ys85brb3o8zdze2tzzb92i9nc1xhjl4g4gz8yqmk28kr7rgkkf4uqe06zl2zcq5au0k2rzejis9q',
                component: 'pe67w8rr465c0rsnkz00mxlt59ext8t90pgvn2zz2q99bddpez77srnhjj4fegc4i0yvdzr81cxw1afn8ps3odi6a11me2icnfzri8h2tcqi9xp8s9wlmyx76h3ntv62tllh98junxlk847u49ax7v75uupz9kag',
                receiverComponent: 'a0rcz9ogav85k946fty3s6qoh1vwaaoidznvis655kj8m71lotd2zkfebp065i9xhdk2vzx46igu0bejfhkztzmkjatvfyqsatsokc4hd2ia0qjvxk2ai4998jdhpfm9db9jwxmfeyo72mdn3yviyzpkpvmexjv2',
                interfaceName: 'yncr5z6j3sp3xbs9wr2v5b4xoll0h70hn3xubmytet67ejf0gemw085npd3ppxrzyf8m5azsjm9w3fsq2w1p99wbas5dsvkvdejccln7p0k652finao3w0x4wi65ad7ya6yrj9vp44q55as69yb5mqpnppsvo3tk',
                interfaceNamespace: '6rt6ucrx94fkm471up9pioqmfrmwvsdrdjb6wbyxyp76yzpm9uoiq3f1feefi2cvplqy150l80ru063xf82cd89o811nva5l6uijfr6oybwgr9d9mutvan19airnnbfbbva29u0t93fbald1n4jcpbjp1zgyfla4',
                iflowName: 'ftnqr0xonpx5jj2z5pcceo5vk72jvzcdbvm0i1u9w5gvt1wikicy1ls2ouhnr8u8gu98yyw9co5xdgj8o25aeszhv65cwro96gcecc3aw8kvigxhg2pr8fui08ohx1y6gxz1bjbnilshqoup9vnu66z9p78849gb',
                responsibleUserAccount: 'gdwmt6psbbx95zvuv9t8',
                lastChangeUserAccount: 'uqnigjppc9a3vu1whc4n',
                lastChangedAt: '2020-11-04 04:41:34',
                folderPath: 'll4xkbdo8qcees3mzc3t4bhj13ny61unae44kxf8er8t7li963hq8pc87hmtcutxadkj9hvouerliufipk8in1cvd9k7p5hmpuysswxog60wupz2fbi1sodhnov80bombdl7jyl3ky93v2kl4ob8wkvledm17g7z28km7v2et5s4c77qgq6nhsx39btswgzrprxt6rlx9s4gey3u27u54bgmp5m6ujgp5y2lmdwj9k4fw4535oza9pfrc692bph',
                description: 'ulvewbalm8cl1cvvc13f80x2dy1818ggensfvhji6vis4v1rstiz68eba2akh2iahd902gq6ix8cbc7d6n2eujybhum47zafj0kdtr2hcy7czupizuu90zzh1irv0f6kg6ne935nsmgaz4j1rxxdcsxwxv5tm661n4wk9qw4wsadd1tckez11q4rhguzbmxu5qo057er6dq2n7kmanc5mqzy2k728fch4wggdo4dudtx7tfnoicbtyhnixnf35x',
                application: 'u4w050fl3mn2roy3zt2u4y7o0m2ngn71tvze98nuk2s02oo1db1orh6jrua8',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'd08dca4nw38n5xen1ym9vrtmspdtiyk1wqozh',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFieldGroupId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: 'weiyd6hgv92i4gi2yqft4bs35hyhy3a1ak200w59',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'abzyek9d7dhbzoc5c2h3be5xbgh9xjrq00vp5r7i42vdq7r7ubn',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'z1zfod8uthw2xjl67gj1',
                version: 'bmq606s627k9vd9slaig',
                scenario: 'pcd17q35da9skp5mnbrjmjxr88p4tapflqxzbqcqkqkul0000qkt3bmlofzr',
                party: 'vkc0kmpxjyud7nbd8yc6ewvq9ol4gtqncnboazcje3f4hfqodb8onjt9dr1y5glqvppn1aj9oz6biaeddia2qlh2vanvxn83e29ct7y0yr3rvi0uh32whvewcvk6meqib33v9fg5s472mbs9bum3kdxfw4hhjxkc',
                receiverParty: 'lgm0hv570iwc8zkg5y2f85g7domjoe7axp3ntmhi48t9wkmaowapsni8sjzmlfyic2cnw8psqe2xklzlzcytdgd6p014vpyih4y10iinhz1myrgywnh87n4b4d7i9tca82c6t7l3r9d4m95fcm3351hgju6a1ceo',
                component: 'kngym0z69psg9e404nvgn91eiyld7pr3uj55xtr7zka4yy5qf5m9kf3pevlue2wm3q9da43o9miyme1baht8k4snekfa645urxfgjy8zo2lbwo1wdnooiahfmncs38uhbplk76775c4z8sehbzq2xsulpioqpnyb',
                receiverComponent: 'zxuxml03a3w88l87qj2ro4zw81qv0c217b3sd5bpn96k2ss7ok5eq2e5tti6toa4cdtk4bk9oe8lugjb7rqsdmxni9fomam3149h328jgwogd1b3vzwtf8rcdqeehrb1gznf1pne2n8jdk2vfrg7kipqf44omsoh',
                interfaceName: 'vtcbv62u6qv1ko8lzbw15uo2jivx96j258fmcqan1ucnoimhwinsw5hahdsfyn84ym4b7cn38ft5xkpc4ru8filarg2lsctthp0xfkmqr72yveznp67d96sqj6qks297lwgzlpx1ybe6l0qbs0jummye78y05yuu',
                interfaceNamespace: 'sqc93jncbyivzdzd2bpttn2eaecqtwheevo4kw372wti2bbfv47x0n5tu8xb1vl2z7h5egh7u07awz7brk7bho6tu1otymej93cgetiufq3pg0xrya3wc96ern1x7brw37e9cll21d0y27n5ii0gz483xwjq6z29',
                iflowName: '96205qk2u0ckj7yb648x4hdvmafyrzsx7maxd0md9b0r5njmpbqsafo2unotzstffccwp76fj66tdamulpetwaahq4f2cuso8jmj8caqtcnv1x6v37qlvk1o1hegoykkkt1egoqmrbnzek2b0erzjr9gao28z2gx',
                responsibleUserAccount: 'c9sqzjxms1pqz3zlbeut',
                lastChangeUserAccount: 'tbg362a561wyojwmp6j1',
                lastChangedAt: '2020-11-04 12:01:35',
                folderPath: 'korm8tv1tz5dj8mkrc993ncwn92uiydscumxow6hgi86n1cl0r1j5lvky930izr1a2jsh2k87kmn0inqpjhjjup6b48cqbgfq829m4c5m6c2ph2dcurcu2gm2fzylyztmatnx1ofy8633rcr9hk9uftoto4rcchey5rjmgsd7m2ro72ahnk8wai25nuhkrzst7iq5r9tmbudgld6fjku7ypuj5hr8975s9wauxzzcl165fcevi1abueirku03b6',
                description: '989vifq3n2twp3orzvjlzb1a1u0iz4enspkydjto0rmiou05h7g837kdkw23bo8zxe01w0zzeizal48wxusss4ewukgmqa793e5dzdspkhjgob378ykesmc1cd95rijd3d85919dtawdi2aoqjbhmoxcdqty0rllx1i53y5ejybnv6eppurgf21ez5kth7ws6p1r5vbyvq8k63g9rt5okutagznsz8kgn4nw9u1uux1gs8krkr7qtzx5ygb6937',
                application: '2cauptekxxwdwqlynwsgzdu5jlpr3ajv6nztb7b35f6toan82r4lg99f01th',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: '9yu5x7wabx1ewnqq7l9c7vm7jnfcomv08ahk7yf8',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'y40qvkjzh6091yle9jdmyfbswrhv2321o52u6auqebrf02dkvx',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'yq4vln8g1iev4ri7kkbs6',
                version: '7zwl1n9hc7ymv7v03kjd',
                scenario: '1f6t5oyulbg23k2ql7jvo7n6dkbu3q0drxbx5sk2kea15s1emaz347qqpjqv',
                party: 'aso6rukz4crftdo571cph564le7emv95rvfkvlmz0y9f7xwrbz95qn8b7fnku0xvvwv4sxh8jn3jclo97alce7o96ll1me4d0ezq0iknl85lixkyqem7u1nxuzbbeys4d8epg50tt1qu26wz3ptnhxtonrm6j9y9',
                receiverParty: '80ziatat0incj3zlr0c3fc655s8psp2vpeq9lpk4ttycl2hqd1vulnhgozlkd9tuj1dcrye20gvl5z6g67udohnbj23rc4yh2oumowseavrei7ghemifo8pgtiaw60a1j5uu78stuwpp7us29yqyq1nf3w6w6lof',
                component: '5oq5nfqorg8fg2n28x117w3gu2s25qakn9msvy7j2jljaa0nap2t9gwixllw7sxsfe59lyvfdzg9fo5dqcqbddg6rz8wvffvpuyq6w2d81vro2vfadblhwxvosvabyi4eizpnc3qkic98caz7p3zj1w36o7ss9qm',
                receiverComponent: 'cuqfefc2ayioduggz7vgtcsnlw08upar1fv8g6k8b8lcakdb8cofjkqf9rorep72q9hnfdpqpiw3vor9pllkdyzwg0mscb16v8bqtbop0hod3avam4nw52546gmnbwx8zfc36f34xfiy7avqnsk0ffccwf97yqzu',
                interfaceName: 'uwb9tjeuy0hicj02t2tpy89gbh70ptqmd4lxvbnrmcs7gi3579x0z3ak36axa4ed0o9oza3t8flz4zsta3tivseet84tyan3g4rhloxaunjluyjg5d2onchvqjndobad6yiqxbc997zmv8v0lyjd5y9tjaazg16o',
                interfaceNamespace: '0f1qoeeyygtghy1svqjqaewwtwzs6ua1j7pi96wi9kf0grfwyzfj7yvxly90xcpp5h0vkdpx76oc2wxqecthawdppg9da4e490mot8zbyi21azhl6w36rwe12shcppbkb4ba07t9c44jr5a1w5nzl2kqmt5txlp1',
                iflowName: 'oatqdk67oxhur7emihwpfydvrskfdwpj9bxxnbuetpgml7d9ikbzatg44mco754aqetyo0vx1vfg73sqiy2bckxrsb632w604pnlnhp7genzf45d2u2vd5yqhkjn1lleunce2ku3x4j04orpnfhpl4hw36tko3sc',
                responsibleUserAccount: '282b5rl8j1r8eseba3n4',
                lastChangeUserAccount: 'g1m4eyo5j8430pia8x9b',
                lastChangedAt: '2020-11-04 13:53:26',
                folderPath: 'zbk8pdkgjlgn2o40yp53qh18xax14ifn479mshyrl4bbkzy7s8sti0dbk3o1u4o3v02oc8lynm2c96cnknnf20a6ut091phjiu1g9r602uou2frvqu5pj6zrthqcfr4jb5t6bwb2eikhtz6n7xnv4anbkfnx2xgdmmfjht9zm547i5oe0autte36vjfzoip5qdf77k07ehk1rz4jg249ckkagpjlkleha01a00lcmcrd0hn3axbjh9ob5u8j9az',
                description: 'txgiqhexbpc5ofuyk541f2uy42v5d813gaecznugdkwjlhz7t26s4zs3o79ihjwrtq6ioxrcbe3d3heyax74empq0wukr4kg78thyj5tza8em7zj7v1gt4oi03vrla33f5xps6dfvo7ixjv5z85duzu3a9cstp89a9px5z1z0ztao4k3yfutfjx7a19zwbhiyy1l0hsop24ulfx2a7fq827yxlazkqrlfyb9hgjnc9bfxt49yyu0t0dd4mt235w',
                application: 'ldl2pndrllcbjdrydtwk4a51yt3dj7o475eirr0nepb87ejoxlyo94z1rm75',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: '4tg1smahlztnlpdino03vuri0ew5n68tasjf3s37',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'phq7jx8e7wkmvt58dghyu0y2j3suk31knevllsjlfp7n7r7bvx',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'oft3aqfof8m92ce1pw24',
                version: '3h0ewjjhkl0290pheeaya',
                scenario: '0ns570o8vnvuqwhflcawy26tz3yvhry36x5xevljm3oevpxisu3n16ua78ac',
                party: 'pha15lqw84hfj0a3sx1whq57zamo8pbjw43di8rxanpclqzdkuy550yaxic8rhd42zmr1pg80a2mjytttj9q9wi2vusddqfr4lxaeq4rn384rck9walfzey82jcgmhb38cpv42fakxkmozsrmejf5e8n1pk6r7sa',
                receiverParty: '986zimplmkx8fo0sthr2hah1qspupveanb5sb5wifntj1p27f6c1od7epfie3d2itjd9fteki41wlycifffil3tytjdkhvt8rlw100oi9qic0vca71lgff1xymh1tsh4a3pwhq56pyrygkx6rv1j7yt34tcdmej1',
                component: '5jj8xewfs5u0lfnr1o1l3rb4f6dc9r92m4f7pv07unlxu4gxa3jo8cem1bvzwtp36pjpxkgknz45ib5tf7h4ovleg2oggnwm6hkgbqxwhqvd25vdktv4i6olzkl9e702pwb7ac714ng2vwq7y4fy4560s2w0thb0',
                receiverComponent: 'u3u85kjmjke31g3zmrtpsfc3jdbjcpdprf2b4aw3zwuqha3oqqqqr1hzpaikd51qkmr6b1c0u9ia17q98kx1mmfalz3m9q98rgvmvfcejh5159pa366ejfu5umz0mquf0vv0qtjb8nenw26wsb5euv1ct7817jxj',
                interfaceName: '8q7w0bay3ano5jwh7ahvxm18a5f9i8g6efd9tjv9opfhzyrx8k15sdu0848k5fcux1gq15aonntjsbes0f4w9difmpqff9fob6z3pndxq4n6jcqlcm8dwm9b0o36fcnxe2o470nuuwxpqrxmbajtmp6hyrfosxyq',
                interfaceNamespace: 'x7rldgto37uxyt38b5tflthv0tnp5xofckh83b4fc1crmzjo08m4k3udn6yle47lq2l4sb0eqr3w341lknokz609ulqwhh7f6wily7vqpaenl3muk3yidmbfu46w1jga50qnhyi1yos3clefdd32lc1kph7zn515',
                iflowName: 'b784dhz96vjqkel1ug6wiv3xmd13mycn9zndbt7brqhsrwfl6wyh7g4pubu00ng71rvqdwdjiwcnmhzzepr2df2n0530k7q64ukf742ebxh17t7d3ugl767xobxhk6p3w1vihxexichkbnztsh56ax27v2cw83z3',
                responsibleUserAccount: 'dd7my6ej2fclow524r4r',
                lastChangeUserAccount: '8jxs0im642dytdh7gfho',
                lastChangedAt: '2020-11-04 22:08:51',
                folderPath: 'prsd9dchzc3oign0350prullouwlp057boc381c9j3xz6znlyo20qs7goanfsp8mn1cebrcsfdyqh2a0jm5x649znra77jv52xc70513owoypk9cqa28qbwf79i1hq1gqq1kcqrpj869si6y1n00xfee9836702ooy9imwiiei479vjmm0ic62efccs5jbujic5m209p8zoqv9aqq2utqa9xzv2m3xcppaniemsgnreczplmvyvrb5je6bzcjjz',
                description: 'hhl0kx7petgcsr2g4vlnhgibthj0pb7o6w1z9f04hr5ovy1eib7a6b54354ath3jnhich9kyy1dh9o2uh00v5sf0ys4fl9407m7l4hfnydo7b0kncw1zl48uglrq4wvafva94ck1ixz8o2ru5vrh6wldxomjq6vcph07pv944wcuujm76covvwsrte29v02qd88cyxbgielf84drjc71th0ya9fw5ossj1qensriuix6w0kq1vdg5fl81a6upz6',
                application: '167nse3eb7elf1srqqpwo881wh4zn7757jkehbdq3y8ghj3yvko89mzdpkc1',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: 'pep999u3uo25nj7sk5f2h14alpl3luq8jlzskta7',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'ovvs4zyco40wiepar1p6f0stryyt4xi4981ennrdny49bfoqjh',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'f8akxlpzfdy7gxumfgwl',
                version: 'c83pht6ixfk99oycpjjb',
                scenario: '8s3zpyrjmjoc78axad2z11h7yxvs7apxzdvjn3tb6ktryg4x6136ddcnu8l1x',
                party: 'u5834shwz6i3pur3uc76xu8xpxb704qh58m87xrki94d4szhd1k2esgu0df60tyq7zzznah78fsy1foatqh1hu1xgaaffd479yau3unk90mpcjwkxlogoa5m25srge7tsv44s4l7bj5tydv93ikhdflmn2rdfsb2',
                receiverParty: 'k6uuf884jclvvj0p3kbp20a40hyobp35553xy7w2x81fx8kr16amyqvf0fe4hptod6r2pvjrj9x9c44fteifloc3qhevm1r2wtr9sngblkeh6rzr25m4xqc55gzu8ukyacq0almhoq8slficiuc634otx18sxynw',
                component: '6ulmaro6hu8tlhjvbnzpqtpjpaeky11y4gejyosn4940jkackf7z1zmuliu8yx1j26hewpoqevk13189oxvmldbcrpbbpo9v1d1xub2r77pqc20gi826wbmgy2a7cnlrs6tcndlan1a4i1xbyzvsd6r4mfhpag3f',
                receiverComponent: 't6y1iw9ve5raq0a13pxl37xck931d69gy7k1pfa0uomt2mtvzddtqs1w12enrkoixjytelowolxkdhrlaeoaz8bd4t0ibkwei08qwff1xdom5o85mu571c43yxwdnzxjx43xllb1yqe66974xk9utplxed95v4ee',
                interfaceName: 'nedlnanejctutw0zrhpst8lqatory7lgt9hjklk4m324kgn3toduio88l2yv76edg31hxogiduvtwwcnccdeqkjel8t7n7zcueqrflry06waqwosdbyxim8gq4dd1pclpvv00y5u6xd8j44qjdz9576sojgfv9pe',
                interfaceNamespace: 'xoi49s2a5yuhb1y85ytr87nsh8y97urjmfebpipjn5w2qm1tqrqwn15wjwmm6zhutjnccr2r1p5my8h1l8wwxsioa43fkdu6igw0yw2qn1jt5p7jrwn3mtcp9h22l5x2u04flgztiz33xpsqdpo7zydvuxoyexpb',
                iflowName: 'ks0m5i2ig57xw9orelq9njqip3kd906nk0ti9p2bz9yl6mn33bov46nhwk6syiur8n4e2fytptaa802lqvz4a9wwy85be0r0tq993cmpsnm0jqpf0sxr644yvldq5fcj4vo609wsdahyzkodjl8srg4uycki3ida',
                responsibleUserAccount: '1ebraxg2otkn4wyf7867',
                lastChangeUserAccount: 'rb6h6qkpfown2l2zeskx',
                lastChangedAt: '2020-11-04 08:40:32',
                folderPath: '2fxace0aftcnrr4ywirsptb9u1r63jdcst78pt8fwkglei5qyv7a3d9q3dz4gdd5tbp1pv4pqwxjegpunyujeo572e0hgm82zm3dl0w0c7h2h34gjs93ybcb93wkbho9no8tj2984ptnjgt2vqnd59to7om4omcilhk1cw11fd6vupicubu4a2k97yz2mlz94z4vtwwj32bnijezedvodmhooflr7jsv696cjmy2oz8asnpgwrfcjgacch0bscs',
                description: '9drm065lzijguntxmowysy7zhhjejxd3h2l7xglq1ce5zgb8fwjbcyvp5ia3s2ajkoyaeasn07d0tzvi5xhzszh1eucmvojykgoqkyu8dcd9jzr5mo43az7pvsrhtee4anxo8n85zew9sr3p7izbgg3us6gl8wbyuwmxl8brq7nf325j6vya8axoc06gdkd632opm342w5u5gqvq6wu6lxqkqz30vqwlbc7tgj6u24rolaedge3m4dq1doyi1gs',
                application: 'q7x4xiud9q368mzo5kz9tepuv6rzlxmjf5zyvipmc7zk4sgob42ny7nrnp2w',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: 'o62c0b9ofaeguljsvaqw2hq7w3cx29tcc51sb3dl',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'i3gtzxq02v1jer25jggccbz4fu2ffr65mz6oilsmv57rpgutj8',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'wt5tvostqclb7hxz4tk1',
                version: 'viuk38icokk60brp2in7',
                scenario: '1wicxbaj4v2oazgw02n5b255d7dl389g0dz96u9b4ngomdjqs26aeboargxk',
                party: 'idqlkwuf0glutpxrsmasrnp4ymuj9s8gqj0w4eooqy2p3hrxnq0392lfr2xutss2rf8h0jqj2pfjk8r1l6va0yrein6knqkbj4x1qzy8wfgkx8ds3z3d3l2gw9je01kpw4tyvht8bbir9m0frd8sfd4ipbwmajncy',
                receiverParty: 'of1bhhf6u329p76dck33jhsf4wcaa1t4yruxszy2jetaqi11duxi9p05rbap2f7ls8kvr38mm5x0p3c9nsmhv1306beq2wcazv7hrhqv5wzhtvhovk3vkefqi3gchd28ks08i6pfofstasf14vwc9sc4xli0s8b7',
                component: 'bqnfy0iw5v91fha94387ebssn46sixa53bp78tr9e7vy045z74p07dz5okpe3u7omusgm4wxm2lkt0tmgp5mdv2urj3q8t5feqz9b2aewh3ud8ejfiiraf3v2fd8jeyxglbgs09l6aby1463zts5qxguh1taemts',
                receiverComponent: '2mbjiugav98jcb4cg6t5ccfehi1q5a0jul4rajz8a9thk0c1swwa20jkivfas75zt7r1cj8187kbpg2rpf54jq6e6owitfzcia5i2khbxcitw57ugv8gncrfycyd23jkby11nhu49622yo3qtravr3ei71hb3w1f',
                interfaceName: '74nnwuzkwllw50zbga0r6r0d360qlwx3isgtqqxfzw7ncjz0klkl2f35q4h4xeu9xoef4a6u2tsoyotmyw9wlqqw843ybf948ilhtgi8xjk9h0lw5wbdtuc64ggbh5zoca3nljtryidsvwazo765ij7yev0271lo',
                interfaceNamespace: '4vdv3dcdg5kr20eohx6m6g3lhao6jcrdp71k3r3rrul4qtlq1djqy19vtxk7121y0fmcdwqpmayo2uwwt0k2wu2q2zzgsajuq91ep48x5tik9tn6zlemp0f668qmmfon5ugnjip3bo8r82bncfs8uwdxvqhmvseq',
                iflowName: 'gr4at5gbo24oixlh5g7ywxz2pbhwg7lkv99cyjbus2hbv26bj6zyizxvmm965vvc86odwq55d5es663p3jvtuyeqrxb62h33n8uycvofu26yixxcbfqbz4wg638cf2ur0ajtgu01qu8fdw84lsgvat7zoil9bajq',
                responsibleUserAccount: '4ylbmfpwo82pk3s6wm79',
                lastChangeUserAccount: '5e5y4ix8gj347wsqp721',
                lastChangedAt: '2020-11-04 14:59:17',
                folderPath: 'ymr8bvev4j4q49n7qsq8rxxb4uos7j0rh0mcgo0y2k1qy8owcdcns0yvkj1e2jetf6e1vmc9jwx40ayfauhac1hq0uf2nig9lidvhvdb73cztgi3flte1x3vqubue2l38niozlzprnb7c604wnn17265t70abok3fwc7ts8o4da7d6dgs9zkaz3mztw02g4pq9f3b6crbe0evf8mg195586itowt8ty9hl4bxyg6ovi62xqkf5h1osasgd9myl4',
                description: 'yaodhfmvjp2qfmszx6is14i7ajmxbhpmlf1shlst0r7n3p9tln4fa2yrzygjulmyhbitrc2xdlpf1br04w7figkakycgbouodixuh1wfdqujjvhs2tdh3eqnb4707s7jcvcdueq394n0lib7m1n3n3pj3l3jjxhkdpc8tila5y2ey3plggp1bhyn5xfaqy6yumhgh3zn258mob6xx7gk0ph81hmpequ9rl6erwxywyarjqflh49nxto6kgffkus',
                application: '36ogg2q2nboj3g6e1fm82dc0c1ondgmeicxxhwxioim86l7bd7p1uhomlaxh',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: '5i7bfi7i4u6bbchsovfwlk89aqlvnq891p53qld3',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: '7h5plvn8oxni9r1ov5wd9j0dzqxlkk2ibq8vqmmeqhk3f9u7xv',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'ej6ypjoe51s1a4gatyko',
                version: '6k8a70dcdmk0ptqzb7gg',
                scenario: 'g9t7bjhqeyfaylau4ahcs3hh40zclry50omfggzo83lvhais2f7i9k1pyt3y',
                party: '0mp23zrl0785502gmgeisi0482j4umk6uk40urc007jdfitb1dze1g44d5n491tmvpebg8pmile41ez95fvwjwf3ctq9mn127zfcvoqs33zimghtkvne7fu3sc3s5r695aoly2yh01anzqu1piwlh63afdwv8vxt',
                receiverParty: 'ftwp56b7ufa0ajyswoqx39rcxkimc1nie58yghnd8cz1oylh43kzdxghhrr7qyu276gcada5t1q4fcla1nah639gh0o5sx6y9ru3acosstacpww5qys4njywck17kb7m1a7dd3g481ufycwcjjmgni4z8bhhbbxbc',
                component: '53gtyblpe863y2cslwzu3bn2v3ryyv9ua74if9gd38zct5kvz228qseg27zmms4r6ma8iz8fudhj47nbxphtembrdiaxutmi4zxzo74dxu8lvuwge25ckun1w2cezzbwjey8df9lfxof0lni9tqqereavk31brt6',
                receiverComponent: 'ilukvfuheyah20vf8isgwzbbzwtwxkocq87wpfvlr0gqjob8hsv0eapne6hhskzmu7pw61taun3j2lskaz370qkkpr2d84udvx28zcn71cbfm4gft7i69kmgd9h8l52u5uoogkw17pf2hpepj57w5pom2eyvrbv7',
                interfaceName: 'baqc3qa7vjygwtsn6doh0m4uzw6olul1tuvzmmasulhjat9ajqhjwqbje24k7tar4hya0qxqpma37wgv2td5ljh2o5gzon5dm8otjv3zz6obe83zu58dj49f12lm0lx3fveomdubz1pyh48st83ufhy7bi229ime',
                interfaceNamespace: 'ko243ypcke4aibsu4l4vlggt7vii2z08hwrb5ww75zq6cz7rgpbkl5u6ff01kzca366z0ei745gqxbn63iztbxrz7glrxjxlab1xkwaopjvo78qkmms9apuo8iz0tdqwnugyf2lmtt7la80kmfg6hpigbfu4ww7x',
                iflowName: '5icsxc6uiym5indsvyb5lknrbtgxqv35xkgrxmm4rlyij6eztn7sa6qsjpxbgssjqs6toillsyt832tszajuza4jj6zje4ag0uh97d2636985wdx5jq6vicxfarl5smbp1iks1x4zyqwprq5883cawio8s39ejm1',
                responsibleUserAccount: 'yywdbuhqy7xmcym3sqtv',
                lastChangeUserAccount: 'cogqypp4n2zrq2dd4l9y',
                lastChangedAt: '2020-11-04 09:35:19',
                folderPath: '7pwfxddybik64ffjwdcbti20zhgs0wywx6t7gqoavcbvv03xqx0v6v7iau9w86huupv5ueo0quizt9lnd29iisjk7ohc9bt5d2viu44k4s4cle44t0yzvqxodky7w3a9vtwvk53qea1uj5vl89fc6jibh0gi0f86kbhy3u61dfiljt7d5v0bgiojne4k1u4it05atvh0qe9pmvo83cj4zgbfwopx8eqd4fiekt2vfm211yiewo35f3ysgs22r9b',
                description: '88wg6h7of6vsp406ebi8vjrt0jetv1os64ccgb6xx3lmtuz6t0z9xwdpnbb71trcyht9waal3g7ip3zc6zycknetwxbe6buu73kt7iyncbzs92mwgjtw4fen2aykv9zjan5stgt1bh05jfpgttjglczdoybo11zjmdqi0d9yhfnezhuoyaq7rtg1jtudrm94lalfir7dehlrlqb992mw0l15yjvqh7496sq1v4d4v0fbpfapufidpa5ccrefse5',
                application: '2l4bmiaslv57lc5qwb1clwmwgc9onoq228y4ntyz40pwm3ndv4nv1wcx9vxo',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: '8i3zqlzqj5sknld8o4qfzy4qoatux6kg0qaoew8b',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'e6ad7bntp8hfmtqn0orzh7085kreqob6br5kh4mfxj6bwy0tyr',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: '5awjomn7ijvxng2fvvpb',
                version: '58kdvzmtjjy3l7emq36r',
                scenario: '7tuyeh40sg4eklw9s7lxl70m7w7fqe92yds67nykmnr95vbc0s448oy0p4or',
                party: 'wear0onmwgzphs821c4wj8w5k05tw17ipz5ev6gz3lm7va0i6yff97t3cl7gtk6m7ubm5i75khu6fulu9cpwle5oi30xnaignrzivwtt5y1cj4c5zowr0jrz1u2a2bcivone2hntnpb87fabfqaddcn2i66ph85y',
                receiverParty: 'oxp5i73aeeg5rdvgeugp8q6k1mvlrxqv9jg7qx2oeitbd80egsw0p1enk6wutr09xan4wy7jmdjbfzmdpoqevfufmw19h1wy4g0vuow1k65ayq9b4khz45bxygltw3zqmkk2ls1uoqdbdtydktbnl4kyjqgi55i4',
                component: 'ijccncpi7tf7zomchh51tqy0osszx2qary1h3s6jkvpvnab4ktu1kyjq0phabwprkz1qvo1p7j243ivrbd83a9e0gbmsyael4qn7szv0kzbw9txkndw84x4h2f44td9ua6wv4mky0ogze0pwljtzkdlibvi3wfa14',
                receiverComponent: 'tvxrza6pj9iznoy4pzjrofyfgxtpu6jeqc8935ln0wnq4kkrtb5hov6dsl0ksak731ylr2zoijghlwfoguvu4saziz2e5czb1300ldkffl7w1v9hihuc93rj6idg0ff7xpbuer12psg8hsp5olkvuleypl6261ek',
                interfaceName: 'ec1ekvumhg2y7tw352hho5jlwic7j82816ce2o8yfsu93x37u0cuno4c0t5pi2j8j0xe5hs83bw28qyx0vshhm4qgq2v0suucth8ij1wpz5mf3r4r13gefakxabunh4lz1pkls9ekp1e56lxgyggfjugpsctczkl',
                interfaceNamespace: 'ydkcx9apumioywr89vbsw9vxsnc5rlsshf8r2ps78wb3brnb1mvj1uw09i596uaf6lmh60vp3th2azu9pjhbmaup2c0n8ckwxrp9j8oy9z8ks18zd3se2dkx1cs600hrsvstcb033kb5b7ayenmkd4a9v5zs7xyx',
                iflowName: '1j0b29w9txfdikyjs6dq0ks9fp7cttr8q9m0dha30kngr3ryaht72snsy130027tpcnleh9ebtslj2tts84xs7zycdggneue78njk5fsekpx0qmwzof6s2poxgl7pb96wf7by6rm34gbs13xpbliklnl5hx8rrky',
                responsibleUserAccount: 'lpg2h8i7l8hh3ex6upbc',
                lastChangeUserAccount: 'wscnk285s9mu9tw6d7pi',
                lastChangedAt: '2020-11-04 06:56:34',
                folderPath: 'ydsfora2s36bvv0lofgcqvao91f9m87t2ndujycytpvl5hp366xzcaohwok5kvn9ui5ujuwrsvjr0njhoxdlfjs0kfarp2oqed4zndtz0hhxdq7421it1n1a5n56c6hcmqrcznlnq2uczc7oq5kz2la0qzifglurg5ipun4c4icj4i2s6l942goybttpvgwu1osa03ocr3k3uwk5a3re9tefl14k75e7bds9qvy4wzyajae25lqjm4sesi6g395',
                description: 'y6zxxsl3fffypegklq0cfp106su7cuwa5feg01odlep00nroadn0ouhoiqpkmukjlljn4ed1rk5xylm1ozp5efl7ga0580au47l9jqc55k3rvrz4xhcuoqjudu1irwjoyzb5pw008nlmihte2tkkjh0bfkambqxsac5580v63umlkvmpukoviemb520e6wejulyrx6yp3z284asz3cbs606a2cd8zft3altcnrixv86x3cubyb4rpncgvdogr4v',
                application: 'scapjvyweuwrol1ie3bx1ve2c39laic7itea01r51u3xqjbutxnn3y3ivlw4',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: 'yej8hinpn1ls2ocdmkj30pu0qvdzt0ogn64v3ef5',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'a3q0un7m3w3q4vo81v3ci0m6vroizqzinskgi0lkah8j6nnllr',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'c71kgbt2hz2ssnid7149',
                version: 'skwied9pv1fjwo1aq3ak',
                scenario: '18wo1oewoc1uk2xx5ndfnldxgqgb6carw9alod5bwchaqqp8ggxcgyzhg3lk',
                party: 'dp5m79uztzvavw7th23hery7gwra5cgoqsj2d0ctyonemwtqt7kyjlp7hxhdg82vaoyrnk134txc2izqk67ek67xpynmmrjzrg0lgx56kpl3pop12gu14ldmm5nae9m608dvhudt01harlypldtydqw9byguat9f',
                receiverParty: 'jgvr7nsabel0hkv1born0emws0dw0gh7b4xpl5zfdzta4qrm4gsvzfwm8wex3tebh3y7nqgay1ibwo133hkz2k6y5l9zpkhj3w3on8qhma0scmkfq6dfiejhw3jqdhv8jc03xi5gyi9q2hzlc6y0i8nh77thhgpc',
                component: 'frkqvuivobpkygkr63k0e5jo48skleme2sskhcsl5rb1vuh6y47b3c54xc8jmiuekj28hzdrvtcew4lowzbyonl3k00ydrwxntt9f5d3gfieuo5xea2u60ct3mqcui2vtt4a7gqkr85cminami2ou0ee08yzpuha',
                receiverComponent: 'z2p0foc6ckeivnr3uqftybujk9fa2pexw7c1sjs17dj5p1wamdxf4yyskyv724kfiyfan7uljpr3kdnic7clxy7aiawtiksezoq3f1u076yz8kfvae8a3an4tgj8ulhfw5r34wcd0l1xu5w5il7xw5gv0qv3tfpxd',
                interfaceName: 'iugydjwag3mfg13hi09oqej4y8dctp3xt91uj3qoa6dlenstpsll27jzod4rxf0saw8sbdn50h0brwq4ejtmexn5j6ec2sykvjpzvevw3emrsxgqveqktlxrzbpywywerdlzxmu7m4e8zkp1jo6b08nnix7r6mki',
                interfaceNamespace: 'wp9rn73elyx740leb3or80odb57k7mvvq8dwcc2viik6l3ptpywniog3grkimncs2aat1ti6syl98tho0v09tvrbdcwv3inwnunw8k9ylkanysqr2q7uphdak3g605i7wf9xgf2jfi29s64t0g5xxxs9ua9hemrq',
                iflowName: 'sg3ghequmhdym21fjeoig1rntdx9rvc0f0114fsqw4z1bc4s4j4fhtoj0axra0nztnf76x0dt5cbxur1ue010ci1lorue572w9fgd09sp8gi13v1haxpn73wv1mzowjkmii637g7kntupryynsxqw6xeg9c46i93',
                responsibleUserAccount: '2r9grvvr4v7qzcgrm6pg',
                lastChangeUserAccount: 'kcqshothrencixdcmp6o',
                lastChangedAt: '2020-11-04 21:11:19',
                folderPath: 'vya0ufle46zjy15plj5jy1yq34wpdk4cr7yg8lget4shwc2936gu6dlh24322dm3klkh5nnchsopkaaaw56oga97yf0k5o2ezkv5rwzr5k50paurh5r07px6julp8z7jpm39ulxbrod60t35w34jplmj15u69uhl7a9i619m4h5ufnb3qnl4p4hl1sbzpf64fvxegdwb20ktopiigximgyccre4pyboexe6qh6umio0difkstt8jvlmnpe1gi1x',
                description: '3k5b2qthrvlfjxwzthovlzx90qcwemjl0alqcz23gj44at86hi389epm2t3ucn3xpwkg2rhtizcx033in66bid90y0g4iycq62cztrb9w3hetlryfsp9rkp4kbu6urviohm8vg5ifamad5tspxec21o0bwayvqbaioqcl1u53lt2y0mwzz6zm88zkv4p4izw5jatzny56kituroo4ve5wdkzjl2frdllalqfwa4vxzrx3nbsnidhtufeb7ghvu1',
                application: 'jzrgtjmi66slgh90xd7jdhl63rsfozl243ungwfjn7asu32u846a6fibwx9d',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: '6endeexszmquawd30qjxzvhtewiytu0vasamf7lw',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'qqpgt3ehjrglw6e7c4ut8lml1itoove318rzjjtya1207mh6mv',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'ywxdpek7aw8javhqdlry',
                version: '0oumcrpc3hbv0277tto2',
                scenario: 'j011ys0o0zkfkg9d40pgpauvt1wl6pl260opfl59wqugbfclqsv2ml20x5cx',
                party: 'fmce837w1hv7dk5t2bizktm8cvxqhh1herq9jni545fx991716ayudv9kp4e88f7ubvtpyaan7lw76e0x3uieugflh9ovy9klnjni06ist6bhfx95sm96nmq3wnbc6wmvhzfw6txarv3yxt3duig5yjray5981e3',
                receiverParty: 'k2s9q5yrqzqsri36srsiqtnqltdncvdq8wg46kcbawyucsni0chq7tddjackh6cwc9xiheees14g6g68i08h9jgrcub04sp35bnft8mvoquwmv66yyfrqreojpjpf03kubt83b659znekbwhaccapewa6pzjz7k4',
                component: '7iul8txg94ojsqme00w6uw3x8syt7pkzv9uxg1dos9sm8i0txp0xnjqxnt1ptokum856h07im4japdgbc0xbxac3sumahdeee61fo78evvlaw2m3gu3rk6vvblsxpn76gnc05uxqjzw8haolgii7wlyqs63aceyk',
                receiverComponent: '1yw4kxxfmsmnyplkrlya0b3h6lfs4e53mlvhcwlfb2oy9d0i9ep8qgpq72kibzog4xgqjykbibe4qsec3o4baav9dcj9jsn9c6ai4gucc3fuf028xfn3wi2gx9vook5d5ckd1vph8i1c1x78irctxa69y2au5r8d',
                interfaceName: 'oikp7xs03txuh0p0d1jgnjlif2gakq0idyrw38aztvdhp8vdrl3wcgirunbagirnmf0oqxpnb2yh8gtfm9k3prhqa5xdvj31gs87mhq5zs94ck44wkvl7s19znb9ox0sm32yzrs3818p6dxycd4nrsmdcojbr8edb',
                interfaceNamespace: 'qrjwbo6xcnjldbtk1jbtk0sz2gmyeho5oetpl2y14uzs0ms3g4wcioe7qzn032edjrmxy5stmzroieimfzzf02khfzmvnhkuqa1ct9sh9lppn0laesvw1254sk0exclcjx9l47xxc2uiydqelmtwygdyiy0g022n',
                iflowName: '8dti5ur0vftn3y8h2krlidcee52cnw1oremvc1eak6rpeawxar4u8d3k2kdkvdxrssyh8o9plood20ik412l9k4xhigobymfyy861b1f79rjdiebhek8b5bodn2j7rbw30aedc0s0z5otr3b82do3dufjomvsc4k',
                responsibleUserAccount: 'jo6ctermg2wt7hsw1cis',
                lastChangeUserAccount: '6x1tgj0ss2tqn9uemv82',
                lastChangedAt: '2020-11-04 06:02:56',
                folderPath: '81yjydtkx385z1v5pdju3rpe3cckqc5h9qlo2ycvrj3xagloyr3pn3arb76jpsrey4mnwgdco6ifkp89h1p2f1zupi1i8nuxyl1ari5yo0qds5yqkcs2xa04x4cg5of8tugupnhmzac1vukpfr6t20z2rn45tqw5vhi4zsh9ftdhyhlqt5689cj13ojcsdh0z6hh6yxvwgv7kplineqaak0r8ouh5jgjtfti76ns1lave3sz379141hah2hgpr1',
                description: 'k9yid7n4tujzpl0d24uk0nm0jwi55kxlsxd7dwgd4ylxo3he20o3r9jqf7ds78ll311erw96ln6e7lywt0lv2wgl6jv2206lkrqkc8tj61jer96nhqu7n0b01et2he87uleo9iudd4jfnkvou1fepxxolxu2dx9ia7xk1ehr6dgws1zfhvlvsm0pdyytklkhkcrt90tddpp12c0nir35a6chomuvf8zjhyz9qalaky8dcha1bgpr7n46esp309y',
                application: 'jk0f932fdtsp51netbvi8hubgv4st6odabslo5lqkywx5wv35fbipj1bbxzv',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: 'al9bko8ee8apac6uf368wanesazzano5zdms17zf',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'ynkdy2q8bzqpuh6qd89ou3vdqhlyk822ekfyaot485l5do1wd2',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'yqqvz7921eb7qydh2zd0',
                version: 'igk0ofr0uiczvh7i366i',
                scenario: 'bbtqvgmjbx6dswa0lrqnumvciw80deb21xzdct3rn9j18w43h4qwra4kldkc',
                party: 'ehi4p9rs757l3689ivluiszqs2scow04qab9xupur2qpwfqphdnb5lbtlk47exajrid7vg3e6hkwuh3igi51az294jzrired8bmwibyt8tzr88bktnhe05agcd1mwuxx3tq0pgrziwbib38tf6b3ftrlv8n4snro',
                receiverParty: 'b2w50hd6kdsp1tl87b9rbxn7qb85big7bmeayfttg7crxs7xmtg2fi4tloj0wjpnn8331nfv9ahc21mq3vodhyf3clg57ps7xcamrw3eu91hsh9cj126yhhe2pgom2unbg9mnl2ni0cp4rumee9jgdhznt9wk018',
                component: 'tmdv9gqmp4aa8xhl6lbvaydlvxawufzcep6e5o5tdjysgaa618nbrad6pvpb1o0ji5gyr1badwdgju7gqvkjcfc938ni22ip0651t3f6py7xjei7qostt5ouxjd32tm2k4ydju87kervrakl9opm51s83cs9oxaa',
                receiverComponent: 'xzgnlxq0zf5e75058s6ygyvpvz16enqtlu4yvreosus2iaxh2is3qcnvuipobajx6fs8q0sybtdk4vk436s1xox1nvyb6126xi4a0rgndkkvtr22nd6hhxz5lge5wwrnz876cxz0js8slkiu62pabsex2rgi2e2r',
                interfaceName: 'fb0oxxs0z8tec1ngy50gqccja7ikokpit46dopdvyjf0ahsa7t8b3k92kcvu4d18gzkr00x3hh35i1b617h60a2dkmnrea7ijmut1rhvom1av9xm21un654sdxbmjin0yf0hz8ztuxbrx98b9c1kmjmhko2k9okc',
                interfaceNamespace: 'dh6nkwc6fdrawvuw3qof1xqnfi3k7ut8lgt6yqyvgd6etclw4olpi6b877mio1dh1hpmkr3q75mor1qs995c8u1468jafsr28yiqb7c3gswqdjim0pnd3iarz3hg646uifin8w9ojgzac5eafdc8ppxzzp7k8n1ao',
                iflowName: '5jplp3jffqert5v7d469yg7ktcg2n4wz4vdiyo8930der3ek5lj7cvtyg7nq8uh9kq5wpjmm5l42abe9bj7ashpeygcqp2grzm5vr017ki9t7tdszw3ma07uvze4rz98cxsqqneh7gs19ngv6fsajr0rgeg06hgd',
                responsibleUserAccount: 'akci5pr09zpagg3vekh6',
                lastChangeUserAccount: 'lupdx3yh39iiaai3lrdw',
                lastChangedAt: '2020-11-04 22:19:54',
                folderPath: 'homdy1g5mf90pcowxlbj95javq6f15a84qxleq67no1irno2m3zn3bk9ou3clrfusjeuh5zfz1nbe2lrojeiyynct5tthjr8tvnb0b6lh5l09v1d0svdlsbdba3gyn6oiod9y7m1yp0u0durnaewjxt8s1uyoei9nlojjlkid9ioa74l3ulso2nlee5vs2y11ckid0fxrqs9m07511778789218zgcfhi23lfabmgs5qclt4gssgjxbze9ejmlm',
                description: '3s09yg2r9sd7hthbgiw98q0zaszlogelo269rrtbjhushbsnunqr20bwtgwhkg408mtc04ycy7vi4im4vnfomji01r8mo2b9m6iyoyetjsvc060i7elw4bpkg14ozya3ezolyy2rqcu0dpww6vklx1r13497k09y7dv9g3q5cdld5ma954y9qtgsqpt7s5wjcupaxdpyh1czjlpcphojgfh9t1rphm51cmfr56y2bqwdyyu3yha38v440a4f9e3',
                application: '4v5cxw93ktsnu1xrculdgdrzjefsyy13f9u22fozxz38ql0h2ztrvfvgytgj',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowIflowName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: '89po4rwdznccnhyou6tmgwoo5u3otuk1dmc02y52',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: '0ws92vw87qvnmboft4jb99aah4194bdek70shu5z905w27vt0b',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'a119avujr7ajqdtcnax6',
                version: 'id1sg8x80p4h4w9maxeu',
                scenario: '8nq5wm22u4lxng8kvyysjj6qcy30v60c8rgs7qtqt109c35evn3a3pfm3ndn',
                party: '6s8uyblgsfopttft9r4qdbfio1y2jeocs1joc2yt4be8biyvyqdsuf981x0fqoj8klne7z8iaznug34s1kbluzpo1kqll9xh83bga5no6db5qnxwox8uvxadmue0z25b1187vgbcprpgf0quc0e95a6rvgswt8xy',
                receiverParty: 'b4hui8hrcxescxrjbqt28aq8xd9peda4x3hu05fif51juwik9oo40vrlqfpyrf5pqz8q1g2y3kggpiadmcfwjk23rmash99x4vk2may6ppaulf5ky0lt4tbqlavwr1nu49skqq21w7fz701qht9hhd1rlwjlar19',
                component: 'affkz1d1mtvueek2jsxdv06a2g7w7eizulzsgfevdj2adn2e178wg78bln0cgs0u7cy8u0hezkkgbegcyxo6v8gsly5how62rxs2fnca2kb272bf5c75mqwhgenvbmre6toszvlh17c6crysofvtt5g7mqmbca7o',
                receiverComponent: '53d8yd025kwe5k31pgoiuuz2b7av2akddvoag599rx1h2fxgcg49667uslr7lxnco2qocf9x9wlh6u36uckuykzw4ks8k03t4lzvdu358cjvcfiqnb36ljtj4mxgak3jg3wuo4h7v9c0tji9q0ombb2h3r4oyt2f',
                interfaceName: '2ywmv2lra04kmvwpuhwk15phwuzmxmni43c7y64ere0438wvsk251wxp622cbgu4dj4950bde8nefy1wq6t5noh1e4fl00d9z0hz27xhnbscq9toot0jez8xc173pvt6nb00pemzlcz3uws7llkn7j5fu4z2a7nd',
                interfaceNamespace: '2mm1fay6h2fy6qzptyycfgzmw9vu6e7pc5gilk0cd1sjclq5xdxuo9b6rec9jdxyxss1qfo3ftcdenrlqouc87r3obpdxp2n51d3tk01mv7ugzr2mi71z66nadu344ktagz0lg1l0w0bhngxj8we5rs4yjgikx6k',
                iflowName: 'at6ky42jsss9j0846mqqrxahhp85s5yemiyfffx4owrtwhglvsmi1o4j9wlhp658getu85wgbkkw1jejdti496507sl58qdo4y2a9osqexebgdpfel2puj6p936gvaoqrwsdytx7etammvgq7pojgz9m7k02syufx',
                responsibleUserAccount: 'c8nrpzoxw7pen9lin0ys',
                lastChangeUserAccount: 'ldgyq0tids01oy0dhive',
                lastChangedAt: '2020-11-04 15:44:55',
                folderPath: 'ekao0cif92oy3ndygqqoui3ivjfnrkhe7ag4pz18of1ejv8yve3cry10qsnx1u4na1c2w36cmtdfgwzz7sxvex49gql5c8e5d46q1v4yrtnxz9ajx20jw8m6rjhjh6ulrcqwfcv6oddvukxsja0nskjzphrrh2kh9ahy3uqqi3mon4a30odexjmcbs2edgrcydxbolrmhrz38zz9etdny6a0pve0kby0o8vdy5bz21x42pxnsynnt4gyzphyyzk',
                description: 'ww121j0np90yoyzmlkc1bkwoanjvyz5wkqbcex7ebb5v8159lbqwjmdbahwugidg7w7vtdgsb4ur76f3d2uwvg85rw6og1gkjfm4rwmnpfq3p79oi270s45a22ijbrx81v5ukn7dvqwj6o14figbc9s14rrldycfcjj53ct61sjfik6kozksmlfpvljqmjthux1joih20jjwvyfx1ge20qf5zghp0jt7i0extuj1qwh5mb5yq0io534ixgzeczh',
                application: '4b0u47c3hx2uelf7q5q3xizahjuofrky71m13w9xsil2sghae7yg2venb103',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIflowName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowResponsibleUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: 'py1pa63irufasq83moqlalkrf4wz6qkaws73oaow',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: '5ly8zqbvvgineyxh6hcprtu3pkh09pd2btvnjkuxlutyogbl28',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: '5nsnwzm07065fd3w1wtq',
                version: '54vsz98vyf32a6t3y2q3',
                scenario: 'b33icly2ftguinr8hun7ytowyadzga2snejic37j8dua7vqpd7e4vhr40pt1',
                party: 'nypfh6lxnj6crf7ieo3yml2p52v87028x3t9tmtnong7vkgeertc8hg4tz0kvceho9f68qsvqtza9xhd8vz0o8nx54z4l1kfohajjqjc1x18j770kz686plpdzyfoeq85jw6uy2hrx9lgffbsjcii01aotsd7ppw',
                receiverParty: 'llt2ad2xgo8dpzkv6h56j1n3nbujeiskrhekn8d06vlsspo4i7m98zdf2uzf0g1k1ryd5wwto5wycgrjpp8lwq4rto8tvff1qvws9skylesq40nx8ujkxp81w6jnr77hxdodcdte0tjcoeuvuhw2o8q64mo545r0',
                component: '2aos3v6qswusysp0x5jvenxy6g51bkcq31pk0hrg81zffrcc52hmgrz0n6f80l1b5eo7u65gbgn2y6pn9bqjsgzdx0s8i1bpwq7vojif5rpvf5jr6nf92a8i2f6yin0m18ctzu65dyp6uw5a0nd755kt0m9c0qpl',
                receiverComponent: 'f2fb0j2oylfoosn5qklfmzzogagz94uv5ewdypxg07lfooqrt9o4ms0kezd8p9w9fymb7r833uexlrmsumoasew8ntsgceels5vl1ae64563lhiu2k19j1qzd67b80ky4q6fkr6ps4keuw4j0d6jg387ib5tj4jd',
                interfaceName: 'c3dyn38pdti8dwf4u6ryhbkzh60vp1j3hy8txavv4egxb2hjg99fdgm2kji68tdzrgzak02rvox2tiakspi072f0egq66y48u0de4hzga2yeic6rvw6q20qthkiu3vh107itm7jx9wjy5dvve4nx1osei4rk2kvx',
                interfaceNamespace: 'd2eay3qaknxsqegau18ft4vczj6zig13t47rsl0mrs4xnmuzdvdyxojmrhd961vifu5g9j4vfxo3wpxlgtl05f3e7tcnzi0nuankgiwbkcrr8442gwb3465fpml8lx6auray5xwam4jt811xx91dyibccbnzuqdu',
                iflowName: 'e1fxksi8criekg80xbhwkfgqm577k0wk5dxpmy6c7bmzelizisecahomg4srqggg7zi763bp11d1m7fi9hcocpr0dawhj8ssn1yun2zvpu23reslkor96etsaveicvssoah50klqv8uscybip4x618ul9965ojsy',
                responsibleUserAccount: 'ltsh3pmf9a02vjr0pyavp',
                lastChangeUserAccount: '4e3fkdime7tusukfink7',
                lastChangedAt: '2020-11-04 09:17:19',
                folderPath: 'z5onac1rgzzrt1f58mw27s1f7tthk1nun9bm81xpd7kav36qhcz87yw6zbsfbu1iroz6g5096j00tuslbhzmdcck49u66n1bjitsaerjfgz6rxgpqqzj0zjhaknunbl2wxlw753036k4oc2wjlxliypbije8unuk5qkorcl0m8kbif9zy1ovvn8s4jgoafjsb1ya4tunbyy0ta35p7zrijckes4hejyg93fmi89lwnbllq52kd9cwba4k4q26c7',
                description: 'mhulc4s54s8coo3qn3fdveiu5pnz9idjo2rha5yo2dx1usbrkbl9qlhcxhq55udft5miw4zm0zivpzjwmlhicevf8fyo6x3iznwqsekqzobgzx4hte12lufui76ofezzc0tmko7lj3mzar1m2qgv5lvotfpelxkxd48vod2ihee7mtzwv5c8huguuqk57d5vlq0phe8jevxalqs258wex3awfv8y50ung0y99f74p3sfkp4txezeuknf10lz5z6',
                application: 'foybscki5mqge1av0ppykaizf820bqghklxmfy067h4fe8ywkfwxzfy9mewe',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowResponsibleUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: 'w27s0k3h1o51yvyi2hlgqnf8lhwz15wjv9kvld9e',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: '7xoxssbc46vt4o2ppwrv3gbuxm1rspj6cwb18lnpytd2azhafa',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'wvufl8lih4k0k0k0gdif',
                version: 'ohkf5wypeep7m8xfam6x',
                scenario: 'io9puooc9xr023zacj737bdk0rk8fkx9pjzqsvk32wb8w5l8eff50eilgjao',
                party: 'u3s8jd4oywknjmest77i4guhn8l0g3wnf9k262vmwt57w1l2akgniaggo3m93wflaldk0xwlr0qww2hudx22alkkjp5mv6vx3t1kkl2dck146tl2ej8a3aunh7fkfeog1mcjwzjaqwv5ev8vejryhwt7wwlhupiw',
                receiverParty: 'id7arb15qh1ss3i8b6eqqmfcfdkzyzemrd2n8si8oyz0mcbpr1c6p61iozdd282mq01lmn2fjvlbwtk0ziu5c2byj4u3qohxc2hu5wjolqj33y7dzjomjidhv3q0zx5co4czz2db1msaqryg8hqlr0vy18haghhl',
                component: '5wv6xg3hjlfvsmo76j6lvyw7pg50kae2xyfqrzbsbsqgxgt4gcqzpvg1tekod94cpw2xwl3es4qn1ypds55smackry566l9s5df6y02upnjefsz3x48pl3iaiii4pruqdoboy062z9z7pt5jvpc6506aorduzfrf',
                receiverComponent: '6syny4b4uws75ov2uj92813sugt9mvx3e1rbjqz0ecaue1gna1f2hctnzfjhhnnjjrcz73cn0kh51ydfemkutfv2ynn9tuif55d5tizmkwfml4w6i2abg7ccrbwoq90qrhhkupvea0vv8529q5h3qh9u97ft87ei',
                interfaceName: '85rkw9ne91nvzkgv6aup0700dof7llha6rylmkdyzmkul8tv2doemgg494sl1w8x2pubm18s2norior2hy39dqahxeublmxqe03nq760obhwlmk8i3vf5iylqxcff5n3ye9n8qujiwpmqgusruby0klmiinq93js',
                interfaceNamespace: 'w9l7ik5iopvxa213ajv23yg4hnq72srw83oxfog4zsluhzra8ezy3zoeku6o89ltyydw2588tz10cjvlfckyb2zcgcsdhgyigzbigmio75fw5byyqoc13428v6bzedovzqtuxvqstmzp32aes78lpwmckvhfrhs7',
                iflowName: 'y9vf4sik06za9yw16ubmlxtozpn7x5wlmsja3rfw5kma1sdv92pw0xe1hgx57wszk9ek29fwt0268ol2upjx1vb25xb5klgipfeje5rd1q0xwid4a4usmna3hfg3b2se7p5oggojyekxl7x4hfggg6e6yk5s6cb1',
                responsibleUserAccount: 'ovkjalv5sw0w2n1f3w9l',
                lastChangeUserAccount: 's32dmtsgpldufyvzwsa7a',
                lastChangedAt: '2020-11-04 17:51:33',
                folderPath: 'wb6blnqfiwq6ykqu9tcxf3grn40py5uytl32sbausjgjsvlildja0ckoao5tmkoqodtyr1blhrf8hbktyrpp50ubpmje2on5fjx26y9gw4nh2rfjhojib45tylmo3cjsl4uy4wuf2n909r3yvigk060bb0n3xgzss0hu9s6ubokfilw55znq8odtc4ua0zmz1itprscjlxbx5dsxrlnsvhkl4mz7dtlf6udefj6p2h2fif258hopdeatd2ylbh9',
                description: 'q4cuvny4zp2rnu5z34qivgeanhftymtmxokwt1vj78cffn9vdthqnzuql4240jmlsprknnrgmqkju64hfxrivr5p1u4e00806kvfedlzqieagxig71jvuduedkqnnpquz6ybnwrgn74335jynf0uitazb9ca3oem2wml51ovy0oquqf35fsn92b4bzcqx47xp43nr1kk7dc49ep0frjzhb2lf1l209v8dkcxuevzw8c0iy7tazu17kmrd6m5u09',
                application: 'y6szpzu2r1wo3dr7e1y6juovyepbrxirzno6h11k8ffu1p0xapmylj96egum',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowFolderPath is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: 'yirh1mfbqoithm782xr6nwgysl1620eu3ipva3fa',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'vog8shs6ejnhsxfy0jgx95t7gjx8u9w7eljadry87jucnvavtn',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'nr18t6ucjr8ab7sselub',
                version: 'cjj8vgxjc7je2bufr327',
                scenario: 'lsaaqfsfx0ct8b11ztfrens38ckw1xz0sasxqk0kbqe1ouxb7gwfttp08r6d',
                party: 'fc80jx1fa1wb5hi3ehzig7mk0gr89y91nnwuijgz2h88w8driof1xia539daa3elpust8akz7b66he9jfk1q6a2fozcv9d9kfjz6fgrhwntbtp6m82bnjzyfgjvz4zq9j1w28quboulzeumo6kjypullx6d4t8uy',
                receiverParty: 'yducviq7z0dqaqd519k4r07x2txnlyoyd0x3wr98vvej3z43qti9kqpe6jobnbyfv1jfzu2efmzffxxggsdqf3z9ehlnvt5h44n5nyabu4tsiwe22wpfq8fv1h9ikrjpz0npbnsvl052hju0snb43xnla3j0v1yf',
                component: '1yn631k8cm2ar4bj2cf3ofy9erp6cjmkbmgnuccu9fwg512eluvgo8fqxuse6hi782qnvyljj2fsi4qoqyumq5g7qmwwyx3u1x5m6vuvdyun5ez9iznfd7qzn9fo9nfjw3eb6xl0fh9b6hj1gdsjckm9a4hn3ne9',
                receiverComponent: 'eytrv1k66jtchhmezf2es090j9ytquttkiz28951u8z0k6kgco5tnwo8m5z2cpg6gj3nzl348h5hr8dxvtj9lv9iz72x9k8xezlevtl3q86u45hmri6k8dm1q1fs4wes3q1f167vez5rzk5m0ceijqqslcwd1368',
                interfaceName: '1k4devynfccbnhrg630v5k52cpp5344k4259fvjvkhq57o4v163dt2shg0oa7t64p3ic4ibywsrksz9g1cwg4581gut3wv808sgm546kpp2rv3bxyapaezcd4lyzwxuf2p2xij0n08wl14dhd333u2rr4xdbx27w',
                interfaceNamespace: 'ibewa9p8izmg8l4qk8l6vp9wqu6iknvinxdldtrcbjg6f3hjc5bt7rxayeqxd0h0dsfisnjiz5bul15efgfcox07bpyo5883xixpjzauz4uu0eht85gwnarsmv0bufrosg9en6do6c3cawa4c02ifbtu5oxerxhb',
                iflowName: '6k9o5cqjkzx04arhra5msc5p4e4n72eigkftnqnbtvy8ltsl95gnz9hb4ni8rl7gz6k3epd6dckk7ueo9gakpie74qgpznbgv1z68d2dkz84koc2ebynfdm7tjutogdbwb9ave3os25vr3vswul60ipe6wtz6b8u',
                responsibleUserAccount: 'eskdcgguq74f76cjcbie',
                lastChangeUserAccount: 'rvzxunbnyets5rz69dja',
                lastChangedAt: '2020-11-04 20:24:15',
                folderPath: '94j7inifjs03u4e71yap5f5ruz53yh8idshx0vum4ok0qpsx52wejtp3h0mlonh6kfu7jvj5q7vge1be8wswc9dqrhrdh47noboveufqxu85okx6dbj73tr15iig1c8wd1y466xqxhgbpiy423fubx1yif7tnxb7m9osvgkq8qhocpts45swohemn2555vbx2ll14a74b50ilchl2apm8vd6qsn6j36zdcbqis5pfquambdsubt85htbrlu668xw',
                description: 'kku0tts87zgsewh3bgikv5g4e5tdkj8qlh1sccsc1zk4g1vqrf4sllhbuvsdjiu0bq03hffosjlc1pgkpvyy37s29rqph19i97u2jarp067dd1qac2ke4eah7tgt8raodj80k2phlo4k1plmrcfmyq36ffdgjkdtsynfiw5gjgj5a5cvgqw5xnzo1tz4oy0o8npoogs9cxqkuohgs7hn0cslou3t4mmtkau2aftootcfpu9g7hd98uvk9t6x9s8',
                application: '21qm5oy60ic7cv2hzx6f0pouuyotcjlayg4txadjzhk6jx4ovw4vqkx4jmht',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFolderPath is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowDescription is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: 'qcgg202wyc0vav5jb4dj1h85mn95sqarwfkwqgkz',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'gup4yjubxvx4a65qvd01mxvr1rt65lyven41clnllkkbgplwss',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'a1qhsy7nv3ibbo8xsoje',
                version: '8x7o1rlyc332pth4fo5u',
                scenario: '07asxvr2yjj4i4c1g76wrfpe348vpm6qrf43e82mrp80bblctyrglofwv0kc',
                party: '7d801gxmpct00rur2vfgepvtgqepcjgk5m4w24fb8webiw1rckcez9exfy9bftn743x062hj46w46dxlxxm3derpjv145492oj323cgm9olgfb3o7hkivw0rjklcnenibtsluij53q3307znvqcs038ggbgpajyp',
                receiverParty: '4v6t6wbpcbkbc8prhhiohif53wsskfv81f9jgmmvzc0k1eaxjhdvf1teu4c6qm4ykiiwm2z4ebitjn1tyi505ip3abgawg52brhyhc2cqh4b7a5gme49wmemrj674i0tt2v7wovlcdo6k39lwet3vuqrsk90fw5i',
                component: 'qvsvfi4bhjfunlxauj9128tzww5cbo9glaj1u9sq6zzvqkup1pqg2uv4369v6pmjenq1y4hem6cu72c39kgy6xibhzqjhc37tfvc0cegltg07t6gy8gyxktx48nfoqw7rpbfe5royjybd29zrfps13d150ecv71p',
                receiverComponent: '7z9qrnwlld3dmq2glscxdniou3pnqnpno03axmho1tje7hazk97xr3wfqyg02cb2nk7jfcy7k8zvzdtqo9frb8lo3hzwhhhlne8rwa703zoe4ybhye0wa6glmz9hr4ek8ujo70d6i3j8y45whdvrm47qafldk521',
                interfaceName: 'uebgzo19ohc1vfq1pvpwenevytk6d7sifpfq9wiosn037mh3l6yhgqniczl9gzz6q15ngtmelnm5ogpyu16te4dvlcf3uizota84en60yic5rt3ohr11w4y8z0in8ubh4m303oeyxs2k33pym6c8yae6isz29yuz',
                interfaceNamespace: 'm7og2xwaly2afjuk82sk19h7so7tpyrxv4pa0vrnkl8rvayoujuhumr399fcprklvk3fape2lnpu4qiuaecxq0oqgluv82gkdta2gnaph564er7gx1wpju9kp5xfrahxxioxi22z2l0iw6mfyaa2u8qs0kn2madr',
                iflowName: 'h8aqby51yuvcvfbvoc9k862bp8i76qc3vw8022hhxqpuz7tiywbsd77h2daw9v575gu8ts9ql8vpejkelyq2jwec6q6jlmjwx79gqmwx2g7b9xpb0lwdwdjdja2j8qaq8gc9bub19ay00jouehvxxztk67t6mqdh',
                responsibleUserAccount: '7rdx0svw5qv58fwhdqaa',
                lastChangeUserAccount: 'i7wbh9tx9y2t76s7ea2r',
                lastChangedAt: '2020-11-04 22:28:23',
                folderPath: 'nlw75i2zkfvim6apoaictykjvizlw30m9f5d7x74twxib9gsbmkbx036yf9oj5vg47bamp8oq31ok8p6maqf3xl23r9o4028mtwnejzbu5eps4dez0d62p2vtugr4tu4yffb9vs26bpf21t4e37mljrulav2v0frkvrrzha6hu6yifyz56a5v2j9b4kai1abiauqoo4ziw52xcnns4lb924bfpz3hw6sxuigdf803v2gcpc7jbwosxvzn5years',
                description: 'pci1o58z5gqbdwjw5a9fzz0qzi6c310z22qnrk24z3x28s2lqqkepwz81cx3vpolg0ksaghti1ypptfl0t9h2mgctnfxbxpzi9tgipeew0siuisnmfz9n2a1xxpex98sj8cz9rfiduj1k0b1o21xfmcan8zk0us1e4p8qeghe1i4nev52ju75ozhp3aiujz3qos7geq6lr28i6ch7ggbafx37wtkgkna3qobaga4iamee98hny9j5tamc1vj57w1',
                application: 'r9pvs2oyskl7wwpjraq10ucpgl04vh8fc7dpu7rqp1cucnttbmwgtib8i2a3',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowDescription is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowApplication is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: 'pp19jemyq2kc83pv0r9gk43vydforl0u5qbukkua',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: '80kvttqb9qvfig4t1ybvplae2qt5z3yddbrnwkpd96x1id01ra',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'x4j2rzbb8sjlmvn2sfrd',
                version: 'rxwi6l7ptplf7myz3twt',
                scenario: 'ry328ee79yb9bndlx16rs7so0vcb9ttgnhkck8dsvw6a018jbhb6uwbtjlfv',
                party: 'owtxkup13tyeelqbiyvci0d0etitswxvevewk2n00ohr1rp06m87fu3g0ltt2hec72ei9qt7wvvhqmcsyzhz2q67yxgw3w3wwjg9p0i66lcrnu95kf788k57l0lzfh6nme55yirwd7ftoxnse5i1zio53v3qo148',
                receiverParty: 'xbuttxvwjpbijtger2foh90ilyp7g6z4ad8sit8zi5bmfi0og4szvyde1nsr7cldfxplear7s5pp87vt9a3iwk0a80zoratt9w5p2cnfj5rdpnhlbotcrjhh7ann4f90fdr8b06n9jetzp88dp294cvegqy0xkbp',
                component: 'dv85bnht13vc36nrgph08jpm9wup4qsrtxx3n1hife2q9mxf0tj0fcvhiar9frgdhombkvto35fvcmjwbpah6w7uccvvggck8wl5fj0zxy76swoqvcark2ijg6iv8lnu44p0k2scfp695yik0p2ibdqingvwl7eq',
                receiverComponent: 'kh37s8375mz2ib6z74p3f8g5gzfpbv6chemq2przfvz666qzfu1aazi9lan7j5qq7t1pyz1ecf8gm6bc83fdl9naahqfat62u7l9hvhhtsqdyractxew254f21y2thqktx279u49vcq21zez3xio6lqoidg5qqay',
                interfaceName: '0mxxj7dqk8fp4j1ugikog7v8z3fwvjpo0c2yemo64951hcr54lkbbyhtha6ical2tlgk3wob92uvlh2xwwimjd1hdb7krwi0ug16geonurnafeyi0zd9o2gkps1da9o5j7rtta2qj08vnyp6be8qavdga2jplcbh',
                interfaceNamespace: 'ex3p05ak4qavn4k1ezvrp2de1ygt5txfiyyndyzl3sbwp0kx8ek1r7aiabo97r9tx020hsr8vbvuxk1u1a66lck1vyrqu6rwnflfpgt3k3cib6uynczwnih4kkf2xgv96b40dg23mcwvvd9yrwmg6a14yk01kabq',
                iflowName: 'gv9qaev6dyrogn3g96vj0ihz0dhdnoqakf9nock0ajs917zow60lwngyy78k232x1y8lg5lm9vqpc2u48u7qw7in5lh0ta54q6xg4i8hx81u64kiri3s2s3seqqkh1kon0wfmjic0p6v4amfg61keac6l3wnl8gg',
                responsibleUserAccount: 'di4zmf6aee1zikubkjdu',
                lastChangeUserAccount: '9yquq3ltrnyx7b5182l4',
                lastChangedAt: '2020-11-04 14:08:59',
                folderPath: 'uxej73mjtxz5i571cpar8mb0y41i9kkva34jk34wkq48o0rrp3fqn7n9dk97bbb791aqpwiol4vrv35otwb4forhpqot9f84d40nx59mvdbyrrwgayulgf36pkxlo87ye14f4h2h1g9me5odojamav23hk2s9zmyvi0j6eji0x8ocgywmk9ewpe60t4x87d2sllqgir3czy4dy1c7st6xcoq7ts88skm0q1w5em807q3p3nm4c22y3wnwaf4w0s',
                description: 'kanmx3frtcyn4nxjtz1jcgjcpbnaa4hpypme30mhuhwfrb3ugxxefk0w73ovj7347qbqd3cnjix9l17efmeft556mjyrt0dkceftzvpwtt8ovgvzbwo8wgkdwfen4fnh9m23qvksj2yqbx2pgi82ufoft4io1wfkgbqnxwqpol7wrcf64s143c36udzfsx5ho0qtb41lvw5qg0o9tq4xrm2x67ur1ylg76fwmcd7pohtelttagpwemszfgzz3vv',
                application: 'dkwc9edbeublobkauxcmcb3hs9f37gnxis12nan41c5jiotlelp6co0u1e7s8',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowApplication is too large, has a maximum length of 60');
            });
    });
    

    

    

    

    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowIsCritical has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: 'ps9f5u8m86w18fcf2ibm69wk84yirrj2y5ybl1r5',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'en7rzhlfuqzi8i7bhg2f3ihr33l9ai65w2b8t47ipzn86lgbav',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: '2cjvn0ucuaxj9tndfojx',
                version: 'sdftsmhpuyrhvivvasdk',
                scenario: '45f7j9ita9a47oxm8j6mbg8l9acjxrbhkfs4thz3ia4a019lgf89ioqwnkwh',
                party: '2uxhtcxofm5pgdw2jjkrb6538a9vy1e8zauym06si4geipq6iuqvmcm3s89n1qn6isvbpuo8k6f9ipvjtkq9stnyv1lbv3e4ii5vtraf07d46ydwt76cva1duiis7faazkt849cac4b0z3khaiclcormnoe7pte5',
                receiverParty: '4eo3znoa1utdku92m4ltvre8md8846l2bdiqohwn2g7va6uwwfj65oyvw3gzdmynk4t3g14ib9i6f6n8725vth3wkvfd5fjmtakuahzhx60s1mwsx5rwt35y3qp9g6rs2m923a4s8rpw886rbl9yj33eencio1fr',
                component: 'nbmherwx5awkmtirwh6gzxsys5i1uborjxfx1p6fdsd4aamc9gr12rxd8amptdtmgd4ien4nad4b5s25lipc3c7m8ibhxcynaxa48zmhqqyixox6zknrod1uwbzved71e3hqh4jfpc8bfw1bm74z09e7umgq0os6',
                receiverComponent: '5h140zeividjkfdjah46iht3gdjyww4kwt32mnoyma6g5qn16buc2pnnu5q7jtew3gtgobgo0ox3upyyrkiurwxcq0ruh01njydhm5qu3cqev6m3t09xojkh8pdukmnwj8vf13ewkq744lzb0j0aafx5z5a13714',
                interfaceName: 'e3oudeifrnfms1965sqe9hs83zs3rxgw2lcytevth2sk41sal2rjwo4zsxa12fsu2qdcz5g4nmsfpgvcw6c2sxsinryuou8i40w0uou3r4xfkto2nx1x0geyyl7whyon2fbf7bra1af3npdjyz2i0yby93ihw8hm',
                interfaceNamespace: '5d67kmjdrq0ccmqd9mo3dcg4odn3a5ucr7erml3o0sd5vv54ey0eiomt54vsa1rqvzei9t9rglhczey52rpeowaafevg4nwvgoqdltoshrgc2ayf01mq905famm1suqmffvo9hl2n7jcx7xdejhr5sq8727g50u7',
                iflowName: '6en668dkd2f15gzl6r4qxipbnla9y52ak9uc7ax4ojd18n6c0ijueu1ytc0sxa1zx2300riuigca9pztxgc20vrvbbevdet3eu44gwagj8opcan6j2ty5n24lluuohtkfvxfzka7j5cs3hm73p9q6abu48qoh3g5',
                responsibleUserAccount: '1izz4rew9p5724lkwpqf',
                lastChangeUserAccount: '7q700yuwpgxvfpkew5ju',
                lastChangedAt: '2020-11-03 23:18:21',
                folderPath: 'a4e4bfqxs7coed1zgdt8vfm2o873gx5hocvgtd3ausqqeks5i1j6t4edprasw5tu9eg6k9u8miqyrvkdkj779hsmuns4zaoeycmgttrogyqzqdqmib1t0jgs46uutcgl5w9zl3lysluj3omm38jk0zj8tpap2xcj86pw69e5kk7u430on4nd9t1bc75fpb1c4v37se35hsr1cwpp8fj1ie1fjwe9h0826yiyw7woeeg9szmrb3b5aw7u7nw8btq',
                description: '9214tm5nulyl223eifk2wmejwv5xx22fohuzbtzilw1ee821ot7xe5h99p8bcb277bgqhfzgkysqpf6ywv1us7l1hsa1ejx5028lo29did19sil13rp5bsldcqcxl4dtg0n5jgs2bsa7mgg76juq8y2tydrf06m4bh1yjt73v42gutwy8i6w4k0esz9xczjj2ma0ng7lahgr1ad85uti0sryylqjqixitle8k6fi3gpjkj5jhy94x01230x9u30',
                application: 'b8pbf5civiim7z1ed4x5ljfk79ugu6e61s04gdgwk77xsagnx9qvz4ef01fi',
                isCritical: 'true',
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical has to be a boolean value');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowIsComplex has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: 'qna53mc9m9cuc1hwk2sb7wohdm4go4yrz473br8j',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: '165ztn645odj32bj5sskokmm8178vyuh1g3h9jkgh7ltf8cmzi',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: 'a364ka9uqpwjo06trgld',
                version: 'j0m5bw0u23vlquc7ohiy',
                scenario: '2degps1myrbuc2uujbihjakoa09n3ibhloxqbb02kcm4lxyncxm2xlasmgnz',
                party: 'odtkj0yi4f85crdqdrlhpl3zsdy4vqmnr7nu5129upm58ogakwrt884pfzzjfnihs4lcux450uuymif6gumsgr3k26vddh30l4f19nthnit52lnt9w07m963z6qfq7lc8p5912csynnwc4o47bxh45rdg55y8i6v',
                receiverParty: 'ky3v32mylozs0blzcurus0u0w9a5c4plrlwb6ae14ch6m2efkzgoq66zplpimgfbkjokohuhuw405d6enmmeg2xs4575t6s96kky69cx27jk11hl8g8fyugp5km0oog290zmjzv7kcdklzt30ul5e97p4pbcgeqt',
                component: '2k1xkxw7bzivn7tbhc9yu717yllm3pl65s3e8u2g908ig4pt795m4q2jr1n0n8qir1dmfdhjz8uifxzaqdcqj529tjzltwl596l1jsneb34d9lp0hsn8fm6ak27safkcdbmyt77aypoa65ntgxqgtb0wl8m5fkiu',
                receiverComponent: '7k4cc1zzdzqq9iyphvjeko5fwcezne6rxbdp6lwfayxu46wao6hdhslom8s1s5rdb7s0rze0vujhniuww6lx1v3r8ef47alemrbd78hjedn6e1jhlgbbl2ex80294dk41npnvn4416dxh8ox2wq9dhctfmf9e3dj',
                interfaceName: 'h69fjn7qudmelixe81hp9cofigxmhqm7em26vhlz3t63b93dam8zamsu9rmobpng3tu1k4gdlekkvkifjbc5jr6zqjlxdcegrujsc19fb24268z24s6kfgkt93t5fy26djkge0xzk736inxd01pw1wt8f1krwk1o',
                interfaceNamespace: 'bwi8jy0d7cobjw3460b2svf7np4vjryw2jo6kxv7ju14nj91f0ssh42sml8ss22nlxkd8mb26vneo2bacza1fx9s57pc71rfb8860yeb8qhu73vqpm0v9codbv4yplq3938rfkmi6mr4c3sg9uea0gth3myxg1pm',
                iflowName: 'fksp40uwfwgvrl64afa4vjzzi41hgmi11gx1a784tcrkaxpnd4suh7yc84jurdyxn3r1uy3oqhpyy0w51okntctp2k4xvdcsk3r7nn0mzzngeyip568wj2zrky81exioumcydsmp0h7veoy1emchl4qpjvq92rs9',
                responsibleUserAccount: 'quqvi24h3rs15l7rosaw',
                lastChangeUserAccount: 'hgohmtl1s2lwme8dtsom',
                lastChangedAt: '2020-11-04 17:41:41',
                folderPath: 'noidk1vym5sth0qs7kv74d66rm59uf07v7vwkzku5uq3hk71o9w5nw6y1ipi92e94ihvf1ulry4jmdcyixnjwvsdy296jyr0esugy081t6biskx6w19rwt1sommgt18skjvbuq5nf495c266rrkffq8ho8lmdkofmok8q06xp7w27wc10er2dsx7urcerubs665x0ibe9yhx9377zpmowwd5w35u9hft3lf82htbrla34k0a0m20hidqgl7t3hb',
                description: 'n2hp0g0neggutz1ygr5ww00x7zg531ntx4x5x2zhmn5rp5za7wij1ouwn57mmzlray312geomhpgmyhqwwy1eyewgrx418hdqhr8ty1v623w81mysxgzea8gmx861ojq2wly84k9cgrf17dg6xpmwb9pwhr2vry7rijg16jxzl188596yvsf7w3icq9yx7n8pb627nwiodema0ct3wur05r7oaak4s5s4upkyuztvwsp1taf1zt2pcq0gx8e523',
                application: 'i5puc9b5uwvye3i5qzoarvu1fnn0zj4tilgg7ur27vod98kletapvehzw3wg',
                isCritical: false,
                isComplex: 'true',
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex has to be a boolean value');
            });
    });
    

    

    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: 'nu6w3ims8c7n54knj9s0g1ckz2t5u3wluml8wbrs',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'rff7a1igpp362vwd1s0r7tkgf8tszdomg8v6f9wm6epibkenak',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: '6blfnpsuhbfqs9i2474o',
                version: 'jg616r3lu9941x2j3smv',
                scenario: '1ex8gedvlyxqx3g5parflkjra3c1b02fjwi15sfwes7bfd3jvuiive4b8m9h',
                party: 'oamumopd44cm2365u7o89iqj0joaqw0appnp6bh20xeu8q9c0ss6gqreuw47h37ngkp0kfo30p4sa300htlxxa7qiabyu1nju8n5qyjnjb3hw8y5h6isariqavhn1osxqmhqnd6uatzymekzay8gzomw4nd7gbuf',
                receiverParty: 'fug4j5sp2qor7xpz8gc83ui1x0hcr1p9unzhppev91s9xt6vlpzbp4xlmcxgon9holfeimev9cn0qtl78v4wfo7tnx5dnf7pkpgf1iqe3d8y2a4de5u88djsm1916tbxoasigggf6rzef555t8air897cijmotcd',
                component: 'vtfo6badwostoqbigwvenm3xwiw1aoumvj96se21vh39896vkm8q56q6ha2x92px5ds6tivh0da305gk8hgmqlnbu8pidopor24r4h91g82kmvo71f2lz0n1puc61xc74w0m1u79mlsiac1p1650v6w1ujoxcsvc',
                receiverComponent: 'zkma1m09sopy9u2y2g0zzkkc66mx98b9xhwj68w2wbhx00cxyz0rqnabmmr4fwc5izl3w41mifqrqkbvarhoxx6dy5fx9azkh89x8y87hv3kak2aw6v3wdgdi8e7cz4p3lxjevdgu5ctxde0dtx210kf1k20l44m',
                interfaceName: 'us9dnraej46ey9m5vte1jipfkd6rm2z7dweshfyxv80a9cj2nthuodxzq5tznq1g5w2vupwz7lzp4rkfn27asjssuqaq70cl9dxutxovp6dxhh0w4srwvnpstfrxecl8mdojdxaosyeiraqwi8mjvbpd8u6bkqhb',
                interfaceNamespace: 'jemeturiuy31tqklikbhajk9q7vxrk1y3wbq3kxu8sq06khad5qte69ky157821hj5mqv6qc6adiy1w4d1xz6ierzdi8d1hi78rserd72e8fr6aj1i7o0fky72j90gqmsxpo2xp9cjkwogc7dfd73vn6r2uz6la9',
                iflowName: '5fos2t0appwcsmn3m1deya885pg789w77zcows26me7t55cp4l57y5e67jjksiys82dr5ta4fwzxjx6ftml526ksowrpvn97hq0mdm6qtm3bgt7c7awemdwzy2aseyigh8eakpf8a8qxerdmoix5s2xhml4gjsmm',
                responsibleUserAccount: 'wts2aaa7v37bigwkcc7x',
                lastChangeUserAccount: '5teeuxpiubpvn7c33jv0',
                lastChangedAt: 'XXXXXXXX',
                folderPath: 'jn6j83v8v3uxicjdh251rudwr1ef4uyx9vmp28ql92ogxp487p7v245ivlkk3x9s94b5dp9km51hyx7gadh5ks918uadutdvso4pri20i7gi9mbcmwh8cwapagilf0s8mvkuwv0v87glh3nsof2e3s6fxu8pewpwh97283kn1ctepcgkbaes6so6kim9fkvio58hbissdnp20cfvx6ng770hzk0ytpg4z3ufcfesgxwotbt4fe166jyah8nm0hk',
                description: '59h864m4q0kvgleppxq73fkrh7y58v0yme1oin155o5fgtr4fiv3l2627c77shde3uk0bpmzbac8kiu42bvyxr3o52hayksgrz6fz4dge26y0iu8hfvt33z9oiqsdw8dccvbb4e5lx0bgqqevzied17ad8fc050zm1g8501i1dyvepjqekiyu4r3vyayb2i8tfqx59p839xomjpcbfw01by2ijnk6ish7t0gczz4otbqcyh4e9x0e66wj70odtt',
                application: 'joadhf78xx5gy6cwyy3kyd391ejq3fo7f965z96cl7eld0qypyg7kde3cb37',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangedAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/flow`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: 'kmqmfjd69cyl58p5d23vgwju6weye13gdhpd7tl8',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: '5osp1pw9mi58182ry7g3j35ysyq74ka976y3dgq793jydhb126',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: '3f8f2z72rbvmmwv496f6',
                version: 'oga0u266mhm5w2n9lozu',
                scenario: '2ixozrtyyb96mtg9bt75df84izwa91rxwx16afcu9c7bq7uabkrt4iye5v26',
                party: 'gxq5740z39889dkxyap64kw5fn5irnvrmoet7wskuw67oed9h0gkq8kxmsc4lgiyxv6t5whzretu1kq600kezitzokgjgi5szc2dygdzujazo7t3rjk9ru6hea8lkchhvzv2m66wtoxrjrtiyelrxm5bu94nvmrr',
                receiverParty: '2ccnb36ysuc7l7ybrfofr1d8mfnr8jel8gbey0i7xna4c6hixtum9cuchau0vaxawchg7oth07tvtmyx9gvwxzm0fvb6jvn6a1ojh47pfad63xet8nk6cysdtc8s3et8xcv871g5664czkt5r0iyrfxafc2oyrq9',
                component: '8r41a8ikqdfvk5bolgb7zyj17tbvle4wl88y10ej09c8nq9xrvrggb5vcdzaalg8vefuw857gfe0uqnbfx0ngxkm2qvaumbmayzzxk5g1dqtqcfh6c1p06owbh2nzjcnwicfa59puqxajwvbuuiv27pj6ouqazxx',
                receiverComponent: 'g94a3ohv4gas80imvljf2ls34ausctihqock9qkg602yneda8heji0klarhharawfkfd4zmyljwroa04lb7ymtvsnc1ocv10f5i4e44h20u0lc5h3n6n1m850b9gr1k1t7s43zv7fk2mhnpg8848kf9qcavvxzah',
                interfaceName: '6albk9cd7viuani8jh0wkqmdph0rpn9jyhqqsbbdq5vzwa9kf30ba9jjkesjc81gv4askau9oyvqzln2d1i2vo52qrrz5rzfe3tgm7i0mod4fqqdt37bm1j30a2ho95nuctl78pca2427mbqj39t9d8exprikssu',
                interfaceNamespace: 'uipc18rjsxuul4nt0ecqy8cds8tv0sa26mprji57fj2iajzby24bw3dmwsgkgkuwqmkkza7oefomzfii3alzeapi9fha1z2gbvuweo5j9uy0ye2j774eizayvqr38nhlzprvvbcx1wmc589v1rkwb884qgr49yx0',
                iflowName: 'x3ol2hkvls498kgotfp6odb1qykdiknv11fdeb5hbd8q0s7l9m4zfour64ezdhwdqjjxnbt2cq38er892ku1pss6ajzykba3tkl9bpo91m51fg67c69mgzhfwnij5ql40upn8djbe54dreplklil3cpjgtxrntax',
                responsibleUserAccount: '679ehri3s673nc7a2h79',
                lastChangeUserAccount: 'evmp5bp41x16fiouwyyj',
                lastChangedAt: '2020-11-04 22:58:06',
                folderPath: '6ucutcykvuolzaj3yta6x9yuqiti7bvvotusvsepkcst1a4zi0i2hfvpcqq144jl5du6wjtjmscdct9l510typhk3s9x5rmztbuskovwbhwo7nxla7jyl8nk59bh1v3tmhu39c6f7qerogoiihffuuc7498p6efisein6yebvoe17wqvvscdhfmwz2zibts5slj30sxx69bpzj7a5006p0qzgpf0y7j162rxsp8e3by8697pswuqgbjsfxg2600',
                description: '1o8k4db6ynb43xx94opjb86t321ldkfwpbjdiy3bm91oq0iilplmjbberjv8xv5hpynj1ntvtddipxp0g9wikp95xbnieid3s0yg4arm989ulpuoearxh4iwe1vxyk9wgs0ioevd18lewbr7z1qb6ryy001gdtb6oxb1gq4wrn0jzh6p0lh3a934xip7ivrdptj9p5gne8xii2yzvpkikmwz7jqvnjagwoset8lq1ydezoz7jcd6eso1yd460t6',
                application: 'vrgj9fr6ejwy8x4q74sjjvaza1v2j0qjn59stfib0gsnt9gqk20p37lmhv3g',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET cci/flows/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/flows/paginate')
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

    test(`/REST:GET cci/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'db401faa-7ee3-452b-94e1-2f7236fdbb93'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/flow`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '9dde6c0c-86ab-4591-b238-775cdd58e9da'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '9dde6c0c-86ab-4591-b238-775cdd58e9da'));
    });

    test(`/REST:GET cci/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/flow/920b6c6a-a614-4b4d-94a9-ab073bdc9bc5')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/flow/9dde6c0c-86ab-4591-b238-775cdd58e9da')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9dde6c0c-86ab-4591-b238-775cdd58e9da'));
    });

    test(`/REST:GET cci/flows`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/flows')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: '4d85fc06-25dd-4ffd-b78f-064ebb499c92',
                hash: 'g0ctqhldlu11boldoforfz9j9bbh2q8u83a3sufv',
                tenantId: '4ea1ef08-6180-4cdb-9ced-ddeb97514436',
                tenantCode: 'gnndd1tsgfjidshar41o181388bjebvnf12n5k1tiyyz70eahx',
                systemId: 'd2f7b39c-f781-4c81-b615-6a25d035be78',
                systemName: 'sureihratnorxujp32o9',
                version: 'whf74d9b58pmu4cnvzf3',
                scenario: 'ev4iiva94nief8g3bpjubhsmi4drx5pfarw485o4clznjgalsgln5g6v49gm',
                party: '2bknnmyv6sm60973y5sqefxqa3wp4xgpebww12g46ad0iuj0gy0n8nxiy880ib8kr7wk3w19h4jh46qlrdksboy65u9umuuh0e6iz2cqcidpaycpac5ehific36bu7nb48f40nmewct0yip4urul0x2tv00vpxvv',
                receiverParty: 'aj4h4inbrbibe9xirdlagn5jqp1uk4k6ar10rd8vyd5whpgx9dimckqtau4elnijyd9vg9zhjwp8wnq13dh9dw40o1ifyvnlcch0qkha0tpbpa0byp0n0pygcw35re1rcj6wg3geh9t9h8gqqzy1cx2sjersijxn',
                component: 'mh31p8t4kvevtlir0pv528hcj0f3jhkvexm3kegl4hgjpnksphlkohhvsmxfupgu18zd12x00ykl355dhgnfrl0x1sq9xvqlp55zqape5udwzq8t4n2qi8murbd39ii9bkyt6mrhfln2wofstz1m7oe0pfcxxi5t',
                receiverComponent: '90drxpsx7ieot4nffuy4k9yf6uiv37x8lgbk58z4qwps3jhrhphv0wdp5cc9hm9h15ecjxy1llf6yxaf3l7xo0vd9vus8ufy8bsgyb7e6aqemcely4zmhkj2dvms1nsc60laj031tt1t2t2afkrceefx6dexkr4n',
                interfaceName: '6syulamzd9nk073ezqv3lq57kse4176j5l25u2r9d164h5p8idl4uqpaf0to3kkfxzcsfuodpszcs9bui5961qjmfsbu7hg3kmelpnqd3iufa2bj5slwjwdwrryfq0c7yg0q90viuuek7szbu86eydssmriz52y4',
                interfaceNamespace: 'bfwie32436ef54ldiq07epx7v0um1adxf6wtx04enh676pp7iupghqq38gpweffbgb18um5mifewl316juf5auypm8tj1zissy2e9v6y3qxn582ubt0dcaruh26chf6442x3pxzgqco66hitp5uvy9npwmlvlwch',
                iflowName: 'cjs3f3y938n3zopuuyeyltgats22z5uqfji487e5oe7kstp09i80lgs8o9863986xgiqq0rgyngg8iivc9s5okmgmdrcy7t0cumb1lb6ifbnlxjbqvixz36p4xbmgyacmqbcucwkhkyeasxe85xkp0ve372cftb9',
                responsibleUserAccount: 'rgynvn3bzg9hmfm2rt2v',
                lastChangeUserAccount: 'd95wg7aiecx18dah02z4',
                lastChangedAt: '2020-11-04 02:09:23',
                folderPath: 'ojy0n7u357o18v63dshasoq2inx7kh6hzgk8d5kzlhqkjpe2lj7e8k2dosvu04xyx62va3bbb79ew9v3rla5e911z01hd85bbsldk88es6mqfg7i7ubb1c26f47fct052acy6cw6vdtzwu1wlqikfbnivizlqxomut267pskqgkzjrn630yi7kq44hemdzu3plbj78pgupve8o90sulocxmpqpqi3dsbon0iu15jjjt635phequu4x2mvssbl5x',
                description: 'f6l9uhiu4a7naf42la9nmlf97xv09j3f6qnwwtt1w8d7smkzki35jt4ceak093ir49pib9b0x1i3dughkob7fzyxzs2o36smwbxh805gbumha4murmehuxtm4ksd4b9954powm2jygmwb1sr8eem1c1ky3ksvf7sxdo60ccovn5hrv12kjr8nq30jsr3ffn51nqoxoq6dsj8kn6nsq43cothwomqgzzdqbki8p7zdmoa1x5qnqejsxac60ax1zm',
                application: 'pxpthf32mied9x5xi79j21qg1h0qketd15tkqxjg1g3c6c1z9erv5tzti3lk',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'af7a4fcf-9911-444d-85da-90e1903e2b32',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT cci/flow`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                hash: 'wcwy0jbfohe81iwu89eg95g0cr14my154bhy3061',
                tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                tenantCode: 'k89l56wtd0n4hn1rfgws83oj538ik8eay2iqg022273fjnpbv3',
                systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                systemName: '9zontou4ydc3p8kabswm',
                version: 'qbu2fv6iyarshry1v6n8',
                scenario: 'fy8q3zgqkfidqqzwm66yux28msjhadqm8vkymsub8h51gvizzoqdm5p64rvj',
                party: '2dmqoz7ucmnk52klzk84gmyp8qdvvax66q26dl7gmxbx2tjh8rudb0b6a72atkk07y5o9hc2k9k63qtts98y7rmroqr9j62vohbge4gu6hgl5l4agjurwnapdakjg5nucql6fwmczr7hn9owljjqx2yk5cgnwsln',
                receiverParty: 'y7n7vs3pklsf285d662wxyh4ce23w5iaaj78gr0fruuv2jhnbcxgl737oec79s9fiqre80cxd2all8wbv35cv7yujj6xji2wdmarmzm78st9pftxrroxzztltki88neutynn4dmk1r787b04fj0g1bdzu2a64o6p',
                component: 'e2pfvh4dg4ywt6cgvi7odb6pi0748lr1z8ojwlonhmu6k7ojz2zp4psdmira35mg9kb6kbmxn7m1jwwzg90rc8yugr56pgksxer0sv3ypr7icy0y1u7bm8msd7te79yh13c4zepycx4podbbm6j4rcvt8ou7xdtd',
                receiverComponent: 'ywq1l63p7vzvtfrm4ibyqr7ndbjtsr5gxtznp4y2cj3vafjdbbxpm12zjwbzj56j1o58o6bacnf09ezrphlto26nd9vc7dyze7t3f66sf6vjmev7usaybjh40vhj0y79pummsjohj4r36otory4fvb6mg5abe9pc',
                interfaceName: 'cboopnan8ct4mqkfms2tcymhq81vc8nilbhnhe06o1xc0c3m8znqngyd2mas6bktld8gxdgl4tlj6e61idxez4poecwq53eckf0tnl0ltm05z54vl75koxt1zr85j47ul15zsfsn44jb0q09dzqkcydfn5tlzvf1',
                interfaceNamespace: 'gcbjhs5dawzop17scjqeawgt5916n84vc2rgto2sqjdihksiuj5grgkan1qp88w9db6mycgh3x3ee19qs23j646r43wwmpoo1pnelo6stgez7lg94ghez9ixvqtctgwnbt3pk0ps11v6gajgijc3gy4jmq7xmbg0',
                iflowName: 'd4z2t3w756ngbvj2eblz2x9o0gvmt7rkyb6mu4zqeriqhdkjkkmjw1djuvqdzx9v0qf4qo05608ejo5nqf6qs3r1fkm5p2np22t7f0ufvw7ervmhl5onjr9dq3x4ewnrbzeatjqjijwd3cln55935ean88hstgvu',
                responsibleUserAccount: 'lwlly7864v01udhp6agx',
                lastChangeUserAccount: '0uk3a9yjyrdgd94htr6m',
                lastChangedAt: '2020-11-04 04:33:24',
                folderPath: 'cfhzlctl2eq5473gjmxt42d39b4ey641gsh53sixmaygxfn0ebceqstt8zm0cvydqq4yg2yz54zbe1cap95pmgfxqa91fnye8bj7pny0le9dokjcr3sxehsdpvnowp6ekygkwu9mcm1s0wqt3f8u9grh4vbwscxkalawy613gvhxhyxxez3qb1xueqbll4crvcmphso8bsu8gjd71cnw4i7mgxjibdi3sqrjp0u54z6kpxc30yd2z6grgb229jw',
                description: 'wm29peq6i5ggsv121db29mq68bekpppjke85r2t4x6rex7amii3hvbn13rtrboxlw7j2gdyiirhie77txcqlj6vu26z2bzh67nqmf3squ05fw1i1z6gq6lx5jsx9ezsvkv2yqdlfoq1ho87kt7h99hi7e4jzqypoypsoqs8wppckdxorejwesfh1j00pumds916iwezbapiwqrqinzz96jxug1pssdpwo4eyusgfrp61xgo84hwuu89d9puh5iq',
                application: '1azjappy3k6aup43h28v6sz2ln6ekqe3u7woa2y48tnsw006kaz59k4b20vo',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9dde6c0c-86ab-4591-b238-775cdd58e9da'));
    });

    test(`/REST:DELETE cci/flow/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/flow/588ef419-e0a5-4bbd-801a-cb23e0af6e52')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/flow/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/flow/9dde6c0c-86ab-4591-b238-775cdd58e9da')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateFlow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateFlowInput!)
                    {
                        cciCreateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
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

    test(`/GraphQL cciCreateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateFlowInput!)
                    {
                        cciCreateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'eeecb842-b9e8-4778-b4f3-6c5a1cb86417',
                        hash: 'xp6zeg1h6m7csm8pam4hyayqiog5aw0wv6obthvg',
                        tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                        tenantCode: 'wo91alj2w5nu7ton19217sjcsg6i3i7tymf2faqi6v7rhae2gx',
                        systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                        systemName: 'n776vr4ab19fjhapu1rf',
                        version: '6l43s9mn88saphnpqwb8',
                        scenario: 'u74280qpszp2m2b2w6agmxv729y8ge0h4kamtes3wraufo36wax8rju2jcqg',
                        party: '0ya0dmhxztar8z5rp03lstvqj6wig6doe2jim154g6jfc653abzw82c7qbhv3jm7ky9eevrvblfquyeb1x48z551solxmxbc08362vwggfncm4gfj3p3pju79n95ckcsgxicwzvgimp9z10b5e3ford3d5xw3jgq',
                        receiverParty: '2fsoz4n0nteyig7q991b7ur3mc70v3vfdx2ip7rt8fyo63aiu3f9zte0sl26gq4e1pohzuvxb26qh17u9debe9cgp9r5hn7j7e23xje29fd0og4r7vyn5ya4k1f9by2qsvfcgvnd4dno1ttm1lajppdyq9qhvpsh',
                        component: 'g9m5pulphq6jmozkiianjn2z9ixo3fpk0h2s2tmqfp9vzuk35hcryp6o8nzwwsx90sg17u163rs4kuyavjsh383fe723b2ybfut92h43dlw8fg2qzz1z11zqasm71pmtjcw477eu3y5m2929lz1br80fxasaht2p',
                        receiverComponent: 'ld1i2d1rqclqbdoqak10bcvvld7w746iz1jokn98k8387ttaruh2bdv7qk9xghakxxxbx4b0eqfn3tq9r076r7scopgqi7w6qffwr2gers5abuzfyzhtnc0ul662uzsql9lmpr8qp8ce5d10vkx0fb6d0aw14jpq',
                        interfaceName: 'np66wvzl41joiotfi71thqzm64ltp75phj2r4ualnw49z1t3lcyk30a851cz4yhmxobwjejpokfuuqrniq49t88j8xgv45x737s67i38xtyarzkwyo3kp3sruwbri9qqgjb955e694n82yoh8ev0abebztdudkdk',
                        interfaceNamespace: 'apt8r9of6nyc2ypwa9u2m7pyqzh6wriq0dev6agyo40f63ppzzh28zpmwuq69rdpmt365hddxi6243bz614lyq6v3iwvu8lxnhx7svhp8rni9hzn2bq0cpxuo3bcttph2878yaxgvooplii2ff7nayzhiav36rlt',
                        iflowName: 'm429ke7t30u8zh4zphcqcv742px5r26b19mipnvebyc39x1j5ydjhw5vgjbsth2xk4vy3sazpueynor8rz0j3cqmxegqrosngzsk36r8pmbuauhe436k6k5u45w0kdd5qyfu8ahnv20rata42sl0l1kqziafrlk0',
                        responsibleUserAccount: 'tdv3w2yazh3w6yq8vpl6',
                        lastChangeUserAccount: '59bi7ootb9nac27q3re0',
                        lastChangedAt: '2020-11-04 02:43:26',
                        folderPath: '0844co8k4u3yfuwaamxb3xmtye2du96ouwr2h0yn9odyi0duypo0f2yaabkynguq2lpvfqmarq79pdpozq9yquyfg2mgg1oyq9sfv5lb70xmvlnrv4e0pyicsb1hi7xw6j6g8st0x4b38rpdga6sxl9f37gie45su5y3al2sma3jkcokv4jpqtzm1hseevfl2ubtimuvrjx9dsehqbfyrgsmkjxgebtcu1133kgcqzbpp0a8beress07h85to3b',
                        description: 'wm9ybhiuikwpqllmrsuhan9tmsun8c027h8uy10ghcd4q6po7mbe3314admpy4u5gy863138tbb1y1hfx6wqt2co6mphzltijv2nhleh8diz6li03b7zwms7c8k3ebdtxsb9vr7jilsgkrsna90v5cwor8u27zguki5vo8wkxl9zv0mpn4xbsa70n3gyv2s8z4zxyc2r117em5p3nsofmbip10i2kkzgy5bzd82kueo63rig6hxnjht33w8xb47',
                        application: 'au45bpycumg4rg0lw6c66qt17s6nwg6nw84yu2s42dflg9x665tjs3j0cjrh',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateFlow).toHaveProperty('id', 'eeecb842-b9e8-4778-b4f3-6c5a1cb86417');
            });
    });

    test(`/GraphQL cciPaginateFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateFlows (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateFlows.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateFlows.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateFlows.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindFlow (query:$query)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
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
                            id: 'ba03983d-b47c-463c-ab89-beb988cf5e58'
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

    test(`/GraphQL cciFindFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindFlow (query:$query)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
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
                            id: '9dde6c0c-86ab-4591-b238-775cdd58e9da'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindFlow.id).toStrictEqual('9dde6c0c-86ab-4591-b238-775cdd58e9da');
            });
    });

    test(`/GraphQL cciFindFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'be761cea-1818-425b-a424-ba0fd3643f16'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9dde6c0c-86ab-4591-b238-775cdd58e9da'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindFlowById.id).toStrictEqual('9dde6c0c-86ab-4591-b238-775cdd58e9da');
            });
    });

    test(`/GraphQL cciGetFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetFlows (query:$query)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
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
                for (const [index, value] of res.body.data.cciGetFlows.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateFlowInput!)
                    {
                        cciUpdateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '55f19dd1-3530-472c-9d24-b58f5ce0e4ee',
                        hash: '2fjdt34uno1aluchx0w68mip00cacf0tpunj8g58',
                        tenantId: 'ce709dbc-15f7-4041-ad1b-36f7e74a5651',
                        tenantCode: 'teugj7ffo2lzq6b02p809fkfgug5v0ot4gqzhbqnfaxtdlw232',
                        systemId: '673f9ada-1def-47ed-95c8-bed435352ac5',
                        systemName: 'balbz6tlk4xf7ek2nmub',
                        version: '5w7r7npd7ouutmf5wdt6',
                        scenario: 'z1hwstzpkrtl907rqclc5koqi0amtywpu8dwmhmuou681h2zs6bmf5wz95fy',
                        party: '58h890wdbf944l9xfbxkqeuejcle3jazxd9b46bfyh3jgwv1t31nfd2skcg4fh1bw21vs544dt5mj0wyua8xjgn92vgygqyabt4vac7kguds2j7ocvzl40zm892rltuwdx6yqbov737v5jux13alyw8r76rq264b',
                        receiverParty: 'xsdpvyvcb0eult9v0t49wi01bqkbjeoy80q639hl8eilkmvkfjft1s35hqgbga9zsxzzgrb7qngk2zr3vlvd66gbpo4e27ih27l2jhjupft7affdacs4ellg8g59x6fhoii0wjhey767ixz91if6gr88tx41q6gq',
                        component: 'e7o8mdvy36xzi7fg3gjmzzpbv1mswz9svfckkpr7nl44eadesw33gxm9l1kra7va7x7h3ymujtn0c3p29uv8xo0nj1sedvtkyzts2hjhkljvouqnfcce17cqc52d9efg0nct6oqye5s4lbf145tvqrgfwvxxu6un',
                        receiverComponent: 'recfy3wlmgt04ki7dtfmoxywgk6odnq2yado68v82cicy43wzwskblmbgu4y6xi92pkbwgumch9s3yznbjh8y3qlskat0ptysao3jxih6c5m8oxwrca3iic89pzv7zcky18mqpekptnyhug14l6ryqosxjgx6fxw',
                        interfaceName: 'piir2db5qjk46ego2ruhkv45hyrfjny1276pt2o65xud66v0pk1ldi1msrec8smj42fcjrrk3qhja3nw7x9pw4kujh35k8vejgrtw654222ie7ysrpiugiwhqfm1v9srikh6ri7photgpf986hx4yfjgqa71d20u',
                        interfaceNamespace: 'fciyttvz6pp09lvmsaftcfim68ogxhwg44n6l69909gxi1kox12soewkn9xtrvtzuydhc6g82sew6g7v22p3si4qrcsecw8emk6qnh3bzo8uuxtzvhlxcjn1d4tzw2x70vhp49bem7rm92snr52qxv0kvma5kueg',
                        iflowName: 'wv1ogwi3dig4febjg0lhry6vaza3e2b3cdqel2cs1gof5rz5q4p1ucgnosojjnk8ce3a69mwl20i0o7ao2enks34mpt3b3ushc7kib2c6t9psz7hne5khl8su6tb7zg4gj3dxqryum5w48ojspijgk8iyjroha35',
                        responsibleUserAccount: 'gbc7mbaztryna6v4thu6',
                        lastChangeUserAccount: '5cl69441mvw5uuf1ppgg',
                        lastChangedAt: '2020-11-04 00:25:11',
                        folderPath: 'n9dhuzzkp5kos1vtaph2bwxjfs68lpqxj3ptxovgw9k2sb6df288lwnn89vqcdzpe18u1rqe3dq5k5a65d7gdo6keo8iw4gcv0zd6z1f6m4db2ihv3emcy3lvzkjb2k5e2z1ms7ggzmqtswopw48fsmzwis61mlrqpipyv5lnhidrlp32a88iehbwl95wx1jo8bjdn1ate43vb7ce03aqxisptrgfz0z51gtowm86eyksiv9gw41oc8sgil32h8',
                        description: 'nn3j3caihlh6t2qjvc4b0cv3o6i6qgn2dhd28m2c9ebwca2qk21kflyabqctnwukuf3wi0x98hlc55mc83ew5fuaa2elcjifnksnrxw2tgqmgnqdi0t6aeinmm8n3b8pcodaogiox8ec3d5fk1yw784a66eoks00f9z97o0qylbd5q7mn8u0pnlqf0g76mems4sdmepvkqlj9ubcwqxefuyevds49gseaob8bfu0qvqbov3p6b4xls7qnxhuie3',
                        application: 'mbyo0nbceod5ppwm0dcb8qt0b96c0hebgvxy9704bd6qexjx0cg7gjbhewh1',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: '3f64db0b-2f79-40f8-aa73-f5914803ea8c',
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

    test(`/GraphQL cciUpdateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateFlowInput!)
                    {
                        cciUpdateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '9dde6c0c-86ab-4591-b238-775cdd58e9da',
                        hash: 'sjwvlpzeqf1q87ouhj7kiy6tfbyb6szw3k9b8zaf',
                        tenantId: '38f047d1-1908-428e-bf78-3047f5e4ba0f',
                        tenantCode: 'gb8r8zhtqb57vufng7jxy1i64yie4qsd74fehaoh2ijg77e2yt',
                        systemId: '736c86a4-94e9-4da6-b8dc-08b8b0629b09',
                        systemName: '5rxg9bqzl3umrang9bpp',
                        version: '65u2l5klb3li9jkiklr4',
                        scenario: '056v407zi1m1ncjmf1cwysh34l2kyyxm9ms8a1yjvoaj6xsv4pwd8o3tpjzl',
                        party: 'lhifabbrdlgodf2bp18jwazytuxag6hedv6zwgguqqwc1zt9yy82dz24du8ew2ekn6u2c8c5ynmup92o5dl1rmahjncfs6dnmv6x68q8olc1nxylgu9dzgj95210hqffw1idstakc11xl39pw062av0pzsbzqa3b',
                        receiverParty: 'ixdkx17m9byji1fc1bn9xtrm3uktbnu8tt8ug51tyjqpg0zdv8pw7x9ogdotp7dbc40wgwr41zi3xbmru7r0n0gcxqrx3dhvejem3148648pf9rzrywdrnaouosq54g7pzoklzh0chrhqyf2w2yywglrdoh9sriz',
                        component: 'w7p0ogutlc8z9hpc4w7ckxfe5wgh1290hqak7dl5kfop8xwzavk863lr23shfj3buaj609sdtsruxry7sv7zipdlcq28mho790vphzscb9fzedkx3p2cqdpx2bt5xrixh97yuer84rus5v2sitmpc7qvw6gha6rv',
                        receiverComponent: 'isg2k2gknotpweib1he7wxu8w4fpmg0j7egvldg7kfgli451uw4e12nqbcote56dgww5odj3kzu1trym8qtejfzjzwctz1wt12feslmlnodkhi0xkjjnlkre79uwfmmg852rhb4z5bfqrxlgojh3akjvohtezuod',
                        interfaceName: 'u67djvkvli5xczj7vgcmcki4mfto7l1j9u579hywyu43lgkz5ezwoijouczmsiw0fedutu2ga4i6z2hk4q1j1moxmyx04i0vpkk2zwtyypt4hi8285wtcakm6uz1yafxtxwxbs6zd0mulv98kb9fu1ibn8ldzc2m',
                        interfaceNamespace: 'sco0h1v6zsg978341h2045jdxrflsaqqh1q7zqabzrneq7wm9l9tffj2l309jbk64gvvjkns839pwwrigmznsgg5o4uf6kg3x68cor0x7l3ivnnh9gf9twkc93qkm5ml5t1mtlbbndjkpaiep0xg00ttsv7zkkoo',
                        iflowName: 'n6fx658m4vrm576ph6f5qkqv2ejrnu0gz0v4mtc24qq2xgch0ddfw61d5ltuvvmnm74jd8j5w8ap9ffempkru3yyl8bvkk85oqgjymwzognj5e4ofklew800b2hi5yn066kc3dvlgdp6qrrt3xbx7krptpk49ac6',
                        responsibleUserAccount: 'cph6zco5fim14d0s615j',
                        lastChangeUserAccount: 'i52uoksl1ve0utl7u5ln',
                        lastChangedAt: '2020-11-04 06:21:58',
                        folderPath: 'k9futfenph4po2j5iyvo7lqa66q7c1buk8bt2h4brzc52gao6kslwsitjuk2ezgw4081zno2pltf5r41zxrld16xwxtfzkhodsy0u8l10pekb8g0fo6cmofljy5j22iy5rgnvn8ui3f99jyuyi6ncvs3wiolyoh4oa9hs8k3vl8fbgxw138y7vqd6soxff9pk8ypq18kxzdyhykobh2iqf5ih97nzhjy2j2yiitg2qk25w8t72qzx5obbu65wj1',
                        description: '17o6vbqbh2u1r5l028d5ydt236ksx7zuh6gh6qulz42fdf91wycnz613gdcp3ywvvndvi3rv72kmor7bl51og2jti0i99js6tadhs16jhsncv27lmlrq8m50aivieotonzrm7eug9kjaxzoyh51oqjd0b1qd9n714g0amdu95ltgqv6kdja75cdpc3hizw3md04nnhwqu3ojfdfqk6q6v4huagem08cka7l3gal40tj5ekb9ws1ztdpy2fq7gps',
                        application: '7ydfdqkhjzis9qa0ho4xja9i3rp2432o8jffchxf5xr2v5gu2f411d6x9dje',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: '89e7c709-33ae-4e04-99ad-a96fa07ec8c4',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateFlow.id).toStrictEqual('9dde6c0c-86ab-4591-b238-775cdd58e9da');
            });
    });

    test(`/GraphQL cciDeleteFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'cc6ba4cd-ba70-4079-a040-036f6cb2cfdd'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9dde6c0c-86ab-4591-b238-775cdd58e9da'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteFlowById.id).toStrictEqual('9dde6c0c-86ab-4591-b238-775cdd58e9da');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});